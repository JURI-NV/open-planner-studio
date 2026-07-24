// T9 — MCP-dispatcher + toolRegistry: rauwe JSON-RPC-strings door `handleMcpMessage` met een
// STUB-registry. Geen SDK, geen HTTP — puur de protocol-/routeringslaag headless op Node.
//
// De store is hier niet nodig; we importeren `test`/`assert`/`run` uit de harness (die de DOM-shim
// en de store-re-export meebrengt — onschadelijk) en registreren stub-tools in de registry.
import { test, assert, assertEq, run } from './harness';
import type { McpToolDef, McpToolResult, McpContext } from '@/services/mcp/contracts';
import { registerToolModules } from '@/services/mcp/toolRegistry';
import {
  handleMcpMessage,
  MCP_SERVER_NAME,
  MCP_SERVER_VERSION,
  DEFAULT_PROTOCOL_VERSION,
} from '@/services/mcp/dispatcher';

// --- Stub-omgeving -------------------------------------------------------------------------------

const stubEnvelope = {
  activeDocumentId: 'doc-1',
  documentTitle: 'Teststub',
  scheduleStale: false,
  paused: false,
  readOnly: false,
};

/** Leestool die zijn args echoot — bewijst arg-routering + ok-verpakking. */
const echoTool: McpToolDef = {
  name: 'planner_echo',
  kind: 'read',
  batchable: true,
  inputSchema: {
    type: 'object',
    description: 'Echoot de meegegeven waarde terug (teststub).',
    properties: { value: { type: 'string' } },
  },
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: (args): McpToolResult => ({ ok: true, envelope: stubEnvelope, data: { received: args } }),
};

/** Muteertool die altijd faalt — bewijst error-verpakking + isError-vlag. */
const failTool: McpToolDef = {
  name: 'planner_fail',
  kind: 'mutate',
  batchable: false,
  inputSchema: { type: 'object', description: 'Faalt altijd (teststub).', properties: {} },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: (): McpToolResult => ({ ok: false, envelope: stubEnvelope, error: 'stub-fout', code: 'VALIDATION' }),
};

// Registreer de goede stubs bij module-load. Latere bad-registration-tests gooien vóór ze de
// interne staat vervangen, dus deze blijven gedurende de hele run geregistreerd.
registerToolModules([[echoTool], [failTool]]);

const ctx: McpContext = {
  expectedDocId: null,
  tempIdMap: new Map<string, string>(),
  paused: false,
  readOnly: false,
  ensureBackup: async () => null,
};

/** Stuur een rauw JSON-RPC-bericht en parse het antwoord (of geef de rauwe string terug). */
async function send(body: unknown): Promise<any> {
  const raw = await handleMcpMessage(typeof body === 'string' ? body : JSON.stringify(body), ctx);
  return raw;
}

function assertThrows(fn: () => void, needle: string, label: string): void {
  let threw = false;
  try {
    fn();
  } catch (e) {
    threw = true;
    const m = e instanceof Error ? e.message : String(e);
    assert(m.includes(needle), `${label}: verwachtte foutmelding met "${needle}", kreeg "${m}"`);
  }
  assert(threw, `${label}: verwachtte een throw, maar er werd niets gegooid`);
}

// --- Tests ---------------------------------------------------------------------------------------

test('initialize echoot een bekende client-protocolversie', async () => {
  const raw = await send({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18' } });
  const msg = JSON.parse(raw);
  assertEq(msg.jsonrpc, '2.0', 'jsonrpc-veld');
  assertEq(msg.id, 1, 'id-echo');
  assertEq(msg.result.protocolVersion, '2025-06-18', 'protocolVersion-echo');
  assertEq(msg.result.capabilities, { tools: {} }, 'capabilities.tools');
  assertEq(msg.result.serverInfo.name, MCP_SERVER_NAME, 'serverInfo.name');
  assertEq(msg.result.serverInfo.version, MCP_SERVER_VERSION, 'serverInfo.version');
});

test('initialize valt terug op de default bij een onbekende client-versie', async () => {
  const raw = await send({ jsonrpc: '2.0', id: 2, method: 'initialize', params: { protocolVersion: '1999-01-01' } });
  const msg = JSON.parse(raw);
  assertEq(msg.result.protocolVersion, DEFAULT_PROTOCOL_VERSION, 'default protocolVersion');
});

test('notifications/initialized geeft een lege string (geen respons)', async () => {
  const raw = await send({ jsonrpc: '2.0', method: 'notifications/initialized' });
  assertEq(raw, '', 'lege string bij notificatie');
});

test('tools/list bevat de stubs met schema + annotations en alle namen dragen planner_', async () => {
  const raw = await send({ jsonrpc: '2.0', id: 3, method: 'tools/list' });
  const msg = JSON.parse(raw);
  const tools: any[] = msg.result.tools;
  assert(Array.isArray(tools) && tools.length >= 2, 'tools-array met minstens 2 stubs');
  for (const t of tools) {
    assert(typeof t.name === 'string' && t.name.startsWith('planner_'), `naam mist planner_-prefix: ${t.name}`);
    assert(t.inputSchema != null && typeof t.inputSchema === 'object', `inputSchema ontbreekt op ${t.name}`);
    assert(t.annotations != null && typeof t.annotations.readOnlyHint === 'boolean', `annotations ontbreekt op ${t.name}`);
    assert(typeof t.description === 'string', `description ontbreekt op ${t.name}`);
  }
  const echo = tools.find((t) => t.name === 'planner_echo');
  assertEq(echo.description, 'Echoot de meegegeven waarde terug (teststub).', 'echo-description uit inputSchema');
  assertEq(echo.annotations.readOnlyHint, true, 'echo readOnlyHint');
});

test('tools/call routeert args naar de stub en verpakt een ok-resultaat', async () => {
  const raw = await send({
    jsonrpc: '2.0', id: 4, method: 'tools/call',
    params: { name: 'planner_echo', arguments: { value: 'hoi' } },
  });
  const msg = JSON.parse(raw);
  assertEq(msg.result.isError, false, 'ok ⇒ isError false');
  assertEq(msg.result.structuredContent.data.received, { value: 'hoi' }, 'args gerouteerd naar handler');
  assert(Array.isArray(msg.result.content) && msg.result.content[0].type === 'text', 'content[0] is text');
  // content[0].text is de geserialiseerde McpToolResult.
  const parsed = JSON.parse(msg.result.content[0].text);
  assertEq(parsed.ok, true, 'content-text bevat het ok-resultaat');
  assertEq(msg.result.structuredContent.ok, true, 'structuredContent = het rauwe resultaat');
});

test('tools/call verpakt een error-resultaat met isError true', async () => {
  const raw = await send({
    jsonrpc: '2.0', id: 5, method: 'tools/call',
    params: { name: 'planner_fail', arguments: {} },
  });
  const msg = JSON.parse(raw);
  assertEq(msg.result.isError, true, 'niet-ok ⇒ isError true');
  assertEq(msg.result.structuredContent.ok, false, 'structuredContent.ok false');
  assertEq(msg.result.structuredContent.code, 'VALIDATION', 'error-code doorgegeven');
});

test('tools/call op een onbekende tool geeft JSON-RPC -32602', async () => {
  const raw = await send({
    jsonrpc: '2.0', id: 6, method: 'tools/call',
    params: { name: 'planner_bestaat_niet', arguments: {} },
  });
  const msg = JSON.parse(raw);
  assertEq(msg.error.code, -32602, 'onbekende tool ⇒ -32602');
  assert(msg.result === undefined, 'geen result-veld bij een fout');
});

test('ping geeft een leeg result-object', async () => {
  const raw = await send({ jsonrpc: '2.0', id: 7, method: 'ping' });
  const msg = JSON.parse(raw);
  assertEq(msg.result, {}, 'ping ⇒ leeg result');
});

test('onbekende methode geeft JSON-RPC -32601', async () => {
  const raw = await send({ jsonrpc: '2.0', id: 8, method: 'geen/methode' });
  const msg = JSON.parse(raw);
  assertEq(msg.error.code, -32601, 'onbekende methode ⇒ -32601');
});

test('JSON-parse-fout geeft -32700 met id null', async () => {
  const raw = await handleMcpMessage('{ dit is geen json', ctx);
  const msg = JSON.parse(raw);
  assertEq(msg.error.code, -32700, 'parse-fout ⇒ -32700');
  assertEq(msg.id, null, 'parse-fout ⇒ id null');
});

test('een batch-array geeft -32600', async () => {
  const raw = await handleMcpMessage('[{"jsonrpc":"2.0","id":1,"method":"ping"}]', ctx);
  const msg = JSON.parse(raw);
  assertEq(msg.error.code, -32600, 'array ⇒ -32600');
});

test('dubbele toolnaam bij registratie gooit hard', () => {
  assertThrows(
    () => registerToolModules([[echoTool], [echoTool]]),
    'Dubbele',
    'dubbele registratie',
  );
});

test('een toolnaam zonder planner_-prefix gooit bij registratie', () => {
  const badTool: McpToolDef = { ...echoTool, name: 'echo_zonder_prefix' };
  assertThrows(
    () => registerToolModules([[badTool]]),
    'prefix',
    'ontbrekende prefix',
  );
});

await run();
