import type { Task } from '@/types/task';

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
 *  ELAPSEDTIME-tegenhanger van `CalendarEngine.addWorkMinutes`/`addWorkDaysChecked`. */
export function addElapsedMinutes(start: Date, minutes: number): Date {
  return new Date(start.getTime() + minutes * MS_PER_MIN);
}

/** Trek `minutes` KLOK-minuten af van `end` (24/7, spiegel van `addElapsedMinutes`) — de
 *  ELAPSEDTIME-tegenhanger van `CalendarEngine.subtractWorkMinutes`/`subtractWorkDays`. */
export function subtractElapsedMinutes(end: Date, minutes: number): Date {
  return new Date(end.getTime() - minutes * MS_PER_MIN);
}

/**
 * Getekend KLOK-span van `a` naar `b`, in eigen-kalender-DAGEN (fractioneel in uur-modus) — de
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
 * altijd exact 0 geeft, ongeacht welke dag van de week dat is.
 */
export function signedElapsedSpan(a: Date, b: Date, effCal: DurationCalendar): number {
  const ms = b.getTime() - a.getTime();
  return effCal.isHourMode ? ms / MS_PER_MIN / (24 * 60) : ms / (24 * 60 * MS_PER_MIN);
}
