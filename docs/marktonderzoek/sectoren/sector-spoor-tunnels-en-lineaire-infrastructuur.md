# Sectorrapport: Spoor, tunnels en lineaire infrastructuur

**Onderdeel van:** wereldwijd marktonderzoek planningssoftware
**Sector:** Spoor, tunnels en lineaire infrastructuur (rail, metro, hogesnelheidslijnen, geboorde en geboorde/geboorde tunnels, pijpleidingen, transmissielijnen, snelwegcorridors)
**Peildatum onderzoek:** juli 2026
**Status cijfers:** alle bedragen met bron-URL; eigen berekeningen zijn expliciet gemarkeerd als **[SCHATTING]**

---

## 0. Managementsamenvatting

1. **De sector is planning-intensief maar softwarearm.** De onderliggende bouwstroom is enorm (spoorinfrastructuur ca. USD 109 mld in 2025, tunnelbouw ca. USD 112–118 mld in 2025), maar de planningssoftware die erop draait is een fractie van een procent daarvan. De hele mondiale markt voor *bouwplanningssoftware* was USD 1,44 mld in 2025 ([The Business Research Company](https://www.thebusinessresearchcompany.com/report/construction-schedule-software-global-market-report)).
2. **Oracle Primavera P6 is de contractuele standaard**, niet de beste tool. Het wordt afgedwongen door opdrachtgevers (Crossrail, California High-Speed Rail, USACE, Network Rail-ketens, Rail Baltica-vacatures) en is daarmee de facto leveringsformaat (XER / P6 XML).
3. **Lineaire planning (tijd-wegdiagram) is een eigen niche omdat CPM-tools geen afstandsbegrip hebben.** Dat is letterlijk de kritiek in de vakliteratuur: "These systems do not understand distance" ([Software Options for Linear Project Planning, 2016](https://tilosamericas.com/wp-content/uploads/Software-Options-for-Linear-Project-Planning-1-1.pdf)).
4. **De marktleider in die niche wordt vervangen — niet opgeheven.** ⚠️ *Gecorrigeerd na verificatie.* Trimble TILOS gaat per **1 maart 2026** in End of Maintenance; **11.1 MR4** is de laatste release. Maar dezelfde aankondiging noemt een opvolger: **TILOS 360**, "the next generation of linear scheduling technology", release aangekondigd voor **april 2026**; TILOS 11 blijft ook na 1 maart 2026 te koop en te verlengen ([BuildingPoint aankondiging](https://help.buildingpoint.com.au/hc/en-au/articles/55527556493849--Important-Announcement-Tilos-Entering-End-of-Maintenance-on-1-March-2026), volledige tekst opgehaald via de Zendesk-API van dezelfde helpcenter). Er is dus wél migratieonzekerheid en een bevriezingsrisico voor lopende 11.x-installaties, maar de eerdere lezing "de niche wordt dakloos / het premiumsegment valt weg" is te sterk en is in dit rapport overal bijgesteld.
5. **Betalingsbereidheid is hoog, prijsgevoeligheid laag** — maar alleen voor tools die contractueel *toegelaten* zijn. Een licentie van EUR 700–4.000 per planner per jaar staat tegenover planner-dagtarieven van GBP 350–600 ([YP Recruitment](https://yprecruit.co.uk/roles/planning-engineer/)); software is 3–5% van de kosten van de mens die hem bedient.
6. **Segmentomvang [SCHATTING]:** ⚠️ *Naar beneden bijgesteld na narekenen (zie §4.2).* De eigen bottom-upketen levert **USD 90–250 mln per jaar** op met middenwaarde **≈ USD 150–170 mln**, niet de eerder genoemde 200–300 mln; 200–300 mln is alleen de bovenkant van de eigen bandbreedte. De *specialistische lineaire/time-chainage-nichesoftware zelf* komt uit op ca. **USD 6–15 miljoen per jaar** (optelling van de deelposten geeft 5,8–14,3 mln). Groeirichting: onderliggende bouwmarkt +6–10% CAGR, nichesoftware consolideert.

---

## 1. Wat deze sector bijzonder maakt qua planning

### 1.1 Schaal en doorlooptijd: decennia, niet jaren

Deze sector produceert de langstlopende bouwprogramma's ter wereld. Harde referenties:

| Programma | Kosten | Doorlooptijd / vertraging | Bron |
|---|---|---|---|
| HS2 (VK, Londen–Birmingham) | **GBP 87,7–102,7 mld** (mei 2026, gemengde prijsbasis); stijging van **GBP 35,9–37,2 mld** t.o.v. 2020 excl. inflatie (>100% aan de onderkant) | Openstelling Old Oak Common–Birmingham **mei 2036 – oktober 2039**; volledige lijn **mei 2040 – december 2043**; **3 tot 13 jaar later** dan de raming van 2020 | [NAO, *High Speed Two reset*, HC 52, 29 juni 2026](https://www.nao.org.uk/wp-content/uploads/2026/06/high-speed-two-reset-summary.pdf) |
| HS2 – reeds uitgegeven | **GBP 46,8 mld** (nominaal) t/m maart 2026, inclusief de geschrapte Phase 2 | — | idem |
| HS2 – kosten van de *reset zelf* | **GBP 153 mln** geraamd, waarvan GBP 101 mln uitgegeven t/m maart 2026 | Reset loopt jan-2025 → voorjaar 2027 | idem |
| Rail Baltica | Oorspronkelijk **EUR 5,8 mld** (prijspeil 2017), risicogecorrigeerd EUR 7 mld → **EUR 15,3 mld** voor fase 1, **EUR 23,8 mld** voor het geheel; +160% in zes jaar | Oorspronkelijk gereed 2025 → fase 1 in 2030, exploitatie mogelijk pas 2031 | [ERR News / Europese Rekenkamer 2025](https://news.err.ee/1609915685/rail-baltica-phase-one-will-cost-at-least-24-billion-eu-auditors-say) |
| Rail Baltica – financieringsgat | Tekort **EUR 10–19 mld**; Estland EUR 2,7 mld, Letland EUR 7,6 mld, Litouwen EUR 8,7 mld | Financieringsgat valt in 2027–2028 | [LRT / Baltische rekenkamers](https://www.lrt.lt/en/news-in-english/19/2295226/baltic-auditors-say-rail-baltica-faces-eur19-billion-cost-overruns-and-delays) |
| Brenner Basistunnel | 55 km, tweede langste spoortunnel ter wereld; ca. **17 miljoen m³** tunnelspecie | Aanbesteding startte 2006; nog in uitvoering | [Trimble klantverhaal BBT (PDF)](https://heavycivil.trimble.com/rs/168-CRJ-586/images/022482-3575_CaseStudy_TILOS-BrennerBaseTunnel_A4_062916.pdf) |

> Let op: het Trimble-klantverhaal noemt "an estimated budget of more than 8 million Euros" voor de Brenner Basistunnel. Dat is aantoonbaar een schrijffout in het brondocument (miljard, niet miljoen); ik neem het cijfer daarom niet over.

**Planningsgevolg:** een baseline die 15–20 jaar moet meegaan, moet honderden keren opnieuw worden gebaseline'd, en elke revisie is een contractueel feit. Bestandsformaat-stabiliteit en auditbaarheid over decennia zijn hier geen luxe. De NAO constateert dat HS2 pas **voorjaar 2027** een robuuste kosten- en planningsbaseline verwacht te hebben — 17 jaar na de start van het programma.

### 1.2 Ruimtelijke complexiteit: de derde as

Het definiërende kenmerk: het werk beweegt over een *lijn*, niet binnen een *gebouw*. Het witboek dat de niche het scherpst omschrijft:

> "The most obvious difference with a linear project is that you don't control the right-of-way as you do in a facility project. ROW conditions, access (land ownership), environmental restrictions and the requirement to maintain traffic flow, create a challenge to any planner."
> — [*Software Options for Linear Project Planning*, Duncan & MacLeod, juli 2016](https://tilosamericas.com/wp-content/uploads/Software-Options-for-Linear-Project-Planning-1-1.pdf)

De methodiek is ouder dan CPM-software: **Line of Balance**, ontwikkeld door de US Navy in de jaren '50; tegenwoordig ook *time-chainage*, *time-location diagram*, *march chart* (zelfde bron).

Wat een tijd-wegdiagram oplevert dat een Gantt niet kan:
- **Waar** ben je op datum X (nodig voor kruisingen, wegafsluitingen, oplevermomenten per kilometer);
- **Productiesnelheid** als visuele helling — een steilere lijn is een snellere ploeg;
- **Clashes**: twee activiteiten op dezelfde kilometer op hetzelfde moment;
- **Sequencing van ploegen** over de corridor, incl. skips en move-arounds die in een Gantt alleen als extra regels te modelleren zijn.

Praktijkbewijs uit de Brenner Basistunnel: het tijd-wegdiagram werd oorspronkelijk (2006) in CAD getekend, maar:

> "It proved too time-consuming over the course of the project, as the information could not be linked with each other according to the precedence diagram method (PDM). Changes in the plan […] required a complete overhaul of the CAD planning. 'This process was tedious and prone to error,' explains Stephan Rieder from […] Brenner Basistunnel BBT SE."
> — [Trimble BBT case study](https://heavycivil.trimble.com/rs/168-CRJ-586/images/022482-3575_CaseStudy_TILOS-BrennerBaseTunnel_A4_062916.pdf)

### 1.3 Resourcecomplexiteit: tijdsafhankelijke kosten en schaarse machines

Tunnelbouw en spoor kennen resourceprofielen die in gebouwenbouw nauwelijks voorkomen:

- **TBM's kosten geld per dag, niet per meter.** Het BBT-verhaal is expliciet: "the BBT project generates high expenses through their tunnel borers that are not based on the work progress, but rather time-dependent" — en die moesten als apart kostentype met eigen histogram worden gemodelleerd ([bron](https://heavycivil.trimble.com/rs/168-CRJ-586/images/022482-3575_CaseStudy_TILOS-BrennerBaseTunnel_A4_062916.pdf)).
- **Grondbalans / mass haul** is een planningsvariabele: BBT moest 17 mln m³ specie naar meerdere stortlocaties met eindige capaciteit; die capaciteit zit ín het plan.
- **Productiesnelheid varieert per locatie**: bij BBT werden bergprofielen met **1 meter resolutie** in Excel bijgehouden om per homogene zone een andere boorsnelheid te kunnen aanhouden.
- **TBM-voortgang is stochastisch en geologie-afhankelijk** — er is een hele onderzoeksliteratuur die TBM advance rates met machine learning voorspelt om schedule risk te kwantificeren (o.a. [tbm-rop-predictor](https://github.com/wxb-sly/tbm-rop-predictor), [tbm-advance-rate-calculator](https://github.com/kilickursat/tbm-advance-rate-calculator)).
- **Spooropbrengst hangt aan buitendienststellingen.** Werk aan een operationeel net kan alleen in *possessions/blockades*. In het VK draait dat op het **Possession Planning System (PPS)** van Network Rail ([pps.networkrail.co.uk](https://pps.networkrail.co.uk)) en op formele toegangsregimes van de toezichthouder ([ORR track access guidance, 2024](https://www.orr.gov.uk/sites/default/files/2024-03/track-access-guidance-possessions-regime.pdf)). Voor ERTMS/ETCS-uitrol geldt bovendien dat "signalling, interlocking and level crossing renewals on the live rail network cannot simply pause for a multi-year rollout" ([Railway-News](https://railway-news.com/planning-etcs-rollouts-alongside-everyday-renewal-work/)).

### 1.4 Contractuele eisen: de planning ís het contract

Op deze programma's is de planning een formeel contractdocument met een eigen indienings-, review- en goedkeuringscyclus. Voorbeeld California High-Speed Rail Authority:

- Elke Design-Build-aannemer moet een **projectspecifieke baseline schedule** ter goedkeuring indienen bij de Authority en haar Project Construction Management-team;
- Daarna maandelijkse **schedule packages** (Monthly Progress Report + Schedule Progress Update);
- De interne audit constateerde: van 108 maandelijkse pakketten werden ze **91% van de tijd meer dan een week te laat** ingediend
- ([CHSRA, *Program Schedule Management* auditrapport, 2023 (PDF)](https://hsr.ca.gov/wp-content/uploads/2023/05/Program-Schedule-Management-A11Y.pdf))

Crossrail formaliseerde hetzelfde in een publiek *Planning and Scheduling Handbook* met verplichte P6 global project- en activity codes voor Level 1- en Level 2-planningen, vaste P6-layouts, en een verplichte *Level 2 Schedule Narrative* met basis en aannames ([Crossrail Learning Legacy](https://learninglegacy.crossrail.co.uk/documents/the-planning-handbook/)).

En in de scherpste vorm: bij de **Brenner Basistunnel waren alle betrokken bedrijven verplicht TILOS te gebruiken** voor projectplanning ("All companies involved in the BBT project are required to use Trimble TILOS for project planning") — een tool-mandaat, niet slechts een formaat-mandaat ([bron](https://heavycivil.trimble.com/rs/168-CRJ-586/images/022482-3575_CaseStudy_TILOS-BrennerBaseTunnel_A4_062916.pdf)).

### 1.5 Kosten van vertraging: waarom niemand op tooling bezuinigt

- HS2's kostenstijging wordt door de NAO toegeschreven aan "cost underestimation, inefficient delivery and scope changes"; de baten-kostenverhouding zou bij de huidige kostenkennis in 2020 **0,3–0,4** zijn geweest ("poor value for money") in plaats van de destijds gerapporteerde waarde ([NAO HC 52](https://www.nao.org.uk/wp-content/uploads/2026/06/high-speed-two-reset-summary.pdf)).
- HS2 identificeerde bij het afwikkelen van historische kosten circa **GBP 500 mln aan disallowable costs** — precies het soort bedrag dat wordt betwist met planningsbewijs (idem).
- Geschillen in de bredere bouw: de gemiddelde waarde van een bouwgeschil in Noord-Amerika steeg in 2024 met circa 40% naar **USD 60,1 mln** (Arcadis Global Construction Disputes Report 2025, geciteerd via [LinkedIn-samenvatting](https://www.linkedin.com/posts/joe-seibold-602862b_the-2025-construction-disputes-report-has-activity-7348359836314517506-POxD) en [CMAA (PDF)](https://www.cmaanet.org/sites/default/files/2025-09/202515~1.PDF)); een andere weergave noemt USD 54,7 mln en 14,7 maanden gemiddelde doorlooptijd ([Drone Brothers case study](https://thedronebrothers.com/case-study-04-dispute-prevention.html)). *Deze cijfers zijn secundair geciteerd; het originele Arcadis-rapport is niet direct opgehaald.*
- Projectmanagement inclusief project controls kost typisch **9–15% van de projectkosten** ([PMI, *Project Management: How Much Is Enough?*](https://www.pmi.org/learning/library/project-management-much-enough-appropriate-5072)).

**De conclusie voor betalingsbereidheid:** wanneer één maand vertraging op een programma van GBP 4 mld/jaar orde GBP 300 mln kost en één geschil orde USD 50–60 mln waard is, is een licentiediscussie van EUR 3.000 per planner ruis. Wat wél telt is *toelaatbaarheid*: kan het bestand worden ingediend, gereviewd en in een claim worden verdedigd.

---

## 2. Welke planningssoftware hier daadwerkelijk gebruikt wordt

### 2.1 Rangorde (mondiaal, deze sector)

| # | Pakket | Rol | Typische gebruiker |
|---|---|---|---|
| 1 | **Oracle Primavera P6** (Professional / EPPM / Primavera Cloud) | De contractuele CPM-ruggengraat; leveringsformaat | Opdrachtgevers, hoofdaannemers, JV's, engineeringbureaus, claimadviseurs |
| 2 | **Elecosoft Asta Powerproject** | CPM + line of balance + time-chainage in één; dominant in VK-keten | VK-hoofdaannemers en onderaannemers; toenemend infra |
| 3 | **Trimble TILOS** *(EOM 1-3-2026)* | De diepe tijd-wegtool; mass haul, corridorlogistiek | Tunnel-/spoor-/pijpleidingaannemers, opdrachtgevers van megaprojecten |
| 4 | **Microsoft Project** | Onderaannemers, kleine deelcontracten, ontwerpplanningen | Tier-2/3, ontwerpteams |
| 5 | **Turbo-Chart** (Linear Project Software) | Goedkope tijd-weg-visualisatielaag bovenop P6/Asta/MSP/Safran | Planners bij aannemers en adviesbureaus |
| 6 | **Deltek Acumen Fuse / Acumen Risk** | Schedule-kwaliteitspoort en Monte Carlo | Opdrachtgevers en PMO's, verplichte review |
| 7 | **Bentley SYNCHRO 4D** | 4D-simulatie, constructability, model-gekoppelde planning | Grote aannemers, digital-delivery teams |
| 8 | **Safran Project / Safran Risk** | CPM + geïntegreerd risico | Olie/gas-afkomstige contractors, ook infra |
| 9 | **Nichetools time-chainage**: LinearPlus / QEI Exec (PCF Ltd), TimeChainage, ChainLink, DynaRoad (Topcon) | Diagramgeneratie of deeldomein (mass haul) | Specialisten, VK-markt, wegenbouw |
| 10 | **AI/analytics-laag**: ALICE Technologies, Nodes & Links, Aphex | Generatieve scheduling, schedule-analytics, kortcyclisch werkplannen | Innovatieteams bij tier-1 en opdrachtgevers |

### 2.2 Bewijs per laag

**Primavera P6 als opgelegde standaard**
- California High-Speed Rail Authority: "Primavera P6 software for developing the baseline schedules of the overall program and projects and utilizing Deltek Acumen Fuse for quality assessments of contractor's schedules" ([CHSRA audit, PDF](https://hsr.ca.gov/wp-content/uploads/2023/05/Program-Schedule-Management-A11Y.pdf)).
- Crossrail: verplichte P6-codes, -conventies en -layouts voor Level 1/2 ([Crossrail Learning Legacy](https://learninglegacy.crossrail.co.uk/documents/the-planning-handbook/)).
- Rail Baltica: de vacature *Senior Project Controls Engineer* bij RB Rail eist schema's "using professional CPM planning software (Oracle Primavera P6)" en critical-path-analyse ([railbaltica.org](https://railbaltica.org/lv/vakances/senior-project-controls-engineer/)); risicomanagement werd op P6 gebouwd ([RailwayPro](https://www.railwaypro.com/wp/rb-rail-starts-risk-management-system-implementation/)).
- HS2 Ltd: de programme-controls-transformatie draaide om herconfiguratie en integratie van bestaande systemen "(PRISM, Primavera P6, Xactium etc.)" ([Deloitte case study](https://www.deloitte.com/uk/en/Industries/infrastructure/case-studies/programme-controls-transformation-high-speed-2-case-study.html)).
- USACE: de master guide specification **UFGS 01 32 01.00 10 Project Schedule** (editie augustus 2023, Change 1 augustus 2024) regelt P6-instellingen en native-bestandsuitwisseling. ⚠️ *Gecorrigeerd na verificatie van de brontekst.* De eerder geciteerde zin "request a backup file template (.xer) from the Government" komt **niet** in de spec voor, en het aparte Jacksonville-district-document ([USACE MGS 013201, editie 2014](https://www.usace.army.mil/Portals/44/docs/Engineering/MasterGuideSpecs/013201.pdf)) bevat geen enkele vermelding van `.xer` of van global/project-level codes. Wat de actuele UFGS wél letterlijk zegt ([PDF via WBDG](https://nibs-s3-wbdg3-production.s3.us-east-1.amazonaws.com/FFC/DOD/UFGS/UFGS%2001%2032%2001.00%2010.pdf); [WBDG-indexpagina](https://www.wbdg.org/dod/ufgs/ufgs-01-32-01-00-10)):
  - "The Government uses Primavera P6. Ensure exported schedule files are compatible with the version of P6 used by the Government."
  - §2.1.2.1: "If Primavera P6 is selected for use, provide the 'xer' export file in a version of P6 importable by the Government system."
  - §3.12 PRIMAVERA P6 MANDATORY REQUIREMENTS: "Activity Codes must be Project Level, not Global or EPS level"; "Calendars must be Project Level, not Global or Resource level"; duration type "Fixed Duration & Units"; percent complete "Physical".
  - **Belangrijke nuance die het oorspronkelijke rapport miste:** §2.1.2.2 *Other Than Primavera* staat niet-P6-software uitdrukkelijk toe — maar §2.1.2 eist dat de software "commercially available from the software vendor for purchase with vendor software support agreements available" is en dat de SDEF-routine door de fabrikant wordt ondersteund; en wie geen P6 gebruikt moet de opdrachtgever "two licenses, two computers, and training for two Government employees" leveren. Dat is voor een gratis open-sourceplanner een **scherpere** drempel dan een formaateis, niet een zachtere.

**Asta Powerproject als VK-ketenstandaard**
- "Used by 90% of the top UK main contractors" (Elecosoft-brochure v11, [Scribd](https://www.scribd.com/document/36973702/Asta-Power-Project-Version-11-Brochure)); "trusted by 90 of the top 100 main contractors in the UK" ([PBC Today](https://www.pbctoday.co.uk/news/digital-construction-news/construction-software-news/nodes-links-to-work-on-asta-powerproject-with-elecosoft/132745/)). *Vendor-claim, niet onafhankelijk geverifieerd.*
- Genoemde klanten: Mace, Galliford Try, BAM, Skanska, Kier Group, Bouygues, Balfour Beatty, Keltbray ([eleco.com productpagina](https://eleco.com/products/asta/asta-powerproject/); [Digital Construction Connect over Balfour Beatty](https://www.digitalconstructionconnect.com/guest-blogs/balfour-beatty-using-asta-powerproject-to-rewrite-programme-management-procedures/)).
- Functieset inclusief line of balance, time-chainage en earned value ([dotprotools productoverzicht](https://dotprotools.com/construction-tools/scheduling/asta-powerproject)).
- Concernomzet Eleco plc 2025: **GBP 38,8 mln** (+20% t.o.v. GBP 32,4 mln in 2024), ARR **GBP 34,3 mln** (+29%), 81% terugkerende omzet, adjusted EBITDA GBP 10,2 mln ([Eleco plc jaarresultaten 2025](https://ir.eleco.com/results/latest-results)). Elecosoft claimt >50.000 bedrijven en >120.000 gebruikers over alle producten ([elecosoft.com/us/company/customers](https://elecosoft.com/us/company/customers/)).

**TILOS als de diepe niche-tool — met einddatum**
- Positionering: "desktop based scheduling software specialized for linear infrastructure construction projects such as roads, pipelines, tunnels, power distribution, and earthworks" met tijd-weg-, tijd-Gantt- én afstand-Gantt-weergaven in één layout, volledige CPM-engine, mass-haul-import, GIS-koppeling ([witboek 2016](https://tilosamericas.com/wp-content/uploads/Software-Options-for-Linear-Project-Planning-1-1.pdf); [Trimble productpagina](https://construction.trimble.com/en/products/tilos)).
- Koppelingen: Primavera P6, MS Project, Excel, Asta Powerproject, Trimble Quadri/Novapoint/Business Center/Connect ([Trimble](https://construction.trimble.com/en/products/tilos)).
- Referenties: Brenner Basistunnel ([case study](https://heavycivil.trimble.com/rs/168-CRJ-586/images/022482-3575_CaseStudy_TILOS-BrennerBaseTunnel_A4_062916.pdf)); Thames Tunnel, Parsons, HDR ([tilosamericas.com](https://tilosamericas.com/linear-scheduling-software/)).
- **End of Maintenance per 1 maart 2026; 11.1 MR4 is de laatste update** ([BuildingPoint](https://help.buildingpoint.com.au/hc/en-au/articles/55527556493849--Important-Announcement-Tilos-Entering-End-of-Maintenance-on-1-March-2026)).
- Er is geen publiek cijfer voor de geïnstalleerde basis; alleen marketingclaims ("used in thousands of projects worldwide"; "4 out of 5 Global Leaders in infrastructure project management prefer TILOS", [tilosamericas.com](https://tilosamericas.com/infrastructure-project-management-software/)) en het observatiepunt dat de oorspronkelijke maker klein was: "Linear Project is not a big enterprise" ([Trimble Civil DK](https://civil.trimble.dk/node/648)).

**De VK-tijd-wegtraditie (relevant voor spoor en tunnels)**
- **PCF Ltd** leverde het eerste time-chainage-systeem aan **TransManche Link**, het consortium dat de Kanaaltunnel bouwde; Network Rail gebruikt een maatwerksysteem op basis van QEI Time-Chainage Charts "to optimise track possession management on the national rail network" ([pcfltd.co.uk/solutions/chainage.html](https://www.pcfltd.co.uk/solutions/chainage.html)).
- **LinearPlus** is het instapproduct van PCF, "targeted specifically at the needs of organisations handling linear projects (e.g. tunnels, railways, pipelines)", met import uit MS Project, Primavera Project Planner en Primavera Enterprise ([pcfltd.co.uk/lphome.html](https://www.pcfltd.co.uk/lphome.html)).
- **TimeChainage** (Peter Milton Planning) stelt onomwonden: "most contracts require a Gantt (bar) chart", maar "time chainage charts are now often a contract requirement" ([timechainage.co.uk](https://www.timechainage.co.uk/software/Software.html)).

**De nieuwe laag: 4D en AI-analytics**
- **ALICE Technologies** voor tunnels: TBM-scenario's simuleren, aantal TBM's optimaliseren, grondafvoer en sequencing modelleren. Case: SCS JV (Skanska/Costain/STRABAG) op de HS2-tunnels in Londen, met **GBP 2 mln aan geïdentificeerde besparingen** en een citaat van Andrew Irwin (Costain). Genoemde klanten: Skanska, Costain, STRABAG, Kajima, Parsons, Implenia ([alicetechnologies.com/solutions/for-infrastructure/tunnels](https://www.alicetechnologies.com/solutions/for-infrastructure/tunnels)).
- **Nodes & Links**: schedule-analytics met een expliciete rail-propositie ([nodeslinks.com/solutions/rail](https://nodeslinks.com/solutions/rail/)); haalde USD 12 mln (GBP 9,5 mln) Series B op ([Construction Management](https://constructionmanagement.co.uk/nodes-links-raises-9-5m/)); werkt samen met Elecosoft aan Asta Powerproject ([PBC Today](https://www.pbctoday.co.uk/news/digital-construction-news/construction-software-news/nodes-links-to-work-on-asta-powerproject-with-elecosoft/132745/)); ingezet bij EKFB op HS2 naast Aphex en Power BI ([Movar case study](https://movar.group/case-studies/data-analytics-in-project-controls-ekfb-on-hs2)).
- **Bentley SYNCHRO 4D**: virtuele constructie en model-gebaseerde planning, met een aparte rail-en-transit-propositie op basis van digital twins en 4D/5D ([bentley.com/software/synchro](https://www.bentley.com/software/synchro/); [bentley.com/industries/transportation-rail-and-transit](https://www.bentley.com/industries/transportation-rail-and-transit/)).

### 2.3 Wie gebruikt wat — per rol

| Rol | Primair | Secundair | Waarom |
|---|---|---|---|
| **Opdrachtgever / infrabeheerder** (HS2 Ltd, CHSRA, RB Rail, Network Rail, BBT SE) | P6 EPPM / Primavera Cloud als programma-database | Acumen Fuse voor kwaliteitspoort; Power BI voor rapportage; eigen possession-systemen (PPS) | Moet honderden contractschema's kunnen inlezen, integreren en aanvallen; wil één auditbare waarheid |
| **Hoofdaannemer / JV** (Balfour Beatty, Costain, Skanska, STRABAG, EKFB, SCS) | P6 (contractueel) + Asta Powerproject (intern VK) | TILOS/Turbo-Chart voor tijd-weg; SYNCHRO/ALICE voor constructability; Aphex voor kortcyclisch | Dubbele boekhouding: het contractschema en het werkbare schema |
| **Onderaannemer / tier-2/3** | MS Project, Asta, Excel | Soms niets | Kan P6-licenties niet dragen maar moet wel compatibel leveren |
| **Engineeringbureau / PMO** (AtkinsRéalis, Deloitte, Movar) | P6 + Acumen Fuse | Nodes & Links, maatwerk-Python/Power BI | Levert planning als dienst; must-have is aansluiten op de opdrachtgeversdatabase |
| **Claim-/forensisch adviseur** | P6 (windows-analyse op XER-snapshots) | Acumen Fuse, eigen tooling | Bewijs moet reproduceerbaar zijn in arbitrage |

---

## 3. Wat ervoor betaald wordt

### 3.1 Licentieprijzen (openbaar gevonden, per gebruiker tenzij anders vermeld)

| Product | Prijs | Model | Bron |
|---|---|---|---|
| **Primavera P6 Professional** | ⚠️ ca. **USD 3.880** licentie + **USD 854** eerstejaarssupport (22%) | Perpetueel, named user | [prmyazilim (juni 2025)](https://prmyazilim.com/en/primavera-p6-pricing) — *gecorrigeerd; de eerdere USD 3.520 uit [ProjectManagerTemplate](https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models) was bij hercontrole niet meer op de pagina terug te vinden* |
| **Primavera P6 Enterprise / EPPM** | ⚠️ ca. **USD 4.240** licentie + **USD 933** eerstejaarssupport | Perpetueel + onderhoud | idem. *Het eerdere "USD 2.750 + 605/jaar" maakte EPPM goedkóper dan Professional, wat leveranciersonlogisch is; dat is vermoedelijk een verouderde Oracle-lijstprijs uit ca. 2015–2017.* |
| **P6 EPPM Cloud Service (UK G-Cloud 14)** | **GBP 220 per hosted named user per maand**, **minimaal 25 gebruikers** ✅ letterlijk geverifieerd in het PDF-prijsdocument. Aanvulling: volumekorting 10% (101–200 users) tot 25% (1.001+); Progress Reporter GBP 24/mnd; Web Services GBP 36/mnd; UK Government Cloud GBP 439/mnd bij min. 50 users | Abonnement | [Oracle prijsdocument, UK Digital Marketplace (PDF)](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf) |
| Primavera-onderhoud | ca. **22%** van licentiewaarde per jaar | Jaarlijks | [prmyazilim.com](https://prmyazilim.com/en/primavera-p6-pricing) |
| Primavera, bandbreedte in de praktijk | **USD 3.000–25.000 per gebruiker per jaar**, korting 30–50%, jaarlijkse stijging 5–8% | Onderhandeld | [VendorBenchmark](https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing) |
| **Asta Powerproject** | ca. **USD 2.000 per gebruiker per jaar** ("sticker price"); concurrent licenties verlagen kosten per gebruiker | Abonnement / concurrent / SaaS | [ITQlick](https://www.itqlick.com/asta-powerproject/faq); [shop.eleco.com](https://shop.eleco.com/products/asta-powerproject-uk) |
| **TILOS** | **USD 4.290** flat, eenmalig | Perpetueel (single user / USB / floating network / named user company; ook jaarabonnement) | [Capterra TILOS](https://www.capterra.com/p/235928/TILOS/); licentievormen: [TILOS License Information](https://www.scribd.com/document/461948011/TILOS-License-Information) |
| **Turbo-Chart** | **USD 759 / AUD 1.079 / EUR 699 / GBP 609** per named user per jaar; multi-licentie vanaf 5 stuks met volumekorting | Abonnement | [turbo-chart.com/purchase](https://turbo-chart.com/purchase) |
| **Deltek Acumen Fuse** | eerste jaar vanaf ca. **USD 10.300**; alternatieve opgave **USD 75 per gebruiker per maand** | Abonnement / licentie + verplicht eerstejaarsonderhoud | [Deltek-prijsindicatie via zoekresultaat](https://www.itqlick.com/acumen/pricing); [Prescience (AU)](https://www.prescience.com.au/product/acumen-fuse/) — *bronnen spreken elkaar tegen; behandel als bandbreedte* |
| **ALICE Technologies, Nodes & Links, SYNCHRO, Safran** | Geen publieke prijs; offerte op basis van bedrijfstype, projectomvang, locatie | Enterprise | [ALICE](https://www.alicetechnologies.com/solutions/for-infrastructure/tunnels) |

### 3.2 Implementatie-, trainings- en dienstenkosten

- ITQlick waarschuwt expliciet dat bovenop de Asta-licentie "additional cost such as customization, data migration, training" komt ([ITQlick](https://www.itqlick.com/asta-powerproject/faq)).
- Bij TILOS worden meertalige support, projectteam-ondersteuning en gestructureerde trainingscursussen als aparte dienstenlijn aangeboden ([tilosamericas.com](https://tilosamericas.com/linear-scheduling-software/)).
- **[SCHATTING]** In deze sector is de verhouding diensten:licentie in jaar 1 typisch **1:1 tot 2:1** (configuratie van WBS/coderingsstructuren, kalenders, baselineprocedures, koppeling met kosten- en documentsystemen, training van 10–100 planners), en in stationaire toestand ca. **0,3–0,6:1**. Deze ratio is een ervaringsregel uit enterprise-PPM-implementaties en is *niet* uit een gepubliceerde bron afgeleid.

### 3.3 De echte kostenpost: mensen, niet licenties

- Contractdagtarieven voor ervaren infraplanners in het VK: **GBP 350–600 per dag**, met nucleair/spoor/wegen aan de bovenkant ([YP Recruitment](https://yprecruit.co.uk/roles/planning-engineer/)); een andere gids noemt **GBP 300–650** ([PL Projects](https://plprojects.co.uk/project-planner-day-rates-guide/)).
- **[SCHATTING]** Bij GBP 450/dag × 220 werkbare dagen ≈ **GBP 99.000 per planner per jaar**. Een volledige toolkit (P6 + tijd-wegtool + analytics) van GBP 3.000–5.000/jaar is dan **3–5% van de kosten van de planner die hem bedient**.

### 3.4 Betalingsbereidheid: hoog — maar asymmetrisch

**Hoog, want:**
1. **Contractuele noodzaak.** Zonder P6-compatibel schema is er geen goedgekeurde baseline, geen betaling en geen verdedigbare EOT-claim. De tool is een toegangsvoorwaarde, geen productiviteitskeuze.
2. **Asymmetrie in gevolgen.** GBP 500 mln disallowable costs op één programma (HS2) tegenover een softwarebudget in de tienduizenden.
3. **Kapitaalintensiteit van het werk.** Bij tijdsafhankelijke TBM-kosten verdient elke dag versnelling zich veelvoudig terug — ALICE claimt GBP 2 mln besparing op één HS2-tunnelscope.
4. **Governance-druk.** Opdrachtgevers kopen tooling om zich te verantwoorden aan rekenkamers en parlementen (NAO, Europese Rekenkamer, CHSRA-auditor). Toolinvesteringen zijn onderdeel van "we hebben de controls op orde".

**Maar laag/beperkt, want:**
1. **Prijsdruk op de niche zelf.** De tijd-weglaag is grotendeels weggeconcurreerd naar EUR 699/jaar (Turbo-Chart) of gratis ingebouwd (Powerproject line of balance / time-chainage). TILOS' EUR ~4.000 eenmalig is de bovengrens die de markt nog draagt — en dat product gaat uit onderhoud.
2. **De keten kan niet betalen.** Tier-2/3-onderaannemers, die wel schema's moeten aanleveren, hebben geen P6-budget. Dat is structureel: de eis wordt bovenaan gesteld en de kosten vallen onderaan.
3. **Vendor lock-in dempt bereidheid tot nieuwe uitgaven.** Wie al P6-EPPM-onderhoud van 22% per jaar betaalt (met 5–8% jaarlijkse verhoging, [VendorBenchmark](https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing)), heeft geen budgetruimte over.

**Netto:** hoge bereidheid om te betalen voor *compliance, verdedigbaarheid en programma-integratie*; lage bereidheid om te betalen voor *een mooiere tekening*.

---

## 4. Hoe groot dit segment is

### 4.1 Referentiecijfers uit de markt

| Wat | Cijfer | Jaar | Bron |
|---|---|---|---|
| Mondiale markt bouwplanningssoftware | **USD 1,44 mld** → USD 1,58 mld (2026) → USD 2,29 mld (2030) | 2025 | [The Business Research Company](https://www.thebusinessresearchcompany.com/report/construction-schedule-software-global-market-report) |
| Idem, alternatieve raming | **USD 2,1 mld** (2024) → USD 5,8 mld (2032), CAGR 13,5% | 2024 | [Verified Market Research](https://www.verifiedmarketresearch.com/product/construction-scheduling-software-market/) |
| Idem, derde raming | **USD 1,5 mld** (2025) → USD 3,0 mld (2034), CAGR 8,5% | 2025 | [Verified Market Reports](https://www.verifiedmarketreports.com/product/construction-schedule-software-market/) |
| Mondiale PPM-softwaremarkt | **USD 8,7 mld**, +12,7% j-o-j; top-10 leveranciers 60,5% aandeel | 2024 | [Apps Run The World](https://www.appsruntheworld.com/top-10-project-portfolio-management-software-vendors-and-market-forecast/) |
| Markt spoorinfrastructuur (bouw) | **USD 109,24 mld**, CAGR 3,9% tot 2033 | 2025 | [Data Insights Market](https://www.datainsightsmarket.com/reports/rail-infrastructure-128502) |
| Markt tunnelbouw | **USD 117,84 mld** → USD 208,37 mld (2034), CAGR 7,38% | 2025 | [Proficient Market Insights](https://www.proficientmarketinsights.com/market-reports/tunnel-construction-market-4242) |
| Markt tunnelbouw, alternatief | **USD 111,59 mld** → USD 221,78 mld (2035) | 2025 | [Global Growth Insights](https://www.globalgrowthinsights.com/market-reports/tunnel-construction-market-122971) |
| Markt hogesnelheidsspoor | **USD 57,4 mld** → USD 92,9 mld (2032) | 2025 | [GII Research](https://www.giiresearch.com/report/smrc1880507-high-speed-rail-market-forecasts-global-analysis.html) |
| EU-fondsen naar HSR | **EUR 25,4 mld** = 13% van de Europese transportfondsen | 2025 | [ITF/OECD Transport Investment Statistics Brief (PDF)](https://www.itf-oecd.org/sites/default/files/transport-investment-stats-brief-2025.pdf) |

*Waarschuwing: de marktomvangcijfers van commerciële onderzoeksbureaus lopen sterk uiteen (tunnelbouw: USD 27,7 mld tot USD 117,8 mld voor hetzelfde jaar, afhankelijk van scopedefinitie — vergelijk [Research and Markets](https://www.researchandmarkets.com/report/tunnel)). Ze zijn hier gebruikt als orde van grootte, niet als precisie.*

### 4.2 Bottom-up schatting: aantal organisaties × planners × prijs

**[SCHATTING — eigen berekening, gemarkeerd als zodanig]**

**Stap 1 — organisaties.** Wereldwijd actief in spoor/tunnels/lineaire infra op een schaal die formele CPM-planning vereist:
- Aannemers: ca. **1.500–2.500** (ENR Top 250 international contractors plus nationale spelers; ENR-omzetcijfers zelf zijn achter een paywall, maar het aantal spelers in transport/rail is met tientallen ranglijstposities per land goed te benaderen — [ENR Top 250 2025](https://www.enr.com/toplists/2025-Top-250-International-Contractors-Preview));
- Engineering-/PM-bureaus met spoorpraktijk: ca. **300–600**;
- Opdrachtgevers/infrabeheerders (nationale infrabeheerders, metro-autoriteiten, HSR-agentschappen, tunnelbedrijven): ca. **150–250**.
→ **Totaal ca. 2.000–3.300 organisaties.**

**Stap 2 — planners per organisatie.** Sterk scheve verdeling: mediaan 1–3 toegewijde planners bij kleinere aannemers; 30–100+ bij een megaproject-JV of programmaorganisatie. Gewogen gemiddelde ca. **3–5**.
→ **Totaal ca. 7.000–13.000 toegewijde planners/schedulers** in deze sector; middenwaarde **≈ 10.000**.

*Kruiscontrole (⚠️ herrekend):* de oorspronkelijke formulering — "GBP 87,7–102,7 mld gespreid over de resterende looptijd" — is **fout**: dat bedrag is de *totale* programmakosten inclusief de GBP 46,8 mld die t/m maart 2026 al is uitgegeven ([NAO HC 52](https://www.nao.org.uk/wp-content/uploads/2026/06/high-speed-two-reset-summary.pdf)). Zo gerekend zou je op GBP 5–10 mld per jaar uitkomen, niet op 4–4,5. Correct: *resterende* kosten ≈ GBP 41–56 mld over de resterende looptijd tot volledige indienststelling (mei 2040 – december 2043, dus ca. 14–18 jaar vanaf 2026) → orde **GBP 2,3–4,0 mld per jaar**. Met een dichtheid van één planner per GBP 8–15 mln jaaromzet in de hele keten geeft dat orde **150–500 planners** voor één programma (was: 300–550). Bij ca. USD 200 mld (≈ GBP 155 mld) gecombineerde jaaromzet in spoor + tunnels levert dezelfde dichtheid ca. 10.000–19.000 planners — dezelfde orde van grootte. De 10.000 blijft daarmee een verdedigbare conservatieve middenwaarde.

**Stap 3 — softwarebesteding per planner-seat per jaar.**
- CPM-kernlicentie: USD 1.500–3.400 (perpetueel P6 geamortiseerd over 4 jaar + 22% onderhoud ≈ USD 1.700; P6 Cloud GBP 220/mnd ≈ USD 3.400);
- Lineaire/tijd-weg-laag: USD 700–1.100 (Turbo-Chart USD 759; TILOS USD 4.290 geamortiseerd over 4–5 jaar ≈ USD 900–1.100);
- Analytics/risico (Acumen, Safran, N&L): USD 500–1.500 gemiddeld over de populatie (niet iedereen heeft het).
→ **USD 2.700–6.000 per planner-seat per jaar; middenwaarde ≈ USD 4.000.**

**Stap 4 — narrow segment (alleen planner-seats).**
10.000 × USD 4.000 = **USD 40 mln per jaar**. ⚠️ *Gecorrigeerd:* de eerder genoemde bandbreedte "USD 30–70 mln" volgt níet uit de eigen inputs. Consequent doorgerekend: 7.000 × USD 2.700 = **USD 19 mln** aan de onderkant en 13.000 × USD 6.000 = **USD 78 mln** aan de bovenkant. De eerlijke bandbreedte is dus **USD 19–78 mln** (afgerond 20–80), met middenwaarde 40.

**Stap 5 — breed segment.** Tel op:
- Niet-planner-seats in enterprise-implementaties (kostenengineers, PM's, viewers; EPPM-cloud kent al een minimum van 25 gebruikers per contract — [Oracle G-Cloud](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf)): factor **1,5–2,5×** op de licentiebasis;
- Direct gekoppelde implementatie-, configuratie- en trainingsdiensten: factor **0,5–1,5×** bovenop de licentiebasis (dus totale multiplier 1,5–2,5×);
- 4D-/AI-laag (SYNCHRO, ALICE, Nodes & Links, Aphex) die in deze sector snel groeit.

⚠️ **Herrekening.** Deze ketting levert nadrukkelijk *niet* 200–300 mln op. Met de narrow-middenwaarde van USD 40 mln:
- ondergrens: 40 × 1,5 (niet-planner-seats) × 1,5 (licentie + 0,5× diensten) = **USD 90 mln**;
- bovengrens: 40 × 2,5 × 2,5 = **USD 250 mln**;
- middenwaarde: 40 × 2,0 × 2,0 = **USD 160 mln**.

→ Verdedigbare uitkomst: **USD/EUR 90–250 mln per jaar (2026), middenwaarde ≈ 150–170 mln.** De eerder gerapporteerde "200–300 mln (bandbreedte 150–400)" ligt structureel te hoog: 300 mln en 400 mln zijn met de eigen aannames onbereikbaar tenzij je én de bovenste seat-prijs, én het bovenste organisatie-aantal, én beide bovenste multipliers tegelijk neemt — en dan nog kom je op 78 × 2,5 × 2,5 = 490 mln, wat aantoont hoe weinig de bandbreedte bindt. **Behandel dit getal als een orde van grootte (USD 10⁸), niet als een raming.**

**Stap 6 — de specialistische lineaire nichesoftware apart.**
- TILOS: geen publiek installed-base-cijfer. **[SCHATTING]** 3.000–6.000 actieve licenties wereldwijd, geamortiseerd USD 900–1.200/jaar → **USD 3–7 mln/jaar**;
- Turbo-Chart: **[SCHATTING]** 1.000–3.000 seats × USD 759 → **USD 0,8–2,3 mln/jaar**;
- LinearPlus/QEI Exec (PCF Ltd), TimeChainage, ChainLink, DynaRoad: **[SCHATTING]** elk onder USD 2 mln/jaar, samen **USD 2–5 mln/jaar**.
→ ⚠️ *Herrekend:* de deelposten sommeren tot **USD 5,8–14,3 mln per jaar**, niet 8–15. Correcte weergave: **USD 6–15 mln per jaar**. (De conclusie verandert niet; de niche blijft piepklein.)

Dat laatste cijfer is het belangrijkste inzicht van deze sectie: **de niche waar iedereen over praat is als losse softwaremarkt piepklein**, terwijl het CPM-/project-controls-platform eromheen tien tot twintig keer zo groot is.

### 4.3 Top-down kruiscontrole

Mondiale bouwplanningssoftware: **USD 1,44 mld (2025)** → 1,58 mld (2026) → 2,29 mld (2030), CAGR 9,7% — ✅ letterlijk geverifieerd op de bronpagina ([TBRC](https://www.thebusinessresearchcompany.com/report/construction-schedule-software-global-market-report)). Spoor/tunnels/lineaire infra is misschien 8–12% van de mondiale bouwproductie, maar bovengemiddeld planner-dicht en licentie-duur (enterprise-P6 in plaats van MS Project). Een aandeel van **12–20%** geeft **USD 173–288 mln**.

⚠️ **Deze "kruiscontrole" is zwakker dan hij oogt en de eerdere ✅ is ingetrokken.** Drie bezwaren:
1. **Appels en peren.** Het brede segment bevat expliciet *implementatie- en trainingsdiensten* (multiplier 0,5–1,5×), terwijl de TBRC-USD 1,44 mld een **software**markt is. Vergelijk je diensten-inclusief met software-exclusief, dan overschat je het aandeel systematisch met ruwweg een factor 1,5–2.
2. **Het aandeelspercentage is niet onafhankelijk gekozen.** 12–20% is precies zó gekozen dat het bij de bottom-upuitkomst past; het rust op geen enkele externe bron. Dat maakt het een *reconstructie*, geen controle.
3. **Software-alleen vergelijking.** Zet je alleen de licentiekant (narrow × 1,5–2,5 = USD 60–100 mln, midden 80) tegenover 1,44 mld, dan is het impliciete sectoraandeel **4–7%** — láger dan het aandeel in de bouwproductie, wat op zijn beurt onwaarschijnlijk laag is gezien de plannerdichtheid. De twee methodes wijzen dus niet naar hetzelfde getal; ze zijn eerder ~2× uit elkaar.

**Netto:** de top-downcontrole ondersteunt "orde honderden miljoenen USD" en niets scherpers.

### 4.4 Groeirichting

**Onderliggende vraag groeit:**
- Tunnelbouw CAGR 5,8–7,4% ([Proficient](https://www.proficientmarketinsights.com/market-reports/tunnel-construction-market-4242), [Market Intelo](https://marketintelo.com/report/tunnel-construction-market));
- Hogesnelheidsspoor USD 57,4 → 92,9 mld (2025→2032, ≈7% CAGR) ([GII](https://www.giiresearch.com/report/smrc1880507-high-speed-rail-market-forecasts-global-analysis.html));
- Bouwplanningssoftware zelf USD 1,44 → 2,29 mld (2025→2030, ≈9,7% CAGR) ([TBRC](https://www.thebusinessresearchcompany.com/report/construction-schedule-software-global-market-report)).

**Maar de niche consolideert:**
- TILOS 11 uit onderhoud per 1 maart 2026, met **TILOS 360 als aangekondigde opvolger (april 2026)** ⚠️ — het is dus een generatiewissel met migratierisico, geen marktexit ([BuildingPoint](https://help.buildingpoint.com.au/hc/en-au/articles/55527556493849--Important-Announcement-Tilos-Entering-End-of-Maintenance-on-1-March-2026));
- functionaliteit verschuift naar (a) goedkope add-ons op P6 (Turbo-Chart), (b) ingebouwde line-of-balance/time-chainage in generieke pakketten (Powerproject), (c) 4D/AI-platformen (SYNCHRO, ALICE, Nodes & Links);
- Elecosoft groeit hard (+20% omzet, ARR +29% in 2025, [Eleco plc](https://ir.eleco.com/results/latest-results)) en beweegt naar verticale sectorkennis — dat is waar de waarde naartoe gaat.

**Netto verwachting [SCHATTING]:** het brede segment groeit met de markt mee (7–10% per jaar), het smalle "tijd-weg-tool"-segment krimpt in aantal aanbieders en gemiddelde prijs terwijl het aantal *gebruikers* stijgt — klassieke commoditisering. ⚠️ *Bijgesteld:* de eerdere conclusie "een vacuüm in het premiumsegment door het wegvallen van TILOS" is niet houdbaar nu TILOS 360 is aangekondigd. Wat er wél is, is een **overgangsvenster van ca. 1–3 jaar** waarin bestaande 11.x-gebruikers moeten kiezen tussen migreren, bevriezen of overstappen — commercieel interessant, maar geen leeg segment.

---

## 5. Sector-specifieke eisen en standaarden

### 5.1 Verplichte leveringsformaten

| Formaat | Status | Waar afgedwongen |
|---|---|---|
| **XER** (Primavera-native backup) | De facto contractueel leveringsformaat | USACE: "If Primavera P6 is selected for use, provide the 'xer' export file in a version of P6 importable by the Government system"; activity codes en kalenders moeten op projectniveau staan, "not Global or EPS level" ([UFGS 01 32 01.00 10, aug. 2023/chg 1 aug. 2024, PDF](https://nibs-s3-wbdg3-production.s3.us-east-1.amazonaws.com/FFC/DOD/UFGS/UFGS%2001%2032%2001.00%2010.pdf)). ⚠️ De eerder geciteerde "request a backup file template (.xer) from the Government" staat er niet in — zie §2.2. |
| **P6 XML** | Groeiend alternatief, minder lossy | Overal waar P6 wordt geëist |
| **Native tool-bestand** | Zeldzaam maar het bestaat | Brenner Basistunnel: alle betrokken bedrijven moesten TILOS gebruiken ([Trimble](https://heavycivil.trimble.com/rs/168-CRJ-586/images/022482-3575_CaseStudy_TILOS-BrennerBaseTunnel_A4_062916.pdf)) |
| **Verplichte coderingsstructuren** | Even bindend als het formaat | Crossrail: verplichte P6 global project- en activity codes voor Level 1 & 2 ([Crossrail Learning Legacy](https://learninglegacy.crossrail.co.uk/documents/the-planning-handbook/)) |
| **Tijd-wegdiagram als contractstuk** | Steeds vaker | "time chainage charts are now often a contract requirement" ([timechainage.co.uk](https://www.timechainage.co.uk/software/Software.html)) |
| **IFC 4.3 / ISO 16739-1:2024** | Nieuw, groeiend, nog niet voor planningen | ISO-editie voegt "information required for infrastructure facilities including bridges, roads, railways, waterways and port facilities" toe ([ISO 16739-1:2024](https://www.iso.org/standard/84123.html)); IFC 4.3.2.0 is de actuele versie ([buildingSMART](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/)) |

### 5.2 Schedule-kwaliteit en -assurance

- **DCMA 14-point assessment.** Ingevoerd in 2005 door de Amerikaanse Defense Contract Management Agency voor contracten boven USD 20 mln ([Ten Six](https://tensix.com/what-is-the-dcma-14-point-assessment/); [Plan Academy](https://www.planacademy.com/dcma-14-point-schedule-assessment/)). Inmiddels: "Commercial and infrastructure projects increasingly reference DCMA metrics in schedule specifications even when the contract doesn't mandate them" ([CDMSuite](https://cdmsuite.com/insights/dcma-14-point-schedule-assessment)). De 14 checks (logic, leads, lags, relationship types, hard constraints, high float, negative float, high duration, invalid dates, resources, missed tasks, critical path test, CPLI, BEI) zijn in de praktijk de poortwachter bij maandelijkse indieningen.
- **Toolondersteuning als contractuele eis.** CHSRA gebruikt **Deltek Acumen Fuse** structureel "for quality assessments of contractor's schedules" ([CHSRA audit PDF](https://hsr.ca.gov/wp-content/uploads/2023/05/Program-Schedule-Management-A11Y.pdf)). Wie een schema indient dat Fuse niet doorstaat, krijgt het terug.

### 5.3 Earned Value

- **EIA-748** is de EVMS-standaard, met **32 richtlijnen** ("The standard defines 32 criteria for full-featured EVM system compliance", [Wikipedia, *Earned value management*](https://en.wikipedia.org/wiki/Earned_value_management)). ⚠️ *Gecorrigeerd/afgezwakt:* de eerdere bewering dat "revisie E het aantal terugbracht van 32 naar 27" is bij hercontrole **niet bevestigd** — de oorspronkelijke bron gaf 403 en er is geen onafhankelijke bevestiging gevonden; alle wél bereikbare bronnen noemen 32. Behandel het 27-getal als **waarschijnlijk onjuist** totdat de tekst van EIA-748 Rev. E zelf is ingezien.
- Voor Amerikaanse transit-/spoorprojecten loopt de handhaving via **FTA Project Management Oversight** en de **FTA Project and Construction Management Guidelines** ([transit.dot.gov](https://www.transit.dot.gov/funding/procurement/fta-project-and-construction-management-guidelines); [PMO](https://www.transit.dot.gov/regulations-and-guidance/project-management-oversight-pmo)).
- Praktisch gevolg: het schema moet **resource- en kostgeladen** zijn en één-op-één aan de control accounts hangen. Een tijd-wegdiagram dat níet kostgeladen is, is daarmee bewijsmateriaal maar geen EVMS-bron — vandaar de tweedeling TILOS/Turbo-Chart náást P6.

### 5.4 Claim- en forensische analyse

- **AACE International RP 29R-03 *Forensic Schedule Analysis*** en de **SCL Delay and Disruption Protocol** zijn de twee referentiekaders; ze worden in internationale arbitrage naast elkaar gebruikt en zijn als complementair beschreven ([SCL International](https://sclinternational.org/papers/harmonizing-scl-dd2-and-aace-29r-03-complementary-frameworks-forensic-delay-analysis)). AACE's RP's zijn ingebed in het Total Cost Management Framework ([AACE Recommended Practices](https://web.aacei.org/resources/recommended-practices)).
- Toegepaste methoden: windows analysis, time impact analysis, collapsed as-built, as-planned vs as-built ([VERTEX](https://vertexeng.com/services/expert-witness/construction-delay-cpm-scheduling-expert/); [AEGIS PMC](https://www.aegispmc.com/construction-delay-analysis-methods)).
- **Wat dit betekent voor software:** elk maandelijks schema is een *bewijsstuk*. De tool moet snapshots onveranderd bewaren, de wijzigingsgeschiedenis reproduceerbaar maken en exporteren naar een formaat dat een tegenpartij-expert onafhankelijk kan herrekenen. Dit is waarom XER-snapshots met datumstempel de valuta van deze sector zijn.

### 5.5 Audits en toezicht

De sector wordt structureel doorgelicht door rekenkamers, en die audits gaan expliciet over planningsproces:
- **NAO** over HS2 — reset, baselinekwaliteit, 124 aanbevelingen waarvan 45 (36%) afgerond in februari 2026 ([NAO HC 52](https://www.nao.org.uk/wp-content/uploads/2026/06/high-speed-two-reset-summary.pdf));
- **Europese Rekenkamer** over Rail Baltica — ontwerpstudies dekken slechts ca. een derde van het tracé, dus verdere kostenstijgingen zijn waarschijnlijk ([ERR](https://news.err.ee/1609915685/rail-baltica-phase-one-will-cost-at-least-24-billion-eu-auditors-say));
- **Baltische nationale rekenkamers** — tekort EUR 10–19 mld ([Riigikontroll rapport (PDF)](https://riigikontroll.ee/sites/default/files/documents/2025-11/19457_RKTR_6576_2-1.4_2323_007-1.pdf));
- **CHSRA interne audit** — schema-indieningen 91% van de tijd te laat; procedures niet in lijn met de praktijk; geen geschreven procedures voor programmaonderdelen buiten de Construction Packages ([CHSRA PDF](https://hsr.ca.gov/wp-content/uploads/2023/05/Program-Schedule-Management-A11Y.pdf)).

---

## 6. Voor- en nadelen van de gebruikte pakketten — in deze sectorcontext

### 6.1 Oracle Primavera P6

**Voordelen hier**
- Universeel geaccepteerd; het is het formaat waarin opdrachtgevers, aannemers, adviseurs en arbiters communiceren.
- Multi-project/enterprise: één database voor honderden contracten met gedeelde codes, kalenders en baselines — precies wat een programma als HS2 of CHSRA nodig heeft.
- Volledig resource- en kostgeladen CPM, dus direct EVMS-geschikt (EIA-748).
- Rijk ecosysteem van assurance-tools (Acumen Fuse, Nodes & Links, Safran Risk) die op XER/XML draaien.

**Nadelen hier**
- **Geen afstandsdimensie.** De kernkritiek: "These systems do not understand distance therefore it is difficult to incorporate all constructability issues into the plan […] crossings by type, changing work rates/quantities over distance, environmental restriction" ([witboek 2016](https://tilosamericas.com/wp-content/uploads/Software-Options-for-Linear-Project-Planning-1-1.pdf)).
- **Onleesbaar voor besluitvormers.** "Most key stakeholders do not understand complex Gantt charts" (idem). Op een 55 km tunnel of 400 km HSL is een Gantt met 30.000 regels geen communicatiemiddel.
- **Skips en move-arounds** kosten extra activiteiten in plaats van dat ze uit de geometrie volgen (idem).
- **Kosten en complexiteit.** USD 3.000–25.000 per gebruiker per jaar in de praktijk ([VendorBenchmark](https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing)); 22% onderhoud ([prmyazilim](https://prmyazilim.com/en/primavera-p6-pricing)); minimaal 25 cloudgebruikers ([Oracle G-Cloud](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf)). Onbetaalbaar voor de tier-2/3-keten die wél moet leveren.
- **Verouderde UX en steile leercurve** — een terugkerend thema in gebruikersfora en vakcommentaar ([PlanAcademy over integratieweerstand](https://www.planacademy.com/); vergelijk de discussie rond "The Death of P6" op [bricksbytes.com](https://www.bricksbytes.com/) — *deze pagina gaf een 503 bij ophalen; alleen de titel is via zoekresultaten bevestigd*).

### 6.2 Trimble TILOS

**Voordelen hier**
- Enige tool die tijd-weg, tijd-Gantt, afstand-Gantt en takenlijst in **één layout** combineert ([witboek 2016](https://tilosamericas.com/wp-content/uploads/Software-Options-for-Linear-Project-Planning-1-1.pdf)).
- Volledige CPM-engine ingebouwd (float, kritiek pad) — het is een planner, geen tekenprogramma.
- Modelleert corridorwerkelijkheid: milieurestricties, kruisingen, bodemprofielen, foto's en symbolen ín het diagram.
- **Mass haul / grondbalans** met stortcapaciteiten — bij BBT essentieel voor 17 mln m³ specie.
- Resource-afstandplanning, werksnelheden per resource, GIS-integratie (Google Earth/ESRI), multi-currency.
- Import/export met P6, MS Project, Asta Powerproject en Excel.

**Nadelen hier**
- **End of Maintenance 1 maart 2026** voor TILOS 11 — na die datum geen nieuwe features, bugfixes of security-updates. ⚠️ *Gecorrigeerd:* "het product heeft geen toekomst" is te sterk; Trimble kondigt **TILOS 360** aan voor april 2026 als opvolger en TILOS 11 blijft koop- en verlengbaar ([BuildingPoint](https://help.buildingpoint.com.au/hc/en-au/articles/55527556493849--Important-Announcement-Tilos-Entering-End-of-Maintenance-on-1-March-2026)). Het reële nadeel is migratie- en continuïteitsrisico op een programma met 15+ jaar looptijd, niet productbeëindiging.
- **Geen resource levelling** en **geen enterprise-configuratie** — dus niet inzetbaar als programmadatabase ([witboek 2016](https://tilosamericas.com/wp-content/uploads/Software-Options-for-Linear-Project-Planning-1-1.pdf)).
- **Verouderde interface**: "The UI looks and feels antiquated" ([Capterra](https://www.capterra.com/p/235928/TILOS/)).
- **Zwakke BIM-koppeling**: gebruikers noemen expliciet het ontbreken van "integration with other software solutions such as BIM for 4D planning" (idem) — fataal in een sector die net IFC 4.3 voor spoor heeft gestandaardiseerd.
- Desktop-only, single-user; slechte fit met gedistribueerde JV-teams.
- Leermateriaal beperkt beschikbaar (idem).

### 6.3 Elecosoft Asta Powerproject

**Voordelen hier**
- Combineert CPM, **line of balance**, **time-chainage** en **earned value** in één pakket ([dotprotools](https://dotprotools.com/construction-tools/scheduling/asta-powerproject)) — geen tweede tool nodig voor de lineaire weergave.
- Ketendekking in het VK: claim van 90 van de top-100 hoofdaannemers ([PBC Today](https://www.pbctoday.co.uk/news/digital-construction-news/construction-software-news/nodes-links-to-work-on-asta-powerproject-with-elecosoft/132745/)) betekent dat een spoorprogramma zijn onderaannemers erop aantreft.
- Prijs ca. USD 2.000/gebruiker/jaar ([ITQlick](https://www.itqlick.com/asta-powerproject/faq)) — ordegrootte goedkoper dan P6-cloud; concurrent licenties verlagen de kosten per gebruiker verder ([shop.eleco.com](https://shop.eleco.com/products/asta-powerproject-uk)).
- 4D BIM-integratie in het product ([eleco.com](https://eleco.com/products/asta/asta-powerproject/)).
- Financieel gezond en investerend: Eleco plc omzet GBP 38,8 mln (+20%), ARR GBP 34,3 mln (+29%), schuldenvrij ([jaarresultaten 2025](https://ir.eleco.com/results/latest-results)).

**Nadelen hier**
- **Niet het contractformaat.** Op internationale spoorprogramma's is P6 de eis; Asta is dan het interne werkbestand en er ontstaat dubbele boekhouding.
- Kleiner ecosysteem: "smaller user community compared to mainstream alternatives, resulting in a less developed ecosystem", plus "licensing arrangements can be complex" ([dotprotools](https://dotprotools.com/construction-tools/scheduling/asta-powerproject)).
- Sterk VK-gecentreerd; buiten het VK/Ierland en delen van Scandinavië is de installed base dun.
- De tijd-weg-functionaliteit is minder diep dan TILOS (geen mass haul-optimalisatie, geen resource-afstandplanning).

### 6.4 Turbo-Chart (Linear Project Software)

**Voordelen hier**
- **Prijs**: EUR 699 / GBP 609 / USD 759 per named user per jaar ([turbo-chart.com/purchase](https://turbo-chart.com/purchase)) — een orde van grootte goedkoper dan TILOS.
- Werkt **bovenop** het contractschema: P6 (Standalone/Professional/EPPM/Cloud), Oracle Primavera Cloud, MS Project, Asta Powerproject, Safran, plus copy-paste-wizard ([turbo-chart.com](https://turbo-chart.com/)). Geen tweede waarheid.
- Condenseert "hundreds or thousands of tasks onto a single page" ([turbo-chart.com/features](https://turbo-chart.com/features)) — precies het communicatieprobleem van P6.
- Ook geschikt voor verticale repetitie (hoogbouw), dus breder inzetbaar dan strikt lineair.

**Nadelen hier**
- **Geen eigen planningsengine.** Het is een visualisatielaag; logica, float en kritiek pad blijven in P6. Je kunt er niet in plannen, alleen mee tonen.
- Geen mass haul, geen grondbalans, geen corridorlogistiek.
- Windows-desktop, named user; geen webdeling met opdrachtgever.

### 6.5 LinearPlus / QEI Exec (PCF Ltd), TimeChainage, ChainLink

**Voordelen hier**
- Diepe VK-spoorwortels: TransManche Link (Kanaaltunnel) als launch customer; Network Rail-maatwerk voor possession-optimalisatie ([pcfltd.co.uk](https://www.pcfltd.co.uk/solutions/chainage.html)).
- Goedkoop en gericht; ChainLink kan direct XER, MPX, XLS en CSV inlezen ([witboek 2016](https://tilosamericas.com/wp-content/uploads/Software-Options-for-Linear-Project-Planning-1-1.pdf)).
- QEI Exec kan diagrammen vanaf **meerdere datumpunten** afleiden — relevant bij spoortracés met wisselende kilometrering.

**Nadelen hier**
- LinearPlus is expliciet **statisch**: "Can't modify or add activities or logic. Have to go back to source document and re-import […] Creates a static 'picture' of the project […] not able to progress or control a project in the tool" ([witboek 2016](https://tilosamericas.com/wp-content/uploads/Software-Options-for-Linear-Project-Planning-1-1.pdf)).
- ChainLink: beperkingen op aantal en type charts per layout; geen Gantt of afstand-Gantt; **geen baseline-ondersteuning**; geen weergave van milieurestricties (idem) — dat laatste is in spoor/tunnels bijna diskwalificerend.
- Zeer kleine leveranciers, concentratierisico.

### 6.6 DynaRoad (Topcon)

**Voordelen hier**: sterk in mass-haul-optimalisatie en grondbalans voor weg en spoor; kan uit Primavera importeren; survey- en machinedata bruikbaar in de planning ([witboek 2016](https://tilosamericas.com/wp-content/uploads/Software-Options-for-Linear-Project-Planning-1-1.pdf)).
**Nadelen hier**: alleen grondwerk (geen pijpleiding, geen transmissielijn); simplistische lijnrepresentatie; geen gemengde chart-types in één layout; **exporteert niet naar Primavera** en kan dus niet aan contractuele leveringseisen voldoen (idem).

### 6.7 Bentley SYNCHRO 4D, ALICE Technologies, Nodes & Links

**Voordelen hier**
- SYNCHRO: model-gebaseerde constructiesimulatie, digitale rehearsal van complexe sequenties ([Bentley](https://www.bentley.com/software/synchro/); [Virtuosity](https://en.virtuosity.com/synchro-4d)).
- ALICE: genereert alternatieve bouwvolgordes en TBM-scenario's; gedocumenteerde GBP 2 mln besparing bij SCS JV op HS2-tunnels ([ALICE](https://www.alicetechnologies.com/solutions/for-infrastructure/tunnels)).
- Nodes & Links: schedule-analytics met traceerbare, auditbare antwoorden; rail-specifieke propositie; USD 12 mln Series B ([nodeslinks.com](https://nodeslinks.com/solutions/rail/); [Construction Management](https://constructionmanagement.co.uk/nodes-links-raises-9-5m/)).

**Nadelen hier**
- Alle drie zijn **lagen bovenop** een bestaand schema; ze vervangen P6 niet en lossen het afstandsprobleem niet fundamenteel op.
- Geen publieke prijzen — inkooptrajecten zijn lang en enterprise-only, wat de keten uitsluit.
- 4D-modellen voor lineaire infra vragen een IFC-4.3-alignmentmodel dat op veel spoorprojecten pas net beschikbaar is.

### 6.8 De aanhoudende bodem: Excel en CAD

Beide worden nog steeds gebruikt voor tijd-wegdiagrammen, en het witboek is er hard over: geen CPM-engine, float en kritiek pad handmatig, "substantial rework when the plan changes", resource loading "cumbersome and manual", en beoordeling van planningsafwijking "very challenging" ([witboek 2016](https://tilosamericas.com/wp-content/uploads/Software-Options-for-Linear-Project-Planning-1-1.pdf)). Het BBT-project bewijst dat dit in de praktijk klapt: het CAD-diagram uit 2006 moest bij elke wijziging opnieuw ([Trimble case study](https://heavycivil.trimble.com/rs/168-CRJ-586/images/022482-3575_CaseStudy_TILOS-BrennerBaseTunnel_A4_062916.pdf)).

---

## 7. Openingen: waar gebruikers ontevreden zijn en welke gaten er zijn

### 7.1 Het acute gat: TILOS verdwijnt

⚠️ **Deze paragraaf is na verificatie afgezwakt.** Per **1 maart 2026** gaat TILOS 11 uit onderhoud, met 11.1 MR4 als laatste update — maar dezelfde aankondiging kondigt **TILOS 360** aan voor april 2026 als opvolger, en TILOS 11 blijft verkrijgbaar en verlengbaar ([BuildingPoint](https://help.buildingpoint.com.au/hc/en-au/articles/55527556493849--Important-Announcement-Tilos-Entering-End-of-Maintenance-on-1-March-2026)). Het gat is dus geen *verdwijning* maar een **gedwongen migratie**: bestaande 11.x-installaties krijgen geen bugfixes of security-updates meer, terwijl het opvolgproduct nieuw, ongetest en (prijs onbekend) waarschijnlijk anders gelicentieerd is.

De alternatievenmarkt daarnaast bestaat uit:
- visualisatielagen zonder eigen engine (Turbo-Chart, ChainLink, LinearPlus);
- generieke pakketten met een lichtere lineaire module (Powerproject);
- deeloplossingen (DynaRoad voor grondwerk);
- **TILOS 360** — nieuw, functionaliteit nog niet publiek te verifiëren.

**Er is nog steeds geen open, onderhouden, volwaardige lineaire planner met eigen CPM-engine** — dat deel van de conclusie houdt stand. Maar het argument is "migratiemoment + geen open alternatief", niet "de markt wordt verlaten". Bestaande TILOS-projecten met een looptijd tot 2035+ (BBT, Rail Baltica, HS2-scopes) staan voor een keuze, niet voor een gat.

### 7.2 Vier concrete ontevredenheden, met bron

1. **"Antiquated UI" en gebrekkige BIM-koppeling bij TILOS** — letterlijke gebruikersfeedback ([Capterra](https://www.capterra.com/p/235928/TILOS/)).
2. **P6 begrijpt geen afstand** — de structurele klacht van de hele sector ([witboek 2016](https://tilosamericas.com/wp-content/uploads/Software-Options-for-Linear-Project-Planning-1-1.pdf)).
3. **P6 is te duur en te complex voor de keten** — USD 3.000+/jaar en weken leertijd worden expliciet als reden genoemd om alternatieven te zoeken ([TrendSageHub](https://trendsagehub.com/project-management/primavera-p6-alternatives-2026)); en het aanbod van "gratis alternatieven" is inhoudelijk zwak: ProjectLibre, GanttProject, Redmine, OpenProject ([AlternativeTo](https://alternativeto.net/software/oracle-primavera/); [Fuzen](https://www.fuzen.io/posts/open-source-construction-management-software)) — geen ervan doet lineaire planning, IFC of DCMA-checks.
4. **Het proces zelf faalt** — CHSRA: 91% van 108 maandelijkse schema-indieningen meer dan een week te laat ([CHSRA PDF](https://hsr.ca.gov/wp-content/uploads/2023/05/Program-Schedule-Management-A11Y.pdf)). Dat is geen toolprobleem alleen, maar wél een signaal dat de huidige workflow te zwaar is.

### 7.3 Gaten die relevant zijn voor een open-source, IFC-gebaseerde planner

| # | Gat | Waarom het nu kan | Wat het waard is |
|---|---|---|---|
| **1** | **Chainage komt gratis uit IFC.** IFC 4.3 (ISO 16739-1:2024) standaardiseert alignment en lineaire referentie voor spoor ([ISO](https://www.iso.org/standard/84123.html); [buildingSMART](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/)). In TILOS bouw je de afstandsas met de hand op uit Excel-profielen; met een IFC-alignment als bron is de as *het model*. Geen enkele bestaande planner doet dit. | Rail-alignment ís nu genormeerd | Kernonderscheid; niemand claimt dit terrein |
| **2** | **IFC als native planningsformaat.** `IfcWorkPlan` / `IfcWorkSchedule` / `IfcTask` bestaan al in de schema's ([IFC 4.3-documentatie via buildingSMART](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/)), maar geen mainstream planner gebruikt ze als opslagformaat. Het alternatief, XER, is een gesloten, lossy, leveranciersgebonden formaat. | Auditors en opdrachtgevers vragen om openheid en langetermijnleesbaarheid (20+ jaar programma's) | Antwoord op archief- en vendor-lock-in-risico |
| **3** | **De keten kan niet meedoen.** Tier-2/3-onderaannemers moeten schema's leveren die P6-compatibel zijn, maar kunnen P6 niet betalen. | Een gratis tool die XER/P6 XML/MS Project XML kan lezen én schrijven, sluit dat gat | Grootste gebruikersvolume, laagste bereidheid te betalen — dus perfect voor open source |
| **4** | **Assurance is niet ingebouwd.** DCMA-14 wordt overal gevraagd maar zit in een aparte tool van USD 10.000/jaar (Acumen Fuse). | De 14 checks zijn publiek gedocumenteerd en volledig deterministisch | Directe, meetbare toegevoegde waarde bij elke maandelijkse indiening |
| **5** | **Buitendienststellingen zijn geen eersterangs concept.** Possessions/blockades en ETCS-commissioningvensters bepalen de spoorplanning ([Network Rail PPS](https://pps.networkrail.co.uk); [ORR](https://www.orr.gov.uk/sites/default/files/2024-03/track-access-guidance-possessions-regime.pdf); [Railway-News over ETCS](https://railway-news.com/planning-etcs-rollouts-alongside-everyday-renewal-work/)), maar in P6 en TILOS zijn het gewone kalenderuitzonderingen. Een kalender die vensters per kilometer én per tijd kent, is nieuw. | Kalendermotor is al de kern van elke planner | Sectorspecifieke diepgang die generieke tools niet leveren |
| **6** | **Forensische reproduceerbaarheid.** Snapshotgestuurde undo/redo, onveranderlijke maandopnames en een open diff tussen twee revisies is precies wat AACE 29R-03 en de SCL Protocol vragen ([SCL International](https://sclinternational.org/papers/harmonizing-scl-dd2-and-aace-29r-03-complementary-frameworks-forensic-delay-analysis)). Nu doen adviseurs dit met los gereedschap op XER-dumps. | De data zijn er al; alleen het formaat is gesloten | Hoogste betalingsbereidheid van de hele keten (claimadviseurs) |
| **7** | **Multi-document / programmavergelijking.** Een programma is tientallen contractschema's naast elkaar. P6 doet dit met een dure enterprise-database; er is geen lichte, lokale manier om vijf contractschema's naast elkaar te leggen op één tijd-wegas. | Meerdere documenten tegelijk open + gedeelde afstandsas | Direct nuttig voor opdrachtgeverszijde |

### 7.4 Waar het gevaar zit (eerlijk)

1. **De contractuele moat van P6 is echt — en voor open source zelfs erger dan gedacht.** Zonder betrouwbare XER-import/-export en P6 XML is een alternatieve planner niet indienbaar. USACE eist specifieke P6-instellingen en codeniveaus ("Activity Codes must be Project Level, not Global or EPS level"). ⚠️ **Aanvulling na brontekstverificatie:** UFGS 01 32 01.00 10 §2.1.2 eist bovendien dat de gebruikte planningssoftware "commercially available from the software vendor for purchase with vendor software support agreements available" is, en §2.1.2.2 verplicht wie géén P6 gebruikt tot het leveren van "two licenses, two computers, and training for two Government employees" aan de opdrachtgever ([UFGS-PDF](https://nibs-s3-wbdg3-production.s3.us-east-1.amazonaws.com/FFC/DOD/UFGS/UFGS%2001%2032%2001.00%2010.pdf)). Een gratis open-sourceplanner voldoet daar op het oog niet aan tenzij er een commerciële support-entiteit achter staat. Dit verdient een eigen strategische paragraaf.
2. **De niche is klein in geld.** USD 6–15 mln/jaar aan specialistische lineaire tools **[SCHATTING, herrekend]** betekent dat een commercieel product hier nooit groot wordt. Voor een open-sourceproject is dat juist het argument: er is geen leverancier die het gat rendabel kan dichten, maar de behoefte is reëel en de gebruikersgroep prestigieus.
3. **Verificatie is de prijs van toegang.** Alles wat een planner uitrekent (float, kritiek pad, kalenders, kruisrelaties, kunstmatige constraints) moet exact aansluiten bij wat P6 uitrekent, anders is het bewijs waardeloos. Een data-gedreven regressiesuite op CPM en kalenders is hier geen luxe maar de kern van de propositie.
4. **Open-sourceconcurrentie in de aangrenzende BIM-hoek is er al**: IfcOpenShell heeft 4D/5D-mogelijkheden ("construction scheduling, task management, work calendar definition, resource allocation, and cost tracking") en Bonsai/BlenderBIM levert er een UI bij ([ifcopenshell.org](https://ifcopenshell.org); [bonsaibim.org](https://bonsaibim.org)). Dat is echter een BIM-authoringomgeving met planningsfuncties, geen planner met BIM-functies — en géén tijd-wegdiagram. Het onderscheid ligt in de planning-first benadering plus de lineaire as.

### 7.5 Positioneringsadvies in één alinea

De winnende positie in deze sector is niet "de betere Gantt" en ook niet "de gratis P6". Het is: **de open, IFC-native planner die de afstandsas rechtstreeks uit het alignment haalt, DCMA-14 ingebouwd heeft, XER/P6 XML foutloos in- en uitleest, en elke maandopname als onveranderlijk, diff-baar bewijsstuk bewaart.** Dat combineert precies de vier dingen die vandaag over vier producten en USD 15.000 per planner per jaar verspreid liggen — en het richt zich op de rol (tier-2/3, JV-partners, opdrachtgeverstoezicht) die het minst goed bediend is.

---

## 8. Bronnenlijst

### Primaire documenten (opdrachtgevers, auditors, standaarden)
- National Audit Office, *High Speed Two reset*, HC 52, sessie 2026-27, 29 juni 2026 — https://www.nao.org.uk/wp-content/uploads/2026/06/high-speed-two-reset-summary.pdf
- California High-Speed Rail Authority, *Program Schedule Management* (interne audit, 2023) — https://hsr.ca.gov/wp-content/uploads/2023/05/Program-Schedule-Management-A11Y.pdf
- Crossrail Learning Legacy, *The Planning and Scheduling Handbook* — https://learninglegacy.crossrail.co.uk/documents/the-planning-handbook/
- USACE Master Guide Specification 01 32 01 *Project Schedule* — https://www.usace.army.mil/Portals/44/docs/Engineering/MasterGuideSpecs/013201.pdf
- WBDG, UFGS 01 32 01.00 10 *Project Schedule* — https://www.wbdg.org/dod/ufgs/ufgs-01-32-01-00-10
- Office of Rail and Road, *Track access guidance: possessions regime*, 2024 — https://www.orr.gov.uk/sites/default/files/2024-03/track-access-guidance-possessions-regime.pdf
- Riigikontroll e.a., gezamenlijk rapport Baltische rekenkamers over Rail Baltica, november 2025 — https://riigikontroll.ee/sites/default/files/documents/2025-11/19457_RKTR_6576_2-1.4_2323_007-1.pdf
- ISO 16739-1:2024 (IFC 4.3) — https://www.iso.org/standard/84123.html
- buildingSMART, Industry Foundation Classes — https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/
- FTA, Project and Construction Management Guidelines — https://www.transit.dot.gov/funding/procurement/fta-project-and-construction-management-guidelines
- FTA, Project Management Oversight — https://www.transit.dot.gov/regulations-and-guidance/project-management-oversight-pmo
- AACE International, Recommended Practices — https://web.aacei.org/resources/recommended-practices
- SCL International, *Harmonizing SCL D&D2 and AACE 29R-03* — https://sclinternational.org/papers/harmonizing-scl-dd2-and-aace-29r-03-complementary-frameworks-forensic-delay-analysis
- ITF/OECD, *Transport investment statistics brief 2025* — https://www.itf-oecd.org/sites/default/files/transport-investment-stats-brief-2025.pdf
- Oracle, prijsdocument P6 EPPM Cloud Service, UK G-Cloud 14 — https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf

### Leveranciers en producten
- Trimble TILOS — https://construction.trimble.com/en/products/tilos
- Trimble, klantverhaal Brenner Basistunnel (PDF) — https://heavycivil.trimble.com/rs/168-CRJ-586/images/022482-3575_CaseStudy_TILOS-BrennerBaseTunnel_A4_062916.pdf
- BuildingPoint, *Tilos Entering End of Maintenance on 1 March 2026* — https://help.buildingpoint.com.au/hc/en-au/articles/55527556493849--Important-Announcement-Tilos-Entering-End-of-Maintenance-on-1-March-2026
- TILOS Americas — https://tilosamericas.com/linear-scheduling-software/ ; https://tilosamericas.com/infrastructure-project-management-software/
- Duncan & MacLeod, *Software Options for Linear Project Planning*, juli 2016 (PDF) — https://tilosamericas.com/wp-content/uploads/Software-Options-for-Linear-Project-Planning-1-1.pdf
- Trimble Civil (DK), *TILOS: The project leader of infrastructure projects* — https://civil.trimble.dk/node/648
- Eleco / Asta Powerproject — https://eleco.com/products/asta/asta-powerproject/ ; https://eleco.com/software/asta-powerproject/
- Eleco plc, jaarresultaten 2025 — https://ir.eleco.com/results/latest-results
- Elecosoft, klantenpagina — https://elecosoft.com/us/company/customers/
- Eleco webshop (licentievormen) — https://shop.eleco.com/products/asta-powerproject-uk
- PCF Ltd, LinearPlus — https://www.pcfltd.co.uk/lphome.html
- PCF Ltd, time-chainage-oplossingen (TransManche Link, Network Rail) — https://www.pcfltd.co.uk/solutions/chainage.html
- TimeChainage (Peter Milton Planning) — https://www.timechainage.co.uk/software/Software.html
- Turbo-Chart — https://turbo-chart.com/ ; https://turbo-chart.com/purchase ; https://turbo-chart.com/features
- Bentley SYNCHRO — https://www.bentley.com/software/synchro/ ; https://www.bentley.com/industries/transportation-rail-and-transit/ ; https://en.virtuosity.com/synchro-4d
- ALICE Technologies, tunnels — https://www.alicetechnologies.com/solutions/for-infrastructure/tunnels
- Nodes & Links, rail — https://nodeslinks.com/solutions/rail/
- Network Rail Possession Planning System — https://pps.networkrail.co.uk
- IfcOpenShell — https://ifcopenshell.org
- Bonsai (BlenderBIM) — https://bonsaibim.org

### Prijs- en reviewbronnen
- Capterra, TILOS — https://www.capterra.com/p/235928/TILOS/
- ITQlick, Asta Powerproject pricing/FAQ — https://www.itqlick.com/asta-powerproject/faq ; https://www.itqlick.com/asta-powerproject/pricing
- ProjectManagerTemplate, Primavera P6 licentie vs. abonnement — https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models
- VendorBenchmark, Oracle Primavera P6 pricing — https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing
- prmyazilim, Primavera P6 pricing (juni 2025) — https://prmyazilim.com/en/primavera-p6-pricing
- Taradigm, *How much does Primavera P6 cost?* — https://www.taradigm.com/how-much-does-primavera-p6-cost/
- ITQlick, Deltek Acumen pricing — https://www.itqlick.com/acumen/pricing
- Prescience Technology, Acumen Fuse (AU) — https://www.prescience.com.au/product/acumen-fuse/
- dotprotools, Asta Powerproject — https://dotprotools.com/construction-tools/scheduling/asta-powerproject
- TILOS License Information (Scribd) — https://www.scribd.com/document/461948011/TILOS-License-Information
- YP Recruitment, planning engineer dagtarieven — https://yprecruit.co.uk/roles/planning-engineer/
- PL Projects, project planner day rates — https://plprojects.co.uk/project-planner-day-rates-guide/

### Marktomvang
- The Business Research Company, Construction Schedule Software Global Market Report — https://www.thebusinessresearchcompany.com/report/construction-schedule-software-global-market-report
- Verified Market Research, Construction Scheduling Software Market — https://www.verifiedmarketresearch.com/product/construction-scheduling-software-market/
- Verified Market Reports, Construction Schedule Software Market — https://www.verifiedmarketreports.com/product/construction-schedule-software-market/
- Apps Run The World, Top 10 PPM Software Vendors — https://www.appsruntheworld.com/top-10-project-portfolio-management-software-vendors-and-market-forecast/
- Fortune Business Insights, PPM Market — https://www.fortunebusinessinsights.com/project-portfolio-management-ppm-market-104257
- Grand View Research, Project & Portfolio Management Software Market — https://www.grandviewresearch.com/industry-analysis/project-and-portfolio-management-software-market
- Data Insights Market, Rail Infrastructure — https://www.datainsightsmarket.com/reports/rail-infrastructure-128502
- Proficient Market Insights, Tunnel Construction Market — https://www.proficientmarketinsights.com/market-reports/tunnel-construction-market-4242
- Global Growth Insights, Tunnel Construction Market — https://www.globalgrowthinsights.com/market-reports/tunnel-construction-market-122971
- Market Intelo, Tunnel Construction Market — https://marketintelo.com/report/tunnel-construction-market
- Research and Markets, Tunnel — https://www.researchandmarkets.com/report/tunnel
- GII Research, High-Speed Rail Market Forecasts — https://www.giiresearch.com/report/smrc1880507-high-speed-rail-market-forecasts-global-analysis.html
- StartUs Insights, Railway Industry Outlook — https://www.startus-insights.com/innovators-guide/railway-industry-outlook/
- ENR, 2025 Top 250 International Contractors — https://www.enr.com/toplists/2025-Top-250-International-Contractors-Preview

### Programma's, projecten en vakpers
- ERR News, *Rail Baltica phase one will cost at least €24 billion, EU auditors say* — https://news.err.ee/1609915685/rail-baltica-phase-one-will-cost-at-least-24-billion-eu-auditors-say
- LRT, *Baltic auditors say Rail Baltica faces €19 billion cost overruns and delays* — https://www.lrt.lt/en/news-in-english/19/2295226/baltic-auditors-say-rail-baltica-faces-eur19-billion-cost-overruns-and-delays
- RB Rail, vacature Senior Project Controls Engineer — https://railbaltica.org/lv/vakances/senior-project-controls-engineer/
- RailwayPro, *RB Rail starts risk management system implementation* — https://www.railwaypro.com/wp/rb-rail-starts-risk-management-system-implementation/
- Deloitte, *Programme controls transformation — High Speed 2* — https://www.deloitte.com/uk/en/Industries/infrastructure/case-studies/programme-controls-transformation-high-speed-2-case-study.html
- AtkinsRéalis, High Speed 2 — https://www.atkinsrealis.com/en/projects/high-speed-2
- Movar, *Data analytics in project controls: EKFB on HS2* — https://movar.group/case-studies/data-analytics-in-project-controls-ekfb-on-hs2
- PBC Today, *Nodes & Links to work on Asta Powerproject with Elecosoft* — https://www.pbctoday.co.uk/news/digital-construction-news/construction-software-news/nodes-links-to-work-on-asta-powerproject-with-elecosoft/132745/
- Construction Management, *Nodes & Links raises £9.5m* — https://constructionmanagement.co.uk/nodes-links-raises-9-5m/
- Digital Construction Connect, Balfour Beatty over Asta Powerproject — https://www.digitalconstructionconnect.com/guest-blogs/balfour-beatty-using-asta-powerproject-to-rewrite-programme-management-procedures/
- Railway-News, *Planning ETCS rollouts alongside everyday renewal work* — https://railway-news.com/planning-etcs-rollouts-alongside-everyday-renewal-work/
- Railway News, *Rail Baltica: Primavera P6 drives project success* — https://railwaynews.net/rail-baltica-primavera-p6-drives-project-success.html
- CMAA, samenvatting Arcadis Construction Disputes Report 2025 (PDF) — https://www.cmaanet.org/sites/default/files/2025-09/202515~1.PDF

### Methodiek en standaardenuitleg
- Ten Six Consulting, *What is the DCMA 14-point assessment?* — https://tensix.com/what-is-the-dcma-14-point-assessment/
- Plan Academy, DCMA 14-point schedule assessment — https://www.planacademy.com/dcma-14-point-schedule-assessment/
- CDMSuite, DCMA 14-point schedule assessment — https://cdmsuite.com/insights/dcma-14-point-schedule-assessment
- ScheduleLens, DCMA 14-point assessment — https://schedulelens.com/blog/dcma-14-point-assessment/
- Humphreys & Associates, DOE Guide 413.3-10B EVMS — https://www.humphreys-assoc.com/doe-guide-413-3-10b-evms/
- VERTEX, CPM scheduling expert services — https://vertexeng.com/services/expert-witness/construction-delay-cpm-scheduling-expert/
- AEGIS PMC, Construction delay analysis methods — https://www.aegispmc.com/construction-delay-analysis-methods
- PMI, *Project Management: How Much Is Enough?* — https://www.pmi.org/learning/library/project-management-much-enough-appropriate-5072
- MDPI, *Optimization of Tunnel Construction Schedule Considering Soft Logic* — https://www.mdpi.com/2076-3417/14/6/2580
- ScienceDirect, *Linear 4D system for infrastructure projects* — https://www.sciencedirect.com/science/article/pii/S0926580522002862
- ScienceDirect, *Schedule control model for linear projects* — https://www.sciencedirect.com/science/article/pii/S092658051300157X
- Springer, *Railway tunnel construction scheduling technique* — https://link.springer.com/chapter/10.1007/978-3-642-34651-4_120
- PMera, *Using time-location charts to identify project schedule problems in linear projects* — https://pmera.com/using-time-location-chartsto-identify-project-schedule-problems-in-linear-projects/

### Alternatieven / open source
- AlternativeTo, Oracle Primavera alternatives — https://alternativeto.net/software/oracle-primavera/
- Fuzen, Open source construction management software — https://www.fuzen.io/posts/open-source-construction-management-software
- TrendSageHub, Primavera P6 alternatives 2026 — https://trendsagehub.com/project-management/primavera-p6-alternatives-2026

---

## 9. Betrouwbaarheidsnotities

- **Niet geverifieerd / vendor-claim:** "90% van de top-100 VK-hoofdaannemers" (Elecosoft), "4 out of 5 Global Leaders prefer TILOS" (TILOS Americas), "thousands of projects worldwide" (TILOS). Behandel als marketing.
- **Tegenstrijdige bronnen:** Deltek Acumen Fuse (USD 10.300 eerste jaar vs. USD 75/gebruiker/maand); tunnelbouwmarkt (USD 27,7 mld vs. USD 117,8 mld voor 2025, verschillende scopedefinities); Arcadis-geschilwaarde (USD 54,7 mln vs. USD 60,1 mln).
- **Fout in brondocument:** het Trimble-klantverhaal over de Brenner Basistunnel noemt een budget van "more than 8 million Euros"; dit is aantoonbaar een verschrijving voor miljard en is niet als cijfer overgenomen.
- **Secundair geciteerd (origineel niet opgehaald):** Arcadis Global Construction Disputes Report 2025 (via CMAA en LinkedIn); Elecosoft-brochure v11 (via Scribd); Bricks & Bytes-artikel over P6 (pagina gaf HTTP 503, alleen titel bevestigd).
- **Niet gevonden ondanks gericht zoeken:** publieke installed-base-cijfers voor TILOS; publieke prijzen voor SYNCHRO 4D, ALICE, Nodes & Links en Safran; expliciete HS2-tenderteksten met tool-mandaat (HS2-contractvoorwaarden zijn niet openbaar geïndexeerd).
- **Zoekbeperking:** het WebSearch-budget van deze sessie was uitgeput; alle bronnen zijn opgehaald via directe WebFetch en via HTML-zoekproxy's (lite.duckduckgo.com, bing.com). Sommige snippets komen daardoor uit zoekresultaatpagina's in plaats van uit de brondocumenten zelf; die zijn hierboven als zodanig gemarkeerd waar relevant.

---

## Verificatie

**Uitgevoerd:** adversariële fact-check, juli 2026. Methode: elke bewering actief proberen te *weerleggen*; PDF-bronnen zijn met een PDF-parser uitgelezen in plaats van via samenvattende fetch, zodat citaten letterlijk kunnen worden nagelopen. WebSearch was niet beschikbaar (sessiebudget op); alles via directe WebFetch op de brondocumenten plus de Zendesk-API van BuildingPoint.

### A. Segmentomvang en de redenering erachter

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| A1 | Breed segment **USD 200–300 mln/jaar** (bandbreedte 150–400) | **gecorrigeerd → USD 90–250 mln, midden ≈ 150–170 mln** | De eigen ketting (40 mln narrow × 1,5–2,5 niet-plannerseats × 1,5–2,5 incl. diensten) levert 90–250 mln op, niet 200–300. 300 en 400 mln zijn met de eigen aannames onbereikbaar. Zie §4.2 stap 5. | eigen herberekening op §4.2 |
| A2 | Smal segment (planner-seats) **USD 30–70 mln/jaar** | **gecorrigeerd → USD 19–78 mln** | 7.000 × 2.700 = 19 mln; 13.000 × 6.000 = 78 mln. De gepubliceerde band 30–70 was strakker dan de eigen inputs toestaan — schijnprecisie. | eigen herberekening op §4.2 stappen 2–4 |
| A3 | Specialistische tijd-wegtools **USD 8–15 mln/jaar** | **gecorrigeerd → USD 6–15 mln** | Deelposten: 3–7 + 0,8–2,3 + 2–5 = **5,8–14,3 mln**. Ondergrens was ~38% te hoog opgeschreven. Conclusie ("piepklein") blijft. | eigen herberekening op §4.2 stap 6 |
| A4 | Top-downcontrole: 12–20% × USD 1,44 mld = 175–290 mln, "consistent" ✅ | **gecorrigeerd → geen geldige kruiscontrole** | Rekenkundig klopt 173–288 mln. Maar (a) het brede segment bevat diensten en de TBRC-markt is software-only → factor 1,5–2 appels-en-peren; (b) de 12–20% is achteraf gekozen om te passen, niet extern onderbouwd; (c) software-alleen vergeleken geeft 4–7% sectoraandeel, ~2× uit elkaar met de bottom-up. | [TBRC](https://www.thebusinessresearchcompany.com/report/construction-schedule-software-global-market-report) + eigen analyse |
| A5 | Dichtheidscontrole: HS2 kost **GBP 4–4,5 mld/jaar** ("87,7–102,7 mld gespreid over de resterende looptijd") → 300–550 planners | **gecorrigeerd → GBP 2,3–4,0 mld/jaar → 150–500 planners** | Dubbeltelling: de 87,7–102,7 mld is de *totale* programmakosten inclusief de GBP 46,8 mld die al is uitgegeven t/m maart 2026. De genoemde methode zou 5–10 mld/jaar opleveren, niet 4–4,5. Resterend ≈ 41–56 mld over ca. 14–18 jaar. | [NAO HC 52 (PDF, tekst uitgelezen)](https://www.nao.org.uk/wp-content/uploads/2026/06/high-speed-two-reset-summary.pdf) |
| A6 | Mondiale bouwplanningssoftware **USD 1,44 mld (2025) → 2,29 mld (2030), ~9,7% CAGR** | **bevestigd** | Bronpagina geeft letterlijk 1,44 mld (2025), 1,58 mld (2026), 2,29 mld (2030), CAGR 9,7%. Nagerekend: (2,29/1,44)^(1/5)−1 = 9,72%. | [TBRC](https://www.thebusinessresearchcompany.com/report/construction-schedule-software-global-market-report) |
| A7 | Seat-besteding **USD 2.700–6.000/jaar** (P6 geamortiseerd + 22% onderhoud; P6 Cloud GBP 220/mnd) | **bevestigd (rekenkundig)** | 3.520/4 + 22%×3.520 = 1.654 ≈ 1.700 ✔; GBP 220 × 12 = GBP 2.640 ≈ USD 3.400 bij 1,29 ✔; TILOS 4.290/4–5 = 858–1.073 ✔. De onderliggende *P6-lijstprijzen* zijn wel bijgesteld (zie B4). | eigen herberekening |

### B. Prijzen

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| B1 | Turbo-Chart **USD 759 / AUD 1.079 / EUR 699 / GBP 609** per named user per jaar; multi-licentie vanaf 5 met volumekorting | **bevestigd** | Letterlijk op de prijspagina teruggevonden, inclusief "Volume discounts available" en minimum van 5 licenties. | [turbo-chart.com/purchase](https://turbo-chart.com/purchase) |
| B2 | P6 EPPM Cloud **GBP 220 per hosted named user per maand, minimaal 25 gebruikers** | **bevestigd (letterlijk)** | PDF uitgelezen: "Cost per Hosted Named User £220 per month / Minimum number of users 25". Aanvullend gevonden en toegevoegd: volumekorting 10–25% vanaf 101 users; UK Government Cloud GBP 439/mnd bij min. 50 users. | [Oracle G-Cloud 14 prijsdocument (PDF)](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf) |
| B3 | TILOS **USD 4.290** flat, eenmalig | **bevestigd** | Capterra noemt $4.290 one-time flat rate. | [Capterra](https://www.capterra.com/p/235928/TILOS/) |
| B4 | P6 Professional ca. **USD 3.520**; P6 EPPM ca. **USD 2.750 + 605/jaar** | **gecorrigeerd → 3.880 + 854 resp. 4.240 + 933** | De oorspronkelijke cijfers maakten EPPM goedkóper dan Professional — leveranciersonlogisch. Actuele opgave (juni 2025): Professional $3.880 + $854 support (22%); Enterprise $4.240 + $933. Het cijfer 2.750/605 is vermoedelijk een verouderde Oracle-lijstprijs. | [prmyazilim](https://prmyazilim.com/en/primavera-p6-pricing) |
| B5 | Primavera in de praktijk **USD 3.000–25.000/gebruiker/jaar**, korting 30–50%, stijging 5–8%/jaar | **bevestigd** | Bron splitst het: P6 Professional $3.000–8.000, P6 EPPM $8.000–25.000 per concurrent user; "30-50% Off List"; "5-8% Per Year". | [VendorBenchmark](https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing) |
| B6 | ALICE: **GBP 2 mln besparing** bij SCS JV op HS2-tunnels | **bevestigd (als vendorclaim)** | Letterlijk "£2M savings on the London tunnels of the UK's High Speed 2 railway"; klantnamen Skanska/Costain/STRABAG en het Costain-citaat kloppen. Het gaat om *geïdentificeerde*, niet gerealiseerde besparing — het rapport formuleert dat correct. | [ALICE](https://www.alicetechnologies.com/solutions/for-infrastructure/tunnels) |
| B7 | Nodes & Links **USD 12 mln (GBP 9,5 mln) Series B** | **bevestigd** | GBP 9,5 mln / USD 12 mln Series B, geleid door ETF Partners. *Kanttekening: dit is oud nieuws (2022) en wordt in het rapport ondateerd gepresenteerd.* | [Construction Management](https://constructionmanagement.co.uk/nodes-links-raises-9-5m/) |

### C. "Verplichte" software en formaten

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| C1 | USACE: aannemers moeten "**request a backup file template (.xer) from the Government**" en activity codes op projectniveau houden | **gecorrigeerd** | Het citaat komt in géén van beide gecontroleerde documenten voor. Het geciteerde Jacksonville-document (2014) bevat *nul* voorkomens van "xer" of "global". De actuele UFGS (aug. 2023 / chg 1 aug. 2024) zegt wél: "If Primavera P6 is selected for use, provide the 'xer' export file in a version of P6 importable by the Government system" en "Activity Codes must be Project Level, not Global or EPS level". Verwijzing en citaat zijn in §2.2 en §5.1 vervangen. | [UFGS 01 32 01.00 10 (PDF, tekst uitgelezen)](https://nibs-s3-wbdg3-production.s3.us-east-1.amazonaws.com/FFC/DOD/UFGS/UFGS%2001%2032%2001.00%2010.pdf); [USACE MGS 013201](https://www.usace.army.mil/Portals/44/docs/Engineering/MasterGuideSpecs/013201.pdf) |
| C2 | P6 is bij USACE de facto verplicht | **genuanceerd (nieuw materiaal)** | §2.1.2.2 "Other Than Primavera" staat alternatieve software uitdrukkelijk toe. Maar §2.1.2 eist software die "commercially available from the software vendor for purchase with vendor software support agreements available" is, en niet-P6-gebruikers moeten de opdrachtgever "two licenses, two computers, and training for two Government employees" leveren. Voor een gratis open-sourceplanner is dat een **hardere** drempel dan een formaateis. Toegevoegd aan §7.4. | idem |
| C3 | Brenner Basistunnel: "**All companies involved in the BBT project are required to use Trimble TILOS for project planning**" | **bevestigd (letterlijk, maar vendorbron)** | Citaat woordelijk teruggevonden in de PDF, plus de tweede formulering "commissioned planners are required to use TILOS". Ook bevestigd: het CAD-verhaal uit 2006, "tedious and prone to error" (Stephan Rieder), 17 mln m³ specie, 1-meter-resolutie profieldata, tijdsafhankelijke TBM-kosten in een apart kostenhistogram. Ook bevestigd: de "8 million Euros"-verschrijving. *Blijft een Trimble-marketingdocument uit 2016 dat "completion by 2025" noemt — het tool-mandaat is niet door BBT SE zelf bevestigd.* | [Trimble BBT case study (PDF, tekst uitgelezen)](https://heavycivil.trimble.com/rs/168-CRJ-586/images/022482-3575_CaseStudy_TILOS-BrennerBaseTunnel_A4_062916.pdf) |
| C4 | DCMA 14-point: ingevoerd 2005, contracten boven **USD 20 mln** | **bevestigd (secundaire bron)** | "The DCMA introduced it in 2005 to ensure projects worth over 20 million dollars were following best practice guidelines." Geen primair DCMA-document opgehaald. | [Ten Six](https://tensix.com/what-is-the-dcma-14-point-assessment/) |
| C5 | **EIA-748 revisie E bracht 32 richtlijnen terug naar 27** | **gecorrigeerd / waarschijnlijk onjuist** | De opgegeven bron gaf 403. Geen enkele bereikbare onafhankelijke bron bevestigt 27; de standaardreferentie noemt consequent **32** criteria. Tekst in §5.3 aangepast naar 32, met het 27-getal als onbevestigd gemarkeerd. | [Wikipedia, Earned value management](https://en.wikipedia.org/wiki/Earned_value_management) |

### D. Marktleiderschap en productstatus

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| D1 | **TILOS gaat 1 maart 2026 uit onderhoud; 11.1 MR4 is de laatste release; "de marktleider in de niche verdwijnt"; "het product heeft geen toekomst"; "vacuüm in het premiumsegment"** | **datum bevestigd, conclusie gecorrigeerd** | De volledige artikeltekst (via de Zendesk-API van dezelfde helpcenter, omdat de HTML-pagina 403 geeft) bevestigt 1 maart 2026 en 11.1 MR4 — maar noemt óók: **"TILOS 360", "the next generation of linear scheduling technology", release april 2026**, én "Tilos remains available for purchase" met doorlopende licentieverlenging. De narratieve kern van het rapport (niche wordt dakloos, premiumvacuüm) is daarmee te sterk en is op vier plaatsen bijgesteld (§0.4, §4.4, §6.2, §7.1). Wat overeind blijft: geen bugfixes/security-updates op 11.x, migratierisico voor programma's met 15+ jaar looptijd, en het ontbreken van een *open* volwaardige lineaire planner. | [BuildingPoint, artikel 55527556493849](https://help.buildingpoint.com.au/hc/en-au/articles/55527556493849--Important-Announcement-Tilos-Entering-End-of-Maintenance-on-1-March-2026) (opgehaald via `/api/v2/help_center/articles/search.json`) |
| D2 | Asta Powerproject: "**90 van de top-100 VK-hoofdaannemers**" | **bevestigd als citaat; blijft vendorclaim** | Woordelijk: "trusted by 90 of the top 100 main contractors in the UK for their construction projects, regardless of complexity or sector." Dit is Elecosoft-marketing die door de vakpers wordt doorgegeven; er is geen onafhankelijke telling. Het rapport markeert dat al correct. | [PBC Today](https://www.pbctoday.co.uk/news/digital-construction-news/construction-software-news/nodes-links-to-work-on-asta-powerproject-with-elecosoft/132745/) |
| D3 | Eleco plc 2025: omzet **GBP 38,8 mln (+20%)**, ARR **GBP 34,3 mln (+29%)**, 81% terugkerend, adj. EBITDA GBP 10,2 mln | **bevestigd (alle vier)** | Omzet £38,8m (+20%), ARR £34,3m van £26,6m (+29%), 81% terugkerend (2024: 77%), adj. EBITDA £10,2m (+32% van £7,7m). | [Eleco plc jaarresultaten 2025](https://ir.eleco.com/results/latest-results) |
| D4 | CHSRA: van **108** maandelijkse schemapakketten **91%** meer dan een week te laat; P6 + Acumen Fuse in gebruik | **bevestigd (letterlijk)** | "out of 108 monthly schedule packages for all Construction Packages, the contractors submitted the schedules more than a week late 91% of the time." Ook letterlijk: "Primavera P6 software for developing the baseline schedules … utilizing Deltek Acumen Fuse for quality assessments of contractor's schedules." *Aanvulling: auditperiode mei 2019–april 2022; slechts 15 (14%) pakketten daadwerkelijk getest.* | [CHSRA audit (PDF, tekst uitgelezen)](https://hsr.ca.gov/wp-content/uploads/2023/05/Program-Schedule-Management-A11Y.pdf) |
| D5 | HS2/NAO-cijfers: 87,7–102,7 mld; +35,9–37,2 mld; 3–13 jaar; mei 2036–okt 2039 en mei 2040–dec 2043; 46,8 mld uitgegeven; 153 mln reset (101 mln besteed); BCR 0,3–0,4; ~500 mln disallowable; 124 aanbevelingen / 45 (36%) | **bevestigd (alle, letterlijk)** | Alle cijfers één-op-één teruggevonden in de Key facts en de Summary van HC 52. ⚠️ *Eén weglating:* het rapport citeert alleen de retrospectieve BCR van 0,3–0,4 ("poor value for money"); de NAO noemt daarnaast de *huidige* BCR van **1,5–6,4** ("medium to very high value for money"). Dat is selectieve framing, geen feitelijke fout. | [NAO HC 52 (PDF, tekst uitgelezen)](https://www.nao.org.uk/wp-content/uploads/2026/06/high-speed-two-reset-summary.pdf) |
| D6 | Rail Baltica: **EUR 5,8 mld** origineel (2017-prijzen) → risicogecorrigeerd 7 mld → **15,3 mld** fase 1 → **23,8 mld** totaal; +160% in zes jaar | **bevestigd** | Alle bedragen kloppen. Kleine nuance: de bron zegt fase 1 "due by 2030"; het rapport voegt "exploitatie mogelijk pas 2031" toe zonder bron. | [ERR News](https://news.err.ee/1609915685/rail-baltica-phase-one-will-cost-at-least-24-billion-eu-auditors-say) |

### E. Wat ik niet heb kunnen weerleggen én niet heb kunnen bevestigen

- **TILOS 360 zelf.** Bestaat alleen als aankondiging in het BuildingPoint-artikel; geen Trimble-productpagina gevonden (de Trimble TILOS-pagina rept nergens van EOM of van een opvolger). Functionaliteit, prijs en of het daadwerkelijk in april 2026 is uitgekomen: **onbekend**. Dit is de belangrijkste openstaande vraag voor deze sector.
- **Installed base van TILOS** (aanname 3.000–6.000 licenties) en **Turbo-Chart-seats** (1.000–3.000). Blijven ongetoetste aannames; zij dragen de hele §4.2 stap 6.
- **Aantal organisaties (2.000–3.300) en planners per organisatie (3–5).** Geen enkele externe bron; dit is de zwakste schakel van de bottom-up en tegelijk de meest bepalende.
- **Diensten:licentie-ratio 1:1 tot 2:1.** Het rapport erkent zelf dat dit een ervaringsregel is; ik heb er geen bevestiging én geen weerlegging voor gevonden. Het is wel de multiplier die het brede segment het sterkst opblaast.
- **"Line of Balance, ontwikkeld door de US Navy in de jaren '50".** Plausibel maar niet onafhankelijk getoetst; de gangbare toeschrijving is Goodyear (jaren '40), verder ontwikkeld door de US Navy begin jaren '50.

### F. Netto-oordeel over dit sectorrapport

De **feitelijke basis is sterk**: elk primair document dat ik letterlijk kon uitlezen (NAO, CHSRA, Oracle G-Cloud, Trimble BBT, Eleco, TBRC, Capterra, Turbo-Chart) bevestigde de geciteerde cijfers exact — dat is ongebruikelijk goed. De **zwakte zit in twee dingen**: (1) de doorgerekende segmentschatting is systematisch aan de hoge kant en presenteert bandbreedtes die strakker zijn dan de eigen aannames toestaan, en (2) twee narratief dragende conclusies (TILOS verdwijnt; USACE eist een .xer-template) bleken op nadere inspectie respectievelijk te sterk en niet in de bron te staan. Beide zijn hierboven en in de tekst gecorrigeerd. **Vertrouwen in de gecorrigeerde versie: middel-hoog** — hoog voor de bronnen, middel voor de omvangsschatting.
