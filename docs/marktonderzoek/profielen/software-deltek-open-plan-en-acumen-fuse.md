# Deltek Open Plan & Deltek Acumen (Fuse / Risk / 360 / Touchstone)

**Diepgaand softwareprofiel — wereldwijd marktonderzoek planningssoftware**
Opgesteld: 25 juli 2026 · Alle webbronnen opgehaald op 25 juli 2026 tenzij anders vermeld.
Onderzoeksmethode: leveranciersdocumentatie (help.deltek.com, dsm.deltek.com PDF's incl. release notes, technical overviews, Developer Guide en Guided Tour), reviewsites/aggregators, resellerprijslijsten (live én via het Internet Archive), technografische marktdata, vakartikelen. Beperking: G2, TrustRadius, Gartner Peer Insights, Reddit en Planning Planet blokkeerden geautomatiseerde toegang (HTTP 403); waar mogelijk zijn hun gegevens via zoeksnippets of alternatieve aggregators achterhaald. Dit is expliciet aangegeven.

> **Kernsamenvatting.** Twee producten uit dezelfde Deltek-PPM-stal, met heel verschillende marktrollen. **Open Plan** is een 40 jaar oude, Windows-only CPM-planner (Welcom, midden jaren '80) die vrijwel uitsluitend nog leeft in de Amerikaanse defensie- en overheids-EVMS-keten; marktaandeel is marginaal (~0,15% technografisch geschat) maar de klanten zijn zwaargewichten als Boeing, Lockheed Martin en BAE. **Acumen Fuse** is het commercieel succesvollere product: een schedule-kwaliteits- en forensische analysetool met 600+ metrics (DCMA 14-point, DECM 8.0, DOE, NASA, GAO, AACE) die *naast* P6, MS Project, Safran, Asta en Open Plan draait en daardoor een veel breder bereik heeft. Beide zijn Windows-desktopapplicaties op .NET Framework 4.8, beide hebben **nul IFC/BIM/4D-ondersteuning**. Open Plan heeft wél een volwaardig, schrijfbaar **OLE/COM-objectmodel** (naast een jonge, read-only REST API); Acumen heeft feitelijk geen programmatische API. Prijzen zijn niet publiek; de enige geverifieerde lijstprijzen komen van een Australische Deltek-partner en zijn op 25 juli 2026 rechtstreeks van de live webshop gehaald: **Acumen Fuse AUD 7.367 eeuwigdurende licentie + AUD 2.085 verplicht eerstejaars onderhoud = AUD 9.452 per gebruiker**; **volledige suite AUD 14.734 + 3.241 = AUD 17.975 per gebruiker**. Voor Open Plan is nergens een publieke prijs te vinden.

---

## 1. Wat het is

### 1.1 De leverancier: Deltek

| Feit | Detail |
|---|---|
| Opgericht | 1983, door Donald en Kenneth E. deLaski ("**Del**aski **Tek**nologies") |
| Hoofdkantoor | Herndon, Virginia (VS) |
| Eigendom | Beursgang 1997 → privaat 2002 → New Mountain Capital (75%, 2005) → beursgang 2007 ($162 mln) → **Thoma Bravo** ($1,1 mld, 2012) → **Roper Technologies** ($2,8 mld, 2016). Sinds 2016 dochteronderneming van Roper Technologies (NYSE: ROP). |
| CEO | Bob Hughes — benoemd tot president & CEO in **maart 2024** (Wikipedia). ⚠️ Niet te bevestigen dat hij dit medio 2026 nog is: Deltek's eigen leadership-pagina gaf HTTP 404 en de About-pagina noemt geen namen. **Onzeker.** |
| Omvang | **± 4.200 medewerkers** volgens Deltek's eigen About-pagina (juli 2026); Wikipedia noemt nog 3.686 — *gecorrigeerd, zie Verificatie V5*. 12+ vestigingen wereldwijd |
| Positionering | "the intelligent, industry-tuned platform that powers the project lifecycle", naar eigen zeggen vertrouwd door 30.000 organisaties; bedient ± 95% van de Amerikaanse publieke sector-inkoopmarkt via GovWin |

Deltek is dus geen bouwsoftwarebedrijf maar een **government-contracting-ERP-bedrijf**. Dat verklaart vrijwel alles aan de positionering, functionaliteit en zwaktes van beide producten.

### 1.2 Open Plan — historie en eigendom

- **Ontwikkeld midden jaren '80 door Welcom** (Welcom Software Technology, Houston, Texas), samen met het zusterproduct **Cobra** (EVM-kostenbeheersing).
- **Deltek nam Welcom over in maart 2006.** Deltek verklaarde destijds dat "Welcom products, such as Cobra and Open Plan, will continue to be developed, licensed, maintained and supported by Deltek" (Washington Technology, 21 maart 2006). De NYT DealBook noteerde dat de overname bedoeld was om overzeese markten en klantenbestand uit te breiden.
- **Boeing is de iconische referentie**: Open Plan werd al in **1985** gekozen op Boeings Huntsville-site; in **1996** besloot het senior management tot standaardisatie en in **1997** koos Boeing Integrated Defense Systems definitief voor Open Plan + Cobra voor de hele divisie. Circa **2.000 projectmanagers/financiële medewerkers** gebruikten de Welcom-producten om "thousands of projects" per maand te beheren, met **wekelijkse** earned value in batch-modus.
- **Huidige versie: 8.8** (release notes gedateerd 22 april 2026; technical overview 22 april 2026). Voorgangers: 8.7 (2024), 8.6 (2023), 3.3 (2019-documentatie nog online).
- **Twee edities**: *Open Plan Professional* (volledige functionaliteit, voor fulltime planners) en *Open Plan Desktop* ("restricted functionality", bedoeld voor teamleden die alleen basisfunctionaliteit/statusupdates nodig hebben). Ze zijn ontworpen om samen te werken in één multi-user omgeving.

### 1.3 Acumen — historie en eigendom

- **Acumen** was een zelfstandig bedrijf in **Austin, Texas**. **Deltek nam Acumen over op 15 juli 2013** (onder Thoma Bravo-eigendom). Persmateriaal destijds: de overname moest "Enhance and Extend its Industry-Leading Project and Integrated Program Management Solutions" en richtte zich op de sectoren *construction & engineering*, *aerospace & defense* en *energy*. Het was Deltek's eerste overname in Texas.
- **De suite bestaat uit vier producten:**
  - **Acumen Fuse** — schedule-diagnostiek en forensische analyse (het vlaggenschip)
  - **Acumen Risk** — Monte-Carlo-risicoanalyse (schema + kosten)
  - **Acumen 360** — automatische versnellings-/vertragingsscenario's ("what would it take to finish 3 months earlier")
  - **Acumen Touchstone** — een **web-based maar on-premise** submittal-portaal (IIS) waar (onder)aannemers hun schema's indienen en automatisch gescoord krijgen
- **Huidige versie: 8.11** (release notes 5 december 2025; documentatie bijgewerkt 17 november 2025). Versiereeks 6.0 t/m 8.11 staat online.

### 1.4 Doelgroep, typische gebruikers, sectoren, regio's

**Doelgroep (Deltek zelf, 2026):** organisaties in *government contracting*, *aerospace & defense*, *architecture & engineering*, *engineering & construction (EPC)* en *energy/oil & gas/infrastructure*. Expliciet: "prime contractors and subcontractors managing multi-year, multi-project programs for federal agencies such as **DoD, DOE, and NASA**".

**Typische gebruikers:** IMS-planners (Integrated Master Schedule), control account managers, EVMS-analisten, PMO-compliance-teams, schedule-auditors en claim-/forensisch analisten. Voor Fuse specifiek ook: overheids-programmabureaus die inkomende contractantenschema's beoordelen bij IBR's (Integrated Baseline Reviews) en PMR's.

**Regio's en klanten (technografische schatting, 6sense):**

| Metriek | Waarde |
|---|---|
| Gedetecteerde klantdomeinen Open Plan | 57 |
| Geschat marktaandeel projectmanagement | 0,15% (#24 in de categorie) |
| Verenigde Staten | 39 klanten (73,6%) |
| Verenigd Koninkrijk | 3 (5,7%) |
| Duitsland | 3 (5,7%) |
| Bedrijven met 10.000+ medewerkers | 23 |
| Top-sectoren | cybersecurity (10), intelligence (6), engineering services (5) |
| Genoemde klanten | Siemens, Lockheed Martin, Boeing, BAE Systems |

> ⚠️ **Schatting.** 6sense-cijfers zijn afgeleid uit webtechnologie-detectie op bedrijfsdomeinen. Voor een on-premise Windows-desktopapplicatie achter een defensiefirewall is dat structureel een **onderschatting** — het werkelijke aantal seats ligt vrijwel zeker hoger. De *richting* (klein, Amerikaans, defensie, grote enterprises) is wel betrouwbaar; de absolute getallen niet.

---

## 2. Functionaliteit en techniek

### 2.1 Open Plan — planningsengine

| Onderdeel | Implementatie |
|---|---|
| **CPM-engine ("Time Analysis")** | Berekent early/late dates per activiteit op basis van *Time Now*, activiteitenduur en logische relaties. Kan automatisch herberekenen bij elke datawijziging (instelbaar). Klassieke forward/backward pass. |
| **Resource scheduling** | Twee algoritmes: **Time Limited** (respecteer einddatum, accepteer overallocatie) en **Resource Limited** (respecteer capaciteit, laat einddatum schuiven). Geavanceerde technieken: *splitting*, *stretching* en *reprofiling* van resource-inzet. Na resource scheduling zijn "scheduled dates" te vergelijken met early/late dates. |
| **Kalenders** | Kalenderbestanden per project óf één gedeeld kalenderbestand over meerdere projecten; ook toewijsbaar aan resourcebestanden. Standaardkalender = ma-vr, 8-urige werkdag. Definieerbaar: werkdagen/-uren (bijv. 08:00–16:00), niet-werkdagen, feestdagen en **extra** werkdagen. Kalenders per activiteit én per resource (bijv. vakantieschema van een medewerker). **Hiërarchische overerving**: een kalender kan als kopie of als *child* worden aangemaakt en erft de defaults; wijzigingen in de parent slaan door naar alle children. |
| **Kosten- en resourcemodel** | Resource-uren en -kosten worden gesommeerd naar activiteit- en subprojectniveau; expliciet de basis voor earned value. Deltek adviseert kostenberekening vóór het zetten van een baseline. Gedeelde corporate resource-definities over projecten heen. |
| **Baselines** | Snapshot-baselines op een gekozen moment, met vergelijking gepland vs. werkelijk. Baseline-beveiliging en beperkte verwijderrechten op rolniveau. Bij Cobra-integratie maakt Open Plan een baseline die de time-phased assignment-data opdeelt in **Cobra-perioden**. |
| **Risico / Monte Carlo** | **Ingebouwd**, geen add-on. Drie-puntschattingen (optimistisch, meest waarschijnlijk, pessimistisch) → kansverdeling per activiteit; gebruiker kiest het aantal simulaties; time analysis wordt herhaald met random getrokken duren. Output: gemiddelde en standaarddeviatie van einddata, cumulatieve verdelingen van berekende data en float (naar een Risk-tabel), en **risicohistogrammen** per sleutelactiviteit. **Beperking:** de documentatie behandelt uitsluitend **duur**risico; kosten- en resource-risico worden niet genoemd. |
| **Multi-project** | Master/subproject-hiërarchie met **interne** subprojecten (binnen het masterbestand) en **externe** subprojecten (aparte projectbestanden, gelinkt). Ancillary files (resource-, kalender- en codebestanden) kunnen aan externe subprojecten gekoppeld worden. **Beperking uit de docs:** alle externe subprojecten moeten in dezelfde open/gesloten toestand zijn bij het toevoegen/verwijderen van ancillary files aan een master. |
| **Schema-kwaliteit** | User Defined Validations (UDV's) en real-time schedule quality-analyse; in 8.8 marketing: geprogrammeerde **DCMA 14-point**- en **DECM**-checks, Time Now-handhaving. |
| **Governance/security** | Rolgebaseerde toegang via EPM Security Administrator / het nieuwe **PPM Administrator 1.0**; in 8.8 is de **audit log altijd aan**; **Authorized Control Countries (ACC)** voor exportcontrole (ITAR-achtig): projecteigendom en toegangsvalidatie op landniveau; wachtwoordbeleid (Weak/Medium/Strong/Custom, min. 8/12/16 tekens, max. 128); OAuth 2.0 voor SMTP-mail. |
| **Rapportage** | Custom view layouts, barchart-, netwerk- en spreadsheetviews, standaard-, samenvattings- en uitzonderingsrapportage. Add-in voor Kidasa Milestones Professional. |
| **Automatisering** | Batch Processor Guide en Data Tool Guide zijn onderdeel van de standaarddocumentatie — batchverwerking is een expliciet ondersteund scenario (Boeing rekende hiermee "hundreds and thousands of programs purely in a batch mode"). |

#### 2.1a De rekenkern in detail — uit de *Open Plan 8.8 Developer Guide* (723 p., 22 april 2026)

Ongewoon voor deze markt: Deltek publiceert de **algoritmiek zelf**, niet alleen het gedrag. Dat maakt Open Plan bruikbaar als referentie-implementatie om een eigen CPM-solver tegen te ijken. De hoofdstukken *Time Analysis Calculations*, *Resource Scheduling Calculations*, *Risk Analysis Calculations*, *Cost Calculations* en *Multi-Project Operations* beschrijven onder meer:

- **Volgorde van berekening:** topologische sortering → early dates → late dates → floats → criticality → subprojectafhandeling → hammocks.
- **Zes gescheiden floatwaarden per tijdanalyse** — meer dan vrijwel elke concurrent:
  1. Total float · 2. Free float · 3. **Finish total float** · 4. **Finish free float** · 5. **Relationship total float** · 6. **Relationship free float**.
  *Relationship total float* = de hoeveelheid waarmee de lag op een relatie zou moeten toenemen om projectafronding of een late target-datum te vertragen; *relationship free float* idem voor de directe opvolger. Hiermee is aan te wijzen **welke relatie** de kritieke status van een opvolger veroorzaakt. Finish float wijkt van start float af bij discontinue activiteiten en subprojecten, waar de berekende duur kan veranderen.
- **Kalenderinteractie met float, expliciet gedocumenteerd:** "an activity using a 7-day work week and ending on a Saturday may have 1 day of total float simply because the calendar on the next activity prevents it from starting until Monday." Precies het randgeval waarop eigen implementaties stuklopen.
- **Negatieve float** ontstaat uitsluitend uit onhaalbare target- of completiedatums (late dates vóór early dates); free float kan per definitie nooit negatief zijn.
- **Resource scheduling** met twee grondvormen (resource-limited vs. time-limited/levelling met smoothing) en vier activiteitattributen die het algoritme mogen versoepelen of beperken: *splitting*, *stretching*, *reprofiling* en *immediate*. Splitsing gebeurt alleen als de activiteit als splitsbaar is gemarkeerd én de gesplitste variant de einddatum verbetert. Verder gedocumenteerd: prioriteitsregels, resource substitution, reserveringen, resourcegebruik door andere projecten, en de expliciete beperking dat **subprojecten en hammocks niet door resource scheduling verschoven worden** (hun verbruik wordt alleen genoteerd, met mogelijke overloads tot gevolg).
- **Kostenmodel is EVM-native, niet EVM-bovenop.** Vier resourceklassen — **Labor, Material, Other Direct Costs, Subcontract** — rollen op naar activiteits- en subprojectniveau. Voor Labor houdt Open Plan standaard `BAC_QTY` (budget), `BCWS_QTY` (planned value), `BCWP_QTY` (earned value), `ACWP_QTY` (actual cost) en `ETC_QTY` (estimate to complete) op activiteitniveau bij. Resources worden toegewezen als *Total* (met spreadcurve, × tarief) of *Level* (per tijdseenheid, × duur × tarief), met vlakke of escalerende tarieven, en een optionele resource-eigen *period* die de activiteitsduur overrulet.
- **Monte Carlo — de sampling-internals staan er letterlijk in.** Alle sampling gebeurt op pseudo-random getallen in het bereik **0–32767**. Uniform en triangulair via inversie. **Normale verdelingen worden gesampled door 12 onafhankelijke pseudo-random getallen op te tellen**, waarbij min/max als een bereik van zes standaarddeviaties gelden en de ~1% staartkans bewust genegeerd wordt; Deltek publiceert zelf de vergelijking van theoretische vs. gesampelde percentielen bij 10.000 simulaties. Ook een betaverdeling is beschikbaar. Continue verdelingen worden inclusief-eindpunt naar discrete eenheden vertaald, met een expliciete waarschuwing voor afrondingsfouten bij weinig mogelijke uitkomsten. Naar moderne maatstaven is dit een **grove** generator — bruikbaar als referentie, niet als state of the art.

### 2.2 Open Plan — platform en schaalbaarheid

Uit *Deltek Open Plan 8.8 Technical Overview and System Requirements*, 22 april 2026:

- **Architectuur: twee logische tiers.** Client/Application Tier (functionele proceslogica + UI, op een werkstation of Citrix/Terminal Server) en Database Tier. **Er is geen applicatieserver-tier en geen webclient.**
- **Deployment-modellen:** stand-alone (alles op één machine), client/server (fat client praat rechtstreeks met de database), of multi-user server-install met applicatiebestanden op een netwerkshare. Deltek waarschuwt zelf: als een client via een router of firewall met de database praat, "this type of setup often yields poor performance" — de aanbevolen oplossing is Citrix/Terminal Server.
- **Besturingssystemen:** Windows 11, Windows Server 2019/2022/2025, Windows Server 2022 Azure Edition. Citrix Virtual Apps and Desktops 7, VMware Horizon 8.
- **Databases:** SQL Server 2019/2022 (ook Express, ook Azure SQL), Oracle 19.3, **Microsoft Access 2016/2019/2021**. Toegang via OLE DB 2.1-providers (Oracle Provider for OLE DB, SQL Server Native Client 11.0, MS OLE DB Driver for SQL Server, Jet, ACE OLEDB 15/16).
- **Runtime:** .NET Framework 4.8 / 4.8.1, Visual C++ 2015-2022 Redistributable.
- **Schaal — Deltek's eigen definitie van "typisch/gemiddeld gebruik":**
  > "A user working with **moderate-sized projects (2,000 – 5,000 activities), one project at a time**, in either exclusive or shared mode, and using spreadsheet or bar chart views of moderate complexity."
  - Clientgeheugen: **50 MB** voor een project met ± 2.000 activiteiten, 2.000 relaties en 4.000 resource-toewijzingen.
  - **32-bit versie: maximaal 3–4 GB** bruikbaar geheugen (OS-beperking). 64-bit versie: tot 192 GB.
  - MS Project- of Primavera-integraties vergen "more memory".
- **Gelijktijdige gebruikers:** de gedocumenteerde "Small Client/Server Installation" is **1–25 concurrent users** (databaseserver 8+ GB RAM, SSD aanbevolen). Client: 1,8 GHz+, 4 GB RAM aanbevolen, 530 MB schijfruimte.
- **Beeldscherm:** aanbevolen 1920×1080, minimaal 800×600 (client/server-tabel noemt minimaal 1024×768).
- **Niet ondersteund:** installatie op domain controller, Exchange, proxy/firewall/ISA, SharePoint Portal Server of Small Business Server.
- **Open source in het product:** D3DES (Triple DES), Natural Sort, Pcrypt, PJNSMTP (SMTP-library).

> **Conclusie platform:** Open Plan is een **on-premise Windows fat client**. Aggregatorsites die "Cloud/SaaS" of "Web, Android, iPhone/iPad" claimen (SourceForge, Slashdot, Capterra) zijn feitelijk onjuist ten opzichte van Deltek's eigen technical overview. "Cloud" betekent hier: draaien in een gehoste VM of via Citrix/VMware Horizon.

### 2.3 Open Plan — API

Nieuw in 2026: een **REST API voor geselecteerde Deltek PPM-producten** (*REST APIs for Deltek PPM Products — Release Notes*, 29 mei 2026):

- **"A secure, read-only REST API"** — expliciet alleen-lezen.
- Stand-alone service, vereist **IIS** op een aparte server + database-client, SSL-certificaten zelf te regelen.
- Gedocumenteerd met **OpenAPI Specification 3.0**.
- Beschikbaar vanaf **Open Plan 8.8 Cumulative Update 01** (ook Cobra 8.7 CU05+, PM Compass 8.5 CU12+).

**Belangrijke nuancering: de REST API is niet de enige API.** De *Open Plan 8.8 Developer Guide* documenteert een volwaardig, **lees- én schrijfbaar OLE-automatiseringsmodel (COM)**:

- Open Plan is opgezet als **OLE-serverapplicatie** en exposeert een objecthiërarchie met objecten, collections, properties en methods (± 180 pagina's properties en methods in de guide, plus codevoorbeelden).
- Aanstuurbaar vanuit elke COM-capabele omgeving (Deltek's voorbeelden zijn Visual Basic; in de praktijk werkt ook VBA, PowerShell of Python via `pywin32`).
- Automatiseringsapplicaties die Open Plan zelf starten moeten expliciet de `Login`-methode aanroepen; commando's die in de UI via Deltek EPM zijn afgeschermd blijven voor automatisering wél bereikbaar — een aandachtspunt voor security-inrichting.
- Daarnaast: **generieke import/export-specificaties** (scriptbaar, met keywords als `TABLE`, `FIELD`, `ATTRIBUTE`, `ELEMENT`, `HIERARCHICAL`, `LINK`, `XML_TAG`, `STYLESHEET`) waarmee zelf gedefinieerde tekst-, delimited- en **XML**-formaten in- en uitgelezen kunnen worden, inclusief hiërarchisch geneste activiteiten met predecessor-/successorblokken en een XSL-stylesheet.
- Plus een gepubliceerd **Entity Relationship Diagram** voor directe databasetoegang, een **Batch Processor Guide** en een **Data Tool Guide**, en tot 30 eigen tools op de Add-Ins-tab via `Addins.dat`.

De juiste samenvatting is dus: **Open Plan is diep automatiseerbaar, maar uitsluitend op Windows en via technologie uit het COM-tijdperk.** Er is geen moderne, schrijfbare, platformonafhankelijke API; de REST-variant uit 2026 is alleen-lezen.

### 2.4 Acumen Fuse — analysemotor

| Onderdeel | Implementatie |
|---|---|
| **Metric-bibliotheek** | Deltek claimt (2026) **"more than 600 industry-aligned metrics spanning DCMA, DOE, GAO, AACE, and NASA standards"**. Derde partijen noemden eerder 300+ (Ten Six) en 500+ (SmartPM) — het aantal is over de jaren gegroeid. Eigen metrics zijn te schrijven (er is een aparte *Metric Developers Guide*). |
| **DCMA 14-point** | Volledig geïmplementeerd: 1 Missing Logic, 2 Leads (negatieve lag), 3 Positive Lags, 4 Relationship Types (SS/FF/SF), 5 Hard Constraints, 6 High Total Float, 7 Negative Total Float, 8 High Duration, 9 Invalid Dates, 10 Resources, 11 Missed Tasks, 12 Critical Path Test, 13 CPLI, 14 BEI. Presentatie: tijdlijnanalyse links, samengevatte metrics rechts, met doorklikbare activiteitenlijsten. |
| **DECM** | Meegeleverde **DECM-metrics versie 8.0** (november 2025), als `dcma_decm_metrics_89_DECM_V8.0.aft`-template. Deltek waarschuwt dat mergen van nieuwe metrics door DCMA verwijderde metrics niet automatisch opruimt. Met DECM 8.0 kwam een nieuw veld *BCWS Freeze Period* uit Cobra- en IPMDAR-CPD-kostendata. |
| **DOE-metrics** | Twee sets van het U.S. Department of Energy Office of Project Management: een EVMS-set en een **IRSA**-set (Independent Review) — geleverd door DOE zelf, inclusief instructie-PDF's en een voorbeeldwerkboek. |
| **Analyzers** | *Ribbon Analyzer* (metrics per groepering/tijdsband), *Phase Analyzer*, *Intersection Analyzer*, *Logic Analyzer* (relatie-diagnostiek), *Forensic Analyzer*. |
| **Forensische analyse** | Geautomatiseerde vergelijking tussen schema-versies/snapshots, met **half-step delay analysis** om voortgang van scope-wijziging te scheiden. Levert audit-documentatie op. |
| **S1–S5-framework** | S1 // Projects (importeren, bekijken, bewerken, cleansen), S2 // Diagnostics (de hoofdweergave, analyse), S3 // Risk (Monte Carlo + risicoregister + rapportage), S4 // Acceleration (versnellingsdoelen en -criteria, = Acumen 360), S5 // Dashboard (rapportagedashboard). |
| **Schedule Cleanser** | Verwijdert redundanties/ruis om kwaliteitsscores te verbeteren; wijzigingen kunnen worden gepubliceerd naar bijvoorbeeld P6 XER. |

### 2.5 Acumen Risk / 360 — risico en scenario's

- **Monte Carlo:** random number generator binnen gedefinieerde ranges; risicoregister met discrete risico's (kans × impact). Deltek's eigen voorbeeld: 47% kans (getrokken uit 41–60%) × 53 dagen impact (uit 41–60 dagen) = 24,9 dagen risico-impact voor die run. Deltek adviseert **duizenden** simulaties. Sinds 8.3 is het maximum aantal threads voor risicoanalyse instelbaar.
- Ondersteunt naast het risicoregister ook **Uncertainty Factors** en **Risk Drivers**.
- **Cost-Schedule Integration** in S3 (kosten- én schemarisico).
- **Risk-Adjusted Schedule:** genereer een scenario op elke gewenste **P-waarde** (P50, P80, …) en publiceer het terug naar de bronplanner.
- Nieuw in 8.11: **Penalty Cap** (plafond op boete-/vertragingskosten), herordenen van mitigatiestappen, upper bound van deterministische datumkans in de Risk Exposure Chart.
- **GenAI (nieuw in 8.11):** "Generate Risks with AI" en "Generate Steps with AI" in het risicoregister. De gebruiker beschrijft projecttype, locatie en context; de AI stelt risico's respectievelijk mitigatiestappen voor. **Belangrijk:** de klant moet een **eigen Azure OpenAI-account** aanleveren (API key, deployment name, endpoint URL) — ondersteunde modelproviders zijn *Azure Cloud – GPT-4o* en *Azure Government – Azure GPT-4o*. Het is dus een BYO-key-integratie, geen inbegrepen dienst.

### 2.6 Acumen — platform en schaalbaarheid

Uit *Deltek Acumen 8.11 Technical Overview and System Requirements*:

- **Architectuur: één logische tier.** "Acumen uses a single tier architecture" — client/applicatie op een werkstation of Citrix/Terminal Server. **"There is no backend database tier required to store Acumen data."** Een database is alleen nodig als je metric-resultaten en -definities wilt publiceren.
- **Acumen is een 64-bit, multi-threaded applicatie** die "as many CPUs as the computer has available" gebruikt voor diagnostics en risicoanalyse.
- **OS:** Windows 10/11, Windows Server 2019/2022/2025; Citrix Virtual Apps and Desktops 7.x, VMware Horizon 8. Voor Touchstone: IIS 10.
- **Optionele database:** SQL Server 2019/2022, Azure SQL, Oracle 19.3, via OLE DB / ODP.NET.
- **Runtime:** .NET Framework 4.8 / 4.8.1.
- **Hardware:** 2,0 GHz+, **4 cores aanbevolen** (2 minimum), **16 GB RAM aanbevolen**, SSD met ≥ 50 GB vrij (voor groei van het pagefile bij grote Risk-jobs).
- **Schaal — geheugen per gelijktijdige clientinstantie:**

  | RAM | Projectomvang |
  |---|---|
  | 2 GB | < 10.000 activiteiten |
  | 4 GB | 10.000 – 50.000 activiteiten |
  | 8 GB | > 50.000 activiteiten |

  "Typisch/gemiddeld gebruik" = **10.000–20.000 activiteiten, één project tegelijk**. Deltek waarschuwt expliciet dat een workbook met meerdere maanden of projecten optelt: "three months' worth of a 10k activity project is 30k activities".
- **Marketingclaim over de bovengrens:** Deltek's Fuse-productpagina claimt ondersteuning voor **"500K+ schedule activities across projects"** en "50% reduction in schedule review time". Dat zijn leveranciersclaims, niet uit de technische documentatie.
- **VM-advies:** memory ballooning inschakelen; liever voldoende geheugen dan pagefile-gebruik.

### 2.7 Acumen — API

De *Deltek Acumen 8.11 API Guide* (5 december 2025) beschrijft **geen programmatische API** in de moderne zin. Het is een **XML-export- en rapportagehaak**:

- Je legt een `Reportconfig.xml`-bestand aan met `ReportSetting`-elementen. Elk element definieert een **menu-item in de Acumen-desktop-UI** (op de tabs Projects, Analysis, Logic of Forensics).
- Bij het klikken op dat menu-item genereert Acumen een XML-bestand met de geselecteerde data (Ribbon Views, Logic Analyzer, Forensic Analyzer, Metric Library — telkens `All`, `Current` of `None`) en start vervolgens een extern programma dat daar een rapport van maakt.
- Workflow letterlijk: *Menu Click → XML Generation → Report Execution → Report.*
- De datamodellen die geëxporteerd worden zijn wel rijk: Workbook, Project, Activity, Relationship, Field, Snapshot, Costs, Durations, Logic Analyzer, Ribbon/Phase/Intersection, Metric Library met Thresholds en Filters, Forensic Report.

> **Praktische betekenis:** je kunt Acumen niet headless of server-side aansturen. Er is geen REST-endpoint, geen CLI, geen SDK. Alles start bij een muisklik in de desktop-UI. Wie Fuse in een CI/CD- of geautomatiseerde-reviewpijplijn wil hangen, moet dat via Touchstone (het aparte, betaalde submittal-portaal) doen.

---

## 3. Prijzen

### 3.1 De publieke prijssituatie

**Deltek publiceert geen prijzen voor Open Plan of Acumen.** Dit is consistent bevestigd:

| Bron | Uitspraak | Datum |
|---|---|---|
| Capterra (Open Plan) | Startprijs: "Contact vendor". Geen gratis proefversie, geen gratis versie. | 25-07-2026 |
| Software Advice (Deltek Acumen) | "Starting Price: Contact for pricing"; geen trial, geen free version; **0 reviews**. | 25-07-2026 |
| SmartPM (vergelijkend artikel) | "Pricing is not publicly advertised—evaluation requires direct vendor engagement", genoteerd als procurement-frictie. | 25-07-2026 |
| PricingNow.com | "Deltek does not publicly list its pricing"; model beschreven als "a combination of subscription fees and per-user pricing"; **geen enkel klantbedrag gerapporteerd**. | pagina bijgewerkt 08-03-2026 |
| SaaSCounter | Alleen maatwerkoffertes. | 25-07-2026 |

### 3.2 Wél gevonden lijstprijzen — Acumen (Prescience Technology, AU)

De Australische Deltek-partner **Prescience Technology** publiceert daadwerkelijke webshop-prijzen, mét een uitgesplitste "Price Breakdown" die licentie en onderhoud scheidt en die de **Deltek-lijstprijs** naast de reseller-actieprijs zet. Dit is de enige publieke, concrete Deltek-PPM-prijslijst die dit onderzoek heeft opgeleverd.

**Live geverifieerd op 25 juli 2026** (rechtstreeks van `www.prescience.com.au`, met de embedded `schema.org/Product`-data als controle; de pagina's dragen `priceValidUntil: 2027-12-31`). Alle bedragen **AUD, exclusief GST, per Application User, term: Perpetual**, inclusief het verplichte eerste jaar Deltek Acumen Maintenance.

| Product | SKU | **Deltek-lijstprijs licentie** | **Onderhoud jaar 1** | **Totaal jaar 1 (lijst)** | Reseller online (5% korting op de licentie) |
|---|---|---|---|---|---|
| **Deltek Acumen Fuse** | ACFUS1-10-1 | **7.367,00** | 2.085,00 | **9.452,00** | 9.083,65 |
| **Deltek Acumen Risk + 360** (add-on; vereist bestaande Fuse) | ACRIS1-10-1 | 7.367,00 | 2.085,00 | 9.452,00 | 9.083,65 |
| **Deltek Acumen Fuse + Risk + 360 (Full Suite)** | ACRIS1-10-1-1 | **14.734,00** | 3.241,00 | **17.975,00** | 17.238,30 |
| **Deltek Acumen Touchstone** | — | uitsluitend op aanvraag (webshop verwijst naar telefonisch contact) | — | — | — |
| PrescienceAdvantage® Everyday Support (optioneel, van de reseller, niet van Deltek) | — | — | — | 1.160,00/jaar of vanaf 115,00/maand | 1.102,00/jaar |

Aanvullende voorwaarden die de webshop noemt: licentietermijn "Perpetual"; prijs per Application User ("All prices are in AUD. Price is per Application User."); exclusief GST; **1,9% toeslag bij creditcardbetaling** ("I understand and accept that there is a 1.9% surcharge for all credit card transactions") — *gecorrigeerd, een eerdere versie noemde 1,75%*; "All Deltek orders are bound by Deltek's terms and conditions available at deltek.com/contracts"; Deltek benadert de klant zelf vóór afloop van het onderhoudscontract voor verlenging. De reseller omschrijft zichzelf als "Australia's exclusive Deltek Acumen Certified Partner"; de 5%-korting geldt blijkens de eigen voetnoot uitsluitend op de eeuwigdurende licentie, niet op het eerste jaar onderhoud.

**Prijsontwikkeling over de tijd (Internet Archive, dezelfde reseller, dezelfde SKU's):**

| Moment | Licentie | Onderhoud | Totaal jaar 1 |
|---|---|---|---|
| Snapshot 22-06-2018 (Fuse) en 24-03-2019 (Risk) | AUD 6.472 | AUD 1.920 | AUD 8.392 |
| Live 25-07-2026 (Fuse) | AUD 7.367 | AUD 2.085 | AUD 9.452 |
| **Verschil** | **+13,8%** | **+8,6%** | **+12,6%** |

Over ruwweg acht jaar is de nominale prijs dus met ~13% gestegen — reëel eerder vlak tot dalend. Dat past bij een volwassen product in een stabiele niche, niet bij een groeiproduct.

> **Twee nuances uit de 2018-snapshot (geverifieerd 25-07-2026).** (1) In 2018 gold de 5%-online korting óók op het onderhoud (online: 6.148 + 1.824 = 7.972); in 2026 geldt hij uitsluitend op de licentie. De *effectieve* prijsstijging voor een online koper is daarmee groter dan de +12,6% lijstprijsstijging: 7.972 → 9.083,65 is **+13,9%**. (2) Het hoge onderhoudspercentage is **geen recente ontwikkeling**: in 2018 was het 1.920 / 6.472 = **29,7%**, in 2026 28,3%. Het percentage is dus licht *gedaald*. De formulering "boven de 18–22%-bandbreedte" blijft juist, maar mag niet gelezen worden als een recente verhoging.

**Prijsanker bij dezelfde reseller, dezelfde dag, dezelfde valuta** *(gecorrigeerd — zie Verificatie V2)*. Een eerdere versie noemde "P6 Professional AUD 6.809" naast de Acumen-**lijst**prijzen; dat is geen gelijke vergelijking, want AUD 6.809 is de **online kortingsprijs inclusief eerste jaar onderhoud**. De volledige uitsplitsing van dezelfde webshop:

| Product | Licentie (lijst) | Onderhoud jaar 1 | Totaal jaar 1 (lijst) | Online totaal |
|---|---|---|---|---|
| **Acumen Fuse** | 7.367,00 | 2.085,00 | **9.452,00** | 9.083,65 |
| Oracle Primavera P6 **Professional** | 5.820,00 | 1.280,00 | **7.100,00** | 6.809,00 |
| Oracle Primavera P6 **EPPM** | 6.360,00 | 1.399,00 | **7.759,00** | 7.441,00 |

De **strekking** van de vergelijking blijft overeind in élke gelijke doorsnede — licentie tegen licentie: 7.367 vs. 5.820 (**+27%**); totaal jaar 1 lijst: 9.452 vs. 7.100 (**+33%**); online tegen online: 9.083,65 vs. 6.809 (**+33%**). Oftewel: **één Acumen Fuse-seat kost ruwweg een derde méér dan een volledige P6 Professional-licentie**, terwijl Fuse zelf geen enkele planning kan maken. Ter contrast noemt dezelfde P6-productpagina een capaciteit van "up to 100,000 activities" — tegenover Open Plan's gedocumenteerde typische gebruik van 2.000–5.000 activiteiten.

**Afgeleide getallen (berekend, expliciet als afleiding gemarkeerd):**
- Onderhoudspercentage **Fuse**: 2.085 / 7.367 = **28,3% van de licentieprijs per jaar** — fors **bóven** de door Vendr genoemde Deltek-bandbreedte van 18–22%.
- Onderhoudspercentage **Full Suite**: 3.241 / 14.734 = **22,0% per jaar**. De suite is dus zowel per module als in onderhoud relatief goedkoper dan losse aankoop.
- **SCHATTING** bij een koers van ± AUD 1 = EUR 0,57 = USD 0,66 (medio 2026, niet geverifieerd — behandel als indicatie): Fuse-licentie ≈ **EUR 4.200 / USD 4.900** per seat; volledige suite ≈ **EUR 8.400 / USD 9.700** per seat; jaarlijks onderhoud Fuse ≈ **EUR 1.190 / USD 1.375**.
- Totale eigendomskosten Fuse over 5 jaar per seat (**SCHATTING**): 7.367 + 5 × 2.085 ≈ **AUD 17.792** (≈ EUR 10.100).

> **Correctienoot t.o.v. eerdere versies van dit profiel:** een eerdere meting via de *staging*-omgeving van dezelfde reseller gaf AUD 8.772 totaal met AUD 1.935 onderhoud. Die cijfers zijn **vervangen** door de hierboven vermelde live-geverifieerde bedragen met expliciete licentie/onderhoud-splitsing. De staging-omgeving bevatte een verouderde momentopname.

### 3.3 Gerapporteerde/afgeleide bedragen uit derde bronnen (met kanttekening)

| Bron | Bedrag | Kanttekening |
|---|---|---|
| **Vendr** marketplace (Deltek breed) | Mediaan **USD 19.990/jaar** over **32 aankopen**; bandbreedte **USD 9.099 – 39.500**. Onderhoud "18–22% of license costs" jaarlijks bij perpetual. Implementatie "40–80% of first-year software costs". Onderhandelingsruimte 15–25% onder de eerste offerte bij meerjarige cloudverbintenis, plus 10–18% bij volume/concurrentiedruk. Perpetual licenties "priced per concurrent or named user". | **Deltek-breed**, dus inclusief Costpoint/Vantagepoint/Vision. **Niet** specifiek Open Plan of Acumen. Gebruik als contract-orde-van-grootte, niet als productprijs. |
| **ITQlick** | "The sticker price is **$75 per user/month**" voor "Acumen"; elders op dezelfde site: "Safran Risk license starts at $1,200 per user per year". | ITQlick genereert schattingen algoritmisch; de USD 75/maand is **niet** herleidbaar tot een Deltek-prijslijst en strookt niet met het perpetual-model van de reseller. **Behandel als onbetrouwbaar.** |
| **ZipRecruiter Q&A** | "costs can range from several thousand to tens of thousands of dollars annually", afhankelijk van licentieopties, gebruikersaantal en deploymentmethode. | Anonieme, niet-onderbouwde bron; alleen bruikbaar als orde-van-grootte-bevestiging. |

### 3.4 Open Plan-prijzen: expliciet niet gevonden

Ondanks gerichte zoekacties op resellers (Prescience AU, Connexion Systems AU, Ten Six US, Prime PMO, MESLI FR, APP Consultoria), GSA eLibrary/Advantage, aanbestedingsdatabases en prijsaggregators is er **geen enkele publieke prijs voor Deltek Open Plan** gevonden — noch per seat, noch per concurrent user, noch als enterprise-staffel. Resellers die Acumen wél met prijs in de webshop zetten (Prescience) verkopen Open Plan niet online.

**Wat wél vaststaat over het licentiemodel:**
- Perpetual licenties per **concurrent of named user**, met jaarlijks onderhoud (Vendr).
- Open Plan kent twee edities (Professional / Desktop) met een prijsverschil — Desktop is bedoeld als goedkopere teamlid-licentie.
- Deltek waarschuwt in de technical overview: "Specific server hardware configurations may have an impact on your overall Deltek product licensing requirements" — er is dus een **hardware-/coregebonden component** in de licentievoorwaarden voor serverdeployments. Dat is een klassieke bron van onverwachte kosten bij virtualisatie.
- Minimale afname, enterprise-staffels en modulepakketten: **geen publieke informatie**.

**[SCHATTING] Orde van grootte Open Plan zelf.** Gegeven dat (a) Acumen Fuse — een niche-analysetool zonder planningsfunctionaliteit — AUD 7.367 per user perpetual kost, (b) Open Plan een zwaardere, database-gebonden enterprise-scheduler is met server-side componenten en een hardware-gebonden licentieclausule, en (c) de Deltek-brede onderhoudspercentages van 18–22%, is een plausibele bandbreedte **USD 5.000–12.000 per named user perpetual + 18–25% jaarlijks onderhoud**, of **USD 2.000–4.500 per gebruiker per jaar** in een abonnementsvorm. Dit is een afgeleide schatting, geen gepubliceerde prijs.

> **Advies bij prijsvergelijking:** ga er in een businesscase van uit dat één volledig uitgeruste EVMS-planner (Open Plan Professional + Acumen Fuse + Acumen Risk + aandeel Cobra) **ordegrootte EUR 15.000–25.000 per seat aan eerstejaars licentiekosten** vergt, plus 18–28% onderhoud en implementatie die 40–80% van de softwarekosten kan bedragen. Voor een volledige toolchain met 25–50 gebruikers komt een eerste jaar realistisch op **USD 250.000–750.000**. **Dit zijn schattingen**, samengesteld uit de Prescience-lijstprijzen en de Vendr-benchmarks; het is géén Deltek-offerte.
>
> ⚠️ **Tegenbewijs op deze schatting (nieuw, V7).** Dezelfde Vendr-pagina die als onderbouwing dient, geeft een *eigen* eerstejaarscijfer dat hier haaks op staat: "total first-year costs for mid-market deployments (**50–200 users**) commonly fall between **$150,000 and $600,000**". Vendr komt dus voor een 2–4× grotere gebruikersgroep op een *lager* bedrag uit. Per gebruiker scheelt dat ruwweg een factor 3–5. Mogelijke verklaringen: Vendr's mediaan wordt gedomineerd door Costpoint/Vantagepoint-abonnementen in plaats van per-seat PPM-licenties, en de EVMS-toolchain hierboven stapelt vier tot vijf producten per seat. Hoe dan ook: **behandel de USD 250.000–750.000 als een bovengrens-scenario, niet als een centrale schatting**, en gebruik Vendr's 150k–600k als tegenwicht.

---

## 4. Voordelen

1. **De diepste schedule-kwaliteitsmotor op de markt.** 600+ metrics uitgelijnd op DCMA, DECM, DOE, NASA, GAO en AACE, met configureerbare drempels, eigen metric-taal (Metric Developers Guide) en filterexpressies. Concurrenten als Steelray, Schedule Analyzer of ScheduleLens dekken een deelverzameling; vergelijkende artikelen noemen Fuse consequent "the deepest option" en de lichtere tools "lighter alternatives".

2. **De facto standaard in de Amerikaanse defensie-EVMS-keten.** Deltek levert DECM 8.0 (nov 2025) en de DOE EVMS/IRSA-metricsets mee zoals de agentschappen ze publiceren. Bij IBR's, PMR's en DCMA-reviews is een Fuse-rapport een geaccepteerd bewijsstuk. Ten Six: de inbouw van de 14-point assessment is "among the primary reasons for Acumen's growing popularity".

3. **Fuse is leveranciersagnostisch — dat is de kern van zijn commerciële succes.** Eén analysemotor over P6 (XER/XML/Web), MS Project (met én zonder MSP geïnstalleerd), Project Online/Server, Safran 25.1, Asta Powerproject 17.3/18, Phoenix 5.6, Ares Prism G2, Open Plan en IPMDAR SPD/CPD. Een workbook mag **onbeperkt** externe bronlinks bevatten, met automatische default field-mapping. Voor een programmabureau dat schema's van twintig onderaannemers in vijf verschillende tools ontvangt, is er weinig alternatief.

4. **Forensische vertragingsanalyse zit erin, geen aparte claim-tool nodig.** Geautomatiseerde snapshot-vergelijking plus **half-step delay analysis** die voortgang scheidt van scope-wijziging, met audit-documentatie als output. Dat vervangt handwerk dat elders per claim wordt ingehuurd.

5. **Open Plan combineert dingen die zelden in één product zitten:** échte multi-project resource-limited scheduling (met splitting/stretching/reprofiling), ingebouwde Monte Carlo (geen add-on), master/subproject-hiërarchie met gedeelde kalender-/resource-/codebestanden, en een native tweerichtingskoppeling met een volwaardige EVM-kostenmotor (Cobra). Primavera P6 heeft dat laatste niet zonder derde partij.

6. **Bewezen op extreme schaal in batch.** Boeing IDS draaide met Open Plan + Cobra **wekelijkse** earned value over duizenden projecten, met honderden baseline-updates per maand, "purely in a batch mode". Open Plan levert een Batch Processor Guide en Data Tool Guide als standaarddocumentatie — batchautomatisering is een ondersteund, geen geïmproviseerd scenario.

7. **Compliance- en governancefuncties die commerciële planners niet hebben.** In 8.8: audit log **altijd aan** (niet uitschakelbaar), rolgebaseerde beveiliging via PPM Administrator met gecentraliseerde authenticatie en wachtwoordbeleid, en **Authorized Control Countries** — toegangsbeperking op nationaliteit/land voor exportgecontroleerde programma's, met automatische hervalidatie bij wijziging van ACC of ACL en projecteigendom op ACC-basis. Voor ITAR-gereguleerd werk is dit een harde vereiste die weinig planners invullen.

8. **Fuse schaalt ruim in activiteitenaantallen.** 64-bit, multi-threaded, gebruikt alle beschikbare cores voor diagnostics en risicoanalyse; 8 GB RAM volstaat voor > 50.000 activiteiten per workbook; Deltek claimt 500.000+ activiteiten over projecten heen. Voor een analysetool is dat ruim voldoende.

9. **Kwantitatief risicomanagement dat verder gaat dan drie-puntschattingen.** Acumen Risk combineert een discreet risicoregister (kans × impact), uncertainty factors en risk drivers, met cost-schedule integration en de mogelijkheid om een risk-adjusted schedule op elke gewenste P-waarde terug te publiceren naar de bronplanner. Acumen 360 genereert daar bovenop automatisch versnellingsscenario's.

10. **De rekenkern is publiek gedocumenteerd — uniek in deze markt.** De Developer Guide beschrijft niet alleen wat de engine doet maar hóé: topologische sortering, forward/backward pass, **zes floattypen inclusief relationship total/free float**, de omgang met meerdere kalenders, discontinue activiteiten, hammocks en subprojecten, de twee resource-schedulingmethoden met hun versoepelingsattributen, en zelfs de sampling-internals van de Monte Carlo. Geen enkele grote concurrent publiceert dit niveau van detail. Voor wie een eigen CPM-solver bouwt of valideert is dit de meest bruikbare openbare referentie die er is.

11. **EVM zit in het datamodel, niet in een rapportagelaag.** `BAC_QTY` / `BCWS_QTY` / `BCWP_QTY` / `ACWP_QTY` / `ETC_QTY` staan op activiteitniveau, met vier resourceklassen (Labor / Material / ODC / Subcontract) die daarnaartoe oprollen. In combinatie met de tweewegkoppeling naar Cobra betekent dat: geen zelfgebouwde brug tussen planning en earned value, geen maandelijkse reconciliatie-exercitie. Dat is het structurele verschil met bouwplanners waar EVM een bolt-on is.

12. **Diep automatiseerbaar via het OLE/COM-objectmodel.** Volledig lees- én schrijfbaar, met honderden gedocumenteerde properties en methods, plus scriptbare generieke import/export-specificaties (inclusief hiërarchische XML met XSL-stylesheet) en een gepubliceerd ERD. Wie batchverwerking, massale statusupdates of eigen integraties wil bouwen, kan dat — mits op Windows.

13. **Actief onderhouden, niet in onderhoudsmodus.** Open Plan 8.8 verscheen april 2026 met nieuwe PPM Administrator-integratie, ACC, Jira Data Center-import, spellingcontrole op activiteitomschrijvingen en verbeterde Find & Replace; Acumen 8.11 verscheen december 2025 met GenAI-risicogeneratie, PPM Risk-ondersteuning, P6 24.12-support en half-step snapshot-import. De read-only REST API is van mei 2026. Voor een product uit 1985 is dat een respectabel investeringsniveau.

---

## 5. Nadelen

1. **Volstrekt ondoorzichtige prijsstelling, met name voor Open Plan.** Er bestaat geen enkele publieke prijs. Geen proefversie, geen gratis editie, geen zelfbedieningsaankoop. Elke evaluatie begint met een salesgesprek. SmartPM noemt dit expliciet als "procurement friction". En waar wél een prijs bekend is (Acumen via de Australische partner) blijkt die stevig: **AUD 7.367 licentie + AUD 2.085 onderhoud = AUD 9.452 per gebruiker voor alleen Fuse**, AUD 17.975 voor de suite. Het onderhoud op Fuse is **28,3% van de licentieprijs per jaar** — ruim boven de 18–22%-bandbreedte die **Vendr** voor Deltek-contracten noemt (*gecorrigeerd: die bandbreedte is een Vendr-schatting, niet door Deltek gepubliceerd — zie Verificatie V3*), en na vier jaar heb je de licentie een tweede keer betaald.

2. **Windows-only fat client; er is geen echte web- of cloudversie.** Open Plan gebruikt een twee-tier architectuur zonder applicatieserver of browserclient; Acumen is single-tier desktop. "Cloud" bij Deltek PPM betekent Citrix Virtual Apps, VMware Horizon of een gehoste VM. Aggregatoren die "SaaS", "Cloud-based" of "Web, Android, iPhone/iPad" vermelden (SourceForge, Slashdot, Capterra) zijn feitelijk onjuist. Geen macOS, geen Linux, geen mobiel, geen browser.

3. **Verouderde technologiestack.** .NET Framework 4.8 (niet .NET 8/9), OLE DB-providers uit het SQL Server 2012-tijdperk, **Microsoft Access als officieel ondersteunde database**, MAPI-mailondersteuning die pas in 8.8 (2026) is uitgefaseerd, en een 32-bit variant die nog steeds in omloop is met een hard plafond van 3–4 GB geheugen. Deltek waarschuwt zelf dat client/server over een router of firewall "often yields poor performance" — het aanbevolen antwoord is Citrix, niet een moderne architectuur.

4. **Bescheiden schaal per project in Open Plan.** Deltek's eigen definitie van typisch gebruik is **2.000–5.000 activiteiten, één project tegelijk**, en de gedocumenteerde "small" client/server-installatie is **1–25 gelijktijdige gebruikers**. Voor een moderne megaproject-IMS van 50.000+ regels of een omgeving met honderden planners is dat geen comfortabele uitgangspositie. (Fuse schaalt beduidend beter dan Open Plan — de bottleneck zit in de planner, niet in de analysator.)

5. **Concrete functionele defecten in recente releases — inclusief in de rekenkern.** De Open Plan 8.8 release notes (april 2026) documenteren onder meer:
   - *Defect 2272045*: "the Late Start Date displayed a date that was after the Late Finish Date" — een backward-pass-fout, alle gebruikers geraakt, geen workaround.
   - *Defect 2444140*: "Activities with an actual start displayed a zero float" — alle gebruikers, geen workaround.
   - *Defect 1987241*: "When you closed a project in Open Plan, the application would sometimes crash unexpectedly."
   - *Defect 880771*: bij een Primavera P6-webimport importeerde Open Plan **geen child calendars**.
   - *Defect 1076292*: bij export naar Microsoft Project Server "discrepancies might occur in the values for the Task Duration, Start, and Finish fields".
   - *Defect 2322838*: bij een Windows-regio met DD/MM/YYYY converteerde de datumkiezer naar MM/DD/YYYY — een klassieke internationalisatiefout die Europese gebruikers direct raakt.
   - *Defect 2400353*: Open Plan "would appear to freeze" na een undo op een user-defined validation.
   - Verschillende defecten treden alleen op in **Shared mode**, met als workaround "Open the project in Exclusive mode" — wat het multi-user-verkoopargument ondermijnt.

6. **Zwakke, gedateerde en asymmetrische integratiemogelijkheden.** Acumen's "API" is **geen API**: het is een XML-exporthaak via configuratiebestand die een menu-item in de desktop-UI aanmaakt en na een muisklik een extern programma start. Er is geen REST-endpoint, geen CLI, geen SDK, geen headless modus — wie Fuse in een CI/CD- of geautomatiseerde-reviewpijplijn wil hangen, moet het aparte, betaalde Touchstone-portaal kopen. Open Plan is beter af, maar niet modern: de REST API bestaat pas sinds mei 2026, vereist een aparte IIS-server en is **expliciet read-only**; schrijven kan alleen via het **OLE/COM-objectmodel** (Windows-only, in-proces, VB-tijdperk), via user-defined importscripts of rechtstreeks op de database. Er zijn geen webhooks, geen event-model en geen platformonafhankelijke SDK. Aandachtspunt voor security: commando's die in de UI via Deltek EPM zijn afgeschermd blijven volgens de Developer Guide **wél** bereikbaar voor automatiseringsapplicaties.

7. **Sterke vendor lock-in en broze versiekoppeling binnen de suite.** Open Plan is pas echt zinvol samen met Cobra, PM Compass en wInsight Analytics. De versiematrix is strikt: Acumen 8.11 ondersteunt Open Plan 8.6/8.7/8.8 en Cobra 8.6/8.7; alle producten delen een database met een gezamenlijk encryptiemodel, waardoor "older versions of other PPM products that do not support the new encryption protocol will neither function nor integrate with Open Plan 8.8". Er is een aparte PPM Encryption Conversion Utility, een Unicode-conversiestap, en de waarschuwing "You must not install Acumen tables in an existing Deltek database that has wInsight installed". Upgraden is een programma, geen klik.

8. **Vrijwel geen publieke gebruikersreviews en een minuscule community.** Dit is opvallend en zelf een bevinding:
   - **Capterra**: 1 (één) review van Open Plan.
   - **Software Advice** (Deltek Acumen): **0 reviews**.
   - **SourceForge**: 0 reviews voor zowel Open Plan als Acumen ("Be the first to provide a review").
   - **Slashdot**: "No User Reviews."
   - **6sense**: 57 gedetecteerde klantdomeinen, #24 in de categorie.
   - Reddit-discussies over Acumen Fuse zijn schaars en oud (de meest geciteerde r/projectmanagement-thread dateert uit 2014).
   Wie onafhankelijke informatie zoekt, vindt vooral leveranciers- en partnermarketing. Voor een aankoopbeslissing van deze omvang is dat een reëel risico.

9. **Kennisschaarste in de markt en de facto verplichte consultancy.** De enige gepubliceerde Capterra-review noemt als nadeel letterlijk: *"Great tool but lack of knowledgeable resources in the market, sometimes the software crashes multiple times."* Implementatiepartners (MESLI, Prescience, Ten Six, Prime PMO, APP Consultoria, Connexion, PrimePM) benadrukken allemaal dat "integration services and training" nodig zijn voor "lasting adoption". Deltek zelf adviseert bij een Acumen-upgrade een test-deployment met een **30–45 dagen** UAT-periode en het reviewen van custom werk "at least eight weeks prior to your intended go-live date".

10. **Modernisering- en beveiligingsgaten.** Acumen **ondersteunt geen tweefactorauthenticatie** richting Primavera P6 Web of MS Project Server — de gedocumenteerde workaround is het aanmaken van app passwords. De GenAI-functies in 8.11 vereisen dat de klant zelf een Azure OpenAI-abonnement regelt en de API key in een dialoogvenster plakt; er is geen ingebouwde, gecontroleerde dienst.

11. **Alleen Engels.** Beide producten worden in één taal geleverd (SaaSCounter: "Language: English only"; SourceForge: "Languages: English"). Geen Nederlandse, Franse of Duitse UI, geen gelokaliseerde documentatie. In combinatie met de gedocumenteerde DD/MM/YYYY-bug is dit een concreet obstakel voor Europese teams.

12. **Fuse is geen planner — je hebt altijd een tweede licentie nodig.** Je kunt in S1 // Projects data bewerken en cleansen, en scenario's terugpubliceren naar bijvoorbeeld P6 XER, maar de bron van waarheid blijft P6, MS Project, Open Plan of Asta. Fuse is een dure aanvullende laag bovenop een bestaande planningsinvestering, geen vervanging ervan.

13. **Risicoanalyse in Open Plan is beperkt tot duur.** De documentatie behandelt uitsluitend duur-onzekerheid met drie-puntschattingen; kosten- en resourcerisico ontbreken. Wie kostenrisico wil, moet Acumen Risk erbij kopen — een tweede licentie van vergelijkbare prijs. Bovendien is de sampling-implementatie naar moderne maatstaven grof: pseudo-random getallen uit een bereik van 0–32767, en normale verdelingen benaderd door twaalf random getallen op te tellen met bewuste verwaarlozing van de staarten (Developer Guide, hoofdstuk *Operating Characteristics of Risk Analysis*).

14. **De DCMA-score is minder objectief dan hij oogt — en dat is een risico voor iedereen die erop stuurt.** Twee onafhankelijke bronnen:
    - **Mosaic Projects** (white paper WP1088): *"The implementation of the DCMA 14-Point Assessment in the various software tools is **not certified** by the DCMA or any other body and **varies between the tools**! The biggest issue is around counting of the number of tasks to be considered."* De telbasis (wel/niet meetellen van voltooide taken, LOE, summary-taken en mijlpalen) veranderde tussen de 2009- en 2012-versies van de DCMA-richtlijn. Dezelfde planning krijgt in Fuse, Steelray en Schedule Inspector dus verschillende scores. Mosaic waarschuwt bovendien dat conformiteit aan de checks "does not of itself indicate the schedule is sensible, realistic, and achievable — correlation is not the same as causation".
    - **HKA** over Fuse' eigen **Schedule Quality Index**: de *activity-based* en *metric-based* berekeningsmethoden geven op **identieke data** respectievelijk **41 (slecht)** en **88 (goed)**. Een activiteit die op slechts één van de negen metrics faalt scoort 82–91% metric-based maar **0%** activity-based. Een Fuse-score is dus pas betekenisvol als de gekozen methode en telbasis erbij geleverd worden.
    Praktisch gevolg: omdat de checks publiek en bekend zijn, is *teaching to the test* (lags herschrijven als activiteiten, hard constraints verstoppen achter zachte, LOE-taken herclassificeren) een reëel gedragsrisico dat Fuse niet oplost en deels zelfs aanmoedigt.

15. **Cloud-native concurrentie valt precies de zwakke plekken aan.** Kazinex omschrijft Fuse' twee aankoopdrempels als *"desktop installation (IT approval, license servers, Windows-only) and enterprise pricing (thousands per seat, per year)"*; Nodes & Links stelt dat Fuse *"buries teams under menus, tabs, and manuals; it demands specialist training and slows adoption"*, dat toegang beperkt blijft tot enkele specialisten ("when your experts are out, so are your insights"), en verwijst naar "the slow QSRA engine" van Fuse+Risk. **Dit zijn concurrenten en dus gekleurde bronnen** — maar elk van deze punten is onafhankelijk bevestigd door Deltek's eigen documentatie (Windows-only single-tier desktop, 8 GB RAM bij >50k activiteiten, instelbaar threadmaximum voor risicoanalyse sinds 8.3, aparte Metric Developers Guide, commerciële trainingsmarkt).

---

## 6. Interoperabiliteit — de kernvraag voor een IFC-gebaseerde planner

### 6.1 Open Plan — import/export

| Kanaal | Import | Export | Opmerking |
|---|:---:|:---:|---|
| **Primavera P6 — XER** | ✅ | ✅ | Oracle Primavera Import Wizard; P6 20.12 t/m 24.12 ondersteund |
| **Primavera P6 — XML (P6 XML)** | ✅ | ✅ | |
| **Primavera P6 Web (Web Services)** | ✅ | ✅ | Bekende bug: child calendars werden niet geïmporteerd (opgelost in 8.8) |
| **Primavera Project Planner (P3)** | ✅ | ❌ | **Alleen import** (legacy) |
| **Microsoft Project — .mpp** | ✅ | ✅ | MS Project Standard/Professional 2021 & 2024 |
| **Microsoft Project Server** | ✅ | ✅ | Project Server 2016/2019; bekende afwijkingen in Duration/Start/Finish bij export |
| **Open Plan BK3** | ✅ | ❌ | Alleen import (eigen legacy-backupformaat) |
| **Excel (.xlsx)** | ✅ | ✅ | Specifiek voor CAM Estimate-to-Complete baselinedata |
| **Externe MRP-systemen** | ✅ | ❌ | MRP ETC-baselinedata |
| **General Import/Export (scripts)** | ✅ | ✅ | User-defined scripts naar "a wide range of external applications", met filtering en sortering |
| **Jira** | ✅ | ❌ | Nieuw in 8.8; Jira Data Center 9.17 / 10.7; met validatie-preview |
| **IPMDAR Schedule Performance Format** | ✅ | ✅ | Genoemd als ondersteunde "scheduling tool" in de technical overview |
| **Kidasa Milestones Professional** | ✅ | ✅ | Via add-in module |
| **Deltek Cobra / PM Compass / wInsight / Acumen** | ✅ | ✅ | Native, via gedeelde database |
| **REST API** | ✅ (lezen) | ❌ | Read-only, OpenAPI 3.0, IIS-service, vanaf 8.8 CU01 |
| **Directe database** | ✅ | ✅ | SQL Server / Oracle / Access; ERD is gepubliceerd |
| **CSV** | ⚠️ | ⚠️ | Alleen via de generieke script-import/export; geen native CSV-schemadefinitie |
| **IFC / IFC 4.3 / IfcWorkSchedule / IfcTask** | ❌ | ❌ | **Volledig afwezig** |

### 6.2 Acumen — ondersteunde bronnen

**Import (per workbook onbeperkt aantal gelinkte bronnen, met default field-mapping):**
- Microsoft Project Standard/Professional 2021 & 2024, Project Online, Project Server 2016/2019. Acumen leest `.mpp` **direct**, zonder dat MS Project geïnstalleerd hoeft te zijn.
- Oracle Primavera P6 20.12 / 21.12 / 22.12 / 23.12 / 24.12 — via **XER, XML én P6 Web Services**.
- Oracle Primavera Risk Analysis 8.x.
- Safran 25.1 (met WBS-mapping via outline codes), Asta Powerproject 17.3 / 18, Phoenix 5.6, Ares Prism G2.
- Deltek Open Plan 8.6 / 8.7 / 8.8, Deltek Cobra 8.6 / 8.7, wInsight 8.3.2–8.3.4.
- **IPMDAR Schedule Performance Format (SPD)** en **IPMDAR Contract Performance Format (CPD)**.
- **UN/CEFACT XML (IPMDR Format 6 v1.0)** — een echte open XML-standaard.
- Microsoft Excel; **CSV voor kostendata** (er is een apart document *Cost Data CSV Structure*).
- DOE PARS-data (schema, kosten, risico) vóór indiening.

**Export/publish:** Primavera P6 XER, Excel, PowerPoint, Word, DCDE-bestand (voor import in wInsight via wInsight Administrator), plus de XML-datastroom van de "API"-haak. Deltek: geoptimaliseerde schema's kunnen "exported back to these native tools with full logic preserved".

**Niet ondersteund:** IFC, IFC 4.3, IfcWorkSchedule, IfcTask, IfcTaskTime, bcf, glTF, of enig ander buildingSMART-formaat. Geen 4D-viewer, geen BIM-model-koppeling, geen model-based quantities.

### 6.3 Beoordeling voor een open-source, IFC-gebaseerde planner

**Het harde feit: er is nul overlap op IFC.** Deltek's hele interoperabiliteitsmodel is gebouwd rond (a) leveranciersformaten uit de planningswereld — XER en MPP — en (b) **defensie-EVM-rapportageformaten** — IPMDAR SPD/CPD en UN/CEFACT. De bouwsector-standaarden van buildingSMART komen in geen enkel Deltek-PPM-document voor. Zoekacties op "Deltek + IFC/BIM/buildingSMART" leveren uitsluitend generieke productbeschrijvingen op zonder enige vermelding van BIM-ondersteuning.

**Praktische koppelroutes, in volgorde van haalbaarheid:**

1. **XER (Primavera-uitwisselingsformaat) — de lingua franca.** Zowel Open Plan als Acumen lezen en schrijven XER. Als jouw planner XER kan exporteren, is het schema direct analyseerbaar in Fuse en importeerbaar in Open Plan. Nadeel: XER is een ongedocumenteerd, versiegebonden, tab-gescheiden Oracle-formaat — reverse-engineered, niet open.

2. **UN/CEFACT XML (IPMDR Format 6 v1.0) — de beste open brug.** Acumen ondersteunt dit expliciet. Dit is een *echte* open XML-standaard voor projectschema-uitwisseling (UN/CEFACT Project Schedule Message). Voor een open-source project dat principieel geen gereverse-engineerde leveranciersformaten wil schrijven, is dit veruit de nettste route naar het Deltek-ecosysteem — en meteen ook naar de Amerikaanse defensiemarkt, want IPMDAR SPD is daar de verplichte leveringsvorm.

3. **MSPDI/MPP.** Open Plan importeert/exporteert `.mpp` en Project Server; Acumen leest `.mpp` direct. MSPDI (het XML-formaat van MS Project) wordt niet expliciet genoemd in de Deltek-documentatie — alleen `.mpp`. Reken dus niet op MSPDI-ondersteuning zonder test.

4. **Open Plan "General Import/Export" met user-defined scripts + het gepubliceerde ERD.** Technisch mogelijk om een eigen koppeling te bouwen, maar fragiel, versiegebonden en niet ondersteund als integratiepad.

5. **REST API.** Alleen Open Plan, alleen lezen, alleen vanaf 8.8 CU01, en alleen als de klant de aparte IIS-service heeft uitgerold. Niet bruikbaar voor het *schrijven* van planningsdata.

**Wat je hieruit kunt meenemen voor het eigen product:**
- **De strategische opening is duidelijk.** Deltek biedt geen IFC, geen 4D, geen cross-platform client, geen schrijfbare API en geen lokalisatie. Een open, IFC 4.3-native, browser- en desktopdraaiende planner concurreert niet frontaal met Open Plan in de EVMS-niche, maar bezet exact het terrein dat Deltek leeg laat: modelgebaseerde bouwplanning.
- **De meest waardevolle kopieerbare functie is niet de CPM-engine maar de metric-laag.** Fuse verkoopt voor ± EUR 5.000 per seat op basis van configureerbare kwaliteitsmetrics met drempels en filters. Een open implementatie van DCMA 14-point (de checks zijn publiek en goed gedocumenteerd) bovenop een IFC-planner is een sterke, goedkoop te bouwen differentiator.
- **Prioriteer XER-export en UN/CEFACT-XML-export** als je toegang wilt tot deze markt. Beide zijn eenrichting-genoeg om nuttig te zijn: XER voor P6-omgevingen, UN/CEFACT voor overheid/defensie én voor Fuse-analyse.

---

## 7. Marktpositie

### 7.1 Waar sterk, en waarom

**Open Plan** is sterk waar drie voorwaarden samenvallen: (a) een contractuele **EIA-748 EVMS**-verplichting, (b) de noodzaak van **strakke cost-schedule-integratie** met een echte EVM-kostenmotor, en (c) **exportcontrole/toegangsgovernance** op programmaniveau. Dat is in de praktijk de Amerikaanse defensie- en energiedepartementketen: DoD-primes en hun subs, DOE-labs, NASA-programma's. De koppeling Open Plan → Cobra (time-phased baselines in Cobra-perioden) is daar het onderscheidende technische argument; Primavera P6 kan dat niet zonder derde partij.

**Acumen Fuse** is sterk om een andere reden: het is **tool-agnostisch** en heeft daardoor een veel groter adresseerbaar bereik dan de planner waarvoor het oorspronkelijk werd gebouwd. Elke organisatie die schema's van derden moet beoordelen — een programmabureau, een claim-adviseur, een PMO met een gemengd tool-landschap — kan Fuse kopen zonder de rest van Deltek. De DCMA/DECM-inbouw maakt het bovendien tot het pad van de minste weerstand voor compliance.

### 7.2 Belangrijkste concurrenten

**Voor Open Plan (planning/EVM):**
- **Oracle Primavera P6** — de dominante speler *in de CPM-planningsniche*; 6sense schat 20,05% marktaandeel tegenover 0,15% voor Open Plan. **Nuance (gecorrigeerd, zie V6):** in 6sense's eigen categorie "project management" is P6 niet de nummer 1 — **Teamwork leidt met 48,07%**, P6 is #2. Die categorie mengt echter lichte samenwerkingstools met echte CPM-planners; voor de EVMS/CPM-markt blijft P6 de referentie. Grotere community, meer trainers, meer add-ons.
- **Microsoft Project / Project Online / Project for the Web** — 5,77% (6sense), veel goedkoper en universeel.
- **Safran Project** (Noorwegen), **Asta Powerproject** (Elecosoft, VK), **Phoenix Project Manager**, **InEight** — alternatieve CPM-planners, sommige met eigen EVM.
- **forProject**, **Encore/Empower**, **MPM** — concurrenten van Cobra aan de EVM-kostenkant.
- **SAP Project System** (6,48%) in ERP-gedreven omgevingen.

**Voor Acumen Fuse (schedule-analytics):**
- **Steelray Project Analyzer** — het klassieke, lichtere alternatief; vergelijkingsartikelen positioneren Fuse als "the deepest option" en Steelray/Schedule Validator als "lighter alternatives".
- **Schedule Analyzer** (Ron Winter) — gevestigd in de forensische/claim-hoek.
- **Nodes & Links** — positioneert zich actief als "the #1 Acumen Fuse alternative"; AI-gedreven.
- **SmartPM** — richt zich op commerciële bouw in plaats van defensie; scoorde Fuse in een eigen vergelijking op 81/100 met lagere punten voor "ease of adoption" (7/10) en "portfolio visibility" (8/10), en noemt de ontbrekende publieke prijsstelling als frictie.
- **ScheduleLens**, **Planera**, **ScheduleReader/Schedule Validator**, **atombuild** — nieuwere, goedkopere DCMA-compliance-tools. Vergelijkende artikelen typeren enterprise-tools als Fuse als "advanced analytics but at significantly higher cost and complexity".
- Voor het risicodeel: **Barbecana Full Monte**, **Safran Risk** (± USD 1.200 per gebruiker per jaar volgens ITQlick — **schatting van derden**), **Primavera Risk Analysis** (legacy/uitgefaseerd), **@RISK for Project**.

### 7.3 Trend

**Open Plan: krimpend in relatieve marktaanwezigheid, stabiel in zijn niche.**
- 6sense: 0,15% marktaandeel, 57 gedetecteerde domeinen, #24 in de categorie (**schatting**, waarschijnlijk een onderschatting voor on-premise defensiesoftware).
- Nauwelijks nieuwe publieke reviews sinds jaren; geen zichtbare instroom van nieuwe klanten buiten de bestaande EVMS-keten.
- Maar: Deltek investeert nog steeds substantieel — 8.8 (april 2026) is een echte functionele release met nieuwe authenticatie-architectuur, exportcontrole (ACC), Jira-import en de eerste REST API in de productgeschiedenis.

**Acumen: stabiel tot licht groeiend, en het strategische zwaartepunt.**
- Deltek heeft de PPM-productlijn in 2026 herpositioneerd onder de noemer **"Delivery Assurance"** (de URL's zijn verhuisd van `/products/project-and-portfolio-management/` naar `/products/delivery-assurance/ppm/`), waarbij Acumen prominenter gepositioneerd is dan Open Plan.
- Acumen 8.11 (december 2025) voegde als eerste in de suite **GenAI**-functionaliteit toe, en ondersteuning voor **"PPM Risk"** — onderdeel van een nieuw platform dat Deltek **PPM NextGen** noemt (er is een eigen `PPM_NextGen_Help`-documentatiebundel, met "a centralized system for capturing risks, both threats and opportunities"). Dat suggereert dat Deltek's toekomstige investeringen richting een nieuw, waarschijnlijk cloudgeoriënteerd PPM-platform gaan, met Open Plan als legacy-planner die geïntegreerd blijft.
- Ten Six (2026): de 14-point-inbouw is "among the primary reasons for Acumen's **growing popularity** as a schedule quality and risk analysis tool".

### 7.4 Opvallende klanten en verplichtstellingen

- **Boeing Integrated Defense Systems** — sinds 1985 (Huntsville) en divisiebreed sinds 1996/97 gestandaardiseerd op Open Plan + Cobra; duizenden projecten, honderden baseline-updates per maand, wekelijkse earned value.
- **Lockheed Martin, BAE Systems, Siemens** — genoemd als gedetecteerde Open Plan-klanten (6sense; **detectie, geen bevestiging door de klant**).
- **U.S. Department of Energy** levert zijn eigen EVMS- en IRSA-metricsets mee in Acumen, inclusief instructie-PDF's, en verwijst gebruikers voor vragen naar "your DOE contact person" — een de facto institutionele verankering.
- **DCMA** publiceert DECM; Deltek levert versie 8.0 (nov 2025) mee in Acumen. Bij DoD-schemabeoordelingen is DECM-conformiteit in de praktijk verplicht, wat Fuse tot standaardgereedschap maakt bij prime contractors.
- **IPMDAR** (Integrated Program Management Data and Analysis Report) is het verplichte DoD-rapportageformaat; zowel Open Plan als Acumen ondersteunen SPD en CPD.

---

## 8. Eindoordeel

### Voor wie is dit de juiste keuze

- **Amerikaanse defensie-, aerospace-, DOE- en NASA-contractanten met een EIA-748-EVMS-verplichting.** Als DCMA-, DECM- of DOE-reviews onderdeel zijn van je contract, is Acumen Fuse bijna onvermijdelijk en Open Plan een verdedigbare IMS-keuze — zeker als Cobra al draait. De ACC-exportcontrole en het altijd-aan-audit-log zijn functies waarvoor nauwelijks alternatieven bestaan.
- **Bestaande Deltek-PPM-klanten.** Wie Cobra, PM Compass en wInsight al heeft, haalt uit Open Plan een integratieniveau (time-phased baselines in Cobra-perioden, gedeelde database) dat met P6 + derde partij duurder en brozer wordt.
- **Programmabureaus, PMO's en claim-/forensisch adviseurs met een heterogeen tool-landschap.** Voor deze groep is **Acumen Fuse alleen** — zonder Open Plan, zonder de rest van de suite — vaak de juiste aankoop. Eén licentie analyseert P6, MS Project, Asta, Safran, Phoenix, Ares Prism en IPMDAR-bestanden, inclusief forensische vergelijking. Dat is moeilijk te evenaren.
- **Organisaties die kwantitatief schemarisico serieus nemen** en de combinatie register + uncertainty + drivers + cost-schedule-integratie + P-waarde-terugpublicatie nodig hebben (Acumen Risk).

### Voor wie niet

- **Bouw en infrastructuur buiten de defensiecontext, zeker met BIM-ambities.** Nul IFC, nul 4D, nul modelkoppeling. Wie modelgebaseerd wil plannen, koopt hier het verkeerde product.
- **Organisaties die web, cloud, macOS, Linux of mobiel nodig hebben.** Beide producten zijn Windows-desktop; "cloud" is Citrix.
- **Kleine en middelgrote teams.** De combinatie van ondoorzichtige prijzen, ± EUR 5.000+ per seat voor alleen de analysator, ~22% jaarlijks onderhoud, implementatiekosten van 40–80% van de softwarekosten en verplichte consultancy maakt dit onhaalbaar onder een zekere programmaomvang.
- **Iedereen die programmatische, tweerichtings-integratie wil bouwen.** Acumen heeft geen echte API; Open Plan's REST API is read-only en jong. Automatiseringsambities lopen snel vast.
- **Niet-Engelstalige gebruikersgroepen**, zeker in DD/MM/YYYY-regio's gezien de recente datumformaat-defecten.
- **Organisaties die waarde hechten aan een levendige community en onafhankelijke informatie.** Met één Capterra-review, nul Software Advice-reviews en een handvol Reddit-draadjes uit het vorige decennium koop je hier grotendeels blind.

### Slotsom in één alinea

Open Plan is een technisch degelijke, functioneel rijke maar architectonisch verouderde CPM-planner die overleeft op contractuele verplichting in plaats van op concurrentiekracht: een Windows fat client uit het Welcom-tijdperk, met een read-only API uit 2026, een typische projectomvang van 2.000–5.000 activiteiten en release notes die nog steeds backward-pass-fouten en crashes bij projectsluiten repareren. Acumen Fuse is het interessantere product en het commercieel gezondere: een genuanceerde, diep gedocumenteerde kwaliteits- en forensische analysemotor die zijn waarde ontleent aan het feit dat hij *naast* elk ander planningspakket kan staan — en die daarmee, ironisch genoeg, de zwakte van Open Plan bevestigt. Voor een open-source, IFC-native planner is Deltek geen concurrent maar een aangrenzend ecosysteem waarnaar je via XER en UN/CEFACT-XML kunt exporteren, en waarvan je de metric-laag als inspiratie kunt nemen — terwijl je precies daar aanvalt waar Deltek structureel niets biedt: modelgebaseerde, open, cross-platform, meertalige planning.

---

## Bronnenlijst

Alle URL's opgehaald op **25 juli 2026** tenzij anders vermeld. Documentdatums staan tussen haakjes waar bekend.

### Leverancier — productpagina's
1. Deltek — Open Plan (nieuwe URL): https://www.deltek.com/products/delivery-assurance/ppm/open-plan/
2. Deltek — Open Plan (oude URL): https://www.deltek.com/en/products/project-and-portfolio-management/open-plan
3. Deltek — Acumen (suite): https://www.deltek.com/en/products/project-and-portfolio-management/acumen
4. Deltek — Acumen Fuse: https://www.deltek.com/products/delivery-assurance/ppm/acumen/fuse/ *(600+ metrics; "500K+ schedule activities across projects"; IPMDAR SPD/CPD; DOE PARS)*
5. Deltek — Acumen Fuse (alt. URL): https://www.deltek.com/en/products/project-and-portfolio-management/acumen/fuse
6. Deltek — PPM-productlijn: https://www.deltek.com/en/products/project-and-portfolio-management
7. Deltek — Acumen Touchstone: https://www.deltek.com/products/delivery-assurance/ppm/acumen/touchstone/

### Leverancier — technische documentatie en release notes (primaire bronnen)
8. **Deltek Open Plan 8.8 — Technical Overview and System Requirements** (PDF, gedateerd 22 april 2026, 23 p.): https://dsm.deltek.com/DeltekSoftwareManagerWebServices/downloadFile.ashx?documentid=01D9B814-EF9B-4339-B1C3-EEC05C1B54D8 *(twee-tier architectuur, OS/DB-matrix, geheugen- en schaalrichtlijnen, ondersteunde scheduling tools, PPM-versiematrix)*
9. **Deltek Open Plan 8.8 — Release Notes** (PDF, gedateerd 22 april 2026, 50 p.): https://dsm.deltek.com/DeltekSoftwareManagerWebServices/downloadFile.ashx?documentid=519ACB07-B7BA-4F4D-A3CC-991082CCA8AB *(PPM Administrator, ACC, Jira-import, wachtwoordbeleid, alle geciteerde defectnummers)*
10. **REST APIs for Deltek PPM Products — Release Notes** (PDF, gedateerd 29 mei 2026, 8 p.): https://dsm.deltek.com/DeltekSoftwareManagerWebServices/downloadFile.ashx?documentid=96DCA033-9CAE-4F8E-9C6C-DCF811E475CF *("secure, read-only REST API"; OpenAPI 3.0; Open Plan 8.8 CU01+)*
11. **Deltek Acumen 8.11 — Technical Overview and System Requirements** (PDF): https://dsm.deltek.com/DeltekSoftwareManagerWebServices/downloadFile.ashx?documentid=206E1395-B924-4F7E-89C5-AA9D4BEEFD7B *(single-tier, 64-bit, geheugen per activiteitenaantal, volledige lijst ondersteunde scheduling tools en formaten, Azure GPT-4o, geen 2FA)*
12. **Deltek Acumen 8.11 — Release Notes** (PDF, gedateerd 5 december 2025, 26 p.): https://dsm.deltek.com/DeltekSoftwareManagerWebServices/downloadFile.ashx?documentid=0372360E-AF7D-4079-8007-30844D8BA849 *(GenAI-risicogeneratie, DECM 8.0, DOE EVMS/IRSA-metrics, PPM Risk, penalty cap)*
13. **Deltek Acumen 8.11 — API Guide** (PDF, gedateerd 5 december 2025, 50 p.): https://dsm.deltek.com/DeltekSoftwareManagerWebServices/downloadFile.ashx?documentid=0194B850-8AFB-48C8-9559-D1DB50A02135 *(XML-exporthaak via Reportconfig.xml; datamodel)*
14. Deltek Open Plan 8.8 GA — documentatielijst: https://dsm.deltek.com/documentationlists/DeltekOpenPlan88GA.html
15. Deltek Acumen 8.11 GA — documentatielijst: https://dsm.deltek.com/documentationlists/DeltekAcumen811GA.html
16. Deltek Acumen 8.11 — Cost Data CSV Structure (PDF): https://dsm.deltek.com/DeltekSoftwareManagerWebServices/downloadFile.ashx?documentid=11253AE9-67BF-434B-99A9-7B315E699CCA
17. Deltek Acumen 8.11 — Metric Developers Guide (PDF): https://dsm.deltek.com/DeltekSoftwareManagerWebServices/downloadFile.ashx?documentid=44251CAD-F246-4304-B361-093857F36EB6
17a. **Deltek Open Plan 8.8 — Developer Guide** (PDF, gedateerd 22 april 2026, 723 p.): https://dsm.deltek.com/DeltekSoftwareManagerWebServices/downloadFile.ashx?documentid=0E423034-0FDB-449E-8505-2B9C9BD442EC *(OLE-automatiseringsobjectmodel met properties/methods; import- en exportfaciliteiten incl. XML-scripting; time analysis calculations met zes floattypen; resource scheduling calculations; risk analysis calculations incl. sampling-internals; cost calculations met BAC/BCWS/BCWP/ACWP/ETC; multi-project operations)*
17b. Deltek Open Plan 8.8 — Guided Tour (PDF, 22 april 2026, 90 p.): https://dsm.deltek.com/DeltekSoftwareManagerWebServices/downloadFile.ashx?documentid=14ECF4E6-72AE-4194-8069-5F9C068BDDCB *(workspace, Explorer, barchart-/network-/histogramviews, project properties, resourcebeheer)*
17c. Deltek Open Plan 8.8 — Batch Processor Guide: https://dsm.deltek.com/DeltekSoftwareManagerWebServices/downloadFile.ashx?documentid=05A9F83E-5CB5-4B55-9C89-AD023F4827C4
17d. Deltek Open Plan 8.8 — Entity Relationship Diagram: https://dsm.deltek.com/DeltekSoftwareManagerWebServices/downloadFile.ashx?documentid=0C4034F4-BD44-43BD-94BB-7ACBB539408C
17e. Deltek Acumen 8.11 — Technical Overview, sectie *Scheduling Tools* (volledige matrix P6 20.12–24.12, MSP 2021/2024, Safran 25.1, Phoenix 5.6, Powerproject 17.3/18, Ares Prism G2, IPMDAR SPD/CPD, UN/CEFACT IPMDR Format 6 v1.0, Open Plan 8.6–8.8, Cobra 8.6/8.7) — zie bron 11

### Leverancier — online help
18. Open Plan 8.8 — Welcome / architectuur: https://help.deltek.com/Product/OpenPlan/8.8/GA/welcome_to_deltek_open_plan_3xopp.html
19. Open Plan 8.8 — Project Analysis (CPM, resource scheduling, kosten, risico): https://help.deltek.com/Product/OpenPlan/8.8/GA/project_analysisopp.html
20. Open Plan 8.8 — Risk Analysis (Monte Carlo): https://help.deltek.com/Product/OpenPlan/8.8/GA/Risk_Analysis.html
21. Open Plan 8.8 — Import/Export-faciliteiten: https://help.deltek.com/Product/OpenPlan/8.8/GA/using_the_open_plan_import_and_export_facilitiesproj.html
22. Open Plan 8.8 — Calendars: https://help.deltek.com/Product/OpenPlan/8.8/GA/calendarscal.html
23. Open Plan 8.8 — Hierarchical Projects and Subprojects: https://help.deltek.com/Product/OpenPlan/8.8/GA/Hierarchical_Projects_and_Subprojects.html
24. Open Plan 8.8 — Exporting Data to Primavera P6: https://help.deltek.com/Product/OpenPlan/8.8/GA/Exporting_Data_to_Primavera_P6.html
25. Open Plan 8.8 — Importing Primavera P6 Data: https://help.deltek.com/Product/OpenPlan/8.8/GA/Importing_Primavera_P6_Data.html
26. Open Plan — versieoverzicht documentatie (3.3 t/m 8.8): https://help.deltek.com/Product/OpenPlan/
27. Acumen 8.11 — Informatiecentrum / welkom: https://help.deltek.com/Product/Acumen/8.11/GA/
28. Acumen 8.11 — Acumen Suite Tabs (S1–S5): https://help.deltek.com/Product/Acumen/8.11/GA/Acumen%20Suite%20Tabs.html
29. Acumen 8.11 — Monte Carlo Simulation Engine: https://help.deltek.com/Product/Acumen/8.11/GA/Monte%20Carlo%20Simulation%20Engine.html
30. Acumen — versieoverzicht documentatie (6.0 t/m 8.11): https://help.deltek.com/Product/Acumen/
31. Cobra 8.1 — Prepare the Open Plan Schedule (baseline in Cobra-perioden): https://help.deltek.com/Product/Cobra/8.1/GA/Prepare%20the%20Open%20Plan%20Schedule.html
32. Deltek Learning — P6 to Open Plan Crosswalk: https://learning.deltek.com/bundle/P6_to_Open_Plan_Crosswalk/ *(Welcom-historie; niet volledig fetchbaar — SPA)*
33. Deltek Learning — PPM NextGen Help: https://learning.deltek.com/bundle/PPM_NextGen_Help
34. Deltek Learning — Acumen Touchstone Introduction: https://learning.deltek.com/bundle/Acumen_Touchstone_Introduction_Overview_and_Navigation/

### Prijzen
35. **Prescience Technology (AU) — Deltek Acumen Fuse productpagina, LIVE geverifieerd 25-07-2026**: https://www.prescience.com.au/product/acumen-fuse/ *(Price Breakdown: Software Licence **AUD 7.367,00** + Annual Software Maintenance **AUD 2.085,00** = **AUD 9.452,00** Deltek-lijstprijs; online AUD 6.998,65 + 2.085,00 = 9.083,65; SKU ACFUS1-10-1; Term: Perpetual; per Application User; excl. GST; `priceValidUntil` 2027-12-31)*
35a. Prescience Technology — Deltek Acumen Risk+360 (add-on), live 25-07-2026: https://www.prescience.com.au/product/deltek-acumen-risk/ *(identiek: AUD 7.367 + 2.085 = 9.452; SKU ACRIS1-10-1; vereist bestaande Fuse)*
35b. Prescience Technology — Deltek Acumen Fuse+Risk+360 (Full Suite), live 25-07-2026: https://www.prescience.com.au/product/deltek-acumen-fuserisk360-full-suite/ *(AUD 14.734,00 + 3.241,00 = **17.975,00**; online 17.238,30; SKU ACRIS1-10-1-1; Touchstone alleen op aanvraag)*
36. **Prescience Technology (AU) — volledige softwarecatalogus**, live 25-07-2026: https://www.prescience.com.au/product-category/software/ *(bevat exact vijf producten: Acumen Fuse, Acumen Risk+360, Acumen Full Suite, P6 PPM, P6 EPPM — **geen Open Plan**; bewijs voor §3.4)*
36a. **Prescience — Oracle Primavera P6 Professional**, live 25-07-2026: https://www.prescience.com.au/product/primavera-p6-ppm/ *(Oracle-lijstprijs AUD 5.820 licentie + 1.280 onderhoud = 7.100; online totaal 6.809; "up to 100,000 activities"; "Our 5% online store discount applies to perpetual licence only")* — **corrigeert het prijsanker in §3.2, zie Verificatie V2**
36b. Prescience — Oracle Primavera P6 EPPM, live 25-07-2026: https://www.prescience.com.au/product/primavera-p6-eppm/ *(lijst AUD 6.360 + 1.399 = 7.759; online totaal 7.441)*
37. **Internet Archive Wayback Machine — Prescience Acumen Fuse, snapshot 22-06-2018**: https://web.archive.org/web/20180622154637/http://www.prescience.com.au/product/acumen-fuse/ *(AUD 6.472 licentie + 1.920 maintenance = 8.392; SKU ACFUS1-10-1)*
37a. Internet Archive Wayback Machine — Prescience Acumen Risk, snapshot 24-03-2019: https://web.archive.org/web/20190324020652/https://www.prescience.com.au/product/deltek-acumen-risk/ *(identieke bedragen; basis voor de prijsontwikkelingstabel in §3.2)*
37b. *(vervallen)* De eerder gebruikte staging-URL's `www.staging.prescience.com.au/...` bevatten een verouderde momentopname (AUD 8.772 totaal / 1.935 onderhoud) en zijn vervangen door de live-geverifieerde bedragen hierboven.
38. **Vendr — Deltek Software Pricing & Plans 2026**: https://www.vendr.com/marketplace/deltek *(mediaan USD 19.990/jaar over 32 aankopen; bandbreedte USD 9.099–39.500; onderhoud 18–22%; implementatie 40–80% van eerstejaars softwarekosten; onderhandelingsruimte 15–25%)*
39. PricingNow — Deltek Acumen Pricing (bijgewerkt 8 maart 2026): https://pricingnow.com/question/deltek-acumen-pricing/ *("Deltek does not publicly list its pricing"; geen bedragen)*
40. Capterra — Open Plan: https://www.capterra.com/p/10002329/Open-Plan/ *(startprijs "contact vendor"; 1 review; pro/con-citaten)*
41. Software Advice — Deltek Acumen: https://www.softwareadvice.com/risk-management/deltek-acumen-profile/ *("Contact for pricing"; 0 reviews)*
42. SaaSCounter — Deltek Open Plan: https://www.saascounter.com/products/deltek-open-plan *(maatwerkoffertes; Engels enige taal)*
43. ITQlick — Acumen pricing (zoeksnippet; **onbetrouwbaar**): https://www.itqlick.com/acumen/pricing *("$75 per user/month"; ook "Safran Risk … $1,200 per user per year")* — directe fetch HTTP 403
44. ZipRecruiter Q&A — "How much does a Deltek Acumen fuse cost?" (zoeksnippet): https://www.ziprecruiter.com/e/Acumen-Fuse-How-much-does-a-Deltek-Acumen-fuse-cost

### Reviews, vergelijkingen en marktdata
45. **6sense — Deltek Open Plan market share**: https://6sense.com/tech/project-management/deltek-open-plan-market-share *(0,15%; 57 domeinen; #24; geografie/omvang/sector; genoemde klanten)*
46. 6sense — Oracle Primavera Suite vs Deltek Open Plan: https://6sense.com/tech/project-management/oracleprimaverasuite-vs-deltekopenplan
47. SmartPM — Top Construction Project Control Tools Reviewed: https://smartpm.com/blog/top-construction-project-control-tools-reviewed *(Fuse 81/100; "pricing is not publicly advertised"; doelgroepvergelijking)*
48. Ten Six Consulting — Deltek Acumen Fuse and the DCMA's 14-Point Assessment: https://tensix.com/deltek-acumen-fuse-and-the-dcmas-14-point-assessment/ *(alle 14 checks; "growing popularity")*
49. Ten Six Consulting — Deltek Acumen Fuse (productoverzicht): https://tensix.com/deltek-acumen-fuse/ *(analyzers; 300+ metrics; benchmarking)*
50. MESLI Consulting — Deltek Acumen, a must-have for managing complex projects: https://www.mesli-consulting.com/deltek-acumen-a-must-have-for-managing-complex-projects/ *(implementatiecomplexiteit, leercurve, kostenkanttekening)*
51. Pinnacle Management Systems — Deltek Open Plan overview: https://www.pinnaclemanagement.com/blog/deltek-open-plan-overview *(Professional vs Desktop; hiërarchische top-down opzet vs P6; ingebouwde Monte Carlo; API/add-ins)*
52. Connexion Systems (AU, Deltek Advanced Partner) — Open Plan Professional: https://connexion.com.au/open-plan-professional/
53. SourceForge — Deltek Open Plan: https://sourceforge.net/software/product/Deltek-Open-Plan/ *(0 reviews)*
54. SourceForge — Deltek Acumen: https://sourceforge.net/software/product/Deltek-Acumen/ *(0 reviews)*
55. Slashdot — Deltek Open Plan: https://slashdot.org/software/p/Deltek-Open-Plan/ *("No User Reviews")*
56. TopBusinessSoftware — Deltek Open Plan reviews: https://topbusinesssoftware.com/products/Deltek-Open-Plan/reviews/
57. TopBusinessSoftware — Deltek Acumen reviews: https://topbusinesssoftware.com/products/Deltek-Acumen/reviews/ *(geen reviews aanwezig)*
58. FeaturedCustomers — Deltek: https://www.featuredcustomers.com/vendor/deltek/reviews *(referentiescore 4,7; 271 testimonials — geen productspecifieke quotes toegankelijk)*
59. ScheduleLens — Schedule Analysis Tools and Software: https://schedulelens.com/schedule-analysis-tools-software/ *("Acumen Fuse is the deepest option")*
60. ScheduleLens — DCMA 14-Point Assessment: https://schedulelens.com/blog/dcma-14-point-assessment/
61. Plan Academy — What is the DCMA 14-point schedule assessment?: https://www.planacademy.com/dcma-14-point-schedule-assessment/
62. The CFO Club — Deltek Review: Pros, Cons, Features, and Pricing: https://thecfoclub.com/tools/deltek-review/ *("Deltek's user interface could feel daunting at first…")*
62a. **Mosaic Projects — White Paper WP1088: DCMA 14-Point Assessment Metrics** (PDF): https://mosaicprojects.com.au/WhitePapers/WP1088_DCMA-14-Point.pdf *("The implementation of the DCMA 14-Point Assessment in the various software tools is not certified by the DCMA or any other body and varies between the tools!"; wijzigende telbasis tussen de 2009- en 2012-versies; "correlation is not the same as causation"; noemt Fuse, Schedule Analyzer en Barbecana Schedule Inspector als validatietools)*
62b. **HKA — Acumen Fuse Schedule Quality Index: Understanding the Method**: https://www.hka.com/article/acumen-fuse-schedule-quality-index-method/ *(negen metrics; activity-based vs. metric-based scoring geeft op identieke data 41 vs. 88; een activiteit die op één metric faalt scoort 0% resp. 82–91%)*
62c. Kazinex — *Acumen Fuse alternative*: https://docs.kazinex.com/blog/acumen-fuse-alternative *("desktop installation (IT approval, license servers, Windows-only) and enterprise pricing (thousands per seat, per year)")* — **concurrent, gekleurde bron**
62d. Nodes & Links — *Acumen Fuse vs Nodes & Links*: https://nodeslinks.com/compare/acumen-fuse-vs-nodes-links/ *(kritiek op usability, specialistenafhankelijkheid, desktop-deployment, ontbrekende AI; elders "the slow QSRA engine")* — **concurrent, gekleurde bron**
62e. Pinnacle Management Systems — *The Most Common EVMS Scheduling Engines*: https://www.pinnaclemanagement.com/blog/the-most-common-evms-scheduling-engines *(P6 dominant; Open Plan #2 met "significantly lower market penetration"; schaarste aan ervaren Open Plan-planners; minder kostenengines met directe integratie)*
62f. ScheduleReader — *Schedule Health, Rules & Tools: ScheduleReader vs. Deltek Acumen Fuse*: https://www.schedulereader.com/schedule-health-rules-tools-schedulereader-deltek-acumen-fuse/ — **concurrent, gekleurde bron**
62g. Deltek — *How You Can Benefit from Deltek EVM Solutions* (samenhang Cobra / Open Plan / PM Compass / Acumen / wInsight; 15 earned-value-technieken in Cobra; IPMR- en IPMDAR-CPD-export): https://www.deltek.com/en/blog/evm-solutions-guide
62h. ProjectControlsOnline — *Acumen Fuse*: https://projectcontrolsonline.com/acumen-fuse/ *(historische lijst ondersteunde bronformaten; DCMA-metricbibliotheek standaard bij elke licentie)*

### Historie en eigendom
63. Wikipedia — Deltek: https://en.wikipedia.org/wiki/Deltek *(oprichting 1983; eigendomsgeschiedenis t/m Roper Technologies 2016; ± 3.686 medewerkers)*
64. Washington Technology — "Deltek buys Welcom" (21 maart 2006): https://www.washingtontechnology.com/2006/03/deltek-buys-welcom/351558/
65. NYT DealBook — "Deltek Acquires Houston Software Company" (21 maart 2006): https://archive.nytimes.com/dealbook.nytimes.com/2006/03/21/deltek-acquires-houston-software-company/
66. **Deltek — Boeing customer case study** (PDF): https://cdn.featuredcustomers.com/CustomerCaseStudy.document/deltek_boeing_47118.pdf *(Open Plan sinds 1985 Huntsville; IDS-standaardisatie 1996/97; wekelijkse EV in batch; citaten Joe Pratte, Walt DeBacker, Ken Babin)*
67. Business Wire / Thoma Bravo / Washington Post / Mergr — Deltek acquires Acumen (15 juli 2013), via zoeksnippets: https://mergr.com/transaction/deltek-acquires-acumen

### Overige zoekresultaten en toegangsbeperkingen
68. Zoekmachines gebruikt als proxy (WebSearch-budget van de sessie was uitgeput): DuckDuckGo HTML/Lite (`html.duckduckgo.com`, `lite.duckduckgo.com` — regelmatig CAPTCHA), Yahoo Search (`search.yahoo.com`), Bing (`bing.com`).
69. **Geblokkeerd (HTTP 403 / niet toegankelijk):** G2 (`g2.com/products/deltek-acumen/reviews`, `g2.com/products/deltek-open-plan/reviews`), TrustRadius (`trustradius.com/products/deltek-open-plan/reviews`), Gartner Peer Insights, Reddit (`reddit.com` en `old.reddit.com` — volledig geblokkeerd voor deze omgeving), Planning Planet (`planningplanet.com`), ProjectManagement.com, ITQlick, SelectHub, Ecosia, Startpage, searx.be, GSA eLibrary/Advantage.
70. Reddit-thread waarnaar via zoeksnippets verwezen wordt (inhoud niet toegankelijk): r/projectmanagement — "[Scheduling] Is anybody using Deltek - Acumen Fuse application?" https://www.reddit.com/r/projectmanagement/comments/2a8fyu/

---

### Verantwoording van schattingen

Expliciet als **schatting** gemarkeerd in dit document:
- 6sense-marktaandeel- en klantaantallen (technografische detectie; structureel een onderschatting voor on-premise defensiesoftware).
- Alle omrekeningen van AUD naar EUR/USD (koers ± AUD 1 = EUR 0,57 = USD 0,66, niet geverifieerd).
- De 5-jaars TCO van Acumen Fuse (≈ AUD 17.792 per seat) — berekend uit de gepubliceerde reseller-bedragen.
- De orde-van-grootte-bandbreedte voor een Open Plan-licentie (USD 5.000–12.000 per named user perpetual, resp. USD 2.000–4.500 per gebruiker per jaar) — afgeleid uit de Acumen-prijsstelling en Vendr-benchmarks; **geen enkele publieke bron bevestigt dit**.
- De indicatie "EUR 15.000–25.000 eerstejaars licentiekosten per volledig uitgeruste EVMS-seat" en "USD 250.000–750.000 eerste jaar voor 25–50 gebruikers" — samengesteld uit reseller-lijstprijzen plus Vendr-benchmarks; **geen Deltek-offerte**.
- De ITQlick-prijs van "$75 per user/month" — algoritmisch gegenereerd door de aggregator, niet herleidbaar tot Deltek, en in tegenspraak met het perpetual-model van de officiële reseller. **Niet gebruiken.**
- Alle uitspraken over Nodes & Links, Kazinex en ScheduleReader zijn afkomstig van **concurrenten** en als zodanig gemarkeerd; ze zijn alleen opgenomen waar Deltek's eigen documentatie de onderliggende feiten bevestigt.

**Wél harde, herleidbare feiten** uit primaire documentatie: alle systeemvereisten, ondersteunde formaten en versies, schaalrichtlijnen, defectnummers en -omschrijvingen, metric-aantallen, releasedatums, de algoritmische beschrijvingen uit de Developer Guide (floattypen, sampling-methode, resource-schedulingregels, EVM-velden), en de Prescience-prijzen inclusief de licentie/onderhoud-splitsing zoals live gepubliceerd op 25-07-2026 en zoals gearchiveerd in 2018/2019.

**Wijzigingslog t.o.v. de vorige versie van dit profiel (25-07-2026, tweede ronde):**
1. Prijzen Acumen **gecorrigeerd** op basis van live-verificatie: licentie/onderhoud-splitsing toegevoegd, staging-bedragen vervangen, onderhoudspercentage bijgesteld van ≈22,1% naar **28,3%** (Fuse) resp. 22,0% (suite).
2. Prijsontwikkelingstabel 2018→2026 toegevoegd (Wayback Machine).
3. P6-prijsanker bij dezelfde reseller toegevoegd.
4. Nieuwe paragraaf **2.1a** met de rekenkern uit de Developer Guide (zes floattypen, kalenderinteractie, resource-schedulingregels, EVM-velden, Monte-Carlo-sampling-internals).
5. Sectie **2.3 gecorrigeerd**: Open Plan heeft naast de read-only REST API wél een volwaardig, schrijfbaar **OLE/COM-objectmodel**. De eerdere stelling dat tweerichtingsautomatisering alleen via de database of importscripts kon, was onvolledig. Nadeel 6 is dienovereenkomstig herschreven.
6. Drie voordelen toegevoegd (gedocumenteerde rekenkern; EVM-native datamodel; COM-automatisering).
7. Twee nadelen toegevoegd met onafhankelijke bronnen: **variërende, niet-gecertificeerde DCMA-implementaties** (Mosaic Projects) en de **scoringsdiscrepantie in Fuse' Schedule Quality Index** (HKA), plus een expliciet als gekleurd gemarkeerd nadeel over cloud-native concurrentie.

---

## Verificatie

Adversariële fact-check, uitgevoerd **25 juli 2026**. Opzet: elke bewering actief pogen te **weerleggen** met de primaire bron of een onafhankelijke bron, niet haar te bevestigen. Alle prijs- en systeemvereistenclaims zijn opnieuw rechtstreeks bij de bron opgehaald (webshop-HTML met `schema.org`-JSON-LD, en de Deltek-PDF's integraal geëxtraheerd, niet via zoeksnippets). Waar de fetch mislukte, staat dat er.

**Samenvatting: 26 beweringen gecontroleerd — 18 bevestigd, 6 gecorrigeerd, 2 onzeker.** Geen enkele kernprijs bleek onjuist; de fouten zaten in *labeling* (V2), *attributie* (V3, V5, V6), een verkeerd percentage (V4) en een afgeleide schatting die door de eigen bron wordt tegengesproken (V7).

### Gecorrigeerd

| # | Bewering (oud) | Bevinding | Bron |
|---|---|---|---|
| **V2** | "Prijsanker: Oracle Primavera P6 Professional **AUD 6.809** … één Fuse-seat kost méér dan een volledige P6-licentie" | **Gecorrigeerd — appels/peren.** AUD 6.809 is niet de licentieprijs maar de **online kortingsprijs inclusief eerste jaar onderhoud**. Oracle-lijstprijs is 5.820 licentie + 1.280 onderhoud = **7.100**. Het werd naast Acumen-*lijst*prijzen gezet. De strekking overleeft: licentie 7.367 vs. 5.820 = **+27%**; totaal lijst 9.452 vs. 7.100 = **+33%**; online 9.083,65 vs. 6.809 = **+33%**. §3.2 herschreven met volledige uitsplitsing. Idem EPPM: 7.441 is online totaal, lijst is 6.360 + 1.399 = 7.759. | https://www.prescience.com.au/product/primavera-p6-ppm/ · https://www.prescience.com.au/product/primavera-p6-eppm/ |
| **V3** | "28,3% … boven **Deltek's eigen** 18–22%-bandbreedte" (nadeel 1) | **Gecorrigeerd — misattributie.** De 18–22% is een **Vendr**-schatting voor Deltek-contracten breed; Deltek publiceert dit percentage nergens. §3.2 attribueerde correct, nadeel 1 niet. Bijgesteld. Aanvullend weerwoord: het percentage is **geen recente verhoging** — in 2018 was het 1.920/6.472 = **29,7%**, dus licht gedááld. | https://www.vendr.com/marketplace/deltek |
| **V4** | "1,75% toeslag bij creditcardbetaling" | **Gecorrigeerd.** De live pagina zegt letterlijk: "there is a **1.9%** surcharge for all credit card transactions". | https://www.prescience.com.au/product/acumen-fuse/ |
| **V5** | "± 3.686 medewerkers" | **Gecorrigeerd.** Dat is het Wikipedia-infoboxcijfer. Deltek's eigen About-pagina noemt medio 2026 "**4,200 employees**" (en bevestigt "30,000 customers" / "Trusted by 30,000 organizations"). | https://www.deltek.com/en/about |
| **V6** | "Oracle Primavera P6 — **de dominante speler**; 6sense 20,05%" | **Gecorrigeerd/genuanceerd.** In 6sense's eigen categorie leidt **Teamwork met 48,07%**; P6 is met 20,05% #2. De categorie mengt lichte samenwerkingstools met CPM-planners, dus binnen de EVMS/CPM-niche blijft P6 de referentie — maar "dominant" zonder afbakening is onjuist tegenover de geciteerde bron. | https://6sense.com/tech/project-management/deltek-open-plan-market-share |
| **V7** | "25–50 gebruikers → eerste jaar **USD 250.000–750.000**" | **Gecorrigeerd naar bovengrens-scenario.** Dezelfde Vendr-bron die als onderbouwing dient, geeft een tegengesteld cijfer: eerstejaarskosten voor **50–200 users** liggen "commonly between **$150,000 and $600,000**". Vendr komt voor een 2–4× grotere groep op een *lager* bedrag uit — per gebruiker een factor 3–5 verschil. Waarschuwing toegevoegd. | https://www.vendr.com/marketplace/deltek |

### Bevestigd

| # | Bewering | Uitkomst | Bron |
|---|---|---|---|
| **V1** | Acumen Fuse AUD 7.367 licentie + 2.085 onderhoud = 9.452 lijst; online 6.998,65 + 2.085 = 9.083,65; SKU **ACFUS1-10-1**; Perpetual; per Application User; excl. GST; `priceValidUntil` 2027-12-31 | **Bevestigd, cijfer voor cijfer**, uit de `schema.org/Product`-JSON-LD én de zichtbare "Price Breakdown"-tabel. `ListPrice` 9452.00, verkoopprijs 9083.65. | https://www.prescience.com.au/product/acumen-fuse/ |
| **V1b** | Acumen Risk+360 identiek 7.367 + 2.085 = 9.452; SKU **ACRIS1-10-1**; add-on op bestaande Fuse | **Bevestigd.** Paginatekst: "Pre-requisite: You must already own Acumen Fuse for this product to function correctly." | https://www.prescience.com.au/product/deltek-acumen-risk/ |
| **V1c** | Full Suite 14.734 + 3.241 = 17.975; online 13.997,30 + 3.241 = 17.238,30; SKU **ACRIS1-10-1-1**; Touchstone alleen op aanvraag | **Bevestigd.** Touchstone: "Call 1300 086 816 for more information" — geen prijs. | https://www.prescience.com.au/product/deltek-acumen-fuserisk360-full-suite/ |
| **V8** | Prijsontwikkeling 2018: AUD 6.472 + 1.920 = 8.392, zelfde SKU | **Bevestigd** in de Wayback-snapshot (22-06-2018), inclusief SKU ACFUS1-10-1 en "Term: Perpetual". Rekenkundig geverifieerd: licentie +13,8%, onderhoud +8,6%, totaal +12,6%. *Nieuw detail:* in 2018 gold de 5%-korting óók op onderhoud (online 7.972), nu niet meer — effectieve stijging voor een online koper is **+13,9%**. | https://web.archive.org/web/20180622154637/http://www.prescience.com.au/product/acumen-fuse/ |
| **V9** | Vendr: mediaan USD 19.990/jaar over 32 aankopen, range 9.099–39.500; onderhoud 18–22%; implementatie 40–80% | **Bevestigd, verbatim.** | https://www.vendr.com/marketplace/deltek |
| **V10** | Voor Open Plan is nergens een publieke prijs te vinden | **Bevestigd, ook actief tegengetoetst.** De volledige software-catalogus van de enige reseller die wél online prijst bevat exact vijf producten: acumen-fuse, deltek-acumen-risk, full-suite, primavera-p6-ppm, primavera-p6-eppm. **Open Plan staat er niet tussen.** | https://www.prescience.com.au/product-category/software/ |
| **V11** | Eigendomsketen: 1983 deLaski's · Herndon VA · IPO 1997 · privaat 2002 · New Mountain 75% (2005) · IPO 2007 $162 mln · Thoma Bravo $1,1 mld (2012) · Roper $2,8 mld (2016) | **Bevestigd** op alle punten (Thoma Bravo preciezer: augustus 2012). Kanttekening: Wikipedia noemt de Welcom- en Acumen-overnames **niet** — die staan op eigen, sterkere bronnen (V12). | https://en.wikipedia.org/wiki/Deltek |
| **V12** | Deltek nam Welcom over in maart 2006; Houston; Cobra + Open Plan; citaat over voortgezette ontwikkeling | **Bevestigd, verbatim**: 21 maart 2006, Houston, en letterlijk "Welcom products, such as Cobra and Open Plan, will continue to be developed, licensed, maintained and supported by Deltek". | https://www.washingtontechnology.com/2006/03/deltek-buys-welcom/351558/ |
| **V13** | Acumen Fuse: "600+ metrics", "500K+ schedule activities", "50% reduction in schedule review time", standaarden DCMA/DOE/GAO/AACE/NASA | **Bevestigd, verbatim** op Deltek's eigen productpagina — inclusief de expliciete markering in het profiel dat dit **leveranciersclaims** zijn, niet documentatie. | https://www.deltek.com/products/delivery-assurance/ppm/acumen/fuse/ |
| **V14** | **Nul IFC/BIM/4D/buildingSMART-ondersteuning** in beide producten | **Bevestigd langs drie onafhankelijke wegen.** Volledige tekstextractie van de Open Plan 8.8 Technical Overview: **0 treffers** op "IFC" en **0** op "BIM". Idem Acumen 8.11 Technical Overview: **0** en **0**. Deltek's Fuse-productpagina: geen enkele vermelding. Dit is de best onderbouwde claim in het hele profiel. | Open Plan 8.8 TO (PDF) · Acumen 8.11 TO (PDF) · deltek.com Fuse-pagina |
| **V15** | Open Plan: twee-tier, geen applicatieserver, geen webclient | **Bevestigd, verbatim:** "Open Plan uses two-tier architecture… Client / Application Tier… Database Tier". | Open Plan 8.8 Technical Overview (PDF) |
| **V16** | Open Plan typisch gebruik **2.000–5.000 activiteiten, één project tegelijk**; 50 MB per ~2.000 activiteiten; 32-bit 3–4 GB, 64-bit 192 GB | **Bevestigd, verbatim:** "A user working with moderate-sized projects (2,000 – 5,000 activities), one project at a time…" en "With the 32-bit version… a maximum of 3-4 GB… The 64-bit version… up to 192 GB". | Open Plan 8.8 Technical Overview (PDF) |
| **V17** | "Small Client/Server Installation: **1–25 concurrent users**"; Access 2016/2019/2021 als ondersteunde database; Oracle 19.3; .NET 4.8/4.8.1; Windows 11/Server 2019-2025; niet op domain controller/Exchange/SharePoint | **Bevestigd, alle punten verbatim**, inclusief de citaten "often yields poor performance" en de licentieclausule "Specific server hardware configurations may have an impact on your overall Deltek product licensing requirements". | Open Plan 8.8 Technical Overview (PDF) |
| **V18** | Acumen: single tier, "There is no backend database tier required"; 2/4/8 GB per <10K / 10–50K / >50K activiteiten; typisch 10.000–20.000; 16 GB + 4 cores aanbevolen | **Bevestigd, verbatim**, inclusief het voorbeeld "three months' worth of a 10k activity project is 30k activities". | Acumen 8.11 Technical Overview (PDF) |
| **V19** | Acumen ondersteunt **UN/CEFACT (IPMDR Format 6 v1.0)**, Safran 25.1, Ares Prism G2, Phoenix 5.6, PowerProject 17.3/18, IPMDAR SPD + CPD, P6 20.12–24.12 | **Bevestigd, verbatim uit de bronmatrix.** Dit is belangrijk, want de aanbeveling "prioriteer UN/CEFACT-XML-export" (§6.3) rust hierop — die aanbeveling houdt stand. | Acumen 8.11 Technical Overview (PDF) |
| **V20** | Acumen ondersteunt **geen 2FA**; workaround is een app password | **Bevestigd, verbatim:** "Acumen does not support Two-Factor Authentication (2FA). If the server is configured for 2FA, you can create an App password for Acumen." | Acumen 8.11 Technical Overview (PDF) |
| **V21** | Huidige versies: Open Plan **8.8**, Acumen **8.11** (docs 17-11-2025) | **Bevestigd.** Open Plan-documentatie-index toont 3.3 / 8.6 / 8.7 / 8.8 als hoogste; Acumen-index 6.0 t/m 8.11, laatst bijgewerkt 17 november 2025. Geen nieuwere release gevonden. | https://help.deltek.com/Product/OpenPlan/ · https://help.deltek.com/Product/Acumen/ |
| **V22** | 6sense: 0,15% marktaandeel, 57 domeinen, #24, VS 39 (73,6%), VK 3, DE 3, 23 bedrijven met 10.000+ | **Bevestigd, alle cijfers.** *Aanvulling:* de genoemde-klantenlijst is ruimer dan het profiel weergeeft — naast Siemens, Lockheed Martin, Boeing en BAE Systems ook **GE Aerospace, Northrop Grumman, Spirit AeroSystems, Unisys en de DCMA zelf**. Dat versterkt eerder dan verzwakt. De waarschuwing dat dit detectiedata is (geen klantbevestiging, structurele onderschatting) blijft terecht. | https://6sense.com/tech/project-management/deltek-open-plan-market-share |

### Onzeker

| # | Bewering | Status | Toelichting |
|---|---|---|---|
| **V23** | ITQlick: "$75 per user/month" voor Acumen; "Safran Risk vanaf $1.200 per user per year" | **Onzeker — niet verifieerbaar.** ITQlick geeft zowel via WebFetch als via directe HTTP-request **403 Forbidden**; het bedrag stamt uit een zoeksnippet dat niet opnieuw op te halen is. Het profiel merkt het al aan als onbetrouwbaar; die kwalificatie blijft staan, maar de *onderbouwing* daarvan is nu "kon niet worden geverifieerd", niet "is weerlegd". Ook de Safran-prijs van USD 1.200/jaar in §7.2 erft deze onzekerheid en mag niet als vergelijkingsanker gebruikt worden. | https://www.itqlick.com/acumen/pricing (HTTP 403) |
| **V24** | CEO Bob Hughes | **Deels onzeker.** Zijn benoeming (maart 2024) is bevestigd; dat hij het medio 2026 nóg is, niet — deltek.com/en/about/leadership geeft HTTP 404 en de About-pagina noemt geen namen. In de tabel als onzeker gemarkeerd. | https://en.wikipedia.org/wiki/Deltek |

### Niet opnieuw getoetst (buiten scope van deze ronde)

De inhoudelijke claims uit de *Open Plan 8.8 Developer Guide* (§2.1a: zes floattypen, Monte-Carlo-sampling op 0–32767, de twaalf-getallen-normaalbenadering), de defectnummers uit de release notes (§5.5), en de secundaire meningsbronnen (Mosaic Projects WP1088, HKA, Nodes & Links, Kazinex) zijn in deze ronde **niet** opnieuw opgehaald. Ze zijn in de vorige ronde uit primaire PDF's respectievelijk met bronvermelding overgenomen en zijn in deze controle niet tegengesproken — maar ze dragen geen vers verificatiestempel.

### Beperkingen van deze verificatieronde

- Het **WebSearch-budget van de sessie was uitgeput** (200/200). Alle verificatie liep daarom via directe HTTP-fetches op bekende URL's en via de Wayback Machine. Bronnen die alleen via zoeken te vinden zouden zijn geweest — bijvoorbeeld een alternatieve reseller met een Open Plan-prijs — konden niet gezocht worden. **De conclusie "geen publieke Open Plan-prijs" is dus bevestigd voor de onderzochte kanalen, niet uitputtend bewezen.**
- Prescience blokkeert `WebFetch` (HTTP 403) maar niet een reguliere browser-user-agent; de prijzen zijn opgehaald met een directe request en gekruisd tegen de gestructureerde `schema.org`-data op dezelfde pagina, wat sterker is dan een gerenderde-tekstlezing.
- De Deltek-PDF's zijn integraal geëxtraheerd en doorzocht op letterlijke tekst, waardoor negatieve bevindingen (0 treffers op "IFC"/"BIM") hier daadwerkelijk bewijskracht hebben in plaats van slechts "niet aangetroffen".
- Business Wire (Acumen-overname 15-07-2013) en Mergr leverden geen bruikbare inhoud op; die datum blijft op de bestaande bronvermelding staan en is in deze ronde **niet** herbevestigd.
