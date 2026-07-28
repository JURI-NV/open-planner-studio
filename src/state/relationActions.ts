import { useAppStore } from '@/state/appStore';
import type { SequenceType } from '@/types/sequence';

/** Namen in een melding blijven leesbaar: langere taaknamen worden afgekapt. */
const MAX_NAME = 40;
const shortName = (name: string | undefined) =>
  !name ? '?' : name.length > MAX_NAME ? `${name.slice(0, MAX_NAME - 1)}…` : name;

/**
 * Relatie aanmaken MÉT gebruikerszichtbare terugkoppeling (issue #40).
 *
 * Waarom deze wrapper bestaat: `addSequence` weigert een exact duplicaat stil (geen mutatie, geen
 * undo-stap) en geeft tóch een id terug — die id verwijst dan naar niets. Alle drie de callsites
 * die met één gebaar een Eind-Start-relatie leggen (de lint-knop bij 2 selecties, de knop in het
 * Relaties-paneel, en het slepen in de Gantt) hadden daardoor exact hetzelfde symptoom als de
 * gemelde bug: er gebeurt zichtbaar niets. Hier gaat dat door één deur, met het gecentraliseerde
 * meldingenkanaal (bevinding K8) als uitgang.
 *
 * Duplicaatdetectie via de lengte van `sequences` vóór/ná de actie — bewust géén tweede kopie van
 * de dedup-regel, die hoort in `addSequence` te blijven wonen.
 *
 * @returns de id van de nieuwe relatie, of `null` wanneer hij als duplicaat geweigerd is.
 */
export function createRelationWithFeedback(
  predecessorId: string,
  successorId: string,
  type: SequenceType = 'FINISH_START',
): string | null {
  const st = useAppStore.getState();
  const before = st.sequences.length;
  const id = st.addSequence({ predecessorId, successorId, type, lagDays: 0 });

  const after = useAppStore.getState();
  if (after.sequences.length === before) {
    after.notify({
      severity: 'info',
      messageKey: 'notifications.relationDuplicate',
      // Samenvouwen: herhaald op dezelfde knop rammen levert één regel met een teller op.
      dedupeKey: 'relation-duplicate',
    });
    return null;
  }

  after.notify({
    severity: 'info',
    messageKey: 'notifications.relationCreated',
    params: {
      predecessor: shortName(after.tasks.find((t) => t.id === predecessorId)?.name),
      successor: shortName(after.tasks.find((t) => t.id === successorId)?.name),
    },
  });
  return id;
}
