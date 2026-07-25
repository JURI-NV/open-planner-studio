# Autodesk Navisworks TimeLiner — diepgaand softwareprofiel

**Onderzoeksdatum:** 25 juli 2026
**Analist:** software-analist, wereldwijd marktonderzoek planningssoftware
**Scope:** de TimeLiner-module binnen Autodesk Navisworks Simulate / Navisworks Manage

> **Methodologische noot vooraf.** Autodesk rendert prijzen uitsluitend client-side; op elke opgehaalde productpagina staat letterlijk de placeholder `Starting at {{PRICE}} / month` (en in het Nederlands: *"De prijs van een Navisworks Manage-jaarabonnement is ."*). Er is dus geen officieel, server-gerenderd lijstprijsbedrag te citeren. Alle subscription-bedragen in §3 komen daarom uit resellers en prijsvergelijkers en zijn als zodanig gemarkeerd. De enige **officiële** Autodesk-prijsbron die wél harde getallen geeft, is de Flex-rate sheet. Reddit en G2/TrustRadius waren in deze onderzoeksomgeving niet bereikbaar (netwerk-/botblokkade); praktijkkritiek is daarom betrokken uit Capterra/Software Advice, Autodesk' eigen supportartikelen, vakpublicaties en een peer-reviewed vergelijkende studie.

---

## 1. Wat het is

### Product en positionering

**Navisworks TimeLiner is geen zelfstandig product.** Het is een module binnen twee betaalde Navisworks-edities. De productlijn bestaat uit drie edities:

| Editie | Wat het doet | Licentie |
|---|---|---|
| **Navisworks Freedom** | Gratis viewer voor NWD en DWF. Geen datasource-koppelingen, wel afspelen van een reeds opgebouwde 4D-simulatie in een NWD. | Gratis |
| **Navisworks Simulate** | Modelreview, aggregatie, **TimeLiner (4D)**, Quantification, Animator, Presenter. **Geen** clash detection. | Betaald abonnement |
| **Navisworks Manage** | Alles uit Simulate **plus** Clash Detective en issue-management gekoppeld aan Autodesk Construction Cloud en Revit. | Betaald abonnement |

TimeLiner zelf is identiek in Simulate en Manage. Wie alleen 4D wil, heeft technisch genoeg aan Simulate; de meeste kopers nemen Manage omdat clash detection de eigenlijke aankoopreden is en 4D "er toch bij zit".

De functie van TimeLiner is nauwkeurig te omschrijven als: **een externe planning inlezen, taken aan modelgeometrie hangen, en het resultaat als film afspelen.** Autodesk' eigen omschrijving: TimeLiner *"enables you to link your model to an external construction schedule for visual time and cost based planning"*. Het sleutelwoord is *external*.

### Historie en eigendom

- **1997** — Navisworks ontstaat bij **NavisWorks Ltd**, een dochter van **Lightwork Design** in Sheffield (VK), als large-model-navigatiesysteem. Het onderscheidende was destijds de mogelijkheid om modellen te bekijken die veel groter waren dan het werkgeheugen.
- **Begin jaren 2000** — het product wordt verkocht onder het merk **JetStream**, met modules als *Roamer* (viewer/aggregator), *Clash Detective*, *Presenter* en **TimeLiner**. TimeLiner is dus ruim twintig jaar oud en stamt uit het pre-Autodesk-tijdperk.
- **1 juni 2007** — **Autodesk neemt NavisWorks over voor circa US$ 25 miljoen.** Het product wordt hernoemd naar Autodesk Navisworks en gesplitst in Freedom/Simulate/Manage (aanvankelijk ook een "Review"-editie).
- **2007–2025** — incrementele ontwikkeling. Autodesk zelf presenteerde Navisworks 2026 (uitgebracht 1 april 2026) op het eigen forum als *"our biggest release in some time"* en in de vakpers als "de grootste release in tien jaar" — een impliciete erkenning van een decennium stilstand. TimeLiner komt in de what's-new-lijst van 2026 (UI-verbeteringen, Clash Detective, Appearance Profiler, Measure Panel, Pivot Point Lock, Export to NWD, Property Sets) **niet voor**.

### Doelgroep, sectoren en regio's

**Doelgroep.** BIM-coördinatoren en VDC-teams bij hoofdaannemers; in mindere mate werkvoorbereiders. Uitdrukkelijk **niet** de planner zelf — die blijft in Primavera P6 of MS Project werken en levert data áán TimeLiner. Dat is een structureel kenmerk: TimeLiner zit in de gereedschapskist van de modelmens, niet die van de planner.

**Sectoren.** Utiliteitsbouw en complexe MEP-coördinatie zijn de kern. Verder: industriebouw, olie & gas, en infrastructuur (spoor, luchthavens, wegen, nutsvoorzieningen). De sweet spot is het grote, multidisciplinaire project — bij projecten boven US$ 100 miljoen wordt BIM-adoptie in de bronnen op circa 87% geschat, met Navisworks als dominante tool binnen dat ecosysteem *(schatting uit secundaire marktbronnen, niet onafhankelijk geverifieerd)*.

**Regio's.** Navisworks wordt in de bronnen consistent beschreven als *"the industry-standard tool for BIM clash detection, model review, and coordination"*. Geografisch is het sterkst geworteld in de VS, het VK, het Midden-Oosten, Australië en India — markten waar de opdrachtgever vaak expliciet om een NWD-oplevering vraagt. In Nederland en Scandinavië is het beeld genuanceerder: daar staan Solibri en BIMcollab sterker voor modelkwaliteit en issue-management, terwijl Navisworks vooral bij grote aannemers en internationale projecten wordt ingezet. Harde regionale marktaandeelcijfers publiceert Autodesk niet.

**Platform.** Uitsluitend **64-bit Windows 10/11**. Geen macOS, geen Linux, geen webversie. Wie op een Mac werkt, heeft een VM of een aparte Windows-machine nodig.

---

## 2. Functionaliteit en techniek

### 2.1 De vier tabbladen

TimeLiner is opgebouwd uit vier tabbladen, en die indeling verraadt het ontwerpuitgangspunt:

1. **Tasks** — de takenlijst in een meerkolomstabel, met daarnaast *"a read-only graphical representation of your project schedule"*. De gantt kent drie weergaven via de dropdown *Display Dates*: **Planned Dates**, **Actual Dates** en **Planned vs Actual**. Drie voorgedefinieerde kolomsets: **Basic**, **Standard**, **Extended**.
2. **Data Sources** — koppelingen naar externe planningssoftware, met de acties **Rebuild Task Hierarchy** (leest alle taken opnieuw in), **Synchronize** (werkt bestaande taken bij met o.a. nieuwe start- en einddatums) en **Refresh**.
3. **Configure** — beheer van *task types*. Het task type *"defines what happens at the start and end of each task of that type"*: objecten verbergen, van uiterlijk veranderen, of terugzetten naar de modelinstelling. Standaardtypes zijn Construct, Demolish en Temporary.
4. **Simulate** — afspelen: *"view your model at any date in your schedule with the currently active tasks highlighted"*, met intervalgrootte, overlay-tekst en koppeling naar de Animator (camerapaden, objectanimaties zoals kraanbewegingen).

### 2.2 Wat een TimeLiner-taak wél is

Een taak wordt volgens de documentatie aangemaakt met *"a name, start and end date, and a task type"*. De bewerkbare velden zijn volgens de help-pagina *Edit Tasks* precies deze:

- Task Name
- Task Date and Time (planned start/end, actual start/end)
- Task Type
- Task Costs
- Positie in de hiërarchie (omhoog/omlaag, in-/uitspringen)
- Verwijderen

Daarnaast zijn er statusaanduidingen, een *Active*-checkbox en een *Attached*-indicatie, plus vijf kostenkolommen: **Material Cost, Labour Cost, Equipment Cost, Subcontractor Cost** en de afgeleide **Total Cost** (*"cannot be modified"*, en *"costs cannot be added to summary tasks"* — die worden opgeteld uit de kinderen). Gebruikers kunnen eigen kolommen toevoegen aan de standaardset.

### 2.3 Wat een TimeLiner-taak níét is — de kernbeoordeling

**Onder TimeLiner zit geen netwerkplanningsengine. Punt.** Dit is niet een kwestie van een zwakke of beperkte engine — er is er geen.

Concreet ontbreekt:

| Ontbrekend | Consequentie |
|---|---|
| **Duurveld** | Er is geen `duration`. Zoals een vakpublicatie het formuleert: *"In Timeliner, tasks only have start and end dates—there's not even a field for duration."* Een taak is letterlijk een naam plus twee datums. |
| **Logica (voorgangers/opvolgers)** | Er zijn geen relaties, geen FS/SS/FF/SF, geen lags. TimeLiner *"ignores all schedule logic, turning your plan into just a series of independent dates."* |
| **CPM / kritiek pad / float** | Zonder duur en logica is forward/backward pass onmogelijk. Er is geen total float, geen free float, geen kritieke-padmarkering. |
| **Kalenders** | De enige werktijdinstelling in de TimeLiner-opties is *"Beginning of Working Day (24h)"* en *"End of Working Day (24h)"*. Geen werkdagenpatroon, geen feestdagen, geen ploegendiensten, geen kalenders per taak of per resource. |
| **Resources** | Geen resourcedefinities, geen toewijzing, geen histogram, geen nivellering. Voor tijdelijke middelen (kranen, steigers) moet men *"dummy"-taken* aanmaken. |
| **Baselines** | Geen baseline-mechanisme. Het enige dat erop lijkt, is de tweede datumset (*Planned* vs *Actual*) plus de gantt-weergave *Planned vs Actual*. Eén "baseline", niet-versiebeheerd, niet vergelijkbaar over meerdere momenten. |
| **Scenario's / what-if** | Niet aanwezig. Wie twee varianten wil vergelijken, maakt twee NWF-bestanden. |

**Herrekenen bestaat niet.** Verschuift één taak, dan verschuift er niets mee — omdat er niets aan hangt. In de praktijk betekent dat: iedere wijziging gaat terug naar P6/MS Project, waar wél herrekend wordt, waarna TimeLiner opnieuw synchroniseert. Wie tóch in TimeLiner bijstelt, moet *"line by line"* handmatig door de lijst.

En dat handwerk is bovendien vluchtig. De documentatie waarschuwt expliciet: *"The changes you make to tasks imported from external project files will be overwritten next time you refresh the corresponding data sources."* Lokale bewerkingen op geïmporteerde taken zijn dus per definitie tijdelijk.

### 2.4 "Validate Project Schedule" valideert de planning niet

De functienaam is misleidend. *Validate Project Schedule* controleert uitsluitend de **koppelingsintegriteit tussen taken en geometrie**, in zeven checks:

1. Attached Items
2. Contained Items
3. Unattached / Uncontained Items (geometrie zonder taak)
4. Items Attached to Multiple Tasks
5. Items Contained in Multiple Tasks
6. Items Attached to Overlapping Tasks
7. Items Contained in Overlapping Tasks

Dit zijn nuttige 4D-hygiënechecks — vooral #3 (welke objecten zitten in géén enkele taak?) is in de praktijk goud waard. Maar het is geen **schedule quality**-analyse: geen open ends, geen negatieve lags, geen out-of-sequence logic, geen DCMA-14-achtige checks. Die kunnen ook niet, want de onderliggende data bestaat niet.

### 2.5 Koppeling taak ↔ geometrie

Dit is waar TimeLiner wél sterk is. Drie mechanismen:

- **Auto-Add Tasks** — genereert taken uit de Selection Tree (per layer/item) of uit selection/search sets. Zulke taken zijn *"attached to the corresponding geometry as soon as they are created"*, krijgen automatisch opeenvolgende planned-datums vanaf de systeemdatum en task type *Construct*.
- **Handmatig attachen** — via de Attach-knop of het contextmenu.
- **Auto-Attach Using Rules** — regelgebaseerd, met templates als *Attach Items to Tasks* en *Attach Items to Tasks by Category/Property*. In combinatie met **search sets** (regelgebaseerde, zelf-herbouwende selecties, in tegenstelling tot de statische selection sets) is dit de schaalbare route: als het model wordt bijgewerkt, hangen nieuwe objecten zichzelf aan de juiste taak — mits de naamgevingsdiscipline en de propertystructuur kloppen.

Dit is de facto de kwaliteitsbepalende factor van elk Navisworks-4D-project: **de 4D staat of valt met naming conventions en search sets, niet met de planningskant.**

### 2.6 5D-light

De vijf kostenkolommen maken een eenvoudige cashflowsimulatie mogelijk. Beperkingen zijn echter fundamenteel:

- Kosten zijn **niet hoeveelheidsgedreven** — geen koppeling met Quantification-takeoff, geen eenheidsprijzen × hoeveelheid.
- Kosten worden **niet lineair opgebouwd**: bij aanvang van een taak is de kost nul, bij afronding valt het volledige bedrag ineens. Een realistische S-curve is dus niet te maken.
- *"Costs are not based on any specific currency"* — het is een dimensieloos getal.
- Kosten kunnen niet op summary tasks worden gezet.

Het is bruikbaar als indicatieve cashflow-animatie, niet als kostenbeheersinstrument.

### 2.7 Schaalbaarheid en prestaties

De Navisworks-motor zelf is uitzonderlijk goed in het samenvoegen en navigeren van zeer grote federatieve modellen — dat was in 1997 de bestaansreden en het is het nog steeds. De NWC/NWD-compressie maakt modellen hanteerbaar die in de bronapplicaties onwerkbaar zijn.

De **TimeLiner-simulatie** is echter een ander verhaal. Autodesk erkent in een eigen supportartikel: *"The Simulation can become overly complex by using a large amount of search sets, and reduce performance."* De aanbevolen oplossing is het aantal search sets terugbrengen — wat direct botst met de best practice uit §2.5, waar juist search sets de schaalbare koppelmethode zijn. Dat is een reële architectuurspanning: de nette manier van werken is ook de trage manier.

Verder documenteert Autodesk een crash: *"Navisworks crashes with CER during attempt to use TimeLiner"* bij het wijzigen van taak-startdatums in NWF-bestanden.

---

## 3. Prijzen

> **Belangrijk voorbehoud.** Autodesk publiceert geen server-gerenderde lijstprijzen; zie de methodologische noot bovenaan. Onderstaande bedragen zijn per bron gelabeld met betrouwbaarheidsniveau. Bedragen zijn exclusief btw.

### 3.1 Officieel Autodesk: Flex (pay-as-you-go)

De **enige** officiële Autodesk-bron met harde getallen, opgehaald 25-07-2026 van `autodesk.com/buying/flex/flex-rate-sheet`:

| Product | Tokens/dag | Kosten/dag |
|---|---|---|
| **Navisworks Manage** | **9 tokens** | **US$ 27 per dag** |
| **Navisworks Simulate** | **4 tokens** | **US$ 12 per dag** |

Onderliggende tokenprijs: US$ 3 per token (global SRP, peildatum 7 september 2021, zoals vermeld op de rate sheet zelf). Per **4 juni 2026** verlaagde Autodesk het minimum-afnamepakket van 100 tokens / US$ 300 naar **33 tokens / US$ 99** *(bron: ainvest.com, 2026)*.

**Doorrekening (eigen berekening, expliciet een SCHATTING):** bij 220 werkbare dagen per jaar kost dagelijks gebruik van Navisworks Manage via Flex 220 × US$ 27 = **US$ 5.940 per jaar**. Flex is dus alleen rendabel bij incidenteel gebruik — ruwweg onder de ~100 gebruiksdagen per jaar. Voor een 4D-planner die dagelijks in het model zit, is een abonnement altijd goedkoper. Dat is precies zoals Autodesk het bedoeld heeft.

### 3.2 Abonnementen (secundaire bronnen)

| Product / term | Bedrag | Bron | Datum | Betrouwbaarheid |
|---|---|---|---|---|
| **Navisworks Manage**, jaarabonnement | vanaf **US$ 2.605** | NOVEDGE (Autodesk-reseller), via zoekresultaat `novedge.com/products/buy-navisworks-manage-subscription` | opgehaald 25-07-2026 | **Redelijk** — reseller-listprijs |
| **Navisworks Simulate**, maand | US$ 145 | zoftwarehub.com/products/navisworks/pricing | pagina "last updated 8 Jul 2025" | Matig — secundaire aggregator |
| **Navisworks Simulate**, jaar | US$ 1.145 | idem | idem | Matig; **vermoedelijk verouderd** (komt overeen met Autodesk-lijstprijzen uit ~2019–2021) |
| **Navisworks Simulate**, 3 jaar | US$ 3.440 | idem | idem | Matig |
| **Navisworks (algemeen)**, per gebruiker/jaar | US$ 2.000 – 8.000+ | itqlick.com/navisworks/pricing | 2026 | Laag — brede bandbreedte, geen tierdefinitie |
| **Navisworks Manage**, 1 jaar (NL) | ± **€ 1.200** | kccb.nl (NL-reseller), via zoekresultaat | 2026 | **Laag** — pagina niet direct te verifiëren (403); bedrag ligt fors onder de US-listprijs en betreft mogelijk Simulate of een aanbieding |
| **Navisworks Manage**, 3 jaar (NL) | ± € 3.000 | idem | 2026 | **Laag** |

**Interne inconsistentie, expliciet benoemd:** US$ 145/maand × 12 = US$ 1.740, terwijl het jaarabonnement op US$ 1.145 staat. Dat verschil is te groot voor een normale jaarkorting en wijst erop dat de aggregator prijzen uit verschillende jaren door elkaar haalt. Behandel de Simulate-cijfers met wantrouwen.

**Beste schatting (EIGEN INSCHATTING, geen bron):** de reële Autodesk-lijstprijs voor Navisworks Manage ligt medio 2026 vermoedelijk in de bandbreedte **US$ 2.600 – 3.300 per named user per jaar**, en voor Simulate ruwweg **US$ 1.500 – 2.100 per jaar**. Deze schatting is afgeleid uit de Novedge-listing, de bekende Flex-verhouding Manage:Simulate van 9:4, en de gedocumenteerde prijsverhogingen.

### 3.3 De route die de meeste kopers nemen: de AEC Collection

In de praktijk koopt vrijwel niemand Navisworks los. Het zit in de **Autodesk Architecture, Engineering & Construction Collection**, samen met Revit, AutoCAD, Civil 3D, InfraWorks en tien+ andere producten.

- **US$ 3.115 – 3.375 per named user per jaar** (2026 lijstprijs) *(bron: autodeskaudits.com, via zoekresultaat; secundair, matige betrouwbaarheid)*.

Dit is economisch het belangrijkste feit over TimeLiner-prijzen: **voor een organisatie die de AEC Collection al heeft, is de marginale prijs van 4D-capaciteit nul.** Dat verklaart het overgrote deel van TimeLiners marktaandeel — niet de kwaliteit van de module, maar het feit dat hij al betaald is.

### 3.4 Prijsontwikkeling

Autodesk voerde per **april 2026** een prijsverhoging van circa **8%** door op de meeste producten, en **9–10%** op collections *(secundaire bronnen; matige betrouwbaarheid)*. Een geciteerde doorrekening: een abonnement van US$ 2.000 in 2021 komt in 2026 uit boven US$ 2.890 — een cumulatieve stijging van ruim 44% in vijf jaar. Voor grootverbruikers wordt gerapporteerd dat een jaarbudget van US$ 3 mln zonder onderhandelde caps in jaar drie richting US$ 3,8 mln kan lopen.

### 3.5 Implementatiekosten

Er zijn geen betrouwbare gepubliceerde cijfers. Gevonden schattingen (US$ 500 training per gebruiker, US$ 200/jaar IT-ondersteuning) komen van een contentfarm-achtige prijsvergelijker en zijn **niet bruikbaar**.

**EIGEN INSCHATTING, gebaseerd op de functionele analyse in §2:** de dominante implementatiekost van 4D met TimeLiner is geen licentie- of trainingskost, maar **menstijd voor datavoorbereiding**:

- Naamgevingsconventies afstemmen tussen model en planning (WBS-codes als property in het model krijgen) — dit is de eigenlijke sleutel tot auto-attach.
- Search sets bouwen en onderhouden.
- Per modelrevisie: koppelingen controleren via *Validate Project Schedule*.
- Iedere planningswijziging opnieuw door de sync-cyclus halen.

Realistisch is dat de eerste 4D-opzet van een middelgroot project **enkele weken** VDC-tijd kost, en dat het onderhoud per planningsupdate **uren tot een dag** bedraagt. Dat is een orde van grootte méér dan de licentie.

---

## 4. VOORDELEN

1. **Onovertroffen modelaggregatie als fundament onder de 4D.** Navisworks leest 60+ bestandsformaten en comprimeert die tot NWC/NWD-bestanden waarmee zeer grote federatieve modellen op gewone werkstations vloeiend navigeerbaar zijn. Voor 4D betekent dit iets concreets: je krijgt het *hele* project — architectuur, constructie, MEP, terrein, tijdelijke werken — in één scène, zonder eerst een modelconsolidatieproject te moeten draaien. Geen enkele concurrent doet dit beter.

2. **De 4D is economisch gratis voor wie de AEC Collection al heeft.** TimeLiner zit in Simulate én Manage, en Manage zit in de AEC Collection. Voor de typische aannemer of ingenieursbureau met bestaande Autodesk-licenties is de marginale kost van 4D-capaciteit nul. Dat maakt TimeLiner de laagdrempeligste manier ter wereld om met 4D te beginnen — een instapdrempel die gespecialiseerde tools van US$ 1.200–3.000 per gebruiker per jaar niet kunnen evenaren.

3. **Levende koppeling met de planningsbron, in plaats van een kopie.** Via de Data Sources-tab met **Synchronize** en **Rebuild Task Hierarchy** blijft de planning in P6 of MS Project de enige waarheid. Dat is architectonisch correct: de planner plant in zijn eigen tool, de VDC-er visualiseert. Er ontstaat geen tweede, divergerende planning — een val waarin veel geïntegreerde 4D-tools wél lopen.

4. **Regelgebaseerd koppelen dat modelupdates overleeft.** *Auto-Attach Using Rules* in combinatie met **search sets** koppelt taken aan geometrie op basis van properties en categorieën in plaats van handmatige selecties. Bij een modelrevisie hangen nieuwe objecten zichzelf automatisch aan de juiste taak. Op een project met tienduizenden objecten is dit het verschil tussen haalbaar en onhaalbaar.

5. **Tijdgebaseerde clash detection in Manage.** Doordat Clash Detective en TimeLiner in hetzelfde product zitten, kunnen clashes tegen het tijdvenster van TimeLiner-taken worden gefilterd. Dat levert *sequence clashes* op: conflicten die alleen bestaan omdat twee activiteiten gelijktijdig in dezelfde ruimte werken — inclusief tijdelijke werken zoals steigers en kranen. Dit is een echt onderscheidend vermogen dat losstaande 4D-tools zonder eigen clash-engine niet bieden.

6. **Animator-integratie voor echte bouwplaatslogistiek.** TimeLiner-taken kunnen animaties uit de Animator aansturen: kraanbewegingen, objectpaden, camerastandpunten. Daarmee komen 4D-films tot stand die verder gaan dan objecten die aan/uit gaan — bruikbaar voor hijsplannen, aan- en afvoerroutes en fasering van tijdelijke voorzieningen.

7. **Gratis distributie van het resultaat via Freedom.** Een opgebouwde 4D-simulatie kan als NWD worden gepubliceerd en door iedereen met de gratis **Navisworks Freedom**-viewer worden afgespeeld. Opdrachtgevers, onderaannemers en vergunningverleners hebben geen licentie nodig. Voor communicatie over fasering is dat een reëel praktijkvoordeel, en het is een van de weinige plekken waar Autodesk daadwerkelijk iets weggeeft.

8. **5D-light zonder extra tool.** Vijf kostenkolommen (materiaal, arbeid, materieel, onderaanneming, totaal) laten een indicatieve kostenanimatie meelopen met de tijdssimulatie. Beperkt (zie §2.6), maar het kost niets extra en is voor een eerste cashflowbeeld op directieniveau vaak genoeg.

9. **Uitbreidbaar via een volwassen .NET-API.** De Navisworks .NET-API stelt `IDocumentTimeliner`, `TimelinerTask` en methoden als `TaskMergeRebuild()`, `TaskMergeSynchronize()` en `DataSourceReplaceWithCopy()` beschikbaar. Autodesk documenteert expliciet dat *"TimeLiner can support third party data sources using the Navisworks .NET API"* — je kunt dus je eigen planningskoppeling schrijven wanneer de meegeleverde connectors tekortschieten (wat ze doen, zie §6). Er is een levendige App Store met TimeLiner-gerelateerde add-ins.

10. **De grootste kennisbasis in de markt.** Vrijwel elke BIM-coördinator ter wereld heeft ooit met Navisworks gewerkt. Er zijn duizenden uren tutorials, Pluralsight-cursussen, consultants in elke regio en een actief Autodesk-forum. Personeel is te vinden en in te werken; bij niche-4D-tools is dat een reëel risico.

---

## 5. NADELEN

1. **Er zit geen planningsengine onder — dit is het centrale bezwaar.** Taken hebben alleen een naam en twee datums. Geen duur, geen voorgangers/opvolgers, geen float, geen kritiek pad. In de woorden van een vakvergelijking: *"there's not even a field for duration"* en TimeLiner *"ignores all schedule logic, turning your plan into just a series of independent dates."* Alles wat een planningstool tot planningstool maakt, ontbreekt. TimeLiner is een **consument** van planningen, geen producent. Wie TimeLiner als planningsinstrument aanschaft, koopt het verkeerde product.

2. **Geen kalender.** De enige werktijdinstellingen zijn *"Beginning of Working Day (24h)"* en *"End of Working Day (24h)"*. Geen werkdagenpatroon, geen feestdagen, geen weekendregels, geen ploegendiensten, geen kalender per taak. Voor een tool die de bouwvolgorde in de tijd toont, is het niet kunnen onderscheiden van werkdagen en niet-werkdagen een opmerkelijk gat: een simulatie loopt gewoon door in het kerstreces.

3. **De lijst ondersteunde planningssoftware is bevroren rond 2013 — en staat nog steeds zo in de 2026-documentatie.** De help van Navisworks **2026** noemt letterlijk: *"Microsoft Project 2007 - 2013"*, *"Primavera Project Management 6 - 8"*, *"Asta Power Project 11 - 12"*, en P6 Web Services tot en met **V8.3**. Dat is meer dan tien jaar oud. De praktische consequentie is bekend en breed gerapporteerd: wie een moderne P6-versie draait, exporteert naar Excel, converteert naar CSV en importeert dat — waarmee alle voordelen van een levende koppeling (voordeel 3) verdampen en men terugvalt op handmatige bestandsuitwisseling.

4. **Lokale bewerkingen worden bij elke refresh weggegooid.** De documentatie is expliciet: *"The changes you make to tasks imported from external project files will be overwritten next time you refresh the corresponding data sources."* Je kunt dus niet in TimeLiner werken. Elk inzicht dat de 4D-simulatie oplevert — "deze twee activiteiten botsen" — moet handmatig worden overgebracht naar P6, want in TimeLiner zelf beklijft niets.

5. **De gantt is read-only en het bewerken is omslachtig.** Autodesk noemt de gantt zelf *"a read-only graphical representation"*. Er wordt niet gesleept, niets herrekend. Bijkomende ergernissen uit de praktijk: taakbewerking en animatie zitten op verschillende tabbladen zodat men voortdurend heen en weer wisselt; filteren kan alleen op start-/einddatum of taakstatus; en de zoekfunctie moet eerst handmatig worden aangezet via de optie *"Enable Find"* — hij staat standaard uit.

6. **Geen resources, geen nivellering.** Er is geen enkel resourcebegrip: geen ploegen, geen materieel, geen histogram, geen levelling. Voor tijdelijke middelen moeten *"dummy"-taken* worden aangemaakt. Wie resource-gedreven of locatiegebaseerd (flowline/takt) wil plannen, kan dat met TimeLiner op geen enkele manier — ook niet als visualisatie, want de onderliggende data bestaat niet.

7. **Geen echte baselines of scenario's.** Er is precies één alternatieve datumset (Planned vs Actual). Geen versiebeheerde baselines, geen meerdere revisies naast elkaar, geen what-if-vergelijking. Wie twee bouwvolgordes wil afwegen — een van de belangrijkste redenen om überhaupt 4D te doen — moet twee complete NWF-bestanden onderhouden en er handmatig tussen wisselen.

8. **Prestaties en stabiliteit onder druk, precies bij nette werkwijze.** Autodesk erkent in een eigen supportartikel dat de simulatie hakkelt bij intensief gebruik van search sets: *"The Simulation can become overly complex by using a large amount of search sets, and reduce performance."* Dat is wrang, want search sets zijn juist de aanbevolen schaalbare koppelmethode. Daarnaast documenteert Autodesk crashes bij het bewerken van TimeLiner-datums in NWF-bestanden. Reviewers op Capterra en Software Advice noemen trage prestaties, crashes bij imports en hoog resourcegebruik als terugkerende klachten.

9. **Visueel beperkt voor een tool die om visualisatie draait.** Er is geen groei-simulatie: objecten wisselen alleen van kleur en transparantie in plaats van geleidelijk te verschijnen — een muur wordt niet laag voor laag opgemetseld. Elke taak kan bovendien maar één appearance-profiel hebben, waardoor genuanceerde weergaves (bijv. "in uitvoering, 60% gereed") niet te maken zijn.

10. **Verouderd platform en zichtbare stilstand.** Windows-only, desktop-only, geen web- of Mac-versie, geen samenwerking in realtime. Software Advice-reviewers merken op dat het product *"has not changed significantly"* in het afgelopen decennium. Autodesk' eigen marketing van Navisworks 2026 als "de grootste release in tien jaar" bevestigt de diagnose meer dan hij hem weerlegt — en **TimeLiner staat niet in de what's-new-lijst van die release**. De module krijgt aantoonbaar geen ontwikkelaandacht.

11. **Prijs is intransparant en stijgt structureel.** Autodesk toont geen lijstprijs op zijn eigen productpagina's (de placeholder `{{PRICE}}` blijft staan) — een koper moet naar een reseller of de checkout. Reviewers noemen de kosten consequent een minpunt. De prijsverhoging van ~8% per april 2026, bovenop een cumulatieve stijging van ruim 40% sinds 2021, maakt de totale eigendomskosten slecht voorspelbaar.

12. **Vendor lock-in via gesloten native formaten.** NWC, NWF en NWD zijn ongedocumenteerde Autodesk-formaten. Het gefedereerde model, de search sets, de task types én de koppelingen tussen taken en geometrie leven uitsluitend in het NWF/NWD. Er is geen migratiepad: wie na drie jaar naar een andere 4D-tool wil, begint de koppelarbeid volledig opnieuw. Zie §6.

---

## 6. Interoperabiliteit — hoe open of gesloten is dit pakket?

Voor een opdrachtgever die een open-source, IFC-gebaseerde planner bouwt, is dit de belangrijkste paragraaf. Het korte antwoord: **Navisworks leest bijzonder breed en schrijft vrijwel niets. Het is een asymmetrisch, gesloten platform.**

### 6.1 Planningsdata — invoer

| Formaat / bron | Ondersteund? | Opmerking |
|---|---|---|
| **CSV** | **Ja** | Via *CSV Import* in de Data Sources-tab, met veldmapping. In de praktijk de dominante route, juist omdat de native connectors verouderd zijn. |
| **Microsoft Project MPX** | **Ja** | Leesbaar zonder dat MS Project geïnstalleerd is. Let op de gedocumenteerde eigenaardigheid: *"Primavera SureTrak exports its unique id in the text10 field of the MPX file, rather than the unique id field."* MPX is een verouderd formaat dat Microsoft al lang niet meer schrijft. |
| **Microsoft Project 2007–2013 (MPP)** | **Ja, met beperking** | Vereist een geïnstalleerde, ondersteunde MS Project-versie op de machine. Nieuwere MS Project-versies staan niet in de ondersteuningsmatrix van de 2026-help. |
| **Microsoft Project XML (MSPDI)** | **Nee (import)** | Alleen als **export**-formaat, niet als datasource. |
| **Primavera Project Management 6–8** | **Ja, met beperking** | Vereist geïnstalleerde Primavera. |
| **Primavera P6 Web Services (v6 / v7 / v8.3)** | **Ja, met beperking** | Vereist een opgezette P6 Web Server. Maximaal V8.3 — een versie uit 2013. |
| **Primavera XER** | **Nee** | Het meest gebruikte P6-uitwisselingsformaat ter wereld wordt niet ondersteund. |
| **Primavera P6 XML** | **Nee** | Evenmin. |
| **Asta Powerproject 11–12** | **Ja, met beperking** | Vereist geïnstalleerde Asta. |
| **IFC (IfcWorkSchedule / IfcTask)** | **Nee** | Zie §6.3. |

Dat **XER noch P6 XML** wordt ondersteund, is opmerkelijk: dit zijn juist de formaten waarmee de planningswereld daadwerkelijk uitwisselt. De ondersteunde route (directe koppeling met een geïnstalleerde P6-installatie t/m versie 8.3) is voor de meeste moderne omgevingen onbruikbaar.

### 6.2 Planningsdata — uitvoer

- **CSV** — ja.
- **Microsoft Project XML (MSPDI)** — ja. Dit is het meest open uitvoerpad dat TimeLiner heeft.
- **Terugschrijven naar P6 of MS Project** — **nee**. De koppeling is strikt eenrichtingsverkeer: `Synchronize` en `Rebuild` halen data óp, er is geen push-mechanisme. Alles wat de 4D-analyse oplevert, moet handmatig terug de planningstool in.
- **Media** — bitmap/PNG/JPEG stills, AVI-animaties, image sequences.
- **Selection Sets** — het taakschema kan als hiërarchie naar het Sets-venster worden geëxporteerd.

### 6.3 IFC — het cruciale punt

**Geometrie:** Navisworks **importeert** IFC2x3, IFC4 en IFC4x3, met keuze uit meerdere readers (waaronder een op **IfcOpenShell** gebaseerde en de Revit IFC Reader, die *"more fidelity in the geometry and data"* geeft maar trager is). Dataverlies is een erkend en gedocumenteerd probleem; Autodesk' eigen supportmateriaal beschrijft ontbrekende properties en vervormde elementen na IFC-import. Ook bekend: IFC4x3-bestanden uit Civil 3D of Revit die zonder workaround niet in Navisworks openen.

**IFC-export:** **niet native aanwezig.** Alleen via third-party add-ins uit de Autodesk App Store (IFC Exporter, Navistools IFC Exporter) of Geometry Gym. Navisworks is architectonisch een eindstation, geen doorgeefluik.

**IfcWorkSchedule / IfcTask / IfcWorkPlan:** **volledig niet ondersteund.** Navisworks leest de 4D-planningsentiteiten uit IFC niet en schrijft ze niet weg. Er is geen mapping, geen importoptie, geen add-in van Autodesk. De gedocumenteerde workflow is expliciet gesplitst: model via IFC binnenhalen, planning apart via MS Project/CSV, en de koppeling handmatig in TimeLiner leggen.

Dit is voor de opdrachtgever de belangrijkste bevinding van dit hele profiel. **De IFC-planningsketen die IFC 4.3 formeel biedt (IfcWorkPlan → IfcWorkSchedule → IfcTask → IfcRelAssignsToProduct), wordt door de marktleider in 4D genegeerd.** Ter contrast: de open-source **Bonsai/BlenderBIM** herkent deze entiteiten wel — een gebruiker bevestigt *"BlenderBIM does recognize the IfcWorkPlan, IfcWorkSchedule, IfcTask etc in my ifc file"* — terwijl zelfs een commerciële 4D-tool als Bexel Manager er in dezelfde test op faalde. Er bestaat op dit moment geen breed beschikbare commerciële tool die volledige planningsinformatie rechtstreeks uit IFC leest.

### 6.4 BCF

**Geen native ondersteuning.** Autodesk stelt in eigen supportdocumentatie onomwonden: *"Currently .BCF data cannot be exported from Navisworks without another tools."* De aanbevolen route is het installeren van de gratis **BIMcollab BCF Manager**-plug-in uit de Autodesk App Store. Autodesk stuurt gebruikers voor issue-uitwisseling liever naar zijn eigen gesloten kanaal: het ACC/Revit issue-management dat in Navisworks Manage is ingebouwd.

### 6.5 Native formaten en lock-in

| Formaat | Rol | Openheid |
|---|---|---|
| **NWC** | Cache/conversiebestand per bronmodel | Gesloten, ongedocumenteerd |
| **NWF** | Referentiebestand: verwijzingen naar bronbestanden + alle Navisworks-data (sets, viewpoints, clashtests, **TimeLiner-taken en -koppelingen**). Bevat zelf geen geometrie. | Gesloten |
| **NWD** | Volledig, zelfstandig bestand inclusief geometrie; te openen in elk Navisworks-product inclusief de gratis Freedom-viewer. | Gesloten, maar gratis leesbaar |

De 4D-intelligentie — welke taak aan welk object hangt, welke search sets, welke task types en appearance definitions — bestaat uitsluitend binnen NWF/NWD. Er is **geen exportpad** dat deze koppelingen naar een open formaat wegschrijft. Migratie naar een andere 4D-tool betekent: de volledige koppelarbeid opnieuw doen. Dat is de scherpste lock-in in het pakket, scherper dan de geometrie zelf (die immers uit de bronmodellen komt).

### 6.6 API

- **.NET API** (Windows, managed/COM), met een TimeLiner-namespace: `IDocumentTimeliner`, `TimelinerTask`, `TaskMergeRebuild()`, `TaskMergeSynchronize()`, `DataSourceReplaceWithCopy()`. Autodesk documenteert expliciet dat eigen datasources kunnen worden geschreven.
- **Beperking:** meerdere ontwikkelaars rapporteren dat de takencollectie in de praktijk read-only is voor geïmporteerde datasources (*"The selected task is read-only and cannot be updated"*).
- **Geen REST/HTTP-API, geen headless modus, geen server-side automatisering.** Alles is desktop-plugin-werk op Windows.
- **Geen open bestandsformaatspecificatie**, dus geen route om NWD/NWF buiten Autodesk om te verwerken.

### 6.7 Eindoordeel openheid

| Dimensie | Score | Toelichting |
|---|---|---|
| Lezen van open formaten | **Sterk** | 60+ formaten, IFC2x3/4/4x3 |
| Schrijven naar open formaten | **Zeer zwak** | Geen native IFC-export, geen BCF, alleen CSV/MSPDI voor planning |
| Planningsuitwisseling | **Zwak/verouderd** | Geen XER, geen P6 XML, connectormatrix uit ~2013 |
| IFC-planningsdata (4.3) | **Afwezig** | IfcWorkSchedule/IfcTask volledig genegeerd |
| Native formaat | **Gesloten** | NWC/NWF/NWD ongedocumenteerd |
| API | **Matig** | Volwassen .NET-API, maar Windows-desktop-gebonden en deels read-only |
| Lock-in-risico | **Hoog** | 4D-koppelingen zijn niet exporteerbaar |

**Samenvattend: Navisworks is een one-way valve. Data gaat er makkelijk in en komt er nauwelijks uit.**

---

## 7. Marktpositie

### Waar het sterk staat, en waarom

Navisworks is de **de-facto standaard voor clash detection en modelreview** in de internationale bouw. Bronnen beschrijven het consequent als *"the industry-standard tool for BIM clash detection, model review, and coordination"*. Die positie rust op drie pijlers:

1. **Technische voorsprong in aggregatie** die al 25 jaar houdt: het lezen van 60+ formaten en het hanteerbaar maken van enorme federatieve modellen.
2. **Bundeling in de AEC Collection**, waardoor het product de facto gratis meekomt met Revit.
3. **Contractuele verankering**: opdrachtgevers en BIM-protocollen vragen expliciet om NWD-opleveringen, wat de standaard zelfversterkend maakt.

Belangrijk om te onderscheiden: **TimeLiners marktpositie is afgeleid van die van Navisworks, niet zelfstandig verdiend.** Mensen gebruiken TimeLiner omdat ze Navisworks al open hebben, niet omdat ze TimeLiner hebben gekozen.

### Concurrenten

| Concurrent | Positionering ten opzichte van TimeLiner |
|---|---|
| **Bentley SYNCHRO 4D** | De directe, serieuze concurrent. Heeft wél een echte planningsengine: duur, logica, kalenders, resources, baselines, scenario's. Prijsindicatie US$ 1.200–3.000 per gebruiker per jaar *(ITQlick, lage betrouwbaarheid)*. Wordt gekozen wanneer 4D het primaire doel is in plaats van een bijproduct. |
| **Fuzor** | Sterk in realtime rendering en VR bovenop 4D; scoort in academisch onderzoek het hoogst op 4D- én 3D-features. |
| **BEXEL Manager** | Sterk geïntegreerd 4D/5D met eigen quantity takeoff en kostendatabases; populair in Europa. |
| **Vico Office / Trimble** | Locatiegebaseerd plannen (flowline) en 5D — een categorie die TimeLiner in het geheel niet bedient. |
| **Revizto, Solibri, BIMcollab** | Concurreren op coördinatie/issues (met echte BCF-ondersteuning), niet op 4D. |
| **Autodesk Build / ACC Model Coordination** | Autodesk' eigen cloudopvolger. Verplaatst coördinatie en planning naar de cloud; positioneert Navisworks als complementaire desktoptool. |
| **Bonsai / BlenderBIM (open source)** | Klein marktaandeel, maar functioneel relevant: leest IfcWorkPlan/IfcWorkSchedule/IfcTask native — precies wat Navisworks niet doet. |

### Onafhankelijke benchmark

De meest waardevolle onafhankelijke bron is een peer-reviewed vergelijkende studie (Sanon & Boton, ÉTS Montréal, 2024) van **Navisworks Manage, Synchro 4D Pro en Fuzor** over vier categorieën: samenwerking, 4D-features, 3D-features en planningsfunctionaliteit.

**Uitkomst:** Fuzor eerste, Synchro 4D Pro tweede, Navisworks Manage derde. Navisworks scoorde goed op samenwerking en voldeed aan alle criteria in de 4D-categorie, maar eindigde **laatste op planningsfunctionaliteit**, met *"limited options for planning development"*.

Dat is exact de conclusie die de functionele analyse in §2 voorspelt: als 4D-viewer volwaardig, als planningsinstrument onderaan.

### Trend

- **Autodesk verschuift zwaartepunt naar de cloud.** BIM 360 Glue wordt uitgefaseerd (juli 2026) ten gunste van ACC Model Coordination. Navisworks wordt niet afgebouwd — Autodesk bracht in 2026 nog een substantiële release uit met een ACC-add-in — maar de innovatie zit onmiskenbaar in de cloudproducten.
- **TimeLiner specifiek stagneert.** Geen vermelding in de what's-new van 2026; een ondersteuningsmatrix voor planningssoftware die sinds ~2013 niet is bijgewerkt; geen nieuwe planningsfunctionaliteit in jaren. De rationele lezing: Autodesk beschouwt 4D-scheduling niet als een gebied waarin het met Navisworks wil investeren.
- **4D-adoptie groeit sneller dan TimeLiner meegroeit.** Takt planning, locatiegebaseerd plannen en lean/pull-planning winnen terrein in de bouw. TimeLiner ondersteunt geen van deze methodieken, ook niet als visualisatie.

### Omzet en gebruikersaantallen

Autodesk publiceert **geen** productspecifieke omzet of gebruikersaantallen voor Navisworks. Wat wel bekend is:

- Autodesk totale omzet fiscaal 2026: **US$ 7,21 miljard**, +18% j-o-j; terugkerende omzet US$ 7,02 mrd (97% van netto-omzet) *(SEC 10-K, via secundaire bron)*.
- AEC is grofweg de helft van de Autodesk-omzet *(het in bronnen gevonden cijfer van "US$ 970 miljoen AEC-omzet" is vrijwel zeker een **kwartaalcijfer**, niet jaarlijks — 53% van US$ 7,21 mrd zou ~US$ 3,8 mrd zijn. **Behandel dit cijfer met voorzichtigheid.**)*.
- **Navisworks-specifieke omzet: onbekend.** Elke rondzwervende schatting is ongefundeerd.

---

## 8. Eindoordeel

**Navisworks TimeLiner is een uitstekende 4D-viewer en een niet-bestaande planner. Dat is geen verwijt aan de module; het is wat hij is. Het probleem ontstaat wanneer kopers of aanbieders doen alsof het anders ligt.**

Wat TimeLiner werkelijk goed doet — een externe planning aan een enorm federatief model koppelen, regelgebaseerd en schaalbaar, en het resultaat overtuigend afspelen, in Manage zelfs met tijdgebonden clash detection — doet het beter dan de meeste alternatieven, en tegen een marginale prijs van nul voor wie de AEC Collection al heeft. Voor de aannemer die wil zien of zijn bouwvolgorde ruimtelijk klopt, is er nauwelijks een pragmatischer instrument.

Maar de streng gestelde vraag — *zit er een echte netwerkplanningsengine onder?* — heeft een eenduidig antwoord: **nee, en er zit er ook geen half.** Geen duurveld, geen logica, geen float, geen kritiek pad, geen kalender, geen resources, geen baselines, geen scenario's, geen herberekening. Een TimeLiner-taak is een naam en twee datums. Alles wat op planning lijkt, gebeurt elders en wordt hier alleen afgebeeld. Bovendien is de brug naar dat "elders" verouderd: een ondersteuningsmatrix uit 2013, geen XER, geen P6 XML, en lokale bewerkingen die bij elke refresh verdwijnen.

Daar komt een strategisch signaal bij. TimeLiner stond niet in de what's-new van Navisworks 2026 — de release die Autodesk zelf als de grootste in tien jaar presenteerde. De module wordt onderhouden, niet ontwikkeld.

**Voor de opdrachtgever die een open-source, IFC-gebaseerde planner bouwt, zijn dit de operationele conclusies:**

1. **Navisworks is geen concurrent op planningsfunctionaliteit.** Elke echte CPM-engine met kalenders, relaties en float is functioneel superieur aan TimeLiner. Positioneren als "beter dan TimeLiner in plannen" is waar maar weinigzeggend — de juiste framing is dat TimeLiner een andere rol speelt.

2. **Navisworks is wél de gevestigde eindbestemming van 4D-werk.** Een IFC-planner die serieus genomen wil worden, moet dus goed kunnen *leveren aan* Navisworks. Praktisch betekent dat: een robuuste **CSV-export met configureerbare veldmapping** (de route die iedereen in de praktijk gebruikt, juist omdat de native connectors verouderd zijn) en bij voorkeur ook **Microsoft Project XML (MSPDI)** — het formaat dat TimeLiner zelf al uitschrijft en dus zeker begrijpt. Investeren in XER heeft voor Navisworks-koppeling geen zin: TimeLiner leest het niet.

3. **De grootste kans ligt precies waar Navisworks zwijgt: IFC 4.3 planningsdata.** IfcWorkPlan, IfcWorkSchedule, IfcTask en IfcRelAssignsToProduct worden door de marktleider volledig genegeerd, en door de meeste commerciële 4D-tools ook. Een planner die de planning én de koppeling taak↔object native in IFC opslaat, lost het probleem op dat Navisworks structureel creëert: dat 4D-intelligentie opgesloten raakt in een ongedocumenteerd NWF-bestand zonder migratiepad. Dat is een echt, aanwijsbaar, door de marktleider onbediend gat — en het is precies de reden waarom IFC-native persistentie een strategische keuze is en niet alleen een technische.

4. **Interoperabiliteitsverwachting realistisch houden.** Terugschrijven naar Navisworks (de 4D-koppelingen zelf) is niet mogelijk — dat pad is dicht. De haalbare integratie is: plannen in de open tool, exporteren via CSV/MSPDI, visualiseren in Navisworks. Dat is een asymmetrische maar werkbare positie, en het is dezelfde positie die P6 en MS Project al innemen.

**Samenvattend oordeel:** TimeLiner is de meest gebruikte 4D-tool ter wereld en tegelijk een van de zwakste als het om plannen gaat. Die combinatie is geen paradox maar een marktfeit — hij is meegeleverd. Dat maakt hem tot een geduchte *default*, maar tot een zwakke *keuze*, en tot een aantoonbaar onvoldoende partner voor open, IFC-gebaseerde planningsdata.

---

## Bronnen

Alle URL's opgehaald op **25 juli 2026**, tenzij anders vermeld.

### Officiële Autodesk-documentatie

1. Autodesk — Navisworks Products Overview (edities Freedom/Simulate/Manage) — https://www.autodesk.com/products/navisworks/overview
2. Autodesk Help (Navisworks 2026) — TimeLiner Workflow — https://help.autodesk.com/cloudhelp/2026/ENU/Navisworks-Timeliner/files/GUID-96D92B8A-CD9D-4E25-A549-0EB2BF15B5CE.htm
3. Autodesk Help (2026) — **Supported Scheduling Software** (MS Project 2007–2013, Primavera PM 6–8, Asta 11–12, P6 Web Services t/m V8.3, MPX) — https://help.autodesk.com/cloudhelp/2026/ENU/Navisworks-Timeliner/files/GUID-1879F810-B3D3-419A-A138-0D2F02A8BFBA.htm
4. Autodesk Help (2024) — idem, identieke matrix — https://help.autodesk.com/cloudhelp/2024/ENU/Navisworks-Timeliner/files/GUID-1879F810-B3D3-419A-A138-0D2F02A8BFBA.htm
5. Autodesk Help (2026) — **Set TimeLiner Options** (Beginning/End of Working Day; Enable Find) — https://help.autodesk.com/cloudhelp/2026/ENU/Navisworks-Timeliner/files/GUID-6E37B445-AF47-431E-B96C-D5A4F580825B.htm
6. Autodesk Help (2026) — **Edit Tasks** (bewerkbare velden; refresh overschrijft wijzigingen) — https://help.autodesk.com/cloudhelp/2026/ENU/Navisworks-Timeliner/files/GUID-5AE3CD1A-B7BF-4A73-A535-A43DF90F28CE.htm
7. Autodesk Help (2026) — **Validate Project Schedule** (zeven koppelingschecks) — https://help.autodesk.com/cloudhelp/2026/ENU/Navisworks-Timeliner/files/GUID-A73D13FF-FE32-4BF6-B226-547D6AF13C1F.htm
8. Autodesk Help (2026) — TimeLiner Tasks (documentatiestructuur) — https://help.autodesk.com/cloudhelp/2026/ENU/Navisworks-Timeliner/files/GUID-AEB188EA-6D3D-43E4-9065-FF55E5C2AAD0.htm
9. Autodesk Help (2026) — Work with Columns — https://help.autodesk.com/cloudhelp/2026/ENU/Navisworks-Timeliner/files/GUID-0C1B316F-CDEE-468E-919B-2D6C6FE968A7.htm
10. Autodesk Help (2024) — **Tasks Tab** (read-only gantt; kolomsets Basic/Standard/Extended; Planned/Actual/Planned vs Actual) — https://help.autodesk.com/cloudhelp/2024/ENU/Navisworks-Timeliner/files/GUID-91B08CFD-0B6B-4A2B-A853-BC8E173BA78C.htm
11. Autodesk Help (2024) — Data Sources Tab (Rebuild / Synchronize / Refresh) — https://help.autodesk.com/cloudhelp/2024/ENU/Navisworks-Timeliner/files/GUID-4CFA1F1B-AE51-41CC-93AD-45952F38C415.htm
12. Autodesk Help (2023) — Create Tasks — https://help.autodesk.com/cloudhelp/2023/ENU/Navisworks-Timeliner/files/GUID-1D552D7F-1B92-4E82-A650-1CDFCCF93E35.htm
13. Autodesk Help (2023) — CSV Import — https://help.autodesk.com/cloudhelp/2023/ENU/Navisworks-Timeliner/files/GUID-0E72E818-F800-4C4C-ACB1-D7D9365FEBC7.htm
14. Autodesk Help (2022) — **TimeLiner Costs** (vijf kostenkolommen; Total Cost niet bewerkbaar; kosten vallen bij afronding) — https://help.autodesk.com/cloudhelp/2022/ENU/Navisworks/files/GUID-0561777D-45B0-40B8-B298-E47BB15D7E9B.htm
15. Autodesk Support — *Navisworks TimeLiner simulation: poor performance while running the simulation* ("large amount of search sets") — https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/Navisworks-Timeliner-simulation-Poor-performance-while-running-the-simulation-in-Navisworks.html
16. Autodesk Support — *Navisworks crashes during attempt to use TimeLiner* — https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/Navisworks-crashes-during-attempt-to-use-TimeLiner.html
17. Autodesk Support — System requirements for Autodesk Navisworks 2026 products (Windows 10/11 64-bit) — https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/System-requirements-for-Autodesk-Navisworks-2026-products.html
18. Autodesk — **Flex Rate Sheet** (Navisworks Manage 9 tokens/dag = US$ 27; Simulate 4 tokens/dag = US$ 12; US$ 3/token per 7-9-2021) — https://www.autodesk.com/buying/flex/flex-rate-sheet
19. Autodesk — Buy Navisworks (subscription / Flex / multi-year) — https://www.autodesk.com/products/navisworks/buy
20. Autodesk (NL) — Navisworks overzicht (prijs-FAQ met lege placeholders) — https://www.autodesk.com/nl/products/navisworks/overview
21. Autodesk Forum — *Product Update: Navisworks 2026 — What's New* ("our biggest release in some time") — https://forums.autodesk.com/t5/navisworks-forum/product-update-navisworks-2026-what-s-new/td-p/13401440
22. Autodesk Help — What's New in Navisworks 2026 — https://help.autodesk.com/view/NAV/2026/ENU/?guid=Navisworks_Whats_New_2026
23. Autodesk Help (2026) — Model Coordination / ACC-integratie — https://help.autodesk.com/cloudhelp/2026/ENU/Navisworks/files/GUID-92D8E626-BB61-4CB8-AA46-D9E5A9517D65.htm
24. Autodesk Learn — Construction Scheduling and Cost Control (Autodesk Build + Navisworks TimeLiner) — https://www.autodesk.com/learn/ondemand/course/construction-scheduling-and-cost-control
25. Autodesk Developer Blog — TimeLiner API deel 1 en deel 3 — https://blog.autodesk.io/timeliner-api-part1/ · https://blog.autodesk.io/timliner-api-part3/
26. Navisworks .NET API-documentatie — https://apidocs.co/apps/navisworks/2018/
27. GitHub — Navisworks-API-Timeliner-Part-1 (mgjean) — https://github.com/mgjean/Navisworks-API-Timeliner-Part-1

### Reviews en gebruikersoordelen

28. Capterra — Navisworks reviews (4,7/5 uit 33 reviews; ease of use 4,3; support 4,2) — https://www.capterra.com/p/233414/Navisworks/reviews/
29. Software Advice — Navisworks reviews (4,7/5; functionality 4,6; value for money 4,4; *"has not changed significantly"*) — https://www.softwareadvice.com/animation/navisworks-profile/reviews/
30. Software Advice — Synchro vs. Navisworks vergelijking — https://www.softwareadvice.com/compare/6302-Synchro/vs/390473-navisworks/

*(G2 — https://www.g2.com/products/navisworks/reviews — en TrustRadius — https://www.trustradius.com/products/navisworks/reviews — gaven in dit onderzoek HTTP 403; Reddit-threads r/bim `uxp8jp` en `1afulac` waren niet bereikbaar. Deze bronnen zijn dus **niet** in de bevindingen verwerkt.)*

### Onafhankelijke en vakanalyse

31. **Sanon & Boton (ÉTS Montréal, 2024)** — vergelijkende studie Navisworks Manage / Synchro 4D Pro / Fuzor; Navisworks laatste op planningsfunctionaliteit — https://espace2.etsmtl.ca/id/eprint/29768/
32. Dmytro Torianyk — *Comparing SYNCHRO and Navisworks Timeliner for 4D Planning* (LinkedIn); bron van de citaten over ontbrekend duurveld, genegeerde schedulelogica, ontbrekende kalender, gescheiden tabbladen, geen groei-simulatie, dummy-taken — https://www.linkedin.com/pulse/comparing-synchro-navisworks-timeliner-4d-planning-dmytro-torianyk-apm9f
33. LinkedIn — *The Synergy of Navisworks and Autodesk Construction Cloud* — https://www.linkedin.com/pulse/synergy-navisworks-autodesk-construction-cloud-g5mqc
34. VDC Experts — BIM 360 Glue sunsetting, consolidatie onder ACC (juli 2026) — https://vdcexperts.com/bim-360-glue-is-sunsetting-heres-what-you-need-to-know-and-do-before-july-2026/
35. ARKANCE UK Community — Navisworks 2024: Setting TimeLiner Options — https://ukcommunity.arkance.world/hc/en-us/articles/21550949942546-Navisworks-2024-Setting-Timeliner-Options
36. Arkance — Autodesk Forma & Autodesk Construction Cloud productupdate — https://arkance.world/us-en/resources/read/product-updates/autodesk-forma-autodesk-construction-cloud
37. CADpilot — Autodesk Navisworks 2026.1 update — https://cadpilot.com/home/company/news/autodesk-navisworks-2026.1-update.html

### Prijsbronnen (secundair — zie voorbehouden in §3)

38. NOVEDGE — Navisworks Manage subscription, vanaf US$ 2.605 — https://novedge.com/products/buy-navisworks-manage-subscription
39. zoftwarehub — Navisworks pricing (Simulate US$ 145/mnd, US$ 1.145/jr, US$ 3.440/3jr; "last updated 8 Jul 2025") — https://zoftwarehub.com/products/navisworks/pricing
40. ITQlick — Navisworks pricing (US$ 2.000–8.000+ per gebruiker/jaar) — https://www.itqlick.com/navisworks/pricing
41. PricingNow — Navisworks pricing (bijgewerkt 8 maart 2026) — **lage betrouwbaarheid**, cijfers wijken sterk af van resellers — https://pricingnow.com/question/navisworks-pricing/
42. AInvest — Autodesk verlaagt Flex-minimum naar 33 tokens / US$ 99 per 4 juni 2026 — https://www.ainvest.com/news/autodesk-starting-june-4-lowers-autodesk-flex-minimum-33-tokens-99-100-tokens-300-2606/
43. AutodeskAudits — AEC Collection licensing en 2026-lijstprijzen (US$ 3.115–3.375 per named user/jaar) — https://autodesksaudits.com/blog/autodesk-aec-collection-licensing/
44. CDW-G — Autodesk Navisworks Manage 2026, annual subscription, 1 seat — https://www.cdwg.com/product/autodesk-navisworks-manage-2026-new-subscription-annual-1-seat/8327792
45. KCCB (NL-reseller) — ± € 1.200/jaar, ± € 3.000/3 jaar — **lage betrouwbaarheid**, pagina niet direct verifieerbaar — https://kccb.nl/navisworks-manage-voor-clashdetectie-bij-circulaire
46. CADexpress (DE/BE) — Navisworks Manage, 1 en 3 jaar (geen bedragen zichtbaar) — https://www.cadexpress.eu/de/produkt/navisworks-manage/
47. Autodesk — AEC Collection included software — https://www.autodesk.com/collections/architecture-engineering-construction/included-software

### Interoperabiliteit en IFC

48. buildingSMART — IFC 4.3.2 specificatie, IfcWorkSchedule — https://ifc43-docs.standards.buildingsmart.org/
49. IfcOpenShell — open source IFC toolkit en geometry engine — https://ifcopenshell.org/
50. BIMcorner — IfcOpenShell / open IFC-tooling — https://bimcorner.com/
51. Autodesk App Store — IFC Exporter voor Navisworks (third-party) / Navistools IFC Exporter — https://apps.autodesk.com/
52. 3D Repo Help Centre — NWF/NWD-formaatbeperkingen — https://3drepo.com/
53. Wikipedia / HandWiki — Navisworks (historie, Lightwork Design, Sheffield, JetStream, Autodesk-overname 2007) — https://handwiki.org/wiki/Software:Navisworks · https://everything.explained.today/Navisworks/

### Bedrijfscijfers

54. StockTitan / SEC — Autodesk 10-K fiscaal 2026 (netto-omzet US$ 7,21 mrd, +18%; terugkerende omzet US$ 7,02 mrd) — https://www.stocktitan.net/sec-filings/ADSK/10-k-autodesk-inc-files-annual-report-2d0f229c4613.html
55. Fiscal.ai — Autodesk AEC-segmentomzet — *(cijfer vermoedelijk kwartaalbasis; zie voorbehoud in §7)* — https://fiscal.ai/company/NasdaqGS-ADSK/metrics/segments-and-kpis/architecture-engineering-and-construction-aec-revenue/

---

## Markering van schattingen en onzekerheden

Ter transparantie, alle plekken waar dit profiel schat in plaats van citeert:

| Claim | Status |
|---|---|
| Reële lijstprijs Navisworks Manage US$ 2.600–3.300/jaar | **EIGEN SCHATTING** — afgeleid uit Novedge, Flex-verhouding en prijsstijgingen |
| Reële lijstprijs Navisworks Simulate US$ 1.500–2.100/jaar | **EIGEN SCHATTING** |
| Flex-break-even bij ~100 gebruiksdagen/jaar | **EIGEN BEREKENING** op basis van de officiële rate sheet |
| Implementatie kost enkele weken VDC-tijd, onderhoud uren–dag per update | **EIGEN INSCHATTING**, geen bron |
| 87% BIM-penetratie bij projecten > US$ 100 mln | Secundaire bron, **niet onafhankelijk geverifieerd** |
| Nederlandse prijs ± € 1.200/jaar | **LAGE BETROUWBAARHEID** — bron niet direct verifieerbaar |
| Navisworks Simulate US$ 145/mnd + US$ 1.145/jaar | **Intern inconsistent**, vermoedelijk verouderd (2019–2021-niveau) |
| Autodesk AEC-segmentomzet US$ 970 mln | **Vermoedelijk kwartaalcijfer**, niet jaarlijks — met voorzichtigheid gebruiken |
| Synchro 4D prijs US$ 1.200–3.000/gebruiker/jaar | Secundaire bron (ITQlick), **lage betrouwbaarheid** |
| Regionale verdeling (VS/VK/Midden-Oosten/AU/IN sterk, NL genuanceerd) | **KWALITATIEVE INSCHATTING** op basis van bronnenbeeld; geen marktaandeelcijfers beschikbaar |
| Navisworks-specifieke omzet / gebruikersaantallen | **NIET BESCHIKBAAR** — Autodesk publiceert dit niet |
| G2-, TrustRadius- en Reddit-oordelen | **NIET VERWERKT** — bronnen onbereikbaar tijdens onderzoek |
