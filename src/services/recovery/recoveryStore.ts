import { isTauri } from '@/utils/platform';
import { idbGetAll, idbPut, idbDelete } from '@/utils/idb';
import {
  recoveryBase, recoveryManifestName, legacyRecoveryFile, recoveryIfcName,
  type RecoveryManifest,
} from '@/hooks/recoveryPaths';

/** Eén recovery-document (IFC-CONTENT, niet de bestandsnaam). */
export interface RecoveryDocContent {
  id: string;
  ifc: string;
  filePath: string | null;
  isDirty: boolean;
}

/** Geladen record incl. weergave-mtime (Tauri: bestand-mtime; web: addedAt). */
export interface LoadedRecoveryDoc extends RecoveryDocContent {
  mtime: Date | null;
}

export interface LoadedRecovery {
  activeDocumentId: string | null;
  docs: LoadedRecoveryDoc[];
}

// ---------------------------------------------------------------------------
// Tauri-backend — appDataDir + plugin-fs (dev-slug-isolatie behouden, spec §7).
// ---------------------------------------------------------------------------

// Padnamen + manifestvorm komen uit `@/hooks/recoveryPaths` — één bron voor de dev-slug-isolatie
// (zie daar), gedeeld met de auto-save-/herstel-hooks.
const manifestName = recoveryManifestName;
const legacyFile = legacyRecoveryFile;
const ifcName = recoveryIfcName;

/** Achtervoegsel van het halffabricaat van een atomaire schrijfactie (zie `saveTauri`). */
const TMP_SUFFIX = '.tmp';

async function saveTauri(activeId: string, docs: RecoveryDocContent[]): Promise<void> {
  const { writeTextFile, readDir, remove, rename } = await import('@tauri-apps/plugin-fs');
  const { appDataDir, join } = await import('@tauri-apps/api/path');
  const dir = await appDataDir();

  /**
   * Schrijf-en-vervang in twee stappen (bevinding K4). `writeTextFile` truncate't het doelbestand
   * vóórdat het schrijft, dus een crash midden in de schrijfactie liet precies datgene achter
   * waarvoor recovery bestaat: een AFGEKAPTE snapshot — en die kwam er ongemerkt doorheen, want
   * `readIFC` gooide nooit.
   *
   * Een atomaire schrijf-primitief kent `plugin-fs` niet; `rename` is het beste wat er is. Die
   * mapt op `std::fs::rename`, en binnen dezelfde map (dus gegarandeerd hetzelfde volume) is dat
   * een atomaire vervanging op zowel POSIX als Windows. Na een crash staat er dus óf het complete
   * oude, óf het complete nieuwe bestand — nooit een halve.
   *
   * Wat dit NIET afdekt: er is geen `fsync`/flush in `plugin-fs`, dus bij stroomuitval of een
   * kernel-panic kan de rename op sommige bestandssystemen vóór de data landen. Tegen een
   * app-crash — het scenario van deze bevinding — dekt het wel volledig.
   */
  const writeAtomic = async (name: string, text: string): Promise<void> => {
    const target = await join(dir, name);
    const tmp = await join(dir, `${name}${TMP_SUFFIX}`);
    await writeTextFile(tmp, text);
    try {
      await rename(tmp, target);
    } catch (err) {
      try { await remove(tmp); } catch { /* al weg */ }
      throw err;
    }
  };

  for (const d of docs) {
    await writeAtomic(ifcName(d.id), d.ifc);
  }

  const manifest: RecoveryManifest = {
    version: 1,
    activeDocumentId: activeId,
    documents: docs.map((d) => ({ id: d.id, ifc: ifcName(d.id), filePath: d.filePath, isDirty: d.isDirty })),
  };
  await writeAtomic(manifestName, JSON.stringify(manifest));

  // Ruim snapshots op van documenten die niet meer open zijn (zelfde slug).
  const keep = new Set(docs.map((d) => ifcName(d.id)));
  const prefix = `${recoveryBase}.`;
  for (const entry of await readDir(dir)) {
    const name = entry.name;
    if (!name || !name.startsWith(prefix)) continue;
    // Halffabricaat van een afgebroken schrijfactie: nooit een geldige bron, dus altijd weg.
    // (Bij twee gelijktijdige instanties kan dit een in-flight `.tmp` van de ander raken — maar
    // die instanties wissen elkaars snapshots sowieso al volledig; dat is bevinding K5.)
    if (name.endsWith(TMP_SUFFIX)) {
      try { await remove(await join(dir, name)); } catch { /* al weg */ }
      continue;
    }
    if (name.endsWith('.ifc') && !keep.has(name)) {
      await remove(await join(dir, name));
    }
  }
}

/**
 * Lees het manifest defensief (bevinding K4). Voorheen stond deze `JSON.parse` BUITEN try/catch,
 * terwijl de per-document-lees eronder wél was afgeschermd: één corrupt manifestbestand liet
 * `loadRecovery()` gooien, waarna de opstartflow alle documenten als verloren beschouwde — terwijl
 * de losse `recovery.*.ifc`-snapshots gewoon nog op schijf stonden. Geeft `null` bij onleesbare of
 * vormvreemde inhoud, zodat de aanroeper kan terugvallen op de directory-scan.
 */
export function parseRecoveryManifest(raw: string): RecoveryManifest | null {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return null;
    const m = parsed as RecoveryManifest;
    // Geldig JSON dat toevallig geen manifest is (`{"foo":1}`) moet net zo goed terugvallen:
    // zonder deze check gooide de `for…of` eronder alsnog.
    if (!Array.isArray(m.documents)) return null;
    return m;
  } catch {
    return null;
  }
}

/**
 * Terugval als het manifest ontbreekt of niet parst (bevinding K4): scan de appDataDir op losse
 * `<base>.<docId>.ifc`-snapshots. Eén stukgelopen JSON-bestandje mag nooit betekenen dat het
 * ECHTE werk — de snapshots zelf — als weg wordt beschouwd. Zonder manifest kennen we `filePath`
 * niet meer; `isDirty` staat op `true`, wat voor een crashsnapshot per definitie klopt.
 */
async function scanTauriSnapshots(): Promise<LoadedRecoveryDoc[]> {
  const { readDir, readTextFile, stat } = await import('@tauri-apps/plugin-fs');
  const { appDataDir, join } = await import('@tauri-apps/api/path');
  const dir = await appDataDir();
  const prefix = `${recoveryBase}.`;
  const docs: LoadedRecoveryDoc[] = [];

  for (const entry of await readDir(dir)) {
    const name = entry.name;
    if (!name || !name.startsWith(prefix) || !name.endsWith('.ifc')) continue;
    if (name === legacyFile) continue; // die heeft zijn eigen terugval, mét eigen doc-id
    const id = name.slice(prefix.length, -'.ifc'.length);
    if (!id) continue;
    try {
      const path = await join(dir, name);
      const ifc = await readTextFile(path);
      let mtime: Date | null = null;
      try { mtime = (await stat(path)).mtime; } catch { /* geen mtime — laat null */ }
      docs.push({ id, ifc, filePath: null, isDirty: true, mtime });
    } catch (err) {
      console.error('Recovery: kon gescande snapshot niet lezen:', name, err);
    }
  }
  return docs;
}

async function loadTauri(): Promise<LoadedRecovery> {
  const { readTextFile, exists, stat } = await import('@tauri-apps/plugin-fs');
  const { appDataDir, join } = await import('@tauri-apps/api/path');
  const dir = await appDataDir();
  const manifestPath = await join(dir, manifestName);

  if (await exists(manifestPath)) {
    let raw = '';
    try { raw = await readTextFile(manifestPath); } catch (err) {
      console.error('Recovery: kon het manifest niet lezen:', err);
    }
    const manifest = raw ? parseRecoveryManifest(raw) : null;

    if (manifest) {
      const docs: LoadedRecoveryDoc[] = [];
      for (const d of manifest.documents) {
        try {
          const ifcPath = await join(dir, d.ifc);
          const ifc = await readTextFile(ifcPath);
          let mtime: Date | null = null;
          try { mtime = (await stat(ifcPath)).mtime; } catch { /* geen mtime — laat null */ }
          docs.push({ id: d.id, ifc, filePath: d.filePath ?? null, isDirty: d.isDirty ?? true, mtime });
        } catch (err) {
          console.error('Recovery: kon documentsnapshot niet lezen:', d.id, err);
        }
      }
      if (docs.length > 0) return { activeDocumentId: manifest.activeDocumentId ?? null, docs };
      // Manifest gelezen maar géén enkel document eruit leesbaar → alsnog scannen (hieronder):
      // misschien staan er snapshots die dit manifest niet (meer) noemt.
    } else {
      console.error('Recovery: manifest onleesbaar of vormvreemd — terugval op directory-scan.');
    }

    // Terugval (K4): de losse snapshots staan er nog; die mogen niet verloren gaan omdat één
    // klein JSON-bestand stuk is.
    const scanned = await scanTauriSnapshots();
    if (scanned.length > 0) return { activeDocumentId: scanned[0].id, docs: scanned };
  }

  // Terugval: oude losse <base>.ifc (één document).
  const legacyPath = await join(dir, legacyFile);
  if (await exists(legacyPath)) {
    const ifc = await readTextFile(legacyPath);
    let mtime: Date | null = null;
    try { mtime = (await stat(legacyPath)).mtime; } catch { /* geen mtime */ }
    return { activeDocumentId: 'legacy', docs: [{ id: 'legacy', ifc, filePath: null, isDirty: true, mtime }] };
  }

  return { activeDocumentId: null, docs: [] };
}

async function clearTauri(): Promise<void> {
  const { exists, readTextFile, remove, readDir } = await import('@tauri-apps/plugin-fs');
  const { appDataDir, join } = await import('@tauri-apps/api/path');
  const dir = await appDataDir();
  const manifestPath = await join(dir, manifestName);
  if (await exists(manifestPath)) {
    try {
      const manifest = parseRecoveryManifest(await readTextFile(manifestPath));
      for (const d of manifest?.documents ?? []) {
        try { await remove(await join(dir, d.ifc)); } catch { /* al weg */ }
      }
    } catch { /* onleesbaar manifest — de sweep hieronder ruimt alsnog op */ }
    try { await remove(manifestPath); } catch { /* al weg */ }
  }
  // Sweep op prefix, ná de manifest-route: sinds `loadTauri` bij een corrupt manifest terugvalt op
  // een directory-scan, zou een snapshot die het manifest niet noemde anders blijven staan en bij
  // de VOLGENDE start opnieuw als herstelkandidaat opduiken — terwijl de gebruiker net "verwerpen"
  // (of een geslaagd herstel) achter de rug heeft. Wissen betekent wissen.
  const prefix = `${recoveryBase}.`;
  try {
    for (const entry of await readDir(dir)) {
      const name = entry.name;
      if (!name || !name.startsWith(prefix)) continue;
      if (!name.endsWith('.ifc') && !name.endsWith(TMP_SUFFIX)) continue;
      if (name === legacyFile) continue; // hieronder, met zijn eigen `exists`-check
      try { await remove(await join(dir, name)); } catch { /* al weg */ }
    }
  } catch (err) {
    console.error('Recovery: kon de appDataDir niet doorlopen bij het opruimen:', err);
  }
  const legacyPath = await join(dir, legacyFile);
  if (await exists(legacyPath)) {
    try { await remove(legacyPath); } catch { /* al weg */ }
  }
}

// ---------------------------------------------------------------------------
// Web-backend — IndexedDB 'ops-recovery', per-tab sessionId-scoping (spec §7).
// ---------------------------------------------------------------------------

const WEB_DB = 'ops-recovery';
const WEB_STORE = 'records';
const SESSION_KEY = 'ops-recovery-session';
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 dagen

/** Per-tab id: overleeft reload/crash van hetzelfde tab (sessionStorage), niet tab-sluiten. */
function sessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) { id = crypto.randomUUID(); sessionStorage.setItem(SESSION_KEY, id); }
    return id;
  } catch {
    return 'default'; // sessionStorage geblokkeerd → vaste sleutel
  }
}

interface WebDocRecord {
  id: string; // `${sid}::doc::${docId}`
  kind: 'doc';
  sessionId: string;
  docId: string;
  ifc: string;
  filePath: string | null;
  isDirty: boolean;
  addedAt: number;
}
interface WebManifestRecord {
  id: string; // `${sid}::manifest`
  kind: 'manifest';
  sessionId: string;
  activeDocumentId: string | null;
  docIds: string[];
  addedAt: number;
}
type WebRecord = WebDocRecord | WebManifestRecord;

const docKey = (sid: string, docId: string): string => `${sid}::doc::${docId}`;
const manifestKey = (sid: string): string => `${sid}::manifest`;

async function saveWeb(activeId: string, docs: RecoveryDocContent[]): Promise<void> {
  const sid = sessionId();
  const now = Date.now();
  const all = await idbGetAll<WebRecord>(WEB_DB, WEB_STORE);

  // Ruim verweesde vreemde sessies op (ouder dan 7 dagen).
  for (const r of all) {
    if (r.sessionId !== sid && now - r.addedAt > MAX_AGE_MS) {
      await idbDelete(WEB_DB, WEB_STORE, r.id);
    }
  }

  // Schrijf de huidige docs van deze sessie.
  for (const d of docs) {
    const rec: WebDocRecord = {
      id: docKey(sid, d.id), kind: 'doc', sessionId: sid, docId: d.id,
      ifc: d.ifc, filePath: d.filePath, isDirty: d.isDirty, addedAt: now,
    };
    await idbPut(WEB_DB, WEB_STORE, rec);
  }
  const manifest: WebManifestRecord = {
    id: manifestKey(sid), kind: 'manifest', sessionId: sid,
    activeDocumentId: activeId, docIds: docs.map((d) => d.id), addedAt: now,
  };
  await idbPut(WEB_DB, WEB_STORE, manifest);

  // Ruim doc-records van DEZE sessie op die niet meer open zijn.
  const keep = new Set(docs.map((d) => docKey(sid, d.id)));
  for (const r of all) {
    if (r.sessionId === sid && r.kind === 'doc' && !keep.has(r.id)) {
      await idbDelete(WEB_DB, WEB_STORE, r.id);
    }
  }
}

async function loadWeb(): Promise<LoadedRecovery> {
  const sid = sessionId();
  const all = await idbGetAll<WebRecord>(WEB_DB, WEB_STORE);
  const manifest = all.find((r) => r.kind === 'manifest' && r.sessionId === sid) as WebManifestRecord | undefined;
  if (!manifest) return { activeDocumentId: null, docs: [] };
  const docs: LoadedRecoveryDoc[] = [];
  for (const docId of manifest.docIds) {
    const rec = all.find((r) => r.kind === 'doc' && r.id === docKey(sid, docId)) as WebDocRecord | undefined;
    if (!rec) continue;
    docs.push({ id: rec.docId, ifc: rec.ifc, filePath: rec.filePath, isDirty: rec.isDirty, mtime: new Date(rec.addedAt) });
  }
  return { activeDocumentId: manifest.activeDocumentId, docs };
}

async function clearWeb(): Promise<void> {
  const sid = sessionId();
  const all = await idbGetAll<WebRecord>(WEB_DB, WEB_STORE);
  for (const r of all) {
    if (r.sessionId === sid) await idbDelete(WEB_DB, WEB_STORE, r.id);
  }
}

// ---------------------------------------------------------------------------
// Publieke API — backend-keuze bij runtime.
// ---------------------------------------------------------------------------

export function saveRecovery(activeId: string, docs: RecoveryDocContent[]): Promise<void> {
  return isTauri() ? saveTauri(activeId, docs) : saveWeb(activeId, docs);
}

export function loadRecovery(): Promise<LoadedRecovery> {
  return isTauri() ? loadTauri() : loadWeb();
}

export function clearRecovery(): Promise<void> {
  return isTauri() ? clearTauri() : clearWeb();
}
