// T8-rooktest, vervolg — end-to-end regressie: "Bijlage 13 Productieplanning.mpp" bevat relaties
// die WBS-samenvattingstaken raken (in MS Project legaal). 489a9ef2 loste de CPMSolver-crash op
// door zulke relaties te DROPPEN (`CPMResult.droppedSequenceIds`) — een bewuste tussenoplossing die
// op dit bestand 28 van de 105 relaties liet vallen (~27% van de logica). Deze check bewaakt sinds
// de samenvattingsrelatie-propagatie (`expandSummaryRelations`, zie de module aldaar) dat die 28
// relaties nu VOLLEDIG worden gerepresenteerd (herschreven naar bladtaak-relaties) i.p.v. genegeerd:
// 0 gedropte relaties, exact het runCPM-pad (leaf-only CPMSolver + expandSummaryRelations vóór de
// solver, precies zoals `scheduleSlice.runCPM`).
//
// GROUND-TRUTH-VOORBEHOUD (T5-bevinding, check-mpp-import.ts): de `.mpp.xml`-ground-truth van dit
// corpusbestand is een ANDERE DOCUMENTVERSIE dan de `.mpp` zelf — géén export van precies dezelfde
// staat (27 van de 51 unique-id's in de .mpp komen niet eens voor in de XML; taken zijn verplaatst,
// een cut/paste-signatuur). Een numerieke "is de nieuwe projectEnd dichter bij de XML"-vergelijking
// is voor DIT corpuspaar dus principieel geen zuivere meting van de propagatie-fix — de INVOER zelf
// verschilt al tussen de twee bestanden. Deze check pint daarom de nieuw berekende projectEnd/
// -Duration als REGRESSIEBASELINE (elke onbedoelde toekomstige wijziging in expandSummaryRelations
// of de solver wordt zo gevangen) en logt de MSPDI-projecteinddatum ernaast, beargumenteerd, zonder
// er een hard "closer"-oordeel van te maken.
//
// GEEN IN-REPO FIXTURE: dit is een echt bedrijfsbestand van de gebruiker (zelfde corpus-conventie
// als check-mpp-import.ts/-calendars.ts/-relations.ts — override met OPS_MPP_CORPUS). Zonder het
// bestand slaat deze check netjes over (OK, geen fout) en beïnvloedt hij de einduitslag niet.
//
// Draait via run.sh (binnen het RUN_HOLIDAYS-blok).
//
// DEKKINGSKAART (T9 — dit bestand toetst GEEN mpp-domeindata op zichzelf, alleen de CPM-solver-
// propagatie op één specifiek corpusbestand): CORPUS (1 bestand, `Bijlage 13`) — géén synthetische
// laag, géén crawl-sectie (dit is een scheduling-regressietest, geen lezer-breedtecheck). Zie
// check-mpp-import.ts, check-mpp-calendars.ts en check-mpp-relations.ts voor de dekkingskaarten
// van de mpp-lezer zelf.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { readMPP } from '@/services/mpp/mppReader';
import { readMSPDI } from '@/services/msproject/mspdiReader';
import { CPMSolver } from '@/engine/scheduler/CPMSolver';
import { expandSummaryRelations, foldSyntheticSequenceIds } from '@/engine/scheduler/expandSummaryRelations';
import { installDOMParser } from './xmldom-shim';

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
    // de VOLLEDIGE ongefilterde relatieset (inclusief die op samenvattingstaken) — herschreven door
    // expandSummaryRelations vóórdat de solver ze ziet.
    const leafTasks = tasks.filter((t) => t.childIds.length === 0);
    truthy('minstens één bladtaak (anders is er niets te plannen)', leafTasks.length > 0);
    // Bewijs dat dit bestand de propagatielogica daadwerkelijk oefent: minstens één relatie
    // verwijst naar een taak-id dat NIET in de bladtakenset zit (dus naar een samenvattingstaak).
    // Zonder dit zou de check hieronder ook groen zijn geweest met een corpusbestand dat de
    // propagatie niet raakt.
    const leafIds = new Set(leafTasks.map((t) => t.id));
    const touchesNonLeaf = sequences.some(
      (s) => !leafIds.has(s.predecessorId) || !leafIds.has(s.successorId),
    );
    truthy(
      'dit corpusbestand bevat minstens één relatie die een niet-bladtaak raakt (bewijst dat de check de propagatie echt oefent)',
      touchesNonLeaf,
    );
    const touchingCount = sequences.filter(
      (s) => !leafIds.has(s.predecessorId) || !leafIds.has(s.successorId),
    ).length;
    truthy(
      `de 489a9ef2-basislijn (28 relaties raken een niet-bladtaak) is nog intact — gemeten: ${touchingCount}`,
      touchingCount === 28,
    );

    const { sequences: expandedSequences, droppedSequenceIds: expansionDropped } =
      expandSummaryRelations(tasks, sequences);

    let solveThrew: unknown = null;
    let cpm: ReturnType<CPMSolver['solve']> | null = null;
    try {
      const solver = new CPMSolver(leafTasks, expandedSequences, calendar, resourceCalendars, {});
      cpm = solver.solve();
    } catch (err) {
      solveThrew = err;
    }
    truthy(
      `CPMSolver.solve() op "${FILE}" crasht niet (${solveThrew instanceof Error ? solveThrew.stack ?? solveThrew.message : String(solveThrew ?? '')})`,
      solveThrew === null && cpm !== null,
    );

    if (cpm) {
      // I2 (CPM-review): zelfde volgorde als scheduleSlice.runCPM — eerst de synthetische ids in de
      // vier relatie-gekeyde velden terugvouwen, dan pas de dropped-lijsten samenvoegen.
      foldSyntheticSequenceIds(cpm);
      // Zelfde samenvoeging als scheduleSlice.runCPM: solver-eigen drops (489a9ef2-vangnet, écht
      // verweesde ids) + expansie-drops (lege tak / MAX_EXPANDED_RELATIONS-klem, of C1's voorouder-/
      // zelfrelatie-guard) horen in hetzelfde kanaal.
      const totalDropped = [...new Set([...(cpm.droppedSequenceIds ?? []), ...expansionDropped])];

      truthy('geen circulaire-dependency-fout', !cpm.error);
      truthy('cpmResult bevat taakresultaten (rekent echt door)', cpm.tasks.size === leafTasks.length);
      truthy('projectEnd is een niet-lege datum', typeof cpm.projectEnd === 'string' && cpm.projectEnd.length > 0);
      // DE KERNBEWERING van deze vervolgtaak: vóór expandSummaryRelations werden hier 28 relaties
      // gedropt (zie de 489a9ef2-basislijn-check hierboven); nu worden ze allemaal gerepresenteerd.
      truthy(
        `alle 105 relaties zijn nu gerepresenteerd — 0 gedropt (was 28 vóór de samenvattingsrelatie-propagatie), gemeten: ${totalDropped.length}`,
        totalDropped.length === 0,
      );

      // ── Regressiebaseline — HERMETEN (etappe 1.5, uurmodus, 2026-08-15) ───────────────────────
      // Zie de moduleheader voor waarom dit een PIN is en geen "closer to ground truth"-oordeel.
      // Oorspronkelijke pin (T8, DAG-modus-lezer): projectEnd `2025-02-06T08:00`, projectDuration 4
      // werkdagen. Etappe 1.5 (native MPP-uurmodus, zie mppReader.ts's moduleheader "UURMODUS") laat
      // `readMPP` Bijlage 13 nu WEL in uur-modus lezen (dezelfde discriminator-uitkomst als
      // `readMSPDI` al voor de bijbehorende `.mpp.xml` gaf, 51/51 taken — zie check-mpp-import.ts's
      // T5-/uurmodus-secties): taakduren/-start/-finish dragen sindsdien hun echte minuut-precisie
      // i.p.v. altijd naar hele dagen af te ronden. Dat verandert de INVOER van de CPM-solver
      // wezenlijk (`scheduleDuration` is nu fractioneel, `scheduleStart`/`scheduleFinish` dragen een
      // tijdcomponent), dus een verschoven uitkomst is een DIRECT, verwacht gevolg van de uurmodus-
      // uitbreiding, geen regressie in `expandSummaryRelations`/`CPMSolver` zelf — vandaar hermeten
      // i.p.v. de oude pin geforceerd vast te houden. Nieuwe basislijn (gemeten 2026-08-15, deze
      // code, ná etappe 1.5): projectEnd `2025-02-10T13:45`, projectDuration 6 werkdagen.
      truthy(`projectEnd-basislijn: ${cpm.projectEnd} (verwacht 2025-02-10T13:45, etappe 1.5 uurmodus)`, cpm.projectEnd === '2025-02-10T13:45');
      truthy(`projectDuration-basislijn: ${cpm.projectDuration} werkdagen (verwacht 6, etappe 1.5 uurmodus)`, cpm.projectDuration === 6);

      // I2 (CPM-review): op een echt corpusbestand met kruisproduct-relaties moeten de vier relatie-
      // gekeyde velden ná foldSyntheticSequenceIds GEEN synthetische "::exp-N"-ids meer dragen — dat
      // is precies wat RelationsPanel/StatusBar/ReportPanel/GanttCanvas/MCP-leestools als "de echte
      // relatie-id" herkennen (ze kennen alleen `s.sequences`).
      const relationKeyedIds = [
        ...cpm.drivingSequenceIds, ...cpm.truncatedLeadSequenceIds, ...cpm.outOfSequenceSequenceIds,
        ...Object.keys(cpm.sequenceFreeFloat),
      ];
      truthy(
        `I2: geen synthetische ids meer in drivingSequenceIds/sequenceFreeFloat/truncatedLead/outOfSequence ná fold (${relationKeyedIds.length} sleutels gecontroleerd)`,
        relationKeyedIds.every((id) => !id.includes('::exp-')),
      );

      // ── Ground-truth-vergelijking (informationeel, geen hard "dichterbij"-oordeel — zie header) ─
      const xmlPath = `${path}.xml`;
      if (existsSync(xmlPath)) {
        try {
          installDOMParser();
          const xmlResult = readMSPDI(readFileSync(xmlPath, 'utf-8'));
          console.log(
            `    Ground-truth-vergelijking (voorbehoud: andere documentversie, zie header): ` +
            `onze projectEnd=${cpm.projectEnd}, MSPDI project.endDate=${xmlResult.project.endDate || '(leeg)'}.`,
          );
        } catch (err) {
          console.log(`    Ground-truth-vergelijking overgeslagen (readMSPDI faalde: ${err instanceof Error ? err.message : String(err)})`);
        }
      }

      console.log(
        `    Bijlage 13: ${leafTasks.length} bladtaken, ${sequences.length} relaties, ` +
        `${expandedSequences.length} bladtaak-relaties na expansie ` +
        `(${totalDropped.length} gedropt, was 28 vóór de propagatie), ` +
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
