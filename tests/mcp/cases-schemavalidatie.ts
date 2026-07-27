// Audit-bevinding S — RUNTIME-schemavalidatie in de dispatcher.
//
// Vóór deze laag riep `dispatcher.ts` de handler aan ZONDER de `inputSchema` ooit te raadplegen: elke
// `type`, `enum`, `required`, `minimum`, `pattern` en `additionalProperties` in de 33 schema's ging
// wél mee in `tools/list` (waar de AI zich erop verlaat) maar werd nergens afgedwongen. Alles wat een
// tool niet zélf hercontroleerde, gleed erdoor.
//
// Deze suite draait via `handleMcpMessage` — de ECHTE dispatch-weg, niet `def.handler(...)` — want de
// poort zit daar. Getest wordt (a) de validator zelf op elk ondersteund trefwoord, (b) dat de poort in
// de dispatcher zit en een VALIDATION-tool-fout oplevert vóór enige mutatie, en (c) dat geen enkel
// van de 33 schema's een trefwoord gebruikt dat de validator niet kent (anders belooft `tools/list`
// opnieuw iets dat runtime niet waargemaakt wordt).
import { useAppStore, test, assert, assertEq, run } from './harness';
import { validateToolArgs, unsupportedKeywords } from '@/services/mcp/schemaValidate';
import { getTools, registerAllTools } from '@/services/mcp/toolRegistry';
import { handleMcpMessage } from '@/services/mcp/dispatcher';
import type { McpContext } from '@/services/mcp/contracts';

const store = useAppStore;

function makeCtx(): McpContext {
  return {
    expectedDocId: store.getState().activeDocumentId,
    tempIdMap: new Map<string, string>(),
    paused: false,
    readOnly: false,
    ensureBackup: async () => null,
  };
}

/** Roep een tool aan via de ECHTE JSON-RPC-weg en geef het uitgepakte tool-resultaat terug. */
async function rpcCall(name: string, args: unknown): Promise<any> {
  const raw = await handleMcpMessage(
    JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: args } }),
    makeCtx(),
  );
  const msg = JSON.parse(raw);
  assert(msg.result, `verwachtte een JSON-RPC-result, kreeg: ${raw.slice(0, 200)}`);
  return msg.result;
}

/** Verwacht dat de call door de schemapoort is TEGENGEHOUDEN; geeft de foutboodschap terug. */
async function expectSchemaReject(name: string, args: unknown): Promise<string> {
  const res = await rpcCall(name, args);
  assert(res.isError === true, `${name}: verwachtte isError=true, kreeg ${JSON.stringify(res.structuredContent)}`);
  const sc = res.structuredContent;
  assertEq(sc.ok, false, `${name}: structuredContent.ok moet false zijn`);
  assertEq(sc.code, 'VALIDATION', `${name}: foutcode moet VALIDATION zijn`);
  assert(typeof sc.error === 'string' && sc.error.includes(name), `${name}: de fout noemt de tool`);
  return sc.error as string;
}

// =================================================================================================
// 1) De validator zelf — per ondersteund trefwoord
// =================================================================================================
test('validator: type-mismatch noemt pad én verwachting', () => {
  const schema = { type: 'object', properties: { duration: { type: 'number' } } };
  const err = validateToolArgs(schema, { duration: '10' });
  assert(err !== null, 'een string waar een number hoort moet falen');
  assert(err!.includes('duration'), `het pad staat in de boodschap: ${err}`);
  assert(err!.includes('verwacht number'), `de verwachting staat in de boodschap: ${err}`);
  assert(err!.includes('"10"'), `de ONTVANGEN waarde staat in de boodschap: ${err}`);
});

test('validator: geneste paden krijgen array-index en puntnotatie', () => {
  const schema = {
    type: 'object',
    properties: {
      updates: { type: 'array', items: { type: 'object', properties: { fields: { type: 'object', properties: { duration: { type: 'number' } } } } } },
    },
  };
  const err = validateToolArgs(schema, { updates: [{ fields: { duration: '10' } }] });
  assert(err !== null, 'moet falen');
  assert(err!.startsWith('updates[0].fields.duration:'), `exact pad verwacht, kreeg: ${err}`);
});

test('validator: type als ARRAY-vorm (["string","null"]) blijft werken', () => {
  const schema = { type: 'object', properties: { newParentId: { type: ['string', 'null'] } } };
  assertEq(validateToolArgs(schema, { newParentId: null }), null, 'null is toegestaan');
  assertEq(validateToolArgs(schema, { newParentId: 't1' }), null, 'string is toegestaan');
  assert(validateToolArgs(schema, { newParentId: 7 }) !== null, 'een getal niet');
});

test('validator: object-trefwoorden slaan NIET op null (constraint: ["object","null"] + required)', () => {
  // Zou `required` ook op null slaan, dan werd `constraint: null` (wissen) ineens een fout.
  const schema = {
    type: 'object',
    properties: { constraint: { type: ['object', 'null'], required: ['type'], properties: { type: { type: 'string' } }, additionalProperties: false } },
  };
  assertEq(validateToolArgs(schema, { constraint: null }), null, 'null wist de constraint en is geldig');
  assert(validateToolArgs(schema, { constraint: {} }) !== null, 'een object zonder `type` is wél fout');
});

test('validator: enum, required, additionalProperties, minItems/maxItems, minimum/maximum/exclusiveMinimum, pattern, integer', () => {
  assert(validateToolArgs({ type: 'object', properties: { s: { type: 'string', enum: ['a', 'b'] } } }, { s: 'c' })!.includes('moet één van'), 'enum');
  assert(validateToolArgs({ type: 'object', required: ['ids'], properties: { ids: { type: 'array' } } }, {})!.includes('`ids`'), 'required');
  assert(validateToolArgs({ type: 'object', properties: { a: { type: 'string' } }, additionalProperties: false }, { b: 1 })!.includes('onbekend veld'), 'additionalProperties');
  assert(validateToolArgs({ type: 'object', properties: { xs: { type: 'array', minItems: 1 } } }, { xs: [] })!.includes('minstens 1'), 'minItems');
  assert(validateToolArgs({ type: 'object', properties: { xs: { type: 'array', maxItems: 1 } } }, { xs: [1, 2] })!.includes('hoogstens 1'), 'maxItems');
  assert(validateToolArgs({ type: 'object', properties: { n: { type: 'number', minimum: 0 } } }, { n: -1 })!.includes('≥ 0'), 'minimum');
  assert(validateToolArgs({ type: 'object', properties: { n: { type: 'number', maximum: 100 } } }, { n: 101 })!.includes('≤ 100'), 'maximum');
  assert(validateToolArgs({ type: 'object', properties: { n: { type: 'number', exclusiveMinimum: 0 } } }, { n: 0 })!.includes('> 0'), 'exclusiveMinimum');
  assert(validateToolArgs({ type: 'object', properties: { t: { type: 'string', pattern: '^tmp[-_]' } } }, { t: 'A' })!.includes('patroon'), 'pattern');
  assert(validateToolArgs({ type: 'object', properties: { i: { type: 'integer' } } }, { i: 1.5 })!.includes('verwacht integer'), 'integer vs number');
  assertEq(validateToolArgs({ type: 'object', properties: { n: { type: 'number' } } }, { n: 2 }), null, 'een geheel getal is ook een number');
});

test('validator: ontbrekende argumenten tellen als {} ⇒ nette required-melding, geen "kreeg undefined"', () => {
  const schema = { type: 'object', required: ['ids'], properties: { ids: { type: 'array' } } };
  const err = validateToolArgs(schema, undefined);
  assert(err !== null && err.includes('verplicht veld `ids` ontbreekt'), `verwachtte required-melding, kreeg: ${err}`);
  assertEq(validateToolArgs({ type: 'object', properties: {} }, undefined), null, 'geen required ⇒ geen argumenten is prima');
});

test('validator: meerdere schendingen komen in ÉÉN boodschap terug', () => {
  const schema = { type: 'object', properties: { a: { type: 'number' }, b: { type: 'string' } }, additionalProperties: false };
  const err = validateToolArgs(schema, { a: 'x', b: 1, c: true });
  assert(err !== null && err.split(';').length >= 3, `drie schendingen verwacht, kreeg: ${err}`);
});

// =================================================================================================
// 2) De poort zit in de DISPATCHER (en vóór de handler)
// =================================================================================================
test('dispatcher: de poort zit VÓÓR de handler — een pattern-schending muteert niets meer', async () => {
  // Bewust een schending die ALLEEN het schema kent: `pattern: ^tmp[-_]` op tempId. De handler
  // controleert die niet, dus zónder de poort werd de taak gewoon aangemaakt en antwoordde de tool ok.
  registerAllTools();
  store.getState().newProject();
  const err = await expectSchemaReject('planner_add_tasks', { tasks: [{ tempId: 'A', name: 'Zonder prefix' }] });
  assert(err.includes('tasks[0].tempId'), `pad in de fout: ${err}`);
  assertEq(store.getState().tasks.length, 0, 'de handler is NIET bereikt: geen enkele taak aangemaakt');
});

test('dispatcher: `duration: "10"` (de klassieke LLM-vorm) wordt met pad en verwachting geweigerd', async () => {
  registerAllTools();
  store.getState().newProject();
  const err = await expectSchemaReject('planner_add_tasks', { tasks: [{ tempId: 'tmp-a', name: 'A', duration: '10' }] });
  assert(err.includes('tasks[0].duration'), `pad in de fout: ${err}`);
  assert(err.includes('verwacht number'), `verwachting in de fout: ${err}`);
  assertEq(store.getState().tasks.length, 0, 'geen taak aangemaakt');
});

test('dispatcher: onbekende sleutel op een MUTATIETOOL wordt nu geweigerd (additionalProperties)', async () => {
  registerAllTools();
  const err = await expectSchemaReject('planner_delete_tasks', { ids: ['x'], cascade: true });
  assert(err.includes('cascade'), `de onbekende sleutel wordt bij naam genoemd: ${err}`);
});

test('dispatcher: lege verplichte array (minItems) en ontbrekend verplicht veld worden geweigerd', async () => {
  registerAllTools();
  assert((await expectSchemaReject('planner_delete_tasks', { ids: [] })).includes('minstens 1'), 'minItems');
  assert((await expectSchemaReject('planner_update_tasks', {})).includes('`updates`'), 'required');
});

test('dispatcher: L3 — `position: "abc"` op move_task wordt door de schemapoort gestopt', async () => {
  registerAllTools();
  const err = await expectSchemaReject('planner_move_task', { id: 't1', newParentId: null, position: 'abc' });
  assert(err.includes('position') && err.includes('integer'), `verwachtte een integer-melding, kreeg: ${err}`);
});

test('dispatcher: een GELDIGE call passeert de poort ongehinderd', async () => {
  registerAllTools();
  store.getState().newProject();
  const res = await rpcCall('planner_add_tasks', { tasks: [{ tempId: 'tmp-ok', name: 'Geldig', duration: 3 }] });
  assertEq(res.isError, false, `geldige call moet slagen: ${JSON.stringify(res.structuredContent)}`);
  assertEq(store.getState().tasks.length, 1, 'de taak is echt aangemaakt');
});

// =================================================================================================
// 3) Schema-dekking over ALLE 33 tools
// =================================================================================================
test('alle 33 inputSchema\'s gebruiken uitsluitend trefwoorden die de validator afdwingt', () => {
  registerAllTools();
  const tools = getTools();
  assert(tools.length === 33, `verwachtte 33 tools, kreeg ${tools.length}`);
  const offenders: string[] = [];
  for (const t of tools) {
    const unknown = unsupportedKeywords(t.inputSchema);
    if (unknown.length > 0) offenders.push(`${t.name}: ${unknown.join(', ')}`);
  }
  assertEq(offenders, [], `deze schema's beloven iets dat runtime NIET wordt afgedwongen:\n  ${offenders.join('\n  ')}`);
});

test('elk schema is een object-schema met properties (zodat additionalProperties betekenis heeft)', () => {
  registerAllTools();
  for (const t of getTools()) {
    const s = t.inputSchema as any;
    assertEq(s.type, 'object', `${t.name}: wortelschema moet type object zijn`);
    assert(s.properties && typeof s.properties === 'object', `${t.name}: wortelschema mist properties`);
  }
});

await run();
