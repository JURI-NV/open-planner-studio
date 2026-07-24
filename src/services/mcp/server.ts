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
import { loadMcpPort, loadMcpToken, saveMcpToken, saveAiMode } from '@/utils/settingsStore';
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

/**
 * Regenereer het bridge-token: genereer een vers token en overschrijf de gepersisteerde waarde.
 * Verbreekt bewust alle bestaande koppelingen (die dragen het oude token) — de UI vraagt daarom
 * eerst om bevestiging. Geeft het nieuwe token terug.
 */
export function regenerateMcpToken(): string {
  const token = generateToken();
  saveMcpToken(token);
  return token;
}

// --- AI-modus-toggle (injecteerbaar → headless testbaar) -----------------------------------------

export interface ApplyAiModeDeps {
  /** Schrijf de ui-spiegel (echt: `setUI({ aiMode })`). */
  setAiMode: (value: boolean) => void;
  /** Persisteer de setting (echt: `saveAiMode`). */
  persist: (value: boolean) => void | Promise<void>;
  /** Stop de bridge (echt: `stopMcpServer`); alleen aangeroepen bij uitzetten. */
  stopServer: () => void | Promise<void>;
  /** Zet de serverstatus (echt: `setAiServerStatus`); geforceerd off bij uitzetten. */
  setStatus: (status: McpServerStatus) => void;
  /** Poort voor het off-statusobject (echt: `loadMcpPort()`). */
  port: number;
}

/**
 * Pas de AI-modus toe (T14, spec §UI): schrijf de ui-spiegel + persisteer. Bij UITZETTEN wordt de
 * bridge geforceerd gestopt en de serverstatus expliciet op `off` gezet (op de web-build is
 * `stopMcpServer` een no-op, dus de status-reset moet hier gebeuren, niet uit een stop-event).
 * De reducer (`setUI`) valt zelf al terug naar de start-tab als het AI-tabblad actief was.
 */
export async function applyAiMode(value: boolean, deps: ApplyAiModeDeps): Promise<void> {
  deps.setAiMode(value);
  await deps.persist(value);
  if (!value) {
    await deps.stopServer();
    deps.setStatus({ state: 'off', port: deps.port });
  }
}

/** Productie-wiring van `applyAiMode` op de echte store + settings + bridge-lifecycle. */
export function applyAiModeLive(value: boolean): Promise<void> {
  const state = useAppStore.getState();
  return applyAiMode(value, {
    setAiMode: (v) => state.setUI({ aiMode: v }),
    persist: saveAiMode,
    stopServer: stopMcpServer,
    setStatus: state.setAiServerStatus,
    port: loadMcpPort(),
  });
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

// --- Levenscyclus (Tauri-only wiring; niet headless getest — dat is E2E/poort 2) -----------------

/** Actieve unlisten-callbacks van de huidige bridge-sessie; leeg wanneer er niets draait. */
let activeUnlisteners: Array<() => void> = [];

function cleanupListeners(): void {
  for (const un of activeUnlisteners) {
    try { un(); } catch { /* al afgemeld — niet fataal */ }
  }
  activeUnlisteners = [];
}

/**
 * Start de bridge: token verzekeren, de twee events koppelen, dan `mcp_bridge_start` invoken. Web-
 * build / niet-Tauri = no-op. Mislukt de start (poort bezet), dan meldt `attemptBridgeStart` dat
 * via `port-busy` en ruimen we de zojuist gekoppelde listeners weer op.
 */
export async function startMcpServer(): Promise<void> {
  if (!isTauri()) return;
  const setStatus = useAppStore.getState().setAiServerStatus;
  const port = loadMcpPort();
  const token = ensureMcpToken();

  const { invoke } = await import('@tauri-apps/api/core');
  const { emit, listen } = await import('@tauri-apps/api/event');

  const onRequest = createRequestHandler({
    emit: (event, payload) => emit(event, payload),
    buildContext: buildMcpContext,
    handleMessage: handleMcpMessage,
  });
  const onStatus = createStatusHandler({ setStatus });

  const unReq = await listen<{ id: number; body: string }>('mcp://request', (ev) => {
    void onRequest(ev.payload);
  });
  const unStatus = await listen<{ state: string; port: number; message?: string }>('mcp://status', (ev) => {
    onStatus(ev.payload);
  });
  activeUnlisteners = [unReq, unStatus];

  const started = await attemptBridgeStart({ invoke, setStatus, port, token });
  if (!started) {
    // Bind mislukt: de bridge draait niet, dus de zojuist gekoppelde listeners moeten weer weg.
    cleanupListeners();
  }
}

/**
 * Stop de bridge netjes: listeners afmelden, `mcp_bridge_stop` invoken, en de ui-status op off
 * zetten (de stop-invoke emit weliswaar een "stopped"-event, maar we hebben de listener net
 * afgemeld — dus zetten we de status hier expliciet). Web-build / niet-Tauri = no-op.
 */
export async function stopMcpServer(): Promise<void> {
  if (!isTauri()) return;
  cleanupListeners();
  const { invoke } = await import('@tauri-apps/api/core');
  try {
    await invoke('mcp_bridge_stop');
  } catch { /* al gestopt / geen bridge — niet fataal */ }
  useAppStore.getState().setAiServerStatus({ state: 'off', port: loadMcpPort() });
}
