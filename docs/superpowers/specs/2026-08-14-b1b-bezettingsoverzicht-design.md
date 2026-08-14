# Spec — B1b: bezettingsoverzicht per bibliotheek over alle open documenten

Datum: 2026-08-14 · Status: ontwerp, ter akkoord user · Bouwt op B1/B1.1 (herkomststempels,
Bibliotheek-/Projectweergave). Beantwoordt het resterende deel van
[issue #19](https://github.com/OpenAEC-Foundation/open-planner-studio/issues/19): "meerdere
projecten openen en zien waar welke resource verpland is, om dubbelbezetting te zien".
Besluiten gemarkeerd met **(besluit)**.

## 1. Doel

Eén overzicht dat, binnen één resourcebibliotheek, over álle geopende documenten heen laat zien
waar elke bibliotheekresource geboekt staat — per document, per periode — en op welke dagen de
som van die boekingen boven de bedrijfscapaciteit uitkomt (**dubbelbezetting**). Het overzicht is
leesvenster, geen werkbank: er valt niets vanuit te muteren.

## 2. Vastliggende scope-grenzen (eerder besloten — niet heropenen)

1. **Strikt binnen één bibliotheek/pool.** Bedrijfsoverstijgende histogrammen/overzichten zijn
   expliciet afgewezen (besluit user 2026-07-20, vastgelegd in
   `docs/archive/superpowers/specs/2026-07-20-b1-bedrijfsbibliotheken-design.md` regel 12).
2. **Alleen geopende documenten op deze machine.** Er is geen gedeelde opslag/sync; boekingen op
   de machine van een collega bestaan lokaal niet (`docs/library.md`, "Bekende beperkingen"
   punt 2). Deze beperking wordt vooraf gedocumenteerd — in het gebruikersartikel (§9) én als
   permanente hint in de weergave zelf (§5).
3. **Matching uitsluitend via `libraryOrigin`-stempels** (`companyId` + `libraryItemId`,
   `src/types/library.ts`) — nooit via naam. Identiteit rust op id (zie `docs/library.md`,
   "Identiteit rust op id, niet op naam").
4. **Geen `createAppStore()`-factory** (onderhoudbaarheidsitem 41). B1b leest passieve
   `DocumentPayload`-snapshots uit `documentSlice`; er is géén live cross-document solve.

## 3. Waar leeft de weergave? (vraag a)

Drie kandidaten afgewogen:

- **Backstage → Bibliotheek** — afgevallen. Die sectie is met B1.1 bewust gekrompen tot
  bedrijvenbeheer (spec B1.1 §7); bezetting is een plannersvraag, geen beheertaak. Backstage
  verbergt bovendien de Gantt en de context van het actieve project.
- **Eigen paneel (rechterzijde, naast `TableEditor`/`IFCPanel`)** — afgevallen. Een extra
  paneelsoort betekent nieuwe chrome (mount-conditie, collapse-state, ribbonknop) voor een
  weergave die inhoudelijk gewoon "de derde blik op resources" is. De rechterpanelen zijn
  bovendien smal; dit overzicht is tabelvormig en breed.
- **Derde weergave in de Resources-tab (`ResourcePanel`)** — **gekozen (besluit)**. Het
  Resources-tabblad is sinds B1.1 dé werkplek voor alles rond resources; de schakelaar
  Bibliotheek/Project (`ui.resourcesView: 'company' | 'project'`, `src/state/slices/types.ts`)
  bestaat al en wordt uitgebreid met een derde stand.

Concreet:

- `ui.resourcesView` wordt `'company' | 'project' | 'occupancy'`. Bestaand persist-gedrag van
  het veld blijft ongewijzigd.
- De schakelaar rechtsboven in `src/components/panels/ResourcePanel.tsx` krijgt een derde knop
  **"Bezetting"** (`t('resource.occupancyView')`). De weergave zelf komt als eigen component
  `src/components/panels/ResourceOccupancyView.tsx`, gerenderd vanuit `ResourcePanel` wanneer
  `resourcesView === 'occupancy'` — het paneel is al groot; de nieuwe weergave hoort in een
  eigen bestand, niet erbij in de bestaande 1200+ regels.
- **Zichtbaarheid (besluit):** de knop bestaat alleen wanneer het actieve document aan een
  lokaal bestaand bedrijf gekoppeld is (`linked`, zelfde conditie als de Bibliotheekweergave).
  Een los document heeft geen bibliotheekcontext en dus geen bezettingsoverzicht; een
  bibliotheekkiezer voor losse documenten staat op de bewust-later-lijst (§12). Valt de
  koppeling weg terwijl de weergave openstaat (bedrijf verwijderd, ontkoppeld), dan valt het
  paneel terug op de Projectweergave — zelfde vangnet als de Bibliotheekweergave nu.

## 4. Aggregatie over payload-snapshots (vraag b)

### 4.1 De pure kern: `computeLibraryOccupancy`

Nieuw bestand `src/services/library/occupancy.ts` (naast `libraryOps.ts` — het is
bibliotheekdomein dat engine-bouwstenen leent), met één pure, headless testbare functie:

```ts
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

export interface OccupancyDocBooking {
  docId: string;
  title: string;
  scheduleStale: boolean;
  firstDay: string | null;  // ISO, eerste dag met belasting > 0
  lastDay: string | null;
  peak: number;             // hoogste dagbelasting binnen dít document
}

export interface OccupancyRow {
  libraryItemId: string;    // pool-resource-id
  name: string;             // poolnaam (weergave; matching blijft op id)
  docs: OccupancyDocBooking[];
  totalPeak: number;        // hoogste gesommeerde dagbelasting over documenten
  capacityAtPeak: number;   // maxUnitsOn(poolItem, piekdag)
  conflictDays: string[];   // ISO-datums waar som > capaciteit (gesorteerd)
}

export function computeLibraryOccupancy(
  companyId: string,
  pool: CompanyPool,
  docs: OccupancyDocInput[],
): { rows: OccupancyRow[]; anyStale: boolean }
```

Per document draait de functie de bestaande `computeResourceLoad`
(`src/engine/scheduler/ResourceLoad.ts`) op de payload-velden van dát document — dezelfde
curve-verdeling (`distributeUnits`), leaf-filter en werkdag-mapping als het bestaande
histogram, dus per-document exact consistente cijfers. Daarna wordt per resource het
`load`-resultaat via `resource.libraryOrigin.libraryItemId` opgeteld in een emmer per poolitem
per ISO-dag.

**Er wordt bewust NIET geleund op het opgeslagen `resourceLoadResult` in de payload**: grens 3/4
van het verversingsmodel kan resources/kalenders van een slapende payload al ververst hebben
terwijl diens `resourceLoadResult` nog oude waarden droeg (dat is precies waarom
`switchDocument` bij activering onvoorwaardelijk `recomputeResourceLoad()` draait — zie het
commentaar in `src/state/slices/documentSlice.ts`). Vers rekenen vanuit de payload-velden is
goedkoop (§7) en altijd juist t.o.v. wat de payload bevat.

### 4.2 Scope-regels per document en per item

Zelfde scope als alle B1.1-mechaniek (spec B1.1 §2, "stempel-scope"):

- Een document telt alleen mee wanneer `doc.companyId === companyId` — documenten die aan een
  ándere (of geen) bibliotheek hangen dragen niets bij, ook niet via vreemde stempels.
- Een resource telt alleen mee wanneer `resource.libraryOrigin?.companyId === companyId` **én**
  `pool.resources` het `libraryItemId` nog bevat. **Wezen** (origineel uit de pool verwijderd)
  vallen er dus uit: het overzicht is per poolitem geordend en een stempel dat nergens meer
  naar wijst hoort bij geen enkel poolitem **(besluit)**. Projecteigen resources (geen stempel)
  tellen nooit mee — hun dubbelbezetting is per definitie een binnen-project-vraag en die
  beantwoordt het bestaande histogram al.
- Poolitems zonder enige boeking in de open documenten krijgen géén rij — het overzicht toont
  inzet, geen catalogus (die staat in de Bibliotheekweergave).

### 4.3 Stale planning: tonen mét markering, nooit stil herrekenen (besluit)

Scheduling is handmatig (`runCPM` draait niet reactief) en B1b mag geen cross-document solve
doen (§2 punt 4). De taakdatums in een payload (`task.time.earlyStart`/`earlyFinish`) zijn dus
de **laatst doorgerekende** datums; `payload.scheduleStale` zegt of er sindsdien gemuteerd is
(en staat na crash-herstel altijd op `true` voor niet-actieve documenten — zie
`payloadFromInput` in `src/state/documentContract.ts`).

Beleid: zo'n document telt gewoon mee op zijn laatst bekende datums, maar draagt een zichtbare
markering ⚠ `t('resource.occupancy.staleDoc')` op elke regel waar het in voorkomt, plus een
bannertje boven de tabel zodra `anyStale` waar is: "minstens één document is niet doorgerekend —
activeer het en druk F5". Weglaten zou erger zijn (boekingen verdwijnen stil uit het overzicht);
stil herrekenen kan niet zonder de solver op een payload los te laten die niet de actieve store
is. De gebruiker houdt de regie: document activeren, F5, terugschakelen.

### 4.4 Aanlevering vanuit de store

`ResourceOccupancyView` haalt de invoer met de bestaande
`getOpenDocumentPayloads()` (`documentSlice`) — die levert het actieve document via
`capturePayload` (referenties, geen deep clone) en de rest per referentie uit de registry — en
mapt per document naar `OccupancyDocInput` (titel via de bestaande `documentTitle`-helper +
`untitledOrdinals`, zoals de tabbladen). Geen nieuwe store-actie, geen nieuw store-veld: de
aggregatie is een leesberekening in de weergavelaag over bestaande state.

## 5. Wat de weergave toont (vraag c)

**Gekozen vorm (besluit): een tabel met uitklapbare per-document-regels — géén tijdlijn-canvas
in v1.** Issue #19 vraagt "zien wáár welke resource verpland is om dubbelbezetting te zien"; dat
is een vraag om feiten (welke projecten, welke periode, waar knelt het), niet om een grafiek.
Een canvas-tijdlijn over N documenten is de duurste vorm (renderer-werk, timescale, hit-testing)
en staat op de bewust-later-lijst (§12). De goedkoopste vorm die de vraag écht beantwoordt:

- **Hoofdrij per geboekt poolitem**: naam, aantal documenten
  (`t('resource.occupancy.docCount', { count })`), totale periode (min `firstDay` … max
  `lastDay`), piek-som vs. capaciteit ("3,0 / 2,0"), en — alleen bij conflict — een rode badge
  `t('resource.occupancy.conflictDays', { count })` met als tooltip/subregel de eerste
  conflictdatums (max. ~5, dan "…").
- **Uitklap (chevron, zelfde patroon als de `availabilitySteps`-subrij in `ResourcePanel`)**:
  één subregel per document — documenttitel, periode (`firstDay`–`lastDay`), piek in dat
  document, en de ⚠-markering bij `scheduleStale`. Zo is direct zichtbaar wélke projecten de
  resource claimen en wie de overlap veroorzaakt.
- **Sortering**: rijen met conflicten bovenaan (meeste conflictdagen eerst), daarna alfabetisch
  op poolnaam.
- **Permanente voetnoot** onder de tabel: `t('resource.occupancy.machineOnly')` — "dit overzicht
  ziet alleen documenten die op deze computer geopend zijn" (scope-grens 2, vooraf zichtbaar in
  het product zelf, niet alleen in de docs).
- **Lege toestand**: `t('resource.occupancy.empty')` wanneer geen enkel open document een
  bibliotheekresource van deze pool boekt.

Bewuste eigenaardigheid, gedocumenteerd in §9: een variant-duplicaat (`duplicateDocument`)
telt als volwaardig extra document en verdubbelt dus de boekingen — het ís een geopend document.
Wie varianten vergelijkt moet ze sluiten of negeren; het overzicht filtert er niet stil op.

## 6. Wanneer is een resource dubbel geboekt? (vraag d)

**Definitie (besluit):** poolitem *r* is dubbel geboekt op ISO-dag *d* wanneer

> Σ over alle meetellende open documenten van de dagbelasting op *d* van hun aan *r* gestempelde
> resource(s) > `maxUnitsOn(poolItem, d)`

met `maxUnitsOn` uit `src/engine/scheduler/ResourceLoad.ts` — letterlijk dezelfde
capaciteitsdefinitie (vlakke `maxUnits` + effective-dated `availabilitySteps`) als histogram en
nivelleerder, maar toegepast op het **poolitem**, niet op een projectkopie.

Onderbouwing van die keuze: `maxUnits`/`availabilitySteps` op een projectkopie zijn
*projectinzet* ("volgt de bibliotheek NIET", `docs/library.md`) — hoeveel dít project claimt.
De vraag van B1b is een bedrijfsvraag: is er méér geboekt dan het bedrijf heeft. Daar is het
poolitem de enige waarheid. Twee projecten die elk keurig binnen hun eigen `maxUnits = 2`
blijven zijn samen alsnog dubbel geboekt als het bedrijf maar 2 krachten heeft.

Twee bewuste vereenvoudigingen **(besluit)**:

1. **Geen kalendercheck op de capaciteit.** De belasting landt per document al uitsluitend op
   werkdagen van dát document (zo werkt `computeResourceLoad`); een extra pool-kalendercheck
   zou dagen met echte boekingen als capaciteit-0 kunnen bestempelen en valse conflicten tonen
   wanneer projectkalenders en poolkalender uiteenlopen. "Werkt de resource die dag wel" blijft
   de per-project-vraag van het bestaande histogram.
2. **Binnen-document-overbezetting telt gewoon mee in de som.** Eén document dat in z'n eentje
   boven de poolcapaciteit boekt, verschijnt hier dus ook als conflict. Dat is juist: de vraag
   is bedrijfsbreed, en het uitklapniveau (§5) laat meteen zien dat er maar één veroorzaker is.

## 7. Prestaties (vraag e)

- **Lazy, niet reactief (besluit):** `ResourceOccupancyView` mount alleen bij
  `resourcesView === 'occupancy'`; er wordt nergens anders gerekend, geen store-subscription
  die buiten de weergave om aggregeert, geen achtergrondwerk.
- **Memoization:** één `useMemo` in de component rond
  `computeLibraryOccupancy`, met als afhankelijkheden de identiteiten van `s.documents`,
  `s.pools[cid]`, en de top-level velden van het actieve document
  (`s.resources`, `s.assignments`, `s.tasks`, `s.calendar`, `s.calendars`,
  `s.scheduleStale`). Immer geeft nieuwe referenties bij elke mutatie, dus dit is
  vanzelf correct: bewerk je het actieve document of de pool terwijl de weergave openstaat, dan
  herrekent hij; slapende payloads wijzigen alleen op de vier verversingsgrenzen en die
  vervangen de payload-referentie. Geen eigen cache-laag, geen invalidatie-boekhouding.
- **Kostenraming:** `computeResourceLoad` is O(assignments × taakduur) per document; N is het
  aantal open tabbladen (praktisch ≤ ~10). Dit is dezelfde ordegrootte als wat `switchDocument`
  nu al bij elke wissel draait voor één document — ruim binnen een render-frame, geen
  `execute_async`/worker nodig. Mocht dit ooit knellen (honderden documenten), dan is een
  per-docId-memoisatie op payload-referentie de voor de hand liggende stap — bewust later.

## 8. i18n (vraag f)

Nieuwe sleutels in `common`, onder het bestaande `resource.*`-blok, in alle veertien locales
(`verify:i18n` dwingt volledigheid af, CLDR-pluralcategorieën incl. — dus géén `_one` voor
`zh`/`ja`/`ko`, wél `_few`/`_many` voor `pl` en `_many` voor `es`/`fr`/`it`/`pt`):

- `resource.occupancyView` — "Bezetting" (derde stand van de schakelaar)
- `resource.occupancy.empty` — "Geen bibliotheekresources geboekt in de geopende documenten."
- `resource.occupancy.machineOnly` — "Dit overzicht ziet alleen documenten die op deze computer geopend zijn."
- `resource.occupancy.staleDoc` — "Planning niet doorgerekend — activeer dit document en druk F5."
- `resource.occupancy.staleBanner` — "Minstens één document is niet doorgerekend; cijfers kunnen verouderd zijn."
- `resource.occupancy.docCount_one` / `_other` — "{{count}} document" / "{{count}} documenten"
- `resource.occupancy.conflictDays_one` / `_other` — "{{count}} dag dubbel geboekt" / "{{count}} dagen dubbel geboekt"
- `resource.occupancy.period` / `resource.occupancy.peak` / `resource.occupancy.capacity` /
  `resource.occupancy.documents` — kolomkoppen
- `resource.occupancy.moreDays` — "… en {{count}} meer" (afkap van de conflictdatum-lijst; plural)

Alle teksten via `t(...)`; niets hardgecodeerd (ook de "/" tussen piek en capaciteit is opmaak,
geen tekst).

## 9. Documentatie (vraag g)

- **Nieuw artikel `gids-bezettingsoverzicht.md`** in `public/docs/nl/` én `public/docs/en/`
  (minimum dat `verify:docs` hard eist; de overige twaalf talen volgen in de maandelijkse
  vertaalronde), plus een manifest-entry in `public/docs/manifest.json` met `layer: "gidsen"` en
  titels in veertien talen.
- Inhoud binnen de miniMarkdown-subset (géén tabellen, géén blockquotes, géén h4): koppen,
  paragrafen en enkelvoudige lijsten. Kern: wat het overzicht toont, hoe dubbelbezetting
  gedefinieerd is (som over documenten vs. bedrijfscapaciteit van het poolitem), de
  ⚠-stale-markering en wat eraan te doen (F5), en — prominent, eigen kop — de beperking
  "alleen deze machine" met een `docs://gids-resourcebibliotheken`-verwijzing naar de bekende
  beperkingen. Ook de variant-eigenaardigheid uit §5 hoort hier.
- `gids-resourcebibliotheken.md` (nl+en) krijgt één alinea + `docs://gids-bezettingsoverzicht`-
  link in de sectie over meerdere projecten.
- `docs/library.md` ("Bekende beperkingen" punt 2) wordt bijgewerkt: het bezettingsoverzicht
  bestaat nu, de machine-grens blijft er letterlijk in staan.

## 10. Tests (vraag h)

De aggregatiekern is puur en dus volledig headless testbaar; hij hoort in de bestaande
bibliotheeksuite. Model: `tests/library/run.sh` bundelt elke `check-*.ts` met esbuild
(alias `@` → `src`), draait op Node, exitcode is de poort.

**Nieuw: `tests/library/check-occupancy.ts`**, geregistreerd als extra `run_check`-regel in
`tests/library/run.sh` en gedekt door `tsconfig.check.json`. Cases (fixtures als handgebouwde
`OccupancyDocInput`-arrays + een minimale `CompanyPool`):

1. Twee documenten boeken hetzelfde poolitem met overlappende dagen; som > `maxUnits` ⇒ de
   juiste `conflictDays`, juiste `totalPeak`/`capacityAtPeak`, beide documenten in `docs`.
2. Zelfde overlap maar som ≤ capaciteit ⇒ géén conflictdagen (grensgeval som == capaciteit is
   géén conflict — `>`, niet `≥`).
3. `availabilitySteps` op het poolitem: capaciteit daalt halverwege ⇒ conflict alléén ná de stap
   (bewijst `maxUnitsOn`-op-poolitem).
4. Stempel van een ándere bibliotheek en een document met `companyId: null` ⇒ dragen niets bij.
5. Wees (stempel wijst naar verwijderd poolitem) ⇒ geen rij.
6. Twee poolitems met identieke naam maar verschillende id's ⇒ blijven twee losse rijen
   (bewijst id-matching, nooit naam).
7. `scheduleStale`-document ⇒ telt mee én `anyStale`/`OccupancyDocBooking.scheduleStale` staan.
8. Binnen-document-overbezetting in één document ⇒ verschijnt als conflict (§6 punt 2).
9. Curve-consistentie: een `FRONT_LOADED`-toewijzing levert per dag exact dezelfde bijdrage als
   `computeResourceLoad` voor dat document alleen (som-invariant).

De i18n-sleutels worden vanzelf bewaakt door `npm run verify:i18n` (pluralcategorieën) en het
artikel door `npm run verify:docs`. De UI-kant (derde schakelstand, uitklap) is Tier-1
zelftestbaar via `window.__OPS__` tegen de browser-dev-build (store-asserties op
`ui.resourcesView`), maar krijgt geen eigen geautomatiseerde poort — conform de bestaande lijn
dat gedragspoorten headless zijn.

## 11. Buiten scope (bewust)

- **Schrijfacties vanuit het overzicht** — geen nivellering, geen toewijzingen bewerken, geen
  "los dit conflict op"-knop. Leesvenster.
- **Sync tussen machines** — apart vervolgproject (zie `docs/library.md`); B1b documenteert de
  machine-grens alleen zichtbaar.
- **B2-scenario's** — overlays/varianten-vergelijking staan hier volledig los van.
- **Bedrijfsoverstijgende overzichten** — gesloten besluit (§2 punt 1).
- **Opgeslagen-maar-niet-geopende bestanden meetellen** — zou een bestandsindex/scan vergen;
  het overzicht gaat expliciet over *open* documenten.
- **Cross-document solve / `createAppStore()`-factory** — item 41 blijft achteraan de roadmap.

## 12. Bewust later

- **Tijdlijn-/histogramweergave** van de bezetting (canvas of mini-SVG per rij) — pas als de
  tabel in gebruik aantoonbaar tekortschiet.
- **Bibliotheekkiezer voor losse documenten** zodat het overzicht ook zonder gekoppeld actief
  document te openen is.
- **Per-docId-memoisatie** van de per-document-load (payload-referentie als sleutel) — alleen
  nodig bij extreem veel open documenten.
- **MCP-leestool** (`planner_get_library_occupancy`) bovenop dezelfde pure kern — triviaal
  additief zodra iemand het vraagt.
- **Doorspring-actie** ("activeer dit document en selecteer de resource") vanuit een
  uitklapregel — handig, maar raakt documentwissel-choreografie en is geen leesactie meer.

## 13. Beslispunten voor de eigenaar

Geen. De drie punten die eerder open leken zijn hierboven onderbouwd gekozen: plaats
(derde weergave in de Resources-tab, §3), capaciteitsbron (het poolitem via `maxUnitsOn`, §6)
en het stale-beleid (meetellen met zichtbare markering, §4.3). Bezwaar tegen één van die
keuzes hoort in een reviewronde op dit document.
