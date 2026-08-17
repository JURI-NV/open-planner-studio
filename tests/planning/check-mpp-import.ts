// MPP-import (fase 3.8 etappe 1, taak T3+): CFB/OLE2-container-regressie + MPP-primitievenlaag.
//
// Twee lagen dekking:
//  1. SYNTHETISCHE FIXTURES (deze module en `mppFixtures.ts` bouwen zelf minimale, geldige
//     CFB-/MPP-bytes) — draaien ALTIJD, ook zonder corpus. Dit is de dekking die CI daadwerkelijk
//     op de CFB-laag ÉN de MPP-primitievenlaag heeft: byte-exacte round-trips, grenswaarden
//     (FAT/mini-stream-grens, VarMeta12-itemCount-clamping) en een reeks vijandige varianten
//     (afgekapte bestanden, foute headers, cyclische FAT, self-referencing directory-child,
//     sectornummer buiten bereik, een zelf-lussende DIFAT-sector, een N-niveaus-diepe
//     duplicaat-sibling-keten, en — sinds de T4-kwaliteitsreview — hostile itemCount-claims op
//     VarMeta12) die stuk voor stuk een nette fout moeten geven (of, voor de grensgevallen, snel
//     en veilig moeten slagen) — nooit een hang, geheugenexplosie of rauwe RangeError.
//  2. CORPUS-GEDREVEN structuurcheck tegen echte `.mpp`-bestanden. GEEN IN-REPO FIXTURE: het
//     corpus bestaat uit echte bedrijfsbestanden van de gebruiker die NOOIT in de repo mogen
//     komen — zowel omdat het geen testdata is die we mogen distribueren, als omdat er zonder
//     een MS Project-licentie geen licentieschoon `.mpp`-bestand te fabriceren is. Deze laag leest
//     ze dus via een pad buiten de repo (override met OPS_MPP_CORPUS). Op CI-machines (en bij elke
//     contributor zonder dat pad) is het corpus afwezig — die laag slaat dan netjes over, maar
//     (C3) beïnvloedt NOOIT de einduitslag: het eindoordeel hieronder kijkt altijd naar alle
//     verzamelde `diffs`, ook de synthetische-fixture- en negatieve-casusdiffs van hierboven.
//
// De CFB-headerboilerplate (magic/versie-/sectorshift-velden, DIFAT, directory-naamschrijver) en
// de MPP-blokencoders (CompObj/Props14) wonen sinds de T4-kwaliteitsreview in `mppFixtures.ts`
// (M6) — gedeeld, zodat T5–T9 (die eigen backend-storage-fixtures gaan bouwen voor TBkndTask/
// TBkndCal/TBkndCons/TBkndRsc/TBkndAssn) er direct op kunnen voortbouwen.
//
// Deze check groeit mee met de latere MPP-taken (T4–T7 bouwen de container-/veldlagen erbovenop;
// T9 breidt 'm uit met een echt content-contract tegen de MSPDI-ground-truth). T3/T4 bewijzen dat
// de CFB-laag en de MPP-containerlaag de bekende MPP14-containerstructuur foutloos — en veilig —
// opleveren.
//
// Draait via run.sh (binnen het RUN_HOLIDAYS-blok) en draait daarna ook 5x mee in de
// tijdzone-matrix — daarom bewust geen tijdzone-gevoelige logica hierin (geen Date-aanmaak voor
// domeinlogica; alleen bytes/structuur en — uitsluitend voor de tijdslimiet-bewaking hieronder —
// `Date.now()`-verschillen, die tijdzone-onafhankelijk zijn).
//
// DEKKINGSKAART (T9 — dit bestand is exclusief T3/T4/T5/T9-territorium; kalenders zitten in
// check-mpp-calendars.ts (T6), relaties/resources/assignments in check-mpp-relations.ts (T7)):
//   - CFB/OLE2-laag (container, DIFAT/FAT/mini-stream, hostile varianten)        → SYNTHETISCH, altijd
//   - MPP-containerlaag (CompObj/Props14-detectie, wachtwoordpoort MPP_ENCRYPTED/
//     MPP_LEGACY)                                                                → SYNTHETISCH, altijd
//   - MPP-primitieven (FixedMeta/FixedData/VarMeta12/Var2Data/MPPUtility-equiv.)  → SYNTHETISCH, altijd
//   - TBkndTask-structuurcheck (storages/streams aanwezig, itemCount>0)          → CORPUS (3 bestanden)
//   - Taken + hiërarchie/WBS/milestone/constraint/deadline/completion (T5)       → CORPUS (3 ground-
//     truth-paren, naam-gematcht + per-veldsoort-budget, zie de T5-sectietoelichting)
//   - readMPP() end-to-end, geen-exception + gepind taakaantal + spooktaak-
//     plausibiliteit (T9)                                                        → CRAWL (49 bestanden)
// Corpus/crawl-afwezig ⇒ nette OK-skip, beïnvloedt NOOIT de einduitslag (C3, zie hierboven). Zie
// check-mpp-calendars.ts en check-mpp-relations.ts voor hun eigen dekkingskaart.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { CfbFile } from '@/services/mpp/cfb';
import { detectMppVariant, assertReadable, Props } from '@/services/mpp/mppContainer';
import {
  FixedMeta, FixedData, VarMeta12, Var2Data,
  getUnicodeString, getTimestamp, getGUID, getDuration, getDate, getTime, getDurationTimeUnits, getDouble,
  type MppTimeUnit,
} from '@/services/mpp/mppPrimitives';
import { MppUnsupportedError } from '@/services/mpp/errors';
import {
  SECTOR, HEADER,
  buildSyntheticCfb, buildDuplicateSiblingCfb, buildTwoRootStreamsCfb, buildNestedCfb,
  encodeCompObjFileFormat, encodePropsEntries, encodePropsSingleByteEntry,
  expectCfbError, expectMppError, bytesEqual, buildVarMetaBytes,
  buildCalFixedMetaBlob, buildCalFixedDataRecord, buildCalHoursBlock,
  type CfbTreeNode,
} from './mppFixtures';
import {
  readMPP, assignHierarchyAndWbs, clampOutlineLevel, MAX_OUTLINE_LEVEL,
  openMppProject, parseProjectProperties, readTasks,
  type ReadTasksResult, type RawTaskScan,
} from '@/services/mpp/mppReader';
import { readCalendars } from '@/services/mpp/mppCalendars';
import { MAX_VAR_TEXT_BYTES, MAX_MANUAL_DURATION_TENTHS } from '@/services/mpp/limits';
import { tenthsOfMinutesToDays } from '@/services/importDurations';
import { formatInstant } from '@/utils/dateUtils';
import { readMSPDI } from '@/services/msproject/mspdiReader';
import { installDOMParser } from './xmldom-shim';
import type { Task } from '@/types/task';
import {
  createTaskFieldMap, createResourceFieldMap, createAssignmentFieldMap,
  TaskFieldId, ResourceFieldId, AssignmentFieldId,
  fixedOffsetOf, fixed2OffsetOf, varDataKeyOf,
} from '@/services/mpp/fieldMap14';
import {
  decodeRegularTimephasedWork, decodeIrregularTimephasedWork, hasAnyTimephasedData,
  type TimephasedWork,
} from '@/services/mpp/mppTimephased';
import { readAssignmentTimephasedRaw } from '@/services/mpp/mppEntities';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const diffs: string[] = [];
let checks = 0;
const truthy = (label: string, cond: boolean) => {
  checks++;
  if (!cond) diffs.push(`${label}: verwacht waar, kreeg onwaar`);
};
/** T5's budget-gedekte "soft"-veldvergelijkingen (start/finish/duur/outline-diepte/
 *  constraintdatum in de MSPDI-ground-truth-vergelijking) tellen NIET mee in `checks`
 *  (T5-kwaliteitsreview-minor — expliciet APART geteld i.p.v. in de gezamenlijke `checks`-som
 *  verstopt, zodat "alle checks groen (N)" een schone poort-telling blijft: elke `truthy`-poort
 *  die een ECHTE pass/fail-beslissing neemt, plus een los-gerapporteerd aantal diagnostische
 *  soft-vergelijkingen dat zelf tegen een basislijn-budget loopt, niet tegen `diffs`). */
let softChecksTotal = 0;

// ── Negatieve casus (in-memory, altijd uitgevoerd — onafhankelijk van het corpus) ────────────
{
  let threw = false;
  let message = '';
  try {
    void new CfbFile(new Uint8Array(600));
  } catch (err) {
    threw = true;
    message = err instanceof Error ? err.message : String(err);
  }
  truthy('00 niet-CFB-bytes: constructor gooit', threw);
  truthy('00b niet-CFB-bytes: nette CFB-foutmelding', message.startsWith('CFB:'));
}

// ── T7-restpunt (N1/N2): tenthsOfMinutesToDays met een NIET-dyadische hoursPerDay (7,6667u/dag =
// 460 minuten/dag) — het geval waar de afrondingsvolgorde daadwerkelijk uitmaakt (zie de
// toelichting in importDurations.ts). 16100 tienden-van-minuut = 1610 minuten; 1610/460 = 3,5
// dagen, en JS' Math.round rondt .5 naar boven ⇒ 4. ─────────────────────────────────────────────
{
  truthy(
    '00c tenthsOfMinutesToDays(16100, 460/60) === 4 (niet-dyadische hoursPerDay, halve-dag-grens)',
    tenthsOfMinutesToDays(16100, 460 / 60) === 4,
  );
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// I2 — synthetische CFB-fixtures (±geen corpus nodig)
// ═══════════════════════════════════════════════════════════════════════════════════════════
const synthetic = buildSyntheticCfb();

// ── Basisbewijs: round-trip + FAT/mini-stream-grens + entry.size-contract ────────────────────
{
  const cfb = new CfbFile(synthetic.bytes);
  const entryA = cfb.root.children.get('StreamA') ?? null;
  const entryB = cfb.root.children.get('StreamB') ?? null;
  truthy('I2 StreamA-entry gevonden (mini-stream-pad, size<4096)', entryA?.size === 4095);
  truthy('I2 StreamB-entry gevonden (gewone-FAT-pad, size===4096)', entryB?.size === 4096);

  const gotA = cfb.getStream(['StreamA']);
  const gotB = cfb.getStream(['StreamB']);
  truthy('I2 StreamA: getStream(...).length === entry.size', gotA?.length === entryA?.size);
  truthy('I2 StreamB: getStream(...).length === entry.size', gotB?.length === entryB?.size);
  truthy('I2 StreamA: byte-exacte round-trip', !!gotA && bytesEqual(gotA, synthetic.streamA));
  truthy('I2 StreamB: byte-exacte round-trip', !!gotB && bytesEqual(gotB, synthetic.streamB));
}

// ── Vijandige varianten: elk moet snel en nette falen (of, voor de self-reference, snel en
// veilig slagen) — nooit een hang, nooit een rauwe RangeError. ────────────────────────────────
const TIME_LIMIT_MS = 2000;

// Afgekapt bestand: geknipt hálverwege de FAT-sector zelf (header blijft intact — die alleen zou
// de header-checks niet raken — maar sector 0 kan niet meer volledig gelezen worden). Halverwege
// het HELE bestand knippen bleek niet genoeg: header/FAT/directory/mini-FAT passen ruim in de
// eerste ~2 KB, dus de constructor zelf slaagt dan gewoon (de afgeknipte streamdata wordt pas
// gelezen bij een latere getStream()-aanroep, die deze test niet doet).
expectCfbError(truthy, 'I2 afgekapt bestand', () => {
  const truncated = synthetic.bytes.slice(0, HEADER + SECTOR / 2);
  void new CfbFile(truncated);
});

// Foute sectorShift voor de opgegeven major version (I3).
expectCfbError(truthy, 'I2 verkeerde sectorShift/version-combinatie', () => {
  const bad = new Uint8Array(synthetic.bytes);
  new DataView(bad.buffer).setUint16(30, 10, true); // major version 3 verwacht shift 9, niet 10
  void new CfbFile(bad);
});

// Cyclische FAT: de directory-sector (1) wijst naar zichzelf i.p.v. ENDOFCHAIN.
expectCfbError(truthy, 'I2 cyclische FAT', () => {
  const cyclic = new Uint8Array(synthetic.bytes);
  new DataView(cyclic.buffer).setUint32(HEADER + 1 * 4, 1, true); // FAT[1] = 1 (self-loop)
  void new CfbFile(cyclic);
});

// Sectornummer buiten bereik: StreamB's startsector wijst ver voorbij het bestand. De
// constructor zelf leest StreamB's inhoud nog niet (dat gebeurt pas on-demand in getStream), dus
// de fout valt daar.
expectCfbError(truthy, 'I2 sectornummer buiten bereik', () => {
  const oor = new Uint8Array(synthetic.bytes);
  const dirOff = HEADER + 1 * SECTOR;
  new DataView(oor.buffer).setUint32(dirOff + 256 + 116, 999999, true); // StreamB-entry (idx 2)
  const cfb = new CfbFile(oor);
  void cfb.getStream(['StreamB']);
});

// Self-referencing directory-child: entry 3 (ongebruikt in de basisfixture) wordt een storage
// wiens EIGEN child-veld naar zichzelf wijst, opgehangen aan de boom via StreamB.right. C1's fix
// (gedeelde visited-set + iteratieve opbouw) slaat een al bezocht id stilzwijgend over — de
// verwachte uitkomst is dus een SNELLE, GESLAAGDE constructie (geen hang, geen stack-overflow);
// mocht de implementatie toch besluiten te gooien, dan moet dat een nette CFB-fout zijn.
{
  const selfRef = new Uint8Array(synthetic.bytes);
  const view = new DataView(selfRef.buffer);
  const dirOff = HEADER + 1 * SECTOR;
  view.setUint32(dirOff + 256 + 72, 3, true); // StreamB.right = entry 3
  const e3 = dirOff + 384; // entry 3
  view.setUint8(e3 + 66, 1); // type storage
  view.setUint32(e3 + 68, 0xffffffff, true); // left
  view.setUint32(e3 + 72, 0xffffffff, true); // right
  view.setUint32(e3 + 76, 3, true); // child = zichzelf (id 3)

  const start = Date.now();
  let threw = false;
  let message = '';
  try {
    const cfb = new CfbFile(selfRef);
    void cfb.root; // forceer dat de boomopbouw al voltooid is
  } catch (err) {
    threw = true;
    message = err instanceof Error ? err.message : String(err);
  }
  const elapsedMs = Date.now() - start;
  truthy(`I2 self-referencing directory-child: binnen tijdslimiet (${elapsedMs}ms < ${TIME_LIMIT_MS}ms)`, elapsedMs < TIME_LIMIT_MS);
  truthy('I2 self-referencing directory-child: geen crash buiten het CFB-contract', !threw || message.startsWith('CFB:'));
}

// ── T3-slot (herreview): DIFAT-zelflus + vijandig grote numFatSectors ────────────────────────
// Reproduceert precies het lek dat Fix 1 dichtte: `numFatSectors` is een ongevalideerde u32 —
// vóór Fix 1 kon `cap` in `readDifat` daardoor feitelijk ongelimiteerd zijn (`Infinity` bij een
// grote waarde), en liep een zelf-lussende DIFAT-keten net zo lang door tot het RUIMERE mini-
// korrel-stapbudget haar stopte. Gemeten op 20 MB geprepareerde invoer: 932 MB piekgeheugen vóór
// de nette fout viel. Deze DIFAT-sector bevat uitsluitend FREESECT-waarden (draagt dus NOOIT bij
// aan `difat.length`, dus de `cap`-kortsluiting alleen zou 'm niet vroegtijdig stoppen) en wijst
// met haar "volgende DIFAT-sector"-veld naar zichzelf — puur `maxSectorSteps` (bestandsgrootte-
// gebaseerd, NIET `numFatSectors`-gebaseerd) mag deze keten nog afkappen.
expectCfbError(truthy, 'I2 DIFAT-zelflus + vijandig grote numFatSectors', () => {
  const cyclicDifat = new Uint8Array(synthetic.bytes);
  const view = new DataView(cyclicDifat.buffer);
  view.setUint32(44, 0xffffffff, true); // numFatSectors: vijandig groot (ongevalideerde u32)
  view.setUint32(68, 2, true); // firstDifatSector = sector 2 (hergebruikt; hieronder overschreven)
  view.setUint32(72, 1, true); // numDifatSectors > 0: activeert de keten-continuatie
  const difatSectorOff = HEADER + 2 * SECTOR;
  for (let i = 0; i < 127; i++) view.setUint32(difatSectorOff + i * 4, 0xffffffff, true); // alles FREESECT
  view.setUint32(difatSectorOff + 127 * 4, 2, true); // "volgende DIFAT-sector" wijst naar zichzelf
  void new CfbFile(cyclicDifat);
});

// ── T3-slot (herreview): duplicaat-siblings (left===right, N niveaus diep) ───────────────────
// De enige fixture die betrapt als iemand de gedeelde, iteratieve visited-set uit C1 ooit weer
// vervangt door iets dat per aanroep/niveau opnieuw begint: bij elk niveau i verwijzen ZOWEL
// `left` als `right` naar HETZELFDE volgende niveau (i+1). Met een correct gedeelde visited-set
// kost dit O(levels) werk (elke id hoogstens één keer verwerkt, de duplicaat-push wordt meteen
// overgeslagen). Zonder gedeelde dedup verdubbelt elk niveau het aantal keer dat het volgende
// niveau opnieuw wordt opgebouwd: O(2^levels). Met levels=30 is dat het verschil tussen
// milliseconden en >1 miljard operaties — een regressie kan deze test dus niet stilletjes
// wegglippen, hooguit hem laten hangen (net zo'n onmiskenbaar signaal als de oorspronkelijke bug).
{
  const levels = 30;
  const dupBytes = buildDuplicateSiblingCfb(levels);
  const start = Date.now();
  let threw = false;
  let dupCount = 0;
  try {
    const cfb = new CfbFile(dupBytes);
    for (let i = 1; i <= levels; i++) {
      if (cfb.root.children.get(`Dup${i}`)) dupCount++;
    }
  } catch {
    threw = true;
  }
  const elapsedMs = Date.now() - start;
  truthy(
    `I2 duplicaat-siblings (${levels} niveaus, left===right): binnen tijdslimiet (${elapsedMs}ms < ${TIME_LIMIT_MS}ms) — betrapt een teruggedraaide gedeelde visited-set`,
    elapsedMs < TIME_LIMIT_MS,
  );
  truthy('I2 duplicaat-siblings: constructie slaagt zonder te gooien', !threw);
  truthy(`I2 duplicaat-siblings: alle ${levels} niveaus precies één keer in de boom`, dupCount === levels);
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// T4 — MPP-containerlaag: synthetische fixtures (draaien ALTIJD, ook zonder corpus)
// ═══════════════════════════════════════════════════════════════════════════════════════════

// ── Negatieve casus: een geldig CFB'tje zonder '\x01CompObj' ⇒ nette Error (geen CFB:-prefix,
// want dit is een MPP-laagfout, geen containerfout — cfb.ts zelf leest prima door). Hergebruikt
// de T3-fixture (`synthetic.bytes`: StreamA/StreamB, geen CompObj-stream). ─────────────────────
{
  let threw = false;
  let message = '';
  try {
    detectMppVariant(new CfbFile(synthetic.bytes));
  } catch (err) {
    threw = true;
    message = err instanceof Error ? err.message : String(err);
  }
  truthy('T4 CFB zonder \\x01CompObj: detectMppVariant gooit', threw);
  truthy('T4 CFB zonder \\x01CompObj: geen CFB:-prefix (MPP-laagfout, geen containerfout)', !message.startsWith('CFB:'));
  truthy('T4 CFB zonder \\x01CompObj: herkenbare boodschap', message === 'Not a recognised MS Project MPP file');
}

// ── Synthetische MPP14-container met root-streams '\x01CompObj' + 'Props14' — bouwt precies
// genoeg om `detectMppVariant`/`assertReadable` end-to-end te beproeven zonder de volledige
// "   114"-boom nodig te hebben (die twee streams leven ook op het echte corpus al rechtstreeks
// in de root, zie mppContainer.ts). Beide streams gaan via het mini-stream-pad (elk << 4096
// bytes). ─────────────────────────────────────────────────────────────────────────────────────
const MPP_PASSWORD_FLAG_KEY = 893386752; // PropsKey.PASSWORD_FLAG (PropsKey.java r. 73)
const MPP_PROTECTION_PASSWORD_HASH_KEY = 893386756; // PropsKey.PROTECTION_PASSWORD_HASH (r. 77)

// Wachtwoordpoort (review ná T4): MPXJ weigert pas als ZOWEL de vlag (bit 0x1) GEZET is ALS
// PROTECTION_PASSWORD_HASH aanwezig is — zie de toelichting bij `readPasswordProtection` in
// mppContainer.ts. Drie scenario's, exact de matrix die die functie moet dekken:

// (c) vlag=0 ⇒ leesbaar (hash-aan-/afwezigheid doet er dan niet toe — hier afwezig).
{
  const compObj = encodeCompObjFileFormat('MSProject.MPP14');
  const props14 = encodePropsSingleByteEntry(MPP_PASSWORD_FLAG_KEY, 0);
  const cfbBytes = buildTwoRootStreamsCfb('\x01CompObj', compObj, 'Props14', props14);
  const cfb = new CfbFile(cfbBytes);
  // M7 (kwaliteitsreview): detectMppVariant-assert buiten het try-blok, net als het MPP12-blok
  // hieronder al deed — anders verdwijnt een falende detectMppVariant hier stilzwijgend in de
  // "assertReadable gooit niet"-uitslag i.p.v. een eigen, specifieke diff te geven.
  truthy('T4 synthetisch MPP14 (vlag=0): detectMppVariant === MPP14', detectMppVariant(cfb) === 'MPP14');
  let threw = false;
  let message = '';
  try {
    assertReadable(cfb);
  } catch (err) {
    threw = true;
    message = err instanceof Error ? err.message : String(err);
  }
  truthy('T4 synthetisch MPP14 (vlag=0): assertReadable gooit niet', !threw);
  if (threw) diffs.push(`T4 synthetisch MPP14 (vlag=0): onverwachte fout: ${message}`);
}

// (b) vlag=1, GEEN hash ⇒ leesbaar. Dit is precies het door MPXJ gedocumenteerde geval ("the
// password flag was set, but the encryption XML was missing... the file is unencrypted and MS
// Project opens it without prompting") — vóór de review-fix zou dit onterecht MPP_ENCRYPTED
// hebben gegooid.
{
  const compObj = encodeCompObjFileFormat('MSProject.MPP14');
  const props14 = encodePropsSingleByteEntry(MPP_PASSWORD_FLAG_KEY, 1);
  const cfbBytes = buildTwoRootStreamsCfb('\x01CompObj', compObj, 'Props14', props14);
  let threw = false;
  let message = '';
  try {
    const cfb = new CfbFile(cfbBytes);
    assertReadable(cfb);
  } catch (err) {
    threw = true;
    message = err instanceof Error ? err.message : String(err);
  }
  truthy('T4 synthetisch MPP14 (vlag=1, geen hash): assertReadable gooit niet', !threw);
  if (threw) diffs.push(`T4 synthetisch MPP14 (vlag=1, geen hash): onverwachte fout: ${message}`);
}

// (a) vlag=1 ÉN hash aanwezig ⇒ MppUnsupportedError met mppCode 'MPP_ENCRYPTED'.
{
  const compObj = encodeCompObjFileFormat('MSProject.MPP14');
  const props14 = encodePropsEntries([
    { key: MPP_PASSWORD_FLAG_KEY, data: Uint8Array.of(1) },
    { key: MPP_PROTECTION_PASSWORD_HASH_KEY, data: new Uint8Array(16).fill(0xab) }, // inhoud irrelevant, alleen aanwezigheid telt
  ]);
  const cfbBytes = buildTwoRootStreamsCfb('\x01CompObj', compObj, 'Props14', props14);
  const cfb = new CfbFile(cfbBytes);
  let threw = false;
  let isMppUnsupported = false;
  let mppCode: string | undefined;
  try {
    assertReadable(cfb);
  } catch (err) {
    threw = true;
    isMppUnsupported = err instanceof MppUnsupportedError;
    mppCode = err instanceof MppUnsupportedError ? err.mppCode : undefined;
  }
  truthy('T4 synthetisch MPP14 (vlag=1, hash aanwezig): assertReadable gooit', threw);
  truthy('T4 synthetisch MPP14 (vlag=1, hash aanwezig): gooit MppUnsupportedError', isMppUnsupported);
  truthy("T4 synthetisch MPP14 (vlag=1, hash aanwezig): mppCode === 'MPP_ENCRYPTED'", mppCode === 'MPP_ENCRYPTED');
}

// MPP12 (legacy): detectMppVariant herkent de variant correct, assertReadable weigert 'm met
// mppCode 'MPP_LEGACY' — vóór er ooit naar een wachtwoordvlag wordt gekeken.
{
  const compObj = encodeCompObjFileFormat('MSProject.MPP12');
  const props14 = encodePropsSingleByteEntry(MPP_PASSWORD_FLAG_KEY, 0);
  const cfbBytes = buildTwoRootStreamsCfb('\x01CompObj', compObj, 'Props14', props14);
  const cfb = new CfbFile(cfbBytes);
  truthy('T4 synthetisch MPP12: detectMppVariant === MPP12', detectMppVariant(cfb) === 'MPP12');
  let mppCode: string | undefined;
  try {
    assertReadable(cfb);
  } catch (err) {
    mppCode = err instanceof MppUnsupportedError ? err.mppCode : undefined;
  }
  truthy("T4 synthetisch MPP12: assertReadable weigert met mppCode 'MPP_LEGACY'", mppCode === 'MPP_LEGACY');
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// I5 (kwaliteitsreview) — containerlaag-foutpaden: altijd-draaiend, in-memory
// ═══════════════════════════════════════════════════════════════════════════════════════════

// Props-stream <16 bytes (kan de header zelf niet bevatten).
expectMppError(truthy, 'I5 Props-stream <16 bytes', () => {
  void new Props(new Uint8Array(10), 'te-kort');
});

// Props-header claimt méér entries dan daadwerkelijk aanwezig zijn — legt de bewust
// vergevingsgezinde `break`-semantiek uit Props14.java vast (afkappen zonder te gooien, i.p.v.
// een harde eis dat headerCount klopt met de werkelijke inhoud).
{
  const bytes = new Uint8Array(16 + 12 + 4);
  const view = new DataView(bytes.buffer);
  view.setUint16(12, 5, true); // headerCount claimt 5 entries...
  view.setInt32(16, 4, true); // ...maar er is er maar 1: attrib1 (lengte)
  view.setInt32(20, 424242, true); // attrib2 (sleutel)
  view.setInt32(24, 0, true); // attrib3 (genegeerd)
  view.setInt32(28, 777, true); // data (4 bytes)

  let threw = false;
  let props: Props | null = null;
  try {
    props = new Props(bytes, 'over-claimed-header');
  } catch {
    threw = true;
  }
  truthy('I5 Props-header claimt meer entries dan aanwezig: construeert zonder te gooien', !threw);
  truthy('I5 Props-header claimt meer entries dan aanwezig: de ene aanwezige entry is wél gelezen', props?.getInt(424242) === 777);
}

// Ontbrekende root-Props14 (CompObj aanwezig en herkend als MPP14, maar geen 'Props14'-stream in
// de root) ⇒ assertReadable gooit een structurele MPP:-fout, GEEN MppUnsupportedError (dit is
// geen "te oud"/"versleuteld"-afwijzing, maar een corrupt/onvolledig bestand).
{
  const compObj = encodeCompObjFileFormat('MSProject.MPP14');
  const cfbBytes = buildTwoRootStreamsCfb('\x01CompObj', compObj, 'NotProps14', Uint8Array.of(1));
  const cfb = new CfbFile(cfbBytes);
  let threw = false;
  let message = '';
  let isMppUnsupported = false;
  try {
    assertReadable(cfb);
  } catch (err) {
    threw = true;
    message = err instanceof Error ? err.message : String(err);
    isMppUnsupported = err instanceof MppUnsupportedError;
  }
  truthy('I5 ontbrekende root-Props14: assertReadable gooit', threw);
  truthy('I5 ontbrekende root-Props14: geen MppUnsupportedError (structurele fout)', !isMppUnsupported);
  truthy('I5 ontbrekende root-Props14: nette MPP:-foutmelding', message.startsWith('MPP:'));
}

// Afgekapt CompObj-blok (geknipt vóórdat de format-string gelezen kan worden) ⇒ de nette,
// herkenbare "onbekend formaat"-fout — dezelfde als bij een volledig ontbrekend CompObj-blok.
{
  const truncated = encodeCompObjFileFormat('MSProject.MPP14').slice(0, 30);
  const props14 = encodePropsSingleByteEntry(MPP_PASSWORD_FLAG_KEY, 0);
  const cfbBytes = buildTwoRootStreamsCfb('\x01CompObj', truncated, 'Props14', props14);
  const cfb = new CfbFile(cfbBytes);
  let threw = false;
  let message = '';
  try {
    detectMppVariant(cfb);
  } catch (err) {
    threw = true;
    message = err instanceof Error ? err.message : String(err);
  }
  truthy('I5 afgekapt CompObj: detectMppVariant gooit', threw);
  truthy("I5 afgekapt CompObj: 'Not a recognised MS Project MPP file'", message === 'Not a recognised MS Project MPP file');
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// I4 (kwaliteitsreview) — mppPrimitives echt uitgevoerd: altijd-draaiend, in-memory
// ═══════════════════════════════════════════════════════════════════════════════════════════

const FIXED_META_MAGIC = 0xfadfadba;

/** Bouwt rauwe FixedMeta-bytes: 16-byte header (magic + RUWE itemCount-claim, die mag liegen
 *  t.o.v. `numItems`) + `numItems` items van `itemSize` bytes, elk gevuld met zijn eigen index
 *  (zodat `getByteArrayValue` verifieerbaar is). */
function buildFixedMetaBytes(itemCountClaim: number, itemSize: number, numItems: number): Uint8Array {
  const out = new Uint8Array(16 + numItems * itemSize);
  const view = new DataView(out.buffer);
  view.setUint32(0, FIXED_META_MAGIC, true);
  view.setInt32(8, itemCountClaim, true);
  for (let i = 0; i < numItems; i++) {
    for (let b = 0; b < itemSize; b++) out[16 + i * itemSize + b] = i;
  }
  return out;
}

// FixedMeta.withItemSize: geldig 3-itemblok.
{
  const bytes = buildFixedMetaBytes(3, 8, 3);
  const fm = FixedMeta.withItemSize(bytes, 8, 'I4-valid3');
  truthy('I4 FixedMeta.withItemSize geldig blok: getAdjustedItemCount === 3', fm.getAdjustedItemCount() === 3);
  truthy('I4 FixedMeta.withItemSize geldig blok: item 0 correct', fm.getByteArrayValue(0)?.[0] === 0);
  truthy('I4 FixedMeta.withItemSize geldig blok: item 2 correct', fm.getByteArrayValue(2)?.[0] === 2);
  truthy('I4 FixedMeta.withItemSize geldig blok: index buiten bereik geeft null', fm.getByteArrayValue(3) === null);
}

// FixedMeta.withItemSize: foute magic.
expectMppError(truthy, 'I4 FixedMeta.withItemSize foute magic', () => {
  const bytes = buildFixedMetaBytes(1, 8, 1);
  new DataView(bytes.buffer).setUint32(0, 0x12345678, true);
  FixedMeta.withItemSize(bytes, 8, 'I4-bad-magic');
});

// FixedMeta.withItemSize: te klein voor de header.
expectMppError(truthy, 'I4 FixedMeta.withItemSize te klein', () => {
  FixedMeta.withItemSize(new Uint8Array(10), 8, 'I4-too-small');
});

// FixedMeta.withItemSize: itemSize=0.
expectMppError(truthy, 'I4 FixedMeta.withItemSize itemSize=0', () => {
  FixedMeta.withItemSize(buildFixedMetaBytes(1, 8, 1), 0, 'I4-zero-itemsize');
});

// FixedMeta.withItemSize: liegende header (claimt 1000 items, past er maar 3) — I1: getItemCount()
// blijft geklemd op getAdjustedItemCount(), nooit de rauwe (potentieel hostile) headerwaarde.
{
  const bytes = buildFixedMetaBytes(1000, 8, 3);
  const fm = FixedMeta.withItemSize(bytes, 8, 'I4-lying-header');
  truthy('I4 FixedMeta.withItemSize liegende header: getAdjustedItemCount === 3', fm.getAdjustedItemCount() === 3);
  truthy('I4 FixedMeta.withItemSize liegende header: getItemCount() geklemd (=== getAdjustedItemCount)', fm.getItemCount() === fm.getAdjustedItemCount());
}

// FixedMeta.withHeuristicItemSize: passende kandidaat (available/testSize === otherBlock.getItemCount()).
{
  const bytes = buildFixedMetaBytes(3, 10, 3); // 16 + 3*10 = 46 bytes ⇒ available = 30
  const otherBlock = FixedData.withoutMeta(1, new Uint8Array(3)); // getItemCount() === 3
  const fm = FixedMeta.withHeuristicItemSize(bytes, otherBlock, [5, 10, 15], 'I4-heuristic-match');
  truthy('I4 FixedMeta.withHeuristicItemSize passende kandidaat: adjustedItemCount === 3 (itemSize=10 gekozen)', fm.getAdjustedItemCount() === 3);
}

// FixedMeta.withHeuristicItemSize: geen enkele kandidaat deelt `available` exact ⇒ terugval op de
// EERSTE kandidaat (itemSizes[0]), zoals de Java-bron.
{
  const bytes = buildFixedMetaBytes(3, 10, 3); // available = 30; geen van 7/11/13 deelt 30 exact
  const otherBlock = FixedData.withoutMeta(1, new Uint8Array(3));
  const fm = FixedMeta.withHeuristicItemSize(bytes, otherBlock, [7, 11, 13], 'I4-heuristic-fallback');
  truthy('I4 FixedMeta.withHeuristicItemSize geen kandidaat past: valt terug op itemSizes[0]=7 (adjustedItemCount=floor(30/7)=4)', fm.getAdjustedItemCount() === 4);
}

/** Bouwt rauwe Var2Data-bytes: op elke `offset` een 4-byte lengte-prefix gevolgd door `payload`. */
function buildVar2DataBytes(items: { offset: number; payload: Uint8Array }[], totalLength: number): Uint8Array {
  const out = new Uint8Array(totalLength);
  const view = new DataView(out.buffer);
  for (const it of items) {
    view.setInt32(it.offset, it.payload.length, true);
    out.set(it.payload, it.offset + 4);
  }
  return out;
}

function int32Payload(value: number): Uint8Array {
  const p = new Uint8Array(4);
  new DataView(p.buffer).setInt32(0, value, true);
  return p;
}

// VarMeta12 + Var2Data round-trip: 2 uniqueIDs × 2 types.
{
  const entries = [
    { uniqueId: 100, type: 1, offset: 0 },
    { uniqueId: 100, type: 2, offset: 10 },
    { uniqueId: 200, type: 1, offset: 20 },
    { uniqueId: 200, type: 2, offset: 30 },
  ];
  const meta = new VarMeta12(buildVarMetaBytes(entries), 'I4-roundtrip');
  const var2Bytes = buildVar2DataBytes(
    entries.map((e) => ({ offset: e.offset, payload: int32Payload(e.uniqueId * 10 + e.type) })),
    40,
  );
  const var2 = new Var2Data(meta, var2Bytes);
  truthy('I4 VarMeta12+Var2Data round-trip: (100,1)', var2.getInt(100, 1) === 100 * 10 + 1);
  truthy('I4 VarMeta12+Var2Data round-trip: (100,2)', var2.getInt(100, 2) === 100 * 10 + 2);
  truthy('I4 VarMeta12+Var2Data round-trip: (200,1)', var2.getInt(200, 1) === 200 * 10 + 1);
  truthy('I4 VarMeta12+Var2Data round-trip: (200,2)', var2.getInt(200, 2) === 200 * 10 + 2);
  truthy('I4 VarMeta12+Var2Data round-trip: onbekend (id,type) ⇒ 0', var2.getInt(999, 1) === 0);
}

// Var2Data(meta, null) ⇒ een ECHTE assert dat de "legitiem afwezig"-observatie een lege dataset
// oplevert (voorheen alleen informatief gelogd op het corpus, nooit hard getest).
{
  const meta = new VarMeta12(buildVarMetaBytes([{ uniqueId: 1, type: 1, offset: 0 }]), 'I4-null-var2');
  const var2 = new Var2Data(meta, null);
  truthy('I4 Var2Data(meta, null): getByteArray ⇒ null', var2.getByteArray(1, 1) === null);
  truthy('I4 Var2Data(meta, null): getInt ⇒ 0', var2.getInt(1, 1) === 0);
  truthy('I4 Var2Data(meta, null): getUnicodeString ⇒ null', var2.getUnicodeString(1, 1) === null);
}

// C1 (kwaliteitsreview, kritiek): VarMeta12 met een hostile itemCount-CLAIM op een buffer die
// alleen ruimte heeft voor de 24-byte header (geen entries) — 0x7FFFFFFF, -1 en 10_000_000 mogen
// nooit een OOM-crash of rauwe RangeError geven, en `getItemCount()` moet geklemd zijn op 0 (geen
// ruimte voor entries in dit 24-byte-blok).
for (const claim of [0x7fffffff, -1, 10_000_000]) {
  const start = Date.now();
  let ok = true;
  let meta: VarMeta12 | null = null;
  try {
    const bytes = buildVarMetaBytes([], claim);
    meta = new VarMeta12(bytes, `I4-C1-claim-${claim}`);
  } catch {
    ok = false;
  }
  const elapsedMs = Date.now() - start;
  truthy(`I4 VarMeta12 C1 (itemCount-claim=${claim}): binnen tijdslimiet (${elapsedMs}ms < ${TIME_LIMIT_MS}ms)`, elapsedMs < TIME_LIMIT_MS);
  truthy(`I4 VarMeta12 C1 (itemCount-claim=${claim}): construeert zonder te gooien`, ok);
  truthy(`I4 VarMeta12 C1 (itemCount-claim=${claim}): getItemCount() geklemd op 0`, meta?.getItemCount() === 0);
}

// getUnicodeString: 400_000 code-units — betrapt een `String.fromCharCode(...array)`-regressie
// die de argumentenlimiet van de JS-engine weer zou overschrijden (C2).
{
  const n = 400_000;
  const data = new Uint8Array(n * 2 + 2); // + 2-byte null-terminator
  const view = new DataView(data.buffer);
  for (let i = 0; i < n; i++) view.setUint16(i * 2, 0x41 + (i % 26), true); // 'A'..'Z' herhalend
  const start = Date.now();
  const s = getUnicodeString(data, 0);
  const elapsedMs = Date.now() - start;
  truthy('I4 getUnicodeString(400k code-units): lengte klopt', s.length === n);
  truthy('I4 getUnicodeString(400k code-units): eerste teken klopt', s[0] === 'A');
  truthy('I4 getUnicodeString(400k code-units): laatste teken klopt', s[n - 1] === String.fromCharCode(0x41 + ((n - 1) % 26)));
  truthy(`I4 getUnicodeString(400k code-units): binnen tijdslimiet (${elapsedMs}ms < ${TIME_LIMIT_MS}ms)`, elapsedMs < TIME_LIMIT_MS);
}

function timestampBytes(time: number, days: number): Uint8Array {
  const out = new Uint8Array(4);
  const view = new DataView(out.buffer);
  view.setUint16(0, time, true);
  view.setUint16(2, days, true);
  return out;
}

// getTimestamp: NA-heuristieken.
truthy('I4 getTimestamp: days=0 (≤1) ⇒ null', getTimestamp(timestampBytes(0, 0), 0) === null);
truthy('I4 getTimestamp: days=1 (≤1) ⇒ null', getTimestamp(timestampBytes(0, 1), 0) === null);
truthy('I4 getTimestamp: days=65535 (NA) ⇒ null', getTimestamp(timestampBytes(0, 65535), 0) === null);
truthy('I4 getTimestamp: days<100 mét niet-nul secondedeel ⇒ null', getTimestamp(timestampBytes(1, 50), 0) === null);
truthy('I4 getTimestamp: days<100 mét NUL secondedeel ⇒ geen null (geen overmatige NA-heuristiek)', getTimestamp(timestampBytes(10, 50), 0) !== null);
truthy('I4 getTimestamp: days≥100 met normale tijd ⇒ geldig resultaat', getTimestamp(timestampBytes(10, 200), 0) !== null);

// getGUID: alles-nul ⇒ null, plus één bekende mixed-endian-waarde.
{
  truthy('I4 getGUID: alles-nul ⇒ null', getGUID(new Uint8Array(16), 0) === null);
  // {01020304-0506-0708-090A-0B0C0D0E0F10} in mixed-endian bytes (eerste 8 bytes per veld
  // omgedraaid, laatste 8 bytes in volgorde — zie MPPUtility.getGUID).
  const bytes = Uint8Array.of(0x04, 0x03, 0x02, 0x01, 0x06, 0x05, 0x08, 0x07, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10);
  truthy('I4 getGUID: bekende mixed-endian-waarde', getGUID(bytes, 0) === '01020304-0506-0708-090a-0b0c0d0e0f10');
}

// getDuration: per eenheid (waarde in tienden van een minuut → numerieke duur in die eenheid).
{
  const cases: Array<[MppTimeUnit, number, number]> = [
    ['minutes', 100, 10],
    ['elapsedMinutes', 100, 10],
    ['hours', 6000, 10],
    ['elapsedHours', 6000, 10],
    ['days', 48000, 10],
    ['elapsedDays', 144000, 10],
    ['weeks', 240000, 10],
    ['elapsedWeeks', 1008000, 10],
    ['months', 960000, 10],
    ['elapsedMonths', 4320000, 10],
    ['percent', 55, 55],
    ['elapsedPercent', 55, 55],
  ];
  for (const [unit, value, expected] of cases) {
    truthy(`I4 getDuration(${value}, '${unit}') === ${expected}`, getDuration(value, unit) === expected);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// T5-kwaliteitsreview-restpunten (b/d): altijd-draaiende mini-fixtures voor primitieven die tot
// nu toe geen directe assert hadden — FixedData.getIndexFromOffset, FixedData.withItemSizeOverride,
// getDate, getTime, getDurationTimeUnits.
// ═══════════════════════════════════════════════════════════════════════════════════════════

/** Bouwt rauwe FixedMeta-bytes waar alleen het offsetveld (byte 4..7 van elk meta-item) ertoe
 *  doet — de meta-ITEMGROOTTE hier is bewust 8 (het minimum dat het offsetveld nog veilig binnen
 *  de item-grens laat vallen; ongerelateerd aan de FixedData-itemgrootte, die uit de
 *  offset-deltas resp. `withItemSizeOverride`'s eigen parameter volgt). */
function buildOffsetOnlyFixedMetaBytes(offsets: number[], label: string): FixedMeta {
  const metaItemSize = 8;
  const out = new Uint8Array(16 + offsets.length * metaItemSize);
  const view = new DataView(out.buffer);
  view.setUint32(0, 0xfadfadba, true);
  view.setInt32(8, offsets.length, true);
  for (let i = 0; i < offsets.length; i++) view.setInt32(16 + i * metaItemSize + 4, offsets[i], true);
  return FixedMeta.withItemSize(out, metaItemSize, label);
}

// getIndexFromOffset: 5 items, declared meta-offsets [0, 8, 8, 24, 32] — item 1 en item 2 delen
// offset 8, wat item 1 (wiens EIGEN itemSize wordt afgeleid uit het verschil met item 2's offset,
// dus 8-8=0) tot een NULL-slot maakt: `getByteArrayValue(1)` levert `null` en item 1's offset
// blijft op zijn array-default (0) staan i.p.v. 8 — item 2 zelf krijgt wél een echte itemSize
// (24-8=16) en claimt offset 8 als enige. Dit is precies het duplicaat-/nul-grootte-scenario dat
// `getIndexFromOffset`'s O(1)-hardening (`indexByOffset`) moet overleven — zie de toelichting bij
// die map in mppPrimitives.ts.
{
  const meta = buildOffsetOnlyFixedMetaBytes([0, 8, 8, 24, 32], 'I5-getIndexFromOffset-meta');
  const payload = new Uint8Array(40);
  for (let i = 0; i < payload.length; i++) payload[i] = i;
  const fd = FixedData.fromMeta(meta, payload, 0, 0, 'I5-getIndexFromOffset');

  truthy('I5 FixedData.getIndexFromOffset: item 1 is een null-slot (duplicaat-offset ⇒ itemSize 0)', fd.getByteArrayValue(1) === null);
  truthy('I5 FixedData.getIndexFromOffset(0) === 0', fd.getIndexFromOffset(0) === 0);
  truthy('I5 FixedData.getIndexFromOffset(8) === 2 (item 2 claimt de gedeelde offset, niet de null-slot item 1)', fd.getIndexFromOffset(8) === 2);
  truthy('I5 FixedData.getIndexFromOffset(24) === 3', fd.getIndexFromOffset(24) === 3);
  truthy('I5 FixedData.getIndexFromOffset(32) === 4 (laatste item)', fd.getIndexFromOffset(32) === 4);
  truthy('I5 FixedData.getIndexFromOffset(999) === -1 (onbekend)', fd.getIndexFromOffset(999) === -1);
}

// FixedData.withItemSizeOverride: TBkndCons-achtig gebruik (offset uit meta, GROOTTE altijd de
// opgegeven vaste waarde, ongeacht wat meta zelf beweert of wat de offset-delta zou suggereren) —
// itemSize=6, 3 items op meta-offsets 0/6/12.
{
  const meta = buildOffsetOnlyFixedMetaBytes([0, 6, 12], 'I5-withItemSizeOverride-meta');
  const payload = new Uint8Array(18);
  for (let i = 0; i < payload.length; i++) payload[i] = i;
  const fd = FixedData.withItemSizeOverride(meta, 6, payload, 'I5-withItemSizeOverride');
  truthy('I5 FixedData.withItemSizeOverride: 3 items', fd.getItemCount() === 3);
  truthy('I5 FixedData.withItemSizeOverride: item 0 begint op byte 0', fd.getByteArrayValue(0)?.[0] === 0);
  truthy('I5 FixedData.withItemSizeOverride: item 1 begint op byte 6', fd.getByteArrayValue(1)?.[0] === 6);
  truthy('I5 FixedData.withItemSizeOverride: item 2 lengte === itemSize (6), niet "rest van blok"', fd.getByteArrayValue(2)?.length === 6);
}

// getDate: dagen-sinds-epoch (geen tijdcomponent) + de 65535-NA-sentinel.
{
  const bytes = new Uint8Array(2);
  new DataView(bytes.buffer).setUint16(0, 1, true); // 1 dag na epoch = 1984-01-01
  const d = getDate(bytes, 0);
  truthy('I5 getDate(1 dag): jaar/maand/dag kloppen', !!d && d.getUTCFullYear() === 1984 && d.getUTCMonth() === 0 && d.getUTCDate() === 1);
  const na = new Uint8Array(2);
  new DataView(na.buffer).setUint16(0, 65535, true);
  truthy('I5 getDate(65535) ⇒ null (NA-sentinel)', getDate(na, 0) === null);
}

// getTime: tienden-van-een-minuut → seconden-sinds-middernacht, met het modulo-24u-vangnet.
{
  const bytes = new Uint8Array(2);
  new DataView(bytes.buffer).setUint16(0, 600, true); // 600 tiende-minuten = 60 min = 1 uur
  truthy('I5 getTime(600) === 3600s (1 uur)', getTime(bytes, 0) === 3600);
  const overflow = new Uint8Array(2);
  new DataView(overflow.buffer).setUint16(0, 8640 + 10, true); // (8640/10)*60 = 51840s > 86399 ⇒ modulo
  truthy('I5 getTime: modulo-24u-vangnet houdt het resultaat binnen één dag', getTime(overflow, 0) < 86400);
}

// getDurationTimeUnits: code 7 (dagen), code 21 (projectstandaard-terugval) en een onbekende code.
{
  truthy("I5 getDurationTimeUnits(7) === 'days'", getDurationTimeUnits(7) === 'days');
  truthy(
    "I5 getDurationTimeUnits(21, 'weeks') === 'weeks' (projectstandaard-terugval)",
    getDurationTimeUnits(21, 'weeks') === 'weeks',
  );
  truthy("I5 getDurationTimeUnits(21) zonder terugval === 'days' (default)", getDurationTimeUnits(21) === 'days');
  truthy("I5 getDurationTimeUnits(9999) (onbekende code) === 'days' (default)", getDurationTimeUnits(9999) === 'days');
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// T5-kwaliteitsreview (I4) — corpusloze T5-fixtures: vóór deze commit voerde CI-zonder-corpus
// GEEN enkele regel T5-code uit (`fieldMap14.ts`/`mppReader.ts` waren alleen via de corpus-lus
// getest). Draait ALTIJD, bewijst zowel I3 (alles-of-niets-terugval) als C1/I1 (de twee
// hardingsfixes) zonder afhankelijk te zijn van echte bedrijfsbestanden.
// ═══════════════════════════════════════════════════════════════════════════════════════════

/** Bouwt rauwe field-map-entries (28 bytes elk: mask(4, ongebruikt) + dataBlockOffset(2)@4 +
 *  ongebruikt(2) + typeValue(4)@12 + ongebruikt(4) + category(2)@20 + ongebruikt(6)) — spiegelt
 *  `fieldMap14.ts`'s `parseFieldMapBytes`-invoerformaat. */
function buildFieldMapEntryBytes(entries: { typeValue: number; dataBlockOffset: number; category: number }[]): Uint8Array {
  const out = new Uint8Array(entries.length * 28);
  const view = new DataView(out.buffer);
  entries.forEach((e, i) => {
    const base = i * 28;
    view.setUint16(base + 4, e.dataBlockOffset, true);
    view.setInt32(base + 12, e.typeValue, true);
    view.setUint16(base + 20, e.category, true);
  });
  return out;
}

// PropsKey-sleutels (PropsKey.java) — zie fieldMap14.ts/mppReader.ts voor dezelfde constanten;
// hier lokaal herhaald omdat de bronmodules ze bewust niet exporteren (interne implementatiedetails).
const PROPSKEY_TASK_FIELD_MAP = 131092;
const PROPSKEY_RESOURCE_FIELD_MAP = 131093;
const PROPSKEY_ASSIGNMENT_FIELD_MAP = 131095;

// ── I4 (1): parseFieldMapBytes via een synthetische Props-entry — fixed-entry, var-entry,
// META_DATA-entry (mag GEEN terugval krijgen — bewaakt de a6e05f17-fix), plus dezelfde toets voor
// de resource-/assignment-maps (houdt die exports gedekt en levend vóór T7 ze gebruikt). ─────────
{
  const fieldMapBytes = buildFieldMapEntryBytes([
    { typeValue: TaskFieldId.UniqueId, dataBlockOffset: 99, category: 3 }, // FIXED_DATA
    { typeValue: TaskFieldId.Name, dataBlockOffset: 65535, category: 8 }, // VAR_DATA (65535 ⇒ geen vaste plek)
    { typeValue: 24, dataBlockOffset: 0, category: 0x0b }, // META_DATA (bv. MILESTONE se raw index — hier is alleen de categorie relevant)
  ]);
  const props = new Props(encodePropsEntries([{ key: PROPSKEY_TASK_FIELD_MAP, data: fieldMapBytes }]), 'I4-fieldmap-fixed-var-meta');
  const table = createTaskFieldMap(props);

  truthy('I4 parseFieldMapBytes: FIXED_DATA-entry correct doorgegeven', fixedOffsetOf(table, TaskFieldId.UniqueId) === 99);
  truthy('I4 parseFieldMapBytes: VAR_DATA-entry correct doorgegeven', varDataKeyOf(table, TaskFieldId.Name) === TaskFieldId.Name);
  truthy(
    'I4 parseFieldMapBytes: META_DATA-entry (24) NIET in de tabel (geen fixed, geen var — a6e05f17-regressie)',
    fixedOffsetOf(table, 24) === null && varDataKeyOf(table, 24) === null,
  );
  // I3: alles-of-niets — de field-map-bytes ZIJN aanwezig, dus een veld dat er niet in voorkomt
  // (OutlineLevel, wél in de defaulttabel) krijgt GEEN terugval.
  truthy(
    'I4/I3 fieldMap: veld niet in de aanwezige field-map-bytes ⇒ GEEN terugval op defaults (alles-of-niets)',
    fixedOffsetOf(table, TaskFieldId.OutlineLevel) === null,
  );
}
{
  const resFieldMapBytes = buildFieldMapEntryBytes([
    { typeValue: ResourceFieldId.UniqueId, dataBlockOffset: 5, category: 3 },
    { typeValue: ResourceFieldId.Name, dataBlockOffset: 65535, category: 8 },
  ]);
  const resProps = new Props(encodePropsEntries([{ key: PROPSKEY_RESOURCE_FIELD_MAP, data: resFieldMapBytes }]), 'I4-resource-fieldmap');
  const resTable = createResourceFieldMap(resProps);
  truthy('I4 createResourceFieldMap: FIXED_DATA-entry correct', fixedOffsetOf(resTable, ResourceFieldId.UniqueId) === 5);
  truthy('I4 createResourceFieldMap: VAR_DATA-entry correct', varDataKeyOf(resTable, ResourceFieldId.Name) === ResourceFieldId.Name);
}
{
  const asgFieldMapBytes = buildFieldMapEntryBytes([
    { typeValue: AssignmentFieldId.TaskUniqueId, dataBlockOffset: 12, category: 3 },
    { typeValue: AssignmentFieldId.ResourceUniqueId, dataBlockOffset: 16, category: 3 },
  ]);
  const asgProps = new Props(encodePropsEntries([{ key: PROPSKEY_ASSIGNMENT_FIELD_MAP, data: asgFieldMapBytes }]), 'I4-assignment-fieldmap');
  const asgTable = createAssignmentFieldMap(asgProps);
  truthy('I4 createAssignmentFieldMap: eerste FIXED_DATA-entry correct', fixedOffsetOf(asgTable, AssignmentFieldId.TaskUniqueId) === 12);
  truthy('I4 createAssignmentFieldMap: tweede FIXED_DATA-entry correct', fixedOffsetOf(asgTable, AssignmentFieldId.ResourceUniqueId) === 16);
}

// ── I4 (2): ontbrekende sleutel ⇒ VOLLEDIGE defaulttabel (geen enkele data-gedreven entry). ────
{
  const props = new Props(encodePropsEntries([]), 'I4-missing-fieldmap-key');
  const table = createTaskFieldMap(props);
  truthy('I4/I3 fieldMap: ontbrekende sleutel ⇒ defaulttabel (UniqueId@0)', fixedOffsetOf(table, TaskFieldId.UniqueId) === 0);
  truthy('I4/I3 fieldMap: ontbrekende sleutel ⇒ defaulttabel (Id@4)', fixedOffsetOf(table, TaskFieldId.Id) === 4);
  truthy('I4/I3 fieldMap: ontbrekende sleutel ⇒ defaulttabel (OutlineLevel@40)', fixedOffsetOf(table, TaskFieldId.OutlineLevel) === 40);
  truthy('I4/I3 fieldMap: ontbrekende sleutel ⇒ defaulttabel (Name var@14)', varDataKeyOf(table, TaskFieldId.Name) === TaskFieldId.Name);
}

// ── C1: clampOutlineLevel — triviale aritmetiek, los van het stack-algoritme hieronder. ─────────
{
  truthy('C1 clampOutlineLevel(0) === 1', clampOutlineLevel(0) === 1);
  truthy('C1 clampOutlineLevel(1) === 1', clampOutlineLevel(1) === 1);
  truthy(`C1 clampOutlineLevel(${MAX_OUTLINE_LEVEL}) === ${MAX_OUTLINE_LEVEL}`, clampOutlineLevel(MAX_OUTLINE_LEVEL) === MAX_OUTLINE_LEVEL);
  truthy(`C1 clampOutlineLevel(${MAX_OUTLINE_LEVEL + 1}) === ${MAX_OUTLINE_LEVEL} (klem)`, clampOutlineLevel(MAX_OUTLINE_LEVEL + 1) === MAX_OUTLINE_LEVEL);
  truthy('C1 clampOutlineLevel(65535) === MAX_OUTLINE_LEVEL (klem)', clampOutlineLevel(65535) === MAX_OUTLINE_LEVEL);
}

// ── C1: assignHierarchyAndWbs onder de worst-case klem-toestand (elke taak op ~MAX_OUTLINE_LEVEL,
// cyclisch) — bewijst dat de klem de kwadratische blowup voorkomt (zie mppReader.ts's C1-
// toelichting): N taken op een BEGRENSDE diepte ⇒ O(N × MAX_OUTLINE_LEVEL), lineair in N. Gebruikt
// lichte `HierarchyTaskLike`-fixtures (geen volledige `Task`) — dat is precies waarom die vorm zo
// geëxporteerd is. ──────────────────────────────────────────────────────────────────────────────
{
  const N = 20_000;
  interface Fixture {
    outlineLevel: number;
    storedWbs: string | null;
    task: { id: string; parentId: string | null; childIds: string[]; wbsCode: string };
  }
  const entries: Fixture[] = [];
  for (let i = 0; i < N; i++) {
    entries.push({
      outlineLevel: clampOutlineLevel((i % (MAX_OUTLINE_LEVEL + 50)) + 1), // cyclisch, tot ruim voorbij de klem
      storedWbs: null,
      task: { id: `t${i}`, parentId: null, childIds: [], wbsCode: '' },
    });
  }
  const start = Date.now();
  assignHierarchyAndWbs(entries);
  const elapsedMs = Date.now() - start;
  truthy(
    `C1 assignHierarchyAndWbs(${N} taken, cyclisch tot voorbij MAX_OUTLINE_LEVEL): binnen tijdslimiet (${elapsedMs}ms < ${TIME_LIMIT_MS}ms)`,
    elapsedMs < TIME_LIMIT_MS,
  );
  truthy(
    `C1 assignHierarchyAndWbs: wbsCode-segmentaantal blijft ≤ MAX_OUTLINE_LEVEL (${MAX_OUTLINE_LEVEL})`,
    entries.every((e) => e.task.wbsCode.split('.').length <= MAX_OUTLINE_LEVEL),
  );
  truthy('C1 assignHierarchyAndWbs: elke taak kreeg een wbsCode', entries.every((e) => e.task.wbsCode.length > 0));
}

// ── I1: Var2Data.getUnicodeString(maxLength) — een gedeelde, GROTE var-data-string mag geen
// O(werkelijke lengte) kosten meer hebben per aanroep (zie mppPrimitives.ts's I1-toelichting: de
// scan-lus zelf moet ook begrensd zijn, niet alleen het eindresultaat). ─────────────────────────
{
  const charCount = 200_000; // 400.000 bytes ruwe UTF-16LE-inhoud, ruim boven MAX_VAR_TEXT_BYTES
  const payload = new Uint8Array(charCount * 2);
  for (let i = 0; i < charCount; i++) {
    payload[i * 2] = 0x41; // 'A'
    payload[i * 2 + 1] = 0x00;
  }
  const meta = new VarMeta12(buildVarMetaBytes([{ uniqueId: 1, type: 1, offset: 0 }]), 'I1-large-string-meta');
  const var2Bytes = buildVar2DataBytes([{ offset: 0, payload }], payload.length + 4);
  const var2 = new Var2Data(meta, var2Bytes);

  const start = Date.now();
  const s = var2.getUnicodeString(1, 1, MAX_VAR_TEXT_BYTES, 'I1-large-string');
  const elapsedMs = Date.now() - start;
  truthy(
    `I1 Var2Data.getUnicodeString(maxLength=${MAX_VAR_TEXT_BYTES}) op een 400.000-byte gedeelde string: binnen tijdslimiet (${elapsedMs}ms < ${TIME_LIMIT_MS}ms)`,
    elapsedMs < TIME_LIMIT_MS,
  );
  truthy(
    `I1 Var2Data.getUnicodeString: resultaat begrensd op MAX_VAR_TEXT_BYTES/2 = ${MAX_VAR_TEXT_BYTES / 2} tekens`,
    s !== null && s.length === MAX_VAR_TEXT_BYTES / 2,
  );
}

// ── T7-kwaliteitsreview (I2, BLOKKEREND): getDouble se ±Infinity-lek. `Number.isNaN` alleen ving
// een ±Infinity-bitpatroon niet — dat lekte door naar `Resource.maxUnits`/`ResourceAssignment.
// unitsPerDay` (`Infinity`), en vandaar naar `ifcWriter` (`IFCREAL(Infinity)`, corrupte STEP bij
// opslaan/auto-save). `getDouble` moet nu `Number.isFinite`-gebaseerd zijn: zowel NaN als
// ±Infinity worden 0. ────────────────────────────────────────────────────────────────────────────
{
  const posInf = new Uint8Array(8);
  new DataView(posInf.buffer).setFloat64(0, Infinity, true);
  const negInf = new Uint8Array(8);
  new DataView(negInf.buffer).setFloat64(0, -Infinity, true);
  const nanBytes = new Uint8Array(8);
  new DataView(nanBytes.buffer).setFloat64(0, NaN, true);
  const finite = new Uint8Array(8);
  new DataView(finite.buffer).setFloat64(0, 12345.5, true);

  truthy('I2 getDouble(+Infinity) === 0 (geen Infinity-lek)', getDouble(posInf, 0, 'I2-pos-inf') === 0);
  truthy('I2 getDouble(-Infinity) === 0', getDouble(negInf, 0, 'I2-neg-inf') === 0);
  truthy('I2 getDouble(NaN) === 0 (bestaand gedrag, niet geregresseerd)', getDouble(nanBytes, 0, 'I2-nan') === 0);
  truthy('I2 getDouble(eindige waarde) blijft ongewijzigd', getDouble(finite, 0, 'I2-finite') === 12345.5);
}

// ── I4 (3): end-to-end readMPP op een synthetisch MPP14'tje — 4 taken, bekende outline-levels,
// via de nieuwe geneste-storage-builder (`buildNestedCfb`, mppFixtures.ts). Bewijst hiërarchie +
// WBS-nummering + de milestone-bit-vlag, ONAFHANKELIJK van het corpus. `TASK_FIELD_MAP` wordt
// bewust NIET meegegeven (oefent tegelijk I4-punt-2 uit in een echte end-to-end-context): de
// FixedData hieronder gebruikt daarom de LETTERLIJKE default-offsets uit fieldMap14.ts. ─────────
{
  const PASSWORD_FLAG_KEY = 893386752;
  const PROJECT_START_DATE_KEY = 37748738;
  const PROJECT_FINISH_DATE_KEY = 37748739;
  const MINUTES_PER_DAY_KEY = 37748765;
  const TITLE_KEY = 37748744;

  function encodeUnicodeStringAscii(s: string): Uint8Array {
    const out = new Uint8Array(s.length * 2);
    const view = new DataView(out.buffer);
    for (let i = 0; i < s.length; i++) view.setUint16(i * 2, s.charCodeAt(i), true);
    return out;
  }

  /** Eén TBkndTask/FixedData-record (130 bytes) op de LETTERLIJKE default-offsets uit
   *  fieldMap14.ts's `DEFAULT_TASK_FIELDS` (uniqueId@0, id@4, outlineLevel@40, scheduledDuration@42,
   *  constraintType@56, scheduledStart@64, scheduledFinish@68, actualStart/actualFinish/
   *  constraintDate blijven op hun NA-standaardwaarde 0/0, calendarUniqueId@118, deadline@122
   *  blijft NA). */
  function buildTaskFixedDataRecord(opts: {
    uniqueId: number; id: number; outlineLevel: number;
    durationRaw?: number; startDays: number; finishDays: number; calendarUniqueId?: number;
  }): Uint8Array {
    const out = new Uint8Array(130);
    const view = new DataView(out.buffer);
    view.setInt32(0, opts.uniqueId, true);
    view.setInt32(4, opts.id, true);
    view.setInt16(40, opts.outlineLevel, true);
    view.setInt32(42, opts.durationRaw ?? 4800, true); // 4800 tienden-van-minuut = 480 min = 8u = 1 dag @480 min/dag
    view.setInt16(56, 0, true); // constraintType = 0 (ASAP)
    view.setUint16(64, 0, true); // scheduledStart: tijd = 0
    view.setUint16(66, opts.startDays, true); // scheduledStart: dagen
    view.setUint16(68, 0, true); // scheduledFinish: tijd = 0
    view.setUint16(70, opts.finishDays, true); // scheduledFinish: dagen
    view.setInt32(118, opts.calendarUniqueId ?? -1, true); // -1 = geen taak-kalender-override
    return out;
  }

  function buildTaskFixedMetaRecord(opts: { offsetIntoFixedData: number; milestone?: boolean }): Uint8Array {
    const out = new Uint8Array(47);
    const view = new DataView(out.buffer);
    view.setInt32(0, 0, true); // flags: niet verwijderd
    view.setInt32(4, opts.offsetIntoFixedData, true);
    // Milestone-bit: PROJECT2010_TASK_META_DATA_BIT_FLAGS (offset 8, mask 0x20) — deze fixture se
    // CompObj-applicationName matcht `detectApplicationVersion`'s patroon niet (encodeCompObjFileFormat
    // gebruikt een willekeurige naam), dus `milestoneBitFlag(null)` valt terug op de 2010-tabel
    // (4a-fix) — dit is dus ook een impliciete regressietoets van die terugval.
    if (opts.milestone) view.setInt32(8, 0x20, true);
    return out;
  }

  function buildFixedMetaBlob(items: Uint8Array[]): Uint8Array {
    const out = new Uint8Array(16 + items.length * 47);
    const view = new DataView(out.buffer);
    view.setUint32(0, 0xfadfadba, true);
    view.setInt32(8, items.length, true);
    items.forEach((item, i) => out.set(item, 16 + i * 47));
    return out;
  }

  // 6 taken: Root(1) → ClampDeep1(1.1), ClampDeep2(1.2), Child1(1.3), Child2(1.4) →
  // Grandchild(1.4.1, milestone). ClampDeep1/ClampDeep2 (T5-slot, C1-callsite-regressie) hebben
  // RUWE outline-levels 300/400 — ver voorbij MAX_OUTLINE_LEVEL — en zitten in ID-volgorde
  // ONMIDDELLIJK ná Root, vóór Child1/Child2/Grandchild (die daarom van id 2/3/4 naar 4/5/6
  // opschuiven). Dit is de ENIGE plek in de stack waar de klem zichtbaar wordt: zónder
  // `clampOutlineLevel` in `readTasks` zou ClampDeep2 (raw 400) NIET terugpoppen tot Root — een
  // outline-level-stack popt alleen entries met `level >= eigen level`, en 300 < 400, dus
  // ClampDeep2 zou een KIND van ClampDeep1 worden (wbsCode "1.1.1"). MÉT de klem (beide → 256)
  // popt ClampDeep2 wél terug tot Root (256 >= 256) en wordt Root's TWEEDE kind: wbsCode "1.2" —
  // het harde onderscheid dat deze regressie bewaakt (een toekomstige refactor die de
  // `clampOutlineLevel`-aanroep in `readTasks` per ongeluk weglaat, laat deze assert direct rood
  // uitslaan op "1.1.1" i.p.v. "1.2").
  const dummy = buildTaskFixedMetaRecord({ offsetIntoFixedData: 0 });
  const metaRoot = buildTaskFixedMetaRecord({ offsetIntoFixedData: 0 });
  const metaClampDeep1 = buildTaskFixedMetaRecord({ offsetIntoFixedData: 130 });
  const metaClampDeep2 = buildTaskFixedMetaRecord({ offsetIntoFixedData: 260 });
  const metaChild1 = buildTaskFixedMetaRecord({ offsetIntoFixedData: 390 });
  const metaChild2 = buildTaskFixedMetaRecord({ offsetIntoFixedData: 520 });
  const metaGrandchild = buildTaskFixedMetaRecord({ offsetIntoFixedData: 650, milestone: true });
  const fixedMetaBlob = buildFixedMetaBlob([dummy, dummy, dummy, metaRoot, metaClampDeep1, metaClampDeep2, metaChild1, metaChild2, metaGrandchild]);

  const dataRoot = buildTaskFixedDataRecord({ uniqueId: 10, id: 1, outlineLevel: 1, startDays: 15000, finishDays: 15010 });
  const dataClampDeep1 = buildTaskFixedDataRecord({ uniqueId: 14, id: 2, outlineLevel: 300, startDays: 15000, finishDays: 15001 });
  const dataClampDeep2 = buildTaskFixedDataRecord({ uniqueId: 15, id: 3, outlineLevel: 400, startDays: 15000, finishDays: 15001 });
  const dataChild1 = buildTaskFixedDataRecord({ uniqueId: 11, id: 4, outlineLevel: 2, startDays: 15000, finishDays: 15002, calendarUniqueId: 5 });
  const dataChild2 = buildTaskFixedDataRecord({ uniqueId: 12, id: 5, outlineLevel: 2, startDays: 15003, finishDays: 15008 });
  const dataGrandchild = buildTaskFixedDataRecord({ uniqueId: 13, id: 6, outlineLevel: 3, durationRaw: 0, startDays: 15008, finishDays: 15008 });
  const fixedDataBlob = new Uint8Array(6 * 130); // 780 bytes, ruim onder buildNestedCfb's 4096-grens per stream
  [dataRoot, dataClampDeep1, dataClampDeep2, dataChild1, dataChild2, dataGrandchild].forEach((rec, i) => fixedDataBlob.set(rec, i * 130));

  // Namen (var key 14, default-fallback): Root@0 (12 bytes), ClampDeep1@20 (24 bytes: 10 tekens
  // + 4-byte lengteprefix), ClampDeep2@50 (24 bytes), Child1@80 (16 bytes), Child2@100 (16 bytes),
  // Grandchild@120 (24 bytes) — 150 bytes totaal, elke regio ruim uit elkaar zodat er geen
  // overlap is.
  const varMetaBytes = buildVarMetaBytes([
    { uniqueId: 10, type: 14, offset: 0 },
    { uniqueId: 14, type: 14, offset: 20 },
    { uniqueId: 15, type: 14, offset: 50 },
    { uniqueId: 11, type: 14, offset: 80 },
    { uniqueId: 12, type: 14, offset: 100 },
    { uniqueId: 13, type: 14, offset: 120 },
  ]);
  const var2DataBuf = new Uint8Array(150);
  const var2View = new DataView(var2DataBuf.buffer);
  const writeVar2 = (offset: number, s: string) => {
    const payload = encodeUnicodeStringAscii(s);
    var2View.setInt32(offset, payload.length, true);
    var2DataBuf.set(payload, offset + 4);
  };
  writeVar2(0, 'Root');
  writeVar2(20, 'ClampDeep1');
  writeVar2(50, 'ClampDeep2');
  writeVar2(80, 'Child1');
  writeVar2(100, 'Child2');
  writeVar2(120, 'Grandchild');

  const projectPropsBytes = encodePropsEntries([
    { key: PROJECT_START_DATE_KEY, data: timestampBytes(0, 15000) },
    { key: PROJECT_FINISH_DATE_KEY, data: timestampBytes(0, 15010) },
    { key: MINUTES_PER_DAY_KEY, data: int32Payload(480) },
    { key: TITLE_KEY, data: encodeUnicodeStringAscii('Fixture Project') },
  ]);

  const tree: Record<string, CfbTreeNode> = {
    '\x01CompObj': { data: encodeCompObjFileFormat('MSProject.MPP14') },
    Props14: { data: encodePropsSingleByteEntry(PASSWORD_FLAG_KEY, 0) },
    '   114': {
      children: {
        Props: { data: projectPropsBytes },
        TBkndTask: {
          children: {
            FixedMeta: { data: fixedMetaBlob },
            FixedData: { data: fixedDataBlob },
            VarMeta: { data: varMetaBytes },
            Var2Data: { data: var2DataBuf },
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
  truthy(`I4 end-to-end readMPP: gooit niet (${threw ?? ''})`, threw === null);

  if (result) {
    truthy('I4 end-to-end readMPP: project.name uit Props/TITLE', result.project.name === 'Fixture Project');
    truthy('I4 end-to-end readMPP: hoursPerDay uit MINUTES_PER_DAY (480/60)', result.calendar.hoursPerDay === 8);
    truthy('I4 end-to-end readMPP: 6 taken', result.tasks.length === 6);

    const byName = new Map(result.tasks.map((t) => [t.name, t]));
    const root = byName.get('Root');
    const clampDeep1 = byName.get('ClampDeep1');
    const clampDeep2 = byName.get('ClampDeep2');
    const child1 = byName.get('Child1');
    const child2 = byName.get('Child2');
    const grandchild = byName.get('Grandchild');
    truthy(
      'I4 end-to-end readMPP: alle zes namen gevonden',
      !!root && !!clampDeep1 && !!clampDeep2 && !!child1 && !!child2 && !!grandchild,
    );

    if (root && clampDeep1 && clampDeep2 && child1 && child2 && grandchild) {
      truthy('I4 end-to-end readMPP: Root is wortel (parentId null)', root.parentId === null);
      truthy('I4 end-to-end readMPP: Root.wbsCode === "1"', root.wbsCode === '1');

      // C1-CALLSITE-REGRESSIE (T5-slot): ClampDeep1/ClampDeep2 dragen ruwe outline-levels 300/400
      // (ver voorbij MAX_OUTLINE_LEVEL). Dit is de enige plek die daadwerkelijk PINT dat
      // `readTasks` `clampOutlineLevel` aanroept — de eerdere C1-stresstest (elders in dit
      // bestand) klemt zijn EIGEN synthetische invoer al vóór het `assignHierarchyAndWbs`
      // aanroept, dus die kan een vergeten `clampOutlineLevel()`-aanroep in `readTasks` zelf niet
      // detecteren. Zie de toelichting bij de fixture-opbouw hierboven voor de volledige
      // afleiding: MÉT de klem (beide → 256) wordt ClampDeep2 Root's TWEEDE kind ("1.2"); ZONDER
      // de klem zou ClampDeep2 (raw 400) niet terugpoppen langs ClampDeep1 (raw 300, want
      // 300 < 400) en dus een KIND van ClampDeep1 worden ("1.1.1") — een crisp, ondubbelzinnig
      // onderscheid.
      truthy('I4/C1 end-to-end readMPP: ClampDeep1.parentId === Root.id', clampDeep1.parentId === root.id);
      truthy('I4/C1 end-to-end readMPP: ClampDeep1.wbsCode === "1.1"', clampDeep1.wbsCode === '1.1');
      truthy('I4/C1 end-to-end readMPP: ClampDeep2.parentId === Root.id (NIET ClampDeep1 — bewijst de klem)', clampDeep2.parentId === root.id);
      truthy('I4/C1 end-to-end readMPP: ClampDeep2.wbsCode === "1.2" (zónder klem zou dit "1.1.1" zijn)', clampDeep2.wbsCode === '1.2');

      truthy('I4 end-to-end readMPP: Child1.parentId === Root.id', child1.parentId === root.id);
      truthy('I4 end-to-end readMPP: Child1.wbsCode === "1.3"', child1.wbsCode === '1.3');
      truthy('I4 end-to-end readMPP: Child2.parentId === Root.id', child2.parentId === root.id);
      truthy('I4 end-to-end readMPP: Child2.wbsCode === "1.4"', child2.wbsCode === '1.4');
      truthy(
        'I4 end-to-end readMPP: Root.childIds === [ClampDeep1, ClampDeep2, Child1, Child2] (ID-volgorde)',
        root.childIds.length === 4
          && root.childIds[0] === clampDeep1.id
          && root.childIds[1] === clampDeep2.id
          && root.childIds[2] === child1.id
          && root.childIds[3] === child2.id,
      );
      truthy('I4 end-to-end readMPP: Grandchild.parentId === Child2.id', grandchild.parentId === child2.id);
      truthy('I4 end-to-end readMPP: Grandchild.wbsCode === "1.4.1"', grandchild.wbsCode === '1.4.1');
      truthy('I4 end-to-end readMPP: Child2.childIds === [Grandchild]', child2.childIds.length === 1 && child2.childIds[0] === grandchild.id);
      truthy('I4 end-to-end readMPP: Grandchild.isMilestone === true (2010-milestone-tabel-terugval, 4a)', grandchild.isMilestone === true);
      truthy(
        'I4 end-to-end readMPP: Root/ClampDeep1/ClampDeep2/Child1/Child2 zijn GEEN milestone',
        !root.isMilestone && !clampDeep1.isMilestone && !clampDeep2.isMilestone && !child1.isMilestone && !child2.isMilestone,
      );
      truthy('I4 end-to-end readMPP: Root.scheduleDuration === 1 dag (4800 tienden-van-minuut @ 8u/dag)', root.time.scheduleDuration === 1);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// UURMODUS (etappe 1.5) — synthetische/corpusloze end-to-end fixtures: draaien ALTIJD, ook zonder
// corpus (spiegelt de I4-sectie hierboven, T5-conventie). Twee bewust MINIMAAL verschillende
// fixtures — beide met EXACT dezelfde kalendervorm (één band per werkdag, 08:00-16:00, 8u/dag —
// GEEN lunchpauze-splitsing, dus discriminator (a)/(b) vuurt NOOIT vanuit de kalender zelf) — zodat
// de enige variabele het TAAK-(c)-signaal is (isSubDayMinutes/hasNonAnchorTime), niet de
// kalenderbanden. Dat isoleert deze etappe se daadwerkelijke toevoeging (T6's kalenderbanden-
// discriminator werd al door de I4/T6-fixture in check-mpp-calendars.ts bewezen).
{
  const PASSWORD_FLAG_KEY = 893386752;
  const PROJECT_START_DATE_KEY = 37748738;
  const PROJECT_FINISH_DATE_KEY = 37748739;
  const TITLE_KEY = 37748744;
  const DEFAULT_CALENDAR_NAME_KEY = 37748750;

  function encodeUnicodeStringAscii(s: string): Uint8Array {
    const out = new Uint8Array(s.length * 2);
    const view = new DataView(out.buffer);
    for (let i = 0; i < s.length; i++) view.setUint16(i * 2, s.charCodeAt(i), true);
    return out;
  }

  /** Eén TBkndTask/FixedData-record (130 bytes, LETTERLIJKE default-offsets — zie de I4-toelichting
   *  hierboven) — hier met EXPLICIETE start-/finish-TIJD (niet alleen -dag), zodat de datum-kant
   *  van discriminator (c) (`hasNonAnchorTime`) ook gericht te sturen is. */
  function buildHourTaskFixedDataRecord(opts: {
    uniqueId: number; id: number; durationRaw: number;
    startTime: number; startDays: number; finishTime: number; finishDays: number;
    /** T10: rauwe DurationUnits-code (offset 46, short) — MPPUtility.getDurationTimeUnits-codes,
     *  bv. 8 = elapsedDays. Standaard 0 (⇒ 'days', dus NIET elapsed) — ongewijzigd t.o.v. vóór T10,
     *  zodat de bestaande fixtures 1-4 byte-identiek blijven. */
    durationUnits?: number;
  }): Uint8Array {
    const out = new Uint8Array(130);
    const view = new DataView(out.buffer);
    view.setInt32(0, opts.uniqueId, true);
    view.setInt32(4, opts.id, true);
    view.setInt16(40, 1, true); // outlineLevel = 1
    view.setInt32(42, opts.durationRaw, true);
    view.setUint16(46, opts.durationUnits ?? 0, true); // T10: DurationUnits — 0 = 'days' (WORKTIME)
    view.setInt16(56, 0, true); // constraintType = 0 (ASAP)
    view.setUint16(64, opts.startTime, true);
    view.setUint16(66, opts.startDays, true);
    view.setUint16(68, opts.finishTime, true);
    view.setUint16(70, opts.finishDays, true);
    view.setInt32(118, -1, true); // geen taak-kalender-override — gebruik de projectkalender
    return out;
  }

  function buildTaskFixedMetaRecord(offsetIntoFixedData: number): Uint8Array {
    const out = new Uint8Array(47);
    new DataView(out.buffer).setInt32(4, offsetIntoFixedData, true); // flags: niet verwijderd, geen milestone
    return out;
  }

  function buildFixedMetaBlob(items: Uint8Array[]): Uint8Array {
    const out = new Uint8Array(16 + items.length * 47);
    const view = new DataView(out.buffer);
    view.setUint32(0, 0xfadfadba, true);
    view.setInt32(8, items.length, true);
    items.forEach((item, i) => out.set(item, 16 + i * 47));
    return out;
  }

  /** Bouwt één compleet CFB-bestand: 1 taak (op de gegeven duur/tijden) + 1 kalender ZONDER
   *  lunchpauze-splitsing (dus zelf niet-deviërend) — de projectkalender via DEFAULT_CALENDAR_NAME. */
  // Standaard kalendervorm: ma-vr, ÉÉN band 08:00-16:00 (480-960, dus 480 minuten = 8u), geen
  // lunchpauze — canonicalizeBands.deviates === false op zichzelf (geen (a)/(b)-signaal). `opts.
  // calendarDays` (R2/R3, uurmodus-review) laat een fixture een AFWIJKENDE kalendervorm meegeven
  // (bv. per-weekdag verschillende bandlengtes, of een ander startuur) zonder de rest van de
  // CFB-boom te hoeven herhalen.
  const UNIFORM_8H_CAL_DAYS = [
    { defaultFlag: 0 as const },
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] },
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] },
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] },
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] },
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] },
    { defaultFlag: 0 as const },
  ];

  function buildFixture(opts: {
    taskName: string; durationRaw: number; startTime: number; startDays: number; finishTime: number; finishDays: number;
    calendarDays?: { defaultFlag?: 0 | 1; bands?: { startMinutes: number; durationMinutes: number }[] }[];
    calendarName?: string;
    /** T10: zie `buildHourTaskFixedDataRecord` — standaard 0 (WORKTIME). */
    durationUnits?: number;
  }): Uint8Array {
    const dummy = buildTaskFixedMetaRecord(0);
    // offsetIntoFixedData === 3*130 (390): matcht de BYTE-offset waarop `dataTask` hieronder in
    // `fixedDataBlob` geschreven wordt (spiegelt de I4-fixture: dat veld is een BYTE-offset in
    // FixedData, geen 1-op-1-indexrelatie met de positie in FixedMeta).
    const metaTask = buildTaskFixedMetaRecord(3 * 130);
    const fixedMetaBlob = buildFixedMetaBlob([dummy, dummy, dummy, metaTask]);

    const dataTask = buildHourTaskFixedDataRecord({
      uniqueId: 10, id: 1, durationRaw: opts.durationRaw,
      startTime: opts.startTime, startDays: opts.startDays, finishTime: opts.finishTime, finishDays: opts.finishDays,
      durationUnits: opts.durationUnits,
    });
    const fixedDataBlob = new Uint8Array(4 * 130);
    fixedDataBlob.set(dataTask, 3 * 130);

    const taskVarMetaBytes = buildVarMetaBytes([{ uniqueId: 10, type: 14, offset: 0 }]);
    const namePayload = encodeUnicodeStringAscii(opts.taskName);
    const taskVar2DataBuf = new Uint8Array(4 + namePayload.length);
    new DataView(taskVar2DataBuf.buffer).setInt32(0, namePayload.length, true);
    taskVar2DataBuf.set(namePayload, 4);

    const calendarName = opts.calendarName ?? 'Enkelband fixture';
    const hoursBlock = buildCalHoursBlock(opts.calendarDays ?? UNIFORM_8H_CAL_DAYS);
    const calFixedMetaBlob = buildCalFixedMetaBlob([0]);
    const calFixedDataBlob = buildCalFixedDataRecord(1, 1, -1);
    const CAL_NAME_OFF = 0, CAL_DATA_OFF = 100;
    const calVarMetaBytes = buildVarMetaBytes([
      { uniqueId: 1, type: 1, offset: CAL_NAME_OFF },
      { uniqueId: 1, type: 8, offset: CAL_DATA_OFF },
    ]);
    const calVar2DataBuf = new Uint8Array(700);
    const calVar2View = new DataView(calVar2DataBuf.buffer);
    const writeCalVar2 = (offset: number, payload: Uint8Array) => {
      calVar2View.setInt32(offset, payload.length, true);
      calVar2DataBuf.set(payload, offset + 4);
    };
    writeCalVar2(CAL_NAME_OFF, encodeUnicodeStringAscii(calendarName));
    writeCalVar2(CAL_DATA_OFF, hoursBlock);

    const projectPropsBytes = encodePropsEntries([
      { key: PROJECT_START_DATE_KEY, data: timestampBytes(0, 15000) },
      { key: PROJECT_FINISH_DATE_KEY, data: timestampBytes(0, 15010) },
      { key: TITLE_KEY, data: encodeUnicodeStringAscii('Uurmodus-fixture') },
      { key: DEFAULT_CALENDAR_NAME_KEY, data: encodeUnicodeStringAscii(calendarName) },
    ]);

    const tree: Record<string, CfbTreeNode> = {
      '\x01CompObj': { data: encodeCompObjFileFormat('MSProject.MPP14') },
      Props14: { data: encodePropsSingleByteEntry(PASSWORD_FLAG_KEY, 0) },
      '   114': {
        children: {
          Props: { data: projectPropsBytes },
          TBkndTask: {
            children: {
              FixedMeta: { data: fixedMetaBlob },
              FixedData: { data: fixedDataBlob },
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
    return buildNestedCfb(tree);
  }

  // ── Fixture 1: uren-taak — 2 uur (1200 tienden-van-minuut = 120 minuten) op een kalender die
  // zelf NIET deviëert ⇒ promotie kan hier UITSLUITEND van het taak-(c)-signaal komen. Start
  // 08:00 (== anker, geen datumsignaal daar), Finish 10:00 (≠ anker — dus zowel het duur- als het
  // datumsignaal vuurt, een dubbele bevestiging). ──────────────────────────────────────────────
  {
    const bytes = buildFixture({ taskName: 'HourTask', durationRaw: 1200, startTime: 4800, startDays: 15000, finishTime: 6000, finishDays: 15000 });
    let result: ReturnType<typeof readMPP> | null = null;
    let threw: string | null = null;
    try {
      result = readMPP(bytes);
    } catch (err) {
      threw = err instanceof Error ? err.message : String(err);
    }
    truthy(`uurmodus-fixture (uren-taak): readMPP gooit niet (${threw ?? ''})`, threw === null);
    if (result) {
      truthy('uurmodus-fixture (uren-taak): 1 taak', result.tasks.length === 1);
      const task = result.tasks[0];
      truthy('uurmodus-fixture (uren-taak): projectkalender.workTime gezet (taak-signaal, GEEN eigen kalenderdeviatie)', !!result.calendar.workTime);
      truthy('uurmodus-fixture (uren-taak): durationMinutes === 120 (geen dag-afronding naar 0)', task?.time.durationMinutes === 120);
      truthy('uurmodus-fixture (uren-taak): scheduleDuration === 0.25 (120min / 8u), NIET 0', task?.time.scheduleDuration === 0.25);
      truthy('uurmodus-fixture (uren-taak): scheduleStart draagt een tijdcomponent ("T" aanwezig)', !!task?.time.scheduleStart.includes('T'));
      truthy('uurmodus-fixture (uren-taak): scheduleStart === 08:00', task?.time.scheduleStart.endsWith('T08:00'));
      truthy('uurmodus-fixture (uren-taak): scheduleFinish === 10:00', task?.time.scheduleFinish.endsWith('T10:00'));
    }
  }

  // ── Fixture 2: dag-modus-contrastcase — EXACT dezelfde kalendervorm, maar een taak met een
  // duur die een heel aantal werkdagen beslaat (4800 tienden-van-minuut = 480 minuten = 8u = 1
  // dag @ dit kalender se eigen 8u/dag) en Start/Finish die BEIDE op het kalender-anker (08:00)
  // landen ⇒ geen enkel (c)-signaal ⇒ GEEN workTime-/durationMinutes-lek. ─────────────────────
  {
    const bytes = buildFixture({ taskName: 'DayTask', durationRaw: 4800, startTime: 4800, startDays: 15000, finishTime: 4800, finishDays: 15001 });
    let result: ReturnType<typeof readMPP> | null = null;
    let threw: string | null = null;
    try {
      result = readMPP(bytes);
    } catch (err) {
      threw = err instanceof Error ? err.message : String(err);
    }
    truthy(`uurmodus-fixture (dag-contrast): readMPP gooit niet (${threw ?? ''})`, threw === null);
    if (result) {
      truthy('uurmodus-fixture (dag-contrast): 1 taak', result.tasks.length === 1);
      const task = result.tasks[0];
      truthy('uurmodus-fixture (dag-contrast): projectkalender.workTime NIET gezet (geen lek)', !result.calendar.workTime);
      truthy('uurmodus-fixture (dag-contrast): durationMinutes NIET gezet (geen lek)', task?.time.durationMinutes === undefined);
      truthy('uurmodus-fixture (dag-contrast): scheduleDuration === 1 dag', task?.time.scheduleDuration === 1);
      truthy('uurmodus-fixture (dag-contrast): scheduleStart is dag-alleen (geen "T")', !task?.time.scheduleStart.includes('T'));
      truthy('uurmodus-fixture (dag-contrast): scheduleFinish is dag-alleen (geen "T")', !task?.time.scheduleFinish.includes('T'));
    }
  }

  // ── Fixture 3 (R2, uurmodus-review): ONDERSCHEIDENDE case voor SCALAR-vóór- vs ná-promotie
  // `hoursPerDay` — de reviewer se aangereikte tegenvoorbeeld. Kalender: ma 08:00-12:00 (4u), di-vr
  // 08:00-16:00 (8u), ÉÉN band per dag ⇒ `canonicalizeBands.deviates === false` (geen (a)/(b)-
  // signaal — geen dag heeft >1 band, geen band kruist middernacht). `buildCalendarFromDays`'s
  // SCALAR `hoursPerDay` komt uit de EERSTE werkende dag in de MPP-dagblokvolgorde (0=zo..6=za) —
  // dat is maandag, dus scalar hpd = 4. `deriveHoursPerDay` (de MODALE dagsom, ná promotie) zou
  // daarentegen 8 geven (4 dagen van 8u tegen 1 dag van 4u). Taak: 240 minuten, Start/Finish BEIDE
  // op het kalender-anker (08:00, geen datumsignaal). CORRECT (scalar-vóór-promotie, hpd=4):
  // 240 % (4×60=240) === 0 ⇒ GEEN durSignal ⇒ dagmodus. Zou `readTasks`'s signaal-scan per ongeluk
  // de ná-promotie-waarde (8) lezen: 240 % (8×60=480) = 240 ≠ 0 ⇒ WEL durSignal ⇒ uurmodus — exact
  // het onderscheid dat de crawl-corpus-drift-pins (R1 hierboven) NIET konden vangen. Zelf geverifieerd
  // (uurmodus-review, niet gecommit): een tijdelijke mutatie die `cal.hoursPerDay` vóór de signaal-
  // scan herberekent via `deriveHoursPerDay` (i.p.v. de scalar-waarde te laten staan) laat deze
  // fixture-asserts daadwerkelijk rood uitslaan (`workTime` wordt dan gezet, `durationMinutes` 60) —
  // zie het commitrapport voor de exacte mutatie en poortuitvoer.
  {
    const MON_4H_TUE_FRI_8H_DAYS = [
      { defaultFlag: 0 as const }, // zo
      { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 240 }] }, // ma 08:00-12:00 (4u)
      { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] }, // di 08:00-16:00 (8u)
      { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] }, // wo
      { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] }, // do
      { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] }, // vr
      { defaultFlag: 0 as const }, // za
    ];
    const bytes = buildFixture({
      taskName: 'ScalarVsPromotedTask', durationRaw: 2400, // 240 minuten
      startTime: 4800, startDays: 15000, finishTime: 4800, finishDays: 15001, // beide 08:00 = anker
      calendarDays: MON_4H_TUE_FRI_8H_DAYS, calendarName: 'Ongelijke dagen fixture',
    });
    let result: ReturnType<typeof readMPP> | null = null;
    let threw: string | null = null;
    try {
      result = readMPP(bytes);
    } catch (err) {
      threw = err instanceof Error ? err.message : String(err);
    }
    truthy(`uurmodus-fixture (scalar-vs-promoted): readMPP gooit niet (${threw ?? ''})`, threw === null);
    if (result) {
      truthy('uurmodus-fixture (scalar-vs-promoted): 1 taak', result.tasks.length === 1);
      const task = result.tasks[0];
      truthy(
        `uurmodus-fixture (scalar-vs-promoted): projectkalender.workTime NIET gezet (scalar hpd=4, 240%240===0) — hoursPerDay=${result.calendar.hoursPerDay}`,
        !result.calendar.workTime,
      );
      truthy('uurmodus-fixture (scalar-vs-promoted): durationMinutes NIET gezet', task?.time.durationMinutes === undefined);
    }
  }

  // ── Fixture 4 (R3, uurmodus-review): ANKERDIVERGENTIE — de "conform MSPDI-import"-belofte in de
  // moduleheader/commitboodschap geldt ALLEEN wanneer de kalender se eigen startuur toevallig 08:00
  // is (MSPDI's vaste, writer-gekalibreerde anker). Kalender: ma-vr ÉÉN band 09:00-17:00 (8u, geen
  // lunchpauze ⇒ geen (a)/(b)-signaal). Taak: 480 minuten (= exact 8u = deze kalender se hoursPerDay
  // ⇒ geen durSignal), Start/Finish BEIDE om 09:00 (== déze kalender se EIGEN anker, `mppAnchorClock`
  // gebruikt `cal.workStartHour`, hier 9 ⇒ "09:00:00" ⇒ geen datumsignaal). MPP-kant: BLIJFT dagmodus.
  // MSPDI-kant: dezelfde taak/kalender, hierbeneden als minimale MSPDI-XML opgebouwd en door de
  // ONGEWIJZIGDE `readMSPDI` gehaald — díe vergelijkt tegen het VASTE `MSP_TIME_ANCHOR` (08:00), dus
  // 09:00 ≠ 08:00 ⇒ WEL een datumsignaal ⇒ UURMODUS. Bewust vastgelegd (niet "opgelost"): het
  // kalender-eigen anker is voor een rauw MPP-bestand semantisch juister dan MSPDI's vaste
  // schrijfconventie (zie `mppAnchorClock`'s toelichting in mppReader.ts) — dit is dus een
  // GEACCEPTEERDE, TWEEZIJDIGE divergentie tussen de twee lezers voor niet-08:00-kalenders, geen bug.
  {
    installDOMParser();

    const bytes = buildFixture({
      taskName: 'AnchorDivergenceTask', durationRaw: 4800, // 480 minuten = 8u
      startTime: 5400, startDays: 15000, finishTime: 5400, finishDays: 15001, // beide 09:00 = déze kalender se anker
      calendarDays: [
        { defaultFlag: 0 as const }, // zo
        { defaultFlag: 0 as const, bands: [{ startMinutes: 540, durationMinutes: 480 }] }, // ma 09:00-17:00
        { defaultFlag: 0 as const, bands: [{ startMinutes: 540, durationMinutes: 480 }] }, // di
        { defaultFlag: 0 as const, bands: [{ startMinutes: 540, durationMinutes: 480 }] }, // wo
        { defaultFlag: 0 as const, bands: [{ startMinutes: 540, durationMinutes: 480 }] }, // do
        { defaultFlag: 0 as const, bands: [{ startMinutes: 540, durationMinutes: 480 }] }, // vr
        { defaultFlag: 0 as const }, // za
      ],
      calendarName: '09:00-kalender fixture',
    });
    let result: ReturnType<typeof readMPP> | null = null;
    let threw: string | null = null;
    try {
      result = readMPP(bytes);
    } catch (err) {
      threw = err instanceof Error ? err.message : String(err);
    }
    truthy(`uurmodus-fixture (ankerdivergentie, mpp-kant): readMPP gooit niet (${threw ?? ''})`, threw === null);
    if (result) {
      truthy('uurmodus-fixture (ankerdivergentie, mpp-kant): 1 taak', result.tasks.length === 1);
      truthy(
        'uurmodus-fixture (ankerdivergentie, mpp-kant): projectkalender.workTime NIET gezet (kalender-eigen anker 09:00 == taaktijden)',
        !result.calendar.workTime,
      );
      truthy('uurmodus-fixture (ankerdivergentie, mpp-kant): durationMinutes NIET gezet (dagmodus)', result.tasks[0]?.time.durationMinutes === undefined);
    }

    // Dezelfde taak/kalender als minimale MSPDI-XML — bewijst de ANDERE kant van de divergentie.
    const mspdiXml = `<?xml version="1.0"?>
<Project xmlns="http://schemas.microsoft.com/project">
<Name>AnkerdivergentieFixture</Name>
<StartDate>2026-07-06T09:00:00</StartDate>
<FinishDate>2026-07-07T09:00:00</FinishDate>
<Calendars>
<Calendar>
<UID>1</UID>
<Name>09:00-kalender fixture</Name>
<WeekDays>
<WeekDay><DayType>2</DayType><DayWorking>1</DayWorking><WorkingTimes><WorkingTime><FromTime>09:00:00</FromTime><ToTime>17:00:00</ToTime></WorkingTime></WorkingTimes></WeekDay>
<WeekDay><DayType>3</DayType><DayWorking>1</DayWorking><WorkingTimes><WorkingTime><FromTime>09:00:00</FromTime><ToTime>17:00:00</ToTime></WorkingTime></WorkingTimes></WeekDay>
<WeekDay><DayType>4</DayType><DayWorking>1</DayWorking><WorkingTimes><WorkingTime><FromTime>09:00:00</FromTime><ToTime>17:00:00</ToTime></WorkingTime></WorkingTimes></WeekDay>
<WeekDay><DayType>5</DayType><DayWorking>1</DayWorking><WorkingTimes><WorkingTime><FromTime>09:00:00</FromTime><ToTime>17:00:00</ToTime></WorkingTime></WorkingTimes></WeekDay>
<WeekDay><DayType>6</DayType><DayWorking>1</DayWorking><WorkingTimes><WorkingTime><FromTime>09:00:00</FromTime><ToTime>17:00:00</ToTime></WorkingTime></WorkingTimes></WeekDay>
</WeekDays>
</Calendar>
</Calendars>
<Tasks>
<Task><UID>1</UID><Name>AnchorDivergenceTask</Name><OutlineLevel>1</OutlineLevel><Start>2026-07-06T09:00:00</Start><Finish>2026-07-07T09:00:00</Finish><Duration>PT8H0M0S</Duration></Task>
</Tasks>
</Project>`;
    let xmlResult: ReturnType<typeof readMSPDI> | null = null;
    let xmlThrew: string | null = null;
    try {
      xmlResult = readMSPDI(mspdiXml);
    } catch (err) {
      xmlThrew = err instanceof Error ? err.message : String(err);
    }
    truthy(`uurmodus-fixture (ankerdivergentie, mspdi-kant): readMSPDI gooit niet (${xmlThrew ?? ''})`, xmlThrew === null);
    if (xmlResult) {
      truthy('uurmodus-fixture (ankerdivergentie, mspdi-kant): 1 taak', xmlResult.tasks.length === 1);
      truthy(
        'uurmodus-fixture (ankerdivergentie, mspdi-kant): projectkalender.workTime WEL gezet (MSPDI se vaste 08:00-anker ≠ 09:00)',
        !!xmlResult.calendar.workTime,
      );
      truthy(
        'uurmodus-fixture (ankerdivergentie, mspdi-kant): durationMinutes === 480 (uurmodus, ondanks identieke taakinhoud als de mpp-kant)',
        xmlResult.tasks[0]?.time.durationMinutes === 480,
      );
    }
  }

  // ── Fixture 5 (T10): DAG-MODUS + ELAPSEDTIME — bewijst de conversievalkuil uit het plan direct,
  // zonder corpus. DurationUnits=8 (elapsedDays), durationRaw=28800 tienden-van-minuut (= 2 KLOK-
  // dagen van 24u). Start/Finish BEIDE op het kalender-anker (08:00) en 2880 minuten deelt exact
  // door 480 (8u/dag) ⇒ GEEN taak-(c)-signaal ⇒ blijft dagmodus (spiegelt Fixture 2's opzet exact,
  // alleen nu met elapsed-eenheden). CORRECT (klok-tijd, 24u/dag): scheduleDuration === 2. Zou de
  // dag-omrekening ONTERECHT een tweede keer door `hoursPerDay` (8) delen — de conversievalkuil zelf
  // — dan zou dit 28800/(10×8×60) = 6 opleveren i.p.v. 2. ──────────────────────────────────────
  {
    const bytes = buildFixture({
      taskName: 'ElapsedDayModeTask', durationRaw: 28800,
      startTime: 4800, startDays: 15000, finishTime: 4800, finishDays: 15001,
      durationUnits: 8, // elapsedDays (MPPUtility.getDurationTimeUnits-code)
    });
    let result: ReturnType<typeof readMPP> | null = null;
    let threw: string | null = null;
    try {
      result = readMPP(bytes);
    } catch (err) {
      threw = err instanceof Error ? err.message : String(err);
    }
    truthy(`uurmodus-fixture (T10 dag-modus elapsed): readMPP gooit niet (${threw ?? ''})`, threw === null);
    if (result) {
      truthy('uurmodus-fixture (T10 dag-modus elapsed): 1 taak', result.tasks.length === 1);
      const task = result.tasks[0];
      truthy('uurmodus-fixture (T10 dag-modus elapsed): projectkalender.workTime NIET gezet (dagmodus, geen lek)', !result.calendar.workTime);
      truthy('uurmodus-fixture (T10 dag-modus elapsed): durationMinutes NIET gezet (dagmodus)', task?.time.durationMinutes === undefined);
      truthy('uurmodus-fixture (T10 dag-modus elapsed): durationType === ELAPSEDTIME', task?.time.durationType === 'ELAPSEDTIME');
      truthy(
        `uurmodus-fixture (T10 dag-modus elapsed): scheduleDuration === 2 (klok-dagen, GEEN dubbele hoursPerDay-deling — kreeg ${task?.time.scheduleDuration})`,
        task?.time.scheduleDuration === 2,
      );
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// Corpus-gedreven structuurcheck (optioneel — zie moduleheader)
// ═══════════════════════════════════════════════════════════════════════════════════════════
const CORPUS =
  process.env.OPS_MPP_CORPUS ??
  '/home/nozzit/open-aec/voor claude/test bestanden voor file implementation';
const corpusPresent = existsSync(CORPUS);
const corpusFiles = corpusPresent ? readdirSync(CORPUS).filter((f) => f.toLowerCase().endsWith('.mpp')) : [];

if (!corpusPresent) {
  console.log('OK  mpp-import: corpus niet aanwezig (OPS_MPP_CORPUS) — corpuslus overgeslagen');
} else if (corpusFiles.length === 0) {
  console.log(`OK  mpp-import: corpusmap aanwezig maar geen .mpp-bestanden erin (${CORPUS}) — corpuslus overgeslagen`);
} else {
  const BACKEND_STORAGES = ['TBkndTask', 'TBkndRsc', 'TBkndAssn', 'TBkndCons', 'TBkndCal'];
  // Var2Data draagt variabele-lengte velden per record en zit daarom NIET gegarandeerd overal:
  // een storage zonder variabele inhoud (bv. TBkndCons zonder notities/tekst op relaties) heeft
  // een lege VarMeta en geen Var2Data-stream. Geverifieerd op het corpus: 'bijlage 7 Productie
  // planning.mpp' mist 'm voor TBkndCons, terwijl de andere twee bestanden 'm daar wél hebben —
  // dus hard vereisen zou hier op legitieme data falen. FixedMeta/FixedData/VarMeta zijn wél
  // altijd aanwezig in de drie corpusbestanden en blijven hard vereist.
  const REQUIRED_STREAMS = ['FixedMeta', 'FixedData', 'VarMeta'];

  for (const file of corpusFiles) {
    const path = join(CORPUS, file);
    let cfb: CfbFile;
    try {
      cfb = new CfbFile(new Uint8Array(readFileSync(path)));
    } catch (err) {
      checks++;
      diffs.push(`[${file}] CFB-parse mislukte: ${err instanceof Error ? err.message : String(err)}`);
      continue;
    }

    truthy(`[${file}] root heeft \\x01CompObj`, cfb.root.children.has('\x01CompObj'));

    const props114 = cfb.getStorage(['   114']);
    truthy(`[${file}] storage '   114' bestaat`, props114 !== null);
    if (!props114) continue;

    const propsStream = cfb.getStream(['   114', 'Props']);
    truthy(`[${file}] '   114'/Props is een stream`, propsStream !== null);
    truthy(`[${file}] '   114'/Props heeft inhoud`, (propsStream?.length ?? 0) > 0);

    for (const storageName of BACKEND_STORAGES) {
      const storage = cfb.getStorage(['   114', storageName]);
      truthy(`[${file}] '   114'/${storageName} bestaat als storage`, storage !== null);
      if (!storage) continue;
      for (const streamName of REQUIRED_STREAMS) {
        const has = storage.children.get(streamName)?.type === 'stream';
        truthy(`[${file}] '   114'/${storageName}/${streamName} bestaat als stream`, has);
      }
      // Informatief (niet hard vereist — zie toelichting bij REQUIRED_STREAMS hierboven).
      const hasVar2Data = storage.children.get('Var2Data')?.type === 'stream';
      console.log(
        `   . [${file}] '   114'/${storageName}/Var2Data: ${hasVar2Data ? 'aanwezig' : 'afwezig (geen variabele velden)'}`,
      );
    }

    const taskFixedData = cfb.getStream(['   114', 'TBkndTask', 'FixedData']);
    truthy(`[${file}] TBkndTask/FixedData levert bytes`, (taskFixedData?.length ?? 0) > 0);

    // Onbekend pad ⇒ null, geen throw (bewijst dat het pad-lookup-contract standhoudt).
    truthy(`[${file}] onbekend pad geeft null`, cfb.getStream(['does-not-exist']) === null);

    // ── T4: MPP-containerlaag tegen de echte corpusbestanden ──────────────────────────────────
    try {
      const variant = detectMppVariant(cfb);
      truthy(`[${file}] detectMppVariant === 'MPP14'`, variant === 'MPP14');
    } catch (err) {
      checks++;
      diffs.push(`[${file}] detectMppVariant gooide onverwacht: ${err instanceof Error ? err.message : String(err)}`);
    }

    try {
      assertReadable(cfb);
      truthy(`[${file}] assertReadable gooit niet (onversleuteld MPP14)`, true);
    } catch (err) {
      truthy(`[${file}] assertReadable gooit niet (onversleuteld MPP14)`, false);
      diffs.push(`[${file}] assertReadable gooide onverwacht: ${err instanceof Error ? err.message : String(err)}`);
    }

    const taskFixedMetaBytes = cfb.getStream(['   114', 'TBkndTask', 'FixedMeta']);
    if (taskFixedMetaBytes && taskFixedData) {
      try {
        // itemSize=47, zoals MPP14Reader.java r. 993 voor TBkndTask/FixedMeta.
        const taskFixedMeta = FixedMeta.withItemSize(taskFixedMetaBytes, 47, `${file}/TBkndTask/FixedMeta`);
        const taskFixedDataParsed = FixedData.fromMeta(taskFixedMeta, taskFixedData, 0, 0, `${file}/TBkndTask/FixedData`);
        truthy(
          `[${file}] TBkndTask FixedData.getItemCount() > 0`,
          taskFixedDataParsed.getItemCount() > 0,
        );
      } catch (err) {
        checks++;
        diffs.push(`[${file}] TBkndTask FixedMeta/FixedData parse mislukte: ${err instanceof Error ? err.message : String(err)}`);
      }
    } else {
      checks++;
      diffs.push(`[${file}] TBkndTask/FixedMeta of TBkndTask/FixedData ontbreekt`);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// T5 — readMPP vs. de MSPDI-ground-truth (per corpuspaar: taakaantal + veld-voor-veld)
// ═══════════════════════════════════════════════════════════════════════════════════════════
//
// Ground-truth-taakaantallen (plan §Corpus): Bijlage 13 = 51, Bijlage 20 PKB = 134, bijlage 7 =
// 215. `installDOMParser` (xmldom-shim) geeft `readMSPDI` een browser-`DOMParser`-vervanger in
// Node — hetzelfde patroon als `check-mspdi-baseline-export.ts`.
//
// BEVINDING, GECORRIGEERD (T5-spec-review, 2026-08-14): een strikte POSITIONELE vergelijking
// ("taak i in de .mpp-volgorde ⇔ taak i in de MSPDI-volgorde") is voor dit corpus NIET haalbaar —
// niet door een bug in deze lezer. Een eerdere versie van deze sectie weet dat aan "staleness" van
// `PARENT_TASK_UNIQUE_ID`/`SCHEDULED_START` binnen de `.mpp`'s zelf; die diagnose is WEERLEGD door
// een byte-voor-byte hermeting: `PARENT_TASK_UNIQUE_ID` is in alle drie `.mpp`'s 100% consistent
// met de outline-level-stack (0 verschillen op 51/134/215 taken — geen enkele interne
// tegenstrijdigheid), en MPXJ gebruikt dat veld voor de hiërarchie ÜBERHAUPT NIET
// (`MPP14Reader.processTaskData` vult `m_parentTasks`, maar `ProjectFile.updateStructure()` leest
// die map nooit terug — de boom komt daar simpelweg uit de taken GESORTEERD OP ID plus het
// outline-level, exact wat `mppReader.ts` doet; zie de moduleheader daar voor het volledige
// verhaal).
//
// De WERKELIJKE oorzaak: de drie `.mpp.xml`-ground-truths zijn een ANDERE DOCUMENTVERSIE dan de
// bijbehorende `.mpp`'s, geen export van precies dezelfde staat. Bewijs: alle drie XML's hebben
// compact herNUMMERDE UID==ID 1..N (een echte export van dezelfde live state behoudt bestaande
// unique-ID's — die zijn na jaren editen nooit toevallig weer 1..N op een rij); 27 van de 51
// `.mpp`-unique-ID's in Bijlage 13 komen zelfs helemaal niet voor in die XML-reeks; taken zijn
// verplaatst (een cut/paste-handtekening, geen enkel-veld-drift); en de projectstartdatum van
// bijlage 7 verschilt ronduit tussen de twee bestanden (`.mpp` 2025-12-19 vs. `.mpp.xml`
// 2025-12-08). Dat is een brongegeven van dít corpus — geen enkele lezer, MPXJ incluis, kan een
// document tegen een andere revisie van zichzelf 1-op-1 positioneel matchen.
//
// ⚠️ T7-WAARSCHUWING: om dezelfde reden zijn de link-/resource-/assignmentaantallen in de
// MSPDI-ground-truth (104/111/225 links, 9/7/5 resources, 51/146/221 assignments — zie het plan)
// NIET gezaghebbend voor wat T7 uit de `.mpp`'s zelf hoort te lezen. Een ruwe TBkndCons-scan
// (FixedMeta.getAdjustedItemCount(), vóór filtering) geeft bijvoorbeeld 115/134/252 linkrecords —
// een heel ander beeld. T7 moet net als hier naam-/sleutel-gematchte vergelijkingen + gemeten
// basislijnen gebruiken, nooit een harde eis dat het `.mpp`-aantal het XML-aantal evenaart.
//
// Deze check matcht taken daarom op NAAM (FIFO per naam, getrimd — zie de toelichting bij
// `xmlByName` hieronder) i.p.v. op volgorde-index — dat isoleert de vergelijking van de niet-
// beïnvloedbare documentversie-afwijking. Taakaantal + naam-matchpercentage zijn de HARDE poorten
// (versie-onafhankelijk, en in de praktijk 100% haalbaar — corpus-geverifieerd op alle drie
// bestanden). Velden die het versieverschil rechtstreeks raakt (start/finish/duur/outline-diepte/
// constraintdatum) zijn NIET blind hard gemaakt: een harde 0-diffs-eis zou hier een documentversie-
// verschil bestraffen, geen regressie in deze lezer. Ze lopen PER VELDSOORT als BUDGET-poort mee
// (elke soort z'n eigen, exact gemeten basislijn — een regressie die één van die tellingen laat
// groeien faalt dus wél) plus volledige diagnostische logging. Milestone/constrainttype/deadline/
// completion zijn in de praktijk WEL 100% stabiel gebleken (0 afwijkingen over alle 400 taken
// heen) en blijven daarom harde asserts; WBS krijgt een VORM-check (zie `wbsCode`-assert
// hieronder) — géén ground-truth-gelijkheid, want de gegenereerde outline-nummering volgt per
// definitie de `.mpp`-documentstructuur, niet de andere revisie in de XML.
//
// Basislijn-samenstelling (2026-08-14, dit corpus, deze code — gemeten, niet geschat): 321 van de
// 357 veldafwijkingen (≈90%) zijn start/finish-dagprefixverschillen, rechtstreeks toe te schrijven
// aan het documentversieverschil hierboven (verplaatste taken/andere projectstart) — GEEN
// uur-modus-artefact. Het duur-budget (22) is gemengd: een deel volgt uit datzelfde
// versieverschil, een deel uit het feit dat de MSPDI-ground-truth voor Bijlage 20/bijlage 7
// stellenwijs URE-MODUS is (fractionele dagduren, tijd-component in Finish — `mspdiReader`'s
// `promoteHourCalendar`, bv. "6.40625" dagen) terwijl deze lezer in etappe 1 uitsluitend
// DAG-modus kent (taakopdracht T5, expliciet) — de duurvergelijking rondt daarom af op hele dagen
// vóór vergelijken. Outline-diepte (12) en constraintdatum (2) volgen ook uit het versieverschil
// (verplaatste taken krijgen een andere boomdiepte/constraint-context in de andere revisie).
if (corpusPresent) {
  installDOMParser();
  const EXPECTED_TASK_COUNTS: Record<string, number> = {
    'Bijlage 13 Productieplanning.mpp': 51,
    'Bijlage 20 productieplanning PKB.mpp': 134,
    'bijlage 7 Productie planning.mpp': 215,
  };

  interface FieldDiffBudget {
    start: number;
    finish: number;
    duration: number;
    outlineDepth: number;
    constraintDate: number;
  }
  /** Basislijn PER VELDSOORT (T5-spec-review, punt 2 — vervangt de eerdere per-bestand-som): het
   *  EXACTE aantal gemeten afwijkingen van dat type, veroorzaakt door het documentversieverschil
   *  hierboven (+ het uur-modus-gat voor duur). Een regressie die één van deze tellingen laat
   *  groeien, faalt de poort voor precies dát veld; een toekomstige verbetering (bv. uur-modus-
   *  ondersteuning voor MPP) mag een telling laten dalen zonder dat de poort meeverandert (`<=`
   *  per veldsoort, niet één gezamenlijke som die een regressie in het ene veld door ruimte in het
   *  andere kan laten wegvallen). */
  const FIELD_DIFF_BUDGET: Record<string, FieldDiffBudget> = {
    // Etappe 1.5 (uurmodus, 2026-08-15) hermeting — zie "UURMODUS (etappe 1.5)" hieronder voor de
    // volledige toelichting. start/finish: ONGEWIJZIGD t.o.v. etappe 1 (12/12, 95/96, 53/53) — de
    // dag-prefix van een timestamp is identiek ongeacht dag- of uur-pad. duration: GEGROEID (was
    // 5/7/10, nu 8/14/28) — bij minuut-precieze vergelijking (bothHour) is de duur-afwijking GEEN
    // afrondingsartefact meer maar een rechtstreekse meting van het documentversieverschil (zie de
    // T5-moduleheader) — de grovere dag-afgeronde vergelijking maskeerde een deel daarvan.
    'Bijlage 13 Productieplanning.mpp': { start: 12, finish: 12, duration: 8, outlineDepth: 5, constraintDate: 0 },
    'Bijlage 20 productieplanning PKB.mpp': { start: 95, finish: 96, duration: 14, outlineDepth: 2, constraintDate: 0 },
    'bijlage 7 Productie planning.mpp': { start: 53, finish: 53, duration: 28, outlineDepth: 5, constraintDate: 2 },
  };

  /** Vorm-check voor een outline-genereerde WBS-code ("1", "1.2", "1.2.3", …) — zie de toelichting
   *  bij `wbsCode`-generatie in `mppReader.ts`. Géén ground-truth-vergelijking (zie moduleheader):
   *  dit verifieert alleen dat de gegenereerde vorm klopt en zelf-consistent is met de
   *  outline-diepte, niet dat 'm letterlijk gelijk is aan de XML's (andere documentrevisie). */
  const WBS_SHAPE = /^\d+(\.\d+)*$/;

  function outlineDepth(byId: Map<string, Task>, task: Task): number {
    let depth = 1;
    let cur: Task | undefined = task;
    const seen = new Set<string>();
    while (cur?.parentId) {
      if (seen.has(cur.id)) break; // defensieve cyclusbreker — mag hier nooit gebeuren
      seen.add(cur.id);
      const parent = byId.get(cur.parentId);
      if (!parent) break;
      depth++;
      cur = parent;
    }
    return depth;
  }

  for (const [file, expectedCount] of Object.entries(EXPECTED_TASK_COUNTS)) {
    // I5 (T5-kwaliteitsreview): deze lus itereert over HARDGECODEERDE bestandsnamen (de drie
    // ground-truth-paren) — wie `OPS_MPP_CORPUS` naar een eigen map met ANDERE `.mpp`-bestanden
    // wijst, mag daar geen rode poort van krijgen. Een naam die niet in `corpusFiles` voorkomt
    // (de dynamische `readdirSync`-listing hierboven) wordt dus netjes overgeslagen — alleen een
    // bestand dat WEL in `corpusFiles` staat maar zonder bijbehorende `.mpp.xml` is een echte,
    // hard te melden diff (dat IS een gat in het aangeboden corpus, geen ander-corpus-scenario).
    if (!corpusFiles.includes(file)) {
      console.log(`OK  mpp-import: T5 ${file} niet in dit corpus (${CORPUS}) — overgeslagen`);
      continue;
    }
    const mppPath = join(CORPUS, file);
    const xmlPath = `${mppPath}.xml`;
    if (!existsSync(xmlPath)) {
      checks++;
      diffs.push(`[T5 ${file}] .mpp aanwezig maar .mpp.xml ontbreekt`);
      continue;
    }

    let mppTasks: Task[];
    try {
      const result = readMPP(new Uint8Array(readFileSync(mppPath)));
      mppTasks = result.tasks;
    } catch (err) {
      checks++;
      diffs.push(`[T5 ${file}] readMPP gooide onverwacht: ${err instanceof Error ? err.message : String(err)}`);
      continue;
    }

    let xmlTasks: Task[];
    try {
      const xmlResult = readMSPDI(readFileSync(xmlPath, 'utf-8'));
      xmlTasks = xmlResult.tasks;
    } catch (err) {
      checks++;
      diffs.push(`[T5 ${file}] readMSPDI (ground truth) gooide onverwacht: ${err instanceof Error ? err.message : String(err)}`);
      continue;
    }

    // ── Harde poorten: taakaantal + 100% naam-matchbaarheid (volgorde-onafhankelijk) ────────────
    truthy(`[T5 ${file}] taakaantal === ${expectedCount}`, mppTasks.length === expectedCount);
    truthy(`[T5 ${file}] taakaantal mpp === taakaantal MSPDI-ground-truth`, mppTasks.length === xmlTasks.length);

    const mppById = new Map(mppTasks.map((t) => [t.id, t]));
    const xmlById = new Map(xmlTasks.map((t) => [t.id, t]));

    // Naam → wachtrij van xml-taken met die naam, in documentvolgorde (FIFO-verbruik hieronder).
    // Matchsleutel is GETRIMD (bevinding, corpus-onderzoek deze taak): bijlage 7 bevat tientallen
    // taken waar de MPP-var-data een trailing spatie draagt ("zagen ") die in de MSPDI-ground-
    // truth ontbreekt ("zagen") — vermoedelijk trimt MS Project's eigen "Save As XML" bij export,
    // terwijl de binaire opslag de exacte gebruikersinvoer bewaart. Deze lezer trimt de
    // OPGESLAGEN `task.name` zelf NIET (spiegelt mspdiReader: brondata blijft exact) — alleen de
    // MATCH-sleutel hier, zodat zo'n triviale export-eigenaardigheid de taak-voor-taak-vergelijking
    // niet blokkeert.
    const xmlByName = new Map<string, Task[]>();
    for (const t of xmlTasks) {
      const key = t.name.trim();
      const list = xmlByName.get(key);
      if (list) list.push(t);
      else xmlByName.set(key, [t]);
    }

    let matched = 0;
    const fieldDiffCount: FieldDiffBudget = { start: 0, finish: 0, duration: 0, outlineDepth: 0, constraintDate: 0 };
    const fieldDiagnostics: string[] = [];
    for (const mppTask of mppTasks) {
      const queue = xmlByName.get(mppTask.name.trim());
      const xmlTask = queue && queue.length > 0 ? queue.shift() : undefined;
      if (!xmlTask) {
        diffs.push(`[T5 ${file}] taak "${mppTask.name}": geen gelijknamige taak in de MSPDI-ground-truth gevonden`);
        checks++;
        continue;
      }
      matched++;
      const label = `"${mppTask.name}"`;

      // Budget-gedekt PER VELDSOORT (documentversieverschil/uur-modus-gat, zie moduleheader) —
      // GEEN harde `truthy`: geteld in `fieldDiffCount` (per soort) en volledig gelogd in
      // `fieldDiagnostics`, niet in `diffs`.
      // Uurmodus (etappe 1.5): start/finish blijven ALTIJD op DAG-prefix vergeleken — de
      // dag-component van een timestamp is identiek ongeacht of hij via `formatDate` (dag-pad) of
      // `formatInstant(...,'hour')` (uur-pad) geformatteerd is (allebei `Date#toISOString()` als
      // bron), dus deze vergelijking is NIET geraakt door de uurmodus-uitbreiding — vandaar dat de
      // start/finish-budgets hieronder ONGEWIJZIGD blijven t.o.v. vóór etappe 1.5. Duur vergelijkt
      // WEL uurmodus-bewust: als BEIDE kanten (mpp + de MSPDI-ground-truth) `durationMinutes` dragen
      // (de discriminator-uitkomst), dan minuut-precies (`durationMinutes` rechtstreeks) — dat is
      // precies het "de duur-diffs waren deels uurmodus-gerelateerd"-gat dat deze etappe dicht: een
      // taak die vroeger op dag-niveau afweek door dubbele afronding (mpp ↓ naar hele dagen, xml
      // fractioneel) kan nu op minuutniveau wél matchen. Anders (minstens één kant dag-modus)
      // vergelijkt op AFGERONDE dagen aan BEIDE kanten (voorheen alleen de xml-kant afgerond, wat
      // fout was zodra de mpp-kant zelf ook fractioneel werd — zie de T5-review hieronder).
      const bothHour = mppTask.time.durationMinutes != null && xmlTask.time.durationMinutes != null;
      const softChecks: [keyof FieldDiffBudget, string, boolean][] = [
        ['start', 'start (dag-prefix)', mppTask.time.scheduleStart.slice(0, 10) === xmlTask.time.scheduleStart.slice(0, 10)],
        ['finish', 'finish (dag-prefix)', mppTask.time.scheduleFinish.slice(0, 10) === xmlTask.time.scheduleFinish.slice(0, 10)],
        bothHour
          ? ['duration', 'duur in minuten', mppTask.time.durationMinutes === xmlTask.time.durationMinutes]
          : ['duration', 'duur in dagen', Math.round(mppTask.time.scheduleDuration) === Math.round(xmlTask.time.scheduleDuration)],
        ['outlineDepth', 'outline-diepte', outlineDepth(mppById, mppTask) === outlineDepth(xmlById, xmlTask)],
      ];
      softChecksTotal += softChecks.length; // apart geteld, zie `softChecksTotal`'s toelichting
      for (const [category, fieldLabel, ok] of softChecks) {
        if (!ok) {
          fieldDiffCount[category]++;
          fieldDiagnostics.push(`${label}: ${fieldLabel}`);
        }
      }

      const mppConstraintType = mppTask.constraint?.type ?? 'ASAP';
      const xmlConstraintType = xmlTask.constraint?.type ?? 'ASAP';
      if (mppConstraintType !== 'ASAP' && mppConstraintType !== 'ALAP') {
        // Ook budget-gedekt (constraintDate zit in FieldDiffBudget) — apart geteld, net als
        // `softChecks` hierboven, niet in de harde `checks`-som.
        softChecksTotal++;
        const ok = (mppTask.constraint?.date?.slice(0, 10) ?? '') === (xmlTask.constraint?.date?.slice(0, 10) ?? '');
        if (!ok) {
          fieldDiffCount.constraintDate++;
          fieldDiagnostics.push(`${label}: constraintdatum (dag-prefix)`);
        }
      }

      // Hard (0 afwijkingen gemeten over alle drie bestanden — zie moduleheader).
      truthy(`[T5 ${file}] ${label}: milestone-vlag`, mppTask.isMilestone === xmlTask.isMilestone);
      truthy(`[T5 ${file}] ${label}: constrainttype`, mppConstraintType === xmlConstraintType);
      truthy(
        `[T5 ${file}] ${label}: deadline (dag-prefix)`,
        (mppTask.deadline?.slice(0, 10) ?? '') === (xmlTask.deadline?.slice(0, 10) ?? ''),
      );
      // WBS: VORM-check + zelf-consistentie met outline-diepte (géén ground-truth-gelijkheid —
      // zie moduleheader). Hard: dit hangt niet af van welke documentrevisie, alleen van of
      // `mppReader.ts`'s outline-nummering intern klopt.
      truthy(`[T5 ${file}] ${label}: wbsCode heeft de vorm "1" / "1.2" / "1.2.3.4"`, WBS_SHAPE.test(mppTask.wbsCode));
      truthy(
        `[T5 ${file}] ${label}: wbsCode-segmentaantal === outline-diepte`,
        mppTask.wbsCode.split('.').length === outlineDepth(mppById, mppTask),
      );
      // Completion in hele procenten vergelijken — voorkomt drijvende-kommaruis (0.5 vs 0.4999…9).
      truthy(
        `[T5 ${file}] ${label}: completion`,
        Math.round(mppTask.time.completion * 100) === Math.round(xmlTask.time.completion * 100),
      );
    }

    truthy(`[T5 ${file}] alle taken op naam gematcht met de ground truth (${matched}/${mppTasks.length})`, matched === mppTasks.length);

    const budget: FieldDiffBudget = FIELD_DIFF_BUDGET[file] ?? { start: 0, finish: 0, duration: 0, outlineDepth: 0, constraintDate: 0 };
    const budgetLabels: [keyof FieldDiffBudget, string][] = [
      ['start', 'start (dag-prefix)'],
      ['finish', 'finish (dag-prefix)'],
      ['duration', 'duur in dagen'],
      ['outlineDepth', 'outline-diepte'],
      ['constraintDate', 'constraintdatum (dag-prefix)'],
    ];
    for (const [category, categoryLabel] of budgetLabels) {
      truthy(
        `[T5 ${file}] veldafwijkingen "${categoryLabel}" binnen bekende basislijn (${fieldDiffCount[category]}/${budget[category]}, documentversieverschil — zie moduleheader)`,
        fieldDiffCount[category] <= budget[category],
      );
    }

    const totalFieldDiffs = fieldDiffCount.start + fieldDiffCount.finish + fieldDiffCount.duration + fieldDiffCount.outlineDepth + fieldDiffCount.constraintDate;
    console.log(`   . [T5 ${file}] ${matched}/${mppTasks.length} taken op naam gematcht; ${totalFieldDiffs} bekende veldafwijking(en) — start=${fieldDiffCount.start}/${budget.start} finish=${fieldDiffCount.finish}/${budget.finish} duur=${fieldDiffCount.duration}/${budget.duration} outline-diepte=${fieldDiffCount.outlineDepth}/${budget.outlineDepth} constraintdatum=${fieldDiffCount.constraintDate}/${budget.constraintDate}:`);
    for (const d of fieldDiagnostics) console.log(`      · ${d}`);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// UURMODUS (etappe 1.5) — gerichte discriminator-/durationMinutes-/workTime-assert voor
// "bijlage 7 Productie planning.mpp"
// ═══════════════════════════════════════════════════════════════════════════════════════════
//
// De T5-sectie hierboven bewijst al dat de VELDWAARDEN (start/finish/duur) binnen een gemeten
// budget overeenkomen; deze sectie bewijst apart de DISCRIMINATOR-UITKOMST zelf — het eigenlijke
// doel van etappe 1.5 ("een .mpp-urenproject gedraagt zich ná import identiek aan zijn
// MSPDI-export ná import: zelfde discriminator-uitkomst, zelfde velden gevuld"). Gemeten
// (2026-08-15, dit corpus): alle DRIE bestanden lezen op BEIDE kanten (readMPP ÉN readMSPDI van de
// bijbehorende `.mpp.xml`) 100% van hun taken in uur-modus (`durationMinutes` gezet) en hun
// projectkalender met `workTime` gezet — Bijlage 13 incluis, wat de oorspronkelijke aanname
// "Bijlage 13 blijft dag-modus" WEERLEGT (zie de moduleheader van `mppReader.ts`, "UURMODUS"):
// zelfs de bestaande, ONGEWIJZIGDE `readMSPDI` leest Bijlage 13's eigen MSPDI-ground-truth al als
// 51/51 taken in uur-modus — deze lezer moet dat spiegelen, niet tegenwerken. bijlage 7 is hier
// gekozen als de expliciet gevraagde gerichte case (grootste bestand, 215 taken).
if (corpusPresent) {
  const file = 'bijlage 7 Productie planning.mpp';
  if (corpusFiles.includes(file) && existsSync(join(CORPUS, `${file}.xml`))) {
    const mppResult = readMPP(new Uint8Array(readFileSync(join(CORPUS, file))));
    const xmlResult = readMSPDI(readFileSync(join(CORPUS, `${file}.xml`), 'utf-8'));

    truthy(`[uurmodus ${file}] mpp projectkalender.workTime gezet`, !!mppResult.calendar.workTime);
    truthy(`[uurmodus ${file}] MSPDI-ground-truth projectkalender.workTime gezet`, !!xmlResult.calendar.workTime);

    const mppHourCount = mppResult.tasks.filter((t) => t.time.durationMinutes != null).length;
    const xmlHourCount = xmlResult.tasks.filter((t) => t.time.durationMinutes != null).length;
    // Gemeten basislijn (2026-08-15): 215/215 op BEIDE kanten — EXACT (`===`).
    //
    // DRIFT-PIN, GEEN signaal-regressiepoort (uurmodus-review-correctie, R1): bijlage 7's
    // projectkalender deviëert al via discriminator (a)/(b) (eigen banden, lunchpauze-splitsing —
    // net als de crawl-corpuskalenders, zie `check-mpp-calendars.ts`'s T6-crawl-drift-pin), dus ELKE
    // taak op die kalender komt hier al in uur-modus terecht ONGEACHT het taak-(c)-signaal. Een
    // eerdere versie van dit commentaar beweerde dat een kapotte signaal-scan (bv. de scalar-vóór-
    // promotie-`hoursPerDay` per ongeluk niet meer gelezen) deze poort zou raken — DAT KLOPT NIET:
    // zo'n mutatie is hier onzichtbaar, om exact dezelfde reden als bij de crawl-drift-pin
    // (`promoteHourCalendar`'s `deviates || signaled`-disjunctie kortsluit al op `deviates`, dus de
    // signaalwaarde beslist daar niets meer zodra de kalender al via (a)/(b) promoveert). Deze
    // poort bewaakt de discriminator-UITKOMST-PARITEIT met MSPDI (het eigenlijke etappe-1.5-doel),
    // niet de (c)-signaal-implementatie
    // zelf — zie de synthetische fixtures verderop ("UURMODUS (etappe 1.5) — synthetische/corpusloze
    // end-to-end fixtures") voor een corpus-onafhankelijke, wél gerichte test van dat signaal.
    truthy(`[uurmodus ${file}] mpp: alle taken in uur-modus (${mppHourCount}/${mppResult.tasks.length})`, mppHourCount === mppResult.tasks.length);
    truthy(`[uurmodus ${file}] MSPDI-ground-truth: alle taken in uur-modus (${xmlHourCount}/${xmlResult.tasks.length})`, xmlHourCount === xmlResult.tasks.length);

    // Naam-gematchte vergelijking van durationMinutes (zelfde veld, zelfde discriminator-uitkomst
    // aan beide kanten) — budget-gedekt, spiegelt de T5-sectie's "duur in minuten"-budget (28,
    // hierboven) exact: dezelfde vergelijking, hier alleen apart benoemd zodat de discriminator-
    // pariteit zelf een expliciete, leesbare poort heeft i.p.v. verstopt in de generieke T5-lus.
    const xmlByName = new Map<string, Task[]>();
    for (const t of xmlResult.tasks) {
      const key = t.name.trim();
      const list = xmlByName.get(key);
      if (list) list.push(t);
      else xmlByName.set(key, [t]);
    }
    let durationMinutesMatches = 0;
    let durationMinutesCompared = 0;
    for (const mt of mppResult.tasks) {
      const queue = xmlByName.get(mt.name.trim());
      const xt = queue && queue.length > 0 ? queue.shift() : undefined;
      if (!xt || mt.time.durationMinutes == null || xt.time.durationMinutes == null) continue;
      durationMinutesCompared++;
      if (mt.time.durationMinutes === xt.time.durationMinutes) durationMinutesMatches++;
    }
    // Gemeten (2026-08-15): 215 vergeleken, 187 exact gelijk (28 afwijkend — het documentversie-
    // verschil, zie de T5-moduleheader) ⇒ budget 28 afwijkingen, spiegelt FIELD_DIFF_BUDGET.duration.
    const DURATION_MINUTES_DIFF_BUDGET = 28;
    truthy(
      `[uurmodus ${file}] durationMinutes naam-gematcht binnen budget (${durationMinutesCompared - durationMinutesMatches}/${DURATION_MINUTES_DIFF_BUDGET} afwijkingen op ${durationMinutesCompared} vergeleken)`,
      durationMinutesCompared - durationMinutesMatches <= DURATION_MINUTES_DIFF_BUDGET,
    );
    console.log(`   . [uurmodus ${file}] mpp ${mppHourCount}/${mppResult.tasks.length} uur-modus, xml ${xmlHourCount}/${xmlResult.tasks.length} uur-modus, durationMinutes ${durationMinutesMatches}/${durationMinutesCompared} exact gelijk`);
  } else {
    console.log(`OK  mpp-import: uurmodus-sectie (${file}) niet in dit corpus — overgeslagen`);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// T10 — DurationUnits (veld-id 181) → `durationType`, tegen `mpp14duration.mpp` (publieke
// MPXJ-junit-testdata, LGPL-2.1, geen bedrijfsbestand — mag met naam genoemd worden). Zelfde
// OPS_MPP_CRAWL-conventie als het T9-crawlblok hieronder (env-override + absoluut standaardpad +
// existsSync-guard + nette OK-skip), hier gericht op één met naam bekend bestand i.p.v. een map.
// ═══════════════════════════════════════════════════════════════════════════════════════════
//
// Bestandsinhoud (hardening-§7: verwachte waarden ONAFHANKELIJK van deze lezer afgeleid uit de
// MPXJ-bron, NIET "gemeten via readMPP"): het publieke MPXJ-fixturebestand draagt 10 taken —
// "Task 1".."Task 10" (letterlijke namen, geverifieerd tegen de ruwe bestandsinhoud) — 5 in
// WORKTIME en 5 in ELAPSEDTIME, paarsgewijs telkens "1 nominale eenheid" (minuten/uren/dagen/
// weken/maanden). De taken staan op een uur-kalender met project-`hoursPerDay` 8. `durationMinutes`
// is in BEIDE gevallen simpelweg `raw.durationRaw / 10` (MPP bewaart elke duur intern in TIENDEN
// VAN EEN MINUUT, ongeacht of de eenheid elapsed is — dat conversiefeit staat letterlijk in
// MPPUtility.java's eigen doc-commentaar, niet in deze lezer), dus de expliciete afleiding per paar:
//   Task 1/6  — minutes/elapsedMinutes:  1 min ×10 tienden/min           =    10 tienden → 1 min
//   Task 2/7  — hours/elapsedHours:      1 uur ×600 tienden/uur          =   600 tienden → 60 min
//   Task 3    — days (WORKTIME):         1 werkdag × (hoursPerDay×60×10 = 4800 tienden/werkdag @8u) = 4800 → 480 min
//   Task 8    — elapsedDays:             1 klokdag × 14400 tienden/klokdag (MPPUtility.getAdjustedDuration's
//                                         ELAPSED_DAYS-tak: vaste 24×600, GEEN hoursPerDay)          = 14400 → 1440 min
//   Task 4    — weeks (WORKTIME):        1 werkweek (5 werkdagen) × 4800                              = 24000 → 2400 min
//   Task 9    — elapsedWeeks:            1 klokweek × 100800 tienden/klokweek (ELAPSED_WEEKS-tak:
//                                         vaste 60×24×7×10, GEEN hoursPerDay)                         = 100800 → 10080 min
//   Task 5    — months (WORKTIME):       1 werkmaand (MPXJ-standaard 20 werkdagen) × 4800             = 96000 → 9600 min
//   Task 10   — elapsedMonths:           1 klokmaand × 432000 tienden/klokmaand (ELAPSED_MONTHS-tak:
//                                         vaste 60×24×30×10, GEEN hoursPerDay)                        = 432000 → 43200 min
// De ELAPSED-kant bewijst de conversievalkuil uit het plan: 1440/10080/43200 klopt alleen als de
// eenheden-decodering de vaste 24-uursdag gebruikt (de ELAPSED_DAYS/-WEEKS/-MONTHS-constanten
// hierboven, rechtstreeks uit MPPUtility.getAdjustedDuration) — een dubbele deling door
// `hoursPerDay` (8) zou hier 180/1260/5400 geven (14400/8, 100800/8, 432000/8 — de bug die Fixture
// 5 verderop synthetisch reproduceert en aan de kaak stelt).
// Mutatiebewijs: `durationType: raw.isElapsedDuration ? 'ELAPSEDTIME' : 'WORKTIME'` teruggezet naar
// het hardgecodeerde `'WORKTIME'` laat precies de 5 ELAPSEDTIME-asserts hieronder ROOD gaan.
{
  const DURATION_FIXTURE = process.env.OPS_MPP_DURATION_FIXTURE
    ?? '/home/nozzit/open-aec/voor claude/testdata-crawl/mpxj/junit/data/mpp14duration.mpp';
  if (!existsSync(DURATION_FIXTURE)) {
    console.log(`OK  mpp-import: T10 DurationUnits-leescase (${DURATION_FIXTURE}) niet aanwezig — overgeslagen`);
  } else {
    let result: ReturnType<typeof readMPP> | null = null;
    let threw: string | null = null;
    try {
      result = readMPP(new Uint8Array(readFileSync(DURATION_FIXTURE)));
    } catch (err) {
      threw = err instanceof Error ? err.message : String(err);
    }
    truthy(`[T10 mpp14duration] readMPP gooit niet (${threw ?? ''})`, threw === null);
    if (result) {
      truthy('[T10 mpp14duration] 10 taken', result.tasks.length === 10);
      const byName = new Map(result.tasks.map((t) => [t.name, t]));

      const worktimeCases: Array<[string, number]> = [
        ['Task 1', 1], ['Task 2', 60], ['Task 3', 480], ['Task 4', 2400], ['Task 5', 9600],
      ];
      for (const [name, expectedMinutes] of worktimeCases) {
        const t = byName.get(name);
        truthy(`[T10 mpp14duration] ${name} gevonden`, !!t);
        if (t) {
          truthy(`[T10 mpp14duration] ${name}.durationType === WORKTIME`, t.time.durationType === 'WORKTIME');
          truthy(`[T10 mpp14duration] ${name}.durationMinutes === ${expectedMinutes}`, t.time.durationMinutes === expectedMinutes);
        }
      }

      // De 5 ELAPSEDTIME-taken (elapsedMinutes/elapsedHours/elapsedDays/elapsedWeeks/elapsedMonths)
      // — dit is de daadwerkelijke T10-leescase; de mutatie hierboven raakt uitsluitend deze vijf.
      const elapsedCases: Array<[string, number]> = [
        ['Task 6', 1], ['Task 7', 60], ['Task 8', 1440], ['Task 9', 10080], ['Task 10', 43200],
      ];
      for (const [name, expectedMinutes] of elapsedCases) {
        const t = byName.get(name);
        truthy(`[T10 mpp14duration] ${name} gevonden`, !!t);
        if (t) {
          truthy(`[T10 mpp14duration] ${name}.durationType === ELAPSEDTIME`, t.time.durationType === 'ELAPSEDTIME');
          truthy(`[T10 mpp14duration] ${name}.durationMinutes === ${expectedMinutes} (klok-tijd, geen dubbele hoursPerDay-deling)`, t.time.durationMinutes === expectedMinutes);
        }
      }
      console.log(`   . [T10 mpp14duration] ${result.tasks.length} taken: 5 WORKTIME + 5 ELAPSEDTIME correct gedecodeerd`);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// T9-VOORTGANGSAFRONDING (MSP-pariteit-plan, 2026-08-15 — LET OP: niet te verwarren met de oudere
// "T9-crawl"-sectie verderop in dit bestand, die uit fase 3.8 etappe 1's eigen taaknummering komt
// en een ander onderwerp dekt). REMAINING_DURATION (fieldMap14.ts's `TaskFieldId.RemainingDuration`,
// veld-id 31, fixed-offset 52 — zelfde INT-vorm/eenhedenbron als SCHEDULED_DURATION) wordt nu
// rechtstreeks gelezen i.p.v. MSP's eigen restduur terug te rekenen uit het AFGERONDE opgeslagen
// `PercentComplete`. Bewijs waarom dat verschil telt: `(1 − completion) × totalDuration` rondt op de
// minuut/dag af, terwijl MSP's eigen `RemainingDuration` exact is — bij een niet-ronde
// voltooiingsbreuk (bv. 38%) geeft de afgeleide vorm een klokstand die MS Project zelf nooit toont.
//
// Corpus-leescase tegen `OzBuild Workshop 14 After Para 26.mpp` (publiek MSP2016-workshopmateriaal,
// crawl-wortel — mag met naam genoemd worden, zelfde OPS_MPP_*-conventie als de T10-sectie
// hierboven): taak "Identify Supplier Components" — een BLAD (`childIds.length === 0`), BEWUST
// GEEN samenvattingstaak (Opus-review M3: een eerdere versie van deze case verankerde op "Technical
// Specification", die 5 kinderen heeft — `remainingMinutes` op zo'n rollup-taak bereikt de solver
// NOOIT, exact dezelfde valkuil als de T13-attributiefout die dit hele plan aanzette. Alleen een
// BLAD-taak se `remainingMinutes` doet daadwerkelijk iets in `CPMSolver`'s voortgangstak). Completion
// 33% van 2880 durationMinutes. De AFGELEIDE vorm zou `Math.round(2880 × 0.67) = 1930` geven; MSP's
// eigen opgeslagen restduur is **1920** (4 werkdagen × 480 min/dag) — de twee vormen wijken hier
// expliciet af, dus deze taak bewijst dat de lezer daadwerkelijk het MPP-veld gebruikt en niet stil
// op de afgeleide vorm terugvalt (die zou toevallig ook een geldig getal zijn, alleen het VERKEERDE).
//
// Mutatiebewijs (zie het implementatierapport voor de exacte rode regel): `remainingDurationOffset`/
// het `remainingMinutes`/`remainingTime`-zetten in `mppReader.ts` weglaten laat
// `[T9-voortgangsafronding]`-assert "Identify Supplier Components.remainingMinutes === 1920" ROOD
// uitslaan (het veld wordt dan `undefined`, niet toevallig 1930 — dus geen vals-groene mutatie).
// ═══════════════════════════════════════════════════════════════════════════════════════════
{
  const REMAINING_FIXTURE = process.env.OPS_MPP_REMAINING_FIXTURE
    ?? '/home/nozzit/open-aec/voor claude/testdata-crawl/crawl-mpp/MSP2016_OzBuild/OzBuild Workshop 14 After Para 26.mpp';
  if (!existsSync(REMAINING_FIXTURE)) {
    console.log(`OK  mpp-import: T9-voortgangsafronding-leescase (${REMAINING_FIXTURE}) niet aanwezig — overgeslagen`);
  } else {
    let result: ReturnType<typeof readMPP> | null = null;
    let threw: string | null = null;
    try {
      result = readMPP(new Uint8Array(readFileSync(REMAINING_FIXTURE)));
    } catch (err) {
      threw = err instanceof Error ? err.message : String(err);
    }
    truthy(`[T9-voortgangsafronding] readMPP gooit niet (${threw ?? ''})`, threw === null);
    if (result) {
      const byName = new Map(result.tasks.map((t) => [t.name, t]));
      const identifySupplier = byName.get('Identify Supplier Components');
      truthy('[T9-voortgangsafronding] "Identify Supplier Components" gevonden', !!identifySupplier);
      if (identifySupplier) {
        truthy('[T9-voortgangsafronding] Identify Supplier Components is een BLAD (childIds.length === 0)', identifySupplier.childIds.length === 0);
        truthy('[T9-voortgangsafronding] Identify Supplier Components.completion === 0.33', Math.abs(identifySupplier.time.completion - 0.33) < 1e-9);
        truthy('[T9-voortgangsafronding] Identify Supplier Components.durationMinutes === 2880', identifySupplier.time.durationMinutes === 2880);
        truthy(
          `[T9-voortgangsafronding] Identify Supplier Components.remainingMinutes === 1920 (MSP's eigen restduur — de afgeleide vorm zou 1930 geven, kreeg ${identifySupplier.time.remainingMinutes})`,
          identifySupplier.time.remainingMinutes === 1920,
        );
      }
      console.log(`   . [T9-voortgangsafronding] REMAINING_DURATION correct gelezen (${result.tasks.length} taken totaal)`);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// T11 — `milestoneKind` afleiden bij import (§9/O6-vervolg): alleen voor `isMilestone`-taken in
// UUR-modus krijgt een anker dat EXACT op een bandeinde van de effectieve kalender ligt
// `milestoneKind: 'FINISH'`; exact op een bandbegin `'START'`; overal elders — incl. dag-modus en
// niet-mijlpalen — blijft het veld ONGEZET (huidig gedrag). Dit is de informatie die T6's
// solverkant (`succIsFinishMs`/`predEndsBeginOfDay` in `relationMath.ts`, commit `70ec7f92`) al
// consumeert maar tot deze taak nooit kreeg — géén lezer zette 'm nog.
//
// Twee lagen, spiegelt de T10-sectie hierboven:
//  1. SYNTHETISCH (`buildMilestoneKindFixture`) — draait ALTIJD, ook zonder corpus. Vier taken op
//     ÉÉN gedeelde uur-kalender (enkele band 08:00-16:00, ma-vr, geen lunchpauze — dezelfde vorm
//     als de UURMODUS-sectie hierboven) zodat promotie naar uur-modus uitsluitend van de
//     TAAK-(c)-signalen komt: een mijlpaal op het bandeinde (FINISH), een mijlpaal op het
//     bandbegin (START), een mijlpaal MIDDEN in de band (geen kind — "elders") en een
//     NIET-mijlpaal exact op hetzelfde bandeinde (nooit een kind, ongeacht de klokstand). Plus een
//     losse dag-modus-fixture (`buildDayModeMilestoneFixture`): een mijlpaal op de kalender se
//     EIGEN anker, kalender zelf niet-deviërend ⇒ blijft dag-modus ⇒ nooit een kind, ook al "ligt"
//     08:00 in klokterm op een bandgrens.
//  2. CORPUS-LEESCASE tegen `mpp14baseline.mpp` (publieke MPXJ-junit-testdata, LGPL-2.1, geen
//     bedrijfsbestand — mag met naam genoemd worden, zelfde OPS_MPP_*-conventie als de T10-sectie
//     hierboven): de mijlpaal "Complete" (MSP: `2006-09-14T17:00`) landt op déze kalender se eigen
//     lunch-band-eind (08:00-12:00/13:00-17:00 ⇒ bandeinde 17:00) en krijgt dus `'FINISH'`.
//
// Mutatiebewijs (zie het implementatierapport voor de exacte rode regels): de `deriveMilestoneKind`-
// aanroep in `mppReader.ts` weglaten (`milestoneKind` altijd `undefined` laten) laat zowel de
// synthetische FINISH-/START-asserts hieronder als de `mpp14baseline`-leescase ROOD uitslaan, en
// laat de relatieve corpus-fidelity-delta (T6+T11 samen) verdwijnen — zie het commitbericht.
// ═══════════════════════════════════════════════════════════════════════════════════════════
{
  const PASSWORD_FLAG_KEY = 893386752;
  const PROJECT_START_DATE_KEY = 37748738;
  const PROJECT_FINISH_DATE_KEY = 37748739;
  const TITLE_KEY = 37748744;
  const DEFAULT_CALENDAR_NAME_KEY = 37748750;

  function encodeUnicodeStringAscii(s: string): Uint8Array {
    const out = new Uint8Array(s.length * 2);
    const view = new DataView(out.buffer);
    for (let i = 0; i < s.length; i++) view.setUint16(i * 2, s.charCodeAt(i), true);
    return out;
  }

  /** Eén TBkndTask/FixedData-record (130 bytes, letterlijke default-offsets — zie de I4-/
   *  uurmodus-toelichting hierboven in dit bestand). */
  function buildMsTaskFixedDataRecord(opts: {
    uniqueId: number; id: number; durationRaw: number;
    startTime: number; startDays: number; finishTime: number; finishDays: number;
  }): Uint8Array {
    const out = new Uint8Array(130);
    const view = new DataView(out.buffer);
    view.setInt32(0, opts.uniqueId, true);
    view.setInt32(4, opts.id, true);
    view.setInt16(40, 1, true); // outlineLevel = 1
    view.setInt32(42, opts.durationRaw, true);
    view.setInt16(56, 0, true); // constraintType = 0 (ASAP)
    view.setUint16(64, opts.startTime, true);
    view.setUint16(66, opts.startDays, true);
    view.setUint16(68, opts.finishTime, true);
    view.setUint16(70, opts.finishDays, true);
    view.setInt32(118, -1, true); // geen taak-kalender-override — gebruik de projectkalender
    return out;
  }

  /** Milestone-bit: PROJECT2010_TASK_META_DATA_BIT_FLAGS (offset 8, mask 0x20) — deze fixture se
   *  CompObj-applicationName matcht `detectApplicationVersion`'s patroon niet, dus
   *  `milestoneBitFlag(null)` valt terug op de 2010-tabel (spiegelt de I4-toelichting). */
  function buildMsTaskFixedMetaRecord(offsetIntoFixedData: number, milestone: boolean): Uint8Array {
    const out = new Uint8Array(47);
    const view = new DataView(out.buffer);
    view.setInt32(4, offsetIntoFixedData, true);
    if (milestone) view.setInt32(8, 0x20, true);
    return out;
  }

  function buildFixedMetaBlob(items: Uint8Array[]): Uint8Array {
    const out = new Uint8Array(16 + items.length * 47);
    const view = new DataView(out.buffer);
    view.setUint32(0, 0xfadfadba, true);
    view.setInt32(8, items.length, true);
    items.forEach((item, i) => out.set(item, 16 + i * 47));
    return out;
  }

  // Enkele band 08:00-16:00 (480-960 min, 480 min = 8u), ma-vr, GEEN lunchpauze — dezelfde
  // kalendervorm als de UURMODUS-sectie hierboven, dus `canonicalizeBands.deviates === false` op
  // zichzelf: promotie kan hier UITSLUITEND van een taak-(c)-signaal komen.
  const SINGLE_BAND_8H_CAL_DAYS = [
    { defaultFlag: 0 as const }, // zo
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] }, // ma
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] }, // di
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] }, // wo
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] }, // do
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] }, // vr — dag 15000 (2025-01-24) valt hierop
    { defaultFlag: 0 as const }, // za
  ];

  interface MsTaskSpec {
    name: string; uniqueId: number; id: number; milestone: boolean; durationRaw: number;
    startTime: number; startDays: number; finishTime: number; finishDays: number;
  }

  /** Bouwt één compleet CFB-bestand met N taken op ÉÉN gedeelde kalender — spiegelt de UURMODUS-
   *  fixture hierboven, maar met meerdere taken i.p.v. één (nodig om de FINISH/START/geen-kind/
   *  nooit-voor-niet-mijlpaal-vergelijking op DEZELFDE kalenderpromotie te doen). */
  function buildMilestoneKindFixture(tasks: MsTaskSpec[], calendarDays = SINGLE_BAND_8H_CAL_DAYS): Uint8Array {
    const n = tasks.length;
    const dummy = buildMsTaskFixedMetaRecord(0, false);
    const metas = tasks.map((t, i) => buildMsTaskFixedMetaRecord((3 + i) * 130, t.milestone));
    const fixedMetaBlob = buildFixedMetaBlob([dummy, dummy, dummy, ...metas]);

    const fixedDataBlob = new Uint8Array((3 + n) * 130);
    tasks.forEach((t, i) => fixedDataBlob.set(buildMsTaskFixedDataRecord(t), (3 + i) * 130));

    let nameOffset = 0;
    const varMetaEntries: { uniqueId: number; type: number; offset: number }[] = [];
    const namePayloads: { offset: number; payload: Uint8Array }[] = [];
    for (const t of tasks) {
      varMetaEntries.push({ uniqueId: t.uniqueId, type: 14, offset: nameOffset });
      const payload = encodeUnicodeStringAscii(t.name);
      namePayloads.push({ offset: nameOffset, payload });
      nameOffset += 4 + payload.length;
    }
    const taskVarMetaBytes = buildVarMetaBytes(varMetaEntries);
    const taskVar2DataBuf = new Uint8Array(nameOffset);
    const taskVar2View = new DataView(taskVar2DataBuf.buffer);
    for (const { offset, payload } of namePayloads) {
      taskVar2View.setInt32(offset, payload.length, true);
      taskVar2DataBuf.set(payload, offset + 4);
    }

    const calendarName = 'T11 mijlpaal-fixture';
    const hoursBlock = buildCalHoursBlock(calendarDays);
    const calFixedMetaBlob = buildCalFixedMetaBlob([0]);
    const calFixedDataBlob = buildCalFixedDataRecord(1, 1, -1);
    const CAL_NAME_OFF = 0, CAL_DATA_OFF = 100;
    const calVarMetaBytes = buildVarMetaBytes([
      { uniqueId: 1, type: 1, offset: CAL_NAME_OFF },
      { uniqueId: 1, type: 8, offset: CAL_DATA_OFF },
    ]);
    const calVar2DataBuf = new Uint8Array(700);
    const calVar2View = new DataView(calVar2DataBuf.buffer);
    const writeCalVar2 = (offset: number, payload: Uint8Array) => {
      calVar2View.setInt32(offset, payload.length, true);
      calVar2DataBuf.set(payload, offset + 4);
    };
    writeCalVar2(CAL_NAME_OFF, encodeUnicodeStringAscii(calendarName));
    writeCalVar2(CAL_DATA_OFF, hoursBlock);

    const projectPropsBytes = encodePropsEntries([
      { key: PROJECT_START_DATE_KEY, data: timestampBytes(0, 15000) },
      { key: PROJECT_FINISH_DATE_KEY, data: timestampBytes(0, 15010) },
      { key: TITLE_KEY, data: encodeUnicodeStringAscii('T11-fixture') },
      { key: DEFAULT_CALENDAR_NAME_KEY, data: encodeUnicodeStringAscii(calendarName) },
    ]);

    const tree: Record<string, CfbTreeNode> = {
      '\x01CompObj': { data: encodeCompObjFileFormat('MSProject.MPP14') },
      Props14: { data: encodePropsSingleByteEntry(PASSWORD_FLAG_KEY, 0) },
      '   114': {
        children: {
          Props: { data: projectPropsBytes },
          TBkndTask: {
            children: {
              FixedMeta: { data: fixedMetaBlob },
              FixedData: { data: fixedDataBlob },
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
    return buildNestedCfb(tree);
  }

  // ── Fixture A t/m D: vier taken, dag 15000 (vrijdag 2025-01-24, een werkdag op deze kalender),
  // allemaal duur 0 (mijlpalen dragen geen duur) behalve waar expliciet anders. Tijd-eenheid is
  // tienden-van-minuut (spiegelt `getTimestamp`: `time*6000ms` = 0,1 min/eenheid), dus 08:00 = 4800,
  // 12:00 = 7200, 16:00 = 9600. ────────────────────────────────────────────────────────────────
  {
    const bytes = buildMilestoneKindFixture([
      { name: 'MilestoneBandEnd', uniqueId: 10, id: 1, milestone: true, durationRaw: 0, startTime: 9600, startDays: 15000, finishTime: 9600, finishDays: 15000 },
      { name: 'MilestoneBandStart', uniqueId: 11, id: 2, milestone: true, durationRaw: 0, startTime: 4800, startDays: 15000, finishTime: 4800, finishDays: 15000 },
      { name: 'MilestoneMidBand', uniqueId: 12, id: 3, milestone: true, durationRaw: 0, startTime: 7200, startDays: 15000, finishTime: 7200, finishDays: 15000 },
      { name: 'NonMilestoneBandEnd', uniqueId: 13, id: 4, milestone: false, durationRaw: 0, startTime: 9600, startDays: 15000, finishTime: 9600, finishDays: 15000 },
      // T15 (mijlpaal-met-duur, §9/O1): MSP staat `isMilestone=true` mét een reële duur toe
      // (bewezen op mpp14task.mpp/taskFlags-mpp14Project2010/2013.mpp) — de vlag blijft dan
      // een WEERGAVEmarkering, geen scheduling-signaal. Zelfde anker als MilestoneBandEnd
      // (bandeinde 16:00) maar met `durationRaw = 4800` (480 minuten = 8u = één volle werkdag
      // op deze kalender): `milestoneKind` mag NIET afgeleid worden — anders zou een latere
      // opvolger via `snapSuccessorEarlyStart` de FINISH-mijlpaal-landing toepassen op een taak
      // die voor de planning helemaal geen mijlpaal is.
      { name: 'MilestoneWithDurationBandEnd', uniqueId: 14, id: 5, milestone: true, durationRaw: 4800, startTime: 9600, startDays: 15000, finishTime: 9600, finishDays: 15000 },
    ]);
    let result: ReturnType<typeof readMPP> | null = null;
    let threw: string | null = null;
    try {
      result = readMPP(bytes);
    } catch (err) {
      threw = err instanceof Error ? err.message : String(err);
    }
    truthy(`[T11 synthetisch] readMPP gooit niet (${threw ?? ''})`, threw === null);
    if (result) {
      truthy('[T11 synthetisch] 5 taken', result.tasks.length === 5);
      truthy('[T11 synthetisch] projectkalender in uur-modus (workTime gezet)', !!result.calendar.workTime);
      const byName = new Map(result.tasks.map((t) => [t.name, t]));
      const bandEnd = byName.get('MilestoneBandEnd');
      const bandStart = byName.get('MilestoneBandStart');
      const midBand = byName.get('MilestoneMidBand');
      const nonMilestone = byName.get('NonMilestoneBandEnd');
      const msWithDuration = byName.get('MilestoneWithDurationBandEnd');
      truthy('[T11 synthetisch] alle vijf taken gevonden', !!bandEnd && !!bandStart && !!midBand && !!nonMilestone && !!msWithDuration);
      if (bandEnd) truthy('[T11 synthetisch] anker exact op bandeinde (16:00) ⇒ milestoneKind === FINISH', bandEnd.milestoneKind === 'FINISH');
      if (bandStart) truthy('[T11 synthetisch] anker exact op bandbegin (08:00) ⇒ milestoneKind === START', bandStart.milestoneKind === 'START');
      if (midBand) truthy('[T11 synthetisch] anker midden in de band (12:00) ⇒ GEEN milestoneKind ("elders")', midBand.milestoneKind === undefined);
      if (nonMilestone) {
        truthy('[T11 synthetisch] niet-mijlpaal blijft isMilestone === false', nonMilestone.isMilestone === false);
        truthy('[T11 synthetisch] niet-mijlpaal krijgt NOOIT een milestoneKind, ook op een bandeinde', nonMilestone.milestoneKind === undefined);
      }
      if (msWithDuration) {
        truthy('[T15 synthetisch] mijlpaal-met-duur blijft isMilestone === true (weergavevlag, MSP-getrouw)', msWithDuration.isMilestone === true);
        truthy('[T15 synthetisch] mijlpaal-met-duur krijgt GEEN milestoneKind, ondanks bandeinde-anker (durationRaw ≠ 0)', msWithDuration.milestoneKind === undefined);
        truthy('[T15 synthetisch] mijlpaal-met-duur behoudt haar eigen duur (8u ⇒ scheduleDuration 1)', Math.abs(msWithDuration.time.scheduleDuration - 1) < 1e-9);
      }
    }
  }

  // ── Fixture E: dag-modus-controlecase — kalender zelf niet-deviërend, mijlpaal exact op de
  // kalender se EIGEN anker (08:00, `mppAnchorClock`) ⇒ geen datumsignaal, duur 0 ⇒ geen
  // duursignaal ⇒ het bestand blijft GEHEEL dag-modus. Bewijst "dagmodus ⇒ nooit een kind" los van
  // de mutatie-redenering (die alleen aantoont dat uur-modus-bestanden verslechteren). ──────────
  {
    const bytes = buildMilestoneKindFixture([
      { name: 'DayModeMilestone', uniqueId: 10, id: 1, milestone: true, durationRaw: 0, startTime: 4800, startDays: 15000, finishTime: 4800, finishDays: 15000 },
    ]);
    let result: ReturnType<typeof readMPP> | null = null;
    let threw: string | null = null;
    try {
      result = readMPP(bytes);
    } catch (err) {
      threw = err instanceof Error ? err.message : String(err);
    }
    truthy(`[T11 dagmodus] readMPP gooit niet (${threw ?? ''})`, threw === null);
    if (result) {
      truthy('[T11 dagmodus] 1 taak', result.tasks.length === 1);
      truthy('[T11 dagmodus] projectkalender.workTime NIET gezet (dag-modus)', !result.calendar.workTime);
      const task = result.tasks[0];
      truthy('[T11 dagmodus] taak is mijlpaal', task?.isMilestone === true);
      truthy('[T11 dagmodus] GEEN milestoneKind (afleiding geldt alleen in uur-modus)', task?.milestoneKind === undefined);
    }
  }

  // ── Fixture F (spec-review-bevinding op fb385191): een band die EXACT om middernacht eindigt
  // (`end === 1440`, bv. een ploegendienst 20:00-24:00 — `resolveOneDay` bouwt zo'n band zonder
  // clamp en `canonicalizeBands` beschouwt 'm niet als afwijkend; dit is dus een volstrekt normale
  // vorm, geen theoretisch randgeval) moet de VOLGENDE kalenderdag om 00:00 nog steeds als
  // bandeinde herkennen. Maandag draagt TWEE banden (08:00-16:00 + 20:00-24:00, dus discriminator
  // (a) alleen al garandeert promotie, los van de exact-1440-vraag die deze case toetst); de
  // mijlpaal-anker staat op dinsdag 00:00 — geen enkele band op dinsdag zelf matcht (die begint pas
  // om 08:00), dus dit bewijst specifiek de GISTEREN-tak (`yesterdays`) van `deriveMilestoneKind`
  // met een niet-strikte grens. Mutatiebewijs: `b.end >= 1440` terug naar `b.end > 1440` laat
  // precies deze assert rood uitslaan (de eerdere, STRIKTE grens miste dit exacte-middernacht-geval
  // — een reviewer-reproductie op fb385191, bevestigd vóór de fix). ─────────────────────────────
  {
    const WRAP_MIDNIGHT_CAL_DAYS = [
      { defaultFlag: 0 as const }, // zo
      { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }, { startMinutes: 1200, durationMinutes: 240 }] }, // ma: 08:00-16:00 + late ploeg 20:00-24:00
      { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] }, // di — dag 15004 (2025-01-28) valt hierop
      { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] }, // wo
      { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] }, // do
      { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] }, // vr
      { defaultFlag: 0 as const }, // za
    ];
    const bytes = buildMilestoneKindFixture(
      [{ name: 'MilestoneAfterMidnightWrap', uniqueId: 10, id: 1, milestone: true, durationRaw: 0, startTime: 0, startDays: 15004, finishTime: 0, finishDays: 15004 }],
      WRAP_MIDNIGHT_CAL_DAYS,
    );
    let result: ReturnType<typeof readMPP> | null = null;
    let threw: string | null = null;
    try {
      result = readMPP(bytes);
    } catch (err) {
      threw = err instanceof Error ? err.message : String(err);
    }
    truthy(`[T11 wrap-middernacht] readMPP gooit niet (${threw ?? ''})`, threw === null);
    if (result) {
      truthy('[T11 wrap-middernacht] 1 taak', result.tasks.length === 1);
      truthy('[T11 wrap-middernacht] projectkalender in uur-modus (maandag: 2 banden, discriminator a)', !!result.calendar.workTime);
      const task = result.tasks[0];
      truthy(
        `[T11 wrap-middernacht] anker di 00:00 na een ma 20:00-24:00-band ⇒ milestoneKind === FINISH (kreeg ${task?.milestoneKind})`,
        task?.milestoneKind === 'FINISH',
      );
    }
  }

  // ── Corpus-leescase: `mpp14baseline.mpp` (publieke MPXJ-junit-testdata). Kalender: ma-vr
  // 08:00-12:00/13:00-17:00 (lunchpauze — twee banden per werkdag, dus discriminator (a) vuurt al
  // vanuit de kalender zelf, onafhankelijk van enig taak-signaal). Mijlpaal "Complete" landt op
  // `2006-09-14T17:00` — exact het bandeinde van de tweede band ⇒ `'FINISH'` (empirisch geverifieerd
  // tegen déze lezer vóór het schrijven van deze assert, spiegelt de T10-sectie se werkwijze). ────
  {
    const BASELINE_FIXTURE = process.env.OPS_MPP_BASELINE_FIXTURE
      ?? '/home/nozzit/open-aec/voor claude/testdata-crawl/mpxj/junit/data/mpp14baseline.mpp';
    if (!existsSync(BASELINE_FIXTURE)) {
      console.log(`OK  mpp-import: T11 mpp14baseline-leescase (${BASELINE_FIXTURE}) niet aanwezig — overgeslagen`);
    } else {
      let result: ReturnType<typeof readMPP> | null = null;
      let threw: string | null = null;
      try {
        result = readMPP(new Uint8Array(readFileSync(BASELINE_FIXTURE)));
      } catch (err) {
        threw = err instanceof Error ? err.message : String(err);
      }
      truthy(`[T11 mpp14baseline] readMPP gooit niet (${threw ?? ''})`, threw === null);
      if (result) {
        truthy('[T11 mpp14baseline] projectkalender in uur-modus', !!result.calendar.workTime);
        const complete = result.tasks.find((t) => t.name === 'Complete');
        truthy('[T11 mpp14baseline] mijlpaal "Complete" gevonden', !!complete);
        if (complete) {
          truthy('[T11 mpp14baseline] "Complete".isMilestone === true', complete.isMilestone === true);
          truthy(
            `[T11 mpp14baseline] "Complete".milestoneKind === FINISH (anker ${complete.time.scheduleFinish}, kreeg ${complete.milestoneKind})`,
            complete.milestoneKind === 'FINISH',
          );
        }
        console.log('   . [T11 mpp14baseline] mijlpaal "Complete" correct als FINISH gelezen');
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// T12 — Split-/leveling-detectie (§9/O1, "resource-gedreven planning"): het EXPLICIETE signaal
// (LEVELING_DELAY ≠ 0) en het AFGELEIDE signaal (`spanGt`: het MSP-eigen venster tussen start en
// finish, geteld in werkminuten op de effectieve kalender, is groter dan de MSP-eigen opgeslagen
// duur). Synthetische fixture, onafhankelijk van het corpus — spiegelt de T11-fixtureopzet
// (`buildMilestoneKindFixture` hierboven), maar met een ECHTE `TASK_FIELD_MAP`: alle basisvelden
// op hun letterlijke `DEFAULT_TASK_FIELDS`-offset (de FixedData-layout blijft dus identiek aan de
// andere fixtures in dit bestand), plus één NIEUWE entry voor LEVELING_DELAY@126 — dat veld heeft
// bewust geen plek in de all-or-nothing-defaulttabel (zie mppReader.ts's toelichting bij
// `TASK_FIELD_LEVELING_DELAY`), dus deze fixture moet 'm zelf meegeven via een data-gedreven map.
// ═══════════════════════════════════════════════════════════════════════════════════════════
{
  const PASSWORD_FLAG_KEY = 893386752;
  const PROJECT_START_DATE_KEY = 37748738;
  const PROJECT_FINISH_DATE_KEY = 37748739;
  const TITLE_KEY = 37748744;
  const DEFAULT_CALENDAR_NAME_KEY = 37748750;
  const PROPSKEY_TASK_FIELD_MAP_T12 = 131092;
  const LEVELING_DELAY_TYPE_VALUE = 20; // TaskField.LEVELING_DELAY (FieldMap14.java)
  const LEVELING_DELAY_OFFSET = 126; // vrij in de 130-byte FixedData-layout (ná Deadline@122)

  function encodeUnicodeStringAscii(s: string): Uint8Array {
    const out = new Uint8Array(s.length * 2);
    const view = new DataView(out.buffer);
    for (let i = 0; i < s.length; i++) view.setUint16(i * 2, s.charCodeAt(i), true);
    return out;
  }

  interface T12TaskSpec {
    name: string; uniqueId: number; id: number; durationRaw: number;
    startTime: number; startDays: number; finishTime: number; finishDays: number;
    levelingDelayRaw?: number;
  }

  /** Eén TBkndTask/FixedData-record (130 bytes, letterlijke `DEFAULT_TASK_FIELDS`-offsets, zie de
   *  I4-/T11-toelichting elders in dit bestand), plus LEVELING_DELAY@126. Tijd-/duur-eenheid is
   *  tienden-van-minuut (08:00 = 4800, 16:00 = 9600 — spiegelt `getTimestamp`). */
  function buildT12TaskFixedDataRecord(t: T12TaskSpec): Uint8Array {
    const out = new Uint8Array(130);
    const view = new DataView(out.buffer);
    view.setInt32(0, t.uniqueId, true);
    view.setInt32(4, t.id, true);
    view.setInt16(40, 1, true); // outlineLevel = 1
    view.setInt32(42, t.durationRaw, true);
    view.setInt16(46, 7, true); // durationUnits = 7 ("days", WORKTIME — geen elapsed)
    view.setInt16(56, 0, true); // constraintType = 0 (ASAP)
    view.setUint16(64, t.startTime, true);
    view.setUint16(66, t.startDays, true);
    view.setUint16(68, t.finishTime, true);
    view.setUint16(70, t.finishDays, true);
    view.setInt32(118, -1, true); // geen taak-kalender-override — gebruik de projectkalender
    view.setInt32(LEVELING_DELAY_OFFSET, t.levelingDelayRaw ?? 0, true);
    return out;
  }

  function buildT12TaskFixedMetaRecord(offsetIntoFixedData: number): Uint8Array {
    const out = new Uint8Array(47);
    const view = new DataView(out.buffer);
    view.setInt32(4, offsetIntoFixedData, true);
    return out; // geen mijlpalen nodig in deze fixture
  }

  function buildT12FixedMetaBlob(items: Uint8Array[]): Uint8Array {
    const out = new Uint8Array(16 + items.length * 47);
    const view = new DataView(out.buffer);
    view.setUint32(0, 0xfadfadba, true);
    view.setInt32(8, items.length, true);
    items.forEach((item, i) => out.set(item, 16 + i * 47));
    return out;
  }

  // Enkele band 08:00-16:00, ma-vr, za/zo vrij — dag 15000 = vrijdag 2025-01-24 (spiegelt de
  // T11-fixture hierboven exact, inclusief de dagnummering: za 15001, zo 15002, ma 15003).
  const T12_CAL_DAYS = [
    { defaultFlag: 0 as const }, // zo
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] }, // ma — dag 15003
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] }, // di
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] }, // wo
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] }, // do
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] }, // vr — dag 15000
    { defaultFlag: 0 as const }, // za — dag 15001
  ];

  function buildT12Fixture(tasks: T12TaskSpec[]): Uint8Array {
    const n = tasks.length;
    const dummy = buildT12TaskFixedMetaRecord(0);
    const metas = tasks.map((_t, i) => buildT12TaskFixedMetaRecord((3 + i) * 130));
    const fixedMetaBlob = buildT12FixedMetaBlob([dummy, dummy, dummy, ...metas]);

    const fixedDataBlob = new Uint8Array((3 + n) * 130);
    tasks.forEach((t, i) => fixedDataBlob.set(buildT12TaskFixedDataRecord(t), (3 + i) * 130));

    let nameOffset = 0;
    const varMetaEntries: { uniqueId: number; type: number; offset: number }[] = [];
    const namePayloads: { offset: number; payload: Uint8Array }[] = [];
    for (const t of tasks) {
      varMetaEntries.push({ uniqueId: t.uniqueId, type: TaskFieldId.Name, offset: nameOffset });
      const payload = encodeUnicodeStringAscii(t.name);
      namePayloads.push({ offset: nameOffset, payload });
      nameOffset += 4 + payload.length;
    }
    const taskVarMetaBytes = buildVarMetaBytes(varMetaEntries);
    const taskVar2DataBuf = new Uint8Array(Math.max(nameOffset, 1));
    const taskVar2View = new DataView(taskVar2DataBuf.buffer);
    for (const { offset, payload } of namePayloads) {
      taskVar2View.setInt32(offset, payload.length, true);
      taskVar2DataBuf.set(payload, offset + 4);
    }

    const fieldMapBytes = buildFieldMapEntryBytes([
      { typeValue: TaskFieldId.UniqueId, dataBlockOffset: 0, category: 3 },
      { typeValue: TaskFieldId.Id, dataBlockOffset: 4, category: 3 },
      { typeValue: TaskFieldId.OutlineLevel, dataBlockOffset: 40, category: 3 },
      { typeValue: TaskFieldId.ScheduledDuration, dataBlockOffset: 42, category: 3 },
      { typeValue: TaskFieldId.DurationUnits, dataBlockOffset: 46, category: 3 },
      { typeValue: TaskFieldId.ConstraintType, dataBlockOffset: 56, category: 3 },
      { typeValue: TaskFieldId.ScheduledStart, dataBlockOffset: 64, category: 3 },
      { typeValue: TaskFieldId.ScheduledFinish, dataBlockOffset: 68, category: 3 },
      { typeValue: TaskFieldId.ActualStart, dataBlockOffset: 72, category: 3 },
      { typeValue: TaskFieldId.ActualFinish, dataBlockOffset: 76, category: 3 },
      { typeValue: TaskFieldId.ConstraintDate, dataBlockOffset: 80, category: 3 },
      { typeValue: TaskFieldId.PercentComplete, dataBlockOffset: 90, category: 3 },
      { typeValue: TaskFieldId.CalendarUniqueId, dataBlockOffset: 118, category: 3 },
      { typeValue: TaskFieldId.Deadline, dataBlockOffset: 122, category: 3 },
      { typeValue: LEVELING_DELAY_TYPE_VALUE, dataBlockOffset: LEVELING_DELAY_OFFSET, category: 3 },
      { typeValue: TaskFieldId.Name, dataBlockOffset: 65535, category: 8 },
    ]);

    const calendarName = 'T12 span-fixture';
    const hoursBlock = buildCalHoursBlock(T12_CAL_DAYS);
    const calFixedMetaBlob = buildCalFixedMetaBlob([0]);
    const calFixedDataBlob = buildCalFixedDataRecord(1, 1, -1);
    const CAL_NAME_OFF = 0, CAL_DATA_OFF = 100;
    const calVarMetaBytes = buildVarMetaBytes([
      { uniqueId: 1, type: 1, offset: CAL_NAME_OFF },
      { uniqueId: 1, type: 8, offset: CAL_DATA_OFF },
    ]);
    const calVar2DataBuf = new Uint8Array(700);
    const calVar2View = new DataView(calVar2DataBuf.buffer);
    const writeCalVar2 = (offset: number, payload: Uint8Array) => {
      calVar2View.setInt32(offset, payload.length, true);
      calVar2DataBuf.set(payload, offset + 4);
    };
    writeCalVar2(CAL_NAME_OFF, encodeUnicodeStringAscii(calendarName));
    writeCalVar2(CAL_DATA_OFF, hoursBlock);

    const projectPropsBytes = encodePropsEntries([
      { key: PROJECT_START_DATE_KEY, data: timestampBytes(0, 15000) },
      { key: PROJECT_FINISH_DATE_KEY, data: timestampBytes(0, 15010) },
      { key: TITLE_KEY, data: encodeUnicodeStringAscii('T12-fixture') },
      { key: DEFAULT_CALENDAR_NAME_KEY, data: encodeUnicodeStringAscii(calendarName) },
      { key: PROPSKEY_TASK_FIELD_MAP_T12, data: fieldMapBytes },
    ]);

    const tree: Record<string, CfbTreeNode> = {
      '\x01CompObj': { data: encodeCompObjFileFormat('MSProject.MPP14') },
      Props14: { data: encodePropsSingleByteEntry(PASSWORD_FLAG_KEY, 0) },
      '   114': {
        children: {
          Props: { data: projectPropsBytes },
          TBkndTask: {
            children: {
              FixedMeta: { data: fixedMetaBlob },
              FixedData: { data: fixedDataBlob },
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
    return buildNestedCfb(tree);
  }

  const readT12 = (bytes: Uint8Array) => {
    let result: ReturnType<typeof readMPP> | null = null;
    let threw: string | null = null;
    try {
      result = readMPP(bytes);
    } catch (err) {
      threw = err instanceof Error ? err.message : String(err);
    }
    return { result, threw };
  };

  // ── Negatieve fixture: één schone taak (geen leveling delay, geen gat tussen venster en duur) —
  // GEEN `sourceScheduleNotes` op het `ImportResult` (het veld ontbreekt volledig, niet `total: 0`
  // — zie mppReader.ts's `readMPP`-toelichting). ────────────────────────────────────────────────
  {
    const { result, threw } = readT12(buildT12Fixture([
      { name: 'Clean', uniqueId: 10, id: 1, durationRaw: 4800, startTime: 4800, startDays: 15000, finishTime: 9600, finishDays: 15000 },
    ]));
    truthy(`[T12 schoon] readMPP gooit niet (${threw ?? ''})`, threw === null);
    if (result) {
      truthy('[T12 schoon] 1 taak', result.tasks.length === 1);
      truthy('[T12 schoon] GEEN sourceScheduleNotes (negatieve case)', result.sourceScheduleNotes === undefined);
    }
  }

  // ── Expliciet signaal: LEVELING_DELAY ≠ 0, venster == duur (geen spanGt). ───────────────────────
  {
    const { result, threw } = readT12(buildT12Fixture([
      { name: 'Leveled', uniqueId: 10, id: 1, durationRaw: 4800, startTime: 4800, startDays: 15000, finishTime: 9600, finishDays: 15000, levelingDelayRaw: 100 },
    ]));
    truthy(`[T12 leveled] readMPP gooit niet (${threw ?? ''})`, threw === null);
    if (result) {
      truthy(
        `[T12 leveled] sourceScheduleNotes === {total:1, leveled:1, spanGt:0} (kreeg ${JSON.stringify(result.sourceScheduleNotes)})`,
        result.sourceScheduleNotes?.total === 1 && result.sourceScheduleNotes.leveled === 1 && result.sourceScheduleNotes.spanGt === 0,
      );
    }
  }

  // ── Afgeleid signaal: venster (vr 08:00 → ma 16:00, over een weekend) > duur (8u), GEEN
  // leveling delay. Bewijst dat `spanGt` op zichzelf al telt, los van het expliciete signaal. ─────
  {
    const { result, threw } = readT12(buildT12Fixture([
      { name: 'SpanGt', uniqueId: 10, id: 1, durationRaw: 4800, startTime: 4800, startDays: 15000, finishTime: 9600, finishDays: 15003 },
    ]));
    truthy(`[T12 spanGt] readMPP gooit niet (${threw ?? ''})`, threw === null);
    if (result) {
      truthy(
        `[T12 spanGt] sourceScheduleNotes === {total:1, leveled:0, spanGt:1} (kreeg ${JSON.stringify(result.sourceScheduleNotes)})`,
        result.sourceScheduleNotes?.total === 1 && result.sourceScheduleNotes.leveled === 0 && result.sourceScheduleNotes.spanGt === 1,
      );
    }
  }

  // ── Vereniging: één taak met BEIDE signalen (leveling delay ÉN een groter venster) telt in
  // `total` maar ÉÉN keer, naast een schone taak die niet meetelt — bewijst dat `total` de
  // VERENIGING is, geen som van `leveled + spanGt`. ───────────────────────────────────────────────
  {
    const { result, threw } = readT12(buildT12Fixture([
      { name: 'Both', uniqueId: 10, id: 1, durationRaw: 4800, startTime: 4800, startDays: 15000, finishTime: 9600, finishDays: 15003, levelingDelayRaw: 50 },
      { name: 'Clean2', uniqueId: 11, id: 2, durationRaw: 4800, startTime: 4800, startDays: 15000, finishTime: 9600, finishDays: 15000 },
    ]));
    truthy(`[T12 vereniging] readMPP gooit niet (${threw ?? ''})`, threw === null);
    if (result) {
      truthy('[T12 vereniging] 2 taken', result.tasks.length === 2);
      truthy(
        `[T12 vereniging] sourceScheduleNotes === {total:1, leveled:1, spanGt:1} (kreeg ${JSON.stringify(result.sourceScheduleNotes)})`,
        result.sourceScheduleNotes?.total === 1 && result.sourceScheduleNotes.leveled === 1 && result.sourceScheduleNotes.spanGt === 1,
      );
    }
  }

  // ── Corpus-leescases: gepinde detectie-aantallen per bestand (acceptatiepunt 5, plan-§T12).
  // "Bijlage 13 Productieplanning.mpp" is tevens de door de orkestrator aangewezen NEGATIEVE case
  // (acceptatiepunt 4): spanGt = 0, dus geen `sourceScheduleNotes` op een schoon bestand. ─────────
  {
    const T12_CORPUS = process.env.OPS_MPP_CORPUS
      ?? '/home/nozzit/open-aec/voor claude/test bestanden voor file implementation';
    const bijlage13 = join(T12_CORPUS, 'Bijlage 13 Productieplanning.mpp');
    if (!existsSync(bijlage13)) {
      console.log(`OK  mpp-import: T12 corpus-leescases (${T12_CORPUS}) niet aanwezig — overgeslagen`);
    } else {
      {
        const { result, threw } = readT12(new Uint8Array(readFileSync(bijlage13)));
        truthy(`[T12 Bijlage 13] readMPP gooit niet (${threw ?? ''})`, threw === null);
        if (result) {
          truthy(
            '[T12 Bijlage 13] GEEN sourceScheduleNotes — negatieve case (acceptatiepunt 4, plan-§T12)',
            result.sourceScheduleNotes === undefined,
          );
        }
      }
      // "Bijlage 20 productieplanning PKB.mpp" (gemeten, geen enkel signaal): ook hier GEEN
      // `sourceScheduleNotes` — een tweede, groter (134 taken) negatief bewijs naast Bijlage 13.
      const bijlage20 = join(T12_CORPUS, 'Bijlage 20 productieplanning PKB.mpp');
      if (existsSync(bijlage20)) {
        const { result, threw } = readT12(new Uint8Array(readFileSync(bijlage20)));
        truthy(`[T12 Bijlage 20] readMPP gooit niet (${threw ?? ''})`, threw === null);
        if (result) {
          truthy(
            '[T12 Bijlage 20] GEEN sourceScheduleNotes (gemeten: geen signaal op 134 taken)',
            result.sourceScheduleNotes === undefined,
          );
        }
      }
      // "bijlage 7 Productie planning.mpp" (215 taken): het enige bestand van de drie met
      // daadwerkelijk LEVELING_DELAY-data in het bronbestand — steekproef bevestigd tegen de
      // taaknamen (productiehandelingen als "boren en tappen", "lassen", vertragingen van
      // ~1000-1400 min, plausibel voor een resource-beperkte productieplanning).
      const bijlage7 = join(T12_CORPUS, 'bijlage 7 Productie planning.mpp');
      if (existsSync(bijlage7)) {
        const { result, threw } = readT12(new Uint8Array(readFileSync(bijlage7)));
        truthy(`[T12 bijlage 7] readMPP gooit niet (${threw ?? ''})`, threw === null);
        if (result) {
          truthy(
            `[T12 bijlage 7] sourceScheduleNotes === {total:15, leveled:10, spanGt:5} (gepind, kreeg ${JSON.stringify(result.sourceScheduleNotes)})`,
            result.sourceScheduleNotes?.total === 15 && result.sourceScheduleNotes.leveled === 10 && result.sourceScheduleNotes.spanGt === 5,
          );
        }
      }
    }
  }

  // ── Corpus-leescase: `mpp14resource.mpp` (publieke MPXJ-junit-testdata — leesbare naam toegestaan,
  // plan §6) — spec-review-fixronde 2026-08-15, bevinding 1. Dit is MPXJ's EIGEN referentiebestand
  // voor resource-contouring ("Contoured Task", assignment-uniqueID 8): de moduleheader hierboven
  // (punt 3 bij `TASK_FIELD_LEVELING_DELAY`) documenteert waarom het assignment-eigen WORK_CONTOUR-
  // bit — GETOETST op precies dit bestand — niet betrouwbaar bleek en dus NIET geïmplementeerd is.
  // Deze leescase pint het GEKOZEN (eerlijke) gedrag: "Contoured Task" heeft venster == duur (geen
  // spanGt, geen leveling delay) en blijft dus ONGEMELD — een KNOWN GAP, geen stille belofte. ────
  {
    const RESOURCE_FIXTURE = process.env.OPS_MPP_RESOURCE_FIXTURE
      ?? '/home/nozzit/open-aec/voor claude/testdata-crawl/mpxj/junit/data/mpp14resource.mpp';
    if (!existsSync(RESOURCE_FIXTURE)) {
      console.log(`OK  mpp-import: T12 mpp14resource-leescase (${RESOURCE_FIXTURE}) niet aanwezig — overgeslagen`);
    } else {
      const { result, threw } = readT12(new Uint8Array(readFileSync(RESOURCE_FIXTURE)));
      truthy(`[T12 mpp14resource] readMPP gooit niet (${threw ?? ''})`, threw === null);
      if (result) {
        truthy('[T12 mpp14resource] 3 taken (Task A, Contoured Task, Completed Task)', result.tasks.length === 3);
        const contoured = result.tasks.find((t) => t.name === 'Contoured Task');
        truthy('[T12 mpp14resource] "Contoured Task" gevonden', !!contoured);
        if (contoured) {
          // Reviewer-meting: venster == duur == 3428 min (7,1417 dagen @ 480 min/dag) — GEEN spanGt.
          truthy(
            `[T12 mpp14resource] "Contoured Task".scheduleDuration ≈ 3428 min (7,1417 dagen @ 480 min/dag, kreeg ${contoured.time.scheduleDuration})`,
            Math.abs(contoured.time.scheduleDuration - 3428 / 480) < 0.01,
          );
        }
        // KNOWN GAP, expliciet gepind (geen stille regressie mogen worden — zie de moduleheader):
        // resource-contouring-ALLEEN triggert geen enkel huidig signaal, dus GEEN sourceScheduleNotes.
        truthy(
          `[T12 mpp14resource] GEEN sourceScheduleNotes ondanks resource-contouring — bekende, gedocumenteerde beperking (kreeg ${JSON.stringify(result.sourceScheduleNotes)})`,
          result.sourceScheduleNotes === undefined,
        );
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// Z2 (etappe "nul afwijkingen") — Fixed2-infrastructuur in de lezer: block-1-veldmapentries
// (Start 1283/offset 50, Finish 1284/offset 54, ManualDuration 1288/offset 58,
// ManualDurationUnits 1289/offset 62) + `TBkndTask/Fixed2Meta` (TASK_MODE-bit, offset 8, masker
// 0x08 legacy/0x08 2010/0x80 2013+) + `TBkndTask/Fixed2Data` (blok 1). Deze taak wijzigt
// UITSLUITEND wat de lezer INLEEST en op `RawTaskScan` bewaart — de gebouwde `Task`-objecten/
// datums blijven ONGEWIJZIGD (acceptatiepunt 1: de corpusbrede fidelity-baseline in
// `mpp-fidelity-baseline.json` blijft byte-voor-byte 0 verbeterd/0 verslechterd/216 ongewijzigd,
// gemeten via `check-mpp-fidelity.ts` vóór en ná deze taak — zie het rapport bij deze commit).
//
// `readTasks`/`parseProjectProperties`/`ReadTasksResult.rawScans` zijn TEST-ONLY geëxporteerd
// vanuit `mppReader.ts` — zelfde testbaarheidsreden als `readRelations`/`readResources`/
// `readAssignments` (T7): `readMPP` zelf geeft deze rauwe velden NIET door aan `ImportResult`.
// ═══════════════════════════════════════════════════════════════════════════════════════════
{
  function encodeUnicodeStringAscii(s: string): Uint8Array {
    const out = new Uint8Array(s.length * 2);
    const view = new DataView(out.buffer);
    for (let i = 0; i < s.length; i++) view.setUint16(i * 2, s.charCodeAt(i), true);
    return out;
  }

  const PROJECT_START_DATE_KEY = 37748738;
  const PROJECT_FINISH_DATE_KEY = 37748739;
  const TITLE_KEY = 37748744;
  const DEFAULT_CALENDAR_NAME_KEY = 37748750;
  const PROPSKEY_TASK_FIELD_MAP_Z2 = 131092;

  // ── Test 1 — directe veldmap-eenheidstest (acceptatiepunt 2, deel a): geen CFB nodig, alleen
  // `Props` + de field-map-bytes. Bewijst dat `parseFieldMapBytes` blok-1-entries (Start/Finish/
  // ManualDuration/ManualDurationUnits) registreert MET de juiste offset, dat blok-0-entries
  // (incl. LevelingDelay/LevelingDelayUnits op DEZELFDE numerieke offsets 58/62 als hun blok-1-
  // buren) apart blijven, en dat `fixedOffsetOf`/`fixed2OffsetOf` elkaars blok nooit lekken. ─────
  {
    const fieldMapBytes = buildFieldMapEntryBytes([
      { typeValue: TaskFieldId.UniqueId, dataBlockOffset: 0, category: 3 },
      { typeValue: TaskFieldId.Id, dataBlockOffset: 4, category: 3 },
      { typeValue: TaskFieldId.OutlineLevel, dataBlockOffset: 40, category: 3 },
      { typeValue: TaskFieldId.ScheduledDuration, dataBlockOffset: 42, category: 3 },
      { typeValue: TaskFieldId.DurationUnits, dataBlockOffset: 46, category: 3 },
      { typeValue: TaskFieldId.ConstraintType, dataBlockOffset: 56, category: 3 },
      { typeValue: TaskFieldId.LevelingDelay, dataBlockOffset: 58, category: 3 }, // blok 0
      { typeValue: TaskFieldId.LevelingDelayUnits, dataBlockOffset: 62, category: 3 }, // blok 0
      { typeValue: TaskFieldId.ScheduledStart, dataBlockOffset: 64, category: 3 },
      { typeValue: TaskFieldId.ScheduledFinish, dataBlockOffset: 68, category: 3 },
      { typeValue: TaskFieldId.CalendarUniqueId, dataBlockOffset: 118, category: 3 },
      // offset zakt terug van 118 naar 50 ⇒ `parseFieldMapBytes` detecteert de blok-overgang.
      { typeValue: TaskFieldId.Start, dataBlockOffset: 50, category: 3 }, // blok 1
      { typeValue: TaskFieldId.Finish, dataBlockOffset: 54, category: 3 }, // blok 1
      { typeValue: TaskFieldId.ManualDuration, dataBlockOffset: 58, category: 3 }, // blok 1
      { typeValue: TaskFieldId.ManualDurationUnits, dataBlockOffset: 62, category: 3 }, // blok 1
      { typeValue: TaskFieldId.Name, dataBlockOffset: 65535, category: 8 },
    ]);
    const props = new Props(encodePropsEntries([{ key: PROPSKEY_TASK_FIELD_MAP_Z2, data: fieldMapBytes }]), 'Z2-fieldmap-block1');
    const map = createTaskFieldMap(props);

    truthy('[Z2 veldmap] Start (1283) → fixed2@50', fixed2OffsetOf(map, TaskFieldId.Start) === 50);
    truthy('[Z2 veldmap] Finish (1284) → fixed2@54', fixed2OffsetOf(map, TaskFieldId.Finish) === 54);
    truthy('[Z2 veldmap] ManualDuration (1288) → fixed2@58', fixed2OffsetOf(map, TaskFieldId.ManualDuration) === 58);
    truthy('[Z2 veldmap] ManualDurationUnits (1289) → fixed2@62', fixed2OffsetOf(map, TaskFieldId.ManualDurationUnits) === 62);
    truthy('[Z2 veldmap] LevelingDelay (20) → fixed@58 (blok 0, NIET blok 1)', fixedOffsetOf(map, TaskFieldId.LevelingDelay) === 58);
    truthy('[Z2 veldmap] LevelingDelayUnits (178) → fixed@62 (blok 0)', fixedOffsetOf(map, TaskFieldId.LevelingDelayUnits) === 62);
    truthy('[Z2 veldmap] ScheduledStart (35) blijft blok 0 @64', fixedOffsetOf(map, TaskFieldId.ScheduledStart) === 64);
    // Kruiscontrole: de twee accessors lekken NIET tussen elkaars blok, ook al zijn de numerieke
    // offsets (58/62) toevallig gelijk tussen blok 0 (LevelingDelay*) en blok 1 (ManualDuration*).
    truthy('[Z2 veldmap] Start (1283) NIET via fixedOffsetOf (blok 0)', fixedOffsetOf(map, TaskFieldId.Start) === null);
    truthy('[Z2 veldmap] ManualDuration (1288) NIET via fixedOffsetOf (blok 0)', fixedOffsetOf(map, TaskFieldId.ManualDuration) === null);
    truthy('[Z2 veldmap] LevelingDelay (20) NIET via fixed2OffsetOf (blok 1)', fixed2OffsetOf(map, TaskFieldId.LevelingDelay) === null);
  }

  // ── Fixture-infrastructuur voor de end-to-end-tests (2 t/m 4) hieronder — spiegelt T12's
  // fixtureopzet (`buildT12Fixture`), uitgebreid met `TBkndTask/Fixed2Meta`/`Fixed2Data`. ─────────
  const Z2_TASK_FIXED_DATA_SIZE = 130; // zelfde DEFAULT_TASK_FIELDS-layout als de T11/T12-fixtures
  const Z2_FIXED2_META_ITEM_SIZE = 92; // één van TASK_FIXED2_META_ITEM_SIZES's kandidaten

  interface Z2TaskSpec {
    name: string;
    uniqueId: number;
    id: number;
    durationRaw: number;
    startTime: number; startDays: number;
    finishTime: number; finishDays: number;
    /** Zet de TASK_MODE-bit in het Fixed2Meta-record van deze taak via het LEGACY-masker (0x08) —
     *  alleen zinvol zonder `opts.applicationName` (dan geeft `detectApplicationVersion` `null` en
     *  kiest `taskModeBitFlag` het 2010-pad). Voor een 2013+-fixture: gebruik `manualMetaByte`
     *  hieronder i.p.v. deze vlag (die schrijft altijd 0x08, nooit 0x80). */
    manual?: boolean;
    /** Z2-fixronde (MEDIUM): overschrijft `manual` hierboven — schrijft DIT letterlijke byte op
     *  Fixed2Meta-offset 8, ongeacht `manual`. Nodig om de 2013+/0x80-tak van `taskModeBitFlag`
     *  te bewijzen (0x80 gezet ⇒ MANUALLY_SCHEDULED) én om aan te tonen dat het LEGACY-bit (0x08)
     *  op een 2013+-bestand GEEN effect heeft (het moderne masker is 0x80, niet 0x08) — spiegelt
     *  Z1's acceptatiepunt 3 ("gebruik het 2010-masker op een 2013-fixture ⇒ rood"). */
    manualMetaByte?: number;
    manualStartTime?: number; manualStartDays?: number;
    manualFinishTime?: number; manualFinishDays?: number;
    manualDurationRaw?: number;
    manualDurationUnitsRaw?: number; // 7=days (WORKTIME), 8=elapsedDays (getDurationTimeUnits)
    /** Vijandige-fixture-knop (acceptatiepunt 4): overschrijft de lengte van dít taak-eigen
     *  Fixed2Data-record — alleen zinvol als deze taak de LAATSTE in de lijst is (`FixedData.
     *  fromMeta` leidt de laatste-item-lengte af uit "rest van het blok"). */
    fixed2DataLength?: number;
  }

  function buildZ2TaskFixedDataRecord(t: Z2TaskSpec): Uint8Array {
    const out = new Uint8Array(Z2_TASK_FIXED_DATA_SIZE);
    const view = new DataView(out.buffer);
    view.setInt32(0, t.uniqueId, true);
    view.setInt32(4, t.id, true);
    view.setInt16(40, 1, true); // outlineLevel = 1
    view.setInt32(42, t.durationRaw, true);
    view.setInt16(46, 7, true); // durationUnits = 7 ("days", WORKTIME)
    view.setInt16(56, 0, true); // constraintType = 0 (ASAP)
    view.setUint16(64, t.startTime, true);
    view.setUint16(66, t.startDays, true);
    view.setUint16(68, t.finishTime, true);
    view.setUint16(70, t.finishDays, true);
    view.setInt32(118, -1, true); // geen taak-kalender-override
    return out;
  }

  function buildZ2TaskFixedMetaRecord(offsetIntoFixedData: number): Uint8Array {
    const out = new Uint8Array(47);
    new DataView(out.buffer).setInt32(4, offsetIntoFixedData, true);
    return out;
  }

  function buildZ2FixedMetaBlob(items: Uint8Array[]): Uint8Array {
    const out = new Uint8Array(16 + items.length * 47);
    const view = new DataView(out.buffer);
    view.setUint32(0, 0xfadfadba, true);
    view.setInt32(8, items.length, true);
    items.forEach((item, i) => out.set(item, 16 + i * 47));
    return out;
  }

  function buildZ2Fixed2MetaRecord(offsetIntoFixed2Data: number, manual: boolean, metaByteOverride?: number): Uint8Array {
    const out = new Uint8Array(Z2_FIXED2_META_ITEM_SIZE);
    const view = new DataView(out.buffer);
    view.setInt32(4, offsetIntoFixed2Data, true);
    // `metaByteOverride` (Z2-fixronde) wint als gezet — laat een test het LETTERLIJKE byte op
    // offset 8 kiezen (0x08 legacy vs. 0x80 modern), i.p.v. altijd het legacy-bit te schrijven.
    out[8] = metaByteOverride !== undefined ? metaByteOverride : (manual ? 0x08 : 0x00);
    return out;
  }

  function buildZ2Fixed2MetaBlob(items: Uint8Array[]): Uint8Array {
    const out = new Uint8Array(16 + items.length * Z2_FIXED2_META_ITEM_SIZE);
    const view = new DataView(out.buffer);
    view.setUint32(0, 0xfadfadba, true);
    view.setInt32(8, items.length, true);
    items.forEach((item, i) => out.set(item, 16 + i * Z2_FIXED2_META_ITEM_SIZE));
    return out;
  }

  /** Fixed2Data-record (blok 1): Start@50(4)/Finish@54(4)/ManualDuration@58(4)/
   *  ManualDurationUnits@62(2) — alleen geschreven als het veld gezet is ÉN de (mogelijk
   *  vijandig-verkorte) recordlengte de schrijfpositie toelaat. */
  function buildZ2Fixed2DataRecord(t: Z2TaskSpec): Uint8Array {
    const length = t.fixed2DataLength ?? 70;
    const out = new Uint8Array(length);
    const view = new DataView(out.buffer);
    if (t.manualStartTime !== undefined && length >= 54) {
      view.setUint16(50, t.manualStartTime, true);
      view.setUint16(52, t.manualStartDays ?? 0, true);
    }
    if (t.manualFinishTime !== undefined && length >= 58) {
      view.setUint16(54, t.manualFinishTime, true);
      view.setUint16(56, t.manualFinishDays ?? 0, true);
    }
    if (t.manualDurationRaw !== undefined && length >= 62) {
      view.setInt32(58, t.manualDurationRaw, true);
    }
    if (t.manualDurationUnitsRaw !== undefined && length >= 64) {
      view.setInt16(62, t.manualDurationUnitsRaw, true);
    }
    return out;
  }

  // Enkele band 08:00-16:00, ma-vr — spiegelt de T11/T12-fixtures exact.
  const Z2_CAL_DAYS = [
    { defaultFlag: 0 as const },
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] },
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] },
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] },
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] },
    { defaultFlag: 0 as const, bands: [{ startMinutes: 480, durationMinutes: 480 }] },
    { defaultFlag: 0 as const },
  ];

  function buildZ2Fixture(
    tasks: Z2TaskSpec[],
    opts: { includeFixed2?: boolean; corruptFixed2Meta?: boolean; applicationName?: string } = {},
  ): Uint8Array {
    const includeFixed2 = opts.includeFixed2 ?? true;
    const n = tasks.length;
    const dummyMeta = buildZ2TaskFixedMetaRecord(0);
    const metas = tasks.map((_t, i) => buildZ2TaskFixedMetaRecord((3 + i) * Z2_TASK_FIXED_DATA_SIZE));
    const fixedMetaBlob = buildZ2FixedMetaBlob([dummyMeta, dummyMeta, dummyMeta, ...metas]);

    const fixedDataBlob = new Uint8Array((3 + n) * Z2_TASK_FIXED_DATA_SIZE);
    tasks.forEach((t, i) => fixedDataBlob.set(buildZ2TaskFixedDataRecord(t), (3 + i) * Z2_TASK_FIXED_DATA_SIZE));

    let fixed2MetaBlob: Uint8Array | undefined;
    let fixed2DataBlob: Uint8Array | undefined;
    if (includeFixed2) {
      const dummyFixed2Data = new Uint8Array(8);
      const fixed2Records = tasks.map((t) => buildZ2Fixed2DataRecord(t));
      const fixed2Offsets: number[] = [];
      let offset = 24; // 3 dummy-plaatshouders × 8 bytes
      for (const rec of fixed2Records) { fixed2Offsets.push(offset); offset += rec.length; }
      fixed2DataBlob = new Uint8Array(offset);
      fixed2DataBlob.set(dummyFixed2Data, 0);
      fixed2DataBlob.set(dummyFixed2Data, 8);
      fixed2DataBlob.set(dummyFixed2Data, 16);
      fixed2Records.forEach((rec, i) => fixed2DataBlob!.set(rec, fixed2Offsets[i]));

      const dummyFixed2Meta = buildZ2Fixed2MetaRecord(0, false);
      const fixed2Metas = tasks.map((t, i) => buildZ2Fixed2MetaRecord(fixed2Offsets[i], !!t.manual, t.manualMetaByte));
      fixed2MetaBlob = buildZ2Fixed2MetaBlob([dummyFixed2Meta, dummyFixed2Meta, dummyFixed2Meta, ...fixed2Metas]);
      // Test 3b (rode-pad-fixture voor de try/catch rond `FixedMeta.withHeuristicItemSize`/
      // `FixedData.fromMeta` in `readTasks`): STREAM AANWEZIG maar te klein voor zelfs de
      // 16-byte FixedMeta-header ⇒ `withHeuristicItemSize` gooit ("te klein voor header"), de
      // catch vangt 'm op en `fixed2Meta`/`fixed2Data` blijven `null` — spiegelt precies het
      // "streams afwezig"-gedrag van Test 3, maar bewijst nu de ANDERE tak (`catch`, niet de
      // `if`-guard).
      if (opts.corruptFixed2Meta) fixed2MetaBlob = new Uint8Array(4);
    }

    let nameOffset = 0;
    const varMetaEntries: { uniqueId: number; type: number; offset: number }[] = [];
    const namePayloads: { offset: number; payload: Uint8Array }[] = [];
    for (const t of tasks) {
      varMetaEntries.push({ uniqueId: t.uniqueId, type: TaskFieldId.Name, offset: nameOffset });
      const payload = encodeUnicodeStringAscii(t.name);
      namePayloads.push({ offset: nameOffset, payload });
      nameOffset += 4 + payload.length;
    }
    const taskVarMetaBytes = buildVarMetaBytes(varMetaEntries);
    const taskVar2DataBuf = new Uint8Array(Math.max(nameOffset, 1));
    const taskVar2View = new DataView(taskVar2DataBuf.buffer);
    for (const { offset, payload } of namePayloads) {
      taskVar2View.setInt32(offset, payload.length, true);
      taskVar2DataBuf.set(payload, offset + 4);
    }

    const fieldMapBytes = buildFieldMapEntryBytes([
      { typeValue: TaskFieldId.UniqueId, dataBlockOffset: 0, category: 3 },
      { typeValue: TaskFieldId.Id, dataBlockOffset: 4, category: 3 },
      { typeValue: TaskFieldId.OutlineLevel, dataBlockOffset: 40, category: 3 },
      { typeValue: TaskFieldId.ScheduledDuration, dataBlockOffset: 42, category: 3 },
      { typeValue: TaskFieldId.DurationUnits, dataBlockOffset: 46, category: 3 },
      { typeValue: TaskFieldId.ConstraintType, dataBlockOffset: 56, category: 3 },
      { typeValue: TaskFieldId.ScheduledStart, dataBlockOffset: 64, category: 3 },
      { typeValue: TaskFieldId.ScheduledFinish, dataBlockOffset: 68, category: 3 },
      { typeValue: TaskFieldId.CalendarUniqueId, dataBlockOffset: 118, category: 3 },
      { typeValue: TaskFieldId.Start, dataBlockOffset: 50, category: 3 },
      { typeValue: TaskFieldId.Finish, dataBlockOffset: 54, category: 3 },
      { typeValue: TaskFieldId.ManualDuration, dataBlockOffset: 58, category: 3 },
      { typeValue: TaskFieldId.ManualDurationUnits, dataBlockOffset: 62, category: 3 },
      { typeValue: TaskFieldId.Name, dataBlockOffset: 65535, category: 8 },
    ]);

    const calendarName = 'Z2 fixture-kalender';
    const hoursBlock = buildCalHoursBlock(Z2_CAL_DAYS);
    const calFixedMetaBlob = buildCalFixedMetaBlob([0]);
    const calFixedDataBlob = buildCalFixedDataRecord(1, 1, -1);
    const CAL_NAME_OFF = 0, CAL_DATA_OFF = 100;
    const calVarMetaBytes = buildVarMetaBytes([
      { uniqueId: 1, type: 1, offset: CAL_NAME_OFF },
      { uniqueId: 1, type: 8, offset: CAL_DATA_OFF },
    ]);
    const calVar2DataBuf = new Uint8Array(700);
    const calVar2View = new DataView(calVar2DataBuf.buffer);
    const writeCalVar2 = (offset: number, payload: Uint8Array) => {
      calVar2View.setInt32(offset, payload.length, true);
      calVar2DataBuf.set(payload, offset + 4);
    };
    writeCalVar2(CAL_NAME_OFF, encodeUnicodeStringAscii(calendarName));
    writeCalVar2(CAL_DATA_OFF, hoursBlock);

    const projectPropsBytes = encodePropsEntries([
      { key: PROJECT_START_DATE_KEY, data: timestampBytes(0, 15000) },
      { key: PROJECT_FINISH_DATE_KEY, data: timestampBytes(0, 15010) },
      { key: TITLE_KEY, data: encodeUnicodeStringAscii('Z2-fixture') },
      { key: DEFAULT_CALENDAR_NAME_KEY, data: encodeUnicodeStringAscii(calendarName) },
      { key: PROPSKEY_TASK_FIELD_MAP_Z2, data: fieldMapBytes },
    ]);

    const taskChildren: Record<string, CfbTreeNode> = {
      FixedMeta: { data: fixedMetaBlob },
      FixedData: { data: fixedDataBlob },
      VarMeta: { data: taskVarMetaBytes },
      Var2Data: { data: taskVar2DataBuf },
    };
    if (fixed2MetaBlob && fixed2DataBlob) {
      taskChildren.Fixed2Meta = { data: fixed2MetaBlob };
      taskChildren.Fixed2Data = { data: fixed2DataBlob };
    }

    const tree: Record<string, CfbTreeNode> = {
      // `applicationName` (Z2-fixronde): OPTIONEEL — default `undefined` laat `encodeCompObjFileFormat`
      // zijn eigen `'OPS synthetic'`-default gebruiken (2010-legacy-pad, byte-identiek aan vóór deze
      // fixronde). Alleen de nieuwe 2013+-fixture hieronder geeft 'm expliciet mee.
      '\x01CompObj': { data: encodeCompObjFileFormat('MSProject.MPP14', opts.applicationName) },
      Props14: { data: encodePropsSingleByteEntry(893386752, 0) },
      '   114': {
        children: {
          Props: { data: projectPropsBytes },
          TBkndTask: { children: taskChildren },
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
    return buildNestedCfb(tree);
  }

  /** Bouwt de volledige `ReadTasksContext` en roept `readTasks` aan — dezelfde preambule als
   *  `readMPP`, maar zonder relaties/resources/assignments te hoeven optuigen (T7-testbaarheids-
   *  precedent). Vangt niets: een gooiende `readTasks` moet de aanroeper expliciet zien. */
  function scanZ2(bytes: Uint8Array): ReadTasksResult {
    const { cfb, projectProps, applicationVersion } = openMppProject(bytes);
    const { project, hoursPerDay, calendarHoursPerDayOverride } = parseProjectProperties(projectProps, undefined);
    const taskFieldMap = createTaskFieldMap(projectProps);
    const calResult = readCalendars(cfb, projectProps, applicationVersion, calendarHoursPerDayOverride);
    return readTasks({ cfb, taskFieldMap, hoursPerDay, statusDate: project.statusDate, applicationVersion, calResult });
  }

  function findRaw(result: ReadTasksResult, uniqueId: number): RawTaskScan | undefined {
    return result.rawScans.find((r) => r.uniqueId === uniqueId);
  }

  /** Rekent een verwachte timestamp uit via `getTimestamp`/`timestampBytes` zelf (geen aparte
   *  epoch-formule hier gedupliceerd — `timestampBytes` is de bestaande I4-testhelper hierboven
   *  in dit bestand) — dezelfde 4-byte time(2)/days(2)-vorm als de fixture-records hierboven. */
  function expectedTimestamp(time: number, days: number): Date | null {
    return getTimestamp(timestampBytes(time, days), 0, 'Z2 expected timestamp');
  }

  // ── Test 2 — end-to-end: één AUTO- en één MANUALLY_SCHEDULED-taak, mét block-1-veldmap-entries
  // (acceptatiepunt 2, deel b). Bewijst zowel de offsetopzoeking als de daadwerkelijke decodering
  // (TASK_MODE-bit, manual start/finish/duur, elapsed-vlag), ÉN dat de gebouwde `Task.time`-datums
  // uitsluitend uit SCHEDULED_START/FINISH komen — nooit uit het manual-veldpaar (acceptatiepunt 1
  // op unit-niveau: dit is een leesuitbreiding, geen gedragswijziging). ────────────────────────────
  {
    const bytes = buildZ2Fixture([
      { name: 'Auto', uniqueId: 10, id: 1, durationRaw: 4800, startTime: 4800, startDays: 15000, finishTime: 9600, finishDays: 15000 },
      {
        name: 'Manual', uniqueId: 11, id: 2, durationRaw: 4800, startTime: 4800, startDays: 15000, finishTime: 9600, finishDays: 15000,
        manual: true,
        manualStartTime: 4800, manualStartDays: 15003, manualFinishTime: 9600, manualFinishDays: 15005,
        manualDurationRaw: 28800, manualDurationUnitsRaw: 8, // 8 = elapsedDays
      },
    ]);
    let result: ReadTasksResult | null = null;
    let threw: string | null = null;
    try { result = scanZ2(bytes); } catch (err) { threw = err instanceof Error ? err.message : String(err); }
    truthy(`[Z2 end-to-end] readTasks gooit niet (${threw ?? ''})`, threw === null);
    if (result) {
      truthy('[Z2 end-to-end] 2 taken', result.rawScans.length === 2);
      const auto = findRaw(result, 10);
      const manual = findRaw(result, 11);
      truthy('[Z2 end-to-end] Auto-taak gevonden', !!auto);
      truthy('[Z2 end-to-end] Manual-taak gevonden', !!manual);
      if (auto) {
        truthy('[Z2 end-to-end] Auto: taskMode === AUTO_SCHEDULED', auto.taskMode === 'AUTO_SCHEDULED');
        // De Auto-taak se Fixed2Data-record BESTAAT (elke taak krijgt er hier één, spiegelt een
        // echt bestand waar block 1 uniform aanwezig is) maar is ONGESCHREVEN gebleven — Start/
        // Finish lezen dan `null` via `getTimestamp`'s eigen "days ≤ 1 ⇒ N/A"-conventie (dagwaarde
        // 0), terwijl MANUAL_DURATION geen zo'n NA-sentinel kent: rauwe nullen lezen daar terug als
        // een geldige (weliswaar betekenisloze) duur van 0 — geen `null`. Dat is exact wat "alleen
        // lezen, geen interpretatie" betekent: deze taak trekt geen conclusie over of een AUTO-taak
        // se blok-1-bytes al dan niet betekenisvol zijn.
        truthy('[Z2 end-to-end] Auto: manualStartTs === null (dagwaarde 0 ⇒ NA-conventie)', auto.manualStartTs === null);
        truthy('[Z2 end-to-end] Auto: manualFinishTs === null', auto.manualFinishTs === null);
        truthy('[Z2 end-to-end] Auto: manualDurationRaw === 0 (ongeschreven bytes, geen NA-sentinel voor duur)', auto.manualDurationRaw === 0);
        truthy('[Z2 end-to-end] Auto: manualDurationIsElapsed === false', auto.manualDurationIsElapsed === false);
      }
      if (manual) {
        truthy('[Z2 end-to-end] Manual: taskMode === MANUALLY_SCHEDULED', manual.taskMode === 'MANUALLY_SCHEDULED');
        const expStart = expectedTimestamp(4800, 15003);
        const expFinish = expectedTimestamp(9600, 15005);
        truthy(
          `[Z2 end-to-end] Manual: manualStartTs klopt (kreeg ${manual.manualStartTs?.toISOString()})`,
          !!manual.manualStartTs && !!expStart && manual.manualStartTs.getTime() === expStart.getTime(),
        );
        truthy(
          `[Z2 end-to-end] Manual: manualFinishTs klopt (kreeg ${manual.manualFinishTs?.toISOString()})`,
          !!manual.manualFinishTs && !!expFinish && manual.manualFinishTs.getTime() === expFinish.getTime(),
        );
        truthy(`[Z2 end-to-end] Manual: manualDurationRaw === 28800 (kreeg ${manual.manualDurationRaw})`, manual.manualDurationRaw === 28800);
        truthy('[Z2 end-to-end] Manual: manualDurationIsElapsed === true (code 8 = elapsedDays)', manual.manualDurationIsElapsed === true);
      }
      // Acceptatiepunt 1 (unit-niveau): de MANUAL-taak se GEBOUWDE Task.time komt nog steeds
      // uitsluitend uit SCHEDULED_START/FINISH — geen enkel manual-veld raakt de datums in déze taak.
      const manualTask = result.tasks.find((t) => t.name === 'Manual');
      truthy('[Z2 end-to-end] gebouwde Manual-taak gevonden', !!manualTask);
      if (manualTask) {
        // Deze fixture belandt in UUR-MODUS (de kalender se vaste anchor is altijd 08:00, de
        // finish-tijd 16:00 wijkt daarvan af — het bestaande (c)-signaal uit de moduleheader van
        // `mppReader.ts`, ONGEWIJZIGD door deze taak) — `formatField` gebruikt dan `formatInstant`
        // i.p.v. `formatDate`. De vorm is hier niet het punt: het punt is dat de WAARDE uit
        // SCHEDULED_START (08:00 op dag 15000) komt, niet uit manualStart (08:00 op dag 15003).
        truthy(
          `[Z2 end-to-end] Task.time.scheduleStart komt uit SCHEDULED_START, NIET uit manualStart (kreeg ${manualTask.time.scheduleStart})`,
          manualTask.time.scheduleStart === formatInstant(expectedTimestamp(4800, 15000)!, 'hour'),
        );
      }
    }
  }

  // ── Test 2b — clamp-bewijs: `manualDurationRaw` wordt geklemd via `clampManualDurationTenths`
  // (limits.ts) vóórdat hij op `RawTaskScan` landt — een hostile INT32-waarde ver boven de
  // 100-jaargrens komt geklemd terug, niet rauw. ───────────────────────────────────────────────────
  {
    const HOSTILE_RAW = 2_000_000_000; // > MAX_MANUAL_DURATION_TENTHS, ruim binnen INT32
    const bytes = buildZ2Fixture([
      {
        name: 'HostileDuration', uniqueId: 10, id: 1, durationRaw: 4800, startTime: 4800, startDays: 15000, finishTime: 9600, finishDays: 15000,
        manual: true, manualDurationRaw: HOSTILE_RAW, manualDurationUnitsRaw: 7,
      },
    ]);
    const result = scanZ2(bytes);
    const raw = findRaw(result, 10);
    truthy(
      `[Z2 clamp] manualDurationRaw geklemd op MAX_MANUAL_DURATION_TENTHS (kreeg ${raw?.manualDurationRaw})`,
      raw?.manualDurationRaw === MAX_MANUAL_DURATION_TENTHS,
    );
  }

  // ── Test 2c/2d — Z2-fixronde (MEDIUM): de 2013+/0x80-tak van `taskModeBitFlag` had tot nu toe
  // GEEN corpusloze fixture — alle fixtures hierboven laten `applicationName` weg, dus
  // `detectApplicationVersion` gaf steeds `null` en elke case liep stilzwijgend over het
  // 2010-LEGACY-pad (0x08), nooit over het pad dat het VOLLEDIGE corpus daadwerkelijk gebruikt
  // (2013+/0x80). Twee cases, spiegelt Z1's acceptatiepunt 3 (2010-masker op een 2013-fixture
  // ⇒ rood): (2c) een 2013+-fixture met het MODERNE bit (0x80) gezet ⇒ MANUALLY_SCHEDULED; (2d)
  // DEZELFDE 2013+-fixture met uitsluitend het LEGACY-bit (0x08, GEEN 0x80) ⇒ AUTO_SCHEDULED —
  // bewijst dat 0x08 op een moderne versie geen effect heeft, alleen 0x80 telt. ──────────────────
  {
    const bytes2c = buildZ2Fixture(
      [{
        name: 'Modern0x80', uniqueId: 10, id: 1, durationRaw: 4800, startTime: 4800, startDays: 15000, finishTime: 9600, finishDays: 15000,
        manualMetaByte: 0x80,
      }],
      { applicationName: 'Microsoft.Project 16.0' },
    );
    const raw2c = findRaw(scanZ2(bytes2c), 10);
    truthy(
      `[Z2 modern 0x80] taskMode === MANUALLY_SCHEDULED op een 2013+-fixture (kreeg ${raw2c?.taskMode})`,
      raw2c?.taskMode === 'MANUALLY_SCHEDULED',
    );

    const bytes2d = buildZ2Fixture(
      [{
        name: 'Modern0x08Only', uniqueId: 10, id: 1, durationRaw: 4800, startTime: 4800, startDays: 15000, finishTime: 9600, finishDays: 15000,
        manualMetaByte: 0x08,
      }],
      { applicationName: 'Microsoft.Project 16.0' },
    );
    const raw2d = findRaw(scanZ2(bytes2d), 10);
    truthy(
      `[Z2 modern 0x08-only] taskMode === AUTO_SCHEDULED — het legacy-bit alléén telt niet op een 2013+-bestand (kreeg ${raw2d?.taskMode})`,
      raw2d?.taskMode === 'AUTO_SCHEDULED',
    );
  }

  // ── Test 3 — Fixed2Meta/Fixed2Data-streams AFWEZIG (acceptatiepunt 3): alle nieuwe velden
  // blijven leeg/AUTO_SCHEDULED, geen exceptie, de rest van de lezing (naam/SCHEDULED_START) blijft
  // ongewijzigd — rode-pad-fixture voor de `if (fixed2MetaBytes && fixed2DataBytes)`-guard. ────────
  {
    const bytes = buildZ2Fixture(
      [{ name: 'GeenFixed2', uniqueId: 10, id: 1, durationRaw: 4800, startTime: 4800, startDays: 15000, finishTime: 9600, finishDays: 15000 }],
      { includeFixed2: false },
    );
    let result: ReadTasksResult | null = null;
    let threw: string | null = null;
    try { result = scanZ2(bytes); } catch (err) { threw = err instanceof Error ? err.message : String(err); }
    truthy(`[Z2 geen-Fixed2] readTasks gooit niet (${threw ?? ''})`, threw === null);
    if (result) {
      const raw = findRaw(result, 10);
      truthy('[Z2 geen-Fixed2] taak gevonden', !!raw);
      if (raw) {
        truthy('[Z2 geen-Fixed2] taskMode === AUTO_SCHEDULED (default zonder Fixed2Meta)', raw.taskMode === 'AUTO_SCHEDULED');
        truthy('[Z2 geen-Fixed2] manualStartTs === null', raw.manualStartTs === null);
        truthy('[Z2 geen-Fixed2] manualFinishTs === null', raw.manualFinishTs === null);
        truthy('[Z2 geen-Fixed2] manualDurationRaw === null', raw.manualDurationRaw === null);
        truthy('[Z2 geen-Fixed2] manualDurationIsElapsed === false', raw.manualDurationIsElapsed === false);
        truthy('[Z2 geen-Fixed2] naam ongewijzigd gelezen', raw.name === 'GeenFixed2');
        truthy('[Z2 geen-Fixed2] SCHEDULED_START ongewijzigd gelezen', raw.startTs?.getTime() === expectedTimestamp(4800, 15000)?.getTime());
      }
    }
  }

  // ── Test 3b — Fixed2Meta-stream AANWEZIG maar CORRUPT (te klein voor de FixedMeta-header):
  // andere rode-pad-fixture dan Test 3 hierboven — die bewijst de `if (fixed2MetaBytes &&
  // fixed2DataBytes)`-guard (streams AFWEZIG), dit bewijst de `try`/`catch` ERBINNEN (streams
  // AANWEZIG, constructie gooit). Beide takken moeten onafhankelijk aantoonbaar zijn (§8-checklist:
  // "elke nieuwe try/catch-wrapper krijgt een eigen rode-pad-fixture"). ─────────────────────────────
  {
    const bytes = buildZ2Fixture(
      [{ name: 'CorruptFixed2Meta', uniqueId: 10, id: 1, durationRaw: 4800, startTime: 4800, startDays: 15000, finishTime: 9600, finishDays: 15000 }],
      { corruptFixed2Meta: true },
    );
    let result: ReadTasksResult | null = null;
    let threw: string | null = null;
    try { result = scanZ2(bytes); } catch (err) { threw = err instanceof Error ? err.message : String(err); }
    truthy(`[Z2 corrupt-Fixed2Meta] readTasks gooit niet (${threw ?? ''})`, threw === null);
    if (result) {
      const raw = findRaw(result, 10);
      truthy('[Z2 corrupt-Fixed2Meta] taak gevonden', !!raw);
      if (raw) {
        truthy('[Z2 corrupt-Fixed2Meta] taskMode === AUTO_SCHEDULED (catch ⇒ fixed2Meta blijft null)', raw.taskMode === 'AUTO_SCHEDULED');
        truthy('[Z2 corrupt-Fixed2Meta] manualStartTs === null', raw.manualStartTs === null);
        truthy('[Z2 corrupt-Fixed2Meta] manualDurationRaw === null', raw.manualDurationRaw === null);
        truthy('[Z2 corrupt-Fixed2Meta] naam ongewijzigd gelezen', raw.name === 'CorruptFixed2Meta');
      }
    }
  }

  // ── Test 4 — vijandige fixture: Fixed2Data-record KORTER dan offset 54 (acceptatiepunt 4). De
  // taak is wél MANUALLY_SCHEDULED (Fixed2Meta-record is het volle 92 bytes, ongemoeid) — alleen
  // haar Fixed2Data-record is verkort tot 52 bytes (< Finish@54, én < Start@50+4=54), dus zowel
  // Start als Finish als de duur-velden moeten netjes `null` geven, GEEN out-of-bounds-exceptie. ───
  {
    const bytes = buildZ2Fixture([
      {
        name: 'KortFixed2Data', uniqueId: 10, id: 1, durationRaw: 4800, startTime: 4800, startDays: 15000, finishTime: 9600, finishDays: 15000,
        manual: true,
        manualStartTime: 4800, manualStartDays: 15003, manualFinishTime: 9600, manualFinishDays: 15005,
        manualDurationRaw: 28800, manualDurationUnitsRaw: 7,
        fixed2DataLength: 52, // < 54 (Finish@54) én < 50+4=54 (Start)
      },
    ]);
    let result: ReadTasksResult | null = null;
    let threw: string | null = null;
    try { result = scanZ2(bytes); } catch (err) { threw = err instanceof Error ? err.message : String(err); }
    truthy(`[Z2 vijandig] readTasks gooit niet (${threw ?? ''})`, threw === null);
    if (result) {
      const raw = findRaw(result, 10);
      truthy('[Z2 vijandig] taak gevonden', !!raw);
      if (raw) {
        truthy('[Z2 vijandig] taskMode === MANUALLY_SCHEDULED (Fixed2Meta zelf ongemoeid)', raw.taskMode === 'MANUALLY_SCHEDULED');
        truthy('[Z2 vijandig] manualStartTs === null (record te kort voor offset 50)', raw.manualStartTs === null);
        truthy('[Z2 vijandig] manualFinishTs === null (record te kort voor offset 54)', raw.manualFinishTs === null);
        truthy('[Z2 vijandig] manualDurationRaw === null (record te kort voor offset 58)', raw.manualDurationRaw === null);
        truthy('[Z2 vijandig] manualDurationIsElapsed === false (record te kort voor offset 62)', raw.manualDurationIsElapsed === false);
      }
    }
  }

  // ── Test 5 — corpusbrede telling van manual-taken via déze lezer (acceptatiepunt 5). Geen
  // hard-gepind getal (dat is de kruiscontrole van de orkestrator tegen baan M's onafhankelijke
  // `mppGroundTruth.ts`-telling, plan-§3(a)) — deze sectie MEET en RAPPORTEERT, met dezelfde
  // nette-skip-conventie als de andere corpus-/crawl-secties in dit bestand. ─────────────────────
  {
    const Z2_CORPUS = process.env.OPS_MPP_CORPUS ?? '/home/nozzit/open-aec/voor claude/test bestanden voor file implementation';
    const Z2_CRAWL = process.env.OPS_MPP_CRAWL ?? '/home/nozzit/open-aec/voor claude/testdata-crawl';

    function listMppFilesRecursiveZ2(dir: string): string[] {
      const out: string[] = [];
      const entries = readdirSync(dir, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
      for (const entry of entries) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) out.push(...listMppFilesRecursiveZ2(full));
        else if (entry.isFile() && entry.name.toLowerCase().endsWith('.mpp')) out.push(full);
      }
      return out;
    }

    let filesScanned = 0;
    let filesFailed = 0;
    let tasksScanned = 0;
    let manualTasks = 0;
    for (const root of [Z2_CORPUS, Z2_CRAWL]) {
      if (!existsSync(root)) continue;
      for (const file of listMppFilesRecursiveZ2(root)) {
        try {
          const result = scanZ2(new Uint8Array(readFileSync(file)));
          filesScanned++;
          tasksScanned += result.rawScans.length;
          manualTasks += result.rawScans.filter((r) => r.taskMode === 'MANUALLY_SCHEDULED').length;
        } catch {
          filesFailed++; // niet-.mpp14-bestanden of andere onleesbare varianten in de crawl-boom
        }
      }
    }
    if (filesScanned === 0) {
      console.log(`OK  mpp-import: Z2 corpusbrede manual-taken-telling (${Z2_CORPUS} / ${Z2_CRAWL}) niet aanwezig — overgeslagen`);
    } else {
      truthy(`[Z2 corpustelling] minstens 1 bestand gescand (kreeg ${filesScanned})`, filesScanned > 0);
      console.log(
        `OK  mpp-import: Z2 corpusbrede manual-taken-telling — ${filesScanned} bestand(en) gescand ` +
        `(${filesFailed} onleesbaar/overgeslagen), ${tasksScanned} taken totaal, ${manualTasks} MANUALLY_SCHEDULED via déze lezer`,
      );
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// Z3 (etappe "nul afwijkingen") — timephased-decoder (`Var2Data` van `TBkndAssn`): een PURE
// byte-decoder (`mppTimephased.ts`) + de bijbehorende opening/doorgifte in `mppEntities.ts`
// (`readAssignmentTimephasedRaw`). Geen planningsgedrag, geen datum-effect — zie de moduleheader
// van `mppTimephased.ts` voor de volledige byteformaat-toelichting en de bewuste vereenvoudiging
// t.o.v. MPXJ's `TimephasedDataFactory.getCompleteWork` (irregulier/regulier NIET geweven).
// ═══════════════════════════════════════════════════════════════════════════════════════════
{
  const Z3_REFERENCE_START = new Date('2026-01-05T08:00:00.000Z');

  /** Bouwt een REGULIER timephased-blok: 16-byte header (recordcount@0) + een TOTAAL-record (dat
   *  altijd wordt overgeslagen — `totalWorkMinutes`/`totalElapsedMinutes` hieronder zijn dus BEWUST
   *  a-typische waarden, zodat mutatietest 2 een aantoonbaar andere eerste periode oplevert als het
   *  overslaan zou wegvallen) + N periode-records (cumulatieve waarden, GEEN delta's). */
  function buildRegularBlock(
    periods: { cumulativeWorkMinutes: number; cumulativeElapsedMinutes: number }[],
    opts: { headerCountClaim?: number; totalWorkMinutes?: number; totalElapsedMinutes?: number } = {},
  ): Uint8Array {
    const headerCount = opts.headerCountClaim ?? periods.length;
    const out = new Uint8Array(16 + 20 + periods.length * 20);
    const view = new DataView(out.buffer);
    view.setUint16(0, headerCount, true);
    // Totaal-record (fysiek record 0, bytes 16..36) — a-typische waarden (default 999 min werk/
    // elapsed), zie de docblok-toelichting hierboven.
    view.setFloat64(16, (opts.totalWorkMinutes ?? 999) * 1000, true);
    view.setInt32(16 + 16, (opts.totalElapsedMinutes ?? 999) * 80, true);
    periods.forEach((p, i) => {
      const offset = 36 + i * 20;
      view.setFloat64(offset, p.cumulativeWorkMinutes * 1000, true);
      view.setInt32(offset + 16, p.cumulativeElapsedMinutes * 80, true);
    });
    return out;
  }

  /** Bouwt een IRREGULIER timephased-blok: 16-byte header (recordcount@0) + N × 8-byte records
   *  (twee 4-byte MPP-timestamps, `timestampBytes`-encoding — zelfde helper als de bestaande
   *  `getTimestamp`-eenheidstests hierboven). */
  function buildIrregularBlock(records: { startTime: number; startDays: number; finishTime: number; finishDays: number }[], headerCountClaim?: number): Uint8Array {
    const headerCount = headerCountClaim ?? records.length;
    const out = new Uint8Array(16 + records.length * 8);
    const view = new DataView(out.buffer);
    view.setUint16(0, headerCount, true);
    records.forEach((r, i) => {
      const offset = 16 + i * 8;
      view.setUint16(offset, r.startTime, true);
      view.setUint16(offset + 2, r.startDays, true);
      view.setUint16(offset + 4, r.finishTime, true);
      view.setUint16(offset + 6, r.finishDays, true);
    });
    return out;
  }

  // ── 1(a) — drie regelmatige records met bekende cumulatieve waarden → exact de verwachte lijst.
  // Elke periode: 480 werk-minuten (één 8-uurs werkdag) over 480 verstreken minuten (geen gat). ──
  {
    const block = buildRegularBlock([
      { cumulativeWorkMinutes: 480, cumulativeElapsedMinutes: 480 },
      { cumulativeWorkMinutes: 960, cumulativeElapsedMinutes: 960 },
      { cumulativeWorkMinutes: 1440, cumulativeElapsedMinutes: 1440 },
    ]);
    const result = decodeRegularTimephasedWork(block, Z3_REFERENCE_START, 'Z3-1a');
    truthy('[Z3 1a] 3 periodes gedecodeerd', result.length === 3);
    const expected = [
      { startMin: 0, finishMin: 480, work: 480 },
      { startMin: 480, finishMin: 960, work: 480 },
      { startMin: 960, finishMin: 1440, work: 480 },
    ];
    expected.forEach((e, i) => {
      const entry = result[i];
      truthy(`[Z3 1a] periode ${i}: start`, !!entry && entry.start.getTime() === Z3_REFERENCE_START.getTime() + e.startMin * 60_000);
      truthy(`[Z3 1a] periode ${i}: finish`, !!entry && entry.finish.getTime() === Z3_REFERENCE_START.getTime() + e.finishMin * 60_000);
      truthy(`[Z3 1a] periode ${i}: workMinutes === ${e.work}`, !!entry && entry.workMinutes === e.work);
    });
  }

  // ── 1(b) — blok met een nul-werk-record ertussen → dat record komt door als gat (workMinutes
  // === 0), niet weggefilterd, want dát is precies het signaal dat Z4 straks als splitsegment
  // herkent. Periode 1: 240min werk/240min elapsed. Periode 2 (GAT): 0min werk/120min elapsed
  // (cumulatief blijft dus 240 werk, elapsed loopt door naar 360). Periode 3: 300min werk verder. ─
  {
    const block = buildRegularBlock([
      { cumulativeWorkMinutes: 240, cumulativeElapsedMinutes: 240 },
      { cumulativeWorkMinutes: 240, cumulativeElapsedMinutes: 360 },
      { cumulativeWorkMinutes: 540, cumulativeElapsedMinutes: 660 },
    ]);
    const result = decodeRegularTimephasedWork(block, Z3_REFERENCE_START, 'Z3-1b');
    truthy('[Z3 1b] 3 periodes gedecodeerd (gat NIET weggefilterd)', result.length === 3);
    truthy('[Z3 1b] periode 0: workMinutes === 240', result[0]?.workMinutes === 240);
    truthy('[Z3 1b] periode 1 (GAT): workMinutes === 0', result[1]?.workMinutes === 0);
    truthy('[Z3 1b] periode 1 (GAT): toch een reële tijdspanne (120 min elapsed)', result[1] && result[1].finish.getTime() - result[1].start.getTime() === 120 * 60_000);
    truthy('[Z3 1b] periode 2: workMinutes === 300', result[2]?.workMinutes === 300);
  }

  // ── 1(c) — irregulier blok: twee records, elk met een bekende start/eind-timestamp. workMinutes
  // = de volledige tijdspanne (zie mppTimephased.ts se moduleheader voor de motivering — géén los
  // amount-veld in dit blok). ─────────────────────────────────────────────────────────────────────
  {
    const rec1Start = getTimestamp(timestampBytes(0, 200), 0)!;
    const rec1Finish = getTimestamp(timestampBytes(600, 200), 0)!; // +600×6000ms = +60 min
    const rec2Start = getTimestamp(timestampBytes(0, 205), 0)!;
    const rec2Finish = getTimestamp(timestampBytes(1200, 205), 0)!; // +1200×6000ms = +120 min
    truthy('[Z3 1c] fixture-voorwaarde: beide timestamp-paren geldig (geen NA)', !!rec1Start && !!rec1Finish && !!rec2Start && !!rec2Finish);

    const block = buildIrregularBlock([
      { startTime: 0, startDays: 200, finishTime: 600, finishDays: 200 },
      { startTime: 0, startDays: 205, finishTime: 1200, finishDays: 205 },
    ]);
    const result = decodeIrregularTimephasedWork(block, 'Z3-1c');
    truthy('[Z3 1c] 2 irreguliere periodes gedecodeerd', result.length === 2);
    truthy('[Z3 1c] periode 0: start/finish exact', !!result[0] && result[0].start.getTime() === rec1Start.getTime() && result[0].finish.getTime() === rec1Finish.getTime());
    truthy('[Z3 1c] periode 0: workMinutes === 60 (volledige tijdspanne)', result[0]?.workMinutes === 60);
    truthy('[Z3 1c] periode 1: start/finish exact', !!result[1] && result[1].start.getTime() === rec2Start.getTime() && result[1].finish.getTime() === rec2Finish.getTime());
    truthy('[Z3 1c] periode 1: workMinutes === 120', result[1]?.workMinutes === 120);
  }

  // ── 1(d) — header-recordcount die niet strookt met de bloklengte → klemmen, geen crash, geen
  // allocatie op basis van de ongevalideerde count. Regulier blok: header claimt 50.000 records,
  // fysiek is er ruimte voor precies 2 (16+20+2×20=76 bytes) → structureel geklemd naar 2, geen
  // exceptie, en snel (geen poging tot 50.000 iteraties). Irregulier blok: header claimt 40.000,
  // fysiek ruimte voor 1 (16+8=24 bytes). ──────────────────────────────────────────────────────
  {
    const hostileRegular = buildRegularBlock(
      [
        { cumulativeWorkMinutes: 100, cumulativeElapsedMinutes: 100 },
        { cumulativeWorkMinutes: 150, cumulativeElapsedMinutes: 150 },
      ],
      { headerCountClaim: 50_000 },
    );
    const start = Date.now();
    let threwRegular = false;
    let regularResult: TimephasedWork[] = [];
    try {
      regularResult = decodeRegularTimephasedWork(hostileRegular, Z3_REFERENCE_START, 'Z3-1d-regular');
    } catch {
      threwRegular = true;
    }
    const elapsedMs = Date.now() - start;
    truthy('[Z3 1d] hostile regulier: geen exceptie', !threwRegular);
    truthy('[Z3 1d] hostile regulier: geklemd naar de structureel mogelijke 2 records (niet 50.000)', regularResult.length === 2);
    truthy(`[Z3 1d] hostile regulier: binnen tijdslimiet (${elapsedMs}ms) — geen poging tot 50.000 iteraties`, elapsedMs < 500);

    const hostileIrregular = buildIrregularBlock(
      [{ startTime: 0, startDays: 200, finishTime: 600, finishDays: 200 }],
      40_000,
    );
    let threwIrregular = false;
    let irregularResult: TimephasedWork[] = [];
    try {
      irregularResult = decodeIrregularTimephasedWork(hostileIrregular, 'Z3-1d-irregular');
    } catch {
      threwIrregular = true;
    }
    truthy('[Z3 1d] hostile irregulier: geen exceptie', !threwIrregular);
    truthy('[Z3 1d] hostile irregulier: geklemd naar de structureel mogelijke 1 record (niet 40.000)', irregularResult.length === 1);
  }

  // ── Rode-pad-fixtures (hardening-checklist: elke nieuwe try/catch krijgt een eigen bewijs) ───
  {
    truthy('[Z3 rood] data === null (regulier) ⇒ lege lijst, geen exceptie', decodeRegularTimephasedWork(null, Z3_REFERENCE_START).length === 0);
    truthy('[Z3 rood] data === null (irregulier) ⇒ lege lijst, geen exceptie', decodeIrregularTimephasedWork(null).length === 0);
    truthy('[Z3 rood] data te kort voor zelfs het totaal-record (regulier) ⇒ lege lijst', decodeRegularTimephasedWork(new Uint8Array(20), Z3_REFERENCE_START).length === 0);
    truthy('[Z3 rood] data te kort voor de header (irregulier) ⇒ lege lijst', decodeIrregularTimephasedWork(new Uint8Array(8)).length === 0);
  }

  // ── AssignmentTimephasedRaw / readAssignmentTimephasedRaw — synthetische CFB-fixture: één
  // TBkndAssn/VarMeta+Var2Data-boom met twee toewijzingen (uid 10 draagt timephased-data via de
  // vier categorieën, uid 20 draagt GEEN var-data van welke soort dan ook). Bewijst dat het openen
  // van Var2Data optioneel is (ontbreken ⇒ huidig gedrag: lege map) én dat de vier veld-id's via
  // de gewone data-gedreven field-map worden opgezocht (niet hardgecodeerd). ────────────────────
  {
    const asgFieldMapBytes = buildFieldMapEntryBytes([
      { typeValue: AssignmentFieldId.UniqueId, dataBlockOffset: 0, category: 3 },
      { typeValue: AssignmentFieldId.ActualRegularWork, dataBlockOffset: 65535, category: 8 },
      { typeValue: AssignmentFieldId.RemainingRegularWork, dataBlockOffset: 65535, category: 8 },
      { typeValue: AssignmentFieldId.ActualOvertimeWork, dataBlockOffset: 65535, category: 8 },
      { typeValue: AssignmentFieldId.ActualIrregularWork, dataBlockOffset: 65535, category: 8 },
    ]);
    const asgProps = new Props(encodePropsEntries([{ key: PROPSKEY_ASSIGNMENT_FIELD_MAP, data: asgFieldMapBytes }]), 'Z3-assignment-fieldmap');
    const asgFieldMap = createAssignmentFieldMap(asgProps);

    const actualRegularPayload = Uint8Array.of(1, 2, 3, 4);
    const remainingRegularPayload = Uint8Array.of(5, 6);
    const actualOvertimePayload = Uint8Array.of(7);
    const actualIrregularPayload = buildIrregularBlock([{ startTime: 0, startDays: 200, finishTime: 600, finishDays: 200 }]);

    const varMetaBytes = buildVarMetaBytes([
      { uniqueId: 10, type: AssignmentFieldId.ActualRegularWork, offset: 0 },
      { uniqueId: 10, type: AssignmentFieldId.RemainingRegularWork, offset: 4 + actualRegularPayload.length },
      { uniqueId: 10, type: AssignmentFieldId.ActualOvertimeWork, offset: 4 + actualRegularPayload.length + 4 + remainingRegularPayload.length },
      {
        uniqueId: 10,
        type: AssignmentFieldId.ActualIrregularWork,
        offset: 4 + actualRegularPayload.length + 4 + remainingRegularPayload.length + 4 + actualOvertimePayload.length,
      },
    ]);
    const var2DataBytes = buildVar2DataBytes(
      [
        { offset: 0, payload: actualRegularPayload },
        { offset: 4 + actualRegularPayload.length, payload: remainingRegularPayload },
        { offset: 4 + actualRegularPayload.length + 4 + remainingRegularPayload.length, payload: actualOvertimePayload },
        {
          offset: 4 + actualRegularPayload.length + 4 + remainingRegularPayload.length + 4 + actualOvertimePayload.length,
          payload: actualIrregularPayload,
        },
      ],
      4 + actualRegularPayload.length + 4 + remainingRegularPayload.length + 4 + actualOvertimePayload.length + 4 + actualIrregularPayload.length,
    );

    const cfb = new CfbFile(buildNestedCfb({
      '   114': {
        children: {
          TBkndAssn: {
            children: {
              VarMeta: { data: varMetaBytes },
              Var2Data: { data: var2DataBytes },
            },
          },
        },
      },
    }));

    const raw = readAssignmentTimephasedRaw(cfb, asgFieldMap);
    truthy('[Z3 raw] uid 10 aanwezig', raw.has(10));
    truthy('[Z3 raw] uid 20 (geen var-data) NIET aanwezig', !raw.has(20));
    const uid10 = raw.get(10);
    truthy('[Z3 raw] uid 10: actualRegularWork round-trip', !!uid10 && bytesEqual(uid10.actualRegularWork!, actualRegularPayload));
    truthy('[Z3 raw] uid 10: remainingRegularWork round-trip', !!uid10 && bytesEqual(uid10.remainingRegularWork!, remainingRegularPayload));
    truthy('[Z3 raw] uid 10: actualOvertimeWork round-trip', !!uid10 && bytesEqual(uid10.actualOvertimeWork!, actualOvertimePayload));
    truthy('[Z3 raw] uid 10: actualIrregularWork round-trip', !!uid10 && bytesEqual(uid10.actualIrregularWork!, actualIrregularPayload));
    truthy('[Z3 raw] uid 10: hasAnyTimephasedData === true', !!uid10 && hasAnyTimephasedData(uid10));

    // Rode-pad: TBkndAssn/VarMeta ontbreekt volledig ⇒ lege map, geen exceptie (optioneel,
    // ontbreken ⇒ huidig gedrag — precies wat de taakspecificatie eist).
    const cfbMissing = new CfbFile(buildNestedCfb({ '   114': { children: {} } }));
    const rawMissing = readAssignmentTimephasedRaw(cfbMissing, asgFieldMap);
    truthy('[Z3 rood] TBkndAssn/VarMeta ontbreekt ⇒ lege map, geen exceptie', rawMissing.size === 0);

    // Rode-pad: VarMeta aanwezig, Var2Data ontbreekt (legitiem — mppPrimitives.ts) ⇒ lege map.
    const cfbNoVar2 = new CfbFile(buildNestedCfb({
      '   114': { children: { TBkndAssn: { children: { VarMeta: { data: varMetaBytes } } } } },
    }));
    const rawNoVar2 = readAssignmentTimephasedRaw(cfbNoVar2, asgFieldMap);
    truthy('[Z3 rood] Var2Data ontbreekt (VarMeta wel aanwezig) ⇒ lege map, geen exceptie', rawNoVar2.size === 0);

    // Rode-pad: VarMeta-bytes te kort voor haar EIGEN header (5 bytes, VarMeta12 eist minimaal 24)
    // ⇒ `new VarMeta12(...)` gooit ECHT — dit is de fixture die `readAssignmentTimephasedRaw`'s
    // try/catch aantoonbaar door de catch-tak laat gaan (niet alleen de eerder-geretourneerde
    // guard-clauses hierboven), spiegelt het bestaande `readXUnsafe`-precedent.
    const cfbCorruptVarMeta = new CfbFile(buildNestedCfb({
      '   114': { children: { TBkndAssn: { children: { VarMeta: { data: new Uint8Array(5) }, Var2Data: { data: var2DataBytes } } } } },
    }));
    const rawCorrupt = readAssignmentTimephasedRaw(cfbCorruptVarMeta, asgFieldMap);
    truthy('[Z3 rood] VarMeta te kort voor haar eigen header ⇒ try/catch vangt, lege map, geen exceptie', rawCorrupt.size === 0);
  }

  // ── Acceptatiepunt 5 — corpusbrede telling + overlap-analyse tegen de 11 bekende timephased-
  // bestanden uit plan-§1.2. GEEN hard gepind getal (dat is baan M's fidelity-baseline-domein) —
  // deze sectie MEET en RAPPORTEERT, met dezelfde nette-skip-conventie als de rest van dit
  // bestand, en TOETST de overlap-eis uit de taakspecificatie: elk bestand dat
  // `mpp-fidelity-baseline.json` als "timephased/contour"-uitzondering pint, moet via déze
  // onafhankelijke lezer ook daadwerkelijk timephased-data dragen — anders is er iets mis met de
  // decoder of met de aanname, en moet dat gerapporteerd worden vóórdat verder gebouwd wordt. ────
  {
    const Z3_CORPUS = process.env.OPS_MPP_CORPUS ?? '/home/nozzit/open-aec/voor claude/test bestanden voor file implementation';
    const Z3_CRAWL = process.env.OPS_MPP_CRAWL ?? '/home/nozzit/open-aec/voor claude/testdata-crawl';

    function listMppFilesRecursiveZ3(dir: string): string[] {
      const out: string[] = [];
      const entries = readdirSync(dir, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
      for (const entry of entries) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) out.push(...listMppFilesRecursiveZ3(full));
        else if (entry.isFile() && entry.name.toLowerCase().endsWith('.mpp')) out.push(full);
      }
      return out;
    }

    // Bekende timephased/contour-uitzonderingen uit de gepinde fidelity-baseline (baan M se
    // bestand — hier ALLEEN gelezen, nooit gewijzigd). `reason` bevat "timephased" of "contour"
    // voor exact de werkstroom-(3)-bestanden uit plan-§1.2 (11 gemeten, zie het commitbericht).
    const knownTimephasedHashes = new Set<string>();
    try {
      // `import.meta.url`-relatief i.p.v. `process.cwd()` — zelfde conventie als
      // `check-mpp-fidelity.ts`'s `HERE`/`BASELINE_PATH` (dit bestand draait via esbuild → ESM,
      // geen CommonJS `__dirname` beschikbaar).
      const here = fileURLToPath(new URL('.', import.meta.url));
      const baseline = JSON.parse(readFileSync(join(here, 'mpp-fidelity-baseline.json'), 'utf8')) as {
        files: Record<string, { reason?: string }>;
      };
      for (const [hash, entry] of Object.entries(baseline.files)) {
        const reason = (entry.reason ?? '').toLowerCase();
        if (reason.includes('timephased') || reason.includes('contour')) knownTimephasedHashes.add(hash);
      }
    } catch {
      // baseline-bestand ontbreekt/onleesbaar ⇒ geen overlap-toetsing mogelijk, corpuslus hieronder
      // rapporteert dan zonder de kruiscontrole (skip, geen faal — de fixture-tests hierboven zijn
      // de harde poort).
    }

    let filesScanned = 0;
    let filesFailed = 0;
    let filesWithTimephasedData = 0;
    let assignmentsWithTimephasedData = 0;
    const foundHashes = new Set<string>();
    for (const root of [Z3_CORPUS, Z3_CRAWL]) {
      if (!existsSync(root)) continue;
      for (const file of listMppFilesRecursiveZ3(root)) {
        let bytes: Uint8Array;
        try {
          bytes = new Uint8Array(readFileSync(file));
        } catch {
          filesFailed++;
          continue;
        }
        const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 16);
        try {
          const { cfb, projectProps } = openMppProject(bytes);
          const assignmentFieldMap = createAssignmentFieldMap(projectProps);
          const raw = readAssignmentTimephasedRaw(cfb, assignmentFieldMap);
          filesScanned++;
          let hasAny = false;
          for (const entry of raw.values()) {
            if (hasAnyTimephasedData(entry)) {
              hasAny = true;
              assignmentsWithTimephasedData++;
            }
          }
          if (hasAny) {
            filesWithTimephasedData++;
            foundHashes.add(hash);
          }
        } catch {
          filesFailed++; // niet-MPP14/legacy/versleuteld e.d. — zelfde skip-conventie als Z2/T9
        }
      }
    }

    if (filesScanned === 0) {
      console.log(`OK  mpp-import: Z3 corpusbrede timephased-telling (${Z3_CORPUS} / ${Z3_CRAWL}) niet aanwezig — overgeslagen`);
    } else {
      truthy(`[Z3 corpustelling] minstens 1 bestand gescand (kreeg ${filesScanned})`, filesScanned > 0);
      if (knownTimephasedHashes.size > 0) {
        const missing = [...knownTimephasedHashes].filter((h) => !foundHashes.has(h));
        truthy(
          `[Z3 overlap] alle ${knownTimephasedHashes.size} bekende timephased/contour-bestanden uit de fidelity-baseline dragen via déze lezer ook timephased-data`
          + (missing.length > 0 ? ` (${missing.length} MIST: ${missing.join(', ')})` : ''),
          missing.length === 0,
        );
      }
      console.log(
        `OK  mpp-import: Z3 corpusbrede timephased-telling — ${filesScanned} bestand(en) gescand (${filesFailed} onleesbaar/overgeslagen), `
        + `${filesWithTimephasedData} bestand(en) met ≥1 toewijzing met timephased-data (${assignmentsWithTimephasedData} toewijzingen totaal), `
        + `${knownTimephasedHashes.size} bekend uit de fidelity-baseline (overlap hierboven getoetst)`,
      );
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// T9-crawl — end-to-end door de VOLLEDIGE readMPP() over het brede corpus (49 `.mpp`, submappen
// MSP2016_OzBuild/MSP2021_OzBuild): geen-crash-poort + gepind totaal-taakaantal +
// spooktaak-plausibiliteitsassert + (etappe 1.5) gepind uurmodus-taakaantal
// ═══════════════════════════════════════════════════════════════════════════════════════════
//
// UURMODUS-BEVINDING (etappe 1.5, 2026-08-15, VERRASSEND): alle 788 taken over dit HELE crawl-
// corpus komen uit `readMPP` in uur-modus (`durationMinutes` gezet) — niet alleen de twee expliciet
// als "intern urenproject" bekende ground-truth-bestanden. Dit is GEEN taak-signaal-lek: `check-
// mpp-calendars.ts`'s eigen "geen lek"-poort bewijst dat het taak-(c)-signaal op dit corpus NUL
// extra kalenderpromoties toevoegt t.o.v. discriminator (a)/(b) alleen (321/345 kalenders, op beide
// manieren gemeten identiek) — de (bijna-)universele uur-modus-status komt uitsluitend van MS
// Project's eigen standaard-"Standard"-kalender, die AL EEN LUNCHPAUZE-SPLITSING (08:00-12:00,
// 13:00-17:00 — twee banden per werkdag) draagt en dus al sinds T6 als discriminator-(a)-afwijking
// gold. Elk project dat die kalender ongewijzigd laat staan (verreweg de meeste, ook trainings-
// bestanden die nooit expliciet "uren-modus" claimen) wordt hierdoor als "uur-project" gelezen —
// exact dezelfde uitkomst als de ONGEWIJZIGDE `readMSPDI` al geeft voor een MSPDI-export van
// diezelfde kalender (zie ook de T5-sectie hierboven: Bijlage 13's eigen ground-truth leest al
// 51/51 taken in uur-modus). Dit weerlegt de oorspronkelijke aanname dat "dag-modus-bestanden"
// een aparte, veelvoorkomende categorie zouden zijn — in de praktijk (dit corpus) is een écht
// dag-modus-bestand (een kalender ZONDER lunchpauze-splitsing) de uitzondering, niet de regel.
// T6-crawl (check-mpp-calendars.ts, holidays) en T7-crawl (check-mpp-relations.ts, relaties/
// resources/assignments) bewijzen hun eigen domein al breed; deze sectie is de taken-tegenhanger
// ÉN — omdat ze `readMPP()` zonder enige sub-scope aanroept, het complete `ImportResult` in één
// keer — de enige plek die de VOLLEDIGE lezer (alle domeinen samen, exact het echte open-pad) over
// alle 49 crawl-bestanden haalt. Netjes overgeslagen zonder de map (OPS_MPP_CRAWL), zelfde
// skip-OK-conventie als de rest van dit bestand.
//
// BEVINDING (T9, gemeten op dit corpus): 4 van de 49 bestanden (`OzBuild Workshop 02.mpp` en
// `OzBuild Workshop 03.mpp`, elk in zowel `MSP2016_OzBuild` als `MSP2021_OzBuild`) leveren 0 taken
// op — géén leesfout, géén lege TBkndTask-storage, wél een expliciet gecontroleerde uitkomst:
// FixedMeta draagt daar precies 4 items, waarvan de eerste drie (per MPXJ-conventie, zie
// `FIRST_TASK_INDEX`) sowieso worden overgeslagen, en het vierde is uniqueID 0 — de
// projectsamenvattingstaak, die `readTasks` bewust weglaat (`if (uniqueId === 0) continue`, spiegelt
// mspdiReader's uid===0-skip). Deze vier bestanden dragen dus geen enkele echte taak (0 sequences,
// 0 assignments, alleen de vaste "Unassigned"-plaatshouderresource — geverifieerd, geen half
// leesresultaat) en zijn met aan zekerheid grenzende waarschijnlijkheid lege oefensjablonen uit de
// cursusreeks (Workshop 02/03 vóórdat de cursist taken toevoegt). Een hard "≥1 taak per bestand"
// (zoals de oorspronkelijke plantekst voorstelde) zou dus GEEN regressie in deze lezer bewijzen,
// maar het bestaan van legitieme lege bestanden bestraffen — deze sectie telt dat aantal daarom
// apart en pint het (`<=`, gemeten basislijn 4): een REGRESSIE die MEER bestanden ineens leeg
// oplevert (bv. een kapotte FixedMeta/FixedData-koppeling) faalt hier alsnog; deze vier bekende
// gevallen blokkeren de poort niet.
//
// PLAUSIBILITEITSASSERT (T9, bevinding uit de T5-spec-review — zie mppReader.ts's moduleheader
// "Twee VERDER niet-geporte MPXJ-kwaliteitsfilters"): deze lezer laat MPXJ's twee filters weg
// (het bijbehorende Fixed2Data-record moet niet-null zijn; de FixedData-recordlengte moet ≥75%
// van het werkelijke taakveld-maximum beslaan) — `collectValidTaskIndices` hierboven gebruikt een
// eenvoudigere validatie (verwijderd-vlag + null-taak-plaatshouder + spooktaak-check via VarMeta).
//
// EERLIJKE REIKWIJDTE (T9-review, mutatiegetoetst): de discriminator hieronder — GEEN naam (leeg
// na trim), duration 0, ÉN in geen enkele relatie van hetzelfde bestand — vangt uitsluitend een
// écht KAAL record: een taak zonder ENIG spoor van gebruikersinvoer. Getest door in-memory
// `DELETED_TASK_FLAG`-filtering uit te schakelen op een corpusbestand: het aantal gelezen taken
// steeg (788 → 853 over het hele corpus), maar de spooktaak-ratio bleef 0% — een "verwijderde"
// taak in dit corpus behoudt gewoon zijn oorspronkelijke naam/duur/relaties in het FixedData-
// record (alleen de vlag zegt dat 'm verwijderd is), dus die matcht het kale-record-profiel NOOIT.
// Dezelfde mutatie op de null-taak-plaatshouder-check werd uitsluitend gevangen door de T5-
// taakaantal-vergelijking tegen de MSPDI-ground-truth (die corpuspaar-sectie hierboven), niet door
// deze plausibiliteitsassert. Met andere woorden: deze assert is GEEN vervanging voor de exacte
// crawl-baselines hieronder (`CRAWL_TASK_COUNT_BASELINE`/`CRAWL_ZERO_TASK_FILES_BASELINE`, beide
// `===`) — DIE zijn de echte poort tegen een losgelaten of verzwakt filter (elke afwijking van het
// deterministische corpustotaal faalt hard, in beide richtingen). Wat de assert wél toevoegt,
// bovenop die exacte telling: een los-van-het-totaal, per-bestand signaal voor het ANDERE
// MPXJ-filter dat hier niet geport is (Fixed2Data/75%-heuristiek) — een taakrecord dat door de
// FixedMeta/FixedData-koppeling komt maar zelf leeg is (geen naam, geen duur, geen relatie) zou
// door dát filter wél geweerd worden, en is dus het patroon dat specifiek bij het NIET-porten van
// die 75%-heuristiek zou kunnen ontstaan. Budget: ≤2% verdachte taken per bestand — gemeten 0% op
// dit corpus; blijft als goedkope extra naast de exacte baselines, niet als vervanging ervan.
// Bestanden zonder taken (zie de bevinding hierboven) worden hier overgeslagen (0/0 zegt niets
// over plausibiliteit).
{
  const CRAWL = process.env.OPS_MPP_CRAWL ?? '/home/nozzit/open-aec/voor claude/testdata-crawl/crawl-mpp';
  if (!existsSync(CRAWL)) {
    console.log('OK  mpp-import: T9-crawl niet aanwezig (OPS_MPP_CRAWL) — crawlsectie overgeslagen');
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
      console.log(`OK  mpp-import: T9-crawl-map aanwezig maar geen .mpp-bestanden erin (${CRAWL}) — crawlsectie overgeslagen`);
    } else {
      // Gemeten basislijnen (2026-08-14, dit corpus, 49 bestanden, deze code): 788 taken totaal;
      // 4 bestanden zonder taken (legitiem, zie de bevinding hierboven). EXACT (`===`), NIET `>=`/
      // `<=` (T9-review, mutatiegetoetst — zie de plausibiliteitsassert-toelichting hierboven): het
      // taakaantal volgt DETERMINISTISCH uit dit vaste corpus + de huidige filter-semantiek in
      // `collectValidTaskIndices`, dus elke afwijking — in BEIDE richtingen — is een signaal. Een
      // losser filter (bv. `DELETED_TASK_FLAG` per ongeluk uitgeschakeld) telt MEER taken, niet
      // minder — gemeten 788 → 853 bij die specifieke mutatie — en een `>=`-baseline zou dat
      // straffeloos door laten glippen; een strenger filter telt er MINDER. Een bewuste wijziging
      // van de filter-semantiek (bv. het alsnog porten van MPXJ's Fixed2Data/75%-heuristiek, zie
      // mppReader.ts's moduleheader) moet deze twee getallen dan ook EXPLICIET bijwerken — precies
      // dán hoort deze poort af te gaan, ter herbevestiging van het nieuwe, bewust gekozen totaal.
      const CRAWL_TASK_COUNT_BASELINE = 788;
      const CRAWL_ZERO_TASK_FILES_BASELINE = 4;
      const SUSPECT_RATIO_BUDGET = 0.02; // zie de sectietoelichting hierboven
      // UURMODUS (etappe 1.5) — gemeten basislijn (2026-08-15, dit corpus): ALLE 788 taken komen uit
      // `readMPP` met `durationMinutes` gezet. GEEN "MPP-eigenaardigheid" — `check-mpp-calendars.ts`'s
      // eigen drift-pin (T6-crawl) meet dat dit uitsluitend komt van MS Project's standaard-
      // "Standard"-kalender (lunchpauze-splitsing, discriminator (a) — bestond al sinds T6): 321/345
      // kalenders zijn zowel MET als ZONDER het taak-(c)-signaal gepromoveerd.
      //
      // DRIFT-PIN, GEEN signaal-regressiepoort (uurmodus-review-correctie, R1): `===` vangt hier een
      // wijziging in de a/b-discriminator, de taakfilter (`collectValidTaskIndices`), of het corpus
      // zelf. Het vangt NIET specifiek een kapotte (c)-signaal-berekening (bv. de scalar-vóór-
      // promotie-`hoursPerDay` per ongeluk verwisseld voor de ná-promotie-waarde) — mutatietest
      // bevestigt dat zo'n mutatie deze telling op dit corpus ONGEWIJZIGD laat: alle 24 kalenders die
      // niet via (a)/(b) deviëren zijn nooit de effectieve kalender van een taak (0/24, alle 49
      // bestanden), dus het (c)-signaal beslist hier voor GEEN ENKELE taak mee over dag- vs
      // uur-modus. Deze poort bewaakt dus de a/b-kant van de discriminator plus de taakfilter, niet
      // de (c)-signaal-implementatie in `mppReader.ts`'s `readTasks` — die wordt gericht getest door
      // de synthetische fixtures verderop in dit bestand (zie "UURMODUS (etappe 1.5) — synthetische/
      // corpusloze end-to-end fixtures").
      const CRAWL_HOUR_TASK_BASELINE = 788;

      let totalTasks = 0;
      let totalHourTasks = 0;
      let readFailures = 0;
      let filesWithZeroTasks = 0;
      let totalSuspect = 0;
      const zeroTaskFiles: string[] = [];
      for (const file of crawlFiles) {
        let result: ReturnType<typeof readMPP>;
        try {
          result = readMPP(new Uint8Array(readFileSync(file)));
        } catch (err) {
          readFailures++;
          checks++;
          diffs.push(`[T9-crawl] readMPP gooide onverwacht op ${file}: ${err instanceof Error ? err.message : String(err)}`);
          continue;
        }
        totalTasks += result.tasks.length;
        totalHourTasks += result.tasks.filter((t) => t.time.durationMinutes != null).length;
        if (result.tasks.length === 0) {
          filesWithZeroTasks++;
          zeroTaskFiles.push(file);
          continue; // zie de bevinding hierboven — geen plausibiliteitsratio over 0 taken
        }

        // "In geen enkele relatie" = noch als voorganger, noch als opvolger in dit bestand.
        const linkedTaskIds = new Set<string>();
        for (const seq of result.sequences) {
          linkedTaskIds.add(seq.predecessorId);
          linkedTaskIds.add(seq.successorId);
        }
        const suspect = result.tasks.filter(
          (t) => t.name.trim() === '' && t.time.scheduleDuration === 0 && !linkedTaskIds.has(t.id),
        );
        totalSuspect += suspect.length;
        const ratio = suspect.length / result.tasks.length;
        truthy(
          `[T9-crawl] ${file}: spooktaak-verdachten binnen budget (${suspect.length}/${result.tasks.length} = ${(ratio * 100).toFixed(1)}% ≤ ${SUSPECT_RATIO_BUDGET * 100}%)`,
          ratio <= SUSPECT_RATIO_BUDGET,
        );
      }
      truthy(`[T9-crawl] geen leesfouten over ${crawlFiles.length} bestanden`, readFailures === 0);
      truthy(
        `[T9-crawl] taakloze bestanden exact op de gemeten basislijn (${filesWithZeroTasks}/${CRAWL_ZERO_TASK_FILES_BASELINE}, zie de bevinding hierboven)`,
        filesWithZeroTasks === CRAWL_ZERO_TASK_FILES_BASELINE,
      );
      truthy(
        `[T9-crawl] totaal-taakaantal exact op de gemeten basislijn (${totalTasks}/${CRAWL_TASK_COUNT_BASELINE})`,
        totalTasks === CRAWL_TASK_COUNT_BASELINE,
      );
      truthy(
        `[T9-crawl] uurmodus-taakaantal (durationMinutes gezet) exact op de gemeten basislijn (${totalHourTasks}/${CRAWL_HOUR_TASK_BASELINE}, zie de toelichting hierboven)`,
        totalHourTasks === CRAWL_HOUR_TASK_BASELINE,
      );
      console.log(
        `   . [T9-crawl] ${crawlFiles.length} bestanden: totaal ${totalTasks} taken (basislijn ${CRAWL_TASK_COUNT_BASELINE}), `
        + `${totalHourTasks} in uur-modus (basislijn ${CRAWL_HOUR_TASK_BASELINE}), `
        + `${filesWithZeroTasks} taakloos (basislijn ${CRAWL_ZERO_TASK_FILES_BASELINE}: ${zeroTaskFiles.map((f) => f.split('/').pop()).join(', ') || '—'}), `
        + `${totalSuspect} spooktaak-verdachten totaal (budget ${SUSPECT_RATIO_BUDGET * 100}% per bestand)`,
      );
    }
  }
}

// ── Uitslag ────────────────────────────────────────────────────────────────────────────────
// C3: dit blok is het ENIGE punt dat over pass/fail beslist — het kijkt altijd naar de volledige
// `diffs`, ongeacht of het corpus aanwezig was. Eerder deed de corpus-afwezig-tak een vroege
// `process.exit(0)` die de al gevulde `diffs` (uit de synthetische fixtures en de negatieve
// in-memory casus, die ALTIJD draaien) domweg negeerde — een echte regressie in de CFB-laag zelf
// zou zo op een corpusloze CI-machine onopgemerkt gebleven zijn.
if (diffs.length === 0) {
  console.log(`OK  mpp-import: alle checks groen (${checks} hard + ${softChecksTotal} budget-gedekt soft, zie softChecksTotal)`);
  process.exit(0);
} else {
  console.log(`XX  mpp-import: ${diffs.length} afwijking(en) van ${checks}`);
  for (const d of diffs) console.log(`   - ${d}`);
  process.exit(1);
}
