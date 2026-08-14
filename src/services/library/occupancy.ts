// B1b — pure bezettingskern (spec 2026-08-14-b1b-bezettingsoverzicht-design.md §4/§6).
// Aggregeert, binnen één resourcebibliotheek, de boekingen van álle aangeleverde documenten per
// poolitem per ISO-dag, en markeert de dagen waarop de som boven de bedrijfscapaciteit uitkomt
// (dubbelbezetting). Volledig puur en headless testbaar (tests/library/check-occupancy.ts): geen
// store, geen I/O — de weergavelaag (ResourceOccupancyView) mapt payload-snapshots naar
// `OccupancyDocInput` en rendert het resultaat.
//
// Per NIET-STALE document draait bewust de bestaande `computeResourceLoad` op de payload-velden —
// dezelfde curve-verdeling (`distributeUnits`), leaf-filter en werkdag-mapping als het histogram,
// dus per-document exact consistente cijfers. Er wordt NIET geleund op een opgeslagen
// `resourceLoadResult` in de payload: dat kan achterlopen op ververste resources/kalenders
// (zie het commentaar bij `switchDocument` in documentSlice); vers rekenen is goedkoop (§7) en
// altijd juist t.o.v. wat de payload bevat.
//
// STALE documenten tellen NIET mee (§4.3, herzien na critreview 2026-08-14): bij een stale
// document lopen `scheduleDuration` en `earlyStart..earlyFinish` per definitie uiteen, en
// `computeResourceLoad` kapt de verdeling af op min(dagen, werkdagen) — het resultaat is dan noch
// de oude noch de nieuwe planning en kan echte conflictdagen als groen maskeren. Zulke documenten
// blijven wél zichtbaar: elke boeking (= toewijzingen op aan het poolitem gestempelde resources)
// verschijnt als ongetelde booking (`counted: false`) zonder cijfers, zodat er niets stil
// verdwijnt en de gebruiker weet wat te doen (document activeren, F5).
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
  /** false ⇒ stale: zichtbaar maar niet meegeteld (§4.3) — dan geen cijfers. */
  counted: boolean;
  firstDay: string | null;  // ISO, eerste dag met belasting > 0 (null bij counted: false)
  lastDay: string | null;
  peak: number;             // hoogste dagbelasting binnen dít document (0 bij counted: false)
  /** ISO-dag → belasting van dít document op dit poolitem (alleen dagen met belasting > 0;
   *  {} bij counted: false) — voedt de histogramweergave per rij (§5a); de som over getelde
   *  documenten per dag is exact de som die `totalPeak`/`conflictDays` gebruiken. */
  dailyLoad: Record<string, number>;
}

/** Eén rij van het overzicht: een geboekt poolitem met zijn documenten en conflictdagen. */
export interface OccupancyRow {
  libraryItemId: string;    // pool-resource-id
  name: string;             // poolnaam (weergave; matching blijft op id)
  docs: OccupancyDocBooking[];
  totalPeak: number;        // hoogste gesommeerde dagbelasting over GETELDE documenten
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
 * Boeking-/telregels (§4.3, herzien): een booking is `counted` wanneer het document niet stale is
 * én de berekende belasting op minstens één dag > 0 is. Een stale document met toewijzingen op
 * aan het poolitem gestempelde resources levert een ongetelde booking zonder cijfers; een
 * niet-stale document zonder enige dag belasting > 0 (0 eenheden, geen doorgerekende datums)
 * levert géén booking — de fantoomrij-guard. Een rij bestaat alleen bij minstens één booking
 * (geteld of ongeteld); `anyStale` staat alleen wanneer een ongetelde booking daadwerkelijk in
 * het overzicht voorkomt.
 * Conflictdefinitie (§6): som over getelde documenten > `maxUnitsOn(poolItem, dag)` — strikt
 * groter; som == capaciteit is géén conflict. `conflictDays` is oplopend gesorteerd. Rijvolgorde
 * is de poolvolgorde (deterministisch; de weergave sorteert zelf op conflicten/naam, §5).
 */
export function computeLibraryOccupancy(
  companyId: string,
  pool: CompanyPool,
  docs: OccupancyDocInput[],
): { rows: OccupancyRow[]; anyStale: boolean } {
  const poolItemIds = new Set(pool.resources.map(r => r.id));

  // Emmers: per poolitem → per document → dag-belasting (alleen dagen > 0), plus de gesommeerde
  // dag-belasting over getelde documenten. Een stale document krijgt een emmer zonder cijfers.
  interface DocBucket {
    doc: OccupancyDocInput;
    counted: boolean;
    daily: Map<string, number>; // leeg bij counted: false
  }
  const perItem = new Map<string, { byDoc: Map<string, DocBucket>; total: Map<string, number> }>();

  const bucketFor = (itemId: string) => {
    let bucket = perItem.get(itemId);
    if (!bucket) {
      bucket = { byDoc: new Map(), total: new Map() };
      perItem.set(itemId, bucket);
    }
    return bucket;
  };

  for (const doc of docs) {
    if (doc.companyId !== companyId) continue;

    // Alleen resources met een stempel naar déze bibliotheek én een nog bestaand poolitem.
    const stampedResources = doc.resources.filter(r =>
      r.libraryOrigin !== undefined &&
      r.libraryOrigin.companyId === companyId &&
      poolItemIds.has(r.libraryOrigin.libraryItemId));
    if (stampedResources.length === 0) continue;

    if (doc.scheduleStale) {
      // §4.3: stale ⇒ niet rekenen (de engine-uitkomst zou noch oud noch nieuw zijn), maar elke
      // boeking — het document heeft toewijzingen op een gestempelde resource — blijft zichtbaar
      // als ongetelde booking. Geen cijfers, dus ook geen bijdrage aan `total`.
      for (const resource of stampedResources) {
        if (!doc.assignments.some(a => a.resourceId === resource.id)) continue;
        const bucket = bucketFor(resource.libraryOrigin!.libraryItemId);
        if (!bucket.byDoc.has(doc.docId)) {
          bucket.byDoc.set(doc.docId, { doc, counted: false, daily: new Map() });
        }
      }
      continue;
    }

    // Vers per document rekenen — zelfde engine-pass als het histogram (zie kopcommentaar).
    const loadResult = computeResourceLoad(doc.resources, doc.assignments, doc.tasks, doc.calendar, doc.calendars);

    for (const resource of stampedResources) {
      const daily = loadResult.load[resource.id];
      if (!daily) continue; // geen (geldige) toewijzingen ⇒ geen boeking
      const itemId = resource.libraryOrigin!.libraryItemId;

      // Fantoomrij-guard (critreview bevinding 2): `computeResourceLoad` maakt de load-emmer al
      // vóór de daglus aan, dus een truthy (leeg) object is geen bewijs van belasting — en
      // 0-eenheden-dagen evenmin. Alleen dagen met belasting > 0 vormen een boeking: zonder zo'n
      // dag wordt hier geen emmer aangemaakt en bestaat de booking (en dus de rij) niet.
      for (const [iso, units] of Object.entries(daily)) {
        if (units <= 0) continue;
        const bucket = bucketFor(itemId);
        let docBucket = bucket.byDoc.get(doc.docId);
        if (!docBucket) {
          docBucket = { doc, counted: true, daily: new Map() };
          bucket.byDoc.set(doc.docId, docBucket);
        }
        // Meerdere kopieën met dezelfde stempel in één document sommeren gewoon op.
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
    for (const { doc, counted, daily } of bucket.byDoc.values()) {
      let firstDay: string | null = null;
      let lastDay: string | null = null;
      let peak = 0;
      const dailyLoad: Record<string, number> = {};
      for (const [iso, units] of daily) {
        dailyLoad[iso] = units;
        if (firstDay === null || iso < firstDay) firstDay = iso;
        if (lastDay === null || iso > lastDay) lastDay = iso;
        if (units > peak) peak = units;
      }
      // anyStale alléén wanneer een ongetelde booking daadwerkelijk in het overzicht voorkomt.
      if (!counted) anyStale = true;
      docBookings.push({
        docId: doc.docId,
        title: doc.title,
        scheduleStale: doc.scheduleStale,
        counted,
        firstDay,
        lastDay,
        peak,
        dailyLoad,
      });
    }

    // Som per dag over getelde documenten (oplopend doorlopen ⇒ conflictDays vanzelf gesorteerd,
    // en de piekdag is bij gelijke pieken deterministisch de vroegste).
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
      // Zonder enige getelde belaste dag (alleen ongetelde boekingen) is er geen piekdag; vlakke
      // maxUnits als neutrale capaciteit.
      capacityAtPeak: peakDay !== null ? maxUnitsOn(poolItem, peakDay) : poolItem.maxUnits,
      conflictDays,
    });
  }

  return { rows, anyStale };
}
