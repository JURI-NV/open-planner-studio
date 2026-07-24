import type { WorkCalendar } from '@/types/calendar';
import type { Resource } from '@/types/resource';
import type { CompanyPool, LibraryOrigin } from '@/types/library';

/** Nieuwe pool-versie na een wijziging: poolVersion+1 + verse modifiedAt. Puur (nieuw object). */
export function bumpPool(pool: CompanyPool): CompanyPool {
  return { ...pool, poolVersion: pool.poolVersion + 1, modifiedAt: new Date().toISOString() };
}

/** Parseer een ISO-tijdstempel naar epoch-ms voor vergelijking. Onparseerbaar/ontbrekend ⇒ 0
 *  (nooit NaN — NaN-vergelijkingen zijn altijd `false`, wat een stille misdetectie zou zijn). */
function parseTime(iso: string): number {
  const t = Date.parse(iso);
  return Number.isNaN(t) ? 0 : t;
}

/**
 * Demping-check (spec §4, bindend user-besluit): is de LOKALE pool nieuwer dan de te importeren
 * pool? Nieuwer ⇔ een hogere `poolVersion` ÓF een recentere `modifiedAt` — de twee signalen tellen
 * onafhankelijk mee (geen precedentie-ladder waarbij versie de tijd overstemt bij een verschil).
 * Tijd wordt vergeleken op echte epoch-tijd (`Date.parse`, fallback 0 bij onparseerbaar), niet als
 * string-lexicografie — dat sorteert offset-notaties (`-05:00` versus `Z`) soms verkeerd.
 * `undefined` lokaal (nog geen pool) ⇒ nooit nieuwer.
 */
export function isPoolNewer(local: CompanyPool | undefined, imported: CompanyPool): boolean {
  if (!local) return false;
  return local.poolVersion > imported.poolVersion || parseTime(local.modifiedAt) > parseTime(imported.modifiedAt);
}

/** Bouw een herkomststempel voor een projectkopie van een poolitem. `syncedHash` (spec §2) wordt
 *  meegeschreven bij materialisatie/verversing van een PROJECTkopie; pool-items zelf dragen geen
 *  stempel, dus daar blijft hij afwezig. */
export function makeOrigin(pool: CompanyPool, libraryItemId: string, syncedHash?: string): LibraryOrigin {
  return {
    companyId: pool.companyId,
    libraryItemId,
    poolVersion: pool.poolVersion,
    ...(syncedHash !== undefined ? { syncedHash } : {}),
  };
}

/** Zoek een bestaande projectkopie met dezelfde herkomst (dedup, spec §3). */
export function findCopyByOrigin<T extends { libraryOrigin?: LibraryOrigin }>(
  items: T[], companyId: string, libraryItemId: string,
): T | undefined {
  // A5-fix: guard tegen falsy sleutels. Zonder deze guard matcht een lege/ontbrekende `companyId`
  // of `libraryItemId` (uit een corrupt poolbestand) tegen een item zonder libraryOrigin via
  // `undefined === undefined` — een vals dedup-match dat een ander item stil zou "hergebruiken".
  if (!companyId || !libraryItemId) return undefined;
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
    libraryOrigin: makeOrigin(pool, poolCalendarId, computeCalendarHash(source)),
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
    libraryOrigin: makeOrigin(pool, poolResourceId, computeResourceHash(source)),
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
export const CALENDAR_DIFF_FIELDS: (keyof WorkCalendar)[] = [
  'name', 'description', 'workDays', 'workStartHour', 'workEndHour', 'hoursPerDay',
  'holidays', 'generation', 'workTime', 'shift',
];

export const RESOURCE_DIFF_FIELDS: (keyof Resource)[] = [
  'name', 'type', 'description', 'costPerHour', 'maxUnits', 'unitOfMeasure', 'availabilitySteps',
];

/** Stabiele vergelijkingssleutel voor een veldwaarde. A4-besluit: voor deze diff-velden is de
 *  array-VOLGORDE bewust NIET betekenisvol (bv. dezelfde feestdagen in een andere volgorde is
 *  géén wijziging) — vergelijk array-velden daarom als multiset door een KOPIE van de elementen
 *  te sorteren op `JSON.stringify(element)`. Muteert de invoer niet; niet-arrays gaan ongewijzigd
 *  door `JSON.stringify` heen. */
export function diffKey(value: unknown): string {
  if (Array.isArray(value)) {
    const sorted = value
      .map((el) => JSON.stringify(el))
      .sort();
    return JSON.stringify(sorted);
  }
  return JSON.stringify(value);
}

function diffFields<T>(project: T, library: T, fields: (keyof T)[]): DiffField[] {
  const out: DiffField[] = [];
  for (const f of fields) {
    const a = project[f];
    const b = library[f];
    if (diffKey(a) !== diffKey(b)) {
      out.push({ field: String(f), project: a, library: b });
    }
  }
  return out;
}

/** Hash van de gevolgde velden van een item, met EXACT dezelfde normalisatie als de diff
 *  (`diffKey` per veld → arrays als gesorteerde multiset). Twee items met dezelfde gevolgde
 *  velden — ongeacht array-volgorde — geven dezelfde hash; een verschil op één gevolgd veld
 *  verandert de hash. Deterministisch (JSON van de per-veld-diffKeys), geen externe crypto. */
function hashFields<T>(item: T, fields: (keyof T)[]): string {
  return JSON.stringify(fields.map((f) => diffKey(item[f])));
}

/** syncedHash van een pool-/projectkalender (spec §2, plan-eis 8). */
export function computeCalendarHash(cal: WorkCalendar): string {
  return hashFields(cal, CALENDAR_DIFF_FIELDS);
}

/** syncedHash van een pool-/projectresource (spec §2, plan-eis 8). */
export function computeResourceHash(res: Resource): string {
  return hashFields(res, RESOURCE_DIFF_FIELDS);
}

/** Normaliseer een naam voor de herkennings-matcher (spec §5.1): Unicode-NFC, trim, samengevouwen
 *  witruimte (elke witruimte-run → één spatie), hoofdletterongevoelig (`toLocaleLowerCase`). Puur. */
export function normalizeName(name: string): string {
  return name.normalize('NFC').trim().replace(/\s+/g, ' ').toLocaleLowerCase();
}

/** Zoek de UNIEKE kandidaat met dezelfde genormaliseerde naam (spec §5.1). Geen kandidaat óf
 *  meerdere kandidaten ⇒ `null` (geen voorstel — handmatige keuze). Geen fuzzy (spec §14). */
export function matchByName<T extends { name: string }>(name: string, candidates: T[]): T | null {
  const target = normalizeName(name);
  const hits = candidates.filter((c) => normalizeName(c.name) === target);
  return hits.length === 1 ? hits[0] : null;
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

/** Uitkomst van de openings-classificatie (spec §3, grens 1/4). */
export type OnOpenStatus =
  | 'in-sync'   // project == pool
  | 'behind'    // pool bewoog, bestand is NIET lokaal bewerkt (file == syncedHash) ⇒ stil verversen
  | 'deviated'  // bestand is ná de sync bewerkt (file != syncedHash) ⇒ vraag
  | 'removed';  // pool-origineel bestaat niet meer

function classifyOnOpen(diffStatus: ItemDiff['status'], fileHash: string, syncedHash: string | undefined): OnOpenStatus {
  if (diffStatus === 'removed') return 'removed';
  if (diffStatus === 'up-to-date') return 'in-sync';
  // diffStatus === 'changed'. Ontbrekende syncedHash (B1-bestand) ⇒ veilige kant: behandel als
  // extern bewerkt (spec §2/§12). Anders: file == syncedHash ⇒ niet-bewerkt ⇒ behind; ongelijk ⇒ deviated.
  if (syncedHash === undefined) return 'deviated';
  return fileHash === syncedHash ? 'behind' : 'deviated';
}

export function classifyCalendarOnOpen(projectCal: WorkCalendar, pool: CompanyPool): OnOpenStatus {
  return classifyOnOpen(diffCalendarVsPool(projectCal, pool).status, computeCalendarHash(projectCal), projectCal.libraryOrigin?.syncedHash);
}

export function classifyResourceOnOpen(projectRes: Resource, pool: CompanyPool): OnOpenStatus {
  return classifyOnOpen(diffResourceVsPool(projectRes, pool).status, computeResourceHash(projectRes), projectRes.libraryOrigin?.syncedHash);
}

/** Pas de pool-waarden toe op een projectkalender bij "bijwerken" (spec §3): overschrijf de
 *  vergeleken velden, behoud id + herkomst (met verse poolVersion). Puur (nieuw object). */
export function applyCalendarUpdate(projectCal: WorkCalendar, pool: CompanyPool): WorkCalendar {
  const id = projectCal.libraryOrigin?.libraryItemId;
  const source = id ? pool.calendars.find((c) => c.id === id) : undefined;
  // A3-fix: vangnet tegen stille corruptie. Ontbreekt het pool-origineel (of de herkomststempel),
  // dan zou `structuredClone(undefined)` een leeg object opleveren (`{...undefined}`) en de kalender
  // op alleen id+herkomst terugbrengen — alle inhoud weg. Gooi in plaats daarvan expliciet. De enige
  // caller guardt al op status==='changed' (bron bestaat), dus dit pad hoort onbereikbaar te zijn.
  if (!source) {
    throw new Error(`applyCalendarUpdate: pool-origineel niet gevonden voor kalender "${projectCal.name}" (id=${projectCal.id}, libraryItemId=${id ?? 'ontbreekt'})`);
  }
  const patched: WorkCalendar = { ...structuredClone(source), id: projectCal.id, libraryOrigin: makeOrigin(pool, id!, computeCalendarHash(source)) };
  return patched;
}

export function applyResourceUpdate(projectRes: Resource, pool: CompanyPool): Resource {
  const id = projectRes.libraryOrigin?.libraryItemId;
  const source = id ? pool.resources.find((r) => r.id === id) : undefined;
  // A3-fix: zelfde vangnet als applyCalendarUpdate — geen stille reductie tot id+herkomst.
  if (!source) {
    throw new Error(`applyResourceUpdate: pool-origineel niet gevonden voor resource "${projectRes.name}" (id=${projectRes.id}, libraryItemId=${id ?? 'ontbreekt'})`);
  }
  // Behoud id + de PROJECT-lokale calendarId (die verwijst naar de meegereisde projectkalender,
  // niet naar de pool-id) + herkomst met verse versie; overschrijf de inhoudelijke velden.
  const patched: Resource = {
    ...structuredClone(source),
    id: projectRes.id,
    calendarId: projectRes.calendarId,
    parentId: projectRes.parentId,
    libraryOrigin: makeOrigin(pool, id!, computeResourceHash(source)),
  };
  return patched;
}
