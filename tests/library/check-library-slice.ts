// Headless store-batterij voor de bedrijfsbibliotheek (spec B1). Draait de ECHTE Zustand-store op
// Node (patroon tests/planning/check-move-assignment.ts). Persistentie (saveLibrary) valt in Node
// stil terug (geen IndexedDB/Tauri) — we asserten alleen de in-memory state. Exitcode = poort.
import { useAppStore } from '@/state/appStore';
import { normalizeLoadedLibrary } from '@/state/slices/librarySlice';
import { computeCalendarHash, computeResourceHash } from '@/services/library/libraryOps';

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
  // GO-NA-FIX 3 (critreview 9f9f0aa): een net-gepromoveerd item is byte-identiek aan zijn poolitem —
  // de back-stamp moet daarom meteen de hash VAN DAT POOLITEM dragen (anders classificeert het
  // projectitem straks als 'deviated', een spurieuze afwijkingsvraag).
  const poolCalAfterPromote = useAppStore.getState().pools[cid].calendars.find(c => c.id === newCalItemId)!;
  assert(stampedCal.libraryOrigin?.syncedHash === computeCalendarHash(poolCalAfterPromote), 'promoteCalendarToPool: back-stamp syncedHash == hash van het poolitem');

  const prId = useAppStore.getState().addResource({ name: 'Bron-resource', type: 'LABOR', description: '', maxUnits: 2 });
  const prRes = useAppStore.getState().resources.find(r => r.id === prId)!;
  const newResItemId = useAppStore.getState().promoteResourceToPool(cid, prRes)!;
  const poolVer2 = useAppStore.getState().pools[cid].poolVersion;
  const stampedRes = useAppStore.getState().resources.find(r => r.id === prId)!;
  assert(!!stampedRes.libraryOrigin, 'promoteResourceToPool: bron-projectresource krijgt herkomststempel');
  assert(stampedRes.libraryOrigin?.libraryItemId === newResItemId && stampedRes.libraryOrigin?.poolVersion === poolVer2, 'promoteResourceToPool: stempel draagt de nieuwe id + gebumpte poolVersion');
  const poolResAfterPromote = useAppStore.getState().pools[cid].resources.find(r => r.id === newResItemId)!;
  assert(stampedRes.libraryOrigin?.syncedHash === computeResourceHash(poolResAfterPromote), 'promoteResourceToPool: back-stamp syncedHash == hash van het poolitem');

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

// --- Fix B4: promote-stempel is undo-BESCHERMD (bewezen B7, stress-undo-redo.ts scenario A1/A2) ---
// De promote-stempel-mutatie op het BRON-projectitem stond vroeger op GEEN enkele undo-snapshot —
// alleen de POOL-mutatie zelf blijft bewust buiten undo (app-globale data). Twee scenario's:
{
  // Scenario 1 (spec-orde: "promote → undo ⇒ stempel weg, poolkopie blijft"): een undo van de
  // promote-actie ZELF (de meest recente actie op de stack) draait de stempel terug — de pool-kopie
  // blijft staan (bewust, zie docs/library.md "Bekende kleine punten").
  useAppStore.getState().newProject();
  const cid = useAppStore.getState().defaultCompanyId;
  const cId = useAppStore.getState().addCalendar({
    name: 'B4-C', description: '', workDays: [1, 2, 3, 4, 5], workStartHour: 7, workEndHour: 15, hoursPerDay: 8, holidays: [],
  });
  const cCal = useAppStore.getState().calendars.find(c => c.id === cId)!;
  const poolItemId = useAppStore.getState().promoteCalendarToPool(cid, cCal)!;
  assert(!!useAppStore.getState().calendars.find(c => c.id === cId)?.libraryOrigin, 'B4 scenario 1 setup: stempel aanwezig vóór undo');
  assert(useAppStore.getState().pools[cid].calendars.some(c => c.id === poolItemId), 'B4 scenario 1 setup: poolkopie aanwezig vóór undo');

  useAppStore.getState().undo();
  const s1 = useAppStore.getState();
  assert(!s1.calendars.find(c => c.id === cId)?.libraryOrigin, 'B4 scenario 1: undo van de promote-actie zelf verwijdert de stempel');
  assert(s1.pools[cid].calendars.some(c => c.id === poolItemId), 'B4 scenario 1: de poolkopie blijft staan (pool is app-globaal, niet undo-beschermd)');

  // Scenario 2 ("de B7-jacht dichtzetten"): een LATERE, ONGERELATEERDE undo mag een EERDER
  // aangebrachte stempel niet meer wegvegen. Volgorde: promoveer C1 EERST (stempel + eigen
  // undo-snapshot), voeg dán een ongerelateerde C2 toe (nieuwe undo-snapshot), en undo() —
  // dat undo't uitsluitend de meest recente actie (addCalendar C2); de C1-stempel, die zijn EIGEN
  // undo-grens al had (fix B4), wordt niet meer meegesleurd (vóór de fix — B7 A1/A2 — gebeurde dat
  // wél, ongeacht de volgorde, want de stempel-mutatie had toen HELEMAAL geen eigen undo-grens).
  useAppStore.getState().newProject();
  const cid2 = useAppStore.getState().defaultCompanyId;
  const c1Id = useAppStore.getState().addCalendar({
    name: 'B4-C1', description: '', workDays: [1, 2, 3, 4, 5], workStartHour: 7, workEndHour: 15, hoursPerDay: 8, holidays: [],
  });
  const c1Cal = useAppStore.getState().calendars.find(c => c.id === c1Id)!;
  useAppStore.getState().promoteCalendarToPool(cid2, c1Cal);
  assert(!!useAppStore.getState().calendars.find(c => c.id === c1Id)?.libraryOrigin, 'B4 scenario 2 setup: C1 heeft de stempel ná promote');

  const c2Id = useAppStore.getState().addCalendar({
    name: 'B4-C2', description: '', workDays: [1, 2, 3, 4, 5], workStartHour: 8, workEndHour: 16, hoursPerDay: 8, holidays: [],
  });
  assert(useAppStore.getState().calendars.some(c => c.id === c2Id), 'B4 scenario 2 setup: C2 toegevoegd (ná de promote)');

  useAppStore.getState().undo(); // undo't uitsluitend addCalendar(C2) — de meest recente actie
  const s2 = useAppStore.getState();
  assert(!s2.calendars.some(c => c.id === c2Id), 'B4 scenario 2: undo verwijdert de ONGERELATEERDE latere C2 (zoals verwacht)');
  assert(!!s2.calendars.find(c => c.id === c1Id)?.libraryOrigin, 'B4 scenario 2 [FIX]: de EERDERE C1-stempel overleeft de latere, ongerelateerde undo (vóór fix B4: verloren, zie B7 A1/A2)');
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

  // Plan-eis 9: materialiseren gebeurt alleen op een al-gekoppeld project — bind vooraf expliciet
  // (dit blok test dedup/meereizende-kalender/undo-snapshots, niet de binding zelf; die heeft z'n
  // eigen blokken hierboven/hieronder).
  useAppStore.getState().bindProjectToCompany(cid);

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
  assert(st.project.companyId === cid, 'addLibraryResource: binding blijft intact na add (plan-eis 9 — add bindt niet meer zelf)');

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

// --- Undo van een add-resource: echte rollback; materialiseren op ongebonden project = no-op (plan-eis 9) ---
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

  // NIEUW CONTRACT (plan-eis 9): materialiseren op een ONGEBONDEN project is een no-op + warn.
  assert(!useAppStore.getState().project.companyId, 'setup: verse project is ongebonden');
  const guarded = useAppStore.getState().addLibraryResourceToProject(cid, pRes);
  assert(guarded.added === false && guarded.resourceId === null, 'materialiseren op ongebonden project: no-op (geen stille koppeling)');
  assert(!useAppStore.getState().project.companyId, 'materialiseren bindt een ongebonden project NIET (plan-eis 9)');

  // Normaal pad: bind eerst expliciet, dan materialiseren.
  useAppStore.getState().bindProjectToCompany(cid);
  const calsBefore = useAppStore.getState().calendars.length;
  const resBefore = useAppStore.getState().resources.length;
  const add = useAppStore.getState().addLibraryResourceToProject(cid, pRes);
  assert(add.added === true, 'undo-scenario: resource toegevoegd op gebonden project');
  assert(useAppStore.getState().project.companyId === cid, 'undo-scenario: project blijft gebonden');
  assert(useAppStore.getState().resources.length === resBefore + 1, 'undo-scenario: resource erbij');
  assert(useAppStore.getState().calendars.length === calsBefore + 1, 'undo-scenario: meegereisde kalender erbij');

  // Undo draait de materialisatie ÉCHT terug; de binding (project snapshot:'none') blijft sticky.
  useAppStore.getState().undo();
  const su = useAppStore.getState();
  assert(su.resources.length === resBefore && !su.resources.some(r => r.id === add.resourceId), 'undo: resource daadwerkelijk teruggedraaid (weg)');
  assert(su.calendars.length === calsBefore, 'undo: meegereisde kalender daadwerkelijk teruggedraaid (weg)');
  assert(su.project.companyId === cid, 'undo: binding blijft sticky (project snapshot:none)');
}

// --- Kalender-only add: no-op op ongebonden project, werkt na expliciet binden (plan-eis 9) ---
{
  useAppStore.getState().newProject(); // verse, ONGEBONDEN payload
  const cid = useAppStore.getState().defaultCompanyId;
  const poolCalId = useAppStore.getState().promoteCalendarToPool(cid, {
    id: 'bind-cal', name: 'Bindploeg', description: '', workDays: [1, 2, 3, 4, 5],
    workStartHour: 8, workEndHour: 16, hoursPerDay: 8, holidays: [],
  })!;

  // Ongebonden project: kalender-materialisatie is een no-op (plan-eis 9).
  assert(!useAppStore.getState().project.companyId, 'setup: verse project is ongebonden');
  const guarded = useAppStore.getState().addLibraryCalendarToProject(cid, poolCalId);
  assert(guarded.added === false && guarded.calendarId === null, 'kalender-materialiseren op ongebonden project: no-op');
  assert(!useAppStore.getState().project.companyId, 'kalender-materialiseren bindt het project NIET (plan-eis 9)');

  // Na expliciet binden werkt materialiseren wél.
  useAppStore.getState().bindProjectToCompany(cid);
  const c = useAppStore.getState().addLibraryCalendarToProject(cid, poolCalId);
  assert(c.added === true, 'kalender-only-add op gebonden project: kalender toegevoegd');
  assert(useAppStore.getState().project.companyId === cid, 'kalender-only-add: project blijft gebonden');
}

// --- Bijwerken vanuit bibliotheek (diff + toepassen + "bestaat niet meer") ---
{
  const s = useAppStore.getState();
  const cid = s.defaultCompanyId;
  useAppStore.getState().bindProjectToCompany(cid); // materialiseren vereist een gebonden project (Taak 4)
  const poolResId = s.promoteResourceToPool(cid, { id: 'upd-res', name: 'Elektricien', type: 'LABOR', description: '', maxUnits: 1 })!;
  const added = useAppStore.getState().addLibraryResourceToProject(cid, poolResId);
  const projResId = added.resourceId!;

  assert(useAppStore.getState().diffProjectResource(projResId)?.status === 'up-to-date', 'diffProjectResource: vers = up-to-date');

  // Verzoening met behind-only grens 3 (Taak 6): bewerk de kopie LOKAAL (deviated: file != syncedHash)
  // vóór de pool-edit. Zo laat de grens-3-verversing bij updatePoolResource hem staan en blijft de diff
  // observeerbaar 'changed' (zonder deze stap ververst grens 3 hem stil naar 'up-to-date' en faalt de assert).
  useAppStore.getState().updateResource(projResId, { description: 'lokaal bewerkt' });

  // Wijzig de pool ⇒ diff blijft 'changed' (deviated kopie wordt door grens 3 niet aangeraakt).
  useAppStore.getState().updatePoolResource(cid, poolResId, { maxUnits: 4 });
  const d = useAppStore.getState().diffProjectResource(projResId);
  assert(d?.status === 'changed', 'diffProjectResource: pool gewijzigd ⇒ changed (deviated kopie blijft staan)');

  // undoBeforeUpd wordt hier gemeten — ná de lokale updateResource — dus de +1-assert telt alleen de
  // updateProjectResourceFromLibrary-snapshot (de extra updateResource zit al in de baseline).
  const undoBeforeUpd = useAppStore.getState().undoStack.length;
  useAppStore.getState().updateProjectResourceFromLibrary(projResId);
  const updated = useAppStore.getState().resources.find(r => r.id === projResId)!;
  assert(updated.maxUnits === 4, 'updateProjectResourceFromLibrary: waarde overgenomen');
  assert(updated.id === projResId, 'updateProjectResourceFromLibrary: project-id behouden');
  assert(useAppStore.getState().undoStack.length === undoBeforeUpd + 1, 'updateProjectResourceFromLibrary: undo-snapshot gepusht (E-3)');
  assert(useAppStore.getState().diffProjectResource(projResId)?.status === 'up-to-date', 'na bijwerken weer up-to-date');

  // Micro-stap (critreview taak 9): update-aanroep op een up-to-date item is óók een no-op — geen
  // loze undo-stap, isDirty blijft ongewijzigd (guard verruimd van 'removed' naar '!== changed').
  const undoBeforeUpToDate = useAppStore.getState().undoStack.length;
  const isDirtyBeforeUpToDate = useAppStore.getState().isDirty;
  useAppStore.getState().updateProjectResourceFromLibrary(projResId);
  assert(useAppStore.getState().undoStack.length === undoBeforeUpToDate, 'update op up-to-date resource: geen loze undo-snapshot');
  assert(useAppStore.getState().isDirty === isDirtyBeforeUpToDate, 'update op up-to-date resource: isDirty ongewijzigd');

  // Verwijder het origineel uit de pool ⇒ diff "removed", bijwerken is no-op (én geen undo-stap, E-3).
  useAppStore.getState().removePoolResource(cid, poolResId);
  assert(useAppStore.getState().diffProjectResource(projResId)?.status === 'removed', 'diffProjectResource: origineel weg ⇒ removed');
  const beforeName = useAppStore.getState().resources.find(r => r.id === projResId)!.name;
  const undoBeforeNoop = useAppStore.getState().undoStack.length;
  useAppStore.getState().updateProjectResourceFromLibrary(projResId);
  assert(useAppStore.getState().resources.find(r => r.id === projResId)!.name === beforeName, 'update op verwijderd origineel = no-op');
  assert(useAppStore.getState().undoStack.length === undoBeforeNoop, 'update op verwijderd origineel: geen loze undo-snapshot (E-3)');
}

// --- PROJECTDEFAULT-kalender bijwerken: denorm-cache s.calendar moet meelopen (E-2, §9.1) ---
{
  useAppStore.getState().newProject();
  const cid = useAppStore.getState().defaultCompanyId;
  // Migreer de inline projectdefault naar s.calendars zodat promote 'm als bron vindt én stempelt.
  useAppStore.getState().ensureProjectCalendarInLibrary();
  const defId = useAppStore.getState().project.calendarId;
  const defCal = useAppStore.getState().calendars.find(c => c.id === defId)!;
  // Promoveer de PROJECTDEFAULT-kalender → stempelt libraryOrigin op de default + synct s.calendar.
  const poolCalId = useAppStore.getState().promoteCalendarToPool(cid, defCal)!;
  assert(useAppStore.getState().calendar.libraryOrigin?.libraryItemId === poolCalId, 'projectdefault: promote stempelt de denorm-cache s.calendar');
  assert(useAppStore.getState().diffProjectCalendar(defId)?.status === 'up-to-date', 'projectdefault: vers = up-to-date');

  // Wijzig de pool-kalender ⇒ diff "changed".
  useAppStore.getState().updatePoolCalendar(cid, poolCalId, { workEndHour: 18, hoursPerDay: 9 });
  assert(useAppStore.getState().diffProjectCalendar(defId)?.status === 'changed', 'projectdefault: pool gewijzigd ⇒ changed');

  const undoBefore = useAppStore.getState().undoStack.length;
  useAppStore.getState().updateProjectCalendarFromLibrary(defId);
  const su = useAppStore.getState();
  assert(su.calendars.find(c => c.id === defId)!.workEndHour === 18, 'projectdefault: waarde overgenomen in s.calendars');
  // De kern van E-2: de gedenormaliseerde cache s.calendar (bron voor de writer) is meegelopen.
  assert(su.calendar.id === defId && su.calendar.workEndHour === 18 && su.calendar.hoursPerDay === 9, 'projectdefault: denorm-cache s.calendar in sync (E-2, §9.1)');
  assert(su.undoStack.length === undoBefore + 1, 'projectdefault: undo-snapshot gepusht (E-3)');
  assert(su.diffProjectCalendar(defId)?.status === 'up-to-date', 'projectdefault: na bijwerken weer up-to-date');

  // Micro-stap (critreview taak 9): update op een up-to-date kalender is óók een no-op.
  const undoBeforeUpToDate = useAppStore.getState().undoStack.length;
  const isDirtyBeforeUpToDate = useAppStore.getState().isDirty;
  useAppStore.getState().updateProjectCalendarFromLibrary(defId);
  assert(useAppStore.getState().undoStack.length === undoBeforeUpToDate, 'update op up-to-date kalender: geen loze undo-snapshot');
  assert(useAppStore.getState().isDirty === isDirtyBeforeUpToDate, 'update op up-to-date kalender: isDirty ongewijzigd');

  // Verwijder het origineel ⇒ removed + bijwerken no-op zonder undo-stap.
  useAppStore.getState().removePoolCalendar(cid, poolCalId);
  assert(useAppStore.getState().diffProjectCalendar(defId)?.status === 'removed', 'projectdefault: origineel weg ⇒ removed');
  const undoNoop = useAppStore.getState().undoStack.length;
  const endHourBefore = useAppStore.getState().calendar.workEndHour;
  useAppStore.getState().updateProjectCalendarFromLibrary(defId);
  assert(useAppStore.getState().calendar.workEndHour === endHourBefore, 'projectdefault: update op verwijderd origineel = no-op');
  assert(useAppStore.getState().undoStack.length === undoNoop, 'projectdefault: no-op geen loze undo-snapshot (E-3)');
}

// --- Export/import pool + demping ---
{
  const s = useAppStore.getState();
  const cid = s.defaultCompanyId;
  s.promoteResourceToPool(cid, { id: 'exp-res', name: 'Loodgieter', type: 'LABOR', description: '', maxUnits: 1 });
  const ifc = useAppStore.getState().exportPoolIFC(cid);
  assert(!!ifc && ifc.includes('OPS_Library'), 'exportPoolIFC produceert een pool-bestand');

  const localVersion = useAppStore.getState().pools[cid].poolVersion;
  // Een OUDERE geïmporteerde pool ⇒ demping meldt "lokaal nieuwer".
  const older = { companyId: cid, companyName: 'x', poolVersion: 0, modifiedAt: '2000-01-01T00:00:00.000Z', calendars: [], resources: [] };
  assert(useAppStore.getState().isLocalPoolNewer(cid, older) === true, 'isLocalPoolNewer: oudere import ⇒ true');

  // replacePool vervangt de hele pool.
  const fresh = { companyId: 'x', companyName: 'x', poolVersion: localVersion + 10, modifiedAt: '2030-01-01T00:00:00.000Z', calendars: [], resources: [{ id: 'new-only', name: 'X', type: 'LABOR' as const, description: '', maxUnits: 1 }] };
  useAppStore.getState().replacePool(cid, fresh);
  const pool = useAppStore.getState().pools[cid];
  assert(pool.resources.length === 1 && pool.resources[0].id === 'new-only', 'replacePool vervangt de hele pool');
  assert(pool.companyId === cid, 'replacePool herschrijft companyId naar het doelbedrijf');
  assert(useAppStore.getState().isLocalPoolNewer(cid, older) === true, 'na replace: nieuwe pool nog steeds nieuwer dan oude import');
}

// --- Import-normalisatie via replacePool (critreview taak 10, fix 1) ---
{
  const s = useAppStore.getState();
  const cid = s.defaultCompanyId;
  // Vorm-invalide pool zoals een hand-gemaakt/derde-tool OPS_Library-bestand zonder
  // resources/calendars/poolVersion/modifiedAt. Mag nooit een TypeError geven, noch nu, noch later
  // op find/push in promote/add-acties.
  const broken = { companyId: cid, companyName: 'Kapot' } as unknown as import('@/types/library').CompanyPool;
  let replaceThrew = false;
  try { useAppStore.getState().replacePool(cid, broken); } catch { replaceThrew = true; }
  assert(!replaceThrew, 'replacePool: gooit niet op een pool zonder resources/calendars');

  const importedPool = useAppStore.getState().pools[cid];
  assert(Array.isArray(importedPool?.calendars), 'replacePool: genormaliseerde pool heeft array-calendars');
  assert(Array.isArray(importedPool?.resources), 'replacePool: genormaliseerde pool heeft array-resources');
  assert(typeof importedPool?.poolVersion === 'number', 'replacePool: poolVersion numeriek na normalisatie');
  assert(typeof importedPool?.modifiedAt === 'string' && importedPool.modifiedAt.length > 0, 'replacePool: modifiedAt string na normalisatie');

  let promoteThrew = false;
  let poolResId: string | null = null;
  try {
    poolResId = useAppStore.getState().promoteResourceToPool(cid, { id: 'post-import-res', name: 'Stukadoor', type: 'LABOR', description: '', maxUnits: 1 });
  } catch { promoteThrew = true; }
  assert(!promoteThrew, 'na kapotte import: promoteResourceToPool gooit geen TypeError op .push');
  assert(!!poolResId, 'na kapotte import: promoteResourceToPool retourneert een id');

  // Plan-eis 9: materialiseren gebeurt alleen op een al-gekoppeld project — bind vooraf expliciet
  // (dit blok test de import-normalisatie, niet de binding zelf).
  useAppStore.getState().bindProjectToCompany(cid);

  let addThrew = false;
  let added: { added: boolean; resourceId: string | null } = { added: false, resourceId: null };
  try {
    if (poolResId) added = useAppStore.getState().addLibraryResourceToProject(cid, poolResId);
  } catch { addThrew = true; }
  assert(!addThrew, 'na kapotte import: addLibraryResourceToProject gooit geen TypeError op .find');
  assert(added.added === true, 'na kapotte import: addLibraryResourceToProject voegt toe');
}

// --- Fix B5: normalizePool — calendars/resources OBJECT i.p.v. array, en poolVersion-clamping ---
{
  const s = useAppStore.getState();
  const cid = s.defaultCompanyId;

  // `?? []` liet een object (niet-nullish) ongewijzigd door; `Array.isArray` vangt dat af. Zonder de
  // fix crasht een latere `.push`/`.find` op zo'n object alsnog (bewezen fuzz-pool b6, jachtlijn 1).
  const objectFields = {
    companyId: cid, companyName: 'Objectvelden', poolVersion: 2, modifiedAt: '2026-01-01T00:00:00.000Z',
    calendars: { oops: true }, resources: { oops: true },
  } as unknown as import('@/types/library').CompanyPool;
  let threwObj = false;
  try { useAppStore.getState().replacePool(cid, objectFields); } catch { threwObj = true; }
  assert(!threwObj, 'replacePool: gooit niet als calendars/resources een object zijn i.p.v. array');
  const poolObj = useAppStore.getState().pools[cid];
  assert(Array.isArray(poolObj?.calendars) && poolObj.calendars.length === 0, 'normalizePool: object-calendars wordt een lege array (niet het object)');
  assert(Array.isArray(poolObj?.resources) && poolObj.resources.length === 0, 'normalizePool: object-resources wordt een lege array (niet het object)');
  // Ná de fix moeten add/promote gewoon weer werken (geen TypeError op .push/.find van een object).
  let opsThrewObj = false;
  try {
    const cId = useAppStore.getState().promoteCalendarToPool(cid, {
      id: 'post-objfields-cal', name: 'Na-objectvelden', description: '', workDays: [1, 2, 3, 4, 5],
      workStartHour: 7, workEndHour: 15, hoursPerDay: 8, holidays: [],
    });
    if (cId) useAppStore.getState().addLibraryCalendarToProject(cid, cId);
  } catch { opsThrewObj = true; }
  assert(!opsThrewObj, 'na object-calendars/resources: promote/add werken zonder TypeError');

  // poolVersion: geheel getal ≥1, anders 1 (Number.isInteger + clamp).
  const versionCases: { label: string; poolVersion: unknown; expected: number }[] = [
    { label: 'string "7"', poolVersion: '7', expected: 1 },
    { label: 'negatief -3', poolVersion: -3, expected: 1 },
    { label: 'float 2.7', poolVersion: 2.7, expected: 1 },
    { label: 'ontbrekend', poolVersion: undefined, expected: 1 },
    { label: 'geldig 5', poolVersion: 5, expected: 5 },
  ];
  for (const { label, poolVersion, expected } of versionCases) {
    const raw = { companyId: cid, companyName: 'VerTest', modifiedAt: '2026-01-01T00:00:00.000Z', calendars: [], resources: [], poolVersion } as unknown as import('@/types/library').CompanyPool;
    useAppStore.getState().replacePool(cid, raw);
    const got = useAppStore.getState().pools[cid].poolVersion;
    assert(Number.isInteger(got) && got === expected, `normalizePool: poolVersion ${label} ⇒ ${expected} (was ${got})`);
  }
}

// --- Materialisatie stempelt syncedHash; geen sticky-autobind (plan-eis 9) ---
{
  const s = useAppStore.getState();
  const cid = s.addCompany('Mat BV');
  s.bindProjectToCompany(cid); // project is nu gekoppeld — het normale pad
  const resId = s.promoteResourceToPool(cid, { id: 'src', name: 'Kraanmachinist', type: 'LABOR', description: '', maxUnits: 1 })!;
  const r = s.addLibraryResourceToProject(cid, resId);
  const copy = useAppStore.getState().resources.find(x => x.id === r.resourceId);
  // Verscherpt (taak-4-review, bonus b): niet slechts truthy — exact gelijk aan de hash van het
  // POOLBRON-item op het moment van materialiseren (geen drift/toeval).
  const poolSrc = useAppStore.getState().pools[cid].resources.find(x => x.id === resId)!;
  assert(copy?.libraryOrigin?.syncedHash === computeResourceHash(poolSrc), 'materialisatie: syncedHash op de projectkopie == computeResourceHash(poolbron)');
  assert(copy?.libraryOrigin?.companyId === cid, 'materialisatie stempelt het juiste bedrijf');
}

// --- Verversingsprimitief: behind-only, niet-undoable, wist redoStack, geen isDirty (plan-eis 2) ---
{
  const s = useAppStore.getState();
  const cid = s.addCompany('Verv BV');
  s.bindProjectToCompany(cid);
  const resId = s.promoteResourceToPool(cid, { id: 'v', name: 'Stukadoor', type: 'LABOR', description: '', maxUnits: 1 })!;
  const add = s.addLibraryResourceToProject(cid, resId);
  s.updatePoolResource(cid, resId, { maxUnits: 5 });
  // Bouw een EXPLICIETE 'behind'-toestand (robuust tegen grens-3-timing): projectkopie op 1 MET de
  // syncedHash van maxUnits=1 ⇒ file==syncedHash ⇒ behind; pool staat op 5.
  const behindHash = computeResourceHash({ id: 'x', name: 'Stukadoor', type: 'LABOR', description: '', maxUnits: 1 });
  // Muterende setState-vorm (gevestigd patroon, tests/planning/check-document-contract.ts:127) — geen
  // partieel-object-return; muteer de Immer-draft.
  useAppStore.setState((st) => {
    st.isDirty = false; st.redoStack = [{} as never];
    const r = st.resources.find(r => r.id === add.resourceId);
    if (r) { r.maxUnits = 1; r.libraryOrigin!.syncedHash = behindHash; }
  });
  const changed = useAppStore.getState().refreshBehindItems(cid);
  const after = useAppStore.getState();
  assert(changed >= 1, 'refreshBehindItems telt gewijzigde items');
  assert(after.resources.find(r => r.id === add.resourceId)?.maxUnits === 5, 'verversing neemt poolwaarde over');
  assert(after.redoStack.length === 0, 'verversing WIST de redoStack (plan-eis 2)');
  assert(after.isDirty === false, 'verversing zet GEEN isDirty (spec §3)');

  // Een DEVIATED item (file != syncedHash) blijft ONgemoeid: file=4, syncedHash=hash(1), pool=5.
  useAppStore.setState((st) => {
    const r = st.resources.find(r => r.id === add.resourceId);
    if (r) { r.maxUnits = 4; r.libraryOrigin!.syncedHash = behindHash; }
  });
  useAppStore.getState().refreshBehindItems(cid);
  assert(useAppStore.getState().resources.find(r => r.id === add.resourceId)?.maxUnits === 4, 'refreshBehindItems laat een deviated item ONgemoeid');
}

// --- Verversingsprimitief: kalendertak-dekking (critreview d80beb4, verplichte fix 1) ---
{
  const s = useAppStore.getState();
  const cid = s.addCompany('Kal Verv BV');
  s.bindProjectToCompany(cid);
  const poolCalId = s.promoteCalendarToPool(cid, {
    id: 'kv-cal', name: 'Kalverploeg', description: '', workDays: [1, 2, 3, 4, 5],
    workStartHour: 7, workEndHour: 15, hoursPerDay: 8, holidays: [],
  })!;
  const addedCal = useAppStore.getState().addLibraryCalendarToProject(cid, poolCalId);
  const projCalId = addedCal.calendarId!;
  // Zet als projectdefault zodat de denorm-cache s.calendar in scope komt.
  useAppStore.getState().setProjectCalendar(projCalId);
  assert(useAppStore.getState().calendar.id === projCalId, 'setup: projectkalender is de default (s.calendar)');

  // Bewerk het POOLitem RECHTSTREEKS — bewust buiten de pool-CRUD om: sinds taak 6 ververst grens 3
  // automatisch bij updatePool*; dit blok test het primitief in isolatie. Materialisatie stempelde
  // al de pool-hash, dus deze wijziging maakt het bestand automatisch 'behind' (file==syncedHash,
  // pool wijkt af). Muterende Immer-draft-vorm, geen persist/bumpPool nodig — de diff kijkt naar
  // veldinhoud, niet naar poolVersion.
  useAppStore.setState((st) => {
    const pc = st.pools[cid].calendars.find(c => c.id === poolCalId)!;
    pc.workEndHour = 18; pc.hoursPerDay = 9;
  });
  assert(useAppStore.getState().diffProjectCalendar(projCalId)?.status === 'changed', 'setup: kalender is behind (pool gewijzigd)');

  useAppStore.setState((st) => { st.scheduleStale = false; });
  const changed = useAppStore.getState().refreshBehindItems(cid);
  const after = useAppStore.getState();
  assert(changed >= 1, 'refreshBehindItems (kalendertak): telt de gewijzigde kalender');
  const refreshedCal = after.calendars.find(c => c.id === projCalId)!;
  assert(refreshedCal.workEndHour === 18 && refreshedCal.hoursPerDay === 9, 'refreshBehindItems (kalendertak): kalenderwaarden bijgewerkt');
  assert(after.scheduleStale === true, 'refreshBehindItems (kalendertak): scheduleStale === true');
  assert(after.calendar.id === projCalId && after.calendar.workEndHour === 18 && after.calendar.hoursPerDay === 9, 'refreshBehindItems (kalendertak): denorm-cache s.calendar wijst naar de nieuwe waarden');

  // Negatief: reset scheduleStale, doe daarna een RESOURCE-ONLY-verversing ⇒ scheduleStale blijft false
  // (de guard moet echt aan `calChanged`/kalendertak hangen, niet aan `changed` in het algemeen).
  useAppStore.setState((st) => { st.scheduleStale = false; });
  const resId = useAppStore.getState().promoteResourceToPool(cid, { id: 'kv-res', name: 'Kalvermetselaar', type: 'LABOR', description: '', maxUnits: 1 })!;
  const addedRes = useAppStore.getState().addLibraryResourceToProject(cid, resId);
  // Bewust buiten de pool-CRUD om — zelfde reden als hierboven (grens-3-bedrading zou dit anders al
  // stil verversen vóórdat het primitief handmatig getest wordt).
  useAppStore.setState((st) => {
    const pr = st.pools[cid].resources.find(r => r.id === resId)!;
    pr.maxUnits = 3;
  });
  assert(useAppStore.getState().diffProjectResource(addedRes.resourceId!)?.status === 'changed', 'setup (negatief): resource is behind');
  useAppStore.getState().refreshBehindItems(cid);
  assert(useAppStore.getState().scheduleStale === false, 'refreshBehindItems: resource-only-verversing laat scheduleStale false');
}

// --- Bonus (taak-4-review): binding no-op bij afwijkend bedrijf (herhaalt geen bestaande assert) ---
{
  const s = useAppStore.getState();
  const cidA = s.addCompany('Grens A BV');
  const cidB = s.addCompany('Grens B BV');
  s.bindProjectToCompany(cidA);
  const resIdB = s.promoteResourceToPool(cidB, { id: 'grens-b', name: 'Tegelzetter', type: 'LABOR', description: '', maxUnits: 1 })!;
  const result = useAppStore.getState().addLibraryResourceToProject(cidB, resIdB);
  assert(result.added === false, 'addLibraryResourceToProject(B) op een aan A gebonden project: no-op (added=false)');
  assert(useAppStore.getState().project.companyId === cidA, 'addLibraryResourceToProject(B) op een aan A gebonden project: binding blijft op A');
}

// --- Dormant-payload-verversing (plan-eis 1): pool-edit raakt óók slapende documenten ---
{
  const s = useAppStore.getState();
  const cid = s.addCompany('Multi BV');
  s.bindProjectToCompany(cid);
  const resId = s.promoteResourceToPool(cid, { id: 'm', name: 'Voeger', type: 'LABOR', description: '', maxUnits: 1 })!;
  s.addLibraryResourceToProject(cid, resId);
  // Open een TWEEDE, leeg document; het eerste (met de materialisatie) wordt slapend.
  const firstDoc = useAppStore.getState().activeDocumentId;
  const secondDoc = s.newDocument();
  // Pool-edit terwijl het gematerialiseerde document slaapt.
  s.updatePoolResource(cid, resId, { maxUnits: 8 });
  const dormant = useAppStore.getState().documents.find(d => d.id === firstDoc);
  const dormantRes = dormant?.payload?.resources.find(r => r.libraryOrigin?.libraryItemId === resId);
  assert(dormantRes?.maxUnits === 8, 'pool-edit ververst de slapende payload (plan-eis 1)');
  assert(secondDoc !== firstDoc, 'tweede document is een ander id');

  // Fix 1 (critreview 71762fd): refreshAllDocumentsFromPool ververst de slapende resources, maar
  // schrijft bewust GEEN resourceLoadResult (dat blijft "manual, not reactive" tot activering — spec).
  // switchDocument moet die herberekening bij activering alsnog doen. Stempel een HERKENBAAR vervalste
  // waarde op de slapende payload (een '__stale__'-resourceId die geen enkele échte
  // computeResourceLoad-run ooit produceert) en verifieer dat die bij het wisselen vervangen wordt —
  // de sterkste assert die haalbaar is zonder taken/toewijzingen op te tuigen in dit library-blok.
  useAppStore.setState((st) => {
    const doc = st.documents.find(d => d.id === firstDoc);
    if (doc?.payload) doc.payload.resourceLoadResult = { load: {}, capacity: { __stale__: {} }, overallocatedDays: {} };
  });
  useAppStore.getState().switchDocument(firstDoc);
  const activeLoad = useAppStore.getState().resourceLoadResult;
  assert(!!activeLoad && !('__stale__' in activeLoad.capacity), 'switchDocument herberekent resourceLoadResult bij activering i.p.v. de slapende/verouderde waarde te laten staan (fix 1)');
}

console.log(`library-slice: ${checks - fails}/${checks} groen`);
process.exit(fails > 0 ? 1 : 0);
