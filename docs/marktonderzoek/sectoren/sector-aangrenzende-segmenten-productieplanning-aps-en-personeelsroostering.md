# Sectorrapport: Aangrenzende segmenten — productieplanning (APS) en personeelsroostering

**Onderzoeksdatum:** 25 juli 2026
**Scope:** Advanced Planning & Scheduling (APS, productieplanning) en Workforce Management / personeelsroostering (WFM)
**Positionering:** Dit zijn **aangrenzende** markten, géén deelmarkten van projectplanning. De afbakening staat centraal in dit rapport (zie §0 en §1.5).

> **Methodologische waarschuwing vooraf.** Dit rapport is opgesteld met een uitgeputte WebSearch-quota; alle research is gedaan via directe `WebFetch`-calls op leveranciers-, analisten- en vakperspagina's en via een zoekmachine-proxy (`lite.duckduckgo.com`). Voor de meeste APS- en WFM-leveranciers geldt dat zij **geen publieke prijslijst voeren** ("contact sales"). Waar prijzen genoemd worden komen die uit derde-partij-benchmarks (ITQlick, PricingNow, OutSail, VendorBenchmark, supplychainresearch.com), die zelf aggregaties/schattingen zijn. Elke schatting is expliciet als **[SCHATTING]** gemarkeerd. Marktomvangcijfers van de tweede- en derderangs onderzoeksbureaus (Verified Market Reports, Dataintelo, Exactitude, Custom Market Insights e.d.) lopen onderling met een factor 5 uiteen en moeten met wantrouwen gelezen worden; ik behandel de spreiding expliciet in §4.

---

## 0. Kernconclusie vooraf (management summary)

**Waarom dit een ANDERE markt is dan projectplanning — in één alinea.**
Projectplanning (Primavera P6, MS Project, Asta Powerproject, Open Planner Studio) plant **unieke, eenmalige werkstromen met een begin en een eind**, waarbij het rekenmodel het **kritieke pad (CPM)** is en resources in principe **oneindig** worden verondersteld — het Project Management Institute stelt letterlijk dat "Critical Path Analysis is limited in its assumption that projects have infinite capacity" ([PMI](https://www.pmi.org/learning/library/resource-scheduling-capacity-schedule-construction-5376)). APS plant daarentegen **repetitieve, continue productiestromen** met **eindige capaciteit**: Microsoft omschrijft finite capacity scheduling als planning die "takes into account the actual constraints of resources, ensuring that tasks are scheduled based on real-world availability" ([Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/planning-optimization/finite-capacity)). Personeelsroostering (WFM) plant weer iets anders: **wie werkt wanneer**, met als harde randvoorwaarden arbeidsrecht en CAO's, niet technische volgorde-afhankelijkheden.

De drie markten verschillen op vijf assen tegelijk: **planningsobject** (taak vs. order vs. persoon), **tijdshorizon** (jaren vs. dagen-weken vs. weken), **rekenmodel** (CPM/PERT vs. constraint-optimalisatie vs. rostering-optimalisatie), **koper** (projectorganisatie vs. operations/supply chain vs. HR/operations), en **contractuele context** (EVMS/DCMA/claimanalyse vs. ISA-95/OTIF vs. arbeidswetgeving/fair-workweek).

**Omvang (2025, met grote spreiding — zie §4):**

| Segment | Ordegrootte 2025 | Verhouding tot projectplanning |
|---|---|---|
| APS (productieplanning, engbegrensd) | ~USD 1,0–2,5 mrd | Kleiner dan PPM |
| Supply chain planning (breder, incl. APS-suites) | ~USD 8–12 mrd | Groter dan PPM |
| Workforce Management / roostering | ~USD 8–10 mrd *(gecorrigeerd, zie §4.3)* | Vergelijkbaar tot matig groter dan PPM |
| *Ter vergelijking:* PPM/projectportfoliosoftware | ~USD 6,4–8,3 mrd *(gecorrigeerd met IDC, zie §4.4)* | (referentie) |

Bronnen per cijfer in §4.

**Belangrijkste opening voor een open-source, IFC-gebaseerde planner:** níét het APS- of WFM-hart zelf (daar zit diepe domeinlogica en een vendorlock die je met een IFC-planner niet aanvalt), maar de **naad**: prefab/modulaire bouw waar bouwplanning (IFC/BIM) en fabrieksplanning (APS) elkaar raken en waar vandaag geen standaarduitwisseling bestaat. Zie §7.

---

## 1. Wat maakt deze sectoren bijzonder qua planning

### 1.1 Schaal en granulariteit

**APS/productieplanning:**
- Planningsobject is de **productieorder / werkorder / batch**, doorvertaald naar **operaties op machines**, niet naar "taken" in een WBS.
- Volumes: een middelgrote discrete fabriek plant routinematig duizenden tot tienduizenden operaties per weekhorizon; frePPLe prijst zelfs expliciet op basis van "the number of active item x location pairs" ([frePPLe pricing](https://frepple.com/pricing/)) — de prijsbasis is geverifieerd, de eerder genoemde **drempel van 20.000 paren is dat niet** en moet als onzeker gelden — een schaalmaat die in projectplanning niet bestaat.
- Herplanning is **continu**: een APS-plan wordt in de praktijk dagelijks tot per shift herrekend, waar een bouwplanning maandelijks of per baseline-revisie wordt bijgewerkt.

**WFM/roostering:**
- Planningsobject is de **shift/dienst** gekoppeld aan een **individu**; schaal is het aantal medewerkers, niet het aantal taken. UKG bedient organisaties tot honderdduizenden medewerkers; prijsmodellen zijn PEPM (per employee per month), zie §3.
- De EU-maakindustrie alleen al telt volgens Eurostat **2,2 miljoen ondernemingen met 30,3 miljoen werkzame personen in 2023** ([Eurostat, Businesses in the manufacturing sector](https://ec.europa.eu/eurostat/statistics-explained/SEPDF/cache/10086.pdf)) — dat is de ordegrootte van de te roosteren populatie in alleen deze sector, in alleen Europa.

### 1.2 Doorlooptijd en horizon

| | Projectplanning (bouw/infra) | APS | WFM/roostering |
|---|---|---|---|
| Horizon | 1–10+ jaar | 1 dag – 12 weken (detail), 3–18 maanden (S&OP) | 1–8 weken vooruit |
| Herplanfrequentie | per baseline-revisie / maandelijks | dagelijks tot per shift | wekelijks, met dag-realtime aanpassing |
| Levensduur van het plan | het plan overleeft het project | het plan is de dag erna verouderd | het rooster wordt lopend gepatcht |

Dit verschil in **planlevensduur** is de belangrijkste reden waarom de tooling niet uitwisselbaar is. Projectplanning-tools zijn geoptimaliseerd voor **traceerbaarheid en verantwoording achteraf** (baselines, revisiehistorie, claimanalyse). APS-tools zijn geoptimaliseerd voor **hersnelheid** — buyers-guides adviseren expliciet om "re-optimization speed at actual data volumes" met de leverancier te testen ([supplychainresearch.com, Buyer's Guide Production Scheduling & APS](https://supplychainresearch.com/research-library/buyers-guide-production-scheduling-aps)).

### 1.3 Resourcecomplexiteit — hier zit het echte verschil

Waar een bouwplanning per taak een handvol resources kent (ploeg, kraan, materiaal), moet een APS-engine gelijktijdig modelleren:

- **Sequence-dependent setup times** — omsteltijd hangt af van wát er daarvóór op de machine liep (kleurvolgorde in coating, allergenenvolgorde in food).
- **Tooling / matrijzen / gereedschap** als aparte, schaarse, verplaatsbare resource.
- **Gekwalificeerd personeel** als secundaire constraint bovenop machinecapaciteit.
- **Houdbaarheid / shelf life** en tijdsgekoppelde processen (fermentatie, uitharden) — harde min/max wachttijden tussen operaties.
- **Alternatieve routings** en machine-eligibility: dezelfde operatie kan op meerdere, ongelijkwaardige machines.
- **Campagne-/batchvorming**: economische lotgrootte, minimum run lengths.

De buyers-guide vat de selectie-eis samen als: "Prove the engine can represent your sequence-dependent setups, tooling, labor, and shelf life before scaling" ([supplychainresearch.com](https://supplychainresearch.com/research-library/buyers-guide-production-scheduling-aps)).

**Géén van deze constraints heeft een equivalent in CPM.** CPM kent alleen FS/SS/FF/SF-relaties met lead/lag en (in de betere implementaties) resource-levelling als na-de-feit-heuristiek. Dat is een fundamenteel ander wiskundig probleem: CPM is een **langste-pad-berekening in een DAG** (polynomiaal, exact oplosbaar), APS is een **job-shop/flexible-job-shop scheduling probleem** (NP-hard, in de praktijk opgelost met constraint programming, metaheuristieken of dispatching rules).

Bij WFM is de resourcecomplexiteit weer anders van aard: **de resource is een mens met rechten**. Beschikbaarheidsvoorkeuren, contracturen, skills/bevoegdheden (BIG-registratie, heftruckcertificaat), eerlijkheid van de verdeling van onaantrekkelijke diensten, en harde wettelijke rustregels.

### 1.4 Contractuele en wettelijke eisen

**APS — geen contractuele planningsstandaard, wél integratiestandaarden.**
Er bestaat in productieplanning **geen equivalent van EVMS/EIA-748 of DCMA 14-point**. Wat er wél is:
- **ISA-95 / IEC 62264** — de standaard voor enterprise-control-integratie die de IT-stack in vijf niveaus (0–4) en vier operationele domeinen indeelt; scheduling zit op Level 3/4-grens ([ISA](https://www.isa.org/), [symestic.com ISA-95 uitleg](https://symestic.com)).
- **B2MML** — de XML-implementatie van ISA-95, feitelijk de "P6 XML" van de maakindustrie: het uitwisselingsformaat tussen ERP en MES/APS ([MESA International](https://mesa.org)).
- **ISA-88 (batch control)** voor procesindustrie-recepturen.
- Contractueel wordt niet gestuurd op planningskwaliteit maar op **prestatie-KPI's**: OTIF (on-time in-full), leverbetrouwbaarheid, servicelevel, voorraadomloopsnelheid.

**WFM — hier is de regelgeving juist de kern van het product.**
- **EU-Arbeidstijdenrichtlijn 2003/88/EG**: gemiddeld max. 48 uur per week, **11 aaneengesloten uren dagelijkse rust**, min. 4 weken betaald verlof, plus nachtarbeidbeperkingen ([Europese Commissie, Working Time Directive](https://employment-social-affairs.ec.europa.eu/policies-and-activities/rights-work/labour-law/working-conditions/working-time-directive_en); [Your Europe](https://europa.eu/youreurope/business/hiring-managing-staff/general-employment-terms-conditions/working-hours/index_en.htm)).
- **Registratieplicht** van gewerkte uren, met per-lidstaat verschillende implementaties ([DLA Piper, Recording working hours across the EU, 2024](https://www.dlapiper.com/en/insights/publications/2024/03/recording-working-hours-requirements-across-the-european-union)).
- **Nederland specifiek**: Arbeidstijdenwet + Arbeidstijdenbesluit, plus **CAO-specifieke** roosterregels (toeslagen, minimale dienstlengte, aankondigingstermijn). Roostersoftware in NL wordt praktisch geselecteerd op *welke CAO's zij out-of-the-box ondersteunt*.
- **VS: predictive scheduling / fair workweek**. Inmiddels handhaven **11 Amerikaanse jurisdicties** predictive-scheduling-wetgeving, met eisen als voorafgaande aankondiging van roosters, "predictability pay" bij last-minute wijzigingen, recht op rust en verbod op "clopening"-diensten ([Rippling](https://rippling.com/blog/predictive-scheduling-laws), [Paycor city-by-city guide](https://www.paycor.com/resource-center/articles/predictive-work-schedule-laws-a-city-by-city-guide/), [WorkAxle 2026](https://workaxle.com/blog/predictive-scheduling-laws-2026)).

Dit is de spiegelbeeldige situatie van projectplanning: daar zit de compliance in **hoe je het plan opbouwt en verantwoordt** (DCMA 14-point, EVMS), hier zit de compliance in **wat het plan een mens aandoet**.

### 1.5 Kosten van vertraging — een orde van grootte anders dan in bouwprojecten

Dit is misschien wel het scherpste onderscheid, en het verklaart de betalingsbereidheid (§3).

- **Automotive**: Siemens' *True Cost of Downtime 2024* rapporteert **USD 2,3 miljoen per uur** ongeplande stilstand — een verdubbeling t.o.v. 2019 ([Siemens TCOD-2024 PDF](https://assets.new.siemens.com/siemens/assets/api/uuid:1b43afb5-2d07-47f7-9eb7-893fe7d0bc59/TCOD-2024_original.pdf), letterlijk: "In Automotive, unplanned downtime now costs $2.3 million an hour"; zie ook [Siemens blog, juli 2024](https://blog.siemens.com/2024/07/the-true-cost-of-an-hours-downtime-an-industry-analysis/)). ✅ geverifieerd in de primaire PDF.
- Siemens becijfert de jaarlijkse stilstandkosten van één automotive-productielijn op **USD 695 miljoen** — letterlijk: "the cost of an idle production line at a big plant is now $695 million a year, 1.5 times higher than five years ago"; heavy industry ter vergelijking $59 mln ([Siemens TCOD 2024](https://assets.new.siemens.com/siemens/assets/api/uuid:1b43afb5-2d07-47f7-9eb7-893fe7d0bc59/TCOD-2024_original.pdf)). ✅ geverifieerd.
- **FMCG**: ca. **USD 39.000 per uur** — let op: dit cijfer komt uit *True Cost of Downtime **2022*** ("a lost hour now ranges from an average of $39,000 for factories producing Fast Moving Consumer Goods"), níét uit de 2024-editie. TCOD 2024 kwantificeert FMCG niet apart en stelt alleen dat de kosten daar "stayed stable" en onder het niveau van 2019 liggen ([Siemens TCOD 2022 PDF](https://assets.new.siemens.com/siemens/assets/api/uuid:3d606495-dbe0-43e4-80b1-d04e27ada920/TCOD-2024_original.pdf) — deze asset-URL heet weliswaar `TCOD-2024` maar bevat de 2022-editie).
- **Grote ondernemingen algemeen**: ca. **USD 1,425 miljoen per uur** (BigPanda 2024, geciteerd via [Erwood Group](https://erwoodgroup.com/blog/)).

Vergelijk dit met bouw: daar wordt vertragingsschade *per dag* uitgedrukt (liquidated damages, doorgaans €5.000–€50.000/dag voor grote werken) en wordt hij **juridisch uitgevochten** in claimanalyses die maanden duren. In productie is de schade **per uur, direct meetbaar, en niemand claimt** — je verliest gewoon marge. Het gevolg: in de bouw investeer je in planningssoftware om **je gelijk te kunnen bewijzen**; in productie investeer je in planningssoftware om **de machine niet stil te laten staan**. Dat is een ander verkoopverhaal, een andere ROI-berekening en een andere koper.

Bij WFM is de "kosten van vertraging" weer anders: onderbezetting kost omzet en servicelevel, overbezetting kost direct loonkosten. De ROI wordt bijna altijd uitgedrukt als **percentage bespaarde loonkosten** (typisch 1–5% van de loonsom), wat bij een retailketen met 20.000 medewerkers al snel tientallen miljoenen is — en dat is precies waarom UKG en Workday PEPM-prijzen kunnen vragen die in projectplanning ondenkbaar zijn.

---

## 2. Welke software wordt hier daadwerkelijk gebruikt, in welke rangorde, en door wie

### 2.1 APS — de lagen van de markt

De meest bruikbare indeling komt uit de onafhankelijke buyer's guide van supplychainresearch.com, die de markt in **vier lagen** verdeelt ([bron](https://supplychainresearch.com/research-library/buyers-guide-production-scheduling-aps)):

| Laag | Leveranciers | Typische koper |
|---|---|---|
| **Specialisten** (detailed scheduling) | **Siemens Opcenter APS** (voorheen Preactor), **DELMIA Quintiq / Ortems** (Dassault), **Asprova** | Fabriek/plant-niveau; productieplanner, operations manager |
| **Enterprise suites** (supply chain planning) | Kinaxis, o9 Solutions, SAP (IBP/PP-DS), Blue Yonder, Oracle, OMP, AspenTech | Concern-niveau; VP Supply Chain, S&OP-organisatie |
| **Mid-market** | **PlanetTogether**, Logility (Aptean), RELEX, GAINS | Mid-market fabrikant, vaak naast bestaand ERP |
| **ERP-embedded** | Plex (Rockwell), Infor, QAD, Microsoft Dynamics 365 | Bestaande ERP-klant die "goed genoeg" wil |

**Rangorde naar omzetkracht** (feitelijke revenue-cijfers, niet marktaandeelclaims):
1. **Blue Yonder** — USD 1,42 mrd omzet FY2025, 10,4% SaaS-groei ([BriefGlance](https://briefglance.com/companies/blue-yonder-group-inc/pulses/31408)).
2. **SAP / Oracle** — geen losse APS-omzet gepubliceerd; APS zit in bredere suites.
3. **Kinaxis** — USD 548,0 mln totale omzet FY2025 (+13%), waarvan USD 362,4 mln SaaS (+17%) ([Kinaxis persbericht Q4 2025](https://www.kinaxis.com/en/news/press-releases/2026/kinaxis-inc-reports-record-fourth-quarter-2025-results)).
4. **o9 Solutions** — private; geen betrouwbaar publiek omzetcijfer gevonden.
5. **Siemens Opcenter APS, DELMIA Ortems, Asprova, PlanetTogether** — de eigenlijke "detailed scheduling"-specialisten, elk met omzet die vermoedelijk in de **tientallen miljoenen** ligt **[SCHATTING]**.

**Gartner Magic Quadrant Supply Chain Planning Solutions 2025 — Leaders:** Kinaxis (11e opeenvolgende keer, [Kinaxis](https://www.kinaxis.com/en/news/press-releases/2025/kinaxis-recognized-leader-2025-gartnerr-magic-quadranttm-supply-chain)), o9 Solutions ([o9](https://o9solutions.com/news/o9-named-a-leader-in-the-2025-gartner-magic-quadrant-for-supply-chain-planning-solutions)), Blue Yonder (12e opeenvolgende keer, "furthest in Completeness of Vision", [BusinessWire, 21 apr 2025](https://www.businesswire.com/news/home/20250421590060/en/)) en **OMP** ("positioned highest for Ability to Execute", 10e opeenvolgende keer, [OMP](https://omp.com/news-events/news/2025/omp-highest-for-ability-to-execute-in-gartner-magic-quadrant-for-supply-chain-planning-solutions)). *Correctie t.o.v. eerdere versie:* OMP ontbrak in deze lijst en is wél aantoonbaar leidend; **SAP als Leader is in deze verificatieronde niet bevestigd** — behandel dat als onzeker. Let op: dit MQ gaat over **supply chain planning**, niet over detailed scheduling — de specialisten (Opcenter APS, Asprova, Ortems) komen hier niet in voor. Dat is zelf een signaal: de detailed-scheduling-niche is analistisch onderbelicht.

### 2.2 De vier genoemde APS-spelers, in detail

**Siemens Opcenter APS (voorheen SIMATIC IT Preactor / Preactor International).**
Siemens nam Preactor over in 2013 en hernoemde het tot Opcenter APS binnen de Opcenter MOM-portfolio. Modulair opgebouwd rond Advanced Planner (grofplanning, capaciteitsanalyse) en Advanced Scheduler (fijnplanning, finite capacity, Gantt-gebaseerde interactieve planbord). App-id-niveau: verkocht als standalone én als onderdeel van de Opcenter/Teamcenter-stack. Prijzen zijn niet publiek; ITQlick meldt "Pricing is tailored to each organization's specific needs, making it challenging to provide exact figures without a detailed consultation" ([ITQlick Preactor pricing](https://www.itqlick.com/preactor-aps/pricing)).
*Gebruikt door:* discrete en procesfabrikanten, sterk in automotive-toelevering, machinebouw, food. Verkocht via Siemens Digital Industries Software-partners.

**Asprova (Asprova Corporation, Japan).**
De volumeleider in Japan. Claims: **52,4% aandeel in de Japanse SCM-markt** — ⚠️ **gecorrigeerd: dit cijfer komt uit een BusinessWire-persbericht van 9 april 2013**, dus dertien jaar oud, zonder vermelding van onderzoeksbron of methodologie ([BusinessWire China](https://www.businesswirechina.com/en/news/24408.html)). Niet bruikbaar als actueel marktaandeel. En een installed base die per bron varieert van "over 1.800 sites worldwide" ([Asprova profiel](https://www.asprova.com/en/about/profile/)) via "over 2.200 installations" ([Panasonic Connect](https://connect.panasonic.com/en/products-services_fa/solutions/mom/asprova)) en "over 3.000 implementations" ([IPROS](https://mono.ipros.com/en/product/detail/254501012/)) tot **3.624 fabrieken wereldwijd per januari 2024** ([Asprova implementation status](https://asprova.net/implementation-status-en/)). De spreiding komt door verschil tussen "sites", "installaties" en "licenties"; het meest recente en meest specifieke cijfer (3.624 fabrieken, jan-2024) is het bruikbaarst.
Modules: APS, MS, MS Light, MRP, SED, MES, BOM, NLS/DS, SCM ([Asprova FAQ prijslijst](https://www.asprova.com/en/faq/implementation-considerations/000462-2.html)).
*Gebruikt door:* automotive, halfgeleiders, elektronica, food; sterk in Japan, China en 30+ landen. Distributie loopt via partners/distributeurs ("for quotations, please inquire with Asprova's distributors").

**DELMIA Ortems (Dassault Systèmes).**
Gepositioneerd als "an advanced planning and scheduling solution that helps manufacturers improve agility, profitability and on-time delivery" ([3DS](https://www.3ds.com/products/delmia/ortems)). Onderdeel van de DELMIA-portfolio naast DELMIA Quintiq (de zwaardere, modelleerbare optimalisatiesuite). Verkocht via het Dassault-partnernetwerk (GoEngineer, TECHNIA, Andea, Jade Global/D4M, Persistent Systems). Geen publieke prijzen.
*Gebruikt door:* fabrikanten die al in de 3DEXPERIENCE/CATIA-wereld zitten — dat is de belangrijkste koopreden.

**PlanetTogether.**
De mid-market referentie. Belangrijke recente ontwikkeling: **CAI Software LLC heeft PlanetTogether overgenomen, aangekondigd 24 juni 2026** ([PR Newswire](https://www.prnewswire.com/news-releases/cai-software-acquires-planettogether-strengthening-advanced-planning-and-scheduling-capabilities-across-manufacturing-302809997.html); [STG](https://stg.com/news/cai-software-acquires-planettogether-strengthening-advanced-planning-and-scheduling-capabilities-across-manufacturing/)). *Let op:* een veelvoorkomend misverstand is dat AVEVA PlanetTogether zou hebben overgenomen — dat is onjuist; AVEVA en PlanetTogether hebben een **strategisch partnerschap** waarbij PlanetTogether APS als APS-laag boven AVEVA MES draait ([AVEVA productpagina](https://www.aveva.com/en/products/planettogether-aps/)). PlanetTogether publiceert geen prijzen en hanteert een consultatief verkoopmodel ([eigen pricing-pagina](https://www.planettogether.com/pricing)).
*Gebruikt door:* mid-market discrete en procesfabrikanten, met sterke ERP-integratiepositionering (naast AVEVA ook Microsoft Dynamics, SAP, NetSuite, Epicor).

**Open source in APS: frePPLe.**
Relevant als benchmark voor open-source-positionering. frePPLe biedt een "fully functional open source Community Edition" plus Enterprise- en Cloud-edities ([frePPLe editions](https://frepple.com/editions/), [GitHub](https://github.com/frePPLe/frepple)). Prijsstelling op basis van "the number of active item x location pairs" en gekozen modules; publiek genoemde dienstenprijzen: **Proof of Concept €2.000–€5.000** (1–2 weken) en **implementatieproject €5.000–€25.000**, met 15% korting bij jaarfacturatie ([frePPLe pricing](https://frepple.com/pricing/)). Dit is het enige open-source-precedent in dit segment met een werkend commercieel model — waardevol als referentie voor Open Planner Studio.

### 2.3 WFM/roostering — rangorde

**Marktaandelen (2024/2025):**
- Wereldwijde WFM-markt: **USD 8,7 mrd in 2024**, +12,1% j-o-j; de **top-10 leveranciers houden samen 51,4%** van de markt ([Apps Run the World, Top 10 WFM Vendors](https://www.appsruntheworld.com/top-10-workforce-management-vendors-market-forecast-and-customer-wins/) — let op de gecorrigeerde URL). ⚠️ **Belangrijk:** ARTW's eigen *prognose* is $12,1 mrd in 2029 bij een **CAGR van 6,8%** — fors lager dan de 9–11% die de overige bureaus hanteren. De 12,1% is de j-o-j-groei in 2024, géén CAGR (zie de correctie in §4.3).
- **UKG is nummer 1 met ca. 27% marktaandeel** (Apps Run the World, top-10-pagina). ⚠️ **Onzeker:** ARTW publiceert elders zelf een afwijkend cijfer — "UKG's lead in the worldwide workforce management market stands unchanged at a solid **24%** in 2024", bij een totale markt van **$7.951 mln** en +8,4% groei ([ARTW, UKG Overhauls Operations](https://www.appsruntheworld.com/ukg-overhauls-operations-as-ceo-makes-preemptive-moves/)). Twee onverenigbare ARTW-cijferreeksen voor hetzelfde jaar; behandel zowel de 27% als de $8,7 mrd met voorbehoud. Een alternatieve schatting van Verified Market Reports komt uit op 12–15% — dat verschil zit in marktdefinitie (pure WFM vs. WFM binnen HCM).
- Volgorde daarna: **Workday, ADP, Dayforce (Ceridian)**.
- **Nucleus Research WFM Technology Value Matrix 2025** noemt als leiders: Blue Yonder, Dayforce, Infor, UKG Pro WFM, WorkForce Software (ADP), Zebra Technologies ([Nucleus Research](https://nucleusresearch.com/)).

**Segmentatie naar koper:**

| Segment | Typische leveranciers | Koper |
|---|---|---|
| Enterprise (>5.000 medewerkers) | UKG Pro WFM, Workday, Dayforce, WorkForce Software/ADP, Infor | CHRO + COO, met IT |
| Retail/hospitality-specialisten | Blue Yonder WFM, Legion, Zebra Reflexis, **Quinyx** | Retail operations director |
| Zorg / nurse rostering | symplr, UKG, ShiftWizard, Ortec Workforce Scheduling | Zorgmanager, capaciteitsplanner |
| SMB / horeca / retail-mkb | **Planday** (Xero), Deputy, When I Work, **Shiftbase** (NL), 7shifts | Ondernemer/vestigingsmanager |
| Open source / solver | **Timefold Solver** (fork van OptaPlanner, Apache 2.0) | Ontwikkelaar/ISV die zelf bouwt |

**Timefold/OptaPlanner** verdient aparte vermelding als open-source-referentie: de kern-solver blijft Apache License 2.0 ("fully functional"), maar bij versie 2.0 zijn de explainability-API's naar een commerciële editie verplaatst ([Timefold Solver](https://timefold.ai/solver), [GitHub](https://github.com/TimefoldAI/timefold-solver), [bytecode.news analyse van Solver 2.0](https://www.bytecode.news/posts/2026/04/timefold-solver-2-0)). Dit is precies het open-core-dilemma waar elk open-source planningsproject tegenaan loopt.

**Zorg-subsegment omvang:** de wereldwijde healthcare staffing & scheduling-markt was **USD 2,53 mrd in 2024**, richting USD 5,36 mrd in 2030 ([Grand View Research](https://www.grandviewresearch.com/market-trends/healthcare-staffing-scheduling-software-market-competitive-database)); de Amerikaanse deelmarkt **USD 1,14 mrd in 2024** → USD 3,12 mrd in 2033 ([Novaone Advisor](https://www.novaoneadvisor.com/report/us-healthcare-staffing-scheduling-software-market)). Specifiek "nurse scheduling software": USD 1.129,5 mln in 2025 → USD 2.500 mln in 2035 ([WiseGuy Reports](https://www.wiseguyreports.com/reports/nurse-scheduling-software-market)).

### 2.4 Wie koopt wat — vertaald naar de projectbouw-rollenindeling

De rolindeling uit projectplanning (opdrachtgever / hoofdaannemer / onderaannemer / engineeringbureau) heeft **geen zuivere tegenhanger** in deze markten. De naaste equivalenten:

| Bouwrol | APS-equivalent | WFM-equivalent |
|---|---|---|
| Opdrachtgever | OEM / merkeigenaar die bij toeleveranciers plancapaciteit afdwingt | Concern-HR die de standaard oplegt aan werkmaatschappijen |
| Hoofdaannemer | De fabriek/plant zelf (de planner die het APS bedient) | De operationele vestiging/winkel/afdeling |
| Onderaannemer | Contract manufacturer / toeleverancier, vaak *zonder* eigen APS | Uitzend-/detacheringspartij, gekoppeld via API |
| Engineeringbureau | Systemintegrator / APS-implementatiepartner (Andea, TECHNIA, D4M, M&I Systems, Waterloo Software) | HCM-implementatiepartner (Deloitte, Alight, Kainos voor Workday) |

Het feit dat deze mapping wringt is zelf het bewijs van de marktscheiding: in de bouw is planning een **contractueel artefact tussen partijen**, in productie en roostering is planning een **intern besturingsinstrument**.

---

## 3. Wat wordt ervoor betaald

### 3.1 APS — prijsniveaus

Alle APS-specialisten hanteren "contact sales". Wat er publiek te vinden is:

| Bron | Cijfer | Aard |
|---|---|---|
| ITQlick | APS "starts at **$30.000 per license**" | Aggregatie; startprijs, categoriebreed |
| PricingNow (Asprova) | **1 gebruiker: $15.000+/jaar**; **10 gebruikers: $45.000+/jaar**; **100 gebruikers: $150.000+/jaar** | Geschat, niet-officieel |
| PricingNow (Asprova) | **3-jaars TCO $60.000 – $500.000+** incl. licenties, implementatie, training, onderhoud | Geschat |
| PricingNow (Asprova) | Jaarlijkse indexatie **3–5%** | Geschat |
| supplychainresearch.com | Mid-market per-user-abonnement **$200–$400 per gebruiker per maand** | Buyer's guide |
| supplychainresearch.com | Specialisten: "tens of thousands for platform or site licenses" als startpunt | Buyer's guide |
| frePPLe (open source, publiek) | PoC **€2.000–€5.000**; implementatie **€5.000–€25.000**; 15% korting bij jaarfacturatie | Officiële prijslijst |

Bronnen: [PricingNow Asprova](https://pricingnow.com/question/asprova-pricing/), [ITQlick APS pricing](https://www.itqlick.com/), [supplychainresearch.com buyer's guide](https://supplychainresearch.com/research-library/buyers-guide-production-scheduling-aps), [frePPLe pricing](https://frepple.com/pricing/), [Asprova FAQ over prijs en implementatiekosten](https://www.asprova.com/en/faq/implementation-considerations/000462-2.html).

**Typische contractwaarde [SCHATTING], op basis van bovenstaande:**
- **Mid-market APS (PlanetTogether-klasse), één fabriek, 3–8 planners:** eerste jaar **USD 60.000–150.000** (licentie/abonnement + implementatie), daarna USD 25.000–60.000/jaar.
- **Specialist APS (Opcenter APS / Asprova / Ortems), één plant:** eerste jaar **USD 100.000–350.000**, meerdere plants USD 0,5–2 mln.
- **Enterprise SCP-suite (Kinaxis/o9/Blue Yonder):** **USD 0,5–5 mln per jaar**, met implementaties die vaak meer kosten dan de licentie.

**Implementatie-/trainingskosten.** Asprova bevestigt expliciet dat naast de pakketprijs "the cost of operation education, consultation about implementation, system integration, and other costs will be required" ([Asprova FAQ](https://www.asprova.com/en/faq/implementation-considerations/000462-2.html)). De buyer's guide stelt dat de grootste implementatie-inspanning zit in "modeling the plant's real constraints and connecting the ERP above and execution below" ([supplychainresearch.com](https://supplychainresearch.com/research-library/buyers-guide-production-scheduling-aps)). **[SCHATTING]** Verhouding implementatie : licentie ligt in APS typisch tussen **1:1 en 3:1** — hoger dan in projectplanning (waar 0,3:1 gebruikelijk is), omdat het constraintmodel per fabriek uniek is.

### 3.2 WFM/roostering — prijsniveaus (hier is veel meer transparantie)

| Leverancier | Prijs | Bron |
|---|---|---|
| **UKG Pro** | **$27–$37 PEPM** (per employee per month) | [OutSail](https://www.outsail.co/post/how-much-does-ukg-cost) |
| UKG Pro (enterprise-range) | $26–$41 PEPM | OutSail |
| **UKG Ready** (mid-market) | **$20–$27 PEPM** | OutSail |
| UKG Pro (startrate) | $40 per medewerker/maand | [ITQlick](https://www.itqlick.com/ukg/pricing) |
| UKG implementatiekosten | **40–70% van de softwarekosten van jaar 1** (UKG Pro); 20–40% voor overige UKG-producten | OutSail |
| **Workday** | **$35–$100+ PEPM**; HCM-only ca. $35–45 PEPM op schaal; ITQlick meldt vanaf **$34/medewerker/maand** | [CostBench](https://costbench.com/software/hr/workday/), [ITQlick Workday](https://www.itqlick.com/workday/pricing) |
| Workday mediaan jaarcontract | ca. **$50.000/jaar** (op basis van 345 geverifieerde aankopen); range **$19.500 – $530.000** | [VendorBenchmark](https://vendorbenchmark.com/blog/workday-pricing-benchmark-per-employee) |
| Workday verborgen kosten | ca. **+45%** boven de offerte | CostBench |
| **Quinyx** | **$3–$8 PEPM** standaard; $5/gebruiker bij 1–10 gebruikers, $3/gebruiker bij 100; uitschieters $10–$100 bij zware featuresets | [ITQlick Quinyx](https://www.itqlick.com/quinyx/pricing), [PricingNow Quinyx](https://pricingnow.com/), [Software Finder](https://softwarefinder.com/) |
| Quinyx onboarding | **$1.000 – $10.000+** eenmalig | Software Finder |
| **Planday** (Xero) | vanaf **£2,99** per gebruiker/maand (Starter, min. 5 gebruikers); Plus en Pro hoger resp. custom; 30 dagen gratis proef | [Planday pricing](https://www.planday.com/pricing/) |
| **Shiftbase** (NL) ⚠️ *geactualiseerd* | **€4,00** p/extra medewerker/maand (Basic; €3,60 bij jaarfacturatie), **€5,00** (Premium; €4,50 jaarlijks), **€6,00** (Enterprise; €5,40 jaarlijks). Inbegrepen basis: 6 / 12 / 48 medewerkers | [Shiftbase tarieven](https://www.shiftbase.com/nl/tarieven) — direct geverifieerd; de eerder vermelde €3,50 (Basic) en €7 (Enterprise) zijn achterhaald |

**De prijsspreiding binnen WFM is een factor 10–30** ($3 PEPM SMB vs. $40–100 PEPM enterprise). Dat is geen inefficiënte markt maar een echte productverschil: de enterprise-prijs koopt CAO-/wetgevingsengine, payroll-integratie, forecasting van arbeidsvraag en auditability; de SMB-prijs koopt een roosterkalender met een app.

**Typische contractwaarde [SCHATTING]:**
- Horeca-/retail-mkb, 50 medewerkers, Shiftbase/Planday: **€2.100–€3.600/jaar** *(herrekend op de geverifieerde tarieven: 50 × €3,60 × 12 = €2.160 bij Shiftbase Basic jaarfacturatie; 50 × €6,00 × 12 = €3.600 bij Enterprise maandfacturatie; Planday Starter £2,99 × 50 × 12 ≈ £1.794. De eerder genoemde bovengrens €4.200 stoelde op het achterhaalde €7-Enterprise-tarief.)*
- Mid-market, 1.000 medewerkers, Quinyx: **$36.000–$96.000/jaar** + onboarding *(1.000 × $3–8 × 12 — rekenkundig correct; de $3–8 PEPM zelf komt uit ITQlick/PricingNow-schattingen, niet van Quinyx)*.
- Enterprise, 20.000 medewerkers, UKG Pro WFM: **$6,5–8,9 mln/jaar** aan abonnement, plus $2,6–6,2 mln implementatie in jaar 1 (bij 40–70%).
  > ⚠️ **Rekenkundig correct, methodisch onbetrouwbaar.** 20.000 × $27 × 12 = $6,48 mln en 20.000 × $37 × 12 = $8,88 mln kloppen, net als de implementatie-afgeleide (40% × 6,48 = $2,59 mln; 70% × 8,88 = $6,22 mln). Maar twee aannames houden geen stand: (a) OutSail's $27–37 PEPM geldt voor **UKG Pro als volledige HCM-suite** (HR + payroll + WFM), niet voor de WFM-module alleen — de WFM-only contractwaarde ligt materieel lager; (b) lijstprijs-PEPM wordt bij 20.000 medewerkers vrijwel nooit betaald, PEPM daalt sterk met volume (vergelijk de Workday-benchmark: mediaan **$50.000/jaar** over 345 geverifieerde aankopen, bovengrens $530.000 — ordes onder wat lijstprijs × headcount zou voorspellen). Behandel dit bedrag als een **bovengrens**, niet als een typische contractwaarde.

### 3.3 Betalingsbereidheid — en waarom die zo verschilt

**APS: hoog per stoel, laag per bedrijf — en fragiel.**
- **Hoog per stoel**: $200–400 per planner per maand voor mid-market is 5–15× de prijs van een MS Project-licentie. De reden is direct herleidbaar tot §1.5: als een uur stilstand in automotive $2,3 mln kost ([Siemens TCOD 2024](https://blog.siemens.com/2024/07/the-true-cost-of-an-hours-downtime-an-industry-analysis/)), is een APS-licentie van $150.000 terugverdiend bij vier voorkomen stilstand-minuten per jaar. De business case is triviaal.
- **Laag per bedrijf**: er zijn per fabriek maar **3–10 planners**. Het aantal stoelen is een orde kleiner dan bij WFM (waar je per *medewerker* betaalt) of bij ERP.
- **Fragiel**: de betalingsbereidheid stort in zodra het vertrouwen weg is. De meest consistente faalmodus in APS-implementaties is gedocumenteerd als "the erosion of planner trust in the system's recommendations" ([Qwinn Partners](https://qwinnpartners.com/why-do-advanced-planning-system-implementations-often-fail/), [Synchrono](https://www.synchrono.com/why-aps-implementations-fail/)). Een APS waar de planner omheen werkt met Excel is shelfware — en dan is de vernieuwing weg.

**WFM: hoog en structureel — de sterkste betalingsbereidheid van de drie markten.**
- WFM wordt betaald **per medewerker**, wat betekent dat de contractwaarde meeschaalt met de organisatie en niet met het aantal planners. Dat is de reden dat de WFM-markt (**$8–10 mrd**, gecorrigeerd) fors groter is dan APS in enge zin — t.o.v. PPM is het verschil na correctie echter klein (PPM $6,4–8,3 mrd met IDC); zie §4.4.
- De ROI is **loonkosten**, de grootste kostenpost van de meeste dienstenorganisaties. 1% besparing op een loonsom van €500 mln is €5 mln — meer dan het hele WFM-contract.
- Bovendien is er een **compliance-dwang**: predictive-scheduling-boetes en arbeidstijdenhandhaving maken WFM deels een niet-discretionaire uitgave.
- Dat is ook zichtbaar in wat leveranciers ermee wegkomen: Workday-klanten accepteren ca. **45% verborgen kosten boven de offerte** ([CostBench](https://costbench.com/software/hr/workday/)) en UKG-implementaties van 40–70% van de jaar-1-softwarekosten ([OutSail](https://www.outsail.co/post/how-much-does-ukg-cost)). In een markt met lage betalingsbereidheid zou dat niet standhouden.

**Ter vergelijking met projectplanning:** een Primavera P6 EPPM-licentie ligt in dezelfde ordegrootte als een APS-stoel, maar de bouwsector heeft een structureel **lagere** betalingsbereidheid voor planningssoftware omdat het plan daar een *contractueel* artefact is met een schaduwkosten-model (de claim), niet een *operationeel* artefact met een direct P&L-effect. Dat is de kern van waarom deze markten niet inwisselbaar zijn — óók niet aan de commerciële kant.

---

## 4. Hoe groot is dit segment

### 4.1 APS-markt — de cijfers en hun spreiding

Tien bronnen, en ze zijn het grondig oneens:

| Bron | 2025 | Prognose | CAGR |
|---|---|---|---|
| [Market Growth Reports](https://www.marketgrowthreports.com/) | $994,75 mln | >$2,4 mrd (2034) | 9,9% |
| [Custom Market Insights](https://www.custommarketinsights.com/) | $1,08 mrd | $2,60 mrd (2034) | 10,3% |
| [Verified Market Reports](https://www.verifiedmarketreports.com/) | $1,09 mrd | $2,61 mrd (2034) | 10,4% |
| [Data Insights Market](https://www.datainsightsmarket.com/) | $1,08 mrd | — | 10,3% |
| [Research and Markets](https://www.researchandmarkets.com/) (a) | $1,32 mrd | $1,47 mrd (2026) | 11,2% |
| [Research and Markets](https://www.researchandmarkets.com/) (b) | $1,6 mrd | $3,6 mrd (2034) | 9,3% |
| [Exactitude Consultancy](https://exactitudeconsultancy.com/) | $2,25 mrd | $6,82 mrd (2034) | 14,63% |
| [Verified Market Research](https://www.verifiedmarketresearch.com/) | $2,5 mrd (2024) | $5,8 mrd (2032) | 11,2% |
| [Transpire Insight](https://transpireinsight.com/) | $2,78 mrd | $11,05 mrd (2033) | 20,02% |
| [Dataintelo](https://dataintelo.com/report/advanced-planning-and-scheduling-aps-software-market) | $4,8 mrd | $10,6 mrd (2034) | 9,3% |

**Duiding.** De spreiding ($0,99 mrd – $4,8 mrd, factor 4,8) komt niet door meetfouten maar door **marktdefinitie**: de lage cijfers meten alleen *detailed production scheduling* (de specialisten-laag), de hoge cijfers tellen de hele *supply chain planning*-suite mee. De mediaan van de tien waarnemingen is ca. **$1,46 mrd**; de modus ligt rond **$1,08 mrd**.

**Mijn werkschatting [SCHATTING]:**
- **APS in enge zin (detailed/finite-capacity production scheduling), 2025: USD 1,2–1,7 mrd wereldwijd.**
- **APS + supply chain planning in brede zin, 2025: USD 8–12 mrd** (redenering: Blue Yonder alleen al $1,42 mrd, Kinaxis $0,55 mrd, plus SAP IBP/PP-DS, Oracle, o9, OMP, Logility, RELEX, AspenTech, Infor — samen plausibel $6–8 mrd, plus de specialisten en ERP-embedded ca. $2–4 mrd).
- **Groeirichting:** consensus-CAGR **9–11%**, met een uitschieter naar 14–20% bij de bureaus die AI-planning meetellen. Realistisch: **9–12%**.

### 4.2 Bottom-up-controle op het APS-cijfer (eigen redenering)

**[SCHATTING — eigen berekening]**

Uitgangspunten:
- De EU telt **2,2 miljoen maakbedrijven** met **30,3 mln werkzame personen** (2023) ([Eurostat](https://ec.europa.eu/eurostat/statistics-explained/SEPDF/cache/10086.pdf)). Wereldwijd is de EU goed voor ruwweg 15–20% van de maakindustrie-toegevoegde waarde; wereldwijd aantal maakbedrijven van enige omvang is dus grofweg 10–14 mln, maar het overgrote deel is micro.
- Alleen bedrijven boven ca. 50 medewerkers zijn realistische APS-kopers. In de EU is dat naar schatting **1,5–2,5% van de 2,2 mln** = **33.000–55.000 bedrijven** (rekencorrectie: 1,5% × 2,2 mln = 33.000, niet 35.000). Wereldwijd, geëxtrapoleerd: **200.000–350.000 adresseerbare bedrijven**. ⚠️ *De 1,5–2,5%-aanname is zelf onbevestigd:* Eurostat's SBS-grootteklasseverdeling voor de maakindustrie kon in deze verificatieronde niet worden opgehaald (statistics-explained-pagina geeft alleen het totaal van 2,2 mln / >30 mln personen). Gangbare SBS-ordegroottes suggereren eerder 2,5–3% voor 50+ werknemers, wat de onderkant van deze band te laag maakt.
- Adoptiegraad: **40% van de Amerikaanse maakbedrijven heeft APS geïmplementeerd**, oplopend tot **72% bij grote Amerikaanse ondernemingen**; tegelijk gebruikt **50% van de bedrijven nog Excel of papier** naast ERP, en **54% van de kleine en middelgrote fabrieken** gebruikt pen & papier of spreadsheets als MES ([DecisionBrain APS Software Statistics 2026](https://decisionbrain.com/), [Qlector](https://qlector.com/), [IoT Analytics MES Market 2025-2031](https://iot-analytics.com/), [ISE Team](https://iseteam.com/)). De VS is de meest volwassen markt; wereldwijd ligt de penetratie lager — **[SCHATTING] 20–30%**.
- Adresseerbare klanten met APS: 200.000–350.000 × 25% = **50.000–87.500 bedrijven**.
- Gemiddelde jaarlijkse besteding per APS-klant (abonnement + onderhoud, exclusief eenmalige implementatie): **[SCHATTING] USD 20.000–30.000** (gewogen mix van SMB, mid-market en enterprise).
- **Uitkomst: 50.000 × $20.000 = $1,0 mrd tot 87.500 × $30.000 = $2,6 mrd.**

Dat overlapt goed met de mediaan van de analistencijfers ($1,46 mrd) en bevestigt dat de **lage** cijfers ($1,0–1,7 mrd) de juiste zijn voor APS in enge zin — de $4,8 mrd van Dataintelo meet iets anders.

*Rekencontrole (nagerekend en correct):* 50.000 × $20.000 = $1,00 mrd; 87.500 × $30.000 = $2,625 mrd. Mediaan van de tien APS-waarnemingen: gesorteerd 0,99 / 1,08 / 1,08 / 1,09 / 1,32 / 1,60 / 2,25 / 2,50 / 2,78 / 4,80 → (1,32 + 1,60) / 2 = **$1,46 mrd** ✅; modus = **$1,08 mrd** (twee waarnemingen) ✅. Kanttekening: één van de tien waarden (Verified Market Research, $2,5 mrd) is een **2024**-cijfer dat in een 2025-mediaan is meegenomen.

Een tweede controle via planners: 50.000–87.500 klanten × gemiddeld 4 planners = **200.000–350.000 APS-stoelen wereldwijd**. Bij $200–400/stoel/maand ([supplychainresearch.com](https://supplychainresearch.com/research-library/buyers-guide-production-scheduling-aps), letterlijk: "Mid-market visual schedulers run roughly $200 to $400 per user per month") is dat $0,48–1,68 mrd per jaar aan pure stoelomzet, plus site-/serverlicenties.

> ⚠️ **"Consistent" was te sterk — de twee controles spreken elkaar deels tegen.** De stoelenberekening impliceert een besteding van 4 × $200–400 × 12 = **$9.600–19.200 per klant per jaar**, terwijl de eerste controle **$20.000–30.000 per klant** aanneemt. Dat is een factor ~2 verschil op precies de aanname die de uitkomst draagt; de ondergrens van de stoelencontrole ($0,48 mrd) ligt op de helft van de ondergrens van de licentiecontrole ($1,0 mrd). De twee methodes zijn dus niet onafhankelijk bevestigend maar overlappen slechts aan de bovenkant. Correcte formulering: **beide controles landen binnen de band $0,5–2,6 mrd en sluiten de $4,8 mrd van Dataintelo uit** — dát is de houdbare conclusie, niet "beide bevestigen $1,2–1,7 mrd".
>
> Twee verdere zwaktes: (a) de bron voor $200–400/stoel/maand — supplychainresearch.com, gepubliceerd 22 juli 2026 — is een niet-geïdentificeerde uitgever zonder track record, geen erkend analistenhuis; (b) de gebruikte adoptiegraad van 20–30% is zelf een [SCHATTING] die de uitkomst lineair schaalt.

### 4.3 WFM/roostering-markt

| Bron | Cijfer | Prognose | CAGR |
|---|---|---|---|
| [Apps Run the World](https://www.appsruntheworld.com/top-10-workforce-management-vendors-market-forecast-and-customer-wins/) | **$8,7 mrd (2024)**, +12,1% j-o-j; top-10 = 51,4% | $12,1 mrd (2029) | **6,8%** ⚠️ gecorrigeerd |
| [MarketsandMarkets](https://www.marketsandmarkets.com/Market-Reports/workforce-management-market-27548173.html) | **$9,57 mrd (2025)** | $15,67 mrd (2030) | 10,4% |
| [Emergen Research](https://www.emergenresearch.com/industry-report/workforce-management-market) | $9,64 mrd (2025) | $24,34 mrd (2035) | 9,7% |
| [Verified Market Reports](https://www.verifiedmarketreports.com/product/workforce-management-software-market/) | $9,77 mrd (2025) | $13,6 mrd (2033) | 4,3% |
| [Dataintelo](https://dataintelo.com/report/workforce-management-software-market) | $9,8 mrd (2025) | $22,4 mrd (2034) | 9,6% |
| [Future Market Report](https://futuremarketreport.com/industry-report/workforce-management-software-market/) | $14,7 mrd (2025) | $26,3 mrd (2033) | 7,54% |
| [Verified Market Reports — *workforce scheduling* subsegment](https://www.verifiedmarketreports.com/product/workforce-scheduling-software-market/) | **$15,5 mrd (2025)** | $23,5 mrd (2032) | 6,2% |
| [Dataintelo — *workforce scheduling*](https://dataintelo.com/report/workforce-scheduling-software-market) | $5,3 mrd (2025) | $11,69 mrd (2034) | 9,2% |
| [DataHorizzon — *workforce scheduling*](https://datahorizzonresearch.com/workforce-scheduling-software-market-50004) | $2,85 mrd (2024) | $6,73 mrd (2033) | 10,1% |
| [Intel Market Research](https://intelmarketresearch.com/workforce-management-software-market-16051) | $3,29 mrd (2025) | $5,31 mrd (2032) | 8,6% |

**Duiding.** De clustering rond **$8,7–9,8 mrd** is opvallend consistent — vier bronnen (Apps Run the World, MarketsandMarkets, Emergen, Verified/Dataintelo) landen daar.

> ⚠️ **Bijgesteld na verificatie.** De oorspronkelijke formulering ("vier **onafhankelijke** bronnen … het meest betrouwbare cijfer in dit hele rapport") was te sterk, om drie redenen:
> 1. **De clustering is deels selectie.** Dezelfde tabel bevat $3,29 mrd (Intel Market Research) en $14,7 mrd (Future Market Report) voor hetzelfde jaar — een factor 4,5. Alleen het middenveld optellen en "consistent" noemen is cherry-picking.
> 2. **De bronnen zijn niet onafhankelijk in kwaliteit.** Verified Market Reports en Dataintelo zijn dezelfde categorie tier-3-bureaus die elders in dit rapport terecht met wantrouwen worden behandeld (Dataintelo levert ook de $4,8 mrd APS-outlier). Alleen Apps Run the World (bottom-up leveranciersomzet) en MarketsandMarkets zijn methodisch anders opgezet.
> 3. **Apps Run the World is intern inconsistent** — $8,7 mrd/+12,1%/UKG 27% op de top-10-pagina versus $7.951 mln/+8,4%/UKG 24% in het eigen UKG-artikel over hetzelfde jaar.
>
> **Aangepast oordeel:** WFM totaal 2025 ligt met redelijke zekerheid in de band **USD 8–10 mrd**; de precisie "9–10 mrd" is niet houdbaar. De CAGR-consensus verzwakt eveneens: ARTW's eigen prognose is 6,8%, niet 9–11%.

**Mijn werkschatting [SCHATTING]:**
- **Workforce Management totaal, 2025: USD 8–10 mrd** *(bijgesteld van "9–10 mrd" na verificatie; zie de duiding hierboven).*
- **Waarvan de *roostering/scheduling*-component (i.t.t. tijdregistratie, verlof, absentie, arbeidsvraagprognose): USD 3–5 mrd** — de "workforce scheduling"-subsegmentcijfers van Dataintelo ($5,3 mrd) en DataHorizzon ($2,85 mrd in 2024) omcirkelen dit; de $15,5 mrd van Verified Market Reports is duidelijk een outlier die de hele WFM-markt herlabelt.
- **Groeirichting: 7–11% CAGR** *(ondergrens verlaagd na verificatie: Apps Run the World — de enige bottom-up bron — prognosticeert **6,8%** tot 2029, tegenover 9,6–10,4% bij de top-down bureaus)*, gedreven door (a) compliance-druk (fair workweek, arbeidstijdenregistratie), (b) AI-gedreven vraagprognose, (c) verschuiving van SMB naar cloudroostering.
- Deelsegment zorg: **$2,53 mrd (2024) → $5,36 mrd (2030)** ([Grand View Research](https://www.grandviewresearch.com/market-trends/healthcare-staffing-scheduling-software-market-competitive-database)).

### 4.4 Vergelijking met projectplanning — de kern van "aangrenzend"

| Markt | 2025 (mediaan van gevonden cijfers) | CAGR |
|---|---|---|
| **APS (eng)** | ~$1,4 mrd | 9–11% |
| **APS + SCP (breed)** | ~$8–12 mrd [SCHATTING] | 9–12% |
| **WFM totaal** | ~$9,5 mrd | 9–11% |
| **WFM — alleen roostering** | ~$3–5 mrd [SCHATTING] | 9–10% |
| **PPM/projectportfolio** *(referentie)* | ~$6,4 mrd | 8–11% |

PPM-cijfers: 2025-waarden lopen van $5,39 mrd ([Fortune Business Insights](https://www.fortunebusinessinsights.com/)) via $5,7 mrd ([Global Growth Insights](https://www.globalgrowthinsights.com/)), $6,42 mrd ([Dataintelo](https://dataintelo.com/)), $6,84 mrd ([Emergen](https://www.emergenresearch.com/)), $6,90 mrd ([Precedence Research](https://www.precedenceresearch.com/)) tot $7,46 mrd voor 2024 ([IDC Worldwide PPM Software Forecast 2025-2029, containerId US52252825](https://my.idc.com/getdoc.jsp?containerId=US52252825): "grew 11.5% to $7.46 billion in 2024"). ✅ IDC-cijfer geverifieerd.

> ⚠️ **De mediaan ~$6,4 mrd onderschat PPM waarschijnlijk.** De mediaan is berekend over de vijf 2025-waarnemingen van tier-2/tier-3-bureaus (5,39 / 5,70 / 6,42 / 6,84 / 6,90 → 6,42) en laat IDC buiten beschouwing omdat dat een 2024-cijfer is. Maar IDC is hier juist de methodisch sterkste bron (bottom-up leveranciersomzet, zoals Apps Run the World in WFM). Doorgetrokken met IDC's eigen +11,5% komt PPM in 2025 op **ca. $8,3 mrd**. De reikwijdte van "PPM 2025" is dus eerder **$6,4–8,3 mrd** dan "~$6,4 mrd".

**Conclusie: APS in enge zin is een KLEINERE markt dan projectplanning; WFM is een grotere.** Deze conclusie wordt door de correcties **versterkt, niet ondermijnd**: PPM valt met IDC hoger uit (~$8,3 mrd i.p.v. $6,4 mrd), terwijl APS-eng ongewijzigd op $1,2–1,7 mrd blijft. De WFM/PPM-verhouding wordt daarentegen krapper (WFM 8–10 mrd vs. PPM 6,4–8,3 mrd): **"WFM is fors groter dan projectplanning" is niet langer houdbaar — "vergelijkbaar tot matig groter" is de juiste formulering.** Er is dus geen "APS is de grote broer"-verhaal — wel een "WFM verdient meer per klant"-verhaal.

---

## 5. Sector-specifieke eisen en standaarden — en waarom de projectplanning-standaarden hier NIET gelden

Dit is het scherpste bewijs dat dit aangrenzende, niet overlappende markten zijn.

### 5.1 Wat in projectplanning verplicht is en hier volstrekt afwezig

| Projectplanning-eis | Status in APS | Status in WFM |
|---|---|---|
| **EVMS / EIA-748** (Earned Value Management System, 32 guidelines, verplicht bij US DoD/DOE-contracten >$20 mln) | **Niet van toepassing.** Er is geen "earned value" op een productieorder; de equivalent is throughput/OEE. | Niet van toepassing. |
| **DCMA 14-point assessment** (logica-checks: dangling logic, hard constraints, negatieve lag, high float, critical path test) | **Niet van toepassing.** APS-plannen hebben per definitie geen open logica-uiteinden; het plan wordt door de solver gegenereerd, niet met de hand gelegd. Een DCMA-check op een APS-plan is betekenisloos. | Niet van toepassing. |
| **AACE International Recommended Practices** (RP 29R-03 forensic schedule analysis, RP 52R-06 TIA, RP 18R-97 cost estimate classification) | **Niet van toepassing.** Geen forensische planningsanalyse in productie. | Niet van toepassing. |
| **Verplichte leveringsformaten XER / P6 XML / MPP** | **Niet van toepassing.** Er is geen contractuele verplichting om een productieplan aan een klant te leveren. | Niet van toepassing. |
| **Baseline-bevriezing, revisienummering, contractuele goedkeuring van de planning** | Bestaat niet; het plan is een dagelijks vervangbaar operationeel artefact. | Bestaat in afgezwakte vorm: het gepubliceerde rooster is bindend (predictability pay). |
| **Delay/claim/disruption-analyse (Windows, Time Impact Analysis, As-planned vs As-built)** | Bestaat niet. | Bestaat niet, maar wel arbeidsrechtelijke geschillen over roosters. |

**Dit is niet nuance — dit is een categorieverschil.** Een planner die van Primavera naar Opcenter APS overstapt gooit zijn hele methodische instrumentarium weg. De vaardigheid die overblijft is "logisch nadenken over volgorde"; alles daarboven — baselines, float-analyse, EVM, claim-verweer — is onbruikbaar.

### 5.2 Wat er in APS wél aan standaarden geldt

- **ISA-95 / IEC 62264** — het referentiemodel voor enterprise-control-integratie: vijf niveaus (Level 0 proces → Level 4 ERP) en vier operationele domeinen (production, quality, maintenance, inventory). Detailed scheduling zit op de grens van Level 3 en Level 4. ([ISA](https://www.isa.org/standards-and-publications/isa-standards/isa-standards-committees/isa95), [Symestic ISA-95 uitleg](https://symestic.com), [PLC Programming](https://plcprogramming.io))
- **B2MML (Business To Manufacturing Markup Language)** — "a complete implementation of ISA-95", een XML-datamodel voor ERP↔MES-uitwisseling, beheerd door MESA International ([MESA](https://mesa.org), [IACS Engineering ERP-MES integratiegids](https://iacsengineering.com)). Dit is functioneel de "P6 XML" van deze markt — maar met een fundamenteel verschil: **B2MML wordt gebruikt voor systeem-tot-systeem-integratie binnen één onderneming, niet voor contractuele levering tussen partijen.** Dat is precies waarom er geen APS-equivalent is van "de aannemer levert maandelijks een XER aan de directievoerder".
- **ISA-88 (IEC 61512)** voor batch-/receptbesturing in de procesindustrie.
- **OPC UA** voor de koppeling naar shopfloor/PLC-niveau.
- Sectorale kwaliteitsregimes die de *planning* raken: **IATF 16949** (automotive), **GMP/GAMP 5 en 21 CFR Part 11** (farma — audit trail op planwijzigingen!), **HACCP/BRC** (food — allergenenvolgorde als planningsconstraint).

De farma-uitzondering is interessant: **21 CFR Part 11** vereist wél een audit trail op elektronische records, wat de enige plek in APS is waar iets van "planrevisie-verantwoording" voorkomt zoals projectplanners dat kennen.

### 5.3 Wat er in WFM aan standaarden en compliance geldt

- **Richtlijn 2003/88/EG (Arbeidstijdenrichtlijn)**: gemiddeld max. 48-urige werkweek, **11 aaneengesloten uren dagelijkse rust**, min. 4 weken betaald verlof, nachtarbeidbeperkingen ([EC](https://employment-social-affairs.ec.europa.eu/policies-and-activities/rights-work/labour-law/working-conditions/working-time-directive_en)).
- **Registratieplicht werkuren** — per lidstaat verschillend geïmplementeerd na CCOO/Deutsche Bank (HvJ EU C-55/18) ([DLA Piper, maart 2024](https://www.dlapiper.com/en/insights/publications/2024/03/recording-working-hours-requirements-across-the-european-union)).
- **NL**: Arbeidstijdenwet + Arbeidstijdenbesluit; **CAO-bepalingen** over roostertermijnen, toeslagen, minimale dienstduur. Praktisch selectiecriterium bij NL-roostersoftware.
- **VS: predictive scheduling / fair workweek** in **11 jurisdicties** — aankondigingstermijn, predictability pay bij wijziging, recht op rust, verbod op clopening ([Rippling](https://rippling.com/blog/predictive-scheduling-laws), [Deel, per staat](https://www.deel.com/blog/fair-workweek-laws-by-state/), [Paycom](https://www.paycom.com/resources/blog/predictive-scheduling-laws/)).
- **AVG/GDPR** — roosters zijn persoonsgegevens; beschikbaarheidsvoorkeuren en ziekteverzuim zijn bijzondere/gevoelige categorieën.
- **Ondernemingsraad-instemmingsrecht** (NL: WOR art. 27) op werktijdregelingen — een softwarewijziging die het rooster verandert kan OR-instemming vereisen.

**De symmetrie is treffend:** in projectplanning is de compliance-druk **contractueel en achteraf** (kan ik bewijzen dat de vertraging niet mijn schuld was?); in WFM is hij **wettelijk en vooraf** (mag ik dit rooster überhaupt publiceren?). In APS is er geen externe compliance-druk op de planning zelf, alleen op de uitkomst.

---

## 6. Voor- en nadelen van de gebruikte pakketten in déze sectorcontext

### 6.1 APS-specialisten (Siemens Opcenter APS, Asprova, DELMIA Ortems)

**Wat hier goed werkt:**
- **Diep constraintmodel.** Sequence-dependent setups, tooling, alternatieve routings, shelf life — dit is de reden van bestaan en geen enkele projectplanner benadert het.
- **Interactieve planbord-ervaring.** De Gantt in een APS is een *werkinstrument* dat de planner de hele dag openhoudt en waarop hij handmatig sleept en de solver laat herrekenen. Fundamenteel anders dan de rapportage-Gantt in projectplanning.
- **Herrekensnelheid.** Plannen met tienduizenden operaties binnen seconden tot minuten.
- **Volwassenheid en referenties.** Asprova alleen al claimt 3.624 fabrieksimplementaties (jan-2024, [asprova.net](https://asprova.net/implementation-status-en/)) — dat is domeinkennis die in de productcode zit.
- **ERP-integratie is standaardwerk**, niet maatwerk (Opcenter naar SAP/Teamcenter, Ortems naar 3DEXPERIENCE, Asprova naar de Japanse ERP-wereld).

**Wat hier wringt:**
- **Modelleerlast.** De grootste implementatie-inspanning is "modeling the plant's real constraints and connecting the ERP above and execution below" ([supplychainresearch.com](https://supplychainresearch.com/research-library/buyers-guide-production-scheduling-aps)). Dit is niet te standaardiseren; elke fabriek is uniek.
- **Datakwaliteit als achilleshiel.** McKinsey wijdde een heel artikel aan "data management best practices for APS deployments" ([McKinsey](https://www.mckinsey.com/capabilities/operations/our-insights/the-quiet-enabler-data-management-best-practices-for-aps-deployments)); academisch onderzoek bouwde er een Bayesiaans beoordelingskader voor ([ScienceDirect, ERP Data Quality Assessment Framework for APS Implementation](https://www.sciencedirect.com/science/article/pii/S1877050922002277)). Kern: "ERP data frequently lacks quality" — onjuiste routings, verouderde bewerkingstijden, ontbrekende omsteltijdmatrices. Zonder schone masterdata is een APS onbruikbaar, en de opschoning is meestal groter dan de softwareimplementatie.
- **Erosie van plannervertrouwen** — gedocumenteerd als de meest consistente faalmodus ([Qwinn Partners](https://qwinnpartners.com/why-do-advanced-planning-system-implementations-often-fail/)). Zodra de solver één keer een onwerkbaar plan produceert dat de planner niet kan verklaren, gaat de planner terug naar Excel en komt hij niet meer terug. Verklaarbaarheid is hier een *bestaanseis*, geen luxe.
- **Zwarte doos-optimalisatie.** Metaheuristieken en constraint solvers geven geen kritiek pad; de planner kan niet zien *waarom* order X op donderdag valt. Dit is een structureel nadeel t.o.v. CPM, waar het kritieke pad een intuïtieve verklaring geeft.
- **Rigiditeit bij echte variabiliteit.** Er is expliciete kritiek dat "traditional APS systems fail under real variability" ([Collidetech](https://www.collidetech.com/blog/why-traditional-aps-systems-fail)) — het plan is optimaal voor de aannames en breekt zodra de werkelijkheid afwijkt.
- **Prijs- en licentie-ondoorzichtigheid.** Geen enkele specialist publiceert prijzen; alle prijsinformatie in dit rapport komt uit derde-partij-schattingen. Dat is een concurrentiële zwakte die een transparante uitdager kan uitbuiten.
- **Vendor lock-in via de suite.** Ortems koop je omdat je 3DEXPERIENCE hebt; Opcenter omdat je Siemens hebt. Dat maakt de markt minder contestabel op productmerites.

### 6.2 Mid-market APS (PlanetTogether)

**Goed:** lagere instapdrempel, sterke ERP-integratieverhaal (AVEVA MES-partnerschap, Dynamics/SAP/NetSuite/Epicor-connectors), begrijpelijker productoppervlak.
**Wringt:** de overname door CAI Software op 24 juni 2026 ([PR Newswire](https://www.prnewswire.com/news-releases/cai-software-acquires-planettogether-strengthening-advanced-planning-and-scheduling-capabilities-across-manufacturing-302809997.html)) introduceert de gebruikelijke onzekerheid over roadmap, prijsstelling en het voortbestaan van partnerschappen — CAI is een portfolio-acquirer met "15+ core manufacturing industries", wat historisch prijsverhogingen en tragere innovatie voorspelt. Dit is een venster waarin klanten alternatieven bekijken.

### 6.3 Enterprise SCP-suites (Kinaxis, o9, Blue Yonder, SAP)

**Goed:** end-to-end van vraagprognose tot productie; concurrent planning (Kinaxis' RapidResponse); scenario's over de hele keten; bestuurlijke acceptatie op C-niveau.
**Wringt:** de **detailed scheduling-laag is vaak het zwakst**. De buyer's guide waarschuwt kopers expliciet om "confirm the correct layer — ensure purchasing detailed scheduling, not supply planning or execution systems" ([supplychainresearch.com](https://supplychainresearch.com/research-library/buyers-guide-production-scheduling-aps)). Dit is een terugkerend implementatiedrama: een concern koopt een SCP-suite en ontdekt dat de plant alsnog een APS-specialist nodig heeft. Verder: hoge kosten, lange implementaties, en de plant-planner voelt zich niet de klant.

### 6.4 WFM enterprise (UKG, Workday, Dayforce)

**Goed:** volledige CAO-/wetgevingsengine, payroll-integratie, arbeidsvraagprognose, auditability, schaal tot honderdduizenden medewerkers, compliance-updates als dienst.
**Wringt:**
- **Kosten en verborgen kosten.** UKG-implementatie 40–70% van jaar-1-software ([OutSail](https://www.outsail.co/post/how-much-does-ukg-cost)); Workday ca. +45% boven de offerte ([CostBench](https://costbench.com/software/hr/workday/)). Contractwaarden lopen op tot $530.000/jaar ([VendorBenchmark](https://vendorbenchmark.com/blog/workday-pricing-benchmark-per-employee)).
- **Configuratierigiditeit.** Deze systemen zijn gebouwd voor grote, gestandaardiseerde organisaties; afwijkende CAO's of lokale regels vereisen dure maatwerkconfiguratie.
- **HR-eigenaarschap versus operationeel gebruik.** Het systeem wordt gekocht door HR maar gebruikt door vestigingsmanagers, met de bekende adoptiekloof.

### 6.5 WFM SMB (Planday, Shiftbase, Deputy, Quinyx)

**Goed:** transparante prijzen (£2,99 / €3,50 PEPM), 14–30 dagen gratis proef, snelle onboarding, mobiele app die medewerkers daadwerkelijk gebruiken, lokale payroll-koppelingen (Shiftbase↔Loket voor NL).
**Wringt:** beperkte optimalisatie (auto-scheduling zit bij Planday pas in de Pro-tier met custom pricing, [Planday](https://www.planday.com/pricing/)), beperkte CAO-diepte, groeipijn bij >500 medewerkers, en afhankelijkheid van de moederplatformstrategie (Planday zit onder Xero).

### 6.6 Open source (frePPLe, Timefold/OptaPlanner)

**Goed:** geen licentiekosten in de kern, volledige inspecteerbaarheid van het model (belangrijk gegeven het vertrouwensprobleem in §6.1), inzetbaar als embedded solver in eigen producten.
**Wringt:** **het open-core-mes snijdt.** Timefold Solver 2.0 verplaatste de explainability-API's — precies de functies die het vertrouwensprobleem oplossen — naar de betaalde editie ([bytecode.news](https://www.bytecode.news/posts/2026/04/timefold-solver-2-0)). frePPLe's Community Edition is functioneel maar de bruikbare edities zijn Enterprise/Cloud met custom pricing ([frePPLe editions](https://frepple.com/editions/), [pricing](https://frepple.com/pricing/)). Verder: geen out-of-the-box domeinmodel, dus de implementatie is programmeerwerk. Voor het gemiddelde maakbedrijf zonder in-house ontwikkelcapaciteit is dit geen optie.

**Les voor Open Planner Studio:** frePPLe bewijst dat een open-source planner met betaalde diensten (PoC €2.000–5.000, implementatie €5.000–25.000) een levensvatbaar model heeft in deze aangrenzende markt. Timefold laat zien waar de verleiding zit om te knijpen — en dat gebruikers dat opmerken.

---

## 7. Openingen: waar zijn gebruikers ontevreden en welke gaten bestaan er

### 7.1 Vastgestelde ontevredenheid

| Pijnpunt | Bewijs |
|---|---|
| **50% van de bedrijven plant nog in Excel/papier** naast ERP; **54% van kleine/middelgrote fabrieken** gebruikt pen & papier of spreadsheets als MES | [Qlector](https://qlector.com/), [ISE Team](https://iseteam.com/), [IoT Analytics MES Market 2025-2031](https://iot-analytics.com/) |
| **Erosie van plannervertrouwen** = meest consistente APS-faalmodus | [Qwinn Partners](https://qwinnpartners.com/why-do-advanced-planning-system-implementations-often-fail/), [Synchrono](https://www.synchrono.com/why-aps-implementations-fail/) |
| **Datakwaliteit** blokkeert implementaties structureel; ERP-data "frequently lacks quality" | [McKinsey](https://www.mckinsey.com/capabilities/operations/our-insights/the-quiet-enabler-data-management-best-practices-for-aps-deployments), [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S1877050922002277) |
| **APS breekt onder echte variabiliteit** | [Collidetech](https://www.collidetech.com/blog/why-traditional-aps-systems-fail) |
| **Volledige prijsondoorzichtigheid** bij álle APS-specialisten | [PlanetTogether](https://www.planettogether.com/pricing), [Asprova FAQ](https://www.asprova.com/en/faq/implementation-considerations/000462-2.html), [ITQlick Preactor](https://www.itqlick.com/preactor-aps/pricing), [3DS Ortems](https://www.3ds.com/products/delmia/ortems) — geen van vieren publiceert prijzen |
| **Verborgen kosten in WFM**: +45% (Workday), implementatie 40–70% van jaar-1-software (UKG) | [CostBench](https://costbench.com/software/hr/workday/), [OutSail](https://www.outsail.co/post/how-much-does-ukg-cost) |
| **Kopers kopen de verkeerde laag** (supply planning i.p.v. detailed scheduling) — expliciete waarschuwing in koopgidsen | [supplychainresearch.com](https://supplychainresearch.com/research-library/buyers-guide-production-scheduling-aps) |
| Bij het bredere adoptieplaatje: slechts **35% van de fabrikanten** noemt geavanceerde productieplanning een #1/#2-investeringsprioriteit — de rest heeft andere prioriteiten | [DecisionBrain APS Software Statistics 2026](https://decisionbrain.com/) |

### 7.2 De gaten — eerlijk beoordeeld voor een open-source, IFC-gebaseerde planner

**Wat NIET aanvalbaar is (belangrijk om vast te stellen):**

1. **Het APS-hart zelf.** Sequence-dependent setup matrices, shelf-life-constraints, campagnevorming en flexible job shop-optimalisatie zijn tientallen manjaren aan domeinlogica. Een CPM-gebaseerde planner heeft hier geen enkel vertrekpunt — het is een ander wiskundig probleem (langste pad in een DAG vs. NP-hard scheduling). Dit is geen "feature die je toevoegt".
2. **WFM/roostering.** De waarde zit in de CAO-/wetgevingsengine per land en de payroll-koppelingen, niet in de roosteralgoritmiek. Dat is een compliance-productiebedrijf, geen planningsproduct. En IFC speelt er geen enkele rol.
3. **De ERP-integratielaag.** B2MML/ISA-95-koppelingen naar SAP/Infor/Dynamics zijn de facto toegangsdrempel; die bouw je niet op als open-source-nevenproject.

**Wat WÉL een echt gat is:**

1. **De naad prefab/modulaire bouw ↔ fabrieksplanning — dit is het scherpste gat.**
   Bij offsite/modulaire bouw ontmoet een *project*planning (bouwplaats, IFC/BIM, CPM, contractueel) een *productie*planning (fabriek, eindige capaciteit, orders). Vandaag is er **geen standaardkoppeling**: de zoekresultaten bevestigen dat de markt (Offsight, Vertex BD, Autodesk BIM-workflows, MBI's prefab scheduling guide) BIM's rol in *coördinatie* benadrukt maar "do not explicitly detail BIM/IFC integration with factory scheduling systems like APS" ([modular.org, The How-To Guide For Prefab Scheduling](https://www.modular.org/2025/01/03/the-how-to-guide-for-prefab-leaders-actively-manage-your-prefab-schedule/), [Offsight](https://www.offsight.com), [Autodesk University, Integrated BIM Workflows in Modular Prefabricated Construction](https://www.autodesk.com/autodesk-university/article/Integrated-BIM-Workflows-Modular-Prefabricated-Construction-Concept-Fabricate-2020)). Er is zelfs peer-reviewed werk over precies dit probleem: multi-objective productieplanning in een multi-project context voor ETO-prefab in de bouw ([International Journal of Production Research, 2020](https://www.tandfonline.com/doi/full/10.1080/00207543.2020.1717009)).
   **Concreet: een IFC-gebaseerde planner die per bouwdeel (IfcElement) een leverdatum uit de bouwplanning kan exporteren als vraagsignaal naar een APS — en de bevestigde fabrieksdatum terug kan lezen als constraint op de bouwtaak — vult een gat dat niemand vult.** Dit is precies het soort brug waar IFC als drager natuurlijk is en waar de bestaande spelers aan weerszijden geen belang bij hebben.

2. **ETO/projectmatige productie.** Engineer-to-order zit letterlijk tussen de twee markten in: "APS software can finitely forward schedule the entire design and manufacturing process using a single order" ([Waterloo Software](https://www.waterloo-software.com/advanced-planning-and-scheduling-for-engineer-to-order-businesses/)) — maar ETO-bedrijven denken tegelijk in *projecten* met mijlpalen en klantcontracten. Ze kopen daardoor vaak *beide* en koppelen ze met de hand. Een planner die beide modellen in één datamodel kan houden (projecttaken met CPM-logica én capaciteitsbeperkte productieorders) heeft hier een echt verhaal.

3. **Verklaarbaarheid als differentiator.** Het bewezen faalpunt in APS is het vertrouwen van de planner in het algoritme ([Qwinn Partners](https://qwinnpartners.com/why-do-advanced-planning-system-implementations-often-fail/)) — en de open-source-referentie in dit veld (Timefold) heeft juist explainability áchter een betaalmuur gezet ([bytecode.news](https://www.bytecode.news/posts/2026/04/timefold-solver-2-0)). Een open-source planner waarin **elke datum herleidbaar is tot een expliciete keten van beperkingen**, met een leesbaar kritiek pad, verkoopt precies wat de gevestigde orde niet levert. CPM heeft hier een structureel voordeel dat vaak als nadeel wordt gepresenteerd: het is uitlegbaar.

4. **Prijstransparantie als wapen.** Nul van de vier genoemde APS-specialisten publiceert een prijs. In een markt waar de mediaan-koper een mid-market fabrikant is die niet door een 6-maands sales-cyclus wil, is "gratis te downloaden, hier is de prijs van support" een reëel onderscheidend vermogen. frePPLe bewijst dat het kan (PoC €2.000–5.000, implementatie €5.000–25.000, [frePPLe pricing](https://frepple.com/pricing/)).

5. **De 50%-in-Excel-populatie.** Dit is het grootste onaangeboorde volume in beide markten. Deze bedrijven kopen geen $150.000-APS. Ze zouden wél een gratis, open, lokaal draaiende planner met een goede Gantt en beperkte capaciteitscontrole gebruiken — maar dat is een instapproduct, geen APS, en de omzet zit in support en in de upgrade daarna.

### 7.3 Strategisch oordeel

**Behandel APS en WFM níét als uitbreidingsmarkten voor Open Planner Studio.** Ze delen het woord "planning" en verder bijna niets: ander planningsobject, ander rekenmodel, andere koper, andere standaarden, andere ROI-logica, andere compliance. Wie een IFC-bouwplanner uitbreidt met "productieplanning" bouwt óf een slechte APS óf een APS-marketinglabel op een CPM-engine — beide vallen door de mand bij de eerste omsteltijdmatrix.

**Behandel ze wél als integratiedoelen.** De strategisch waardevolle positie is niet "ook APS doen", maar **de enige planner zijn die een IFC-bouwmodel en een fabrieksplanning aan elkaar kan knopen**. Dat is een gat met bewezen vraag (prefab/modulair, ETO-bouw), zonder gevestigde oplossing, waarin IFC de natuurlijke drager is en waarin geen van de bestaande APS- of projectplanningsleveranciers een belang heeft.

---

## 8. Samenvattende tabel: drie markten, één woord

| Dimensie | Projectplanning | APS / productieplanning | WFM / personeelsroostering |
|---|---|---|---|
| Planningsobject | Taak in een WBS | Productieorder → operatie op machine | Dienst → persoon |
| Rekenmodel | CPM/PERT (langste pad, DAG, polynomiaal) | Flexible job shop scheduling (NP-hard, CP/metaheuristiek) | Rostering/set covering (NP-hard) |
| Capaciteitsaanname | Oneindig (levelling achteraf) | Eindig, per resource | Eindig, per persoon, met rechten |
| Horizon | 1–10+ jaar | 1 dag – 12 weken | 1–8 weken |
| Herplanfrequentie | Per baseline-revisie | Dagelijks tot per shift | Wekelijks + realtime |
| Kernconstraints | FS/SS/FF/SF + lag, kalenders | Setup-volgorde, tooling, routings, shelf life | Arbeidstijdenwet, CAO, skills, voorkeuren |
| Compliance | EVMS/EIA-748, DCMA 14-point, AACE RP's | ISA-95/B2MML, ISA-88, (21 CFR 11 in farma) | 2003/88/EG, Arbeidstijdenwet, fair workweek |
| Uitwisselingsformaat | XER, P6 XML, MPP, **IFC 4.3** | B2MML/XML (systeemintegratie, niet contractueel) | Payroll-API's, geen standaard |
| Kosten van vertraging | Liquidated damages per dag; claims | $2,3 mln/uur (automotive), direct P&L | Loonkosten + servicelevel |
| Prijs per stoel | €1.000–5.000/jaar | **$200–400/gebruiker/maand** | **$3–100 per medewerker/maand** |
| Marktomvang 2025 | $6,4–8,3 mrd (PPM) | ~$1,4 mrd (eng) / $8–12 mrd (breed) | $8–10 mrd |
| Koper | Projectorganisatie, planner, contractmanager | Operations/supply chain, plantplanner | HR + operations |
| Betalingsbereidheid | Middel (contractueel gedreven) | **Hoog per stoel, laag per bedrijf, fragiel** | **Hoog en structureel** |

---

## 9. Bronnenlijst

### Marktomvang — APS
- [Custom Market Insights — Advanced Planning and Scheduling Apps Software Market](https://www.custommarketinsights.com/)
- [Verified Market Reports — Global APS Software Market](https://www.verifiedmarketreports.com/)
- [Verified Market Research — APS Software Market Report](https://www.verifiedmarketresearch.com/)
- [Transpire Insight — APS Software Market](https://transpireinsight.com/)
- [Research and Markets — Advanced Planning and Scheduling Software Market Outlook 2025-2034](https://www.researchandmarkets.com/)
- [Dataintelo — Advanced Planning and Scheduling (APS) Software Market](https://dataintelo.com/report/advanced-planning-and-scheduling-aps-software-market)
- [Market Growth Reports — APS Software Market Size](https://www.marketgrowthreports.com/)
- [Exactitude Consultancy — APS Software Market](https://exactitudeconsultancy.com/)
- [Data Insights Market — Advanced Planning and Scheduling System](https://www.datainsightsmarket.com/)

### Marktomvang — Workforce Management / roostering
- [Apps Run the World — Top 10 Workforce Management Software Vendors and Market Forecast](https://www.appsruntheworld.com/top-10-workforce-management-software-vendors-and-market-forecast/) — $8,7 mrd 2024, UKG 27%, top-10 = 51,4%
- [MarketsandMarkets — Workforce Management Market Report 2025-2030](https://www.marketsandmarkets.com/Market-Reports/workforce-management-market-27548173.html) — $9,57 mrd 2025 → $15,67 mrd 2030
- [Emergen Research — Global Workforce Management Market 2025-2035](https://www.emergenresearch.com/industry-report/workforce-management-market)
- [Verified Market Reports — Workforce Management Software Market](https://www.verifiedmarketreports.com/product/workforce-management-software-market/)
- [Verified Market Reports — Workforce Scheduling Software Market](https://www.verifiedmarketreports.com/product/workforce-scheduling-software-market/)
- [Dataintelo — Workforce Management Software Market](https://dataintelo.com/report/workforce-management-software-market)
- [Dataintelo — Workforce Scheduling Software Market](https://dataintelo.com/report/workforce-scheduling-software-market)
- [DataHorizzon Research — Workforce Scheduling Software Market](https://datahorizzonresearch.com/workforce-scheduling-software-market-50004)
- [Future Market Report — Workforce Management Software Market](https://futuremarketreport.com/industry-report/workforce-management-software-market/)
- [Intel Market Research — Workforce Management Software Market Outlook 2025-2032](https://intelmarketresearch.com/workforce-management-software-market-16051)
- [Nucleus Research — 2025 WFM Technology Value Matrix](https://nucleusresearch.com/)
- [Grand View Research — Healthcare Staffing & Scheduling Software Market](https://www.grandviewresearch.com/market-trends/healthcare-staffing-scheduling-software-market-competitive-database)
- [Novaone Advisor — US Healthcare Staffing and Scheduling Software Market](https://www.novaoneadvisor.com/report/us-healthcare-staffing-scheduling-software-market)
- [WiseGuy Reports — Nurse Scheduling Software Market](https://www.wiseguyreports.com/reports/nurse-scheduling-software-market)

### Marktomvang — PPM (ter vergelijking)
- [Precedence Research — Project and Portfolio Management Software Market](https://www.precedenceresearch.com/)
- [IDC — Worldwide Project and Portfolio Management Software Forecast 2025-2029](https://www.idc.com/)
- [Grand View Research — Project Portfolio Management Market Report 2025-2030](https://www.grandviewresearch.com/)
- [Fortune Business Insights — Project Portfolio Management Market](https://www.fortunebusinessinsights.com/)
- [Global Growth Insights — PPM Software Market](https://www.globalgrowthinsights.com/)
- [Emergen Research — Project Portfolio Management Market](https://www.emergenresearch.com/)
- [Dataintelo — PPM Software Market](https://dataintelo.com/)

### Leveranciers — APS
- [Siemens Opcenter APS (Siemens Digital Industries Software)](https://www.siemens.com/en-us/products/opcenter/advanced-planning-scheduling/)
- [ITQlick — Preactor/Opcenter APS pricing](https://www.itqlick.com/preactor-aps/pricing)
- [Asprova — Advanced Planning and Scheduling](https://www.asprova.com/en/asprova.html)
- [Asprova — Profile (installed base)](https://www.asprova.com/en/about/profile/)
- [Asprova — FAQ: prijslijst en implementatiekosten](https://www.asprova.com/en/faq/implementation-considerations/000462-2.html)
- [Asprova — Implementation status tot januari 2024 (3.624 fabrieken)](https://asprova.net/implementation-status-en/)
- [BusinessWire China — Asprova, Maker of the Number One Market-share Production Scheduler (52,4% Japanse SCM-markt)](https://www.businesswirechina.com/en/news/24408.html)
- [Panasonic Connect — Production Scheduler Asprova](https://connect.panasonic.com/en/products-services_fa/solutions/mom/asprova)
- [PricingNow — Asprova Pricing 2026](https://pricingnow.com/question/asprova-pricing/)
- [Dassault Systèmes — DELMIA Ortems Planning & Scheduling](https://www.3ds.com/products/delmia/ortems)
- [Dassault Systèmes — Advanced Planning & Scheduling](https://www.3ds.com/products/delmia/supply-chain-planning-optimization/advanced-planning-scheduling)
- [PlanetTogether — Advanced Planning & Scheduling Software](https://www.planettogether.com/products/advanced-planning-scheduling-software)
- [PlanetTogether — Pricing (geen publieke prijzen)](https://www.planettogether.com/pricing)
- [PR Newswire — CAI Software Acquires PlanetTogether (24 juni 2026)](https://www.prnewswire.com/news-releases/cai-software-acquires-planettogether-strengthening-advanced-planning-and-scheduling-capabilities-across-manufacturing-302809997.html)
- [STG — CAI Software Acquires PlanetTogether](https://stg.com/news/cai-software-acquires-planettogether-strengthening-advanced-planning-and-scheduling-capabilities-across-manufacturing/)
- [AVEVA — PlanetTogether APS (partnerschap, geen overname)](https://www.aveva.com/en/products/planettogether-aps/)
- [supplychainresearch.com — Buyer's Guide: Production Scheduling & APS](https://supplychainresearch.com/research-library/buyers-guide-production-scheduling-aps)
- [Kinaxis — Q4 & FY2025 resultaten](https://www.kinaxis.com/en/news/press-releases/2026/kinaxis-inc-reports-record-fourth-quarter-2025-results)
- [Kinaxis — Leader in 2025 Gartner MQ Supply Chain Planning Solutions](https://www.kinaxis.com/en/news/press-releases/2025)
- [o9 Solutions — Leader in 2025 Gartner MQ](https://o9solutions.com/news)
- [BriefGlance — Blue Yonder FY25 revenue $1,42 mrd](https://briefglance.com/companies/blue-yonder-group-inc/pulses/31408)
- [Gartner — Supply Chain Planning Solutions Reviews](https://www.gartner.com/reviews/market/supply-chain-planning-solutions)

### Leveranciers — WFM / roostering
- [OutSail — A Comprehensive Look at UKG's Pricing](https://www.outsail.co/post/how-much-does-ukg-cost)
- [ITQlick — UKG pricing](https://www.itqlick.com/ukg/pricing)
- [CostBench — Workday Pricing 2026](https://costbench.com/software/hr/workday/)
- [ITQlick — Workday pricing ($15-50/employee/month)](https://www.itqlick.com/workday/pricing)
- [VendorBenchmark — Workday Per-Employee Pricing Benchmark 2026](https://vendorbenchmark.com/blog/workday-pricing-benchmark-per-employee)
- [Quinyx — Pricing (geen publieke prijzen)](https://www.quinyx.com/pricing)
- [ITQlick — Quinyx pricing](https://www.itqlick.com/quinyx/pricing)
- [PricingNow — Quinyx pricing](https://pricingnow.com/)
- [Planday — Pricing (vanaf £2,99/gebruiker/maand)](https://www.planday.com/pricing/)
- [Shiftbase — Tarieven (NL, €3,50-€7 p/medewerker/maand)](https://www.shiftbase.com/nl/tarieven)
- [Loket.nl — Shiftbase-koppeling met prijzen](https://loket.nl/koppelingen/shiftbase/)
- [Bedrijfssoftwaregids.nl — Beste Werkrooster Software 2026](https://bedrijfssoftwaregids.nl/blog/beste-werkrooster-software-2026/)
- [Gartner — Workforce Management Applications Reviews](https://www.gartner.com/reviews/market/workforce-management-applications)
- [G2 — Workforce Management Software category](https://www.g2.com/categories/workforce-management)

### Open source
- [frePPLe — Editions (Community/Enterprise/Cloud)](https://frepple.com/editions/)
- [frePPLe — Pricing (PoC €2.000-5.000, implementatie €5.000-25.000)](https://frepple.com/pricing/)
- [frePPLe — GitHub](https://github.com/frePPLe/frepple)
- [Timefold — Open source Solver](https://timefold.ai/solver)
- [Timefold Solver — GitHub (Apache 2.0)](https://github.com/TimefoldAI/timefold-solver)
- [Timefold — OptaPlanner continues as Timefold](https://timefold.ai/blog/optaplanner-fork)
- [bytecode.news — Timefold Solver 2.0: the "Why" Now Costs Money](https://www.bytecode.news/posts/2026/04/timefold-solver-2-0)
- [OptaPlanner](https://optaplanner.io)

### Standaarden en regelgeving
- [ISA — ISA-95 Enterprise-Control System Integration](https://www.isa.org/standards-and-publications/isa-standards/isa-standards-committees/isa95)
- [MESA International — B2MML](https://mesa.org)
- [IACS Engineering — ERP-MES Integration using B2MML/XML schemas](https://iacsengineering.com)
- [Symestic — ISA-95: The Standard for MES Architectures and ERP Integration](https://symestic.com)
- [PLC Programming — ISA-95 Explained: Levels, Models & MES Integration](https://plcprogramming.io)
- [Europese Commissie — Working Time Directive 2003/88/EC](https://employment-social-affairs.ec.europa.eu/policies-and-activities/rights-work/labour-law/working-conditions/working-time-directive_en)
- [Your Europe — Working hours in the EU: minimum standards](https://europa.eu/youreurope/business/hiring-managing-staff/general-employment-terms-conditions/working-hours/index_en.htm)
- [DLA Piper — Recording Working Hours: requirements across the European Union (2024)](https://www.dlapiper.com/en/insights/publications/2024/03/recording-working-hours-requirements-across-the-european-union)
- [Rippling — Predictive Scheduling Laws](https://rippling.com/blog/predictive-scheduling-laws)
- [Paycor — Predictive Work Schedule Laws: A City-by-City Guide](https://www.paycor.com/resource-center/articles/predictive-work-schedule-laws-a-city-by-city-guide/)
- [Paycom — Predictive Scheduling Laws](https://www.paycom.com/resources/blog/predictive-scheduling-laws/)
- [Deel — Fair Workweek Laws by State](https://www.deel.com/blog/fair-workweek-laws-by-state/)
- [WorkAxle — Predictive Scheduling Laws 2026](https://workaxle.com/blog/predictive-scheduling-laws-2026)

### Planningsmethodiek en afbakening
- [PMI — Resource scheduling: capacity schedule construction (CPM gaat uit van oneindige capaciteit)](https://www.pmi.org/learning/library/resource-scheduling-capacity-schedule-construction-5376)
- [Microsoft Learn — Finite capacity planning and scheduling (Dynamics 365 SCM)](https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/planning-optimization/finite-capacity)
- [Nexelem — Finite vs. Infinite Capacity Planning](https://nexelem.com/en/blog/finite-vs-infinite-capacity-planning-which-approach-fits-your-factory/)
- [Elevatiq — Advanced Planning and Scheduling (APS): Finite vs Infinite Capacity Planning Explained](https://www.elevatiq.com/events-and-webinars/advanced-planning-and-scheduling-aps-finite-vs-infinite-capacity-planning-explained/)
- [ScheduleReader — Linear Scheduling vs Critical Path Method](https://schedulereader.com/linear-scheduling-vs-critical-path-method-the-art-of-project-scheduling/)
- [Waterloo Software — Advanced Planning and Scheduling for Engineer-to-Order Businesses](https://www.waterloo-software.com/advanced-planning-and-scheduling-for-engineer-to-order-businesses/)
- [International Journal of Production Research (2020) — Production planning and project scheduling for engineer-to-order systems](https://www.tandfonline.com/doi/full/10.1080/00207543.2020.1717009)

### Adoptie, faalmodi en gebruikerservaring
- [McKinsey — The quiet enabler: data management best practices for APS deployments](https://www.mckinsey.com/capabilities/operations/our-insights/the-quiet-enabler-data-management-best-practices-for-aps-deployments)
- [Qwinn Partners — Why Do Advanced Planning System Implementations Often Fail?](https://qwinnpartners.com/why-do-advanced-planning-system-implementations-often-fail/)
- [Synchrono — Why APS Implementations Fail and How to Avoid It](https://www.synchrono.com/why-aps-implementations-fail/)
- [ScienceDirect — An ERP Data Quality Assessment Framework for APS Implementation](https://www.sciencedirect.com/science/article/pii/S1877050922002277)
- [Collidetech — Why Traditional APS Systems Fail Under Real Variability](https://www.collidetech.com/blog/why-traditional-aps-systems-fail)
- [Panorama Consulting — Overcoming Data Quality Issues in Implementing an ERP System](https://www.panorama-consulting.com/data-quality-issues-in-implementing-an-erp/)
- [DecisionBrain — APS Software Statistics 2026](https://decisionbrain.com/)
- [Qlector — How Leading Manufacturers Plan Production: 50% Still Depend on Excel](https://qlector.com/)
- [IoT Analytics — MES Market 2025-2031](https://iot-analytics.com/)
- [ISE Team — Why Manufacturers Still Use Pen and Paper or Spreadsheets](https://iseteam.com/)

### Kosten van vertraging
- [Siemens — The True Cost of an Hour's Downtime: An Industry Analysis (juli 2024)](https://blog.siemens.com/2024/07/the-true-cost-of-an-hours-downtime-an-industry-analysis/)
- [Siemens — True Cost of Downtime 2024 (PDF)](https://assets.new.siemens.com/siemens/assets/api/uuid:3d606495-dbe0-43e4-80b1-d04e27ada920/TCOD-2024_original.pdf)
- [Erwood Group — The True Costs of Downtime in 2025](https://erwoodgroup.com/blog/)
- [SMC Electric — The True Cost of Downtime](https://smcelectric.com/company/industry-insights/)

### Sectorstatistiek
- [Eurostat — Businesses in the manufacturing sector (2,2 mln ondernemingen, 30,3 mln werkzame personen, 2023)](https://ec.europa.eu/eurostat/statistics-explained/SEPDF/cache/10086.pdf)
- [Eurostat — Structural Business Statistics overview](https://ec.europa.eu/eurostat/web/structural-business-statistics)
- [Eurostat — Key Figures on European Business 2024](https://ec.europa.eu/eurostat/web/products-eurostat-news/w/wdn-20240719-1)

### Prefab / modulaire bouw (raakvlak)
- [Modular Building Institute — The How-To Guide For Prefab Scheduling (jan 2025)](https://www.modular.org/2025/01/03/the-how-to-guide-for-prefab-leaders-actively-manage-your-prefab-schedule/)
- [Offsight — Production management voor offsite manufacturing](https://www.offsight.com)
- [Autodesk University — Integrated BIM Workflows in Modular Prefabricated Construction](https://www.autodesk.com/autodesk-university/article/Integrated-BIM-Workflows-Modular-Prefabricated-Construction-Concept-Fabricate-2020)
- [Stream Modular — Project Management Software for the Modular Offsite Construction Industry](https://streammodular.com/blog/expert-insight-project-management-software-for-the-modular-offsite-construction-industry/)

---

## Bijlage: betrouwbaarheidsoordeel per cijfersoort

| Cijfersoort | Betrouwbaarheid | Toelichting |
|---|---|---|
| Eurostat maakbedrijven (2,2 mln / 30,3 mln) | **Hoog** | Officiële statistiek; "2,2 mln ondernemingen / >30 mln personen, 2023" direct geverifieerd. De afgeleide 50+-grootteklasseband (1,5–2,5%) is **niet** geverifieerd |
| Kinaxis FY2025 omzet ($548,0 mln) | **Hoog** | Beursgenoteerd persbericht; direct geverifieerd ($548.030k totaal, $362.427k SaaS, +13%/+17%) |
| Siemens $2,3 mln/uur en $695 mln/jaar | **Hoog** | Letterlijk geverifieerd in de primaire TCOD-2024-PDF |
| Blue Yonder FY2025 omzet ($1,42 mrd) | **Middel** | Meerdere secundaire bronnen, maar alle herleidbaar tot hetzelfde bericht; geen gecontroleerde jaarrekening |
| WFM-markt $8–10 mrd (2025) | **Middel** | *Verlaagd van "middel-hoog".* Bronnen niet onafhankelijk in kwaliteit; ARTW intern inconsistent; tabel bevat outliers van $3,29 tot $14,7 mrd |
| Asprova 3.624 fabrieken (jan-2024) | **Middel** | Leverancierclaim, wel specifiek en gedateerd; direct geverifieerd op asprova.net |
| Asprova 52,4% Japanse SCM-markt | **Zeer laag** | *Verlaagd.* PR-bericht van **april 2013**, geen methodologie, dertien jaar oud |
| APS-markt $1,0–4,8 mrd | **Laag** | Factor-4,8 spreiding; definitieverschillen |
| UKG 27% marktaandeel | **Laag** | *Verlaagd.* Apps Run the World geeft zelf óók 24% (2024); VMR 12–15%. Drie onverenigbare cijfers |
| Alle APS-prijsniveaus | **Laag** | Uitsluitend derde-partij-schattingen; geen leverancier publiceert |
| WFM PEPM-prijzen | **Middel** | Meerdere onafhankelijke benchmarks, Planday/Shiftbase publiceren zelf |
| Siemens downtime-cijfers | **Middel-hoog** | Eigen onderzoek Siemens (belanghebbend), maar breed geciteerd en methodisch beschreven; cijfers letterlijk in de primaire PDF teruggevonden |
| Alle met [SCHATTING] gemarkeerde afleidingen | **Eigen redenering** | Uitgangspunten expliciet vermeld; rekenkundig nagerekend in de verificatieronde, maar niet extern gevalideerd |

---

## Verificatie

**Verificatieronde:** 25 juli 2026, adversarieel — per bewering is actief gezocht naar weerlegging, niet naar bevestiging. Alle doorgerekende schattingen zijn handmatig nagerekend. WebSearch-quota was uitgeput; verificatie liep via directe `WebFetch` op primaire bronnen (leveranciers-PDF's, persberichten, prijspagina's) en een zoekmachine-proxy.

**Samenvatting:** 18 beweringen gecontroleerd — **9 bevestigd, 6 gecorrigeerd, 3 onzeker**. Geen enkele kernconclusie van het rapport sneuvelt; de belangrijkste correctie raakt de *vergelijking* WFM ↔ projectplanning, niet de afbakeningsthese.

### Bevestigd

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 1 | Kinaxis FY2025: totale omzet **$548,0 mln (+13%)**, SaaS **$362,4 mln (+17%)** | **Bevestigd** — exact $548.030k / $362.427k in het persbericht | https://www.kinaxis.com/en/news/press-releases/2026/kinaxis-inc-reports-record-fourth-quarter-2025-results |
| 2 | MarketsandMarkets WFM: **$9,57 mrd (2025) → $15,67 mrd (2030), CAGR 10,4%** | **Bevestigd** — letterlijk op de rapportpagina; CAGR nagerekend: (15,67/9,57)^(1/5) = 10,4% ✅ | https://www.marketsandmarkets.com/Market-Reports/workforce-management-market-27548173.html |
| 3 | Siemens: automotive **$2,3 mln per uur** ongeplande stilstand; **$695 mln per jaar** voor een stilstaande productielijn in een grote fabriek | **Bevestigd** — beide letterlijk in de primaire PDF ("In Automotive, unplanned downtime now costs $2.3 million an hour"; "the cost of an idle production line at a big plant is now $695 million a year, 1.5 times higher than five years ago"). Ook: heavy industry $59 mln/jaar | https://assets.new.siemens.com/siemens/assets/api/uuid:1b43afb5-2d07-47f7-9eb7-893fe7d0bc59/TCOD-2024_original.pdf |
| 4 | **CAI Software neemt PlanetTogether over, aangekondigd 24 juni 2026**; AVEVA is slechts partner, geen overnemer | **Bevestigd** — persbericht bevestigt acquirer, datum, rebranding naar "CAI PlanetTogether" | https://www.prnewswire.com/news-releases/cai-software-acquires-planettogether-strengthening-advanced-planning-and-scheduling-capabilities-across-manufacturing-302809997.html |
| 5 | Asprova: **3.624 fabrieken wereldwijd per januari 2024** | **Bevestigd** — letterlijk: "In January 2024, the number of installed factory worldwide was 3,624" | https://asprova.net/implementation-status-en/ |
| 6 | frePPLe: PoC **€2.000–5.000**, implementatie **€5.000–25.000**, **15% korting** bij jaarfacturatie, prijs op basis van *item × location pairs* | **Bevestigd** — alle vier elementen staan op de prijspagina | https://frepple.com/pricing/ |
| 7 | **Timefold Solver 2.0** verplaatste de explainability-API's naar een betaalde editie; kern blijft Apache 2.0 | **Bevestigd** — Timefold zelf: "Starting with 2.0, Explainability moves to Timefold Solver Plus, a new paid edition"; ook bevestigd in GitHub-discussie #2272 | https://timefold.ai/blog/timefold-solver-2-0-release · https://github.com/TimefoldAI/timefold-solver/discussions/2272 |
| 8 | **11 Amerikaanse jurisdicties** handhaven predictive-scheduling-/fair-workweek-wetgeving | **Bevestigd** — Oregon (enige staat) + 10 lokale jurisdicties (SF, Emeryville, Berkeley, LA City, LA County, Chicago, Evanston, Seattle, Philadelphia, NYC) | https://www.workaxle.com/blog/predictive-scheduling-laws-2026 · https://www.joinhomebase.com/blog/predictive-scheduling-laws |
| 9 | **IDC PPM: $7,46 mrd in 2024, +11,5%** | **Bevestigd** — "grew 11.5% to $7.46 billion in 2024" | https://my.idc.com/getdoc.jsp?containerId=US52252825 |

*Aanvullend bevestigd, niet apart genummerd:* Eurostat 2,2 mln maakbedrijven / >30 mln werkzame personen (2023); UKG Pro **$27–37 PEPM** en implementatie **40–70%** van de jaarlijkse softwarekosten (OutSail); supplychainresearch.com **$200–400 per gebruiker per maand** (letterlijk citaat); Blue Yonder **$1,42 mrd FY25** (meerdere secundaire bronnen, alle herleidbaar tot hetzelfde bericht); Planday Starter **£2,99** met min. 5 gebruikers en 30 dagen proef; APS-mediaan **$1,46 mrd** en modus **$1,08 mrd** (handmatig nagerekend over de tien waarnemingen ✅).

### Gecorrigeerd

| # | Bewering | Oordeel en correctie | Bron |
|---|---|---|---|
| 10 | Apps Run the World WFM: **"$8,7 mrd 2024, +12,1%"** met **CAGR 12,1%** in de tabel van §4.3 | **Gecorrigeerd.** De $8,7 mrd en +12,1% j-o-j kloppen, maar **12,1% is géén CAGR** — ARTW's eigen prognose is **$12,1 mrd in 2029 bij CAGR 6,8%**. De "12,1" was verward met het prognosebedrag. Dit verzwakt de WFM-groeiconsensus van "9–11%" wezenlijk: de methodisch sterkste WFM-bron voorspelt 6,8% | https://www.appsruntheworld.com/top-10-workforce-management-vendors-market-forecast-and-customer-wins/ |
| 11 | Asprova: **52,4% aandeel in de Japanse SCM-markt** | **Gecorrigeerd.** Het cijfer komt uit een BusinessWire-persbericht van **9 april 2013** — dertien jaar oud, zonder onderzoeksbron of methodologie. Gepresenteerd als actuele marktpositie is dat misleidend. Betrouwbaarheidsoordeel verlaagd van "laag-middel" naar **zeer laag** | https://www.businesswirechina.com/en/news/24408.html |
| 12 | Bronverwijzing Siemens **TCOD 2024** en **FMCG $39.000/uur** | **Gecorrigeerd.** De in het rapport gebruikte asset-URL (`uuid:3d606495…`) heet weliswaar `TCOD-2024_original.pdf` maar bevat de **True Cost of Downtime 2022** (© Siemens 2023). De juiste 2024-PDF is `uuid:1b43afb5…`. Gevolg: het FMCG-cijfer van **$39.000/uur is een TCOD-2022-cijfer**; TCOD 2024 kwantificeert FMCG niet apart en stelt dat de kosten daar "stayed stable" en **onder** het niveau van 2019 liggen — dus geen groeiverhaal | 2022: …uuid:3d606495-dbe0-43e4-80b1-d04e27ada920… · 2024: https://assets.new.siemens.com/siemens/assets/api/uuid:1b43afb5-2d07-47f7-9eb7-893fe7d0bc59/TCOD-2024_original.pdf |
| 13 | Bottom-up APS: "50+ medewerkers = 1,5–2,5% van 2,2 mln = **35.000–55.000**" en "beide controles **bevestigen** dat de lage cijfers correct zijn" | **Gecorrigeerd — twee fouten.** (a) *Rekenfout:* 1,5% × 2,2 mln = **33.000**, niet 35.000. (b) *Redeneerfout:* de twee controles bevestigen elkaar niet. De stoelenmethode impliceert **$9.600–19.200 per klant/jaar** (4 planners × $200–400 × 12), de licentiemethode neemt **$20.000–30.000 per klant** aan — een factor ~2 op precies de dragende aanname; de ondergrenzen liggen op $0,48 mrd resp. $1,00 mrd. Houdbare conclusie: beide landen binnen **$0,5–2,6 mrd** en sluiten Dataintelo's $4,8 mrd uit — níét dat $1,2–1,7 mrd dubbel bevestigd is. De onderliggende rekensommen ($1,00/$2,63 mrd resp. $0,48/$1,68 mrd) zijn wél correct ✅ | https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Businesses_in_the_manufacturing_sector · https://supplychainresearch.com/research-library/buyers-guide-production-scheduling-aps |
| 14 | Gartner MQ Supply Chain Planning Solutions 2025 — Leaders: "Kinaxis, o9, Blue Yonder **en SAP**" | **Gecorrigeerd/onvolledig.** Kinaxis (11e keer), o9 en Blue Yonder (12e keer, furthest in Completeness of Vision) zijn bevestigd. **OMP ontbrak** — dat werd "positioned highest for Ability to Execute", voor de 10e opeenvolgende keer. **SAP als Leader kon niet worden bevestigd** | https://omp.com/news-events/news/2025/omp-highest-for-ability-to-execute-in-gartner-magic-quadrant-for-supply-chain-planning-solutions · https://www.businesswire.com/news/home/20250421590060/en/ |
| 15 | Shiftbase-tarieven **€3,50 / €4,50–5 / €7** en de afgeleide contractwaarde **€2.100–4.200/jaar** | **Gecorrigeerd.** Actuele prijspagina: Basic **€4,00** (€3,60 jaarlijks), Premium **€5,00** (€4,50), Enterprise **€6,00** (€5,40), met 6/12/48 inbegrepen medewerkers. De €3,50 en €7 zijn achterhaald. Herrekend voor 50 medewerkers: **€2.160–€3.600/jaar** in plaats van €2.100–4.200 | https://www.shiftbase.com/nl/tarieven |

### Onzeker

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 16 | **UKG is nummer 1 met ca. 27% marktaandeel** | **Onzeker.** Apps Run the World publiceert twee onverenigbare cijfers voor hetzelfde jaar: 27% (top-10-pagina) versus "UKG's lead … stands unchanged at a solid **24%** in 2024" bij een totale markt van **$7.951 mln** en +8,4% groei. Met VMR's 12–15% erbij zijn er drie waarden. UKG's *nummer-1-positie* staat niet ter discussie; het percentage wel | https://www.appsruntheworld.com/ukg-overhauls-operations-as-ceo-makes-preemptive-moves/ |
| 17 | **WFM totaal 2025 = $9–10 mrd**, "het meest betrouwbare cijfer in dit rapport want vier onafhankelijke bronnen clusteren" | **Onzeker → bijgesteld naar $8–10 mrd.** Drie bezwaren: (a) de clustering is deels selectie — dezelfde tabel bevat $3,29 mrd (Intel Market Research) en $14,7 mrd (Future Market Report), factor 4,5; (b) de bronnen zijn niet onafhankelijk in kwaliteit — Verified Market Reports en Dataintelo zijn dezelfde tier-3-categorie die elders in het rapport terecht wordt gewantrouwd (Dataintelo levert óók de $4,8 mrd APS-outlier); (c) ARTW is intern inconsistent (zie #16). Het predicaat "meest betrouwbare cijfer in dit rapport" is niet houdbaar — dat is nu Kinaxis/IDC/Siemens | https://www.appsruntheworld.com/top-10-workforce-management-vendors-market-forecast-and-customer-wins/ · https://intelmarketresearch.com/workforce-management-software-market-16051 |
| 18 | **Enterprise WFM, 20.000 medewerkers = $6,5–8,9 mln/jaar** (UKG Pro WFM) | **Onzeker.** De rekensom klopt (20.000 × $27–37 × 12 = $6,48–8,88 mln; implementatie 40–70% → $2,59–6,22 mln ✅), maar twee inputs deugen niet: (a) OutSail's $27–37 PEPM geldt voor **UKG Pro als volledige HCM-suite**, niet voor WFM alleen; (b) lijstprijs-PEPM geldt niet bij 20.000 seats — vergelijk de Workday-benchmark met een **mediaan van $50.000/jaar** over 345 geverifieerde aankopen. Te behandelen als **bovengrens** | https://www.outsail.co/post/how-much-does-ukg-cost · https://vendorbenchmark.com/blog/workday-pricing-benchmark-per-employee |

### Nagerekende schattingen — uitkomst

| Doorrekening | Uitkomst |
|---|---|
| APS bottom-up licentiemethode: 50.000 × $20.000 / 87.500 × $30.000 | **$1,00–2,63 mrd** ✅ correct |
| APS bottom-up stoelenmethode: 200.000–350.000 × $200–400 × 12 | **$0,48–1,68 mrd** ✅ correct (maar zie #13) |
| APS-mediaan van 10 waarnemingen | **$1,46 mrd** ✅ correct; modus $1,08 mrd ✅ |
| "APS-licentie van $150.000 terugverdiend bij 4 stilstandminuten" | $2,3 mln / 60 × 4 = **$153.333** ✅ correct |
| WFM 20.000 medewerkers × $27–37 PEPM | **$6,48–8,88 mln** ✅ correct (aannames wankel, zie #18) |
| WFM implementatie 40–70% daarvan | **$2,59–6,22 mln** ✅ correct |
| Quinyx 1.000 medewerkers × $3–8 PEPM | **$36.000–96.000** ✅ correct |
| Shiftbase/Planday 50 medewerkers | ⚠️ **€2.160–3.600**, niet €2.100–4.200 (verouderde tarieven) |
| "1,5% van 2,2 mln maakbedrijven" | ⚠️ **33.000**, niet 35.000 |
| CAGR-controle MarketsandMarkets, Emergen, Dataintelo, VMR, Future Market Report | ✅ alle intern consistent met hun eigen begin/eindwaarden |
| CAGR-controle Exactitude (14,63%) en Transpire Insight (20,02%) | ⚠️ **niet reproduceerbaar** uit de vermelde begin- en eindwaarden (herberekend: ~13,1% resp. ~18,8% over 2025–2033/34). Beide zijn toch al als outliers gemarkeerd |

### Wat na verificatie ongewijzigd overeind blijft

De **kernthese van het rapport is niet aangetast**: APS, WFM en projectplanning zijn categorisch verschillende markten (ander planningsobject, ander rekenmodel, andere koper, andere standaarden, andere compliance-logica), APS in enge zin is kleiner dan projectplanning, en het strategische advies — behandel APS/WFM als integratiedoelen en niet als uitbreidingsmarkten, met de prefab/modulaire naad als het echte gat — wordt door geen van de correcties ondermijnd. Wél gesneuveld: de formulering **"WFM is fors groter dan projectplanning"** (met IDC's PPM-cijfer wordt dat "vergelijkbaar tot matig groter") en de claim dat het WFM-cijfer **"het meest betrouwbare cijfer in dit rapport"** is.
