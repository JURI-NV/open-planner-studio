import { current } from 'immer';
import type { AppSlice } from './types';
import type { Company, CompanyPool, CompanyLibrary } from '@/types/library';
import { createDefaultLibrary, createEmptyPool, DEFAULT_COMPANY_ID } from '@/types/library';
import { generateId } from '@/utils/id';
import { loadLibrary, saveLibrary, bumpPool, makeOrigin, copyCalendarToProject, copyResourceToProject, diffCalendarVsPool, diffResourceVsPool, applyCalendarUpdate, applyResourceUpdate, writePoolIFC, isPoolNewer, computeCalendarHash, computeResourceHash, classifyCalendarOnOpen, classifyResourceOnOpen, matchByName, CALENDAR_DIFF_FIELDS as CALENDAR_DIFF_FIELDS_LOCAL, RESOURCE_DIFF_FIELDS as RESOURCE_DIFF_FIELDS_LOCAL } from '@/services/library';
import { beginUndoable, finishMutation } from '../transaction';
import { syncProjectCalendar } from '../syncProjectCalendar';
import { appLog } from '@/services/debug/appLog';

export interface RecognitionCandidate {
  kind: 'resource' | 'calendar';
  projectId: string;
  projectName: string;
  /** De unieke naam-match uit de pool, of null (geen/meerdere kandidaten ⇒ handmatige keuze). */
  suggestedPoolId: string | null;
  suggestedPoolName: string | null;
}
export interface RecognitionLink {
  kind: 'resource' | 'calendar';
  projectId: string;
  poolId: string;
}

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
  /** Verwijder een bedrijf (spec §5). Er blijft altijd ≥1 bedrijf (spec §2, no-op op het laatste).
   *  Ontkoppelt expliciet elk GEOPEND document (actief én slapend) dat aan dit bedrijf gekoppeld
   *  was: companyId/companyName gewist, alle herkomststempels van dit bedrijf gestript. Opgeslagen
   *  (niet-geopende) bestanden zijn hier niet bij betrokken — die gedragen zich bij later openen als
   *  ontvangen bestanden (los; §2-scope). Zie `countDocumentsLinkedTo` voor de verwijder-bevestiging. */
  removeCompany: (id: string) => void;
  /** Aantal GEOPENDE documenten (actief + slapend) gekoppeld aan dit bedrijf — voor de
   *  verwijder-bevestiging (spec §5). */
  countDocumentsLinkedTo: (companyId: string) => number;
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
  /** Bedrijfsweergave-CRUD: maak een NIEUW poolitem direct in het bedrijf (spec §4). Raakt
   *  UITSLUITEND s.pools (invariant, plan-eis 3); bumpt de pool. Retourneert de nieuwe pool-id. */
  addPoolResource: (companyId: string, resource: Omit<import('@/types/resource').Resource, 'id'>) => string | null;
  addPoolCalendar: (companyId: string, calendar: Omit<import('@/types/calendar').WorkCalendar, 'id'>) => string | null;

  /** Bind het ACTIEVE project aan een bedrijf (spec §6). Zet project.companyId + companyName; bij
   *  OMkoppelen (ander bedrijf) worden vreemde stempels van het VORIGE bedrijf gestript (spec §5),
   *  zodat de herkenningsstap schoon herbegint. De strip-tak is undoable (GO-NA-fix 1, critreview
   *  5b81aea); een eerste bind of een herbind naar hetzelfde bedrijf strip niets en pusht geen
   *  undo-snapshot. */
  bindProjectToCompany: (companyId: string) => void;
  /** Kandidaten voor de herkenningsstap (spec §5): elk NIET-gestempeld projectitem (resource/
   *  kalender) met de unieke naam-match uit de eigen-bedrijf-pool (of null als er geen/meerdere zijn). */
  computeRecognition: () => RecognitionCandidate[];
  /** Atomisch linken (plan-eis 5): stempel de gekozen projectitems, zet syncedHash, en ververs ze
   *  naar de poolwaarden — alles in één set(). Undoable (GO-NA-fix 1, critreview 5b81aea): een
   *  verdwenen kandidaat (poolId niet meer in de pool) wordt stil overgeslagen (GO-NA-fix 3), de rest
   *  gaat door; zonder toepasbare link geen undo-snapshot. */
  linkRecognizedItems: (links: RecognitionLink[]) => void;
  /** Ontkoppel het actieve project (spec §5): wis companyId/companyName en STRIP alle stempels —
   *  een los project heeft geen herkomst en ververst nergens vandaan. Undoable (GO-NA-fix 1); no-op
   *  (geen undo-snapshot) op een al-los project. */
  unbindProject: () => void;
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

  /** Verversingsprimitief (spec §3, plan-eis 2): werk UITSLUITEND 'behind'-items van het ACTIEVE
   *  document bij naar de poolwaarden van het gegeven bedrijf (scope §2). 'behind' = file == syncedHash
   *  én pool wijkt af; een 'deviated' (lokaal bewerkt) item blijft ongemoeid (spec §3). Niet-undoable:
   *  geen undo-snapshot, geen isDirty, WIST de redoStack; raakte het een kalender, dan zet het
   *  `scheduleStale` (geen runCPM). Retourneert het aantal gewijzigde items. */
  refreshBehindItems: (companyId: string) => number;

  /** Grens 3/4 (spec §3, plan-eis 1): ververs uitsluitend 'behind'-items van het gegeven bedrijf, in
   *  het ACTIEVE document én in elke SLAPENDE document-payload, binnen één set(). 'deviated'-items
   *  blijven ongemoeid (spec §3). Slapende documenten herrekenen pas bij activering (geen recompute
   *  hier); raakte de verversing een kalender, dan zet het `scheduleStale` (per document/payload),
   *  ZONDER isDirty. Niet-undoable (wist redoStacks). Retourneert het totaal aantal gewijzigde items. */
  refreshAllDocumentsFromPool: (companyId: string) => number;

  /** Grens 1/4 (spec §3): ná volledige hydratatie van het actieve document — ververs 'behind'-items
   *  stil, en open bij ≥1 'deviated'-item het koppel-/afwijkingenscherm. Retourneert de tellingen
   *  (voor het discrete signaal + tests). Plan-eis 4: roep dit ná de hydratatie aan, nooit ertijdens. */
  runOpenBoundary: () => { refreshed: number; deviated: number; removed: number };

  /** Openings-status van één projectitem t.o.v. zijn eigen-bedrijf-pool (spec §2-scope): drijft de
   *  markeringen in de Projectweergave ("wijkt af — beslis" / "niet meer in het bedrijf"). Geen
   *  eigen-bedrijf-stempel of bedrijf lokaal onbekend ⇒ null (geen markering; los-gedrag). */
  onOpenStatusForResource: (resourceId: string) => import('@/services/library').OnOpenStatus | null;
  onOpenStatusForCalendar: (calendarId: string) => import('@/services/library').OnOpenStatus | null;

  /** Los één afwijking op (spec §3, koppel-/afwijkingenscherm). 'company' = neem de poolwaarde over
   *  (ververs het item, niet-undoable, wist redoStack, geen isDirty). 'file' = neem de BESTANDSwaarde
   *  over in het bedrijf: werk het poolitem bij (bumpt de pool — "geldt voor al je projecten") en
   *  ververs de siblings; het net-geopende item krijgt de verse syncedHash zonder dubbele verversing
   *  (plan-eis 4). */
  resolveDeviation: (ref: { kind: 'resource' | 'calendar'; projectId: string }, choice: 'company' | 'file') => void;
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
    // Bevinding 4 (eindreview): als het verwijderde bedrijf het bedrijf van het ACTIEVE project was,
    // hoort bij de ontkoppeling ook het afwijkingenscherm/-signaal te resetten (patroon
    // runOpenBoundary/newDocument/closeDocument hierboven) — anders blijft een stale dialoog/melding
    // van het net-verwijderde bedrijf staan. Vastleggen vóór de mutatie: de "laatste bedrijf blijft"
    // no-op-tak hieronder mag deze reset niet triggeren als er niets daadwerkelijk verwijderd is.
    const wasActiveCompany = get().companies.length > 1 && get().project.companyId === id;
    set((s) => {
      // Er moet altijd minstens één bedrijf blijven (spec §2). Laatste verwijderen ⇒ no-op.
      if (s.companies.length <= 1) return;
      s.companies = s.companies.filter(c => c.id !== id);
      delete s.pools[id];
      if (s.defaultCompanyId === id) s.defaultCompanyId = s.companies[0].id;
      // Spec §5: ontkoppel gekoppelde OPEN documenten expliciet (stempels strippen). Opgeslagen
      // bestanden gedragen zich bij later openen als ontvangen bestanden (los; §2-scope).
      if (s.project.companyId === id) {
        s.project.companyId = undefined;
        s.project.companyName = undefined;
        s.resources = s.resources.map((r) => r.libraryOrigin?.companyId === id ? (() => { const { libraryOrigin: _d, ...rest } = r; return rest; })() : r);
        s.calendars = s.calendars.map((c) => c.libraryOrigin?.companyId === id ? (() => { const { libraryOrigin: _d, ...rest } = c; return rest; })() : c);
        s.calendar = s.calendars.find((c) => c.id === s.project.calendarId) ?? s.calendar;
      }
      for (const d of s.documents) {
        if (!d.payload) continue;
        // Lokale const ná de null-guard: zie de identieke toelichting bij refreshAllDocumentsFromPool
        // (TS narrowt `d.payload` niet door de `.find()`-callback hieronder heen).
        const payload = d.payload;
        if (payload.project.companyId !== id) continue;
        payload.project = { ...payload.project, companyId: undefined, companyName: undefined };
        payload.resources = payload.resources.map((r) => r.libraryOrigin?.companyId === id ? (() => { const { libraryOrigin: _d, ...rest } = r; return rest; })() : r);
        payload.calendars = payload.calendars.map((c) => c.libraryOrigin?.companyId === id ? (() => { const { libraryOrigin: _d, ...rest } = c; return rest; })() : c);
        // F1 (vloot-fixpakket, issue #19): de gedenormaliseerde projectkalender-cache van een SLAPENDE
        // payload moet de zojuist gestripte `calendars`-lijst meelopen — anders draagt de cache
        // (waar de auto-save/writer uitsluitend uit leest, zonder hydrate) nog het herkomststempel
        // van het net-verwijderde bedrijf. Spiegelt de actieve-document-tak hierboven.
        payload.calendar = payload.calendars.find((c) => c.id === payload.project.calendarId) ?? payload.calendar;
      }
    });
    persist(get);
    if (wasActiveCompany) {
      get().setUI({ showLibraryLinkDialog: false, libraryRefreshNotice: null });
    }
  },

  countDocumentsLinkedTo: (companyId) => {
    const s = get();
    let n = s.project.companyId === companyId ? 1 : 0;
    for (const d of s.documents) if (d.payload && d.payload.project.companyId === companyId) n++;
    return n;
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
      // NIEUWE versie (off-by-one-val).
      const src = s.calendars.find((c) => c.id === calendar.id);
      if (src) {
        // Fix B4: de PROJECTSTEMPEL-mutatie is undo-BESCHERMD (de pool-mutatie hierboven blijft
        // bewust app-globaal/niet-undoable — pools zijn geen projectdata). Zonder dit veegt een
        // latere, volledig ongerelateerde undo de stempel stilzwijgend weg, want de stempel-mutatie
        // stond op geen enkele undo-snapshot (bewezen B7 stress-undo-redo, scenario A1/A2): undo van
        // C2 verwijderde óók de eerder aangebrachte stempel op C1. `beginUndoable` legt de staat
        // VÓÓR de stempel vast, zodat een undo van DEZE actie de stempel weer verwijdert (poolkopie
        // blijft staan — bewust, zie docs/library.md "Bekende kleine punten"), maar een LATERE
        // ongerelateerde undo 'm niet meer kan meesleuren.
        beginUndoable(s);
        // GO-NA-FIX 3 (critreview 9f9f0aa): een net-gepromoveerd item is byte-identiek aan zijn
        // poolitem — de back-stamp krijgt daarom meteen de hash VAN DAT POOLITEM mee, anders
        // classificeert het projectitem in latere taken als 'deviated' (spurieuze afwijkingsvraag).
        const poolCal = bumped.calendars.find((c) => c.id === id)!;
        src.libraryOrigin = makeOrigin(bumped, id, computeCalendarHash(poolCal));
        // De gedenormaliseerde projectkalender-cache (`s.calendar`) moet de zojuist gestempelde
        // bibliotheek-entry weerspiegelen (§9.1); anders schrijft de writer (leest uit `s.calendar`)
        // de herkomst NIET weg als de PROJECTDEFAULT-kalender werd gepromoveerd → functieverlies bij
        // herladen (geen bijwerken, dedup stuk). Onvoorwaardelijk & goedkoop (spiegel updateCalendar).
        syncProjectCalendar(s);
        finishMutation(s);
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
        // Fix B4: undo-beschermde projectstempel-mutatie — zie de uitgebreide toelichting bij
        // promoteCalendarToPool hierboven (identiek patroon, resource-variant).
        beginUndoable(s);
        // GO-NA-FIX 3 (critreview 9f9f0aa): zelfde toelichting als promoteCalendarToPool hierboven.
        const poolRes = bumped.resources.find((r) => r.id === id)!;
        src.libraryOrigin = makeOrigin(bumped, id, computeResourceHash(poolRes));
        finishMutation(s);
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
    get().refreshAllDocumentsFromPool(companyId);
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
    get().refreshAllDocumentsFromPool(companyId);
  },

  removePoolCalendar: (companyId, calendarId) => {
    set((s) => {
      const pool = s.pools[companyId];
      if (!pool) return;
      pool.calendars = pool.calendars.filter(c => c.id !== calendarId);
      s.pools[companyId] = bumpPool(pool);
    });
    persist(get);
    get().refreshAllDocumentsFromPool(companyId);
  },

  removePoolResource: (companyId, resourceId) => {
    set((s) => {
      const pool = s.pools[companyId];
      if (!pool) return;
      pool.resources = pool.resources.filter(r => r.id !== resourceId);
      s.pools[companyId] = bumpPool(pool);
    });
    persist(get);
    get().refreshAllDocumentsFromPool(companyId);
  },

  addPoolResource: (companyId, resource) => {
    let newId: string | null = null;
    set((s) => {
      const pool = s.pools[companyId];
      if (!pool) return;
      const id = generateId('res');
      const { libraryOrigin: _o, parentId: _p, calendarId: _c, ...rest } = resource as import('@/types/resource').Resource;
      pool.resources.push({ ...structuredClone(rest), id });
      s.pools[companyId] = bumpPool(pool);
      newId = id;
    });
    persist(get);
    return newId;
  },
  addPoolCalendar: (companyId, calendar) => {
    let newId: string | null = null;
    set((s) => {
      const pool = s.pools[companyId];
      if (!pool) return;
      const id = generateId('cal');
      const { libraryOrigin: _o, ...rest } = calendar as import('@/types/calendar').WorkCalendar;
      pool.calendars.push({ ...structuredClone(rest), id });
      s.pools[companyId] = bumpPool(pool);
      newId = id;
    });
    persist(get);
    return newId;
  },

  bindProjectToCompany: (companyId) => {
    set((s) => {
      const company = s.companies.find(c => c.id === companyId);
      if (!company) return;
      const previous = s.project.companyId;
      // Omkoppelen (spec §5, GO-NA-fix 1): alleen de strip-tak is een gebruikersgebaar dat undo-bare
      // dataverlies veroorzaakt (stempels verdwijnen) — die krijgt een undo-snapshot. Een pure
      // (her)bind naar hetzelfde bedrijf (of de EERSTE bind vanuit ongebonden) strip niets en mag dus
      // GEEN loze undo-stap opleveren.
      const isRebind = !!previous && previous !== companyId;
      if (isRebind) beginUndoable(s);
      s.project.companyId = company.id;
      s.project.companyName = company.name;
      s.project.modifiedAt = new Date().toISOString();
      // Omkoppelen (spec §5): stempels van het VORIGE bedrijf zijn nu vreemd — strip ze zodat de
      // herkenningsstap schoon herbegint. Matches worden daarna opnieuw voorgesteld/gelinkt.
      if (isRebind) {
        s.resources = s.resources.map((r) => r.libraryOrigin?.companyId === previous ? (() => { const { libraryOrigin: _d, ...rest } = r; return rest; })() : r);
        s.calendars = s.calendars.map((c) => c.libraryOrigin?.companyId === previous ? (() => { const { libraryOrigin: _d, ...rest } = c; return rest; })() : c);
        s.calendar = s.calendars.find((c) => c.id === s.project.calendarId) ?? s.calendar;
      }
      // isDirty blijft onvoorwaardelijk (élke bind is een wijziging); scheduleStale blijft ongemoeid
      // (strippen van een stempel raakt geen kalenderWAARDEN, dus geen datumimpact).
      finishMutation(s);
    });
  },

  addLibraryCalendarToProject: (companyId, poolCalendarId) => {
    // Plan-eis 9: materialiseren gebeurt UITSLUITEND op een project dat al aan dit bedrijf gekoppeld
    // is. Het oude sticky-autobind ("bind een ongebonden project stil") bestaat niet meer — de UI
    // (Bedrijfsweergave) toont materialiseren alleen voor een gekoppeld project. Anders: no-op + warn.
    if (get().project.companyId !== companyId) {
      appLog.emit('warn', 'library', `materialisatie genegeerd: actief project niet aan bedrijf ${companyId} gekoppeld (project=${get().project.companyId ?? 'geen'})`);
      return { added: false, calendarId: null };
    }
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
    });
    // Pure kalender-mutatie → histogram verversen (spiegel resourceSlice.addCalendar:224-225).
    get().recomputeResourceLoad();
    return result;
  },

  addLibraryResourceToProject: (companyId, poolResourceId) => {
    // Plan-eis 9: materialiseren gebeurt UITSLUITEND op een project dat al aan dit bedrijf gekoppeld
    // is. Het oude sticky-autobind ("bind een ongebonden project stil") bestaat niet meer — de UI
    // (Bedrijfsweergave) toont materialiseren alleen voor een gekoppeld project. Anders: no-op + warn.
    if (get().project.companyId !== companyId) {
      appLog.emit('warn', 'library', `materialisatie genegeerd: actief project niet aan bedrijf ${companyId} gekoppeld (project=${get().project.companyId ?? 'geen'})`);
      return { added: false, resourceId: null };
    }
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
    // Bewust GEEN refreshAllDocumentsFromPool hier — pool-import volgt het grens-1-gedrag mét
    // afwijkingsvraag (taak 13).
  },

  isLocalPoolNewer: (companyId, imported) => {
    return isPoolNewer(get().pools[companyId], imported);
  },

  refreshBehindItems: (companyId) => {
    let changed = 0;
    set((s) => {
      // §2-scope: alleen het eigen-bedrijf van het actieve document, en alleen als het lokaal bestaat.
      if (s.project.companyId !== companyId || !s.companies.some((c) => c.id === companyId)) return;
      const draftPool = s.pools[companyId];
      if (!draftPool) return;
      const pool = current(draftPool);

      // Review-fix (cleanup 2): map naar lokale variabelen + eigen tellers per array, en pas
      // TOEWIJZEN als er in die array daadwerkelijk iets ververst is. Een onvoorwaardelijke
      // `s.x = s.x.map(...)` (ook bij 0 treffers) geeft referentie-selectors anders een spurieuze
      // wijziging, zelfs wanneer er niets te verversen viel.
      let calChanged = 0;
      const newCalendars = s.calendars.map((cal) => {
        if (cal.libraryOrigin?.companyId !== companyId) return cal;
        if (classifyCalendarOnOpen(current(cal), pool) !== 'behind') return cal; // deviated/removed/in-sync ⇒ ongemoeid
        calChanged++;
        return applyCalendarUpdate(current(cal), pool);
      });
      if (calChanged > 0) s.calendars = newCalendars;

      let resChanged = 0;
      const newResources = s.resources.map((res) => {
        if (res.libraryOrigin?.companyId !== companyId) return res;
        if (classifyResourceOnOpen(current(res), pool) !== 'behind') return res;
        resChanged++;
        return applyResourceUpdate(current(res), pool);
      });
      if (resChanged > 0) s.resources = newResources;

      changed = calChanged + resChanged;
      if (changed > 0) {
        // Plan-eis 2: niet-undoable — GEEN beginUndoable, GEEN isDirty. Wél de redoStack wissen zodat
        // "opnieuw" niet stilletjes oude poolwaarden terugzet (spec §3, Ctrl+Z-eigenaardigheid).
        s.redoStack = [];
        // Review-fix (cleanup 3): bewust GEEN syncProjectCalendar(s) hier — die helper promoveert bij een
        // ontbrekende s.project.calendarId-match de huidige s.calendar-cache tot een NIEUWE
        // bibliotheek-entry (orphan-fallback, §9.1); in deze niet-undoable context willen we die
        // side-effect niet riskeren, dus herpunten we de denorm-cache handmatig en laten 'm ongewijzigd
        // als de projectkalender hier niet bij zat.
        s.calendar = s.calendars.find((c) => c.id === s.project.calendarId) ?? s.calendar;
        // Review-fix (spec §3): kalenderverversing raakt datums ⇒ scheduleStale (geen isDirty, geen runCPM).
        if (calChanged > 0) s.scheduleStale = true;
      }
    });
    if (changed > 0) {
      get().recomputeResourceLoad();
      get().recomputeViewRows();
    }
    return changed;
  },

  refreshAllDocumentsFromPool: (companyId) => {
    let changed = 0;
    set((s) => {
      if (!s.companies.some((c) => c.id === companyId)) return;
      const draftPool = s.pools[companyId];
      if (!draftPool) return;
      const pool = current(draftPool);

      // Behind-only (review-fix): alleen items waarvan het BESTAND ongewijzigd is (file == syncedHash)
      // maar de pool wijkt af. 'deviated' blijft staan. Review-fix (critreview 71762fd, GO-NA 2/3):
      // per-BESTEMMING tellers (niet gedeeld tussen het actieve document en elke slapende payload) —
      // zo wijzen we `s.calendars`/`s.resources`/`doc.payload.*` alleen opnieuw toe, wissen we de
      // redoStack en zetten we scheduleStale alleen als er in DIE ENE bestemming ook echt iets
      // ververst is. Geen identiteitschurn bij nul treffers, geen te-brede redo-wis over slapende
      // documenten die deze pool-edit niet raakten.
      const refreshCalendars = (
        cals: import('@/types/calendar').WorkCalendar[],
      ): { items: import('@/types/calendar').WorkCalendar[]; calChanged: number } => {
        let calChanged = 0;
        const items = cals.map((cal) => {
          if (cal.libraryOrigin?.companyId !== companyId) return cal;
          if (classifyCalendarOnOpen(cal, pool) !== 'behind') return cal;
          calChanged++;
          return applyCalendarUpdate(cal, pool);
        });
        return { items, calChanged };
      };
      const refreshResources = (
        ress: import('@/types/resource').Resource[],
      ): { items: import('@/types/resource').Resource[]; resChanged: number } => {
        let resChanged = 0;
        const items = ress.map((res) => {
          if (res.libraryOrigin?.companyId !== companyId) return res;
          if (classifyResourceOnOpen(res, pool) !== 'behind') return res;
          resChanged++;
          return applyResourceUpdate(res, pool);
        });
        return { items, resChanged };
      };

      // Actief document (top-level) — alleen als het aan dit bedrijf gekoppeld is.
      if (s.project.companyId === companyId) {
        const cals = refreshCalendars(s.calendars.map((c) => current(c)));
        const ress = refreshResources(s.resources.map((r) => current(r)));
        const docChanged = cals.calChanged + ress.resChanged;
        if (docChanged > 0) {
          if (cals.calChanged > 0) s.calendars = cals.items;
          if (ress.resChanged > 0) s.resources = ress.items;
          s.calendar = s.calendars.find((c) => c.id === s.project.calendarId) ?? s.calendar;
          s.redoStack = [];
          if (cals.calChanged > 0) s.scheduleStale = true; // kalenderwijziging raakt datums (geen isDirty, geen runCPM)
          changed += docChanged;
        }
      }

      // Slapende payloads (plan-eis 1): muteer binnen dezelfde set(); herrekening pas bij activering.
      for (const doc of s.documents) {
        if (!doc.payload) continue; // actief document heeft payload===null.
        // Lokale const ná de null-guard: TS narrowt `doc.payload` niet door de `.find()`-callback
        // hieronder heen (property-narrowing overleeft geen geneste closure), een losse const wel.
        const payload = doc.payload;
        if (payload.project.companyId !== companyId) continue;
        const cals = refreshCalendars(payload.calendars.map((c) => current(c)));
        const ress = refreshResources(payload.resources.map((r) => current(r)));
        const docChanged = cals.calChanged + ress.resChanged;
        if (docChanged > 0) {
          if (cals.calChanged > 0) {
            payload.calendars = cals.items;
            // F1 (vloot-fixpakket, issue #19): de gedenormaliseerde projectkalender-cache van deze
            // SLAPENDE payload meesyncen met de zojuist ververste `calendars` — zonder dit blijft
            // `payload.calendar` de OUDE (mogelijk stale) waarde dragen terwijl de auto-save die
            // cache rechtstreeks serialiseert (geen hydrate), wat verkeerde uren in de recovery-IFC
            // oplevert. Alleen binnen deze tak (calendars daadwerkelijk gewijzigd).
            payload.calendar = payload.calendars.find((c) => c.id === payload.project.calendarId) ?? payload.calendar;
          }
          if (ress.resChanged > 0) payload.resources = ress.items;
          payload.redoStack = [];
          if (cals.calChanged > 0) payload.scheduleStale = true; // zichtbaar bij switchDocument/activering
          changed += docChanged;
        }
      }
    });
    if (changed > 0) {
      get().recomputeResourceLoad();
      get().recomputeViewRows();
    }
    return changed;
  },

  runOpenBoundary: () => {
    const s0 = get();
    const companyId = s0.project.companyId;
    // §2-scope: onbekend/ontbrekend bedrijf ⇒ los-gedrag, geen mechaniek, geen valse labels.
    // Voorstap taak 14 (critreview taak 12): OOK hier de VOLLEDIGE vlagtoestand vestigen — een
    // eerder document kan het afwijkingenscherm/signaal hebben laten AANstaan; zonder deze reset
    // lekt die stale toestand naar een nieuw-geopend, (nog) ongebonden document (openFile-in-nieuw-
    // document, spec-lek uit de NB).
    if (!companyId || !s0.companies.some((c) => c.id === companyId) || !s0.pools[companyId]) {
      get().setUI({ showLibraryLinkDialog: false, libraryRefreshNotice: null });
      return { refreshed: 0, deviated: 0, removed: 0 };
    }
    let deviated = 0; let removed = 0;
    for (const r of s0.resources) {
      if (r.libraryOrigin?.companyId !== companyId) continue;
      const st = classifyResourceOnOpen(r, s0.pools[companyId]);
      if (st === 'deviated') deviated++; else if (st === 'removed') removed++;
    }
    for (const c of s0.calendars) {
      if (c.libraryOrigin?.companyId !== companyId) continue;
      const st = classifyCalendarOnOpen(c, s0.pools[companyId]);
      if (st === 'deviated') deviated++; else if (st === 'removed') removed++;
    }
    // 'behind' stil verversen via de primitief uit Taak 5 (behind-only: 'deviated'-items blijven
    // ongemoeid, wachtend op een gebruikerskeuze). Niet-undoable, wist redoStack, geen isDirty.
    const refreshed = get().refreshBehindItems(companyId);
    // Voorstap taak 14 (critreview taak 12): de VOLLEDIGE vlagtoestand in één keer vestigen — ook het
    // WISSEN als er niets deviated/behind is (was voorheen alleen-AAN-zetten; een stale true/getal van
    // een vorige boundary-run bleef dan onterecht staan).
    get().setUI({ showLibraryLinkDialog: deviated > 0, libraryRefreshNotice: refreshed > 0 ? refreshed : null });
    return { refreshed, deviated, removed };
  },

  onOpenStatusForResource: (resourceId) => {
    const s = get();
    const res = s.resources.find((r) => r.id === resourceId);
    const companyId = res?.libraryOrigin?.companyId;
    // §2-scope: alleen eigen-bedrijf-stempels van een lokaal bestaand bedrijf.
    if (!res || !companyId || companyId !== s.project.companyId || !s.companies.some((c) => c.id === companyId)) return null;
    const pool = s.pools[companyId];
    return pool ? classifyResourceOnOpen(res, pool) : null;
  },
  onOpenStatusForCalendar: (calendarId) => {
    const s = get();
    const cal = s.calendars.find((c) => c.id === calendarId);
    const companyId = cal?.libraryOrigin?.companyId;
    if (!cal || !companyId || companyId !== s.project.companyId || !s.companies.some((c) => c.id === companyId)) return null;
    const pool = s.pools[companyId];
    return pool ? classifyCalendarOnOpen(cal, pool) : null;
  },

  computeRecognition: () => {
    const s = get();
    const companyId = s.project.companyId;
    if (!companyId || !s.companies.some((c) => c.id === companyId)) return [];
    const pool = s.pools[companyId];
    if (!pool) return [];
    const out: RecognitionCandidate[] = [];
    for (const r of s.resources) {
      if (r.libraryOrigin?.companyId === companyId) continue; // al gestempeld voor dit bedrijf
      const m = matchByName(r.name, pool.resources);
      out.push({ kind: 'resource', projectId: r.id, projectName: r.name, suggestedPoolId: m?.id ?? null, suggestedPoolName: m?.name ?? null });
    }
    for (const c of s.calendars) {
      if (c.libraryOrigin?.companyId === companyId) continue;
      const m = matchByName(c.name, pool.calendars);
      out.push({ kind: 'calendar', projectId: c.id, projectName: c.name, suggestedPoolId: m?.id ?? null, suggestedPoolName: m?.name ?? null });
    }
    return out;
  },

  linkRecognizedItems: (links) => {
    set((s) => {
      const companyId = s.project.companyId;
      if (!companyId) return;
      const draftPool = s.pools[companyId];
      if (!draftPool) return;
      const pool = current(draftPool);
      // GO-NA-fix 3: een verdwenen kandidaat (poolId niet meer in de pool — bv. een race met
      // removePoolResource/removePoolCalendar) mag niet knallen; stille pre-scan zodat we (a) een
      // link zonder geldig poolitem straks stil overslaan én (b) GEEN undo-snapshot pushen als er
      // over de hele linkset niets toepasbaars overblijft (geen loze undo-stap, GO-NA-fix 1).
      const anyApplicable = links.some((link) => link.kind === 'resource'
        ? pool.resources.some((r) => r.id === link.poolId)
        : pool.calendars.some((c) => c.id === link.poolId));
      if (!anyApplicable) return;
      // GO-NA-fix 1: dit is een expliciet gebruikersgebaar — undoable, met de gebruikelijke
      // slice-conventie (beginUndoable vóór, finishMutation ná de mutatie).
      beginUndoable(s);
      let calendarLinked = false;
      // Plan-eis 5: alles in één set() — atomisch, geen half-gestempelde tussentoestand.
      for (const link of links) {
        if (link.kind === 'resource') {
          if (!pool.resources.some((r) => r.id === link.poolId)) continue; // GO-NA-fix 3: verdwenen kandidaat ⇒ stille skip
          const idx = s.resources.findIndex((r) => r.id === link.projectId);
          if (idx < 0) continue;
          const stamped = { ...current(s.resources[idx]), libraryOrigin: makeOrigin(pool, link.poolId) };
          s.resources[idx] = applyResourceUpdate(stamped, pool); // stempelt + ververst + zet syncedHash
        } else {
          if (!pool.calendars.some((c) => c.id === link.poolId)) continue; // GO-NA-fix 3: verdwenen kandidaat ⇒ stille skip
          const idx = s.calendars.findIndex((c) => c.id === link.projectId);
          if (idx < 0) continue;
          const stamped = { ...current(s.calendars[idx]), libraryOrigin: makeOrigin(pool, link.poolId) };
          s.calendars[idx] = applyCalendarUpdate(stamped, pool);
          calendarLinked = true;
        }
      }
      s.calendar = s.calendars.find((c) => c.id === s.project.calendarId) ?? s.calendar;
      // GO-NA-fix 2: een gelinkte kalender raakt datums ⇒ scheduleStale (patroon updateProjectCalendarFromLibrary).
      finishMutation(s, { stale: calendarLinked });
    });
    get().recomputeResourceLoad();
    get().recomputeViewRows();
  },

  unbindProject: () => {
    set((s) => {
      // GO-NA-fix 1: een al-los project (geen binding, dus per invariant ook geen stempels) is een
      // no-op — geen loze undo-stap.
      if (!s.project.companyId) return;
      beginUndoable(s);
      s.project.companyId = undefined;
      s.project.companyName = undefined;
      s.resources = s.resources.map((r) => { const { libraryOrigin: _d, ...rest } = r; return rest; });
      s.calendars = s.calendars.map((c) => { const { libraryOrigin: _d, ...rest } = c; return rest; });
      s.calendar = s.calendars.find((c) => c.id === s.project.calendarId) ?? { ...s.calendar };
      finishMutation(s);
    });
    get().recomputeResourceLoad();
    get().recomputeViewRows();
  },

  resolveDeviation: (ref, choice) => {
    const companyId = get().project.companyId;
    if (!companyId) return;
    if (choice === 'company') {
      // Neem poolwaarde over: gerichte niet-undoable verversing van dit ene item.
      set((s) => {
        const draftPool = s.pools[companyId];
        if (!draftPool) return;
        const pool = current(draftPool);
        if (ref.kind === 'resource') {
          const idx = s.resources.findIndex((r) => r.id === ref.projectId);
          if (idx < 0 || diffResourceVsPool(current(s.resources[idx]), pool).status !== 'changed') return;
          s.resources[idx] = applyResourceUpdate(current(s.resources[idx]), pool);
        } else {
          const idx = s.calendars.findIndex((c) => c.id === ref.projectId);
          if (idx < 0 || diffCalendarVsPool(current(s.calendars[idx]), pool).status !== 'changed') return;
          s.calendars[idx] = applyCalendarUpdate(current(s.calendars[idx]), pool);
          s.calendar = s.calendars.find((c) => c.id === s.project.calendarId) ?? s.calendar;
          // Review-fix (spec §3): kalenderwaarden gewijzigd ⇒ scheduleStale (geen isDirty, geen runCPM).
          s.scheduleStale = true;
        }
        s.redoStack = [];
      });
      get().recomputeResourceLoad();
      get().recomputeViewRows();
      return;
    }
    // choice === 'file': schrijf de BESTANDSwaarde naar het poolitem (bump), zet de verse syncedHash op
    // het net-geopende item, en ververs de siblings (plan-eis 4: geen dubbele verversing van dit item).
    set((s) => {
      const draftPool = s.pools[companyId];
      if (!draftPool) return;
      if (ref.kind === 'resource') {
        // findIndex + current(s.resources[idx]) (bewezen patroon elders in dit bestand, zie
        // resolveDeviation('company')/linkRecognizedItems) — current() op het RESULTAAT van
        // .find() zelf faalt onder Immer ("expects a draft"), dus altijd via de index.
        const rIdx = s.resources.findIndex((r) => r.id === ref.projectId);
        if (rIdx < 0) return;
        const item = current(s.resources[rIdx]);
        const libId = item.libraryOrigin?.libraryItemId;
        const pIdx = libId ? draftPool.resources.findIndex((r) => r.id === libId) : -1;
        if (pIdx < 0) return;
        // Overschrijf de gevolgde velden van het poolitem met de bestandswaarden.
        for (const f of RESOURCE_DIFF_FIELDS_LOCAL) (draftPool.resources[pIdx] as Record<string, unknown>)[f] = (item as Record<string, unknown>)[f];
        // Bewezen patroon (zie promoteResourceToPool hierboven): werk verder met de PLAIN
        // `bumped`-return-waarde, niet met een current()-herlezing van s.pools[companyId] — die
        // combinatie (plain top-level object met nog-proxied nested arrays) laat Immers current()
        // stikken ("expects a draft, got: [object Object]").
        const bumped = bumpPool(draftPool);
        s.pools[companyId] = bumped;
        const newHash = computeResourceHash(bumped.resources[pIdx]);
        s.resources[rIdx] = { ...item, libraryOrigin: makeOrigin(bumped, libId!, newHash) };
      } else {
        const cIdx = s.calendars.findIndex((c) => c.id === ref.projectId);
        if (cIdx < 0) return;
        const item = current(s.calendars[cIdx]);
        const libId = item.libraryOrigin?.libraryItemId;
        const pIdx = libId ? draftPool.calendars.findIndex((c) => c.id === libId) : -1;
        if (pIdx < 0) return;
        for (const f of CALENDAR_DIFF_FIELDS_LOCAL) (draftPool.calendars[pIdx] as Record<string, unknown>)[f] = (item as Record<string, unknown>)[f];
        const bumped = bumpPool(draftPool);
        s.pools[companyId] = bumped;
        const newHash = computeCalendarHash(bumped.calendars[pIdx]);
        s.calendars[cIdx] = { ...item, libraryOrigin: makeOrigin(bumped, libId!, newHash) };
        s.calendar = s.calendars.find((c) => c.id === s.project.calendarId) ?? s.calendar;
      }
      // Niet-undoable (spiegel de 'company'-tak hierboven): wis de redoStack expliciet. Zonder dit
      // overleeft een bestaande redo-entry het oplossen van precies één afwijking (de sibling-
      // verversing hieronder wist 'm alleen bij docChanged>0) — "opnieuw" zou dan oude stempels
      // over de zojuist gebumpte pool kunnen terugzetten (GO-NA-fix, critreview 3870ef9).
      s.redoStack = [];
    });
    persist(get);
    // Siblings in alle open/slapende documenten volgen de nieuwe pool (plan-eis 4). Het net-opgeloste
    // item is nu gelijk aan de pool (diff up-to-date) ⇒ refreshAllDocumentsFromPool raakt het niet.
    get().refreshAllDocumentsFromPool(companyId);
  },
});
