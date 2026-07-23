// Headless store-batterij voor de bedrijfsbibliotheek (spec B1). Draait de ECHTE Zustand-store op
// Node (patroon tests/planning/check-move-assignment.ts). Persistentie (saveLibrary) valt in Node
// stil terug (geen IndexedDB/Tauri) — we asserten alleen de in-memory state. Exitcode = poort.
import { useAppStore } from '@/state/appStore';
import { normalizeLoadedLibrary } from '@/state/slices/librarySlice';

declare const process: { exit(code: number): never };

let checks = 0; let fails = 0;
function assert(cond: boolean, msg: string): void {
  checks++;
  if (!cond) { fails++; console.log(`   XX ${msg}`); }
}

const store = useAppStore.getState();

// --- Bedrijven-CRUD + standaardbedrijf ---
{
  assert(store.companies.length === 1, 'start: één standaardbedrijf');
  assert(store.defaultCompanyId === store.companies[0].id, 'start: default = standaardbedrijf');

  const id2 = store.addCompany('Onderaannemer BV');
  assert(useAppStore.getState().companies.length === 2, 'addCompany voegt bedrijf toe');
  assert(!!useAppStore.getState().pools[id2], 'addCompany maakt een lege pool');

  store.setDefaultCompany(id2);
  assert(useAppStore.getState().defaultCompanyId === id2, 'setDefaultCompany');

  store.renameCompany(id2, 'Onderaannemer 2 BV');
  assert(useAppStore.getState().companies.find(c => c.id === id2)?.name === 'Onderaannemer 2 BV', 'renameCompany');
  assert(useAppStore.getState().pools[id2].companyName === 'Onderaannemer 2 BV', 'renameCompany synct pool.companyName');

  store.removeCompany(id2);
  assert(useAppStore.getState().companies.length === 1, 'removeCompany');
  assert(useAppStore.getState().defaultCompanyId === useAppStore.getState().companies[0].id, 'removeCompany: default valt terug');

  // Laatste bedrijf niet verwijderbaar.
  const lastId = useAppStore.getState().companies[0].id;
  store.removeCompany(lastId);
  assert(useAppStore.getState().companies.length === 1, 'removeCompany: laatste bedrijf blijft');
}

// --- Promoveren + pool-inhoud bewerken ---
{
  const s = useAppStore.getState();
  const cid = s.defaultCompanyId;
  const v0 = s.pools[cid].poolVersion;

  const calId = s.promoteCalendarToPool(cid, {
    id: 'proj-cal', name: 'Ploeg A', description: '', workDays: [1, 2, 3, 4, 5],
    workStartHour: 7, workEndHour: 15, hoursPerDay: 8, holidays: [],
  })!;
  let pool = useAppStore.getState().pools[cid];
  assert(pool.calendars.some(c => c.id === calId), 'promoteCalendarToPool voegt kalender toe');
  assert(pool.calendars.find(c => c.id === calId)?.libraryOrigin === undefined, 'gepromoveerde kalender heeft geen herkomst (is zelf origineel)');
  assert(pool.poolVersion === v0 + 1, 'promoteCalendarToPool bumpt de pool');

  // Return-eerlijkheid (review taak 7): promoveren naar een niet-bestaand bedrijf ⇒ `null`.
  assert(s.promoteCalendarToPool('ghost-company', {
    id: 'x', name: 'x', description: '', workDays: [1], workStartHour: 8, workEndHour: 16,
    hoursPerDay: 8, holidays: [],
  }) === null, 'promoteCalendarToPool: null bij onbestaand bedrijf');
  assert(s.promoteResourceToPool('ghost-company', { id: 'x', name: 'x', type: 'LABOR', description: '', maxUnits: 1 }) === null, 'promoteResourceToPool: null bij onbestaand bedrijf');

  const resId = s.promoteResourceToPool(cid, {
    id: 'proj-res', name: 'Metselaar', type: 'LABOR', description: '', maxUnits: 3, calendarId: 'proj-cal',
  })!;
  pool = useAppStore.getState().pools[cid];
  assert(pool.resources.find(r => r.id === resId)?.calendarId === undefined, 'gepromoveerde resource verliest project-lokale calendarId');
  assert(pool.poolVersion === v0 + 2, 'promoteResourceToPool bumpt opnieuw');

  s.updatePoolResource(cid, resId, { maxUnits: 5 });
  pool = useAppStore.getState().pools[cid];
  assert(pool.resources.find(r => r.id === resId)?.maxUnits === 5, 'updatePoolResource');
  assert(pool.poolVersion === v0 + 3, 'updatePoolResource bumpt');

  s.removePoolResource(cid, resId);
  s.removePoolCalendar(cid, calId);
  pool = useAppStore.getState().pools[cid];
  assert(!pool.resources.some(r => r.id === resId) && !pool.calendars.some(c => c.id === calId), 'removePool* verwijdert items');
  assert(pool.poolVersion === v0 + 5, 'removePool* bumpt tweemaal');
}

// --- Terug-stempel bij promotie (review taak 7): het BRON-projectitem krijgt herkomst ---
{
  const cid = useAppStore.getState().defaultCompanyId;
  // Echte projectitems (in s.calendars/s.resources), zodat de terug-stempel iets kan raken.
  const pcId = useAppStore.getState().addCalendar({
    name: 'Bron-kalender', description: '', workDays: [1, 2, 3, 4, 5],
    workStartHour: 8, workEndHour: 16, hoursPerDay: 8, holidays: [],
  });
  const pcCal = useAppStore.getState().calendars.find(c => c.id === pcId)!;
  const newCalItemId = useAppStore.getState().promoteCalendarToPool(cid, pcCal)!;
  const poolVer = useAppStore.getState().pools[cid].poolVersion;
  const stampedCal = useAppStore.getState().calendars.find(c => c.id === pcId)!;
  assert(!!stampedCal.libraryOrigin, 'promoteCalendarToPool: bron-projectkalender krijgt herkomststempel');
  assert(stampedCal.libraryOrigin?.companyId === cid && stampedCal.libraryOrigin?.libraryItemId === newCalItemId, 'promoteCalendarToPool: stempel wijst naar de nieuwe pool-item-id');
  assert(stampedCal.libraryOrigin?.poolVersion === poolVer, 'promoteCalendarToPool: stempel draagt de gebumpte poolVersion (geen off-by-one)');

  const prId = useAppStore.getState().addResource({ name: 'Bron-resource', type: 'LABOR', description: '', maxUnits: 2 });
  const prRes = useAppStore.getState().resources.find(r => r.id === prId)!;
  const newResItemId = useAppStore.getState().promoteResourceToPool(cid, prRes)!;
  const poolVer2 = useAppStore.getState().pools[cid].poolVersion;
  const stampedRes = useAppStore.getState().resources.find(r => r.id === prId)!;
  assert(!!stampedRes.libraryOrigin, 'promoteResourceToPool: bron-projectresource krijgt herkomststempel');
  assert(stampedRes.libraryOrigin?.libraryItemId === newResItemId && stampedRes.libraryOrigin?.poolVersion === poolVer2, 'promoteResourceToPool: stempel draagt de nieuwe id + gebumpte poolVersion');

  // FIX 1 (critreview taak 8): promoveer de PROJECTDEFAULT-kalender. De gedenormaliseerde cache
  // `s.calendar` (waar de IFC-writer uit leest) moet de stempel óók dragen — de niet-default-check
  // hierboven raakt dit pad niet. Zonder de syncProjectCalendar-fix blijft s.calendar ongestempeld.
  const dcId = useAppStore.getState().addCalendar({
    name: 'Default-kalender', description: '', workDays: [1, 2, 3, 4, 5],
    workStartHour: 7, workEndHour: 15, hoursPerDay: 8, holidays: [],
  });
  useAppStore.getState().setProjectCalendar(dcId);
  assert(useAppStore.getState().calendar.id === dcId, 'setup: s.calendar is de projectdefault');
  const dcCal = useAppStore.getState().calendars.find(c => c.id === dcId)!;
  const newDefItemId = useAppStore.getState().promoteCalendarToPool(cid, dcCal)!;
  const poolVerDef = useAppStore.getState().pools[cid].poolVersion;
  const cache = useAppStore.getState().calendar;
  assert(!!cache.libraryOrigin, 'promoteCalendarToPool: gedenormaliseerde s.calendar-cache krijgt de stempel (projectdefault-pad)');
  assert(cache.libraryOrigin?.libraryItemId === newDefItemId && cache.libraryOrigin?.poolVersion === poolVerDef, 'promoteCalendarToPool: s.calendar-stempel draagt nieuwe id + gebumpte poolVersion');
}

// --- initLibrary-normalisatie (hardening ná review taak 6) ---
{
  // Vorm-invalide opgeslagen bibliotheek: companies zonder pools, een wees-pool, en een
  // defaultCompanyId die naar niets (meer) wijst. Mag nooit een TypeError geven.
  const invalid = {
    companies: [{ id: 'c1', name: 'Bedrijf 1' }, { id: 'c2', name: 'Bedrijf 2' }],
    defaultCompanyId: 'ghost-company',
    pools: {
      'orphan-company': { companyId: 'orphan-company', companyName: 'Weg', poolVersion: 0, modifiedAt: '2020-01-01T00:00:00.000Z', calendars: [], resources: [] },
      // Structureel kapotte maar bedrijf-gebonden pool (review taak 7): calendars/resources ontbreken,
      // poolVersion/modifiedAt zijn geen geldige waarden. Mag nooit later een TypeError op `.push` geven.
      'c1': { companyId: 'c1' },
    },
  } as unknown as Parameters<typeof normalizeLoadedLibrary>[0];

  let normalized: ReturnType<typeof normalizeLoadedLibrary> | undefined;
  let threw = false;
  try { normalized = normalizeLoadedLibrary(invalid); } catch { threw = true; }
  assert(!threw, 'normalizeLoadedLibrary gooit niet op vorm-invalide input');
  assert(!!normalized && normalized.companies.length === 2, 'normalizeLoadedLibrary behoudt geldige companies');
  assert(!!normalized && normalized.companies.some(c => c.id === normalized!.defaultCompanyId), 'normalizeLoadedLibrary: ongeldige defaultCompanyId valt terug op een bestaand bedrijf');
  assert(!!normalized && !('orphan-company' in normalized.pools), 'normalizeLoadedLibrary ruimt wees-pools op');

  // Pool-internals van een behouden maar kapotte pool zijn genormaliseerd tot bruikbare vormen.
  const p = normalized!.pools['c1'];
  assert(!!p && Array.isArray(p.calendars) && Array.isArray(p.resources), 'normalizeLoadedLibrary: kapotte pool krijgt array-calendars/resources');
  assert(!!p && typeof p.poolVersion === 'number' && p.poolVersion === 1, 'normalizeLoadedLibrary: ontbrekende poolVersion valt terug op 1');
  assert(!!p && typeof p.modifiedAt === 'string' && p.modifiedAt.length > 0, 'normalizeLoadedLibrary: ontbrekende modifiedAt valt terug op nu');

  // Volledig lege/undefined input ⇒ seed met standaardbedrijf (zoals de verse-tak).
  const empty = {} as unknown as Parameters<typeof normalizeLoadedLibrary>[0];
  const seeded = normalizeLoadedLibrary(empty);
  assert(seeded.companies.length === 1, 'normalizeLoadedLibrary: lege input seedt met standaardbedrijf');
  assert(seeded.defaultCompanyId === seeded.companies[0].id, 'normalizeLoadedLibrary: lege input krijgt geldige default');
}

// --- Toevoegen uit bibliotheek (meereizende kalender + dedup + binding) ---
{
  const s = useAppStore.getState();
  const cid = s.defaultCompanyId;
  // Seed de pool met een kalender + resource-die-ernaar-verwijst.
  const poolCalId = s.promoteCalendarToPool(cid, {
    id: 'seed-cal', name: 'Nachtploeg', description: '', workDays: [1, 2, 3, 4, 5],
    workStartHour: 22, workEndHour: 6, hoursPerDay: 8, holidays: [],
  })!;
  // Resource met eigen kalender: zet zijn calendarId op de POOL-kalender-id (promote strip het niet
  // want we bouwen de pool-resource direct).
  const poolResId = s.promoteResourceToPool(cid, { id: 'seed-res', name: 'Wachter', type: 'LABOR', description: '', maxUnits: 1 })!;
  useAppStore.getState().updatePoolResource(cid, poolResId, { calendarId: poolCalId });

  const beforeCals = useAppStore.getState().calendars.length;
  const undoBefore = useAppStore.getState().undoStack.length;
  const r1 = useAppStore.getState().addLibraryResourceToProject(cid, poolResId);
  assert(r1.added === true, 'addLibraryResource: resource toegevoegd');
  let st = useAppStore.getState();
  assert(st.resources.some(r => r.id === r1.resourceId), 'addLibraryResource: resource in project');
  assert(st.calendars.length === beforeCals + 1, 'addLibraryResource: kalender reisde mee');
  assert(st.undoStack.length === undoBefore + 1, 'addLibraryResource: undo-snapshot gepusht (E-3)');
  const added = st.resources.find(r => r.id === r1.resourceId)!;
  assert(!!st.calendars.find(c => c.id === added.calendarId)?.libraryOrigin, 'addLibraryResource: meegereisde kalender heeft herkomst');
  assert(st.project.companyId === cid, 'addLibraryResource: project gebonden aan bedrijf');

  // Nogmaals toevoegen ⇒ dedup, geen duplicaat, GEEN loze undo-stap (E-3).
  const undoAfterAdd = useAppStore.getState().undoStack.length;
  const r2 = useAppStore.getState().addLibraryResourceToProject(cid, poolResId);
  assert(r2.added === false && r2.resourceId === r1.resourceId, 'addLibraryResource: dedup ("al in project")');
  assert(useAppStore.getState().resources.filter(r => r.libraryOrigin?.libraryItemId === poolResId).length === 1, 'addLibraryResource: geen duplicaat');
  assert(useAppStore.getState().calendars.length === beforeCals + 1, 'addLibraryResource: kalender niet gedupliceerd bij tweede keer');
  assert(useAppStore.getState().undoStack.length === undoAfterAdd, 'addLibraryResource: dedup pusht geen undo-snapshot (E-3)');

  // Losse bibliotheek-kalender toevoegen is óók undoable (E-3).
  const poolCalId2 = useAppStore.getState().promoteCalendarToPool(cid, {
    id: 'seed-cal2', name: 'Weekendploeg', description: '', workDays: [6, 7],
    workStartHour: 8, workEndHour: 16, hoursPerDay: 8, holidays: [],
  })!;
  const undoBeforeCal = useAppStore.getState().undoStack.length;
  const c1 = useAppStore.getState().addLibraryCalendarToProject(cid, poolCalId2);
  assert(c1.added === true, 'addLibraryCalendar: kalender toegevoegd');
  assert(useAppStore.getState().undoStack.length === undoBeforeCal + 1, 'addLibraryCalendar: undo-snapshot gepusht (E-3)');
  const undoAfterCal = useAppStore.getState().undoStack.length;
  const c2 = useAppStore.getState().addLibraryCalendarToProject(cid, poolCalId2);
  assert(c2.added === false, 'addLibraryCalendar: dedup ("al in project")');
  assert(useAppStore.getState().undoStack.length === undoAfterCal, 'addLibraryCalendar: dedup pusht geen undo-snapshot (E-3)');
}

// --- Undo van een add-resource: echte rollback + sticky binding (critreview taak 8) ---
{
  useAppStore.getState().newProject(); // verse, ONGEBONDEN payload; undoStack leeg, pools blijven
  const cid = useAppStore.getState().defaultCompanyId;
  // Seed een pool-resource-met-eigen-kalender, los van de vorige blokken.
  const pCal = useAppStore.getState().promoteCalendarToPool(cid, {
    id: 'undo-cal', name: 'Undo-ploeg', description: '', workDays: [1, 2, 3, 4, 5],
    workStartHour: 8, workEndHour: 16, hoursPerDay: 8, holidays: [],
  })!;
  const pRes = useAppStore.getState().promoteResourceToPool(cid, { id: 'undo-res', name: 'Undo-res', type: 'LABOR', description: '', maxUnits: 1 })!;
  useAppStore.getState().updatePoolResource(cid, pRes, { calendarId: pCal });

  assert(!useAppStore.getState().project.companyId, 'setup: verse project is ongebonden');
  const calsBefore = useAppStore.getState().calendars.length;
  const resBefore = useAppStore.getState().resources.length;
  const add = useAppStore.getState().addLibraryResourceToProject(cid, pRes);
  assert(add.added === true, 'undo-scenario: resource toegevoegd');
  assert(useAppStore.getState().project.companyId === cid, 'undo-scenario: add bindt het (ongebonden) project');
  assert(useAppStore.getState().resources.length === resBefore + 1, 'undo-scenario: resource erbij');
  assert(useAppStore.getState().calendars.length === calsBefore + 1, 'undo-scenario: meegereisde kalender erbij');

  // FIX 3: undo moet de state ÉCHT terugdraaien (niet alleen undoStack laten krimpen).
  useAppStore.getState().undo();
  const su = useAppStore.getState();
  assert(su.resources.length === resBefore && !su.resources.some(r => r.id === add.resourceId), 'undo: resource daadwerkelijk teruggedraaid (weg)');
  assert(su.calendars.length === calsBefore, 'undo: meegereisde kalender daadwerkelijk teruggedraaid (weg)');
  // FIX 2: binding is sticky — undo draait project.companyId NIET terug (project snapshot:'none').
  assert(su.project.companyId === cid, 'undo: binding blijft sticky (project snapshot:none)');
}

console.log(`library-slice: ${checks - fails}/${checks} groen`);
process.exit(fails > 0 ? 1 : 0);
