// Pure-ops-batterij voor de bedrijfsbibliotheek (spec B1, §2/§3/§4). Draait headless op Node; de
// exitcode is de poort (XX-regels tonen afwijkingen). Geen store, geen I/O — alleen libraryOps.
import {
  bumpPool, isPoolNewer, makeOrigin, findCopyByOrigin,
  copyCalendarToProject, copyResourceToProject,
  diffCalendarVsPool, diffResourceVsPool, applyResourceUpdate,
} from '@/services/library/libraryOps';
import type { CompanyPool } from '@/types/library';
import type { WorkCalendar } from '@/types/calendar';
import type { Resource } from '@/types/resource';

declare const process: { exit(code: number): never };

let checks = 0; let fails = 0;
function assert(cond: boolean, msg: string): void {
  checks++;
  if (!cond) { fails++; console.log(`   XX ${msg}`); }
}

function cal(id: string, name: string): WorkCalendar {
  return {
    id, name, description: '', workDays: [1, 2, 3, 4, 5],
    workStartHour: 7, workEndHour: 15, hoursPerDay: 8, holidays: [],
  };
}
function res(id: string, name: string, calendarId?: string): Resource {
  return { id, name, type: 'LABOR', description: '', maxUnits: 1, calendarId };
}
function pool(): CompanyPool {
  return {
    companyId: 'c1', companyName: 'Bedrijf 1', poolVersion: 3, modifiedAt: '2026-07-20T10:00:00.000Z',
    calendars: [cal('pc1', 'Ploegkalender')],
    resources: [res('pr1', 'Timmerman', 'pc1'), res('pr2', 'Kraan')],
  };
}

// counter-gebaseerde genId voor deterministische ids in de test
let n = 0;
const genId = (prefix: string) => `${prefix}-gen-${++n}`;

// 1. bumpPool
{
  const p = pool();
  const b = bumpPool(p);
  assert(b.poolVersion === 4, 'bumpPool verhoogt poolVersion');
  assert(b.modifiedAt !== p.modifiedAt, 'bumpPool verse modifiedAt');
  assert(p.poolVersion === 3, 'bumpPool muteert het origineel niet');
}

// 2. isPoolNewer
{
  const local = pool();
  assert(isPoolNewer(undefined, local) === false, 'isPoolNewer: geen lokale pool ⇒ niet nieuwer');
  assert(isPoolNewer({ ...local, poolVersion: 5 }, local) === true, 'isPoolNewer: hogere versie ⇒ nieuwer');
  assert(isPoolNewer({ ...local, poolVersion: 1 }, local) === false, 'isPoolNewer: lagere versie ⇒ niet nieuwer');
  assert(
    isPoolNewer({ ...local, modifiedAt: '2026-07-21T00:00:00.000Z' }, local) === true,
    'isPoolNewer: gelijke versie, recentere modifiedAt ⇒ nieuwer',
  );
}

// 3. makeOrigin + dedup
{
  const p = pool();
  const o = makeOrigin(p, 'pr1');
  assert(o.companyId === 'c1' && o.libraryItemId === 'pr1' && o.poolVersion === 3, 'makeOrigin stempelt correct');
  const list: Resource[] = [{ ...res('x', 'x'), libraryOrigin: o }];
  assert(findCopyByOrigin(list, 'c1', 'pr1')?.id === 'x', 'findCopyByOrigin vindt bestaande kopie');
  assert(findCopyByOrigin(list, 'c1', 'pr2') === undefined, 'findCopyByOrigin: geen match');
}

// 4. copyCalendarToProject — nieuw + dedup
{
  const p = pool();
  const c1 = copyCalendarToProject(p, 'pc1', [], genId)!;
  assert(c1.reused === false, 'copyCalendar: verse kopie is niet-hergebruikt');
  assert(c1.calendar.id !== 'pc1', 'copyCalendar: verse project-lokale id');
  assert(c1.calendar.libraryOrigin?.libraryItemId === 'pc1', 'copyCalendar: stempel wijst naar pool-id');
  const c2 = copyCalendarToProject(p, 'pc1', [c1.calendar], genId)!;
  assert(c2.reused === true && c2.calendar.id === c1.calendar.id, 'copyCalendar: dedup hergebruikt bestaande kopie');
  assert(copyCalendarToProject(p, 'onbekend', [], genId) === null, 'copyCalendar: onbekende id ⇒ null');
}

// 5. copyResourceToProject — meereizende kalender + herschreven calendarId
{
  const p = pool();
  const r = copyResourceToProject(p, 'pr1', [], [], genId)!;
  assert(r.reused === false, 'copyResource: verse kopie');
  assert(!!r.travelingCalendar && r.travelingCalendar.reused === false, 'copyResource: kalender reist mee');
  assert(r.resource.calendarId === r.travelingCalendar!.calendar.id, 'copyResource: calendarId → project-lokale kalender');
  assert(r.resource.libraryOrigin?.libraryItemId === 'pr1', 'copyResource: stempel');
  // Resource zonder eigen pool-kalender (pr2): geen meereizende kalender, calendarId undefined
  const r2 = copyResourceToProject(p, 'pr2', [], [], genId)!;
  assert(r2.travelingCalendar === undefined && r2.resource.calendarId === undefined, 'copyResource: geen kalender ⇒ geen meereizende kopie');
}

// 6. copyResourceToProject — dedup van meereizende kalender (bestaande kalenderkopie hergebruikt)
{
  const p = pool();
  const existingCal = copyCalendarToProject(p, 'pc1', [], genId)!.calendar;
  const r = copyResourceToProject(p, 'pr1', [], [existingCal], genId)!;
  assert(r.travelingCalendar?.reused === true, 'copyResource: bestaande kalenderkopie wordt hergebruikt');
  assert(r.resource.calendarId === existingCal.id, 'copyResource: calendarId → hergebruikte kalender');
}

// 7. diff — up-to-date / changed / removed
{
  const p = pool();
  const copy = copyResourceToProject(p, 'pr2', [], [], genId)!.resource;
  assert(diffResourceVsPool(copy, p).status === 'up-to-date', 'diff: verse kopie is up-to-date');
  const changed = { ...copy, maxUnits: 5 };
  const d = diffResourceVsPool(changed, p);
  assert(d.status === 'changed' && d.fields.some(f => f.field === 'maxUnits'), 'diff: gewijzigd veld gedetecteerd');
  const removedPool: CompanyPool = { ...p, resources: [] };
  assert(diffResourceVsPool(copy, removedPool).status === 'removed', 'diff: verwijderd origineel ⇒ removed');
  const c = copyCalendarToProject(p, 'pc1', [], genId)!.calendar;
  assert(diffCalendarVsPool(c, p).status === 'up-to-date', 'diff: kalenderkopie up-to-date');
}

// 8. applyResourceUpdate behoudt id + project-lokale calendarId, verse poolVersion
{
  const p = bumpPool(pool()); // poolVersion 4
  const copy = { ...res('local-r', 'Oude naam', 'local-cal'), libraryOrigin: makeOrigin({ ...p, poolVersion: 3 }, 'pr2') };
  const updated = applyResourceUpdate(copy, { ...p, resources: [res('pr2', 'Nieuwe naam')] });
  assert(updated.id === 'local-r', 'applyUpdate: behoudt project-id');
  assert(updated.name === 'Nieuwe naam', 'applyUpdate: neemt pool-naam over');
  assert(updated.calendarId === 'local-cal', 'applyUpdate: behoudt project-lokale calendarId');
  assert(updated.libraryOrigin?.poolVersion === 4, 'applyUpdate: verse poolVersion in stempel');
}

console.log(`library-ops: ${checks - fails}/${checks} groen`);
process.exit(fails > 0 ? 1 : 0);
