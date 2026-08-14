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

const OK: RelationVerdict = { ok: true };

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
 * Aparte functie náást `relationVerdict` omdat de paneelmarkering hem per BESTAANDE rij nodig
 * heeft: daar is `relationVerdict` onbruikbaar, want elke bestaande relatie is haar eigen duplicaat.
 */
export function hasSummaryEndpoint(
  byId: ReadonlyMap<string, Task>,
  seq: RelationEndpoints,
): boolean {
  const pred = byId.get(seq.predecessorId);
  const succ = byId.get(seq.successorId);
  return (pred?.childIds.length ?? 0) > 0 || (succ?.childIds.length ?? 0) > 0;
}

/**
 * Mag deze NIEUWE relatie erbij? Volgorde is bewust: structurele problemen eerst, duplicaat als
 * laatste — een verzameltaak-relatie die toevallig ook al bestaat moet het inhoudelijke probleem
 * melden, niet "bestaat al".
 */
export function relationVerdict(
  byId: ReadonlyMap<string, Task>,
  sequences: readonly Sequence[],
  seq: RelationEndpoints & { type: SequenceType },
): RelationVerdict {
  if (seq.predecessorId === seq.successorId) return { ok: false, reason: 'self' };
  if (!byId.has(seq.predecessorId) || !byId.has(seq.successorId)) {
    return { ok: false, reason: 'unknown-task' };
  }
  if (hasSummaryEndpoint(byId, seq)) return { ok: false, reason: 'summary-endpoint' };
  // Exacte duplicaten weren, maar meerdere TYPES tussen hetzelfde paar blijven toegestaan
  // (bv. SS+FF als ladder-koppeling) — anders verdwijnt de tweede relatie stil.
  const exists = sequences.some(
    (e) => e.predecessorId === seq.predecessorId
      && e.successorId === seq.successorId
      && e.type === seq.type,
  );
  return exists ? { ok: false, reason: 'duplicate' } : OK;
}

/** Bouwt de id→taak-map die beide functies verwachten. */
export function taskMapOf(tasks: readonly Task[]): ReadonlyMap<string, Task> {
  return new Map(tasks.map((t) => [t.id, t]));
}
