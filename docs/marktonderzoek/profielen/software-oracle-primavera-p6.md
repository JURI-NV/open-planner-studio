# Oracle Primavera P6 — diepgaand softwareprofiel

**Onderzoeksdatum:** 25 juli 2026
**Onderzocht door:** software-analist, wereldwijd marktonderzoek planningssoftware
**Producten in scope:** Primavera P6 Professional (PPM, desktop) en Primavera P6 EPPM (Enterprise Project Portfolio Management, web/server), plus het omringende Primavera-portfolio (Risk Analysis, Progress Reporter, Analytics, Unifier, Gateway) en de opvolger-in-de-cloud Oracle Primavera Cloud (OPC).

> **Leeswijzer over betrouwbaarheid.** Bedragen en feiten zijn voorzien van bron en datum. Waar ik zelf reken of extrapoleer staat expliciet **[SCHATTING]**. Waar iets breed gerapporteerd maar niet met een primaire bron bevestigd is, staat **[NIET GEVERIFIEERD]**. Zie ook §10 (onderzoeksbeperkingen) en **§11 (Verificatie)** — een adversariële fact-check van 25-07-2026 waarin 26 falsifieerbare beweringen actief zijn geprobeerd te weerleggen; correcties uit die ronde zijn in de tekst hierboven verwerkt en per bewering verantwoord.

---

## 1. Wat het is

### 1.1 Leverancier en eigendom

| | |
|---|---|
| **Huidige eigenaar** | Oracle Corporation, via de *Oracle Construction and Engineering Global Business Unit* (CEGBU, voorheen "Primavera Global Business Unit") |
| **Oorspronkelijke maker** | Primavera Systems, Inc. (Bala Cynwyd, Pennsylvania, VS), opgericht 1983 door Joel Koppelman en Dick Faris **[NIET GEVERIFIEERD in deze ronde — algemeen gedocumenteerde bedrijfshistorie]** |
| **Overname door Oracle** | 2008 **[NIET GEVERIFIEERD in deze ronde]**. Wél geverifieerd: vanaf release P6 EPPM 6.2 (GA november 2008) staan alle P6-releases in het *Oracle Lifetime Support Policy — Oracle Applications* document onder "Oracle Primavera Releases" (Oracle, effective date 2 juli 2026). |
| **Licentiemodel** | Closed source, proprietary. Perpetual license + jaarlijkse *Software Update License & Support* (SULS), term-licenties, en SaaS. |

### 1.2 Historie in productlijnen (geverifieerd via Oracle Lifetime Support Policy, 2 juli 2026)

De ontstaansgeschiedenis is direct af te lezen uit Oracle's eigen supportmatrix:

| Product/release | GA-datum | Premier Support t/m | Sustaining |
|---|---|---|---|
| P3 Project Planner 3.x (het legendarische "P3") | apr 2001 | n.v.t. | onbeperkt |
| SureTrak 3.0.x | jul 2004 | n.v.t. | nov 2020 |
| P6 5.0 en eerder | jul 2005 | n.v.t. | sep 2009 |
| P6 6.0 / 6.1 | dec 2007 | n.v.t. | dec 2009 |
| Pertmaster 8.2 (→ Primavera Risk Analysis) | apr 2008 | n.v.t. | dec 2009 |
| P6 EPPM 6.2 | nov 2008 | nov 2013 | onbeperkt |
| P6 EPPM 7.0 | okt 2009 | okt 2015 | onbeperkt |
| P6 EPPM 8.0 (eerste echt web-based EPPM) | nov 2010 | nov 2015 | onbeperkt |
| Primavera Risk Analysis 8.7 | **mrt 2010** | **mrt 2018** | onbeperkt |
| P6 EPPM / P6 Professional 15.x (start jaar-versienummering) | mrt 2015 | mrt 2020 | onbeperkt |
| P6 EPPM / P6 Professional 21.x | dec 2021 | dec 2026 | onbeperkt |
| P6 EPPM / P6 Professional 24.x | dec 2024 | dec 2029 | onbeperkt |
| **P6 EPPM / P6 Professional 25.x** | **dec 2025** | **dec 2030** | onbeperkt |

De **actuele releases** zijn **25.12** (december 2025 — bevestigd in *Oracle Primavera P6 EPPM Tested Configurations Version 25*, december 2025) en **26.x** (Oracle Help Center toont een "26 Documentation Library" voor zowel P6 EPPM als P6 Professional; voor P6 Professional geverifieerd op 25-07-2026: de versielijst loopt van 6.2.1 t/m **26**, library-id `G48902_01`). Oracle hanteert dus CalVer met jaarlijkse hoofdrelease in december plus tussenreleases.

*Nuance bij bovenstaande tabel (verificatieronde 25-07-2026):* de *Oracle Lifetime Support Policy* van **2 juli 2026** kent nog **géén** regel voor P6 26.x — de nieuwste vermelde release is 25.x (GA dec 2025, Premier Support t/m dec 2030). Documentatie voor 26 bestaat dus al terwijl de supportmatrix nog niet is bijgewerkt; alle supportdata in de tabel hierboven zijn één-op-één uit die matrix overgenomen en regel voor regel geverifieerd (zie §11).

**Belangrijke observatie:** Primavera Risk Analysis (de Monte-Carlo-module, voortgekomen uit Pertmaster) staat sinds **maart 2010** op release 8.7 en Premier Support liep af in **maart 2018**. Er is in Oracle's eigen supportmatrix geen nieuwere release opgenomen. Dat betekent dat Oracle's kwantitatieve risicoanalyse-product feitelijk zestien jaar niet functioneel is doorontwikkeld.

### 1.3 Doelgroep, typische gebruikers, sectoren en regio's

**Doelgroep.** Oracle positioneert P6 EPPM voor het "prioriteren, plannen, managen en uitvoeren van projecten, programma's en portfolio's" met multi-user CPM-scheduling, resource-optimalisatie, geïntegreerd kosten-/schedulebeheer, cashflow-forecasting en changemanagement (oracle.com/construction-engineering/primavera-p6/). Softwareconnect vat de doelgroep samen als "large-scale enterprises with over 1,000 employees in the engineering, construction, public sector, utilities, oil and gas, and aerospace industries".

**Typische gebruikers.**
- *Planning engineers / schedulers / project controls* — dagelijkse gebruikers van P6 Professional (desktop). Dit is de kernpersona: een specialist, vaak gecertificeerd, die vrijwel voltijds in P6 werkt.
- *Project controls managers / PMO* — gebruiken EPPM-web voor portfolio-overzicht, thresholds, dashboards.
- *Contract- en claimspecialisten* — gebruiken baselines, Claim Digger/Schedule Comparison en XER-archieven als bewijsmateriaal bij delay claims.
- *Teamleden in het veld* — via P6 Team Member (web/iOS/Android) of Progress Reporter/timesheets; in de praktijk vaak beperkt uitgerold.
- *Opdrachtgevers/overheden* — als ontvangende partij die XER-bestanden van aannemers inleest en toetst.

**Sectoren.** Grote infrastructuur (spoor, tunnels, bruggen, luchthavens, water), EPC in olie & gas en petrochemie, energie en nucleair, utilities, mijnbouw, defensie & aerospace, scheepsbouw, farma-capex, en grote gebouwde omgeving/vastgoedprogramma's. Oracle noemt zelf als klanten onder meer **ITER** (kernfusieproject), **Assystem**, **Clayco**, **Swinerton** en **Alectra Utilities**.

**Regio's.** Sterkst in Noord-Amerika, het Midden-Oosten (GCC-landen), India, Australië en het VK — grofweg overal waar FIDIC/EPC-contractvormen, claims-cultuur en overheidsprogramma's dominant zijn. Het Planning-Planet-forum (de belangrijkste internationale vakcommunity voor planners) laat een sterk Midden-Oosten/Azië/Australië-profiel zien onder P6-gebruikers. Lokalisatie in P6 25.12 omvat 15 talen: Arabisch, Braziliaans Portugees, Chinees (vereenvoudigd/traditioneel), Engels, **Nederlands**, Frans, Duits, Italiaans, Japans, Russisch, Spaans, Koreaans, Pools en Tsjechisch — waarbij alleen Chinees-vereenvoudigd, Frans, Duits, Japans en Koreaans gelokaliseerde help hebben (bron: Tested Configurations v25, dec 2025).

---

## 2. Functionaliteit en techniek

### 2.1 Twee clients, één datamodel

| | **P6 Professional (PPM)** | **P6 EPPM (Web)** |
|---|---|---|
| Vorm | Windows-desktopclient | Browserapplicatie op Oracle WebLogic |
| Rol | Diepe scheduling-workbench voor planners | Enterprise-toegang, portfolio, governance, dashboards |
| Database | Oracle DB, MS SQL Server (**SQLite** voor standalone — **[ONZEKER, zie §11]**) | Oracle DB 19.29/23 (ook Autonomous) of MS SQL Server 2019/2022 |
| Platform | **alleen Windows** (Windows 11 64-bit getest); Citrix XenApp 7.18/RDS 2019-2022/Secure Global Desktop 5.5 ondersteund voor publicatie | Chrome 139+, Firefox 143+, Edge 139+ op Windows **én macOS 15** (Safari 18.6+/Firefox/Chrome); alleen Windows 10, iOS 18 en Android-tablets dragen de beperking "P6 Team Member Web only" |
| Verbinding met EPPM | via *P6 Professional Cloud Connect* (niet ondersteund op SQL Server) | n.v.t. |

Bron voor alle technische specificaties in deze tabel: *Oracle Primavera P6 EPPM Tested Configurations, Version 25*, december 2025 (PDF, docs.oracle.com).

De twee clients zijn **niet functioneel gelijk**. Oracle's eigen vergelijkingsmatrix (P6 EPPM ↔ Primavera Cloud migration guide) toont per functie afzonderlijke kolommen voor "P6 EPPM Web", "P6 EPPM Client", "P6 Professional" en "Primavera Cloud" — bijvoorbeeld *Project Home Page*, *Configurable Project Details Form*, *News Feed*, *Project Alerts*, *Companies*, *Evaluation Matrix* en *Strategies* bestaan alléén in P6 EPPM Web, terwijl *Job Services* juist alleen in de clients zit. Dat betekent in de praktijk dat organisaties beide moeten uitrollen en gebruikers moeten leren wisselen.

### 2.2 CPM-engine

De scheduling-engine is de reden dat P6 de standaard is. Kenmerken (op basis van productdocumentatie en algemene vakkennis van het product; individuele optienamen zijn niet stuk voor stuk met een primaire URL bevestigd — **[NIET GEVERIFIEERD op detailniveau]**):

- **Precedence Diagram Method** met vier relatietypen (FS, SS, FF, SF) en lag (ook negatief).
- **Lag-kalenderkeuze**: lag kan gerekend worden op de predecessor-, successor-, project-standaard- of 24-uurskalender. Dit is een subtiel maar cruciaal punt dat de meeste concurrenten simpeler oplossen — en tegelijk een klassieke bron van "waarom rekent P6 dit zo?"-verwarring.
- **Retained Logic / Progress Override / Actual Dates** als out-of-sequence-strategie.
- **Kritiek pad**: te definiëren als "Total Float ≤ waarde" óf als **Longest Path** — belangrijk verschil bij multi-kalender- en multi-project-netwerken.
- **Multiple Float Paths**: berekening van de 1e t/m N-de bijna-kritieke paden (free float of total float basis).
- **Constraints**: negen typen (Start On / On or Before / On or After, Finish On / On or Before / On or After, As Late As Possible, Mandatory Start, Mandatory Finish).
- **Activity types**: Task Dependent, Resource Dependent, Level of Effort, Start Milestone, Finish Milestone, WBS Summary.
- **Duration types**: Fixed Units, Fixed Duration & Units, Fixed Units/Time, Fixed Duration & Units/Time.
- **% Complete types**: Duration, Units, Physical (met Steps).
- **Data date / progress**: statusing per activiteit met remaining duration, expected finish, suspend/resume, *Update Progress*, *Store Period Performance* (past-period actuals — geverifieerd in Oracle's vergelijkingsmatrix).
- **Resource leveling** met prioriteitsregels en levelen binnen float.
- **Scheduling log** met circulaire-logica-detectie, open ends en constraint-rapport.

### 2.3 Kalenders

Drie niveaus — **Global**, **Resource** en **Project** — met werktijden op **uur- (en minuut-)niveau**, per weekdag instelbaar, plus uitzonderingen (feestdagen, shutdowns, weersvensters). Elke activiteit krijgt een eigen kalender; resources kunnen daar weer van afwijken. Dit uurgebaseerde, per-entiteit-toewijsbare kalendermodel is een van de belangrijkste technische onderscheiders ten opzichte van eenvoudiger tools en is precies wat ploegendienst-, turnaround- en 24/7-planning vereist.

### 2.4 Resource- en kostenmodel

- **Resourcetypen**: Labor, Nonlabor (materieel), Material (met eenheden).
- **Roles** met proficiency, gekoppeld aan resources; planning op rol vóór toewijzing van naam.
- **Rate types**: vijf prijs/eenheid-tarieven per resource, met geldigheidsdata (shift-rates).
- **Resource curves** voor niet-lineaire spreiding van uren/kosten over de duur.
- **Expenses** (niet-resource-kosten) met cost accounts en accrual types.
- **Budget / Original / Remaining / At Completion / Actual** kostenvelden per toewijzing en per WBS.
- **Earned Value Management** ingebouwd: BCWS/BCWP/ACWP, SPI/CPI, meerdere technieken voor performance % complete en EAC-formules (inclusief ETC met performance factor). P6 kan UN/CEFACT-XML exporteren voor formele EVM-oplevering aan Amerikaanse overheidsopdrachtgevers (bron: Oracle *Import/Export file formats*, docs.oracle.com — "such as the Defense Contract Management Agency").
- **Cashflow**: Oracle noemt op de productpagina expliciet "schedule-based forecasting fed by both cost sheets and Primavera schedules".

### 2.5 Baselines

P6 kent per project meerdere opgeslagen baselines; er kunnen er tegelijk een beperkt aantal *toegewezen* worden voor vergelijking (project baseline + gebruikersbaselines). Het exacte maximum is instelbaar in de admin-preferences **[NIET GEVERIFIEERD — genoemd getal 50 per project circuleert breed, niet in deze ronde met Oracle-bron bevestigd]**. Belangrijk voor interoperabiliteit: **XER kan géén baselines meenemen, P6 XML wel** (Oracle, *Import/Export file formats*).

Voor delay-analyse is **Claim Digger / Schedule Comparison** ingebouwd: een gestructureerde diff tussen twee schedules of tussen schedule en baseline. Dit is een van de redenen dat P6 in juridische context de standaard is.

### 2.6 Risico en Monte-Carlo

Kwalitatief risicoregister zit in P6 zelf (risico's, scoring, koppeling aan activiteiten). **Kwantitatieve Monte-Carlo-analyse zit níet in P6** maar in het aparte, apart gelicentieerde **Primavera Risk Analysis** (PRA) — dat, zoals in §1.2 vastgesteld, sinds maart 2010 op versie 8.7 staat en waarvan Premier Support in maart 2018 afliep. PRA staat wél nog in de Tested Configurations van P6 25.12 als integreerbare applicatie (via P6 EPPM Web Services) — geverifieerd 25-07-2026: PRA staat daar onder *"Other Primavera Applications"* met de notitie *"The tested version is the most recent version available"* en *"Requires P6 EPPM Web Services to integrate with P6 EPPM"*.

**Tegenwicht bij de "Oracle heeft kwantitatieve risicoanalyse opgegeven"-conclusie [toegevoegd na verificatie].** Twee bevindingen nuanceren die uitspraak, zonder haar te weerleggen:
1. Oracle's **actuele Construction & Engineering-documentatieportaal** (docs.oracle.com/en/industries/construction-engineering, geraadpleegd 25-07-2026) vermeldt **Primavera Risk Analysis níet meer** in de productlijst — wat de stilstand bevestigt en zelfs versterkt.
2. Datzelfde portaal vermeldt wél **Oracle Crystal Ball** ("predictive modeling, forecasting, simulation and optimization") als actueel C&E-product. Oracle heeft Monte-Carlo dus niet volledig verlaten; het is verplaatst naar een Excel-gebaseerd, *schedule-agnostisch* product. Voor geïntegreerde **schedule**-risicoanalyse (risico's op activiteiten, correlaties, kritiek-pad-index) blijft de conclusie staan: dat is bij Oracle sinds 2010 niet doorontwikkeld.

Praktisch gevolg: organisaties die serieuze kwantitatieve schedule-risicoanalyse doen, gebruiken in toenemende mate **Safran Risk**, **Deltek Acumen Risk** of **@RISK/Full Monte** naast P6 **[NIET GEVERIFIEERD als marktcijfer — observatie op basis van het productlevenscyclus-feit hierboven en de concurrentiegenoemde alternatieven]**.

### 2.7 4D / BIM

**P6 heeft geen enkele native BIM- of IFC-functionaliteit.** Er is geen 3D-viewer, geen modelkoppeling, geen IFC-import/-export. 4D loopt altijd via derden: Bentley **Synchro 4D**, Autodesk **Navisworks TimeLiner**, Trimble/Tekla, Vico. Die tools importeren het P6-schema (via XER/MPP/PMXML) en koppelen het handmatig of via regels aan modelobjecten. Onderzoeksliteratuur bevestigt dit patroon: "BIM platforms and dedicated planning tools like Primavera P6 are typically used in isolation and require manual data translation. Although interoperability standards such as IFC and schema elements like IfcTask and IfcWorkSchedule exist, their practical implementation remains limited."

Voor visualisatie levert Oracle alleen **AutoVue 2D/3D Professional** mee als documentviewer — en dat is de enige component die nog een **Java 8-runtime (JRE 1.8.0_311)** vereist (Tested Configurations v25, dec 2025).

### 2.8 Portfolio en rapportage

- **EPS/OBS**: hiërarchische Enterprise Project Structure en Organizational Breakdown Structure — de dragende structuur voor multi-project en autorisatie.
- **Portfolios**, scenario's, capaciteitsanalyse, *Evaluation Matrix* en *Strategies* (alleen in EPPM Web).
- **Dashboards / portlets**, *Monitor Thresholds*, *Project Alerts*, *News Feed* (alleen EPPM Web).
- **Rapportage**: ingebouwde rapporten plus **Oracle Analytics Publisher** (voorheen BI Publisher, versie 2025 getest). Voor echte BI is er **Primavera Data Warehouse + Primavera Analytics** (25.12 / 25.4) als aparte, apart gelicentieerde producten.
- **P6 Visualizer** voor timescaled logic diagrams en Gantt-output buiten de standaardweergaven.

In de praktijk is dit het zwakste onderdeel: planners op Planning Planet zeggen al vijftien jaar consistent dat ze alles naar Excel exporteren. *"Most of current planner will just do all the updating/s-curve etc in Excel"* (Planning Planet, 11-01-2012); *"the most important not improved is still the reporting we still throw the info into Excel anyway"* (Planning Planet, 28-10-2010).

### 2.9 Platform, architectuur en schaalbaarheid

**Server-stack P6 EPPM (geverifieerd, Tested Configurations v25, dec 2025):**
- Applicatieserver: **Oracle WebLogic Server 14.1.2** (Java EE). P6 EPPM is dus server-side een Java-applicatie.
- Database: Oracle Database 19.29 / 23 / Autonomous, of MS SQL Server 2019/2022. Oracle-features als RAC, Data Guard, partitioning, Advanced Compression, TDE en Database Vault worden ondersteund. Twee beperkingen die bij verificatie boven kwamen en het "cloud-ready"-verhaal ondermijnen: **Azure SQL Database wordt niet ondersteund**, en op SQL Server is **alleen case-insensitive collation** toegestaan.
- Optioneel: Oracle Identity Manager 14.1.2, Oracle Access Manager 14.1.2, Oracle Internet/Unified Directory, Shibboleth 3.3.3, Active Directory 2022/2025; SSO via **SAML 2.0**.
- Content: CMIS-connector, SharePoint 2019/2022, Oracle WebCenter Content.
- Workflow: Oracle Business Process Management 14.1.2 (alleen P6 Web).
- **Java op de client**: *"JRE (Java Runtime Environment) is not a requirement for P6 EPPM; it is requirement only for AutoVue."* — de historische browser-Java-applet-ellende is dus opgelost, behalve voor AutoVue.

**Client-stack P6 Professional:** Windows 11 64-bit, Microsoft .NET Framework 4.6.2, Windows Installer 4.5, Oracle Database Client 19.8 (64-bit) voor Oracle-verbindingen. Geen macOS, geen Linux.

**Schaalbaarheid.** Oracle's eigen marketingtekst voor P6 Professional: *"designed to handle large-scale, highly sophisticated and multifaceted projects. It provides unlimited resources and an unlimited number of target plans."*

Realistische ordegroottes **[SCHATTING, op basis van praktijkrapportages en de architectuur; Oracle publiceert geen harde limiet]**:
- **Enkel project, comfortabel bewerkbaar**: 5.000–20.000 activiteiten.
- **Enkel project, technisch haalbaar maar traag/onhandelbaar in de UI**: 100.000+ activiteiten.
- **Enterprise-database (Oracle/SQL Server)**: honderden projecten, miljoenen activiteitregels; hier is P6 echt sterk — het is een echte multi-user RDBMS-applicatie met row-level concurrency, geen bestandsgebaseerd model.
- **SQLite standalone** **[ONZEKER — in de verificatieronde niet met een primaire Oracle-bron bevestigd; Oracle's eigen P6 Professional 26-documentatiebibliotheek zegt juist dat P6 Professional "built on Oracle and Microsoft SQL Server relational databases" is en noemt SQLite nergens; ook de Tested Configurations v25 noemt SQLite niet]**: expliciet ongeschikt voor grote/langlopende inzet. Oracle's eigen support-knowledgebase zou dedicated artikelen hebben over *"Slow Performance in P6 Professional Standalone System Using a SQLite Database"* en *"P6 Professional Standalone Operations Such As Logging In Or Opening Projects For The First Time Is Slow When Using A Standalone SQLite Database"*. De prestaties degraderen naarmate het SQLite-bestand groeit, ook bij kleine projecten.

---

## 3. Prijzen

### 3.1 Wat Oracle zelf publiceert

Oracle publiceert **geen actuele openbare prijslijst** meer voor Primavera. De meest recente publiek downloadbare Oracle-prijslijst die ik kon vinden en volledig kon uitlezen is:

> **Oracle Construction & Engineering Global Price List — Software Investment Guide**, gedateerd **10 november 2016**, "Oracle Pricing for Texas DIR — Oracle DIR-TSO-2539".
> URL: https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf (opgehaald en tekstueel geëxtraheerd op 25-07-2026)

Dit document is oud maar waardevol, omdat het de **structuur** van Oracle's Primavera-licentiemodel exact vastlegt — een structuur die vandaag onveranderd is.

*Positieve verificatie van de "Oracle publiceert niets meer"-claim (25-07-2026):* Oracle's actuele prijslijst-index op **oracle.com/corporate/pricing/** somt twintig prijslijsten op (Technology, Applications, Fusion, Engineered Systems, Siebel, PeopleSoft, JD Edwards, MySQL, Java SE, Linux/VM, PaaS/IaaS, Public Sector, enz.) — **geen daarvan betreft Primavera of Construction & Engineering**. De meest recente Applications-lijst (*Oracle E-Business Suite Applications Global Price List*, 6 november 2025) bevat bij volledige tekstextractie **nul** treffers op "Primavera". De claim is daarmee niet alleen "niet gevonden" maar actief bevestigd.

**Perpetual licenties + jaarlijkse Software Update License & Support (peildatum 10-11-2016):**

| Product | Licentie (eenmalig) | SULS (per jaar) | Metriek | Min. afname |
|---|---:|---:|---|---:|
| Primavera P6 Enterprise Project Portfolio Management | $2.750 | $605 | Application User | — |
| Primavera P6 Progress Reporter | $950 | $209 | Application User | — |
| Primavera P6 Professional Project Management | $2.500 | $550 | Application User | — |
| Primavera Analytics | $2.000 | $440 | Application User | 25 |
| Primavera Contract Management, BI Publisher Edition | $2.000 | $440 | Application User | — |
| Primavera Earned Value Management | $10.000 | $2.200 | Application User | — |
| Primavera Risk Analysis | $9.500 | $2.090 | Application User | — |
| Primavera Portfolio Management | $2.900 | $638 | Application User | 50 |
| Primavera Capital Planning & Investment Control Budgeting | $2.000 | $440 | Application User | 50 |
| Primavera Data Warehouse | $25.000 | $5.500 | **Processor** | — |
| Primavera Contractor | $1.295 | $285 | Application User | — |
| Primavera Unifier Project Controls | $3.950 | $869 | Application User | 25 |
| Primavera Unifier Facilities & Real Estate Mgmt | $3.950 | $869 | Application User | 25 |
| Primavera Unifier Portal User | $75 | $17 | Application User | 100 |
| Instantis EnterpriseTrack | $2.000 | $440 | Application User | 25 |
| Instantis EnterpriseTrack Timesheets | $400 | $88 | Application User | 25 |
| Primavera Gateway | $20.000 | $4.400 | Application User | 5 |
| Primavera P6 EPPM Web Services | $500 | $110 | Application User | 10 |
| Primavera Contract Management Web Services | $500 | $110 | Application User | 10 |

*Kanttekening bij de tabel — **bijgewerkt na verificatie (25-07-2026)**: de eerdere waarschuwing dat de kolomtoewijzing deels geschat was, is niet langer nodig. De PDF is in de verificatieronde opnieuw opgehaald en met `pypdf` volledig tekstueel geëxtraheerd; **alle 19 regels hierboven — inclusief Gateway ($20.000/$4.400, min. 5) — zijn letterlijk in de brontekst teruggevonden**, in dezelfde productvolgorde als het prijsblok. Metriek en minima kloppen regel voor regel. De P6-regels (EPPM $2.750/$605 en Professional $2.500/$550) zijn daarnaast onafhankelijk bevestigd door softwareconnect.com.*

**Belangrijke structurele regels uit hetzelfde document (letterlijk):**

- **SULS = 22% van de perpetual list price.** Controle: 605/2.750 = 22,0%; 550/2.500 = 22,0%. ✅ *Preciseringsnoot na verificatie: de zin met het letterlijke getal "22%" in dit document gaat strikt genomen over **term**-licenties ("The list support price for term licenses is 22% of the list perpetual license fee"). Dat 22% óók Oracle's staande SULS-tarief voor perpetual is, volgt uit de verhoudingen in de tabel én is onafhankelijk bevestigd in een **actuele** Oracle-prijslijst: de* Oracle E-Business Suite Applications Global Price List *van **6 november 2025** hanteert exact hetzelfde tarief over de hele linie (bv. Marketing $5.795 licentie / $1.274,90 support = 22,000%). Het 22%-tarief is dus geen historisch artefact uit 2016 maar Oracle-breed staand beleid per eind 2025.*
- **Term-licenties**: *"1 year – 20% of list; 2 year – 35% of list, 3 year – 50% of list, 4 year 60% of list and 5 year 70% of list."*
- **Support bij term-licenties**: *"The list support price for term licenses is 22% of the list perpetual license fee... The term license percentages are not applied to the list support price."* Oftewel: een 1-jarige term kost 20% van de perpetual prijs **plus** de volle 22% support over de perpetual prijs — samen 42% van de perpetual prijs per jaar.
- **"Application User"** = *"an individual authorized by you to use the applicable licensed application programs ... regardless of whether the individual is actively using the programs at any given time."* → dit is een **named user**, géén floating/concurrent licentie. *Verificatie 25-07-2026: de volledige definitietekst is letterlijk in de PDF teruggevonden en luidt "…which are installed on a single server or on multiple servers **regardless of whether the individual is actively using the programs at any given time**". In de hele prijslijst komt geen enkele concurrent-/floating-metriek voor.* Precisering: naast Application User gebruikt het document ook **Processor** (Primavera Data Warehouse), en voor de bijgeleverde User-Productivity-Kit-trainingsproducten de metrieken **Employee**, **UPK Developer** en **UPK Module** — geen daarvan is een concurrent-metriek voor de plannings­software zelf.

**Cloud (Monthly Subscription Fee, zelfde document, 10-11-2016):**

| Cloud service | Prijs/maand | Metriek | Min. |
|---|---:|---|---:|
| Primavera P6 EPPM Cloud Service | $125 | Hosted Named User | 25 |
| Primavera P6 Progress Reporter Cloud Service | $12 | Hosted Named User | — |
| Primavera P6 EPPM Web Services Cloud Service | $20 | Hosted Named User | — |
| Primavera Virtual Desktop Cloud Service | $1.000 | Hosted Environment | 1 |
| Primavera Unifier Project Controls Cloud Service | $150 | Hosted Named User | 25 |
| Primavera Analytics Cloud Service | $90 | Hosted Named User | 25 |
| Oracle Prime Projects Cloud Service | $150 | Hosted Named User | 25 |
| Oracle Prime Portfolios Cloud Service | $125 | Hosted Named User | 25 |
| Primavera Cloud Service — extra non-productie-omgeving | 10% van de maandelijkse subscription fee | Nonproduction Environment | — |

*Bijgewerkt na verificatie (25-07-2026): ook dit cloudblok is letterlijk uit de PDF geëxtraheerd en klopt regel voor regel, inclusief de minima. Voor de volledigheid ontbraken in bovenstaande tabel nog: Oracle Prime Progress Cloud $12, Unifier Facilities & Real Estate Cloud $150 (min. 25), Unifier Portal User Cloud $2, AutoVue 2D Professional Cloud $13, AutoVue 3D Professional Advanced Cloud $50, Primavera Data Access Cloud $1.000 per Hosted Environment, extra 10 GB databaseopslag $60/GB, extra 50 GB bestandsopslag $150/GB, extra productiedatabase $40 (min. 25), Instantis EnterpriseTrack Cloud $80 (min. 25) en Instantis Timesheets Cloud $17 (min. 25).* De **minimum van 25 gebruikers** voor de P6 EPPM Cloud Service is onafhankelijk bevestigd door Ten Six Consulting ("Oracle reportedly requires at least 25 users") en door projectmanagertemplate.com.

### 3.2 Actuele lijstprijzen via Oracle-partners (2026)

Omdat Oracle zelf niets meer publiceert, zijn dit de best beschikbare actuele lijstprijzen:

| Product | Prijs | Metriek | Bron | Datum geraadpleegd |
|---|---:|---|---|---|
| **Primavera P6 Professional** | **$3.880** | Application User, perpetual, on-premises, excl. update & support | akimeng.com/oracle-primavera-price-list.html (Oracle-partner) | 25-07-2026 |
| **Primavera P6 Professional Rel. 25.12** | **$3.880,00** | per licentie (webshop) — **[ONZEKER: bij herverificatie op 25-07-2026 leverde globalpm.com geen leesbare paginainhoud meer op; deze corroboratie kon niet worden gereproduceerd]** | globalpm.com/product/oracle-primavera-p6-professional/ | 25-07-2026 |
| **Primavera P6 Enterprise (EPPM)** | **$4.240** | Application User, perpetual, excl. support | akimeng.com | 25-07-2026 |
| **Primavera Risk Analysis** | **$10.450** | Application User, perpetual, excl. support | akimeng.com | 25-07-2026 |
| **P6 Progress Reporter** | **$1.460** | Application User, perpetual, excl. support | akimeng.com | 25-07-2026 |
| Primavera P6 Professional | "starts at $3.500" | perpetual | primaverascheduling.com/home/buy-primavera-software/ | 25-07-2026 |
| P6 Professional | ~$3.520/gebruiker + ~$704/jaar support | perpetual + SULS | Taradigm, via projectmanagertemplate.com (art. 27-10-2025, upd. 14-02-2026) | 25-07-2026 |
| P6 Enterprise-bundel (P6 Web + P6 Professional + Progress Reporter) | $4.240 | per gebruiker | Taradigm, via projectmanagertemplate.com | 25-07-2026 |
| P6 Professional (Australië) | AUD 5.280 + AUD 1.162/jaar onderhoud | per licentie | Compass Consult, via projectmanagertemplate.com | 25-07-2026 |
| **Oracle Primavera Cloud — 5-user starterpack** | **$7.800/jaar** (= **$130 per gebruiker per maand**) | jaarabonnement, 5 named users | cdp-inc.com/products/software/purchase-oracle-primavera-cloud-5-users (© 2025) | 25-07-2026 |
| Oracle Primavera Cloud — extra licentie | **$1.560/jaar** (= $130/mnd) | per named user | cdp-inc.com | 25-07-2026 |
| Primavera P6 (analistenschatting) | vanaf **$3.168 per gebruiker per jaar**; range $5.000–$15.000 per gebruiker/jaar on-premises | — | selecthub.com/ppm-software/primavera-p6/ | 25-07-2026 |
| "Oracle Primavera" (aggregator) | *"Starting price $100 per year"* | — | capterra.com/p/145503/Oracle-Primavera/ | 25-07-2026 — **onbetrouwbaar, waarschijnlijk placeholder** |

**Betrouwbaarheidswaarschuwing bij de partnerprijzen (toegevoegd na verificatie 25-07-2026).** De vier kernbedragen ($3.880 / $4.240 / $10.450 / $1.460) staan wél letterlijk op akimeng.com, mét de attributen "Application User", "Perpetual", "Support: not included" en een footer "© 2026" — dat deel is hard bevestigd. Maar: (a) de tweede bron (globalpm.com) was niet reproduceerbaar, zodat $3.880 in de praktijk op **één** partnerpagina rust; (b) de opslag ten opzichte van Oracle's lijst van 2016 is intern inconsistent — P6 Professional +55,2%, P6 EPPM +54,2% en Progress Reporter +53,7% (onderling consistent), maar Primavera Risk Analysis slechts **+10,0%** ($9.500 → $10.450). Dat patroon suggereert dat de PRA-regel op die lijst deels verouderd of anders afgeleid is. Behandel de PRA-prijs daarom als **[ONZEKER]** en de drie P6-prijzen als "één goed onderbouwde partnerbron, geen Oracle-bevestiging".

**Afgeleide jaarlijkse supportbedragen [SCHATTING — eigen berekening op Oracle's standaard 22%-tarief toegepast op de partner-lijstprijzen van 2026]:**

| Product | Lijstprijs 2026 | Geschatte SULS/jaar (22%) |
|---|---:|---:|
| P6 Professional | $3.880 | **≈ $854** |
| P6 EPPM | $4.240 | **≈ $933** |
| Primavera Risk Analysis | $10.450 | **≈ $2.299** |
| P6 Progress Reporter | $1.460 | **≈ $321** |

**Afgeleide term-licentieprijs [SCHATTING]:** een 1-jarige term-licentie P6 Professional = 20% × $3.880 = $776, plus 22% × $3.880 = $854 support ⇒ **≈ $1.630 per gebruiker per jaar**. Dat is het bedrag om mee te vergelijken tegen SaaS-alternatieven.

### 3.3 Enterprise-staffels, minima en onderhandeling

- Oracle publiceert **geen volumestaffels** in de prijslijst. Kortingen komen uit onderhandeling; ordegrootte 20–60% korting op list bij grote enterprise agreements is gebruikelijk in de Oracle-wereld **[SCHATTING, niet in deze ronde geverifieerd voor Primavera specifiek]**.
- **Minimale afnames** zijn wél hard vastgelegd per product (zie tabellen): 25 users voor Analytics, Unifier, P6 EPPM Cloud en Instantis; 50 voor Portfolio Management en CPIC; 100 voor Unifier Portal User; 10 voor Web Services.
- Voor **on-premises P6 Professional en P6 EPPM zelf geldt géén minimum** — één licentie kopen kan.
- **Verborgen kosten die structureel onderschat worden:** Oracle Database of SQL Server-licenties, WebLogic (P6 EPPM vereist WebLogic; of dat apart gelicentieerd moet worden hangt af van de overeenkomst **[NIET GEVERIFIEERD]**), serverinfra, DBA-tijd, upgradeprojecten, training (P6-cursussen $1.000–$2.500 per persoon **[SCHATTING]**), implementatieconsultancy en integratiewerk. Meerdere bronnen komen uit op een TCO van **2–3× de licentiekosten** over de levenscyclus (projectmanagertemplate.com, 27-10-2025).

### 3.4 Uitgewerkt kostenvoorbeeld [SCHATTING — eigen berekening, 2026-prijzen]

*Middelgroot aannemersbedrijf, 10 planners, P6 Professional on-premises met gedeelde Oracle-database:*

| Post | Jaar 1 | Vanaf jaar 2 |
|---|---:|---:|
| 10 × P6 Professional perpetual @ $3.880 | $38.800 | — |
| Jaarlijkse support @ 22% | $8.536 | $8.536 (jaarlijkse indexatie mogelijk) |
| Database + serverinfra | $10.000 | $2.500 |
| Implementatie/configuratie/migratie | $20.000 | — |
| Training 10 personen | $15.000 | $2.000 |
| Interne beheertijd (0,2 fte) | $20.000 | $20.000 |
| **Totaal** | **≈ $112.000** | **≈ $33.000** |

Ter vergelijking: dezelfde 10 gebruikers op **Oracle Primavera Cloud** kosten $130/maand = **$15.600 per jaar** aan abonnement, zonder infra en zonder upgradeprojecten — maar met de functionele gaten die Oracle zelf in de migration guide documenteert (zie §2.1 en §8).

---

## 4. VOORDELEN

1. **De facto standaard en contractuele acceptatie.** In grote infra en EPC is "lever je programma als XER" een contracteis. Oracle's eigen positionering ("the recognized standard for high-performance project management software" — docs.oracle.com, P6 Professional Get Started) wordt gedragen door de markt: SelectHub meet **84% aanbevelingsscore over 371 reviews**, Capterra **4,4/5 over 182 reviews**. Een reviewer op Software Connect noemt het simpelweg *"the industry standard, a must for professional engineering and design firms"* (05-03-2018). Voor een aannemer is P6 vaak geen keuze maar een toegangsvoorwaarde tot de aanbesteding.

2. **Volwassen, fijnmazig instelbare CPM-engine.** Retained Logic vs. Progress Override, kritiek pad op total float óf longest path, multiple float paths, negen constrainttypen, vier duurtypen, lag berekend op een keuzekalender. Geen enkele lichtere tool biedt deze mate van controle. Precies daarom is P6 de referentie in delay-analyse en forensische planning: de rekenwijze is voorspelbaar, gedocumenteerd en juridisch beproefd.

3. **Uurgebaseerd, per-entiteit kalendermodel.** Global/Resource/Project-kalenders met werktijden per uur en volledige uitzonderingenlijsten, per activiteit toewijsbaar. Dit is wat 24/7-turnarounds, ploegendiensten, weersvensters en spoorbuitendienststellingen realistisch maakt. TrustRadius-reviewers: *"Primavera can manage large project schedules regardless of complexity and is powerful enough to identify the longest pathway to project completion."*

4. **Echte enterprise-schaal met multi-user database.** P6 EPPM draait op Oracle DB (incl. RAC, Data Guard, partitioning, TDE) of SQL Server met WebLogic ervoor — dit is geen bestandsgebaseerde tool die "ook wel netwerkschijven aankan". Honderden projecten in één EPS met gelijktijdige bewerking, row-level concurrency en volledige audittrail. SelectHub: **97%** van de reviewers prijst het beheer van complexe schedules; ~100% de functionaliteit en de monitoring.

5. **Diep resource- en kostenmodel met ingebouwde EVM.** Labor/Nonlabor/Material, rollen met proficiency, vijf tariefsoorten, resource curves, expenses met cost accounts, Store Period Performance en volwaardige earned value (BCWS/BCWP/ACWP, SPI/CPI, meerdere EAC-formules) plus UN/CEFACT-export voor formele overheidsoplevering. Voor wie EVM contractueel moet leveren, is dit een compleet pakket zonder add-ons.

6. **Baselines en Claim Digger / Schedule Comparison.** Meerdere baselines per project plus een gestructureerde diff-functie tussen schedules. Dit maakt P6 tot het standaardinstrument bij claims en geschillen — het bewijsmateriaal is reproduceerbaar en de tegenpartij gebruikt hetzelfde gereedschap.

7. **Governance en beveiliging op enterprise-niveau.** OBS/EPS-gebaseerde autorisatie, global- en projectprofielen, Active Directory/LDAP, SSO via SAML 2.0, Oracle Access Manager/Shibboleth, Oracle Identity Manager (Tested Configurations v25, dec 2025). Dit is de reden dat overheden en defensie-opdrachtgevers het accepteren.

8. **Extreem lange, voorspelbare productlevenscyclus.** Elke jaarrelease krijgt **5 jaar Premier Support** en daarna **onbeperkt Sustaining Support** (Oracle Lifetime Support Policy, 02-07-2026). Release 25.x heeft Premier Support tot december 2030. Er is geen gedwongen migratie, geen "cloud-only vanaf datum X". Voor een 15-jarig infraprogramma is dat een reëel voordeel.

9. **Enorm ecosysteem en arbeidsmarkt.** Gecertificeerde planners, trainingsaanbieders, standaardboeken, consultancies, en een omvangrijke derde-partij-toolmarkt rond het XER-formaat (Deltek Acumen Fuse, Safran, ScheduleReader, Schedule Cleaner, Steelray, Synchro, Navisworks, Power BI-connectors). Je kunt in vrijwel elk land een ervaren P6-planner inhuren — dat geldt voor geen enkele concurrent.

10. **Breed integratie-oppervlak.** P6 EPPM REST API (release 25), SOAP Web Services met WS-Security/SAML, Primavera Gateway, gedocumenteerd databaseschema, en Cloud Connect voor de desktopclient. Bovendien bestaat er een volwassen open-source bibliotheek (**MPXJ**, LGPL) die XER, PMXML, P6-databases, P6 Web Services én Oracle Primavera Cloud kan lezen én XER/PMXML kan schrijven — waardoor integreren met P6 goedkoper is dan de licentieprijs doet vermoeden.

---

## 5. NADELEN

1. **Kosten, en vooral de kostenstructuur.** $3.880–$4.240 per named user perpetual, plus 22% per jaar, plus database, plus WebLogic, plus infra, plus implementatie, plus training. SelectHub meet dat **94% van de reviewers** hoge kosten voor upgrades en extra gebruikers als nadeel noemt. Capterra scoort *value for money* op 4,0 maar *ease of use* op 3,7. Het "Application User"-model is een **named user** — geen floating/concurrent optie — dus een planner die twee dagen per week plant kost evenveel als een fulltimer. TrustRadius: *"P6 is very costly for smaller companies to afford."*

2. **Steile leercurve, die niet overdreven is.** Rapportages spreken van ~40 uur begeleide training om productief te worden, en meerdere jaren tot echte beheersing. Planning Planet, over de volledige P6-generatie: *"Primavera is so complicated to use it takes most people a few years to understand what is going on inside it."* En: *"P6 has so many % complete options just to name a example, its mind bogling. Primavera should adopt KISS."* (28-10-2010). Voor incidentele gebruikers is P6 praktisch onbruikbaar zonder een planner ernaast.

3. **Verouderde en versplinterde UI.** Softwareconnect noemt als cons letterlijk *"Interface is a bit outdated"* en *"Primarily designed for Windows use"*. SelectHub: **83%+** van de reviewers meldt een niet-intuïtief ontwerp. Capterra's samengevatte cons noemen *"outdated interface design compared to modern competitors"* en *"limited recent feature development and innovation"*. Erger is de **versplintering**: P6 Professional (desktop) en P6 EPPM (web) hebben verschillende functiesets — Oracle's eigen vergelijkingsmatrix laat zien dat Project Home, Project Alerts, News Feed, Companies, Evaluation Matrix en Strategies alléén in de web-client zitten, en Job Services alléén in de clients. Gebruikers moeten twee tools leren.

4. **Windows-only desktop, zware IT-voetafdruk.** P6 Professional draait alleen op Windows (getest: Windows 11 64-bit) met .NET 4.6.2 en een Oracle DB-client; macOS en Linux vallen buiten de boot. *Correctie na verificatie: dit geldt voor de **desktopclient**, niet voor het hele product. De Tested Configurations v25 certificeert **macOS 15 met Safari 18.6+, Firefox 143+ en Chrome 139+** als browserplatform voor P6 EPPM, zónder de beperking "P6 Team Member Web only" die daar wél bij Windows 10, iOS 18 en Android-tablets staat. Een macOS-gebruiker kan dus volwaardig in P6 EPPM Web werken — alleen de diepe planners-workbench blijft Windows.* P6 EPPM vereist **Oracle WebLogic Server 14.1.2** en een Oracle- of SQL Server-database — dat is een serieuze middleware-stack met bijbehorende DBA- en applicatiebeheerkosten. Planera noemt als switch-reden expliciet *"complex IT requirements demanding Oracle/SQL databases and server infrastructure"*.

5. **De Java-erfenis is grotendeels weg — maar niet helemaal.** Positief nieuws voor Oracle: *"JRE (Java Runtime Environment) is not a requirement for P6 EPPM; it is requirement only for AutoVue"* (Tested Configurations v25, dec 2025). Maar: (a) server-side is P6 EPPM een WebLogic/Java-applicatie met bijbehorende patchcycli en Critical Patch Updates; (b) de documentviewer **AutoVue vereist nog steeds JRE 1.8.0_311** — een Java 8-runtime in 2026; (c) de historische browser-Java-applet-periode heeft in de markt langdurige reputatieschade veroorzaakt **[de applet-historie zelf is NIET GEVERIFIEERD met primaire bron in deze ronde]**.

6. **Kwantitatieve risicoanalyse is de facto opgegeven.** Primavera Risk Analysis staat sinds **maart 2010** op 8.7 en Premier Support liep af in **maart 2018** (Oracle Lifetime Support Policy, 02-07-2026) — terwijl het product nog steeds voor **$10.450 per gebruiker** wordt aangeboden (akimeng.com, 25-07-2026). Wie serieus Monte-Carlo wil doen, koopt Safran Risk of Deltek Acumen Risk. Dit is het duidelijkste voorbeeld van een verwaarloosd onderdeel van het portfolio.

7. **Rapportage dwingt iedereen naar Excel.** Vijftien jaar consistente klacht: *"the most important not improved is still the reporting we still throw the info into Excel anyway"* (Planning Planet, 28-10-2010) en *"most of current planner will just do all the updating/s-curve etc in Excel"* (11-01-2012). Fatsoenlijke BI vereist het apart gelicentieerde **Primavera Data Warehouse + Analytics** (in 2016 $25.000 per processor voor het warehouse alleen).

8. **XER als lek en fragiel uitwisselingsformaat.** XER is proprietary, kent **geen baselines**, en sleept bij import globale data mee (kalenders, activity codes, resources, UDF-definities) die de ontvangende database vervuilen. Er is een hele industrie van "XER-hygiëne"-tools ontstaan (Schedule Cleaner, ScheduleReader) juist omdat XER meer meeneemt dan de zender bedoelt — inclusief bedrijfsgevoelige tarieven en resourcenamen. Oracle's eigen documentatie waarschuwt bovendien dat XER *"can end up with partial commits of data"* en dat XER-import *"tries to insert work shifts, which can potentially corrupt your shift decisions"*, terwijl XML wél transactioneel terugrolt.

9. **Geen enkele BIM/IFC-ondersteuning — een structureel gat.** Geen IFC-import, geen IFC-export, geen IfcWorkSchedule/IfcTask, geen modelkoppeling. 4D vereist altijd een derde tool (Synchro, Navisworks) én een handmatige of regelgebaseerde koppelstap. In een markt die richting openBIM en IFC 4.3 beweegt (met name in Noord-Europese infra) is dit P6's grootste strategische zwakte.

10. **Vendor lock-in op meerdere assen tegelijk.** Proprietary bestandsformaat + Oracle-database + Oracle-middleware + Oracle-supportcontract + een arbeidsmarkt die op Oracle-certificering is gebouwd. Migreren weg van P6 betekent niet alleen data converteren, maar ook contractueel heronderhandelen met opdrachtgevers die XER eisen. SelectHub meet dat **66%** van de reviewers integraties beperkt en lastig vindt. De **P6 Integration API is bovendien deprecated sinds versie 16.1** en *"may be dropped in a future release"* (Tested Configurations v25) — wie daarop bouwde moet migreren.

11. **Kwaliteit en support krijgen structurele kritiek.** Planning Planet documenteert concrete regressies en rekenfouten over meerdere versies, waaronder een gedocumenteerde "1 minute error" bij milestone-koppelingen (verholpen in 6.2), problemen met resource levelling en met achtergrond-services. Een gebruiker met 23 jaar planningservaring: *"I find p6 plain awful to use, too many awkward and labour intensive steps to do anything, calendar issues and an annoying habit of loosing layouts."* Capterra's samenvatting noemt *"mixed customer support quality with occasional slow response times"*. Klassieke klacht over Oracle's supportmodel: *"the piss poor back up you get from the various country Primavera Branches"* (Planning Planet, 16-06-2008).

12. **Portfolioverwarring en een onduidelijke roadmap.** Oracle verkoopt tegelijk P6 EPPM, Oracle Primavera Cloud (OPC), Primavera Unifier, Primavera Portfolio Management en Aconex, met overlappende scopes. Oracle publiceert een migratiegids van P6 EPPM naar OPC, maar OPC mist aantoonbaar functies (project-specifieke codes en kalenders, top-down estimation, monitor thresholds, project alerts, external applications, evaluation matrix, strategies). Klanten moeten dus kiezen tussen het volwassen-maar-oude platform en het moderne-maar-incomplete platform. Oracle heeft geen einddatum voor P6 aangekondigd — 25.x heeft Premier Support tot dec 2030 — maar de investeringsrichting is zichtbaar cloudwaarts.

13. **Overkill voor kleine en middelgrote projecten.** TrustRadius: *"P6 may have a high level of entry to use for smaller projects, which can be a hindrance."* Planning Planet, over de kern van het probleem: *"This is the problems when programmer trying to be a planner. They just didn't understand the needs of planner or most of time overkill the programme."* (11-01-2012). En P6 ondersteunt Lean/Last-Planner-werkwijzen (pull planning, takt) niet — daarvoor zijn aparte tools (Touchplan, Outbuild, vPlanner, Planera) nodig.

---

## 6. Interoperabiliteit — *extra belangrijk voor een open-source, IFC-gebaseerde planner*

### 6.1 Ondersteunde bestandsformaten (geverifieerd, Oracle *Import/Export file formats*, docs.oracle.com, laatst gepubliceerd 30-11-2022)

| Formaat | Richting | Opmerkingen |
|---|---|---|
| **XER** (Primavera-eigen) | im/export | *"The Oracle proprietary format (XER) supports all project, resource, and role information developed using the P6 Professional or P6 EPPM suite."* Ondersteunt export tussen P6 5.0 en nieuwer. Ook Contractor-XER (v4.0+ import, v5.0/6.1+ export). |
| **P6 XML (PMXML)** | im/export | *"enables you to share project and baseline information between P6 Professional or P6 EPPM databases."* Industriestandaard-XML, Unicode, kan **baselines** en **PLF-layoutbestanden** meenemen. |
| **XLS** | im/export | Spreadsheet-uitwisseling. |
| **MPX** | im/export | Legacy Microsoft-formaat, ook gebruikt voor derde-partij-integratie. |
| **Microsoft Project XML (MSPDI)** | im/export | Getest met MS Project 2010/2013/2016 (im- én export) en 2019/2021 (alleen **import naar P6**) — Tested Configurations v25, dec 2025. |
| **UN/CEFACT Schema XML** | export | *"enable you to export information to organizations that require UN/CEFACT format, such as the Defense Contract Management Agency (DMCA)."* |
| **IFC / IFC 4.3** | **niet ondersteund** | **Geen IFC-import of -export in enige vorm. Geen IfcWorkSchedule, geen IfcTask, geen IfcWorkCalendar, geen IfcRelSequence.** |
| **MPP** (Microsoft Project native) | niet ondersteund | P6 leest géén .mpp; uitwisseling met MS Project loopt via MSPDI-XML of MPX. |

### 6.2 XER vs. P6 XML — de verschillen die ertoe doen

Oracle's eigen vergelijkingstabel (zelfde bron):

| Functionaliteit | XER | P6 XML |
|---|---|---|
| Dataformaat | proprietary | industriestandaard XML ✅ |
| Meerdere projecten in één bestand | ✅ | ✅ |
| **Baselines meenemen** | ❌ *"XER does not support the export of baselines"* | ✅ |
| Job Services (geplande export) | ✅ | ❌ |
| Beveiliging bij import | *"allows updates to all data if you have the Import XER privilege"* | *"always enforces individual user security settings"* ✅ |
| Exclusieve projecttoegang | ❌ shared | ✅ exclusive |
| Transactionele commit | ❌ *"can end up with partial commits of data"* | ✅ rollback bij fout |
| Work shifts | ❌ *"tries to insert work shifts, which can potentially corrupt your shift decisions"* | ✅ vervangt |
| Valuta in header | ✅ (XER definieert de valuta-eenheid in de header) | ❌ (moet aangenomen worden) |
| Laadsnelheid | sneller | trager |
| Unicode/meertaligheid | beperkt | ✅ |

**Conclusie voor een IFC-planner:** implementeer **beide**. XER voor maximale marktacceptatie (het is wat opdrachtgevers vragen) en PMXML voor betrouwbaarheid, baselines en Unicode.

### 6.3 API's en programmatische toegang

| Interface | Status | Details |
|---|---|---|
| **P6 EPPM REST API** | actueel (Release 25) | *"a flexible interface to P6 EPPM functionality based on the REST architectural style"*; HTTP/JSON; volledige endpointlijst gepubliceerd. |
| **P6 EPPM Web Services (SOAP)** | actueel (Release 25) | Contract-first WSDL, Document/Literal Wrapped, WS-Security UsernameToken (default), ook SAML-tokens of HTTP-cookies. Apart gelicentieerd ($500/user in de 2016-lijst, min. 10). |
| **P6 Integration API (Java)** | **deprecated sinds 16.1** | *"may be dropped in a future release"* (Tested Configurations v25). Niet meer op bouwen. |
| **Primavera Gateway** | **gecorrigeerd: niet "actueel" — laatste release 21.x (dec 2021), Premier Support eindigt dec 2026** | Integratiehub tussen P6, Unifier, EBS, e.d. In de 2016-lijst $20.000 (min. 5 users). De *Oracle Lifetime Support Policy* van 02-07-2026 kent als nieuwste Gateway-regel **21.x, GA dec 2021, Premier Support t/m dec 2026** — er is sindsdien geen jaarrelease meer opgenomen, terwijl P6 EPPM/Professional en Unifier wél tot en met 25.x doorlopen. Gateway is dus, net als Risk Analysis, een stilstaand onderdeel van het portfolio; de Tested Configurations v25 zegt slechts vaag "the tested version is the most recent version available". |
| **Directe DB-toegang** | mogelijk, risicovol | Schema is gedocumenteerd; lezen wordt breed gedaan (o.a. door MPXJ), schrijven is niet ondersteund. |
| **P6 Professional Cloud Connect** | actueel | Desktopclient tegen EPPM-database. **Niet ondersteund op SQL Server.** |
| **Oracle Primavera Cloud** | eigen REST-API | Importlimiet voor bestanden: **1 GB** (Oracle Primavera Cloud help, *Import P6 XML or XER Data*). |

### 6.4 De open-source route: MPXJ

Voor een open-source, IFC-gebaseerde planner is dit het belangrijkste praktische feit van dit hele profiel:

> **MPXJ** (https://www.mpxj.org/) is een **LGPL-2.1-or-later**-gelicentieerde bibliotheek (geverifieerd 25-07-2026: het `LICENSE`-bestand in de repository is *"GNU LESSER GENERAL PUBLIC LICENSE Version 2.1, February 1999"*, en de headers van de broncode zeggen *"either version 2.1 of the License, or (at your option) any later version"* — de "or later"-clausule is dus aanwezig, waardoor gebruik onder LGPL-3.0 is toegestaan) die project­planningen leest én schrijft. Geverifieerd van de projectsite op 25-07-2026:
> - **Lezen**: XER, PMXML, MPX, MPP, MSPDI, MPD, P3, SureTrak, Asta Powerproject/Easyplan, Phoenix, FastTrack, GanttProject, TurboProject, ConceptDraw, Synchro, Gantt Designer, SDEF, Sage 100 Schedule Grid, Project Commander, Deltek Open Plan BK3, Edraw EDPX — plus **P6-databases**, **P6 Web Services (EPPM)** en **Oracle Primavera Cloud**.
> - **Schrijven**: **XER**, **PMXML**, MPX, MSPDI, Planner, SDEF.
> - Talen: Java (native), .NET (via IKVM), Ruby (gem), Python (wrapper).
> - Bevat expliciet ondersteuning voor **Baselines**, **Calendars**, **CPM Schedulers** en **Timephased Data**.

LGPL-2.1-**or-later** is daarmee compatibel met de LGPL-3.0-licentie van Open Planner Studio (bij een LGPL-2.1-*only*-bibliotheek was dat niet zo geweest; die nuance ontbrak in de eerste versie van dit profiel). MPXJ kan dienen als (a) referentie-implementatie voor de XER/PMXML-semantiek, (b) test-orakel om je eigen parser tegen te valideren, of (c) — in een Java/Node-sidecar — als daadwerkelijke conversielaag.

### 6.5 Mapping P6 ↔ IFC 4.3 — wat vertaalt en wat niet

Omdat P6 geen IFC kent, moet de vertaling volledig aan de IFC-kant gebouwd worden. Onderstaande mapping is mijn eigen analyse **[SCHATTING/ONTWERPVOORSTEL, geen bestaande standaard]**, gebaseerd op de IFC4/4.3-entiteiten en de P6-datamodelbegrippen:

| P6-begrip | IFC 4.3-equivalent | Wrijving |
|---|---|---|
| Project | `IfcWorkSchedule` (PlannedWorkSchedule / ActualWorkSchedule), gegroepeerd onder `IfcWorkPlan` | P6's EPS-hiërarchie heeft geen directe IFC-tegenhanger; te modelleren als geneste `IfcWorkPlan` |
| Activity | `IfcTask` + `IfcTaskTime` | Redelijk direct |
| Activity ID / Name | `IfcTask.Identification` / `.Name` | Direct |
| Early/Late Start & Finish, Total Float, Free Float, Critical flag | `IfcTaskTime.EarlyStart/EarlyFinish/LateStart/LateFinish/TotalFloat/FreeFloat/IsCritical` | **Goede dekking** — IFC's taskTime is expliciet CPM-bewust |
| Actual Start/Finish, Remaining Duration, % Complete | `IfcTaskTime.ActualStart/ActualFinish/RemainingTime/Completion` | Goede dekking; P6's drie %-complete-types (Duration/Units/Physical) verliezen hun onderscheid |
| Relationship (FS/SS/FF/SF) + Lag | `IfcRelSequence` met `SequenceType` (FINISH_START, START_START, FINISH_FINISH, START_FINISH) + `TimeLag` (`IfcLagTime`, DurationType WORKTIME/ELAPSEDTIME) | **Goede dekking**, inclusief het onderscheid werkdagen/kalenderdagen |
| Calendar (Global/Resource/Project) | `IfcWorkCalendar` met `IfcWorkTime` + recurrence patterns, exception times | Redelijk; P6's *lag-kalenderkeuze* (predecessor/successor/24u/project) heeft **geen IFC-equivalent** |
| Resource + Role | `IfcConstructionResource`-subtypen (`IfcLaborResource`, `IfcConstructionEquipmentResource`, `IfcConstructionMaterialResource`), `IfcResourceTime` | Rollen/proficiency, vijf tarieftypen en resource curves hebben **geen IFC-equivalent** → `IfcPropertySet` |
| WBS | `IfcTask` met `IsNestedBy`/`IfcRelNests`, of `IfcWorkSchedule`-groepering | Werkt, maar P6's WBS-samenvattingsvelden moeten herberekend worden |
| Activity Codes, UDFs, Notebooks, Steps | **geen equivalent** → `IfcPropertySet`/`IfcPropertySingleValue` op de `IfcTask` | Verliesgevoelig; vereist een eigen conventie |
| Constraints (9 typen) | **geen equivalent** in IFC | Alleen via property sets |
| Baselines | **geen equivalent** — IFC kent wel `IfcWorkSchedule` met PredefinedType `BASELINE` | Bruikbaar, maar de round-trip via XER gaat sowieso verloren (XER draagt geen baselines) |
| Costs / EVM | `IfcCostSchedule`/`IfcCostItem` | Bestaat, maar wordt door vrijwel geen tool ondersteund; semantische afstand tot P6's kostmodel is groot |
| Geometrie / modelkoppeling | `IfcRelAssignsToProcess` (task ↔ product) | **Dit is precies het gat dat P6 niet kan vullen — en dus jullie strategische kans** |

**Praktisch advies voor Open Planner Studio:**
1. Bouw **XER-lezen** eerst (grootste netwerkeffect: dat is wat mensen aanleveren), daarna **XER-schrijven**, daarna **PMXML beide richtingen** (voor baselines).
2. Valideer tegen **MPXJ** als test-orakel — en overweeg MPXJ's XER-parser als referentie voor de vele ongedocumenteerde randgevallen (XER heeft geen officiële Oracle-specificatie; PMXML wel een XSD).
3. Modelleer de IFC-kant zó dat een P6-import **niets weggooit**: alles wat geen IFC-equivalent heeft (activity codes, UDF's, constraints, calendar-lag-instellingen, %-complete-type) hoort in een consistent `IfcPropertySet`-schema, zodat een export-terug-naar-XER verliesvrij is. Dat is de enige manier om te concurreren met "gewoon P6 gebruiken".
4. Het IFC-voordeel dat P6 structureel níet kan bieden is `IfcRelAssignsToProcess`: taak ↔ modelobject in één bestand, zonder Synchro/Navisworks ertussen. Dat is de propositie.

---

## 7. Marktpositie

### 7.1 Waar het sterk staat, en waarom

P6 domineert daar waar **vier condities** samenkomen:
1. **Contractueel afdwingbare planning** — waar het programma bewijsmateriaal is (claims, EOT, delay-analyse).
2. **Zeer grote, langlopende, resource-intensieve projecten** — waar het kalender- en resourcemodel echt nodig is.
3. **Multi-partij-ketens** — waar hoofdaannemer, opdrachtgever en onderaannemers hetzelfde formaat moeten uitwisselen (XER als lingua franca).
4. **Formele EVM/rapportageverplichtingen** — vooral bij (Amerikaanse) overheids- en defensieopdrachten.

Sectoren: grote infra (spoor, tunnels, luchthavens, water), EPC olie & gas / petrochemie, nucleair en energie, mijnbouw, defensie & aerospace, scheepsbouw, utilities, farma-capex, grote gebouwde omgeving.

### 7.2 Belangrijkste concurrenten

| Categorie | Concurrenten | Positionering t.o.v. P6 |
|---|---|---|
| **Directe CPM-tegenhangers** | **Asta Powerproject** (Elecosoft) — *"matches P6's CPM depth for heavy civil work"*, dominant in de Britse bouw; **Deltek Open Plan / Acumen**; **Safran Project & Safran Risk** (sterk in olie & gas/Noorwegen); **Spider Project** | Vergelijkbare diepte, vaak vriendelijker UI en licentiemodel |
| **Volume-speler** | **Microsoft Project / Project Online** — genoemd als *"handles 80% of commercial construction scheduling at $55/user/month"* **[cijfer NIET GEVERIFIEERD; afkomstig van een aanbieder van een alternatief]** | Goedkoper, breder bekend, minder diep |
| **4D/BIM** | **Bentley Synchro 4D**, **Autodesk Navisworks**, Trimble/Tekla | Complementair vandaag, substituut morgen |
| **Lean / pull planning** | **Touchplan**, **Outbuild**, **Nialli**, **Planera**, **Hoylu**, vPlanner | Vullen precies het gat waar P6 niets biedt |
| **PPM-enterprise** | **Planview**, **Planisware**, **ServiceNow SPM**, **Clarizen/AdaptiveWork**, **Celoxis**, **Daptiv**, **OpenText PPM**, **InEight Schedule** | Concurreren op portfolio-laag, niet op scheduling-diepte |
| **Open source** | **OpenProject**, **GanttProject**, **ProjectLibre**, Redmine — door AlternativeTo genoemd als de belangrijkste gratis alternatieven | Geen serieuze CPM-diepte; geen IFC — **hier zit de opening voor Open Planner Studio** |
| **Oracle zelf** | **Oracle Primavera Cloud (OPC)** | Oracle's eigen kannibaal |

### 7.3 Trend

**Beoordeling: stabiel-tot-licht-krimpend in nieuwe verkoop, zeer stabiel in installed base. [SCHATTING op basis van onderstaande signalen — geen marktaandeelcijfers gevonden]**

Signalen richting *stabiel/sterk*:
- Actieve jaarlijkse releases (25.12 dec 2025; 26.x in 2026) met 5 jaar Premier Support tot dec 2030.
- Oracle blijft de on-premises P6 EPPM-stack certificeren tegen de nieuwste WebLogic, Oracle DB 23 en Windows 2025.
- Contractuele verankering en XER-netwerkeffect zijn extreem plakkerig.
- Gartner Peer Insights en Capterra tonen nog altijd hoge scores (Capterra 4,4/5, 182 reviews; SelectHub 84% over 371 reviews).

Signalen richting *krimpend*:
- Verwaarlozing van onderdelen: Primavera Risk Analysis staat stil sinds 2010; Instantis EnterpriseTrack sinds 2017; P6 Integration API deprecated sinds 16.1.
- Capterra's samengevatte cons noemen expliciet *"limited recent feature development and innovation"*.
- Oracle's eigen investeringsrichting gaat naar Oracle Primavera Cloud en het "Smart Construction Platform" (Aconex, Unifier), niet naar P6 EPPM.
- Een golf van nieuwe aanbieders positioneert zich expliciet als "weg van P6": *"Many teams find Primavera P6 too complex, expensive, and slow to adopt for daily use. Long training times, high costs, and legacy workflows drive demand for simpler, modern alternatives."* (planera.io, geraadpleegd 25-07-2026).
- De markt voor bouwproject­managementsoftware groeit hard ($2,95 mld in 2025 → $7,32 mld in 2032 volgens een door Planera geciteerde marktraming **[NIET GEVERIFIEERD, secundaire bron]**) — die groei landt grotendeels bij nieuwe, cloud-native spelers, niet bij P6.

### 7.4 Opvallende klanten en verplichtstellingen

- **Door Oracle zelf genoemd** (oracle.com/construction-engineering/primavera-p6/, geraadpleegd 25-07-2026): **ITER** (internationale kernfusiereactor), **Assystem**, **Clayco**, **Swinerton**, **Alectra Utilities**.
- **Verplichtstellingen**: het is breed gerapporteerd dat Amerikaanse federale opdrachtgevers (US Army Corps of Engineers, diverse state DOT's) en veel internationale EPC-contracten oplevering van het programma in P6/XER-formaat contractueel voorschrijven. Oracle's ondersteuning van **UN/CEFACT-XML "for organizations that require UN/CEFACT format, such as the Defense Contract Management Agency"** is een direct, geverifieerd bewijs van die verankering in de Amerikaanse defensie-inkoop. De bredere lijst van specifieke opdrachtgevers is **[NIET GEVERIFIEERD in deze ronde]**.
- Een aangehaald voorbeeld uit onderzoek naar overheidsadoptie: South Dakota DOT vond de leercurve steil bij invoering **[secundaire bron]**.

---

## 8. Eindoordeel

### Voor wie is Primavera P6 de juiste keuze?

**Ja, kies P6 als:**
- Je opdrachtgever of contract **XER/P6 voorschrijft**. Dan is de discussie voorbij — dit is een toegangsvoorwaarde, geen tooling-keuze.
- Je werkt aan **grote infra, EPC, nucleair, defensie of mijnbouw** met tienduizenden activiteiten, complexe ploegen-/shutdown-kalenders en meerjarige looptijden.
- Je moet **formele EVM** leveren of **delay claims** kunnen onderbouwen. De combinatie van baselines, Claim Digger, gedocumenteerde CPM-semantiek en juridische acceptatie is nergens anders zo compleet.
- Je hebt **meerdere tientallen planners** en een echte project-controls-afdeling met eigen beheer- en DBA-capaciteit. De vaste kosten worden dan verteerbaar per gebruiker.
- Je wilt een platform met **gegarandeerde support tot ver in de jaren '30** en geen gedwongen migratiepad.

**Nee, kies geen P6 als:**
- Je projecten **< ~1.000 activiteiten** hebben of korter dan een jaar duren. Dan betaal je voor complexiteit die je actief tegenwerkt.
- Je team **geen fulltime planner** heeft. P6 zonder specialist is een gegarandeerd mislukte investering — de leercurve is reëel, niet marketing van trainingsaanbieders.
- Je op **macOS of Linux** werkt **en je planners de desktopclient nodig hebben**. P6 Professional is Windows-only en dat verandert niet. (Wél genuanceerd: P6 EPPM Web is op macOS 15 volledig gecertificeerd — zie §5.4.)
- **BIM/IFC centraal staat** in je proces. P6 heeft er letterlijk niets voor; je betaalt dan voor een tool die je toch met Synchro of Navisworks moet aanvullen.
- Je **Lean/Last Planner/takt-planning** doet. P6 ondersteunt dat niet; Touchplan/Outbuild/Planera wel.
- **Kwantitatieve risicoanalyse** je kernbehoefte is. Oracle's Monte-Carlo-product staat sinds 2010 stil en kost $10.450 per gebruiker; koop Safran Risk of Acumen Risk.
- Je een **klein of middelgroot bedrijf** bent zonder Oracle-relatie. De TCO (2–3× licentiekosten) en het named-user-model straffen deeltijdgebruikers hard af.

### Wat dit betekent voor een open-source, IFC-gebaseerde planner

P6 is niet aan te vallen op **CPM-diepte**, **enterprise-governance** of **arbeidsmarkt**. Dat is verloren terrein en dat hoeft ook niet gewonnen te worden.

P6 is wél aan te vallen op precies vier assen, en die vier vallen samen met wat Open Planner Studio al is:
1. **IFC-native persistentie** — P6 heeft nul IFC. Een planner waarin `IfcTask` en `IfcRelSequence` het bronformaat zijn en waarin taak↔modelobject via `IfcRelAssignsToProcess` in één bestand leeft, doet iets dat P6 architectonisch niet kan.
2. **Kosten** — $3.880 per named user plus 22% per jaar, tegenover nul.
3. **Platform** — browser en desktop, alle OS'en, tegenover Windows-only + WebLogic + Oracle DB.
4. **Toegankelijkheid** — de leercurve van P6 is de meest consistente klacht in twintig jaar forumhistorie.

De **voorwaarde** om die assen te kunnen benutten is compatibiliteit: **XER lezen en schrijven, PMXML lezen en schrijven, verliesvrij**. Zonder dat is een IFC-planner een eiland in een XER-wereld. Met dat, is de IFC-native architectuur een echt onderscheidend voordeel in plaats van een academisch punt. MPXJ (LGPL) maakt die stap aanzienlijk goedkoper dan hij lijkt.

---

## 9. Bronnenlijst

Alle URL's geraadpleegd op **25 juli 2026**.

### Primaire bronnen (Oracle)

1. **Oracle Construction & Engineering Global Price List — Software Investment Guide**, 10 november 2016 (Texas DIR, Oracle DIR-TSO-2539). PDF, volledig tekstueel geëxtraheerd. — https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf
2. **Oracle Lifetime Support Policy — Oracle Applications**, effective date 2 juli 2026 (98 pagina's; sectie "Oracle Primavera Releases", pp. 66–67). PDF. — https://www.oracle.com/us/support/library/lifetime-support-applications-069216.pdf
3. **Oracle Primavera P6 EPPM Tested Configurations, Version 25**, december 2025. PDF. — https://docs.oracle.com/cd/G18294_01/English/tested_configurations/p6_eppm_tested_config.pdf
4. **Primavera P6 Enterprise Project Portfolio Management** (productpagina). — https://www.oracle.com/construction-engineering/primavera-p6/
5. **Import/Export file formats** (P6 Professional documentatie, laatst gepubliceerd 30-11-2022). — https://docs.oracle.com/cd/F25600_01/English/admin/p6_pro_importing_exporting/import_export_file_formats.htm
6. **P6 vs. Primavera Cloud — A Quick Reference / Projects** (P6 EPPM to Primavera Cloud Migration Guide). — https://docs.oracle.com/cd/E80480_01/English/admin/p6_eppm_migration_guide/246407.htm en .../246421.htm
7. **P6 EPPM REST API Release 25 — About the REST APIs**. — https://docs.oracle.com/cd/G18294_01/English/Integration_Documentation/rest_api/index.html
8. **Oracle Primavera P6 EPPM Web Services Programming Guide, Version 25**. — https://docs.oracle.com/cd/G18294_01/English/Integration_Documentation/p6_eppm_web_services_programming/34301.htm
9. **Welcome to the P6 EPPM User and Integration Library** (laatst gepubliceerd 12-12-2025). — https://docs.oracle.com/cd/G18294_01/index.htm
10. **Primavera P6 Professional — Get Started** (documentatiebibliotheken 6.2.1 t/m 26). — https://docs.oracle.com/en/industries/construction-engineering/primavera-p6-professional/index.html
11. **Primavera P6 EPPM — Get Started** (documentatiebibliotheken t/m 26). — https://docs.oracle.com/en/industries/construction-engineering/primavera-p6-project/index.html
12. **Import P6 XML or XER Data into Oracle Primavera Cloud** (1 GB importlimiet). — https://primavera.oraclecloud.com/help/en/user/191098.htm
13. **Slow Performance in P6 Professional Standalone System Using a SQLite Database** (Oracle Support KB 1968393.1) en **P6 Professional Standalone Operations ... Slow When Using a Standalone SQLite Database** (KB 2046651.1).

13b. **Oracle E-Business Suite Applications Global Price List**, 6 november 2025 (15 p., volledig tekstueel geëxtraheerd; bevat nul treffers op "Primavera" en bevestigt het staande 22%-SULS-tarief). — https://www.oracle.com/us/corporate/pricing/applications-price-list-070574.pdf
13c. **Oracle Price Lists (index)** — twintig actuele prijslijsten, geen enkele voor Primavera/Construction & Engineering. — https://www.oracle.com/corporate/pricing/
13d. **Oracle Construction and Engineering — documentatie-index** (actuele productlijst: P6 EPPM, P6 Professional, Primavera Cloud, Gateway, Unifier, Analytics, Portfolio Management, Aconex, **Crystal Ball**; Primavera Risk Analysis ontbreekt). — https://docs.oracle.com/en/industries/construction-engineering/index.html
13e. **P6 Professional 26 Documentation Library** (bevestigt het bestaan van release 26; omschrijft P6 Professional als "built on Oracle and Microsoft SQL Server relational databases"). — https://docs.oracle.com/cd/G48902_01/index.htm
13f. **MPXJ-licentiebestand en broncodeheader** (LGPL 2.1 "or any later version"). — https://raw.githubusercontent.com/joniles/mpxj/master/LICENSE

### Prijsbronnen (partners en resellers)

14. **AKIM Engineering — Oracle Primavera Software License Price List** (© 2026). P6 Professional $3.880 / P6 Enterprise $4.240 / Risk Analysis $10.450 / Progress Reporter $1.460, per Application User, perpetual, excl. support. — https://www.akimeng.com/oracle-primavera-price-list.html
15. **Global PM — Primavera P6 Professional Project Management Rel. 25.12**, $3.880,00. — https://globalpm.com/product/oracle-primavera-p6-professional/
16. **CDP Inc. — Purchase Oracle Primavera Cloud (5-users)**, $7.800 basispakket ($130/gebruiker/maand), extra licenties $1.560/jaar (© 2025). — https://cdp-inc.com/products/software/purchase-oracle-primavera-cloud-5-users
17. **Primavera Scheduling — Buy Primavera Software** ("starts at $3.500" perpetual). — https://primaverascheduling.com/home/buy-primavera-software/
18. **Michelle M., "Primavera P6 Cost: Understanding License vs Subscription Models"**, projectmanagertemplate.com, 27 oktober 2025 (bijgewerkt 14 februari 2026). Verzamelt Taradigm-, Compass Consult- en Oracle-cijfers; bevestigt 22%-supportregel en TCO 2–3×. — https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models
19. **Ten Six Consulting — How Much Does Primavera P6 Cost?** (bevestigt SaaS per user/month en de 25-gebruikersdrempel). — https://tensix.com/how-much-does-primavera-p6-cost/

### Reviews en gebruikerservaringen

20. **Capterra — Oracle Primavera**: 4,4/5 over 182 reviews; ease of use 3,7; features 4,4; customer service 4,0; value for money 4,0; sentiment 91% positief. Cons: steep learning curve, outdated interface, high cost, mixed support, *"limited recent feature development and innovation"*. — https://www.capterra.com/p/145503/Oracle-Primavera/
21. **SelectHub — Primavera P6**: 84% tevredenheid over 371 reviews; scheduling management 97% positief; UI 83%+ negatief; licentiemodel/kosten 94% negatief; integraties 66% negatief; startprijs $3.168/gebruiker/jaar. — https://www.selecthub.com/ppm-software/primavera-p6/
22. **Software Connect — Oracle Primavera P6 EPPM**: doelgroep, features, pricing ($2.750 perpetual / $605 onderhoud), cons *"steep learning curve"*, *"interface is a bit outdated"*, *"primarily designed for Windows use"*; drie gebruikersreviews (2018, 2019, 2021). — https://softwareconnect.com/reviews/oracle-primavera-p6-eppm/
23. **Gartner Peer Insights — Primavera P6 Enterprise Project Portfolio Management** (pagina geeft 403 op geautomatiseerde toegang; product- en alternatievenlijst wel geïndexeerd). — https://www.gartner.com/reviews/market/project-portfolio-management-worldwide/vendor/oracle/product/primavera-p6-enterprise-project-portfolio-management
24. **TrustRadius — Oracle Primavera** (via zoekresultaatsamenvatting; directe toegang 403). Pros: *"can manage large project schedules regardless of complexity"*. Cons: *"not as intuitive as other scheduling software"*, *"very costly for smaller companies"*, *"high level of entry to use for smaller projects"*.

### Vakfora

25. **Planning Planet — "What is the biggest problem in P6"** (draad gestart 10-06-2008, doorlopend). Bevat o.a. de klachten over supportkwaliteit, gedwongen versiewisselingen en trainingsdruk. — https://planningplanet.com/forums/primavera-version-pm5-pm6/417788/what-biggest-problem-p6
26. **Planning Planet — "P3 versus P6 What are your views?"** (2008–2012). Bevat o.a. *"I have been planning for 23 years and I find p6 plain awful to use..."* (stuart waller, 28-10-2010), *"the most important not improved is still the reporting we still throw the info into Excel anyway"* (Joel Gilbert, 28-10-2010), *"most of current planner will just do all the updating/s-curve etc in Excel"* (Mohd Shahimi Yang Hapizi, 11-01-2012), *"P6 is currently too complex for the company environments it operates in"* (Oliver Melling, 19-08-2008). — https://planningplanet.com/forums/planning-scheduling-programming-discussion/418139/p3-versus-p6-what-are-your-views
27. **Planning Planet — "Primavera Grumbles!!"**, **"P6 version 7 - major bug!"**, **"Primavera Problems: Loading issues"** (bugs, "1 minute error", resource-levelling-kritiek). — https://planningplanet.com/forums/primavera-version-pm5-pm6/

### Interoperabiliteit / open source / BIM

28. **MPXJ** — LGPL-bibliotheek voor het lezen/schrijven van planningsformaten (o.a. XER en PMXML lezen én schrijven; P6-databases, P6 Web Services en Oracle Primavera Cloud lezen). — https://www.mpxj.org/
29. **Ten Six — Primavera P6 XML Files: The Future Of P6 Import/Export** (XER vs. XML: baselines, valuta, Unicode, snelheid). — https://tensix.com/primavera-p6-and-xml-format-data-files/
30. **Plan Academy — Understanding Primavera XER Files**. — https://www.planacademy.com/understanding-primavera-xer-files/
31. **MDPI Engineering Proceedings — AI-Driven Semantic Framework for Automated Construction Planning and Scheduling with BIM and Digital Twin Integration** (over de kloof tussen BIM-platforms en P6, en de beperkte praktische implementatie van IfcTask/IfcWorkSchedule). — https://www.mdpi.com/2673-4591/112/1/3
32. **OSArch community — "Any IFC software that is capable of 4D out there in the wild?"** (IfcOpenShell Ifc4D naar P6/Asta/MS Project; Synchro's IFC2X3-ondersteuning). Directe toegang 403; inhoud via zoekindex. — https://community.osarch.org/discussion/1132/

### Markt en alternatieven

33. **Planera — Top 10 Primavera P6 Alternatives** (redenen om weg te gaan: leercurve, implementatietijd, kosten, IT-eisen, gebrek aan mid-size workflows). — https://www.planera.io/post/primavera-p6-alternatives
34. **AlternativeTo — Oracle Primavera Alternatives** (25+ alternatieven; Redmine, OpenProject, GanttProject, Microsoft Project). — https://alternativeto.net/software/oracle-primavera/
35. **ConstructionBids.ai — Best Oracle Primavera P6 Alternatives (2026)** (marktomvang $2,95 mld 2025 → $7,32 mld 2032; Asta Powerproject als CPM-gelijke). — https://constructionbids.ai/blog/oracle-primavera-alternative-construction
36. **Project P — "Cloud or Classic: OPC vs. P6 EPPM—Which One is Right For Me?"**, 17 april 2025. — https://www.projectp.com/ppblog/2025/04/17/cloud-or-classic-opc-vs-p6-eppm-which-one-is-right-for-me/
37. **CMC Project Solutions — Oracle Primavera Cloud vs. Primavera P6 EPPM** (modulaire subscription vs. hogere minimum-commitments van P6). — https://www.cmcprojectsolutions.com/posts/oracle-primavera-cloud-vs-primavera-p6-eppm-key-differences-and-business-benefits/

---

## 10. Onderzoeksbeperkingen

Eerlijkheid over wat dit profiel *niet* heeft kunnen vaststellen:

1. **Reddit was ontoegankelijk.** Zowel de Reddit-API (HTTP 403) als de zoekmachine-toegang tot reddit.com waren geblokkeerd voor de gebruikte user agent. De gevraagde bronnen r/projectmanagement, r/construction en r/civilengineering ontbreken daarom. Als vervanging heb ik **Planning Planet** gebruikt — dat is voor planners inhoudelijk de relevantere community, maar de aangehaalde draden zijn overwegend uit 2008–2013. Recentere community-sentimenten komen in dit profiel uit Capterra, SelectHub en Software Connect.
2. **G2, TrustRadius, ITQlick, Gartner Peer Insights en Capterra blokkeerden directe scraping** (403 / Cloudflare). Capterra-cijfers zijn via een tweede kanaal wél verkregen; TrustRadius- en Gartner-inhoud alleen via zoekindexsamenvattingen.
3. **Oracle publiceert geen actuele prijslijst.** De enige volledig uitleesbare officiële Oracle-prijslijst is die van **10 november 2016**. Alle 2026-bedragen komen van Oracle-partners/resellers. Ik heb géén bevestiging kunnen vinden van de in één zoekresultaat genoemde "prijsverhoging per 17 juni 2025" — behandel die claim als **onbevestigd**.
4. **Kolomuitlijning in de 2016-prijslijst** ging bij tekstextractie deels verloren. De P6-regels zijn onafhankelijk gecontroleerd; de overige regels zijn door mij uit de productvolgorde afgeleid.
5. **Geen harde marktaandeelcijfers gevonden** voor P6 versus concurrenten. De trendbeoordeling in §7.3 is mijn eigen synthese van geverifieerde productlevenscyclus-feiten en secundaire signalen, expliciet gemarkeerd als schatting.
6. **Zoekbudget uitgeput.** De sessie heeft haar WebSearch-limiet bereikt tijdens het onderzoek; de laatste vragen (Primavera Risk Analysis-opvolging, historische Java-applet-onderbouwing) zijn beantwoord via directe documentophaling in plaats van zoekopdrachten, of gemarkeerd als niet-geverifieerd.

---

## 11. Verificatie

**Adversariële fact-check uitgevoerd op 25 juli 2026.** Opzet: van elke onderstaande bewering is geprobeerd haar te **weerleggen** met een onafhankelijke of primaire bron, bij voorkeur een andere dan de bron waarop het profiel zich oorspronkelijk baseerde. De Oracle-PDF's zijn niet via een samenvattende leeslaag beoordeeld maar lokaal opgehaald en met `pypdf` volledig tekstueel geëxtraheerd, zodat cijfers letterlijk gecontroleerd konden worden. WebSearch was in deze ronde niet beschikbaar (sessielimiet bereikt); alle verificatie liep via directe documentophaling.

### 11.1 Prijs- en licentiebeweringen

| # | Bewering | Oordeel | Onderbouwing / bron |
|---|---|---|---|
| 1 | Oracle 2016-lijstprijzen: P6 EPPM $2.750/$605, P6 Professional $2.500/$550, Progress Reporter $950/$209, Risk Analysis $9.500/$2.090, EVM $10.000/$2.200, Analytics $2.000/$440 (min. 25), Portfolio Mgmt $2.900/$638 (min. 50), Unifier Project Controls $3.950/$869 (min. 25), Data Warehouse $25.000/$5.500 per **Processor**, P6 EPPM Web Services $500/$110 (min. 10), Gateway $20.000/$4.400 (min. 5) | **bevestigd** — alle 19 regels letterlijk, inclusief metriek en minima. De eerdere kanttekening "[SCHATTING van de kolomtoewijzing]" is hiermee komen te vervallen (§3.1 aangepast). | https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf (5 p., volledige tekstextractie) |
| 2 | Term-licenties: 1 jr 20%, 2 jr 35%, 3 jr 50%, 4 jr 60%, 5 jr 70% van list, plus 22% support over de **volle** perpetual prijs | **bevestigd**, letterlijk: *"Annual terms licenses are available from 1 to 5 years: 1 year - 20% of list; 2 year - 35% of list, 3 year - 50% of list, 4 year 60% of list and 5 year 70% of list. The list support price for term licenses is 22% of the list perpetual license fee… The term license percentages are not applied to the list support price."* | idem |
| 3 | "SULS = 22% van de lijstprijs is **letterlijk** vastgelegd in Oracle's prijslijst" | **gecorrigeerd (precisering)** — het letterlijke 22%-getal staat in de *term*-licentie-alinea; voor perpetual volgt het uit de tabelverhoudingen. Wél sterker onderbouwd dan eerst: 22% is aantoonbaar nog steeds Oracle's staande tarief in november 2025 (bv. $5.795 licentie → $1.274,90 support = 22,000%). | *Oracle E-Business Suite Applications Global Price List*, 6-11-2025 — https://www.oracle.com/us/corporate/pricing/applications-price-list-070574.pdf |
| 4 | "Application User" = named user; **geen** floating/concurrent optie voor Primavera | **bevestigd** — definitie letterlijk teruggevonden (*"…regardless of whether the individual is actively using the programs at any given time"*); in het hele document komt geen concurrent-/floating-metriek voor. Precisering aangebracht: naast Application User en Processor bestaan ook Employee / UPK Developer / UPK Module, maar uitsluitend voor de trainingsproducten. | idem als #1 |
| 5 | Cloud 2016: P6 EPPM Cloud $125 p/mnd per Hosted Named User met **minimum 25**, Progress Reporter Cloud $12, EPPM Web Services Cloud $20, Virtual Desktop $1.000 per Hosted Environment, Unifier Project Controls Cloud $150 (min. 25), Analytics Cloud $90 (min. 25) | **bevestigd**, alle zes letterlijk incl. minima. Onafhankelijk ondersteund door Ten Six: *"You may find that Oracle won't offer this to businesses with fewer than 25 users."* | idem als #1; https://tensix.com/how-much-does-primavera-p6-cost/ |
| 6 | Actuele partnerprijzen: P6 Professional **$3.880**, P6 EPPM **$4.240**, Risk Analysis **$10.450**, Progress Reporter **$1.460** — per Application User, perpetual, excl. support | **bevestigd op de bron zelf** (alle vier bedragen plus de attributen "Application User / Perpetual / support not included / © 2026" staan er letterlijk), **maar met nieuwe waarschuwing**: de tweede bron viel weg (zie #7) en de opslag t.o.v. 2016 is intern inconsistent — P6 Pro +55,2%, EPPM +54,2%, Progress Reporter +53,7%, maar Risk Analysis slechts +10,0%. De PRA-prijs is daarom **onzeker** verklaard in §3.2. | https://www.akimeng.com/oracle-primavera-price-list.html |
| 7 | globalpm.com noemt exact $3.880,00 voor P6 Professional Rel. 25.12 | **onzeker** — bij herverificatie leverde de pagina (en globalpm.com/shop/) geen leesbare inhoud op; de corroboratie is niet reproduceerbaar. In §3.2 als zodanig gemarkeerd. | https://globalpm.com/product/oracle-primavera-p6-professional/ (niet reproduceerbaar 25-07-2026) |
| 8 | Alternatieve partnerprijs "starts at $3.500" perpetual | **bevestigd**, letterlijk: *"Primavera software starts at $3,500 for a perpetual license."* Ondersteunt de ordegrootte van #6, maar niet het exacte bedrag $3.880. | https://primaverascheduling.com/home/buy-primavera-software/ |
| 9 | OPC: 5-user starterpack **$7.800/jaar** (= $130 p/gebruiker p/maand), extra licenties **$1.560/jaar** | **bevestigd**, letterlijk "$7,800.00", "$130/month/user", "$1,560/year each", footer "© 2025 CDP, Inc." | https://cdp-inc.com/products/software/purchase-oracle-primavera-cloud-5-users |
| 10 | SelectHub: "vanaf $3.168 per gebruiker per jaar", range $5.000–$15.000/gebruiker/jaar on-prem; 84% over 371 reviews | **bevestigd**, letterlijk: *"Primavera P6 pricing starts at $3,168 (Per User, Annually)"* en *"between $5,000 and $15,000 per user per year for an on-premises license"*; 371 reviews / 84%. | https://www.selecthub.com/ppm-software/primavera-p6/ |
| 11 | Oracle publiceert sinds ~2016 **geen** openbare Primavera-prijslijst meer | **bevestigd, en sterker dan eerst** — Oracle's actuele prijslijst-index bevat twintig prijslijsten, geen enkele voor Primavera/Construction & Engineering; de meest recente Applications-lijst (6-11-2025) bevat bij volledige tekstextractie **nul** treffers op "Primavera". Ook Oracle Store (shop.oracle.com) toont wel een categorielink "Primavera" maar geen productprijzen (foutpagina). | https://www.oracle.com/corporate/pricing/ ; applications-price-list-070574.pdf |
| 12 | Rekenvoorbeelden: SULS ≈ $854 (P6 Pro) / $933 (EPPM) / $2.299 (PRA); 1-jarige term ≈ $1.630/gebruiker/jaar | **bevestigd als rekenkundig correct** (0,22 × 3.880 = 853,6; 0,20 × 3.880 + 0,22 × 3.880 = 1.629,6), **maar blijft een dubbele extrapolatie**: het 22%- en 20%-tarief komen uit 2016 en worden toegepast op een partnerprijs van 2026. De [SCHATTING]-markering is terecht en blijft staan. | eigen herberekening op #2 en #6 |
| 13 | Capterra: 4,4/5 over 182 reviews; ease of use 3,7; features 4,4; support 4,0; value 4,0; startprijs "$100 per year" (verdacht) | **bevestigd**, alle cijfers exact, inclusief "91% positive, 7% neutral, 2% negative". De $100/jaar staat er inderdaad en blijft onbetrouwbaar. Kleine kanttekening: de listing dekt "Oracle Primavera" als geheel (de opgehaalde pagina presenteert zich deels als *Oracle Primavera Cloud*), dus toeschrijving van deze scores aan specifiek **P6** is een aanname. | https://www.capterra.com/p/145503/Oracle-Primavera/ |

### 11.2 Levenscyclus, techniek en interoperabiliteit

| # | Bewering | Oordeel | Onderbouwing / bron |
|---|---|---|---|
| 14 | Primavera Risk Analysis staat sinds **maart 2010** op 8.7 en Premier Support liep af in **maart 2018**; geen nieuwere release in Oracle's matrix | **bevestigd**, letterlijk: *"Primavera Risk Analysis 8.7 Mar 2010 Mar 2018 Not Available Indefinite"* (en 8.5: Nov 2008 / Nov 2011 / Dec 2012). Aanvullend bewijs: PRA ontbreekt volledig in Oracle's actuele C&E-productdocumentatie-index. **Tegenwicht toegevoegd** in §2.6: Oracle voert wél **Crystal Ball** als actueel C&E-product, dus "Monte-Carlo opgegeven" moet "geïntegreerde *schedule*-risicoanalyse opgegeven" zijn. | *Oracle Lifetime Support Policy — Applications*, effective date 2-7-2026, pp. 66-68 — https://www.oracle.com/us/support/library/lifetime-support-applications-069216.pdf ; https://docs.oracle.com/en/industries/construction-engineering/index.html |
| 15 | Supportmatrix: P6 EPPM/Professional 25.x GA dec 2025 → Premier t/m dec 2030; 24.x → dec 2029; 21.x → dec 2026; elke release 5 jaar Premier + onbeperkt Sustaining; P3 3.x (apr 2001), SureTrak 3.0.x (jul 2004, sustaining nov 2020), Pertmaster 8.2 (apr 2008), P6 EPPM 6.2 (nov 2008), 8.0 (nov 2010), 15.x (mrt 2015) | **bevestigd**, alle regels letterlijk teruggevonden voor zowel de EPPM- als de Professional-lijn. | idem |
| 16 | Primavera Gateway is "actueel" | **gecorrigeerd** — Oracle's eigen supportmatrix van 02-07-2026 kent als nieuwste Gateway-release **21.x (GA dec 2021, Premier t/m dec 2026)**; sinds 2021 geen jaarrelease meer, terwijl P6 en Unifier wél t/m 25.x doorlopen. §6.3 aangepast. Zelfde patroon bevestigd voor Instantis EnterpriseTrack (nieuwste 17.x, jan 2017 — profielclaim correct) en Primavera Portfolio Management (nieuwste 24.x, apr 2024). | idem |
| 17 | Serverstack v25: WebLogic **14.1.2** (JDK 17), Oracle DB 19.29/23/Autonomous, SQL Server 2019/2022, OAM/OID/OUD 14.1.2, **Shibboleth 3.3.3.0.0**, SAML 2.0, AD 2022/2025, Oracle BPM 14.1.2, Analytics Publisher 2025, AutoVue 21.1 | **bevestigd**, alle versienummers letterlijk. Extra gevonden en nu vermeld: Azure SQL wordt **niet** ondersteund en SQL Server vereist case-**insensitive** collation. | *Oracle Primavera P6 EPPM Tested Configurations, Version 25*, dec 2025 — https://docs.oracle.com/cd/G18294_01/English/tested_configurations/p6_eppm_tested_config.pdf |
| 18 | *"JRE is not a requirement for P6 EPPM; it is requirement only for AutoVue"* + JRE 1.8.0_311; P6 Integration API deprecated sinds 16.1 | **bevestigd**, beide letterlijk (*"P6 Integration API is deprecated as of version 16.1 of P6 and may be dropped in a future release."*). | idem |
| 19 | macOS/iOS/Android alleen voor P6 Team Member Web | **gecorrigeerd** — de browsertabel certificeert **macOS 15** (Safari 18.6+, Firefox 143+, Chrome 139+) **zonder** de beperking "Supported for P6 Team Member Web only"; die uitzondering staat uitsluitend bij Windows 10, iOS 18 en Android-tablets. §2.1 en §5.4 aangepast, en de "kies geen P6 als je op macOS werkt"-regel in §8 genuanceerd. | idem |
| 20 | Lokalisatie: 15 talen incl. Nederlands; gelokaliseerde help alleen voor Chinees-vereenvoudigd, Frans, Duits, Japans, Koreaans | **bevestigd** — exact 15 regels (AR, PT_BR, CH_CN, CH_TW, EN, **NL**, FR, DE, IT, JA, RU, ES_ES, KO, PL, CS); vijf met "Localized help"; PL en CS bovendien met de beperking *"only P6 Team Member Web is supported"* (dat laatste ontbrak in de eerste versie en is een reële beperking voor Poolse/Tsjechische planners). | idem |
| 21 | MS Project XML getest met 2010/2013/2016 (im+export) en 2019/2021 (**alleen import naar P6**) | **bevestigd**, letterlijk: *"2019 and 2021 were tested only for importing data from a Microsoft Project XML file into P6 EPPM. All other versions were tested both for importing and exporting."* | idem |
| 22 | **Geen enkele IFC-ondersteuning**; P6 leest geen native `.mpp`; XER draagt géén baselines, P6 XML wel | **bevestigd** — de officiële formatenlijst kent uitsluitend XER, P6 XML, XLS, MPX, Microsoft Project XML en UN/CEFACT; **IFC komt nergens voor**, MPP evenmin; letterlijk *"XER does not support the export of baselines"* en *"XER does not support the import of baselines"*. | https://docs.oracle.com/cd/F25600_01/English/admin/p6_pro_importing_exporting/import_export_file_formats.htm |
| 23 | MPXJ is LGPL, leest XER/PMXML/P6-databases/OPC en **schrijft** XER en PMXML | **bevestigd én gepreciseerd** — het is **LGPL 2.1 met "or (at your option) any later version"**, niet onbepaald "LGPL". Schrijfformaten letterlijk: MPX, MSPDI, PMXML, XER, Planner, SDEF. Talen: Java, .NET (IKVM), Ruby, Python, plus PHP. De compatibiliteitsconclusie met LGPL-3.0 blijft staan, maar hangt aan de "or later"-clausule — dat is nu expliciet gemaakt in §6.4. | https://www.mpxj.org/ ; https://raw.githubusercontent.com/joniles/mpxj/master/LICENSE ; broncodeheader `org/mpxj/Task.java` |
| 24 | Oracle Primavera Cloud importlimiet = **1 GB** | **bevestigd**, letterlijk: *"The maximum file size that you can import is 1 GB."* | https://primavera.oraclecloud.com/help/en/user/191098.htm |
| 25 | P6 Professional standalone gebruikt **SQLite** | **onzeker** — niet met een primaire Oracle-bron te bevestigen in deze ronde. Sterker nog: Oracle's actuele P6 Professional 26-documentatiebibliotheek omschrijft het product als *"built on Oracle and Microsoft SQL Server relational databases"* en noemt SQLite niet; de Tested Configurations v25 noemt SQLite evenmin. De twee geciteerde support-KB-titels konden niet worden opgehaald (Oracle Support vereist login). §2.1 en §2.9 gemarkeerd. | https://docs.oracle.com/cd/G48902_01/index.htm ; Tested Configurations v25 |
| 26 | Release 26.x bestaat | **bevestigd** — de P6 Professional-documentatie-index toont versies 6.2.1 t/m **26** (library `G48902_01`). Kanttekening toegevoegd in §1.2: Oracle's Lifetime Support Policy van 02-07-2026 kent nog géén 26.x-regel. | https://docs.oracle.com/en/industries/construction-engineering/primavera-p6-professional/index.html |

### 11.3 Wat níet te weerleggen viel, en wat blijft staan als onzeker

- **Niet weerlegd, maar ook niet primair bevestigd:** de bedrijfshistorie (Primavera Systems opgericht 1983 door Koppelman en Faris; overname door Oracle in 2008). Oracle's acquisitie-pagina en de oude persberichten-URL waren niet bereikbaar (404). Blijft **[NIET GEVERIFIEERD]**.
- **Blijft onzeker:** het maximum aantal baselines per project (het rondzingende getal 50), de schaalbaarheidsordegroottes in §2.9 (Oracle publiceert geen harde limiet), de kortingsordegrootte van 20–60% bij enterprise agreements, de trainingskosten van $1.000–$2.500 p.p., de TCO-factor 2–3× en het uitgewerkte kostenvoorbeeld in §3.4. Alle waren al als [SCHATTING] gemarkeerd en dat blijft correct.
- **Blijft onzeker:** de marktomvangcijfers ($2,95 mld 2025 → $7,32 mld 2032) en de MS Project-claim "$55/user/month, 80% van commerciële bouwplanning" — beide afkomstig van partijen die een concurrerend product verkopen.
- **Netto-effect van deze ronde op de prijsparagraaf:** de **2016-Oracle-cijfers zijn nu volledig hard** (van "deels geschatte kolomtoewijzing" naar "letterlijk geverifieerd"), terwijl de **2026-partnerprijzen juist zwakker** blijken dan het profiel suggereerde (één reproduceerbare bron in plaats van twee, plus een intern inconsistente opslag). De kernconclusie — named user, ~$4k perpetual per planner, 22% per jaar, geen concurrent-optie, geen openbare Oracle-prijslijst — overleeft de aanval intact.
