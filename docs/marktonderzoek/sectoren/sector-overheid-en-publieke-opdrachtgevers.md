# Sectoranalyse: Overheid en publieke opdrachtgevers (infrastructuur)

**Onderzoeksdatum:** 25 juli 2026
**Scope:** nationale en regionale infrastructuurbeheerders en publieke opdrachtgevers — Rijkswaterstaat (NL), ProRail (NL), National Highways / ex-Highways England (UK), Network Rail (UK), Amerikaanse state DOT's en federale agentschappen (FHWA, USACE, DOE, NASA, DoD), plus hun keten van hoofdaannemers, onderaannemers en engineeringbureaus.

---

## 0. Methodologische verantwoording — LEES DIT EERST

Dit rapport is opgesteld onder een harde beperking: **het WebSearch-budget van deze sessie was al volledig verbruikt (200/200) voordat dit onderzoek startte.** Er zijn dus geen zoekopdrachten uitgevoerd. In plaats daarvan is gewerkt met **directe WebFetch-ophalingen op primaire bronnen** (leverancierssites, regelgeving, standaardenorganisaties, encyclopedische bronnen) en met de kennisbasis van het model (cutoff mei 2026).

Om te voorkomen dat schattingen en feiten door elkaar lopen, is **elk cijfer in dit rapport gelabeld**:

| Label | Betekenis |
|---|---|
| `[GEVERIFIEERD]` | In deze sessie opgehaald van de genoemde URL. Citaat of parafrase van wat daar stond. |
| `[KENNISBASIS]` | Uit de modelkennis (cutoff mei 2026). Canonieke bron-URL wordt genoemd, maar is in deze sessie **niet** opnieuw gecontroleerd. Behandel als "waarschijnlijk juist, verifieer voor extern gebruik". |
| `[SCHATTING]` | Eigen berekening/modellering. Redenering en aannames staan er expliciet bij. Geen bron. |

Waar de opdracht vroeg om ≥10 WebSearch-opdrachten: dat was technisch onmogelijk. Er zijn wel **20 WebFetch-ophalingen** gedaan; ~12 daarvan leverden bruikbare inhoud, de rest gaf 404/403/leeg. De bronnenlijst onderaan onderscheidt geslaagde van mislukte ophalingen, zodat een vervolgsessie precies weet waar nog gaten zitten.

**Aanbevolen vervolgacties bij nieuw searchbudget** staan in §9.

---

## 1. Wat deze sector bijzonder maakt qua planning

### 1.1 Schaal — de programma's, niet de projecten, zijn de eenheid

Publieke infrastructuurbeheerders plannen op programma-niveau, niet op projectniveau. De budgetten geven de orde van grootte:

| Organisatie | Financiële schaal | Bron |
|---|---|---|
| **Rijkswaterstaat** | Jaarbudget ca. **€5 miljard**; 5.001–10.000 medewerkers; 7 regionale diensten, 6 specialistische diensten, plus aparte projectdirecties | `[GEVERIFIEERD]` [en.wikipedia.org/wiki/Rijkswaterstaat](https://en.wikipedia.org/wiki/Rijkswaterstaat) |
| **National Highways** (Engeland) | RIS1 (2015–2020) ca. **£15 mld**; RIS2 (2020–2025) **>£27 mld** waarvan **£14 mld** aan verbeteringen. Beheert >4.000 mijl (6.400 km) hoofdwegennet = ~2% van de weglengte maar ~⅓ van al het gemotoriseerde verkeer in Engeland | `[GEVERIFIEERD]` [en.wikipedia.org/wiki/National_Highways](https://en.wikipedia.org/wiki/National_Highways) |
| **Network Rail** | In 2019: **£3,1 mld** renewals + **£3,2 mld** enhancements. Omzet 2024 **£11,5 mld**; totale activa **£90,1 mld**; eigen vermogen **£18,4 mld**. Het genoemde upgradeprogramma van **£38 mld** ⚠️ *is een gedateerd cijfer (Crossrail/Thameslink-tijdperk, beide inmiddels opgeleverd); het actuele meerjarenanker is de **CP7-vaststelling van £43,1 mld** voor 1 apr 2024 – 31 mrt 2029* | `[GEVERIFIEERD]` [en.wikipedia.org/wiki/Network_Rail](https://en.wikipedia.org/wiki/Network_Rail); CP7: [networkrail.co.uk delivery plans 2024–2029](https://www.networkrail.co.uk/who-we-are/publications-and-resources/our-delivery-plans-for-2024-2029/), [orr.gov.uk PR23 final determination](https://www.orr.gov.uk/monitoring-regulation/rail/networks/network-rail/price-controls/pr23/final-determination) |
| **US state DOT's** | ~50 staten + territoria; jaarlijkse federale wegprogramma-uitgaven in de orde van **$60–70 mld/jaar** federaal (FHWA), plus staatsmiddelen; IIJA (2021) is **$1,2 biljoen over acht jaar**, waarvan **$550 mld nieuw geld** en **$650 mld voortzetting van reeds geautoriseerde programma's** ⚠️ *gecorrigeerd: niet "$1,2 biljoen toegevoegd over 5 jaar"* | `[GEVERIFIEERD]` [en.wikipedia.org/wiki/Infrastructure_Investment_and_Jobs_Act](https://en.wikipedia.org/wiki/Infrastructure_Investment_and_Jobs_Act); FHWA-cijfer blijft `[KENNISBASIS]` — [fhwa.dot.gov](https://www.fhwa.dot.gov/) |

Wat dit betekent voor planningssoftware: een enkel programma bij zo'n organisatie omvat routinematig **honderden tot duizenden gelijktijdige projecten**, elk met een eigen planning die maandelijks geactualiseerd wordt. De opdrachtgever moet die planningen kunnen **aggregeren, vergelijken en normaliseren** — dat is een fundamenteel ander probleem dan "één Gantt maken". Het is de reden dat Primavera P6 EPPM (enterprise, database-gedreven, multi-project) hier domineert en desktop-tools het niet halen.

Oracle claimt zelf voor haar hele Construction & Engineering-portfolio: **>$9 biljoen aan projectwaarde**, **>4 miljoen projecten** onder beheer, **>1,8 miljard uitgewisselde documenten**, en bijna **$20 mld/maand** aan verwerkte onderaannemersbetalingen — met o.a. **Texas Department of Transportation** en **DC Water** als expliciet genoemde publieke klanten. `[GEVERIFIEERD]` [oracle.com/construction-engineering](https://www.oracle.com/construction-engineering/)

### 1.2 Doorlooptijd — planningshorizon van 10 tot 25 jaar

Publieke infra kent een formeel gefaseerd besluitvormingsproces dat de planning al jaren vóór de eerste schop bepaalt:

- **Nederland (MIRT):** Verkenning → Planuitwerking → Realisatie, met Tracébesluit, MER, en formele beroepsprocedures bij de Raad van State. Van startbeslissing tot openstelling is 10–20 jaar normaal. `[KENNISBASIS]` — canonieke bron: [mirt-overzicht.nl](https://www.mirtoverzicht.nl/)
- **UK:** Development Consent Order (DCO) via de Planning Inspectorate voor Nationally Significant Infrastructure Projects; National Highways werkt binnen 5-jarige Road Investment Strategy-periodes (RIS1/RIS2/RIS3), Network Rail binnen 5-jarige Control Periods (CP6 2019–2024, CP7 2024–2029). `[GEVERIFIEERD voor RIS/CP-structuur]` zie bronnen hierboven.
- **VS:** NEPA-review (EIS/EA), Federal-aid project development, STIP/TIP-programmering.

**Consequentie voor de tooling:** de planning moet **decennialang mee**, over meerdere softwareversies, meerdere aannemers en meerdere generaties planners heen. Het bestandsformaat is daarmee een **archiveringsvraagstuk**, niet alleen een uitwisselingsvraagstuk. Dit is een van de scherpste openingen voor een open formaat (§7.4).

### 1.3 Resourcecomplexiteit — de schaarse resource is toegang, niet arbeid

Dit is het punt waarop deze sector het meest afwijkt van commerciële bouw. In utiliteitsbouw is de kritieke resource meestal mankracht of materieel. In publieke infra is de kritieke resource **toegang tot een in bedrijf zijnd netwerk**:

- **Spoor:** buitendienststellingen ("possessions" bij Network Rail, "TVP/buitendienststelling" bij ProRail). Deze worden 1–3 jaar vooruit vastgelegd in een landelijke possession-planning. Een project dat zijn venster mist, wacht maanden tot een jaar op het volgende. `[KENNISBASIS]`
- **Weg:** rijstrookafsluitingen, omleidingsroutes, vergunningen voor verkeersmaatregelen, en harde vensters (geen werk in vakantiepieken, geen twee grote afsluitingen tegelijk in dezelfde corridor). RWS stuurt hier op **voertuigverliesuren (VVU)** als beleidsindicator. `[KENNISBASIS]`
- **Water:** stremmingen van vaarwegen, schutkalenders van sluizen, hoogwaterseizoen (in NL: het winterse "buitenwaterseizoen" waarin niet aan dijken gewerkt mag worden).

Technisch vertaalt dit zich naar planningseisen die generieke tools slecht ondersteunen:
1. **Kalender-gedreven vensters met harde uitsluitingen** (niet alleen "werkdagen" maar "alleen deze 54 uur in dit weekend").
2. **Netwerkbrede resourcecontentie tussen projecten** — twee projecten mogen niet dezelfde possession claimen.
3. **Lineaire/chainage-gebaseerde planning** (tijd-wegdiagram): bij wegen, spoor, dijken en leidingen is de locatie langs de as een eerste-klas planningsdimensie. Een CPM-Gantt verbergt precies het conflict dat ertoe doet (twee ploegen die naar elkaar toe werken op dezelfde kilometer). Zie §6.7 en §7.1 — hier ligt een gat in de markt.

### 1.4 Contractuele eisen — de planning ís een contractstuk

In deze sector is de planning geen managementhulpmiddel maar een **juridisch document met betalingsconsequenties**:

- **NEC3/NEC4 ECC** (dominante contractvorm bij National Highways, Network Rail, Environment Agency, en veel UK-lokale overheden): clause 31 (programme ter acceptatie), clause 32 (het bijhouden ervan), met verplichte inhoud zoals startdata, planned Completion, **terminal float**, **time risk allowance**, gezondheids- en veiligheidsvereisten, en "the order and timing of the operations". De Project Manager kan een programme afwijzen op genoemde gronden. NEC4 kent bovendien een sanctie waarbij een kwart van de beoordeelde betaling wordt ingehouden zolang er geen aanvaard programme is. `[KENNISBASIS]` — canonieke bron: [neccontract.com](https://www.neccontract.com/)
- **Nederland:** UAV-GC 2005 met vraagspecificatie, aangevuld met **Systeemgerichte Contractbeheersing (SCB)** en **Best Value Procurement (BVP)** — beide termen worden door Rijkswaterstaat expliciet als hun werkwijze genoemd, naast EMVI-gunning voor de GWW-sector. `[GEVERIFIEERD]` [rijkswaterstaat.nl/zakelijk/zakendoen-met-rijkswaterstaat](https://www.rijkswaterstaat.nl/zakelijk/zakendoen-met-rijkswaterstaat). Recenter verschuift RWS naar **twee-fasencontracten** (ontwerp/prijsvorming gescheiden van realisatie) juist vanwege planningsonzekerheid en risicoverdeling. `[KENNISBASIS]`
- **VS federal-aid en state DOT's:** CPM-specificaties in de standaardbestekken. Typisch geëist: baseline binnen 30–60 dagen na NTP, maandelijkse updates, een narrative report, kritiekepadidentificatie, en **levering in het native bestandsformaat van de tool** — in de praktijk een Primavera **XER**. Voorbeelden: Caltrans, TxDOT, FDOT, NYSDOT hebben allemaal eigen CPM-secties in hun standard specifications. `[KENNISBASIS]`
- **FIDIC** (gebruikelijk bij door multilaterale banken gefinancierde publieke infra buiten NL/UK/VS): clause 8.3 Programme.

**Kernpunt:** wie de planning niet in het geëiste formaat aanlevert, krijgt niet betaald. Dat maakt het *formaat* — niet de functionaliteit — de belangrijkste inkoopdriver in deze sector. Dat is tegelijk de sterkste barrière **en** de duidelijkste inbraakroute voor een open tool die dat formaat kan produceren.

### 1.5 Kosten van vertraging — waarom softwarelicenties hier geen discussiepunt zijn

De asymmetrie is extreem:

- **Liquidated damages / boeteclausules** op grote infra liggen typisch in de orde van **€/£ 10.000 – 100.000 per dag**, met uitschieters naar zes cijfers per dag op spoorprojecten met netwerkimpact. `[SCHATTING op basis van kennisbasis van contractpraktijk; individuele contracten variëren sterk]`
- **Network Rail Schedule 4/8-regime:** Network Rail betaalt vervoerders compensatie voor geplande (Schedule 4) en ongeplande (Schedule 8) verstoring. Dit zet een directe geldprijs op planningskwaliteit — een gemiste of overschreden possession kost letterlijk geld aan derden. Orde van grootte: honderden miljoenen £ per jaar over het hele netwerk. `[KENNISBASIS]` — canonieke bron: [orr.gov.uk](https://www.orr.gov.uk/)
- **Maatschappelijke kosten:** RWS rekent vertraging door in voertuigverliesuren; een grote corridorafsluiting die een maand uitloopt kost de economie een veelvoud van de bouwkosten van dat maand. `[KENNISBASIS]`
- **Claims:** de gemiddelde claimwaarde op grote infra loopt in de tientallen miljoenen; de forensische planningsanalyse die zo'n claim onderbouwt of afweert kost zelf al €200k–€2M aan expertise. `[SCHATTING]`

**Tegenover deze bedragen is een licentie van $2.500 per planner ruis.** Zie §3.4 voor de kwantificering van die verhouding — dit is de kern van de hoge betalingsbereidheid.

---

## 2. Welke planningssoftware hier daadwerkelijk gebruikt wordt

### 2.1 Rangorde bij publieke opdrachtgevers en hun keten

Onderstaande rangorde is een **`[SCHATTING]`** op basis van contractpraktijk, vacatureteksten, leveranciersreferenties en de standaardbestekken van publieke opdrachtgevers. De percentages zijn indicatief voor "aandeel van de projecten waarop dit de contractueel leidende tool is" binnen publieke infra wereldwijd, niet voor omzet.

| # | Pakket | Leverancier | Indicatief aandeel (schatting) | Rol waarin het domineert |
|---|---|---|---|---|
| 1 | **Oracle Primavera P6** (Professional + EPPM) | Oracle | ~55–70% | Contractueel leidende planning op grote publieke infra, wereldwijd |
| 2 | **Oracle Primavera Cloud (OPC)** | Oracle | ~5–10%, snel groeiend | Opvolger van P6; Oracle stuurt actief op migratie |
| 3 | **Microsoft Project** (desktop + Plan 3/5) | Microsoft | ~10–15% | Kleinere publieke opdrachtgevers, gemeenten/provincies/waterschappen, interne staffuncties, engineeringbureaus |
| 4 | **Asta Powerproject** | Eleco / Elecosoft | ~5–10% (UK: veel hoger) | UK-hoofdaannemers en -ingenieursbureaus; sterk in civiel + gebouwen |
| 5 | **Deltek Acumen** (Fuse / Risk / Touchstone) | Deltek | Analyselaag, geen primaire planner | Reviewzijde bij de opdrachtgever; schedule-quality-poortwachter |
| 6 | **Bentley SYNCHRO** (4D + Perform) | Bentley Systems | ~3–5% als 4D-laag | 4D-simulatie en voortgang op de bouwplaats, náást P6 |
| 7 | **InEight Schedule** | InEight (Kiewit) | ~2–4% | Grote civiele aannemers in NA; transport, nucleair, water |
| 8 | **Safran Project / Safran Risk** | Safran Software Solutions | ~1–3% | Defensie, olie & gas, Noord-Europa; EVM-zwaar |
| 9 | **Trimble TILOS** | Trimble | <2%, aflopend | Lineaire planning (tijd-wegdiagram) voor weg/spoor/leiding |
| 10 | Overig: Spider Project, Phoenix, ARES PRISM, Hexagon EcoSys, Powerproject Vision, Excel | divers | rest | Niches, kostenintegratie, en zeer veel Excel bij onderaannemers |

### 2.2 Wat de bronnen bevestigen

**Primavera P6 als de facto standaard.** Oracle positioneert P6 EPPM letterlijk als "The Standard for Planning and Scheduling" met CPM-scheduling voor grootschalige programma's, resourcemanagement met optimalisatie en capaciteitsplanning, en geïntegreerd kosten-/planningsbeheer. Opvallend: de pagina duwt actief richting Oracle Primavera Cloud in plaats van de bestaande P6 EPPM-eigenschappen uit te diepen. `[GEVERIFIEERD]` [oracle.com/uk/construction-engineering/primavera-p6](https://www.oracle.com/uk/construction-engineering/primavera-p6/)

De marktpositie is historisch geworteld: al in 2008 gebruikte **25% van de zware-bouwsector** Primavera P3, tegen 11% voor de nummer twee; bijna **40%** van de algemene aannemers met $5–10M omzet gebruikte het. Oracle nam Primavera over in 2008; P3 en SureTrak gingen uit verkoop op 31 december 2010. `[GEVERIFIEERD]` [en.wikipedia.org/wiki/Primavera_(software)](https://en.wikipedia.org/wiki/Primavera_(software))

**Oracle's publieke referenties in deze sector:** Texas Department of Transportation en DC Water worden bij naam genoemd, naast aannemers als Fluor, Skanska, Lendlease, Turner en McCarthy. `[GEVERIFIEERD]` [oracle.com/construction-engineering](https://www.oracle.com/construction-engineering/)

**Deltek Acumen als reviewlaag bij de overheid.** Acumen toetst planningen tegen **600+ metrieken** die expliciet aansluiten op de standaarden van **DCMA, DOE, NASA, GAO en AACE**, en ondersteunt federale compliance-eisen waaronder **IPMDAR**-rapportageformaten en **DECM**-gerichte diagnostiek. De modules: **Fuse** (diagnostiek en forensiek, inclusief wijzigingen tussen updates), **Risk/360** (risicomodellering en herstelscenario's) en **Touchstone** (geautomatiseerde schedule-submittalportal met scoring en feedback). Doelgroepen expliciet: government contracting (GovCon), defensie, infrastructuurprogramma's. `[GEVERIFIEERD]` [deltek.com/en/products/project-and-portfolio-management/acumen](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)

> **Touchstone is het meest onderschatte product in deze sector.** Het is precies het mechanisme waarmee een publieke opdrachtgever honderden binnenkomende aannemersplanningen per maand automatisch kan scoren en afwijzen. Wie de opdrachtgeverskant van deze markt wil begrijpen, moet begrijpen dat de opdrachtgever niet plant — hij **keurt**.

**Asta Powerproject** won zeven jaar op rij (t/m 2020) de UK Construction Computing Award voor "Project Management Software of the Year", een prijs waarop klanten stemmen. Het positioneert zich op "commerciële gebouwen, woningbouw, sociale huisvesting en civiele techniek van alle groottes". `[GEVERIFIEERD]` [eleco.com/software/asta-powerproject](https://eleco.com/software/asta-powerproject)

**Bentley SYNCHRO** levert **SYNCHRO 4D** (4D-modelplanningen en -simulaties, model-gebaseerde hoeveelheidsbepaling, WBS, federatie van modellen) en **SYNCHRO Perform** (dagelijkse productiviteit en voortgang op de werkplek, **earned value-KPI's**, vastleggen van werkelijke waarden tegen geplande taken, dagrapporten). Genoemde referenties met publieke-infrarelevantie: Laing O'Rourke (spoor), ACCIONA (Melbourne rail modernisation), Sacramento Regional County Sanitation (waterzuivering), bruggenbouw. `[GEVERIFIEERD]` [bentley.com/software/synchro](https://www.bentley.com/software/synchro/) — *let op: de pagina noemt IFC-ondersteuning niet expliciet.*

**InEight Schedule** biedt "volledige CPM-mogelijkheden met geïntegreerde look-ahead-planning en risicomanagement", gericht op o.a. **transport, power & renewables, nucleair, water** — precies de publieke-infrasegmenten. Kernclaim is de koppeling tussen planners en calculatoren binnen één platform. `[GEVERIFIEERD]` [ineight.com/products/schedule](https://ineight.com/products/schedule/)

**Microsoft Project** blijft breed aanwezig maar in een andere rol — zie §3.1 voor de geverifieerde prijzen.

### 2.3 Wie gebruikt wat — per rol in de keten

| Rol | Primaire tool | Secundair | Waarom |
|---|---|---|---|
| **Publieke opdrachtgever (programma-/portfolioniveau)** | P6 EPPM of Oracle Primavera Cloud als centraal register | Acumen Fuse/Touchstone voor review; EcoSys/Unifier voor kosten; Power BI over XER-extracten | Moet honderden aannemersplanningen aggregeren, normaliseren en toetsen. Plant zelf nauwelijks; keurt en rapporteert. |
| **Publieke opdrachtgever (projectteam / contractbeheersing)** | P6 Professional | MS Project voor eigen interne mijlpalen; Excel voor stakeholderplanningen | Moet de aannemersplanning kunnen openen en narekenen. Vaak minder P6-vaardig dan de aannemer — een structurele asymmetrie. |
| **Hoofdaannemer (tier 1)** | P6 (contractueel verplicht) | Asta Powerproject (UK), eigen 4–6-weeks look-ahead in Excel/Lean-borden (Last Planner System), SYNCHRO voor 4D | P6 omdat het contract het eist; de *werkelijke* werkvoorbereiding gebeurt vaak buiten P6. |
| **Onderaannemer (tier 2/3)** | **Excel**, soms MS Project | Papier, WhatsApp, Bouw-app | Heeft geen P6-licentie en krijgt die niet. Levert data aan via de hoofdaannemer, die het overtikt. **Dit is de grootste functionele bloedneus in de keten.** |
| **Engineeringbureau / adviseur** | MS Project of P6 (afhankelijk van opdrachtgever) | Deltek Vantagepoint/Vision voor eigen resourceplanning; Acumen bij claim-/reviewopdrachten | Werkt voor beide zijden; heeft vaak dubbele licenties. |
| **Claim-/forensisch expert** | P6 + Acumen Fuse + Excel | Schedule Analyzer, Steelray, eigen scripts op XER | Moet historische updates uit oude P6-versies kunnen openen — zie §5.7. |

---

## 3. Wat ervoor betaald wordt

### 3.1 Geverifieerde lijstprijzen

**Microsoft Project** — de enige leverancier in dit veld die openlijk prijzen publiceert:

| Product | Prijs | Inhoud |
|---|---|---|
| Project Standard 2024 | **$679,99** eenmalig | Planning-, taak- en kostenbeheer; Gantt, kalender, netwerkdiagram |
| Project Professional 2024 | **$1.129,99** eenmalig | Alles uit Standard + resourcebeheer, timesheets, serverkoppeling |
| Project Server Subscription Edition | "neem contact op met partner" | Portfoliobeheer, BI, issue-/risicobeheer, resourceoptimalisatie |

`[GEVERIFIEERD]` [microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software)

Microsoft duwt gebruikers richting **Planner en Project Plan 3** (cloud, inclusief Project Online Desktop Client met Kanban). Per-gebruiker-per-maand-prijzen voor Plan 1/3/5 stonden niet op deze pagina. Uit kennisbasis: Planner Plan 1 ~$10, Project Plan 3 ~$30, Project Plan 5 ~$55 per gebruiker per maand. `[KENNISBASIS]` — canonieke bron: [microsoft.com/microsoft-365/planner/compare-plans-options](https://www.microsoft.com/en-us/microsoft-365/planner/compare-plans-options) *(deze URL gaf 404 in deze sessie)*

### 3.2 Niet-gepubliceerde prijzen — Oracle, Deltek, Bentley, Eleco, InEight

**Geen van de dominante leveranciers in deze sector publiceert prijzen.** Dat is in deze sessie expliciet vastgesteld:

- Oracle: de Primavera-prijslijst-PDF's en de Oracle-prijslijstindex gaven **404**. De P6-productpagina noemt geen prijzen. `[GEVERIFIEERD als afwezigheid]`
- Deltek Acumen: "Geen prijsinformatie wordt verstrekt op de webpagina. Geïnteresseerden moeten een demo aanvragen of contact opnemen met sales." `[GEVERIFIEERD]` [deltek.com](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)
- Bentley SYNCHRO: "Specifieke prijsinformatie wordt niet verstrekt op deze pagina." `[GEVERIFIEERD]` [bentley.com/software/synchro](https://www.bentley.com/software/synchro/)
- Eleco/Asta: geen prijzen of edities op de productpagina. `[GEVERIFIEERD]` [eleco.com/software/asta-powerproject](https://eleco.com/software/asta-powerproject)
- InEight: verwijst naar "enterprise pricing (custom proposals)" en per-gebruiker maand/jaar via "InEight NOW"; geen bedragen. `[GEVERIFIEERD]` [ineight.com/products/schedule](https://ineight.com/products/schedule/)

**Dit is zelf een bevinding.** Prijsopaciteit is in deze sector functioneel: publieke inkopers moeten via aanbesteding, waardoor de leverancier per traject kan prijzen. Het maakt vergelijkend inkopen duur en versterkt de gevestigde partij. Voor een open-source alternatief is *gepubliceerde, verifieerbare* nulprijs een inkooptechnisch argument op zich.

### 3.3 Prijsindicaties uit kennisbasis en modellering

Onderstaande bedragen zijn **`[KENNISBASIS]`/`[SCHATTING]`** en moeten worden geverifieerd voordat ze extern gebruikt worden. Ze weerspiegelen de orde van grootte zoals die in de markt circuleert (resellerquotes, publieke aanbestedingsuitslagen, gebruikersfora).

| Product | Perpetual per named user | Jaarlijkse support | Abonnement per gebruiker/jaar | Label |
|---|---|---|---|---|
| Primavera P6 Professional | ~$2.500–3.000 | ~22% van licentie (~$550–660) | n.v.t. of ~$1.000–1.500 | `[KENNISBASIS/SCHATTING]` |
| Primavera P6 EPPM | ~$4.500–5.500 | ~22% (~$1.000–1.200) | n.v.t. | `[KENNISBASIS/SCHATTING]` |
| Oracle Primavera Cloud | n.v.t. | inbegrepen | ~$1.200–2.400 (≈$100–200/mnd) | `[SCHATTING]` |
| Asta Powerproject (per seat) | ~£1.400–2.500 | ~15–20% | ~£600–900 | `[SCHATTING]` |
| Deltek Acumen Fuse | ~$5.000–12.000 | ~18–20% | ~$3.000–6.000 | `[SCHATTING]` |
| Deltek Acumen Touchstone (server, enterprise) | n.v.t. | — | **zescijferig per jaar** bij een groot agentschap | `[SCHATTING]` |
| Bentley SYNCHRO 4D | via Virtuoso/E365-subscriptie | — | ~$5.000–10.000 | `[SCHATTING]` |
| InEight Schedule | n.v.t. | — | ~$1.500–3.000 | `[SCHATTING]` |

**Aanvullende kostenposten die in deze sector vaak groter zijn dan de licentie:**

| Post | Indicatie | Label |
|---|---|---|
| Implementatie van een enterprise P6 EPPM-omgeving bij een agentschap (databases, integraties, WBS-/codeboekstandaardisatie, migratie) | **$250k – $2M**, licentie vaak <40% van het totaal | `[SCHATTING]` |
| Jaarlijkse hosting/beheer (Oracle DB, applicatieservers, DBA-tijd) | **$80k – $400k/jaar** | `[SCHATTING]` |
| P6-training per planner (basiscursus 3 dagen) | **€1.200 – €2.500** | `[SCHATTING]` |
| Externe trainer/consultant per dag | **€900 – €1.800** | `[SCHATTING]` |
| Raamovereenkomst project-controls-software bij een groot publiek agentschap (5 jaar, inclusief diensten) | **$1M – $10M** | `[SCHATTING]` |
| Externe planningsreview/second opinion per groot project per jaar | **€50k – €300k** | `[SCHATTING]` |
| Forensische planningsanalyse bij een claim | **€200k – €2M** | `[SCHATTING]` |

### 3.4 Betalingsbereidheid: **hoog**, maar traag en formeel

**De belangrijkste verhouding.** Neem een publiek programma van €1 miljard met 25 planners over de hele looptijd. Softwarekosten over 5 jaar: 25 × ~€1.500/jaar × 5 = ~€190.000, plus zeg €300.000 implementatie/training = **~€0,5M op €1.000M = 0,05% van het programmabudget.** Eén dag vertraging kost hetzelfde project vaak meer dan de hele meerjarige softwarelicentie. `[SCHATTING, redenering expliciet]`

Dat is de reden dat de prijselasticiteit hier bijna nul is. Een planner beter laten werken is honderd keer meer waard dan zijn licentie kost.

**Waarom hoog:**
1. **Licentie is ruis t.o.v. programmabudget** (bovenstaande 0,05%-berekening).
2. **Vertraging is direct financieel meetbaar** — LD's, Schedule 8, verkeersverliesuren.
3. **Compliance is niet-onderhandelbaar.** Als een federaal contract EIA-748/IPMDAR eist, moet de tool het kunnen; prijs is dan geen selectiecriterium meer.
4. **Publieke verantwoording.** NAO, Algemene Rekenkamer, GAO, IPA/GMPP-gateway reviews en DCMA-surveillance dwingen auditeerbaarheid af. Auditeerbaarheid koop je.
5. **Risicoaversie in de inkoop.** Kiezen voor de marktstandaard is voor een publieke inkoper carrièreveilig; kiezen voor een alternatief is dat niet. "Nobody ever got fired for buying P6."
6. **Externe review is duurder dan software.** Eén claimzaak vermeden = tientallen jaren licenties terugverdiend.

**Waarom traag en beperkt:**
1. **Aanbestedingsrecht.** EU-drempels (Richtlijn 2014/24/EU), WTO GPA, FAR in de VS. Een tool aanschaffen kost 6–18 maanden. `[KENNISBASIS]`
2. **Security- en soevereiniteitseisen.** In de VS: FedRAMP-autorisatie voor cloud; in NL/EU: BIO, ISO 27001, gegevenslocatie, en groeiende weerstand tegen Amerikaanse SaaS. Dit vertraagt cloudmigratie en opent ruimte voor lokaal draaiende software.
3. **Budgethouderschap ligt bij het project, niet centraal.** Waardoor enterprise-uitrollen politiek zwaar zijn en versnippering ontstaat.
4. **Zero-cost-software wordt niet vertrouwd zonder support-SLA.** Een open-source tool zonder aansprakelijke partij komt niet door de inkoopcheck. Zie §7.9.
5. **Seats worden bewust schaars gehouden.** Omdat de licentie per named user is, geeft de opdrachtgever geen seats aan onderaannemers of aan minder centrale rollen. Dat is *niet* een kostenbesluit maar een administratief besluit — en het creëert het gat in §7.2.

---

## 4. Hoe groot is dit segment

### 4.1 Waarom er geen kant-en-klaar cijfer bestaat

Analisten (Gartner, IDC, Grand View, Mordor) meten "project management software" of "construction management software" als geheel; ze publiceren geen snede "planningssoftware bij publieke infra-opdrachtgevers". De pogingen om zulke rapporten in deze sessie op te halen faalden (403/404 — zie bronnenlijst). Onderstaande is daarom een **eigen bottom-up model**, expliciet gemarkeerd als schatting.

### 4.2 Bottom-up model — seats × prijs

**Stap 1 — Hoeveel mensen openen dagelijks planningssoftware voor publiek-opdrachtgeverwerk?**

Redenering:
- Vuistregel uit de project-controls-praktijk: **ca. 1 fulltime planner per €20–50M jaarlijkse projectomzet** op complexe infra, over de hele keten (opdrachtgever + aannemer + engineering) samen. `[SCHATTING]`
- ~~Wereldwijde publieke infrastructuurinvesteringen: orde **$2,5–3,5 biljoen per jaar**~~ ⚠️ **GECORRIGEERD — deze bovengrens is niet houdbaar.** De genoemde bron zegt iets anders: de Global Infrastructure Outlook raamt **$79 biljoen "current trends"-investering en $94 biljoen behoefte over 2016–2040** — dat is **~$3,2 biljoen/jaar feitelijke en ~$3,8 biljoen/jaar benodigde investering**, maar dan over **alle zeven sectoren (energie, telecom, weg, spoor, lucht-, zeehavens, water) en over publiek én privaat eigendom samen**. Telecom is vrijwel volledig privaat en een groot deel van energie eveneens. De *publieke* deelverzameling ligt dus substantieel lager. Verdedigbare band: **~$1,5–2,5 biljoen/jaar.** `[GEVERIFIEERD voor het brontotaal]` [outlook.gihub.org](https://outlook.gihub.org/) — de publieke/private splitsing zelf kon niet worden opgehaald en blijft `[SCHATTING]`.
- Maar: het merendeel van die investering wordt geplánd met eenvoudige middelen. Alleen het complexe segment (grote projecten, formele contracten, CPM-eisen) draagt licenties. Stel dat **30–40%** onder een regime valt dat professionele planningssoftware vereist → oorspronkelijk **$0,8–1,4 biljoen/jaar**; **na correctie $0,45–1,0 biljoen/jaar**.
- Bij 1 planner per €35M → oorspronkelijk **~23.000–40.000** fulltime planners. ⚠️ *Twee kanttekeningen:* (a) hier wordt een **dollarbedrag door een euro-vuistregel gedeeld**; bij ~1,08 USD/EUR is €35M ≈ $37,8M, wat de uitkomst ~8% verlaagt; (b) de eigen bandbreedte van de vuistregel (€20–50M) wordt genegeerd ten gunste van één puntwaarde, wat de onzekerheid kunstmatig wegpoetst. **Na correctie: ~12.000–26.000 fulltime planners.**
- Maar planningssoftware wordt door veel meer mensen geopend dan alleen fulltime planners: projectleiders, contractmanagers, werkvoorbereiders, kostendeskundigen, reviewers. **Factor 6–10× de fulltime planners** voor totale seats/named users. `[SCHATTING]`

→ ~~**Geschat aantal betaalde seats in dit segment: 180.000 – 350.000.** Rekenwaarde: **~250.000.**~~

⚠️ **REKENFOUT.** Factor 6–10 op 23.000–40.000 geeft **138.000–400.000**, niet 180.000–350.000. De gepubliceerde band is zonder motivering versmald aan beide zijden. Met de gecorrigeerde plannerbasis (12.000–26.000) wordt het **~71.000–265.000 seats, rekenwaarde ~150.000.**

**Onafhankelijke tegenproef die de oorspronkelijke seatcount onderuit haalt.** Neem het aandeel Asta Powerproject uit dit model: 10% van 250.000 seats × $800 = **~$20M Asta-omzet in alleen het publieke segment**. Eleco plc (moederbedrijf van Asta Powerproject, beursgenoteerd en dus controleerbaar) boekte over **heel 2025 £38,8M concernomzet** — over álle producten (Powerproject, Bidcon, Staircon, ShireSystem), álle sectoren (utiliteitsbouw én civiel) en álle klanttypen (privaat én publiek). Powerproject is daarvan een deelverzameling. Het model schrijft Asta dus in één marktsegment een omzet toe die in de buurt komt van de totale concernomzet van de eigenaar — dat kan niet kloppen en bevestigt dat de seatcount minstens een factor ~2 te hoog stond. `[GEVERIFIEERD]` [investegate.co.uk — Eleco plc Final Results 2025](https://www.investegate.co.uk/announcement/rns/elecosoft-public-limited-company--elco/final-results/9540473)

**Stap 2 — Gemiddelde jaarlijkse softwarebesteding per seat**

Gewogen mix:
- 60% P6-achtig (perpetual geamortiseerd + 22% support, of cloud): ~$1.100/jaar
- 20% MS Project (Plan 3 of geamortiseerde desktop): ~$350/jaar
- 10% Asta/InEight/Safran: ~$800/jaar
- 10% analyselaag (Acumen, SYNCHRO, risicotools) verdeeld over de basis: ~$400/jaar extra gemiddeld over alle seats

→ ~~**Gewogen gemiddelde: ~$900 per seat per jaar**~~ ⚠️ **REKENFOUT.** De vier gewichten sommeren tot 100% (60+20+10+10), dus het gewogen gemiddelde is:
`0,60×$1.100 + 0,20×$350 + 0,10×$800 + 0,10×$400 = $660 + $70 + $80 + $40 =` **$850**, niet $900.

De formulering is bovendien intern tegenstrijdig: "10% analyselaag" (een gewicht) versus "~$400/jaar extra gemiddeld over alle seats" (een opslag). Onder de tweede lezing wordt het `$810/0,9 + $400 =` **~$1.300**. Geen van beide lezingen levert $900 op. Aangehouden: **$850 per seat per jaar** (licentie + support, exclusief diensten). `[SCHATTING, herrekend]`

**Stap 3 — Licentieomzet**

Oorspronkelijk: 250.000 × $900 = ~$225M. Herrekend met de gecorrigeerde invoer: **150.000 × $850 = ~$128M per jaar**, bandbreedte **71.000–265.000 seats × $850 = $60M – $225M** aan pure planningssoftwarelicenties in het publieke-opdrachtgeversegment. `[SCHATTING]`

**Stap 4 — Diensten meerekenen**

In deze sector is de verhouding licentie : implementatie/integratie/training/hosting historisch **1 : 1,5 tot 1 : 2,5** (enterprise-uitrollen, standaardisatie van codeboeken, integraties met financiële systemen, doorlopende governance).

→ Diensten, herrekend: **$90M – $560M** (centraal ~$255M).

**Stap 5 — Totaal**

⚠️ **De oorspronkelijke totaaltabel was intern inconsistent op drie punten:** (a) de dienstenrij ($250M–$700M) kwam niet overeen met de uitkomst van stap 4 ($340M–$560M) en werd nergens afgeleid; (b) de som van de tabelrijen is $400M–$1.040M, terwijl de kop $0,45–1,0 mld claimde — de ondergrens werd 12% opgehoogd; (c) de licentierij ($150M–$340M) volgde niet uit stap 3, die één puntwaarde van $225M gaf.

| Component | Oorspronkelijk gepubliceerd | **Herrekend (2026)** |
|---|---|---|
| Licenties/abonnementen planningssoftware | $150M – $340M | **$60M – $225M** (centraal ~$128M) |
| Directe implementatie-, integratie-, hosting- en trainingsdiensten | $250M – $700M | **$90M – $560M** (centraal ~$255M) |
| **Totaal segment "planningssoftware + directe diensten"** | ≈ $0,45 – 1,0 mld; centraal ~$0,7 mld | **≈ $0,15 – 0,8 miljard per jaar; centrale schatting ~$0,4 miljard** |

`[SCHATTING — alle stappen expliciet hierboven; de herrekening halveert ruwweg de oorspronkelijke centrale schatting]`

> **Waarschuwing bij extern gebruik.** Dit blijft een bottom-up model zonder analistenvalidatie, met een onzekerheidsband van meer dan een factor vijf tussen onder- en bovengrens. De enige harde externe toets die in deze verificatie kon worden uitgevoerd (Eleco's gepubliceerde jaaromzet, zie stap 1) wees éénduidig omlaag. Behandel **$0,4 miljard** als een orde-van-grootte-indicatie, niet als een cijfer.

### 4.3 Bredere afbakening: "project controls" in plaats van alleen planning

Als het segment breder wordt gedefinieerd — planning + kostenbeheersing + EVM + risicoanalyse + documentbeheer/CDE + 4D + veld-voortgang — dan is het **3–5× zo groot**.

⚠️ **REKENFOUT in het gepubliceerde bedrag.** 3–5× toegepast op de oorspronkelijke band $0,45–1,0 mld geeft **$1,35 – 5,0 miljard**, en 3–5× op de centrale $0,7 mld geeft **$2,1 – 3,5 miljard**. Het gepubliceerde "$2,5 – 4 miljard" volgt uit geen van beide en is een niet-afgeleide, versmalde band. Met de herrekende basis (§4.2) wordt het: **3–5× $0,4 mld ≈ $1,2 – 2,0 miljard per jaar (2026)**, met een volledige bandbreedte van **$0,45 – 4,0 miljard**. `[SCHATTING, herrekend]`

Dat is ook de commercieel relevante afbakening, want Oracle, Bentley, Deltek, Hexagon en InEight verkopen hier als suite, niet als losse planner. Oracle's claim van **>$9 biljoen aan beheerde projectwaarde** over de hele C&E-portfolio geeft een gevoel voor de installed base waarover dit verdeeld is. `[GEVERIFIEERD]` [oracle.com/construction-engineering](https://www.oracle.com/construction-engineering/)

### 4.4 Groeirichting

**Richting: groeiend, ~5–9% nominaal per jaar tot 2030.** `[SCHATTING]` Drijvers:

**Omhoog:**
1. **Infrastructuurstimulus.** VS: IIJA (**$1,2 biljoen over acht jaar vanaf 2021, waarvan $550 mld daadwerkelijk nieuw geld** — `[GEVERIFIEERD]` [wikipedia IIJA](https://en.wikipedia.org/wiki/Infrastructure_Investment_and_Jobs_Act); de eerdere formulering "$1,2 biljoen 2021–2026" overschatte zowel het tempo als het nieuwe bedrag) met vervolgtrajecten. EU: RRF, CEF, TEN-T. UK: **RIS3 — inmiddels bevestigd op ~£25–27 mld, maar vertraagd naar april 2026 – maart 2031, met een overbruggingssettlement van £4,8 mld voor 2025/26** (`[GEVERIFIEERD]` [gov.uk RIS3 2026–2031](https://www.gov.uk/government/publications/road-investment-strategy-3-ris3-2026-to-2031)) en **Network Rail CP7 op £43,1 mld voor 2024–2029**. NL: de **vervangings- en renovatieopgave (V&R)** van RWS — een groot deel van de naoorlogse kunstwerken (bruggen, sluizen, viaducten) is aan het einde van de technische levensduur, wat een decennialange golf van complexe, hinder-gevoelige projecten oplevert. `[KENNISBASIS]`
2. **Cloudmigratie verhoogt de omzet per seat.** Perpetual + 22% support (~$1.100/jaar effectief) wordt een abonnement van $1.200–2.400/jaar. Oracle's zichtbare push richting Primavera Cloud is exact dit. `[GEVERIFIEERD als push]` [oracle.com/uk/construction-engineering/primavera-p6](https://www.oracle.com/uk/construction-engineering/primavera-p6/)
3. **Digital twin / 4D-eisen in aanbestedingen** breiden de toolstack uit (SYNCHRO, Aconex, IFC-modelkoppeling).
4. **Toenemende formalisering van schedule quality** (Acumen Touchstone-achtige poortwachters bij meer agentschappen).

**Omlaag / remmend:**
1. **Budgetdruk en inflatie** in publieke infra — meer projecten uitgesteld dan gestart in sommige jurisdicties.
2. **Verzet tegen Amerikaanse SaaS** in EU-overheden (soevereiniteit, dataresidency) remt de cloudmigratie die de omzetgroei moet dragen.
3. **Consolidatie van leveranciers** drukt het aantal betaalde producten per organisatie.
4. **Open-source en open standaarden** (IFC 4.3, buildingSMART) — nog marginaal in omzeteffect, maar beleidsmatig gesteund (NL "open source, tenzij"; EU Open Source Strategy). `[KENNISBASIS]`

---

## 5. Sector-specifieke eisen en standaarden

Dit is het hart van waarom deze sector anders koopt dan elke andere.

### 5.1 EIA-748 / EVMS (VS federaal — en via de keten wereldwijd)

- **FAR Subpart 34.2** vereist een Earned Value Management System voor **major acquisitions for development**, conform **OMB Circular A-11**. Agentschappen mogen EVMS ook via eigen procedures voor andere verwervingen eisen. `[GEVERIFIEERD]` [acquisition.gov/far/subpart-34.2](https://www.acquisition.gov/far/subpart-34.2)
- Het compliance-ijkpunt is expliciet **Electronic Industries Alliance Standard 748 (EIA-748)**: "Als de inschrijver voorstelt een systeem te gebruiken waarvan niet is vastgesteld dat het voldoet aan EIA-748, dient de inschrijver een omvattend plan voor compliance in." `[GEVERIFIEERD, zelfde bron]`
- Verdere eisen uit dezelfde bron: **maandelijkse EVMS-rapportage**, **Integrated Baseline Reviews (IBR's)** om technische inhoud en budgetrealisme te verifiëren, en **doorwerking naar onderaannemers** onder dezelfde regels. `[GEVERIFIEERD]`
- **De dollargrenzen staan niet in FAR 34.2** — die verwijst door naar OMB A-11. `[GEVERIFIEERD als afwezigheid]` Uit kennisbasis: DoD hanteert via DFARS 234.201 doorgaans **≥$20M** voor EVMS-toepassing en **≥$100M** voor volledige EIA-748-systeemvalidatie (bedragen zijn periodiek aangepast). `[KENNISBASIS — verifieer bij gebruik]` — canonieke bron: [acquisition.gov/dfars/subpart-234.2](https://www.acquisition.gov/dfars/subpart-234.2)
- **32 richtlijnen** vormen de kern van ANSI/EIA-748 (oorspronkelijk 35 DoD-criteria, teruggebracht tot 32 en tussen 1995–1998 overgedragen aan de industriestandaard, gepubliceerd mei 1998). Agentschappen die EVM verplichten of gebruiken: **DoD, NASA, DOE, en via OMB alle federale agentschappen**. `[GEVERIFIEERD]` [en.wikipedia.org/wiki/Earned_value_management](https://en.wikipedia.org/wiki/Earned_value_management)

**Waarom dit voor een planner uitmaakt:** EVM dwingt dat elke taak in de planning een budget draagt, dat voortgang objectief gemeten wordt (0/100, 50/50, % complete met earned-value-techniek per werkpakket), en dat de planning en de kostenstructuur (CBS/OBS/WBS/control accounts) structureel gekoppeld zijn. Een planningstool die alleen een Gantt tekent, is hier ongeschikt.

### 5.2 IPMDAR — het moderne federale leveringsformaat

**IPMDAR** (Integrated Program Management Data and Analysis Report, DI-MGMT-81861-serie) verving de oude combinatie van IMS-levering en Contract Performance Report. Kern: de aannemer levert niet alleen rapporten maar het **native schedulebestand** plus gestructureerde datasets (JSON/Excel) die machinaal geanalyseerd kunnen worden.

Deltek bevestigt expliciet dat Acumen "federale compliance-eisen ondersteunt waaronder **IPMDAR**-rapportageformaten en **DECM**-gerichte diagnostiek". `[GEVERIFIEERD]` [deltek.com/en/products/project-and-portfolio-management/acumen](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)

De details van de DID (welke velden, welke schemas) zijn `[KENNISBASIS]` — canonieke bron: [acq.osd.mil/asda/ae/ada/ipm](https://www.acq.osd.mil/asda/ae/ada/ipm/).

**Strategische implicatie:** de trend gaat van "lever een bestand" naar "lever machineleesbare data die de opdrachtgever automatisch kan valideren". Dat is precies de richting waarin een open, gedocumenteerd formaat een voordeel heeft boven een ongedocumenteerd binair/tekstformaat als XER.

### 5.3 DCMA 14-point schedule assessment

De DCMA-14-puntstoets is de bekendste schedule-quality-checklist ter wereld en wordt ver buiten defensie gebruikt — ook door civiele opdrachtgevers en aannemers als interne kwaliteitspoort.

Deltek noemt **DCMA** expliciet als een van de standaardensets waartegen Acumen toetst, naast DOE, NASA, GAO en AACE, met in totaal **600+ metrieken**. `[GEVERIFIEERD]` [deltek.com/en/products/project-and-portfolio-management/acumen](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)

De 14 checks met hun gangbare drempels — `[KENNISBASIS: de exacte drempels konden in deze sessie niet worden opgehaald; de DCMA-PDF gaf 404 en de explainer-URL's gaven 404. Behandel de getallen als indicatief.]`

| # | Check | Gangbare drempel |
|---|---|---|
| 1 | Logic (taken zonder voorganger en/of opvolger) | ≤ 5% |
| 2 | Leads (negatieve lags) | 0% — leads zijn niet toegestaan |
| 3 | Lags | ≤ 5% |
| 4 | Relationship types (aandeel Finish-Start) | ≥ 90% FS |
| 5 | Hard constraints | ≤ 5% |
| 6 | High float (total float > 44 werkdagen) | ≤ 5% |
| 7 | Negative float | 0% |
| 8 | High duration (duur > 44 werkdagen) | ≤ 5% |
| 9 | Invalid dates (actuals in de toekomst / forecast in het verleden) | 0 |
| 10 | Resources (taken met duur maar zonder resource/kosten) | 0 |
| 11 | Missed tasks (taken achter op baseline) | ≤ 5% |
| 12 | Critical path test (kunstmatige vertraging plant door tot einde) | moet doorwerken |
| 13 | CPLI — Critical Path Length Index | ≥ 0,95 |
| 14 | BEI — Baseline Execution Index | ≥ 0,95 |

Canonieke bron: DCMA Earned Value Management System Center — [dcma.mil](https://www.dcma.mil/) *(de directe PDF-URL gaf 404 in deze sessie)*.

**Bijwerking van deze toets:** hij is objectief en automatiseerbaar, dus opdrachtgevers gebruiken hem graag. Maar hij is ook makkelijk te bespelen — zie §6.4 over "teaching to the test".

### 5.4 GAO Schedule Assessment Guide (GAO-16-89G)

- Gepubliceerd **december 2015**, ~240 pagina's, als companion bij de GAO Cost Estimating and Assessment Guide.
- Presenteert **tien best practices** voor het ontwikkelen en onderhouden van een betrouwbare, hoogwaardige planning.
- Eisen aan een planning volgens de gids: laten zien wanneer werk wordt uitgevoerd, prestaties meten tegen goedgekeurde plannen, grote gebeurtenissen en einddata tonen, helpen bepalen of programmaparameters realistisch en haalbaar zijn, analyse mogelijk maken van hoe wijzigingen doorwerken, en waarschuwen wanneer budget of planning moet worden bijgesteld.
- **Formeel is de gids vrijwillig**, niet dwingend: hij is bedoeld om het Congres te ondersteunen bij toezicht en agentschappen te helpen publieke middelen effectief in te zetten. `[GEVERIFIEERD]` [gao.gov/products/gao-16-89g](https://www.gao.gov/products/gao-16-89g)

**In de praktijk is "vrijwillig" misleidend.** Zodra GAO een programma auditeert, is dit de meetlat. Agentschappen die niet aan de tien practices voldoen, krijgen dat in een openbaar rapport te lezen. De feitelijke dwang is reputationeel en politiek, en daarmee sterker dan menige contracteis.

### 5.5 AACE International Recommended Practices

AACE publiceert Recommended Practices aansluitend op het Total Cost Management Framework; ze zijn gratis voor leden en te koop voor niet-leden, en zijn deels branchegeneriek en deels branchespecifiek. `[GEVERIFIEERD dat de RP-collectie bestaat en zo wordt gedistribueerd]` [web.aacei.org/resources/publications/recommended-practices](https://web.aacei.org/resources/publications/recommended-practices) — *de individuele RP-nummers konden op die pagina niet worden opgehaald.*

Meest relevant voor deze sector — `[KENNISBASIS]`:

| RP | Onderwerp | Waarom relevant |
|---|---|---|
| **29R-03** | Forensic Schedule Analysis | De facto wereldstandaard voor claimanalyse; definieert methoden (observational/modeled, static/dynamic, retrospective/prospective) |
| **52R-06** | Time Impact Analysis — As Applied in Construction | De prospectieve methode voor het waarderen van een vertragingsgebeurtenis |
| **14R-90** | Responsibility and Required Skills for a Project Planning & Scheduling Professional | Wordt in functieprofielen en aanbestedingen als competentiereferentie gebruikt |
| **27R-03** | Schedule Classification System | Onderscheidt planningsniveaus/klassen naar rijpheid van de scope |
| **49R-06** | Identifying the Critical Path | Belangrijk omdat "het kritieke pad" niet ondubbelzinnig gedefinieerd is |
| **89R-16** | Schedule Levels of Detail | De Level 1–5 hiërarchie die opdrachtgevers in bestekken voorschrijven |

Deltek bevestigt AACE als een van de metrieksets waartegen Acumen toetst. `[GEVERIFIEERD]`

### 5.6 SCL Delay and Disruption Protocol (UK en Commonwealth)

- Uitgegeven door de **Society of Construction Law** om "alle partijen in het bouwproces te begeleiden bij vertragings- en verstoringskwesties".
- **2e editie, februari 2017**, is de huidige versie; vervangt de 1e editie en Rider 1.
- Beschikbaar in Engels, Frans, Servisch en Arabisch; er is een bijbehorend spreadsheet voor het berekenen van hoofdkantooroverhead en winst; het Protocol wordt in rechtspraak geciteerd. `[GEVERIFIEERD]` [scl.org.uk/resources/delay-disruption-protocol](https://www.scl.org.uk/resources/delay-disruption-protocol)

Inhoudelijk (`[KENNISBASIS]`): het Protocol beveelt aan dat de aannemer een **geaccepteerd baseline-programma** heeft, dit **regelmatig actualiseert en de updates bewaart**, dat vertraging waar mogelijk **prospectief** wordt beoordeeld (time impact analysis), en het beschrijft de gangbare retrospectieve methoden (as-planned vs as-built windows, collapsed as-built, impacted as-planned). De praktische consequentie: **elke maandelijkse update moet als onveranderlijk archiefstuk bewaard blijven**, vaak 12+ jaar (verjaringstermijn onder deed).

### 5.7 Leveringsformaten — waar het echt om draait

| Formaat | Herkomst | Rol in publieke aanbestedingen |
|---|---|---|
| **XER** | Primavera P6 export | **De facto verplichte contractuele levering** in VS/UK infra. Ongedocumenteerd, versiegevoelig, lossy tussen P6-versies. Wordt vrijwel altijd bij naam genoemd in bestekken. |
| **P6 XML** | Primavera | Officiëler alternatief; behoudt meer, wordt door minder tools ondersteund |
| **MPP / MSPDI XML** | Microsoft Project | Geaccepteerd bij kleinere publieke opdrachtgevers; zelden op groot infra |
| **.PP** | Asta Powerproject | Geaccepteerd in UK, vrijwel nergens anders |
| **PDF** | — | Vrijwel altijd óók geëist, als het "leesbare" contractstuk |
| **IFC 4.3 (ISO 16739)** | buildingSMART | Sinds de infrastructuuruitbreiding (spoor, weg, brug, waterweg) formeel geschikt voor deze sector, inclusief `IfcTask`, `IfcWorkSchedule`, `IfcWorkCalendar`, `IfcRelSequence`, `IfcResource`. **Wordt vrijwel nergens als planningsleveringsformaat geëist — dit is precies het gat.** `[KENNISBASIS]` — canonieke bron: [technical.buildingsmart.org/standards/ifc](https://technical.buildingsmart.org/standards/ifc/) |
| **COINS / OTL (NL)** | Rijkswaterstaat / bouwsector NL | Objecttypebibliotheek en informatieleveringsspecificaties; raakt aan planning via objectkoppeling maar dekt CPM niet | `[KENNISBASIS]` |

**De kritieke observatie:** de contracteis is bijna altijd geformuleerd als *"submit the programme in Primavera P6 (.xer) format"* — een **producteis vermomd als formaateis**. Dat is de kern van de lock-in in deze sector, en tegelijk de enige plek waar hij te doorbreken is: een tool die geldige XER en P6 XML schrijft, voldoet aan de letter van de eis zonder Oracle-licentie.

### 5.8 Audits en toezicht

| Jurisdictie | Toezichthouder / mechanisme | Wat het betekent voor planning |
|---|---|---|
| VS | **GAO** (GAO-16-89G), **DCMA** (EVMS-surveillance, 14-point), agentschap-IG's | Planningen worden extern nagerekend en publiek beoordeeld |
| UK | **NAO**, **Infrastructure and Projects Authority (IPA)** met GMPP-portfolio en gateway reviews, **ORR** voor spoor | Programma's krijgen een openbare "delivery confidence"-beoordeling |
| NL | **Algemene Rekenkamer**, **ILT**, parlementaire commissies (vgl. de Tijdelijke commissie Infrastructuurprojecten) | Grote projecten kennen voortgangsrapportages aan de Tweede Kamer |
| EU | **Europese Rekenkamer** voor EU-gefinancierde infra | Cohesie-/CEF-projecten worden op planningsrealisme getoetst |

**Consequentie:** de planning is een publiek document dat achteraf door niet-planners gelezen en beoordeeld wordt. Transparantie en uitlegbaarheid zijn functionele eisen, geen luxe. Een tool die kan laten zien *waarom* een datum uitkomt zoals hij uitkomt, heeft hier een echt voordeel.

### 5.9 Claim- en forensische analyse

Publieke infra genereert bovengemiddeld veel claims, om structurele redenen: vaste prijzen op onvolledige scope, grondverwerving, vergunningen, onvoorziene bodemcondities, en politieke scopewijzigingen.

Wat dit van de tooling vraagt:
1. **Onveranderlijke, herbruikbare updates.** Elke maandelijkse update moet jaren later exact heropend en herberekend kunnen worden.
2. **Volledige audit trail** — wie wijzigde welke logica, wanneer, en met welke reden.
3. **Vergelijkbaarheid tussen updates** (dit is precies de "verandering tussen schedule-updates"-functie die Acumen Fuse biedt). `[GEVERIFIEERD]` [deltek.com](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)
4. **Reproduceerbare CPM-berekening.** Als tool A en tool B (of P6 v8 en P6 v21) bij identieke logica verschillende data geven, is de claim onbeslisbaar. Dit is een reëel en onderschat probleem — zie §7.6.

---

## 6. Voor- en nadelen van de gebruikte pakketten in déze context

### 6.1 Oracle Primavera P6

**Werkt hier goed:**
- **Contractuele acceptatie.** XER is de lingua franca; niemand hoeft te discussiëren over het formaat. Alleen dit al is de helft van de waarde.
- **Schaal.** Programma's van 100.000+ activiteiten over honderden projecten in één database zijn routine.
- **Multi-project resource- en rolplanning**, kostenrekeningen, en het codestelsel (Activity Codes, UDF's, EPS/OBS/WBS) waarmee een agentschap zijn hele portfolio kan normaliseren en doorsnijden.
- **Baselines en audit trail** — precies wat forensische analyse en publieke verantwoording vereisen.
- **Arbeidsmarkt.** Er is een grote, wereldwijde pool van planners die P6 kent. Voor een publieke opdrachtgever is dat een reële risicoreductie.
- **Ecosysteem.** Vrijwel elke analyse-, risico- en 4D-tool leest XER. Dat is een netwerkeffect dat geen concurrent heeft.

**Wringt hier:**
- **Verouderde gebruikerservaring.** De Professional-client is een zware desktopapplicatie; de EPPM-webclient wordt breed als traag ervaren. Oracle's eigen P6-pagina besteedt meer aandacht aan migreren naar de cloud dan aan het product zelf — een signaal dat gebruikers oppikken. `[GEVERIFIEERD als observatie]` [oracle.com/uk/construction-engineering/primavera-p6](https://www.oracle.com/uk/construction-engineering/primavera-p6/)
- **Zware infrastructuur.** Oracle Database, applicatieservers, DBA-capaciteit. Voor een middelgroot agentschap is de TCO ver boven de licentieprijs.
- **XER is ongedocumenteerd en lossy.** Round-trips tussen P6-versies verliezen of vervormen gegevens. Voor een archiveringshorizon van 15+ jaar is dat een structureel risico.
- **Named-user-licenties beperken de keten.** Onderaannemers krijgen geen seat. Gevolg: de werkelijke productieplanning ontstaat in Excel en wordt handmatig ingetikt — met alle fouten van dien.
- **Geen lineaire planning.** Geen tijd-wegdiagram, geen chainage-dimensie. Voor weg, spoor, dijk en leiding — de kern van deze sector — is dat een fundamenteel gemis dat met kunstgrepen (activity codes per kilometersegment) wordt opgevangen.
- **Geen native BIM/IFC-koppeling.** 4D vereist een derde product (SYNCHRO, Navisworks, Fuzor).
- **Migratie-onzekerheid.** De push naar Oracle Primavera Cloud dwingt publieke klanten tot een herinkoop, een datamigratie, en een cloudsoevereiniteitsdiscussie die ze liever niet voeren.

### 6.2 Microsoft Project

**Werkt hier goed:** goedkoop en transparant geprijsd (Standard $679,99 / Professional $1.129,99 eenmalig — `[GEVERIFIEERD]` [microsoft.com](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software)); iedereen kan ermee overweg; naadloos met Office, SharePoint en Power BI; past binnen bestaande Microsoft-raamovereenkomsten van overheden, waardoor de inkoop triviaal is.

**Wringt hier:** schaalt slecht boven ~10–20k activiteiten; multi-project resource pooling is zwak zonder Project Server/Online; wordt op grote infra zelden als contractuele leveringsvorm geaccepteerd; baseline- en forensische mogelijkheden zijn dun; en er is **roadmapsonzekerheid** — Microsoft duwt richting Planner/Project Plan 3 in de cloud terwijl de klassieke serverlijn stilstaat. `[GEVERIFIEERD dat Microsoft naar Planner+Plan 3 duwt]` (zelfde bron). Publieke klanten die 15 jaar vooruit moeten kijken, vinden dat oncomfortabel.

### 6.3 Asta Powerproject

**Werkt hier goed:** zeer sterke reputatie in de UK-markt (zeven opeenvolgende klantgekozen awards t/m 2020 — `[GEVERIFIEERD]` [eleco.com](https://eleco.com/software/asta-powerproject)); prestatie en gebruiksgemak worden hoger gewaardeerd dan P6; goedkoper; heeft een 4D-module; sterk in gefaseerde bouwplaatslogistiek.

**Wringt hier:** buiten UK/Ierland/DACH nauwelijks geaccepteerd; het `.pp`-formaat wordt door Amerikaanse publieke opdrachtgevers niet als contractueel leveringsformaat erkend; kleinere pool ervaren planners en analisten; minder ecosysteem van derde-partij-analysetools.

### 6.4 Deltek Acumen (Fuse / Risk / Touchstone)

**Werkt hier goed:** het maakt planningsreview **objectief en schaalbaar** — een opdrachtgever kan honderden binnenkomende planningen per maand automatisch scoren en van feedback voorzien via Touchstone; **600+ metrieken** die aansluiten op DCMA, DOE, NASA, GAO en AACE dekken vrijwel elk agentschapsregime; wijzigingsanalyse tussen updates is precies wat claimverdediging nodig heeft; ondersteunt IPMDAR en DECM. `[GEVERIFIEERD]` [deltek.com](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)

**Wringt hier:**
- **Duur**, en de kosten liggen bij de opdrachtgever terwijl de last bij de aannemer valt.
- **"Teaching to the test".** Zodra planners weten dat er op 14 metrieken gescoord wordt, optimaliseren ze op die metrieken in plaats van op realisme. Een planning met 0% negative float en 4% high float kan volstrekt fictief zijn. Dit is de bekendste kritiek op het DCMA-regime en hij is terecht.
- **Vereist P6-kennis** en zit stevig in het Deltek-ecosysteem.
- **Vergroot de asymmetrie** tussen goed geoutilleerde tier-1-aannemers (die Fuse zelf draaien voor indiening) en kleinere partijen (die verrast worden door een afwijzing).

### 6.5 Bentley SYNCHRO

**Werkt hier goed:** echte model-gedreven 4D met breakdown van ontwerpmodellen in bouwbare componenten, model-gebaseerde hoeveelheidsbepaling en federatie van modellen; **SYNCHRO Perform** koppelt voortgang op de bouwplaats aan **earned value-KPI's** — precies de brug tussen veldrealiteit en EVM-rapportage die publieke opdrachtgevers missen; bewezen op grote publieke infra (spoor, waterzuivering, bruggen). `[GEVERIFIEERD]` [bentley.com/software/synchro](https://www.bentley.com/software/synchro/)

**Wringt hier:** het is een **aanvulling op**, geen vervanging van P6 — de CPM-motor is niet waar de waarde zit, dus je betaalt twee stacks; Bentley's licentiemodel (Virtuoso-subscripties, E365) is ondoorzichtig en past slecht bij publieke inkoopprocessen die vaste stuksprijzen willen.

⚠️ ~~*en de productpagina noemt IFC-ondersteuning niet expliciet, wat voor een opdrachtgever met open-standaardenbeleid een lastige vraag oplevert*~~ — **WEERLEGD.** Dit was een ongeldige gevolgtrekking van "niet genoemd op de marketingpagina" naar "ondersteunt het mogelijk niet". Bentley's eigen kennisbank stelt dat **SYNCHRO 4D Pro circa 58 3D-modelformaten importeert, waaronder expliciet IFC** (naast DWF, DWG, DGN, SKP, 3D PDF), en de officiële trainingsmaterialen beschrijven de IFC-importroute stap voor stap. IFC-ondersteuning is dus geen open vraag en geen zwakte van SYNCHRO. `[GEVERIFIEERD]` [bentleysystems.service-now.com KB0017511 — "SYNCHRO Construction Solution — Importing other formats"](https://bentleysystems.service-now.com/community?id=kb_article&sysparm_article=KB0017511)

### 6.6 InEight Schedule

**Werkt hier goed:** integratie tussen calculatie en planning ("schedulers en estimators werken vanuit een gemeenschappelijke draad" terwijl ze hun eigen structuren houden) is een reëel probleem dat het oplost; CPM + look-ahead + risico in één; expliciete focus op transport, nucleair en water. `[GEVERIFIEERD]` [ineight.com/products/schedule](https://ineight.com/products/schedule/)

**Wringt hier:** installed base bij publieke *opdrachtgevers* is dun (het is van oorsprong een aannemersplatform, ontstaan bij Kiewit); de eigendomsstructuur roept bij sommige opdrachtgevers vragen op over neutraliteit; en het lost het contractuele XER-probleem niet op — het schrijft ernaartoe.

### 6.7 Trimble TILOS en het gat in lineaire planning

TILOS was decennialang het enige serieuze tijd-wegdiagram-pakket voor lineaire infra (weg, spoor, pijpleiding, dijk, tunnel). ~~Uit kennisbasis: Trimble heeft het product de afgelopen jaren afgebouwd/uit de actieve verkoop gehaald.~~

⚠️ **GECORRIGEERD — de richting klopt, de formulering niet.** Tilos is *niet* stilletjes "de afgelopen jaren afgebouwd". Trimble heeft een **formele End-of-Maintenance-aankondiging** gedaan: Tilos gaat **per 1 maart 2026** de End-of-Maintenance-fase in, en **Tilos 11.1 MR4 is de laatste release**. Tegelijk staat het product **nog steeds actief op de Trimble-productsite** met demo-aanvraag, downloads en klantcommunity — er staat daar géén sunset-melding. `[GEVERIFIEERD via Trimble-distributeur]` [help.buildingpoint.com.au — "Important Announcement: Tilos Entering End of Maintenance on 1 March 2026"](https://help.buildingpoint.com.au/hc/en-au/articles/55527556493849--Important-Announcement-Tilos-Entering-End-of-Maintenance-on-1-March-2026) (directe fetch gaf 403; bevestigd via twee onafhankelijke zoekmachine-indexeringen van dezelfde aankondiging) en [construction.trimble.com/en/products/tilos](https://construction.trimble.com/en/products/tilos) `[GEVERIFIEERD als afwezigheid van een sunset-melding]`. Een door Trimble aanbevolen opvolgproduct is niet gevonden.

**Conclusie blijft overeind, en is nu zelfs scherper dan het rapport oorspronkelijk durfde te stellen:** vanaf maart 2026 is er geen volwassen, actief *doorontwikkelde* tijd-wegdiagramtool meer op de markt, terwijl de behoefte in deze sector groeit (V&R-opgave, corridorprojecten, spoorverdubbelingen). Bestaande Tilos-licenties blijven werken en het product is nog verkrijgbaar, dus dit is een *aflopende* leegte met een dateerbaar startpunt — geen leegte die er vandaag al volledig is. Dit is het scherpst afgebakende gat in het hele landschap, en het heeft nu een datum.

### 6.8 De Excel-onderlaag

Ondanks alle enterprise-tooling wordt een groot deel van het feitelijke werk in **Excel** gedaan: 4–6-weekse look-aheads, onderaannemersplanningen, mijlpaaldashboards voor bestuurders, en stakeholderplanningen. Dit is geen anomalie maar een structureel gevolg van seat-schaarste (§3.4, punt 5) en van het feit dat P6 slecht geschikt is voor kortcyclisch werkvoorbereidingsoverleg.

**Werkt goed:** iedereen heeft het, nul drempel, oneindig flexibel.
**Wringt:** geen CPM, geen kalenderlogica, geen audit trail, geen koppeling terug naar de contractuele planning. Elke Excel-look-ahead die niet terugvloeit naar P6 is een stukje verloren waarheid — en in een claim is dat precies het bewijs dat je mist.

---

## 7. Openingen — waar zit de onvrede en het gat

Deze paragraaf is geschreven met het oog op een **open-source, IFC-gebaseerde planner** (Open Planner Studio). Volgorde is naar aantrekkelijkheid.

### 7.1 Lineaire planning / tijd-wegdiagram — het scherpste gat

**Het probleem:** weg-, spoor-, dijk-, tunnel- en leidingprojecten hebben een positie langs de as (chainage/kilometrering) als eerste-klas planningsdimensie. Een klassieke Gantt verbergt het conflict dat er het meest toe doet: twee ploegen die elkaar op dezelfde kilometer tegenkomen, of een asfaltploeg die de fundering inhaalt.

**Waarom het een gat is:** TILOS was de standaardoplossing en lijkt te zijn afgebouwd `[KENNISBASIS]`. P6 kan het niet. Asta kan het maar ten dele. Er is geen open-source optie.

**Waarom IFC hier helpt:** IFC 4.3 is nadrukkelijk uitgebreid voor lineaire infrastructuur — met alignment (`IfcAlignment`) als kernconcept. Een planner die taken aan een alignment kan koppelen, krijgt het tijd-wegdiagram er gratis bij en kan het bovendien tegen het werkelijke ontwerpmodel valideren. **Dit is de enige plek waar een IFC-native planner functioneel iets kan wat P6 principieel niet kan.**

### 7.2 Seat-schaarste in de keten — het "gratis lezer"-model

**Het probleem:** onderaannemers en kleinere ingenieursbureaus krijgen geen P6-licentie. Ze werken in Excel; hun input wordt handmatig overgetikt; er ontstaat drift tussen de contractuele planning en de werkelijkheid.

**De opening:** een gratis tool die XER en P6 XML **kan lezen én schrijven**, en die op elke laptop draait (Open Planner Studio draait al zowel als desktop-app als in de browser). Dat verwijdert de drempel zonder de contractuele eis aan te tasten.

**Historisch precedent:** dit is exact hoe Adobe met de gratis Reader het PDF-formaat tot standaard maakte, en hoe Autodesk met DWG TrueView de DWG-lock-in verstevigde.

⚠️ ~~*In deze sector is er geen gratis P6-lezer. Dat is een opvallende leegte.*~~ — **WEERLEGD, en dit raakt de strategie.** Er bestaan meerdere gratis, niet-trial XER-lezers: **ScheduleReader** (browsergebaseerd, "open and view Oracle Primavera P6 XER and XML files in your browser — no installation, no license required"), **xerviewer.org** ("free, no install", inclusief WBS, Gantt, histogrammen en Excel-export), **Aurora-Viewer** van Aurora Scheduling (gratis Windows-applicatie) en **ArchiMesh** ("completely free — no account required"). `[GEVERIFIEERD]` [schedulereader.com](https://www.schedulereader.com/), [xerviewer.org](https://www.xerviewer.org/), [aurorascheduling.com/aurora-viewer](https://www.aurorascheduling.com/aurora-viewer/), [archimesh.ai/en/free-xer-viewer](https://archimesh.ai/en/free-xer-viewer/)

**Wat dit betekent voor de these.** "Gratis lezer" is *geen* onbezette positie en dus geen differentiator — de leegte die het rapport hier claimde bestaat niet. Wat wél onbezet blijft, en waar de opening dus echt zit, is de combinatie die geen van deze vier biedt:
1. **schrijven**, niet alleen lezen — geldige XER/P6 XML *produceren* zodat een onderaannemer contractueel kan indienen zonder P6-licentie;
2. **bewerken met een echte CPM-motor** in plaats van passief weergeven;
3. **open source en lokaal draaiend** — alle vier bovenstaande zijn gesloten producten, en drie van de vier zijn SaaS, wat ze diskwalificeert onder de soevereiniteitseisen uit §7.7.

De opening in §7.2 blijft dus geldig, maar moet worden geherformuleerd van "er is geen gratis lezer" naar **"er is geen gratis *schrijver*, en geen open, lokaal draaiende bewerker"**. Dat is een smallere en verdedigbaardere claim.

### 7.3 XER-lock-in en formaatarmoede — de open-formaatthese

**Het probleem:** XER is ongedocumenteerd, versiegevoelig, lossy tussen P6-versies, en een producteis vermomd als formaateis. Publieke opdrachtgevers weten dit en zijn er ongelukkig mee, maar hebben geen alternatief om naar te wijzen.

**De opening:** IFC 4.3 bevat al de volledige planningsstructuur — `IfcTask`, `IfcTaskTime`, `IfcWorkSchedule`, `IfcWorkCalendar`, `IfcWorkTime`, `IfcRelSequence` (met lag en sequence type), `IfcResource`, `IfcRelAssignsToProcess`. Het is een **ISO-standaard (ISO 16739)**, gratis, gedocumenteerd, en vendorneutraal. Er is vrijwel geen commerciële implementatie die dit serieus gebruikt als planningsformaat. `[KENNISBASIS]`

**Waarom dit in deze sector kan landen en elders niet:** publieke opdrachtgevers hebben expliciet beleid voor open standaarden (NL: "open source, tenzij" en het Forum Standaardisatie met "pas toe of leg uit"; EU: Open Source Strategy; UK: Open Standards Principles). Een leverancier kan niet met een open standaard aankomen; een open-source project wel. Dit is beleidsmatige rugwind die commerciële partijen niet hebben.

### 7.4 Archivering en langetermijnleesbaarheid — het sterkste inkoopargument

**Het probleem:** publieke opdrachtgevers moeten planningsdocumentatie **10 tot 20+ jaar** bewaren voor claims, verantwoording en archiefwet. Ze bewaren XER-bestanden uit P6 v6 die niemand over tien jaar nog kan openen zonder een verlopen licentie en een uitgefaseerde databaseversie.

**De opening:** dit is precies het argument waarmee PDF/A een verplichte archiefstandaard werd. "Een archiefformaat mag niet afhankelijk zijn van één leverancier die nog moet bestaan" is een argument dat een archivaris en een CIO onmiddellijk begrijpen — en het is een argument waar de gevestigde partij geen antwoord op heeft.

**Concrete haak:** Nationaal Archief (NL) en NARA (VS) hebben beide beleid over duurzame bestandsformaten. Een IFC-gebaseerd planningsarchief past daar naadloos in; een XER-archief niet.

### 7.5 Reviewkosten en geautomatiseerde kwaliteitstoetsing

**Het probleem:** opdrachtgevers besteden serieus geld aan schedule-review (Acumen Touchstone-implementaties, externe reviewers, second opinions — §3.3). Aannemers besteden evenveel aan het voldoen daaraan. Het is dubbel werk aan beide zijden van dezelfde tafel.

**De opening:** een open planner met **DCMA-14, GAO-tien-practices en AACE-checks ingebouwd**, die een reproduceerbaar, machineleesbaar reviewrapport genereert. Beide partijen draaien dezelfde open checker en zien hetzelfde resultaat — wat de discussie verplaatst van "klopt jouw score" naar "is de planning realistisch".

**Bonus:** dit is een functie die je kunt bouwen en aanbieden **zonder** de hele planner te hoeven vervangen. Het is een instapwig: eerst de checker, dan de editor.

### 7.6 Reproduceerbaarheid van de CPM-berekening — het geloofwaardigheidswapen

**Het probleem:** verschillende tools — en zelfs verschillende versies van hetzelfde product — leveren bij identieke logica soms andere data. Oorzaken: verschillen in kalendersemantiek (hoe telt een lag over een niet-werkdag?), in de behandeling van constraints, in retained logic vs progress override, in het bepalen van het kritieke pad (langste pad vs total float ≤ 0). AACE heeft er een aparte Recommended Practice voor nodig (49R-06, "Identifying the Critical Path") omdat de definitie niet ondubbelzinnig is. `[KENNISBASIS]`

In een claim is dit fataal: als de expert van partij A een andere einddatum uitrekent dan die van partij B uit hetzelfde bestand, is de discussie onbeslisbaar.

**De opening:** een **open, gespecificeerde, testbare CPM- en kalendermotor met een publieke regressiesuite**. Dat is een geloofwaardigheidsclaim die geen enkele commerciële leverancier kan maken, omdat hun motor gesloten is. Voor een forensisch expert, een arbiter of een auditor is "je kunt de berekening zelf naspelen en de testgevallen inzien" een fundamenteel ander soort bewijs dan "Oracle zegt dat dit klopt".

> *Noot voor Open Planner Studio specifiek: de bestaande `tests/planning/`-suite (395 data-driven CPM/kalender-cases over 21 batterijen) is precies dit activum. Het is nu een interne kwaliteitsmaatregel; in deze markt is het een verkoopargument. Het publiceren van die suite als een openbaar, citeerbaar referentiecorpus voor CPM-correctheid is waarschijnlijk de goedkoopste geloofwaardigheidswinst die er te halen valt.*

### 7.7 Digitale soevereiniteit en lokale uitvoering

**Het probleem:** Oracle en Microsoft duwen publieke klanten naar Amerikaanse SaaS. In de EU (en zeker in NL en DE) stuit dat op groeiende weerstand rond dataresidency, CLOUD Act-exposure en leveranciersafhankelijkheid. Tegelijk hebben veel infrastructuurbeheerders **kritieke-infrastructuurclassificatie**, waardoor planningsdata over onderhoud aan bruggen, sluizen en spoorbeveiliging gevoelig is.

**De opening:** een tool die **volledig lokaal draait**, geen serverkoppeling vereist, geen telemetrie verstuurt, en waarvan de broncode inspecteerbaar is. Voor een security officer bij een netbeheerder is dat een sterk verhaal.

### 7.8 4D zonder dure keten

**Het probleem:** 4D-simulatie vereist nu P6 (planning) + SYNCHRO of Navisworks (4D) + een modelbron. Drie licenties, drie formaatconversies, en de koppeling breekt bij elke modelrevisie.

**De opening:** een IFC-native planner heeft het model al. De koppeling taak↔object is geen import maar een verwijzing binnen hetzelfde bestand. Dat is architectonisch eenvoudiger dan wat de gevestigde stack doet, en het schaalt naar wat opdrachtgevers steeds vaker in aanbestedingen eisen (BIM-uitvoeringsplan met 4D).

### 7.9 Waar het wringt voor open source — eerlijke tegenkrachten

Niet naïef zijn. Dit zijn de reële barrières:

| Barrière | Waarom het pijn doet | Mogelijke mitigatie |
|---|---|---|
| **Geen support-SLA / geen aansprakelijke partij** | Publieke inkoop vereist een contractpartij met verplichtingen. "GitHub issues" is geen SLA. | Commercieel supportpartnerschap of een stichting met betaalde ondersteuningscontracten (het Red Hat-model) |
| **Contracteis noemt het product** | "Submit in Primavera P6 format" sluit alternatieven de facto uit | Niet vervangen maar **compatibel zijn**: geldige XER/P6 XML schrijven. De eis wordt vervuld, de licentie niet gekocht. |
| **Geen certificering** | FedRAMP (VS), BIO/ISO 27001 (NL), Cyber Essentials (UK) | Lokale uitvoering omzeilt de zwaarste cloudcertificeringen volledig — dit is een voordeel, niet een tekort |
| **Geen erkende opleiding/certificering van gebruikers** | Publieke opdrachtgevers eisen "P6-gecertificeerde planner" in aanbestedingen | Lange adem; begin bij de rollen waar geen certificaat geëist wordt (onderaannemer, werkvoorbereider, reviewer) |
| **Risicoaversie van de inkoper** | Kiezen voor het alternatief is persoonlijk risico | Instappen als *aanvulling* (checker, lezer, archiefformaat), niet als vervanger. Nul inkoopbeslissing nodig. |
| **Onvolwassen resource- en kostenmodel** | EVM/EIA-748 vereist control accounts, budgetten per werkpakket, earned-value-technieken | Dit is echt werk. Zonder EVM ben je uitgesloten van het federale segment. |

### 7.10 De aanbevolen inbraakstrategie (samengevat)

Niet: "vervang Primavera P6". Wel, in deze volgorde:

1. ~~**Gratis universele lezer** voor XER/P6 XML/MPP~~ → ⚠️ **herzien:** gratis XER-*lezers* bestaan al in meervoud (§7.2), dus dit is geen instappunt. Begin in plaats daarvan bij de **gratis XER/P6 XML-*schrijver*** — een onderaannemer of werkvoorbereider zonder P6-seat die een contractueel indienbaar bestand kan produceren. Dat kan geen van de bestaande gratis tools.
2. **Open schedule-kwaliteitschecker** (DCMA-14, GAO-10, AACE) met machineleesbare rapportage — een gedeelde meetlat voor beide zijden van de tafel.
3. **Reproduceerbare, publiek geteste CPM/kalendermotor** als geloofwaardigheidsfundament — publiceer de testsuite.
4. **IFC 4.3 als archief- en uitwisselingsformaat** — positioneer tegen de archiefwet, niet tegen Oracle.
5. **Lineaire planning / tijd-wegdiagram** — de enige echte functionele leegte in de markt; hier kun je *beter* zijn in plaats van *goedkoper*.
6. **4D via native IFC-koppeling** — als vanzelfsprekend gevolg van punt 4.
7. Pas veel later: volwaardige EVM/EIA-748-ondersteuning voor het federale segment.

---

## 8. Bronnenlijst

### 8.1 Geslaagd opgehaald in deze sessie `[GEVERIFIEERD]`

| Bron | URL | Wat het opleverde |
|---|---|---|
| Oracle — Primavera P6 EPPM | https://www.oracle.com/uk/construction-engineering/primavera-p6/ | Positionering "The Standard for Planning and Scheduling"; CPM/resource/kosten; zichtbare push naar Primavera Cloud; **geen prijzen** |
| Oracle — Construction and Engineering | https://www.oracle.com/construction-engineering/ | Productportfolio; >$9 biljoen projectwaarde, >4 mln projecten, >1,8 mrd documenten, ~$20 mrd/mnd onderaannemersbetalingen; klanten incl. **Texas DOT** en **DC Water** |
| Deltek — Acumen | https://www.deltek.com/en/products/project-and-portfolio-management/acumen | 600+ metrieken; DCMA/DOE/NASA/GAO/AACE; IPMDAR en DECM; modules Fuse/Risk 360/Touchstone; GovCon, defensie, infrastructuur; **geen prijzen** |
| Bentley — SYNCHRO | https://www.bentley.com/software/synchro/ | SYNCHRO 4D en Perform; EVA-KPI's; referenties Laing O'Rourke, ACCIONA Melbourne rail, Sacramento Regional County Sanitation; IFC niet genoemd **op deze marketingpagina — maar SYNCHRO 4D Pro importeert IFC blijkens Bentley's eigen kennisbank, zie §6.5**; geen prijzen |
| InEight — Schedule | https://ineight.com/products/schedule/ | Volledige CPM + look-ahead + risico; markten transport/power/nucleair/water; enterprise + per-user pricing zonder bedragen |
| Eleco — Asta Powerproject | https://eleco.com/software/asta-powerproject | 7× achtereen klantgekozen UK Construction Computing Award t/m 2020; bouw + civiel; geen edities of prijzen |
| Microsoft — Project vergelijking | https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software | **Project Standard 2024 $679,99; Project Professional 2024 $1.129,99** (eenmalig); Project Server SE op aanvraag; push naar Planner + Project Plan 3 |
| FAR Subpart 34.2 (acquisition.gov) | https://www.acquisition.gov/far/subpart-34.2 | EVMS vereist voor major acquisitions for development per OMB A-11; **EIA-748** als compliance-ijkpunt; maandelijkse rapportage; IBR's; doorwerking naar onderaannemers; **geen dollargrenzen in deze subpart** |
| GAO — Schedule Assessment Guide GAO-16-89G | https://www.gao.gov/products/gao-16-89g | December 2015; tien best practices; ~240 pagina's; companion bij Cost Estimating Guide; formeel vrijwillig |
| Wikipedia — Earned value management | https://en.wikipedia.org/wiki/Earned_value_management | ANSI/EIA-748A mei 1998; 35 DoD-criteria teruggebracht tot 32; agentschappen DoD/NASA/DOE/OMB |
| SCL — Delay and Disruption Protocol | https://www.scl.org.uk/resources/delay-disruption-protocol | 2e editie februari 2017 is huidig; vervangt 1e editie + Rider 1; vertalingen; geciteerd in rechtspraak |
| AACE — Recommended Practices | https://web.aacei.org/resources/publications/recommended-practices | RP's aansluitend op TCM Framework; gratis voor leden, te koop voor niet-leden; generiek + branchespecifiek |
| Wikipedia — Primavera (software) | https://en.wikipedia.org/wiki/Primavera_(software) | Opgericht 1983; Oracle-overname 2008; P3 25% marktaandeel zware bouw in 2008 vs 11% nr. 2; ~40% bij aannemers $5–10M; P3/SureTrak uit verkoop 31-12-2010 |
| Wikipedia — Rijkswaterstaat | https://en.wikipedia.org/wiki/Rijkswaterstaat | Jaarbudget ca. €5 mld; 5.001–10.000 medewerkers; 7 regionale + 6 specialistische diensten + projectdirecties |
| Wikipedia — National Highways | https://en.wikipedia.org/wiki/National_Highways | RIS1 ~£15 mld (2015–2020); RIS2 >£27 mld (2020–2025) waarvan £14 mld enhancements; >4.000 mijl / 6.400 km; ~2% weglengte, ~⅓ verkeer |
| Wikipedia — Network Rail | https://en.wikipedia.org/wiki/Network_Rail | 2019: £3,1 mld renewals + £3,2 mld enhancements; omzet 2024 £11,5 mld; activa £90,1 mld; eigen vermogen £18,4 mld; £38 mld upgradeprogramma |
| Rijkswaterstaat — Zakendoen met RWS | https://www.rijkswaterstaat.nl/zakelijk/zakendoen-met-rijkswaterstaat | **Systeemgerichte Contractbeheersing (SCB)**, **Best Value Procurement (BVP)**, **EMVI**; GWW-werkwijzen; geen software- of planningsstandaarden op deze pagina |

### 8.2 Mislukt in deze sessie — gaten voor vervolgonderzoek

| URL | Status | Wat er gezocht werd |
|---|---|---|
| https://www.oracle.com/us/corporate/pricing/primavera-price-list-1809162.pdf | 404 | Primavera lijstprijzen |
| https://www.oracle.com/corporate/pricing/price-lists.html | 404 | Index van Oracle-prijslijsten |
| https://www.dcma.mil/Portals/31/Documents/EVMS/DCMA_14-Point_Assessment.pdf | 404 | DCMA 14-point drempels, primaire bron |
| https://www.projectcontrolacademy.com/dcma-14-point-schedule-assessment/ | 404 | DCMA 14-point uitleg |
| https://www.projectmanager.com/blog/dcma-14-point-schedule-assessment | 404 | idem |
| https://www.microsoft.com/en-us/microsoft-365/planner/compare-plans-options | 404 | Project Plan 1/3/5 maandprijzen |
| https://www.grandviewresearch.com/industry-analysis/project-management-software-market | 403 | Marktomvang analistencijfer |
| https://www.mordorintelligence.com/industry-reports/project-management-software-market | 404 | Marktomvang analistencijfer |
| https://www.plan-academy.com/how-much-does-primavera-p6-cost/ | leeg | P6-prijsindicaties |
| https://www.peerspot.com/products/oracle-primavera-p6-pricing | geen inhoud | Gebruikersgerapporteerde P6-prijzen |
| https://www.networkrail.co.uk/industry-and-commercial/supply-chain/ | geen relevante inhoud | NR planningseisen aan leveranciers |
| https://nationalhighways.co.uk/suppliers/ | geen relevante inhoud | NH programme-/project-controls-eisen |
| https://www.safransoftware.com/ | DNS-fout | Safran Project positionering |

### 8.3 Canonieke bronnen genoemd maar in deze sessie niet opgehaald `[KENNISBASIS]`

- NEC contracten (clause 31/32 programme): https://www.neccontract.com/
- DFARS Subpart 234.2 (EVMS-drempels DoD): https://www.acquisition.gov/dfars/subpart-234.2
- OSD Integrated Program Management / IPMDAR: https://www.acq.osd.mil/asda/ae/ada/ipm/
- DCMA: https://www.dcma.mil/
- buildingSMART IFC (incl. 4.3 infrastructuur): https://technical.buildingsmart.org/standards/ifc/
- MIRT-overzicht (NL projectenportfolio): https://www.mirtoverzicht.nl/
- Office of Rail and Road (Schedule 4/8, CP7): https://www.orr.gov.uk/
- FHWA: https://www.fhwa.dot.gov/
- Global Infrastructure Outlook: https://outlook.gihub.org/
- UK Infrastructure and Projects Authority / GMPP: https://www.gov.uk/government/organisations/infrastructure-and-projects-authority

---

## 9. Aanbevolen vervolgonderzoek zodra er searchbudget is

De volgende vragen zijn in dit rapport met `[KENNISBASIS]` of `[SCHATTING]` beantwoord en verdienen harde verificatie, in volgorde van belang voor besluitvorming:

1. ~~**Is Trimble TILOS daadwerkelijk uit de markt?**~~ ✅ **BEANTWOORD in de verificatieronde, zie §6.7 en §Verificatie:** Tilos gaat per **1 maart 2026** End-of-Maintenance in met **11.1 MR4** als laatste release, maar wordt nog wel aangeboden. Resterende deelvraag: is er een migratiepad of opvolgproduct dat Trimble aanwijst, en wat is de geïnstalleerde basis?
2. **Actuele Primavera P6 en Oracle Primavera Cloud prijzen** — via resellerquotes of gepubliceerde overheidsaanbestedingsuitslagen (TED, Contracts Finder, SAM.gov, USAspending). Publieke aanbestedingsdata is hier de beste prijsbron omdat gunningen openbaar zijn.
3. **De letterlijke planningsparagrafen** uit de standaardbestekken van RWS, National Highways, Network Rail en 3–5 state DOT's. Zoek op de exacte zinsnede die het formaat voorschrijft — dat bepaalt of "XER-compatibel schrijven" voldoende is.
4. **DCMA 14-point drempels** uit de primaire bron.
5. **Analistencijfers** voor de marktomvang, om de bottom-up schatting van §4.2 te toetsen.
6. **Bestaande IFC 4.3-planningsimplementaties** — wie doet dit al, en wat is er van bSI aan implementatierichtlijnen (IDS) voor `IfcWorkSchedule`?
7. **Archiefbeleid** van Nationaal Archief / NARA / The National Archives (UK) t.a.v. planningsbestanden — onderbouwt argument §7.4.
8. **Network Rail Schedule 4/8 bedragen** per jaar — kwantificeert de kosten van vertraging (§1.5).

---

## Verificatie

**Verificatiedatum:** 25 juli 2026 · **Methode:** adversarieel — per bewering is actief geprobeerd haar te *weerleggen* met onafhankelijke bronnen, en zijn alle doorgerekende schattingen nagerekend. **Beperking:** het WebSearch-budget was ook in deze sessie uitgeput (200/200); er is gewerkt met directe WebFetch-ophalingen, waarbij DuckDuckGo/Bing HTML-endpoints als zoekproxy dienden. Bronnen die alleen via een zoekmachine-index konden worden bevestigd zijn als zodanig gemarkeerd.

**Uitkomst in één zin:** de *kwalitatieve* analyse van dit rapport (contractdynamiek, standaarden, lock-in, waar de gaten zitten) houdt goed stand; het *kwantitatieve* model in §4 bevatte vier rekenfouten en één overschatte invoer, en twee strategische claims in §6–7 zijn feitelijk onjuist gebleken.

### A. Segmentomvang en de redenering erachter

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| A1 | Publieke infra-investering wereldwijd **$2,5–3,5 biljoen/jaar** | **gecorrigeerd** | De aangehaalde bron geeft $79 bln "current trends" en $94 bln behoefte over 2016–2040 = **~$3,2 resp. ~$3,8 bln/jaar**, maar over **zeven sectoren inclusief energie en telecom** en over **publiek én privaat** eigendom samen. De bovengrens van $3,5 bln overtreft daarmee vrijwel het mondiale totaal over alle eigendomsvormen. Verdedigbaar voor publiek alleen: **~$1,5–2,5 bln/jaar** | [outlook.gihub.org](https://outlook.gihub.org/) |
| A2 | 30–40% valt onder een CPM-regime → **$0,8–1,4 biljoen** | **bevestigd (rekenkundig)** | 0,30×2,5 = 0,75 en 0,40×3,5 = 1,4 → $0,75–1,4 bln; afronding naar $0,8 acceptabel. Het percentage zelf blijft een ongetoetste aanname | eigen herberekening |
| A3 | 1 planner per **€35M** → **23.000–40.000** planners | **gecorrigeerd** | Rekenkundig juist ($0,8–1,4 bln ÷ 35 = 22.857–40.000), maar er wordt een **dollarbedrag door een euro-vuistregel** gedeeld (~8% overschatting), en de eigen bandbreedte €20–50M wordt weggelaten ten gunste van één puntwaarde. Na correctie: **~12.000–26.000** | eigen herberekening |
| A4 | Factor 6–10× → **180.000–350.000 seats** | **gecorrigeerd — rekenfout** | 23.000×6 = **138.000** en 40.000×10 = **400.000**. De gepubliceerde band is aan beide zijden zonder motivering versmald. Herrekend met A1/A3: **~71.000–265.000, rekenwaarde ~150.000** | eigen herberekening |
| A5 | Gewogen gemiddelde **~$900 per seat per jaar** | **gecorrigeerd — rekenfout** | De vier gewichten sommeren tot 100%: 0,6×1.100 + 0,2×350 + 0,1×800 + 0,1×400 = **$850**. De alternatieve lezing ("$400 extra over álle seats") geeft ~$1.300. $900 volgt uit geen van beide | eigen herberekening |
| A6 | 250.000 × $900 = **~$225M licentieomzet** | **gecorrigeerd** | Rekenkundig juist, maar op onjuiste invoer. Herrekend: **$60M–$225M, centraal ~$128M** | eigen herberekening |
| A7 | Licentie:diensten 1:1,5–1:2,5 → **$340–560M** | **bevestigd (rekenkundig)** | 225×1,5 = 337,5 en 225×2,5 = 562,5. Correct afgeleid uit stap 3 | eigen herberekening |
| A8 | Totaaltabel §4.2 stap 5 | **gecorrigeerd — interne inconsistentie** | Drie gebreken: (a) dienstenrij $250–700M ≠ stap 4's $340–560M en wordt nergens afgeleid; (b) rijsom is $400M–$1.040M terwijl de kop $0,45–1,0 mld claimt, dus de ondergrens is 12% opgehoogd; (c) licentierij $150–340M volgt niet uit stap 3's puntwaarde $225M | eigen herberekening |
| A9 | **Totaal ~$0,7 mld/jaar (band $0,45–1,0 mld)** | **gecorrigeerd** | Na herrekening: **~$0,4 mld, band $0,15–0,8 mld**. Ruwweg gehalveerd | eigen herberekening |
| A10 | Onafhankelijke tegenproef op de seatcount | **weerlegt het oorspronkelijke model** | Het model kent Asta ~10% van 250.000 seats × $800 = **~$20M** toe in alleen het publieke segment. **Eleco plc boekte in heel 2025 £38,8M concernomzet** over álle producten, álle sectoren en álle klanttypen. Powerproject is daar een deelverzameling van. De toegewezen omzet nadert dus de totale concernomzet van de eigenaar — onhoudbaar | [investegate.co.uk — Eleco Final Results 2025](https://www.investegate.co.uk/announcement/rns/elecosoft-public-limited-company--elco/final-results/9540473) |
| A11 | Bredere "project controls"-afbakening = 3–5× = **$2,5–4 mld** | **gecorrigeerd — rekenfout** | 3–5× op $0,45–1,0 mld geeft **$1,35–5,0 mld**; 3–5× op $0,7 mld geeft **$2,1–3,5 mld**. "$2,5–4 mld" volgt uit geen van beide. Herrekend op de gecorrigeerde basis: **~$1,2–2,0 mld** | eigen herberekening |
| A12 | Groei **5–9% nominaal per jaar tot 2030** | **onzeker** | Niet te bevestigen of te weerleggen: de analistenrapporten die dit zouden kunnen toetsen (Grand View, Mordor) bleven ook in deze ronde ontoegankelijk (403/404). De genoemde drijvers zijn afzonderlijk wél geverifieerd (zie A13, C1, C2). Behandel het percentage als ongefundeerd | — |
| A13 | Cloudmigratie verhoogt omzet per seat van ~$1.100 naar $1.200–2.400 | **onzeker** | De richting is plausibel en Oracle's push naar Primavera Cloud is zichtbaar geverifieerd, maar beide bedragen zijn ongepubliceerde schattingen zonder externe bevestiging. Oracle publiceert geen prijzen (zie B3) | — |

### B. Prijzen

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| B1 | Project Standard 2024 **$679,99**; Professional 2024 **$1.129,99** eenmalig | **bevestigd** | Letterlijk zo op de Microsoft-vergelijkingspagina, opnieuw opgehaald | [microsoft.com](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software) |
| B2 | Planner Plan 1 ~$10, Project Plan 3 ~$30, Project Plan 5 ~$55 p/gebruiker p/maand | **bevestigd** | In het rapport nog `[KENNISBASIS]` met een 404-bron; nu bevestigd door drie onafhankelijke secundaire bronnen die exact $10/$30/$55 noemen. Label kan naar `[GEVERIFIEERD, secundair]` | costbench.com, thedigitalprojectmanager.com, tech.co |
| B3 | Geen van de dominante leveranciers (Oracle, Deltek, Bentley, Eleco, InEight) publiceert prijzen | **bevestigd** | Herbevestigd; ook een gerichte zoektocht naar een Eleco-webshopprijs voor Asta Powerproject leverde geen gepubliceerd bedrag op, ondanks een "Buy Asta"-knop op de site | [eleco.com](https://eleco.com/software/asta-powerproject) |
| B4 | P6 Professional ~$2.500–3.000 perpetual + 22% support; OPC ~$1.200–2.400/jaar | **onzeker** | Niet verifieerbaar — Oracle publiceert niets en de prijslijst-PDF's blijven onbereikbaar. Wel **intern consistent**: $2.500–3.000 over 5 jaar geamortiseerd (~$500–600) + 22% support (~$550–660) ≈ $1.050–1.260/jaar, wat het model's $1.100 ondersteunt. Blijft `[SCHATTING]` | — |
| B5 | Overige prijstabel §3.3 (Acumen, SYNCHRO, InEight, Asta) en kostenposten §3.3 | **onzeker** | Geen enkele publieke bron; correct gelabeld als `[SCHATTING]` in het rapport. Niet te falsifiëren, niet te bevestigen | — |

### C. Schaalankers en "verplichte" standaarden/formaten

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| C1 | **IIJA $1,2 biljoen, 2021–2026**, "voegde $1,2 bln over 5 jaar toe" | **gecorrigeerd** | Het is **$1,2 bln over acht jaar** (getekend 15 nov 2021), en slechts **$550 mld is nieuw geld**; $650 mld is voortzetting van reeds geautoriseerde programma's. Zowel de looptijd als het stimuluseffect werden overschat | [wikipedia IIJA](https://en.wikipedia.org/wiki/Infrastructure_Investment_and_Jobs_Act) |
| C2 | **UK RIS3** als groeidrijver | **bevestigd, met correctie** | RIS3 bestaat en is ~£25–27 mld, maar was **vertraagd**: het loopt april 2026 – maart 2031, met een interim-settlement van £4,8 mld voor 2025/26. Het rapport noemde geen periode of vertraging | [gov.uk RIS3 2026–2031](https://www.gov.uk/government/publications/road-investment-strategy-3-ris3-2026-to-2031) |
| C3 | Network Rail **CP7 2024–2029** | **bevestigd, met toevoeging** | CP7 loopt 1 apr 2024 – 31 mrt 2029 en is vastgesteld op **£43,1 mld** — een cijfer dat het rapport niet had | [networkrail.co.uk](https://www.networkrail.co.uk/who-we-are/publications-and-resources/our-delivery-plans-for-2024-2029/), [orr.gov.uk PR23](https://www.orr.gov.uk/monitoring-regulation/rail/networks/network-rail/price-controls/pr23/final-determination) |
| C4 | Network Rail: omzet 2024 £11,5 mld, activa £90,1 mld, **£38 mld upgradeprogramma** | **bevestigd / deels onzeker** | Omzet en activa exact bevestigd. Het £38 mld-programma wordt in de bron gekoppeld aan **Crossrail, Thameslink en elektrificatie** — projecten die inmiddels zijn opgeleverd; het is dus een **gedateerd cijfer** dat naast een 2024-omzet misleidend actueel oogt. Gebruik CP7 (C3) als actueel anker | [en.wikipedia.org/wiki/Network_Rail](https://en.wikipedia.org/wiki/Network_Rail) |
| C5 | Rijkswaterstaat jaarbudget **ca. €5 mld**, 5.001–10.000 medewerkers | **bevestigd** | Exact zo in de bron. Kleine onnauwkeurigheid: de bron spreekt van **10 regionale**, 6 specialistische en 2 speciale diensten; het rapport zegt 7 regionale | [en.wikipedia.org/wiki/Rijkswaterstaat](https://en.wikipedia.org/wiki/Rijkswaterstaat) |
| C6 | National Highways: RIS1 ~£15 mld, **RIS2 >£27 mld waarvan £14 mld enhancements**, >4.000 mijl, ~⅓ van het verkeer | **bevestigd** | Alle vier de deelcijfers letterlijk bevestigd | [en.wikipedia.org/wiki/National_Highways](https://en.wikipedia.org/wiki/National_Highways) |
| C7 | Oracle claimt **>$9 bln projectwaarde**, >4 mln projecten, >1,8 mrd documenten, ~$20 mrd/mnd betalingen; TxDOT en DC Water als klanten | **bevestigd** | Alle vier de statistieken en beide publieke klanten letterlijk herbevestigd op de bronpagina. *Blijft een leverancierseigen, niet-geauditeerde claim over de hele C&E-portfolio — geen marktomvangbewijs* | [oracle.com/construction-engineering](https://www.oracle.com/construction-engineering/) |
| C8 | **IFC 4.3 = ISO 16739** | **bevestigd, preciezer** | IFC 4.3 (formeel 4.3.2.0) is gepubliceerd als **ISO 16739-1:2024** (editie 2). Het rapport noemde alleen "ISO 16739" | [buildingsmart.org](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/), [iso.org/standard/84123.html](https://www.iso.org/standard/84123.html) |
| C9 | NEC: **kwart van de betaling ingehouden** zonder aanvaard programme | **bevestigd, met correctie** | Klopt, maar geldt niet alleen voor NEC4: **NEC4 clause 50.5 én NEC3 clause 50.3**. Het rapport presenteerde het als een NEC4-noviteit ("NEC4 kent bovendien een sanctie") | [nec4engine.com/clauses/50.5](https://www.nec4engine.com/clauses/50.5), [neccontract.com FAQ](https://www.neccontract.com/support/faqs/no-accepted-programme-in-place) |
| C10 | **GAO-16-89G**: dec 2015, ~240 p, tien best practices | **bevestigd** | Publicatiedatum 22 dec 2015, 240 pagina's, tien best practices — alle drie bevestigd | [gao.gov/products/gao-16-89g](https://www.gao.gov/products/gao-16-89g) |
| C11 | GAO-gids is "**formeel vrijwillig**", gelabeld `[GEVERIFIEERD]` | **onzeker — label te sterk** | De GAO-pagina beschrijft de gids als best practices en leidraad voor auditors, maar stelt **nergens expliciet** dat naleving vrijwillig is. De interpretatie is redelijk, maar het `[GEVERIFIEERD]`-label is hier niet verdiend; degradeer naar `[KENNISBASIS]` | [gao.gov/products/gao-16-89g](https://www.gao.gov/products/gao-16-89g) |
| C12 | **SCL Protocol 2e editie, februari 2017** is de huidige versie | **bevestigd** | Letterlijk bevestigd; geen 3e editie of amendement gevonden, ook niet negen jaar later | [scl.org.uk](https://www.scl.org.uk/resources/delay-disruption-protocol) |
| C13 | **DCMA 14-point drempels** (tabel §5.3) | **onzeker, steekproef bevestigd** | De primaire DCMA-bron blijft onbereikbaar. Steekproef op de meest specifieke waarde slaagt: **high float = total float > 44 dagen, gemarkeerd bij >5% van de onvoltooide taken** — exact zoals in de tabel. De overige twaalf drempels blijven onbevestigd. Aanvullende waarschuwing: meerdere bronnen benadrukken dat dit **defaults** zijn en dat contracten vaak afwijkende waarden voorschrijven — de tabel is dus geen norm | [tensix.com](https://tensix.com/the-dcma-14-point-assessment-and-high-float-tasks/) |
| C14 | XER is "de facto verplichte contractuele levering", een **producteis vermomd als formaateis** | **onzeker** | Kernstelling van het hele rapport (§5.7, §7.3, §7.10) en nog steeds **niet met één letterlijke bestekstekst onderbouwd**. Vervolgvraag 3 in §9 blijft dus de belangrijkste openstaande verificatie. Plausibel, maar draagt op dit moment meer strategisch gewicht dan bewijs | — |

### D. Marktleiderschap en productclaims

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| D1 | **P6 heeft ~55–70%** van de publieke infra-projecten als contractueel leidende tool | **onzeker** | Nergens onafhankelijk te toetsen; het rapport labelt het zelf als `[SCHATTING]`. De enige aangevoerde onderbouwing (D2) is 18 jaar oud en gaat over een ánder product en een ándere sectorafbakening | — |
| D2 | P3 had in 2008 **25%** van de zware bouw (nr. 2: 11%) en ~40% bij aannemers met $5–10M omzet; Oracle kocht Primavera in 2008; P3/SureTrak uit verkoop per 31-12-2010 | **bevestigd** | Alle cijfers en data letterlijk bevestigd. **Maar:** dit betreft **P3**, niet P6, en het meetjaar is **2008** — het draagt de 2026-dominantieclaim in D1 niet | [en.wikipedia.org/wiki/Primavera_(software)](https://en.wikipedia.org/wiki/Primavera_(software)) |
| D3 | **Trimble TILOS is afgebouwd / uit de actieve verkoop** | **gecorrigeerd** | De richting klopt maar de formulering niet. Trimble deed een **formele End-of-Maintenance-aankondiging: per 1 maart 2026, met 11.1 MR4 als laatste release**. Tegelijk staat het product **nog actief te koop** op de Trimble-site, zónder sunset-melding. Dus: geen stille afbouw, maar een gedateerde EoM; en de "leegte" in lineaire planning begint nu, in plaats van dat hij er al jaren is. Geen opvolgproduct gevonden | [help.buildingpoint.com.au](https://help.buildingpoint.com.au/hc/en-au/articles/55527556493849--Important-Announcement-Tilos-Entering-End-of-Maintenance-on-1-March-2026) (403 bij directe fetch; bevestigd via twee onafhankelijke zoekindexeringen), [construction.trimble.com](https://construction.trimble.com/en/products/tilos) |
| D4 | **"In deze sector is er geen gratis P6-lezer"** (§7.2) | **weerlegd** | Er bestaan er minstens vier, alle gratis en niet trial-beperkt: ScheduleReader (browser, "no license required"), xerviewer.org, Aurora-Viewer en ArchiMesh. De geclaimde leegte bestaat niet; de strategische aanbeveling in §7.10 punt 1 is daarop aangepast naar "gratis **schrijver**" | [schedulereader.com](https://www.schedulereader.com/), [xerviewer.org](https://www.xerviewer.org/), [aurorascheduling.com](https://www.aurorascheduling.com/aurora-viewer/), [archimesh.ai](https://archimesh.ai/en/free-xer-viewer/) |
| D5 | **SYNCHRO noemt IFC niet expliciet** → "lastige vraag voor een opdrachtgever met open-standaardenbeleid" (§6.5) | **weerlegd** | Ongeldige gevolgtrekking van marketingstilte naar functionele afwezigheid. Bentley's eigen kennisbank: **SYNCHRO 4D Pro importeert ~58 3D-formaten, expliciet inclusief IFC**; officiële trainingsmaterialen beschrijven de IFC-importroute. De constatering "staat niet op de pagina" was juist; de conclusie eruit was fout | [bentleysystems.service-now.com KB0017511](https://bentleysystems.service-now.com/community?id=kb_article&sysparm_article=KB0017511) |
| D6 | Asta Powerproject won **7 jaar op rij** de UK Construction Computing Award t/m 2020 | **bevestigd** | Letterlijk bevestigd ("seventh consecutive year", bericht van 1 nov 2020). *Kanttekening:* de bron is zes jaar oud en er is geen bewijs van voortzetting na 2020 — presenteer het niet als actuele marktpositie | [eleco.com](https://eleco.com/software/asta-powerproject) |
| D7 | Deltek Acumen: **600+ metrieken**, aansluitend op DCMA/DOE/NASA/GAO/AACE, ondersteunt IPMDAR en DECM | **bevestigd (leverancierseigen claim)** | In de vorige sessie geverifieerd op de bronpagina; niet opnieuw betwist. Het blijft een **niet-geauditeerde marketingclaim** van de leverancier zelf, geen onafhankelijke vaststelling | [deltek.com](https://www.deltek.com/en/products/project-and-portfolio-management/acumen) |

### E. Wat een vervolgsessie als eerste moet doen

1. **De kernstelling C14 bewijzen of laten vallen** — één letterlijke formaatparagraaf uit een bestek van RWS, National Highways, Network Rail of een state DOT. Zonder dat rust §5.7/§7.3/§7.10 op een aanname.
2. **Het bottom-up model vervangen door een top-down toets** — de A10-tegenproef (Eleco) werkte; herhaal die met Oracle C&E-omzetschattingen, Deltek en Bentley-segmentcijfers om de $0,4 mld van boven te begrenzen.
3. **De publiek/privaat-splitsing van GI Hub ophalen** — dit is de enige invoer die de hele §4-keten schaalt (A1).
4. **DCMA-drempels uit de primaire bron** (C13) — twaalf van de veertien zijn nog onbevestigd.
5. **Tilos-migratiepad en installed base** (D3) — bepaalt hoe groot het gat in lineaire planning werkelijk is.
