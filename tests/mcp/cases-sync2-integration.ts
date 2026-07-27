// SYNC-2 — de INTEGRATIEdraden tussen de tool-banen. Elke baan testte zijn eigen module; dit bestand
// test uitsluitend wat pas ontstaat als ze samen in één binary zitten:
//
//   A. de T16-backup-naad is écht gekoppeld (`documentToolDeps.markDuplicateBorn` ≠ de no-op default);
//   B. elke batchbare mutatietool draagt een synchrone `batchStep`-kern, en een draaiboek met
//      add_tasks → add_dependencies → update_calendar → update_project loopt end-to-end (spec-usecase 1);
//   C. de registratie draait op een PRODUCTIEpad, niet alleen in tests;
//   D. de toolstelling: het aantal, de `planner_`-prefix, een niet-lege description en alle vier de
//      MCP-annotaties op élke tool.

// --- localStorage-shim (vóór elke @/-import; server.ts sleept settingsStore mee) ------------------
const backing = new Map<string, string>();
(globalThis as any).localStorage = {
  getItem: (k: string) => (backing.has(k) ? backing.get(k)! : null),
  setItem: (k: string, v: string) => { backing.set(k, v); },
  removeItem: (k: string) => { backing.delete(k); },
};

import { useAppStore, test, assert, assertEq, run } from './harness';
import './uiShim';
import { getTool, getTools } from '@/services/mcp/toolRegistry';
import { handleMcpMessage } from '@/services/mcp/dispatcher';
import { documentToolDeps } from '@/services/mcp/tools/documentTools';
import { createBackupService } from '@/services/mcp/backup';
// Het IMPORTEREN van server.ts draait `initMcpRuntime()` — precies het productiepad dat draad A en C
// leggen. Niets uit deze import wordt hier aangeroepen; de side-effect ÍS wat we testen.
import { initMcpRuntime } from '@/services/mcp/server';
import type { McpContext, McpToolDef, McpToolResult, McpToolOk } from '@/services/mcp/contracts';
import type { BatchStepTool } from '@/services/mcp/tools/batchTool';

const S = () => useAppStore.getState();

function makeCtx(over: Partial<McpContext> = {}): McpContext {
  return {
    expectedDocId: null,
    tempIdMap: new Map<string, string>(),
    paused: false,
    readOnly: false,
    ensureBackup: async () => null,
    ...over,
  };
}

// =================================================================================================
// D. Toolstelling — het contract dat de AI te zien krijgt
// =================================================================================================

/**
 * De VERWACHTE toolstelling, per baan uitgesplitst. Dit getal is met opzet hard: raakt een baan een
 * tool kwijt (of registreert iemand een module dubbel), dan valt deze test om in plaats van dat
 * `tools/list` stilletjes verschuift.
 */
const EXPECTED_TOOLS = {
  read: 10,          // T18/T18b — leestools
  taskMutate: 6,     // T19 — add/update/delete_tasks, move_task, add/remove_dependencies
  taskOther: 3,      // T19 — undo, redo, run_cpm
  calResMutate: 7,   // T20 — update_calendar, manage_assignments, level_resources, clear_leveling,
                     //        update_project, move_project, save_baseline
  document: 4,       // T21 — list/new/switch/duplicate_document
  file: 2,           // T21 — export_ifc, import_schedule
  batch: 1,          // T22 — planner_batch
};
const EXPECTED_TOTAL = Object.values(EXPECTED_TOOLS).reduce((a, b) => a + b, 0); // = 33

test('tools/list levert exact de verwachte toolstelling (33) via de dispatcher', async () => {
  const raw = await handleMcpMessage(
    JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }),
    makeCtx(),
  );
  const resp = JSON.parse(raw);
  assert(resp.result !== undefined, `tools/list gaf een fout terug: ${raw.slice(0, 300)}`);
  const tools = resp.result.tools as { name: string; description?: string; annotations?: unknown }[];
  assertEq(tools.length, EXPECTED_TOTAL, `tools/list moet ${EXPECTED_TOTAL} tools tellen`);
  // De dispatcher put uit dezelfde registry; als die twee uiteenlopen klopt er iets fundamenteels niet.
  assertEq(getTools().length, EXPECTED_TOTAL, 'de registry telt hetzelfde aantal als tools/list');
});

test('élke tool draagt planner_-prefix, een niet-lege description en alle VIER de annotaties', async () => {
  const raw = await handleMcpMessage(
    JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/list' }),
    makeCtx(),
  );
  const tools = JSON.parse(raw).result.tools as {
    name: string;
    description?: string;
    annotations?: Record<string, unknown>;
  }[];
  const ANNOT = ['readOnlyHint', 'destructiveHint', 'idempotentHint', 'openWorldHint'];
  for (const t of tools) {
    assert(t.name.startsWith('planner_'), `tool '${t.name}' mist de planner_-prefix`);
    assert(
      typeof t.description === 'string' && t.description.trim() !== '',
      `tool '${t.name}' heeft een lege description (de AI kiest tools op beschrijving)`,
    );
    for (const key of ANNOT) {
      assert(
        t.annotations !== undefined && typeof t.annotations[key] === 'boolean',
        `tool '${t.name}' mist de annotatie '${key}'`,
      );
    }
  }
});

test('geen dubbele toolnamen over de zes modules heen', async () => {
  const names = getTools().map((t) => t.name);
  assertEq(new Set(names).size, names.length, 'alle toolnamen zijn uniek');
});

// =================================================================================================
// C. Registratie draait op een PRODUCTIEpad
// =================================================================================================

test('initMcpRuntime is idempotent en herstelt een afgeknotte registratie', async () => {
  const before = getTools().length;
  initMcpRuntime();
  assertEq(getTools().length, before, 'een tweede aanroep verandert de registratie niet');
  assert(getTool('planner_batch') !== undefined, 'planner_batch is opzoekbaar na de init');
});

// =================================================================================================
// A. De T16-backup-naad is gekoppeld
// =================================================================================================

test('documentToolDeps.markDuplicateBorn is de ECHTE backup-functie, niet de no-op default', async () => {
  // De no-op default is een pijlfunctie zonder parameters; de echte doorgeef-functie uit backup.ts
  // neemt er één. Dat is een structurele, niet-brosse manier om "is de naad gelegd" vast te stellen.
  assertEq(
    documentToolDeps.markDuplicateBorn.length,
    1,
    'de naad wijst nog naar de parameterloze no-op — initMcpRuntime() is niet gedraaid',
  );
});

test('de naad werkt gedragsmatig: een duplicate-born document slaat de auto-backup over', async () => {
  // Bewijst het EFFECT waar de naad voor bestaat, op een eigen service-instantie (de echte
  // module-singleton schrijft naar de Tauri-fs, die hier niet bestaat).
  let writes = 0;
  const svc = createBackupService({
    getFs: async () => ({
      appDataDir: async () => '/app',
      join: async (...p: string[]) => p.join('/'),
      mkdir: async () => {},
      writeTextFile: async () => { writes += 1; },
      readDir: async () => [],
      remove: async () => {},
    }),
    getDoc: () => ({ projectName: 'Test', ifc: 'ISO-10303-21;' }),
    activeDocId: () => 'doc-dup',
    autoBackupEnabled: async () => true,
    now: () => 1_700_000_000_000,
  });

  await svc.ensureBackup('doc-normaal', 'mutate');
  assertEq(writes, 1, 'een gewoon document krijgt wél een auto-backup');

  svc.markDuplicateBorn('doc-dup');
  await svc.ensureBackup('doc-dup', 'mutate');
  assertEq(writes, 1, 'een duplicate-born document krijgt GEEN extra auto-backup');
});

// =================================================================================================
// B. batchStep-kernen
// =================================================================================================

/** Tools die per spec §Compositie nooit een batch-stap zijn en dus geen kern hoeven te hebben. */
const NO_CORE_EXPECTED = new Set([
  'planner_save_baseline',   // batchable: false — een baseline hoort een losse, bewuste nulmeting te zijn
  'planner_undo', 'planner_redo', 'planner_run_cpm',
  'planner_export_ifc', 'planner_import_schedule',
  'planner_new_document', 'planner_switch_document', 'planner_duplicate_document', 'planner_list_documents',
  'planner_batch',
]);

test('élke batchbare mutatietool draagt een synchrone batchStep-kern', async () => {
  const missing: string[] = [];
  for (const def of getTools() as BatchStepTool[]) {
    if (def.kind === 'read' || NO_CORE_EXPECTED.has(def.name)) continue;
    if ((def as McpToolDef & { batchable?: boolean }).batchable === false) continue;
    if (typeof def.batchStep !== 'function') missing.push(def.name);
  }
  assertEq(missing, [], `deze batchbare mutatietools missen een batchStep-kern: ${missing.join(', ')}`);
});

test('save_baseline heeft bewust GEEN kern (batchable: false)', async () => {
  const def = getTool('planner_save_baseline') as BatchStepTool;
  assert(def !== undefined, 'planner_save_baseline is geregistreerd');
  assertEq((def as McpToolDef & { batchable?: boolean }).batchable, false, 'save_baseline is niet batchbaar');
  assertEq(def.batchStep, undefined, 'save_baseline draagt bewust geen batchStep-kern');
});

test('spec-usecase 1: bestek → planning in ÉÉN batch (tasks + relaties + kalender + project)', async () => {
  S().newProject();
  const ctx = makeCtx();
  const before = S().tasks.length;

  const raw = await handleMcpMessage(
    JSON.stringify({
      jsonrpc: '2.0',
      id: 9,
      method: 'tools/call',
      params: {
        name: 'planner_batch',
        arguments: {
          steps: [
            { tool: 'planner_update_project', args: { name: 'Bestek A', startDate: '2026-03-02' } },
            {
              tool: 'planner_update_calendar',
              args: { calendars: [{ id: 'cal-bouw', create: true, name: 'Bouwkalender', hoursPerDay: 8 }] },
            },
            {
              tool: 'planner_add_tasks',
              args: {
                tasks: [
                  { tempId: 'tmp-fundering', name: 'Fundering', duration: 10 },
                  { tempId: 'tmp-ruwbouw', name: 'Ruwbouw', duration: 20 },
                ],
              },
            },
            {
              tool: 'planner_add_dependencies',
              args: {
                dependencies: [
                  { predecessorId: 'tmp-fundering', successorId: 'tmp-ruwbouw', type: 'FINISH_START' },
                ],
              },
            },
          ],
        },
      },
    }),
    ctx,
  );

  const resp = JSON.parse(raw);
  assert(resp.result !== undefined, `de batch faalde: ${raw.slice(0, 600)}`);
  const payload = JSON.parse(resp.result.content[0].text) as McpToolResult;
  assert(payload.ok === true, `de batch gaf een fout terug: ${raw.slice(0, 600)}`);
  const data = (payload as McpToolOk).data as { stepCount: number; steps: { status: string }[] };
  assertEq(data.stepCount, 4, 'alle vier de stappen zijn ingezonden');
  assertEq(
    data.steps.map((s) => s.status),
    ['uitgevoerd', 'uitgevoerd', 'uitgevoerd', 'uitgevoerd'],
    'alle vier de stappen zijn uitgevoerd',
  );

  // De echte bewijslast: de store draagt het resultaat van álle vier de banen.
  assertEq(S().project.name, 'Bestek A', 'update_project (baan f2) landde');
  assert(S().calendars.some((c) => c.name === 'Bouwkalender'), 'update_calendar (baan f2) landde');
  assertEq(S().tasks.length, before + 2, 'add_tasks (baan f2) landde');
  assertEq(S().sequences.length, 1, 'add_dependencies (baan f2) landde');
  // tempId-resolutie over stapgrenzen heen (baan f4) — de relatie wijst naar de ECHTE id's.
  const fundering = S().tasks.find((t) => t.name === 'Fundering')!;
  const ruwbouw = S().tasks.find((t) => t.name === 'Ruwbouw')!;
  assertEq(S().sequences[0].predecessorId, fundering.id, 'de tempId van de voorganger is opgelost');
  assertEq(S().sequences[0].successorId, ruwbouw.id, 'de tempId van de opvolger is opgelost');
  // Eén batch = één undo-stap (WP0-invariant).
  assert(S().undoStack.length >= 1, 'de batch pushte een undo-snapshot');
});

test('een batch met een onbekende tool rolt ALLES terug (de vangrail werkt over de banen heen)', async () => {
  S().newProject();
  const before = S().tasks.length;
  const raw = await handleMcpMessage(
    JSON.stringify({
      jsonrpc: '2.0',
      id: 10,
      method: 'tools/call',
      params: {
        name: 'planner_batch',
        arguments: {
          steps: [
            { tool: 'planner_add_tasks', args: { tasks: [{ tempId: 'x', name: 'Wordt teruggedraaid', duration: 5 }] } },
            { tool: 'planner_bestaat_niet', args: {} },
          ],
        },
      },
    }),
    makeCtx(),
  );
  const payload = JSON.parse(JSON.parse(raw).result.content[0].text) as McpToolResult;
  assertEq(payload.ok, false, 'de batch weigert');
  assertEq(S().tasks.length, before, 'de eerste (geslaagde) stap is teruggedraaid');
});

run();
