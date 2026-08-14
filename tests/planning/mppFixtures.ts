// Gedeelde synthetische-CFB/MPP-fixturebouwers voor de `tests/planning/check-mpp-import.ts`-
// familie (fase 3.8 etappe 1). M6 (kwaliteitsreview op T4): de headerwriter + de directory-
// naamschrijver stonden 3× met de hand herhaald in `check-mpp-import.ts` (T3's `buildSyntheticCfb`
// en `buildDuplicateSiblingCfb`, T4's `buildTwoRootStreamsCfb`) — hier één keer, zodat T5–T9 (die
// eigen backend-storage-boompjes gaan fabriceren voor TBkndTask/TBkndCal/TBkndCons/TBkndRsc/
// TBkndAssn) daarop kunnen voortbouwen i.p.v. de CFB-headerboilerplate opnieuw uit te schrijven.
//
// Structuurkennis: zie `src/services/mpp/cfb.ts` (MS-CFB-specificatie) en
// `src/services/mpp/mppContainer.ts` (CompObj-/Props14-blokformaten, afgeleid van MPXJ).
import { CfbFile } from '@/services/mpp/cfb';

// ── CFB-header/-directory-boilerplate ────────────────────────────────────────────────────────

export const SECTOR = 512;
export const HEADER = 512;
export const CFB_MAGIC = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1];
export const DIR_ENTRY = 128;

export interface CfbHeaderOpts {
  numFatSectors: number;
  firstDirSector: number;
  firstMiniFatSector: number;
  numMiniFatSectors: number;
  /** Default 3 (512-byte sectoren). */
  majorVersion?: number;
  /** Default 9 (2^9 = 512). */
  sectorShift?: number;
  /** Default 6 (2^6 = 64, de vaste minisectorgrootte). */
  miniSectorShift?: number;
  /** Default 4096. */
  miniStreamCutoff?: number;
  /** Default ENDOFCHAIN (0xFFFFFFFE) — geen DIFAT-keten nodig voor deze kleine fixtures. */
  firstDifatSector?: number;
  /** Default 0. */
  numDifatSectors?: number;
}

/** Schrijft de CFB-header (magic + versie-/sectorshift-velden + FAT-/mini-FAT-/DIFAT-pointers +
 *  de 109 header-DIFAT-entries) in `view`. DIFAT[0] wijst altijd naar sector 0 (de FAT-sector,
 *  entry `i===0`) — dat klopt voor elke fixture hier: ze gebruiken allemaal precies 1
 *  FAT-sector, dus nooit een geketende DIFAT-vervolgsector nodig. */
export function writeCfbHeader(view: DataView, opts: CfbHeaderOpts): void {
  const bytes = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
  CFB_MAGIC.forEach((b, i) => (bytes[i] = b));
  view.setUint16(26, opts.majorVersion ?? 3, true);
  view.setUint16(30, opts.sectorShift ?? 9, true);
  view.setUint16(32, opts.miniSectorShift ?? 6, true);
  view.setUint32(44, opts.numFatSectors, true);
  view.setUint32(48, opts.firstDirSector, true);
  view.setUint32(56, opts.miniStreamCutoff ?? 4096, true);
  view.setUint32(60, opts.firstMiniFatSector, true);
  view.setUint32(64, opts.numMiniFatSectors, true);
  view.setUint32(68, opts.firstDifatSector ?? 0xfffffffe, true);
  view.setUint32(72, opts.numDifatSectors ?? 0, true);
  for (let i = 0; i < 109; i++) view.setUint32(76 + i * 4, i === 0 ? 0 : 0xffffffff, true);
}

/** Schrijft een directory-entrynaam: UTF-16LE-tekens vanaf `entryBase`, plus het lengteveld
 *  (bytes-incl.-terminator) op `entryBase + 64`. */
export function writeDirEntryName(view: DataView, entryBase: number, name: string): void {
  for (let c = 0; c < name.length; c++) view.setUint16(entryBase + c * 2, name.charCodeAt(c), true);
  view.setUint16(entryBase + 64, (name.length + 1) * 2, true);
}

// ── Fixturebouwers (verhuisd uit check-mpp-import.ts, gedrag ongewijzigd) ───────────────────────

/** Bouwt een minimale, geldige CFB met twee streams: StreamA (4095 bytes — net onder de
 *  4096-mini-stream-cutoff, dus het mini-FAT-pad) en StreamB (4096 bytes — precies op de cutoff,
 *  dus het gewone-FAT-pad). Sectorlayout: 0=FAT, 1=directory, 2=mini-FAT, 3-10=root-ministream
 *  (StreamA's data, 8×512=4096 bytes), 11-18=StreamB's data (8×512=4096 bytes). */
export function buildSyntheticCfb(): { bytes: Uint8Array; streamA: Uint8Array; streamB: Uint8Array } {
  const totalSectors = 19; // 0..18
  const buf = new ArrayBuffer(HEADER + totalSectors * SECTOR);
  const bytes = new Uint8Array(buf);
  const view = new DataView(buf);

  const streamA = new Uint8Array(4095);
  for (let i = 0; i < streamA.length; i++) streamA[i] = i & 0xff;
  const streamB = new Uint8Array(4096);
  for (let i = 0; i < streamB.length; i++) streamB[i] = (255 - (i & 0xff)) & 0xff;

  writeCfbHeader(view, { numFatSectors: 1, firstDirSector: 1, firstMiniFatSector: 2, numMiniFatSectors: 1 });

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
  // Entry 0: Root
  writeDirEntryName(view, dirOff, 'Root Entry');
  view.setUint8(dirOff + 66, 5); // type root
  view.setUint32(dirOff + 68, 0xffffffff, true); // left
  view.setUint32(dirOff + 72, 0xffffffff, true); // right
  view.setUint32(dirOff + 76, 1, true); // child = StreamA
  view.setUint32(dirOff + 116, 3, true); // ministream start-sector
  view.setUint32(dirOff + 120, 4096, true); // ministream size
  // Entry 1: StreamA
  const e1 = dirOff + 128;
  writeDirEntryName(view, e1, 'StreamA');
  view.setUint8(e1 + 66, 2);
  view.setUint32(e1 + 68, 0xffffffff, true);
  view.setUint32(e1 + 72, 2, true); // right = StreamB
  view.setUint32(e1 + 76, 0xffffffff, true);
  view.setUint32(e1 + 116, 0, true); // ministart-sector 0
  view.setUint32(e1 + 120, streamA.length, true);
  // Entry 2: StreamB
  const e2 = dirOff + 256;
  writeDirEntryName(view, e2, 'StreamB');
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

/** Bouwt een CFB waarin `levels` directory-entries elk ZOWEL hun `left` als `right` naar hetzelfde
 *  volgende niveau laten wijzen (duplicaat-siblings) — betrapt een boomopbouw die de gedeelde
 *  visited-set kwijtraakt (zie `cfb.ts`'s C1-toelichting): zonder dedup verdubbelt elk niveau het
 *  werk (O(2^levels)), mét dedup is het O(levels). */
export function buildDuplicateSiblingCfb(levels: number): Uint8Array {
  const dirSectors = Math.ceil(((levels + 1) * DIR_ENTRY) / SECTOR);
  const totalSectors = 1 + dirSectors; // sector 0 = FAT, sectoren 1..dirSectors = directory
  const buf = new ArrayBuffer(HEADER + totalSectors * SECTOR);
  const bytes = new Uint8Array(buf);
  const view = new DataView(buf);

  writeCfbHeader(view, {
    numFatSectors: 1,
    firstDirSector: 1,
    firstMiniFatSector: 0xfffffffe, // geen mini-FAT nodig in deze fixture
    numMiniFatSectors: 0,
  });

  const sectorOff = (n: number) => HEADER + n * SECTOR;

  // Sector 0: FAT — beschrijft zichzelf (FATSECT) en de geketende directory-sectoren 1..dirSectors.
  const fat = new Array<number>(128).fill(0xffffffff);
  fat[0] = 0xfffffffd;
  for (let s = 1; s <= dirSectors; s++) fat[s] = s === dirSectors ? 0xfffffffe : s + 1;
  fat.forEach((v, i) => view.setUint32(sectorOff(0) + i * 4, v, true));

  // Directory-entries liggen aaneengesloten vanaf sector 1 — dat spoort met de FAT-keten
  // hierboven, dus een simpele stride van DIR_ENTRY bytes is hier geoorloofd.
  const entryOffset = (idx: number) => sectorOff(1) + idx * DIR_ENTRY;

  // Entry 0: root — child wijst naar entry 1, het begin van de duplicaat-keten.
  const rootBase = entryOffset(0);
  writeDirEntryName(view, rootBase, 'Root Entry');
  view.setUint8(rootBase + 66, 5);
  view.setUint32(rootBase + 68, 0xffffffff, true);
  view.setUint32(rootBase + 72, 0xffffffff, true);
  view.setUint32(rootBase + 76, 1, true);

  // Entries 1..levels: streams (geen eigen kinderen nodig) waarvan left én right naar hetzelfde
  // volgende niveau wijzen.
  for (let i = 1; i <= levels; i++) {
    const base = entryOffset(i);
    writeDirEntryName(view, base, `Dup${i}`);
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

/** Bouwt een minimale, geldige CFB met twee ROOT-level streams (`nameA`/`nameB`), allebei via
 *  het mini-stream-pad. Generiek genoeg voor eender welke kleine (<4096 bytes) payload — anders
 *  dan `buildSyntheticCfb` (toegesneden op de mini-/gewone-FAT-grens, niet op meerdere
 *  root-streams). Gebruikt door de MPP-containerlaag-fixtures (`\x01CompObj` + `Props14`). */
export function buildTwoRootStreamsCfb(nameA: string, dataA: Uint8Array, nameB: string, dataB: Uint8Array): Uint8Array {
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

  writeCfbHeader(view, { numFatSectors: 1, firstDirSector: 1, firstMiniFatSector: 2, numMiniFatSectors: 1 });

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
  writeDirEntryName(view, dirOff, 'Root Entry');
  view.setUint8(dirOff + 66, 5); // type root
  view.setUint32(dirOff + 68, 0xffffffff, true);
  view.setUint32(dirOff + 72, 0xffffffff, true);
  view.setUint32(dirOff + 76, 1, true); // child = entry A
  view.setUint32(dirOff + 116, 3, true); // ministream start-sector
  view.setUint32(dirOff + 120, ministreamBytes, true);

  const e1 = dirOff + 128;
  writeDirEntryName(view, e1, nameA);
  view.setUint8(e1 + 66, 2); // type stream
  view.setUint32(e1 + 68, 0xffffffff, true);
  view.setUint32(e1 + 72, 2, true); // right = entry B
  view.setUint32(e1 + 76, 0xffffffff, true);
  view.setUint32(e1 + 116, 0, true); // ministart-sector 0
  view.setUint32(e1 + 120, dataA.length, true);

  const e2 = dirOff + 256;
  writeDirEntryName(view, e2, nameB);
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

// ── MPP-blokencoders (Props14.java/CompObj.java-formaat, spiegelt mppContainer.ts) ─────────────

export function encodeAsciiWithTerminator(s: string): Uint8Array {
  const out = new Uint8Array(s.length + 1);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  out[s.length] = 0;
  return out;
}

/** Spiegelt CompObj.java: 28 filler-bytes, dan lengte-geprefixte ASCII-strings (elke lengte telt
 *  de null-terminator mee). We stoppen na `fileFormat` — de applicationID-lengte (0, dus
 *  "overslaan") sluit het blok consistent af. */
export function encodeCompObjFileFormat(fileFormat: string): Uint8Array {
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

/** Spiegelt Props14.java: 16-byte header (headerCount @12) + N entries (lengte/sleutel/genegeerd/
 *  data, uitgelijnd op een 2-byte-grens) — algemene vorm, ondersteunt meerdere PropsKeys in één
 *  stream. */
export function encodePropsEntries(entries: { key: number; data: Uint8Array }[]): Uint8Array {
  let bodyLen = 0;
  for (const e of entries) bodyLen += 12 + e.data.length + (e.data.length % 2 !== 0 ? 1 : 0);
  const out = new Uint8Array(16 + bodyLen);
  const view = new DataView(out.buffer);
  view.setUint16(12, entries.length, true); // headerCount
  let pos = 16;
  for (const e of entries) {
    view.setInt32(pos, e.data.length, true); // attrib1: datalengte
    view.setInt32(pos + 4, e.key, true); // attrib2: sleutel
    view.setInt32(pos + 8, 0, true); // attrib3: genegeerd
    pos += 12;
    out.set(e.data, pos);
    pos += e.data.length;
    if (e.data.length % 2 !== 0) pos += 1; // uitlijnen op een 2-byte-grens, zoals de leeskant verwacht
  }
  return out;
}

/** Eén PropsKey met een 1-byte waarde — het geval van PASSWORD_FLAG. */
export function encodePropsSingleByteEntry(key: number, valueByte: number): Uint8Array {
  return encodePropsEntries([{ key, data: Uint8Array.of(valueByte) }]);
}

// ── Assert-helpers ("faalt-nette-fout"-patroon) ──────────────────────────────────────────────

const DEFAULT_TIME_LIMIT_MS = 2000;

/** Voert `run()` uit en verwacht dat 'm binnen `timeLimitMs` gooit met een boodschap die met
 *  `${prefix}:` begint (bewijst zowel "geen hang/geheugenexplosie" als "nette, herkenbare fout —
 *  geen rauwe RangeError e.d."). Registreert drie `truthy`-regels per aanroep. Gedeelde kern van
 *  `expectCfbError`/`expectMppError` hieronder. */
function expectPrefixedError(
  truthy: (label: string, cond: boolean) => void,
  prefix: string,
  label: string,
  run: () => void,
  timeLimitMs: number,
): void {
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
  truthy(`${label}: binnen tijdslimiet (${elapsedMs}ms < ${timeLimitMs}ms)`, elapsedMs < timeLimitMs);
  truthy(`${label}: gooit`, threw);
  truthy(`${label}: nette ${prefix}:-foutmelding (geen RangeError e.d.)`, message.startsWith(`${prefix}:`));
}

/** Voor de CFB-container-laag (`cfb.ts`) — verwacht een `CFB:`-fout. */
export function expectCfbError(
  truthy: (label: string, cond: boolean) => void,
  label: string,
  run: () => void,
  timeLimitMs = DEFAULT_TIME_LIMIT_MS,
): void {
  expectPrefixedError(truthy, 'CFB', label, run, timeLimitMs);
}

/** I4 (kwaliteitsreview): voor de MPP-primitievenlaag (`mppPrimitives.ts`/`mppContainer.ts`) —
 *  verwacht een `MPP:`-fout. Naar het model van `expectCfbError` hierboven. */
export function expectMppError(
  truthy: (label: string, cond: boolean) => void,
  label: string,
  run: () => void,
  timeLimitMs = DEFAULT_TIME_LIMIT_MS,
): void {
  expectPrefixedError(truthy, 'MPP', label, run, timeLimitMs);
}

/** Byte-voor-byte vergelijking — voor round-trip-bewijzen (`getStream(...)` teruggeeft precies
 *  wat erin ging). */
export function bytesEqual(a: Uint8Array, b: Uint8Array): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

/** Kleine gemakshelper: bouwt een `CfbFile` uit `buildTwoRootStreamsCfb`'s resultaat. Puur voor
 *  leesbaarheid op de aanroepplekken (geen eigen logica). */
export function buildTwoRootStreamsCfbFile(nameA: string, dataA: Uint8Array, nameB: string, dataB: Uint8Array): CfbFile {
  return new CfbFile(buildTwoRootStreamsCfb(nameA, dataA, nameB, dataB));
}
