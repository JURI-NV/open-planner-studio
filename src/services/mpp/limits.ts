/**
 * Native MPP14-lezer (MS Project 2010–2021), alleen-lezen.
 * Afgeleid van de MPXJ-broncode (https://github.com/joniles/mpxj, © Jon Iles e.a.,
 * LGPL-2.1) — structuurkennis en veldconstanten geport naar TypeScript voor
 * Open Planner Studio (LGPL-3.0).
 *
 * T6-kwaliteitsreview (minor M4) — gedeelde harding-klemmen als BLADMODULE: importeert bewust NIETS
 * uit `mppReader.ts`/`mppCalendars.ts` (patroon `src/state/slices/defaults.ts`: een bladmodule mag
 * nooit terug-importeren uit de modules die HEM importeren, anders ontstaat de cyclus die
 * `verify:cycles` bewaakt). Vóór deze module hielden `mppReader.ts` en `mppCalendars.ts` elk hun
 * EIGEN kopie van `MAX_VAR_TEXT_BYTES` aan (letterlijk dezelfde waarde, met commentaar dat uitlegde
 * waarom een gedeelde import niet kon) — deze module lost dat structureel op: beide importeren nu
 * DEZELFDE constante.
 */

/**
 * I1-stijl klem (T5-kwaliteitsreview) — begrenst het scan-/decodeerwerk van `getUnicodeString`
 * (taaknamen, WBS-tekst, kalendernamen, uitzonderingsnamen, …) tegen een gedeelde, gededupliceerde
 * var-data-offset (zie Var2Data's moduleheader in `mppPrimitives.ts`): meerdere unique-ID's kunnen
 * naar DEZELFDE grote string wijzen, dus zonder bovengrens kost het uitlezen ervan O(werkelijke
 * lengte) PER verwijzing. 64 KiB is ruim boven elke realistische naam/tekst in het corpus (dat blijft
 * ver onder 1 KB), maar begrenst een geprepareerd bestand hard. Zie `mppReader.ts`'s I1-toelichting
 * (`readTasks`) voor de volledige kosten-analyse.
 */
export const MAX_VAR_TEXT_BYTES = 65_536;

/**
 * T3 (fase 3.8, MSP-pariteit) — structurele klem op het aantal werktijd-BANDEN binnen ÉÉN 92-byte
 * kalender-uitzonderingsblok (`AbstractCalendarAndExceptionFactory.processCalendarExceptions`,
 * `readExceptionBands` in `mppCalendars.ts`).
 *
 * LAAG-3-FIX (Opus-review — de vorige versie van dit commentaar rekende de klem verkeerd uit): het
 * ANALYSEERDE alleen de DUUR-array (`+32 + i*4`, past 15× vóór de naam-vardata) en NEGEERDE dat de
 * START-array (`+20 + i*2`, 2-byte-stride) een VEEL knellendere grens is — start-slot `i` staat op
 * `20+2i`, wat exact BOTST met duur-slot 0 (op `+32`) zodra `20+2i>=32`, dus `i>=6`. Structureel
 * passen er dus hoogstens 6 NIET-OVERLAPPENDE periodes (`i=0..5`) vóór start-slot 6 al in duur-slot
 * 0 se bytes leest — gedemonstreerd (reviewer-repro): bij `periodCount=15` (de oude klem) las
 * periode-index 6+ een "fantoomband" uit wat feitelijk duur-/naamlengte-bytes van ANDERE periodes/
 * de naam-vardata waren. Geklemd op 5 (niet de structurele 6-slot-bovengrens): MS Project se eigen
 * UI staat de gebruiker hooguit 5 werktijdperiodes per uitzondering toe (dezelfde autoritatieve
 * grens als `MAX_DAY_HOUR_PERIODS`'s eigen toelichting citeert voor het 60-byte-dagblok) — 5 is dus
 * zowel de STRUCTURELE (5<6, geen overlap-risico) als de PRODUCT-grens, en dus de motiveerbaarste
 * keuze. (`MAX_DAY_HOUR_PERIODS` in `mppCalendars.ts` droeg dezelfde start/duur-overlapfout — dat
 * was PRE-EXISTING buiten deze taak se scope, gemeld voor een latere T-taak, en is bij die latere
 * T16-veeglijst-fix met exact dezelfde `i>=6`-analyse gecorrigeerd naar 5.)
 * Een ongeklemde `periodCount` (SHORT, 0..65535) zou zonder deze klem tot 65535 iteraties per
 * uitzondering kunnen forceren; bij `MAX_CALENDAR_EXCEPTIONS` (2000) uitzonderingen per kalender is
 * dat tot 131 miljoen ongebruikte lus-iteraties (elke iteratie ná i=5 leest al buiten de bedoelde
 * band-slots en zou — vóór deze fix — een fantoomband kunnen opleveren, ná deze fix simpelweg niet
 * meer bereikt worden).
 */
export const MAX_EXCEPTION_BAND_PERIODS = 5;

/**
 * T9 (Opus-review N3, MSP-pariteit) — klem op de RAUWE `REMAINING_DURATION` (fixed-offset 52, INT32,
 * tienden-van-een-minuut — zelfde vorm als `SCHEDULED_DURATION`, zie `fieldMap14.ts`), vóór hij in
 * `mppReader.ts` naar `time.remainingMinutes`/`time.remainingTime` omgerekend wordt en van daaruit in
 * datum-arithmetiek (`CalendarEngine.addWorkMinutes`/`addWorkDaysChecked`, `duration.ts`'s
 * `addElapsedMinutes`) terechtkomt.
 *
 * MEETCOMMENTAAR: het veld is een SIGNED INT32 — structureel al begrensd tot ±2.147.483.647 tienden
 * (≈ ±408 jaar), dus een hostile bestand kan hier nooit een echte overflow forceren. Zonder EIGEN
 * klem zou het corpuscoderingspad niettemin tot ~400 jaar aan (elapsed-)minuten kunnen doorrekenen
 * vóórdat `CalendarEngine`s eigen `MAX_DAYS`/`MAX_MINUTES` (200.000 dagen, ~547 jaar) of
 * `duration.ts`s `MAX_ELAPSED_MINUTES` alsnog capt — die dieper liggende klemmen VANGEN het geval
 * altijd (geen crash-risico), maar precies zoals `MAX_EXCEPTION_BAND_PERIODS`/`MAX_VAR_TEXT_BYTES`
 * hierboven hoort een uit het bestand gelezen getal een EIGEN, hier gedocumenteerde bovengrens te
 * dragen i.p.v. stil te vertrouwen op een klem die toevallig verderop in de keten ook bestaat. 100
 * jaar (`100 × 365,25 × 24 × 60 × 10 ≈ 525.960.000` tienden) is ruim boven elke realistische
 * restduur van een bouwproject (het corpus se langste gemeten taakduur ligt in de orde van maanden),
 * en blijft ruim binnen het structurele INT32-bereik.
 *
 * PRE-EXISTING, BEWUST ONGEWIJZIGD (buiten T9-scope): `SCHEDULED_DURATION`s rauwe `durationRaw` in
 * `mppReader.ts` draagt DEZELFDE klem-leemte (geen eigen bovengrens, alleen de dieper liggende
 * `CalendarEngine`/`duration.ts`-klemmen) — dit bestand voegt hier alleen de klem voor het NIEUWE
 * `remainingDurationRaw`-veld toe; `durationRaw` zelf blijft ongemoeid (gemeld voor een latere taak,
 * zelfde conventie als `MAX_EXCEPTION_BAND_PERIODS`'s PRE-EXISTING-notitie hierboven — `durationRaw`
 * is zelf géén overlapfout, alleen een klem-leemte, dus die T16-veeglijst-fix raakte hem niet).
 */
export const MAX_REMAINING_DURATION_TENTHS = 525_960_000;

/** Klemt een rauwe `REMAINING_DURATION`-waarde (tienden-van-een-minuut, mogelijk negatief bij een
 *  kapot/hostile bestand) naar `[0, MAX_REMAINING_DURATION_TENTHS]` — zie de toelichting hierboven.
 *  Een negatieve restduur is nooit zinvol (spiegelt de bestaande `Math.max(0, …)`-klem op
 *  `remaining` in `CPMSolver.ts`), dus deze functie klemt ook de ondergrens op 0, niet alleen de
 *  bovengrens. */
export function clampRemainingDurationTenths(raw: number): number {
  if (!Number.isFinite(raw)) return 0;
  return Math.min(Math.max(raw, 0), MAX_REMAINING_DURATION_TENTHS);
}
