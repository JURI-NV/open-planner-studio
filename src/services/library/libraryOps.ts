import type { WorkCalendar } from '@/types/calendar';
import type { Resource } from '@/types/resource';
import type { CompanyPool, LibraryOrigin } from '@/types/library';

/** Nieuwe pool-versie na een wijziging: poolVersion+1 + verse modifiedAt. Puur (nieuw object). */
export function bumpPool(pool: CompanyPool): CompanyPool {
  return { ...pool, poolVersion: pool.poolVersion + 1, modifiedAt: new Date().toISOString() };
}

/**
 * Demping-check (spec §4): is de LOKALE pool nieuwer dan de te importeren pool? Nieuwer =
 * hogere poolVersion, of bij gelijke versie een recentere modifiedAt. `undefined` lokaal (nog geen
 * pool) ⇒ nooit nieuwer.
 */
export function isPoolNewer(local: CompanyPool | undefined, imported: CompanyPool): boolean {
  if (!local) return false;
  if (local.poolVersion !== imported.poolVersion) return local.poolVersion > imported.poolVersion;
  return local.modifiedAt > imported.modifiedAt;
}

/** Bouw een herkomststempel voor een item uit een pool. */
export function makeOrigin(pool: CompanyPool, libraryItemId: string): LibraryOrigin {
  return { companyId: pool.companyId, libraryItemId, poolVersion: pool.poolVersion };
}

/** Zoek een bestaande projectkopie met dezelfde herkomst (dedup, spec §3). */
export function findCopyByOrigin<T extends { libraryOrigin?: LibraryOrigin }>(
  items: T[], companyId: string, libraryItemId: string,
): T | undefined {
  return items.find(
    (i) => i.libraryOrigin?.companyId === companyId && i.libraryOrigin?.libraryItemId === libraryItemId,
  );
}

export interface CalendarCopyResult {
  /** De (nieuwe of hergebruikte) projectkalender. */
  calendar: WorkCalendar;
  /** True ⇒ een bestaande kopie met dezelfde herkomst is hergebruikt (geen nieuwe toegevoegd). */
  reused: boolean;
}

/**
 * Kopieer een pool-kalender naar het project met stempel (spec §3). Bestaat er al een kopie met
 * dezelfde herkomst, dan wordt die hergebruikt (`reused: true`), nooit gedupliceerd. `genId` mint
 * een verse project-lokale id (injecteerbaar voor deterministische tests). `null` ⇒ de pool bevat
 * die kalender niet.
 */
export function copyCalendarToProject(
  pool: CompanyPool,
  poolCalendarId: string,
  existingCalendars: WorkCalendar[],
  genId: (prefix: string) => string,
): CalendarCopyResult | null {
  const source = pool.calendars.find((c) => c.id === poolCalendarId);
  if (!source) return null;
  const existing = findCopyByOrigin(existingCalendars, pool.companyId, poolCalendarId);
  if (existing) return { calendar: existing, reused: true };
  const calendar: WorkCalendar = {
    ...structuredClone(source),
    id: genId('cal'),
    libraryOrigin: makeOrigin(pool, poolCalendarId),
  };
  return { calendar, reused: false };
}

export interface ResourceCopyResult {
  resource: Resource;
  reused: boolean;
  /** Meereizende kalender (spec §3): de eigen `calendarId` van de resource bracht deze kalender mee.
   *  Afwezig ⇒ de resource had geen eigen kalender, of hij verwees niet naar een pool-kalender. */
  travelingCalendar?: CalendarCopyResult;
}

/**
 * Kopieer een pool-resource naar het project met stempel (spec §3). Afhankelijkheden reizen mee:
 * heeft de resource een eigen `calendarId` die in de pool bestaat, dan wordt die kalender
 * mee-gekopieerd (met dedup) en `resource.calendarId` naar de project-lokale kopie herschreven.
 * Dedup op de resource zelf: bestaat er al een projectkopie met dezelfde herkomst ⇒ hergebruik.
 */
export function copyResourceToProject(
  pool: CompanyPool,
  poolResourceId: string,
  existingResources: Resource[],
  existingCalendars: WorkCalendar[],
  genId: (prefix: string) => string,
): ResourceCopyResult | null {
  const source = pool.resources.find((r) => r.id === poolResourceId);
  if (!source) return null;
  const existing = findCopyByOrigin(existingResources, pool.companyId, poolResourceId);
  if (existing) return { resource: existing, reused: true };

  let travelingCalendar: CalendarCopyResult | undefined;
  let calendarId = source.calendarId;
  if (source.calendarId && pool.calendars.some((c) => c.id === source.calendarId)) {
    travelingCalendar = copyCalendarToProject(pool, source.calendarId, existingCalendars, genId) ?? undefined;
    calendarId = travelingCalendar?.calendar.id;
  } else {
    // De resource verwees niet naar een pool-kalender (bv. projectkalender): geen meereizende kopie.
    calendarId = undefined;
  }

  const resource: Resource = {
    ...structuredClone(source),
    id: genId('res'),
    calendarId,
    libraryOrigin: makeOrigin(pool, poolResourceId),
    // parentId (ploeg-lidmaatschap) is een pool-lokale verwijzing; bij een losse kopie laten we hem
    // vallen (het project heeft de ploeg niet noodzakelijk). Zo ontstaat nooit een dode verwijzing.
    parentId: undefined,
  };
  return { resource, reused: false, travelingCalendar };
}

/** Uitkomst van een diff tussen een projectkopie en zijn pool-origineel (spec §3). */
export type ItemDiff =
  | { status: 'removed' } // origineel bestaat niet meer in de bibliotheek
  | { status: 'up-to-date' }
  | { status: 'changed'; fields: DiffField[] };

export interface DiffField {
  field: string;
  project: unknown;
  library: unknown;
}

/** Velden die we vergelijken bij een kalender-diff (herkomst/id/naam-identiteit tellen niet mee). */
const CALENDAR_DIFF_FIELDS: (keyof WorkCalendar)[] = [
  'name', 'description', 'workDays', 'workStartHour', 'workEndHour', 'hoursPerDay',
  'holidays', 'generation', 'workTime', 'shift',
];

const RESOURCE_DIFF_FIELDS: (keyof Resource)[] = [
  'name', 'type', 'description', 'costPerHour', 'maxUnits', 'unitOfMeasure', 'availabilitySteps',
];

function diffFields<T>(project: T, library: T, fields: (keyof T)[]): DiffField[] {
  const out: DiffField[] = [];
  for (const f of fields) {
    const a = project[f];
    const b = library[f];
    if (JSON.stringify(a) !== JSON.stringify(b)) {
      out.push({ field: String(f), project: a, library: b });
    }
  }
  return out;
}

export function diffCalendarVsPool(projectCal: WorkCalendar, pool: CompanyPool): ItemDiff {
  const id = projectCal.libraryOrigin?.libraryItemId;
  const source = id ? pool.calendars.find((c) => c.id === id) : undefined;
  if (!source) return { status: 'removed' };
  const fields = diffFields(projectCal, source, CALENDAR_DIFF_FIELDS);
  return fields.length === 0 ? { status: 'up-to-date' } : { status: 'changed', fields };
}

export function diffResourceVsPool(projectRes: Resource, pool: CompanyPool): ItemDiff {
  const id = projectRes.libraryOrigin?.libraryItemId;
  const source = id ? pool.resources.find((r) => r.id === id) : undefined;
  if (!source) return { status: 'removed' };
  const fields = diffFields(projectRes, source, RESOURCE_DIFF_FIELDS);
  return fields.length === 0 ? { status: 'up-to-date' } : { status: 'changed', fields };
}

/** Pas de pool-waarden toe op een projectkalender bij "bijwerken" (spec §3): overschrijf de
 *  vergeleken velden, behoud id + herkomst (met verse poolVersion). Puur (nieuw object). */
export function applyCalendarUpdate(projectCal: WorkCalendar, pool: CompanyPool): WorkCalendar {
  const id = projectCal.libraryOrigin!.libraryItemId;
  const source = pool.calendars.find((c) => c.id === id)!;
  const patched: WorkCalendar = { ...structuredClone(source), id: projectCal.id, libraryOrigin: makeOrigin(pool, id) };
  return patched;
}

export function applyResourceUpdate(projectRes: Resource, pool: CompanyPool): Resource {
  const id = projectRes.libraryOrigin!.libraryItemId;
  const source = pool.resources.find((r) => r.id === id)!;
  // Behoud id + de PROJECT-lokale calendarId (die verwijst naar de meegereisde projectkalender,
  // niet naar de pool-id) + herkomst met verse versie; overschrijf de inhoudelijke velden.
  const patched: Resource = {
    ...structuredClone(source),
    id: projectRes.id,
    calendarId: projectRes.calendarId,
    parentId: projectRes.parentId,
    libraryOrigin: makeOrigin(pool, id),
  };
  return patched;
}
