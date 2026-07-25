# SAP Project System (PS) en SAP Portfolio and Project Management (PPM)

**Onderzoeksdatum: 25 juli 2026** · Analist-notitie: alle bedragen, versienummers en scores hieronder zijn voorzien van bron-URL en datum. Waar een cijfer een **schatting** of **inschatting van de analist** is, staat dat er expliciet bij.

> **Methodologische kanttekening (transparant vermeld).** De WebSearch-quota van deze sessie waren bij aanvang van dit deelonderzoek uitgeput. Het onderzoek is daarom uitgevoerd via directe HTTP-toegang: de **officiële SAP Help Portal-content-API** (`http.svc/deliverableMetadata` + `http.svc/pagecontent`, waarmee de volledige productdocumentatie van PS, PPM, EPC en S/4HANA leesbaar werd), de **S/4HANA Simplification List PDF**, **UK G-Cloud 14 (Digital Marketplace)** met de originele prijsdocumenten van SAP-partner NTT DATA, **PeerSpot**, **SoftwareReviews (Info-Tech)**, **Vendr** en **Wikipedia**. Niet bereikbaar (bot-blokkade / 403): `sap.com` zelf, `community.sap.com`, G2, TrustRadius, Capterra, Gartner Peer Insights, Reddit (ook via spiegels, wegens IP-gebonden proof-of-work). Waar review-aggregatoren ontbreken is dat hieronder aangegeven; de reviewbevindingen leunen op PeerSpot en SoftwareReviews.

---

## 1. Wat het is

### 1.1 Leverancier, historie en eigendom

**SAP SE**, Walldorf (Baden-Württemberg), Duitsland. Beursgenoteerd; sinds 7 juli 2014 een *Societas Europaea*. Omzet **€36,8 miljard (2025)**, bedrijfsresultaat €10,293 miljard, **110.650 medewerkers**, kantoren in 180 landen ([Wikipedia – SAP SE](https://en.wikipedia.org/wiki/SAP_SE), geraadpleegd 25-07-2026). SAP is de grootste leverancier van bedrijfssoftware ter wereld.

Onder de vlag "projectmanagement" verkoopt SAP niet één product maar **een familie die in de praktijk voortdurend door elkaar wordt gehaald**. Dat onderscheid is essentieel voor elk vergelijkend onderzoek:

| Product | Technische naam | Wat het is | Waar het draait |
|---|---|---|---|
| **SAP PS (Project System)** | applicatiecomponent `PS` | De klassieke ERP-projectmodule met WBS **én netwerken/activiteiten** — dit is de **echte CPM-engine** | SAP R/3 → ECC 6.0 → S/4HANA on-premise & Private Cloud |
| **SAP PPM (Portfolio and Project Management)** | softwarecomponent `CPRXRPM` | Portfolio- + projectmanagement-laag (fasen, taken, checklists, stage-gates, rollen/staffing). Lichtere planner | Add-on op ECC/S/4HANA; ook "PPM for SAP S/4HANA" (embedded) |
| **SAP EPPM** (Enterprise Portfolio and Project Management) | — | Marketingparaplu over PS + PPM + Commercial Project Management. In S/4HANA **Cloud Public Edition** is dit WBS-gebaseerde "enterprise projects" + Project Control-apps | S/4HANA (alle smaken) |
| **SAP EPC** (Enterprise Project Connection) | `SAP ENTERPRISE PROJ CON` | Integratieproduct naar Oracle Primavera P6 EPPM en Microsoft Project Server | Aparte installatie |
| **SAP PRM** (Project and Resource Management) | `PPRM_OD` | Nieuwe cloud-projectplanner binnen SAP Professional Services Cloud | SaaS |

**Historie.**
- **PS** bestaat sinds de vroege R/3-generatie (begin jaren '90) en is functioneel al meer dan twee decennia stabiel; grote delen van de Engelstalige documentatie zijn nog letterlijk de R/3-teksten (zichtbaar in de SAP Help Portal-versies 4.6C t/m ERP 6.0 EHP8 / S/4HANA 2025).
- **PPM** is een fusieproduct: de componentnaam `CPRXRPM` verraadt de afkomst — **cProjects** (Collaboration Projects, projectuitvoering) plus **xRPM** (xApps Resource and Portfolio Management, portfolio). SAP bracht deze samen als *SAP Portfolio and Project Management*; documentatieversies op SAP Help lopen van **5.0** via **6.0** naar **6.1** (huidige SP-lijn `CPRXRPM 610_740`), plus de in S/4HANA ingebedde variant ([SAP Help – PPM What's New, o.a. "Alternative Gantt Chart based on SAPUI5 Technology", PPM 6.1 SP13](https://help.sap.com/docs/SAP_PORTFOLIO_AND_PROJECT_MANAGEMENT/47f3c81b7cc040f1aa74c2353651b6ac/1dee363b6e874dbdaaead050a56be96a.html), geraadpleegd 25-07-2026).
- **EPC** is blijven steken op **release 3.0 FP01, documentatie gepubliceerd 15 juni 2017** (zie §6).

### 1.2 Doelgroep, typische gebruikers, sectoren en regio's

**Doelgroep:** organisaties die *al* SAP als ERP draaien en projectkosten, inkoop, materiaalbehoefte, tijdschrijven en facturatie op projectniveau willen sturen. SAP PS/PPM wordt vrijwel nooit stand-alone gekocht — het is een module/add-on binnen een bestaand SAP-landschap.

**Typische gebruikersrollen:**
- *Projectcontroller / kostenbewaker* — de grootste en meest tevreden gebruikersgroep;
- *Inkoper / werkvoorbereider* — netwerkactiviteiten genereren aanvragen, bestellingen en materiaalreserveringen;
- *Projectmanager* — vaak via Fiori-apps of rapportages, zelden in de netwerkeditor;
- *Planner/scheduler* — de groep die het vaakst afhaakt en uitwijkt naar Primavera P6 of MS Project (zie §5).

**Sectoren:** engineering & construction (EPC), olie & gas, mijnbouw, energie/utilities, defensie & ruimtevaart, machinebouw/ETO (engineer-to-order), scheepsbouw, farma/R&D, publieke sector en infrastructuur. PeerSpot registreert **"Construction Company" als grootste bezoekende sector (11%)** voor SAP PPM ([PeerSpot – SAP PPM reviews](https://www.peerspot.com/products/sap-portfolio-and-project-management-reviews), geraadpleegd 25-07-2026).

**Regio's:** wereldwijd, met een historisch sterke basis in **DACH, Benelux, Scandinavië, Zuid-Europa, Midden-Oosten en India**; in Noord-Amerikaanse EPC-projecten domineert Oracle Primavera P6 het schema terwijl SAP de kostenkant doet.

---

## 2. Functionaliteit en techniek — heeft dit een echte CPM-engine?

### 2.1 Kort antwoord

**SAP PS: ja, onmiskenbaar.** Dit is geen balkendiagram-tekentool. PS rekent een volwaardig activity-on-node-netwerk door met voorwaartse en achterwaartse pass, vroegste/laatste data, total float, free float, kritiek pad, alle vier relatietypen, tijdsintervallen, harde datumrestricties, kalenders en duurverkortingsstrategieën. Op engine-niveau is het vergelijkbaar met klassieke CPM-tools.

**SAP PPM: nee, niet in dezelfde klasse.** PPM heeft *wel* relatietypen en voor-/achterwaartse berekening, maar het is een fase/taak-model met **dag als kleinste tijdseenheid**, zonder float-uitvoer, zonder kritiek pad als eersteklas begrip en zonder resource-nivellering op netwerkniveau. Het is een *governance*-planner, geen scheduler.

**SAP S/4HANA Cloud Public Edition (EPPM/"enterprise projects"): nee.** Daar zit WBS + werkpakketten + Project Control-apps; de klassieke netwerken/activiteiten met CPM-engine zijn een PS-functie van de on-premise/private-cloud-stack. *(Inschatting van de analist, gebaseerd op het feit dat de gehele PS-netwerkdocumentatie en de bijbehorende CN\*/CJ\*-transacties uitsluitend onder SAP ERP / S/4HANA on-premise worden gedocumenteerd en de public-cloud-EPPM-documentatie uitsluitend WBS-, werkpakket- en Project-Control-objecten beschrijft.)*

### 2.2 De CPM-engine van SAP PS in detail — alles met bron

**Netwerkmodel.** *"In the Project System networks are activity-on-mode networks"* [sic — SAP-documentatie bedoelt activity-on-node]. Kerncomponenten: **activiteiten** en **relaties** ([SAP Help – What is a Network?](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/29d4b65334e6b54ce10000000a174cb4.html)). Activiteitstypen: intern bewerkt, extern bewerkt, algemene kosten, service; plus **activiteitselementen** en **mijlpalen**.

**Voorwaartse en achterwaartse berekening.** *"A network is always scheduled forwards and backwards."* Forward scheduling berekent vroegste start-/einddata en de scheduled finish; backward scheduling de laatste data en de scheduled start. Startactiviteiten = alle activiteiten zonder voorganger; doelactiviteiten = alle zonder opvolger ([SAP Help – How Is a Network Scheduled?](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/0973b65334e6b54ce10000000a174cb4.html)).

**Vier scheduling-types** (in de netwerkheader): *Forward*, *Backward*, *Current Date Scheduling* (achterwaarts vanaf basiseinddatum, daarna voorwaarts vanaf vandaag — de facto een "data date"-doorrekening) en *Only Capacity Requirements* (kopieert basisdata; **relaties worden dan genegeerd**, alleen tijdsrestricties tellen) ([SAP Help – Scheduling Types](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/0c73b65334e6b54ce10000000a174cb4.html)).

**Afhankelijkheidstypen.** Alle vier: **FS, SS, FF, SF**, expliciet gedefinieerd in de documentatie, met de eerlijke SAP-notitie: *"SF relationships are seldom used in practice. You can usually change SF relationships to FS relationships by changing the sequence of the activities."* ([SAP Help – Types of Relationships](https://help.sap.com/docs/SAP_ERP/01032ef9a74b4326998a66f9c408d6d2/d573bb53707db44ce10000000a174cb4.html)).

**Lags / tijdsintervallen.** Relaties dragen een tijdsinterval. Cruciale nuance uit SAP's eigen documentatie: *"Scheduling interprets the time interval of the relationships as a **minimum** time interval. The system can increase the time interval during scheduling, but it cannot reduce it."* — **er is dus géén maximum-lag-mechanisme**; SAP mag een lag oprekken maar nooit inkorten ([SAP Help – Factors Influencing Scheduling](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/0f73b65334e6b54ce10000000a174cb4.html)). Voor planners die met negatieve lags (leads) en maximum-constraints werken zoals in P6, is dat een reëel verschil. In **PPM** mag het interval wél negatief zijn en kan er een kalender aan de relatie worden gehangen (zie §2.4).

**Constraints (datumrestricties).** Per activiteit, voor start én finish:

| Start | Finish |
|---|---|
| Must start on… | Must finish on… |
| Cannot start before… | Cannot finish before… |
| Cannot start later… | Cannot finish later… |
| Start from resource planning | Finish from confirmation |

Plus een *earliest/latest*-sleutel die vroegste = laatste data forceert (activiteit krijgt dan geen float) ([SAP Help – Time Constraints](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/1573b65334e6b54ce10000000a174cb4.html)). Daarnaast **afgeleide restricties**: WBS-datums werken als "not before"/"not later"-restricties op de eronder hangende activiteiten, en activiteiten met relaties naar *andere* netwerken krijgen die datums als vaste datums. SAP definieert een expliciete prioriteitsvolgorde: (1) restricties uit de activiteit zelf, werkelijke datums, datum uit resource planning; (2) restricties uit WBS-elementen of externe netwerken ([SAP Help – Dates From Other Objects](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/1b73b65334e6b54ce10000000a174cb4.html)).

**Floats en kritiek pad.** Volledig conform CPM-leer:
- *Total float* = latest finish − earliest finish; kan negatief zijn.
- *"Activities with the smallest total float are called 'critical'."*
- *"The critical path is the path through the network in which the activities and their relationships are ordered so that the total float is minimum. The critical path is in general the longest way to carry out the network."*
- *Free float* = ruimte zonder de vroegste data van opvolgers te raken; nooit < 0 en nooit > total float.

([SAP Help – Floats](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/1e73b65334e6b54ce10000000a174cb4.html))

Let op: SAP definieert "kritiek" als **laagste** total float, niet strikt als float = 0. Dat is technisch correcter dan veel concurrenten en past bij negatieve floats.

**Duurverkorting (reduction / "crashing").** Wanneer de doorgerekende data buiten de basisdata vallen, probeert SAP de duur stapsgewijs te verkorten volgens **reductiestrategieën**: per strategie tot **maximaal zes reductieniveaus** met een percentage per niveau; in de scheduling-parameters kiest men het maximale niveau en of **alle** activiteiten dan wel **alleen die op het kritieke pad** gereduceerd worden. Blijft het te krap, dan ontstaan negatieve floats. SAP waarschuwt zelf: *"If the system must carry out reduction measures, it schedules the network after each reduction level. This could lead to performance problems."* ([SAP Help – Reduction](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/2173b65334e6b54ce10000000a174cb4.html)).

**Kalenders.** Fabriekskalender (werkdagen en feestdagen, ingericht in Customizing) plus **operating time per werkdag per werkplek/capaciteit**. De werkplek levert bovendien **formules** voor het berekenen van duur en capaciteitsbehoefte. Bij externe activiteiten rekent SAP met het aantal levertijddagen. Een activiteit met een control key die "niet plannen" zegt, krijgt duur nul ([SAP Help – Factors Influencing Scheduling](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/0f73b65334e6b54ce10000000a174cb4.html)).

**Voortgang, actuals en herplanning.** Bij **gedeeltelijk gemelde** activiteiten wordt de vroegste startdatum vervangen door de werkelijke startdatum; de vroegste einddatum = actual start + prognoseduur (of prognose-einddatum uit de melding). Met de indicator *Shift network* bepaalt men of de restduur wordt gebruikt. Bij **volledig gemelde** activiteiten sturen de werkelijke datums de voor- en achterliggende activiteiten ([SAP Help – Scheduling of Finally/Partially Confirmed Activities](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/2473b65334e6b54ce10000000a174cb4.html)). Dit is functioneel het equivalent van "retained logic"-achtig gedrag, maar SAP biedt **geen expliciete keuze retained logic / progress override** zoals P6 dat doet.

**Meerdere netwerken.** *Overall network scheduling* (CN24/CN24N) plant alle via relaties gekoppelde netwerken in samenhang door; subnetwerken erven het tijdvenster van de bovenliggende activiteit, waarbij SAP expliciet meldt dat **de totale duur van het subnetwerk niet tegen de duur van de activiteit wordt gecontroleerd** ([SAP Help – Scheduling the Overall Network](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/0373b65334e6b54ce10000000a174cb4.html); [Dates From Other Objects](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/1b73b65334e6b54ce10000000a174cb4.html)).

**Planningsscenario's (top-down / bottom-up / free).** In de scheduling-parameters kiest men *Top-Down* (datums van projectdefinitie → WBS → activiteiten, met inperking), *Bottom-Up* (datums van beneden naar boven), of *Free scheduling* waarbij alle parameters handmatig gezet worden ([SAP Help – Settings for Scheduling Parameters](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/eb72b65334e6b54ce10000000a174cb4.html)).

**Wanneer wordt er gerekend?** Bij aanmaken van het netwerk, bij expliciet aanroepen van de scheduling-functie, bij opslaan als de indicator *Schedule automat.* aan staat (na vrijgave staat die automatisch aan), en na planningsrelevante wijzigingen. Bij een relevante wijziging zonder herberekening zet het systeem status **NTUP** ("Dates are not updated") ([SAP Help – Network Scheduling](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/0673b65334e6b54ce10000000a174cb4.html)).

### 2.3 Resource- en kostenmodel

- **Resources:** werkplekken (work centers) met capaciteitssoorten, beschikbare capaciteit en formules; **capaciteitsbehoefte** wordt tijdens de scheduling per activiteit/activiteitselement berekend als werkplek + werk + formules + control key aanwezig zijn ([SAP Help – Determining Capacity Requirements During Scheduling](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/2773b65334e6b54ce10000000a174cb4.html)).
- **Capaciteitsnivellering:** tabellarisch én grafisch planbord, met *dispatching* van activiteiten als kernfunctie; views op project-, netwerk- en werkplekniveau ([SAP Help – Capacity Leveling in the Project System](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/1ec4b65334e6b54ce10000000a174cb4.html)). Ook materiaal, **PRT (production resources/tools)**, documenten en tekeningen hangen aan activiteiten.
- **Kosten:** het echte kroonjuweel. Kostenplanning (structuurgericht, gedetailleerd, Easy Cost Planning, netwerkcalculatie), budgettering met beschikbaarheidscontrole, **commitments** uit aanvragen/bestellingen, werkelijke kosten uit inkoop, tijdschrijven (CATS), materiaalverbruik, opbrengsten, WIP/RA (results analysis), settlement naar kostenplaatsen/AfA/vaste activa. Dit is de reden dat PS bestaat.
- **Voortgang/EVA:** *Progress Analysis* met voortgangsversies en meettechnieken, waaronder de **mijlpaaltechniek** en **kostenproportionaliteit**; expliciet bedoeld voor projecten waar *"time is critical"* en waar veel werkpakketten zijn ([SAP Help – Progress Analysis](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/73b7b6531de6b64ce10000000a174cb4.html)).
- **Baselines:** SAP kent **project versions** ("snapshot" van het project op een moment/status; basis voor earned value analysis en **Milestone Trend Analysis**; onbeperkt aantal) én **simulation versions** (CJV1–CJV7) voor what-if ([SAP Help – Versions](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/d46cb6531de6b64ce10000000a174cb4.html)). Baselining bestaat dus, maar niet met de comfortabele "baseline bars naast de huidige bars"-ergonomie van P6/MSP; het is een versiebeheer- en rapportagemechanisme.

### 2.4 SAP PPM — wat de planningsengine daar wél en niet doet

Uit [SAP Help – Scheduling (SAP Portfolio and Project Management in S/4HANA 2025)](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/db719753e69f4e8eb9902aaea0fd8471/493246dde87f62b6e10000000a421138.html) en [Maintaining Relationships Between Tasks](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/db719753e69f4e8eb9902aaea0fd8471/497eede2d6c33d8be10000000a421138.html):

**Wel:**
- Vier relatietypen FS/SS/FF/SF tussen taken, met **tijdsinterval dat negatief mag zijn** en een **kalender per relatie**;
- Vroegste positie via forward scheduling vanaf de startdatum van de projectdefinitie, laatste positie via backward scheduling vanaf de einddatum;
- Twee scheduling-types: **top-down** en **bottom-up** (top-down is uitgesloten zodra het project summary tasks bevat);
- Vaste datums/constraints per element, met knop *Copy to Constraints*; vaste datums hebben voorrang boven outline dates én boven links naar andere taken;
- Optioneel werkelijke datums na confirmation als vaste datums (via BAdI/checkbox *Copy Actual to Planned*);
- Automatische scheduling in drie varianten (alle elementen / alleen niet-vrijgegeven elementen / alleen handmatig).

**Niet of beperkt:**
- **De tijdseenheid voor duur van projectelementen is `Day`** — letterlijk zo in de documentatie. Uurplanning bestaat niet;
- Geen total/free float-uitvoer en geen kritiek-pad-markering als eersteklas begrip in de documentatie aangetroffen;
- Checklist-items kennen alleen een vaste einddatum;
- Overlappende fasedata en taken buiten het fasevenster worden **toegestaan** en alleen als logbericht gemeld — een planner-onvriendelijke keuze;
- Scheduling vereist **Admin-autorisatie**.

**Gantt in PPM.** De grafische view draaide jarenlang op een **Java-plug-in-applet**. Omdat de Java-plug-in uit moderne JDK's is verdwenen, moest SAP een **SAPUI5-Gantt** bouwen (PPM 6.1 SP13). SAP somt in de eigen documentatie op wat daarin **niet** meer werkt: zoom alleen via slider met vier vaste niveaus (Jaar/Kwartaal/Maand/Kalenderweek), **navigatiefunctie niet ondersteund**, rijen verplaatsen in de hiërarchie via drag-and-drop **niet ondersteund**, **printen niet ondersteund**, deselecteren van alle rijen tegelijk onmogelijk, en elke veldwijziging moet met Enter bevestigd worden voor de volgende actie. De multi-project monitor is helemaal niet vervangen ([SAP Help – Alternative Gantt Chart based on SAPUI5 Technology](https://help.sap.com/docs/SAP_PORTFOLIO_AND_PROJECT_MANAGEMENT/47f3c81b7cc040f1aa74c2353651b6ac/1dee363b6e874dbdaaead050a56be96a.html)). Dit is de meest concrete, door de leverancier zelf gedocumenteerde onderbouwing van de klacht "zwakke planningsergonomie".

### 2.5 Platform, UI en schaalbaarheid

**Platform.** ABAP-stack op SAP HANA (S/4HANA) of klassieke DB (ECC). Twee UI-generaties naast elkaar:
- **SAP GUI**: Project Builder (CJ20N), Project Planning Board (CJ27/CJ2B), netwerkgrafiek, hiërarchiegrafiek, capaciteitsplanborden, CN-transacties;
- **SAP Fiori/SAPUI5**: sinds S/4HANA 2020 FPS1 de app **Project Network Graph**, sinds S/4HANA 2021 de app **Project Schedule** en sinds 2021 FPS1 **Project Schedule for Versions**. Vanaf S/4HANA 2022 FPS2 kan men vanuit CJ21–CJ25, CN24, CN24N en CJ29 doorspringen naar die Fiori-apps ([SAP Help – Navigation from SAP GUI Transactions to SAP Fiori Applications for Project Planning and Scheduling](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/b47ad8390d2f4d5d9bfa9268d0c03bde.html)).

**Belangrijke juridisch-technische waarschuwing.** De klassieke PS-graphics — **Project Planning Board, netwerkgrafiek en hiërarchiegrafiek** — vallen in S/4HANA onder de **compatibility scope**: *"limited usage rights"* met een **vervaldatum**, gedefinieerd in SAP Note 2269324 (compatibiliteitsmatrix ID 465). Hetzelfde gold aanvankelijk voor de simulatiefuncties; die zijn per S/4HANA 2020 FPS2 / 2021 FPS1 wél naar de *perpetual scope* gehaald ([S/4HANA 2021 Simplification List, §29.20 en §29.21, p. 654–656](https://help.sap.com/doc/f2591a6901344c97a5e2029cc8f3703e/2021/en-US/SIMPL_OP2021.pdf); [SAP Help – Compatibility Scope](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/c9b5e9de6e674fb99fff88d72c352291/9f17487cb7654c08baec66cfaa8867f7.html)). *De exacte einddatum staat in SAP Note 2269324, die alleen met SAP-login leesbaar is — die datum is dus **niet geverifieerd** in dit onderzoek en moet door de klant zelf worden nagegaan.*

**Schaalbaarheid.** Hier zit een pijnlijk verhaal.
- SAP erkent het probleem: in ECC EHP4/EHP6 introduceerde SAP de business functions **`OPS_PS_HLP_1` en `OPS_PS_HLP_2` ("Handling Large Projects")** met een aparte **Project Editor**, **project cache**, **Project Worklist**, **Draft Workbench** en **Administrator Workbench**, expliciet om *"system performance for the maintenance of master data of large project structures"* te verbeteren, inclusief een eigen Gantt-chart (die SAP GUI 7.20 patch 6 vereist en waarvoor een aparte SAP Note over geheugengebruik bestaat, Note 1014381) ([SAP Help – Handling Large Projects](https://help.sap.com/docs/SAP_ERP_SPV/01032ef9a74b4326998a66f9c408d6d2/dad431a083a242a88ba18130e25e36b5.html); [Project System: Handling Large Projects – Master Data](https://help.sap.com/docs/SAP_ERP/930f133a36a843318dc3347afe00a9d6/1e1aed30ff544c478d9589b12d69d7fb.html)).
- **In S/4HANA is die hele oplossing geschrapt.** Simplification item **S4TWL 29.12**: *"Project System business functions for Handling Large Projects and related transactions are not the target architecture anymore in SAP S/4HANA"*; PSHLP10/20/30/90 kunnen niet meer worden gebruikt; het advies is: *"Instead of Handling Large Projects transactions e.g. the Project Builder transaction should be used."* ([S/4HANA 2021 Simplification List, p. 645–646](https://help.sap.com/doc/f2591a6901344c97a5e2029cc8f3703e/2021/en-US/SIMPL_OP2021.pdf)).
- SAP verwijst voor projectomvang naar **SAP Note 206264** ("size of projects"), die niet publiek toegankelijk is.

**Realistische omvang (schatting van de analist, expliciet als zodanig gemarkeerd).** Op basis van de bovenstaande documentatie plus praktijkervaring in de sector: netwerken tot **enkele honderden activiteiten** zijn comfortabel; **1.000–5.000** activiteiten per project is haalbaar mits het netwerk goed is opgeknipt in subnetwerken en men het planbord vermijdt; boven de **10.000** activiteiten wordt het GUI-planbord onwerkbaar en kiezen organisaties in de praktijk vrijwel altijd voor Primavera P6 of een vergelijkbare tool als schema-master, met PS als kosten- en inkoopmotor. Dit cijfer is **niet** door SAP gepubliceerd en is een inschatting, geen bronfeit.

---

## 3. Prijzen

### 3.1 Het licentiemodel in het kort

- **Geen gratis tier, geen freemium, geen proefabonnement, geen zelfbedieningsaankoop.** Er is geen enkele manier om SAP PS of PPM per stoel online te kopen.
- **Geen publieke lijstprijs op sap.com.** SAP publiceert prijzen niet; alles loopt via offerte, partner of RISE/GROW-contract.
- **On-premise (klassiek):** eeuwigdurende licentie (named users + "engine"/pakketmetrieken) plus **17–22% jaarlijks onderhoud** over de licentiewaarde ([Vendr – SAP buyer guide, 2026](https://www.vendr.com/buyer-guides/sap), geraadpleegd 25-07-2026).
- **Cloud (RISE / GROW / S/4HANA Cloud):** maandabonnement per **FUE (Full Use Equivalent)** voor het ERP-platform, met **aparte gebruikersprijzen voor de EPPM-applicatie** bovenop.
- Vrijwel altijd komen daar **implementatie- en integratiekosten** bij die *"can equal or exceed software subscription fees"* (Vendr).

### 3.2 Harde lijstprijzen — SAP S/4HANA Cloud, EPPM, Private Edition

Bron: **NTT DATA Business Solutions, "NTT DATA SAP Pricing for G-Cloud — SAP S/4HANA Cloud Enterprise Portfolio and Project Management, Private Edition", documentversie 1.0, gedateerd 1 mei 2024**, gepubliceerd op het UK Crown Commercial Service-raamwerk **G-Cloud 14** ([PDF](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/702210/184802193487061-pricing-document-2024-05-01-1904.pdf); [listing](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/184802193487061), geraadpleegd 25-07-2026). Dit zijn expliciet **list prices**, niet nettoprijzen.

**Professional User** — *"has access to all elements of the Enterprise Portfolio and Project Management application"*, minimum 1 actieve gebruiker:

| Aantal Active Users | Lijstprijs per user per maand | Per user per jaar (berekend) |
|---|---|---|
| 1 – 100 | **£146** | £1.752 |
| 101 – 300 | **£83** | £996 |
| 301+ | **£66** | £792 |

**Standard User** — *"for use by Project Steering Committee members, and Project Team members only"*, minimum 1 actieve gebruiker:

| Aantal Active Users | Lijstprijs per user per maand | Per user per jaar (berekend) |
|---|---|---|
| 1 – 300 | **£39,10** | £469,20 |
| 301 – 1.700 | **£24,15** | £289,80 |
| 1.701+ | **£21,85** | £262,20 |

Voorwaarden uit hetzelfde document: alle prijzen **excl. btw**; **jaarlijkse indexatie op de contractverjaardag met het laagste van CPI en 3,3%**; back-up, recovery en upgrades zitten erin; **"solution support" zit er niet in**; kortingen op aanvraag. De publieke samenvatting op de G-Cloud-listing luidt: **"£22 to £147 a user a month"**.

*Omrekening (schatting van de analist, wisselkoers medio 2026 grofweg £1 ≈ €1,17 ≈ $1,27):* Professional User ≈ **€171 / $185 per gebruiker per maand** in de laagste staffel, aflopend tot ≈ €77 / $84 vanaf 301 gebruikers. Deze omrekening is indicatief; SAP hanteert per valuta eigen prijslijsten.

### 3.3 De onderliggende ERP-platformkosten (want EPPM draait niet los)

Zelfde bron/raamwerk, NTT DATA, **"RISE With SAP S/4HANA Cloud Private Edition", 2 mei 2024** ([PDF](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/702210/735410599987909-pricing-document-2024-05-02-1724.pdf)); listingsamenvatting **"£29 to £984 a user a month"**:

| Edition | Minimum FUE | Lijstprijs per FUE per maand |
|---|---|---|
| **Base** | 60 | £485 (vlak tarief) |
| **Premium** | 60 | £705 (1–135) → £393 (136–550) → £230 (551–1.000) → £161 (1.001–2.000) → £107 (2.001–4.000) → £64 (4.001–6.000) → £46 (6.001–12.000) → £38 (12.001–25.000) → **£29 (25.001+)** |
| **Premium Plus** | 60 | £975 (1–135) → £520 → £295 → £210 → £134 → £80 → £60 → £51 → **£37 (25.001+)** |
| Premium Upgrade Option | 60 | £272 (1–135) → … → £8,90 (25.001+) |

Verder: *Digital Access* £8,41 → £1,08 per blok (staffel 1–1.000 t/m 100.001+); extra productieve applicatieserver-tenant £4.186/maand; extra niet-productieve tenant £3.448/maand; *Customer Evaluation System* £41.136 (1 stuks) / £21.649 (2e).

**GROW with SAP S/4HANA Cloud Public Edition**, NTT DATA, 1 mei 2024 ([PDF](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/702210/143142176115221-pricing-document-2024-05-01-1834.pdf)); listingsamenvatting **"£42 to £487 a user a month"**:

| Edition | Minimum FUE | Lijstprijs per FUE per maand |
|---|---|---|
| **Base** | **15** | £487 (1–24) → £408 (25–60) → £328 (61–200) → £221 (201–550) → £150 (551–1.000) → £128 → £80 → £62 → **£43 (6.001+)** |
| **Premium** | **25** | £496 (1–60) → £388 → £259 → £178 → £135 → £84 → £58 → **£41 (6.001+)** |

Sandbox-tenant £6.540/maand.

### 3.4 Onafhankelijke transactiebenchmarks

[Vendr – "How much does SAP cost in 2026?"](https://www.vendr.com/buyer-guides/sap) (geraadpleegd 25-07-2026), op basis van geanonimiseerde contractdata:

- Mediaan SAP-contract: **$29.293 per jaar** (bandbreedte $11.660 – $347.035), gemiddelde korting **24,16%** over 55 behandelde deals;
- **SAP S/4HANA Cloud: $150 – $400+ per gebruiker per maand**, afhankelijk van editie en gebruikerstype;
- Kopers met **100–500 gebruikers**: totale jaarcontractwaarde typisch **$500K tot $3M+**;
- Meerjarige verbintenissen (3–5 jaar) leveren doorgaans **15–25% extra korting**;
- *"a professional user might cost 5–10x more than a self-service user."*

### 3.5 Benodigde add-ons (allemaal apart te licenseren; geen publieke lijstprijzen gevonden)

| Add-on | Waarvoor nodig | Prijsindicatie |
|---|---|---|
| **SAP Enterprise Project Connection (EPC)** | Koppeling naar Primavera P6 EPPM / MS Project Server | Geen publieke prijs gevonden — **schatting analist: vijfcijferig bedrag per jaar plus implementatie** |
| **SAP Multiresource Scheduling** | Fijnmazige resource-inplanning met UI5-planbord | Geen publieke prijs gevonden |
| **SAP Commercial Project Management** | EPC/professional-services: kosten- en opbrengstplanning, issue & change management, project workspace | Geen publieke prijs gevonden |
| **SAP Analytics Cloud** | Portfoliorapportage/dashboards | $30–$50+ p/u/m (Vendr) |
| **SAP BTP / Integration Suite** | Elke koppeling naar niet-SAP-planners | Consumptiegebaseerd (Vendr) |
| **Digital Access licenties** | Documenten die door externe systemen worden aangemaakt | £8,41 → £1,08 per blok (G-Cloud, zie boven) |

**Praktische conclusie over prijs.** Voor een organisatie die SAP al draait, is EPPM een relatief bescheiden meerprijs bovenop een zeer grote ERP-rekening. Voor een organisatie die SAP *niet* draait, is SAP PS/PPM als planningstool economisch onbespreekbaar: je koopt een ERP van honderdduizenden tot miljoenen euro's per jaar om een planner te krijgen die functioneel achterloopt op een P6-licentie van enkele duizenden euro's.

---

## 4. VOORDELEN

1. **Een echte, complete CPM-engine — geen balkendiagram-simulatie.** Voorwaartse én achterwaartse doorrekening, vroegste/laatste data, **total float en free float** met correcte definities, kritiek pad als pad met minimale total float, alle vier relatietypen, tijdsintervallen, harde datumrestricties in zes varianten en duurverkortingsstrategieën tot zes niveaus. Dit is aantoonbaar uit SAP's eigen documentatie en zet PS in een andere categorie dan werkbeheertools die alleen balken tekenen ([Floats](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/1e73b65334e6b54ce10000000a174cb4.html), [Scheduling Types](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/0c73b65334e6b54ce10000000a174cb4.html), [Reduction](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/2173b65334e6b54ce10000000a174cb4.html)).

2. **Onovertroffen integratie tussen planning, kosten, inkoop en materiaal — in één transactieboek.** Een netwerkactiviteit genereert direct inkoopaanvragen, bestellingen, materiaalreserveringen, capaciteitsbehoefte en tijdschrijfregels; commitments en werkelijke kosten landen op hetzelfde WBS-element als de planning. Geen enkele stand-alone planner (P6, MSP, Asta) kan dit zonder interface. PeerSpot-gebruikers noemen precies dit als kernvoordeel: *"The platform integration with SAP finance systems has unified language and criteria… ensuring international financial control and management"* ([PeerSpot](https://www.peerspot.com/products/sap-portfolio-and-project-management-reviews)).

3. **Eén waarheid voor auditors, financiële rapportage en revenue recognition.** WIP, results analysis, settlement, budgetbeschikbaarheidscontrole en earned value lopen door dezelfde grootboekstructuur. Voor beursgenoteerde EPC-aannemers en publieke opdrachtgevers is dat een compliance-argument dat zwaarder weegt dan planningscomfort.

4. **Volwaardige voortgangs- en verdiende-waarde-analyse met versies als baseline.** *Progress Analysis* met voortgangsversies, mijlpaaltechniek en kostenproportionaliteit; **project versions** als snapshot voor EVA en **Milestone Trend Analysis**, plus **simulation versions** (CJV1–CJV7) voor what-if — en die simulaties zijn per S/4HANA 2020 FPS2 uit de compatibility scope naar de permanente scope gehaald ([Progress Analysis](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/73b7b6531de6b64ce10000000a174cb4.html), [Versions](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/d46cb6531de6b64ce10000000a174cb4.html), [Simplification List §29.21](https://help.sap.com/doc/f2591a6901344c97a5e2029cc8f3703e/2021/en-US/SIMPL_OP2021.pdf)).

5. **Netwerkoverstijgende planning en subnetwerken.** *Overall network scheduling* rekent alle via relaties gekoppelde netwerken in samenhang door — inclusief service- en onderhoudsorders. Voor een programma met tientallen deelnetwerken en gedeelde mijlpalen is dat een serieuze capaciteit ([Scheduling the Overall Network](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/0373b65334e6b54ce10000000a174cb4.html)).

6. **Capaciteitsplanning met echte werkplekmodellering.** Beschikbare capaciteit per werkplek en capaciteitssoort, formules voor duur en capaciteitsbehoefte, operating time per werkdag, fabriekskalender, en nivellering met dispatching in een tabellarisch én grafisch planbord, in project-, netwerk- en werkplekview ([Capacity Leveling](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/1ec4b65334e6b54ce10000000a174cb4.html)).

7. **Verrassend genuanceerd omgaan met voortgangsmeldingen.** Bij gedeeltelijke meldingen verschuift de vroegste startdatum naar de werkelijke start en rekent SAP met prognose- of restduur; bij volledige meldingen sturen actuals de omliggende activiteiten. Met de *Shift network*-indicator is dat gedrag instelbaar ([Scheduling of Finally/Partially Confirmed Activities](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/2473b65334e6b54ce10000000a174cb4.html)).

8. **Governance en portfolio bovenop de uitvoering (PPM).** Stage-gate-methodiek, fasen-en-beslissingen-dashboard, initiatievenbeheer, financiële en capaciteitsplanning over IT/finance/R&D heen, rollen- en staffingbeheer. PeerSpot vat het samen als *"easy initiative management, stage-gate methodology, and seamless integration with other SAP models"*.

9. **Volwassen, gestaffelde cloudprijzen met transparante staffels — als je ze weet te vinden.** De EPPM-staffels (£146 → £66 professional; £39,10 → £21,85 standard) en de FUE-staffels van RISE/GROW zijn expliciet gepubliceerd op G-Cloud, inclusief indexatieclausule. Dat maakt onderhandelen mogelijk op basis van feitelijke lijstprijzen.

10. **Sterke sentiment- en leverancierscores bij bestaande klanten.** SoftwareReviews: **composite 7,7/10, CX 8,1/10** over 19 reviews; **Net Emotional Footprint +96** met 98% positieve reacties; leverancierscapaciteiten *Quality of Features*, *Business Value Created* en *Breadth of Features* alle **90/100** tegen een categoriegemiddelde van 81 ([SoftwareReviews – SAP EPPM](https://www.softwarereviews.com/products/sap-portfolio-and-project-management), geraadpleegd 25-07-2026). PeerSpot: **4,4/5 (8,8/10)**, **100% willing to recommend** — zij het over slechts 5 reviews.

---

## 5. NADELEN

1. **De planningsergonomie is aantoonbaar zwak — SAP documenteert het zelf.** De PPM-Gantt moest van Java-applet naar SAPUI5 en SAP somt in de eigen release-notitie op wat daarbij sneuvelde: **printen niet ondersteund**, **navigatiefunctie niet ondersteund**, rijen verslepen in de hiërarchie niet ondersteund, zoom beperkt tot vier vaste niveaus via een slider, elke veldwijziging moet met Enter bevestigd worden, en de multi-project monitor is helemaal niet vervangen ([SAP Help](https://help.sap.com/docs/SAP_PORTFOLIO_AND_PROJECT_MANAGEMENT/47f3c81b7cc040f1aa74c2353651b6ac/1dee363b6e874dbdaaead050a56be96a.html)). Een planner die uit P6 of MSP komt, ervaart dit als een stap terug van jaren.

2. **Het schaalbaarheidsantwoord voor grote projecten is in S/4HANA geschrapt.** SAP bouwde in ECC precies voor dit probleem *Handling Large Projects* (Project Editor, project cache, worklist, draft workbench). In S/4HANA zijn `OPS_PS_HLP_1` en `OPS_PS_HLP_2` **obsolete** en zijn PSHLP10/20/30/90 niet meer bruikbaar; het advies is *"use the Project Builder transaction"* — dus terug naar de tool die het probleem juist veroorzaakte ([S/4HANA 2021 Simplification List §29.12, p. 645–646](https://help.sap.com/doc/f2591a6901344c97a5e2029cc8f3703e/2021/en-US/SIMPL_OP2021.pdf)).

3. **De klassieke planningsgrafiek leeft op geleende tijd.** Project Planning Board, netwerkgrafiek en hiërarchiegrafiek zitten in de **compatibility scope met beperkte gebruiksrechten en een vervaldatum** (SAP Note 2269324, matrix-ID 465). De Fiori-vervangers (*Project Schedule*, *Project Network Graph*) zijn read-/analyse-georiënteerd en bieden niet dezelfde bewerkingsdiepte ([Simplification List §29.20](https://help.sap.com/doc/f2591a6901344c97a5e2029cc8f3703e/2021/en-US/SIMPL_OP2021.pdf)).

4. **Belangrijke interfaces zijn verwijderd bij de overstap naar S/4HANA.** Weg zijn: **OpenPS for Microsoft Project** (bidirectionele uitwisseling met MS Project), **MPX up-/download inclusief CN06 en CN07**, de **Palm-download** en de export naar **Graneda en Microsoft Access**. SAP's eigen advies: gebruik SAP EPC of de PS-BAPI's ([Simplification List §29.6, p. 637–638](https://help.sap.com/doc/f2591a6901344c97a5e2029cc8f3703e/2021/en-US/SIMPL_OP2021.pdf)). Wie op ECC een werkende MS-Project-koppeling had, raakt die kwijt.

5. **De officiële brug naar Primavera P6 is bevroren sinds 2017.** **SAP Enterprise Project Connection 3.0 FP01**, documentatie gepubliceerd **15 juni 2017**, ondersteunt **Oracle Primavera P6 EPPM 16.1 en 16.2**. Een zoekopdracht op de SAP Help Portal naar nieuwere versies (3.0.02, 3.1, 4.0, LATEST) levert op 25-07-2026 uitsluitend 3.0 FP01 op ([SAP Help – SAP Enterprise Project Connection](https://help.sap.com/docs/SAP_ENTERPRISE_PROJECT_CONNECTION/e8fccb188d444cbfa10ed69c1466da78/09a1db4b3e524a62a845509d006374a5.html); [Oracle Primavera P6 EPPM 16.1 and 16.2 Support](https://help.sap.com/docs/SAP_ENTERPRISE_PROJECT_CONNECTION/4462b8e530aa4159bf9898f254c359aa/8c211fc1e7444e488e27c52ad41e94d2.html)). P6 EPPM zit inmiddels vele releases verder; klanten bouwen in de praktijk eigen koppelingen op BTP/Integration Suite of kopen middleware van derden.

6. **Geen maximum-lag en geen expliciete retained-logic/progress-override-keuze.** SAP interpreteert het tijdsinterval van een relatie **uitsluitend als minimum** en *"can increase the time interval during scheduling, but it cannot reduce it"* ([Factors Influencing Scheduling](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/0f73b65334e6b54ce10000000a174cb4.html)). Planners die maximum-constraints, leads en de P6-schedulingopties gewend zijn, moeten hun logica herschrijven.

7. **PPM plant in hele dagen.** *"The time unit for the duration of project elements is `Day`."* Voor turnaround-, shutdown-, ploegen- of installatieplanning is dat onbruikbaar. Bovendien worden overlappende fasedata en taken buiten het fasevenster **toegestaan** en slechts als logbericht gemeld ([SAP Help – Scheduling (PPM)](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/db719753e69f4e8eb9902aaea0fd8471/493246dde87f62b6e10000000a421138.html)).

8. **Gebruikers noemen de UI consequent gedateerd en het geheel complex en traag.** SoftwareReviews-citaten: *"Sometimes, it feels a bit complex and takes time to learn all its features. The user interface could be more modern and easier to navigate"*; *"Due to its complicated processes, SAP PPM was first challenging to understand… The user interface is also a little shaky. **The cost is considerably higher than that of rivals.** Its restricted functionality is viewed as a drawback"*; *"users have experienced slow loading times and occasional system crashes"* ([SoftwareReviews](https://www.softwarereviews.com/products/sap-portfolio-and-project-management)). PeerSpot: *"It's not cheaper. … the SAP systems are not very user-friendly"* (Samsung, QA Group Lead) en *"The product itself could have an advanced analytics layer with an improved user interface that is adapted to the new digital era."*

9. **Installatie, configuratie en beheer zijn zwaar.** PeerSpot-review van een Samsung-medewerker: installatie voor één gebruiker met toegang tot drie à vier modules kost *"around two days"*, met handmatig downloaden van beveiligingsbestanden en het draaien van een installer — *"Overall, it's a cumbersome process. And ideally, it should be a plug-and-play kind of installation."* Dezelfde organisatie evalueert ServiceNow als vervanger. Een andere klacht bij ~3.000 gelijktijdige projecten wereldwijd: *"the system is old… sometimes the data gets stuck… It could benefit from decentralization."*

10. **Slechte integratie met niet-SAP-tools; zwakke marktdynamiek.** Gebruikers vragen expliciet om Jira/Bitbucket-integratie; PeerSpot's vergelijkingsrapport stelt dat SAP PPM *"could enhance its user interface and expand analytics capabilities to match rivals. It may benefit from greater scheduling and risk management features"* — let op: **"greater scheduling … features"** als expliciet verbeterpunt in een SAP-vs-Primavera-vergelijking. En de mindshare daalt hard: **3,7% in juli 2026 tegen 6,3% een jaar eerder** in de PPM-categorie ([PeerSpot](https://www.peerspot.com/products/sap-portfolio-and-project-management-reviews); [SAP PPM vs Oracle Primavera Portfolio Management](https://www.peerspot.com/products/comparisons/sap-portfolio-and-project-management_vs_oracle-primavera-portfolio-management)).

11. **Onvindbare prijzen en een economisch onverdedigbare instap voor niet-SAP-klanten.** Er is geen gratis niveau, geen proefversie, geen prijs op de website. De laagste realistische instap is een RISE- of GROW-contract met **minimaal 60 respectievelijk 15 FUE**, plus de EPPM-gebruikerslicenties daarbovenop. Voor een organisatie zonder SAP is dat een orde van grootte duurder dan elke gespecialiseerde CPM-tool.

---

## 6. Interoperabiliteit

### 6.1 Ondersteunde formaten en interfaces — feitelijk overzicht

| Formaat / interface | SAP PS (ECC) | SAP PS (S/4HANA) | SAP PPM | Opmerking |
|---|---|---|---|---|
| **Primavera XER** | ✗ | ✗ | ✗ | Nergens ondersteund |
| **Primavera P6 XML** | ✗ | ✗ | ✗ | Nergens als bestandsformaat |
| **Primavera P6 EPPM (API/webservice)** | via **SAP EPC** | via **SAP EPC** | via **SAP EPC** | EPC 3.0 FP01, alleen **P6 EPPM 16.1/16.2** |
| **MS Project MPP** | ✗ | ✗ | ~ | PPM exporteert/importeert naar een **MSP-bestand**, maar vereist een lokaal geïnstalleerde MS Project (SAP Note 1326709) |
| **MS Project MPX** | ✓ (CN06/CN07) | **✗ verwijderd** | ✗ | Geschrapt in S/4HANA |
| **MSPDI (MS Project XML)** | ✗ | ✗ | ✗ | Niet aangetroffen in de documentatie |
| **OpenPS4MSP (bidirectioneel MS Project)** | ✓ | **✗ verwijderd** | n.v.t. | Geschrapt in S/4HANA |
| **MS Project Server** | via **SAP EPC** | via **SAP EPC** | via **SAP EPC** | EPC ondersteunt MS Project Server als "third-party EPM system" |
| **CSV / Excel** | ✓ (XXL-Listviewer, ALV-export) | ✓ (ALV/Fiori-export) | ✓ | Export uit rapportages, geen round-trip-planningsformaat |
| **Graneda, MS Access** | ✓ | **✗ verwijderd** | ✗ | Geschrapt in S/4HANA |
| **BAPI / RFC** | ✓ | ✓ | ✓ | PS-EPS 4.0 (BAPI-gebaseerd); `ProjectDefinitionPI`, `NetworkPI`, `WBSPI` in package `CNIF_PI` |
| **OData / REST** | beperkt | ✓ | ✓ | `API_ENTERPRISE_PROJECT_SRV` (v0002), Project Definition/Element-API's; SAP PRM biedt REST met relatietypen |
| **IFC 4.3 / IfcWorkSchedule / IfcTask** | ✗ | ✗ | ✗ | **Volledig afwezig** — zie §6.4 |

### 6.2 De open interfaces in detail

**PS-EPS (Interface to External Project Software).** SAP's officiële open koppelvlak voor externe planningssoftware. Twee generaties: **EPS 3.1** (RFC-gebaseerd, *"No further developments"*) en **EPS 4.0** (BAPI-gebaseerd, bevat alle EPS 3.1-functies, *"Further development in progress"* — een zin die uit de R/3-4.0A-tijd stamt). SAP noemt als voordelen: open interface, gecertificeerde SAP-softwarepartners bouwen interfaceoplossingen, klanten kunnen hun eigen interfaces bouwen ([SAP Help – PS-EPS Interface to External Project Software](https://help.sap.com/docs/SAP_ERP/466c183205dd4c4ea1d595f66a84d274/6175bb53707db44ce10000000a174cb4.html)).

**Open PS (OpenPS4MSP).** *"With OpenPS4MSP you can exchange complete projects between Microsoft Project and the Project System"* — een project in MSP maken vanuit PS, terugzetten en synchroniseren. Werd los van de ERP-releasecyclus ontwikkeld en via SAP Service Marketplace gedistribueerd ([SAP Help – Open Project System](https://help.sap.com/docs/SAP_ERP/466c183205dd4c4ea1d595f66a84d274/050ebb536b13b44ce10000000a174cb4.html)). **Niet meer beschikbaar in S/4HANA.**

**SAP Enterprise Project Connection.** Het volwassenste integratieverhaal dat SAP heeft: object-level mapping, field-level mapping, expliciet **system of record** per object (*"there must be one, and only one, system of record for a given piece of information"*, waarbij SAP meestal de bron is), object identity via sleutelattributen, en business rules. De *Transfer Projects*-transactie kent drie richtingen: SAP → third-party EPM, third-party EPM → SAP, en **SAP Actuals → third-party EPM** — precies het klassieke EPC-scenario "plannen in P6, kosten in SAP, actuals terug naar P6" ([SAP Help – Integration of SAP ERP…and Third-Party EPM Systems](https://help.sap.com/docs/SAP_ENTERPRISE_PROJECT_CONNECTION/e8fccb188d444cbfa10ed69c1466da78/e4d9357c688749839c8ee39178c2d81f.html); [Project Transfers](https://help.sap.com/docs/SAP_ENTERPRISE_PROJECT_CONNECTION/e8fccb188d444cbfa10ed69c1466da78/92110a99eed44bdb98d0a58f30ea5f5f.html)). De mappingdetails staan in SAP Note 2292815 (login vereist). **Beperking: laatste release 3.0 FP01 (2017), P6 EPPM 16.x.**

**Moderne API's.** `API_ENTERPRISE_PROJECT_SRV;v=0002` biedt CRUD op projectdefinitie, projectrollen, teamleden, entitlements, geblokkeerde functies, JVA- en public-sector-velden ([SAP Help – Operations for Enterprise Project](https://help.sap.com/docs/SAP_S4HANA_CLOUD/988903b47d7040f6ac4ec02e44bb58e4/e3a1e6b27add49ee84c047a10b9ba06e.html)). In het nieuwere **SAP Project and Resource Management** bestaat een entiteit *Project Element Relationships* met een `type`-veld dat *"can only be FF(Finish to Finish), FS(Finish to Start), SF(Start to Finish) or SS(Start to Start)"* ([SAP Help – Project Element Relationships](https://help.sap.com/docs/PPRM_OD/f0274264fc5242e291cf4c2c12164e89/f4d04f771f6d45f0a3b9ad266e37dc8b.html)) — dat is een bruikbaar, modern koppelpunt.

**PPM ↔ MS Project.** Mapping: projectdefinitie → project summary task; fase/taak/checklist/checklist-item → task of summary task; rol → resource. SAP raadt aan de online planning te exporteren naar een **offline MSP-bestand**, daar te wijzigen en terug te importeren. Nieuwe fasen/checklists/taken importeren vereist dat de objecttypen als *enterprise fields* in MS Project zijn gedefinieerd ([SAP Help – Export or Import Data from or to Microsoft Project](https://help.sap.com/docs/SAP_PORTFOLIO_AND_PROJECT_MANAGEMENT/777fb7067f834a4dba3307f1186000b4/a6f0b42deae446f8be8657649e8b3ffa.html)). Dit is een batch-uitwisseling, geen live koppeling.

### 6.3 Belangrijke import-/exportbeperkingen

- **Geen enkel gestandaardiseerd planningsuitwisselingsformaat.** Geen XER, geen P6 XML, geen MSPDI. Alles loopt via API's of proprietary batchbestanden.
- **De MS-Project-brug in PPM vereist een lokaal geïnstalleerde MS Project** — geen serverzijdige conversie.
- **EPC is een apart, apart gelicentieerd, apart te installeren en verouderd product**, geen ingebouwde functionaliteit.
- **Kalender- en werktijdmodellen mappen slecht.** SAP's fabriekskalender + operating time per werkplek is structureel anders dan de kalendermodellen van P6/MSP; dit is de klassieke bron van datumafwijkingen bij iedere koppeling. *(Inschatting van de analist op basis van de modelverschillen; geen expliciete SAP-bronvermelding.)*
- **Relatiesemantiek verschilt.** Minimum-only lags in PS versus lead/lag en maximum-constraints elders.

### 6.4 IFC 4.3 — de conclusie die er voor de opdrachtgever toe doet

**SAP PS en SAP PPM ondersteunen IFC op geen enkele manier.** Er is geen import, geen export, geen mapping en geen enkele vermelding van `IfcWorkSchedule`, `IfcTask`, `IfcTaskTime`, `IfcRelSequence` of `IfcWorkCalendar` in de PS- of PPM-documentatie. Een gerichte zoekopdracht op "IFC / Industry Foundation Classes" over de gehele SAP Help Portal levert IFC-ondersteuning **uitsluitend** op in **SAP 3D Visual Enterprise Generator/Author** — een CAD-conversie- en visualisatieproduct dat `.ifc` en `.ifcxml` kan **inlezen en tonen**, met opties als "Import Wireframes" en "Create Volumes for Interior/Exterior" ([SAP Help – Industry Foundation Classes, SAP 3D Visual Enterprise Generator](https://help.sap.com/docs/SAP_3D_VISUAL_ENTERPRISE_GENERATOR/681b886ba1bd1014b4ccd0d8ce91d6b5/950a8d6133bb45b5a122fcdbc75bc76a.html)). Dat is geometrie, geen planning: er is geen enkele koppeling tussen IFC-tijdplanningsentiteiten en het PS-netwerk.

**Wat dit betekent voor een open-source, IFC-gebaseerde planner (zoals Open Planner Studio):**

1. **Er is geen concurrentie op het IFC-vlak.** SAP heeft op planningsgebied nul BIM/IFC-integratie. 4D-BIM koppelingen in SAP-landschappen worden altijd door derden gebouwd (Synchro, Bentley, Bexel, Sablono, Trimble, enz.), nooit door SAP zelf.
2. **Het realistische koppelvlak is de API-laag, niet een bestandsformaat.** Voor een IFC-planner die met SAP moet praten zijn de bruikbare paden: `API_ENTERPRISE_PROJECT_SRV` (OData) voor projectdefinitie/WBS, de PS-BAPI's (`ProjectDefinitionPI`, `NetworkPI`, `WBSPI` in `CNIF_PI`) voor netwerken en activiteiten, en desgewenst SAP PRM's REST-relatie-entiteit. Een CSV/Excel-koppeling blijft in de praktijk het snelste pad voor eenmalige uitwisseling.
3. **De mapping IFC ↔ SAP is conceptueel schoon te maken.** `IfcWorkSchedule` → SAP-netwerk (of projectversie); `IfcTask` → netwerkactiviteit; `IfcTaskTime` → duur/vroegste/laatste data; `IfcRelSequence` met `SequenceType` (`FINISH_START`, `START_START`, `FINISH_FINISH`, `START_FINISH`) en `TimeLag` → SAP-relatie met tijdsinterval; `IfcWorkCalendar` → fabriekskalender + operating time. De semantische valkuil is de **minimum-only lag** in SAP en het feit dat SAP een lag mag oprekken.
4. **Positioneringsadvies:** presenteer een IFC-planner niet als vervanger van SAP PS, maar als de **schema-master vóór SAP** — dezelfde rol die Primavera P6 nu speelt, maar dan open, IFC-native en zonder EPC-licentie. Dat is een verdedigbaar en aantoonbaar onbezet gat.

---

## 7. Marktpositie

### 7.1 Waar SAP sterk staat, en waarom

SAP PS is **de facto standaard voor projectgedreven kostenbeheersing** in elke organisatie die SAP als ERP draait. In kapitaalintensieve sectoren — olie & gas, mijnbouw, energie, chemie, defensie, scheeps- en machinebouw, publieke infrastructuur — is de combinatie "netwerkactiviteit genereert bestelling, bestelling wordt commitment, commitment wordt werkelijke kost op hetzelfde WBS-element" bijna onvervangbaar. Die kracht is **structureel** (het is dezelfde database) en niet functioneel te evenaren door een stand-alone planner met een interface.

De zwakte is even structureel: **SAP wint de kostenkant en verliest de schemakant.** In EPC-projecten is het gangbare patroon: **Primavera P6 als schema-master, SAP PS als kosten-, inkoop- en tijdschrijfmotor**, met een handmatige of EPC-gebaseerde koppeling ertussen. Dat patroon houdt stand omdat planners weigeren in SAP te plannen, niet omdat SAP's engine tekortschiet.

### 7.2 Belangrijkste concurrenten

**Direct in de PPM-categorie** (uit PeerSpot's eigen "Popular Comparisons"-lijst): Broadcom Clarity, Planview Portfolios, ServiceNow Strategic Portfolio Management, Smartsheet, Planisware, Microsoft Project Server, Planview PPM Pro, OpenText PPM, Oracle Primavera Portfolio Management, Sciforma, Planview Daptiv, Alfabet, UMT360, **EcoSys** (Hexagon), WorkOtter.

**In de CPM-/project-controls-hoek waar het er echt om gaat:** Oracle Primavera P6 EPPM en Primavera Cloud, Oracle Primavera Unifier, Microsoft Project / Project Online / Project for the web, Deltek Acumen/Open Plan, InEight Schedule, Asta Powerproject, Safran Project, Hexagon EcoSys, Synchro/Bentley (4D).

### 7.3 Marktaandeel- en sentimentindicatoren

| Indicator | Waarde | Bron / datum |
|---|---|---|
| SAP PPM — rangorde in PPM-categorie | **#11** | PeerSpot, 25-07-2026 |
| SAP PPM — mindshare PPM-categorie | **3,7%** (juli 2026), **gedaald van 6,3%** een jaar eerder | PeerSpot, 25-07-2026 |
| Ter vergelijking: Broadcom Clarity 9,6%; Planview Portfolios 6,4%; overig 80,3% | | PeerSpot, 25-07-2026 |
| SAP PPM — gebruikersscore | **4,4/5** (8,8/10), **100% willing to recommend**, **5 reviews** | PeerSpot, 25-07-2026 |
| SAP EPPM — composite score | **7,7/10**; CX-score **8,1/10**; **19 reviews** | SoftwareReviews, 25-07-2026 |
| SAP EPPM — Net Emotional Footprint | **+96** (98% positief, 2% negatief) | SoftwareReviews, 25-07-2026 |
| Grootste bezoekende sector voor SAP PPM | **Construction Company, 11%** | PeerSpot, 25-07-2026 |
| Bedrijfsomvang van geïnteresseerden | **48% large enterprise** | PeerSpot, 25-07-2026 |
| Vergelijking met Primavera Portfolio Management | *"Oracle Primavera appears to have the upper hand due to its robust functionality and comprehensive feature set"*; SAP *"may benefit from greater scheduling and risk management features"* | PeerSpot Executive Summary, bijgewerkt 03-06-2026 |
| Vergelijking met Microsoft Project Server | *"Microsoft Project Server is seen as the more attractive option due to its extensive feature set, despite SAP's advantages in pricing and support"* | PeerSpot Executive Summary, bijgewerkt 03-06-2026 |
| SAP SE omzet | **€36,8 mrd (2025)**, 110.650 medewerkers | Wikipedia, 25-07-2026 |

**Interpretatie (analist).** De lage reviewaantallen (5 op PeerSpot, 19 op SoftwareReviews) zijn zelf een signaal: SAP PPM is **geen product dat mensen kiezen**, het is een product dat mensen **erven** omdat er al SAP staat. De hoge tevredenheidsscores komen dan ook van een zelfselecterende groep bestaande SAP-klanten. De halvering van de mindshare in één jaar is het duidelijkste marktsignaal in dit dossier.

**Gebruikersaantallen / omzet van PS en PPM afzonderlijk zijn niet openbaar.** SAP rapporteert geen module-omzet. *Schatting van de analist:* het aantal organisaties met een actief ingerichte PS-module ligt wereldwijd in de **orde van grootte van enkele tienduizenden**, gegeven de tienduizenden ECC/S/4HANA-installaties en het feit dat PS in vrijwel elke projectgedreven implementatie meegaat; PPM-installaties zijn een orde kleiner. Dit is **niet** gebaseerd op een gepubliceerde bron.

### 7.4 Trend

- **SAP schuift naar Fiori en cloud-EPPM.** *Project Schedule*, *Project Network Graph*, *Project Control – Enterprise Projects*, *Project Control – Professional Services Projects*, *Manage Project Plans* (SAP PRM). De richting is duidelijk: WBS + werkpakketten + rolgebaseerde planning, met een moderne UI.
- **De klassieke netwerk-CPM-functionaliteit wordt niet doorontwikkeld maar ook niet weggegooid.** Zij blijft in on-premise/private cloud; de grafische schil zit deels in compatibility scope.
- **De public-cloud-variant heeft geen netwerken.** Wie naar S/4HANA Cloud Public Edition gaat, verliest de netwerk-CPM-engine en houdt WBS-planning over. *(Inschatting van de analist, zie §2.1.)*
- **De P6-brug verschraalt.** EPC staat stil sinds 2017; de facto migreert de markt naar eigen BTP-integraties of derden.

---

## 8. Eindoordeel

### Voor wie wél

- **Organisaties die SAP ECC of S/4HANA (on-premise / private cloud) draaien** en projectkosten, budgetten, commitments, inkoop, materiaal en tijdschrijven op WBS-niveau willen sturen. Dan is PS geen keuze maar een gegeven — en een goede.
- **EPC-aannemers, olie & gas, mijnbouw, energie, defensie, ETO-machinebouw** die auditbare financiële projectcontrole nodig hebben en toch netwerkplanning binnen hetzelfde systeem willen.
- **Portfolio- en stage-gate-governance in SAP-shops** (R&D-pijplijnen, IT-portfolio's, investeringsprogramma's) — daar is PPM functioneel prima.
- **Programma's met veel gekoppelde deelnetwerken** waar overall network scheduling en subnetwerken echt waarde toevoegen.

### Voor wie níet

- **Organisaties zonder SAP.** De instapkosten (RISE min. 60 FUE à £485+/maand, of GROW min. 15 FUE) zijn een veelvoud van elke gespecialiseerde CPM-tool. Volstrekt onverdedigbaar als je alleen een planner zoekt.
- **Planners en schedulers als primaire gebruikersgroep.** De ergonomie — trage GUI-planborden in compatibility scope, een UI5-Gantt zonder printen en zonder navigatie, dagresolutie in PPM — jaagt hen weg. Zij blijven P6 of Asta gebruiken.
- **Zeer grote schema's (>10.000 activiteiten).** SAP's eigen antwoord daarop (Handling Large Projects) is in S/4HANA obsolete verklaard. *(Grens is een schatting van de analist.)*
- **Turnaround-, shutdown-, ploegen- en installatieplanning op uurniveau in PPM.** Dagresolutie sluit dat uit.
- **BIM/4D-gedreven organisaties.** Nul IFC-ondersteuning in de planningsmodules.
- **Kleine en middelgrote bedrijven** en projectbureaus.

### Is dit een serieus alternatief voor klassieke CPM-tools?

**Voor SAP PS: ja op engine-niveau, nee op werkplekniveau.** De rekenkern is echt en volledig — voorwaarts/achterwaarts, total en free float, kritiek pad als minimale-float-pad, FS/SS/FF/SF, tijdsintervallen, zes soorten datumrestricties, reductiestrategieën, kalenders, capaciteitsbehoefte, netwerkoverstijgende doorrekening, versies en EVA. Dat is meer dan de meeste "werkbeheertools" ooit zullen hebben. Maar de **gereedschapskist rond de engine** — visualisatie, wat-als-snelheid, bulkbewerking, filtering, layouts, baselinevergelijking op het scherm, rapportlayouts, uitwisselingsformaten — loopt een generatie achter op Primavera P6, en SAP investeert daar aantoonbaar niet in (compatibility scope, geschrapte interfaces, bevroren EPC, obsolete Handling Large Projects). In de praktijk blijft SAP PS daarom wat het al twintig jaar is: **de kostenmotor naast de echte planner**, niet de planner zelf.

**Voor SAP PPM: nee.** Dat is een portfolio- en governancetool met een lichte planningslaag, geen CPM-tool. Wie het als vervanger van P6 of MSP positioneert, verkoopt iets anders dan hij levert.

**Voor SAP S/4HANA Cloud Public Edition EPPM: nee.** WBS-planning zonder netwerk-CPM.

**Relevantie voor een open-source, IFC-gebaseerde planner.** SAP is geen directe concurrent maar een **integratiedoelwit**. De aantrekkelijkste positionering is die van open, IFC-native schema-master vóór SAP — precies de plek waar nu Primavera P6 zit, met als extra argument dat SAP's eigen brug naar P6 sinds 2017 stilstaat en de MS-Project-koppelingen in S/4HANA zijn geschrapt. Een goed gedocumenteerde OData/BAPI-connector plus een schone `IfcWorkSchedule` ↔ SAP-netwerk-mapping is een concreet en onbezet differentiatiepunt.

---

## Bronnenlijst

Alle bronnen geraadpleegd op **25 juli 2026**.

### Officiële SAP-documentatie (SAP Help Portal)

1. [What is a Network? — Project System (PS), SAP ERP 6.0 EHP8](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/29d4b65334e6b54ce10000000a174cb4.html)
2. [Network Scheduling](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/0673b65334e6b54ce10000000a174cb4.html)
3. [How Is a Network Scheduled?](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/0973b65334e6b54ce10000000a174cb4.html)
4. [Scheduling Types](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/0c73b65334e6b54ce10000000a174cb4.html)
5. [Factors Influencing Scheduling](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/0f73b65334e6b54ce10000000a174cb4.html)
6. [Time Constraints](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/1573b65334e6b54ce10000000a174cb4.html)
7. [Dates From Other Objects](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/1b73b65334e6b54ce10000000a174cb4.html)
8. [Floats](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/1e73b65334e6b54ce10000000a174cb4.html)
9. [Reduction](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/2173b65334e6b54ce10000000a174cb4.html)
10. [Scheduling of Finally/Partially Confirmed Activities](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/2473b65334e6b54ce10000000a174cb4.html)
11. [Determining Capacity Requirements During Scheduling](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/2773b65334e6b54ce10000000a174cb4.html)
12. [Scheduling the Overall Network](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/0373b65334e6b54ce10000000a174cb4.html)
13. [Scheduling the Work Breakdown Structure](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/0073b65334e6b54ce10000000a174cb4.html)
14. [Settings for Scheduling Parameters](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/eb72b65334e6b54ce10000000a174cb4.html)
15. [Scheduling Results](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/3073b65334e6b54ce10000000a174cb4.html)
16. [Types of Dates](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/e572b65334e6b54ce10000000a174cb4.html)
17. [Types of Relationships (Structures)](https://help.sap.com/docs/SAP_ERP/01032ef9a74b4326998a66f9c408d6d2/d573bb53707db44ce10000000a174cb4.html)
18. [Floats / Progress Analysis](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/73b7b6531de6b64ce10000000a174cb4.html)
19. [Versions (project versions, simulation versions)](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/d46cb6531de6b64ce10000000a174cb4.html)
20. [Capacity Leveling in the Project System](https://help.sap.com/docs/SAP_ERP/5ecdd9085d344e6693e65fc60c3b5b0f/1ec4b65334e6b54ce10000000a174cb4.html)
21. [Handling Large Projects](https://help.sap.com/docs/SAP_ERP_SPV/01032ef9a74b4326998a66f9c408d6d2/dad431a083a242a88ba18130e25e36b5.html)
22. [Project System: Handling Large Projects – Master Data (OPS_PS_HLP_1)](https://help.sap.com/docs/SAP_ERP/930f133a36a843318dc3347afe00a9d6/1e1aed30ff544c478d9589b12d69d7fb.html)
23. [Project System, Handling Large Projects 2 (OPS_PS_HLP_2)](https://help.sap.com/docs/SAP_ERP/930f133a36a843318dc3347afe00a9d6/7a5cd2f29e3f46c984c3d366445be40e.html)
24. [Interfaces to the Project System](https://help.sap.com/docs/SAP_ERP/466c183205dd4c4ea1d595f66a84d274/7d74bb53707db44ce10000000a174cb4.html)
25. [Open Project System (OpenPS4MSP)](https://help.sap.com/docs/SAP_ERP/466c183205dd4c4ea1d595f66a84d274/050ebb536b13b44ce10000000a174cb4.html)
26. [PS-EPS Interface to External Project Software](https://help.sap.com/docs/SAP_ERP/466c183205dd4c4ea1d595f66a84d274/6175bb53707db44ce10000000a174cb4.html)
27. [Scheduling — SAP Portfolio and Project Management (S/4HANA 2025)](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/db719753e69f4e8eb9902aaea0fd8471/493246dde87f62b6e10000000a421138.html)
28. [Maintaining Relationships Between Tasks (PPM)](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/db719753e69f4e8eb9902aaea0fd8471/497eede2d6c33d8be10000000a421138.html)
29. [Automatic Creation of the Controlling Structure (PPM → PS)](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/db719753e69f4e8eb9902aaea0fd8471/4ad393ec036a34c7e10000000a421138.html)
30. [Alternative Gantt Chart based on SAPUI5 Technology (PPM 6.1 SP13)](https://help.sap.com/docs/SAP_PORTFOLIO_AND_PROJECT_MANAGEMENT/47f3c81b7cc040f1aa74c2353651b6ac/1dee363b6e874dbdaaead050a56be96a.html)
31. [Optimization of Task and Milestone Relationships (PPM 6.1 SP03)](https://help.sap.com/docs/SAP_PORTFOLIO_AND_PROJECT_MANAGEMENT/47f3c81b7cc040f1aa74c2353651b6ac/14bd8a551edb7c43e10000000a4450e5.html)
32. [Export or Import Data from or to Microsoft Project (PPM)](https://help.sap.com/docs/SAP_PORTFOLIO_AND_PROJECT_MANAGEMENT/777fb7067f834a4dba3307f1186000b4/a6f0b42deae446f8be8657649e8b3ffa.html)
33. [SAP Enterprise Project Connection — productoverzicht (3.0 FP01, gepubliceerd 15-06-2017)](https://help.sap.com/docs/SAP_ENTERPRISE_PROJECT_CONNECTION/e8fccb188d444cbfa10ed69c1466da78/09a1db4b3e524a62a845509d006374a5.html)
34. [EPC — Integration of SAP ERP … and Third-Party EPM Systems](https://help.sap.com/docs/SAP_ENTERPRISE_PROJECT_CONNECTION/e8fccb188d444cbfa10ed69c1466da78/e4d9357c688749839c8ee39178c2d81f.html)
35. [EPC — Project Transfers](https://help.sap.com/docs/SAP_ENTERPRISE_PROJECT_CONNECTION/e8fccb188d444cbfa10ed69c1466da78/92110a99eed44bdb98d0a58f30ea5f5f.html)
36. [EPC — Oracle Primavera P6 EPPM 16.1 and 16.2 Support](https://help.sap.com/docs/SAP_ENTERPRISE_PROJECT_CONNECTION/4462b8e530aa4159bf9898f254c359aa/8c211fc1e7444e488e27c52ad41e94d2.html)
37. [Operations for Enterprise Project (API_ENTERPRISE_PROJECT_SRV)](https://help.sap.com/docs/SAP_S4HANA_CLOUD/988903b47d7040f6ac4ec02e44bb58e4/e3a1e6b27add49ee84c047a10b9ba06e.html)
38. [Project Element Relationships (SAP Project and Resource Management)](https://help.sap.com/docs/PPRM_OD/f0274264fc5242e291cf4c2c12164e89/f4d04f771f6d45f0a3b9ad266e37dc8b.html)
39. [Manage Project Plans (SAP Project and Resource Management)](https://help.sap.com/docs/PPRM_OD/c9f1dba6b92c435cb31a576e1df0719f/31a05172244b41c88a23d4b95d5a58fc.html)
40. [Navigation from SAP GUI Transactions to SAP Fiori Applications for Project Planning and Scheduling (S/4HANA 2022 FPS2)](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/b47ad8390d2f4d5d9bfa9268d0c03bde.html)
41. [Custom Coloring for Project Schedule (S/4HANA 2021 SPS01)](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/1d9101cdfcf64f2a968a5d2d33a05c44.html)
42. [Compatibility Scope (S/4HANA 2025)](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/c9b5e9de6e674fb99fff88d72c352291/9f17487cb7654c08baec66cfaa8867f7.html)
43. [Simplification List for SAP S/4HANA 2021 (PDF, 1.100+ p.) — §29.6 Selected Project System Interfaces (p. 637–638), §29.12 Handling Large Projects Business Functions (p. 645–646), §29.20 Project Planning Board, Gantt-Chart, Hierarchy and Network Graphics (p. 654–655), §29.21 Current simulation functions (p. 655–656)](https://help.sap.com/doc/f2591a6901344c97a5e2029cc8f3703e/2021/en-US/SIMPL_OP2021.pdf)
44. [Industry Foundation Classes — SAP 3D Visual Enterprise Generator (enige IFC-ondersteuning in het SAP-portfolio)](https://help.sap.com/docs/SAP_3D_VISUAL_ENTERPRISE_GENERATOR/681b886ba1bd1014b4ccd0d8ce91d6b5/950a8d6133bb45b5a122fcdbc75bc76a.html)
45. [Heuristics for Project Manufacturing (PP/DS) — kritiek-pad-heuristiek SAP_PMAN_001](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/0b2bc95360267614e10000000a174cb4.html)

### Prijsbronnen (primair, met datum)

46. [UK Digital Marketplace / G-Cloud 14 — "NTT DATA Business Solutions – SAP S/4HANA Cloud Enterprise Portfolio & Project Management (EPPM)", listing (£22–£147 per user per month)](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/184802193487061)
47. [Prijsdocument PDF — SAP S/4HANA Cloud EPPM Private Edition, NTT DATA Business Solutions, versie 1.0, 1 mei 2024](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/702210/184802193487061-pricing-document-2024-05-01-1904.pdf)
48. [Prijsdocument PDF — RISE With SAP S/4HANA Cloud Private Edition, NTT DATA Business Solutions, 2 mei 2024](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/702210/735410599987909-pricing-document-2024-05-02-1724.pdf)
49. [Prijsdocument PDF — GROW With SAP S/4HANA Cloud Public Edition, NTT DATA Business Solutions, 1 mei 2024](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/702210/143142176115221-pricing-document-2024-05-01-1834.pdf)
50. [Vendr — "How much does SAP cost in 2026?" (SAP buyer guide, transactiedata)](https://www.vendr.com/buyer-guides/sap)

### Reviews, vergelijkingen en marktdata

51. [PeerSpot — SAP Portfolio and Project Management Reviews (rating, mindshare, pros & cons, sectorverdeling)](https://www.peerspot.com/products/sap-portfolio-and-project-management-reviews)
52. [PeerSpot — SAP PPM Pricing (gebruikerscitaten over prijs)](https://www.peerspot.com/products/sap-portfolio-and-project-management-pricing)
53. [PeerSpot — What needs improvement with SAP Portfolio and Project Management?](https://www.peerspot.com/questions/what-needs-improvement-with-sap-portfolio-and-project-management)
54. [PeerSpot — What is your experience regarding pricing and costs for SAP PPM?](https://www.peerspot.com/questions/what-is-your-experience-regarding-pricing-and-costs-for-sap-portfolio-and-project-management)
55. [PeerSpot — SAP PPM vs Oracle Primavera Portfolio Management (Executive Summary bijgewerkt 03-06-2026)](https://www.peerspot.com/products/comparisons/sap-portfolio-and-project-management_vs_oracle-primavera-portfolio-management)
56. [PeerSpot — Microsoft Project Server vs SAP PPM (Executive Summary bijgewerkt 03-06-2026)](https://www.peerspot.com/products/comparisons/microsoft-project-server_vs_sap-portfolio-and-project-management)
57. [SoftwareReviews (Info-Tech) — SAP Enterprise Portfolio and Project Management (composite 7,7/10, CX 8,1/10, 19 reviews, Emotional Footprint +96)](https://www.softwarereviews.com/products/sap-portfolio-and-project-management)
58. [Wikipedia — SAP SE (omzet, medewerkers, corporate structuur)](https://en.wikipedia.org/wiki/SAP_SE)

### Niet-toegankelijke bronnen (transparantie)

- **SAP Note 206264** (richtlijnen projectomvang), **SAP Note 2269324** (compatibility scope + vervaldatum), **SAP Note 2292815** (EPC-mappings), **SAP Note 1326709** (ondersteunde MS Project-versies) — alle vier alleen met SAP-login; inhoud dus **niet geverifieerd**.
- **sap.com**, **community.sap.com/blogs.sap.com**, **answers.sap.com**, **store.sap.com** — HTTP 403 (bot-blokkade).
- **G2**, **TrustRadius**, **Capterra**, **Gartner Peer Insights**, **SoftwareAdvice**, **SelectHub**, **GetApp** — HTTP 403.
- **Reddit** (r/projectmanagement, r/construction, r/SAP) — geblokkeerd, ook via alle geprobeerde open spiegels (proof-of-work-uitdaging gekoppeld aan een roterend uitgaand IP-adres). Reddit-sentiment ontbreekt daarom in dit profiel; de gebruikersklachten leunen volledig op PeerSpot en SoftwareReviews.
