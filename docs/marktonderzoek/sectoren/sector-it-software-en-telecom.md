# Sectorrapport: IT, software en telecom — planningssoftware

**Onderzoeksdatum:** 25 juli 2026
**Scope:** softwarebedrijven, IT-dienstverleners/systeemintegratoren, hyperscalers en datacenterontwikkelaars, vaste en mobiele telecomoperators, netwerkleveranciers (Ericsson/Nokia), uitrolaannemers voor glasvezel/5G, en de engineering-/GIS-bureaus die hen bedienen.

**Methodische waarschuwing vooraf.** De WebSearch-quota van deze sessie waren uitgeput voordat dit onderzoek startte; al het materiaal hieronder is verzameld met directe WebFetch/`curl`-ophalingen van leveranciers-, analisten-, overheids- en normdocumenten, plus extractie van PDF's (Oracle-prijslijsten, GAO-gids, GSMA-rapport). Elk cijfer heeft een bron-URL. Waar ik zelf reken of interpoleer staat expliciet **[SCHATTING]**.

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
- Er is een sterke open-source-tolerantie: ProjectLibre haalde 8,2+ miljoen gebruikers en 8,2 miljoen downloads ([ProjectLibre](https://www.projectlibre.com/)) precies omdat de IT-sector geen probleem heeft met zelf installeren en zonder support werken.

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

Deze markten zijn **niet consistent afgebakend**. Atlassian alleen boekte in FY2025 al USD 5,215 miljard omzet ([stockanalysis.com](https://stockanalysis.com/stocks/team/financials/)) — meer dan de gehele "PPM-markt" van Mordor (USD 6,90 miljard) en meer dan de helft van TBRC's "project management software"-markt (USD 9,14 miljard). Agile-werkbeheer wordt door analisten dus grotendeels **buiten** de PPM/PM-softwaremarkt gehouden. Wie een realistisch beeld wil van wat IT/software/telecom aan planningsachtige software uitgeeft, moet beide optellen.

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
**Nadelen hier:** ProjectLibre is een MS-Project-kloon met verouderde UX en zonder cloud-first model. OpenProject heeft Gantt en WBS maar **geen 4D-scheduling gekoppeld aan IFC-elementen** — de eigen BIM-pagina noemt geen 4D of tijdgebonden modelanimatie, en de Revit-integratie staat als "to come soon" ([OpenProject BIM](https://www.openproject.org/bim-project-management/)). Er is dus geen open-source pakket dat IFC en CPM daadwerkelijk aan elkaar knoopt. **Dat is de belangrijkste bevinding van dit hele rapport voor Open Planner Studio.**

---

## 7. Openingen: waar zitten de gaten?

### 7.1 De grootste opening: datacenterbouw als "IT-sector met bouwbehoefte"

Dit is het scherpste segment dat dit onderzoek oplevert. Datacenterbouw is:
- **Formeel IT-sector** (opdrachtgevers zijn hyperscalers, colo's en techbedrijven; hun inkoop verloopt via IT/vastgoed, niet via traditionele bouwinkoop)
- **Feitelijk bouwwerk** met echte CPM-behoefte: USD 11,3 miljoen per MW, circa 100 GW tot 2030, USD 3 biljoen totale investering ([JLL](https://www.jll.com/en-us/insights/market-outlook/data-center-outlook))
- **BIM/IFC-gemodelleerd** — de gebouwschil, MEP, koeling en elektrotechniek zitten gewoon in IFC 4.3 / ISO 16739-1:2024 ([buildingSMART](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/))
- **Onderbediend**: Oracle richt P6 op "construction & engineering" zonder datacenters te noemen ([Oracle](https://www.oracle.com/construction-engineering/primavera-p6/)); Sitetracker noemt datacenters wél maar levert geen CPM ([Sitetracker](https://www.sitetracker.com/)); OpenProject heeft IFC maar geen 4D ([OpenProject](https://www.openproject.org/bim-project-management/))

**Er bestaat vandaag geen open-source tool die IFC-modellen en een CPM-planning aan elkaar koppelt.** Dat is precies het gat waar Open Planner Studio in valt.

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
| 1 | **4D: IFC-elementen koppelen aan CPM-taken** | OpenProject heeft IFC-viewer + BCF maar geen 4D ([OpenProject](https://www.openproject.org/bim-project-management/)); ProjectLibre heeft CPM maar geen IFC ([ProjectLibre](https://www.projectlibre.com/)). Niemand doet beide open source. |
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
