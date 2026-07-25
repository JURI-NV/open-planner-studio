# Dwarsdoorsnede-thema: Normen, aanbestedings- en contracteisen

**Marktonderzoek planningssoftware — themarapport**
Opgesteld: 25 juli 2026. Alle URL's geraadpleegd op 25 juli 2026 tenzij anders vermeld.

---

## 1. Samenvatting

De planningssoftwaremarkt wordt niet primair gestuurd door functionaliteit of prijs, maar door **wat een opdrachtgever contractueel accepteert als planningsproduct**. Dat is de kern van dit thema. Uit het bronmateriaal komen zes lock-in-mechanismen naar voren, in oplopende hardheid:

1. **Formaatmandaat** — het contract eist een specifiek bestandsformaat als deliverable (`.xer`, P6 XML/PMXML, SDEF). Oplosbaar met een converter.
2. **Instellingsmandaat** — het contract schrijft *productinstellingen* voor die alleen binnen één product bestaan. Niet oplosbaar met een converter. Het scherpste voorbeeld dat ik vond is UFGS 01 32 01.00 10 §3.12 "PRIMAVERA P6 MANDATORY REQUIREMENTS", dat P6-enums (`Fixed Duration & Units`, `Longest Path`, `Retained Logic`, activiteitcodes op *Project*- en niet op *EPS*-niveau) tot contracttekst maakt.
3. **Auditortoolmandaat** — de toetsende instantie draait haar eigen analysetool op jouw bestand. DCMA publiceerde daarvoor **per softwareproduct** een aparte assessmentgids (Microsoft Project EVC-101 Rev11, Deltek Open Plan EVC-102 Rev8, Primavera EVC-103 Rev7, alle 27 maart 2013). Wie buiten dat rijtje valt, is de facto niet-toetsbaar.
4. **Personeelsmandaat** — het contract stelt eisen aan de *planner*, gekoppeld aan een product. UFGS eist een planner die "at least three previous construction schedules ... using Primavera P6" heeft gemaakt.
5. **Commercialiteitsmandaat** — het scherpste obstakel voor open source. UFGS §2.1.2: software moet "commercially available from the software vendor for purchase with **vendor software support agreements available**" zijn, en de SDEF-exportroutine moet "created and supported by the software manufacturer" zijn. Een project zonder commerciële supportentiteit is daarmee formeel niet in te zetten. Bovendien: kiest de aannemer iets anders dan P6, dan moet hij de opdrachtgever **twee licenties, twee computers en training voor twee ambtenaren** leveren — een boete-achtige drempel op afwijken.
6. **Betalingskoppeling** — de norm hangt aan het geld. NEC: zonder Accepted Programme kan 25% van de betaling worden ingehouden en kunnen compensation events niet worden beoordeeld *(secundaire bron; de onderliggende NEC-clausule koppelt de kwart-inhouding aan het niet **indienen** van een eerste programma — zie Verificatie V9)*. UFGS: 10% inhouding per betalingstermijn. FAR 52.236-15: de contracting officer mag goedkeuring van voortgangsbetalingen inhouden *(trigger: het niet tijdig indienen van de planning)*. DFARS 252.234-7002: betalingsinhouding bij een afgekeurd EVMS *(via de clausule 252.242-7005 Contractor Business Systems)*.

De belangrijkste strategische bevinding voor een open-source planner: **binnen het hardste regime ter wereld (US DoD/USACE) bestaat precies één verplicht, publiek gedocumenteerd, non-proprietair uitwisselingsformaat — SDEF**, gedefinieerd in USACE ER 1-1-11 Appendix A. Het is expliciet bedoeld als de route waarlangs een "in-house program" (lees: niet-Primavera) schedule-data mag aanleveren. Dat is de smalle maar echte deur.

Tweede strategische bevinding: **IFC 4.3 kan het datamodel dat deze normen vragen al volledig dragen.** `IfcTaskTime` bevat `EarlyStart`, `EarlyFinish`, `LateStart`, `LateFinish`, `FreeFloat`, `TotalFloat`, `IsCritical`, `StatusTime`, `ActualStart/Finish/Duration`, `RemainingTime` en `Completion`. Het probleem van een IFC-gebaseerde planner is dus **niet** dat IFC de compliance-data niet kan uitdrukken; het probleem is dat geen enkele aanbesteding IFC als planningsdeliverable *accepteert*.

Derde bevinding, empirisch: de compliance-toolinglaag is in open source vrijwel afwezig. Een GitHub-inventarisatie (25 juli 2026) levert voor "DCMA 14 point schedule assessment" 30 repositories op waarvan de best gewaardeerde **2 sterren** heeft. Het enige serieuze open-source project in dit veld is MPXJ (LGPL, 338 sterren, v16.5.0 van 3 juli 2026). Dat is tegelijk een gat in de markt en een waarschuwing over de marktomvang.

---

## 2. Methodologie en bronkwaliteit

### 2.1 Beperking van deze ronde (belangrijk)

Het WebSearch-budget van de sessie was al uitgeput voordat dit deelonderzoek begon (200/200 calls). Het onderzoek is daarom uitgevoerd met **directe WebFetch op bekende primaire bron-URL's** plus GitHub-API-zoekopdrachten, zonder zoekmachine. Gevolg:

- **Sterk** waar ik de URL van een normdocument of regelgeving kende: FAR/DFARS, GAO-16-89G (volledige PDF lokaal geëxtraheerd, 240 pagina's), UFGS 01 32 01.00 10 (24 pagina's), USACE ER 1-1-11 (16 pagina's), buildingSMART IFC 4.3-documentatie.
- **Zwak** waar ik op een zoekmachine had moeten leunen: nationale aanbestedingsdocumenten (Rijkswaterstaat, National Highways, Golfstaten), CIOB-publicaties, IPMDAR-DID, ISO-catalogusteksten. Die zijn in §10 expliciet als **niet geverifieerd** gemarkeerd. Ik heb ze niet weggelaten — dat zou het beeld vertekenen — maar ook niet als feit gepresenteerd.

### 2.2 Bronclassificatie

| Klasse | Betekenis | Voorbeelden in dit rapport |
|---|---|---|
| **A — Normtekst / regelgeving** | Bindende of officieel gepubliceerde tekst, letterlijk gelezen | FAR 52.236-15, DFARS 234.201 & 252.234-7002, UFGS 01 32 01.00 10, USACE ER 1-1-11, GAO-16-89G, IFC 4.3-specificatie |
| **B — Leverancier, officieel** | Fabrikanteigen productpagina of prijspagina | Microsoft Project-prijspagina, Oracle P6-productpagina, Deltek Acumen-productpagina, mpxj.org |
| **C — Publieke registers / API's** | Machineleesbare, verifieerbare registers | GitHub API, UK G-Cloud Digital Marketplace |
| **D — Secundair / encyclopedisch** | Betrouwbaar maar afgeleid; gebruikt waar A niet bereikbaar was | Wikipedia (ISO 21500, NEC, FIDIC, PMI, AACE, EVM), Designing Buildings Wiki |
| **E — Community-implementatie** | Broncode/README van derden; indicatief, niet normatief | GitHub-README van een DCMA-checker |
| **X — Niet geverifieerd** | Genoemd omdat het thematisch niet weggelaten kan worden, maar in deze ronde niet gecontroleerd | Rijkswaterstaat, Golfstaten, CIOB, IPMDAR-revisie |

Waar ik zelf redeneer in plaats van citeer, staat het woord **[schatting]** met de gebruikte redenering erbij.

---

## 3. Overzicht van de regimes

| Regime | Opgelegd door | Bindend? | Directe softwaredwang | Hardheid |
|---|---|---|---|---|
| FAR 52.236-15 Schedules for Construction Contracts | US federale overheid, alle bouwcontracten boven de simplified acquisition threshold | Ja, contractclausule | Geen (formaatneutraal) | Laag |
| USACE ER 1-1-11 + UFGS 01 32 01.00 10 | US Army Corps of Engineers / NAVFAC / AFCEC | Ja, bestektekst | **Zeer hoog** — P6 als defaultproduct, `.xer` of SDEF, P6-instellingen, plannerkwalificatie in P6 | **Hoogst gemeten** |
| ANSI/EIA-748 EVMS via DFARS 234.201 / 252.234-7002 | US DoD | Ja, boven $20M / $50M | Indirect — dwingt IMS + CPR-koppeling | Hoog |
| FAR Subpart 34.2 EVMS | US civiele agencies, "major acquisitions for development" (OMB A-11) | Ja | Indirect | Middel |
| DCMA 14-Point Assessment | DCMA als DoD-toezichthouder op EVMS | Nee — expliciet géén compliance-trigger | Indirect maar sterk via per-tool assessmentgidsen | Middel-hoog |
| GAO Schedule Assessment Guide (GAO-16-89G) | GAO, IG's, agency audit services | Nee — auditcriterium, geen contracteis | Ja: "software schedule file", geen PDF | Middel |
| AACE International RP's | Vrijwillig; wordt normatief zodra een bestek ernaar verwijst | Voorwaardelijk | Geen productdwang, wel methodedwang | Middel (situationeel hoog) |
| PMI Practice Standard for Scheduling | Vrijwillig / beroepsgroep | Nee | Geen | Laag |
| ISO 21500:2021 / ISO 21502:2020 | Vrijwillig, niet-certificeerbaar | Nee | Geen | Zeer laag |
| NEC3/NEC4 clause 31/32 | Britse publieke sector (default), Hongkong, e.a. | Ja, contractueel | Geen productdwang, wel inhoudsdwang + betalingskoppeling | Hoog (commercieel) |
| FIDIC sub-clause 8.3 | Internationaal, MDB-gefinancierde projecten | Ja, contractueel | Geen productdwang | Middel |
| CIOB Guide to Good Practice | Vrijwillig / beroepspraktijk | Nee | **[X — niet geverifieerd]** | Onbekend |

---

## 4. VS federaal: de EVMS-stapel

### 4.1 De drempelbedragen (klasse A)

DFARS 234.201 legt de trap vast waarop de hele Amerikaanse defensieplanningsmarkt draait:

> "For cost or incentive contracts and subcontracts valued at $20,000,000 or more, the earned value management system shall comply with the guidelines in the American National Standards Institute/Electronic Industries Alliance Standard 748"

en boven $50.000.000 moet dat systeem **formeel zijn goedgekeurd** door de cognizant Federal agency (voor DoD: DCMA). Onder $20M is toepassing optioneel en risicogebaseerd, met vastlegging in het contractdossier; bij firm-fixed-price contracten wordt EVMS ontraden en is een waiver nodig.
Bron: <https://www.acquisition.gov/dfars/234.201-policy.> (klasse A)

DFARS 252.234-7002 vult het contractueel in: EVMS moet "timely, reliable, and verifiable information for the Contract Performance Report (CPR) and the **Integrated Master Schedule (IMS)**" leveren; een Integrated Baseline Review binnen 180 dagen na gunning; 30 dagen om te reageren op geconstateerde tekortkomingen en 45 dagen voor een corrective action plan; betalingsinhouding bij afkeuring; doorwerking naar onderaannemers op $50M-niveau.
Bron: <https://www.acquisition.gov/dfars/252.234-7002-earned-value-management-system.> (klasse A)

Voor civiele agencies geldt FAR Subpart 34.2: EVMS "is required for major acquisitions for development, in accordance with OMB Circular A-11", conform EIA-748, met IBR's. Belangrijk detail: **een inschrijver zonder gevalideerd EVMS mag niet worden uitgesloten** — hij mag een compliance-plan indienen.
Bron: <https://www.acquisition.gov/far/subpart-34.2> (klasse A)

**Effect op softwarekeuze.** EIA-748 schrijft geen product voor. Maar de eis van een *IMS* die verifieerbaar koppelt aan kostenrapportage duwt organisaties richting gereedschap met resource- en kostentoewijzing op activiteitniveau, WBS-/OBS-structuren, control accounts, work packages en planning packages. Dat is precies de featureset waarop Primavera P6, Deltek Open Plan/Cobra en Microsoft Project + een EVM-laag concurreren. De norm creëert de categorie; de categorie kent drie ingezeten spelers.

**Historische context (klasse D):** DoD's Cost/Schedule Control Systems Criteria uit 1967 telde 35 criteria; bij de overdracht aan de industrie in 1995–1998 werden dat de 32 richtlijnen van ANSI/EIA-748. Australië codificeerde EVM als AS 4817-2003/2006. PMI publiceerde in 2019 zijn eigen EVM-standaard als ANSI/PMI 19-006-2019.
Bronnen: <https://en.wikipedia.org/wiki/Earned_value_management>, <https://en.wikipedia.org/wiki/Project_Management_Institute>

### 4.2 DCMA 14-Point Assessment

De autoritatiefste beschrijving die ik kon verifiëren staat niet bij DCMA zelf (dcma.mil gaf 404) maar in de GAO-gids, Appendix VII (klasse A):

> "In its assessment of the quality of a schedule, DCMA uses a 14-Point Assessment (14PA), a collection of measures intended to assess the technical structure of the schedule as well as the contractor's ability to plan and execute work."

De veertien maten, letterlijk uit GAO-16-89G p. 190:

| # | Maat | # | Maat |
|---|---|---|---|
| 1 | Logic | 8 | High duration |
| 2 | Leads | 9 | Invalid dates |
| 3 | Lags | 10 | Resources |
| 4 | Relationship types | 11 | Missed tasks |
| 5 | Hard constraints | 12 | Critical path test |
| 6 | High float | 13 | Critical path length index |
| 7 | Negative float | 14 | Baseline execution index |

GAO citeert één drempel expliciet: *"no more than 5 percent of remaining tasks should be missing predecessor or successor logic"*. En — dit is cruciaal en wordt in de vakpers vrijwel altijd verkeerd weergegeven:

> "However, DCMA's 14PA thresholds are **not compliance triggers**. Rather, they are used as a starting point toward an objective analysis of the schedule."

Bron: GAO-16-89G, <https://www.gao.gov/assets/gao-16-89g.pdf>, p. 190 (klasse A, publicatiedatum 22 december 2015)

De volledige drempelset zoals die in de praktijk circuleert (klasse **E** — overgenomen uit een open-source implementatie, *niet* uit een DCMA-document; behandel als indicatief):

| # | Check | Circulerende drempel |
|---|---|---|
| 1 | Logic (ontbrekende voorganger/opvolger) | ≤ 5% |
| 2 | Leads (negatieve lag) | 0% |
| 3 | Lags | ≤ 5% |
| 4 | Relationship types (aandeel FS) | ≥ 90% |
| 5 | Hard constraints | ≤ 5% |
| 6 | High float (> 44 dagen) | ≤ 5% |
| 7 | Negative float | 0% |
| 8 | High duration (> 44 dagen) | ≤ 5% |
| 9 | Invalid dates | 0% |
| 10 | Resources | 100% belast (indien vereist) |
| 11 | Missed tasks | ≤ 5% |
| 12 | Critical path test | ≥ 1 dag doorwerking |
| 13 | CPLI | ≥ 0,95 |
| 14 | BEI | ≥ 0,95 |

Bron: <https://raw.githubusercontent.com/oacelik/dcma-14-points-checker/main/README.md> (klasse E)

**Waar de lock-in echt zit.** Niet in de veertien getallen, maar in de literatuurlijst van GAO-16-89G. DCMA publiceerde **drie aparte IMS-assessmentgidsen, één per softwareproduct**:

- *Project® Integrated Master Schedule Assessment Guide*, EVC-101 Rev11, 27 maart 2013
- *Open Plan Integrated Master Schedule Assessment Guide*, EVC-102 Rev8, 27 maart 2013
- *Primavera® Integrated Master Schedule Assessment Guide*, EVC-103 Rev7, 27 maart 2013
- plus *Overview: 14 Point Assessment*, EVC-104 Rev1 (z.d.), *Finding the Program Critical Path*, EVC-100 Rev1, 20 november 2012, en *Schedule Margin*, EVC-106 Rev2, 14 maart 2013.

Bron: GAO-16-89G, referentielijst (klasse A)

Een toezichthouder die zijn methodiek per product operationaliseert, definieert daarmee impliciet de verzameling toelaatbare producten. Een vierde tool heeft geen EVC-gids en dus geen toetsprocedure. **[Schatting]** Dit is naar mijn inschatting het onderschatste hoofdmechanisme van de hele markt: niet de norm sluit tools uit, de *toetsingsinfrastructuur* doet dat. Redenering: DCMA moet reproduceerbaar en juridisch houdbaar toetsen; dat vereist tool-specifieke veldmappings (waar staat "total float", hoe heet "constraint type"); die mapping is arbeid; die arbeid wordt alleen verricht voor tools met marktaandeel; dus wint marktaandeel opnieuw marktaandeel.

Ook relevant: DCMA beoordeelt alleen scope die **onder contract** staat, beoordeelt resource loading alleen als het contract dat eist, en toetst **geen** schedule risk analysis tenzij contractueel vereist — omdat SRA geen onderdeel is van de EIA-748-richtlijnen. Verder staat DCMA onbeperkt gebruik van *soft* date constraints toe, waar GAO die wil minimaliseren en verantwoorden. (GAO-16-89G, Appendix VII)

### 4.3 GAO Schedule Assessment Guide (GAO-16-89G)

Publicatie 22 december 2015, 240 pagina's. Doelgroep: "the federal audit community" — GAO, Inspectors General, agency audit services. Het is geen contracteis, maar wel het criterium waarmee federale programma's achteraf worden afgerekend, en het is doorvertaald in agency-handboeken (o.a. het DHS *Scheduling Handbook* van 29 augustus 2014, dat GAO's tien best practices één-op-één overneemt).

**Tien best practices → vier kenmerken:**

| Kenmerk | Best practices |
|---|---|
| **Comprehensive** | 1 Capturing all activities · 3 Assigning resources to all activities · 4 Establishing the durations of all activities |
| **Well constructed** | 2 Sequencing all activities · 6 Confirming that the critical path is valid · 7 Ensuring reasonable total float |
| **Credible** | 5 Verifying horizontal and vertical traceability · 8 Conducting a schedule risk analysis |
| **Controlled** | 9 Updating the schedule using actual progress and logic · 10 Maintaining a baseline schedule |

Bron: GAO-16-89G, Tabel 7, p. 149 (klasse A)

**De formaateis.** In de Data Collection Instrument (Appendix) staat de meest directe uitspraak over bestandsformaten die ik in enig normdocument heb gevonden:

> "The baseline IMS and the latest updated IMS, including all applicable embedded project schedules. Their format should be that of a **software schedule file. PDF files and presentation slides are not valid schedule file formats.** The name and version of the software used to create and maintain the schedule are provided."

Bron: GAO-16-89G (klasse A)

Dit is formaatneutraal geformuleerd — er staat geen productnaam — maar het sluit elke rapportgebaseerde levering uit en het dwingt de auditor het bestand te *openen*. Openen betekent: een tool hebben die het leest. In de praktijk is dat P6 of MS Project.

Verder eist GAO expliciet een **schedule risk analysis** (BP8, Monte-Carlo-achtige statistische simulatie voor een confidence level en tijdcontingentie), een **schedule narrative** en een **basis document** dat aannames, constraints, lags en custom fields verantwoordt. Dat laatste is functioneel een datawoordenboek — feitelijk een erkenning dat schedulebestanden zonder metadata onleesbaar zijn.

---

## 5. Het scherpste regime: USACE / NAVFAC / AFCEC bouwspecificatie

Dit is de belangrijkste vondst van dit onderzoek en verdient een eigen sectie, omdat het het enige document is dat ik heb gevonden waarin een overheid **expliciet, bij naam, in bestektekst** een commercieel planningsproduct tot norm verheft.

**Document:** UFGS 01 32 01.00 10 *Project Schedule*, augustus 2023, Change 1 08/24, opsteller USACE, geldig voor USACE / NAVFAC / AFCEC. Vervangt de editie van februari 2015.
Bron: <https://www.wbdg.org/ffc/dod/unified-facilities-guide-specifications-ufgs/ufgs-01-32-01-00-10> (PDF geëxtraheerd en integraal gelezen; klasse A)

### 5.1 De softwareclausule, letterlijk

> **2.1.1 Government Default Software** — "The Government uses Primavera P6. Ensure exported schedule files are compatible with the version of P6 used by the Government."
>
> **2.1.2 Contractor Software** — "Scheduling software used by the contractor must be commercially available from the software vendor for purchase with vendor software support agreements available. The software routine used to create the required sdef file must be created and supported by the software manufacturer."
>
> **2.1.2.1 Primavera** — "If Primavera P6 is selected for use, provide the 'xer' export file in a version of P6 importable by the Government system. ... Export the schedule in a version of P6 no newer than that used by the Government."
>
> **2.1.2.2 Other Than Primavera** — "If the Contractor chooses software other than Primavera P6, that is compliant with this specification, **provide for the Government's use two licenses, two computers, and training for two Government employees** in the use of the software. These computers will be stand-alone and not connected to Government network. Computers and licenses will be returned at project completion."

### 5.2 Waarom dit de hardste lock-in in de markt is

| Clausule | Effect |
|---|---|
| "The Government uses Primavera P6" | Maakt P6 de nulhypothese. Elk ander product is een afwijking die verantwoord en gecompenseerd moet worden. |
| "two licenses, two computers, and training" | Zet een concrete, aan afwijking gekoppelde **kostenboete** op productkeuze. **[Schatting]** In de orde van enkele tienduizenden dollars per project voor een commercieel alternatief, en niet-nul zelfs voor gratis software (hardware + training blijven verplicht). |
| "commercially available ... with vendor software support agreements available" | Sluit een puur community-onderhouden open-sourceproject formeel uit. Dit is de enige zin in het hele corpus die open source *rechtstreeks* diskwalificeert. |
| "software routine ... created and supported by the software manufacturer" | De SDEF-exporteur mag geen los script of plug-in van een derde zijn. Sluit "gebruik gewoon MPXJ ernaast" uit. |
| §1.3 plannerkwalificatie: "at least three previous construction schedules for projects of similar size and complexity ... **using Primavera P6**" | Verplaatst de lock-in van software naar arbeidsmarkt. Zelfs als de tool zou mogen, moet de mens P6-ervaring hebben. |
| §3.12 "PRIMAVERA P6 MANDATORY REQUIREMENTS" | Zie hieronder — de facto onvertaalbaar. |

### 5.3 §3.12 — productinstellingen als contracttekst

Elf verplichte instellingen, integraal:

a. Activity Codes op **Project**-niveau, niet Global of **EPS**-niveau
b. Kalenders op Project-niveau, niet Global of Resource-niveau
c. Activity Duration Type = `Fixed Duration & Units`
d. Percent Complete Type = `Physical`
e. Time Period Admin Preferences op default `8,0 u/dag, 40 u/week, 172 u/maand, 2000 u/jaar`; Calendar Work Hours/Day = 8,0
f. Schedule Option voor kritieke activiteiten = `Longest Path`
g. Schedule Option voor voortgang = `Retained Logic`
h. Kostenbelasting via één lumpsum non-labor resource, `Price/Unit = $1/hr`, `Default Units/Time = 8h/d`, `Auto Compute Actuals` en `Calculate costs from units` uitgevinkt
i. Activity ID's maximaal 10 tekens
j. Activiteitnamen met werkwoord-zelfstandignaamwoordstructuur, meest onderscheidende informatie in de eerste 30 tekens
k. Gelijk dagelijks eindtijdstip voor alle werkkalenders

`EPS`, `Fixed Duration & Units`, `Longest Path`, `Retained Logic`, `Auto Compute Actuals` — dit zijn geen planningsconcepten, dit zijn **UI-labels van één product**. Een concurrent kan de semantiek repliceren, maar kan niet aantonen dat "de instelling" op de voorgeschreven waarde staat, want de instelling bestaat bij hem niet. Dit is het verschil tussen een formaatmandaat (oplosbaar) en een instellingsmandaat (niet oplosbaar).

### 5.4 De geldkoppeling en de normatieve verwijzingen

- §3.2.3: niet voldoen kan leiden tot afkeuring van de planning-update en **verwerping van betalingsaanvragen**; bij niet doorvoeren van opgedragen revisies mag de contracting officer **10 procent van elke betalingstermijn inhouden**.
- §3.11: betalingsverwerking is gekoppeld aan upload van scheduledata naar RMS (Resident Management System), onder FAR 52.232-5 en FAR 52.232-27.
- Normatief ingelezen documenten (§1.1 REFERENCES) — hiermee worden vrijwillige beroepsstandaarden **contractueel bindend**:

| Referentie | Titel | Jaar |
|---|---|---|
| AACE 29R-03 | Forensic Schedule Analysis | 2011 |
| AACE 52R-06 | Time Impact Analysis — As Applied in Construction | 2006 |
| AACE 84R-13 | Planning and Accounting for Adverse Weather | 2015 |
| ASCE 67-17 | Schedule Delay Analysis | 2017 |
| USACE ER 1-1-11 | Administration — Project Schedules | 2017 |

Dit is het mechanisme waarmee AACE-RP's van "aanbeveling" naar "eis" promoveren: niet door AACE, maar doordat een bestekschrijver ze in de referentielijst zet.

---

## 6. SDEF: het enige verplichte open formaat

**Document:** USACE ER 1-1-11 *Project Schedules*, 18 september 2017 (vervangt de editie van 15 juni 1995), Appendix A.
Bron: <https://www.publications.usace.army.mil/Portals/76/Publications/EngineerRegulations/ER_1-1-11.pdf> (klasse A)

> "The Standard Data Exchange Format (SDEF) provides a **nonproprietary protocol** to exchange project planning and progress data between scheduling systems."

Technisch profiel (Appendix A, Part 1–2):
- 132 tekens, vast kolomformaat, ASCII
- tekst links uitgelijnd, getallen rechts uitgelijnd; geen zero-fill; geen lege regels; kolommen gescheiden door één spatie
- verplichte recordvolgorde: Volume → Project → Calendar → Holiday → Activity → Precedence → Unit Cost → Progress
- doel: transfer tussen contractor QCS en government RMS

En in de NOTE-blokken van UFGS 01 32 01.00 10 staat waarom dit ertoe doet:

> "If it is desired to monitor a Contractor's schedule by use of an in-house program, this will require use of the Standard Data Exchange Format (SDEF). **Use of proprietary systems will not be specified.** See ER 1-1-11, Appendix A."

Dit is de enige plek in het hele onderzochte corpus waar een overheid actief zegt: als je *niet* het commerciële product gebruikt, is er een open formaat. Het beleid van ER 1-1-11 zelf is bovendien formaatneutraal in de scheduling-methode: "Bar charts can be used to manage simple projects. On complex construction projects ... a Critical Path Method (CPM) project schedule is recommended" — met CPM als *aanbeveling*, waarbij de Chief of Construction de methode bepaalt.

Praktisch belangrijk: **MPXJ (LGPL) kan SDEF schrijven** via `SDEFWriter`/`UniversalProjectWriter`. Bron: <https://www.mpxj.org/howto-write-sdef/> (klasse B). Er bestaat dus al een open-source referentie-implementatie van het enige verplichte open planningsformaat ter wereld.

---

## 7. Formaatlaag: wat er feitelijk over de lijn gaat

| Formaat | Eigenaar | Publiek gespecificeerd? | Lezen (open source) | Schrijven (open source) | Voorgeschreven door |
|---|---|---|---|---|---|
| `.xer` | Oracle (Primavera P6) | Nee — de facto standaard, reverse-engineered | Ja (MPXJ, PyP6Xer, xer-reader) | Ja (MPXJ) | UFGS 01 32 01.00 10 §2.1.2.1 |
| P6 XML / PMXML | Oracle | Deels (XSD bij product) | Ja (MPXJ) | Ja (MPXJ) | Veelgevraagd, niet in de door mij gelezen normteksten met naam genoemd |
| `.mpp` | Microsoft | Nee | Ja (MPXJ) | **Nee** — MPXJ: "the knowledge we have of the file structure is still relatively incomplete" | — |
| MSPDI (MS Project XML) | Microsoft | Ja (XSD) | Ja (MPXJ) | Ja (MPXJ) | — |
| **SDEF** | **USACE (publiek)** | **Ja — ER 1-1-11 App. A** | Ja | **Ja (MPXJ)** | **UFGS / ER 1-1-11** |
| Asta / Powerproject | Elecosoft | Nee | Ja (MPXJ) | Nee | — |
| IFC 4.3 (`IfcWorkSchedule`) | buildingSMART / ISO 16739 | **Ja, volledig openbaar** | Ja | Ja | **Nergens als planningsdeliverable aangetroffen** |

Bronnen: <https://www.mpxj.org/>, <https://github.com/joniles/mpxj>, <https://www.mpxj.org/faq/>, <https://ifc43-docs.standards.buildingsmart.org/> (klasse B/A)

Voor de volledigheid, de MPXJ-scope (v16.5.0, 3 juli 2026, LGPL, 338 sterren, 116 forks):
- **Lezen:** MPX, MPP, MSPDI, MPD, Planner, P6 PMXML, P6 XER, P3, SureTrak, Asta Powerproject, Asta Easyplan, Phoenix, FastTrack, GanttProject, TurboProject, ConceptDraw PROJECT, Synchro, Gantt Designer, SDEF, Sage 100 Contractor Schedule Grid, Project Commander, Deltek Open Plan BK3, Edraw Project EDPX + servers (MS Project Server, MS Planner, P6 Web Services, Oracle Primavera Cloud)
- **Schrijven:** MPX, MSPDI, PMXML, XER, Planner, SDEF

**IFC 4.3 scheduling-datamodel** (klasse A, buildingSMART):
- `IfcWorkSchedule` — StartTime, FinishTime, Duration, **TotalFloat**, PredefinedType, Pset_WorkControlCommon
- `IfcTaskTime` — ScheduleDuration/Start/Finish, **EarlyStart, EarlyFinish, LateStart, LateFinish, FreeFloat, TotalFloat, IsCritical, StatusTime**, ActualStart/ActualFinish/ActualDuration, RemainingTime, Completion
- relaties via `IfcRelAssignsToControl`, kalender toegewezen aan de summary task

Conclusie van deze tabel: **IFC is het best gedocumenteerde en meest open planningsformaat in de tabel, en het enige dat nergens gevraagd wordt.**

---

## 8. Europese en internationale contractregimes

### 8.1 NEC3 / NEC4 — clause 31/32

Wie legt het op:
- **Verenigd Koninkrijk:** de Efficiency and Reform Group van het Cabinet Office beveelt NEC aan voor publieke bouwaanbestedingen; NEC is "the default suite of contracts for public-sector works, services and supplies in the United Kingdom".
- **Hongkong:** de overheid besloot NEC3 algemeen te gebruiken voor alle in 2015/16 aanbestede overheidsprojecten en vervolgens voor alle toekomstige public works "as far as practicable"; sinds 2017 overgang naar NEC4.
- Verder in gebruik in Australië, Ierland, **Nederland**, Nieuw-Zeeland, Peru, de Filipijnen, Zuid-Afrika en de VAE.

Bron: <https://en.wikipedia.org/wiki/New_Engineering_Contract> (klasse D)

Wat het oplegt (klasse D, Designing Buildings Wiki):
- De aannemer levert een programma dat "practicable and realistic" is, "showing when the contractor intends to carry out each part of the works and identifying the resource they intend to use"; na acceptatie door de project manager wordt dit de **Accepted Programme** en daarmee de contractuele baseline.
- NEC4 introduceerde **"treated acceptance"**: reageert de project manager niet binnen de termijn, dan geldt het programma als geaccepteerd.
- **De sanctie:** "Without an accepted programme the contract cannot be administered properly. Under such circumstances, **25% of payments can be withheld**, and it is not possible to assess compensation events."

Bron: <https://www.designingbuildings.co.uk/wiki/Accepted_programme> (klasse D)

**Effect op softwarekeuze.** NEC noemt geen product. Maar de combinatie van (a) 25% inhouding, (b) periodieke herindiening bij elke compensation event, en (c) de eis dat de planning ook *middelen* en *methode* toont, maakt het programma tot een juridisch document dat maandelijks moet worden herbouwd en verdedigd. Dat drijft de Britse markt naar tools met sterke baseline-vergelijking en change-impactanalyse. **[Schatting]** In het VK is dat historisch vooral Asta Powerproject (Elecosoft) naast P6; ik heb geen harde marktaandeelcijfers kunnen verifiëren en presenteer dit dus uitsluitend als niet-gekwantificeerde indruk.

Verwante Britse beleidslaag: de **Construction Playbook** legt 14 kernbeleidsregels op aan alle centrale departementen en hun arm's-length bodies, op **'comply or explain'**-basis.
Bron: <https://www.gov.uk/government/publications/the-construction-playbook> (klasse A/B)

### 8.2 FIDIC

FIDIC (International Federation of Consulting Engineers, opgericht 1913) publiceert de "rainbow suite": Red Book (Construction, 2e ed. 2017), Yellow Book (Plant & Design-Build, 2e ed. 2017), Silver Book (EPC/Turnkey, 2e ed. 2017), Green Book (Short Form, 2e ed. 2021), White Book (Client/Consultant, 5e ed. 2017), Emerald Book (Underground Works, 2019). In 2005 verscheen de **MDB Harmonised Edition** van het Red Book, "for bank financed projects only" — de route waarlangs Wereldbank- en andere multilaterale-ontwikkelingsbankprojecten FIDIC de facto verplicht stellen.

Bronnen: <https://en.wikipedia.org/wiki/FIDIC> (klasse D), <https://www.fidic.org/bookshop/about-bookshop> (klasse B), <https://www.designingbuildings.co.uk/wiki/FIDIC> (klasse D)

**Beperking:** ik heb de tekst van sub-clause 8.3 (Programme) **niet** kunnen verifiëren — fidic.org publiceert de contractteksten niet vrij en de secundaire bronnen die ik kon bereiken behandelden de clausule niet. Zie §10.

### 8.3 AACE International

AACE (opgericht 1956, ~120 Recommended Practices, ruim 8.000 leden per 2012, certificeringen PSP Planning & Scheduling Professional, EVP Earned Value Professional, CFCC Certified Forensic Claims Consultant) is formeel een vrijwillige beroepsvereniging.
Bronnen: <https://en.wikipedia.org/wiki/AACE_International> (klasse D), <https://web.aacei.org/resources/publications/recommended-practices> (klasse B)

De relevantie zit in de doorwerking: zoals in §5.4 gedocumenteerd, verwijst UFGS 01 32 01.00 10 normatief naar **AACE 29R-03 (2011) Forensic Schedule Analysis**, **AACE 52R-06 (2006) Time Impact Analysis** en **AACE 84R-13 (2015) Planning and Accounting for Adverse Weather**. Vanaf dat moment zijn ze contractueel bindend voor dat project. Voor delay claims is 29R-03 wereldwijd de meest geciteerde methodologie.

**Effect op softwarekeuze.** 29R-03 methoden (observational/modelled, static/dynamic logic, as-planned vs as-built, collapsed as-built, windows analysis) vereisen: meerdere baseline-versies naast elkaar, herrekenen met historische data dates, fragnet-invoeging, en het bewaren van *elke* update als afzonderlijke, herberekenbare toestand. Tools zonder degelijk versiebeheer van planningen vallen daarmee af voor claimwerk — dat is een functionele, niet-productgebonden lock-in, en dus in principe door open source te bedienen.

### 8.4 PMI en ISO — de zachte laag

| Standaard | Editie/jaar | Status |
|---|---|---|
| PMI *Practice Standard for Scheduling* | 3e editie, 2019 | Vrijwillig |
| PMBOK Guide | 7e editie, 2021 = ANSI/PMI 99-001-2021 | ANSI-erkend, vrijwillig |
| PMI *Standard for Earned Value Management* | 2019 = ANSI/PMI 19-006-2019 | ANSI-erkend, vrijwillig |
| ISO 21500:2021 *Project, programme and portfolio management — Context and concepts* | 2021 | Guidance, **niet certificeerbaar** |
| ISO 21502:2020 *Guidance on project management* | 2020 | Guidance, niet certificeerbaar |

Bronnen: <https://en.wikipedia.org/wiki/Project_Management_Institute>, <https://en.wikipedia.org/wiki/ISO_21500> (beide klasse D)

ISO 21500:2012 was 47 pagina's en beperkte zich tot processen, inputs en outputs — "not intended to be used for certification/registration purposes". Bij de herziening werd 21500 het concept-/contextdocument en nam 21502 de rol van guidance-standaard over.

**Effect op softwarekeuze: praktisch nul.** Deze documenten schrijven geen datamodel, geen formaat en geen metriek voor die een tool kan schenden. Ze worden in aanbestedingen wel als *kwalificatie-eis voor personen* gebruikt (PMP, PSP), niet als producteis. PMI meldt per 2025 746.689 leden in 217 landen — dat maakt PMI een grote arbeidsmarktfactor en een kleine softwarefactor.

---

## 9. De commerciële laag: prijzen, ecosysteem en toolingaanbod

### 9.1 Wat publiek is en wat niet

| Leverancier/product | Publieke prijs? | Cijfer | Bron |
|---|---|---|---|
| Microsoft Project Standard 2024 | Ja | **$679,99** eenmalig | <https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software> |
| Microsoft Project Professional 2024 | Ja | **$1.129,99** eenmalig | idem |
| Microsoft Project Plan 1/3/5 (cloud) | Niet op de vergelijkingspagina aangetroffen | — | idem |
| Microsoft Project Server Subscription Edition | Nee — "Find a partner" | — | idem |
| Oracle Primavera P6 EPPM / Professional | **Nee** | — | Oracle's prijslijstindex bevat geen Construction & Engineering/Primavera-lijst: <https://www.oracle.com/corporate/pricing/> |
| Oracle Primavera Cloud | **Nee** | — | idem |
| Deltek Acumen Fuse | **Nee** — "Request a Demo" | — | <https://www.deltek.com/en/products/project-and-portfolio-management/acumen> |
| Steelray Project Analyzer | Nee | — | <https://www.steelray.com/> |

**Bevinding:** Oracle publiceert wél prijslijsten voor E-Business Suite, Fusion, Siebel, PeopleSoft, JD Edwards, MySQL, Java SE en diverse cloudlijnen, maar **geen enkele publieke prijslijst voor Primavera / Construction & Engineering**. Ik heb de Oracle E-Business Suite Global Price List van 6 november 2025 (15 pagina's) integraal doorzocht: 0 treffers op "Primavera", "P6", "Construction", "Unifier". Prijsopaciteit is hier dus een gecontroleerde keuze, geen toeval.

Dat is relevant voor dit thema: waar een norm een product afdwingt en de prijs van dat product niet publiek is, verliest de afnemer twee keer — geen keuze én geen prijsvergelijking.

Zijdelings bewijs voor de omvang van het P6-dienstenecosysteem: een zoekopdracht op "primavera" in de UK G-Cloud (Crown Commercial Service) levert **87 diensten** op van o.a. Hyde Park Solutions, i3Works, Th3rd Curve, TRC Companies, RPC UK en Primo Milestone — in de categorieën Cloud Software, Cloud Support en Cloud Hosting. Geen van de resultaten toonde prijzen in het overzicht.
Bron: <https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/search?q=primavera> (klasse C)

Historisch marktaandeel (klasse D, **verouderd — 2008, betreft de voorganger P3, niet P6**): P3 had ongeveer 25% van de heavy-constructionmarkt tegen 11% voor de naaste concurrent; bijna 40% van de general contractors met $5–10M omzet gebruikte P3. Oracle nam Primavera Systems over in 2008 en stopte de verkoop van P3 en SureTrak op 31 december 2010.
Bron: <https://en.wikipedia.org/wiki/Primavera_(software)>

### 9.2 De compliance-toolinglaag

Commercieel:
- **Deltek Acumen Fuse** — "600+ industry-aligned metrics" met packs voor **DCMA, DOE, NASA, GAO en AACE**; integreert met Deltek Open Plan, Oracle Primavera P6, Microsoft Project, Phoenix Project Manager en Asta Powerproject; levert "IPMDAR-compliant outputs"; risico-aangepaste schema's kunnen "back to these native tools with full logic preserved" worden geëxporteerd. Geen publieke prijs.
  Bron: <https://www.deltek.com/en/products/project-and-portfolio-management/acumen> (klasse B)
- Steelray Project Analyzer — bestaat, details en prijs niet publiek toegankelijk.

Open source (GitHub-inventarisatie via API, 25 juli 2026):

| Repository | Doel | Sterren | Licentie |
|---|---|---|---|
| joniles/mpxj | Multi-format lees/schrijfbibliotheek | **338** | LGPL |
| HassanEmam/PyP6Xer | XER-parser (Python) | 66 | — |
| djouallah/xer-reader | XER via Excel VBA | 39 | — |
| JaiLaff/XER-Splitter | XER-parsing | 32 | — |
| jjCode01/xer-reader | XER-parser (Python) | 21 | — |
| paulieb89/pyp6xer-mcp | P6-analyse als MCP-server | 12 | — |
| osama-ata/p6xer-mcp-server | idem | 10 | — |
| **Alle 30 treffers op "DCMA 14 point schedule assessment"** | Kwaliteitschecks | **max. 2** | — |

De DCMA-checkers zijn zonder uitzondering recente, kleine, één-persoons-projecten (oacelik/dcma-14-points-checker: 2 sterren; VitorMRodovalho/meridianiq: 1 ster met 49 open issues; de rest 0 sterren).

**[Schatting] Interpretatie:** twee lezingen zijn mogelijk en ik kan met deze data niet tussen beide kiezen. (a) *Marktgat*: de compliance-laag is nooit geopensourced omdat de gebruikers institutionele inkopers zijn die commercieel kopen — dus een goed open alternatief zou aanslaan. (b) *Marktsignaal*: de doelgroep is te klein en te conservatief om community-momentum te genereren — de vele doodgeboren repo's zijn het bewijs. Het feit dat MPXJ na ruim tien jaar op 338 sterren staat terwijl het technisch onmisbaar is, neigt naar (b): dit is een kleine, professionele, niet-virale markt. Redenering: 338 sterren is voor een bibliotheek die letterlijk elk relevant planningsformaat leest extreem laag; ter vergelijking, generieke diagram-plug-ins in dezelfde zoekresultaten scoren 319–468 sterren.

---

## 10. Expliciete onzekerheden en niet-geverifieerde punten

Ik markeer dit apart omdat de opdracht expliciet om enkele regimes vroeg die ik in deze ronde **niet** heb kunnen staven. Deze punten horen in het rapport, maar niet als feit.

| Onderwerp | Status | Wat ik wél weet | Wat ontbreekt |
|---|---|---|---|
| **Verplichte XER/P6 XML-levering bij Rijkswaterstaat** | **X — niet geverifieerd** | PIANOo bevestigt het Nederlandse GWW-kader (UAV, UAV-GC, RAW, D&C/DBM/DBFM, bouwteam). <https://www.pianoo.nl/nl/sectoren/gww> | Geen bron gevonden die RWS een specifiek planningsformaat of -product laat voorschrijven. **Niet claimen zonder aanvullend onderzoek in RWS-vraagspecificaties.** |
| **National Highways (UK) planningsformaat-eis** | **X — niet geverifieerd** | National Highways mandateert DMRB, MCHW, ADMM, OTSL en RRRAP. <https://nationalhighways.co.uk/work-with-us/suppliers/design-standards-and-specifications/> | Geen van deze gepubliceerde standaarden bleek een planning-/scheduling- of softwareformaat-eis te bevatten. |
| **Golfstaten (Aramco, ADNOC, Ashghal, NEOM) P6-mandaat** | **X — niet geverifieerd** | Niets. | Dit is breed verspreide branchekennis, maar ik heb er in deze ronde geen enkele primaire bron voor. Behandel als onbevestigd. |
| **CIOB Guide to Good Practice in the Management of Time** | **X — niet geverifieerd** | Niets uit primaire bron; ciob.org-URL's gaven 404. | Editie, jaar, inhoud (schedule density, tijdmodel, competentie-eisen) en de opvolger voor *Major Projects* zijn allemaal ongeverifieerd. |
| **FIDIC sub-clause 8.3 tekst** | **X — niet geverifieerd** | Boekenreeks en MDB Harmonised Edition wél bevestigd. | De letterlijke programma-eisen, indieningstermijnen en sancties van 8.3. |
| **IPMDAR (DI-MGMT-81861B/C)** | **Gedeeltelijk** | GAO-16-89G bevestigt **DI-MGMT-81861 *Integrated Program Management Report*, 20 juni 2012**, en **DI-MGMT-81650 *Integrated Master Schedule*, 30 maart 2005**. Deltek claimt "IPMDAR-compliant outputs". | Revisieletter, huidige datum en de exacte gemandateerde bestandsformaten van de Schedule Performance Dataset. acq.osd.mil en dau.edu waren niet bereikbaar (503 / hostredirect). |
| **DCMA 14PA-drempelwaarden** | **Klasse E** | GAO bevestigt de 14 namen en één drempel (5% logic). | De overige 13 drempels komen uit een community-implementatie, niet uit een DCMA-document. |
| **EIA-748 revisieletter** | **Onbekend** | FAR/DFARS verwijzen naar "ANSI/EIA-748" zonder revisie; 32 richtlijnen bevestigd. | Ik noem bewust geen revisieletter. |
| **Marktaandeelcijfers P6 vs. MS Project vs. Asta, actueel** | **Onbekend** | Alleen 2008-cijfers voor de voorganger P3. | Geen actuele, verifieerbare bron gevonden. Alle in de vakpers circulerende percentages zijn zonder methodologie; niet overnemen. |

Twee methodologische waarschuwingen bij het lezen van dit thema in andere rapporten:

1. **De DCMA 14-point wordt structureel verkeerd voorgesteld** als een slaag/zak-toets. GAO stelt letterlijk dat de drempels "not compliance triggers" zijn. Elke leverancier die "DCMA-compliant" claimt, claimt iets dat niet bestaat.
2. **"EVMS-gecertificeerde software" bestaat niet.** EIA-748-validatie is een beoordeling van het *managementsysteem van de aannemer* door de cognizant Federal agency, niet van een softwareproduct. Software kan compliance *faciliteren*; certificeren kan het niet.

---

## 11. Betekenis voor een open-source, IFC-gebaseerde planner (Open Planner Studio)

### 11.1 De strategische situatie in één alinea

Open Planner Studio zit aan de verkeerde kant van vijf van de zes lock-in-mechanismen uit §1, en aan de goede kant van precies één: de *data*. IFC 4.3 draagt via `IfcTaskTime` al elk veld dat GAO's tien best practices en DCMA's veertien maten nodig hebben — early/late dates, free float, total float, `IsCritical`, status time, actuals. Er is geen datamodel-gat. Er is een **acceptatie-gat**: geen enkele onderzochte aanbesteding accepteert IFC als planningsdeliverable, en één (UFGS) sluit niet-commercieel ondersteunde software expliciet uit.

### 11.2 Wat wel kan — concreet en geprioriteerd

**Prioriteit 1 — SDEF-export.** Dit is de enige plek in het hele corpus waar een overheid een open formaat *voorschrijft* en er expliciet bij zegt dat het bedoeld is voor niet-proprietaire systemen. Het formaat is volledig publiek gespecificeerd (ER 1-1-11 Appendix A: 132 tekens, vast kolomformaat, ASCII, acht recordtypen in vaste volgorde). Het is een van de simpelste exportformaten die er bestaan — vermoedelijk enkele honderden regels TypeScript. Het mapt bovendien schoon op wat de OPS-store al heeft: kalenders, feestdagen, activiteiten, precedence-relaties, unit costs, progress. **[Schatting]** Van alle compliance-investeringen die OPS kan doen is dit de hoogste waarde per regel code.
  Kanttekening: UFGS §2.1.2 eist dat de SDEF-routine "created and supported by the software manufacturer" is. Voor OPS betekent dat: de exporteur moet in de kern zitten, niet in een extensie van een derde.

**Prioriteit 2 — XER-export (en PMXML).** Het formaatmandaat is het enige lock-in-mechanisme dat een converter kan breken. MPXJ bewijst dat XER schrijfbaar is en staat onder **LGPL** — licentie-compatibel met OPS (LGPL-3.0). Drie routes, met hun spanning tegen de architectuur van OPS:
  - *Java-sidecar in de Tauri-build* — snel, maar breekt de browserbuild (die volgens CLAUDE.md een echte productie-deployment is) en introduceert een JRE-afhankelijkheid.
  - *MPXJ naar WASM* — behoudt web-pariteit, maar is een fors project.
  - *Eigen XER-writer in TypeScript* — XER is een tabulair tekstformaat; schrijven is aanzienlijk eenvoudiger dan lezen. Voor de subset die een bestek vraagt (TASK, TASKPRED, CALENDAR, PROJECT, PROJWBS, RSRC) waarschijnlijk haalbaar. **[Schatting]** Dit lijkt mij de route die het beste past bij de "geen nieuwe Rust-command, breid `fileAccess` uit"-lijn van het project.
  Belangrijk detail uit UFGS: de export moet in een P6-versie "no newer than that used by the Government" — dus versieselectie bij export is een functionele eis, geen luxe.

**Prioriteit 3 — een schedulekwaliteitspaneel (DCMA 14 + GAO 10).** OPS heeft `CPMSolver`, `CalendarEngine`, total float en een critical-path-vlag al in de store; de veertien maten zijn vrijwel allemaal pure functies over taken en relaties. De concurrentie in open source is, empirisch, nul (§9.2: beste repo 2 sterren). Twee ontwerpvoorwaarden:
  - Presenteer het **niet** als "DCMA-compliant". Presenteer het als "DCMA 14-point indicatoren" met de GAO-nuance erbij ("not compliance triggers"). Dat is zowel eerlijker als juridisch veiliger.
  - Maak de drempels instelbaar. Ze verschillen per opdrachtgever, en de vaak geciteerde set (§4.2) is niet normatief.

**Prioriteit 4 — baseline en narratief.** GAO best practice 10 en de hele NEC-/FIDIC-familie draaien om een bevroren baseline plus een verhalende verantwoording. OPS heeft al een `baselineSlice`. De ontbrekende stukken zijn (a) *meerdere* benoemde baselines naast elkaar met hun eigen data date, want AACE 29R-03 windows-analyse vereist dat, en (b) een basis-/narratiefdocument dat aannames, constraints, lags en custom fields vastlegt — GAO eist dit letterlijk. Dat laatste kan als IFC-property set meereizen en is een natuurlijk IFC-voordeel: één bestand, planning én verantwoording.

### 11.3 Wat niet kan, of niet moet

- **Het instellingsmandaat is niet te winnen.** UFGS §3.12 vraagt om P6-enums. Geen enkele hoeveelheid IFC-correctheid lost dat op. Voor USACE-werk blijft P6 de tool van record; het hoogst haalbare voor OPS daar is *nevengeschikt* gebruik (modelleren, 4D-koppeling, kwaliteitscontrole) met SDEF/XER als brug.
- **Jaag geen EIA-748-"certificering" na.** Die bestaat niet voor software (§10).
- **Schedule risk analysis is een echt gat.** GAO best practice 8 vereist statistische simulatie voor een confidence level en tijdcontingentie. OPS heeft dat niet. Zonder SRA voldoet een planning niet aan het GAO-kenmerk "credible". Tegelijk: DCMA toetst SRA alleen als het contract erom vraagt, en het is geen EIA-748-richtlijn. **[Schatting]** Lagere prioriteit dan SDEF/XER/kwaliteitschecks, maar hoger dan cosmetische features als je de federale markt serieus neemt.
- **Het commercialiteitsmandaat vraagt een commercieel antwoord.** "Commercially available from the software vendor for purchase with vendor software support agreements available" is niet met code op te lossen. Wil OPS ooit *tool of record* zijn op een USACE-achtig contract, dan is een betaalde support-entiteit een noodzakelijke voorwaarde — de klassieke open-core/support-route. Dit is een van de weinige gevallen waar een normtekst een bedrijfsmodel voorschrijft.

### 11.4 De asymmetrie die de kans is

De hele normenstapel gaat over *tijd*: activiteiten, logica, float, kritiek pad, baselines. Geen van de onderzochte regimes zegt iets over de koppeling tussen planning en **bouwwerkgeometrie**. Dat is precies wat een IFC-native planner uniek kan: dezelfde `IfcTask` die de DCMA-checks doorstaat, hangt aan de `IfcProduct` die hij bouwt.

**[Schatting]** De realistische positionering is daarom niet "vervang P6", maar "wees de IFC-kant van de brug": lees XER/SDEF in, koppel aan het model, doe de kwaliteitscontrole die niemand open source doet, schrijf terug in het formaat dat het bestek eist. De normen sluiten OPS uit als *systeem van record*; ze sluiten OPS niet uit als *systeem van waarheid over het bouwwerk*. En SDEF — 132 tekens ASCII, publiek gespecificeerd, expliciet bedoeld voor "in-house programs" — is de deur die de US Army zelf heeft opengezet.

---

## Bronnenlijst

**Klasse A — normteksten en regelgeving**
- GAO, *Schedule Assessment Guide: Best Practices for Project Schedules*, GAO-16-89G, 22 december 2015 — <https://www.gao.gov/products/gao-16-89g> · PDF: <https://www.gao.gov/assets/gao-16-89g.pdf> (240 p., integraal geëxtraheerd)
- DFARS 234.201 *Policy* — <https://www.acquisition.gov/dfars/234.201-policy.>
- DFARS 252.234-7002 *Earned Value Management System* — <https://www.acquisition.gov/dfars/252.234-7002-earned-value-management-system.>
- FAR Subpart 34.2 *Earned Value Management System* — <https://www.acquisition.gov/far/subpart-34.2>
- FAR 52.236-15 *Schedules for Construction Contracts* — <https://www.acquisition.gov/far/52.236-15>
- FAR 36.515 — <https://www.acquisition.gov/far/36.515>
- UFGS 01 32 01.00 10 *Project Schedule*, USACE/NAVFAC/AFCEC, augustus 2023, Change 1 08/24 — <https://www.wbdg.org/ffc/dod/unified-facilities-guide-specifications-ufgs/ufgs-01-32-01-00-10> (24 p., integraal geëxtraheerd)
- USACE ER 1-1-11 *Administration — Project Schedules*, 18 september 2017 — <https://www.publications.usace.army.mil/Portals/76/Publications/EngineerRegulations/ER_1-1-11.pdf> (16 p., integraal geëxtraheerd)
- buildingSMART, IFC 4.3 `IfcWorkSchedule` — <https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkSchedule.htm>
- buildingSMART, IFC 4.3 `IfcTaskTime` — <https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcTaskTime.htm>
- UK Cabinet Office, *The Construction Playbook* — <https://www.gov.uk/government/publications/the-construction-playbook>

**Klasse B — leverancierseigen**
- Microsoft Project prijsvergelijking — <https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software>
- Oracle Primavera P6 EPPM — <https://www.oracle.com/construction-engineering/primavera-p6/>
- Oracle prijslijstindex (geen Primavera-lijst aanwezig) — <https://www.oracle.com/corporate/pricing/>
- Oracle E-Business Suite Applications Global Price List, 6 november 2025 — <https://www.oracle.com/assets/applications-price-list-070574.pdf>
- Deltek Acumen — <https://www.deltek.com/en/products/project-and-portfolio-management/acumen>
- MPXJ — <https://www.mpxj.org/> · SDEF-writer: <https://www.mpxj.org/howto-write-sdef/> · FAQ: <https://www.mpxj.org/faq/>
- Steelray — <https://www.steelray.com/>

**Klasse C — publieke registers**
- GitHub API, repositoryzoekopdrachten "xer primavera parser", "DCMA 14 point schedule assessment", 25 juli 2026
- github.com/joniles/mpxj — 338 sterren, 116 forks, LGPL; release v16.5.0, 3 juli 2026 — <https://github.com/joniles/mpxj> · <https://api.github.com/repos/joniles/mpxj/releases/latest>
- UK G-Cloud Digital Marketplace, zoekterm "primavera", 87 resultaten — <https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/search?q=primavera>

**Klasse D — secundair**
- <https://en.wikipedia.org/wiki/New_Engineering_Contract>
- <https://www.designingbuildings.co.uk/wiki/Accepted_programme>
- <https://www.designingbuildings.co.uk/wiki/NEC4>
- <https://en.wikipedia.org/wiki/FIDIC> · <https://www.fidic.org/bookshop/about-bookshop> · <https://www.designingbuildings.co.uk/wiki/FIDIC>
- <https://en.wikipedia.org/wiki/ISO_21500>
- <https://en.wikipedia.org/wiki/Project_Management_Institute>
- <https://en.wikipedia.org/wiki/AACE_International> · <https://web.aacei.org/resources/publications/recommended-practices>
- <https://en.wikipedia.org/wiki/Earned_value_management>
- <https://en.wikipedia.org/wiki/Primavera_(software)>
- <https://en.wikipedia.org/wiki/Critical_path_method>
- <https://www.pianoo.nl/nl/sectoren/gww>
- <https://nationalhighways.co.uk/work-with-us/suppliers/design-standards-and-specifications/>

**Klasse E — community-implementatie (indicatief)**
- <https://raw.githubusercontent.com/oacelik/dcma-14-points-checker/main/README.md>
