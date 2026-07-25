# Trimble Vico Office — diepgaand softwareprofiel

**Onderzoeksdatum:** 25 juli 2026
**Categorie:** 5D BIM / locatiegebaseerde bouwplanning (LBMS, flowline)
**Status in één zin:** **End-of-life.** Trimble stopte in 2023 met de verkoop; officiële support eindigde op 30 juni 2024. Het product is niet meer verkrijgbaar.

> **Leeswijzer bij de bronnen.** Alles wat als feit staat, is terug te voeren op een bron in de bronnenlijst onderaan. Waar ik iets niet hard kon bevestigen, staat expliciet `[SCHATTING]`, `[ONBEVESTIGD]` of `[LEVERANCIERSCLAIM]`. Prijsinformatie is voor dit product structureel niet-openbaar; dat is zelf een bevinding, geen tekortkoming van het onderzoek.

---

## 1. Wat het is

### 1.1 Leverancier en eigendom

| | |
|---|---|
| **Huidige eigenaar** | Trimble Inc. (NASDAQ: TRMB), segment Engineering & Construction |
| **Oorspronkelijke maker** | Vico Software, Inc. — Boulder, Colorado (VS) |
| **Ontstaan** | 2007, als afsplitsing (spin-out) van Graphisoft |
| **Oprichters/leiding** | Mark Sawyer (President & CEO) |
| **Investeerders vóór overname** | Borealis Ventures, Village Ventures, Highway 12 Ventures e.a. |
| **Overname door Trimble** | Transactie afgerond **31 oktober 2012**, aangekondigd **2 november 2012**; het betrof een *asset*-overname (software + consultancy) |
| **Overnamebedrag** | Niet openbaar gemaakt |

### 1.2 Historische stamboom — dit is belangrijker dan het lijkt

Vico Office is niet in één keer bedacht. Het is de samensmelting van drie afzonderlijke erfenissen:

1. **Graphisoft Constructor / Graphisoft 5D** — de 3D-modelkant en de takeoff/kostenkant, ontwikkeld in Boedapest binnen Graphisoft. Toen Nemetschek Graphisoft overnam, werd de constructie-tak in 2007 verzelfstandigd als Vico Software.
2. **DYNAProject (Finland)** — de line-of-balance planning- en beheersingssoftware waaruit **Vico Control** voortkwam. Dit is de motor achter de locatiegebaseerde planning. Onderzoeksliteratuur beschrijft DYNAProject expliciet als de voorloper die "evolueerde naar Vico Software Control".
3. **De LBMS-theorie zelf** — geformaliseerd door **Olli Seppänen** (destijds VP Services bij Vico Software, tegenwoordig hoogleraar aan Aalto University, ~5.000 citaties) en **Russell Kenley** (Australië), samen auteurs van het standaardwerk *Location-Based Management for Construction* (Routledge, 2006). Kenley wordt expliciet gecrediteerd voor bijdragen aan Vico Control en de LBMS-bedrijfsprocessen.

Dat verklaart de eigenaardige vorm van het product: het is een Amerikaans verkocht, Hongaars gebouwd, Fins-Australisch bedacht platform. En het verklaart waarom de planningskant methodologisch veel dieper zit dan bij vrijwel elk ander commercieel 4D-pakket — het is niet als visualisatietool bedacht maar als productiebeheersingsysteem.

### 1.3 Doelgroep en sectoren

Volgens de officiële Trimble-trainingshandleiding richtte Vico Office zich op **bouwondernemers (general contractors), bouwmanagers, opdrachtgevers en onderaannemers** op "grote, complexe gebouwprojecten". Nadrukkelijk **vertical construction** — utiliteits- en woningbouw — en niet infra; voor lineaire infra had (en heeft) Trimble het aparte Tilos.

De methodiek zelf (flowline/LBMS) is het sterkst bij **repetitief werk**: hoogbouw, woontorens, hotels, ziekenhuizen, scholen, parkeergarages, datacenters.

### 1.4 Regio's waar het echt gebruikt werd

Op basis van gevonden partners, casestudy's en literatuur:

- **Nordics (sterkst inhoudelijk)** — Finland en Denemarken. In Finland is `paikka-aikakaavio` / `vinoviiva-aikataulu` (locatie-tijd-diagram / schuine-lijn-planning) staande praktijk; Finse hbo-scripties beschrijven Vico Office-workflows (model importeren → Schedule Planner → tijdlijn). In Denemarken was **Exigo A/S** de partner, met een eigen productsite `vicooffice.dk`.
- **Verenigde Staten** — thuisbasis van het bedrijf, distributie via het BuildingPoint-dealernetwerk (BuildingPoint Pacific, BuildingPoint Midwest & Gulf Coast).
- **Verenigd Koninkrijk** — o.a. **Baxall Construction** (Kent), dat met Vico Office de *Best Use of BIM for Innovation* won bij de BIM4SME Awards 2016.
- **Duitsland/Nederland** — o.a. **Drees & Sommer** als referentieklant via Exigo.
- **Spanje** — het Spaanstalige BIM-platform EspacioBIM documenteerde het product en het einde ervan.
- **Australië** — via de LBMS-kring rond Kenley.

Reëel beeld: het was altijd een **niche-product met een toegewijde maar kleine gebruikersbasis**, geconcentreerd bij VDC-afdelingen van middelgrote tot grote aannemers. Geen massaproduct.

### 1.5 Levenscyclus binnen Trimble — de kernbevinding

Dit is het belangrijkste onderdeel van dit profiel, dus expliciet uitgeschreven:

| Jaar | Gebeurtenis |
|---|---|
| 2007 | Vico Software afgesplitst van Graphisoft |
| 31-10-2012 | Trimble neemt de assets van Vico Software over |
| 2013–2018 | Doorontwikkeling onder Trimble; releases R4 → R6.x; Layout Manager gekoppeld aan Trimble-totalstations |
| eind 2018 | Cost Planner uit de "GC Scheduler Suite"-licentiebundel gehaald — eerste teken van portfolio-ontvlechting |
| 2021 | **R6.8 MR2** — laatste substantiële release. Trimble Connect-integratie, IFC/Tekla-verbeteringen |
| zomer 2022 | Exigo A/S lanceert **Tactplan Schedule**, gebouwd op de kernfunctionaliteit van Vico Office |
| 2023 | **Trimble stopt met de verkoop van Vico Office** |
| 30-06-2024 | **Officiële support eindigt.** Bestaande installaties blijven draaien, maar zonder updates of ondersteuning |
| heden (2026) | `vicooffice.dk` redirect (HTTP 301) naar de Tactplan-pagina "Vico Office & Exicute replaced by Tactplan". Exigo: het programma "is niet langer beschikbaar" |

**Wat Trimble ervoor in de plaats heeft gezet: niets equivalents.** Trimble's huidige bouwportfolio draait om **Trimble Construction One**, **ProjectSight** en **Trimble Connect** — projectbeheer- en samenwerkingsplatformen zónder locatiegebaseerde planningsengine. **Tilos** (lineaire/tijd-weg-planning) is nog wel actief, maar richt zich op infra (weg, spoor, pijpleiding, tunnel) en is functioneel iets anders dan LBMS voor gebouwen.

De opvolging is dus buiten Trimble geland: **Tactplan** (Exigo, Denemarken) is de directe functionele erfgenaam van Vico Office Schedule Planner, en **Tactplan Control** van Exicute.

---

## 2. Functionaliteit en techniek

### 2.1 Modulaire opbouw

Uit de officiële Trimble-trainingshandleiding *Vico Office Introduction* (oktober 2016, 108 pagina's):

| Module | Domein | Wat het doet |
|---|---|---|
| **Vico Office Client** | Kern | Modelversiebeheer, gedeelde projectdatabase, inline rapportage-engine (constructability-, kosten- en resource-geladen planningsrapporten, cashflow) |
| **Constructability Manager** | 3D | Clashdetectie + coördinatieresolutie; ook handmatig ingevoerde ontwerpissues |
| **Layout Manager** | 3D | Uitzetpunten uit het model naar het werk (koppeling met Trimble-meetapparatuur) |
| **Takeoff Manager** | 3D→hoeveelheden | "Construction-caliber" hoeveelheden **per locatie** uit BIM-modellen |
| **LBS Manager** | 4D | Location Breakdown Structure: opdeling van het project in werklocaties |
| **Schedule Planner** | 4D | Flowline-/locatiegebaseerde planning met Gantt- en netwerkweergave |
| **Production Controller** | 4D | Uitvoeringsfase: voortgang, afwijkingen, bijsturing |
| **4D Manager / 4D Explorer** | 4D | 4D-simulatie met groepen, kleuren en playback |
| **Cost Planner** | 5D | Raming volgens *Target Cost Planning*, met versiebeheer |
| **Cost Explorer** | 5D | Visuele analyse van welke onderdelen kostenafwijkingen veroorzaken |

### 2.2 Type planning — en de strenge vraag: zit er een échte netwerkengine onder?

**Ja.** Dit is geen visualisatielaag over een importeerde P6-planning, zoals bij Navisworks of veel 4D-tools. Onderbouwing:

1. **Netwerklogica is expliciet aanwezig.** De handleiding beschrijft een aparte **Network View** waarin je afhankelijkheden tussen taken legt met drag-and-drop, en dat vervolgens doorwerkt in de Flowline View. Er is een aparte oefening "Defining Task Dependencies" met een Network View in een eigen venster.
2. **LBMS is per definitie CPM-plus.** De onderzoeksliteratuur omschrijft LBMS als een systeem dat "het CPM-algoritme combineert met locatiegebaseerde technieken via *layered logic*", bovenop een flexibele location breakdown structure, met continuïteitsbewaking, buffers en forecasting. *Layered logic* is beschreven als "het automatiseren van het aanmaken van een netwerk door gebruik te maken van locaties, waarbij starttijden en activiteitenvolgorde worden beperkt om productiecontinuïteit te beschermen".
3. **Er wordt daadwerkelijk gerekend, niet getekend.** Duur komt uit een formule, niet uit een invoerveld (zie 2.3).

Nuance die eerlijk moet worden benoemd: de **continuïteitsoptimalisatie is grotendeels interactief**, niet volautomatisch. In de trainingsflow versnel je een taak door in de Flowline View het ploegaantal aan te grijpen en de lijn te slepen. Er is geen automatische resource-leveller die het hele plan optimaliseert; de planner stuurt, het systeem rekent door. Onderzoek naar LBMS-optimalisatie noemt handmatige optimalisatiereeksen van 9 tot 23 bewerkingen per case. Dat is een bewuste ontwerpkeuze (de planner houdt de regie), maar het betekent wel dat "optimalisatie" mensenwerk blijft.

**Ondersteunde planvormen:** flowline / line-of-balance (primair), Gantt (secundair, met inspring-hiërarchie), netwerkdiagram (voor logica), 4D-simulatie. Klassieke CPM als *presentatievorm* is dus aanwezig, maar de tool is niet ontworpen om als CPM-tool te concurreren met P6 — daar zit hem ook een deel van het probleem (zie §5 en §6).

### 2.3 Het onderscheidende mechanisme: duur wordt afgeleid, niet ingevoerd

Dit is het intellectueel interessantste deel van Vico Office en het meest relevante voor iedereen die een moderne planner bouwt.

De keten is:

```
BIM-element
  → Takeoff Item (TOI)          groepering van takeoff-informatie
  → Takeoff Quantity (TOQ)      hoeveelheid, per elementtype
  → Cost Planner Component      kostenregel met eenheidsprijs + verbruik
  → Cost Planner Assembly       verzameling components
  → Task                        werk dat gedaan moet worden
  → Activity                    "een Task die plaatsvindt in een Location"
```

En de duurformule, letterlijk uit de handleiding:

> **Quantity × Consumption = Totaal benodigde werkuren**

Dat wordt **per locatie** doorgerekend. De handleiding: "Door deze formule te berekenen in elk van de Locaties waar Takeoff Quantities bestaan, kan de duur voor Tasks per Locatie worden bepaald." Elke taak heeft een **Task Driver** nodig — een component met een productiesnelheid in `Hrs/UOM` — anders verschijnt er een uitroepteken en is de taak onberekenbaar.

Gevolg: de planning is **numeriek gekoppeld aan het model en aan de begroting**. Verandert de geometrie, dan veranderen de hoeveelheden, dan verandert de duur, dan verschuift de flowline. Dat is wezenlijk anders dan een 4D-tool waar je handmatig een duur van "10 dagen" typt.

### 2.4 Locaties (LBS Manager)

Concreet en verrassend geometrisch:

- Het project krijgt een **bounding box**, af te leiden uit de 3D-view.
- **Floor split**: geef het aantal verdiepingen op, met hoogte, prefix en gelijkmatige of handmatige verdeling. Per locatie zijn `Elevation`, `Cut` en `View depth` instelbaar.
- **Zones**: teken polylijnen op de plattegrond van een verdieping; de doorsnede levert zone-nodes op, die je hernoemt.
- **Copy/Paste Child Nodes** kopieert een zone-indeling naar andere verdiepingen — met strikte regels (bron mag geen zone-node zijn, bron en doel moeten onder dezelfde parent hangen, doel mag nog geen zones hebben, kopiëren tussen locatiesystemen kan niet).
- **Location Precision** per taak (bijv. niveau 3) bepaalt op welk LBS-niveau de taak in de Flowline wordt getoond. Dat is een goede vondst: één taak kan grof op verdiepingsniveau of fijn op zoneniveau worden gepland.
- **Kritieke beperking:** na élke wijziging aan locaties moeten de modellen opnieuw geactiveerd worden ("Models must always be reactivated after adding or modifying locations or nodes"). Dat is een dure, foutgevoelige stap in de dagelijkse praktijk.

### 2.5 Resources

- **Crew Composition** per taak: `Quantity` = aantal personen in een ploeg, `Number` = aantal ploegen op de taak.
- Ploegen zijn benoemde, herbruikbare objecten (code + naam).
- Bemensing is direct koppeld aan duur: het ploegaantal in de Flowline View aanpassen verkort of verlengt de taak zichtbaar.
- Wat ontbreekt in de gevonden documentatie: materieel-/materiaalresources als eersteklas objecten, resourcekalenders, resource-histogrammen met automatische egalisatie. `[ONBEVESTIGD — niet gevonden in beschikbare documentatie; niet uit te sluiten dat R6.x dit had]`

### 2.6 Kalenders en baselines

- Schedule Planner heeft **operating modes**: *Planning / Control / History*, plus weergaveopties voor **forecasts**, **actuals** en weekends. Dat impliceert een baseline-/prognose-/werkelijkheidsvergelijking op planningsniveau — het kernmechaniek van LBMS-productiebeheersing, waarbij afwijkende productiesnelheden per locatie worden gemeten en de rest van de flowline wordt geprognosticeerd.
- Aan de kostenkant zijn baselines expliciet: **Cost Plan Versions** plus een **Target Cost Plan** waartegen elke versie wordt afgezet, en Cost Explorer visualiseert het verschil.
- Detail over kalenderdefinities (feestdagen, ploegendiensten, weersvensters, kalenders per resource) is in de publiek beschikbare documentatie niet terug te vinden. `[ONBEVESTIGD]`

### 2.7 4D

De sterkste ontwerpbeslissing van het hele pakket: **4D ontstaat impliciet**. Omdat modelelementen via Takeoff Items en Cost-componenten al aan taken hangen, is de 4D-simulatie er zodra de mapping klaar is. Letterlijk uit de handleiding: het "vereist geen enkele extra inspanning om aan te maken en te onderhouden". Je maakt hooguit **4D Group Sets** (bijv. Bekisting geel / Wapening rood / Beton blauw) voor de visuele presentatie, en speelt af in 4D Explorer met instelbaar increment (dag/week/maand) en legenda.

Vergelijk dat met de klassieke Navisworks/Synchro-workflow waarin je handmatig of via regels sets aan taken koppelt en die koppeling bij elke modelupdate opnieuw moet bewaken. Dit is aantoonbaar beter opgelost.

### 2.8 Platform en schaalbaarheid

| Aspect | Realiteit |
|---|---|
| **Architectuur** | Client-server: **Vico Office Client (VOC)** ↔ **Vico Project Server (VPS)** ↔ projectdatabase, plus een aparte **Vico License Manager** |
| **Besturingssysteem** | Windows-desktop. Geen macOS, geen Linux |
| **Database** | Relationele projectdatabase per project, met een centrale `VicoOfficeMasterDB`; beheercommando's zoals `removedb` |
| **Netwerkeis** | "Een hoge bandbreedte en lage latency verbinding is vereist tussen VOC en VPS" — in de praktijk betekent dat LAN of Citrix, geen thuiswerken over VPN |
| **Virtualisatie** | Citrix ondersteund; VOC en VPS mogen op dezelfde virtuele infrastructuur draaien |
| **Cloud/web/mobiel** | **Geen.** Er is geen webclient en geen mobiele veldapp |
| **Versiediscipline** | Server en clients moeten strikt op dezelfde versie draaien |

Schaalbaarheid is dus **verticaal binnen één bedrijf/LAN**, niet horizontaal over een keten. Voor de tijd waarin het gebouwd werd (2008-2015) is dat verdedigbaar; in 2026 is het een fossiel. Precies dit punt is wat Tactplan als "unified, cloud-based platform" nadrukkelijk in de etalage zet.

---

## 3. Prijzen

### 3.1 De harde bevinding: er is geen openbare prijs, en die is er ook nooit geweest

Ik heb hier gericht op gezocht — leverancierssite, dealersites, softwarevergelijkers (G2, Capterra, ITQlick, Serchen, toolsinfo), Wayback Machine, en anderstalige bronnen. Resultaat:

- **Trimble en Vico Software hebben nooit een lijstprijs gepubliceerd.** Alle dealerpagina's (BuildingPoint Pacific, BuildingPoint MWGC, Exigo) eindigen in "neem contact op" of een telefoonnummer.
- Softwarevergelijkers die normaal gesproken indicatieve prijzen tonen, hebben voor dit product **geen enkel bedrag**. Ook de gespecialiseerde vergelijkers tonen alleen features.
- Er is geen gearchiveerde prijspagina op `vicosoftware.com` (Wayback Machine heeft geen snapshot van een `/pricing`-pad).
- Sinds 2023 is het product **niet meer te koop**, waarmee elke actuele prijsvraag academisch is.

Dat is zelf een oordeel waard: dit was **enterprise-verkoop met verplichte dealer-tussenkomst**, waarbij de prijs onderdeel was van een breder implementatietraject. Vico verkocht zichzelf altijd als "software *and services*".

### 3.2 Wat wél vaststaat over het licentiemodel

| Element | Bron / status |
|---|---|
| **Modulair gelicentieerd** | De Office Client is de basis; modules worden erbij gelicentieerd. Bevestigd door de moduleopbouw in de officiële handleiding |
| **Bundels/suites** | Er bestonden gebundelde licenties, o.a. de **"GC Scheduler Suite"**. Cost Planner is eind 2018 uit die suite gehaald — bevestigd via Trimble Help Center |
| **Eenmalige aankoop óf abonnement** | Exigo (Deense partner) bood beide varianten aan |
| **Aparte licentieserver** | Vico License Manager — dus floating/netwerklicenties waren mogelijk |
| **Proeflicentie** | Exigo: 30 dagen proeflicentie, optioneel met een uur web-introductie |
| **Verkoopkanaal** | Uitsluitend via Trimble-dealers (BuildingPoint-netwerk in de VS, lokale partners in Europa) |

### 3.3 Indicatie van de orde van grootte `[SCHATTING — niet uit een gepubliceerde bron]`

Op basis van de verkoopvorm (dealer-enterprise, modulair, met verplichte implementatie en training) en de positionering naast vergelijkbare 5D-suites uit dezelfde generatie, is de realistische orde van grootte geweest:

- **Per named seat, volledige suite: laag- tot midden-vijfcijferig in USD/EUR per jaar** (abonnement), of een eenmalige licentie in dezelfde orde met jaarlijkse onderhoudsfee van circa 15–20%.
- **Alleen de planningsmodules** (Office Client + LBS Manager + Schedule Planner + Production Controller) lagen daar substantieel onder.
- **Implementatie- en trainingskosten waren geen bijzaak.** De officiële introductiecursus alleen al was 8 uur e-learning, en er waren aparte klassikale trajecten per module. Een reële implementatie bij een aannemer omvatte modelstandaardisatie, recepten-/assemblageopbouw in Cost Planner en LBS-conventies — een traject van maanden.

**Behandel deze cijfers als richting, niet als feit.** Ik heb geen enkele publieke bron gevonden die een concreet bedrag noemt, en ik verzin er liever geen precisie bij. Wie het exact wil weten, moet een oud contract of dealeroffer opvragen.

### 3.4 Prijs van de opvolger (Tactplan), ter vergelijking

Ook Tactplan publiceert geen prijzen (geraadpleegd 25-07-2026):

- **Free trial** — 14 dagen, volledige Tactplan Schedule, plus demo van Control en Mobile.
- **Schedule** — locatiegebaseerde planning + takt, onbeperkt aantal projecten. *Offerte op aanvraag.*
- **Control** — plus productiebeheersing, mobiele voortgangsregistratie, rolbeheer. *Offerte op aanvraag.*
- **Enterprise** — alles, plus optionele custom dashboards en **externe API-toegang**. *Offerte op aanvraag.*
- Licentiestructuur: **per planner**, met keuze tussen per-project of enterprise-breed.

Opvallend: API-toegang zit pas in het duurste pakket. Dat is precies het patroon dat een open alternatief kan doorbreken.

---

## 4. Voordelen

1. **De duur wordt berekend, niet geraden.** `Quantity × Consumption = werkuren`, per locatie doorgerekend, met een verplichte Task Driver. Dit is de belangrijkste conceptuele bijdrage van het pakket: de planning is numeriek verankerd in modelhoeveelheden en in de calculatie. Vrijwel geen enkel ander commercieel pakket dwingt dit af.

2. **Echte locatiegebaseerde planning met flowline, niet als plaatje maar als rekenmodel.** De Flowline View toont de doorstroom van ploegen door locaties; de handleiding definieert flowline-theorie expliciet (ploegen werken op optimale productiviteit als hun locatie vrij is van andere ploegen en overtollig materiaal). Zakelijke waarde die Trimble er zelf aan hangt: continue werkstroom, ploeg- en resourceplanning, benutten van lege locaties, elimineren van stops-and-starts en ploegbotsingen in dezelfde locatie.

3. **Er zit een echte netwerkengine onder.** Aparte Network View voor logica; LBMS combineert het CPM-algoritme met locatiegebaseerde technieken via layered logic, inclusief continuïteitsbeperkingen en buffers. Dit is geen 4D-schil om een externe planning.

4. **4D-simulatie ontstaat gratis.** Omdat modelelementen al via takeoff en kostencomponenten aan taken hangen, is de 4D-simulatie er zodra de mapping staat — "vereist geen extra inspanning om aan te maken en te onderhouden". Structureel superieur aan handmatig koppelen in Navisworks/Synchro.

5. **Locaties uit de geometrie, niet uit een spreadsheet.** Bounding box → floor split met instelbare hoogtes → zones via polylijnen op de plattegrond → hoeveelheden automatisch per locatie. `Location Precision` per taak maakt grof en fijn plannen naast elkaar mogelijk.

6. **Werkelijk BIM-neutraal.** ArchiCAD, Revit, Tekla Structures, SketchUp, CAD-Duct, 3D DWG en IFC konden naast elkaar in één project worden gepubliceerd en samengevoegd — architect in ArchiCAD, constructeur in Tekla, MEP in Revit, luchtkanalen in CAD-Duct. Voor een pakket uit die generatie is dat opvallend open aan de invoerkant.

7. **Productiebeheersing als eersteklas functie, niet als rapportage.** Planning/Control/History-modi, actuals en forecasts. LBMS-forecasting — het meten van werkelijke productiesnelheden per locatie en het doorrekenen naar de rest van de flowline — was destijds state of the art en is nog steeds beter dan wat de meeste CPM-tools bieden.

8. **Eén datamodel voor tijd, geld en geometrie.** Een modelwijziging werkt door naar hoeveelheden, naar kosten én naar duur. Cost Explorer maakt zichtbaar wélke onderdelen de kostenafwijking veroorzaken tussen kostenplanversies — een visuele budgetanalyse die weinig navolging heeft gekregen.

9. **Zwaar academisch onderbouwd.** LBMS is geen marketingconstruct maar een onderzoeksstroming met een standaardwerk (Kenley & Seppänen, Routledge 2006), een actieve onderzoeksgroep (Aalto), en tientallen peer-reviewed publicaties. Dat is zeldzaam voor bouwsoftware.

10. **Documentatie is er nog, en is goed.** De 108 pagina's tellende officiële trainingshandleiding staat publiek online en is exceptioneel expliciet over datamodel en werkwijze. Voor iemand die een eigen planner ontwerpt, is dit een gratis, uitstekend ontwerpdocument.

---

## 5. Nadelen

1. **Het product is dood — dit overschaduwt al het andere.** Verkoop gestopt in 2023, officiële support gestopt op 30 juni 2024. De laatste substantiële release is **R6.8 MR2 uit 2021**. De Deense productsite `vicooffice.dk` redirect nu naar de opvolger van een derde partij. Wie het vandaag nog draait, draait ongesupporteerde software waarvan de BIM-importers vastzitten op authoring-versies uit ruwweg 2018–2021 (ArchiCAD 21/22, Revit 2018/2019, Tekla 2017 in R6.7). Elk nieuw Revit-jaar maakt het product verder onbruikbaar.

2. **Trimble heeft het strategisch laten verhongeren en biedt geen opvolger.** Het portfolio is doorgeschoven naar Trimble Construction One / ProjectSight / Connect — projectbeheer en samenwerking, zónder locatiegebaseerde planningsengine. Tilos dekt lineaire infra, niet gebouwen-LBMS. Klanten moesten noodgedwongen naar derden migreren (Tactplan, Sitedrive, Bexel). Dat is een reëel signaal over hoe grote leveranciers met overgenomen nicheproducten omgaan — relevant voor iedereen die overweegt zich aan een gesloten pakket te binden.

3. **Zware, verouderde client-server-desktopstack.** Windows-only VOC + VPS + aparte License Manager, met de expliciete eis van hoge bandbreedte en lage latency tussen client en server. In de praktijk: LAN of Citrix. Geen webclient, geen mobiele veldapp, geen cloud. In 2026 onhoudbaar; de opvolger positioneert zich expliciet als "unified, cloud-based platform".

4. **Databasefragiliteit en beheerlast.** Gedocumenteerde storingen in de eigen supportkennisbank: een corrupte projectdatabase kan de centrale `VicoOfficeMasterDB` meeslepen zodat het programma niet meer start (oplossen via `removedb`); "Connection to the VPSA server has been lost" tijdens gebruik; "Database server invalid or unreachable" wanneer de computernaam speciale tekens bevat — met als voorgeschreven oplossing de computer hernoemen en Vico opnieuw installeren. Dat laatste is geen randgeval maar een ontwerpfout.

5. **Steile leercurve en overladen interface.** G2-reviewers: de interface maakt navigeren en het volledig benutten van de mogelijkheden lastig, "de veelheid aan functionaliteit is overweldigend, wat resulteert in een leercurve", en "de interface vereist wat training". Met tien modules, viewsets, workflows, takeoff items, componenten, assemblies, tags, task drivers en een LBS is dat niet verrassend — maar het is wel een reële adoptiebarrière.

6. **Slechte integratie met de rest van het landschap.** G2-reviewers noemen het expliciet moeilijk te integreren met andere tools en platformen. Zie ook §6: geen API, geen open uitwisselingsformaat voor de planning zelf.

7. **Hoge modelkwaliteitseisen en brosse workflow.** Modellen moeten na élke wijziging aan locaties opnieuw geactiveerd worden. Takeoff-hygiëne bepaalt of het hele bouwwerk klopt; de handleiding heeft aparte hoofdstukken over het identificeren en corrigeren van defecten in takeoff items en quantities. Zonder een gedisciplineerde modelleerstandaard bij alle ontwerppartners valt de waardeketen om.

8. **Geen transparante prijs, dealergebonden verkoop, hoge instapdrempel.** Nooit een gepubliceerde prijs, altijd via dealers, altijd met een implementatietraject erbij. Voor het mkb praktisch onbereikbaar; ook voor grotere partijen een langdurig inkoop- en implementatietraject.

9. **De methodiek botst met de contractuele werkelijkheid.** Opdrachtgevers, bouwdirecties en juristen werken met CPM, Primavera P6 en XER/MPP-uitwisseling. Een organisatie die intern LBMS gebruikt, moet in de praktijk twee planningen bijhouden — de flowline voor de productie en een CPM-planning voor het contract — want Vico kon die brug niet fatsoenlijk slaan. Dit is de meest genoemde praktische reden waarom LBMS-tools niet doorbreken.

10. **Locatiegebaseerd plannen werkt slecht bij niet-repetitief werk.** De hele winst van flowline zit in ploegen die met constante snelheid door vergelijkbare locaties bewegen. Bij renovatie, unieke gebouwvormen, veel kleine ongelijksoortige ruimtes of sterk gefaseerd werk in bestaande bouw verdwijnt dat voordeel, terwijl de administratieve last van de LBS blijft. Vico Office had geen mechanisme om daar elegant op terug te vallen.

11. **Optimalisatie blijft handwerk.** Er is geen volautomatische continuïteits- of resource-optimalisatie; de planner sleept flowlines en past ploegaantallen aan. Onderzoek naar LBMS-optimalisatie beschrijft handmatige reeksen van ~9 tot 23 bewerkingen per case. Verdedigbaar als ontwerpkeuze, maar het schaalt slecht en het maakt de kwaliteit van het plan sterk afhankelijk van één ervaren persoon.

---

## 6. Interoperabiliteit — en hoe open of gesloten dit pakket is

### 6.1 Feitelijke ondersteuning

| Formaat / kanaal | Ondersteuning | Toelichting |
|---|---|---|
| **IFC (import)** | ✅ Ja | "3D-modellen kunnen geïmporteerd worden uit IFC- en SketchUp-bestanden". R6.5 MR1 loste eenheidsconversiefouten bij IFC-import op; R6.8 bevatte "verbeteringen in IFC en Tekla BIM" |
| **IFC 4.3** | ❌ Nee | IFC 4.3 werd pas ISO 16739-1 in 2024, ruim ná de laatste release (R6.8, 2021). Het geïmporteerde IFC is de 2x3/4-generatie |
| **IFC-export** | ❌ Geen bewijs gevonden | Geen enkele bron beschrijft IFC-uitvoer uit Vico Office |
| **IfcWorkSchedule / IfcTask** | ❌ Nee | Geen enkele indicatie dat planningsdata ooit als IFC werd weggeschreven. De planning leeft uitsluitend in de proprietary projectdatabase |
| **Native BIM-importers** | ✅ Ja | ArchiCAD 21/22, Revit 2018/2019, Tekla 2017 (per R6.7); SketchUp 8/2013/2014/2015/2016; CAD-Duct; 3D DWG |
| **Primavera P6 / XER** | ❌ Geen bewijs | Niet aangetroffen in enige documentatie, releasenotes of dealermateriaal |
| **MS Project (MPP/MSPDI/XML)** | ⚠️ `[ONBEVESTIGD]` | De voorloper Vico Control had historisch import van externe planningen, maar voor Vico Office R6.x heb ik dit niet kunnen bevestigen. Behandel als "niet aanwezig tenzij bewezen" |
| **Excel / CSV** | ⚠️ Beperkt | Takenlijsten werden via kopiëren/plakken uit een `.xlsx` ingelezen ("Insert Copied Tasks"). Rapportage-engine met exports. Geen gestructureerde ronde-trip-import |
| **BCF** | ❌ Geen bewijs | Constructability Manager had een eigen issue-registratie; geen BCF-uitwisseling aangetroffen |
| **Trimble Connect** | ✅ Vanaf R6.8 | Vico-locaties publiceren naar Trimble Connect Organizer, inclusief locatiegebonden elementgeometrie en hoeveelheden. Wel een gesloten, Trimble-eigen kanaal |
| **Publieke API / SDK** | ❌ Nee | Geen ontwikkelaarsportaal, geen gedocumenteerde API, geen gepubliceerd databaseschema |
| **Databasetoegang** | ⚠️ Alleen indirect | Er is een SQL-projectdatabase, maar het schema is niet gedocumenteerd. Rechtstreeks bevragen is ongesupporteerd reverse-engineeren |

### 6.2 Oordeel over openheid — expliciet voor de opdrachtgever

**Vico Office is een asymmetrisch pakket: open aan de invoerkant, hermetisch aan de uitvoerkant.**

- **Invoerkant: verdienstelijk open.** IFC-import naast een reeks native importers, met de expliciete belofte "BIM-neutraal". Voor 2010-2015 was dat vooruitstrevend en het is nog steeds een respectabele lijst.
- **Uitvoerkant: gesloten.** Er is geen open uitwisselingsformaat voor het product dat Vico Office nu juist uniek maakte — de locatiegebaseerde planning. Geen IFC-export, geen `IfcWorkSchedule`/`IfcTask`, geen XER, geen bewezen MSPDI, geen API. De LBS, de taken, de activities per locatie, de task drivers, de flowlines: dat alles zat opgesloten in een proprietary Windows-databank achter een licentieserver.

**Wat dat betekent nu het product EOL is:** organisaties die er jaren planningskennis in hebben opgebouwd, kunnen die kennis niet machinaal exporteren. Ze kunnen hooguit rapportages en schermafdrukken bewaren. Dat is de klassieke vendor-lock-in-rekening, en die wordt precies op het moment gepresenteerd waarop de klant het minst kan onderhandelen.

**Concrete lessen voor een open-source, IFC-gebaseerde planner:**

1. **Neem het datamodel over, niet de architectuur.** De begrippenset is uitstekend en is nergens beter uitgeschreven dan in de officiële handleiding: `Task` (het werk) vs. `Activity` (= een Task in een Location), `Location Breakdown Structure` als hiërarchie project → verdiepingen → zones, `Task Driver` met `Quantity × Consumption`, en `Location Precision` per taak. Dit is precies de laag die in `IfcTask` + `IfcSpatialZone`/`IfcSpatialElement` te modelleren valt.
2. **Doe wat Vico niet deed: schrijf de planning weg als open standaard.** `IfcWorkSchedule`, `IfcTask`, `IfcTaskTime`, `IfcRelSequence`, `IfcResource`, met locatietoewijzing via `IfcRelAssignsToProduct`/spatial structure. Dat is exact het gat dat Vico's ondergang zo pijnlijk maakt.
3. **Ondersteun óók de contractuele wereld.** XER, P6 XML en MSPDI/MPP zijn geen luxe maar de reden dat LBMS-tools stranden. Wie de flowline én de CPM-uitwisseling kan leveren, lost het probleem op waar Vico op stukliep.
4. **Bied API's standaard aan, niet als enterprise-upgrade.** Zelfs de moderne opvolger Tactplan zet externe API-toegang pas in het duurste pakket. Een open project dat dit gratis en gedocumenteerd geeft, heeft daar direct een positioneel voordeel.
5. **Vermijd de zware client-server-eis.** De harde bandbreedte/latency-eis tussen VOC en VPS was een fundamentele beperking. Een bestandsgebaseerd of lokaal-eerst model met IFC als native formaat omzeilt dat volledig.

---

## 7. Marktpositie

### 7.1 Waar het sterk was, en waarom

Vico Office was **de facto categoriedefinieerder voor 5D BIM in de bouw**. Het eigen materiaal claimde niet zonder grond "de meest geïntegreerde benadering van coördinatie, hoeveelheidsbepaling, kostenraming, projectplanning en productiebeheersing" in de branche. Dat kwam door één ding: het was het enige commerciële pakket waarin geometrie, hoeveelheden, geld en tijd op één datamodel zaten in plaats van via koppelingen aan elkaar geplakt.

Geografisch was het sterk waar de **LBMS-cultuur al bestond**: Finland en Denemarken (waar locatie-tijd-planning gewoon vak is), het VK, en VDC-afdelingen van Amerikaanse aannemers. Het was nergens marktleider in aantallen — het was een prestigeproduct van gespecialiseerde teams.

### 7.2 Concurrenten

**Destijds (2012–2022):**
- *4D-visualisatie:* Autodesk Navisworks, Synchro (sinds 2018 Bentley)
- *5D-suites:* RIB iTWO, Tocoman (FI), Innovaya
- *LBMS/flowline:* Vico Control (eigen voorloper), Tilos (lineair, infra), Schedule/DYNAProject-erfgenamen
- *Klassieke planning:* Oracle Primavera P6, Microsoft Project, Asta Powerproject (Elecosoft)

**Nu (2026) — waar de LBS-vraag naartoe is gegaan:**
- **Tactplan** (Exigo, DK) — directe erfgenaam, cloud, LBS + takt + Gantt in één, met Schedule/Control/Mobile
- **Sitedrive** (Fira, FI) — jana-, vinoviiva- en locatiegebaseerde planning in één platform
- **Admicom Project / ASApro** (FI) — paikka-aikakaaviot en takt-planningen
- **Bexel Manager** (RS/US) — 4D/5D met eigen scheduler, direct vergeleken met Vico Office
- **ALICE Technology** — generatieve planning
- **Touchplan, VisiLean** — lean/pull-planning
- **Elecosoft Powerproject** — CPM met ingebouwde takt-/locatie-mogelijkheden

Het patroon is onmiskenbaar: **de methodiek wint, de zware desktopsuite verliest.** Locatiegebaseerd en takt-plannen zijn in Duitsland en de Nordics juist mainstream aan het worden, maar de tooling is verschoven naar lichte, cloud-native, per-planner geprijsde SaaS met mobiele voortgangsregistratie. Vico Office had de methode maar de verkeerde verpakking.

### 7.3 Omzet en gebruikersaantallen

- **Trimble rapporteert geen productcijfers.** Vico viel binnen het Engineering & Construction-segment en is nooit apart uitgesplitst.
- **Het overnamebedrag van 2012 is niet openbaar gemaakt.**
- Datamining-diensten noemen wel getallen — één daarvan zet "$24 miljoen omzet en 9 medewerkers" naast elkaar voor Vico Software. Dat is intern tegenstrijdig en afkomstig van geautomatiseerd scrapen. **`[ONBETROUWBAAR — niet gebruiken]`**
- Realistische inschatting: **`[SCHATTING]`** enkele honderden tot laag-duizend actieve seats wereldwijd op het hoogtepunt, geconcentreerd bij een beperkt aantal aannemers. De niche-omvang is precies de reden dat Trimble het uiteindelijk liet vallen.

### 7.4 Trend

Neergaand tot nul voor het product; opgaand voor de methode. Vico Office is een leerzaam voorbeeld van een technisch superieur product dat sneuvelt op distributiemodel, platformkeuze en portfoliopolitiek van de overnemende partij — niet op functionaliteit.

---

## 8. Eindoordeel

**Als aankoopoptie: niet van toepassing. Het product is niet meer te koop en niet meer ondersteund.** Elke organisatie die vandaag nog op Vico Office draait, zit op geleende tijd met software die stopt bij Revit 2019, en moet migreren — realistisch naar Tactplan (de directe erfgenaam), Sitedrive of Bexel Manager.

**Als ontwerpreferentie: uitzonderlijk waardevol, en gratis toegankelijk.** Vico Office is het best gedocumenteerde voorbeeld van hoe locatiegebaseerd plannen technisch in elkaar hoort te zitten. De drie ideeën die het overleefd hebben:

1. **`Activity` = `Task` × `Location`.** Eén taak, uitgesplitst over locaties, met per locatie een eigen duur. Dat is de kerndatastructuur en die is elegant.
2. **Duur is een afgeleide, geen invoerveld.** `Quantity × Consumption` per locatie, met een verplichte Task Driver die je dwingt de koppeling met hoeveelheden te leggen. Wie dit in een IFC-planner inbouwt, heeft iets dat P6 en MS Project structureel niet kunnen.
3. **4D moet impliciet zijn.** Als de keten element → takeoff → component → taak eenmaal ligt, is 4D er gratis. Elke tool die 4D als aparte koppelstap behandelt, doet het verkeerd.

**En de waarschuwing die eruit spreekt is minstens zo waardevol.** Vico Office was aan de invoerkant netjes open (IFC en een brede reeks importers) en aan de uitvoerkant volledig gesloten: geen IFC-export van planningsdata, geen `IfcWorkSchedule`/`IfcTask`, geen XER, geen API, een ongedocumenteerd databaseschema. Toen Trimble de stekker eruit trok, konden klanten hun jarenlang opgebouwde locatiegebaseerde planningen niet meenemen. Dat is precies het scenario waar een open-source, IFC-native planner het antwoord op is.

**Kort samengevat:** methodologisch een van de beste planningsproducten die de bouw heeft gehad, commercieel doodgelopen op een zware Windows-client-serverarchitectuur, dealergebonden ondoorzichtige prijsstelling en een gesloten datamodel — en inmiddels door de eigen leverancier begraven. Bestudeer het datamodel grondig, kopieer de architectuur onder geen beding, en doe aan de uitvoerkant precies het tegenovergestelde.

---

## Bronnenlijst

Alle bronnen geraadpleegd op **25 juli 2026**, tenzij anders vermeld. Publicatiedata van de bron staan erbij waar bekend.

### Primaire / officiële documentatie
1. **Trimble — *Vico Office Introduction Training Manual*, oktober 2016, 108 pagina's** (© 2016 Trimble). Gehost bij BuildingPoint Midwest & Gulf Coast — https://www.buildingpointmwgc.com/wp-content/uploads/2018/04/Intro_Vico_Office_Imperial.pdf — *Belangrijkste bron van dit profiel: modulelijst, LBS-werkwijze, Task Driver-formule, resource-/ploegmodel, Network View, 4D Groups, definitielijst.*
2. Trimble Help Center — *Vico Office R6.7 BIM/CAD application support* — https://trimbledx.my.site.com/trimblehelpcenter/s/article/Vico-Office-R6-7-BIM-CAD-application-support (ondersteunde authoring-versies en IFC/SketchUp-import)
3. Trimble Help Center — *GC Scheduler Suite license* — https://trimbledx.my.site.com/trimblehelpcenter/s/article/GC-Scheduler-Suite-license (licentiebundels; Cost Planner eind 2018 uit de suite)
4. Trimble Help Center — supportartikelen over `VicoOfficeMasterDB`-corruptie, `removedb`, "Database server invalid or unreachable" en "Connection to the VPSA server has been lost"
5. Trimble — *Vico Office R6.5 MR1 Readme / release notes* (IFC-eenheidsconversiefixes)
6. Trimble — *Vico Office 6.8 release notes* (Trimble Connect-integratie, IFC- en Tekla-verbeteringen), 2021
7. Trimble Learn — *Vico Office Introduction – Self Study* (8 uur e-learning) — https://learn.trimble.com/learn/course/external/view/elearning/856/vico-office-introduction-self-study
8. Trimble Construction — *Tilos* productpagina — https://construction.trimble.com/en/products/tilos (actief; lineaire/tijd-weg-planning; koppelingen met P6, MS Project, Excel, Asta Powerproject)

### Status en levenscyclus
9. **EspacioBIM (ES) — *Vico Office, de Trimble*** — https://www.espaciobim.com/vico-office — *Bron voor: verkoop gestopt in 2023, officiële support geëindigd op 30 juni 2024, bestaande installaties blijven werken.*
10. **Exigo A/S (DK) — *Vico Office*** — https://exigo.dk/en/produkter/software-og-platforme/vico-office/ — "het programma is niet langer beschikbaar", verwijzing naar Tactplan
11. Exigo A/S — *Vico Office* (dienstenpagina) — https://exigo.dk/en/services/software-and-platforms/vico-office/ — eenmalige aankoop óf abonnement, 30 dagen proeflicentie, klantquote Drees & Sommer
12. **Tactplan — *Vico Office & Exicute replaced by Tactplan*** — https://www.tactplan.com/about-us/vico-office-exicute — kernfunctionaliteit van Vico Office doorontwikkeld tot Tactplan Schedule door Exigo A/S, uitgebracht zomer 2022
13. `vicooffice.dk` — geeft HTTP 301 redirect naar bron 12 (geverifieerd 25-07-2026)
14. Tactplan — hoofdpagina en pricing — https://www.tactplan.com/ en https://www.tactplan.com/pricing (14 dagen trial; Schedule/Control/Enterprise op offerte; per-planner, per project of enterprise; API pas in Enterprise)

### Overname en bedrijfshistorie
15. CNBC — *Trimble Acquires Vico Assets*, 2 november 2012
16. MarketScreener — Trimble/Vico transactiedetails: afgerond 31 oktober 2012, verkopers Borealis Ventures, Village Ventures, Highway 12 Ventures e.a.
17. SketchUcation — *Trimble Acquires Vico Assets* — https://sketchucation.com/all-news/255-trimble-acquires-vico-assets
18. Construction National (UK) — *Trimble Acquires Vico Software* — https://constructionnational.co.uk/technology/1849-trimble-acquires-vico-software
19. Graphisoft Community — *Trimble Acquires Vicosoftware* — https://community.graphisoft.com/t5/Collaboration-with-other/Trimble-Acquires-Vicosoftware/td-p/209724 (Vico "spun away from Graphisoft", Mark Sawyer)
20. StartupIntros — Vico Software: opgericht 2007, Boulder Colorado, Mark Sawyer President & CEO

### LBMS-methodiek en academische onderbouwing
21. Kenley, R. & Seppänen, O. — *Location-Based Management for Construction*, Routledge, september 2006 (hoofdstukken o.a. "Location-based planning methods", "Location-based control methods", "A new theory for location-based planning"). Geverifieerd via CrossRef-metadata
22. Aalto University — profiel Olli Seppänen — https://www.aalto.fi/en/people/olli-seppanen (lean construction, real-time production control, location-based management systems)
23. Google Scholar — Olli Seppänen, ~5.008 citaties
24. IEEE Xplore — auteursprofiel: Seppänen als VP of Services bij Vico Software en ontwikkelaar van locatiegebaseerde tooling
25. ResearchGate — *A line-of-balance based schedule planning and control system* (DYNAProject) — https://www.researchgate.net/publication/305873584
26. Aaltodoc (Aalto University proefschriftrepository) — DYNAProject → "Vico Software Control"
27. LBMS Australia — https://lbms.com.au/research.php — Russell Kenley's bijdragen aan Vico Control en LBMS-bedrijfsprocessen
28. Literatuur over *layered logic*: LBMS als "combining CPM algorithm to location-based techniques through layered logic"; layered logic als "automating the creation of a network by using locations, while constraining start times and activity sequences to protect production continuity"; LBMS vereist minder logische koppelingen dan CPM; optimalisatiereeksen van 9–23 bewerkingen per case
29. Semantic Scholar — LBMS-filosofie: "Locations are logical containers for project information because, in construction, crews move through locations"
30. Wikipedia — *Linear scheduling method* / location-based scheduling — https://en.wikipedia.org/wiki/Linear_scheduling_method (synoniemen: flowline, line-of-balance, harmonogram, time-location matrix)

### Reviews, gebruikerservaringen en marktbeeld
31. **G2 — Trimble Vico Office reviews** — https://www.g2.com/products/trimble-vico-office/reviews en https://www.g2.com/products/trimble-vico-office/reviews?qs=pros-and-cons — *"falls short in its user interface, which makes navigation and fully exploiting its potential somewhat difficult"; "the multitude of functionalities is overwhelming resulting in a learning curve"; "the interface requires a bit of training"; "it is difficult to integrate with tools and platforms".* (Directe fetch gaf HTTP 403; citaten via zoekmachine-snippets. `[BEPERKT GEVERIFIEERD]`)
32. Reddit r/Construction — *Anybody in the US heard of / used Vico scheduling software?* — https://www.reddit.com/r/Construction/comments/8ec7u0/ (fetch geblokkeerd; alleen via snippets)
33. Reddit r/Construction — *Anyone using VICO for cost planning/estimating/scheduling* — https://www.reddit.com/r/Construction/comments/33c75a/ — line-of-balance-planning met manpower-data voor ploegcontinuïteit (fetch geblokkeerd; alleen via snippets)
34. BuildingPoint Pacific — Vico Office productpagina — https://www.buildingpointpacific.com/products/office-solutions/vico-office (dealer, geen prijs, alleen contactgegevens)
35. Baxall Construction (UK) — Vico Office-implementatie, winnaar *Best Use of BIM for Innovation*, BIM4SME Awards 2016
36. CAXsoft — Trimble Vico Office v6.8 featureoverzicht, met de leveranciersclaim dat klanten "de uitvoeringstijd met 10–20% hebben verkort" **`[LEVERANCIERSCLAIM — niet onafhankelijk geverifieerd]`**
37. RocketReach — Vico Software bedrijfsprofiel: "$24 million in revenue and 9 employees" **`[ONBETROUWBAAR — intern tegenstrijdig, geautomatiseerd gescrapet]`**
38. Datanyze — *Trimble Vico Office Suite Market Share and Competitor Report* (geen bruikbare absolute cijfers)

### Regionale / anderstalige bronnen
39. Tekla (FI) — Vico Office voor "tietomallipohjainen aikataulu- ja kustannuslaskenta" (BIM-gebaseerde planning en kostenberekening)
40. Theseus / Trepo (FI) — hbo- en universiteitsscripties met Vico Office-workflows (model importeren → Schedule Planner → tijdlijn); bevestigen tegelijk dat `jana-aikataulu` (balkplanning) de norm blijft in de Finse praktijk
41. ASApro (FI) — `paikka-aikakaavio (vinoviiva-aikataulu)` als kerncompetentie
42. Sitedrive (FI) — "Jana-, vinoviiva ja sijaintipohjainen aikataulutus" in één platform
43. Admicom Project (FI) — "paikka-aikakaaviot ja tahtiaikataulut"

### Trimble-portfolio 2025/2026
44. Trimble — Trimble Construction One, ProjectSight, Trimble Connect (huidige bouwportfolio; ProjectSight 360 Capture aangekondigd voor 2026, AI-workflowautomatisering in Connect)
45. Trimble Connect Workflow Extensions — *Vico Locations Organizer Groups*: publiceren van Vico Office-locaties, locatiegebonden elementgeometrie en hoeveelheden naar Trimble Connect Organizer (achter login; alleen via snippet gedocumenteerd)

---

### Methodologische verantwoording

Voor dit profiel is de WebSearch-quota van de sessie uitgeput geraakt; het onderzoek is voortgezet via directe WebFetch-opdrachten op zoekmachines (DuckDuckGo HTML/Lite) en op individuele bronnen. Een aantal doelen was niet bereikbaar: G2, Capterra, ITQlick, Serchen, toolsinfo en Reddit gaven HTTP 403 of zijn geblokkeerd, en `web.archive.org` was niet benaderbaar. Uitspraken die uitsluitend op zoekmachine-snippets van die bronnen berusten, zijn als zodanig gemarkeerd. De zwaarste onderbouwing komt uit de officiële Trimble-trainingshandleiding (bron 1), die volledig is opgehaald en geëxtraheerd.
