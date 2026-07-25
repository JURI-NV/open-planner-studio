# Oracle Primavera Cloud (OPC)

**Softwareprofiel — marktonderzoek planningssoftware**
Onderzoeksdatum: 25 juli 2026
Analist: software-analist, marktonderzoek planningssoftware
Onderzochte versie: OPC v26.6 (juni 2026); documentatie-releases juli 2026

> **Leeswijzer bij prijzen en cijfers.** Oracle publiceert sinds ±2017 geen openbare prijslijst meer voor Primavera-cloudproducten. Alle bedragen hieronder komen uit (a) een officiële Oracle-prijslijst uit 2016, (b) een openbaar aanbestedingsdocument (UK G-Cloud 14), of (c) reseller-webshops. Elke prijs heeft een bron-URL en datum. Waar ik zelf reken of interpoleer, staat expliciet **[schatting]**.

---

## 1. Wat het is

### 1.1 Leverancier en eigendom

| Item | Gegeven |
|---|---|
| Leverancier | Oracle Corporation — divisie **Oracle Construction and Engineering** (onderdeel van Oracle Industries) |
| Productnaam | Oracle Primavera Cloud, afgekort **OPC** |
| Type | SaaS (multi-tenant cloud), browser-gebaseerd, gehost op Oracle Cloud Infrastructure (OCI) |
| Licentie | Commercieel, closed source, abonnement per *Hosted Named User* |
| Releasecadans | **Maandelijks**, automatisch uitgerold (v26.1 t/m v26.6 in H1 2026) |

### 1.2 Historie

De stamboom is lang en verklaart veel van het huidige productgedrag:

1. **1983** — Primavera Systems opgericht (Bala Cynwyd, Pennsylvania). Primavera Project Planner (**P3**) wordt vanaf de jaren '80/'90 de facto standaard voor CPM-planning in grote bouw, olie & gas en defensie.
2. **2008** — Oracle neemt Primavera Systems over. Het product wordt Oracle Primavera **P6**; het portfolio groeit met Pertmaster (→ Primavera Risk Analysis), Skire (→ Unifier), Instantis en later Textura en **Aconex** (2018).
3. **2016** — Oracle lanceert een compleet nieuw, cloud-native platform onder de naam **Oracle Prime** (Prime Projects / Prime Portfolios / Prime Progress). Dit is géén herbouw van P6 maar een nieuw product met een andere datamodel-filosofie.
4. **1 juni 2019** — Oracle Prime Projects wordt hernoemd naar **Oracle Primavera Cloud**. De naamswijziging is bewust: Oracle wil de merkwaarde van "Primavera" meenemen naar het cloudproduct en signaleren dat OPC de strategische opvolger van P6 is.
5. **2019–2026** — Oracle voert een **dual-track-strategie**: OPC wordt maandelijks doorontwikkeld richting P6-functiepariteit, terwijl P6 EPPM/Professional gewoon nieuwe releases blijft krijgen (P6 26.4 bestaat, kwartaalcadans). Oracle heeft **geen** end-of-life-datum voor P6 aangekondigd.

> Belangrijk voor de beoordeling: OPC is dus **geen "P6 in de browser"**. Het is een apart product met een eigen datamodel, dat via een importbrug P6-data kan overnemen. Dat verklaart zowel de nieuwe mogelijkheden als de gaten (zie §5).

### 1.3 Doelgroep en typische gebruikers

**Primaire doelgroep:** organisaties die *projectbeheersing* (project controls) als discipline hebben ingericht — dus met aparte rollen voor planner/scheduler, cost controller, risicomanager en portfoliomanager.

Typische gebruikersrollen:

| Rol | Gebruik van OPC |
|---|---|
| Planner / scheduler | CPM-schema's, baselines, voortgang, float-analyse, schedule health |
| Cost controller | Budget, CBS, cashflow, earned value (via Cost Controls-module) |
| Risicomanager | Risicoregister, kwalitatieve scoring, Monte-Carlo |
| Portfoliomanager / owner | Scorecards, capital planning, proposals, programma's |
| Uitvoerder / werkvoorbereider | Task/Lean-app (Last Planner-achtig), swimlanes, weekplannen, mobiel |
| Opdrachtgever (owner) | Programma- en portfolio-overzicht, kapitaalplanning |

**Sectoren:** bouw & infrastructuur, energie & nutsbedrijven, olie & gas, mijnbouw, farmaceutische/industriële capex, transport & rail, overheid/publieke opdrachtgevers, vastgoedontwikkeling.

**Regio's.** Volgens de klantendatabase van AppsRunTheWorld is de OPC-installed base geconcentreerd in de **Verenigde Staten, Verenigd Koninkrijk en de Verenigde Arabische Emiraten**; verdeling naar bedrijfsgrootte: 2,9 % < 100 medewerkers, 25,7 % 101–1.000, **62,9 % 1.001–10.000**, 8,6 % > 10.000. Dat bevestigt: OPC is een product voor de grote middenmoot en het lagere enterprise-segment, niet voor MKB en niet uitsluitend voor de allergrootste concerns.

Genoemde publieke klanten (o.a.): Con Edison Clean Energy Businesses, University of California San Francisco, Rentokil Initial, DPR Construction, Clayco, Aecon Group, Adani Realty, Arabtec Holding.

---

## 2. Functionaliteit en techniek

### 2.1 Architectuur en platform

- **Uitsluitend SaaS.** Geen on-premise variant, geen desktopclient. Alles draait in de browser; er is een mobiele app voor de Task/veld-functionaliteit.
- **Workspace-hiërarchie in plaats van EPS.** Waar P6 een Enterprise Project Structure (EPS) met meerdere rootknopen kent, heeft OPC één **Root workspace** met daaronder een boom van workspaces. Codes, kalenders, resources en configured fields worden op workspace- of projectniveau gedefinieerd en kunnen naar boven/beneden gedeeld worden. Dit is architectonisch netter maar dwingt bij migratie tot een herontwerp van de projectstructuur.
- **Apps binnen één platform:** Schedule, Cost & Funds (Cost Controls), Risk, Resources, Portfolio/Programs, Capital Planning, Tasks (Lean), Files/Documents, Scope, Reports, Dashboards, Integration.
- **Maandelijkse releases** die automatisch worden doorgevoerd. Voordeel: snelle functie-instroom. Nadeel: geen controle over upgrademoment — voor gevalideerde/gereguleerde omgevingen (farma, nucleair, defensie) is dat een governance-vraagstuk.

### 2.2 CPM-engine

De planningsmotor is functioneel gelijkwaardig aan die van P6. Dit is **geverifieerd in Oracle's eigen Schedule Management User Guide (juli 2026, 417 pagina's)**:

**Activiteitstypen** (identiek aan P6): Activity Dependent, Resource Dependent, Level of Effort, Start Milestone, Finish Milestone, WBS Summary.

**Duurtypen:** Fixed Units/Time, Fixed Units, Fixed Duration & Units, Fixed Duration & Units/Time.

**Percentage-gereed-typen:** Physical, Duration, Units — plus **Scope** (uniek voor OPC: % gereed wordt afgeleid uit een gekoppelde scope-toewijzing/hoeveelheid).

**Relaties:** FS/SS/FF/SF met lag; kalender voor relatie-lag instelbaar.

**Constraints:** primaire én secundaire constraint per activiteit, inclusief As Late As Possible en Mandatory Finish.

**Scheduling-opties** (praktisch één-op-één met P6):
- Voortgangsberekening: **Retained Logic / Progress Override / Actual Dates**
- SS-lag berekenen vanaf Early Start of Actual Start
- Kritiek pad definiëren op **Total Float-waarde óf Longest Path**
- Float berekenen op finish date van *Each Project* of *Opened Projects*
- Methode voor total float instelbaar
- Open-ended activiteiten wel/niet kritiek maken
- Expected Finish Dates gebruiken
- Externe (inter-project) relaties wel/niet meenemen
- Kosten automatisch herberekenen na schedulen
- **Multiple Float Paths** met Float Path- en Float Path Order-kolommen; tie-breaker op Total Float → Free Float → laatste Early Finish → Activity ID
- Scheduling-log

**Wat de engine niét doet t.o.v. P6:** *Level Resources During Scheduling* staat in Oracle's eigen vergelijkingstabel als **Not Supported** voor Primavera Cloud. Levelen bestaat wél als aparte actie ("Level a Resource or Role", met Activity Leveling Priority), maar niet als geïntegreerde stap in de scheduler.

**Global Change** is aanwezig in OPC (eigen Global Change-hoofdstuk, incl. "Copy a Global Change from Another Project"). Oudere vergelijkingen die stellen dat OPC dit mist, zijn achterhaald — een goed voorbeeld van de inhaalslag.

### 2.3 Kalenders

Sterk uitgewerkt en op onderdelen beter dan P6:

- **Workspace-kalenders én project-kalenders**; project-kalenders kunnen naar de bovenliggende workspace worden gepromoveerd.
- Onbeperkt aantal kalenders.
- **Herbruikbare holiday lists** (feestdagenlijsten) die aan kalenders worden gekoppeld — één lijst per kalender, beschikbaar door de hele workspace-hiërarchie. Dit is een concreet voordeel boven P6, waar feestdagen per kalender worden onderhouden.
- Exception time (afwijkende werk-/niet-werktijd per datum).
- Instelling *"If a holiday falls on standard nonwork time, move…"* — expliciete regel voor wat er gebeurt als een feestdag op een niet-werkdag valt.
- **Availability for assignment:** een workspace-kalender kan beschikbaar worden gesteld voor projecten, voor resources/rollen, of beide. Voorkomt de klassieke P6-rommel van resourcekalenders in de projectlijst.
- Eén default-kalender per workspace; elk project, elke resource, rol en activiteit heeft altijd een kalender.
- Kalenders worden gebruikt door scheduling, **leveling én risico-analyse** — consistent doorgevoerd.
- Waarschuwing in de documentatie: wijzigt men een kalender die door een baseline of scenario wordt gebruikt, dan verschuiven die datums ook; herplannen is nodig.

### 2.4 Resource- en kostenmodel

**Resources en rollen** worden op workspace- en/of projectniveau aangemaakt (P6: globaal). Ondersteund: resource- en rolteams zijn **niet** aanwezig; wél rollen, resource-toewijzing per rol, resource/rol-usage, curve profiles (resourcecurves), high-level resource planning, availability-rijen.

Bekende beperkingen t.o.v. P6:
- **Geen Hourly Assignment Spreads** (uurlijkse spreiding van toewijzingen).
- **Geen Resource Analysis-scherm** (de P6-resourceanalyse met portfolio-brede histogrammen).
- **Geen Assignment Gantt.**
- **Geen Resource/Role Teams**, geen Resource Notes.
- **Resource Shifts** staan in de importgids als niet-ondersteund; Oracle's vergelijkingstabel is hier tegenstrijdig (noemt het wel ondersteund). *Reken op afwezig of op zijn best rudimentair.* **[onzekerheid — Oracle's eigen documentatie spreekt zichzelf tegen]**
- **Future Period Bucket Planning** wordt in de recente vergelijkingstabel als ondersteund genoemd; oudere partnerbronnen zeggen van niet. Waarschijnlijk in de tussentijd toegevoegd. **[schatting]**

**Kosten.** Ondersteund: totaalbudget, budgetwijzigingen, budgetregels, werkelijke kosten (ook current period), planned cashflow/spending plan, **Store Period Performance** met configureerbare reporting cycles, earned value en ETC-regels per WBS.

Niet ondersteund t.o.v. P6: **Cost Accounts**, **Expenses en Expense Categories** (niet-resourcegebonden kosten — een fundamenteel gat), budgetoverboekingen tussen codes, overtime costs, project funding/funding sources, project spending plans.

> **Dit is de belangrijkste functionele valkuil.** In P6 zijn *Expenses* de standaardmanier om materiaal-, onderaannemings- en overige kosten aan een activiteit te hangen zonder resource. OPC kent dat concept niet en gebruikt in plaats daarvan de Cost Controls-module met een **CBS (Cost Breakdown Structure)**. Dat is conceptueel rijker, maar het betekent dat een kostgeladen P6-schema **niet één-op-één** overkomt en handmatig moet worden omgezet.

### 2.5 Baselines en scenario's

OPC is hier op punten *beter* dan P6:

| Functie | P6 Professional | OPC |
|---|---|---|
| Configureerbare baselinetypen/-categorieën | ja | ja |
| Baseline bewerken | ja | ja |
| **Baseline in het verleden aanmaken** | nee | **ja** |
| **Ontbrekende activiteiten automatisch aan baseline toevoegen** | nee | **ja** |
| **Baselinewijzigingen terugdraaien** | nee | **ja** |
| Tertiaire baseline instellen/tonen | ja | **nee** |
| Scenario's (bewerken, als schema instellen, uit baseline maken) | ja | grotendeels **nee** |
| Reflections | ja | **nee** |

Bij export naar P6 geldt een harde limiet: **maximaal 20 baselines en scenario's per project**. In XER-formaat worden baselines geëxporteerd als *losse projecten* (XER kent geen baselinebegrip).

### 2.6 Risico en Monte-Carlo

Dit is een van de sterkste kaarten van OPC, omdat het **ingebouwd** is en niet — zoals bij P6 — een apart, inmiddels uitgefaseerd product (Primavera Risk Analysis / Pertmaster) vereist.

**Kwalitatief:** risicoregister op project- én programmaniveau, risico-workflows en -formulieren met goedkeuring, herbruikbare risicobibliotheken op workspace-niveau, scoringscriteria en risicomatrix, koppeling risico → activiteiten.

**Kwantitatief (Monte-Carlo):**
- Alleen op **projectniveau** (niet op programma's).
- Simuleert gelijktijdig alle geïdentificeerde risico's plus algemene activiteitenonzekerheid.
- Analyse op **pre-response én post-response** waarden, voor threats én opportunities.
- **Weather risks**: simuleert niet-werkbare tijd per activiteit — voor bouw en infra erg relevant.
- **Risk factors** voor duur- en kostenonzekerheid.
- Output: waarschijnlijkheidscurves (tijd én kosten), P-waarden/confidence levels tegen doelwaarden, **scatterplot** die kans op "op tijd ÉN binnen budget" toont, statistische verdelingen per activiteit, contingency-bedragen (absolute velden, v26.x), risicoanalyseresultaten zichtbaar in de Gantt.
- De eerste 50 iteraties zijn inspecteerbaar als scenario's.
- **Risk Removal Impact** (v26.1): effect van het wegnemen van een risico op mijlpalen.

Beperking: risicocategorieën (Risk Categories) en risicocodes uit P6 komen niet mee/bestaan niet.

### 2.7 4D / BIM

**Dit is de zwakke plek en tegelijk de kern van de vraag van de opdrachtgever.**

- OPC heeft **geen native 3D/IFC-modelviewer** en **geen 4D-simulatiefunctie** in het product zelf.
- 4D wordt gerealiseerd via **partners en integraties**: Assemble Systems (van oorsprong voor P6), Reconstruct (reality capture + 4D), Oracle Aconex Model Coordination, ALICE Technologies (generatieve bouwplanning op basis van P6/OPC-schema's), en diverse 4D-tools die XER/P6 XML inlezen.
- De schedule blijft dus in OPC; het model leeft ergens anders; de koppeling wordt door een derde partij gelegd — meestal via **XER of P6 XML of de REST API**, met een handmatige of semi-handmatige mapping tussen model-elementen en activiteiten.
- Er is **geen IfcWorkSchedule/IfcTask-ondersteuning** en **geen buildingSMART-certificering** voor OPC (zie §6).

### 2.8 Portfolio, programma's en rapportage

- **Portfolio's** met scorecards, evaluatiecategorieën, waterfall/prioritering; portfolio-affiliaties zichtbaar op de Project Home-pagina (v26.x).
- **Programma's**: meerdere projecten samen plannen; een programma kan met één datadatum of met eigen datadatums worden gescheduled. Programma-brede schedule-, resource-, kosten-, risico- en lean task-views.
- **Capital Planning**: proposals, scenario's, kapitaal- en exploitatiecashflow, budgetallocatie over meerjarige programma's — bedoeld voor opdrachtgevers/asset owners.
- **Dashboards** zijn in OPC volledig **configureerbaar** (eigen grafieken op workspace-, portfolio-, programma- en projectniveau, voor alle datatypen). In P6 zijn dashboards grotendeels vooraf gedefinieerd. Dit is een echte verbetering.
- **Schedule Health Score**: ingebouwde kwaliteitscontrole van het schema (DCMA-achtige checks: open eindes, negatieve lags, constraints, lange duren, hoge float…). Sinds v26.6 configureerbaar op workspace-niveau en door te duwen naar onderliggende workspaces; resultaten exporteerbaar. **P6 heeft dit niet** — daarvoor is normaal een los product nodig (Deltek Acumen Fuse, Steelray, Schedule Analyzer).
- Ontbreekt: **geavanceerde, door gebruikers zelf te bouwen rapporten** op BI-Publisher-niveau, Visualizer (P6's publicatietool voor grote Gantt-platen), tracking layouts, thresholds, publication services, summarization.

### 2.9 Schaalbaarheid — hoeveel activiteiten realistisch?

Oracle publiceert **geen harde limiet**. Wat wel vaststaat:

- De importgrens is **1 GB per P6 XML/XER-bestand** (gecomprimeerd toegestaan; meerdere bestanden in één zip is níet toegestaan).
- Meerdere onafhankelijke bronnen (Oracle-partners, waaronder Project Partners en Emerald Associates) waarschuwen consequent dat OPC's cloud-architectuur **niet geoptimaliseerd is voor mega-projecten**. Het meest geciteerde beeld: *"P6 is een powerlifter, OPC een turner."*
- P6 EPPM draait op een relationele Oracle-database die praktisch gezien miljoenen activiteiten over een portfolio aankan; OPC wordt gepositioneerd voor **kleine tot middelgrote schema's**.

**Praktische vuistregel [schatting, gebaseerd op partneradviezen en het ontbreken van tegenbewijs in Oracle-documentatie]:**

| Schemaomvang | Oordeel voor OPC |
|---|---|
| < 5.000 activiteiten | ruim voldoende, comfortabel |
| 5.000 – 20.000 activiteiten | werkbaar; let op laadtijden van de Activities-pagina |
| 20.000 – 50.000 activiteiten | risicovol; vooraf testen met echte data |
| > 50.000 activiteiten per project | P6 Professional/EPPM blijft de veiligere keuze |

Reviewers noemen consequent **trage laadtijden bij het openen** als klacht, wat past bij een browser-gebaseerde grid met veel rijen.

---

## 3. Prijzen

### 3.1 Licentiemodel

- **Uitsluitend abonnement** (SaaS). Er is **geen perpetual licentie** voor OPC. Perpetual bestaat alleen nog voor de klassieke P6-producten.
- Metriek: **Hosted Named User** — *"an individual authorized by you to access the hosted service, regardless of whether the individual is actively accessing the hosted service at any given time."* Dus benoemde gebruiker, geen concurrent user. Wie 200 mensen toegang wil geven, betaalt 200 seats, ook als er dagelijks 20 inloggen.
- Aparte, goedkopere metrieken bestaan voor read-only viewers en integratiegebruikers.
- **Minimum afname: 5 gebruikers** voor de OPC Schedule-basismodule (tegenover **25** voor P6 EPPM Cloud). Dit is een van de weinige plaatsen waar OPC laagdrempeliger is.
- Modules worden **per module per gebruiker** bijgeprijsd.
- Facturatie jaarlijks vooruit gebruikelijk; maandelijkse betaling mogelijk bij sommige resellers.

### 3.2 Concrete bedragen

#### A. UK G-Cloud 14 — openbare aanbestedingsprijzen (meest betrouwbare recente bron)

Bron: *"Oracle Primavera – Pricing document"*, th3rdcurve Ltd (Oracle-reseller), **effectief 30 april 2024**, gepubliceerd op het Britse Digital Marketplace. Alle bedragen in GBP, per Hosted Named User per jaar, **inclusief volumekorting**; 10 % extra korting bij ≥ 100 licenties per product.

| Cloud service product (OPC) | Min. aantal | £/licentie/jaar | ≈ £/user/maand |
|---|---|---|---|
| **OPC Schedule** (incl. Progress & Task Management) | **5** | **950** | **≈ 79** |
| Capital Planning (optionele add-on) | 1 | 7.549 | ≈ 629 |
| Cost Controls (optionele add-on) | 1 | 7.549 | ≈ 629 |
| Facility Management (optionele add-on) | 1 | 7.549 | ≈ 629 |
| Project Delivery Management (optionele add-on) | 1 | 7.549 | ≈ 629 |
| Real Estate Management (optionele add-on) | 1 | 7.549 | ≈ 629 |

Ter vergelijking uit hetzelfde document — **Primavera P6 EPPM Cloud Service** en **Primavera Unifier**:

| Product | Min. aantal | £/licentie/jaar |
|---|---|---|
| P6 EPPM (incl. Progress Reporter & Data Access) | 1 | 358 |
| Primavera Analytics (add-on) | 25 | 2.185 |
| Virtual Desktop (hosted environment) | 1 | 9.932 |
| Additional Non-Production Environment | 1 | 39.332 |
| Primavera Unifier Facilities & Asset Mgmt (incl. EVM) | 25 | 1.311 |
| Unifier Portal User | 100 | 16 |

> **Kanttekening 1:** de kolomuitlijning van de P6 EPPM-tabel in het PDF is bij tekstextractie niet 100 % eenduidig; de OPC-tabel is dat wél. Behandel de OPC-regels als hard, de P6 EPPM-regels als indicatief. **[onzekerheid]**
> **Kanttekening 2:** £7.549 per gebruiker per jaar voor een add-on is opvallend hoog. Het document stelt expliciet dat álle vermelde kosten per Hosted Named User zijn. In de praktijk worden deze modules zelden aan het hele planningsteam toegekend, maar aan een handvol cost controllers/portfoliomanagers. De effectieve kosten hangen dus sterk af van hoeveel mensen je per module licentieert. **[interpretatie]**

Omgerekend naar euro (koers ≈ £1 = €1,17, gemiddeld 2024–2026) **[eigen omrekening, schatting]**:
- OPC Schedule ≈ **€1.110 per gebruiker per jaar ≈ €93 per gebruiker per maand**
- Add-onmodules ≈ **€8.830 per gebruiker per jaar ≈ €736 per gebruiker per maand**

#### B. Amerikaanse reseller — CDP Inc. (webshopprijs, pagina-copyright 2025)

| Item | Bedrag |
|---|---|
| OPC starter pack, 5 gebruikers, 1 jaar | **$7.800** |
| Per gebruiker per jaar | **$1.560** |
| Per gebruiker per maand | **$130** |
| Extra gebruiker | $1.560 per jaar |

Bron: cdp-inc.com productpagina "Purchase Oracle Primavera Cloud (5-users)".

#### C. Oracle's eigen prijslijst — historisch ijkpunt (10 november 2016)

Bron: *Oracle Construction & Engineering Global Price List / Software Investment Guide*, Texas DIR-contract DIR-TSO-2539, gedateerd **10-NOV-2016**. Dit is de laatste breed beschikbare officiële Oracle-prijslijst. **Oracle Prime Projects = het product dat in 2019 OPC werd.**

| Cloud service | $/Hosted Named User/maand | Min. |
|---|---|---|
| **Oracle Prime Projects Cloud Service** (→ OPC) | **150** | 25 |
| Oracle Prime Portfolios Cloud Service | 125 | 25 |
| Oracle Prime Progress Cloud Service | 12 | — |
| Primavera P6 EPPM Cloud Service | 125 | 25 |
| P6 Progress Reporter Cloud Service | 12 | — |
| P6 EPPM Web Services Cloud Service | 20 | — |
| Primavera Unifier Project Controls Cloud Service | 150 | 25 |
| Primavera Analytics Cloud Service | 90 | 25 |
| Primavera Virtual Desktop Cloud Service | 1.000 | 1 (hosted environment) |
| Extra non-production environment | 10 % van maandelijkse subscription fee | — |

Perpetual (voor de klassieke producten, ter vergelijking; prijs + jaarlijkse *Software Update License & Support*):

| Product | Licentie ($) | Support/jaar ($) | Metriek |
|---|---|---|---|
| Primavera P6 EPPM | 2.750 | 605 | Application User |
| Primavera P6 Professional | 2.500 | 550 | Application User |
| Primavera P6 Progress Reporter | 950 | 209 | Application User |
| Primavera Gateway | 20.000 | 4.400 | Application User (min. 5) |
| Primavera Data Warehouse | 25.000 | 5.500 | Processor |

Voorwaarden uit hetzelfde document: **support = 22 % van de perpetual lijstprijs per jaar**. **Term licenses**: 1 jaar = 20 % van lijst, 2 jaar = 35 %, 3 jaar = 50 %, 4 jaar = 60 %, 5 jaar = 70 %.

> Let op: dit is een prijslijst uit 2016. Gebruik hem als **structuurreferentie** (metrieken, minima, verhoudingen), niet als actuele prijs.

#### D. Gerapporteerde bedragen uit reviews/partnerbronnen (met kanttekening)

- Oracle-partner Taradigm: *"een standaardlicentie voor Oracle Primavera Cloud kost minder dan $1.600 per gebruiker per jaar, ongeveer een derde van de kosten van een Primavera P6-licentie."* Dit sluit goed aan bij de CDP-webshopprijs van $1.560. **[secundaire bron]**
- Meerdere reviewbronnen: *"most implementations start around $100 per user per month with minimum seat requirements."*
- ProjectManager.com bevestigt expliciet: *Oracle publiceert geen actuele publieke prijzen meer.*

### 3.3 Wat je écht kwijt bent — indicatieve TCO **[schatting]**

Voor een planningsafdeling van 20 gebruikers, alleen de Schedule-module, exclusief implementatie:

| Post | Indicatie per jaar |
|---|---|
| 20 × OPC Schedule à ≈ €1.110 | ≈ **€22.000** |
| 3 × Cost Controls à ≈ €8.830 | ≈ **€26.500** |
| Implementatie + datamigratie + configuratie (eenmalig, gespreid over 3 jaar) | ≈ €30.000–€100.000 eenmalig |
| Training (OPC-cursussen bij partners) | ≈ €1.000–€2.500 per gebruiker eenmalig |

Deze cijfers zijn **schattingen** op basis van de openbare lijstprijzen; Oracle-deals worden in de praktijk stevig onderhandeld en enterprise-staffels (>100 seats) leveren aantoonbaar minstens 10 % extra korting op, in de praktijk vaak meer.

**Niet-gepubliceerd / alleen op aanvraag:** enterprise-staffels boven 100 seats, ULA-achtige constructies, sovereign-cloud- en overheidsvarianten, Primavera Gateway-abonnementen, Aconex-bundeling, en de prijs van de read-only viewer- en integratiemetrieken.

---

## 4. VOORDELEN

1. **Volwaardige, P6-gelijkwaardige CPM-engine — geverifieerd, geen marketingclaim.** Alle activiteitstypen (incl. Level of Effort en WBS Summary), alle vier duurtypen, primaire én secundaire constraints, Retained Logic/Progress Override/Actual Dates, kritiek pad op Longest Path óf Total Float, multiple float paths met deterministische tie-breakers, inter-projectrelaties. Dit is de enige cloudplanner met een echt P6-klasse rekenkern; de meeste "moderne" concurrenten leveren een vereenvoudigde CPM.

2. **Kalendermodel dat op punten béter is dan P6.** Herbruikbare holiday lists door de hele workspace-hiërarchie, expliciete regel voor feestdagen die op niet-werkdagen vallen, en — belangrijk in de praktijk — *availability for assignment* waarmee je afdwingt dat een resourcekalender niet aan projecten kan worden gehangen. Kalenders worden consistent gebruikt door scheduler, leveler én Monte-Carlo.

3. **Monte-Carlo-risicoanalyse zit in de doos.** Geen los product, geen aparte licentie, geen export-en-terugimporteren. Inclusief pre/post-response-analyse, kansen én bedreigingen, **weather risks** (niet-werkbare tijd — direct relevant voor bouw en infra), scatterplot voor "op tijd én binnen budget", en contingency-bedragen. Bij P6 is dit sinds het uitfaseren van Primavera Risk Analysis juist een gat.

4. **Schedule Health Score is ingebouwd.** DCMA-achtige schemakwaliteitscontrole, sinds v26.6 centraal te configureren op workspace-niveau en door te duwen naar onderliggende workspaces, met exporteerbare resultaten. Voor P6 moet je hiervoor Deltek Acumen Fuse, Steelray of Schedule Analyzer bijkopen — dat is een aparte licentie én een aparte workflow.

5. **Baselinebeheer is aantoonbaar volwassener dan P6.** Baseline in het verleden aanmaken, ontbrekende activiteiten automatisch aan een baseline toevoegen, en **baselinewijzigingen terugdraaien** — drie dingen die P6 Professional geen van drieën kan. Voor claim- en vertragingsanalyse is dat direct geld waard.

6. **Lean/Last Planner en CPM in één product.** De Task-app met swimlanes, pull planning, weekplannen en hand-offs is geïntegreerd met het CPM-schema (scope-toewijzingen, `Scope`-percentage-gereed-type). De brug tussen kantoorplanning en veldplanning zit in het product in plaats van in een los tool. P6 heeft dit niet.

7. **Configureerbare dashboards en scope-koppeling.** Eigen grafieken op workspace-, portfolio-, programma- en projectniveau over alle datatypen, tegenover P6's vaste dashboardsjablonen. Plus de mogelijkheid om voortgang uit *hoeveelheden* (scope) af te leiden in plaats van uit uren of handmatige percentages.

8. **Lage instapdrempel qua seats en geen infrastructuur.** Minimum 5 gebruikers (P6 EPPM Cloud: 25), geen servers, geen databasebeheer, geen upgradeprojecten. Voor een middelgroot aannemers- of ingenieursbureau is dat het verschil tussen wel en niet aan enterprise project controls kunnen doen.

9. **Hoog releasetempo met zichtbare inhaalslag.** Maandelijkse releases (v26.1 t/m v26.6 in H1 2026). Functies die partners in 2021–2023 nog als ontbrekend noemden — Global Change, Store Period Performance, future period bucket planning, ordinal dates in de Gantt — zijn inmiddels aanwezig. De richting is onmiskenbaar.

10. **Hoge klantloyaliteit onder wie het gebruikt.** SoftwareReviews/Info-Tech (47 OPC-specifieke reviews): composite score 7,5/10, *likeliness to recommend* 87/100, **plan to renew 99/100**, tevredenheid kosten-vs-waarde 83/100, net emotional footprint +88. Wie de overstap eenmaal heeft gemaakt, gaat niet terug.

---

## 5. NADELEN

1. **Migratie vanaf P6 verliest aantoonbaar data — en Oracle documenteert dat zelf.** De *P6 to Oracle Primavera Cloud Import Guide* (juli 2026) bevat een lijst "Nonimportable Data **Not Supported** in Primavera Cloud" — data die niet importeert én waarvoor geen functioneel alternatief bestaat. Daarop staan onder meer: **Expenses en Expense Categories, Cost Accounts, EPS, OBS, Issues, Steps en Step Templates, Reflections, Resource/Role Teams, Resource Notes, Resource Shifts, Risk Categories, WBS Milestones, WBS Categories, CBS/WBS expense- en resource-spreads, Thresholds, Tracking Layouts, Visualizer, Publication Services, Summarization, Project Spending Plans, Overhead Codes, Performance Thresholds, Global/Project Security Profiles**, plus UDF-typen (formule-UDF's, indicator-datatype, UDF's op documents/expenses/issues/resources/steps). Een tweede lijst bevat data die wél ondersteund wordt maar **handmatig opnieuw moet worden opgebouwd**: dashboards, filters, layouts, documenten, financial periods, funding sources, portfolios, reports, resource/role rate types, currencies, CBS. Een P6-migratie is dus een **herimplementatie**, geen conversie.

2. **Het Expenses-gat is een breekpunt voor kostgeladen schema's.** OPC kent geen `Expenses` — de standaard-P6-manier om materiaal-, onderaannemers- en overige kosten aan een activiteit te hangen zonder resource. Wie in P6 kostgeladen plant (in de infra en olie & gas de norm), moet het hele kostenmodel omzetten naar OPC's CBS. Dat is niet alleen migratiewerk maar ook hertraining en herziening van rapportagesjablonen.

3. **Geen resource leveling tijdens het schedulen.** Oracle's eigen vergelijkingstabel zet *Level Resources During Scheduling* op **Not Supported** voor OPC. Levelen is een losse actie geworden. Ook ontbreken **hourly assignment spreads**, het **Resource Analysis-scherm** en de **Assignment Gantt**. Voor resourcegedreven planning (fabrieksstops, turnarounds, ploegendienst) is OPC daarmee zwakker dan P6.

4. **Niet geschikt voor mega-projecten.** Meerdere onafhankelijke Oracle-partners waarschuwen consistent dat OPC's SaaS-architectuur niet geoptimaliseerd is voor zeer grote CPM-schema's; P6 EPPM op een relationele Oracle-database blijft daar de aanbevolen route. Oracle publiceert geen limiet, wat het risico juist vergroot: je ontdekt de grens pas in productie. Reviewers noemen **trage laadtijden** als terugkerende klacht.

5. **Ondoorzichtige prijsstelling en hoge kosten voor modules.** Oracle publiceert geen prijslijst meer; elke prijs vereist een salesgesprek. De enige harde publieke bron (UK G-Cloud, 30-4-2024) laat zien dat de basismodule redelijk is (£950/gebruiker/jaar) maar dat **elke add-on £7.549 per gebruiker per jaar** kost — bijna acht keer de basis. Cost Controls, Capital Planning en Project Delivery Management zijn precies de modules die je nodig hebt voor echte projectbeheersing. Reviewers noemen prijs consequent als grootste bezwaar; "high acquisition cost, particularly burdensome for smaller organizations" (SoftwareReviews).

6. **Steile leercurve, ook voor ervaren P6-planners.** Ease-of-use scoort **3,7/5** op Capterra/Software Advice — het laagste subscore van alle categorieën, tegenover 4,4 voor functionaliteit. *"The complexity of using this tool makes it extremely challenging to train people on it."* Voor P6-veteranen komt daar de terminologie-omslag bovenop: EPS → workspaces, globale resources → workspace/project-resources, expenses → CBS, layouts → views.

7. **Zwakke en beperkte undo.** Oracle's eigen documentatie: de undo-historie wordt **gewist** bij pagina-refresh, bij navigeren naar een scenario, bij toepassen van view-instellingen, bij toewijzen/promoveren van een resource of rol, bij importeren van templates, en **bij elke keer dat je het project schedulet of levelt**. Bovendien worden *verwijderingen* (van activiteiten, toewijzingen, resources, rollen, relaties) helemaal niet in de undo-historie opgeslagen. Reviewers noemen precies dit: "once an activity is changed, it cannot be simply undone."

8. **Ontbrekende export- en rapportageformaten voor gereguleerde opdrachtgevers.** OPC kan niet exporteren naar **UN/CEFACT Format 6**, **IPMDAR** of **CPP** — de verplichte rapportageformaten voor Amerikaanse defensie/DoE-contracten en delen van de Britse overheid. Ook ontbreken **Visualizer** (P6's tool voor grote Gantt-platen), geavanceerde Gantt-print, tracking layouts en zelfgebouwde BI-rapportage. Voor EVM-rapportageverplichtingen aan overheden is dit een blokkade.

9. **Vendor lock-in op meerdere assen tegelijk.** Uitsluitend SaaS (geen on-premise uitwijk), uitwisseling alleen via **Oracle's eigen XER en P6 XML** (beide propriëtaire formaten van dezelfde leverancier), en objecten die via de REST API zijn aangemaakt **kunnen niet meer via de UI worden bewerkt**. Daarbovenop: maandelijkse gedwongen updates zonder controle over het moment — voor gevalideerde omgevingen een governanceprobleem. Data-uittreding na opzegging: Oracle stelt de content 60 dagen beschikbaar.

10. **Bugs, support en trage bugfixing.** Terugkerend in reviews: *"persistent software bugs, slow debugging by Oracle"*, customer support scoort 4,0/5 (onder het gemiddelde van de andere subscores), gebrek aan taalondersteuning, en zwakke Microsoft Office/Project-integratie. Beperkte maatwerk-/configuratiemogelijkheden worden ook genoemd: *"users requiring customization may find the software's limited modification options bothersome."*

11. **De reviewcijfers zijn misleidend gunstig.** Let op bij het lezen van marktdata: de Capterra/GetApp/Software Advice-listing "Oracle Primavera" (4,4/5, 182 reviews) vermengt **P6 en OPC**. De enige OPC-specifieke dataset die ik vond, SoftwareReviews, telt **47 reviews** — een fractie van wat MS Project of Procore hebben. De adoptiebasis is dus dun. **[analyse]**

---

## 6. Interoperabiliteit — *extra belangrijk voor een open, IFC-gebaseerde planner*

### 6.1 Native import/export van OPC

| Formaat | Import | Export | Opmerkingen |
|---|---|---|---|
| **P6 XER** | ✅ | ✅ | Oracle's propriëtaire Primavera Exchange Format. Import ondersteund vanaf **P6 Professional 15.2 en hoger**. Export vereist versiekeuze (15.2+ of 20.4+). **XER bevat geen baselines**; een XER kán wel als baseline of scenario voor een bestaand project geïmporteerd worden. Bij export worden baselines/scenario's *losse projecten*. |
| **P6 XML** | ✅ | ✅ | Oracle's eigen XML-schema (géén open standaard). Ondersteunt wél baselines en scenario's. Ondersteunde P6 EPPM-versies: **26.x, 25.x, 24.x**. |
| Gecomprimeerd (.zip) | ✅ | ✅ | Aanbevolen voor performance. **Meerdere XML/XER-bestanden in één zip wordt niet ondersteund.** |
| **Excel / spreadsheet** | ✅ | ✅ | "Import/Export to and from Excel" op de Activities-pagina is ondersteund. Veel dictionary-pagina's bieden downloadbare importsjablonen (locaties, resources, codes…). Dit is in de praktijk de ontsnappingsroute voor bulkdata die niet via XER meekomt. |
| **CSV** | ~ | ~ | Niet expliciet als eersteklas formaat gedocumenteerd; loopt via de spreadsheet-templates. |
| **MPP (Microsoft Project)** | ❌ | ❌ | Geen native ondersteuning. MPP is een gesloten binair formaat. |
| **MSPDI (MS Project XML)** | ❌ native | ❌ native | Microsoft Project wordt alléén ondersteund als **integratieverbinding** via de Integration-app, niet als bestandsformaat in OPC zelf. |
| **IFC (ISO 16739)** | ❌ | ❌ | **Geen enkele ondersteuning.** Zie §6.3. |
| UN/CEFACT Format 6, IPMDAR, CPP | ❌ | ❌ | Expliciet genoemd als ontbrekend t.o.v. P6. |

**Harde limieten:** importbestand **maximaal 1 GB**; export van **maximaal 20 baselines/scenario's per project**; downloadlink van een export blijft **30 dagen** geldig; na een P6-import **moet** je het project opnieuw schedulen én de kosten herberekenen voordat je verder werkt.

### 6.2 API's en integraties

| Kanaal | Karakter | Opmerkingen |
|---|---|---|
| **Primavera Cloud REST API** | bidirectioneel, programmatisch | Officieel gedocumenteerd. **Cruciale beperking:** objecten die via de REST API zijn aangemaakt of gewijzigd, kunnen *uitsluitend* via de API worden bijgewerkt en **niet meer via de gebruikersinterface** (gemarkeerd met een "imported object"-icoon). Dat maakt hybride workflows (deels API, deels handmatig) praktisch onmogelijk. |
| **Primavera Cloud Data Service** | uitgaand, bulk | Data-extractie voor BI/analytics. |
| **Primavera Gateway** | bidirectioneel, ETL-achtig | Ondersteunde versies **20.x, 21.x, 22.x**. Business flows met veldmapping-templates; on-demand of gepland. Koppelt OPC ↔ P6 EPPM, Unifier, SAP, Oracle EBS e.a. Aparte licentie. |
| **P6 EPPM-connectie** | bidirectioneel | Directe veldmapping, bijv. OPC `Planned Finish Date` ↔ P6 `Must Finish By`. |
| **Microsoft Project-connectie** | via Integration-app | Beperkt; geen bestandsuitwisseling. |
| **Aconex** | 23.8+ | Task Constraints ↔ Aconex Packages; documenten en modelcoördinatie. |
| **Unifier** | 22.10+ (ST/MT), 22.12+ (on-prem) | Cash Flow Integration. |

### 6.3 IFC / openBIM — de kritieke bevinding

**Oracle Primavera Cloud ondersteunt IFC niet, in geen enkele richting.**

Concreet:
- Geen import of export van **IFC 4.3**-bestanden.
- Geen mapping naar of van **`IfcWorkSchedule`**, **`IfcTask`**, `IfcTaskTime`, `IfcRelSequence`, `IfcWorkCalendar` of `IfcResource` — de IFC-entiteiten die precies bedoeld zijn om een CPM-planning uit te drukken.
- Geen buildingSMART-certificering.
- Geen native 3D-/modelviewer en geen 4D-simulatie in het product.

4D en modelkoppeling lopen **volledig via derden**: Assemble Systems, Reconstruct, ALICE Technologies, Aconex Model Coordination en generieke 4D-tools. Die lezen het schema in via **XER, P6 XML of de REST API** en houden de element↔activiteit-mapping in hun eigen database. De koppeling leeft dus buiten zowel het model als het schema, en is niet overdraagbaar tussen tools.

**Wat dit betekent voor een open-source, IFC-gebaseerde planner:**

1. **Het uitwisselingsprobleem is echt en onopgelost.** De de-facto standaard voor planningsuitwisseling in de bouw is XER — een propriëtair, niet-gespecificeerd, door de industrie gereverse-engineerd formaat van één leverancier. Er bestaat geen enkele open, gecertificeerde route van een planning naar een model.
2. **IFC 4.3 heeft het schema al.** `IfcWorkSchedule` + `IfcTask` + `IfcTaskTime` + `IfcRelSequence` + `IfcWorkCalendar` dekken exact wat OPC intern doet (activiteiten, relaties met lag, kalenders met uitzonderingen, resources). De standaard wacht op implementaties, niet andersom.
3. **De realistische interoperabiliteitsstrategie is: IFC als native formaat, XER en P6 XML als import-/exportadapters.** Precies zoals OPC zelf Excel gebruikt als ontsnappingsroute voor wat XER niet aankan. Wie zowel IFC als P6 XML/XER kan lezen en schrijven, kan als brug fungeren tussen de openBIM-wereld en de Primavera-wereld — een positie die vandaag leeg is.
4. **Let bij een XER-implementatie op de bekende valkuilen** die Oracle zelf documenteert: XER draagt geen baselines; veldlengtes verschillen fors (OPC Activity Name 255 tekens vs. P6 120; Project ID 60 vs. 40; Calendar ID 255 vs. 10); speciale tekens (`? * [ ] | < > : / \ " %`) breken de import; en object-matching gebeurt op ID's (Activity ID, Calendar ID, Code ID, Resource ID, Role ID), niet op interne sleutels.
5. **Kalendersemantiek is de stille killer.** Zowel P6 als OPC hangen alles op aan kalenders met feestdagenlijsten, exceptions en per-dag werkuren. Een IFC-planner die `IfcWorkCalendar`/`IfcWorkTime`/`IfcRecurrencePattern` correct implementeert — inclusief de regel "wat als een feestdag op een niet-werkdag valt" — kan datums reproduceren die met een naïeve implementatie altijd een dag mis zijn.

---

## 7. Marktpositie

### 7.1 Waar OPC sterk staat, en waarom

- **Bij bestaande Oracle-klanten** die al Unifier, Aconex of Oracle ERP draaien: de integratieverhaallijn (Gateway, gedeelde OCI-tenancy, één leverancier, één supportcontract) is dan doorslaggevend.
- **Bij asset owners en publieke opdrachtgevers** die kapitaalprogramma's beheren: de combinatie Capital Planning + Portfolio + Risk + Cost Controls is een verhaal dat weinig concurrenten in één product kunnen vertellen.
- **Bij organisaties die van P6-on-premise af willen** zonder de Primavera-methodiek los te laten: het is de enige route die zowel de CPM-strengheid als de merkcontinuïteit behoudt.
- **In sovereign-cloud- en overheidsdeals**: Oracle's OCI-regio's en sovereign-cloudaanbod winnen contracten bij nationale overheden en staatsbedrijven die hun infrastructuurdata niet op hyperscalers willen.
- **Sectorconcentratie** volgens AppsRunTheWorld: nutsbedrijven, onderwijs, industrie, bouw & vastgoed, zakelijke dienstverlening — verspreid over 21 sectoren.

### 7.2 Waar OPC zwak staat

- **Mega-projecten en zeer grote schema's** — daar wint P6 EPPM, ook binnen Oracle's eigen portfolio.
- **Defensie/aerospace met EVM-rapportageverplichtingen** — de ontbrekende IPMDAR/UN-CEFACT/CPP-export is diskwalificerend.
- **MKB en projectorganisaties zonder project-controls-discipline** — te duur, te complex; die kiezen MS Project, Asta Powerproject of een SaaS-tool.
- **Bij BIM-gedreven opdrachtgevers** die 4D als eerste-klas-vereiste stellen — de partnerroute is duur, fragiel en niet-standaard.

### 7.3 Belangrijkste concurrenten

| Categorie | Concurrenten |
|---|---|
| **Binnen Oracle's eigen huis (de grootste rem)** | **Primavera P6 Professional / P6 EPPM** — nog steeds actief ontwikkeld (P6 26.x), met een enorme installed base, opgeleide arbeidsmarkt en contractuele verankering |
| Enterprise-CPM | Deltek Open Plan & Acumen Fuse/Risk, Safran Project & Safran Risk, Asta Powerproject (Elecosoft), Spider Project |
| Bouw-SaaS | InEight Schedule, Procore, Autodesk Build/Construction Cloud, Trimble ProjectSight, CMiC |
| Nieuwe generatie / AI | Planera, Nodes & Links, ALICE Technologies, nPlan |
| 4D/BIM | Bentley SYNCHRO, Navisworks TimeLiner, Vico, iTWO |
| Generiek PPM | Microsoft Project / Project for the web, Planview, Smartsheet, Wrike |
| Monte-Carlo | Barbecana Full Monte, Safran Risk, Acumen Risk, @RISK |

### 7.4 Trend

**Groeiend, maar langzamer dan Oracle had gehoopt — en met P6 als taaie concurrent.**

Argumenten voor "groeiend":
- Maandelijkse releases met aantoonbare functie-instroom; gaten uit 2021–2023 (Global Change, Store Period Performance, bucket planning) zijn gedicht.
- Oracle investeert zwaar en positioneert OPC als de strategische opvolger.
- Sovereign-cloud- en AI-verhalen winnen overheidscontracten (Oracle kondigde in april 2026 een brede "agentic AI"-overhaul van Primavera Unifier aan, met o.a. predictive safety op basis van >10.000 projectjaren historische data — dezelfde investeringsrichting raakt OPC).
- Plan-to-renew van 99/100 wijst op zeer lage churn onder bestaande OPC-klanten.

Argumenten voor "traag":
- Zeven jaar na de rebranding tracked AppsRunTheWorld slechts **35 genoemde OPC-klanten**; SoftwareReviews heeft **47** OPC-specifieke reviews. Dat is dun voor een product dat de opvolger van een marktstandaard moet zijn.
- Oracle-partners verwoorden het openlijk: OPC *"did not have its big breakthrough yet to replace Primavera P6, because end-users still miss some features."*
- Oracle heeft zijn eigen strategie moeten bijstellen — van "OPC is iets nieuws en beters" naar "OPC moet eerst P6-pariteit halen". Dat kost jaren en is nog niet af.
- Er is **geen end-of-life voor P6 aangekondigd**, dus geen dwang. Zolang P6 blijft leven, blijft de rationele keuze voor veel organisaties: blijven zitten.

### 7.5 Verplichtstellingen en contractuele verankering

Dit is de echte moat — en die zit bij **P6/XER**, niet bij OPC. Overheidsopdrachtgevers en grote principalen in de VS (state DOTs, USACE), het Midden-Oosten, olie & gas en defensie-onderaanneming schrijven in bestekken en contractvoorwaarden routinematig *"Primavera P6"* en *"schedule submission in XER format"* voor. OPC erft die ecosysteempositie **indirect**, via zijn XER-export — maar veel specificaties noemen letterlijk P6, wat OPC-gebruikers dwingt tot een exportstap en soms tot discussie met de opdrachtgever.

**Voor een open-source IFC-planner is dat het strategisch relevantste feit van dit hele profiel:** de markttoegang wordt niet bepaald door functionaliteit maar door de vraag *"kan het XER en P6 XML lezen en schrijven?"*

---

## 8. Eindoordeel

### Voor wie is OPC de juiste keuze

- **Organisaties met 5–200 planners** die enterprise project controls willen zonder een IT-afdeling voor Oracle-databases en upgradeprojecten.
- **Asset owners en publieke opdrachtgevers** met meerjarige kapitaalprogramma's, waar de combinatie portfolio + capital planning + risico + kosten in één platform het onderscheid maakt.
- **Bestaande Oracle Construction & Engineering-klanten** (Unifier, Aconex): de integratie- en contractvoordelen wegen dan zwaar.
- **Organisaties die risicoanalyse serieus nemen** maar geen apart Monte-Carlo-product willen licentiëren, beheren en trainen — de ingebouwde risicomodule plus Schedule Health Score vervangt hier twee losse producten.
- **Bouwbedrijven die kantoor- en veldplanning willen verbinden**: de Lean/Last Planner-app naast het CPM-schema is uniek in dit segment.
- **Projecten tot ±20.000 activiteiten** — comfortabel binnen de architectuur.

### Voor wie niet

- **Mega-projecten** (> ±50.000 activiteiten per project, LNG-trains, kerncentrales, grootschalige raildeals). Blijf bij P6 Professional/EPPM. **[schatting van de grens; Oracle publiceert geen limiet]**
- **Defensie, aerospace en DoE-contracten** met verplichte IPMDAR-, UN/CEFACT Format 6- of CPP-rapportage. OPC kan dat niet exporteren.
- **Resourcegedreven planning** met ploegendienst, uurlijkse toewijzingsspreiding of levelen als integraal onderdeel van het schedulen (turnarounds, fabrieksstops, onderhoudscampagnes).
- **Organisaties met zwaar kostgeladen P6-schema's** die op `Expenses` en `Cost Accounts` leunen: de migratie is een herimplementatie van het kostenmodel, geen conversie.
- **Gereguleerde/gevalideerde omgevingen** (GxP, nucleair) die controle over het upgrademoment nodig hebben — maandelijkse gedwongen SaaS-updates passen daar slecht.
- **MKB, kleine ingenieursbureaus en projectorganisaties zonder aparte planner-rol.** Te duur, te complex; ease-of-use scoort 3,7/5 niet voor niets.
- **Organisaties die openBIM/IFC als uitgangspunt nemen.** OPC ondersteunt IFC in het geheel niet; 4D vereist een dure, fragiele partnerketen.

### Slotoordeel

Oracle Primavera Cloud is **technisch een serieus, volwassen product met een echte P6-klasse CPM-kern**, en op sommige punten — kalenders, baselines, ingebouwde Monte-Carlo, schedule health, lean-integratie, configureerbare dashboards — **beter dan P6**. Het is de meest geloofwaardige cloudplanner in de markt voor wie CPM-strengheid niet wil inleveren.

Tegelijk is het **geen soepele opvolger van P6, maar een ander product met een migratiebrug**. Oracle's eigen migratiedocumentatie laat zwart op wit zien dat expenses, cost accounts, EPS, OBS, steps, reflections, resource shifts en tientallen andere objecten niet meekomen. Wie een grote P6-omgeving heeft, moet rekenen op een **herimplementatietraject**, niet op een upgrade. Dat, plus het feit dat Oracle P6 gewoon in leven houdt, verklaart waarom de adoptie zeven jaar na de rebranding nog steeds bescheiden is.

**Voor de opdrachtgever van dit onderzoek — een open-source, IFC-gebaseerde planner — is de conclusie scherp:**

- OPC is de **kwaliteitslat** voor de rekenkern. De feature-set die je moet evenaren is publiek gedocumenteerd: activiteitstypen, duurtypen, Retained Logic/Progress Override/Actual Dates, Longest Path vs. Total Float, multiple float paths, primaire/secundaire constraints, en een kalendermodel met feestdagenlijsten en exceptions.
- OPC is **geen concurrent op openheid** — het is het tegenovergestelde. Uitsluitend SaaS, uitsluitend propriëtaire formaten van één leverancier, API-objecten die daarna niet meer via de UI bewerkbaar zijn, en nul IFC-ondersteuning.
- De **strategische opening** ligt exact daar waar OPC leeg is: een planner die IFC 4.3 (`IfcWorkSchedule`/`IfcTask`/`IfcWorkCalendar`) als native formaat gebruikt én XER/P6 XML als adapter kan lezen en schrijven, bezet een positie die vandaag door niemand wordt ingenomen — en die de brug slaat tussen de openBIM-wereld en de Primavera-wereld waarin de contracten geschreven worden.

---

## Bronnen

### Oracle — officiële documentatie en prijslijsten

1. Oracle — *Key differences between Oracle P6 and Oracle Primavera Cloud* (Customer Hub, Primavera Cloud Getting Started for Schedulers). https://www.oracle.com/customer-hub/construction-engineering/primavera-cloud/primavera-cloud-getting-started-schedulers/schedule-differences-p6-and-primavera-cloud/ — geraadpleegd 25-7-2026
2. Oracle — *P6 vs. Primavera Cloud – A Quick Reference* (P6 EPPM Migration Guide, gepubliceerd 22-6-2026). https://docs.oracle.com/cd/E80480_01/English/admin/p6_eppm_migration_guide/246407.htm
3. Oracle — *P6 vs. Primavera Cloud – Projects* (feature-support-matrix: scheduling, activities, WBS, baselines/scenario's, kosten, codes/UDF's). https://docs.oracle.com/cd/E80480_01/English/admin/p6_eppm_migration_guide/246421.htm
4. Oracle — *P6 vs. Primavera Cloud – Resources and Roles*. https://docs.oracle.com/cd/E80480_01/English/admin/p6_eppm_migration_guide/246423.htm
5. Oracle — *P6 vs. Primavera Cloud – Programs*. https://docs.oracle.com/cd/E80480_01/English/admin/p6_eppm_migration_guide/246422.htm
6. Oracle — *Terminology Differences* (P6 EPPM Migration Guide). https://docs.oracle.com/cd/E80480_01/English/admin/p6_eppm_migration_guide/213356.htm
7. Oracle — *Migration Methods*. https://docs.oracle.com/cd/E80480_01/English/admin/p6_eppm_migration_guide/213350.htm
8. **Oracle — *P6 to Oracle Primavera Cloud Import Guide*, juli 2026 (PDF).** Bevat de lijsten "Nonimportable Data Supported in Primavera Cloud" en "Nonimportable Data **Not Supported** in Primavera Cloud", veldlengteverschillen en object-matchingregels. https://docs.oracle.com/cd/E80480_01/English/admin/p6_import_guide/primavera_cloud_p6_import.pdf — *primaire bron voor §5.1 en §6.1*
9. **Oracle — *Oracle Primavera Cloud Schedule Management User Guide*, juli 2026 (PDF, 417 p.).** Primaire bron voor activiteitstypen, duurtypen, scheduling-opties, kalenders, leveling, global change, undo-gedrag. https://docs.oracle.com/cd/E80480_01/English/user_guides/schedule_management_user_guide/primavera_schedule_management_user.pdf
10. Oracle — *Oracle Primavera Cloud Risk Management User Guide*, februari 2026 (PDF). https://docs.oracle.com/cd/E80480_01/English/user_guides/risk_management_user_guide/primavera_risk_management_user.pdf
11. Oracle — *Risk Overview* (OPC Help). https://primavera.oraclecloud.com/help/en/user/88293.htm
12. Oracle — *Import/Export to P6 Overview* (OPC Help; formaten, 1 GB-limiet, zip-beperking). https://primavera.oraclecloud.com/help/en/user/95912.htm
13. Oracle — *Export Oracle Primavera Cloud Data to P6 XML or XER* (20-baselines-limiet, XER-versiekeuze, 30 dagen download). https://primavera.oraclecloud.com/help/en/user/144609.htm
14. Oracle — *Import P6 XML or XER Data into Oracle Primavera Cloud*. https://docs.oracle.com/cd/E80480_01/English/admin/app_admin_guide/191098.htm
15. Oracle — *Get Started With Integration* (REST API, Gateway, Data Service, P6 EPPM- en MS Project-connecties; API-objecten niet via UI bewerkbaar). https://primavera.oraclecloud.com/help/en/user/249854.htm
16. Oracle — *Oracle Primavera Cloud Client System Requirements* (ondersteunde P6 EPPM 24.x–26.x, XER vanaf P6 Pro 15.2, Gateway 20.x–22.x, Aconex 23.8+, Unifier 22.10+). https://docs.oracle.com/cd/E80480_01/English/client_system_requirements/204934.htm
17. **Oracle — *Oracle Construction & Engineering Global Price List / Software Investment Guide*, Texas DIR-TSO-2539, gedateerd 10-NOV-2016 (PDF).** Bron voor Oracle Prime Projects $150/HNU/maand, P6 EPPM Cloud $125, perpetual P6-prijzen, 22 % supportregel en term-licentiepercentages. https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf
18. Oracle — *Primavera Cloud: bouwplatform* (productpagina; modules, Last Planner, Monte-Carlo, klant Richard Group). https://www.oracle.com/construction-engineering/primavera-cloud-project-management/
19. Oracle — *Primavera Cloud Roundup March 2026* (releases nov 2025 – feb 2026, maandelijkse cadans). https://www.oracle.com/customer-hub/construction-engineering/primavera-cloud/roundups/march-2026/
20. Oracle MOSC Community — *Oracle Prime Projects renamed Oracle Primavera Cloud as of June 1, 2019*. https://community.oracle.com/mosc/discussion/4273154/oracle-prime-projects-renamed-oracle-primavera-cloud-as-of-june-1-2019
21. Oracle — *P6 EPPM 26.4 What's New* (bewijs dat P6 actief doorontwikkeld wordt). https://docs.oracle.com/en/industries/construction-engineering/primavera-p6-project/26/p6-wn26/index.html

### Prijsbronnen

22. **UK Crown Commercial Service / Digital Marketplace — *Oracle Primavera – Pricing document*, th3rdcurve Ltd, effectief 30 april 2024 (PDF, G-Cloud 14).** Primaire recente prijsbron: OPC Schedule £950/licentie/jaar (min. 5), add-ons £7.549/licentie/jaar (min. 1), definitie Hosted Named User, 10 % extra korting bij ≥100 licenties. https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/710699/219564152717676-pricing-document-2024-05-03-1330.pdf
23. CDP Inc. — *Purchase Oracle Primavera Cloud (5-users)*; $7.800/jaar voor 5 gebruikers = $130/gebruiker/maand, extra gebruiker $1.560/jaar (pagina-copyright 2025). https://cdp-inc.com/products/software/purchase-oracle-primavera-cloud-5-users
24. Global PM — *Oracle Primavera Cloud (OPC) Annual Subscription Pricing*. https://globalpm.com/oracle-primavera-cloud-pricing/
25. ProjectManager.com — *What Is Oracle Primavera Cloud? Uses, Features & Pricing* (reproduceert de 2016-lijst; bevestigt dat Oracle geen publieke prijzen meer publiceert). https://www.projectmanager.com/blog/oracle-primavera-cloud
26. Taradigm — *How Much Does Primavera Cloud Cost?* / *Oracle Primavera Cloud vs Primavera P6: advantages* (claim: < $1.600/gebruiker/jaar, ≈ ⅓ van een P6-licentie). https://www.taradigm.com/how-much-does-primavera-cloud-cost/ ; https://www.taradigm.com/oracle-primavera-cloud-vs-primavera-p6-9-advantages-of-oracle-primavera-cloud/
27. ITQlick — *Oracle Primavera P6 Plans & Hidden Fees (2026)*. https://www.itqlick.com/oracle-primavera-p6/pricing

### Reviews en gebruikersfeedback

28. Capterra — *Oracle Primavera Cloud Reviews 2026* (4,4/5 over 182 reviews; ease-of-use 3,7; customer service 4,0; value for money 4,0; functionality 4,4). **Let op: deze listing vermengt P6 en OPC.** https://www.capterra.com/p/145503/Oracle-Primavera/reviews/
29. Software Advice — *Oracle Primavera Cloud Reviews, Pros and Cons – 2026* (sterrenverdeling, klachten over complexiteit, verouderde interface, beperkt maatwerk). https://www.softwareadvice.com/construction/primaverp6eppm-profile/reviews/
30. **SoftwareReviews / Info-Tech — *Oracle Primavera Cloud Customer Reviews 2026* (47 OPC-specifieke reviews; composite 7,5/10, likeliness to recommend 87, plan to renew 99, cost-vs-value 83, usability 77, ease of implementation 78).** https://www.infotech.com/software-reviews/products/oracle-primavera-cloud?c_id=368
31. G2 — *Oracle Primavera Cloud Reviews*. https://www.g2.com/products/oracle-primavera-cloud/reviews
32. Capterra Deutschland — *Oracle Primavera Cloud Erfahrungen, Vor- und Nachteile*. https://www.capterra.com.de/software/181380/oracle-primavera
33. Capterra Nederland — *Oracle Primavera Cloud – Reviews van geverifieerde gebruikers*. https://www.capterra.nl/reviews/181380/oracle-primavera
34. Planning Planet — forumdiscussies over Primavera-versies en -klachten. https://planningplanet.com/forums/primavera-version-pm5-pm6/415873/primavera-grumbles ; https://planningplanet.com/forums/primavera-version-pm5-pm6/417788/what-biggest-problem-p6

### Partner- en analyseartikelen

35. **Proove (NL/BE Oracle-partner) — *Is Oracle Primavera Cloud a good replacement for Primavera P6?*** (kritisch: "OPC did not have its big breakthrough yet… end-users still miss some features"; Oracle's strategiewijziging richting P6-pariteit). https://www.proove.eu/knowledge/is-oracle-primavera-cloud-a-good-replacement-for-primavera-p6
36. **Project Partners — *Cloud or Classic: OPC vs. P6 EPPM—Which One is Right For Me?*, 17 april 2025** (minimum 5 vs. 25 gebruikers; maandelijkse vs. kwartaalreleases; mega-projectbeperking; ontbrekende UN/CEFACT Format 6-, IPMDAR- en CPP-export). https://www.projectp.com/ppblog/2025/04/17/cloud-or-classic-opc-vs-p6-eppm-which-one-is-right-for-me/
37. Emerald Associates — *Differences Between Primavera P6 and Oracle Primavera Cloud* (resource shifts, hourly assignment spreads, future period bucket planning; mega-projectgeschiktheid). https://www.emerald-associates.com/item/differences-between-primavera-p6-and-oracle-primavera-cloud.html
38. Emerald Associates — *What's New in Oracle Primavera Cloud (OPC) v26.6*, 25-6-2026. https://www.emerald-associates.com/whats-new-in-oracle-primavera-cloud-opc-v26-6-2026-06-25.html
39. CMC Project Solutions — *Oracle Primavera Cloud vs. Primavera P6 EPPM: Key Differences and Business Benefits*. https://www.cmcprojectsolutions.com/posts/oracle-primavera-cloud-vs-primavera-p6-eppm-key-differences-and-business-benefits/
40. Compass Consult — *Oracle Primavera Cloud Vs P6: Key Features And Functionality*. https://compassconsult.co/oracle-primavera-cloud-vs-p6-key-features-and-functionality/
41. Primaned / Primaned Academy (NL) — *Oracle Primavera Cloud*; *Collaboration through integration of P6 EPPM and OPC*. https://www.primaned.com/en/products-services/project-controls-software/oracle-primavera-cloud ; https://www.primanedacademy.com/en/collaboration-through-integration-of-primavera-p6-eppm-and-oracle-primavera-cloud-opc-prime/
42. EquivTech — *What's New in Oracle Primavera Cloud 2026 (Version 26.2)*. https://www.equivtech.com.au/Primavera-Cloud-New-Update-26-2.html
43. Taradigm — *How to Import Primavera P6 XML Files into Oracle Primavera Cloud*. https://www.taradigm.com/how-to-import-primavera-p6-professional-xml-files-into-oracle-primavera-cloud/

### Markt, adoptie en context

44. **AppsRunTheWorld — *List of Oracle Primavera Cloud Customers*** (35 getrackte klanten; verdeling naar sector, regio en bedrijfsgrootte; genoemde klanten). https://www.appsruntheworld.com/customers-database/products/view/oracle-primavera-cloud
45. Wikipedia — *Primavera Systems* (oprichting 1983, overname door Oracle 2008). https://en.wikipedia.org/wiki/Primavera_Systems
46. PR Newswire / Oracle — *Customers Improve Productivity and Reduce Risk with New Oracle Primavera Cloud Capabilities*. https://www.prnewswire.com/news-releases/customers-improve-productivity-and-reduce-risk-with-new-oracle-primavera-cloud-capabilities-301728728.html
47. FinancialContent / Market Minute — *Oracle Shares Surge as AI-Agent Integration Reinvents Primavera Unifier and Global Project Delivery*, 14 april 2026 (sovereign cloud, agentic AI, predictive safety). https://markets.financialcontent.com/stocks/article/marketminute-2026-4-14-oracle-shares-surge-as-ai-agent-integration-reinvents-primavera-unifier-and-global-project-delivery
48. Construction Dive (gesponsord door Oracle) — *How BIM can enable construction scheduling in 4D* (Assemble Systems-integratie met P6). https://www.constructiondive.com/spons/how-bim-can-enable-construction-scheduling-in-4d/522873/
49. Capterra — *Best Oracle Primavera Cloud Alternatives 2026*. https://www.capterra.com/p/145503/Oracle-Primavera/alternatives/
50. Planera — *Top 10 Primavera P6 Alternatives*; ConstructionBids.ai — *Best Oracle Primavera P6 Alternatives (2026)* (concurrentielandschap, kostenindicatie P6 $2.000–$5.000+/gebruiker/jaar, 6–12 maanden tot vaardigheid). https://www.planera.io/post/primavera-p6-alternatives ; https://constructionbids.ai/blog/oracle-primavera-alternative-construction

### buildingSMART / IFC-context (voor §6.3)

51. buildingSMART Forums — *Logistic, phases and time in IFC definitions*. https://forums.buildingsmart.org/t/logistic-phases-and-time-in-ifc-definitions/2432
52. MDPI Applied Sciences — *IFC-Based 4D Construction Management Information Model of Prefabricated Buildings* (uitleg `IfcWorkSchedule`, `IfcTask`, `IfcRelAssignsToControl`). https://www.mdpi.com/2076-3417/11/16/7270
53. OSArch Community — *Construction Project Planning and Cost Scheduling (BlenderBIM & CharonIFC)* (open-source IFC-planningspraktijk). https://community.osarch.org/discussion/160/construction-project-planning-and-cost-scheduling-blenderbim-and-charonifc/p2

---

### Methodologische verantwoording

- **12 WebSearch-opdrachten** uitgevoerd, waaronder gerichte zoekopdrachten op klachten, "limitations", "vs", "alternatives", plus zoekopdrachten in het **Nederlands** en **Duits**.
- **~25 WebFetch-opdrachten** op leverancierssite, officiële Oracle-documentatie (incl. drie PDF's die lokaal met `pdfminer.six` zijn geëxtraheerd omdat de HTML-conversie faalde), reviewsites (Capterra, Software Advice, SoftwareReviews/Info-Tech), partneranalyses en het Britse G-Cloud-aanbestedingsportaal.
- G2 en Emerald Associates gaven HTTP 403 bij directe fetch; hun inhoud is via zoekresultaten en secundaire vermeldingen verwerkt en als zodanig gemarkeerd.
- Gerichte Reddit-zoekopdrachten (r/projectmanagement, r/construction, r/civilengineering) leverden **geen relevante OPC-specifieke discussies** op — op zichzelf een signaal over de beperkte adoptiebreedte. De praktijkkritiek in dit profiel komt daarom uit Planning Planet, reviewsites en — het meest waardevol — uit **Oracle's eigen migratie- en vergelijkingsdocumentatie**, die opvallend eerlijk is over wat OPC niet kan.
- Alle **[schatting]**-markeringen betreffen eigen afleidingen (valuta-omrekeningen, TCO-berekeningen, activiteitengrenzen) en geen bronvermelde feiten.
