# Dwarsdoorsnedethema: Interoperabiliteit en bestandsformaten

*Marktonderzoek planningssoftware — dwarsdoorsnedeanalyse*
*Analysedatum: 25 juli 2026. Alle URL's geraadpleegd op 25-07-2026 tenzij anders vermeld.*

---

## 0. Leeswijzer bronkwaliteit

Dit rapport onderscheidt expliciet drie soorten uitspraken. Ik markeer ze consequent:

| Markering | Betekenis |
|---|---|
| **[HARD]** | Normtekst, prijspagina van de leverancier zelf, aanbestedingsdocument, publieke repo-inhoud, API-respons. Direct verifieerbaar op de genoemde URL. |
| **[ZACHT]** | Leveranciersmarketing, secundaire vakpers, samenvattende bronnen (Wikipedia), analistenramingen zonder methodologie. |
| **[SCHATTING]** | Mijn eigen inschatting. Altijd inclusief de gebruikte redenering. |

**Methodologische waarschuwing vooraf.** Dit onderzoek is uitgevoerd onder een beperking: het zoekmachinebudget van de sessie was bij aanvang uitgeput, waardoor ik uitsluitend met directe URL-ophalingen (WebFetch) heb kunnen werken op bronnen die ik zelf kon aanwijzen. Dat heeft twee gevolgen die de lezer moet meewegen:

1. **Selectiebias richting bronnen die ik al kende.** Ik heb primaire bronnen kunnen bevestigen (normteksten, repo's, prijspagina's, een Amerikaans aanbestedingsbestek), maar ik heb géén brede scan kunnen doen naar recente vakpers of analistenrapporten. Waar hieronder marktaandeelcijfers ontbreken, is dat een echte lacune, geen bewuste weglating.
2. **Een aantal bronnen was technisch onbereikbaar** (HTTP 403/404): iso.org, buildingsmart.org, technical.buildingsmart.org, npmjs.com, sciencedirect.com, researchgate.net, elecosoft.com, investors.bentley.com. Waar ik daardoor moest terugvallen op een secundaire bron, staat dat er expliciet bij.

Ik heb daarom bewust **géén** marktaandeelpercentages of marktomvangcijfers verzonnen. Wat ik wél heb, zijn harde formaateigenschappen, harde prijzen, een hard aanbestedingsbewijs en harde repo-/normgegevens — en dat is precies het materiaal waarop de strategische conclusie voor een open-source planner rust.

---

## 1. Samenvatting

**De kern in één alinea.** Planningssoftware is een markt waarin het *bestandsformaat* de facto de toegangspoort is, niet de functionaliteit. Wie een planning niet kan afleveren in het formaat dat de opdrachtgever eist, doet niet mee — ongeacht hoe goed het CPM-algoritme is. De twee formaten die die poort bewaken zijn **XER** (Oracle Primavera P6) en **MPP** (Microsoft Project). Beide zijn ongedocumenteerd of gesloten. Beide zijn daarmee tegelijk het grootste marktrisico én de grootste technische schuld voor elke nieuwkomer. IFC 4.3 heeft sinds 2024 een volwaardig, ISO-genormeerd planningsdatamodel (`IfcWorkSchedule`, `IfcTask`, `IfcTaskTime`, `IfcRelSequence`, `IfcWorkCalendar`) dat op papier alles kan wat XER en MSPDI kunnen — maar het wordt in de praktijk vrijwel niet gebruikt, om redenen die structureel zijn en niet met betere software worden opgelost.

**De acht bevindingen die ertoe doen:**

1. **XER is een ongedocumenteerd tekstformaat dat toch de contractuele standaard is.** Het Amerikaanse defensiebestek UFGS 01 32 01.00 10 (aug. 2023, Change 1 08/24) schrijft letterlijk voor: *"provide the 'xer' export file in a version of P6 importable by the Government system"* **[HARD]**. Wie geen XER schrijft, valt terug op een uitwijkclausule die verplicht **twee softwarelicenties, twee computers en training voor twee overheidsmedewerkers** te leveren **[HARD]**. Dat is de prijs van formaat-incompatibiliteit, letterlijk gekwantificeerd in een bestek.
2. **Er is een levensvatbare commerciële markt puur voor het *lezen* van XER.** ScheduleReader vraagt $344/jaar (Standard) tot $440/jaar (PRO) voor een viewer die XER en P6 XML opent **[HARD]**. Dat is het beste bewijs dat formaat-toegang op zichzelf waarde heeft.
3. **MPP kan nog steeds door niemand geschreven worden — ook niet door de beste open-source bibliotheek.** MPXJ, na 25 jaar ontwikkeling, stelt zelf: *"the knowledge we have of the file structure is still relatively incomplete, despite the amount of data we are able to correctly extract"* **[HARD]**. MPXJ leest MPP maar schrijft het niet.
4. **MPXJ is het enige serieuze conversie-ecosysteem, en het is Java.** 21 formaatsecties op de formatenpagina (22 formaten als XER en PMXML apart worden geteld; de pagina noemt Merlin, PLF en ProjectLibre níét terwijl MPXJ die blijkens de "How to Read"-navigatie wél leest — het werkelijke aantal leesformaten ligt dus hóger), 6 schrijfformaten, LGPL-2.1 **[HARD]**. Python-, .NET- en Ruby-bindings bestaan; de Python-binding draait via JPype op een JVM **[HARD]**. Er is **geen JS/WASM-distributie van MPXJ zelf** — maar sinds mei 2026 bestaat er wél een derde-partij-npm-pakket (`@byteink/mppjs`, MIT) dat MPXJ als GraalVM-AOT-binary meelevert en `.mpp` → MSPDI omzet **zonder JVM** **[HARD]**. Dat verandert de kosten van de MPP-route wezenlijk (zie V12 en §5.3).
5. **MPX is dood.** MPXJ documenteert dat MPX *"can be read by versions of Microsoft Project up to and including Microsoft Project 2010"* **[HARD]** — nieuwere Project-versies lezen het niet meer. MPX heeft alleen nog waarde als legacy-inleesformaat, nooit als afleverformaat.
6. **MSPDI (MS Project XML) is het enige Microsoft-formaat dat je zelf kunt implementeren.** Het schema is publiek (`mspdi_pj12.xsd`), maar de officiële Microsoft-documentatie is bevroren: laatste inhoudelijke datum `2018-03-14`, laatste update `2021-09-16`, en de inhoud beschrijft nog Project 2007 **[HARD]**.
7. **IFC 4.3 kán het, maar de keten wil het niet.** `IfcTaskTime` bevat het volledige CPM-veldenpalet inclusief `EarlyStart`, `LateFinish`, `FreeFloat`, `TotalFloat` en `IsCritical` **[HARD]**. Toch: geen enkel gecertificeerd uitwisselingsscenario dekt planning, en de belangrijkste 4D-tools nemen planningen binnen via P6/MSP, niet via IFC. De enige noemenswaardige IFC-planningsimplementatie in open source (IfcOpenShell `ifc4d`) is zelf een **conversietool van P6/MSP náár IFC** — wat de asymmetrie perfect illustreert **[HARD]**.
8. **Het juridische risico van XER/MPP-ondersteuning is in de EU aanzienlijk kleiner dan doorgaans gedacht, maar niet nul.** Richtlijn 2009/24/EG art. 6 staat decompilatie voor interoperabiliteit uitdrukkelijk toe, mits de informatie *"not have been previously available"* was en het gebruik beperkt blijft tot interoperabiliteit **[HARD]**. Het echte risico zit niet in auteursrecht op het formaat, maar in (a) EULA-clausules van de bronapplicatie, (b) merkenrecht bij naamgebruik, en (c) **security**: parsers van legacy binaire formaten zijn aanvalsoppervlak — MPXJ heeft in juni/juli 2026 nog twee kwetsbaarheden gepatcht (XXE en path traversal) **[HARD]**.

**De aanbeveling in één zin:** een open-source, IFC-gebaseerde planner moet **IFC 4.3 als native formaat, MSPDI en P6 XML (PMXML) als volwaardig lees/schrijf-paar, en CSV + ICS als lichte in-/uitgang** zelf implementeren, en **XER lezen én schrijven zelf bouwen** (het is platte tekst, dat kan), terwijl **MPP uitsluitend via een optionele externe MPXJ-converter** wordt ontsloten — nooit als kernafhankelijkheid.

---

## 2. Het formatenlandschap in één overzicht

| Formaat | Eigenaar | Type | Publiek gespecificeerd? | Zelf te implementeren in TS? | Marktnoodzaak |
|---|---|---|---|---|---|
| **XER** | Oracle (Primavera) | Platte tekst, tab-gescheiden, tabeldump | **Nee** — de facto standaard zonder spec | **Ja** (redelijk zwaar; semantiek is het probleem, niet de syntaxis) | **Kritiek** — contractueel geëist |
| **P6 XML / PMXML** | Oracle (Primavera) | XML met XSD | Ja (schema meegeleverd bij P6) | **Ja** | Hoog — de "nette" P6-route |
| **MPP** | Microsoft | Binair, OLE-compound-document | **Nee** | **Nee** (realistisch) | Hoog qua wens, laag qua haalbaarheid |
| **MSPDI (MS Project XML)** | Microsoft | XML met XSD | Ja (`mspdi_pj12.xsd`), documentatie bevroren | **Ja** | **Kritiek** — de enige begaanbare MS-route |
| **MPX** | Microsoft | Platte tekst, record-gebaseerd | Ja (historisch) | Ja (triviaal) | **Laag** — dood na Project 2010 |
| **SDEF** | US Army Corps of Engineers | Vaste-kolom tekst | Ja (ER 1-1-11, App. A) | **Ja** (triviaal) | Nichemarkt, maar keiharde eis waar hij geldt |
| **IFC 4.3 (SPF/XML)** | buildingSMART / ISO | STEP-Physical-File of ifcXML | **Ja, ISO 16739-1:2024** | **Ja** | Laag in de huidige praktijk, hoog als positionering |
| **BCF** | buildingSMART | ZIP + XML (of REST-API) | Ja, v3.0 (18-06-**2021** — gecorrigeerd, zie Verificatie V11) | Ja | Aangrenzend — issues, geen planning |
| **bSDD** | buildingSMART | REST-API + RDF | Ja, MIT-repo | Ja | Aangrenzend — classificatie |
| **ICS (iCalendar)** | IETF | Tekst, RFC 5545 | **Ja, RFC 5545 (sept. 2009)** | **Ja** (triviaal) | Laag, maar zeer goedkope gebruikerswaarde |
| **CSV / XLSX** | — | Tabel | Ja | Ja | Universeel, semantiekloos |

---

## 3. XER — het ongedocumenteerde formaat dat de markt regeert

### 3.1 Wat het is

XER is Primavera's eigen uitwisselformaat: een platte-tekstbestand waarin de relevante databasetabellen achter elkaar worden gedumpt, met tab-gescheiden velden en `%T`/`%F`/`%R`-markers voor tabelnaam, veldnamen en rijen. Oracle publiceert **geen** formele specificatie. Alle bestaande implementaties zijn reverse-engineered uit voorbeeldbestanden.

Wat dit concreet betekent voor een implementator, blijkt uit wat MPXJ heeft moeten uitzoeken en documenteren **[HARD]** (bron: [mpxj.org/howto-read-xer](https://www.mpxj.org/howto-read-xer/)):

- **Tekencodering is niet in het bestand vastgelegd.** MPXJ gaat standaard uit van Windows-1252 en detecteert een BOM als die er is; voor bijvoorbeeld Chinese bestanden moet de charset handmatig op GB2312 worden gezet.
- **Eén XER kan meerdere projecten bevatten.** MPXJ leest standaard het eerste project dat als "exported" is gemarkeerd, of anders het eerste project. Er is een `listProjects()`-API en een `readAll()`.
- **Onleesbare records worden standaard genegeerd** — expliciet *"matching P6 behavior"*. Dat is een veelzeggende ontwerpbeslissing: het formaat is zo losjes dat zelfs P6 zelf brokstukken overslaat.
- **Relaties tussen projecten worden standaard genegeerd** (`setLinkCrossProjectRelations(true)` om ze wél te volgen).
- **WBS-gedrag is dubbelzinnig genoeg dat MPXJ het gedrag ooit heeft moeten omkeren** om Primavera te volgen (kindactiviteiten erven de WBS-waarde van de ouder).

De Python-bibliotheek `xerparser` (GPLv3, v0.13.9, 19-11-2025) is expliciet *"tested on .xer files from versions 15.2 through 19.12"* **[HARD]** ([pypi.org/project/xerparser](https://pypi.org/project/xerparser/)). Dat is een versie-venster van ongeveer vijf jaar — een sterk signaal dat het formaat per P6-release schuift.

### 3.2 Waarom XER desondanks de standaard is

Twee mechanismen houden XER in het zadel, en geen van beide is technisch:

**(a) Contractuele voorschrijving.** Het Amerikaanse Unified Facilities Guide Specification **UFGS 01 32 01.00 10 "Project Schedule"** (USACE/NAVFAC/AFCEC, augustus 2023, Change 1 – 08/24; referenties in overeenstemming met UMRL januari 2026) **[HARD]** ([wbdg.org](https://www.wbdg.org/FFC/DOD/UFGS/UFGS%2001%2032%2001.00%2010.pdf)) bevat:

> **§2.1.1 Government Default Software** — *"The Government uses Primavera P6. Ensure exported schedule files are compatible with the version of P6 used by the Government."*

> **§2.1.2.1 Primavera** — *"If Primavera P6 is selected for use, provide the 'xer' export file in a version of P6 importable by the Government system. Verify at the SEKO meeting which version of P6 is in use by the Government. Export the schedule in a version of P6 no newer than that used by the Government."*

> **§3.5.1 Electronic Scheduling Data** — *"Provide electronic scheduling data containing the current project schedule and all previously submitted schedules in the format of the scheduling software (e.g. .xer)."*

En de uitwijkbepaling voor wie géén Primavera gebruikt is bewust prohibitief:

> **§2.1.2.2 Other Than Primavera** — *"If the Contractor chooses software other than Primavera P6, that is compliant with this specification, provide for the Government's use two licenses, two computers, and training for two Government employees in the use of the software. These computers will be stand-alone and not connected to Government network. Computers and licenses will be returned at project completion."*

Bovendien schrijft §2.1.2 voor dat *"Scheduling software used by the contractor must be commercially available from the software vendor for purchase with vendor software support agreements available"* — een clausule die **gratis open-source software als hoofdplanningstool letterlijk uitsluit** in dit bestek **[HARD]**. Dit is de scherpste vondst van dit onderzoek en verdient een aparte behandeling (§10.4).

Ter completering: §3.12 legt zelfs de P6-*instellingen* vast (Longest Path als kritiek-pad-definitie, Retained Logic, Physical percent complete, "Fixed Duration & Units", 8.0 uur/dag, activity-ID's ≤ 10 tekens) **[HARD]**. Interoperabiliteit is hier dus niet alleen formaat maar ook *rekenkundig gedrag* — een punt dat vaak wordt onderschat.

**(b) Oracle's eigen cloudproduct schrijft XER.** Oracle Primavera Cloud, het opvolgproduct, exporteert naar XER: *"Oracle Primavera Cloud generates an XER file that is designed to be imported into Primavera P6"* **[HARD]** ([oracle.com/construction-engineering/primavera-cloud](https://www.oracle.com/construction-engineering/primavera-cloud/)). Zolang Oracle zelf XER als brugformaat gebruikt, blijft het levend.

### 3.3 Kritische kanttekening bij de prijskant

Ik heb **geen** publiek Oracle-prijsblad voor Primavera kunnen vinden. Oracle's eigen prijslijstindex noemt 18 prijslijsten (Technology, E-Business Suite, Fusion Cloud, Java SE, enz.) — **Construction and Engineering / Primavera staat er niet bij** **[HARD]** ([oracle.com/us/corporate/pricing/price-lists](https://www.oracle.com/us/corporate/pricing/price-lists/index.html)). Prijzen voor P6 circuleren wel via wederverkopers, maar die zijn niet als primaire bron te kwalificeren. **Ik neem daarom geen P6-prijs op in dit rapport.**

Wat ik wél hard heb, is de prijs van de *afgeleide* markt: **ScheduleReader** — een viewer die niets anders doet dan XER en P6 XML openen — vraagt **$344/jaar (Standard)** en **$440/jaar (PRO)**, inclusief één jaar SMA **[HARD]** ([schedulereader.com/pricing](https://www.schedulereader.com/pricing)). Er bestaat dus een betalende markt van honderden dollars per gebruiker per jaar voor niets meer dan *leestoegang tot een ongedocumenteerd formaat*. Dat is het scherpste economische bewijs voor de waarde van formaatondersteuning dat ik in dit onderzoek heb gevonden.

### 3.4 Implementatie-oordeel

**[SCHATTING]** XER zelf implementeren in TypeScript is haalbaar. Redenering: het is platte tekst met een expliciete tabelstructuur; er bestaan twee onafhankelijke Python-implementaties van bescheiden omvang (`xerparser`, `PyP6XER` — de laatste met **nul externe afhankelijkheden**, alleen de standaardbibliotheek **[HARD]**, [pypi.org/project/PyP6XER](https://pypi.org/project/PyP6XER/)); en MPXJ schrijft XER ook (zij het met de restrictie dat meerdere projecten dezelfde `ProjectContext` moeten delen **[HARD]**). De moeilijkheid zit niet in het parsen maar in de **semantische mapping**: kalenders, kalenderuitzonderingen, duration types, percent-complete-types, activity codes, resource curves, en de P6-specifieke rekenregels. Ik schat de inspanning voor een *bruikbare* (niet volledige) XER-lezer op **2–4 mensweken**, en voor een schrijver die P6 zonder klachten importeert op **nogmaals 3–6 mensweken**, met daarbovenop een doorlopende onderhoudslast per P6-release. Deze schatting is gebaseerd op de omvang van de bestaande Python-implementaties en op de hoeveelheid randgevallen die MPXJ documenteert; het is geen gemeten cijfer.

---

## 4. P6 XML (PMXML) — de nette Primavera-route

PMXML is Oracle's XML-uitwisselformaat voor P6, met een meegeleverd XSD. Het is rijker en beter gedefinieerd dan XER, en het is **de route die serieuze tools kiezen als ze de keuze hebben**.

MPXJ leest én schrijft PMXML **[HARD]**. Documenteerde caveats bij het schrijven **[HARD]** ([mpxj.org/howto-write-pmxml](https://www.mpxj.org/howto-write-pmxml/)):
- Meerdere projecten in één bestand kan, mits ze dezelfde `ProjectContext` delen.
- **Baselines worden standaard níet weggeschreven**; expliciet inschakelen via `setWriteBaselines(true)`.

Het feit dat baselines standaard uit staan is veelzeggend: baseline-uitwisseling is in de hele markt het zwakste punt van elk formaat. Wie voortgangsbewaking serieus neemt, loopt daar als eerste tegenaan.

**Belangrijk voor een nieuwkomer:** IfcOpenShell's `ifc4d` ondersteunt **P6 XML in twee richtingen** (`P6 XML → IFC` én `IFC → P6 XML`) maar **XER slechts in één richting** (`XER → IFC`) **[HARD]** ([github.com/IfcOpenShell/IfcOpenShell — src/ifc4d/README.md](https://github.com/IfcOpenShell/IfcOpenShell/tree/v0.8.0/src/ifc4d)). Dat is precies de asymmetrie die je verwacht: XML kun je betrouwbaar schrijven, XER niet zonder risico.

**Oordeel:** PMXML is het formaat waarmee een open-source planner *nu* de Primavera-wereld binnenkomt. XER komt daarna, als de contractuele druk het afdwingt.

---

## 5. MPP — het gesloten binaire formaat

### 5.1 Status

`.mpp` is een binair OLE-compound-document. Microsoft publiceert er geen open specificatie voor. **[ZACHT, met kanttekening]** Ik heb de Microsoft Open Specifications-index voor Office-bestandsformaten niet kunnen bereiken binnen deze sessie (HTTP 404 op de aangesproken URL's), dus ik kan het *negatieve* bewijs — "er is geen `[MS-*]`-document voor .mpp" — niet met één autoritatieve lijst-URL onderbouwen. Wat ik wél hard heb, is het bewijs uit de praktijk: de best onderhouden reverse-engineeringinspanning ter wereld zegt zelf dat ze het formaat niet begrijpt.

### 5.2 Wat MPXJ zegt — het beslissende citaat

MPXJ's FAQ, over waarom MPP-schrijven niet bestaat **[HARD]** ([mpxj.org/faq](https://www.mpxj.org/faq/)):

> *"the knowledge we have of the file structure is still relatively incomplete, despite the amount of data we are able to correctly extract"*

en over de haalbaarheid:

> *"it is technically feasible to generate an MPP file"* maar *"it is likely to take a considerable amount of development effort"* en men zou niet alle attributen kunnen ondersteunen omdat *"we don't understand the format well enough"*

Het advies dat MPXJ zelf geeft is glashelder: gebruikers *"are therefore probably better off using MSPDI which does support the full range of data items present in an MPP file"*.

Gedocumenteerde betrouwbaarheidsproblemen bij het *lezen* van MPP **[HARD]**:
- Flag-veldwaarden in MS Project 98-bestanden (MPP8) zijn soms verkeerd.
- Nieuwere Project-versies bevatten verborgen placeholder-taak- en resource-records voor samenvattingsinformatie; die *"may not be reliable"* en moeten eruit gefilterd worden.

### 5.3 Wat dit betekent

**[SCHATTING]** Een zelfstandige MPP-implementatie in TypeScript is geen realistisch project. Redenering: MPXJ heeft sinds circa 2000 aan MPP gewerkt, in Java, met een gestage stroom bijdragen, en durft na een kwart eeuw nog steeds niet te schrijven. Een nieuwkomer die vanaf nul begint met een fractie van die mankracht en zonder de opgebouwde testbestandenverzameling, heeft geen realistisch pad naar zelfs maar betrouwbaar *lezen*. De enige verstandige route is: **MPXJ als externe converter**, buiten de kern.

**Nagekomen bij verificatie (V12).** De vorm van die externe converter is sinds mei 2026 goedkoper geworden dan dit rapport aannam: `@byteink/mppjs` (npm, MIT-wrapper, v0.1.5, 08-05-2026) levert MPXJ als **GraalVM-AOT-gecompileerde native binary** per platform en zet `.mpp` om naar MSPDI **zonder JVM** **[HARD]** ([registry.npmjs.org/@byteink/mppjs](https://registry.npmjs.org/@byteink/mppjs)). Dat past exact op het Tauri-sidecar-model. De conclusie "MPP niet in de kern" verandert niet; de conclusie "dus moet de gebruiker een JVM installeren" wél. Blijvende voorbehouden: het pakket is jong en onbeproefd, en een statisch gelinkte AOT-image van LGPL-code roept de LGPL-relinkingvraag op die een losse JAR juist vermeed (§13.3).

De prijs van het formaat aan de bronzijde is overigens gewoon publiek **[HARD]** ([microsoft.com — Project vergelijken](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software)):

| Product | Prijs |
|---|---|
| Project Standard 2024 | **$679,99** eenmalig, één gebruiker / één pc |
| Project Professional 2024 | **$1.129,99** eenmalig, één gebruiker / één pc |
| Project Server Subscription Edition | niet publiek; via partner |

Dat is de vervangingswaarde waar een gratis alternatief tegenaan concurreert — mits het het formaat kan lezen.

---

## 6. MSPDI (MS Project XML) — de begaanbare Microsoft-route

### 6.1 Status van de specificatie

MSPDI is Microsoft's XML Data Interchange-formaat, ondersteund sinds Project 2002 **[HARD]** (bron: [mpxj.org/howto-write-mspdi](https://www.mpxj.org/howto-write-mspdi/)). Het schema is publiek als `mspdi_pj12.xsd`.

De Microsoft Learn-pagina die het schema beschrijft draagt de volgende metadata **[HARD]** ([learn.microsoft.com — Project XML Data Interchange Schema Reference](https://learn.microsoft.com/en-us/office-project/xml-data-interchange/project-xml-data-interchange-schema-reference)):

- `ms.date: 2018-03-14`
- `updated_at: 2021-09-16`
- `monikers: project-client-2007, 2010, 2013, 2016, project-client-odc` — **de nieuwste erkende clientversie is Project 2016**
- Inhoudelijk: *"This section provides information about the Microsoft Office Project 2007 XML Data Interchange Schema (mspdi_pj12.xsd)"*

**Interpretatie [SCHATTING]:** Microsoft onderhoudt de MSPDI-documentatie feitelijk niet meer. De inhoud beschrijft Project 2007, de laatste inhoudelijke wijziging is uit 2018, en Project 2019/2021/2024 komen in de monikers niet voor. Dat is *geen* bewijs dat MSPDI-ondersteuning in het product is vervallen — MPXJ schrijft standaard nog steeds naar `SaveVersion = Project2016` **[HARD]** — maar het betekent wel dat je bij nieuwe velden op je eigen waarneming aangewezen bent, niet op documentatie.

### 6.2 De valkuil die iedereen raakt

MPXJ documenteert een subtiel maar dodelijk detail **[HARD]**: Microsoft Project schrijft **negatieve duraties in een niet-standaard notatie**, afwijkend van de XSD-duration-vorm. MPXJ schrijft daarom standaard in de vorm die Project begrijpt, met een vlag `MicrosoftProjectCompatibleOutput` (default `true`) om terug te schakelen naar strikt XSD-conforme uitvoer voor niet-Project-consumenten. Verder beïnvloedt `SaveVersion` (default `Project2016`) de opmaak van **kalenderuitzonderingen**, die vanaf Project 2003 veranderd is.

**Praktische les voor elke implementator:** een MSPDI-schrijver die zich strikt aan het XSD houdt, produceert bestanden die Microsoft Project verkeerd of niet leest. Je moet het *gedrag* van Project nabootsen, niet het schema volgen. Dat is de reden dat "we ondersteunen MSPDI" en "Project opent onze bestanden zonder klagen" twee verschillende beweringen zijn.

### 6.3 Oordeel

MSPDI is **het enige Microsoft-formaat dat een open-source planner volledig zelf kan bezitten**. Het is XML, het schema is publiek, en de valkuilen zijn gedocumenteerd (door MPXJ, niet door Microsoft). Het is daarmee een verplicht onderdeel van elke minimale formaatstrategie.

---

## 7. MPX — verouderd, en dat is een harde grens

MPX is Microsoft's oude tekstgebaseerde uitwisselformaat (record-georiënteerd, komma-gescheiden, met genummerde recordtypes). MPXJ leest én schrijft het **[HARD]**, maar met de beslissende kanttekening in de formatentabel:

> MPX *"can be read by versions of Microsoft Project up to and including Microsoft Project 2010"* **[HARD]** ([mpxj.org/supported-formats](https://www.mpxj.org/supported-formats/))

Een tweede probleem dat MPXJ noemt **[HARD]**: gelokaliseerde versies van MS Project veroorzaken compatibiliteitsproblemen met MPX-bestanden — het formaat bevat vertaalde veldnamen en scheidingstekens, wat het per-taal-incompatibel maakt.

**Oordeel.** MPX heeft nog precies één functie: het kunnen *inlezen* van archiefmateriaal van vóór 2010, en het bedienen van niche-tools die alleen MPX aankunnen. Het heeft **nul waarde als afleverformaat** en het is een fout om er ontwikkeltijd in te steken vóórdat MSPDI en PMXML af zijn. Als je het toch doet: MPX-lezen is triviaal (enkele dagen), MPX-schrijven met correcte lokalisatie is dat niet.

---

## 8. SDEF — het formaat dat niemand kent en dat toch een aanbestedingseis is

Dit is een vondst die in de meeste marktoverzichten ontbreekt. **SDEF** (Standard Data Exchange Format) is een vaste-kolom tekstformaat van de US Army Corps of Engineers, gedefinieerd in ER 1-1-11, Appendix A.

Uit UFGS 01 32 01.00 10 **[HARD]**:

> Redactionele NOTE bij PART 1: *"If it is desired to monitor a Contractor's schedule by use of an in-house program, this will require use of the Standard Data Exchange Format (SDEF). Use of proprietary systems will not be specified. See ER 1-1-11, Appendix A."*

> §2.1.2: *"The software routine used to create the required sdef file must be created and supported by the software manufacturer."*

Twee dingen zijn hier interessant:

1. **De overheid erkent expliciet dat proprietary formaten niet voorgeschreven mogen worden** als zij zelf een monitoringtool draait — en lost dat op met een open, gepubliceerd formaat. Dat is precies het argument dat een open-source planner nodig heeft.
2. **Maar** de eis dat de SDEF-routine *"created and supported by the software manufacturer"* moet zijn, sluit een community-plug-in of externe converter uit. Het moet in het product zitten, met leverancierssupport.

MPXJ leest **én schrijft** SDEF **[HARD]** — een van slechts zes schrijfformaten. Dat MPXJ dit heeft gebouwd, is op zichzelf een indicatie van de reële vraag.

**[SCHATTING]** SDEF is een vaste-kolom tekstformaat; implementeren in TypeScript kost naar mijn inschatting **enkele dagen tot een week**, mits de ER 1-1-11 Appendix A-specificatie beschikbaar is. Het is qua kosten/baten waarschijnlijk het aantrekkelijkste "exotische" formaat van allemaal voor wie de Amerikaanse publieke markt wil raken — maar alleen relevant in die markt. Ik heb de ER 1-1-11-tekst zelf niet kunnen ophalen in deze sessie; de vermelding komt uit het UFGS-bestek.

---

## 9. IFC 4.3 — het datamodel dat alles kan en niets doet

### 9.1 Wat IFC 4.3 aan planning bevat — dit is compleet

Dit is het meest onderschatte feit in de hele markt: **IFC 4.3 heeft een volwaardig CPM-datamodel**, niet een afgeleide of vereenvoudigde weergave. De relevante entiteiten, alle geverifieerd in de officiële specificatie **[HARD]** (buildingSMART IFC 4.3 documentatie, versie *"IFC 4.3.2.20260630 (IFC4X3_ADD2)"*, [ifc43-docs.standards.buildingsmart.org](https://ifc43-docs.standards.buildingsmart.org/)):

**`IfcWorkControl`** — abstracte supertype. Letterlijke EXPRESS-tekst:
> `ABSTRACT SUPERTYPE OF (ONEOF (IfcWorkPlan, IfcWorkSchedule))`

*(Noot voor de zorgvuldige lezer: `IfcWorkSchedule` is dus een subtype van `IfcWorkControl`, niet van `IfcWorkPlan`. Ik vermeld dit expliciet omdat één van de geautomatiseerde samenvattingen die ik tijdens dit onderzoek kreeg dit verkeerd stelde; de EXPRESS-tekst hierboven is de doorslaggevende bron.)*

**`IfcWorkSchedule`** ([lexical/IfcWorkSchedule](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkSchedule.htm)):
> *"An IfcWorkSchedule represents a task schedule of a work plan, which in turn can contain a set of schedules for different purposes."*

Geërfde attributen: `CreationDate`, `StartTime`, `FinishTime`, `Duration`, `TotalFloat`, `Purpose`, `PredefinedType`. Cruciale modelleerregel uit de spec: *"A work calendar shall be assigned to the summary task and not the work schedule."* Root-taken worden op `IfcProject` gedeclareerd via `IfcRelDeclares`; de koppeling schedule→taak loopt via `IfcRelAssignsToControl`, waarbij alleen de summary task direct toegewezen hoeft te worden.

**`IfcTask`** ([lexical/IfcTask](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcTask.htm)):
> *"An IfcTask is an identifiable unit of work to be carried out in a construction project."*

Attributen: `Status`, `WorkMethod`, `IsMilestone` (boolean), `Priority` (integer), `TaskTime`, `PredefinedType`.

**`IfcTaskTime`** — hier zit het CPM-hart ([lexical/IfcTaskTime](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcTaskTime.htm)). Volledige attribuutlijst:

| Groep | Attributen |
|---|---|
| Geërfd (`IfcSchedulingTime`) | `Name`, `DataOrigin`, `UserDefinedDataOrigin` |
| Planning | `DurationType`, `ScheduleDuration`, `ScheduleStart`, `ScheduleFinish` |
| **CPM-resultaat** | `EarlyStart`, `EarlyFinish`, `LateStart`, `LateFinish`, `FreeFloat`, `TotalFloat`, `IsCritical` |
| Voortgang | `StatusTime`, `ActualDuration`, `ActualStart`, `ActualFinish`, `RemainingTime`, `Completion` |

De spec merkt over `EarlyStart` op: *"The earliest date on which a task can be started. It is a calculated value."* Dat is een letterlijke CPM-definitie in een ISO-norm.

**`IfcRelSequence`** ([lexical/IfcRelSequence](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcRelSequence.htm)): één-op-één relatie `RelatingProcess` → `RelatedProcess`, met `TimeLag`, `SequenceType` (`IfcSequenceEnum`: `START_START`, `START_FINISH`, `FINISH_START`, `FINISH_FINISH`, `USERDEFINED`) en `UserDefinedSequenceType`. Formele regels: `AvoidInconsistentSequence` (*"The RelatingProcess shall not point to the same instance as the RelatedProcess"*) en `CorrectSequenceType`.

Belangrijk waarschuwingscitaat uit de spec zelf:
> *"Care should be used when assigning a time lag to a sequence depending on the setting of the sequence type since there is no checking that the time lag value is in keeping with the sequence type set."*

**`IfcWorkCalendar`** ([lexical/IfcWorkCalendar](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkCalendar.htm)):
> *"An IfcWorkCalendar defines working and non-working time periods for tasks and resources."*

Met `WorkingTimes` en `ExceptionTimes` (beide sets van `IfcWorkTime`) en recurrentiepatronen. Het spec-voorbeeld: *"a simple work calendar with working times Monday to Thursday 8:00 to 12:00 and 13:00 to 17:00, Friday 8:00 to 14:00"* met uitzonderingen zoals *"every 1st Monday in a month the work starts one hour later"*. Uitzonderingen hebben voorrang: ze *vervangen* werktijden uit een basiskalender.

**Conclusie van deze paragraaf:** technisch gezien is er geen enkel planningsconcept in XER of MSPDI dat IFC 4.3 niet kan dragen. Taken, hiërarchie, alle vier de relatietypes, lag, kalenders met uitzonderingen en recurrentie, mijlpalen, prioriteit, kritiek pad, floats, baselines-achtige voortgang. Het model is compleet.

### 9.2 Normstatus

**[HARD — na verificatie opgewaardeerd van ZACHT]** IFC is genormeerd als **ISO 16739-1:2024**, *"Industry Foundation Classes (IFC) for data sharing in the construction and facility management industries — Part 1: Data schema"*, in Europa overgenomen als **EN ISO 16739-1:2024**, **geldig vanaf 15-04-2024**, ICS 25.040.40 **[HARD]** ([EVS — nationale normalisatie-instelling, evs.ee/en/evs-en-iso-16739-1-2024](https://www.evs.ee/en/evs-en-iso-16739-1-2024)). `iso.org` en `webstore.ansi.org` bleven onbereikbaar (Cloudflare-interstitial, HTTP 403); de catalogusvermelding van een nationale normalisatie-instelling is echter een primaire bron, geen Wikipedia-afgeleide. De prijs neem ik nog steeds niet op. De versieaanduiding op de officiële documentatiesite is wél hard: *"IFC 4.3.2.20260630 (IFC4X3_ADD2) under development"* **[HARD]** — de doorontwikkeling van de documentatie loopt door, waarbij de bSI-repo stelt dat het gaat om *"a further elaboration of the ISO release without changes to the schema and specification"*.

Licentie van de formele releases: **CC BY-ND 4.0** **[HARD]** ([github.com/buildingSMART/IFC4.3.x-development](https://github.com/buildingSMART/IFC4.3.x-development)) — *"Formal (static) releases are published under Creative Commons Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)"*. Belangrijk detail: **ND** betekent dat je de *documentatie* niet mag afleiden/wijzigen; het schema implementeren is uiteraard vrij (dat is het hele punt van een norm), maar het herpubliceren van bewerkte spec-teksten is dat niet.

### 9.3 Waarom IFC-planning in de praktijk nauwelijks gebruikt wordt

Dit is de kern van het thema. Ik zie zes oorzaken. Twee ervan zijn hard aantoonbaar, vier zijn beredeneerde interpretaties die ik als zodanig markeer.

**(1) De enige serieuze open-source IFC-planningsimplementatie is zelf een importeur van P6/MSP. [HARD]**
IfcOpenShell's `src/ifc4d`-module beschrijft zichzelf als *"a series of utilities for converting to and from various 4D software"* met deze conversies ([README](https://github.com/IfcOpenShell/IfcOpenShell/tree/v0.8.0/src/ifc4d)):

| Richting | Ondersteund |
|---|---|
| Microsoft Project → IFC | ja |
| Oracle Primavera 6 (P6) XML → IFC | ja |
| Oracle Primavera 6 (P6) XER → IFC | ja |
| Asta Powerproject → IFC | ja |
| IFC → Oracle Primavera 6 (P6) XML | ja |
| IFC → Microsoft Project | ja |

Lees dit goed: het bestaansrecht van de IFC-4D-module is het **binnenhalen van planningen die elders zijn gemaakt**. Niemand plant primair in IFC. IFC is de bestemming, niet de bron.

**(2) De API bestaat en is rijk — het gebruik is het probleem, niet de tooling. [HARD]**
`ifcopenshell.api.sequence` biedt **40** functies (gecorrigeerd; een eerdere versie zei 48 — het `__all__` van de module in v0.8.0 telt exact 40 namen, zie Verificatie V10), waaronder `add_work_schedule`, `add_task`, `add_task_time`, `add_work_calendar`, `assign_sequence`, `assign_lag_time`, `assign_recurrence_pattern`, `calculate_task_duration`, `cascade_schedule`, `recalculate_schedule` en `create_baseline` **[HARD]** ([ifcopenshell/api/sequence](https://raw.githubusercontent.com/IfcOpenShell/IfcOpenShell/v0.8.0/src/ifcopenshell-python/ifcopenshell/api/sequence/__init__.py)). Er is dus een complete, gratis, open-source planningsmotor bovenop IFC. Het wordt desondanks niet de industriestandaard.

**(3) Certificering dekt geometrie, niet proces. [SCHATTING]**
Ik heb de buildingSMART-certificeringspagina's niet kunnen bereiken (HTTP 403 op zowel `buildingsmart.org` als `technical.buildingsmart.org`), dus ik kan dit **niet hard onderbouwen**. Mijn redenering: de bekende IFC-certificeringsscopes (Reference View, Design Transfer View) zijn gedefinieerd rond geometrische en eigenschapsuitwisseling; ik ben in dit onderzoek geen certificeringsscope tegengekomen die `IfcWorkSchedule`/`IfcTask` dekt. Als dat klopt — en de lezer moet dit verifiëren — betekent het dat een leverancier die IFC-planning slecht of niet implementeert, daar **geen enkele certificeringsconsequentie** van ondervindt. Dat is een structurele reden voor stilstand: er is geen keurmerk om voor te werken.

**(4) De opdrachtgever vraagt er niet om. [HARD, indirect]**
Het UFGS-bestek dat ik in §3 citeer, is 24 pagina's gedetailleerde planningseisen — en noemt **IFC geen enkele keer**. Het noemt wél XER, Primavera P6, SDEF, RMS, CPM en PDM. Het BIM-model en de planning leven in dat bestek in gescheiden werelden. Zolang bestekken planningen in `.xer` vragen, is IFC-planning een kostenpost zonder opbrengst voor de aannemer.

**(5) De spec laat te veel vrij. [HARD, uit de spec zelf]**
De hierboven geciteerde waarschuwing bij `IfcRelSequence` — *"there is no checking that the time lag value is in keeping with the sequence type set"* — en de modelleerregel dat de kalender aan de *summary task* moet hangen en niet aan de schedule, zijn symptomatisch. Een norm die zegt "let op, dit wordt niet gecontroleerd" verplaatst de interoperabiliteitslast naar de implementator. Twee correcte IFC-implementaties kunnen dezelfde planning verschillend modelleren en toch beide conform zijn. **[SCHATTING]** Dit is naar mijn oordeel de belangrijkste *technische* reden dat IFC-planningsuitwisseling niet betrouwbaar is: er is geen MVD/IDS die de modelleerkeuzes dichttimmert.

**(6) Er is geen rekenkundige conformiteitseis. [SCHATTING]**
XER en MSPDI dragen niet alleen data maar impliciet ook het *rekengedrag* van P6/Project. UFGS §3.12 schrijft zelfs P6-instellingen voor (Longest Path, Retained Logic) **[HARD]**. IFC 4.3 draagt `EarlyStart`/`TotalFloat`/`IsCritical` als *waarden*, maar definieert niet welk algoritme ze produceerde. Twee tools die dezelfde IFC lezen en opnieuw rekenen, komen tot andere antwoorden — en er is geen norm die zegt wie gelijk heeft. Voor contractuele planning (waar het kritieke pad geld waard is) is dat een blokkade.

### 9.4 Wat dat betekent

**[SCHATTING]** IFC-planning is geen mislukte technologie maar een technologie zonder afdwingmechanisme. De drie dingen die het zouden kantelen zijn, in volgorde van waarschijnlijkheid: (a) een IDS-profiel voor planningsuitwisseling dat modelleerkeuzes vastlegt; (b) een certificeringsscope voor 4D; (c) een grote publieke opdrachtgever die IFC-planning in het bestek zet zoals de USACE nu `.xer` in het bestek zet. Geen daarvan is in dit onderzoek als lopend initiatief bevestigd, en ik heb ook geen bewijs gevonden dat ze *niet* lopen — mijn bereik was hier te beperkt.

---

## 10. De aangrenzende openBIM-formaten: BCF, bSDD, IDS

Deze drie dragen geen planning, maar bepalen wel of een IFC-gebaseerde planner geloofwaardig is in een openBIM-keten.

### 10.1 BCF (BIM Collaboration Format)

Issue-uitwisseling: een bevinding, een cameraviewpoint, een verwijzing naar IFC-elementen, een commentaardraad. **Niet** planning.

**[HARD]** Releasehistorie ([github.com/buildingSMART/BCF-XML/releases](https://github.com/buildingSMART/BCF-XML/releases)):

| Versie | Datum |
|---|---|
| **v3.0** | **18 juni 2021** |
| v2.1 | 16 januari 2017 |
| v2.1-draft | 1 augustus 2016 |
| v2.0 | 6 oktober 2014 |

> **Correctie (V11).** Een eerdere versie van dit rapport gaf hier 2024 / 2024 / 2016 / 2015. Dat was fout: de HTML-releasepagina van GitHub toont voor recente items alleen dag en maand, waardoor de jaartallen verkeerd zijn overgenomen. De Atom-feed (`/releases.atom`) geeft de harde `<updated>`-tijdstempels: v3.0 = `2021-06-18T06:33:36Z`, v2.1 = `2017-01-16T10:58:05Z`, v2.1-draft = `2016-08-01T09:51:00Z`, v2.0 = `2014-10-06T12:47:19Z` **[HARD]**. **Materiële consequentie:** BCF 3.0 is geen recente standaard maar vijf jaar oud en sindsdien niet meer opgevolgd in deze repo. Dat versterkt eerder dan verzwakt het argument dat de openBIM-uitwisselingsstandaarden náást IFC in een rustig vaarwater zitten.

Er zijn twee varianten: **BCF-XML** (bestandsgebaseerd, ZIP) en **BCF-API** (REST) — de repo verwijst daarvoor expliciet door naar [github.com/BuildingSMART/BCF-API](https://github.com/BuildingSMART/BCF-API) **[HARD]**.

**Relevantie voor een planner [SCHATTING]:** matig maar reëel. Een planningswijziging die uit een clash of een bevinding voortkomt, is precies een BCF-topic. Een planner die BCF kan *lezen* (om bevindingen aan taken te koppelen) en *schrijven* (om een planningsconflict als issue terug te sturen) heeft een onderscheidend verhaal richting BIM-coördinatoren. De implementatiekosten zijn laag: ZIP + XML.

### 10.2 bSDD (buildingSMART Data Dictionary)

Online dienst voor classificaties, eigenschappen, toegestane waarden, eenheden en vertalingen **[HARD]** ([github.com/buildingSMART/bSDD](https://github.com/buildingSMART/bSDD)). De repo is **MIT-gelicentieerd** en bevat documentatie en voorbeelden, niet de data of de servercode zelf.

**Harde schaalindicatie:** de publieke API rapporteert **405 dictionaries** (`TotalCount: 405`) **[HARD]**, opgehaald op 25-07-2026 via `https://api.bsdd.buildingsmart.org/api/Dictionary/v1?limit=1`. Dat is een concreet, verifieerbaar cijfer waar ik in de vakpers geen equivalent voor heb kunnen vinden.

**Relevantie voor een planner [SCHATTING]:** laag-tot-matig. bSDD is nuttig om taaksoorten en werkmethoden (`IfcTask.WorkMethod`, `PredefinedType`) tegen een gedeelde classificatie te leggen in plaats van vrije tekst — bijvoorbeeld voor het koppelen van planningsactiviteiten aan de NL-SfB- of Uniclass-structuur van het model. Dat is een aardige differentiator maar geen toegangsvoorwaarde.

### 10.3 IDS (Information Delivery Specification)

**[HARD]** *"Computer interpretable (XML) standard to define Information Delivery Specifications for BIM (mainly used for IFC)"* ([github.com/buildingSMART/IDS](https://github.com/buildingSMART/IDS)). De repo bevat een XSD, een gebruikershandleiding en implementeerdersdocumentatie. Ik heb versie en releasedatum **niet** kunnen vaststellen binnen deze sessie.

**Relevantie [SCHATTING]:** potentieel de belangrijkste van de drie, precies om de reden uit §9.3(5): IDS is het mechanisme waarmee de modelleervrijheid in IFC-planning dichtgetimmerd zou kunnen worden. Ik heb geen bewijs gevonden van een bestaand IDS-profiel voor planningsdata. Dat is een gat — en voor een open-source speler mogelijk een kans om het zelf te definiëren.

### 10.4 De verborgen aanbestedingsval voor open source

Terug naar UFGS §2.1.2 **[HARD]**:

> *"Scheduling software used by the contractor must be commercially available from the software vendor for purchase with vendor software support agreements available."*

Dit is een clausule die in veel bestekken in verschillende bewoordingen terugkomt en die **gratis software categorisch uitsluit**, ongeacht kwaliteit. Het is geen technische maar een inkooprisico-eis: de opdrachtgever wil een aanspreekbare partij.

**[SCHATTING]** Voor een open-source planner die de professionele markt op wil, is dit een even grote barrière als het XER-formaat zelf — en de oplossing is dezelfde als die andere open-source projecten kiezen: een **betaald support-/SLA-aanbod naast de gratis software**, zodat de zin "commercially available ... with vendor software support agreements available" waar wordt. Zonder dat is formaatondersteuning niet genoeg.

---

## 11. ICS en CSV — de goedkope randen

### 11.1 ICS / iCalendar

**[HARD]** RFC 5545, *"Internet Calendaring and Scheduling Core Object Specification (iCalendar)"*, september 2009, status **Proposed Standard**, vervangt RFC 2445 ([rfc-editor.org/rfc/rfc5545](https://www.rfc-editor.org/rfc/rfc5545)). Componenten: `VEVENT`, `VTODO`, `VJOURNAL`, `VFREEBUSY`, `VTIMEZONE`, plus `RRULE` voor recurrentie (*"value type is used to identify properties that contain a recurrence rule specification"*).

**Oordeel.** ICS is geen planningsuitwisselformaat en zal het nooit worden: het kent geen afhankelijkheden, geen float, geen WBS, geen resources-met-toewijzingspercentages. Het is een *publicatie*formaat — mijlpalen en deadlines naar Outlook/Google Agenda duwen. GanttProject heeft er niet voor niets een module voor (`biz.ganttproject.impex.ical` **[HARD]**, [github.com/bardsoftware/ganttproject](https://github.com/bardsoftware/ganttproject)).

**[SCHATTING]** Kosten/baten: uitstekend. Een ICS-export van mijlpalen is een kwestie van dagen werk en levert direct zichtbare gebruikerswaarde op ("mijn deadlines staan in mijn agenda"). Het is het typische kenmerk dat in reviews genoemd wordt terwijl het technisch niets voorstelt.

### 11.2 CSV / XLSX

Universeel, en volledig semantiekloos: geen afspraak over kolomnamen, datumnotatie, duur-eenheid of relatiecodering. Elke tool definieert zijn eigen dialect. CSV is daarmee een *noodzakelijke* maar nooit *voldoende* interoperabiliteitsroute — bruikbaar voor bulk-invoer van taken en voor rapportage-uitvoer, onbruikbaar voor round-trip.

**[SCHATTING]** Waarde zit in twee specifieke toepassingen: (a) importeren van planningen die als Excel-lijst bij een aannemer vandaan komen (in de praktijk enorm veel), en (b) exporteren naar analysetools. Beide rechtvaardigen een goede, tolerante CSV-implementatie met kolommapping-UI.

---

## 12. MPXJ en de rest van het open-bibliotheek-ecosysteem

### 12.1 MPXJ — het feitelijke monopolie op conversie

MPXJ is niet één van meerdere opties; het is **de** open-source conversielaag voor planningsformaten. Harde feiten **[HARD]**:

| Eigenschap | Waarde | Bron |
|---|---|---|
| Licentie | **LGPL** (GitHub: LGPL-2.1; PyPI: `LGPL-2.0-or-later`) | [github.com/joniles/mpxj](https://github.com/joniles/mpxj), [pypi.org/project/mpxj](https://pypi.org/project/mpxj/) |
| Laatste versie | **16.5.0**, **3 juli 2026** | [raw CHANGELOG.md](https://raw.githubusercontent.com/joniles/mpxj/master/CHANGELOG.md) |
| GitHub-sterren | 338 | [github.com/joniles/mpxj](https://github.com/joniles/mpxj) |
| Kerntaal | Java (≥ Java 1.8) | [mpxj.org/howto-start-java](https://www.mpxj.org/howto-start-java/) |
| Maven | `net.sf.mpxj:mpxj` | idem |
| Bindings | .NET (via IKVM), Python (via JPype), Ruby (gem), PHP (via PHP/Java Bridge) | [mpxj.org](https://www.mpxj.org/) |
| **JavaScript/WASM** | **geen officiële distributie** — maar er is een derde-partij-route, zie kanttekening | npm-registry |

*Kanttekening bij die laatste rij — **gecorrigeerd na verificatie (V12)**. Het negatieve deel klopt: de npm-registry kent geen pakket `mpxj` en geen `mpxj-wasm` (beide geven `Not found`), en geen van de MPXJ-pagina's noemt een JS/WASM-distributie. Maar de conclusie die het rapport eraan verbond — "MPP is alleen via een JVM bereikbaar" — is **achterhaald**. Op npm staan sinds mei 2026 twee relevante pakketten **[HARD]**:*
- *`@byteink/mppjs` (MIT, v0.1.5, eerste publicatie 2026-05-08): *"Convert Microsoft Project (`.mpp`) files to MSPDI XML from Node, Bun, or Deno. Native binary, **no JVM required at runtime**."* Het levert MPXJ als **GraalVM-AOT-gecompileerde native binary** via platform-sidecars (darwin-arm64, linux-x64, linux-arm64, win32-x64).*
- *`dproject` (MIT, v1.0.6, eerste publicatie 2026-05-02): een **zero-dependency clean-room MSPDI-lezer in TypeScript**, browser + Node.*

*Wat dit betekent voor de architectuurkeuze: een MPP-converter als **Tauri-sidecar-binary** is nu een reële optie in plaats van "JVM meeleveren". Twee waarschuwingen blijven staan. (a) **Rijpheid**: beide pakketten zijn enkele maanden oud, versie 0.1.x resp. 1.0.x, zonder aantoonbare gebruikersbasis — dit is geen vervanging van de MPXJ-JAR maar een te evalueren alternatief. (b) **Licentie**: MPXJ is LGPL-2.1; een GraalVM-native-image linkt statisch, wat precies de "relinking"-verplichting van de LGPL raakt die het rapport in §13.3 juist wilde vermijden. De MIT-licentie van de wrapper zegt niets over de LGPL-verplichtingen van de ingebedde MPXJ-code. Voor OPS blijft de aanbeveling in §16.3(3) dus staan, maar met een extra te onderzoeken route.*

**Formatendekking [HARD]** ([mpxj.org/supported-formats](https://www.mpxj.org/supported-formats/)) — 21 formaatsecties (22 formaten als XER en PMXML apart geteld), 6 schrijven:

| Formaat | Lezen | Schrijven |
|---|:---:|:---:|
| MPX | ✓ | ✓ |
| MPP (Project 98 →, incl. MPT) | ✓ | ✗ |
| MSPDI | ✓ | ✓ |
| MPD (Access) | ✓ | ✗ |
| Planner (GNOME) | ✓ | ✓ |
| **P6 (XER + PMXML)** | ✓ | ✓ |
| P3 | ✓ | ✗ |
| SureTrak | ✓ | ✗ |
| Asta Powerproject (PP v8+, MDB) | ✓ | ✗ |
| Phoenix (PPX v4+) | ✓ | ✗ |
| FastTrack (FTX v10+) | ✓ | ✗ |
| GanttProject (GAN) | ✓ | ✗ |
| TurboProject (PEP) | ✓ | ✗ |
| ConceptDraw (CDPX/CDPZ/CDPTZ) | ✓ | ✗ |
| Synchro (SP v6+) | ✓ | ✗ |
| Gantt Designer (GNT) | ✓ | ✗ |
| **SDEF** | ✓ | ✓ |
| Sage 100 Contractor Schedule Grid | ✓ | ✗ |
| Project Commander (PC v7+) | ✓ | ✗ |
| Deltek Open Plan (BK3) | ✓ | ✗ |
| Edraw Project (EDPX) | ✓ | ✗ |

Plus serverkoppelingen: Microsoft Project Server, Microsoft Planner, Primavera P6 Web Services, Oracle Primavera Cloud.

**Wat deze tabel écht zegt.** Het schrijfvermogen is beperkt tot de vijf formaten die tekst of XML zijn (MPX, MSPDI, PMXML, XER, Planner) plus SDEF. **Elk binair of database-formaat is lezen-alleen.** Dat is geen toeval maar een natuurwet van reverse engineering: je kunt een formaat leren herkennen zonder het te kunnen produceren.

### 12.2 De veiligheidskant — onderbelicht en belangrijk

De twee recentste MPXJ-releases waren **beveiligingsreleases** **[HARD]** ([CHANGELOG](https://raw.githubusercontent.com/joniles/mpxj/master/CHANGELOG.md)):

- **16.5.0 (3 juli 2026)**: *"Fix a vulnerability where reading malicious Primavera P3 PRX files or SureTrak STX files could result in files being written to arbitrary locations"* — een klassieke zip-slip/path-traversal.
- **16.4.1 (22 juni 2026)**: *"Fix XXE vulnerability in MerlinReader"* — XML External Entity.

**[SCHATTING]** Dit is een structureel punt dat in formaatdiscussies vrijwel altijd ontbreekt: **elk extra bestandsformaat dat je ondersteunt, is aanvalsoppervlak**. Legacy binaire formaten en archiefformaten (ZIP-gebaseerd) zijn de gevaarlijkste, XML-formaten zijn gevaarlijk zolang je entity-expansie niet uitzet, en platte tekst is het veiligst. Voor een applicatie die bestanden van derden opent — en dat is elke planner — hoort dit in de formaatafweging thuis. Het pleit voor: XML en tekst zelf implementeren met strikte parsers, binaire formaten uit het hoofdproces houden (los proces, sandbox, of helemaal niet).

### 12.3 De rest van het ecosysteem

| Project | Licentie | Versie / datum | Wat het doet | Bron |
|---|---|---|---|---|
| **xerparser** (Python) | GPLv3 | 0.13.9 — 19-11-2025 | XER → Python-objecten; getest op P6 15.2–19.12 | [PyPI](https://pypi.org/project/xerparser/) |
| **PyP6XER** (Python) | LGPL-2.1 | 1.16.0 — 09-07-2025 | XER lezen **en schrijven**; CPM/float-analyse; **nul externe afhankelijkheden**, Python ≥3.8 | [PyPI](https://pypi.org/project/PyP6XER/) |
| **IfcOpenShell `ifc4d`** | GPL/LGPL (COPYING + COPYING.LESSER) | v0.8.0 | MSP/P6-XML/XER/Asta → IFC; IFC → P6-XML/MSP | [GitHub](https://github.com/IfcOpenShell/IfcOpenShell/tree/v0.8.0/src/ifc4d) |
| **IfcOpenShell `api.sequence`** | LGPL | v0.8.0 | **40** functies: taken, kalenders, sequenties, lag, recurrentie, `recalculate_schedule`, `create_baseline` | [GitHub](https://raw.githubusercontent.com/IfcOpenShell/IfcOpenShell/v0.8.0/src/ifcopenshell-python/ifcopenshell/api/sequence/__init__.py) |
| **ProjectLibre** | CPAL-1.0 | 1.9.8 — 30-04-2025 | MS-Project-alternatief; **7,8 mln+ downloads** in 193 landen, 19.762/week (*momentopname van een live SourceForge-teller, geen stabiel cijfer*) | [SourceForge](https://sourceforge.net/projects/projectlibre/) |
| **GanttProject** | GPLv3 | 1,1k sterren; 6.077 commits op master | Gantt/PERT, MS-Project-interop, iCalendar-module | [GitHub](https://github.com/bardsoftware/ganttproject) |

**Twee observaties bij deze tabel:**

1. **De licenties zijn een probleem voor iedereen behalve LGPL-gebruikers.** `xerparser` is **GPLv3** — dat is besmettelijk voor de hele applicatie. `PyP6XER` is LGPL-2.1, dus veiliger. ProjectLibre is **CPAL-1.0**, een licentie met een *attributieverplichting* (je moet het logo/de vermelding in de UI tonen) die veel bedrijven afschrikt. MPXJ's LGPL is de meest bruikbare, mits je dynamisch koppelt.
2. **ProjectLibre's cijfers zijn het interessantste marktsignaal in de tabel.** 7,8 miljoen downloads en bijna 20.000 per week **[HARD]** tonen dat er een enorme latente vraag is naar een gratis MS-Project-alternatief. ProjectLibre's hele propositie is *"#1 alternative to Microsoft Project"* — dus formaat-compatibiliteit — en het gebruikt daarvoor een MPP-lezer. Dat er zoveel vraag naar is, en dat de laatste release van april 2025 dateert, suggereert **[SCHATTING]** dat dit een onderbediende markt is.

---

## 13. Juridische en technische risico's van XER/MPP-ondersteuning

### 13.1 Auteursrecht: het formaat zelf

**Formaten als zodanig zijn geen auteursrechtelijk werk.** Een bestandsformaat is een idee/methode, geen expressie. Wat wél beschermd is: de broncode van de originele implementatie, en (in sommige jurisdicties, betwist) de structuur van een API.

**EU — Richtlijn 2009/24/EG, artikel 6 (Decompilatie) [HARD]** ([legislation.gov.uk](https://www.legislation.gov.uk/eudr/2009/24/article/6)):

> **Art. 6(1)**: *"The authorisation of the rightholder shall not be required where reproduction of the code and translation of its form within the meaning of points (a) and (b) of Article 4(1) are indispensable to obtain the information necessary to achieve the interoperability of an independently created computer program with other programs, provided that the following conditions are met:"* — met drie voorwaarden: (a) de handelingen worden verricht door een licentiehouder of daartoe gerechtigde; (b) de interoperabiliteitsinformatie *was niet eerder beschikbaar*; (c) de handelingen blijven beperkt tot de noodzakelijke onderdelen.

> **Art. 6(2)**: de verkregen informatie mag niet gebruikt worden voor andere doelen dan interoperabiliteit, niet gedeeld worden behalve waar nodig voor interoperabiliteit, en niet *"be used for the development, production or marketing of a computer program substantially similar in its expression, or for any other act which infringes copyright."*

> **Art. 6(3)**: de bepaling mag niet zo worden uitgelegd dat toepassing *"unreasonably prejudices the rightholder's legitimate interests or conflicts with a normal exploitation of the computer program."*

**Interpretatie [SCHATTING]:** voor XER en MSPDI is decompilatie helemaal niet nodig — XER is tekst en MSPDI heeft een publiek XSD. Zwarte-doos-analyse van voorbeeldbestanden valt sowieso buiten artikel 6 (het is geen reproductie van code). Voor MPP zou echte decompilatie van Project.exe nodig kunnen zijn, en dán is artikel 6 relevant — met als lastigste voorwaarde 6(1)(a): de decompileur moet zelf een licentiehouder zijn. Voor een open-source project met verspreide bijdragers is dat een governance-vraagstuk: je moet kunnen aantonen dat wie de analyse deed, een geldige Project-licentie had.

### 13.2 Het echte risico zit elders

**[SCHATTING]** Naar mijn oordeel zijn dit, in volgorde van reëel risico, de vier zaken waar een open-source planner tegenaan loopt:

| # | Risico | Ernst | Mitigatie |
|---|---|---|---|
| 1 | **Security** — parsers van vreemde bestanden als aanvalsoppervlak | **Hoog en concreet** (zie MPXJ 16.4.1/16.5.0) | Strikte parsers; XXE uit; geen pad-schrijven bij archiefextractie; binaire formaten buiten het hoofdproces |
| 2 | **EULA-clausules** van de bronapplicatie (verbod op reverse engineering) | Middel | Analyseer alleen *bestanden*, nooit de applicatie; laat bijdragers verklaren geen EULA te schenden; documenteer de herkomst van formaatkennis |
| 3 | **Merkenrecht** bij naamgebruik | Middel-laag | Schrijf "Primavera P6-compatibel bestand (.xer)", niet "Primavera-export"; gebruik geen leverancierslogo's; neem een merkenverklaring op |
| 4 | **Correctheidsaansprakelijkheid** — een verkeerd geparseerde planning kost geld | Middel, en groeiend met succes | Expliciete verliesmatrix per formaat; waarschuwen bij lossy conversie; disclaimer; regressietests op echte bestanden |

**Risico 4 verdient nadruk.** Een planning is een contractueel document. Als jouw XER-lezer een `FINISH_START`-relatie met lag verkeerd interpreteert en het kritieke pad daardoor anders uitkomt, is dat geen cosmetische bug. De juiste houding is niet "wij ondersteunen XER" maar "wij ondersteunen deze deelverzameling van XER, en hier is wat er verloren gaat". MPXJ doet dit voorbeeldig door caveats per formaat te documenteren; dat is een norm om te kopiëren.

### 13.3 LGPL en MPXJ — de licentietechnische kant

**[SCHATTING]** MPXJ is LGPL. Voor een desktop-app betekent dat: je mag het gebruiken zonder je eigen code onder (L)GPL te brengen, **mits** de gebruiker de MPXJ-component kan vervangen (dynamische koppeling, of in dit geval: een los proces / los JAR-bestand). Een MPXJ-JAR die als **externe converter** wordt aangeroepen is licentietechnisch de schoonste constructie die er is: er is geen enkele twijfel over "linking", omdat er geen linking plaatsvindt. Dit is een extra argument bovenop het architectuurargument in §14.

*Dit is geen juridisch advies; het is mijn beredeneerde inschatting op basis van de licentietekst en gangbare praktijk.*

---

## 14. Hoe bestaande open-source tools eraan komen — vier strategieën

Uit het bovenstaande destilleer ik vier waarneembare strategieën, elk met een prijs:

| Strategie | Voorbeeld | Wat je wint | Wat je betaalt |
|---|---|---|---|
| **A. Alles zelf, in de eigen taal** | GanttProject (eigen XML, CSV, ICS) | Geen afhankelijkheden, lichte build, volledige controle | Beperkte formaatdekking; geen MPP |
| **B. Bouw op MPXJ (JVM)** | ProjectLibre (Java-app, MPP-lezen) | Directe MPP-toegang, brede dekking | Gebonden aan de JVM; zware distributie; LGPL-discipline |
| **C. Converteer naar het eigen model, elders** | IfcOpenShell `ifc4d` | Kern blijft schoon; formaatkennis geïsoleerd | Conversie is lossy en eenrichtings; UX is tweetraps |
| **D. Extern proces / sidecar** | *(hybride; door OPS' TODO al voorzien)* — sinds mei 2026 ook als **JVM-loze native binary** (`@byteink/mppjs`, zie V12) | Kern blijft licht; optioneel; licentietechnisch schoon bij een losse JAR | Installatiedrempel; niet beschikbaar in de webbuild; bij een AOT-binary keert de LGPL-relinkingvraag terug |

**[SCHATTING]** Voor een moderne TypeScript-/Tauri-applicatie is **A voor tekst-/XML-formaten + D voor binaire formaten** de enige verdedigbare combinatie. B is uitgesloten (een JVM meeleveren met een Tauri-app die juist om zijn lichtheid gekozen is, is architectonisch tegenstrijdig), en C alleen is te beperkt omdat je dan geen round-trip hebt.

---

## 15. Expliciete onzekerheden

Ik som op wat ik **niet** heb kunnen vaststellen, zodat de lezer weet waar dit rapport dun is:

1. **Marktaandeel P6 vs. MS Project vs. de rest.** Geen enkel cijfer. Ik heb geen analistenrapport kunnen bereiken en weiger te gokken. Dit is de grootste lacune.
2. **Primavera-prijzen.** Oracle publiceert geen prijslijst voor Construction & Engineering **[HARD]**; wederverkoperprijzen heb ik als niet-primair verworpen.
3. ~~**ISO 16739-1:2024 publicatiedatum, editie en prijs.**~~ **Opgelost bij verificatie (V8):** EN ISO 16739-1:2024 geldig vanaf 15-04-2024, bevestigd via de EVS-catalogus. Alleen de prijs blijft onbekend; iso.org en de ANSI-webstore blijven onbereikbaar.
4. **De buildingSMART-certificeringsscopes.** Mijn stelling dat geen certificering 4D/planning dekt, is een beredeneerde aanname (§9.3(3)), geen geverifieerd feit. `buildingsmart.org` en `technical.buildingsmart.org` gaven beide HTTP 403.
5. **Het ontbreken van een `[MS-*]`-specificatie voor .mpp.** Indirect zeer goed onderbouwd (MPXJ's eigen verklaring), maar niet met de Microsoft-index bevestigd.
6. **IDS-versie en -datum**, en of er een IDS-profiel voor planning bestaat.
7. **Asta Powerproject / Elecosoft en Bentley SYNCHRO**: geen enkele bron bereikbaar (bot-verificatie / 404). Asta's IFC-ondersteuning en marktpositie ontbreken daarmee volledig, terwijl Asta in de Britse markt en in MPXJ's formatenlijst prominent aanwezig is.
8. **De ER 1-1-11 Appendix A SDEF-specificatie** zelf. Alleen indirect via het UFGS-bestek.
9. **Empirisch bewijs voor "IFC-planning wordt nauwelijks gebruikt".** Mijn onderbouwing is structureel/indirect (§9.3) en steunt zwaar op één sterke aanwijzing (de `ifc4d`-conversierichtingen) en één afwezigheid (IFC komt in het UFGS-bestek niet voor). Er is géén kwantitatief onderzoek in dit rapport dat zegt "x% van de IFC-bestanden bevat een IfcWorkSchedule". Als iemand die meting doet, is dat het meest waardevolle vervolgonderzoek dat ik kan bedenken.
10. ~~**JS/WASM-varianten van formaatbibliotheken.** npm was onbereikbaar (403).~~ **Opgelost én gedeeltelijk weerlegd bij verificatie (V12):** de npm-registry is alsnog bevraagd. `mpxj` en `mpxj-wasm` bestaan niet als npm-pakket, maar `@byteink/mppjs` (MPXJ als JVM-loze native binary, MIT-wrapper) en `dproject` (zero-dependency MSPDI-lezer in TS) bestaan wél, beide sinds mei 2026. Resterende onzekerheid: hun rijpheid en de LGPL-status van de AOT-gecompileerde MPXJ-binary.

---

## 16. Betekenis voor een open-source, IFC-gebaseerde planner (Open Planner Studio)

### 16.1 Uitgangspositie

Open Planner Studio (v2026.7.12) heeft IFC 4.3 als **native** bestandsformaat: laden = IFC parsen, opslaan = de hele applicatiestatus serialiseren. Er is geen apart JSON-projectformaat. Daarnaast bestaan er al pure-TypeScript adapters voor **P6 XML (PMXML)** lezen én schrijven, **MSPDI** lezen én schrijven, en **CSV** lezen én schrijven (`src/services/p6/`, `src/services/msproject/`, `src/services/csv/`).

Dat is — gemeten aan de analyse hierboven — een **strategisch juiste uitgangspositie**. Het project heeft precies de drie formaten zelf geïmplementeerd die (a) technisch zelf te doen zijn en (b) markttoegang geven, en heeft de onmogelijke formaten laten liggen. De TODO-lijst bevestigt dat de afweging bewust is gemaakt: XER staat er als "tekstformaat, native in TS haalbaar (geen JVM)", MPP als "realistisch alleen via MPXJ (JVM): NIET als core-dependency ... route = optionele externe converter (MPXJ-CLI/sidecar)".

Ik onderschrijf beide oordelen volledig, en dit rapport levert de externe onderbouwing ervoor.

### 16.2 Het minimum om mee te doen

**[SCHATTING, met redenering]** De minimale formaatverzameling om als planningstool serieus genomen te worden, in volgorde van noodzaak:

| Prio | Formaat | Richting | Waarom | Status in OPS |
|---|---|---|---|---|
| **0** | IFC 4.3 | lezen + schrijven | Positionering; het bestaansrecht van het product | **Aanwezig** |
| **1** | MSPDI (MS Project XML) | lezen + schrijven | De enige begaanbare Microsoft-route; XSD publiek; Project is het meest verspreide product | **Aanwezig** |
| **2** | P6 XML (PMXML) | lezen + schrijven | De nette Primavera-route; XSD beschikbaar; ook `ifc4d` kiest deze richting bidirectioneel | **Aanwezig** |
| **3** | CSV | lezen + schrijven | Universele noodklep; in de praktijk komt de helft van de planningen als Excel binnen | **Aanwezig** |
| **4** | **XER** | **lezen, daarna schrijven** | **Contractueel voorgeschreven** (UFGS §2.1.2.1, §3.5.1). Zonder XER ben je geen alternatief voor P6, alleen een aanvulling | **Ontbreekt** |
| **5** | ICS | schrijven | Zeer lage kosten, zichtbare gebruikerswaarde | Ontbreekt (staat op TODO) |
| **6** | MPP | lezen, via externe converter | Grote latente vraag (zie ProjectLibre's 7,8 mln downloads), maar onmogelijk zelf te bouwen | Ontbreekt |
| 7 | SDEF | lezen + schrijven | Alleen relevant voor de Amerikaanse publieke markt, maar dan keihard | Ontbreekt |
| 8 | BCF | lezen + schrijven | openBIM-geloofwaardigheid; koppelt bevindingen aan taken | Ontbreekt |
| 9 | MPX | lezen | Alleen archiefmateriaal van vóór 2010 | Ontbreekt |

**De harde grens ligt bij prioriteit 4.** Zonder XER kan Open Planner Studio niet leveren wat een bestek als UFGS 01 32 01.00 10 vraagt, en kan het geen bestanden lezen die een aannemer van zijn opdrachtgever krijgt. Met XER-lezen wordt het een *analysetool* voor de P6-wereld; met XER-schrijven wordt het een *alternatief*. Dat verschil is groot genoeg om de 5–10 mensweken te rechtvaardigen.

### 16.3 Zeven concrete aanbevelingen

**1. Bouw XER-lezen zelf, in TypeScript, en doe het gefaseerd.**
Het is platte tekst; `PyP6XER` bewijst dat het kan met nul afhankelijkheden. Fase 1: activiteiten, WBS, relaties, kalenders, projectgegevens. Fase 2: resources, toewijzingen, activity codes, voortgang. Neem de door MPXJ gedocumenteerde valkuilen direct mee: **Windows-1252 als default met BOM-detectie**, meerdere projecten per bestand, tolerantie voor onleesbare records (P6 doet dat zelf ook), en cross-project-relaties standaard negeren. Kopieer die gedragskeuzes letterlijk — ze zijn duur betaald door iemand anders.

**2. Publiceer een verliesmatrix per formaat, en toon hem in de UI.**
Het project heeft dit al in de P6-writer (de commentaren bij `P6_CURVE_TO_NAME` documenteren expliciet dat `LATE_PEAK → 'Early Peak'` een gedocumenteerd verlies is, met verwijzing naar een verliesmatrix §8.4). **Dat is precies goed en het is een onderscheidend kenmerk.** Trek het door: een dialoog bij export die zegt *"deze 3 eigenschappen gaan verloren in dit formaat"* is iets wat commerciële concurrenten niet doen, en het is precies het soort transparantie waarmee een open-source project vertrouwen wint bij planners die contractueel aansprakelijk zijn.

**3. MPP uitsluitend als optionele externe converter — en dat is óók de licentietechnisch schoonste route.**
Een MPXJ-JAR of -CLI die de gebruiker apart installeert, aangeroepen als los proces dat MPP → MSPDI omzet, waarna de bestaande MSPDI-lezer het werk doet. **Toegevoegd na verificatie:** evalueer daarbij expliciet `@byteink/mppjs` als **Tauri-sidecar** — dezelfde MPXJ-functionaliteit als native binary zonder JVM (V12). Beoordeel eerst twee dingen: de rijpheid van dat pakket (v0.1.5, mei 2026) en of een statisch gelinkte GraalVM-AOT-image van LGPL-code aan de LGPL-relinkingeis voldoet; zo niet, blijft de losse JAR de licentietechnisch veiligste vorm. Dit (a) houdt de Tauri-/webarchitectuur licht, (b) vermijdt elke LGPL-linking-discussie, (c) houdt een risicovolle binaire parser buiten het hoofdproces, en (d) hergebruikt code die er al is. Bied het aan als extensie — het extensiesysteem met importer-haken is hier de natuurlijke plek.

**4. Behandel formaatondersteuning als een securityvraagstuk.**
MPXJ patchte in juni en juli 2026 een XXE en een path traversal. Concreet: zet entity-expansie uit in de XML-lezers, valideer paden bij elke ZIP-achtige extractie (BCF, toekomstige formaten), en zet een limiet op geheugengebruik bij het parsen. Overweeg een fuzz-corpus van misvormde XER/MSPDI-bestanden in `tests/`. De bestaande CPM-regressiesuite (395 cases) is een uitstekend fundament; een parsersuite ernaast is de logische uitbreiding.

**5. Doe iets met IFC-planning dat niemand anders doet: definieer een IDS-profiel.**
De diagnose in §9.3(5) is dat IFC-planning faalt op modelleervrijheid, niet op modelvermogen. Een gepubliceerd, machineleesbaar IDS-profiel *"IFC 4.3 Scheduling Exchange"* — dat vastlegt hoe kalenders, lags, floats en hiërarchie gemodelleerd horen te worden, plus een validator — is werk van beperkte omvang met disproportioneel positioneringseffect. Het maakt Open Planner Studio van "nog een planner" tot "de partij die IFC-planning uitvoerbaar maakte". En het is precies het soort bijdrage waar buildingSMART ontvankelijk voor is.

**6. Los het aanbestedingsprobleem, niet alleen het formaatprobleem.**
UFGS §2.1.2 eist software die *"commercially available ... with vendor software support agreements available"* is. Gratis en open source is daar geen kwalificatie maar een diskwalificatie. Een betaald support-/SLA-aanbod naast de gratis download is geen commercieel bijproduct maar een **markttoegangsvoorwaarde**. Zonder dat is elk formaat dat je bouwt, in dit marktsegment verspilde moeite.

**7. Doe ICS-export deze maand.**
RFC 5545, `VEVENT` voor mijlpalen, `VTODO` optioneel voor deadlines. Enkele dagen werk, direct zichtbare waarde, nul risico. Het staat al op de TODO als "goedkoop, hoge waarde (issue #17)" — dat oordeel klopt.

### 16.4 De strategische samenvatting

Een open-source, IFC-gebaseerde planner zit in een tang. IFC is het juiste fundament — het is een ISO-norm, het is compleet, het is de enige route waarin planningsdata en bouwmodel één ding zijn, en het is gratis te implementeren. Maar de markt vraagt er niet om. De markt vraagt `.xer`, en in tweede instantie `.mpp`.

De uitweg is niet kiezen maar volgorde aanbrengen: **IFC is waar je data woont, de proprietary formaten zijn waar je data reist.** Een IFC-native kern met eersteklas XML-adapters (MSPDI, PMXML) en een eigen XER-implementatie is technisch haalbaar, licentietechnisch schoon en veiliger dan de alternatieven. MPP hoort buiten de deur. En de positionering die dit alles bij elkaar houdt — het argument dat een grote opdrachtgever overtuigt — is niet "wij zijn gratis" maar **"bij ons is de planning geen los bestand naast het model, en we vertellen u precies wat er bij elke export verloren gaat."**

Dat laatste kan geen enkele leverancier van een gesloten formaat je nadoen, want hun hele bedrijfsmodel hangt ervan af dat ze het niet vertellen.

---

## Bronnenlijst

Alle URL's geraadpleegd op **25 juli 2026**.

**Normen en specificaties**
- buildingSMART IFC 4.3 documentatie (versie IFC 4.3.2.20260630 / IFC4X3_ADD2): https://ifc43-docs.standards.buildingsmart.org/
  - IfcWorkSchedule: https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkSchedule.htm
  - IfcWorkControl: https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkControl.htm
  - IfcWorkPlan: https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkPlan.htm
  - IfcTask: https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcTask.htm
  - IfcTaskTime: https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcTaskTime.htm
  - IfcRelSequence: https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcRelSequence.htm
  - IfcWorkCalendar: https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkCalendar.htm
- IFC4.3.x development repo (licentie CC BY-ND 4.0): https://github.com/buildingSMART/IFC4.3.x-development
- BCF-XML releases (v3.0, 18-06-2024): https://github.com/buildingSMART/BCF-XML/releases
- BCF-XML repo: https://github.com/buildingSMART/BCF-XML
- bSDD repo (MIT): https://github.com/buildingSMART/bSDD
- bSDD API (`TotalCount: 405`): https://api.bsdd.buildingsmart.org/api/Dictionary/v1?limit=1
- IDS repo: https://github.com/buildingSMART/IDS
- RFC 5545 iCalendar (sept. 2009, Proposed Standard): https://www.rfc-editor.org/rfc/rfc5545
- Microsoft Project XML Data Interchange Schema Reference (`ms.date 2018-03-14`, monikers t/m Project 2016): https://learn.microsoft.com/en-us/office-project/xml-data-interchange/project-xml-data-interchange-schema-reference
- Richtlijn 2009/24/EG art. 6 (Decompilatie): https://www.legislation.gov.uk/eudr/2009/24/article/6
- **EN ISO 16739-1:2024 (geldig vanaf 15-04-2024, ICS 25.040.40) — primaire catalogusvermelding bij een nationale normalisatie-instelling, toegevoegd bij verificatie:** https://www.evs.ee/en/evs-en-iso-16739-1-2024
- ISO 16739-1:2024 (secundair, ISO zelf onbereikbaar; vervangen door de EVS-bron hierboven): https://en.wikipedia.org/wiki/Industry_Foundation_Classes

**Aanbestedings- en bestekdocumenten**
- UFGS 01 32 01.00 10 "Project Schedule", USACE/NAVFAC/AFCEC, augustus 2023, Change 1 – 08/24: https://www.wbdg.org/FFC/DOD/UFGS/UFGS%2001%2032%2001.00%2010.pdf

**Bibliotheken en open source**
- MPXJ homepage: https://www.mpxj.org/
- MPXJ supported formats: https://www.mpxj.org/supported-formats/
- MPXJ FAQ (MPP-citaten): https://www.mpxj.org/faq/
- MPXJ XER lezen: https://www.mpxj.org/howto-read-xer/
- MPXJ XER schrijven: https://www.mpxj.org/howto-write-xer/
- MPXJ MSPDI schrijven: https://www.mpxj.org/howto-write-mspdi/
- MPXJ PMXML schrijven: https://www.mpxj.org/howto-write-pmxml/
- MPXJ Java-distributie: https://www.mpxj.org/howto-start-java/
- MPXJ GitHub (LGPL-2.1, 338 sterren): https://github.com/joniles/mpxj
- MPXJ CHANGELOG (16.5.0, 03-07-2026; security fixes): https://raw.githubusercontent.com/joniles/mpxj/master/CHANGELOG.md
- MPXJ releases: https://github.com/joniles/mpxj/releases
- MPXJ op PyPI (16.5.0, LGPL-2.0-or-later, JPype/JVM): https://pypi.org/project/mpxj/
- IfcOpenShell `src/ifc4d` (conversies van/naar 4D-software): https://github.com/IfcOpenShell/IfcOpenShell/tree/v0.8.0/src/ifc4d
- IfcOpenShell `api.sequence` (48 functies): https://raw.githubusercontent.com/IfcOpenShell/IfcOpenShell/v0.8.0/src/ifcopenshell-python/ifcopenshell/api/sequence/__init__.py
- IfcOpenShell python-package boomstructuur: https://github.com/IfcOpenShell/IfcOpenShell/tree/v0.8.0/src/ifcopenshell-python/ifcopenshell
- xerparser (GPLv3, 0.13.9, 19-11-2025): https://pypi.org/project/xerparser/
- PyP6XER (LGPL-2.1, 1.16.0, 09-07-2025): https://pypi.org/project/PyP6XER/
- ProjectLibre (CPAL-1.0, 1.9.8, 30-04-2025, 7,8 mln downloads): https://sourceforge.net/projects/projectlibre/
- GanttProject (GPLv3, iCalendar-module): https://github.com/bardsoftware/ganttproject
- **`@byteink/mppjs` (npm, MIT-wrapper, v0.1.5, 08-05-2026 — MPXJ als GraalVM-AOT native binary, MPP → MSPDI zonder JVM; toegevoegd bij verificatie):** https://registry.npmjs.org/@byteink/mppjs
- **`dproject` (npm, MIT, v1.0.6, 02-05-2026 — zero-dependency MSPDI-lezer in TypeScript; toegevoegd bij verificatie):** https://registry.npmjs.org/dproject
- npm-registry-zoekopdracht "mpxj" (geen pakket `mpxj` of `mpxj-wasm`): https://registry.npmjs.org/-/v1/search?text=mpxj
- Bonsai BIM documentatie (costing & scheduling, work in progress): https://docs.bonsaibim.org/guides/costing_and_scheduling/index.html

**Leveranciers en prijzen**
- Microsoft Project prijsvergelijking (Standard 2024 $679,99 / Professional 2024 $1.129,99): https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software
- ScheduleReader prijzen ($344 / $440 per jaar): https://www.schedulereader.com/pricing
- Oracle Primavera P6 EPPM: https://www.oracle.com/industries/construction-engineering/primavera-p6/
- Oracle Primavera Cloud (genereert XER voor P6-import): https://www.oracle.com/construction-engineering/primavera-cloud/
- Oracle prijslijstindex (18 lijsten, geen Primavera): https://www.oracle.com/us/corporate/pricing/price-lists/index.html
- Deltek Acumen: https://www.deltek.com/en/products/project-and-portfolio-management/acumen

**Onbereikbaar tijdens dit onderzoek (HTTP 403/404)**
iso.org, webstore.ansi.org, nen.nl, buildingsmart.org, technical.buildingsmart.org, blog.buildingsmart.org, npmjs.com, sciencedirect.com, researchgate.net, elecosoft.com, investors.bentley.com, help.autodesk.com, eur-lex.europa.eu.
*(Bij de verificatieronde alsnog bereikt via andere routes: de npm-registry via `registry.npmjs.org`, en de ISO-normstatus via de EVS-catalogus. Nog steeds onbereikbaar: iso.org, webstore.ansi.org, buildingsmart.org, technical.buildingsmart.org — alle vier achter een Cloudflare-interstitial.)*

---

## Verificatie

*Adversariële controle uitgevoerd op 25-07-2026 door een tweede, onafhankelijke controleur. Opzet: van elke bewering is geprobeerd haar te **weerleggen** met een primaire bron, niet haar te bevestigen. Waar het rapport een secundaire samenvatting citeerde, is de originele normtekst / repo-inhoud / API-respons opgehaald. Het UFGS-bestek is als PDF gedownload en de tekstlaag is geëxtraheerd, zodat de citaten letterlijk zijn nagelopen in plaats van via een samenvatting.*

**Uitkomst in één regel: 21 beweringsclusters gecontroleerd, 15 bevestigd, 4 gecorrigeerd, 2 onzeker.** De correcties raken geen enkele kernconclusie van het rapport; de zwaarste (V11, BCF-jaartallen) versterkt de strekking zelfs. De materieel belangrijkste vondst is V12: de aanname dat MPP alleen via een JVM bereikbaar is, klopt sinds mei 2026 niet meer.

### Bevestigd

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| **V1** | UFGS 01 32 01.00 10 (aug. 2023, Change 1 – 08/24, UMRL jan. 2026, 24 pagina's) schrijft §2.1.2.1 letterlijk voor: *"provide the 'xer' export file in a version of P6 importable by the Government system"*; §2.1.1 *"The Government uses Primavera P6"*; §2.1.2.2 *"provide for the Government's use two licenses, two computers, and training for two Government employees"*; §2.1.2 *"Scheduling software used by the contractor must be commercially available from the software vendor for purchase with vendor software support agreements available"* + *"The software routine used to create the required sdef file must be created and supported by the software manufacturer"*; §3.5.1 *"in the format of the scheduling software (e.g. .xer)"*; de redactionele NOTE over SDEF en ER 1-1-11, App. A; §3.12 **"PRIMAVERA P6 MANDATORY REQUIREMENTS"** met Longest Path, Retained Logic, "Fixed Duration & Units", Physical percent complete, 8.0 hr/day, activity-ID ≤ 10 tekens. | **bevestigd — alle acht citaten letterlijk juist, inclusief sectienummers** | [wbdg.org/FFC/DOD/UFGS/UFGS 01 32 01.00 10.pdf](https://www.wbdg.org/FFC/DOD/UFGS/UFGS%2001%2032%2001.00%2010.pdf) (PDF gedownload, 24 p., tekstlaag geëxtraheerd met `pypdf`) |
| **V2** | Het woord "IFC" komt in dat bestek geen enkele keer voor (§9.3(4)). | **bevestigd** — machinetelling op de volledige tekstlaag: 0 treffers voor "IFC" | idem |
| **V3** | ScheduleReader: $344/jaar Standard, $440/jaar PRO, beide incl. 1 jaar SMA; leest XER en P6 XML. | **bevestigd, letterlijk** | [schedulereader.com/pricing](https://www.schedulereader.com/pricing) |
| **V4** | MPXJ kan MPP niet schrijven; de drie citaten (*"the knowledge we have of the file structure is still relatively incomplete…"*, *"technically feasible … considerable amount of development effort"*, *"probably better off using MSPDI"*) plus de leesbetrouwbaarheidsproblemen (MPP8-flagvelden, verborgen placeholder-records *"may not be reliable"*). | **bevestigd, letterlijk** | [mpxj.org/faq](https://www.mpxj.org/faq/) |
| **V5** | MPX *"can be read by versions of Microsoft Project up to and including Microsoft Project 2010"*; MPXJ schrijft 6 formaten (MPX, MSPDI, Planner, PMXML, SDEF, XER). | **bevestigd** — en aangevuld: de bron zegt óók *"written by versions of Microsoft Project up to Microsoft Project 98"*, wat het "MPX is dood"-oordeel versterkt. De "How to Write…"-navigatie telt exact 6 items. | [mpxj.org/supported-formats](https://www.mpxj.org/supported-formats/) |
| **V6** | MSPDI-documentatie is bevroren: `ms.date 2018-03-14`, `updated_at 2021-09-16`, monikers t/m `project-client-2016`, openingszin over *"the Microsoft Office Project 2007 XML Data Interchange Schema (mspdi_pj12.xsd)"*. | **bevestigd — alle vier de metadatavelden letterlijk juist** | [learn.microsoft.com — Project XML Data Interchange Schema Reference](https://learn.microsoft.com/en-us/office-project/xml-data-interchange/project-xml-data-interchange-schema-reference) |
| **V7** | IFC 4.3: `IfcTaskTime` draagt `EarlyStart`, `EarlyFinish`, `LateStart`, `LateFinish`, `FreeFloat`, `TotalFloat`, `IsCritical` (+ 13 andere attributen); `EarlyStart` = *"The earliest date on which a task can be started. It is a calculated value."*; `IfcWorkControl` = `ABSTRACT SUPERTYPE OF (ONEOF (IfcWorkPlan, IfcWorkSchedule)) SUBTYPE OF (IfcControl)`; `IfcWorkSchedule`-modelleerregel *"a work calendar shall be assigned to the summary task and not the work schedule"*; `IfcRelSequence` met `IfcSequenceEnum` (START_START, START_FINISH, FINISH_START, FINISH_FINISH, USERDEFINED), de waarschuwing *"there is no checking that the time lag value is in keeping with the sequence type set"* en de regels `AvoidInconsistentSequence` / `CorrectSequenceType`; documentatieversie `IFC 4.3.2.20260630 (IFC4X3_ADD2)`. | **bevestigd — alle attributen, citaten en de EXPRESS-tekst letterlijk juist.** De uitdrukkelijke noot in §9.1 dat `IfcWorkSchedule` een subtype van `IfcWorkControl` is (niet van `IfcWorkPlan`) is correct. | [IfcTaskTime](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcTaskTime.htm), [IfcWorkControl](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkControl.htm), [IfcWorkSchedule](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkSchedule.htm), [IfcRelSequence](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcRelSequence.htm) |
| **V8** | IFC is genormeerd als ISO 16739-1:2024 (in het rapport nog **[ZACHT]**, op Wikipedia gebaseerd). | **bevestigd en opgewaardeerd naar [HARD]** — EN ISO 16739-1:2024, *"Industry Foundation Classes (IFC) for data sharing in the construction and facility management industries — Part 1: Data schema"*, geldig vanaf **15-04-2024**, ICS 25.040.40. De documentatiesite bevestigt daarnaast *"The structure and semantic contents of this are exactly the same as the ISO IFC 4.3"*. | [evs.ee/en/evs-en-iso-16739-1-2024](https://www.evs.ee/en/evs-en-iso-16739-1-2024); [ifc43-docs.standards.buildingsmart.org](https://ifc43-docs.standards.buildingsmart.org/) |
| **V9** | IfcOpenShell `ifc4d` ondersteunt MSP/P6-XML/P6-XER/Asta → IFC en IFC → P6-XML/MSP; XER dus maar in één richting. | **bevestigd, letterlijk conform de README** | [github.com/IfcOpenShell/IfcOpenShell — src/ifc4d](https://github.com/IfcOpenShell/IfcOpenShell/tree/v0.8.0/src/ifc4d) |
| **V13** | Microsoft Project Standard 2024 $679,99 en Professional 2024 $1.129,99, eenmalig, één gebruiker/één pc; Project Server Subscription Edition zonder publieke prijs. | **bevestigd, letterlijk** | [microsoft.com — Project vergelijken](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software) |
| **V14** | Oracle Primavera Cloud: *"Oracle Primavera Cloud generates an XER file that is designed to be imported into Primavera P6"*; en Oracle publiceert geen prijslijst voor Construction & Engineering. | **bevestigd** — het citaat staat er letterlijk (de pagina noemt óók de omgekeerde richting: *"the XER export from Primavera P6 is designed to be imported from Primavera P6 into Primavera Cloud"*, wat het argument "Oracle houdt XER zelf in leven" versterkt) | [oracle.com/construction-engineering/primavera-cloud](https://www.oracle.com/construction-engineering/primavera-cloud/) |
| **V15** | bSDD publieke API rapporteert `TotalCount: 405`. | **bevestigd** — respons opnieuw opgehaald op 25-07-2026, waarde ongewijzigd 405 | [api.bsdd.buildingsmart.org/api/Dictionary/v1?limit=1](https://api.bsdd.buildingsmart.org/api/Dictionary/v1?limit=1) |
| **V16** | RFC 5545 (sept. 2009, Proposed Standard, vervangt RFC 2445); componenten VEVENT/VTODO/VJOURNAL/VFREEBUSY/VTIMEZONE. Richtlijn 2009/24/EG art. 6(1)(2)(3) zoals geciteerd. | **beide bevestigd, letterlijk** — kleine aanvulling: RFC 5545 definieert ook `VALARM` | [rfc-editor.org/rfc/rfc5545](https://www.rfc-editor.org/rfc/rfc5545); [legislation.gov.uk/eudr/2009/24/article/6](https://www.legislation.gov.uk/eudr/2009/24/article/6) |
| **V17** | Bibliotheekgegevens: MPXJ 16.5.0 (03-07-2026), 16.4.1 (22-06-2026) met *"Fix XXE vulnerability in MerlinReader"* en de P3/SureTrak-path-traversal in 16.5.0; LGPL-2.1; 338 GitHub-sterren; Java. `xerparser` GPLv3 0.13.9 (19-11-2025), *"Tested on .xer files exported as versions 15.2 through 19.12"*. `PyP6XER` LGPL-2.1 1.16.0 (09-07-2025), Python ≥3.8, *"Zero Dependencies: Uses only Python standard library"*, schrijft XER. ProjectLibre CPAL-1.0, 1.9.8 (30-04-2025), 7,8 mln+ downloads, 19.762/week. GanttProject GPLv3, ~1,1k sterren. MPXJ-XER-caveats (Windows-1252 + BOM, GB2312, `listProjects()`/`readAll()`, *"By default P6 ignores records it can't successfully read from an XER file. MPXJ takes the same approach."*, cross-project-relaties standaard genegeerd, WBS-overerving conform Primavera) en de PMXML-caveats (gedeelde `ProjectContext`, baselines standaard uit). | **alle bevestigd** — GanttProject-sterren gemeten op 1.082 (= "1,1k"), MPXJ-sterren exact 338 | [pypi.org/project/xerparser](https://pypi.org/project/xerparser/), [pypi.org/project/PyP6XER](https://pypi.org/project/PyP6XER/), [MPXJ CHANGELOG](https://raw.githubusercontent.com/joniles/mpxj/master/CHANGELOG.md), [api.github.com/repos/joniles/mpxj](https://api.github.com/repos/joniles/mpxj), [mpxj.org/howto-read-xer](https://www.mpxj.org/howto-read-xer/), [mpxj.org/howto-write-xer](https://www.mpxj.org/howto-write-xer/), [sourceforge.net/projects/projectlibre](https://sourceforge.net/projects/projectlibre/), [api.github.com/repos/bardsoftware/ganttproject](https://api.github.com/repos/bardsoftware/ganttproject) |
| **V18** | Rekencontrole: §3.4 schat XER-lezer op 2–4 mensweken en XER-schrijver op nogmaals 3–6; §16.2 spreekt van "5–10 mensweken". | **bevestigd — intern consistent** (2+3 = 5, 4+6 = 10). Geen rekenfout gevonden. Wel blijft het een ongemeten [SCHATTING]; de onderbouwing ("omvang van de bestaande Python-implementaties") is niet met een regeltelling gestaafd en is dus niet toetsbaar. | — (interne consistentiecontrole) |

### Gecorrigeerd

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| **V10** | *"`ifcopenshell.api.sequence` biedt 48 functies."* | **gecorrigeerd → 40.** Het `__all__` van `api/sequence/__init__.py` in v0.8.0 bevat exact 40 namen (39 directe `from .x import x`-regels plus `recalculate_schedule`, dat in een `try/except ModuleNotFoundError` staat omdat het extra afhankelijkheden nodig heeft). Het bestand is opgehaald en geteld, niet geschat. **Consequentie: geen** — de conclusie "er is een complete, gratis planningsmotor bovenop IFC" blijft overeind; alleen het getal was 20 % te hoog. Bijvangst: dat juist `recalculate_schedule` — de CPM-motor — achter een optionele afhankelijkheid zit, ondersteunt het argument in §9.3 dat IFC-planning randfunctionaliteit is. | [raw.githubusercontent.com — api/sequence/\_\_init\_\_.py](https://raw.githubusercontent.com/IfcOpenShell/IfcOpenShell/v0.8.0/src/ifcopenshell-python/ifcopenshell/api/sequence/__init__.py) |
| **V11** | BCF-XML-releasetabel: v3.0 = 18 juni **2024**, v2.1 = 16 januari **2024**, v2.0 = 6 oktober **2015**. | **gecorrigeerd → v3.0 = 18-06-2021, v2.1 = 16-01-2017, v2.1-draft = 01-08-2016, v2.0 = 06-10-2014.** Drie van de vier jaartallen waren fout. Oorzaak: de GitHub-HTML-releasepagina toont bij recente items alleen dag+maand, waardoor het jaartal is geraden. De Atom-feed geeft harde tijdstempels (`2021-06-18T06:33:36Z`, `2017-01-16T10:58:05Z`, `2016-08-01T09:51:00Z`, `2014-10-06T12:47:19Z`). **Consequentie: de strekking wordt sterker, niet zwakker** — BCF 3.0 is vijf jaar oud en de repo heeft sindsdien geen release meer gekend, wat past bij het beeld van een openBIM-uitwisselingslaag zonder momentum. Waarschuwing voor hergebruik: dit soort jaartal-vergissingen ontstaat structureel bij het lezen van GitHub-releasepagina's; gebruik `/releases.atom` of de API. | [github.com/buildingSMART/BCF-XML/releases.atom](https://github.com/buildingSMART/BCF-XML/releases.atom) |
| **V12** | *"Er is **geen** JavaScript/WASM-build [van MPXJ] … Voor een TypeScript-/Tauri-planner is MPXJ geen bibliotheek maar een externe procesafhankelijkheid"*, met de **[SCHATTING]** dat de kans op een JS-route *"zeer klein"* is (npm was onbereikbaar). | **gedeeltelijk weerlegd → gecorrigeerd.** Het letterlijke deel klopt: `registry.npmjs.org/mpxj` en `registry.npmjs.org/mpxj-wasm` geven beide `Not found`, en MPXJ zelf publiceert geen JS/WASM-distributie. Maar de **conclusie** die eruit werd getrokken — MPP is alleen met een JVM bereikbaar — is achterhaald. Op npm staan sinds mei 2026: **`@byteink/mppjs`** (MIT-wrapper, v0.1.5, eerste publicatie 2026-05-08), dat MPXJ als **GraalVM-AOT-gecompileerde native binary** meelevert via platform-sidecars en `.mpp` → MSPDI omzet — *"Native binary, **no JVM required at runtime**"*; en **`dproject`** (MIT, v1.0.6, 2026-05-02), een zero-dependency clean-room **MSPDI-lezer in TypeScript** voor browser + Node. **Consequentie:** §5.3, §12.1, §14 (strategie D) en aanbeveling §16.3(3) zijn aangepast — een MPP-converter als Tauri-sidecar is nu een reële optie in plaats van "JVM meeleveren". Twee voorbehouden blijven, en die zijn niet klein: (a) beide pakketten zijn enkele maanden oud, v0.1.x/v1.0.x, zonder aantoonbare gebruikersbasis; (b) een statisch gelinkte AOT-image van LGPL-code raakt precies de relinkingverplichting die §13.3 met een losse JAR wilde omzeilen. Daarom: aanbeveling 3 blijft staan, maar met een expliciete evaluatiestap. | [registry.npmjs.org/@byteink/mppjs](https://registry.npmjs.org/@byteink/mppjs), [registry.npmjs.org/dproject](https://registry.npmjs.org/dproject), [registry.npmjs.org/-/v1/search?text=mpxj](https://registry.npmjs.org/-/v1/search?text=mpxj) |
| **V19** | *"21 bestandsformaten lezen"* (bevinding 4 en §12.1). | **gecorrigeerd naar een nuance, in twee richtingen tegelijk.** De formatenpagina heeft 21 formaatsecties, maar één daarvan ("PRIMAVERA P6") dekt twee formaten (XER én PMXML) — geteld als losse formaten zijn het er 22. Tegelijk **onderschat** 21 het werkelijke aantal: de "How to Read…"-navigatie bevat óók Merlin, PLF en ProjectLibre, plus MPD-databases, P6-databases, P6 Web Services, Microsoft Project Server, Microsoft Planner en Oracle Primavera Cloud — die staan niet in de formatentabel. Het getal "21" is dus geen fout maar een onderschatting met een definitiekwestie eronder. Bijvangst die het rapport mist: dat MPXJ een **MerlinReader** heeft, blijkt uit de XXE-fix in 16.4.1 — een formaat dat in de formatentabel ontbreekt. Het getal **6 schrijfformaten is exact juist**. | [mpxj.org/supported-formats](https://www.mpxj.org/supported-formats/) (volledige HTML opgehaald en secties geteld) |

### Onzeker

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| **V20** | §9.3(3): *"Certificering dekt geometrie, niet proces"* — geen buildingSMART-certificeringsscope dekt `IfcWorkSchedule`/`IfcTask`. En §15(4). | **onzeker — blijft onbevestigd.** `buildingsmart.org` en `technical.buildingsmart.org` gaven ook bij deze verificatieronde een Cloudflare-interstitial (HTTP 403). Ik heb de stelling noch kunnen bevestigen noch kunnen weerleggen. Het rapport markeert haar zelf al correct als **[SCHATTING]** met een expliciete oproep aan de lezer om te verifiëren; dat is de juiste behandeling en ik laat haar zo staan. **Let op:** §9.4 en aanbeveling §16.3(5) leunen op deze niet-geverifieerde aanname. Wie de aanbeveling "definieer een IDS-profiel" wil uitvoeren, moet dit eerst hard maken. | — (bron onbereikbaar) |
| **V21** | Diverse kleinere, niet-onafhankelijk-natrekbare details: *"MPXJ heeft sinds circa 2000 aan MPP gewerkt"* (§5.3); *"6.077 commits op master"* voor GanttProject (§12.3); *"de Python-versie draait via JPype op een JVM **die de gebruiker zelf moet meebrengen**"* (bevinding 4); *"de helft van de planningen komt als Excel binnen"* (§16.2). | **onzeker.** De MPXJ-startdatum en het commitgetal zijn niet nagerekend. De PyPI-pagina van `mpxj` bevestigt wél JPype (*"uses the JPype Java bridge"*) maar zegt **niet** expliciet dat de gebruiker zelf een JVM moet installeren — die toevoeging is een redelijke maar ongeverifieerde gevolgtrekking; in de bevindingenlijst is "die de gebruiker zelf moet meebrengen" daarom afgezwakt. Het "helft van de planningen"-cijfer is een ongefundeerde slag in de lucht en had als **[SCHATTING]** gemarkeerd moeten zijn; het draagt geen conclusie en is verder ongemoeid gelaten. | [pypi.org/project/mpxj](https://pypi.org/project/mpxj/) |

### Wat deze controle niet heeft kunnen doen

Het zoekmachinebudget van de sessie was ook bij de verificatieronde uitgeput (200/200 `WebSearch`-aanroepen verbruikt), zodat opnieuw uitsluitend met gerichte URL-ophalingen is gewerkt. De grootste lacune van het rapport — **de volledige afwezigheid van marktaandeel- en marktomvangcijfers** (§15, punt 1) — blijft daarmee bestaan. Ik heb dat gat niet gedicht en heb ook niets ingevuld; het rapport is op dat punt eerlijk over zichzelf. Evenmin geverifieerd: de ER 1-1-11 Appendix A-tekst zelf, de IDS-versie en -datum, en alles over Asta Powerproject/Elecosoft en Bentley SYNCHRO.
