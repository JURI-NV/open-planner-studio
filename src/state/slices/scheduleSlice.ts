import type { CPMResult } from '@/engine/scheduler/CPMSolver';
import { solveProject } from '@/engine/scheduler/solveProject';
import { expandSummaryRelations } from '@/engine/scheduler/expandSummaryRelations';
import { computeResourceLoad, type ResourceLoadResult } from '@/engine/scheduler/ResourceLoad';
import {
  levelResources as computeLeveling,
  type LevelingOptions,
  type LevelingResult,
} from '@/engine/scheduler/ResourceLeveler';
import { beginUndoable, finishMutation } from '../transaction';
import { emitExtensionEvent, HOST_EVENTS } from '@/services/extensionEvents';
import type { AppSlice } from './types';

export interface ScheduleSlice {
  cpmResult: CPMResult | null;
  /** Belasting/capaciteit/overallocatie per resource, herberekend bij elke `runCPM` (fase 2.5,
   *  resources-ontwerp §4.2) — "manual, not reactive", net als `cpmResult` zelf. */
  resourceLoadResult: ResourceLoadResult | null;
  /** "Verouderd"-vlag (A6): gezet door datum-rakende mutaties (taak-/relatie-/projectkalender-
   *  wijzigingen), gewist door `runCPM`. Voedt een subtiele "herbereken (F5)"-hint. */
  scheduleStale: boolean;
  runCPM: () => void;
  /** Herbereken ALLEEN de resource-belasting op de bestaande CPM-datums (A6): pure resource-
   *  mutaties (toewijzen, capaciteit, kalender) verversen zo het histogram direct, ZONDER runCPM en
   *  ZONDER de datums aan te raken — past binnen "manual, not reactive". Datum-rakende mutaties
   *  blijven handmatig (F5) en zetten in plaats hiervan `scheduleStale`. */
  recomputeResourceLoad: () => void;
  /** Nivelleer-preview (fase 2.5, §5): berekent de resource-nivellering tegen de laatst gedraaide
   *  CPM-run en geeft het resultaat terug ZONDER de store te muteren (UI toont eerst een diff,
   *  commit gaat via `applyLeveling`). Vereist een geldige `cpmResult`. */
  levelResources: (options: LevelingOptions) => LevelingResult;
  /** Commit een nivelleerresultaat: één undo-snapshot, schrijf alle `levelingDelay`-waarden
   *  (idempotent — reset eerst álles, dan de nieuwe delays) en her-draai CPM (§5.6). */
  applyLeveling: (result: LevelingResult) => void;
  /** "Nivellering wissen": één undo-snapshot, zet alle `levelingDelay` terug op undefined,
   *  her-draai CPM. */
  clearLeveling: () => void;
}

export const createScheduleSlice: AppSlice<ScheduleSlice> = (set, get) => ({
  cpmResult: null,
  resourceLoadResult: null,
  scheduleStale: false,

  recomputeResourceLoad: () => {
    set((s) => {
      s.resourceLoadResult = computeResourceLoad(
        s.resources, s.assignments, s.tasks, s.calendar, s.calendars,
      );
    });
  },

  runCPM: () => {
    set((s) => {
      s.scheduleStale = false; // F5/Bereken gedraaid — schema is (voor deze taken/relaties) vers.
      // De reken-kern (leaf-filter → solve → terugschrijven/rollup) staat sinds A3/M3 in
      // `solveProject` en draait rechtstreeks op de Immer-draft: `s.tasks` wordt in-place gemuteerd,
      // net als voorheen. Dezelfde functie draait het bezettingsoverzicht op een KLOON van de taken
      // van een stale document (B1b §4.3b) — één implementatie, geen divergentie. De samenvattings-
      // relatie-propagatie (MS Project-semantiek) zit dáár, zodat elke afnemer van de kern hem krijgt.
      const result = solveProject({
        tasks: s.tasks,
        sequences: s.sequences,
        calendar: s.calendar,
        calendars: s.calendars,
        dataDate: s.project.statusDate,
        progressMode: s.project.progressMode,
        schedulingOptions: s.project.schedulingOptions,
      });

      // If circular dependency detected, store the result (with error) and bail
      if (result.error) {
        s.cpmResult = result;
        s.resourceLoadResult = null;
        return;
      }

      s.cpmResult = result;

      // Belasting/overallocatie herberekenen ná de CPM-pass + samenvattingstaak-rollup hierboven
      // (de resource-belasting mapt op de zojuist bijgewerkte earlyStart/earlyFinish).
      s.resourceLoadResult = computeResourceLoad(
        s.resources, s.assignments, s.tasks, s.calendar, s.calendars,
      );
    });

    // Filter/sort kunnen op de zojuist bijgewerkte totalFloat/isCritical/earlyStart keyen (§4.3).
    get().recomputeViewRows();

    // Bevinding K8: een CPM-fout (cyclus, kalender zonder werkdagen, ongeldige startdatum) pusht
    // zichzelf naar het gecentraliseerde meldingenkanaal. Eén controle hier dekt beide uitgangen
    // van deze actie — de cyclus-bail boven én het normale pad — want in beide staat `cpmResult`
    // met de fout. Winst: de fout is nu óók zichtbaar vanuit Backstage/tabel/rapport, waar de
    // canvas-component (vroeger de énige toast) niet gemonteerd is.
    const cpmError = get().cpmResult?.error;
    if (cpmError) {
      get().notify({
        severity: 'error',
        messageKey: 'notifications.scheduleFailed',
        detail: cpmError,
        dedupeKey: 'cpm-error',
      });
    }

    const cpm = get().cpmResult;
    emitExtensionEvent(HOST_EVENTS.scheduleCalculated, {
      hasError: !!cpm?.error,
      error: cpm?.error ?? null,
      criticalTasks: get().tasks.filter((t) => t.time.isCritical).length,
    });
  },

  levelResources: (options) => {
    const s = get();
    const cpm = s.cpmResult;
    if (!cpm || cpm.error) {
      // Geen (geldige) CPM-run: niets te nivelleren — lege, veilige uitkomst.
      const end = cpm?.projectEnd ?? '';
      return { delays: {}, unresolved: {}, unresolvedReasons: {}, shifts: {}, projectEndBefore: end, projectEndAfter: end };
    }
    // De leveler werkt op leaf-taken (net als de CPM-pass in runCPM).
    const leafTasks = s.tasks.filter((t) => t.childIds.length === 0);
    // Zelfde samenvattingsrelatie-propagatie als runCPM (zie daar): `ResourceLeveler` krijgt hier
    // alleen bladtaken door, dus de expansie moet vóór het leaf-filter gebeuren, met de VOLLEDIGE
    // taakboom (parentId/childIds) als bron — `ResourceLeveler` zelf blijft ongewijzigd, die kent
    // de WBS-boom sowieso niet en hoeft dat ook niet te weten.
    const { sequences: expandedSequences } = expandSummaryRelations(s.tasks, s.sequences);
    // Fase 2.10 (P1-verwante correctie): dezelfde CPMOptions als `runCPM` hierboven meegeven —
    // zonder `dataDate`/`progressMode` rekende de nivelleerder intern op een pure-ASAP-realiteit
    // die van de echte (actual-gepinde) planning kan afwijken zodra er voortgang+statusdatum is
    // (zie de parameter-toelichting in `ResourceLeveler.ts:levelResources`).
    return computeLeveling(
      leafTasks, expandedSequences, s.resources, s.assignments, s.calendar, s.calendars, cpm, options,
      { dataDate: s.project.statusDate, progressMode: s.project.progressMode, schedulingOptions: s.project.schedulingOptions },
    );
  },

  applyLeveling: (result) => {
    set((s) => {
      beginUndoable(s);
      // Idempotent: eerst álle levelingDelays wissen, dan de nieuwe zetten — zo levert een
      // her-nivellering (of een leveling na een eerdere) exact het resultaat van `result`,
      // niet een optelsom.
      for (const task of s.tasks) {
        const d = result.delays[task.id];
        task.levelingDelay = d !== undefined && d > 0 ? d : undefined;
      }
      // Géén stale-vlag: de aansluitende runCPM zet scheduleStale zelf op false.
      finishMutation(s);
    });
    get().runCPM();
  },

  clearLeveling: () => {
    let changed = false;
    set((s) => {
      if (!s.tasks.some((t) => t.levelingDelay !== undefined)) return; // niets te wissen, geen snapshot
      beginUndoable(s);
      for (const task of s.tasks) task.levelingDelay = undefined;
      finishMutation(s); // stale wordt door de aansluitende runCPM gewist.
      changed = true;
    });
    if (changed) get().runCPM();
  },
});
