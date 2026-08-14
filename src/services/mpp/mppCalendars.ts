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
 * Doelsemantiek is IDENTIEK aan de kalendersectie van `mspdiReader.ts` (`applyCalendarBody`/
 * `parseCalendar`, spiegelplicht) — zelfde `WorkCalendar`-vorm, dezelfde `canonicalizeBands`/
 * `registerCalendarBands`/`promoteHourCalendar`-orkestratie uit `@/services/subdayIo`. Eén bewust
 * verschil: MPP-taken dragen in etappe 1 geen sub-dag-signaal (`mppReader.ts`'s moduleheader: "Alles
 * blijft DAG-modus") — `promoteHourCalendar` wordt hier dus altijd met `signaled=false` aangeroepen;
 * een kalender wordt uitsluitend gepromoveerd op grond van haar EIGEN banden (meerdere banden per
 * dag, of een band die middernacht kruist — discriminator (a)/(b), bv. een lunchpauze-kalender),
 * nooit op grond van een taakduur/-datum-signaal. Voor MPP-kalenders zelf is dit gedragsgelijk aan
 * een latere aparte promotie-pas (zoals mspdiReader die doet) met een altijd-false signaal-set —
 * er is dus geen aparte pas nodig.
 *
 * FieldMap-vrij: MPXJ's `CalendarFactory` gebruikt GEEN data-gedreven field map (in tegenstelling
 * tot taken/resources/assignments, zie `fieldMap14.ts`) — de var-data-typen voor naam (1) en
 * kalenderdata (8) zijn letterlijke constanten in `MPP14CalendarFactory.java`.
 *
 * Hardingsdiscipline (T5-kwaliteitsreviews, hier voortgezet): elke ruwe, bestandsgestuurde
 * lus-/allocatiegrens (dagperiodes, uitzonderingsaantal, feestdagbereik, base-kalender-keten) is
 * expliciet geklemd met een meetcommentaar — zie `MAX_DAY_HOUR_PERIODS`, `MAX_CALENDAR_EXCEPTIONS`,
 * `MAX_HOLIDAY_RANGE_DAYS` en `MAX_BASE_CHAIN_DEPTH` hieronder.
 */
import type { Holiday, WorkCalendar } from '@/types/calendar';
import { createDefaultCalendar } from '@/engine/calendar/defaultCalendar';
import { generateId } from '@/utils/id';
import { formatDate } from '@/utils/dateUtils';
import { canonicalizeBands, promoteHourCalendar, registerCalendarBands } from '@/services/subdayIo';
import type { CfbFile } from './cfb';
import type { Props } from './mppContainer';
import { FixedData, FixedMeta, Var2Data, VarMeta12, getDate, getInt, getShort, getUnicodeString } from './mppPrimitives';

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

/** I1-stijl klem (spiegelt `MAX_VAR_TEXT_BYTES` in mppReader.ts — bewust een EIGEN, lokale
 *  constante i.p.v. die importeren: mppReader.ts importeert op zijn beurt DEZE module, dus een
 *  omgekeerde import zou een cyclus geven, precies wat `verify:cycles` bewaakt) — begrenst het
 *  scan-/decodeerwerk van kalendernamen en de DEFAULT_CALENDAR_NAME-projecteigenschap tegen een
 *  gedeelde, gededupliceerde var-data-offset (zie Var2Data's moduleheader in mppPrimitives.ts). */
const MAX_CALENDAR_TEXT_BYTES = 65_536;

/** C1-stijl klem: het aantal werktijd-periodes per weekdag (`periodCount`, SHORT 0..65535) stuurt
 *  een lus die per periode 2+4 bytes leest op een RUW, bestandsgestuurde offset — ongeklemd zou een
 *  geprepareerd bestand hier tot 65535 pogen te lezen, ver voorbij het 60-byte-dagblok, wat op een
 *  kort Var2Data-record al snel een `MPP:`-grensfout van de onderliggende primitief zou gooien en
 *  zo de HELE kalenderlezing (en dus `readMPP`) laat crashen — niet alleen dit ene veld. Geklemd op
 *  een ruim bovengrens (realistisch corpus: 1-2 banden/dag, uitschieters als een lunchpauze-
 *  kalender misschien 3-4) zodat een hostile claim nette, voorspelbare degradatie geeft (de extra
 *  "periodes" worden simpelweg genegeerd zodra de bytes opraken — de binnenste lus breekt zelf al
 *  af op een grensoverschrijding, deze klem is de tweede, goedkopere linie). */
const MAX_DAY_HOUR_PERIODS = 24;

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
const MAX_BASE_CHAIN_DEPTH = 32;

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
  // signaled=false: MPP-taken dragen in etappe 1 geen sub-dag-signaal (zie moduleheader) — een
  // kalender promoveert hier uitsluitend op haar EIGEN banden (discriminator (a)/(b)). Draait NA de
  // `hoursPerDayOverride`-toepassing hierboven, zodat promotie (indien de kalender deviates) het
  // laatste woord heeft — zie de toelichting bij `hoursPerDayOverride`.
  promoteHourCalendar(cal, { canonical: bands, deviates }, false, false);
  return cal;
}

/** Eén uitzonderingenblok (`AbstractCalendarAndExceptionFactory.processCalendarExceptions`) →
 *  gematerialiseerde `Holiday[]`. Alleen NIET-recurrente, NIET-werkende uitzonderingen worden
 *  gematerialiseerd (spiegelt `mspdiReader.ts`'s `applyCalendarBody`, die ook alleen
 *  `DayWorking===0`-exceptions als holiday leest):
 *   - "niet-werkend" ⇒ `periodCount === 0` (geen werktijd-banden binnen de uitzondering) — een
 *     uitzondering MET banden is een "bijzondere werkdag"-override (bv. een ingehaalde zaterdag),
 *     géén feestdag, en wordt (net als in mspdiReader) niet gematerialiseerd.
 *   - "niet-recurrent" — MPXJ's `readRecurringData` kan een uitzondering aan een herhalingspatroon
 *     koppelen (jaarlijks/maandelijks/wekelijks); in dat geval zijn `fromDate`/`toDate` het
 *     RECURRENTIEVENSTER, niet de feestdagdatum zelf — die blind als één doorlopend bereik
 *     materialiseren zou een meerjarig "feestdag"-bereik opleveren i.p.v. de bedoelde losse dagen.
 *     Recurrente uitzonderingen ondersteunt geen enkele lezer in dit project (mspdiReader ook niet)
 *     — hier bewust overgeslagen i.p.v. fout gematerialiseerd.
 *
 *     T6-SPEC-REVIEW-FIX (2026-08-14, BLOKKEREND — was een echte bug, geen theoretisch randgeval):
 *     `readRecurringData`'s DAILY-tak (`recurrenceTypeValue` 1 ÓF 7 — beide `RecurrenceType.DAILY`,
 *     zie `RECURRENCE_TYPES` in AbstractCalendarAndExceptionFactory.java) leest `frequency` NIET
 *     altijd uit `@76`: bij `recurrenceTypeValue===1` hardcodeert MPXJ `frequency=1` (de bytes op
 *     `@76` worden domweg GENEGEERD); alléén bij `recurrenceTypeValue===7` komt `frequency` uit
 *     `@76`. Ná de switch geldt `DAILY && frequency===1 ⇒ rd=null` (geflattened/niet-recurrent) —
 *     dus `recurrenceTypeValue===1` is ALTIJD geflattened, ongeacht wat er op `@76` staat. Een
 *     eerdere versie van deze functie eiste ten onrechte `getShort(data,offset+76)===1` óók voor
 *     type 1 — crawl-corpusmeting (49 bestanden, `check-mpp-import.ts`'s crawl-sectie) laat zien dat
 *     `@76` bij type 1 in de praktijk 0, 256 of 23148 is (NOOIT 1), waardoor de oude conditie STIL
 *     ALLE echte feestdagen liet vallen (0 van 208 gematerialiseerd, incl. bv. "Easter 2024/2025").
 *     `isDaily`/`frequency` hieronder spiegelt de Java-switch letterlijk. */
export function parseExceptions(data: Uint8Array, ctx: string): Holiday[] {
  const holidays: Holiday[] = [];
  if (data.length <= 420) return holidays;
  const rawExceptionCount = getShort(data, 420, ctx);
  if (rawExceptionCount === 0) return holidays;
  const exceptionCount = Math.min(Math.max(rawExceptionCount, 0), MAX_CALENDAR_EXCEPTIONS); // zie MAX_CALENDAR_EXCEPTIONS

  let offset = 424;
  for (let index = 0; index < exceptionCount; index++) {
    if (offset + 92 > data.length) break; // afgekapt blok — MPP14Reader.java breekt hier ook af

    const fromRaw = getShort(data, offset, ctx);
    const toRaw = getShort(data, offset + 2, ctx);
    const periodCount = getShort(data, offset + 14, ctx);
    const recurrenceTypeValue = getShort(data, offset + 72, ctx);
    let exceptionNameLength = getInt(data, offset + 88, ctx);
    if (exceptionNameLength % 4 !== 0) exceptionNameLength = (Math.floor(exceptionNameLength / 4) + 1) * 4;
    // I1-stijl klem (zie MAX_CALENDAR_TEXT_BYTES): begrenst zowel het decodeerwerk als — op een
    // hostile bestand — de offset-opschuiving naar de volgende uitzondering; op elk realistisch
    // bestand (naam ruim onder 64 KiB) is dit een no-op.
    exceptionNameLength = Math.max(0, Math.min(exceptionNameLength, MAX_CALENDAR_TEXT_BYTES));

    // T6-spec-review-fix (zie de moduleheader hierboven): `@76` telt UITSLUITEND mee bij
    // recurrenceTypeValue===7 — bij ===1 hardcodeert MPXJ frequency=1 (ongeacht `@76`).
    const isDaily = recurrenceTypeValue === 1 || recurrenceTypeValue === 7;
    const frequency = recurrenceTypeValue === 1 ? 1 : getShort(data, offset + 76, ctx);
    const isFlattenedNonRecurring = recurrenceTypeValue === 0 || (isDaily && frequency === 1);
    if (periodCount === 0 && isFlattenedNonRecurring && fromRaw !== 65535 && toRaw !== 65535) {
      const fromDate = getDate(data, offset, ctx);
      const toDate = getDate(data, offset + 2, ctx);
      if (fromDate && toDate) {
        let clampedTo = toDate;
        const rangeDays = Math.round((toDate.getTime() - fromDate.getTime()) / 86_400_000);
        if (rangeDays > MAX_HOLIDAY_RANGE_DAYS) {
          // zie MAX_HOLIDAY_RANGE_DAYS — voorkomt een CalendarEngine.buildHolidaySet()-blowup.
          clampedTo = new Date(fromDate.getTime() + (MAX_HOLIDAY_RANGE_DAYS - 1) * 86_400_000);
        } else if (rangeDays < 0) {
          clampedTo = fromDate; // omgekeerd bereik: degradeer naar een 1-dags holiday i.p.v. een lege/negatieve marge
        }
        let name = 'Holiday';
        if (exceptionNameLength > 0 && data.length >= offset + 92 + exceptionNameLength) {
          const decoded = getUnicodeString(data, offset + 92, exceptionNameLength, ctx);
          if (decoded) name = decoded;
        }
        holidays.push({ name, startDate: formatDate(fromDate), endDate: formatDate(clampedTo) });
      }
    }
    offset += 92 + exceptionNameLength;
  }
  return holidays;
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
  /** MPP-uniqueID → aantal EIGEN uitzonderingen van díe kalender (T6-slot, her-check): een afgeleide
   *  kalender se `holidays`-array bevat `[...baseCal.holidays, ...ownHolidays]` (zie Fase 2
   *  hieronder) — een consument die simpelweg `.holidays.length` per kalender optelt zou de
   *  basiskalender se feestdagen ÉÉN KEER PER AFGELEIDE KALENDER dubbeltellen. Deze map draagt
   *  uitsluitend het EIGEN aandeel (basiskalenders: hun volledige `holidays`, want daar bestaat geen
   *  overerving; afgeleide kalenders: alleen `ownHolidays`, niet de geërfde base-feestdagen) — zodat
   *  een aanroeper (bv. `check-mpp-import.ts`'s T6-crawl-sectie) een dubbeltelvrije som over ALLE
   *  kalenders kan maken. */
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
 */
export function readCalendars(
  cfb: CfbFile,
  projectProps: Props,
  applicationVersion: number | null,
  hoursPerDayOverride: number | null = null,
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

  let fixedMeta: FixedMeta;
  let fixedData: FixedData;
  let varMeta: VarMeta12;
  try {
    fixedMeta = FixedMeta.withItemSize(fixedMetaBytes, CAL_FIXED_META_ITEM_SIZE, `${label}/FixedMeta`);
    fixedData = FixedData.fromMeta(fixedMeta, fixedDataBytes, CAL_FIXED_DATA_MAX_SIZE, 0, `${label}/FixedData`);
    varMeta = new VarMeta12(varMetaBytes, `${label}/VarMeta`);
  } catch {
    // Onleesbare TBkndCal-blokken (verkeerd magic-getal, te klein voor de header, …) ⇒ zelfde
    // vangnet als hierboven — een kapotte kalendersectie mag de rest van `readMPP` niet blokkeren.
    return fallbackResult();
  }
  const varData = new Var2Data(varMeta, var2DataBytes);

  // MPP14CalendarFactory.java: > ApplicationVersion.PROJECT_2010 (14) ⇒ 2013+-veldlayout.
  const useModernOffsets = (applicationVersion ?? 0) > 14;
  const calendarIdOffset = useModernOffsets ? 8 : 0;
  const baseIdOffset = useModernOffsets ? 0 : 4;
  const resourceIdOffset = useModernOffsets ? 4 : 8;

  // ── Ruwe FixedData-records → uniek per calendarUniqueId (eerste-wint, spiegelt Java's
  // `!calendarMap.containsKey(calendarID)`-guard). ──────────────────────────────────────────────
  const rawByUniqueId = new Map<number, RawCalendarEntry>();
  const itemCount = fixedData.getItemCount();
  for (let index = 0; index < itemCount; index++) {
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

  const nameOf = (uid: number): string | null =>
    varData.getUnicodeString(uid, CALENDAR_NAME_VAR_TYPE, MAX_CALENDAR_TEXT_BYTES, `${label}/name`);
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
    const days = ownData ? resolveDays(ownData, projectDefaultDays, `${label}/hours`) : projectDefaultDays;
    daysByUniqueId.set(rec.calendarUniqueId, days);

    const cal = buildCalendarFromDays(nameOfOrFallback(rec.calendarUniqueId), days, overrideFor(rec.calendarUniqueId));
    cal.holidays = effectiveData ? parseExceptions(effectiveData, `${label}/exceptions`) : [];
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
    const days = resolveDays(ownData, fallbackDays, `${label}/hours`);
    daysByUniqueId.set(rec.calendarUniqueId, days);

    const cal = buildCalendarFromDays(nameOfOrFallback(rec.calendarUniqueId), days, overrideFor(rec.calendarUniqueId));
    const ownHolidays = ownData ? parseExceptions(ownData, `${label}/exceptions`) : [];
    cal.holidays = baseCal ? [...baseCal.holidays, ...ownHolidays] : ownHolidays;
    calendarByUniqueId.set(rec.calendarUniqueId, cal);
    ownHolidayCountByUniqueId.set(rec.calendarUniqueId, ownHolidays.length); // NIET de geërfde base-holidays meetellen
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
