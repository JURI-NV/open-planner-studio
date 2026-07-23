import type { WorkCalendar } from '@/types/calendar';
import type { Resource } from '@/types/resource';

/**
 * Herkomststempel op een PROJECTKOPIE van een bibliotheekitem (spec §2). Maakt
 * "bijwerken vanuit bibliotheek", duplicaatherkenning en (later, B1b) resource-identiteit over
 * projecten mogelijk. `libraryItemId` = het `id` van het bronitem IN de pool (de pool-identiteit).
 */
export interface LibraryOrigin {
  companyId: string;
  libraryItemId: string;
  poolVersion: number;
}

/** Een door de user benoemde groepering met een eigen pool (spec §2). */
export interface Company {
  id: string;
  name: string;
}

/**
 * De verzameling bibliotheekkalenders en -resources van één bedrijf (spec §2). `poolVersion` loopt
 * monotoon op bij elke wijziging; `modifiedAt` is de ISO-tijdstempel van de laatste wijziging. De
 * `id` van elke kalender/resource IN de pool is diens stabiele identiteit (het `libraryItemId` waar
 * herkomststempels naar wijzen).
 */
export interface CompanyPool {
  companyId: string;
  companyName: string;
  poolVersion: number;
  modifiedAt: string; // ISO 8601
  calendars: WorkCalendar[];
  resources: Resource[];
}

/** De volledige, app-globale bibliotheek: bedrijven + hun pools + welk bedrijf de default is. */
export interface CompanyLibrary {
  companies: Company[];
  defaultCompanyId: string;
  pools: Record<string, CompanyPool>; // key = companyId
}

/** Vaste id van het automatische standaardbedrijf (spec §2, "Mijn bedrijf"). */
export const DEFAULT_COMPANY_ID = 'company-default';

export function createDefaultCompany(): Company {
  return { id: DEFAULT_COMPANY_ID, name: 'Mijn bedrijf' };
}

export function createEmptyPool(company: Company): CompanyPool {
  return {
    companyId: company.id,
    companyName: company.name,
    poolVersion: 0,
    modifiedAt: new Date().toISOString(),
    calendars: [],
    resources: [],
  };
}

export function createDefaultLibrary(): CompanyLibrary {
  const company = createDefaultCompany();
  return {
    companies: [company],
    defaultCompanyId: company.id,
    pools: { [company.id]: createEmptyPool(company) },
  };
}
