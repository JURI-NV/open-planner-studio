// Regressie voor de relatieregels (spec 2026-08-14). Twee dingen die eerder stil misgingen:
//
//   1. Een relatie MET een mijlpaal als eindpunt werd door de Gantt-hittest geweigerd, terwijl de
//      solver mijlpalen volledig ondersteunt. Dit bestand verankert dat de regels ze toestaan.
//   2. Een relatie met een VERZAMELTAAK als eindpunt werd overal geaccepteerd maar door de solver
//      weggegooid (die krijgt alleen bladtaken) — een spookrelatie.
//
// Draait via run.sh. Exit 0 = alles groen.

import type { Task } from '@/types/task';
import type { Sequence } from '@/types/sequence';
import { relationVerdict, hasSummaryEndpoint, type TaskLookup } from '@/state/relationRules';

let checks = 0;
const diffs: string[] = [];
function ok(label: string, cond: boolean): void {
  checks++;
  if (!cond) diffs.push(label);
}

// ── Minimale taak-stubs: de regels lezen alleen `id` en `childIds`. ──────────
function task(id: string, childIds: string[] = []): Task {
  return { id, name: id, childIds } as unknown as Task;
}

const leafA = task('a');
const leafB = task('b');
const milestone = { ...task('m'), isMilestone: true } as Task;
const summary = task('s', ['a']);

const byId = new Map<string, Task>([
  [leafA.id, leafA], [leafB.id, leafB], [milestone.id, milestone], [summary.id, summary],
]);

const noSeqs: Sequence[] = [];
const FS = 'FINISH_START' as const;

const lookup: TaskLookup = (id) => byId.get(id);

// ── hasSummaryEndpoint ───────────────────────────────────────────────────────
ok('blad→blad telt als verzameltaak-eindpunt',
  !hasSummaryEndpoint(lookup, { predecessorId: 'a', successorId: 'b' }));
ok('MIJLPAAL als voorganger telt als verzameltaak-eindpunt (regressie-anker)',
  !hasSummaryEndpoint(lookup, { predecessorId: 'm', successorId: 'b' }));
ok('MIJLPAAL als opvolger telt als verzameltaak-eindpunt (regressie-anker)',
  !hasSummaryEndpoint(lookup, { predecessorId: 'a', successorId: 'm' }));
ok('verzameltaak als voorganger niet herkend',
  hasSummaryEndpoint(lookup, { predecessorId: 's', successorId: 'b' }));
ok('verzameltaak als opvolger niet herkend',
  hasSummaryEndpoint(lookup, { predecessorId: 'a', successorId: 's' }));
ok('onbekend eindpunt telt als verzameltaak-eindpunt (mag niet — zie spec §5)',
  !hasSummaryEndpoint(lookup, { predecessorId: 'a', successorId: 'bestaat-niet' }));

// Retroactief: een bladtaak die alsnog een kind krijgt is vanaf dat moment een verzameltaak.
// Dit is de reden dat de markering AFGELEID is en niet opgeslagen.
const promoted = new Map(byId);
promoted.set('b', task('b', ['nieuw-kind']));
const promotedLookup: TaskLookup = (id) => promoted.get(id);
ok('retroactief: blad met nieuw kind niet als verzameltaak herkend',
  hasSummaryEndpoint(promotedLookup, { predecessorId: 'a', successorId: 'b' }));

// ── relationVerdict ──────────────────────────────────────────────────────────
const verdict = (p: string, s: string, seqs: Sequence[] = noSeqs) =>
  relationVerdict(lookup, seqs, { predecessorId: p, successorId: s, type: FS });

ok('blad→blad wordt niet toegestaan', verdict('a', 'b').ok);
ok('mijlpaal→blad wordt niet toegestaan (regressie-anker)', verdict('m', 'b').ok);
ok('blad→mijlpaal wordt niet toegestaan (regressie-anker)', verdict('a', 'm').ok);

const summaryV = verdict('s', 'b');
ok('verzameltaak-eindpunt niet geweigerd', !summaryV.ok);
ok('verzameltaak-eindpunt met verkeerde reden',
  !summaryV.ok && summaryV.reason === 'summary-endpoint');

const selfV = verdict('a', 'a');
ok('zelfrelatie niet geweigerd', !selfV.ok);
ok('zelfrelatie met verkeerde reden', !selfV.ok && selfV.reason === 'self');

const unknownV = verdict('a', 'bestaat-niet');
ok('onbekende taak niet geweigerd', !unknownV.ok);
ok('onbekende taak met verkeerde reden', !unknownV.ok && unknownV.reason === 'unknown-task');

const unknownPredV = verdict('bestaat-niet', 'b');
ok('onbekende voorganger niet geweigerd', !unknownPredV.ok);
ok('onbekende voorganger met verkeerde reden',
  !unknownPredV.ok && unknownPredV.reason === 'unknown-task');

const existing: Sequence[] = [
  { id: 'seq1', predecessorId: 'a', successorId: 'b', type: FS, lagDays: 0 },
];
const dupV = verdict('a', 'b', existing);
ok('duplicaat niet geweigerd', !dupV.ok);
ok('duplicaat met verkeerde reden', !dupV.ok && dupV.reason === 'duplicate');
ok('ander type tussen hetzelfde paar geweigerd (mag juist wél)',
  relationVerdict(lookup, existing, { predecessorId: 'a', successorId: 'b', type: 'START_START' }).ok);
ok('ander PAAR met hetzelfde type geweigerd als duplicaat (mag juist wél)',
  relationVerdict(lookup, existing, { predecessorId: 'a', successorId: 'm', type: FS }).ok);

// Volgorde van de regels: een verzameltaak-eindpunt dat óók een duplicaat is meldt het
// inhoudelijke probleem, niet het duplicaat.
const both: Sequence[] = [
  { id: 'seq2', predecessorId: 's', successorId: 'b', type: FS, lagDays: 0 },
];
const bothV = verdict('s', 'b', both);
ok('verzameltaak+duplicaat meldt duplicaat i.p.v. het inhoudelijke probleem',
  !bothV.ok && bothV.reason === 'summary-endpoint');

// ── Uitslag ──────────────────────────────────────────────────────────────────
if (diffs.length === 0) {
  console.log(`OK  relation-rules: alle checks groen (${checks})`);
  process.exit(0);
} else {
  console.log(`XX  relation-rules: ${diffs.length} afwijking(en) van ${checks}`);
  for (const d of diffs) console.log(`   - ${d}`);
  process.exit(1);
}
