import type { AppSlice } from './types';
import type { Company, CompanyPool, CompanyLibrary } from '@/types/library';
import { createDefaultLibrary, createEmptyPool, DEFAULT_COMPANY_ID } from '@/types/library';
import { generateId } from '@/utils/id';
import { loadLibrary, saveLibrary, bumpPool, makeOrigin } from '@/services/library';
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
  // óók structureel normaliseren: een vorm-invalide (bijv. handmatig bewerkte) maar bedrijf-gebonden
  // pool mag nooit later een TypeError geven op `.push` — `calendars`/`resources` gegarandeerd array,
  // `poolVersion` numeriek (anders 1), `modifiedAt` string (anders nu).
  const pools = Object.fromEntries(
    Object.entries(rawPools)
      .filter(([cid]) => companyIds.has(cid))
      .map(([cid, p]): [string, CompanyPool] => {
        const raw = (p ?? {}) as Partial<CompanyPool>;
        return [cid, {
          companyId: cid,
          companyName: typeof raw.companyName === 'string'
            ? raw.companyName
            : (companies.find((c) => c.id === cid)?.name ?? cid),
          poolVersion: typeof raw.poolVersion === 'number' ? raw.poolVersion : 1,
          modifiedAt: typeof raw.modifiedAt === 'string' ? raw.modifiedAt : new Date().toISOString(),
          calendars: raw.calendars ?? [],
          resources: raw.resources ?? [],
        }];
      }),
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
      // NIEUWE versie (off-by-one-val). Projectstate-idioom: dirty-zonder-undo (spiegel setCalendar).
      const src = s.calendars.find((c) => c.id === calendar.id);
      if (src) {
        src.libraryOrigin = makeOrigin(bumped, id);
        s.isDirty = true;
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
});
