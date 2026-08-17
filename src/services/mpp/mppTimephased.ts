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
 * `TimephasedWork`-records. Poort-bron: `TimephasedDataFactory.java`'s `getCompleteWork` (regulier
 * + irregulier blok) — in eigen woorden hieronder, zie de "AFWIJKING VAN MPXJ"-paragraaf voor
 * waar en waarom deze decoder bewust simpeler is dan de Java-bron.
 *
 * SCOPE-BEGRENZING (plan-Z3, letterlijk overgenomen besluit): uitsluitend de categorieën die Z4
 * (splitsegmenten afleiden) en Z8 (timephased venster bepaalt taakdatums) nodig hebben — actual
 * regular work, remaining regular work, actual overtime work, en hun irregular-tegenhanger. NIET
 * de 11 baseline-timephased-varianten (`RAW_TIMEPHASED_BASELINE_WORK`/`_COST` × 11), NIET de
 * kostcategorieën (`RAW_TIMEPHASED_BUDGET_COST`, timephased cost) — die dragen niets bij aan
 * datums en zouden het geteste oppervlak verdubbelen zonder een acceptatiepunt te dienen. Zie
 * `fieldMap14.ts`'s `AssignmentFieldId`-toelichting voor de vier concrete var-data-sleutels.
 *
 * ── Byteformaat (verifieer op inhoud, niet op deze samenvatting — `TimephasedDataFactory.java`
 * `getCompleteWork`) ────────────────────────────────────────────────────────────────────────────
 *
 * REGULIER blok: 16-byte header (eerste 2 bytes = recordcount N, RUW — zie de klem-toelichting
 * onderaan) gevolgd door N+1 records van 20 bytes elk. Het EERSTE van die N+1 records is een
 * TOTAAL-record voor de hele toewijzing en wordt overgeslagen (spiegelt MPXJ's `offset = 36`
 * — 16-byte header + het 20-byte totaal-record — vóórdat de N-tellende lus begint). Elk van de
 * overige N records:
 *   offset  0: cumulatief werk aan periode-eind, DOUBLE, in 1000sten van een minuut
 *   offset  8: werk per uur deze periode, DOUBLE, in 10000sten van een uur (NIET gebruikt door
 *              deze decoder — `workMinutes` hieronder komt uit het cumulatieve-werkveld, niet uit
 *              een herberekend tarief; ongebruikt veld, geen aparte lezing nodig)
 *   offset 16: verstreken tijd aan periode-eind, INT, in 80sten van een minuut, CUMULATIEF vanaf
 *              een impliciet "periode 0"-ankerpunt (`referenceStart`, zie hieronder)
 *
 * IRREGULIER blok: 16-byte header (eerste 2 bytes = recordcount, dezelfde klem-discipline) +
 * N records van 8 bytes elk — twee 4-byte MPP-timestamps (start/eind van een periode werk BUITEN
 * standaard werktijd, `MPPUtility.getTimestamp`-formaat, zie `mppPrimitives.ts`'s `getTimestamp`).
 *
 * ── AFWIJKING VAN MPXJ (bewuste vereenvoudiging, expliciet vastgelegd — plan-§Z3 vraagt zelf om
 * een "pure decoder, geen planningsgedrag", niet om MPXJ 1:1 na te bouwen) ─────────────────────
 *
 * MPXJ's `getCompleteWork` weeft irregulier- en regulier-blok ALTIJD samen: het itereert de
 * reguliere periodes, en waar een irregulier-tijdvak (gedeeltelijk) samenvalt, wordt het reguliere
 * record gesplitst/herschreven zodat het exacte irregulier-tijdvak als eigen periode verschijnt
 * (`splitItem`, calendar-bewust — leunt op `ProjectCalendar.getDate`/`getNextWorkStart`). Die
 * weefstap is calendar-afhankelijk en dus GEEN "pure decoder" meer — buiten scope hier (en van
 * geen enkel ander Z-nummer in dit plan: Z4/Z8 consumeren de twee lijsten apart, zie hun eigen
 * moduleheader-toelichting zodra ze landen). Deze module decodeert de twee blokken daarom
 * ONAFHANKELIJK van elkaar, elk als een eigen `TimephasedWork[]`:
 *  - `decodeRegularTimephasedWork` levert de reguliere periodes, geankerd op een expliciet
 *    meegegeven `referenceStart` (de eerste periode begint daar; elke volgende periode begint waar
 *    de vorige eindigde — 24/7 KLOKMINUTEN, geen kalenderwandeling, want die kalender bestaat op
 *    dit niveau niet). `referenceStart` komt in productiegebruik van de toewijzing/taak — dat is
 *    Z4/Z8's aansluitpunt, niet dit bestand s eigen zorg (vandaar een parameter, geen impliciete
 *    "nu"-default).
 *  - `decodeIrregularTimephasedWork` levert de irreguliere periodes RECHTSTREEKS uit hun eigen
 *    absolute timestamps (geen referentiepunt nodig — de bytes dragen zelf al een datum+tijd).
 *    Voor `workMinutes` bestaat GEEN los amount-veld in dit blok (MPXJ gebruikt het uitsluitend om
 *    een regulier record te CORRIGEREN, nooit als eigen bedrag) — deze decoder rekent daarom het
 *    volledige tijdvak als werk (`(eind-start)`-duur in minuten, tarief 1). Dat is een OPS-eigen,
 *    expliciet hier vastgelegde keuze, geen MPXJ-poort; als een latere taak (Z4/Z8) op het corpus
 *    meet dat dat niet klopt, hoort die correctie daar, met de meting als motivering (plan-§2/§9,
 *    "corpus is het orakel").
 * Consequentie: waar MPXJ vlak vóór/na een irregulier-tijdvak de reguliere periode al bijgeknipt
 * heeft, geven de twee lijsten hier een RUWE, ongeweven momentopname van elk blok apart. Dat is
 * precies wat Z3 vraagt ("de timephased werksegmenten... leesbaar", "pure decoder, geen
 * planningsgedrag") en volstaat voor Z4's afleiding (segment met nul werk = gat) — het weven blijft
 * een expliciet openstaand punt voor wie hierop verder bouwt.
 */
import { getShort, getInt, getDouble, getTimestamp } from './mppPrimitives';
import { clampTimephasedRegularRecordCount, clampTimephasedIrregularRecordCount } from './limits';

/** Eén werkperiode uit een timephased-blok — puur een decodeerresultaat, geen afgeleid/berekend
 *  planningsveld (spiegelt MPXJ's `TimephasedWork`, vereenvoudigd tot wat Z4/Z8 nodig hebben: geen
 *  `amountPerHour`, dat is een tussenresultaat dat deze decoder zelf al verwerkt heeft). */
export interface TimephasedWork {
  /** Start van deze periode (UTC-instant — spiegelt `mppPrimitives.ts`'s UTC-discipline). */
  start: Date;
  /** Eind van deze periode. Altijd `> start` (zie de "geen ontaarde periodes"-filter hieronder). */
  finish: Date;
  /** Werk in deze periode, in MINUTEN — kan 0 zijn (een periode zonder werk, maar mét verstreken
   *  tijd: dat IS het gat dat Z4 straks als splitsegment herkent, zie deze module se moduleheader
   *  en de acceptatietoelichting bij `decodeRegularTimephasedWork`). Nooit gefilterd op nul. */
  workMinutes: number;
}

const REGULAR_HEADER_SIZE = 16;
const REGULAR_RECORD_SIZE = 20;
const IRREGULAR_HEADER_SIZE = 16;
const IRREGULAR_RECORD_SIZE = 8;

/** `referenceStart + minutes` in 24/7 KLOKminuten (geen kalender — zie moduleheader). Lokale,
 *  triviale helper i.p.v. een import uit `@/engine/scheduler/duration`'s `addElapsedMinutes`: deze
 *  module heeft geen enkele andere engine-afhankelijkheid en `Date`-rekenen op minuten is hier maar
 *  één regel, dus een import zou alleen schijnkoppeling toevoegen aan een module die zich expliciet
 *  presenteert als "geen planningsgedrag". */
function addClockMinutes(base: Date, minutes: number): Date {
  return new Date(base.getTime() + minutes * 60_000);
}

/**
 * Decodeert een REGULIER timephased-blok (zie moduleheader voor de byte-lay-out). `referenceStart`
 * is het ankerpunt voor de EERSTE periode — zie de "AFWIJKING VAN MPXJ"-paragraaf hierboven voor
 * waarom dit een parameter is i.p.v. een intern opgezocht veld.
 *
 * `data === null` (categorie niet aanwezig voor deze toewijzing) of te kort voor zelfs het
 * totaal-record ⇒ lege lijst, geen exceptie (spiegelt het bestaande `readXUnsafe`-precedent: een
 * ontbrekende/te-korte optionele stream is een legitieme "geen data", geen leesfout).
 */
export function decodeRegularTimephasedWork(data: Uint8Array | null, referenceStart: Date, ctx = 'timephased regular'): TimephasedWork[] {
  if (!data || data.length < REGULAR_HEADER_SIZE + REGULAR_RECORD_SIZE) return [];

  const headerCount = getShort(data, 0, ctx);
  // KLEM (hardening-checklist): de header-recordcount is een ONGEVALIDEERDE bestandswaarde.
  // STRUCTUREEL geklemd tegen wat de daadwerkelijke bloklengte kan dragen (spiegelt FixedMeta/
  // VarMeta12's adjustedItemCount-patroon — mppPrimitives.ts) VÓÓRDAT ie als lusbovengrens dient,
  // en DAARNA tegen `MAX_TIMEPHASED_REGULAR_RECORDS` (limits.ts, met meetcommentaar) als absolute
  // bovengrens. Geen allocatie is ooit met de RUWE `headerCount` gesized — `result` groeit gewoon
  // met `push`, begrensd door deze twee klemmen.
  const structuralMax = Math.max(0, Math.floor((data.length - REGULAR_HEADER_SIZE - REGULAR_RECORD_SIZE) / REGULAR_RECORD_SIZE));
  const count = clampTimephasedRegularRecordCount(Math.min(Math.max(0, headerCount), structuralMax));

  const result: TimephasedWork[] = [];
  let prevCumulativeWorkMinutes = 0;
  let prevCumulativeElapsedMinutes = 0;
  for (let i = 0; i < count; i++) {
    // +REGULAR_RECORD_SIZE: het EERSTE fysieke record (bytes 16..36) is het totaal-record en wordt
    // overgeslagen — periode-index 0 hieronder leest dus al het TWEEDE fysieke record.
    const offset = REGULAR_HEADER_SIZE + REGULAR_RECORD_SIZE + i * REGULAR_RECORD_SIZE;
    const cumulativeWorkMinutes = getDouble(data, offset, ctx) / 1000;
    const cumulativeElapsedMinutes = getInt(data, offset + 16, ctx) / 80;

    const periodElapsedMinutes = cumulativeElapsedMinutes - prevCumulativeElapsedMinutes;
    // Geen ontaarde (nul-lengte) periodes — spiegelt MPXJ's `removeEmptyItems` (start===finish
    // weggefilterd). Een periode ZONDER werk maar MET verstreken tijd blijft wél staan (dat is het
    // gat dat Z4 straks herkent) — alleen `periodElapsedMinutes <= 0` wordt overgeslagen.
    if (periodElapsedMinutes > 0) {
      result.push({
        start: addClockMinutes(referenceStart, prevCumulativeElapsedMinutes),
        finish: addClockMinutes(referenceStart, cumulativeElapsedMinutes),
        workMinutes: cumulativeWorkMinutes - prevCumulativeWorkMinutes,
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
export function decodeIrregularTimephasedWork(data: Uint8Array | null, ctx = 'timephased irregular'): TimephasedWork[] {
  if (!data || data.length < IRREGULAR_HEADER_SIZE) return [];

  const headerCount = getShort(data, 0, ctx);
  // Zelfde tweetraps-klem-discipline als hierboven, eigen constante (limits.ts) omdat dit blok een
  // andere recordgrootte/verwachte-dichtheid heeft.
  const structuralMax = Math.max(0, Math.floor((data.length - IRREGULAR_HEADER_SIZE) / IRREGULAR_RECORD_SIZE));
  const count = clampTimephasedIrregularRecordCount(Math.min(Math.max(0, headerCount), structuralMax));

  const result: TimephasedWork[] = [];
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
 *  var-data-entry voor die sleutel — normaal voor een toewijzing zonder contouring/restwerk). */
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
