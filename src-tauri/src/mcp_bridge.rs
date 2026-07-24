//! MCP-bridge — een dom HTTP-doorgeefluik (fase 1, Tauri-only).
//!
//! Dit is bewust een *dun* Rust-schilletje. Het weet **niets** van MCP of
//! JSON-RPC: het bindt een `tiny_http`-server op uitsluitend `127.0.0.1:<port>`,
//! bewaakt het Bearer-token, weigert requests met een `Origin`-header
//! (DNS-rebinding-bescherming), serialiseert requests strikt één-voor-één en
//! forwardt elke body als Tauri-event naar de webview — waar de TypeScript-laag
//! (`src/services/mcp/`) het protocol afhandelt. De hele protocol- en tool-laag
//! is TS; hier zit géén domeinlogica.
//!
//! Contract per request op `POST /mcp`:
//!   1. `Authorization: Bearer <token>` moet exact kloppen, anders `401` (leeg).
//!   2. Een aanwezige `Origin`-header ⇒ `403` (browsers sturen die; legitieme
//!      MCP-clients niet). Er worden nergens CORS-headers gezet, dus een
//!      OPTIONS-preflight krijgt gewoon `403`/`405` zonder CORS.
//!   3. Requests strikt serieel (mutex om het in-flight-slot).
//!   4. Body → webview via event `mcp://request` `{id, body}`; antwoord terug via
//!      `mcp://response` `{id, body}` (id-correlatie op een mpsc-kanaal).
//!   5. Timeout 120 s ⇒ `504` met een JSON-RPC-foutobject.
//!   6. Antwoord-body 1-op-1 terug als `200 application/json`.
//!
//! Status (`mcp://status` `{state, port, message}`) wordt geëmit bij
//! start/stop/fout zodat de frontend-store hem kan tonen.

use std::collections::HashMap;
use std::sync::atomic::{AtomicBool, AtomicU64, Ordering};
use std::sync::mpsc::{channel, Receiver, RecvTimeoutError, Sender};
use std::sync::{Arc, Mutex};
use std::thread::JoinHandle;
use std::time::{Duration, Instant};

use tauri::{Emitter, Listener};

/// Ruime timeout: een grote batch mag lang duren in de webview.
const RESPONSE_TIMEOUT: Duration = Duration::from_secs(120);

/// JSON-RPC-foutobject dat we teruggeven bij een timeout (504).
const TIMEOUT_BODY: &str =
    r#"{"jsonrpc":"2.0","error":{"code":-32001,"message":"timeout"},"id":null}"#;
/// JSON-RPC-foutobject bij een interne fout (webview onbereikbaar / body onleesbaar).
const INTERNAL_BODY: &str =
    r#"{"jsonrpc":"2.0","error":{"code":-32603,"message":"internal error"},"id":null}"#;

// ---------------------------------------------------------------------------
// Pure, headless-testbare bouwstenen (geen webview, geen sockets).
// ---------------------------------------------------------------------------

/// Bouwt het bind-adres. **Altijd** loopback — de bridge mag nooit op een extern
/// interface luisteren.
fn bind_addr(port: u16) -> String {
    format!("127.0.0.1:{port}")
}

/// Klopt het `Authorization`-headerwaarde met het verwachte token? Ontbrekend of
/// verkeerd ⇒ `false` (de aanroeper vertaalt dat naar 401). Het scheme
/// (`Bearer`) is HTTP-conform hoofdletterongevoelig; de tokenwaarde zelf moet
/// exact gelijk zijn.
fn is_authorized(auth_header: Option<&str>, expected_token: &str) -> bool {
    match auth_header {
        Some(h) => match h.split_once(' ') {
            Some((scheme, value)) => scheme.eq_ignore_ascii_case("Bearer") && value == expected_token,
            None => false,
        },
        None => false,
    }
}

/// Is er een niet-lege `Origin`-header aanwezig? Zo ja ⇒ browser-afkomstig ⇒
/// weigeren (403). Legitieme MCP-clients sturen geen Origin.
fn origin_present(origin_header: Option<&str>) -> bool {
    matches!(origin_header, Some(v) if !v.is_empty())
}

/// Correleert forwarded requests met hun antwoord uit de webview. Elke request
/// krijgt een monotoon id + een eenmalig mpsc-kanaal; het `mcp://response`-event
/// resolvet dat id, de HTTP-loop wacht met timeout op zijn kanaal.
struct Pending {
    map: Mutex<HashMap<u64, Sender<String>>>,
    next_id: AtomicU64,
}

impl Pending {
    fn new() -> Self {
        Self {
            map: Mutex::new(HashMap::new()),
            next_id: AtomicU64::new(1),
        }
    }

    /// Registreer een nieuwe in-flight request. Geeft het id + de ontvangkant.
    fn register(&self) -> (u64, Receiver<String>) {
        let id = self.next_id.fetch_add(1, Ordering::SeqCst);
        let (tx, rx) = channel();
        self.map.lock().unwrap().insert(id, tx);
        (id, rx)
    }

    /// Lever het antwoord af bij het wachtende kanaal. `false` = onbekend id
    /// (al getimeout/opgeruimd of nooit bestaan) — het antwoord wordt genegeerd.
    fn resolve(&self, id: u64, body: String) -> bool {
        match self.map.lock().unwrap().remove(&id) {
            Some(tx) => tx.send(body).is_ok(),
            None => false,
        }
    }

    /// Ruim een openstaand slot op (na timeout / emit-fout).
    fn cancel(&self, id: u64) {
        self.map.lock().unwrap().remove(&id);
    }

    /// Wacht op het antwoord voor `id`. `Some(body)` bij afgifte; `None` bij
    /// timeout, bij het zetten van `shutdown`, of als het kanaal wegvalt. In alle
    /// `None`-gevallen wordt het slot opgeruimd zodat een laat antwoord niet
    /// blijft hangen.
    fn wait(
        &self,
        id: u64,
        rx: &Receiver<String>,
        timeout: Duration,
        shutdown: &AtomicBool,
    ) -> Option<String> {
        let deadline = Instant::now() + timeout;
        loop {
            if shutdown.load(Ordering::SeqCst) {
                self.cancel(id);
                return None;
            }
            let remaining = deadline.saturating_duration_since(Instant::now());
            if remaining.is_zero() {
                self.cancel(id);
                return None;
            }
            // Korte stappen zodat shutdown snel doorwerkt tijdens een lange wacht.
            let step = remaining.min(Duration::from_millis(100));
            match rx.recv_timeout(step) {
                Ok(body) => return Some(body),
                Err(RecvTimeoutError::Timeout) => continue,
                Err(RecvTimeoutError::Disconnected) => {
                    self.cancel(id);
                    return None;
                }
            }
        }
    }
}

// ---------------------------------------------------------------------------
// Event-payloads (Rust ↔ webview).
// ---------------------------------------------------------------------------

#[derive(Clone, serde::Serialize)]
struct McpRequestPayload {
    id: u64,
    body: String,
}

#[derive(serde::Deserialize)]
struct McpResponsePayload {
    id: u64,
    body: String,
}

#[derive(Clone, serde::Serialize)]
struct McpStatusPayload {
    state: String,
    port: u16,
    message: String,
}

fn emit_status(app: &tauri::AppHandle, state: &str, port: u16, message: &str) {
    let _ = app.emit(
        "mcp://status",
        McpStatusPayload {
            state: state.to_string(),
            port,
            message: message.to_string(),
        },
    );
}

// ---------------------------------------------------------------------------
// Server-levenscyclus (managed Tauri-state).
// ---------------------------------------------------------------------------

struct RunningBridge {
    server: Arc<tiny_http::Server>,
    shutdown: Arc<AtomicBool>,
    thread: Option<JoinHandle<()>>,
    listener: tauri::EventId,
    port: u16,
}

/// Managed state: één actieve bridge tegelijk (of geen).
#[derive(Default)]
pub struct BridgeState(Mutex<Option<RunningBridge>>);

// ---------------------------------------------------------------------------
// HTTP-loop.
// ---------------------------------------------------------------------------

/// Zoekt een header case-insensitief op en geeft zijn waarde als `&str`.
fn find_header<'a>(request: &'a tiny_http::Request, name: &str) -> Option<&'a str> {
    // `HeaderField::equiv` neemt een `&'static str`, dus vergelijk zelf
    // case-insensitief op de headernaam.
    request
        .headers()
        .iter()
        .find(|h| h.field.as_str().as_str().eq_ignore_ascii_case(name))
        .map(|h| h.value.as_str())
}

fn respond_json(request: tiny_http::Request, status: u16, body: &str) {
    let header =
        tiny_http::Header::from_bytes(&b"Content-Type"[..], &b"application/json"[..]).unwrap();
    let response = tiny_http::Response::from_string(body)
        .with_status_code(status)
        .with_header(header);
    let _ = request.respond(response);
}

fn respond_empty(request: tiny_http::Request, status: u16) {
    let _ = request.respond(tiny_http::Response::empty(status));
}

/// Verwerkt precies één request. Volgorde van de poorten:
///   Origin (403) → methode (405) → pad (404) → token (401) → forward.
/// Origin gaat bewust vóór alles: een browser-afkomstig request (incl.
/// OPTIONS-preflight) wordt altijd geweigerd, ongeacht token.
fn handle_request(
    request: tiny_http::Request,
    pending: &Pending,
    inflight: &Mutex<()>,
    app: &tauri::AppHandle,
    token: &str,
    shutdown: &AtomicBool,
) {
    // (2) DNS-rebinding: elke Origin-header ⇒ 403, geen CORS-headers.
    if origin_present(find_header(&request, "Origin")) {
        respond_empty(request, 403);
        return;
    }
    // Alleen POST /mcp is een geldig endpoint.
    if request.method() != &tiny_http::Method::Post {
        respond_empty(request, 405);
        return;
    }
    let path = request.url().split('?').next().unwrap_or("");
    if path != "/mcp" {
        respond_empty(request, 404);
        return;
    }
    // (1) Bearer-token exact; anders 401 zonder details.
    if !is_authorized(find_header(&request, "Authorization"), token) {
        respond_empty(request, 401);
        return;
    }
    forward_to_webview(request, pending, inflight, app, shutdown);
}

/// (3)+(4)+(5)+(6): serieel forwarden en op het antwoord wachten.
fn forward_to_webview(
    mut request: tiny_http::Request,
    pending: &Pending,
    inflight: &Mutex<()>,
    app: &tauri::AppHandle,
    shutdown: &AtomicBool,
) {
    let mut body = String::new();
    if request.as_reader().read_to_string(&mut body).is_err() {
        respond_json(request, 400, INTERNAL_BODY);
        return;
    }

    // (3) Strikt één request tegelijk in-flight naar de webview.
    let _slot = inflight.lock().unwrap();

    let (id, rx) = pending.register();
    if app.emit("mcp://request", McpRequestPayload { id, body }).is_err() {
        pending.cancel(id);
        respond_json(request, 500, INTERNAL_BODY);
        return;
    }

    // (5)/(6): wacht met timeout; body 1-op-1 terug, of 504.
    match pending.wait(id, &rx, RESPONSE_TIMEOUT, shutdown) {
        Some(resp_body) => respond_json(request, 200, &resp_body),
        None => respond_json(request, 504, TIMEOUT_BODY),
    }
}

fn run_loop(
    server: Arc<tiny_http::Server>,
    shutdown: Arc<AtomicBool>,
    pending: Arc<Pending>,
    app: tauri::AppHandle,
    token: String,
) {
    // Eén enkel in-flight-slot (deze loop is single-threaded, maar de mutex legt
    // de "strikt serieel"-invariant expliciet vast).
    let inflight = Mutex::new(());
    loop {
        if shutdown.load(Ordering::SeqCst) {
            break;
        }
        // Korte recv-timeout zodat de shutdown-vlag periodiek gecheckt wordt.
        match server.recv_timeout(Duration::from_millis(200)) {
            Ok(Some(request)) => {
                handle_request(request, &pending, &inflight, &app, &token, &shutdown);
            }
            Ok(None) => continue,
            Err(_) => break,
        }
    }
}

// ---------------------------------------------------------------------------
// Tauri-commands.
// ---------------------------------------------------------------------------

/// Start de bridge op `127.0.0.1:<port>`. Een bezette poort (of andere bind-fout)
/// ⇒ `Err(melding)` zodat de frontend "poort bezet" kan tonen.
#[tauri::command]
pub fn mcp_bridge_start(
    app: tauri::AppHandle,
    state: tauri::State<'_, BridgeState>,
    port: u16,
    token: String,
) -> Result<(), String> {
    let mut guard = state.0.lock().unwrap();
    if guard.is_some() {
        return Err("mcp-bridge draait al".to_string());
    }

    let server = match tiny_http::Server::http(bind_addr(port)) {
        Ok(s) => Arc::new(s),
        Err(e) => {
            let msg = format!("kon niet binden op 127.0.0.1:{port}: {e}");
            emit_status(&app, "error", port, &msg);
            return Err(msg);
        }
    };

    let shutdown = Arc::new(AtomicBool::new(false));
    let pending = Arc::new(Pending::new());

    // Antwoorden uit de webview correleren op id.
    let pending_for_listener = pending.clone();
    let listener = app.listen("mcp://response", move |event| {
        if let Ok(resp) = serde_json::from_str::<McpResponsePayload>(event.payload()) {
            pending_for_listener.resolve(resp.id, resp.body);
        }
    });

    let thread = std::thread::spawn({
        let server = server.clone();
        let shutdown = shutdown.clone();
        let app = app.clone();
        move || run_loop(server, shutdown, pending, app, token)
    });

    *guard = Some(RunningBridge {
        server,
        shutdown,
        thread: Some(thread),
        listener,
        port,
    });

    emit_status(&app, "running", port, "");
    Ok(())
}

/// Stopt de bridge netjes: shutdown-vlag zetten, de accept-loop deblokkeren, de
/// thread joinen en de event-listener afmelden. No-op als er niets draait.
#[tauri::command]
pub fn mcp_bridge_stop(
    app: tauri::AppHandle,
    state: tauri::State<'_, BridgeState>,
) -> Result<(), String> {
    let running = state.0.lock().unwrap().take();
    if let Some(mut bridge) = running {
        bridge.shutdown.store(true, Ordering::SeqCst);
        bridge.server.unblock();
        if let Some(thread) = bridge.thread.take() {
            let _ = thread.join();
        }
        app.unlisten(bridge.listener);
        emit_status(&app, "stopped", bridge.port, "");
    }
    Ok(())
}

// ---------------------------------------------------------------------------
// Unit-tests (pure functies + kanaal-correlatie; geen webview, geen sockets).
// ---------------------------------------------------------------------------

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn bind_addr_is_always_loopback() {
        assert_eq!(bind_addr(3877), "127.0.0.1:3877");
        assert!(bind_addr(1).starts_with("127.0.0.1:"));
        assert!(bind_addr(65535).starts_with("127.0.0.1:"));
    }

    #[test]
    fn token_exact_match_authorizes() {
        assert!(is_authorized(Some("Bearer s3cret-token"), "s3cret-token"));
    }

    #[test]
    fn token_mismatch_rejected() {
        assert!(!is_authorized(Some("Bearer s3cret-token"), "ander-token"));
    }

    #[test]
    fn token_missing_header_rejected() {
        assert!(!is_authorized(None, "s3cret-token"));
    }

    #[test]
    fn token_wrong_scheme_rejected() {
        assert!(!is_authorized(Some("Basic s3cret-token"), "s3cret-token"));
        assert!(!is_authorized(Some("s3cret-token"), "s3cret-token"));
    }

    #[test]
    fn token_scheme_is_case_insensitive_value_is_not() {
        assert!(is_authorized(Some("bearer abc"), "abc"));
        assert!(is_authorized(Some("BEARER abc"), "abc"));
        // waarde is hoofdlettergevoelig
        assert!(!is_authorized(Some("Bearer ABC"), "abc"));
    }

    #[test]
    fn origin_present_detection() {
        assert!(origin_present(Some("http://evil.example")));
        assert!(origin_present(Some("null")));
        assert!(!origin_present(None));
        assert!(!origin_present(Some("")));
    }

    #[test]
    fn pending_resolve_before_wait_delivers() {
        let p = Pending::new();
        let sd = AtomicBool::new(false);
        let (id, rx) = p.register();
        assert!(p.resolve(id, "hallo".to_string()));
        let got = p.wait(id, &rx, Duration::from_secs(1), &sd);
        assert_eq!(got, Some("hallo".to_string()));
    }

    #[test]
    fn pending_resolve_from_another_thread_delivers() {
        let p = Arc::new(Pending::new());
        let sd = Arc::new(AtomicBool::new(false));
        let (id, rx) = p.register();
        let p2 = p.clone();
        let joiner = std::thread::spawn(move || {
            std::thread::sleep(Duration::from_millis(50));
            assert!(p2.resolve(id, "wereld".to_string()));
        });
        let got = p.wait(id, &rx, Duration::from_secs(2), &sd);
        joiner.join().unwrap();
        assert_eq!(got, Some("wereld".to_string()));
    }

    #[test]
    fn pending_ids_are_unique_and_monotonic() {
        let p = Pending::new();
        let (a, _ra) = p.register();
        let (b, _rb) = p.register();
        let (c, _rc) = p.register();
        assert!(a < b && b < c);
    }

    #[test]
    fn pending_timeout_returns_none_and_cleans_up() {
        let p = Pending::new();
        let sd = AtomicBool::new(false);
        let (id, rx) = p.register();
        let got = p.wait(id, &rx, Duration::from_millis(120), &sd);
        assert_eq!(got, None);
        // Slot is opgeruimd: een laat antwoord vindt geen ontvanger meer.
        assert!(!p.resolve(id, "te-laat".to_string()));
    }

    #[test]
    fn pending_shutdown_interrupts_wait() {
        let p = Pending::new();
        let sd = AtomicBool::new(true); // al gezet ⇒ directe uitstap
        let (id, rx) = p.register();
        let got = p.wait(id, &rx, Duration::from_secs(30), &sd);
        assert_eq!(got, None);
    }

    #[test]
    fn pending_resolve_unknown_id_is_false() {
        let p = Pending::new();
        assert!(!p.resolve(9999, "spook".to_string()));
    }

    #[test]
    fn timeout_body_is_valid_jsonrpc_error() {
        let v: serde_json::Value = serde_json::from_str(TIMEOUT_BODY).unwrap();
        assert_eq!(v["jsonrpc"], "2.0");
        assert_eq!(v["error"]["code"], -32001);
        assert_eq!(v["error"]["message"], "timeout");
        assert!(v["id"].is_null());
    }

    #[test]
    fn internal_body_is_valid_jsonrpc_error() {
        let v: serde_json::Value = serde_json::from_str(INTERNAL_BODY).unwrap();
        assert_eq!(v["jsonrpc"], "2.0");
        assert_eq!(v["error"]["code"], -32603);
    }
}
