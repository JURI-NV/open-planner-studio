import { useEffect } from 'react';
import { useAppStore } from '@/state/appStore';

/**
 * Rekent één keer door zodra "datums zoals opgeslagen" via een BEWERKING is verlaten (issue #63).
 *
 * `finishMutation` zet de modus uit en `scheduleStale` aan, maar rekent zelf niet — dat mag het ook
 * niet, want het draait binnen een Immer-producer. Zonder deze hook zou de gebruiker met "Automatisch
 * berekenen" uit (de default) achterblijven met half-opgeslagen, half-bewerkte datums.
 *
 * Bewust los van `useAutoCalcCPM`: die respecteert de instelling, deze negeert hem juist — het
 * verlaten van de modus moet áltijd doorrekenen, anders bestaat de mengvorm alsnog.
 *
 * De F5-route heeft dit niet nodig: die roept `runCPM` al aan.
 *
 * DOCUMENTWISSEL. `datesAsRecorded` is documentdata (het staat in `DOCUMENT_FIELDS`), dus hij
 * verandert óók bij `switchDocument`/`closeDocument`/een load — zonder dat er iets bewerkt is. Een
 * overstap van een document mét de modus naar een document zonder ziet er in deze subscriber
 * precies zo uit als "de modus is zojuist verlaten", en zou dan de planning van dat ándere document
 * ongevraagd doorrekenen (`runCPM` maakt niet vies, maar het is wel een stille F5 op werk waar de
 * gebruiker niets aan deed). Vandaar dat de overgang alleen telt bínnen hetzelfde document: bij een
 * documentwissel wordt de vorige waarde alleen overgenomen, niet als overgang gelezen.
 *
 * Geen debounce (anders dan `useAutoCalcCPM`): dit is één discrete overgang per bewerking, geen
 * reeks die tot één run gecoalesceerd moet worden.
 */
export function useExitRecordedDates(): void {
  useEffect(() => {
    const init = useAppStore.getState();
    let wasInMode = init.datesAsRecorded;
    let docId = init.activeDocumentId;
    return useAppStore.subscribe(() => {
      const s = useAppStore.getState();
      const sameDoc = s.activeDocumentId === docId;
      const left = sameDoc && wasInMode && !s.datesAsRecorded;
      // Anker vóór de eventuele `runCPM` bijwerken: die roept deze subscriber opnieuw aan en zonder
      // dit zou de overgang een tweede keer als "zojuist verlaten" gelezen worden.
      wasInMode = s.datesAsRecorded;
      docId = s.activeDocumentId;
      if (left && s.scheduleStale) s.runCPM();
    });
  }, []);
}
