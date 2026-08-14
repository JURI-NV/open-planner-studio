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
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { CfbFile } from '@/services/mpp/cfb';
import { detectMppVariant, assertReadable, Props } from '@/services/mpp/mppContainer';
import {
  FixedMeta, FixedData, VarMeta12, Var2Data,
  getUnicodeString, getTimestamp, getGUID, getDuration, getDate, getTime, getDurationTimeUnits,
  type MppTimeUnit,
} from '@/services/mpp/mppPrimitives';
import { MppUnsupportedError } from '@/services/mpp/errors';
import {
  SECTOR, HEADER,
  buildSyntheticCfb, buildDuplicateSiblingCfb, buildTwoRootStreamsCfb, buildNestedCfb,
  encodeCompObjFileFormat, encodePropsEntries, encodePropsSingleByteEntry,
  expectCfbError, expectMppError, bytesEqual,
  type CfbTreeNode,
} from './mppFixtures';
import { readMPP, assignHierarchyAndWbs, clampOutlineLevel, MAX_OUTLINE_LEVEL, MAX_VAR_TEXT_BYTES } from '@/services/mpp/mppReader';
import { readCalendars, parseExceptions, MAX_CALENDAR_EXCEPTIONS, MAX_HOLIDAY_RANGE_DAYS } from '@/services/mpp/mppCalendars';
import { readMSPDI } from '@/services/msproject/mspdiReader';
import { installDOMParser } from './xmldom-shim';
import { formatDate } from '@/utils/dateUtils';
import type { Task } from '@/types/task';
import {
  createTaskFieldMap, createResourceFieldMap, createAssignmentFieldMap,
  TaskFieldId, ResourceFieldId, AssignmentFieldId,
  fixedOffsetOf, varDataKeyOf,
} from '@/services/mpp/fieldMap14';

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

/** Bouwt rauwe VarMeta12-bytes: 24-byte header (magic + itemCount + dataSize) + N entries van
 *  12 bytes (uniqueID/offset/type/onbekend). */
function buildVarMetaBytes(entries: { uniqueId: number; offset: number; type: number }[], itemCountClaim = entries.length, dataSize = 0): Uint8Array {
  const out = new Uint8Array(24 + entries.length * 12);
  const view = new DataView(out.buffer);
  view.setUint32(0, FIXED_META_MAGIC, true); // VarMeta12 deelt hetzelfde magic-getal als FixedMeta
  view.setInt32(8, itemCountClaim, true);
  view.setUint32(20, dataSize, true);
  let pos = 24;
  for (const e of entries) {
    view.setInt32(pos, e.uniqueId, true);
    view.setInt32(pos + 4, e.offset, true);
    view.setUint16(pos + 8, e.type, true);
    pos += 12;
  }
  return out;
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

// ── T6: TBkndCal-fixturebouwers (moduleniveau — gedeeld tussen het I4-end-to-end-blok hieronder
// en de T6-hostile-tests verderop in dit bestand). PropsKey-/var-data-typeconstanten. ────────────
const CAL_DEFAULT_CALENDAR_NAME_KEY = 37748750;
const CAL_NAME_TYPE = 1;
const CAL_DATA_TYPE = 8;

function buildCalFixedMetaBlob(offsets: number[]): Uint8Array {
  const out = new Uint8Array(16 + offsets.length * 10);
  const view = new DataView(out.buffer);
  view.setUint32(0, FIXED_META_MAGIC, true);
  view.setInt32(8, offsets.length, true);
  offsets.forEach((offsetIntoFixedData, i) => view.setInt32(16 + i * 10 + 4, offsetIntoFixedData, true));
  return out;
}

/** Eén TBkndCal/FixedData-record (12 bytes): calendarID@0/baseCalendarID@4/resourceID@8 — de
 *  ≤2010-veldlayout (`MPP14CalendarFactory.java`'s `else`-tak), want de fixtures hier gebruiken
 *  allemaal een CompObj-applicationName die `detectApplicationVersion`'s patroon niet matcht (net
 *  als de taakfixture hieronder al voor de milestone-bit-tabel documenteert) ⇒
 *  `applicationVersion === null` ⇒ `useModernOffsets === false` in `mppCalendars.ts`. */
function buildCalFixedDataRecord(calendarId: number, baseCalendarId: number, resourceId: number): Uint8Array {
  const out = new Uint8Array(12);
  const view = new DataView(out.buffer);
  view.setInt32(0, calendarId, true);
  view.setInt32(4, baseCalendarId, true);
  view.setInt32(8, resourceId, true);
  return out;
}

/** Eén weekdag-blok (60 bytes) binnen een TBkndCal-kalenderdatablob — spiegelt
 *  `AbstractCalendarFactory.processCalendarHours`'s per-dag-lay-out (`mppCalendars.ts`'s
 *  `resolveOneDay`). `defaultFlag: 1` ⇒ "gebruik de default/base" (leeg `bands` genegeerd);
 *  anders expliciete banden (leeg ⇒ niet-werkend). */
function writeCalDayBlock(view: DataView, dayOffset: number, opts: { defaultFlag?: 0 | 1; bands?: { startMinutes: number; durationMinutes: number }[] }): void {
  view.setInt16(dayOffset, opts.defaultFlag ?? 0, true);
  const bands = opts.bands ?? [];
  view.setInt16(dayOffset + 2, bands.length, true);
  bands.forEach((b, i) => {
    view.setInt16(dayOffset + 8 + i * 2, b.startMinutes * 10, true); // tienden-van-minuut
    view.setInt16(dayOffset + 20 + i * 4, b.durationMinutes * 10, true);
  });
}

/** De volledige 420-byte werkuren-sectie (7×60 bytes, index 0=zo..6=za — MPP-dagblokvolgorde,
 *  zie `mppCalendars.ts`'s `resolveOneDay`-toelichting). */
function buildCalHoursBlock(days: { defaultFlag?: 0 | 1; bands?: { startMinutes: number; durationMinutes: number }[] }[]): Uint8Array {
  const out = new Uint8Array(420);
  const view = new DataView(out.buffer);
  days.forEach((d, i) => writeCalDayBlock(view, i * 60, d));
  return out;
}

/** De uitzonderingen-staart (`AbstractCalendarAndExceptionFactory.processCalendarExceptions`) —
 *  wordt ná het 420-byte urenblok geplakt. Elke uitzondering hier is bewust NIET-recurrent
 *  (`recurrenceTypeValue=1` DAILY met `frequency@76=1` ⇒ MPXJ's eigen "vlak af tot een gewoon
 *  bereik"-geval, zie `mppCalendars.ts`'s `parseExceptions`) en NIET-werkend (`periodCount=0`),
 *  TENZIJ `nonFlattened` gezet is (voor de recurrentie-skip-regressie hieronder). */
function buildCalExceptionsTail(exceptions: { fromDay: number; toDay: number; nonFlattened?: boolean }[]): Uint8Array {
  const bodyLen = exceptions.length * 92; // geen namen in deze fixture ⇒ exceptionNameLength altijd 0
  const out = new Uint8Array(4 + bodyLen);
  const view = new DataView(out.buffer);
  view.setInt16(0, exceptions.length, true); // exceptionCount (blob-offset 420)
  let pos = 4;
  for (const exc of exceptions) {
    view.setInt16(pos, exc.fromDay, true);
    view.setInt16(pos + 2, exc.toDay, true);
    view.setInt16(pos + 14, 0, true); // periodCount = 0 ⇒ niet-werkend
    view.setInt16(pos + 72, exc.nonFlattened ? 2 : 1, true); // 2=YEARLY (recurrent) vs. 1=DAILY
    view.setInt16(pos + 76, 1, true); // frequency = 1 ⇒ (voor recurrenceTypeValue=1) geflattened
    view.setInt32(pos + 88, 0, true); // exceptionNameLength = 0 (geen naam)
    pos += 92;
  }
  return out;
}

function concatBytes(...parts: Uint8Array[]): Uint8Array {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let pos = 0;
  for (const p of parts) {
    out.set(p, pos);
    pos += p.length;
  }
  return out;
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

  // ── T6: TBkndCal-fixture — één basiskalender (calId=1, ma-vr 08:00-17:00) + één afgeleide
  // kalender (calId=5, ALLE dagen defaultFlag=1 ⇒ volledig geërfd van de base, plus één eigen
  // uitzondering/holiday) — calId=5 is BEWUST hetzelfde uniqueID als `Child1`'s
  // `calendarUniqueId: 5` hierboven, zodat dit tegelijk de taak→kalender-koppeling bewijst.
  // `DEFAULT_CALENDAR_NAME_KEY` (project-props) wijst naar calId=1, zodat ook het naam-gebaseerde
  // projectkalender-lookuppad (i.p.v. alleen de eerste-basiskalender-terugval) hier meeloopt.
  // (De bouwers zelf — `buildCalFixedMetaBlob`/`buildCalFixedDataRecord`/`buildCalHoursBlock`/
  // `buildCalExceptionsTail`/`concatBytes` — staan op moduleniveau, zie boven deze `{}`-blok: de
  // T6-hostile-tests verderop in dit bestand hebben ze ook nodig.) ─────────────────────────────
  // ma-vr 08:00-17:00 (9 uur), za/zo niet-werkend, GEEN eigen uitzonderingen.
  const HOLIDAY_FROM_DAY = 15005; // MPP-epoch-dagen — willekeurig maar deterministisch
  const baseHours = buildCalHoursBlock([
    { defaultFlag: 0 }, // zo
    { defaultFlag: 0, bands: [{ startMinutes: 480, durationMinutes: 540 }] }, // ma
    { defaultFlag: 0, bands: [{ startMinutes: 480, durationMinutes: 540 }] }, // di
    { defaultFlag: 0, bands: [{ startMinutes: 480, durationMinutes: 540 }] }, // wo
    { defaultFlag: 0, bands: [{ startMinutes: 480, durationMinutes: 540 }] }, // do
    { defaultFlag: 0, bands: [{ startMinutes: 480, durationMinutes: 540 }] }, // vr
    { defaultFlag: 0 }, // za
  ]);
  // Volledig "default" (alle 7 dagen erven van de base) + één eigen holiday-uitzondering.
  const derivedHours = concatBytes(
    buildCalHoursBlock([1, 1, 1, 1, 1, 1, 1].map(() => ({ defaultFlag: 1 as const }))),
    buildCalExceptionsTail([{ fromDay: HOLIDAY_FROM_DAY, toDay: HOLIDAY_FROM_DAY }]),
  );

  const calFixedMetaBlob = buildCalFixedMetaBlob([0, 12]);
  const calFixedDataBlob = concatBytes(
    buildCalFixedDataRecord(1, 1, -1), // calId=1: base (baseId===zichzelf), geen resource
    buildCalFixedDataRecord(5, 1, 1), // calId=5: afgeleid van 1, resource 1 — matcht Child1's calendarUniqueId
  );
  const CAL_NAME1_OFF = 0;
  const CAL_DATA1_OFF = 100;
  const CAL_NAME5_OFF = 600;
  const CAL_DATA5_OFF = 700;
  const calVarMetaBytes = buildVarMetaBytes([
    { uniqueId: 1, type: CAL_NAME_TYPE, offset: CAL_NAME1_OFF },
    { uniqueId: 1, type: CAL_DATA_TYPE, offset: CAL_DATA1_OFF },
    { uniqueId: 5, type: CAL_NAME_TYPE, offset: CAL_NAME5_OFF },
    { uniqueId: 5, type: CAL_DATA_TYPE, offset: CAL_DATA5_OFF },
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
    { key: CAL_DEFAULT_CALENDAR_NAME_KEY, data: encodeUnicodeStringAscii('Standaard fixture') },
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

      // ── T6: kalenders — projectkalender (calId=1, via DEFAULT_CALENDAR_NAME-lookup), afgeleide
      // kalender (calId=5, geërfde werkdagen + eigen holiday) en de taak→kalender-koppeling
      // (Child1.calendarUniqueId===5). ──────────────────────────────────────────────────────────
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
          const dayBytes = new Uint8Array(2);
          new DataView(dayBytes.buffer).setUint16(0, HOLIDAY_FROM_DAY, true);
          const expectedDate = getDate(dayBytes, 0);
          const expectedIso = expectedDate ? formatDate(expectedDate) : '';
          truthy('I4/T6 end-to-end readMPP: holiday-startdatum === HOLIDAY_FROM_DAY', derived.holidays[0].startDate === expectedIso);
          truthy('I4/T6 end-to-end readMPP: holiday is een 1-dags bereik (start===end)', derived.holidays[0].startDate === derived.holidays[0].endDate);
        }
        truthy('I4/T6 end-to-end readMPP: Child1.calendarId === de afgeleide kalender (calendarUniqueId=5)', child1.calendarId === derived.id);
      }
      truthy(
        'I4/T6 end-to-end readMPP: taken zonder taak-kalender-override (-1) hebben calendarId undefined',
        root.calendarId === undefined && clampDeep1.calendarId === undefined && child2.calendarId === undefined && grandchild.calendarId === undefined,
      );
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// T6-hostile: mppCalendars.ts tegen vijandige/geprepareerde invoer
// ═══════════════════════════════════════════════════════════════════════════════════════════

// ── Circulaire base-kalender-verwijzing: calId=10 verwijst naar base 20, calId=20 naar base 10 —
// GEEN van beide is ooit een "echte" basiskalender (baseId<=0 of ===zichzelf), dus beide belanden
// in `readCalendars`' Fase 2 (afgeleide kalenders) en verwijzen alleen naar elkaar. Zonder
// `MAX_BASE_CHAIN_DEPTH` zou de fixed-point-resolutie hier oneindig kunnen doorlopen (geen van
// beide wordt ooit "opgelost" via de normale route) — bewijst dat de lus na een begrensd aantal
// ronden stopt en BEIDE kalenders alsnog materialiseert (zonder overerving, zie de toelichting bij
// `MAX_BASE_CHAIN_DEPTH` in mppCalendars.ts), i.p.v. te hangen of ze stilzwijgend te laten vallen.
{
  const fixedMeta = buildCalFixedMetaBlob([0, 12]);
  const fixedData = concatBytes(
    buildCalFixedDataRecord(10, 20, -1),
    buildCalFixedDataRecord(20, 10, -1),
  );
  const varMeta = buildVarMetaBytes([]); // geen namen/uren nodig — puur de circulaire-keten-bescherming
  const projectProps = new Props(encodePropsEntries([]), 'T6-hostile-circular');

  const cfb = new CfbFile(buildNestedCfb({
    '   114': {
      children: {
        TBkndCal: {
          children: {
            FixedMeta: { data: fixedMeta },
            FixedData: { data: fixedData },
            VarMeta: { data: varMeta },
          },
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
  truthy(`T6-hostile circulaire base-keten: binnen tijdslimiet (${elapsedMs}ms < ${TIME_LIMIT_MS}ms)`, elapsedMs < TIME_LIMIT_MS);
  truthy(`T6-hostile circulaire base-keten: gooit niet (${threw ?? ''})`, threw === null);
  truthy('T6-hostile circulaire base-keten: beide kalenders alsnog gematerialiseerd', result?.calendarByUniqueId.size === 2);
}

// ── Extreem exception-aantal: `exceptionCount` claimt 60.000 (ver voorbij het SHORT-praktijk-
// gebruik), tegen een buffer die daadwerkelijk 5.000 geldige 92-byte-uitzonderingsrecords draagt
// (460.000 bytes) — bewijst dat `MAX_CALENDAR_EXCEPTIONS` de materialisatie klemt op 2000, ONGEACHT
// hoeveel geldige records de buffer daadwerkelijk aanbiedt (dus niet alleen de "buffer raakt op"-
// afbreek-conditie, die hier NIET zou triggeren — er is fysiek genoeg data voor alle 5000). ────────
{
  const EXTREME_COUNT = 5000;
  const exceptions = Array.from({ length: EXTREME_COUNT }, (_, i) => ({ fromDay: 10000 + i, toDay: 10000 + i }));
  const hoursBlock = buildCalHoursBlock(Array.from({ length: 7 }, () => ({ defaultFlag: 0 as const })));
  const tail = buildCalExceptionsTail(exceptions);
  const view = new DataView(tail.buffer);
  view.setInt16(0, 60000, true); // exceptionCount-claim (ver voorbij wat de buffer daadwerkelijk draagt qua CLAIM, al draagt de buffer zelf wél 5000 échte records)
  const data = concatBytes(hoursBlock, tail);

  const start = Date.now();
  let holidays: ReturnType<typeof parseExceptions> = [];
  let threw: string | null = null;
  try {
    holidays = parseExceptions(data, 'T6-hostile-exception-count');
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

// ── Extreem bereik (range-lengte): één uitzondering van dag 0 tot dag 65534 (~179 jaar, het
// SHORT-bereik van MPPUtility.getDate) — bewijst dat `MAX_HOLIDAY_RANGE_DAYS` het gematerialiseerde
// bereik klemt (i.p.v. `CalendarEngine.buildHolidaySet()` dag-voor-dag ~65534 Set-entries te laten
// maken, zie de toelichting bij `MAX_HOLIDAY_RANGE_DAYS` in mppCalendars.ts). ─────────────────────
{
  const hoursBlock = buildCalHoursBlock(Array.from({ length: 7 }, () => ({ defaultFlag: 0 as const })));
  const tail = buildCalExceptionsTail([{ fromDay: 0, toDay: 65534 }]);
  const data = concatBytes(hoursBlock, tail);
  const holidays = parseExceptions(data, 'T6-hostile-range');
  truthy('T6-hostile extreem bereik: precies 1 holiday gematerialiseerd', holidays.length === 1);
  if (holidays.length === 1) {
    const days = Math.round((new Date(holidays[0].endDate).getTime() - new Date(holidays[0].startDate).getTime()) / 86_400_000);
    truthy(
      `T6-hostile extreem bereik: geklemd op MAX_HOLIDAY_RANGE_DAYS (${days + 1}/${MAX_HOLIDAY_RANGE_DAYS} dagen)`,
      days + 1 === MAX_HOLIDAY_RANGE_DAYS,
    );
  }
}

// ── Recurrente (niet-geflattende) uitzondering: `recurrenceTypeValue=2` (YEARLY) — bewijst dat
// zo'n uitzondering bewust NIET gematerialiseerd wordt (zie `parseExceptions`'s moduleheader:
// `fromDate`/`toDate` zijn dan een recurrentievenster, geen enkele feestdagdatum) i.p.v. per ongeluk
// een meerjarig "feestdag"-bereik op te leveren. ────────────────────────────────────────────────
{
  const hoursBlock = buildCalHoursBlock(Array.from({ length: 7 }, () => ({ defaultFlag: 0 as const })));
  const tail = buildCalExceptionsTail([{ fromDay: 10000, toDay: 10100, nonFlattened: true }]);
  const data = concatBytes(hoursBlock, tail);
  const holidays = parseExceptions(data, 'T6-hostile-recurring');
  truthy('T6-hostile recurrente uitzondering: NIET gematerialiseerd (0 holidays)', holidays.length === 0);
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
    'Bijlage 13 Productieplanning.mpp': { start: 12, finish: 12, duration: 5, outlineDepth: 5, constraintDate: 0 },
    'Bijlage 20 productieplanning PKB.mpp': { start: 95, finish: 96, duration: 7, outlineDepth: 2, constraintDate: 0 },
    'bijlage 7 Productie planning.mpp': { start: 53, finish: 53, duration: 10, outlineDepth: 5, constraintDate: 2 },
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
      const softChecks: [keyof FieldDiffBudget, string, boolean][] = [
        ['start', 'start (dag-prefix)', mppTask.time.scheduleStart.slice(0, 10) === xmlTask.time.scheduleStart.slice(0, 10)],
        ['finish', 'finish (dag-prefix)', mppTask.time.scheduleFinish.slice(0, 10) === xmlTask.time.scheduleFinish.slice(0, 10)],
        // Ground-truth-duur kan fractioneel zijn (uur-modus) — dag-modus vergelijkt afgerond.
        ['duration', 'duur in dagen', mppTask.time.scheduleDuration === Math.round(xmlTask.time.scheduleDuration)],
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
// T6 — kalenders: readMPP vs. de MSPDI-ground-truth (structureel) + gemeten holiday-budget
// ═══════════════════════════════════════════════════════════════════════════════════════════
//
// ⚠️ Zelfde documentversie-waarschuwing als de T5-sectie hierboven (plan-banner, 2026-08-14):
// kalender-AANTALLEN (13/11/9 in het plan) zijn NIET gezaghebbend voor de `.mpp`'s — dus GEEN harde
// eis op het aantal kalenders, alleen structurele eigenschappen (≥1 kalender; de projectkalender
// bestaat en heeft ≥1 werkdag). `workDays` bleek bij meting WÉL 100% stabiel (alle drie bestanden:
// ma-vr, identiek aan de MSPDI-ground-truth) — dat is een structurele kalendereigenschap die het
// documentversieverschil niet raakt, en is daarom een harde assert, geen budget.
//
// Holiday-BEVINDING (2026-08-14, byte-voor-byte onderzocht — zie `mppCalendars.ts`'s Fase-1-
// toelichting): de "Standaard"-basiskalender in alle drie `.mpp`'s draagt in de PRAKTIJK GEEN
// enkele uitzondering. Bijlage 13's CALENDAR_DATA-var-data ontbreekt zelfs volledig (de project-
// brede DEFAULT_CALENDAR_HOURS-substitutie treedt in werking — zelf exact 420 bytes, dus zonder
// uitzonderingen-sectie); Bijlage 20 en bijlage 7 hebben wél eigen CALENDAR_DATA (428 bytes — exact
// genoeg voor een `exceptionCount`-header, maar géén enkel 92-byte-record erachter). MPXJ zelf zou,
// deze exacte bytes lezend, dus OOK op 0 holidays uitkomen — dit is geen gat in deze lezer, maar een
// eigenschap van het bronbestand. De MSPDI-ground-truth draagt wél 29 feestdagen (NL-feestdagenset)
// — hetzelfde documentversieverschil dat de T5-sectie al vaststelde (de holidays zijn kennelijk in
// een LATERE revisie aan de kalender toegevoegd). Gemeten basislijn: 29 op alle drie bestanden.
if (corpusPresent) {
  const HOLIDAY_DIFF_BUDGET: Record<string, number> = {
    'Bijlage 13 Productieplanning.mpp': 29,
    'Bijlage 20 productieplanning PKB.mpp': 29,
    'bijlage 7 Productie planning.mpp': 29,
  };

  for (const file of Object.keys(HOLIDAY_DIFF_BUDGET)) {
    if (!corpusFiles.includes(file)) {
      console.log(`OK  mpp-import: T6 ${file} niet in dit corpus (${CORPUS}) — overgeslagen`);
      continue;
    }
    const mppPath = join(CORPUS, file);
    const xmlPath = `${mppPath}.xml`;
    if (!existsSync(xmlPath)) continue; // al gemeld door de T5-sectie hierboven (diffs.push)

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

    const budget = HOLIDAY_DIFF_BUDGET[file];
    const holidayDiff = Math.abs(mppResult.calendar.holidays.length - xmlResult.calendar.holidays.length);
    truthy(
      `[T6 ${file}] holiday-aantalverschil met de MSPDI-ground-truth binnen bekende basislijn (${holidayDiff}/${budget}, documentversieverschil — zie boven)`,
      holidayDiff <= budget,
    );

    console.log(
      `   . [T6 ${file}] kalenders=${mppCalCount} (aantal NIET gezaghebbend, zie moduleheader) `
      + `projectkalender="${mppResult.calendar.name}" workDays=${JSON.stringify(mppResult.calendar.workDays)} `
      + `holidays=${mppResult.calendar.holidays.length}/${xmlResult.calendar.holidays.length} (ground truth):`,
    );
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
