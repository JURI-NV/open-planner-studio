# Sectorrapport — Onderhoud, asset management en MRO

**Onderzoeksdatum:** 25 juli 2026
**Scope:** planningssoftware in onderhoud (plant maintenance), asset management (EAM/CMMS) en MRO (maintenance, repair & overhaul) — industrie, energie, luchtvaart, marine/defensie, spoor en infrastructuurbeheer.
**Kernvraag uit de opdracht:** waar ligt de grens tussen projectplanning en onderhoudsplanning, en hoeveel van deze wereld valt daadwerkelijk in de *scheduling-softwaremarkt*?

---

## Leeswijzer en methodologische waarschuwing

Dit rapport hanteert drie markeringen:

- **[SCHATTING]** — eigen berekening of inschatting, met expliciete redenering. Geen bron.
- **[ONZEKER]** — bron gevonden, maar de bron is zwak, secundair, of wordt niet door andere bronnen bevestigd.
- Alles zonder markering is direct terug te voeren op de bron-URL in de zin of in de bronnenlijst.

**Drie waarschuwingen vooraf die dit hele rapport kleuren:**

1. **De marktcijfers in dit domein zijn onderling niet optelbaar.** "EAM-markt", "CMMS-markt", "MRO-softwaremarkt", "field service management-markt" en "asset performance management-markt" worden door de analistenbureaus met overlappende definities gemeten. De MRO-softwaremarkt van $8,0 mrd (2025) en de luchtvaart-MRO-softwaremarkt van $7,7 mrd (2025) zijn bijvoorbeeld vrijwel zeker grotendeels dezelfde omzet, verschillend afgebakend. **[Bij verificatie bevestigd, en sterker dan hier gesteld: het MarketsandMarkets-rapport heet voluit "MRO Software Market ***in Aviation*** by End User (Operators, OEMs, MROs, Lessors)". Het is dus per definitie de luchtvaart-MRO-softwaremarkt — geen vermoeden meer, maar een feit.]** Elke optelsom in dit rapport is daarom als **[SCHATTING]** gemarkeerd en gaat gepaard met een expliciete overlap-correctie.

2. **"Scheduling" betekent in deze sector iets anders dan in de bouw.** In de bouw is scheduling synoniem met CPM-netwerkplanning. In onderhoud betekent scheduling in 90% van de gevallen *capaciteitstoewijzing*: welke werkorder gaat naar welke ploeg in welke week. Dat is een bin-packing-probleem, geen netwerkprobleem. Wie de EAM-markt als "scheduling-softwaremarkt" telt, telt fout. §2 werkt dit onderscheid uit; het is de intellectuele kern van dit rapport.

3. **Dit rapport overlapt bewust met twee zusterrapporten** — `sector-olie-en-gas-turnarounds-en-shutdowns.md` en `sector-energie-nutsbedrijven-en-nucleair.md`. Die behandelen het *event* (de turnaround, de outage) in detail. Dit rapport behandelt het *regime eromheen*: de dagelijkse onderhoudsplanning, de MRO-industrie (luchtvaart, marine, spoor) en de asset-managementlaag. Waar dat overlapt verwijs ik en herhaal ik alleen wat nodig is voor de redenering.

---

## 1. Wat maakt deze sector bijzonder qua planning

### 1.1 De fundamentele breuk: onderhoud is geen project

Een bouwproject is een eenmalige, eindige, sequentieel-afhankelijke onderneming met een gedefinieerd eindproduct. Onderhoud is een **oneindige, herhalende stroom werk aan een bestaand, werkend actief**. Dat verschil raakt vrijwel elk planningsconcept:

| Dimensie | Projectplanning (bouw/EPC) | Onderhoudsplanning (routine) |
|---|---|---|
| Eenheid van werk | Activiteit in een netwerk | Werkorder / taak op een asset |
| Tijdshorizon | 1–7 jaar, één keer | Rollend, weekcyclus, oneindig |
| Afhankelijkheden | Rijk netwerk (FS/SS/FF, lags) | Vrijwel afwezig; werkorders zijn grotendeels onafhankelijk |
| Kritieke pad | Centraal concept | **Bestaat niet** in routinewerk |
| Sturingsmaat | Total float, EVM, SPI | **Schedule compliance**, wrench time, backlog-leeftijd |
| Beperkende factor | Logica en volgorde | **Capaciteit** (vakmensen, uren, gereedschap, materiaal) |
| Wat is "klaar" | Oplevering | Nooit; asset blijft draaien |
| Wie plant | Planner/scheduler (projectrol) | **Maintenance planner** (onderhoudsrol, andere opleiding) |

De onderhoudswereld heeft hier eigen vakliteratuur voor. De standaardreferentie is Doc Palmers *Maintenance Planning and Scheduling Handbook*, die het vak expliciet losknipt van projectmanagement. De centrale stelregel — **één planner per 20 tot 30 vakmensen** — is de best gedocumenteerde vuistregel in het veld, aldus [ReliaMag](https://reliamag.com/): *"The planner-to-technician ratio, commonly cited as one planner per 20 to 30 technicians, is the best-documented rule of thumb in the field, traceable to Doc Palmer's Maintenance Planning and Scheduling Handbook."* [Plant Services](https://www.plantservices.com/) formuleert dezelfde regel: *"A single planner can keep up with 20-30 craftspersons, considering that planners do not have to make perfect job plans and they make weekly schedules simply as a full list of work to challenge supervisors."*

Let op de formulering: *"weekly schedules simply as a full list of work"*. Dat is geen CPM-netwerk. Dat is een lijst. Dit is precies waarom de onderhoudswereld decennia is doorgekomen zonder Primavera.

### 1.2 Drie regimes — het beslissende onderscheid

Onderhoudsplanning valt uiteen in drie regimes die volledig andere software vragen. Dit is de sleutel tot de kernvraag van de opdracht.

**Regime A — Routinematig werkbeheer (de grootste, en géén CPM).**
Dagelijkse en wekelijkse werkorders, preventief onderhoud (PM-routines), storingswerk, inspecties. Duizenden tot tienduizenden werkorders per site per jaar, elk enkele uren tot dagen lang, vrijwel zonder onderlinge logica. Het probleem is capaciteitsallocatie onder onzekerheid, niet netwerkberekening. Software: SAP PM, IBM Maximo, Prometheus GWOS, IFS, Infor EAM, en honderden CMMS-pakketten. **Kritieke pad speelt hier geen rol.**

**Regime B — Onderhoudsevenementen (klein in aantal, wél volledig CPM).**
Turnarounds, shutdowns, outages, refuelling-outages, dok- en werfperiodes (naval availabilities), zware luchtvaartchecks (C-check, D-check), spoormaterieel-revisies. Dit zijn **projecten in alles behalve naam**: eindig, met een harde einddatum, een rijk logisch netwerk, duizenden tot tienduizenden activiteiten, uur-granulariteit, 24-uursploegen, en catastrofale kosten bij overschrijding. Software: **Primavera P6**, plus een orkestratielaag (Prometheus STO, Cleopatra, IAMTech, Roser, Mobideo). Dit is het deel dat écht in de scheduling-softwaremarkt valt.

**Regime C — Kapitaalwerk aan draaiende assets.**
Vervangingsinvesteringen, revisies, levensduurverlenging, modificaties. Gewone projectplanning, maar uitgevoerd binnen de operationele beperkingen van een draaiende fabriek. Software: P6/MS Project, vaak gekoppeld aan de EAM als bron van assetdata.

**De grens ligt niet bij de organisatie maar bij het werktype.** Eén raffinaderij draait alle drie de regimes tegelijk, met drie verschillende gereedschappen en vaak drie verschillende afdelingen. Dat is de belangrijkste structurele frictie in deze sector — zie §7.

### 1.3 Schaal

De schaal van deze sector is in *aantal planners* enorm en in *softwarebesteding per planner* laag — het spiegelbeeld van de bouw.

**Werkorder- en werknemersvolume.** De Amerikaanse BLS meldt voor de beroepsgroep installatie/onderhoud/reparatie ongeveer **608.100 vacatures per jaar** en een mediaan jaarloon van **$63.510 (mei 2024)** voor industrieel-machinemonteurs; de werkgelegenheid voor die groep groeit naar verwachting **13% tussen 2024 en 2034**, "much faster than the average" ([BLS via zoekresultaat](https://www.bls.gov/ooh/installation-maintenance-and-repair/)). Salarisdata voor de specifieke rol *maintenance planner/scheduler* in de VS ligt op **$63.445–$80.636 per jaar** ([zoekresultaat-synthese](https://html.duckduckgo.com/html/?q=maintenance+planner+scheduler+salary)).

**Aantal sites.** Wereldwijd waren er begin 2025 ongeveer **825 actieve ruwe-olieraffinaderijen** ([zoekresultaat-synthese](https://html.duckduckgo.com/html/?q=number+of+refineries+worldwide+2025)). Daarbovenop komen chemische complexen, energiecentrales, mijnen, papier-, staal- en cementfabrieken, luchtvaart-onderhoudsbases, marinewerven en spoordepots. Zie §4 voor de sitetelling die ik voor de sizing gebruik.

**Afgeleide planner-populatie [SCHATTING].** Uit de 1:20–30-ratio volgt: als de wereldwijde onderhoudsvakmenspopulatie in asset-intensieve sectoren (dus exclusief gebouwgebonden techniek en consumenten-reparatie) op **25–40 miljoen** ligt, dan zijn er **circa 0,8–2,0 miljoen onderhoudsplanners/-schedulers wereldwijd**. Dat is een orde van grootte méér dan het aantal CPM-projectplanners. Maar — en dit is beslissend — **het overgrote deel daarvan raakt nooit een CPM-tool aan**. Zij werken in SAP PM of Maximo en in Excel.

### 1.4 Doorlooptijd — het spectrum is extreem

| Werktype | Typische duur | Planningshorizon | Granulariteit |
|---|---|---|---|
| Storingswerk (breakdown) | uren | nu | minuten/uren |
| Routine-werkorder | 2–16 uur | 1–4 weken vooruit | uren |
| PM-routine | 1–8 uur | jaarkalender, cyclisch | dagen |
| Luchtvaart A-check | 10–24 uur | weken | uren |
| Luchtvaart C-check | 1–3 weken | 6–12 maanden | uren |
| Luchtvaart D-check | 4–8 weken | 12–24 maanden | uren |
| Nucleaire refuelling-outage | 20–45 dagen | 18–24 maanden | uren, 24/7-ploegen |
| Raffinaderij-turnaround | 20–60 dagen | 24–48 maanden | uren, 24/7-ploegen |
| Naval availability (dok) | 3–18 maanden | 12–36 maanden | dagen |
| Spoormaterieel-revisie | weken–maanden | jaren | dagen |

Twee dingen vallen op. Ten eerste: de **planningshorizon is vaak 10 tot 40 keer langer dan de uitvoering**. Een turnaround van 30 dagen wordt drie jaar voorbereid. Dat is het omgekeerde van bouw. Ten tweede: **de uitvoeringsgranulariteit is uren, niet dagen** — voor vrijwel alles in regime B. Dat is de belangrijkste functionele eis die de sector aan planningssoftware stelt en waar generieke tools op stuklopen.

### 1.5 Resourcecomplexiteit

Onderhoudsplanning is resource-gedreven waar projectplanning logica-gedreven is. De beperkingen die tegelijk moeten kloppen:

- **Vakdisciplines (crafts)** met certificeringen: lassers met specifieke procedurekwalificaties, elektriciens met spanningsbevoegdheid, steigerbouwers, isolatiemonteurs, NDO-inspecteurs, kraanmachinisten.
- **Ploegenroosters**: 2×12 uur, 3×8 uur, dag/nacht, met overdrachtsmomenten die zelf planningsobjecten zijn.
- **Materiaal en reservedelen**: de meest voorkomende oorzaak van niet-uitvoerbare werkorders. Prometheus verkoopt hier een apart product voor (Material Availability Coordinator) en een "36-uurs lookahead" op materiaalbeschikbaarheid.
- **Vergunningen en isolaties**: werkvergunningen, LOTO/energie-isolatie, blindenlijsten, confined-space-entry. Deze zijn *tijdsgebonden en veiligheidskritisch* en vormen vaak de werkelijke bottleneck — niet de vakmensen.
- **Ruimte en toegang**: steigers, kraanposities, compartimenten op een schip, hangar-slots.
- **De asset zelf**: het onderdeel moet buiten bedrijf zijn, en dat kost productie.

**Wrench time is de maat die de hele sector definieert.** Meerdere onafhankelijke bronnen convergeren: het industriegemiddelde ligt op **25–35%** van de dienst aan daadwerkelijk gereedschapswerk, en world-class op **45–55%** ([ReliaMag](https://reliamag.com/): *"The figure everyone repeats is 25 to 35 percent typical, about 55 percent world-class"*; [Tractian](https://tractian.com/): *"Industry average wrench time is 25 to 35 percent. Best-in-class is 45 to 55 percent"*; [OxMaint](https://oxmaint.com/)). Prometheus Group zou claimen dat betere planning en scheduling **55–65%** haalbaar maakt. **[ONZEKER — bij verificatie niet teruggevonden op [prometheusgroup.com/solutions/planning-and-scheduling](https://www.prometheusgroup.com/solutions/planning-and-scheduling); die pagina noemt geen wrench-time-percentages maar wél een casus (Hemlock Semiconductor) met *"30% increase in productivity"*, *"80% maintenance capacity across all work centers"* en *"30% decrease in non-value added activities"*. Gebruik die cijfers in plaats van de 55–65%.]**

Dat betekent: **twee derde tot drie kwart van de duurste resource in de fabriek gaat verloren aan lopen, wachten op onderdelen, administratie en informatie zoeken.** Dat is de economische rechtvaardiging van de hele planningssoftware-industrie in dit segment — en het is een veel directer, beter meetbaar ROI-verhaal dan in de bouw.

### 1.6 Contractuele eisen

Contractueel is deze sector gelaagder dan de bouw, met drie verschillende regimes:

**a) Interne onderhoudsorganisatie (owner-operator).** Geen contract; sturing via KPI's (schedule compliance, PM-compliance, backlog, wrench time). Softwarekeuze is een IT-/OT-beslissing, niet contractueel afgedwongen.

**b) Uitbesteed onderhoud / MRO-dienstverlening.** Contracten met beschikbaarheidsgaranties, doorlooptijdgaranties (TAT — turnaround time) en boeteclausules. In de luchtvaart is TAT-overschrijding direct in geld uit te drukken (zie §1.7). Power-by-the-hour-contracten verschuiven het risico naar de MRO-partij, wat de planningsdruk daar concentreert.

**c) Defensie- en overheids-MRO.** Hier is de planning **contractueel voorgeschreven tot op dataveld-niveau**. Zie §5.2 voor de volledige analyse van NAVSEA Standard Item 009-111, dat een CPM-netwerk, total float, predecessor/successor-verplichting en wekelijkse actualisatie voorschrijft.

### 1.7 Kosten van vertraging — de hardste cijfers in het hele onderzoek

Dit is waar deze sector zich onderscheidt van vrijwel alle andere: **de kosten van vertraging zijn direct, dagelijks en exact bekend.** Er is geen discussie over "gederfde marktkansen" — de rekenmeester weet wat een dag stilstand kost.

| Situatie | Kosten van vertraging | Bron |
|---|---|---|
| Ongeplande stilstand, Fortune Global 500 totaal | **$1,4 biljoen per jaar** = **11% van de omzet** (was 8% / $864 mrd in 2019-20) | [Siemens, True Cost of Downtime 2024](https://www.siemens.com/) |
| Ongeplande stilstand, per uur (zware industrie) | tot **$260.000 per uur** | [IIoT World via zoekresultaat](https://www.iiot-world.com/) |
| Bedrijven die de afgelopen 3 jaar ongeplande stilstand hadden | **82%** | [Siemens, True Cost of Downtime 2024](https://www.siemens.com/) |
| Nucleaire outage, per dag vervangende stroom | **$1–2 mln/dag**; voor een 1.000 MW-eenheid **$1,5 mln/dag**; ongeplande shutdown **$0,5–1 mln/dag** | [OptiScheduleAI](https://optischeduleai.com/), [Knowledge Relay](https://knowledgerelay.com/), [Eureka PatSnap](https://eureka.patsnap.com/) |
| Raffinaderij-turnaround, vertraging | **>$1 mln/dag** aan gederfde productie | [AMACS](https://amacs.com/turnarounds/understanding-the-differences-shutdowns-turnarounds-and-outages-in-refinery-operations/) |
| Luchtvaart AOG (aircraft on ground), per uur | **$10.000–$150.000/uur**, afhankelijk van type en route; smalbody 737 ca. $10–15k/vlieguur omzet, gegrond ca. $150k | [zoekresultaat-synthese AOG-kosten](https://html.duckduckgo.com/html/?q=AOG+cost+per+hour) |
| Luchtvaart AOG, per dag (motorgerelateerd) | **$50.000–$150.000** voor één dag; 2–3 dagen loopt op naar **$150.000–$600.000** | idem |
| Luchtvaart TAT-overschrijding zware check | *"A single day of TAT overrun can cost an airline six figures in AOG penalties"* | [OxMaint Base Maintenance](https://oxmaint.ai/industries/aviation-management/base-maintenance-software) |

**De consequentie voor softwarebudgetten:** als één dag vertraging $1–2 mln kost, is een softwarelicentie van $100.000 per jaar economisch triviaal — mits die aantoonbaar één dag bespaart. Dit verklaart de zeer hoge betalingsbereidheid in regime B (§3.5) en tegelijk de lage betalingsbereidheid in regime A, waar een dag vertraging op een routinewerkorder niets kost.

Dat is de belangrijkste structurele asymmetrie in deze markt.

---

## 2. Welke planningssoftware wordt daadwerkelijk gebruikt — rangorde en gebruikers

### 2.1 De rangorde per regime

De vraag "welke planningssoftware wordt in onderhoud gebruikt" heeft geen enkel antwoord, omdat de drie regimes disjuncte softwaremarkten zijn.

#### Regime A — Werkbeheer en capaciteitsplanning (geen CPM)

| # | Pakket | Leverancier | Positie | Bewijs |
|---|---|---|---|---|
| 1 | **SAP PM / S/4HANA Asset Management** | SAP | De facto standaard in grote industrie, chemie, olie & gas, energie, farma. De werkorder woont hier. | Genoemd als top-EAM-leverancier ([MarketsandMarkets](https://www.marketsandmarkets.com/Market-Reports/enterprise-asset-management-market-97530575.html)); vrijwel elke STO-suite verkoopt zichzelf als "SAP-native" |
| 2 | **IBM Maximo Application Suite (Manage)** | IBM | Dominant in nutsbedrijven, transport, defensie, olie & gas, facility. Leider in Verdantix Green Quadrant EAM 2024. | **2.157 geverifieerde bedrijven** gebruiken Maximo (2026, [Landbase](https://www.landbase.com/)); [Verdantix Green Quadrant EAM 2024](https://www.verdantix.com/) |
| 3 | **Prometheus Group (GWOS-AI, Mobile EAM, Master Data)** | Prometheus Group | Niet een EAM maar de *planningsschil* óp SAP/Maximo/Oracle. Marktleider in die niche. | Integreert met SAP ECC/S4, Oracle en IBM Maximo; klanten PepsiCo, Goodyear, Rio Tinto, Marathon, Bayer, Saudi Aramco ([Prometheus Group](https://www.prometheusgroup.com/solutions/planning-and-scheduling)) |
| 4 | **IFS Cloud (EAM/FSM)** | IFS | Sterk in luchtvaart & defensie, energie, spoor/transit, telecom. | FY2025 ARR **+23%**, cloudomzet **+30%**, NRR **114%**, waardering **>€15 mrd** ([IFS via zoekresultaat](https://www.ifs.com/)) |
| 5 | **Hexagon ALI (EAM, o.a. ex-Infor EAM, J5, EcoSys)** | Hexagon AB | Volwaardige EAM + operations-suite; ALI is de **derde** divisie van Hexagon naar omzet (na Manufacturing Intelligence 1.955,7 MEUR en Geosystems 1.555,4 MEUR). *[gecorrigeerd bij verificatie — stond eerder "op-één-na-grootste"]* | ALI-omzet 2024: **831,7 MEUR** (2023: 782,0), organisch **+7%**; *"Enterprise Asset Management (EAM) delivered consistent double-digit SaaS growth"* ([Hexagon Annual and Sustainability Report 2024, p. 24](https://bynder.hexagon.com/m/3f5532e06b4faf41/original/Hexagon-Annual-and-Sustainability-Report-2024.pdf)) |
| 6 | **Oracle EAM / Fusion Maintenance** | Oracle | Meeliftend op Oracle-ERP-installaties. | Genoemd als top-EAM-leverancier ([MarketsandMarkets](https://www.marketsandmarkets.com/Market-Reports/enterprise-asset-management-market-97530575.html)) |
| 7 | **Long tail CMMS** (Fiix, UpKeep, Limble, eMaint, MaintainX, Fabrico, Atlas CMMS…) | divers | Mkb en middensegment; honderden aanbieders. | CMMS-markt $1,3–2,3 mrd 2025, zie §4 |
| 8 | **Excel** | — | Onverwoestbaar. Zie §7.1: planners besteden aantoonbaar meer tijd in Excel dan in het CMMS. | *"Planners spending more time in Excel than SAP"*, *"heavily configured and manual process in Excel"* ([zoekresultaat-synthese klachten](https://html.duckduckgo.com/html/?q=Maximo+scheduler+complaints+SAP+PM+scheduling+frustration)) |

#### Regime B — Onderhoudsevenementen (volledig CPM)

| # | Pakket | Positie | Bewijs |
|---|---|---|---|
| 1 | **Oracle Primavera P6 (Professional + EPPM)** | De facto monopolist. Elke STO-/outage-suite noemt P6-integratie als eerste feature. Ook het contractueel geaccepteerde formaat in defensie-MRO. | Zie zusterrapport `sector-olie-en-gas-turnarounds-en-shutdowns.md`; [IAMTech](https://www.iamtech.com/products/shutdown-turnaround-outage-software) noemt bidirectionele P6-integratie als eerste |
| 2 | **Prometheus STO-AI Manager / Roser ConSys** | Marktleider in de orkestratielaag bovenop P6. SAP-/Maximo-native. | Klanten ExxonMobil, BP, Marathon Petroleum, Covestro, Constellation Energy, Talen Energy, Gunvor, Susquehanna Nuclear (zie zusterrapport) |
| 3 | **Microsoft Project** | Middensegment, kleinere shutdowns, spoordepots, kleinere MRO-bedrijven. | — |
| 4 | **Cleopatra Enterprise / STO Control** | Kostenraming + kostenbeheersing + historische turnaround-kostendatabase. | Zie zusterrapport |
| 5 | **IAMTech iPlanSTO / iPlanUltimate** | Prijstransparante uitdager, onbeperkte gebruikers per site. | **£75.000/site/jaar** ([IAMTech](https://www.iamtech.com/products/shutdown-turnaround-outage-software)) |
| 6 | **Actenum DSO** (sinds dec. 2025 Prometheus) | AI/optimalisatie-scheduler voor turnarounds en wellwerk; drag-and-drop Gantt, what-if-scenario's. | Overname aangekondigd **16 december 2025** ([Automation.com](https://www.automation.com/article/prometheus-group-acquires-actenum), [Prometheus Group](https://www.prometheusgroup.com/resources/posts/prometheus-group-acquires-actenum)) |
| 7 | **Hexagon EcoSys** | STO-**portfolio**management over meerdere sites en jaren. | [Hexagon](https://hexagon.com/solutions/shutdowns-turnarounds-and-outages-sto) |
| 8 | **Mobideo, Maximl, Innovapptive, Toadfly** | Mobiele velduitvoering en real-time voortgang. | Zie zusterrapport |
| 9 | **Safran Project** | Noorse offshore; CPM + EVM + risico in één datamodel. | Zie zusterrapport |

#### Regime B-varianten per MRO-subsector

**Luchtvaart-MRO.** Hier is de planning ingebed in de MRO-suite zelf, niet in een aparte scheduler. De meest geadopteerde pakketten zijn volgens [AppsRunTheWorld](https://www.appsruntheworld.com/): *"Pentagon 2000SQL, IFS Maintenix, AV-BASE WinAir, Swiss AS AMOS, Ramco Aviation MRO, Trax eMRO, JSS Traxxall, Inform GroundStar, Infor CloudSuite Aerospace and Defence and Valsoft OASES."*

- **AMOS** (Swiss AviationSoftware) — *"a comprehensive aircraft maintenance and engineering system"*, *"trusted by hundreds of organisations across five continents"* ([Swiss-AS](https://www.swiss-as.com/)). Opvallend: op de eigen productpagina wordt **planning en scheduling niet als apart module uitgelicht** — het zit verstopt in "maintenance, engineering and logistics processes".
- **IFS Maintenix**, **TRAX eMRO**, **Ramco Aviation** — vergelijkbaar profiel.
- Voor de zware check zelf gebruiken MRO's daarnaast **MS Project of P6**, plus gespecialiseerde hulpmiddelen (EXSYN Base Maintenance Ground Time Prediction voor doorlooptijdvoorspelling, [EXSYN](https://exsyn.com/base-maintenance-ground-time-prediction-app)). Er is ook actief academisch werk aan lineaire-programmeringsmodellen voor C-/D-check-scheduling ([Springer](https://link.springer.com/article/10.1007/s13243-024-00135-6)).

**Marine/naval MRO.** Primavera P6 domineert, contractueel gedreven (§5.2). De markt voor de *diensten* is gigantisch: **$57,5 mrd in 2025**, groeiend naar **$97,3 mrd in 2034** bij **6,1% CAGR**; Noord-Amerika **$21,4 mrd (37,2%)**, Europa **$13,9 mrd (24,1%)**, Azië-Pacific **$11,9 mrd (20,8%, snelst groeiend met 7,4% CAGR)** ([Growth Market Reports](https://growthmarketreports.com/report/naval-ship-maintenance-repair-and-overhaul-mro-market-global-industry-analysis)).

**Spoor/rollend materieel.** Versnipperd: **IFS** (*"asset-centric Enterprise Asset Management platform designed specifically for rail and transit complexity"*), **DELMIA Rail Planning** van Dassault Systèmes (*"transforms rolling stock maintenance from a reactive process into a predictive, model-based"* proces), **IBM Maximo** (via partners zoals Naviam), **Railnova** (telematica/predictief), **SOROS** (Danbury Kline), **Arkyn** (mobiel, SAP-integratie) ([zoekresultaat-synthese spoor-MRO](https://html.duckduckgo.com/html/?q=rolling+stock+maintenance+planning+software)). Depotplanning zelf gebeurt vaak in MS Project of maatwerk.

### 2.2 Wie gebruikt wat — per rol in de keten

| Partij | Regime A (werkbeheer) | Regime B (evenement) | Waarom |
|---|---|---|---|
| **Opdrachtgever / asset owner** (raffinaderij, nutsbedrijf, luchtvaartmaatschappij, marine, spoorbeheerder) | SAP PM of Maximo als *systeem van waarheid*; Prometheus/IFS als planningsschil erbovenop | P6 EPPM als contractuele waarheid + één STO-/outage-suite | Bezit de asset, het budget en het productieverlies. Dicteert het formaat. |
| **Hoofdaannemer / MRO-dienstverlener** (turnaround-contractor, scheepsreparatiewerf, luchtvaart-MRO) | Eigen ERP/MRO-suite (AMOS, Maintenix, eMRO) of het systeem van de klant | **P6, want de klant eist het.** Vaak meerdere P6-omgevingen voor meerdere klanten | Levert de manuren en draagt het TAT-risico. |
| **Onderaannemer** (steigerbouw, isolatie, NDO, lassen, kraanverhuur, catalyst-handling) | Niets, of een simpel CMMS | **Excel en papier.** Prijs sluit ze uit — zie §3.6 | Levert **80–90% van de manuren** in een turnaround maar heeft geen licentie. |
| **Engineeringbureau / reliability-consultant** | Analysetools (RCM, RBI), Meridium/APM | P6 voor schema-audits; Acumen Fuse / Touchstone voor schemakwaliteit | Adviseur, geen uitvoerder. |
| **Toezichthouder / verzekeraar / auditor** | Leest rapportages; eist ISO 55001-bewijs | Leest P6-exports, DCMA-14-rapporten, forensische analyses | Vraagt bewijs, niet software. |

### 2.3 Het antwoord op de kernvraag: waar loopt de grens?

**De grens loopt bij de aanwezigheid van een betekenisvol logisch netwerk met een harde einddatum.**

Operationeel is dat te toetsen met drie vragen:

1. **Heeft dit werk een harde einddatum waarvan afwijking direct geld kost?** Ja → regime B/C. Nee → regime A.
2. **Bepalen onderlinge afhankelijkheden de doorlooptijd, of doet capaciteit dat?** Logica → CPM zinvol. Capaciteit → CMMS-scheduler zinvol.
3. **Is de activiteitentelling >500 met >30% van de activiteiten in een keten van >5 schakels?** Zo ja, dan is CPM niet optioneel.

**Kwantitatief:** van de wereldwijde onderhoudsplanner-populatie (**0,8–2,0 mln [SCHATTING]**, §1.3) valt naar mijn schatting **2–5%** in regime B/C — dus **16.000–100.000 mensen** (2% van 0,8 mln tot 5% van 2,0 mln; eerder stond hier afgerond 20.000 als ondergrens) die daadwerkelijk CPM-planning doen aan onderhoudswerk. **[SCHATTING]** — gebaseerd op: (a) het aantal sites dat periodieke grote shutdowns draait is een fractie van het aantal sites met een onderhoudsafdeling; (b) per zo'n site zijn er 1–8 CPM-capabele planners tegenover tientallen werkorder-planners; (c) de MRO-dienstverleners en werven voegen een vergelijkbaar volume toe aan de contractantenkant.

**Dat is het getal dat telt.** De EAM-markt van bijna $6 mrd is grotendeels *géén* scheduling-softwaremarkt. §4 werkt dat door naar euro's.

---

## 3. Wat ervoor betaald wordt

### 3.1 Licentieprijzen — regime A (werkbeheer/EAM)

**IBM Maximo Application Suite** hanteert een credit-model ("AppPoints"), waarbij organisaties *"pay for the functionality they access rather than a flat per-user rate"*. Gepubliceerde instapprijzen ([IBM Maximo pricing](https://www.ibm.com/products/maximo/pricing)):

| Module (Essentials-tier) | Vanaf AppPoints | Vanaf prijs per jaar |
|---|---|---|
| Maintenance | 150 | **onder $40.000** |
| Inspection | 175 | **onder $47.000** |
| Space Management | 150 | onder $40.000 |
| Capital Planning | 150 | onder $40.000 |
| Lease Management | 150 | onder $40.000 |
| Inventory Optimization | 140 | onder $40.000 (+ servicepakket) |
| Standard / Premium (volledige suite) | vanaf 300 | niet gepubliceerd |

IBM publiceert **geen prijs per AppPoint** — de conversieratio ontbreekt bewust op de prijspagina. Een secundaire bron noemt *"SaaS tiers from $3,150/month"* (≈ $37.800/jaar), consistent met de "onder $40.000"-instap ([Facilio](https://facilio.com/)). Belangrijk voor dit rapport: **in MAS 9 zit Scheduler in het Maintenance/Essentials-pakket**, waar het in eerdere versies een aparte betaalde module was. Dit is bij verificatie **bevestigd op IBM's eigen prijspagina**: in de capaciteitstabel bij Maintenance/Essentials staat letterlijk *"MAS Scheduler included"* ([IBM Maximo pricing](https://www.ibm.com/products/maximo/pricing)). Dat is een prijsverlaging voor onderhoudsscheduling én een signaal dat IBM scheduling als tafelinzet beschouwt, niet als premium-functie. **[Deels bevestigd — IBM bevestigt "MAS Scheduler included" bij Maintenance/Essentials; IBM specificeert níét of dit voor alle MAS 9-tiers geldt en of er nul extra AppPoints tegenover staan.]**

**SAP** publiceert geen plant-maintenance-prijslijst. Wat wel bekend is: SAP Service and Asset Manager wordt afgerekend in **Full Use Equivalents (FUE)** met de ratio's *"1 FUE = 1 professional user, 1 FUE = 2 standard users, 1 FUE = 10 basic users"*; S/4HANA Public Cloud ligt rond **$180/gebruiker/maand**, gespecialiseerde modules **$500–$1.000 per gebruiker**, en implementaties in de band **$75.000–$500.000** ([zoekresultaat-synthese SAP-licenties](https://html.duckduckgo.com/html/?q=SAP+S4HANA+asset+management+license+cost)). **[ONZEKER — SAP-prijzen zijn vrijwel altijd onderhandeld; deze bedragen zijn indicaties uit secundaire bronnen, geen prijslijst.]**

**Prometheus Group** publiceert geen prijzen. Zie §3.4 voor wat wel bekend is over hun omvang.

### 3.2 Licentieprijzen — regime B (evenementen, CPM)

| Product | Prijs | Bron |
|---|---|---|
| **Oracle Primavera P6 EPPM Cloud** | **$305/gebruiker/maand** (£220 in het VK), **minimum 25 gebruikers** → **$91.500/jaar** instap. Rekenkundig consistent (25 × $305 × 12 = $91.500; $305 × 12 = $3.660/jaar). **[ONZEKER — bij verificatie niet uit een primaire Oracle-prijslijst te bevestigen; alle geprobeerde Oracle-prijslijst-URL's gaven 404. Blijft een secundaire bron.]** | [zoekresultaat-synthese P6-prijzen](https://html.duckduckgo.com/html/?q=Primavera+P6+EPPM+cloud+price+per+user); UK G-Cloud-prijsdocumenten |
| **IAMTech iPlanSTO — site licence, onbeperkt gebruikers** | **£75.000/jaar** (1 locatie); £71.000 elk bij 2 locaties (5% korting); tot 20% korting bij 5+ locaties → £60.000 elk | [IAMTech](https://www.iamtech.com/products/shutdown-turnaround-outage-software) |
| **IAMTech iPlanSTO — individuele gebruiker** | **£25.000/gebruiker/jaar**; £20.000 elk bij 5+ (20% korting) | idem |
| **Prometheus STO-AI / Roser / Cleopatra / EcoSys / Mobideo** | **Niet gepubliceerd.** IAMTech beschuldigt de sector openlijk van *"charge you as much as they think you can afford"* | [IAMTech kennisartikel](https://www.iamtech.com/knowledge/3-key-questions-to-ask-when-choosing-your-sto-turnaround-shutdown-outage-software-solution) |
| **Actenum DSO** | *"Available upon request"*; waarde-metriek is *"the complexity of the scheduling environment, number of users, and level of service"* | [Actenum via zoekresultaat](https://html.duckduckgo.com/html/?q=Actenum+DSO+pricing) |

**De prijskloof is het belangrijkste feit in deze paragraaf.** Een IAMTech-sitelicentie met onbeperkte gebruikers kost **£75.000** (IAMTech publiceert daarnaast een USD-prijslijst: **$99.000/site/jaar**, aflopend tot $79.000 bij 5+ locaties); **drie individuele IAMTech-gebruikers kosten al evenveel** (£23.000 elk = £69.000). *[gecorrigeerd bij verificatie: hier stond eerder "drie individuele P6-gebruikers", wat feitelijk onjuist is — drie P6 EPPM-seats kosten $10.980/jaar ≈ £8.600, een factor ~9 minder. De vergelijking die het punt maakt is IAMTech-site versus IAMTech-user.]* Het bestaan van dit prijsverschil — en het feit dat het één van de weinige gepubliceerde prijzen in de markt is — is zelf een marktsignaal: er is ruimte onder Oracle's prijspunt, en minstens één aanbieder heeft besloten dat transparantie een wapen is.

### 3.3 Typische contractwaarden

| Contract | Waarde | Bron |
|---|---|---|
| **Toronto Transit Commission — SAP EAM-implementatie** | **CAD 12,28 mln** incl. HST, 3-jarig, ingaand 1 november 2024 | Openbaar aanbestedingsdocument TTC ([zoekresultaat-synthese EAM-aanbestedingen](https://html.duckduckgo.com/html/?q=EAM+implementation+contract+value+tender)) |
| SAP-implementatie algemeen (asset management-scope) | **$75.000–$500.000** implementatiekosten | [zoekresultaat-synthese](https://html.duckduckgo.com/html/?q=SAP+S4HANA+asset+management+license+cost) **[ONZEKER]** |
| P6 EPPM Cloud instapcontract (25 seats) | **$91.500/jaar** licentie, exclusief implementatie | zie §3.2 |
| STO-suite per site | **£75.000 / $99.000 per jaar** (IAMTech; beide prijzen bij verificatie bevestigd op de eigen prijspagina) tot naar schatting **$150.000–400.000/jaar** voor Prometheus/Roser bij een grote site **[SCHATTING]** | IAMTech gepubliceerd; Prometheus-band is eigen schatting op basis van functionele breedte en het feit dat IAMTech zich expliciet als goedkoop alternatief positioneert |

De TTC-casus is het meest bruikbare openbare ijkpunt: **CAD 12,28 mln over drie jaar** voor één EAM-implementatie bij een middelgrote vervoerder. Dat is ongeveer **CAD 4 mln per jaar**, waarvan het licentiedeel typisch een minderheid is. Dit illustreert de kernverhouding in regime A: **diensten domineren, software is bijzaak.**

### 3.4 Wat de leveranciers zelf verdienen — als sanity check

| Leverancier | Cijfer | Jaar | Bron |
|---|---|---|---|
| **Hexagon Asset Lifecycle Intelligence** | **831,7 MEUR** operationele netto-omzet (2023: 782,0), organisch **+7%**; *"Enterprise Asset Management (EAM) delivered consistent double-digit SaaS growth"*, *"Project, Planning, and Execution solutions gaining momentum in the latter half of the year"* | 2024 | [Hexagon Annual and Sustainability Report 2024, p. 24](https://bynder.hexagon.com/m/3f5532e06b4faf41/original/Hexagon-Annual-and-Sustainability-Report-2024.pdf) |
| **IFS** | ARR **+23%** j-o-j, cloudomzet **+30%**, NRR **114%**, terugkerende omzet **82% van totaal**; marktwaardering **>€15 mrd** | FY2025 | [IFS via zoekresultaat](https://html.duckduckgo.com/html/?q=IFS+revenue+2025+ARR) **[ONZEKER — groeipercentages bevestigd, absolute omzet niet teruggevonden]** |
| **Prometheus Group** | Waardering **$4 mrd** (incl. schuld) bij investering van **Advent International + Leonard Green & Partners, juni 2024**; Genstar kocht in 2019 voor **>$1 mrd** van Francisco Partners; **1.000–1.232 medewerkers**; omzet **$241,5 mln** volgens Growjo | 2024–2025 | [zoekresultaat-synthese Prometheus](https://html.duckduckgo.com/html/?q=Prometheus+Group+valuation+revenue); [getlatka](https://getlatka.com/companies/prometheus-group) **[ONZEKER — Growjo en Latka zijn schattingsdiensten; Latka noemt $18,6 mln (2021) en waardering $1,5 mrd (2025), wat onverenigbaar is met de $4 mrd uit 2024. Behandel beide met wantrouwen; de $4 mrd-waardering uit de Advent-transactie is het betrouwbaarste getal.]** |
| **Naval MRO-diensten (niet software)** | **$57,5 mrd** (2025) → **$97,3 mrd** (2034), CAGR **6,1%** | 2025 | [Growth Market Reports](https://growthmarketreports.com/report/naval-ship-maintenance-repair-and-overhaul-mro-market-global-industry-analysis) |

De Hexagon-regel is analytisch de waardevolste in dit rapport: Hexagon rapporteert **EAM** en **Project, Planning and Execution** als *aparte productgebieden binnen dezelfde divisie*. Dat is een leverancier die intern precies de scheidslijn erkent die §2.3 beschrijft.

### 3.5 Betalingsbereidheid — hoog én laag in dezelfde organisatie

Dit is de meest onderscheidende bevinding over deze sector. De betalingsbereidheid is **extreem bimodaal**, en de scheidslijn loopt exact langs de regimegrens.

**Regime B — betalingsbereidheid: zeer hoog.**

De rekensom is triviaal en wordt in elke businesscase gemaakt: één dag turnaround-vertraging kost **>$1 mln** aan gederfde productie ([AMACS](https://amacs.com/turnarounds/understanding-the-differences-shutdowns-turnarounds-and-outages-in-refinery-operations/)), één dag nucleaire outage **$1–2 mln** aan vervangende stroom ([OptiScheduleAI](https://optischeduleai.com/)), één dag AOG-overschrijding *"six figures in AOG penalties"* ([OxMaint](https://oxmaint.ai/industries/aviation-management/base-maintenance-software)). Tegen die achtergrond is een sitelicentie van $100.000–400.000 per jaar een afrondingsfout. **Prijs is hier geen koopargument; risico-reductie en referenties zijn dat.** Dat verklaart waarom Oracle $305/gebruiker/maand kan vragen en waarom de STO-leveranciers geen prijzen publiceren.

**Regime A — betalingsbereidheid: laag tot matig, en structureel dalend.**

Een dag vertraging op een routinewerkorder kost niets. De ROI moet komen uit wrench-time-verbetering — reëel (25–35% → 45–55%) maar diffuus, langzaam en moeilijk aan één softwarepakket toe te schrijven. Bovendien: de EAM is er al, is afgeschreven, en de scheduler zit er tegenwoordig gratis bij (Maximo MAS 9). De CMMS-markt van $1,3–2,3 mrd wordt bediend door honderden aanbieders met prijzen vanaf enkele tientallen dollars per gebruiker per maand. **Dat is een commodity-markt.**

**De onderaannemerslaag — betalingsbereidheid: vrijwel nul.**

Steigerbouwers, isolatiebedrijven, NDO-firma's en kraanverhuurders leveren het merendeel van de manuren in regime B, maar bij £25.000/gebruiker/jaar (IAMTech individueel) of $3.660/gebruiker/jaar met 25-seat-minimum (Oracle) koopt geen van hen ooit een licentie. Zij werken in Excel en op papier. Zie §7.3.

**Samengevat:** in dezelfde raffinaderij betaalt de turnaround-afdeling zonder blikken of blozen $300.000 per jaar voor planningssoftware, terwijl de reguliere onderhoudsafdeling ernaast met een gratis Maximo-scheduler en Excel werkt, en de steigerbouwer op het terrein een geprint A3-tje heeft.

### 3.6 Implementatie- en trainingskosten

- **Implementatie-/licentieratio.** In regime A is de verhouding ongunstig voor software: de TTC-casus (CAD 12,28 mln over 3 jaar voor één EAM-programma) is overwegend dienstverlening. Voor SAP-asset-management-scope wordt **$75.000–$500.000** implementatie genoemd tegenover licentiekosten die daar een fractie van zijn **[ONZEKER]**.
- **Trainingsinfrastructuur.** In regime A bestaat een volwaardige certificeringsmarkt rond het *vak* in plaats van rond de *tool*: SMRP levert **70+ gestandaardiseerde metrics** en de CMRP-certificering; Doc Palmers handboek en cursussen zijn de facto curriculum ([Palmer Planning](https://palmerplanning.com/)). Dat is anders dan in de bouw, waar de training productgericht is (P6-cursussen).
- **P6-training** blijft in regime B de dominante kostenpost naast de licentie, met dezelfde klachten als elders: *"long training times, high costs, and legacy workflows"* (zie zusterrapport).
- **De verborgen kostenpost: master data.** Prometheus verkoopt hier een aparte productlijn voor (MDaaS, SAP MDG — [Prometheus Group](https://www.prometheusgroup.com/about)). Dat een marktleider *master data as a service* als eigen productcategorie voert, zegt alles over hoe slecht de assetdata in deze sector is — en dat is de belangrijkste faalfactor bij implementaties.

---

## 4. Hoe groot is dit segment

### 4.1 Beschikbare top-downcijfers (niet optelbaar)

| Markt | Basisjaar | Prognose | CAGR | Bron |
|---|---|---|---|---|
| **Enterprise Asset Management (software)** | **$5,87 mrd (2025)** | $9,02 mrd (2030) | **9,0%** | [MarketsandMarkets](https://www.marketsandmarkets.com/Market-Reports/enterprise-asset-management-market-97530575.html) |
| Enterprise Asset Management (alternatief) | $6,1 mrd (2025) | $17,2 mrd (2035) | 11,3% | [GM Insights](https://www.gminsights.com/) |
| **MRO-software** — *let op: M&M's rapport heet voluit "MRO Software Market **in Aviation** by End User (Operators, OEMs, MROs, Lessors)". Dit is dus géén brede onderhouds-MRO-softwaremarkt maar de luchtvaart-MRO-softwaremarkt.* | **$8,0 mrd (2025)** | $18,0 mrd (2036) | **8–10%** (impliciet uit $8,0→$18,0 over 11 jaar: **7,7%**) | [MarketsandMarkets](https://www.marketsandmarkets.com/Market-Reports/mro-software-market-166322188.html) |
| Luchtvaart-MRO-software | $7,7 mrd (2025) | $11,6 mrd (2034) | 4,7% | [GM Insights](https://www.gminsights.com/) |
| Luchtvaart-MRO-software (alternatief) | $8,14 mrd (2025) | — | — | [Fortune Business Insights](https://www.fortunebusinessinsights.com/) |
| **CMMS** — Grand View | $1,3 mrd (2024) / **~$1,44 mrd (2025)** | $2,4 mrd (2030) | 11,1% | [Grand View Research](https://www.grandviewresearch.com/) — *[gecorrigeerd bij verificatie: het eerder gebruikte "$1,6 mrd (2025)" is niet verenigbaar met GVR's eigen basis + CAGR. $1,3 mrd × 1,111 = **$1,44 mrd**. Mordor's onafhankelijk geverifieerde $1,40 mrd (2025) bevestigt de lagere waarde.]* |
| CMMS — Mordor | $1,40 mrd (2025) | $2,15 mrd (2030) | 9,0% | [Mordor Intelligence](https://www.mordorintelligence.com/) |
| CMMS — Verified Market Reports | $2,3 mrd (2025) | $7,5 mrd (2034) | 14,5% | [Verified Market Reports](https://www.verifiedmarketreports.com/) |
| **Field Service Management** | $5,37–6,84 mrd (2025) | $13,8–19,9 mrd (2033-34) | 8,9–16% | [Fortune BI](https://www.fortunebusinessinsights.com/), [Grand View](https://www.grandviewresearch.com/), [Mordor](https://www.mordorintelligence.com/) |
| **Naval MRO — diensten (geen software)** | $57,5 mrd (2025) | $97,3 mrd (2034) | 6,1% | [Growth Market Reports](https://growthmarketreports.com/report/naval-ship-maintenance-repair-and-overhaul-mro-market-global-industry-analysis) |

**De spreiding is het verhaal.** Voor de CMMS-markt alleen al lopen de schattingen voor hetzelfde jaar 2025 uiteen van **$1,40 mrd tot $2,3 mrd** — een factor 1,6 — en de CAGR's van 6,73% tot 14,5%. Elke sizing die één van deze getallen als waarheid neemt, is bedrog. Ik gebruik ze uitsluitend als bandbreedte-controle op een bottom-upberekening.

### 4.2 Bottom-upsizing van het deel dat écht scheduling-software is

Dit is de kern van de opdracht. **Alle onderstaande stappen zijn [SCHATTING] tenzij een bron is genoemd.**

#### Stap 1 — Aantal sites in regime B (evenement-gedreven CPM-planning)

| Sitetype | Aantal wereldwijd | Basis |
|---|---|---|
| Raffinaderijen | **825** **[ONZEKER]** | [zoekresultaat-synthese](https://html.duckduckgo.com/html/?q=number+of+refineries+worldwide+2025) — actieve ruwe-olieraffinaderijen, begin 2025. *Bij verificatie niet uit een primaire bron te bevestigen (Wikipedia geeft alleen capaciteit en VS-tellingen; IAEA/EIA-pagina's niet toegankelijk). Gepubliceerde tellingen lopen uiteen van ~620 tot ~840 afhankelijk van de ondergrens in doorvoercapaciteit. Behandel 825 als bovengrens, niet als gedocumenteerd feit.* |
| Grote chemische/petrochemische complexen | ~2.000 | [SCHATTING] |
| Grote thermische energiecentrales | ~3.000 | [SCHATTING] |
| Nucleaire sites | ~200 | [SCHATTING], ca. 440 reactoren op ~200 locaties |
| Grote mijnen/smelters met shutdown-regime | ~1.500 | [SCHATTING] |
| Papier, staal, cement, aluminium, LNG | ~2.000 | [SCHATTING] |
| Luchtvaart-basisonderhoudsstations (heavy check) | ~300 | [SCHATTING] |
| Marine-/defensiewerven en depots | ~150 | [SCHATTING] |
| Spoordepots met revisiecapaciteit | ~500 | [SCHATTING] |
| **Totaal** | **≈ 10.500 sites** | |

#### Stap 2 — CPM-planner-seats

- Owner-zijde: gemiddeld **3 CPM-capabele planner-seats per site** → 10.500 × 3 ≈ **31.500 seats**.
- Contractantenzijde (turnaround-contractors, MRO-dienstverleners, werven, engineeringbureaus): historisch ongeveer **2× de owner-zijde**, omdat één contractor meerdere klanten bedient en elke klant zijn eigen omgeving eist → **63.000 seats**.
- **Totaal ≈ 94.500 CPM-seats in onderhoudsevenement-planning.** [SCHATTING] *[gecorrigeerd bij verificatie: 31.500 + 63.000 = 94.500; eerder stond hier afgerond "≈ 90.000", een onderschatting van 4,8%. De exacte sitesom is 10.475, niet 10.500.]*

*Kruiscontrole:* dit is consistent met de afleiding in §2.3 (16.000–100.000 mensen die CPM-planning doen aan onderhoudswerk). 94.500 zit tegen de bovengrens van die band aan. **Zwakte van deze kruiscontrole:** een seat-telling kan alleen hoger uitvallen dan een personentelling als personen meerdere omgevingen hebben; hier wordt zowel de bovengrens van de personenband als een seat-multiplier gebruikt, wat de twee schattingen niet onafhankelijk maakt.

#### Stap 3 — Licentie-omzet regime B

- **CPM-licenties.** Lijstprijs P6 EPPM Cloud is $305/gebruiker/maand = $3.660/jaar, maar grote afnemers onderhandelen fors en een deel draait nog op afgeschreven perpetual P6 Professional met onderhoud. Realistische gerealiseerde prijs per seat: **$2.500–4.000/jaar**, midden **$3.250**.
  → 94.500 × $3.250 ≈ **$307 mln/jaar** *(met de eerder gebruikte 90.000 seats: $293 mln)*.
- **STO-/outage-orkestratielaag.** Van de 10.500 sites koopt naar schatting **20–30%** een gespecialiseerde suite (de rest doet het met P6 + Excel + de EAM). Dat is **2.100–3.150 sites**. Prijs per site: gepubliceerd ijkpunt **$99.000** (IAMTech's eigen USD-prijslijst, 1 locatie; £75.000 is de GBP-variant) tot geschat $150.000–400.000 (Prometheus/Roser bij grote sites); gewogen gemiddelde **$110.000/jaar**.
  → 2.600 × $110.000 ≈ **$286 mln/jaar**.
  **Kritiek bij verificatie:** een gewogen gemiddelde van $110.000 impliceert dat ~93% van de kopers op het IAMTech-prijspunt ($99.000) zit en slechts ~7% op de geschatte $150.000–400.000-band. Dat is niet plausibel, want IAMTech positioneert zichzelf juist als de goedkope uitdager met een kleine installed base. Een realistischer weging (70% × $99k + 30% × $250k) geeft **$144.000/site** → 2.600 × $144.000 ≈ **$375 mln/jaar**. **Component C is dus vermoedelijk een ondergrens; band $230–475 mln in plaats van een punt op $286 mln.**
- **Subtotaal regime B software: ≈ $580–680 mln/jaar (band $450–800 mln).** [SCHATTING]

#### Stap 4 — Het scheduling-deel van regime A

De EAM-markt is $5,87 mrd (2025, [MarketsandMarkets](https://www.marketsandmarkets.com/Market-Reports/enterprise-asset-management-market-97530575.html) — bij verificatie letterlijk bevestigd) en de CMMS-markt ongeveer **$1,40–1,44 mrd** (Mordor 2025 geverifieerd: $1,40 mrd; Grand View-consistent: $1,44 mrd). Samen ≈ **$7,3 mrd** *[gecorrigeerd van $7,5 mrd; de eerder gebruikte CMMS-waarde van $1,6 mrd was te hoog]*. **Tweede voorbehoud bij verificatie:** CMMS is grotendeels een deelverzameling van EAM — de kruiscontrole in §4.2 past juist wél een overlapcorrectie van 25–35% toe, maar hier wordt zonder correctie opgeteld. Consistent doorgevoerd zou de basis eerder $6,3–6,8 mrd zijn. Daarvan is de *planning- en schedulingfunctie* — grafische scheduler, capaciteitsplanning, ploegtoewijzing, weekschema, backlogbeheer — typisch **10–20%** van de functionele footprint. [SCHATTING, gebaseerd op modulaire prijsopbouw: bij Maximo is scheduling inmiddels in de basis opgenomen; bij SAP is MRS/Prometheus een aparte aankoop; bij de meeste CMMS'en is de scheduler één van vijf à tien kernmodules.]

→ **$0,73–1,46 mrd/jaar**, midden **≈ $1,1 mrd** (met overlapcorrectie op de basis: $0,63–1,36 mrd, midden ≈ $1,0 mrd). De oorspronkelijke band $0,75–1,5 mrd blijft binnen de afrondingsmarge overeind.

Belangrijk: dit is **géén CPM-scheduling**. Het is capaciteitsscheduling. Voor een CPM-tool is dit segment functioneel niet adresseerbaar zonder een fundamenteel ander product te bouwen.

#### Stap 5 — Totaal en interpretatie

| Component | Omvang 2025 [SCHATTING] | CPM-vormig? | Adresseerbaar voor een CPM-planner? |
|---|---|---|---|
| **A.** Scheduling-functie binnen EAM/CMMS (regime A) | **$0,73–1,46 mrd** | Nee | Nee |
| **B.** CPM-licenties voor onderhoudsevenementen | **$0,31 mrd** (band $0,24–0,38) | **Ja** | **Ja** |
| **C.** STO-/outage-orkestratielaag | **$0,29–0,38 mrd** (band $0,23–0,48) | Deels | Deels |
| **Totaal "onderhoudsgerelateerde planningssoftware"** | **$1,3–2,3 mrd/jaar** | | |
| **Waarvan CPM-vormig, strikt (B + het CPM-deel van C)** | **$0,35–0,65 mrd/jaar** | | |
| **Waarvan CPM-vormig, ruim (B + heel C)** | **$0,55–0,85 mrd/jaar** | | |

*[Aangepast bij verificatie. Drie correcties: (1) B loopt van $293 mln naar $307 mln door de seat-som (94.500 in plaats van 90.000); (2) C is vermoedelijk onderschat, zie de kritiek bij stap 3; (3) de eerdere regel "waarvan CPM-vormig $0,45–0,75 mrd" telde component C **volledig** mee terwijl de tabel diezelfde component als slechts "deels" CPM-vormig markeert. Dat is een interne tegenspraak. Daarom staan er nu een strikte en een ruime variant.]*

**Kruiscontrole top-down — en waarom die zwakker is dan hij lijkt.** De unie van EAM ($5,87 mrd), CMMS ($1,4 mrd) en MRO-software ($8,0 mrd) bedraagt nominaal $15,3 mrd, maar deze definities overlappen zwaar. Dat de M&M-"MRO-softwaremarkt" bij verificatie voluit *"MRO Software Market **in Aviation**"* blijkt te heten, bevestigt de vermoede overlap met de luchtvaart-MRO-softwaremarkt van $7,7 mrd (GM Insights): dat zijn dezelfde $8 mrd, twee keer gemeten door twee bureaus — niet twee markten. Na een overlapcorrectie van **25–35%** [SCHATTING] resteert een reële unie van **$10–11,5 mrd**. Als 8–15% daarvan schedulingfunctionaliteit is, geeft dat **$0,8–1,7 mrd**.

> **⚠ Deze kruiscontrole is grotendeels circulair en mag niet als onafhankelijke bevestiging worden gepresenteerd.** Component A — 55–70% van de bottom-upuitkomst — is zelf berekend als (EAM + CMMS) × 10–20%. De "top-down" controle is (EAM + CMMS + luchtvaart-MRO) × 8–15% na overlapcorrectie. Zelfde invoergetallen, vrijwel hetzelfde percentage. De twee methoden kúnnen niet anders dan overeenkomen. Alleen componenten B en C (samen $0,6–0,7 mrd) zijn werkelijk bottom-up afgeleid uit sitetellingen en gepubliceerde prijzen; die zijn niet door de top-down gecontroleerd. *[toegevoegd bij verificatie]*

**Diensten.** Als de rest van dit onderzoek geldt (software is 5–20% van de totale planningskosten in deze sector), dan hangt aan die $1,3–2,3 mrd software een dienstenmarkt van **$5–40 mrd** aan planners, implementatie, integratie, schema-audits en training. *[gecorrigeerd bij verificatie — hier stond "$5–20 mrd", een rekenfout. Bij een softwareaandeel van 5% is de totale markt $26–46 mrd en de dienstencomponent $25–44 mrd; bij 20% is die $5,2–9,2 mrd. De bovengrens lag dus twee keer te laag.]* Voor een open-source-strategie is dát het geld — niet de licentie. Zie §7.

### 4.3 Groeirichting

**Richting: gestaag omhoog, ~7–9% per jaar voor het segment als geheel, maar met verschuivende samenstelling.**

*[gecorrigeerd bij verificatie — hier stond "8–11% per jaar". Dat is niet verenigbaar met de eigen samenstelling: als component A (55–70% van het totaal) met 9–11% groeit en de componenten B+C (30–45%) met 4–7%, dan is het gewogen gemiddelde 7,2–9,2%. Een totaalgroei van 11% is rekenkundig onbereikbaar zolang bijna de helft van het segment op 4–7% zit. De 8–11% is de groei van de EAM/CMMS-deelmarkten, niet van het segment dat dit rapport afbakent.]*

- EAM groeit met **9,0%** (MarketsandMarkets) tot **11,3%** (GM Insights) per jaar; CMMS met **9–11%**; MRO-software met **8–10%**.
- **De groei zit in SaaS, niet in nieuwe zitplaatsen.** Hexagon rapporteert voor ALI *"an increase in SaaS-related revenues, which supported double-digit growth in recurring revenues"* bij slechts 7% organische groei totaal ([Hexagon 2024, p. 24](https://bynder.hexagon.com/m/3f5532e06b4faf41/original/Hexagon-Annual-and-Sustainability-Report-2024.pdf)). IFS rapporteert ARR **+23%** en cloud **+30%** met terugkerende omzet op **82% van het totaal**. Dat is migratie van bestaande klanten, niet marktverbreding.
- **AI en optimalisatie zijn de actieve overnamerichting.** Prometheus kocht Actenum (AI-scheduling/optimalisatie) in **december 2025** ([Automation.com](https://www.automation.com/article/prometheus-group-acquires-actenum)) en positioneert GWOS-AI als *"trained on over 20 years of real-world maintenance data"* ([Prometheus Group](https://www.prometheusgroup.com/solutions/planning-and-scheduling)). Waar de bouw AI-planning nog als experiment behandelt, wordt het in onderhoud al als kernproduct verkocht — omdat het probleem (capaciteitsoptimalisatie onder constraints) veel beter past bij wat optimalisatie-algoritmen kunnen.
- **De regime-B-kant groeit langzamer dan regime A.** Het aantal raffinaderijen daalt in het Westen; de energietransitie sluit kolencentrales. Tegelijk groeit naval MRO met **6,1%** ([Growth Market Reports](https://growthmarketreports.com/report/naval-ship-maintenance-repair-and-overhaul-mro-market-global-industry-analysis)) op stijgende defensiebudgetten, en groeit de luchtvaartvloot structureel. Netto **[SCHATTING]: regime B groeit met 4–7% per jaar**, langzamer dan het marktgemiddelde.
- **Kapitaalconcentratie is hoog en stijgt.** Prometheus Group werd in juni 2024 gewaardeerd op **$4 mrd** bij de investering van Advent International en Leonard Green & Partners, na eerder **>$1 mrd** (Genstar, 2019) — een viervoudiging in vijf jaar. Hexagon bereidt bovendien een afsplitsing van ALI naar een aparte beursnotering voor ("NewCo"). Deze markt wordt actief geconsolideerd door private equity.

---

## 5. Sectorspecifieke eisen en standaarden

### 5.1 Wat hier *niet* geldt — en dat is nieuws

Een belangrijke bevinding: **EVMS/EIA-748 en DCMA 14-point zijn in deze sector veel minder universeel dan in aerospace/defensie of grote overheidsbouw.**

- **EVMS-drempels.** De **geldende DFARS-tekst zelf** ([DFARS 234.201, deel 234](https://www.acquisition.gov/dfars/part-234-major-system-acquisition)) noemt twee drempels: bij kosten- of incentive-contracten van **$20 mln of meer** moet het EVMS voldoen aan ANSI/EIA-748; bij **$50 mln of meer** moet dat systeem bovendien door het bevoegde federale agentschap **formeel compliant zijn verklaard**. Onder $20 mln is toepassing optioneel en risicogebaseerd, met motivering in het contractdossier; bij firm-fixed-price wordt EVMS ontraden, ongeacht bedrag. **[GECORRIGEERD bij verificatie — hier stond eerder dat de compliance-drempel $100 mln is en "verhoogd van $50 mln naar $100 mln". De DFARS-tekst zegt $50 mln. De $100 mln komt uit een DoD-klassedeviatie die ik niet uit een primaire bron heb kunnen bevestigen (de Humphreys-pagina gaf HTTP 403). Behandel $100 mln daarom als ONZEKER; $20 mln en $50 mln zijn bevestigd.]**
- **Gevolg:** een routinematige onderhoudsafdeling raakt EVMS nooit. Een turnaround van $50 mln bij een private raffinaderij ook niet — daar geldt geen DFARS. **EVMS bijt in deze sector vrijwel uitsluitend bij defensie-MRO** (naval availabilities, depot-onderhoud aan vliegtuigen) en bij grote gereguleerde nutsprojecten.
- **DCMA 14-point** wordt in de private onderhoudswereld gebruikt als *vrijwillige* schemakwaliteitscheck, niet als contractuele verplichting. De implementatie ervan is bovendien **niet gecertificeerd**: *"The implementation of the DCMA 14-Point Assessment in the various software tools is not certified by the DCMA or any other body and varies between the tools"* ([Mosaic Projects, WP1088](https://mosaicprojects.com.au/WhitePapers/WP1088_DCMA-14-Point.pdf)). Volledige drempelwaarden staan bij [ScheduleReader](https://schedulereader.com/dcma-14-point-assessment-project-schedule-quality-analysis/), [ScheduleLens](https://schedulelens.com/blog/dcma-14-point-assessment/) en [Ten Six](https://tensix.com/wp-content/uploads/2025/02/Ten-Six-An-Introduction-to-the-DCMA-14-Point-Assessment-Guidelines-eBook.pdf).

### 5.2 Wat hier wél hard geldt — NAVSEA Standard Item 009-111

Dit is het meest concrete, meest verifieerbare voorbeeld van een **contractueel voorgeschreven CPM-onderhoudsschema** dat ik in dit onderzoek heb gevonden. NAVSEA Standard Item **009-111 (FY-24, gedateerd 25 oktober 2022)**, getiteld *"Schedule and Associated Reports for non-CNO Availabilities; provide and manage"* ([NAVSEA 009-111 FY24, PDF](https://www.navsea.navy.mil/Portals/103/Documents/SSRAC/NSI/FY24/009-111_FY24_pkg.pdf)).

**Wat het voorschrijft — letterlijk:**

- **Een Integrated Production Schedule (IPS)**, gedefinieerd als *"A schedule used by the contractor as a means of planning, tracking, coordinating and de-conflicting work during the availability. […] An IPS connects all the scheduled work of the government and the contractor in a network, or collection of logically linked sequences of activities."* (§4.1.3)
- **Volledige netwerklogica, verplicht.** *"Every Activity and Event in the Total Project Network must have at least one Predecessor (except Start Availability)"* en idem voor Successor (Tabel 1). Dat is DCMA-checkpunt 1 als contractuele eis.
- **Critical Path Method, expliciet gedefinieerd:** *"The critical path method is used to derive the critical activities—that is, activities that cannot be delayed without delaying the end date of the program. The amount of time an activity can slip before the program's end date is affected is known as 'total float.' […] identifies the Critical Path to each Key Event and Milestone using **automated Network Analysis Tools**."* (§4.1.1)
- **En een expliciete waarschuwing over schemakwaliteit:** *"Unless the IPS represents the entire scope of effort and the effort is correctly sequenced through network logic, the scheduling software will report an incorrect or invalid critical path."* (§4.1.1)
- **Verplichte datavelden** (Tabel 1): Work Item Number, Title, Key Event, Milestone, System, Component, Location, Executing Activity, **Early Start** (*"Software determined date"*), **Early Finish** (*"Software determined date"*), Actual Start, Actual Finish, Percent Complete, Duration, **Calendar Identification** (*"Number of scheduled workdays per week"*), **Total Float**, Predecessor, Successor, Constraints.
- **Gedefinieerde begrippen** die één-op-één de CPM-primitieven zijn: Total Float (4.1.10), Negative Float (4.1.18), Logic Relationship (4.1.11), Baseline Start/Finish (4.1.12), Early Start/Finish (4.1.15/16), **Hard Constraint** (4.1.19: *"Must Start On (MSO) or Must Finish On (MFO) […] Hard Constraints prevent their associated activity from being logic-driven"*), **Lags en Leads** (4.1.20, met de waarschuwing dat *"Improper and overuse of Lags and Leads can have a detrimental effect on a logic driven schedule and adversely affect float and the Critical Path"*).
- **Wekelijkse actualisatie** op Work Activity-niveau, inclusief werkelijke start-/einddatums en voortgang gebaseerd op *"degree of completion of physical work"* (§3.2), plus wekelijkse voortgangsvergadering waarin *"Critical Path and Controlling Work Items"* moeten worden behandeld (§3.3.1).
- **Controlling Work Items** (4.1.9): werkposten op het kritieke pad met significant impactpotentieel — een sectorspecifiek begrip dat P6 niet native kent.

**En nu het opvallendste — het leveringsformaat.** Tabel 2 van 009-111 schrijft voor het initiële IPS én het wekelijkse statusrapport voor:

> Format: **`.xls` of `.pdf` of native format`**

**Er wordt géén XER, géén P6 XML en géén specifiek pakket geëist.** Dit is een contractueel voorgeschreven, volwaardig CPM-schema met total float, netwerk­logica en wekelijkse audit — dat in Excel mag worden opgeleverd. Voor een open, niet-P6 planner is dit een van de weinige gedocumenteerde openingen in de hele markt waar de deur formeel openstaat. Zie §7.4.

*(Kanttekening: 009-111 geldt voor **non-CNO availabilities**. De grote CNO-availabilities kennen zwaardere regimes; de bredere kaders zijn NAVSEA-instructie **4850.10a**, die *"baselines current scheduling practices and establishes uniform requirements for scheduling work on naval vessels in Naval Shipyards"* ([GlobalSpec](https://standards.globalspec.com/std/513635/navsea-4850-10a)), en de DoD **IMP/IMS Guide 2023** ([ac.cto.mil](https://ac.cto.mil/wp-content/uploads/2023/05/IMP-IMS-Guide-2023.pdf)). **[ONZEKER — ik heb niet kunnen verifiëren of CNO-availabilities wél een specifiek bestandsformaat eisen.]**)*

### 5.3 ISO 55000/55001 — asset management als managementsysteem

**ISO 55001:2024** is de certificeerbare eisenstandaard voor assetmanagementsystemen en *"specifies requirements for the establishment, implementation, operation, maintenance and improvement of a management system for asset management"*; ISO 55000 levert terminologie en overzicht. De editie van 2024 verving die van 2014. Certificering gebeurt via externe audits door geaccrediteerde instanties (bijv. TÜV NORD), waarbij onder meer wordt getoetst op documentatie van assetmanagementprocedures, implementatie van **onderhoudsplanningsprocessen**, systeemwerking en continue verbetering ([zoekresultaat-synthese ISO 55001](https://html.duckduckgo.com/html/?q=ISO+55000+55001+asset+management+standard+certification)).

**Wat dit betekent voor software:** ISO 55001 schrijft **geen tool en geen formaat voor**. Het eist aantoonbaarheid: dat er een planningsproces is, dat het wordt gevolgd, en dat de uitkomsten worden geëvalueerd. Dat is een *auditspoor*-eis, geen CPM-eis. Voor een planningstool is de relevante consequentie: **versiebeheer, herleidbaarheid en reproduceerbaarheid van schema's zijn certificeringsrelevant** — precies waar een tekstueel, diffbaar bestandsformaat structureel in het voordeel is boven een binaire database.

In gereguleerde nutssectoren (water, energie, spoor in het VK) werkt ISO 55001/PAS 55 door in het toezichtregime en daarmee in de investeringsonderbouwing richting toezichthouders. **[ONZEKER — ik heb dit in dit onderzoek niet met primaire Ofwat/Ofgem-bronnen kunnen staven.]**

### 5.4 Luchtvaart — het zwaarste regelregime van allemaal

- **EASA Part-145** (onderhoudsorganisatie) en **Part-M / Part-CAMO** (continuing airworthiness) staan in **Verordening (EU) nr. 1321/2014**, aangevuld met AMC- en GM-documenten ([EASA](https://www.easa.europa.eu/)). Part-145-houders moeten technische administratie voeren en personeelscompetentie aantoonbaar maken.
- **MSG-3** is de methodologie van Airlines For America voor het afleiden van geplande onderhoudstaken en -intervallen, *"which will be acceptable to the regulatory authorities, the operators, and the manufacturers"*. Het resultaat landt in het **Maintenance Planning Document (MPD)** en het **Maintenance Review Board Report (MRB)**.
- **Betrouwbaarheidsprogramma verplicht** wanneer het onderhoudsprogramma op MSG-3-logica is gebaseerd, condition-monitored componenten bevat, geen overhaul-intervallen voor alle significante systeemcomponenten kent, of wanneer de fabrikant het voorschrijft ([EASA-richtsnoer via zoekresultaat](https://html.duckduckgo.com/html/?q=EASA+Part-145+MSG-3+maintenance+programme)).

**Consequentie voor planningssoftware:** in de luchtvaart is het *onderhoudsprogramma* zelf een goedgekeurd, gereguleerd document. De planningssoftware moet aantoonbaar de goedgekeurde taken en intervallen uitvoeren, met volledige traceerbaarheid per onderdeel en per vliegtuigserienummer. **Dit is een gesloten markt.** Een generieke CPM-planner kan hier de checkuitvoering ondersteunen, maar nooit het airworthiness-systeem vervangen. Dat verklaart de dominantie van geïntegreerde suites (AMOS, Maintenix, eMRO) boven losse schedulers.

### 5.5 AACE-praktijken die specifiek voor deze sector zijn geschreven

- **AACE RP 112R-20 — *Cost Estimate Classification System … as Applied for Maintenance Turnaround Work***: een eigen ramingsklassificatiestelsel voor turnarounds, met klassen en nauwkeurigheidsbanden gekoppeld aan scope-rijpheid ([AACE, inhoudsopgave PDF](https://web.aacei.org/docs/default-source/toc/toc_112r-20.pdf)). Het bestaan van een aparte RP *alleen voor turnarounds* is zelf het bewijs dat de sector zijn eigen praktijk heeft.
- **AACE RP 29R-03 — *Forensic Schedule Analysis***: *"provide a unifying reference of basic technical principles and guidelines for the application of critical path method (CPM) scheduling in forensic schedule analysis"*, met negen geclassificeerde analysemethoden ([29R-03](https://www.29r-03.com/About29R03)).

### 5.6 Claim- en forensische analyse in onderhoudscontext

De claimdynamiek verschilt fundamenteel van de bouw:

- **Bij owner-operators (regime A en de meeste turnarounds) is er geen tegenpartij.** Het productieverlies is voor eigen rekening. Er wordt niet geclaimd; er wordt geëvalueerd. Dat verlaagt de eis aan bewijskrachtige schema-archivering aanzienlijk ten opzichte van de bouw.
- **Bij uitbesteed MRO en defensiewerk is er wél een tegenpartij**, en daar gelden de gebruikelijke instrumenten: windows-analyse, concurrent delay, en het schema als contemporain bewijsstuk. NAVSEA 009-111 is hier het voorbeeld: het wekelijkse geactualiseerde IPS met werkelijke datums, voortgang en total float is per constructie een forensisch dossier.
- **De ISO 55001-auditlijn is de facto de vervanger van de claimlijn** in de owner-operatorwereld: niet "wie is aansprakelijk", maar "kunt u aantonen dat uw proces werkte".

### 5.7 Verplichte leveringsformaten — de samenvatting

| Context | Verplicht formaat | Bron |
|---|---|---|
| Routine-onderhoud (regime A) | **Geen.** Het formaat is de EAM-database. | — |
| Turnaround, private owner-operator | **De facto P6/XER**, contractueel afgedwongen door de owner, niet door een norm | zusterrapport O&G |
| NAVSEA non-CNO availability | **`.xls` of `.pdf` of native format** — géén pakketeis | [NAVSEA 009-111](https://www.navsea.navy.mil/Portals/103/Documents/SSRAC/NSI/FY24/009-111_FY24_pkg.pdf), Tabel 2 |
| DoD-contracten >$20 mln (cost/incentive) | EIA-748-conform EVMS; IMS conform IMP/IMS Guide | [DFARS 234.201](https://www.acquisition.gov/dfars/234.201-policy) |
| Luchtvaart | Geen schemaformaat; wél goedgekeurd onderhoudsprogramma (MPD/MRB) en traceerbare records | EASA Reg. (EU) 1321/2014 |
| Assetdata-overdracht bouw→beheer | **COBie / IFC** (ISO 19650-3) | zie §7.5 |
| Procesindustrie assetdata | **CFIHOS / ISO 15926** — *niet* IFC | zusterrapport O&G |

---

## 6. Voor- en nadelen van de gebruikte pakketten in déze sectorcontext

### 6.1 SAP PM / S/4HANA Asset Management

**Werkt hier goed:** het is de plek waar de werkorder, de kostenplaats, het materiaal, de inkoop en de assetstamdata al samenkomen. Dat is geen kleinigheid — de integratie met inkoop en voorraad is precies wat de grootste oorzaak van niet-uitvoerbaar werk (materiaal) adresseert. Onbetwiste positie als systeem van waarheid; als de fabriek op SAP draait, draait het onderhoud op SAP PM.

**Wringt hier:**
- **Geen kritieke-padanalyse en geen serieuze Gantt.** *"SAP PM excels at managing maintenance master data, work order workflows, and cost tracking. However, it has significant limitations when optimizing complex schedules with thousands of interdependent operations"* ([OptiScheduleAI](https://optischeduleai.com/)). Op de SAP Community wordt al jaren gevraagd naar een *"Gantt chart/Graphical tool for PM order scheduling"* — een erkende functionele leemte ([SAP Community](https://community.sap.com/)).
- **Gevolg: een hele industrie van schillen.** Prometheus Group — waardering **$4 mrd** — bestaat in wezen omdat SAP PM geen goede planner heeft. Dat is een opmerkelijk oordeel over het basisproduct.
- **Planners vluchten naar Excel.** *"Planners spending more time in Excel than SAP"*; organisaties draaien *"heavily configured and manual process in Excel"* ([zoekresultaat-synthese](https://html.duckduckgo.com/html/?q=SAP+PM+scheduling+frustration+Excel)).
- Oracle biedt zelfs een kant-en-klare brug: *"Project Integration Framework-enabled two-way integrations between Primavera P6, SAP Project System (PS), and SAP Plant Maintenance (PM) are prebuilt and available out of the box"* ([Oracle](https://docs.oracle.com/)). Dat een concurrent een officiële koppeling levert om SAP's planningsgat te dichten, is veelzeggend.

### 6.2 IBM Maximo Application Suite

**Werkt hier goed:** functioneel breed en diep in werkbeheer en uitvoering; leider in Verdantix Green Quadrant EAM 2024; sterke positie in nutsbedrijven, transport, defensie en facility. Het AppPoints-model laat organisaties *"pay for the functionality they access rather than a flat per-user rate"* — gunstig bij veel gelegenheidsgebruikers, wat in onderhoud de normale situatie is. En sinds MAS 9 zit **Scheduler in het Maintenance/Essentials-pakket** (*"MAS Scheduler included"*, bevestigd op [IBM's prijspagina](https://www.ibm.com/products/maximo/pricing)), wat de drempel voor grafische onderhoudsplanning aanzienlijk verlaagt.

**Wringt hier:**
- **Usability van de scheduler.** Gebruikers rapporteren *"several issues with usability"* bij de Maximo Scheduler en beschrijven de interface als traag en omslachtig; teams wijken uit naar Graphical Scheduling/Graphical Assignment of naar externe optimalisatietools ([zoekresultaat-synthese Maximo-klachten](https://html.duckduckgo.com/html/?q=Maximo+scheduler+complaints+usability)).
- **Zwakke supply-chain-kant.** Een Maximo-gebruiker: Maximo blinkt uit in *"work management and execution but on the supply chain side it is weak and generally requires some enhancements to fit your needs"*. In onderhoud is materiaalbeschikbaarheid dé bottleneck, dus dit raakt de kern.
- **Prijstransparantie is half.** IBM publiceert instapprijzen maar bewust **niet de prijs per AppPoint** — je kunt de eigen situatie dus niet doorrekenen zonder IBM te bellen.
- **Geen CPM.** Zoals SAP PM: het is een werkbeheersysteem, geen netwerkplanner.

### 6.3 Prometheus Group (GWOS-AI, STO-AI Manager, Actenum DSO)

**Werkt hier goed:** vult precies het gat dat SAP en Maximo laten vallen, en doet dat native op alledrie de grote EAM's (SAP ECC/S4, Oracle, IBM Maximo). Functioneel compleet voor het onderhoudswerkproces: Graphical Scheduler met drag-and-drop en real-time resourcezicht, Shift Updater, Work Package Manager, Order Planner, Material Shopping Cart, plus add-ons voor materiaalbeschikbaarheid (MAC), preventief onderhoud (PMM) en shutdowns/turnarounds (+STO) ([Prometheus Group](https://www.prometheusgroup.com/solutions/planning-and-scheduling)). Referenties van het hoogste kaliber: PepsiCo, Goodyear, Rio Tinto, Marathon, Bayer, Saudi Aramco, BASF, ExxonMobil, NASA. AI is hier geen marketing maar een productlijn: GWOS-AI is *"trained on over 20 years of real-world maintenance data"*, en met Actenum (dec. 2025) is echte combinatorische optimalisatie toegevoegd.

**Wringt hier:**
- **Het is een portfolio, geen product.** Negen modules over vier gebieden (Maintenance & Logistics, Capital Project Management, Master Data Management, EHS) ([Prometheus Group](https://www.prometheusgroup.com/about)), grotendeels bijeengekocht: Roser, WorkTech, Atonix, NiSoft, Webalo, Actenum. Kopers krijgen integratieschuld die als platform wordt verkocht.
- **Vereist een zware ERP-investering.** Zonder SAP PM of Maximo eronder verliest het pakket het grootste deel van zijn waarde.
- **Volledige prijsondoorzichtigheid.** Geen enkele gepubliceerde prijs, in een markt waar een concurrent openlijk beweert dat leveranciers *"charge you as much as they think you can afford"* ([IAMTech](https://www.iamtech.com/knowledge/3-key-questions-to-ask-when-choosing-your-sto-turnaround-shutdown-outage-software-solution)).
- **Nog steeds geen CPM-vervanger.** Ook met Actenum blijft P6 in regime B de contractuele rekenmotor. Prometheus is de schil, niet het schema.

### 6.4 Oracle Primavera P6 — in onderhoudscontext

**Werkt hier goed:** schaalt naar zeer grote netwerken (10.000+ activiteiten); uur- en ploegkalenders; meerdere baselines; activity codes en UDF's voor craft- en unitcodering; contractueel geaccepteerd door alle partijen, inclusief defensie. Voldoet ruim aan elk dataveld dat NAVSEA 009-111 eist. Het forensische werkpaard.

**Wringt hier — en in onderhoud harder dan in de bouw:**
- **Prijs per seat blokkeert veldgebruik volledig.** $305/gebruiker/maand met 25-seat-minimum is onverenigbaar met een onderhoudsorganisatie waar honderden mensen incidenteel iets moeten zien. Het schema blijft op kantoor; het veld krijgt PDF's.
- **Kent het onderhoudsdomein niet.** Geen werkorders, geen assets, geen PM-routines, geen vergunningen, geen isolaties, geen materiaalkoppeling, geen craftcertificeringen. Alles wat onderhoud daadwerkelijk stuurt zit erbuiten.
- **Het samenstellen van een ploegoverdrachtsrapport kost 30–60 minuten per keer** uit een live P6-schema — het verkoopargument van Prometheus zelf, letterlijk: *"Generate a complete shift handover report from the live P6 schedule in seconds, instead of 30-60 minutes"* ([Prometheus Group](https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage), bij verificatie woordelijk bevestigd). Bij twee ploegwissels per dag over 30 dagen is dat 30–60 uur plannerstijd in de duurste periode van de vijfjaarscyclus. *[preciezer geformuleerd bij verificatie: het gaat om het genereren van het rapport, niet om de ploegoverdracht zelf.]*
- **Uren-versus-dagen-mismatch binnen dezelfde organisatie**: turnarounds in uren, kapitaalprojecten in dagen, routine-onderhoud helemaal niet in P6.
- **Volledig ongeschikt voor regime A.** Niemand plant 40.000 werkorders per jaar in P6, en dat is terecht.

### 6.5 IFS Cloud

**Werkt hier goed:** een van de weinige leveranciers die EAM, field service, projectbeheer én sectorspecifieke MRO (Maintenix voor luchtvaart & defensie) in één portfolio heeft. Sterk in spoor/transit: *"asset-centric Enterprise Asset Management platform designed specifically for rail and transit complexity"*, met infrastructuurlevenscyclus, kapitaalplanning en personeelscoördinatie in één. Commercieel de sterkste momentumkant van de markt (ARR +23%, cloud +30%, NRR 114%, waardering >€15 mrd).

**Wringt hier:** kleinere installed base dan SAP/IBM in de zware procesindustrie; migratie naar IFS Cloud is voor bestaande klanten een grote operatie; en ook hier geldt dat de projectplanningskant het niet wint van P6 waar contractueel P6 wordt geëist.

### 6.6 Hexagon ALI (EAM + EcoSys + O&M)

**Werkt hier goed:** de enige leverancier die EAM, Operations & Maintenance én "Project, Planning and Execution" onder één divisiedak aanbiedt — precies de drie regimes uit §1.2. EcoSys is de sterkste STO-**portfolio**laag voor concerns met een meerjarig, meersite-programma. Commercieel gezond: **831,7 MEUR** in 2024, organisch +7%, dubbelcijferige SaaS-groei in EAM.

**Wringt hier:** zwaar, duur, lange implementaties; overkill voor één site; en de aangekondigde afsplitsing van ALI naar een aparte beursnotering creëert leveranciersonzekerheid bij meerjarige contracten.

### 6.7 Luchtvaart-MRO-suites (AMOS, Maintenix, eMRO, Ramco)

**Werkt hier goed:** ze zijn het enige antwoord op de regelgeving. Volledige airworthiness-traceerbaarheid per onderdeel en serienummer, MPD/MSG-3-taakbeheer, betrouwbaarheidsprogramma's, Part-145-conforme administratie. Zonder dit mag je het vliegtuig niet vrijgeven. Mobiele uitvoering aan het vliegtuig is bij AMOS standaard.

**Wringt hier:**
- **Scheduling is de zwakke broeder.** Veelzeggend: op de eigen AMOS-productpagina wordt planning en scheduling **niet als aparte module uitgelicht** — het verdwijnt in *"maintenance, engineering and logistics processes"* ([Swiss-AS](https://www.swiss-as.com/)). Voor de zware check zelf wijken MRO's uit naar MS Project of P6.
- **Het gat wordt door derden gevuld**, wat het bestaan ervan bewijst: EXSYN verkoopt een aparte app puur voor grondtijdvoorspelling bij basisonderhoud ([EXSYN](https://exsyn.com/base-maintenance-ground-time-prediction-app)), en er is actief academisch werk aan LP-modellen voor C-/D-check-scheduling ([Springer](https://link.springer.com/article/10.1007/s13243-024-00135-6)).
- **Gesloten, dure, verticale markten** met hoge switching costs en lange verkoopcycli.

### 6.8 De long-tail CMMS en de open-source-optie

**Werkt goed:** goedkoop, snel, moderne UI, mobiel-eerst. Voor een mkb-productiebedrijf met 200 assets is dit precies goed.

**Wringt:** vrijwel geen enkele heeft CPM. De open-source-optie is dun: **Atlas CMMS** (*"a free, open-source CMMS to manage work orders, preventive maintenance, assets, and facilities"*, [atlas-cmms.com](https://atlas-cmms.com)) en de **Odoo Maintenance-module** zijn de bekendste, en beide bieden geen kritieke-padanalyse of serieuze Gantt-functionaliteit ([zoekresultaat-synthese open-source CMMS](https://html.duckduckgo.com/html/?q=open+source+CMMS+alternatives)). **Er bestaat geen open-source pakket dat CPM-planning en onderhoudsdomeinkennis combineert.** Dat is een gat — zie §7.

### 6.9 Excel

**Werkt goed:** iedereen kan het; nul drempel; oneindig flexibel voor backlog-lijsten, craft-manurenberekening, ploegroosters en scope-tabellen.

**Wringt:** geen CPM, geen auditspoor, geen versiebeheer, geen integratie. En toch is het aantoonbaar het meest gebruikte planningsinstrument in deze sector — planners besteden er meer tijd in dan in het CMMS. Dat is geen luiheid; het is een oordeel over de alternatieven.

---

## 7. Openingen — waar zit de ontevredenheid en het gat

### 7.1 Gedocumenteerde ontevredenheid

| Klacht | Bron |
|---|---|
| *"Planners spending more time in Excel than SAP"* | [zoekresultaat-synthese SAP PM-klachten](https://html.duckduckgo.com/html/?q=SAP+PM+scheduling+frustration+Excel) |
| Organisaties draaien een *"heavily configured and manual process in Excel"* naast het CMMS | idem |
| SAP PM *"has significant limitations when optimizing complex schedules with thousands of interdependent operations"* | [OptiScheduleAI](https://optischeduleai.com/) |
| Al jarenlang openstaande vraag op SAP Community naar een *"Gantt chart/Graphical tool for PM order scheduling"* | [SAP Community](https://community.sap.com/) |
| Maximo Scheduler: *"several issues with usability"*, clunky interface, teams wijken uit naar externe tools | [zoekresultaat-synthese Maximo-klachten](https://html.duckduckgo.com/html/?q=Maximo+scheduler+complaints+usability) |
| Maximo: *"on the supply chain side it is weak and generally requires some enhancements"* | idem (Reddit-gebruiker) |
| Wrench time blijft steken op **25–35%** tegenover **45–55%** best-in-class — twee derde van de duurste resource gaat verloren | [ReliaMag](https://reliamag.com/), [Tractian](https://tractian.com/), [OxMaint](https://oxmaint.com/) |
| Een ploegoverdrachts**rapport** samenstellen uit een live P6-schema kost **30–60 minuten** per keer | [Prometheus Group](https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage) — woordelijk geverifieerd |
| Prijsondoorzichtigheid als sectorpraktijk: leveranciers *"charge you as much as they think you can afford"* | [IAMTech](https://www.iamtech.com/knowledge/3-key-questions-to-ask-when-choosing-your-sto-turnaround-shutdown-outage-software-solution) |
| **30% van de gebouwlevenscyclusdata gaat verloren bij de overdracht bouw→beheer**, waarna FM-teams handmatig assetinformatie opnieuw invoeren die al bestond | [OxMaint COBie/IFC](https://oxmaint.com/) |
| Ongeplande stilstand kost de Fortune Global 500 **11% van de omzet** — gestegen van 8% in 2019-20 | [Siemens True Cost of Downtime 2024](https://www.siemens.com/) |
| DCMA-14-implementaties verschillen per tool en zijn **door niemand gecertificeerd** | [Mosaic Projects WP1088](https://mosaicprojects.com.au/WhitePapers/WP1088_DCMA-14-Point.pdf) |

### 7.2 Wat dit sectorrapport aan de open-source-these toevoegt

De belangrijkste bijdrage van dít rapport aan het bredere onderzoek is een **negatief resultaat, en dat is waardevol**:

> **De onderhouds- en asset-managementmarkt is grotendeels géén CPM-markt.** Van de $1,3–2,3 mrd aan onderhoudsgerelateerde planningssoftware is hooguit **$0,35–0,85 mrd** CPM-vormig (strikt $0,35–0,65; ruim $0,55–0,85 — zie §4.2 stap 5), en dat deel is bovendien het stevigst vergrendeld (P6, contractueel, forensisch, defensiegecertificeerd).

Wie een open-source CPM-planner bouwt, moet deze sector **niet als primaire markt beschouwen**. De grote planner-populatie (0,8–2,0 mln [SCHATTING]) is functioneel onbereikbaar zonder een werkorder-, asset- en materiaalmodel te bouwen — dat wil zeggen: zonder een EAM te worden en met SAP, IBM, Hexagon en Prometheus ($4 mrd) te concurreren.

Dat gezegd hebbende zijn er vier reële, afgebakende openingen.

### 7.3 Opening A — de onbediende contractantenlaag in regime B (grootste kans)

Dezelfde structuur als in het O&G-zusterrapport, maar hier met de MRO-dimensie erbij. Bij £25.000/gebruiker/jaar (IAMTech individueel) of $3.660/gebruiker/jaar met 25-seat-minimum (Oracle) koopt **geen** steigerbouwer, isolatiebedrijf, NDO-firma, lasbedrijf, kraanverhuurder, scheepsreparatie-onderaannemer of luchtvaart-lijnonderhoudspartij ooit een licentie. Deze groep levert het merendeel van de manuren en werkt in Excel en op papier.

Wat zij nodig hebben en nergens gratis kunnen krijgen:
1. **Uur-granulariteit** met ploegkalenders,
2. **Craft-resources** met certificeringen,
3. het vermogen om **een P6-schema in te lezen en er tegen te rapporteren** zonder P6 te bezitten,
4. een prijs van nul.

Er is in dat segment geen concurrentie. Monetisering zit in support, hosting, integratie en training — niet in de licentie.

### 7.4 Opening B — het NAVSEA-formaatgat (klein, maar juridisch hard)

Dit is de meest concrete, best gedocumenteerde opening in het hele rapport, en hij is uniek voor deze sector.

NAVSEA Standard Item 009-111 eist een volwaardig CPM-schema — netwerklogica met verplichte predecessors en successors, early start/finish als *"software determined date"*, total float, hard constraints, lags/leads, kalender-ID, wekelijkse actualisatie — en accepteert het in **`.xls` of `.pdf` of native format** ([NAVSEA 009-111 FY24, Tabel 2](https://www.navsea.navy.mil/Portals/103/Documents/SSRAC/NSI/FY24/009-111_FY24_pkg.pdf)).

**Er staat geen XER-eis. Er staat geen pakketeis.** Een open planner die exact de datavelden van Tabel 1 kan produceren en als `.xlsx` kan exporteren, voldoet formeel aan de eis. Voor de honderden kleinere ship-repair-contractors die non-CNO availabilities uitvoeren — waarvan velen nu in Excel werken zónder echte CPM-motor en dus met een *ongeldig* kritiek pad — is dit een direct, aantoonbaar toepasbaar product.

De sector is bovendien groot en groeit: naval MRO-diensten **$57,5 mrd (2025) → $97,3 mrd (2034)**, waarvan Noord-Amerika **$21,4 mrd** ([Growth Market Reports](https://growthmarketreports.com/report/naval-ship-maintenance-repair-and-overhaul-mro-market-global-industry-analysis)).

**Concrete productimplicatie:** een exportprofiel "NAVSEA 009-111 IPS" met exact de kolommen uit Tabel 1 is een klein stuk werk met een disproportioneel scherp verkoopverhaal. Dat is zeldzaam in deze markt.

*(Voorbehoud: dit betreft non-CNO availabilities. Grote CNO-availabilities en DoD-contracten boven $20 mln vallen onder EVMS/EIA-748 en IMP/IMS-regimes waar P6 in de praktijk onvermijdelijk is.)*

### 7.5 Opening C — de bouw→beheer-overdracht, waar IFC wél de standaard is

Dit is de enige plek in de hele onderhoudswereld waar een **IFC-native** tool een structureel thuisvoordeel heeft — en het is een reëel, gekwantificeerd pijnpunt:

> *"Up to 30% of building lifecycle data is lost at the handover between construction and operations"*, waarna FM-teams handmatig assetinformatie opnieuw invoeren die al in het BIM-model bestond ([OxMaint](https://oxmaint.com/)).

De standaardketen is er: **COBie** draagt assets, ruimtes, garanties en **onderhoudsschema's** over van ontwerptools naar CMMS; **ISO 19650-3** levert het Asset Information Model-kader; buildingSMART levert een **FM Handover**-specificatie op basis van **IFC 4.3**; en COBie ondersteunt IFC, XML én spreadsheet als drager ([zoekresultaat-synthese COBie/IFC](https://html.duckduckgo.com/html/?q=COBie+IFC+facility+management+asset+handover+CMMS)). IFC 4.3 breidt dit expliciet uit naar lineaire infrastructuur ([Construction Management UK](https://www.constructionmanagement.co.uk/)).

**De kans:** een IFC-native planner die (a) assets uit het IFC-model leest, (b) daar onderhoudstaken en -intervallen aan koppelt, en (c) een COBie/IFC-conforme onderhoudsplanning teruglevert bij oplevering, sluit het gat tussen 4D-bouwplanning en onderhoudsplanning in één datamodel. Dat kan geen enkele huidige speler: de EAM-leveranciers importeren COBie maar plannen niet in CPM; de CPM-leveranciers plannen wel maar kennen geen assets.

**De waarschuwing die dit rapport moet herhalen:** dit geldt voor **gebouwen en infrastructuur**. In de **procesindustrie** is de standaard **CFIHOS en ISO 15926**, niet IFC (zie zusterrapport O&G). Een IFC-strategie mikt dus op facility/vastgoed/infrastructuurbeheer — spoor, tunnels, ziekenhuizen, kantoren, netwerken — en **niet** op raffinaderijen en chemie.

### 7.6 Opening D — schemakwaliteit als open, gecertificeerde functie

[Mosaic Projects](https://mosaicprojects.com.au/WhitePapers/WP1088_DCMA-14-Point.pdf) stelt vast dat de DCMA-14-implementaties in de verschillende pakketten **niet gecertificeerd zijn en onderling verschillen**, met de grootste problemen rond het tellen van relaties. Tegelijk definieert NAVSEA 009-111 in §4.1.1 exact het probleem dat DCMA-14 oplost: *"Unless the IPS represents the entire scope of effort and the effort is correctly sequenced through network logic, the scheduling software will report an incorrect or invalid critical path."*

Een open-source implementatie van DCMA 14-point (plus de GAO-checks) met **publiek verifieerbare telregels** is een klein stuk werk — de veertien maten zijn vrijwel allemaal pure functies over taken en relaties, en een tool met CPM-solver, kalendermotor, total float en critical-path-vlag heeft de bouwstenen al. De waarde zit niet in de code maar in de **transparantie**: één plek waar staat hoe er geteld wordt, in een markt waar dat nergens gecertificeerd is.

### 7.7 Wat níét te doen

Eerlijkheidshalve, want dit rapport is nuttiger als het ook grenzen trekt:

- **Niet proberen SAP PM of Maximo te vervangen.** Dat is een EAM bouwen: werkorders, assets, materiaal, inkoop, mobiel, offline. Tegen een markt met een $4 mrd-speler die er 25 jaar aan bouwt.
- **Niet mikken op regime A.** Daar is geen CPM-probleem, is de scheduler inmiddels gratis meegeleverd, en is de betalingsbereidheid laag.
- **Niet mikken op luchtvaart-MRO.** Airworthiness-regelgeving maakt dat een gesloten, gecertificeerde markt.
- **Niet rekenen op IFC in de procesindustrie.** Daar heet de standaard CFIHOS/ISO 15926.
- **Niet de EAM-marktcijfers als TAM presenteren.** Dat is de fout die dit rapport probeert te voorkomen: van $5,87 mrd EAM is hooguit een tiende scheduling, en daarvan is het meeste geen CPM.

---

## 8. Samenvattende conclusie

1. **Onderhoud is geen project, en het grootste deel van de onderhoudsplanning is geen CPM.** De sector plant capaciteit, geen netwerken; stuurt op schedule compliance en wrench time, niet op total float. De maatgevende vuistregel is één planner per 20–30 vakmensen (Doc Palmer), en het weekschema is letterlijk *"a full list of work"*.

2. **De uitzondering is regime B — evenementen.** Turnarounds, outages, naval availabilities en zware luchtvaartchecks zijn projecten in alles behalve naam: eindig, netwerk-gedreven, uur-granulair, met catastrofale vertragingskosten. Daar is Primavera P6 onbetwist en de betalingsbereidheid zeer hoog.

3. **De kosten van vertraging zijn hier harder en directer dan in welke andere onderzochte sector ook**: $1–2 mln per dag voor een nucleaire outage, >$1 mln per dag voor een raffinaderij-turnaround, tot $150.000 per uur voor een gegrond vliegtuig, en 11% van de omzet aan ongeplande stilstand voor de Fortune Global 500 ($1,4 biljoen per jaar). Dat maakt de businesscase voor regime-B-software triviaal — en verklaart de prijsondoorzichtigheid.

4. **De betalingsbereidheid is bimodaal binnen dezelfde organisatie.** Hoog in regime B (waar prijs geen argument is), laag in regime A (waar de scheduler inmiddels gratis meekomt), en nul bij de onderaannemers die het meeste werk uitvoeren.

5. **Het segment is kleiner dan de EAM-cijfers suggereren.** Onderhoudsgerelateerde planningssoftware is **$1,3–2,3 mrd/jaar (2025) [SCHATTING]**, waarvan slechts **$0,35–0,85 mrd** CPM-vormig. De EAM-markt van $5,87 mrd (bevestigd bij MarketsandMarkets) is grotendeels werkbeheer, geen scheduling. Groei **~7–9%/jaar** gewogen, met regime B trager (4–7%) dan regime A (9–11%). *[bijgesteld bij verificatie; zie §4.2 en §4.3]*

6. **De standaardenlast is anders dan verwacht.** EVMS/EIA-748 en DCMA 14-point bijten hier vrijwel alleen bij defensie-MRO boven $20 mln (DFARS-drempels bij verificatie bevestigd: $20 mln voor EIA-748-conformiteit, $50 mln voor formele compliance-verklaring). Wat wél bindt: ISO 55001:2024 (auditspoor, geen tool-eis), EASA Part-145/MSG-3 (luchtvaart, gesloten), AACE RP 112R-20 (eigen ramingsklassificatie voor turnarounds), en NAVSEA 009-111 (volledige CPM-eis).

7. **De scherpste opening is NAVSEA 009-111.** Een contractueel verplicht CPM-schema met total float, verplichte netwerklogica en wekelijkse actualisatie — dat in `.xls` of `.pdf` mag worden opgeleverd, zonder pakket- of XER-eis. Dat is een formeel openstaande deur in een markt die verder overal op slot zit.

8. **Voor een IFC-native planner ligt de kans in de bouw→beheer-overdracht, niet in de fabriek.** De 30%-datavernietiging bij oplevering is een gekwantificeerd, erkend probleem met een bestaande standaardketen (COBie, ISO 19650-3, IFC 4.3 FM Handover) en geen enkele speler die planning én assetdata in één model doet. Maar dat geldt voor gebouwen en infrastructuur — in de procesindustrie heet de standaard CFIHOS/ISO 15926 en heeft IFC geen thuisvoordeel.

---

## 9. Bronnenlijst

### Leveranciers — primair
1. Prometheus Group — Planning & Scheduling (GWOS-AI, modules, integraties SAP/Oracle/Maximo, klanten): https://www.prometheusgroup.com/solutions/planning-and-scheduling
2. Prometheus Group — About (13 sectoren, 9 modules, 4 productgebieden, klantlogo's): https://www.prometheusgroup.com/about
3. Prometheus Group — Shutdown, Turnaround & Outage: https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage
4. Prometheus Group — overname Actenum (aankondiging): https://www.prometheusgroup.com/resources/posts/prometheus-group-acquires-actenum
5. IBM — Maximo Application Suite pricing (AppPoints, instapprijzen per module): https://www.ibm.com/products/maximo/pricing
6. IAMTech — Shutdown Turnaround Outage software (gepubliceerde prijzen £75k/site, £25k/user; integraties): https://www.iamtech.com/products/shutdown-turnaround-outage-software
7. IAMTech — 3 key questions when choosing STO software (prijsondoorzichtigheid): https://www.iamtech.com/knowledge/3-key-questions-to-ask-when-choosing-your-sto-turnaround-shutdown-outage-software-solution
8. Swiss AviationSoftware — AMOS: https://www.swiss-as.com/
9. Hexagon — Shutdowns, Turnarounds and Outages (EcoSys): https://hexagon.com/solutions/shutdowns-turnarounds-and-outages-sto
10. Hexagon AB — Annual and Sustainability Report 2024 (ALI-segment 831,7 MEUR, p. 24): https://bynder.hexagon.com/m/3f5532e06b4faf41/original/Hexagon-Annual-and-Sustainability-Report-2024.pdf
11. EXSYN — Base Maintenance Ground Time Prediction: https://exsyn.com/base-maintenance-ground-time-prediction-app
12. OxMaint — Base Maintenance Software (C-/D-check, TAT-boetes): https://oxmaint.ai/industries/aviation-management/base-maintenance-software
13. Atlas CMMS — open-source CMMS: https://atlas-cmms.com

### Normen, regelgeving en aanbestedingsdocumenten
14. **NAVSEA Standard Item 009-111 (FY-24), 25 okt 2022 — IPS, CPM, total float, datavelden, `.xls/.pdf/native`-formaat** (PDF, lokaal geparsed): https://www.navsea.navy.mil/Portals/103/Documents/SSRAC/NSI/FY24/009-111_FY24_pkg.pdf
15. NAVSEA-instructie 4850.10a — uniforme scheduling-eisen marinewerven: https://standards.globalspec.com/std/513635/navsea-4850-10a
16. DoD — IMP/IMS Guide 2023: https://ac.cto.mil/wp-content/uploads/2023/05/IMP-IMS-Guide-2023.pdf
17. DFARS 234.201 — EVMS-drempels ($20 mln / $100 mln): https://www.acquisition.gov/dfars/234.201-policy
18. Humphreys & Associates — EVMS threshold class deviation memo: https://www.humphreys-assoc.com/earned-value-management-system-thresholds-class-deviation-memo/
19. AACE RP 112R-20 — Cost Estimate Classification for Maintenance Turnaround Work (inhoudsopgave): https://web.aacei.org/docs/default-source/toc/toc_112r-20.pdf
20. AACE RP 29R-03 — Forensic Schedule Analysis: https://www.29r-03.com/About29R03
21. Mosaic Projects WP1088 — DCMA 14-Point Assessment (implementaties niet gecertificeerd): https://mosaicprojects.com.au/WhitePapers/WP1088_DCMA-14-Point.pdf
22. ScheduleReader — DCMA 14-point volledige drempelwaarden: https://schedulereader.com/dcma-14-point-assessment-project-schedule-quality-analysis/
23. ScheduleLens — DCMA 14-point met P6-walkthrough: https://schedulelens.com/blog/dcma-14-point-assessment/
24. Ten Six — Introduction to the DCMA 14-Point Assessment Guidelines (eBook, feb. 2025): https://tensix.com/wp-content/uploads/2025/02/Ten-Six-An-Introduction-to-the-DCMA-14-Point-Assessment-Guidelines-eBook.pdf
25. EASA — Verordening (EU) nr. 1321/2014, Part-145 / Part-M / Part-CAMO: https://www.easa.europa.eu/
26. ISO 55001:2024 — assetmanagementsystemen, eisen (zoekresultaat-synthese incl. TÜV NORD-certificering): https://html.duckduckgo.com/html/?q=ISO+55000+55001+asset+management+standard+certification+requirements+maintenance+planning+audit

### Marktonderzoek
27. MarketsandMarkets — Enterprise Asset Management Market ($5,87 mrd 2025 → $9,02 mrd 2030, 9,0% CAGR; leveranciers): https://www.marketsandmarkets.com/Market-Reports/enterprise-asset-management-market-97530575.html
28. MarketsandMarkets — MRO Software Market ($8,0 mrd 2025 → $18,0 mrd 2036, 8–10% CAGR): https://www.marketsandmarkets.com/Market-Reports/mro-software-market-166322188.html
29. Growth Market Reports — Naval Ship MRO Market ($57,5 mrd 2025 → $97,3 mrd 2034, 6,1% CAGR, regioverdeling): https://growthmarketreports.com/report/naval-ship-maintenance-repair-and-overhaul-mro-market-global-industry-analysis
30. CMMS-marktomvang, negen bureaus vergeleken (Grand View, Mordor, Verified, Research and Markets, Insight Partners, M&M, Growth Market Reports, Facts & Factors, MRFR): https://html.duckduckgo.com/html/?q=CMMS+market+size+2025+billion+forecast+computerized+maintenance+management+system+CAGR
31. Field Service Management-marktomvang, zeven bureaus vergeleken: https://html.duckduckgo.com/html/?q=%22field+service+management%22+market+size+2025+workforce+scheduling+optimization+billion
32. Luchtvaart-MRO-softwaremarkt + meest geadopteerde pakketten (GM Insights, Fortune BI, AppsRunTheWorld): https://html.duckduckgo.com/html/?q=aviation+MRO+software+market+size+AMOS+Ramco+TRAX+IFS+Maintenix+customers+2025
33. IBM Maximo klantaantallen, Verdantix Green Quadrant EAM 2024, GM Insights EAM-cijfers: https://html.duckduckgo.com/html/?q=IBM+Maximo+number+of+customers+market+share+EAM+2025

### Benchmarks, kosten en praktijk
34. Siemens — True Cost of Downtime 2024 ($1,4 biljoen, 11% van omzet, 82% van bedrijven), via zoekresultaat-synthese: https://html.duckduckgo.com/html/?q=cost+of+unplanned+downtime+manufacturing+Fortune+500+11%25+revenue+Siemens+True+Cost+of+Downtime+2024+report
35. Wrench time-benchmarks (ReliaMag, Tractian, OxMaint, Prometheus Group): https://html.duckduckgo.com/html/?q=wrench+time+maintenance+25+35+percent+schedule+compliance+benchmark+SMRP
36. Doc Palmer / SMRP — planner-tot-vakman-ratio 1:20–30 (Plant Services, ReliaMag, Palmer Planning): https://html.duckduckgo.com/html/?q=maintenance+planner+to+craft+ratio+1+planner+per+20+craftsmen+Doc+Palmer
37. AOG-kosten per uur en per dag; nucleaire outage $1–2 mln/dag; raffinaderij-TAR >$1 mln/dag (AMACS, OptiScheduleAI, Knowledge Relay, Eureka PatSnap): https://html.duckduckgo.com/html/?q=nuclear+refueling+outage+cost+per+day+refinery+turnaround+delay+cost+per+day
38. US BLS — werkgelegenheid en lonen onderhoudsberoepen (mediaan $63.510 mei 2024; 608.100 vacatures/jaar; +13% 2024–34): https://html.duckduckgo.com/html/?q=US+Bureau+of+Labor+Statistics+industrial+maintenance+mechanics+employment+2024
39. AMACS — verschil shutdowns/turnarounds/outages en vertragingskosten: https://amacs.com/turnarounds/understanding-the-differences-shutdowns-turnarounds-and-outages-in-refinery-operations/

### Concurrentie, prijzen en financiële data
40. Prometheus Group waardering $4 mrd (Advent/Leonard Green juni 2024), Genstar >$1 mrd 2019, medewerkers, omzetschattingen: https://html.duckduckgo.com/html/?q=Prometheus+Group+revenue+2025+valuation+%244+billion+Genstar+Francisco+Partners
41. GetLatka — Prometheus Group kerncijfers (met voorbehoud): https://getlatka.com/companies/prometheus-group
42. Automation.com — Prometheus Group acquires Actenum (16 dec. 2025): https://www.automation.com/article/prometheus-group-acquires-actenum
43. Oracle Primavera P6 EPPM Cloud-prijs ($305/gebruiker/maand, min. 25) — zoekresultaat-synthese incl. UK G-Cloud: https://html.duckduckgo.com/html/?q=Oracle+Primavera+P6+EPPM+cloud+price+per+user+per+month+list+price+2025
44. SAP S/4HANA Asset Management / Service and Asset Manager FUE-ratio's en indicatieve prijzen: https://html.duckduckgo.com/html/?q=SAP+S%2F4HANA+asset+management+plant+maintenance+license+cost+per+user
45. IFS FY2025 ARR +23%, cloud +30%, NRR 114%, waardering >€15 mrd: https://html.duckduckgo.com/html/?q=IFS+revenue+2025+ARR+asset+management+field+service
46. EAM-implementatiecontracten en aanbestedingswaarden (TTC SAP EAM CAD 12,28 mln / 3 jaar): https://html.duckduckgo.com/html/?q=EAM+implementation+cost+Maximo+SAP+PM+project+tender+contract+value+million
47. Actenum DSO — functionaliteit en prijsmodel: https://html.duckduckgo.com/html/?q=Actenum+DSO+scheduling+optimization+turnaround+maintenance+oil+gas+software
48. IBM Maximo AppPoints-prijsindicaties en Scheduler in MAS 9 (Facilio, Brock): https://html.duckduckgo.com/html/?q=IBM+Maximo+AppPoints+price+per+apppoint+cost+list+price+2025+licensing
49. Aantal actieve raffinaderijen wereldwijd (825, begin 2025) en overzicht asset-intensieve sites: https://html.duckduckgo.com/html/?q=number+of+refineries+worldwide+chemical+plants+power+plants+mines+2025

### Domeinanalyse
50. Verschil project- versus onderhoudsscheduling (backlog, weekschema, schedule compliance): https://html.duckduckgo.com/html/?q=difference+between+project+scheduling+and+maintenance+scheduling+work+order+backlog
51. SAP PM-schedulingbeperkingen en Primavera-koppeling (OptiScheduleAI, SAP Community, Oracle Project Integration Framework, Reliable Plant): https://html.duckduckgo.com/html/?q=SAP+plant+maintenance+scheduling+limitations+no+critical+path+Gantt+why+use+Primavera
52. Klachten Maximo Scheduler en SAP PM; Excel-uitwijk: https://html.duckduckgo.com/html/?q=Maximo+scheduler+complaints+reddit+clunky+slow+usability+SAP+PM+scheduling+frustration
53. Open-source CMMS-opties en hun schedulingbeperkingen: https://html.duckduckgo.com/html/?q=open+source+CMMS+maintenance+software+alternatives+free+Fiix+Odoo
54. Rolling stock / spoor-MRO-planningssoftware (IFS, DELMIA, Maximo, Railnova, SOROS, Arkyn): https://html.duckduckgo.com/html/?q=rolling+stock+maintenance+planning+software+depot+rail+fleet+IFS+SAP+Maximo
55. COBie/IFC bouw→beheer-overdracht, ISO 19650-3, 30% dataverlies: https://html.duckduckgo.com/html/?q=COBie+IFC+facility+management+asset+handover+CMMS+import+maintenance+data+buildingSMART
56. IFC 4.3 in operations & maintenance — toepassing en beperkingen: https://html.duckduckgo.com/html/?q=IFC+4.3+infrastructure+asset+management+operation+maintenance+phase+buildingSMART
57. Aircraft heavy maintenance C-/D-check planning, hangar slots, LP-optimalisatie (Springer, OxMaint, Power Aero): https://html.duckduckgo.com/html/?q=aircraft+heavy+maintenance+C-check+planning+scheduling+software+critical+path+hangar+slot

### Zusterrapporten in dit onderzoek (interne verwijzingen)
58. `sector-olie-en-gas-turnarounds-en-shutdowns.md` — turnarounds in detail, STO-suites, CFIHOS/ISO 15926 versus IFC
59. `sector-energie-nutsbedrijven-en-nucleair.md` — nucleaire outages, Asset Suite, EAM-laag bij nutsbedrijven

---

*Rapport opgesteld 25 juli 2026. Alle marktomvangschattingen in §4 zijn eigen berekeningen met expliciete aannames en zijn als [SCHATTING] gemarkeerd; ze zijn bedoeld als orde van grootte, niet als precisie. Waar bronnen elkaar tegenspreken (met name Prometheus Group-omzet en de CMMS-marktomvang) is dat expliciet vermeld in plaats van weggemiddeld.*

---

## Verificatie

**Uitgevoerd:** 25 juli 2026, adversariële fact-check. Werkwijze: de belangrijkste falsifieerbare beweringen zijn actief geprobeerd te weerleggen door de geciteerde primaire bronnen op te halen (waar mogelijk het PDF-origineel, lokaal geparsed) en door elke doorgerekende schatting opnieuw uit te rekenen. Beweringen die niet uit een bron te bevestigen waren, zijn als **onzeker** gemarkeerd in plaats van als bevestigd te worden aangenomen. Correcties zijn in de tekst hierboven doorgevoerd, telkens met een inline-markering.

**Beperking van deze controle:** het zoekbudget voor webzoekopdrachten was uitgeput; verificatie is uitsluitend gedaan via directe URL-ophaling van de al geciteerde bronnen. Beweringen waarvan de bron een `duckduckgo.com`-zoekopdracht is (dus geen echte bron) konden daardoor niet onafhankelijk worden getoetst en blijven onzeker.

### A. Segmentomvang en de redenering erachter

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| 1 | **Segment = $1,3–2,1 mrd/jaar (2025)**, waarvan $0,45–0,75 mrd CPM-vormig | **gecorrigeerd → $1,3–2,3 mrd, waarvan $0,35–0,85 mrd** | Drie fouten nagerekend. (a) De sitesom is 10.475, niet 10.500; owner-seats 31.425. (b) 31.500 + 63.000 = **94.500** seats, niet "≈90.000" — het rapport rondde 4,8% naar beneden af. Component B wordt daarmee 94.500 × $3.250 = **$307 mln**, niet $293 mln. (c) De regel "waarvan CPM-vormig $0,45–0,75 mrd" telt component C **volledig** mee, terwijl de tabel op dezelfde regel C markeert als slechts **"deels"** CPM-vormig. Dat is een interne tegenspraak die het CPM-adresseerbare deel structureel overschat. §4.2 stap 5 heeft nu een strikte en een ruime variant. | eigen herberekening; §4.2 |
| 2 | **Component C (STO-laag) = ~$286 mln**, op basis van 2.600 sites × gewogen $110.000 | **gecorrigeerd → waarschijnlijk ondergrens, $0,29–0,38 mrd** | De rekensom klopt (2.600 × $110.000 = $286 mln), maar de **weging niet**. IAMTech publiceert een eigen USD-prijs van **$99.000/site/jaar**; het rapport schat Prometheus/Roser op $150.000–400.000. Een gewogen gemiddelde van $110.000 impliceert dat ~93% van alle kopers bij IAMTech zit — precies de leverancier die zichzelf als kleine, goedkope uitdager positioneert. Bij een plausibeler 70/30-verdeling wordt het gewogen gemiddelde $144.000 en component C **$375 mln**. | [IAMTech prijzen](https://www.iamtech.com/products/shutdown-turnaround-outage-software) |
| 3 | **"De top-downkruiscontrole bevestigt de bottom-upuitkomst; de twee methoden bevestigen elkaar binnen de foutmarge."** | **WEERLEGD — circulair** | Dit is de belangrijkste methodologische bevinding van deze controle. Component A is 55–70% van de bottom-upuitkomst en is berekend als **(EAM + CMMS) × 10–20%**. De "onafhankelijke" top-down is **(EAM + CMMS + MRO-software) × 8–15%** na overlapcorrectie. Zelfde invoergetallen, vrijwel hetzelfde percentage — de methoden *kunnen* niet uiteenlopen. Alleen componenten B en C zijn werkelijk bottom-up afgeleid, en die worden door de top-down juist **niet** getoetst. De rekenkunde zelf klopt wél: 5,87 + 1,6 + 8,0 = 15,47; × 0,65–0,75 = $10,1–11,6 mrd; × 8–15% = $0,80–1,74 mrd. | eigen herberekening; §4.2 |
| 4 | **Dienstenmarkt $5–20 mrd**, bij software = 5–20% van de totale planningskosten | **gecorrigeerd → $5–40 mrd** | Rekenfout. Bij een softwareaandeel van 5% is de totale planningsmarkt $1,3/0,05 = $26 mrd tot $2,1/0,05 = $42 mrd; de dienstencomponent is dan $25–40 mrd. Bij 20% is die $5,2–8,4 mrd. De juiste band is dus $5–40 mrd; de bovengrens lag twee keer te laag. | eigen herberekening; §4.2 |
| 5 | **Groei 8–11%/jaar** voor het segment, met regime B op 4–7% | **gecorrigeerd → ~7–9%** | Rekenkundig onverenigbaar met de eigen samenstelling. Als A (55–70%) op 9–11% groeit en B+C (30–45%) op 4–7%, ligt het gewogen gemiddelde tussen 7,2% en 9,2%. 11% is onbereikbaar. De 8–11% is de groei van de EAM/CMMS-deelmarkten, niet van het afgebakende segment. | eigen herberekening; §4.3 |
| 6 | **Plannerpopulatie 0,8–2,0 mln**, waarvan 2–5% (20.000–100.000) CPM doet | **bevestigd, met kleine correctie** | De afleiding klopt: 25 mln / 30 = 0,83 mln; 40 mln / 20 = 2,0 mln. De ondergrens van de CPM-subpopulatie is echter 2% × 0,8 mln = **16.000**, niet 20.000. Gecorrigeerd in §2.3. De onderliggende inputs (25–40 mln vakmensen) blijven ongefundeerd [SCHATTING] en zijn niet toetsbaar. | eigen herberekening; §1.3, §2.3 |
| 7 | **EAM-markt $5,87 mrd (2025) → $9,02 mrd (2030), CAGR 9,0%** | **bevestigd** | Letterlijk bevestigd op de bronpagina; de CAGR is intern consistent (9,02/5,87 over 5 jaar = 9,0%). De waarschuwing dat dit géén TAM is, blijft terecht. | [MarketsandMarkets EAM](https://www.marketsandmarkets.com/Market-Reports/enterprise-asset-management-market-97530575.html) |
| 8 | **MRO-softwaremarkt $8,0 mrd (2025) → $18,0 mrd (2036), CAGR 8–10%** | **bevestigd, met belangrijke scope-correctie** | De cijfers staan er letterlijk. Maar het rapport heet voluit *"MRO Software Market **in Aviation** by End User (Operators, OEMs, MROs, Lessors)"* — het is dus de **luchtvaart**-MRO-softwaremarkt, niet een brede onderhouds-MRO-markt. Dat bevestigt de vermoede overlap met de $7,7 mrd van GM Insights: dezelfde markt, twee bureaus. Bovendien impliceert $8,0 → $18,0 over 11 jaar een CAGR van **7,7%**, iets onder de opgegeven 8–10%. | [MarketsandMarkets MRO](https://www.marketsandmarkets.com/Market-Reports/mro-software-market-166322188.html) |
| 9 | **CMMS-markt $1,6 mrd (2025)** volgens Grand View, gebruikt als basis voor component A | **gecorrigeerd → ~$1,40–1,44 mrd** | Grand View's eigen basis ($1,3 mrd 2024) plus eigen CAGR (11,1%) geeft $1,44 mrd voor 2025, niet $1,6 mrd. Mordor is onafhankelijk geverifieerd op **$1,40 mrd (2025) → $2,15 mrd (2030), CAGR 9,00%** — precies zoals het rapport claimt, en dat bevestigt de lagere waarde. Effect op component A: basis $7,3 in plaats van $7,5 mrd; band wordt $0,73–1,46 mrd. Marginaal. | [Mordor CMMS](https://www.mordorintelligence.com/industry-reports/computerized-maintenance-management-system-market) |
| 10 | **Naval MRO-diensten $57,5 mrd (2025) → $97,3 mrd (2034), CAGR 6,1%**, NA $21,4 mrd (37,2%), EU $13,9 mrd (24,1%), APAC $11,9 mrd (20,8%, 7,4%) | **bevestigd** | Alle zeven cijfers letterlijk bevestigd op de bronpagina, inclusief de regioverdeling. De impliciete CAGR (97,3/57,5 over 9 jaar = 6,0%) is consistent met de opgegeven 6,1%. | [Growth Market Reports](https://growthmarketreports.com/report/naval-ship-maintenance-repair-and-overhaul-mro-market-global-industry-analysis) |

### B. Prijzen

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| 11 | **IAMTech: £75.000/site/jaar, £25.000/gebruiker/jaar, 5%/10%/15%/20%-staffel** | **bevestigd, en aangevuld** | Alle prijzen en kortingsstaffels exact bevestigd. Aanvulling die het rapport miste: IAMTech publiceert óók een **USD-prijslijst** — $99.000/site (aflopend tot $79.000 bij 5+) en $33.000/gebruiker (aflopend tot $27.000). Dat is een hard ijkpunt dat de sizing in §4.2 stap 3 direct raakt. | [IAMTech](https://www.iamtech.com/products/shutdown-turnaround-outage-software) |
| 12 | **"Een IAMTech-sitelicentie kost £75.000; drie individuele P6-gebruikers kosten al ongeveer evenveel."** | **WEERLEGD** | Feitelijk onjuist met een factor ~9. Drie P6 EPPM-seats kosten 3 × $3.660 = **$10.980/jaar ≈ £8.600**. De vergelijking die het bedoelde punt maakt is *drie individuele **IAMTech**-gebruikers*: 3 × £23.000 = £69.000 ≈ £75.000. Gecorrigeerd in §3.2. | [IAMTech](https://www.iamtech.com/products/shutdown-turnaround-outage-software) |
| 13 | **P6 EPPM Cloud $305/gebruiker/maand, min. 25 gebruikers → $91.500/jaar** | **onzeker** | Rekenkundig consistent (25 × 305 × 12 = 91.500; 305 × 12 = 3.660). Maar niet uit een primaire Oracle-prijslijst te bevestigen: alle geprobeerde Oracle-prijslijst-URL's gaven 404, en de oorspronkelijke bron is een zoekopdracht. Dit getal draagt component B volledig — als het 20% afwijkt, schuift $307 mln evenredig mee. | geen primaire bron gevonden |
| 14 | **IBM Maximo: instapprijzen "onder $40.000" (Maintenance, 150 AppPoints), "onder $47.000" (Inspection, 175 AppPoints); geen prijs per AppPoint gepubliceerd** | **bevestigd** | De hele prijstabel exact bevestigd, inclusief Inventory Optimization op 140 AppPoints. IBM publiceert inderdaad geen conversieratio naar AppPoints. | [IBM Maximo pricing](https://www.ibm.com/products/maximo/pricing) |
| 15 | **In MAS 9 zit Scheduler in de basislicentie zonder extra AppPoints** — gemarkeerd als [ONZEKER, IBM bevestigt dit niet] | **gecorrigeerd — sterker dan het rapport dacht** | IBM's eigen prijspagina vermeldt bij de capaciteitsspecificatie van Maintenance/Essentials letterlijk **"MAS Scheduler included"**. De claim is dus deels primair bevestigd. Wat IBM *niet* bevestigt is of dit voor alle MAS 9-tiers geldt en of er werkelijk nul extra AppPoints tegenover staan — dat deel blijft onzeker. Bijgesteld in §3.1 en §6.2. | [IBM Maximo pricing](https://www.ibm.com/products/maximo/pricing) |
| 16 | **SAP: FUE-ratio's, ~$180/gebruiker/maand S/4HANA Public Cloud, implementaties $75.000–$500.000** | **onzeker (ongewijzigd)** | Het rapport markeerde dit al als [ONZEKER]; die markering is terecht en blijft staan. Bron is een zoekopdracht, geen SAP-prijslijst. Niet onafhankelijk te toetsen binnen dit budget. | geen primaire bron |

### C. "Verplichte" software en formaten

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| 17 | **NAVSEA Standard Item 009-111 (FY-24, 25 okt 2022) eist een volwaardig CPM-schema — verplichte predecessors/successors, total float, "software determined" early start/finish, kalender-ID, wekelijkse actualisatie — en accepteert dat in `.xls` of `.pdf` of native format, zonder XER- of pakketeis** | **BEVESTIGD — woordelijk, uit het PDF-origineel** | De sterkste bevinding van het rapport, en hij houdt volledig stand. Geverifieerd uit het geparsede origineel: titel *"Schedule and Associated Reports for non-CNO Availabilities; provide and manage"*, DATE **25 OCT 2022**, CATEGORY I. **Tabel 2** schrijft voor zowel het initiële IPS (3.6.1) als het wekelijkse Availability Status Report (3.6.2) letterlijk *".xls or .pdf or native format"* voor. §4.1.1 bevat de geciteerde CPM-definitie én de waarschuwing *"Unless the IPS represents the entire scope of effort and the effort is correctly sequenced through network logic, the scheduling software will report an incorrect or invalid critical path."* Tabel 1 bevat *"Early Start — Software determined date"*, *"Calendar Identification — Number of scheduled workdays per week"*, *"Total Float"*, en bij Predecessor: *"Every Activity and Event in the Total Project Network must have at least one Predecessor (except Start Availability)."* Ook §4.1.3 (IPS-definitie), 4.1.9 (Controlling Work Items), 4.1.10, 4.1.11, 4.1.18 (Negative Float), 4.1.19 (Hard Constraint, MSO/MFO, *"prevent their associated activity from being logic-driven"*) en 4.1.20 (Lags/Leads, inclusief de geciteerde waarschuwing) staan er exact zoals geciteerd. **Geen enkel citaat in §5.2 of §7.4 bleek onjuist.** | [NAVSEA 009-111 FY24 (PDF)](https://www.navsea.navy.mil/Portals/103/Documents/SSRAC/NSI/FY24/009-111_FY24_pkg.pdf) |
| 18 | **DFARS 234.201: EIA-748-EVMS bij $20–100 mln; boven $100 mln formele compliance-beoordeling (drempel verhoogd van $50 naar $100 mln)** | **GECORRIGEERD** | De geldende DFARS-tekst noemt **$20 mln** (EIA-748-conformiteit) en **$50 mln** (formele compliance-verklaring door het bevoegde federale agentschap) — niet $100 mln. Ook bevestigd: onder $20 mln is toepassing optioneel/risicogebaseerd met motivering in het dossier, en bij firm-fixed-price wordt EVMS ontraden ongeacht bedrag. De $100 mln zou uit een DoD-klassedeviatie komen; de geciteerde Humphreys-pagina gaf HTTP 403 en de deviatie is niet uit een primaire bron bevestigd. **Behandel $100 mln als onzeker; $20 mln en $50 mln zijn bevestigd.** | [DFARS deel 234](https://www.acquisition.gov/dfars/part-234-major-system-acquisition) |
| 19 | **DCMA 14-point-implementaties zijn niet gecertificeerd en verschillen per tool; grootste probleem is het tellen van taken** | **bevestigd — woordelijk** | Uit het PDF-origineel: *"The implementation of the DCMA 14-Point Assessment in the various software tools is not certified by the DCMA or any other body and varies between the tools! The biggest issue is around counting of the number of tasks to be considered."* De onderbouwing van opening D (§7.6) staat daarmee. | [Mosaic Projects WP1088 (PDF)](https://mosaicprojects.com.au/WhitePapers/WP1088_DCMA-14-Point.pdf) |

### D. Marktleiderschap en leverancierscijfers

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| 20 | **Hexagon ALI: 831,7 MEUR (2023: 782,0), organisch +7%, "EAM delivered consistent double-digit SaaS growth", "Project, Planning, and Execution solutions gaining momentum"** | **bevestigd — woordelijk** | Alle vier de elementen exact bevestigd uit het jaarverslag, inclusief beide citaten. De analytische pointe van §3.4 (Hexagon rapporteert EAM en Project/Planning/Execution als *aparte* productgebieden, en erkent daarmee intern de scheidslijn van §2.3) houdt stand. | [Hexagon Annual Report 2024](https://bynder.hexagon.com/m/3f5532e06b4faf41/original/Hexagon-Annual-and-Sustainability-Report-2024.pdf) |
| 21 | **"ALI-divisie is de op-één-na-grootste van Hexagon"** | **WEERLEGD** | ALI is de **derde** divisie naar omzet. Segmenttabel 2024 (MEUR): Manufacturing Intelligence 1.955,7 — Geosystems 1.555,4 — **Asset Lifecycle Intelligence 831,7** — Autonomous Solutions 558,0 — Safety, Infrastructure & Geospatial 497,1. Gecorrigeerd in §2.1. | [Hexagon Annual Report 2024, segmenttabel](https://bynder.hexagon.com/m/3f5532e06b4faf41/original/Hexagon-Annual-and-Sustainability-Report-2024.pdf) |
| 22 | **Prometheus Group nam Actenum over, aangekondigd 16 december 2025; DSO is AI-scheduling/optimalisatie** | **bevestigd** | Datum exact bevestigd (16 december 2025), evenals de productomschrijving: DSO *"utilizes AI to transform complex scheduling data into actionable insights, enabling operators to increase throughput, reduce cycle times, and maximize resource utilization."* | [Prometheus Group](https://www.prometheusgroup.com/resources/posts/prometheus-group-acquires-actenum) |
| 23 | **Prometheus-klanten Saudi Aramco, Marathon, Bayer; GWOS-AI "trained on over 20 years of real-world maintenance data"** | **bevestigd — woordelijk** | Alle drie de genoemde logo's staan op de planning-and-scheduling-pagina, evenals PepsiCo, Goodyear en Rio Tinto. Het GWOS-AI-citaat staat er letterlijk. | [Prometheus Group](https://www.prometheusgroup.com/solutions/planning-and-scheduling) |
| 24 | **Prometheus: negen modules over vier productgebieden** | **gecorrigeerd (klein)** | De about-pagina groepeert de negen modules in **vijf** gebieden: Maintenance & Logistics, Capital Project Management, Master Data Management, EHS én **ERP Integrations**. Het aantal modules (negen) klopt, evenals de dertien sectoren. De klantlogo's op déze pagina zijn BASF, PepsiCo, Jefferson Lab, Harvard, Goodyear, Rio Tinto, ExxonMobil, Merck, International Paper, Sempra, NASA. | [Prometheus Group — About](https://www.prometheusgroup.com/about) |
| 25 | **Prometheus-waardering $4 mrd (Advent + Leonard Green, juni 2024); Genstar >$1 mrd in 2019; omzet $241,5 mln (Growjo)** | **onzeker (ongewijzigd)** | De Advent-persverklaring gaf HTTP 404; geen primaire bevestiging gevonden. Het rapport markeerde dit al als [ONZEKER] met de expliciete constatering dat Latka ($18,6 mln omzet, $1,5 mrd waardering) en Growjo ($241,5 mln) onverenigbaar zijn. Die markering is correct en blijft. **Let op:** de $4 mrd wordt in §6.1 en §6.3 wél als vaststaand feit gebruikt in het betoog ("Prometheus Group — waardering $4 mrd — bestaat in wezen omdat SAP PM geen goede planner heeft"). Dat is inconsistent met de eigen onzekerheidsmarkering. | geen primaire bron |
| 26 | **IFS FY2025: ARR +23%, cloud +30%, NRR 114%, terugkerende omzet 82%, waardering >€15 mrd** | **onzeker (ongewijzigd)** | IFS-persbericht-URL gaf 404; niet onafhankelijk te bevestigen. Het rapport markeerde dit al als [ONZEKER — absolute omzet niet teruggevonden]. Die markering blijft, maar geldt strikt genomen ook voor de groeipercentages zelf: die zijn hier niet primair geverifieerd. | geen primaire bron |
| 27 | **IBM Maximo: 2.157 geverifieerde bedrijven (Landbase); leider Verdantix Green Quadrant EAM 2024** | **onzeker** | Niet geverifieerd. Landbase is een leadgeneratie-/technografiedienst, geen marktonderzoeksbureau; dergelijke tellingen zijn afgeleid uit web-scraping en systematisch onvolledig. De Verdantix-positionering staat achter een betaalmuur. Gebruik geen van beide als bewijs voor marktaandeel. | geen primaire bron |
| 28 | **Prometheus claimt 55–65% wrench time haalbaar** | **niet teruggevonden → onzeker** | Op de planning-and-scheduling-pagina staan geen wrench-time-percentages. Wel een casus (Hemlock Semiconductor): *"30% increase in productivity"*, *"80% maintenance capacity across all work centers"*, *"30% decrease in non-value added activities"*. Gemarkeerd in §1.5. De onafhankelijke 25–35%/45–55%-benchmarks van ReliaMag/Tractian zijn niet apart getoetst (bronnen zijn zoekopdrachten). | [Prometheus Group](https://www.prometheusgroup.com/solutions/planning-and-scheduling) |
| 29 | **"Ploegoverdracht kost 30–60 minuten per keer uit een live P6-schema"** | **bevestigd, met scope-correctie** | Het citaat luidt: *"Generate a complete shift handover report from the live P6 schedule in seconds, instead of 30-60 minutes."* Het gaat dus om het **genereren van het overdrachtsrapport**, niet om de ploegoverdracht zelf. De afgeleide rekensom (30–60 uur over een turnaround van 30 dagen) blijft geldig, maar de formulering is aangescherpt in §6.4 en §7.1. | [Prometheus Group STO](https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage) |

### E. Overige gecontroleerde cijfers

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| 30 | **BLS: 608.100 vacatures/jaar (installatie/onderhoud/reparatie), mediaan $63.510 (mei 2024) voor industrieel-machinemonteurs, +13% groei 2024–34** | **bevestigd** | Alle drie exact bevestigd, en de attributie is correct gescheiden: de 608.100 is groepsniveau, de $63.510 en de 13% zijn de specifieke beroepsgroep. **Nuance:** de **groeps**mediaan is $58.230; het rapport gebruikt terecht het hogere beroepsspecifieke cijfer, maar de lezer moet niet denken dat $63.510 voor de hele groep geldt. Aanvullend: voor industrieel-machinemonteurs specifiek zijn er ~54.200 vacatures per jaar, niet 608.100. | [BLS OOH — groep](https://www.bls.gov/ooh/installation-maintenance-and-repair/home.htm), [BLS OOH — beroep](https://www.bls.gov/ooh/installation-maintenance-and-repair/industrial-machinery-mechanics-and-maintenance-workers-and-millwrights.htm) |
| 31 | **825 actieve raffinaderijen wereldwijd (begin 2025)** — gebruikt als "gedocumenteerd" ankerpunt voor de sitetelling | **onzeker — was ten onrechte als gedocumenteerd gepresenteerd** | Niet uit een primaire bron te bevestigen. Wikipedia geeft alleen capaciteitscijfers en VS-tellingen; IAEA/EIA-pagina's waren niet toegankelijk. Gepubliceerde tellingen variëren sterk met de gehanteerde ondergrens in doorvoercapaciteit. Dit getal is het enige "gedocumenteerde" anker onder een sitetelling waarvan de overige 9.650 sites pure [SCHATTING] zijn — het gaf de tabel meer stevigheid dan gerechtvaardigd. Gemarkeerd in §4.2 stap 1. | geen primaire bron |
| 32 | **~440 reactoren op ~200 nucleaire locaties** | **onzeker** | IAEA PRIS gaf HTTP 402, World Nuclear Association HTTP 404. Orde van grootte is plausibel (gangbare tellingen liggen tussen 410 en 440 operabele reactoren), maar de sitetelling van ~200 is niet geverifieerd. | geen primaire bron |
| 33 | **Siemens True Cost of Downtime 2024: $1,4 biljoen = 11% van de omzet Fortune Global 500 (was 8%/$864 mrd), 82% had stilstand** | **onzeker** | De Siemens-URL geeft een 404-pagina; de oorspronkelijke bron in het rapport is een zoekopdracht, geen Siemens-document. De cijfers worden in §1.7 en §8 prominent gebruikt. Zoek de primaire Siemens-publicatie op voordat dit extern wordt geciteerd. | geen primaire bron |
| 34 | **Vertragingskosten: nucleaire outage $1–2 mln/dag, raffinaderij-TAR >$1 mln/dag, AOG $10.000–150.000/uur** | **onzeker** | Bronnen zijn deels leveranciersblogs (OptiScheduleAI, Knowledge Relay, OxMaint — allen partij) en deels zoekopdrachten. Niet getoetst binnen dit budget. De orde van grootte is in lijn met wat het O&G-zusterrapport zegt, maar dat is geen onafhankelijke bevestiging. De conclusie in §8 punt 3 ("de hardste cijfers in het hele onderzoek") is daarmee **te stellig geformuleerd**: het zijn de *hardst klinkende* cijfers, niet de best onderbouwde. | leveranciersbronnen |

### Samenvattend oordeel

**Wat stevig staat.** De inhoudelijke kern van het rapport — het onderscheid tussen de drie regimes, de vaststelling dat onderhoudsscheduling overwegend capaciteitsallocatie is en géén CPM, en de NAVSEA-009-111-analyse — is **onaangetast**. NAVSEA 009-111 is woordelijk uit het origineel geverifieerd en levert precies wat het rapport claimt: een contractueel verplicht CPM-schema dat in `.xls` mag worden opgeleverd. Ook Hexagon ALI, IAMTech-prijzen, IBM Maximo-prijzen, Mordor CMMS, MarketsandMarkets EAM, Naval MRO, de Actenum-overname, de Mosaic-DCMA-passage en de BLS-cijfers zijn exact bevestigd.

**Wat niet standhield.** Vier harde fouten: (1) "drie individuele P6-gebruikers ≈ £75.000" is fout met een factor ~9; (2) Hexagon ALI is de derde, niet de tweede divisie; (3) de dienstenmarkt is $5–40 mrd, niet $5–20 mrd; (4) de DFARS-compliance-drempel is $50 mln volgens de geldende regeltekst, niet $100 mln. Daarnaast twee rekenkundige inconsistenties: de seat-som (94.500, niet 90.000) en de groeivoet (7–9% gewogen, niet 8–11%).

**De belangrijkste structurele kritiek.** De top-downkruiscontrole in §4.2 is **circulair** en bevestigt niets: hij gebruikt dezelfde brongetallen en vrijwel hetzelfde percentage als de bottom-upberekening waarvan hij de uitkomst zou moeten toetsen. Bijna twee derde van de sizing (component A) rust daarmee op één ongetoetste aanname — dat 10–20% van een EAM/CMMS-licentie "de schedulingfunctie" is. Die 10–20% is nergens onderbouwd. Voor extern gebruik is dat het getal dat als eerste zal worden aangevallen.

**Waar de onzekerheid geconcentreerd zit.** De componenten B en C hangen aan drie niet-primair-geverifieerde getallen: de P6-prijs ($305/maand), de raffinaderijtelling (825) en de STO-prijsweging ($110.000). Alle drie zijn eenzijdig gevoelig — een fout erin schuift het CPM-adresseerbare deel evenredig mee. Het rapport presenteert de resulterende $0,45–0,75 mrd echter met twee significante cijfers, wat meer precisie suggereert dan de invoer draagt.

**Aanbeveling.** Presenteer het CPM-adresseerbare deel als **"orde van grootte een half miljard dollar, met een onzekerheid van minstens een factor twee"** in plaats van als een band met twee decimalen. De strategische conclusie — deze sector is geen primaire markt voor een open CPM-planner, behalve via de contractantenlaag en het NAVSEA-formaatgat — verandert daar niet door, en is de best onderbouwde uitkomst van het rapport.
