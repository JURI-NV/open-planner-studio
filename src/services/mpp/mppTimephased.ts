/**
 * Native MPP14-lezer (MS Project 2010–2021), alleen-lezen.
 * Afgeleid van de MPXJ-broncode (https://github.com/joniles/mpxj, © Jon Iles e.a.,
 * LGPL-2.1) — structuurkennis en veldconstanten geport naar TypeScript voor
 * Open Planner Studio (LGPL-3.0).
 *
 * Z3 (etappe "nul afwijkingen") — de timephased-decoder: de dag-voor-dag (of uur-voor-uur)
 * werksegmenten die MS Project per toewijzing bijhoudt (contouring, restwerk, overwerk). Dit
 * bestand is PUUR: het kent geen CFB/storage/field-map-kennis (dat is `mppEntities.ts`, die de
 * ruwe bytes opent en doorgeeft — zie haar `readAssignmentTimephasedRaw`), geen kalenderrekenen
 * (dat is de motor, buiten scope hier) en GEEN planningsgedrag — het decodeert alleen bytes naar
 * periode-records. Poort-bron: `TimephasedDataFactory.java` — in eigen woorden hieronder, zie de
 * "AFWIJKING VAN MPXJ"-paragraaf voor waar en waarom deze decoder bewust simpeler is.
 *
 * SCOPE-BEGRENZING (plan-Z3, letterlijk overgenomen besluit): uitsluitend de categorieën die Z4
 * (splitsegmenten afleiden) en Z8 (timephased venster bepaalt taakdatums) nodig hebben — actual
 * regular work, remaining regular work, actual overtime work, en hun irregular-tegenhanger. NIET
 * de 11 baseline-timephased-varianten, NIET de kostcategorieën — die dragen niets bij aan datums.
 * Zie `fieldMap14.ts`'s `AssignmentFieldId`-toelichting voor de vier concrete var-data-sleutels.
 *
 * TWEE VERSCHILLENDE BYTEFORMATEN (Z3-fixronde F1, kwaliteitsreview — een eerdere versie van dit
 * bestand nam aan dat alle vier de categorieën hetzelfde 20-byte-formaat delen; dat is ONWAAR,
 * geverifieerd tegen `ResourceAssignmentFactory.process` (rond r.202-213): `RAW_TIMEPHASED_
 * ACTUAL_REGULAR_WORK` (50) en `RAW_TIMEPHASED_ACTUAL_OVERTIME_WORK` (51) gaan door
 * `getCompleteWork` (samen met `TIMEPHASED_ACTUAL_IRREGULAR_WORK`, 87), maar `RAW_TIMEPHASED_
 * REMAINING_REGULAR_WORK` (49) gaat door een HELEMAAL ANDER pad: `getPlannedWork`. De twee delen
 * geen enkele byte-lay-out. Corpusbewijs (Z3-fixronde-meting, 3298 toewijzingen met timephased-
 * data): 3073/3298 `RAW_TIMEPHASED_REMAINING_REGULAR_WORK`-blokken passen op het 28-byte-model
 * hieronder (typische bloklengte 16 + 2×28 = 72 bytes) — de oorspronkelijke 20-byte-aanname gaf
 * daar stil `[]` op, precies de categorie die Z4 nodig heeft.
 *
 * ── Byteformaat A — REGULIER (`getCompleteWork`, categorieën 50/51 + hun irregular-tegenhanger
 * 87) — verifieer op inhoud, niet op deze samenvatting ────────────────────────────────────────
 *
 * REGULIER blok: 16-byte header (eerste 2 bytes = recordcount N, RUW) gevolgd door N+1 records van
 * 20 bytes elk. Het EERSTE van die N+1 records is een TOTAAL-record voor de hele toewijzing en
 * wordt overgeslagen (spiegelt MPXJ's `offset = 36` — 16-byte header + het 20-byte totaal-record —
 * vóórdat de N-tellende lus begint). Elk van de overige N records:
 *   offset  0: cumulatief werk aan periode-eind, DOUBLE, in 1000sten van een minuut
 *   offset  8: werk per uur deze periode, DOUBLE, in 10000sten van een uur (NIET gebruikt door
 *              deze decoder)
 *   offset 16: verstreken WERKMINUTEN aan periode-eind, INT, in 80sten van een minuut, CUMULATIEF
 *              vanaf een impliciet "periode 0"-ankerpunt
 * VÓÓR de lus leest MPXJ ÉÉN keer `finishTime = getInt(regularData, 24)` (absolute offset 24 — dat
 * valt IN het totaal-record, op wat qua veld-indeling het "werk-per-uur"-double zou zijn; MPXJ
 * hergebruikt die bytes bewust/toevallig als sanity-plafond). Per periode geldt dan: is de RUWE
 * (nog-niet-door-80-gedeelde) `elapsedMinutesAtPeriodEnd` `< 0` of `> finishTime`, dan wordt hij op
 * 0 gezet (corrupt/absurd record) i.p.v. gedeeld door 80 — `decodeRegularTimephasedWork` hieronder
 * poort deze guard letterlijk (Z3-fixronde F3(1)).
 * Werk-afronding (Z3-fixronde F3(2), letterlijk uit `getCompleteWork`): de cumulatieve-werk-DOUBLE
 * wordt eerst met een `(long)`-cast getrunceerd (bij ons: `Math.trunc`) VÓÓRDAT het verschil met de
 * vorige periode genomen wordt — dat verschil (nog in 1000sten) wordt daarna gedeeld door 1000 en
 * afgerond op de dichtstbijzijnde SECONDE (`roundMinutesToSeconds`: `Math.round(m*60)/60`). Zonder
 * die twee stappen zou een drijvendekomma-residu van bv. 1e-13 een "gat" (workMinutes===0) laten
 * lijken op een piepklein positief getal — Z4's gat-detectie hangt op een EXACTE `=== 0`-vergelijk.
 *
 * ── Byteformaat B — PLANNED/REMAINING (`getPlannedWork`, categorie 49) — apart formaat ─────────
 *
 * 16-byte header (eerste 2 bytes = blockCount N, RUW). GEEN "N+1"-conventie zoals bij Format A:
 * hier betekent N=0 een SPECIAAL geval (één samenvattend record, zie hieronder); N≥1 betekent een
 * summary-blok (overgeslagen, net als Format A's totaal-record — maar hier 28 bytes, niet 20) +
 * N periode-blokken van 28 bytes elk. Elk periode-blok:
 *   offset  0: cumulatief werk aan periode-eind, DOUBLE, in 1000sten van een minuut (GEEN
 *              `(long)`-truncatie hier — MPXJ's `getPlannedWork` mist die stap, ANDERS dan Format
 *              A; deze decoder poort dat verschil letterlijk, geen eigen "consistentie"-correctie)
 *   offset  8: uren per dag, DOUBLE, in 20000sten van een uur — NIET gebruikt (MPXJ's eigen
 *              commentaar: "unreliable value, not used")
 *   offset 16: onbekend (DOUBLE) — NIET gebruikt (MPXJ's eigen commentaar: "unknown")
 *   offset 24: cumulatief verstreken WERKMINUTEN aan periode-eind, INT, in 80sten van een minuut
 *              (LET OP: offset 24, niet 16 zoals Format A — ANDERE recordlay-out, GEEN finishTime-
 *              guard hier, MPXJ's `getPlannedWork` kent die guard niet)
 * `blockCount === 0`-geval: één samenvattend record voor de HELE toewijzing, gelezen uit het
 * summary-blok zelf (`getDouble(data, 16) / 1000`, het totale werk). MPXJ ankert dit record op
 * `assignment.getStart()`/`assignment.getResume()` én `assignment.getFinish()` — TWEE externe
 * ankerpunten die deze pure decoder niet zelfstandig kent. `decodePlannedRegularTimephasedWork`
 * ondersteunt dit geval daarom ALLEEN als de aanroeper `referenceFinish` meegeeft; zonder dat
 * levert `blockCount === 0` een lege lijst (gedocumenteerde, geen stille foutieve aanname).
 *
 * ── AFWIJKING VAN MPXJ (bewuste vereenvoudiging, expliciet vastgelegd) ──────────────────────────
 *
 * MPXJ's `getCompleteWork` weeft irregulier- en regulier-blok ALTIJD samen (calendar-bewust
 * `splitItem`) en `getPlannedWork`/`getCompleteWork` zetten hun periode-grenzen om in ECHTE
 * kalenderinstants via `ProjectCalendar.getDate`/`getNextWorkStart` — d.w.z. de "verstreken
 * WERKMINUTEN"-velden hierboven zijn WERKtijd, geen 24/7-klok, en het terugrekenen naar een
 * concrete datum vereist een kalenderwandeling (weekend/nacht/vrije dagen overslaan). Die
 * kalenderwandeling bestaat op dit niveau niet — vandaar dat elke decoder hieronder de WERKMINUUT-
 * OFFSETS als PRIMAIR resultaat teruggeeft (`elapsedWorkMinutesStart`/`End`), NIET een instant.
 * Een `approxStart`/`approxFinish`-veld is aanwezig als 24/7-KLOKMINUTEN-PROJECTIE vanaf
 * `referenceStart` — uitdrukkelijk een BENADERING die alleen klopt zolang de periode geen
 * niet-werktijd overspant, NOOIT te gebruiken voor datum-/planningsbeslissingen. De echte
 * kalenderwandeling (werkminuten → instant, kalender-bewust) is Z8's taak.
 * Verder: deze module weeft irregulier/regulier NIET samen zoals `splitItem` — dat is calendar-
 * afhankelijk en dus geen "pure decoder" meer. `decodeIrregularTimephasedWork` levert de
 * irreguliere periodes RECHTSTREEKS uit hun eigen ABSOLUTE MPP-timestamps (die zijn per definitie
 * al instants, geen projectie nodig) als eigen, apart type (`TimephasedIrregularPeriod`) — geen
 * los amount-veld bestaat in dat blok (MPXJ gebruikt het uitsluitend om een regulier record te
 * CORRIGEREN); deze decoder rekent daarom het volledige tijdvak als werk, een OPS-eigen keuze.
 * Consequentie: Z4/Z8 krijgen een RUWE, ongeweven momentopname per blok — dat is precies wat Z3
 * vraagt ("de timephased werksegmenten... leesbaar", "pure decoder, geen planningsgedrag").
 */
import { getShort, getInt, getDouble, getTimestamp } from './mppPrimitives';
import {
  clampTimephasedRegularRecordCount, clampTimephasedIrregularRecordCount, clampTimephasedPlannedRecordCount,
} from './limits';

/** Eén werkperiode uit een WERKMINUUT-gebaseerd timephased-blok (Format A of B — zie moduleheader).
 *  `elapsedWorkMinutesStart`/`End` zijn het PRIMAIRE, betrouwbare resultaat (cumulatieve
 *  werkminuten sinds het venster begon — GEEN kalenderklok). `approxStart`/`approxFinish` zijn een
 *  24/7-KLOKMINUTEN-PROJECTIE vanaf `referenceStart`, uitdrukkelijk een BENADERING (zie
 *  moduleheader's "AFWIJKING VAN MPXJ") — NOOIT gebruiken voor datum-/planningsbeslissingen; de
 *  echte kalenderwandeling is Z8's taak. */
export interface TimephasedWorkPeriod {
  /** Cumulatieve werkminuten sinds `referenceStart` tot het BEGIN van deze periode. */
  elapsedWorkMinutesStart: number;
  /** Cumulatieve werkminuten sinds `referenceStart` tot het EIND van deze periode. Altijd
   *  `> elapsedWorkMinutesStart` (zie de "geen ontaarde periodes"-filter in de decoders). */
  elapsedWorkMinutesEnd: number;
  /** Werk in deze periode, in MINUTEN — kan 0 zijn (een periode zonder werk, maar mét verstreken
   *  werkminuten: dat IS het gat dat Z4 als splitsegment herkent). Nooit gefilterd op nul. */
  workMinutes: number;
  /** BENADERING, zie het moduleheader — 24/7-klokminuten-projectie, geen kalenderwandeling. */
  approxStart: Date;
  /** BENADERING, zie het moduleheader. */
  approxFinish: Date;
}

/** Eén periode uit het IRREGULIERE blok — ECHTE absolute MPP-instants (geen projectie, de bytes
 *  dragen zelf al datum+tijd), dus GEEN aparte "approx"-onderscheiding nodig. Zie moduleheader
 *  voor waarom `workMinutes` hier de volledige tijdspanne is (OPS-eigen keuze, geen MPXJ-poort). */
export interface TimephasedIrregularPeriod {
  start: Date;
  finish: Date;
  workMinutes: number;
}

const REGULAR_HEADER_SIZE = 16;
const REGULAR_RECORD_SIZE = 20;
const PLANNED_HEADER_SIZE = 16;
const PLANNED_BLOCK_SIZE = 28;
const IRREGULAR_HEADER_SIZE = 16;
const IRREGULAR_RECORD_SIZE = 8;

/** `referenceStart + minutes` in 24/7 KLOKminuten — zie moduleheader: dit is een BENADERING
 *  (`approxStart`/`approxFinish`), geen kalenderwandeling. Lokale, triviale helper i.p.v. een
 *  import uit `@/engine/scheduler/duration`: deze module heeft geen enkele andere engine-
 *  afhankelijkheid, en een import zou schijnkoppeling toevoegen aan een module die zich expliciet
 *  presenteert als "geen planningsgedrag" — en zou bovendien NIETS aan de kalender-onjuistheid
 *  veranderen (`addElapsedMinutes` is óók 24/7, geen werkminuut-bewuste kalenderwandeling). */
function addClockMinutes(base: Date, minutes: number): Date {
  return new Date(base.getTime() + minutes * 60_000);
}

/** MPXJ's `roundMinutesToSeconds` (`TimephasedDataFactory.java`) — rondt af op de dichtstbijzijnde
 *  1/60 minuut (seconde). Zie moduleheader/F3(2): voorkomt dat een drijvendekomma-residu een
 *  `workMinutes === 0`-gat-detectie (Z4) laat missen. */
function roundMinutesToSeconds(minutes: number): number {
  return Math.round(minutes * 60) / 60;
}

/**
 * Decodeert een REGULIER timephased-blok (Format A — categorieën `ActualRegularWork`/
 * `ActualOvertimeWork`, zie moduleheader). `referenceStart` is het ankerpunt voor `approxStart`/
 * `approxFinish` — zie de "AFWIJKING VAN MPXJ"-paragraaf voor waarom dit een parameter is i.p.v.
 * een intern opgezocht veld, en waarom het uitdrukkelijk een BENADERING is.
 *
 * `data === null` (categorie niet aanwezig) of te kort voor zelfs het totaal-record ⇒ lege lijst,
 * geen exceptie (spiegelt het bestaande `readXUnsafe`-precedent).
 */
export function decodeRegularTimephasedWork(data: Uint8Array | null, referenceStart: Date, ctx = 'timephased regular'): TimephasedWorkPeriod[] {
  if (!data || data.length < REGULAR_HEADER_SIZE + REGULAR_RECORD_SIZE) return [];

  const headerCount = getShort(data, 0, ctx);
  // KLEM (hardening-checklist): de header-recordcount is een ONGEVALIDEERDE bestandswaarde.
  // STRUCTUREEL geklemd tegen wat de daadwerkelijke bloklengte kan dragen (spiegelt FixedMeta/
  // VarMeta12's adjustedItemCount-patroon — mppPrimitives.ts) VÓÓRDAT ie als lusbovengrens dient,
  // en DAARNA tegen `MAX_TIMEPHASED_REGULAR_RECORDS` (limits.ts, met meetcommentaar) als absolute
  // bovengrens. Geen allocatie is ooit met de RUWE `headerCount` gesized.
  const structuralMax = Math.max(0, Math.floor((data.length - REGULAR_HEADER_SIZE - REGULAR_RECORD_SIZE) / REGULAR_RECORD_SIZE));
  const count = clampTimephasedRegularRecordCount(Math.min(Math.max(0, headerCount), structuralMax));

  // F3(1): finishTime-sanity-plafond, ÉÉN keer gelezen (spiegelt MPXJ's `getInt(regularData, 24)`
  // vóór de lus — absolute offset 24, binnen het totaal-record, ONGEACHT of dat record verder
  // gebruikt wordt). `data.length` is hier al ≥ 36 (guard hierboven), dus offset 24 is altijd
  // binnen bereik.
  const finishTime = getInt(data, 24, ctx);

  const result: TimephasedWorkPeriod[] = [];
  let prevRawCumulativeWork = 0; // RUW (1000sten van een minuut), getrunceerd — zie F3(2)
  let prevCumulativeElapsedMinutes = 0;
  for (let i = 0; i < count; i++) {
    // +REGULAR_RECORD_SIZE: het EERSTE fysieke record (bytes 16..36) is het totaal-record en wordt
    // overgeslagen — periode-index 0 hieronder leest dus al het TWEEDE fysieke record.
    const offset = REGULAR_HEADER_SIZE + REGULAR_RECORD_SIZE + i * REGULAR_RECORD_SIZE;

    // F3(2): `(long)`-truncatie VÓÓR het verschil (MPXJ: "(long) MPPUtility.getDouble(...)").
    const rawCumulativeWork = Math.trunc(getDouble(data, offset, ctx));

    // F3(1): de RUWE (nog-niet-door-80-gedeelde) waarde eerst tegen `finishTime` toetsen.
    const rawElapsed = getInt(data, offset + 16, ctx);
    const cumulativeElapsedMinutes = (rawElapsed < 0 || rawElapsed > finishTime) ? 0 : rawElapsed / 80;

    const periodElapsedMinutes = cumulativeElapsedMinutes - prevCumulativeElapsedMinutes;
    // Geen ontaarde (nul-lengte) periodes — spiegelt MPXJ's `removeEmptyItems` (start===finish
    // weggefilterd). Een periode ZONDER werk maar MET verstreken werkminuten blijft wél staan (dat
    // is het gat dat Z4 straks herkent) — alleen `periodElapsedMinutes <= 0` wordt overgeslagen.
    if (periodElapsedMinutes > 0) {
      result.push({
        elapsedWorkMinutesStart: prevCumulativeElapsedMinutes,
        elapsedWorkMinutesEnd: cumulativeElapsedMinutes,
        workMinutes: roundMinutesToSeconds((rawCumulativeWork - prevRawCumulativeWork) / 1000),
        approxStart: addClockMinutes(referenceStart, prevCumulativeElapsedMinutes),
        approxFinish: addClockMinutes(referenceStart, cumulativeElapsedMinutes),
      });
    }
    prevRawCumulativeWork = rawCumulativeWork;
    prevCumulativeElapsedMinutes = cumulativeElapsedMinutes;
  }
  return result;
}

/**
 * Decodeert een PLANNED/REMAINING timephased-blok (Format B — categorie `RemainingRegularWork`,
 * zie moduleheader). ANDER formaat dan `decodeRegularTimephasedWork` (28-byte records, elapsed op
 * offset 24, geen finishTime-guard, geen `(long)`-truncatie op het werkveld) — poort van MPXJ's
 * `getPlannedWork`, NIET `getCompleteWork`.
 *
 * `referenceFinish` (OPTIONEEL): alleen nodig voor het `blockCount === 0`-speciale geval (één
 * samenvattend record voor de hele toewijzing — zie moduleheader). Zonder `referenceFinish` levert
 * dat geval een lege lijst (gedocumenteerde beperking, geen aanname).
 */
export function decodePlannedRegularTimephasedWork(
  data: Uint8Array | null,
  referenceStart: Date,
  referenceFinish?: Date,
  ctx = 'timephased planned',
): TimephasedWorkPeriod[] {
  if (!data || data.length < PLANNED_HEADER_SIZE + 8) return []; // te kort voor zelfs het cumulatieve-werkveld van het summary-blok

  const blockCount = getShort(data, 0, ctx);

  if (blockCount === 0) {
    if (!referenceFinish) return []; // geen tweede ankerpunt beschikbaar — zie moduleheader
    const totalWorkMinutes = getDouble(data, 16, ctx) / 1000;
    if (totalWorkMinutes === 0) return []; // MPXJ: "If the total work for the block is zero it's not valid"
    return [{
      elapsedWorkMinutesStart: 0,
      elapsedWorkMinutesEnd: Math.max(0, (referenceFinish.getTime() - referenceStart.getTime()) / 60_000),
      workMinutes: totalWorkMinutes,
      approxStart: referenceStart,
      approxFinish: referenceFinish,
    }];
  }

  // STRUCTUREEL + ABSOLUUT geklemd, zelfde tweetraps-discipline als de reguliere decoder — eigen
  // klem (`MAX_TIMEPHASED_PLANNED_RECORDS`, limits.ts) omdat dit blok een andere recordgrootte
  // (28 i.p.v. 20 bytes) en dus een andere structurele afleiding heeft.
  const structuralMax = Math.max(0, Math.floor((data.length - PLANNED_HEADER_SIZE - PLANNED_BLOCK_SIZE) / PLANNED_BLOCK_SIZE));
  const count = clampTimephasedPlannedRecordCount(Math.min(Math.max(0, blockCount), structuralMax));

  const result: TimephasedWorkPeriod[] = [];
  let prevCumulativeWorkMinutes = 0; // GEEN `(long)`-truncatie hier — `getPlannedWork` mist die stap (moduleheader)
  let prevCumulativeElapsedMinutes = 0;
  for (let i = 0; i < count; i++) {
    // +PLANNED_BLOCK_SIZE: het EERSTE fysieke blok (bytes 16..44) is het summary-blok en wordt
    // overgeslagen (spiegelt MPXJ's `offset = 16 + 28`).
    const offset = PLANNED_HEADER_SIZE + PLANNED_BLOCK_SIZE + i * PLANNED_BLOCK_SIZE;
    const cumulativeWorkMinutes = getDouble(data, offset, ctx) / 1000;
    // LET OP: offset 24, NIET 16 — andere recordlay-out dan Format A (zie moduleheader).
    const cumulativeElapsedMinutes = getInt(data, offset + 24, ctx) / 80;

    const periodElapsedMinutes = cumulativeElapsedMinutes - prevCumulativeElapsedMinutes;
    if (periodElapsedMinutes > 0) {
      result.push({
        elapsedWorkMinutesStart: prevCumulativeElapsedMinutes,
        elapsedWorkMinutesEnd: cumulativeElapsedMinutes,
        workMinutes: cumulativeWorkMinutes - prevCumulativeWorkMinutes,
        approxStart: addClockMinutes(referenceStart, prevCumulativeElapsedMinutes),
        approxFinish: addClockMinutes(referenceStart, cumulativeElapsedMinutes),
      });
    }
    prevCumulativeWorkMinutes = cumulativeWorkMinutes;
    prevCumulativeElapsedMinutes = cumulativeElapsedMinutes;
  }
  return result;
}

/**
 * Decodeert een IRREGULIER timephased-blok (zie moduleheader). Geen referentiepunt nodig — de
 * twee 4-byte velden per record zijn al absolute MPP-timestamps.
 */
export function decodeIrregularTimephasedWork(data: Uint8Array | null, ctx = 'timephased irregular'): TimephasedIrregularPeriod[] {
  if (!data || data.length < IRREGULAR_HEADER_SIZE) return [];

  const headerCount = getShort(data, 0, ctx);
  // Zelfde tweetraps-klem-discipline als hierboven, eigen constante (limits.ts) omdat dit blok een
  // andere recordgrootte/verwachte-dichtheid heeft.
  const structuralMax = Math.max(0, Math.floor((data.length - IRREGULAR_HEADER_SIZE) / IRREGULAR_RECORD_SIZE));
  const count = clampTimephasedIrregularRecordCount(Math.min(Math.max(0, headerCount), structuralMax));

  const result: TimephasedIrregularPeriod[] = [];
  for (let i = 0; i < count; i++) {
    const offset = IRREGULAR_HEADER_SIZE + i * IRREGULAR_RECORD_SIZE;
    const start = getTimestamp(data, offset, ctx);
    const finish = getTimestamp(data, offset + 4, ctx);
    // getTimestamp geeft null terug voor MPP se eigen "N/A"-heuristieken (mppPrimitives.ts) — een
    // NA-timestamp of een ontaarde/omgekeerde periode wordt overgeslagen, geen crash.
    if (!start || !finish || finish.getTime() <= start.getTime()) continue;
    result.push({ start, finish, workMinutes: (finish.getTime() - start.getTime()) / 60_000 });
  }
  return result;
}

/** Vier ruwe timephased-byte-blokken voor ÉÉN toewijzing — spiegelt de scope-begrenzing hierboven
 *  (`AssignmentFieldId`'s vier categorieën). `mppEntities.ts`'s `readAssignmentTimephasedRaw`
 *  vult dit type; `null` per veld = die categorie is voor deze toewijzing legitiem afwezig (geen
 *  var-data-entry voor die sleutel — normaal voor een toewijzing zonder contouring/restwerk).
 *  `remainingRegularWork` decodeert via `decodePlannedRegularTimephasedWork` (Format B); de
 *  overige drie via `decodeRegularTimephasedWork`/`decodeIrregularTimephasedWork` (Format A) —
 *  zie moduleheader voor waarom dat GEEN gedeeld formaat is. */
export interface AssignmentTimephasedRaw {
  actualRegularWork: Uint8Array | null;
  remainingRegularWork: Uint8Array | null;
  actualOvertimeWork: Uint8Array | null;
  actualIrregularWork: Uint8Array | null;
}

/** `true` zodra minstens één van de vier categorieën daadwerkelijk data draagt — het corpus-
 *  telcriterium voor acceptatiepunt 5 (zie `check-mpp-import.ts`'s Z3-corpussectie) en een
 *  handige eerste vraag vóór Z4 de duurdere byte-decodering aanroept. */
export function hasAnyTimephasedData(raw: AssignmentTimephasedRaw): boolean {
  return raw.actualRegularWork !== null || raw.remainingRegularWork !== null
    || raw.actualOvertimeWork !== null || raw.actualIrregularWork !== null;
}
