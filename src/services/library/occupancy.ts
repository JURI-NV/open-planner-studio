// B1b — pure bezettingskern (spec 2026-08-14-b1b-bezettingsoverzicht-design.md §4/§6).
// Aggregeert, binnen één resourcebibliotheek, de boekingen van álle aangeleverde documenten per
// poolitem per ISO-dag, en markeert de dagen waarop de som boven de bedrijfscapaciteit uitkomt
// (dubbelbezetting). Volledig puur en headless testbaar (tests/library/check-occupancy.ts): geen
// store, geen I/O — de weergavelaag (ResourceOccupancyView) mapt payload-snapshots naar
// `OccupancyDocInput` en rendert het resultaat.
//
// Per document draait bewust de bestaande `computeResourceLoad` op de payload-velden — dezelfde
// curve-verdeling (`distributeUnits`), leaf-filter en werkdag-mapping als het histogram, dus
// per-document exact consistente cijfers. Er wordt NIET geleund op een opgeslagen
// `resourceLoadResult` in de payload: dat kan achterlopen op ververste resources/kalenders
// (zie het commentaar bij `switchDocument` in documentSlice); vers rekenen is goedkoop (§7) en
// altijd juist t.o.v. wat de payload bevat.
//
// Capaciteit komt van het POOLitem via `maxUnitsOn` (§6): `maxUnits`/`availabilitySteps` op een
// projectkopie zijn projectinzet, maar de B1b-vraag is een bedrijfsvraag — twee projecten die elk
// binnen hun eigen inzet blijven kunnen samen alsnog boven wat het bedrijf heeft uitkomen. Twee
// bewuste vereenvoudigingen (§6, besluit): géén pool-kalendercheck op de capaciteit (de belasting
// landt per document al uitsluitend op werkdagen van dát document), en binnen-document-
// overbezetting telt gewoon mee in de som (de vraag is bedrijfsbreed).
import type { Resource, ResourceAssignment } from '@/types/resource';
import type { Task } from '@/types/task';
import type { WorkCalendar } from '@/types/calendar';
import type { CompanyPool } from '@/types/library';
import { computeResourceLoad, maxUnitsOn } from '@/engine/scheduler/ResourceLoad';

/** Eén open document, gemapt uit zijn payload-snapshot (weergavelaag levert dit aan, §4.4). */
export interface OccupancyDocInput {
  docId: string;
  title: string;            // via documentTitle(); '' ⇒ weergavelaag vult 'untitled' + ordinal
  scheduleStale: boolean;
  companyId: string | null; // project.companyId van dit document
  resources: Resource[];
  assignments: ResourceAssignment[];
  tasks: Task[];
  calendar: WorkCalendar;   // projectkalender
  calendars: WorkCalendar[];
}

/** De boeking van één document op één poolitem. */
export interface OccupancyDocBooking {
  docId: string;
  title: string;
  scheduleStale: boolean;
  firstDay: string | null;  // ISO, eerste dag met belasting > 0
  lastDay: string | null;
  peak: number;             // hoogste dagbelasting binnen dít document
  /** ISO-dag → belasting van dít document op dit poolitem (alleen dagen met belasting > 0) —
   *  voedt de histogramweergave per rij; de som over documenten per dag is exact de som die
   *  `totalPeak`/`conflictDays` hierboven al gebruiken. */
  dailyLoad: Record<string, number>;
}

/** Eén rij van het overzicht: een geboekt poolitem met zijn documenten en conflictdagen. */
export interface OccupancyRow {
  libraryItemId: string;    // pool-resource-id
  name: string;             // poolnaam (weergave; matching blijft op id)
  docs: OccupancyDocBooking[];
  totalPeak: number;        // hoogste gesommeerde dagbelasting over documenten
  capacityAtPeak: number;   // maxUnitsOn(poolItem, piekdag)
  conflictDays: string[];   // ISO-datums waar som > capaciteit (gesorteerd)
}

/**
 * Reken de bezetting van bibliotheek `companyId` uit over `docs`. Scope-regels (§4.2, zelfde
 * stempel-scope als alle B1.1-mechaniek):
 *  - een document telt alleen mee wanneer `doc.companyId === companyId`;
 *  - een resource telt alleen mee wanneer zijn stempel naar déze bibliotheek wijst ÉN de pool het
 *    `libraryItemId` nog bevat (wezen vallen eruit — een stempel dat nergens meer naar wijst hoort
 *    bij geen enkel poolitem). Projecteigen resources (geen stempel) tellen nooit mee: hun
 *    dubbelbezetting is een binnen-project-vraag en die beantwoordt het bestaande histogram al;
 *  - poolitems zonder enige boeking krijgen géén rij (het overzicht toont inzet, geen catalogus).
 * Conflictdefinitie (§6): som over documenten > `maxUnitsOn(poolItem, dag)` — strikt groter;
 * som == capaciteit is géén conflict. `conflictDays` is oplopend gesorteerd. Rijvolgorde is de
 * poolvolgorde (deterministisch; de weergave sorteert zelf op conflicten/naam, §5). `anyStale`
 * staat zodra minstens één meetellend document met een boeking `scheduleStale` is (§4.3: zulke
 * documenten tellen mee op hun laatst bekende datums, met zichtbare markering).
 */
export function computeLibraryOccupancy(
  companyId: string,
  pool: CompanyPool,
  docs: OccupancyDocInput[],
): { rows: OccupancyRow[]; anyStale: boolean } {
  const poolItemIds = new Set(pool.resources.map(r => r.id));

  // Emmers: per poolitem → per document → dag-belasting, plus de gesommeerde dag-belasting.
  interface DocBucket {
    doc: OccupancyDocInput;
    daily: Map<string, number>;
  }
  const perItem = new Map<string, { byDoc: Map<string, DocBucket>; total: Map<string, number> }>();

  for (const doc of docs) {
    if (doc.companyId !== companyId) continue;

    // Alleen resources met een stempel naar déze bibliotheek én een nog bestaand poolitem.
    const stampedResources = doc.resources.filter(r =>
      r.libraryOrigin !== undefined &&
      r.libraryOrigin.companyId === companyId &&
      poolItemIds.has(r.libraryOrigin.libraryItemId));
    if (stampedResources.length === 0) continue;

    // Vers per document rekenen — zelfde engine-pass als het histogram (zie kopcommentaar).
    const loadResult = computeResourceLoad(doc.resources, doc.assignments, doc.tasks, doc.calendar, doc.calendars);

    for (const resource of stampedResources) {
      const daily = loadResult.load[resource.id];
      if (!daily) continue; // geen (geldige) toewijzingen ⇒ geen boeking
      const itemId = resource.libraryOrigin!.libraryItemId;

      let bucket = perItem.get(itemId);
      if (!bucket) {
        bucket = { byDoc: new Map(), total: new Map() };
        perItem.set(itemId, bucket);
      }
      let docBucket = bucket.byDoc.get(doc.docId);
      if (!docBucket) {
        docBucket = { doc, daily: new Map() };
        bucket.byDoc.set(doc.docId, docBucket);
      }
      // Meerdere kopieën met dezelfde stempel in één document sommeren gewoon op.
      for (const [iso, units] of Object.entries(daily)) {
        docBucket.daily.set(iso, (docBucket.daily.get(iso) ?? 0) + units);
        bucket.total.set(iso, (bucket.total.get(iso) ?? 0) + units);
      }
    }
  }

  const rows: OccupancyRow[] = [];
  let anyStale = false;

  // Poolvolgorde als deterministische rijvolgorde; ongeboekte items slaan we over.
  for (const poolItem of pool.resources) {
    const bucket = perItem.get(poolItem.id);
    if (!bucket) continue;

    const docBookings: OccupancyDocBooking[] = [];
    for (const { doc, daily } of bucket.byDoc.values()) {
      let firstDay: string | null = null;
      let lastDay: string | null = null;
      let peak = 0;
      const dailyLoad: Record<string, number> = {};
      for (const [iso, units] of daily) {
        if (units <= 0) continue; // curve-dagen met 0 eenheden zijn geen boeking
        dailyLoad[iso] = units;
        if (firstDay === null || iso < firstDay) firstDay = iso;
        if (lastDay === null || iso > lastDay) lastDay = iso;
        if (units > peak) peak = units;
      }
      if (doc.scheduleStale) anyStale = true;
      docBookings.push({
        docId: doc.docId,
        title: doc.title,
        scheduleStale: doc.scheduleStale,
        firstDay,
        lastDay,
        peak,
        dailyLoad,
      });
    }

    // Som per dag (oplopend doorlopen ⇒ conflictDays vanzelf gesorteerd, en de piekdag is bij
    // gelijke pieken deterministisch de vroegste).
    let totalPeak = 0;
    let peakDay: string | null = null;
    const conflictDays: string[] = [];
    for (const iso of [...bucket.total.keys()].sort()) {
      const sum = bucket.total.get(iso)!;
      if (sum > totalPeak) {
        totalPeak = sum;
        peakDay = iso;
      }
      if (sum > maxUnitsOn(poolItem, iso)) conflictDays.push(iso);
    }

    rows.push({
      libraryItemId: poolItem.id,
      name: poolItem.name,
      docs: docBookings,
      totalPeak,
      // Zonder enige belaste dag (alle boekingen 0) is er geen piekdag; vlakke maxUnits als
      // neutrale capaciteit.
      capacityAtPeak: peakDay !== null ? maxUnitsOn(poolItem, peakDay) : poolItem.maxUnits,
      conflictDays,
    });
  }

  return { rows, anyStale };
}
