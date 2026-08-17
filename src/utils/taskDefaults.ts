import { parseDate, formatDate, addBusinessDays } from '@/utils/dateUtils';
import type { TaskTime } from '@/types/task';

/**
 * Fabrieksfunctie voor een verse {@link TaskTime}. Leeft in de utils-laag (niet in `src/types/`)
 * omdat ze datum-helpers als WAARDE nodig heeft — `src/types/` blijft zo puur (alleen types).
 */
export function createDefaultTaskTime(
  start: string,
  durationDays: number,
): TaskTime {
  // Derive a finish consistent with the duration so the Gantt bar spans the
  // right number of days before CPM runs. Matches CalendarEngine.addWorkDays
  // (inclusive, weekends skipped); runCPM later refines it with the full calendar.
  // Bij een onparseerbare start (bv. corrupte import) NIET formatteren — formatDate
  // (toISOString) gooit dan. Val terug op `start`; de CPM-solver vangt de ongeldige
  // datum verderop af met een nette foutmelding i.p.v. een crash.
  const startDate = parseDate(start);
  const finish =
    durationDays > 0 && !isNaN(startDate.getTime())
      ? formatDate(addBusinessDays(startDate, durationDays))
      : start;
  return {
    durationType: 'WORKTIME',
    scheduleDuration: durationDays,
    scheduleStart: start,
    scheduleFinish: finish,
    earlyStart: start,
    earlyFinish: finish,
    lateStart: start,
    lateFinish: finish,
    freeFloat: 0,
    totalFloat: 0,
    isCritical: false,
    completion: 0,
  };
}

/**
 * T14b (gebruikstestbevinding, ernst hoog): `addTask` accepteert een meegegeven `partial.time` als
 * TYPE `TaskTime` (volledig), maar callers buiten de TS-typechecker (de extensie-sandbox draait
 * ongetypeerde `new Function`-code; MCP-tool-payloads worden alleen tegen JSON-schema gevalideerd,
 * niet tegen deze interface) kunnen op RUNTIME best een onvolledig object opsturen. Vóór deze fix
 * gebruikten `taskSlice.addTask` en `mcpTransaction.ts`'s `draft.addTask` domweg
 * `partial.time || createDefaultTaskTime(...)` — een meegegeven-maar-onvolledig object werd
 * ONGEWIJZIGD gebruikt, dus een ontbrekend `completion` bleef `undefined` tot de eerstvolgende
 * `writeIFC` crashte op `time.completion.toFixed(1)` (`src/services/ifc/ifcTaskSlots.ts`) — dat trof
 * auto-save, Opslaan/Opslaan-als én `planner_export_ifc` in één keer.
 *
 * **Twee aanroepsituaties, één functie — de `base` bepaalt het verschil:**
 *  - ADD (`taskSlice.addTask`, `mcpTransaction.draft.addTask`): `base` = een VERSE
 *    `createDefaultTaskTime(...)`. Er is nog geen bestaande taak, dus "ontbrekend ⇒ default" is
 *    ondubbelzinnig juist.
 *  - UPDATE (`taskSlice.updateTask`, T14b-vervolg — gebruikstestbevinding "partiële time-update wist
 *    bestaande waarden"): `base` = de BESTAANDE `time` van de taak, NOOIT een verse default. Een
 *    `Object.assign(task, { time: partial })` verving voorheen de HELE `time`-tak: een aanroeper die
 *    alleen `scheduleStart` wilde bijwerken (bv. via de publieke `api.data.updateTask`, waar
 *    `ExtTaskTime` z'n eigen `Required<>`-belofte op runtime niet afdwingt) wiste zo stil
 *    `completion`/`freeFloat`/`totalFloat`/etc. — dezelfde schadeklasse als de ADD-bug, alleen ipv.
 *    een crash een STILLE dataverlies.
 *
 * **Verplichte velden** (nooit `undefined` op `TaskTime`: durationType/scheduleDuration/
 * scheduleStart/scheduleFinish/early-/lateStart/-Finish/freeFloat/totalFloat/isCritical/completion)
 * krijgen de terugval-merge (`??`, dus expliciete `false`/`0` blijven staan).
 *
 * **Optionele velden** (durationMinutes/interferingFloat/isNearCritical/floatPath/actualStart/
 * -Finish/actualDuration/remainingTime/-Minutes) krijgen de SLEUTEL-AANWEZIGHEID-conventie
 * (spec-review-fixronde 2026-08-17 — de eerdere "altijd 1-op-1 uit `partial`" bleek zelf een gat: een
 * partiële update die alleen `scheduleStart` noemde, wiste zo alsnog `durationMinutes`/`actualStart`/
 * `remainingTime`/etc., want die stonden simpelweg niet in `partial` — exact dezelfde schadeklasse als
 * de bug die deze hele helper moest dichten):
 *   - `'veld' in partial` **false** (de sleutel komt niet voor in het object) ⇒ AANROEPER NOEMDE HET
 *     NIET ⇒ behoud `base.veld` (de bestaande waarde bij UPDATE; bij ADD toch altijd `undefined`, want
 *     de verse default zet deze velden nooit).
 *   - `'veld' in partial` **true**, ook als de waarde `undefined` is ⇒ BEWUSTE CLEAR ⇒ neem
 *     `partial.veld` over (dus `undefined`). Dit is de vorm die `TaskDialog.tsx` nu gebruikt
 *     (`time.durationMinutes = undefined`, NIET `delete time.durationMinutes` — een `delete` verwijdert
 *     de sleutel weer en zou hier ONDERWEG naar `updateTask` alsnog als "niet genoemd" gelezen worden).
 * Dit is de enige manier waarop JS/TS "bewust gewist" van "nooit genoemd" kán onderscheiden — beide
 * zien er identiek uit zodra je alleen naar de WAARDE kijkt (`??`), dus de eerdere `??`-vorm voor
 * optionele velden kon de twee wensen fundamenteel niet uit elkaar houden. Voor ADD is dit
 * gedragsgelijk aan de vorige versie (de default zet deze velden nooit, dus `base.veld` is toch altijd
 * `undefined`); voor UPDATE is dit nu de correcte oplossing voor BEIDE wensen tegelijk (bestaande
 * optionele waarden overleven een partiële update, én een bewuste clear via `= undefined` werkt nog
 * steeds) — de eerdere docstring noemde dit ten onrechte "onverenigbaar".
 */
export function mergeTaskTime(base: TaskTime, partial: Partial<TaskTime> | undefined): TaskTime {
  if (!partial) return base;
  return {
    durationType: partial.durationType ?? base.durationType,
    scheduleDuration: partial.scheduleDuration ?? base.scheduleDuration,
    scheduleStart: partial.scheduleStart ?? base.scheduleStart,
    scheduleFinish: partial.scheduleFinish ?? base.scheduleFinish,
    earlyStart: partial.earlyStart ?? base.earlyStart,
    earlyFinish: partial.earlyFinish ?? base.earlyFinish,
    lateStart: partial.lateStart ?? base.lateStart,
    lateFinish: partial.lateFinish ?? base.lateFinish,
    freeFloat: partial.freeFloat ?? base.freeFloat,
    totalFloat: partial.totalFloat ?? base.totalFloat,
    isCritical: partial.isCritical ?? base.isCritical,
    completion: partial.completion ?? base.completion,
    // Optioneel — sleutel-aanwezigheid, zie docstring hierboven ('in' i.p.v. '??').
    durationMinutes: 'durationMinutes' in partial ? partial.durationMinutes : base.durationMinutes,
    interferingFloat: 'interferingFloat' in partial ? partial.interferingFloat : base.interferingFloat,
    isNearCritical: 'isNearCritical' in partial ? partial.isNearCritical : base.isNearCritical,
    floatPath: 'floatPath' in partial ? partial.floatPath : base.floatPath,
    actualStart: 'actualStart' in partial ? partial.actualStart : base.actualStart,
    actualFinish: 'actualFinish' in partial ? partial.actualFinish : base.actualFinish,
    actualDuration: 'actualDuration' in partial ? partial.actualDuration : base.actualDuration,
    remainingTime: 'remainingTime' in partial ? partial.remainingTime : base.remainingTime,
    remainingMinutes: 'remainingMinutes' in partial ? partial.remainingMinutes : base.remainingMinutes,
  };
}
