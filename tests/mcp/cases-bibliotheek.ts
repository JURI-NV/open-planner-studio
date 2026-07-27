// MCP-TOOLS × BIBLIOTHEEKSTEMPELS (B1.1, issue #19).
//
// WAAROM DEZE BATTERIJ BESTAAT. De MCP-bridge en de bedrijfscentrische resourcebibliotheken zijn
// onafhankelijk gebouwd en raken elkaar op precies één punt: `planner_manage_resources` en
// `planner_update_calendar` kunnen items muteren die een herkomststempel (`libraryOrigin` +
// `syncedHash`) dragen. Niemand had gemeten wat daar gebeurt. Twee faalvormen, allebei erg:
//
//   1. STEMPEL WEG / STIL GESTRIPT — het item verliest zijn herkomst en valt buiten de
//      bibliotheekmechaniek; "bijwerken vanuit bibliotheek" werkt er nooit meer op.
//   2. HASH BLIND MEEGESCHREVEN — de tool werkt `syncedHash` bij zonder de POOL te wijzigen. Dan
//      geldt `fileHash === syncedHash` bij de eerstvolgende grens, wat `classifyOnOpen` als
//      'behind' leest — en 'behind' wordt door `runOpenBoundary` STIL ververst naar de poolwaarden.
//      De AI-bewerking verdwijnt dan geruisloos, zonder dat de gebruiker ooit iets gevraagd wordt.
//
// HET JUISTE GEDRAG (gemeten en hier vastgepind): de tools laten de stempel met rust. Ze schrijven
// de velden, raken `libraryOrigin` niet aan, en werken `syncedHash` NIET bij. Een wijziging op een
// bibliotheekveld levert daardoor 'deviated' op — precies de bedoeling: er is écht iets veranderd
// dat van de bedrijfsafspraak afwijkt, dus de gebruiker hoort de vraag te krijgen.
//
// De scheiding tussen BIBLIOTHEEKVELD en PROJECTINZET is daarbij het scharnier: `maxUnits` staat
// bewust niet in `RESOURCE_DIFF_FIELDS` (het is projectinzet, geen bedrijfsafspraak), dus een
// AI-wijziging daarop hoort GEEN afwijking te veroorzaken. Ook dat staat hieronder vastgepind.
//
// Testlijst:
//   1. nulmeting — vers gematerialiseerd item is 'in-sync' en zijn hash klopt
//   2. bibliotheekveld via MCP ⇒ stempel intact, hash ONgewijzigd, 'deviated' bij de grens
//   3. projectinzet (maxUnits) via MCP ⇒ blijft 'in-sync' (geen valse afwijking)
//   4. create in een gekoppeld project ⇒ projecteigen (geen stempel), pool onaangeroerd
//   5. delete van een gestempeld item ⇒ pool onaangeroerd, geen 'removed'-ruis bij de grens
//   6. planner_update_calendar op een gestempelde kalender ⇒ zelfde regel als bij resources
//   7. planner_batch (eigen transactiepad) ⇒ identiek aan de directe route
//   8. de bedoelde route (pool wijzigen) ⇒ beide kanten bewegen mee, blijft 'in-sync'
import { useAppStore, test, assert, assertEq, run } from './harness';
import { resourceTools } from '@/services/mcp/tools/resourceTools';
import { calendarResourceTools } from '@/services/mcp/tools/calendarResourceTools';
import { batchTools } from '@/services/mcp/tools/batchTool';
import { registerAllTools } from '@/services/mcp/toolRegistry';
import type { McpContext, McpToolResult, McpToolOk } from '@/services/mcp/contracts';
import { computeResourceHash, computeCalendarHash } from '@/services/library/libraryOps';

const store = useAppStore;
const ALL = [...resourceTools, ...calendarResourceTools, ...batchTools];
// `planner_batch` zoekt zijn stappen op in de REGISTRY, niet in de lijst hierboven.
registerAllTools();

// Warm-up (zelfde reden als cases-resource-crud.ts): een verse store heeft `calendars: []`.
store.getState().addTask({ name: 'warmup' });
store.getState().undo();

function makeCtx(): McpContext {
  return {
    expectedDocId: store.getState().activeDocumentId,
    tempIdMap: new Map<string, string>(),
    paused: false,
    readOnly: false,
    ensureBackup: async () => null,
  };
}
async function call(name: string, args: unknown): Promise<McpToolResult> {
  const def = ALL.find((t) => t.name === name);
  if (!def) throw new Error(`tool ontbreekt: ${name}`);
  return await def.handler(args, makeCtx());
}
function expectOk(res: McpToolResult, what: string): McpToolOk {
  assert(res.ok, `${what}: verwachtte ok, kreeg ${res.ok ? '' : res.error}`);
  const rej = (res as McpToolOk).itemRejections ?? [];
  assertEq(rej, [], `${what}: onverwachte per-item-weigering`);
  return res as McpToolOk;
}

/** Gekoppeld project met één gestempelde resource uit de bedrijfspool. */
function setupResource() {
  store.getState().newProject();
  const companyId = store.getState().addCompany('Testbedrijf');
  const poolResId = store.getState().addPoolResource(companyId, {
    name: 'Kraanmachinist', type: 'LABOR', description: 'Bibliotheekafspraak',
    maxUnits: 2, costPerHour: 65,
  })!;
  store.getState().bindProjectToCompany(companyId);
  const { resourceId } = store.getState().addLibraryResourceToProject(companyId, poolResId);
  const res = store.getState().resources.find((r) => r.id === resourceId)!;
  return { companyId, poolResId, resourceId: resourceId!, hashBijMaterialisatie: res.libraryOrigin!.syncedHash! };
}

/** Gekoppeld project met één gestempelde kalender uit de bedrijfspool. */
function setupCalendar() {
  store.getState().newProject();
  const companyId = store.getState().addCompany('Testbedrijf');
  const poolCalId = store.getState().addPoolCalendar(companyId, {
    name: 'Bedrijfskalender', description: 'Bibliotheekafspraak',
    workDays: [1, 2, 3, 4, 5], workStartHour: 7, workEndHour: 16, hoursPerDay: 8, holidays: [],
  })!;
  store.getState().bindProjectToCompany(companyId);
  const { calendarId } = store.getState().addLibraryCalendarToProject(companyId, poolCalId);
  const cal = store.getState().calendars.find((c) => c.id === calendarId)!;
  return { companyId, poolCalId, calendarId: calendarId!, hashBijMaterialisatie: cal.libraryOrigin!.syncedHash! };
}

function resource(id: string) {
  return store.getState().resources.find((r) => r.id === id);
}

// =================================================================================================
// 1) Nulmeting — de opzet zelf klopt (anders zegt de rest niets)
// =================================================================================================
test('nulmeting: vers gematerialiseerde resource is in-sync en draagt de juiste hash', () => {
  const { resourceId, hashBijMaterialisatie } = setupResource();
  const res = resource(resourceId)!;
  assert(!!res.libraryOrigin, 'gematerialiseerde resource hoort een stempel te dragen');
  assertEq(res.libraryOrigin!.syncedHash, computeResourceHash(res), 'syncedHash hoort de verse velden te dekken');
  assertEq(hashBijMaterialisatie, computeResourceHash(res), 'hash bij materialisatie == hash van de velden');
  assertEq(store.getState().onOpenStatusForResource(resourceId), 'in-sync', 'verse materialisatie is in-sync');
  assertEq(store.getState().runOpenBoundary(), { refreshed: 0, deviated: 0, removed: 0 }, 'grens ziet niets te doen');
});

// =================================================================================================
// 2) Bibliotheekveld via MCP — de kern van deze batterij
// =================================================================================================
test('MCP-wijziging op een BIBLIOTHEEKVELD: stempel intact, hash ongewijzigd, deviated bij de grens', async () => {
  const { resourceId, hashBijMaterialisatie } = setupResource();
  expectOk(await call('planner_manage_resources', {
    actions: [{ action: 'update', id: resourceId, costPerHour: 95 }],
  }), 'costPerHour-wijziging');

  const res = resource(resourceId)!;
  assertEq(res.costPerHour, 95, 'de wijziging hoort gewoon te landen');
  // Faalvorm 1 — stempel gestript.
  assert(!!res.libraryOrigin, 'stempel moet blijven staan na een MCP-wijziging');
  // Faalvorm 2 — hash blind meegeschreven. Dit is de belangrijkste assertie van het bestand:
  // gelijk aan de hash van vóór de wijziging, en dus ONgelijk aan de huidige velden.
  assertEq(res.libraryOrigin!.syncedHash, hashBijMaterialisatie, 'syncedHash mag NIET meebewegen met een MCP-wijziging');
  assert(res.libraryOrigin!.syncedHash !== computeResourceHash(res), 'hash hoort af te wijken van de gewijzigde velden');

  assertEq(store.getState().onOpenStatusForResource(resourceId), 'deviated', 'een gewijzigd bibliotheekveld is een afwijking');
  assertEq(store.getState().runOpenBoundary(), { refreshed: 0, deviated: 1, removed: 0 }, 'de grens telt precies één afwijking');
  assert(store.getState().ui.showLibraryLinkDialog, 'de gebruiker hoort de afwijkingsvraag te krijgen');
  // En de wijziging is NIET stil teruggedraaid door de grens ('behind'-verversing).
  assertEq(resource(resourceId)!.costPerHour, 95, 'de grens mag een afwijking niet stil terugdraaien');
});

test('MCP-hernoeming van een gestempelde resource valt onder dezelfde regel', async () => {
  const { resourceId, hashBijMaterialisatie } = setupResource();
  expectOk(await call('planner_manage_resources', {
    actions: [{ action: 'update', id: resourceId, name: 'Kraanmachinist (AI)' }],
  }), 'hernoeming');

  const res = resource(resourceId)!;
  assertEq(res.name, 'Kraanmachinist (AI)', 'de hernoeming hoort te landen');
  assert(!!res.libraryOrigin, 'stempel moet blijven staan');
  assertEq(res.libraryOrigin!.syncedHash, hashBijMaterialisatie, 'syncedHash mag niet meebewegen');
  assertEq(store.getState().onOpenStatusForResource(resourceId), 'deviated', 'naam is een bibliotheekveld');
});

// =================================================================================================
// 3) Projectinzet — GEEN valse afwijking
// =================================================================================================
test('MCP-wijziging op PROJECTINZET (maxUnits) veroorzaakt geen afwijking', async () => {
  const { resourceId, hashBijMaterialisatie } = setupResource();
  expectOk(await call('planner_manage_resources', {
    actions: [{ action: 'update', id: resourceId, maxUnits: 4 }],
  }), 'maxUnits-wijziging');

  const res = resource(resourceId)!;
  assertEq(res.maxUnits, 4, 'de wijziging hoort te landen');
  assertEq(res.libraryOrigin!.syncedHash, hashBijMaterialisatie, 'hash blijft ongemoeid');
  // maxUnits zit bewust NIET in RESOURCE_DIFF_FIELDS ⇒ de hash dekt hem niet ⇒ nog steeds in-sync.
  assertEq(res.libraryOrigin!.syncedHash, computeResourceHash(res), 'de gevolgde velden zijn niet veranderd');
  assertEq(store.getState().onOpenStatusForResource(resourceId), 'in-sync', 'projectinzet is geen bedrijfsafspraak');
  assertEq(store.getState().runOpenBoundary(), { refreshed: 0, deviated: 0, removed: 0 }, 'geen afwijkingsvraag');
  assert(!store.getState().ui.showLibraryLinkDialog, 'geen dialoog voor een projectinzet-wijziging');
});

// =================================================================================================
// 4) Aanmaken in een gekoppeld project ⇒ projecteigen
// =================================================================================================
test('create in een gekoppeld project levert een PROJECTEIGEN resource (geen stempel)', async () => {
  const { companyId } = setupResource();
  expectOk(await call('planner_manage_resources', {
    actions: [{ action: 'create', name: 'Nieuwe hulpkracht', type: 'LABOR', costPerHour: 40 }],
  }), 'create');

  const nieuw = store.getState().resources.find((r) => r.name === 'Nieuwe hulpkracht')!;
  assert(!nieuw.libraryOrigin, 'een via de bridge aangemaakte resource hoort GEEN herkomststempel te krijgen');
  assertEq(store.getState().onOpenStatusForResource(nieuw.id), null, 'geen eigen-bedrijf-stempel ⇒ geen status');
  assertEq(store.getState().pools[companyId].resources.length, 1, 'de bedrijfspool mag niet meegroeien met projectwerk');
  assertEq(store.getState().runOpenBoundary(), { refreshed: 0, deviated: 0, removed: 0 }, 'projecteigen items zijn geen afwijking');
});

// =================================================================================================
// 5) Verwijderen van een gestempeld item
// =================================================================================================
test('delete van een gestempelde resource laat de bedrijfspool ongemoeid', async () => {
  const { companyId, resourceId } = setupResource();
  expectOk(await call('planner_manage_resources', {
    actions: [{ action: 'delete', id: resourceId }],
  }), 'delete');

  assert(!resource(resourceId), 'de projectresource hoort weg te zijn');
  assertEq(store.getState().pools[companyId].resources.length, 1, 'het poolorigineel blijft bestaan');
  // Geen wees-ruis: het item is wég, dus de grens heeft er niets meer over te melden.
  assertEq(store.getState().runOpenBoundary(), { refreshed: 0, deviated: 0, removed: 0 }, 'geen removed-ruis na een projectverwijdering');
  assert(!store.getState().ui.showLibraryLinkDialog, 'verwijderen levert geen afwijkingsvraag op');
});

// =================================================================================================
// 6) Kalenders — zelfde regel
// =================================================================================================
test('planner_update_calendar op een gestempelde kalender: stempel intact, hash ongewijzigd, deviated', async () => {
  const { calendarId, hashBijMaterialisatie } = setupCalendar();
  expectOk(await call('planner_update_calendar', {
    calendars: [{ id: calendarId, hoursPerDay: 6 }],
  }), 'kalenderwijziging');

  const cal = store.getState().calendars.find((c) => c.id === calendarId)!;
  assertEq(cal.hoursPerDay, 6, 'de wijziging hoort te landen');
  assert(!!cal.libraryOrigin, 'stempel moet blijven staan');
  assertEq(cal.libraryOrigin!.syncedHash, hashBijMaterialisatie, 'syncedHash mag niet meebewegen');
  assert(cal.libraryOrigin!.syncedHash !== computeCalendarHash(cal), 'hash hoort af te wijken van de gewijzigde velden');
  assertEq(store.getState().onOpenStatusForCalendar(calendarId), 'deviated', 'gewijzigde kalenderinhoud is een afwijking');
  assertEq(store.getState().runOpenBoundary(), { refreshed: 0, deviated: 1, removed: 0 }, 'de grens telt precies één afwijking');
  assertEq(store.getState().calendars.find((c) => c.id === calendarId)!.hoursPerDay, 6, 'de grens draait de wijziging niet stil terug');
});

// =================================================================================================
// 7) Het batch-pad — eigen transactieroute, zelfde uitkomst
// =================================================================================================
test('planner_batch levert exact hetzelfde stempelgedrag als de directe route', async () => {
  const { resourceId, hashBijMaterialisatie } = setupResource();
  expectOk(await call('planner_batch', {
    steps: [{
      tool: 'planner_manage_resources',
      args: { actions: [{ action: 'update', id: resourceId, costPerHour: 120 }] },
    }],
  }), 'batch-wijziging');

  const res = resource(resourceId)!;
  assertEq(res.costPerHour, 120, 'de batch-wijziging hoort te landen');
  assert(!!res.libraryOrigin, 'stempel moet ook via het draaiboekpad blijven staan');
  assertEq(res.libraryOrigin!.syncedHash, hashBijMaterialisatie, 'ook het draaiboekpad mag de hash niet bijwerken');
  assertEq(store.getState().onOpenStatusForResource(resourceId), 'deviated', 'zelfde classificatie als de directe route');
  assertEq(store.getState().runOpenBoundary(), { refreshed: 0, deviated: 1, removed: 0 }, 'zelfde grens-uitkomst');
});

// =================================================================================================
// 8) De BEDOELDE route — bibliotheek wijzigen, niet het project
// =================================================================================================
test('de poolroute laat beide kanten meebewegen en blijft in-sync', () => {
  const { companyId, poolResId, resourceId } = setupResource();
  store.getState().updatePoolResource(companyId, poolResId, { costPerHour: 95 });

  const res = resource(resourceId)!;
  assertEq(res.costPerHour, 95, 'de projectkopie volgt de bibliotheek');
  assertEq(res.libraryOrigin!.syncedHash, computeResourceHash(res), 'hash beweegt hier WEL mee');
  assertEq(store.getState().onOpenStatusForResource(resourceId), 'in-sync', 'bibliotheek en project zijn het eens');
  // Let op: de dialoogvlag is APP-globaal en wordt door `newProject()` niet gewist (alleen
  // `newDocument()` doet dat) — vandaar dat we hem via de grens laten vestigen i.p.v. hem rauw te
  // lezen; `runOpenBoundary` zet de volledige vlagtoestand, inclusief het WISSEN.
  assertEq(store.getState().runOpenBoundary(), { refreshed: 0, deviated: 0, removed: 0 }, 'de grens ziet geen afwijking');
  assert(!store.getState().ui.showLibraryLinkDialog, 'geen afwijkingsvraag op de bedoelde route');
});

await run();
