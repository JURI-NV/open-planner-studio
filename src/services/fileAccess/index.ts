import { isTauri } from '@/utils/platform';
import {
  openFileDialogTauri, saveFileDialogTauri, saveToRefTauri, readFromRefTauri,
} from './tauriBackend';
import {
  openFileDialogWeb, saveFileDialogWeb, saveToRefWeb, readFromRefWeb,
} from './webBackend';

/** Bestandsfilter (naam + extensies zonder punt), zoals de bestaande dialoog-aanroepen. */
export interface FileFilter {
  name: string;
  extensions: string[];
}

/**
 * Opake verwijzing naar een bestand als opslaan-doel (spec §3.1).
 * - `path`   : Tauri — echt OS-pad; herbruikbaar voor in-place opslaan.
 * - `handle` : Chromium-web — FileSystemFileHandle; herbruikbaar voor in-place opslaan.
 * Fallback-web (Firefox/Safari) heeft geen herbruikbare ref → `null`.
 */
export type FileRef =
  | { kind: 'path'; path: string }
  | { kind: 'handle'; handle: FileSystemFileHandle };

export interface OpenedFile {
  name: string;
  content: string;
  ref: FileRef | null;
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
export function openFileDialog(filters: FileFilter[]): Promise<OpenedFile | null> {
  return isTauri() ? openFileDialogTauri(filters) : openFileDialogWeb(filters);
}

/** Opslaan-als / export via picker. `null` = geannuleerd. */
export function saveFileDialog(defaultName: string, content: string, filters: FileFilter[]): Promise<SaveOutcome | null> {
  return isTauri() ? saveFileDialogTauri(defaultName, content, filters) : saveFileDialogWeb(defaultName, content, filters);
}

/** In-place opslaan naar een bestaande ref. `false` als onmogelijk (fallback-web of geweigerde
 *  permissie) → de aanroeper valt terug op `saveFileDialog`. */
export function saveToRef(ref: FileRef, content: string): Promise<boolean> {
  return isTauri() ? saveToRefTauri(ref, content) : saveToRefWeb(ref, content);
}

/** Inhoud van een bewaarde ref herlezen (recents heropenen). `null` bij fout/geweigerd. */
export function readFromRef(ref: FileRef): Promise<string | null> {
  return isTauri() ? readFromRefTauri(ref) : readFromRefWeb(ref);
}
