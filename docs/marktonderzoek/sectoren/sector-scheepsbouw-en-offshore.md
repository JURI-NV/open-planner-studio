# Sectorrapport: Planningssoftware in Scheepsbouw en Offshore

**Onderzoeksdatum:** 25 juli 2026
**Scope:** nieuwbouwwerven (commercieel, cruise, naval), reparatie-/MRO-werven, offshore olie- en gas-EPC (topsides, jackets, FPSO, subsea), offshore wind (funderingen, converterstations, installatie) en de bijbehorende engineeringbureaus en toeleveranciers.
**Methode:** webonderzoek via zoekmachine-proxy en directe leveranciers-, analisten- en overheidsbronnen. Alle kwantitatieve claims hebben een bron-URL. Eigen berekeningen zijn expliciet gemarkeerd als **SCHATTING**.

> **Onderzoeksbeperking (transparant):** de WebSearch-tool was in deze sessie uitgeput; al het onderzoek is uitgevoerd via WebFetch, deels op een DuckDuckGo-proxy (`lite.duckduckgo.com` / `html.duckduckgo.com`) en deels rechtstreeks op leveranciers-, analisten- en overheidspagina's. In totaal zijn ~40 fetch-operaties uitgevoerd, waarvan ~22 zoekopdrachten. Waar een cijfer alleen via een zoeksnippet is gevonden en niet op de primaire pagina is geverifieerd, staat dat erbij.

---

## 1. Kernconclusies (management samenvatting)

1. **Dit is de meest planning-intensieve maakindustrie ter wereld.** Bij Meyer Turku wordt het planningssysteem door **150–200 mensen** bijgewerkt, met ~4.000 eigen medewerkers plus ~4.000 onderaannemers op drie werven, en een schip van 18 dekken / 158.000 GT als planningsobject ([Safran case study Meyer Turku](https://www.safran.com/case-studies/meyer-turku)). Dat is een orde van grootte boven een typisch bouwproject. **[GECORRIGEERD 2026-07-25]** De eerder hier vermelde "~50.000 planningsactiviteiten per cruiseschip" is bij hercontrole **niet terug te vinden in de Safran/Meyer-Turku-bron** en is geschrapt; er is geen vervangende bron gevonden. Zie §11.
2. **De rangorde is dubbel.** Er zijn twee onderscheiden softwarelagen die zelden door één pakket worden gedekt: (a) het *contractuele CPM-schema* (Primavera P6, Safran Project, MS Project) en (b) de *werf-/detailplanning* (AVEVA ERM, Siemens Opcenter/Tecnomatix, Dassault DELMIA, SPAR PERCEPTION, Floorganise Floor2Plan, eigenbouw-MES). Werven kopen beide, en de koppeling ertussen is het grootste onopgeloste probleem.
3. **In offshore-EPC (Noordzee) is Safran Project een reële nummer 1 of gedeelde nummer 1 naast P6** — Aker Solutions, Aibel, Equinor/Statoil, Aker BP en ABB zijn publiek gedocumenteerde klanten ([safran.com](https://www.safran.com/), [case studies](https://www.safran.com/case-studies)). Wereldwijd blijft Oracle Primavera P6 de facto standaard, vooral omdat XER de uitwisselingstaal is.
4. **Betalingsbereidheid is hoog tot zeer hoog** — vertragingskosten liggen in de orde van **tienduizenden tot miljoenen dollars per dag** (LD-clausules van US$ 42.500/dag zijn gedocumenteerd; FPSO-vertraging in de Noordzee kostte $400 miljoen). Softwarekosten van $2.500–3.500 per planner per jaar zijn in die context verwaarloosbaar.
5. **Segmentomvang (SCHATTING, 2025): ~USD 195 miljoen per jaar aan planningssoftware-licenties (onzekerheidsband USD 150–280 miljoen), en USD 450–650 miljoen inclusief implementatie, integratie, training en project-controls-consultancy.** Redenering in hoofdstuk 5. **[GECORRIGEERD 2026-07-25]** Hier stond eerder "USD 200–280 miljoen", wat niet overeenkwam met de eigen berekening in §5.2 (~195 mln, band 150–280 mln); de ondergrens is nu gelijkgetrokken met §5.2.
6. **De grootste openingen voor een open-source, IFC-/modelgedreven planner:** (i) de detailplanningslaag waar werven nog massaal Excel gebruiken, (ii) model-gedreven automatisch genereren van activiteiten en budgetten uit engineeringmetadata (gewicht, oppervlak, volume) — precies wat het NSRP-project van SSI/Floorganise aantoonde, (iii) gratis licht-/onderaannemerszitplaatsen, (iv) resource-nivellering die beter is dan P6 zonder de geopolitieke last van Spider Project, en (v) soevereiniteit/auditeerbaarheid voor naval yards.

---

## 2. Wat deze sector bijzonder maakt qua planning

### 2.1 Schaal van het netwerk

| Grootheid | Cijfer | Bron |
|---|---|---|
| ~~Activiteiten per cruiseschip-project~~ | ~~~50.000~~ **INGETROKKEN** — cijfer staat niet in de opgegeven bron en is nergens anders bevestigd | ~~[Safran / Meyer Turku](https://www.safran.com/case-studies/meyer-turku)~~ (hercontrole 25-07-2026: pagina bevat alleen 126×1.112 ft / 38,6×339 m, 18 dekken, 158.000 GT, 1–2 jaar, 4.000 + ~4.000 mensen, 150–200 updaters, 2 jaar Safran-gebruik, 4 cruiseschepen, 25% wereldproductie in 10 jaar) |
| Mensen die het planningssysteem regelmatig bijwerken (één werfgroep) | 150–200 | [Safran / Meyer Turku](https://www.safran.com/case-studies/meyer-turku) |
| Directe medewerkers + onderaannemers (Aker Finnyards/Meyer, 3 werven) | ~4.000 + ~4.000 | [Safran / Meyer Turku](https://www.safran.com/case-studies/meyer-turku) |
| Dagelijkse gebruikers op één offshore-topsideproject (Kristin, Aker Stord) | ~100 | [Safran / Aker Solutions](https://www.safran.com/case-studies/aker-solutions) |
| Schip-afmetingen als planningscontext (Freedom Class) | 18 dekken, 158.000 GT | [Safran / Meyer Turku](https://www.safran.com/case-studies/meyer-turku) |

Belangrijk detail: het NSRP-eindrapport formuleert het probleem expliciet: *"there are thousands of everyday shipbuilding activities which require granular planning levels for sequencing, dependencies, budgets, and resource allocation. To accomplish this daunting task, shipyards use a variety of commercially available scheduling software, spreadsheets, databases, and home-grown legacy systems, many of which require extensive manual data input."* ([NSRP PP21-ADP eindrapport, juni 2024, PDF](https://www.nsrp.org/wp-content/uploads/2024/06/PP21-ADP_Earned-Value-Final-Report.pdf))

### 2.2 Blokbouw: een planningsprobleem dat CPM niet kent

De sector bouwt niet lineair maar in **blokken/secties** die parallel worden voorgeprefabriceerd, uitgerust ("pre-outfitting") en daarna in het dok geërigeerd. Dat introduceert drie beperkingen die klassieke CPM-tools niet modelleren:

1. **Ruimte als resource (spatial scheduling).** Blokken hebben fysieke oppervlakte nodig op een beperkt assemblageterrein. De academische literatuur behandelt dit als een apart NP-hard probleem: *"jobs ... require physical space in a restricted space"* ([Spatial scheduling for large assembly blocks in shipbuilding, ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0360835215002296)); *"block assembly consumes the majority of processing time and resources in shipbuilding"* ([Wiley, 2017](https://onlinelibrary.wiley.com/doi/10.1155/2017/1923646)). Andere formuleringen: permutation flow-shop ([IJNAOE/ScienceDirect](https://www.sciencedirect.com/science/article/pii/S2092678225000330)), en *"Flexible Job-Shop Scheduling Problem with Assemblies, Limited Buffer Capacity, Block Erection Strategy, and Due Dates"* ([Taylor & Francis, 2025](https://www.tandfonline.com/doi/full/10.1080/00207543.2025.2503465)).
2. **Kraan- en dokcapaciteit** als harde, niet-vervangbare resource met tilcapaciteit en bereik.
3. **Repetitiviteit.** Een groot deel van het werk (paneellijn, secties, kabelgoten, leidingspools) is repetitief en snelheids- (tempo-)gedreven in plaats van gebeurtenisgedreven. De vakliteratuur constateert daarom: *"a big portion of the project activities is repetitive and resource driven, hence the use of LSM time-location and line charts becomes more practical"* — Line of Balance / takt-planning is hier passender dan pure CPM (bron: zoeksnippet over Linear Scheduling Methods; zie bronnenlijst §10, categorie "LOB/takt").

Siemens verwoordt het commerciële argument tegen statische planningstools scherp in zijn werf-factsheet: *"Static planning tools, such as spreadsheets or flow-charting software, are unable to generate results that account for variability and changing conditions over time. Relevant interdependencies between system components and technological constraints are not usually taken into consideration."* ([Siemens Tecnomatix Plant Simulation for shipyards, factsheet 8852-D6 3/23](https://sisinc.org/wp-content/uploads/2026/03/Siemens-SW-Plant-Simulation-for-Shipyards-Fact-Sheet.pdf))

### 2.3 Resource-nivellering is hier de kernfunctie, niet een extraatje

De planningsmanager van Meyer Turku/Aker Finnyards zegt letterlijk: *"Resource management is the key to everything"* en over het systeem: *"Without it there will be no ships – not on time at least."* ([Safran / Meyer Turku](https://www.safran.com/case-studies/meyer-turku))

Waarom: een werf heeft vaste, schaarse en gedeelde capaciteiten (lassers per klasse, pijpfitters, elektromonteurs, kranen, dok- en kadeplaatsen, verfstraten, hallen) die over **meerdere gelijktijdige scheepsprojecten** verdeeld moeten worden. Nivellering is dus een multi-project, multi-skill, ruimte-beperkt probleem — de zwaarste variant van RCPSP. Dat verklaart de belangstelling voor Spider Project, dat als enige mainstreamtool *"optimizes resource, cost, and material constrained schedules"* en *"calculates feasible resource constrained floats and determines Resource Critical Path"* ([spiderproject.pro](https://www.spiderproject.pro/en/spider-project/)); Wikipedia noteert dat Spider *"has shown the best results among other tools compared in limited tests"* op resource-constrained scheduling ([Wikipedia](https://en.wikipedia.org/wiki/Spider_Project)).

### 2.4 Doorlooptijd en gelaagdheid

- Bouw- en assemblagefase per cruiseschip: **1–2 jaar**, met vier schepen in twee jaar bij Aker Finnyards ([Safran](https://www.safran.com/case-studies/meyer-turku)).
- Grote offshore-projecten (converterstations, FPSO's) lopen 3–5 jaar van FEED tot commissioning; Aibel's portfolio omvat DolWin Beta (900+ MW), DolWin 5 en de drie Dogger Bank-converterplatforms ([Safran / Aibel](https://www.safran.com/case-studies/aibel-powers-shift-to-wind-energy)).
- Naval programma's lopen decennia; de US Navy heeft over 20 jaar zijn scheepsbouwbudget bijna verdubbeld zonder vlootgroei, met *"cost growth, delivery delays, and ships that do not perform as expected"* als structureel patroon ([GAO-25-108136](https://www.gao.gov/products/gao-25-108136)). Het Columbia-klasse onderzeebootprogramma kent *"at least a 1-year delay to the first submarine's delivery and hundreds of millions of dollars in additional cost"* (idem).

### 2.5 Contractuele eisen

- **Boetes bij late oplevering.** Scheepsbouwcontracten (BIMCO NEWBUILDCON en varianten) kennen liquidated damages *"payable to the buyer by way of a reduction of the contract price for delay in delivery"*, plus prestatieboetes voor te lage snelheid en te hoog brandstofverbruik ([Haynes Boone, Law of Shipbuilding Contracts](https://www.haynesboone.com/) — via zoeksnippet). Een gepubliceerde voorbeeldclausule hanteert **US$ 42.500 per dag voor dagen 1–150 vertraging** ([LawInsider sample clause](https://www.lawinsider.com/)).
- **Annuleringsrecht.** Bij langdurige vertraging krijgt de koper een ontbindings-/annuleringsrecht: *"Delay in delivery attracted liquidated damages; prolonged delay gave the Buyer a right to cancel"* (Stephenson Harwood, via zoeksnippet). Voor de werf betekent dat: de planning is geen managementinstrument maar een existentieel bewijsstuk.
- **EVMS-verplichting bij defensie.** In de VS geldt ANSI/EIA-748-conformiteit vanaf **US$ 20 miljoen** contractwaarde, met een formele compliance-review vanaf **US$ 100 miljoen** (verhoogd van $50M via DoD Class Deviation 2015-O0017, DFARS 234.201(1)(ii)). Clausules: DFARS 252.234-7001, 252.234-7002, 252.242-7005. Voor scheepsbouw voert **SUPSHIP** (Navy Supervisor of Shipbuilding) het doorlopende EVMS-toezicht uit, in coördinatie met DCMA en NAVSEA-hoofdkwartier. (Bronnen: DFARS/DoD-documenten via zoeksnippets — zie §10.)
- **Doorwerking naar onderaannemers.** De prime is verantwoordelijk *"for ensuring that the selected subcontractors comply with the requirements"* — dat is de reden dat toeleveranciers en engineeringbureaus mee moeten in dezelfde schema-formaten.

### 2.6 Kosten van vertraging

| Situatie | Kosten | Bron |
|---|---|---|
| LD-clausule scheepsbouw (voorbeeld) | US$ 42.500/dag (dag 1–150) | [LawInsider](https://www.lawinsider.com/) |
| FPSO-vertraging Noordzee | +US$ 400 miljoen projectkosten, first oil naar Q2 2025 | [Offshore Energy](https://www.offshore-energy.biz/fpso-delay-pushes-north-sea-projects-costs-up-by-400-million-and-bumps-first-oil-to-2025/) |
| FPSO remedial work | projectkosten naar $4,9–5,2 mrd, +7–13% | [Offshore Energy](https://www.offshore-energy.biz/with-fpso-requiring-more-work-first-oil-gets-bumped-to-mid-2024/) |
| Ongeplande stilstand offshore platform | ~US$ 250.000 per uur aan gemiste omzet (2024-benchmark) | [PetroHab](https://petrohab.com/the-true-cost-of-unplanned-production-shutdown-in-oil-and-gas-2026-operational-analysis/) |
| FPSO-schemavertraging generiek | *"Every day of delay on an FPSO project costs tens of millions"* | [Upstream Petroleum](https://www.upstream-petroleum.com/uncover-how-fpso-schedule-delays-can-burn-dollarbillionsdollarsee-the-1-3-year-cost-to-operators-and-fpso-owners) |
| Cruiseschip-oplevering te laat | annulering van 9 inaugurele cruises (Star Princess, uitgesteld 29-07-2025 → 26-09-2025); Oceania Allura: maidenvoyage + 5 sailings geannuleerd (Fincantieri) | via zoeksnippets, zie §10 |
| Offshore wind sectorbreed | ~US$ 100 miljard aan capex in vertraagde/geannuleerde projecten over twee jaar | via zoeksnippet WFO/analisten, zie §10 |

De Aker Solutions-projectleider vat de betalingsbereidheid samen: *"If you lose control of a project it can cost you astronomical amounts of money."* ([Safran](https://www.safran.com/case-studies/aker-solutions))

---

## 3. Welke planningssoftware hier daadwerkelijk gebruikt wordt

### 3.1 Rangorde — laag A: contractuele CPM-planning

| # | Pakket | Positie in deze sector | Gebruikt door | Bewijs |
|---|---|---|---|---|
| 1 | **Oracle Primavera P6 (Professional/EPPM)** | De facto wereldstandaard; XER is de uitwisselingstaal in vrijwel alle EPC-contracten. Vrijwel altijd het "contractueel" schema richting opdrachtgever. | Opdrachtgevers (olie- en gasoperators, marines), hoofdaannemers, offshore-EPC, grote werven, engineeringbureaus | [Oracle](https://www.oracle.com/construction-engineering/primavera-p6/); genoemd als projectplanningstool voor werven bij [Floorganise](https://www.floorganise.com/knowledgebase/technology-knowledgebase/planning-tools-and-software/); Floor2Plan integreert *met* P6, vervangt het niet ([Floorganise](https://www.floorganise.com/our-technology/)) |
| 2 | **Safran Project (+ Safran Risk, Safran Planner, Web Access)** | Sterke nummer 1 in het Noordzee-/Noorse offshore-cluster en bij Scandinavische/Finse werven; combineert schema, kosten, resources en risico in één model | Offshore-EPCIC-contractors, werven, operators | Klantenlijst incl. **Meyer Turku** (scheepsbouw), **Aker BP**, **Equinor**, **Aibel**, **AECOM**, **ABB** ([safran.com](https://www.safran.com/)); case studies: [Aker Solutions](https://www.safran.com/case-studies/aker-solutions), [Aibel](https://www.safran.com/case-studies/aibel-powers-shift-to-wind-energy), [Meyer Turku](https://www.safran.com/case-studies/meyer-turku), [Fosen Yard](https://www.safran.com/case-studies/fosen-yard), [Statoil](https://www.safran.com/case-studies/statoil), [Salmar](https://www.safran.com/case-studies/salmar) |
| 3 | **Microsoft Project + Excel** | Blijft massaal in gebruik voor detail- en voortgangsplanning, ook bij grote werven; het "schaduwsysteem" | Werven (afdelingsniveau), onderaannemers, toeleveranciers | Floorganise lijst MS Project en Excel expliciet als de gangbare tools voor "Detail/Progress Tracking" ([bron](https://www.floorganise.com/knowledgebase/technology-knowledgebase/planning-tools-and-software/)); NSRP: *"spreadsheets, databases, and home-grown legacy systems"* ([NSRP](https://www.nsrp.org/wp-content/uploads/2024/06/PP21-ADP_Earned-Value-Final-Report.pdf)) |
| 4 | **Deltek Open Plan / Deltek Acumen Fuse** | Open Plan als legacy-EVMS-scheduler; Acumen Fuse als kwaliteits-/DCMA-checker bovenop P6 | Defensie-gerelateerde werven, EPC-contractors, opdrachtgevers-assurance | Open Plan genoemd bij projectplanning voor werven ([Floorganise](https://www.floorganise.com/knowledgebase/technology-knowledgebase/planning-tools-and-software/)); Acumen *"widely used across government contracting, aerospace and defense, ... energy, oil and gas"* ([Deltek](https://www.deltek.com/products/delivery-assurance/ppm/acumen/)) |
| 5 | **Spider Project** | Niche maar technisch superieur op nivellering; officieel toepassingsgebied noemt **shipbuilding** expliciet | Russische/CIS-werven, sommige olie- en gas- en mijnbouwprojecten wereldwijd; buiten Rusland vooral via partners in Brazilië, Roemenië, VS, Australië | Toepassingsdomeinen incl. Shipbuilding ([Planning Planet-profiel](https://planningplanet.com/forums/spider-project/875304/resource-leveling-activity-interruptions)); [spiderproject.pro](https://www.spiderproject.pro/en/spider-project/); [Wikipedia](https://en.wikipedia.org/wiki/Spider_Project) |
| 6 | **Oracle Primavera Cloud / InEight / Nodes&Links e.d.** | Opkomend, nog geen sectorstandaard | Grote opdrachtgevers in pilots | [Oracle Primavera Cloud](https://www.oracle.com/construction-engineering/primavera-cloud-project-management/); [InEight XER-import](https://learn.ineight.com/Control/Content/4-Scheduling/) |

### 3.2 Rangorde — laag B: werf-/productieplanning (APS/MES/ERP)

| # | Pakket | Rol | Bewijs |
|---|---|---|---|
| 1 | **SAP (ERP + PS/S4HANA)** | Financiële ruggengraat en projectkostenstructuur bij werven. **[GECORRIGEERD 2026-07-25]** De eerdere bewering "*Meyer Group gebruikt SAP S/4 als strategisch projectplatform*" is **niet houdbaar op de opgegeven bron**: de Safran/Meyer-Turku-pagina noemt SAP alleen als Safran-koppelproduct ("Integrator for SAP") en beschrijft de gekoppelde systemen als "systems for job orders, document control and time registration" zonder ze te benoemen. Behandel de SAP-inzet bij Meyer als **onbevestigd** | SAP staat bovenaan bij [Floorganise ERP-lijst](https://www.floorganise.com/knowledgebase/technology-knowledgebase/planning-tools-and-software/); Safran/Meyer-pagina bevat de claim niet ([hercontrole](https://www.safran.com/case-studies/meyer-turku)) |
| 2 | **AVEVA Enterprise Resource Management (ERM)** | Werf-specifiek: BOM, inkoop, logistiek, magazijn en **Advanced Work Packaging** (WorkPacks) gekoppeld aan het 3D-model | [AVEVA ERM](https://www.aveva.com/en/products/enterprise-resource-management/); case studies Chantier Davie en Oceana Shipyard (via casestudies.com) |
| 3 | **Siemens (Teamcenter + Opcenter APS/MES + Tecnomatix Plant Simulation)** | Digital-shipyard-stack; Plant Simulation doet capaciteits-, kraan- en ruimtesimulatie en blok-laydown | [Siemens ship construction](https://www.siemens.com/en-us/digital-thread/smart-manufacturing/ship-construction/); [Plant Simulation factsheet](https://sisinc.org/wp-content/uploads/2026/03/Siemens-SW-Plant-Simulation-for-Shipyards-Fact-Sheet.pdf) |
| 4 | **Dassault Systèmes 3DEXPERIENCE / DELMIA** | Shipyard Production Scheduling & Optimization gekoppeld aan PLM/CAD | [DELMIA APS](https://www.3ds.com/products/delmia/supply-chain-planning-optimization/advanced-planning-scheduling); 28-uurs certificering "3DEXPERIENCE DELMIA Shipyard Production Scheduling Optimization" ([ETC Academy](https://catalogue-etc-academy.dendreo.com/formation/586/3dexperience-delmia-shipyard-production-scheduling-optimization-28h)) |
| 5 | **SPAR Associates PERCEPTION** | Werf-native raming + planning + productiebeheer, *"Over 50 Years of Providing Planning & Production Management Systems to Shipyards"*; *"a system for planning, estimating, and managing labor, material, and subcontractors in shipbuilding and repair"* | [sparusa.com](https://www.sparusa.com/) (server gaf tijdens onderzoek 503; citaten via zoeksnippets + [manualzz](https://manualzz.com/manual/en/Spar/Perception/User+manual)) |
| 6 | **Floorganise Floor2Plan** | Werf-specifieke detailplanning die MES + MOM + APS combineert en met P6/ERP/PDM koppelt | [Floorganise](https://www.floorganise.com/our-technology/) |
| 7 | **SSI ShipConstructor / EnterprisePlatform** | CAD + engineeringmetadata die planning voedt | [SSI](https://www.ssi-corporate.com/products/enterpriseplatform/); NSRP-project ([PDF](https://www.nsrp.org/wp-content/uploads/2024/06/PP21-ADP_Earned-Value-Final-Report.pdf)) |
| 8 | **Hanwha Systems MES, HD Hyundai/Siemens AI-shipyard** | Aziatische werven bouwen eigen/gecombineerde stacks | [Hanwha Systems MES](https://www.hanwhasystems.com/ict/en/business/solution/mes.do); [Siemens–HD Hyundai AI digital shipyard](https://news.siemens.com/en-us/siemens-hd-hyundai-ai-digital-shipyard-us-shipbuilding/) |

### 3.3 Wie gebruikt wat (per rol)

- **Opdrachtgever / eigenaar** (olie- en gasoperators zoals Equinor, Shell, Petrobras; marines/NAVSEA; cruiserederijen; offshore-wind-ontwikkelaars): P6 (of P6-lezende assurance-tools) voor het toezichtschema; Acumen Fuse/DCMA-checks voor schemakwaliteit; EVMS-rapportage. Safran wordt door Equinor/Statoil en Aker BP zelf gebruikt ([safran.com](https://www.safran.com/), [Statoil case](https://www.safran.com/case-studies/statoil)).
- **Hoofdaannemer / werf**: dubbele stack — P6 of Safran voor het contractschema, plus ERP (SAP/AVEVA ERM) en APS/MES voor de vloer. Meyer Turku is het schoolvoorbeeld: SAP S/4 + Safran + eigen werkorder-/tijdregistratiekoppelingen ([Safran](https://www.safran.com/case-studies/meyer-turku)).
- **Offshore-EPCIC-contractor** (Aker Solutions, Aibel, Subsea7, Saipem, McDermott, Seatrium): Safran en/of P6, met interfacemanagement als kernfunctie. Aker Solutions gebruikte Safran voor *"reliable project control via interface management"* met ~100 dagelijkse gebruikers op één platformproject ([Safran](https://www.safran.com/case-studies/aker-solutions)).
- **Onderaannemer / toeleverancier**: MS Project of Excel; levert schema-fragmenten aan die de hoofdaannemer moet consolideren. Fosen Yard beschrijft precies dit probleem: *"Consolidated diverse schedules in varying formats from multiple subcontractors into unified project documentation"* ([Safran](https://www.safran.com/case-studies/fosen-yard)).
- **Engineeringbureau / naval architect**: CAD/PLM-gedreven (ShipConstructor, AVEVA Marine/E3D, NAPA, FORAN, 3DEXPERIENCE) met P6/MS Project voor de engineeringplanning.

---

## 4. Wat ervoor betaald wordt

### 4.1 Licentieprijzen (gepubliceerd of afgeleid)

| Product | Prijs | Bron |
|---|---|---|
| **Primavera P6 Professional**, eeuwigdurend | ~US$ 2.750–3.520 per named user; support ~US$ 605/jaar; markt noemt US$ 3.500–7.000 per licentie | Zoeksnippets Oracle Licensing Experts e.a., via [ITQlick Oracle Primavera pricing](https://www.itqlick.com/oracle-primavera/pricing) en gerelateerde bronnen |
| **P6 cloud/gehost, named user** | ~£220 per maand (min. 25 users) ≈ £2.640/jaar ≈ US$ 3.300/jaar | idem (zoeksnippet) |
| **P6 onderhoud** | ~22% van licentiewaarde per jaar | idem (zoeksnippet) |
| **P6 TCO, 50 users over 5 jaar** | **US$ 500.000 – 1.000.000** inclusief implementatie, training en onderhoud | [ITQlick](https://www.itqlick.com/oracle-primavera/pricing) |
| **Safran Project** | ~US$ 150 per gebruiker per maand als startpunt; ~US$ 1.200/maand voor 10 gebruikers; US$ 10.000+/maand richting 100 gebruikers, afhankelijk van modules | [ITQlick Safran pricing](https://www.itqlick.com/safran-project/pricing) — let op: dit is een aggregator-schatting, geen leverancierslijstprijs |
| **Spider Project Professional** (eeuwigdurend, USD) | 1e: **$4.500**; 2e: $4.100; 3e: $3.700; 4e–6e: $3.300; 7e–10e: $3.000; 11e–15e: $2.700; 16e–25e: $2.400; 26e+: $2.250 | [spiderproject.pro prijslijst](https://www.spiderproject.pro/en/price-list/) |
| **Spider Project Desktop Plus** | $2.250 / $2.050 / $1.850 / $1.700 (staffel) | idem |
| **Spider Project Desktop** | $1.700 / $1.500 / $1.350 / $1.150 (staffel) | idem |
| **Spider Project Lite** | **$800** | idem |
| **Deltek Acumen (Fuse)** | ~US$ 75 per gebruiker per maand (≈ $900/jaar) | [ITQlick Acumen pricing](https://www.itqlick.com/acumen/pricing) |
| **AVEVA ERM, Siemens Opcenter/Tecnomatix, Dassault DELMIA, SPAR PERCEPTION, Floor2Plan** | Geen publieke prijzen; alle vier vereisen een offerte | [AVEVA](https://www.aveva.com/en/products/enterprise-resource-management/), [Floorganise](https://www.floorganise.com/our-technology/), [SSI](https://www.ssi-corporate.com/products/enterpriseplatform/) |

**SCHATTING — enterprise-dealwaardes werf/EPC.** Op basis van de P6-TCO-benchmark ($500k–1M voor 50 gebruikers/5 jaar) en de gebruikelijke verhouding software:diensten van 1:1 à 1:2 bij werf-ERP/APS-implementaties, schat ik:
- Middelgrote werf (200–800 medewerkers), CPM-tool + basisimplementatie: **€75.000 – 250.000 initieel, €30.000 – 80.000/jaar terugkerend**.
- Grote werf of offshore-EPC (>3.000 medewerkers), volledige stack (CPM + risico + ERM/APS-planningsmodule + integratie): **€1 – 5 miljoen initieel, €300.000 – 1,2 miljoen/jaar terugkerend**.
- Naval prime met EVMS-verplichting (EIA-748-gecertificeerd systeem): daar bovenop **€0,5 – 2 miljoen** aan EVMS-systeemvalidatie, procesbeschrijving, surveillance en audit-ondersteuning, plus doorlopende kosten.
Deze bedragen zijn een eigen schatting; er zijn geen publieke aanbestedingsdocumenten met werf-specifieke bedragen gevonden binnen het onderzoek.

### 4.2 Implementatie- en trainingskosten

- Implementatie + training zit al in de $500k–1M TCO-band voor 50 P6-gebruikers ([ITQlick](https://www.itqlick.com/oracle-primavera/pricing)); dat impliceert dat de licenties zelf minder dan de helft van de totale kosten zijn.
- Er bestaat een aparte trainingsmarkt gericht op deze sector, o.a. *"Primavera (P6) Scheduling in the Earned Value Environment — 16-Hour"* ([Humphreys & Associates](https://www.humphreys-assoc.com/primavera-p6-scheduling-in-the-earned-value-environment-16-hour/)) en 28-uurs DELMIA-werfplanningcertificering ([ETC Academy](https://catalogue-etc-academy.dendreo.com/formation/586/3dexperience-delmia-shipyard-production-scheduling-optimization-28h)).
- Gespecialiseerde consultancy (implementatie, migratie, integratie) wordt aangeboden door o.a. [Ten Six](https://tensix.com/primavera-implementation-consulting/) en [CMC Project Solutions](https://www.cmcprojectsolutions.com/primavera/shop/).
- De verborgen kostenpost is **data-integratie**: engineering (CAD/PLM) → planning → ERP → MES. Het NSRP-project bestond in essentie volledig uit het oplossen van die koppeling, en de belangrijkste conclusie was dat *"the quality of the drawing hierarchy is vital for a good import"* ([NSRP](https://www.nsrp.org/wp-content/uploads/2024/06/PP21-ADP_Earned-Value-Final-Report.pdf)).

### 4.3 Betalingsbereidheid: **hoog**, met twee scherpe uitzonderingen

**Waarom hoog:**
1. De vertragingskosten (§2.6) zijn 3–5 ordes van grootte hoger dan de softwarekosten. Eén dag vertraging bij $42.500 LD betaalt ruim tien P6-licenties.
2. Contractueel afgedwongen: EVMS boven $20M in de VS, XER-deliverables in EPC-contracten, DCMA-checks door opdrachtgevers-assurance.
3. Bewijslast bij claims: het schema is het primaire bewijsstuk in arbitrage; een niet-verdedigbaar schema kost direct geld.
4. De sector heeft aantoonbaar geld: gecombineerde operationele winst van de Koreaanse "big three" was in H1 2025 meer dan **2,57 biljoen won (US$ 1,86 miljard)**, en de orderportefeuille per Q1 2025 **US$ 137,26 miljard** (zoeksnippets Korea-media; zie §10). De wereldwijde orderboek stond eind 2025 op **173,91 miljoen CGT** ([SunSirs](https://www.sunsirs.com/commodity-news/petail-29602.html)), en 2024 was met **~US$ 204 miljard contractwaarde** een 17-jaars piek ([HD IN Research](https://www.hdinresearch.com/news/779)).

**Waar de bereidheid laag is:**
1. **Onderaannemers en kleinere toeleveranciers.** Zij moeten meedoen in het schemaproces maar hebben geen budget voor $3.000/seat. Resultaat: ze leveren Excel en MS Project aan, en de hoofdaannemer betaalt de consolidatiekosten. Fosen Yard beschrijft exact dit probleem ([Safran](https://www.safran.com/case-studies/fosen-yard)).
2. **De detail-/vloerlaag.** Werven willen honderden tot duizenden gebruikers voortgang laten melden, maar willen daar geen volledige planner-licentie voor betalen. Dat is waarom Excel blijft. Zoals een sectorbron het stelt: *"Many shipyards still operate with fragmented planning tools, Excel spreadsheets, or legacy systems that weren't built for the realities of large-scale, high-complexity shipbuilding"* (zoeksnippet, zie §10).

---

## 5. Segmentomvang: schatting met expliciete redenering

### 5.1 Onderliggende marktgrootheden

| Grootheid | Cijfer (jaar) | Bron |
|---|---|---|
| Wereldwijde scheepsbouwmarkt | US$ 120,0 mrd (2025) → $165,2 mrd (2033), CAGR ~3,9% | [Pheonix Research](https://www.pheonixresearch.com/market-report/global-shipbuilding-market-2025-2033/) |
| Idem, alternatieve raming | US$ 169,27 mrd (2025), CAGR 4,4% | [Maximize Market Research](https://www.maximizemarketresearch.com/market-report/shipbuilding-market/148775/) |
| Idem, hoge raming | US$ 226,3 mrd (2025) → $500,63 mrd (2035), CAGR 8,26% | [Market Research Future](https://www.marketresearchfuture.com/reports/shipbuilding-market-10314) |
| Contractwaarde nieuwbouworders 2024 (17-jaarspiek) | ~US$ 204 mrd over 66 mln CGT | [HD IN Research](https://www.hdinresearch.com/news/779) |
| Wereldwijd orderboek | 173,91 mln CGT (eind 2025) | [SunSirs](https://www.sunsirs.com/commodity-news/petail-29602.html) |
| Offshore olie/gas EPC-gunningen | US$ ~52 mrd (2024) → US$ 54 mrd verwacht (2025) | [Westwood](https://www.westwoodenergy.com/news/westwood-insight-offshore-epc-contracting-activity-to-remain-buoyant-in-2025) |
| Offshore wind markt | US$ 46,4 mrd (Emergen/Precedence) tot US$ 76,9 mrd (GM Insights), 2025 | zoeksnippets, zie §10 |
| Naval vessel MRO | US$ 57,5 – 64,1 mrd (2025), CAGR ~6% | [GII Research](https://www.giiresearch.com/report/moi1851633-naval-vessel-mro-market-share-analysis-industry.html), [Growth Market Reports](https://growthmarketreports.com/report/naval-ship-maintenance-repair-and-overhaul-mro-market-global-industry-analysis) |
| Actieve werven wereldwijd (met lopend nieuwbouw-orderboek) | ~180 (sept 2024), +17,7% t.o.v. 153 (juni 2022) | **[GECORRIGEERD]** bron is **Xclusiv Shipbrokers**, gerapporteerd via Freight News — *niet* Statista. Statista publiceert een eigen, afwijkende telling ("as of 2025 … around *** active yards", cijfer achter paywall). Let op: dit telt **alleen commerciële nieuwbouwwerven met een actief orderboek**, niet reparatie-, naval- of kleine werven |
| Werven in Europa (context bij bovenstaande) | ~150 grote werven (civiel + naval + offshore), ~300 incl. kleinere yards | industriAll Europe / maritime-hub — relevant omdat het laat zien dat "180" géén totaaltelling van werven is |
| Werkgelegenheid scheepsbouw | ~1,1 mln direct (2022), ~70% in Azië; ~1,2 mln nu | zoeksnippets, zie §10 |
| Digital shipyard-markt | US$ 1,80 mrd (2025) → $4,30 mrd (2030), CAGR 19,0% | [MarketsandMarkets](https://www.marketsandmarkets.com/Market-Reports/digital-shipyard-market-6854923.html) |
| Idem, alternatief | US$ 2,06 mrd (2025) → $4,70 mrd (2030), CAGR 17,94% | [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/digital-shipyard-market) |
| EVM-software markt (wereldwijd, alle sectoren) | US$ 1,2 mrd (2024) tot US$ 2,7 mrd (2025) afhankelijk van bureau | [Verified Research Insights](https://www.verifiedresearchinsights.com/industry-report/earned-value-management-system-market/), [Verified Market Reports](https://www.verifiedmarketreports.com/product/earned-value-management-system-market/) |
| PPM-softwaremarkt wereldwijd | US$ 8,7 mrd (2024); top-10 leveranciers 60,5% aandeel | [Apps Run The World](https://www.appsruntheworld.com/top-10-project-portfolio-management-software-vendors-and-market-forecast/) |

### 5.2 Bottom-up berekening (SCHATTING)

**Deelmarkt 1 — Scheepsbouw en reparatie/MRO-werven**

Aannames (eigen, gemarkeerd als schatting):
- ~180 grote actieve nieuwbouwwerven (**Xclusiv Shipbrokers**, sept 2024 — niet Statista) + naval yards + grote reparatie-/conversiewerven → **~400 organisaties wereldwijd die commerciële planningssoftware licentiëren**.
  - **[KRITIEKE KANTTEKENING 2026-07-25]** De stap van 180 → 400 is een ongefundeerde verdubbeling-plus. Bij hercontrole blijkt Europa alléén al ~150 grote werven (civiel/naval/offshore) en ~300 inclusief kleinere yards te tellen (industriAll Europe / maritime-hub); de VS, China, Korea en Japan komen daar bovenop. De 180 van Xclusiv telt uitsluitend commerciële nieuwbouwwerven met actief orderboek. "400 licentiërende organisaties" is daarmee eerder een **ondergrens dan een middenwaarde** — maar hoeveel van die extra werven daadwerkelijk commerciële planningssoftware licentiëren (in plaats van alleen Excel) is niet vastgesteld. De gevoeligheid is lineair: 600 organisaties in plaats van 400 tilt deelmarkt 1 van ~$86 mln naar ~$129 mln en het segmenttotaal van ~$195 mln naar ~$238 mln.
- Per organisatie: **25 volwaardige planner-seats** (bij Meyer Turku ligt dit hoger — 150–200 systeem-updaters, waarvan een deel light-users) en **100 light-/viewer-/voortgangsseats**.
- Blended prijs volwaardig seat: **US$ 2.500/jaar** (mix van P6-subscriptie ~$3.300, Safran ~$1.800–3.000, Spider geamortiseerd ~$600–900 + support).
- Light seat: **US$ 400/jaar**.

Berekening CPM-laag:
- 400 × 25 = 10.000 volwaardige seats × $2.500 = **$25,0 mln/jaar**
- 400 × 100 = 40.000 light seats × $400 = **$16,0 mln/jaar**
- Subtotaal CPM-tools scheepsbouw: **~$41 mln/jaar**

Werf-specifieke planning (AVEVA ERM-planningsmodules, Siemens Opcenter/Tecnomatix, DELMIA, PERCEPTION, Floor2Plan, eigen MES-planning):
- ~150 werven met zo'n systeem × **$300.000/jaar** gemiddeld (licentie + onderhoud, planningsdeel toegerekend) = **~$45 mln/jaar**
- Subtotaal scheepsbouw: **~$86 mln/jaar aan software**

**Deelmarkt 2 — Offshore olie/gas en offshore wind constructie**

Aannames:
- ~600 organisaties met een substantieel project-controls-team: EPCIC-contractors, fabricageyards, operators, offshore-wind-ontwikkelaars en -installateurs, grote engineeringbureaus.
- Per organisatie: **30 volwaardige seats** (Aker Solutions had ~100 dagelijkse gebruikers op één project — dus dit is conservatief voor de top-20 en ruim voor de staart) en **120 light seats**.
- Volwaardig seat blended: **US$ 3.000/jaar** (offshore koopt vaker de duurdere EPPM/Safran-configuraties + risicomodules).
- Light seat: **US$ 500/jaar**.

Berekening:
- 600 × 30 = 18.000 seats × $3.000 = **$54,0 mln/jaar**
- 600 × 120 = 72.000 light seats × $500 = **$36,0 mln/jaar**
- Risico-/schemakwaliteitstools (Safran Risk, Acumen Fuse, Primavera Risk Analysis) ≈ 20% opslag = **~$18 mln/jaar**
- Subtotaal offshore: **~$108 mln/jaar aan software**

**Totaal segment (SCHATTING, 2025):**
- Software (licenties + onderhoud/subscriptie): **~US$ 195 miljoen**, met een onzekerheidsband van **US$ 150 – 280 miljoen**.
- Inclusief implementatie, integratie, training en project-controls-consultancy (factor 1,5–2,5×): **US$ 450 – 650 miljoen per jaar**.

### 5.3 Top-down kruiscontrole

- De wereldwijde PPM-softwaremarkt was **$8,7 mrd in 2024** ([Apps Run The World](https://www.appsruntheworld.com/top-10-project-portfolio-management-software-vendors-and-market-forecast/)). Het echte "project controls / CPM / EVM"-deel daarvan ligt in de orde van **$1,5 – 2,5 mrd**, consistent met de EVM-softwareramingen van $1,2–2,7 mrd ([Verified Research Insights](https://www.verifiedresearchinsights.com/industry-report/earned-value-management-system-market/), [Verified Market Reports](https://www.verifiedmarketreports.com/product/earned-value-management-system-market/)).
- Scheepsbouw + offshore vertegenwoordigt naar schatting **10–15%** van de gebruikersbasis van serieuze project-controls-software (bovengemiddelde intensiteit per euro capex, want dit zijn de zwaarst gereguleerde en meest schema-kritische projecten die er zijn).
- 10–15% van $1,5–2,5 mrd = **$150 – 375 miljoen**.

De bottom-up ($150–280 mln) en top-down ($150–375 mln) banden overlappen, wat de schatting van **~$195 miljoen software / ~$450–650 miljoen inclusief diensten** ondersteunt. **Beide zijn eigen schattingen; er is geen analistenrapport gevonden dat "planningssoftware voor scheepsbouw en offshore" als apart segment kwantificeert.**

> **[METHODOLOGISCHE WAARSCHUWING, toegevoegd 25-07-2026]** De rekensom van §5.3 klopt (10% × $1,5 mrd = $150 mln; 15% × $2,5 mrd = $375 mln), maar dit is **geen onafhankelijke kruiscontrole**. Twee van de drie ingaande grootheden zijn zelf schattingen van dezelfde auteur: (a) het "echte project-controls-deel" van de PPM-markt ($1,5–2,5 mrd) is niet aan een bron ontleend maar afgeleid, en (b) het aandeel scheepsbouw+offshore (10–15%) is eveneens een aanname. Alleen de PPM-basis van $8,7 mrd (2024) is extern geverifieerd ([Apps Run The World](https://www.appsruntheworld.com/top-10-project-portfolio-management-software-vendors-and-market-forecast/) — zij noemen op dezelfde pagina overigens zowel $8,7 mrd als $8,8 mrd voor 2024). Een band van $150–375 mln is bovendien zó breed dat "overlap" met $150–280 mln bijna niet uit kan blijven; de overlap bevestigt de bottom-up nauwelijks. Behandel de $195 mln als een orde-van-grootte-indicatie, niet als een geraamd marktcijfer.

Voegt men de bredere werf-ERP/MES/digital-shipyard-markt toe ($1,8–2,1 mrd in 2025), dan zit de planningsfunctionaliteit daar deels in verstopt; de bovengrens van "alles wat met werfplanning te maken heeft" ligt dan richting **$0,8–1,0 mrd**. **[ONZEKER]** Voor die $0,8–1,0 mrd is in het oorspronkelijke rapport geen berekening gegeven; hij is reconstrueerbaar als ~$195 mln planningssoftware + grofweg 30–40% van de digital-shipyard-markt, maar dat aandeel is nergens onderbouwd. Beschouw dit getal als illustratief.

### 5.4 Groeirichting

**Positief:**
- Orderboek op 17-jaarshoogte (204 mrd USD contractwaarde 2024, 173,91 mln CGT orderboek) → meer gelijktijdige projecten per werf → meer planningslast per werf ([HD IN Research](https://www.hdinresearch.com/news/779), [SunSirs](https://www.sunsirs.com/commodity-news/petail-29602.html)).
- Naval opbouw in VS, EU en Azië, met EVMS-verplichting als aanjager; de VS heeft aantoonbaar een systemisch probleem dat om betere planning vraagt ([GAO-25-108136](https://www.gao.gov/products/gao-25-108136)).
- Digital shipyard groeit met **18–19% CAGR** ([MarketsandMarkets](https://www.marketsandmarkets.com/Market-Reports/digital-shipyard-market-6854923.html), [Mordor](https://www.mordorintelligence.com/industry-reports/digital-shipyard-market)) — de planningslaag lift daarop mee.
- Arbeidstekort maakt resource-optimalisatie economisch dwingender. **[ONZEKER — hercontrole 25-07-2026]** Het eerder genoemde "**15% wereldwijd tekort** aan skilled maritime workers" is bij hernieuwde controle **niet reproduceerbaar**: er is geen vindbare primaire bron (branche-organisatie, ILO/IMO, SEA Europe) die dit percentage geeft. Het kwam uit een secundaire snippet (Ship Universe / WorldMetrics). De richting van het argument (structureel tekort aan lassers, pijpfitters en elektromonteurs in Europese en Amerikaanse werven) is breed gedocumenteerd, het **percentage niet**. Niet als cijfer gebruiken.

**Negatief / vlak:**
- Offshore olie/gas-EPC groeit nauwelijks: **+1% in 2025** ([Westwood](https://www.westwoodenergy.com/news/westwood-insight-offshore-epc-contracting-activity-to-remain-buoyant-in-2025)) — letterlijk: *"a marginal 1% YoY increase, totalling US$54 billion"*. **Let op (geverifieerd 25-07-2026):** de in §5.1 geciteerde reeks "$52 mrd (2024) → $54 mrd (2025)" impliceert rekenkundig +3,8%, niet +1%. Beide getallen komen uit hetzelfde Westwood-stuk; het verschil komt uit afronding aan de bron ($52 mrd is "approximately", de werkelijke 2024-basis ligt dan rond $53,5 mrd). Gebruik **+1%** als het richtinggevende cijfer, niet de deling van de twee afgeronde bedragen.
- Offshore wind zit in een correctie: **~$100 mrd capex** aan vertraagde/geannuleerde projecten in twee jaar (zoeksnippet, zie §10).
- Consolidatie bij leveranciers drukt de prijsdynamiek niet omlaag: Safran werd in 2021 overgenomen door **JDM Technology Group** ([JDM](https://jdmtechnologygroup.com/risk-assessment-and-project-management-software-maker-safran-acquired-by-jdm-technology-group/)), een roll-up van bouw-/projectsoftware.

**SCHATTING groei segment:** klassieke CPM-tools **3–6% per jaar**; werf-APS/MES-planning **12–18% per jaar**; het gecombineerde segment **6–9% per jaar** tot 2030.

---

## 6. Sector-specifieke eisen en standaarden

### 6.1 EVMS / ANSI-EIA-748

- Verplicht bij Amerikaanse defensiecontracten vanaf **$20 miljoen**; formele compliance-review vanaf **$100 miljoen** (verhoogd van $50M door DoD Class Deviation 2015-O0017, DFARS 234.201(1)(ii)). **[BEVESTIGD, met nuance — 25-07-2026]** De gecodificeerde DFARS-tekst op acquisition.gov luidt nog steeds: EIA-748-conform EVMS bij *"cost or incentive contracts and subcontracts valued at $20,000,000 or more"* en agency-gevalideerde compliance bij *"$50,000,000 or more"*. De $100M geldt via de nog steeds vigerende class deviation, niet via de basistekst. Beide getallen zijn dus juist, maar wie de DFARS zelf naslaat vindt $50M — dat verschil moet je in een verkoopgesprek kunnen uitleggen.
- Relevante clausules: **DFARS 252.234-7001** (notice), **252.234-7002** (EVMS), **252.242-7005** (contractor business systems). Het EVMS geldt als *"a contractor business system as defined by DFARS 242.7000"*.
- Voor scheepsbouw specifiek: **SUPSHIP** heeft *"responsibility and authority to conduct EVMS ongoing compliance activities"*, in coördinatie met **DCMA** en **NAVSEA HQ**.
- Doorwerking naar onderaannemers: prime is verantwoordelijk voor naleving door geselecteerde onderaannemers.
- Praktische consequentie voor tooling: het schema moet resource- en kostengeladen zijn, met een gecontroleerde baseline (PMB), formele change control, en periodieke, herleidbare statusmomenten. Dat is precies waarom pure Gantt-tools hier afvallen.
- (Aanvulling, **niet direct bevestigd in de gevonden bronnen**: de DoD-dataleverantie heet tegenwoordig **IPMDAR** — Integrated Program Management Data and Analysis Report — en vereist zowel kostendata als het *native schedulebestand*. Dit is algemeen bekende praktijk maar is binnen dit onderzoek niet met een primaire bron geverifieerd.)

### 6.2 DCMA 14-point schedule assessment

De feitelijke kwaliteitspoort voor elk schema dat naar een defensie- of grote industriële opdrachtgever gaat. Drempels ([CDM Suite](https://cdmsuite.com/insights/dcma-14-point-schedule-assessment)):

| # | Check | Drempel |
|---|---|---|
| 1 | Logic (ontbrekende voorgangers/opvolgers) | < 5% |
| 2 | Leads (negatieve lags) | 0% |
| 3 | Lags (positieve lags) | < 5% |
| 4 | Relatietypes (niet-FS) | < 10% |
| 5 | Hard constraints | < 5% |
| 6 | High float (> 44 werkdagen) | < 5% |
| 7 | Negative float | 0% |
| 8 | High duration (> 44 werkdagen) | < 5% |
| 9 | Invalid dates | 0% |
| 10 | Resources (niet toegewezen bij resource-loaded schema) | < 10% |
| 11 | **Missed Tasks** (taken die de baseline-einddatum misten) | ≤ 5% |
| 12 | Critical path test | doorlopend kritiek pad vereist |
| 13 | Critical Path Length Index (CPLI) | ≥ 0,95 |
| 14 | Baseline Execution Index (BEI) | ≥ 0,95 |

**[GECORRIGEERD 2026-07-25]** Rijen 11 en 14 stonden eerder allebei op "BEI ≥ 0,95". Dat is een fout die uit de gebruikte secundaire bron (CDM Suite) is overgenomen: die noemt check 11 "Missed Activities (BEI)". In de canonieke DCMA-14-lijst is **check 11 = Missed Tasks met drempel ≤ 5%** (aantal gemiste taken gedeeld door het baseline-aantal); BEI is uitsluitend check 14. Zie §11.

Herkomst is defensie, maar *"it's now widely used in capital projects, infrastructure, energy, and commercial construction"* — ook zonder contractuele verplichting wordt er naar verwezen in schemaspecificaties ([CDM Suite](https://cdmsuite.com/insights/dcma-14-point-schedule-assessment)). Kritische kanttekening uit de vakwereld: de toets *"validates structure"* maar *"cannot validate truth"* ([Peveka Solutions](https://www.pevekasolutions.com/insights/dcma-14-point-assessment-explained)).

### 6.3 AACE International recommended practices

- **29R-03 Forensic Schedule Analysis** — het referentiekader voor retrospectieve vertragingsanalyse, met negen Method Implementation Protocols ([AACE, inhoudsopgave PDF](https://web.aacei.org/docs/default-source/toc/toc_29r-03.pdf)).
- **52R-06 Prospective Time Impact Analysis** — vooruitkijkende impactanalyse van ongeplande gebeurtenissen ([AACE, PDF](https://web.aacei.org/docs/default-source/toc/toc_52r-06.pdf)).
- Aanvullend gebruikelijk: schema-niveaus (Level 1 t/m 5) als contractueel rapportagekader. (Binnen dit onderzoek is geen scheepsbouw-specifieke bron voor de niveau-definities gevonden; dit is gangbare sectorpraktijk maar niet hier geverifieerd.)
- De SCL Delay & Disruption Protocol wordt in offshore-contracten (FIDIC-, LOGIC-achtige regimes) veel geciteerd; ook dit is sectorpraktijk zonder directe bron in dit onderzoek.

### 6.4 Verplichte leveringsformaten

- **XER** is de facto uitwisselingsformaat. Bewijs uit de tooling-ecosystemen: InEight beschrijft *"XER (file extension used by Primavera containing project file related data) import functionality allows the milestones and schedule dates to be integrated"* ([InEight](https://learn.ineight.com/Control/Content/4-Scheduling/)); Safran Risk adverteert expliciet *"Oracle P6/.XER compatibility"* ([safran.com](https://www.safran.com/)); overheidstoolkits leveren P6-templates ([Mass.gov Contractor Schedule Toolkit](https://www.mass.gov/doc/contractor-schedule-toolkitcst-guidance-20/)).
- **P6 XML** en **MPP/MSPDI** komen daarnaast voor; UN/CEFACT of open standaarden bestaan niet in deze rol.
- **Consequentie:** elke nieuwe planningstool die niet foutloos XER kan lezen én schrijven is contractueel onbruikbaar in deze sector. Dit is de belangrijkste toetredingsdrempel.

### 6.5 Sector-eigen coderings- en datastandaarden

- **SFI Group System** — de scheepsbouw-eigen functionele classificatie, ontstaan in 1972 bij het Noorse Skipsteknisk Forskningsinstitutt, nu beheerd door SpecTec, met **meer dan 6.000 installaties** wereldwijd. Driecijferig decimaal, acht hoofdgroepen (1 t/m 8), uitbreidbaar tot zescijferige detailcodes ([HandWiki](https://handwiki.org/wiki/SFI_Coding_and_Classification_System), [sfi.codes](https://sfi.codes/)). **[DEELS BEVESTIGD 25-07-2026]** De structuur is direct op sfi.codes geverifieerd: *"Eight main groups (1–8), each divided into groups, sub-groups and detail codes"*, met hoofdgroep = 1 cijfer, groep = 2, subgroep = 3 en detail in `xxx.xxx`-formaat. De **herkomstclaims (1972, Skipsteknisk Forskningsinstitutt, beheer door SpecTec, ">6.000 installaties") zijn in deze controleronde niet op een primaire bron bevestigd** — sfi.codes noemt ze niet. Behandel het installatiegetal als onzeker. Codes fungeren als *"technical account (cost center)"* gekoppeld aan inkooporders en financiële registraties. **Cruciale nuance voor tooling:** *"Shipyards supplement SFI with internal Work Breakdown Structures (WBS) for production control"* — SFI is een *functionele* structuur, niet een *productie*-WBS. Werven moeten dus minstens twee coderingsassen naast elkaar kunnen voeren.
- **OCX (Open Class 3D Exchange)** — neutrale XML-standaard voor uitwisseling van 3D-scheepsmodellen met klassenbureaus, voortgekomen uit een DNV Joint Industry Project (2016). Partners onder meer Damen Shipyards, DNV, NAPA, Dassault Systèmes en AITAC; beheerd door een onafhankelijk OCX-consortium ([3docx.org](https://www.3docx.org/) — homepage gaf tijdens onderzoek een 404; informatie via zoeksnippets).
- **IFC 4.3** — dekt **havens en waterwegen**, niet scheepsrompen. buildingSMART's *IFC for Ports & Waterways* breidt IFC uit naar het maritieme domein ([buildingSMART](https://www.buildingsmart.org/standards/domains/infrastructure/ifc-for-ports-waterways/)); de release van **IFC 4.3 ADD2** nam formeel haven- en waterweginfrastructuur op ([ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0029801826011510)); **[GECORRIGEERD/ONZEKER 25-07-2026]** de eerder genoemde datum "september 2023" is niet onafhankelijk te bevestigen. Wat wél vaststaat: de huidige officiële versie is **IFC4.3.2.0**, door ISO geratificeerd op **4 januari 2024** en formeel gepubliceerd als **ISO 16739-1:2024** op **2 april 2024** (buildingSMART International). Gebruik die data; het schema `IfcPortsAndWaterwaysDomain` is publiek ([GitHub](https://github.com/buildingSMART/IFC4.3.x-development/blob/master//docs/schemas/domain/IfcPortsAndWaterwaysDomain/README.md)). Er is een nieuw **buildingSMART Maritime-domein** dat voortbouwt op dat schema, *"ensuring seamless data flow from quayside to offshore assets"* (LinkedIn-aankondiging, zie §10).
- **ISO 10303 (STEP) AP215/216/218** — historische scheepsbouw-STEP-protocollen; binnen dit onderzoek niet met een primaire bron bevestigd, en in de praktijk grotendeels verdrongen door OCX en leverancierseigen formaten.

### 6.6 Audits, claims en forensische analyse

- Werven en offshore-contractors leggen periodieke, contemporaine schema-snapshots vast, omdat vertragingsanalyse retrospectief het kritieke pad moet reconstrueren: *"A forensic schedule analysis examines the contemporaneous project record ... to identify the critical drivers of delay"* ([Precision Scheduling Consultants](https://www.precisionschedulingconsultants.com/construction-delay-claims-forensic-analysis/)).
- In offshore wind zijn CPM-analyses al bepalend geweest bij aansprakelijkheidsverdeling: *"Critical Path Method analysis was used to apportion responsibility"* bij late nacelle- en bladleveringen ([Law Gratis](https://www.lawgratis.com/blog-detail/disputes-over-delayed-commissioning-of-offshore-wind-platforms)).
- Praktijkvoorbeeld: een offshore windpark met vertragingen door *"supply chain disruptions, extreme weather conditions, and unforeseen technical challenges"* ([DAC Consulting](https://www.dac-consultingservices.co.uk/case-study/resolving-critical-delays-in-an-offshore-wind-farm-project)).
- **Toolvereiste die hieruit volgt:** onveranderlijke periode-snapshots, volledige audit trail van logica- en duurwijzigingen, en de mogelijkheid om elk historisch schema exact te herberekenen. Tools die alleen "de huidige stand" bewaren zijn juridisch waardeloos.

---

## 7. Voor- en nadelen van de gebruikte pakketten in déze sectorcontext

### Oracle Primavera P6
**Voordelen hier:** XER is de contracttaal, dus P6 is per definitie interoperabel met opdrachtgever en onderaannemers; schaalt naar tienduizenden activiteiten; volwassen EVM-ondersteuning (Oracle documenteert EVM expliciet: [Oracle Help](https://docs.oracle.com/cd/F88968_01/English/User_Guides/p6_pro_user/earned_value.htm)); multi-project met gedeelde resourcepools; enorme arbeidsmarkt aan geschoolde planners; alle assurance-tools (Acumen, ScheduleReader, ScheduleLens) lezen het.
**Nadelen hier:**
- **Resource-nivellering is zwak.** De sector heeft multi-skill, materiaal- en ruimtebeperkte nivellering nodig; P6 biedt priority-based leveling zonder productiviteitsmodel of materiaalbeperkingen. Spider Project positioneert zich hier expliciet tegenover en toont in vergelijkende tests kortere haalbare schema's ([Wikipedia](https://en.wikipedia.org/wiki/Spider_Project), [spiderproject.pro](https://www.spiderproject.pro/en/spider-project/)).
- **Geen ruimte-/laydown-modellering.** Blok-laydown, kraanbereik en dokbezetting zijn niet te modelleren; dat gebeurt in Tecnomatix of Excel.
- **Slecht passend op repetitieve productie.** LOB/takt is passender voor paneellijn en sectiebouw dan CPM.
- **Kosten en UX.** *"Oracle's enterprise licenses for P6 can run into the thousands of dollars per user, and the interface has a reputation as dense and old-fashioned"*; *"Primavera P6 costs $3,000+/year and takes weeks to learn"* (zoeksnippets over P6-alternatieven, zie §10). Een planningsverantwoordelijke van een $600M-aannemer wordt geciteerd met *"I've been using Primavera P6 for years. And I'm done with it"*.
- **Geen model-koppeling.** Geen native link naar 3D-engineeringmetadata; 4D vereist Synchro of Navisworks als extra laag ([Bentley SYNCHRO](https://bentleysystems.service-now.com/community), [Deltime](https://deltime.co.uk/service-bim-navisworks.html)).

### Safran Project / Safran Risk
**Voordelen hier:** ontworpen in en voor de Noordzee-offshore; geïntegreerd schema + kosten + resources + risico in één datamodel, zodat een what-if direct kostengevolgen toont; sterk in **interfacemanagement** tussen disciplines en contractors, precies het probleem van EPC-projecten ([Aker Solutions case](https://www.safran.com/case-studies/aker-solutions)); resourcemanagement en salesproject-simulaties in dezelfde tool, wat werven met meerdere gelijktijdige offertes nodig hebben ([Meyer Turku case](https://www.safran.com/case-studies/meyer-turku)); Safran Risk claimt Monte Carlo *"97% faster than OPRA (Pertmaster)"* en biedt P6/XER-compatibiliteit ([safran.com](https://www.safran.com/)); consolideert heterogene onderaannemersschema's ([Fosen Yard case](https://www.safran.com/case-studies/fosen-yard)).
**Nadelen hier:**
- Veel kleinere installed base en arbeidsmarkt buiten Scandinavië; opdrachtgevers eisen alsnog XER-deliverables, dus er blijft een conversiestap.
- Ecosysteem van derde-partij-tools is dun vergeleken met P6.
- Nog steeds een klassieke CPM-engine: geen ruimte-/laydown-constraints, geen productiviteitsgedreven duurberekening, geen LOB/takt.
- Eigendom bij een private-equity-achtige roll-up (JDM Technology Group sinds 2021, [bron](https://jdmtechnologygroup.com/risk-assessment-and-project-management-software-maker-safran-acquired-by-jdm-technology-group/)) — voor sommige inkopers een leveranciersrisico.
- Fosen Yard geeft zelf aan de functionaliteit *"not yet fully utilized"* te hebben — indicatie van een steile adoptiecurve ([Safran](https://www.safran.com/case-studies/fosen-yard)).

### Spider Project
**Voordelen hier:** technisch de beste match op het kernprobleem. Optimaliseert *"resource, cost, and material constrained schedules"*, berekent **Resource Critical Path** en haalbare resource-constrained floats, doet **skill scheduling** (automatische toewijzing op basis van skills, productiviteit, kosten, prioriteiten) en leidt **duren af uit gecombineerde resourceproductiviteit** in plaats van vaste duren — exact hoe een werf denkt (uren/ton, m² verf/dag). Materiaalbeperkingen vertragen activiteiten automatisch. Ondersteunt willekeurig veel kostencomponenten en parallelle budgetten. Officiële toepassingsdomeinen noemen **Shipbuilding** expliciet. Prijs is een fractie van P6: **$800 – $4.500 eeuwigdurend** ([spiderproject.pro](https://www.spiderproject.pro/en/spider-project/), [prijslijst](https://www.spiderproject.pro/en/price-list/), [Wikipedia](https://en.wikipedia.org/wiki/Spider_Project)).
**Nadelen hier:**
- **Geopolitiek onbruikbaar voor het westerse deel van de sector.** Ontwikkeld in Moskou; sterkste aanwezigheid in Rusland en Oekraïne ([Wikipedia](https://en.wikipedia.org/wiki/Spider_Project)). Voor naval yards, NAVSEA-contractors en Europese defensiewerven is dit een absolute blokkade. (Losstaand signaal van domeinrisico: `spiderproject.com` redirect tijdens dit onderzoek naar een niet-gerelateerd domein; de officiële site is `spiderproject.pro`.)
- Geen EVMS-erkenning of DCMA-ecosysteem in de VS/EU.
- Dun integratie- en trainingsecosysteem; beperkte XER-workflow-integratie met opdrachtgeversprocessen.
- UI en documentatie worden algemeen als gedateerd ervaren.

### SAP (ERP + PS / S/4HANA)
**Voordelen hier:** de financiële en materiaalruggengraat; koppelt inkoop, voorraad, uren en kosten aan projectstructuren; onmisbaar voor kostenzijde van EVM. SAP staat bovenaan in de ERP-lijst voor werven ([Floorganise](https://www.floorganise.com/knowledgebase/technology-knowledgebase/planning-tools-and-software/)). **[GECORRIGEERD 2026-07-25]** De claim "Meyer Group gebruikt SAP S/4 als strategisch projectplatform" is geschrapt — hij staat niet op de aangehaalde Safran/Meyer-pagina (zie §11). Wél gedocumenteerd: Safran biedt een "Integrator for SAP" en koppelt bij Meyer met systemen voor job orders, documentbeheer en tijdregistratie.
**Nadelen hier:** SAP PS is geen serieuze CPM-engine — geen volwaardige nivellering, geen risico-simulatie, geen forensisch schema-instrumentarium. Het patroon "ERP naast een aparte CPM-tool" is in de sector gangbaar; dubbele waarheid en synchronisatieproblemen zijn het gevolg. (Het specifieke voorbeeld Meyer = SAP + Safran is niet bronbevestigd.)

### AVEVA Enterprise Resource Management
**Voordelen hier:** dekt *"the entire ship design and production process, from initial project planning and material definition, through Bill of Materials management, procurement and logistics, to project and production planning and control"* ([AVEVA marine/shipbuilding via zoeksnippet](https://www.aveva.com/en/products/enterprise-resource-management/)); **Advanced Work Packaging / WorkPacks** koppelt 3D-model aan uitvoerbare werkpakketten; real-time materiaaltracking via barcode/RFID/QR; gerapporteerde effecten: **+25% projectproductiviteit, −10% total installed cost, 3–5% lagere materiaalkosten, 41% besparing op bidevaluatie** ([AVEVA](https://www.aveva.com/en/products/enterprise-resource-management/)). Case studies: Chantier Davie (*"concurrent multi-location design work, consolidated planning and materials management"*), Oceana Shipyard.
**Nadelen hier:** planning is werkpakket-georiënteerd, geen contractueel CPM-schema; sterke koppeling aan de AVEVA-stack (E3D) en dus lock-in; zware, langdurige implementaties; geen publieke prijzen.

### Siemens (Teamcenter / Opcenter APS / Tecnomatix Plant Simulation)
**Voordelen hier:** dit is de enige stack die het *fysieke* werfprobleem echt modelleert. Plant Simulation optimaliseert *"material flow, resource and space utilization as well as the logistics for all levels of the shipyard from scheduling individual welding activities up to the complete ship assembly"*, met kraanbezetting, laydown en blokplaatsing. Harde referentiecijfers uit de factsheet: **doorlooptijd 60 → 52 dagen (−14%)** en **directe arbeid op de paneellijn 8.280 → 6.600 uur (−20%)**. Referentieklanten: **Aker Yards, Flensburger Schiffbau-Gesellschaft, Meyer Werft Papenburg, ThyssenKrupp Marine Systems (Blohm+Voss, Nordseewerke Emden, Kockums), Volkswerft Stralsund, Center of Maritime Technologies** ([Siemens factsheet](https://sisinc.org/wp-content/uploads/2026/03/Siemens-SW-Plant-Simulation-for-Shipyards-Fact-Sheet.pdf)). Digital-shipyard-referenties: **Hyundai Heavy Industries** (*"first digital shipyard environment"*), Fincantieri, DSME ([Siemens](https://www.siemens.com/en-us/digital-thread/smart-manufacturing/ship-construction/)); recente HD Hyundai AI-samenwerking ([Siemens newsroom](https://news.siemens.com/en-us/siemens-hd-hyundai-ai-digital-shipyard-us-shipbuilding/)); Plant Simulation verkortte lead-time-generatie met 2,6% bij HD Hyundai Mipo ([Siemens Tecnomatix blog](https://blogs.sw.siemens.com/tecnomatix/)).
**Nadelen hier:** het is een simulatie-/MOM-tool, geen contractschema — het produceert geen XER, geen EVM-baseline en geen claimdossier. Vereist gespecialiseerde simulatiemodelleurs. Kostbaar en niet zelfbedienend voor planners.

### Dassault Systèmes 3DEXPERIENCE / DELMIA
**Voordelen hier:** naadloos met CATIA/PLM voor werven die daar al op zitten (Naval Group, CMN, Piriou, Socarenam via 3DEXPERIENCE, [bron](https://www.ctengineeringgroup.com/)); dedicated *Shipyard Production Scheduling & Optimization*; APS voor werkplaatsspecifieke eisen ([3DS DELMIA](https://www.3ds.com/products/delmia/supply-chain-planning-optimization/advanced-planning-scheduling)).
**Nadelen hier:** maximale platform-lock-in; hoge kosten; opnieuw geen contractueel CPM-deliverable; alleen zinvol als de hele engineering al op 3DEXPERIENCE draait.

### SPAR Associates PERCEPTION
**Voordelen hier:** werf-native van oorsprong (sinds 1972), integreert **raming, planning, arbeid, materiaal en onderaanneming voor nieuwbouw én reparatie** in één model — precies de scheepsbouw-logica van uren per ton en per interim-product ([sparusa.com](https://www.sparusa.com/), [handleiding](https://manualzz.com/manual/en/Spar/Perception/User+manual)).
**Nadelen hier:** kleine leverancier met legacy-technologie; vrijwel uitsluitend Noord-Amerikaanse installed base; de bedrijfssite was tijdens dit onderzoek onbereikbaar (503), wat de leveranciersrisicovraag onderstreept.

### Floorganise Floor2Plan
**Voordelen hier:** vult exact het gat tussen contractplanning en de vloer: combineert **MES + MOM + APS** met tijdregistratie, shopfloor-control en projectcontrol in één systeem; integreert met ERP, MRP, PDM **en Primavera P6** (dus complementair, niet vervangend); geclaimd effect **15% reductie in doorlooptijd en arbeidsuren** ([Floorganise](https://www.floorganise.com/our-technology/)). Bewezen in het NSRP-project met Fincantieri Bay Shipbuilding, Austal USA en Philly Shipyard ([NSRP eindrapport](https://www.nsrp.org/wp-content/uploads/2024/06/PP21-ADP_Earned-Value-Final-Report.pdf)).
**Nadelen hier:** kleine Nederlandse leverancier (concentratierisico); geen publieke prijzen; nog beperkte referentiebasis buiten de NSRP-deelnemers.

### MS Project / Excel
**Voordelen hier:** overal aanwezig, gratis-aan-de-marge, iedereen kan het lezen, past bij de manier waarop bouwbazen daadwerkelijk plannen.
**Nadelen hier:** geen enterprise-schaal, geen auditspoor, geen EVM, geen nivellering, geen consolidatie. Het is de directe oorzaak van de fragmentatie die zowel NSRP als Floorganise als hoofdprobleem benoemen.

---

## 8. Openingen: waar zijn gebruikers ontevreden en waar zitten de gaten

### 8.1 Gedocumenteerde ontevredenheid

1. **Fragmentatie is het hoofdprobleem, niet functionaliteit.** NSRP: werven gebruiken *"a variety of commercially available scheduling software, spreadsheets, databases, and home-grown legacy systems, many of which require extensive manual data input"* ([NSRP](https://www.nsrp.org/wp-content/uploads/2024/06/PP21-ADP_Earned-Value-Final-Report.pdf)). Sectoranalyse: *"Many shipyards still operate with fragmented planning tools, Excel spreadsheets, or legacy systems that weren't built for the realities of large-scale, high-complexity shipbuilding"*, met als gevolg *"delayed handovers between departments, poor visibility into floor execution progress, inaccurate schedules, and limited integration between engineering, planning, and manufacturing"* (zoeksnippet, zie §10).
2. **Handmatige data-invoer.** De hele businesscase van het NSRP-project was het wegnemen van handmatig herintikken van engineeringdata in planningssystemen.
3. **Kosten en leercurve van P6.** *"$3,000+/year and takes weeks to learn"*; interface *"dense and old-fashioned"* (zoeksnippets, zie §10).
4. **Nivellering die niet doet wat de werf nodig heeft** — de reden dat een Russisch nicheproduct al dertig jaar overleeft.
5. **Schema-kwaliteitstoetsen zijn een aparte, betaalde laag.** Werven en EPC's kopen Acumen Fuse ($75/user/maand) om te doen wat een planner eigenlijk in zijn eigen tool zou moeten zien.
6. **Systemisch falen aan de top van de markt.** GAO over 20 jaar Navy-scheepsbouw: *"consistently resulted in cost growth, delivery delays, and ships that do not perform as expected"*; van 90 GAO-aanbevelingen sinds 2015 zijn er slechts 30 (deels) opgevolgd ([GAO-25-108136](https://www.gao.gov/products/gao-25-108136)). Dit is geen tekort aan software, maar het bewijst dat de huidige toolketen de belofte niet waarmaakt.

### 8.2 Concrete gaten waar een open-source, IFC-/modelgebaseerde planner in past

| # | Gat | Waarom het een opening is | Onderbouwing |
|---|---|---|---|
| 1 | **Model-gedreven activiteitsgeneratie** | Het NSRP-project bewees dat gewicht, oppervlak, volume en lengte uit het 3D-model automatisch betere activiteiten, duren en budgetten opleveren: *"Using weight and surface area improved our automated project plans, making the activities better reflect actual time and budget needs."* Precies wat een IFC-lezende planner van nature kan. | [NSRP](https://www.nsrp.org/wp-content/uploads/2024/06/PP21-ADP_Earned-Value-Final-Report.pdf) |
| 2 | **Gratis licht-/onderaannemerszitplaatsen** | De grootste kostenpost is niet de planner maar de honderden mensen die moeten lezen en voortgang melden. Werven vallen daarom terug op Excel. Een open-source tool met dezelfde datastructuur elimineert die seat-belasting volledig. | [Floorganise](https://www.floorganise.com/knowledgebase/technology-knowledgebase/planning-tools-and-software/); [Meyer: 150–200 updaters](https://www.safran.com/case-studies/meyer-turku) |
| 3 | **Serieuze resource-nivellering zonder geopolitiek risico** | Spider is technisch superieur maar voor westerse defensie- en cruisewerven onbruikbaar. Er is geen westers alternatief met productiviteitsgedreven duren, skill-scheduling en materiaalbeperkingen. | [Wikipedia Spider](https://en.wikipedia.org/wiki/Spider_Project); [spiderproject.pro](https://www.spiderproject.pro/en/spider-project/) |
| 4 | **Ruimte/laydown als eersteklas resource** | Uitgebreide academische literatuur, geen mainstreamproduct. Alleen Siemens Plant Simulation doet het, en dat is geen planningstool. Een planner die "oppervlakte" en "kraanbereik" als resourcetype kent, is uniek. | [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0360835215002296); [Wiley](https://onlinelibrary.wiley.com/doi/10.1155/2017/1923646); [Siemens factsheet](https://sisinc.org/wp-content/uploads/2026/03/Siemens-SW-Plant-Simulation-for-Shipyards-Fact-Sheet.pdf) |
| 5 | **Ingebouwde DCMA-14 en EIA-748-conformiteit** | Wat nu een aparte $900/jaar-tool is (Acumen Fuse), kan gratis meegeleverd worden. Directe, meetbare besparing en een sterk verkoopargument bij opdrachtgevers-assurance. | [CDM Suite](https://cdmsuite.com/insights/dcma-14-point-schedule-assessment); [ITQlick Acumen](https://www.itqlick.com/acumen/pricing) |
| 6 | **Auditeerbaarheid en claim-bewijskracht** | Forensische analyse vereist contemporaine records en herberekenbaarheid. Open source = inspecteerbare rekenkern; een arbiter kan het CPM-algoritme zelf verifiëren. Dat is een argument dat geen commerciële leverancier kan geven. | [Precision Scheduling Consultants](https://www.precisionschedulingconsultants.com/construction-delay-claims-forensic-analysis/); [AACE 29R-03](https://web.aacei.org/docs/default-source/toc/toc_29r-03.pdf) |
| 7 | **Soevereiniteit voor naval yards** | Defensiewerven willen on-premise, air-gapped, geen cloud-telemetrie, en source-inzage. Alle grote commerciële pakketten bewegen richting cloud. Open source is hier structureel in het voordeel. | GAO-context ([GAO-25-108136](https://www.gao.gov/products/gao-25-108136)); DFARS-eisen |
| 8 | **SFI als eersteklas coderingsas** | Werven moeten SFI (functioneel) én productie-WBS naast elkaar voeren; mainstream-tools bieden alleen generieke activity codes. Native ondersteuning voor SFI + interim-producten + blok/zone/systeem-assen is direct herkenbaar sectorvoordeel. | [HandWiki SFI](https://handwiki.org/wiki/SFI_Coding_and_Classification_System); [sfi.codes](https://sfi.codes/) |
| 9 | **Weer- en kalendermodellering voor offshore** | Weather-window-modellering zit nu in aparte tools (ESOX, SEASTATES, Spinergie); de koppeling naar het CPM-schema is handwerk. Een planner met probabilistische, seizoensgebonden kalenders per activiteitstype vult dat gat. | [ESOX/LAUTEC](https://esox.lautec.com); [ABPmer SEASTATES](https://www.seastates.net/weather-downtime-express); [Spinergie](https://www.spinergie.com/blog/reducing-the-risk-of-weather-related-delays-with-spinergies-downtime-model) |
| 10 | **LOB/takt naast CPM** | De repetitieve delen van werfwerk (paneellijn, secties, spools, kabels) vragen om tempo-planning; geen van de grote pakketten combineert CPM en LOB in één model. | Linear Scheduling-literatuur (zoeksnippets, zie §10) |

### 8.3 Eerlijke tegenwerpingen (waar de IFC-hoek wringt)

1. **IFC dekt geen scheepsrompen.** IFC 4.3 ADD2 dekt havens en waterwegen, niet schepen ([buildingSMART](https://www.buildingsmart.org/standards/domains/infrastructure/ifc-for-ports-waterways/); [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0029801826011510)). Voor rompstructuur is **OCX** de opkomende standaard. Een IFC-gebaseerde planner is daarom *sterk* voor: offshore-substations en converterstations, jackets en funderingen, topsides met leidingwerk, havens/kades/dokken, en werfinfrastructuur — en *zwak* voor de romp zelf, tenzij er een OCX-brug bij komt. Het nieuwe buildingSMART Maritime-domein en de belofte van dataflow *"from quayside to offshore assets"* maken die brug op termijn plausibel.
2. **XER is een harde toetredingsdrempel.** Zonder betrouwbare XER-import én -export is de tool contractueel onbruikbaar in offshore-EPC. Dit moet dag-1-functionaliteit zijn, geen roadmap-item.
3. **EVMS-certificering is een organisatie-eigenschap, geen tool-eigenschap** — maar de tool moet wel alle EIA-748-vereiste data-elementen kunnen dragen en de IPMDAR-achtige leveringen kunnen voeden. Zonder dat valt de hele Amerikaanse defensiescheepsbouw af.
4. **De sector is conservatief en risico-avers.** Op een project waar één dag $42.500 kost, is "nieuw en gratis" geen argument; "auditeerbaar, gecertificeerd en met een supportcontract" wel. Een open-source product heeft hier een commercieel supportkanaal nodig om überhaupt in aanmerking te komen.
5. **De grote werven kopen geen losse planners meer, ze kopen stacks.** De concurrentie is niet P6 alleen, maar Siemens/AVEVA/Dassault die planning meeleveren binnen een digital-shipyard-contract. Instappunt is daarom eerder de middelgrote werf, het engineeringbureau en de onderaannemer dan HD Hyundai.

---

## 9. Aanbevolen positionering (afgeleid, SCHATTING)

Als open-source, IFC-gebaseerde planner in deze sector:
1. **Begin bij offshore-constructie, niet bij de romp.** Substations, funderingen, jackets, topsides, kades, dokken — daar is IFC 4.3 al toepasselijk en is de planningsintensiteit het hoogst per euro.
2. **XER-in/uit als eerste feature na de kern.** Zonder dat bestaat de tool contractueel niet.
3. **Nivellering als differentiator, niet Gantt-cosmetica.** Multi-skill, productiviteitsgedreven duren, materiaalbeperkingen en oppervlakte-als-resource. Dat is het gat dat P6 en Safran allebei laten liggen en dat alleen Spider vult — met een leverancier die de halve markt niet mag gebruiken.
4. **DCMA-14 en EVM ingebouwd en gratis.** Direct meetbare vervanging van een betaalde tool.
5. **Onbeperkte gratis lees-/voortgangsgebruikers.** Dat is precies waar de betalingsbereidheid laag is en waar Excel nu wint.
6. **Verdienmodel via support, integratie en certificeringsondersteuning**, niet via seats — dat is het enige model dat past bij een sector die hoge bereidheid heeft om te betalen voor zekerheid en lage bereidheid om te betalen voor stoelen.

---

## 10. Bronnenlijst

### Leveranciers (primair)
- Safran Software Solutions — bedrijfs- en productoverzicht: https://www.safran.com/
- Safran — case study Meyer Turku / Aker Finnyards: https://www.safran.com/case-studies/meyer-turku
- Safran — case study Aker Solutions (Kristin, Aker Stord): https://www.safran.com/case-studies/aker-solutions
- Safran — case study Aibel (offshore wind converterstations): https://www.safran.com/case-studies/aibel-powers-shift-to-wind-energy
- Safran — case study Fosen Yard: https://www.safran.com/case-studies/fosen-yard
- Safran — overzicht alle case studies: https://www.safran.com/case-studies
- Spider Project — productbeschrijving: https://www.spiderproject.pro/en/spider-project/
- Spider Project — prijslijst: https://www.spiderproject.pro/en/price-list/
- Oracle Primavera P6 EPPM: https://www.oracle.com/construction-engineering/primavera-p6/
- Oracle Primavera Cloud: https://www.oracle.com/construction-engineering/primavera-cloud-project-management/
- Oracle Help — Earned Value in P6 Professional: https://docs.oracle.com/cd/F88968_01/English/User_Guides/p6_pro_user/earned_value.htm
- AVEVA Enterprise Resource Management: https://www.aveva.com/en/products/enterprise-resource-management/
- Siemens — Ship construction integration / digital shipyard: https://www.siemens.com/en-us/digital-thread/smart-manufacturing/ship-construction/
- Siemens Tecnomatix — *Plant Simulation for shipyards* factsheet (8852-D6 3/23, PDF): https://sisinc.org/wp-content/uploads/2026/03/Siemens-SW-Plant-Simulation-for-Shipyards-Fact-Sheet.pdf
- Siemens — Opcenter Advanced Planning & Scheduling: https://www.siemens.com/en-us/products/opcenter/advanced-planning-scheduling-aps/
- Siemens newsroom — Siemens & HD Hyundai AI digital shipyard: https://news.siemens.com/en-us/siemens-hd-hyundai-ai-digital-shipyard-us-shipbuilding/
- Dassault Systèmes DELMIA Advanced Planning & Scheduling: https://www.3ds.com/products/delmia/supply-chain-planning-optimization/advanced-planning-scheduling
- ETC Academy — 3DEXPERIENCE DELMIA Shipyard Production Scheduling Optimization (28 u): https://catalogue-etc-academy.dendreo.com/formation/586/3dexperience-delmia-shipyard-production-scheduling-optimization-28h
- SPAR Associates: https://www.sparusa.com/ (tijdens onderzoek HTTP 503) en https://www.sparusa.com/products.aspx
- SPAR PERCEPTION handleiding: https://manualzz.com/manual/en/Spar/Perception/User+manual
- Floorganise — *Planning tools and software* kennisbank: https://www.floorganise.com/knowledgebase/technology-knowledgebase/planning-tools-and-software/
- Floorganise — Our technology (Floor2Plan): https://www.floorganise.com/our-technology/
- SSI — EnterprisePlatform: https://www.ssi-corporate.com/products/enterpriseplatform/
- SSI — ShipConstructor: https://www.ssi-corporate.com/products/shipconstructor/
- Deltek Acumen: https://www.deltek.com/products/delivery-assurance/ppm/acumen/ en https://www.deltek.com/products/delivery-assurance/ppm/acumen/fuse/
- Hanwha Systems — MES: https://www.hanwhasystems.com/ict/en/business/solution/mes.do
- InEight — XER-import in Control: https://learn.ineight.com/Control/Content/4-Scheduling/
- JDM Technology Group — overname Safran (2021): https://jdmtechnologygroup.com/risk-assessment-and-project-management-software-maker-safran-acquired-by-jdm-technology-group/

### Overheid, onderzoek en standaarden
- NSRP — *Panel Project: Automated Detail Planning and Instant Earned Value Control, Final Report* (agreement #2019-483-012, juni 2024, PDF): https://www.nsrp.org/wp-content/uploads/2024/06/PP21-ADP_Earned-Value-Final-Report.pdf
- NSRP — programmasite: https://www.nsrp.org/
- GAO — *Navy Shipbuilding: A Generational Imperative for Systemic Change* (GAO-25-108136): https://www.gao.gov/products/gao-25-108136
- GAO — blog over structurele overschrijdingen Navy-scheepsbouw: https://www.gao.gov/blog/u.s.-navy-shipbuilding-consistently-over-budget-and-delayed-despite-billions-invested-industry
- AACE International — 29R-03 *Forensic Schedule Analysis* (inhoudsopgave PDF): https://web.aacei.org/docs/default-source/toc/toc_29r-03.pdf
- AACE International — 52R-06 *Prospective Time Impact Analysis* (PDF): https://web.aacei.org/docs/default-source/toc/toc_52r-06.pdf
- CDM Suite — DCMA 14-point assessment, checks en drempels: https://cdmsuite.com/insights/dcma-14-point-schedule-assessment
- Peveka Solutions — DCMA 14-point uitgelegd (kritiek): https://www.pevekasolutions.com/insights/dcma-14-point-assessment-explained
- ScheduleReader — DCMA 14-point checklist (PDF): https://schedulereader.com/wp-content/uploads/2026/07/DCMA-14-Point-Assessment-Checklist-ScheduleReader.pdf
- buildingSMART — IFC for Ports & Waterways: https://www.buildingsmart.org/standards/domains/infrastructure/ifc-for-ports-waterways/
- buildingSMART — IFC Maritime Project: https://www.buildingsmart.org/ifc-maritime-project/
- buildingSMART GitHub — IfcPortsAndWaterwaysDomain: https://github.com/buildingSMART/IFC4.3.x-development/blob/master//docs/schemas/domain/IfcPortsAndWaterwaysDomain/README.md
- ScienceDirect — over IFC 4.3 ADD2 (sept 2023) en haven-/waterweginfrastructuur: https://www.sciencedirect.com/science/article/pii/S0029801826011510
- OCX Consortium: https://www.3docx.org/ (tijdens onderzoek HTTP 404; informatie via zoeksnippets)
- HandWiki — SFI Coding and Classification System: https://handwiki.org/wiki/SFI_Coding_and_Classification_System
- SFI Code Explorer: https://sfi.codes/
- SpecTec — SFI technical coding solution: https://spectec.net/amos-software/sfi-technical-coding-solution/
- Humphreys & Associates — *Primavera (P6) Scheduling in the Earned Value Environment* (16 u): https://www.humphreys-assoc.com/primavera-p6-scheduling-in-the-earned-value-environment-16-hour/
- Mass.gov — Contractor Schedule Toolkit (P6-template): https://www.mass.gov/doc/contractor-schedule-toolkitcst-guidance-20/

### Academische literatuur (blokbouw / spatial scheduling)
- *Spatial scheduling for large assembly blocks in shipbuilding*, ScienceDirect: https://www.sciencedirect.com/science/article/pii/S0360835215002296
- *Spatial Scheduling Optimization Algorithm for Block Assembly in Shipbuilding*, Wiley (2017): https://onlinelibrary.wiley.com/doi/10.1155/2017/1923646
- Hull block assembly line scheduling (PFSP), IJNAOE/ScienceDirect: https://www.sciencedirect.com/science/article/pii/S2092678225000330
- *Ship plane block flow line optimization*, Nature Scientific Reports: https://www.nature.com/articles/s41598-024-80785-5
- Dynamic spatial scheduling, IEEE: https://ieeexplore.ieee.org/document/8978760
- *Flexible Job-Shop Scheduling with Assemblies, Limited Buffer Capacity, Block Erection Strategy and Due Dates*, Taylor & Francis (2025): https://www.tandfonline.com/doi/full/10.1080/00207543.2025.2503465

### Marktcijfers
- Pheonix Research — Global Shipbuilding Market 2025–2033 ($120,0 mrd → $165,2 mrd): https://www.pheonixresearch.com/market-report/global-shipbuilding-market-2025-2033/
- Maximize Market Research — Shipbuilding Market ($169,27 mrd 2025): https://www.maximizemarketresearch.com/market-report/shipbuilding-market/148775/
- Market Research Future — Shipbuilding Market ($226,3 mrd 2025 → $500,63 mrd 2035): https://www.marketresearchfuture.com/reports/shipbuilding-market-10314
- HD IN Research — 17-jaarspiek 2024, ~$204 mrd contractwaarde / 66 mln CGT: https://www.hdinresearch.com/news/779
- SunSirs — wereldwijd orderboek 173,91 mln CGT: https://www.sunsirs.com/commodity-news/petail-29602.html
- iMarineNews — 2025 Global Shipbuilding Report: https://www.imarinenews.com/31068.html
- Westwood Global Energy — offshore EPC-gunningen 2024/2025 ($52 mrd → $54 mrd): https://www.westwoodenergy.com/news/westwood-insight-offshore-epc-contracting-activity-to-remain-buoyant-in-2025
- Offshore Magazine — offshore EPC-activiteit 2025: https://www.offshore-mag.com/field-development/news/55253456/offshore-epc-contracting-activity-to-remain-buoyant-in-2025
- Upstream Online — $54 mrd offshore EPC-forecast 2025: https://www.upstreamonline.com/field-development/-54-billion-the-forecast-global-offshore-epc-contract-award-value-in-2025/
- OilNow — offshore EPC-gunningen $38 mrd YTD: https://oilnow.gy/featured/global-offshore-epc-awards-hit-us38-billion-in-2025-us12-billion-more-expected-westwood/
- MarketsandMarkets — Digital Shipyard Market ($1,80 mrd 2025 → $4,30 mrd 2030): https://www.marketsandmarkets.com/Market-Reports/digital-shipyard-market-6854923.html
- Mordor Intelligence — Digital Shipyard Market ($2,06 mrd 2025, CAGR 17,94%): https://www.mordorintelligence.com/industry-reports/digital-shipyard-market
- Grand View Research — Digital Shipyard Market: https://www.grandviewresearch.com/industry-analysis/digital-shipyard-market-report
- MarketIntelo — Shipbuilding CAD Software Market ($3,8 mrd 2025): https://marketintelo.com/report/shipbuilding-cad-software-market
- Verified Research Insights — EVMS Market ($1,2 mrd 2024 → $3,4 mrd 2032): https://www.verifiedresearchinsights.com/industry-report/earned-value-management-system-market/
- Verified Market Reports — EVMS Market ($2,7 mrd 2025): https://www.verifiedmarketreports.com/product/earned-value-management-system-market/
- PW Consulting — EVM Software Market ($1,47 mrd 2025): https://pmarketresearch.com/worldwide-earned-value-management-software-market-research/
- DataIntelo — EVMS Market ($2,16 mrd 2025): https://dataintelo.com/report/earned-value-management-system-market
- Apps Run The World — PPM-softwaremarkt $8,7 mrd (2024), top-10 = 60,5%: https://www.appsruntheworld.com/top-10-project-portfolio-management-software-vendors-and-market-forecast/
- GII Research — Naval Vessel MRO ($61,38 mrd 2025): https://www.giiresearch.com/report/moi1851633-naval-vessel-mro-market-share-analysis-industry.html
- Growth Market Reports — Naval Ship MRO ($57,5 mrd 2025): https://growthmarketreports.com/report/naval-ship-maintenance-repair-and-overhaul-mro-market-global-industry-analysis
- P Market Research — Naval Vessel MRO ($64,12 mrd 2025): https://pmarketresearch.com/worldwide-naval-vessel-maintenance-repair-and-overhaul-mro-market-research/
- DataIntelo — Project Scheduling Software Market: https://dataintelo.com/report/project-scheduling-software-market

### Prijsbronnen
- ITQlick — Oracle Primavera pricing / TCO 50 users 5 jaar $500k–1M: https://www.itqlick.com/oracle-primavera/pricing
- ITQlick — Primavera P6 EPPM pricing: https://www.itqlick.com/primavera-p6-enterprise-project-portfolio-management/pricing
- ITQlick — Safran Project pricing: https://www.itqlick.com/safran-project/pricing
- ITQlick — Deltek Acumen pricing ($75/user/maand): https://www.itqlick.com/acumen/pricing
- SaaSRat — Safran Project overzicht: https://saasrat.com/products/safran-project
- ProjectManagerTemplate — Primavera P6 licentie vs. subscription: https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models
- Ten Six — Primavera implementation consulting: https://tensix.com/primavera-implementation-consulting/
- CMC Project Solutions — Primavera licensing/training/implementatie: https://www.cmcprojectsolutions.com/primavera/shop/

### Vertragingskosten, claims en contracten
- Offshore Energy — FPSO-vertraging Noordzee, +$400 mln: https://www.offshore-energy.biz/fpso-delay-pushes-north-sea-projects-costs-up-by-400-million-and-bumps-first-oil-to-2025/
- Offshore Energy — FPSO remedial work, projectkosten $4,9–5,2 mrd: https://www.offshore-energy.biz/with-fpso-requiring-more-work-first-oil-gets-bumped-to-mid-2024/
- Upstream Petroleum — FPSO-schemavertragingen kosten *"tens of millions"* per dag: https://www.upstream-petroleum.com/uncover-how-fpso-schedule-delays-can-burn-dollarbillionsdollarsee-the-1-3-year-cost-to-operators-and-fpso-owners
- PetroHab — $250.000 per uur ongeplande stilstand offshore platform: https://petrohab.com/the-true-cost-of-unplanned-production-shutdown-in-oil-and-gas-2026-operational-analysis/
- Law Gratis — CPM-analyse bij geschillen over vertraagde commissioning offshore wind: https://www.lawgratis.com/blog-detail/disputes-over-delayed-commissioning-of-offshore-wind-platforms
- DAC Consulting — case: kritieke vertragingen offshore windpark: https://www.dac-consultingservices.co.uk/case-study/resolving-critical-delays-in-an-offshore-wind-farm-project
- Precision Scheduling Consultants — forensische schema-analyse: https://www.precisionschedulingconsultants.com/construction-delay-claims-forensic-analysis/
- EVRA Consulting — forensic delay analysis: https://evraconsulting.com/forensic-delay-analysis/
- LawInsider — voorbeeldclausule LD US$ 42.500/dag: https://www.lawinsider.com/
- Haynes Boone — *Law of Shipbuilding Contracts* (LD's bij late levering, snelheid, brandstofverbruik): https://www.haynesboone.com/
- BIMCO NEWBUILDCON (standaard nieuwbouwcontract): https://www.bimco.org/

### Weer- en installatieplanning offshore
- LAUTEC ESOX — gratis weather downtime modelling: https://esox.lautec.com
- ABPmer SEASTATES — Weather Downtime Express: https://www.seastates.net/weather-downtime-express
- Spinergie — downtime model op basis van AIS + weerdata: https://www.spinergie.com/blog/reducing-the-risk-of-weather-related-delays-with-spinergies-downtime-model
- Shoreline Wind — offshore wind operations planning: https://shorelinewind.com/solutions/offshore-wind

### Overig / achtergrond
- Wikipedia — Spider Project (herkomst, resource leveling, critical path drag, skill scheduling): https://en.wikipedia.org/wiki/Spider_Project
- Planning Planet — Spider Project toepassingsdomeinen incl. Shipbuilding: https://planningplanet.com/forums/spider-project/875304/resource-leveling-activity-interruptions
- Danaos Projects — ProjectVIEW ERP voor scheepsbouw: https://danaos-projects.com/industries-we-serve/shipbuilding-erp-software/
- Bentley SYNCHRO — 4D-koppeling met Navisworks/P6: https://bentleysystems.service-now.com/community
- Deltime — 4D-programmakoppeling P6 ↔ model: https://deltime.co.uk/service-bim-navisworks.html
- Ten Six — Primavera P6 en EVM: https://tensix.com/primavera-p6-and-earned-value-management/
- Project Control Academy — EVM in Primavera P6: https://www.projectcontrolacademy.com/earned-value-management-in-primavera-p6/

### Cijfers die alleen via zoeksnippets zijn verkregen (niet op primaire pagina geverifieerd)
Deze zijn in de tekst als zodanig gemarkeerd. Het betreft:
- Aantal actieve werven wereldwijd (~180, sept 2024; 153 in juni 2022) — **[GECORRIGEERD]** bron is **Xclusiv Shipbrokers**, gerapporteerd via Freight News, *niet* Statista; telt alleen commerciële nieuwbouwwerven met actief orderboek. Zie §11, punt 2.
- Werkgelegenheid scheepsbouw (~1,1 mln in 2022, ~70% Azië; ~1,2 mln nu) — WorldMetrics / Ship Universe, via snippet. Het bijbehorende "**15% tekort aan geschoolde maritieme arbeidskrachten**" is bij hercontrole **niet reproduceerbaar** en is als onzeker gemarkeerd (§11, punt 24).
- Offshore wind marktomvang 2025 ($46,4 mrd Emergen/Precedence; $58,22 mrd Business Research Company; $76,9 mrd GM Insights) — via snippet.
- ~$100 mrd capex aan vertraagde/geannuleerde offshore wind-projecten over twee jaar — via snippet (WFO Global Offshore Wind Report 2025 / Tethys-PNNL).
- Koreaanse "big three": gecombineerde operationele winst H1 2025 >2,57 biljoen won ($1,86 mrd); orderbacklog Q1 2025 $137,26 mrd; 2024 gecombineerd ~6 biljoen won — Koreaanse vakpers, via snippet.
- P6-licentieprijzen ($2.750–3.520 perpetual, $605 support, £220/maand hosted, 22% onderhoud) — Oracle Licensing Experts e.a., via snippet.
- Citaten over P6-ontevredenheid (*"$3,000+/year and takes weeks to learn"*, *"dense and old-fashioned"*, *"I've been using Primavera P6 for years. And I'm done with it"*) — via snippet van vergelijkingsartikelen.
- *"Many shipyards still operate with fragmented planning tools, Excel spreadsheets, or legacy systems..."* — sectorblog, via snippet.
- Cruiseschip-opleveringsvertragingen (Star Princess, Oceania Allura, Sun Princess) — cruisevakpers, via snippet.
- Line of Balance / Linear Scheduling Methods bij repetitieve, resource-gedreven activiteiten — via snippet.
- Plant Simulation verkortte lead-time-generatie met 2,6% bij HD Hyundai Mipo — Siemens Tecnomatix blog, via snippet.
- ~~Meyer Group gebruikt SAP S/4 als strategisch projectplatform~~ — **INGETROKKEN**, staat niet op de Safran/Meyer-pagina (zie §11).
- DFARS-drempels ($20M EVMS-conformiteit, $100M compliance review na Class Deviation 2015-O0017) en SUPSHIP-rol — DoD/DFARS-documenten, via snippet. **Inmiddels primair bevestigd** op acquisition.gov (zie §11).

---

## 11. Verificatie (adversariële hercontrole, 25 juli 2026)

**Methode:** onafhankelijke hercontrole van de belangrijkste falsifieerbare beweringen, met als expliciete opdracht ze te *weerleggen*. Alle doorgerekende schattingen zijn nagerekend. De WebSearch-tool was ook in deze ronde uitgeput; verificatie liep via WebFetch op primaire bronnen en een DuckDuckGo-lite-proxy.

### 11.1 Rekencontrole van de segmentschatting

De aritmetiek van §5.2 is regel voor regel nagerekend en **klopt volledig**:

| Stap | Berekening | Uitkomst | Oordeel |
|---|---|---|---|
| Werven, volwaardige seats | 400 × 25 × $2.500 | $25,0 mln | ✅ correct |
| Werven, light seats | 400 × 100 × $400 | $16,0 mln | ✅ correct |
| Subtotaal CPM scheepsbouw | 25 + 16 | $41,0 mln | ✅ correct |
| Werf-APS/MES | 150 × $300.000 | $45,0 mln | ✅ correct |
| Subtotaal deelmarkt 1 | 41 + 45 | $86,0 mln | ✅ correct |
| Offshore, volwaardige seats | 600 × 30 × $3.000 | $54,0 mln | ✅ correct |
| Offshore, light seats | 600 × 120 × $500 | $36,0 mln | ✅ correct |
| Risico-opslag 20% | 0,20 × (54 + 36) | $18,0 mln | ✅ correct (grondslag = $90 mln, expliciet gemaakt) |
| Subtotaal deelmarkt 2 | 54 + 36 + 18 | $108,0 mln | ✅ correct |
| **Segmenttotaal** | 86 + 108 | **$194,0 mln ≈ $195 mln** | ✅ correct |
| Top-down onder-/bovengrens | 0,10 × $1,5 mrd / 0,15 × $2,5 mrd | $150 mln / $375 mln | ✅ correct |
| "1 dag LD betaalt >10 P6-licenties" | $42.500 ÷ $2.750–3.520 | 12–15 licenties | ✅ correct |
| Koreaanse big three: ₩2,57 bln ≈ $1,86 mrd | impliceert ~1.380 KRW/USD | — | ✅ plausibel wisselkoersniveau 2025 |

**Er zijn geen rekenfouten gevonden.** De zwakte van de schatting zit niet in de aritmetiek maar in de **aannames** (aantal organisaties, seats per organisatie, blended seatprijs) — zie 11.2, punten 2 en 3.

### 11.2 Oordeel per bewering

| # | Bewering | Oordeel | Toelichting en bron |
|---|---|---|---|
| 1 | Segmentomvang ~$195 mln software / $450–650 mln incl. diensten (2025) | **onzeker (rekenkundig correct, aannames onbewezen)** | Aritmetiek klopt (11.1). Maar de vier dragende aannames (400 organisaties, 25/100 seats, $2.500/$400 per seat; 600 organisaties, 30/120 seats, $3.000/$500) hebben géén van alle een externe bron. Het rapport erkent dit zelf. Behoud de expliciete SCHATTING-markering; presenteer nooit als marktcijfer. |
| 2 | "~180 grote actieve werven (Statista, sept 2024)" | **gecorrigeerd** | Getal klopt, **bronattributie niet**: 180 (sept 2024) vs. 153 (juni 2022), +17,7%, is van **Xclusiv Shipbrokers**, gerapporteerd via Freight News. Statista heeft een eigen, afwijkende telling voor 2025 achter een paywall. Bovendien telt de 180 uitsluitend commerciële **nieuwbouwwerven met actief orderboek** — geen reparatie-, naval- of kleine werven. Bron: hercontrole via zoekproxy; context Europa ~150 grote / ~300 totale werven (industriAll Europe). |
| 3 | Stap "180 werven → 400 licentiërende organisaties" | **onzeker, waarschijnlijk te laag** | Niet weerlegd, maar ook niet onderbouwd. Europa alléén telt al ~150 grote werven en ~300 incl. kleinere yards; met VS, China, Korea en Japan erbij is 400 eerder een ondergrens. Gevoeligheid is lineair: 600 i.p.v. 400 tilt het totaal van ~$195 mln naar ~$238 mln. Kanttekening toegevoegd in §5.2. |
| 4 | Top-down kruiscontrole bevestigt de bottom-up | **gecorrigeerd (methodologisch)** | De som klopt, maar het is **geen onafhankelijke controle**: zowel het "project-controls-deel van PPM" ($1,5–2,5 mrd) als het sectoraandeel (10–15%) zijn eigen aannames. Alleen de PPM-basis is extern geverifieerd. De resulterende band ($150–375 mln) is zó breed dat overlap vrijwel onvermijdelijk is. Waarschuwing toegevoegd in §5.3. Bron: https://www.appsruntheworld.com/top-10-project-portfolio-management-software-vendors-and-market-forecast/ |
| 5 | PPM-softwaremarkt $8,7 mrd (2024), top-10 = 60,5% | **bevestigd** | Letterlijk: *"In 2024, the global Project Portfolio Management software market grew to $8.7 billion, marking a 12.7% year-over-year increase"* en *"The top 10 vendors accounted for 60.5% of the total market."* Kleine inconsistentie in de bron zelf: dezelfde pagina noemt elders "$8.8 billion in 2024". https://www.appsruntheworld.com/top-10-project-portfolio-management-software-vendors-and-market-forecast/ |
| 6 | "~50.000 planningsactiviteiten per cruiseschip" (Meyer Turku) | **GECORRIGEERD — ingetrokken** | Poging tot weerlegging geslaagd. De aangehaalde Safran-pagina bevat **geen enkel activiteitenaantal**; de volledige numerieke inhoud is: 126×1.112 ft (38,6×339 m), 18 dekken, 158.000 GT, 1–2 jaar bouwfase, ~4.000 + ~4.000 mensen, 150–200 updaters, 2 jaar Safran-gebruik, 4 cruiseschepen, 25% wereldproductie in 10 jaar. Ook een gerichte zoekactie op *"50,000 activities"* i.c.m. Meyer Turku/Aker Finnyards leverde nul resultaten. Geschrapt uit §1 en §2.1. https://www.safran.com/case-studies/meyer-turku |
| 7 | 150–200 systeemupdaters, ~4.000 + ~4.000 mensen, 18 dekken / 158.000 GT (Meyer Turku) | **bevestigd** | Letterlijk in de bron: *"150-200 provide updates in Safran to keep statusing, forecasting and resource management current"* en *"Approximately 4,000 people work for the yards and about the same number are employed by subcontractors."* https://www.safran.com/case-studies/meyer-turku |
| 8 | "Meyer Group gebruikt SAP S/4 als strategisch projectplatform" | **GECORRIGEERD — ingetrokken** | Staat niet op de aangehaalde pagina. Die noemt SAP uitsluitend als Safran-koppelproduct ("Integrator for SAP") en beschrijft de gekoppelde systemen generiek als *"systems for job orders, document control and time registration"*. Verwijderd uit §3.2 en §7. https://www.safran.com/case-studies/meyer-turku |
| 9 | Marktleiderschap: Safran nr. 1 of gedeelde nr. 1 in Noordzee-offshore; Equinor, Aker BP, ABB, AECOM, Meyer Turku zijn klanten | **bevestigd (klantenlijst) / onzeker (rangorde)** | Klantlogo's Equinor, Aker BP, ABB, AECOM, Meyer Turku en Aibel staan aantoonbaar op safran.com (o.a. *"Safran - Testimonial Logos_MEYER TURKU"*, *"…_AKERBP"*). "Statoil" staat er niet meer op — dat is de oude naam van Equinor en komt alleen in een losse oude case study voor. De **rangordeclaim zelf ("nr. 1 of gedeelde nr. 1") is een interpretatie zonder marktaandeelcijfer** en blijft onzeker. https://www.safran.com/ |
| 10 | Spider Project prijslijst ($4.500 → $2.250 Professional; Lite $800) | **bevestigd, exact** | Leverancierseigen prijslijst reproduceert exact: Professional 1e $4.500, 2e $4.100, 3e $3.700, 4e–6e $3.300, 7e–10e $3.000, 11e–15e $2.700, 16e–25e $2.400, 26e+ $2.250; Desktop Plus $2.250/$2.050/$1.850/$1.700; Desktop $1.700/$1.500/$1.350/$1.150; Lite $800. https://www.spiderproject.pro/en/price-list/ |
| 11 | Primavera P6 ~$2.750–3.520 per named user perpetual, ~22% onderhoud | **bevestigd (orde van grootte)** | Onafhankelijk teruggevonden: *"P6 Enterprise (EPPM) has a base license of about US$2,750 per application user"*, met ~22% jaarlijks onderhoud en recentere offertes in de band $3.100–3.520. Blijven aggregator-/resellercijfers, geen Oracle-lijstprijs; de band is echter consistent over meerdere onafhankelijke bronnen. https://www.itqlick.com/oracle-primavera/pricing |
| 12 | Blended seatprijzen $2.500 (werf) en $3.000 (offshore) per jaar | **onzeker** | Niet weerlegbaar en niet bevestigbaar: het zijn eigen mengverhoudingen van P6-, Safran- en Spider-prijzen. De inputs (P6, Spider) zijn wél bevestigd (#10, #11), dus de band is intern consistent. De $400/$500 light-seatprijs heeft géén enkele bronbasis — dat is de zwakste pijler onder de schatting (samen $52 mln, ruim een kwart van het totaal). |
| 13 | EVMS verplicht vanaf $20M, compliance-review vanaf $100M (was $50M, Class Deviation 2015-O0017) | **bevestigd, met nuance** | Primair bevestigd: DFARS 234.201 schrijft EIA-748-conformiteit voor bij *"cost or incentive contracts and subcontracts valued at $20,000,000 or more"* en agency-gevalideerde compliance bij *"$50,000,000 or more"*. De verhoging naar $100M loopt via de nog vigerende class deviation, niet via de basistekst. Beide cijfers dus juist, maar de gecodificeerde DFARS zegt $50M. https://www.acquisition.gov/dfars/234.201-policy. |
| 14 | DCMA 14-point drempels (tabel §6.2) | **GECORRIGEERD** | Checks 1–10, 12, 13 en 14 bevestigd. **Check 11 was fout**: het rapport had daar "Baseline Execution Index (BEI) ≥ 0,95" staan, waardoor BEI twee keer voorkwam (11 én 14). Canoniek is **check 11 = Missed Tasks, drempel ≤ 5%** (*"No more than 5% of tasks should be missed … the number of missed tasks divided by the baseline count"*). De fout is overgenomen uit de secundaire bron, die zelf "Missed Activities (BEI)" schrijft. Tabel gecorrigeerd. https://cdmsuite.com/insights/dcma-14-point-schedule-assessment |
| 15 | XER is het de facto verplichte uitwisselingsformaat | **bevestigd als praktijk, niet als voorschrift** | Ondersteund door meerdere onafhankelijke tooling-ecosystemen (InEight-import, Safran Risk P6/.XER-compatibiliteit, overheids-P6-templates). Belangrijke nuance die het rapport zelf al maakt: er is **geen norm of wet die XER voorschrijft** — het is contractpraktijk. "Contractueel onbruikbaar zonder XER" is daarmee een goed onderbouwde maar niet formeel afdwingbare stelling. |
| 16 | Wereldorderboek 173,91 mln CGT (eind 2025) | **bevestigd** | Letterlijk: *"By the end of December last year, the global orderbook stood at 173.91 million CGT"*, artikel van 12 januari 2026. Kruiscontrole met Clarksons-cijfers is consistent: ~163 mln CGT medio 2025, ~58 mln CGT nieuwe orders in 2025, ~44,7 mln CGT output → netto ~+13 mln CGT over het jaar. https://www.sunsirs.com/commodity-news/petail-29602.html |
| 17 | 2024 contractwaarde ~$204 mrd over 66 mln CGT, 17-jaarspiek | **bevestigd** | Onafhankelijk terug te vinden bij meerdere partijen, o.a. een SGX-filing van Yangzijiang Shipbuilding: *"In 2024, the industry registered a total order intake of US$204 billion in contract value and 66 million in terms of compensated gross tonnage ('CGT'), reaching the highest in 17 [years]"*. https://www.hdinresearch.com/news/779 |
| 18 | Offshore olie/gas-EPC $54 mrd in 2025, +1% | **bevestigd, met rekenkundige waarschuwing** | Westwood zelf: *"a marginal 1% YoY increase, totalling US$54 billion"*, tegen *"approximately US$52 billion"* in 2024. Let op: $52 → $54 mrd is rekenkundig +3,8%; het verschil is afronding aan de bron. Gebruik +1%, niet de deling van de afgeronde bedragen. Toegelicht in §5.4. https://www.westwoodenergy.com/news/westwood-insight-offshore-epc-contracting-activity-to-remain-buoyant-in-2025 |
| 19 | Digital shipyard $1,80 mrd (2025) → $4,30 mrd (2030), CAGR 19,0% | **bevestigd** | Exact zoals gepubliceerd: *"USD 1.80 billion in 2025"*, *"USD 4.30 billion by 2030"*, *"CAGR of 19.0%"*. De rapporttekst "18–19%" dekt zowel deze 19,0% als Mordor's 17,94%. https://www.marketsandmarkets.com/Market-Reports/digital-shipyard-market-6854923.html |
| 20 | Bovengrens "alles wat met werfplanning te maken heeft" = $0,8–1,0 mrd | **onzeker** | Geen berekening gegeven en niet reconstrueerbaar zonder een niet-onderbouwde aanname over welk deel van de digital-shipyard-markt planning is. Als illustratief gemarkeerd in §5.3. |
| 21 | Safran overgenomen door JDM Technology Group in 2021 | **bevestigd, met datum** | Drie onafhankelijke persberichten (JDM, PRWeb, PRNewswire): overname van Safran Holding AS te Stavanger van Progressus Management en EV Private Equity, aangekondigd **30 september 2021**. https://jdmtechnologygroup.com/risk-assessment-and-project-management-software-maker-safran-acquired-by-jdm-technology-group/ |
| 22 | SFI Group System: 8 hoofdgroepen; 1972 / Skipsteknisk Forskningsinstitutt / SpecTec / >6.000 installaties | **deels bevestigd, deels onzeker** | Structuur primair bevestigd: *"Eight main groups (1–8), each divided into groups, sub-groups and detail codes"*, hoofdgroep 1 cijfer → detail `xxx.xxx`. De **herkomst- en installatiecijfers (1972, Skipsteknisk Forskningsinstitutt, SpecTec-beheer, >6.000 installaties) zijn in deze ronde niet primair bevestigd**. https://sfi.codes/ |
| 23 | IFC 4.3 ADD2 uitgebracht in september 2023 | **gecorrigeerd** | Datum niet reproduceerbaar. Wat wel vaststaat: IFC4.3.2.0 is door ISO geratificeerd op 4 januari 2024 en formeel gepubliceerd als **ISO 16739-1:2024** op 2 april 2024 (buildingSMART International). §6.5 aangepast. |
| 24 | 15% wereldwijd tekort aan geschoolde maritieme arbeidskrachten | **onzeker — niet reproduceerbaar** | Geen primaire bron vindbaar (branche-organisatie, ILO/IMO, SEA Europe). Kwam uit een secundaire snippet. De *richting* (structureel tekort aan lassers/pijpfitters/elektromonteurs) is breed gedocumenteerd, het percentage niet. Niet als cijfer gebruiken. §5.4 aangepast. |

### 11.3 Wat deze ronde niet heeft kunnen toetsen

- De **bedrijfseconomische dealbedragen** in §4.1 (€75k–250k middelgrote werf; €1–5 mln grote werf/EPC; €0,5–2 mln EVMS-validatie) blijven volledig onbevestigd. Er zijn geen publieke aanbestedingsdocumenten met werf-specifieke bedragen gevonden — het rapport zegt dat zelf, en dat blijft staan.
- Alle **AVEVA-, Siemens- en Floorganise-effectclaims** (+25% productiviteit, −14% doorlooptijd, 15% reductie) zijn leverancierseigen marketingcijfers; ze zijn niet onafhankelijk gevalideerd en horen als zodanig gelezen te worden.
- **PetroHab ($250.000/uur stilstand)**, **Upstream Petroleum ("tens of millions per day")** en de LawInsider-voorbeeldclausule zijn commerciële blogs respectievelijk een willekeurige contractsjabloon; ze onderbouwen de *orde van grootte* van vertragingskosten, geen sectorgemiddelde.
- De **~$100 mrd aan vertraagde/geannuleerde offshore-wind-capex** is niet opnieuw geverifieerd en blijft een snippet-cijfer.

### 11.4 Netto-effect op de kernconclusie

De centrale kwantitatieve stelling — **~$195 mln planningssoftware, $450–650 mln inclusief diensten, geen analistenrapport dat dit segment apart kwantificeert** — blijft **overeind na hercontrole**, met drie aanscherpingen: (a) de aritmetiek is foutloos maar de aannames dragen alle onzekerheid, (b) de top-down "kruiscontrole" is circulair en bevestigt minder dan gesuggereerd, en (c) het organisatie-aantal is eerder te laag dan te hoog ingeschat. De kwalitatieve kernconclusies (XER als toetredingsdrempel, nivellering als gat, betalingsbereidheid hoog bij planners en laag bij light users) zijn door deze ronde niet aangetast. Twee sfeerbepalende feiten uit de managementsamenvatting — de 50.000 activiteiten en het SAP-S/4-voorbeeld — zijn echter **geschrapt wegens ontbrekende bronbasis**.
