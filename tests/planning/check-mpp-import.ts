// MPP-import (fase 3.8 etappe 1, taak T3+): CFB/OLE2-container-regressie.
//
// Twee lagen dekking:
//  1. SYNTHETISCHE FIXTURES (deze module bouwt zelf minimale, geldige CFB-bytes) — draaien
//     ALTIJD, ook zonder corpus. Dit is de dekking die CI daadwerkelijk op de CFB-laag zelf
//     heeft: byte-exacte round-trip, de FAT/mini-stream-grens (4095 vs. 4096 bytes) en een reeks
//     vijandige varianten (afgekapt bestand, foute header, cyclische FAT, self-referencing
//     directory-child, sectornummer buiten bereik, een zelf-lussende DIFAT-sector gecombineerd
//     met een vijandig grote `numFatSectors`, en een N-niveaus-diepe duplicaat-sibling-keten) die
//     stuk voor stuk een nette `CFB:`-fout moeten geven (of, voor de laatste twee grensgevallen,
//     snel en veilig moeten slagen) — nooit een hang, geheugenexplosie of rauwe RangeError.
//  2. CORPUS-GEDREVEN structuurcheck tegen echte `.mpp`-bestanden. GEEN IN-REPO FIXTURE: het
//     corpus bestaat uit echte bedrijfsbestanden van de gebruiker die NOOIT in de repo mogen
//     komen — zowel omdat het geen testdata is die we mogen distribueren, als omdat er zonder
//     een MS Project-licentie geen licentieschoon `.mpp`-bestand te fabriceren is. Deze laag leest
//     ze dus via een pad buiten de repo (override met OPS_MPP_CORPUS). Op CI-machines (en bij elke
//     contributor zonder dat pad) is het corpus afwezig — die laag slaat dan netjes over, maar
//     (C3) beïnvloedt NOOIT de einduitslag: het eindoordeel hieronder kijkt altijd naar alle
//     verzamelde `diffs`, ook de synthetische-fixture- en negatieve-casusdiffs van hierboven.
//
// Deze check groeit mee met de latere MPP-taken (T4–T7 bouwen de container-/veldlagen erbovenop;
// T9 breidt 'm uit met een echt content-contract tegen de MSPDI-ground-truth). T3 zelf bewijst
// alleen dat de CFB-laag de bekende MPP14-containerstructuur foutloos — en veilig — oplevert.
//
// Draait via run.sh (binnen het RUN_HOLIDAYS-blok) en draait daarna ook 5x mee in de
// tijdzone-matrix — daarom bewust geen tijdzone-gevoelige logica hierin (geen Date-aanmaak voor
// domeinlogica; alleen bytes/structuur en — uitsluitend voor de tijdslimiet-bewaking hieronder —
// `Date.now()`-verschillen, die tijdzone-onafhankelijk zijn).
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { CfbFile } from '@/services/mpp/cfb';
import { detectMppVariant, assertReadable } from '@/services/mpp/mppContainer';
import { FixedMeta, FixedData } from '@/services/mpp/mppPrimitives';
import { MppUnsupportedError } from '@/services/mpp/errors';

const diffs: string[] = [];
let checks = 0;
const truthy = (label: string, cond: boolean) => {
  checks++;
  if (!cond) diffs.push(`${label}: verwacht waar, kreeg onwaar`);
};

const bytesEqual = (a: Uint8Array, b: Uint8Array): boolean =>
  a.length === b.length && a.every((v, i) => v === b[i]);

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
const SECTOR = 512;
const HEADER = 512;
const CFB_MAGIC = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1];

/** Bouwt een minimale, geldige CFB met twee streams: StreamA (4095 bytes — net onder de
 *  4096-mini-stream-cutoff, dus het mini-FAT-pad) en StreamB (4096 bytes — precies op de cutoff,
 *  dus het gewone-FAT-pad). Sectorlayout: 0=FAT, 1=directory, 2=mini-FAT, 3-10=root-ministream
 *  (StreamA's data, 8×512=4096 bytes), 11-18=StreamB's data (8×512=4096 bytes). */
function buildSyntheticCfb(): { bytes: Uint8Array; streamA: Uint8Array; streamB: Uint8Array } {
  const totalSectors = 19; // 0..18
  const buf = new ArrayBuffer(HEADER + totalSectors * SECTOR);
  const bytes = new Uint8Array(buf);
  const view = new DataView(buf);

  const streamA = new Uint8Array(4095);
  for (let i = 0; i < streamA.length; i++) streamA[i] = i & 0xff;
  const streamB = new Uint8Array(4096);
  for (let i = 0; i < streamB.length; i++) streamB[i] = (255 - (i & 0xff)) & 0xff;

  CFB_MAGIC.forEach((b, i) => (bytes[i] = b));
  view.setUint16(26, 3, true); // major version 3
  view.setUint16(30, 9, true); // sectorShift → 512
  view.setUint16(32, 6, true); // miniSectorShift → 64
  view.setUint32(44, 1, true); // numFatSectors
  view.setUint32(48, 1, true); // firstDirSector
  view.setUint32(56, 4096, true); // miniStreamCutoff
  view.setUint32(60, 2, true); // firstMiniFatSector
  view.setUint32(64, 1, true); // numMiniFatSectors
  view.setUint32(68, 0xfffffffe, true); // firstDifatSector = ENDOFCHAIN
  view.setUint32(72, 0, true); // numDifatSectors
  for (let i = 0; i < 109; i++) {
    view.setUint32(76 + i * 4, i === 0 ? 0 : 0xffffffff, true); // DIFAT[0] = sector 0 (FAT)
  }

  const sectorOff = (n: number) => HEADER + n * SECTOR;

  // Sector 0: FAT (128 u32-entries; alleen 0..18 zinvol, rest FREE)
  const fat = new Array<number>(128).fill(0xffffffff);
  fat[0] = 0xfffffffd; // FATSECT
  fat[1] = 0xfffffffe; // directory: één sector
  fat[2] = 0xfffffffe; // mini-FAT: één sector
  for (let s = 3; s <= 9; s++) fat[s] = s + 1; // root-ministream-keten 3→4→…→10
  fat[10] = 0xfffffffe;
  for (let s = 11; s <= 17; s++) fat[s] = s + 1; // StreamB-keten 11→…→18
  fat[18] = 0xfffffffe;
  fat.forEach((v, i) => view.setUint32(sectorOff(0) + i * 4, v, true));

  // Sector 1: directory — 4 entries van 128 bytes (Root, StreamA, StreamB, ongebruikt)
  const dirOff = sectorOff(1);
  const writeName = (entryBase: number, name: string) => {
    for (let c = 0; c < name.length; c++) view.setUint16(entryBase + c * 2, name.charCodeAt(c), true);
    view.setUint16(entryBase + 64, (name.length + 1) * 2, true);
  };
  // Entry 0: Root
  writeName(dirOff, 'Root Entry');
  view.setUint8(dirOff + 66, 5); // type root
  view.setUint32(dirOff + 68, 0xffffffff, true); // left
  view.setUint32(dirOff + 72, 0xffffffff, true); // right
  view.setUint32(dirOff + 76, 1, true); // child = StreamA
  view.setUint32(dirOff + 116, 3, true); // ministream start-sector
  view.setUint32(dirOff + 120, 4096, true); // ministream size
  // Entry 1: StreamA
  const e1 = dirOff + 128;
  writeName(e1, 'StreamA');
  view.setUint8(e1 + 66, 2);
  view.setUint32(e1 + 68, 0xffffffff, true);
  view.setUint32(e1 + 72, 2, true); // right = StreamB
  view.setUint32(e1 + 76, 0xffffffff, true);
  view.setUint32(e1 + 116, 0, true); // ministart-sector 0
  view.setUint32(e1 + 120, streamA.length, true);
  // Entry 2: StreamB
  const e2 = dirOff + 256;
  writeName(e2, 'StreamB');
  view.setUint8(e2 + 66, 2);
  view.setUint32(e2 + 68, 0xffffffff, true);
  view.setUint32(e2 + 72, 0xffffffff, true);
  view.setUint32(e2 + 76, 0xffffffff, true);
  view.setUint32(e2 + 116, 11, true); // sector 11
  view.setUint32(e2 + 120, streamB.length, true);
  // Entry 3: ongebruikt (alle bytes 0 ⇒ typeByte 0)

  // Sector 2: mini-FAT — 64 minisectoren van StreamA, keten 0→1→…→62→63=ENDOFCHAIN
  const mfOff = sectorOff(2);
  for (let i = 0; i < 64; i++) view.setUint32(mfOff + i * 4, i === 63 ? 0xfffffffe : i + 1, true);
  for (let i = 64; i < 128; i++) view.setUint32(mfOff + i * 4, 0xffffffff, true);

  // Sectoren 3-10: root-ministream = StreamA's bytes (laatste byte van sector 10 is padding)
  bytes.set(streamA, sectorOff(3));
  // Sectoren 11-18: StreamB
  bytes.set(streamB, sectorOff(11));

  return { bytes, streamA, streamB };
}

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

function expectCfbError(label: string, run: () => void): void {
  const start = Date.now();
  let threw = false;
  let message = '';
  try {
    run();
  } catch (err) {
    threw = true;
    message = err instanceof Error ? err.message : String(err);
  }
  const elapsedMs = Date.now() - start;
  truthy(`${label}: binnen tijdslimiet (${elapsedMs}ms < ${TIME_LIMIT_MS}ms)`, elapsedMs < TIME_LIMIT_MS);
  truthy(`${label}: gooit`, threw);
  truthy(`${label}: nette CFB-foutmelding (geen RangeError e.d.)`, message.startsWith('CFB:'));
}

// Afgekapt bestand: geknipt hálverwege de FAT-sector zelf (header blijft intact — die alleen zou
// de header-checks niet raken — maar sector 0 kan niet meer volledig gelezen worden). Halverwege
// het HELE bestand knippen bleek niet genoeg: header/FAT/directory/mini-FAT passen ruim in de
// eerste ~2 KB, dus de constructor zelf slaagt dan gewoon (de afgeknipte streamdata wordt pas
// gelezen bij een latere getStream()-aanroep, die deze test niet doet).
expectCfbError('I2 afgekapt bestand', () => {
  const truncated = synthetic.bytes.slice(0, HEADER + SECTOR / 2);
  void new CfbFile(truncated);
});

// Foute sectorShift voor de opgegeven major version (I3).
expectCfbError('I2 verkeerde sectorShift/version-combinatie', () => {
  const bad = new Uint8Array(synthetic.bytes);
  new DataView(bad.buffer).setUint16(30, 10, true); // major version 3 verwacht shift 9, niet 10
  void new CfbFile(bad);
});

// Cyclische FAT: de directory-sector (1) wijst naar zichzelf i.p.v. ENDOFCHAIN.
expectCfbError('I2 cyclische FAT', () => {
  const cyclic = new Uint8Array(synthetic.bytes);
  new DataView(cyclic.buffer).setUint32(HEADER + 1 * 4, 1, true); // FAT[1] = 1 (self-loop)
  void new CfbFile(cyclic);
});

// Sectornummer buiten bereik: StreamB's startsector wijst ver voorbij het bestand. De
// constructor zelf leest StreamB's inhoud nog niet (dat gebeurt pas on-demand in getStream), dus
// de fout valt daar.
expectCfbError('I2 sectornummer buiten bereik', () => {
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
expectCfbError('I2 DIFAT-zelflus + vijandig grote numFatSectors', () => {
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
const DIR_ENTRY = 128;

function buildDuplicateSiblingCfb(levels: number): Uint8Array {
  const dirSectors = Math.ceil(((levels + 1) * DIR_ENTRY) / SECTOR);
  const totalSectors = 1 + dirSectors; // sector 0 = FAT, sectoren 1..dirSectors = directory
  const buf = new ArrayBuffer(HEADER + totalSectors * SECTOR);
  const bytes = new Uint8Array(buf);
  const view = new DataView(buf);

  CFB_MAGIC.forEach((b, i) => (bytes[i] = b));
  view.setUint16(26, 3, true);
  view.setUint16(30, 9, true);
  view.setUint16(32, 6, true);
  view.setUint32(44, 1, true); // numFatSectors
  view.setUint32(48, 1, true); // firstDirSector
  view.setUint32(56, 4096, true); // miniStreamCutoff
  view.setUint32(60, 0xfffffffe, true); // firstMiniFatSector: geen mini-FAT nodig in deze fixture
  view.setUint32(64, 0, true); // numMiniFatSectors
  view.setUint32(68, 0xfffffffe, true); // firstDifatSector = ENDOFCHAIN
  view.setUint32(72, 0, true); // numDifatSectors
  for (let i = 0; i < 109; i++) view.setUint32(76 + i * 4, i === 0 ? 0 : 0xffffffff, true);

  const sectorOff = (n: number) => HEADER + n * SECTOR;

  // Sector 0: FAT — beschrijft zichzelf (FATSECT) en de geketende directory-sectoren 1..dirSectors.
  const fat = new Array<number>(128).fill(0xffffffff);
  fat[0] = 0xfffffffd;
  for (let s = 1; s <= dirSectors; s++) fat[s] = s === dirSectors ? 0xfffffffe : s + 1;
  fat.forEach((v, i) => view.setUint32(sectorOff(0) + i * 4, v, true));

  // Directory-entries liggen aaneengesloten vanaf sector 1 — dat spoort met de FAT-keten
  // hierboven, dus een simpele stride van DIR_ENTRY bytes is hier geoorloofd.
  const entryOffset = (idx: number) => sectorOff(1) + idx * DIR_ENTRY;
  const writeName = (base: number, name: string) => {
    for (let c = 0; c < name.length; c++) view.setUint16(base + c * 2, name.charCodeAt(c), true);
    view.setUint16(base + 64, (name.length + 1) * 2, true);
  };

  // Entry 0: root — child wijst naar entry 1, het begin van de duplicaat-keten.
  const rootBase = entryOffset(0);
  writeName(rootBase, 'Root Entry');
  view.setUint8(rootBase + 66, 5);
  view.setUint32(rootBase + 68, 0xffffffff, true);
  view.setUint32(rootBase + 72, 0xffffffff, true);
  view.setUint32(rootBase + 76, 1, true);

  // Entries 1..levels: streams (geen eigen kinderen nodig) waarvan left én right naar hetzelfde
  // volgende niveau wijzen.
  for (let i = 1; i <= levels; i++) {
    const base = entryOffset(i);
    writeName(base, `Dup${i}`);
    view.setUint8(base + 66, 2); // type stream
    const next = i < levels ? i + 1 : 0xffffffff;
    view.setUint32(base + 68, next, true); // left
    view.setUint32(base + 72, next, true); // right — zelfde id als left
    view.setUint32(base + 76, 0xffffffff, true); // child: n.v.t. voor een stream
    view.setUint32(base + 116, 0xfffffffe, true); // startSector: nooit gelezen in deze test
    view.setUint32(base + 120, 0, true); // size 0
  }

  return bytes;
}

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

function encodeAsciiWithTerminator(s: string): Uint8Array {
  const out = new Uint8Array(s.length + 1);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  out[s.length] = 0;
  return out;
}

/** Spiegelt CompObj.java: 28 filler-bytes, dan lengte-geprefixte ASCII-strings (elke lengte
 *  telt de null-terminator mee). We stoppen na `fileFormat` — de applicationID-lengte (0, dus
 *  "overslaan") sluit het blok consistent af. */
function encodeCompObjFileFormat(fileFormat: string): Uint8Array {
  const nameBytes = encodeAsciiWithTerminator('OPS synthetic'); // willekeurig, mits ≠ "Microsoft Project 4.0"
  const fmtBytes = encodeAsciiWithTerminator(fileFormat);
  const out = new Uint8Array(28 + 4 + nameBytes.length + 4 + fmtBytes.length + 4);
  const view = new DataView(out.buffer);
  let pos = 28;
  view.setInt32(pos, nameBytes.length, true);
  pos += 4;
  out.set(nameBytes, pos);
  pos += nameBytes.length;
  view.setInt32(pos, fmtBytes.length, true);
  pos += 4;
  out.set(fmtBytes, pos);
  pos += fmtBytes.length;
  view.setInt32(pos, 0, true); // applicationID-lengte: 0 ⇒ overslaan
  return out;
}

/** Spiegelt Props14.java: 16-byte header (headerCount @12) + één entry (lengte/sleutel/
 *  genegeerd/data). Precies genoeg om één PropsKey te dragen. */
function encodePropsSingleByteEntry(key: number, valueByte: number): Uint8Array {
  const out = new Uint8Array(16 + 12 + 1);
  const view = new DataView(out.buffer);
  view.setUint16(12, 1, true); // headerCount
  view.setInt32(16, 1, true); // attrib1: datalengte
  view.setInt32(20, key, true); // attrib2: sleutel
  view.setInt32(24, 0, true); // attrib3: genegeerd
  out[28] = valueByte;
  return out;
}

/** Bouwt een minimale, geldige CFB met twee ROOT-level streams (`nameA`/`nameB`), allebei via
 *  het mini-stream-pad. Generiek genoeg voor eender welke kleine (<4096 bytes) payload — niet
 *  hergebruikt de bestaande `buildSyntheticCfb` (die is toegesneden op de mini-/gewone-FAT-grens,
 *  niet op meerdere root-streams). */
function buildTwoRootStreamsCfb(nameA: string, dataA: Uint8Array, nameB: string, dataB: Uint8Array): Uint8Array {
  const MINI = 64;
  const minisectorsFor = (len: number) => Math.max(1, Math.ceil(len / MINI));
  const miniCountA = minisectorsFor(dataA.length);
  const miniCountB = minisectorsFor(dataB.length);
  if (miniCountA + miniCountB > 128) {
    throw new Error('buildTwoRootStreamsCfb: fixture te groot voor één mini-FAT-sector');
  }
  const ministreamBytes = (miniCountA + miniCountB) * MINI;
  const ministreamSectors = Math.max(1, Math.ceil(ministreamBytes / SECTOR));
  const totalSectors = 3 + ministreamSectors; // 0=FAT, 1=directory, 2=mini-FAT, 3..=root-ministream

  const buf = new ArrayBuffer(HEADER + totalSectors * SECTOR);
  const bytes = new Uint8Array(buf);
  const view = new DataView(buf);

  CFB_MAGIC.forEach((b, i) => (bytes[i] = b));
  view.setUint16(26, 3, true);
  view.setUint16(30, 9, true);
  view.setUint16(32, 6, true);
  view.setUint32(44, 1, true); // numFatSectors
  view.setUint32(48, 1, true); // firstDirSector
  view.setUint32(56, 4096, true); // miniStreamCutoff
  view.setUint32(60, 2, true); // firstMiniFatSector
  view.setUint32(64, 1, true); // numMiniFatSectors
  view.setUint32(68, 0xfffffffe, true); // firstDifatSector = ENDOFCHAIN
  view.setUint32(72, 0, true); // numDifatSectors
  for (let i = 0; i < 109; i++) view.setUint32(76 + i * 4, i === 0 ? 0 : 0xffffffff, true);

  const sectorOff = (n: number) => HEADER + n * SECTOR;

  // Sector 0: FAT
  const fat = new Array<number>(128).fill(0xffffffff);
  fat[0] = 0xfffffffd; // FATSECT
  fat[1] = 0xfffffffe; // directory: 1 sector
  fat[2] = 0xfffffffe; // mini-FAT: 1 sector
  for (let s = 3; s < 3 + ministreamSectors - 1; s++) fat[s] = s + 1;
  fat[3 + ministreamSectors - 1] = 0xfffffffe;
  fat.forEach((v, i) => view.setUint32(sectorOff(0) + i * 4, v, true));

  // Sector 1: directory — Root, entry A, entry B, ongebruikt.
  const dirOff = sectorOff(1);
  const writeName = (entryBase: number, name: string) => {
    for (let c = 0; c < name.length; c++) view.setUint16(entryBase + c * 2, name.charCodeAt(c), true);
    view.setUint16(entryBase + 64, (name.length + 1) * 2, true);
  };
  writeName(dirOff, 'Root Entry');
  view.setUint8(dirOff + 66, 5); // type root
  view.setUint32(dirOff + 68, 0xffffffff, true);
  view.setUint32(dirOff + 72, 0xffffffff, true);
  view.setUint32(dirOff + 76, 1, true); // child = entry A
  view.setUint32(dirOff + 116, 3, true); // ministream start-sector
  view.setUint32(dirOff + 120, ministreamBytes, true);

  const e1 = dirOff + 128;
  writeName(e1, nameA);
  view.setUint8(e1 + 66, 2); // type stream
  view.setUint32(e1 + 68, 0xffffffff, true);
  view.setUint32(e1 + 72, 2, true); // right = entry B
  view.setUint32(e1 + 76, 0xffffffff, true);
  view.setUint32(e1 + 116, 0, true); // ministart-sector 0
  view.setUint32(e1 + 120, dataA.length, true);

  const e2 = dirOff + 256;
  writeName(e2, nameB);
  view.setUint8(e2 + 66, 2);
  view.setUint32(e2 + 68, 0xffffffff, true);
  view.setUint32(e2 + 72, 0xffffffff, true);
  view.setUint32(e2 + 76, 0xffffffff, true);
  view.setUint32(e2 + 116, miniCountA, true); // ministart = na A's minisectoren
  view.setUint32(e2 + 120, dataB.length, true);
  // Entry 3: ongebruikt (alle bytes 0 ⇒ typeByte 0, buildTree slaat 'm over)

  // Sector 2: mini-FAT
  const mfOff = sectorOff(2);
  for (let i = 0; i < 128; i++) view.setUint32(mfOff + i * 4, 0xffffffff, true); // FREE default
  for (let i = 0; i < miniCountA; i++) {
    view.setUint32(mfOff + i * 4, i === miniCountA - 1 ? 0xfffffffe : i + 1, true);
  }
  for (let i = 0; i < miniCountB; i++) {
    const idx = miniCountA + i;
    view.setUint32(mfOff + idx * 4, i === miniCountB - 1 ? 0xfffffffe : idx + 1, true);
  }

  // Root-ministream: A's bytes gevolgd door B's bytes, elk op een minisector-grens (64 bytes).
  bytes.set(dataA, sectorOff(3));
  bytes.set(dataB, sectorOff(3) + miniCountA * MINI);

  return bytes;
}

// PASSWORD_FLAG=0 (onversleuteld): assertReadable gooit niet.
{
  const compObj = encodeCompObjFileFormat('MSProject.MPP14');
  const props14 = encodePropsSingleByteEntry(MPP_PASSWORD_FLAG_KEY, 0);
  const cfbBytes = buildTwoRootStreamsCfb('\x01CompObj', compObj, 'Props14', props14);
  let threw = false;
  let message = '';
  try {
    const cfb = new CfbFile(cfbBytes);
    truthy('T4 synthetisch MPP14 (wachtwoordvlag=0): detectMppVariant === MPP14', detectMppVariant(cfb) === 'MPP14');
    assertReadable(cfb);
  } catch (err) {
    threw = true;
    message = err instanceof Error ? err.message : String(err);
  }
  truthy('T4 synthetisch MPP14 (wachtwoordvlag=0): assertReadable gooit niet', !threw);
  if (threw) diffs.push(`T4 synthetisch MPP14 (wachtwoordvlag=0): onverwachte fout: ${message}`);
}

// PASSWORD_FLAG=1 (versleuteld): assertReadable gooit MppUnsupportedError met mppCode
// 'MPP_ENCRYPTED' — de acceptatiecriterium-casus uit T4 stap 4/5.
{
  const compObj = encodeCompObjFileFormat('MSProject.MPP14');
  const props14 = encodePropsSingleByteEntry(MPP_PASSWORD_FLAG_KEY, 1);
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
  truthy('T4 synthetisch MPP14 (wachtwoordvlag=1): assertReadable gooit', threw);
  truthy('T4 synthetisch MPP14 (wachtwoordvlag=1): gooit MppUnsupportedError', isMppUnsupported);
  truthy("T4 synthetisch MPP14 (wachtwoordvlag=1): mppCode === 'MPP_ENCRYPTED'", mppCode === 'MPP_ENCRYPTED');
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
        const taskFixedDataParsed = FixedData.fromMeta(taskFixedMeta, taskFixedData);
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
