# Sectorrapport: Olie en gas — turnarounds en shutdowns (STO)

**Onderdeel van:** wereldwijd marktonderzoek planningssoftware
**Datum onderzoek:** 25 juli 2026
**Onderzoeksmethode:** 14 WebSearch-opdrachten + ~30 WebFetch-ophalingen op leveranciers­sites, analistenrapporten, gepubliceerde prijslijsten (Oracle G-Cloud 14, Oracle Texas DIR, IAMTech), vakpers en whitepapers.
**Auteur-notitie:** alle cijfers hebben een bron-URL. Waar ik zelf reken of extrapoleer staat expliciet **[SCHATTING]**. Waar een bron van twijfelachtige kwaliteit is (AI-gegenereerde syndicated reports) staat **[ZWAKKE BRON]**. Waar iets uit algemene vakkennis komt en niet online geverifieerd is in dit onderzoek, staat **[NIET GEVERIFIEERD]**.

---

## Managementsamenvatting

Turnarounds en shutdowns (STO — Shutdown, Turnaround & Outage) in olie en gas zijn het meest extreme planningsdomein dat er bestaat: een gebeurtenis van 3 tot 12 weken, met 1.500–4.000 extra mensen op de site, meer dan een miljoen manuren, 12–24 maanden voorbereiding, een totale kostenpost van tientallen miljoenen tot meer dan een miljard dollar, en een vertragingskost van grofweg 1–3 miljoen dollar per dag aan gederfde productie. De planning wordt gemeten in uren en ploegendiensten, niet in dagen.

De software­stack is tweelagig en dat is de kern van het verhaal:

1. **De CPM-motor is vrijwel monopolistisch Oracle Primavera P6.** Contractueel geëist, XER-uitwisseling als de facto standaard, en het enige pakket dat door opdrachtgever, hoofdaannemer, onderaannemer en claim-expert allemaal geaccepteerd wordt.
2. **Daarbovenop zit een lucratieve laag STO-specifieke suites** (Prometheus Group/Roser ConSys, Cleopatra STO Control, IAMTech iPlanSTO, Mobideo, Toadfly) die alles doen wat P6 níét doet — scope, workpacks, materialen, isolaties/blindlijsten, permit-to-work, veldvoortgang — en P6 als rekenmotor houden.

De betalingsbereidheid is **hoog tot zeer hoog**, en aantoonbaar: IAMTech publiceert $99.000 per site per jaar voor iPlanSTO en $165.000 voor iPlanUltimate ([bron](https://www.iamtech.com/products/shutdown-turnaround-outage-software)), en positioneert zichzelf daarbij expliciet als de *goedkope* optie tegenover Prometheus en Cleopatra. Oracle vraagt £220 per gebruiker per maand voor P6 EPPM Cloud met een minimum van 25 gebruikers ([bron](https://www.crowncommercial.gov.uk/agreements/RM1557.14), G-Cloud 14 prijsdocument, mei 2024) — £66.000 per jaar voordat je één activiteit hebt ingetikt.

Mijn schatting van de segmentomvang: **circa USD 300 miljoen per jaar (2025) voor planning- en schedulingsoftware in de olie- en gas-STO-niche in enge zin**, oplopend tot **USD 0,7–1,2 miljard** als je de volledige STO-managementsuite meerekent (uitvoering, permits, materialen, kostenbeheersing). Groeirichting: sterk opwaarts op korte termijn, gedreven door een enorme turnaround-golf — de wereldwijde raffinage-uitgaven gaan van ~$30 miljard (2024) via ~$55 miljard (2025) naar ~$135 miljard (2026) ([Industrial Info Resources](https://www.industrialinfo.com/news/article/as-global-refining-slows-producers-look-to-petrochemicals--350673)).

De opening voor een open-source, IFC-gebaseerde planner ligt **niet** bij het vervangen van P6 als contractueel deliverable, maar bij (a) de enorme onderlaag van aannemers en kleinere sites die de $99k/jaar niet betalen en dus in Excel werken, (b) uur- en ploegen­granulariteit die P6 slecht doet, (c) dagelijkse herplanning bij discovery-werk, en (d) een open, diff-baar, forensisch bruikbaar bestandsformaat tegenover de proprietary XER-lock-in.

---

## 1. Wat deze sector bijzonder maakt qua planning

### 1.1 Schaal

| Dimensie | Waarde | Bron |
|---|---|---|
| Manuren per grote turnaround | > 1.000.000 manuren | [AP-Networks whitepaper, Hansen & Schroeder](https://www.ap-networks.com/wp-content/uploads/2021/11/WhitePaper-Benchmarking-and-Optimizing-Maintenance-Work-Scope-for-Turnarounds.pdf) |
| Piekbezetting op site | Van ~300 naar > 2.000 mensen "overnight" | [Plant Services, "Behind the gate"](https://www.plantservices.com/planned-maintenance/plant-turnarounds/article/55364293/behind-the-gate-the-reality-of-a-refinery-turnaround) |
| Piekbezetting (raffinaderij-breed) | 3.000–4.000 contractors, ~10× de normale bezetting | [California Globe](https://californiaglobe.com/fl/understanding-california-refineries-the-turnaround/) |
| Piekbezetting (unit-turnaround) | 1.500–2.000 vakmensen | [JOUAV / AFPM-samenvatting](https://www.afpm.org/newsroom/blog/refinery-turnarounds-101-what-are-turnarounds-and-why-do-we-need-them) |
| Activiteiten in het P6-schema | "10.000+ tasks" wordt genoemd als het domein waar P6 onovertroffen is | [Fabrico STO-softwarevergelijking](https://www.fabrico.io/blog/best-shutdown-turnaround-software/) |
| Werkelijke schemagrootte grote TAR | **[SCHATTING]** 5.000–50.000 activiteiten op Level 4/5, afhankelijk van scope-omvang en detailniveau | eigen extrapolatie uit manuren ÷ gemiddelde taakduur |

### 1.2 Doorlooptijd en fasering

- **Scoping** start 12–18 maanden voor uitvoering; **voorbereiding** 3–6 maanden; **uitvoering** 3–5 weken; **opstart** 1–2 weken; **evaluatie** 2–4 weken ([Plant Services](https://www.plantservices.com/planned-maintenance/plant-turnarounds/article/55364293/behind-the-gate-the-reality-of-a-refinery-turnaround)).
- Prometheus Group: turnarounds worden "18-24 months in advance" gepland en duren "3-12 weeks" ([bron](https://www.prometheusgroup.com/resources/posts/what-is-a-shutdown-turnaround-and-outage)).
- Matterport: gedetailleerde planning schaalt op 18–24 maanden vooraf; budget-goedkeuring ~2 jaar vooraf zodat lange-termijncontracten voor materieel en arbeid gesloten kunnen worden ([bron](https://matterport.com/blog/refinery-turnaround-planning)).
- Cyclus: elke 3–5 jaar per unit ([AFPM](https://www.afpm.org/newsroom/blog/refinery-turnarounds-101-what-are-turnarounds-and-why-do-we-need-them)); sommige bronnen zeggen 3–6 jaar afhankelijk van unittype en regelgeving ([Industrial Info via Statista-zoekresultaat](https://www.industrialinfo.com/iirenergy/industry-news/article/us-petrochemical-producers-plot-turnarounds-amid-weak-prices--351343)).
- Californische raffinaderij-brede turnaround: 4 tot 8 weken, opgesplitst in shutdownfase 3–4 dagen, onderhoud 3–4 weken, opstart 4 dagen ([California Globe](https://californiaglobe.com/fl/understanding-california-refineries-the-turnaround/)).
- Timing is seizoensgebonden: voorjaar/najaar, buiten het "summer driving season" om ([AFPM](https://www.afpm.org/newsroom/blog/refinery-turnarounds-101-what-are-turnarounds-and-why-do-we-need-them)). Dat betekent dat **alle turnarounds in dezelfde twee vensters vallen** en er dus wereldwijd om dezelfde schaarse vakmensen en kraan-/steigercapaciteit gevochten wordt.

### 1.3 Resourcecomplexiteit — de echte planningsuitdaging

Wat een turnaround qua planning fundamenteel anders maakt dan bouw:

1. **Tijdseenheid is het uur, niet de dag.** Het kritieke pad wordt in uren gemeten. Op Planning Planet wordt dit expliciet als pijnpunt genoemd: binnen één bedrijf gebruiken turnarounds urenformaten terwijl bouwprojecten dagen gebruiken, en niet alle schema's zijn dus op dezelfde manier gebouwd ([Planning Planet forum, geciteerd via zoekresultaat](https://planningplanet.com/forums/planning-scheduling-programming-discussion/633970/replacing-primavera-best-alternative)).
2. **24/7 ploegendienst met overdracht.** Standaard patronen zijn 2× 12 uur of 3× 8 uur met roterende teams ([Shiftbase](https://www.shiftbase.com/glossary/24-hour-shift-schedule)). Elke ploegwissel is een informatie-overdrachtsmoment dat in het schema moet passen. Prometheus claimt dat hun tool het shift-handoverrapport uit het live P6-schema in seconden genereert in plaats van 30–60 minuten ([bron](https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage)) — dat is een directe indicatie dat P6 zelf dit níét kan.
3. **Craft-gebonden resource-levelling.** Pijpfitters, lassers, boilermakers, steigerbouwers, riggers, isoleerders, elektro- en instrumentatietechnici, NDO-inspecteurs — allemaal met eigen certificeringen, eigen ploegroosters en eigen schaarste. Levelling is hier geen luxe maar het hele spel.
4. **Ketenafhankelijkheden buiten het mechanische werk.** Steigers moeten staan vóór het werk, isolatie/blindlijsten moeten geplaatst vóór openen, permits moeten uitgegeven per ploeg, kraanplannen en laydown-areas concurreren om ruimte. Matterport noemt precies deze conflicten: leidingroutering die de toegangspad blokkeert, kraan-/rigging-plannen die botsen door onjuiste vrijeruimte­data, isolatiegrenzen die niet met de actuele P&ID's overeenkomen ([bron](https://matterport.com/blog/refinery-turnaround-planning)).
5. **Discovery-werk.** Zodra een vat opengaat vind je meer werk. De industrie-gemiddelde scope­groei van scope-freeze tot uitvoering is **19%**; het bovenste kwartiel haalt **7%** ([AP-Networks, 1.350+ turnaround-observaties](https://www.ap-networks.com/wp-content/uploads/2021/11/WhitePaper-Benchmarking-and-Optimizing-Maintenance-Work-Scope-for-Turnarounds.pdf)). Dat betekent dat het schema tijdens de uitvoering **dagelijks of per ploeg** opnieuw doorgerekend moet worden.
6. **Geen buffer.** California Globe beschrijft dat er door contractor-scheduling en leveringsverplichtingen aan klanten "typically only for a week at the most" speling zit voor onverwachte problemen ([bron](https://californiaglobe.com/fl/understanding-california-refineries-the-turnaround/)).

### 1.4 Kosten van vertraging — waarom betalingsbereidheid hoog is

| Cijfer | Waarde | Bron |
|---|---|---|
| Totale kosten grote raffinaderij-turnaround | > $100 miljoen direct + indirect; API noemt tot $200M+ per grote turnaround | zoekresultaat-samenvatting, [oxmaint](https://oxmaint.com/case-study/post/turnaround-maintenance-management-guide) |
| Totale investering raffinaderij-brede TAR (Californië) | ~$400 miljoen tot ruim $1 miljard | [California Globe](https://californiaglobe.com/fl/understanding-california-refineries-the-turnaround/) |
| Bandbreedte STO-kosten (alle typen) | $5 miljoen tot $500 miljoen | [Prometheus Group](https://www.prometheusgroup.com/resources/posts/what-is-a-shutdown-turnaround-and-outage) |
| Kosten van vertraging | "$1 million per day" tot "one and three million dollars per day" aan gederfde productie | zoekresultaat-samenvatting van [oxmaint](https://oxmaint.com/article/shutdown-turnaround-maintenance-planning) / [nexusegroup](https://nexusegroup.com/article/engineering-consulting-in-chemical-and-refinery-turnarounds) |
| Kosten van vertraging (kwalitatief) | "a single day of delay can run into millions and, in some industries, erase a year's profitability" | [Plant Services](https://www.plantservices.com/planned-maintenance/plant-turnarounds/article/55364293/behind-the-gate-the-reality-of-a-refinery-turnaround) |

**[SCHATTING] — eigen sanity check op de $1–3M/dag:** een raffinaderij van 250.000 vaten/dag met een crack spread van $8/vat draait ~$2,0 miljoen brutomarge per dag. Bij een 400.000 bpd-complex en $10 spread is dat $4,0 miljoen/dag. De gepubliceerde $1–3M/dag is dus realistisch tot conservatief voor grote sites; voor een kleine unit-shutdown ligt het lager.

**Consequentie voor softwarebudget:** een STO-suite van $150.000 per jaar is het equivalent van **circa 1,5 uur productieverlies**. Dat is de kern van waarom betalingsbereidheid in deze sector zo hoog is en waarom prijsonderhandeling niet over de licentieprijs gaat maar over aantoonbare dagenreductie.

### 1.5 Prestatie van de sector: structureel slecht, en dat is het verkoopargument

- **> tweederde** van de turnarounds overschrijdt kosten én planning met meer dan 10%, of heeft een trip na opstart ([AP-Networks](https://www.ap-networks.com/wp-content/uploads/2021/11/WhitePaper-Benchmarking-and-Optimizing-Maintenance-Work-Scope-for-Turnarounds.pdf)).
- **40%** ervaart een kostenoverschrijding of vertraging van **meer dan 30%** (idem).
- **60%+** van de turnarounds in de AP-Networks-database is "High to Mega Complexity" (idem).
- Prometheus Group noemt gemiddelde kostenoverschrijding ~20% en vertraging ~30% ([bron](https://www.prometheusgroup.com/resources/posts/what-is-a-shutdown-turnaround-and-outage)).
- Het veelgeciteerde "80% van de turnarounds loopt >10% over budget" blijkt **niet traceerbaar** naar een publiek inspecteerbare studie; het wordt toegeschreven aan T.A. Cook / Solomon Associates (2019) maar de methodologie is niet publiek ([ReliaMag bronanalyse](https://reliamag.com/guides/turnaround-cost-overrun-statistics/)). **Niet gebruiken zonder voorbehoud.**
- Steekproef van 93 turnarounds (Lawrence): budgetten onderschatten werkelijke kosten met ~16%; men bedoelde ±10%-ramingen maar realiseerde ±30%-uitkomsten ([via ReliaMag](https://reliamag.com/guides/turnaround-cost-overrun-statistics/)).
- IPA: minder dan 45% van kapitaalprojecten landt binnen ±10% van de raming bij autorisatie; gemiddelde schemaslip 26% ([IPA via ReliaMag](https://reliamag.com/guides/turnaround-cost-overrun-statistics/); IPA-database omvat 20.000+ projecten, [IPA CSRA](https://www.ipaglobal.com/services/cost-engineering/cost-schedule-risk-analysis-csra/)).

AP-Networks noemt vier oorzaken, en drie ervan zijn direct planningsproblemen: slechte scope-beheersing vóór de shutdown, hoge discovery-percentages tijdens de shutdown, slechte planning en voorbereiding, en onrealistische kosten-/schemadoelen die door de business ver van tevoren zijn vastgezet en losstaan van de werkelijke scope ([bron](https://www.ap-networks.com/wp-content/uploads/2021/11/WhitePaper-Benchmarking-and-Optimizing-Maintenance-Work-Scope-for-Turnarounds.pdf)).

---

## 2. Welke planningssoftware hier daadwerkelijk gebruikt wordt

### 2.1 Rangorde

**Laag 1 — De CPM-motor (de contractuele waarheid)**

| # | Pakket | Positie | Bewijs |
|---|---|---|---|
| 1 | **Oracle Primavera P6 (Professional + EPPM)** | De facto monopolie. Elke STO-suite in dit onderzoek noemt P6-integratie als eerste feature. | Prometheus: "controlled access to Primavera (P6)" ([bron](https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage)); Cleopatra: integreert met P6, MS Project, SAP ([bron](https://www.stocontrol.com/turnaround-management-software-cleopatra-enterprise/)); IAMTech: bidirectioneel met P6, MSP, SAP, Maximo, Oracle, IFS, Power BI ([bron](https://www.iamtech.com/products/shutdown-turnaround-outage-software)) |
| 2 | **Microsoft Project** | Tweede keus, vooral bij kleinere shutdowns en onderaannemers. Kritiek: "Once you print the PDF and hand it to the maintenance team, it is out of date" | [Fabrico](https://www.fabrico.io/blog/best-shutdown-turnaround-software/) |
| 3 | **Safran Project / Safran Planner** | Serieuze nummer 3, geconcentreerd in Noorse/Britse offshore olie & gas. Enige aanbieder met planning + scheduling + EVM + risico in één model. | [Safran](https://www.safran.com/en-gb/project-management-scheduling-software); klanten o.a. **Aker BP, Aibel, ABB, Cofely Fabricom** |
| 4 | **Excel** | Massaal, in de schaduw. Scope-lijsten, J-factor-beoordelingen, workpacks, voortgang, ploegoverdracht. | impliciet in alle leveranciers-marketing |
| 5 | Spider Project, Asta Powerproject, Aurora (Stottler Henke) | Niches. Aurora is toegepast op een raffinaderij-turnaround met een netwerk van 2.500+ activiteiten | [Stottler Henke](https://stottlerhenke.com/aurora-is-applied-to-refinery-turnaround/) |

**Laag 2 — De STO-suites (waar het geld echt zit)**

| # | Pakket | Leverancier | Positionering | Bewijs |
|---|---|---|---|---|
| 1 | **Prometheus STO / STO-AI Manager** (incl. **Roser ConSys**, WorkTech, NiSoft ePAS) | Prometheus Group | Marktleider. SAP PM-/Maximo-native. Workpacks, scope, budget, materialen, isolaties/blindlijsten, uitvoering, kosten, permits. | Klanten: **ExxonMobil, BP, Marathon Petroleum, Covestro, Constellation Energy, Talen Energy, Gunvor Group, Susquehanna Nuclear** ([bron](https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage)) |
| 2 | **Cleopatra Enterprise / STO Control** | Cost Engineering (NL) | Sterk in kostenraming + kostenbeheersing + benchmarkdatabase, geïntegreerd met scope- en workpackbeheer. Europees zwaartepunt. | 500+ bedrijven in 75 landen, 25 jaar; klanten: **Shell, BP, LyondellBasell, Nouryon, Huntsman, Bruce Power, Covanta** ([bron](https://www.stocontrol.com/)) |
| 3 | **IAMTech iPlanSTO / iPlanUltimate** | IAMTech (UK) | Prijs-transparante uitdager. Genereert planningsdata om P6/MSP/Excel te vullen. | 18-jarige BP-relatie ([bron](https://www.iamtech.com/knowledge/3-key-questions-to-ask-when-choosing-your-sto-turnaround-shutdown-outage-software-solution)) |
| 4 | **Hexagon EcoSys (+ HxGN EAM, j5, SDx)** | Hexagon ALI | STO-portfolio­management: gecentraliseerde data, lange-termijnplanning, strategische budgettering over meerdere STO's heen. | [Hexagon STO-oplossingspagina](https://hexagon.com/solutions/shutdowns-turnarounds-and-outages-sto) (via zoekresultaat; directe fetch gaf 403) |
| 5 | **MobideoSTO** | Mobideo (IL) | "dSTO operating system" — digitale uitvoering, real-time voortgang. Gebouwd op ervaring met > $3 miljard aan STO-projecten. | [Mobideo](https://mobideo.com/sto/); $30,9M opgehaald ([Crunchbase/Tracxn via zoekresultaat](https://www.crunchbase.com/organization/mobideo-aerospace)) |
| 6 | Toadfly Technologies (IPS), Maximl, Innovapptive, Detect Technologies, Clevernet, Fabrico | diversen | Veldexecutie, digitale documentatie, mobiele voortgang. | [Toadfly](https://www.toadfly.com/company/); [Fabrico vergelijking](https://www.fabrico.io/blog/best-shutdown-turnaround-software/) |
| 7 | **STONAVIGATOR** | — | STO- en EPC-producten, diensten en training. | via zoekresultaat |
| 8 | **AVEVA** | AVEVA/Schneider | Genoemd als vendor in het refinery-TAR-softwaresegment; eigen turnaround-module is minder prominent dan Hexagon's EcoSys. | genoemd in [growthmarketreports vendorlijst](https://growthmarketreports.com/report/turnaround-planning-software-for-refineries-market) **[ZWAKKE BRON]** |

**Laag 3 — Risico, kwaliteit en forensiek**

- **Safran Risk** — geïntegreerde kosten- en schemarisicoanalyse, positioneert zich als de enige unified planning+EVM+risico-suite ([Emerald Associates](https://www.emerald-associates.com/software/safran/about-safran.html)).
- **Primavera Risk Analysis** (Oracle; opvolger van Pertmaster) — perpetual listprijs $9.500 + $2.090/jaar support ([Oracle Texas DIR prijslijst, 10-nov-2016](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf)).
- **Deltek Acumen Fuse**, **ScheduleReader Pro**, **Steelray**, **Change Inspector**, **ScheduleLens** — DCMA 14-point-controle op XER/XML ([schedulereader.com](https://schedulereader.com/dcma-14-point-assessment-project-schedule-quality-analysis/), [changeinspector](https://blog.changeinspector.com/dcma-14-point-schedule-health-check/)).
- **AP-Networks**: NaviTrack, iNTrack, Risk Manager, Cost of Change Calculator, Complexity Calculator, PYXIS, acXis, LLern, ORYX ([bron](https://www.ap-networks.com/stos/)).

### 2.2 Wie gebruikt wat — per rol in de keten

| Rol | Primaire tools | Rationale |
|---|---|---|
| **Opdrachtgever / owner-operator** (ExxonMobil, Shell, BP, Marathon, LyondellBasell, ADNOC, Aramco, Petronas) | P6 EPPM als enterprise-waarheid + één STO-suite (Prometheus/Roser, Cleopatra, IAMTech) + SAP PM/Maximo als bron van werkorders + EcoSys of Cleopatra voor portfoliobudget | De owner bezit de scope, het budget en het risico. Hij dicteert het formaat. STO-suite koppelt de CMMS-werkorders aan het schema. |
| **Hoofdaannemer / maintenance contractor** (Turner Industries, BrandSafway, Bilfinger, Altrad, Cotton, Wood, Petrofac) | P6 Professional (verplicht deliverable), eigen Excel-planning eronder, soms MobideoSTO/Toadfly voor veldvoortgang | Moet in P6 leveren omdat het contract dat eist. Bouwt intern in Excel omdat P6 te traag is voor dagelijkse craft-toewijzing. |
| **Onderaannemer** (steigerbouw, isolatie, NDO, kranen, catalyst-handling, chemische reiniging) | Excel, MS Project, papier; levert voortgang aan in het formaat dat de hoofdaannemer eist | Geen budget voor $2.750-seats × 15 planners. Dit is de grootste onbediende groep. |
| **Engineeringbureau / EPC** (Worley, Jacobs, KBR, Fluor, Technip) voor de capital-projectscope die in de TAR meeloopt | P6 EPPM + Primavera Risk Analysis / Safran Risk + EcoSys of Unifier voor kostenbeheersing | Capital work binnen een TAR volgt project-controls-conventies (EVM, WBS, CBS), niet onderhoudsconventies. Dat botst — zie §6. |
| **Benchmarking-/assurance-consultant** (AP-Networks, IPA, Solomon, Turner & Townsend) | Eigen databases (AP-Networks Turnaround Database: 1.350+ observaties, 100+ bedrijven, 400+ sites), leest P6 XER in | [AP-Networks database](https://www.ap-networks.com/database/turnaround-database/) |
| **Claim-/forensisch expert** | P6 + windows-analyse, AACE 29R-03, DCMA 14-point | [Long International](https://www.long-intl.com/articles/forensic-schedule-assurance/) |

### 2.3 Consolidatie: de markt wordt opgekocht

Prometheus Group heeft in enkele jaren de hele STO-laag opgerold:

| Overname | Wat | Bron |
|---|---|---|
| **Roser ConSys** (2022) | 18 STO-oplossingen: scoping, werkvoorbereiding, planning, safeguarding, veiligheid, werkvergunningen, shutdown/startup, uitvoering, kwaliteit | [Prometheus](https://www.prometheusgroup.com/resources/posts/turnaround-and-outage-leader-roser-consys-joins-prometheus-group); [Roser](https://www.roserconsys.com/en/roser-suite) |
| **WorkTech** | Contractor tracking, goedkeuringen, betalingen | via zoekresultaat |
| **Atonix Digital** (2023) | APM/analytics | via zoekresultaat |
| **Actenum** (dec 2025) | Constraint-based optimalisatie/scheduling | [Prometheus](https://www.prometheusgroup.com/resources/posts/prometheus-group-acquires-actenum) |
| **NiSoft** (dec 2025) | Digitale veiligheids- en permit-to-work-software | via [PrivSource](https://www.privsource.com/acquisitions/deal/gaSyb7) |
| **Webalo** (jan 2026) | Frontline worker apps | via zoekresultaat |

Prometheus Group: **~1.194 medewerkers**, gerapporteerde omzet **$210–241 miljoen**, waardering **$1,5 miljard** (2021-datapunt) tot **$4 miljard+** (juni 2024, na Advent International + Leonard Green naast Genstar Capital) ([Kona Equity](https://www.konaequity.com/company/prometheus-group-4039240081/), [PitchBook](https://pitchbook.com/profiles/company/45248-95), [getlatka](https://getlatka.com/companies/prometheus-group)). Let op: de omzetcijfers komen van dataleveranciers, niet van de onderneming zelf — behandel als indicatie.

**Betekenis:** de zelfstandige STO-softwareleveranciers verdwijnen. Wat overblijft is een oligopolie (Prometheus, Hexagon, Cleopatra) bovenop een monopolie (Oracle P6). Dat is precies het patroon waarin prijzen stijgen en interoperabiliteit verslechtert.

---

## 3. Wat ervoor betaald wordt

### 3.1 Gepubliceerde licentieprijzen — Oracle Primavera

**Perpetual (Oracle Construction & Engineering Global Price List, Texas DIR, 10 november 2016 — laatste breed circulerende publieke lijst; [bron](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf))**

| Product | Licentie (USD) | Support/jaar (USD) | Metric | Min. |
|---|---|---|---|---|
| Primavera P6 EPPM | 2.750 | 605 | Application User | — |
| Primavera P6 Professional Project Management | 2.500 | 550 | Application User | — |
| Primavera P6 Progress Reporter | 950 | 209 | Application User | — |
| Primavera Analytics | 2.000 | 440 | Application User | 25 |
| Primavera Contract Management (BI Publisher Ed.) | 2.000 | 440 | Application User | — |
| **Primavera Earned Value Management** | **10.000** | **2.200** | Application User | — |
| **Primavera Risk Analysis** | **9.500** | **2.090** | Application User | — |
| Primavera Portfolio Management | 2.900 | 638 | Application User | 50 |
| Primavera Data Warehouse | 25.000 | 5.500 | Processor | — |
| Primavera Gateway | 20.000 | 4.400 | Application User | 5 |
| Primavera Unifier Project Controls | 3.950 | 869 | Application User | 25 |

Ondersteunend datapunt: resellers noemen $2.750 perpetual + $605/jaar onderhoud per gebruiker ([softwareconnect / projectmanagertemplate](https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models)), en $3.850 licentie + $874 eerste jaar support ≈ $4.724 ([akimeng](https://www.akimeng.com/oracle-primavera-price-list.html)). Primavera Scheduling noemt "starts at $3,500 for a perpetual license" ([bron](https://primaverascheduling.com/home/buy-primavera-software/)).

**Cloud/SaaS (UK G-Cloud 14, mei 2024 — Oracle-partner-prijsdocument BD.G14.OCS.002)**

| Cloud service | Prijs | Min. gebruikers |
|---|---|---|
| **Primavera P6 EPPM Cloud Service** | **£220 per hosted named user per maand** | **25** |
| P6 Progress Reporter Cloud | £24 p/u p/m | — |
| P6 EPPM Web Services Cloud | £36 p/u p/m | — |
| P6 EPPM UK Government Cloud | £439 p/u p/m | 50 |
| Oracle Primavera Cloud (OPC) Schedule | £96 p/u p/m | 5 |
| OPC Task Management | £44 p/u p/m | 5 |
| OPC Progress | £10 p/u p/m | 5 |
| OPC Portfolio & Capital Planning | £176 p/u p/m | 5 |
| Primavera Unifier Project Controls | £132 p/u p/m | 25 |
| Primavera Unifier Earned Value Management | £44 p/u p/m | 5 |
| Additional non-production environment | £3.954 per maand | — |

Volumekortingen: 10% bij 101–200 gebruikers, 15% bij 201–500, 20% bij 501–1000, 25% bij 1001+.

Tweede, onafhankelijke G-Cloud-notering (th3rdcurve, effectief 30 april 2024) noemt afwijkende, lagere jaarbedragen: OPC Schedule £950/licentie/jaar (min 5), P6 EPPM £358/licentie/jaar, add-ons zoals Capital Planning/Cost Controls £7.549/licentie/jaar ([bron](https://th3rdcurve.com)). Het verschil illustreert het kernpunt: **Oracle-prijzen zijn onderhandelbaar en niet publiek transparant.**

**Reseller-indicaties Oracle Primavera Cloud:** ~$100/gebruiker/maand met minimum-seats; 5-user starterpakket $130/gebruiker/maand; $7.800/jaar voor 5 gebruikers ([CDP Inc.](https://cdp-inc.com/products/software/purchase-oracle-primavera-cloud-5-users), [Global PM](https://globalpm.com/oracle-primavera-cloud-pricing/), [Taradigm](https://www.taradigm.com/how-much-does-primavera-p6-cost/)). Oracle publiceert zelf geen actuele Primavera Cloud-prijzen meer.

### 3.2 Gepubliceerde licentieprijzen — IAMTech iPlanSTO (het enige transparante STO-pakket)

IAMTech publiceert integraal ([bron](https://www.iamtech.com/products/shutdown-turnaround-outage-software)):

**iPlanSTO — jaarlijks**

| Model | 1 | 2 | 3 | 4 | 5+ |
|---|---|---|---|---|---|
| Site licence (onbeperkt gebruikers), per locatie | $99.000 | $94.000 | $89.000 | $84.000 | $79.000 |
| Site licence, totaal | $99.000 | $188.000 | $267.000 | $337.000 | $396.000 |
| Individuele gebruikerslicentie, per user | $33.000 | $31.000 | $30.000 | $28.000 | $27.000 |

**iPlanUltimate (iPlanSTO + iPlanMaintain) — jaarlijks**

| Model | 1 | 2 | 3 | 4 | 5+ |
|---|---|---|---|---|---|
| Site licence, per locatie | $165.000 | $157.000 | $149.000 | $140.000 | $132.000 |
| Individuele gebruikerslicentie, per user | $49.000 | $47.000 | $44.000 | $42.000 | $39.000 |

GBP-equivalenten: iPlanSTO site licence £75.000 (1 locatie) → £60.000 (5+); iPlanUltimate £125.000 → £100.000. 24/7-support en cloudhosting inbegrepen, onbeperkt gebruikers per site.

**Dit is het belangrijkste prijsdatapunt in dit hele rapport**, om drie redenen:
1. Het is de enige gepubliceerde prijs in de STO-suite-categorie.
2. IAMTech positioneert zichzelf expliciet als *goedkoper dan de rest*: *"iPlanSTO is just as capable as Prometheus Software from Prometheus Group, or STO/Maintenance software from competitors like Cleopatra STOControl, Maximl, Toadfly, Detect Technologies, Innovapptive, and Mobideo. But unlike them, we openly share our pricing."* ([bron](https://www.iamtech.com/products/shutdown-turnaround-outage-software))
3. IAMTech's eigen verklaring waarom concurrenten niet publiceren: *"the vast majority of industrial software vendors do not advertise their prices. This is because they want to charge you as much as they think you can afford."* ([bron](https://www.iamtech.com/knowledge/3-key-questions-to-ask-when-choosing-your-sto-turnaround-shutdown-outage-software-solution))

**[SCHATTING] Afgeleide prijsband voor Prometheus/Roser en Cleopatra STO Control:** als IAMTech zich als de goedkope optie positioneert bij $99k–$165k per site per jaar, ligt een enterprise-STO-suite van Prometheus of Cleopatra plausibel op **$150.000–$500.000 per site per jaar**, of **$0,5–2,5 miljoen per jaar voor een concern-brede overeenkomst** met meerdere sites, SAP-connectoren en modules (permits, materialen, kosten). Ondersteunend: Prometheus' STO-suite is een module­stapel (STO-AI Manager + ePAS + Contractor Management + DSO) waar per module wordt gefactureerd.

### 3.3 Overige leveranciers

| Leverancier | Prijs | Status |
|---|---|---|
| Safran Project / Planner / Risk | Niet gepubliceerd | [Safran](https://www.safran.com/en-gb/project-management-scheduling-software) publiceert geen prijzen; ook Capterra/Software Advice/GoodFirms hebben geen prijs |
| Cleopatra Enterprise / STO Control | Niet gepubliceerd | [bron](https://www.stocontrol.com/turnaround-management-software-cleopatra-enterprise/) |
| Prometheus STO | Niet gepubliceerd | [bron](https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage) |
| Hexagon EcoSys | Niet gepubliceerd | — |
| MobideoSTO | Niet gepubliceerd | [bron](https://mobideo.com/sto/) |

### 3.4 Implementatie- en trainingskosten

Harde publieke cijfers zijn schaars. Wat er wél is:

- Oracle-partners bieden "a complete implementation service, which includes advice and support on set up and planning, data migration, quality assurance and performance testing, training and ongoing support" tegen dagtarief ("rate card") ([th3rdcurve G-Cloud prijsdocument, 30-04-2024](https://th3rdcurve.com)).
- Oracle onderscheidt twee supportniveaus: *Sustaining* (support zonder patches/upgrades) en *Premier* (24/7 + alle patches, bugfixes, upgrades); prijzen variëren per product, gebruikersaantal en looptijd (idem).
- User Productivity Kit content voor P6 EPPM: $17.500–$35.000 per UPK-module afhankelijk van bedrijfsomvang ([Oracle Texas DIR prijslijst](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf)).
- P6-trainingsaanbieders geven 10% korting op training bij softwareaankoop ([Primavera Scheduling](https://primaverascheduling.com/home/buy-primavera-software/)).
- P6-kritiek noemt "long implementation timelines" van weken tot maanden en "complex IT requirements" (Oracle- of SQL-database, serveropzet) ([Planera](https://www.planera.io/post/primavera-p6-alternatives)).

**[SCHATTING] Realistische total cost of ownership voor een grote raffinaderij-site, jaar 1:**

| Post | Bedrag (USD) | Onderbouwing |
|---|---|---|
| P6 EPPM cloud, 30 seats | ~$95.000 | £220 × 30 × 12 = £79.200 ≈ $100k bij ~$1,27/£ |
| STO-suite (Prometheus/Cleopatra/IAMTech), 1 site | $99.000–$400.000 | IAMTech gepubliceerd; hoger voor enterprise-suites |
| Risico-/analysetool (Safran Risk of Acumen Fuse), 3–5 seats | $30.000–$60.000 | afgeleid van PRA-listprijs $9.500 + support |
| Implementatie + datamigratie + integratie SAP/P6 | $150.000–$600.000 | 1–3 mensjaar consultancy à $180–250k/jaar |
| Training (30–60 planners, P6 + suite) | $40.000–$120.000 | $1.500–2.000 per persoon per cursus |
| Interne planners (5–15 FTE, TAR-team) | $700.000–$2.500.000 | zie §3.5 |
| **Totaal jaar 1, excl. interne FTE** | **$414.000–$1.275.000** | |

Ter contextualisering: dat is **0,1–1,3%** van een turnaround van $100M, en **0,04–0,3%** van een turnaround van $400M.

### 3.5 Arbeidskosten van planning (het echte kostenblok)

| Rol | Tarief | Bron |
|---|---|---|
| Refinery Turnaround Planner (VS) | gemiddeld $44,84/uur; band $35,58–$58,89 | [ZipRecruiter, juni 2026](https://www.ziprecruiter.com/Jobs/Refinery-Turnaround-Planner) |
| Turnaround Planner (alternatief) | ~$70.000/jaar = $35,43/uur | [Talent.com](https://www.talent.com/salary?job=turnaround+planner) |
| Oil & Gas Planner/Scheduler | gemiddeld $42,01/uur; band $25,00–$56,01 | [ZipRecruiter, juni 2026](https://www.ziprecruiter.com/Jobs/Oil-Gas-Planner-Scheduler) |
| Oil/Gas Senior Scheduler | $110.370/jaar ≈ $53/uur | [Salary.com, dec 2025](https://www.salary.com/research/salary/alternate/oil-gas-senior-scheduler-salary) |

**[SCHATTING]** Contract-turnaroundplanners in de piek (VS Gulf Coast, Midden-Oosten) rekenen aanzienlijk hoger dan deze staff-tarieven — typisch $600–1.200 per dag all-in inclusief bureau-marge, per diem en overwerk. Een TAR-planningsteam van 8–20 planners gedurende 12–18 maanden is dus **$1,5–5 miljoen aan planningsarbeid** per grote turnaround. **De software is 5–20% van de planningskosten; de planners zijn de rest.** Dat is een belangrijk inzicht voor positionering: de winst zit in planner-productiviteit, niet in licentiebesparing.

### 3.6 Betalingsbereidheid: HOOG — met nuance

**Waarom hoog:**

1. **Asymmetrie van de businesscase.** $150k software vs. $1–3M/dag productieverlies. Eén vermeden dag betaalt tien jaar licentie.
2. **Het budget is er al.** Wereldwijde raffinage-uitgaven: ~$30 miljard (2024) → ~$55 miljard (2025) → ~$135 miljard (2026) → ~$125 miljard (2027) ([Industrial Info Resources](https://www.industrialinfo.com/news/article/as-global-refining-slows-producers-look-to-petrochemicals--350673)). Software is een rounding error.
3. **De koper is de owner-operator**, niet de aannemer. Supermajors en NOC's hebben investeringsbudgetten die niet op licentieprijs sturen.
4. **Aantoonbaar gedrag:** IAMTech verkoopt $99k/site/jaar en zegt daarmee de goedkope optie te zijn; Oracle vraagt minimaal 25 seats × £220/maand; Prometheus is op $4 miljard+ gewaardeerd ([PitchBook](https://pitchbook.com/profiles/company/45248-95)).
5. **Regelgeving en veiligheid.** Turnarounds bestaan mede om aan overheidsregels te voldoen ([AFPM](https://www.afpm.org/newsroom/blog/refinery-turnarounds-101-what-are-turnarounds-and-why-do-we-need-them)). Compliance-software is niet-discretionair.

**Waar de betalingsbereidheid stopt:**

1. **Alleen voor bewezen, ondersteunde, gerefereerde producten.** Deze sector koopt geen onbekende software voor een event waarbij één fout $3M/dag kost. Referenties (ExxonMobil, BP, Shell) zijn de valuta.
2. **Niet bij onderaannemers.** Een steigerbouwer met 40 mensen betaalt geen $27.000 per gebruiker. Die groep zit in Excel en blijft daar.
3. **Niet voor "nog een silo."** Kopers klagen expliciet over de stapel losstaande tools. Dat blijkt uit het feit dat Prometheus zes bedrijven opkocht om het te consolideren.
4. **Niet zonder 24/7-support.** IAMTech noemt 24/7-support expliciet als inbegrepen — dat is geen feature maar een toegangseis.

---

## 4. Segmentomvang

### 4.1 Top-down analistencijfers (met kwaliteitswaarschuwing)

| Markt | Waarde | Jaar | CAGR | Bron | Kwaliteit |
|---|---|---|---|---|---|
| Turnaround Planning Software for Refineries | USD 1,12 mrd → USD 3,29 mrd (2033) | 2024 | 12,7% | [Growth Market Reports](https://growthmarketreports.com/report/turnaround-planning-software-for-refineries-market) | **[ZWAKKE BRON]** — syndicated report; de fetch bevestigt "generic/templated" methodologie en waarschijnlijk AI-gegenereerd. Vendorlijst (IBM, Siemens, SAP, AspenTech, Honeywell, Bentley) suggereert dat de scope veel breder is dan planning: dit telt vermoedelijk de hele STO/EAM-adjacency mee. |
| Refinery Turnaround **Services** | USD 4,92 mrd (of 5,8 mrd) → 8,13 mrd (2033) | 2024 | 5,7% | [Dataintelo](https://dataintelo.com/report/refinery-turnaround-services-market) / [Market Intelo](https://marketintelo.com/report/refinery-turnaround-services-market) | matig; twee bronnen, afwijkende basis |
| Refinery Maintenance Services (breed) | USD 14,2 mrd → 24,1 mrd (2033) | 2024 | 6,1% | [Dataintelo](https://dataintelo.com/report/refinery-maintenance-services-market) | matig |
| Regionaal (turnaround services) | APAC ~USD 2,12 mrd; Noord-Amerika >35% aandeel | 2024 | — | idem | matig |

**Waarschuwing:** deze getallen komen uit de syndicated-report-industrie (Dataintelo, Market Intelo, Growth Market Reports zijn verwante uitgevers met vrijwel identieke templates). Ik gebruik ze als bovengrens-indicatie, niet als feit.

### 4.2 Bottom-up schatting — mijn eigen model

**[SCHATTING — volledige redenering hieronder]**

**Stap 1 — Aantal STO-sites wereldwijd**

| Basis | Aantal | Bron |
|---|---|---|
| Operationele olieraffinaderijen wereldwijd | **825** (2024); +181 gepland tot 2030 | [Statista](https://www.statista.com/statistics/1445314/number-of-oil-refineries-worldwide/) |
| Wereldwijde raffinagecapaciteit | 103,76 mln vaten/dag (2025) | [Statbase](https://statbase.org/datasets/energy/oil-refining-capacity/) |
| AP-Networks benchmarkdekking | 100+ "marquee companies", 400+ sites | [AP-Networks](https://www.ap-networks.com/database/turnaround-database/) |
| Grote petrochemie- en gasverwerkingscomplexen met periodieke TAR | **[SCHATTING] ~1.500** | eigen inschatting: elk raffinagecluster heeft aangrenzende petchem; C&EN top-50 chemiebedrijven exploiteren elk 10–60 sites |
| Upstream/offshore-faciliteiten met periodieke shutdowns | **[SCHATTING] ~500** | AP-Networks heeft een apart "uT-AP" upstream-programma en "Upstream Network" ([bron](https://www.ap-networks.com/stos/)) — de niche is groot genoeg voor een eigen product |
| **Totaal adresseerbare STO-sites** | **[SCHATTING] ~2.800** | 800 + 1.500 + 500 |

**Stap 2 — Softwarebesteding per site per jaar (planning & scheduling, enge definitie)**

| Tier | Aantal sites | Profiel | $/site/jaar (midden) | Subtotaal |
|---|---|---|---|---|
| **A** — supermajors, grote NOC's, mega-complexen | 150 | Volledige STO-suite + P6 EPPM enterprise + risico + EVM + portfolio | $600.000 | $90 mln |
| **B** — middelgrote raffinaderijen, gasverwerking, grote petchem | 650 | P6 + één STO-tool, of P6 + Excel + puntoplossing | $150.000 | $98 mln |
| **C** — kleinere/regionale sites, upstream, onafhankelijken | 2.000 | Enkele P6-seats of MS Project; Excel | $30.000 | $60 mln |
| **Owner-operators subtotaal** | 2.800 | | | **$248 mln** |

**Stap 3 — Aannemers, EPC en consultants**

- Turnaround **services**-markt: $4,92–5,8 miljard (2024). Aannemers besteden **[SCHATTING] 0,5–0,8%** van STO-omzet aan planning-/schedulingsoftware (P6-seats, viewers, mobiele voortgang) → **$25–46 mln**, middenwaarde **$35 mln**.
- Engineeringbureaus/EPC met TAR-gerelateerde capital scope + project-controls-consultants + forensische experts: **[SCHATTING] $20 mln**.

**Stap 4 — Totaal**

> **Segmentomvang planning-/schedulingsoftware voor olie & gas STO ≈ USD 300 miljoen per jaar (2025) [SCHATTING].**
> Bandbreedte $220–420 miljoen. In EUR: **circa € 275 miljoen** (bij $1,09/€, gemiddeld 2025).

**Stap 5 — Kruisvalidatie via leveranciersomzet [SCHATTING]**

| Leverancier | Totale omzet | Toewijsbaar aan O&G-STO-planning |
|---|---|---|
| Prometheus Group | $210–241 mln ([Kona Equity](https://www.konaequity.com/company/prometheus-group-4039240081/)) | 15–25% → $35–60 mln |
| Oracle Primavera (C&E GBU) | niet uitgesplitst | O&G-TAR-aandeel **[SCHATTING]** $50–90 mln |
| Cleopatra Enterprise (Cost Engineering BV) | niet gepubliceerd; 500+ klanten, 75 landen ([bron](https://www.stocontrol.com/)) | **[SCHATTING]** $10–20 mln |
| Safran Software Solutions | niet gepubliceerd | **[SCHATTING]** $10–20 mln (sterk O&G-gewogen) |
| IAMTech | niet gepubliceerd | **[SCHATTING]** $5–15 mln |
| Mobideo | $30,9M opgehaald ([Crunchbase](https://www.crunchbase.com/organization/mobideo-aerospace)) | **[SCHATTING]** $10–20 mln |
| Hexagon EcoSys, AVEVA, Toadfly, Maximl, Innovapptive, overigen | | **[SCHATTING]** $50–100 mln |
| **Optelling** | | **$170–345 mln** |

De bottom-up ($300M) en de leveranciers-optelling ($170–345M) zijn consistent. De $1,12 miljard van Growth Market Reports past alleen als je de complete STO-managementsuite meerekent — uitvoering, permit-to-work, materiaalbeheer, kostenbeheersing, mobiele apps. **Beide definities zijn verdedigbaar; wees expliciet welke je gebruikt.**

> **Brede definitie (volledige STO-softwaresuite, incl. uitvoering/permits/materialen): USD 0,7–1,2 miljard (2025) [SCHATTING], consistent met de syndicated $1,12 mrd (2024).**

### 4.3 Groeirichting

**Sterk opwaarts op korte termijn (2025–2028):**

| Driver | Cijfer | Bron |
|---|---|---|
| Wereldwijde raffinage-uitgaven | $30 mrd (2024) → $55 mrd (2025) → **$135 mrd (2026)** → $125 mrd (2027) | [Industrial Info Resources](https://www.industrialinfo.com/news/article/as-global-refining-slows-producers-look-to-petrochemicals--350673) |
| Turnaround services CAGR | 5,7% (2025–2033) | [Dataintelo](https://dataintelo.com/report/refinery-turnaround-services-market) |
| Turnaround planning software CAGR | 12,7% (2025–2033) **[ZWAKKE BRON]** | [Growth Market Reports](https://growthmarketreports.com/report/turnaround-planning-software-for-refineries-market) |
| APAC groei | 15,2% CAGR; $980 mln tegen 2033 **[ZWAKKE BRON]** | idem |
| Nieuwe raffinaderijen | +181 units gepland tot 2030 | [Statista](https://www.statista.com/statistics/1445314/number-of-oil-refineries-worldwide/) |

**Structurele verschuivingen:**

1. **Geografie kantelt naar Azië en Midden-Oosten**; Europa, delen van Oceanië en Latijns-Amerika sluiten raffinaderijen ([Statista/aenert samenvatting](https://aenert.com/fileadmin/default/templates/images/Technologies/Crude_Oil/251118_MapOilRefinery.pdf)). Nieuwe grootschalige complexen (Jizan, Dangote, Duqm, Chinese integrated refining-petchem) zijn greenfield-softwarekopers zonder legacy-erfenis — een aanbestedingskans.
2. **Petrochemie verschuift naar voren**: nu de raffinage vertraagt kijken producenten naar petrochemie ([Industrial Info](https://www.industrialinfo.com/news/article/as-global-refining-slows-producers-look-to-petrochemicals--350673)). Petchem-TAR's zijn even complex.
3. **Vergrijzing/kennisverlies.** Deloitte projecteert tot 1,9 miljoen onvervulde productiebanen tegen 2033 in de VS, met kennisoverdrachtsrisico wanneer ervaren planners vertrekken ([via Matterport](https://matterport.com/blog/refinery-turnaround-planning)). Dat is een structurele driver voor software die kennis vastlegt (templates, historische normen, benchmarking).
4. **Consolidatie.** Zie §2.3. Prijzen zullen eerder stijgen dan dalen.

---

## 5. Sector-specifieke eisen en standaarden

### 5.1 Verplichte leveringsformaten

| Formaat | Rol | Bron |
|---|---|---|
| **XER** (Primavera Exchange) | De facto contractueel deliverable. Change Inspector, ScheduleReader, Acumen Fuse draaien allemaal op XER. "The XER file format is the standard deliverable format for exporting Primavera P6 schedules for DCMA 14-point assessment evaluation." | [ScheduleLens](https://schedulelens.com/blog/primavera-p6-schedule-review/), [Change Inspector](https://blog.changeinspector.com/dcma-14-point-schedule-health-check/) |
| **P6 XML / PMXML** | Alternatief, minder lossy dan XER, wordt in nieuwere contracten steeds vaker naast XER gevraagd. Change Inspector accepteert "any loaded XER or XML file". | idem |
| **MPP/MPX** | Voor MS Project-onderaannemers | [Fabrico](https://www.fabrico.io/blog/best-shutdown-turnaround-software/) |
| **CFIHOS / ISO 15926** | Data-handover-standaard voor procesinstallaties in olie/gas/chemie/nucleair, onder IOGP. Dekt levenscyclus FEED→EPC→operatie, inclusief apparatuur, inkooporders **én "schedule en milestones"**. | [USPI](https://uspi.nl/index.php/cfihos-purpose), [DocsLib ISO 15926/CFIHOS](https://docslib.org/doc/1260962/iso-15926-and-the-data-handover-standard-cfihos-based-on-it) |
| **IFC 4.3** | **Niet in gebruik in deze sector.** De procesindustrie gebruikt CFIHOS/ISO 15926, niet buildingSMART IFC. Zoekactie naar IFC 4.3 in relatie tot CFIHOS/ISO 15926 leverde geen relatie op. | eigen constatering op basis van [zoekresultaat](https://revisionz.com/bridging-information-gaps-in-process-industries-the-synergy-of-iso-15926-and-cfihos/) |

**Dit laatste punt is cruciaal voor een IFC-gebaseerde planner en wordt in §7 uitgewerkt.**

CFIHOS-ontwikkeling 2025: de jaarvergadering in Houston (ExxonMobil-campus, 150+ deelnemers van operators, EPC's, OEM's, softwareleveranciers en toezichthouders) verschoof van "handover" naar "harmonisation" — interoperabiliteit en afstemming met JIP33, PIP en ISO 8000 ([Sharecat](https://www.sharecatdataservices.com/insights/cfihos-2025-explained)).

### 5.2 DCMA 14-point schedule assessment

Ontwikkeld door de US Defense Contract Management Agency (2005), inmiddels breed overgenomen buiten defensie en ingebouwd in Deltek Acumen Fuse en Primavera P6 EPPM ([Plan Academy](https://www.planacademy.com/dcma-14-point-schedule-assessment/), [Ten Six](https://tensix.com/wp-content/uploads/2025/02/Ten-Six-An-Introduction-to-the-DCMA-14-Point-Assessment-Guidelines-eBook.pdf)).

De 14 metrieken en drempels ([ScheduleReader](https://schedulereader.com/dcma-14-point-assessment-project-schedule-quality-analysis/)):

| # | Metriek | Drempel |
|---|---|---|
| 1 | Logic (ontbrekende voorganger/opvolger) | ≤ 5% |
| 2 | Leads (negatieve lag) | 0% |
| 3 | Lags (positieve lag) | ≤ 5% |
| 4 | Relationship Types (aandeel FS) | ≥ 90% |
| 5 | Hard Constraints | ≤ 5% |
| 6 | High Float (> 44 werkdagen) | ≤ 5% |
| 7 | Negative Float | 0% |
| 8 | High Duration (> 44 werkdagen) | ≤ 5% |
| 9 | Invalid Dates | 0% |
| 10 | Resources (taken zonder resource) | 0% |
| 11 | Missed Tasks (voorbij baseline) | ≤ 5% |
| 12 | Critical Path Test (600-daagse injectie) | 600-daagse verschuiving eindmijlpaal |
| 13 | CPLI (Critical Path Length Index) | ≥ 1,00 |
| 14 | BEI (Baseline Execution Index) | ≥ 1,00 |

**Belangrijke sector-specifieke observatie:** de drempels van 44 werkdagen voor High Float en High Duration zijn ontworpen voor meerjarige defensieprojecten. In een turnaround van 21 dagen met uur-granulariteit zijn ze **volledig zinloos** — vrijwel geen enkele taak duurt 44 dagen, dus de checks passeren triviaal terwijl echte schemakwaliteitsproblemen (open-ended activiteiten, over-constrained ploegenlogica, negatieve float door harde opstartdata) onopgemerkt blijven. Dit is een concreet gat: **er bestaat geen erkende, aan turnarounds aangepaste schema-kwaliteitscheck.** [Eigen analyse, niet uit een bron.]

### 5.3 EVMS / ANSI-EIA-748

- Oracle verkoopt **Primavera Earned Value Management** als apart product ($10.000 licentie + $2.200/jaar support in de Texas DIR-lijst; [bron](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf)) en **Primavera Unifier Earned Value Management** als cloud-add-on (£44/gebruiker/maand, min. 5; [G-Cloud 14](https://www.crowncommercial.gov.uk/agreements/RM1557.14)).
- Safran positioneert zich expliciet als *"the only provider of a unified project planning, scheduling, earned value management (EVM) and risk management solution"* ([Emerald Associates](https://www.emerald-associates.com/software/safran/about-safran.html)).
- DCMA 14-point is "foundational for Earned Value Management (EVM) compliance" en sluit aan op de GAO Schedule Assessment Guide en DECM ([ScheduleReader](https://schedulereader.com/dcma-14-point-assessment-project-schedule-quality-analysis/)).
- **[NIET GEVERIFIEERD]** In mijn ervaring wordt volledige ANSI/EIA-748-certificering in olie & gas vooral geëist op capital projects met overheids- of joint-venture-partners, niet op onderhoudsturnarounds. TAR's gebruiken doorgaans een vereenvoudigde earned value op basis van rules-of-credit per manuur of per workpack. Prometheus noemt "earned value analysis" als onderdeel van de cost-trackingmodule ([bron](https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage)) — wat op deze lichtere variant wijst.

### 5.4 AACE International Recommended Practices

De AACE-website enumereert de RP's niet publiek; ze zijn gratis voor leden en te koop voor niet-leden ([bron](https://web.aacei.org/resources/publications/recommended-practices)). De relevante RP's zijn **[NIET GEVERIFIEERD in dit onderzoek — uit vakkennis]**:

| RP | Titel | Relevantie voor TAR |
|---|---|---|
| 10S-90 | Cost Engineering Terminology | Basisdefinities |
| 18R-97 | Cost Estimate Classification System — as applied in EPC for the **Process Industries** | Class 5→1 ramingen; direct van toepassing op TAR-budgettering jaren vooraf |
| 27R-03 | Schedule Classification System | Level 1–5 schema's |
| 29R-03 | **Forensic Schedule Analysis** | De standaard voor claims — zie §5.5 |
| 52R-06 | Time Impact Analysis — as applied in Construction | Prospectieve vertragingsanalyse |
| 32R-04 | Determining Activity Durations | — |

AACE's RP's zijn "aligned with the Total Cost Management Framework" en vormen "the technical foundation for educational and certification products" (PSP, CCP, EVP) ([bron](https://web.aacei.org/resources/publications/recommended-practices)).

**Praktische betekenis:** het Level 1–5-schema-classificatiemodel is de lingua franca in TAR-planning. Level 1 = milestone/management, Level 2 = summary per unit, Level 3 = het contractuele CPM-schema, Level 4 = werkpakketniveau, Level 5 = taak/craft/ploegniveau. Turnarounds zijn de enige discipline waar Level 5 routineus in het productieschema zit in plaats van in een spreadsheet ([Planning Planet forumdraad over turnaround schedule levels](http://www.planningplanet.com/forums/shutdowns-turnarounds-outages-stos/708427/turnaround-schedule-levels) — fetch gaf 403, alleen via zoekresultaat bevestigd).

### 5.5 Audits, claims en forensische analyse

- **Owner-assurance reviews:** AP-Networks biedt formele readiness-programma's — Turnaround Assist Program (T-AP), Integrated T-AP (iT-AP), Upstream T-AP (uT-AP), Facilitated Turnaround Risk Workshop, Risk-Based Scope Review ([bron](https://www.ap-networks.com/stos/)). Deze reviews toetsen ook de schemakwaliteit.
- **Benchmarking-audits:** Turnaround Scope Index (TSI) en Direct Field Labour (DFL) Index; het TSI-model verklaart 65% van de variantie in de data, met <0,1% kans dat de modelvariabelen niet correleren met Weighted Scope ([AP-Networks whitepaper](https://www.ap-networks.com/wp-content/uploads/2021/11/WhitePaper-Benchmarking-and-Optimizing-Maintenance-Work-Scope-for-Turnarounds.pdf)). Nelson-Farrar-complexiteitsfactoren worden gebruikt om units onderling te vergelijken.
- **Forensische vertragingsanalyse:** windows-analyse (maand-op-maand vergelijking) is de meest gebruikte methode; concurrent delay-beoordeling bepaalt of gelijktijdige opdrachtgever- en aannemersvertragingen aanspraak op tijdverlenging of compensatie beperken ([Long International](https://www.long-intl.com/articles/forensic-schedule-assurance/), [Precision Scheduling Consultants](https://www.precisionschedulingconsultants.com/construction-delay-claims-forensic-analysis/)).
- **Bewijsvoering:** maandelijkse (bij TAR: dagelijkse/per ploeg) schema-updates leveren een "consistent, contemporaneous record — invaluable evidence when disputes arise regarding delay responsibility or time extensions" ([Precision Scheduling Consultants](https://www.precisionschedulingconsultants.com/forensic-schedule-analysis/)).
- **P6 is het forensische werkpaard:** delay-analysecursussen leren expliciet "Primavera P6 for forensic schedule analysis" met FIDIC-koppeling ([Udemy](https://www.udemy.com/course/delay-analysis-eot-fidic-delay-claim-using-primavera-p6/)).

**Implicatie:** het schema is een juridisch document. Elke revisie moet bewaard, dateerbaar en reproduceerbaar zijn. Dat verklaart waarom de sector vasthoudt aan P6 ondanks alle klachten: het is het formaat dat een arbiter accepteert.

---

## 6. Voor- en nadelen van de gebruikte pakketten in déze sectorcontext

### 6.1 Oracle Primavera P6

**Werkt goed hier:**
- Schaalt naar zeer grote netwerken; genoemd als "unrivaled power for scheduling massive shutdowns" en "powerful scheduling for 10,000+ tasks" met automatische kritiek-pad-berekening ([Fabrico](https://www.fabrico.io/blog/best-shutdown-turnaround-software/)).
- Uur-kalenders, ploegenkalenders, meerdere baselines, activity codes en UDF's — de infrastructuur voor craft-codering en unit-codering is er.
- Contractueel geaccepteerd door alle partijen. XER is de universele wisselmunt.
- Claim-bestendig: de update-historie is het bewijsmateriaal in disputen (§5.5).
- Elke leverancier in laag 2 integreert ermee; het ecosysteem van consultants, trainers en tools is enorm.

**Wringt hier:**
- **Geen scope-, workpack-, materiaal-, isolatie- of permit-beheer.** P6 is "purely planning-focused, office-based, expensive and complex" ([Fabrico](https://www.fabrico.io/blog/best-shutdown-turnaround-software/)). Alles wat een turnaround daadwerkelijk stuurt zit erbuiten — vandaar de hele tweede laag.
- **Te traag voor de uitvoeringscyclus.** Dat Prometheus als kernbelofte "shift handover report from the live P6 schedule in seconds, instead of 30-60 minutes" verkoopt ([bron](https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage)), is een vernietigend oordeel: het duurt in P6 een half tot heel uur om te weten wat de volgende ploeg moet doen. Bij twee ploegwissels per dag over 21 dagen is dat 21–42 uur planner-tijd, midden in de duurste periode.
- **Prijs per seat blokkeert veldgebruik.** Bij £220/gebruiker/maand (min. 25) is een breed veldrolout onbetaalbaar. Gevolg: het schema blijft in de kantoorkamer en het veld werkt met geprinte PDF's.
- **Slechte mobiele/tablet-toegang**, "software from 2007"-interface, "steep learning curve", "long implementation timelines", "complex IT requirements" (Oracle/SQL-database, serveropzet) ([Planera](https://www.planera.io/post/primavera-p6-alternatives)).
- **Uren vs. dagen-mismatch binnen één organisatie.** Turnarounds werken in uren, capital projects in dagen; binnen hetzelfde bedrijf zijn de schema's dus niet uniform gebouwd ([Planning Planet](https://planningplanet.com/forums/planning-scheduling-programming-discussion/633970/replacing-primavera-best-alternative)).
- **XER-lock-in.** Een proprietary tekstformaat waarvan de semantiek niet gespecificeerd is; round-trip tussen tools verliest informatie.
- **Resource-levelling is fragiel** bij duizenden craft-toewijzingen met ploegkalenders — in de praktijk levelt vrijwel niemand automatisch en wordt handmatig herverdeeld in Excel. **[NIET GEVERIFIEERD — praktijkobservatie]**

### 6.2 Safran Project / Planner / Risk

**Goed:** planning + scheduling + EVM + risico in één datamodel — de enige aanbieder die dat claimt ([Emerald Associates](https://www.emerald-associates.com/software/safran/about-safran.html)); sterke real-time netwerkberekening en what-if-vergelijking van planversies ([Software Advice](https://www.softwareadvice.com/project-management/safran-project-management-profile/)); diep verankerd in Noorse offshore (Aker BP, Aibel, ABB, Cofely Fabricom); on-premise én cloud.

**Wringt:** installed base is een fractie van P6, dus buiten Noorwegen/UK is contractuele acceptatie een gevecht; het uitwisselen met de rest van de keten gaat alsnog via XER met verlies; kleiner consultant-ecosysteem; geen turnaround-specifieke scope-/workpackfunctionaliteit — het blijft een CPM-tool.

### 6.3 Prometheus Group STO / Roser ConSys

**Goed:** dekt exact de gaten die P6 laat vallen — workpack-planning met AI-gesuggereerde scope op basis van apparatuurtype en historie, scope-freeze-bewaking, budgetten (ROM → definitief), materiaalbeheer met 36-uurs lookahead, isolatiebeheer/blindlijstvoorbereiding, uitvoeringsvoortgang, ploegoverdracht, kosten en earned value ([bron](https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage)). Native SAP (incl. S/4HANA), IBM Maximo en Oracle EAM. Roser levert 18 gespecialiseerde oplossingen met integratie van scoping, werkvoorbereiding, planning, safeguarding, veiligheid, werkvergunningen, shutdown/startup, uitvoering en kwaliteit ([Roser](https://www.roserconsys.com/en/roser-suite)). Referenties van het hoogste kaliber.

**Wringt:**
- **Dubbele waarheid.** P6 blijft de rekenmotor; Prometheus is de scope-/uitvoeringslaag. Twee systemen die synchroon moeten blijven tijdens het meest chaotische moment van de vijfjaarscyclus.
- **Integratieschuld.** Zes overnames in vier jaar (Roser, WorkTech, Atonix, Actenum, NiSoft, Webalo) — die suites zijn niet één product. Kopers krijgen een portfolio dat als platform wordt verkocht.
- **Vereist zware ERP-investering.** "Requires underlying heavy ERP investment" ([Fabrico](https://www.fabrico.io/blog/best-shutdown-turnaround-software/)). Zonder SAP PM of Maximo verliest het pakket het grootste deel van zijn waarde.
- **Prijsondoorzichtigheid.** Geen gepubliceerde prijs; IAMTech's beschuldiging ("charge you as much as they think you can afford") is niet weerlegd.
- **Roser-specifiek:** "overkill for shorter shutdowns, designed for multi-week operations", "designed for shutdowns that happen once every 4 years" ([Fabrico](https://www.fabrico.io/blog/best-shutdown-turnaround-software/)).

### 6.4 Cleopatra Enterprise / STO Control

**Goed:** het enige pakket dat kostenraming, kostenbeheersing én een historische turnaround-kostendatabase integreert — "close the loop" van high-level raming naar gedetailleerde kostenbeheersing in één centrale database ([Cleopatra](https://cleopatraenterprise.com/blog/cost-management-at-turnarounds-a-double-introduction/)). Lange-termijnramingen jaren vooruit via scaling op vergelijkbare historische shutdowns. Sterke scope- en workpackstandaardisatie ("a more consistent breakdown and description of the work"). Europees zwaartepunt met topreferenties (Shell, BP, LyondellBasell, Nouryon, Huntsman). 500+ bedrijven, 75 landen, 25 jaar.

**Wringt:** **scheduling is niet de kern** — het leunt op P6/MSP voor het netwerk. Minder veldexecutie en mobiele functionaliteit dan Prometheus of Mobideo. Geen gepubliceerde prijs. Voor een organisatie die vooral schema-pijn heeft is dit het verkeerde antwoord.

### 6.5 IAMTech iPlanSTO / iPlanUltimate

**Goed:** transparante prijs (uniek in deze markt); site licence met **onbeperkt gebruikers** — dat lost precies het P6-seat-probleem op; genereert alle planningsdata om P6/MSP/Excel te vullen inclusief resources, duren, start/einddata en logische links; bidirectionele integratie met P6, MSP, SAP, Maximo, Oracle, IFS, Power BI; Monte Carlo-risicoanalyse; joint integrity/flensbeheer; isolatie- en energiebeheersing; mobiele veldexecutie; 24/7-support en cloudhosting inbegrepen ([bron](https://www.iamtech.com/products/shutdown-turnaround-outage-software), [IAMTech kennisartikel](https://www.iamtech.com/knowledge/mastering-shutdown-and-turnaround-management)).

**Wringt:** kleine leverancier tegenover Prometheus ($4 mrd waardering) en Oracle — inkoopafdelingen van supermajors hebben leveranciersrisicokaders die dit lastig maken; minder diepgang op enterprise-EVM en portfolio; de eigen planner is geen contractueel geaccepteerd deliverable, dus P6 blijft nodig; $99k/site/jaar is nog steeds ver buiten bereik van onderaannemers.

### 6.6 Hexagon EcoSys

**Goed:** STO-**portfolio**management — gecentraliseerde data, lange-termijnplanning en strategische budgettering over meerdere STO's en meerdere jaren ([Hexagon](https://hexagon.com/solutions/shutdowns-turnarounds-and-outages-sto)). Voor een concern met 15 raffinaderijen en een rollend TAR-programma is dit de juiste laag. Sterk in EVM en integratie met P6.

**Wringt:** doet niets aan de uitvoering van een individuele turnaround; zwaar en duur; lange implementatie; overkill voor één site.

### 6.7 MobideoSTO / Toadfly / Maximl / Innovapptive

**Goed:** digitale uitvoering en real-time voortgang uit het veld; Mobideo bouwt op ervaring met > $3 miljard aan STO-projecten ([bron](https://mobideo.com/sto/)); Toadfly's IPS richt zich op planningsefficiëntie, projectlogistiek en veiligheid met budgetbeheersing ([bron](https://www.toadfly.com/company/)).

**Wringt:** **nog een silo.** Deze tools raken de CPM-logica niet aan; ze rapporteren voortgang die iemand handmatig terug moet brengen naar P6. Elk extra systeem verhoogt de kans dat het schema en de werkelijkheid uiteenlopen.

### 6.8 Microsoft Project en Excel

**Goed:** iedereen kan het; nul drempel; goedkoop; Excel is oneindig flexibel voor scope-lijsten, J-factor-beoordelingen en craft-manurenberekeningen.

**Wringt:** MSP: "Once you print the PDF and hand it to the maintenance team, it is out of date" ([Fabrico](https://www.fabrico.io/blog/best-shutdown-turnaround-software/)); geen real-time uitvoeringsbewaking. Excel: geen CPM, geen auditspoor, geen versiebeheer — in een claimsituatie waardeloos.

---

## 7. Openingen — waar zit de ontevredenheid en het gat

### 7.1 Gedocumenteerde ontevredenheid

| Klacht | Bron |
|---|---|
| P6 is "too complex, expensive, and slow to adopt for daily use"; "long training times, high costs, and legacy workflows drive demand for simpler, modern alternatives" | [Planera](https://www.planera.io/post/primavera-p6-alternatives) |
| "P6 is built for planners, not crews" — veldteams hebben real-time context, resource-zichtbaarheid per zone en voorspellende risico-indicatoren nodig, geen kritiek-pad-diagram | [Linarc](https://www.linarc.com/buildspace/why-its-time-to-move-beyond-p6-for-construction-scheduling) |
| Ploegoverdracht uit P6 kost 30–60 minuten per keer | [Prometheus Group](https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage) |
| Prijsondoorzichtigheid: leveranciers publiceren geen prijzen om te kunnen vragen wat de klant kan dragen | [IAMTech](https://www.iamtech.com/knowledge/3-key-questions-to-ask-when-choosing-your-sto-turnaround-shutdown-outage-software-solution) |
| MSP-schema's zijn verouderd zodra ze geprint zijn | [Fabrico](https://www.fabrico.io/blog/best-shutdown-turnaround-software/) |
| "Documentation gaps and unverified assumptions are the single largest controllable risk in turnaround planning" — verouderde P&ID's, verkeerde vrijeruimte­data, isolatiegrenzen die niet kloppen | [Matterport](https://matterport.com/blog/refinery-turnaround-planning)|
| Uren-vs-dagen-mismatch binnen dezelfde organisatie | [Planning Planet](https://planningplanet.com/forums/planning-scheduling-programming-discussion/633970/replacing-primavera-best-alternative) |
| Structurele prestatie: >⅔ overschrijdt kosten én tijd met >10%; 40% met >30%; 19% scope­groei tegenover 7% bij het beste kwartiel | [AP-Networks](https://www.ap-networks.com/wp-content/uploads/2021/11/WhitePaper-Benchmarking-and-Optimizing-Maintenance-Work-Scope-for-Turnarounds.pdf) |

### 7.2 Concrete gaten — gerangschikt naar kansrijkheid voor een open-source, IFC-gebaseerde planner

**A. De onbediende onderlaag (grootste, meest realistische kans)**

De prijsstructuur sluit een hele populatie uit. Bij $27.000–33.000 per gebruiker per jaar (IAMTech individueel) of £220/gebruiker/maand met 25-seat-minimum (Oracle) betaalt géén steigerbouwer, isolatiebedrijf, NDO-firma, kraanverhuurder of catalyst-handler daarvoor. Die groep — die **80–90% van de manuren levert** — werkt in Excel en op papier. Een gratis planner die (a) uur-granulariteit doet, (b) craft-resources kent, (c) een P6-schema kan inlezen en er tegen kan rapporteren, en (d) niets kost, heeft in die groep geen concurrentie.

**Monetisering:** support, hosting, integratie en training — niet de licentie. Zie §3.5: software is 5–20% van de planningskosten, dus de dienstverlening is het echte geld.

**B. Uur- en ploeggranulariteit als eerste-klas concept**

Geen enkel groot pakket behandelt "12-uursploeg met overdracht om 06:00 en 18:00" als een primitief. P6 doet het met kalenders die je zelf bouwt; het ploegoverdrachtsrapport kost 30–60 minuten. Een planner met:
- ploegen als eerste-klas kalendermodel,
- automatisch ploegoverdrachtsrapport (wat is klaar, wat loopt, wat start, welke permits/isolaties/steigers zijn nodig),
- uur-precisie op het kritieke pad,

lost een dagelijks, duur, meetbaar probleem op. Dit is een **directe, aantoonbare tijdsbesparing** die je in een demo kunt laten zien.

**C. Herplanning bij discovery — snelheid als feature**

19% scope­groei tussen freeze en uitvoering ([AP-Networks](https://www.ap-networks.com/wp-content/uploads/2021/11/WhitePaper-Benchmarking-and-Optimizing-Maintenance-Work-Scope-for-Turnarounds.pdf)) betekent dat het schema tijdens uitvoering continu verandert. De huidige tooling is daar niet op gebouwd. Een planner die 20.000 activiteiten in milliseconden doorrekent en een what-if in seconden toont, met een visuele diff tegen de vorige versie, is functioneel superieur. Open Planner Studio's architectuur (in-memory store, canvas-renderer, expliciete `runCPM`) is hier structureel in het voordeel boven een database-gebonden client-server-pakket.

**D. Open formaat vs. XER-lock-in — met een grote waarschuwing**

Het gat is echt: XER is proprietary, ondergedocumenteerd en lossy. Een open, tekstueel, diff-baar, versioneerbaar formaat maakt forensische vertragingsanalyse (§5.5) triviaal in plaats van een dure specialistenklus, en maakt data-portabiliteit tussen de vijf systemen van vijf opdrachtgevers mogelijk voor een aannemer.

**MAAR — en dit is het belangrijkste voorbehoud van dit rapport:** **IFC is niet de standaard van deze sector.** De procesindustrie gebruikt **CFIHOS en ISO 15926**, onder IOGP-vlag, met ExxonMobil, Shell en de EPC's aan tafel ([USPI](https://uspi.nl/index.php/cfihos-purpose), [Sharecat](https://www.sharecatdataservices.com/insights/cfihos-2025-explained)). ISO 15926 dekt expliciet ook "schedule en milestones" ([DocsLib](https://docslib.org/doc/1260962/iso-15926-and-the-data-handover-standard-cfihos-based-on-it)). Een IFC-gebaseerde planner heeft in olie & gas géén automatisch thuisvoordeel zoals in de bouw.

Drie mogelijke posities:
1. **IFC als schema-container, agnostisch over de asset.** `IfcWorkSchedule`/`IfcTask`/`IfcRelSequence`/`IfcWorkCalendar`/`IfcResource` zijn generieke planningsentiteiten; je hoeft de installatie niet in IFC te modelleren om het schema in IFC te bewaren. Verkoop het als "een open, leesbaar, gestandaardiseerd alternatief voor XER", niet als "BIM voor raffinaderijen".
2. **Bruggen bouwen.** IFC-schema ↔ CFIHOS-tagging op activiteitenniveau (equipment tag, unit, discipline). Dat maakt het schema koppelbaar aan de asset-data die de sector wél gebruikt.
3. **Eerlijk zijn dat IFC hier niet het argument is** en positioneren op prijs, snelheid, ploegen en openheid. **Dit is mijn aanbeveling** — IFC is een technische keuze die je goed kunt verdedigen, geen sector-marketingargument in olie & gas.

**E. Turnaround-specifieke schemakwaliteitscheck**

DCMA 14-point past niet op turnarounds (§5.2): de 44-werkdagen-drempels zijn betekenisloos bij taken van 4 uur. Er is **geen erkende, aangepaste variant**. Wie een "TAR-14-point" definieert — met drempels op ploegen in plaats van dagen, checks op open-ended taken, ploegkalender-consistentie, isolatie-/permit-afhankelijkheden, en float in uren — kan een standaard zetten. Voor een open-source project is standaardzetting een van de weinige manieren om invloed te krijgen zonder verkoopmacht.

**F. Gratis viewer / veldannotator**

Het P6-seat-model houdt het schema uit het veld. Een gratis, offline werkende viewer waarin een supervisor voortgang, blokkades en discovery-werk kan annoteren, die terugsynchroniseert naar het hoofdschema, sluit direct aan op wat Prometheus, Mobideo en Toadfly duur verkopen. Dit is de klassieke open-source-wig: het gratis onderdeel drijft adoptie, het betaalde onderdeel is de integratie en de support.

**G. 4D en scan-koppeling**

Digital twins worden al gebruikt om veldcondities op afstand te verifiëren vóór scope-freeze, staging en sequencing in 3D te testen, en gedateerde baselines vast te leggen ([Matterport](https://matterport.com/blog/refinery-turnaround-planning)). Er bestaat geen betaalbare, open 4D-TAR-tool die scan/mesh koppelt aan het activiteitenschema voor laydown-, steiger- en kraanplanning. Dit is technisch zwaar maar strategisch interessant — en het is één van de weinige plekken waar de IFC-keuze wél inhoudelijk helpt.

### 7.3 Risico's en tegenwind — eerlijk benoemd

1. **De contractuele XER-eis is een muur.** Zolang de opdrachtgever P6 XER als deliverable eist, is een alternatief hoogstens een *aanvulling*, geen vervanging. Elke go-to-market moet met "wij vervangen P6 niet" beginnen.
2. **Deze sector koopt geen onbekende software voor kritieke events.** Referenties zijn de valuta; een open-source project zonder ExxonMobil-logo begint op achterstand. Instapstrategie: eerst de aannemer/onderaannemer, dan van onderaf naar de owner.
3. **IT-governance en security.** Olie & gas heeft strenge leveranciers-, security- en OT/IT-scheidingsregimes. "Draait in de browser, geen installatie" helpt; "open source zonder support-SLA" is een blocker.
4. **CFIHOS/ISO 15926, niet IFC.** Zie §7.2-D.
5. **Consolidatie.** Prometheus koopt de niche op; de kans dat een nieuw commercieel STO-product zelfstandig groeit is klein — maar dat is juist een argument vóór open source, dat niet overgenomen kan worden.
6. **Domeindiepte.** Isolatie-/blindlijstbeheer, permit-to-work, joint-integrity/flensbeheer, materiaalkitting en craft-certificering zijn diepe, gereguleerde domeinen. Een planner die alleen CPM doet, doet ~20% van wat een STO-suite doet. Positioneer dus als **de planningsmotor onder de STO-suites** (waar iedereen nu P6 zet), niet als suite-vervanger.

### 7.4 Concrete aanbeveling voor positionering

**[SCHATTING/advies, geen bron]**

> Positioneer een open-source planner in olie & gas **niet** als P6-vervanger of BIM-tool, maar als **"de gratis planningsmotor voor de STO-keten"**:
> 1. Leest en schrijft P6 XER en P6 XML — zonder dat kom je de poort niet door.
> 2. Ploegen, uren en ploegoverdracht als eerste-klas concepten; automatisch shift-handoverrapport.
> 3. Onbeperkt gratis gebruikers — dat is het enige wat de $27k/seat-markt niet kan beantwoorden.
> 4. Directe herberekening en visuele diff tussen schema-updates — snelheid tijdens discovery.
> 5. Open bestandsformaat (IFC 4.3 als container) als *auditvoordeel* en portabiliteitsargument, niet als BIM-verhaal.
> 6. Verdienmodel: support-SLA, hosting, integratie (SAP PM/Maximo/P6), training en TAR-templatebibliotheken.
>
> Instapsegment: **hoofdaannemers en onderaannemers** (grootste onbediende groep, hoogste pijn, laagste inkoopdrempel), niet de owner-operators.

---

## Bronnenlijst

### Marktomvang en sectorcijfers
1. Growth Market Reports — *Turnaround Planning Software for Refineries Market Research Report 2033* — https://growthmarketreports.com/report/turnaround-planning-software-for-refineries-market **[ZWAKKE BRON]**
2. Dataintelo — *Refinery Turnaround Services Market Research Report 2033* — https://dataintelo.com/report/refinery-turnaround-services-market
3. Market Intelo — *Refinery Turnaround Services Market* — https://marketintelo.com/report/refinery-turnaround-services-market
4. Dataintelo — *Refinery Maintenance Services Market* — https://dataintelo.com/report/refinery-maintenance-services-market
5. Statista — *Number of oil refineries worldwide 2024* — https://www.statista.com/statistics/1445314/number-of-oil-refineries-worldwide/
6. Statbase — *Oil refining capacity by country 1965–2025* — https://statbase.org/datasets/energy/oil-refining-capacity/
7. Industrial Info Resources — *As Global Refining Slows, Producers Look to Petrochemicals* — https://www.industrialinfo.com/news/article/as-global-refining-slows-producers-look-to-petrochemicals--350673
8. Industrial Info Resources — *U.S. Petrochemical Producers Plot Turnarounds Amid Weak Prices* — https://www.industrialinfo.com/iirenergy/industry-news/article/us-petrochemical-producers-plot-turnarounds-amid-weak-prices--351343
9. Aenert — *Global crude oil refinery capacity map* — https://aenert.com/fileadmin/default/templates/images/Technologies/Crude_Oil/251118_MapOilRefinery.pdf

### Turnaround-prestatie, benchmarking en kosten
10. AP-Networks — Hansen & Schroeder, *Benchmarking and Optimizing Maintenance Work Scope for Turnarounds* (whitepaper, PDF) — https://www.ap-networks.com/wp-content/uploads/2021/11/WhitePaper-Benchmarking-and-Optimizing-Maintenance-Work-Scope-for-Turnarounds.pdf
11. AP-Networks — *Turnaround Database* — https://www.ap-networks.com/database/turnaround-database/
12. AP-Networks — *Drive Breakthrough STO Performance* — https://www.ap-networks.com/stos/
13. Digital Refining — *Benchmarking and optimising maintenance for turnarounds* — https://www.digitalrefining.com/article/1001325/benchmarking-and-optimising-maintenance-for-turnarounds
14. ReliaMag — *Turnaround Cost Overrun Statistics: Tracing the 80% Claim* — https://reliamag.com/guides/turnaround-cost-overrun-statistics/
15. IPA Global — *Cost & Schedule Risk Analysis (CSRA)* — https://www.ipaglobal.com/services/cost-engineering/cost-schedule-risk-analysis-csra/
16. IPA Global — *Benchmarking* — https://www.ipaglobal.com/services/site-sustaining-capital/benchmarking/
17. Plant Services — *Behind the gate: The reality of a refinery turnaround* — https://www.plantservices.com/planned-maintenance/plant-turnarounds/article/55364293/behind-the-gate-the-reality-of-a-refinery-turnaround
18. AFPM — *Refinery turnarounds 101* — https://www.afpm.org/newsroom/blog/refinery-turnarounds-101-what-are-turnarounds-and-why-do-we-need-them
19. California Globe — *Understanding California Refineries: The 'Turnaround'* — https://californiaglobe.com/fl/understanding-california-refineries-the-turnaround/
20. Matterport — *Refinery Turnaround Planning: 4 Best Practices* — https://matterport.com/blog/refinery-turnaround-planning
21. Oxmaint — *Shutdown and Turnaround Maintenance Planning* — https://oxmaint.com/article/shutdown-turnaround-maintenance-planning
22. Oxmaint — *Turnaround Maintenance Management Guide* — https://oxmaint.com/case-study/post/turnaround-maintenance-management-guide
23. Nexus Engineering Group — *Engineering consulting in chemical and refinery turnarounds* — https://nexusegroup.com/article/engineering-consulting-in-chemical-and-refinery-turnarounds
24. Intertek — *Best Practices for Planning a Refinery Turnaround* — https://www.intertek.com/blog/2026/03-25-best-practices-for-planning-a-refinery-turnaround/

### Leveranciers — STO-suites
25. Prometheus Group — *Shutdown, Turnaround, and Outage (STO) Management Software* — https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage
26. Prometheus Group — *What is an STO?* — https://www.prometheusgroup.com/resources/posts/what-is-a-shutdown-turnaround-and-outage
27. Prometheus Group — *STO Leader, Roser Consys, Joins Prometheus Group* — https://www.prometheusgroup.com/resources/posts/turnaround-and-outage-leader-roser-consys-joins-prometheus-group
28. Prometheus Group — *Prometheus Group Acquires Actenum* — https://www.prometheusgroup.com/resources/posts/prometheus-group-acquires-actenum
29. Roser ConSys — *Roser Suite* — https://www.roserconsys.com/en/roser-suite
30. Roser ConSys — *Software for turnarounds and plant maintenance* — https://www.roserconsys.com/en/home
31. Cleopatra Enterprise — *STO Control* — https://www.stocontrol.com/
32. Cleopatra Enterprise — *Turnaround management software* — https://www.stocontrol.com/turnaround-management-software-cleopatra-enterprise/
33. Cleopatra Enterprise — *Cost Management at Turnarounds* — https://cleopatraenterprise.com/blog/cost-management-at-turnarounds-a-double-introduction/
34. Cleopatra Enterprise — *STO software* — https://cleopatraenterprise.com/shutdown-turnaround-and-outage-sto-software/
35. IAMTech — *Shutdown Turnaround Outage Software* (met volledige prijslijst) — https://www.iamtech.com/products/shutdown-turnaround-outage-software
36. IAMTech — *iPlan Ultimate* — https://www.iamtech.com/products/iplan-ultimate
37. IAMTech — *3 key questions to ask when choosing your STO software solution* — https://www.iamtech.com/knowledge/3-key-questions-to-ask-when-choosing-your-sto-turnaround-shutdown-outage-software-solution
38. IAMTech — *Mastering Shutdown and Turnaround Management* — https://www.iamtech.com/knowledge/mastering-shutdown-and-turnaround-management
39. Hexagon — *Shutdowns, Turnarounds and Outages (STO)* — https://hexagon.com/solutions/shutdowns-turnarounds-and-outages-sto
40. Hexagon — *PPM Division Brochure* (PDF) — https://bynder.hexagon.com/m/51a00d659b5fe370/original/Hexagon_PPM_Brochure_General.pdf
41. Mobideo — *MobideoSTO* — https://mobideo.com/sto/
42. Toadfly Technologies — *Company* — https://www.toadfly.com/company/
43. Fabrico — *7 Best Shutdown & Turnaround Management Software Tools (2026)* — https://www.fabrico.io/blog/best-shutdown-turnaround-software/

### Leveranciers — CPM/planning
44. Oracle — *Primavera Global Price List (Texas DIR, 10-11-2016)* (PDF) — https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf
45. Oracle Primavera Pricing — *G-Cloud 14 Framework, Cloud Software, doc. BD.G14.OCS.002, mei 2024* (PDF) — via https://www.crowncommercial.gov.uk/agreements/RM1557.14
46. th3rdcurve — *Oracle Primavera Pricing document, effectief 30-04-2024* (PDF) — https://th3rdcurve.com
47. Oracle — *Primavera P6 EPPM Licensing Information User Manual v23* — https://docs.oracle.com/cd/F74773_01/English/licensing_information/p6_eppm_licensing_information/88624.htm
48. Global PM — *Oracle Primavera Cloud Annual Subscription Pricing* — https://globalpm.com/oracle-primavera-cloud-pricing/
49. CDP Inc. — *Oracle Primavera Cloud (5-users)* — https://cdp-inc.com/products/software/purchase-oracle-primavera-cloud-5-users
50. Taradigm — *How Much Does Primavera P6 Cost?* — https://www.taradigm.com/how-much-does-primavera-p6-cost/
51. Primavera Scheduling — *Buy Primavera Software* — https://primaverascheduling.com/home/buy-primavera-software/
52. Project Manager Template — *Primavera P6 Cost: License vs Subscription* — https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models
53. AKIM Engineering — *Oracle Primavera Software License Price List* — https://www.akimeng.com/oracle-primavera-price-list.html
54. Safran — *Project Management Scheduling Software (Safran Planner)* — https://www.safran.com/en-gb/project-management-scheduling-software
55. Emerald Associates — *About Safran* — https://www.emerald-associates.com/software/safran/about-safran.html
56. Software Advice — *Safran Project* — https://www.softwareadvice.com/project-management/safran-project-management-profile/
57. Emerald Associates — *Turnaround Management Using Primavera P6* (cursus) — https://www.emerald-associates.com/turnaround-management-using-primavera-p6-2025-05-05.html
58. P6 Consulting — *STO300: Primavera P6 Advanced Training for Shutdowns, Turnarounds and Outages* (PDF) — https://www.p6consulting.ca/wp-content/uploads/2014/05/STO300-Overview.pdf
59. Stottler Henke — *Aurora is Applied to Refinery Turnaround* — https://stottlerhenke.com/aurora-is-applied-to-refinery-turnaround/
60. Planera — *Top 10 Primavera P6 Alternatives* — https://www.planera.io/post/primavera-p6-alternatives
61. Linarc — *Why It's Time to Move Beyond P6 for Construction Scheduling* — https://www.linarc.com/buildspace/why-its-time-to-move-beyond-p6-for-construction-scheduling
62. Planning Planet — *Replacing Primavera – best alternative?* — https://planningplanet.com/forums/planning-scheduling-programming-discussion/633970/replacing-primavera-best-alternative
63. Planning Planet — *Turnaround schedule levels* — http://www.planningplanet.com/forums/shutdowns-turnarounds-outages-stos/708427/turnaround-schedule-levels
64. Planning Planet — *Mastering Six Phases of Shutdown and Turnaround Management with iPlanSTO* — https://planningplanet.com/blog/mastering-six-phases-shutdown-and-turnaround-management-iplansto-2

### Standaarden, audits en forensiek
65. ScheduleReader — *DCMA 14-Point Assessment* (volledige drempelwaarden) — https://schedulereader.com/dcma-14-point-assessment-project-schedule-quality-analysis/
66. Plan Academy — *What is the DCMA 14-point schedule assessment?* — https://www.planacademy.com/dcma-14-point-schedule-assessment/
67. Ten Six — *An Introduction to the DCMA 14-Point Assessment Guidelines* (PDF) — https://tensix.com/wp-content/uploads/2025/02/Ten-Six-An-Introduction-to-the-DCMA-14-Point-Assessment-Guidelines-eBook.pdf
68. Change Inspector — *DCMA 14-Point Schedule Health Check* — https://blog.changeinspector.com/dcma-14-point-schedule-health-check/
69. ScheduleLens — *Primavera P6 Schedule Review: Complete Checklist* — https://schedulelens.com/blog/primavera-p6-schedule-review/
70. Alvid Consulting — *DCMA 14-Point Schedule Assessment: A Guide for Primavera P6 Users* — https://alvid-consulting.com/en/planning-scheduling/understanding-the-dcma-14-point-schedule-assessment-a-guide-for-primavera-p6-users/
71. AACE International — *Recommended Practices* — https://web.aacei.org/resources/publications/recommended-practices
72. Long International — *Forensic Schedule Analysis to Mitigate Claims & Delays* — https://www.long-intl.com/articles/forensic-schedule-assurance/
73. Precision Scheduling Consultants — *Construction Delay Claims and Forensic Schedule Analysis* — https://www.precisionschedulingconsultants.com/construction-delay-claims-forensic-analysis/
74. Precision Scheduling Consultants — *Forensic Schedule Analysis* — https://www.precisionschedulingconsultants.com/forensic-schedule-analysis/
75. USPI — *CFIHOS Purpose* — https://uspi.nl/index.php/cfihos-purpose
76. Sharecat — *CFIHOS 2025 — Complete Guide to the Standard, Changes and Benefits* — https://www.sharecatdataservices.com/insights/cfihos-2025-explained
77. Revisionz — *Bridging Information Gaps in Process Industries: ISO 15926 and CFIHOS* — https://revisionz.com/bridging-information-gaps-in-process-industries-the-synergy-of-iso-15926-and-cfihos/
78. DocsLib — *ISO 15926 and the Data Handover Standard CFIHOS* — https://docslib.org/doc/1260962/iso-15926-and-the-data-handover-standard-cfihos-based-on-it

### Bedrijfs- en financiële data
79. Kona Equity — *Prometheus Group revenue & employees* — https://www.konaequity.com/company/prometheus-group-4039240081/
80. PitchBook — *Prometheus Group company profile* — https://pitchbook.com/profiles/company/45248-95
81. GetLatka — *Prometheus Group Revenue, Valuation & Funding History* — https://getlatka.com/companies/prometheus-group
82. PrivSource — *Prometheus Group Acquires NiSoft* — https://www.privsource.com/acquisitions/deal/gaSyb7
83. Crunchbase — *Mobideo Technologies* — https://www.crunchbase.com/organization/mobideo-aerospace
84. Crunchbase — *Roser ConSys* — https://www.crunchbase.com/organization/roser-consys
85. CB Insights — *Roser ConSys* — https://www.cbinsights.com/company/roser-consys

### Arbeidsmarkt
86. ZipRecruiter — *Refinery Turnaround Planner Jobs* — https://www.ziprecruiter.com/Jobs/Refinery-Turnaround-Planner
87. ZipRecruiter — *Oil Gas Planner Scheduler Jobs* — https://www.ziprecruiter.com/Jobs/Oil-Gas-Planner-Scheduler
88. Talent.com — *Turnaround Planner average salary USA* — https://www.talent.com/salary?job=turnaround+planner
89. Salary.com — *Oil/Gas Senior Scheduler Salary* — https://www.salary.com/research/salary/alternate/oil-gas-senior-scheduler-salary

### Overig
90. Shiftbase — *24-Hour Shift Schedule: Rotas, Patterns, Law, Fatigue* — https://www.shiftbase.com/glossary/24-hour-shift-schedule
91. AMACS — *Understanding the Differences: Shutdowns, Turnarounds, and Outages* — https://amacs.com/turnarounds/understanding-the-differences-shutdowns-turnarounds-and-outages-in-refinery-operations/
92. Oil & Gas IQ — *What Are Shutdowns and Turnarounds?* — https://www.oilandgasiq.com/operational-excellence/articles/what-are-shutdowns-and-turnarounds
93. Wikipedia — *Turnaround (refining)* — https://en.wikipedia.org/wiki/Turnaround_(refining)
94. Boardman Inc. — *The Benefits of Turnaround Maintenance for Chemical & Petrochemical Plants* — https://www.boardmaninc.com/blog/turnaround-maintenance-chemical-petrochemical-plants/
95. PetrochemExpert — *A Step-by-Step Guide to Petrochemical Turnarounds* — https://petrochemexpert.com/a-step-by-step-guide-to-petrochemical-turnarounds/

---

## Bijlage: betrouwbaarheidsclassificatie van de kerncijfers

| Cijfer | Waarde | Betrouwbaarheid |
|---|---|---|
| >⅔ turnarounds >10% over kosten/tijd; 40% >30% | AP-Networks, 1.350+ observaties | **Hoog** — primair whitepaper, methodologie beschreven |
| 19% gem. scope­groei / 7% top kwartiel | AP-Networks | **Hoog** — idem |
| IAMTech prijslijst ($99k–$165k/site/jaar) | IAMTech website | **Hoog** — leverancier publiceert zelf |
| Oracle P6 EPPM Cloud £220/gebruiker/maand, min 25 | G-Cloud 14 prijsdocument mei 2024 | **Hoog** — formeel raamovereenkomstdocument |
| Oracle perpetual $2.750 + $605 support | Oracle Texas DIR prijslijst 10-11-2016 | **Hoog voor 2016**, verouderd voor 2026 |
| 825 raffinaderijen (2024) | Statista | **Hoog** |
| Raffinage-uitgaven $30→55→135 mrd (2024–2026) | Industrial Info Resources | **Middel-hoog** — vakspecialistische bron, geen methodologie gepubliceerd |
| $1–3M/dag vertragingskosten | secundaire vakpers, meerdere bronnen | **Middel** — consistent over bronnen, geen primaire studie; ondersteund door mijn eigen crack-spread-berekening |
| Turnaround services markt $4,9–5,8 mrd | Dataintelo / Market Intelo | **Laag-middel** — syndicated reports |
| Turnaround planning software $1,12 mrd (2024) | Growth Market Reports | **Laag** — waarschijnlijk AI-gegenereerd, scope onduidelijk |
| "80% van turnarounds >10% over budget" | T.A. Cook/Solomon, niet traceerbaar | **Zeer laag — niet gebruiken** |
| Prometheus omzet $210–241M | Kona Equity / ZoomInfo | **Laag-middel** — dataleveranciers, niet bedrijfsopgave |
| Mijn segmentschatting $300M/jaar | eigen bottom-up model | **[SCHATTING]** — kruisgevalideerd tegen leveranciersomzet; bandbreedte $220–420M |
