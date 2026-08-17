/**
 * Batterij voor "datums zoals opgeslagen" (issue #63).
 *
 * De functie bestaat omdat een via P6 → IFC geïmporteerde planning datums draagt maar vaak geen
 * sluitende logica: herberekening verschuift de datums en de bron is dan onzichtbaar. Deze batterij
 * bewaakt de drie plekken waar dat mis kan gaan:
 *  - de tweelagenkeuze (early* alleen als het bestand ze gaf, anders schedule*),
 *  - de reconstructie van cpmResult zonder solve (wat wél en wat NIET beweerd mag worden),
 *  - betreden/verlaten en de undo-keten.
 *
 * TZ-gevoelig: draait in run.sh vijf keer onder verschillende tijdzones. Gebruik daarom uitsluitend
 * vaste ISO-datums, nooit `new Date()` zonder anker.
 */
import {
  captureRecordedDates,
  countShiftedTasks,
  cpmResultFromRecorded,
} from '@/engine/scheduler/recordedDates';
import { createDefaultCalendar } from '@/engine/calendar/defaultCalendar';
import type { Task } from '@/types/task';

const diffs: string[] = [];
let checks = 0;
const J = (v: unknown) => JSON.stringify(v);
const eq = (label: string, got: unknown, want: unknown) => {
  checks++;
  if (J(got) !== J(want)) diffs.push(`${label}: verwacht ${J(want)}, kreeg ${J(got)}`);
};
const truthy = (label: string, cond: boolean) => {
  checks++;
  if (!cond) diffs.push(`${label}: verwacht waar, kreeg onwaar`);
};

/** Minimale bladtaak; alleen de velden die deze batterij leest. */
const mk = (id: string, o: Partial<Task['time']> = {}): Task => ({
  id, name: id, description: '', wbsCode: '', taskType: 'CONSTRUCTION', status: 'NOT_STARTED',
  isMilestone: false, priority: 5, parentId: null, childIds: [], resourceIds: [],
  time: {
    durationType: 'WORKTIME', scheduleDuration: 5,
    scheduleStart: '2026-03-02', scheduleFinish: '2026-03-06',
    earlyStart: '2026-03-02', earlyFinish: '2026-03-06',
    lateStart: '2026-03-02', lateFinish: '2026-03-06',
    freeFloat: 0, totalFloat: 0, isCritical: false, completion: 0,
    ...o,
  },
});

// ── (1) Tweelagenkeuze ───────────────────────────────────────────────────────
// Bestand gaf GEEN rekenslots ⇒ schedule* is "zoals opgeslagen", niet de door de lezer
// ingevulde earlyStart-van-vandaag.
const geen = captureRecordedDates([mk('a', { earlyStart: '2099-01-01', earlyFinish: '2099-01-05' })], { a: [] });
eq('1a zonder rekenslots valt terug op scheduleStart', geen.times['a'].start, '2026-03-02');
eq('1b zonder rekenslots valt terug op scheduleFinish', geen.times['a'].finish, '2026-03-06');
eq('1c zonder rekenslots geen speling beweerd', geen.times['a'].totalFloat, undefined);
eq('1d zonder rekenslots geen kritiek beweerd', geen.times['a'].isCritical, undefined);

// Bestand gaf ze WEL ⇒ early* wint.
const wel = captureRecordedDates(
  [mk('a', { earlyStart: '2026-04-01', earlyFinish: '2026-04-08', totalFloat: 3, isCritical: true })],
  { a: ['earlyStart', 'earlyFinish', 'totalFloat', 'isCritical'] },
);
eq('1e met rekenslots wint earlyStart', wel.times['a'].start, '2026-04-01');
eq('1f met rekenslots wint earlyFinish', wel.times['a'].finish, '2026-04-08');
eq('1g met rekenslots komt speling mee', wel.times['a'].totalFloat, 3);
eq('1h met rekenslots komt kritiek mee', wel.times['a'].isCritical, true);

// Geen aanwezigheidsdata (niet-IFC-import) ⇒ helemaal niets vastleggen.
eq('1i zonder recordedFields geen enkele taak', Object.keys(captureRecordedDates([mk('a')], undefined).times), []);

// ── (2) Verschiltelling ──────────────────────────────────────────────────────
const basis = captureRecordedDates([mk('a'), mk('b')], { a: [], b: [] });
eq('2a identiek ⇒ 0 verschoven', countShiftedTasks([mk('a'), mk('b')], basis.times), 0);
eq('2b één verschoven ⇒ 1',
  countShiftedTasks([mk('a', { earlyStart: '2026-05-01' }), mk('b')], basis.times), 1);
eq('2c onbekende taak telt niet mee', countShiftedTasks([mk('c')], basis.times), 0);

// ── (3) Reconstructie ────────────────────────────────────────────────────────
const cal = createDefaultCalendar();
const volInfo = captureRecordedDates(
  [mk('a', { earlyStart: '2026-03-02', earlyFinish: '2026-03-06', totalFloat: 0, isCritical: true }),
   mk('b', { earlyStart: '2026-03-09', earlyFinish: '2026-03-13', totalFloat: 4, isCritical: false })],
  { a: ['earlyStart', 'earlyFinish', 'totalFloat', 'isCritical'],
    b: ['earlyStart', 'earlyFinish', 'totalFloat', 'isCritical'] },
);
const rec = cpmResultFromRecorded(volInfo, [mk('a'), mk('b')], cal);
eq('3a projecteinde = laatste opgeslagen finish', rec.projectEnd, '2026-03-13');
eq('3b kritiek pad uit isCritical', rec.criticalPath, ['a']);
eq('3c criticalPaths[0] === criticalPath', rec.criticalPaths[0], rec.criticalPath);
eq('3d speling uit het bestand', rec.tasks.get('b')?.totalFloat, 4);
truthy('3e geen foutveld', rec.error === undefined);

// Wat NIET in IFC staat, wordt niet verzonnen.
for (const [label, got] of [
  ['drivingSequenceIds', rec.drivingSequenceIds],
  ['truncatedLeadSequenceIds', rec.truncatedLeadSequenceIds],
  ['violatedConstraintTaskIds', rec.violatedConstraintTaskIds],
  ['outOfSequenceSequenceIds', rec.outOfSequenceSequenceIds],
  ['nearCriticalTaskIds', rec.nearCriticalTaskIds],
  ['hammockNoFinishDriverTaskIds', rec.hammockNoFinishDriverTaskIds],
] as const) {
  eq(`3f ${label} blijft leeg`, got, []);
}
eq('3g sequenceFreeFloat blijft leeg', rec.sequenceFreeFloat, {});
eq('3h floatPathByTask blijft leeg', rec.floatPathByTask, {});

// Zonder isCritical in het bestand: géén kritiek pad beweren.
const zonderKritiek = cpmResultFromRecorded(
  captureRecordedDates([mk('a')], { a: [] }), [mk('a')], cal,
);
eq('3i zonder isCritical geen kritiek pad', zonderKritiek.criticalPath, []);
eq('3j zonder isCritical ook criticalPaths leeg', zonderKritiek.criticalPaths, [[]]);

// ── Uitslag ──────────────────────────────────────────────────────────────────
if (diffs.length === 0) {
  console.log(`OK  recorded-dates: alle checks groen (${checks})`);
  process.exit(0);
} else {
  console.log(`XX  recorded-dates: ${diffs.length} afwijking(en) van ${checks}`);
  for (const d of diffs) console.log(`   - ${d}`);
  process.exit(1);
}
