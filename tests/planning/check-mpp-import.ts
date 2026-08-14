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
  getUnicodeString, getTimestamp, getGUID, getDuration,
  type MppTimeUnit,
} from '@/services/mpp/mppPrimitives';
import { MppUnsupportedError } from '@/services/mpp/errors';
import {
  SECTOR, HEADER,
  buildSyntheticCfb, buildDuplicateSiblingCfb, buildTwoRootStreamsCfb,
  encodeCompObjFileFormat, encodePropsEntries, encodePropsSingleByteEntry,
  expectCfbError, expectMppError, bytesEqual,
} from './mppFixtures';

const diffs: string[] = [];
let checks = 0;
const truthy = (label: string, cond: boolean) => {
  checks++;
  if (!cond) diffs.push(`${label}: verwacht waar, kreeg onwaar`);
};

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

// ── Uitslag ────────────────────────────────────────────────────────────────────────────────
// C3: dit blok is het ENIGE punt dat over pass/fail beslist — het kijkt altijd naar de volledige
// `diffs`, ongeacht of het corpus aanwezig was. Eerder deed de corpus-afwezig-tak een vroege
// `process.exit(0)` die de al gevulde `diffs` (uit de synthetische fixtures en de negatieve
// in-memory casus, die ALTIJD draaien) domweg negeerde — een echte regressie in de CFB-laag zelf
// zou zo op een corpusloze CI-machine onopgemerkt gebleven zijn.
if (diffs.length === 0) {
  console.log(`OK  mpp-import: alle checks groen (${checks})`);
  process.exit(0);
} else {
  console.log(`XX  mpp-import: ${diffs.length} afwijking(en) van ${checks}`);
  for (const d of diffs) console.log(`   - ${d}`);
  process.exit(1);
}
