/**
 * Batterij voor "datums zoals opgeslagen" (issue #63).
 *
 * De functie bestaat omdat een via P6 → IFC geïmporteerde planning datums draagt maar vaak geen
 * sluitende logica: herberekening verschuift de datums en de bron is dan onzichtbaar. Deze batterij
 * bewaakt de pure laag (Taak 2 van het implementatieplan):
 *  - de tweelagenkeuze (early* alleen als het bestand ze gaf, anders schedule*),
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
// Getrokken door op 1c/1d: dezelfde "niets beweren zonder aanwezigheid"-regel geldt voor
// lateStart/lateFinish/freeFloat — die zaten nog niet in de batterij en een mutatie die ze altijd
// uit de taak leest (i.p.v. undefined bij afwezigheid) overleefde alle checks.
eq('1c2 zonder rekenslots geen lateStart beweerd', geen.times['a'].lateStart, undefined);
eq('1c3 zonder rekenslots geen lateFinish beweerd', geen.times['a'].lateFinish, undefined);
eq('1c4 zonder rekenslots geen vrije speling beweerd', geen.times['a'].freeFloat, undefined);

// Bestand gaf ze WEL ⇒ early* wint (en symmetrisch: late*/freeFloat winnen ook als ze aanwezig zijn).
const wel = captureRecordedDates(
  [mk('a', {
    earlyStart: '2026-04-01', earlyFinish: '2026-04-08',
    lateStart: '2026-04-02', lateFinish: '2026-04-09',
    totalFloat: 3, freeFloat: 2, isCritical: true,
  })],
  { a: ['earlyStart', 'earlyFinish', 'lateStart', 'lateFinish', 'totalFloat', 'freeFloat', 'isCritical'] },
);
eq('1e met rekenslots wint earlyStart', wel.times['a'].start, '2026-04-01');
eq('1f met rekenslots wint earlyFinish', wel.times['a'].finish, '2026-04-08');
eq('1g met rekenslots komt speling mee', wel.times['a'].totalFloat, 3);
eq('1h met rekenslots komt kritiek mee', wel.times['a'].isCritical, true);
eq('1h2 met rekenslots komt lateStart mee', wel.times['a'].lateStart, '2026-04-02');
eq('1h3 met rekenslots komt lateFinish mee', wel.times['a'].lateFinish, '2026-04-09');
eq('1h4 met rekenslots komt vrije speling mee', wel.times['a'].freeFloat, 2);

// Geen aanwezigheidsdata (niet-IFC-import) ⇒ helemaal niets vastleggen.
eq('1i zonder recordedFields geen enkele taak', Object.keys(captureRecordedDates([mk('a')], undefined).times), []);

// ── (2) Verschiltelling ──────────────────────────────────────────────────────
const basis = captureRecordedDates([mk('a'), mk('b')], { a: [], b: [] });
// `total`/`shifted` op het RecordedDatesInfo zelf — nog los van countShiftedTasks(): `total` is
// het aantal taken met een vastlegging (de noemer in de melding), `shifted` blijft hier altijd 0
// (die vult de aanroeper pas ná runCPM). Een mutatie die deze twee door iets anders vervangt
// (bv. een niet-nul constante voor shifted) overleefde eerder alle checks.
eq('2a1 shifted blijft 0 bij capture', basis.shifted, 0);
// `total` apart van `tasks.length` getest: 'c' zit in de taaklijst maar NIET in recordedFields,
// dus `total` (2) moet hier uit elkaar lopen met `tasks.length` (3) — anders zou de mutatie
// `total: tasks.length` toevallig hetzelfde antwoord geven als hierboven (waar ze gelijk zijn)
// en onopgemerkt blijven.
eq('2a0 total = aantal vastgelegde taken, niet aantal meegegeven taken',
  captureRecordedDates([mk('a'), mk('b'), mk('c')], { a: [], b: [] }).total, 2);
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

// Dezelfde `zonderKritiek`-reconstructie (taak 'a' zonder late*/float/isCritical-rekenslots, dus
// scheduleStart/-Finish '2026-03-02'/'2026-03-06' als "zoals opgeslagen") legt ook de FALLBACKS
// vast die de docstring belooft maar die tot nu toe alleen in commentaar stonden: geen late-datum
// ⇒ gelijk aan de vroege, geen float ⇒ 0, geen isCritical ⇒ false. Een mutatie die deze fallbacks
// op een andere constante zet (bv. epoch, of 99, of `true`) overleefde eerder alle checks.
eq('3k lateStart-fallback = start', zonderKritiek.tasks.get('a')?.lateStart, '2026-03-02');
eq('3l lateFinish-fallback = finish', zonderKritiek.tasks.get('a')?.lateFinish, '2026-03-06');
eq('3m totalFloat-default = 0', zonderKritiek.tasks.get('a')?.totalFloat, 0);
eq('3n freeFloat-default = 0', zonderKritiek.tasks.get('a')?.freeFloat, 0);
eq('3o isCritical-default = false', zonderKritiek.tasks.get('a')?.isCritical, false);

// ── (4) Gemiste deadlines ─────────────────────────────────────────────────────
// `deadline` staat op Task zelf (niet op Task['time']), dus niet via `mk`s tweede argument —
// vandaar de losse spread hieronder. Dekt "Gevuld: … missedDeadlineTaskIds" uit de docstring,
// wat vóór deze aanvulling door geen enkele check werd geraakt (de mutatie "zet
// missedDeadlineTaskIds altijd leeg" overleefde de hele batterij).
const overDeadline: Task = { ...mk('a', { earlyStart: '2026-03-02', earlyFinish: '2026-03-06' }), deadline: '2026-03-05' };
const binnenDeadline: Task = { ...mk('b', { earlyStart: '2026-03-02', earlyFinish: '2026-03-04' }), deadline: '2026-03-10' };
const infoDeadline = captureRecordedDates(
  [overDeadline, binnenDeadline],
  { a: ['earlyStart', 'earlyFinish'], b: ['earlyStart', 'earlyFinish'] },
);
const recDeadline = cpmResultFromRecorded(infoDeadline, [overDeadline, binnenDeadline], cal);
eq('4a finish voorbij deadline ⇒ gemeld', recDeadline.missedDeadlineTaskIds, ['a']);
truthy('4b finish binnen deadline ⇒ niet gemeld', !recDeadline.missedDeadlineTaskIds.includes('b'));

// ── (5) projectDuration — regressietest voor de TZ-bug (issue-#63-review, MOET 1) ────────────────
// `earlyStart`/`earlyFinish` in UUR-modus zijn "YYYY-MM-DDTHH:mm" ZONDER tijdzone-suffix — precies
// wat `formatInstant(d, 'hour')`/de IFC-lezer produceren. Zo'n string moet als UTC gelezen worden
// (`parseInstant`, net als de rest van de engine); `new Date(...)` leest hem i.p.v. daarvan als
// LOKALE tijd, wat bij een positieve UTC-offset (Pacific/Auckland, UTC+12/13) de dag-index een dag
// terugschuift en `workDaysBetween` een werkdag laat missen. Bewezen kapot vóór de fix: onder
// TZ=Pacific/Auckland gaf de `new Date(...)`-versie hier 4 i.p.v. 5 (tijdelijk teruggezet met de
// Edit-tool, niet gecommit — zie de taakrapportage). Draait mee in de tijdzone-matrix van run.sh,
// dus dit moet op alle vijf zones exact 5 geven.
const capHour = captureRecordedDates(
  [mk('a', {
    earlyStart: '2026-03-02T08:00', earlyFinish: '2026-03-06T16:00',
    totalFloat: 0, isCritical: true,
  })],
  { a: ['earlyStart', 'earlyFinish', 'totalFloat', 'isCritical'] },
);
const recHour = cpmResultFromRecorded(capHour, [mk('a')], cal);
eq('5a projectDuration TZ-onafhankelijk (uur-modus, ma t/m vr)', recHour.projectDuration, 5);

// ── Uitslag ──────────────────────────────────────────────────────────────────
if (diffs.length === 0) {
  console.log(`OK  recorded-dates: alle checks groen (${checks})`);
  process.exit(0);
} else {
  console.log(`XX  recorded-dates: ${diffs.length} afwijking(en) van ${checks}`);
  for (const d of diffs) console.log(`   - ${d}`);
  process.exit(1);
}
