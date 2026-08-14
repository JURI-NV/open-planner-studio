// B1b-bezettingskern (spec 2026-08-14-b1b-bezettingsoverzicht-design.md §4/§6/§10). Headless
// batterij over de pure `computeLibraryOccupancy`: handgebouwde `OccupancyDocInput`-fixtures +
// een minimale `CompanyPool` — geen store, geen I/O. Exitcode is de poort (XX-regels tonen
// afwijkingen). Cases 1–9 volgen letterlijk §10 van het ontwerpdoc; case 10 dekt de
// scope-uitbreiding `OccupancyDocBooking.dailyLoad` (histogramvoeding, som-invariant).
import { computeLibraryOccupancy } from '@/services/library/occupancy';
import type { OccupancyDocInput } from '@/services/library/occupancy';
import { computeResourceLoad, maxUnitsOn } from '@/engine/scheduler/ResourceLoad';
import type { CompanyPool } from '@/types/library';
import type { Resource, ResourceAssignment, ResourceCurve } from '@/types/resource';
import type { Task } from '@/types/task';
import type { WorkCalendar } from '@/types/calendar';

declare const process: { exit(code: number): never };

let checks = 0; let fails = 0;
function assert(cond: boolean, msg: string): void {
  checks++;
  if (!cond) { fails++; console.log(`   XX ${msg}`); }
}

// ── Fixture-bouwstenen ───────────────────────────────────────────────────────────────────────────
// Ma–vr-kalender; alle taken vallen in de week van ma 2026-08-03 t/m vr 2026-08-07.

function cal(id = 'cal-1'): WorkCalendar {
  return {
    id, name: 'Standaard', description: '', workDays: [1, 2, 3, 4, 5],
    workStartHour: 7, workEndHour: 16, hoursPerDay: 8, holidays: [],
  };
}

function poolRes(id: string, name: string, maxUnits: number, extra?: Partial<Resource>): Resource {
  return { id, name, type: 'LABOR', description: '', maxUnits, ...extra };
}

/** Projectkopie met herkomststempel naar `libraryItemId` in bibliotheek `companyId`. */
function stamped(id: string, libraryItemId: string, companyId = 'c1', extra?: Partial<Resource>): Resource {
  return {
    id, name: `kopie ${libraryItemId}`, type: 'LABOR', description: '', maxUnits: 99,
    libraryOrigin: { companyId, libraryItemId, poolVersion: 1 },
    ...extra,
  };
}

/** Leaf-taak met doorgerekende datums (earlyStart/earlyFinish sturen de dag-mapping). */
function task(id: string, earlyStart: string, earlyFinish: string, durationDays: number): Task {
  return {
    id, name: id, description: '', wbsCode: '1', taskType: 'CONSTRUCTION', status: 'NOT_STARTED',
    isMilestone: false, priority: 500, parentId: null, childIds: [], resourceIds: [],
    time: {
      durationType: 'WORKTIME', scheduleDuration: durationDays,
      scheduleStart: earlyStart, scheduleFinish: earlyFinish,
      earlyStart, earlyFinish, lateStart: earlyStart, lateFinish: earlyFinish,
      freeFloat: 0, totalFloat: 0, isCritical: false, completion: 0,
    },
  };
}

function assign(id: string, taskId: string, resourceId: string, unitsPerDay: number, curve?: ResourceCurve): ResourceAssignment {
  return { id, taskId, resourceId, unitsPerDay, curve };
}

interface DocOpts {
  companyId?: string | null;
  scheduleStale?: boolean;
  resources?: Resource[];
  assignments?: ResourceAssignment[];
  tasks?: Task[];
}

function doc(docId: string, opts: DocOpts = {}): OccupancyDocInput {
  return {
    docId, title: `Project ${docId}`,
    scheduleStale: opts.scheduleStale ?? false,
    companyId: opts.companyId === undefined ? 'c1' : opts.companyId,
    resources: opts.resources ?? [],
    assignments: opts.assignments ?? [],
    tasks: opts.tasks ?? [],
    calendar: cal(),
    calendars: [],
  };
}

function pool(resources: Resource[]): CompanyPool {
  return {
    companyId: 'c1', companyName: 'Bibliotheek 1', poolVersion: 1,
    modifiedAt: '2026-08-14T00:00:00.000Z', calendars: [], resources,
  };
}

// ── Case 1 (§10.1): twee documenten, overlappende dagen, som > maxUnits ──────────────────────────
{
  const p = pool([poolRes('lib-1', 'Kraan', 2)]);
  const mkDoc = (id: string) => doc(id, {
    resources: [stamped(`${id}-r1`, 'lib-1')],
    tasks: [task(`${id}-t1`, '2026-08-03', '2026-08-05', 3)],
    assignments: [assign(`${id}-a1`, `${id}-t1`, `${id}-r1`, 1.5)],
  });
  const { rows, anyStale } = computeLibraryOccupancy('c1', p, [mkDoc('d1'), mkDoc('d2')]);

  assert(rows.length === 1, 'case 1: precies één rij (één geboekt poolitem)');
  const row = rows[0];
  assert(row.libraryItemId === 'lib-1' && row.name === 'Kraan', 'case 1: rij draagt poolitem-id en poolnaam');
  assert(row.docs.length === 2, 'case 1: beide documenten in docs');
  assert(
    JSON.stringify(row.conflictDays) === JSON.stringify(['2026-08-03', '2026-08-04', '2026-08-05']),
    `case 1: conflictDays = de drie overlapdagen, oplopend (kreeg ${JSON.stringify(row.conflictDays)})`,
  );
  assert(row.totalPeak === 3, `case 1: totalPeak = 1,5 + 1,5 = 3 (kreeg ${row.totalPeak})`);
  assert(row.capacityAtPeak === 2, `case 1: capacityAtPeak = maxUnits 2 (kreeg ${row.capacityAtPeak})`);
  const d1 = row.docs.find(d => d.docId === 'd1');
  assert(d1?.firstDay === '2026-08-03' && d1?.lastDay === '2026-08-05', 'case 1: per-document firstDay/lastDay = taakspanne');
  assert(d1?.peak === 1.5, `case 1: per-document peak = 1,5 (kreeg ${d1?.peak})`);
  assert(anyStale === false, 'case 1: geen stale documenten ⇒ anyStale false');
}

// ── Case 2 (§10.2): zelfde overlap maar som ≤ capaciteit; grens som == capaciteit is GEEN conflict ─
{
  const p = pool([poolRes('lib-1', 'Kraan', 2)]);
  const mkDoc = (id: string) => doc(id, {
    resources: [stamped(`${id}-r1`, 'lib-1')],
    tasks: [task(`${id}-t1`, '2026-08-03', '2026-08-05', 3)],
    assignments: [assign(`${id}-a1`, `${id}-t1`, `${id}-r1`, 1)], // som = 2 == capaciteit
  });
  const { rows } = computeLibraryOccupancy('c1', p, [mkDoc('d1'), mkDoc('d2')]);

  assert(rows.length === 1 && rows[0].totalPeak === 2, 'case 2: rij bestaat met totalPeak 2');
  assert(rows[0].conflictDays.length === 0, `case 2: som == capaciteit ⇒ géén conflict (>, niet ≥; kreeg ${JSON.stringify(rows[0].conflictDays)})`);
}

// ── Case 3 (§10.3): availabilitySteps op het POOLitem — conflict alléén ná de capaciteitsdaling ──
{
  // Poolcapaciteit: 3 t/m 2026-08-04, daarna 1 (stap per 2026-08-05). Som over twee docs = 2/dag.
  const p = pool([poolRes('lib-1', 'Kraan', 3, { availabilitySteps: [{ from: '2026-08-05', maxUnits: 1 }] })]);
  const mkDoc = (id: string) => doc(id, {
    // Projectkopieën hebben bewust ruime eigen maxUnits (99): de capaciteit MOET van het poolitem komen.
    resources: [stamped(`${id}-r1`, 'lib-1')],
    tasks: [task(`${id}-t1`, '2026-08-03', '2026-08-07', 5)],
    assignments: [assign(`${id}-a1`, `${id}-t1`, `${id}-r1`, 1)],
  });
  const { rows } = computeLibraryOccupancy('c1', p, [mkDoc('d1'), mkDoc('d2')]);

  assert(
    JSON.stringify(rows[0]?.conflictDays) === JSON.stringify(['2026-08-05', '2026-08-06', '2026-08-07']),
    `case 3: conflict alléén vanaf de availability-stap op het poolitem (kreeg ${JSON.stringify(rows[0]?.conflictDays)})`,
  );
  assert(rows[0]?.totalPeak === 2, 'case 3: totalPeak 2 over de hele spanne');
}

// ── Case 4 (§10.4): vreemde stempel en companyId:null dragen niets bij ───────────────────────────
{
  const p = pool([poolRes('lib-1', 'Kraan', 2)]);
  const vreemdeStempel = doc('d1', {
    // Document hangt aan c1, maar de resource is uit bibliotheek c2 gestempeld ⇒ telt niet.
    resources: [stamped('d1-r1', 'lib-1', 'c2')],
    tasks: [task('d1-t1', '2026-08-03', '2026-08-05', 3)],
    assignments: [assign('d1-a1', 'd1-t1', 'd1-r1', 5)],
  });
  const losDocument = doc('d2', {
    // Document zonder bibliotheek (companyId null) ⇒ telt niet, óók niet via een geldige c1-stempel.
    companyId: null,
    resources: [stamped('d2-r1', 'lib-1', 'c1')],
    tasks: [task('d2-t1', '2026-08-03', '2026-08-05', 3)],
    assignments: [assign('d2-a1', 'd2-t1', 'd2-r1', 5)],
  });
  const { rows, anyStale } = computeLibraryOccupancy('c1', p, [vreemdeStempel, losDocument]);

  assert(rows.length === 0, `case 4: vreemde stempel + companyId:null ⇒ geen enkele rij (kreeg ${rows.length})`);
  assert(anyStale === false, 'case 4: niets telt mee ⇒ anyStale false');
}

// ── Case 5 (§10.5): wees (stempel naar verwijderd poolitem) ⇒ geen rij ───────────────────────────
{
  const p = pool([poolRes('lib-1', 'Kraan', 2)]); // 'lib-verwijderd' zit NIET (meer) in de pool
  const d1 = doc('d1', {
    resources: [stamped('d1-r1', 'lib-verwijderd')],
    tasks: [task('d1-t1', '2026-08-03', '2026-08-05', 3)],
    assignments: [assign('d1-a1', 'd1-t1', 'd1-r1', 5)],
  });
  const { rows } = computeLibraryOccupancy('c1', p, [d1]);

  assert(rows.length === 0, `case 5: wees-stempel hoort bij geen enkel poolitem ⇒ geen rij (kreeg ${rows.length})`);
}

// ── Case 6 (§10.6): identieke naam, verschillende id's ⇒ twee losse rijen (id-matching) ──────────
{
  const p = pool([poolRes('lib-a', 'Timmerman', 2), poolRes('lib-b', 'Timmerman', 2)]);
  const d1 = doc('d1', {
    resources: [stamped('d1-r1', 'lib-a'), stamped('d1-r2', 'lib-b')],
    tasks: [task('d1-t1', '2026-08-03', '2026-08-05', 3)],
    assignments: [
      assign('d1-a1', 'd1-t1', 'd1-r1', 1),
      assign('d1-a2', 'd1-t1', 'd1-r2', 2),
    ],
  });
  const { rows } = computeLibraryOccupancy('c1', p, [d1]);

  assert(rows.length === 2, `case 6: twee rijen ondanks identieke naam (kreeg ${rows.length})`);
  const a = rows.find(r => r.libraryItemId === 'lib-a');
  const b = rows.find(r => r.libraryItemId === 'lib-b');
  assert(a?.totalPeak === 1 && b?.totalPeak === 2, 'case 6: boekingen NIET samengevoegd op naam — elk poolitem houdt zijn eigen belasting');
}

// ── Case 7 (§10.7): scheduleStale-document telt mee én markeert ──────────────────────────────────
{
  const p = pool([poolRes('lib-1', 'Kraan', 5)]);
  const vers = doc('d1', {
    resources: [stamped('d1-r1', 'lib-1')],
    tasks: [task('d1-t1', '2026-08-03', '2026-08-05', 3)],
    assignments: [assign('d1-a1', 'd1-t1', 'd1-r1', 1)],
  });
  const stale = doc('d2', {
    scheduleStale: true,
    resources: [stamped('d2-r1', 'lib-1')],
    tasks: [task('d2-t1', '2026-08-04', '2026-08-06', 3)],
    assignments: [assign('d2-a1', 'd2-t1', 'd2-r1', 1)],
  });
  const { rows, anyStale } = computeLibraryOccupancy('c1', p, [vers, stale]);

  assert(rows.length === 1 && rows[0].docs.length === 2, 'case 7: het stale document telt gewoon mee (laatst bekende datums)');
  assert(rows[0].totalPeak === 2, `case 7: overlap 08-04/08-05 telt op tot 2 (kreeg ${rows[0].totalPeak})`);
  assert(rows[0].docs.find(d => d.docId === 'd2')?.scheduleStale === true, 'case 7: OccupancyDocBooking.scheduleStale staat op het stale document');
  assert(rows[0].docs.find(d => d.docId === 'd1')?.scheduleStale === false, 'case 7: het verse document is NIET gemarkeerd');
  assert(anyStale === true, 'case 7: anyStale staat zodra één meetellend document stale is');
}

// ── Case 8 (§10.8): binnen-document-overbezetting verschijnt óók als conflict (§6 punt 2) ────────
{
  const p = pool([poolRes('lib-1', 'Kraan', 2)]);
  const d1 = doc('d1', {
    resources: [stamped('d1-r1', 'lib-1')],
    tasks: [task('d1-t1', '2026-08-03', '2026-08-05', 3)],
    assignments: [assign('d1-a1', 'd1-t1', 'd1-r1', 3)], // één document boekt in z'n eentje 3 > 2
  });
  const { rows } = computeLibraryOccupancy('c1', p, [d1]);

  assert(rows.length === 1 && rows[0].docs.length === 1, 'case 8: één document, één rij');
  assert(
    JSON.stringify(rows[0].conflictDays) === JSON.stringify(['2026-08-03', '2026-08-04', '2026-08-05']),
    `case 8: binnen-document-overbezetting telt mee in de som (kreeg ${JSON.stringify(rows[0].conflictDays)})`,
  );
  assert(rows[0].totalPeak === 3 && rows[0].capacityAtPeak === 2, 'case 8: totalPeak 3 vs capaciteit 2');
}

// ── Case 9 (§10.9): curve-consistentie — FRONT_LOADED spiegelt computeResourceLoad exact ─────────
{
  const poolItem = poolRes('lib-1', 'Kraan', 2);
  const p = pool([poolItem]);
  const d1 = doc('d1', {
    resources: [stamped('d1-r1', 'lib-1')],
    tasks: [task('d1-t1', '2026-08-03', '2026-08-06', 4)],
    assignments: [assign('d1-a1', 'd1-t1', 'd1-r1', 2, 'FRONT_LOADED')],
  });
  const { rows } = computeLibraryOccupancy('c1', p, [d1]);

  // Referentie: exact dezelfde engine-aanroep als de kern per document hoort te doen.
  const ref = computeResourceLoad(d1.resources, d1.assignments, d1.tasks, d1.calendar, d1.calendars);
  const refDaily = ref.load['d1-r1'];
  const refDays = Object.keys(refDaily).sort();
  const refPeak = Math.max(...refDays.map(iso => refDaily[iso]));
  const loadedDays = refDays.filter(iso => refDaily[iso] > 0);
  const refConflicts = refDays.filter(iso => refDaily[iso] > maxUnitsOn(poolItem, iso));

  const row = rows[0];
  assert(row !== undefined && row.docs.length === 1, 'case 9: één rij met één documentboeking');
  assert(row.totalPeak === refPeak, `case 9: totalPeak == max van computeResourceLoad (${refPeak}; kreeg ${row.totalPeak})`);
  assert(
    row.docs[0].firstDay === loadedDays[0] && row.docs[0].lastDay === loadedDays[loadedDays.length - 1],
    'case 9: firstDay/lastDay == eerste/laatste belaste dag volgens computeResourceLoad',
  );
  assert(row.docs[0].peak === refPeak, 'case 9: documentpiek == curve-piek van computeResourceLoad');
  assert(
    JSON.stringify(row.conflictDays) === JSON.stringify(refConflicts),
    `case 9: conflictDays == dagen waar de curve boven de poolcapaciteit komt (${JSON.stringify(refConflicts)}; kreeg ${JSON.stringify(row.conflictDays)})`,
  );
  // Sanity: de FRONT_LOADED-curve moet daadwerkelijk vooraan pieken (anders test dit niets).
  assert(refConflicts.length > 0 && refConflicts[0] === '2026-08-03', 'case 9 sanity: FRONT_LOADED piekt op de eerste dag boven capaciteit');
}

// ── Case 10: dailyLoad — som over documenten per dag == de kern-som; dagen binnen first..last ───
{
  const poolItem = poolRes('lib-1', 'Kraan', 2);
  const p = pool([poolItem]);
  const d1 = doc('d1', {
    resources: [stamped('d1-r1', 'lib-1')],
    tasks: [task('d1-t1', '2026-08-03', '2026-08-06', 4)],
    assignments: [assign('d1-a1', 'd1-t1', 'd1-r1', 2, 'FRONT_LOADED')],
  });
  const d2 = doc('d2', {
    resources: [stamped('d2-r1', 'lib-1')],
    tasks: [task('d2-t1', '2026-08-04', '2026-08-07', 4)],
    assignments: [assign('d2-a1', 'd2-t1', 'd2-r1', 1)],
  });
  const { rows } = computeLibraryOccupancy('c1', p, [d1, d2]);
  const row = rows[0];

  // Referentie per document — dezelfde som-invariant als case 9, nu per dag over twee documenten.
  const refSum = new Map<string, number>();
  for (const d of [d1, d2]) {
    const ref = computeResourceLoad(d.resources, d.assignments, d.tasks, d.calendar, d.calendars);
    const daily = ref.load[d.resources[0].id];
    for (const [iso, units] of Object.entries(daily)) {
      if (units > 0) refSum.set(iso, (refSum.get(iso) ?? 0) + units);
    }
  }

  // 10a: som van dailyLoad over documenten per dag == de referentiesom van computeResourceLoad.
  const gotSum = new Map<string, number>();
  for (const booking of row.docs) {
    for (const [iso, units] of Object.entries(booking.dailyLoad)) {
      gotSum.set(iso, (gotSum.get(iso) ?? 0) + units);
    }
  }
  const toSorted = (m: Map<string, number>) => JSON.stringify([...m.entries()].sort((a, b) => a[0].localeCompare(b[0])));
  assert(
    toSorted(gotSum) === toSorted(refSum),
    `case 10: Σ dailyLoad over documenten per dag == computeResourceLoad-som (${toSorted(refSum)}; kreeg ${toSorted(gotSum)})`,
  );

  // 10b: dezelfde som draagt ook totalPeak/conflictDays (interne consistentie van de rij).
  const refPeak = Math.max(...refSum.values());
  const refConflicts = [...refSum.keys()].sort().filter(iso => refSum.get(iso)! > maxUnitsOn(poolItem, iso));
  assert(row.totalPeak === refPeak, `case 10: totalPeak == piek van de dailyLoad-som (${refPeak}; kreeg ${row.totalPeak})`);
  assert(
    JSON.stringify(row.conflictDays) === JSON.stringify(refConflicts),
    `case 10: conflictDays consistent met de dailyLoad-som (${JSON.stringify(refConflicts)}; kreeg ${JSON.stringify(row.conflictDays)})`,
  );

  // 10c: elke dailyLoad-dag valt binnen firstDay..lastDay van zijn eigen booking, en is > 0.
  for (const booking of row.docs) {
    const days = Object.keys(booking.dailyLoad).sort();
    assert(days.length > 0, `case 10: booking ${booking.docId} heeft dailyLoad-dagen`);
    assert(
      booking.firstDay !== null && booking.lastDay !== null &&
      days.every(iso => iso >= booking.firstDay! && iso <= booking.lastDay!),
      `case 10: dailyLoad-dagen van ${booking.docId} vallen binnen firstDay..lastDay`,
    );
    assert(days[0] === booking.firstDay && days[days.length - 1] === booking.lastDay,
      `case 10: firstDay/lastDay van ${booking.docId} zijn exact de rand-dagen van dailyLoad`);
    assert(
      Object.values(booking.dailyLoad).every(u => u > 0),
      `case 10: dailyLoad van ${booking.docId} bevat alleen dagen met belasting > 0`,
    );
  }
}

console.log(`occupancy: ${checks - fails}/${checks} groen`);
process.exit(fails > 0 ? 1 : 0);
