# Trimble TILOS — diepgaand softwareprofiel

*Marktonderzoek planningssoftware · profiel opgesteld 25 juli 2026*
*Alle prijzen en statusgegevens zijn opgehaald op 25 juli 2026, tenzij anders vermeld.*

> **Kernboodschap vooraf:** TILOS is al ruim twintig jaar de de-facto standaard voor tijd-wegplanning
> (time-chainage) in zware infrastructuur — en het product is per **1 maart 2026 door Trimble in
> "End of Maintenance" gezet**. De laatste functionele release dateert van **januari 2023**. Het
> ecosysteem migreert naar **TILOS 360**, een *nieuw product van een Franse ex-distributeur*, niet
> van Trimble. Elk advies over TILOS moet met dat gegeven beginnen.

---

## 1. Wat het is

### 1.1 Product en naam

TILOS staat voor **TI**me **LO**cation **S**ystem: een tweedimensionaal planningsinstrument waarin de
horizontale as de **plaats/kilometrering (chainage)** is en de verticale as (of andersom) de **tijd**.
Het resultaat is het tijd-wegdiagram (Duits: *Weg-Zeit-Diagramm*, Engels: *time-distance* / *time-chainage
diagram* / *march chart*, Frans: *diagramme espace-temps*). Waar een Gantt-chart alleen zegt *wanneer*
iets gebeurt, zegt TILOS ook *waar* — en maakt daarmee snelheidsconflicten, ploegbotsingen en
opvolgingsafstanden op een lineair werk in één oogopslag zichtbaar.
([tilosfrance.com](https://www.tilosfrance.com/), [construction.trimble.com/en/products/tilos](https://construction.trimble.com/en/products/tilos))

### 1.2 Historie en eigendom

| Jaar | Gebeurtenis |
|---|---|
| 1998 | **Linear Project GmbH** opgericht in Karlsruhe (Duitsland) **door twee bouwbedrijven**; TILOS ontstaat als praktijkgereedschap, niet als generiek PM-pakket. Eigenaar: Hubert Geier. |
| 2014 | Trimble en Linear Project werken samen aan interoperabiliteit tussen TILOS en Trimble Business Center. |
| **5 maart 2015** | **Trimble neemt Linear Project GmbH over.** Bedrag niet bekendgemaakt. Alan Sharp (business area director Trimble Heavy Civil Construction): *"TILOS software is a significant addition to our corridor solutions portfolio."* |
| 2015–2022 | Doorontwikkeling onder Trimble: Trimble Connect-koppeling (v10.3+), Named-User-licenties, Quadri Task Connector API (v11, feb 2022). |
| **13 jan 2023** | **Tilos 11.1 MR4** — de laatste functionele release. |
| 18 nov 2025 | Release notes van MR4 opnieuw gepubliceerd in de Trimble Community (aanloop naar de EOM-communicatie). |
| **27 feb 2026** | Aankondiging via distributiekanaal: **Tilos gaat per 1 maart 2026 End of Maintenance in.** MR4 is definitief de laatste update. |
| **april 2026** | **TILOS 360** gelanceerd door **Projet Linéaire** (La Roche-sur-Yon, Frankrijk) — de voormalige Franse TILOS-distributeur — als "next generation of linear scheduling technology". |

Bronnen: [PR Newswire, 5-3-2015](https://www.prnewswire.com/news-releases/trimble-acquires-linear-project-to-expand-its-heavy-civil-construction-project-management-capabilities-300045810.html);
[BuildingPoint Australia helpartikel "Tilos Entering End of Maintenance on 1 March 2026"](https://help.buildingpoint.com.au/hc/en-au/articles/55527556493849)
(aangemaakt 27-2-2026, bijgewerkt 3-6-2026); [tiloshelp.trimble.com/Downloads](https://tiloshelp.trimble.com/Downloads);
[Tilos 11.1 MR4 Release Notes (PDF, jan 2023)](https://www.sitechcs.com/docs/Tilos_11.1_MR4_Release_Notes.pdf).

**Belangrijk nuanceverschil:** Trimble heeft TILOS niet formeel *verkocht*. Trimble stopt met onderhoud
en het kanaal wijst klanten door naar een product van een derde partij dat de merknaam hergebruikt.
Of daar een merklicentie of overdracht onder ligt, is niet publiek bevestigd — *(schatting: er is
minstens een gedoogde merkafspraak, gezien de openlijke doorverwijzing door Trimble-distributeurs
BuildingPoint en Delta Solutions)*.

### 1.3 Doelgroep en typische gebruikers

- **Rol:** planners/werkvoorbereiders ("planning engineer", "Terminplaner", "ordonnanceur") in de
  werkvoorbereiding en projectbeheersing van grote infraprojecten. Geen tool voor het hele projectteam;
  typisch 1–5 licenties per project of per regiokantoor.
- **Organisaties:** hoofdaannemers zware infra, ingenieursbureaus, opdrachtgevers/asset owners die
  planningen van aannemers moeten toetsen, en claim-/forensic-planningsadviseurs.
- **Sectoren:** spoor en tram, (snel)weg, pijpleidingen (olie/gas/water), tunnels, hoogspanningslijnen,
  waterbouw/dijken, windparken, damwanden en verkeersfasering.
  ([petroglyphprojects.com](https://petroglyphprojects.com/software-solutions/tilos/),
  [tilosamericas.com](https://tilosamericas.com/linear-scheduling-software/))
- **Regio's:** het zwaartepunt ligt in **Europa** (Duitsland — R&D en support in Karlsruhe; Frankrijk;
  UK; Zwitserland; Nordics), plus **Australië/Nieuw-Zeeland**, **Noord-Amerika** (vooral pipelines) en
  het **Midden-Oosten**. De UI is er in 10 talen (Chinees, Duits, Engels, Frans, Italiaans, Koreaans,
  Pools, Russisch, Spaans, Turks); de **help alleen in Engels en Duits**.
  ([Release Notes 11.1 MR4](https://www.sitechcs.com/docs/Tilos_11.1_MR4_Release_Notes.pdf))
- **Referentieklanten** (via distributeurs, niet door Trimble bevestigd): Vinci, Eiffage, SNCF, RATP,
  Alstom (Projet Linéaire); Enbridge, Granite, Parsons, Mexico City Metro en diverse Amerikaanse state
  DOT's (Petroglyph). Projectvoorbeelden: Fehmarnbelt-tunnel, Toronto RER, tram Montpellier,
  wederopbouw Notre-Dame.
  ([tilos360.com](https://www.tilos360.com/en/home/), [petroglyphprojects.com](https://petroglyphprojects.com/software-solutions/tilos/))

---

## 2. Functionaliteit en techniek

### 2.1 Het onderscheidende datamodel

Het cruciale punt: in TILOS is de **plaats geen annotatie maar een eigenschap van de activiteit**.
Elke activiteit heeft naast start-/einddatum ook een **startstation en eindstation** langs een
distance-as (as, alignment). Daaruit volgt automatisch de helling van de lijn = de **werksnelheid**
(bijv. m/dag). Het diagram is dus geen rapportage-uitvoer, maar de invoer: je *tekent* de planning en
TILOS zet dat om in tijd/afstand-data.
([tiloshelp.trimble.com](https://tiloshelp.trimble.com/), [tilosamericas.com](https://tilosamericas.com/linear-scheduling-software/))

Bijbehorende objecten: **assen (axes), profielen en grids**, **sectoren** (bodemtypes, bogen,
kruisingen, kunstwerken), **stationpunten**, **lagen**, en een **massa-verzetmodule** (cut/fill,
mass-haul-diagram) — het geheel wordt over elkaar heen gelegd op één blad met Gantt, histogrammen,
lengteprofiel en situatietekening.

### 2.2 CPM-engine

Gedocumenteerd in [tiloshelp.trimble.com/Scheduling-CPM](https://tiloshelp.trimble.com/Scheduling-CPM/Understand-Scheduling):

- **Relatietypes:** FS, SS, FF en SF; altijd voorganger → opvolger.
- **Lags:** positief én negatief; **lag kan ook uit een afstandsconditie berekend worden** — dit is
  het lineaire onderscheid dat generieke CPM-tools missen.
- **Afstandsgebonden logica:** `Keep Distance`-links (constante afstand tussen ploegen aanhouden),
  **snelheidssynchronisatie** tussen parallelle activiteiten, en **automatische berekening van
  ontmoetingspunten** (waar twee tegen elkaar in werkende ploegen elkaar treffen).
- **Restricties:** vaste start-/einddata; activiteiten zonder inkomende link blijven op de ingevoerde
  startdatum staan (dus impliciet "start no earlier than"). Projectgrenzen worden gecontroleerd en
  overtredingen komen in een reschedule-rapport.
- **Berekening:** klassieke forward/backward pass, handmatig getriggerd (F9 of toolbarknop) — net als
  in P6, dus geen live herberekening bij elke edit.
- **Float / kritiek pad:** aanwezig (release notes MR4 spreken expliciet over "correcte floats en het
  kritieke pad" na een importfix), maar de publieke help documenteert de floatberekening niet in detail.

### 2.3 Kalenders

Eigen kalenderbibliotheek met uitzonderingen; kalendertoewijzing per activiteit en per resource.
Sinds MR4 neemt TILOS de projectkalender uit MS Project over voor geïmporteerde activiteiten zonder
eigen kalender. Er is een validatiewaarschuwing bij overlappende/foute kalenderuitzonderingen
("can lead to wrong calculation results and other severe issues") — wat verraadt dat dit historisch
een bron van stille rekenfouten was.
([Release Notes 11.1 MR4](https://www.sitechcs.com/docs/Tilos_11.1_MR4_Release_Notes.pdf))

### 2.4 Resources en kosten

- Resourcebibliotheek, **resourcemodellen** (sjablonen), **componentresources** (samengestelde
  ploegen: bijv. graafmachine + 2 kiepers + 3 man als één eenheid), allocatie aan activiteiten,
  resource-histogrammen en bar charts, en **werkelijke resources** naast geplande voor
  verbruiksanalyse (feature uit feb 2022).
- **Kosten en accounts:** kostenallocaties, expenses, kosten-/opbrengsthistogrammen, cashflow.
- **Nieuw in MR4:** geluidsniveau (dB) als resource-eigenschap, met berekend geluidsniveau per
  activiteit en rapportage in histogrammen — specifiek voor spoorwerk met geluidsvergunningen.
- **Automatische resource-levelling** wordt in de publieke documentatie **niet** beschreven; TILOS
  richt zich op visuele levelling via het diagram en de histogrammen. *(Beoordeling: geen
  volwaardige levelling-engine à la P6/MSP.)*

### 2.5 Baselines, voortgang en projectbeheersing

- **Meerdere baselines** aanmaken, beheren en over de actuele planning heen leggen.
- **Voortgangsmethoden:** percentage, hoeveelheid én **afstand** (tot welk station is een activiteit
  gevorderd) — dit laatste is precies wat op lineaire werken gemeten wordt.
- **Microprogress:** voortgang per deelsegment van één activiteit, inclusief conflictafhandeling.
  Dit is een echt onderscheidend punt: een 12 km leidingsleuf hoeft niet als één blok "43% gereed"
  te worden gerapporteerd, maar als "km 3,2–7,8 gereed, km 9,1–9,6 gereed".
- Voortgangsdashboards, activity progress summaries, productiviteitsanalyse baseline vs. actueel.
- **Earned Value Management** wordt niet als aparte module gedocumenteerd.
  ([tiloshelp.trimble.com/Project-Control](https://tiloshelp.trimble.com/Project-Control))

### 2.6 Risico / Monte Carlo — **niet aanwezig**

In de complete inhoudsopgave van de officiële help (24 hoofdsecties) komt **geen risicomodule,
geen driepuntsschatting en geen Monte-Carlo-simulatie** voor. Aggregatorsites als SoftwareSuggest
noemen "risk assessment" in featurelijstjes, maar dat is niet terug te vinden in de documentatie —
dat zijn overgenomen marketingtermen. Wie kwantitatieve risicoanalyse wil, doet dat in P6 + Primavera
Risk Analysis / Safran Risk / Acumen en gebruikt TILOS alleen voor de tijd-wegweergave.
([tiloshelp.trimble.com](https://tiloshelp.trimble.com/))

### 2.7 4D / BIM

- **TILOS heeft geen eigen 3D-viewer en leest zelf geen IFC.** De gedocumenteerde workflow is een
  keten: **Quantm** (tracébepaling) → LandXML → **Novapoint** (modelleren) → **IFC** →
  **Trimble Connect** (3D-visualisatie), terwijl TILOS via (Land)XML de as en de massa-data binnenhaalt
  en vervolgens **taken naar Trimble Connect synchroniseert**. In Connect klik je op een 3D-object en
  zie je de gekoppelde TILOS-taakattributen. Dát is het "4D".
- Vereisten voor de Connect-sync: **Tilos 10.3 of hoger (10.4+ aanbevolen)**, een **Standard-licentie
  of hoger**, en Trimble Identity + Trimble Connect-accounts.
- Daarnaast bidirectionele koppeling met **Trimble Quadri** via de **Quadri Task Connector API**
  (sinds Tilos 11, feb 2022) — objectgebaseerd in plaats van bestandsgebaseerd.
- Reviewers noemen het ontbreken van directe BIM/4D-integratie desondanks expliciet als tekortkoming
  ("Lacks integration with other software solutions such as BIM for 4D planning").
  ([tiloshelp.trimble.com/BIM-Data-Exchange-Sync](https://tiloshelp.trimble.com/BIM-Data-Exchange-Sync/Exchange-Data-with-Trimble-Connect),
  [Capterra-reviews](https://www.capterra.com/p/235928/TILOS/reviews/))

### 2.8 Portfolio en multi-project

Er is **geen portfoliolaag en geen multi-project-server**. Wel **sub-projecten binnen één
TILOS-bestand**, met eigen WBS — bedoeld om bijvoorbeeld de planningen van meerdere aannemers of
percelen tot één masterplanning samen te voegen. Alles is bestandsgebaseerd; er is geen centrale
database, geen check-in/check-out en geen gelijktijdige bewerking door meerdere planners.
([tiloshelp.trimble.com/Projects-and-Sub-Projects](https://tiloshelp.trimble.com/Projects-and-Sub-Projects))

### 2.9 Rapportage en presentatie

Dit is historisch een sterk punt: **PDF- en SVG-presentaties** op plotformaat met instelbare
detailniveaus en beeldresolutie, legenda's, logo's, grafieken, annotaties en afbeeldingen,
plus **Excel-rapportgeneratie** en vrij configureerbare tabelweergaven. In de praktijk levert TILOS
de "planning aan de wand" die op infraprojecten daadwerkelijk gebruikt wordt.

### 2.10 Platform en schaalbaarheid

| Aspect | Feitelijk |
|---|---|
| Platform | **Windows desktop only.** Geen web, geen cloud, geen macOS, geen mobiele app. |
| Architectuur | Bestandsgebaseerd, single-user per bestand; netwerkinstallatie en floating licenties mogelijk |
| Getest op | Windows 8 Pro en Windows 10 Pro, **32-bit én 64-bit**; Home-editie "not recommended" |
| Fileserver | Windows Server 2012 / 2016 / 2019 (64-bit), of SAN/NAS zichtbaar in Windows |
| Minimum | dual-core, **1 GB RAM**, 2 GB schijf, 1280×960 |
| Aanbevolen | quad-core (Core i5), **4 GB RAM**, Full HD |
| Ondersteunde koppelversies | MS Project 2016; Primavera P6 v7–v8; Asta Powerproject v14–v15 |

Bron: [Delta Solutions — TILOS 11 System Requirements](https://www.deltasolutions.com.au/tilos).
Deze eisen zijn in 2026 zichtbaar verouderd: een 32-bit build en een advies van 4 GB RAM horen bij
een codebase uit het vorige decennium.

**Schaalbaarheid — realistisch aantal activiteiten:** Trimble documenteert **geen harde limiet**.
Wat wél gedocumenteerd is: bij "large, complex layouts" ontstaan bekende problemen met PDF/SVG-export
(onvolledige SVG's, Acrobat dat *out of memory* crasht op de gegenereerde PDF, trage viewers bij fijne
rasterlijnen) — met als workaround het verlagen van beeldkwaliteit en detailniveau.
([Release Notes 11.1 MR4, "Known issues"](https://www.sitechcs.com/docs/Tilos_11.1_MR4_Release_Notes.pdf))

> **SCHATTING (niet door de leverancier bevestigd):** comfortabel werken lukt tot ongeveer
> **2.000–5.000 activiteiten** per bestand; **5.000–15.000** is haalbaar maar merkbaar traag bij
> herberekening en vooral bij het genereren van presentaties; boven ~15.000 activiteiten wordt de
> combinatie van 32-bit-geheugenruimte en de zware grafische laag een reëel probleem. Deze
> bandbreedte is afgeleid uit de systeemeisen, de 32-bit-build en de gedocumenteerde
> geheugenproblemen bij grote layouts — niet uit een benchmark.

De **demo-modus** slaat maximaal **10 objecten** op, dus zonder licentie is niets realistisch te doen.

---

## 3. Prijzen

Trimble publiceert **geen lijstprijzen**; alles gaat via distributeurs (SITECH, BuildingPoint,
Delta Solutions, Petroglyph, Projet Linéaire, BauComp). Hieronder alle publiek gerapporteerde bedragen
met bron en datum.

### 3.1 Gerapporteerde bedragen

| Bedrag | Model | Bron | Opgehaald |
|---|---|---|---|
| **US$ 4.290** | "flat rate, one-time payment" (eenmalig, per seat), gratis trial | [Capterra](https://www.capterra.com/p/235928/TILOS/) | 25-7-2026 |
| **US$ 4.290** | idem, "one-time cost", 4,1/5 uit 10 reviews | [Software Finder](https://softwarefinder.com/project-management-software/tilos) | 25-7-2026 |
| **US$ 4.290** | idem, flat rate one-time | [GetApp](https://www.getapp.com/project-management-planning-software/a/tilos/) | 25-7-2026 |
| **US$ 4.290** | idem, single plan | [Software Advice](https://www.softwareadvice.com/project-management/tilos-profile/) | 25-7-2026 |
| **US$ 2.095 per gebruiker per jaar** | abonnement, on-premises, Windows | [SoftwareConnect](https://softwareconnect.com/reviews/trimble-tilos/) | 25-7-2026 |
| Prijs niet getoond ("/ Jahr") | **Einzelplatzlizenz = single user, jaarabonnement**, automatische verlenging tenzij ≥90 dagen vooraf opgezegd | [BuildingPoint Schweiz](https://buildingpoint.ch/produkt/tilos-einzelplatzlizenz/) | 25-7-2026 |
| "op aanvraag" | — | [Techjockey (India)](https://www.techjockey.com/detail/tilos), [SoftwareSuggest](https://www.softwaresuggest.com/tilos), [Delta Solutions](https://www.deltasolutions.com.au/tilos), [BauComp (DE)](https://www.baucomp.com/produkte/tilos.html) | 25-7-2026 |

**Interpretatie van de twee hoofdgetallen:** het zijn geen tegenstrijdige cijfers maar de twee
licentiesporen naast elkaar — ± **US$ 4.290 eenmalig** voor een *perpetual* (Classic) seat, en
± **US$ 2.095 per seat per jaar** voor een *Named User*-abonnement. Dat de abonnementsprijs ongeveer
de helft van de perpetual-prijs is, is voor deze markt hoog en past bij een niche-tool met weinig
concurrentiedruk.

### 3.2 Licentiemodellen (officiële documentatie)

Uit [tiloshelp.trimble.com/Installation-and-Licensing/License-Tilos](https://tiloshelp.trimble.com/Installation-and-Licensing/License-Tilos)
en de [Release Notes 11.1 MR4](https://www.sitechcs.com/docs/Tilos_11.1_MR4_Release_Notes.pdf):

1. **Demo** — alle functies, maar opslaan beperkt tot 10 objecten.
2. **Named User** — term-based abonnement; inloggen met Trimble Identity (TID); beheer via het
   Trimble Civil Product Services-portaal; toewijzen/intrekken per e-mailadres; **7 dagen wachttijd
   voordat een ingetrokken seat opnieuw toegewezen kan worden**; **maximaal 7 dagen offline** werken
   tussen online verificaties; **één gelijktijdige sessie per TID**.
3. **Classic** — licentiebestand + serienummer; **perpetual**; lokaal of via netwerkinstallatie
   (floating); werkt zonder internet.

Historisch werden daarnaast **USB-donglelicenties** en **floating network / named user company
licenses** aangeboden, met perpetual + jaarlijks onderhoud óf een jaarabonnement als keuze
(gerapporteerd via een publiek gedeeld TILOS-licentiedocument; primaire bron niet meer leesbaar —
zie §9, betrouwbaarheid "laag").

### 3.3 Modules, staffels en minima

- Er is **geen publieke modulestructuur met losse prijzen**. Wel blijkt uit de documentatie dat er
  **functionele licentieniveaus** bestaan: de Trimble Connect / BIM-synchronisatie vereist een
  **"Standard TILOS license or higher"**. Prijsverschillen tussen die niveaus zijn niet gepubliceerd.
- **Enterprise-staffels en minimale afnames zijn niet publiek.** Distributeurs offreren per situatie.
- **Training** is in de praktijk een verplichte extra kostenpost: onafhankelijke vergelijkingen
  melden dat TILOS "several days of training by expert TILOS schedule trainers" vergt, tegenover
  minimale training bij een add-on als Turbo-Chart. Bedragen niet gepubliceerd.
  ([DuckDuckGo-index van PM ERA / vergelijkingspagina's](https://html.duckduckgo.com/html/?q=TILOS+vs+Turbo-Chart+linear+scheduling+comparison))

### 3.4 Waarschuwing bij één veelgevonden "prijsbron"

[pricingnow.com/question/tilos-pricing](https://pricingnow.com/question/tilos-pricing/) (opgehaald
25-7-2026) noemt US$ 4.290 voor 1 gebruiker, **US$ 42.900 voor 10 gebruikers en US$ 429.000 voor 100
gebruikers "annually"**, plus ~US$ 500/jaar support en een 3-jaars TCO van US$ 5.790.
**Deze cijfers zijn niet bruikbaar:** ze zijn lineair geëxtrapoleerd uit het Capterra-startbedrag,
verwarren eenmalig met jaarlijks, en zijn intern inconsistent (US$ 4.290 eenmalig + US$ 500/jaar geeft
geen US$ 5.790 over drie jaar bij de genoemde opbouw). Het is vrijwel zeker automatisch gegenereerde
content. Opgenomen omdat het hoog scoort in zoekresultaten en dus in andere onderzoeken zal opduiken.

### 3.5 Eigen inschatting van het reële prijspunt

> **SCHATTING.** Op basis van de twee harde ankerpunten (US$ 4.290 eenmalig / US$ 2.095 per jaar),
> de gebruikelijke onderhoudspercentages in deze markt en de Europese oorsprong van het product:
> - **Perpetual seat:** ± **€ 4.500 – € 9.000** afhankelijk van niveau (Basic/Standard/hoger) en land;
> - **Jaarlijks onderhoud/support:** ± **18–22 %** van de licentieprijs, dus ± **€ 900 – € 1.900** per seat per jaar;
> - **Named-User-abonnement:** ± **€ 1.800 – € 2.500** per seat per jaar;
> - **Implementatie + training:** ± **€ 3.000 – € 8.000** eenmalig per team (2–4 dagen trainer + templates).
>
> Deze bedragen zijn **niet** door Trimble of een distributeur bevestigd en dienen alleen als
> orde-van-grootte voor budgettering.

**Commerciële status na EOM:** licenties (nieuw, verlenging en uitbreiding) blijven **wél verkrijgbaar**
na 1 maart 2026, en sales/technische support blijft lopen via de licentieverstrekkers — maar de
software zelf blijft bevroren op 11.1 MR4.
([BuildingPoint AU](https://help.buildingpoint.com.au/hc/en-au/articles/55527556493849))

---

## 4. VOORDELEN

1. **Plaats is een eersteklas datamodel, geen plaatje.** Elke activiteit heeft een start- en eindstation;
   de helling van de lijn ís de productiesnelheid. Daardoor is een tijd-wegdiagram in TILOS bewerkbaar
   en herberekenbaar, terwijl het in P6/MSP hooguit een geëxporteerde tekening is.
   *(bron: [tiloshelp.trimble.com](https://tiloshelp.trimble.com/), [tilosamericas.com](https://tilosamericas.com/linear-scheduling-software/))*

2. **Eén blad in plaats van veertig pagina's balkenschema.** Meerdere reviewers noemen exact dit als
   hoofdreden: *"displays entire project on one page, instead of 40 pages of Gantt chart"* en
   *"a single page rather than multiple charts"*. Voor stuurgroepen, opdrachtgevers en de uitvoering
   is dat het verschil tussen een planning die gelezen wordt en een die in de la verdwijnt.
   *(bron: [Capterra-reviews](https://www.capterra.com/p/235928/TILOS/reviews/), [GetApp](https://www.getapp.com/project-management-planning-software/a/tilos/))*

3. **Lineair-specifieke rekenlogica die generieke CPM-tools niet hebben:** afstandsafhankelijke lags,
   `Keep Distance`-links tussen opeenvolgende ploegen, snelheidssynchronisatie van parallelle
   processen en automatische berekening van **ontmoetingspunten**. Dit zijn precies de vragen die op
   een leidingtracé of spoorvernieuwing dagelijks spelen.
   *(bron: [tiloshelp.trimble.com/Scheduling-CPM](https://tiloshelp.trimble.com/Scheduling-CPM/Understand-Scheduling))*

4. **Geografie en grondverzet geïntegreerd in de planning.** Massa-verzet (cut/fill), lengteprofiel,
   dwarsprofielen, sectoren met bodemtypes, kruisingen, wissels en kunstwerken liggen als lagen onder
   het diagram. Grondbalans en planning worden in hetzelfde bestand geoptimaliseerd in plaats van in
   twee losse werelden.
   *(bron: [tiloshelp.trimble.com/Mass-Haulage](https://tiloshelp.trimble.com/), [construction.trimble.com](https://construction.trimble.com/en/products/tilos))*

5. **Microprogress: voortgang per kilometersegment.** Voortgang kan per deel van een activiteit worden
   ingevoerd en beoordeeld, met conflictafhandeling. Op een 12 km sleuf geeft dat een eerlijk beeld
   ("km 3,2–7,8 gereed") in plaats van een misleidend percentage. Dit is de functie die claim- en
   productiviteitsanalyses op lineaire werken daadwerkelijk mogelijk maakt.
   *(bron: [tiloshelp.trimble.com/Project-Control](https://tiloshelp.trimble.com/Project-Control))*

6. **Het is een volwaardig planningspakket, geen visualisatie-add-on.** Eigen CPM-engine, kalenders,
   baselines, resources, kosten, histogrammen en WBS. Dat is het structurele verschil met concurrent
   Turbo-Chart, dat charts genereert uit een bestaande P6/MSP-planning maar zelf niets uitrekent.
   *(bron: [SourceForge-vergelijking TILOS vs Turbo-Chart](https://sourceforge.net/software/compare/TILOS-vs-Turbo-Chart/))*

7. **Co-existentie met de contractplanning.** TILOS is ontworpen om náást P6/MS Project/Asta te draaien:
   contractueel lever je P6 aan, intern plan je in TILOS. Reviewers noemen expliciet dat de
   P6-integratie helpt om *"overlaps and discrepancies"* te vinden — TILOS als toetsinstrument op een
   bestaande CPM-planning.
   *(bron: [Software Advice](https://www.softwareadvice.com/project-management/tilos-profile/))*

8. **Uitzonderlijk sterke output voor grootformaat.** PDF/SVG-presentaties met instelbaar detailniveau
   en beeldresolutie, legenda's, logo's, annotaties, plotformaten. In een sector waar de planning
   letterlijk aan de keetwand hangt, is dit een echt functioneel voordeel en geen cosmetiek.
   *(bron: [Release Notes 11.1 MR4](https://www.sitechcs.com/docs/Tilos_11.1_MR4_Release_Notes.pdf))*

9. **Bewezen op megaprojecten en breed geaccepteerd bij grote infra-aannemers.** Referenties lopen van
   Vinci, Eiffage, SNCF, RATP en Alstom tot Enbridge, Granite, Parsons, Mexico City Metro en
   Amerikaanse DOT's; projecten als de Fehmarnbelt-tunnel en Toronto RER. Een tijd-wegplanning uit
   TILOS wordt door tegenpartijen herkend en geaccepteerd.
   *(bron: [tilos360.com](https://www.tilos360.com/en/home/), [petroglyphprojects.com](https://petroglyphprojects.com/software-solutions/tilos/))*

10. **Perpetual + volledig offline mogelijk.** De Classic-licentie werkt zonder internet en zonder
    cloudaccount — relevant voor projecten met strenge IT-restricties, en het is de reden waarom
    TILOS na de EOM-datum gewoon door kan draaien.
    *(bron: [tiloshelp.trimble.com/Installation-and-Licensing/License-Tilos](https://tiloshelp.trimble.com/Installation-and-Licensing/License-Tilos))*

---

## 5. NADELEN

1. **End of Maintenance per 1 maart 2026 — dit overschaduwt alles.** Geen nieuwe functies, **geen
   bugfixes en geen securitypatches** meer. De laatste functionele release is **11.1 MR4 van
   13 januari 2023**: het product stond dus al drie jaar stil vóór de aankondiging. Voor nieuwe
   aanschaf is dit diskwalificerend; voor bestaande gebruikers is het een migratieklok.
   *(bron: [BuildingPoint AU, 27-2-2026](https://help.buildingpoint.com.au/hc/en-au/articles/55527556493849), [tiloshelp.trimble.com/Downloads](https://tiloshelp.trimble.com/Downloads))*

2. **Verouderde gebruikersinterface — consistent genoemd in reviews.** *"The user interface looks and
   feels antiquated"* komt letterlijk terug bij meerdere onafhankelijke reviewers. De systeemeisen
   bevestigen het beeld: **32-bit build**, getest op Windows 8/10, 1–4 GB RAM aanbevolen.
   *(bron: [Capterra-reviews](https://www.capterra.com/p/235928/TILOS/reviews/), [Software Advice](https://www.softwareadvice.com/project-management/tilos-profile/), [Delta Solutions systeemeisen](https://www.deltasolutions.com.au/tilos))*

3. **Steile leercurve én schrale leermiddelen.** Reviewers melden *"challenges in accessing learning
   materials"* en vragen om *"well-structured documentation"*. De **help bestaat alleen in Engels en
   Duits** terwijl de UI in 10 talen wordt geleverd, en Trimble erkent in MR4 zelf dat de nieuwe
   helpsite *"a work-in-progress"* is met nog niet-bijgewerkte content. Onafhankelijke vergelijkingen
   spreken van meerdere dagen trainer-geleide training.
   *(bron: [Capterra-reviews](https://www.capterra.com/p/235928/TILOS/reviews/), [Release Notes 11.1 MR4](https://www.sitechcs.com/docs/Tilos_11.1_MR4_Release_Notes.pdf))*

4. **Functionele witte vlekken:** geen risicoanalyse/Monte Carlo, geen earned value als module, geen
   gedocumenteerde automatische resource-levelling, geen portfolio-/programmalaag, geen multi-user
   database, geen web-, cloud- of mobiele client, geen macOS. Alles is een enkelvoudig
   Windows-bestand op één machine.
   *(bron: [volledige help-inhoudsopgave, tiloshelp.trimble.com](https://tiloshelp.trimble.com/))*

5. **Zwakke native BIM/4D — precies wat reviewers missen.** *"Lacks integration with other software
   solutions such as BIM for 4D planning."* TILOS leest zelf geen IFC; 4D bestaat alleen als
   taken-synchronisatie naar Trimble Connect, waarvoor bovendien een hogere licentie (Standard+),
   Trimble Identity en Trimble Connect nodig zijn. Je koopt daarmee de facto een Trimble-stack in.
   *(bron: [Capterra-reviews](https://www.capterra.com/p/235928/TILOS/reviews/), [tiloshelp.trimble.com/BIM-Data-Exchange-Sync](https://tiloshelp.trimble.com/BIM-Data-Exchange-Sync/Exchange-Data-with-Trimble-Connect))*

6. **Structureel informatieverlies bij uitwisseling met P6.** Officieel gedocumenteerd: *"Only basic
   link attributes will be exchanged such as link type and time lag"* — de **afstandsgebonden links,
   dus de kern van TILOS, gaan niet mee**. Resource-allocaties worden versimpeld tot totale
   inspanning/hoeveelheid + kosten; **split activities kunnen niet vanuit P6 worden bijgewerkt**;
   voortgangsuitwisseling vereist de "simple progress method". Twee planningen naast elkaar
   onderhouden wordt daarmee handwerk.
   *(bron: [tiloshelp.trimble.com — Exchange Data with Primavera](https://tiloshelp.trimble.com/Import-Export-and-Data-Exchange/Exchange-Data-with-Primavera))*

7. **Aantoonbaar bugverleden in juist de uitwisselingslaag.** De MR4-release notes lossen op: verkeerde
   activiteitduren na import uit MS Project (40 dagen werd 118 dagen), verkeerde duren bij import die
   *"resulted in wrong schedules"*, verloren parent/WBS-structuur bij Excel-import uit meerdere sheets,
   genegeerde sub-project-ID's bij P6-import, niet-importeerbare P6-XML, en foutieve
   `Keep Distance`-afstandsberekeningen. Dit zijn stille rekenfouten in de basis, pas in 2023 gefixt —
   en na 1 maart 2026 wordt niets meer gefixt.
   *(bron: [Release Notes 11.1 MR4](https://www.sitechcs.com/docs/Tilos_11.1_MR4_Release_Notes.pdf))*

8. **Koppelingen lopen achter op de versies van de andere pakketten.** Officieel ondersteund:
   MS Project **2016**, Primavera P6 **v7–v8**, Asta Powerproject **v14–v15**. In de known issues staat
   bovendien dat **Powerproject boven v14 niet ondersteund is** tenzij je een aparte fix installeert.
   De RIB iTwo-koppeling was *"unsupported for years"* en is in MR4 uit de profieleditor verwijderd.
   *(bron: [Delta Solutions systeemeisen](https://www.deltasolutions.com.au/tilos), [Release Notes 11.1 MR4](https://www.sitechcs.com/docs/Tilos_11.1_MR4_Release_Notes.pdf))*

9. **Bekende instabiliteit bij grote, complexe plannen.** Gedocumenteerde known issues: SVG-presentaties
   die onvolledig zijn, PDF's waarop Acrobat *out of memory* crasht, viewers die vastlopen op fijne
   rasterlijnen, crashes in presentatiemodus en bij ingesloten OLE-objecten. Workaround: beeldkwaliteit
   en detailniveau verlagen — dus de output degraderen.
   *(bron: [Release Notes 11.1 MR4, Known issues](https://www.sitechcs.com/docs/Tilos_11.1_MR4_Release_Notes.pdf))*

10. **Vendor lock-in in een gesloten binair bestandsformaat.** De planning leeft in een proprietary
    TILOS-bestand (gecomprimeerde variant `.hspzip`, backups `.hsb`/`.hsbzip`). Er is **geen publieke
    API/SDK**, geen open schema, geen scriptinterface; automatisering kan alleen via import/export-profielen.
    Nu het product uitfaseert, wordt die lock-in acuut: jarenlang opgebouwde planningen zitten in een
    formaat dat niemand anders kan lezen. *(De niet-gecomprimeerde extensie is niet publiek
    gedocumenteerd; vermoedelijk `.hsp` — **afleiding uit de backup-extensies, geen bevestigd feit**.)*
    *(bron: [Release Notes 11.1 MR4](https://www.sitechcs.com/docs/Tilos_11.1_MR4_Release_Notes.pdf))*

11. **Beperkte support-dekking.** De Europese hotline draait **ma–do 08:30–17:30 en vr 08:30–13:00
    (GMT+1)** vanuit Karlsruhe — geen 24/7, geen follow-the-sun. Eén Capterra-reviewer geeft support
    een **0,0/5**; de gemiddelde support-score op Software Advice is 4,0/5 maar op slechts drie reviews.
    *(bron: [Release Notes 11.1 MR4](https://www.sitechcs.com/docs/Tilos_11.1_MR4_Release_Notes.pdf), [Capterra](https://www.capterra.com/p/235928/TILOS/reviews/), [Software Advice](https://www.softwareadvice.com/project-management/tilos-profile/))*

12. **Vrijwel geen publieke reviewbasis om op te sturen.** Capterra/GetApp/Software Advice: **3 reviews**
    (4,7/5); Software Finder: 10 reviews (4,1/5); Techjockey: 4 ratings (4,4/5); G2, TrustRadius,
    SoftwareSuggest en SourceForge: **geen reviews**. Bovendien staat TILOS op meerdere aggregators
    onder een verkeerde vendor ("Tilos Americas, opgericht 2017, Canada") of zelfs verward met een
    duikuitrustingsmerk. Onafhankelijke validatie van claims is daardoor nauwelijks mogelijk.
    *(bronnen: zie §9)*

---

## 6. Interoperabiliteit

> Dit hoofdstuk is voor de opdrachtgever het belangrijkste, omdat het precies de gaten laat zien die
> een open, IFC-gebaseerde planner kan vullen.

### 6.1 Ondersteunde uitwisseling — het volledige beeld

| Doel/formaat | Ondersteund? | Detail |
|---|---|---|
| **Primavera P6 — XER** | **Nee** | Niet ondersteund. Alleen het **native P6 XML**-formaat wordt gebruikt; sinds v11 is de Primavera-API niet meer nodig. |
| **Primavera P6 — P6 XML** | Ja, bi-directioneel | Activiteiten (alle sub-projecten), WBS-matching, activity codes ↔ categorieën, links (**alleen type + tijd-lag**), resource-allocaties (versimpeld: totale inspanning/hoeveelheid + kosten), kostenallocaties/expenses, voortgang, en TILOS-specifieke gegevens (activity templates, sectorprofielen/distance coordinates, layers) **via UDF's of code libraries**. |
| **MS Project — MSPDI/XML** | Ja | Inclusief overname van de MS Project-projectkalender (sinds MR4); Text10-veld en meerdere duurberekeningsbugs pas in MR4 gefixt. |
| **MS Project — MPX** | Genoemd in de documentatie | Legacy-formaat. |
| **MS Project — MPP (native)** | **Nee** | Geen native MPP-lezer; uitwisseling loopt via XML. |
| **Asta Powerproject** | Ja, via XML + macro | v14 ondersteund; **v15 alleen met aparte fix**; hoger niet ondersteund. |
| **Excel / CSV / ASCII (tekst)** | Ja, uitgebreid | Activiteiten, links, resources, station points, dagelijkse voortgangsrapporten met automatische activiteitentoewijzing; import/export via **clipboard**; Excel-rapportgeneratie. Configureerbare tekstprofielen. |
| **Generieke XML met eigen profiel** | Ja | Eigen import/export-profielen met veldmapping — de meest open haak die TILOS biedt. |
| **LandXML** | Ja (import) | Alignment/tracé, o.a. uit Trimble Quantm. |
| **IFC (elke versie, incl. 4.3)** | **Nee — TILOS leest en schrijft zelf geen IFC** | In de gedocumenteerde workflow gaat het IFC-model van Novapoint naar **Trimble Connect**; TILOS krijgt alleen (Land)XML (as, massa-data) en synchroniseert taken naar Connect. |
| **IfcWorkSchedule / IfcTask / IfcTaskTime / IfcWorkCalendar** | **Nee** | Geen enkele planningsentiteit van IFC wordt geïmporteerd of geëxporteerd. |
| **Trimble Connect** | Ja (taken-sync) | Vereist Tilos ≥10.3 (10.4+ aanbevolen), **Standard-licentie of hoger**, Trimble Identity + Connect-account. Taken (naam, ID, data, start-/eindstation) worden gesynct; in Connect klik je een 3D-object aan en ziet de TILOS-taakattributen. Bekende gebreken in MR4: extra attributen zonder waarden, tokennamen in het commentaarveld, hoeveelheden onzichtbaar in Connect, verkeerde startdatum in Connect. |
| **Trimble Quadri** | Ja, bi-directioneel | Via de **Quadri Task Connector API** (sinds Tilos 11, feb 2022) — objectgebaseerd, zonder bestandsuitwisseling. |
| **Trimble Novapoint / Business Center / Quantm / Tekla Civil / WorksOS** | Ja | Eigen exchange-secties in de help. |
| **RIB iTwo** | Nee (verwijderd) | *"unsupported for years"*, in MR4 uit de profieleditor gehaald. |
| **Publieke API / SDK / scripting** | **Nee** | Geen gedocumenteerde programmeerinterface. Automatisering alleen via import/export-profielen; de enige API in het verhaal is die van Quadri (Trimble-zijde). |
| **Native bestandsformaat** | Proprietary binair | Gecomprimeerd `.hspzip`, backups `.hsb` / `.hsbzip`. Geen open schema, geen documentatie. |

Bronnen: [tiloshelp.trimble.com/Import-Export-and-Data-Exchange](https://tiloshelp.trimble.com/Import-Export-and-Data-Exchange),
[Exchange Data with Primavera](https://tiloshelp.trimble.com/Import-Export-and-Data-Exchange/Exchange-Data-with-Primavera),
[BIM Workflow in Trimble Connected Construction Continuum](https://tiloshelp.trimble.com/BIM-Data-Exchange-Sync/Exchange-Data-with-Trimble-Connect/BIM-Workflow-in-Trimble-Connected-Construction-Continuum),
[Release Notes 11.1 MR4](https://www.sitechcs.com/docs/Tilos_11.1_MR4_Release_Notes.pdf),
[Delta Solutions systeemeisen](https://www.deltasolutions.com.au/tilos).

### 6.2 Import/export-beperkingen die er echt toe doen

- **Het kroonjuweel gaat niet over de grens.** Afstandsgebonden links, `Keep Distance`-relaties,
  snelheidssynchronisatie en ontmoetingspunten bestaan alleen binnen TILOS. Export naar P6 levert een
  gewone CPM-planning op; de lineaire logica is weg. Terug-import herstelt dat niet.
- **Stationgegevens reizen als UDF, niet als eersteklas data.** Distance coordinates/sectorprofielen
  gaan naar P6 als *user defined fields* of activity codes — een tekstueel plakmiddel dat bij elke
  ronde opnieuw gemapt moet worden.
- **Voortgang is bidirectioneel beperkt:** alleen "simple progress method"; **microprogress**, de
  sterkste feature, kent geen uitwisselingspad. Split activities kunnen niet vanuit P6 worden bijgewerkt.
- **Resources worden platgeslagen** tot totale inspanning/hoeveelheid + kosten; het rijkere
  TILOS-resourcemodel (componentresources, resourcemodellen) heeft geen equivalent.
- **XER ontbreekt volledig**, terwijl XER in grote delen van de markt (VS, Midden-Oosten, olie & gas)
  nog steeds het feitelijke uitwisselingsformaat tussen opdrachtgever en aannemer is. Klanten die XER
  eisen, moeten die conversie buiten TILOS om doen.

### 6.3 Wat dit betekent voor een open, IFC-gebaseerde planner

De gaten zijn opvallend goed te dekken met wat **IFC 4.3** standaard al biedt:

- **IFC 4.3 heeft precies het ontbrekende model.** `IfcAlignment` (horizontaal/verticaal/cant),
  `IfcReferent` (kilometrering/stationing) en lineaire plaatsing geven de **plaats-as** die TILOS
  proprietary in zijn bestandsformaat opsluit. Gecombineerd met `IfcWorkSchedule`, `IfcTask`,
  `IfcTaskTime`, `IfcRelSequence` (inclusief lag) en `IfcWorkCalendar` is een tijd-wegdiagram in een
  **open, gestandaardiseerd model** uit te drukken — wat vandaag nergens gebeurt.
- **Er is geen concurrent die IFC-native tijd-wegplanning doet.** TILOS niet, Turbo-Chart niet, Asta
  Time Chainage niet. Dit is een reëel open gat, geen inhaalslag.
- **XER-ondersteuning is een goedkoop concurrentievoordeel.** TILOS ondersteunt het niet; een open
  planner die XER *en* P6 XML *en* MSPDI *en* IFC leest, is direct interoperabeler dan het commerciële
  product dat hij vervangt.
- **De EOM-datum creëert een migratiemarkt.** Bestaande TILOS-gebruikers moeten hoe dan ook bewegen.
  Een importpad dat TILOS-planningen via **P6 XML** of **Excel/tekstexport** binnenhaalt (de twee
  routes die TILOS wél goed ondersteunt), is de praktische migratiebrug — een directe
  `.hspzip`-lezer is niet realistisch zonder reverse engineering.

---

## 7. Marktpositie

### 7.1 Waar sterk, en waarom

TILOS is sinds circa 2000 de **de-facto standaard voor time-chainage planning in zware infrastructuur**.
De reden is simpel: het was jarenlang het enige pakket met een échte lineaire rekenkern in plaats van
een tekenlaag. Sterkste posities:

- **Spoor en tram** (Duitsland, Frankrijk, UK, Australië) — inclusief geluidsrapportage per activiteit,
  wissels, kruisingen en buitendienststellingen.
- **Pijpleidingen** (Noord-Amerika, Midden-Oosten) — het klassieke "spread"-model met ploegen die
  elkaar op vaste afstand volgen, is exact wat `Keep Distance`-links modelleren.
- **Snelwegen, tunnels, hoogspanning, waterbouw.**
- **Claims en forensic delay analysis** op lineaire werken: een tijd-wegdiagram maakt verstoringen
  ruimtelijk aantoonbaar op een manier die een Gantt niet kan.

Reseller Tilos Americas claimt dat *"4 out of 5 global leaders in linear infrastructure construction
prefer TILOS"*. Dat is **marketing zonder verifieerbare onderbouwing** — geen onafhankelijke bron
bevestigt marktaandeelcijfers. *(Bron van de claim: [tilosamericas.com](https://tilosamericas.com/); beoordeling: onbevestigd.)*

### 7.2 Belangrijkste concurrenten

| Concurrent | Type | Positionering t.o.v. TILOS |
|---|---|---|
| **TILOS 360** (Projet Linéaire, FR) | Tijd-weg + Gantt + fasering | **De aangewezen opvolger**, gelanceerd april 2026; "moderne architectuur", uitgebreide werkfaseringstools, vertrouwde workflows. Klantenlijst: Vinci, SNCF, RATP, Eiffage, Alstom. |
| **Turbo-Chart** (Linear Project Software, AU) | Add-on/desktop | Genereert time-location charts uit een bestaande P6/MSP/Asta/Safran-planning. Veel goedkoper, "minimal training", maar **geen eigen planningsengine** — visualisatie, geen planning. Grootste bedreiging voor TILOS' onderkant. |
| **Asta Powerproject** (Elecosoft, UK) | Volwaardig CPM + Time Chainage-module | Sterk in UK/Ierland; tijd-weg als module binnen een compleet planningspakket; goedkoper en moderner. |
| **Bentley SYNCHRO / OpenRail** | 4D + CPM | Sterker in 3D/4D en modelgedreven werken; zwakker in klassiek tijd-wegdiagram. |
| **DynaRoad** | Massa-verzet + lineaire productieplanning | Nichespeler op grondverzet/aardebaan. |
| **InEight Schedule, Safran, ALICE Technologies** | Enterprise CPM / AI-planning | Concurreren op risico, capital projects en optimalisatie — niet op tijd-weg. |
| **Primavera P6 / MS Project** | Contractplanning | Geen concurrent maar de laag *waarnaast* TILOS draait. Tegelijk de reden dat veel organisaties TILOS afschaffen: "we hebben P6 toch al". |

*(bronnen: [SourceForge-vergelijking](https://sourceforge.net/software/compare/TILOS-vs-Turbo-Chart/), [tilos360.com](https://www.tilos360.com/en/home/), [BuildingPoint AU](https://help.buildingpoint.com.au/hc/en-au/articles/55527556493849))*

> Let op bij vergelijkingssites: **contechfinder.com** verwart TILOS met een duikuitrustingsmerk
> ("innovative gear for the modern explorer") en noemt het web-based. Die vergelijkingen zijn onbruikbaar.

### 7.3 Trend

**Krimpend en uitfaserend.** De feitelijke tijdlijn:

- Laatste functionele release: **jan 2023**;
- Formele End of Maintenance: **1 maart 2026**;
- Het distributiekanaal (BuildingPoint Australia, Delta Solutions, en eerder Petroglyph in de VS en
  Projet Linéaire in Frankrijk) stuurt klanten actief naar **TILOS 360** — een product van een derde;
- Trimble concentreert zijn civiele portfolio op **Quadri, Novapoint, Trimble Connect, Business Center
  en WorksOS**; de planningsniche past daar niet meer in.

Het meest veelzeggende signaal: **de opvolger komt niet van Trimble maar van een voormalige
distributeur.** De acquisitie van 2015 heeft strategisch niet gebracht wat Trimble ervan verwachtte —
TILOS is nooit geïntegreerd tot een centraal onderdeel van de Trimble-stack, maar bleef een
Duitse desktop-satelliet met eigen support-hotline in Karlsruhe.

### 7.4 Verplichtstellingen

Er is **geen bewijs gevonden** van een formele klant- of overheidsmandaat dat specifiek TILOS
voorschrijft. Wel eisen veel opdrachtgevers in spoor en wegen een **tijd-wegweergave** als
contractdeliverable naast de CPM-planning; TILOS was daarvoor lang de standaardoplossing, maar de eis
is toolneutraal geformuleerd. *(Zoekopdrachten naar Network Rail-/HS2-/DOT-specificaties leverden geen
expliciete toolverplichting op.)*

---

## 8. Eindoordeel

### Voor wie is TILOS (nog) de juiste keuze

- **Bestaande gebruikers met een lopend megaproject** en een gevalideerde template- en
  bibliotheekset. De Classic-licentie blijft werken, licenties blijven verkrijgbaar, support blijft
  via de distributeur beschikbaar. Doordraaien tot projecteinde is verdedigbaar — mits het
  bevroren-software-risico expliciet is geaccepteerd.
- **Organisaties die een tijd-wegplanning met een échte rekenkern nodig hebben** (ontmoetingspunten,
  keep-distance, snelheidssynchronisatie, microprogress) en waarvoor een visualisatie-add-on
  aantoonbaar tekortschiet — en die accepteren dat ze op de laatste versie blijven zitten.
- **Teams die al diep in de Trimble-civielstack zitten** (Quadri, Novapoint, Connect, Business Center)
  en de bestaande koppelingen willen benutten.
- **Claim- en delay-analisten** die een bestaand TILOS-bestand moeten kunnen openen en analyseren.

### Voor wie niet

- **Iedereen die in 2026 nieuw aanschaft.** Software zonder securitypatches met een niet-Trimble
  opvolger in de markt: dat is geen aankoop, dat is een migratieproject met vertraagde start.
- **Organisaties met BIM/IFC als spil.** Geen IFC-lezer, 4D alleen via een Trimble-omweg, geen
  IfcTask/IfcWorkSchedule-uitwisseling. Wie modelgedreven wil plannen, komt hier niet uit.
- **Teams die cloud, web, samenwerking of mobiel nodig hebben.** Windows-desktop, single-user
  bestanden, geen server.
- **Organisaties met kwantitatieve risico-eisen** (P50/P80, Monte Carlo). Ontbreekt volledig.
- **Kleinere aannemers.** Circa US$ 4.290 per seat plus meerdaagse training voor één specialistische
  weergave is niet te rechtvaardigen naast een Turbo-Chart of de Time Chainage-module van Asta.
- **Iedereen die zijn planningsdata leesbaar en overdraagbaar wil houden.** Gesloten binair formaat,
  geen API, informatieverlies bij elke export — en nu een leverancier die het onderhoud staakt.

### Samenvattend oordeel

TILOS is functioneel nog steeds de **rijkste tijd-wegplanner die er is** en verdient respect voor een
datamodel dat in 1998 al klopte: plaats als eersteklas dimensie, snelheid als helling, voortgang per
kilometersegment. Maar het is ook een lesboekvoorbeeld van hoe een niche-product na acquisitie kan
verschralen — drie jaar geen release, een 32-bit codebase, een gesloten formaat, koppelingen die
achterlopen op P6 v8 en Powerproject v14, en uiteindelijk een End of Maintenance waarbij de opvolging
aan een ex-distributeur wordt overgelaten.

**Voor het project van de opdrachtgever is TILOS daarom dubbel relevant:** het is de functionele
benchmark waartegen een tijd-wegmodule gemeten moet worden, én het is het beste argument vóór een
open, IFC-gebaseerde aanpak. De lock-in die TILOS-klanten nu voelen — planningen in een binair formaat
dat niemand anders leest, bij een leverancier die stopt — is precies de pijn die een open standaard
wegneemt. En IFC 4.3 heeft, met `IfcAlignment` + `IfcReferent` naast `IfcWorkSchedule`/`IfcTask`, alle
ingrediënten in huis om het tijd-wegdiagram voor het eerst in een open model te vatten.

---

## 9. Bronnen

### Leverancier en officiële documentatie

1. Trimble — *Tilos: Linear Scheduling Software for Infrastructure* — https://construction.trimble.com/en/products/tilos (opgehaald 25-7-2026)
2. Trimble GEDO — *TILOS Scheduling* — https://gedo.trimble.com/en/products-and-solutions/tilos-scheduling (25-7-2026)
3. **Tilos Help (officiële documentatie)** — https://tiloshelp.trimble.com/ (25-7-2026)
   - Inhoudsopgave / 24 hoofdsecties — https://tiloshelp.trimble.com/
   - *Scheduling (CPM) — Understand Scheduling* — https://tiloshelp.trimble.com/Scheduling-CPM/Understand-Scheduling
   - *Import, Export, and Data Exchange* — https://tiloshelp.trimble.com/Import-Export-and-Data-Exchange
   - *Exchange Data with Primavera* — https://tiloshelp.trimble.com/Import-Export-and-Data-Exchange/Exchange-Data-with-Primavera
   - *Exchange Data with Trimble Connect* — https://tiloshelp.trimble.com/BIM-Data-Exchange-Sync/Exchange-Data-with-Trimble-Connect
   - *BIM Workflow in Trimble Connected Construction Continuum* — https://tiloshelp.trimble.com/BIM-Data-Exchange-Sync/Exchange-Data-with-Trimble-Connect/BIM-Workflow-in-Trimble-Connected-Construction-Continuum
   - *Project Control* — https://tiloshelp.trimble.com/Project-Control
   - *Resources* — https://tiloshelp.trimble.com/Resources
   - *Projects and Sub-Projects* — https://tiloshelp.trimble.com/Projects-and-Sub-Projects
   - *Installation and Licensing — License Tilos* — https://tiloshelp.trimble.com/Installation-and-Licensing/License-Tilos
   - *Downloads* (versiehistorie: 11.1 MR1 30-9-2021, MR3 24-3-2022, MR4 13-1-2023) — https://tiloshelp.trimble.com/Downloads
4. **Tilos 11.1 MR4 Release Notes, januari 2023 (PDF, Trimble/SITECH)** — https://www.sitechcs.com/docs/Tilos_11.1_MR4_Release_Notes.pdf — *belangrijkste primaire technische bron: nieuwe functies, 60+ bugfixes, known issues, talen, supporttijden*

### Statuswijziging / End of Maintenance

5. **BuildingPoint Australia — *"📢 Important Announcement: Tilos Entering End of Maintenance on 1 March 2026"*** — https://help.buildingpoint.com.au/hc/en-au/articles/55527556493849 (artikel aangemaakt 27-2-2026, bijgewerkt 3-6-2026; opgehaald 25-7-2026 via de Zendesk help-center-API) — *primaire bron voor EOM-datum, laatste versie, licentie-implicaties en de verwijzing naar TILOS 360 van Projet Linéaire*
6. Tilos360 (Projet Linéaire) — https://www.tilos360.com/en/home/ en https://www.tilos360.com/en/who-are-we/ (25-7-2026)
7. Projet Linéaire — nieuwsarchief (Tilos 11-lancering feb 2022, MR3 maart 2022, Quadri Task Connector) — https://www.projetlineaire.com/actualites-projet-lineaire/ (25-7-2026)
8. Tilos France (Projet Linéaire, verouderd — toont nog TILOS 10) — https://www.tilosfrance.com/ (25-7-2026)

### Historie / overname

9. **PR Newswire — *Trimble Acquires Linear Project to Expand its Heavy Civil Construction Project Management Capabilities*, 5 maart 2015** — https://www.prnewswire.com/news-releases/trimble-acquires-linear-project-to-expand-its-heavy-civil-construction-project-management-capabilities-300045810.html
10. Petroglyph Project Analytics — *partnership met Projet Linéaire*, 25 mei 2019 — https://www.petroglyphprojects.com/blog/petroglyph-project-analytics-now-provides-tilos-linear-software-sales-announces-partnership-with-projet-lineaire/

### Prijzen

11. Capterra — TILOS (US$ 4.290 flat rate one-time; 4,7/5, 3 reviews) — https://www.capterra.com/p/235928/TILOS/ (25-7-2026)
12. Capterra — TILOS reviews (volledige review-teksten) — https://www.capterra.com/p/235928/TILOS/reviews/ (25-7-2026)
13. GetApp — TILOS (US$ 4.290 flat rate one-time) — https://www.getapp.com/project-management-planning-software/a/tilos/ (25-7-2026)
14. Software Advice — TILOS (US$ 4.290; deelscores ease of use 4,3 / value 4,5 / support 4,0 / functionality 4,7) — https://www.softwareadvice.com/project-management/tilos-profile/ (25-7-2026)
15. Software Finder — TILOS (US$ 4.290 one-time; 4,1/5 uit 10 reviews) — https://softwarefinder.com/project-management-software/tilos (25-7-2026)
16. **SoftwareConnect — Trimble Tilos (US$ 2.095 per gebruiker per jaar, on-premises, Windows)** — https://softwareconnect.com/reviews/trimble-tilos/ (25-7-2026)
17. BuildingPoint Schweiz — *Tilos Einzelplatzlizenz* (single user, jaarabonnement, 90 dagen opzegtermijn; prijs niet getoond) — https://buildingpoint.ch/produkt/tilos-einzelplatzlizenz/ (25-7-2026)
18. Techjockey (India) — *"price details available on request"*; 4,4/5 uit 4 ratings — https://www.techjockey.com/detail/tilos (25-7-2026)
19. ⚠️ PricingNow — TILOS pricing — https://pricingnow.com/question/tilos-pricing/ (25-7-2026) — **onbetrouwbaar, waarschijnlijk gegenereerd; zie §3.4**
20. ⚠️ Scribd — *TILOS License Information* — https://www.scribd.com/document/461948011/TILOS-License-Information — **inhoud niet leesbaar bij ophalen; alleen indirect via zoeksnippets (perpetual + onderhoud, jaarabonnement, demo; single user / USB / floating network / named user company) — betrouwbaarheid laag**

### Reviews, vergelijkingen en resellers

21. Delta Solutions (AU) — TILOS incl. **volledige TILOS 11-systeemeisen** — https://www.deltasolutions.com.au/tilos (25-7-2026)
22. Tilos Americas — https://tilosamericas.com/ en https://tilosamericas.com/linear-scheduling-software/ (25-7-2026)
23. Petroglyph Projects — TILOS (sectoren, klanten, import/export) — https://petroglyphprojects.com/software-solutions/tilos/ (25-7-2026)
24. SITECH Construction Systems — Tilos — https://sitechcs.com/tilos/ (25-7-2026)
25. SourceForge — *TILOS vs. Turbo-Chart* — https://sourceforge.net/software/compare/TILOS-vs-Turbo-Chart/ (25-7-2026)
26. Slashdot — TILOS (geen reviews; vendor foutief als "Tilos Americas, 2017, Canada") — https://slashdot.org/software/p/TILOS/ (25-7-2026)
27. SoftwareSuggest — TILOS (0 reviews) — https://www.softwaresuggest.com/tilos (25-7-2026)
28. BauComp (DE) — TILOS *Grafische Weg-Zeit-Planung* — https://www.baucomp.com/produkte/tilos.html (25-7-2026)
29. ecostar plan — *How to download and install TILOS* (bevestigt 11.1 MR4 als laatste versie, demo-limiet 10 activiteiten) — https://ecostarplan.com/2024/04/04/how-to-download-and-install-tilos/ (25-7-2026)
30. ⚠️ ContechFinder — *Asta Powerproject vs TILOS* / *TILOS alternatives* — https://contechfinder.com/compare/asta-powerproject-vs-tilos , https://contechfinder.com/alternatives/tilos — **onbruikbaar: verwart TILOS met een duikuitrustingsmerk**

### Niet toegankelijk tijdens dit onderzoek

- **G2** (https://www.g2.com/products/tilos/reviews) — HTTP 403
- **TrustRadius** (product- en pricingpagina) — HTTP 403
- **Gartner Peer Insights** — HTTP 403
- **Reddit** (r/projectmanagement, r/construction, r/civilengineering) — domein geblokkeerd voor de gebruikte fetch-tool; ook via zoekmachine-proxy's geen inhoudelijke TILOS-threads gevonden
- **Planning Planet forum** — HTTP 403 op de zoekpagina
- Trimble Community (TILOS-forum) — vereist registratie

**Gevolg voor dit profiel:** de sectie NADELEN leunt daardoor zwaarder op (a) de officiële release
notes en known issues, (b) de officieel gedocumenteerde exchange-beperkingen en (c) de wél
toegankelijke reviews op Capterra/Software Advice/Software Finder, dan op forumdiscussies. Waar een
punt uitsluitend op één reviewbron rust, is dat in de tekst vermeld. Anekdotisch forummateriaal
(Reddit, Planning Planet) ontbreekt in dit profiel — dat is een erkende leemte, geen bewijs van
afwezigheid van klachten.

### Methodologische noot

Het webonderzoek is uitgevoerd met directe fetches en zoekmachine-proxy's (DuckDuckGo HTML/lite,
Bing); de generieke WebSearch-tool was in deze sessie niet beschikbaar (budget uitgeput). Alle
geciteerde feiten zijn herleid tot een concrete URL. De belangrijkste vondst — de End of
Maintenance-datum — is bevestigd via twee onafhankelijke routes: het Zendesk-artikel van BuildingPoint
Australia en de versiehistorie op Trimble's eigen helpsite (die de stilstand sinds jan 2023 laat zien).
Alle als **SCHATTING** gemarkeerde bedragen en aantallen zijn afleidingen van de auteur, geen
leveranciersinformatie.
