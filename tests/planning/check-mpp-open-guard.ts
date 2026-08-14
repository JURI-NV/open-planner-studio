// Opslagdoel-guard voor niet-IFC bronformaten (fase 3.8 e1, T8-stap 5a; verbreed T8-spec-review F4).
//
// De bug die dit vastzet: `fileSlice.openFile`/`openRecentFile` zetten historisch ALTIJD een
// opslagdoel (filePath/fileHandle) op het geopende bestand. Opslaan schrijft ALTIJD IFC-tekst terug
// — dat is alleen correct als de bron zelf ook IFC was. Voor elk ANDER bronformaat (CSV, MS-Project-
// /P6-XML, en sinds T8 het binaire .mpp) zou de eerstvolgende Ctrl+S het bronbestand stil
// overschrijven met IFC-inhoud onder dezelfde naam. De guard is dus NIET "binair vs. tekst" (dat was
// de T8-oorspronkelijke, te smalle vorm) maar "IFC vs. niet-IFC" — exact de regel die de MCP-kant al
// had (`fileTools.ts`: `format === 'IFC' && !isBinary`).
//
// Deze check drijft de ECHTE productieroute aan (`useAppStore.getState().openFile(...)`) — niet een
// herimplementatie van de guard-formule — via de `<input type=file>`-terugval van
// `fileAccess/webBackend.ts` (`openViaInput`): `document.createElement`/`window` worden minimaal
// gestubt (zelfde stijl als `check-mspdi-baseline-export.ts`), zodat `isTauri()` false blijft en
// `hasFSA()` (geen `showOpenFilePicker` op de gestubte `window`) de input-terugval kiest.
//
// Delen:
//  A.  ALTIJD (geen corpus nodig): IFC door dezelfde open-route krijgt WÉL een opslagdoel (contrast).
//  A2. ALTIJD: CSV door dezelfde open-route krijgt GEEN opslagdoel.
//  A3. ALTIJD: MS-Project-XML (MSPDI) door dezelfde open-route krijgt GEEN opslagdoel.
//  B.  CORPUS-GEDREVEN (skip-OK zonder corpus, zelfde conventie als check-mpp-import.ts): een echt
//      `.mpp`-bestand door de open-route — bewijst dat na een geslaagde MPP-open `filePath`/
//      `fileHandle` leeg blijven, terwijl taken/kalender/CPM wél degelijk geladen/herrekend zijn.
//
// Draait via run.sh. Exit 0 = alles groen.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { readMPP } from '@/services/mpp/mppReader';
import { installDOMParser } from './xmldom-shim';

// ── Headless browser-stubs (vóór de eerste store-import) ─────────────────────────────────────
const g = globalThis as any;
g.window = g.window ?? {}; // GEEN showOpenFilePicker ⇒ hasFSA() false ⇒ input-terugval; isTauri() blijft ook false.

type FakeInput = {
  type: string;
  accept: string;
  files?: unknown[];
  onchange: (() => void | Promise<void>) | null;
  addEventListener: (event: string, cb: () => void) => void;
  click: () => void;
};

function makeFakeFile(name: string, opts: { text?: string; bytes?: Uint8Array }): unknown {
  return {
    name,
    text: async () => opts.text ?? '',
    arrayBuffer: async () => {
      const bytes = opts.bytes ?? new Uint8Array(0);
      return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    },
  };
}

/** De volgende `document.createElement('input')` levert dit bestand op bij `.click()`. */
let nextFile: unknown = null;

g.document = {
  createElement: (tag: string) => {
    if (tag !== 'input') return {};
    const input: FakeInput = {
      type: '',
      accept: '',
      files: undefined,
      onchange: null,
      addEventListener: () => { /* 'cancel' wordt in deze check nooit gebruikt */ },
      click: () => {
        input.files = nextFile ? [nextFile] : [];
        void input.onchange?.();
      },
    };
    return input;
  },
};

const { useAppStore } = await import('@/state/appStore');
const { readFormatForFile } = await import('@/services/formatRegistry');
const { writeIFC } = await import('@/services/ifc/ifcWriter');
const { buildWriteIFCInput } = await import('@/state/ifcSaveInput');
const { writeCSV } = await import('@/services/csv/csvWriter');
const { writeMSPDI } = await import('@/services/msproject/mspdiWriter');

const S = () => useAppStore.getState();

const diffs: string[] = [];
let checks = 0;
const truthy = (label: string, cond: boolean) => {
  checks++;
  if (!cond) diffs.push(`${label}: verwacht waar, kreeg onwaar`);
};
const eq = (label: string, got: unknown, want: unknown) => {
  checks++;
  if (got !== want) diffs.push(`${label}: verwacht ${JSON.stringify(want)}, kreeg ${JSON.stringify(got)}`);
};

// ── Classificatie-slot: de guard leunt op `readFormatForFile(...).id` (F4: niet meer `.kind`) ─
eq('00 readFormatForFile: .mpp heeft id "mpp" (binair)', readFormatForFile('plan.mpp').id, 'mpp');
eq('00b readFormatForFile: .ifc heeft id "ifc"', readFormatForFile('plan.ifc').id, 'ifc');
eq('00c readFormatForFile: .csv heeft id "csv" (niet "ifc")', readFormatForFile('plan.csv').id, 'csv');
eq('00d readFormatForFile: .xml heeft id "xml" (niet "ifc")', readFormatForFile('plan.xml').id, 'xml');

// ── A. IFC door de open-route: opslagdoel WORDT gezet (contrast — de enige bron die dat mag) ──
{
  S().newProject();
  S().setProject({ name: 'Guard-IFC-bron', startDate: '2026-08-03' });
  S().addTask({ name: 'Los werkje' });
  const ifcText = writeIFC(buildWriteIFCInput(S()));

  S().newProject(); // vers, ongewijzigd actief tabblad — wordt hergebruikt (isActivePristine)
  nextFile = makeFakeFile('bron.ifc', { text: ifcText });
  await S().openFile();

  eq('01 IFC-open: document telt de geïmporteerde taak', S().tasks.length, 1);
  eq('02 IFC-open: filePath WORDT gezet (IFC-bron ⇒ enige formaat dat de guard doorlaat)', S().filePath, 'bron.ifc');
}

// ── A2. CSV door de open-route (T8-spec-review F4): GEEN opslagdoel — voorheen (vóór F4) kon
// Ctrl+S na een CSV-open het CSV-bronbestand met IFC-tekst overschrijven, want de oorspronkelijke
// guard keek alleen naar `kind === 'binary'` en CSV is een tekstformaat. ─────────────────────────
{
  S().newProject();
  S().setProject({ name: 'Guard-CSV-bron', startDate: '2026-08-03' });
  S().addTask({ name: 'CSV-werkje' });
  const state = S();
  const csvText = writeCSV(state.project, state.calendar, state.tasks, state.sequences, state.resources, state.assignments);

  S().newProject();
  nextFile = makeFakeFile('bron.csv', { text: csvText });
  await S().openFile();

  eq('03 CSV-open: document telt de geïmporteerde taak', S().tasks.length, 1);
  eq('04 CSV-open: GEEN filePath (F4: niet-IFC-bron krijgt geen opslagdoel)', S().filePath, null);
  eq('05 CSV-open: GEEN fileHandle', S().fileHandle, null);
}

// ── A3. MS-Project-XML (MSPDI) door de open-route (T8-spec-review F4): idem, GEEN opslagdoel. ──
installDOMParser(); // readMSPDI (via parseProjectXml) gebruikt de browser-DOMParser, ontbreekt in Node.
{
  S().newProject();
  S().setProject({ name: 'Guard-XML-bron', startDate: '2026-08-03' });
  S().addTask({ name: 'XML-werkje' });
  const state = S();
  const xmlText = writeMSPDI(
    state.project, state.calendar, state.tasks, state.sequences, state.resources, state.assignments,
    state.calendars, state.baselines, state.activeBaselineId,
  );

  S().newProject();
  nextFile = makeFakeFile('bron.xml', { text: xmlText });
  await S().openFile();

  eq('06 XML-open: document telt de geïmporteerde taak', S().tasks.length, 1);
  eq('07 XML-open: GEEN filePath (F4: niet-IFC-bron krijgt geen opslagdoel)', S().filePath, null);
  eq('08 XML-open: GEEN fileHandle', S().fileHandle, null);
}

// ── B. Corpus-gedreven: .mpp door de open-route ───────────────────────────────────────────────
const CORPUS =
  process.env.OPS_MPP_CORPUS ??
  '/home/nozzit/open-aec/voor claude/test bestanden voor file implementation';
const corpusPresent = existsSync(CORPUS);
const corpusFiles = corpusPresent ? readdirSync(CORPUS).filter((f) => f.toLowerCase().endsWith('.mpp')) : [];

// Kies het EERSTE corpusbestand waarvan geen enkele relatie een niet-leaf (WBS-samenvattings-)taak
// raakt. `runCPM` filtert de solver-invoer op leaf-taken (`scheduleSlice.ts`: `s.tasks.filter(t =>
// t.childIds.length === 0)`), maar geeft `s.sequences` ONGEFILTERD mee — een relatie die een
// samenvattingstaak als voor-/opvolger heeft (geverifieerd op dit corpus: 'Bijlage 13
// Productieplanning.mpp' heeft dat, de andere twee niet) laat `CPMSolver.topologicalSort()` een
// niet-bestaand taak-id in de queue duwen, en `forwardPass` crasht dan op `this.tasks.get(taskId)!`.
// Dat is een bestaand, MPP-onafhankelijk scheduler-gat (elk formaat met zo'n relatie zou het raken)
// — buiten de scope van T8 (registratie/bedrading). Deze check kiest daarom bewust een corpusbestand
// zonder die relatievorm, zodat hij zuiver de opslagdoel-guard bewijst i.p.v. op een ongerelateerde
// bug te stranden; zie het rapport van T8 voor de doorverwijzing (achtergrondtaak "Fix CPMSolver
// crash on relations touching WBS-summary tasks").
// TODO(T11): zodra die CPM-fix geland is, mag dit filter (en `findSafeCorpusFile` zelf) weg — dan
// kan Part B gewoon het EERSTE corpusbestand nemen, net als check-mpp-import.ts/-relations.ts doen.
function findSafeCorpusFile(): string | null {
  for (const name of corpusFiles) {
    try {
      const bytes = new Uint8Array(readFileSync(join(CORPUS, name)));
      const parsed = readMPP(bytes);
      const leafIds = new Set(parsed.tasks.filter((t) => t.childIds.length === 0).map((t) => t.id));
      const touchesNonLeaf = parsed.sequences.some(
        (s) => !leafIds.has(s.predecessorId) || !leafIds.has(s.successorId),
      );
      if (!touchesNonLeaf && parsed.tasks.length > 0) return name;
    } catch {
      continue;
    }
  }
  return null;
}
const safeCorpusFile = corpusPresent ? findSafeCorpusFile() : null;

if (!corpusPresent || corpusFiles.length === 0) {
  console.log('OK  mpp-open-guard: corpus niet aanwezig (OPS_MPP_CORPUS) — corpusdeel overgeslagen');
} else if (!safeCorpusFile) {
  // T8-spec-review (F3): dit is GEEN stille-skip-situatie — het corpus IS aanwezig. Geen enkel
  // bestand zonder samenvattingstaak-relatie vinden is een echte regressie (bv. een gewijzigd
  // corpus, of de CPM-fix uit de TODO hierboven loste het probleem niet daadwerkelijk op) en hoort
  // dus XX te zijn, niet een zwijgend-groene OK.
  checks++;
  diffs.push('corpusdeel: corpus aanwezig maar GEEN enkel bestand zonder samenvattingstaak-relatie gevonden (verwacht minstens één "veilig" bestand — zie findSafeCorpusFile)');
} else {
  const mppPath = join(CORPUS, safeCorpusFile);
  const bytes = new Uint8Array(readFileSync(mppPath));

  S().newProject(); // vers, ongewijzigd actief tabblad
  nextFile = makeFakeFile(safeCorpusFile, { bytes });
  await S().openFile();

  truthy('09 MPP-open: taken geladen', S().tasks.length > 0);
  truthy('10 MPP-open: kalender gezet (id aanwezig)', !!S().calendar?.id);
  truthy('11 MPP-open: planning herberekend (cpmResult aanwezig)', S().cpmResult !== null);
  eq('12 MPP-open: GEEN filePath (opslagdoel-guard, T8-stap 5a/F4)', S().filePath, null);
  eq('13 MPP-open: GEEN fileHandle', S().fileHandle, null);
  eq('14 MPP-open: document blijft "ongewijzigd naamloos" — isDirty volgt de normale open-semantiek', S().isDirty, false);
}

// ── Uitslag ──────────────────────────────────────────────────────────────────────────────────
if (diffs.length === 0) {
  console.log(`OK  mpp-open-guard-check: alle checks groen (${checks})`);
  process.exit(0);
} else {
  console.log(`XX  mpp-open-guard-check: ${diffs.length} afwijking(en) van ${checks}`);
  for (const d of diffs) console.log(`   - ${d}`);
  process.exit(1);
}
