/**
 * Native MPP14-lezer (MS Project 2010–2021), alleen-lezen.
 * Afgeleid van de MPXJ-broncode (https://github.com/joniles/mpxj, © Jon Iles e.a.,
 * LGPL-2.1) — structuurkennis en veldconstanten geport naar TypeScript voor
 * Open Planner Studio (LGPL-3.0).
 *
 * Kalenderfabriek (T6): poort van `MPP14CalendarFactory.java` + `AbstractCalendarFactory.java` +
 * `AbstractCalendarAndExceptionFactory.java` — `"   114"/TBkndCal` (FixedMeta itemSize=10,
 * FixedData maxExpectedSize=12, VarMeta12, Var2Data) → basiskalenders + afgeleide (resource-)
 * kalenders via de base-kalender-verwijzing, weekdag-uren → `WorkCalendar.workDays` + banden,
 * uitzonderingen → `WorkCalendar.holidays` (gematerialiseerd).
 *
 * T3 (fase 3.8, MSP-pariteit, 2026-08-15) — UITBREIDING op T6's uitzonderingsmaterialisatie: waar
 * T6 uitsluitend PLATTE, niet-werkende uitzonderingen materialiseerde (recurrente records werden
 * bewust overgeslagen), expandeert T3 alle vier recurrentietypes (DAILY/WEEKLY/MONTHLY/YEARLY ×
 * absoluut/relatief — poort van `RecurringData`) en materialiseert ook WERKENDE uitzonderingen
 * (`periodCount>0`) als `WorkCalendar.workingExceptions`. Zie de sectiekop bij `ParsedExceptions`
 * verderop in dit bestand voor de volledige ontwerptoelichting (precedentie, invariant-garantie,
 * overerving). Corpusmeting (testdata-crawl, 661 bestanden, 3413 taken, 2026-08-15): startDiff
 * 313→197, finishDiff 450→264 (t.o.v. de T2-baseline, vóór deze taak).
 *
 * Doelsemantiek is IDENTIEK aan de kalendersectie van `mspdiReader.ts` (`applyCalendarBody`/
 * `parseCalendar`, spiegelplicht) — zelfde `WorkCalendar`-vorm, dezelfde `canonicalizeBands`/
 * `registerCalendarBands`/`promoteHourCalendar`-orkestratie uit `@/services/subdayIo`.
 *
 * ETAPPE 1.5 (uurmodus-taken, 2026-08-15) — CORRECTIE t.o.v. de oorspronkelijke T6-tekst hieronder:
 * `buildCalendarFromDays` promoveert NIET MEER zelf (geen `promoteHourCalendar`-aanroep meer aan het
 * eind) — die registreert alleen nog de banden (`registerCalendarBands`), spiegelt zo `mspdiReader.
 * ts`'s `applyCalendarBody`/`parseCalendar` (die ook alleen registreren, nooit zelf promoveren).
 * Promotie is nu een LOSSE stap, `promoteCalendarsForHourMode` (onderaan dit bestand) — `mppReader.
 * ts`'s `readTasks` roept 'm aan NÁ een taak-signaal-scan (spiegelt mspdiReader's eigen tweefasen-
 * opzet: eerst ALLE `<Calendar>`-elementen registreren, dan ALLE taken scannen op het (c)-signaal —
 * sub-dag-duur of een niet-ankertijd-Start/Finish, zie `mppAnchorClock`/`hasNonAnchorTime` in
 * mppReader.ts — en pas DAARNA promoveren). De reden voor de knip is precies dezelfde als bij
 * mspdiReader: `isSubDayMinutes`/de datumdiscriminator moeten `cal.hoursPerDay` lezen VÓÓR promotie
 * (de SCALAR, eerste-band-afgeleide waarde), niet de door `deriveHoursPerDay` herberekende waarde
 * ná promotie — zou je hier ná promotie scannen, dan vergelijk je taakduren tegen de VERKEERDE
 * (grovere/fijnere) dagsom. `readCalendars` zelf blijft ONVERANDERD verder: nog steeds `try/catch`-
 * gevangen (I1-fix), nog steeds de basis→afgeleide-overerving — alleen de laatste regel van
 * `buildCalendarFromDays` verdween.
 *
 * T6-kwaliteitsreview (M3) — twee bewuste, documenteerde verschillen met `mspdiReader.ts` blijven
 * staan (punt 1 hierboven is met etappe 1.5 vervallen — MPP-taken dragen sinds 2026-08-15 wél een
 * (c)-signaal, exact zoals mspdiReader):
 *  a. `WorkCalendar.holidays` begint hier ALTIJD als `[]` (`buildCalendarFromDays`), ongeacht of er
 *     daadwerkelijk uitzonderingen in het bestand staan — mspdiReader's `parseCalendar` start
 *     daarentegen bij `createDefaultCalendar()` (die, in bouwmodus, de NL-feestdagenset genereert)
 *     en overschrijft `calendar.holidays` ALLEEN als er ≥1 echte `<Exception>`-element gevonden is;
 *     bij 0 exceptions blijft mspdiReader's gegenereerde NL-standaardset dus stil staan. Dat is GEEN
 *     documentgegeven — het is mspdiReader's eigen "geen data ⇒ behoud de default"-conventie (relevant
 *     voor T6-kwaliteitsreview I2: een eerdere versie van de corpuscheck verwarde die default-set
 *     met "29 echte feestdagen uit de ground truth", terwijl de drie ground-truth-XML's zelf 0
 *     `<Exception>`-elementen bevatten). MPP-kalenders zijn ALTIJD letterlijke bestandsdata, nooit
 *     een stille default — vandaar de expliciete leegmaak, ook al is de uitkomst soms toevallig
 *     hetzelfde (0 holidays).
 *  b. Naamloze kalenders (geen CALENDAR_NAME-var-data) krijgen hier `"Kalender <uid>"`; mspdiReader
 *     valt terug op de vaste string `"Imported Calendar"` (`parseCalendar`). Beide zijn placeholders
 *     voor ontbrekende brondata, maar met een andere — voor MPP nuttigere, want uniek per kalender —
 *     conventie (zie `nameOfOrFallback` hieronder).
 *
 * FieldMap-vrij: MPXJ's `CalendarFactory` gebruikt GEEN data-gedreven field map (in tegenstelling
 * tot taken/resources/assignments, zie `fieldMap14.ts`) — de var-data-typen voor naam (1) en
 * kalenderdata (8) zijn letterlijke constanten in `MPP14CalendarFactory.java`.
 *
 * Hardingsdiscipline (T5-kwaliteitsreviews, hier voortgezet): elke ruwe, bestandsgestuurde
 * lus-/allocatiegrens (dagperiodes, uitzonderingsaantal, feestdagbereik, base-kalender-keten,
 * AANTAL kalenders, TOTAAL aantal gematerialiseerde holidays over het hele bestand) is expliciet
 * geklemd met een meetcommentaar — zie `MAX_DAY_HOUR_PERIODS`, `MAX_CALENDAR_EXCEPTIONS`,
 * `MAX_HOLIDAY_RANGE_DAYS`, `MAX_BASE_CHAIN_DEPTH`, `MAX_CALENDARS` en `MAX_TOTAL_HOLIDAY_SLOTS`
 * hieronder. T6-kwaliteitsreview (C1, kritiek): de PER-KALENDER-klemmen alleen waren onvoldoende —
 * niets begrensde het AANTAL kalenders of de TOTALE holiday-materialisatie over alle kalenders
 * samen. Gemeten: een 3 MB TBkndCal-blok met 100.001 nep-basiskalender-records (12 bytes elk, geen
 * echte var-data nodig) liet deze module vóór de fix 100.001 volledige `WorkCalendar`-objecten
 * alloceren — die daarna in `ImportResult.resourceCalendars`, de app-state, undo-snapshots én
 * IFC-saves belanden — een OOM-crash (exit 134) op een gewone dev-machine. `MAX_CALENDARS` kapt de
 * FixedData-iteratie af; `MAX_TOTAL_HOLIDAY_SLOTS` is een gedeeld budget-object dat zowel
 * `parseExceptions` (nieuwe materialisatie) als de base→afgeleide-overerving in `materializeDerived`
 * (`[...baseCal.holidays, ...]`, die de basiskalender se array PER afgeleide kalender kopieert) laat
 * afdragen — zonder dat budget zou N afgeleide kalenders × M base-holidays alsnog O(N×M) array-
 * slots kunnen kosten, ook als elke individuele kalender ruim binnen `MAX_CALENDAR_EXCEPTIONS` blijft.
 */
import type { Holiday, WorkCalendar, WorkingException } from '@/types/calendar';
import { createDefaultCalendar } from '@/engine/calendar/defaultCalendar';
import { generateId } from '@/utils/id';
import { formatDate, parseDate, addCalendarDays } from '@/utils/dateUtils';
import { canonicalizeBands, getCalendarBands, promoteHourCalendar, registerCalendarBands } from '@/services/subdayIo';
import type { CfbFile } from './cfb';
import type { Props } from './mppContainer';
import { FixedData, FixedMeta, Var2Data, VarMeta12, getDate, getInt, getShort, getUnicodeString } from './mppPrimitives';
import { MAX_VAR_TEXT_BYTES, MAX_EXCEPTION_BAND_PERIODS, MAX_RECURRENCE_DATES } from './limits';

// ── PropsKey-sleutels (PropsKey.java) — gelezen uit `"   114"/Props`, net als de andere
// project-brede sleutels in mppReader.ts. ──────────────────────────────────────────────────────
const PROPS_KEY_DEFAULT_CALENDAR_NAME = 37748750;
const PROPS_KEY_DEFAULT_CALENDAR_HOURS = 37753736;

/** TBkndCal/FixedMeta-itemgrootte (AbstractCalendarFactory.java: `new FixedMeta(..., 10)`). */
const CAL_FIXED_META_ITEM_SIZE = 10;
/** TBkndCal/FixedData-itemgrootte-bovengrens (AbstractCalendarFactory.java: `new FixedData(...,
 *  12)`) — elk item draagt precies één `calendarID/baseCalendarID/resourceID`-triplet van 4 bytes. */
const CAL_FIXED_DATA_MAX_SIZE = 12;

/** MPP14CalendarFactory.java: vaste var-data-typen (geen field-map-indirectie, zie moduleheader). */
const CALENDAR_NAME_VAR_TYPE = 1;
const CALENDAR_DATA_VAR_TYPE = 8;

/** T6-kwaliteitsreview (M4): gedeelde tekst-klem, nu geïmporteerd uit de bladmodule `./limits.ts`
 *  i.p.v. een eigen lokale kopie (de vorige versie hield hier bewust een DUPLICAAT van
 *  `mppReader.ts`'s `MAX_VAR_TEXT_BYTES` aan om de omgekeerde-import-cyclus te vermijden —
 *  `limits.ts` lost dat structureel op, zie die module se toelichting). */
const MAX_CALENDAR_TEXT_BYTES = MAX_VAR_TEXT_BYTES;

/** C1-stijl klem: het aantal werktijd-periodes per weekdag (`periodCount`, SHORT 0..65535) stuurt
 *  een lus die per periode 2+4 bytes leest op een RUW, bestandsgestuurde offset — ongeklemd zou een
 *  geprepareerd bestand hier tot 65535 pogen te lezen, ver voorbij het 60-byte-dagblok, wat op een
 *  kort Var2Data-record al snel een `MPP:`-grensfout van de onderliggende primitief zou gooien en
 *  zo de HELE kalenderlezing (en dus `readMPP`) laat crashen — niet alleen dit ene veld. Geklemd op
 *  de STRUCTURELE capaciteit van het 60-byte-dagblok zelf (T6-kwaliteitsreview, minor M2 — was 24,
 *  een willekeurig ruime marge zonder onderbouwing): startoffset `8+i*2` en duuroffset `20+i*4` — de
 *  duurslot is de knellende grens, dat past hoogstens 10× (`20+10*4=60`, het volgende dagblok begint
 *  dan pas) binnen de 60 bytes vóór het OVERLOOPT in de buurdag se eigen data. MS Project staat de
 *  gebruiker zelf hooguit 5 periodes per dag toe (de UI kent geen 6e rij) — 10 is dus al de volledige
 *  FYSIEKE bovengrens van het formaat, niet een los gekozen marge. */
const MAX_DAY_HOUR_PERIODS = 10;

/** C1 (kritiek, T6-kwaliteitsreview) — bovengrens op het AANTAL kalenders dat `readCalendars` uit
 *  één `"   114"/TBkndCal`-storage materialiseert. Zonder deze klem kapt alleen `MAX_CALENDAR_
 *  EXCEPTIONS`/`MAX_TOTAL_HOLIDAY_SLOTS` de HOLIDAY-kant af — het aantal `WorkCalendar`-OBJECTEN
 *  zelf (elk met een eigen `id`, `workDays`, evt. `workTime`-banden) bleef ongeklemd. Gemeten: een
 *  3 MB TBkndCal/FixedData-blok met 100.001 nep-records (elk 12 bytes: alleen een calendarID/
 *  baseID/resourceID-triplet, geen andere var-data nodig) liet deze module vóór de fix 100.001
 *  `WorkCalendar`-objecten alloceren, die daarna via `ImportResult.resourceCalendars` in de
 *  app-state/undo-snapshots/IFC-saves belanden — OOM-crash (exit 134). Corpus: hoogstens 13
 *  kalenders per bestand (plan-tabel). 1024 is ruim boven elk realistisch project (zelfs met
 *  tientallen unieke resource-kalenders), maar begrenst een geprepareerd bestand hard — de
 *  FixedData-iteratie in `readCalendars` stopt zodra `rawByUniqueId.size` deze klem raakt, dus de
 *  rest van het (mogelijk enorme) FixedData-blok wordt dan simpelweg niet meer bekeken. */
export const MAX_CALENDARS = 1_024;

/** C1 (kritiek, T6-kwaliteitsreview) — gedeeld TOTAALBUDGET voor gematerialiseerde `Holiday`-
 *  objecten over ALLE kalenders in één `readCalendars`-aanroep samen (basiskalenders se eigen
 *  materialisatie ÉN de base→afgeleide-overerving, `[...baseCal.holidays, ...ownHolidays]` in
 *  `materializeDerived` hieronder). `MAX_CALENDAR_EXCEPTIONS` (2000) begrenst alleen het aantal
 *  NIEUW GEPARSTE uitzonderingen PER kalender — het kopiëren van een basiskalender se `holidays`-
 *  array in ELKE afgeleide kalender die ervan erft blijft daar buiten: N afgeleide kalenders die elk
 *  een basiskalender met M holidays overerven kost O(N×M) array-slots, ook als N (via `MAX_
 *  CALENDARS`) en M (via `MAX_CALENDAR_EXCEPTIONS`) elk apart binnen hun eigen klem blijven (bv.
 *  1024 afgeleide kalenders × 2000 geërfde holidays ≈ 2 miljoen slots, alleen al aan kopieerwerk).
 *  Dit budget-object (zie `HolidayBudget` hieronder) wordt ÉÉN keer per `readCalendars`-aanroep
 *  aangemaakt en door alle materialisatie-/overervingsstappen gedeeld gedecrementeerd; zodra het op
 *  is, breekt zowel `parseExceptions` als de overervingskopie netjes af (geen crash, gewoon minder
 *  holidays dan het bestand claimt). 100.000 is ruim boven elk realistisch corpus (gemeten crawl-
 *  basislijn: 208 over 49 bestanden SAMEN — zie `tests/planning/check-mpp-calendars.ts`), maar
 *  begrenst de ABSOLUTE bovengrens per bestand hard, ongeacht hoeveel kalenders het claimt. */
export const MAX_TOTAL_HOLIDAY_SLOTS = 100_000;

/** Gedeeld, mutabel budget-object — zie `MAX_TOTAL_HOLIDAY_SLOTS`. Een `{ remaining: number }`
 *  i.p.v. een kale `number`-parameter zodat `parseExceptions`/de overervingskopie 'm in-place kunnen
 *  decrementeren zonder de nieuwe waarde expliciet terug te hoeven geven op elke aanroepplek. */
export interface HolidayBudget {
  remaining: number;
}

/** Nieuw, vol budget — één per `readCalendars`-aanroep (zie `MAX_TOTAL_HOLIDAY_SLOTS`). Losse,
 *  geëxporteerde fabrieksfunctie zodat testcode (`check-mpp-calendars.ts`) `parseExceptions`
 *  rechtstreeks kan aanroepen zonder de interne `readCalendars`-orkestratie na te hoeven bouwen. */
export function newHolidayBudget(): HolidayBudget {
  return { remaining: MAX_TOTAL_HOLIDAY_SLOTS };
}

/** C1-stijl klem: `exceptionCount` (SHORT, 0..65535) — spiegelt `MAX_OUTLINE_LEVEL`/
 *  `MAX_VAR_TEXT_BYTES` in mppReader.ts. Elke uitzondering kost minstens 92 bytes om niet af te
 *  breken, dus de lus is op zichzelf al begrensd door de buffergrootte (`offset+92>data.length`
 *  breekt af) — maar in combinatie met `MAX_HOLIDAY_RANGE_DAYS` hieronder is de KOST per
 *  uitzondering (dag-voor-dag-materialisatie in `CalendarEngine.buildHolidaySet`, zie de
 *  toelichting daar) proportioneel aan de bereiklengte. Zonder deze klem zou een bestand met
 *  ~65535 uitzonderingen (die dan ~6 MB Var2Data nodig heeft — een geprepareerd bestand kan dat
 *  bieden) × een ongeclampt bereik van ~65534 dagen elk een veelvoud van miljarden Set-inserties in
 *  `CalendarEngine` kunnen forceren zodra de kalender ergens (F5, Berekenen, laden) geïnstantieerd
 *  wordt — geklemd op 2000 (ruim boven elk realistisch corpus: MS Project-kalenders dragen zelden
 *  meer dan enkele tientallen tot een paar honderd feestdag-/afwezigheidsuitzonderingen, zelfs over
 *  jaren). Zie `MAX_HOLIDAY_RANGE_DAYS` voor de andere helft van de klem. */
export const MAX_CALENDAR_EXCEPTIONS = 2000;

/** Zie `MAX_CALENDAR_EXCEPTIONS` hierboven — het aantal DAGEN in één uitzonderingsbereik, geklemd
 *  tegen `CalendarEngine.buildHolidaySet()`'s dag-voor-dag-materialisatie (elke dag in
 *  `[startDate, endDate]` wordt een eigen Set-entry, ONGEACHT hoe lang het bereik is). Een
 *  geprepareerd bestand kan een enkele uitzondering tot ~65534 dagen (~179 jaar, het SHORT-bereik
 *  van `MPPUtility.getDate`) laten claimen. Geklemd op 366 dagen (ruim boven elke realistische
 *  meerdaagse sluiting — een bouwvak of jaarwisseling-shutdown duurt hoogstens enkele weken) —
 *  in combinatie met `MAX_CALENDAR_EXCEPTIONS` (2000) is de absolute bovengrens per kalender dus
 *  2000 × 366 ≈ 732.000 Set-inserties: lineair, in de orde van enkele tientallen ms, i.p.v.
 *  onbegrensd. */
export const MAX_HOLIDAY_RANGE_DAYS = 366;

/** Begrenst de base-kalender-ketenvolging voor afgeleide (resource-)kalenders — spiegelt
 *  `MAX_OUTLINE_LEVEL`'s klemdiscipline in mppReader.ts. Een geprepareerd bestand kan een kalender
 *  naar zichzelf of circulair naar een andere afgeleide kalender laten verwijzen; MPXJ zelf
 *  beschermt daar NIET tegen (`updateBaseCalendarNames` verwijdert alleen een kalender wiens
 *  base-ID nergens naar wijst, geen cyclusdetectie voor een keten van twee of meer afgeleide
 *  kalenders die naar elkaar verwijzen). De fixed-point-resolutie hieronder (`readCalendars`)
 *  probeert hoogstens dit aantal ronden; kalenders die dan nog niet opgelost zijn (cyclus, of een
 *  base die nooit bestaat) worden zonder overerving gematerialiseerd — zie de toelichting daar. */
export const MAX_BASE_CHAIN_DEPTH = 32;

/** Eén weekdag, volledig geresolveerd (geen "gebruik de default/base"-sentinel meer) — de
 *  tussenvorm die zowel de projectbrede DEFAULT_CALENDAR_HOURS-fallback, een basiskalender én een
 *  afgeleide kalender in hetzelfde format bewaart, zodat een afgeleide kalender een reeds
 *  gematerialiseerde basiskalender rechtstreeks als eigen fallback kan hergebruiken (zie
 *  `daysByUniqueId` in `readCalendars`). */
interface DayResolution {
  working: boolean;
  bands: { start: number; end: number }[];
}

/** MPPUtility/ProjectCalendarDays' eigen terugval wanneer zowel een kalenderdag als de
 *  project-brede DEFAULT_CALENDAR_HOURS-eigenschap "default" zijn: `DEFAULT_WORKING_WEEK`
 *  (ma-vr werkend) + `DEFAULT_WORKING_MORNING`/`DEFAULT_WORKING_AFTERNOON` (08:00-12:00,
 *  13:00-17:00) — AbstractCalendarFactory.java. Index 0=zondag..6=zaterdag (MPP-dagblokvolgorde,
 *  zie `resolveOneDay`). */
const STANDARD_DAY_HOURS_FALLBACK: ReadonlyArray<DayResolution> = [
  { working: false, bands: [] }, // zo
  { working: true, bands: [{ start: 480, end: 720 }, { start: 780, end: 1020 }] }, // ma
  { working: true, bands: [{ start: 480, end: 720 }, { start: 780, end: 1020 }] }, // di
  { working: true, bands: [{ start: 480, end: 720 }, { start: 780, end: 1020 }] }, // wo
  { working: true, bands: [{ start: 480, end: 720 }, { start: 780, end: 1020 }] }, // do
  { working: true, bands: [{ start: 480, end: 720 }, { start: 780, end: 1020 }] }, // vr
  { working: false, bands: [] }, // za
];

/** MPP-tijdwaarde (SHORT, tienden-van-minuut sinds middernacht) → minuten-vanaf-middernacht,
 *  spiegelt `MPPUtility.getTime`'s seconden-afronding maar dan in minuten (subdayIo's
 *  bandeenheid). */
function mppTimeToMinutes(raw: number): number {
  let minutes = Math.floor(raw / 10);
  if (minutes > 1439) minutes %= 1440;
  return minutes;
}

/** Eén weekdag-blok (60 bytes, `AbstractCalendarFactory.processCalendarHours`'s per-dag-lus) →
 *  `DayResolution`. `defaultFlag===1` ⇒ `fallback` (het "DEFAULT"-daytype — voor een basiskalender
 *  is dat de project-brede DEFAULT_CALENDAR_HOURS-fallback, voor een afgeleide kalender de
 *  resolved-base-fallback; de aanroeper kiest welke). `dayIndex` 0..6 = MPP-dagblokvolgorde
 *  (0=zondag..6=zaterdag, zie `DayOfWeekHelper.ORDERED_DAYS`). */
function resolveOneDay(data: Uint8Array, dayIndex: number, fallback: DayResolution, ctx: string): DayResolution {
  const offset = dayIndex * 60;
  if (data.length < offset + 4) return fallback;
  const defaultFlag = getShort(data, offset, ctx);
  if (defaultFlag === 1) return fallback;

  const rawPeriodCount = getShort(data, offset + 2, ctx);
  const periodCount = Math.min(Math.max(rawPeriodCount, 0), MAX_DAY_HOUR_PERIODS); // zie MAX_DAY_HOUR_PERIODS
  const bands: { start: number; end: number }[] = [];
  for (let i = 0; i < periodCount; i++) {
    const startOffset = offset + 8 + i * 2;
    const durationOffset = offset + 20 + i * 4;
    if (data.length < startOffset + 2 || data.length < durationOffset + 2) break;
    const startMinutes = mppTimeToMinutes(getShort(data, startOffset, ctx));
    // MPPUtility.getDuration(byte[],offset): tienden-van-minuut, ondanks de 4-byte-stride ZELF een
    // SHORT-read (de hoge 2 bytes van elke 4-byte-periode-slot zijn ongebruikt/gereserveerd).
    const durationMinutes = Math.floor(getShort(data, durationOffset, ctx) / 10);
    if (durationMinutes > 0) bands.push({ start: startMinutes, end: startMinutes + durationMinutes });
  }
  return { working: bands.length > 0, bands };
}

/** Alle 7 weekdagen van één kalenderdata-blok resolven — `data === null` (kalender zonder eigen
 *  Var2Data-record) ⇒ het volledige `fallback`-patroon overnemen, zoals MPXJ's eigen
 *  `varData == null`-terugval. */
function resolveDays(data: Uint8Array | null, fallback: ReadonlyArray<DayResolution>, ctx: string): DayResolution[] {
  const result: DayResolution[] = [];
  for (let index = 0; index < 7; index++) {
    result.push(data ? resolveOneDay(data, index, fallback[index], ctx) : fallback[index]);
  }
  return result;
}

/** `DayResolution[7]` (index 0=zo..6=za) → een verse `WorkCalendar` met `workDays`/scalar-uren/
 *  banden gezet — spiegelt `mspdiReader.ts`'s `applyCalendarBody`. `holidays` wordt HIER altijd
 *  leeggemaakt (nooit `createDefaultCalendar()`'s eigen NL-feestdagen-default laten doorlekken —
 *  die horen bij een NIEUW project, niet bij een uit een bestand gelezen kalender); de aanroeper
 *  zet de echte, gematerialiseerde `holidays` erna. `description` wordt eveneens altijd leeggemaakt
 *  (T6-spec-review, minor c): MPP kent geen per-kalender-omschrijving, dus `createDefaultCalendar()`'s
 *  hardgecodeerde "ma-vr 07:00-16:00"-tekst zou stil onwaar worden zodra de werkelijke, hier gelezen
 *  uren daarvan afwijken.
 *
 *  `hoursPerDayOverride` (T6-spec-review-fix, minor b) — als niet-`null`, overschrijft dit de
 *  scalar-afgeleide `hoursPerDay` VÓÓR `promoteHourCalendar` wordt aangeroepen, zodat promotie (die
 *  op haar beurt `hoursPerDay` opnieuw kan afleiden via `deriveHoursPerDay` zodra de kalender
 *  daadwerkelijk banden draagt) het LAATSTE woord houdt — exact de volgorde van mspdiReader
 *  (`parseCalendar` past de MINUTES_PER_DAY-projecteigenschap toe, `promoteHourCalendar` draait
 *  daarna pas). Een eerdere versie paste deze override pas ná `readCalendars` toe (in
 *  `mppReader.ts`), dus NÁ promotie — dat liet promotie's eigen, preciezere afleiding stil
 *  overschrijven door de grovere projecteigenschap, precies andersom dan mspdiReader. */
function buildCalendarFromDays(name: string, days: ReadonlyArray<DayResolution>, hoursPerDayOverride: number | null): WorkCalendar {
  const cal = createDefaultCalendar();
  cal.id = generateId('mppcal');
  delete cal.generation; // MPP kent geen regelset-herkomst, net als MSPDI (zie mspdiReader.ts)
  cal.holidays = [];
  cal.description = '';
  cal.name = name;

  const rawByWeekday: Partial<Record<1 | 2 | 3 | 4 | 5 | 6 | 7, { start: number; end: number }[]>> = {};
  const workDays: number[] = [];
  let scalar: { start: number; end: number } | null = null;
  for (let index = 0; index < 7; index++) {
    const isoDay = (index === 0 ? 7 : index) as 1 | 2 | 3 | 4 | 5 | 6 | 7; // MSP 1=zo..7=za → ISO 1=ma..7=zo
    const d = days[index];
    if (d && d.working && d.bands.length > 0) {
      workDays.push(isoDay);
      rawByWeekday[isoDay] = d.bands;
      if (!scalar) scalar = d.bands[0];
    }
  }
  if (workDays.length > 0) cal.workDays = workDays.sort((a, b) => a - b);
  if (scalar) {
    // T6-spec-review-fix (minor a): FLOOR op beide grenzen — spiegelt mspdiReader's
    // `parseInt(toTime.split(':')[0])` (het HELE-UURDEEL van de kloktijd, geen afronding omhoog).
    // `Math.ceil` op `workEndHour` gaf voorheen een AFWIJKENDE (te hoge) `hoursPerDay` zodra een
    // bandgrens niet op een heel uur viel (bv. 17:30 werd 18 i.p.v. 17).
    cal.workStartHour = Math.floor(scalar.start / 60);
    cal.workEndHour = Math.floor(scalar.end / 60);
    cal.hoursPerDay = cal.workEndHour - cal.workStartHour;
    if (cal.hoursPerDay <= 0) cal.hoursPerDay = 8;
  }
  if (hoursPerDayOverride !== null) cal.hoursPerDay = hoursPerDayOverride;

  const { bands, deviates } = canonicalizeBands(rawByWeekday);
  registerCalendarBands(cal, { canonical: bands, deviates });
  // ETAPPE 1.5: promotie gebeurt HIER NIET MEER — zie de moduleheader. `cal.hoursPerDay` (hierboven,
  // ná `hoursPerDayOverride`) blijft dus de SCALAR waarde tot `promoteCalendarsForHourMode`
  // (onderaan dit bestand) draait; `mppReader.ts`'s `readTasks` heeft precies díe scalar-waarde
  // nodig om het (c)-signaal per taak te bepalen vóórdat promotie 'm met `deriveHoursPerDay`
  // herberekent.
  return cal;
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// T3 (fase 3.8, MSP-pariteit) — recurrente uitzonderingen expanderen + werkende uitzonderingen
// lezen. Poort van drie MPXJ-bronnen (verifieer op INHOUD, niet op regelnummer):
//  - `AbstractCalendarAndExceptionFactory.processCalendarExceptions`/`readRecurringData`
//    (org.mpxj.mpp) — het 92-byte-blok zelf, incl. de DAILY-`@76`-asymmetrie (T6-spec-review-fix,
//    hieronder ongewijzigd voortgezet).
//  - `RecurringData.populateDates()`/`getDates()` (org.mpxj) — de vier datumgeneratoren
//    (DAILY/WEEKLY/MONTHLY/YEARLY × absoluut/relatief), hier 1:1 geport als `getXxxDates`-functies
//    op UTC-middernacht-`Date`'s (zelfde substraat als `getDate`/`formatDate`).
//  - `ProjectCalendar.populateExpandedExceptions()`/`ORDERED_RECURRENCE_TYPES` (org.mpxj) — de
//    precedentie: recurrente uitzonderingen in de volgorde WEEKLY→MONTHLY→YEARLY→DAILY, dan
//    niet-recurrente uitzonderingen als hoogste-prioriteitslaag.
//
// ONTWERPKEUZE t.o.v. een letterlijke MPXJ-poort — de "autoriteitskaart" (BEWUST STRENGER dan
// MPXJ): MPXJ's eigen precedentiekaart is sleutelt op `getFromDate()` (één datum per uitzondering,
// ook als een niet-recurrente uitzondering een MEERDAAGS bereik beslaat) — twee niet-recurrente
// uitzonderingen met VERSCHILLENDE fromDates maar OVERLAPPENDE bereiken botsen daar dus niet in de
// kaart, en `getException(date)`'s binary search kan dan een onderbepaald resultaat geven. Voor dit
// project is dat GEEN acceptabel randgeval: T2's `WorkCalendar`-invariant ("een datum nooit tegelijk
// in `holidays` én `workingExceptions`") wordt door `CalendarEngine` NIET zelf afgedwongen — een
// schending gaf al een echte bug (negatief float, Opus-T2-review LAAG-6/7). `resolveExceptions`
// hieronder bouwt daarom een ECHTE per-datum-autoriteitskaart (`authority`, sleutel = ISO-datum) die
// ELKE dag van ELKE uitzondering langsloopt — recurrent én niet-recurrent — zodat de invariant AL
// BIJ CONSTRUCTIE geldt, ongeacht welke twee brondocument-records elkaar overlappen.
export interface ParsedExceptions {
  holidays: Holiday[];
  workingExceptions: WorkingException[];
}

/** Eén herhalingspatroon — poort van `RecurringData` (org.mpxj.RecurringData). Draagt precies de
 *  velden die `readRecurringData` uit het 92-byte-blok leest. `frequency`/`occurrences` zijn BEWUST
 *  ongeklemd hier (spiegelt `RecurringData.setFrequency`/`setOccurrences`, die de rauwe bytewaarde
 *  bewaren zonder ze te normaliseren) — het `<1→1`-vangnet (`RecurringData.populateDates`) gebeurt
 *  pas in `moreDates`/de generatiefuncties, bij de daadwerkelijke datumgeneratie. De
 *  flatten-beslissing in `readRawExceptions` toetst bewust op de RAUWE `frequency`-waarde (identiek
 *  aan MPXJ's eigen volgorde: eerst de flatten-check op het ongeklemde veld, dan pas populateDates'
 *  eigen clamp). */
export interface RecurrenceSpec {
  type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  relative: boolean;
  startDate: Date;
  finishDate: Date | null;
  occurrences: number;
  frequency: number;
  weeklyDayMask: number;   // WEEKLY: bit0=zondag..bit6=zaterdag — MPP se eigen DAY_MASKS-bit-layout
  dayNumber: number;       // MONTHLY/YEARLY
  dayOfWeekValue: number;  // MONTHLY/YEARLY-relatief: 1=zondag..7=zaterdag (DayOfWeekHelper-schema)
  monthNumber: number;     // YEARLY: 1..12
}

/** `RECURRENCE_TYPES` (AbstractCalendarAndExceptionFactory.java) — index = `recurrenceTypeValue`
 *  (SHORT @+72). `null` op index 0 (geen recurrentie) én op elke index buiten dit bereik (een
 *  geprepareerd/corrupt bestand kan hier elke SHORT-waarde 0..65535 claimen) — MPXJ's eigen
 *  `getRecurrenceType(value)===null`-uitkomst, die in de praktijk 0 datums oplevert
 *  (`RecurringData.populateDates`'s switch kent geen default-tak), dus functioneel gelijk aan "geen
 *  recurrentie" — `readRecurringData` hieronder retourneert in dat geval `null`. */
// T4 (MSPDI-pariteit) — geëxporteerd (was module-lokaal): `MSPDIReader.java`'s eigen
// `RECURRENCE_TYPES`/`RELATIVE_MAP`-tabellen zijn LETTERLIJK dezelfde array's als hier (geverifieerd
// tegen de MPXJ-bron, `mspdi/MSPDIReader.java`) — MSPDI's `<Type>`-element draagt exact dezelfde
// codewaarde als MPP se `recurrenceTypeValue`. `mspdiReader.ts` hergebruikt daarom deze tabellen
// rechtstreeks i.p.v. een eigen kopie te onderhouden die stil uit de pas kan lopen. Puur additief —
// geen gedragswijziging aan de MPP-kant.
export const RECURRENCE_TYPES: ReadonlyArray<RecurrenceSpec['type'] | null> = [
  null, 'DAILY', 'YEARLY', 'YEARLY', 'MONTHLY', 'MONTHLY', 'WEEKLY', 'DAILY',
];
/** `RELATIVE_MAP` (idem) — index 3 (YEARLY-relatief) en 5 (MONTHLY-relatief) zijn `true`; alles
 *  erbuiten (incl. WEEKLY=6, DAILY=7, en elke out-of-range index) `false` — spiegelt Java's eigen
 *  `value>=RELATIVE_MAP.length ⇒ false`-terugval (het array is bewust maar 6 lang). Geëxporteerd
 *  (T4) om dezelfde reden als `RECURRENCE_TYPES` hierboven. */
export const RELATIVE_MAP: ReadonlyArray<boolean> = [false, false, false, true, false, true];
/** `ORDERED_RECURRENCE_TYPES` (ProjectCalendar.java) — de precedentie-volgorde waarin recurrente
 *  uitzonderingsGROEPEN over elkaar heen worden gelegd (latere groep wint per datum) vóórdat de
 *  niet-recurrente uitzonderingen als hoogste-prioriteitslaag overheen gaan. Geëxporteerd (T4): MSPDI
 *  kent DEZELFDE precedentie-eis (plan-§T4) en moet dezelfde volgorde-constante gebruiken, niet een
 *  losse kopie die uit de pas kan lopen. */
export const RECURRENCE_PRECEDENCE_ORDER: ReadonlyArray<RecurrenceSpec['type']> = ['WEEKLY', 'MONTHLY', 'YEARLY', 'DAILY'];

/** Losse, grens-gecontroleerde ENKELE-byte-lezer — `mppPrimitives.ts` exporteert alleen
 *  `getShort`/`getInt` (2/4 bytes); de MONTHLY/YEARLY-recurrentievelden (`+76`/`+77`/`+78`) zijn
 *  losse BYTES (`MPPUtility.getByte`). Zelfde grenscontrolediscipline als de gedeelde primitieven. */
function getByteAt(data: Uint8Array, offset: number, ctx: string): number {
  if (offset < 0 || offset + 1 > data.length) {
    throw new Error(`MPP: getByte buiten grenzen (offset=${offset}, bufferlengte=${data.length}) [${ctx}]`);
  }
  return data[offset];
}

/** Poort van `AbstractCalendarAndExceptionFactory.readRecurringData` (het deel van het 92-byte-
 *  uitzonderingsblok vanaf `+72`) — alle vier recurrentietypes × absoluut/relatief, letterlijk naar
 *  de plan-§T3-byte-offsets: WEEKLY dagen-bitmap `+76`/frequentie `+78`; MONTHLY absoluut dagnummer
 *  `+76`/frequentie `+78`, relatief weekdag `+77-2`/dagnummer `+76+1`/frequentie `+78` (SHORT);
 *  YEARLY absoluut dagnummer `+77`/maand `+76+1`, relatief weekdag `+78-2`/dagnummer `+77+1`/maand
 *  `+76+1`. Retourneert `null` voor een out-of-range `recurrenceTypeValue` (zie `RECURRENCE_TYPES`). */
function readRecurringData(data: Uint8Array, offset: number, fromDate: Date, toDate: Date | null, ctx: string): RecurrenceSpec | null {
  const recurrenceTypeValue = getShort(data, offset + 72, ctx);
  const type = recurrenceTypeValue >= 0 && recurrenceTypeValue < RECURRENCE_TYPES.length ? RECURRENCE_TYPES[recurrenceTypeValue] : null;
  if (type === null) return null;
  const relative = recurrenceTypeValue < RELATIVE_MAP.length ? RELATIVE_MAP[recurrenceTypeValue] : false;
  const occurrences = getShort(data, offset + 4, ctx);

  let frequency = 1;
  let weeklyDayMask = 0;
  let dayNumber = 0;
  let dayOfWeekValue = 0;
  let monthNumber = 0;

  switch (type) {
    case 'DAILY':
      // T6-spec-review-fix (zie de historische toelichting bij `isFlattenedNonRecurring` in
      // `readRawExceptions`): `@76` telt UITSLUITEND mee bij recurrenceTypeValue===7 — bij ===1
      // hardcodeert MPXJ frequency=1 (ongeacht `@76`).
      frequency = recurrenceTypeValue === 1 ? 1 : getShort(data, offset + 76, ctx);
      break;
    case 'WEEKLY':
      // De rauwe byte IS al de bitmap in DAY_MASKS-layout (bit0=zondag..bit6=zaterdag) — MPXJ's
      // `setWeeklyDaysFromBitmap(byte, DAY_MASKS)` past exact dezelfde bit-per-index-toewijzing toe
      // (DAY_MASKS = {0x00,0x01,0x02,0x04,0x08,0x10,0x20,0x40}, index 1..7 = zo..za), dus geen
      // vertaalslag nodig — `getWeeklyDates` hieronder toetst met `1 << jsGetUTCDay()`, dezelfde
      // bit-per-weekdag-conventie (JS: 0=zo..6=za).
      weeklyDayMask = getByteAt(data, offset + 76, ctx);
      frequency = getShort(data, offset + 78, ctx);
      break;
    case 'MONTHLY':
      if (relative) {
        dayOfWeekValue = getByteAt(data, offset + 77, ctx) - 2;
        dayNumber = getByteAt(data, offset + 76, ctx) + 1;
        frequency = getShort(data, offset + 78, ctx);
      } else {
        dayNumber = getByteAt(data, offset + 76, ctx);
        frequency = getByteAt(data, offset + 78, ctx);
      }
      break;
    case 'YEARLY':
      if (relative) {
        dayOfWeekValue = getByteAt(data, offset + 78, ctx) - 2;
        dayNumber = getByteAt(data, offset + 77, ctx) + 1;
      } else {
        dayNumber = getByteAt(data, offset + 77, ctx);
      }
      monthNumber = getByteAt(data, offset + 76, ctx) + 1;
      break;
  }

  return { type, relative, startDate: fromDate, finishDate: toDate, occurrences, frequency, weeklyDayMask, dayNumber, dayOfWeekValue, monthNumber };
}

// ── Datumrekenkunde op UTC-middernacht-`Date`'s (zelfde substraat als `getDate`/`formatDate`/
// `parseDate`/`addCalendarDays` uit `@/utils/dateUtils`) — poort van `RecurringData`'s
// `java.time.LocalDate`-rekenkunde. ─────────────────────────────────────────────────────────────

function daysInMonthUtc(year: number, month0: number): number {
  return new Date(Date.UTC(year, month0 + 1, 0)).getUTCDate();
}

/** MPXJ se `DayOfWeekHelper.getValue` (1=zondag..7=zaterdag) toegepast op een UTC-`Date` via
 *  `getUTCDay()` (0=zondag..6=zaterdag) — `+1` is exact de vertaling tussen de twee schema's. */
function mpxjDayValue(d: Date): number {
  return d.getUTCDay() + 1;
}

/** MPXJ se `moreDates(date, dates)` (RecurringData.java): zonder `finishDate` bepaalt `occurrences`
 *  (geklemd op minimaal 1, net als Java) de grens; mét `finishDate` geldt `!date.isAfter(finish)`. */
function moreDates(date: Date, generatedCount: number, finishDate: Date | null, occurrences: number): boolean {
  if (!finishDate) {
    const occ = occurrences < 1 ? 1 : occurrences;
    return generatedCount < occ;
  }
  return date.getTime() <= finishDate.getTime();
}

/** MPXJ se `getOrdinalRelativeDay` — de n-de gevraagde weekdag vanaf `date`. */
function ordinalRelativeDay(date: Date, dayNumber: number, dayOfWeekValue: number): Date {
  const currentDayOfWeek = mpxjDayValue(date);
  let offset = 0;
  if (dayOfWeekValue > currentDayOfWeek) offset = dayOfWeekValue - currentDayOfWeek;
  else if (dayOfWeekValue < currentDayOfWeek) offset = 7 - (currentDayOfWeek - dayOfWeekValue);
  let d = offset !== 0 ? addCalendarDays(date, offset) : date;
  if (dayNumber > 1) d = addCalendarDays(d, 7 * (dayNumber - 1));
  return d;
}

/** MPXJ se `getLastRelativeDay` — de laatste gevraagde weekdag van de maand van `date`. */
function lastRelativeDay(date: Date, dayOfWeekValue: number): Date {
  const year = date.getUTCFullYear();
  const month0 = date.getUTCMonth();
  let d = new Date(Date.UTC(year, month0, daysInMonthUtc(year, month0)));
  const currentDayOfWeek = mpxjDayValue(d);
  let offset = 0;
  if (currentDayOfWeek > dayOfWeekValue) offset = dayOfWeekValue - currentDayOfWeek;
  else if (currentDayOfWeek < dayOfWeekValue) offset = -7 + (dayOfWeekValue - currentDayOfWeek);
  if (offset !== 0) d = addCalendarDays(d, offset);
  return d;
}

/** MPXJ se `getDailyDates`. `MAX_RECURRENCE_DATES` (limits.ts) is een harde generatie-klem,
 *  ONAFHANKELIJK van `finishDate`/`occurrences` — zie die constante se meetcommentaar (de
 *  vijandige-invoer-acceptatie-eis uit plan-§T3: `occurrences=65535` + een 165-jaars bereik moet
 *  binnen 100ms klemmen, niet crashen). */
function getDailyDates(startDate: Date, frequency: number, finishDate: Date | null, occurrences: number): Date[] {
  const dates: Date[] = [];
  let date = startDate;
  while (dates.length < MAX_RECURRENCE_DATES && moreDates(date, dates.length, finishDate, occurrences)) {
    dates.push(date);
    date = addCalendarDays(date, frequency);
  }
  return dates;
}

/** MPXJ se `getWeeklyDates`. `currentDay` cyclet 0=zo..6=za (JS `getUTCDay()`), wat toevallig
 *  identiek is aan `dayMask`'s bit-layout (zie `readRecurringData`'s WEEKLY-toelichting) — geen
 *  aparte vertaaltabel nodig. De "terug naar zondag"-aanpassing gebruikt eveneens plain `jsDay`
 *  (Java se `currentDay.getValue()` — STANDAARD `java.time.DayOfWeek` 1=ma..7=zo, NIET
 *  DayOfWeekHelper se schema — komt toevallig 1:1 overeen met JS se `getUTCDay()` voor elke
 *  niet-zondag-waarde: ma=1..za=6 in beide schema's). */
function getWeeklyDates(startDate: Date, frequency: number, dayMask: number, finishDate: Date | null, occurrences: number): Date[] {
  const dates: Date[] = [];
  let date = startDate;
  let currentDay = date.getUTCDay();
  if (currentDay !== 0) {
    date = addCalendarDays(date, -currentDay);
    currentDay = 0;
  }
  while (dates.length < MAX_RECURRENCE_DATES && moreDates(date, dates.length, finishDate, occurrences)) {
    let offset = 0;
    for (let dayIndex = 0; dayIndex < 7 && dates.length < MAX_RECURRENCE_DATES; dayIndex++) {
      if ((dayMask & (1 << currentDay)) !== 0) {
        if (offset !== 0) {
          date = addCalendarDays(date, offset);
          offset = 0;
        }
        if (!moreDates(date, dates.length, finishDate, occurrences)) break;
        if (date.getTime() >= startDate.getTime()) dates.push(date);
      }
      offset++;
      currentDay = (currentDay + 1) % 7;
    }
    if (frequency > 1) offset += 7 * (frequency - 1);
    date = addCalendarDays(date, offset);
  }
  return dates;
}

/** MPXJ se `getMonthlyAbsoluteDates`. */
function getMonthlyAbsoluteDates(startDate: Date, frequency: number, dayNumber: number, finishDate: Date | null, occurrences: number): Date[] {
  const dates: Date[] = [];
  const currentDayNumber = startDate.getUTCDate();
  let date = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), 1));
  if (dayNumber < currentDayNumber) date = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1));
  while (dates.length < MAX_RECURRENCE_DATES && moreDates(date, dates.length, finishDate, occurrences)) {
    const year = date.getUTCFullYear();
    const month0 = date.getUTCMonth();
    const useDay = Math.min(dayNumber, daysInMonthUtc(year, month0));
    date = new Date(Date.UTC(year, month0, useDay));
    dates.push(date);
    date = new Date(Date.UTC(year, month0, 1));
    date = new Date(Date.UTC(year, month0 + frequency, 1));
  }
  return dates;
}

/** MPXJ se `getMonthlyRelativeDates`. */
function getMonthlyRelativeDates(startDate: Date, frequency: number, dayOfWeekValue: number, dayNumber: number, finishDate: Date | null, occurrences: number): Date[] {
  const dates: Date[] = [];
  let date = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), 1));
  while (dates.length < MAX_RECURRENCE_DATES && moreDates(date, dates.length, finishDate, occurrences)) {
    date = dayNumber > 4 ? lastRelativeDay(date, dayOfWeekValue) : ordinalRelativeDay(date, dayNumber, dayOfWeekValue);
    if (date.getTime() >= startDate.getTime()) {
      dates.push(date);
      if (!moreDates(date, dates.length, finishDate, occurrences)) break;
    }
    date = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
    date = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + frequency, 1));
  }
  return dates;
}

/** MPXJ se `getYearlyAbsoluteDates`. LET OP (letterlijk overgenomen MPXJ-gedrag, geen eigen bug):
 *  de WHILE-conditie toetst de cursor VÓÓR de `date.isBefore(startDate) ⇒ +1 jaar`-correctie, dus
 *  het laatst toegevoegde datum kan net BUITEN het nominale `[startDate,finishDate]`-venster vallen
 *  (spiegelt `getCalculatedLastDate`'s eigen documentatie: "de finish-datum hoeft niet exact op een
 *  gegenereerde datum te liggen"). */
function getYearlyAbsoluteDates(startDate: Date, dayNumber: number, monthNumber: number, finishDate: Date | null, occurrences: number): Date[] {
  const dates: Date[] = [];
  let date = new Date(Date.UTC(startDate.getUTCFullYear(), monthNumber - 1, 1));
  while (dates.length < MAX_RECURRENCE_DATES && moreDates(date, dates.length, finishDate, occurrences)) {
    const year = date.getUTCFullYear();
    const month0 = date.getUTCMonth();
    const useDay = Math.min(dayNumber, daysInMonthUtc(year, month0));
    date = new Date(Date.UTC(year, month0, useDay));
    if (date.getTime() < startDate.getTime()) date = new Date(Date.UTC(year + 1, month0, useDay));
    dates.push(date);
    date = new Date(Date.UTC(date.getUTCFullYear(), month0, 1));
    date = new Date(Date.UTC(date.getUTCFullYear() + 1, month0, 1));
  }
  return dates;
}

/** MPXJ se `getYearlyRelativeDates`. */
function getYearlyRelativeDates(startDate: Date, dayOfWeekValue: number, dayNumber: number, monthNumber: number, finishDate: Date | null, occurrences: number): Date[] {
  const dates: Date[] = [];
  let date = new Date(Date.UTC(startDate.getUTCFullYear(), monthNumber - 1, 1));
  while (dates.length < MAX_RECURRENCE_DATES && moreDates(date, dates.length, finishDate, occurrences)) {
    date = dayNumber > 4 ? lastRelativeDay(date, dayOfWeekValue) : ordinalRelativeDay(date, dayNumber, dayOfWeekValue);
    if (date.getTime() >= startDate.getTime()) {
      dates.push(date);
      if (!moreDates(date, dates.length, finishDate, occurrences)) break;
    }
    date = new Date(Date.UTC(date.getUTCFullYear() + 1, date.getUTCMonth(), 1));
  }
  return dates;
}

/** Poort van `RecurringData.populateDates()`/`getDates()` — dispatcht naar de generatiefunctie voor
 *  `spec.type`. `frequency<1 ⇒ 1` (Java se eigen `NumberHelper.getInt(m_frequency)<1 ⇒ 1`-vangnet in
 *  `populateDates`, hier vlak vóór dispatch i.p.v. in elke generatiefunctie apart). Geëxporteerd
 *  zodat testcode (`check-mpp-calendars.ts`) 'm rechtstreeks kan aanroepen (mutatiebewijs op de
 *  YEARLY-tak specifiek, plan-§T3 acceptatie 2) zonder de volledige `parseExceptions`-orkestratie na
 *  te hoeven bouwen. */
export function expandRecurrence(spec: RecurrenceSpec): Date[] {
  const frequency = spec.frequency < 1 ? 1 : spec.frequency;
  switch (spec.type) {
    case 'DAILY':
      return getDailyDates(spec.startDate, frequency, spec.finishDate, spec.occurrences);
    case 'WEEKLY':
      return getWeeklyDates(spec.startDate, frequency, spec.weeklyDayMask, spec.finishDate, spec.occurrences);
    case 'MONTHLY':
      return spec.relative
        ? getMonthlyRelativeDates(spec.startDate, frequency, spec.dayOfWeekValue, spec.dayNumber, spec.finishDate, spec.occurrences)
        : getMonthlyAbsoluteDates(spec.startDate, frequency, spec.dayNumber, spec.finishDate, spec.occurrences);
    case 'YEARLY':
      return spec.relative
        ? getYearlyRelativeDates(spec.startDate, spec.dayOfWeekValue, spec.dayNumber, spec.monthNumber, spec.finishDate, spec.occurrences)
        : getYearlyAbsoluteDates(spec.startDate, spec.dayNumber, spec.monthNumber, spec.finishDate, spec.occurrences);
  }
}

/** Eén RUW gelezen 92-byte-uitzonderingsblok — vóór precedentie-resolutie. `recurring` is gezet
 *  voor een NIET-geflattende recurrente uitzondering (zie `isFlattenedNonRecurring` in
 *  `readRawExceptions`); anders `null` en geldt het venster als een letterlijk
 *  [fromDate,toDate]-bereik (bestaand T6-gedrag, spiegelt mspdiReader's `DayWorking`-exceptions). */
interface RawException {
  fromDate: Date;
  toDate: Date | null;
  periodCount: number;
  bands: { start: number; end: number }[];
  name: string;
  recurring: RecurrenceSpec | null;
}

/** Eén uitzonderingsblok se werktijd-BANDEN (`+20+i*2` start, `+32+i*4` duur — plan-§T3) — gezet
 *  wanneer `periodCount>0` ("werkende uitzondering", MS Project: een anders niet-werkende dag krijgt
 *  eigen uren). `MAX_EXCEPTION_BAND_PERIODS` (limits.ts) is de structurele capaciteit van het
 *  92-byte-blok zelf (spiegelt `MAX_DAY_HOUR_PERIODS`'s klemdiscipline voor het 60-byte-dagblok). */
function readExceptionBands(data: Uint8Array, offset: number, periodCountRaw: number, ctx: string): { start: number; end: number }[] {
  const periodCount = Math.min(Math.max(periodCountRaw, 0), MAX_EXCEPTION_BAND_PERIODS);
  const bands: { start: number; end: number }[] = [];
  for (let i = 0; i < periodCount; i++) {
    const startOffset = offset + 20 + i * 2;
    const durationOffset = offset + 32 + i * 4;
    if (data.length < startOffset + 2 || data.length < durationOffset + 2) break;
    const startMinutes = mppTimeToMinutes(getShort(data, startOffset, ctx));
    const durationMinutes = Math.floor(getShort(data, durationOffset, ctx) / 10);
    if (durationMinutes > 0) bands.push({ start: startMinutes, end: startMinutes + durationMinutes });
  }
  return bands;
}

/** Eén uitzonderingenblok (`AbstractCalendarAndExceptionFactory.processCalendarExceptions`) →
 *  RUWE `RawException[]` — nog GEEN precedentie-resolutie (die doet `resolveExceptions`). Elk
 *  record met een leesbare `fromDate` (sentinel `65535 ⇒ null` — zie `getDate`) én ofwel een geldig
 *  recurrentiepatroon ofwel géén recurrentie wordt bewaard; een out-of-range `recurrenceTypeValue`
 *  (`readRecurringData` retourneert dan `null` terwijl `isFlattenedNonRecurring` ook `false` is)
 *  wordt STIL OVERGESLAGEN — spiegelt MPXJ's eigen uitkomst van 0 geëxpandeerde datums voor zo'n
 *  record (zie `RECURRENCE_TYPES`'s toelichting), functioneel gelijk zonder een nutteloos
 *  `RawException` met een lege datumlijst te hoeven dragen. */
function readRawExceptions(data: Uint8Array, ctx: string): RawException[] {
  const out: RawException[] = [];
  // I1-fix (T6-kwaliteitsreview): was `data.length <= 420` — bij length===421 gleed dat door de
  // guard heen en liet `getShort(data, 420, ctx)` twee bytes lezen die maar deels beschikbaar zijn
  // (420+2=422 > 421), wat een `MPP:`-grensfout gooide die — vóór de I1-try/catch-fix in
  // `readCalendars` — de HELE `readMPP`-aanroep liet falen voor wat verder een prima leesbaar
  // bestand kan zijn. `< 422` is de correcte grens: 422 bytes is het minimum om de 2-byte
  // `exceptionCount` op offset 420 veilig te kunnen lezen.
  if (data.length < 422) return out;
  const rawExceptionCount = getShort(data, 420, ctx);
  if (rawExceptionCount === 0) return out;
  const exceptionCount = Math.min(Math.max(rawExceptionCount, 0), MAX_CALENDAR_EXCEPTIONS); // zie MAX_CALENDAR_EXCEPTIONS

  let offset = 424;
  for (let index = 0; index < exceptionCount; index++) {
    if (offset + 92 > data.length) break; // afgekapt blok — MPP14Reader.java breekt hier ook af

    const fromDate = getDate(data, offset, ctx);
    const toDate = getDate(data, offset + 2, ctx);
    const periodCountRaw = getShort(data, offset + 14, ctx);
    const recurrenceTypeValue = getShort(data, offset + 72, ctx);

    let exceptionNameLength = getInt(data, offset + 88, ctx);
    if (exceptionNameLength % 4 !== 0) exceptionNameLength = (Math.floor(exceptionNameLength / 4) + 1) * 4;
    // I1-stijl klem (zie MAX_CALENDAR_TEXT_BYTES): begrenst zowel het decodeerwerk als — op een
    // hostile bestand — de offset-opschuiving naar de volgende uitzondering; op elk realistisch
    // bestand (naam ruim onder 64 KiB) is dit een no-op.
    exceptionNameLength = Math.max(0, Math.min(exceptionNameLength, MAX_CALENDAR_TEXT_BYTES));

    if (fromDate) {
      // T6-spec-review-fix (zie `readRecurringData`'s DAILY-toelichting): `@76` telt UITSLUITEND
      // mee bij recurrenceTypeValue===7 — bij ===1 hardcodeert MPXJ frequency=1 (ongeacht `@76`).
      const isDaily = recurrenceTypeValue === 1 || recurrenceTypeValue === 7;
      const rawFrequency = recurrenceTypeValue === 1 ? 1 : getShort(data, offset + 76, ctx);
      const isFlattenedNonRecurring = recurrenceTypeValue === 0 || (isDaily && rawFrequency === 1);

      let recurring: RecurrenceSpec | null = null;
      let contributesNothing = false;
      if (!isFlattenedNonRecurring) {
        recurring = readRecurringData(data, offset, fromDate, toDate, ctx);
        contributesNothing = recurring === null; // out-of-range recurrenceTypeValue — zie RECURRENCE_TYPES
      }

      if (!contributesNothing) {
        const bands = readExceptionBands(data, offset, periodCountRaw, ctx);
        let name = '';
        if (exceptionNameLength > 0 && data.length >= offset + 92 + exceptionNameLength) {
          const decoded = getUnicodeString(data, offset + 92, exceptionNameLength, ctx);
          if (decoded) name = decoded;
        }
        out.push({
          fromDate,
          toDate,
          periodCount: Math.min(Math.max(periodCountRaw, 0), MAX_EXCEPTION_BAND_PERIODS),
          bands,
          name,
          recurring,
        });
      }
    }
    offset += 92 + exceptionNameLength;
  }
  return out;
}

/** Eén brondocument-record se EIGEN, geordende datumlijst — voor recurrente records de geëxpandeerde
 *  datums (`expandRecurrence`), voor niet-recurrente records het (geklemde) dag-voor-dag-bereik
 *  [fromDate,clampedToDate] (bestaand T6-gedrag, ONGEWIJZIGD qua bereik-klem — zie
 *  `MAX_HOLIDAY_RANGE_DAYS`). Draagt tevens de WAARDE die deze bron voor elke dag in die lijst
 *  claimt (`working`/`bands`/`name`) — `resolveExceptions` beslist per datum of die claim de
 *  autoriteitskaart wint. Geëxporteerd (T4): `mspdiReader.ts` bouwt zijn EIGEN ruwe-record-opbouw
 *  (XML-elementnamen i.p.v. 92-byte-offsets — dát deel kan niet gedeeld worden) maar geeft het
 *  resultaat aan dezelfde `resolveContributions` door, zodat de precedentie-/invariant-garantie
 *  niet in een tweede, potentieel-divergerende implementatie hoeft te worden herbouwd. */
export interface RecordContribution {
  ownDates: Date[];
  working: boolean;
  bands: { start: number; end: number }[];
  name: string;
}

/** Groepeert `raw` in `RecordContribution`'s, in PRECEDENTIE-VOLGORDE: eerst recurrente records per
 *  `RECURRENCE_PRECEDENCE_ORDER`-groep (WEEKLY→MONTHLY→YEARLY→DAILY; binnen één groep in
 *  brondocument-volgorde), dan niet-recurrente records (in brondocument-volgorde) — exact de
 *  volgorde waarin `resolveExceptions` ze over de autoriteitskaart legt (latere contributie wint per
 *  datum). */
function buildContributions(raw: RawException[]): RecordContribution[] {
  const contributions: RecordContribution[] = [];
  const recurringByType = new Map<RecurrenceSpec['type'], RawException[]>();
  const nonRecurring: RawException[] = [];
  for (const exc of raw) {
    if (exc.recurring) {
      const bucket = recurringByType.get(exc.recurring.type);
      if (bucket) bucket.push(exc);
      else recurringByType.set(exc.recurring.type, [exc]);
    } else if (exc.toDate) {
      // Niet-recurrent ZONDER toDate (sentinel `65535`) wordt overgeslagen — bestaand T6-gedrag.
      nonRecurring.push(exc);
    }
  }

  for (const type of RECURRENCE_PRECEDENCE_ORDER) {
    for (const exc of recurringByType.get(type) ?? []) {
      const rd = exc.recurring;
      /* v8 ignore next */
      if (!rd) continue; // defensief onbereikbaar — bucket is al op recurring-aanwezigheid gefilterd
      contributions.push({ ownDates: expandRecurrence(rd), working: exc.periodCount > 0, bands: exc.bands, name: exc.name });
    }
  }

  for (const exc of nonRecurring) {
    const toDate = exc.toDate as Date; // gegarandeerd niet-null door het filter hierboven
    let clampedTo = toDate;
    const rangeDays = Math.round((toDate.getTime() - exc.fromDate.getTime()) / 86_400_000);
    // M1-fix (T6-kwaliteitsreview, ongewijzigd voortgezet): `>=` i.p.v. `>` maakt
    // `MAX_HOLIDAY_RANGE_DAYS` de ECHTE (inclusieve) bovengrens op het aantal dagen.
    if (rangeDays >= MAX_HOLIDAY_RANGE_DAYS) {
      clampedTo = addCalendarDays(exc.fromDate, MAX_HOLIDAY_RANGE_DAYS - 1);
    } else if (rangeDays < 0) {
      clampedTo = exc.fromDate; // omgekeerd bereik: degradeer naar 1 dag i.p.v. een lege/negatieve marge
    }
    const ownDates: Date[] = [];
    let cursor = exc.fromDate;
    while (cursor.getTime() <= clampedTo.getTime()) {
      ownDates.push(cursor);
      cursor = addCalendarDays(cursor, 1);
    }
    contributions.push({ ownDates, working: exc.periodCount > 0, bands: exc.bands, name: exc.name });
  }

  return contributions;
}

function isNextCalendarDay(prevIso: string, iso: string): boolean {
  return formatDate(addCalendarDays(parseDate(prevIso), 1)) === iso;
}

/** Precedentie-resolutie over `contributions` (al in de juiste volgorde — zie `buildContributions`):
 *  bouwt EERST een per-datum-autoriteitskaart (`authority`) door ELKE dag van ELKE contributie in
 *  volgorde te zetten (latere `.set()` wint) — dit IS de invariant-garantie (T2-review LAAG-6/7):
 *  per datum bestaat er precies één beslissing, ongeacht hoeveel brondocument-records diezelfde dag
 *  claimen of via welke twee-verschillende-fromDates-botsing MPXJ's eigen kaart dat zou missen. De
 *  kaart bewaart de WINNENDE CONTRIBUTIE-INDEX (niet de waarde zelf) — BLOKKEREND detail: twee
 *  VERSCHILLENDE contributies kunnen toevallig een IDENTIEKE waarde claimen voor dezelfde dag (bv.
 *  twee ongenaamde, bandloze feestdag-records) — een waarde-gelijkheids-toets zou dan niet kunnen
 *  onderscheiden welke van de twee "gewonnen" heeft, en zou de dag bij BEIDE contributies als
 *  "overleefd" laten gelden (dubbele output-entries voor dezelfde dag). Identiteit via index sluit
 *  dat expliciet uit. `budget` wordt hier verbruikt (één slot per dag die de kaart daadwerkelijk
 *  bereikt) — dit is STRIKTER dan "één slot per output-entry" (een lange reeks wordt hier per DAG
 *  afgeboekt, niet per bereik), bewust conservatief: het bindt de kaart se eigen geheugengrootte,
 *  niet alleen de uiteindelijke entry-telling.
 *
 *  DAARNA worden de OORSPRONKELIJKE contributies opnieuw doorlopen (zelfde volgorde) om de
 *  outputvorm te bepalen: voor elke contributie (op INDEX) wordt gekeken welke van haar EIGEN dagen
 *  de autoriteitskaart nog steeds aan HAAR (exact díe index) toekent — aaneengesloten overlevende
 *  dagen worden samengevoegd tot één bereik-entry. Een record wiens dagen NOOIT door iets anders
 *  geclaimd worden (het overgrote-merendeel-geval — elke bestaande T6-fixture) levert dus
 *  BYTE-IDENTIEKE output aan vóór deze taak: één entry per record, ONGEACHT of een ANDER,
 *  ongerelateerd record toevallig een aangrenzende datum claimt (dat wordt NOOIT meegenomen in
 *  dezelfde entry — samenvoeging gebeurt uitsluitend BINNEN de dagenlijst van ÉÉN contributie, nooit
 *  ACROSS records). Geëxporteerd (T4) — zie `RecordContribution`'s toelichting: dit is de gedeelde
 *  precedentie-/invariant-motor die `mspdiReader.ts` rechtstreeks hergebruikt in plaats van een
 *  tweede expansie te bouwen. */
export function resolveContributions(contributions: RecordContribution[], budget: HolidayBudget): ParsedExceptions {
  const authority = new Map<string, number>(); // ISO-datum → winnende contributie-index
  outer: for (let i = 0; i < contributions.length; i++) {
    for (const date of contributions[i].ownDates) {
      if (budget.remaining <= 0) break outer;
      authority.set(formatDate(date), i);
      budget.remaining--;
    }
  }

  const holidays: Holiday[] = [];
  const workingExceptions: WorkingException[] = [];
  for (let i = 0; i < contributions.length; i++) {
    const c = contributions[i];
    let runStart: string | null = null;
    let runEnd: string | null = null;
    const flush = (): void => {
      if (runStart === null || runEnd === null) return;
      const name = c.name || (c.working ? 'Working exception' : 'Holiday');
      if (c.working) workingExceptions.push({ name, startDate: runStart, endDate: runEnd, bands: c.bands.length ? c.bands : undefined });
      else holidays.push({ name, startDate: runStart, endDate: runEnd });
    };
    for (const date of c.ownDates) {
      const iso = formatDate(date);
      const survives = authority.get(iso) === i;
      if (!survives) {
        flush();
        runStart = null;
        runEnd = null;
        continue;
      }
      if (runStart === null) {
        runStart = iso;
      } else if (runEnd !== null && !isNextCalendarDay(runEnd, iso)) {
        flush();
        runStart = iso;
      }
      runEnd = iso;
    }
    flush();
  }

  return { holidays, workingExceptions };
}

/** Poort van `AbstractCalendarAndExceptionFactory.processCalendarExceptions` + de T3-uitbreiding
 *  (recurrente expansie + werkende uitzonderingen) — zie de sectiekop hierboven voor de volledige
 *  ontwerptoelichting. `budget` (T6-kwaliteitsreview C1, ongewijzigd voortgezet) blijft het gedeelde
 *  `HolidayBudget` over ALLE kalenders in de aanroepende `readCalendars`-run, nu gedeeld door zowel
 *  `holidays` ALS `workingExceptions` (Opus-T2-review-eis: werkende uitzonderingen tellen mee in
 *  hetzelfde budget). */
export function parseExceptions(data: Uint8Array, ctx: string, budget: HolidayBudget): ParsedExceptions {
  return resolveContributions(buildContributions(readRawExceptions(data, ctx)), budget);
}

/** Herexpandeert een AL GERESOLVEDE (compacte) `Holiday`/`WorkingException`-reeks — voor
 *  overervingsdoeleinden (`mergeInherited` hieronder): de basiskalender se holidays/
 *  workingExceptions zijn zelf al `resolveExceptions`-uitvoer (dus al binnen alle bestaande klemmen
 *  gematerialiseerd), maar moeten opnieuw dag-voor-dag beschikbaar zijn om tegen de EIGEN
 *  uitzonderingen van de afgeleide kalender te kunnen prioriteren (`resolveExceptions` beslist per
 *  DAG, niet per bereik — zie `resolveContributions`). Geklemd op `MAX_RECURRENCE_DATES` als eigen veiligheidsgrens (onafhankelijk
 *  van `budget` — dit is een HER-expansie van reeds-gematerialiseerde, dus al geklemde, data, geen
 *  nieuwe bestandsgestuurde lus, maar een dubbele klem kost niets en voorkomt een verrassing als een
 *  toekomstige wijziging die garantie ooit verzwakt). */
function reExpandRange(startIso: string, endIso: string): Date[] {
  const start = parseDate(startIso);
  const end = parseDate(endIso);
  const rangeDays = Math.max(0, Math.round((end.getTime() - start.getTime()) / 86_400_000));
  const cappedDays = Math.min(rangeDays, MAX_RECURRENCE_DATES - 1);
  const out: Date[] = [];
  for (let i = 0; i <= cappedDays; i++) out.push(addCalendarDays(start, i));
  return out;
}

/** Overervingsregel afgeleide kalender (plan-§T3, verplichte stap): "eigen uitzondering wint per
 *  datum van de basiskalender" — MPXJ valt pas op de ouder terug als de eigen kalender die datum
 *  niet kent. Herbruikt `resolveContributions`'s autoriteitskaart-mechanisme: de basiskalender se
 *  ALREADY-gematerialiseerde `holidays`/`workingExceptions` worden als LAAGSTE-prioriteit-
 *  contributies aangeboden (herexpansie via `reExpandRange`), gevolgd door de afgeleide kalender se
 *  EIGEN rauwe uitzonderingen op hun gebruikelijke interne precedentie — exact dezelfde
 *  "latere-contributie-wint-per-datum"-mechaniek als binnen één kalender, nu toegepast over de
 *  basis→afgeleide-grens heen. Vervangt de oude `budgetedInherit`'s kale `[...base, ...own]`-concat,
 *  die geen per-datum-precedentie kon uitdrukken zodra werkende uitzonderingen bestaan. */
function mergeInherited(base: ParsedExceptions, ownContributions: RecordContribution[], budget: HolidayBudget): ParsedExceptions {
  const baseContributions: RecordContribution[] = [
    ...base.holidays.map((h) => ({ ownDates: reExpandRange(h.startDate, h.endDate), working: false, bands: [], name: h.name })),
    ...base.workingExceptions.map((w) => ({ ownDates: reExpandRange(w.startDate, w.endDate), working: true, bands: w.bands ?? [], name: w.name })),
  ];
  return resolveContributions([...baseContributions, ...ownContributions], budget);
}

/** Eén ruwe TBkndCal/FixedData-record (12 bytes): kalender-uniqueID + base-kalender-uniqueID +
 *  resource-uniqueID. Veldvolgorde is versie-afhankelijk (`MPP14CalendarFactory.java`'s
 *  constructor) — zie `readCalendars`'s `calendarIdOffset`/`baseIdOffset`/`resourceIdOffset`. */
interface RawCalendarEntry {
  calendarUniqueId: number;
  baseCalendarUniqueId: number;
  resourceUniqueId: number;
}

export interface CalendarReadResult {
  /** Alle gematerialiseerde kalenders (basis + afgeleide), MPP-uniqueID → `WorkCalendar`. */
  calendarByUniqueId: ReadonlyMap<number, WorkCalendar>;
  /** De gekozen PROJECTkalender (DEFAULT_CALENDAR_NAME-lookup, met terugval — zie de toelichting
   *  bij de projectkalender-selectie onderaan `readCalendars`). Altijd gezet (nooit `undefined`) —
   *  bij een lege/onleesbare TBkndCal-storage is dit de generieke `createDefaultCalendar()`, zelfde
   *  terugval als de T5-placeholder die deze module vervangt. */
  projectCalendar: WorkCalendar;
  /** Alle overige kalenders (alles behalve `projectCalendar`) — spiegelt mspdiReader's
   *  `resourceCalendars` (elk `<Calendar>`-element behalve UID 1). */
  resourceCalendars: WorkCalendar[];
  /** MPP resource-uniqueID → kalender-uniqueID (`AbstractCalendarFactory`'s `resourceMap`) — voor
   *  T7's `Resource.calendarId`-koppeling (TBkndRsc); T6 zelf verbruikt dit nog niet (er zijn nog
   *  geen `Resource`-objecten om aan te koppelen). */
  resourceCalendarUniqueIdByResourceUniqueId: ReadonlyMap<number, number>;
  /** DIAGNOSTISCHE telling (T6-slot, her-check; T6-kwaliteitsreview M5 — herformulering: dit is
   *  GEEN productiedata die `readMPP`/`ImportResult` verder verbruikt, uitsluitend een meethaakje
   *  voor testcode zoals `check-mpp-calendars.ts`'s crawl-sectie): MPP-uniqueID → aantal EIGEN
   *  uitzonderingen van díe kalender. Nodig omdat een afgeleide kalender se `holidays`-array
   *  `[...baseCal.holidays, ...ownHolidays]` bevat (zie Fase 2 hieronder) — een consument die
   *  simpelweg `.holidays.length` per kalender optelt zou de basiskalender se feestdagen ÉÉN KEER
   *  PER AFGELEIDE KALENDER dubbeltellen. Deze map draagt uitsluitend het EIGEN aandeel
   *  (basiskalenders: hun volledige `holidays`, want daar bestaat geen overerving; afgeleide
   *  kalenders: alleen `ownHolidays`) — zodat een dubbeltelvrije som over ALLE kalenders mogelijk is
   *  zonder de interne overervingsstructuur te hoeven kennen. */
  ownHolidayCountByUniqueId: ReadonlyMap<number, number>;
}

/** Terugval bij een ontbrekende/onleesbare TBkndCal-storage — zelfde vangnet als de T5-placeholder
 *  die deze functie vervangt (`createDefaultCalendar()`, geen kalenders). */
function fallbackResult(): CalendarReadResult {
  return {
    calendarByUniqueId: new Map(),
    projectCalendar: createDefaultCalendar(),
    resourceCalendars: [],
    resourceCalendarUniqueIdByResourceUniqueId: new Map(),
    ownHolidayCountByUniqueId: new Map(),
  };
}

/**
 * Entry point (T6). Poort van `AbstractCalendarFactory.processCalendarData` +
 * `MPP14CalendarFactory`'s versie-afhankelijke veldoffsets. `applicationVersion` komt uit
 * `detectApplicationVersion` (mppContainer.ts) — `null`/laag ⇒ de ≤2010-veldlayout, precies zoals
 * MPXJ's eigen `NumberHelper.getInt(null) === 0`-terugval (zie ook `milestoneBitFlag` in
 * mppReader.ts voor hetzelfde patroon).
 *
 * `hoursPerDayOverride` (T6-spec-review-fix, minor b) — de MINUTES_PER_DAY-projecteigenschap, of
 * `null` als die afwezig/ongeldig was (`mppReader.ts`'s `parseProjectProperties`). Wordt UITSLUITEND
 * toegepast op de kalender die uiteindelijk de PROJECTkalender wordt (zie `projectCalendarUid`
 * hieronder) — spiegelt mspdiReader, waar de MinutesPerDay-override alleen in `parseCalendar` zit
 * (nooit op resource-kalenders). Om de override VÓÓR `promoteHourCalendar` te kunnen toepassen (zie
 * `buildCalendarFromDays`'s toelichting) moet de identiteit van de projectkalender al bekend zijn
 * VÓÓR de materialisatie-lussen — vandaar dat de naam-lookup hier vooraan staat i.p.v. achteraan.
 *
 * I1-fix (T6-kwaliteitsreview): dunne, ALTIJD-vangende wrapper rond `readCalendarsUnsafe` —
 * voorheen was alleen de FixedMeta/FixedData/VarMeta-CONSTRUCTIE in een try/catch gevangen; Fase 1/2
 * (de eigenlijke materialisatie) zaten daarbuiten, dus een primitief-grensfout DAAR (bv. de
 * off-by-one op `data.length<=420` — zie `parseExceptions`) liet de belofte "een kapotte
 * kalendersectie blokkeert de import niet" (het commentaar stond er al) niet waarmaken: zo'n fout
 * gooide dwars door `readCalendars` heen, `mppReader.ts` ving 'm nergens op, en de HELE `readMPP`-
 * aanroep faalde voor wat verder een prima leesbaar bestand kan zijn. */
export function readCalendars(
  cfb: CfbFile,
  projectProps: Props,
  applicationVersion: number | null,
  hoursPerDayOverride: number | null = null,
): CalendarReadResult {
  try {
    return readCalendarsUnsafe(cfb, projectProps, applicationVersion, hoursPerDayOverride);
  } catch {
    return fallbackResult();
  }
}

function readCalendarsUnsafe(
  cfb: CfbFile,
  projectProps: Props,
  applicationVersion: number | null,
  hoursPerDayOverride: number | null,
): CalendarReadResult {
  const label = '"   114"/TBkndCal';
  const fixedMetaBytes = cfb.getStream(['   114', 'TBkndCal', 'FixedMeta']);
  const fixedDataBytes = cfb.getStream(['   114', 'TBkndCal', 'FixedData']);
  const varMetaBytes = cfb.getStream(['   114', 'TBkndCal', 'VarMeta']);
  const var2DataBytes = cfb.getStream(['   114', 'TBkndCal', 'Var2Data']); // legitiem afwezig (mppPrimitives.ts)

  if (!fixedMetaBytes || !fixedDataBytes || !varMetaBytes) {
    // Geen (volledige) TBkndCal-storage — geen kalenders te lezen; val terug op de generieke
    // standaardkalender (zelfde vangnet als de T5-placeholder die deze functie vervangt).
    return fallbackResult();
  }

  const fixedMeta = FixedMeta.withItemSize(fixedMetaBytes, CAL_FIXED_META_ITEM_SIZE, `${label}/FixedMeta`);
  const fixedData = FixedData.fromMeta(fixedMeta, fixedDataBytes, CAL_FIXED_DATA_MAX_SIZE, 0, `${label}/FixedData`);
  const varMeta = new VarMeta12(varMetaBytes, `${label}/VarMeta`);
  const varData = new Var2Data(varMeta, var2DataBytes);

  // MPP14CalendarFactory.java: > ApplicationVersion.PROJECT_2010 (14) ⇒ 2013+-veldlayout.
  const useModernOffsets = (applicationVersion ?? 0) > 14;
  const calendarIdOffset = useModernOffsets ? 8 : 0;
  const baseIdOffset = useModernOffsets ? 0 : 4;
  const resourceIdOffset = useModernOffsets ? 4 : 8;

  // ── Ruwe FixedData-records → uniek per calendarUniqueId (eerste-wint, spiegelt Java's
  // `!calendarMap.containsKey(calendarID)`-guard). C1 (kwaliteitsreview): de lus stopt zodra
  // `rawByUniqueId.size` `MAX_CALENDARS` raakt — zie die constante se toelichting (100.001 nep-
  // records ⇒ OOM zonder deze klem). ────────────────────────────────────────────────────────────
  const rawByUniqueId = new Map<number, RawCalendarEntry>();
  const itemCount = fixedData.getItemCount();
  for (let index = 0; index < itemCount && rawByUniqueId.size < MAX_CALENDARS; index++) {
    const item = fixedData.getByteArrayValue(index);
    if (!item || item.length < 12) continue; // 12 bytes = max(calendarIdOffset,baseIdOffset,resourceIdOffset)+4
    const calendarUniqueId = getInt(item, calendarIdOffset, `${label}/FixedData calendarId`);
    if (calendarUniqueId <= 0 || rawByUniqueId.has(calendarUniqueId)) continue;
    const baseCalendarUniqueId = getInt(item, baseIdOffset, `${label}/FixedData baseId`);
    const resourceUniqueId = getInt(item, resourceIdOffset, `${label}/FixedData resourceId`);
    rawByUniqueId.set(calendarUniqueId, { calendarUniqueId, baseCalendarUniqueId, resourceUniqueId });
  }
  if (rawByUniqueId.size === 0) return fallbackResult();

  const defaultCalendarHoursBytes = projectProps.getByteArray(PROPS_KEY_DEFAULT_CALENDAR_HOURS);
  const projectDefaultDays = resolveDays(defaultCalendarHoursBytes, STANDARD_DAY_HOURS_FALLBACK, `${label}/defaultCalendarHours`);

  const calendarByUniqueId = new Map<number, WorkCalendar>();
  const daysByUniqueId = new Map<number, DayResolution[]>();
  const resourceCalendarUniqueIdByResourceUniqueId = new Map<number, number>();
  const ownHolidayCountByUniqueId = new Map<number, number>();
  const baseCalendarUniqueIds = new Set<number>();
  // C1 (kwaliteitsreview): ÉÉN gedeeld budget over ALLE kalenders in deze aanroep — zie
  // `MAX_TOTAL_HOLIDAY_SLOTS`. Elke `parseExceptions`-aanroep (Fase 1 én 2) en de base→afgeleide-
  // overervingskopie (Fase 2, `mergeInherited` → `resolveContributions`) decrementeren 'm — sinds
  // T3 óók per gematerialiseerde `workingException`-dag, niet alleen holidays (Opus-T2-review-eis).
  const holidayBudget = newHolidayBudget();

  // I3-fix (T6-kwaliteitsreview): `nameOf` scande voorheen 2× per kalender (eerst voor de
  // projectkalender-naam-lookup hieronder, dan nogmaals in `nameOfOrFallback` tijdens materialisatie)
  // ZONDER cache — bij een gedeelde, grote (tot 64 KiB) naam-var-data-offset (legitiem, zie
  // Var2Data's moduleheader in mppPrimitives.ts) kost dat dubbel scanwerk per kalender. Gemeten:
  // 8.000 kalenders die een 64 KiB-naam delen ≈ 5,9 s zonder cache. `nameCache` memoiseert per
  // uniqueID (incl. het `null`-resultaat — een kalender zonder naam-var-data hoeft ook maar één keer
  // "niet gevonden" te concluderen).
  const nameCache = new Map<number, string | null>();
  const nameOf = (uid: number): string | null => {
    if (nameCache.has(uid)) return nameCache.get(uid) ?? null;
    const name = varData.getUnicodeString(uid, CALENDAR_NAME_VAR_TYPE, MAX_CALENDAR_TEXT_BYTES, `${label}/name[uid=${uid}]`);
    nameCache.set(uid, name);
    return name;
  };
  // T6-spec-review (minor c): een kalender zonder eigen naam-var-data (vooral afgeleide/resource-
  // kalenders — MPP koppelt de naam meestal aan de RESOURCE, niet aan de kalender zelf, en T6 kent
  // nog geen Resource-objecten om die naam uit te lenen, zie T7) krijgt hier "Kalender <uid>" i.p.v.
  // stil `createDefaultCalendar()`'s "Bouwkalender NL"/"Standaardkalender" te laten staan — die naam
  // hoort bij een NIEUW project, niet bij een uit een bestand gelezen kalender.
  const nameOfOrFallback = (uid: number): string => nameOf(uid) ?? `Kalender ${uid}`;

  // T6-spec-review-fix (BLOKKEREND — was asymmetrisch verkeerd): AbstractCalendarFactory.java kent
  // TWEE VERSCHILLENDE regels voor `resourceMap` — basiskalenders (r. 157-160) linken UITSLUITEND
  // bij een POSITIEVE, nog-ongekoppelde resource-ID ("In theory, base calendars should not have a
  // resource ID attached to them... As long as the resource ID isn't already linked..."); afgeleide
  // kalenders (r. 174-176) linken ONVOORWAARDELIJK — geen `>0`-check, geen containsKey-check, altijd
  // een kale `resourceMap.put(resourceID, cal)`, ook bij resource-ID 0. Resource-uniqueID 0 is een
  // GELDIGE id (corpus: Bijlage 13's afgeleide kalenders dragen resource-ID's 0,1,2,3,4,5,7,8,9) —
  // een eerdere versie gebruikte hier ÉÉN gedeelde, altijd-`>0`-geguarde `linkResource`-functie voor
  // beide fases, wat resource-ID 0 op een afgeleide kalender stil liet vallen.
  const linkBaseResource = (rec: RawCalendarEntry): void => {
    if (rec.resourceUniqueId > 0 && !resourceCalendarUniqueIdByResourceUniqueId.has(rec.resourceUniqueId)) {
      resourceCalendarUniqueIdByResourceUniqueId.set(rec.resourceUniqueId, rec.calendarUniqueId);
    }
  };
  const linkDerivedResource = (rec: RawCalendarEntry): void => {
    resourceCalendarUniqueIdByResourceUniqueId.set(rec.resourceUniqueId, rec.calendarUniqueId);
  };

  // ── Projectkalender-IDENTITEIT vooraf bepalen (vóór materialisatie) — DEFAULT_CALENDAR_NAME-
  // lookup (AbstractCalendarFactory.java r. 205-210), met terugval op de eerste basiskalender, dan
  // de eerste kalender van welke soort dan ook (Map-itteratievolgorde === FixedData-volgorde). Moet
  // vóór Fase 1/2 gebeuren zodat `hoursPerDayOverride` (zie de toelichting bij deze functie) tijdens
  // de materialisatie van PRECIES déze kalender kan worden toegepast — `nameOf` heeft alleen
  // `varData` nodig, geen materialisatie. */
  const defaultNameBytes = projectProps.getByteArray(PROPS_KEY_DEFAULT_CALENDAR_NAME);
  const defaultName = defaultNameBytes
    ? getUnicodeString(defaultNameBytes, 0, MAX_CALENDAR_TEXT_BYTES, `${label}/defaultCalendarName`)
    : null;
  let projectCalendarUid: number | null = null;
  if (defaultName) {
    for (const uid of rawByUniqueId.keys()) {
      if (nameOf(uid) === defaultName) {
        projectCalendarUid = uid;
        break;
      }
    }
  }
  if (projectCalendarUid === null) {
    for (const rec of rawByUniqueId.values()) {
      if (rec.baseCalendarUniqueId <= 0 || rec.baseCalendarUniqueId === rec.calendarUniqueId) {
        projectCalendarUid = rec.calendarUniqueId;
        break;
      }
    }
  }
  if (projectCalendarUid === null) {
    projectCalendarUid = rawByUniqueId.keys().next().value ?? null;
  }
  const overrideFor = (uid: number): number | null => (uid === projectCalendarUid ? hoursPerDayOverride : null);

  // ── Fase 1: basiskalenders (baseCalendarUniqueId<=0 of ===zichzelf, AbstractCalendarFactory.java
  // r. 136). Zelfstandig materialiseerbaar — geen afhankelijkheid van andere kalenders. Corpus-
  // bevinding (2026-08-14, alle drie ground-truth-bestanden): de "Standaard"-basiskalender heeft
  // GEEN eigen CALENDAR_DATA-var-data (`ownData === null`) — MPXJ substitueert dan de project-brede
  // DEFAULT_CALENDAR_HOURS-prop (`defaultCalendarHoursBytes`) als bron voor ZOWEL de uren ALS de
  // uitzonderingen (`AbstractCalendarFactory.java` r. 138-144: `if (varData == null) varData =
  // defaultCalendarData;`, gevolgd door `processCalendarHours`/`processCalendarExceptions` op die
  // ÉÉN gesubstitueerde `varData`) — LET OP: deze substitutie geldt UITSLUITEND voor basiskalenders,
  // niet voor afgeleide (Fase 2 hieronder volgt een ANDERE, eigen substitutieregel: de resolved-
  // base-kalender in plaats van het project-brede blok). `effectiveData` hieronder is exact die
  // substitutie; zonder deze fix zou `cal.holidays` altijd leeg blijven voor een basiskalender
  // zonder eigen var-data, ook als `defaultCalendarHoursBytes` zelf wél uitzonderingen droeg. ────
  for (const rec of rawByUniqueId.values()) {
    if (!(rec.baseCalendarUniqueId <= 0 || rec.baseCalendarUniqueId === rec.calendarUniqueId)) continue;
    baseCalendarUniqueIds.add(rec.calendarUniqueId);

    const ownData = varData.getByteArray(rec.calendarUniqueId, CALENDAR_DATA_VAR_TYPE);
    const effectiveData = ownData ?? defaultCalendarHoursBytes;
    const days = ownData ? resolveDays(ownData, projectDefaultDays, `${label}/hours[uid=${rec.calendarUniqueId}]`) : projectDefaultDays;
    daysByUniqueId.set(rec.calendarUniqueId, days);

    const cal = buildCalendarFromDays(nameOfOrFallback(rec.calendarUniqueId), days, overrideFor(rec.calendarUniqueId));
    // M9 (kwaliteitsreview): uid in de ctx, voor diagnoseerbare grensfouten per kalender.
    const parsed: ParsedExceptions = effectiveData
      ? parseExceptions(effectiveData, `${label}/exceptions[uid=${rec.calendarUniqueId}]`, holidayBudget)
      : { holidays: [], workingExceptions: [] };
    cal.holidays = parsed.holidays;
    // T3: `workingExceptions` blijft AFWEZIG (niet `[]`) wanneer leeg — byte-identiek gedrag met
    // vóór deze taak voor elke kalender zonder werkende uitzonderingen.
    if (parsed.workingExceptions.length > 0) cal.workingExceptions = parsed.workingExceptions;
    calendarByUniqueId.set(rec.calendarUniqueId, cal);
    ownHolidayCountByUniqueId.set(rec.calendarUniqueId, cal.holidays.length); // basiskalender: alles is "eigen", geen overerving
    linkBaseResource(rec);
  }

  // ── Fase 2: afgeleide (resource-)kalenders — fixed-point-resolutie tegen de base-keten (kan zelf
  // weer naar een andere afgeleide kalender wijzen), met cyclus-/dieptebescherming
  // (MAX_BASE_CHAIN_DEPTH). Overneemt de basiskalender se dagpatroon per weekdag (DEFAULT-dagen) en
  // voegt de basiskalender se feestdagen samen met de eigen uitzonderingen (documenteerde
  // vereenvoudiging — zie MAX_BASE_CHAIN_DEPTH's toelichting: dit project heeft geen per-kalender
  // parent-keten-model zoals MPXJ's `ProjectCalendar.getParent()`, dus alles wordt hier hard
  // gematerialiseerd i.p.v. lazy geresolved). ──────────────────────────────────────────────────────
  const materializeDerived = (rec: RawCalendarEntry, fallbackDays: DayResolution[], baseCal: WorkCalendar | null): void => {
    const ownData = varData.getByteArray(rec.calendarUniqueId, CALENDAR_DATA_VAR_TYPE);
    const days = resolveDays(ownData, fallbackDays, `${label}/hours[uid=${rec.calendarUniqueId}]`);
    daysByUniqueId.set(rec.calendarUniqueId, days);

    const cal = buildCalendarFromDays(nameOfOrFallback(rec.calendarUniqueId), days, overrideFor(rec.calendarUniqueId));
    const ownRaw = ownData ? readRawExceptions(ownData, `${label}/exceptions[uid=${rec.calendarUniqueId}]`) : [];
    const ownContributions = buildContributions(ownRaw);
    // Diagnostisch (T6-slot, `ownHolidayCountByUniqueId`) — EIGEN, ONGEBUDGETTEERD budget: dit is
    // uitsluitend een dubbeltelvrije meethaakje voor testcode (zie `CalendarReadResult`'s
    // toelichting), geen productie-uitvoer, dus moet niet van het GEDEELDE `holidayBudget` afdoen
    // (dat zou de "eigen"-telling en de daadwerkelijke `merged`-materialisatie hieronder tegen
    // elkaar laten concurreren om dezelfde slots — de eigen data zelf is al structureel begrensd
    // door `MAX_CALENDAR_EXCEPTIONS`, dus een verse `newHolidayBudget()` hier is veilig).
    const ownParsed = resolveContributions(ownContributions, newHolidayBudget());
    const baseParsed: ParsedExceptions = baseCal
      ? { holidays: baseCal.holidays, workingExceptions: baseCal.workingExceptions ?? [] }
      : { holidays: [], workingExceptions: [] };
    const merged = baseCal ? mergeInherited(baseParsed, ownContributions, holidayBudget) : resolveContributions(ownContributions, holidayBudget);
    cal.holidays = merged.holidays;
    if (merged.workingExceptions.length > 0) cal.workingExceptions = merged.workingExceptions;
    calendarByUniqueId.set(rec.calendarUniqueId, cal);
    ownHolidayCountByUniqueId.set(rec.calendarUniqueId, ownParsed.holidays.length); // NIET de geërfde base-holidays meetellen
    linkDerivedResource(rec);
  };

  const pending = new Map<number, RawCalendarEntry>();
  for (const rec of rawByUniqueId.values()) {
    if (!baseCalendarUniqueIds.has(rec.calendarUniqueId)) pending.set(rec.calendarUniqueId, rec);
  }
  for (let pass = 0; pass < MAX_BASE_CHAIN_DEPTH && pending.size > 0; pass++) {
    let progressed = false;
    for (const [uid, rec] of Array.from(pending)) {
      const baseDays = daysByUniqueId.get(rec.baseCalendarUniqueId);
      if (!baseDays) continue; // base nog niet opgelost (of bestaat niet) — volgende ronde proberen
      materializeDerived(rec, baseDays, calendarByUniqueId.get(rec.baseCalendarUniqueId) ?? null);
      pending.delete(uid);
      progressed = true;
    }
    if (!progressed) break; // geen vooruitgang meer: resterende entries zijn een cyclus of hebben een onbestaande base
  }
  // Restanten (cyclus/onbereikbare base/klem geraakt): materialiseer ZONDER basis-overerving i.p.v.
  // de kalender stilzwijgend te laten vallen — eigen data (indien aanwezig) op de project-brede
  // DEFAULT_CALENDAR_HOURS-fallback.
  for (const rec of pending.values()) materializeDerived(rec, projectDefaultDays, null);

  const projectCalendar = (projectCalendarUid !== null ? calendarByUniqueId.get(projectCalendarUid) : undefined)
    ?? calendarByUniqueId.values().next().value;
  if (!projectCalendar) return fallbackResult(); // defensief onbereikbaar (rawByUniqueId.size>0 hierboven al gecontroleerd)

  const resourceCalendars: WorkCalendar[] = [];
  for (const cal of calendarByUniqueId.values()) {
    if (cal !== projectCalendar) resourceCalendars.push(cal);
  }

  return {
    calendarByUniqueId,
    projectCalendar,
    resourceCalendars,
    resourceCalendarUniqueIdByResourceUniqueId,
    ownHolidayCountByUniqueId,
  };
}

/**
 * ETAPPE 1.5 — de LOSSE promotiestap die `buildCalendarFromDays` niet meer zelf doet (zie de
 * moduleheader). `mppReader.ts`'s `readTasks` roept dit precies ÉÉN keer aan, NÁ een volledige
 * taak-signaal-scan (spiegelt mspdiReader's eigen `hourModeCalIds`-lus in `readMSPDI`, die ook pas
 * ná de eerste taken-lus draait). `signaledCalendars` = de kalender-OBJECTEN (identiteit, geen
 * uniqueID-indirectie nodig — elke `WorkCalendar` hier is per-parse uniek, net als de gedeelde
 * `bandRegistry`-WeakMap in `subdayIo.ts`) die minstens één (c)-signaal droegen: een taak met een
 * sub-dag-duur (`isSubDayMinutes`) of een Start/Finish die van het kalender-eigen anker afwijkt
 * (`hasNonAnchorTime`, zie `mppAnchorClock` in mppReader.ts).
 *
 * Itereert over ALLE kalenders in `calendarByUniqueId` (basis ÉN afgeleide/resource-kalenders) —
 * een kalender zonder taak-signaal promoveert hier nog steeds op haar EIGEN banden (discriminator
 * (a)/(b), bv. een lunchpauze-kalender), exact zoals vóór etappe 1.5 en exact zoals mspdiReader's
 * `calById`-lus (die óók alle kalenders langsgaat, niet alleen de door taken aangeraakte). Retourneert
 * de resulterende uur-modus-kalenders als `Set` (identiteit) — `readTasks` gebruikt die rechtstreeks
 * om per taak `isHour` te bepalen (`hourModeCals.has(effCal)`), zonder nog een uniqueID-vertaalslag.
 */
export function promoteCalendarsForHourMode(
  calendarByUniqueId: ReadonlyMap<number, WorkCalendar>,
  signaledCalendars: ReadonlySet<WorkCalendar>,
): Set<WorkCalendar> {
  const hourModeCals = new Set<WorkCalendar>();
  for (const cal of calendarByUniqueId.values()) {
    if (promoteHourCalendar(cal, getCalendarBands(cal), signaledCalendars.has(cal), false)) {
      hourModeCals.add(cal);
    }
  }
  return hourModeCals;
}
