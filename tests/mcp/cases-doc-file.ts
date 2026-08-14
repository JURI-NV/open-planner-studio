// Taak T21 — de vier DOCUMENT-tools + de twee BESTANDS-tools (spec §Tool-set Documenten regel 90,
// §Bestands-tools 107-111, §Sessie-semantiek/drift-anker 116).
//
// Draait headless tegen de ECHTE Zustand-store. De fs/Tauri-rand is GEFAKED via de geëxporteerde
// dependency-naad `fileToolDeps.getFs` (in-memory bestandsmap) — er wordt in deze suite dus nooit
// een echt bestand geschreven en `isTauri()` (die `window` leest) wordt nooit aangeraakt.
// De T16-hook `markDuplicateBorn` loopt via `documentToolDeps` en wordt hier bespioneerd.
import { useAppStore, test, assert, assertEq, run } from './harness';
import { getTool } from '@/services/mcp/toolRegistry';
import type { McpContext, McpToolResult, McpToolOk, McpToolErr } from '@/services/mcp/contracts';
import { documentToolDeps } from '@/services/mcp/tools/documentTools';
import { fileToolDeps, type McpFileFs } from '@/services/mcp/tools/fileTools';
import { generateBenchmarkProject } from '@/services/benchmark/generateProject';
import { writeIFC } from '@/services/ifc/ifcWriter';
import { writeCSV } from '@/services/csv/csvWriter';
import { buildWriteIFCInput } from '@/state/ifcSaveInput';
import type { CPMResult } from '@/engine/scheduler/CPMSolver';

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

/** Roep een geregistreerde tool aan (sync of async) en geef het rauwe resultaat terug. */
async function call(name: string, args: unknown = {}, ctx: McpContext = makeCtx()): Promise<McpToolResult> {
  const tool = getTool(name);
  assert(!!tool, `tool ${name} niet geregistreerd`);
  return await tool!.handler(args, ctx);
}

/** Idem, maar eist ok:true en levert de `data`. */
async function callOk(name: string, args: unknown = {}, ctx: McpContext = makeCtx()): Promise<any> {
  const res = await call(name, args, ctx);
  assert(res.ok, `tool ${name} gaf een fout: ${res.ok ? '' : res.error}`);
  return (res as McpToolOk).data;
}

/** Idem, maar eist ok:false en levert de fout. */
async function callErr(name: string, args: unknown = {}, ctx: McpContext = makeCtx()): Promise<McpToolErr> {
  const res = await call(name, args, ctx);
  assert(!res.ok, `tool ${name} had een fout moeten geven maar slaagde`);
  return res as McpToolErr;
}

// --- Fake fs (in-memory) -------------------------------------------------------------------------

const HOME = '/home/tester';
let files = new Map<string, string>();

function installFakeFs(): void {
  files = new Map<string, string>();
  const fs: McpFileFs = {
    homeDir: async () => HOME,
    exists: async (p) => files.has(p),
    writeTextFile: async (p, c) => { files.set(p, c); },
    readTextFile: async (p) => {
      const v = files.get(p);
      if (v === undefined) throw new Error(`ENOENT: ${p}`);
      return v;
    },
    readFile: async (p) => {
      const v = files.get(p);
      if (v === undefined) throw new Error(`ENOENT: ${p}`);
      return new TextEncoder().encode(v);
    },
  };
  fileToolDeps.getFs = async () => fs;
}
installFakeFs();

/** Vers document met een klein doorgerekend benchmarkproject; retourneert het aantal taken. */
function loadSmallProject(name: string): number {
  const gen = generateBenchmarkProject(12);
  S().applyLoadedProject(gen, { filePath: null, recompute: true });
  S().setProject({ name, startDate: '2026-06-01' });
  S().runCPM();
  return gen.tasks.length;
}

/** Reset naar één enkel, leeg (pristine) document. */
function resetToSingleEmptyDocument(): void {
  for (const d of [...S().documents]) {
    if (d.id !== S().activeDocumentId) S().closeDocument(d.id);
  }
  S().closeDocument(S().activeDocumentId); // laatste sluiten ⇒ reset naar één vers, leeg document
}

// =================================================================================================
// 1. Registratie
// =================================================================================================
test('registratie: 6 document-/bestands-tools met planner_-prefix, description en batchable:false', () => {
  const names = [
    'planner_list_documents', 'planner_new_document', 'planner_duplicate_document',
    'planner_switch_document', 'planner_export_ifc', 'planner_import_schedule',
  ];
  for (const n of names) {
    const t = getTool(n);
    assert(!!t, `tool ${n} ontbreekt in de registry`);
    assert(t!.description.trim().length > 40, `${n} mist een zinvolle description`);
    assertEq(t!.batchable, false, `${n} is spec-uitgesloten van batch ⇒ batchable:false`);
  }
  assertEq(getTool('planner_list_documents')!.annotations.readOnlyHint, true, 'list_documents is een leestool');
  assertEq(getTool('planner_switch_document')!.annotations.idempotentHint, true, 'switch_document is idempotent (spec regel 65)');
  assertEq(getTool('planner_import_schedule')!.annotations.destructiveHint, true, 'import_schedule draagt destructiveHint (spec regel 65)');
  // Bestands-tools raken de wereld BUITEN de app (spec regel 65: "behalve de expliciete bestands-tools").
  assertEq(getTool('planner_export_ifc')!.annotations.openWorldHint, true, 'export_ifc raakt het bestandssysteem');
  assertEq(getTool('planner_list_documents')!.annotations.openWorldHint, false, 'document-tools blijven binnen de app');
});

// =================================================================================================
// 2. list_documents — verrijkte velden over twee documenten
// =================================================================================================
test('list_documents: twee documenten met titel, dirty/actief, projectstart, projecteinde en taakaantal', async () => {
  resetToSingleEmptyDocument();
  const taskCount = loadSmallProject('Basis');
  const firstId = S().activeDocumentId;
  const secondId = S().newDocument();
  S().setProject({ name: 'Tweede', startDate: '2026-09-07' });

  const data = await callOk('planner_list_documents');
  assertEq(data.activeDocumentId, secondId, 'envelop/data moet het tweede document als actief melden');
  assertEq(data.documents.length, 2, 'twee open documenten verwacht');

  const first = data.documents.find((d: any) => d.id === firstId);
  assertEq(first.title, 'Basis', 'titel valt terug op de projectnaam (geen filePath)');
  assertEq(first.isActive, false, 'het eerste document is niet meer actief');
  assertEq(first.isDirty, true, 'setProject heeft het eerste document vuil gemaakt');
  assertEq(first.taskCount, taskCount, 'taakaantal van het geparkeerde document');
  assertEq(first.projectStart, '2026-06-01', 'projectstart komt uit project.startDate (het anker)');
  assert(typeof first.projectEnd === 'string' && first.projectEnd.length >= 10, 'projecteinde komt uit cpmResult.projectEnd');
  assertEq(first.notCalculated, undefined, 'een doorgerekend document draagt geen niet-doorgerekend-signaal');

  const second = data.documents.find((d: any) => d.id === secondId);
  assertEq(second.isActive, true, 'het tweede document is actief');
  assertEq(second.taskCount, 0, 'een vers document heeft geen taken');
  assertEq(second.projectStart, '2026-09-07', 'projectstart van het tweede document');
  assertEq(second.notCalculated, true, 'een nooit doorgerekend document meldt "niet doorgerekend"');
  assertEq(second.projectEnd, undefined, 'geen projecteinde zonder cpmResult');
});

// =================================================================================================
// 3. "Niet doorgerekend" komt uit cpmResult == null, NIET uit scheduleStale (simulated restore)
//
// NOOT (2026-07-27): `restoreDocuments` markeert een hersteld document sinds `5e4b85a` bewust ALS
// verouderd ("meld herstelde planning als verouderd"). Daarmee verviel de oorspronkelijke opzet van
// deze case — die leunde op de combinatie stale=false + cpmResult=null om te bewijzen dat de vlag
// niet uit `scheduleStale` komt. Die combinatie is nu niet meer via de herstelweg te maken, en met
// stale=true én cpmResult=null zou de vlag uit béide bronnen kunnen volgen: de case zou meelopen met
// een fout die hij hoort te vangen. De discriminerende richting is daarom omgedraaid en gebeurt
// hieronder expliciet: een document dat WÉL verouderd is maar WÉL een cpmResult heeft, mag géén
// "niet doorgerekend" melden. Alleen `cpmResult == null` mag de vlag zetten.
// =================================================================================================
test('list_documents: hersteld document zonder cpmResult meldt "niet doorgerekend" — de vlag volgt cpmResult, niet scheduleStale', async () => {
  resetToSingleEmptyDocument();
  const gen = generateBenchmarkProject(8);
  const base = {
    project: gen.project, calendar: gen.calendar, tasks: gen.tasks, sequences: gen.sequences,
    resources: gen.resources, assignments: gen.assignments, filePath: null, isDirty: false,
  };
  S().restoreDocuments(
    [
      { id: 'doc-hersteld-a', ...base, project: { ...gen.project, name: 'Hersteld A' } },
      { id: 'doc-hersteld-b', ...base, project: { ...gen.project, name: 'Hersteld B' } },
    ],
    'doc-hersteld-a',
  );

  const data = await callOk('planner_list_documents');
  const active = data.documents.find((d: any) => d.id === 'doc-hersteld-a');
  const restored = data.documents.find((d: any) => d.id === 'doc-hersteld-b');
  assertEq(active.notCalculated, undefined, 'het actieve herstelde document is door restoreDocuments doorgerekend');
  assertEq(restored.notCalculated, true, 'het niet-actieve herstelde document meldt "niet doorgerekend"');
  const payload = S().documents.find((d) => d.id === 'doc-hersteld-b')!.payload!;
  assertEq(payload.cpmResult, null, 'voorwaarde van de case: het herstelde document heeft géén cpmResult');

  // De discriminerende helft: verouderd MÉT een cpmResult mag de vlag NIET zetten. Zou de tool op
  // `scheduleStale` leunen, dan valt precies deze assertie om.
  useAppStore.setState((s) => {
    const doc = s.documents.find((d) => d.id === 'doc-hersteld-b')!;
    doc.payload!.scheduleStale = true;
    doc.payload!.cpmResult = { ...(S().cpmResult as CPMResult) };
  });
  const naSet = await callOk('planner_list_documents');
  const verouderdMetResultaat = naSet.documents.find((d: any) => d.id === 'doc-hersteld-b');
  assertEq(
    verouderdMetResultaat.notCalculated, undefined,
    'verouderd MÉT cpmResult is wél doorgerekend — de vlag mag niet uit scheduleStale komen',
  );
});

// =================================================================================================
// 4. Leeg projectEnd door cpmResult.error wordt APART gemeld
// =================================================================================================
test('list_documents: cpmResult.error wordt apart gemeld i.p.v. een leeg projecteinde', async () => {
  resetToSingleEmptyDocument();
  loadSmallProject('Kring');
  const broken: CPMResult = { ...(S().cpmResult as CPMResult), projectEnd: '', error: 'Circular dependency detected: A → B → A' };
  useAppStore.setState({ cpmResult: broken });

  const data = await callOk('planner_list_documents');
  const row = data.documents.find((d: any) => d.id === S().activeDocumentId);
  assertEq(row.projectEnd, undefined, 'geen projecteinde te melden');
  assertEq(row.notCalculated, undefined, 'er IS gerekend — het is geen niet-doorgerekend-geval');
  assert(String(row.calculationError).includes('Circular'), 'de rekenfout wordt apart gemeld');
});

// =================================================================================================
// 5. new_document — leeg document, actief, drift-anker verzet
// =================================================================================================
test('new_document: leeg + actief nieuw document en het drift-anker verzet mee', async () => {
  resetToSingleEmptyDocument();
  loadSmallProject('Bron');
  const before = S().activeDocumentId;
  const ctx = makeCtx({ expectedDocId: before });

  const data = await callOk('planner_new_document', {}, ctx);
  assert(data.documentId !== before, 'er is een NIEUW document-id');
  assertEq(S().activeDocumentId, data.documentId, 'het nieuwe document is actief');
  assertEq(S().tasks.length, 0, 'het nieuwe document is leeg (géén projectwizard)');
  assertEq(ctx.expectedDocId, data.documentId, 'het drift-anker is verzet naar het nieuwe document');
  assertEq(S().ui.showNewProjectDialog, false, 'new_document opent GEEN projectwizard (die zou alle vervolgtools blokkeren)');
});

// =================================================================================================
// 6. duplicate_document — markDuplicateBorn + anker + kopie-eigenschappen
// =================================================================================================
test('duplicate_document: kopie actief, markDuplicateBorn aangeroepen, anker verzet, filePath genuld', async () => {
  resetToSingleEmptyDocument();
  const taskCount = loadSmallProject('Basis');
  useAppStore.setState({ filePath: '/home/tester/basis.ifc' });
  const sourceId = S().activeDocumentId;

  const born: string[] = [];
  const origMark = documentToolDeps.markDuplicateBorn;
  documentToolDeps.markDuplicateBorn = (id) => { born.push(id); };
  try {
    const ctx = makeCtx({ expectedDocId: sourceId });
    const data = await callOk('planner_duplicate_document', {}, ctx);
    assert(data.documentId !== sourceId, 'de kopie heeft een eigen document-id');
    assertEq(S().activeDocumentId, data.documentId, 'de kopie is actief');
    assertEq(ctx.expectedDocId, data.documentId, 'het drift-anker is meeverzet naar de kopie');
    assertEq(born, [data.documentId], 'markDuplicateBorn is aangeroepen met het NIEUWE doc-id (T16-contract)');
    assertEq(S().filePath, null, 'de kopie heeft geen bronbestand (anders overschrijft Ctrl+S de bron)');
    assertEq(S().tasks.length, taskCount, 'de kopie draagt dezelfde taken');
    assertEq(S().project.name, 'Basis (variant 2)', 'variant-naamnummering');
    assertEq(data.title, 'Basis (variant 2)', 'de respons meldt de nieuwe titel');
  } finally {
    documentToolDeps.markDuplicateBorn = origMark;
  }
});

test('duplicate_document: eigen naam via {name} en drift-fail wanneer de user van tabblad wisselde', async () => {
  resetToSingleEmptyDocument();
  loadSmallProject('Basis');
  const sourceId = S().activeDocumentId;

  // Drift: het anker wijst naar een ander document dan het actieve ⇒ dupliceren zou de VERKEERDE
  // planning kopiëren, dus fail-closed.
  const drifted = await callErr('planner_duplicate_document', {}, makeCtx({ expectedDocId: 'doc-iets-anders' }));
  assertEq(drifted.code, 'DOC_DRIFT', 'duplicate_document faalt gesloten op document-drift');
  assertEq(S().activeDocumentId, sourceId, 'en er is niets gedupliceerd');

  const data = await callOk('planner_duplicate_document', { name: 'Variant zonder vorstverlet' }, makeCtx({ expectedDocId: sourceId }));
  assertEq(S().project.name, 'Variant zonder vorstverlet', 'een meegegeven naam wint van de variant-nummering');
  assertEq(data.title, 'Variant zonder vorstverlet', 'respons-titel volgt de meegegeven naam');
});

// =================================================================================================
// 7. switch_document — wisselen, anker, NOT_FOUND
// =================================================================================================
test('switch_document: wisselt van document en verzet het anker; onbekend id ⇒ NOT_FOUND', async () => {
  resetToSingleEmptyDocument();
  loadSmallProject('Eerste');
  const firstId = S().activeDocumentId;
  const secondId = S().newDocument();

  const ctx = makeCtx({ expectedDocId: secondId });
  const data = await callOk('planner_switch_document', { documentId: firstId }, ctx);
  assertEq(S().activeDocumentId, firstId, 'het gevraagde document is actief geworden');
  assertEq(data.documentId, firstId, 'de respons meldt het nieuwe actieve document');
  assertEq(ctx.expectedDocId, firstId, 'het drift-anker is verzet');
  assertEq(S().project.name, 'Eerste', 'de projectdata van het doeldocument is ingeladen');

  const err = await callErr('planner_switch_document', { documentId: 'doc-bestaat-niet' });
  assertEq(err.code, 'NOT_FOUND', 'een onbekend document-id geeft NOT_FOUND');
  assertEq(S().activeDocumentId, firstId, 'en er is niet gewisseld');
});

test('switch_document lost drift OP: het mag draaien terwijl het anker naar een ander document wijst', async () => {
  resetToSingleEmptyDocument();
  loadSmallProject('Eerste');
  const firstId = S().activeDocumentId;
  const secondId = S().newDocument();

  // De user wisselde zelf: anker staat nog op het eerste document, actief is het tweede.
  const ctx = makeCtx({ expectedDocId: firstId });
  await callOk('planner_switch_document', { documentId: secondId }, ctx);
  assertEq(ctx.expectedDocId, secondId, 'switch_document is de drift-bevestiging en zet het anker recht');
});

// =================================================================================================
// 8. export_ifc
// =================================================================================================
test('export_ifc: schrijft een IFC-bestand binnen de $HOME-scope', async () => {
  installFakeFs();
  resetToSingleEmptyDocument();
  loadSmallProject('Export');
  const path = `${HOME}/export/plan.ifc`;

  const data = await callOk('planner_export_ifc', { path });
  const written = files.get(path);
  assert(!!written, 'het bestand is geschreven op het gevraagde pad');
  assert(written!.startsWith('ISO-10303-21'), 'de inhoud is een IFC-STEP-bestand');
  assert(written!.includes('IFCPROJECT'), 'de IFC-inhoud bevat het project');
  assertEq(data.path, path, 'de respons meldt het geschreven pad');
  assert(data.characters > 100, 'de respons meldt de omvang in tekens');
  assertEq(data.overwritten, false, 'er stond nog niets op dit pad ⇒ overwritten:false');
});

test('export_ifc: `overwritten` meldt de WERKELIJKHEID, niet de meegestuurde vlag', async () => {
  installFakeFs();
  resetToSingleEmptyDocument();
  loadSmallProject('Export');

  // overwrite:true op een LEEG pad ⇒ er is niets overschreven; de vlag mag niet als "feit" terugkomen.
  const fresh = await callOk('planner_export_ifc', { path: `${HOME}/nieuw.ifc`, overwrite: true });
  assertEq(fresh.overwritten, false, 'overwrite:true op een nieuw pad ⇒ overwritten:false');

  // Zelfde call op datzelfde (nu bestaande) pad ⇒ er is wél vervangen.
  const again = await callOk('planner_export_ifc', { path: `${HOME}/nieuw.ifc`, overwrite: true });
  assertEq(again.overwritten, true, 'een bestaand bestand vervangen ⇒ overwritten:true');
});

test('export_ifc: pad buiten de $HOME-fs-scope ⇒ code SCOPE (ook via ..-traversal)', async () => {
  installFakeFs();
  resetToSingleEmptyDocument();
  loadSmallProject('Export');

  const outside = await callErr('planner_export_ifc', { path: '/etc/opgeslagen.ifc' });
  assertEq(outside.code, 'SCOPE', 'buiten $HOME ⇒ SCOPE');
  assert(outside.error.includes(HOME), 'de fout legt uit welke scope wél mag');

  const traversal = await callErr('planner_export_ifc', { path: `${HOME}/../../etc/opgeslagen.ifc` });
  assertEq(traversal.code, 'SCOPE', '..-traversal buiten de scope wordt genormaliseerd en geweigerd');
  assertEq(files.size, 0, 'er is niets geschreven');

  const relative = await callErr('planner_export_ifc', { path: 'plan.ifc' });
  assertEq(relative.code, 'SCOPE', 'een relatief pad is niet te scopen ⇒ geweigerd');
});

test('export_ifc: SIBLING-PREFIX-ontsnapping ⇒ SCOPE (de scope-grens loopt op mapniveau)', async () => {
  installFakeFs();
  resetToSingleEmptyDocument();
  loadSmallProject('Export');

  // `/home/tester-evil/…` deelt de TEKSTprefix `/home/tester` met de home-map maar ligt er buiten.
  // Een naïeve `startsWith(home)` zou dit doorlaten — dit is de enige plek waar de AI buiten de app
  // kan schrijven, dus de mapgrens moet vastgepind zijn.
  const sibling = await callErr('planner_export_ifc', { path: `${HOME}-evil/x.ifc` });
  assertEq(sibling.code, 'SCOPE', 'een buurmap met dezelfde tekstprefix valt BUITEN de scope');

  // Idem voor de `~`-expansie: alleen `~` en `~/…` zijn de home-map; `~evil` is een ándere gebruiker.
  const tildeUser = await callErr('planner_export_ifc', { path: '~evil/x.ifc' });
  assertEq(tildeUser.code, 'SCOPE', "'~evil' is niet de home-map van deze gebruiker ⇒ geweigerd");

  // Ter contrast: de home-map zelf mét slash is wél binnen de scope.
  await callOk('planner_export_ifc', { path: '~/binnen-scope.ifc' });
  assert(files.has(`${HOME}/binnen-scope.ifc`), '~/ expandeert naar de home-map en mag wél');
  assertEq(files.size, 1, 'de twee ontsnappingspogingen hebben niets geschreven');
});

test('export_ifc: bestaand bestand zonder overwrite ⇒ nette fout; mét overwrite:true ⇒ ok', async () => {
  installFakeFs();
  resetToSingleEmptyDocument();
  loadSmallProject('Export');
  const path = `${HOME}/plan.ifc`;
  files.set(path, 'BESTAAND BESTAND');

  const err = await callErr('planner_export_ifc', { path });
  assertEq(err.code, 'VALIDATION', 'overschrijven zonder toestemming is een nette weigering');
  assert(err.error.includes('overwrite'), 'de fout noemt de vereiste overwrite-vlag');
  assertEq(files.get(path), 'BESTAAND BESTAND', 'het bestaande bestand is ONgemoeid');

  await callOk('planner_export_ifc', { path, overwrite: true });
  assert(files.get(path)!.startsWith('ISO-10303-21'), 'met overwrite:true wordt het bestand vervangen');
});

// =================================================================================================
// 9. import_schedule
// =================================================================================================
test('import_schedule: hergebruikt een leeg-en-ongewijzigd actief tabblad (geen extra document)', async () => {
  installFakeFs();
  resetToSingleEmptyDocument();
  loadSmallProject('Bron voor import');
  const ifc = writeIFC(buildWriteIFCInput(S()));
  const path = `${HOME}/onderaannemer.ifc`;
  files.set(path, ifc);

  const pristineId = S().newDocument(); // leeg + ongewijzigd ⇒ pristine
  const docsBefore = S().documents.length;
  const ctx = makeCtx({ expectedDocId: pristineId });

  const data = await callOk('planner_import_schedule', { path }, ctx);
  assertEq(S().documents.length, docsBefore, 'het pristine tabblad is HERGEBRUIKT (geen extra document)');
  assertEq(S().activeDocumentId, pristineId, 'hetzelfde document blijft actief');
  assertEq(data.documentId, pristineId, 'de respons meldt het hergebruikte document');
  assertEq(data.reusedActiveTab, true, 'de respons meldt expliciet dat het tabblad hergebruikt is');
  assert(S().tasks.length > 0, 'de planning is ingeladen');
  assertEq(data.tasks, S().tasks.length, 'de respons meldt het aantal geïmporteerde taken');
  assertEq(ctx.expectedDocId, pristineId, 'het drift-anker wijst naar het resulterende document');
});

test('import_schedule: niet-pristine tabblad ⇒ NIEUW document + drift-anker verzet mee', async () => {
  installFakeFs();
  resetToSingleEmptyDocument();
  loadSmallProject('Master');
  const path = `${HOME}/onderaannemer.ifc`;
  files.set(path, writeIFC(buildWriteIFCInput(S())));

  const masterId = S().activeDocumentId;
  const docsBefore = S().documents.length;
  const ctx = makeCtx({ expectedDocId: masterId });

  const data = await callOk('planner_import_schedule', { path }, ctx);
  assertEq(S().documents.length, docsBefore + 1, 'een gevuld tabblad wordt niet overschreven ⇒ nieuw document');
  assert(data.documentId !== masterId, 'het importdocument is een ander document');
  assertEq(S().activeDocumentId, data.documentId, 'het importdocument is actief');
  assertEq(data.reusedActiveTab, false, 'de respons meldt dat er een nieuw tabblad is');
  assertEq(ctx.expectedDocId, data.documentId, 'het drift-anker verzet mee (anders zet de import zichzelf klem)');
});

test('import_schedule: IFC neemt het bronpad over als opslagdoel, CSV NIET (Ctrl+S mag de bron niet overschrijven)', async () => {
  installFakeFs();
  resetToSingleEmptyDocument();
  loadSmallProject('Bron');
  const s = S();
  const csvPath = `${HOME}/onderaannemer.csv`;
  files.set(csvPath, writeCSV(s.project, s.calendar, s.tasks, s.sequences, s.resources, s.assignments));
  const ifcPath = `${HOME}/onderaannemer.ifc`;
  files.set(ifcPath, writeIFC(buildWriteIFCInput(s)));

  const csv = await callOk('planner_import_schedule', { path: csvPath });
  assertEq(csv.format, 'CSV', 'de extensie bepaalt het formaat');
  // Opslaan schrijft ALTIJD IFC: met csvPath als opslagdoel zou een Ctrl+S het CSV-bronbestand van
  // de gebruiker met IFC-inhoud overschrijven.
  assertEq(S().filePath, null, 'na een CSV-import heeft het document GEEN opslagdoel');
  assertEq(csv.filePath, null, 'en de respons meldt dat ook');
  assert(String(csv.notice).includes('opslagdoel'), 'de respons benoemt het ontbrekende opslagdoel');
  assert(String(csv.notice).includes('kalender'), 'en het CSV-kalenderverlies');

  const ifc = await callOk('planner_import_schedule', { path: ifcPath });
  assertEq(ifc.format, 'IFC', 'IFC wordt als native formaat herkend');
  assertEq(S().filePath, ifcPath, 'een IFC-import neemt het bronpad wél over (opslaan = terugschrijven)');
  assertEq(ifc.filePath, ifcPath, 'en de respons meldt dat opslagdoel');
});

test('import_schedule: onbekend pad ⇒ NOT_FOUND, buiten de scope ⇒ SCOPE', async () => {
  installFakeFs();
  resetToSingleEmptyDocument();
  const missing = await callErr('planner_import_schedule', { path: `${HOME}/bestaat-niet.ifc` });
  assertEq(missing.code, 'NOT_FOUND', 'een onleesbaar/ontbrekend bestand geeft NOT_FOUND');
  const outside = await callErr('planner_import_schedule', { path: '/etc/passwd' });
  assertEq(outside.code, 'SCOPE', 'buiten $HOME ⇒ SCOPE');
});

// =================================================================================================
// 10. Dialoog-guard — en de fout BENOEMT welke dialoog blokkeert (spec §Dialoog-guard)
// =================================================================================================
test('dialoog-guard: een open modaal blokkeert de document-/bestands-tools en de fout NOEMT de dialoog', async () => {
  installFakeFs();
  resetToSingleEmptyDocument();
  loadSmallProject('Dialoog');
  const activeId = S().activeDocumentId;
  const docsBefore = S().documents.length;

  useAppStore.setState({ ui: { ...S().ui, showTaskDialog: true } });
  try {
    const doc = await callErr('planner_new_document');
    assertEq(doc.code, 'DIALOG_OPEN', 'new_document weigert terwijl er een dialoog openstaat');
    assert(doc.error.includes('showTaskDialog'), 'de fout benoemt WELKE dialoog blokkeert (spec-eis)');

    const file = await callErr('planner_export_ifc', { path: `${HOME}/x.ifc` });
    assertEq(file.code, 'DIALOG_OPEN', 'export_ifc weigert eveneens');
    assert(file.error.includes('showTaskDialog'), 'ook hier wordt de dialoog benoemd');

    const read = await callErr('planner_list_documents');
    assertEq(read.code, 'DIALOG_OPEN', 'zelfs de leestool wacht op een open modaal (halve staat)');

    assertEq(S().documents.length, docsBefore, 'er is geen document bijgekomen');
    assertEq(S().activeDocumentId, activeId, 'en er is niet gewisseld');
    assertEq(files.size, 0, 'en er is niets geschreven');
  } finally {
    useAppStore.setState({ ui: { ...S().ui, showTaskDialog: false } });
  }

  // Dialoog dicht ⇒ dezelfde call slaagt weer (bewijst dat de vlag de oorzaak was).
  await callOk('planner_list_documents');
});

// =================================================================================================
// 11. Veiligheidsvlaggen (pauze / alleen-lezen)
// =================================================================================================
test('veiligheidsvlaggen: pauze en alleen-lezen weigeren de document-/bestands-tools, lezen mag door', async () => {
  installFakeFs();
  resetToSingleEmptyDocument();
  loadSmallProject('Vlaggen');
  const activeId = S().activeDocumentId;

  const paused = await callErr('planner_new_document', {}, makeCtx({ paused: true }));
  assertEq(paused.code, 'PAUSED', 'new_document weigert tijdens pauze');
  const ro = await callErr('planner_export_ifc', { path: `${HOME}/x.ifc` }, makeCtx({ readOnly: true }));
  assertEq(ro.code, 'READ_ONLY', 'export_ifc weigert in alleen-lezen-modus');
  const roImport = await callErr('planner_import_schedule', { path: `${HOME}/x.ifc` }, makeCtx({ readOnly: true }));
  assertEq(roImport.code, 'READ_ONLY', 'import_schedule weigert in alleen-lezen-modus');
  assertEq(files.size, 0, 'er is niets naar de schijf geschreven');
  assertEq(S().activeDocumentId, activeId, 'en er is geen document bijgekomen/gewisseld');

  // Leestool mag WEL door (spec regel 116).
  const data = await callOk('planner_list_documents', {}, makeCtx({ paused: true, readOnly: true }));
  assert(data.documents.length >= 1, 'list_documents blijft werken tijdens pauze/alleen-lezen');
});

await run();
