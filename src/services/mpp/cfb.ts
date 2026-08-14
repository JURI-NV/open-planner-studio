// Minimale, alleen-lezen Compound File Binary (CFB/OLE2) parser — het containerformaat van
// .mpp-bestanden (MS Project 2010+/MPP14) en oudere Office-formaten. Eigen implementatie, geen
// dependency (conform de eigen-parser-traditie van dit project, vgl. de IFC-parser).
//
// Structuurkennis is gebaseerd op de MS-CFB-specificatie (Microsoft) en, ter verificatie, op de
// vergelijkbare sector/FAT/directory-afhandeling in MPXJ (Jon Iles e.a., LGPL-2.1, POI-achtig):
// https://github.com/joniles/mpxj — met name `org.mpxj.mpp` (leest hetzelfde containerformaat).
// Deze module kent geen MPP-specifieke semantiek; dat gebeurt in latere lagen
// (`mppContainer.ts` e.v., fase 3.8 etappe 1, taak T4+). Dit bestand levert alleen de generieke
// storage/stream-boom en ruwe streambytes.

const MAGIC = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1];

const FAT_FREESECT = 0xffffffff;
const FAT_ENDOFCHAIN = 0xfffffffe;
// FAT_FATSECT (0xFFFFFFFD) en FAT_DIFSECT (0xFFFFFFFC) markeren sectoren die zelf FAT- resp.
// DIFAT-inhoud dragen; deze lezer volgt ze nooit als data-keten (ze duiken alleen op ín de FAT
// zelf, nooit als "volgende sector" tijdens het lezen van een gewone stream), dus er is geen
// aparte afhandeling nodig — alleen de twee sentinels hierboven sturen de leeslussen.

const NOSTREAM = 0xffffffff;

const HEADER_SIZE = 512;
const DIR_ENTRY_SIZE = 128;
const DIFAT_ENTRIES_IN_HEADER = 109;

type DirType = 'unknown' | 'storage' | 'stream' | 'root';

interface RawDirEntry {
  name: string;
  type: DirType;
  left: number;
  right: number;
  child: number;
  startSector: number;
  size: number;
}

export interface CfbEntry {
  /** UTF-16LE-naam; kan \x01/\x05-prefixtekens bevatten (bv. "\x01CompObj"). */
  name: string;
  type: 'storage' | 'stream';
  size: number;
  /** Alleen gevuld bij storages. */
  children: Map<string, CfbEntry>;
}

export class CfbFile {
  readonly root: CfbEntry;

  private readonly bytes: Uint8Array;
  private readonly view: DataView;
  private readonly sectorSize: number;
  private readonly miniSectorSize: number;
  private readonly miniStreamCutoff: number;
  private readonly fat: number[];
  private readonly miniFat: number[];
  private readonly miniStreamStartSector: number;
  private readonly miniStreamSize: number;
  private readonly maxChainSteps: number;
  /** Zijtabel: CfbEntry is een publiek, "plat" datamodel zonder startSector — die bewaren we
   *  hier apart, gekoppeld aan entry-identiteit, zodat getStream() 'm alsnog kan opzoeken. */
  private readonly startSectors = new WeakMap<CfbEntry, number>();

  constructor(bytes: Uint8Array) {
    this.bytes = bytes;
    this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

    if (bytes.byteLength < HEADER_SIZE) {
      throw new Error('CFB: bestand te klein voor een geldige header');
    }
    for (let i = 0; i < MAGIC.length; i++) {
      if (bytes[i] !== MAGIC[i]) {
        throw new Error('CFB: ongeldige magic — geen Compound File Binary');
      }
    }

    const majorVersion = this.view.getUint16(26, true);
    if (majorVersion !== 3 && majorVersion !== 4) {
      throw new Error(`CFB: onbekende major version ${majorVersion} (verwacht 3 of 4)`);
    }
    const sectorShift = this.view.getUint16(30, true);
    const miniSectorShift = this.view.getUint16(32, true);
    this.sectorSize = 1 << sectorShift;
    this.miniSectorSize = 1 << miniSectorShift;
    if (this.sectorSize < HEADER_SIZE || this.miniSectorSize <= 0) {
      throw new Error('CFB: ongeldige sector- of minisectorgrootte in header');
    }

    const numFatSectors = this.view.getUint32(44, true);
    const firstDirSector = this.view.getUint32(48, true);
    this.miniStreamCutoff = this.view.getUint32(56, true);
    const firstMiniFatSector = this.view.getUint32(60, true);
    const numMiniFatSectors = this.view.getUint32(64, true);
    const firstDifatSector = this.view.getUint32(68, true);
    const numDifatSectors = this.view.getUint32(72, true);

    // Sector n begint op byteoffset (n + 1) * sectorSize (geldt voor v3 én v4 — bij v4 is de
    // header zelf met nullen opgevuld tot de volledige sectorgrootte). Deze grove sectortelling
    // dient uitsluitend als bovengrens voor begrensde lussen, niet als exacte boekhouding.
    this.maxChainSteps = Math.max(16, Math.floor(bytes.byteLength / this.sectorSize) + 16);

    // ── DIFAT: 109 header-entries + eventueel geketende DIFAT-sectoren ──────────────────────
    const difat: number[] = [];
    for (let i = 0; i < DIFAT_ENTRIES_IN_HEADER; i++) {
      const v = this.view.getUint32(76 + i * 4, true);
      if (v !== FAT_FREESECT) difat.push(v);
    }
    let difatSector = firstDifatSector;
    let difatSteps = 0;
    while (numDifatSectors > 0 && difatSector !== FAT_ENDOFCHAIN && difatSector !== FAT_FREESECT) {
      if (difatSteps++ > numDifatSectors + this.maxChainSteps) {
        throw new Error('CFB: DIFAT-keten te lang of cyclisch');
      }
      const off = this.sectorOffset(difatSector);
      if (off + this.sectorSize > bytes.byteLength) {
        throw new Error('CFB: DIFAT-sector buiten bestandsgrenzen');
      }
      const entriesPerSector = this.sectorSize / 4 - 1; // laatste u32 = volgende DIFAT-sector
      for (let i = 0; i < entriesPerSector; i++) {
        const v = this.view.getUint32(off + i * 4, true);
        if (v !== FAT_FREESECT) difat.push(v);
      }
      difatSector = this.view.getUint32(off + entriesPerSector * 4, true);
    }

    // ── FAT: u32-array; per sector de volgende sector in zijn keten ─────────────────────────
    const entriesPerFatSector = this.sectorSize / 4;
    this.fat = [];
    for (const fatSector of difat) {
      if (fatSector === FAT_FREESECT) continue;
      const off = this.sectorOffset(fatSector);
      if (off + this.sectorSize > bytes.byteLength) {
        throw new Error('CFB: FAT-sector buiten bestandsgrenzen');
      }
      for (let i = 0; i < entriesPerFatSector; i++) {
        this.fat.push(this.view.getUint32(off + i * 4, true));
      }
    }
    if (this.fat.length === 0 || numFatSectors === 0) {
      throw new Error('CFB: geen FAT-sectoren gevonden');
    }

    // ── Directory: keten vanaf firstDirSector, entries van 128 bytes ────────────────────────
    const dirBytes = this.readChain(firstDirSector, undefined);
    const entryCount = Math.floor(dirBytes.length / DIR_ENTRY_SIZE);
    if (entryCount === 0) {
      throw new Error('CFB: lege of onleesbare directory-keten');
    }
    const dirView = new DataView(dirBytes.buffer, dirBytes.byteOffset, dirBytes.byteLength);
    const rawEntries: RawDirEntry[] = [];
    for (let i = 0; i < entryCount; i++) {
      const base = i * DIR_ENTRY_SIZE;
      const nameLenBytes = dirView.getUint16(base + 64, true);
      const typeByte = dirView.getUint8(base + 66);
      let type: DirType = 'unknown';
      if (typeByte === 1) type = 'storage';
      else if (typeByte === 2) type = 'stream';
      else if (typeByte === 5) type = 'root';

      let name = '';
      if (nameLenBytes >= 2) {
        // nameLenBytes telt de terminerende NUL mee; charCount is inclusief eventuele
        // \x01/\x05-prefixtekens die MS Project/Office gebruiken voor speciale streams.
        const charCount = Math.min(31, nameLenBytes / 2 - 1);
        const codeUnits: number[] = [];
        for (let c = 0; c < charCount; c++) {
          codeUnits.push(dirView.getUint16(base + c * 2, true));
        }
        name = String.fromCharCode(...codeUnits);
      }

      const left = dirView.getUint32(base + 68, true);
      const right = dirView.getUint32(base + 72, true);
      const child = dirView.getUint32(base + 76, true);
      const startSector = dirView.getUint32(base + 116, true);
      // Streamgrootte is u64 @120; alleen de laagste 32 bits lezen volstaat ruimschoots voor
      // .mpp-bestanden (die blijven ver onder 4 GiB).
      const size = dirView.getUint32(base + 120, true);
      rawEntries.push({ name, type, left, right, child, startSector, size });
    }

    const rootIdx = rawEntries.findIndex((e) => e.type === 'root');
    if (rootIdx < 0) {
      throw new Error('CFB: geen root-directory-entry gevonden');
    }
    const rootRaw = rawEntries[rootIdx];
    this.miniStreamStartSector = rootRaw.startSector;
    this.miniStreamSize = rootRaw.size;

    // ── mini-FAT ──────────────────────────────────────────────────────────────────────────
    this.miniFat = [];
    if (numMiniFatSectors > 0 && firstMiniFatSector !== FAT_ENDOFCHAIN && firstMiniFatSector !== FAT_FREESECT) {
      const miniFatBytes = this.readChain(firstMiniFatSector, undefined);
      const miniFatView = new DataView(miniFatBytes.buffer, miniFatBytes.byteOffset, miniFatBytes.byteLength);
      const count = Math.floor(miniFatBytes.length / 4);
      for (let i = 0; i < count; i++) {
        this.miniFat.push(miniFatView.getUint32(i * 4, true));
      }
    }

    // ── Boom bouwen: elke storage (incl. root) heeft kinderen via child-id + left/right-ids.
    // Dit is een binaire (rood-zwart-)boom van sibling-entries; we lopen 'm plat met een
    // expliciete stack en negeren de kleur — alleen de topologie (left/right/child) telt. ────
    const buildChildren = (childId: number): Map<string, CfbEntry> => {
      const children = new Map<string, CfbEntry>();
      if (childId === NOSTREAM) return children;
      const stack = [childId];
      let steps = 0;
      while (stack.length > 0) {
        if (steps++ > entryCount + this.maxChainSteps) {
          throw new Error('CFB: directory-boom te diep of cyclisch');
        }
        const id = stack.pop();
        if (id === undefined || id === NOSTREAM || id < 0 || id >= rawEntries.length) continue;
        const raw = rawEntries[id];
        if (raw.type !== 'storage' && raw.type !== 'stream') continue;
        if (raw.left !== NOSTREAM) stack.push(raw.left);
        if (raw.right !== NOSTREAM) stack.push(raw.right);
        const entry: CfbEntry = {
          name: raw.name,
          type: raw.type,
          size: raw.size,
          children: raw.type === 'storage' ? buildChildren(raw.child) : new Map(),
        };
        this.startSectors.set(entry, raw.startSector);
        children.set(raw.name, entry);
      }
      return children;
    };

    this.root = {
      name: rootRaw.name,
      type: 'storage',
      size: rootRaw.size,
      children: buildChildren(rootRaw.child),
    };
  }

  private sectorOffset(sector: number): number {
    return (sector + 1) * this.sectorSize;
  }

  /** Leest een volledige sectorketen vanaf `startSector` via de gewone FAT.
   *  `byteLimit` (indien gegeven) knipt het resultaat af — bv. op de bekende streamgrootte. */
  private readChain(startSector: number, byteLimit: number | undefined): Uint8Array {
    if (startSector === FAT_ENDOFCHAIN || startSector === FAT_FREESECT) {
      return new Uint8Array(0);
    }
    const chunks: Uint8Array[] = [];
    let sector = startSector;
    let steps = 0;
    let collected = 0;
    while (sector !== FAT_ENDOFCHAIN && sector !== FAT_FREESECT) {
      if (steps++ > this.maxChainSteps) {
        throw new Error('CFB: sectorketen te lang of cyclisch');
      }
      if (sector < 0 || sector >= this.fat.length) {
        throw new Error(`CFB: ongeldig sectornummer ${sector} in keten`);
      }
      const off = this.sectorOffset(sector);
      if (off + this.sectorSize > this.bytes.byteLength) {
        throw new Error('CFB: sector buiten bestandsgrenzen');
      }
      chunks.push(this.bytes.subarray(off, off + this.sectorSize));
      collected += this.sectorSize;
      if (byteLimit !== undefined && collected >= byteLimit) break;
      sector = this.fat[sector];
    }
    const out = new Uint8Array(collected);
    let pos = 0;
    for (const c of chunks) {
      out.set(c, pos);
      pos += c.length;
    }
    return byteLimit !== undefined ? out.subarray(0, Math.min(byteLimit, out.length)) : out;
  }

  /** Leest een volledige minisectorketen vanaf `startSector` via de mini-FAT, uit de mini-stream
   *  (= de stream van de root-entry, zelf gelezen via de gewone FAT). */
  private readMiniChain(startSector: number, byteLimit: number): Uint8Array {
    if (startSector === FAT_ENDOFCHAIN || startSector === FAT_FREESECT || byteLimit <= 0) {
      return new Uint8Array(0);
    }
    const miniStreamBytes = this.readChain(this.miniStreamStartSector, this.miniStreamSize);
    const chunks: Uint8Array[] = [];
    let sector = startSector;
    let steps = 0;
    let collected = 0;
    while (sector !== FAT_ENDOFCHAIN && sector !== FAT_FREESECT) {
      if (steps++ > this.maxChainSteps) {
        throw new Error('CFB: minisectorketen te lang of cyclisch');
      }
      const off = sector * this.miniSectorSize;
      if (off + this.miniSectorSize > miniStreamBytes.length) {
        throw new Error('CFB: minisector buiten mini-stream-grenzen');
      }
      chunks.push(miniStreamBytes.subarray(off, off + this.miniSectorSize));
      collected += this.miniSectorSize;
      if (collected >= byteLimit) break;
      if (sector < 0 || sector >= this.miniFat.length) {
        throw new Error(`CFB: ongeldig minisectornummer ${sector} in keten`);
      }
      sector = this.miniFat[sector];
    }
    const out = new Uint8Array(collected);
    let pos = 0;
    for (const c of chunks) {
      out.set(c, pos);
      pos += c.length;
    }
    return out.subarray(0, Math.min(byteLimit, out.length));
  }

  private resolve(path: string[]): CfbEntry | null {
    let node = this.root;
    for (const part of path) {
      const next = node.children.get(part);
      if (!next) return null;
      node = next;
    }
    return node;
  }

  /** Storage-entry op pad; null als afwezig (of als het pad op een stream uitkomt). */
  getStorage(path: string[]): CfbEntry | null {
    const node = this.resolve(path);
    return node && node.type === 'storage' ? node : null;
  }

  /** Stream-inhoud op pad door storages, bv. getStream(['   114', 'TBkndTask', 'FixedData']). */
  getStream(path: string[]): Uint8Array | null {
    const node = this.resolve(path);
    if (!node || node.type !== 'stream') return null;
    if (node.size === 0) return new Uint8Array(0);
    const startSector = this.startSectors.get(node);
    if (startSector === undefined) return null;
    if (node.size < this.miniStreamCutoff) {
      return this.readMiniChain(startSector, node.size);
    }
    return this.readChain(startSector, node.size);
  }
}
