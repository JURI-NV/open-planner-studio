import { useEffect, useRef } from 'react';
import { useAppStore } from '@/state/appStore';
import { readFromRef, type FileRef } from '@/services/fileAccess';
import { readIFC } from '@/services/ifc/ifcReader';

/**
 * Bootstrap voor de JURI-embed (T1.5): draait ÉÉN keer bij mount, en alleen wanneer
 * `window.__JURI_PROJECT_ID__` aanwezig is — gezet door de buitenste Next.js-app vóór dit
 * bundle-scripttag laadt (zie `src/types/juri-embed.d.ts`). Buiten de embed (Tauri, losstaande
 * web-build) is dat veld `undefined` en is deze hook een no-op.
 *
 * Leest RECHTSTREEKS via `readFromRef` — geen `openFile`/`openRecentFile` (die zijn allebei aan
 * een bestandskiezer/recents-flow gebonden) en dus geen picker-UI.
 *
 * Twee uitkomsten:
 *  - Inhoud aanwezig: parse via de bestaande `readIFC` (zelfde reader als elk ander open-pad) en
 *    hydrateer de state via `applyLoadedProject` — met `fileServerRef` gezet, zodat de eerstvolgende
 *    `saveFile()` (zie `fileSlice.ts`) hierheen terugschrijft.
 *  - `null`: een gloednieuw project waarvoor nog nooit is opgeslagen (ontwerpnota §2) — GEEN fout.
 *    Het document blijft op zijn verse/lege staat, maar `fileServerRef` wordt alsnog gezet zodat de
 *    EERSTE autosave (`useJuriAutosave`) meteen een opslaan-doel heeft.
 */
export function useJuriEmbed(): void {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    const projectId = window.__JURI_PROJECT_ID__;
    if (!projectId) return;
    ran.current = true;

    const ref: FileRef = { kind: 'server', projectId };

    void (async () => {
      const content = await readFromRef(ref);

      if (content === null) {
        // Nieuw project: niets te parsen, maar wél meteen een opslaan-doel voor de eerste autosave.
        useAppStore.setState((s) => { s.fileServerRef = ref; });
        return;
      }

      try {
        const parsed = readIFC(content);
        useAppStore.getState().applyLoadedProject(parsed, {
          filePath: null,
          fileHandle: null,
          fileServerRef: ref,
          recompute: true,
          fit: true,
          hourDataNotice: true,
          linkedOpen: true,
        });
      } catch (err) {
        console.error('useJuriEmbed: kon projectdocument niet parsen:', err);
        useAppStore.getState().notify({
          severity: 'error',
          messageKey: 'notifications.openFailed',
          detail: (err as Error).message,
        });
      }
    })();
  }, []);
}
