import type { AppSlice } from './types';
import type { Company, CompanyPool, CompanyLibrary } from '@/types/library';
import { createDefaultLibrary, createEmptyPool, DEFAULT_COMPANY_ID } from '@/types/library';
import { generateId } from '@/utils/id';
import { loadLibrary, saveLibrary } from '@/services/library';
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
  // Wezen-pools opruimen: pools waarvan companyId niet (meer) bij een bedrijf hoort.
  const pools = Object.fromEntries(Object.entries(rawPools).filter(([cid]) => companyIds.has(cid)));
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
});
