// Pool-IFC-round-trip (spec §4/§9): writePoolIFC → readPoolIFC ⇒ IDENTIEKE pool (incl. versie + ids),
// zodat een pool-import op een schone staat de pool exact herstelt en bestaande project-stempels
// blijven matchen. Exitcode = poort.
import { writePoolIFC, readPoolIFC } from '@/services/library/libraryIfc';
import type { CompanyPool } from '@/types/library';
import type { WorkCalendar } from '@/types/calendar';
import type { Resource } from '@/types/resource';

declare const process: { exit(code: number): never };

let checks = 0; let fails = 0;
function assert(cond: boolean, msg: string): void {
  checks++;
  if (!cond) { fails++; console.log(`   XX ${msg}`); }
}

const cal: WorkCalendar = {
  id: 'pc1', name: 'Ploegkalender', description: 'Ma-vr',
  workDays: [1, 2, 3, 4, 5], workStartHour: 7, workEndHour: 15, hoursPerDay: 8,
  holidays: [{ name: 'Kerst', startDate: '2026-12-25', endDate: '2026-12-26' }],
};
const resources: Resource[] = [
  { id: 'pr1', name: 'Timmerman', type: 'LABOR', description: '', maxUnits: 2, costPerHour: 45, calendarId: 'pc1' },
  { id: 'pr2', name: 'Beton', type: 'MATERIAL', description: '', maxUnits: 1, unitOfMeasure: 'm3' },
];
const pool: CompanyPool = {
  companyId: 'c1', companyName: 'Aannemer BV', poolVersion: 7, modifiedAt: '2026-07-20T09:30:00.000Z',
  calendars: [cal], resources,
};

const ifc = writePoolIFC(pool);
const back = readPoolIFC(ifc);

assert(back.companyId === 'c1', 'pool round-trip: companyId');
assert(back.companyName === 'Aannemer BV', 'pool round-trip: companyName');
assert(back.poolVersion === 7, 'pool round-trip: poolVersion');
assert(back.modifiedAt === '2026-07-20T09:30:00.000Z', 'pool round-trip: modifiedAt');
assert(back.calendars.length === 1 && back.calendars[0].id === 'pc1', 'pool round-trip: kalender-id behouden');
assert(back.resources.length === 2, 'pool round-trip: aantal resources');
assert(back.resources.find(r => r.id === 'pr1')?.costPerHour === 45, 'pool round-trip: resource-detail');
assert(back.resources.find(r => r.id === 'pr2')?.unitOfMeasure === 'm3', 'pool round-trip: materiaal-eenheid');

// Idempotentie: tweede round-trip byte-stabiel op de JSON-pool.
const ifc2 = writePoolIFC(back);
const back2 = readPoolIFC(ifc2);
assert(JSON.stringify(back) === JSON.stringify(back2), 'pool round-trip: idempotent');

// Een gewoon projectbestand draagt geen OPS_Library ⇒ readPoolIFC gooit.
let threw = false;
try {
  const projIfc = writePoolIFC(pool).replace(/OPS_Library/g, 'OPS_Iets_Anders');
  readPoolIFC(projIfc);
} catch { threw = true; }
assert(threw, 'readPoolIFC gooit op een bestand zonder OPS_Library');

console.log(`pool-ifc: ${checks - fails}/${checks} groen`);
process.exit(fails > 0 ? 1 : 0);
