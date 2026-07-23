import { current } from 'immer';
import type { AppSlice } from './types';
import type { Company, CompanyPool, CompanyLibrary } from '@/types/library';
import { createDefaultLibrary, createEmptyPool, DEFAULT_COMPANY_ID } from '@/types/library';
import { generateId } from '@/utils/id';
import { loadLibrary, saveLibrary, bumpPool, makeOrigin, copyCalendarToProject, copyResourceToProject, diffCalendarVsPool, diffResourceVsPool, applyCalendarUpdate, applyResourceUpdate, writePoolIFC, isPoolNewer } from '@/services/library';
import { beginUndoable, finishMutation } from '../transaction';
import { syncProjectCalendar } from '../syncProjectCalendar';
import { appLog } from '@/services/debug/appLog';

/**
 * App-globale bedrijfsbibliotheek (spec B1). NIET per-document (niet in DOCUMENT_FIELDS) — pools zijn
 * bedrijfsdata, gedeeld over alle documenten, net als `installedExtensions`. Persistentie loopt
 * ná elke mutatie via `saveLibrary` (fire-and-forget; de store is de bron van waarheid in-memory).
 */
export interface LibrarySlice {
  companies: Company[];
  defaultCompanyId: string;
  pools: Record<string, CompanyPool>;
  /** True zodra `initLibrary()` de opgeslagen bibliotheek heeft geladen (voorkomt vroege save). */
  libraryLoaded: boolean;

  initLibrary: () => Promise<void>;
  addCompany: (name: string) => string;
  renameCompany: (id: string, name: string) => void;
  removeCompany: (id: string) => void;
  setDefaultCompany: (id: string) => void;
  /** Promoveer een projectkalender naar de pool van een bedrijf (spiegel van de bestaande
   *  calendar-`promote`; spec §3). Voegt een POOL-kopie toe met een verse pool-id en bumpt de pool.
   *  Retourneert de nieuwe pool-item-id, of `null` als het bedrijf (de pool) niet bestaat. Stempelt
   *  bovendien het BRON-projectitem (indien aanwezig) met de nieuwe herkomst, zodat "bijwerken vanuit
   *  bibliotheek" direct op het gepromoveerde item werkt. */
  promoteCalendarToPool: (companyId: string, calendar: import('@/types/calendar').WorkCalendar) => string | null;
  promoteResourceToPool: (companyId: string, resource: import('@/types/resource').Resource) => string | null;
  /** Bewerk pool-inhoud rechtstreeks (Backstage). Elke wijziging bumpt de pool. */
  updatePoolCalendar: (companyId: string, calendarId: string, updates: Partial<import('@/types/calendar').WorkCalendar>) => void;
  updatePoolResource: (companyId: string, resourceId: string, updates: Partial<import('@/types/resource').Resource>) => void;
  removePoolCalendar: (companyId: string, calendarId: string) => void;
  removePoolResource: (companyId: string, resourceId: string) => void;

  /** Bind het ACTIEVE project aan een bedrijf (spec §6). Zet project.companyId + companyName. */
  bindProjectToCompany: (companyId: string) => void;
  /**
   * Voeg een bibliotheek-kalender toe aan het ACTIEVE project (spec §3): kopieer met stempel, dedup
   * op herkomst. Retourneert `{ added, calendarId }` — `added: false` ⇒ item was er al ("al in project").
   */
  addLibraryCalendarToProject: (companyId: string, poolCalendarId: string) => { added: boolean; calendarId: string | null };
  /**
   * Voeg een bibliotheek-resource toe aan het ACTIEVE project (spec §3): kopieer met stempel, laat
   * de eigen kalender meereizen (met dedup), dedup op herkomst. Bindt het project aan het bedrijf als
   * het nog ongebonden was.
   */
  addLibraryResourceToProject: (companyId: string, poolResourceId: string) => { added: boolean; resourceId: string | null };

  /** Bereken de diff van een projectkalender t.o.v. zijn bibliotheekorigineel (spec §3). */
  diffProjectCalendar: (calendarId: string) => import('@/services/library').ItemDiff | null;
  diffProjectResource: (resourceId: string) => import('@/services/library').ItemDiff | null;
  /** Werk één projectkalender bij naar de bibliotheekwaarden (spec §3). No-op als geen herkomst/pool. */
  updateProjectCalendarFromLibrary: (calendarId: string) => void;
  updateProjectResourceFromLibrary: (resourceId: string) => void;

  /** Serialiseer de pool van een bedrijf naar een IFC-string (voor export/backup, spec §4). */
  exportPoolIFC: (companyId: string) => string | null;
  /** Vervang de HELE pool van een bedrijf door een geïmporteerde pool ná bevestiging (spec §4).
   *  De demping-waarschuwing zit in de UI (via `isPoolNewer`); deze actie vervangt onvoorwaardelijk. */
  replacePool: (companyId: string, pool: import('@/types/library').CompanyPool) => void;
  /** True als de lokale pool nieuwer is dan een te importeren pool (demping, spec §4). */
  isLocalPoolNewer: (companyId: string, imported: import('@/types/library').CompanyPool) => boolean;
}

/**
 * Normaliseer één pool defensief tegen vorm-invalide data (bijv. een handmatig bewerkt of door een
 * derde tool geproduceerd `OPS_Library`-bestand zonder `resources`/`calendars`). Nooit een TypeError
 * later op `.push`/`.find`: `calendars`/`resources` gegarandeerd array, `poolVersion` numeriek (anders
 * 1), `modifiedAt` string (anders nu), `companyName` een string (anders het bedrijf uit `companies`,
 * of anders `cid`). Puur — geschikt voor losse unit-tests, en herbruikt door zowel het laden van de
 * opgeslagen bibliotheek (`normalizeLoadedLibrary`) als het importeren van één pool (`replacePool`).
 */
export function normalizePool(cid: string, raw: Partial<CompanyPool> | null | undefined, companies: Company[]): CompanyPool {
  const p = raw ?? {};
  return {
    companyId: cid,
    companyName: typeof p.companyName === 'string'
      ? p.companyName
      : (companies.find((c) => c.id === cid)?.name ?? cid),
    // Fix B5: een geheel getal ≥1, anders 1 — vangt zowel niet-numerieke waarden (string/ontbrekend)
    // als een numerieke maar ongeldige waarde (float, 0, negatief) op. Vóór de fix accepteerde
    // `typeof p.poolVersion === 'number'` ELKE numerieke waarde inclusief NaN-achtige randgevallen,
    // floats en negatieve versies (bumpPool/isPoolNewer verwachten een oplopend geheel getal ≥1).
    poolVersion: (typeof p.poolVersion === 'number' && Number.isInteger(p.poolVersion))
      ? Math.max(1, p.poolVersion)
      : 1,
    modifiedAt: typeof p.modifiedAt === 'string' ? p.modifiedAt : new Date().toISOString(),
    // Fix B5: `Array.isArray` i.p.v. `??` — een object i.p.v. array (bijv. een hand-gemaakt of
    // door een derde tool geproduceerd OPS_Library-bestand met `calendars: {...}`) is niet-nullish,
    // dus `?? []` liet het ongewijzigd door; een latere `.push`/`.filter`/`.find` op zo'n object
    // crasht dan alsnog (bewezen fuzz-pool b6, jachtlijn 1 "calendars/resources zijn geen array").
    calendars: Array.isArray(p.calendars) ? p.calendars : [],
    resources: Array.isArray(p.resources) ? p.resources : [],
  };
}

/**
 * Normaliseer een geladen bibliotheek vóór gebruik (defensief tegen vorm-invalide opgeslagen data —
 * bijv. een handmatig bewerkt of ouder bestand). Nooit een TypeError: ontbrekende `companies`/`pools`
 * worden aangevuld (leeg ⇒ geseed met het standaardbedrijf), een `defaultCompanyId` die niet naar een
 * bestaand bedrijf wijst valt terug op het eerste bedrijf, en pools zonder bijbehorend bedrijf
 * (wezen) worden verwijderd. Puur — geen state, geschikt voor losse unit-tests.
 */
export function normalizeLoadedLibrary(lib: Partial<CompanyLibrary> | null | undefined): CompanyLibrary {
  const companies = lib?.companies && lib.companies.length > 0 ? lib.companies : createDefaultLibrary().companies;
  const companyIds = new Set(companies.map((c) => c.id));
  const rawPools = lib?.pools ?? {};
  // Wezen-pools opruimen: pools waarvan companyId niet (meer) bij een bedrijf hoort. Behouden pools
  // óók structureel normaliseren via `normalizePool` (zie daar).
  const pools = Object.fromEntries(
    Object.entries(rawPools)
      .filter(([cid]) => companyIds.has(cid))
      .map(([cid, p]): [string, CompanyPool] => [cid, normalizePool(cid, p, companies)]),
  );
  const defaultCompanyId = lib?.defaultCompanyId && companyIds.has(lib.defaultCompanyId)
    ? lib.defaultCompanyId
    : companies[0].id;
  return { companies, defaultCompanyId, pools };
}

/** Serialiseer de huidige bibliotheek-state en persisteer 'm (fire-and-forget, fouten gaan naar appLog). */
function persist(get: () => { companies: Company[]; defaultCompanyId: string; pools: Record<string, CompanyPool>; libraryLoaded: boolean }): void {
  // Vóór initLibrary() is de state nog de verse seed; wegschrijven zou die door de async load heen
  // laten overschrijven (of, erger, de echte opgeslagen bibliotheek voortijdig overschrijven).
  if (!get().libraryLoaded) return;
  const s = get();
  const lib: CompanyLibrary = { companies: s.companies, defaultCompanyId: s.defaultCompanyId, pools: s.pools };
  saveLibrary(lib).catch((err) => {
    appLog.emit('error', 'library', 'saveLibrary faalde', err);
  });
}

export const createLibrarySlice: AppSlice<LibrarySlice> = (set, get) => ({
  companies: createDefaultLibrary().companies,
  defaultCompanyId: DEFAULT_COMPANY_ID,
  pools: createDefaultLibrary().pools,
  libraryLoaded: false,

  initLibrary: async () => {
    const raw = await loadLibrary();
    const lib = normalizeLoadedLibrary(raw);
    set((s) => {
      s.companies = lib.companies;
      s.defaultCompanyId = lib.defaultCompanyId;
      s.pools = lib.pools;
      // Elk bedrijf moet een pool hebben (verse bedrijven / gemigreerde data).
      for (const c of s.companies) {
        if (!s.pools[c.id]) s.pools[c.id] = createEmptyPool(c);
      }
      s.libraryLoaded = true;
    });
  },

  addCompany: (name) => {
    const id = generateId('company');
    const company: Company = { id, name: name.trim() || 'Nieuw bedrijf' };
    set((s) => {
      s.companies.push(company);
      s.pools[id] = createEmptyPool(company);
    });
    persist(get);
    return id;
  },

  renameCompany: (id, name) => {
    set((s) => {
      const c = s.companies.find(c => c.id === id);
      if (!c) return;
      c.name = name.trim() || c.name;
      // Gedenormaliseerde companyName in de pool meelopen.
      if (s.pools[id]) s.pools[id].companyName = c.name;
    });
    persist(get);
  },

  removeCompany: (id) => {
    set((s) => {
      // Er moet altijd minstens één bedrijf blijven (spec §2). Laatste verwijderen ⇒ no-op.
      if (s.companies.length <= 1) return;
      s.companies = s.companies.filter(c => c.id !== id);
      delete s.pools[id];
      if (s.defaultCompanyId === id) s.defaultCompanyId = s.companies[0].id;
    });
    persist(get);
  },

  setDefaultCompany: (id) => {
    set((s) => {
      if (s.companies.some(c => c.id === id)) s.defaultCompanyId = id;
    });
    persist(get);
  },

  promoteCalendarToPool: (companyId, calendar) => {
    // Return-eerlijkheid (review taak 7): mint de pool-id pas als de pool echt bestaat; anders `null`
    // (geen id die nergens naar verwijst).
    let newId: string | null = null;
    set((s) => {
      const pool = s.pools[companyId];
      if (!pool) return;
      const id = generateId('cal');
      // Verse pool-identiteit; strip een eventuele bestaande herkomst (dit wordt zelf een origineel).
      const { libraryOrigin: _drop, ...rest } = calendar;
      pool.calendars.push({ ...structuredClone(rest), id });
      const bumped = bumpPool(pool);
      s.pools[companyId] = bumped;
      // Terug-stempel op het BRON-projectitem (indien aanwezig): eerst bumpen, dan stempelen met de
      // NIEUWE versie (off-by-one-val). Flag-only projectmutatie: isDirty zonder undo-snapshot.
      const src = s.calendars.find((c) => c.id === calendar.id);
      if (src) {
        src.libraryOrigin = makeOrigin(bumped, id);
        s.isDirty = true;
        // De gedenormaliseerde projectkalender-cache (`s.calendar`) moet de zojuist gestempelde
        // bibliotheek-entry weerspiegelen (§9.1); anders schrijft de writer (leest uit `s.calendar`)
        // de herkomst NIET weg als de PROJECTDEFAULT-kalender werd gepromoveerd → functieverlies bij
        // herladen (geen bijwerken, dedup stuk). Onvoorwaardelijk & goedkoop (spiegel updateCalendar).
        syncProjectCalendar(s);
      }
      newId = id;
    });
    persist(get);
    return newId;
  },

  promoteResourceToPool: (companyId, resource) => {
    let newId: string | null = null;
    set((s) => {
      const pool = s.pools[companyId];
      if (!pool) return;
      const id = generateId('res');
      const { libraryOrigin: _drop, parentId: _p, ...rest } = resource;
      // Een gepromoveerde resource verwijst niet naar een project-lokale kalender-id.
      pool.resources.push({ ...structuredClone(rest), id, calendarId: undefined });
      const bumped = bumpPool(pool);
      s.pools[companyId] = bumped;
      // Terug-stempel op het BRON-projectitem (indien aanwezig) met de zojuist gebumpte versie.
      const src = s.resources.find((r) => r.id === resource.id);
      if (src) {
        src.libraryOrigin = makeOrigin(bumped, id);
        s.isDirty = true;
      }
      newId = id;
    });
    persist(get);
    // Naamloze metadata-wijziging (herkomststempel) raakt geen histogram, wél eventueel de tabel.
    get().recomputeViewRows();
    return newId;
  },

  updatePoolCalendar: (companyId, calendarId, updates) => {
    set((s) => {
      const pool = s.pools[companyId];
      const idx = pool?.calendars.findIndex(c => c.id === calendarId) ?? -1;
      if (!pool || idx < 0) return;
      Object.assign(pool.calendars[idx], updates);
      s.pools[companyId] = bumpPool(pool);
    });
    persist(get);
  },

  updatePoolResource: (companyId, resourceId, updates) => {
    set((s) => {
      const pool = s.pools[companyId];
      const idx = pool?.resources.findIndex(r => r.id === resourceId) ?? -1;
      if (!pool || idx < 0) return;
      Object.assign(pool.resources[idx], updates);
      s.pools[companyId] = bumpPool(pool);
    });
    persist(get);
  },

  removePoolCalendar: (companyId, calendarId) => {
    set((s) => {
      const pool = s.pools[companyId];
      if (!pool) return;
      pool.calendars = pool.calendars.filter(c => c.id !== calendarId);
      s.pools[companyId] = bumpPool(pool);
    });
    persist(get);
  },

  removePoolResource: (companyId, resourceId) => {
    set((s) => {
      const pool = s.pools[companyId];
      if (!pool) return;
      pool.resources = pool.resources.filter(r => r.id !== resourceId);
      s.pools[companyId] = bumpPool(pool);
    });
    persist(get);
  },

  bindProjectToCompany: (companyId) => {
    set((s) => {
      const company = s.companies.find(c => c.id === companyId);
      if (!company) return;
      s.project.companyId = company.id;
      s.project.companyName = company.name;
      s.project.modifiedAt = new Date().toISOString();
      s.isDirty = true;
    });
  },

  addLibraryCalendarToProject: (companyId, poolCalendarId) => {
    let result: { added: boolean; calendarId: string | null } = { added: false, calendarId: null };
    set((s) => {
      const draftPool = s.pools[companyId];
      if (!draftPool) return;
      // De copy-helper doet `structuredClone` op de bron-pool-items; een Immer-draft-proxy is niet
      // kloonbaar (DataCloneError). `current()` levert een gewone snapshot van de (ongemuteerde) pool.
      const pool = current(draftPool);
      const copy = copyCalendarToProject(pool, poolCalendarId, s.calendars, generateId);
      if (!copy) return;
      if (copy.reused) {
        // Hergebruik = geen mutatie ⇒ vóór beginUndoable terugkeren, geen loze undo-stap.
        result = { added: false, calendarId: copy.calendar.id };
        return;
      }
      beginUndoable(s);
      s.calendars = [...s.calendars, copy.calendar];
      s.isDirty = true;
      result = { added: true, calendarId: copy.calendar.id };
      finishMutation(s);
      // Project binden aan dit bedrijf als het nog ongebonden was. Bewust NA finishMutation en buiten
      // de undo-semantiek (project snapshot:'none'): de binding blijft na undo staan (sticky), zie
      // critreview taak 8 / spiegelt addLibraryResourceToProject hieronder.
      if (!s.project.companyId) {
        const company = s.companies.find(c => c.id === companyId);
        if (company) { s.project.companyId = company.id; s.project.companyName = company.name; }
      }
    });
    // Pure kalender-mutatie → histogram verversen (spiegel resourceSlice.addCalendar:224-225).
    get().recomputeResourceLoad();
    return result;
  },

  addLibraryResourceToProject: (companyId, poolResourceId) => {
    let result: { added: boolean; resourceId: string | null } = { added: false, resourceId: null };
    set((s) => {
      const draftPool = s.pools[companyId];
      if (!draftPool) return;
      // Zie addLibraryCalendarToProject: snapshot de draft-pool voordat de copy-helper 'm kloont.
      const pool = current(draftPool);
      const copy = copyResourceToProject(pool, poolResourceId, s.resources, s.calendars, generateId);
      if (!copy) return;
      if (copy.reused) {
        // Hergebruik = geen mutatie ⇒ vóór beginUndoable terugkeren, geen loze undo-stap.
        // (Bij reused levert copyResourceToProject nooit een travelingCalendar, dus niets te doen.)
        result = { added: false, resourceId: copy.resource.id };
        return;
      }
      beginUndoable(s);
      // Meereizende kalender toevoegen als hij vers is (dedup gaf `reused: true` ⇒ al aanwezig).
      if (copy.travelingCalendar && !copy.travelingCalendar.reused) {
        s.calendars = [...s.calendars, copy.travelingCalendar.calendar];
      }
      s.resources = [...s.resources, copy.resource];
      result = { added: true, resourceId: copy.resource.id };
      finishMutation(s);
      // Project binden aan dit bedrijf als het nog ongebonden was. Bewust NA finishMutation en buiten
      // de undo-semantiek (project snapshot:'none'): de binding blijft na undo staan (sticky), zie
      // critreview taak 8. Flag-only projectmutatie (isDirty is al door finishMutation gezet).
      if (!s.project.companyId) {
        const company = s.companies.find(c => c.id === companyId);
        if (company) { s.project.companyId = company.id; s.project.companyName = company.name; }
      }
    });
    // Pure resource-mutatie → histogram + rijen verversen (spiegel resourceSlice.addResource:61-64).
    get().recomputeResourceLoad();
    get().recomputeViewRows();
    return result;
  },

  diffProjectCalendar: (calendarId) => {
    const s = get();
    const cal = s.calendars.find(c => c.id === calendarId);
    const companyId = cal?.libraryOrigin?.companyId;
    const pool = companyId ? s.pools[companyId] : undefined;
    if (!cal || !cal.libraryOrigin || !pool) return null;
    return diffCalendarVsPool(cal, pool);
  },

  diffProjectResource: (resourceId) => {
    const s = get();
    const res = s.resources.find(r => r.id === resourceId);
    const companyId = res?.libraryOrigin?.companyId;
    const pool = companyId ? s.pools[companyId] : undefined;
    if (!res || !res.libraryOrigin || !pool) return null;
    return diffResourceVsPool(res, pool);
  },

  updateProjectCalendarFromLibrary: (calendarId) => {
    set((s) => {
      const idx = s.calendars.findIndex(c => c.id === calendarId);
      const cal = idx >= 0 ? s.calendars[idx] : undefined;
      const companyId = cal?.libraryOrigin?.companyId;
      const draftPool = companyId ? s.pools[companyId] : undefined;
      if (!cal || !cal.libraryOrigin || !draftPool) return;
      // Draft-snapshots: applyCalendarUpdate doet structuredClone op de pool-bron; een Immer-draft-proxy
      // is niet kloonbaar (DataCloneError, zie de add-acties sinds 4a60a5f) → `current()`.
      const pool = current(draftPool);
      const snapCal = current(cal);
      // Alleen écht bijwerken als er iets te bijwerken VALT ('changed') — vóór beginUndoable, geen
      // loze undo-stap bij een no-op: dat geldt niet alleen voor 'removed' (origineel weg) maar ook
      // voor 'up-to-date' (project is al gelijk aan de pool; critreview taak 9).
      if (diffCalendarVsPool(snapCal, pool).status !== 'changed') return;
      beginUndoable(s);
      s.calendars[idx] = applyCalendarUpdate(snapCal, pool);
      syncProjectCalendar(s); // gedenormaliseerde projectkalender-cache in sync (E-2, §9.1).
      finishMutation(s, { stale: true }); // kalenderwijziging raakt datums.
    });
    get().recomputeResourceLoad();
  },

  updateProjectResourceFromLibrary: (resourceId) => {
    set((s) => {
      const idx = s.resources.findIndex(r => r.id === resourceId);
      const res = idx >= 0 ? s.resources[idx] : undefined;
      const companyId = res?.libraryOrigin?.companyId;
      const draftPool = companyId ? s.pools[companyId] : undefined;
      if (!res || !res.libraryOrigin || !draftPool) return;
      // Zie updateProjectCalendarFromLibrary: snapshot de draft vóór applyResourceUpdate 'm kloont.
      const pool = current(draftPool);
      const snapRes = current(res);
      // No-op vóór beginUndoable (E-3): alleen 'changed' rechtvaardigt een mutatie — 'removed'
      // (origineel weg) én 'up-to-date' (al gelijk) leveren beide geen undo-stap op (critreview taak 9).
      if (diffResourceVsPool(snapRes, pool).status !== 'changed') return;
      beginUndoable(s);
      s.resources[idx] = applyResourceUpdate(snapRes, pool);
      finishMutation(s);
    });
    get().recomputeResourceLoad();
    get().recomputeViewRows(); // resource-naam/toewijzing raakt kolom/groep/filter (E-2, §4.3).
  },

  exportPoolIFC: (companyId) => {
    const pool = get().pools[companyId];
    return pool ? writePoolIFC(pool) : null;
  },

  replacePool: (companyId, pool) => {
    set((s) => {
      if (!s.companies.some(c => c.id === companyId)) return;
      // De geïmporteerde pool krijgt het DOEL-companyId (import in een gekozen bedrijf, spec §4).
      // Eerst normaliseren (fix critreview taak 10): een vorm-invalide pool — bijv. een hand-gemaakt
      // of door een derde tool geproduceerd OPS_Library-bestand zonder resources/calendars — mag na
      // import nooit een TypeError geven op een latere `.push`/`.find` (promote, addLibrary*ToProject).
      const company = s.companies.find(c => c.id === companyId)!;
      const normalized = normalizePool(companyId, pool, s.companies);
      s.pools[companyId] = { ...normalized, companyName: company.name };
    });
    persist(get);
  },

  isLocalPoolNewer: (companyId, imported) => {
    return isPoolNewer(get().pools[companyId], imported);
  },
});
