/**
 * Persistentie van de bedrijfsbibliotheek (spec §5). Pools zijn BEDRIJFSDATA, geen instellingen ⇒
 * NIET in localStorage. Browser: IndexedDB (patroon van het extensiesysteem, eigen database
 * `ops-library`). Desktop (Tauri): JSON-bestand in `appDataDir` (patroon van recoveryStore), buiten
 * de browserprofiel-levensduur. Export (libraryIfc) is het backupmechanisme (spec §5).
 */
import { isTauri } from '@/utils/platform';
import type { CompanyLibrary } from '@/types/library';
import { createDefaultLibrary } from '@/types/library';

const LIBRARY_FILE = 'ops-library.json';

// ── IndexedDB (browser) ───────────────────────────────────────────────────────────────────────
let dbPromise: Promise<IDBDatabase> | null = null;

function openLibraryDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open('ops-library', 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('library')) {
        db.createObjectStore('library', { keyPath: 'key' });
      }
    };
    req.onsuccess = () => {
      const db = req.result;
      db.onversionchange = () => { db.close(); dbPromise = null; };
      resolve(db);
    };
    req.onerror = () => { dbPromise = null; reject(req.error); };
  });
  return dbPromise;
}

async function loadWeb(): Promise<CompanyLibrary | null> {
  if (typeof indexedDB === 'undefined') return null; // headless Node (testbatterij) = no-op.
  const db = await openLibraryDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('library', 'readonly');
    const req = tx.objectStore('library').get('library');
    req.onsuccess = () => resolve((req.result as { key: string; value: CompanyLibrary } | undefined)?.value ?? null);
    req.onerror = () => reject(req.error);
  });
}

async function saveWeb(lib: CompanyLibrary): Promise<void> {
  if (typeof indexedDB === 'undefined') return; // headless Node (testbatterij) = no-op; geen unhandled rejection.
  const db = await openLibraryDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('library', 'readwrite');
    tx.objectStore('library').put({ key: 'library', value: lib });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// ── appDataDir-bestand (Tauri) ────────────────────────────────────────────────────────────────
async function loadTauri(): Promise<CompanyLibrary | null> {
  const { readTextFile, exists } = await import('@tauri-apps/plugin-fs');
  const { appDataDir, join } = await import('@tauri-apps/api/path');
  const path = await join(await appDataDir(), LIBRARY_FILE);
  if (!(await exists(path))) return null;
  try {
    return JSON.parse(await readTextFile(path)) as CompanyLibrary;
  } catch {
    return null; // corrupt bestand: val terug op een verse bibliotheek i.p.v. crashen
  }
}

async function saveTauri(lib: CompanyLibrary): Promise<void> {
  const { writeTextFile } = await import('@tauri-apps/plugin-fs');
  const { appDataDir, join } = await import('@tauri-apps/api/path');
  const path = await join(await appDataDir(), LIBRARY_FILE);
  await writeTextFile(path, JSON.stringify(lib));
}

// ── Publieke API ──────────────────────────────────────────────────────────────────────────────

/** Laad de opgeslagen bibliotheek; nog niets opgeslagen ⇒ een verse default-bibliotheek. */
export async function loadLibrary(): Promise<CompanyLibrary> {
  const loaded = isTauri() ? await loadTauri() : await loadWeb();
  return loaded ?? createDefaultLibrary();
}

export async function saveLibrary(lib: CompanyLibrary): Promise<void> {
  return isTauri() ? saveTauri(lib) : saveWeb(lib);
}
