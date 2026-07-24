// Pure-ops-batterij voor de bedrijfsbibliotheek (spec B1, §2/§3/§4). Draait headless op Node; de
// exitcode is de poort (XX-regels tonen afwijkingen). Geen store, geen I/O — alleen libraryOps.
import {
  bumpPool, isPoolNewer, makeOrigin, findCopyByOrigin,
  copyCalendarToProject, copyResourceToProject,
  diffCalendarVsPool, diffResourceVsPool, applyResourceUpdate,
  computeCalendarHash, computeResourceHash,
  normalizeName, matchByName,
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

// 2b. isPoolNewer — spec-"óf" (critreview taak 10, fix 2): versie EN tijd tellen onafhankelijk mee,
// geen precedentie-ladder. Ook: robuuste tijdvergelijking via Date.parse i.p.v. string-lexicografie
// (dekt offset-notaties die lexicografisch verkeerd sorteren).
{
  // Lokaal lagere versie (3 < 5) maar latere modifiedAt ⇒ toch "nieuwer" (OR, niet AND/precedentie).
  const local = { ...pool(), poolVersion: 3, modifiedAt: '2026-07-20T15:00:00.000Z' };
  const imported = { ...pool(), poolVersion: 5, modifiedAt: '2026-07-20T09:00:00.000Z' };
  assert(isPoolNewer(local, imported) === true, 'isPoolNewer: lokaal lagere versie maar latere tijd ⇒ toch nieuwer (spec-óf)');

  // Gelijke versie + gelijke tijd ⇒ niet nieuwer.
  const same = pool();
  assert(isPoolNewer(same, { ...same }) === false, 'isPoolNewer: gelijke versie/tijd ⇒ niet nieuwer');

  // Offset-notatie die lexicografisch verkeerd sorteert: 20e 23:00-05:00 = 21e 04:00 UTC, dus ÉCHT
  // later dan 21e 00:30Z — maar als string is '...T20...' < '...T21...' (lexicografisch "ouder").
  // Gelijke poolVersion, dus alleen de tijdvergelijking beslist.
  const localOffset = { ...pool(), poolVersion: 7, modifiedAt: '2026-07-20T23:00:00-05:00' };
  const importedLaterString = { ...pool(), poolVersion: 7, modifiedAt: '2026-07-21T00:30:00.000Z' };
  assert(
    isPoolNewer(localOffset, importedLaterString) === true,
    'isPoolNewer: offset-notatie vergelijkt op echte tijd (Date.parse), niet op string-lexicografie',
  );

  // Onparseerbare modifiedAt valt terug op epoch 0 (parseTime-fallback) — geen NaN-vergelijking,
  // geen crash; twee onparseerbare tijden zijn "gelijk" (0 === 0, dus niet nieuwer bij gelijke versie).
  const localBad = { ...pool(), poolVersion: 9, modifiedAt: 'niet-een-datum' };
  const importedBad = { ...pool(), poolVersion: 9, modifiedAt: 'ook-geen-datum' };
  assert(isPoolNewer(localBad, importedBad) === false, 'isPoolNewer: onparseerbare tijden aan beide kanten ⇒ gelijk (fallback 0), niet nieuwer');
}

// 3. makeOrigin + dedup
{
  const p = pool();
  const o = makeOrigin(p, 'pr1');
  assert(o.companyId === 'c1' && o.libraryItemId === 'pr1' && o.poolVersion === 3, 'makeOrigin stempelt correct');
  const list: Resource[] = [{ ...res('x', 'x'), libraryOrigin: o }];
  assert(findCopyByOrigin(list, 'c1', 'pr1')?.id === 'x', 'findCopyByOrigin vindt bestaande kopie');
  assert(findCopyByOrigin(list, 'c1', 'pr2') === undefined, 'findCopyByOrigin: geen match');
  assert(findCopyByOrigin(list, 'c2', 'pr1') === undefined, 'findCopyByOrigin: cross-bedrijf-dedupgrens (companyId c2 vindt geen kopie gestempeld met c1)');
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

// --- syncedHash spiegelt de diff-normalisatie exact (plan-eis 8) ---
{
  const p = pool();
  // GO-NA-FIX 1 (critreview 9f9f0aa): de fixture-kalender/-resource hebben lege/afwezige
  // multiset-velden (`holidays: []`, geen `availabilitySteps`) — daarmee zou een reversed-equal
  // check triviaal waar blijven, ook zonder de `.sort()` in `diffKey`. Bouw daarom hier lokaal een
  // kalender met ≥2 verschillende holidays en een resource met ≥2 verschillende availabilitySteps,
  // zodat de reversed-equal-assert écht multiset-gedrag bewijst (en niet leeg-array-gedrag).
  const c: WorkCalendar = {
    ...p.calendars[0],
    holidays: [
      { name: 'Kerst', startDate: '2026-12-25', endDate: '2026-12-26' },
      { name: 'Nieuwjaar', startDate: '2026-01-01', endDate: '2026-01-01' },
    ],
  };
  // Materialisatie-hash == hash van de pool-bron.
  const h1 = computeCalendarHash(c);
  // Array-VOLGORDE mag de hash NIET veranderen (multiset, zoals diffKey): feestdagen omdraaien.
  const c2: WorkCalendar = { ...c, holidays: [...c.holidays].reverse() };
  assert(computeCalendarHash(c2) === h1, 'computeCalendarHash: array-volgorde telt niet mee (multiset)');
  // Een echte inhoudswijziging vervangt niet, maar wijzigt één element inhoudelijk (zelfde lengte,
  // andere data) — dit MOET de hash veranderen ondanks de multiset-normalisatie.
  const c4: WorkCalendar = { ...c, holidays: [c.holidays[0], { ...c.holidays[1], endDate: '2026-01-02' }] };
  assert(computeCalendarHash(c4) !== h1, 'computeCalendarHash: inhoudswijziging in een array-element verandert de hash');
  // Een echte inhoudswijziging op een scalair veld verandert de hash WEL.
  const c3: WorkCalendar = { ...c, workEndHour: 17 };
  assert(computeCalendarHash(c3) !== h1, 'computeCalendarHash: inhoudswijziging verandert de hash');
  // Consistentie met de diff: gelijk aan pool ⇒ hash-gelijk; diff up-to-date.
  const pWithHolidays: CompanyPool = { ...p, calendars: [c] };
  const projCal: WorkCalendar = { ...c, id: 'proj-x', libraryOrigin: makeOrigin(pWithHolidays, c.id, computeCalendarHash(c)) };
  assert(diffCalendarVsPool(projCal, pWithHolidays).status === 'up-to-date', 'materialisatie ⇒ diff up-to-date');
  assert(projCal.libraryOrigin!.syncedHash === computeCalendarHash(c), 'makeOrigin schrijft de syncedHash');

  const r: Resource = {
    ...p.resources[0],
    availabilitySteps: [
      { from: '2026-01-01', maxUnits: 1 },
      { from: '2026-06-01', maxUnits: 2 },
    ],
  };
  const hr = computeResourceHash(r);
  const r2: Resource = { ...r, availabilitySteps: [...r.availabilitySteps!].reverse() };
  assert(computeResourceHash(r2) === hr, 'computeResourceHash: array-volgorde telt niet mee');
  const r4: Resource = { ...r, availabilitySteps: [r.availabilitySteps![0], { ...r.availabilitySteps![1], maxUnits: 3 }] };
  assert(computeResourceHash(r4) !== hr, 'computeResourceHash: inhoudswijziging in een array-element verandert de hash');
  assert(computeResourceHash({ ...r, maxUnits: 99 }) !== hr, 'computeResourceHash: inhoudswijziging verandert de hash');
}

// --- Naam-matcher (spec §5.1): exact na normalisatie, uniek anders geen voorstel ---
{
  assert(normalizeName('  Ploeg  A ') === normalizeName('ploeg a'), 'normalizeName: trim+case+witruimte');
  const cands = [
    { id: 'a', name: 'Metselaar' },
    { id: 'b', name: 'Timmerman' },
  ];
  assert(matchByName('  metselaar ', cands)?.id === 'a', 'matchByName: exact na normalisatie');
  assert(matchByName('Loodgieter', cands) === null, 'matchByName: geen kandidaat ⇒ null');
  const dup = [{ id: 'a', name: 'Ploeg' }, { id: 'b', name: 'ploeg' }];
  assert(matchByName('PLOEG', dup) === null, 'matchByName: meerdere kandidaten ⇒ null (geen voorstel)');
}

console.log(`library-ops: ${checks - fails}/${checks} groen`);
process.exit(fails > 0 ? 1 : 0);
