import type { Task } from '@/types/task';
import type { WorkCalendar } from '@/types/calendar';
import type { CPMResult } from './CPMSolver';
import { effectiveCalendarOf } from '@/utils/taskDuration';
import { isHourCalendar } from '@/services/subdayIo';
import { parseInstant, formatInstant } from '@/utils/dateUtils';

/**
 * Schrijf een CPM-resultaat terug op de taken: per blad de berekende velden, daarna de
 * verzameltaak-rollup.
 *
 * Waarom dit een eigen module is (K-item 30). Deze logica stond twee keer: in `runCPM`
 * (`scheduleSlice`) en nog een keer in `src/services/benchmark/runner.ts`, met een comment die
 * toegaf dat het een kopie was. Die kopie wás al gedivergeerd — hij miste `interferingFloat`,
 * `isNearCritical`, `floatPath`, de late-datum-rollup, de min-over-kinderen voor
 * `totalFloat`/`freeFloat` én de uur-modus-normalisatie. Gevolg: de benchmark mat niet meer wat de
 * app doet, en dat is precies het soort meting waar je beslissingen op baseert.
 *
 * Muteert de meegegeven taken in-place. Werkt zowel op een gewone array als op een Immer-draft
 * (`s.tasks`): de elementen blijven dezelfde proxies, dus `task.time.x = …` gedraagt zich identiek.
 */
export interface ApplyCpmCalendars {
  /** De projectkalender (fallback wanneer een taak geen eigen kalender heeft). */
  projectCalendar: WorkCalendar;
  /** De gedeelde kalenderbibliotheek, voor `task.calendarId`. */
  calendars: WorkCalendar[];
}

export function applyCpmResult(tasks: Task[], result: CPMResult, cals: ApplyCpmCalendars): void {
  for (const task of tasks) {
    const r = result.tasks.get(task.id);
    if (!r) continue;
    task.time.earlyStart = r.earlyStart;
    task.time.earlyFinish = r.earlyFinish;
    task.time.lateStart = r.lateStart;
    task.time.lateFinish = r.lateFinish;
    task.time.totalFloat = r.totalFloat;
    task.time.freeFloat = r.freeFloat;
    task.time.isCritical = r.isCritical;
    // Fase 2.9 golf 2 (§4.6): analyse-afleidingen. `interferingFloat` is ALTIJD aanwezig (tf−ff);
    // `isNearCritical`/`floatPath` alleen wanneer de bijbehorende optie draait — afwezig ⇒ het veld
    // wordt gewist (zodat een uitgezette optie geen stale markering laat staan).
    task.time.interferingFloat = r.interferingFloat;
    task.time.isNearCritical = r.isNearCritical !== undefined ? r.isNearCritical : undefined;
    task.time.floatPath = r.floatPath !== undefined ? r.floatPath : undefined;
    // BEWUST GEEN scheduleStart-ANKER-drift: scheduleStart is het GEPLANDE anker (waarop de
    // forward-pass voortbouwt, `CPMSolver` snapt hierop) en mag NIET de berekende earlyStart
    // worden — anders bleef een taak na het verwijderen van een relatie op z'n gedrifte datum
    // hangen. De berekende planning leeft in earlyStart/earlyFinish; weergave/export gebruikt
    // `earlyStart || scheduleStart`.
    //
    // UUR-MODUS (fase 2.8b, FIX golf, §2.4): scheduleStart/scheduleFinish moeten wél een
    // datetime-representatie dragen i.p.v. date-only/verouderd te blijven. scheduleFinish volgt de
    // berekende finish (geen anker ⇒ veilig; nooit meer stale na een duur-wijziging); scheduleStart
    // houdt zijn ANKER-instant maar wordt idempotent naar de datetime-vorm genormaliseerd
    // (parseInstant→formatInstant('hour') verandert de instant niet, dus geen drift). Dag-taken
    // blijven ONGEMOEID ⇒ byte-identiek (`formatDate`, verify:examples).
    const effCal = effectiveCalendarOf(task, cals.projectCalendar, cals.calendars);
    if (isHourCalendar(effCal)) {
      task.time.scheduleFinish = r.earlyFinish;
      task.time.scheduleStart = formatInstant(parseInstant(task.time.scheduleStart), 'hour');
    }
  }

  // Verzameltaken: datums oprollen uit de kinderen.
  // A4 (prestatie): één vooraf gebouwde id→taak-Map i.p.v. `find` per taak én per kind (recursief) —
  // dat was O(n²) op de rollup.
  const byId = new Map<string, Task>(tasks.map(t => [t.id, t]));
  const updateSummary = (taskId: string): void => {
    const task = byId.get(taskId);
    if (!task || task.childIds.length === 0) return;

    for (const childId of task.childIds) updateSummary(childId);

    const children = task.childIds
      .map(cid => byId.get(cid))
      .filter(Boolean) as Task[];

    if (children.length > 0) {
      const starts = children.map(c => c.time.earlyStart).sort();
      const finishes = children.map(c => c.time.earlyFinish).sort();
      task.time.earlyStart = starts[0];
      task.time.earlyFinish = finishes[finishes.length - 1];
      task.time.isCritical = children.some(c => c.time.isCritical);

      // Ook de LATE datums en speling oprollen — anders bleven die op de
      // createDefaultTaskTime-defaults staan (lf=es, tf=0) en schreef o.a. ifcWriter misleidende
      // fase-speling weg (een niet-kritieke fase met "tf=0").
      const lateStarts = children.map(c => c.time.lateStart).sort();
      const lateFinishes = children.map(c => c.time.lateFinish).sort();
      task.time.lateStart = lateStarts[0];
      task.time.lateFinish = lateFinishes[lateFinishes.length - 1];
      // Een verzameltaak kan maar zo veel opschuiven als zijn krapste kind: min over de kinderen.
      task.time.totalFloat = Math.min(...children.map(c => c.time.totalFloat));
      task.time.freeFloat = Math.min(...children.map(c => c.time.freeFloat));
      // Interfererende speling op de samenvatting = tf−ff (fase 2.9 golf 2, §4.6) — houdt de
      // invariant ook op verzameltaken en vult de kolom voor WBS-rijen.
      task.time.interferingFloat = task.time.totalFloat - task.time.freeFloat;
    }
  };

  for (const task of tasks) {
    if (!task.parentId) updateSummary(task.id);
  }
}
