// MPP-datumgetrouwheid (fase 3.8, etappe "MSP-pariteit", plandocument T1) — de regressietest-
// helft van het gedeelde meetscript (§5). De meetkern zelf staat in `mppFidelity.ts`
// (`measureFidelity`, roept `readMPP` + `solveProject` — de ECHTE `runCPM`-keten — aan tegen de
// ONAFHANKELIJKE grondwaarheid uit `mppGroundTruth.ts`). Dit bestand is de CI-poort eromheen:
// corpus-/crawl-iteratie, per-bestand-per-veld-pinning tegen `mpp-fidelity-baseline.json`, en de
// drie rapportagemodi.
//
// TWEE LEVENS, ÉÉN ARTEFACT (plan §5): tijdens de etappe draaien implementers/reviewers dit exact
// zo (`OPS_MPP_FIDELITY_REPORT=detail`) om voor→na-cijfers te zien; als regressietest (default-
// modus, geregistreerd in run.sh) bewaakt het dat niemand een gerepareerd bestand stilzwijgend
// weer laat verslechteren. Geen tweede, gepind harnas dat kan afdrijven van de live worktree.
//
// BASELINEBELEID (plan §6): sleutel = SHA-256 van de bestandsBYTES (eerste 16 hex-tekens), NOOIT
// de bestandsnaam. Corpusinhoud komt nooit in de repo — de baseline draagt alleen tellingen. Voor
// bestanden onder `OPS_MPP_CRAWL` (publiek MPXJ-junit-materiaal + OzBuild-workshopbestanden) mag
// een leesbaar `label` (relatief pad) meelopen voor diagnose; voor `OPS_MPP_CORPUS`-bestanden
// (echte bedrijfsbestanden) blijft dat veld leeg. REVIEWBEVINDING L4: dat privacybeleid geldt niet
// alleen voor wat er in het GECOMMITTE baselinebestand komt, maar voor ALLE tekst die deze check
// naar stdout schrijft — ook een transiente faalregel in een CI-log kan gekopieerd/geplakt worden
// (en belandde eerder zelfs letterlijk in een commitbericht). Elke diagnoseregel over een
// CORPUS-bestand identificeert het daarom UITSLUITEND via zijn hash; alleen CRAWL-bestanden mogen
// met hun leesbare (relatieve) pad in de uitvoer verschijnen — zie `tagFor()` hieronder, dat is de
// ENIGE plek in dit bestand die een bestand naar tekst omzet.
//
// PINNING (plan §5, "geen somtotalen"): per bestand, met `===` — `tasks`, `startExact`,
// `startSameday`, `startDiff`, `finishExact`, `finishSameday`, `finishDiff`. Plus twee globale
// pins: (a) elk gepind bestand van een GESCANDE wortel ook echt teruggevonden, en (b) de
// VERZAMELING bestanden met ≥1 start-/finish-afwijking (bewust NIET sameday, zie
// `mppFidelity.ts`'s `FidelityRow.startSameday`-doc) binnen die wortel exact gelijk aan de
// gepinde verzameling voor die wortel — dat vangt een NIEUW afwijkend bestand ook wanneer een
// ander bestand tegelijk verbetert (een som zou dat verdoezelen). Een gescand bestand zonder pin
// faalt (herpinnen via `OPS_MPP_FIDELITY_REPORT=baseline`, met de hand plakken — de check schrijft
// nooit zelf een bestand).
//
// REVIEWBEVINDING H1 — DE GLOBALE PINS ZIJN PER WORTEL, NIET OVER HET HELE BASELINEBESTAND. Wie
// alleen OPS_MPP_CRAWL heeft (het bedrijfscorpus is per definitie afwezig buiten deze ene machine)
// zou anders een valse rode "aantal gepinde bestanden gezien: verwacht 216, kreeg 213" krijgen —
// de 3 corpusbestanden zíjn simpelweg niet gescand. Elke `BaselineEntry` draagt daarom een `root`
// ('corpus' | 'crawl'); de globale pins vergelijken uitsluitend binnen een wortel die dit keer
// DAADWERKELIJK gescand is (aanwezig ÉN ≥1 `.mpp`-bestand gevonden — een aanwezige maar lege map
// gedraagt zich hetzelfde als een afwezige map: één OK-regel, geen assert. Voorheen gaf zo'n lege
// map wél de OK-skipregel MAAR ook nog een rode globale pin, want de assert keek naar
// `corpusPresent` (bestaat de map) i.p.v. "is er iets gescand").
//
// `MPP_LEGACY`/`MPP_ENCRYPTED`-weigeringen tellen als overgeslagen (eigenaarsbesluit O7), nooit
// als fout; alleen een ONVERWACHTE throw (geen `mppCode`) is een echte faal.
//
// Draait via run.sh (RUN_HOLIDAYS-blok, ná check-mpp-summary-relations) en draait daarna mee in de
// tijdzone-matrix — vandaar (T1-ontwerpeis) dat de gehele corpusscan ruim < 1 s kost: de matrix
// herhaalt dit vijfmaal.
//
// REVIEWBEVINDING M1 — deze check is niet leeg zonder corpus. De ALTIJD-DRAAIENDE sectie hieronder
// (vóór de corpus-/crawl-iteratie) dekt de classify-tabel en de twee terugvaltakken van
// `measureFidelity` (leeg bestand ⇒ 'error', gefingeerd legacy-bestand ⇒ 'rejected') met eigen,
// minimale fixtures — naar het patroon van check-mpp-import.ts se synthetische MPP12-case.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { measureFidelity, solveMppBytes, classify, type FidelityRow } from './mppFidelity';
import { readMPP } from '@/services/mpp/mppReader';
import { useAppStore } from '@/state/appStore';
import { encodeCompObjFileFormat, encodePropsSingleByteEntry, buildTwoRootStreamsCfb } from './mppFixtures';

// `import.meta.url`-relatief i.p.v. `process.cwd()` — zelfde reviewbevinding/conventie als
// `check-adapters-hours.ts`/`check-mpp-chunk-boundary.ts`: dit bestand draait via
// `bash tests/planning/run.sh`, dat nooit naar de repo-root `cd`'t.
const HERE = fileURLToPath(new URL('.', import.meta.url));

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

const REPORT = process.env.OPS_MPP_FIDELITY_REPORT; // undefined | 'detail' | 'baseline'

// ═══════════════════════════════════════════════════════════════════════════════════════════
// M1 — corpusvrije unit-asserties: draaien ALTIJD, ook zonder OPS_MPP_CORPUS/OPS_MPP_CRAWL.
// ═══════════════════════════════════════════════════════════════════════════════════════════

// classify() — de vier uitkomsten, rechtstreeks tegen de geëxporteerde functie.
eq('M1 classify: exacte uurinstant', classify('2026-01-05T08:00', '2026-01-05T08:00'), 'exact');
eq('M1 classify: date-only vs middernacht-instant is exact', classify('2026-01-05', '2026-01-05T00:00'), 'exact');
eq('M1 classify: zelfde dag, andere klokstand → sameday', classify('2026-01-05T08:00', '2026-01-05T17:00'), 'sameday');
eq('M1 classify: andere dag → diff', classify('2026-01-06T08:00', '2026-01-05T08:00'), 'diff');
eq('M1 classify: geen grondwaarheid → missing', classify('2026-01-05T08:00', null), 'missing');
eq('M1 classify: geen eigen waarde → missing', classify(undefined, '2026-01-05T08:00'), 'missing');

// measureFidelity op lege bytes: geen geldig CFB-bestand (de eerste 8 bytes zijn al te kort voor
// de OLE2-magic), dus geen MppUnsupportedError — die gooit pas ná een geslaagde CFB-parse. Status
// moet 'error' zijn (een echte, onverwachte leesfout), niet stil 'ok' met tasks: 0.
{
  const row = measureFidelity(new Uint8Array(0));
  eq('M1 measureFidelity(lege bytes): status === error', row.status, 'error');
  truthy('M1 measureFidelity(lege bytes): errMsg gezet', !!row.errMsg);
}

// measureFidelity op een gefingeerd MPP12 (legacy)-bestand: minimale CFB met alleen \x01CompObj
// (applicatienaam "MSProject.MPP12") + Props14 (wachtwoordvlag=0). `assertReadable` weigert MPP12
// met mppCode 'MPP_LEGACY' vóór er ooit naar de rest van de structuur gekeken wordt — zelfde
// fixture-patroon als check-mpp-import.ts se "T4 synthetisch MPP12"-case, hier lokaal opgebouwd
// (elk mpp-checkbestand bouwt zijn eigen, minimale fixture-set — zie check-mpp-relations.ts se
// moduleheader-conventie). Bewijst dat 'rejected' (overgeslagen, O7) een bereikbaar pad is zonder
// dat het bedrijfscorpus toevallig een MPP12-bestand hoeft te bevatten om dat te oefenen.
{
  const MPP_PASSWORD_FLAG_KEY = 893386752; // PropsKey.PASSWORD_FLAG (PropsKey.java r. 73)
  const compObj = encodeCompObjFileFormat('MSProject.MPP12');
  const props14 = encodePropsSingleByteEntry(MPP_PASSWORD_FLAG_KEY, 0);
  const legacyBytes = buildTwoRootStreamsCfb('\x01CompObj', compObj, 'Props14', props14);
  const row = measureFidelity(legacyBytes);
  eq('M1 measureFidelity(gefingeerd MPP12): status === rejected', row.status, 'rejected');
  eq("M1 measureFidelity(gefingeerd MPP12): errCode === 'MPP_LEGACY'", row.errCode, 'MPP_LEGACY');
}

// ── Corpuswortels (T1-conventie, plan §"Corpuswortels") ───────────────────────────────────────
const CORPUS = process.env.OPS_MPP_CORPUS ?? '/home/nozzit/open-aec/voor claude/test bestanden voor file implementation';
const CRAWL = process.env.OPS_MPP_CRAWL ?? '/home/nozzit/open-aec/voor claude/testdata-crawl';

type RootName = 'corpus' | 'crawl';

// L2 (reviewbevinding): entries per map alfabetisch sorteren — `readdirSync` garandeert GEEN
// volgorde (filesystem-afhankelijk), en de pad-pariteitscase hieronder kiest "het eerste bruikbare
// bestand" tijdens de scan. Zonder sortering kan die keuze tussen machines/runs wisselen, wat de
// pariteitscase non-deterministisch maakt. Met sortering is de scanvolgorde (en dus de gekozen
// pariteitsfile) stabiel.
function listMppFilesRecursive(dir: string): string[] {
  const out: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listMppFilesRecursive(full));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.mpp')) out.push(full);
  }
  return out;
}

function hashOf(bytes: Uint8Array): string {
  return createHash('sha256').update(bytes).digest('hex').slice(0, 16);
}

/** L4: de ENIGE plek die een bestand naar tekst voor menselijke/CI-uitvoer omzet — corpusbestanden
 *  UITSLUITEND als hash, crawlbestanden met hun (publieke, ongevoelige) relatieve pad. */
function tagFor(root: RootName, hash: string, label: string | undefined): string {
  return root === 'crawl' ? (label ?? hash) : hash;
}

// ── Baseline-schema (plan §6, root-veld: reviewbevinding H1) ────────────────────────────────
interface BaselineEntry {
  root: RootName;
  /** Alleen voor crawl-bestanden (publiek materiaal) — bedrijfsbestanden blijven ongelabeld. */
  label?: string;
  tasks: number;
  startExact: number;
  startSameday: number;
  startDiff: number;
  finishExact: number;
  finishSameday: number;
  finishDiff: number;
}
interface Baseline {
  files: Record<string, BaselineEntry>;
}
/** ≥1 start- of finish-afwijking (bewust NIET sameday — zie mppFidelity.ts se FidelityRow-doc).
 *  Gederiveerd uit de per-bestand-pins zelf, niet als los, potentieel afdrijvend veld bijgehouden
 *  (vóór deze review was dit een apart top-level `diffFiles`-veld dat uit de pas kon lopen met de
 *  per-bestand-tellingen als iemand de baseline met de hand bewerkt). */
function hasDiff(e: Pick<BaselineEntry, 'startDiff' | 'finishDiff'>): boolean {
  return e.startDiff > 0 || e.finishDiff > 0;
}

const BASELINE_PATH = join(HERE, 'mpp-fidelity-baseline.json');
let baseline: Baseline = { files: {} };
if (REPORT !== 'baseline') {
  try {
    baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf-8')) as Baseline;
  } catch (err) {
    checks++;
    diffs.push(`mpp-fidelity-baseline.json kon niet gelezen/geparsed worden: ${err instanceof Error ? err.message : String(err)}`);
  }
}

// ── Rapport-accumulator voor OPS_MPP_FIDELITY_REPORT=baseline (print, schrijft NOOIT zelf) ─────
const reportEntries: Record<string, BaselineEntry> = {};

// ── Bijhouden PER WORTEL (reviewbevinding H1) ───────────────────────────────────────────────
const seenPinnedHashesByRoot: Record<RootName, Set<string>> = { corpus: new Set(), crawl: new Set() };
const actualDiffHashesByRoot: Record<RootName, Set<string>> = { corpus: new Set(), crawl: new Set() };
let rejectedCount = 0;
let firstUsableFile: { path: string; bytes: Uint8Array; root: RootName; hash: string; label: string | undefined } | null = null;

function printDetail(tag: string, row: FidelityRow) {
  if (row.diffTasks.length === 0) return;
  console.log(`   . [detail ${tag}] ${row.diffTasks.length} afwijkende taak/taken:`);
  console.log('     ID | naam | MSP-start | onze-ES | MSP-finish | onze-EF | dur(d) | ms | cons | %c | actS | cal | preds');
  for (const d of row.diffTasks) {
    console.log(
      `     ${d.id.padStart(4)} ${d.name.slice(0, 24).padEnd(24)} ${String(d.msStart).padEnd(16)} `
      + `${d.startMark}${d.ourStart.padEnd(16)} ${String(d.msFinish).padEnd(16)} ${d.finishMark}${d.ourFinish.padEnd(16)} `
      + `${d.durationDays.toFixed(3).padStart(8)} ${d.isMilestone ? 'M' : ' '} ${d.constraint.padEnd(10)} `
      + `${String(d.completionPct).padStart(3)} ${d.actualStart.padEnd(11)} ${d.calendarId.slice(0, 8).padEnd(8)} ${d.preds.slice(0, 50)}`,
    );
  }
  if (Object.keys(row.diffBuckets).length > 0) {
    console.log(`     attribuut-emmers: ${JSON.stringify(row.diffBuckets)}`);
  }
}

/** Verwerk één gelezen bestand: meet, pin-check (of baseline-accumulatie), rapportage. Elke
 *  diagnoseregel gebruikt `tagFor()` (L4) — nooit rechtstreeks `path`. */
function processFile(path: string, bytes: Uint8Array, root: RootName, label: string | undefined) {
  const row = measureFidelity(bytes);
  const hash = hashOf(bytes);
  const tag = tagFor(root, hash, label);

  if (row.status === 'rejected') {
    rejectedCount++;
    return; // MPP_LEGACY/MPP_ENCRYPTED — overgeslagen, nooit een fout (O7).
  }
  if (row.status === 'error') {
    checks++;
    diffs.push(`[${tag}] measureFidelity gaf status 'error': ${row.errMsg ?? '(geen boodschap)'}`);
    return;
  }

  // status === 'ok'
  if (!firstUsableFile && row.tasks > 0) firstUsableFile = { path, bytes, root, hash, label };

  if (hasDiff(row)) actualDiffHashesByRoot[root].add(hash);
  if (REPORT === 'detail') printDetail(tag, row);

  if (REPORT === 'baseline') {
    reportEntries[hash] = {
      root,
      ...(label ? { label } : {}),
      tasks: row.tasks,
      startExact: row.startExact, startSameday: row.startSameday, startDiff: row.startDiff,
      finishExact: row.finishExact, finishSameday: row.finishSameday, finishDiff: row.finishDiff,
    };
    return;
  }

  const pin = baseline.files[hash];
  if (!pin) {
    checks++;
    diffs.push(`[${tag}] niet gepind in mpp-fidelity-baseline.json — herpin via OPS_MPP_FIDELITY_REPORT=baseline`);
    return;
  }
  seenPinnedHashesByRoot[root].add(hash);
  eq(`[${tag}] tasks`, row.tasks, pin.tasks);
  eq(`[${tag}] startExact`, row.startExact, pin.startExact);
  eq(`[${tag}] startSameday`, row.startSameday, pin.startSameday);
  eq(`[${tag}] startDiff`, row.startDiff, pin.startDiff);
  eq(`[${tag}] finishExact`, row.finishExact, pin.finishExact);
  eq(`[${tag}] finishSameday`, row.finishSameday, pin.finishSameday);
  eq(`[${tag}] finishDiff`, row.finishDiff, pin.finishDiff);
}

// ── OPS_MPP_CORPUS — geen label (bedrijfsbestanden, plan §6) ────────────────────────────────
const corpusDirExists = existsSync(CORPUS);
const corpusFiles = corpusDirExists ? listMppFilesRecursive(CORPUS) : [];
// H1: een aanwezige maar LEGE map gedraagt zich als afwezig — geen globale-pin-assert erop.
const corpusScanned = corpusFiles.length > 0;
if (!corpusDirExists) {
  console.log('OK  mpp-fidelity: corpus niet aanwezig (OPS_MPP_CORPUS) — corpuslus overgeslagen');
} else if (!corpusScanned) {
  console.log(`OK  mpp-fidelity: corpusmap aanwezig maar geen .mpp-bestanden erin (${CORPUS}) — corpuslus overgeslagen`);
} else {
  for (const path of corpusFiles) {
    processFile(path, new Uint8Array(readFileSync(path)), 'corpus', undefined);
  }
  console.log(`   . [corpus] ${corpusFiles.length} bestand(en) gescand`);
}

// ── OPS_MPP_CRAWL — leesbaar label toegestaan (publiek materiaal, plan §6) ──────────────────
const crawlDirExists = existsSync(CRAWL);
const crawlFiles = crawlDirExists ? listMppFilesRecursive(CRAWL) : [];
const crawlScanned = crawlFiles.length > 0;
if (!crawlDirExists) {
  console.log('OK  mpp-fidelity: crawl niet aanwezig (OPS_MPP_CRAWL) — crawllus overgeslagen');
} else if (!crawlScanned) {
  console.log(`OK  mpp-fidelity: crawlmap aanwezig maar geen .mpp-bestanden erin (${CRAWL}) — crawllus overgeslagen`);
} else {
  for (const path of crawlFiles) {
    const label = relative(CRAWL, path).split(sep).join('/');
    processFile(path, new Uint8Array(readFileSync(path)), 'crawl', label);
  }
  console.log(`   . [crawl] ${crawlFiles.length} bestand(en) gescand`);
}

console.log(`   . ${rejectedCount} bestand(en) overgeslagen (MPP_LEGACY/MPP_ENCRYPTED — O7, telt niet als fout)`);

// ── OPS_MPP_FIDELITY_REPORT=baseline: print en klaar (schrijft nooit zelf, plan §6) ────────────
if (REPORT === 'baseline') {
  // GEEN replacer-array op JSON.stringify hier: die filtert RECURSIEF op elk niveau — een
  // top-level-sleutellijst als replacer zou dus ook de hash-sleutels BINNEN `files` wegfilteren.
  // Sorteer de bestandssleutels expliciet vóór het serialiseren.
  const sortedFiles: Record<string, BaselineEntry> = {};
  for (const hash of Object.keys(reportEntries).sort()) sortedFiles[hash] = reportEntries[hash];
  const out: Baseline = { files: sortedFiles };
  console.log('#BASELINE ' + JSON.stringify(out, null, 2));
  process.exit(0);
}

// ── Globale pins, PER WORTEL (reviewbevinding H1) ───────────────────────────────────────────
// Alleen zinvol (en alleen uitgevoerd) voor een wortel die dit keer DAADWERKELIJK gescand is —
// anders zou een afwezig/leeg corpus of crawl (de normale situatie voor wie niet op deze ene
// machine werkt) hier alsnog een globale mismatch geven en de C3-conventie breken ("corpus/crawl-
// afwezig beïnvloedt nooit de einduitslag", plan §5).
function assertRootPins(root: RootName) {
  const pinnedForRoot = Object.entries(baseline.files).filter(([, v]) => v.root === root);
  eq(`globaal[${root}]: aantal gepinde bestanden dat daadwerkelijk gezien is`, seenPinnedHashesByRoot[root].size, pinnedForRoot.length);

  const expectedDiff = new Set(pinnedForRoot.filter(([, v]) => hasDiff(v)).map(([h]) => h));
  const actualDiff = actualDiffHashesByRoot[root];
  // L3: symmetrisch verschil printen i.p.v. twee volledige (soms tientallen hashes lange) arrays —
  // een mens leest "ontbreekt/nieuw" in één oogopslag, twee volle JSON-arrays niet.
  const missingFromScan = [...expectedDiff].filter((h) => !actualDiff.has(h)).sort();
  const unexpectedInScan = [...actualDiff].filter((h) => !expectedDiff.has(h)).sort();
  checks++;
  if (missingFromScan.length > 0 || unexpectedInScan.length > 0) {
    const missingLabels = missingFromScan.map((h) => tagFor(root, h, baseline.files[h]?.label));
    const unexpectedLabels = unexpectedInScan.map((h) => tagFor(root, h, baseline.files[h]?.label));
    diffs.push(
      `globaal[${root}]: verzameling bestanden met ≥1 afwijking wijkt af van de gepinde verzameling — `
      + `mist in de scan (was gepind als afwijkend, nu niet meer gezien): [${missingLabels.join(', ')}]; `
      + `nieuw/onverwacht afwijkend: [${unexpectedLabels.join(', ')}]`,
    );
  }
}
if (corpusScanned) assertRootPins('corpus');
if (crawlScanned) assertRootPins('crawl');

// ── T1-acceptatie: pad-pariteitscase — de ECHTE store (applyLoadedProject+runCPM, patroon
// check-mpp-open-guard.ts) tegen mppFidelity's solveMppBytes op HETZELFDE bestand. Wijken die af,
// dan meet deze suite iets anders dan wat de gebruiker in de app krijgt. ──────────────────────────
if (!firstUsableFile) {
  console.log('OK  mpp-fidelity: geen bruikbaar bestand (0 taken of geen corpus/crawl) — pad-pariteitscase overgeslagen');
} else {
  const { bytes: parityBytes, root: parityRoot, hash: parityHash, label: parityLabel } = firstUsableFile;
  const parityTag = tagFor(parityRoot, parityHash, parityLabel);
  const direct = solveMppBytes(parityBytes);

  const S = () => useAppStore.getState();
  S().newProject();
  S().applyLoadedProject(readMPP(parityBytes), {
    filePath: null, recompute: true, fit: false, hourDataNotice: false, linkedOpen: true,
  });

  // Join op ARRAY-POSITIE, niet op `id`: `readMPP` geeft elke taak een VERSE id
  // (`src/utils/id.ts`: tijd+random) — twee losse `readMPP(parityBytes)`-aanroepen op DEZELFDE
  // bytes leveren dus nooit gelijke id's, ook al is de rest identiek. De volgorde is wél
  // deterministisch (beide kanten sorteren op MS Projects eigen taak-ID), dus positioneel
  // vergelijken is hier het juiste join — bevestigd door een handmatige steekproef (namen op
  // gelijke index kwamen exact overeen vóór deze fix er was).
  eq(`[pad-pariteit ${parityTag}] taakaantal store === direct`, S().tasks.length, direct.tasks.length);
  let mismatched = 0;
  const storeTasks = S().tasks;
  const n = Math.min(storeTasks.length, direct.tasks.length);
  for (let i = 0; i < n; i++) {
    const st = storeTasks[i];
    const dt = direct.tasks[i];
    if (st.name !== dt.name || st.time.earlyStart !== dt.time.earlyStart || st.time.earlyFinish !== dt.time.earlyFinish) mismatched++;
  }
  eq(`[pad-pariteit ${parityTag}] alle taken (positioneel): store naam+earlyStart+earlyFinish === solveMppBytes (mismatches)`, mismatched, 0);
}

// ── Uitslag ──────────────────────────────────────────────────────────────────────────────────
if (diffs.length === 0) {
  console.log(`OK  mpp-fidelity: alle checks groen (${checks})`);
  process.exit(0);
} else {
  console.log(`XX  mpp-fidelity: ${diffs.length} afwijking(en) van ${checks}`);
  for (const d of diffs) console.log(`   - ${d}`);
  process.exit(1);
}
