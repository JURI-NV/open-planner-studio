import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import { useAppStore } from '@/state/appStore';
import { readIFC } from '@/services/ifc/ifcReader';
import { documentTitle } from '@/utils/documents';
import type { RecoveryEntry } from '@/components/dialogs/RecoveryDialog';
import { recoveryInputFromParsed, type RecoveryDocInput } from '@/state/documentContract';
import { loadRecovery, clearRecovery } from '@/services/recovery/recoveryStore';

// In-app herstel-dialoog (vervangt de native OS-`ask()`): de gedetecteerde
// recovery-payload + de callbacks om te herstellen/verwerpen/uitstellen. Lokale
// state i.p.v. een ui.show*-flag houdt de detectie-logica (geparste IFC,
// opruim-closures) bij elkaar en vermijdt slice-wijzigingen.
export interface RecoveryState {
  entries: RecoveryEntry[];
  onRestore: () => void;
  onDiscard: () => void;
  onClose: () => void;
}

export interface RecoveryRestore {
  recovery: RecoveryState | null;
  // Fase 2.10 onderdeel 3 (§3): reactief signaal "recovery-flow volledig afgehandeld" — waar
  // `autoSaveEnabled` een ref is (niet reactief, alleen voor de auto-save-timer), heeft de
  // welkomstdialoog-bootstrap-check een render-triggerende state nodig om pas te vuren NADAT de
  // recovery-detectie/-keuze echt klaar is (nooit gelijktijdig met RecoveryDialog).
  recoveryResolved: boolean;
  // Auto-save-poort: blijft dicht tot de recovery-keuze is gemaakt, zodat de debounced
  // auto-save de recovery-snapshots niet overschrijft vóórdat de gebruiker heeft gekozen.
  // Gaat open bij: geen recovery-data, een fout tijdens detectie, of nadat de gebruiker
  // herstelt/verwerpt/uitstelt. Gedeeld met useAutoSave.
  autoSaveEnabled: MutableRefObject<boolean>;
}

export function useRecoveryRestore(): RecoveryRestore {
  const [recovery, setRecovery] = useState<RecoveryState | null>(null);
  // Gezet op exact dezelfde momenten als `autoSaveEnabled.current = true` (dezelfde
  // `finish()`-closure).
  const [recoveryResolved, setRecoveryResolved] = useState(false);
  const autoSaveEnabled = useRef(false);

  // Check op recovery-data bij het opstarten. Platform-agnostisch: het backend (Tauri-bestanden
  // of IndexedDB in de browser) zit achter `recoveryStore`.
  const recoveryChecked = useRef(false);
  useEffect(() => {
    if (recoveryChecked.current) return;
    recoveryChecked.current = true;

    (async () => {
      // Poort opent zodra de keuze is gemaakt (of er niets te herstellen valt);
      // pas dan mag de auto-save de snapshots overschrijven.
      const finish = () => { autoSaveEnabled.current = true; setRecoveryResolved(true); };
      try {
        const loaded = await loadRecovery();
        if (loaded.docs.length === 0) { finish(); return; }

        // Parse elke snapshot vooraf zodat de dialoog projectnaam + taakaantal kan tonen, en
        // hergebruik dat resultaat bij het daadwerkelijke herstellen.
        const restored: RecoveryDocInput[] = [];
        const entries: RecoveryEntry[] = [];
        for (const d of loaded.docs) {
          try {
            const parsed = readIFC(d.ifc);
            // Welke velden bij crashherstel meegaan bepaalt `recoveryInputFromParsed` (bevinding
            // K3) — deze hook houdt bewust geen veldkennis.
            restored.push(recoveryInputFromParsed(parsed, {
              id: d.id,
              filePath: d.filePath,
              isDirty: d.isDirty,
            }));
            entries.push({
              id: d.id,
              name: documentTitle(d.filePath, parsed.project.name),
              filePath: d.filePath,
              taskCount: parsed.tasks.length,
              mtime: d.mtime,
            });
          } catch (err) {
            // Vuurt sinds K4 ook echt: `readIFC` gooit nu een `IfcParseError` bij een bestand
            // zonder STEP-kop of zonder sluitmarkering (= afgekapt). Zo'n snapshot wordt dus NIET
            // meer als volwaardig document aangeboden; de overige documenten lopen gewoon door.
            console.error('Failed to read recovery document:', d.id, err);
          }
        }

        // Niets bruikbaars geparst → stil opruimen, geen dialoog.
        if (entries.length === 0) { await clearRecovery(); finish(); return; }

        setRecovery({
          entries,
          // Volgorde is hier de hele bevinding (K4): `clearRecovery()` liep vroeger NAAST het
          // herstellen (fire-and-forget, `void`), dus de snapshots konden al gewist zijn terwijl
          // het herstel nog moest slagen. Nu pas wissen NADAT de documenten aantoonbaar in de
          // store staan; gooit het herstel, dan blijven de snapshots op schijf staan.
          onRestore: () => {
            void (async () => {
              try {
                if (restored.length > 0) {
                  useAppStore.getState().restoreDocuments(restored, loaded.activeDocumentId);
                  // Grens 4 (spec §3.4, plan-eis 6): crash-herstel telt als grens 1 — draai voor het
                  // actieve, herstelde document dezelfde openings-check (behind stil verversen,
                  // deviated markeren/vragen). Slapende herstelde documenten krijgen hun check bij
                  // activering (grens 2).
                  useAppStore.getState().runOpenBoundary();
                }
                // Dialoog meteen weg zodra het herstel zelf klaar is — de opruimactie eronder is
                // bestands-I/O en mag de gebruiker niet laten wachten.
                setRecovery(null);
                await clearRecovery();
              } catch (err) {
                // Snapshots blijven staan. `finish()` gaat bewust wél door: de auto-save-poort
                // dichthouden zou betekenen dat vanaf nu NIETS meer wordt weggeschreven — een
                // groter risico dan het verlies van deze ene snapshotgeneratie. De gebruiker
                // ziet de fout in de debug-terminal (console wordt door appLog opgevangen);
                // een echte melding hangt aan bevinding K8.
                console.error('Recovery: herstellen mislukt — snapshots blijven staan:', err);
              } finally {
                setRecovery(null);
                finish();
              }
            })();
          },
          onDiscard: () => { void clearRecovery(); setRecovery(null); finish(); },
          // Uitstellen: snapshots laten staan, niet herstellen (zie RecoveryDialog).
          onClose: () => { setRecovery(null); finish(); },
        });
      } catch (err) {
        console.error('Recovery check failed:', err);
        finish();
      }
    })();
  }, []);

  return { recovery, recoveryResolved, autoSaveEnabled };
}
