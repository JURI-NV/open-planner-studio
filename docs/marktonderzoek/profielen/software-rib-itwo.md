# RIB iTWO (iTWO 4.0 / RIB 4.0 / iTWO tx)

*Softwareprofiel — marktonderzoek planningssoftware*
*Opgesteld: 25 juli 2026. Alle webbronnen geraadpleegd op 25 juli 2026 tenzij anders vermeld.*
*Onderzoeksbeperking: de WebSearch-quota van deze sessie was uitgeput; al het onderzoek is uitgevoerd via directe WebFetch op leverancierssites, reviewplatforms, vakfora, partner-/resellersites, PDF-documentatie en DuckDuckGo-resultaatpagina's. G2, TrustRadius, Capterra.com (US) en Reddit blokkeerden directe fetches (HTTP 403 / bot-blokkade); die gegevens komen daarom uit spiegelbronnen (Capterra.de, GetApp, SoftwareAdvice.de, SelectHub, OMR) en zijn als zodanig gemarkeerd.*

---

## 0. Samenvatting in één alinea

RIB iTWO is geen planningspakket maar een **bouw-ERP met 5D-BIM-kern**, van het Duitse RIB Software SE (Stuttgart, 1961; sinds juli 2020 dochter van Schneider Electric). Planning (`Terminplanung` / `Vorgangsmodell` / module **TS**) is één module in een suite waarin calculatie, AVA/aanbesteding, inkoop, facturatie, controlling en BI de hoofdrol spelen. Het product bestaat in twee generaties naast elkaar: het **klassieke Windows-desktopproduct RIB iTWO** (DACH-markt: AVA, Kalkulation, BIM 5D, iTWO V2025) en het **cloud-/enterpriseplatform iTWO 4.0, sinds v6.4 hernoemd naar RIB 4.0** (voorheen ook als MTWO op Azure). Prijzen zijn vrijwel volledig "op aanvraag"; het enige harde, publiek gepubliceerde bedrag dat ik vond is de Deutsche-Bahn-variant **iTWO-DB à € 328/maand (€ 3.936/jaar) per named user**. Sterk in DACH (de facto verplicht in de Deutsche-Bahn-keten) en in Azië/Midden-Oosten via de cloudvariant; zwak op moderne UI, performance, openheid en prijs-kwaliteitverhouding (value-for-money-score **2,9/5** op Capterra/SoftwareAdvice). Voor een open, IFC-gebaseerde planner is iTWO vooral relevant als **voorbeeld van gesloten 5D-integratie**, niet als interoperabiliteitspartner: er is geen aanwijzing van IFC 4.3-ondersteuning en geen aanwijzing van `IfcWorkSchedule`/`IfcTask`-round-trip.

---

## 1. Wat het is

### Leverancier en historie

| Feit | Detail | Bron |
|---|---|---|
| Bedrijf | RIB Software SE, Stuttgart (DE) | Wikipedia |
| Opgericht | 1961 (voortgekomen uit rekeninstituut voor het bouwwezen) | Wikipedia |
| Beursgang | **Februari 2011**, Frankfurt Prime Standard (uitgiftekoers € 9,25 — **niet herverifieerd**, zie V10) | de.wikipedia |
| Rechtsvorm | Omgezet naar SE in april 2017 | Wikipedia |
| Overname | Juli 2020 door **Schneider Electric** voor **€ 1,4 mrd** (€ 29/aandeel, 41% premie op slotkoers) | Schneider-aankondiging; de Duitse Wikipedia noemt **€ 1,5 mrd** — zie Verificatie V3 |
| Vervolg | Schneider-dochter heeft squeeze-out van resterende minderheidsaandeelhouders aangevraagd | MarketScreener |
| Medewerkers | ± 2.600 (2024) | Wikipedia |
| Directie | **René Wolf** (CEO & Managing Director) en **Tobias Hamacher** (CFO & Managing Director) — beiden nog in functie in 2025/2026 | de.wikipedia; RIB LinkedIn (2025) |
| Vestigingen | 20+ wereldwijd (EMEA, APAC, Noord-Amerika) | Wikipedia |
| Vlaggenschip | "RIB iTWO", geïntroduceerd **2009** | Wikipedia |
| Zelf geclaimd bereik | 23.000+ organisaties in 100+ landen | rib-software.com |
| Zelf geclaimd DACH-bereik | "über 150.000 Nutzer" | rib-software.com/de/rib-itwo |

### De productnamen — belangrijk, want verwarrend

RIB heeft de portfolio vanaf **RIB 4.0 versie 6.4 (najaar 2023)** stapsgewijs hernoemd; de rebranding gebeurt per productversie (baulinks.de, 8 maart 2024):

| Oude naam | Nieuwe naam | Wat het is |
|---|---|---|
| **RIB iTWO** | *behoudt* de naam iTWO | Windows-desktop: AVA, calculatie, bouwprojectmanagement, BIM 5D. DACH-kernproduct. Actuele versie: **iTWO V2025 / V2025 Enterprise** |
| **iTWO 4.0** | **RIB 4.0** | Cloud-/enterpriseplatform (webbrowser + desktopclient), 5D-BIM + ERP |
| **MTWO** | opgegaan in RIB 4.0 | Azure-gehoste variant, samen met Microsoft in de markt gezet ("world's #1 vertical cloud") |
| **iTWO tx** | (uitgefaseerd/opgegaan) | Web-based aanbestedings-/tenderplatform. Historisch: Deutsche Telekom-contract juni 2013 > US$ 700.000; GP Günter Papenburg fase-II |
| **iTWO FM** | RIB FM | Facility management |
| **iTWO site** | RIB Site | Bouwplaats/uitvoering |
| **RIB Smart Production** | RIB One Prefab | Prefab-productiebesturing |
| — | **iTWO-DB** | Speciale, afgeslankte Deutsche-Bahn-variant voor externe planners/aannemers |

> **Waarschuwing bij marktonderzoek**: reviews en prijsopgaven over "iTWO" gaan afwisselend over het desktopproduct, het cloudplatform en over volledig andere RIB-producten (bv. "MC2 iTWO", een Amerikaans calculatieproduct uit de MC2-overname). Verwar ze niet.

### Doelgroep, typische gebruikers, sectoren

- **RIB iTWO (desktop)**: architecten- en ingenieursbureaus, aannemers, **publieke opdrachtgevers** (Bund/Länder/gemeenten), infrastructuurbeheerders (spoor, weg, luchthavens), vastgoedbeheer en industriële bouwafdelingen (rib-software.com/de/rib-itwo). Twee hoofdedities: *AVA/Kosten* (voor planners/opdrachtgevers) en *Kalkulation/Baumanagement* (voor uitvoerende aannemers).
- **RIB 4.0 (cloud/enterprise)**: expliciet gepositioneerd voor **bouwbedrijven met meer dan 100 medewerkers** (rib-software.com/en/rib-4-0/pricing). Aannemers, projectontwikkelaars, infrastructuur- en installatiebeheerders, eigenaren. RIB claimt "195+ satisfied clients" in 40 landen en 10 Azure-regio's.
- **Sectoren**: woning- en utiliteitsbouw, infrastructuur (spoor/weg), civiel/Tiefbau, prefab-industrie, olie & gas, energie-/netbouw (via partner Julius Berger Digital Consulting: "JBI Energy 4.0"-uitbreidingen).
- **Regio's**: kernmarkt **DACH** (Duitsland, Oostenrijk, Zwitserland — met ÖNORM- en CRB/NPK-varianten in het pakket), daarnaast APAC (Singapore, Hongkong, Maleisië, India — via Schneider Electric-kanalen en MTWO), Midden-Oosten/Afrika (Julius Berger Nigeria), en beperkt Benelux (Intwo.cloud in NL, digitalconstructionworld.be in BE — beide via het Microsoft-partnerkanaal, niet via een eigen sterke RIB-organisatie).

---

## 2. Functionaliteit en techniek

### 2.1 Planning: waar zit het en wat kan het

**In RIB 4.0** is planning de module **TS (Time Scheduling)**, die pas in het **Premium**-pakket zit (niet in Standard). Aanvullend zitten **RM (Resource Management)** én **TM (Time Management / urenregistratie)** pas in **Ultimate** — *gecorrigeerd op 25-07-2026 aan de hand van de actuele pakketindeling op rib-software.com/en/rib-4-0; een eerdere lezing plaatste RM in Premium. Zie Verificatie V4.*

Gedocumenteerde functionaliteit van de planningsmodule (rib-software.com/de/terminplanung-ressourcenmanagement):

- **Gantt-diagram**, ook **projectoverstijgend** (portfolio-gantt)
- **Zeit-Wege-Diagramm / Line of Balance** — sterk punt voor lijninfrastructuur (spoor, weg, pijpleiding)
- Toewijzing van middelen (`Ressourceneinsatz`) en registratie van prestatiegegevens
- **Kosten- en budgetsimulatie** direct gekoppeld aan het schema
- **`Planversionen`** — versiebeheer van het schema; dit is RIB's baseline-equivalent
- **5D-simulatie** met filteropties (4D-bouwablaufsimulatie + kosten)
- Registratie en visualisatie van **voltooiingsgraden** (`Fertigstellungsgrade`)
- Terminplanung **én** Termincontrolling met geïntegreerde voortgangscontrole (TS-module, per partner Julius Berger Digital Consulting)

**In RIB iTWO (desktop)** heet dit het **`Vorgangsmodell`** (procesmodel): het planningsobject dat activiteiten koppelt aan LV-posities (bill of quantities), calculatieregels en modelelementen. Kenmerkend is dat het taken-/schedulingmodel **LV- of calculatiegebaseerd** is: activiteiten ontstaan uit de calculatiestructuur, niet primair uit een vrije WBS. Dat is de kern van RIB's 5D-propositie: hoeveelheid → kostenregel → activiteit → modelelement in één keten.

**Wat ik NIET publiek gedocumenteerd vond** (en dus als lacune of als bewust ondergeprofileerd moet worden gezien):

| Onderwerp | Bevinding |
|---|---|
| CPM-engine-details (forward/backward pass, float-typen, kritieke pad-definitie, out-of-sequence-logica, retained/progress override) | **Nergens publiek gespecificeerd.** RIB's eigen planningspagina noemt géén kritiek pad, géén float, géén kalendersemantiek |
| Relatietypen (FS/SS/FF/SF), lead/lag, kalendergebonden lags | Niet publiek gespecificeerd |
| Kalendermodel (project-/activiteit-/resourcekalenders, shifts, uitzonderingen) | Niet publiek gespecificeerd |
| Beperkingen/constraints (SNET, FNLT, deadlines) | Niet publiek gespecificeerd |
| **Monte-Carlo / probabilistische risicoanalyse** | **Geen aanwijzing gevonden.** Het enige risicoraakvlak is "risk-based evaluation of construction projects" in de **calculatiemodule (CE)** — dat is kostenrisico in de calculatie, geen schedule risk analysis. Voor SRA is aanvullende software (Safran Risk, Primavera Risk, @RISK, Acumen) nodig — **inschatting op basis van afwezigheid van bewijs, niet van een expliciete leveranciersuitspraak** |
| Earned Value Management (EVM) volgens ANSI/EIA-748 | Niet expliciet; wel `Fertigstellungsgrade` + kostensimulatie, wat een EVM-achtige basis is |
| Maximale aantallen activiteiten | Niet gepubliceerd |

> **Kernconclusie planning**: iTWO's planningsmodule is een *bouwkundig* planningsinstrument (Gantt + Weg-Tijd + hoeveelheden + kosten + 4D), géén *scheduling-engine* in de klasse van Primavera P6, Asta Powerproject of Safran. Dit wordt bevestigd door een marktsignaal: op **Planning Planet**, het grootste internationale forum voor professionele planners, is iTWO praktisch afwezig. *Genuanceerd op 25-07-2026 (V6): er bestaat wél één bedrijfstagpagina `planningplanet.com/category/company/rib-software`, maar de vindbare inhoud daarvan is een lid-/CV-vermelding ("Sales support, customer demonstrations, training…"), geen vakinhoudelijke discussie. De juiste formulering is dus "geen inhoudelijke plannersdiscussies gevonden", niet "geen enkele vermelding".* Planners in de zware infrastructuur gebruiken P6/Asta; iTWO is het systeem van de calculator, de werkvoorbereider en de controller.

### 2.2 Resource- en kostenmodel

- Resourcegebaseerde, **flexibele kostenstructuren** in module **CE** (Cost Estimation) — "supports all phases of cost estimating from detailed budgeting to risk-based evaluation" en vormt de basis voor inkoop, planning en uitvoering (rib-software.com/en/rib-4-0).
- Middelen worden toegewezen in de planningsmodule met terugkoppeling van prestatiedata; **RM** doet de capaciteitsplanning, **TM** de urenregistratie.
- Kostenmodel is het sterkste deel van het product: `Kalkulation`, `AVA` (Ausschreibung, Vergabe, Abrechnung), **IM** (Invoice Management), **SCM** (Supply Chain Management), **CO** (real-time controlling), **BI+** (dashboards).
- **5D/6D**: het BIM-5D/6D-add-on koppelt modelelementen aan kostenmodellen en (6D) duurzaamheidsdata over de levenscyclus.

### 2.3 Modulepakketten RIB 4.0

Bron: rib-software.com/en/rib-4-0 (25-07-2026), aangevuld met partner Julius Berger Digital Consulting.

| Pakket | Modules |
|---|---|
| **Standard** | Base, Work (projectbeheer/stamdata), **CE** (calculatie), **CC** (aanbesteding/contractmanagement), **SPM** (bouwplaats-projectmanagement), **IM** (facturen) |
| **Premium** | Standard + **SCM** (inkoop), **CO** (controlling), **TS** (terminplanung) |
| **Ultimate** | Premium + **RM** (resourceplanning), **TM** (tijdregistratie), **BI+** (business intelligence) |
| **Add-ons** | **BIM 5D** (modelgebaseerd werken over alle modules via webinterface), **One Prefab** (prefab-productie) |

> **Correctie 25-07-2026 (V4)**: bij hercontrole van rib-software.com/en/rib-4-0 bleek **IM in Standard** te zitten (niet Premium) en **RM in Ultimate** (niet Premium). RIB's partner Julius Berger Digital Consulting bevestigt wel de twaalf modulenamen, maar publiceert de pakketindeling alleen in een niet-inline PDF ("Softwareversionen im Vergleich") — de indeling is dus alleen op RIB's eigen pagina te controleren en kan per release wijzigen. **De strekking verandert niet: TS zit niet in het instappakket, en volwaardige resourceplanning zit zelfs pas in het duurste pakket** — dat maakt de commerciële drempel voor planning eerder hoger dan lager.

> Let op de commerciële consequentie: **planning zit niet in het instappakket**. Wie alleen wil plannen, koopt het verkeerde product.

### 2.4 Platform en techniek

**RIB iTWO desktop (V2025 / V2025 Enterprise)** — uit de officiële systeemeisen-PDF (RIB, versie 01/2025):

- **Uitsluitend Windows.** Werkplek: Windows 10/11 Pro/Enterprise. Server: Windows Server 2016/2019/2022 Standard of Datacenter.
- Vereist **MS .NET Framework 4.8+**, Windows Installer 4.5, MS Visual C++ 2015 Redistributable, PowerShell 4.0, Edge WebView2.
- Database: **Microsoft SQL Server 2016 SP1 of hoger** (Express/Standard/Enterprise). Express-limiet: 10 GB DB, 1 CPU, 1 GB RAM.
- **Vijf installatievarianten**: (1) losse/netwerkwerkplek, (2) client/server met centrale opslag, (3) terminal server niet-modelgebaseerd, (4) Citrix XenApp modelgebaseerd, (5) Citrix XenDesktop modelgebaseerd.
- **Concurrency-referentiewaarden**: variant 2 gaat uit van **± 50 gelijktijdige netwerkgebruikers**; meer gebruikers vereist splitsing van application server en SQL server. Variant 3 (terminal, niet-modelgebaseerd): **± 15 gelijktijdige gebruikers**. Variant 4 (Citrix, BIM 5D): **± 10 gelijktijdige gebruikers**, 1 CPU-core per gebruiker, **64 GB RAM minimum, 128 GB aanbevolen**, Nvidia Grid-GPU bij virtualisatie.
- **Werkplek voor grote 5D-modellen: 64 GB RAM.**
- Netwerk: TCP-poorten 42150–42153 (iTWO), 4410 + 1433 (app-/SQL-server), **UDP 5093 voor de RIB Licence Server**.
- **Licentiebeveiliging**: bij single-user-installatie is een vrije **USB-poort voor een USB-dongle** nodig. Het RIB-servicecontract bevat expliciet een "Lizenzversicherung: kostenloser Ersatz bei Verlust oder Diebstahl" — bevestiging dat fysieke donglelicenties nog steeds courant zijn.
- **Niet ondersteund**: ARM- en Itanium-CPU's, Windows Server Core, WINS-naamresolutie, umlauts/speciale tekens in computer- en loginnamen.

**RIB 4.0 / iTWO 4.0 (cloud)**:

- Webclient op **HTML5, JavaScript, AngularJS**, browseronafhankelijk, met 3D-graphics en "Big Data"-verwerking (officiële iTWO 4.0-documentatie).
- Deployment: **on-premises**, **RIB Hosting** (Duitse, AVG-conforme datacenters) of **Microsoft Azure** ("world's first Azure-based cloud solution tailored for the construction and industrial sectors"), 24/7 monitoring, automatische updates.
- **REST API met JWT-tokenbeveiliging** ("iTWO 4.0 Web API": RESTful interface, de meeste services beveiligd met JWT, met .NET-voorbeeldcode).
- Workflow Designer voor grafische procesautomatisering.

### 2.5 Schaalbaarheid — realistisch aantal activiteiten

RIB publiceert **geen** activiteitenlimieten. Op basis van de architectuur (MS SQL, ± 50 gelijktijdige gebruikers per serverpaar, Citrix nodig voor modelgebaseerd werken bij ~10 gebruikers) en de terugkerende performanceklachten in reviews:

> **SCHATTING (eigen inschatting, niet door leverancier bevestigd)**: een `Vorgangsmodell` blijft comfortabel werkbaar tot in de orde van **1.000–5.000 activiteiten**; **5.000–15.000** is haalbaar op zware hardware met getunede omgeving; daarboven (de 30.000–100.000+ activiteiten die in P6 op megaprojecten normaal zijn) is iTWO **geen realistische keuze**. Dat een gespecialiseerd adviesbureau (KOSMICON) een aparte dienstverleningslijn "RIB iTWO Performance" onderhoudt, en dat reviewers structureel over traagheid bij grote projecten klagen, ondersteunt deze inschatting.

---

## 3. Prijzen

### 3.1 Het algemene beeld

RIB publiceert **geen lijstprijzen**. Zowel de Duitse prijspagina (`rib-software.com/de/rib-itwo/preise`) als de Engelse RIB 4.0-prijspagina bestaan uitsluitend uit een offerteformulier: *"Ein individuelles Angebot sichert eine maßgeschneiderte Lösung für jedes Projekt"* resp. *"GET PRICING"*. Op de RIB 4.0-prijspagina staat wél de enige harde kwalificatie: **RIB 4.0 is bedoeld voor bouwbedrijven met meer dan 100 medewerkers** — een de facto minimumafname-drempel.

### 3.2 Wél gepubliceerde bedragen (hard, met bron)

| Bedrag | Wat | Bron | Datum |
|---|---|---|---|
| **€ 328,00 / maand** (= **€ 3.936 / jaar**) per **named user** | **iTWO-DB**, huurlicentie, standaardtarief | rib-software.com/de/itwo-db | geraadpleegd 25-07-2026 |
| **€ 295,20 / maand** (= **€ 3.542,40 / jaar**) per named user | iTWO-DB, **10% korting** voor bestaande RIB-klanten met service-/subscriptioncontract | rib-software.com/de/itwo-db | geraadpleegd 25-07-2026 |
| **€ 4.500** regulier / **€ 3.750** actieprijs | "RIB iTWO Planen — Upgrade Paket II" (dienstverleningspakket, zomeractie) | shop-rib.com (PDF "Sommer Paket 2") | actie **verlopen** t/m 03-10-2025 — **niet herverifieerbaar**, zie V9 |

> **Let op (V9)**: het shop-rib-bedrag is een **verlopen actieprijs voor een dienstverleningspakket**, geen softwarelijstprijs, en de bron-PDF is een afbeelding zonder tekstlaag — bij hercontrole op 25-07-2026 was het bedrag niet opnieuw uit de bron te lezen en toont shop-rib.com/dienstleistungen alleen nog "Firmentrainings" en "Software Installation" zonder prijzen. **Gebruik dit bedrag niet als actueel prijsanker.**

Bij iTWO-DB is de licentie **uitsluitend als huurlicentie** verkrijgbaar en vereist naast de licentie een **BKU-account** (Betriebskommunikation unternehmensweit) en **IT-Fernzugang** bij Deutsche Bahn. Inbegrepen: licentie, online trainingsaanbod (webinars), support en toegang tot het RIB Support Portal.

### 3.3 Implementatie-, training- en consultancykosten (hard, uit reseller-prijslijst)

Bron: Ingenieurbüro Knieper / ava4amt.de, prijslijst 2026 — een gespecialiseerde iTWO-dienstverlener voor overheidsklanten. Alle bedragen **netto** tenzij anders vermeld.

| Post | Tarief |
|---|---|
| Gebruikersondersteuning | **€ 23,33 per begonnen 10 minuten** (≈ **€ 140/uur**), + 5% jaarlijkse indexatie bij meerjarencontracten |
| In-house training, halve dag (max. 10 deelnemers) | **€ 560** |
| In-house training, hele dag (max. 10 deelnemers) | **€ 1.120** |
| Reiskosten | **€ 0,35/km** (heen én terug apart berekend) |
| Overnachting | **€ 130/nacht** |
| Rekenvoorbeeld: 5-daagse trainingsweek Stuttgart | **€ 6.919,73 bruto** |
| Rekenvoorbeeld: 1 dag webtraining | **€ 1.332,80 bruto** |

Aanvullend signaal uit het vakforum CAD.de: gebruikers noemen de **Print Designer-licentie** "ziemlich teuer" met onduidelijke ROI, en over RIB's eigen aanpassingsdiensten: *"Lizenz ist teuer, aber die Stundensätze der RIB sind auch nicht ohne."*

Partner-consultancy (5D-Institut, KOSMICON, Promosie, xdhub, Julius Berger Digital Consulting) publiceert geen tarieven — allemaal "kosteloos eerste gesprek".

### 3.4 Gerapporteerde bedragen zonder leveranciersbevestiging — expliciet als indicatie behandelen

| Bron | Bedrag | Waarde van de bron |
|---|---|---|
| **SelectHub** (selecthub.com, iTWO-profiel) | **Startprijs US$ 17.500 per jaar**, per-user-licentiemodel, **geen gratis proefversie** | Analistenplatform, methodiek niet transparant. **Behandelen als indicatie**, niet als lijstprijs |
| **PricingNow** (pricingnow.com, "iTWO 4.0 pricing") | 1 gebruiker **$ 3.000–7.000/jaar**; 10 gebruikers **$ 25.000–60.000/jaar**; 100 gebruikers **$ 200.000–500.000/jaar**. Implementatie **$ 5.000–50.000**. Jaarlijkse verhoging 3–5%. 3-jaars TCO voor 50 gebruikers op "Pro": **$ 650.000–800.000** | **SCHATTING van een prijsaggregator, geen leveranciersopgave.** Consistent met de orde van grootte van SelectHub, maar niet verifieerbaar |
| **PricingNow** ("iTWO smart production" = RIB One Prefab) | vanaf **$ 50/gebruiker/maand**; 10 gebruikers ≈ **$ 400/maand**; 100 gebruikers ≈ **$ 3.500/maand**; 1.000+ gebruikers **$ 30.000–50.000/maand**. Implementatie **$ 5.000–10.000** (MKB) tot **$ 100.000+** (enterprise) | **SCHATTING**, ander product dan de planningssuite |
| **OMR Reviews** (omr.com) | "Basic € 9,00/maand", "Pro € 29,00/gebruiker/maand" | **Vrijwel zeker een placeholder-template van het platform, geen echte RIB-prijs.** De pagina zegt zelf: "Please contact RIB Software for price inquiries". **Niet gebruiken** |
| **ITQlick** ("RIB MC2 iTWO") | "$ 50 per user/month" | Betreft **MC2 iTWO**, een Amerikaans calculatieproduct uit de MC2-overname, **niet** de planningssuite. Niet vergelijkbaar |

### 3.5 Licentiemodellen

- **RIB iTWO desktop**: historisch **perpetual koop + jaarlijks servicecontract** ("Software-Service"). Het servicecontract wordt door RIB gepresenteerd als "Rundum-Sorglos-Paket": updates/upgrades, licentieverzekering bij verlies/diefstal van de dongle, 24-uurs onlineservice, e-learning, kortingen op training, hotline met "een team van 30 experts". **RIB publiceert geen onderhoudspercentage**; branchegebruikelijk is 18–22% van de licentiewaarde per jaar — **SCHATTING, niet door RIB bevestigd**.
- **RIB 4.0 / cloud**: abonnement, **per named user per maand**, modulair per pakket (Standard/Premium/Ultimate) plus add-ons. Instapdrempel: >100 medewerkers.
- **iTWO-DB**: uitsluitend **huur, named user**, € 328/maand.
- **Geen gratis proefversie, geen freemium, geen gratis basisversie** — bevestigd door zowel GetApp/Capterra als softwareabc24.

---

## 4. VOORDELEN

1. **Echte 5D-integratie, niet gebolt-on.** iTWO's onderscheidende eigenschap is dat het taken-/planningsmodel **LV- of calculatiegebaseerd** is: hoeveelheden uit het IFC/Revit-model lopen door naar de LV-positie, naar de calculatieregel, naar de activiteit en terug naar het modelelement. Concurrenten koppelen doorgaans losse systemen; iTWO heeft één datamodel. Reviewers noemen dit dan ook consequent als belangrijkste pluspunt: *"viele Arbeitsschritte in einer Software gebündelt"* (Capterra.de).
2. **Sterke calculatiefunctionaliteit.** Op alle reviewplatforms is de calculatie/AVA-kant de best gewaardeerde: *"reliable and professional solution with strong calculation functions"*, en de deelscores "Quotes/Estimates" (4,7/5) en "Billing & invoicing" (5,0/5) op GetApp liggen ver boven het gemiddelde van het product.
3. **Weg-Tijd-diagram (Line of Balance) standaard in de planningsmodule.** Voor lijninfrastructuur — spoor, weg, pijpleiding, tunnel — is dit precies het juiste planningsbeeld, en het is bij veel concurrenten een dure add-on of ontbreekt. Gecombineerd met projectoverstijgende Gantt en 5D-simulatie is dit een serieus infrastructuur-instrument.
4. **Diepe DACH-normconformiteit.** GAEB XML 3.3-certificering, ÖNORM-varianten (Oostenrijk), CRB/NPK-varianten (Zwitserland), BIMSWARM-certificering, en volledige AVA-keten (Ausschreibung–Vergabe–Abrechnung). Voor Duitstalige publieke aanbestedingen is dit geen luxe maar een toegangsvoorwaarde, en weinig internationale spelers doen dit even compleet.
5. **De-facto standaard in de Deutsche-Bahn-keten.** DB voerde iTWO in 2016 in na een Europese aanbesteding (2014), verving daarmee het legacy-ERP GRANID, en gebruikt het voor kosten- en termijnsturing over alle projectfasen (`iTWO-DB` / KoPI). **Externe planningsbureaus die voor DB werken, moeten betaalde iTWO-DB-licenties aanschaffen.** Voor iedereen in die keten is iTWO-kennis direct verzilverbaar.
6. **Volledige levenscyclusdekking binnen één leverancier.** Van calculatie via inkoop, bouwplaats, facturatie, controlling en BI tot facility management (RIB FM) en prefab-productie (RIB One Prefab). Wie bewust voor één leverancier kiest, hoeft geen twaalf koppelvlakken te onderhouden.
7. **Serieuze enterprise-referenties.** Deutsche Bahn (± 50.000 actieve projecten per dag volgens de RIB-case study), DB Bahnbau Gruppe (fase-II-contract, sept. 2020), DB Services (landelijke RIB 4.0-uitrol na oostelijke pilot, 2024), Hochtief, Max Bögl, Julius Berger, Tata, Nagpur Metro Rail, GP Günter Papenburg, stad Fürth. Dit is geen MKB-speelgoed.
8. **Reële deploymentkeuze.** On-premises, RIB Hosting in Duitse AVG-conforme datacenters, of Azure. Voor Duitse publieke opdrachtgevers en veiligheidsgevoelige infrastructuur is de on-prem/Duitse-hosting-optie een harde eis waar pure-SaaS-concurrenten (Procore, Autodesk) op afvallen.
9. **Open REST-API in RIB 4.0.** De iTWO 4.0 Web API is RESTful met JWT-authenticatie en gedocumenteerd; RIB CX heeft een eigen REST-API voor bidirectionele integratie. Koppelen met SAP ERP, Power BI en CAD is gedocumenteerde standaardpraktijk. Dit maakt maatwerkintegratie technisch haalbaar (al is het kostbaar).
10. **Volwassen partnerecosysteem in DACH.** 5D-Institut, KOSMICON, Promosie, xdhub, Julius Berger Digital Consulting, Ingenieurbüro Knieper — er is een echte markt van onafhankelijke implementatie-, training- en performancespecialisten. Dat verlaagt het risico dat je volledig van RIB's eigen (dure) uren afhankelijk bent.

---

## 5. NADELEN

1. **Slechtste deelscore is prijs-kwaliteitverhouding: 2,9 / 5.** Op Capterra.de en SoftwareAdvice.de (11 geverifieerde reviews, 3,8/5 totaal) is `Preis-Leistungs-Verhältnis` met **2,9/5** veruit de laagste subscore — lager dan gebruiksgemak (3,4), features (3,6) en support (3,7). Eén reviewer: de servicekwaliteit *"hat deutlich nachgelassen"* terwijl de kosten stegen. SelectHub geeft 60% tevredenheid (10 reviews) en rangschikt iTWO op plaats **#59** in construction management software.
2. **Verouderde interface.** Herhaald en expliciet in reviews: het ontwerp is *"reminiscent of very outdated Windows"* (Capterra/GetApp). Menu's zijn overladen en vereisen veel doorklikken; de leercurve is steil. Uit CAD.de: *"das muss man erstmal hier definieren, damit es da sichtbar ist"* — de configuratielogica is niet intuïtief te ontdekken.
3. **Structurele performanceproblemen bij grote projecten en veel gelijktijdige gebruikers.** Letterlijk uit een gebruikersreview: *"It is very slow. Connection to RIB 4.0 is not really mature."* SelectHub: *"users have reported that iTWO software can be slow, particularly the BIM function."* Het bestaan van een **commerciële dienstverleningslijn puur voor iTWO-performanceanalyse** (KOSMICON) is op zichzelf een indicatie dat dit chronisch is; de genoemde oorzaken zijn terminal-serverconfiguratie, database-/app-server-/storagebottlenecks, netwerklatency/VPN, security-tooling (EDR/XDR, SSL-inspectie) en zware zoek-/rapportagequery's.
4. **Concrete, gedocumenteerde regressiebugs bij updates.** Een gebruikersorganisatie (RENOWATE) documenteerde vier ernstige problemen ná de update naar **iTWO 4.0 versie 6.4.A**: (a) `Leistungsermittlungen` konden niet meer worden aangemaakt door een foreign-key-fout omdat de update de "VAT Business Posting Group" plots verplicht maakte; (b) contracten konden niet meer aan facturen worden gekoppeld — de hele aanbetalingsketen lag stil; (c) **de e-mailfunctie viel volledig uit** met authenticatiefouten en **zonder zichtbare foutmelding voor de gebruiker**; (d) alle rapporten die de LV-lijst gebruiken braken omdat de databasefunctie `BOQ_SORTED_F` van 3 naar 5 parameters ging en **elke rapportaanroep handmatig moest worden aangepast**. Dit laatste illustreert bovendien hoe diep klanten in ongedocumenteerde interne database-objecten zitten.
5. **Fragiele koppeling met MS Project — met datverlies.** Op CAD.de meldt een gebruiker dat bij het opnieuw importeren van MS-Project-wijzigingen in het `Vorgangsmodell` de **toegewezen LV-posities gewoon verdwijnen** (*"Leider kommt es vor, dass die zugeordneten Positionen einfach nicht mehr vorhanden sind"*), zonder dat zichtbaar is met welk bestand het procesmodel gekoppeld is of of de koppeling nog bestaat. Voor een 5D-product waarvan de hele waardepropositie de koppeling activiteit↔positie is, is dit een fundamenteel probleem.
6. **Twee productgeneraties naast elkaar, met een onrijpe brug ertussen.** Klanten zitten deels op iTWO-desktop, deels op RIB 4.0; reviewers noemen expliciet dat *"integration with newer RIB products remains problematic"* en dat de verbinding naar RIB 4.0 "not really mature" is. RIB stuurt tegelijk actief op migratie van iTWO naar RIB 4.0 (partners bieden migratiebegeleiding met "gratis support tot juli 2026"). Klanten dragen de kosten en het risico van een leveranciersgedreven platformwissel.
7. **Rebrandingchaos.** iTWO 4.0 → RIB 4.0, MTWO → opgegaan in RIB 4.0, iTWO FM → RIB FM, iTWO site → RIB Site, Smart Production → One Prefab, en dat "per productversie" vanaf najaar 2023. Documentatie, trainingsmateriaal, contracten en interne kennis raken hierdoor onvindbaar of verouderd; ook reviews en prijsinformatie in de markt zijn nauwelijks nog aan een product toe te wijzen.
8. **Rapportage- en printbeperkingen die dagelijks pijn doen.** Uit CAD.de: printlijsten zijn beperkt tot **5–10 kolommen**; bieder-annotaties komen niet mee in de geprinte prijsvergelijkingstabel; op het scherm zichtbare notities ontbreken in de tabelafdruk; **bij meer dan 10 bieders moet je documenten handmatig knippen en plakken**. SelectHub noemt "limited standard reporting options". De oplossing (Print Designer) is een aparte, dure licentie.
9. **Ontbrekende basisfunctionaliteit in het datamodel.** Geen centrale, gekoppelde adresdatabase: catalogusupdates overschrijven geen bestaande projectdata, dus adreswijzigingen van bedrijven synchroniseren niet door (CAD.de). Verder ontbreken volgens softwareabc24 loonverwerking, gereedschapsbeheer en bouwdagboek.
10. **Vendor lock-in op meerdere assen tegelijk.** (a) Technisch: Windows-only, .NET, verplicht MS SQL Server, USB-dongles, Citrix voor modelgebaseerd werken; (b) datamatig: het project is een SQL-database, niet een uitwisselbaar bestand — een volledige export naar een neutraal formaat bestaat niet; (c) commercieel: hoog instapniveau (>100 medewerkers voor RIB 4.0), verplichte servicecontracten, dure eigen consultancy-uren; (d) organisatorisch: bij DB-werk is iTWO-DB simpelweg voorgeschreven. Uitstappen is een meerjarig project.
11. **Geen probabilistische risicoanalyse in de planning.** Geen aanwijzing voor Monte-Carlo/schedule risk analysis; het risicoraakvlak zit in de calculatie, niet in het schema. Voor infrastructuurcontracten waar SRA contractueel wordt geëist, heb je een tweede tool nodig — **conclusie op basis van afwezigheid van bewijs**.
12. **Geen zelfbediening: geen trial, geen transparante prijs, geen instapmogelijkheid.** Geen gratis proefversie, geen freemium, geen gepubliceerde lijstprijs behalve de DB-variant. Elke evaluatie loopt via een salesproces. Dat is een reële drempel voor iedereen die het product eerst objectief wil beoordelen — en het is precies wat "value for money 2,9/5" mede verklaart.
13. **Vrijwel onzichtbaar in de professionele planningsgemeenschap.** Op Planning Planet — de referentiecommunity voor planners — leverde gericht zoeken **geen enkele inhoudelijke** iTWO-discussie op; het enige treffer-item is een bedrijfstagpagina die uit een lidprofiel voortkomt (**gecorrigeerd, V6**). Wie iTWO als planningstool inzet, opereert buiten de gangbare peer-review, kennisdeling en arbeidsmarkt van het vakgebied.

---

## 6. Interoperabiliteit

> **Dit is voor de opdrachtgever (open-source, IFC-gebaseerde planner) de kernsectie. Kort samengevat: iTWO importeert IFC om hoeveelheden te oogsten, maar exporteert géén open planningsdata. Er is geen aanwijzing dat het planningsmodel via IFC uitwisselbaar is.**

### 6.1 IFC

| Aspect | Bevinding | Bron |
|---|---|---|
| IFC-import | Ja. Modellen worden geladen via de **`BIM Qualifier`**: *"Um ein Modell in iTWO zu laden, öffnen Sie den BIM Qualifier mit einem Doppelklick"*; IFC maakt import mogelijk uit elk CAD-pakket dat IFC exporteert | Springer-vakliteratuur over iTWO |
| Native CAD-koppelingen | **Ruimer dan eerder vermeld (gecorrigeerd, V7).** Hochbau: Revit (eigen plugin met eigen release notes), Allplan, Vectorworks, **Graphisoft**, **Tekla**. Tiefbau: RIB Civil, **AKG Vestra**, **card1**. TGA: **Trimble Nova**, **DDS CAD** | rib-software.com/de/rib-itwo (herverifieerd 25-07-2026) |
| **CPIXML** | **Toegevoegd (V7).** RIB's eigen `Construction Process Integration XML` — een **propriëtair** XML-uitwisselformaat, sinds iTWO 2015 de directe Revit↔iTWO-interface, dat 3D-geometrie plus attributen draagt. Dat CPIXML óók volledige planning/`Vorgangs`-data zou dragen is **niet bevestigd** in de geraadpleegde bronnen. Het is dus wél een tweede modelkanaal naast IFC, maar **geen open standaard en geen planningsuitwisselformaat** | rib-software.com/de/rib-itwo; bim4b.de BIM-glossar (CPIXML) |
| **BCF** | **Toegevoegd (V7).** RIB noemt op de eigen iTWO-pagina expliciet ondersteuning van de **BCF**-standaard (issue-/coördinatiecommunicatie). Dit ontbrak in de eerdere versie van dit profiel. BCF raakt coördinatie, **niet** planning | rib-software.com/de/rib-itwo |
| **Ondersteunde IFC-versies** | RIB's eigen (gratis) IFC-viewer noemt: **IFC2x3 (2.3.0.0), IFC2x3 TC1 (2.3.0.1), IFC4 (4.0.0.0), IFC4 Add1 (4.0.1.0), IFC4 Add2 (4.0.2.0), IFC4 Add2 TC1 (4.0.2.1)** — met dat laatste als "latest official version" (**letterlijk herverifieerd 25-07-2026**). *Kanttekening (V5): dit is de versielijst van de **viewer**, niet aantoonbaar identiek aan de IFC-importer van iTWO zelf; de iTWO-productpagina noemt alleen "IFC (Open BIM)" zonder versienummer* | ifc.rib.de |
| **IFC 4.3** | **Geen enkele aanwijzing van ondersteuning gevonden.** Noch in RIB-materiaal, noch elders. Ter vergelijking: concurrent NEVARIS Build adverteert wél expliciet met een "IFC4.x-interface" | eigen zoekwerk; softwareabc24 (over NEVARIS) |
| **`IfcWorkSchedule` / `IfcTask` / `IfcWorkPlan`** | **Geen enkele aanwijzing van import of export.** iTWO's planningsdata (`Vorgangsmodell`, `Planversionen`, relaties, kalenders) blijft in de SQL-database | eigen zoekwerk |
| IFC-certificering buildingSMART | **Geen certificering voor RIB/iTWO gevonden** in de buildingSMART-programma-informatie | eigen zoekwerk |
| BIM-LV-Container (MMC) | Het Duitse MMC/BIM-LV-Container-formaat legt de brug tussen GAEB-LV-posities en IFC-elementen; dit is de DACH-route waarlangs iTWO's 5D-koppeling in principe uitwisselbaar zou zijn | wingaeb.de |

> **Praktische conclusie**: IFC is voor iTWO een **eenrichtingskanaal voor geometrie en hoeveelheden**, niet een uitwisselformaat voor planning. Een open IFC-planner kan realistisch géén planning uitwisselen met iTWO via IFC. Wie iTWO en een externe planner wil combineren, doet dat via MS Project XML of P6 — niet via IFC.

### 6.2 Planningsformaten

| Formaat | Ondersteuning | Bron / kanttekening |
|---|---|---|
| **MS Project (XML / MSPDI)** | **Ja.** Het `Vorgangsmodell` importeert planningsdata "uit een ander programma (bv. MS Project of Powerproject)" via XML: rechtsklik op het procesmodel → Import → selecteer het xml-bestand | Springer-vakliteratuur over iTWO. **Let op nadeel 5: bij re-import verdwijnen toegewezen LV-posities** |
| **Asta Powerproject** | Ja, expliciet genoemd als importbron naast MS Project | Springer-vakliteratuur |
| **Primavera P6** | **Ja voor RIB 4.0**: de TS-module *"synchronisiert mit Microsoft Project und Primavera P6"* | Julius Berger Digital Consulting (RIB-implementatiepartner) — **partnerbron, niet door RIB zelf bevestigd** |
| **XER (Primavera native)** | **Niet bevestigd.** Waarschijnlijk verloopt de P6-koppeling via P6 XML of via API, niet via XER — **SCHATTING** | — |
| **CSV** | Niet expliciet gedocumenteerd; gezien de rapportage-/tabelfunctionaliteit vrijwel zeker aanwezig als export — **SCHATTING** | — |
| **XML-import algemeen** | Ja (generieke XML-importroute in het procesmodel) | Springer |

### 6.3 Overige formaten en koppelingen

- **GAEB XML 3.3** — gecertificeerd. Volledige AVA-uitwisselingsketen (P81 t/m D11).
- **ÖNORM** (Oostenrijk) en **CRB / NPK** (Zwitserland) — eigen pakketvarianten.
- **BIMSWARM** — gecertificeerd (Duits BIM-platform).
- **REST API's**: iTWO 4.0 Web API (RESTful, JWT-beveiligd, met .NET-voorbeeldcode); RIB CX REST API voor bidirectionele integratie met een testbare endpoint-interface.
- **ERP-koppelingen**: SAP ERP, Microsoft Power BI, en "ERP, PMI en CAD" in het algemeen via open API's en webservices.
- **Databaseniveau**: MS SQL Server — technisch de meest gebruikte, maar ongedocumenteerde en niet-ondersteunde integratieroute (zie de `BOQ_SORTED_F`-casus: klanten schrijven rapporten direct tegen interne DB-functies, die RIB zonder waarschuwing wijzigt).

### 6.4 Import-/exportbeperkingen — samengevat

1. **Geen open, neutraal projectbestandsformaat.** Het project ís de SQL-database. Er is geen "sla op als" naar een uitwisselbaar formaat. *Nuance (V7): er bestaat wél een tweede modelkanaal — **CPIXML**, RIB's eigen propriëtaire XML-formaat voor geometrie + attributen (Revit↔iTWO sinds iTWO 2015) — plus **BCF** voor issuecommunicatie. Beide veranderen de conclusie niet: CPIXML is propriëtair, en dat het planningsdata draagt is niet aangetoond.*
2. **Planning gaat er wel in, maar er nauwelijks uit.** Import uit MS Project/Powerproject/P6 is gedocumenteerd; een gedocumenteerde export van het volledige `Vorgangsmodell` naar een open formaat vond ik niet.
3. **IFC-import is lossy voor planning.** IFC brengt geometrie en hoeveelheden binnen; de koppeling naar activiteiten wordt daarna in iTWO gelegd en blijft daar.
4. **Re-import breekt koppelingen.** De MS-Project-round-trip is bewezen onbetrouwbaar op precies het punt dat 5D waardevol maakt.
5. **Geen IFC 4.3.** Dit sluit uit dat iTWO meedoet in moderne infrastructuur-openBIM-workflows (spoor, weg, brug, tunnel) waarvoor IFC 4.3 juist ontwikkeld is — een opvallende lacune gezien RIB's sterke positie in spoorinfrastructuur.

---

## 7. Marktpositie

### 7.1 Waar sterk, en waarom

**DACH — dominante positie in de calculatie/AVA-hoek.** RIB claimt 150.000+ gebruikers in DACH. De reden is padafhankelijkheid: RIB bestaat sinds 1961, heeft de Duitse normketen (GAEB, ÖNORM, CRB) volledig geïmplementeerd, en zit ingebakken in de processen van publieke opdrachtgevers en grote aannemers. Concurrenten moeten niet alleen betere software maken maar ook een dertig jaar oude normbibliotheek repliceren.

**Deutsche Bahn — een de facto verplichtstelling.** *Bronkanttekening (V2): de jaartallen 2014/2016, het vervangen van GRANID én de licentieplicht voor externe bureaus staan alle op **RIB's eigen `itwo-db`-pagina**; DB's eigen KoPI-pagina bevestigt alleen dát iTWO-DB "für die Projektsteuerung umfänglich erfolgreich eingesetzt" wordt, zonder jaartallen of licentievoorwaarden. Behandel de historische details als leveranciersclaim, de licentieplicht als door RIB bevestigd.* DB schreef in 2014 Europees aan, koos RIB, verving GRANID en voerde iTWO in 2016 in als standaard voor kosten- en termijnsturing over alle infrastructuurprojectfasen (KoPI / iTWO-DB). Externe planningsbureaus die voor DB werken **moeten** betaalde iTWO-DB-licenties aanschaffen. DB Bahnbau Gruppe tekende in september 2020 een fase-II-contract; DB Services rolde RIB 4.0 in 2024 landelijk uit na een pilot in de oostelijke regio. Met ± 50.000 dagelijks actieve projecten is dit een van de grootste bouwsoftware-installaties in Europa.

**APAC en Midden-Oosten via de Microsoft/Schneider-kanalen.** MTWO/RIB 4.0 wordt in Singapore en Hongkong via Schneider Electric aangeboden; referenties in India (Nagpur Metro Rail), Nigeria (Julius Berger) en breder Azië. De 5D-BIM-boodschap sluit goed aan bij overheidsmandaten voor BIM in die regio's, en Azure-hosting maakt uitrol zonder lokale IT mogelijk.

**Prefab en industriële bouw.** RIB One Prefab (voorheen Smart Production) bedient een niche waar weinig alternatieven bestaan.

### 7.2 Belangrijkste concurrenten

| Segment | Concurrenten |
|---|---|
| **DACH AVA/calculatie/bouw-ERP** (directe concurrentie) | **NEVARIS Build** (Nemetschek Group — richt zich op kleinere bureaus, maar adverteert wél met IFC4.x en openBIM), **BRZ Bausoftware**, **California.pro** (G&W), **ORCA AVA**, **Sidoun**, **Nemetschek Allplan/Bausoftware** |
| **Planning/scheduling** (waar iTWO's TS-module het aflegt) | **Oracle Primavera P6**, **Asta Powerproject** (Elecosoft), **Microsoft Project**, **Safran**, **Deltek Acumen**, **Tilos** (weg-tijd, Trimble) |
| **4D/BIM-simulatie** | **Bentley SYNCHRO**, **Autodesk Navisworks/ACC**, **Vico/Trimble**, **Solibri** |
| **Bouw-projectplatform / cloud** | **Procore**, **Autodesk Construction Cloud**, **Oracle Aconex**, **Trimble Viewpoint**, **Capmo**, **Fieldwire (Hilti)**, **123erfasst** |
| **ERP-laag** | **SAP** (met bouwoplossingen), **Microsoft Dynamics 365** |

Schaalvergelijking: **Nemetschek Group** boekte in 2024 **€ 995,6 mln** omzet (+16,9%), ± 3.600 medewerkers, 13 productmerken, "meer dan 6 miljoen" gebruikers in 142 landen, EBITDA-marge ± 31%. Voor RIB circuleert **US$ 252,1 mln omzet / 922 medewerkers** (RocketReach). *Verfijnd op 25-07-2026 (V8): de Duitse Wikipedia geeft als laatst zelfstandig gepubliceerde RIB-omzet **€ 255 mln (2020)** — de RocketReach-omzet is dus vrijwel zeker een **bevroren cijfer uit het laatste beursjaar 2020**, niet een actuele schatting. Het **medewerkersaantal van 922 is de echte uitschieter** en staat haaks op de ± 2.600 (2024); behandel dat cijfer als onbruikbaar*, omdat RIB sinds de Schneider-overname geen zelfstandige jaarrekening meer publiceert. Het beeld dat overeind blijft: **RIB is duidelijk kleiner dan Nemetschek**, en aanzienlijk kleiner dan Autodesk, Trimble of Oracle.

### 7.3 Trend

**Stabiel tot licht krimpend in relatieve zin, met een verhoogd strategisch risico.**

- **Positief**: doorlopende grote uitrollen (DB Services landelijk in 2024), een actieve roadmap met AI ("RIB Unite 2026" op 19 maart 2026, gericht op AI-ondersteunde processen en verbonden dataflows), en de Azure-alliantie met Microsoft die internationale distributie opent.
- **Negatief / risico**: (a) Schneider Electric heeft de **squeeze-out van minderheidsaandeelhouders** aangevraagd — volledige consolidatie; (b) Schneider's plan 2026–2030 bevat **desinvesteringen ter waarde van € 1–1,5 mrd omzet**. Of RIB daarbij hoort is **speculatie**, maar het is een reëel scenario dat een koper van een 10-jarige platforminvestering moet meewegen; (c) de gedwongen migratie iTWO → RIB 4.0 met een onrijpe brug ertussen kost klantgoodwill; (d) de reviewscores (3,8/5, value 2,9/5, #59 in de categorie) wijzen niet op een product dat marktaandeel wint op merites; (e) buiten DACH en de eigen kanalen is de merkbekendheid zwak — Nederland en België worden bediend via Microsoft-partners (Intwo), niet via een eigen sterke RIB-organisatie.
- **Nettobeeld**: RIB is veilig zolang de DACH-normketen en de DB-relatie bestaan, maar het wint geen nieuwe markten op productkwaliteit. **Inschatting.**

### 7.4 Opvallende klanten en verplichtstellingen

- **Deutsche Bahn** (iTWO-DB / KoPI) — de facto verplicht voor externe planners in de DB-keten. Meest genoemde referentie.
- **DB Bahnbau Gruppe**, **DB Services** — fase-II-contract 2020, landelijke RIB 4.0-uitrol 2024.
- **Hochtief**, **Max Bögl**, **Julius Berger** (Nigeria), **Tata**, **GP Günter Papenburg**, **BUG Group**, **Stubbe's** (prefab), **Nagpur Metro Rail** (India), **Stadt Fürth**.
- **Deutsche Telekom** — cloudcontract voor iTWO tx, juni 2013, > US$ 700.000.

---

## 8. Eindoordeel

### Voor wie is RIB iTWO de juiste keuze

1. **Aannemers en ingenieursbureaus in de Deutsche-Bahn-keten.** Hier is de vraag niet óf maar hoeveel licenties. € 3.936/jaar per named user is de prijs van markttoegang.
2. **Middelgrote tot grote DACH-aannemers (>100 medewerkers) die één integrale keten willen** van calculatie → AVA → inkoop → uitvoering → facturatie → controlling, met 5D-BIM erin verweven, en die de bijbehorende implementatie- en beheerorganisatie kunnen dragen.
3. **Publieke opdrachtgevers in DE/AT/CH** met AVA-verplichtingen: de normconformiteit (GAEB XML 3.3, ÖNORM, CRB/NPK) is compleet en dat is bij internationale concurrenten zelden zo.
4. **Lijninfrastructuurprojecten** die een geïntegreerd Weg-Tijd-diagram met hoeveelheden en kosten nodig hebben, mits de planning binnen redelijke omvang blijft.
5. **Organisaties met een expliciete single-vendor-strategie** die integratiekosten hoger inschatten dan lock-inrisico.

### Voor wie niet

1. **Iedereen die primair een planningstool zoekt.** iTWO's TS zit pas in het Premium-pakket, mist gepubliceerde CPM-semantiek, mist Monte-Carlo, en is afwezig in de professionele plannerscommunity. Voor pure scheduling: **P6, Asta Powerproject, Safran**.
2. **Megaprojecten met tienduizenden activiteiten.** De architectuur (MS SQL, ± 50 gelijktijdige gebruikers, Citrix bij ~10 modelgebaseerde gebruikers) en de gedocumenteerde performanceklachten wijzen op een plafond ver onder wat P6 aankan. **Inschatting.**
3. **Organisaties met een openBIM-first-strategie, in het bijzonder infrastructuur op IFC 4.3.** Geen IFC 4.3, geen `IfcWorkSchedule`/`IfcTask`, geen buildingSMART-certificering gevonden, geen neutraal projectbestandsformaat. iTWO consumeert IFC, het spreekt het niet als uitwisselingstaal voor planning.
4. **MKB en kleine bureaus.** Geen trial, geen instapprijs, RIB 4.0 pas vanaf 100 medewerkers, implementatie- en trainingskosten van duizenden euro's, supporturen van ± € 140/uur. Kijk naar NEVARIS, ORCA, California.pro of Capmo.
5. **Niet-DACH-organisaties zonder RIB-partner ter plaatse.** Buiten DACH/APAC/Schneider-kanalen is de ondersteuning dun; in de Benelux loopt het via Microsoft-partners.
6. **Organisaties met lage risicotolerantie voor leverancierswisselingen.** De combinatie van gedwongen iTWO→RIB 4.0-migratie, rebrandingchaos, gedocumenteerde updateregressies en Schneider's desinvesteringsplannen 2026–2030 maakt dit een platform waarop je bewust en met open ogen instapt.

### Relevantie voor een open-source, IFC-gebaseerde planner

- **iTWO is geen concurrent, maar wel een benchmark voor de 5D-belofte.** Wat iTWO goed doet — de keten hoeveelheid → LV-positie → kostenregel → activiteit → modelelement in één datamodel — is precies wat een open planner met `IfcTask` + `IfcWorkSchedule` + `IfcRelAssignsToProcess` + `IfcCostItem` in een *open* schema zou kunnen doen. iTWO bewijst dat de markt hiervoor betaalt.
- **Het interoperabiliteitsgat is de kans.** iTWO importeert IFC maar exporteert geen planning; het heeft geen IFC 4.3; het heeft geen open projectbestand. Een IFC 4.3-native planner die `IfcWorkSchedule`/`IfcTask` volledig round-trippt, vult exact het gat dat iTWO openlaat — en kan als *aanvulling* naast iTWO leven in plaats van als vervanger.
- **De praktische koppelvlakken zijn MS Project XML (MSPDI) en P6 XML**, niet IFC. Wie planning met iTWO-gebruikers wil uitwisselen, moet die twee formaten beheersen. Zie ook de gedocumenteerde re-importbug: robuuste, verliesvrije round-trips zijn een reëel onderscheidend punt.
- **Prijsanker voor positionering**: € 3.936/jaar per named user (iTWO-DB, hard) en een geschatte US$ 17.500+/jaar instap (SelectHub, indicatie) laten zien hoe hoog de drempel in dit segment ligt.

---

## Bronnenlijst

Alle bronnen geraadpleegd op **25 juli 2026** tenzij een afwijkende publicatiedatum is vermeld.

### Leverancier (RIB Software / Schneider Electric)
1. RIB Software — bedrijfs- en producthomepage: https://www.rib-software.com/en
2. RIB 4.0 — productpagina (modules Standard/Premium/Ultimate, BIM 5D-add-on, Azure): https://www.rib-software.com/en/rib-4-0
3. RIB 4.0 — Duitse productpagina: https://www.rib-software.com/de/rib-40
4. RIB 4.0 — prijspagina ("meer dan 100 medewerkers", offerteformulier): https://www.rib-software.com/en/rib-4-0/pricing
5. RIB iTWO — Duitse productpagina (modules, doelgroepen, edities, 150.000 gebruikers DACH, GAEB XML 3.3 / ÖNORM / CRB / BIMSWARM): https://www.rib-software.com/de/rib-itwo
6. RIB iTWO — Engelse productpagina en klantcases: https://www.rib-software.com/en/rib-itwo
7. RIB iTWO — prijspagina (pakketstructuur, uitsluitend offerte): https://www.rib-software.com/de/rib-itwo/preise
8. **RIB iTWO DB — prijzen en voorwaarden (€ 328/maand; € 295,20/maand met servicecontract; BKU-account, IT-Fernzugang, named user)**: https://www.rib-software.com/de/itwo-db
9. RIB Terminplanung & Ressourcenmanagement (Gantt projectoverstijgend, Zeit-Wege-Diagramm/Line of Balance, Planversionen, 5D-simulatie, Fertigstellungsgrade): https://www.rib-software.com/de/terminplanung-ressourcenmanagement
10. RIB Software-Service (updates, licentieverzekering/dongle, hotline 30 experts): https://www.rib-software.com/de/software-service
11. RIB Client Resources iTWO (V2025, V2025 Enterprise, Revit-plugin release notes): https://www.rib-software.com/en/client-resources/rib-itwo
12. **RIB iTWO 2025 Enterprise — System Requirements, 01/2025 (PDF; Windows-only, .NET 4.8, MS SQL 2016 SP1+, 5 installatievarianten, ±50/15/10 gelijktijdige gebruikers, 64–128 GB RAM, USB-dongle, poorten)**: https://www.rib-software.com/pdf/en/itwo-v2025-enterprise-system-sequirements-01-2025.pdf
13. RIB IFC Viewer — ondersteunde IFC-versies (IFC2x3 t/m **IFC4 Add2 TC1**): https://ifc.rib.de/
14. RIB Shop — dienstverlening en trainingen: https://www.shop-rib.com/ en https://www.shop-rib.com/dienstleistungen
15. RIB Shop — "Sommer Paket 2" actie-PDF (**€ 3.750 actie / € 4.500 regulier**, t/m 03-10-2025): https://www.shop-rib.com/storage/app/media/RIB%20Dienstleistungen/aktionen/Sommer%20Paket%202.pdf
16. RIB 4.0 brochure (PDF, 11-08-2025; beeldgebaseerd, tekst niet extraheerbaar): https://www.baulinks.de/bkd_file/rib-software/rib_4_0_broschuere_20250811.pdf
17. iTWO 4.0 officiële systeemdocumentatie (UI, Workflow Designer, HTML5/JS/AngularJS): https://ytwo.myhomef.cn/itwo40/documentation/system/cloud.desktop/en/index.html
18. iTWO 4.0 Web API-documentatie (RESTful, JWT, .NET-voorbeelden): https://www.scribd.com/document/725857971/iTWO-4-0-Docu-WebAPI
19. RIB CX REST API — knowledge base: https://ribcx.atlassian.net/wiki/spaces/cxKB/pages/23201089/REST
20. MTWO Cloud op Microsoft Marketplace ("world's #1 vertical cloud"): https://marketplace.microsoft.com/en-us/product/web-apps/ribsoftware.mtwocloud

### Bedrijfs- en marktinformatie
21. Wikipedia — RIB Software (historie 1961, IPO 2011 @ € 9,25, SE 2017, Schneider Electric juli 2020 € 1,4 mrd @ € 29, ± 2.600 medewerkers 2024, CEO René Wolf, iTWO sinds 2009): https://en.wikipedia.org/wiki/RIB_Software
22. MarketScreener — Schneider Electric-dochter vraagt squeeze-out van RIB-minderheidsbelang aan: https://www.marketscreener.com/quote/stock/SCHNEIDER-ELECTRIC-SE-4699/news/Schneider-Electric-Unit-Files-For-Minority-Stake-Squeeze-Out-Of-RIB-Software-35794185/
23. Schneider Electric — financiële doelen 2026–2030, aandeleninkoop en desinvesteringen (€ 1–1,5 mrd omzet)
24. baulinks.de (08-03-2024) — RIB-productrebranding (iTWO FM→RIB FM, iTWO site→RIB Site, Smart Production→One Prefab; vanaf RIB 4.0 v6.4, najaar 2023): https://www.baulinks.de/webplugin/2024/0317.php4
25. computer-spezial.de — RIB-softwareproducten met nieuwe naam: https://www.computer-spezial.de/news/rib-softwareprodukte-mit-neuem-namen-4069950.html
26. eqs-news (10-09-2020) — RIB Software SE tekent fase-II-contract met DB Bahnbau Gruppe GmbH: https://www.eqs-news.com/news/corporate/rib-software-se-rib-signs-a-phase-ii-contract-no-27-2020-with-db-bahnbau-gruppe-gmbh/
27. Handelsblatt / boerse-online e.a. (25-06-2013) — Deutsche Telekom tekent voor cloudoplossing RIB iTWO tx, ordervolume > US$ 700.000
28. MarketScreener — RIB tekent fase-II-deal met GP Günter Papenburg AG (iTWO tx + iTWO finance)
29. Nemetschek Group — kerncijfers 2024 (€ 995,6 mln omzet, +16,9%, ± 3.600 medewerkers, 13 merken, 142 landen)
30. Deutsche Bahn — KoPI: Kostenplanung und Projektsteuerung in Infrastrukturprojekten: https://www.deutschebahn.com/de/geschaefte/infrastruktur/informationen-fuer-planer-und-bauunternehmer/KoPI-12685118
31. MTWO Cloud — case study Deutsche Bahn Group (Europese aanbesteding 2014, ± 50.000 dagelijks actieve projecten): https://www.mtwocloud.com/pdf/567fd9_b5779b7e987c41009a5137b0501e329f.pdf
32. 5D-Institut — referentie DB Training (migratie van GRANID naar iTWO): https://5d-institut.de/referenzen/db-training
33. computer-spezial.de — Datendurchgängigkeit und Kostenkontrolle (DB, >1.000 bouwprojecten/jaar): https://www.computer-spezial.de/artikel/datendurchgaengigkeit-und-kostenkontrolle-fuer-effizienteren-bauablauf-4055915.html
34. constructionreviewonline.com — CCS/RIB-partnerschap en RIB CCS-rebrand: https://constructionreviewonline.com/knowhow/ccs-and-rib-software-partnership-culminates-in-rib-ccs-rebrand/

### Reviewplatforms (spiegelbronnen; G2/TrustRadius/Capterra.com blokkeerden directe toegang)
35. **Capterra Deutschland — RIB iTWO (3,8/5 uit 11 reviews; gebruiksgemak 3,4; support 3,7; prijs-kwaliteit 2,9; features 3,6; 70% aanbeveling; citaten over verouderde UI, performance, "Servicequalität hat deutlich nachgelassen")**: https://www.capterra.com.de/software/1000073/rib-itwo
36. GetApp — RIB iTWO (3,8/5, 11 reviews; value for money 2,9/5; ease of use 3,4/5; "only 1 integration: RIB 4.0, rated 2.0/5"): https://www.getapp.com/all-software/a/rib-itwo-1/
37. Capterra US — RIB iTWO (3,8/5, 11 reviews; "design reminiscent of very outdated Windows"; geen gratis trial): https://www.capterra.com/p/132321/rib-itwo/
38. SoftwareAdvice Duitsland — RIB iTWO ("It is very slow. Connection to RIB 4.0 is not really mature."): https://www.softwareadvice.de/software/3213/rib-itwo
39. **SelectHub — iTWO (startprijs US$ 17.500/jaar, per-user, geen trial; 60% tevredenheid, 10 reviews; #59 in categorie; "slow, particularly the BIM function"; "limited standard reporting options")**: https://www.selecthub.com/p/construction-management-software/rib-itwo/
40. OMR Reviews — RIB iTWO prijspagina (€ 9 / € 29 vermeld; **vrijwel zeker platform-placeholder, niet bruikbaar**): https://omr.com/de/reviews/product/rib-itwo/pricing
41. OMR Reviews — alternatieven voor RIB iTWO (56 alternatieven, o.a. NEVARIS, Procore, Fieldwire, Capmo, 123erfasst): https://omr.com/de/reviews/product/rib-itwo/alternatives
42. G2 — RIB Software als verkoper: 4,3 sterren uit 42 geverifieerde reviews (**seller-niveau over alle RIB-producten, niet iTWO-specifiek**): https://www.g2.com/sellers/rib-software
43. softwareabc24 — RIB iTWO profiel (cloud + desktop + browser, ontbrekende functies: loonverwerking, gereedschapsbeheer, bouwdagboek; geen trial): https://www.softwareabc24.de/bausoftware/itwo
44. softwareabc24 — iTWO vs NEVARIS Build (NEVARIS: **IFC4.x-interface**, openBIM, ingebouwde BIM-viewer; iTWO: cloud + on-prem, desktop + browser): https://www.softwareabc24.de/vergleiche/itwo-vs-nevaris-build

### Gebruikers-, forum- en praktijkbronnen (kritiek)
45. **RENOWATE — "Fehler durch das Update auf iTWO 4.0 Version 6.4.A" (vier concrete regressies: foreign-key-fouten bij Leistungsermittlungen en contract-factuurkoppeling door verplichte VAT Business Posting Group; volledige e-mailuitval zonder foutmelding; `BOQ_SORTED_F` van 3 naar 5 parameters waardoor alle rapporten braken)**: https://www.renowate.earth/itwo_insights/fehler-durch-das-update-auf-itwo-4-0-version-6-4-a/
46. **CAD.de forum — iTWO/MS Project-import: "Leider kommt es vor, dass die zugeordneten Positionen einfach nicht mehr vorhanden sind"**: https://ww3.cad.de/foren/ubb/Forum323/HTMLna/000098.shtml
47. **CAD.de forum — iTWO 4D/5D-handling ("tolle Features, aber das Handling ist halt ziemlich komplex"), printbeperkingen 5–10 kolommen, 11+ bieders handmatig, ontbrekende centrale adresdatabase, "Print Designer ziemlich teuer", "die Stundensätze der RIB sind auch nicht ohne")**: https://ww3.cad.de/foren/ubb/Forum323/HTML/000083.shtml
48. **KOSMICON — RIB iTWO Performance (aparte dienstverleningslijn; oorzaakcategorieën: terminal server, DB/app-server/storage, netwerklatency/VPN, EDR/SSL-inspectie, zware query's en parallelle massa-operaties)**: https://www.kosmicon.de/rib-itwo-performance/
49. KOSMICON (18-03-2026) — RIB 4.0, AI en verbonden workflows; RIB Unite 2026 op 19-03-2026; "RIB 4.0, historisch vaak nog RIB iTWO genoemd": https://www.kosmicon.de/rib-4-0-ki-vernetzte-workflows-strategie/
50. LinkedIn — "Performance Issue with ObjectStore 2024 — Our Workaround in Practice" (gebruiker meldt significante performancedegradatie vanaf december)
51. Reddit r/bim — "Anyone here using iTWO 4.0 or iTWO baseline?" (**niet direct toegankelijk; alleen via zoeksnippet**): https://www.reddit.com/r/bim/comments/hk5srv/anyone_here_using_itwo_40_or_itwo_baselinewant_to/
52. Reddit r/estimators — "Planswift or ITWO CostX" (**alleen via zoeksnippet**): https://www.reddit.com/r/estimators/comments/14nkiqv/planswift_or_itwo_costx/
53. Planning Planet — https://www.planningplanet.com (**gericht gezocht op iTWO/RIB: geen enkele relevante discussie gevonden**)

### Implementatie, partners en tarieven
54. **Ingenieurbüro Knieper / ava4amt.de — prijslijst 2026 (support € 23,33 per begonnen 10 min; halve dag training € 560, hele dag € 1.120 tot 10 deelnemers; € 0,35/km; € 130/nacht; voorbeeld 5-daagse trainingsweek € 6.919,73 bruto; 1 dag webtraining € 1.332,80 bruto)**: https://www.ava4amt.de/preise/
55. **Julius Berger Digital Consulting — RIB 4.0 im Detail (twaalf modules WORK/CC/SPM/SCM/CO/TS/RM/TM/BI+/BIM 5D-6D/OP; "TS: Terminplanung und Termincontrolling mit integrierter Fortschrittskontrolle"; "synchronisiert mit Microsoft Project und Primavera P6"; SAP ERP + Power BI; migratie iTWO → RIB 4.0)**: https://julius-berger-digital-consulting.com/rib-unternehmensloesung/rib-4-0-im-detail/
56. 5D-Institut — RIB iTWO Consulting (implementatie, workflow, dashboards, performancetests; geen tarieven gepubliceerd): https://5d-institut.de/rib-itwo-consulting
57. xdhub — workflows, automatisering en interfaces rondom RIB iTWO 4.0: https://xdhub.de/
58. Promosie — digitalisering bouwprojectmanagement bij Deutsche Bahn: https://promosie.de/deutsche-bahn-digitale-kompetenz-fuer-eine-moderne-bauwelt/
59. Intwo (NL) — RIB 4.0 voor aannemers, ontwikkelaars en projecteigenaren: https://www.intwo.cloud/nl/technologie/industrieoplossingen/rib40/
60. digitalconstructionworld.be — "Is uw bouwonderneming al mee met de MTWO digitale revolutie?": https://www.digitalconstructionworld.be/is-uw-bouwonderneming-al-mee-met-de-mtwo-digitale-revolutie/

### Technische / IFC- en formaatbronnen
61. Springer (10.1007/978-3-658-35302-5_12) — "Erstellen eines Vorgangsmodells" in iTWO: import uit MS Project of Powerproject via XML, opbouw bouwablauf, koppeling model–terminplan
62. Springer (10.1007/978-3-658-23289-4_13) — importinstructies procesmodel (rechtsklik → Import → xml-bestand)
63. Springer (10.1007/978-3-658-35302-5_5 en 978-3-658-23289-4_5) — **BIM Qualifier**: "Um ein Modell in iTWO zu laden, öffnen Sie den BIM Qualifier mit einem Doppelklick"; IFC als importformaat
64. Springer (10.1007/978-3-658-45910-9_13) — modelgebaseerde hoeveelheidsbepaling in het LV en koppeling model ↔ terminplan
65. buildingSMART International — IFC 4.3.2.0-documentatie (referentie voor wat iTWO **niet** ondersteunt): https://standards.buildingsmart.org/IFC/RELEASE/IFC4_3/
66. winGAEB — GAEB-IFC-MMC / BIM-LV-Container (koppeling LV-posities ↔ IFC-elementen): https://wingaeb.de/wp-content/uploads/2024/10/gaeb-ifc-mmc-in-wingaebxml...pdf
67. gaeb-online.de — GAEB-uitwisselingsfasen P81 t/m D11: https://www.gaeb-online.de/gaeb-phasen.html
68. sirados.de — iTWO 2025 importhandleiding (PDF): https://www.sirados.de/media/wysiwyg/pdf/iTwo_Importanleitung.pdf
69. SlideShare (2017) — "iTWO 4.0 general introduction" ("cloud-based 5D BIM enterprise platform ... over 100.000 users worldwide"; **gedateerde leveranciersclaim**): https://www.slideshare.net/slideshow/itwo40-general-introduction/78691412

### Prijsaggregatoren (schattingen, geen leveranciersopgave)
70. **PricingNow — iTWO 4.0 pricing (SCHATTING: 1 gebruiker $ 3.000–7.000/jr; 10 gebruikers $ 25.000–60.000/jr; 100 gebruikers $ 200.000–500.000/jr; implementatie $ 5.000–50.000; 3-jaars TCO 50 gebruikers $ 650.000–800.000; jaarlijkse verhoging 3–5%)**: https://pricingnow.com/question/itwo-4-0-pricing/
71. PricingNow — iTWO smart production pricing (SCHATTING: vanaf $ 50/gebruiker/maand; 100 gebruikers ≈ $ 3.500/maand; 1.000+ gebruikers $ 30.000–50.000/maand; implementatie $ 5.000–10.000 MKB tot $ 100.000+ enterprise): https://pricingnow.com/question/itwo-smart-production-pricing/
72. ITQlick — "RIB MC2 iTWO" pricing ($ 50 per user/month; **betreft een ander RIB-product, niet de planningssuite**): https://www.itqlick.com/rib-mc2-itwo/pricing
73. SaaSCounter — iTWO 4.0 features & pricing: https://www.saascounter.com/products/itwo-4-0

---

### Methodologische kanttekeningen

- **Alle bedragen zijn exclusief btw tenzij anders vermeld.** Bedragen in USD zijn niet omgerekend.
- **"SCHATTING" is expliciet gemarkeerd** bij: het realistische aantal activiteiten, het onderhoudspercentage bij perpetual licenties, XER/CSV-ondersteuning, de afwezigheid van Monte-Carlo, en de trendbeoordeling.
- **Adversariële hercontrole 25-07-2026**: zie de sectie **Verificatie** onderaan. Daar is per kernbewering geprobeerd de bewering te *weerleggen* met een onafhankelijke bron; correcties zijn in de tekst hierboven verwerkt en gemarkeerd met V-nummers.
- **Zwakste evidentiepunten** in dit profiel, voor wie erop wil doorvragen: (a) het aantal reviews is laag (11 op Capterra/GetApp/SoftwareAdvice, 10 op SelectHub) — statistisch zwak, al is de richting consistent over platforms heen; (b) de P6-synchronisatie van de TS-module komt uit een partnerbron, niet uit RIB-documentatie; (c) de afwezigheid van IFC 4.3 en van `IfcWorkSchedule`/`IfcTask` is vastgesteld op basis van **afwezigheid van bewijs** in publieke bronnen plus RIB's eigen IFC-viewerversielijst — het is geen expliciete leveranciersuitspraak; (d) omzet- en medewerkerscijfers voor RIB zijn sinds de Schneider-overname niet meer zelfstandig gepubliceerd en de circulerende aggregatorcijfers spreken elkaar tegen.

---

## Verificatie

*Adversariële hercontrole, uitgevoerd 25 juli 2026. Opzet: elke bewering actief proberen te **weerleggen** met een bron die niet identiek is aan de oorspronkelijke bron. Beperking van deze ronde: het WebSearch-quotum van de sessie was uitgeput, dus alle controles liepen via directe fetches (leverancierspagina's, Wikipedia, reviewplatforms, reseller, PDF-extractie) en DuckDuckGo-HTML-resultaatpagina's als zoeksubstituut. `buildingsmart.org/compliance/...` en `planningplanet.com` gaven HTTP 403 en konden niet direct worden gelezen.*

| # | Bewering | Oordeel | Wat de controle opleverde | Bron |
|---|---|---|---|---|
| **V1** | iTWO-DB kost **€ 328,00/maand (€ 3.936/jaar)** per named user; **€ 295,20/maand (€ 3.542,40/jaar)** met 10% korting voor bestaande klanten met servicecontract; **uitsluitend huurlicentie**; vereist BKU-account + IT-Fernzugang; externe planningsbureaus **moeten** betaalde licenties kopen | **bevestigd** | Alle vier de bedragen letterlijk teruggevonden bij hercontrole, inclusief "Mietlizenzen", "BKU-Account", "IT-Fernzugang" en "kostenpflichtige Lizenzen von RIB erwerben". Dit is en blijft het enige harde, publiek gepubliceerde softwarebedrag | https://www.rib-software.com/de/itwo-db |
| **V2** | Deutsche Bahn voerde iTWO **in 2016** in na een **Europese aanbesteding 2014** en verving daarmee **GRANID** | **onzeker (bron is de leverancier zelf)** | Poging tot onafhankelijke bevestiging via DB's eigen KoPI-pagina mislukte: die bevestigt alleen dát iTWO-DB "für die Projektsteuerung umfänglich erfolgreich eingesetzt" wordt en noemt géén jaartal, géén aanbesteding en géén GRANID. De zoekhit die 2016/2014/GRANID noemt, is **opnieuw rib-software.com/de/itwo-db** — dus geen tweede, onafhankelijke bevestiging. Bewering blijft staan, maar als leveranciersclaim gemarkeerd | https://www.deutschebahn.com/de/geschaefte/infrastruktur/informationen-fuer-planer-und-bauunternehmer/KoPI-12685118 |
| **V3** | Overname door Schneider Electric juli 2020 voor **€ 1,4 mrd**, **€ 29/aandeel** | **bevestigd, met bronvariatie** | Onafhankelijke bevestiging van € 29,00/aandeel en ~€ 1,4 mrd (41% premie op de slotkoers, 37% op de 3-maands VWAP). **Maar**: de Duitse Wikipedia noemt **€ 1,5 mrd**. Waarschijnlijk equity value versus enterprise value; het verschil is nu in de tabel vermeld in plaats van stilzwijgend één cijfer te kiezen | Schneider-aankondiging via DDG-snippets; https://de.wikipedia.org/wiki/RIB_Software |
| **V4** | RIB 4.0-pakketten: **Standard** = Base/Work/CE/CC/SPM; **Premium** = + IM/SCM/CO/**TS**/**RM**; **Ultimate** = + TM/BI+ | **GECORRIGEERD** | De actuele pagina geeft een andere indeling: **IM zit in Standard** (niet Premium) en **RM zit in Ultimate** (niet Premium). Premium = Standard + SCM + CO + TS. Tabel in §2.3 en de tekst in §2.1 zijn aangepast. De partnerbron bevestigt wel de modulenamen maar publiceert de indeling alleen in een niet-inline PDF. **Gevolg voor de conclusie: geen verzwakking maar een versterking** — planning (TS) zit pas in Premium én resourceplanning (RM) pas in Ultimate | https://www.rib-software.com/en/rib-4-0 ; https://julius-berger-digital-consulting.com/rib-unternehmensloesung/rib-4-0-im-detail/ |
| **V5** | **Geen IFC 4.3**; RIB noemt als hoogste versie **IFC4 Add2 TC1** | **bevestigd, met kanttekening** | Versielijst letterlijk herbevestigd t/m "IFC4 Add2 TC1 (4.0.2.1) latest official version"; IFC4.3 komt er niet in voor. Een gerichte zoekopdracht op `iTWO + "IFC 4.3"/"IFC4.3"` leverde **nul resultaten**. Kanttekening die nu in de tabel staat: dit is de versielijst van RIB's **viewer**, niet aantoonbaar die van iTWO's importer; de iTWO-productpagina zegt enkel "IFC (Open BIM)" zonder versie. Blijft dus: sterk onderbouwd, maar formeel afwezigheid-van-bewijs | https://ifc.rib.de/ |
| **V6** | Op **Planning Planet** leverde gericht zoeken **geen enkele** iTWO-discussie op | **GECORRIGEERD (genuanceerd)** | Er bestaat wél een bedrijfstagpagina `planningplanet.com/category/company/rib-software`. De vindbare inhoud is echter een lid-/CV-vermelding ("Sales support, customer demonstrations, training…"), geen vakinhoudelijke discussie; de site zelf gaf HTTP 403 en kon niet volledig worden gelezen. Formulering aangescherpt naar "geen inhoudelijke plannersdiscussies" | DDG `site:planningplanet.com`; https://planningplanet.com/category/company/rib-software (403) |
| **V7** | Interoperabiliteit beperkt zich tot IFC-import + MS Project/Powerproject/P6 + GAEB; **geen open, neutraal projectbestandsformaat** | **GECORRIGEERD (aangevuld)** | Het profiel miste twee door RIB zelf genoemde kanalen: **CPIXML** (RIB's propriëtaire *Construction Process Integration XML*, sinds iTWO 2015 de directe Revit↔iTWO-interface, draagt 3D-geometrie + attributen) en **BCF**. Ook de CAD-lijst was te kort: naast Revit/Allplan/Vectorworks/RIB Civil ook **Graphisoft, Tekla, AKG Vestra, card1, Trimble Nova, DDS CAD**. **De kernconclusie overleeft dit**: CPIXML is propriëtair, en dat het planning-/`Vorgangs`-data draagt is in geen enkele bron bevestigd — het is een modelkanaal, geen planningsuitwisselformaat | https://www.rib-software.com/de/rib-itwo ; www.bim4b.de/glossar/…/cpixml-construction-process-integration-xml |
| **V8** | RIB-omzet **US$ 252,1 mln** / **922 medewerkers** (RocketReach) staat haaks op ± 2.600 medewerkers | **GECORRIGEERD (verfijnd)** | De Duitse Wikipedia noemt als laatst zelfstandig gepubliceerde omzet **€ 255 mln (2020)**. Het RocketReach-omzetcijfer is dus vrijwel zeker het **bevroren beursjaar 2020**, geen tegenspraak. Alleen het **medewerkersaantal 922** is een echte uitschieter en moet als onbruikbaar worden behandeld. Nuance toegevoegd in §7.2 | https://de.wikipedia.org/wiki/RIB_Software |
| **V9** | RIB Shop "iTWO Planen Upgrade Paket II": **€ 4.500 regulier / € 3.750 actie** | **onzeker (niet herverifieerbaar)** | De bron-PDF is beeldgebaseerd zonder tekstlaag; tekstextractie leverde een leeg document op, dus het bedrag kon **niet** opnieuw uit de bron worden gelezen. Bovendien is de actie op **03-10-2025 verlopen** en toont shop-rib.com/dienstleistungen nu alleen "Firmentrainings" en "Software Installation" zonder prijzen. Waarschuwing toegevoegd in §3.2: niet als actueel prijsanker gebruiken | https://www.shop-rib.com/dienstleistungen ; PDF "Sommer Paket 2" |
| **V10** | RIB: opgericht **1961**, beursgang **2011** (uitgiftekoers € 9,25), SE sinds **april 2017**, iTWO sinds **2009**, **± 2.600** medewerkers (2024) | **grotendeels bevestigd; uitgiftekoers onzeker** | Onafhankelijk bevestigd: 1961, **februari 2011** Prime Standard Frankfurt, omzetting naar SE april 2017, iTWO 2009 (Duitse markt), 2.600 medewerkers (2024). De **uitgiftekoers € 9,25** komt op de Duitse Wikipedia niet voor en is dus **niet herverifieerd** — als onzeker gemarkeerd in de tabel | https://de.wikipedia.org/wiki/RIB_Software |
| **V11** | CEO is **René Wolf** | **bevestigd, met aanvulling** | René Wolf is CEO & Managing Director en nog in functie (2025). **Tobias Hamacher** is echter **CFO** & Managing Director en werd in de Duitse Wikipedia naast Wolf als directie genoemd — het profiel vermeldde hem niet. Rij aangepast naar "Directie" met beide namen en functies | https://de.wikipedia.org/wiki/RIB_Software ; RIB Software LinkedIn (2025) |
| **V12** | Systeemeisen: **Windows-only**, .NET 4.8+, **MS SQL Server 2016 SP1+**, 5 installatievarianten, **± 50 / 15 / 10** gelijktijdige gebruikers, **64–128 GB RAM**, **USB-dongle**, poorten 42150–42153 / 4410 / 1433 TCP + **5093 UDP** | **bevestigd (letterlijk uit de bron-PDF)** | PDF gedownload en tekst geëxtraheerd. Letterlijk teruggevonden: "Windows® 10/11 Pro, Enterprise"; "MS .NET Framework 4.8 or higher"; "Microsoft SQL Server 2016 SP1 or higher"; "About 50 simultaneous RIB iTWO network users"; "about 15 simultaneous users"; "about 10 simultaneous users"; "As from 64 GB RAM, 128 GB recommended"; "for big 5D models 64 GB"; "1 free USB slot for USB dongle"; "42150, 42151, 42152, 42153 (TCP)", "RIB Licence Server: 5093 (UDP)", "4410, 1433 (TCP)"; "ARM and Itanium CPUs and installation variant Server Core are not supported". **Geen enkele afwijking gevonden** | https://www.rib-software.com/pdf/en/itwo-v2025-enterprise-system-sequirements-01-2025.pdf |
| **V13** | Capterra/SoftwareAdvice: **3,8/5** uit **11** reviews; prijs-kwaliteit **2,9/5**; gebruiksgemak 3,4; support 3,7; features 3,6; **70%** aanbeveling | **bevestigd** | Alle zes de cijfers exact herbevestigd op Capterra.de. GetApp bevestigt onafhankelijk 3,8/5, 11 reviews, value for money 2,9/5 en "1 integratie: RIB 4.0, 2.0/5" | https://www.capterra.com.de/software/1000073/rib-itwo ; https://www.getapp.com/all-software/a/rib-itwo-1/ |
| **V14** | SelectHub: startprijs **US$ 17.500/jaar**, per-user, **geen gratis trial**, 60% tevredenheid uit 10 reviews, **#59** in de categorie | **bevestigd als bronweergave (blijft indicatie)** | Alle elementen letterlijk teruggevonden, inclusief "$17,500", "Annually", "No" (free trial), 60% / 10 reviews, "#59". Dit bevestigt **dat SelectHub dit publiceert**, niet dat het RIB's werkelijke lijstprijs is — de kwalificatie "indicatie, geen lijstprijs" blijft terecht | https://www.selecthub.com/p/construction-management-software/rib-itwo/ |
| **V15** | **Geen gratis proefversie, geen freemium** | **bevestigd, met één dubbelzinnige bron** | SelectHub geeft expliciet "No" voor free trial; Capterra US meldt eveneens geen gratis trial. **Kanttekening**: de GetApp-pagina toont de labels "Free trial" en "Free version" zonder leesbare waarde — dat zijn vermoedelijk lege filterkoppen, maar het maakt GetApp op dit punt onbruikbaar als bevestiging. Twee van drie bronnen bevestigen; niet weerlegd | https://www.selecthub.com/p/construction-management-software/rib-itwo/ ; https://www.capterra.com/p/132321/rib-itwo/ |
| **V16** | Reseller-tarieven (ava4amt.de, prijslijst 2026): **€ 23,33 per begonnen 10 min**, training halve dag **€ 560** / hele dag **€ 1.120** (max 10 deelnemers), **€ 0,35/km**, **€ 130/nacht**, voorbeeld 5-daagse week **€ 6.919,73 bruto**, webtraining **€ 1.332,80 bruto** | **bevestigd** | Alle bedragen exact herbevestigd, inclusief de 5%-indexatieclausule bij meerjarencontracten en de detaillering van het rekenvoorbeeld (5.600 + 214,90 + 650 → € 6.919,73 bruto, incl. 19% btw). Vertrekpunt reiskosten: 56754 Dünfus | https://www.ava4amt.de/preise/ |
| **V17** | RIB 4.0 is bedoeld voor bedrijven met **meer dan 100 medewerkers**; **geen gepubliceerde lijstprijzen** | **bevestigd** | Letterlijk: "RIB 4.0 is designed for construction companies with more than 100 employees". De pagina bevat geen bedragen, alleen een "Get My RIB 4.0 Pricing"-formulier en "flexible pricing model" met Standard/Premium/Ultimate | https://www.rib-software.com/en/rib-4-0/pricing |
| **V18** | RIB claimt **"über 150.000 Nutzer"** in DACH | **bevestigd als leveranciersclaim** | Letterlijk op de eigen pagina: "RIB iTWO nutzen weit über 150.000 Anwender im D A CH Raum – vom Ein-Mann-Büro, über den Mittelstand bis hin zu Weltkonzernen". Onafhankelijke validatie van het aantal is **niet** gevonden; blijft een onbevestigde marketingclaim | https://www.rib-software.com/de/rib-itwo |
| **V19** | CAD.de: bij re-import van MS-Project-wijzigingen **verdwijnen toegewezen LV-posities** | **bevestigd (citaat letterlijk juist)** | Thread opnieuw gelezen; citaat klopt woordelijk: *"Wenn ich nun Änderungen im MS Project vornehme, und im iTWO erneut importiere, werden die Änderungen übernommen. Leider kommt es vor, dass die zugeordneten Positionen einfach nicht mehr vorhanden sind."* **Twee kanttekeningen**: (a) het is één gebruikersmelding, geen bevestigde bug; (b) er staat **geen antwoord** in de thread, dus ook geen tegenspraak of oplossing. Ondanks de threadtitel "iTWO Terminplan --> MS Project" gaat het om de **import**richting — dat bevestigt indirect de conclusie dat export nauwelijks gedocumenteerd is | https://ww3.cad.de/foren/ubb/Forum323/HTMLna/000098.shtml |
| **V20** | **Geen `IfcTask`/`IfcWorkSchedule`-import of -export** in iTWO | **onzeker (afwezigheid van bewijs, wél opnieuw getoetst)** | Een gerichte zoekopdracht op `iTWO IFC export "IfcTask" OR "IfcWorkSchedule"` leverde **geen enkele bron** op die dit voor RIB/iTWO documenteert; de treffers gingen over de IFC4.3-specificatie zelf en over IfcOpenShell. Poging tot controle van de buildingSMART-certificeringslijst mislukte (HTTP 403), dus **"geen buildingSMART-certificering gevonden" is niet opnieuw hard te maken**. Blijft: goed onderbouwde negatieve bevinding, geen bewijs van afwezigheid | DDG-zoekopdracht; https://www.buildingsmart.org/compliance/software-certification/certified-software/ (403) |

### Wat deze ronde niet heeft kunnen toetsen

- **buildingSMART-certificeringsstatus** van RIB/iTWO (HTTP 403 op de certificeringslijst) — de bewering "geen certificering gevonden" staat nog steeds uitsluitend op de eerdere ronde.
- **Nemetschek's kerncijfers 2024** (€ 995,6 mln, +16,9%, ± 3.600 medewerkers): twee pogingen via de IR- en perspagina leverden geen cijfers op; het cijfer is **niet herverifieerd**. Voor de schaalvergelijking maakt dit weinig uit — de conclusie "RIB is duidelijk kleiner dan Nemetschek" volgt al uit RIB's eigen laatst gepubliceerde € 255 mln (2020).
- **De PricingNow- en SelectHub-bedragen inhoudelijk** — alleen is bevestigd *dat* die platforms ze publiceren. Hun methodiek blijft ondoorzichtig; de markering "SCHATTING/indicatie" is en blijft noodzakelijk.
- **De performance- en schaalbaarheidsschatting** (1.000–5.000 activiteiten comfortabel) is een eigen extrapolatie zonder externe bron en is bij deze ronde niet getoetst; die blijft nadrukkelijk als **SCHATTING** gemarkeerd.
