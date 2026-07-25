# Deltek Open Plan & Deltek Acumen (Fuse / Risk / 360 / Touchstone)

**Diepgaand softwareprofiel — wereldwijd marktonderzoek planningssoftware**
Opgesteld: 25 juli 2026 · Alle webbronnen opgehaald op 25 juli 2026 tenzij anders vermeld.
Onderzoeksmethode: leveranciersdocumentatie (help.deltek.com, dsm.deltek.com PDF's incl. release notes en technical overviews), reviewsites/aggregators, resellerprijslijsten, technografische marktdata, vakartikelen. Beperking: G2, TrustRadius, Gartner Peer Insights, Reddit en Planning Planet blokkeerden geautomatiseerde toegang (HTTP 403); waar mogelijk zijn hun gegevens via zoeksnippets of alternatieve aggregators achterhaald. Dit is expliciet aangegeven.

> **Kernsamenvatting.** Twee producten uit dezelfde Deltek-PPM-stal, met heel verschillende marktrollen. **Open Plan** is een 40 jaar oude, Windows-only CPM-planner (Welcom, midden jaren '80) die vrijwel uitsluitend nog leeft in de Amerikaanse defensie- en overheids-EVMS-keten; marktaandeel is marginaal (~0,15% technografisch geschat) maar de klanten zijn zwaargewichten als Boeing, Lockheed Martin en BAE. **Acumen Fuse** is het commercieel succesvollere product: een schedule-kwaliteits- en forensische analysetool met 600+ metrics (DCMA 14-point, DECM 8.0, DOE, NASA, GAO, AACE) die *naast* P6, MS Project, Safran, Asta en Open Plan draait en daardoor een veel breder bereik heeft. Beide zijn Windows-desktopapplicaties op .NET Framework 4.8, beide hebben **nul IFC/BIM/4D-ondersteuning**, en beide hebben zwakke programmatische API's. Prijzen zijn niet publiek; de enige gevonden lijstprijs is die van een Australische Deltek-partner: **AUD 8.772 per gebruiker (perpetual) voor Acumen Fuse**, **AUD ~16.700–18.000 voor de volledige suite**, met ~22% jaarlijks onderhoud. Voor Open Plan is nergens een publieke prijs te vinden.

---

## 1. Wat het is

### 1.1 De leverancier: Deltek

| Feit | Detail |
|---|---|
| Opgericht | 1983, door Donald en Kenneth E. deLaski ("**Del**aski **Tek**nologies") |
| Hoofdkantoor | Herndon, Virginia (VS) |
| Eigendom | Beursgang 1997 → privaat 2002 → New Mountain Capital (75%, 2005) → beursgang 2007 ($162 mln) → **Thoma Bravo** ($1,1 mld, 2012) → **Roper Technologies** ($2,8 mld, 2016). Sinds 2016 dochteronderneming van Roper Technologies (NYSE: ROP). |
| CEO | Bob Hughes (stand 2024) |
| Omvang | ± 3.686 medewerkers, 12+ vestigingen wereldwijd |
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

Daarnaast bestaat er een klassieke, oudere extensieroute: Open Plan is "extensible via an API" met add-ins, plus een gepubliceerd **Entity Relationship Diagram** (directe databasetoegang) en een **Developer Guide**.

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

De Australische Deltek-partner **Prescience Technology** publiceert daadwerkelijke webshop-prijzen. Dit is de enige publieke, concrete Deltek-PPM-prijslijst die dit onderzoek heeft opgeleverd.

| Product | Adviesprijs (AUD, excl. GST) | Actieprijs (AUD) | Voorwaarden |
|---|---|---|---|
| **Deltek Acumen Fuse** | **8.772,00** | 8.430,15 | **Perpetual**, prijs **per gebruiker**, **inclusief eerste jaar verplicht Deltek Acumen Maintenance (AUD 1.935,00)** |
| **Deltek Acumen Risk** (add-on op bestaande Fuse) | **8.772,00** | 8.430,15 | idem |
| **Deltek Acumen Fuse + Risk + 360 (Full Suite)** | **16.682,00** | 15.999,00 | idem (catalogusmoment A) |
| **Deltek Acumen Fuse + Risk + 360 (Full Suite)** | **17.975,00** | 17.238,30 | idem (catalogusmoment B — andere momentopname van dezelfde webshop) |
| PrescienceAdvantage® Everyday Support (optioneel, reseller) | 1.160,00/jaar of vanaf 115,00/maand | 1.102,00/jaar | ondersteuningsabonnement van de partner, niet van Deltek |

Aanvullende voorwaarden die de webshop noemt: licentietermijn "Perpetual"; prijs exclusief GST; 1,75% toeslag bij creditcardbetaling; "All Deltek orders are bound by Deltek's terms and conditions"; Deltek benadert de klant zelf vóór afloop van het onderhoudscontract voor verlenging.

**Bronnen:** `www.staging.prescience.com.au/product/acumen-fuse/` en `.../product-tag/deltek-acumen/` (opgehaald 25-07-2026); de live-URL's `www.prescience.com.au/...` gaven HTTP 403 maar dezelfde bedragen verschenen in zoeksnippets.

**Afgeleide getallen (berekend, expliciet als afleiding gemarkeerd):**
- Onderhoudspercentage: AUD 1.935 / AUD 8.772 ≈ **22,1% van de kaartprijs per jaar** — bovenaan de door Vendr genoemde Deltek-bandbreedte van 18–22%.
- Kale eeuwigdurende licentie Fuse ≈ AUD 8.772 − 1.935 = **AUD 6.837**.
- **SCHATTING** bij een koers van ± AUD 1 = EUR 0,57 (medio 2026): Fuse ≈ **EUR 5.000** per seat; volledige suite ≈ **EUR 9.500–10.250** per seat; jaarlijks onderhoud ≈ **EUR 1.100** per seat. Wisselkoers niet geverifieerd in dit onderzoek — behandel als indicatie.
- Totale eigendomskosten Fuse over 5 jaar per seat (**SCHATTING**): AUD 8.772 + 4 × 1.935 ≈ **AUD 16.512** (≈ EUR 9.400).

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

> **Advies bij prijsvergelijking:** ga er in een businesscase van uit dat één volledig uitgeruste EVMS-planner (Open Plan Professional + Acumen Fuse + Acumen Risk + aandeel Cobra) **ordegrootte EUR 15.000–25.000 per seat aan eerstejaars licentiekosten** vergt, plus 18–22% onderhoud en implementatie die 40–80% van de softwarekosten kan bedragen. **Dit is een schatting**, samengesteld uit de Prescience-lijstprijzen en de Vendr-benchmarks; het is géén Deltek-offerte.

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

10. **Actief onderhouden, niet in onderhoudsmodus.** Open Plan 8.8 verscheen april 2026 met nieuwe PPM Administrator-integratie, ACC, Jira Data Center-import, spellingcontrole op activiteitomschrijvingen en verbeterde Find & Replace; Acumen 8.11 verscheen december 2025 met GenAI-risicogeneratie, PPM Risk-ondersteuning, P6 24.12-support en half-step snapshot-import. De read-only REST API is van mei 2026. Voor een product uit 1985 is dat een respectabel investeringsniveau.

---

## 5. Nadelen

1. **Volstrekt ondoorzichtige prijsstelling, met name voor Open Plan.** Er bestaat geen enkele publieke prijs. Geen proefversie, geen gratis editie, geen zelfbedieningsaankoop. Elke evaluatie begint met een salesgesprek. SmartPM noemt dit expliciet als "procurement friction". En waar wél een prijs bekend is (Acumen via de Australische partner) blijkt die stevig: **AUD 8.772 per gebruiker voor alleen Fuse**, ongeveer AUD 16.700–18.000 voor de suite, met **≈22% onderhoud per jaar** — dat is de bovengrens van Deltek's eigen bandbreedte.

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

6. **Zwakke, eenrichtings-integratiemogelijkheden.** Acumen's "API" is **geen API**: het is een XML-exporthaak via configuratiebestand die een menu-item in de desktop-UI aanmaakt en na een muisklik een extern programma start. Er is geen REST-endpoint, geen CLI, geen SDK, geen headless modus. Open Plan's REST API bestaat pas sinds mei 2026, vereist een aparte IIS-server, en is **expliciet read-only**. Wie tweerichtings-automatisering wil, moet terugvallen op directe databasetoegang (het ERD is gepubliceerd) of op user-defined importscripts — beide fragiel en versiegebonden.

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

13. **Risicoanalyse in Open Plan is beperkt tot duur.** De documentatie behandelt uitsluitend duur-onzekerheid met drie-puntschattingen; kosten- en resourcerisico ontbreken. Wie kostenrisico wil, moet Acumen Risk erbij kopen — een tweede licentie van vergelijkbare prijs.

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
- **Oracle Primavera P6** — de dominante speler; 6sense schat 20,05% marktaandeel tegenover 0,15% voor Open Plan. Grotere community, meer trainers, meer add-ons.
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
35. **Prescience Technology (AU) — Deltek Acumen Fuse productpagina**: https://www.staging.prescience.com.au/product/acumen-fuse/ *(AUD 8.772,00 → 8.430,15; perpetual; per gebruiker; incl. eerste jaar maintenance AUD 1.935,00; excl. GST)* — live-URL https://www.prescience.com.au/product/acumen-fuse/ gaf HTTP 403
36. **Prescience Technology (AU) — Deltek Acumen productcatalogus**: https://www.staging.prescience.com.au/product-tag/deltek-acumen/ *(Full Suite AUD 16.682,00 → 15.999,00; Acumen Risk add-on AUD 8.772,00 → 8.430,15)*
37. Prescience Technology — catalogus (zoeksnippet, andere momentopname): https://www.prescience.com.au/product-tag/deltek-acumen/ *(Full Suite AUD 17.975,00 → 17.238,30)*
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
- Alle omrekeningen van AUD naar EUR (koers ± AUD 1 = EUR 0,57, niet geverifieerd).
- De afgeleide kale licentieprijs (AUD 6.837) en 5-jaars TCO (AUD 16.512) voor Acumen Fuse — berekend uit de gepubliceerde reseller-bedragen.
- Het onderhoudspercentage van ≈22,1% — berekend uit AUD 1.935 / AUD 8.772.
- De indicatie "EUR 15.000–25.000 eerstejaars licentiekosten per volledig uitgeruste EVMS-seat" — samengesteld uit reseller-lijstprijzen plus Vendr-benchmarks; **geen Deltek-offerte**.
- De ITQlick-prijs van "$75 per user/month" — algoritmisch gegenereerd door de aggregator, niet herleidbaar tot Deltek, en in tegenspraak met het perpetual-model van de officiële reseller. **Niet gebruiken.**

Niet-schattingen (harde, herleidbare feiten uit primaire documentatie): alle systeemvereisten, ondersteunde formaten en versies, schaalrichtlijnen, defectnummers en -omschrijvingen, metric-aantallen, releasedatums, en de Prescience-lijstprijzen zoals gepubliceerd.
