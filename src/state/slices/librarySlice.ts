import type { AppSlice } from './types';
import type { Company, CompanyPool, CompanyLibrary } from '@/types/library';
import { createDefaultLibrary, createEmptyPool, DEFAULT_COMPANY_ID } from '@/types/library';
import { generateId } from '@/utils/id';
import { loadLibrary, saveLibrary } from '@/services/library';

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
}

/** Serialiseer de huidige bibliotheek-state en persisteer 'm (fire-and-forget). */
function persist(get: () => { companies: Company[]; defaultCompanyId: string; pools: Record<string, CompanyPool> }): void {
  const s = get();
  const lib: CompanyLibrary = { companies: s.companies, defaultCompanyId: s.defaultCompanyId, pools: s.pools };
  void saveLibrary(lib);
}

export const createLibrarySlice: AppSlice<LibrarySlice> = (set, get) => ({
  companies: createDefaultLibrary().companies,
  defaultCompanyId: DEFAULT_COMPANY_ID,
  pools: createDefaultLibrary().pools,
  libraryLoaded: false,

  initLibrary: async () => {
    const lib = await loadLibrary();
    set((s) => {
      s.companies = lib.companies.length > 0 ? lib.companies : createDefaultLibrary().companies;
      s.defaultCompanyId = lib.companies.some(c => c.id === lib.defaultCompanyId)
        ? lib.defaultCompanyId
        : s.companies[0].id;
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
});
