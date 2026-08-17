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
import { useAppStore } from '@/state/appStore';
import { readIFC } from '@/services/ifc/ifcReader';
import { writeIFC } from '@/services/ifc/ifcWriter';
import { buildWriteIFCInput } from '@/state/ifcSaveInput';
import { IFC_TASKTIME_SLOTS, IFC_TASK_SLOTS, TASKTIME_SLOT, TASK_SLOT } from '@/services/ifc/ifcTaskSlots';

const S = () => useAppStore.getState();

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

// ── Gedeelde IFC-fixturebouwers (secties 7 t/m 9) ────────────────────────────────────────────────
// Bouw de IFCTASKTIME-/IFCTASK-argumentreeksen via de gedeelde slot-registry (ifcTaskSlots.ts) —
// niet met de hand geteld. `new Array(IFC_TASKTIME_SLOTS.length)` legt de arraylengte vast aan
// dezelfde bron als de reader/writer, en de posities komen uit `TASKTIME_SLOT`/`TASK_SLOT`
// (naam→index-maps, afgeleid van diezelfde registry) — zo kan een verschoven index (zoals eerder
// de taskTime-ref op index 8 i.p.v. 11) hier niet meer onopgemerkt insluipen. De assertie op
// `recordedFields` in (7) bewijst dat de posities ook echt kloppen.
const ttArgs = (o: { scheduleStart: string; scheduleFinish: string; earlyStart: string; earlyFinish: string; duration: string }) => {
  const a: string[] = new Array(IFC_TASKTIME_SLOTS.length).fill('$');
  a[TASKTIME_SLOT.name] = "'T'";
  a[TASKTIME_SLOT.dataOrigin] = '.PREDICTED.';
  a[TASKTIME_SLOT.durationType] = '.WORKTIME.';
  a[TASKTIME_SLOT.scheduleDuration] = `'${o.duration}'`;
  a[TASKTIME_SLOT.scheduleStart] = `'${o.scheduleStart}'`;
  a[TASKTIME_SLOT.scheduleFinish] = `'${o.scheduleFinish}'`;
  a[TASKTIME_SLOT.earlyStart] = `'${o.earlyStart}'`;
  a[TASKTIME_SLOT.earlyFinish] = `'${o.earlyFinish}'`;
  return a.join(',');
};
const taskArgs = (o: { guid: string; name: string; wbs: string; taskTimeRef: string }) => {
  const a: string[] = new Array(IFC_TASK_SLOTS.length).fill('$');
  a[TASK_SLOT.globalId] = `'${o.guid}'`;
  a[TASK_SLOT.name] = `'${o.name}'`;
  a[TASK_SLOT.identification] = `'${o.wbs}'`;
  a[TASK_SLOT.isMilestone] = '.F.';
  a[TASK_SLOT.taskTime] = o.taskTimeRef;
  a[TASK_SLOT.predefinedType] = '.CONSTRUCTION.';
  return a.join(',');
};

/** Dé fixture van issue #63: taak a (2026-03-02 t/m -06, P5D) met FS-opvolger b die in het bestand
 *  vaststaat op 2026-03-16 — ver ná zijn werkelijke opvolgdatum (2026-03-09, de eerstvolgende
 *  werkdag na a's finish op vrijdag 2026-03-06). Herberekenen verschuift b dus gegarandeerd, en
 *  precies dat verschil is wat de modus aanbiedt. `tag` houdt project-naam en GUID's per sectie
 *  uniek, zodat opeenvolgende ladingen niet op elkaars identiteiten lijken te steunen. */
const externIfc = (tag: string) => [
  'ISO-10303-21;', 'HEADER;',
  "FILE_NAME('X.ifc','2031-01-01T07:00:00',('A'),('B'),'x','y','');",
  'ENDSEC;', 'DATA;',
  `#1=IFCPROJECT('g1${tag}',$,'Extern${tag}',$,$,$,$,$,$);`,
  `#9=IFCTASKTIME(${ttArgs({
    scheduleStart: '2026-03-02', scheduleFinish: '2026-03-06',
    earlyStart: '2026-03-02', earlyFinish: '2026-03-06', duration: 'P5D',
  })});`,
  `#2=IFCTASK(${taskArgs({ guid: `gTaskA${tag}`, name: 'A', wbs: '1.1', taskTimeRef: '#9' })});`,
  `#10=IFCTASKTIME(${ttArgs({
    scheduleStart: '2026-03-16', scheduleFinish: '2026-03-20',
    earlyStart: '2026-03-16', earlyFinish: '2026-03-20', duration: 'P5D',
  })});`,
  `#3=IFCTASK(${taskArgs({ guid: `gTaskB${tag}`, name: 'B', wbs: '1.2', taskTimeRef: '#10' })});`,
  `#4=IFCRELSEQUENCE('gSeq${tag}',$,$,$,#2,#3,$,.FINISH_START.,$);`,
  'ENDSEC;', 'END-ISO-10303-21;',
].join('\n');

/** Id van de taak met deze WBS-code in de LEVENDE store — na een load, dus niet het parse-resultaat. */
const idOfWbs = (wbs: string) => S().tasks.find((t) => t.wbsCode === wbs)!.id;
/** `earlyStart` van een taak in de levende store. */
const earlyStartOf = (id: string) => S().tasks.find((t) => t.id === id)!.time.earlyStart;

// ── (7) Detectie bij het laden ───────────────────────────────────────────────
// Bestand met vastgelegde datums die NIET uit de logica volgen: b staat vast op 2026-03-16 terwijl
// de FS-relatie hem direct ná a (finish 2026-03-06) zou plaatsen.
{
  const EXTERN = externIfc('');

  // Tussentijdse controle (plan-eis): bewijs dat de fixture ECHT twee taken mét taaktijd en een
  // werkende FS-relatie oplevert, los van wat de store ermee doet — anders test de rest hieronder
  // een vacuüm (de eerdere fout: de taskTime-ref stond op de verkeerde arg-index en de fixture gaf
  // dan gewoon "geen taaktijd" i.p.v. een fout).
  const rtExtern = readIFC(EXTERN);
  eq('7a fixture geeft twee taken', rtExtern.tasks.length, 2);
  eq('7b fixture geeft één FS-relatie', rtExtern.sequences.length, 1);
  const aId = rtExtern.tasks.find(t => t.wbsCode === '1.1')!.id;
  const bId = rtExtern.tasks.find(t => t.wbsCode === '1.2')!.id;
  truthy('7c a heeft écht een taaktijd (scheduleStart uit het bestand)', rtExtern.tasks.find(t => t.id === aId)!.time.scheduleStart === '2026-03-02');
  truthy('7d b heeft écht een taaktijd (scheduleStart uit het bestand)', rtExtern.tasks.find(t => t.id === bId)!.time.scheduleStart === '2026-03-16');
  truthy('7e de relatie loopt van a naar b', rtExtern.sequences[0].predecessorId === aId && rtExtern.sequences[0].successorId === bId);
  // Vier van de negen bewaakte slots gevuld (early- én schedule-paar), de rest ($) niet — bewijst
  // dat de aanwezigheidsregistratie per slot werkt, niet "alles of niets" per IfcTaskTime.
  eq('7f a meldt precies het early- en schedule-paar als aanwezig',
    rtExtern.recordedFields?.[aId], ['earlyStart', 'earlyFinish', 'scheduleStart', 'scheduleFinish']);
  eq('7g b meldt hetzelfde', rtExtern.recordedFields?.[bId], ['earlyStart', 'earlyFinish', 'scheduleStart', 'scheduleFinish']);

  // Nu door de ECHTE store en het ECHTE laadpad (fileSlice.applyLoadedProject), niet de pure laag
  // los aangeroepen — dit is precies het pad dat Taak 4 bouwt.
  S().newProject();
  S().applyLoadedProject(readIFC(EXTERN), { filePath: null, recompute: true });

  truthy('7h afwijking gedetecteerd: recordedDates is gezet', S().recordedDates !== null);
  eq('7i shifted telt de verschoven taak (b)', S().recordedDates?.shifted, 1);
  eq('7j total telt alle vastgelegde taken (a + b)', S().recordedDates?.total, 2);
  eq('7k detectie zet de modus niet aan', S().datesAsRecorded, false);

  // Tegenproef: een bestand dat de app ZELF schreef, levert geen aanbod op — de writer vult altijd
  // alle negen slots (zie check-ifc-roundtrip.ts (1b)) én runCPM heeft de datums al sluitend gemaakt
  // vóórdat er wordt opgeslagen, dus na het herladen kan er geen verschil zijn.
  S().newProject();
  const ownA = S().addTask({ name: 'Eigen A' });
  const ownB = S().addTask({ name: 'Eigen B' });
  S().addSequence({ predecessorId: ownA, successorId: ownB, type: 'FINISH_START', lagDays: 0 });
  S().runCPM();
  const ownIfc = writeIFC(buildWriteIFCInput(S()));

  S().newProject();
  S().applyLoadedProject(readIFC(ownIfc), { filePath: null, recompute: true });
  eq('7l eigen bestand geeft geen aanbod: recordedDates blijft null', S().recordedDates, null);

  // MOET (reviewronde): de kop-usecase van issue #63 zelf staat nog niet end-to-end getest. `EXTERN`
  // hierboven vult zowel early- als schedule-slots, dus daar loopt alleen de EARLY-laag door het
  // echte laadpad. Een P6-export vult typisch UITSLUITEND ScheduleStart/ScheduleFinish en laat alle
  // zeven rekenslots op `$` — precies het bestand waar `captureRecordedDates` de schedule-laag voor
  // heeft (de laagkeuze in recordedDates.ts, MOET 1/MOET 4). Zonder deze fixture bewijst niets dat
  // die laagkeuze het ook echt redt door het volledige laadpad heen, i.p.v. alleen in de pure-laag-
  // battery (sectie 1) hierboven.
  const ttArgsScheduleOnly = (o: { scheduleStart: string; scheduleFinish: string; duration: string }) => {
    const a: string[] = new Array(IFC_TASKTIME_SLOTS.length).fill('$');
    a[TASKTIME_SLOT.name] = "'T'";
    a[TASKTIME_SLOT.dataOrigin] = '.PREDICTED.';
    a[TASKTIME_SLOT.durationType] = '.WORKTIME.';
    a[TASKTIME_SLOT.scheduleDuration] = `'${o.duration}'`;
    a[TASKTIME_SLOT.scheduleStart] = `'${o.scheduleStart}'`;
    a[TASKTIME_SLOT.scheduleFinish] = `'${o.scheduleFinish}'`;
    // Alle zeven rekenslots (earlyStart t/m isCritical) blijven `$` — dit IS het punt van de fixture.
    return a.join(',');
  };
  const EXTERN_SCHEDULE_ONLY = [
    'ISO-10303-21;', 'HEADER;',
    "FILE_NAME('X.ifc','2031-01-01T07:00:00',('A'),('B'),'x','y','');",
    'ENDSEC;', 'DATA;',
    "#1=IFCPROJECT('g1',$,'ExternSchedule',$,$,$,$,$,$);",
    `#9=IFCTASKTIME(${ttArgsScheduleOnly({ scheduleStart: '2026-03-02', scheduleFinish: '2026-03-06', duration: 'P5D' })});`,
    `#2=IFCTASK(${taskArgs({ guid: 'gTaskAS', name: 'A', wbs: '1.1', taskTimeRef: '#9' })});`,
    `#10=IFCTASKTIME(${ttArgsScheduleOnly({ scheduleStart: '2026-03-16', scheduleFinish: '2026-03-20', duration: 'P5D' })});`,
    `#3=IFCTASK(${taskArgs({ guid: 'gTaskBS', name: 'B', wbs: '1.2', taskTimeRef: '#10' })});`,
    "#4=IFCRELSEQUENCE('gSeqS',$,$,$,#2,#3,$,.FINISH_START.,$);",
    'ENDSEC;', 'END-ISO-10303-21;',
  ].join('\n');

  // Tussentijdse controle: bewijs dat déze fixture — anders dan EXTERN — alléén het schedule-paar
  // meldt, niet het early-paar, vóórdat de rest van de test daarop leunt.
  const rtScheduleOnly = readIFC(EXTERN_SCHEDULE_ONLY);
  eq('7m fixture geeft twee taken', rtScheduleOnly.tasks.length, 2);
  const aIdS = rtScheduleOnly.tasks.find(t => t.wbsCode === '1.1')!.id;
  const bIdS = rtScheduleOnly.tasks.find(t => t.wbsCode === '1.2')!.id;
  eq('7n a meldt uitsluitend het schedule-paar (geen early-slots)', rtScheduleOnly.recordedFields?.[aIdS], ['scheduleStart', 'scheduleFinish']);
  eq('7o b meldt uitsluitend het schedule-paar', rtScheduleOnly.recordedFields?.[bIdS], ['scheduleStart', 'scheduleFinish']);

  // Door de ECHTE store: detectie moet aanslaan ÉN de vastgelegde start/finish moeten uit de
  // SCHEDULE-laag komen (er is geen early-laag om op terug te vallen).
  S().newProject();
  S().applyLoadedProject(readIFC(EXTERN_SCHEDULE_ONLY), { filePath: null, recompute: true });

  truthy('7p schedule-only: afwijking gedetecteerd', S().recordedDates !== null);
  eq('7q schedule-only: shifted telt de verschoven taak (b)', S().recordedDates?.shifted, 1);
  eq('7r schedule-only: total telt alle vastgelegde taken (a + b)', S().recordedDates?.total, 2);
  const bIdSAfterLoad = S().tasks.find(t => t.wbsCode === '1.2')!.id;
  eq('7s schedule-only: vastgelegde start van b komt uit de schedule-laag', S().recordedDates?.times[bIdSAfterLoad]?.start, '2026-03-16');
  eq('7t schedule-only: vastgelegde finish van b komt uit de schedule-laag', S().recordedDates?.times[bIdSAfterLoad]?.finish, '2026-03-20');
}

// ── (8) showRecordedDates — de modus betreden (Taak 5) ────────────────────────
// Zelfde fixture als (7): één FS-relatie waarvan de opgeslagen datums niet uit de logica volgen
// (b staat vast op 2026-03-16, ver ná a's werkelijke opvolgdatum 2026-03-09), zodat er na de echte
// solve écht iets "terug te tonen" is.
{
  S().newProject();
  S().applyLoadedProject(readIFC(externIfc('2')), { filePath: null, recompute: true });
  truthy('8a voorwaarde: recordedDates is gezet (b verschoof)', S().recordedDates !== null);

  const aId = idOfWbs('1.1');
  const bId = idOfWbs('1.2');

  // Zet near-critical/float-paths AAN buiten een actie om (directe draft-mutatie, geen undo/isDirty-
  // bijwerking), zodat de aansluitende runCPM écht een waarde in interferingFloat/isNearCritical/
  // floatPath schrijft — zonder dit blijven isNearCritical/floatPath toch al `undefined` (de
  // projectdefaults staan uit) en zou de wis-assertie hieronder niets bewijzen.
  useAppStore.setState((s) => {
    s.project.schedulingOptions = {
      nearCriticalThreshold: 5,
      floatPaths: { enabled: true, method: 'TOTAL_FLOAT', maxPaths: 5 },
    };
  });
  S().runCPM();
  truthy('8b voorwaarde: interferingFloat staat vóór het betreden op een waarde',
    S().tasks.find((t) => t.id === aId)!.time.interferingFloat !== undefined);
  truthy('8c voorwaarde: isNearCritical staat vóór het betreden op een waarde',
    S().tasks.find((t) => t.id === aId)!.time.isNearCritical !== undefined);
  truthy('8d voorwaarde: floatPath staat vóór het betreden op een waarde',
    S().tasks.find((t) => t.id === aId)!.time.floatPath !== undefined);
  eq('8e voorwaarde: isDirty nog steeds false (setState/runCPM zijn geen acties)', S().isDirty, false);

  // Zet scheduleStale ook expres AAN (direct, geen actie): zonder dit staat hij door de zojuist
  // gedraaide runCPM al op false, en zou de assertie "scheduleStale is false" hieronder een mutatie
  // die de eigen `s.scheduleStale = false`-regel weghaalt niet vangen (was al false vóór de aanroep).
  useAppStore.setState((s) => { s.scheduleStale = true; });
  truthy('8e2 voorwaarde: scheduleStale staat vóór het betreden op waar', S().scheduleStale);

  const undoDepthBefore = S().undoStack.length;
  S().showRecordedDates();

  eq('8f modus staat aan', S().datesAsRecorded, true);
  eq('8g verschoven taak toont weer opgeslagen earlyStart', S().tasks.find((t) => t.id === bId)!.time.earlyStart, '2026-03-16');
  eq('8h verschoven taak toont weer opgeslagen earlyFinish', S().tasks.find((t) => t.id === bId)!.time.earlyFinish, '2026-03-20');
  eq('8i scheduleStale is false', S().scheduleStale, false);
  eq('8j isDirty blijft false — openen en bekijken maakt niet vies', S().isDirty, false);
  truthy('8k cpmResult is niet null', S().cpmResult !== null);
  eq('8l projectEnd komt uit het bestand', S().cpmResult?.projectEnd, '2026-03-20');
  eq('8m drivingSequenceIds is leeg (niet in IFC)', S().cpmResult?.drivingSequenceIds, []);
  eq('8n precies één undo-stap erbij', S().undoStack.length, undoDepthBefore + 1);
  eq('8o interferingFloat gewist', S().tasks.find((t) => t.id === aId)!.time.interferingFloat, undefined);
  eq('8p isNearCritical gewist', S().tasks.find((t) => t.id === aId)!.time.isNearCritical, undefined);
  eq('8q floatPath gewist', S().tasks.find((t) => t.id === aId)!.time.floatPath, undefined);

  // Tweede aanroep: no-op (géén tweede undo-stap, geen wijziging).
  const undoDepthAfterFirst = S().undoStack.length;
  S().showRecordedDates();
  eq('8r tweede aanroep pusht geen undo-stap', S().undoStack.length, undoDepthAfterFirst);
  eq('8s tweede aanroep laat de modus aan staan', S().datesAsRecorded, true);
  eq('8t tweede aanroep laat de opgeslagen datum met rust', S().tasks.find((t) => t.id === bId)!.time.earlyStart, '2026-03-16');

  // Zonder recordedDates (bv. na newProject()) doet de actie niets.
  S().newProject();
  eq('8u voorwaarde: newProject geeft geen recordedDates', S().recordedDates, null);
  const undoDepthZonder = S().undoStack.length;
  S().showRecordedDates();
  eq('8v zonder recordedDates blijft de modus uit', S().datesAsRecorded, false);
  eq('8w zonder recordedDates geen undo-stap', S().undoStack.length, undoDepthZonder);
}

// ── (9) De modus verlaten (Taak 6) ───────────────────────────────────────────
// Twee uitgangen, allebei met een werkende Ctrl+Z:
//   A. een datum-rakende BEWERKING — `finishMutation({ stale: true })` zet de modus uit; de snapshot
//      is dan al door `beginUndoable` gepusht MÉT de modus aan, dus één undo herstelt alles.
//   B. F5/"Bereken" — `runCPM` pusht dan (en ALLEEN dan) zelf een undo-snapshot.
// Plus twee bewakingen: de invariant BUITEN de modus (`runCPM` pusht géén snapshot — daar leunen
// `staleGuard.ts` en `batchTool.ts` op) en de bewuste asymmetrie van "undo zonder stale".

// (9.A) Route A — bewerken verlaat de modus, Ctrl+Z draait modus én datums in één stap terug.
{
  S().newProject();
  S().applyLoadedProject(readIFC(externIfc('9a')), { filePath: null, recompute: true });
  const aId = idOfWbs('1.1');
  const bId = idOfWbs('1.2');

  truthy('9a voorwaarde: recordedDates gezet (b verschoof)', S().recordedDates !== null);
  eq('9b voorwaarde: de solve zette b op zijn logische datum', earlyStartOf(bId), '2026-03-09');
  S().showRecordedDates();
  eq('9c voorwaarde: modus staat aan', S().datesAsRecorded, true);
  eq('9d voorwaarde: b toont weer de opgeslagen datum', earlyStartOf(bId), '2026-03-16');
  eq('9e voorwaarde: planning geldt als vers vóór de bewerking', S().scheduleStale, false);

  const undoVoorA = S().undoStack.length;
  const aTime = S().tasks.find((t) => t.id === aId)!.time;
  // Duur van a van 5 naar 3 werkdagen: een datum-rakende bewerking (`finishMutation({ stale: true })`).
  S().updateTask(aId, { time: { ...aTime, scheduleDuration: 3 } });

  eq('9f een datum-rakende bewerking verlaat de modus', S().datesAsRecorded, false);
  eq('9g …en wist de vastlegging', S().recordedDates, null);
  eq('9h …en zet de planning op verouderd', S().scheduleStale, true);
  eq('9i …in precies één undo-stap', S().undoStack.length, undoVoorA + 1);

  // Wat `useExitRecordedDates` in de app doet (de hook is React en draait hier niet): één keer
  // doorrekenen. Tegelijk de invariant op deze route — de modus stond al uit, dus déze runCPM mag
  // géén tweede undo-stap opleveren.
  S().runCPM();
  eq('9j herrekenen ná het verlaten pusht geen extra undo-stap', S().undoStack.length, undoVoorA + 1);
  eq('9k b staat na het herrekenen op de nieuwe logische datum', earlyStartOf(bId), '2026-03-05');

  S().undo();
  eq('9l undo herstelt de modus', S().datesAsRecorded, true);
  eq('9m undo herstelt de opgeslagen datum van de verschoven taak', earlyStartOf(bId), '2026-03-16');
  truthy('9n undo herstelt de vastlegging', S().recordedDates !== null);
  eq('9o undo herstelt de teller in de vastlegging', S().recordedDates?.shifted, 1);
  eq('9p undo herstelt de vastgelegde start van b', S().recordedDates?.times[bId]?.start, '2026-03-16');
  eq('9q undo herstelt het uit het bestand gereconstrueerde projecteinde', S().cpmResult?.projectEnd, '2026-03-20');
  eq('9r undo herstelt de bewerkte duur van a', S().tasks.find((t) => t.id === aId)!.time.scheduleDuration, 5);

  S().redo();
  eq('9s redo verlaat de modus opnieuw', S().datesAsRecorded, false);
  eq('9t redo wist de vastlegging opnieuw', S().recordedDates, null);
  eq('9u redo herstelt de herberekende datum', earlyStartOf(bId), '2026-03-05');
}

// (9.B) Route B — F5/"Bereken" verlaat de modus, mét een werkende Ctrl+Z.
{
  S().newProject();
  S().applyLoadedProject(readIFC(externIfc('9b')), { filePath: null, recompute: true });
  const bId = idOfWbs('1.2');

  S().showRecordedDates();
  eq('9v voorwaarde: modus staat aan', S().datesAsRecorded, true);
  eq('9w voorwaarde: b toont de opgeslagen datum', earlyStartOf(bId), '2026-03-16');
  eq('9x voorwaarde: isDirty is nog false (betreden maakt niet vies)', S().isDirty, false);

  const undoVoorB = S().undoStack.length;
  S().runCPM();

  eq('9y F5 verlaat de modus', S().datesAsRecorded, false);
  eq('9z …en wist de vastlegging', S().recordedDates, null);
  eq('9aa …en rekent door: b staat weer op zijn logische datum', earlyStartOf(bId), '2026-03-09');
  eq('9ab …in precies één undo-stap', S().undoStack.length, undoVoorB + 1);

  S().undo();
  eq('9ac undo na F5 herstelt de modus', S().datesAsRecorded, true);
  eq('9ad undo na F5 herstelt de opgeslagen datum', earlyStartOf(bId), '2026-03-16');
  eq('9ae undo na F5 herstelt de vastlegging', S().recordedDates?.times[bId]?.start, '2026-03-16');
  eq('9af undo na F5 herstelt het gereconstrueerde projecteinde', S().cpmResult?.projectEnd, '2026-03-20');

  S().redo();
  eq('9ag redo verlaat de modus opnieuw', S().datesAsRecorded, false);
  eq('9ah redo herstelt de herberekende datum', earlyStartOf(bId), '2026-03-09');
}

// (9.C) DE INVARIANT BUITEN DE MODUS. `staleGuard.ts` (ensureFreshSchedule) en `batchTool.ts`
// (recomputeMidBatch) rekenen stil door in de veronderstelling dat `runCPM` de undo-stack niet
// raakt. De modus-uitgang is daar de enige uitzondering op — deze assertie bewaakt dat die
// uitzondering niet stilletjes het algemene geval wordt.
{
  S().newProject();
  S().applyLoadedProject(readIFC(externIfc('9c')), { filePath: null, recompute: true });
  eq('9ai voorwaarde: de modus staat UIT (detectie zet hem niet aan)', S().datesAsRecorded, false);
  truthy('9aj voorwaarde: er is wél iets aan te bieden (anders meet dit een vacuüm)', S().recordedDates !== null);
  // Zet `scheduleStale` expres aan (direct, geen actie): zonder dit zou runCPM hooguit "niets te
  // doen" bevestigen, terwijl de assertie moet bewijzen dat een ECHTE herberekening niets pusht.
  useAppStore.setState((s) => { s.scheduleStale = true; });

  const undoVoorC = S().undoStack.length;
  S().runCPM();
  eq('9ak runCPM buiten de modus pusht GEEN undo-snapshot', S().undoStack.length, undoVoorC);
  truthy('9al runCPM buiten de modus laat de vastlegging staan', S().recordedDates !== null);
  eq('9am runCPM buiten de modus zet geen isDirty', S().isDirty, false);
}

// (9.D) De bewuste asymmetrie: een bewerking die GÉÉN datums raakt (`finishMutation` zonder
// `stale`) laat de modus staan. Zou élke `finishMutation` de modus verlaten, dan zou een
// hernummering het aanbod stil weggooien — en er is dan niets dat de weergegeven datums nog
// herrekent, want `scheduleStale` blijft uit. Precies de mengvorm die de modus moet voorkomen.
{
  S().newProject();
  S().applyLoadedProject(readIFC(externIfc('9d')), { filePath: null, recompute: true });
  const bId = idOfWbs('1.2');
  S().showRecordedDates();
  eq('9an voorwaarde: modus staat aan', S().datesAsRecorded, true);

  S().renumberWbs();
  eq('9ao een niet-datum-rakende bewerking laat de modus staan', S().datesAsRecorded, true);
  truthy('9ap …en laat de vastlegging staan', S().recordedDates !== null);
  eq('9aq …en zet de planning niet op verouderd', S().scheduleStale, false);
  eq('9ar …en laat de getoonde opgeslagen datum met rust', earlyStartOf(bId), '2026-03-16');
}

// ── Uitslag ──────────────────────────────────────────────────────────────────
if (diffs.length === 0) {
  console.log(`OK  recorded-dates: alle checks groen (${checks})`);
  process.exit(0);
} else {
  console.log(`XX  recorded-dates: ${diffs.length} afwijking(en) van ${checks}`);
  for (const d of diffs) console.log(`   - ${d}`);
  process.exit(1);
}
