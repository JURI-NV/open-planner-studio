/**
 * Batterij voor "datums zoals opgeslagen" (issue #63).
 *
 * De functie bestaat omdat een via P6 → IFC geïmporteerde planning datums draagt maar vaak geen
 * sluitende logica: herberekening verschuift de datums en de bron is dan onzichtbaar. Deze batterij
 * bewaakt de pure laag (Taak 2 van het implementatieplan):
 *  - de laagkeuze (early-laag alleen bij een VOLLEDIG early-paar, anders schedule-laag bij een
 *    volledig schedule-paar, anders geen uitspraak — MOET 1 + MOET 4 uit de kwaliteitsreview),
 *  - de verschiltelling (countShiftedTasks),
 *  - de reconstructie van cpmResult zonder solve (wat wél en wat NIET beweerd mag worden).
 * Betreden/verlaten en de undo-keten horen NIET bij deze batterij — die laag hangt pas in een
 * latere taak van het plan (store/laadpad/UI) en wordt daar apart getest.
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

/** Minimale bladtaak; alleen de velden die deze batterij leest. Derde parameter (KLEIN-14,
 *  kwaliteitsreview) voor top-level `Task`-velden zoals `deadline`, die niet op `Task['time']` zitten
 *  en anders met een losse object-spread per callsite herhaald zouden moeten worden. */
const mk = (id: string, o: Partial<Task['time']> = {}, extra: Partial<Task> = {}): Task => ({
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
  ...extra,
});

// ── (1) Laagkeuze: early vs. schedule, per taak (niet per veld) ──────────────────────────────────
// Bestand gaf GEEN rekenslots maar WEL het schedule-paar ⇒ schedule* is "zoals opgeslagen", niet de
// door de lezer ingevulde earlyStart-van-vandaag. (Dit is het geval van issue #63: een P6-export die
// alleen ScheduleStart/ScheduleFinish vult — beide dus aanwezig in recordedFields, MOET 1.)
const geen = captureRecordedDates(
  [mk('a', { earlyStart: '2099-01-01', earlyFinish: '2099-01-05' })],
  { a: ['scheduleStart', 'scheduleFinish'] },
);
eq('1a zonder rekenslots valt terug op scheduleStart', geen.times['a'].start, '2026-03-02');
eq('1b zonder rekenslots valt terug op scheduleFinish', geen.times['a'].finish, '2026-03-06');
eq('1c zonder rekenslots geen speling beweerd', geen.times['a'].totalFloat, undefined);
eq('1d zonder rekenslots geen kritiek beweerd', geen.times['a'].isCritical, undefined);
eq('1e zonder rekenslots geen lateStart beweerd', geen.times['a'].lateStart, undefined);
eq('1f zonder rekenslots geen lateFinish beweerd', geen.times['a'].lateFinish, undefined);
eq('1g zonder rekenslots geen vrije speling beweerd', geen.times['a'].freeFloat, undefined);

// Bestand gaf ze WEL ⇒ early* wint (en symmetrisch: late*/freeFloat winnen ook als ze aanwezig zijn).
const wel = captureRecordedDates(
  [mk('a', {
    earlyStart: '2026-04-01', earlyFinish: '2026-04-08',
    lateStart: '2026-04-02', lateFinish: '2026-04-09',
    totalFloat: 3, freeFloat: 2, isCritical: true,
  })],
  { a: ['earlyStart', 'earlyFinish', 'lateStart', 'lateFinish', 'totalFloat', 'freeFloat', 'isCritical'] },
);
eq('1h met rekenslots wint earlyStart', wel.times['a'].start, '2026-04-01');
eq('1i met rekenslots wint earlyFinish', wel.times['a'].finish, '2026-04-08');
eq('1j met rekenslots komt speling mee', wel.times['a'].totalFloat, 3);
eq('1k met rekenslots komt kritiek mee', wel.times['a'].isCritical, true);
eq('1l met rekenslots komt lateStart mee', wel.times['a'].lateStart, '2026-04-02');
eq('1m met rekenslots komt lateFinish mee', wel.times['a'].lateFinish, '2026-04-09');
eq('1n met rekenslots komt vrije speling mee', wel.times['a'].freeFloat, 2);

// Geen aanwezigheidsdata (niet-IFC-import) ⇒ helemaal niets vastleggen.
eq('1o zonder recordedFields geen enkele taak', Object.keys(captureRecordedDates([mk('a')], undefined).times), []);

// MOET 4 (kwaliteitsreview, beslissing): een HALF early-paar wordt NIET aangevuld met de andere
// laag — de laag wordt één keer per taak gekozen. `earlyStart` is aanwezig maar `earlyFinish` niet;
// het volledige schedule-paar IS aanwezig, dus de hele taak valt op de schedule-laag (niet een
// samengesteld paar van earlyStart + scheduleFinish, wat een uitspraak zou zijn die het bestand
// nooit deed en zelfs finish-vóór-start had kunnen opleveren).
const halfEarly = captureRecordedDates(
  [mk('a', { earlyStart: '2026-04-01', scheduleStart: '2026-03-02', scheduleFinish: '2026-03-06' })],
  { a: ['earlyStart', 'scheduleStart', 'scheduleFinish'] }, // earlyFinish ontbreekt bewust
);
eq('1p half early-paar ⇒ hele taak op schedule-laag (start)', halfEarly.times['a'].start, '2026-03-02');
eq('1q half early-paar ⇒ hele taak op schedule-laag (finish)', halfEarly.times['a'].finish, '2026-03-06');

// Het NORMALE pad voor élk eigen OPS-bestand (hercontrole kwaliteitsreview): een door OPS zelf
// geschreven bestand vult altijd alle negen slots (zie check-ifc-roundtrip.ts (1b)), dus "beide paren
// compleet, early wint" is niet een randgeval maar de standaardsituatie voor elk eigen bestand — en
// rustte tot nu toe alleen op de ongeteste if/else-if.
const beideCompleet = captureRecordedDates(
  [mk('a', { earlyStart: '2026-04-01', earlyFinish: '2026-04-08' })], // scheduleStart/-Finish blijven de mk-default 2026-03-02/-06
  { a: ['earlyStart', 'earlyFinish', 'scheduleStart', 'scheduleFinish'] },
);
eq('1v beide paren compleet ⇒ early wint (start)', beideCompleet.times['a'].start, '2026-04-01');
eq('1w beide paren compleet ⇒ early wint (finish)', beideCompleet.times['a'].finish, '2026-04-08');

// MOET 1 + MOET 4: geen van beide paren compleet ⇒ geen uitspraak, taak wordt overgeslagen.
const geenPaarCompleet = captureRecordedDates([mk('a', { earlyStart: '2026-04-01' })], { a: ['earlyStart'] });
eq('1r geen compleet paar ⇒ taak niet vastgelegd', Object.keys(geenPaarCompleet.times), []);
eq('1s geen compleet paar ⇒ ook niet in total', geenPaarCompleet.total, 0);

// MOET 1 (KRITIEK, kwaliteitsreview): een IFCTASK ZONDER IfcTaskTime krijgt in ifcReader.ts een
// synthetische "vandaag"-tijd (`createDefaultTaskTime`) én `recordedFields[id] = []` (leeg, niet
// ontbrekend — zie check-ifc-roundtrip.ts §9r). Met een lege presence-lijst is GEEN van beide paren
// compleet, dus deze taak moet volledig worden overgeslagen: niet in `times`, niet in `total`. Zonder
// deze guard zou `scheduleStart` hieronder (hier bewust een absurde placeholder, model voor "vandaag")
// als een echte opgeslagen datum zijn gelezen — precies de kritieke bevinding.
const zonderIfcTaskTime = captureRecordedDates(
  [mk('a', { scheduleStart: '2099-09-09', scheduleFinish: '2099-09-13' })],
  { a: [] },
);
eq('1t taak zonder IfcTaskTime landt niet in times', Object.keys(zonderIfcTaskTime.times), []);
eq('1u taak zonder IfcTaskTime telt niet mee in total', zonderIfcTaskTime.total, 0);

// ── (2) Verschiltelling ──────────────────────────────────────────────────────
// Schedule-paar aanwezig (niet `[]`, zie MOET 1 hierboven — anders wordt de taak overgeslagen en
// blijft `times` leeg, wat deze sectie niets zou laten testen).
const basis = captureRecordedDates(
  [mk('a'), mk('b')],
  { a: ['scheduleStart', 'scheduleFinish'], b: ['scheduleStart', 'scheduleFinish'] },
);
// `total` apart van `tasks.length` getest: 'c' zit in de taaklijst maar NIET in recordedFields,
// dus `total` (2) moet hier uit elkaar lopen met `tasks.length` (3) — anders zou de mutatie
// `total: tasks.length` toevallig hetzelfde antwoord geven en onopgemerkt blijven.
eq('2a total = aantal vastgelegde taken, niet aantal meegegeven taken',
  captureRecordedDates(
    [mk('a'), mk('b'), mk('c')],
    { a: ['scheduleStart', 'scheduleFinish'], b: ['scheduleStart', 'scheduleFinish'] },
  ).total, 2);
eq('2b identiek ⇒ 0 verschoven', countShiftedTasks([mk('a'), mk('b')], basis.times), 0);
eq('2c één verschoven ⇒ 1',
  countShiftedTasks([mk('a', { earlyStart: '2026-05-01' }), mk('b')], basis.times), 1);
eq('2d onbekende taak telt niet mee', countShiftedTasks([mk('c')], basis.times), 0);

// KLEIN-13 (kwaliteitsreview) — randgevallen die niets breken maar tot nu toe niets vastlegden.
eq('2e een id in recordedFields dat niet in tasks zit ⇒ genegeerd',
  captureRecordedDates([mk('a')], { a: ['scheduleStart', 'scheduleFinish'], zzz: [] }).total, 1);
eq('2f lege takenlijst ⇒ lege vastlegging', captureRecordedDates([], { a: [] }), { times: {}, total: 0 });

// ── (3) Reconstructie ────────────────────────────────────────────────────────
const cal = createDefaultCalendar();
const volInfo = captureRecordedDates(
  [mk('a', { earlyStart: '2026-03-02', earlyFinish: '2026-03-06', totalFloat: 0, isCritical: true }),
   mk('b', { earlyStart: '2026-03-09', earlyFinish: '2026-03-13', totalFloat: 4, isCritical: false })],
  { a: ['earlyStart', 'earlyFinish', 'totalFloat', 'isCritical'],
    b: ['earlyStart', 'earlyFinish', 'totalFloat', 'isCritical'] },
);
const rec = cpmResultFromRecorded(volInfo.times, [mk('a'), mk('b')], cal);
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

// Zonder isCritical in het bestand: géén kritiek pad beweren. Schedule-paar aanwezig (MOET 1),
// anders wordt 'a' hier overgeslagen en toont deze reconstructie niets.
const zonderKritiek = cpmResultFromRecorded(
  captureRecordedDates([mk('a')], { a: ['scheduleStart', 'scheduleFinish'] }).times, [mk('a')], cal,
);
eq('3i zonder isCritical geen kritiek pad', zonderKritiek.criticalPath, []);
eq('3j zonder isCritical ook criticalPaths leeg', zonderKritiek.criticalPaths, [[]]);

// Dezelfde `zonderKritiek`-reconstructie (taak 'a' zonder late*/float/isCritical-rekenslots, dus
// scheduleStart/-Finish '2026-03-02'/'2026-03-06' als "zoals opgeslagen") legt ook de FALLBACKS
// vast die de docstring belooft: geen late-datum ⇒ gelijk aan de vroege, geen float ⇒ 0, geen
// isCritical ⇒ false.
eq('3k lateStart-fallback = start', zonderKritiek.tasks.get('a')?.lateStart, '2026-03-02');
eq('3l lateFinish-fallback = finish', zonderKritiek.tasks.get('a')?.lateFinish, '2026-03-06');
eq('3m totalFloat-default = 0', zonderKritiek.tasks.get('a')?.totalFloat, 0);
eq('3n freeFloat-default = 0', zonderKritiek.tasks.get('a')?.freeFloat, 0);
eq('3o isCritical-default = false', zonderKritiek.tasks.get('a')?.isCritical, false);

// KLEIN-13: `times` gevuld maar `tasks` leeg ⇒ niets te reconstrueren (de functie filtert `tasks`,
// niet `times`), en een volledig lege taaklijst/tijdlijst crasht niet en geeft het lege resultaat.
const legeTasks = cpmResultFromRecorded(volInfo.times, [], cal);
eq('3p times gevuld maar tasks leeg ⇒ leeg resultaat', legeTasks.tasks.size, 0);
eq('3q times gevuld maar tasks leeg ⇒ geen projecteinde', legeTasks.projectEnd, '');
const legeBeide = cpmResultFromRecorded({}, [], cal);
eq('3r volledig leeg ⇒ projectDuration 0', legeBeide.projectDuration, 0);

// ── (4) Gemiste deadlines ─────────────────────────────────────────────────────
// `deadline` staat op Task zelf (niet op Task['time']) — vandaar `mk`'s derde parameter.
const overDeadline = mk('a', { earlyStart: '2026-03-02', earlyFinish: '2026-03-06' }, { deadline: '2026-03-05' });
const binnenDeadline = mk('b', { earlyStart: '2026-03-02', earlyFinish: '2026-03-04' }, { deadline: '2026-03-10' });
// Grensgeval (KLEIN-11, verving een tautologie): finish EXACT op de deadline is niet "voorbij" —
// de vergelijking is strikt `>`, dus dit hoort NIET gemeld te worden. Een mutatie naar `>=` zou dit
// wél melden en zonder deze case onopgemerkt blijven (4a alleen bewijst al `=== ['a']`, dus 'b'/'d'
// waren daar al triviaal uitgesloten).
const opDeadline = mk('d', { earlyStart: '2026-03-02', earlyFinish: '2026-03-06' }, { deadline: '2026-03-06' });
const infoDeadline = captureRecordedDates(
  [overDeadline, binnenDeadline, opDeadline],
  { a: ['earlyStart', 'earlyFinish'], b: ['earlyStart', 'earlyFinish'], d: ['earlyStart', 'earlyFinish'] },
);
const recDeadline = cpmResultFromRecorded(infoDeadline.times, [overDeadline, binnenDeadline, opDeadline], cal);
eq('4a finish voorbij deadline ⇒ gemeld, binnen/op de deadline niet', recDeadline.missedDeadlineTaskIds, ['a']);

// ── (5) projectDuration — regressietest voor de TZ-bug (issue-#63-review, MOET 1 van een vorige
// review-ronde) ────────────────────────────────────────────────────────────────────────────────
// `earlyStart`/`earlyFinish` in UUR-modus zijn "YYYY-MM-DDTHH:mm" ZONDER tijdzone-suffix — precies
// wat `formatInstant(d, 'hour')`/de IFC-lezer produceren. Zo'n string moet als UTC gelezen worden
// (`parseInstant`), niet als lokale tijd (`new Date(...)`): onder TZ=Pacific/Auckland gaf de
// `new Date(...)`-versie hier 4 i.p.v. 5. Draait mee in de tijdzone-matrix van run.sh, dus dit moet
// op alle vijf zones exact 5 geven.
const capHour = captureRecordedDates(
  [mk('a', {
    earlyStart: '2026-03-02T08:00', earlyFinish: '2026-03-06T16:00',
    totalFloat: 0, isCritical: true,
  })],
  { a: ['earlyStart', 'earlyFinish', 'totalFloat', 'isCritical'] },
);
const recHour = cpmResultFromRecorded(capHour.times, [mk('a')], cal);
eq('5a projectDuration TZ-onafhankelijk (uur-modus, ma t/m vr)', recHour.projectDuration, 5);

// ── (6) Mijlpaal-alleen-uitzondering (hercontrole kwaliteitsreview, volgend op GRAAG-6) ──────────
// `cpmResultFromRecorded` deelt sinds de vorige ronde `projectDurationOf` met de solver, INCLUSIEF de
// mijlpaal-alleen-uitzondering. Dat is een echte gedragswijziging (was voorheen bewust wég-
// gedocumenteerd als "afwijking 1") en stond tot nu toe zonder assertie.
const mijlpaalOpEenDag = mk('a', { earlyStart: '2026-03-02', earlyFinish: '2026-03-02' }, { isMilestone: true });
const recMijlpaal = cpmResultFromRecorded(
  captureRecordedDates([mijlpaalOpEenDag], { a: ['earlyStart', 'earlyFinish'] }).times,
  [mijlpaalOpEenDag], cal,
);
eq('6a uitsluitend mijlpaal op één dag ⇒ projectDuration 0', recMijlpaal.projectDuration, 0);

// Tegenhanger: een echte werk-taak (geen mijlpaal, scheduleDuration > 0 — de `mk`-default is 5) op
// één dag ⇒ wél 1: de uitzondering slaat NIET toe zodra er écht werk in de set zit.
const werkOpEenDag = mk('b', { earlyStart: '2026-03-02', earlyFinish: '2026-03-02' });
const recWerk = cpmResultFromRecorded(
  captureRecordedDates([werkOpEenDag], { b: ['earlyStart', 'earlyFinish'] }).times,
  [werkOpEenDag], cal,
);
eq('6b echte werk-taak op één dag ⇒ projectDuration 1', recWerk.projectDuration, 1);

// ── Uitslag ──────────────────────────────────────────────────────────────────
if (diffs.length === 0) {
  console.log(`OK  recorded-dates: alle checks groen (${checks})`);
  process.exit(0);
} else {
  console.log(`XX  recorded-dates: ${diffs.length} afwijking(en) van ${checks}`);
  for (const d of diffs) console.log(`   - ${d}`);
  process.exit(1);
}
