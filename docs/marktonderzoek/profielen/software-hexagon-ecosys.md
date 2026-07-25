# Hexagon EcoSys — softwareprofiel

*(sinds 2026 formeel: **Octave Sequence Enterprise**, "formerly EcoSys")*

**Onderzoeksdatum:** 25 juli 2026
**Categorie:** Enterprise project controls / Enterprise Project Performance (EPP) — kosten, voortgang, portfolio, met schedule-integratie
**Status van dit document:** marktonderzoek t.b.v. positionering van een open-source, IFC-gebaseerde planner

> **Belangrijke waarschuwing vooraf — naamswijziging.** Wie vandaag "Hexagon EcoSys" zoekt, zoekt naar een product dat formeel niet meer zo heet en niet meer van Hexagon is. Het product heet sinds begin 2026 **Sequence Enterprise** en valt onder **Octave Intelligence plc** (Iers plc), de softwareafsplitsing van Hexagon AB — met een **dubbele notering**: SDR's op Nasdaq Stockholm (eerste handelsdag 25 mei 2026) én Class B ordinary shares op Nasdaq New York onder ticker **OCTV** (vanaf 28 mei 2026, de datum waarop de distributie werd voltooid). De naam "EcoSys" wordt in de markt, in vacatures en door implementatiepartners nog volop gebruikt en Octave voert hem zelf als bijnaam ("Octave Sequence Enterprise (EcoSys)"). In dit profiel gebruik ik "EcoSys" als de gangbare naam en noem ik de nieuwe naam waar relevant.

---

## 1. Wat het is

### Leverancier en eigendomsgeschiedenis

EcoSys heeft in dertig jaar vier eigenaarsidentiteiten gehad. Die keten is relevant, want elke stap heeft sporen achtergelaten in productnaam, documentatie-URL's en supportkanalen:

| Periode | Entiteit | Gebeurtenis |
|---|---|---|
| 1994 – 2015 | **EcoSys Management LLC**, New York, NY (VS) | Zelfstandig softwarebedrijf, gespecialiseerd in enterprise planning & project controls |
| 2015 | Overname door **Hexagon AB** (Zweden) | Hexagon kondigt overname aan van "EcoSys Management LLC, a provider of best-in-class enterprise planning and project controls software"; ingedeeld bij Intergraph Process, Power & Marine |
| 2017 | **Hexagon PPM** | Corporate rebrand; EcoSys wordt productnaam binnen Hexagon PPM. In november 2017 verschijnt **EcoSys 8** |
| ± 2021 – 2025 | **Hexagon Asset Lifecycle Intelligence (ALI)** | Hexagon PPM gaat op in de ALI-divisie |
| 2024 – 2026 | **Octave Intelligence plc** | Hexagon-bestuur autoriseert afsplitsing op 25 okt 2024; **naam "Octave" bekendgemaakt 17 juni 2025** (PR Newswire), **merkidentiteit + website gelanceerd 2 mrt 2026**; AGM Hexagon keurt uitkering goed 24 apr 2026; eerste handelsdag SDR's Nasdaq Stockholm 25 mei 2026, **distributie voltooid en notering Nasdaq New York (OCTV) 28 mei 2026**. Product hernoemd naar **Sequence Enterprise** |

Octave Intelligence bundelt de voormalige Hexagon-divisies Asset Lifecycle Intelligence, Safety, Infrastructure & Geospatial plus Bricsys, ETQ en Projectmates. Kerncijfers zoals gepresenteerd op de Investor Day (maart 2026): **omzet 2025 ca. $1,64 mrd** (+1,3% t.o.v. $1,62 mrd in 2024 — geverifieerd via stockanalysis.com/stocks/octv), **ARR ca. $1,1 mrd** (66% van de omzet is terugkerend abonnement; ARR-CAGR 8% over 2022–2025), **~7.200 medewerkers** in 45 landen, 14.000+ klanten in 180 landen, 60%+ van de Global Fortune 500 als klant. Doel: 6–8% ARR-groei in 2026, 10%+ op middellange termijn. De eigen SAM-schatting is ~$28 mrd (2025) → ~$40 mrd (2029).

EcoSys/Sequence Enterprise is één product binnen de **Sequence**-productfamilie, samen met **Projectmates** (owner-side capital program management, door Hexagon overgenomen). Sequence Enterprise is daarbinnen het zware enterprise-project-controls-platform.

### Wat het product doet

EcoSys is géén planningstool in de zin van P6 of MS Project. Het is een **enterprise project performance-platform**: de "single source of truth" voor de *financiële en prestatiekant* van grote kapitaalprojecten en -portfolio's. De kern is kosten: budget, forecast, wijzigingsbeheer, verplichtingen, actuals, earned value. Planning (schedule) is er wél, maar historisch en functioneel is dat het aanvullende been, niet het hoofdbeen — de schedule komt in de regel uit Primavera P6 en wordt via een connector ingelezen om EVM en cost/schedule-integratie mogelijk te maken.

De marketingpositionering is de "EPP-laag" die boven ERP (SAP/Oracle EBS) en boven de scheduler (P6) hangt en die beide werelden koppelt.

### Doelgroep en typische gebruikers

**Organisatietype:** grote, kapitaalintensieve organisaties met een portfolio van projecten van tientallen miljoenen tot miljarden. Zowel *owner-operators* (nutsbedrijven, olie & gas, mijnbouw, infrastructuurbeheerders) als *EPC-contractors* (engineering & construction).

**Rollen die er dagelijks in werken:**
- Project controls engineers / cost engineers (de primaire gebruikersgroep)
- Cost controllers en projectadministratie
- Planners — maar meestal indirect: zij werken in P6 en hun data landt in EcoSys
- Projectmanagers en programmamanagers (rapportage, forecast-goedkeuring)
- Portfolio- en investeringsverantwoordelijken (capital budgeting, funding)
- Executives (dashboards, KPI's)

**Sectoren** (mindshare-verdeling volgens PeerSpot, 2026): energie & nutsbedrijven **17%**, bouw **14%**, productie/manufacturing **12%**, daarnaast chemie, olie & gas, metalen & mijnbouw, transportinfrastructuur, scheepsbouw, farma, telecom, overheid en vastgoedontwikkeling.

**Regio's:** wereldwijd, met het zwaartepunt in Noord-Amerika (oorsprong New York; sterke aanwezigheid bij Amerikaanse nutsbedrijven en EPC's), gevolgd door het Midden-Oosten (olie & gas, megaprojecten), Europa en Australië (mijnbouw). Het implementatie-ecosysteem (o.a. FTI Consulting, dat "more than 35 years of EcoSys-specific implementation experience" claimt in zijn team) is het sterkst in de VS.

**Genoemde klanten** (uit PeerSpot en vendor-materiaal): Bechtel, Dow, Jacobs, Duke Energy, BHP Billiton, Ball, Technip, Burns & McDonnell.

---

## 2. Functionaliteit en techniek

### Modulaire opbouw

Octave/Hexagon noemt zes kerncapaciteiten:

1. **Project Portfolio Management** — strategie ↔ uitvoering, resource-optimalisatie, portfoliodata voor strategische planning
2. **Project Controls & Project Management** — volledige projectlevenscyclus, on-time/on-budget sturing
3. **Project Planning, Scheduling & Estimating** — geïntegreerd raming-, plannings- en schedulebeheer
4. **Earned Value & Performance Management** — EVM op enterprise-niveau, voorspelling van uitkomsten
5. **Budgeting & Forecasting** — budget en forecast gekoppeld over rollen en deliverables heen
6. **Capital Budgeting & Funding** — budget- en fondsbeheer op portfolioniveau

### CPM-engine, kalenders, schedule

Dit is het punt waar EcoSys het meest wordt misverstaan, dus expliciet:

**EcoSys héeft een eigen schedulingmodule.** Volgens de officiële *EcoSys Scheduling Solution Sheet* biedt die:
- Schedule templates
- **Kalenderbeheer**
- WBS-opbouw en activiteiten met datums, duren, **relaties (dependencies)** en **constraints**
- **Resource loading**
- **Critical path analysis** visualisaties
- **Baseline capture, -beheer en -vergelijking**
- Koppeling van de schedule-WBS aan de kosten-CBS (cost breakdown structure)

**Maar** de leverancier positioneert die module zelf expliciet als de lichte variant. Letterlijk uit de solution sheet: *"EcoSys' scheduling capability is robust enough to satisfy the needs of 80% of your projects."* En: *"For more complex projects (the remaining 20%), schedules can be created in third-party tools like P6 and Microsoft Project, which integrate with EcoSys."* Een blogpost van Hexagon zelf bevestigt dat: *"Integration with external schedules from Primavera P6 or Microsoft Project will still be needed for projects requiring the use of COTS scheduling platforms."*

**Praktische conclusie:** er zit een CPM-achtige rekenkern in (critical path, relaties, constraints, kalenders), maar dit is een *eenvoudige* engine bedoeld voor kleine en middelgrote schedules en voor kostgedreven planning op WBS-niveau. Wie retarded logic, multiple float paths, resource levelling, out-of-sequence-progress-opties, P6-achtige constraint-typen of tienduizenden activiteiten nodig heeft, gebruikt P6 en importeert het resultaat. *(Inschatting op basis van de vendor-positionering en het ontbreken van gedetailleerde algoritmische documentatie — Octave publiceert geen technische specificatie van de schedule-engine.)*

### Kosten- en resourcemodel

Dit is de echte kracht. Het model is dat van een klassiek cost-engineering-systeem, maar dan enterprise-schaal en configureerbaar:

- **CBS** (cost breakdown structure) naast en gekoppeld aan de WBS
- Cost accounts / control accounts, meerdere kostensoorten (labour, material, equipment, subcontract, indirect)
- Budget → approved changes → current budget → commitments → actuals → estimate-to-complete → estimate-at-completion, met volledige audit trail
- **Change management / wijzigingsbeheer** als eersteklas proces met workflow en goedkeuring (dit is een van de sterkste onderdelen)
- Contract- en verplichtingenbeheer
- Meerdere valuta's, escalatie, contingency- en risicoreserve-beheer
- Resourcemodel gericht op *kosten en uren* (rates, rate tables, forecasting van manuren) meer dan op fysieke resource-levelling

### Baselines

Baseline capture en -vergelijking zitten zowel aan de schedulekant (baseline schedule, variance) als aan de kostenkant (budgetbaseline, change-controlled). Voor EVM is de gekoppelde cost/schedule-baseline (PMB) het centrale concept.

### Earned Value / EVM

EVM is een kernfunctie, geen add-on: PV/EV/AC, CPI/SPI, TCPI, variance-analyse en forecast-methoden op control-accountniveau, geaggregeerd naar project en portfolio. Meerdere reviewers noemen expliciet de automatische berekening van performance-indices als pluspunt. Dit is een van de weinige commerciële platforms die EVM op *portfolio*niveau serieus doet — relevant voor omgevingen met EIA-748-verplichtingen (Amerikaanse overheid/defensie/energie).

### Risico en Monte Carlo

**Zwak punt, en eerlijk te benoemen.** Er is *geen aangetoonde native Monte-Carlo-/QSRA-engine* in EcoSys. Reviewsites noemen "risk assessment" in featurelijsten, maar dat betreft risicoregisters, contingency-drawdown en reservebeheer — niet probabilistische schedule- of kostensimulatie. Gerichte zoekopdrachten naar EcoSys + Monte Carlo leveren uitsluitend de gevestigde risicotools op (Deltek Acumen Risk, Safran Risk, Primavera Risk Analysis). Wie kwantitatieve risicoanalyse wil, koppelt een apart pakket. *(Conclusie op basis van afwezigheid van bewijs in vendor-documentatie en zoekresultaten; geen expliciete ontkenning door de leverancier gevonden.)*

### 4D / BIM / IFC

**Ook zwak, en voor de opdrachtgever het belangrijkste punt.** EcoSys heeft geen native 4D-viewer, geen modelkoppeling en geen aangetoonde IFC-ondersteuning. Gerichte zoekopdrachten op EcoSys/Sequence Enterprise in combinatie met IFC, openBIM, buildingSMART en IfcWorkSchedule leveren **nul** treffers op — noch in vendor-documentatie, noch bij derden.

BIM en 4D leefden binnen het Hexagon-concern in *andere* producten (HxGN SMART Build, OpenCAD BIM/HxGN EAM, de Intergraph 3D-portefeuille, Bricsys). De acquisitieratio in 2015 werd destijds wél zo omschreven — "integration of project scheduling (4D) and cost management (5D) with Intergraph PP&M's 3D design and construction solutions" — maar dat is een concernstrategie geweest, geen functie *in* EcoSys. Een gebruiker die model-gedreven planning wil, gebruikt EcoSys niet daarvoor.

### Portfolio en rapportage

- Portfolio-optimalisatie, scenarioplanning, investeringsprioritering, capital budgeting en funding — dit is een genuanceerd sterk punt (Gartner-reviewers noemen "excellent support for strategic planning and investment prioritization")
- Rapportage: configureerbare spreadsheets, dashboards, KPI's, drill-down. Sterk qua mogelijkheden, **maar** meerdere reviewers noemen dat het aanpassen ervan aanzienlijke technische expertise vereist
- Power BI-koppeling is een veelvoorkomend patroon in de praktijk (zie interoperabiliteit)

### Platform en techniek

- **Architectuur:** Java-gebaseerde webapplicatie (server + database) — bevestigd door de eigen installatie-/systeembeheerdocumentatie, die deployment op **Oracle WebLogic en IBM WebSphere** beschrijft en expliciet over een "Java application server" spreekt. Toegang via browser; ook mobiele toegang (iOS/Android, inmiddels als expliciete mobile app op de Octave-productpagina) en desktopgebruik genoemd
- **Database:** Oracle Database of Microsoft SQL Server, via JDBC
- **Deployment:** on-premises, gehost bij derden (o.a. LoadSpring, dat 99,9% uptime claimt), Microsoft Azure, en tegenwoordig SaaS. Octave-marketing spreekt inmiddels van "a scalable, true cloud architecture" — de heruitgevonden cloud-positionering is recent, de installed base is nog grotendeels on-prem/gehost *(inschatting)*
- **Roadmap:** Octave kondigt **Sequence Enterprise 10** aan voor **zomer 2026**, met expliciet *documentbeheer*, verbeteringen in de cloudarchitectuur, mobiele functionaliteit en AI-functies. Relevant, want documentbeheer is precies een van de gedocumenteerde tekortkomingen (zie nadeel 10)
- **Versies:** de 8.x-lijn (o.a. 8.8) en 9.x-lijn (o.a. 9.3) zijn in het veld; EcoSys 8 dateert van november 2017; versie 10 is aangekondigd voor zomer 2026. Compatibiliteitsvragen tussen P6 EPPM-versies en specifieke EcoSys-versies zijn een terugkerend thema op het Oracle-community-forum
- **Configuratie boven code:** EcoSys is berucht configureerbaar — spreadsheets, formules, workflows, rolgebaseerde schermen en business rules worden ingericht zonder maatwerkcode. Dat is tegelijk de grootste kracht en de grootste kostenpost

### Schaalbaarheid

Harde, door de leverancier gepubliceerde limieten zijn er niet. Op basis van klantprofiel (Bechtel, Dow, Duke Energy, BHP) en architectuur:

- **Portfolio/kosten:** realistisch tienduizenden projecten en miljoenen kostenregels — dit is waar het systeem voor gebouwd is en waar het bewezen is *(inschatting)*
- **Schedule-activiteiten in de native module:** realistisch honderden tot enkele duizenden activiteiten per project. De vendor-positionering ("80% van de projecten", "kleine tot middelgrote projecten") en het advies om voor complexe projecten naar P6 uit te wijken, wijzen op deze orde van grootte *(inschatting — niet door de leverancier bevestigd)*
- **Geïmporteerde schedule-data uit P6:** aanzienlijk hoger, want dat is opslag + aggregatie, geen berekening
- **Prestatie-waarschuwing uit reviews:** meerdere gebruikers melden trage invoer en performanceproblemen bij grote datasets — schaalbaarheid op papier is niet hetzelfde als responsiviteit in de praktijk (zie nadelen)

---

## 3. Prijzen

### De officiële situatie

**Er is geen publieke lijstprijs.** Octave/Hexagon publiceert geen prijzen; alles loopt via een offerte. Alle reviewsites bevestigen dit consistent:

| Bron | Uitspraak | Datum geraadpleegd |
|---|---|---|
| SelectHub | "Quote-based pricing", geen gratis proefversie | 25-07-2026 |
| Software Advice | "Custom quotes only; no transparent pricing available" | 25-07-2026 |
| Research.com | "No publicly available pricing information" | 25-07-2026 |
| CompareCamp | "Quote-based (no free trial listed)" | 25-07-2026 |
| Capterra | Geen concrete bedragen | 25-07-2026 |

### Gerapporteerde bedragen (met stevige kanttekening)

De onderstaande bedragen komen van **prijs-aggregatorsites**, niet van de leverancier en niet uit een geverifieerde aanbesteding. Deze sites (ITQlick, PricingNow, SelectHub) genereren schattingen op basis van modellen en gemelde deals; hun cijfers spreken elkaar onderling tegen. **Behandel alles hieronder als indicatie, niet als feit.**

| Bron (URL) | Bedrag | Model | Datum | Betrouwbaarheid |
|---|---|---|---|---|
| itqlick.com/ecosys-epc/pricing | **vanaf ~$200 per gebruiker/maand** | abonnement | 25-07-2026 | Laag-middel — aggregator-schatting |
| itqlick.com/ecosys-epc/pricing | ~**$1.500/maand voor 10 gebruikers** | abonnement | 25-07-2026 | Laag-middel |
| itqlick.com/ecosys-epc/pricing | **$10.000+/maand voor 100 gebruikers** | abonnement | 25-07-2026 | Laag-middel |
| itqlick.com/ecosys-epc/faq | "$200 per user/month, plus additional expenses for customization, data migration, training, and support" | abonnement + diensten | 25-07-2026 | Laag-middel |
| pricingnow.com/question/ecosys-epc-pricing/ | **$600–$2.400 per gebruiker/jaar** (= $50–$200/mnd) | abonnement | 25-07-2026 | **Laag** — vermoedelijk AI-gegenereerd |
| pricingnow.com | 10 gebruikers: **$6.000–$24.000/jaar**; 100 gebruikers: **$60.000–$240.000/jaar** | abonnement | 25-07-2026 | **Laag** |
| pricingnow.com | Implementatie **$5.000–$50.000**; training **$1.000–$5.000 per gebruiker** | eenmalig | 25-07-2026 | **Laag** |
| selecthub.com | "Cost range $10–$100" startprijs | quote-based | 25-07-2026 | **Laag** — inconsistent met de rest |

### Wat je hier realistisch uit kunt destilleren

De aggregatorcijfers zijn vrijwel zeker **structureel te laag** voor het werkelijke enterprise-segment waarin EcoSys verkocht wordt. Redenering:

- De doelgroep is organisaties met projectportfolio's van honderden miljoenen tot miljarden. Zulke deals lopen in de regel via meerjarige enterprise-overeenkomsten, niet via een prijs per stoel van $200
- EcoSys is een configuratie-zwaar product. De licentie is bij dit type systeem doorgaans een minderheid van de totale uitgave; implementatie, configuratie, integratiebouw en change management domineren
- Er bestaat een heel consultancy-ecosysteem rond EcoSys-configuratie (FTI Consulting, gespecialiseerde implementatiepartners, aparte vacaturecategorie "Implementation Consultant – EcoSys"). Dat ecosysteem bestaat niet rond een product van $200/gebruiker/maand

**Mijn schatting** (expliciet als schatting gemarkeerd, niet uit een bron): een serieuze eerste EcoSys/Sequence Enterprise-implementatie bij een middelgrote tot grote organisatie landt in de orde van **enkele honderdduizenden dollars in jaar 1** (licenties + implementatie + integraties), met terugkerende jaarlijkse licentie-/onderhoudskosten in de orde van **tienduizenden tot honderdduizenden dollars**, sterk afhankelijk van gebruikersaantal en modulescope. Voor de allergrootste EPC's en owner-operators kan dit veelvouden daarvan zijn. Ik heb hier **geen** bronbevestiging voor gevonden; het is een gefundeerde inschatting op basis van marktsegment en het bestaan van het implementatiepartner-ecosysteem.

### Licentiemodellen

- **Abonnement (SaaS / term licence)** is het huidige model dat door alle bronnen wordt genoemd; per gebruiker per maand/jaar
- **Perpetual + jaarlijks onderhoud** was het historische model uit de Hexagon PPM/on-prem-tijd; onderhoud typisch 18–22% van de licentiewaarde per jaar bij dit type enterprisesoftware *(inschatting op basis van marktgebruik; niet specifiek voor EcoSys bevestigd)*
- **Enterprise-staffels:** aanwezig, maar niet publiek. PricingNow noemt drie tiers (Basic/Standard, Pro/Professional, Enterprise) — die indeling is niet door de leverancier bevestigd en oogt generiek
- **Minimale afname:** niet publiek gedocumenteerd. Gezien het segment is een minimum in de tientallen gebruikers aannemelijk *(inschatting)*
- **Modules/add-ons:** EcoSys Connect (integratieplatform), connectoren (Oracle P6, SAP, Oracle EBS, MS Project) en de diverse functionele modules worden apart gepositioneerd; of ze apart geprijsd zijn is niet publiek

### Ter vergelijking

| Product | Genoemde prijs | Bron | Datum |
|---|---|---|---|
| Oracle Primavera P6 | **$3.168 per gebruiker/jaar** | selecthub.com/ppm-software/primavera-p6-vs-ecosys/ en selecthub.com/p/ppm-software/primavera-p6/ | 25-07-2026 |
| Oracle Primavera P6 Professional | ~$3.520 per gebruiker (perpetual) | projectmanagertemplate.com | 25-07-2026 |
| Oracle Primavera P6 EPPM | ~$2.750 basislicentie per application user (perpetual) | projectmanagertemplate.com | 25-07-2026 |
| Oracle Primavera P6 | $3.000–$25.000 per gebruiker/jaar (abonnement), 3–5-jarige contracten | vendorbenchmark.com | 25-07-2026 |
| Oracle Primavera P6 | vanaf $175 per gebruiker/maand | contractorsandbuilders.com | 25-07-2026 |
| EcoSys | Alleen op aanvraag | selecthub.com (idem) | 25-07-2026 |

> **Correctie t.o.v. een eerdere versie van dit profiel.** Het bedrag van **$3.168 per gebruiker/jaar voor P6 is géén door Oracle gepubliceerde lijstprijs** — het is het startbedrag dat *SelectHub* (dezelfde aggregatorcategorie als ITQlick) hanteert. Oracle publiceert net zo min als Octave een transparante prijslijst voor Primavera; onafhankelijke bronnen geven sterk uiteenlopende bedragen ($2.500–$25.000 per gebruiker/jaar; ~$2.750–$3.520 perpetual) en melden dat kortingen van 30–50% op lijstprijs gebruikelijk zijn. Het contrast "P6 is transparant, EcoSys niet" is dus **veel zwakker dan het lijkt**: het echte verschil is dat er voor P6 méér gelekte/afgeleide referentiepunten in omloop zijn, niet dat Oracle open kaart speelt.

Wat wél overeind blijft als marktsignaal: EcoSys wordt verkocht als enterprise-transformatietraject, niet als tool — er is geen zelfbedieningsinstap, geen proefversie en geen enkel bedrag van de leverancier zelf.

---

## 4. Voordelen

1. **Diepgang in kostenbeheersing die weinig concurrenten evenaren.** Dit is geen projectmanagementtool met een kostentabje; het is een volwaardig cost-engineeringsysteem — budget, wijzigingsbeheer, verplichtingen, actuals, ETC/EAC, meerdere valuta's, escalatie, contingency-beheer, met complete audit trail. Reviewers noemen dit consistent als hoofdreden voor aanschaf. SelectHub: gebruikers "praise strong cost control and tight integration with accounting systems for capital projects." Een reviewer op Software Advice: *"Cost management software at its finest"* voor grote datasets.

2. **Echte cost/schedule-integratie op portfolioniveau.** Het koppelen van de schedule-WBS aan de kosten-CBS, en het aggregeren daarvan over een heel portfolio, is precies waar losse tools (P6 voor tijd, Excel voor geld) stukloopt. EcoSys is hier architectonisch voor ontworpen. Gartner Peer Insights-reviewers roemen "portfolio-level cost, schedule and risk visibility for capital assets."

3. **Volwassen, enterprise-grade EVM.** Earned value is een eersteklas capability tot op control-accountniveau met automatische berekening van performance-indices, geaggregeerd naar programma en portfolio. Voor omgevingen met formele EVM-verplichtingen (Amerikaanse federale projecten, defensie, grote nutsprogramma's) is dit een van de weinige echte enterprise-opties.

4. **Extreem configureerbaar zonder maatwerkcode.** Spreadsheets, formules, workflows, business rules en rolgebaseerde schermen worden ingericht, niet geprogrammeerd. Software Advice noemt "enhanced flexibility, allowing organizations to tailor the user experience and business rules based on role, project size, and project type." Organisaties met eigengereide project-controls-processen kunnen die één-op-één afbeelden in plaats van hun proces aan de tool aan te passen.

5. **Sterke ERP- en systeemintegratie.** Koppelingen met SAP, Oracle EBS/Primavera, PeopleSoft en accountingsystemen zijn kernkost, niet bijzaak. EcoSys Connect maakt dit no-code/low-code met foutafhandeling, veldmapping, jobplanning en auditlogging. Een reviewer op Software Advice noemt als grootste pluspunt "integrating multiple systems and workflows in a single platform."

6. **Bewezen op megaproject-schaal, met referenties die ertoe doen.** Bechtel, Dow, Jacobs, Duke Energy, BHP Billiton, Technip, Burns & McDonnell. Dat zijn organisaties die het systeem onder extreme complexiteit hebben gevalideerd. Voor een risicomijdende inkoper is dat op zichzelf een argument.

7. **Portfolio- en investeringssturing, niet alleen projectuitvoering.** Capital budgeting, funding, scenarioplanning en investeringsprioritering zitten in hetzelfde systeem als de uitvoeringsdata. Gartner-reviewers noemen expliciet "excellent support for strategic planning and investment prioritization" en "alignment with complex, multi-year infrastructure portfolios."

8. **Geloofwaardige, zij het vendor-gefinancierde, ROI-onderbouwing.** Een Forrester Total Economic Impact-studie (2022, in opdracht van Hexagon) rapporteert 20% minder kostenoverschrijdingen, 25% hogere productiviteit van project controllers en 85% ROI over drie jaar. Vendor-gesponsord en dus met korrel zout, maar het is meer kwantitatieve onderbouwing dan de meeste concurrenten leveren.

9. **Volwassen implementatie-ecosysteem.** Er bestaat een echte markt van gespecialiseerde EcoSys-configurators en implementatiepartners (o.a. FTI Consulting), plus een actieve praktijkcommunity (Google Groups "ecosys-configurators"). Je bent niet afhankelijk van uitsluitend de leverancier voor kennis.

10. **Schedule-integratie is volwassen en wordt actief doorontwikkeld.** De Oracle P6 Connector verving de oudere P6 Adapter en ondersteunt meerdere P6-instanties, master-data-integratie en activity imports; er is inmiddels ook een directe **XER-import** waarmee P6-schedules zonder maatwerk binnenkomen. SAP-, Oracle EBS- en MS Project-connectoren zijn in ontwikkeling.

---

## 5. Nadelen

1. **Steile leercurve en een niet-intuïtieve interface — het meest genoemde bezwaar, met afstand.** G2 vat het samen: *"EcoSys can be complex to navigate, especially for new users, due to its steep learning curve and non-intuitive interface."* Een reviewer op Software Advice (nutsbedrijf, 5.000–10.000 medewerkers, 2+ jaar gebruik, 3 sterren): *"Too complex, heavy learning curve"*. Dit is geen tool die je een projectmanager op vrijdagmiddag uitlegt.

2. **Verouderde UI.** Meerdere onafhankelijke bronnen. Software Advice noemt ease-of-use **3,4/5** tegenover functionaliteit 4,2/5 — een veelzeggend gat, en een reviewer omschrijft de interface letterlijk als "outdated" en spreadsheet-achtig. Research.com noemt "outdated user interface compared to contemporary tools". Ter vergelijking scoort P6 zelf 84% aanbeveling tegen EcoSys 81%, maar beide verliezen ruim van moderne tools (Wrike 4,4; monday.com 4,6 op usability).

3. **Trage invoer en performanceproblemen.** Zeer concreet en herhaald. Een reviewer in olie & energie (10.000+ medewerkers, 2 sterren): *"Time to input information is extremely slow"* door voortdurende webrefreshes. SelectHub bevestigt: "slow or laggy input, particularly within text fields, which impacts productivity". Research.com: "performance issues with large datasets". Voor een systeem waarin cost engineers de hele dag data invoeren is dit een structurele productiviteitsrem, geen schoonheidsfoutje.

4. **Rapportage en dashboards aanpassen vereist technische specialisten.** G2: het customizen van rapporten en dashboards "demands considerable technical expertise, which slows down quick decision-making". De configureerbaarheid die als voordeel geldt, slaat hier om: elke wijziging loopt via een configurator in plaats van via de gebruiker zelf. Dat creëert een interne afhankelijkheid en een doorlooptijd van weken voor wat elders een middagje is.

5. **Lange, dure implementatie en permanente configuratie-afhankelijkheid.** SelectHub: "implementation can be lengthy" en verlengt de projectstart. Het bestaan van een volwaardige beroepsgroep "EcoSys implementation consultant" (vacatures vragen 5+ jaar implementatie-ervaring plus specifieke EcoSys-configuratie-ervaring) zegt genoeg over de benodigde inspanning. De totale eigendomskosten worden gedomineerd door diensten, niet door licenties.

6. **Ondoorzichtige prijsstelling.** Geen enkel publiek bedrag van de leverancier. Elke inkoper moet blind een verkoopproces in, zonder ankerpunt en zonder de mogelijkheid om vooraf te toetsen of het budget überhaupt in de buurt komt. Dat is een reëel nadeel bij vergelijkend inkopen. *(Nuance na verificatie: het vaak aangehaalde contrast met P6 — "$3.168/gebruiker/jaar" — houdt maar half stand. Ook dat bedrag komt van een aggregator (SelectHub), niet van Oracle; Oracle publiceert evenmin een transparante Primavera-lijstprijs en onafhankelijke schattingen lopen van $2.500 tot $25.000 per gebruiker/jaar. Het verschil is gradueel: rond P6 circuleren meer referentiepunten, rond EcoSys vrijwel geen.)*

7. **De native scheduling is niet toereikend voor complexe planning — de leverancier zegt dat zelf.** "Robust enough for 80% of your projects" is een eerlijk maar onthullend statement. Voor de resterende 20% — precies de megaprojecten waar EcoSys aan de kostenkant voor verkocht wordt — moet je alsnog P6 of MS Project licentiëren en beheren. Je koopt dus geen vervanging van je scheduler, je koopt er een systeem bij. Dat betekent een tweede licentiestroom, een tweede leercurve, een integratie die onderhouden moet worden en een permanente synchronisatievraag.

8. **Geen native kwantitatieve risicoanalyse.** Geen aangetoonde Monte-Carlo-/QSRA-engine. Wie probabilistische kosten- of scheduleanalyse wil, koopt daarnaast Acumen Risk, Safran Risk of Primavera Risk Analysis. Voor een platform dat zich als volledig project-controls-platform positioneert is dat een opvallend gat, temeer omdat contingency-bepaling juist een kernvraag is in kapitaalprojecten.

9. **Geen BIM, geen 4D, geen IFC.** Zie sectie 6. Voor een organisatie met een modelgedreven werkwijze is EcoSys een eiland: de planning en kosten leven volledig los van het bouwwerkinformatiemodel. Er is geen migratiepad en geen roadmap-signaal gevonden.

10. **Beperkte documentbeheerfunctionaliteit.** Concreet genoemd door een reviewer (mechanical/industrial engineering, 4 sterren): "limited document attachment capabilities". Voor een systeem dat wijzigingsbeheer en contractbeheer doet — processen die inherent documentzwaar zijn — is dat lastig. *(Wordt aangepakt: Octave kondigt documentbeheer expliciet aan als nieuwe functie in **Sequence Enterprise 10**, gepland zomer 2026. Op het moment van schrijven nog niet uitgeleverd of onafhankelijk beoordeeld.)*

11. **Releasefrequentie als klacht.** Het enige expliciet genoemde nadeel in de Gartner Peer Insights-reviews is "continual releases" — de update-cadans zelf wordt als belastend ervaren, wat bij een zwaar geconfigureerd systeem logisch is: elke release vraagt regressietests op de eigen configuratie.

12. **Dalende zichtbaarheid en een dubbele identiteitsbreuk.** PeerSpot registreert een terugval in mindshare in de PPM-categorie van **3,1% naar 1,3%** in één jaar, en heeft überhaupt geen reviews kunnen verzamelen. Gartner Peer Insights heeft slechts **5** reviews. Bovendien is het product in korte tijd twee keer van naam en één keer van eigenaar veranderd (Hexagon PPM → Hexagon ALI → Octave; EcoSys → Sequence Enterprise). Dat maakt kennisopbouw, zoeken naar documentatie en het inschatten van de leveranciersstabiliteit lastiger — en een verse beursgang brengt onvermijdelijk een periode van herstructurering met zich mee.

13. **Vendor lock-in via configuratie.** De zwaarte van de configuratie is zelf de lock-in: al je project-controls-processen, formules, workflows en rapporten zitten in een propriëtair systeem dat je alleen met gespecialiseerde consultants kunt onderhouden of verlaten. Research.com noemt daarnaast "limited third-party integration capabilities" — de integraties die er zijn, zijn goed, maar buiten de gebaande paden (P6, SAP, Oracle) wordt het maatwerk.

---

## 6. Interoperabiliteit

*Voor de opdrachtgever de belangrijkste sectie. Korte samenvatting: EcoSys is uitstekend geïntegreerd met de Oracle/SAP-wereld en volledig afwezig in de openBIM-wereld.*

### Schedule-uitwisseling

| Formaat / kanaal | Status | Toelichting |
|---|---|---|
| **Oracle Primavera P6 (XER)** | ✅ Ondersteund | Directe **XER Import** beschikbaar; leest P6-schedules in "zonder custom development". Naast de connector de laagdrempeligste route |
| **Oracle Primavera P6 (connector)** | ✅ Volwassen | **EcoSys Oracle P6 Connector**, vervanger van de oudere P6 Adapter. Ondersteunt **meerdere P6-instanties**, activity imports én master-data-integratietypen. Draait via EcoSys Connect met jobplanning, foutafhandeling, veldmapping, dispatcherlogs en auditing |
| **P6 XML** | ⚠️ Onbevestigd | Niet expliciet gedocumenteerd in de gevonden bronnen. Gezien de XER-ondersteuning en de connector-architectuur waarschijnlijk aanwezig of eenvoudig te realiseren *(inschatting)* |
| **Microsoft Project (MPP / MSPDI XML)** | 🟡 In ontwikkeling | Hexagon noemt een **EcoSys MS Project Connector** expliciet als "in development" ten tijde van de EcoSys Connect-aankondiging. Integratie met MS Project-schedules wordt in productmateriaal als ondersteund scenario genoemd; de kant-en-klare connector was recenter dan de P6-variant |
| **CSV / spreadsheet** | ✅ Ondersteund | EcoSys is spreadsheet-centrisch van opzet; import/export via CSV en Excel is een basisfunctie en in de praktijk een veelgebruikte route |

### ERP en financiële systemen

| Systeem | Status |
|---|---|
| **SAP** | ✅ Ondersteund; dedicated **EcoSys SAP Connector** aangekondigd/uitgerold |
| **Oracle E-Business Suite** | ✅ Dedicated **EcoSys Oracle EBS Connector** |
| **PeopleSoft** | ✅ Genoemd als ondersteunde integratie |
| Overige accountingsystemen | ✅ Via EcoSys Connect / generieke database- en API-koppelingen |

### API's

- **REST API** aanwezig; er is een **Postman-collectie** voor EcoSys-API's beschikbaar en Hexagon/Octave publiceert RESTful-API-documentatie via het supportportaal
- **EcoSys Connect** is het no-code/low-code integratieplatform daarboven: jobs, stappen, planning (tijd/datum/wekelijks/maandelijks), veldmapping, foutafhandeling, migratie van jobs tussen instanties, dispatcherlogs en health monitoring
- **Directe databasetoegang** (Oracle/SQL Server via JDBC) is technisch mogelijk en wordt in de praktijk gebruikt voor Power BI-rapportage. Een veelgezien praktijkpatroon in het veld is de keten **P6 → EcoSys → SAP → Power BI**

### IFC / openBIM — de conclusie die telt

| Standaard | Status |
|---|---|
| **IFC (alle versies, incl. 4.3)** | ❌ **Geen aangetoonde ondersteuning** |
| **IfcWorkSchedule / IfcTask / IfcWorkPlan** | ❌ Geen aangetoonde ondersteuning |
| **buildingSMART / openBIM-certificering** | ❌ Niet gevonden |
| **4D-modelkoppeling** | ❌ Niet native |
| **BCF** | ❌ Niet gevonden |

Gerichte zoekopdrachten op EcoSys en Sequence Enterprise in combinatie met IFC, openBIM, buildingSMART en IfcWorkSchedule leveren **nul relevante treffers** op — noch in vendor-documentatie, noch bij implementatiepartners, noch bij derden. IFC-verwerking bestaat wél elders in de voormalige Hexagon-portefeuille (HxGN EAM/OpenCAD BIM kan een 3D BIM-model als IFC-bestand inlezen), maar dat is een ander product met een andere doelgroep en er is geen koppeling tussen die twee gevonden.

**Wat dit betekent voor een open-source, IFC-gebaseerde planner:**

- Er is **geen directe, standaard-gebaseerde uitwisselingsroute** tussen een IFC-planner en EcoSys. Wie de twee wil koppelen, moet via een tussenformaat.
- De **praktische brug is XER of CSV**. Een IFC-planner die betrouwbaar XER kan exporteren (of P6 XML) kan zijn schedule via de bestaande, volwassen P6-import-route in EcoSys krijgen — EcoSys hoeft dan niet te weten dat de bron geen P6 was. Dat is verreweg het kansrijkste integratiepad.
- Andersom is **CSV/Excel-export uit EcoSys** de meest realistische route om kosten- en voortgangsdata terug te halen naar een open planner, aangevuld met de REST API voor wie het wil automatiseren.
- Strategisch: het IFC-gat is **een positioneringskans, geen dreiging**. EcoSys concurreert niet op modelgedreven planning en geeft geen enkel signaal die kant op te bewegen. Een open, IFC-native planner speelt in een aangrenzende ruimte en kan zich juist als de model-kant van de vergelijking positioneren — met XER-export als toegangsbewijs tot de bestaande enterprise-keten.

---

## 7. Marktpositie

### Waar sterk, en waarom

EcoSys is dominant in een smalle maar zeer lucratieve niche: **enterprise project controls voor kapitaalintensieve organisaties met een groot, complex projectportfolio**. Nutsbedrijven, olie & gas, mijnbouw, chemie en grote EPC-contractors.

Die sterkte rust op vier pijlers:
1. **Diepte in kostenbeheersing** die generieke PPM-tools (Planview, monday.com, Smartsheet) principieel niet halen
2. **Portfolio-aggregatie** die losse cost-tools niet halen
3. **Een dertig jaar oude installed base** met bijbehorend implementatie-ecosysteem en switching costs
4. **Complementariteit met P6** in plaats van concurrentie ermee — het is de kostenlaag boven de scheduler die iedereen toch al heeft

### Belangrijkste concurrenten

| Concurrent | Positionering t.o.v. EcoSys |
|---|---|
| **Oracle Primavera Unifier** | De directste rivaal. Zelfde ruimte (owner-side cost & program controls), zelfde koppeling met P6, maar met het thuisvoordeel van één leverancier voor scheduler + controls. Klanten die al zwaar in de Oracle-stack zitten kiezen zelden EcoSys. Omgekeerd is EcoSys' argument: onafhankelijkheid van Oracle en diepere cost-engineering-functionaliteit *(inschatting op basis van de positioneringen; harde vergelijkende reviewdata tussen beide is schaars)* |
| **Oracle Primavera P6 / EPPM** | Geen concurrent maar een complement — en tegelijk een deel van de verkoopdrempel, want de klant heeft P6 al en vraagt zich af waarom hij een tweede systeem nodig heeft |
| **Oracle Primavera Portfolio Management** | Directe PPM-concurrent; op PeerSpot duidelijk sterker in zichtbaarheid (4,0% mindshare, rang 8, 92% aanbeveling) dan EcoSys (1,3%, rang 19, geen reviewscore) |
| **InEight** | De sterkste moderne uitdager, vooral in Noord-Amerikaanse capital construction; wordt door onafhankelijke lijstjes regelmatig als "strongest all-around platform" voor megaprogramma's genoemd |
| **Cleopatra Enterprise** (Cost Engineering, NL) | Sterker in cost estimating en benchmarking, smaller in portfolio/EVM. Europese concurrent, relevant voor Nederlandse context |
| **Planisware** | Leider in Gartners APMR Magic Quadrant; sterker in R&D/NPD-portfolio's, zwakker in constructie-cost-engineering |
| **Deltek Cobra / Acumen** | Sterker in pure EVM en risicoanalyse (Acumen Risk heeft de Monte-Carlo-engine die EcoSys mist) |
| **ARES PRISM, Safran, 4castplus** | Kleinere, gespecialiseerde project-controls-spelers |
| **Planview, Smartsheet, monday.com, Wrike** | Andere markt (generiek PPM/werkbeheer), maar knabbelen aan de onderkant bij organisaties die "goed genoeg" prefereren boven "diep" |

### Trend

**Stabiel tot licht krimpend in zichtbaarheid; onzeker door de afsplitsing.** Onderbouwing:

- **Negatief:** PeerSpot-mindshare in PPM daalde van **3,1% naar 1,3%** in één jaar. Zeer lage reviewvolumes op de grote platforms (Gartner Peer Insights: 5 reviews; **Software Advice: eveneens slechts 5 reviews** — geverifieerd 25-07-2026; PeerSpot: 0, met de letterlijke tekst "We have not yet collected reviews for EcoSys"; SelectHub: 58, maar dat is een geaggregeerd cijfer over meerdere platforms). Gartner heeft de PPM Magic Quadrant in 2019 opgeheven en EcoSys komt in de opvolgers (APMR, SPM) niet als leider naar voren. De dubbele rebrand fragmenteert bovendien de vindbaarheid.
- **Neutraal/positief:** de installed base is loyaal en de switching costs zijn enorm; er wordt actief doorontwikkeld (nieuwe P6 Connector, XER-import, EcoSys Connect, cloud-architectuur); en Octave als geheel mikt op 6–8% ARR-groei in 2026 en 10%+ daarna, met een SAM die van ~$28 mrd naar ~$40 mrd zou groeien.
- **Onzeker:** een net afgesplitst beursbedrijf staat onder margedruk en herstructureert doorgaans zijn portfolio. Of Sequence Enterprise daarin een groeimotor of een cash-cow wordt, is nog niet te zien.

Netto: dit is een **volwassen product in een volwassen markt** — geen groeiverhaal, wel een verankerd verhaal. *(Beoordeling deels inschatting; mindshare-cijfers van één bron.)*

### Opvallende klanten en verplichtstellingen

Bechtel, Dow, Jacobs, Duke Energy, BHP Billiton, Ball, Technip, Burns & McDonnell.

Er zijn **geen formele overheidsverplichtstellingen** gevonden zoals die voor P6 in sommige aanbestedingen bestaan. Wel is er een de-factomechanisme: grote EPC's en owners die EcoSys als concernstandaard hanteren, leggen daarmee rapportageformaten op aan hun keten. De marketingclaim "the global software standard for the project controls industry" is vendormateriaal, geen onafhankelijke vaststelling — maar in de Amerikaanse energie- en EPC-sector zit er een kern van waarheid in.

---

## 8. Eindoordeel

### Voor wie is dit de juiste keuze

- **Owner-operators en EPC's met een portfolio van honderden miljoenen tot miljarden**, waar een half procent kostenafwijking meer waard is dan de hele licentieprijs. Dit is de doelgroep waarvoor het gebouwd is en waarin het bewezen is.
- **Organisaties met formele EVM-verplichtingen** (EIA-748, Amerikaanse federale programma's, grote nutsprogramma's). Portfolio-brede earned value op control-accountniveau is zeldzaam en EcoSys doet het goed.
- **Organisaties met eigengereide, volwassen project-controls-processen** die niet bereid zijn zich naar een tool te voegen. De configureerbaarheid is dan een echte troef — mits er budget en menskracht is om die configuratie te bouwen én te onderhouden.
- **Bedrijven die P6 al hebben en de kostenlaag missen.** EcoSys is dan een aanvulling die precies het gat vult, met een volwassen connector.
- **Organisaties die bewust níét alles bij Oracle willen onderbrengen** en toch enterprise-grade project controls willen.

### Voor wie niet

- **Iedereen die primair een planner zoekt.** EcoSys is een kostensysteem met een lichte schedule-module. De leverancier zegt zelf dat 20% van de projecten alsnog P6 nodig heeft. Koop het niet om P6 te vervangen — dat lukt niet.
- **Kleine en middelgrote organisaties.** De implementatielast, de leercurve en het benodigde configuratie-ecosysteem staan volstrekt niet in verhouding tot een portfolio van enkele tientallen miljoenen. Het product zal niet slecht werken; het zal alleen nooit terugverdiend worden.
- **Organisaties die snel willen starten.** Reken op een implementatietraject van maanden tot meer dan een jaar. Er is geen gratis proefversie en geen self-service-instap.
- **Modelgedreven / openBIM-organisaties.** Geen IFC, geen 4D, geen BCF, geen roadmap-signaal. Wie zijn planning aan het bouwwerkinformatiemodel wil hangen, moet ergens anders zijn — of zelf de brug bouwen.
- **Wie kwantitatieve risicoanalyse nodig heeft.** Geen Monte Carlo. Reken op een extra pakket en dus een extra integratie.
- **Wie prijszekerheid vooraf wil.** Geen enkel publiek bedrag. Je gaat het verkoopproces blind in.
- **Teams die waarde hechten aan gebruikerservaring.** Ease-of-use 3,4/5 tegen functionaliteit 4,2/5, herhaalde klachten over trage invoer en een verouderde interface. Als adoptie onder niet-specialisten een succesfactor is, is dit een risico.

### Relevantie voor een open-source, IFC-gebaseerde planner

Drie observaties:

1. **EcoSys is geen concurrent, maar wel een potentiële afnemer van data.** Het speelt in de kostenlaag; een IFC-planner speelt in de model- en tijdlaag. Ze overlappen alleen in de lichte schedule-module die EcoSys zelf als "80%-oplossing" wegzet.
2. **XER-export is het toegangsbewijs.** EcoSys heeft een volwassen, actief onderhouden P6-importroute (connector plus directe XER-import). Een open planner die betrouwbaar XER of P6 XML wegschrijft, kan zonder medewerking van de leverancier in de enterprise-keten meedraaien. Dat is een concreter en goedkoper integratiedoel dan welke API-koppeling dan ook.
3. **Het IFC-gat is structureel, niet tijdelijk.** De hele voormalige Hexagon-portefeuille houdt BIM en project controls in gescheiden producten. Er is geen enkel signaal dat Sequence Enterprise IFC gaat ondersteunen. Voor een open, IFC-native planner is dat een duurzaam onderscheidend vermogen in plaats van een tijdelijk voorsprongetje.

---

## Bronnen

**Leverancier / officieel**
- [Sequence Enterprise (Formerly EcoSys) — Hexagon](https://hexagon.com/products/ecosys) — geraadpleegd 25-07-2026
- [Octave — bedrijfshomepage](https://octave.com/) — geraadpleegd 25-07-2026
- [Octave Sequence — Enterprise Project Performance Software](https://www.octave.com/products/project-performance/sequence) — geraadpleegd 25-07-2026
- [Sequence Enterprise productpagina — Octave](https://www.octave.com/products/project-performance/sequence/sequence-enterprise) — geraadpleegd 25-07-2026
- [EcoSys Scheduling Solution Sheet (PDF) — Hexagon PPM](https://bynder.hexagon.com/m/5100821dcc30d036/original/Hexagon_PPM_EcoSys_Scheduling_Solution_Sheet_US.pdf) — geraadpleegd 25-07-2026
- [Tips & Tricks: A Tour of EcoSys Connect — Hexagon ALI Resources](https://aliresources.hexagon.com/enterprise-project-performance/tips-tricks-a-tour-of-ecosys-connect) — geraadpleegd 25-07-2026
- [Simplifying Cost, Performance and Schedule Synchronization — Hexagon ALI Resources](https://aliresources.hexagon.com/enterprise-project-performance/simplifying-cost-performance-and-schedule-synchronization) — geraadpleegd 25-07-2026
- [EcoSys / Sequence Enterprise documentatieportaal](https://docs.hexagonali.com/p/E) — geraadpleegd 25-07-2026
- [Hexagon to acquire EcoSys Management LLC (persbericht, 2015)](https://hexagon.com/company/newsroom/press-releases/2015/hexagon-acquire-ecosys)
- [EcoSys organizes within Hexagon PPM, renames product (persbericht, 2017)](https://hexagon.com/company/newsroom/press-releases/2017/ecosys-organizes-within-hexagon-ppm-renames-product)
- [Hexagon PPM announces the release of EcoSys 8 (PRLog, nov 2017)](https://www.prlog.org/12675693-hexagon-ppm-announces-the-release-of-ecosys-8.pdf)
- [Separation of Octave — Hexagon Investor Relations](https://investors.hexagon.com/share-information/octave-separation)
- [Octave launches new brand (persbericht, 02-03-2026)](https://www.octave.com/newsroom/press-releases/2026/octave-launches-new-brand)
- [Octave holds Investor Day (persbericht, 26-03-2026)](https://www.octave.com/newsroom/press-releases/2026/octave-holds-investor-day)

**Reviewplatforms**
- [Gartner Peer Insights — Octave Sequence Enterprise](https://www.gartner.com/reviews/market/adaptive-project-management-and-reporting-software/vendor/hexagon/product/ecosys) — 4,5/5 op 5 reviews; geraadpleegd 25-07-2026
- [Software Advice — EcoSys profiel en reviews](https://www.softwareadvice.com/project-management/ecosys-profile/) — 3,8/5; functionaliteit 4,2, support 4,0, ease of use 3,4; geraadpleegd 25-07-2026
- [SelectHub — EcoSys](https://www.selecthub.com/p/project-management-software/ecosys/) — 81% tevredenheid, 58 reviews, #16 in PPM; geraadpleegd 25-07-2026
- [SelectHub — Primavera P6 vs EcoSys](https://www.selecthub.com/ppm-software/primavera-p6-vs-ecosys/) — P6 $3.168/gebruiker/jaar; geraadpleegd 25-07-2026
- [PeerSpot — EcoSys](https://www.peerspot.com/products/ecosys-reviews) — mindshare 1,3% (was 3,1%); klantenlijst; geraadpleegd 25-07-2026
- [PeerSpot — EcoSys vs Oracle Primavera Portfolio Management](https://www.peerspot.com/products/comparisons/ecosys_vs_oracle-primavera-portfolio-management) — geraadpleegd 25-07-2026
- [G2 — Octave Sequence Enterprise (EcoSys), pros & cons](https://www.g2.com/products/octave-sequence-enterprise-ecosys/reviews?qs=pros-and-cons) — geraadpleegd 25-07-2026 (deels via zoekindex; pagina zelf CAPTCHA-beschermd)
- [CompareCamp — EcoSys review](https://comparecamp.com/ecosys-review-pricing-pros-cons-features/) — score 80%; geraadpleegd 25-07-2026
- [Research.com — EcoSys review 2026](https://research.com/software/reviews/ecosys) — geraadpleegd 25-07-2026
- [Capterra — EcoSys EPC](https://www.capterra.com/p/76448/EcoSys-EPC/) — geraadpleegd 25-07-2026

**Prijsbronnen (alle van lage tot middelmatige betrouwbaarheid — aggregators, geen leveranciersopgave)**
- [ITQlick — EcoSys EPC pricing](https://www.itqlick.com/ecosys-epc/pricing) — vanaf ~$200/gebruiker/maand; geraadpleegd 25-07-2026
- [ITQlick — EcoSys EPC FAQ](https://www.itqlick.com/ecosys-epc/faq) — geraadpleegd 25-07-2026
- [PricingNow — EcoSys EPC pricing](https://pricingnow.com/question/ecosys-epc-pricing/) — $600–$2.400/gebruiker/jaar; geraadpleegd 25-07-2026

**Achtergrond, techniek en context**
- [Wikipedia — Hexagon AB](https://en.wikipedia.org/wiki/Hexagon_AB) — concernhistorie en overnames; geraadpleegd 25-07-2026
- [Oracle Community — Query related to integration with EcoSys](https://community.oracle.com/mosc/discussion/4573746/query-related-to-integration-with-ecosys) — EcoSys 8.8 / 9.3 versus P6 EPPM v23; geraadpleegd 25-07-2026
- [Oracle Help Center — Import/Export file formats (XER)](https://docs.oracle.com/cd/F88968_01/English/admin/p6_pro_importing_exporting/import_export_file_formats.htm)
- [FTI Consulting — EcoSys for Owners & Operators](https://www.fticonsulting.com/insights/service-sheets/ecosys-for-owners-operators) — implementatie-ecosysteem
- [LoadSpring — EcoSys cloudhosting](https://www.loadspring.com/) — deployment-opties
- [MarketScreener — Hexagon AB completed the spin-off of Octave Intelligence plc](https://www.marketscreener.com/) — geraadpleegd 25-07-2026
- LinkedIn-post over EcoSys XER Import (v. Osteicoechea, 2025) — bevestiging van directe XER-importfunctie
- Vacatureteksten "Implementation Consultant – EcoSys" (Octave, via ZipRecruiter/LinkedIn, 2026) — bevestiging van het configuratie-afhankelijke implementatiemodel

**Aanvullende bronnen uit de verificatieronde (25-07-2026)**
- [Octave — EcoSys becomes Octave Sequence Enterprise](https://www.octave.com/learn/resources/blogs/ecosys-becomes-octave-sequence-enterprise) — rebranding + aankondiging Sequence Enterprise 10 (zomer 2026, incl. documentbeheer)
- [Octave Intelligence plc listed on Nasdaq New York (persbericht, 28-05-2026)](https://www.octave.com/newsroom/press-releases/2026/octave-intelligence-plc-listed-on-nasdaq-new-york)
- [PR Newswire — "Octave unveiled: Hexagon reveals name for potential 2026 company spin-off" (17-06-2025)](https://www.prnewswire.com/news-releases/octave-unveiled-hexagon-reveals-name-for-potential-2026-company-spin-off-302484178.html)
- [ChemEngOnline — Hexagon software spinoff Octave launches brand identity and website (02-03-2026)](https://www.chemengonline.com/hexagon-software-spinoff-octave-launches-brand-identity-and-website/)
- [MarketScreener — Hexagon spinoff Octave begins trading on Nasdaq Stockholm today (25-05-2026)](https://www.marketscreener.com/news/hexagon-spinoff-octave-begins-trading-on-nasdaq-stockholm-today)
- [StockAnalysis — Octave Intelligence (OCTV) revenue 2022–2026](https://stockanalysis.com/stocks/octv/revenue/) — omzet 2025 $1,64 mrd, 7.200 medewerkers
- [Quartr — Octave Intelligence Investor Day 2026 summary](https://quartr.com/events/octave-intelligence-plc-octv-investor-day-2026_FTkOA7XU) — ARR-mix, retentie, groeidoelen
- [SelectHub — Primavera P6](https://www.selecthub.com/p/ppm-software/primavera-p6/) — $3.168/gebruiker/jaar (aggregatorcijfer)
- [VendorBenchmark — Oracle Primavera P6 pricing 2026](https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing) — $3K–$25K per gebruiker/jaar
- [ProjectManagerTemplate — Primavera P6 cost: license vs subscription](https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models) — ~$3.520 perpetual P6 Professional, ~$2.750 EPPM
- [Intergraph SmartSupport — EcoSys EPC System Admin Topics (PDF)](https://smartsupport1.intergraph.com/documentation/EcoSys/Version7604/EcoSys%20EPC%20System%20Admin%20Topics.pdf) — Java application server
- [PortfolioHub — Magic Quadrant for Project & Portfolio Management](https://portfoliohub.io/blog/magic-quadrant-project-portfolio-management) — Gartner PPM-MQ na mei 2019 opgeheven, opgesplitst in APMR + SPM
- [TED 396423-2026 — raamcontract met lot "Support for EcoSys EPC"](https://ted.europa.eu/en/notice/-/detail/396423-2026) — bestaan van Europese aanbesteding bevestigd via zoekindex; contractwaarde niet uitleesbaar (pagina blokkeert geautomatiseerde toegang)

**Methodologische kanttekening.** De WebSearch-quota van deze sessie waren uitgeput; het onderzoek is uitgevoerd via directe WebFetch-aanroepen en via een zoekindex (lite.duckduckgo.com) als vervangend zoekkanaal. Een aantal reviewplatforms (G2, Capterra, TrustRadius, Planning Planet, Reddit) blokkeert geautomatiseerde toegang met CAPTCHA; voor die bronnen is gewerkt met zoeksnippets en met de indexversies van de pagina's. Reddit-, Planning Planet- en TrustRadius-materiaal kon daardoor niet in de gewenste diepte worden ontsloten; de gebruikersfeedback in dit profiel leunt op Gartner Peer Insights, Software Advice, SelectHub, PeerSpot, CompareCamp en G2-snippets. Alle als "inschatting" gemarkeerde uitspraken zijn eigen gevolgtrekkingen zonder directe bronbevestiging.

---

## Verificatie

*Adversariële fact-check, uitgevoerd 25-07-2026 door een tweede reviewer met als opdracht de beweringen te wéérleggen, niet te bevestigen. Werkwijze: WebFetch op primaire bronnen plus een zoekindex (lite.duckduckgo.com) als zoekkanaal — de WebSearch-quota was ook in deze ronde uitgeput. Onderstaande oordelen gelden uitsluitend voor de expliciet genoemde bewering.*

### Prijsstelling en licentiemodel

| # | Bewering | Oordeel | Onderbouwing / bron |
|---|---|---|---|
| 1 | Geen publieke lijstprijs; uitsluitend op aanvraag, geen gratis proefversie | **Bevestigd** | Rechtstreeks nagelezen: SelectHub toont voor EcoSys "Quote-Based" / "Custom Quote" zonder trial, terwijl P6 op dezelfde vergelijkingspagina wél een bedrag én een trial krijgt. De productpagina van de leverancier zelf noemt geen enkel bedrag. [selecthub.com/ppm-software/primavera-p6-vs-ecosys](https://www.selecthub.com/ppm-software/primavera-p6-vs-ecosys/) · [octave.com/products/project-performance/sequence/sequence-enterprise](https://www.octave.com/products/project-performance/sequence/sequence-enterprise) |
| 2 | ITQlick: vanaf ~$200 per gebruiker/maand, ~$10.000+/maand bij 100 gebruikers, plus aparte kosten voor customization/datamigratie/training/support | **Bevestigd** (als correcte weergave van ITQlick — niet als correcte prijs) | ITQlick-snippets letterlijk: "A 100-user license for EcoSys EPC might cost around $10,000 per month, similar to Primavera P6" en "the total cost per license that starts at $200 per user/month, there are additional cost such as customization, data migration, training". Het deelcijfer "~$1.500/maand bij 10 gebruikers" kon niet los worden teruggelezen → zie #4. [itqlick.com/ecosys-epc/pricing](https://www.itqlick.com/ecosys-epc/pricing) |
| 3 | SelectHub noemt inconsistent een startrange "$10–$100" | **Bevestigd** | Letterlijk op de SelectHub-productpagina: "Based on our most recent analysis, EcoSys pricing starts in the range of $10 - $100", direct naast "Quote-Based". Dit is aantoonbaar een generieke bandbreedte-indeling, geen prijs. [selecthub.com/p/project-management-software/ecosys](https://www.selecthub.com/p/project-management-software/ecosys/) |
| 4 | ITQlick "~$1.500/maand bij 10 gebruikers" en alle PricingNow-bedragen ($600–$2.400 p/gebruiker/jaar; implementatie $5.000–$50.000; training $1.000–$5.000 p/gebruiker) | **Onzeker** | De PricingNow-pagina is via de zoekindex alleen als samenvatting terug te vinden ("subscription-based pricing model", "generally per-user, per-month"); de specifieke bedragen konden in deze ronde niet onafhankelijk worden teruggelezen. Het profiel markeert deze bron al als vermoedelijk AI-gegenereerd; dat oordeel blijft staan, maar de cijfers zijn nu ook *niet geverifieerd* in plaats van alleen *onbetrouwbaar*. Behandelen als niet-citeerbaar. [pricingnow.com/question/ecosys-epc-pricing](https://pricingnow.com/question/ecosys-epc-pricing/) |
| 5 | Ter vergelijking: Oracle Primavera P6 heeft **wél** een publiek bedrag: $3.168 per gebruiker/jaar | **Gecorrigeerd** | Het bedrag klopt als weergave van SelectHub (staat op minstens drie SelectHub-pagina's), maar de framing "publiek bedrag" is misleidend: het is géén door Oracle gepubliceerde lijstprijs, maar exact dezelfde soort aggregatorschatting die het profiel bij EcoSys terecht wantrouwt. Onafhankelijke bronnen geven sterk afwijkende cijfers: ~$3.520 perpetual voor P6 Professional en ~$2.750 basislicentie voor P6 EPPM, $3.000–$25.000 per gebruiker/jaar bij abonnement, of vanaf $175/gebruiker/maand — met 30–50% korting op lijst als gebruikelijk. Sectie 3 en nadeel 6 zijn hierop aangepast. [selecthub.com/p/ppm-software/primavera-p6](https://www.selecthub.com/p/ppm-software/primavera-p6/) · [vendorbenchmark.com/vendors/oracle-primavera-p6-pricing](https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing) · [projectmanagertemplate.com](https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models) |
| 6 | Licentiemodel is tegenwoordig abonnement/SaaS per gebruiker per maand/jaar; historisch perpetual + onderhoud van 18–22% | **Onzeker** (deels bevestigd) | Het SaaS/abonnementsmodel is indirect bevestigd: de leverancier beschrijft Sequence Enterprise nu als "modern, multi-tenant cloud architecture", en Octave rapporteert dat 66% van de omzet terugkerend abonnement is. Het percentage **18–22% onderhoud is en blijft een marktconventie-schatting** — geen enkele bron bevestigt dit voor EcoSys/Sequence Enterprise specifiek. Correct als schatting gemarkeerd; niet als feit gebruiken. [octave.com — Sequence Enterprise](https://www.octave.com/products/project-performance/sequence/sequence-enterprise) · [quartr.com — Investor Day 2026](https://quartr.com/events/octave-intelligence-plc-octv-investor-day-2026_FTkOA7XU) |
| 7 | Eigen schatting: eerste implementatie in de orde van enkele honderdduizenden dollars in jaar 1; aggregatorcijfers structureel te laag | **Onzeker — blijft schatting** | Poging tot weerlegging via onafhankelijke prijsankers (publieke aanbestedingen, contractwaardes) leverde geen bruikbaar cijfer op: usaspending.gov toont contracten aan EcoSys Management LLC (Dept. of Transportation, 2013) zonder uitleesbare bedragen in de index, en een Europese aanbesteding met een lot "Support for EcoSys EPC" (TED 396423-2026) blokkeert geautomatiseerde toegang. De schatting is dus **niet weerlegd én niet bevestigd**. Redenering blijft plausibel, status blijft: eigen inschatting zonder bronbevestiging. |

### Eigendom, levenscyclus en bedrijfscijfers

| # | Bewering | Oordeel | Onderbouwing / bron |
|---|---|---|---|
| 8 | Merk "Octave" onthuld op 2 maart 2026 | **Gecorrigeerd** | De **naam** "Octave" werd al op **17 juni 2025** bekendgemaakt (PR Newswire: "Octave unveiled: Hexagon reveals name for potential 2026 company spin-off"). Wat op **2 maart 2026** gebeurde was de lancering van de **merkidentiteit en website**. De tabel in sectie 1 is aangepast. [prnewswire.com](https://www.prnewswire.com/news-releases/octave-unveiled-hexagon-reveals-name-for-potential-2026-company-spin-off-302484178.html) · [chemengonline.com](https://www.chemengonline.com/hexagon-software-spinoff-octave-launches-brand-identity-and-website/) |
| 9 | Afsplitsing voltooid 22 mei 2026; eerste handelsdag Nasdaq Stockholm 25 mei 2026; beursnotering Nasdaq Stockholm | **Gecorrigeerd (onvolledig)** | De Stockholm-datum klopt (MarketScreener, 25-05-2026), maar het profiel miste twee feiten: de **distributie werd voltooid op 28 mei 2026**, en Octave heeft een **dubbele notering** — SDR's op Nasdaq Stockholm én Class B ordinary shares op **Nasdaq New York onder ticker OCTV** (vanaf 28-05-2026). Ook aangevuld: de Hexagon-AGM keurde de uitkering goed op 24 april 2026, en Octave Intelligence plc is een **Ierse** plc. Inleiding en tabel aangepast. [investors.hexagon.com/share-information/octave-separation](https://investors.hexagon.com/share-information/octave-separation) · [octave.com — listed on Nasdaq New York](https://www.octave.com/newsroom/press-releases/2026/octave-intelligence-plc-listed-on-nasdaq-new-york) |
| 10 | EcoSys is in 2015 door Hexagon overgenomen van het zelfstandige EcoSys Management LLC (New York) en heeft daarna Hexagon PPM → Hexagon ALI → Octave doorlopen | **Bevestigd** | Onafhankelijk bevestigd via het bestaan van federale contracten op naam van "ECOSYS MANAGEMENT LLC" (usaspending.gov, 2013 — dus als zelfstandige entiteit vóór 2015) en via de rebrandingpagina van Octave, die de keten zelfstandig bedrijf → Hexagon ALI → Octave beschrijft. [octave.com — EcoSys becomes Octave Sequence Enterprise](https://www.octave.com/learn/resources/blogs/ecosys-becomes-octave-sequence-enterprise) |
| 11 | Octave-kerncijfers: omzet 2025 ca. $1,64 mrd, ARR ca. $1,1 mrd, ~7.000 medewerkers, groeidoel 6–8% ARR in 2026 en 10%+ middellange termijn | **Bevestigd (met verscherping)** | Omzet 2025 exact $1,64 mrd (+1,32% t.o.v. $1,62 mrd) en **7.200** medewerkers (profiel zei ~7.000 — nu verscherpt). Groeidoelen 6–8% / 10%+ bevestigd. ARR ~$1,1 mrd is consistent met "66% van de omzet is terugkerend abonnement" maar niet als absoluut getal teruggelezen. [stockanalysis.com/stocks/octv/revenue](https://stockanalysis.com/stocks/octv/revenue/) · [quartr.com](https://quartr.com/events/octave-intelligence-plc-octv-investor-day-2026_FTkOA7XU) |
| 12 | Nieuw feit, ontbrak in het profiel | **Toegevoegd** | Octave kondigt **Sequence Enterprise 10** aan voor **zomer 2026**, met o.a. documentbeheer, cloudarchitectuur-verbeteringen, mobiel en AI. Dit raakt direct nadeel 10 (beperkt documentbeheer) — dat nadeel is nu van een roadmap-kanttekening voorzien. [octave.com — EcoSys becomes Octave Sequence Enterprise](https://www.octave.com/learn/resources/blogs/ecosys-becomes-octave-sequence-enterprise) |

### Technische claims

| # | Bewering | Oordeel | Onderbouwing / bron |
|---|---|---|---|
| 13 | De leverancier zegt zelf: *"EcoSys' scheduling capability is robust enough to satisfy the needs of 80% of your projects"*, met P6/MS Project voor de resterende 20%; module biedt kalenders, relaties, constraints, resource loading, critical path, baselines | **Bevestigd (letterlijk)** | De solution sheet is opgehaald en de volledige tekst geëxtraheerd. Citaat klopt woordelijk, inclusief het vervolg over P6 en Microsoft Project. Ook de capability-lijst klopt exact: schedule templates, "manage calendars and capture baselines", "WBS, activities, dates, durations, relationships and constraints", "resource load schedules", "critical path analysis visualizations", "manage and compare baselines", WBS↔CBS-integratie, pre-built P6-integraties via EcoSys Connect. Aanvullende, scherpere formulering in dezelfde sheet die het profiel niet citeerde: *"It is not intended to replace tools like Primavera P6 and Microsoft Project on larger, more complex projects."* Let op de nuance: er staat "critical path analysis **visualizations**" — dat is geen bewijs van een volwaardige eigen CPM-rekenkern. De voorzichtige formulering in sectie 2 is dus terecht. [Hexagon PPM EcoSys Scheduling Solution Sheet (PDF)](https://bynder.hexagon.com/m/5100821dcc30d036/original/Hexagon_PPM_EcoSys_Scheduling_Solution_Sheet_US.pdf) |
| 14 | Geen IFC-ondersteuning, geen buildingSMART/openBIM, geen native 4D, geen BCF | **Bevestigd (negatief bewijs, geen leveranciersontkenning)** | Herhaalde gerichte zoekopdrachten op EcoSys/Sequence Enterprise gecombineerd met IFC, BIM, 4D en buildingSMART leveren opnieuw **nul** treffers; de actuele Octave-productpagina noemt geen enkele van deze termen. Dit blijft bewijs uit afwezigheid — sterk, maar principieel niet hetzelfde als een ontkenning door de leverancier. Formulering "geen aangetoonde ondersteuning" is correct en moet zo blijven. [octave.com — Sequence Enterprise](https://www.octave.com/products/project-performance/sequence/sequence-enterprise) |
| 15 | Geen native Monte-Carlo-/QSRA-engine | **Bevestigd (negatief bewijs)** | Gerichte zoekopdracht EcoSys + Monte Carlo + QSRA levert uitsluitend generieke methodiekartikelen en de gevestigde risicotools op; geen enkele bron koppelt EcoSys aan een eigen simulatie-engine. Zelfde voorbehoud als #14: afwezigheid van bewijs, geen expliciete ontkenning. |
| 16 | Java-gebaseerde webapplicatie met Oracle/SQL Server-database | **Bevestigd (Java) / gedeeltelijk (database)** | De eigen systeembeheerdocumentatie spreekt expliciet over een "Java application server"; installatie- en upgradehandleidingen beschrijven deployment op **Oracle WebLogic** en **IBM WebSphere** (Windows en Unix/Linux). Dat is een sterkere onderbouwing dan het profiel had, en is toegevoegd. De databasekeuze Oracle/SQL Server kwam in de opgehaalde documentfragmenten niet expliciet terug — blijft dus **onzeker op documentniveau**, al is het consistent met alle secundaire bronnen. [Intergraph SmartSupport — EcoSys EPC System Admin Topics (PDF)](https://smartsupport1.intergraph.com/documentation/EcoSys/Version7604/EcoSys%20EPC%20System%20Admin%20Topics.pdf) |
| 17 | Schaalbaarheidsclaim: native schedulemodule realistisch honderden tot enkele duizenden activiteiten | **Onzeker — blijft schatting** | Geen enkele leveranciersbron publiceert activiteitenlimieten; de solution sheet bevestigt wel de kwalitatieve positionering ("simple project schedules", "small to medium sized projects"), maar geen getal. De numerieke orde van grootte in het profiel is een eigen extrapolatie en is als zodanig gemarkeerd. Niet citeren als vendorgegeven. |

### Markt- en reputatieclaims

| # | Bewering | Oordeel | Onderbouwing / bron |
|---|---|---|---|
| 18 | PeerSpot-mindshare gedaald van 3,1% naar 1,3%; geen reviews verzameld; klantenlijst Bechtel/Dow/Jacobs/Duke Energy/BHP/Ball | **Bevestigd** | Rechtstreeks nagelezen: 1,3% in de PPM-categorie per juli 2026, tegen 3,1% een jaar eerder; letterlijk "We have not yet collected reviews for EcoSys"; klanten en sectorverdeling (energie/utilities 17%, bouw 14%, manufacturing 12%) bevestigd. De nevenclaim "rang 19 t.o.v. Oracle Primavera Portfolio Management rang 8" kon **niet** worden gereproduceerd — de pagina toont EcoSys nu binnen een vergelijkingslijstje achter Broadcom Clarity (9,6%) en Planview Portfolios (6,4%). Rangnummers zijn volatiel en pagina-afhankelijk → als **onzeker** behandelen. [peerspot.com/products/ecosys-reviews](https://www.peerspot.com/products/ecosys-reviews) |
| 19 | Software Advice: 3,8/5 totaal, ease of use 3,4, functionaliteit 4,2, support 4,0; klachten over leercurve, "outdated" spreadsheet-achtige UI en extreem trage invoer | **Bevestigd (met verzwarende vondst)** | Alle vier de scores exact bevestigd, evenals de citaten "very outdated, based on spreadsheet-like interface" en "time to input information is extremely slow, as the web-based program has to refresh". **Nieuw en relevant:** die 3,8 is gebaseerd op slechts **5 reviews** — hetzelfde aantal als Gartner Peer Insights. Het profiel presenteerde Software Advice impliciet als een breder gedragen signaal; dat is bijgesteld in nadeel 12. [softwareadvice.com/project-management/ecosys-profile](https://www.softwareadvice.com/project-management/ecosys-profile/) |
| 20 | Forrester Total Economic Impact (2022, in opdracht van Hexagon): 20% minder kostenoverschrijdingen, 25% hogere productiviteit, 85% ROI over drie jaar | **Bevestigd** | Alle drie de cijfers teruggevonden, inclusief de expliciete vermelding dat de studie door Hexagon is gecommissioneerd. Het voorbehoud "vendor-gefinancierd" in het profiel is terecht en moet blijven staan. [aliresources.hexagon.com — The Total Economic Impact of EcoSys by Hexagon](https://aliresources.hexagon.com/enterprise-project-performance/the-total-economic-impact-of-ecosys-by-hexagon) |
| 21 | Gartner heeft de PPM Magic Quadrant in 2019 opgeheven; EcoSys komt in de opvolgers niet als leider naar voren | **Bevestigd** | De PPM-MQ is na de editie van **mei 2019** geschrapt en opgesplitst in Adaptive Project Management and Reporting (APMR) en Strategic Portfolio Management (SPM, eerste editie april 2022). Twee onafhankelijke beschrijvingen komen overeen. [portfoliohub.io](https://portfoliohub.io/blog/magic-quadrant-project-portfolio-management) |
| 22 | De vendorclaim "the global software standard for the project controls industry" is marketing, geen onafhankelijke vaststelling | **Bevestigd** | Er is in geen enkele onafhankelijke bron een marktaandeel-, analisten- of standaardisatie-uitspraak gevonden die "de standaard" onderbouwt. Integendeel: 1,3% mindshare, 5 reviews op twee grote platforms en geen leiderspositie in enige Gartner-opvolger wijzen de andere kant op. De sceptische formulering in sectie 7 blijft staan. |

### Wat níét geverifieerd kon worden

- **PricingNow-bedragen** (bewering #4) — bron alleen als samenvatting bereikbaar; alle specifieke bedragen zijn onbevestigd.
- **Contractwaardes uit publieke aanbestedingen** — usaspending.gov en TED bevatten aantoonbaar EcoSys-contracten, maar de bedragen zijn via geautomatiseerde toegang niet uitleesbaar. Dit blijft het meest kansrijke pad om de prijsschatting ooit hard te maken.
- **G2, Capterra, TrustRadius, Reddit, Planning Planet** — blokkeren geautomatiseerde toegang (CAPTCHA); de G2-citaten in dit profiel steunen op zoeksnippets en zijn niet op de bronpagina zelf geverifieerd.
- **Rangnummers in PeerSpot-mindshare** (rang 19 / rang 8) — niet reproduceerbaar; als onzeker markeren.
- **Databasekeuze (Oracle/SQL Server via JDBC)** — plausibel en consistent, maar niet in opgehaalde leveranciersdocumentatie teruggelezen.
