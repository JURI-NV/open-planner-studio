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

/**
 * Z2 (etappe "nul afwijkingen") — klem op de RAUWE `MANUAL_DURATION` (Fixed2Data blok 1, offset
 * 58, INT32, tienden-van-een-minuut — zelfde vorm als `SCHEDULED_DURATION`/`REMAINING_DURATION`,
 * zie `fieldMap14.ts`'s `TaskFieldId.ManualDuration`). Deze taak doet zelf NOG GEEN
 * datum-arithmetiek met dit veld (het wordt uitsluitend gelezen en op `RawTaskScan` opgeslagen,
 * zie `mppReader.ts`'s Z2-sectie) — de klem staat er toch al bij het lezen, zodat een latere
 * consument (Z9a, handmatig-plannen-toepassing) nooit een ongeklemde waarde overneemt en de
 * hardingsdiscipline niet per-veld opnieuw hoeft te worden uitgevonden.
 *
 * MEETCOMMENTAAR: zelfde redenering als `MAX_REMAINING_DURATION_TENTHS` hierboven — het veld is
 * een SIGNED INT32 (structureel al begrensd tot ±2.147.483.647 tienden, ≈ ±408 jaar), dus geen
 * hostile-overflow-risico, maar wél een eigen, gedocumenteerde bovengrens i.p.v. stil op een
 * dieper liggende klem te vertrouwen. Dezelfde 100-jaargrens (`100 × 365,25 × 24 × 60 × 10 ≈
 * 525.960.000` tienden) — een handmatig geplande taak se eigen duur ligt in de praktijk in
 * dezelfde orde van grootte als elke andere taakduur in het corpus (dagen tot maanden), dus er is
 * geen aanleiding voor een andere bovengrens dan haar `REMAINING_DURATION`-buurveld.
 */
export const MAX_MANUAL_DURATION_TENTHS = 525_960_000;

/** Klemt een rauwe `MANUAL_DURATION`-waarde (tienden-van-een-minuut, mogelijk negatief bij een
 *  kapot/hostile bestand) naar `[0, MAX_MANUAL_DURATION_TENTHS]` — zie de toelichting hierboven.
 *  Spiegelt `clampRemainingDurationTenths` exact (eigen naam/constante i.p.v. hergebruik, want de
 *  twee velden zijn semantisch onafhankelijk — een gedeelde klem zou een toekomstige, voor één van
 *  de twee velden andere bovengrens onnodig aan de andere opdringen). */
export function clampManualDurationTenths(raw: number): number {
  if (!Number.isFinite(raw)) return 0;
  return Math.min(Math.max(raw, 0), MAX_MANUAL_DURATION_TENTHS);
}

/**
 * Z3 (etappe "nul afwijkingen") — klem op het aantal RECORDS in één timephased-blok (`Var2Data`
 * van `TBkndAssn`, zie `mppTimephased.ts`'s moduleheader voor de blokindeling). Het header-veld
 * dat dit aantal claimt is een ONGEVALIDEERDE bestandswaarde (SHORT, 0..65535); `mppTimephased.ts`
 * klemt 'm EERST STRUCTUREEL (tegen wat de daadwerkelijke bloklengte kan dragen — spiegelt
 * `FixedMeta`/`VarMeta12`'s `adjustedItemCount`-patroon, zie `mppPrimitives.ts`), en DAARNA tegen
 * deze absolute bovengrens.
 *
 * MEETCOMMENTAAR: waarom een tweede, absolute klem nodig is bovenop de structurele — anders dan
 * `FixedMeta`/`VarMeta12` (die tegen een storage-item van vaste grootte lezen) is `Var2Data` een
 * ONGEBEGRENSDE variabele-lengte-byte-array (geen `MAX_VAR_TEXT_BYTES`-achtige klem bestaat daar
 * al voor, zie `Var2Data.getByteArray` in `mppPrimitives.ts`): een geprepareerd bestand kan een
 * timephased-var-data-entry van tientallen MB's claimen, en de STRUCTURELE klem alleen zou zo'n
 * buffer volledig laten decoderen (elke record een `Date`-allocatie + array-push). Corpusbreed
 * gemeten (`check-mpp-import.ts`'s Z3-corpustelling, 216 leesbare bestanden, 3298 toewijzingen met
 * timephased-data over `voor claude/test bestanden voor file implementation` +
 * `voor claude/testdata-crawl`): het langst waargenomen regelmatige blok droeg **5** periodes (352
 * bytes — ruim onder één werkweek se dagelijkse granulariteit). 20.000 records (bij 20 bytes/record
 * ≈ 390 KB, bovenop de 16-byte header) is dus ~4.000× de gemeten corpus-piek — dat is BEWUST veel
 * hoger dan wat het corpus laat zien (een klem die precies op de gemeten waarde zit, zou een
 * legitiem groter/fijnmaziger project onnodig afknijpen), maar begrenst een hostile bestand nog
 * altijd hard op een paar honderd microseconden werk i.p.v. een onbegrensde decodeerlus.
 */
export const MAX_TIMEPHASED_REGULAR_RECORDS = 20_000;

/** Klemt een rauwe regelmatige-timephased-recordcount (header-SHORT, al voor-geklemd tegen de
 *  structurele bloklengte door de aanroeper) naar `[0, MAX_TIMEPHASED_REGULAR_RECORDS]`. */
export function clampTimephasedRegularRecordCount(count: number): number {
  if (!Number.isFinite(count)) return 0;
  return Math.min(Math.max(count, 0), MAX_TIMEPHASED_REGULAR_RECORDS);
}

/**
 * Z3 — zelfde redenering als `MAX_TIMEPHASED_REGULAR_RECORDS` hierboven, voor het IRREGULAR-blok
 * (8-byte records i.p.v. 20-byte — zie `mppTimephased.ts`). MEETCOMMENTAAR: irregular-records zijn
 * in dit corpus zeldzaam (ze bestaan alleen voor werk buiten standaard werktijd) — corpusbreed
 * gemeten (dezelfde 216-bestand-run als hierboven) hoogstens **1** record per toewijzing (24 bytes).
 * 5.000 records (8 bytes/record ≈ 40 KB) is ruim boven elke realistische hoeveelheid, met dezelfde
 * structurele-klem-eerst-discipline als hierboven.
 */
export const MAX_TIMEPHASED_IRREGULAR_RECORDS = 5_000;

/** Klemt een rauwe irregular-timephased-recordcount — spiegelt
 *  `clampTimephasedRegularRecordCount` exact, eigen constante omdat de twee blokken
 *  onafhankelijke, niet per se gelijke bovengrenzen kunnen krijgen. */
export function clampTimephasedIrregularRecordCount(count: number): number {
  if (!Number.isFinite(count)) return 0;
  return Math.min(Math.max(count, 0), MAX_TIMEPHASED_IRREGULAR_RECORDS);
}
