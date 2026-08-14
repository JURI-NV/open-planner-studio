// Samenvattingsrelatie-propagatie (vervolg op 489a9ef2): unit- en hostile-checks voor de PURE
// functie `expandSummaryRelations` (los van de CPM-cases in cases-edge.json, die de vier vormen
// end-to-end via de echte store dekken — zie de "wbs-summary-relation-*"-cases). Hier zitten de
// boomtopologie-randgevallen die met handberekende datums lastig te toetsen zijn: welke relaties
// exact worden gegenereerd (ids/richting/lag-behoud), cyclusvastheid, en de MAX_EXPANDED_RELATIONS-
// klem onder een hostile kruisproduct.
//
// Draait via run.sh (esbuild-bundel, zoals check-advanced-cpm.ts). Exit 0 = alles groen.
import {
  expandSummaryRelations, MAX_EXPANDED_RELATIONS,
} from '@/engine/scheduler/expandSummaryRelations';
import type { Task } from '@/types/task';
import type { Sequence } from '@/types/sequence';
import { createDefaultTaskTime } from '@/utils/taskDefaults';

const diffs: string[] = [];
let checks = 0;
const truthy = (label: string, cond: boolean) => {
  checks++;
  if (!cond) diffs.push(label);
};
const eq = (label: string, got: unknown, want: unknown) => {
  checks++;
  if (got !== want) diffs.push(`${label}: verwacht ${JSON.stringify(want)}, kreeg ${JSON.stringify(got)}`);
};

function mkTask(id: string, extra: Partial<Task> = {}): Task {
  return {
    id, name: id, description: '', wbsCode: '', taskType: 'CONSTRUCTION', status: 'NOT_STARTED',
    isMilestone: false, priority: 500, parentId: null, childIds: [],
    time: createDefaultTaskTime('2026-06-01', 1), resourceIds: [],
    ...extra,
  };
}
function fs(id: string, pred: string, succ: string, lagDays = 0): Sequence {
  return { id, predecessorId: pred, successorId: succ, type: 'FINISH_START', lagDays };
}
/** Sorteer synthetische output op (pred,succ) zodat de assertie ongevoelig is voor generatievolgorde. */
function sortedPairs(seqs: Sequence[]): string[] {
  return seqs.map((s) => `${s.predecessorId}>${s.successorId}`).sort();
}

// ── 1) Bladtaak-naar-bladtaak — geen samenvatting aan weerskant: ongewijzigd doorgeven ───────────
{
  const tasks = [mkTask('A'), mkTask('B')];
  const seq = fs('s1', 'A', 'B', 3);
  const { sequences, droppedSequenceIds } = expandSummaryRelations(tasks, [seq]);
  eq('01 leaf->leaf: exact 1 relatie terug', sequences.length, 1);
  eq('02 leaf->leaf: id ongewijzigd (geen synthetische suffix)', sequences[0]?.id, 's1');
  eq('03 leaf->leaf: predecessorId ongewijzigd', sequences[0]?.predecessorId, 'A');
  eq('04 leaf->leaf: successorId ongewijzigd', sequences[0]?.successorId, 'B');
  eq('05 leaf->leaf: lag behouden', sequences[0]?.lagDays, 3);
  eq('06 leaf->leaf: niets gedropt', droppedSequenceIds.length, 0);
}

// ── 2) Samenvatting als VOORGANGER: elk bladkind wordt zelf voorganger van de opvolger ───────────
{
  const p1 = mkTask('P1', { childIds: ['K1a', 'K1b'] });
  const k1a = mkTask('K1a', { parentId: 'P1' });
  const k1b = mkTask('K1b', { parentId: 'P1' });
  const l = mkTask('L');
  const seq = fs('pred-sum', 'P1', 'L', 2);
  const { sequences, droppedSequenceIds } = expandSummaryRelations([p1, k1a, k1b, l], [seq]);
  eq('07 pred-summary: 2 gegenereerde relaties (1 per bladkind)', sequences.length, 2);
  eq(
    '08 pred-summary: precies K1a->L en K1b->L',
    sortedPairs(sequences).join(','),
    'K1a>L,K1b>L',
  );
  truthy('09 pred-summary: elke synthetische id begint met het origineel + "::exp-"', sequences.every((s) => s.id.startsWith('pred-sum::exp-')));
  truthy('10 pred-summary: type/lag behouden op elke gegenereerde relatie', sequences.every((s) => s.type === 'FINISH_START' && s.lagDays === 2));
  eq('11 pred-summary: origineel niet zelf in de output (P1 komt nergens als predecessorId voor)', sequences.some((s) => s.predecessorId === 'P1'), false);
  eq('12 pred-summary: niets gedropt', droppedSequenceIds.length, 0);
}

// ── 3) Samenvatting als OPVOLGER: elk bladkind wordt zelf opvolger van de voorganger ──────────────
{
  const p1 = mkTask('P1', { childIds: ['K1a', 'K1b'] });
  const k1a = mkTask('K1a', { parentId: 'P1' });
  const k1b = mkTask('K1b', { parentId: 'P1' });
  const l = mkTask('L');
  const seq = fs('succ-sum', 'L', 'P1');
  const { sequences, droppedSequenceIds } = expandSummaryRelations([l, p1, k1a, k1b], [seq]);
  eq('13 succ-summary: 2 gegenereerde relaties', sequences.length, 2);
  eq('14 succ-summary: precies L->K1a en L->K1b', sortedPairs(sequences).join(','), 'L>K1a,L>K1b');
  eq('15 succ-summary: niets gedropt', droppedSequenceIds.length, 0);
}

// ── 4) BEIDE kanten samenvatting: kruisproduct ────────────────────────────────────────────────────
{
  const p1 = mkTask('P1', { childIds: ['K1a', 'K1b'] });
  const k1a = mkTask('K1a', { parentId: 'P1' });
  const k1b = mkTask('K1b', { parentId: 'P1' });
  const p2 = mkTask('P2', { childIds: ['K2a', 'K2b'] });
  const k2a = mkTask('K2a', { parentId: 'P2' });
  const k2b = mkTask('K2b', { parentId: 'P2' });
  const seq = fs('both-sum', 'P1', 'P2');
  const { sequences, droppedSequenceIds } = expandSummaryRelations([p1, k1a, k1b, p2, k2a, k2b], [seq]);
  eq('16 both-summary: kruisproduct 2x2 = 4 relaties', sequences.length, 4);
  eq(
    '17 both-summary: exact het kruisproduct {K1a,K1b}x{K2a,K2b}',
    sortedPairs(sequences).join(','),
    'K1a>K2a,K1a>K2b,K1b>K2a,K1b>K2b',
  );
  eq('18 both-summary: niets gedropt', droppedSequenceIds.length, 0);
}

// ── 5) Geneste samenvattingen: recursief tot bladtaken (P3 -> P4 -> {G1,G2}) ──────────────────────
{
  const p3 = mkTask('P3', { childIds: ['P4'] });
  const p4 = mkTask('P4', { parentId: 'P3', childIds: ['G1', 'G2'] });
  const g1 = mkTask('G1', { parentId: 'P4' });
  const g2 = mkTask('G2', { parentId: 'P4' });
  const l = mkTask('L');
  const seq = fs('nested-sum', 'P3', 'L');
  const { sequences, droppedSequenceIds } = expandSummaryRelations([p3, p4, g1, g2, l], [seq]);
  eq('19 nested: daalt door P4 af tot de echte bladtaken G1/G2 (2 relaties)', sequences.length, 2);
  eq('20 nested: precies G1->L en G2->L (niet P4->L)', sortedPairs(sequences).join(','), 'G1>L,G2>L');
  eq('21 nested: niets gedropt', droppedSequenceIds.length, 0);
}

// ── 6) Kapotte tak: samenvatting met alleen een verweesd kind-id ⇒ geen bladafstammelingen ────────
{
  const ghost = mkTask('Ghost', { childIds: ['nonexistent-child'] });
  const l = mkTask('L');
  const seq = fs('ghost-sum', 'Ghost', 'L');
  const { sequences, droppedSequenceIds } = expandSummaryRelations([ghost, l], [seq]);
  eq('22 kapotte tak: 0 relaties gegenereerd', sequences.length, 0);
  eq('23 kapotte tak: origineel id in droppedSequenceIds', droppedSequenceIds.join(','), 'ghost-sum');
}

// ── 7) Cyclusvastheid: taak die (indirect) zijn eigen afstammeling is — geen oneindige lus ────────
{
  const self = mkTask('SelfSum', { childIds: ['SelfSum'] }); // corrupt: verwijst naar zichzelf
  const l = mkTask('L');
  const seq = fs('self-cycle', 'SelfSum', 'L');
  const t0 = Date.now();
  const { sequences, droppedSequenceIds } = expandSummaryRelations([self, l], [seq]);
  const elapsedMs = Date.now() - t0;
  truthy(`24 zelf-cyclus: rondt direct af (${elapsedMs}ms), geen hang`, elapsedMs < 1000);
  eq('25 zelf-cyclus: geen bladafstammelingen gevonden ⇒ 0 relaties', sequences.length, 0);
  eq('26 zelf-cyclus: origineel gedropt (niet gecrasht)', droppedSequenceIds.join(','), 'self-cycle');

  // Twee-knopen-cyclus C1<->C2, geen van beide heeft een echte bladtaak als kind.
  const c1 = mkTask('C1', { childIds: ['C2'] });
  const c2 = mkTask('C2', { childIds: ['C1'] });
  const seq2 = fs('mutual-cycle', 'C1', 'L');
  const t1 = Date.now();
  const res2 = expandSummaryRelations([c1, c2, l], [seq2]);
  const elapsedMs2 = Date.now() - t1;
  truthy(`27 wederzijdse cyclus: rondt direct af (${elapsedMs2}ms), geen hang`, elapsedMs2 < 1000);
  eq('28 wederzijdse cyclus: 0 relaties', res2.sequences.length, 0);
  eq('29 wederzijdse cyclus: origineel gedropt (niet gecrasht)', res2.droppedSequenceIds.join(','), 'mutual-cycle');
}

// ── 8) Verweesd/ongeldig taak-id (géén samenvattingsgeval): ongewijzigd doorgeven, niet hier gedropt
//      — dat blijft het vangnet van de CPMSolver-constructor-guard (489a9ef2). ─────────────────────
{
  const l = mkTask('L');
  const seq = fs('dangling', 'L', 'does-not-exist');
  const { sequences, droppedSequenceIds } = expandSummaryRelations([l], [seq]);
  eq('30 verweesd id: ongewijzigd doorgegeven (geen expansie, geen drop hier)', sequences.length, 1);
  eq('31 verweesd id: origineel id/predecessor/successor intact', `${sequences[0]?.id}|${sequences[0]?.predecessorId}|${sequences[0]?.successorId}`, 'dangling|L|does-not-exist');
  eq('32 verweesd id: niet in droppedSequenceIds (dat is de solver-guard zijn taak)', droppedSequenceIds.length, 0);
}

// ── 9) HOSTILE: kruisproduct-klem — twee samenvattingen van elk 300 bladkinderen (90.000 combinaties
//      > MAX_EXPANDED_RELATIONS) mogen de solver niet laten vastlopen/OOM'en. De hele relatie wordt
//      ATOMAIR gedropt (geen half-juiste subset), binnen een tijdslimiet. ──────────────────────────
{
  const N = 300; // 300*300 = 90.000 > 50.000
  truthy(`33 hostile-fixture bewijst zijn eigen premisse (${N}x${N}=${N * N} > MAX=${MAX_EXPANDED_RELATIONS})`, N * N > MAX_EXPANDED_RELATIONS);

  const bigPChildren = Array.from({ length: N }, (_, i) => `BP-${i}`);
  const bigQChildren = Array.from({ length: N }, (_, i) => `BQ-${i}`);
  const bigP = mkTask('BigP', { childIds: bigPChildren });
  const bigQ = mkTask('BigQ', { childIds: bigQChildren });
  const leaves = [
    ...bigPChildren.map((id) => mkTask(id, { parentId: 'BigP' })),
    ...bigQChildren.map((id) => mkTask(id, { parentId: 'BigQ' })),
  ];
  // Een onschuldige, klein-blijvende relatie ernaast — bewijst dat de klem NIET de hele aanroep
  // laat mislukken, alleen de relatie(s) die zelf niet passen. VOLGORDE is bewust "small" vóór
  // "big": budgetExhausted is permanent zodra één relatie niet past (§ zie het functiecommentaar
  // "geen her-proberen op een kleiner kruisproduct verderop in de lijst") — "small" moet dus vóór
  // "big" in de lijst staan om nog binnen het budget te vallen.
  const small = mkTask('Small');
  const seqSmall = fs('small-fs', 'Small', 'BigP');
  const seqBig = fs('big-cross', 'BigP', 'BigQ');

  const TIME_LIMIT_MS = 5000;
  const t0 = Date.now();
  const { sequences, droppedSequenceIds } = expandSummaryRelations(
    [bigP, bigQ, small, ...leaves],
    [seqSmall, seqBig],
  );
  const elapsedMs = Date.now() - t0;

  truthy(`34 hostile: binnen tijdslimiet (${elapsedMs}ms < ${TIME_LIMIT_MS}ms)`, elapsedMs < TIME_LIMIT_MS);
  truthy(
    `35 hostile: totaal aantal gegenereerde relaties blijft onder de klem (${sequences.length} <= ${MAX_EXPANDED_RELATIONS})`,
    sequences.length <= MAX_EXPANDED_RELATIONS,
  );
  eq('36 hostile: de te-grote relatie is volledig (atomair) gedropt, geen partiële subset', sequences.some((s) => s.predecessorId.startsWith('BP-') && s.successorId.startsWith('BQ-')), false);
  truthy('37 hostile: de te-grote relatie staat in droppedSequenceIds', droppedSequenceIds.includes('big-cross'));
  // "small-fs" (Small -> BigP, N=300 combinaties) past nog ruim binnen het budget en moet dus WEL
  // volledig geëxpandeerd zijn — de klem raakt alleen wat zelf niet past, niet de rest van de batch.
  eq('38 hostile: de kleine relatie ernaast is wél volledig geëxpandeerd (300 relaties)', sequences.filter((s) => s.predecessorId === 'Small').length, N);
  eq('39 hostile: de kleine relatie staat niet in droppedSequenceIds', droppedSequenceIds.includes('small-fs'), false);
}

if (diffs.length === 0) {
  console.log(`OK  summary-relation-expansion: alle checks groen (${checks})`);
} else {
  console.log(`XX  summary-relation-expansion: ${diffs.length} afwijking(en) van ${checks}`);
  for (const d of diffs) console.log(`   - ${d}`);
  process.exitCode = 1;
}
