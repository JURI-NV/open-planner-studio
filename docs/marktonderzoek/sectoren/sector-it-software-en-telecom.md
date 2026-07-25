# Sectorrapport: IT, software en telecom — planningssoftware

**Onderzoeksdatum:** 25 juli 2026
**Scope:** softwarebedrijven, IT-dienstverleners/systeemintegratoren, hyperscalers en datacenterontwikkelaars, vaste en mobiele telecomoperators, netwerkleveranciers (Ericsson/Nokia), uitrolaannemers voor glasvezel/5G, en de engineering-/GIS-bureaus die hen bedienen.

**Methodische waarschuwing vooraf.** De WebSearch-quota van deze sessie waren uitgeput voordat dit onderzoek startte; al het materiaal hieronder is verzameld met directe WebFetch/`curl`-ophalingen van leveranciers-, analisten-, overheids- en normdocumenten, plus extractie van PDF's (Oracle-prijslijsten, GAO-gids, GSMA-rapport). Elk cijfer heeft een bron-URL. Waar ik zelf reken of interpoleer staat expliciet **[SCHATTING]**.

> **LEES EERST — ADDENDUM §9 (tweede onderzoeksronde, 25 juli 2026).** Er is later op dezelfde dag een tweede onderzoeksronde gedraaid, mét WebSearch. Die ronde:
> - **corrigeert één load-bearing claim uit dit rapport**: de bewering in §5.6, §7.2 en §7.4 dat IFC telecomnetwerken *niet* dekt is **onjuist** — IFC 4.3 heeft een expliciet telecom-domeinmodel. Zie **§9.1**.
> - **bevestigt vier zaken die hierboven als [ONBEVESTIGD] staan**: de DoD-EVMS-drempels van USD 20/50 mln (§5.1), de AACE RP-nummering 29R-03 (§5.4), de BEAD-verplichtingen (§1.5) en de afwezigheid van kritiek pad in Jira Advanced Roadmaps (§6, waar het als [INFERENTIE] stond). Zie **§9.2**.
> - **voegt een acuut marktfeit toe**: Microsoft trekt Project Online per 30 september 2026 in. Zie **§9.3**.
> Lees dit rapport dus met §9 ernaast; waar §9 en de hoofdtekst botsen, geldt §9.

---

## 0. Kernconclusie in één alinea

Dit is de enige sector in dit wereldwijde onderzoek waar **klassieke CPM-planning geen thuisbasis maar een randverschijnsel is**. Het geld in "planningssoftware" gaat hier naar agile-werkbeheer (Jira, Azure DevOps, Asana, monday) en naar strategisch portfoliobeheer (Clarity, Planview, ServiceNow SPM) — niet naar netwerkplanners met kritieke paden. Analisten schrijven IT & telecom desondanks het **grootste verticale aandeel van de PPM-markt** toe: 35,60% van USD 6,90 miljard in 2025, ofwel circa **USD 2,46 miljard (2025)** ([Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market)). Waar échte CPM wél leeft binnen deze sector zijn twee eilanden: **telecom-uitrolprogramma's** (glasvezel/5G, waar civiele techniek en vergunningen de logica dicteren) en **datacenterbouw** (waar JLL de bouwkosten op USD 11,3 miljoen per MW in 2026 zet en circa 100 GW nieuwe capaciteit tot 2030 voorziet — bouwwerk dat met P6/MS Project én BIM/IFC wordt gestuurd). Voor een open-source, IFC-gebaseerde planner ligt de opening dus niet bij "de IT-sector" in het algemeen, maar precies bij die twee eilanden.

---

## 1. Wat deze sector bijzonder maakt qua planning

### 1.1 Twee onverenigbare planningsculturen onder één sectorlabel

De sector "IT, software en telecom" is voor planningsdoeleinden geen sector maar drie:

| Deelsector | Planningsparadigma | Dominante tool | CPM relevant? |
|---|---|---|---|
| Softwareontwikkeling (product, SaaS, interne IT) | Agile/iteratief, backlog + sprints, geen einddatum-logica | Jira, Azure DevOps, Linear | Nauwelijks |
| IT-portfolio/PMO van grote ondernemingen | Hybride: stage-gates + agile teams, financiën en capaciteit | Clarity, Planview, ServiceNow SPM, MS Project | Beperkt (mijlpalen, afhankelijkheden) |
| Netwerkuitrol & datacenterbouw | Klassiek: CPM, resource-loading, baselines, claims | Primavera P6, MS Project, Sitetracker, IQGeo | **Volledig** |

Het State of Agile-rapport (17e editie, 788 respondenten) meldt dat **42% van de respondenten een hybride model gebruikt** dat agile, DevOps of andere keuzes combineert, en dat grotere organisaties juist minder tevreden zijn met puur agile en aangepaste frameworks adopteren ([digital.ai](https://digital.ai/state-of-agile/)). Die hybride 42% is het scharnierpunt: dat zijn de organisaties waar mijlpaal- en afhankelijkheidsplanning terugkomt bovenop agile teams.

### 1.2 Schaal: extreem, maar horizontaal in plaats van verticaal

Bouw- en infraprojecten zijn diep (één project, duizenden onderling afhankelijke activiteiten). Telecomuitrol is **breed**: duizenden tot honderdduizenden bijna identieke kleine werkpakketten (een mast, een straatkast, een aansluiting), met beperkte onderlinge logica maar enorme volumes en gedeelde schaarse resources (ploegen, graafmachines, vergunningen, wayleaves).

Harde volumes:
- **Mobiel:** GSMA rekent op **operator-capex van USD 1,3 biljoen over de periode 2024–2030** (≈ USD 186 miljard per jaar), bij operatoromzet van USD 1,08 biljoen (2024) naar USD 1,25 biljoen (2030) en unieke abonnees van 4,7 miljard (58% penetratie) naar 5,5 miljard (64%) ([GSMA, The Mobile Economy 2025, PDF](https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-economy/wp-content/uploads/2025/02/030325-The-Mobile-Economy-2025.pdf)).
- **5G-status:** het aantal 5G-abonnementen is **de 3 miljard gepasseerd**; 71% van de FWA-aanbieders levert de dienst over 5G; commerciële 5G SA network-slicing-aanbiedingen stegen in zes maanden van 65 naar 84 ([Ericsson Mobility Report, juni 2026](https://www.ericsson.com/en/reports-and-papers/mobility-report)).
- **Glasvezel Europa:** circa **295 miljoen homes passed in EU39 (~79% huishoudendekking)**, ~160 miljoen FTTH/B-abonnees, take-up ~54%, en **~23 miljoen extra premises passed in het afgelopen jaar** met >13% abonneegroei j-o-j ([FTTH Council Europe, 2026](https://www.ftthcouncil.eu/)).
- **Datacenters:** bijna **100 GW nieuwe datacentercapaciteit verwacht tussen 2026 en 2030**, wereldwijde capaciteit naar 200 GW in 2030; **USD 1,2 biljoen aan vastgoedwaardecreatie**, USD 870 miljard nieuwe schuldfinanciering, plus USD 1–2 biljoen voor IT-apparatuur van huurders — **circa USD 3 biljoen totale investering tot 2030** ([JLL Data Center Outlook 2026](https://www.jll.com/en-us/insights/market-outlook/data-center-outlook)).

Eén glasvezelprogramma van 23 miljoen premises per jaar (Europa alleen) laat zich niet in één P6-bestand persen. Dat is exact waarom deze sector *purpose-built* uitrolplatforms kocht in plaats van CPM-tools uit te breiden — zie §2.

### 1.3 Doorlooptijd: kort per eenheid, lang per programma

- Een individuele glasvezelaansluiting of masterupgrade: dagen tot weken.
- Een regionaal uitrolprogramma: 3–7 jaar.
- Een datacentercampus: JLL noteert dat de **gemiddelde wachttijd op een netaansluiting in primaire datacentermarkten meer dan vier jaar bedraagt** ([JLL](https://www.jll.com/en-us/insights/market-outlook/data-center-outlook)) — de kritieke keten van een datacenterproject ligt vaak buiten de bouwplaats, bij netbeheerder en vergunningverlener.
- Een enterprise-IT-programma (ERP, core-migratie): 18–48 maanden, maar met scope die tijdens de rit verschuift, waardoor baselines snel betekenisloos worden.

Dat laatste is de historische reden voor de agile-adoptie in deze sector: McKinsey/Universiteit Oxford vond over **5.400+ IT-projecten** met een prijskaartje boven **USD 15 miljoen** dat ze gemiddeld **45% over budget** gaan, **7% over tijd**, en **56% minder waarde** leveren dan voorspeld — samen USD 66 miljard aan overschrijding ([McKinsey Digital, oktober 2012](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/delivering-large-scale-it-projects-on-time-on-budget-and-on-value)). Opvallend: de tijdsoverschrijding (7%) is klein vergeleken met budget (45%) en waarde (56%) — een aanwijzing dat *schedule* in IT juist níet het pijnpunt is dat men denkt, en dat verklaart deels de lage betalingsbereidheid voor pure planningstools (§3).

### 1.4 Resourcecomplexiteit

Drie fundamenteel andere resourceproblemen dan in de bouw:

1. **Software:** resources zijn teams, niet individuen; capaciteit wordt in story points of team-sprints gemeten; resource-levelling in CPM-zin wordt als schadelijk beschouwd (het doorbreekt teamstabiliteit). Jira Plans/Advanced Roadmaps modelleert daarom *teamcapaciteit per sprint*, niet *resource-histogrammen met levelling*.
2. **Telecomuitrol:** resources zijn ploegen en materieel van onderaannemers, plus schaarse niet-arbeidsresources: vergunningen, wayleaves, straatopenbrekingsvensters, huurcontracten voor mastposities, en de netaansluiting. Deze zijn moeilijk als "resource" te modelleren omdat ze administratieve doorlooptijden zijn, geen inzetbare capaciteit.
3. **Datacenterbouw:** klassieke bouwresources plus extreem lange levertijden voor lange-levertijd-apparatuur (transformatoren, generatoren, koeling, schakelinstallaties). JLL kwantificeert dit niet per component maar geeft wel de kostenkant: bouwkosten stegen van **USD 7,7 naar USD 10,7 miljoen per MW tussen 2020 en 2025 (7% CAGR)**, met een prognose van **+6% naar USD 11,3 miljoen per MW in 2026**; de AI-specifieke tech-fit-out komt daar met circa **USD 25 miljoen per MW** bovenop ([JLL](https://www.jll.com/en-us/insights/market-outlook/data-center-outlook)).

### 1.5 Contractuele eisen

- **Softwareontwikkeling:** overwegend T&M of capaciteitscontracten; geen contractuele planningsverplichting; geen leveringsformaat voor schema's.
- **Telecom-uitrol:** hoofdaannemers (Ericsson, Nokia, Huawei-servicesarmen, en grote civiele partijen) werken met turnkey- of managed-rollout-contracten met **KPI's per opgeleverde site** in plaats van één programma-einddatum. Ericsson positioneert zijn "Intelligent Deployment" expliciet op doorlooptijd en kwaliteit: **"accelerating time to market by 50%"** en **"99% first time right build"** ([Ericsson Network Services](https://www.ericsson.com/en/network-services)).
- **Gereguleerde uitrolverplichtingen:** frequentievergunningen en breedbandsubsidies leggen dekkings- en tijdsverplichtingen op. Amerikaanse BEAD-subgrantees moeten mijlpaal- en voortgangsrapportages leveren (NTIA-programmapagina's waren tijdens dit onderzoek niet toegankelijk — HTTP 403 op [ntia.gov](https://www.ntia.gov/programs/bead) en [broadbandusa.ntia.gov](https://broadbandusa.ntia.gov/funding-programs/broadband-equity-access-and-deployment-bead-program); Render Networks bevestigt indirect dat het BEAD-gefinancierde breedbandprojecten bedient, [rendernetworks.com](https://rendernetworks.com/)). **[SCHATTING]** het BEAD-budget van circa USD 42,45 miljard is algemeen bekend maar kon in deze sessie niet uit een primaire bron worden geverifieerd — behandel dat getal als onbevestigd.
- **Datacenterbouw:** dit is gewoon bouwcontractrecht (design-build, EPC, GMP) mét de bijbehorende planningsverplichtingen: baseline-goedkeuring, maandelijkse updates, vertragingsanalyse. Hier gelden dezelfde eisen als in de bouwsector.

### 1.6 Kosten van vertraging

| Deelsector | Aard van vertragingskosten | Orde van grootte |
|---|---|---|
| Softwareproduct | Gemiste marktkans, geen boete | Diffuus, zelden gekwantificeerd |
| Enterprise-IT-programma | Dubbele run-kosten (oud + nieuw systeem), uitgestelde baten | McKinsey: 56% waardeverlies bij grote projecten ([bron](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/delivering-large-scale-it-projects-on-time-on-budget-and-on-value)) |
| Telecomuitrol | Uitgestelde omzet per aansluiting, boetes bij vergunningsverplichtingen, dubbele mobilisatiekosten van ploegen | Per site laag, over duizenden sites hoog |
| Datacenter | Rentelast op bouwfinanciering + uitgestelde huurinkomsten van een reeds getekende hyperscaler-lease | **[SCHATTING]** bij USD 11,3 mln/MW en een campus van 100 MW is de bouwsom ≈ USD 1,13 miljard; JLL rekent op USD 870 miljard nieuwe schuldfinanciering voor de 100 GW-pijplijn — bij een indicatieve 6% rente is dat ≈ USD 52 miljard rentelast per jaar over de pijplijn, ofwel grofweg USD 4,3 miljard per maand vertraging sectorbreed. Dit is mijn eigen illustratieve berekening, geen JLL-cijfer. |

De asymmetrie is beslissend voor de verkoopbaarheid van planningssoftware: **een softwareteam dat een week uitloopt betaalt niets; een datacenter dat een maand uitloopt betaalt miljoenen.** Betalingsbereidheid volgt die lijn exact (§3).

---

## 2. Welke planningssoftware hier daadwerkelijk gebruikt wordt, en door wie

### 2.1 Rangorde (mijn inschatting, gebaseerd op de bronnen hieronder) **[SCHATTING van de rangorde; onderliggende feiten zijn gebronde]**

**Laag 1 — agile werkbeheer (verreweg het grootste seat-volume)**
1. **Atlassian Jira** — de facto standaard voor softwareteams. Atlassian boekte in FY2025 (afgesloten 30 juni 2025) **USD 5.215 miljoen omzet**, tegen USD 4.359 miljoen in FY2024 en USD 3.535 miljoen in FY2023 ([stockanalysis.com/TEAM](https://stockanalysis.com/stocks/team/financials/)). Jira's eigen pagina meldt een aggregate rating van 4,4 over 14.000 reviews ([Atlassian, JSON-LD op de prijspagina](https://www.atlassian.com/software/jira/pricing)).
2. **Microsoft Azure DevOps / GitHub Projects** — bij Microsoft-gecentreerde IT-afdelingen.
3. **Jira Align** — enterprise-agile bovenlaag (SAFe, Scrum@Scale, LeSS, Spotify, Disciplined Agile en hybride), met klantlogo's **Bank of America, AT&T, VISA, NVIDIA en Pfizer** ([Atlassian Jira Align](https://www.atlassian.com/software/jira/align)). AT&T en NVIDIA in dat rijtje bevestigen de telecom-/tech-adoptie.

**Laag 2 — PPM/portfolio (het analistensegment)**
4. **ServiceNow Strategic Portfolio Management (SPM)** — strategische planning, demand management, resource management, PPM, AI-gedreven roadmaps ([ServiceNow](https://www.servicenow.com/products/strategic-portfolio-management.html)). Mordor noemt ServiceNow bij de top-5 PPM-leveranciers ([Mordor](https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market)).
5. **Broadcom Clarity** (voorheen CA Clarity PPM) — historisch de zwaargewicht in telecom- en bank-PMO's; Mordor plaatst Broadcom (CA PPM/Clarity) in de top-5 ([Mordor](https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market)). De productpagina van Broadcom levert geen inhoudelijke content aan crawlers ([broadcom.com/products/software/value-stream-management/clarity](https://www.broadcom.com/products/software/value-stream-management/clarity)).
6. **Planview** — portfolio Portfolios, AdaptiveWork, AgilePlace, ProjectPlace, Roadmaps, Advisor, Hub en Viz, waarvan **AgilePlace, Viz, Hub en AdaptiveWork expliciet op IT-leiders, PMO's en agile-organisaties gepositioneerd zijn** ([Planview](https://www.planview.com/products/)).
7. **Microsoft Planner & Project (cloud) / Project Server Subscription Edition** — de standaardkeuze van IT-PMO's binnen het Microsoft-ecosysteem.

**Laag 3 — werkbeheer/spreadsheetvervangers (breed, ondiep)**
8. **Smartsheet** — de brug tussen spreadsheet en planning; sterk in uitrolprogramma's en PMO-rapportage.
9. **monday.com, Asana, Wrike** — teamniveau, weinig planningslogica.

**Laag 4 — echte CPM-planning (klein in seats, groot in projectwaarde)**
10. **Microsoft Project (desktop/Professional)** — nog altijd de meest gebruikte CPM-tool in IT-infraprogramma's en bij middelgrote datacenter-/telecomaannemers.
11. **Oracle Primavera P6 EPPM / Primavera Cloud** — bij datacenterbouw, grote civiele telecomwerken en de EPC-partijen. Belangrijk signaal: **Oracle positioneert P6 uitsluitend op construction & engineering** en noemt IT/telecom/communications niet ([Oracle Primavera P6](https://www.oracle.com/construction-engineering/primavera-p6/), [Oracle Primavera Cloud](https://www.oracle.com/construction-engineering/primavera-cloud/)). Omgekeerd noemt **Oracle's eigen Communications-portfolio Primavera of projectmanagement helemaal niet** — dat gaat over 5G core, monetization, signaling en orchestration, met klanten Dish Network, Rakuten, Vivo en Vodafone ([Oracle Communications](https://www.oracle.com/industries/communications/)). Oracle verkoopt dus twee keer aan dezelfde telecomklant zonder de planningskant te koppelen.
12. **Deltek Acumen (Fuse/Risk/360/Touchstone)** — schemadiagnostiek en forensiek; **meer dan 600 branchemetrieken die normen van DCMA, DOE, GAO, NASA en AACE dekken**, met integratie op Deltek Open Plan, Oracle Primavera P6, Microsoft Project, Phoenix Project Manager en Asta Powerproject ([Deltek Acumen](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)).

**Laag 5 — telecom-specifieke uitrolplatforms (de eigenlijke winnaars in telecomuitrol)**
13. **Sitetracker** — asset lifecycle management voor telecom, glasvezel, draadloos, torens, **datacenters** en ruimte/satelliet, plus energietransitie; vier kerncapaciteiten (site management, project management, financial management, field work management). Genoemde klanten: **BT, AT&T, T-Mobile, Vodafone, Southern Company, RWE, Engie, Ericsson** ([Sitetracker](https://www.sitetracker.com/)).
14. **IQGeo** — geospatiale netwerkmanagementsuite over plan/design/build/operate; klanten **Brightspeed, Deutsche Telekom, AT&T, Bell, Virgin Media O2, CityFibre, Deutsche Glasfaser**; claims van 50–90% minder plannings-/ontwerpinspanning, 3–4 weken snellere time-to-market, 33% lagere engineeringkosten en 30% betere first-time-right ([IQGeo](https://www.iqgeo.com/)).
15. **Render Networks** — "system of execution" voor kritieke infrastructuur; **klanten zetten netwerken gemiddeld 15% sneller uit**, sommige klanten **reduceerden projectadministratie-headcount met 50% of meer**; 30+ operators waaronder Lumen, nbn, Shentel en Colorado Springs Utilities, met nadruk op BEAD-gefinancierde breedbandprojecten ([Render Networks](https://rendernetworks.com/)).
16. **Vitruvi, VETRO FiberMap, 3-GIS** — vergelijkbare niche (kon in deze sessie niet worden opgehaald: vitruvi.com gaf HTTP 429).

**Laag 6 — open source**
17. **ProjectLibre** — gratis en open source, met CPM-scheduling, Gantt, netwerkdiagrammen en WBS; **8,2+ miljoen gebruikers en meer dan 8.200.000 downloads van de Community Edition in 193 landen** ([ProjectLibre](https://www.projectlibre.com/)).
18. **OpenProject** (GPL v3), **LibrePlan** (AGPL), **TaskJuggler** (GPL) — de erkende open-source-CPM-familie ([Wikipedia, Comparison of project management software](https://en.wikipedia.org/wiki/Comparison_of_project_management_software)).

### 2.2 Wie gebruikt wat

| Rol | Typische tools | Toelichting |
|---|---|---|
| **Opdrachtgever/operator** (BT, DT, AT&T, Vodafone) | Clarity of ServiceNow SPM voor portfolio; Sitetracker/IQGeo voor uitrol; Smartsheet/Excel voor programmarapportage | De operator wil *volumes en dekking* zien, geen kritiek pad. IQGeo noemt DT, AT&T, Bell en Virgin Media O2 als klant ([IQGeo](https://www.iqgeo.com/)); Sitetracker noemt BT, AT&T, T-Mobile, Vodafone ([Sitetracker](https://www.sitetracker.com/)). |
| **Hyperscaler/colo als bouwheer** (datacenter) | Primavera P6 of MS Project + BIM/4D; Procore/Aconex voor documentbeheer | Dit is bouw, niet IT — bouwheren eisen hier wél CPM. |
| **Hoofdaannemer netwerkuitrol** (Ericsson, Nokia, civiele partijen) | Eigen deployment-platform (Ericsson Intelligent Deployment), plus het platform van de klant, plus MS Project voor het programma | Ericsson claimt 50% snellere time-to-market en 99% first time right ([Ericsson](https://www.ericsson.com/en/network-services)). |
| **Onderaannemer/graafploeg** | Werkorders op mobiel (Render, Sitetracker Field, Vitruvi); Excel | Vrijwel nooit een eigen planningstool: te duur, te complex. Render meldt dat sommige klanten hun projectadministratie-headcount met >50% verlaagden ([Render](https://rendernetworks.com/)). |
| **Softwareteam / product** | Jira (Standard/Premium), Azure DevOps, Linear | Jira Premium is het niveau met "advanced roadmaps" ([Atlassian](https://www.atlassian.com/software/jira/pricing)). |
| **Enterprise-IT-PMO** | Clarity / Planview / ServiceNow SPM + MS Project | De hybride 42% uit het State of Agile-rapport ([digital.ai](https://digital.ai/state-of-agile/)). |
| **Engineeringbureau/consultancy** (netwerkontwerp, DC-engineering) | P6 + Acumen Fuse voor schemakwaliteit; IQGeo/GIS voor netwerkontwerp | Acumen dekt DCMA/DOE/GAO/NASA/AACE-metrieken ([Deltek](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)). |

---

## 3. Wat ervoor betaald wordt

### 3.1 Geverifieerde lijstprijzen

**Atlassian Jira Cloud** (opgehaald uit de JSON-LD structured data op de prijspagina, juli 2026 — [atlassian.com/software/jira/pricing](https://www.atlassian.com/software/jira/pricing)):

| Plan | Prijs | Notities |
|---|---|---|
| Free | USD 0 | max. 10 gebruikers, 2 GB opslag |
| Standard | **USD 7,91 per gebruiker/maand** | max. 50.000 gebruikers, 250 GB |
| Premium | **USD 14,54 per gebruiker/maand** | *"Includes advanced roadmaps, sandbox environments, release tracks, IP allowlisting, unlimited storage, and 24/7 Premium support"* — dit is het niveau waarop cross-project planning zit |
| Enterprise | op aanvraag | inclusief Atlassian Guard Standard ([Atlassian licensing](https://www.atlassian.com/licensing/cloud)) |

Maandelijkse facturering kent progressieve staffels. Atlassian's eigen voorbeeld voor Jira Cloud Standard met 450 seats: **USD 8,60/gebruiker voor seats 1–100, USD 7,30 voor 101–250, USD 6,10 voor 251–450 — totaal USD 3.175,00 per maand, gemiddeld USD 7,06 per gebruiker**. Bestellingen boven USD 10.000 kunnen op Net-30-voorwaarden ([Atlassian Cloud licensing](https://www.atlassian.com/licensing/cloud)).

**Typische contractwaarde Jira [SCHATTING]:** een telecomoperator met 3.000 engineering-seats op Premium betaalt 3.000 × USD 14,54 × 12 ≈ **USD 523.000 per jaar** aan lijstprijs, in de praktijk met enterprise-korting eerder USD 300.000–400.000. Jira Align komt daar bovenop en heeft geen gepubliceerde prijs ([Atlassian](https://www.atlassian.com/software/jira/align)).

**Microsoft Project** ([Microsoft vergelijkingspagina](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software)):
- Project Standard 2024: **USD 679,99 eenmalig**
- Project Professional 2024: **USD 1.129,99 eenmalig**
- Project Server Subscription Edition: via partner, geen publieke prijs
- De cloudplannen (Planner Plan 1, Planner and Project Plan 3, Plan 5) worden op deze pagina genoemd maar **zonder prijs**; de prijspagina's van Microsoft renderen volledig client-side en gaven bij zowel WebFetch als `curl` géén bedragen prijs. Ik neem hier bewust geen bedrag op dat ik niet kon verifiëren.

**Smartsheet** (uitgelezen uit de HTML-prijsblokken van [smartsheet.com/pricing](https://www.smartsheet.com/pricing), USD-blok):
- Pro: **USD 12 per member/maand** bij maandelijkse facturering, **USD 9** bij jaarlijkse; 1–10 members, onbeperkte contributors; 250 automatiseringen/maand
- Business: **USD 24 per member/maand** maandelijks, **USD 19** jaarlijks; minimaal 3 members; onbeperkte automatiseringen, timeline view, workload tracking, 1 TB opslag
- Enterprise: custom, minimaal 10 members; portfolios, scenario planning, SAML SSO
- Advanced Work Management: custom; Control Center, Dynamic View, Data Shuttle, Connectors, DataMesh

**Oracle Primavera — cloud, UK-overheidsraamwerk G-Cloud 14** (document BD.G14.OCS.002 v1.0, mei 2024, gepubliceerd via [applytosupply.digitalmarketplace.service.gov.uk](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/search?q=primavera+p6)):

| Dienst | Prijs per hosted named user/maand | Minimum |
|---|---|---|
| Primavera P6 EPPM Cloud Service | **£220** | 25 users |
| P6 Progress Reporter Cloud Service | £24 | geen |
| P6 EPPM Web Services Cloud Service | £36 | geen |
| P6 EPPM **UK Government** Cloud Service | £439 | 50 users |
| Unifier Project Controls Cloud Service | £132 | 25 users |
| Unifier Project Controls met NEC4 | £180 | 25 users |
| Unifier **Earned Value Management** add-on | £44 | 5 users |
| Unifier Portal User | £2 | 100 users |
| Unifier Team for External Collaborators | £44 | 10 users |
| AutoVue 2D Professional (prerequisite) | £12 | matcht Unifier-users |

Volumekortingen: **10% bij 101–200 users, 15% bij 201–500, 20% bij 501–1000, 25% bij 1001+**.

**Oracle Primavera Cloud (OPC) — reseller-lijstprijzen, mei 2024** (RPC pricing document):

| Module | Lijstprijs per hosted named user/maand | Min. | Bij 1001+ users |
|---|---|---|---|
| Primavera **Schedule** Cloud Service (incl. Task & Progress) | **£96** | 5 | £72 |
| Primavera Task Management | £44 | 5 | £33 |
| Primavera Progress | £10 | 5 | £7,50 |
| Primavera **Portfolio Planning** | £176 | 5 | £132 |

**Oracle Primavera — jaarprijzen via een UK-reseller, effectief 30 april 2024** (th3rdcurve Ltd, met volumekorting inbegrepen en 10% extra korting bij ≥100 licenties per product):
- OPC Schedule (incl. Progress en Task Management): **£950 per licentie per jaar**, min. 5
- OPC add-ons (Capital Planning, Cost Controls, Facility Management, Project Delivery Management, Real Estate Management): **£7.549 per licentie per jaar**, min. 1
- P6 EPPM (incl. Progress Reporter en Data Access): **£358** per licentie/jaar (min. 1) of **£2.185** (min. 25)
- Primavera Analytics add-on: £795/jaar; Virtual Desktop: £9.932/jaar; extra non-productie-omgeving: **£39.332/jaar**
- Unifier Facilities and Asset Management (incl. Earned Value Management en Data Access): £1.311/jaar, min. 25

**Oracle Primavera — eeuwigdurende licenties, Oracle Construction & Engineering Global Price List (10 november 2016; laatste publiek beschikbare volledige lijst die ik kon extraheren)**:

| Product | Licentieprijs (USD) | Jaarlijkse support (USD) | Metric |
|---|---|---|---|
| Primavera P6 Enterprise PPM | 2.750 | 605,00 | Application User |
| Primavera P6 Professional Project Management | 2.500 | 550,00 | Application User |
| Primavera P6 Progress Reporter | 950 | 209,00 | Application User |
| Primavera **Earned Value Management** | 10.000 | 2.200,00 | Application User |
| Primavera **Risk Analysis** | 9.500 | 2.090,00 | Application User |
| Primavera Analytics | 2.000 | 440,00 | Application User (min. 25) |
| Primavera Portfolio Management | 2.900 | 638,00 | Application User (min. 50) |
| Primavera Contractor | 1.295 | 285,00 | Application User |
| Primavera Unifier Project Controls | 3.950 | 869,00 | Application User (min. 25) |
| Instantis EnterpriseTrack | 20.000 | 4.400,00 | Application User (min. 5) |
| Primavera Gateway | 500 | 110,00 | Application User (min. 10) |

Termijnlicenties: **1 jaar = 20% van de lijstprijs, 2 jaar 35%, 3 jaar 50%, 4 jaar 60%, 5 jaar 70%**; support = **22% van de eeuwigdurende lijstprijs**. Cloudprijzen in dezelfde lijst (maandabonnement per hosted named user): P6 EPPM Cloud USD 125 (min. 25), Progress Reporter USD 12, Oracle Prime Projects USD 150, Prime Portfolios USD 125, Instantis EnterpriseTrack USD 80. Bron: Oracle Construction & Engineering Global Price List, 10-NOV-2016 (Texas DIR-TSO-2539), geëxtraheerd uit de PDF.

**Werkbeheer-alternatieven** (relevant omdat ze in deze sector concurreren om hetzelfde budget):

| Product | Prijs | Bron |
|---|---|---|
| Wrike Team | USD 10 per gebruiker/maand | [wrike.com/price](https://www.wrike.com/price/) |
| Wrike Business | USD 25 per gebruiker/maand | idem |
| Asana Starter | USD 10,99 (jaarlijks) / USD 13,49 (maandelijks) | [asana.com/pricing](https://asana.com/pricing) |
| Asana Advanced | USD 24,99 (jaarlijks) / USD 30,49 (maandelijks) | idem |
| monday.com Basic | USD 9 per seat/maand (jaarlijks), min. 10 seats | [monday.com/pricing](https://monday.com/pricing) |
| monday.com Standard | USD 12 per seat/maand (jaarlijks) | idem |
| monday.com Pro | USD 19 per seat/maand (jaarlijks) | idem |

**Open source / low-cost referentiepunten:**

| Product | Prijs | Bron |
|---|---|---|
| OpenProject Community | Gratis, GPL v3 | [openproject.org/pricing](https://www.openproject.org/pricing/) |
| OpenProject Basic | € 5,95 per gebruiker/maand, min. 25 users | idem |
| OpenProject Professional | € 10,95 per gebruiker/maand, min. 25 | idem |
| OpenProject Premium | € 15,95 per gebruiker/maand, min. 100 | idem |
| OpenProject **BIM add-on** | **€ 1 per gebruiker/maand** | idem |
| ProjectLibre Desktop | Gratis, open source | [projectlibre.com](https://www.projectlibre.com/) |

Die **€ 1 per gebruiker per maand voor de BIM-module van OpenProject** is een belangrijk ankerpunt: de markt prijst "IFC-functionaliteit bovenop een planner" op vrijwel nul.

### 3.2 Implementatie- en trainingskosten

Geen enkele leverancier publiceert hier bedragen. Wat wél vaststaat:
- Oracle-resellers verkopen implementatie als aparte dienst met rate card: *"We offer a complete implementation service, which includes advice and support on set up and planning, data migration, quality assurance and performance testing, training and ongoing support"* (th3rdcurve pricing document, april 2024).
- Oracle biedt twee supportniveaus: **Sustaining** (support zonder patches/upgrades) en **Premier** (24/7 plus alle patches, bugfixes en upgrades), met prijzen die variëren per product, aantal gebruikers en looptijd (th3rdcurve, april 2024).
- Op het Britse G-Cloud-raamwerk staan 68 diensten die "primavera p6" noemen, waarvan meerdere pure implementatie- en supportdiensten (o.a. Hyde Park Solutions: "Configure Primavera P6 EPPM", "Support for Primavera Applications") ([G-Cloud zoekresultaat](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/search?q=primavera+p6)). Dat 68 diensten om één product heen bestaan illustreert dat de dienstenmarkt rond P6 groter is dan de licentiemarkt.
- **[SCHATTING]** vuistregel uit de bredere markt: implementatie plus training kost bij een enterprise-PPM-uitrol typisch **1× tot 3× de eerstejaars licentiewaarde**; bij een pure CPM-planner (P6, MS Project) eerder **0,5× tot 1,5×**, omdat de configuratie beperkter is. Dit is een eigen schatting, niet gebronde.

### 3.3 Betalingsbereidheid: gesplitst en tegendraads

**Hoog — maar niet voor plannen:**
- Deze sector betaalt zonder morren **USD 14,54 per gebruiker per maand** voor Jira Premium ([Atlassian](https://www.atlassian.com/software/jira/pricing)) over duizenden seats, wat Atlassian USD 5,2 miljard jaaromzet oplevert ([stockanalysis.com](https://stockanalysis.com/stocks/team/financials/)). De bereidheid ligt bij *workflow, traceerbaarheid en developer-adoptie*, niet bij planningsalgoritmiek.
- Voor uitrolplatforms (Sitetracker, IQGeo) is de bereidheid hoog omdat die direct aan capex-governance en subsidieverantwoording hangen; IQGeo verkoopt op harde ROI-claims (33% lagere engineeringkosten, 3–4 weken snellere time-to-market — [IQGeo](https://www.iqgeo.com/)).
- Datacenterbouwheren betalen P6-tarieven (£220/user/maand op G-Cloud-lijst) omdat één maand vertraging op een project van USD 1,13 miljard (100 MW × USD 11,3 mln/MW, [JLL](https://www.jll.com/en-us/insights/market-outlook/data-center-outlook)) de licentiekosten duizendvoudig overtreft.

**Laag — en structureel laag:**
- Voor een *aparte* CPM-planningstool bij softwareorganisaties is de bereidheid vrijwel nul. De cultuur beschouwt Gantt-planning als anti-agile; het budget zit al in Jira; en de meetbare pijn is budget/waarde, niet tijd (McKinsey: 7% tijdsoverschrijding tegen 45% budget en 56% waardeverlies — [McKinsey](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/delivering-large-scale-it-projects-on-time-on-budget-and-on-value)).
- Onderaannemers in de glasvezeluitrol betalen niets: zij krijgen werkorders op het platform van de opdrachtgever geduwd.
- Er is een sterke open-source-tolerantie: ProjectLibre claimt *"Trusted by 8.2 M+ users"* en *"Downloaded Over 8,200,000"* in 193 landen ([ProjectLibre](https://www.projectlibre.com/)) precies omdat de IT-sector geen probleem heeft met zelf installeren en zonder support werken. **[VERIFICATIE-VOORBEHOUD]** dit zijn niet twee metrieken maar één: ProjectLibre stelt downloads gelijk aan gebruikers (8,2 mln = 8,2 mln). Het is een leverancierszelfclaim over *cumulatieve downloads*, geen meting van actieve gebruikers; lees het als een adoptie-indicatie, niet als installed base.

**Netto oordeel:** de betalingsbereidheid in deze sector is **hoog per seat maar laag per planningsfunctie**. Wie hier een planner wil verkopen moet dat doen als onderdeel van een workflow die iemand anders al betaalt (uitrolplatform, PPM-suite, bouwprogramma), niet als losstaande scheduler.

---

## 4. Hoe groot is dit segment?

### 4.1 Top-down anker (analistendata)

**Primaire bron:** Mordor Intelligence, Project Portfolio Management Market:
- Marktomvang **USD 6,90 miljard in 2025**, groeiend naar **USD 13,21 miljard in 2031**, **CAGR 11,43% (2026–2031)**
- **IT en telecom nam 35,60% van de omzet in 2025** — het grootste verticale aandeel
- Cloud was 69,45% van de omzet in 2025 en groeit met 16,85% CAGR
- Top-5 leveranciers: Oracle, Microsoft, SAP, ServiceNow, Broadcom (CA PPM/Clarity); marktconcentratie "medium"
- Snelst groeiende verticale: healthcare & life sciences, 13,58% CAGR
([Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market))

**Berekening:** 0,3560 × USD 6,90 miljard = **USD 2,456 miljard voor IT & telecom in 2025**.
Doorgetrokken bij gelijkblijvend aandeel en 11,43% CAGR:
- 2026: ≈ **USD 2,74 miljard** **[SCHATTING op basis van Mordor-CAGR]**
- 2031: 0,3560 × USD 13,21 miljard ≈ **USD 4,70 miljard** **[SCHATTING, aanname: constant verticaal aandeel]**

**Tweede anker:** The Business Research Company, Project Management Software Global Market Report: **USD 9,14 miljard (2025) → USD 10,51 miljard (2026) → USD 16,87 miljard (2030)**, CAGR 14,9% (2025–2026) en 12,6% (2026–2030); Noord-Amerika grootste regio, Azië-Pacific snelst groeiend; "IT and Telecom" is één van acht verticale segmenten ([TBRC](https://www.thebusinessresearchcompany.com/report/project-management-software-global-market-report)). Zonder gepubliceerd percentage: bij een aandeel van 30–36% zou IT & telecom hier **USD 3,15–3,78 miljard in 2026** zijn **[SCHATTING]**.

**Derde anker (breder, telecom-specifiek):** Analysys Mason spreekt over **"USD 100 billion annual expenditure on telecoms applications"** ([Analysys Mason Research](https://www.analysysmason.com/research/)) — de totale software-uitgaven van telecomoperators. Planningssoftware is daar een fractie van de fractie van, maar het cijfer geeft de bovengrens van het telecom-IT-budget aan.

### 4.2 Belangrijke waarschuwing bij de analistencijfers

Deze markten zijn **niet consistent afgebakend**. Atlassian alleen boekte in FY2025 al USD 5,215 miljard omzet ([stockanalysis.com](https://stockanalysis.com/stocks/team/financials/)) — ~~meer dan de gehele "PPM-markt" van Mordor (USD 6,90 miljard)~~ **REKENFOUT, gecorrigeerd bij verificatie:** USD 5,215 mrd is **niet** meer dan USD 6,90 mrd; het is **76%** van Mordors hele PPM-markt. Wel correct: het is **57%** van TBRC's "project management software"-markt (USD 9,14 miljard) — één leverancier is dus goed voor ruim de helft van wat als de hele markt wordt geteld. Agile-werkbeheer wordt door analisten dus grotendeels **buiten** de PPM/PM-softwaremarkt gehouden. Wie een realistisch beeld wil van wat IT/software/telecom aan planningsachtige software uitgeeft, moet beide optellen.

**Mijn gecombineerde schatting voor "planning- en werkbeheersoftware gekocht door de IT/software/telecom-verticale, 2026": USD 5–8 miljard [SCHATTING].** Opbouw:
- PPM-kern in deze verticale (Mordor-doorrekening): ≈ USD 2,7 miljard
- Agile werkbeheer in deze verticale: Atlassian FY2025 USD 5,2 miljard, waarvan **[SCHATTING]** 30–40% uit software-/tech-/telecombedrijven → USD 1,6–2,1 miljard; plus Azure DevOps, Asana, monday, Smartsheet, Wrike, Linear in dezelfde verticale → nog eens **[SCHATTING]** USD 0,8–2,5 miljard
- Telecom-specifieke uitrolplatforms (Sitetracker, IQGeo, Render, Vitruvi, VETRO, 3-GIS): **[SCHATTING]** USD 0,4–0,8 miljard (private bedrijven, geen gepubliceerde omzet)

### 4.3 Bottom-up: hoe groot is de *CPM-planning*-kern? (de OPS-relevante slice)

Dit is het cijfer dat er voor een IFC-gebaseerde CPM-planner werkelijk toe doet. **Alles hieronder is [SCHATTING] met expliciete aannames.**

**Stap 1 — schedule-gestuurd capexvolume binnen de sector:**

| Bron van werk | Jaarlijkse waarde | Herleiding |
|---|---|---|
| Mobiele netwerkuitrol | ≈ USD 186 mld/jaar | GSMA: USD 1,3 bln over 2024–2030 ÷ 7 jaar ([GSMA](https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-economy/wp-content/uploads/2025/02/030325-The-Mobile-Economy-2025.pdf)) |
| … waarvan civiel/site-werk dat CPM-achtig gepland wordt | ≈ USD 90–110 mld/jaar | **[SCHATTING]**: aanname 50–60%; rest is spectrum, core, IT, software |
| Vaste/glasvezeluitrol (wereldwijd) | ≈ USD 40–60 mld/jaar | **[SCHATTING]** geëxtrapoleerd uit FTTH Council: 23 mln extra premises passed per jaar in EU39 ([FTTH Council](https://www.ftthcouncil.eu/)) × indicatief € 300–700/premise, opgeschaald naar wereldschaal |
| Datacenterbouw | ≈ USD 226 mld/jaar | JLL: ~100 GW over 2026–2030 × USD 11,3 mln/MW ÷ 5 jaar ([JLL](https://www.jll.com/en-us/insights/market-outlook/data-center-outlook)) |
| **Totaal schedule-gestuurd** | **≈ USD 356–396 mld/jaar** | |

**Stap 2 — plannerspopulatie [SCHATTING]:**

Vuistregel: in kapitaalintensieve programma's is er grofweg **één toegewijde planner per USD 30–60 miljoen aan jaarlijks beheerd bouwvolume**, opdrachtgevers- en aannemerszijde samen. Telecomuitrol is repetitiever en heeft dus mínder planners per euro; datacenterbouw is complexer en heeft er méér.

| Groep | Geschat aantal CPM-plannerseats |
|---|---|
| Telecomnetwerk-uitrolplanners (operator + hoofdaannemer) | 4.000 – 7.000 |
| Datacenterbouwplanners (bouwheer, GC, MEP, PMC) | 8.000 – 14.000 |
| IT-infra-/migratieprogrammaplanners (MS Project, Clarity-gekoppeld) | 15.000 – 30.000 |
| Engineering-/adviesbureaus die deze sectoren bedienen | 3.000 – 5.000 |
| **Totaal** | **30.000 – 56.000 seats** |

**Stap 3 — waarde per seat [SCHATTING]:**
Gewogen gemiddeld jaarlijks licentie + support per CPM-seat, gegeven de mix (veel MS Project-perpetual, geamortiseerd ≈ USD 250/jaar; minder P6-cloud aan G-Cloud-lijstprijs £220/maand ≈ USD 3.350/jaar maar in de praktijk 25–50% korting): **USD 600 – 1.400 per seat per jaar**.

**Stap 4 — segmentomvang van pure CPM-planningslicenties:**
- Ondergrens: 30.000 × USD 600 = **USD 18 miljoen/jaar**
- Bovengrens: 56.000 × USD 1.400 = **USD 78 miljoen/jaar**
- Plus schema-analytics (Deltek Acumen), risico (Primavera Risk Analysis USD 9.500 lijstprijs eeuwigdurend + USD 2.090 support, Safran, @Risk) en 4D: **[SCHATTING]** +USD 12–35 miljoen
- **→ USD 30 – 110 miljoen per jaar aan CPM-planningslicenties in IT/software/telecom [SCHATTING]**

Inclusief implementatie, training en planning-as-a-service (2–4× licentiewaarde, zie §3.2) komt het totaal toegankelijke jaarbedrag op **USD 100 – 400 miljoen [SCHATTING]**.

### 4.4 De conclusie die dat oplevert

| Afbakening | Omvang | Jaar | Zekerheid |
|---|---|---|---|
| PPM-markt, IT & telecom verticaal | **USD 2,46 mld** | 2025 | Hoog (Mordor: 35,60% × USD 6,90 mld) |
| Idem, doorgetrokken | USD 2,74 mld | 2026 | Middel **[SCHATTING]** |
| Idem, 2031 bij constant aandeel | USD 4,70 mld | 2031 | Laag **[SCHATTING]** |
| Alle planning-/werkbeheersoftware in deze verticale | USD 5–8 mld | 2026 | Laag **[SCHATTING]** |
| **Pure CPM-planningslicenties in deze verticale** | **USD 30–110 mln** | 2026 | Laag **[SCHATTING]** |

**Groeirichting: sterk positief, maar de groei zit niet in CPM.** De PPM-markt groeit met 11,43% CAGR ([Mordor](https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market)) en de bredere PM-softwaremarkt met 12,6% (2026–2030) ([TBRC](https://www.thebusinessresearchcompany.com/report/project-management-software-global-market-report)). De grootste absolute groeiaanjager binnen déze sector is echter **datacenterbouw**: circa USD 3 biljoen investering tot 2030 ([JLL](https://www.jll.com/en-us/insights/market-outlook/data-center-outlook)) is bouwwerk dat per definitie met CPM én met BIM wordt gestuurd. Dat is de enige plek in deze sector waar de CPM-planningsmarkt structureel groeit.

---

## 5. Sector-specifieke eisen en standaarden

### 5.1 EVMS / ANSI-EIA-748 — geldt hier maar half

- **Waar het wél geldt:** Amerikaanse federale IT- en telecomcontracten. De Defense Contract Management Agency is het DoD-uitvoeringsorgaan voor earned value management systems en voert contractor surveillance uit om te waarborgen dat gerapporteerde prestatiegegevens de programmastatus correct weergeven ([GAO-16-89G Schedule Assessment Guide, december 2015, appendix VII](https://www.gao.gov/products/gao-16-89g)). DCMA toetst daarbij expliciet twee ANSI/EIA-748-richtlijnen: *"Schedule the authorized work to describe the sequence of work and identify significant task interdependencies"* en *"Identify physical products, milestones, technical performance goals, or other indicators that will be used to measure progress"* (GAO-16-89G).
- **Waar het níet geldt:** commerciële telecomoperators en softwarebedrijven passen EVMS vrijwel nooit toe. Er is geen tegenhanger van de defensie-EVMS-verplichting in de commerciële telecom.
- **Prijssignaal:** Oracle prijst Earned Value Management als een dure, aparte module — USD 10.000 licentie + USD 2.200 jaarlijkse support per Application User (Oracle C&E Global Price List, 2016), of £44 per user/maand als Unifier-add-on op G-Cloud 14 (mei 2024). Dat is niet toevallig: EVMS-kopers zijn overheids- en defensiegerelateerd en accepteren die prijs.
- **[SCHATTING/ONBEVESTIGD]** de vaak genoemde DoD-drempelbedragen voor EVMS-toepasselijkheid (orde USD 20 mln voor gereduceerde en USD 50 mln voor volledige toepassing) kon ik in deze sessie niet uit een primaire bron verifiëren — acq.osd.mil gaf HTTP 503, dcma.mil HTTP 404. Behandel die bedragen als onbevestigd.

### 5.2 DCMA 14-Point Assessment

Geverifieerde volledige lijst, uit GAO-16-89G appendix VII (die naar DCMA-document *Overview: 14 Point Assessment, EVC-104_Rev 1* verwijst):

1. Logic
2. Leads
3. Lags
4. Relationship types
5. Hard constraints
6. High float
7. Negative float
8. High duration
9. Invalid dates
10. Resources
11. Missed tasks
12. Critical path test
13. Critical path length index (CPLI)
14. Baseline execution index (BEI)

GAO citeert één drempel expliciet: *"no more than 5 percent of remaining tasks should be missing predecessor or successor logic"*. Cruciale nuance uit dezelfde bron: **"DCMA's 14PA thresholds are not compliance triggers. Rather, they are used as a starting point toward an objective analysis of the schedule."** Verdere DCMA-referenties in GAO-16-89G: DCMA-INST 208 (EVMS Compliance Reviews, 9 april 2014), EVC-101_Rev11 / EVC-102_Rev8 / EVC-103_Rev7 (IMS assessment guides), EVC-106_Rev2 (Schedule Margin Position Paper) en EVC-100_Rev1 (Finding the Critical Path, 20 november 2012).

Verschillen tussen GAO en DCMA (uit dezelfde appendix): DCMA staat **onbeperkt gebruik van zachte datumconstraints** toe waar GAO die wil minimaliseren en verantwoorden; DCMA schrijft geen schedule basis document of narratief voor; en **DCMA beoordeelt geen schedule risk analysis tenzij het contract die eist**, omdat SRA geen deel uitmaakt van de EVMS-richtlijnen.

### 5.3 GAO-16-89G — tien best practices voor een betrouwbaar schema

Volledige lijst, geëxtraheerd uit de gids zelf ([GAO-16-89G, december 2015](https://www.gao.gov/products/gao-16-89g)):

1. **Capturing all activities** — alle activiteiten uit de WBS, van zowel opdrachtgever als aannemers
2. **Sequencing all activities** — logisch gelinkt; *"Date constraints and lags should be minimized and justified"*
3. **Assigning resources to all activities** — arbeid, materiaal, reizen, faciliteiten, materieel, plus beperkingen op financiering of tijd
4. **Establishing the duration of all activities** — realistisch, kort en betekenisvol genoeg voor discrete voortgangsmeting
5. **Verifying that the schedule can be traced horizontally and vertically** — hand-offs tussen activiteiten én consistentie tussen schemaniveaus
6. **Confirming that the critical path is valid** — het pad van langste duur; bepaalt de vroegst mogelijke einddatum
7. **Ensuring reasonable total float** — *"Unreasonably high total float on an activity or path indicates that schedule logic might be missing or invalid"*
8. **Conducting a schedule risk analysis** — statistische simulatie voor betrouwbaarheidsniveau en tijdreserve
9. **Updating the schedule using actual progress and logic** — met de expliciete eis dat de bijwerkers *getraind moeten zijn in critical path method scheduling*
10. **Maintaining a baseline schedule** — onder configuratiebeheer, met een basis-document dat aannames, constraints, lags en lange duren verantwoordt

Deze tien punten zijn de meest bruikbare functionele specificatie die publiek beschikbaar is voor "wat een serieuze planner moet kunnen".

### 5.4 AACE-praktijken

Deltek Acumen adverteert dat het schema's toetst aan **meer dan 600 branchemetrieken die normen van DCMA, DOE, GAO, NASA en AACE dekken** ([Deltek Acumen](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)). AACE's eigen pagina met Recommended Practices leverde geen doorzoekbare RP-catalogus op ([AACE](https://web.aacei.org/resources/publications/recommended-practices)); ik noem daarom bewust géén specifieke RP-nummers als feit. Praktisch relevant voor deze sector zijn de AACE-praktijken rond schemaniveaus (Level 1–5), forensische roosteranalyse en schemarisicoanalyse — **[ONBEVESTIGD in deze sessie qua RP-nummering]**.

### 5.5 Certificering

De PMI Scheduling Professional (PMI-SP) is de sectoronafhankelijke plannerscertificering. Domeinverdeling van het examen: Schedule Strategy 14%, **Schedule Planning and Development 31%**, **Schedule Monitoring and Controlling 35%**, Schedule Closeout 6%, Stakeholder Communications Management 14% (PMI-SP Exam Content Outline, ©2012 Project Management Institute). Dat 66% van het examen over ontwikkelen én monitoren/beheersen gaat, onderstreept dat het beroep om baselines en updates draait — precies wat agile tools niet doen.

### 5.6 Verplichte leveringsformaten

| Deelsector | Feitelijk verplicht formaat |
|---|---|
| Datacenterbouw (EPC/GC-contracten) | **P6 XER of P6 XML**, soms MPP; native bestand plus PDF-lay-out. Dit volgt de bouwsectorpraktijk. |
| Telecom-uitrolprogramma's | Zelden een schemabestand. Wél: **CSV/Excel-uitroltrackers**, GIS-formaten (shapefile, GeoJSON, KML) en steeds vaker directe invoer in het platform van de opdrachtgever (Sitetracker, IQGeo, Render). |
| Amerikaanse federale IT/defensie | **IPMDAR** (Integrated Program Management Data and Analysis Report), met het schema als native bestand plus JSON/XML-dataset. De DoD-bronpagina was niet toegankelijk (HTTP 503) — **[ONBEVESTIGD in deze sessie]**. |
| Softwareontwikkeling | Geen. Er bestaat geen leveringsformaat voor een sprintplanning. |
| BIM/openBIM in datacenterbouw | **IFC 4.3.2.0 = ISO 16739-1:2024**, met meer dan 1300 entiteiten en circa 2500 properties, uitgebreid naar bruggen, havens, waterwegen en spoor ([buildingSMART](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/)) |

**Belangrijke observatie voor een IFC-planner:** buildingSMART's eigen IFC-pagina noemt **geen scheduling/4D, geen `IfcTask`/`IfcWorkSchedule`, en geen telecom-, datacenter- of nutsnetwerk-domein** ([buildingSMART](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/)). De uitbreiding naar infra dekt bruggen/havens/waterwegen/spoor — **niet telecomnetwerken**. IFC dekt dus wél de datacenter-*gebouwschil* en installaties, maar niet het glasvezel- of mastennetwerk. Dat is een harde grens voor de positionering.

### 5.7 Audits en claims/forensische analyse

- **Datacenterbouw:** volledige bouwclaimpraktijk — vertragingsanalyse, verstoringsclaims, forensische roosteranalyse. Dit is de enige plek in deze sector waar schema's in rechtszaken belanden.
- **Telecomuitrol:** conflicten gaan zelden over het kritieke pad en meestal over *volumes en kwaliteit per site* (hoeveel sites opgeleverd, hoeveel first-time-right). Vandaar Ericsson's positionering op **"99% first time right build"** ([Ericsson](https://www.ericsson.com/en/network-services)) — dat is de contractuele valuta, niet de einddatum.
- **Software:** vrijwel geen forensische schemaanalyse. Geschillen gaan over scope en acceptatie.
- **Subsidie-audits:** BEAD- en vergelijkbare programma's brengen wel accountantscontrole op besteding en mijlpalen mee; Render Networks positioneert zich expliciet op *"auditable truth across the full asset lifecycle"* met veldgeverifieerd bewijs dat automatisch aan financiële mijlpalen wordt afgestemd ([Render Networks](https://rendernetworks.com/)).

---

## 6. Voor- en nadelen van de gebruikte pakketten in déze sectorcontext

### Atlassian Jira (+ Plans/Advanced Roadmaps, Jira Align)
**Voordelen hier:** onbetwiste adoptie bij engineers, waardoor data actueel is — het grootste enkele voordeel dat een planningstool kan hebben. Uitstekende API en 3.000+ integraties. Prijs per seat (USD 7,91 / 14,54) is voor deze sector triviaal. Jira Align dekt SAFe/Scrum@Scale/LeSS/hybride en wordt door AT&T en NVIDIA gebruikt ([Atlassian](https://www.atlassian.com/software/jira/align)).
**Nadelen hier:** Atlassian's eigen featurelijst voor Jira noemt *"Roadmaps and timelines"*, *"Backlog management"* en *"Advanced roadmaps (Premium)"* — maar **geen kritiek pad, geen total float, geen kalenders, geen resource-levelling, geen baselines in CPM-zin** ([Atlassian JSON-LD featureList](https://www.atlassian.com/software/jira/pricing)); de roadmap-featurepagina noemt eveneens geen critical path, float, resource levelling of baselines ([Atlassian roadmaps](https://www.atlassian.com/software/jira/features/roadmaps)). **[INFERENTIE uit afwezigheid, niet uit een expliciete ontkenning]**: Jira Plans is een capaciteits- en afhankelijkheidsvisualisatie, geen netwerkplanner. Voor een glasvezelprogramma met vergunningsdoorlooptijden en ploegcapaciteit is dat onbruikbaar. Ook: geen werkkalenders met feestdagen/ploegendiensten, geen kosten/EVM, en geen exportformaat dat een aannemer accepteert.

### Microsoft Project (desktop + Planner/Project cloud)
**Voordelen hier:** iedereen kan het openen; echte CPM met kalenders, baselines en resource-levelling; goedkoop bij eenmalige aanschaf (USD 679,99 / 1.129,99 — [Microsoft](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software)); zit al in de Microsoft-inkoopovereenkomst van vrijwel elke IT-organisatie.
**Nadelen hier:** desktopgebonden in een sector die cloud-first is; slechte samenwerking op één bestand; schaalt slecht boven ~5.000 taken; Project Server/Project Online vergt een partner en heeft geen publieke prijs; en de MPP-uitwisseling met P6 is notoir lossy. Voor duizenden bijna-identieke uitrolsites is het model (één taakregel per activiteit) domweg het verkeerde datamodel.

### Oracle Primavera P6 / Primavera Cloud
**Voordelen hier:** de enige tool in deze lijst die een datacenterprogramma van tienduizenden activiteiten met resource-loading, meerdere kalenders en baselines aankan. Primavera Cloud voegt CPM plus Last Planner System, PMI-risicoframework met Monte Carlo, centrale resource-pool en lean pull planning toe ([Oracle Primavera Cloud](https://www.oracle.com/construction-engineering/primavera-cloud/)). Contractueel geaccepteerd leveringsformaat.
**Nadelen hier:** (a) **Prijs** — £220 per user/maand op G-Cloud 14 voor P6 EPPM Cloud, met minimum 25 users; £439/user/maand voor de UK-overheidsvariant met minimum 50 users. Dat is 15–30× de Jira-prijs per seat en volstrekt onverkoopbaar aan een softwareorganisatie. (b) **Positionering** — Oracle richt P6 uitsluitend op construction & engineering en noemt IT/telecom niet ([Oracle](https://www.oracle.com/construction-engineering/primavera-p6/)), terwijl Oracle Communications op zijn beurt geen woord aan Primavera wijdt ([Oracle](https://www.oracle.com/industries/communications/)). Oracle laat de brug tussen zijn eigen telecomklanten en zijn eigen planner links liggen. (c) Complexiteit: 68 aparte G-Cloud-diensten bestaan om P6 te implementeren en te ondersteunen ([G-Cloud](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/search?q=primavera+p6)) — dat is geen zelfbedieningsproduct. (d) De volumekortingsstructuur (10/15/20/25%) beloont grote deployments en straft juist de kleine onderaannemer.

### Broadcom Clarity / Planview / ServiceNow SPM
**Voordelen hier:** financiële en capaciteitsplanning op portfolioniveau; sterke integratie met agile teamtools; in het geval van ServiceNow ook koppeling met ITSM/CMDB, wat voor IT-organisaties een reëel voordeel is ([ServiceNow SPM](https://www.servicenow.com/products/strategic-portfolio-management.html)). Planview biedt met AgilePlace, Viz, Hub en AdaptiveWork een expliciet op IT-leiders en PMO's gerichte set ([Planview](https://www.planview.com/products/)).
**Nadelen hier:** het zijn portfolio- en financieringstools, geen planners. De onderliggende taakplanning is zwak; wie een echt kritiek pad wil, exporteert alsnog naar MS Project. Implementaties zijn lang en duur; geen van de drie publiceert prijzen. Broadcom's Clarity-productpagina levert crawlers zelfs geen bruikbare productbeschrijving ([Broadcom](https://www.broadcom.com/products/software/value-stream-management/clarity)), wat symptomatisch is voor de post-acquisitie-aandacht die het product krijgt.

### Smartsheet
**Voordelen hier:** USD 9–19 per member/maand jaarlijks ([Smartsheet](https://www.smartsheet.com/pricing)), spreadsheet-vertrouwd, met timeline view, workload tracking en Control Center voor gestandaardiseerde programma's — precies passend bij repetitieve uitrolprogramma's.
**Nadelen hier:** geen echte CPM-motor (geen float, geen kalendersets, geen resource-levelling), en de Enterprise/Advanced Work Management-tiers hebben geen publieke prijs, wat inkoop bemoeilijkt.

### Sitetracker / IQGeo / Render Networks / Vitruvi
**Voordelen hier:** deze tools zijn gebouwd op het juiste datamodel — *site/asset als eerste-klasobject*, niet *taak*. Ze koppelen veldwerk, financiën en compliance in één keten. IQGeo claimt 50–90% minder plannings-/ontwerpinspanning en 33% lagere engineeringkosten ([IQGeo](https://www.iqgeo.com/)); Render claimt 15% snellere uitrol en >50% minder projectadministratie-headcount ([Render](https://rendernetworks.com/)). Sitetracker heeft de referentielijst die telt: BT, AT&T, T-Mobile, Vodafone, Ericsson ([Sitetracker](https://www.sitetracker.com/)).
**Nadelen hier:** geen CPM. Geen kritiek pad over het programma, geen vertragingsanalyse, geen contractueel schema-deliverable. Ze zijn ook duur en verticaal gesloten: een aannemer die voor drie operators werkt zit in drie verschillende platforms. En voor de datacenterbouwkant zijn ze niet geschikt.

### Deltek Acumen
**Voordelen hier:** de facto standaard voor schemakwaliteitstoetsing, met 600+ metrieken over DCMA/DOE/GAO/NASA/AACE en lees-/schrijftoegang op P6, MS Project, Open Plan, Phoenix en Asta ([Deltek](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)).
**Nadelen hier:** geen publieke prijs, en het is een aanvulling — je hebt eerst een P6- of MSP-licentie nodig. In de commerciële telecom is de vraag naar DCMA-conformiteit bovendien vrijwel nul.

### Open source (ProjectLibre, OpenProject, LibrePlan, TaskJuggler)
**Voordelen hier:** de sector accepteert open source moeiteloos — ProjectLibre haalde 8,2+ miljoen gebruikers en 8,2 miljoen downloads in 193 landen ([ProjectLibre](https://www.projectlibre.com/)). OpenProject biedt een echte GPL v3-community-editie plus een IFC-viewer met BCF-issuebeheer voor **€ 1 per gebruiker/maand** als BIM-add-on ([OpenProject BIM](https://www.openproject.org/bim-project-management/), [pricing](https://www.openproject.org/pricing/)).
**Nadelen hier:** ProjectLibre is een MS-Project-kloon met verouderde UX en zonder cloud-first model. OpenProject heeft Gantt en WBS maar **geen 4D-scheduling gekoppeld aan IFC-elementen** — de eigen BIM-pagina noemt geen 4D of tijdgebonden modelanimatie, en de Revit-integratie staat als "to come soon" ([OpenProject BIM](https://www.openproject.org/bim-project-management/)).

> **CORRECTIE (derde ronde, verificatie).** De oorspronkelijke conclusie hier luidde: *"Er is dus geen open-source pakket dat IFC en CPM daadwerkelijk aan elkaar knoopt. Dat is de belangrijkste bevinding van dit hele rapport voor Open Planner Studio."* **Die bewering is onjuist.** IfcOpenShell/Bonsai (voorheen BlenderBIM, LGPL-3.0) doet precies dat:
> - `ifcopenshell/api/sequence/recalculate_schedule.py` implementeert volgens de eigen docstring *"critical path analysis, using the forward pass and backward pass method"*, berekent `early_start/early_finish/late_start/late_finish`, **total float én free float**, en zet `IsCritical` op taken met nul float ([IfcOpenShell](https://github.com/IfcOpenShell/IfcOpenShell/blob/v0.8.0/src/ifcopenshell-python/ifcopenshell/api/sequence/recalculate_schedule.py)).
> - Dezelfde API-map bevat `add_work_calendar`, `add_work_time`, `assign_lag_time`, `edit_sequence`, `assign_product` (taak↔IFC-element, dus 4D) en `create_baseline` ([IfcOpenShell API sequence](https://github.com/IfcOpenShell/IfcOpenShell/tree/master/src/ifcopenshell-python/ifcopenshell/api/sequence)).
> - De module `src/ifc4d/` bevat tweerichtings-converters: `p62ifc.py` / `ifc2p6.py` (P6 XML), `p6xer2ifc.py` (P6 **XER**), `msp2ifc.py` / `ifc2msp.py` (MS Project), `pp2ifc.py` (Powerproject) en `csv4d2ifc.py` ([IfcOpenShell ifc4d](https://github.com/IfcOpenShell/IfcOpenShell/tree/master/src/ifc4d/ifc4d)).
> - Bonsai zelf noemt "Costing and scheduling" en toont een Gantt-diagram als kernfunctionaliteit ([bonsaibim.org](https://bonsaibim.org/)).
>
> Het gat is dus **niet** "niemand koppelt IFC aan CPM", maar smaller en eerlijker: *er is geen web-/desktop-planner met eigen UI die IFC-native CPM levert buiten een Blender-plug-in om, en OPS' XER/MPP-interop staat tegenover een bestaande LGPL-implementatie in plaats van tegenover een leegte.* Bonsai is bovendien Blender-gebonden (zware installatie, modelleer-UX, geen browserbuild) — dat blijft een reëel onderscheid, maar het is een **UX- en distributieverschil, geen functiegat**.

---

## 7. Openingen: waar zitten de gaten?

### 7.1 De grootste opening: datacenterbouw als "IT-sector met bouwbehoefte"

Dit is het scherpste segment dat dit onderzoek oplevert. Datacenterbouw is:
- **Formeel IT-sector** (opdrachtgevers zijn hyperscalers, colo's en techbedrijven; hun inkoop verloopt via IT/vastgoed, niet via traditionele bouwinkoop)
- **Feitelijk bouwwerk** met echte CPM-behoefte: USD 11,3 miljoen per MW, circa 100 GW tot 2030, USD 3 biljoen totale investering ([JLL](https://www.jll.com/en-us/insights/market-outlook/data-center-outlook))
- **BIM/IFC-gemodelleerd** — de gebouwschil, MEP, koeling en elektrotechniek zitten gewoon in IFC 4.3 / ISO 16739-1:2024 ([buildingSMART](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/))
- **Onderbediend**: Oracle richt P6 op "construction & engineering" zonder datacenters te noemen ([Oracle](https://www.oracle.com/construction-engineering/primavera-p6/)); Sitetracker noemt datacenters wél maar levert geen CPM ([Sitetracker](https://www.sitetracker.com/)); OpenProject heeft IFC maar geen 4D ([OpenProject](https://www.openproject.org/bim-project-management/))

~~**Er bestaat vandaag geen open-source tool die IFC-modellen en een CPM-planning aan elkaar koppelt.**~~ **GECORRIGEERD:** die bewering is weerlegd — IfcOpenShell/Bonsai (LGPL-3.0) heeft een IFC-native CPM-engine (forward/backward pass, total en free float, `IsCritical`), werkkalenders, lag times, baselines, taak↔element-koppeling en P6 XER/P6 XML/MSPDI/Powerproject-import én -export ([IfcOpenShell](https://github.com/IfcOpenShell/IfcOpenShell/tree/master/src/ifcopenshell-python/ifcopenshell/api/sequence), [ifc4d](https://github.com/IfcOpenShell/IfcOpenShell/tree/master/src/ifc4d/ifc4d)). Zie de correctiekader in §6. Het resterende gat voor OPS is **distributie en UX** (browser-first, geen Blender), niet de functionaliteit op zich.

### 7.2 Ontevredenheid en gaten, per gebruikersgroep

**Bij softwareteams en IT-PMO's:**
- Jira Plans/Advanced Roadmaps kan geen kritiek pad, float of kalenders — zichtbaar uit wat Atlassian *niet* claimt in zijn featurelijst ([Atlassian](https://www.atlassian.com/software/jira/pricing), [roadmaps](https://www.atlassian.com/software/jira/features/roadmaps)) **[INFERENTIE]**. De 42% van organisaties met een hybride model ([digital.ai](https://digital.ai/state-of-agile/)) heeft hierdoor structureel een gat tussen hun agile teams en hun mijlpaalverplichtingen.
- Portfoliotools (Clarity, Planview, ServiceNow) rapporteren wel maar plannen niet; de "echte" planning gebeurt in een MPP-bestand op iemands laptop.
- **Opening:** een lichte, web-native CPM-motor die uit Jira-data een echt netwerkschema afleidt en teruglevert. OPS's browserbuild (productie-deployment via `live.yml`) past hier structureel beter dan een desktop-installer.

**Bij telecom-uitrolorganisaties:**
- Uitrolplatforms winnen omdat ze het juiste datamodel hebben, maar leveren geen contractueel schema, geen vertragingsanalyse en geen programma-kritiek-pad.
- Sitetracker's eigen materiaal erkent het probleem aan de andere kant: *"Why Spreadsheets Stop Working as Infrastructure Programs Scale"* en *"Tech Stack Bloat: Are You Paying for Tools or Progress?"* ([Sitetracker Knowledge Center](https://www.sitetracker.com/knowledge-center/)) — de sector zit met stapels losse tools én spreadsheets.
- Onderaannemers hebben geen eigen planningstool en zijn afhankelijk van het platform van de opdrachtgever — een klassiek gat waar een gratis, goede desktop/web-planner in past.
- **Beperking om eerlijk te benoemen:** IFC dekt telecomnetwerken *niet*. buildingSMART noemt bruggen, havens, waterwegen en spoor als infra-uitbreidingen — geen telecom ([buildingSMART](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/)). Een IFC-eerst positionering werkt in datacenters, niet in glasvezelgraafwerk.

**Bij engineering-/adviesbureaus:**
- P6-licenties op £220/user/maand (G-Cloud 14) zijn een reële kostenpost voor bureaus met veel junior planners; velen delen licenties of werken in de omgeving van de klant.
- Acumen-achtige kwaliteitstoetsing is duur en zit achter een aparte licentie.
- **Opening:** ingebouwde DCMA-14-punts- en GAO-tien-best-practices-checks in een gratis tool. De volledige DCMA-lijst en de GAO-tien staan hierboven in §5.2 en §5.3 en zijn publiek — er is geen juridische of technische reden waarom een open planner ze niet standaard kan draaien. Geen enkel gratis pakket doet dit vandaag.

### 7.3 Concrete productopeningen voor een open-source, IFC-gebaseerde planner

| # | Opening | Onderbouwing |
|---|---|---|
| 1 | **4D: IFC-elementen koppelen aan CPM-taken** | ~~Niemand doet beide open source.~~ **GECORRIGEERD:** IfcOpenShell/Bonsai doet beide wél (CPM met float + `assign_product` taak↔element + XER/MSPDI-interop, LGPL-3.0). OpenProject heeft IFC-viewer + BCF maar geen 4D; ProjectLibre heeft CPM maar geen IFC. De opening is dus **niet** de functie maar de vorm: browser-first, zonder Blender, met een plannersUI in plaats van een modelleur-UI. |
| 2 | **Datacenterbouw als beachhead** | USD ~226 mld/jaar bouwvolume [SCHATTING uit JLL], IFC-gemodelleerd, CPM-verplicht, geen incumbent die zich er specifiek op richt |
| 3 | **Ingebouwde schemakwaliteitstoetsing (DCMA 14-punt + GAO-10)** | Volledige criteria publiek beschikbaar (§5.2, §5.3); Deltek Acumen vraagt hier een aparte, prijsloze licentie voor |
| 4 | **Vrije XER/P6 XML/MPP-interoperabiliteit** | 68 G-Cloud-diensten bestaan alleen om P6 te implementeren/ondersteunen ([G-Cloud](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/search?q=primavera+p6)); formaat-lock-in is de kern van Oracle's positie |
| 5 | **Browser-first, geen installatie** | De sector is cloud-first en desktop-vijandig; OPS deployt de webbuild al productioneel |
| 6 | **Gratis voor onderaannemers, betaald voor bouwheren** | Onderaannemers in glasvezel/datacenterbouw hebben nul budget; bouwheren hebben P6-budget. Klassiek open-core-model. |
| 7 | **Programmaschaal: duizenden bijna-identieke werkpakketten** | Het datamodel waar MS Project en P6 op stukbreken (zie §1.2); een planner die templating/herhaling native ondersteunt heeft hier een echt technisch voordeel |
| 8 | **Prijsanker is laag: houd het gratis of ≤ € 5/gebruiker/maand** | OpenProject prijst zijn hele BIM-module op € 1/gebruiker/maand ([OpenProject](https://www.openproject.org/pricing/)); de markt betaalt niet apart voor "IFC-support" |

### 7.4 Wat níet te doen

- **Niet positioneren als Jira-vervanger of agile tool.** Dat gevecht is verloren (Atlassian: USD 5,2 mld omzet, 4,4/5 over 14.000 reviews).
- **Niet positioneren als "planningssoftware voor de telecomsector" in het algemeen.** De uitrolplatforms hebben dat segment op datamodelniveau gewonnen en IFC dekt telecomnetwerken niet.
- **Niet inzetten op EVMS/EIA-748 als eerste feature.** Dat is een defensie-/overheidsdriver, niet een commerciële IT/telecom-driver, en Oracle prijst het al als premiummodule (USD 10.000 + 22% support).
- **Niet rekenen op een grote CPM-licentiemarkt in deze sector.** Mijn schatting is USD 30–110 miljoen per jaar aan pure CPM-licenties in IT/software/telecom [SCHATTING] — dat is een niche, geen markt. De waarde zit in adoptie en in de aangrenzende bouwsector.

---

## 8. Samenvattende tabel: sector-scorecard

| Dimensie | Oordeel voor IT/software/telecom |
|---|---|
| Marktomvang (PPM-verticaal) | USD 2,46 mld (2025), grootste verticale aandeel: 35,60% ([Mordor](https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market)) |
| Marktomvang (pure CPM-licenties) | USD 30–110 mln/jaar **[SCHATTING]** — klein |
| Groei | +11,4% CAGR PPM ([Mordor](https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market)); +12,6% PM-software 2026–2030 ([TBRC](https://www.thebusinessresearchcompany.com/report/project-management-software-global-market-report)); datacenterbouw is de echte groeimotor |
| CPM-relevantie | Laag in software, hoog in datacenterbouw, gemiddeld in telecom-uitrol |
| Betalingsbereidheid per seat | Hoog (USD 14,54 Jira Premium wordt moeiteloos betaald) |
| Betalingsbereidheid vóór planningsfunctionaliteit | Laag tot zeer laag |
| Open-source-tolerantie | Zeer hoog (ProjectLibre: 8,2 mln gebruikers) |
| IFC-relevantie | Hoog voor datacenters, nihil voor telecomnetwerken |
| Normdruk (EVMS/DCMA) | Laag commercieel, hoog bij federale contracten |
| Beste beachhead | **Datacenterbouw** |

---

## Bronnenlijst

### Analisten en marktomvang
1. Mordor Intelligence — Project Portfolio Management Market: https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market
2. The Business Research Company — Project Management Software Global Market Report: https://www.thebusinessresearchcompany.com/report/project-management-software-global-market-report
3. Analysys Mason — Research (USD 100 mld jaarlijkse uitgaven aan telecomapplicaties): https://www.analysysmason.com/research/
4. JLL — Data Center Outlook 2026: https://www.jll.com/en-us/insights/market-outlook/data-center-outlook
5. McKinsey Digital & University of Oxford — *Delivering large-scale IT projects on time, on budget, and on value* (oktober 2012): https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/delivering-large-scale-it-projects-on-time-on-budget-and-on-value
6. digital.ai — State of Agile Report (17e editie, 2023): https://digital.ai/state-of-agile/

### Sectorcijfers telecom / datacenters
7. GSMA — The Mobile Economy 2025 (PDF): https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-economy/wp-content/uploads/2025/02/030325-The-Mobile-Economy-2025.pdf
8. Ericsson — Mobility Report (juni 2026): https://www.ericsson.com/en/reports-and-papers/mobility-report
9. FTTH Council Europe (Market Panorama, 2026): https://www.ftthcouncil.eu/
10. Ericsson — Network Services / Intelligent Deployment: https://www.ericsson.com/en/network-services

### Leveranciers en prijzen
11. Atlassian — Jira pricing (prijzen uit JSON-LD structured data, juli 2026): https://www.atlassian.com/software/jira/pricing
12. Atlassian — Cloud licensing (staffelprijzen, Net-30-drempel): https://www.atlassian.com/licensing/cloud
13. Atlassian — Jira Align: https://www.atlassian.com/software/jira/align
14. Atlassian — Jira roadmaps feature page: https://www.atlassian.com/software/jira/features/roadmaps
15. stockanalysis.com — Atlassian (TEAM) financials, FY2021–FY2025: https://stockanalysis.com/stocks/team/financials/
16. Microsoft — Compare Microsoft Project management software (Project Standard/Professional 2024 prijzen): https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software
17. Microsoft Learn — Project Online service description: https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/project-online-service-description
18. Smartsheet — Pricing (USD-prijsblokken uit paginabron): https://www.smartsheet.com/pricing
19. Oracle — Primavera P6 EPPM: https://www.oracle.com/construction-engineering/primavera-p6/
20. Oracle — Primavera Cloud: https://www.oracle.com/construction-engineering/primavera-cloud/
21. Oracle — Communications (telecomportfolio, geen Primavera): https://www.oracle.com/industries/communications/
22. Oracle Primavera Pricing — G-Cloud 14 Framework, doc. BD.G14.OCS.002 v1.0, mei 2024 (via UK Digital Marketplace): https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/search?q=primavera+p6
23. Oracle Primavera Cloud Service RPC Pricing Document, mei 2024 (reseller RPC, UK)
24. th3rdcurve Ltd — Oracle Primavera pricing document, effectief 30 april 2024
25. Oracle Construction & Engineering Global Price List — Software Investment Guide, 10 november 2016 (Texas DIR-TSO-2539)
26. Deltek — Acumen (Fuse/Risk/360/Touchstone): https://www.deltek.com/en/products/project-and-portfolio-management/acumen
27. ServiceNow — Strategic Portfolio Management: https://www.servicenow.com/products/strategic-portfolio-management.html
28. Planview — Products overview: https://www.planview.com/products/
29. Broadcom — Clarity: https://www.broadcom.com/products/software/value-stream-management/clarity
30. Wrike — Pricing: https://www.wrike.com/price/
31. Asana — Pricing: https://asana.com/pricing
32. monday.com — Pricing: https://monday.com/pricing
33. OpenProject — Pricing: https://www.openproject.org/pricing/
34. OpenProject — BIM project management (IFC-viewer, BCF, geen 4D): https://www.openproject.org/bim-project-management/
35. ProjectLibre: https://www.projectlibre.com/
36. Wikipedia — Comparison of project management software: https://en.wikipedia.org/wiki/Comparison_of_project_management_software

### Telecom-uitrolplatforms
37. Sitetracker: https://www.sitetracker.com/
38. Sitetracker Knowledge Center: https://www.sitetracker.com/knowledge-center/
39. IQGeo: https://www.iqgeo.com/
40. Render Networks: https://rendernetworks.com/

### Normen, audits en certificering
41. GAO-16-89G — *Schedule Assessment Guide: Best Practices for Project Schedules* (december 2015): https://www.gao.gov/products/gao-16-89g (tien best practices; DCMA 14PA-lijst; ANSI/EIA-748-verwijzingen; DCMA-INST 208, EVC-100 t/m EVC-106)
42. PMI — PMI Scheduling Professional (PMI-SP) Exam Content Outline (©2012 Project Management Institute)
43. buildingSMART — Industry Foundation Classes (IFC 4.3.2.0 = ISO 16739-1:2024): https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/
44. AACE International — Recommended Practices (catalogus niet publiek doorzoekbaar tijdens dit onderzoek): https://web.aacei.org/resources/publications/recommended-practices

### Niet-toegankelijke bronnen (voor volledigheid; deze cijfers zijn dus NIET geverifieerd)
45. NTIA — BEAD Program (HTTP 403): https://www.ntia.gov/programs/bead
46. NTIA BroadbandUSA — BEAD (HTTP 403): https://broadbandusa.ntia.gov/funding-programs/broadband-equity-access-and-deployment-bead-program
47. OSD — Earned Value Management (HTTP 503): https://www.acq.osd.mil/asda/ae/ada/ipm/evms.html
48. DCMA — beleidsdocumenten (HTTP 404): https://www.dcma.mil/
49. Ofcom — Connected Nations (HTTP 403): https://www.ofcom.org.uk/phones-and-broadband/coverage-and-speeds/
50. Gartner — Adaptive Project Management and Reporting reviews (HTTP 403): https://www.gartner.com/reviews/market/adaptive-project-management-and-reporting

---

*Alle prijzen zijn lijstprijzen zoals gepubliceerd door de leverancier op de genoemde datum; werkelijke contractprijzen liggen bij enterprise-deals doorgaans 20–50% lager. Bedragen gemarkeerd met **[SCHATTING]** zijn eigen berekeningen op basis van de aangegeven bronnen en aannames, geen gepubliceerde cijfers.*

---
---

# §9. ADDENDUM — tweede onderzoeksronde (25 juli 2026, mét WebSearch)

**Waarom dit addendum bestaat.** De hoofdtekst hierboven is samengesteld zonder WebSearch (quota uitgeput), met alleen directe pagina-ophalingen. Daardoor bleven vier punten onbevestigd, kon één claim over IFC niet worden getoetst, en ontbraken enkele actuele marktfeiten. Deze ronde is uitgevoerd met circa 20 webzoekopdrachten plus gerichte ophaalacties. Dezelfde conventies gelden: bron-URL bij elk cijfer, eigen berekeningen gemarkeerd als **[SCHATTING]**.

**Wat de tweede ronde niet verandert:** de kernconclusie van §0 blijft overeind. Klassieke CPM is in deze sector een randverschijnsel; de openingen liggen bij datacenterbouw en telecomuitrol. De tweede ronde maakt de tweede van die twee openingen echter **groter** dan de hoofdtekst aanneemt (zie §9.1).

---

## 9.1 CORRECTIE: IFC 4.3 dekt telecomnetwerken wél

**De claim in de hoofdtekst.** §5.6 stelt: *"buildingSMART's eigen IFC-pagina noemt geen telecom-, datacenter- of nutsnetwerk-domein … De uitbreiding naar infra dekt bruggen/havens/waterwegen/spoor — niet telecomnetwerken."* Op basis daarvan concludeert §7.2: *"Een IFC-eerst positionering werkt in datacenters, niet in glasvezelgraafwerk"*, en §7.4 raadt af om zich als telecomplanner te positioneren.

**Wat er feitelijk in IFC 4.3 zit.** buildingSMART's eigen documentatie over de toepassing van IFC 4.3 beschrijft expliciet *"a cabling system, cable laying infrastructure and relevant elements placed along [the alignment], managing the geometrical view for these elements including their positioning and offsets along an alignment"*, en stelt dat dit *"applies to several domain models (**telecom**, signal, and energy)"* ([buildingSMART — Applying IFC 4.3 for Rail Project](https://www.buildingsmart.org/standards/domains/railway/applying-ifc-4-3-for-rail-project/)).

IFC 4.3 is bovendien het resultaat van twee bSI-projecten (IFCRail en IFCInfra) en is uitgebreid naar *"horizontal resources"* en lineaire infrastructuur ([BibLus/ACCA](https://biblus.accasoftware.com/en/ifc-4-3-the-new-ifc-standard-for-exchanging-openbim-models-of-infrastructural-works/)); de standaard ondersteunt lineaire infrastructuur én terreindata (TIN-oppervlakken) en volgt de ISO-route als nieuwe versie van ISO 16739 ([BibLus/ACCA](https://biblus.accasoftware.com/en/ifc-4-3-the-openbim-standard-also-for-infrastructure-possible-applications/)).

**Waarom de hoofdtekst hier misging.** De IFC-*productpagina* van buildingSMART somt domeinen samenvattend op en noemt telecom niet; de *domeindocumentatie* doet dat wel. Afwezigheid op een marketingpagina is geen afwezigheid in de standaard. Dit is precies het type inferentie-uit-afwezigheid waar de hoofdtekst elders terecht voor waarschuwt.

**Wat dit verandert voor de positionering:**

| Hoofdtekst zei | Correctie |
|---|---|
| IFC dekt telecomnetwerken niet | IFC 4.3 heeft een telecom-domeinmodel met kabelsystemen en kabelgoot-infrastructuur langs een alignment ([buildingSMART](https://www.buildingsmart.org/standards/domains/railway/applying-ifc-4-3-for-rail-project/)) |
| IFC-eerst werkt niet in glasvezelgraafwerk | IFC-eerst is technisch legitiem voor een tracé mét mantelbuis, handholes en lasmoffen |
| Niet positioneren als telecomplanner | Genuanceerder: technisch kan het wél; commercieel blijft het lastig, want in de telecom-uitrolpraktijk heerst GIS en is IFC vrijwel onbekend |

**Eerlijke nuance die overeind blijft.** Dat IFC 4.3 telecom formeel dekt, betekent niet dat de sector het gebruikt. In glasvezeluitrol is de feitelijke datataal shapefile/GeoJSON/KML plus het platform van de opdrachtgever (§5.6 van de hoofdtekst blijft hierin correct). IFC is dus een **technisch fundament** waarop je kunt bouwen, geen **verkoopargument** waarmee je de deur opent — behalve bij datacenterbouw, waar BIM al norm is. De praktische conclusie van §7.4 ("niet positioneren als telecomplanner in het algemeen") blijft dus staan, maar om een commerciële reden, niet om een technische.

**Extra onderbouwing van de openingen die dit oplevert:** het echte gat blijft dat de telecom-uitroltools (Sitetracker, Vitruvi, Render, IQGeo) GIS-gebaseerd zijn zónder CPM-engine, terwijl de CPM-tools (P6, MS Project) geen geografie kennen. Niemand levert *locatiegebonden planning met een kritiek pad in een open model*. Dat is nu, met IFC 4.3 als drager, een technisch haalbaar voorstel geworden — al is het ook het moeilijkste voorstel in dit hele rapport, want het vergt een tweede planningsparadigma (takt/locatiegebaseerd) naast klassieke CPM.

---

## 9.2 Bevestiging van vier punten die als [ONBEVESTIGD] of [INFERENTIE] stonden

### 9.2.1 DoD-EVMS-drempels — BEVESTIGD, plus een nieuwe standaardrevisie

§5.1 markeerde de drempelbedragen als onbevestigd. Ze zijn nu wel te onderbouwen:

- Naleving van NDIA/EIA-748 is vereist voor DoD cost- of incentive-contracten en -overeenkomsten **ter waarde van USD 20 mln of meer**; naleving **plus een EVMS-validatie** is vereist bij **USD 50 mln of meer**, zoals voorgeschreven in DoD Instruction 5000.02 ([AcqNotes — NDIA EIA-748 Earned Value Management](https://acqnotes.com/acqnote/tasks/ansi-eia-748-earned-value-management)).
- DoD nam EIA-748 formeel over in **augustus 1998** voor Major Defense Acquisition Programs ([AcqNotes](https://acqnotes.com/acqnote/tasks/ansi-eia-748-earned-value-management)).
- De standaard telt **27 richtlijnen** ([Roland Wanner](https://rolandwanner.com/eia-748-and-27-earned-value-management-systems-evms-guidelines/)).

**Nieuw en relevant:** revisie **EIA-748-E is gepubliceerd in februari 2026**, en de NDIA IPMD *EVMS Intent Guide* is herzien in **mei 2026** ([AcqNotes](https://acqnotes.com/acqnote/tasks/ansi-eia-748-earned-value-management), [NDIA IPMD Division Guides and Resources](https://www.ndia.org/divisions/ipmd/division-guides-and-resources)). Wie EVM-functionaliteit bouwt of documenteert, moet naar de **E**-revisie kijken, niet naar de D-versie waar de meeste online literatuur nog van uitgaat.

**Aanvulling op §5.1:** EVM en agile zijn formeel verenigbaar verklaard — *"the purpose of implementing an earned value management system by following ANSI/EIA-748 guidelines can be done in a manner consistent with agile software development methodology"* ([ProjectManagement.com — When Earned Value Meets Agile](https://www.projectmanagement.com/articles/338170/When-Earned-Value-Meets-Agile)). In de praktijk is dat echter een compliance-oefening bovenop het echte werk, geen geïntegreerde manier van werken.

### 9.2.2 AACE RP-nummering — BEVESTIGD

§5.4 noemde bewust geen RP-nummers. Dat kan nu wel:

- **AACE International Recommended Practice No. 29R-03, *Forensic Schedule Analysis*** (TCM Framework 6.4 – Forensic Performance Assessment) biedt *"a unifying reference of basic technical principles and guidelines for the application of critical path method (CPM) scheduling in forensic schedule analysis"* en presenteert **negen methoden** ([AACE — 29R-03, inhoudsopgave PDF](https://web.aacei.org/docs/default-source/toc/toc_29r-03.pdf)).
- De RP is niet prescriptief maar een raamwerk dat professioneel oordeel veronderstelt ([AACE](https://web.aacei.org/docs/default-source/toc/toc_29r-03.pdf)).
- In internationale arbitrage wordt 29R-03 naast het SCL *Delay and Disruption Protocol* (2e editie) gebruikt; er bestaat expliciete harmonisatieliteratuur ([Ankura](https://ankura.com/insights/harmonizing-scl-dd2-and-aace-29r-03-complementary-frameworks-for-forensic-delay-analysis-in-international-arbitration)).

**Praktische eis die hieruit volgt:** een forensische analyse vereist **bewaarde, ongewijzigde baselines en gedateerde periodieke updates**. Voor een planner betekent dat: versiebeheer van baselines is geen luxe maar een auditvereiste.

### 9.2.3 BEAD-verplichtingen — BEVESTIGD uit primaire NTIA-bronnen

§1.5 moest hier passen wegens HTTP 403 op de NTIA-domeinen. De documenten zijn nu wel opgehaald:

- **Vierjaarstermijn:** subgrantees moeten het gefinancierde netwerk uitrollen en dienstverlening starten aan elke klant die dat wenst *"no later than four years after receiving the subgrant"*, met tussentijdse buildout-mijlpalen die de Eligible Entity vaststelt en **als subsidievoorwaarde afdwingt** ([NTIA — BEAD Obligations for Subgrantees Deploying Network Projects](https://broadbandusa.ntia.gov/sites/default/files/2025-08/BEAD_Obligations_for_Subgrantees_Deploying_Network_Projects.pdf)).
- **Rapportage:** zowel Eligible Entities als subgrantees zijn rapportageplichtig; er is aparte semi-jaarlijkse technische rapportagegids ([NTIA — BEAD Semi-Annual (Technical) Report Guidance](https://broadbandusa.ntia.gov/technical-assistance/BEAD_Semi_Annual_Report_Guidance)).
- **Beleidswijziging:** de *BEAD Restructuring Policy Notice* van **6 juni 2025** schrapte eisen rond arbeid/werkgelegenheid, klimaat en open access, maar **liet de bouw- en rapportagemijlpalen intact** ([NTIA](https://www.ntia.gov/sites/default/files/2025-06/bead-restructuring-policy-notice.pdf)).
- **Procesritme:** Eligible Entities hebben 180 dagen na ontvangst van de Notice of Available Amounts om een Initial Proposal in te dienen ([NTIA FAQ v3.0](https://broadbandusa.ntia.gov/sites/default/files/2023-07/BEAD_Frequently_Asked_Questions_Version_3.0.pdf)); zie ook het CRS-overzichtsrapport ([CRS R48666](https://www.congress.gov/crs_external_products/R/PDF/R48666/R48666.1.pdf)).

**Het BEAD-budgetcijfer van circa USD 42,45 mrd blijft [ONBEVESTIGD]** — ook in deze ronde kwam het niet uit een primaire NTIA-bron. Behandel het als onbevestigd, zoals §1.5 al voorschreef.

**Wat dit betekent:** BEAD creëert vraag naar *auditeerbare* planning — een bevroren baseline, gedateerde updates en rapportage die een toezichthouder accepteert. Dat is precies waar een gratis tool met deugdelijk versiebeheer kan landen bij kleine altnets die geen Sitetracker-budget hebben.

### 9.2.4 Jira Advanced Roadmaps: geen kritiek pad — BEVESTIGD, niet langer inferentie

§6 leidde dit af uit wat Atlassian *niet* claimt, en markeerde het eerlijk als **[INFERENTIE uit afwezigheid]**. Het is nu positief vastgesteld:

- *"Jira Advanced Roadmaps lacks critical path analysis, and you cannot identify which dependency chains determine your delivery date without manually tracing through every link"* ([Werkstack](https://werkstack.dev/blog/how-to-manage-dependencies-in-jira)).
- Atlassian voert er een openstaand feature-issue voor, met de opmerking dat gezien *"feature parity for folks coming over from MS Project, this seems like an obvious omission"* ([Atlassian JPOSERVER-3116](https://jira.atlassian.com/browse/JPOSERVER-3116)).
- **Alleen FS-relaties:** *"Advanced Roadmaps does not support all four dependency types (only FS), lacks auto-rescheduling of dependent issues, and has limited holiday calendar support"* ([Werkstack](https://werkstack.dev/blog/how-to-manage-dependencies-in-jira)).
- **Geen lag/lead:** *"You cannot specify 'start 3 days after Task A finishes' or 'start 2 days before Task A finishes'"* ([Werkstack](https://werkstack.dev/blog/how-to-manage-dependencies-in-jira)).
- De UI kent slechts twee afhankelijkheidstypen: *"is blocked by"* en *"blocks"* ([Atlassian-documentatie](https://confluence.atlassian.com/spaces/JIRASOFTWARE/pages/1688898866/Dependencies+in+Advanced+Roadmaps)).
- Cross-project-afhankelijkheden vereisen Advanced Roadmaps en dus Premium of Enterprise ([Werkstack](https://werkstack.dev/blog/how-to-manage-dependencies-in-jira)).

De conclusie van §6 — *"Jira Plans is een capaciteits- en afhankelijkheidsvisualisatie, geen netwerkplanner"* — is hiermee bevestigd en mag zonder inferentie-voorbehoud worden gebruikt.

---

## 9.3 NIEUW: Microsoft trekt Project Online in — een acuut migratievenster

Dit ontbrak volledig in de hoofdtekst en is het meest tijdgebonden feit in dit rapport.

- **Project Online wordt op 30 september 2026 gepensioneerd.** *"Starting April 1, 2026, the creation of new Project Web App (PWA) sites will be blocked, and existing PWA sites without projects will be made inaccessible."* ([Microsoft — Project Plan 3 productpagina](https://www.microsoft.com/en-us/microsoft-365/planner/project-plan-3)).
- Na de retirement is de data *"no longer accessible"* ([costbench](https://costbench.com/software/project-management/microsoft-project/)).
- **Project Plan 5 bereikt end of sale per 1 mei 2026** ([A Guide to Cloud](https://www.aguidetocloud.com/licensing/microsoft-project/)).

**Waarom dit ertoe doet.** De hoofdtekst noteerde in §6 al dat Project Server/Project Online *"een partner vergt en geen publieke prijs heeft"*. Wat er nu bovenop komt: honderden IT- en telecom-PMO's moeten **op dit moment** migreren, en het migratiepad dat Microsoft zelf aanbiedt (Planner Premium) mist de klassieke schemadiepte. Dat is een concreet, gedateerd venster — niet een structurele marktkans die er over drie jaar ook nog is.

**Wat er dan moet werken om die golf te vangen:** MSPDI/XML-import, en bij voorkeur MPP-lezen. Zonder dat gaat de kans langs.

**Actuele cloudprijzen ter aanvulling op §3.1** (de hoofdtekst kon deze niet ophalen omdat Microsofts prijspagina's client-side renderen):

| Plan | Prijs | Bron |
|---|---|---|
| Project Plan 3 | **USD 30,00 per gebruiker/maand, jaarlijks betaald** | [Microsoft](https://www.microsoft.com/en-us/microsoft-365/planner/project-plan-3) |
| Project Plan 5 | **USD 55 per gebruiker/maand** (end of sale 1 mei 2026) | [A Guide to Cloud](https://www.aguidetocloud.com/licensing/microsoft-project/), [costbench](https://costbench.com/software/project-management/microsoft-project/) |

Merk op dat USD 30/gebruiker/maand ≈ USD 360/jaar de eenmalige Project Professional 2024-prijs van USD 1.129,99 (§3.1) in ruim drie jaar inhaalt — wat verklaart waarom veel IT-organisaties bij de desktop-perpetual blijven.

---

## 9.4 NIEUW: prijzen en contractwaarden die de hoofdtekst niet had

### 9.4.1 Jira op enterprise-schaal

§3.1 had de lijstprijzen per seat. Wat ontbrak, zijn de contractwaarden:

| Item | Bedrag | Bron |
|---|---|---|
| Jira Cloud Enterprise, 801–1.600 gebr. | ~USD 84.000/jaar | [VendorBenchmark](https://vendorbenchmark.com/vendors/jira-atlassian-pricing) |
| Jira Cloud Enterprise, 1.601–3.200 gebr. | ~USD 120.000/jaar | idem |
| Jira Cloud Enterprise, 3.201–6.400 gebr. | ~USD 192.000/jaar | idem |
| Jira Cloud Enterprise, 6.401–10.000 gebr. | ~USD 300.000/jaar | idem |
| Jira Data Center, zelfde staffels | ~USD 72k / 108k / 168k / 252k per jaar | idem |
| **2.000 gebruikers, onderhandeld, alleen Jira Software** | **USD 85.000–100.000/jaar** | idem |
| **2.000 gebruikers, volledige Atlassian-stack** | **USD 250.000–350.000/jaar, vóór marketplace-apps** | idem |
| Marketplace-apps bij die schaal | **USD 80.000–200.000+/jaar** | idem |
| Atlassian Guard | ~USD 40.000–60.000/jaar (USD 4/gebruiker/maand) | idem |
| Atlassian Analytics | USD 15.000–40.000/jaar | idem |
| Haalbare korting | 20–35% off list | idem |
| Opslag door marketplace-apps, algemeen | **+40–80% bovenop de basislicentie** | [Atonement Licensing](https://atonementlicensing.com/blog/atlassian-cloud-pricing-2026/) |

Dit corrigeert de **[SCHATTING]** in §3.1 (3.000 Premium-seats ≈ USD 523.000 lijst, USD 300–400k na korting) in gunstige zin: die orde van grootte klopt, maar de *totale* Atlassian-uitgave bij zo'n organisatie ligt met apps en Guard aanzienlijk hoger.

### 9.4.2 De prijs van "kritiek pad in Jira"

Omdat Advanced Roadmaps geen kritiek pad kan (§9.2.4), koopt de markt add-ons. Wat die kosten:

| App | Prijs | Bron |
|---|---|---|
| BigPicture | Gratis 1–10 gebr.; **USD 1.303** bij 25; **USD 5.210** bij 100; **USD 68.400** bij 10.000 (per jaar, tarieven per 1 juli 2026) | [Appfire](https://appfire.com/pricing-updates/big-picture-jira) |
| Structure + Structure.Gantt | **USD 473/maand** bij 100 gebr.; **USD 3.005/maand** bij 1.000 gebr. | [Planyway](https://planyway.com/blog/jira-structure-plugin) |
| WBS Gantt-Chart for Jira | biedt wél Critical Path en resource-monitoring | [Ricksoft](https://www.ricksoft-inc.com/post/best-jira-gantt-chart-add-ons/) |

**Het bestaan van deze categorie is zelf het bewijs van de opening.** Een organisatie van 1.000 gebruikers betaalt USD 36.060/jaar aan Structure.Gantt om iets te krijgen wat een CPM-engine gratis doet.

### 9.4.3 Broadcom Clarity: prijsdruk als koopmoment

§2.1 constateerde al dat Broadcom weinig aandacht aan Clarity besteedt. De prijsdynamiek maakt dat concreet:

| Item | Bedrag | Bron |
|---|---|---|
| Clarity Team Member | USD 29/gebruiker/maand | [ITQlick](https://www.itqlick.com/clarity-ppm/pricing) |
| Clarity Enterprise (lijst) | USD 55/gebruiker/maand | idem |
| Clarity SaaS in de praktijk | **USD 65–120/gebruiker/maand**, afhankelijk van modules | [VendorBenchmark](https://vendorbenchmark.com/vendors/broadcom-clarity-ppm-pricing) |
| Typische jaardeal | **USD 150k–800k** | idem |
| 100 gebruikers on-prem, jaar 1 | **USD 488k** (USD 400k licentie + USD 88k onderhoud), daarna USD 88k/jaar | idem |
| 100 gebruikers SaaS | USD 96k–144k/jaar onderhandeld | idem |
| Enterprise-uitrol 100–200 named users, perpetual | USD 300k–700k vooraf | [ITQlick](https://www.itqlick.com/clarity-ppm/pricing) |
| Implementatie | USD 20k–50k (MKB), >USD 100k (enterprise) | idem |
| Maatwerk / training / datamigratie | elk USD 5k–20k+ | idem |
| Onderhoud | 22% van perpetual → **24–26% bij verlenging na de overname** | [VendorBenchmark](https://vendorbenchmark.com/vendors/broadcom-clarity-ppm-pricing) |
| **Verlengingsverhogingen na Broadcom-overname (2018)** | **12–18%** (vóór de overname 3–5%) | idem |
| SaaS-prijsverhogingen | *"surprise annual price increases of 10–15%"* | idem |
| Perpetual → SaaS-migratie | **15–30% duurder** | idem |

**Interpretatie:** dit is de definitie van lage prijselasticiteit — klanten blijven ondanks structurele verhogingen. Maar het is ook een **koopmoment**: een sector die net drie keer door leveranciers is gepasseerd (Broadcom-verhogingen, Atlassian-stack die naar USD 350k oploopt, Microsoft dat Project Online intrekt) is ontvankelijker dan gemiddeld voor het argument "open formaat, open source, geen renewal-verrassing".

### 9.4.4 Overige prijspunten

| Product | Prijs | Bron |
|---|---|---|
| Planview, grote enterprise | **USD 300k–2 mln+/jaar**, 25–40% korting op lijst; modulegebaseerd (project, portfolio, resource, financieel, analytics apart geprijsd) | [VendorBenchmark](https://vendorbenchmark.com/benchmarks/project-portfolio-management-pricing-guide) |
| ServiceNow SPM | Geen publieke prijs; op basis van aantal gebruikers **én** aantal portfolio's | [SelectHub](https://www.selecthub.com/p/ppm-software/servicenow-spm/) |
| Smartsheet, kortingsniveau | 15–25% bij meerjarig of 50+ seats | [Spendhound](https://www.spendhound.com/marketplace/smartsheet-pricing) |
| Sitetracker | Geen publieke prijs; *"Enterprise-level pricing may be prohibitive for smaller telecom firms"* | [Vitruvi](https://vitruvisoftware.com/blog/top-telecom-project-management-software) |
| Primavera P6 Professional | vanaf ~USD 1.300/gebruiker/jaar **[NIET GEVERIFIEERD]** — itqlick.com gaf HTTP 403 bij hercontrole | [ITQlick](https://www.itqlick.com/oracle-primavera-p6/pricing) |
| Primavera P6 Cloud | ~~vanaf ~USD 2.500/jaar per gebruiker~~ **[BRON DEKT DE CLAIM NIET]** — de Ten Six-pagina bevat géén bedragen; ze verwijst alleen naar shop.oracle.com en meldt dat cloud "per user / per month" wordt gefactureerd met een minimum van 25 users | [Ten Six](https://tensix.com/how-much-does-primavera-p6-cost/) |

~~De P6-cijfers bevestigen de G-Cloud-prijzen uit §3.1 in dezelfde orde van grootte (£220/maand ≈ USD 3.350/jaar lijst; USD 1.300–2.500 is het gangbare onderhandelde niveau).~~ **BIJGESTELD:** de enige P6-prijs in dit rapport die uit een primaire/officiële bron komt is de G-Cloud 14-lijst (£220 per hosted named user/maand, min. 25 users) plus de Oracle-lijstprijzen van 2016. De "USD 1.300–2.500/jaar"-band steunt op twee derde-partij-vergelijkingssites waarvan er één bij hercontrole niet bereikbaar was (403) en de ander het bedrag niet bevat. Behandel USD 1.300–2.500 als **onbevestigde marktkleur**, niet als datapunt — en let op dat dit getal in de bottom-up seat-berekening (§4.3 en de Laag B-samenvatting) als invoer wordt gebruikt.

---

## 9.5 NIEUW: marktomvang — een tweede top-down anker

De hoofdtekst gebruikt de Mordor **PPM**-markt (USD 6,90 mrd 2025, IT & telecom 35,60% → USD 2,46 mrd). Deze ronde levert een tweede, breder anker op basis van de **projectmanagementsoftware**-markt:

| Bron | Marktomvang 2025 | 2026 | Groei | Link |
|---|---|---|---|---|
| Mordor — *Project Management Software Systems* | USD **9,76** mrd | USD 11,27 mrd | 15,42% CAGR → USD 23,09 mrd in 2031 | [Mordor](https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market) |
| Precedence Research — *Online PM Software* | USD **9,20** mrd | USD 10,40 mrd | 13,24% CAGR → USD 31,90 mrd in 2035 | [Precedence](https://www.precedenceresearch.com/online-project-management-software-market) |
| Credence Research | USD **9,0** mrd | — | 12,3% CAGR → >USD 22,9 mrd in 2033 | [Credence](https://www.credenceresearch.com/report/project-management-software-market) |
| SkyQuest | USD 8,98 mrd | — | — | [SkyQuest](https://www.skyquestt.com/report/project-management-software-market) |

**Aandeel IT & telecom binnen de PM-softwaremarkt** (naast de 35,60% van Mordor-PPM uit §4.1):

| Bron | Aandeel | Jaar | Link |
|---|---|---|---|
| Precedence Research | **35%** (→ 37% in 2035, 15,50% CAGR) | 2025 | [Precedence](https://www.precedenceresearch.com/online-project-management-software-market) |
| Mordor (PM Software Systems) | **28,15%** | 2025 | [Mordor](https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market) |
| Future Market Insights | **28,6%** | — | [FMI](https://www.futuremarketinsights.com/reports/project-management-software-market) |
| Emergen Research | **24%** | 2024 | [Emergen](https://www.emergenresearch.com/industry-report/project-management-software-market) |
| Grand View Research | **19,20%** | 2022 | [GVR](https://www.grandviewresearch.com/industry-analysis/project-management-software-market-report) |

**Berekening [SCHATTING]:**
- Ondergrens: 28,15% × USD 9,76 mrd = **USD 2,75 mrd** (2025)
- Bovengrens: 35% × USD 9,20 mrd = **USD 3,22 mrd** (2025)

**Vergelijking met de hoofdtekst:** §4.1 kwam op USD 2,46 mrd (2025) via de PPM-definitie. Deze ronde komt op USD 2,7–3,2 mrd via de bredere PM-softwaredefinitie. Die twee zijn **consistent**: de bredere afbakening levert een iets hoger cijfer. De gecombineerde conclusie luidt dus: **USD 2,5–3,2 mrd in 2025 voor "projectmanagementsoftware, verticaal IT & telecom"**, afhankelijk van de gekozen marktdefinitie.

**De waarschuwing van §4.2 blijft gelden, maar moet preciezer:** Atlassian alleen deed USD 5,2 mrd in FY2025, +20% j-o-j ([Atlassian Q4 FY25](https://www.atlassian.com/blog/announcements/shareholder-letter-q4fy25), [Businesswire](https://www.businesswire.com/news/home/20250807057757/en/Atlassian-Announces-Fourth-Quarter-and-Fiscal-Year-2025-Results)). ~~Meer dan de hele markt volgens deze bureaus.~~ **GECORRIGEERD:** USD 5,2 mrd is méér dan Mordors hele **PPM**-markt (USD 6,90 mrd is groter — het is dus 76% daarvan, niet meer), en het is **ruim de helft maar niet meer dan** de **PM-software**-markt van deze ronde (USD 9,0–9,76 mrd). De correcte formulering is: *één leverancier vult in zijn eentje 53–58% van wat deze bureaus de gehele projectmanagementsoftwaremarkt noemen* — nog steeds vernietigend voor de afbakening, maar niet "meer dan de hele markt". De analistencijfers blijven een *conventie*, geen meting.

**Aanvullende marktstructuur uit deze ronde** ([Mordor](https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market)):
- Cloud **74,20%** van de omzet in 2025; hybride groeit het hardst met **18,12% CAGR**
- Grote ondernemingen **60,35%** van de omzet; MKB groeit met 16,89% CAGR
- Jaarabonnementen 52,75% van de omzet; eenmalige licenties dalend
- Noord-Amerika **36,12%**; Azië-Pacific snelst met 16,06% CAGR
- Marktleiders: Microsoft, SAP, Broadcom, Oracle, ServiceNow

Dat hybride het hardst groeit (18,12%) is relevant voor OPS: het bevestigt dat er vraag is naar deployment-modellen tussen pure cloud en pure on-prem in — precies waar een lokaal draaiende desktop/webbuild past bij operators met datasoevereiniteitseisen.

---

## 9.6 NIEUW: telecom-capex daalt — de groeirichting moet naar beneden worden bijgesteld

§4.4 stelt: *"Groeirichting: sterk positief, maar de groei zit niet in CPM"*, met datacenterbouw als motor. Die conclusie klopt, maar de telecomkant is negatiever dan de hoofdtekst suggereert:

- **Wereldwijde telecom-capex was in 2025 vlak** in nominale USD over circa 50 serviceproviders (~80% van de wereldwijde capex); Dell'Oro voorspelt een **daling van 2% in 2026**, gevolgd door ~**1% CAGR t/m 2030** ([Dell'Oro Group, 2 april 2026](https://www.delloro.com/news/worldwide-telecom-capex-to-decline-in-2026/)).
- ~~Een andere lezing van dezelfde data: **USD 303 mrd in 2025, −2% j-o-j**, een verbetering ten opzichte van de −3,5% in 2024 ([RCR Wireless, 3 april 2026](https://www.rcrwireless.com/20260403/5g/global-telecom-capex-2)).~~ **GECORRIGEERD (verificatie):** het RCR-artikel bevat géén bedrag van USD 303 mrd en géén −2% voor 2025. Het zegt dat capex in 2025 *"remained broadly flat … in nominal U.S. dollar terms across approximately 50 service providers, representing around 80% of global spending"* en dat de −2% op **2026** slaat ([RCR Wireless, 3 april 2026](https://www.rcrwireless.com/20260403/5g/global-telecom-capex-2)). Er is dus **geen geverifieerd absoluut capexbedrag voor 2025** in dit rapport; gebruik alleen de richting (vlak 2025, −2% 2026, ~1% CAGR t/m 2030).
- **Capex-to-revenue** daalt naar circa 14% in 2029; **draadloze kapitaalintensiteit** naar 11% in 2029, tegen een 5G-piek van **18%** ([Dell'Oro](https://www.delloro.com/news/worldwide-telecom-capex-to-decline-in-2026/)).
- Lange termijn: telecom-capex naar **USD 395 mrd in 2030** (3,6% CAGR), terwijl "technology capex" naar USD 545 mrd gaat (9,3% CAGR) ([IEEE ComSoc over Omdia en Dell'Oro, 31 oktober 2025](https://techblog.comsoc.org/2025/10/31/market-research-firms-omdia-and-delloro-on-impact-of-6g-and-ai-investments/)). **[INCONSISTENTIE — verificatie]** 3,6% CAGR naar USD 395 mrd in 2030 impliceert een startwaarde van ≈ USD 331 mrd in 2025, en 3,6% is niet te rijmen met Dell'Oro's ~1% CAGR t/m 2030 uit hetzelfde blok. Omdia en Dell'Oro hanteren dus verschillende afbakeningen van "telecom capex"; tel deze twee reeksen niet bij elkaar op en gebruik ze niet als bevestiging van elkaar.
- Volumecontext: 5G-verbindingen passeerden **3 miljard, +34% j-o-j** (Azië 69% van het totaal); FTTx passeerde **1,169 miljard verbindingen, +7% per jaar** ([Omdia via IEEE ComSoc, april 2026](https://techblog.comsoc.org/2026/04/20/omdia-global-telecom-connectivity-market-hit-333-billion-in-q4-2025-5-yoy-growth/)).

**Wat dit betekent voor §4.3 en §4.4.** De bottom-up berekening van §4.3 gebruikt GSMA's USD 186 mrd/jaar aan mobiele capex (uit USD 1,3 biljoen over 2024–2030). Dell'Oro's meting van ~USD 303 mrd voor *alle* telecom-capex in 2025 is daarmee consistent (GSMA telt alleen mobiel). Maar de **richting** verschilt: GSMA's cijfer is een vlak zevenjaarsgemiddelde, terwijl Dell'Oro een daling meet. De plannerspopulatie in telecomuitrol (§4.3, stap 2: 4.000–7.000 seats) zal dus eerder krimpen dan groeien.

**Bijgestelde groeiverwachting [SCHATTING]:** het OPS-relevante deel van dit segment groeit met **8–12% per jaar**, niet met de 11–15% van de brede markt — omdat de datacentermotor (sterk positief) wordt getemperd door stagnerende telecom-capex. Binnen die 8–12%: verticale glasvezel-/uitrolplatforms **+15–20%**, datacenterplanning **+15%+**, klassieke P6/MSP-seats **vlak tot licht dalend**.

---

## 9.7 NIEUW: aanvullingen op de leveranciers- en gebruikersanalyse

### 9.7.1 Atlassian: hardere cijfers

| Metriek | Waarde | Bron |
|---|---|---|
| Omzet FY2025 | USD **5.215 mln**, +20% j-o-j | [Atlassian Q4 FY25](https://www.atlassian.com/blog/announcements/shareholder-letter-q4fy25), [Businesswire](https://www.businesswire.com/news/home/20250807057757/en/Atlassian-Announces-Fourth-Quarter-and-Fiscal-Year-2025-Results) |
| Klanten totaal | >300.000 | idem |
| **Jira-klanten** | **>125.000** | idem |
| Jira Service Management-klanten | >55.000 | idem |
| Klanten met >USD 10.000 Cloud-ARR | **51.978**, +13% j-o-j | idem |
| Deals >USD 1 mln ACV | recordaantal, ~~>1,5× het jaar ervoor~~ → **2× j-o-j** ("up 2x YoY" in de aandeelhoudersbrief zelf); ook cloudmigraties +60% j-o-j | [Atlassian Q4 FY25](https://www.atlassian.com/blog/announcements/shareholder-letter-q4fy25) |
| Regionaal | Americas USD 2,5 mrd, EMEA USD 2,1 mrd, APAC USD 574 mln | idem |
| AI-gebruikers | 2,3 mln maandelijks actief | idem |

Dit bevestigt en verscherpt §3.3: de betalingsbereidheid in deze sector is hoog — maar voor workflow en adoptie, niet voor planningsalgoritmiek.

### 9.7.2 Sitetracker: omvang en klanten

| Metriek | Waarde | Bron |
|---|---|---|
| ARR (2024) | USD **75 mln** | [Getlatka](https://getlatka.com/companies/sitetracker) |
| Opgehaald kapitaal | USD 153 mln over 5 rondes (Series D USD 66 mln, 2022); andere telling USD 207 mln | [Tracxn](https://tracxn.com/d/companies/sitetracker/__LG_u9KPqRjbT9by4vrLg2bhLKoOrj1wPqqPBDQ2tENE), [citybiz](https://www.citybiz.co/article/327095/sitetracker-completes-96m-in-series-d-equity-and-debt-financing/) |
| Landen | 30 | [citybiz](https://www.citybiz.co/article/327095/sitetracker-completes-96m-in-series-d-equity-and-debt-financing/) |
| Beheerd portfolio | *"millions of sites and projects representing over $12 billion of portfolio holdings globally"* | [Salesforce AppExchange](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000DvOROUA3) |
| Klanten (aanvullend op §2.1) | AT&T, BT, Vodafone, Ericsson, Vantage Towers, VerticalBridge, Zayo, Circet; ook Telefónica, Cox, EDOTCO, Axione, E.On, Iberdrola, Engie, NextEra, Southern Company | [Sitetracker](https://www.sitetracker.com/industries/telecommunications/), [citybiz](https://www.citybiz.co/article/327095/sitetracker-completes-96m-in-series-d-equity-and-debt-financing/) |

**[VERIFICATIE-VOORBEHOUD]** Getlatka is een aggregator die ARR **schat**; het cijfer is geen bedrijfsopgave. Getlatka zet Sitetracker op USD 75 mln (2024) tegen USD 39,2 mln (2023) — een sprong van +91% in één jaar, wat op zichzelf al aangeeft dat de reeks geschat is en niet gerapporteerd. Ook de kwalificatie **"marktleider"** is niet onafhankelijk vastgesteld: IQGeo (in september 2024 overgenomen door KKR en sindsdien niet meer beursgenoteerd, dus zonder publieke cijfers) bedient dezelfde categorie met een vergelijkbare operatorreferentielijst. Behandel zowel het bedrag als het leiderschap als **onzeker**; de hele categorie-schatting hieronder hangt aan dit ene, zwakke anker.

Deze USD 75 mln ARR is een nuttig ankerpunt bij de **[SCHATTING]** van USD 0,4–0,8 mrd voor alle telecom-uitrolplatforms in §4.2: als de marktleider USD 75 mln doet, ligt die schatting eerder aan de onderkant of zelfs daaronder. **Bijgestelde schatting: USD 250–400 mln/jaar voor de hele categorie (Sitetracker, Vitruvi, Render, IQGeo, 3-GIS, VETRO, Fieldflex), tegen de USD 0,4–0,8 mrd in §4.2. [SCHATTING]**

**Kritiek dat deze ronde toevoegt:** Sitetracker's *"reliance on the Salesforce platform and lack of GIS integration can be limiting"* ([Vitruvi](https://vitruvisoftware.com/blog/sitetracker-competitors)) — een dubbele licentiestapel. En Render Networks' *"reliance on GIS and its redlining process can slow teams down during design changes"* ([SaaSHub](https://www.saashub.com/render-networks-alternatives)). Noteer dat de eerste twee kritieken van een directe concurrent komen en dus met korrel zout moeten.

### 9.7.3 State of Agile: het hybride cijfer is hoger dan de hoofdtekst aanneemt

§1.1 gebruikt de 17e editie: **42% hybride**. Recentere metingen:

- **74% van de organisaties gebruikt inmiddels hybride of zelfgebouwde aanpakken**, tegen circa 10% jaren geleden; **65%** gebruikt een geschaald agile-framework ([18th State of Agile Report-samenvatting](https://pawelrola.com/18th-state-of-agile-report-2025-10-key-insights-shaping-modern-agile-organizations/)).
- SAFe-adoptie schommelt: **44%** in de Digital.ai-meting 2025, na een piek van 53% en een dal van 26% ([KnowledgeHut](https://www.knowledgehut.com/blog/agile/state-of-agile), [StarAgile](https://staragile.com/blog/state-of-agile)).
- 25% van de organisaties rapporteert problemen met het schalen van agile ([KnowledgeHut](https://www.knowledgehut.com/blog/agile/state-of-agile)).

**Gevolg voor §1.1 en §7.2:** het scharnierpunt dat de hoofdtekst op 42% zet, is inmiddels **74%**. De doelgroep die structureel een gat heeft tussen agile teams en mijlpaalverplichtingen is dus bijna twee keer zo groot als de hoofdtekst aanneemt. Dat versterkt opening 7.2 ("een lichte CPM-motor die uit Jira-data een echt netwerkschema afleidt") aanzienlijk.

### 9.7.4 Gartner-positionering 2025

De Gartner Magic Quadrant *Adaptive Project Management and Reporting* van **17 september 2025** (analisten Sean Bankston, Jennifer Jackson, Kevin Rose) beoordeelt Asana, monday.com, Planforge, Planisware, Planview (AdaptiveWork en Sciforma), Prism PPM, ProSymmetry, Smartsheet en Wrike ([Gartner](https://www.gartner.com/en/documents/6965466)). Planisware is Leader voor het vierde jaar op rij ([Planisware](https://planisware.com/planisware-named-leader-2025-gartner-magic-quadrant-adaptive-project-management-reporting)); Planview Sciforma is Visionary ([Planview](https://info.planview.com/gartner-adaptive-pm-reporting-mq-_report_prm_en_reg.html)).

**Opmerkelijk:** in deze MQ komen **Oracle Primavera, Microsoft Project en Atlassian niet voor**. Gartner beschouwt "adaptive PM" dus als een aparte categorie naast zowel de klassieke CPM-planners als de agile-tools. Dat bevestigt de driedeling uit §1.1 van de hoofdtekst.

### 9.7.5 Datacenterbouw: aanvullende kwantificering

§7.1 wijst datacenterbouw aan als beachhead. Deze ronde voegt toe:

- Doorlooptijd hyperscale: **18–24 maanden** van vroege planning tot ingebruikname; vertragingen zijn vrijwel altijd terug te voeren op stroominfrastructuur, vergunningen en langlopende apparatuur ([Opendock](https://blog.opendock.com/data-center-construction-timeline)).
- **Grote vermogenstransformatoren hebben nu levertijden tot 60 maanden**, historisch 5–16 maanden ([The Fast Mode](https://www.thefastmode.com/expert-opinion/47210-what-we-learned-in-2025-about-data-center-builds-why-delays-will-persist-in-2026-without-greater-visibility)). Dit vult §1.4 aan, dat de levertijden wel noemde maar niet kwantificeerde.
- De sectordiagnose van 2025, vrijwel woordelijk een functionele specificatie voor wat er ontbreekt: schema's zijn *"manually updated, siloed by trade, reliant on subjective progress reporting, disconnected from procurement, logistics, and commissioning, and projects slip because the system is incapable of detecting slippage early enough to act"* ([The Fast Mode](https://www.thefastmode.com/expert-opinion/47210-what-we-learned-in-2025-about-data-center-builds-why-delays-will-persist-in-2026-without-greater-visibility)).
- P6 is hier de zittende standaard: *"one of the most widely used scheduling tools in large construction programs, particularly for complex infrastructure and mission critical projects"*, expliciet toegepast op hyperscale datacenters ([CPM Pros](https://cpmpros.com/data-center)).

### 9.7.6 Geschillen: generieke ijkmaten

Als kalibratie voor de kosten van vertraging (§1.6), uit de bredere bouwgeschillenpraktijk:

- HKA's CRUX-dataset bestrijkt **2.200+ projecten in 114 landen** met een gezamenlijke capex van **USD 2,433 biljoen**; geclaimde bedragen zijn gemiddeld **33,4% van het contractbudget** en geclaimde tijdsverlengingen gemiddeld **65,8% van de geplande duur** ([HKA CRUX Insight](https://www.hka.com/crux-insight/)).
- Scope change is de belangrijkste trigger, aanwezig in **73%** van de grote geschillen ([Arcadis-analyse via Archdesk](https://archdesk.com/blog/construction-delays-cost-overruns-2026)).

Deze cijfers zijn niet telecom-specifiek — HKA rapporteert niet apart over telecom — maar geven de orde van grootte voor de datacenterbouwkant, waar §5.7 van de hoofdtekst terecht opmerkt dat dit de enige plek in de sector is waar schema's in rechtszaken belanden.

### 9.7.7 Regulatoire boetes: concrete bedragen

§1.5 noemde dekkingsverplichtingen zonder bedragen. Concreet:

- **Colombia:** het ICT-ministerie beboette Telecall Colombia met COP 7,42 mrd (**USD 1,8 mln**) wegens het niet nakomen van 5G-spectrumlicentieverplichtingen — gemiste eerste betaling en ontbrekende prestatie- en aansprakelijkheidsgaranties ([Developing Telecoms](https://www.developingtelecoms.com/telecom-business/operator-news/20408-colombia-fines-telecall-1-8m-over-5g-licence-breaches.html)).
- **India:** boetes bij niet-nakoming van rollout-verplichtingen beginnen bij Rs 1 lakh per week (eerste 13 weken), stijgen naar Rs 2 lakh per week (volgende 13 weken), gevolgd door een show-cause notice; Adani's 5G-spectrum kwam hierdoor onder druk ([RCR Wireless](https://www.rcrwireless.com/20250115/featured/adani-dot-5g-delays), [Outlook Business](https://www.outlookbusiness.com/corporate/adanis-5g-spectrum-in-limbo-as-govt-questions-rollout-delay)).
- Algemeen: niet-naleving kan leiden tot **licentie-intrekking**, forse boetes en reputatieschade ([Wray Castle](https://wraycastle.com/blogs/telecoms-regulation-knowledge-base/telecom-regulatory-compliance-frameworks-risks-and-how-to-stay-ahead-in-2025), [Digital Regulation Platform](https://digitalregulation.org/overview-of-national-spectrum-licensing-2/)).

**Kanttekening:** dit zijn boetes in de orde van miljoenen bij programma's van miljarden. De regulatoire boete is dus zelden op zichzelf de businesscase voor planningssoftware; de gederfde omzet en de dubbele mobilisatiekosten (§1.6) wegen zwaarder. Het regulatoire risico is vooral een *bestuurlijke* driver: het maakt vertraging zichtbaar op raad-van-bestuurniveau.

---

## 9.8 NIEUW: het DCMA-tooling-gat, expliciet

§7.2 stelt terecht voor om DCMA-14-punts- en GAO-10-checks in te bouwen. Deze ronde onderbouwt waarom dat een gat is en geen vanzelfsprekendheid:

- De DCMA 14-punts-assessment is uitgegroeid tot brede acceptatie-eis: *"adopted widely by transit authorities, hospital systems, airport programs, and major owner-rep firms as a baseline acceptance requirement for P6 schedules on complex construction projects"* ([ScheduleLens](https://schedulelens.com/blog/dcma-14-point-assessment/)).
- De aanbeveling aan opdrachtgevers luidt: *"If you're reviewing a contractor's programme, make the DCMA 14-Point a contractual requirement at submission"* ([ScheduleLens](https://schedulelens.com/blog/dcma-14-point-assessment/)).
- **En dan het gat:** *"For P6, you'll need a third-party tool such as Acumen Fuse, ScheduleReader Pro, or the DCMA Excel template. Import the XER file into your chosen tool."* ([ScheduleLens](https://schedulelens.com/blog/dcma-14-point-assessment/)).
- De criteria zelf zijn publiek gedocumenteerd ([ScheduleReader](https://schedulereader.com/dcma-14-point-assessment-project-schedule-quality-analysis/), [Ten Six eBook, februari 2025](https://tensix.com/wp-content/uploads/2025/02/Ten-Six-An-Introduction-to-the-DCMA-14-Point-Assessment-Guidelines-eBook.pdf)) — de hoofdtekst geeft in §5.2 de volledige lijst uit GAO-16-89G.

**Conclusie:** een contractuele eis waarvan de criteria publiek zijn, maar waarvan de uitvoering achter een betaalde add-on zit, is een leerboekvoorbeeld van een open-source-opening. Het is bovendien een acquisitiehaak: planners zoeken hier actief op.

---

## 9.9 Bijgestelde slotoordelen

| Punt uit de hoofdtekst | Bijstelling na de tweede ronde |
|---|---|
| §5.6/§7.2/§7.4 — "IFC dekt telecomnetwerken niet" | **Onjuist.** IFC 4.3 heeft een telecom-domeinmodel. De praktische aanbeveling (niet als telecomplanner positioneren) blijft, maar om commerciële in plaats van technische redenen. |
| §5.1 — DoD-EVMS-drempels [ONBEVESTIGD] | **Bevestigd:** USD 20 mln (naleving), USD 50 mln (validatie). Plus: EIA-748-**E** gepubliceerd februari 2026. |
| §5.4 — AACE RP-nummering [ONBEVESTIGD] | **Bevestigd:** RP 29R-03 *Forensic Schedule Analysis*, negen methoden. |
| §1.5 — BEAD-verplichtingen niet ophaalbaar | **Bevestigd uit primaire NTIA-bronnen:** vierjaarstermijn, tussenmijlpalen, semi-jaarlijkse rapportage. Budgetcijfer blijft onbevestigd. |
| §6 — Jira geen kritiek pad [INFERENTIE] | **Positief bevestigd**, inclusief het openstaande Atlassian-issue. |
| §1.1 — 42% hybride | **74%** in recentere metingen. De doelgroep voor opening §7.2 is bijna twee keer zo groot. |
| §4.1 — USD 2,46 mrd (2025) | **Consistent**; bredere PM-definitie geeft USD 2,7–3,2 mrd. Gecombineerd: **USD 2,5–3,2 mrd**. |
| §4.2 — uitrolplatforms USD 0,4–0,8 mrd | **Naar beneden bijgesteld: USD 250–400 mln [SCHATTING]**, gegeven dat marktleider Sitetracker USD 75 mln ARR doet. |
| §4.4 — "groeirichting sterk positief" | **Genuanceerd:** datacenter sterk positief, maar telecom-capex daalt 2% in 2026 en groeit daarna ~1%/jaar. Netto **8–12%** voor het OPS-relevante deel. |
| §6 — MS Project cloud zonder prijs | **Prijzen nu bekend:** Plan 3 USD 30, Plan 5 USD 55 per gebruiker/maand. |
| — (ontbrak) | **Nieuw en tijdkritisch: Project Online wordt 30 september 2026 ingetrokken.** Migratievenster loopt nu. |

**Eén toevoeging aan de openingenlijst van §7.3:**

| # | Opening | Onderbouwing |
|---|---|---|
| 9 | **De Project Online-migratiegolf, vóór 30 september 2026** | Microsoft blokkeert nieuwe PWA-sites sinds 1 april 2026 en maakt data na 30 september 2026 ontoegankelijk ([Microsoft](https://www.microsoft.com/en-us/microsoft-365/planner/project-plan-3)); Plan 5 is end of sale per 1 mei 2026 ([A Guide to Cloud](https://www.aguidetocloud.com/licensing/microsoft-project/)). Vereist MSPDI/XML-import om te vangen. Dit is de enige opening in dit rapport met een harde einddatum. |

---

## §9 — Bronnenlijst van de tweede ronde

*(Aanvullend op de bronnenlijst hierboven; nummering loopt door vanaf 50.)*

### Marktomvang en analisten
51. Mordor Intelligence — Project Management Software Systems Market: https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market
52. Precedence Research — Online Project Management Software Market: https://www.precedenceresearch.com/online-project-management-software-market
53. Credence Research — Project Management Software Market: https://www.credenceresearch.com/report/project-management-software-market
54. SkyQuest — Project Management Software Market: https://www.skyquestt.com/report/project-management-software-market
55. Future Market Insights — Project Management Software Market: https://www.futuremarketinsights.com/reports/project-management-software-market
56. Emergen Research — Project Management Software Market: https://www.emergenresearch.com/industry-report/project-management-software-market
57. Grand View Research — Project Management Software Market Report: https://www.grandviewresearch.com/industry-analysis/project-management-software-market-report
58. Datanyze — Project Management market share (Jira nr. 1): https://www.datanyze.com/market-share/project-management--217
59. Gartner — Magic Quadrant for Adaptive Project Management and Reporting (17 september 2025): https://www.gartner.com/en/documents/6965466
60. Planisware — Leader in de 2025 Gartner MQ: https://planisware.com/planisware-named-leader-2025-gartner-magic-quadrant-adaptive-project-management-reporting
61. Planview — 2025 Gartner MQ APMR: https://info.planview.com/gartner-adaptive-pm-reporting-mq-_report_prm_en_reg.html

### Telecom-capex en marktcijfers
62. Dell'Oro Group — Worldwide Telecom Capex to Decline in 2026 (2 april 2026): https://www.delloro.com/news/worldwide-telecom-capex-to-decline-in-2026/
63. RCR Wireless — Global telecom capex set to fall in 2026 (3 april 2026): https://www.rcrwireless.com/20260403/5g/global-telecom-capex-2
64. IEEE ComSoc / Omdia — Global telecom connectivity market Q4 2025 (april 2026): https://techblog.comsoc.org/2026/04/20/omdia-global-telecom-connectivity-market-hit-333-billion-in-q4-2025-5-yoy-growth/
65. IEEE ComSoc — Omdia en Dell'Oro over 6G- en AI-investeringen (31 oktober 2025): https://techblog.comsoc.org/2025/10/31/market-research-firms-omdia-and-delloro-on-impact-of-6g-and-ai-investments/
66. GSMA — About us (>1.000 operators, ~4.500 netwerken; bijna 750 leden): https://www.gsma.com/about-us/

### Regelgeving, subsidies en normen
67. NTIA — BEAD Obligations for Subgrantees Deploying Network Projects (augustus 2025): https://broadbandusa.ntia.gov/sites/default/files/2025-08/BEAD_Obligations_for_Subgrantees_Deploying_Network_Projects.pdf
68. NTIA — BEAD Semi-Annual (Technical) Report Guidance: https://broadbandusa.ntia.gov/technical-assistance/BEAD_Semi_Annual_Report_Guidance
69. NTIA — BEAD Restructuring Policy Notice (6 juni 2025): https://www.ntia.gov/sites/default/files/2025-06/bead-restructuring-policy-notice.pdf
70. NTIA — BEAD Frequently Asked Questions v3.0: https://broadbandusa.ntia.gov/sites/default/files/2023-07/BEAD_Frequently_Asked_Questions_Version_3.0.pdf
71. Congressional Research Service — R48666, The BEAD Program: Issues for Congress: https://www.congress.gov/crs_external_products/R/PDF/R48666/R48666.1.pdf
72. AcqNotes — NDIA EIA-748 Earned Value Management (drempels USD 20/50 mln; EIA-748-E februari 2026): https://acqnotes.com/acqnote/tasks/ansi-eia-748-earned-value-management
73. NDIA IPMD — Division Guides and Resources (Intent Guide herzien mei 2026): https://www.ndia.org/divisions/ipmd/division-guides-and-resources
74. NDIA IPMD — EIA-748 EVMS Intent Guide (versie D, augustus 2018): https://www.ndia.org/-/media/sites/ndia/divisions/ipmd/division-guides-and-resources/ndia_ipmd_intent_guide_ver_d_aug282018
75. Roland Wanner — EIA-748 en de 27 EVMS-richtlijnen: https://rolandwanner.com/eia-748-and-27-earned-value-management-systems-evms-guidelines/
76. ProjectManagement.com — When Earned Value Meets Agile: https://www.projectmanagement.com/articles/338170/When-Earned-Value-Meets-Agile
77. AACE International — RP 29R-03 Forensic Schedule Analysis (inhoudsopgave, PDF): https://web.aacei.org/docs/default-source/toc/toc_29r-03.pdf
78. Ankura — Harmonizing SCL D&D2 and AACE 29R-03: https://ankura.com/insights/harmonizing-scl-dd2-and-aace-29r-03-complementary-frameworks-for-forensic-delay-analysis-in-international-arbitration
79. ScheduleReader — DCMA 14-Point Assessment (criteria): https://schedulereader.com/dcma-14-point-assessment-project-schedule-quality-analysis/
80. ScheduleLens — DCMA 14-Point Assessment: Complete Guide with P6 Walkthrough (tooling-gat): https://schedulelens.com/blog/dcma-14-point-assessment/
81. ScheduleLens — Primavera P6 Schedule Review checklist: https://schedulelens.com/blog/primavera-p6-schedule-review/
82. Ten Six — An Introduction to the DCMA 14-Point Assessment Guidelines (eBook, februari 2025): https://tensix.com/wp-content/uploads/2025/02/Ten-Six-An-Introduction-to-the-DCMA-14-Point-Assessment-Guidelines-eBook.pdf
83. Ten Six — Primavera P6 USACE Mandatory Requirements: https://tensix.com/understanding-the-primavera-p6-usace-mandatory-requirements/
84. Developing Telecoms — Colombia fines Telecall USD 1,8 mln over 5G licence breaches: https://www.developingtelecoms.com/telecom-business/operator-news/20408-colombia-fines-telecall-1-8m-over-5g-licence-breaches.html
85. RCR Wireless — Adani/DoT 5G rollout delays (15 januari 2025): https://www.rcrwireless.com/20250115/featured/adani-dot-5g-delays
86. Outlook Business — Adani 5G spectrum in limbo (boetestructuur India): https://www.outlookbusiness.com/corporate/adanis-5g-spectrum-in-limbo-as-govt-questions-rollout-delay
87. Wray Castle — Telecom Regulatory Compliance 2025: https://wraycastle.com/blogs/telecoms-regulation-knowledge-base/telecom-regulatory-compliance-frameworks-risks-and-how-to-stay-ahead-in-2025
88. Digital Regulation Platform — Overview of national spectrum licensing: https://digitalregulation.org/overview-of-national-spectrum-licensing-2/

### IFC 4.3 en telecom
89. buildingSMART — Applying IFC 4.3 for Rail Project (telecom-domeinmodel, kabelsystemen langs alignment): https://www.buildingsmart.org/standards/domains/railway/applying-ifc-4-3-for-rail-project/
90. BibLus/ACCA — IFC 4.3, the new IFC standard for infrastructural works: https://biblus.accasoftware.com/en/ifc-4-3-the-new-ifc-standard-for-exchanging-openbim-models-of-infrastructural-works/
91. BibLus/ACCA — IFC 4.3, the openBIM standard also for infrastructure (ISO 16739-route): https://biblus.accasoftware.com/en/ifc-4-3-the-openbim-standard-also-for-infrastructure-possible-applications/
92. Autodesk — What's new in openBIM and Infrastructure: IFC 4.3 for Civil 3D: https://blogs.autodesk.com/infrastructure-reimagined/whats-new-in-openbim-and-infrastructure-ifc-4-3-for-civil-3d/

### Prijzen (tweede ronde)
93. Microsoft — Project Plan 3 productpagina (USD 30; Project Online-retirement 30 september 2026): https://www.microsoft.com/en-us/microsoft-365/planner/project-plan-3
94. A Guide to Cloud — Microsoft Project Plans (P1/P3/P5) Guide & Pricing 2026 (Plan 5 end of sale 1 mei 2026): https://www.aguidetocloud.com/licensing/microsoft-project/
95. costbench — Microsoft Project Pricing 2026: https://costbench.com/software/project-management/microsoft-project/
96. costbench — Jira Pricing 2026: https://costbench.com/software/project-management/jira/
97. VendorBenchmark — Jira (Atlassian) Pricing 2026 (contractwaarden, staffels, apps): https://vendorbenchmark.com/vendors/jira-atlassian-pricing
98. Atonement Licensing — Atlassian Cloud Pricing 2026 (app-opslag 40–80%): https://atonementlicensing.com/blog/atlassian-cloud-pricing-2026/
99. eesel AI — Comprehensive Jira pricing guide 2026: https://www.eesel.ai/blog/jira-pricing-guide
100. Appfire — 2026 app pricing: BigPicture for Jira: https://appfire.com/pricing-updates/big-picture-jira
101. Planyway — Jira Structure: Best Plugins Compared 2026 (Structure.Gantt-prijzen): https://planyway.com/blog/jira-structure-plugin
102. Ricksoft — Best Gantt Chart Add-ons for Jira (WBS Gantt-Chart met critical path): https://www.ricksoft-inc.com/post/best-jira-gantt-chart-add-ons/
103. VendorBenchmark — Broadcom Clarity PPM Pricing 2026 (verhogingen na overname): https://vendorbenchmark.com/vendors/broadcom-clarity-ppm-pricing
104. ITQlick — Clarity PPM Pricing 2026: https://www.itqlick.com/clarity-ppm/pricing
105. PricingNow — Clarity PPM Cost 2026: https://pricingnow.com/question/clarity-ppm-cost/
106. PeerSpot — Broadcom Clarity PPM pricing-ervaringen: https://www.peerspot.com/questions/what-is-your-experience-regarding-pricing-and-costs-for-broadcom-clarity-ppm
107. ITQlick — Oracle Primavera P6 Plans & Hidden Fees 2026: https://www.itqlick.com/oracle-primavera-p6/pricing
108. Ten Six — How Much Does Primavera P6 Cost: https://tensix.com/how-much-does-primavera-p6-cost/
109. VendorBenchmark — PPM Software Pricing Guide 2026 (Planview USD 300k–2 mln+): https://vendorbenchmark.com/benchmarks/project-portfolio-management-pricing-guide
110. SelectHub — ServiceNow SPM Reviews 2026: https://www.selecthub.com/p/ppm-software/servicenow-spm/
111. Spendhound — Smartsheet Pricing 2026 (kortingsniveaus): https://www.spendhound.com/marketplace/smartsheet-pricing
112. tech.co — Smartsheet Pricing 2026: https://tech.co/project-management-software/smartsheet-pricing
113. costbench — Smartsheet Pricing 2026: https://costbench.com/software/project-management/smartsheet/

### Atlassian bedrijfscijfers
114. Atlassian — Q4 FY25 aandeelhoudersbrief (125.000+ Jira-klanten, 51.978 >USD 10k ARR): https://www.atlassian.com/blog/announcements/shareholder-letter-q4fy25
115. Businesswire — Atlassian Q4 en FY2025 resultaten (7 augustus 2025): https://www.businesswire.com/news/home/20250807057757/en/Atlassian-Announces-Fourth-Quarter-and-Fiscal-Year-2025-Results
116. SEC — Atlassian Corp Form DEF 14A FY2025: https://www.sec.gov/Archives/edgar/data/1650372/000165037225000058/team-20251014.htm

### Jira-beperkingen
117. Werkstack — How to Manage Dependencies in Jira (geen critical path, alleen FS, geen lag/lead): https://werkstack.dev/blog/how-to-manage-dependencies-in-jira
118. Atlassian — JPOSERVER-3116: Critical Path (openstaand verzoek): https://jira.atlassian.com/browse/JPOSERVER-3116
119. Atlassian — Dependencies in Advanced Roadmaps (documentatie): https://confluence.atlassian.com/spaces/JIRASOFTWARE/pages/1688898866/Dependencies+in+Advanced+Roadmaps
120. Atlassian — Master Planning with Jira Advanced Roadmaps: https://www.atlassian.com/software/jira/guides/advanced-roadmaps/overview

### Telecom-uitrolplatforms (tweede ronde)
121. Sitetracker — Telecommunications (klantenlijst): https://www.sitetracker.com/industries/telecommunications/
122. Sitetracker — Fiber Network Construction Management: https://www.sitetracker.com/industries/fiber-networks/
123. Salesforce AppExchange — Sitetracker listing (USD 12 mrd portfolio): https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000DvOROUA3
124. Getlatka — Sitetracker USD 75 mln ARR: https://getlatka.com/companies/sitetracker
125. citybiz — Sitetracker completes USD 96M Series D: https://www.citybiz.co/article/327095/sitetracker-completes-96m-in-series-d-equity-and-debt-financing/
126. Tracxn — Sitetracker company profile: https://tracxn.com/d/companies/sitetracker/__LG_u9KPqRjbT9by4vrLg2bhLKoOrj1wPqqPBDQ2tENE
127. Vitruvi — Top 8 Telecom Project Management Software Solutions: https://vitruvisoftware.com/blog/top-telecom-project-management-software
128. Vitruvi — Sitetracker Competitors: Top 10 Alternatives: https://vitruvisoftware.com/blog/sitetracker-competitors
129. Vitruvi — Fiber and broadband construction software: https://vitruvisoftware.com/fiber-and-broadband
130. SaaSHub — Render Networks alternatives (kritiek op redlining): https://www.saashub.com/render-networks-alternatives
131. Hexagon — Getting FTTH Deployment Right: https://aliresources.hexagon.com/articles-blogs/getting-fiber-to-the-home-ftth-deployment-right-the-real-competitive-edge-in-telecom

### Datacenterbouw (tweede ronde)
132. CPM Pros — Data Center Construction Scheduling (CPM P6): https://cpmpros.com/data-center
133. The Fast Mode — What We Learned in 2025 About Data Center Builds (transformatoren 60 maanden): https://www.thefastmode.com/expert-opinion/47210-what-we-learned-in-2025-about-data-center-builds-why-delays-will-persist-in-2026-without-greater-visibility
134. Opendock — Data Center Construction Timeline (18–24 maanden): https://blog.opendock.com/data-center-construction-timeline
135. iRecruit — Data Center Schedule Risks & Delays: https://www.irecruit.co/insights/data-center-schedule-risks
136. Consult Leopard — Beyond the Critical Path: Cost Control in Data Center Programs: https://consultleopard.com/data-center-construction-schedule-risk-management-part-2/

### Agile, hybride en projectprestaties
137. Pawel Rola — 18th State of Agile Report (2025): 10 Key Insights (74% hybride, 65% scaled framework): https://pawelrola.com/18th-state-of-agile-report-2025-10-key-insights-shaping-modern-agile-organizations/
138. KnowledgeHut — State of Agile 2025 (SAFe 44%): https://www.knowledgehut.com/blog/agile/state-of-agile
139. StarAgile — State of Agile 2026: https://staragile.com/blog/state-of-agile
140. Scaled Agile — State of SAFe Report 2025: https://scaledagile.com/resources/state-of-safe-report/
141. McKinsey / University of Oxford — Delivering large-scale IT projects (PDF, 5.400 projecten): https://www.mckinsey.com/~/media/McKinsey/Business%20Functions/McKinsey%20Digital/Our%20Insights/Delivering%20large%20scale%20IT%20projects%20on%20time%20on%20budget%20and%20on%20value/Delivering%20large%20scale%20IT%20projects%20on%20time%20on%20budget%20and%20on%20value.pdf
142. HKA — CRUX Insight (2.200+ projecten, 114 landen, USD 2,433 biljoen): https://www.hka.com/crux-insight/
143. HKA — Top Causes of Construction Claims in 2025 by Delivery Method: https://www.hka.com/article/construction-claims-causes-2025-project-delivery/
144. Archdesk — Global Construction Delays & Cost Overruns: 2026 Insights (Arcadis 73%): https://archdesk.com/blog/construction-delays-cost-overruns-2026

### Integratie en toolvergelijkingen
145. Planning Engineer FZE — Primavera P6 Integration with Other Project Management Tools: https://planningengineer.net/primavera-p6-integration-with-other-project-management-tools/
146. TPG The Project Group — Primavera Integration (PSLink middleware): https://www.theprojectgroup.com/en/middleware/primavera-integration
147. Epicflow — System Integration with MS Project, Jira, Oracle Primavera: https://www.epicflow.com/integrations/
148. SelectHub — Jira vs Primavera P6 (2026): https://www.selecthub.com/project-management-software/jira-vs-primavera-p6/
149. SelectHub — Microsoft Project vs Primavera P6 (2026): https://www.selecthub.com/project-management-software/microsoft-project-vs-primavera-p6/
150. Ericsson — Network Deployment / 5G Intelligent Deployment (Digital Project Management, Site Digital Twin): https://www.ericsson.com/en/network-services/deployment

---

*Einde addendum §9 (voor de derde, adversariële verificatieronde: zie "## Verificatie" onderaan). Methodologische noot bij deze tweede ronde: circa 20 webzoekopdrachten plus gerichte pagina-ophaalacties. Waar analistenbureaus onderling afwijken is de spreiding getoond in plaats van één getal gekozen. Prijsinformatie van derde-partij-vergelijkingssites (VendorBenchmark, ITQlick, costbench, Spendhound) is minder betrouwbaar dan leverancierspagina's; leverancierslijstprijzen (Microsoft, Atlassian, Appfire) zijn daarom apart genoemd van afgeleide onderhandelde bedragen. Alle eigen berekeningen zijn gemarkeerd met **[SCHATTING]** en tonen hun invoerwaarden, zodat ze navolgbaar en betwistbaar zijn.*

---
---

# Verificatie

**Derde ronde, adversarieel — 25 juli 2026.** Opdracht: probeer de belangrijkste falsifieerbare beweringen actief te **weerleggen**, reken doorgerekende schattingen na, en corrigeer rekenfouten. Beperking van deze ronde: het WebSearch-quotum van de sessie was op; alle controles zijn gedaan met directe WebFetch-ophalingen van de geciteerde bronnen, PDF-extractie (GSMA) en de GitHub-API (IfcOpenShell). Bronnen die bij hercontrole HTTP 403 gaven zijn als **onzeker** gemarkeerd in plaats van als bevestigd.

## V1. "Er bestaat geen open-source tool die IFC en CPM koppelt" — **WEERLEGD**

Dit was de expliciet als *"belangrijkste bevinding van dit hele rapport"* aangemerkte claim (§6, §7.1, §7.3 rij 1). Hij is onjuist.

**IfcOpenShell / Bonsai (voorheen BlenderBIM), LGPL-3.0, doet precies dit:**

| Wat de claim ontkende | Wat er feitelijk is |
|---|---|
| CPM-engine in open source op IFC | `recalculate_schedule.py`: docstring zegt *"Calculate the critical path and floats for a work schedule"* en *"critical path analysis, using the forward pass and backward pass method"*; berekent `early_start/early_finish/late_start/late_finish`, `total_float`, `free_float`; zet `"IsCritical": data["total_float"].days == 0` |
| Kalenders, lags, relatietypen | `add_work_calendar`, `add_work_time`, `assign_lag_time`, `edit_lag_time`, `edit_sequence`, `assign_recurrence_pattern` |
| 4D taak↔element | `assign_product` / `unassign_product` in dezelfde sequence-API |
| Baselines | `create_baseline.py` |
| P6/MSP-interoperabiliteit | `src/ifc4d/`: `p62ifc.py`, `ifc2p6.py` (P6 XML), `p6xer2ifc.py` (**XER**), `msp2ifc.py`, `ifc2msp.py` (MS Project), `pp2ifc.py` (Powerproject), `csv4d2ifc.py` |
| Gantt-UI | Bonsai noemt "Costing and scheduling" en toont een Gantt-diagram op zijn eigen homepage |

Bronnen: [ifcopenshell/api/sequence](https://github.com/IfcOpenShell/IfcOpenShell/tree/master/src/ifcopenshell-python/ifcopenshell/api/sequence), [recalculate_schedule.py](https://github.com/IfcOpenShell/IfcOpenShell/blob/v0.8.0/src/ifcopenshell-python/ifcopenshell/api/sequence/recalculate_schedule.py), [src/ifc4d/ifc4d](https://github.com/IfcOpenShell/IfcOpenShell/tree/master/src/ifc4d/ifc4d), [bonsaibim.org](https://bonsaibim.org/).

**Oordeel: GECORRIGEERD (weerlegd).** Het rapport controleerde alleen OpenProject en ProjectLibre en concludeerde uit die twee dat de categorie leeg is — dezelfde inferentie-uit-afwezigheid waar §9.1 het rapport al eerder op betrapte. De herformulering die overeind blijft: het onderscheid van OPS is **distributie en UX** (browserbuild, plannersinterface, geen Blender-installatie) plus mogelijk volwassenheid van de solver — **niet** het bestaan van de functionaliteit. Elke positionering, roadmap of pitch die op "niemand doet dit" leunt, moet worden herschreven.

## V2. Laag A — "USD 2,5–3,2 mrd (2025), ondergrens 0,2815 × 9,76, bovengrens 0,35 × 9,20" — **REKENKUNDIG JUIST, RANGE ONJUIST GELABELD**

Nagerekend en bronnen hercontroleerd:

- Mordor *Project Management Software Systems*: USD **9,76** mrd (2025), USD 11,27 mrd (2026), USD 23,09 mrd (2031), CAGR **15,42%**, IT & telecom **28,15%**, cloud 74,20%, grote ondernemingen 60,35%, Noord-Amerika 36,12% — **alle bevestigd** ([Mordor](https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market)).
- Precedence *Online PM Software*: USD **9,20** mrd (2025), USD 10,40 mrd (2026), USD 31,90 mrd (2035), CAGR **13,24%**, IT & telecom **35%** in 2025 → **37%** in 2035 bij **15,50%** CAGR — **alle bevestigd** ([Precedence](https://www.precedenceresearch.com/online-project-management-software-market)).
- Mordor *PPM*: USD **6,90** mrd (2025) → USD 13,21 mrd (2031), CAGR **11,43%**, IT & telecom **35,60%** — **bevestigd** ([Mordor](https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market)).
- Rekenwerk: 0,2815 × 9,76 = **2,747** ✔ ; 0,35 × 9,20 = **3,220** ✔ ; 0,3560 × 6,90 = **2,456** ✔ ; CAGR-consistentie van alle vier de reeksen nagerekend (9,76 × 1,1542⁶ = 23,13 ≈ 23,09 ✔ ; 9,20 × 1,1324¹⁰ = 31,9 ✔ ; 6,90 × 1,1143⁶ = 13,25 ≈ 13,21 ✔ ; 9,0 × 1,123⁸ = 22,8 ≈ >22,9 ✔).

**Wat er wél mis is:**

1. **"Ondergrens" is geen ondergrens.** De aangehaalde aandelen lopen van 19,2% (GVR) tot 35% (Precedence) en de marktomvangen van 8,98 tot 9,76 mrd. De laagste combinatie is 0,192 × 8,98 = **USD 1,72 mrd**; met alleen de 2024/2025-aandelen 0,24 × 9,0 = **USD 2,16 mrd**. De gepresenteerde 2,75 is dus een *middenwaarde*, gepresenteerd als vloer. Eerlijke spreiding: **USD 1,7–3,2 mrd**, of **USD 2,2–3,2 mrd** als je GVR (2022) en Emergen (2024) als verouderd laat vallen — wat expliciet gemotiveerd moet worden, niet stilzwijgend.
2. **De PPM-kruiscontrole valt buiten de eigen band.** De tekst noemt USD 2,46 mrd "consistent" met een band die bij 2,5 begint. 2,46 < 2,5. Zet de vloer op 2,46 of noem het afgerond.
3. **Schijn-onafhankelijkheid.** Twee van de aangehaalde "bureaus" zijn hetzelfde bureau (Mordor PPM + Mordor PM Software Systems). "Consistent over meerdere bureaus" is daardoor zwakker dan het lijkt: er zijn feitelijk drie onafhankelijke huizen in het midden (Mordor, Precedence, Credence), en die publiceren markten binnen 8% van elkaar — verdacht convergent voor niet-peer-reviewed vendorresearch.

**Oordeel: GECORRIGEERD** — het rekenwerk klopt, de labels "ondergrens/bovengrens" niet. Gebruik **USD 2,2–3,2 mrd (2025)** met de expliciete kanttekening dat de spreiding tot USD 1,7 mrd doorloopt als je alle aangehaalde aandelen meetelt.

## V3. "Atlassian deed méér omzet dan de hele PM-softwaremarkt" — **ONJUIST, GECORRIGEERD IN §4.2 EN §9.5**

- Atlassian FY2025: **USD 5,2 mrd, +20% j-o-j** (van USD 4,4 mrd in FY2024); **51.978** klanten met >USD 10.000 Cloud-ARR, **+13%** j-o-j; USD 1,4 mrd vrije kasstroom; 2,3 mln AI-MAU — **bevestigd** ([Businesswire](https://www.businesswire.com/news/home/20250807057757/en/Atlassian-Announces-Fourth-Quarter-and-Fiscal-Year-2025-Results), [Atlassian Q4 FY25](https://www.atlassian.com/blog/announcements/shareholder-letter-q4fy25)).
- **Maar:** USD 5,215 mrd < USD 6,90 mrd (Mordor PPM) en < USD 9,0–9,76 mrd (PM-software). De bewering "méér dan de hele markt" is dus **rekenkundig fout** in §4.2, in §9.5 én in de samenvattende WAARSCHUWING BIJ LAAG A. Correct: **76%** van de PPM-markt en **53–58%** van de PM-softwaremarkt.
- **Gecorrigeerd, niet weggegooid:** het onderliggende argument (analistenmarkten sluiten agile-werkbeheer grotendeels uit en zijn dus een conventie) blijft volledig geldig — het wordt alleen niet ondersteund door een getal dat niet klopt.
- Bijvangst: de tabel in §9.7.1 zei "deals >USD 1 mln ACV **>1,5×** het jaar ervoor"; de aandeelhoudersbrief zelf zegt **"up 2x YoY"**. Gecorrigeerd.

**Oordeel: GECORRIGEERD.**

## V4. Laag B — bottom-up seats en licentiewaarde — **REKENFOUT IN DE LICENTIEREGEL**

Seat-optelling nagerekend: 9.000 + 6.000 + 15.000 + 5.000 + 8.000 + 45.000 = **88.000** ✔ (klopt).

**De licentieregel klopt niet.** De opgegeven invoer is *P6 USD 1.300–2.500/jaar* en *MS Project Plan 3/5 USD 360–660/jaar*; de toegepaste "gemengde" waarde is USD **1.500–2.500** per seat. Een gewogen gemiddelde van een 1.300–2.500-band en een 360–660-band kan onmogelijk 1.500–2.500 zijn: de bovengrens van de mix is gelijkgesteld aan de bovengrens van het duurste product alleen, wat alleen geldig is bij **100% P6-cloud-seats**. Terwijl de seat-mix juist wordt gedomineerd door de 45.000 "grote IT-organisaties met watervalprogramma's" (51% van 88.000) — precies het segment waar MS Project heerst, niet P6.

Herberekening bij een verdedigbare mix van 25% P6 / 75% MS Project:

| | Laag | Hoog |
|---|---|---|
| Gewogen waarde per seat | 0,25 × 1.300 + 0,75 × 360 = **USD 595** | 0,25 × 2.500 + 0,75 × 660 = **USD 1.120** |
| × 88.000 seats | **USD 52 mln** | **USD 99 mln** |

Dus **USD 52–99 mln**, niet USD 130–220 mln — een overschatting met een factor **2,2–2,5×**. Opvallend en geruststellend: USD 52–99 mln valt vrijwel samen met de onafhankelijk opgebouwde Laag C (USD 30–110 mln) en met §4.3 (USD 18–78 mln licenties). De oorspronkelijke USD 130–220 mln was juist de *afwijkende* waarde en werd nergens tegen Laag C afgezet, terwijl beide hetzelfde meten.

**Doorwerking op het Laag B-totaal:**

| Regel | Origineel | Gecorrigeerd |
|---|---|---|
| Licenties | USD 130–220 mln | **USD 52–99 mln** |
| Verticale uitrolplatforms | USD 250–400 mln | ongewijzigd (maar zie V5) |
| Diensten/implementatie | USD 200–350 mln | **USD 150–300 mln** (0,7–1,5× de gecorrigeerde licentiebasis geeft 36–149 mln; de 200–350 was al niet consistent met de eigen 0,7–1,5×-vuistregel, dus hier conservatief bijgesteld in plaats van doorgerekend) |
| **Totaal Laag B** | USD 0,6–1,0 mrd | **USD 0,45–0,80 mrd** |
| "Alleen schematooling + diensten" | USD 0,33–0,57 mrd | **USD 0,20–0,40 mrd** |

**Twee bijkomende bevindingen:**
- **De seat-telling zelf is intern inconsistent.** §4.3 van de hoofdtekst schat 30.000–56.000 CPM-seats in dezelfde sector; Laag B komt op 88.000 — 57% tot 193% hoger, zonder dat het verschil ergens wordt benoemd of verklaard. Het verschil zit vrijwel volledig in de post "grote IT-organisaties met watervalprogramma's ~45.000", die zonder bron of afleiding is opgevoerd en in zijn eentje meer dan de helft van het totaal uitmaakt. **Onzeker.**
- **Er zijn vier verschillende dienstenmultiplicatoren in één document:** 0,5–1,5× (§3.2, pure CPM), 1–3× (§3.2, enterprise-PPM), 2–4× (§4.3) en 0,7–1,5× (Laag B). Kies er één en verantwoord hem, of het cijfer is stuurbaar naar elke gewenste uitkomst.

**Oordeel: GECORRIGEERD.** Laag B moet naar **USD 0,45–0,80 mrd (2025)**, en de plannerspopulatie moet als **30.000–88.000 met grote onzekerheid** worden gepresenteerd in plaats van als één getal.

## V5. "Marktleider Sitetracker doet USD 75 mln ARR" en de categorie op USD 250–400 mln — **ONZEKER**

- Getlatka bevestigt letterlijk USD 75 mln ARR (2024), USD 39,2 mln (2023), ~421 medewerkers, USD 153 mln opgehaald over 5 rondes ([Getlatka](https://getlatka.com/companies/sitetracker)) — dus het rapport citeert zijn bron correct.
- **Maar de bron deugt niet als feit.** Getlatka *schat* ARR; het is geen bedrijfsopgave. Een sprong van +91% in één jaar (39,2 → 75) is op zichzelf al een indicatie dat de reeks gemodelleerd is.
- **"Marktleider" is niet vastgesteld.** IQGeo is de meest voor de hand liggende falsificatie: dezelfde categorie, dezelfde operatorreferenties (DT, AT&T, Bell, VMO2, CityFibre). IQGeo is in september 2024 door KKR overgenomen en sindsdien niet meer beursgenoteerd; bij hercontrole was er geen publieke omzet meer op te halen ([IQGeo news](https://www.iqgeo.com/news)). Er is dus geen basis om Sitetracker boven IQGeo te plaatsen — noch om dat te weerleggen.
- **Gevolg:** de categorie-schatting van USD 250–400 mln rust volledig op één geschat, niet-gerapporteerd getal van één van de spelers. De rekenlogica ("marktleider doet 75, dus categorie 250–400" impliceert een marktaandeel van 19–30%) is verdedigbaar maar volledig ongetoetst.

**Oordeel: ONZEKER.** Bedrag en leiderschap beide markeren als schatting-op-schatting; niet gebruiken als anker voor iets anders.

## V6. Telecom-capex: richting **BEVESTIGD**, absoluut bedrag **WEERLEGD**

- **Bevestigd, woordelijk:** telecominvesteringen in 2025 *"flat in nominal US dollar (USD) terms"*; capex *"projected to decline 2 percent in 2026"*; daarna groei *"at a 1 percent CAGR through 2030"*; capex-to-revenue *"approach 14 percent by 2029"*; draadloze kapitaalintensiteit *"approach 11 percent in 2029"* tegen een 5G-piek van ~18%; publicatiedatum 2 april 2026 ([Dell'Oro](https://www.delloro.com/news/worldwide-telecom-capex-to-decline-in-2026/)).
- **Weerlegd:** "USD 303 mrd 2025 per RCR Wireless" en "−2% j-o-j in 2025, verbetering t.o.v. −3,5% in 2024". Het RCR-artikel bevat **geen** bedrag van 303 mrd en **geen** −3,5% voor 2024; het zegt dat 2025 *"remained broadly flat … across approximately 50 service providers, representing around 80% of global spending"* en dat de −2% op **2026** slaat ([RCR Wireless, 3 april 2026](https://www.rcrwireless.com/20260403/5g/global-telecom-capex-2)). Er is in dit rapport dus **geen geverifieerd absoluut capexbedrag voor 2025**.
- **Interne inconsistentie gevonden:** in hetzelfde blok staat "telecom-capex naar USD 395 mrd in 2030 (3,6% CAGR)". 3,6% over vijf jaar naar 395 impliceert een basis van ≈ USD 331 mrd in 2025 — niet 303 — en 3,6% is onverenigbaar met Dell'Oro's ~1% CAGR. Twee verschillende afbakeningen (Omdia vs Dell'Oro), gepresenteerd als één verhaal. Beide inline gemarkeerd.
- **GSMA-invoer wel bevestigd** (PDF-extractie): *"Operator capex of $1.3 trillion for the period 2024–2030"*, operatoromzet USD 1,08 bln (2024) → USD 1,25 bln (2030), unieke abonnees 4,7 mrd (58%) → 5,5 mrd (64%) ([GSMA Mobile Economy 2025](https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-economy/wp-content/uploads/2025/02/030325-The-Mobile-Economy-2025.pdf)). USD 1,3 bln ÷ 7 = USD 185,7 mrd/jaar ✔ (het rapport rondt af op 186).

**Oordeel: DEELS GECORRIGEERD.** De groeirichting (+8–12% netto voor het OPS-relevante deel, telecom vlak tot dalend, datacenter als motor) blijft staan; het bedrag USD 303 mrd moet uit alle samenvattingen verdwijnen.

## V7. Datacenter-anker (JLL) — **VOLLEDIG BEVESTIGD**

Woordelijk gecontroleerd op de JLL-outlook ([JLL Data Center Outlook](https://www.jll.com/en-us/insights/market-outlook/data-center-outlook)):
- *"the average global data center construction cost increased from $7.7 to $10.7 million per MW"*; 2026: *"average global cost will increase 6% to $11.3 million per MW"* ✔
- *"Nearly 100 GW of new data centers will be added between 2026 and 2030, doubling global capacity"* ✔
- *"$3 trillion investment required for 100 GW of new supply by 2030"*, met USD 1,2 bln vastgoed + USD 1–2 bln IT-apparatuur ✔
- *"roughly $870 billion of new debt financing"* ✔
- *"the average wait time for a grid connection in primary data center markets exceeds four years"* ✔

Afgeleide rekensommen nagerekend: 100.000 MW × USD 11,3 mln = USD 1,13 bln ÷ 5 jaar = **USD 226 mrd/jaar** ✔ (§4.3); USD 870 mrd × 6% = USD 52,2 mrd/jaar ÷ 12 = **USD 4,35 mrd/maand** ✔ (§1.6, correct als eigen illustratie gemarkeerd).

**Oordeel: BEVESTIGD.** Dit is het sterkste kwantitatieve fundament in het hele rapport — en niet toevallig de enige plek waar de bron een primaire marktrapportage is in plaats van een aggregator.

## V8. Prijzen — grotendeels **BEVESTIGD**, twee **WEERLEGD**

| Claim | Oordeel | Bron |
|---|---|---|
| Project Plan 3 = **USD 30,00 per gebruiker/maand, jaarlijks betaald** | **BEVESTIGD**, woordelijk | [Microsoft](https://www.microsoft.com/en-us/microsoft-365/planner/project-plan-3) |
| Project Online **wordt 30 september 2026 ingetrokken**; vanaf 1 april 2026 geen nieuwe PWA-sites, lege PWA-sites ontoegankelijk | **BEVESTIGD**, woordelijk op Microsofts eigen productpagina | idem |
| OpenProject Basic € 5,95 / Professional € 10,95 / Premium € 15,95, min. 25/25/100 users; **BIM-add-on € 1,00 per gebruiker** | **BEVESTIGD**, alle vijf getallen | [OpenProject](https://www.openproject.org/pricing/) |
| ProjectLibre "8,2 mln gebruikers **en** 8.200.000 downloads" in 193 landen | **GECORRIGEERD**: dit is één metriek, tweemaal geteld — de site claimt *"Trusted by 8.2 M+ users"* naast *"Downloaded Over 8,200,000"*, d.w.z. downloads = gebruikers. Leverancierszelfclaim over cumulatieve downloads, geen actieve installed base. | [ProjectLibre](https://www.projectlibre.com/) |
| Primavera P6 Cloud "vanaf ~USD 2.500/jaar per gebruiker" volgens Ten Six | **WEERLEGD**: de Ten Six-pagina bevat géén bedragen; ze verwijst naar shop.oracle.com en meldt alleen *"per user / per month"* met een minimum van 25 users. | [Ten Six](https://tensix.com/how-much-does-primavera-p6-cost/) |
| Primavera P6 Professional "vanaf ~USD 1.300/gebruiker/jaar" volgens ITQlick | **ONZEKER**: bron gaf HTTP 403 bij hercontrole; niet te verifiëren. | [ITQlick](https://www.itqlick.com/oracle-primavera-p6/pricing) |
| Jira Standard USD 7,91 / Premium USD 14,54 per gebruiker/maand | **ONZEKER**: de prijspagina rendert client-side en leverde bij hercontrole geen bedragen. De afgeleide rekensom klopt wel intern (3.000 × 14,54 × 12 = USD 523.440). | [Atlassian](https://www.atlassian.com/software/jira/pricing) |
| Structure.Gantt USD 3.005/maand bij 1.000 gebruikers → USD 36.060/jaar | **rekenkundig ✔** (3.005 × 12 = 36.060); bron zelf niet hergecontroleerd | [Planyway](https://planyway.com/blog/jira-structure-plugin) |
| Plan 3 (USD 360/jaar) haalt Project Professional 2024 (USD 1.129,99) in "ruim drie jaar" in | **rekenkundig ✔** (1.129,99 / 360 = 3,14 jaar) | — |

**Belangrijk gevolg van de twee P6-bevindingen:** de band USD 1.300–2.500/jaar wordt in Laag B als *invoer* voor de licentieberekening gebruikt (zie V4). Die invoer is nu deels weerlegd en deels onverifieerbaar. De enige P6-prijzen in dit rapport uit officiële bron blijven de G-Cloud 14-lijst (£220 per hosted named user/maand, min. 25) en de Oracle Global Price List van 2016.

## V9. "Verplichte" formaten en normen — **BEVESTIGD, met één blijvende nuance**

- **IFC 4.3 dekt telecom** (§9.1): bevestigd via de bSI-domeindocumentatie, die *"a cabling system, cable laying infrastructure and relevant elements placed along [the alignment]"* beschrijft en stelt dat dit *"applies to several domain models (telecom, signal, and energy)"* ([buildingSMART](https://www.buildingsmart.org/standards/domains/railway/applying-ifc-4-3-for-rail-project/)). De zelfcorrectie in §9.1 is dus terecht; de oorspronkelijke hoofdtekstclaim in §5.6/§7.2/§7.4 blijft onjuist. **BEVESTIGD.**
- **De nuance die overeind blijft** en die de belangrijkste is: formele dekking in de standaard ≠ gebruik in de praktijk. In glasvezeluitrol is de feitelijke datataal shapefile/GeoJSON/KML plus het platform van de opdrachtgever. "IFC dekt het" is geen verkoopargument. Dit staat correct in §9.1 en moet in elke samenvatting mee.
- **P6 XER/XML als de facto verplicht leveringsformaat in datacenterbouw** en **geen leveringsformaat in softwareontwikkeling**: niet onafhankelijk te toetsen in deze ronde (geen contractdocumenten opgehaald), maar consistent met de bouwsectorpraktijk. **ONZEKER** — presenteer als sectorpraktijk, niet als vastgestelde verplichting.
- **DCMA-14, GAO-10, EIA-748-drempels USD 20/50 mln, AACE 29R-03, BEAD-vierjaarstermijn**: alle vier reeds in §9.2 uit primaire of semi-primaire bronnen onderbouwd; niet opnieuw betwist in deze ronde. **BEVESTIGD (overgenomen uit ronde 2).** Het BEAD-budget van USD 42,45 mrd blijft **ONBEVESTIGD**, zoals §9.2.3 zelf al aangeeft.

## V10. Laag C (USD 30–110 mln pure CPM-licenties) — **REKENKUNDIG BEVESTIGD, AANNAMES ONZEKER**

Nagerekend: 30.000 × USD 600 = USD 18 mln ✔ ; 56.000 × USD 1.400 = USD 78,4 mln ✔ ; + USD 12–35 mln analytics/risico/4D → USD 30–113 mln, afgerond op **USD 30–110 mln** ✔. Alle stappen zijn expliciet en navolgbaar — dit is het best gedocumenteerde stuk rekenwerk in het rapport.

**Maar:** elke invoer (seats, USD 600–1.400/seat, de vuistregel "één planner per USD 30–60 mln beheerd bouwvolume") is een ongebronde aanname. Het resultaat is dus een *orde van grootte*, geen raming. Dat het na correctie van V4 samenvalt met de bottom-up Laag B-licentieregel (USD 52–99 mln) is de enige onafhankelijke bevestiging die er is — en die is zwak, want beide berekeningen delen dezelfde auteur en deels dezelfde aannames.

**Oordeel: BEVESTIGD als rekenwerk, ONZEKER als raming.** De kwalitatieve conclusie ("dit is een niche, geen markt; de waarde zit in adoptie en in de aangrenzende bouwsector") wordt door de correcties van deze ronde eerder **versterkt** dan verzwakt.

---

## Samenvatting van de verificatieronde

| # | Bewering | Oordeel |
|---|---|---|
| V1 | Geen open-source tool koppelt IFC aan CPM | **GECORRIGEERD (weerlegd)** — IfcOpenShell/Bonsai doet het volledig |
| V2 | Laag A = USD 2,5–3,2 mrd, met "ondergrens/bovengrens" | **GECORRIGEERD** — rekenwerk ✔, range verkeerd gelabeld; eerlijk: USD 2,2–3,2 mrd (spreiding tot 1,7) |
| V3 | Atlassian > de hele PM-softwaremarkt | **GECORRIGEERD** — 76% van PPM, 53–58% van PM-software; argument blijft, getal niet |
| V4 | Laag B = USD 0,6–1,0 mrd via 88.000 seats × USD 1.500–2.500 | **GECORRIGEERD** — blended seatwaarde 2,2–2,5× te hoog; naar USD 0,45–0,80 mrd; seat-telling botst met §4.3 |
| V5 | Marktleider Sitetracker USD 75 mln ARR → categorie USD 250–400 mln | **ONZEKER** — geschatte aggregatorbron, leiderschap niet vastgesteld (IQGeo) |
| V6 | Telecom-capex vlak 2025, −2% 2026, USD 303 mrd | **DEELS GECORRIGEERD** — Dell'Oro-richting ✔ woordelijk; USD 303 mrd en −3,5% (2024) staan niet in de bron |
| V7 | JLL: USD 11,3 mln/MW, ~100 GW, ~USD 3 bln, USD 870 mrd schuld, >4 jaar netaansluiting | **BEVESTIGD** — alle vijf woordelijk, plus afgeleide sommen nagerekend |
| V8 | Prijzen (MS Project, OpenProject, P6, Jira, ProjectLibre) | **GEMENGD** — MS/OpenProject bevestigd; P6-cloudprijs weerlegd; P6 Professional + Jira onzeker; ProjectLibre dubbeltelling gecorrigeerd |
| V9 | IFC 4.3 dekt telecom; verplichte formaten en normen | **BEVESTIGD** (IFC, DCMA/GAO/EIA/AACE/BEAD); P6 XER-verplichting **onzeker**; BEAD-budget onbevestigd |
| V10 | Laag C = USD 30–110 mln | **BEVESTIGD als rekenwerk, ONZEKER als raming** |

**Netto effect op de kernconclusie van §0:** die blijft staan en wordt op één punt scherper. De marktomvang schuift licht naar beneden (Laag A vloer omlaag, Laag B −25%), de groeirichting blijft +8–12%, en datacenterbouw blijft de best onderbouwde beachhead — dat is de enige claim in het rapport die volledig op primaire, woordelijk verifieerbare bronnen rust. Het enige punt dat écht omvalt is de positioneringsclaim uit §7.1/§7.3: **het concurrentievoordeel van OPS is niet "wij zijn de enigen die IFC en CPM koppelen", maar "wij doen het in de browser, met een plannersinterface, zonder Blender".** Dat is een zwakker maar verdedigbaar argument — en het is beter om dat nu te weten dan na de eerste demo bij een klant die Bonsai kent.

*Verificatie uitgevoerd zonder WebSearch (sessiequotum uitgeput): directe WebFetch van de geciteerde bronnen, PDF-extractie voor GSMA, GitHub-API voor IfcOpenShell. Bronnen die HTTP 403 gaven bij hercontrole (ITQlick, Atlassian-prijspagina) zijn als onzeker gemarkeerd in plaats van als bevestigd — afwezigheid van verificatie is geen weerlegging, maar ook geen bevestiging.*
