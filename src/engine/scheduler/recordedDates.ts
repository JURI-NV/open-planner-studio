import type { Task } from '@/types/task';
import type { WorkCalendar } from '@/types/calendar';
import type { CPMResult, CPMTaskResult } from './CPMSolver';
import { CalendarEngine } from './CalendarEngine';
import { parseInstant } from '@/utils/dateUtils';

/**
 * "Datums zoals opgeslagen" (issue #63) — de pure laag.
 *
 * Een via P6 → IFC geïmporteerde planning draagt datums maar vaak geen sluitende logica. Openen
 * herberekent onvoorwaardelijk (dat blijft zo — die solve ís de detectie), waarna de bron onzichtbaar
 * is. Deze module legt vast wat het bestand zei, telt de verschillen, en reconstrueert een `CPMResult`
 * uit die vastlegging in plaats van te solven.
 *
 * KERNREGEL: nooit iets beweren wat het bestand niet zegt. `parseDateFromIFC` maakt van een `$`-slot
 * de datum van vandaag, dus de aanwezigheidsregistratie uit de lezer (`ImportResult.recordedFields`)
 * is de enige betrouwbare bron voor "dit stond er echt".
 */

/** Wat het bestand per taak vastlegde. Alles behalve start/finish is optioneel: ontbreekt het in het
 *  bestand, dan blijft het hier `undefined` in plaats van een verzonnen nul. */
export interface RecordedTime {
  start: string;
  finish: string;
  lateStart?: string;
  lateFinish?: string;
  totalFloat?: number;
  freeFloat?: number;
  isCritical?: boolean;
}

export interface RecordedDatesInfo {
  /** Per taak-id wat het bestand vastlegde. */
  times: Record<string, RecordedTime>;
  /** Aantal taken waarvan de herberekening de datums verschoof — de teller in de melding. */
  shifted: number;
  /** Aantal taken met vastgelegde datums — de noemer in de melding. */
  total: number;
}

/**
 * Leg vast wat het bestand zei. ROEP DIT AAN VÓÓR `runCPM`: de store deelt de taak-objecten met het
 * parse-resultaat, dus na de solve zijn de oorspronkelijke waarden overschreven.
 *
 * De tweelagenkeuze: `early*` telt alleen mee wanneer `recordedFields` het slot meldt; anders is
 * `schedule*` "zoals opgeslagen" — dat is het geval van issue #63, waar de exporteur alleen
 * ScheduleStart/ScheduleFinish vult.
 *
 * `shifted` blijft hier 0; die vult de aanroeper ná de solve met `countShiftedTasks`.
 *
 * `recordedFields` komt uit `ImportResult.recordedFields` (`src/services/ifc/ifcTaskSlots.ts`) —
 * de engine mag niet uit de services-laag importeren, dus dit neemt bewust het structurele
 * `Record<string, readonly string[]>` i.p.v. het `RecordedSlotKey[]`-type van die module.
 */
export function captureRecordedDates(
  tasks: Task[],
  recordedFields: Record<string, readonly string[]> | undefined,
): RecordedDatesInfo {
  const times: Record<string, RecordedTime> = {};
  if (!recordedFields) return { times, shifted: 0, total: 0 };

  for (const task of tasks) {
    const present = recordedFields[task.id];
    if (!present) continue; // taak niet uit dit bestand (of niet-IFC-import) — niets te zeggen
    const has = new Set(present);
    const t = task.time;
    times[task.id] = {
      start: has.has('earlyStart') ? t.earlyStart : t.scheduleStart,
      finish: has.has('earlyFinish') ? t.earlyFinish : t.scheduleFinish,
      lateStart: has.has('lateStart') ? t.lateStart : undefined,
      lateFinish: has.has('lateFinish') ? t.lateFinish : undefined,
      totalFloat: has.has('totalFloat') ? t.totalFloat : undefined,
      freeFloat: has.has('freeFloat') ? t.freeFloat : undefined,
      isCritical: has.has('isCritical') ? t.isCritical : undefined,
    };
  }
  return { times, shifted: 0, total: Object.keys(times).length };
}

/** Hoeveel taken kregen door de solve andere datums dan het bestand vastlegde? Roep dit aan NÁ
 *  `runCPM`, met dezelfde `times` die vóór de solve is vastgelegd. */
export function countShiftedTasks(tasks: Task[], times: Record<string, RecordedTime>): number {
  let n = 0;
  for (const task of tasks) {
    const rec = times[task.id];
    if (!rec) continue;
    if (task.time.earlyStart !== rec.start || task.time.earlyFinish !== rec.finish) n++;
  }
  return n;
}

/**
 * Bouw een `CPMResult` uit de vastlegging, zonder te solven.
 *
 * Gevuld: per-taak-resultaten, projecteinde, projectduur, gemiste deadlines, en — alléén wanneer het
 * bestand `IsCritical` gaf — het kritieke pad.
 *
 * BEWUST LEEG, want het staat niet in IFC en kan dus nooit eerlijk gevuld worden: driving-relaties
 * (de solver-docstring zegt expliciet dat die niet gepersisteerd worden), relatie-speling, afgekapte
 * leads, geschonden constraints, out-of-sequence, near-critical, float-paths, hammock-waarschuwingen.
 *
 * `totalFloat`/`freeFloat` zijn in `CPMTaskResult` verplichte getallen; ontbreken ze in het bestand,
 * dan wordt het 0. Dat is het enige punt waar deze module een getal noemt dat het bestand niet gaf —
 * de blijvende modus-strook is daar het tegengif.
 *
 * TWEE BEWUSTE SEMANTISCHE AFWIJKINGEN van `scheduleAnalysis.ts` (zichtbaar voor de gebruiker bij
 * het wisselen tussen "berekend" en "zoals opgeslagen" — hier gedocumenteerd i.p.v. gladgestreken,
 * want dichttrekken kost meer dan een paar regels):
 *  1. `projectDuration` mist de mijlpaal-alleen-uitzondering (`scheduleAnalysis.ts` rond de
 *     "anyRealWork"-check): een project dat op één dag valt zonder echt werk (uitsluitend
 *     mijlpalen) geeft daar bewust duur 0; deze reconstructie geeft in dat geval 1 (de inclusieve
 *     telling van `workDaysBetween` over een span van één dag). Zeldzaam (een IFC-bestand met
 *     uitsluitend mijlpalen en gelijke early*-datums), maar niet uitgesloten.
 *  2. `missedDeadlineTaskIds` vergelijkt hier met simpele stringvergelijking (`rec.finish >
 *     task.deadline`); de solver rekent i.p.v. daarvan met instants en met
 *     `cal.prevWorkDay(deadline)`, over de KALENDER VAN DIE TAAK (`calendarFor(task)` — niet per se
 *     de projectkalender die deze functie als enige parameter krijgt). Bij een deadline die zelf op
 *     een niet-werkdag valt kunnen de twee dus uiteenlopen; dichttrekken vraagt per-taak-kalenders
 *     die deze pure functie niet heeft (en niet zou moeten krijgen, want ze reconstrueert — ze
 *     solvet niet).
 */
export function cpmResultFromRecorded(
  info: RecordedDatesInfo,
  tasks: Task[],
  calendar: WorkCalendar,
): CPMResult {
  const out = new Map<string, CPMTaskResult>();
  const criticalPath: string[] = [];
  const missedDeadlineTaskIds: string[] = [];
  let projectEnd = '';
  let projectStart = '';

  // Geen sortering: niets stroomafwaarts (deze functie, noch een consument) leunt op de volgorde
  // van `out`/`criticalPath` — de invoervolgorde van `tasks` is dus prima. `projectStart`/`projectEnd`
  // worden hieronder toch met min/max bepaald, ongeacht iteratievolgorde.
  const recorded = tasks.filter((t) => info.times[t.id]);

  for (const task of recorded) {
    const rec = info.times[task.id];
    out.set(task.id, {
      earlyStart: rec.start,
      earlyFinish: rec.finish,
      // Geen late-datum in het bestand ⇒ gelijk aan de vroege: geen afgeleide bewering.
      lateStart: rec.lateStart ?? rec.start,
      lateFinish: rec.lateFinish ?? rec.finish,
      totalFloat: rec.totalFloat ?? 0,
      freeFloat: rec.freeFloat ?? 0,
      isCritical: rec.isCritical ?? false,
    });
    if (rec.isCritical) criticalPath.push(task.id);
    if (task.deadline && rec.finish > task.deadline) missedDeadlineTaskIds.push(task.id);
    if (!projectStart || rec.start < projectStart) projectStart = rec.start;
    if (rec.finish > projectEnd) projectEnd = rec.finish;
  }

  // Werkdagen tellen is geen solve — de kalender kan de span gewoon uitrekenen.
  let projectDuration = 0;
  if (projectStart && projectEnd) {
    // CalendarEngine neemt precies één kalender (zie zijn constructor) — de projectkalender.
    const engine = new CalendarEngine(calendar);
    // `parseInstant`, NIET `new Date(...)`: in uur-modus zijn earlyStart/earlyFinish van de vorm
    // "YYYY-MM-DDTHH:mm" ZONDER tijdzone. `new Date(...)` leest zo'n string per ES2015 als
    // LOKALE tijd, terwijl de hele engine hem als UTC leest (zie `parseInstant`-docstring in
    // dateUtils.ts) — bij een positieve offset (bv. Pacific/Auckland, UTC+12/13) verschuift de
    // dag-index en telt `workDaysBetween` een werkdag te weinig of te veel. `parseInstant`
    // deelt de UTC-aanname met de rest van de engine (date-only blijft byte-identiek: die tak
    // delegeert intern gewoon aan `parseDate`, dus ook de bestaande cases veranderen niet).
    projectDuration = engine.workDaysBetween(parseInstant(projectStart), parseInstant(projectEnd));
  }

  return {
    tasks: out,
    criticalPath,
    criticalPaths: [criticalPath],
    drivingSequenceIds: [],
    sequenceFreeFloat: {},
    truncatedLeadSequenceIds: [],
    violatedConstraintTaskIds: [],
    missedDeadlineTaskIds,
    outOfSequenceSequenceIds: [],
    nearCriticalTaskIds: [],
    floatPathByTask: {},
    hammockNoFinishDriverTaskIds: [],
    projectEnd,
    projectDuration,
  };
}
