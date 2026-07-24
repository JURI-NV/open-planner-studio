// MCP-bridge — server-levenscyclus (fase 1, spec §Beveiliging & levenscyclus).
//
// Deze module bedient de Tauri-only bridge: token verzekeren, `mcp_bridge_start`/`mcp_bridge_stop`
// invoken, en de twee Tauri-events koppelen aan de dispatcher + de ui-state:
//   - `mcp://request`  {id, body}  → `handleMcpMessage(body, ctx)` → emit `mcp://response` {id, body}
//   - `mcp://status`   {state, port, message} → `setAiServerStatus(...)`
//
// HARDE REPO-REGEL: een top-niveau `import` van `@tauri-apps/*` breekt de web-build. Daarom staan
// ALLE Tauri-imports achter `isTauri()` als dynamische `import(...)` binnen `startMcpServer`/
// `stopMcpServer`. De kern-bouwstenen (`createRequestHandler`, `createStatusHandler`,
// `attemptBridgeStart`, `buildMcpContext`, `ensureMcpToken`/`generateToken`) nemen hun Tauri-randen
// als injecteerbare functies, zodat ze headless — zonder Tauri — te testen zijn (`tests/mcp/`).
//
// De per-request `ctx` is hier BEWUST een minimale placeholder: `paused`/`readOnly` komen live uit
// de ui-state, maar `expectedDocId` (drift-anker), `tempIdMap` (batch-executor) en `ensureBackup`
// (AI-backup) zijn stubs — de echte runtime-/guardlaag is T17. Zie de tool-contracten in
// `contracts.ts` (`McpContext`).

import { useAppStore } from '@/state/appStore';
import { loadMcpPort, loadMcpToken, saveMcpToken } from '@/utils/settingsStore';
import { handleMcpMessage } from './dispatcher';
import type { McpContext, McpServerStatus } from './contracts';

/** Draaien we in de Tauri-shell? (zelfde runtime-poort als de rest van de app-code). */
const isTauri = (): boolean => typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

// --- Token ---------------------------------------------------------------------------------------

/** Genereer een vers Bearer-token: 32 crypto-random bytes, hex-gecodeerd (64 tekens). */
export function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  let hex = '';
  for (const b of bytes) hex += b.toString(16).padStart(2, '0');
  return hex;
}

/**
 * Verzeker een persistent bridge-token: lees `ops-mcpToken`; ontbreekt hij, genereer een nieuw
 * (32 bytes crypto-random, hex) en persisteer 'm. Geeft altijd hetzelfde token terug zolang de
 * gebruiker niet regenereert.
 */
export function ensureMcpToken(): string {
  const existing = loadMcpToken();
  if (existing) return existing;
  const token = generateToken();
  saveMcpToken(token);
  return token;
}

// --- Per-request context -------------------------------------------------------------------------

/**
 * Bouw de `McpContext` voor één request. `paused`/`readOnly` worden LIVE uit de ui-state gelezen
 * (de user kan ze tussen requests door omzetten). De overige velden zijn placeholders tot de
 * runtime-/guardlaag (T17) ze invult: `expectedDocId` (drift-anker) = null, `tempIdMap` = lege Map
 * (de batch-executor bezit 'm), `ensureBackup` = no-op-stub (de AI-backup-hook).
 */
export function buildMcpContext(): McpContext {
  const ui = useAppStore.getState().ui;
  return {
    expectedDocId: null,
    tempIdMap: new Map<string, string>(),
    paused: ui.aiPaused,
    readOnly: ui.aiReadOnly,
    ensureBackup: async () => null,
  };
}

// --- Request-handler (injecteerbaar → headless testbaar) -----------------------------------------

export interface RequestHandlerDeps {
  /** Emit-functie (echt: Tauri `emit`); ontvangt het event + payload. */
  emit: (event: string, payload: unknown) => void | Promise<void>;
  /** Bouwt de per-request ctx (echt: `buildMcpContext`). */
  buildContext: () => McpContext;
  /** Verwerkt de rauwe JSON-RPC-body (echt: `handleMcpMessage`). */
  handleMessage: (body: string, ctx: McpContext) => Promise<string>;
}

/**
 * Maak de `mcp://request`-handler. Elk request draait door de dispatcher; het antwoord gaat 1-op-1
 * terug als `mcp://response` met HETZELFDE Rust-correlatie-id. Óók een notificatie (lege respons-
 * body) wordt geëmit — de Rust-loop correleert op id en wacht altijd op een antwoord, dus een
 * uitgebleven emit zou daar in een timeout lopen.
 */
export function createRequestHandler(
  deps: RequestHandlerDeps,
): (payload: { id: number; body: string }) => Promise<void> {
  return async (payload) => {
    const ctx = deps.buildContext();
    const body = await deps.handleMessage(payload.body, ctx);
    await deps.emit('mcp://response', { id: payload.id, body });
  };
}

// --- Status-handler (injecteerbaar) --------------------------------------------------------------

/**
 * Map de Rust-statusstring (`mcp_bridge.rs` emit "running"/"stopped"/"error") naar de bevroren
 * contract-state (`McpServerStatus`). `port-busy` komt NIET uit een status-event maar uit de
 * `mcp_bridge_start`-fout (zie `attemptBridgeStart`).
 */
function mapRustState(state: string): McpServerStatus['state'] {
  switch (state) {
    case 'running': return 'live';
    case 'stopped': return 'off';
    default: return 'error';
  }
}

export interface StatusHandlerDeps {
  setStatus: (status: McpServerStatus) => void;
}

/** Maak de `mcp://status`-handler: mapt de Rust-state en schrijft de ui-state bij. */
export function createStatusHandler(
  deps: StatusHandlerDeps,
): (payload: { state: string; port: number; message?: string }) => void {
  return (payload) => {
    deps.setStatus({
      state: mapRustState(payload.state),
      port: payload.port,
      // Rust stuurt bij succes een lege message; die laten we weg zodat het statusobject schoon blijft.
      ...(payload.message ? { message: payload.message } : {}),
    });
  };
}

// --- Bridge-start (injecteerbaar → poort-bezet-test zonder Tauri) --------------------------------

export interface AttemptStartDeps {
  invoke: (cmd: string, args: Record<string, unknown>) => Promise<unknown>;
  setStatus: (status: McpServerStatus) => void;
  port: number;
  token: string;
}

/**
 * Roep `mcp_bridge_start` aan. Slaagt de bind → `true` (de "live"-status volgt uit het
 * `mcp://status`-event, dus we schrijven hier niets). Faalt de bind (poort bezet / andere bind-
 * fout) → vertaal de invoke-fout naar `state:'port-busy'` mét melding en geef `false`. Nooit stil
 * doorschuiven.
 */
export async function attemptBridgeStart(deps: AttemptStartDeps): Promise<boolean> {
  try {
    await deps.invoke('mcp_bridge_start', { port: deps.port, token: deps.token });
    return true;
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    deps.setStatus({ state: 'port-busy', port: deps.port, message });
    return false;
  }
}

// --- Levenscyclus-controller (injecteerbaar → listener-boekhouding headless testbaar) ------------

/**
 * De Tauri-randen die de bridge-controller nodig heeft, als injecteerbare functies. De echte
 * wiring (achter `isTauri()`, met dynamische `@tauri-apps/*`-imports) zit in `buildLiveController`;
 * de headless tests injecteren fakes (`tests/mcp/cases-server.ts`) en tellen zo de listener-
 * boekhouding + de dubbel-start-guard zonder Tauri.
 */
export interface BridgeDeps {
  /** Koppel een event-handler; resolve met de unlisten-callback (echt: Tauri `listen`). */
  listen: <T>(event: string, handler: (payload: T) => void) => Promise<() => void>;
  invoke: (cmd: string, args: Record<string, unknown>) => Promise<unknown>;
  emit: (event: string, payload: unknown) => void | Promise<void>;
  setStatus: (status: McpServerStatus) => void;
  buildContext: () => McpContext;
  handleMessage: (body: string, ctx: McpContext) => Promise<string>;
  getPort: () => number;
  getToken: () => string;
}

export interface BridgeController {
  start: () => Promise<void>;
  stop: () => Promise<void>;
  /** Aantal op dit moment gekoppelde listeners (test-inspectie). */
  activeListenerCount: () => number;
}

/**
 * Bouw een bridge-controller die zijn eigen listener-boekhouding + dubbel-start-guard omsluit.
 * Invarianten:
 *   - **Nooit verweesde `mcp://request`-listeners:** `start()` ruimt eerst een eventuele vorige set
 *     op (`cleanup()`) vóór het registreren. Twee gekoppelde request-listeners zouden elk request
 *     dubbel door de dispatcher laten lopen → dubbele mutaties.
 *   - **Geen re-entry:** een `starting`-vlag laat een tweede *gelijktijdige* `start()` vroeg
 *     returnen (geen spuriëuze `port-busy` terwijl de bridge gewoon opstart).
 */
export function createBridgeController(deps: BridgeDeps): BridgeController {
  let unlisteners: Array<() => void> = [];
  let starting = false;

  function cleanup(): void {
    for (const un of unlisteners) {
      try { un(); } catch { /* al afgemeld — niet fataal */ }
    }
    unlisteners = [];
  }

  async function start(): Promise<void> {
    // In-flight-lock: een tweede gelijktijdige start vroeg afwijzen (de eerste is nog bezig).
    if (starting) return;
    starting = true;
    try {
      // Defensief: verweesde listeners van een vorige (half-)start eerst opruimen — nooit een
      // dubbele mcp://request-listener overhouden (elk request zou dan dubbel gedispatcht worden).
      cleanup();

      const port = deps.getPort();
      const token = deps.getToken();

      const onRequest = createRequestHandler({
        emit: deps.emit,
        buildContext: deps.buildContext,
        handleMessage: deps.handleMessage,
      });
      const onStatus = createStatusHandler({ setStatus: deps.setStatus });

      const unReq = await deps.listen<{ id: number; body: string }>('mcp://request', (p) => { void onRequest(p); });
      const unStatus = await deps.listen<{ state: string; port: number; message?: string }>('mcp://status', (p) => { onStatus(p); });
      unlisteners = [unReq, unStatus];

      const started = await attemptBridgeStart({ invoke: deps.invoke, setStatus: deps.setStatus, port, token });
      if (!started) {
        // Bind mislukt: `attemptBridgeStart` heeft net (synchroon, in de invoke-reject-catch)
        // `setStatus(port-busy)` gezet; hier ruimen we — óók synchroon, zonder tussenliggende
        // event-loop-turn (geen macrotask-yield tussen setStatus en deze cleanup) — de listeners op.
        // Daardoor is de `mcp://status`-listener al afgemeld voordat het aparte Rust "error"-event
        // (dat `mcp_bridge_start` vóór zijn Err emit) als nieuwe taak kan binnenkomen: dat event zou
        // anders via `mapRustState` de status naar 'error' zetten en onze 'port-busy' overschrijven.
        cleanup();
      }
    } finally {
      starting = false;
    }
  }

  async function stop(): Promise<void> {
    // Eerst afmelden: de stop-invoke emit weliswaar een "stopped"-event, maar we willen dat niet
    // meer verwerken — de status zetten we hieronder expliciet op off.
    cleanup();
    try { await deps.invoke('mcp_bridge_stop', {}); } catch { /* al gestopt / geen bridge — niet fataal */ }
    deps.setStatus({ state: 'off', port: deps.getPort() });
  }

  return { start, stop, activeListenerCount: () => unlisteners.length };
}

// --- Live wiring (Tauri-only; achter isTauri(), niet headless getest — dat is E2E/poort 2) --------

/** Gecachte controller-belofte: gedeeld over alle start/stop-aanroepen zodat er nooit twee losse
 *  controllers (elk met een eigen listener-set) ontstaan bij een gelijktijdige start. */
let liveControllerPromise: Promise<BridgeController> | null = null;

async function buildLiveController(): Promise<BridgeController> {
  const { invoke } = await import('@tauri-apps/api/core');
  const { emit, listen } = await import('@tauri-apps/api/event');
  return createBridgeController({
    listen: <T>(event: string, handler: (payload: T) => void) =>
      listen<T>(event, (ev) => handler(ev.payload)),
    invoke: (cmd, args) => invoke(cmd, args),
    emit: (event, payload) => emit(event, payload),
    setStatus: useAppStore.getState().setAiServerStatus,
    buildContext: buildMcpContext,
    handleMessage: handleMcpMessage,
    getPort: loadMcpPort,
    getToken: ensureMcpToken,
  });
}

function getLiveController(): Promise<BridgeController> {
  if (!liveControllerPromise) liveControllerPromise = buildLiveController();
  return liveControllerPromise;
}

/**
 * Start de bridge: token verzekeren, de twee events koppelen, dan `mcp_bridge_start` invoken. Web-
 * build / niet-Tauri = no-op. Dubbel-start-veilig via de gedeelde controller + zijn in-flight-lock.
 */
export async function startMcpServer(): Promise<void> {
  if (!isTauri()) return;
  const controller = await getLiveController();
  await controller.start();
}

/**
 * Stop de bridge netjes: listeners afmelden, `mcp_bridge_stop` invoken, ui-status op off. Web-build
 * / niet-Tauri = no-op.
 */
export async function stopMcpServer(): Promise<void> {
  if (!isTauri()) return;
  const controller = await getLiveController();
  await controller.stop();
}
