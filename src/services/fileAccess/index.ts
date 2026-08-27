import { isTauri } from '@/utils/platform';
import {
  openFileDialogTauri, saveFileDialogTauri, saveToRefTauri, readFromRefTauri, readBytesFromRefTauri,
} from './tauriBackend';
import {
  openFileDialogWeb, saveFileDialogWeb, saveToRefWeb, readFromRefWeb, readBytesFromRefWeb,
} from './webBackend';
import {
  openFileDialogServer, saveFileDialogServer, saveToRefServer, readFromRefServer, readBytesFromRefServer,
} from './serverBackend';

/**
 * Is de JURI-serverbackend gebouwd in deze build (T1.3-acceptatie-eis)? Dit is een BUILD-TIME vlag,
 * geen runtime-toggle: zonder `VITE_JURI_API_BASE_URL` (de standaardsituatie, o.a. de bestaande
 * losstaande OPS-build) is dit `false` voor élke omgeving, en `activeBackend()` hieronder geeft dan
 * exact hetzelfde antwoord als vóór deze wijziging ('tauri' of 'web') — géén enkele bestaande
 * call-site verandert van gedrag.
 */
const SERVER_BACKEND_ENABLED = Boolean(import.meta.env.VITE_JURI_API_BASE_URL);

type Backend = 'tauri' | 'web' | 'server';

/** `isTauri()` blijft de eerste, hoogste-prioriteit check (ongewijzigd gedrag in Tauri). Alleen
 *  als dat `false` is EN de server-backend op build-time is ingeschakeld, kiezen we 'server' —
 *  anders (het huidige, enige gedrag zonder configuratie) blijft het 'web'. */
function activeBackend(): Backend {
  if (isTauri()) return 'tauri';
  return SERVER_BACKEND_ENABLED ? 'server' : 'web';
}

/** Bestandsfilter (naam + extensies zonder punt), zoals de bestaande dialoog-aanroepen. */
export interface FileFilter {
  name: string;
  extensions: string[];
}

/**
 * Opake verwijzing naar een bestand als opslaan-doel (spec §3.1).
 * - `path`   : Tauri — echt OS-pad; herbruikbaar voor in-place opslaan.
 * - `handle` : Chromium-web — FileSystemFileHandle; herbruikbaar voor in-place opslaan.
 * - `server` : JURI-embed (T1.1) — projectId op de JURI-server; ontstaat alleen via de
 *   embed-bootstrap (`useJuriEmbed`), nooit via een dialoog.
 * Fallback-web (Firefox/Safari) heeft geen herbruikbare ref → `null`.
 */
export type FileRef =
  | { kind: 'path'; path: string }
  | { kind: 'handle'; handle: FileSystemFileHandle }
  | { kind: 'server'; projectId: string };

export interface OpenedFile {
  name: string;
  /** Tekstinhoud; bij een binair formaat (opts.binaryExtensions) leeg — gebruik dan `bytes`. */
  content: string;
  bytes?: Uint8Array;
  ref: FileRef | null;
}

export interface OpenDialogOpts {
  /** Extensies (zonder punt, lowercase) die als bytes gelezen moeten worden i.p.v. tekst. */
  binaryExtensions?: string[];
}

export interface SaveOutcome {
  ref: FileRef | null;
  name: string;
  /**
   * Het bestand is via de browser-download bij de gebruiker gekomen in plaats van naar de gekozen
   * locatie geschreven — omdat de omgeving geen File System Access-schrijfrechten geeft (embedded
   * webviews) of de API helemaal niet heeft (Firefox/Safari). Het opslaan is dus GESLAAGD, maar het
   * bestand staat in de downloadmap en niet waar de gebruiker het aanwees. De aanroeper meldt dat.
   */
  viaDownload?: boolean;
}

/** Capability-vlag voor UI-beslissingen (recents tonen/verbergen). */
export function supportsHandles(): boolean {
  return isTauri() || (typeof window !== 'undefined' && 'showOpenFilePicker' in window);
}

/** Openen via picker/input. `null` = geannuleerd. */
export function openFileDialog(filters: FileFilter[], opts?: OpenDialogOpts): Promise<OpenedFile | null> {
  switch (activeBackend()) {
    case 'tauri': return openFileDialogTauri(filters, opts);
    case 'server': return openFileDialogServer(filters, opts);
    default: return openFileDialogWeb(filters, opts);
  }
}

/** Opslaan-als / export via picker. `null` = geannuleerd. */
export function saveFileDialog(defaultName: string, content: string, filters: FileFilter[]): Promise<SaveOutcome | null> {
  switch (activeBackend()) {
    case 'tauri': return saveFileDialogTauri(defaultName, content, filters);
    case 'server': return saveFileDialogServer(defaultName, content, filters);
    default: return saveFileDialogWeb(defaultName, content, filters);
  }
}

/** In-place opslaan naar een bestaande ref. `false` als onmogelijk (fallback-web, geweigerde
 *  permissie, of een server-fout) → de aanroeper valt terug op `saveFileDialog`. */
export function saveToRef(ref: FileRef, content: string): Promise<boolean> {
  switch (activeBackend()) {
    case 'tauri': return saveToRefTauri(ref, content);
    case 'server': return saveToRefServer(ref, content);
    default: return saveToRefWeb(ref, content);
  }
}

/** Inhoud van een bewaarde ref herlezen (recents heropenen). `null` bij fout/geweigerd. */
export function readFromRef(ref: FileRef): Promise<string | null> {
  switch (activeBackend()) {
    case 'tauri': return readFromRefTauri(ref);
    case 'server': return readFromRefServer(ref);
    default: return readFromRefWeb(ref);
  }
}

/** Bytes van een bewaarde ref herlezen (recents met een binair formaat). `null` bij fout/geweigerd. */
export function readBytesFromRef(ref: FileRef): Promise<Uint8Array | null> {
  switch (activeBackend()) {
    case 'tauri': return readBytesFromRefTauri(ref);
    case 'server': return readBytesFromRefServer(ref);
    default: return readBytesFromRefWeb(ref);
  }
}
