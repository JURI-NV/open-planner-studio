import { useEffect } from 'react';
import { useAppStore } from '@/state/appStore';

/** Debounce ná de laatste wijziging vóórdat er wordt opgeslagen. */
const DEBOUNCE_MS = 4_000;
/** Harde bovengrens sinds de EERSTE wijziging ná de vorige save-poging: bij aanhoudend bewerken
 *  mag opslaan nooit langer wachten dan dit. */
const MAX_WAIT_MS = 15_000;

/**
 * Server-autosave voor de JURI-embed (T1.4). GEEN wijziging aan `useAutoSave.ts` — dat blijft de
 * bestaande, 10s-gethrottelde crash-recovery-naar-IndexedDB-hook, precies zoals hij is; dit is een
 * losse, nieuwe mechaniek voor het server-opslaan-doel.
 *
 * Alleen actief binnen de embed (`window.__JURI_PROJECT_ID__` aanwezig) — no-op in élke andere
 * build. Onvoorwaardelijk aanroepbaar vanuit `App.tsx` (de gate zit HIERBINNEN, niet bij de
 * aanroeper), zodat de hook-volgorde nooit verschilt tussen embed en niet-embed (rules-of-hooks).
 *
 * Signaal: hetzelfde `isDirty`-veld dat `useAutoSave.ts` ook leest (daar via de per-document
 * payload; hier rechtstreeks van de actieve document-state — de embed heeft er altijd maar één).
 * Slaat op via de bestaande `saveFile()`-actie, die dankzij fileSlice's ref-selectie naar
 * `fileServerRef` schrijft zodra die gezet is (zie `useJuriEmbed`).
 *
 * Timing: een debouncetimer die bij ELKE wijziging herstart, plus een losstaande
 * absolute-deadlinetimer die alleen bij de EERSTE wijziging ná de vorige save-poging start — welke
 * van de twee het eerst afgaat triggert de save, en beide worden dan gereset.
 */
export function useJuriAutosave(): void {
  useEffect(() => {
    if (!window.__JURI_PROJECT_ID__) return;

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    let deadlineTimer: ReturnType<typeof setTimeout> | null = null;
    let saving = false;
    let pending = false;

    const clearTimers = () => {
      if (debounceTimer) { clearTimeout(debounceTimer); debounceTimer = null; }
      if (deadlineTimer) { clearTimeout(deadlineTimer); deadlineTimer = null; }
    };

    // Zelfde saving/pending-patroon als useAutoSave.ts: voorkomt overlappende saveFile()-aanroepen
    // en herhaalt de poging als er tijdens het opslaan alweer een nieuwe wijziging bijkwam.
    const runSave = async () => {
      const state = useAppStore.getState();
      if (!state.isDirty) return;
      if (saving) { pending = true; return; }
      saving = true;
      try {
        await state.saveFile();
      } catch (err) {
        // saveFile() vangt zijn eigen fouten al af (notify + console.error) — dit is uitsluitend
        // een vangnet zodat een onverwachte throw de timer-lus niet stilzwijgend stopzet.
        console.error('useJuriAutosave: saveFile faalde onverwacht:', err);
      } finally {
        saving = false;
        if (pending) { pending = false; void runSave(); }
      }
    };

    const flush = () => {
      clearTimers();
      void runSave();
    };

    const unsub = useAppStore.subscribe(() => {
      if (!useAppStore.getState().isDirty) return;
      // Debounce: elke wijziging herstart de 4s-teller.
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(flush, DEBOUNCE_MS);
      // Deadline: start alleen bij de EERSTE wijziging sinds de laatste flush/reset — een
      // aanhoudende reeks wijzigingen mag de deadline niet steeds vooruitschuiven.
      if (!deadlineTimer) deadlineTimer = setTimeout(flush, MAX_WAIT_MS);
    });

    return () => {
      unsub();
      clearTimers();
    };
  }, []);
}
