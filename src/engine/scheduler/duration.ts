import type { Task, TaskSplitGap } from '@/types/task';

/**
 * Gedeelde duur-resolutie-helpers (fase 2.8b, ontwerpdoc §3.1).
 *
 * PLAATSING: het ontwerpdoc beschrijft deze helpers onder §3.1 ("src/types/task.ts") maar hun
 * tweede argument is de effectieve KALENDER-ENGINE (`isHourMode`/`hoursPerDay`), die in
 * `src/engine/scheduler` leeft. Ze in `src/types` zetten zou een types→engine-afhankelijkheid
 * introduceren; de golf-0-tabel (§10, rij G0) noemt bovendien geen helper-bestand. Daarom leven
 * ze hier, naast `CalendarEngine`/`CPMSolver` — de enige aanroepers (golf 1/2), conform de
 * expliciete fallback in de golf-0-opdracht.
 *
 * FORWARD-COMPAT: het argument is getypeerd als het minimale structurele contract
 * `DurationCalendar` ({ isHourMode, hoursPerDay }). Golf 1 laat `CalendarEngine` dit contract
 * vervullen (het krijgt daar `isHourMode`); tot die tijd is de helper testbaar met een plain
 * object, en roept nog niemand hem aan (geen gedragswijziging in golf 0).
 */

/**
 * T15 (mijlpaal-met-duur, §9/O1) / H3 (Opus-review T15-iteratie-2, gedeeld getrokken uit
 * CPMSolver.ts): MS Projects `isMilestone`-vlag is een WEERGAVEmarkering die onafhankelijk van de
 * opgeslagen duur gezet kan worden ("Markeer taak als mijlpaal" in Taakinformatie) — MSP's eigen
 * rekenkern plant zo'n taak gewoon volgens haar eigen duur, ze klapt NIET stil om naar 0. Bewijs:
 * `mpp14task.mpp`/`mpp14task-from2013.mpp` (MSO-taak, `isMilestone=true`, duur 5 dagen — MSP-finish
 * = start + 5 werkdagen) en `taskFlags-mpp14Project2010/2013.mpp` ("Milestone: Yes", duur 8 dagen,
 * zelfde patroon) — vier publieke MPXJ-testfixtures. Alleen een taak met duur 0 is voor de PLANNING
 * een echte mijlpaal.
 *
 * H3 verplaatste deze helper van `CPMSolver.ts` naar hier (in plaats van 'm daar te laten en
 * `relationMath.ts` ernaar te laten importeren): `relationMath.ts` heeft ZIJN EIGEN kale
 * `isMilestone`-checks (`succElapsed`/`predElapsed`/`predIsMilestone`/`succIsFinishMs`/
 * `succIsStartMs`) die dezelfde bug droegen (msp-30/msp-31-mutatiebewijs: een ELAPSEDTIME-taak die
 * ÓÓK `milestone:true` + een reële duur draagt, kreeg via `relationMath.ts` een dag verschoven
 * resultaat t.o.v. de niet-mijlpaal-controlevariant) — maar `CPMSolver.ts` importeert zelf al UIT
 * `relationMath.ts` (`forwardConstraint`/`backwardConstraint`), dus een import de andere kant op zou
 * een cyclus zijn. `duration.ts` is voor beide bestanden al een blaadje (geen afhankelijkheid naar
 * `CPMSolver`/`relationMath`), dus hier kan de EEN definitie zonder cyclus door beide gedeeld worden.
 */
export function isZeroDurationMilestone(task: Task): boolean {
  return task.isMilestone && task.time.scheduleDuration === 0;
}

/** Minimaal contract dat een uur-bewuste kalender-engine vervult (golf 1). */
export interface DurationCalendar {
  /** True ⇒ uur-kalender (`WorkCalendar.workTime` aanwezig); false ⇒ dag-kalender. */
  readonly isHourMode: boolean;
  /** Netto werkuren per dag; de dag↔minuut-factor is `hoursPerDay × 60`. */
  readonly hoursPerDay: number;
}

/**
 * Duur van een taak in integer MINUTEN, in de effectieve kalender.
 *
 * - Uur-kalender: `durationMinutes` is bron van waarheid indien aanwezig; anders (naakt getal =
 *   werkdagen, Bevinding 10) afgeleid als `scheduleDuration × hoursPerDay × 60`.
 * - Dag-kalender: er bestaat geen sub-dag-duur; de synthetische dag = `hoursPerDay × 60` min
 *   (§2.3, voor gemengde projecten), dus `scheduleDuration × hoursPerDay × 60`.
 */
export function durationMinutesOf(task: Task, effCal: DurationCalendar): number {
  if (effCal.isHourMode) {
    const dm = task.time.durationMinutes;
    if (dm != null) return dm;
  }
  return task.time.scheduleDuration * effCal.hoursPerDay * 60;
}

/**
 * Duur van een taak in eigen-kalender-WERKDAGEN (mogelijk fractioneel in uur-modus).
 *
 * INVARIANT (Bevinding 2, §3.1): `durationMinutes` wordt UITSLUITEND op een uur-kalender
 * gehonoreerd. Op een dag-kalender — of op een uur-kalender zónder `durationMinutes` — valt de
 * helper ALTIJD terug op `scheduleDuration`; er belandt dus nooit een fractionele dag
 * (`durationMinutes / (hpd×60)`) in de integer-dag-lus `addWorkDays`.
 */
export function durationDaysOf(task: Task, effCal: DurationCalendar): number {
  if (effCal.isHourMode && task.time.durationMinutes != null) {
    return task.time.durationMinutes / (effCal.hoursPerDay * 60);
  }
  return task.time.scheduleDuration;
}

// ─────────────────────────────────────────────────────────────────────────────────────────────
// T8 — ELAPSEDTIME rekent 24/7 in KLOK-tijd, niet in werktijd. Precedent: `resolveElapsedMinutes`
// + de `lagUnit === 'ELAPSEDTIME'`-takken in `relationMath.ts` doen exact dit al voor relatie-lags
// (kale Date-rekenkunde, geen kalenderband-toetsing) — dit is dezelfde semantiek toegepast op
// taakDUUR i.p.v. lag. GEEN tweede variant: `MS_PER_MIN` hieronder is bewust dezelfde constante
// als `relationMath.ts` exporteert (lokaal gedupliceerd i.p.v. geïmporteerd, want duration.ts is
// een blaadmodule zonder afhankelijkheid op relationMath — zie de moduleheader hierboven).
// ─────────────────────────────────────────────────────────────────────────────────────────────
const MS_PER_MIN = 60_000;
// T8-review M3 — zonder klem geeft een absurde ELAPSEDTIME-duur (via MCP `duration`, een corrupt
// bestand, of gewoon een tikfout — een taak-duur is invoer, niet gevalideerd tot hier) een
// `new Date(...)` buiten JS's representeerbare bereik (±8.64e15 ms rond epoch). `new Date()` zelf
// gooit dan niet (levert stil een Invalid Date), maar élke `formatDate`/`formatInstant` erop
// (`.toISOString()`, overal in deze solver) gooit een ONGEVANGEN RangeError — een crash diep in de
// forward/backward-pass zonder duidelijke herkomst. `MAX_ELAPSED_MINUTES` spiegelt
// `CalendarEngine.MAX_DAYS` (200.000 dagen ≈ 547 jaar, ruim boven elk plausibel bouwproject) × 24×60
// — dezelfde beproefde bovengrens, geen derde losse magic number — en de klem-PLAATS spiegelt
// `CalendarEngine.addWorkMinutes` (`Math.min(minutes, MAX_MINUTES)`, vlak vóór de Date-rekenkunde).
const MAX_ELAPSED_MINUTES = 200_000 * 24 * 60;

/** Klem `minutes` op `±MAX_ELAPSED_MINUTES`; NaN/Infinity (kapotte invoer) ⇒ 0 (no-op, nooit een
 *  gecrashte Date i.p.v. een stille verkeerde). */
function clampElapsedMinutes(minutes: number): number {
  if (!Number.isFinite(minutes)) return 0;
  if (minutes > MAX_ELAPSED_MINUTES) return MAX_ELAPSED_MINUTES;
  if (minutes < -MAX_ELAPSED_MINUTES) return -MAX_ELAPSED_MINUTES;
  return minutes;
}

/**
 * Duur van een ELAPSEDTIME-taak in KLOK-minuten (24/7).
 *
 * - Uur-kalender: `durationMinutes` is al klok-tijd-neutraal (T10-scoping in `mppReader.ts`: dat
 *   veld is `raw.durationRaw / 10` ONGEACHT WORKTIME/ELAPSEDTIME — "een minuut is een minuut") —
 *   direct bruikbaar, geen omrekening nodig.
 * - Dag-kalender (of uur-kalender zónder `durationMinutes`, bv. een via MCP gezette taak):
 *   `scheduleDuration` is voor ELAPSEDTIME het aantal KALENDERdagen (`mppReader.ts` zet dit al zo:
 *   `raw.durationRaw / (24 × 60 × 10)`) × 24 × 60 — de VASTE klokdag, NOOIT `hoursPerDay` (dat zou
 *   de T10-dubbele-deling-valkuil zijn, hier toegepast op duur i.p.v. op de leeskant).
 */
export function elapsedMinutesOf(task: Task, effCal: DurationCalendar): number {
  if (effCal.isHourMode) {
    const dm = task.time.durationMinutes;
    if (dm != null) return dm;
  }
  return task.time.scheduleDuration * 24 * 60;
}

/** Tel `minutes` KLOK-minuten op bij `start` (24/7, geen kalenderband-toetsing) — de
 *  ELAPSEDTIME-tegenhanger van `CalendarEngine.addWorkMinutes`/`addWorkDaysChecked`. Geklemd
 *  (M3, T8-review): zie `MAX_ELAPSED_MINUTES` hierboven. */
export function addElapsedMinutes(start: Date, minutes: number): Date {
  return new Date(start.getTime() + clampElapsedMinutes(minutes) * MS_PER_MIN);
}

/** Trek `minutes` KLOK-minuten af van `end` (24/7, spiegel van `addElapsedMinutes`) — de
 *  ELAPSEDTIME-tegenhanger van `CalendarEngine.subtractWorkMinutes`/`subtractWorkDays`. Geklemd
 *  (M3, T8-review): zie `MAX_ELAPSED_MINUTES` hierboven. */
export function subtractElapsedMinutes(end: Date, minutes: number): Date {
  return new Date(end.getTime() - clampElapsedMinutes(minutes) * MS_PER_MIN);
}

/**
 * Getekend KLOK-span van `a` naar `b`, in eigen-kalender-DAGEN (fractioneel mogelijk) — de
 * ELAPSEDTIME-tegenhanger van `CPMSolver.signedWorkDays`/`workMinutesBetween÷(hoursPerDay×60)`
 * voor float-rekenwerk (§5.5).
 *
 * BEVINDING (T8, msp-14-mutatiebewijs): een ELAPSEDTIME-taak mag zijn ES/EF op een NIET-werkdag
 * hebben (dat is het hele punt van 24/7) — iets wat een WORKTIME-taak per constructie nooit
 * overkomt. `signedWorkDays`s `workDaysBetween(a,a) − 1` gaat daarop STUK: op een niet-werkdag
 * telt `workDaysBetween` 0 werkdagen, dus een taak met LS=ES/LF=EF (geen enkele speling-oorzaak)
 * kreeg tóch tf=−1 — spookspeling, puur omdat de klassieke WORKTIME-tel-conventie (inclusieve
 * werkdag-telling) een niet-werkdag niet kan representeren. Deze functie rekent daarom met de
 * RUWE klok-ms-afstand — geen werkdag-telling, geen inclusieve −1-correctie (die correctie hoort
 * bij WORKTIMEs "dag 1 telt al mee"-conventie, niet bij een kale kloktijd-spanne) — zodat a===b
 * altijd exact 0 geeft, ongeacht welke dag van de week dat is. `effCal.isHourMode` doet hier NIET
 * ter zake voor de rekenkunde zelf (§L2, T8-review): een klokdag is altijd 24×60×`MS_PER_MIN`,
 * of de kalender nu uur- of dag-precisie kent — het `DurationCalendar`-argument staat er puur om
 * dezelfde aanroepvorm te delen met `durationMinutesOf`/`durationDaysOf` (die dat verschil wél
 * nodig hebben, via `hoursPerDay`).
 *
 * EENHEDENBESLUIT (T8-review M1, orkestratorbesluit — 2026-08-17, herformulering T8-hercheck 2):
 * een ELAPSEDTIME-taak rapporteert `tf`/`ff` dus in KALENDERdagen, ONGEMARKEERD naast WORKTIME-
 * taken in dezelfde `tf`/`ff`-velden (die in WERKdagen rekenen, `signedWorkDays`). Onderzocht vóór
 * dit besluit: de lokale MPXJ-broncheckout onder `testdata-crawl/mpxj` bevat alleen de
 * `SlackCalculator`-INTERFACE (`org.mpxj.SlackCalculator`), zonder een MSP-implementatie (`org.
 * mpxj.cpm.MicrosoftSlackCalculator` — de klasse die MS Projects "Total Slack" daadwerkelijk
 * berekent — bestaat niet in deze checkout; wel aanwezig: Primavera-slackcode) — geen uitsluitsel
 * over wélke eenheid MSP zelf toont voor een elapsed-taak. Wel bevestigd (`TimeUnit.java`): MPXJ's
 * `Duration`-model kent
 * native `ELAPSED_DAYS`/`ELAPSED_HOURS`/… als aparte eenheden náást `DAYS`/`HOURS` — een per-taak
 * eenheid voor duur (en dus impliciet voor afgeleide velden als slack) is dus een bestaand MPXJ-
 * concept, geen verzinsel van dit project. Bij ontbrekend uitsluitsel: per-taak-semantiek behouden
 * (consistent met hoe `scheduleDuration` al vóór T8 werkte — ook daar bepaalt de taak zijn eigen
 * eenheid). Gepind in `cases-msp-pariteit.json` (`msp-21-t8-review-m1-eenheden-float`): een
 * ELAPSEDTIME-taak en een WORKTIME-sibling onder dezelfde FS-sink krijgen zichtbaar verschillende
 * getallen (kalenderdagen resp. werkdagen) — en binnen ÉÉN taak wijkt `tf` (kalenderdagen, deze
 * functie) zelfs af van `ff` (nog werkdag-geteld, zie M2/L3-beperking bij de relFloat-regel in
 * `scheduleAnalysis.ts`). Toekomstig werk dat dit wil markeren (bv. een `floatUnit`-veld) is een
 * plan-notitie, geen T8-scope.
 */
export function signedElapsedSpan(a: Date, b: Date, effCal: DurationCalendar): number {
  void effCal;
  return (b.getTime() - a.getTime()) / (24 * 60 * MS_PER_MIN);
}

// ─────────────────────────────────────────────────────────────────────────────────────────────
// Z7 (etappe "nul afwijkingen") — SPLITGAPS in de duur-optelling. Canonieke regel (plan-§Z7,
// letterlijk): "de finish is de start plus de duur, waarbij elk gat als extra niet-werktijd telt
// op zijn eigen offset" — een UITBREIDING van de duur-optelling, GEEN tweede algoritme.
//
// WAAROM EEN FLAT SOM VOLSTAAT (bewezen, niet aangenomen): `mppTimephased.ts`'s moduleheader
// documenteert de VERPLICHTE meetstap op `mpxj/junit/data/mpp14splittask.mpp` (Z4/Z0) —
// `CalendarEngine.addWorkMinutes(start, duur + Σgat.gapMinutes)` reproduceert MSP's eigen
// opgeslagen FINISH byte-exact voor beide taken in dat bestand (1 resp. 2 gaten, uur-modus).
// `addWorkMinutes`/`addWorkDaysChecked` zijn zuivere TEL-functies over een vaste startdatum: het
// AANTAL geconsumeerde werk-eenheden bepaalt de aankomstdatum, niet hoe dat aantal is opgebouwd
// (segment-voor-segment vs. in één keer) — vandaar dat CPMSolver.ts's vier aangrijpingspunten
// nergens een tweede, positie-wandelende algoritme nodig hebben: één extra term bovenop de
// bestaande duur-optelling volstaat overal.
//
// WAAROM TOCH EEN VENSTER (en geen kale `task.splitGaps`-som): de positie doet er wél toe zodra
// niet de VOLLEDIGE duur wordt geteld — het IN-PROGRESS-restwerk (CPMSolver.ts's tweede
// aangrijpingspunt) telt alleen het venster ná het reeds-afgewerkte deel. Een gat dat vóór dat
// punt ligt (in het voltooide deel) hoort niet nog eens bij het restwerk opgeteld te worden — dat
// zou de finish onterecht verder optrekken. `splitGapMinutesInWindow` is daarom de ENE gedeelde
// vensterfunctie die alle vier aangrijpingspunten aanroepen: voor de volledige-duur-aanroepen is
// het venster `[0, totale duur)` (alle gaten tellen), voor het restwerk `[reeds-afgewerkt, totale
// duur)`.
// ─────────────────────────────────────────────────────────────────────────────────────────────

/**
 * Som van de `TaskSplitGap`-werkminuten die overlappen met het halfopen werkminuten-venster
 * `[windowStartMinutes, windowEndMinutes)`. Offsets zijn ALTIJD relatief aan de TAAKSTART
 * (`TaskSplitGap.afterMinutes`s eigen contract, zie `src/types/task.ts`) — nooit aan
 * `windowStartMinutes` zelf; "elk gat telt op zijn eigen offset" (plan-§Z7).
 *
 * Overlap i.p.v. een kale `afterMinutes >= windowStart`-filter: een gat kan in theorie een
 * venstergrens middenin overlappen (de afgewerkt/restwerk-grens valt binnen een gat) — dan telt
 * alleen het deel ná die grens mee voor het restwerk-venster.
 *
 * Defensief geklemd (`splitGaps` is afgeleide data, geen rechtstreeks-uit-bytes-gelezen veld met
 * een eigen klem elders — maar een corrupt of hostiel document, bv. via MCP of een handgemaakte
 * IFC/JSON-import, kan in theorie een niet-eindig of negatief-lengte gat dragen): NaN/Infinity of
 * `gapMinutes <= 0` draagt nooit bij, nooit een negatieve of oneindige bijdrage aan de duur.
 */
export function splitGapMinutesInWindow(
  gaps: readonly TaskSplitGap[] | undefined, windowStartMinutes: number, windowEndMinutes: number,
): number {
  if (!gaps || gaps.length === 0) return 0;
  if (!(windowEndMinutes > windowStartMinutes)) return 0;
  let total = 0;
  for (const g of gaps) {
    if (!Number.isFinite(g.afterMinutes) || !Number.isFinite(g.gapMinutes) || g.gapMinutes <= 0) continue;
    const gapStart = g.afterMinutes;
    const gapEnd = g.afterMinutes + g.gapMinutes;
    const overlapStart = Math.max(gapStart, windowStartMinutes);
    const overlapEnd = Math.min(gapEnd, windowEndMinutes);
    if (overlapEnd > overlapStart) total += overlapEnd - overlapStart;
  }
  return total;
}

/** `splitGapMinutesInWindow` omgerekend naar eigen-kalender-WERKDAGEN (dag-modus-aanroepers) —
 *  dezelfde `minuten / (hoursPerDay×60)`-omrekening als `durationDaysOf`/`elapsedMinutesOf`
 *  hierboven, zodat er geen tweede eenhedenconventie ontstaat. */
export function splitGapDaysInWindow(
  gaps: readonly TaskSplitGap[] | undefined, windowStartMinutes: number, windowEndMinutes: number,
  effCal: DurationCalendar,
): number {
  return splitGapMinutesInWindow(gaps, windowStartMinutes, windowEndMinutes) / (effCal.hoursPerDay * 60);
}
