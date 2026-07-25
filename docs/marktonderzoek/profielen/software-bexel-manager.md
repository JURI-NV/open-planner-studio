# BEXEL Manager — diepgaand softwareprofiel

*Marktonderzoek planningssoftware · opgesteld 25 juli 2026 · alle prijzen en pagina's geraadpleegd op 25-07-2026 tenzij anders vermeld*

> **Leeswijzer bij betrouwbaarheid.** Alles wat in dit profiel als feit staat, is terug te voeren op een bron in de bronnenlijst. Waar ik moest schatten of interpreteren staat expliciet **[SCHATTING]** of **[ONBEVESTIGD]**. Dat is hier belangrijker dan gebruikelijk: BEXEL heeft een opvallend *dunne* onafhankelijke reviewbasis (zie §5), waardoor veel van het beschikbare materiaal leveranciersmarketing is.

---

## 1. Wat het is

### Leverancier en eigendom

**BEXEL Manager** is het vlaggenschipproduct van **BEXEL Consulting d.o.o.**, een Servisch softwarebedrijf, **opgericht in 2005** en gevestigd in **Belgrado, Servië** (CB Insights; telefoonnummer +381 11 = Belgrado). **Veljko Janjić** is CEO en mede-oprichter en stuurt zowel de bedrijfsstrategie als de ontwikkeling van de 4D/5D-planningssoftware aan.

Het bedrijf is inmiddels **gerebrand rond het product**: `bexelconsulting.com` doet sinds enige tijd een 301-redirect naar `bexelmanager.com`. Dat is typerend voor de beweging van consultancy-met-tool naar productbedrijf.

> **Let op — veelvoorkomende fout in aggregators.** SourceForge, Slashdot en BIM Tools Hub vermelden **Slovenië** als vestigingsland. Dat is aantoonbaar onjuist: het bedrijf is Servisch (Belgrado, +381). Wie deze aggregators als bron gebruikt, neemt die fout over.

**Omvang:** het Servische vacatureportaal helloworld.rs noemt **20–50 medewerkers** voor Bexel Consulting d.o.o. Dat is vermoedelijk alleen de Servische entiteit.
**[SCHATTING — lage zekerheid]** Totale organisatie inclusief internationale sales/consulting: ~50–150 fte. Omzet: **geen publieke cijfers**; op basis van seatprijzen en bedrijfsomvang ordegrootte **€5–15 mln/jaar**. Beide getallen zijn niet verifieerbaar en moeten als indicatief worden gelezen.

### Doelgroep

Bexel positioneert het platform expliciet voor vier rollencategorieën:

| Categorie | Rollen |
|---|---|
| Management | investeerders, projectmanagers, finance, juridisch |
| BIM & Ontwerp | BIM-managers, coördinatoren, ontwerpers, externe adviseurs |
| Uitvoering & Bouwplaats | planners, veldingenieurs, uitvoerders, KAM-managers |
| Kosten & Control | calculators, hoeveelheidsdeskundigen, documentcontrollers, opleveringsmanagers |

De zwaartepunten liggen bij de **aannemer/hoofduitvoerder** en de **BIM-manager** — niet bij de architect. Het is een uitvoeringsplatform, geen ontwerptool.

### Sectoren en regio's waar het écht gebruikt wordt

Op de eigen site getoonde referenties (een leverancierclaim, maar de logo's zijn concreet en toetsbaar): **Clayco** (VS), **L&T Construction** (India), **Nesma & Partners** (Saoedi-Arabië), **Arup**, **Hochtief**, **PORR**, **BESIX**, **OHL**, **Ferrovial**, **Acciona**, **COWI**.

Dat patroon — plus de **cloudregio's EU, VS en India** — wijst op reële verspreiding in:

- **Zuidoost- en Centraal-Europa** (thuismarkt: Servië/Balkan; daarnaast Oostenrijk/Duitsland via PORR/Hochtief)
- **West-Europa** (BESIX/België, Ferrovial + Acciona/Spanje, COWI/Denemarken)
- **Midden-Oosten** (Nesma & Partners, Golfregio)
- **India** (L&T is een van de grootste aannemers ter wereld; eigen cloudregio)
- **Verenigde Staten** (Clayco; eigen cloudregio)

Bexel claimt gebruikers in **75 landen**; de eigen BEXEL User Day 2024 trok deelnemers uit **25+ landen**. De editie 2026 staat gepland voor september/oktober in Zadar, Kroatië.

**Sectoren:** vooral **utiliteits- en gebouwbouw** (hotels, stadions, ziekenhuizen, kantoren) en **industriële/complexe projecten**. Infrastructuur is duidelijk zwakker bedeeld — zie §6 over IFC 4.3.

### Productfamilie

Bexel is geen enkel product maar een suite. Dat is essentieel voor het begrijpen van de prijzen:

**Desktop (Windows-only):**
- **BEXEL Manager** — volledige versie voor projectmanagers
- **BEXEL Manager LITE** — kleine projecten
- **BEXEL Engineer** — voor ontwerpers
- **BEXEL TeamWorks** — multi-user samenwerking, versiehistorie, incrementele versionering

**Cloud:**
- **BEXEL CDE** — common data environment
- **BEXEL Viewer**, **BEXEL Docs**, **BEXEL BCF.Server**, **BEXEL FM**, **BEXEL Portfolio Manager**

---

## 2. Functionaliteit en techniek

### 2.1 Zit er een echte netwerkplanning-engine onder? — Ja, en dat is niet vanzelfsprekend

Dit is de scherpste vraag in dit onderzoek, want veel "4D BIM"-tools zijn in werkelijkheid **animatieschillen** over een schema dat elders is gemaakt (Navisworks TimeLiner is het schoolvoorbeeld). Bexel valt **niet** in die categorie.

Bewijs voor een echte netwerkengine:

1. **CPM en CPA staan expliciet in de featurelijst** — "Critical path method (CPM) and analysis (CPA)" op de eigen scheduling-pagina.
2. **Relaties tussen activiteiten** zijn een eigen documentatiehoofdstuk ("Creating links between activities").
3. **Constraints**: de importwizard laat je de *task constraint priority* kiezen tussen **As Soon As Possible** en **As Late As Possible** — dat is forward/backward-pass-semantiek, niet cosmetica.
4. **Kalenders**: eigen "Schedule calendars"-module, plus een instelbare **"Working Hour Lag Calendar"** bij import — dus lag wordt kalendergebonden gerekend, wat een echte engine vereist.
5. **Resource-allocatie én -levelling**, met resource-constraints als invoer voor de optimalisatie.
6. **Baselines**: Progress Monitoring vergelijkt een baseline (mastersschema vóór uitvoering) met het actuele schema en **herberekent automatisch** bij voortgangsinvoer.
7. **Export mét relaties en resources** — de exportdialoog heeft aparte vinkjes om relaties en resources mee te nemen. Je exporteert dus een netwerk, geen platte takenlijst.

**Conclusie:** BEXEL Manager heeft een volwaardige CPM-netwerkengine met kalenders, relaties, constraints, float/kritiek pad, resources, levelling en baselines. Het is een *planningstool*, geen viewer.

**Nuance uit onafhankelijke bron.** Het Duitse io-group (Kundenmagazin 01/26) vergeleek Synchro 4D, Bexel Manager en Navisworks Manage in de praktijk en oordeelt dat Bexel *"sich als etwas unflexibel bei komplexer Logik erweist"* — enigszins inflexibel bij complexe logica — met beperkte mogelijkheden voor sterk dynamische aanpassingen. Synchro 4D behaalde de hoogste totaalscore; Bexel toont "solide potentie"; Navisworks voldoet slechts beperkt aan 4D-BIM-eisen omdat de "Planungslogik begrenzt" is. Bexel zit dus in het midden: veel sterker dan Navisworks, maar niet zo diep als Synchro bij zware planningslogica.

### 2.2 Automatische WBS-generatie uit het model — het echte onderscheidende punt

Dit is waar Bexel zich onderscheidt en wat voor de opdrachtgever het meest relevant is.

De **Smart Scheduling / Creation Wizard** genereert een compleet schema uit het BIM-model. Het mechanisme:

1. De gebruiker definieert **Zones** — de ruimtelijke opdeling (bouwdelen, verdiepingen, secties, geografische of functionele gebieden).
2. De gebruiker definieert **Methodologies** — de volgorde en groepering van werksoorten/disciplines (de bouwmethode).
3. Een **Creation Template** legt die combinatie vast.
4. De wizard vermenigvuldigt **Zones × Methodologies** en snijdt het model automatisch op in taken, met een hiërarchische WBS als resultaat.

Kernpunten uit de documentatie:
- **Bladtaken** krijgen een standaardduur van **40 uur** (één werkweek) als vertrekpunt.
- **Bovenliggende taken** aggregeren automatisch de duur van hun subactiviteiten.
- Taken worden doorgaans in **uniforme cycli** georganiseerd (vaak weekeenheden).
- **Duren worden herrekend** uit hoeveelheden (QTO uit het model) × **daily output rates** (productiviteitsnormen) — dus quantity-driven duration, niet handmatig geraden.
- **Resource-constraints** sturen levelling en toewijzingslimieten.
- Een citaat uit de eigen documentatie legt de kern bloot: *"An intelligent scheduling engine could also be used to create schedules optimized differently using Zones and Methodologies in a different order"* — je kunt dus dezelfde modeldata via een andere volgorde tot een andere strategie herschikken en de varianten vergelijken.

Daarnaast: **Smart mapping van modelelementen naar taken** — het koppelen van elementen aan activiteiten gebeurt regelgebaseerd, niet met de hand.

Dit is precies de functionaliteit die klassieke planningspakketten (P6, MS Project) **niet** hebben, omdat die geen modelkennis hebben. Het is het sterkste argument voor Bexel.

### 2.3 Planningsparadigma's

Bexel ondersteunt ongewoon veel methodieken in één tool:

| Methodiek | Ondersteuning |
|---|---|
| **Klassieke CPM/netwerkplanning** | Ja — kern van de engine, met CPA |
| **Locatiegebaseerd / flowline / Line of Balance** | Ja — "Intelligent LOB and flowline scheduling", met **LOB-diagrammen waarin je drag-and-drop kunt bijsturen** |
| **Takt planning** | Ja — sinds **juni 2025**, als paneel in **BEXEL CDE** |
| **Lean / pull (Last Planner)** | Ja, via het Takt-paneel: *"aligned with Lean planning and Last Planner principles"* |
| **4D-simulatie** | Ja — schedule animation, realtime 4D-visualisatie |
| **5D (kosten-tijd)** | Ja — 5D-simulatie die tijd-kostrelatie toont, cashflow-analyse |
| **Takenbeheer/voortgang** | Ja — BCF-gebaseerde voortgangsinvoer, hoeveelheidsgebaseerde tracking, look-ahead planning |

**Takt planning in detail** (release BEXEL CDE juni 2025, vereist Manager 25.5.0.0+): je kiest een **modelelement-eigenschap** waarop de takt-zones automatisch worden afgeleid, geeft aan of finish-start-relaties tussen taken moeten worden aangemaakt, en wijst de Gantt-kolom aan die de resourcetoewijzingen bevat. Het paneel koppelt direct aan de Gantt in de Schedule-tab, met bidirectionele selectie (taak → modelelementen en omgekeerd). Meerdere onafhankelijke canvassen, **elk met een eigen kalender**, ondersteunen het compartimenteren van lean-workflows. Kleurcodering per Gantt Task / Task Name / Location / Location-Name / Resource / Progress.

> **Belangrijke architectuurkanttekening:** Takt planning zit in de **cloud (CDE)**, niet in de desktop-Manager. De capaciteit is dus gesplitst over twee producten met twee licenties.

### 2.4 5D-kosten

Volledig geïntegreerd, en gekoppeld aan dezelfde modelelementen als de planning:
- Geautomatiseerde opbouw van kostendatabase en datamapping
- Standaardclassificaties: **Uniformat, Masterformat, Uniclass, DIN 276**
- Aangepaste kosteneigenschappen en variabele kosten
- Budgettering en hoeveelhedenstaten (BoQ)
- **Cashflow-analyse**
- 5D-simulatie
- **Aanpasbare maandelijkse betalingscertificaten** — dus tot in de facturatieketen

### 2.5 Overige functionaliteit

- **Clash detection** met containment-analyse, relatieverrijking en aanpasbare clashmatrices; export naar xlsx/pdf/html/**pbix** (Power BI)
- **Quantity take-off** modelgebaseerd, met visuele en kleurgecodeerde rapportages
- **IDS-validatie** — twee workflows: verificatie op basis van IDS-templates én geautomatiseerde IDS-check volgens de buildingSMART-standaard
- **Version Compare** — modelversievergelijking (recente toevoeging)
- **Point clouds en 360°-foto's**
- **BI Analytics / AI Insights** — dashboards, portfolio-KPI's, what-if-analyse, plan-versus-werkelijk
- **Digital twin / FM** — onderhoudsplanning, sensorintegratie
- **Mobiele app**

### 2.6 Platform en schaalbaarheid

| Aspect | Details |
|---|---|
| **Desktop-OS** | **Windows 10 / 11 (x64) — uitsluitend.** Geen macOS, geen Linux |
| **Aanbevolen hardware** | Intel i5 quad-core of AMD-equivalent; **16 GB RAM** voor middelgrote projecten |
| **Cloud** | Webgebaseerd (BEXEL CDE), gehost in EU, VS en India |
| **3D-engine** | Gebruikt **xeokit** (open-source SDK) voor visualisatie — vermeld in xeokit's success stories |
| **Schaal** | Reseller hiCAD noemt projecten met **>1 miljoen bouwelementen en >20.000 taken** ([ONBEVESTIGD] — resellerclaim, niet onafhankelijk getoetst) |
| **Actieve ontwikkeling** | Release notes lopen door tot **juli 2026**; recente releases o.a. 25.5, 25.12.3, april 2026 |

---

## 3. Prijzen

Bexel is in dit marktsegment **ongewoon transparant**: er staan echte lijstprijzen op de site, in drie valuta's. Dat is een pluspunt tegenover Bentley en Autodesk.

Alle onderstaande bedragen: bron `https://bexelmanager.com/pricing/bexel-expert-tools/` en `https://bexelmanager.com/pricing/bexel-collections/`, **geraadpleegd 25-07-2026**. Alle prijzen zijn **per gebruiker per jaar, jaarlijks gefactureerd**.

### 3.1 Desktop — BEXEL Expert Tools

| Product | EUR | USD | GBP | Doelgroep |
|---|---:|---:|---:|---|
| **BEXEL Manager LITE** | **€480** | $560 | £720 | kleine projecten |
| **BEXEL Engineer** | **€900** | $1.050 | £1.350 | ontwerpers |
| **BEXEL Manager** | **€2.400** | $2.800 | £3.600 | projectmanagers |
| **BEXEL TeamWorks** | offerte | offerte | offerte | bedrijfspakketten |

> **Opvallend:** de **GBP-prijzen liggen circa 50% boven de EUR-prijzen** bij de geldende wisselkoers (£3.600 ≈ €4.150 tegenover €2.400). Britse kopers betalen een fors regionaal opslagpercentage. Wie kan afrekenen in euro's, moet dat doen.

### 3.2 Cloud — enkel project

Geldt voor **één project met een waarde onder €50 mln**. Per module, per jaar:

| Module | EUR | USD | GBP |
|---|---:|---:|---:|
| BEXEL CDE | €90 | $105 | £135 |
| BEXEL Viewer | €180 | $210 | £270 |
| BEXEL Docs | €90 | $105 | £135 |
| BEXEL BCF.Server | €90 | $105 | £135 |
| BEXEL FM | €240 | $280 | £360 |
| BEXEL Portfolio Manager | €180 | $210 | £270 |

### 3.3 Cloud — onbeperkt aantal projecten

Exact het **dubbele** van de enkel-projecttarieven:

| Module | EUR | USD | GBP |
|---|---:|---:|---:|
| BEXEL CDE | €180 | $210 | £270 |
| BEXEL Viewer | €360 | $420 | £540 |
| BEXEL Docs | €180 | $210 | £270 |
| BEXEL BCF.Server | €180 | $210 | £270 |
| BEXEL FM | €480 | $560 | £760 |
| BEXEL Portfolio Manager | €360 | $420 | £540 |

### 3.4 BEXEL Collections (bundels, onbeperkte projecten, per gebruiker/jaar)

| Collection | EUR | USD | GBP |
|---|---:|---:|---:|
| **Design Review Collection** | **€1.860** | $2.235 | £2.790 |
| **Build Collection** | **€3.150** | $3.780 | £4.725 |
| **FM Collection** | **€1.800** | $2.610 | £2.700 |
| **Ultimate Collection** | **€3.480** | $4.175 | £5.220 |

De **Build Collection** is de relevante bundel voor 4D/5D-planning. De site specificeert **niet** welke modules exact in elke collection zitten — dat is een transparantiegat midden in een verder transparante prijspagina.

### 3.5 Enterprise Plan en Project Plan — offerte

- **Enterprise Plan**: onbeperkte licenties en gebruikers over **alle** modules; licenties mogen worden toegewezen aan **externe aannemers, adviseurs en stakeholders**; "Enterprise Exclusive Features"; **Platinum Enterprise Support Package** met toegewezen success managers; vroege toegang tot roadmap. **Prijs: uitsluitend op aanvraag.**
- **Project Plan**: onbeperkte BEXEL CDE-toegang voor alle projectstakeholders, workflows/approvals, documentmanagement met BIM-koppeling, BCF.Server, dashboards, dedicated support. Geen €50 mln-projectwaardegrens. **Prijs: op aanvraag.**

### 3.6 Overige licentievormen en kosten

- **Educatieve licentie**: **gratis**, jaarlijks, voor geverifieerde studenten en docenten.
- **Proefversie**: **30 dagen, zonder creditcard**. (Een Capterra-reviewer noemt de proefperiode desondanks "te kort".)
- **Implementatie-/trainingskosten**: **niet gepubliceerd.** Noch de Enterprise- noch de Project-planpagina noemt onboarding-, implementatie- of trainingskosten. **[SCHATTING]** Voor een enterprise-uitrol met dataconfiguratie (kostendatabases, creation templates, zones/methodologies) moet men rekenen op een aanzienlijk meerjarig consultancytraject; Bexel is van origine een consultancybedrijf en verkoopt die diensten. Bedragen zijn niet publiek en ik heb er geen bron voor.

### 3.7 Onafhankelijke prijsbevestiging

Capterra vermeldt onafhankelijk een **startprijs van €480 per jaar (flat rate)** — dat komt exact overeen met BEXEL Manager LITE en bevestigt de leverancierprijslijst. SourceForge/Slashdot noemen **$560/jaar**, eveneens overeenkomstig (LITE in USD).

---

## 4. VOORDELEN

1. **Echte automatische WBS- en schemageneratie uit het BIM-model.** De Zones × Methodologies-wizard bouwt uit modelinhoud een complete hiërarchische WBS met taken, gekoppelde elementen en uit hoeveelheden × productiviteitsnormen afgeleide duren. Dit is de kernfunctionaliteit die klassieke planners (P6, MS Project) principieel niet kunnen leveren, en Bexel voert het verder door dan de meeste concurrenten.

2. **Er zit een volwaardige CPM-netwerkengine onder, geen animatieschil.** CPM+CPA, relaties, ASAP/ALAP-constraints, werkurenkalenders met lag, float/kritiek pad, resource-allocatie én levelling, baselines met automatische herberekening bij voortgang. Dat is een wezenlijk verschil met Navisworks TimeLiner en met veel "4D-viewers".

3. **Meerdere planningsparadigma's in één tool.** Klassieke CPM, Line-of-Balance/flowline (met drag-and-drop-bijsturing in het LOB-diagram), takt planning en Lean/Last-Planner-uitlijning — normaal moet je hiervoor twee of drie pakketten combineren.

4. **4D en 5D op dezelfde modelelementen, tot in de betalingscertificaten.** Hoeveelheden → kosten → resources → cashflow hangen aan dezelfde elementen als de planning. Inclusief standaardclassificaties (Uniformat, Masterformat, Uniclass, DIN 276) en aanpasbare maandelijkse betalingscertificaten. De onafhankelijke Duitse vergelijking noemt de gecombineerde 4D/5D-analyse expliciet als sterkte.

5. **Publieke, gedetailleerde lijstprijzen in drie valuta's.** In een segment waar Bentley, Autodesk en Trimble structureel "contact sales" zeggen, publiceert Bexel harde bedragen per product en per module. Dat maakt begroten en vergelijken mogelijk zonder salestraject — en het is onafhankelijk bevestigd via Capterra.

6. **Brede openBIM-plumbing.** IFC in en uit, volledige BCF-workflows (inclusief een eigen BCF.Server, multi-topic bewerking, approvals, custom viewpoints), **IDS-validatie volgens de buildingSMART-standaard**, COBie-gerichte opleverworkflows en bSDD-verwante classificaties. Voor een pakket van deze omvang is dat een serieus openstandaardenfundament.

7. **Bidirectionele schema-uitwisseling met P6 en MS Project, inclusief relaties en resources.** Import via een wizard met veldmapping (kalender, constraint-prioriteit, kosten, voortgang, custom task fields) en export terug naar het bronpakket, met keuzevinkjes voor relaties en resources en een instelbaar exportniveau. Round-trip wordt expliciet ondersteund.

8. **Gedocumenteerde API met automatiseringsconsole.** Een C#/.NET add-in-API (`Bexel.API.dll`) plus een **geïntegreerde API-console** waarin C#-scripts binnen de applicatie draaien. Toegang tot planning, kosten en modeldata; expliciet bedoeld voor koppeling met ERP/SAP en het automatiseren van repetitief werk. Ontwikkelen kan met de gratis Visual Studio Community Edition.

9. **Aantoonbare schaal en zwaargewicht-referenties.** Aannemers als Hochtief, PORR, BESIX, Ferrovial, Acciona, L&T Construction, Clayco en Nesma & Partners staan als referentie — dat zijn organisaties die geen speelgoed inkopen. Reseller-documentatie noemt projecten met >1 mln elementen en >20.000 taken [ONBEVESTIGD].

10. **Gratis onderwijslicenties, proefversie zonder creditcard, en aantoonbaar actieve ontwikkeling.** Jaarlijkse gratis licenties voor geverifieerde studenten en docenten, 30 dagen proef zonder betaalgegevens, en een releasekadans die tot juli 2026 doorloopt met substantiële nieuwe functionaliteit (Takt Planning, Version Compare, AI Insights, BI-dashboards).

---

## 5. NADELEN

1. **De onafhankelijke reviewbasis is vrijwel afwezig — en dat is zelf een risicosignaal.** Capterra: **één** review. G2 en TrustRadius: geen bruikbare data. SourceForge/Slashdot: expliciet **nul** reviews ("Be the first to provide a review"). De enige Capterra-reviewer noemt als nadeel letterlijk dat het *"not gaining popularity among the rest of the similar program"* is. Voor een pakket van €2.400/gebruiker/jaar is het onmogelijk om referentie-ervaringen te vinden. Het eigen supportforum telt slechts een handvol topics — de community is klein.

2. **Uitsluitend Windows op de desktop.** Windows 10/11 x64 only; geen macOS, geen Linux. In gemengde omgevingen (architecten op Mac, engineers op Windows) is dat een structurele beperking. De cloudmodules verzachten dit maar vervangen de desktop-Manager niet — daar zit de zware planning.

3. **Onafhankelijk vergelijkend oordeel: inflexibel bij complexe logica.** De Duitse io-group-vergelijking (Kundenmagazin 01/26) stelt vast dat Bexel *"etwas unflexibel bei komplexer Logik"* is met beperkte capaciteit voor sterk dynamische aanpassingen, en kent Synchro 4D de hoogste totaalscore toe. Bexel krijgt "solide potentie" — een positief maar duidelijk tweederangs oordeel voor zware planningslogica.

4. **De MS Project-import is broos.** Diezelfde bron: *"its import quality depends heavily on the structure of the MS Project plan"*. Wie een schema erft dat niet netjes gestructureerd is, moet rekenen op naslagwerk. Dat ondermijnt het round-trip-verhaal in de praktijk.

5. **Geen IFC 4.3 in de export, en 4.3-import is aantoonbaar problematisch.** De exportdialoog biedt uitsluitend **IFC 2x3 of IFC 4** — 4.3 ontbreekt. Op het eigen forum meldt een gebruiker dat bij IFC 4.3.2-bestanden uit niet-Autodesk-wegontwerpsoftware *"road elements are not visible and grouped as generic objects"*; het antwoord van Bexel is als privébericht gemarkeerd en de zaak verhuisde naar e-mail. Diezelfde gebruiker merkt op dat **Bexel's eigen infrastructuur-voorbeeldbestand nog in IFC2 is**. Voor infrastructuur is dit een reëel gat.

6. **De buildingSMART-certificeringsclaim is niet onafhankelijk te verifiëren.** Bexel stelt in het eigen Help Center dat het *"supports IFC file format certified by buildingSMART International"*. Ik heb BEXEL echter **niet kunnen terugvinden op de publieke gecertificeerde-softwarelijst van buildingSMART** (die pagina's blokkeerden directe raadpleging en zoekopdrachten leverden geen BEXEL-vermelding op). Bexel is wél aantoonbaar **lid** van buildingSMART — maar lidmaatschap is geen certificering. **[ONBEVESTIGD]** — behandel de certificeringsclaim als leveranciersclaim tot je hem in de buildingSMART-database zelf terugvindt.

7. **Proprietaire kernformaten en Bexel-only uitwisseling.** Het native formaat is **BESLN**; **BX3** is het proprietaire transferformaat vanuit authoring tools. Cruciaal: de *rijke* uitwisseling — selection sets, custom breakdowns, clash detections, **schema's** en kostenclassificaties — loopt via **BXF**, en dat is expliciet bedoeld "for exchanging data among BEXEL Manager users". De waardevolste projectstructuur is dus alleen Bexel↔Bexel overdraagbaar.

8. **De API is in-process .NET, geen open REST-API.** C# tegen .NET Framework 4.7.2/4.8, geladen als add-in binnen een **betaalde, geïnstalleerde Windows-versie** van BEXEL Manager 20 of nieuwer. Er is geen open webservice waarmee externe systemen zelfstandig data kunnen halen of duwen. Op het forum vraagt een gebruiker bovendien naar OpenCDE API 3.0-integratie en meldt beperkte documentatie.

9. **Kwaliteits- en stabiliteitsmeldingen op het eigen forum.** Op help.bexelmanager.com staan openlijk: **dataverlies in de Cost Editor/Cost Estimate in versie 25.12.3** (data verdwijnt na heropenen van het project), **IFC-import die ongewenste "blue surfaces/planes" en artefacten produceert** ten opzichte van BX3-import, **Unreal Engine-animatie-export die niet werkt** (JSON ziet er correct uit maar sequences blijven leeg), en installatieproblemen met MS Visual C++-afhankelijkheden. Dataverlies in de kostenmodule is een ernstige categorie.

10. **Prijs- en pakketcomplexiteit aan de bovenkant.** €2.400/gebruiker/jaar voor de desktop-Manager, €3.480 voor de Ultimate Collection — en dan is er nog geen Enterprise-prijs bekend. Je moet je weg vinden door 4 desktoptools + 6 cloudmodules + 4 collections + 2 offerte-plannen, terwijl de site **niet specificeert welke modules in welke collection zitten**. De Britse prijzen liggen ~50% boven de eurozone. Implementatie- en trainingskosten zijn nergens gepubliceerd.

11. **Functionaliteit is gesplitst tussen desktop en cloud.** Takt Planning — een van de meest gepromote nieuwe features — zit **alleen in BEXEL CDE** en vereist bovendien projecten gepubliceerd vanuit Manager 25.5.0.0 of nieuwer. Wie takt wil, koopt twee producten en accepteert een publiceerstap ertussen.

12. **Beperkt ecosysteem.** Nauwelijks derde-partij-integraties (Slashdot: "no integrations are listed"), een kleine trainingsmarkt en weinig onafhankelijke consultants vergeleken met Autodesk of Bentley. Je bent grotendeels afhankelijk van Bexel zelf voor kennis en ondersteuning.

---

## 6. Interoperabiliteit — en hoe open of gesloten is dit pakket?

Dit is de sectie die er voor de opdrachtgever (een open-source, IFC-gebaseerde planner) het meest toe doet.

### 6.1 Formaatondersteuning, feitelijk

| Formaat | Status in BEXEL Manager | Bron/opmerking |
|---|---|---|
| **IFC import** | Ja | Native te openen naast BESLN en BX3 |
| **IFC export** | Ja — **alleen IFC 2x3 en IFC 4** | Exportdialoog; **geen IFC 4.3** |
| **IFC 4.3** | **Niet in export.** Import onduidelijk en in de praktijk gebrekkig voor infra | Forumcasus met wegelementen als generic objects |
| **IFC met planningsdata** | **Ja — "Schedules" is een aanvinkbare exportoptie** naast Linked Documents, Quantity Takeoffs en 3D Scene Colors | Sterk punt; entiteitmapping niet gedocumenteerd |
| **IfcWorkSchedule / IfcTask** | **[SCHATTING — waarschijnlijk]** De documentatie noemt geen entiteitnamen. Aangezien IFC4 geen andere standaardweg biedt om een schema te dragen, is `IfcWorkSchedule` + `IfcTask` + `IfcRelSequence` vrijwel zeker de gebruikte mapping. **Niet geverifieerd — test dit zelf met een exportbestand.** |
| **BCF** | Ja, diepgaand — BCF.Server-module, BCF-gebaseerde voortgangsinvoer, import/export van issues, multi-topic bewerking, approvals, custom viewpoints | Sterkste openstandaard-implementatie in het pakket |
| **IDS** | Ja — IDS-templates én geautomatiseerde IDS-check volgens buildingSMART-standaard | Modern; veel concurrenten hebben dit niet |
| **COBie** | Ja — genoemd voor opleverworkflows | [ONBEVESTIGD] diepte |
| **Primavera P6** | Import én export | Via Schedule Import Wizard / export |
| **MS Project** | Import én export | Idem |
| **XER (P6 native)** | **Niet gedocumenteerd.** Zoekopdrachten in het eigen Help Center op "XER" leveren geen enkele inhoudelijke treffer op | **[SCHATTING]** Waarschijnlijk **niet** ondersteund; de uitwisseling loopt via XML |
| **P6 XML / MSPDI** | **Ja — via `.xml`.** De Getting Started-gids: *"export of created schedules into *.xml files fully compatible with other planning software such as Primavera, MS Project"* | **[SCHATTING]** dit betreft vrijwel zeker P6 XML resp. MSPDI |
| **MPP (MS Project binair)** | **Niet gedocumenteerd** | **[SCHATTING]** waarschijnlijk niet; import gaat via XML |
| **Synchro** | Genoemd in een officiële videotutorial over schema-uitwisseling | [ONBEVESTIGD] mechanisme |
| **CSV / XLSX** | Ja — Gantt-export naar `.xlsx` en `.pdf`; rapportages naar xlsx/pdf/html | |
| **Power BI (.pbix)** | Ja — clash- en analyse-export naar pbix; Power BI-integratie in release notes | Ongebruikelijk en nuttig |
| **BESLN / BX3 / BXF** | Proprietair — native, transfer en Bexel↔Bexel-uitwisseling | Lock-in-laag |
| **Revit / Navisworks** | Via eigen add-ins: BEXEL Manager Revit Publisher, BEXEL Publisher Add-in voor Navisworks, BEXEL BC3 Importer | |
| **API** | C#/.NET Framework 4.7.2 (Manager 20/21/23) of 4.8 (24+), in-process add-in + geïntegreerde C#-console. **Geen REST-API.** | Vereist betaalde licentie + Windows |
| **OpenCDE API 3.0** | Gebruikersvraag op forum; **beperkte documentatie gemeld** | [ONBEVESTIGD] |

### 6.2 Oordeel: half-open aan de randen, gesloten in de kern

Bexel is **oprecht openBIM-vriendelijk aan de buitenkant**: het is buildingSMART-lid, leest en schrijft IFC, doet BCF beter dan de meeste, ondersteunt IDS, wisselt schema's uit met P6 en MS Project, en gebruikt zelfs de open-source **xeokit**-SDK voor 3D-visualisatie. Dat is meer openheid dan Autodesk of Bentley op dit punt bieden.

Maar de **waardevolle laag is gesloten**:

- Het **intellectuele hart** — Zones, Methodologies, Creation Templates, kostendatabases, resourceregels — leeft in **BESLN/BXF** en is alleen Bexel↔Bexel overdraagbaar. Exporteer je naar P6 XML, dan houd je een platte netwerkplanning over: de generatieve logica die het schema *voortbracht* gaat verloren. Je exporteert het resultaat, niet het model.
- Er is **geen open REST-API**. Automatiseren kan alleen als .NET-add-in *binnen* een betaalde Windows-installatie. Externe systemen kunnen niet zelfstandig praten met Bexel-data.
- **Closed source**, jaarlijks abonnement per seat, geen perpetual-optie. Stopt het abonnement, dan stopt de toegang tot BESLN-projecten.
- De cloud is een **proprietary SaaS**, niet een open CDE-protocol; de OpenCDE-ondersteuning is dun gedocumenteerd.
- **Geen IFC 4.3-export.** Voor een leverancier die zich op openBIM beroept, is dat in 2026 achterstallig — 4.3 is sinds 2023 ISO-standaard (ISO 16739-1:2024) en dé schema voor infrastructuur.

### 6.3 Wat dit concreet betekent voor een open-source IFC-planner

- **Bexel bewijst het concept.** Automatische WBS-generatie uit modelgeometrie plus een echte CPM-engine is commercieel levensvatbaar en wordt door tier-1-aannemers gekocht. Dat is validatie voor de richting van de opdrachtgever.
- **Het Zones × Methodologies-patroon is het bestudeerwaardige idee.** Ruimtelijke opdeling × bouwmethodiek → automatische takenmatrix, met duren uit hoeveelheid ÷ productiviteitsnorm. Dat is een reproduceerbaar, niet-gepatenteerd ontwerpprincipe.
- **Er ligt een concreet gat: IFC 4.3.** Bexel exporteert het niet en worstelt met de import. Een planner die **IFC 4.3-native** is en `IfcWorkSchedule`/`IfcTask`/`IfcRelSequence` als *bron van waarheid* behandelt in plaats van als exportdoelwit, biedt iets dat Bexel vandaag niet levert.
- **Het tweede gat is architectonisch.** Bexel's planningsintelligentie is niet exporteerbaar. Een open planner waarin de generatieregels zélf in een leesbaar, open formaat staan, is fundamenteel anders — geen feature-verschil maar een categorieverschil.
- **Realistische verwachting:** Bexel's 5D-diepte (kostendatabases, cashflow, betalingscertificaten), clash detection en FM-portfolio zijn jarenlange investeringen. Concurreren op breedte is niet haalbaar; concurreren op **openheid en IFC 4.3-nativiteit** wel.

---

## 7. Marktpositie

### Waar het sterk staat, en waarom

Bexel bezet een duidelijk **middenpositie tussen twee polen**, en dat is precies zijn bestaansrecht:

| | Navisworks Manage | **BEXEL Manager** | Synchro 4D |
|---|---|---|---|
| Planningslogica | beperkt ("kan complexe bouwvolgordes maar beperkt afbeelden") | **echte CPM + auto-generatie** | krachtigst |
| Leercurve | laagst | midden | steilst |
| Visualisatie | indrukwekkend | goed | goed |
| 5D-kosten | zwak | **sterk geïntegreerd** | middel |
| Prijs | laag/gebundeld | midden, transparant | hoog |
| Totaaloordeel io-group | "voldoet slechts beperkt" | "solide potentie" | **hoogste totaalscore** |

De positionering luidt dus: *veel meer planning dan Navisworks, veel goedkoper en toegankelijker dan Synchro, en als enige met serieuze automatische schemageneratie én 5D in dezelfde doos.*

Sterk in:
- **Zuidoost-Europa / Balkan** — thuismarkt, waar het feitelijk marktleider is [SCHATTING]
- **Centraal-Europa** (Hochtief, PORR) en **West-Europa** (BESIX, Ferrovial, Acciona, COWI)
- **Midden-Oosten** (Nesma & Partners)
- **India** (L&T Construction; eigen cloudregio)
- **VS** (Clayco; eigen cloudregio)
- **Utiliteits- en complexe gebouwbouw** — hotels, stadions, ziekenhuizen. Gedocumenteerde cases: Sensatori & Nickelodeon Hotels and Resorts (Punta Cana) en een nationaal voetbalstadion waarvoor 4D/5D-simulaties in twee weken zijn opgeleverd.

Zwak in: **infrastructuur** (IFC 4.3-tekortkomingen), **Noord-Amerikaanse mainstream** (waar Autodesk/Oracle domineren), en **organisaties met macOS/Linux**.

### Concurrenten

- **Bentley Synchro 4D** — de directe en zwaarste concurrent; wint op planningsdiepte
- **Autodesk Navisworks Manage / Autodesk Construction Cloud** — wint op distributie en prijs, verliest op planningslogica
- **Oracle Primavera P6 / Cloud** — de planning-autoriteit, maar zonder modelkennis; Bexel is complement zowel als concurrent
- **ALICE Technologies** — generatieve planningsoptimalisatie; het meest directe alternatief voor Bexel's auto-generatie
- **Trimble (Vico Office, ProjectSight)** — locatiegebaseerde planning + 5D
- **Sablono, Visilean** — lean/takt-uitvoeringsplatforms
- **InEight, Revizto, usBIM (ACCA), StreamBIM, Dalux, dRofus** — aangrenzend, deels overlappend

### Trend

Duidelijke **desktop-naar-SaaS-pivot**: het zwaartepunt verschuift van de Windows-desktop-Manager naar BEXEL CDE plus cloudmodules, met AI Insights en BI Analytics als nieuwe verkoopargumenten. Takt Planning kwam in juni 2025 **eerst in de cloud** uit — een expliciet signaal over waar de roadmap heen loopt. De rebranding van `bexelconsulting.com` naar `bexelmanager.com` bevestigt de verschuiving van consultancy naar productbedrijf.

### Omzet en gebruikersaantallen

- **Officiële claim**: gebruikers in **75 landen**, "duizenden gebruikers"
- **BEXEL User Day 2024**: deelnemers uit **25+ landen**
- **Personeel**: 20–50 (Servische entiteit, helloworld.rs)
- **Omzet**: **niet publiek.** **[SCHATTING, lage zekerheid]** ordegrootte €5–15 mln/jaar

---

## 8. Eindoordeel

**BEXEL Manager is het meest serieuze commerciële antwoord op de vraag "kan een planning zichzelf uit een BIM-model schrijven?" — en het antwoord is grotendeels ja.** Onder de motorkap zit een echte CPM-netwerkengine met kalenders, constraints, float, resource-levelling en baselines; daarbovenop een generatielaag (Zones × Methodologies × hoeveelheden ÷ productiviteitsnormen) die een complete WBS produceert; en daarnaast een 5D-kostenlaag die tot in maandelijkse betalingscertificaten doorloopt. Dat is een indrukwekkende hoeveelheid samenhangende functionaliteit, en de publieke prijsstelling van €480–€3.480 per gebruiker per jaar maakt het bovendien concreet begrootbaar — een zeldzaamheid in dit segment.

**Maar het is geen eersteklas planningstool en het presenteert zich openhartiger dan het is.** De enige onafhankelijke vergelijkende studie die ik vond (io-group, Duitsland, 01/26) plaatst Bexel expliciet achter Synchro 4D en noemt het "enigszins inflexibel bij complexe logica", met een MS Project-import die sterk afhangt van hoe netjes het bronschema is opgebouwd. De reviewbasis is bijna niet-bestaand — één Capterra-review, nul op SourceForge en Slashdot — waardoor er domweg geen onafhankelijk bewijs is voor gedrag bij schaal. Het eigen supportforum meldt openlijk dataverlies in de kostenmodule (25.12.3), IFC-importartefacten en kapotte exportpaden. Voor €2.400 per gebruiker per jaar is die combinatie — hoge prijs, dunne verificatie, zichtbare kwaliteitsmeldingen — een reëel inkooprisico dat een grondige eigen pilot rechtvaardigt.

**Op openheid is het oordeel gemengd en voor deze opdrachtgever beslissend.** Bexel dóét openBIM serieus: IFC in en uit inclusief een aanvinkbare schema-export, uitstekende BCF-ondersteuning, IDS-validatie volgens de buildingSMART-standaard, schema-uitwisseling met P6 en MS Project met relaties en resources, en zelfs een open-source visualisatiekern (xeokit). Maar de kroonjuwelen zitten opgesloten: de generatieve logica leeft in het proprietaire BESLN/BXF, exporteert alleen als plat resultaat, en de API is een in-process .NET-add-in binnen een betaalde Windows-installatie — geen open webservice. En bij een leverancier die openBIM als merkwaarde voert, is het ontbreken van **IFC 4.3-export** in 2026 een echte tekortkoming, versterkt door de forumbevindingen over 4.3-infrastructuurimport en het feit dat Bexel's eigen infra-voorbeeldbestand nog IFC2x3 is. De certificeringsclaim bij buildingSMART kon ik bovendien niet in de publieke certificatielijst terugvinden — lidmaatschap is bevestigd, certificering niet.

**Voor het bouwen van een open-source, IFC-gebaseerde planner is Bexel de juiste maatstaf en tegelijk de vindplaats van de opening.** Het bewijst dat automatische WBS-generatie uit modelinhoud commercieel werkt en door tier-1-aannemers wordt gekocht — de richting klopt. Het patroon om te bestuderen is `Zones × Methodologies → takenmatrix`, met duren uit hoeveelheid gedeeld door productiviteitsnorm; dat is een helder, reproduceerbaar ontwerpprincipe. Maar het gat is even scherp: Bexel behandelt IFC als *exportdoelwit* en niet als *bron van waarheid*, biedt geen IFC 4.3, en maakt zijn planningsintelligentie principieel niet-overdraagbaar. Een planner die IFC 4.3-native is, `IfcWorkSchedule`/`IfcTask`/`IfcRelSequence` als primaire opslag behandelt en zijn generatieregels in een leesbaar open formaat bewaart, concurreert niet op features maar verschilt van categorie. Op breedte (5D-kostendatabases, clash detection, FM-portfolio, BI) is Bexel niet in te halen; op openheid en schema-nativiteit wel — en dat is precies waar het kwetsbaar is.

**Samengevat:** een technisch knap, eerlijk geprijsd, actief ontwikkeld nichepakket met een echte planningsengine en de beste automatische WBS-generatie in zijn prijsklasse — beperkt door Windows-exclusiviteit, een niet te verifiëren gebruikersbasis, planningslogica die achterblijft bij Synchro, en een openheid die aan de randen echt is maar in de kern ophoudt.

---

## Bronnen

Alle URL's geraadpleegd op **25 juli 2026**.

**Leverancier — officieel**
1. BEXEL Manager — hoofdpagina — https://bexelmanager.com/
2. BEXEL Manager — productpagina (features 4D/5D/QTO/clash) — https://bexelmanager.com/bexel-manager/
3. BEXEL Manager — Scheduling (CPM/CPA, LOB, levelling, import/export) — https://bexelmanager.com/bexel-manager/scheduling/
4. BEXEL — Pricing overzicht — https://bexelmanager.com/pricing/
5. BEXEL Expert Tools — **prijzen desktop + cloud in EUR/USD/GBP** — https://bexelmanager.com/pricing/bexel-expert-tools/
6. BEXEL Collections — **bundelprijzen** — https://bexelmanager.com/pricing/bexel-collections/
7. BEXEL Enterprise Plan — https://bexelmanager.com/pricing/bexel-enterprise-plan/
8. BEXEL Project Plan — https://bexelmanager.com/pricing/bexel-project-plan/
9. BEXEL — What's New (Takt Planning, Version Compare, AI Insights) — https://bexelmanager.com/whats-new/
10. BEXEL — Takt Planning feature — https://bexelmanager.com/features/takt-planning/
11. BEXEL Manager API — Getting Started Guide (PDF) — https://www.bexelmanager.com/wp-content/uploads/Bexel_Manager_API-Getting_Started_Guide.pdf
12. bexelconsulting.com (301 → bexelmanager.com; bevestigt rebranding) — https://bexelconsulting.com/

**Leverancier — Help Center / documentatie**
13. BEXEL Help Center — https://help.bexelmanager.com/
14. Schedule — moduleoverzicht en artikelenlijst — https://help.bexelmanager.com/docs/help-center/bexel-manager/schedule/
15. **Schedule exchange process** (import/export P6 & MS Project, veldmapping, round-trip) — https://help.bexelmanager.com/docs/help-center/bexel-manager/schedule/schedule-exchange-process-12606/
16. **Smart scheduling** (Creation Wizard, Zones, Methodologies, 40u-bladtaken, output rates, levelling) — https://help.bexelmanager.com/docs/help-center/bexel-manager/schedule/smart-scheduling-12534/
17. Schedule settings — https://help.bexelmanager.com/docs/help-center/bexel-manager/schedule/schedule-settings-11825/
18. **BEXEL Manager environment** (BESLN/BX3/IFC, certificeringsclaim, add-ins) — https://help.bexelmanager.com/docs/help-center/bexel-manager/bexel-manager-environment/
19. **Export of the IFC file** (IFC2x3/IFC4, exportopties incl. Schedules) — https://help.bexelmanager.com/docs/help-center/bexel-manager/bexel-manager-environment/export-of-the-ifc-file/
20. Progress monitoring (baselines, automatische herberekening) — https://help.bexelmanager.com/docs/help-center/bexel-manager/progress-monitoring/
21. **API-documentatie** (.NET Framework 4.7.2/4.8, add-ins, C#-console) — https://help.bexelmanager.com/docs/api/
22. **BEXEL CDE — juni 2025 release** (Takt Planning-paneel, Lean/Last Planner) — https://help.bexelmanager.com/docs/whats-new/bexel-cde-june-2025/
23. IDS Check — https://help.bexelmanager.com/docs/help-center/bexel-cde-19373/ids-check/
24. Publishing project version (CDE publiceert als IFC2x3/IFC4) — https://help.bexelmanager.com/docs/help-center/bexel-cde-19373/publishing-project-version/
25. **Community forum** (dataverlies 25.12.3, IFC-artefacten, Unreal-export, VC++-installatie, OpenCDE) — https://help.bexelmanager.com/forums/
26. **Forumtopic "IFC 4.3 and infrastructure projects"** (wegelementen als generic objects; eigen infra-sample in IFC2) — https://help.bexelmanager.com/forums/topic/ifc-4-3-and-infrastructure-projects/
27. Reporting and analysis using BEXEL Viewer — https://help.bexelmanager.com/docs/help-center/bexel-manager/reporting-and-analysis/reporting-and-analysis-using-bexel-viewer-14854/

**Onafhankelijke reviews en vergelijkingen**
28. **io-group (DE), Kundenmagazin 01/26 — "Model-based scheduling with 4D BIM"** (Bexel vs Synchro vs Navisworks; kritiek op flexibiliteit en importkwaliteit) — https://www.io-group.com/insights/plus-io-kundenmagazin-01-26/model-based-scheduling-with-4d-bim
29. **Capterra — BEXEL Manager** (1 review, 5,0; startprijs €480/jaar; "trial te kort", "not gaining popularity") — https://www.capterra.com/p/185992/BEXEL-Manager/
30. SourceForge — BEXEL Manager ($560/jaar, nul reviews, alternatievenlijst) — https://sourceforge.net/software/product/BEXEL-Manager/
31. Slashdot — BEXEL Manager (nul reviews, "no integrations listed") — https://slashdot.org/software/p/BEXEL-Manager/
32. **BIM Tools Hub — BEXEL Manager** (Windows-only, onboardingduur, prijstransparantie, COBie/IDS) — https://bimtoolshub.com/bexel-manager
33. SourceForge — vergelijking BEXEL vs Navisworks vs SYNCHRO — https://sourceforge.net/software/compare/BEXEL-Manager-vs-Navisworks-vs-SYNCHRO/
34. G2 — BEXEL Manager reviews (HTTP 403 bij raadpleging; niet inhoudelijk te gebruiken) — https://www.g2.com/products/bexel-manager/reviews
35. TrustRadius — BEXEL Manager reviews (HTTP 403; niet inhoudelijk te gebruiken) — https://www.trustradius.com/products/bexel-manager/reviews

**Bedrijfsinformatie (incl. lokale Servische bronnen)**
36. **CB Insights — Bexel Consulting** (opgericht 2005, Belgrado, Servië) — https://www.cbinsights.com/company/bexel-consulting
37. **helloworld.rs — Bexel Consulting d.o.o.** (20–50 medewerkers, 75 landen, +381 11 Belgrado) — https://www.helloworld.rs/kompanija/Bexel-Consulting-d.o.o/1421
38. Poslovi Infostud — Bexel Consulting d.o.o. (Servisch vacatureportaal) — https://poslovi.infostud.com/poslodavac/bexel-consulting-d.o.o./20614
39. REBEC — sprekersprofiel Veljko Janjić (CEO & mede-oprichter) — https://www.rebec.rs/speakersingle.php?l=en&Id=268
40. Datanyze — Bexel Consulting — https://www.datanyze.com/companies/bexel-consulting/357544157
41. **hiCAD d.o.o. (Servische reseller) — Bexel Manager** (IFC/BCF, classificaties, >1 mln elementen / >20.000 taken) — https://hicad.biz/portfolio/bexel-manager/

**Cases, standaarden en context**
42. buildingSMART — Bexel Case Study (PDF; HTTP 403 bij raadpleging) — https://www.buildingsmart.org/Bexel_Case_Study.pdf
43. buildingSMART — Information Delivery Specification (IDS) — https://www.buildingsmart.org/standards/bsi-standards/information-delivery-specification-ids/
44. buildingSMART technical — IDS-project — https://technical.buildingsmart.org/projects/information-delivery-specification-ids/
45. buildingSMART — certificeringsprogramma (HTTP 403; BEXEL niet te verifiëren in de publieke lijst) — https://www.buildingsmart.org/compliance/software-certification/certified-software/
46. SlideShare — BEXEL Manager case study, Sensatori & Nickelodeon Hotels and Resorts Punta Cana — https://www.slideshare.net/slideshow/bexel-manager-estudo-de-caso/230204265
47. LinkedIn — BEXEL Manager, nationaal voetbalstadion met 4D/5D in twee weken — https://www.linkedin.com/posts/bexel-manager_cde-activity-7244303879830437889-R305
48. xeokit — success stories (3D-engine achter BEXEL Manager) — https://xeokit.io/success-stories/
49. BuildCHAIN-project (EU) — BIM-API-integratietool met BEXEL — https://buildchain-project.eu/results-to-date/tools/tool-3/
50. MDPI Buildings 15(3), 378 — open standaarden (IDS, bSDD) en automatisering van informatie-uitwisseling — https://www.mdpi.com/2075-5309/15/3/378
51. Reddit r/bim — "4D software suggestions / alternatives?" (contextdiscussie 4D-tools; niet rechtstreeks raadpleegbaar) — https://www.reddit.com/r/bim/comments/1b7wfp2/4d_software_suggestions_alternatives/

**Methodologische aantekening.** De WebSearch-quota van deze sessie waren uitgeput; het onderzoek is uitgevoerd met directe WebFetch-raadplegingen aangevuld met DuckDuckGo-Lite als zoekvervanger. Enkele bronnen (G2, TrustRadius, buildingSMART-certificatielijst, Reddit, Mojeek) gaven HTTP 403 of waren anderszins niet raadpleegbaar; die zijn hierboven als zodanig gemarkeerd en er zijn géén inhoudelijke conclusies aan verbonden.
