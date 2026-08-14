// Opslagdoel-guard voor binaire bronformaten (fase 3.8 e1, T8-stap 5a).
//
// De bug die dit vastzet: `fileSlice.openFile`/`openRecentFile` zetten historisch ALTIJD een
// opslagdoel (filePath/fileHandle) op het geopende bestand. Voor tekstformaten (IFC/CSV/XML) is dat
// correct — "opslaan" schrijft hetzelfde formaat terug. Voor een BINAIR bronformaat (.mpp, T8) is
// het dat niet: opslaan schrijft altijd IFC-TEKST, dus zonder guard zou Ctrl+S na het openen van een
// .mpp-bestand het binaire bronbestand stil overschrijven met IFC-inhoud onder dezelfde naam.
//
// Deze check drijft de ECHTE productieroute aan (`useAppStore.getState().openFile(...)`) — niet een
// herimplementatie van de guard-formule — via de `<input type=file>`-terugval van
// `fileAccess/webBackend.ts` (`openViaInput`): `document.createElement`/`window` worden minimaal
// gestubt (zelfde stijl als `check-mspdi-baseline-export.ts`), zodat `isTauri()` false blijft en
// `hasFSA()` (geen `showOpenFilePicker` op de gestubte `window`) de input-terugval kiest.
//
// Twee delen:
//  A. ALTIJD (geen corpus nodig): een tekstformaat (IFC) door dezelfde open-route — bewijst dat de
//     guard SPECIFIEK voor binaire formaten is, niet een blanket-null op elke open-actie.
//  B. CORPUS-GEDREVEN (skip-OK zonder corpus, zelfde conventie als check-mpp-import.ts): een echt
//     `.mpp`-bestand door de open-route — bewijst dat na een geslaagde MPP-open `filePath`/
//     `fileHandle` leeg blijven, terwijl taken/kalender/CPM wél degelijk geladen/herrekend zijn.
//
// Draait via run.sh. Exit 0 = alles groen.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { readMPP } from '@/services/mpp/mppReader';

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

// ── Classificatie-slot: de guard leunt op `readFormatForFile(...).kind` ──────────────────────
eq('00 readFormatForFile: .mpp is binair', readFormatForFile('plan.mpp').kind, 'binary');
eq('00b readFormatForFile: .ifc is tekst', readFormatForFile('plan.ifc').kind, 'text');

// ── A. Tekstformaat (IFC) door de open-route: opslagdoel WORDT gezet (contrast) ──────────────
{
  S().newProject();
  S().setProject({ name: 'Guard-IFC-bron', startDate: '2026-08-03' });
  S().addTask({ name: 'Los werkje' });
  const ifcText = writeIFC(buildWriteIFCInput(S()));

  S().newProject(); // vers, ongewijzigd actief tabblad — wordt hergebruikt (isActivePristine)
  nextFile = makeFakeFile('bron.ifc', { text: ifcText });
  await S().openFile();

  eq('01 IFC-open: document telt de geïmporteerde taak', S().tasks.length, 1);
  eq('02 IFC-open: filePath WORDT gezet (geen binaire bron ⇒ guard slaat niet aan)', S().filePath, 'bron.ifc');
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
// bug te stranden; zie het rapport van T8 voor de doorverwijzing.
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
  console.log('OK  mpp-open-guard: geen corpusbestand zonder samenvattingstaak-relatie gevonden — corpusdeel overgeslagen');
} else {
  const mppPath = join(CORPUS, safeCorpusFile);
  const bytes = new Uint8Array(readFileSync(mppPath));

  S().newProject(); // vers, ongewijzigd actief tabblad
  nextFile = makeFakeFile(safeCorpusFile, { bytes });
  await S().openFile();

  truthy('03 MPP-open: taken geladen', S().tasks.length > 0);
  truthy('04 MPP-open: kalender gezet (id aanwezig)', !!S().calendar?.id);
  truthy('05 MPP-open: planning herberekend (cpmResult aanwezig)', S().cpmResult !== null);
  eq('06 MPP-open: GEEN filePath (opslagdoel-guard, T8-stap 5a)', S().filePath, null);
  eq('07 MPP-open: GEEN fileHandle', S().fileHandle, null);
  eq('08 MPP-open: document blijft "ongewijzigd naamloos" — isDirty volgt de normale open-semantiek', S().isDirty, false);
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
