import { parseDate, formatDate, addBusinessDays } from '@/utils/dateUtils';
import type { Task, TaskTime } from '@/types/task';

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
 * -Finish/actualDuration/remainingTime/-Minutes/resume/stop) krijgen de SLEUTEL-AANWEZIGHEID-conventie
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
    // Z12-herwerk — resume/stop, zelfde sleutel-aanwezigheid-conventie als actualStart/actualFinish
    // hierboven. Gevonden tijdens fase-2-implementatie (T14b-achtige bugklasse): deze functie
    // somt elk TaskTime-veld EXPLICIET op (geen spread), dus een nieuw optioneel veld dat hier niet
    // genoemd wordt, wordt STIL gedropt bij elke `updateTask({ time: {...} })`-aanroep — `tsc` ziet
    // dat niet (het returntype `TaskTime` staat een object toe dat een optioneel veld weglaat).
    resume: 'resume' in partial ? partial.resume : base.resume,
    stop: 'stop' in partial ? partial.stop : base.stop,
  };
}

/**
 * Z14b — edit-time-invalidatie van het GELEZEN Z8-venster (plan-Z14, "Nataken vóór Z17" punt 1;
 * EIGENAARSPRINCIPE 2026-08-18: "er gaat nooit stilzwijgend broninformatie verloren, ook niet ná
 * bewerken"). Wanneer een gebruiker een taak inhoudelijk bewerkt, mag de gelezen venster-sturing de
 * motor niet langer ankeren — maar de RAUWE bron (`Task.timephasedContours`) blijft ALTIJD staan,
 * ook ná die bewerking; alleen de AFGELEIDE sturing wordt uitgeschakeld. Deze twee functies zijn de
 * ENIGE plek die dat doet, aangeroepen vanuit `taskSlice.ts` (`updateTask`/`setTaskCalendar`),
 * `mcpTransaction.ts` (`updateTaskFields`/`patchTaskFields`/`assignResource`/`unassignResource`/
 * `moveAssignment`) en `resourceSlice.ts` (`assignResource`/`unassignResource`/`moveAssignment`) —
 * de gedocumenteerde tweeling-paden, zodat ze niet uit de pas kunnen lopen.
 *
 * SCOPE — waarom dit UITSLUITEND `timephasedFinishFloor`/`timephasedStartAnchor` raakt:
 *  - `timephasedFinishFloor` — LAAG 3, een GELEZEN, bevroren MSP-antwoord (`CPMSolver.ts`'s
 *    `timephasedFinish`, `cal.isHourMode && task.timephasedFinishFloor`-tak) — de klassieke
 *    "bevroren venster reageert niet op latere edits"-categorie. MOET invalideren.
 *  - `timephasedStartAnchor` — gebruikt door `CPMSolver.ts`'s `forwardPass` als rauw wortel-anker
 *    (`preds.length===0`-tak, `task.timephasedStartAnchor`) — ZELFDE categorie: een GELEZEN anker
 *    dat niet reageert op een latere duur-/datum-/kalenderwijziging. MOET invalideren.
 *  - `timephasedDurationWalks` — LAAG 4, expliciet GEEN gelezen antwoord: `CPMSolver.ts` wandelt
 *    `task.time.durationMinutes` (een gewoon, edit-live veld) door elke toewijzing se EIGEN
 *    resourcekalender bij ELKE `runCPM`, dus een latere bewerking stroomt AL vanzelf mee — een
 *    tweede invalidatie-pad zou geen enkel waarneembaar verschil maken (zie het veld se eigen
 *    docblok in `task.ts`, "GEEN invalidatie nodig"). NIET aanraken.
 *  - `splitGaps`/`timephasedContours` — de RAUWE bron/reeds-geconsumeerde CPM-invoer, geen "gelezen
 *    venster dat de motor ankert" in dezelfde bevroren zin; het eigenaarsprincipe eist juist dat
 *    déze blijven staan. NOOIT hier wissen.
 *
 * TRIGGERSET (plan: "duur, datums, kalender, toewijzingen") — bepaald en hier vastgelegd:
 *  - duur/datums: `time.scheduleDuration`/`durationMinutes`/`scheduleStart`/`scheduleFinish`/
 *    `durationType` — elke sleutel die de solver rechtstreeks voor de LAAG-3/4-berekening gebruikt
 *    (`durationType` telt mee omdat WORKTIME↔ELAPSEDTIME de hele kalenderwandeling omslaat).
 *  - kalender: `Task.calendarId` (bepaalt de kalender waarin het venster ooit berekend werd).
 *  - toewijzingen: resource-assign/unassign/verplaatsen (aparte aanroepplekken, zie hierboven — een
 *    ANDERE resource kan een ANDERE resourcekalender betekenen, precies de laag-4-discriminator).
 *  GEEN trigger: alles wat de solver zelf terugschrijft (earlyStart/earlyFinish/floats/…, zie
 *  `TaskTimeComputed`/`TaskTimeAnalysis` in task.ts) — F5/`runCPM`/documentwissel gaan nooit via
 *  `updateTask`/`updateTaskFields`/`patchTaskFields` (ze muteren de Immer-draft rechtstreeks), dus
 *  dat onderscheid hoeft hier niet apart bewaakt te worden.
 */
const TIMEPHASED_WINDOW_TIME_TRIGGERS = new Set<keyof TaskTime>([
  'scheduleDuration', 'durationMinutes', 'scheduleStart', 'scheduleFinish', 'durationType',
]);

/** `true` als `timeUpdate` minstens één trigger-sleutel NOEMT (sleutel-aanwezigheid, spiegelt
 *  `mergeTaskTime`'s `'veld' in partial`-conventie hierboven) — de WAARDE hoeft niet te wijzigen;
 *  een aanroeper die de volledige bestaande `time` spreadt telt dus ook mee (consistent met hoe de
 *  rest van deze module "genoemd" interpreteert, geen aparte diff-tracking). */
export function timeUpdateTouchesTimephasedWindow(timeUpdate: Partial<TaskTime> | undefined): boolean {
  if (!timeUpdate) return false;
  return Object.keys(timeUpdate).some((k) => TIMEPHASED_WINDOW_TIME_TRIGGERS.has(k as keyof TaskTime));
}

/** Wist `timephasedFinishFloor`/`timephasedStartAnchor` als ze gezet zijn — idempotent, geen effect
 *  op een taak zonder Z8-venster. Muteert `task` in-place (Immer-draft-stijl, spiegelt de rest van
 *  taskSlice.ts/mcpTransaction.ts). */
export function clearTimephasedWindow(task: Task): void {
  if (task.timephasedFinishFloor !== undefined) delete task.timephasedFinishFloor;
  if (task.timephasedStartAnchor !== undefined) delete task.timephasedStartAnchor;
}
