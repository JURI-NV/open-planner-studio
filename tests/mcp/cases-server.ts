// T10 — server-levenscyclus headless: token, request-flow, status-flow, pauze/alleen-lezen.
//
// GÉÉN Tauri: elke Tauri-rand (invoke / emit / listen) wordt hier als fake geïnjecteerd. De
// lifecycle-bouwstenen in `server.ts` (`createRequestHandler`, `createStatusHandler`,
// `attemptBridgeStart`, `buildMcpContext`, `ensureMcpToken`/`generateToken`) zijn juist zó
// gesneden dat ze zonder de Tauri-imports draaien — `startMcpServer`/`stopMcpServer` zelf zijn
// dunne wiring achter `isTauri()` en worden hier niet headless gedraaid (dat is E2E, poort 2).

// --- localStorage-shim (vóór elke @/-import; settingsStore.loadMcpToken/saveMcpToken lezen 'm) ---
const backing = new Map<string, string>();
(globalThis as any).localStorage = {
  getItem: (k: string) => (backing.has(k) ? backing.get(k)! : null),
  setItem: (k: string, v: string) => { backing.set(k, v); },
  removeItem: (k: string) => { backing.delete(k); },
};

import { useAppStore, test, assert, assertEq, run } from './harness';
import './uiShim'; // toolRegistry importeert nu echte tools (readTools) → shortcutRegistry/i18n-init zet document.documentElement.dir
import type { McpToolDef, McpToolResult, McpEnvelope } from '@/services/mcp/contracts';
import { registerToolModules } from '@/services/mcp/toolRegistry';
import { handleMcpMessage } from '@/services/mcp/dispatcher';
import {
  ensureMcpToken,
  generateToken,
  createRequestHandler,
  createStatusHandler,
  attemptBridgeStart,
  buildMcpContext,
  createBridgeController,
  type BridgeDeps,
} from '@/services/mcp/server';

const HEX64 = /^[0-9a-f]{64}$/;

const stubEnvelope: McpEnvelope = {
  activeDocumentId: 'doc-1',
  documentTitle: 'Teststub',
  scheduleStale: false,
  paused: false,
  readOnly: false,
};

// --- (1) token-generatie -------------------------------------------------------------------------

test('ensureMcpToken genereert 64 hex-chars, persisteert, en is stabiel bij de tweede aanroep', () => {
  backing.delete('ops-mcpToken');
  const t1 = ensureMcpToken();
  assert(HEX64.test(t1), `eerste token is geen 64 hex-chars: ${t1}`);
  assertEq(localStorage.getItem('ops-mcpToken'), t1, 'token moet naar ops-mcpToken gepersisteerd zijn');
  const t2 = ensureMcpToken();
  assertEq(t2, t1, 'een tweede aanroep moet hetzelfde gepersisteerde token teruggeven');
});

test('generateToken levert telkens een uniek 64-hex-token (32 crypto-random bytes)', () => {
  const a = generateToken();
  const b = generateToken();
  assert(HEX64.test(a) && HEX64.test(b), `niet-hex tokens: ${a} / ${b}`);
  assert(a !== b, 'twee generaties mogen niet identiek zijn (crypto-random)');
});

// --- (2) request-flow ----------------------------------------------------------------------------

test('createRequestHandler draait de ECHTE dispatcher en emit {id, body} met het JSON-RPC-antwoord', async () => {
  const stub: McpToolDef = {
    name: 'planner_ping_stub',
    description: 'Echoot zijn args (T10-teststub).',
    kind: 'read',
    batchable: true,
    inputSchema: { type: 'object', properties: {} },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    handler: (args): McpToolResult => ({ ok: true, envelope: stubEnvelope, data: { echo: args } }),
  };
  registerToolModules([[stub]]);

  let captured: { event: string; payload: any } | null = null;
  const handler = createRequestHandler({
    emit: (event, payload) => { captured = { event, payload }; },
    buildContext: buildMcpContext,
    handleMessage: handleMcpMessage,
  });

  const reqBody = JSON.stringify({
    jsonrpc: '2.0',
    id: 7,
    method: 'tools/call',
    params: { name: 'planner_ping_stub', arguments: { v: 1 } },
  });
  // Rust levert het request-event met zijn eigen correlatie-id (99), los van het JSON-RPC-id (7).
  await handler({ id: 99, body: reqBody });

  assert(captured != null, 'emit is niet aangeroepen');
  const cap = captured!;
  assertEq(cap.event, 'mcp://response', 'het antwoord moet als mcp://response worden geëmit');
  assertEq(cap.payload.id, 99, 'het Rust-correlatie-id (99) moet 1-op-1 terug');
  const parsed = JSON.parse(cap.payload.body);
  assertEq(parsed.id, 7, 'het JSON-RPC-id (7) blijft in de body behouden');
  assertEq(parsed.result.isError, false, 'de stub gaf ok ⇒ isError false');
  assertEq(parsed.result.structuredContent.data.echo, { v: 1 }, 'args liepen door de echte dispatcher naar de handler');
});

test('createRequestHandler emit óók een (leeg) antwoord voor een notificatie (Rust wacht altijd)', async () => {
  let captured: { event: string; payload: any } | null = null;
  const handler = createRequestHandler({
    emit: (event, payload) => { captured = { event, payload }; },
    buildContext: buildMcpContext,
    handleMessage: handleMcpMessage,
  });
  const noteBody = JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' });
  await handler({ id: 42, body: noteBody });
  assert(captured != null, 'ook een notificatie moet een respons-emit krijgen (anders time-out in Rust)');
  assertEq(captured!.payload.id, 42, 'correlatie-id blijft');
  assertEq(captured!.payload.body, '', 'notificatie ⇒ lege respons-body');
});

// --- (3) status-flow -----------------------------------------------------------------------------

test('createStatusHandler mapt Rust-statusstrings naar de contract-state en schrijft de store bij', () => {
  const h = createStatusHandler({ setStatus: useAppStore.getState().setAiServerStatus });
  h({ state: 'running', port: 3877, message: '' });
  assertEq(useAppStore.getState().ui.aiServerStatus, { state: 'live', port: 3877 }, 'running → live (geen lege message)');
  h({ state: 'stopped', port: 3877 });
  assertEq(useAppStore.getState().ui.aiServerStatus, { state: 'off', port: 3877 }, 'stopped → off');
  h({ state: 'error', port: 3877, message: 'iets ging mis' });
  assertEq(useAppStore.getState().ui.aiServerStatus, { state: 'error', port: 3877, message: 'iets ging mis' }, 'error → error mét message');
});

test('attemptBridgeStart vertaalt een invoke-fout naar state:port-busy mét melding', async () => {
  let status: any = null;
  const ok = await attemptBridgeStart({
    invoke: async () => { throw new Error('kon niet binden op 127.0.0.1:3877: Address in use'); },
    setStatus: (s) => { status = s; },
    port: 3877,
    token: 'abc',
  });
  assertEq(ok, false, 'een bind-fout ⇒ false');
  assert(status && status.state === 'port-busy', `verwachtte port-busy, kreeg ${JSON.stringify(status)}`);
  assertEq(status.port, 3877, 'de poort wordt meegegeven');
  assert(typeof status.message === 'string' && status.message.includes('binden'), 'de bind-melding wordt doorgegeven');
});

test('attemptBridgeStart geeft true en schrijft géén status bij een gelukte invoke (status-event doet dat)', async () => {
  let status: any = null;
  let calledWith: any = null;
  const ok = await attemptBridgeStart({
    invoke: async (cmd, args) => { calledWith = { cmd, args }; return undefined; },
    setStatus: (s) => { status = s; },
    port: 3877,
    token: 'tok-xyz',
  });
  assertEq(ok, true, 'een gelukte start ⇒ true');
  assertEq(status, null, 'geen status-schrijf bij succes — het mcp://status-event zet live');
  assertEq(calledWith, { cmd: 'mcp_bridge_start', args: { port: 3877, token: 'tok-xyz' } }, 'invoke met poort + token');
});

// --- (4) pauze / alleen-lezen --------------------------------------------------------------------

test('buildMcpContext leest paused/readOnly LIVE uit de ui-state en levert de placeholder-ctx-velden', () => {
  useAppStore.getState().setAiPaused(true);
  useAppStore.getState().setAiReadOnly(false);
  let ctx = buildMcpContext();
  assertEq(ctx.paused, true, 'paused:true uit de store');
  assertEq(ctx.readOnly, false, 'readOnly:false uit de store');

  useAppStore.getState().setAiPaused(false);
  useAppStore.getState().setAiReadOnly(true);
  ctx = buildMcpContext();
  assertEq(ctx.paused, false, 'paused:false uit de store');
  assertEq(ctx.readOnly, true, 'readOnly:true uit de store');

  // Placeholder-velden — de echte runtime-laag (drift-anker / batch temp-ids / backup) is T17.
  assertEq(ctx.expectedDocId, null, 'expectedDocId is (nog) null');
  assert(ctx.tempIdMap instanceof Map && ctx.tempIdMap.size === 0, 'tempIdMap is een lege Map');
  assert(typeof ctx.ensureBackup === 'function', 'ensureBackup is een (stub-)functie');

  // Opruimen zodat andere case-bestanden een schone default-store zien.
  useAppStore.getState().setAiReadOnly(false);
});

// --- (5) listener-levenscyclus (dubbel-start-guard + stop→start-cyclus) --------------------------

/**
 * Fake-Tauri met een ACTIEVE-handler-registry per event: `listen` voegt een handler toe en geeft
 * een unlisten die 'm er weer uit haalt; `fire` roept alleen de nog-gekoppelde handlers aan. Zo
 * meet de test rechtstreeks of `cleanup()` verweesde listeners echt afmeldt (geen dubbele dispatch).
 */
function makeFakeTauri(opts?: { failStart?: boolean }) {
  const handlers = new Map<string, Set<(p: any) => void>>();
  const emitted: Array<{ event: string; payload: any }> = [];
  const invokeCalls: Array<{ cmd: string; args: any }> = [];
  let dispatchCount = 0;

  const deps: BridgeDeps = {
    listen: <T>(event: string, handler: (payload: T) => void) => {
      let set = handlers.get(event);
      if (!set) { set = new Set(); handlers.set(event, set); }
      set.add(handler as (p: any) => void);
      return Promise.resolve(() => { handlers.get(event)?.delete(handler as (p: any) => void); });
    },
    invoke: async (cmd, args) => {
      invokeCalls.push({ cmd, args });
      if (opts?.failStart && cmd === 'mcp_bridge_start') throw new Error('kon niet binden op 127.0.0.1');
      return undefined;
    },
    emit: (event, payload) => { emitted.push({ event, payload }); },
    setStatus: () => { /* niet relevant voor deze cases */ },
    buildContext: buildMcpContext,
    // Tel elke echte dispatch; body maakt niet uit voor de listener-telling.
    handleMessage: async () => { dispatchCount += 1; return '{"ok":true}'; },
    getPort: () => 3877,
    getToken: () => 'tok',
  };

  return {
    deps,
    handlerCount: (event: string) => handlers.get(event)?.size ?? 0,
    fire: (event: string, payload: any) => { for (const h of [...(handlers.get(event) ?? [])]) h(payload); },
    invokeCalls,
    emitted,
    dispatchCount: () => dispatchCount,
  };
}

const REQ_BODY = JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'ping' });

test('één start koppelt exact één listener-set (één request- + één status-listener)', async () => {
  const fake = makeFakeTauri();
  const controller = createBridgeController(fake.deps);
  await controller.start();
  assertEq(fake.handlerCount('mcp://request'), 1, 'precies één request-listener');
  assertEq(fake.handlerCount('mcp://status'), 1, 'precies één status-listener');
  assertEq(controller.activeListenerCount(), 2, 'controller telt 2 actieve listeners');
});

test('een tweede seriële start houdt exact één listener-set over (geen verweesde listeners)', async () => {
  const fake = makeFakeTauri();
  const controller = createBridgeController(fake.deps);
  await controller.start();
  await controller.start(); // tweede start: cleanup() moet de oude set afmelden vóór de nieuwe
  assertEq(fake.handlerCount('mcp://request'), 1, 'na dubbele start nog steeds één request-listener');
  assertEq(fake.handlerCount('mcp://status'), 1, 'na dubbele start nog steeds één status-listener');

  // Bewijs "geen dubbele afhandeling": één binnenkomend request → precies één dispatch.
  fake.fire('mcp://request', { id: 99, body: REQ_BODY });
  await Promise.resolve();
  assertEq(fake.dispatchCount(), 1, 'één request-event mag maar één keer door de dispatcher lopen');
});

test('twee gelijktijdige starts → in-flight-lock laat de tweede vroeg returnen (één set)', async () => {
  const fake = makeFakeTauri();
  const controller = createBridgeController(fake.deps);
  await Promise.all([controller.start(), controller.start()]);
  assertEq(fake.handlerCount('mcp://request'), 1, 'gelijktijdige start levert geen dubbele request-listener');
  assertEq(fake.handlerCount('mcp://status'), 1, 'gelijktijdige start levert geen dubbele status-listener');
  // Slechts één daadwerkelijke bridge-start-invoke (de tweede start viel op het slot vroeg af).
  assertEq(fake.invokeCalls.filter((c) => c.cmd === 'mcp_bridge_start').length, 1, 'maar één mcp_bridge_start-invoke');
});

test('stop→start-cyclus: stop meldt alles af, de herstart koppelt precies één verse set', async () => {
  const fake = makeFakeTauri();
  const controller = createBridgeController(fake.deps);
  await controller.start();
  await controller.stop();
  assertEq(fake.handlerCount('mcp://request'), 0, 'na stop geen request-listener meer');
  assertEq(fake.handlerCount('mcp://status'), 0, 'na stop geen status-listener meer');
  assertEq(controller.activeListenerCount(), 0, 'controller telt 0 na stop');
  assert(fake.invokeCalls.some((c) => c.cmd === 'mcp_bridge_stop'), 'mcp_bridge_stop is geïnvoket');

  await controller.start();
  assertEq(fake.handlerCount('mcp://request'), 1, 'herstart koppelt precies één request-listener');
  assertEq(controller.activeListenerCount(), 2, 'controller telt 2 na herstart');
});

test('een mislukte start (port-busy) ruimt zijn eigen listeners synchroon op', async () => {
  const fake = makeFakeTauri({ failStart: true });
  const controller = createBridgeController(fake.deps);
  await controller.start();
  assertEq(fake.handlerCount('mcp://request'), 0, 'bind-fout ⇒ geen achterblijvende request-listener');
  assertEq(fake.handlerCount('mcp://status'), 0, 'bind-fout ⇒ geen achterblijvende status-listener');
  assertEq(controller.activeListenerCount(), 0, 'controller telt 0 na een mislukte start');
});

await run();
