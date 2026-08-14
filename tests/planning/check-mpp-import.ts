// MPP-import (fase 3.8 etappe 1, taak T3+): CFB/OLE2-container-regressie tegen het lokale
// MPP14-corpus.
//
// CORPUS-GEDREVEN, GEEN IN-REPO FIXTURE: het corpus bestaat uit drie echte bedrijfsbestanden van
// de gebruiker (`.mpp`, MS Project) die NOOIT in de repo mogen komen — zowel omdat het geen
// testdata is die we mogen distribueren, als omdat er zonder een MS Project-licentie geen
// licentieschoon `.mpp`-bestand te fabriceren is om als fixture te gebruiken. Deze check leest ze
// dus via een pad buiten de repo (override met OPS_MPP_CORPUS). Op CI-machines (en bij elke
// contributor zonder dat pad) is het corpus afwezig — de check herkent dat en slaat netjes over
// met een OK-regel in plaats van te falen. Lokaal (waar het corpus wél aanwezig is) draaien de
// volledige asserts.
//
// Deze check groeit mee met de latere MPP-taken (T4–T7 bouwen de container-/veldlagen erbovenop;
// T9 breidt 'm uit met een echt content-contract tegen de MSPDI-ground-truth). T3 zelf bewijst
// alleen dat de CFB-laag de bekende MPP14-containerstructuur foutloos oplevert.
//
// Draait via run.sh (binnen het RUN_HOLIDAYS-blok) en draait daarna ook 5x mee in de
// tijdzone-matrix — daarom bewust geen tijdzone-gevoelige logica hierin (geen Date-aanmaak, geen
// lokale datumnotatie; alleen bytes en structuur).
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { CfbFile } from '@/services/mpp/cfb';
import type { CfbEntry } from '@/services/mpp/cfb';

const CORPUS =
  process.env.OPS_MPP_CORPUS ??
  '/home/nozzit/open-aec/voor claude/test bestanden voor file implementation';
const FILES = [
  'Bijlage 13 Productieplanning.mpp',
  'Bijlage 20 productieplanning PKB.mpp',
  'bijlage 7 Productie planning.mpp',
];

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

if (!existsSync(CORPUS)) {
  console.log('OK  mpp-import: corpus niet aanwezig (OPS_MPP_CORPUS) — check overgeslagen');
  process.exit(0);
}

const BACKEND_STORAGES = ['TBkndTask', 'TBkndRsc', 'TBkndAssn', 'TBkndCons', 'TBkndCal'];
// Var2Data draagt variabele-lengte velden per record en zit daarom NIET gegarandeerd overal:
// een storage zonder variabele inhoud (bv. TBkndCons zonder notities/tekst op relaties) heeft
// een lege VarMeta en geen Var2Data-stream. Geverifieerd op het corpus: 'bijlage 7 Productie
// planning.mpp' mist 'm voor TBkndCons, terwijl de andere twee bestanden 'm daar wél hebben —
// dus hard vereisen zou hier op legitieme data falen. FixedMeta/FixedData/VarMeta zijn wél
// altijd aanwezig in de drie corpusbestanden en blijven hard vereist.
const REQUIRED_STREAMS = ['FixedMeta', 'FixedData', 'VarMeta'];

for (const file of FILES) {
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
    const storage: CfbEntry | null = cfb.getStorage(['   114', storageName]);
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

if (diffs.length === 0) {
  console.log(`OK  mpp-import: alle checks groen (${checks})`);
  process.exit(0);
} else {
  console.log(`XX  mpp-import: ${diffs.length} afwijking(en) van ${checks}`);
  for (const d of diffs) console.log(`   - ${d}`);
  process.exit(1);
}
