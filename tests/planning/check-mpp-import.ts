// MPP-import (fase 3.8 etappe 1, taak T3+): CFB/OLE2-container-regressie.
//
// Twee lagen dekking:
//  1. SYNTHETISCHE FIXTURES (deze module bouwt zelf minimale, geldige CFB-bytes) — draaien
//     ALTIJD, ook zonder corpus. Dit is de dekking die CI daadwerkelijk op de CFB-laag zelf
//     heeft: byte-exacte round-trip, de FAT/mini-stream-grens (4095 vs. 4096 bytes) en een reeks
//     vijandige varianten (afgekapt bestand, foute header, cyclische FAT, self-referencing
//     directory-child, sectornummer buiten bereik) die stuk voor stuk een nette `CFB:`-fout
//     moeten geven — nooit een hang of een rauwe RangeError.
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
