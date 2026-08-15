// MPP-datumgetrouwheid (fase 3.8, etappe "MSP-pariteit", plandocument T1) — de regressietest-
// helft van het gedeelde meetscript (§5). De meetkern zelf staat in `mppFidelity.ts`
// (`measureFidelity`, roept `readMPP` + `solveProject` — de ECHTE `runCPM`-keten — aan tegen de
// ONAFHANKELIJKE grondwaarheid uit `mppGroundTruth.ts`). Dit bestand is de CI-poort eromheen:
// corpus-/crawl-iteratie, per-bestand-per-veld-pinning tegen `mpp-fidelity-baseline.json`, en de
// twee rapportagemodi.
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
// (echte bedrijfsbestanden) blijft dat veld leeg.
//
// PINNING (plan §5, "geen somtotalen"): per bestand, met `===` — `tasks`, `startExact`,
// `startSameday`, `startDiff`, `finishExact`, `finishSameday`, `finishDiff`. Plus twee globale
// pins: (a) elk gepind bestand ook echt teruggevonden in de scan, en (b) de VERZAMELING bestanden
// met ≥1 afwijking exact gelijk aan de gepinde verzameling — dat vangt een NIEUW afwijkend bestand
// ook wanneer een ander bestand tegelijk verbetert (een som zou dat verdoezelen). Een gescand
// bestand zonder pin faalt (herpinnen via `OPS_MPP_FIDELITY_REPORT=baseline`, met de hand plakken
// — de check schrijft nooit zelf een bestand).
//
// `MPP_LEGACY`/`MPP_ENCRYPTED`-weigeringen tellen als overgeslagen (eigenaarsbesluit O7), nooit
// als fout; alleen een ONVERWACHTE throw (geen `mppCode`) is een echte faal.
//
// Draait via run.sh (RUN_HOLIDAYS-blok, ná check-mpp-summary-relations) en draait daarna mee in de
// tijdzone-matrix — vandaar (T1-ontwerpeis) dat de gehele corpusscan ruim < 1 s kost: de matrix
// herhaalt dit vijfmaal.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { measureFidelity, solveMppBytes, type FidelityRow } from './mppFidelity';
import { readMPP } from '@/services/mpp/mppReader';
import { useAppStore } from '@/state/appStore';

// `import.meta.url`-relatief i.p.v. `process.cwd()` — zelfde reviewbevinding/conventie als
// `check-adapters-hours.ts`/`check-mpp-chunk-boundary.ts`: dit bestand draait via
// `bash tests/planning/run.sh`, dat nooit naar de repo-root `cd`'t.
const HERE = fileURLToPath(new URL('.', import.meta.url));

const diffs: string[] = [];
let checks = 0;
const eq = (label: string, got: unknown, want: unknown) => {
  checks++;
  if (got !== want) diffs.push(`${label}: verwacht ${JSON.stringify(want)}, kreeg ${JSON.stringify(got)}`);
};

const REPORT = process.env.OPS_MPP_FIDELITY_REPORT; // undefined | 'detail' | 'baseline'

// ── Corpuswortels (T1-conventie, plan §"Corpuswortels") ───────────────────────────────────────
const CORPUS = process.env.OPS_MPP_CORPUS ?? '/home/nozzit/open-aec/voor claude/test bestanden voor file implementation';
const CRAWL = process.env.OPS_MPP_CRAWL ?? '/home/nozzit/open-aec/voor claude/testdata-crawl';

function listMppFilesRecursive(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listMppFilesRecursive(full));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.mpp')) out.push(full);
  }
  return out;
}

function hashOf(bytes: Uint8Array): string {
  return createHash('sha256').update(bytes).digest('hex').slice(0, 16);
}

// ── Baseline-schema (plan §6) ────────────────────────────────────────────────────────────────
interface BaselineEntry {
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
  /** Gesorteerde lijst van hash-sleutels met ≥1 start- of finish-afwijking — het T1-ontwerpeis
   *  "de VERZAMELING bestanden met ≥1 afwijking", los van de per-bestand-per-veld-pins. */
  diffFiles: string[];
}

const BASELINE_PATH = join(HERE, 'mpp-fidelity-baseline.json');
let baseline: Baseline = { files: {}, diffFiles: [] };
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
const reportDiffFiles = new Set<string>();

// ── Bijhouden over beide wortels heen (globale pins) ────────────────────────────────────────
const seenPinnedHashes = new Set<string>();
const actualDiffHashes = new Set<string>();
let rejectedCount = 0;
let firstUsableFile: { path: string; bytes: Uint8Array } | null = null;

function printDetail(label: string, row: FidelityRow) {
  if (row.diffTasks.length === 0) return;
  console.log(`   . [detail ${label}] ${row.diffTasks.length} afwijkende taak/taken:`);
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

/** Verwerk één gelezen bestand: meet, pin-check (of baseline-accumulatie), rapportage. */
function processFile(path: string, bytes: Uint8Array, label: string | undefined) {
  const row = measureFidelity(bytes);

  if (row.status === 'rejected') {
    rejectedCount++;
    return; // MPP_LEGACY/MPP_ENCRYPTED — overgeslagen, nooit een fout (O7).
  }
  if (row.status === 'error') {
    checks++;
    diffs.push(`[${path}] measureFidelity gaf status 'error': ${row.errMsg ?? '(geen boodschap)'}`);
    return;
  }

  // status === 'ok'
  const hash = hashOf(bytes);
  if (!firstUsableFile && row.tasks > 0) firstUsableFile = { path, bytes };

  if (row.startDiff > 0 || row.finishDiff > 0) actualDiffHashes.add(hash);
  if (REPORT === 'detail') printDetail(label ?? path, row);

  if (REPORT === 'baseline') {
    reportEntries[hash] = {
      ...(label ? { label } : {}),
      tasks: row.tasks,
      startExact: row.startExact, startSameday: row.startSameday, startDiff: row.startDiff,
      finishExact: row.finishExact, finishSameday: row.finishSameday, finishDiff: row.finishDiff,
    };
    if (row.startDiff > 0 || row.finishDiff > 0) reportDiffFiles.add(hash);
    return;
  }

  const pin = baseline.files[hash];
  if (!pin) {
    checks++;
    diffs.push(`[${path}] (hash ${hash}) niet gepind in mpp-fidelity-baseline.json — herpin via OPS_MPP_FIDELITY_REPORT=baseline`);
    return;
  }
  seenPinnedHashes.add(hash);
  eq(`[${path}] tasks`, row.tasks, pin.tasks);
  eq(`[${path}] startExact`, row.startExact, pin.startExact);
  eq(`[${path}] startSameday`, row.startSameday, pin.startSameday);
  eq(`[${path}] startDiff`, row.startDiff, pin.startDiff);
  eq(`[${path}] finishExact`, row.finishExact, pin.finishExact);
  eq(`[${path}] finishSameday`, row.finishSameday, pin.finishSameday);
  eq(`[${path}] finishDiff`, row.finishDiff, pin.finishDiff);
}

// ── OPS_MPP_CORPUS — geen label (bedrijfsbestanden, plan §6) ────────────────────────────────
const corpusPresent = existsSync(CORPUS);
if (!corpusPresent) {
  console.log('OK  mpp-fidelity: corpus niet aanwezig (OPS_MPP_CORPUS) — corpuslus overgeslagen');
} else {
  const corpusFiles = listMppFilesRecursive(CORPUS);
  if (corpusFiles.length === 0) {
    console.log(`OK  mpp-fidelity: corpusmap aanwezig maar geen .mpp-bestanden erin (${CORPUS}) — corpuslus overgeslagen`);
  } else {
    for (const path of corpusFiles) {
      processFile(path, new Uint8Array(readFileSync(path)), undefined);
    }
    console.log(`   . [corpus] ${corpusFiles.length} bestand(en) gescand`);
  }
}

// ── OPS_MPP_CRAWL — leesbaar label toegestaan (publiek materiaal, plan §6) ──────────────────
const crawlPresent = existsSync(CRAWL);
if (!crawlPresent) {
  console.log('OK  mpp-fidelity: crawl niet aanwezig (OPS_MPP_CRAWL) — crawllus overgeslagen');
} else {
  const crawlFiles = listMppFilesRecursive(CRAWL);
  if (crawlFiles.length === 0) {
    console.log(`OK  mpp-fidelity: crawlmap aanwezig maar geen .mpp-bestanden erin (${CRAWL}) — crawllus overgeslagen`);
  } else {
    for (const path of crawlFiles) {
      const label = relative(CRAWL, path).split(sep).join('/');
      processFile(path, new Uint8Array(readFileSync(path)), label);
    }
    console.log(`   . [crawl] ${crawlFiles.length} bestand(en) gescand`);
  }
}

console.log(`   . ${rejectedCount} bestand(en) overgeslagen (MPP_LEGACY/MPP_ENCRYPTED — O7, telt niet als fout)`);

// ── OPS_MPP_FIDELITY_REPORT=baseline: print en klaar (schrijft nooit zelf, plan §6) ────────────
if (REPORT === 'baseline') {
  // GEEN replacer-array op JSON.stringify hier: die filtert (bewezen, T1-implementatie) RECURSIEF
  // op elk niveau — `Object.keys(out)` als replacer levert dus een leeg `files`-object op, want de
  // hash-sleutels daarbinnen staan niet in die lijst. Sorteer de bestandssleutels expliciet vóór
  // het serialiseren; de top-level sleutelvolgorde (`files` vóór `diffFiles`) doet er niet toe.
  const sortedFiles: Record<string, BaselineEntry> = {};
  for (const hash of Object.keys(reportEntries).sort()) sortedFiles[hash] = reportEntries[hash];
  const out: Baseline = { files: sortedFiles, diffFiles: [...reportDiffFiles].sort() };
  console.log('#BASELINE ' + JSON.stringify(out, null, 2));
  process.exit(0);
}

// ── Globale pins (plan §5/"Ontwerpeisen") ───────────────────────────────────────────────────
// Alleen zinvol (en alleen uitgevoerd) als er ÜBERHAUPT een wortel gescand is — anders zou een
// afwezig corpus/crawl (de normale CI-situatie) hier alsnog een globale mismatch geven en de
// C3-conventie breken ("corpus/crawl-afwezig beïnvloedt nooit de einduitslag", plan §5).
if (corpusPresent || crawlPresent) {
  const pinnedHashes = Object.keys(baseline.files);
  eq('globaal: aantal gepinde bestanden dat daadwerkelijk gezien is', seenPinnedHashes.size, pinnedHashes.length);

  const expectedDiffSet = [...baseline.diffFiles].sort();
  const actualDiffSet = [...actualDiffHashes].sort();
  eq(
    'globaal: verzameling bestanden met ≥1 afwijking (start- of finish-) === gepinde verzameling',
    JSON.stringify(actualDiffSet), JSON.stringify(expectedDiffSet),
  );
}

// ── T1-acceptatie: pad-pariteitscase — de ECHTE store (applyLoadedProject+runCPM, patroon
// check-mpp-open-guard.ts) tegen mppFidelity's solveMppBytes op HETZELFDE bestand. Wijken die af,
// dan meet deze suite iets anders dan wat de gebruiker in de app krijgt. ──────────────────────────
if (!firstUsableFile) {
  console.log('OK  mpp-fidelity: geen bruikbaar bestand (0 taken of geen corpus/crawl) — pad-pariteitscase overgeslagen');
} else {
  const { path: parityPath, bytes: parityBytes } = firstUsableFile;
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
  eq(`[pad-pariteit ${parityPath}] taakaantal store === direct`, S().tasks.length, direct.tasks.length);
  let mismatched = 0;
  const storeTasks = S().tasks;
  const n = Math.min(storeTasks.length, direct.tasks.length);
  for (let i = 0; i < n; i++) {
    const st = storeTasks[i];
    const dt = direct.tasks[i];
    if (st.name !== dt.name || st.time.earlyStart !== dt.time.earlyStart || st.time.earlyFinish !== dt.time.earlyFinish) mismatched++;
  }
  eq(`[pad-pariteit ${parityPath}] alle taken (positioneel): store naam+earlyStart+earlyFinish === solveMppBytes (mismatches)`, mismatched, 0);
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
