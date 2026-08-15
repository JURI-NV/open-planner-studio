// MPP-kalenders (fase 3.8 etappe 1, T6): TBkndCal-lezer (`src/services/mpp/mppCalendars.ts`) —
// synthetische end-to-end-fixture, hostile varianten (T6-kwaliteitsreview: kalenderaantal-/holiday-
// budgetten, off-by-one, resource-UID-0, base-ketens), en de corpus-/crawl-secties.
//
// T6-KWALITEITSREVIEW (M7): dit bestand is GESPLITST uit `check-mpp-import.ts` — dat bestand droeg
// tot deze taak zowel de T3-T5-taken-/container-checks áls alle T6-kalenderchecks in één, snel
// groeiend bestand. De T6-fixturebouwers (`buildCalFixedMetaBlob`/`buildCalFixedDataRecord`/
// `buildCalHoursBlock`/`buildCalExceptionsTail`/`writeCalDayBlock`/`concatBytes`) wonen sinds deze
// splitsing in `mppFixtures.ts` (gedeeld); `check-mpp-import.ts` blijft T3-T5-territorium (CFB-laag,
// MPP-containerlaag, taken/hiërarchie), dit bestand is exclusief T6.
//
// Twee lagen dekking (zelfde structuur als check-mpp-import.ts):
//  1. SYNTHETISCHE FIXTURES — draaien ALTIJD, ook zonder corpus.
//  2. CORPUS-/CRAWL-GEDREVEN checks — optioneel, netjes overgeslagen zonder de map (OPS_MPP_CORPUS/
//     OPS_MPP_CRAWL), GEEN in-repo fixture (echte bedrijfsbestanden resp. mogelijk auteursrechtelijk
//     beschermd cursusmateriaal).
//
// Draait via run.sh en draait daarna ook mee in de tijdzone-matrix — bewust geen tijdzone-gevoelige
// logica hierin (zelfde discipline als check-mpp-import.ts).
//
// DEKKINGSKAART (T9 — dit bestand is exclusief T6-territorium):
//   - TBkndCal-lezer end-to-end + hostile varianten (kalenderaantal-/holiday-budgetten,
//     off-by-one, resource-UID-0, base-ketens)                         → SYNTHETISCH, altijd
//   - projectkalender workDays + holidays vs. MSPDI-ground-truth        → CORPUS (3 bestanden — de
//     holidaykant is hier toevallig altijd 0/0, zie de I2-toelichting; dus GEEN bewijslast voor
//     `parseExceptions` — die levert de crawl-sectie)
//   - holiday-materialisatie (EIGEN holidays, dubbeltelvrij, over ALLE
//     kalenders van een bestand)                                       → CRAWL (49 bestanden, T6)
// Corpus/crawl-afwezig ⇒ nette OK-skip, beïnvloedt nooit de einduitslag. Zie check-mpp-import.ts
// (taken/container/CFB) en check-mpp-relations.ts (relaties/resources/assignments) voor de andere
// domeinen.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { CfbFile } from '@/services/mpp/cfb';
import { Props } from '@/services/mpp/mppContainer';
import { getDate } from '@/services/mpp/mppPrimitives';
import {
  readCalendars, parseExceptions, newHolidayBudget, promoteCalendarsForHourMode,
  MAX_CALENDAR_EXCEPTIONS, MAX_HOLIDAY_RANGE_DAYS, MAX_CALENDARS, MAX_TOTAL_HOLIDAY_SLOTS, MAX_BASE_CHAIN_DEPTH,
} from '@/services/mpp/mppCalendars';
import { readMPP, openMppProject } from '@/services/mpp/mppReader';
import { readMSPDI } from '@/services/msproject/mspdiReader';
import { installDOMParser } from './xmldom-shim';
import { formatDate } from '@/utils/dateUtils';
import {
  buildNestedCfb, encodeCompObjFileFormat, encodePropsEntries, encodePropsSingleByteEntry,
  buildCalFixedMetaBlob, buildCalFixedDataRecord, buildCalHoursBlock, buildCalExceptionsTail, concatBytes,
  buildVarMetaBytes,
  type CfbTreeNode,
} from './mppFixtures';

const diffs: string[] = [];
let checks = 0;
const truthy = (label: string, cond: boolean) => {
  checks++;
  if (!cond) diffs.push(`${label}: verwacht waar, kreeg onwaar`);
};

const TIME_LIMIT_MS = 2000;

// ── Kleine, lokale byte-encoders voor de gecombineerde taak+kalender-fixture hieronder (bewust NIET
// gedeeld met check-mpp-import.ts se eigen taak-fixture-helpers — deze zijn tot een enkele taak
// geminimaliseerd, alleen om de taak→kalender-koppeling te bewijzen, geen hiërarchie/WBS/milestones;
// zie check-mpp-import.ts voor de volledige taak-fixture-dekking). ──────────────────────────────────
const FIXED_META_MAGIC = 0xfadfadba;
const PASSWORD_FLAG_KEY = 893386752;
const PROJECT_START_DATE_KEY = 37748738;
const PROJECT_FINISH_DATE_KEY = 37748739;
const MINUTES_PER_DAY_KEY = 37748765;
const TITLE_KEY = 37748744;
const DEFAULT_CALENDAR_NAME_KEY = 37748750;

function encodeUnicodeStringAscii(s: string): Uint8Array {
  const out = new Uint8Array(s.length * 2);
  const view = new DataView(out.buffer);
  for (let i = 0; i < s.length; i++) view.setUint16(i * 2, s.charCodeAt(i), true);
  return out;
}

function timestampBytes(time: number, days: number): Uint8Array {
  const out = new Uint8Array(4);
  const view = new DataView(out.buffer);
  view.setUint16(0, time, true);
  view.setUint16(2, days, true);
  return out;
}

function int32Payload(value: number): Uint8Array {
  const p = new Uint8Array(4);
  new DataView(p.buffer).setInt32(0, value, true);
  return p;
}

/** Dagen sinds MPP-epoch (SHORT) → ISO-datumstring — voor het vertalen van fixture-`fromDay`-
 *  waarden naar de verwachte `Holiday.startDate`. */
function mppDayToIso(raw: number): string {
  const buf = new Uint8Array(2);
  new DataView(buf.buffer).setUint16(0, raw, true);
  const d = getDate(buf, 0);
  return d ? formatDate(d) : '';
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// I4/T6 — end-to-end readMPP: één taak + TBkndCal (basis + afgeleide kalender + holiday), bewijst
// de taak→kalender-koppeling ÉN de kalenderlezer in dezelfde aanroep.
// ═══════════════════════════════════════════════════════════════════════════════════════════
{
  // ── Taak (minimaal — alleen om calendarUniqueId=5 te dragen). FixedData op de LETTERLIJKE
  // default-offsets uit fieldMap14.ts (geen TASK_FIELD_MAP meegegeven, spiegelt check-mpp-import.ts
  // se I4-fixture). Index 0-2 zijn dummy (FIRST_TASK_INDEX=3 in mppReader.ts se readTasks). ────────
  function buildTaskFixedDataRecord(opts: { uniqueId: number; id: number; startDays: number; finishDays: number; calendarUniqueId: number }): Uint8Array {
    const out = new Uint8Array(130);
    const view = new DataView(out.buffer);
    view.setInt32(0, opts.uniqueId, true);
    view.setInt32(4, opts.id, true);
    view.setInt16(40, 1, true); // outlineLevel
    view.setInt32(42, 4800, true); // 4800 tienden-van-minuut = 8u = 1 dag @480 min/dag
    view.setInt16(56, 0, true); // constraintType = 0 (ASAP)
    view.setUint16(64, 0, true);
    view.setUint16(66, opts.startDays, true);
    view.setUint16(68, 0, true);
    view.setUint16(70, opts.finishDays, true);
    view.setInt32(118, opts.calendarUniqueId, true);
    return out;
  }
  function buildTaskFixedMetaRecord(offsetIntoFixedData: number): Uint8Array {
    const out = new Uint8Array(47);
    new DataView(out.buffer).setInt32(4, offsetIntoFixedData, true);
    return out;
  }
  const dummy = buildTaskFixedMetaRecord(0);
  const metaTask = buildTaskFixedMetaRecord(3 * 130); // offset naar het echte taakrecord (index 3) in taskFixedDataBlob
  const taskFixedMetaBlob = new Uint8Array(16 + 4 * 47);
  {
    const v = new DataView(taskFixedMetaBlob.buffer);
    v.setUint32(0, FIXED_META_MAGIC, true);
    v.setInt32(8, 4, true);
    [dummy, dummy, dummy, metaTask].forEach((item, i) => taskFixedMetaBlob.set(item, 16 + i * 47));
  }
  const dataTask = buildTaskFixedDataRecord({ uniqueId: 10, id: 1, startDays: 15000, finishDays: 15001, calendarUniqueId: 5 });
  const taskFixedDataBlob = new Uint8Array(4 * 130);
  taskFixedDataBlob.set(dataTask, 3 * 130); // index 3 = het echte taakrecord

  const taskVarMetaBytes = buildVarMetaBytes([{ uniqueId: 10, type: 14, offset: 0 }]);
  const taskNamePayload = encodeUnicodeStringAscii('Task1');
  const taskVar2DataBuf = new Uint8Array(4 + taskNamePayload.length);
  new DataView(taskVar2DataBuf.buffer).setInt32(0, taskNamePayload.length, true);
  taskVar2DataBuf.set(taskNamePayload, 4);

  // ── Kalenders: calId=1 (basis, ma/wo/vr 08:00-17:00) + calId=5 (afgeleid, ALLE dagen
  // defaultFlag=1 ⇒ volledig geërfd, plus één eigen holiday) — calId=5 matcht de taak se
  // calendarUniqueId hierboven, zodat dit tegelijk de koppeling bewijst. ─────────────────────────
  const HOLIDAY_FROM_DAY = 15005;
  const baseHours = buildCalHoursBlock([
    { defaultFlag: 0 },
    { defaultFlag: 0, bands: [{ startMinutes: 480, durationMinutes: 540 }] },
    { defaultFlag: 0, bands: [{ startMinutes: 480, durationMinutes: 540 }] },
    { defaultFlag: 0, bands: [{ startMinutes: 480, durationMinutes: 540 }] },
    { defaultFlag: 0, bands: [{ startMinutes: 480, durationMinutes: 540 }] },
    { defaultFlag: 0, bands: [{ startMinutes: 480, durationMinutes: 540 }] },
    { defaultFlag: 0 },
  ]);
  const derivedHours = concatBytes(
    buildCalHoursBlock(Array.from({ length: 7 }, () => ({ defaultFlag: 1 as const }))),
    // freq76 bewust NIET 1 (default 256, zie buildCalExceptionsTail) — bewijst dat materialisatie
    // bij recurrenceTypeValue=1 (DAILY) onafhankelijk is van @76 (T6-spec-review-fix).
    buildCalExceptionsTail([{ fromDay: HOLIDAY_FROM_DAY, toDay: HOLIDAY_FROM_DAY }]),
  );
  const calFixedMetaBlob = buildCalFixedMetaBlob([0, 12]);
  const calFixedDataBlob = concatBytes(
    buildCalFixedDataRecord(1, 1, -1),
    buildCalFixedDataRecord(5, 1, 1),
  );
  const CAL_NAME1_OFF = 0, CAL_DATA1_OFF = 100, CAL_NAME5_OFF = 600, CAL_DATA5_OFF = 700;
  const calVarMetaBytes = buildVarMetaBytes([
    { uniqueId: 1, type: 1, offset: CAL_NAME1_OFF },
    { uniqueId: 1, type: 8, offset: CAL_DATA1_OFF },
    { uniqueId: 5, type: 1, offset: CAL_NAME5_OFF },
    { uniqueId: 5, type: 8, offset: CAL_DATA5_OFF },
  ]);
  const calVar2DataBuf = new Uint8Array(1400);
  const calVar2View = new DataView(calVar2DataBuf.buffer);
  const writeCalVar2 = (offset: number, payload: Uint8Array) => {
    calVar2View.setInt32(offset, payload.length, true);
    calVar2DataBuf.set(payload, offset + 4);
  };
  writeCalVar2(CAL_NAME1_OFF, encodeUnicodeStringAscii('Standaard fixture'));
  writeCalVar2(CAL_DATA1_OFF, baseHours);
  writeCalVar2(CAL_NAME5_OFF, encodeUnicodeStringAscii('Kalender Res5'));
  writeCalVar2(CAL_DATA5_OFF, derivedHours);

  const projectPropsBytes = encodePropsEntries([
    { key: PROJECT_START_DATE_KEY, data: timestampBytes(0, 15000) },
    { key: PROJECT_FINISH_DATE_KEY, data: timestampBytes(0, 15010) },
    { key: MINUTES_PER_DAY_KEY, data: int32Payload(480) },
    { key: TITLE_KEY, data: encodeUnicodeStringAscii('Fixture Project') },
    { key: DEFAULT_CALENDAR_NAME_KEY, data: encodeUnicodeStringAscii('Standaard fixture') },
  ]);

  const tree: Record<string, CfbTreeNode> = {
    '\x01CompObj': { data: encodeCompObjFileFormat('MSProject.MPP14') },
    Props14: { data: encodePropsSingleByteEntry(PASSWORD_FLAG_KEY, 0) },
    '   114': {
      children: {
        Props: { data: projectPropsBytes },
        TBkndTask: {
          children: {
            FixedMeta: { data: taskFixedMetaBlob },
            FixedData: { data: taskFixedDataBlob },
            VarMeta: { data: taskVarMetaBytes },
            Var2Data: { data: taskVar2DataBuf },
          },
        },
        TBkndCal: {
          children: {
            FixedMeta: { data: calFixedMetaBlob },
            FixedData: { data: calFixedDataBlob },
            VarMeta: { data: calVarMetaBytes },
            Var2Data: { data: calVar2DataBuf },
          },
        },
      },
    },
  };

  let result: ReturnType<typeof readMPP> | null = null;
  let threw: string | null = null;
  try {
    result = readMPP(buildNestedCfb(tree));
  } catch (err) {
    threw = err instanceof Error ? err.message : String(err);
  }
  truthy(`I4/T6 end-to-end readMPP: gooit niet (${threw ?? ''})`, threw === null);

  if (result) {
    truthy('I4/T6 end-to-end readMPP: 1 taak', result.tasks.length === 1);
    truthy('I4/T6 end-to-end readMPP: projectkalender naam uit DEFAULT_CALENDAR_NAME', result.calendar.name === 'Standaard fixture');
    truthy('I4/T6 end-to-end readMPP: projectkalender workDays === ma-vr', JSON.stringify(result.calendar.workDays) === JSON.stringify([1, 2, 3, 4, 5]));
    truthy('I4/T6 end-to-end readMPP: projectkalender hoursPerDay === MINUTES_PER_DAY-override (480/60=8)', result.calendar.hoursPerDay === 8);
    truthy('I4/T6 end-to-end readMPP: projectkalender heeft géén eigen uitzonderingen', result.calendar.holidays.length === 0);
    truthy('I4/T6 end-to-end readMPP: precies 1 resourceCalendar (calId=5)', result.resourceCalendars?.length === 1);

    const derived = result.resourceCalendars?.[0];
    truthy('I4/T6 end-to-end readMPP: afgeleide kalender gevonden', !!derived);
    if (derived) {
      truthy('I4/T6 end-to-end readMPP: afgeleide kalender naam', derived.name === 'Kalender Res5');
      truthy(
        'I4/T6 end-to-end readMPP: afgeleide kalender erft workDays van de base (alle dagen defaultFlag=1)',
        JSON.stringify(derived.workDays) === JSON.stringify([1, 2, 3, 4, 5]),
      );
      truthy('I4/T6 end-to-end readMPP: afgeleide kalender heeft precies 1 eigen holiday', derived.holidays.length === 1);
      if (derived.holidays.length === 1) {
        const expectedIso = mppDayToIso(HOLIDAY_FROM_DAY);
        truthy('I4/T6 end-to-end readMPP: holiday-startdatum === HOLIDAY_FROM_DAY', derived.holidays[0].startDate === expectedIso);
        truthy('I4/T6 end-to-end readMPP: holiday is een 1-dags bereik (start===end)', derived.holidays[0].startDate === derived.holidays[0].endDate);
      }
      const task = result.tasks[0];
      truthy('I4/T6 end-to-end readMPP: Task1.calendarId === de afgeleide kalender (calendarUniqueId=5)', !!task && task.calendarId === derived.id);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// T6-hostile: mppCalendars.ts tegen vijandige/geprepareerde invoer
// ═══════════════════════════════════════════════════════════════════════════════════════════

// ── T7-her-review restpunt (b): de ALTIJD-vangende `readCalendars`-wrapper (I1-fix, zie de
// toelichting bij die functie) had tot deze taak GEEN eigen regressienet — elke andere hostile-test
// hierboven/hieronder roept al ofwel `readCalendars` MET een geldige FixedMeta/FixedData aan
// (test het materialisatiegedrag, niet de wrapper zelf), ofwel een low-level primitief los
// (`parseExceptions`). Dit bewijst specifiek de wrapper: een FOUT FixedMeta-magic-getal op
// `TBkndCal/FixedMeta` gooit diep in `readCalendarsUnsafe` (via `FixedMeta.withItemSize`) — de
// wrapper moet dat vangen en `fallbackResult()` teruggeven (`calendarByUniqueId.size === 0`),
// nooit de fout laten doorlekken naar `readMPP`. ────────────────────────────────────────────────
{
  const badMagicFixedMeta = new Uint8Array(16 + 12); // header + 1 item, magic bewust fout
  new DataView(badMagicFixedMeta.buffer).setUint32(0, 0xdeadbeef, true); // ≠ BLOCK_MAGIC (0xfadfadba)
  const fixedData = buildCalFixedDataRecord(1, 1, -1);
  const projectProps = new Props(encodePropsEntries([]), 'T7-her-review-bad-magic');
  const cfb = new CfbFile(buildNestedCfb({
    '   114': { children: { TBkndCal: { children: { FixedMeta: { data: badMagicFixedMeta }, FixedData: { data: fixedData } } } } },
  }));

  let result: ReturnType<typeof readCalendars> | null = null;
  let threw: string | null = null;
  try {
    result = readCalendars(cfb, projectProps, null);
  } catch (err) {
    threw = err instanceof Error ? err.message : String(err);
  }
  truthy(`T7-her-review-b readCalendars-wrapper (fout FixedMeta-magic): gooit niet (${threw ?? ''})`, threw === null);
  truthy('T7-her-review-b readCalendars-wrapper: calendarByUniqueId.size === 0 (fallbackResult)', result?.calendarByUniqueId.size === 0);
  truthy('T7-her-review-b readCalendars-wrapper: projectCalendar blijft een geldige generieke default', !!result?.projectCalendar.workDays.length);
}

// ── Circulaire base-kalender-verwijzing: calId=10 verwijst naar base 20, calId=20 naar base 10 —
// GEEN van beide is ooit een "echte" basiskalender (baseId<=0 of ===zichzelf), dus beide belanden
// in `readCalendars`' Fase 2 (afgeleide kalenders) en verwijzen alleen naar elkaar. Zonder
// `MAX_BASE_CHAIN_DEPTH` zou de fixed-point-resolutie hier oneindig kunnen doorlopen — bewijst dat
// de lus na een begrensd aantal ronden stopt en BEIDE kalenders alsnog materialiseert (zonder
// overerving), i.p.v. te hangen of ze stilzwijgend te laten vallen.
{
  const fixedMeta = buildCalFixedMetaBlob([0, 12]);
  const fixedData = concatBytes(
    buildCalFixedDataRecord(10, 20, -1),
    buildCalFixedDataRecord(20, 10, -1),
  );
  const varMeta = buildVarMetaBytes([]);
  const projectProps = new Props(encodePropsEntries([]), 'T6-hostile-circular');
  const cfb = new CfbFile(buildNestedCfb({
    '   114': { children: { TBkndCal: { children: { FixedMeta: { data: fixedMeta }, FixedData: { data: fixedData }, VarMeta: { data: varMeta } } } } },
  }));

  const start = Date.now();
  let result: ReturnType<typeof readCalendars> | null = null;
  let threw: string | null = null;
  try {
    result = readCalendars(cfb, projectProps, null);
  } catch (err) {
    threw = err instanceof Error ? err.message : String(err);
  }
  const elapsedMs = Date.now() - start;
  truthy(`T6-hostile circulaire base-keten: binnen tijdslimiet (${elapsedMs}ms < ${TIME_LIMIT_MS}ms)`, elapsedMs < TIME_LIMIT_MS);
  truthy(`T6-hostile circulaire base-keten: gooit niet (${threw ?? ''})`, threw === null);
  truthy('T6-hostile circulaire base-keten: beide kalenders alsnog gematerialiseerd', result?.calendarByUniqueId.size === 2);
}

// ── resource-uniqueID 0 op een AFGELEIDE kalender blijft gekoppeld (asymmetrische guard). ─────────
{
  const fixedMeta = buildCalFixedMetaBlob([0, 12]);
  const fixedData = concatBytes(
    buildCalFixedDataRecord(1, 1, -1),
    buildCalFixedDataRecord(2, 1, 0),
  );
  const varMeta = buildVarMetaBytes([]);
  const projectProps = new Props(encodePropsEntries([]), 'T6-hostile-resourceUid0');
  const cfb = new CfbFile(buildNestedCfb({
    '   114': { children: { TBkndCal: { children: { FixedMeta: { data: fixedMeta }, FixedData: { data: fixedData }, VarMeta: { data: varMeta } } } } },
  }));
  const result = readCalendars(cfb, projectProps, null);
  truthy(
    'T6-spec-review-fix: afgeleide kalender met resource-uniqueID 0 blijft gekoppeld (geen >0-guard zoals MPXJ se afgeleide tak)',
    result.resourceCalendarUniqueIdByResourceUniqueId.get(0) === 2,
  );
  truthy(
    'T6-spec-review-fix: basiskalender met resource-uniqueID -1 blijft ONgekoppeld (>0-guard zoals MPXJ se basis-tak)',
    !result.resourceCalendarUniqueIdByResourceUniqueId.has(-1),
  );
}

// ── Extreem exception-aantal: MAX_CALENDAR_EXCEPTIONS klemt, ongeacht hoeveel geldige records de
// buffer daadwerkelijk aanbiedt. ───────────────────────────────────────────────────────────────────
{
  const EXTREME_COUNT = 5000;
  const exceptions = Array.from({ length: EXTREME_COUNT }, (_, i) => ({ fromDay: 10000 + i, toDay: 10000 + i }));
  const hoursBlock = buildCalHoursBlock(Array.from({ length: 7 }, () => ({ defaultFlag: 0 as const })));
  const tail = buildCalExceptionsTail(exceptions);
  new DataView(tail.buffer).setInt16(0, 60000, true); // exceptionCount-claim > wat de buffer fysiek nodig heeft
  const data = concatBytes(hoursBlock, tail);

  const start = Date.now();
  let holidays: ReturnType<typeof parseExceptions> = [];
  let threw: string | null = null;
  try {
    holidays = parseExceptions(data, 'T6-hostile-exception-count', newHolidayBudget());
  } catch (err) {
    threw = err instanceof Error ? err.message : String(err);
  }
  const elapsedMs = Date.now() - start;
  truthy(`T6-hostile extreem exception-aantal: binnen tijdslimiet (${elapsedMs}ms < ${TIME_LIMIT_MS}ms)`, elapsedMs < TIME_LIMIT_MS);
  truthy(`T6-hostile extreem exception-aantal: gooit niet (${threw ?? ''})`, threw === null);
  truthy(
    `T6-hostile extreem exception-aantal: geklemd op MAX_CALENDAR_EXCEPTIONS (${holidays.length}/${MAX_CALENDAR_EXCEPTIONS}, buffer bood ${EXTREME_COUNT} geldige records)`,
    holidays.length === MAX_CALENDAR_EXCEPTIONS,
  );
}

// ── Extreem bereik (range-lengte): MAX_HOLIDAY_RANGE_DAYS klemt het gematerialiseerde bereik. ──────
{
  const hoursBlock = buildCalHoursBlock(Array.from({ length: 7 }, () => ({ defaultFlag: 0 as const })));
  const tail = buildCalExceptionsTail([{ fromDay: 0, toDay: 65534 }]);
  const data = concatBytes(hoursBlock, tail);
  const holidays = parseExceptions(data, 'T6-hostile-range', newHolidayBudget());
  truthy('T6-hostile extreem bereik: precies 1 holiday gematerialiseerd', holidays.length === 1);
  if (holidays.length === 1) {
    const days = Math.round((new Date(holidays[0].endDate).getTime() - new Date(holidays[0].startDate).getTime()) / 86_400_000);
    truthy(
      `T6-hostile extreem bereik: geklemd op MAX_HOLIDAY_RANGE_DAYS (${days + 1}/${MAX_HOLIDAY_RANGE_DAYS} dagen)`,
      days + 1 === MAX_HOLIDAY_RANGE_DAYS,
    );
  }
}

// ── I1-fix-regressie: een 421-byte kalenderdatablob (net boven de 420-byte urensectie, maar te kort
// om de 2-byte exceptionCount op offset 420 veilig te lezen) mag readMPP niet meer laten falen — de
// import moet slagen met 0 holidays voor die kalender. ─────────────────────────────────────────────
{
  const data421 = new Uint8Array(421);
  data421.set(buildCalHoursBlock(Array.from({ length: 7 }, () => ({ defaultFlag: 0 as const }))), 0);
  const start = Date.now();
  let holidays: ReturnType<typeof parseExceptions> = [];
  let threw: string | null = null;
  try {
    holidays = parseExceptions(data421, 'I1-fix-421-bytes', newHolidayBudget());
  } catch (err) {
    threw = err instanceof Error ? err.message : String(err);
  }
  truthy(`I1-fix: 421-byte blob (data.length<422) gooit niet (${threw ?? ''})`, threw === null);
  truthy('I1-fix: 421-byte blob levert 0 holidays (geen 2 bytes beschikbaar voor exceptionCount)', holidays.length === 0);
  truthy(`I1-fix: binnen tijdslimiet (${Date.now() - start}ms < ${TIME_LIMIT_MS}ms)`, Date.now() - start < TIME_LIMIT_MS);
}

// ── Recurrente (niet-geflattende) uitzondering: recurrenceTypeValue=2 (YEARLY) wordt bewust NIET
// gematerialiseerd. ─────────────────────────────────────────────────────────────────────────────
{
  const hoursBlock = buildCalHoursBlock(Array.from({ length: 7 }, () => ({ defaultFlag: 0 as const })));
  const tail = buildCalExceptionsTail([{ fromDay: 10000, toDay: 10100, recurrenceTypeValue: 2 }]);
  const data = concatBytes(hoursBlock, tail);
  const holidays = parseExceptions(data, 'T6-hostile-recurring', newHolidayBudget());
  truthy('T6-hostile recurrente uitzondering: NIET gematerialiseerd (0 holidays)', holidays.length === 0);
}

// ── T6-spec-review-fix-regressie: recurrenceTypeValue===1 (DAILY) negeert @76 volledig; type 7
// telt @76 wél mee. ─────────────────────────────────────────────────────────────────────────────
{
  const hoursBlock = buildCalHoursBlock(Array.from({ length: 7 }, () => ({ defaultFlag: 0 as const })));
  const tail = buildCalExceptionsTail([
    { fromDay: 20000, toDay: 20000, recurrenceTypeValue: 1, freq76: 0 },
    { fromDay: 20010, toDay: 20010, recurrenceTypeValue: 1, freq76: 256 },
    { fromDay: 20020, toDay: 20020, recurrenceTypeValue: 7, freq76: 1 },
    { fromDay: 20030, toDay: 20030, recurrenceTypeValue: 7, freq76: 2 },
  ]);
  const data = concatBytes(hoursBlock, tail);
  const holidays = parseExceptions(data, 'T6-spec-review-type1-frequency', newHolidayBudget());
  truthy('T6-spec-review-fix: 3 van de 4 uitzonderingen gematerialiseerd (alleen de échte type-7-herhaling niet)', holidays.length === 3);
  const materializedDays = new Set(holidays.map((h) => h.startDate));
  truthy('T6-spec-review-fix: type-1 freq76=0 gematerialiseerd', materializedDays.has(mppDayToIso(20000)));
  truthy('T6-spec-review-fix: type-1 freq76=256 gematerialiseerd', materializedDays.has(mppDayToIso(20010)));
  truthy('T6-spec-review-fix: type-7 freq76=1 gematerialiseerd', materializedDays.has(mppDayToIso(20020)));
  truthy('T6-spec-review-fix: type-7 freq76=2 NIET gematerialiseerd', !materializedDays.has(mppDayToIso(20030)));
}

// ── T6-kwaliteitsreview (M8-a): ≥3-niveau-keten — transitieve overerving. calId=1 (basis, ma/wo/vr
// + 1 holiday) → calId=2 (afgeleid van 1, alles default) → calId=3 (afgeleid van 2, alles default).
// calId=3 moet zowel de workDays ALS de holiday van calId=1 dragen — via TWEE overervingsstappen. ───
{
  const MWF_HOURS = buildCalHoursBlock([
    { defaultFlag: 0 }, // zo
    { defaultFlag: 0, bands: [{ startMinutes: 480, durationMinutes: 540 }] }, // ma
    { defaultFlag: 0 }, // di
    { defaultFlag: 0, bands: [{ startMinutes: 480, durationMinutes: 540 }] }, // wo
    { defaultFlag: 0 }, // do
    { defaultFlag: 0, bands: [{ startMinutes: 480, durationMinutes: 540 }] }, // vr
    { defaultFlag: 0 }, // za
  ]);
  const baseData = concatBytes(MWF_HOURS, buildCalExceptionsTail([{ fromDay: 15005, toDay: 15005 }]));
  const allDefault = buildCalHoursBlock(Array.from({ length: 7 }, () => ({ defaultFlag: 1 as const })));

  const fixedMeta = buildCalFixedMetaBlob([0, 12, 24]);
  const fixedData = concatBytes(
    buildCalFixedDataRecord(1, 1, -1),
    buildCalFixedDataRecord(2, 1, -1),
    buildCalFixedDataRecord(3, 2, -1),
  );
  const OFF1 = 0, OFF2 = 700;
  const varMeta = buildVarMetaBytes([
    { uniqueId: 1, type: 8, offset: OFF1 },
    { uniqueId: 2, type: 8, offset: OFF2 },
  ]);
  const var2Buf = new Uint8Array(1400);
  const v2v = new DataView(var2Buf.buffer);
  v2v.setInt32(OFF1, baseData.length, true);
  var2Buf.set(baseData, OFF1 + 4);
  v2v.setInt32(OFF2, allDefault.length, true);
  var2Buf.set(allDefault, OFF2 + 4);

  const projectProps = new Props(encodePropsEntries([]), 'T6-M8a-chain3');
  const cfb = new CfbFile(buildNestedCfb({
    '   114': {
      children: {
        TBkndCal: {
          children: { FixedMeta: { data: fixedMeta }, FixedData: { data: fixedData }, VarMeta: { data: varMeta }, Var2Data: { data: var2Buf } },
        },
      },
    },
  }));
  const result = readCalendars(cfb, projectProps, null);
  const cal3 = result.calendarByUniqueId.get(3);
  truthy('T6-M8a 3-niveau-keten: calId=3 gevonden', !!cal3);
  if (cal3) {
    truthy('T6-M8a 3-niveau-keten: calId=3 erft workDays TRANSITIEF (ma/wo/vr)', JSON.stringify(cal3.workDays) === JSON.stringify([1, 3, 5]));
    truthy('T6-M8a 3-niveau-keten: calId=3 erft de holiday TRANSITIEF (via calId=2)', cal3.holidays.length === 1);
  }
}

// ── T6-kwaliteitsreview (M8-b): keten DIEPER dan MAX_BASE_CHAIN_DEPTH — het restanten-pad. Een
// keten van MAX_BASE_CHAIN_DEPTH+3 afgeleide kalenders, IN OMGEKEERDE VOLGORDE in FixedData gezet
// (de meest-afhankelijke eerst) zodat elke fixed-point-ronde hoogstens één extra niveau oplost (het
// worst-case-pad — in oplopende volgorde zou de hele keten al in ronde 1 oplossen, wat de klem niet
// zou testen). Kalenders binnen het budget erven correct (ma/wo/vr); kalenders erna vallen terug op
// de project-brede default (ma-vr) — geen crash, geen weggevallen kalenders. ───────────────────────
{
  const DEPTH = MAX_BASE_CHAIN_DEPTH + 3;
  const MWF_HOURS = buildCalHoursBlock([
    { defaultFlag: 0 },
    { defaultFlag: 0, bands: [{ startMinutes: 480, durationMinutes: 540 }] },
    { defaultFlag: 0 },
    { defaultFlag: 0, bands: [{ startMinutes: 480, durationMinutes: 540 }] },
    { defaultFlag: 0 },
    { defaultFlag: 0, bands: [{ startMinutes: 480, durationMinutes: 540 }] },
    { defaultFlag: 0 },
  ]);
  // calId 1 = basis (ma/wo/vr); calId (2..DEPTH+1) = keten, calId k erft van calId (k-1).
  const records: Uint8Array[] = [buildCalFixedDataRecord(1, 1, -1)];
  for (let k = 2; k <= DEPTH + 1; k++) records.push(buildCalFixedDataRecord(k, k - 1, -1));
  // Omgekeerde volgorde voor de AFGELEIDE records (basis blijft vooraan — Fase 1 raakt niet aan
  // volgorde, alleen Fase 2's fixed-point-lus doet dat): [basis, DEPTH+1, DEPTH, ..., 3, 2].
  const orderedRecords = [records[0], ...records.slice(1).reverse()];
  const offsets: number[] = [];
  let off = 0;
  for (const r of orderedRecords) {
    offsets.push(off);
    off += r.length;
  }
  const fixedMeta = buildCalFixedMetaBlob(offsets);
  const fixedData = concatBytes(...orderedRecords);
  const varMeta = buildVarMetaBytes([{ uniqueId: 1, type: 8, offset: 0 }]);
  const var2Buf = new Uint8Array(4 + MWF_HOURS.length);
  new DataView(var2Buf.buffer).setInt32(0, MWF_HOURS.length, true);
  var2Buf.set(MWF_HOURS, 4);

  const projectProps = new Props(encodePropsEntries([]), 'T6-M8b-deep-chain');
  const cfb = new CfbFile(buildNestedCfb({
    '   114': {
      children: {
        TBkndCal: {
          children: { FixedMeta: { data: fixedMeta }, FixedData: { data: fixedData }, VarMeta: { data: varMeta }, Var2Data: { data: var2Buf } },
        },
      },
    },
  }));

  const start = Date.now();
  let result: ReturnType<typeof readCalendars> | null = null;
  let threw: string | null = null;
  try {
    result = readCalendars(cfb, projectProps, null);
  } catch (err) {
    threw = err instanceof Error ? err.message : String(err);
  }
  const elapsedMs = Date.now() - start;
  truthy(`T6-M8b keten dieper dan MAX_BASE_CHAIN_DEPTH: binnen tijdslimiet (${elapsedMs}ms < ${TIME_LIMIT_MS}ms)`, elapsedMs < TIME_LIMIT_MS);
  truthy(`T6-M8b keten dieper dan MAX_BASE_CHAIN_DEPTH: gooit niet (${threw ?? ''})`, threw === null);
  truthy(
    `T6-M8b keten dieper dan MAX_BASE_CHAIN_DEPTH: alle ${DEPTH + 1} kalenders gematerialiseerd (geen crash, geen weggevallen kalenders)`,
    result?.calendarByUniqueId.size === DEPTH + 1,
  );
  if (result) {
    // Binnen budget (diepte MAX_BASE_CHAIN_DEPTH, calId = MAX_BASE_CHAIN_DEPTH+1): correct geketend.
    const withinBudget = result.calendarByUniqueId.get(MAX_BASE_CHAIN_DEPTH + 1);
    truthy(
      `T6-M8b binnen budget (calId=${MAX_BASE_CHAIN_DEPTH + 1}): correct geketend (ma/wo/vr)`,
      !!withinBudget && JSON.stringify(withinBudget.workDays) === JSON.stringify([1, 3, 5]),
    );
    // Voorbij budget (diepte DEPTH, calId = DEPTH+1): restanten-pad, project-default-terugval (ma-vr).
    const beyondBudget = result.calendarByUniqueId.get(DEPTH + 1);
    truthy(
      `T6-M8b voorbij budget (calId=${DEPTH + 1}): restanten-terugval op project-default (ma-vr), NIET de geketende ma/wo/vr`,
      !!beyondBudget && JSON.stringify(beyondBudget.workDays) === JSON.stringify([1, 2, 3, 4, 5]),
    );
  }
}

// ── T6-kwaliteitsreview (C1, kritiek): "veel-kalenders"-hostile-fixture — 1100 nep-basiskalender-
// records (> MAX_CALENDARS=1024) in een FixedData-blok dat via `buildNestedCfb`'s gewone-sectorpad
// (≥4096 bytes) gaat. Bewijst dat de FixedData-iteratie in `readCalendars` afkapt zodra
// `rawByUniqueId.size` de klem raakt — NIET dat 1100 volledige `WorkCalendar`-objecten alloceren. ───
{
  const CAL_COUNT = 1100;
  const records: Uint8Array[] = [];
  for (let uid = 1; uid <= CAL_COUNT; uid++) records.push(buildCalFixedDataRecord(uid, uid, -1)); // elk zijn eigen base (zelf-referentie)
  const offsets = records.map((_, i) => i * 12);
  const fixedMeta = buildCalFixedMetaBlob(offsets);
  const fixedData = concatBytes(...records);
  const varMeta = buildVarMetaBytes([]); // geen namen/uren nodig

  const projectProps = new Props(encodePropsEntries([]), 'T6-C1-many-calendars');
  const cfb = new CfbFile(buildNestedCfb({
    '   114': { children: { TBkndCal: { children: { FixedMeta: { data: fixedMeta }, FixedData: { data: fixedData }, VarMeta: { data: varMeta } } } } },
  }));

  const start = Date.now();
  let result: ReturnType<typeof readCalendars> | null = null;
  let threw: string | null = null;
  try {
    result = readCalendars(cfb, projectProps, null);
  } catch (err) {
    threw = err instanceof Error ? err.message : String(err);
  }
  const elapsedMs = Date.now() - start;
  truthy(`T6-C1 veel-kalenders: binnen tijdslimiet (${elapsedMs}ms < ${TIME_LIMIT_MS}ms)`, elapsedMs < TIME_LIMIT_MS);
  truthy(`T6-C1 veel-kalenders: gooit niet (${threw ?? ''})`, threw === null);
  truthy(
    `T6-C1 veel-kalenders: geklemd op MAX_CALENDARS (${result?.calendarByUniqueId.size}/${MAX_CALENDARS}, bestand bood ${CAL_COUNT})`,
    result?.calendarByUniqueId.size === MAX_CALENDARS,
  );
}

// ── T6-kwaliteitsreview (C1, kritiek): "keten-met-veel-holidays"-hostile-fixture — één basiskalender
// met 400 holidays + 300 afgeleide kalenders die ELK de volledige 400 erven (300×400=120.000 >
// MAX_TOTAL_HOLIDAY_SLOTS=100.000). Bewijst dat `budgetedInherit` de OVERERVINGSKOPIE afkapt — de
// per-kalender-klem (MAX_CALENDAR_EXCEPTIONS) alléén zou dit NIET vangen, want elke individuele
// kalender (basis: 400 < 2000; elke afgeleide: 0 eigen, alles geërfd) blijft ruim binnen die klem. ──
{
  const HOLIDAY_COUNT = 400;
  const DERIVED_COUNT = 300;
  const hoursBlock = buildCalHoursBlock(Array.from({ length: 7 }, () => ({ defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 540 }] })));
  const exceptions = Array.from({ length: HOLIDAY_COUNT }, (_, i) => ({ fromDay: 10000 + i, toDay: 10000 + i }));
  const baseData = concatBytes(hoursBlock, buildCalExceptionsTail(exceptions));

  const records: Uint8Array[] = [buildCalFixedDataRecord(1, 1, -1)];
  for (let k = 2; k <= DERIVED_COUNT + 1; k++) records.push(buildCalFixedDataRecord(k, 1, -1)); // allemaal direct van de basis
  const offsets = records.map((_, i) => i * 12);
  const fixedMeta = buildCalFixedMetaBlob(offsets);
  const fixedData = concatBytes(...records);
  const varMeta = buildVarMetaBytes([{ uniqueId: 1, type: 8, offset: 0 }]);
  const var2Buf = new Uint8Array(4 + baseData.length);
  new DataView(var2Buf.buffer).setInt32(0, baseData.length, true);
  var2Buf.set(baseData, 4);

  const projectProps = new Props(encodePropsEntries([]), 'T6-C1-many-holidays-chain');
  const cfb = new CfbFile(buildNestedCfb({
    '   114': {
      children: {
        TBkndCal: {
          children: { FixedMeta: { data: fixedMeta }, FixedData: { data: fixedData }, VarMeta: { data: varMeta }, Var2Data: { data: var2Buf } },
        },
      },
    },
  }));

  const start = Date.now();
  let result: ReturnType<typeof readCalendars> | null = null;
  let threw: string | null = null;
  try {
    result = readCalendars(cfb, projectProps, null);
  } catch (err) {
    threw = err instanceof Error ? err.message : String(err);
  }
  const elapsedMs = Date.now() - start;
  truthy(`T6-C1 keten-met-veel-holidays: binnen tijdslimiet (${elapsedMs}ms < ${TIME_LIMIT_MS}ms)`, elapsedMs < TIME_LIMIT_MS);
  truthy(`T6-C1 keten-met-veel-holidays: gooit niet (${threw ?? ''})`, threw === null);
  if (result) {
    let totalHolidaySlots = 0;
    for (const cal of result.calendarByUniqueId.values()) totalHolidaySlots += cal.holidays.length;
    // T7-her-review restpunt (c): `<=` ⇒ `===` — de uitkomst is deterministisch exact
    // MAX_TOTAL_HOLIDAY_SLOTS (budget.remaining decrementeert per gematerialiseerde holiday en
    // breekt precies af zodra hij 0 bereikt, zie `budgetedInherit`/`parseExceptions`), geen
    // "hoogstens"-bovengrens die ook een kleinere, per ongeluk te vroeg afgekapte uitkomst zou
    // laten slagen.
    truthy(
      `T6-C1 keten-met-veel-holidays: totale holiday-materialisatie exact op MAX_TOTAL_HOLIDAY_SLOTS (${totalHolidaySlots}/${MAX_TOTAL_HOLIDAY_SLOTS}, ongeklemd zou ${(DERIVED_COUNT + 1) * HOLIDAY_COUNT} zijn)`,
      totalHolidaySlots === MAX_TOTAL_HOLIDAY_SLOTS,
    );
    truthy(
      `T6-C1 keten-met-veel-holidays: alle ${DERIVED_COUNT + 1} kalenders gematerialiseerd (klem raakt alleen de HOLIDAY-inhoud, niet het aantal kalenders)`,
      result.calendarByUniqueId.size === DERIVED_COUNT + 1,
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// T6 — kalenders: readMPP vs. de MSPDI-ground-truth (structureel) + de I2-correctie
// ═══════════════════════════════════════════════════════════════════════════════════════════
//
// ⚠️ Zelfde documentversie-waarschuwing als check-mpp-import.ts se T5-sectie (plan-banner,
// 2026-08-14): kalender-AANTALLEN (13/11/9 in het plan) zijn NIET gezaghebbend voor de `.mpp`'s —
// dus GEEN harde eis op het aantal kalenders, alleen structurele eigenschappen (≥1 kalender; de
// projectkalender bestaat en heeft ≥1 werkdag). `workDays` bleek bij meting WÉL 100% stabiel (alle
// drie bestanden: ma-vr, identiek aan de MSPDI-ground-truth) — dat is een structurele
// kalendereigenschap die het documentversieverschil niet raakt, en is daarom een harde assert.
//
// T6-KWALITEITSREVIEW-FIX (I2, BLOKKEREND — een eerdere versie van deze sectie beweerde onterecht
// "29 echte feestdagen in de MSPDI-ground-truth"): byte-voor-byte onderzoek van alle drie
// `.mpp.xml`-bestanden toont 0 `<Exception>`-elementen — er zijn GEEN echte feestdagen in de ground
// truth. De "29" kwam uit `mspdiReader.ts`'s `parseCalendar`, die start bij `createDefaultCalendar()`
// (die in bouwmodus de NL-feestdagenset genereert) en `calendar.holidays` ALLEEN overschrijft als er
// ≥1 echt `<Exception>`-element gevonden wordt (zie `mppCalendars.ts`'s moduleheader, punt 2, voor
// de volledige toelichting) — bij 0 exceptions bleef die gegenereerde default dus stil staan. Dat is
// GEEN documentgegeven, het is mspdiReader's eigen "geen data ⇒ behoud de default"-gedrag, en die
// eerdere versie verwarde het met een echt ground-truth-feit. De .mpp's zelf dragen — onafhankelijk
// hiervan, byte-voor-byte bevestigd (zie `mppCalendars.ts`'s Fase-1-toelichting) — OOK 0
// uitzonderingen op hun "Standaard"-basiskalender. Beide kanten zijn dus 0; de vergelijking wordt
// daarom een HARDE `=== 0`-assert op de MPP-kant (met de correcte verklaring), i.p.v. een budget
// tegen een besmette XML-telling. De crawl-sectie hieronder blijft de daadwerkelijke bewijslast voor
// "materialiseert deze lezer holidays uberhaupt correct" — dít blok kan dat per-constructie niet
// testen (beide kanten zijn hier toevallig 0, ongeacht of `parseExceptions` correct werkt).
if (existsSync(process.env.OPS_MPP_CORPUS ?? '/home/nozzit/open-aec/voor claude/test bestanden voor file implementation')) {
  const CORPUS = process.env.OPS_MPP_CORPUS ?? '/home/nozzit/open-aec/voor claude/test bestanden voor file implementation';
  const corpusFiles = readdirSync(CORPUS).filter((f) => f.toLowerCase().endsWith('.mpp'));
  if (corpusFiles.length === 0) {
    console.log(`OK  mpp-calendars: corpusmap aanwezig maar geen .mpp-bestanden erin (${CORPUS}) — corpuslus overgeslagen`);
  } else {
    installDOMParser();
    const EXPECTED_FILES = [
      'Bijlage 13 Productieplanning.mpp',
      'Bijlage 20 productieplanning PKB.mpp',
      'bijlage 7 Productie planning.mpp',
    ];
    for (const file of EXPECTED_FILES) {
      if (!corpusFiles.includes(file)) {
        console.log(`OK  mpp-calendars: T6 ${file} niet in dit corpus (${CORPUS}) — overgeslagen`);
        continue;
      }
      const mppPath = join(CORPUS, file);
      const xmlPath = `${mppPath}.xml`;
      if (!existsSync(xmlPath)) {
        checks++;
        diffs.push(`[T6 ${file}] .mpp aanwezig maar .mpp.xml ontbreekt`);
        continue;
      }

      let mppResult: ReturnType<typeof readMPP>;
      let xmlResult: ReturnType<typeof readMSPDI>;
      try {
        mppResult = readMPP(new Uint8Array(readFileSync(mppPath)));
        xmlResult = readMSPDI(readFileSync(xmlPath, 'utf-8'));
      } catch (err) {
        checks++;
        diffs.push(`[T6 ${file}] readMPP/readMSPDI gooide onverwacht: ${err instanceof Error ? err.message : String(err)}`);
        continue;
      }

      const mppCalCount = 1 + (mppResult.resourceCalendars?.length ?? 0);
      truthy(`[T6 ${file}] ≥1 kalender gelezen (projectkalender + resourceCalendars)`, mppCalCount >= 1);
      truthy(`[T6 ${file}] projectkalender heeft ≥1 werkdag`, mppResult.calendar.workDays.length >= 1);
      truthy(
        `[T6 ${file}] projectkalender workDays === MSPDI-ground-truth workDays`,
        JSON.stringify([...mppResult.calendar.workDays].sort((a, b) => a - b)) === JSON.stringify([...xmlResult.calendar.workDays].sort((a, b) => a - b)),
      );
      // I2-fix: hard `=== 0` i.p.v. een budget tegen de besmette XML-"29" — zie de sectietoelichting.
      truthy(
        `[T6 ${file}] projectkalender heeft 0 holidays (.mpp draagt zelf geen enkele uitzondering, byte-voor-byte bevestigd — zie de sectietoelichting)`,
        mppResult.calendar.holidays.length === 0,
      );

      console.log(
        `   . [T6 ${file}] kalenders=${mppCalCount} (aantal NIET gezaghebbend, zie moduleheader) `
        + `projectkalender="${mppResult.calendar.name}" workDays=${JSON.stringify(mppResult.calendar.workDays)} holidays=${mppResult.calendar.holidays.length}:`,
      );
    }
  }
} else {
  console.log('OK  mpp-calendars: corpus niet aanwezig (OPS_MPP_CORPUS) — corpuslus overgeslagen');
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// T6-crawl — breed corpus (49 `.mpp`, submappen MSP2016_OzBuild/MSP2021_OzBuild): holiday-
// materialisatie ONAFHANKELIJK van de (toevallig holiday-arme) drie ground-truth-bestanden bewezen
// ═══════════════════════════════════════════════════════════════════════════════════════════
//
// Zie de I2-toelichting hierboven: de T6-corpussectie kan een regressie in `parseExceptions` NOOIT
// vangen (beide kanten zijn daar 0, per bronbestand). Dit bredere corpus draagt WEL feestdag-
// uitzonderingen ("Easter <jaar>") en is de daadwerkelijke tegenhanger.
//
// T6-KWALITEITSREVIEW (M6): gebruikt nu `openMppProject` (mppReader.ts) i.p.v. een handmatige kopie
// van de CfbFile/assertReadable/detectApplicationVersion/Props-preambule — voorheen hield deze
// sectie zo'n kopie apart aan, met het risico dat de twee stilzwijgend uit elkaar liepen.
{
  const CRAWL = process.env.OPS_MPP_CRAWL ?? '/home/nozzit/open-aec/voor claude/testdata-crawl/crawl-mpp';
  if (!existsSync(CRAWL)) {
    console.log('OK  mpp-calendars: T6-crawl niet aanwezig (OPS_MPP_CRAWL) — crawlsectie overgeslagen');
  } else {
    function listMppFilesRecursive(dir: string): string[] {
      const out: string[] = [];
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) out.push(...listMppFilesRecursive(full));
        else if (entry.isFile() && entry.name.toLowerCase().endsWith('.mpp')) out.push(full);
      }
      return out;
    }
    const crawlFiles = listMppFilesRecursive(CRAWL);
    if (crawlFiles.length === 0) {
      console.log(`OK  mpp-calendars: T6-crawl-map aanwezig maar geen .mpp-bestanden erin (${CRAWL}) — crawlsectie overgeslagen`);
    } else {
      /** Dubbeltelvrije som van EIGEN holidays over ALLE kalenders (project + resource) van één
       *  bestand — `openMppProject` (mppReader.ts, M6) levert de container-/Props-preambule
       *  drift-vrij; `readCalendars` rechtstreeks aanroepen (i.p.v. `readMPP`) is nodig omdat
       *  `ownHolidayCountByUniqueId` (T6-slot) niet in `ImportResult` zit. */
      function ownHolidayTotal(bytes: Uint8Array): number {
        const { cfb, projectProps, applicationVersion } = openMppProject(bytes);
        const calResult = readCalendars(cfb, projectProps, applicationVersion);
        let total = 0;
        for (const count of calResult.ownHolidayCountByUniqueId.values()) total += count;
        return total;
      }

      // Gemeten basislijn (2026-08-14, dit corpus, 49 bestanden): 208 EIGEN holidays over ALLE
      // kalenders (116 op de projectkalender "Standard" + 92 op de tweede basiskalender
      // "6 Day Week", zichtbaar via `resourceCalendars` — her-check bevestigd, 0 per-kalender-
      // mismatches). `>=` (geen `===`): een toekomstige verbetering mag dit laten STIJGEN zonder de
      // poort te breken; een REGRESSIE — óók één die uitsluitend een niet-projectkalender raakt —
      // laat het zakken en faalt hier.
      const CRAWL_HOLIDAY_BASELINE = 208;
      let totalHolidays = 0;
      let filesWithHolidays = 0;
      let readFailures = 0;
      for (const file of crawlFiles) {
        try {
          const count = ownHolidayTotal(new Uint8Array(readFileSync(file)));
          totalHolidays += count;
          if (count > 0) filesWithHolidays++;
        } catch (err) {
          readFailures++;
          checks++;
          diffs.push(`[T6-crawl] readCalendars gooide onverwacht op ${file}: ${err instanceof Error ? err.message : String(err)}`);
        }
      }
      truthy(`[T6-crawl] geen leesfouten over ${crawlFiles.length} bestanden`, readFailures === 0);
      truthy(`[T6-crawl] totaal aantal gematerialiseerde holidays > 0 (${totalHolidays})`, totalHolidays > 0);
      truthy(
        `[T6-crawl] holiday-telling (projectkalender + resourceCalendars, dubbeltelvrij) op/boven de gemeten basislijn (${totalHolidays}/${CRAWL_HOLIDAY_BASELINE})`,
        totalHolidays >= CRAWL_HOLIDAY_BASELINE,
      );
      console.log(
        `   . [T6-crawl] ${crawlFiles.length} bestanden, ${filesWithHolidays} met ≥1 eigen holiday (over alle kalenders), `
        + `totaal ${totalHolidays} holidays (basislijn ${CRAWL_HOLIDAY_BASELINE})`,
      );

      // ── ETAPPE 1.5 "geen lek"-poort: het taak-(c)-signaal (mppReader.ts's `readTasks`, Fase B)
      // mag op dit corpus GEEN kalender promoveren die niet al via discriminator (a)/(b) — de
      // kalender se EIGEN banden, ONAFHANKELIJK van enige taak — promoveerde. Vergelijkt daarom de
      // FULL-PIPELINE hour-kalendertelling (via `readMPP`, inclusief het taak-signaal) tegen een
      // A/B-ALLEEN-baseline (`promoteCalendarsForHourMode` met een LEGE signaal-set — exact het
      // gedrag van vóór etappe 1.5, toen `buildCalendarFromDays` intern altijd `signaled=false`
      // aanriep). BEVINDING (2026-08-15, dit corpus): de twee tellingen zijn IDENTIEK (321/345 op
      // beide manieren) — het taak-signaal draagt op dit corpus NUL extra kalenderpromoties bij; de
      // (bijna-)volledige uur-modus-status van dit corpus (788/788 taken, zie `check-mpp-import.ts`'s
      // uurmodus-sectie) komt UITSLUITEND van MS Project's eigen standaard-"Standard"-kalender, die
      // AL EEN LUNCHPAUZE-SPLITSING (twee banden per werkdag) draagt — dat is discriminator (a),
      // bestond al sinds T6, en is dus geen "lek" van deze etappe. `<=` (niet `===`): een
      // toekomstige, bewust ruimere signaal-definitie mag dit laten STIJGEN zonder deze specifieke
      // poort te breken (dat hoort dan bewust bijgewerkt te worden, met een nieuwe basislijn) — een
      // regressie die het taak-signaal per ongeluk kalenders laat promoveren die het niet zouden
      // moeten (bv. de scalar-vóór-promotie-`hoursPerDay`-lees per ongeluk vervangen door de
      // AL-gepromoveerde waarde) zou deze telling laten STIJGEN t.o.v. de A/B-baseline en hier falen.
      let fullPipelineHourCalendars = 0;
      let abOnlyHourCalendars = 0;
      let totalCalendarsSeen = 0;
      let leakReadFailures = 0;
      for (const file of crawlFiles) {
        try {
          const bytes = new Uint8Array(readFileSync(file));
          const result = readMPP(bytes);
          const allCals = [result.calendar, ...(result.resourceCalendars ?? [])];
          fullPipelineHourCalendars += allCals.filter((c) => !!c.workTime).length;

          const { cfb, projectProps, applicationVersion } = openMppProject(bytes);
          const calResult = readCalendars(cfb, projectProps, applicationVersion);
          totalCalendarsSeen += calResult.calendarByUniqueId.size;
          abOnlyHourCalendars += promoteCalendarsForHourMode(calResult.calendarByUniqueId, new Set()).size;
        } catch (err) {
          leakReadFailures++;
          checks++;
          diffs.push(`[T6-crawl uurmodus-lek] mislukte lezing op ${file}: ${err instanceof Error ? err.message : String(err)}`);
        }
      }
      truthy('[T6-crawl uurmodus-lek] geen leesfouten', leakReadFailures === 0);
      truthy(
        `[T6-crawl uurmodus-lek] taak-signaal promoveert GEEN extra kalenders t.o.v. discriminator (a)/(b) alleen (full=${fullPipelineHourCalendars} vs a/b-alleen=${abOnlyHourCalendars}, van ${totalCalendarsSeen} kalenders totaal)`,
        fullPipelineHourCalendars <= abOnlyHourCalendars,
      );
    }
  }
}

// ── Uitslag ────────────────────────────────────────────────────────────────────────────────
if (diffs.length === 0) {
  console.log(`OK  mpp-calendars: alle checks groen (${checks})`);
  process.exit(0);
} else {
  console.log(`XX  mpp-calendars: ${diffs.length} afwijking(en) van ${checks}`);
  for (const d of diffs) console.log(`   - ${d}`);
  process.exit(1);
}
