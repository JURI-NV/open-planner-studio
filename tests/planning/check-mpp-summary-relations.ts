// T8-rooktest — end-to-end regressie: "Bijlage 13 Productieplanning.mpp" bevat relaties die WBS-
// samenvattingstaken raken (in MS Project legaal). Vóór de fix (CPMSolver-constructor filtert nu
// relaties waarvan voorganger/opvolger geen bladtaak is) crashte de forward pass zodra zo'n relatie
// de topologische sortering in werd geduwd — een crash die `openFile`s catch opslokte, zodat het
// bestand opende maar de planning stil onberekend bleef (zie het T8-rooktest-rapport).
//
// GEEN IN-REPO FIXTURE: dit is een echt bedrijfsbestand van de gebruiker (zelfde corpus-conventie
// als check-mpp-import.ts/-calendars.ts/-relations.ts — override met OPS_MPP_CORPUS). Zonder het
// bestand slaat deze check netjes over (OK, geen fout) en beïnvloedt hij de einduitslag niet.
//
// Draait via run.sh (binnen het RUN_HOLIDAYS-blok).
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { readMPP } from '@/services/mpp/mppReader';
import { CPMSolver } from '@/engine/scheduler/CPMSolver';

const diffs: string[] = [];
let checks = 0;
const truthy = (label: string, cond: boolean) => {
  checks++;
  if (!cond) diffs.push(label);
};

const CORPUS =
  process.env.OPS_MPP_CORPUS ??
  '/home/nozzit/open-aec/voor claude/test bestanden voor file implementation';
const FILE = 'Bijlage 13 Productieplanning.mpp';
const path = join(CORPUS, FILE);

if (!existsSync(path)) {
  console.log(`OK  mpp-summary-relations: corpusbestand niet aanwezig (${path}) — check overgeslagen`);
} else {
  let importResult: ReturnType<typeof readMPP> | null = null;
  let readErr: unknown = null;
  try {
    importResult = readMPP(new Uint8Array(readFileSync(path)));
  } catch (err) {
    readErr = err;
  }
  truthy(
    `readMPP op "${FILE}" gooit niet (${readErr instanceof Error ? readErr.message : String(readErr ?? '')})`,
    readErr === null && importResult !== null,
  );

  if (importResult) {
    const { tasks, sequences, calendar, resourceCalendars } = importResult;
    truthy('bestand heeft taken', tasks.length > 0);
    truthy('bestand heeft relaties', sequences.length > 0);

    // Exact de constructie die runCPM (scheduleSlice.ts) gebruikt: alleen bladtaken naar de solver,
    // de VOLLEDIGE ongefilterde relatieset — inclusief die op samenvattingstaken.
    const leafTasks = tasks.filter((t) => t.childIds.length === 0);
    truthy('minstens één bladtaak (anders is er niets te plannen)', leafTasks.length > 0);
    // Bewijs dat dit bestand de bug daadwerkelijk raakt: minstens één relatie verwijst naar een
    // taak-id dat NIET in de bladtakenset zit (dus naar een samenvattingstaak). Zonder dit zou de
    // check hieronder ook groen zijn geweest met een corpusbestand dat de bug niet raakt.
    const leafIds = new Set(leafTasks.map((t) => t.id));
    const touchesNonLeaf = sequences.some(
      (s) => !leafIds.has(s.predecessorId) || !leafIds.has(s.successorId),
    );
    truthy(
      'dit corpusbestand bevat minstens één relatie die een niet-bladtaak raakt (bewijst dat de check de bug echt oefent)',
      touchesNonLeaf,
    );

    let solveThrew: unknown = null;
    let cpm: ReturnType<CPMSolver['solve']> | null = null;
    try {
      const solver = new CPMSolver(leafTasks, sequences, calendar, resourceCalendars, {});
      cpm = solver.solve();
    } catch (err) {
      solveThrew = err;
    }
    truthy(
      `CPMSolver.solve() op "${FILE}" crasht niet (${solveThrew instanceof Error ? solveThrew.stack ?? solveThrew.message : String(solveThrew ?? '')})`,
      solveThrew === null && cpm !== null,
    );

    if (cpm) {
      truthy('geen circulaire-dependency-fout', !cpm.error);
      truthy('cpmResult bevat taakresultaten (rekent echt door)', cpm.tasks.size === leafTasks.length);
      truthy('projectEnd is een niet-lege datum', typeof cpm.projectEnd === 'string' && cpm.projectEnd.length > 0);
      truthy(
        'de relaties op samenvattingstaken zijn genegeerd (droppedSequenceIds), niet gecrasht',
        Array.isArray(cpm.droppedSequenceIds) && cpm.droppedSequenceIds.length > 0,
      );
      console.log(
        `    Bijlage 13: ${leafTasks.length} bladtaken, ${sequences.length} relaties ` +
        `(${cpm.droppedSequenceIds?.length ?? 0} genegeerd wegens niet-bladtaak-eindpunt), ` +
        `projectEnd=${cpm.projectEnd}, projectDuration=${cpm.projectDuration} werkdagen`,
      );
    }
  }

  if (diffs.length === 0) {
    console.log(`OK  mpp-summary-relations: alle checks groen (${checks})`);
  } else {
    console.log(`XX  mpp-summary-relations: ${diffs.length} afwijking(en) van ${checks}`);
    for (const d of diffs) console.log(`   - ${d}`);
    process.exitCode = 1;
  }
}
