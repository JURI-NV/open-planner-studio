import type { Task } from '@/types/task';
import type { Sequence, SequenceType } from '@/types/sequence';

/**
 * De regels voor het aanmaken van een relatie, op één plek.
 *
 * Waarom dit een eigen BLADMODULE is: hij importeert bewust niets uit `slices/` of `appStore`.
 * Zou hij dat wel doen, dan ontstaat de cyclus `sequenceSlice → relationRules → appStore →
 * sequenceSlice` en slaat `npm run verify:cycles` aan. Zelfde reden als bij `state/defaults.ts`.
 *
 * Waarom hij bestaat: de dedup-regel stond in twee handgeschreven kopieën (`sequenceSlice` en
 * `mcpTransaction`), en de validatie die dit ontwerp toevoegt zou daar een derde en vierde kopie
 * van maken. Dat is precies het duplicatiepatroon dat elders in deze codebase is opgeruimd
 * (het documentcontract, `applyCpmResult`) — en het bijt hier direct: zou de validatie alleen in
 * de slice-actie staan, dan is de MCP-laag het gat waardoor de bug binnenkomt die we dichten.
 */

export interface RelationEndpoints {
  predecessorId: string;
  successorId: string;
}

export type RelationRejection = 'self' | 'unknown-task' | 'summary-endpoint' | 'duplicate';

export type RelationVerdict = { ok: true } | { ok: false; reason: RelationRejection };

/**
 * Hoe komt de regelmodule aan een taak? Bewust een functie en geen `Map`: de aanroepers hebben
 * elk al een goedkope manier om op te zoeken — het Relaties-paneel heeft een `taskById`-useMemo en
 * de MCP-classificatie bouwt één map voor de hele batch. Een Map eisen zou die aanroepers dwingen
 * er een tweede te bouwen, per aanroep, binnen een lus. In de store-acties draait de lookup over
 * een Immer-draft; daar valt met deze vorm de Map-allocatie weg en sluit `find` bij een treffer
 * kort. (Het scant nog steeds lineair en materialiseert onderweg dezelfde child-proxies — dit is
 * een kleinere constante, geen andere complexiteit.)
 */
export type TaskLookup = (id: string) => Task | undefined;

/**
 * De MCP-toollaag heeft twee onafhankelijke plekken die `hasSummaryEndpoint` als ZACHTE
 * per-item-weigering rapporteren (`classifyDeps` in taskTools.ts voor NIEUWE relaties,
 * `classifyDepUpdates` in dependencyTools.ts voor het VERHANGEN van een bestaand eindpunt) — één
 * gedeelde tekst dus, zodat een agent bij beide tools dezelfde boodschap krijgt in plaats van twee
 * net-iets-anders geformuleerde varianten die uit elkaar kunnen groeien.
 */
export const SUMMARY_ENDPOINT_REJECTION =
  'een verzameltaak als voorganger of opvolger heeft geen effect op de planning; koppel aan een taak zonder subtaken';

/**
 * Heeft deze relatie een eindpunt zonder effect op de planning?
 *
 * `runCPM` geeft alleen BLADtaken aan de solver (`tasks.filter(t => t.childIds.length === 0)`) en
 * `CPMSolver` leest relaties in met optional chaining, dus een verzameltaak-eindpunt betekent dat
 * de relatie stil wordt weggegooid — een spookrelatie: opgeslagen, getekend, geëxporteerd, zonder
 * enig effect.
 *
 * MIJLPALEN ZIJN EXPLICIET WÉL TOEGESTAAN. Een mijlpaal is een bladtaak met duur 0; de solver
 * ondersteunt hem volledig als voorganger én opvolger. Dat hij in de Gantt geen relatie kon armen
 * was een neveneffect van een hittest die voor slepen/resizen geschreven is.
 *
 * Een ONBEKEND eindpunt geeft `false`, niet `true`. Binnen `relationVerdict` is dat onbereikbaar
 * (`unknown-task` vangt eerder af), maar het Relaties-paneel roept deze functie los aan per
 * bestaande rij, en een relatie naar een verdwenen taak hoort daar niet als verzameltaak-
 * spookrelatie gemarkeerd te worden. Zie spec §5: bestaande `self`/`unknown-task`-relaties worden
 * bewust niet gemarkeerd.
 *
 * Aparte functie náást `relationVerdict` omdat de paneelmarkering hem per BESTAANDE rij nodig
 * heeft: daar is `relationVerdict` onbruikbaar, want elke bestaande relatie is haar eigen duplicaat.
 */
export function hasSummaryEndpoint(lookup: TaskLookup, seq: RelationEndpoints): boolean {
  const pred = lookup(seq.predecessorId);
  const succ = lookup(seq.successorId);
  return (pred?.childIds.length ?? 0) > 0 || (succ?.childIds.length ?? 0) > 0;
}

/**
 * Mag deze NIEUWE relatie erbij? Volgorde is bewust: structurele problemen eerst, duplicaat als
 * laatste — een verzameltaak-relatie die toevallig ook al bestaat moet het inhoudelijke probleem
 * melden, niet "bestaat al".
 */
export function relationVerdict(
  lookup: TaskLookup,
  sequences: readonly Sequence[],
  seq: RelationEndpoints & { type: SequenceType },
): RelationVerdict {
  if (seq.predecessorId === seq.successorId) return { ok: false, reason: 'self' };
  if (!lookup(seq.predecessorId) || !lookup(seq.successorId)) {
    return { ok: false, reason: 'unknown-task' };
  }
  if (hasSummaryEndpoint(lookup, seq)) return { ok: false, reason: 'summary-endpoint' };
  // Exacte duplicaten weren, maar meerdere TYPES tussen hetzelfde paar blijven toegestaan
  // (bv. SS+FF als ladder-koppeling) — anders verdwijnt de tweede relatie stil.
  const exists = sequences.some(
    (e) => e.predecessorId === seq.predecessorId
      && e.successorId === seq.successorId
      && e.type === seq.type,
  );
  return exists ? { ok: false, reason: 'duplicate' } : { ok: true };
}
