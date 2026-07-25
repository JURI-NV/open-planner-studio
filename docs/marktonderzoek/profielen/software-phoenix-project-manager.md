# Phoenix Project Manager (Phoenix CPM)

*Marktonderzoek planningssoftware — diepgaand productprofiel*
**Onderzoeksdatum: 25 juli 2026**
**Onderzoeker: software-analist, marktonderzoek planningssoftware**

---

## 0. Methodologische verantwoording en waarschuwing vooraf

Dit profiel is opgebouwd uit primaire leveranciersbronnen (phoenixcpm.com: productpagina, about/feature-overzicht, FAQ, shop, downloadpagina, academische-licentiepagina), een geautoriseerde wederverkoper (CDP Inc.), reviewaggregatoren (Capterra, G2, GoodFirms), bedrijfsdatabases (LinkedIn-bedrijfsprofiel, Apps Run The World), vakpublicaties (Plan Academy) en concurrentie-vergelijkingspagina's (Outbuild, Planera).

**Twee belangrijke beperkingen van dit onderzoek, expliciet vermeld:**

1. **Zeer dunne reviewbasis.** Phoenix Project Manager is een nicheproduct van een microbedrijf. Capterra heeft **één** review; G2 heeft een productpagina zonder noemenswaardige beoordelingen; TrustRadius en Gartner Peer Insights hebben geen bruikbaar profiel. Reddit- en Planning-Planet-inhoud was tijdens dit onderzoek technisch niet ophaalbaar (blokkades op reddit.com en mirrors). Uitspraken over gebruikerservaring berusten daarom op een smalle basis en zijn als zodanig gemarkeerd. Dit is zelf een bevinding: **het product heeft nauwelijks publieke gebruikersfeedback**, wat op een kleine installed base wijst.

2. **Aantoonbare desinformatie in omloop.** Minstens één SEO-artikel (constructionbids.ai, "Best Oracle Primavera P6 Alternatives") beschrijft "Phoenix" als een **cloud-native platform met realtime earned-value-dashboards (CPI/SPI/TCPI/EAC/VAC) voor $1.500–$2.400 per gebruiker per jaar**. Dat is **aantoonbaar onjuist** voor dit product: Phoenix Project Manager is een zelfstandige desktopapplicatie zonder cloud, zonder EVM-dashboards, met een eenmalige licentieprijs van $799. Vermoedelijk AI-gegenereerde content die producten verwart. **Dit bedrag is in dit rapport uitdrukkelijk verworpen** en mag niet als prijsindicatie worden gebruikt.

**Correctie op de onderzoeksopdracht.** De opdracht typeert Phoenix als "sterk bij claims/forensische planning". Dat is bij nader onderzoek **maar zeer beperkt houdbaar** — zie §5 en §9. Phoenix heeft wel enkele bouwstenen die in claimwerk nuttig zijn (retained logic, onbeperkte Storepoints, XER-uitwisseling, SDEF-export), maar het mist elke gespecialiseerde forensische toolset. De echte forensische markt zit bij Oracle Claim Digger, Deltek Acumen Fuse, Schedule Analyzer en Steelray. Deze nuancering is een van de belangrijkste uitkomsten van dit onderzoek.

---

## 1. Wat het is

### 1.1 Leverancier en eigendom

| Item | Gegeven | Bron |
|---|---|---|
| Productnaam | Phoenix Project Manager (marketingnaam "Phoenix CPM", "Phoenix 5") | phoenixcpm.com |
| Leverancier | **Phoenix Project Management Systems** | LinkedIn-bedrijfsprofiel |
| Vestiging | 44 W. Broadway #2007, **Salt Lake City, Utah, VS** | LinkedIn-bedrijfsprofiel |
| Opgericht | **2005** | LinkedIn-bedrijfsprofiel; bevestigd door Solevant ("beschikbaar sinds 2005") |
| Oprichter | **Jerry Poulsen**, planner met 30+ jaar ervaring | Bedrijfsprofiel-aggregatie (CB Insights/Crunchbase/LinkedIn-samenvatting) |
| Personeelsomvang | **2–10 medewerkers** (LinkedIn-bandbreedte) | LinkedIn-bedrijfsprofiel |
| Eigendom | Privaat, onafhankelijk; **geen aanwijzingen voor overname, PE-eigendom of concernverband** gevonden | eigen onderzoek |
| Rechtsvorm/fiscale hint | Utah-btw (6,85% Utah State Sales Tax) wordt op de eigen webshop toegepast | phoenixcpm.com/shop/purchase.php |

Dit is dus geen softwarehuis maar een **micro-ISV**: een handvol mensen, één product, twintig jaar continuïteit. Dat verklaart zowel de sterke punten (scherpe prijs, gefocust product, directe support) als de zwakke (geen platformstrategie, geen API, geen cloud, single-point-of-failure-risico).

### 1.2 Positionering en historie

Phoenix is ontstaan uit onvrede van planners met het bestaande aanbod. De eigen about-pagina stelt dat "ondanks het belang van de planning als projectmanagementinstrument, de sector slecht bediend wordt" door bestaande software. De marketingpositionering is consistent sinds 2005: **"the real alternative for construction scheduling"** — bewust gepositioneerd tussen Microsoft Project (te licht, verkeerde logica-semantiek voor bouw) en Oracle Primavera P6 (te duur, te zwaar, database- en IT-afhankelijk).

De wederverkoper CDP Inc. vat de belofte samen als: *"easier to use than Microsoft Project™, P3, and SureTrak"*, met een **"two clicks to complete"**-workflow. *(Correctie 25-07-2026: het eerder geciteerde "as easy to use as Microsoft Project and as powerful as Primavera" staat niet op de CDP-productpagina en is vervangen door de wél aangetroffen formulering.)*

Historisch is Phoenix een **P3/SureTrak-vervanger**. Toen Oracle in 2010 Primavera P3 en SureTrak uitfaseerde, ontstond een grote groep Amerikaanse aannemers met werkende P3-schema's, P3-werkgewoonten en géén budget of behoefte aan P6-enterprise. Phoenix richt zich expliciet op die groep — vandaar de import van "Suretrak and P3 Project Groups" die tot op de dag van vandaag in de featurelijst staat.

### 1.3 Doelgroep, typische gebruikers en sectoren

**Primaire doelgroep:** bouwbedrijven (general contractors en gespecialiseerde onderaannemers) in de Verenigde Staten die CPM-planningen moeten leveren omdat het contract dat eist, maar die geen enterprise-planningsafdeling hebben.

**Typische gebruiker:** de projectplanner/scheduler of de projectmanager-die-óók-plant, één tot een paar licenties per bedrijf, werkend op één project tegelijk in één bestand op zijn eigen laptop.

**Sectoren** (volgens het bedrijfsprofiel van de leverancier zelf): bouw, lucht- en ruimtevaart, defensie, architectuur, engineering en design. In de praktijk is de gemeten klantenbasis vrijwel volledig **bouw en vastgoed**, met een tweede zwaartepunt in de maakindustrie (Apps Run The World).

**Klantprofiel (Apps Run The World, gemeten klantenpopulatie — kleine steekproef, N = 7 geïdentificeerde klanten):**
- **42,86%** van de klanten heeft 0–100 medewerkers; **57,14%** heeft 101–1.000 medewerkers (exacte percentages, herverifieerd 25-07-2026).
- **Geen enkele grote enterprise-klant geïdentificeerd** — letterlijk: "no adoption among larger enterprises".
- **Volledige klantenlijst** (bij herverificatie aangevuld; eerder waren er slechts drie van de zeven vermeld): Del Amo Construction (~$250 mln omzet, 180 fte), **Steele & Freeman (~$114 mln, 250 fte)**, Centric Projects (~$60 mln, 100 fte), **WESPAC Construction (~$50 mln, 200 fte)**, Peinado Construction (~$34 mln, 62 fte), **Dawson Construction (~$20 mln, 150 fte)**, **HESS Construction (~$18 mln, 80 fte)**. De omzetklasse loopt dus van ~$18 mln tot ~$250 mln — iets breder naar beneden dan eerder gerapporteerd.
- Geografie: overwegend **Verenigde Staten**. ⚠️ De bijzin op die pagina dat adoptie "across 195 countries worldwide" wordt gevolgd is **boilerplate van de aggregator over de eigen database**, geen uitspraak over Phoenix; niet als bewijs van internationale spreiding gebruiken.

**Regio's.** Phoenix is een uitgesproken **Noord-Amerikaans (feitelijk: Amerikaans) product**. Bewijs daarvoor:
- De enige gespecialiseerde exportstandaard die het ondersteunt is **USACE SDEF** — een puur Amerikaanse federale contractstandaard.
- De webshop rekent Utah-btw en prijst in USD; er zijn geen regionale prijzen of valuta's aangetroffen.
- De software is **uitsluitend Engelstalig**; geen aanwijzingen voor lokalisatie.
- De belangrijkste wederverkoper (CDP Inc., 800-nummer) is Amerikaans. Er is één Britse distributeur aangetroffen (Project Controls Online / Projcon Group, Staines-upon-Thames), maar diens productpagina draagt sterk verouderde systeemeisen (Windows XP/Vista, PowerPC-Macs) en oogt als een niet-onderhouden listing.
- Geen enkele aanwijzing voor gebruik in continentaal Europa, het Midden-Oosten of Azië.

---

## 2. Functionaliteit en techniek

### 2.1 Architectuur en platform

| Aspect | Invulling |
|---|---|
| Type | **Zelfstandige desktopapplicatie** ("self-contained application and project data") |
| Besturingssystemen | **Windows** (MSI-installer) en **macOS** (DMG-installer) — beide first-class |
| Cloud/web | **Geen.** Geen webversie, geen browserclient, geen SaaS-variant |
| Mobiel | **Geen.** Geen iOS-, iPadOS- of Android-app |
| Database | **Geen.** Expliciet: *"NONE! Phoenix uses a custom XML file type that saves all of your data in a single file"* (FAQ) |
| Server-/IT-eisen | Geen. Marketingclaim: "No Database Servers or IT required" |
| Meergebruikers-samenwerking | **Geen.** Eén bestand, één gebruiker tegelijk; samenwerking loopt via bestandsuitwisseling |
| Huidige versies (25-07-2026) | **Phoenix 5, v5.6.3.0** (Win + Mac); Phoenix 4, v4.8.17.0 blijft parallel gedownload |

De macOS-ondersteuning is een genuanceerd maar reëel onderscheidend punt: **Oracle Primavera P6 Professional draait niet native op macOS**. Voor Mac-georiënteerde architecten- en ingenieursbureaus is Phoenix daarmee een van de weinige echte CPM-opties zonder virtualisatie.

**⚠️ Twee kanttekeningen bij dat argument, toegevoegd bij herverificatie (25-07-2026).** (a) De Oracle-systeemeisen voor P6 Professional konden in deze sessie niet worden opgehaald; de uitspraak "niet native op macOS" berust op algemeen bekende productkennis, niet op een geverifieerde primaire bron. (b) Belangrijker: het geldt voor de **desktopclient** P6 Professional. **P6 EPPM heeft een browsergebaseerde webclient die op een Mac gewoon werkt.** "P6 is voor Mac-gebruikers geen optie" is dus te sterk gesteld — correcter is: *de P6-desktopclient is dat niet, en voor het kleine bureau zonder EPPM-server is de webclient economisch geen alternatief.* Zie ook Verificatie.

De keuze voor "één XML-bestand, geen database" is architectonisch de kern van het product. Voordeel: nul deploymentkosten, triviale back-up, bestanden gaan gewoon per e-mail. Nadeel: geen concurrency, geen centrale waarheid, geen portfoliolaag, geen audit trail buiten de Storepoints om.

### 2.2 CPM-engine

De rekenkern is een klassieke, volwaardige CPM-implementatie. Uit het officiële feature-overzicht:

- **Critical Path Method-algoritme** met forward/backward pass.
- **Kritiek pad te bepalen via Total Float óf Longest Path.** Dit is een serieus technisch pluspunt en directe pariteit met P6: bij multi-kalender- of geconstraineerde schema's geeft "longest path" een correcter kritiek pad dan de naïeve TF≤0-regel.
- **Retained Logic** als expliciet gepropageerde relatie-afhandeling bij out-of-sequence-voortgang. Dit is een gemarkeerd verkoopargument ("Retained Logic Relationships let you see what's working"). Of ook **Progress Override** als alternatieve instelling beschikbaar is, kon uit de publieke documentatie **niet worden bevestigd** — dit is een openstaand punt en relevant voor forensisch gebruik.
- **Activiteitstypen:** Task, Milestone, **Flag** en Hammock (samenvattingsactiviteit). Het Flag-type is een Phoenix-eigenaardigheid die door Plan Academy als onderscheidend werd aangemerkt.
- **Relatietypen:** Finish-to-Start, Start-to-Start, Finish-to-Finish, Start-to-Finish — alle vier, met lag.
- **Constraints:** Early Start, Early Finish, Late Start, Late Finish, Must Start, Must Finish. **⚠️ Onzeker:** bij herverificatie op 25-07-2026 noemt de about-pagina wél "constraints" als functiegroep, maar **niet de zes afzonderlijke constrainttypen bij naam**. Het rijtje van zes is niet uit een ophaalbare bron te bevestigen — behandel het aantal en de namen als onbevestigd.
- **Berekende velden:** original duration, remaining duration, free float, total float, percent complete, early start/finish, late start/finish, actual dates, geschatte data.
- **CPM Checker:** een ingebouwde kwaliteitscontrole die logicafouten en planningsproblemen signaleert vóór ze het project raken. Functioneel het equivalent van een lichte DCMA-14-achtige schemacheck; de exacte regelset is niet publiek gedocumenteerd.

**Kritieke technische beperking:** *"Can Phoenix schedule in hours?" → "No. At this time Phoenix only schedules in days."* (officiële FAQ). Phoenix rekent **uitsluitend in dagen**. Voor shutdown-, turnaround-, spoorbuitendienststelling-, offshore- of gefaseerde-inbedrijfstellingplanning is dit een **harde diskwalificatie**. Voor reguliere gebouw- en civiele bouw is het zelden een probleem.

### 2.3 Kalenders

- **Meerdere kalenders per project**, per activiteit toewijsbaar.
- Standaard 5-, 6- en 7-daagse kalenders meegeleverd.
- **Volledig aanpasbare kalenders** met eigen werkweek, feestdagen en uitzonderingen.

Dit is functioneel correct en voldoende voor bouw. Geen resource-kalenders als apart concept aangetroffen (kalenders lijken activiteitgebonden) — **niet definitief vastgesteld, markeren als onzeker**.

### 2.4 Resource- en kostenmodel

- **Resources** kunnen aan activiteiten worden toegewezen, met bijbehorende kosten.
- **Resource allocation graphs** (histogrammen) tonen over- en onderbezetting.
- **Cost Account System**: vaste kosten per activiteit vastleggen en volgen.

En dan de beperkingen — alle drie **officieel bevestigd in de eigen FAQ**:

| Vraag (FAQ) | Antwoord |
|---|---|
| *"Can I level resources in Phoenix?"* | **"No. At this time Phoenix does not have a resource leveling feature."** |
| *"Can I import or export resources?"* | **"Not yet… but it's coming soon!"** |
| *"Can Phoenix schedule in hours?"* | **"No. At this time Phoenix only schedules in days."** |

Het resourcemodel is dus **visualiserend, niet optimaliserend**: je ziet dat je een piek hebt, maar de software lost hem niet voor je op. En — dit is de zwaarwegendste bevinding voor interoperabiliteit — **resourcetoewijzingen kunnen niet geïmporteerd of geëxporteerd worden**. Zie §6.

Van earned value management (BCWS/BCWP/ACWP, CPI/SPI, ANSI/EIA-748) is in de officiële feature-lijst **geen spoor**. Claims van derden dat Phoenix EVM-dashboards heeft, zijn onjuist (§0).

### 2.5 Baselines: Storepoints

Phoenix' baselinemechanisme heet **Storepoints** en is een van de sterkste onderdelen van het product:

- **Onbeperkt aantal Storepoints per project**, opgeslagen **binnen hetzelfde projectbestand** (geen aparte baselinebestanden).
- Te maken tijdens het werk óf te importeren uit eerdere bestandsversies.
- Vergelijken via `SCHEDULE > COMPARE STOREPOINTS`.
- Ondersteunt **change highlighting** met geanimeerde balkovergangen (v5) — visueel zichtbaar maken wat er tussen twee revisies veranderd is.
- Aanvullende weergaven: **Status-on-Master** en **Status-on-Current** (huidige voortgang geprojecteerd op respectievelijk de master- en de actuele planning).

Voor het bijhouden van maandelijkse update-reeksen — precies wat in claimdossiers de kern is — is dit een elegant model: één bestand bevat de complete revisiegeschiedenis. Dat is **beter geregeld dan in MS Project** (max. 11 baselines — `Baseline` plus `Baseline1`–`Baseline10` — en geen ingebouwde vergelijkingsviewer van dit kaliber).

**Herkomst van de "onbeperkt"-claim (herverifieerd 25-07-2026):** de leverancierspagina zelf zegt alleen *"Create storepoints to track revisions/updates"* en noemt geen aantal. Het woord **"unlimited"** komt van wederverkoper CDP Inc. ("baseline tracking with unlimited comparisons"). De claim is dus **plausibel maar niet leveranciersbevestigd**. De MS-Project-limiet van 11 kon in deze sessie niet met een ophaalbare Microsoft-bron worden onderbouwd (beide support-URL's gaven HTTP 404) en berust op algemeen bekende productkennis.

### 2.6 Risico en Monte Carlo

**Volledig afwezig.** Geen risicoregister, geen driepuntsschattingen, geen Monte-Carlosimulatie, geen risicokalibratie, geen P50/P80-doorlooptijden. Geen integratie met Primavera Risk Analysis, Safran Risk, Acumen Risk of @Risk aangetroffen.

Voor elke opdrachtgever die kwantitatieve schedule risk analysis (QSRA) eist — Britse en Australische infrastructuur, olie & gas, veel Europese aanbestedingen — is Phoenix hiermee **direct uitgesloten**.

### 2.7 4D en BIM

**Volledig afwezig.** Geen IFC-ondersteuning, geen 4D-koppeling, geen viewer, geen model-linking, geen integratie met Synchro, Navisworks, Bexel, Vico of vergelijkbaar. Zie §6 voor de uitgebreide analyse — dit is voor de opdrachtgever het meest relevante hoofdstuk.

### 2.8 Portfolio en multi-project

**Afwezig.** Er is geen EPS (enterprise project structure), geen portfolioweergave, geen resourcepool over projecten heen, geen programma-niveau. Eén bestand = één project. De architectuurkeuze ("no database servers") sluit portfoliofunctionaliteit per definitie uit.

Opvallend: Apps Run The World categoriseert Phoenix als "Project Portfolio Management". Dat is een **onjuiste categorisering** van de aggregator; het product doet aantoonbaar geen PPM.

### 2.9 Organisatie van de planning: activity codes in plaats van WBS

Phoenix organiseert schema's via **onbeperkte activity codes en waarden** (met hiërarchie: level 1, 2, 3, plus bijvoorbeeld onderaannemer-codes), niet via een formele WBS-boom zoals P6.

Dit is een **wezenlijk architectuurverschil** met P6 en MS Project, en het heeft twee gezichten:
- *Voordeel:* codes zijn multidimensionaal. Eén activiteit kan tegelijk op gebouw, verdieping, discipline, onderaannemer en fase gecodeerd zijn, en je kunt op elke as groeperen, filteren en kleuren. Voor bouwplanning is dat vaak praktischer dan één starre boom.
- *Nadeel:* bij XER-uitwisseling met P6 is de WBS-structuur een eersteklas concept dat in Phoenix geen exact equivalent heeft. Round-trip P6 → Phoenix → P6 draagt daarmee een reëel risico op structuurverlies. (**Niet direct getest; ingeschat op basis van het datamodel — markeren als analyse, niet als gemeten feit.**)

### 2.10 Weergaven, layouts en rapportage

- **Timescaled Network Diagram** — het paradepaardje. Een tijdgeschaald netwerkdiagram dat volgens de leverancier "een heel project met duizenden activiteiten op één afdruk" toont, waarbij activiteiten tot logische werkstromen worden geconsolideerd. Dit is Phoenix' meest gedifferentieerde visualisatie en het meest genoemde verkoopargument.
- **Bar chart / Gantt** — Plan Academy oordeelde dat Phoenix' tekening van relatielijnen "veel verfijnder" is dan die van P6. Voor logica-review is dat geen cosmetisch detail maar functioneel relevant.
- **Layouts** (v5): meerdere opgeslagen layouts per project, wisselbaar via tabbladen.
- **Filters** (v5): volledig herontworpen, met expressies en beslisbomen.
- **Custom bars, sightlines & nets** (v5): onbeperkte aangepaste balken en verticale hulplijnen/datumbereik-arceringen.
- Kolommen, rijhoogte, datumformaten, kleuren-per-code, ordinal timescale, direct celbewerken, fit-to-schaling.
- **Rapportage:** `TOOLS > REPORTS` met HTML-export (in Excel te openen); `TOOLS > EXPORT > Excel`.

De rapportagelaag is het zwakste onderdeel van de UI. De enige beschikbare gedetailleerde review verwoordt het onomwonden: *"Reports are clumsy and new print preview windows open behind other windows instead of in front."* (Capterra). Er is **geen rapportontwerper, geen dashboardlaag en geen geplande/geautomatiseerde rapportage**.

### 2.11 Schaalbaarheid — hoeveel activiteiten realistisch?

De leverancier publiceert **geen** activiteitenlimiet en geen benchmarks. Wat we wél weten:
- De enige gedetailleerde Capterra-review noemt als sterkte: *"Handles large complex construction projects"* met *"endless coding and layouts"*.
- De marketing spreekt van netwerkdiagrammen met "duizenden activiteiten" op één afdruk.
- De architectuur is single-file XML, volledig in het geheugen.

**Schatting (expliciet gemarkeerd als schatting, niet gemeten):** Phoenix is comfortabel tot **circa 3.000–5.000 activiteiten** per bestand. Tussen 5.000 en 10.000 verwacht ik merkbare vertraging bij herberekenen, filteren en netwerkdiagram-rendering. Boven **10.000 activiteiten** acht ik het product niet geschikt; boven 20.000 vrijwel zeker onwerkbaar. Ter vergelijking: P6 draait routinematig 100.000+ activiteiten in één database.

Deze schatting berust op de single-file-XML-architectuur, het ontbreken van een database-backend, de eenmansontwikkelcapaciteit, het feit dat v5.0 "performance boosts" als aparte releasehighlight noemt (wat impliceert dat performance een pijnpunt wás), en het klantprofiel (aannemers van $34–250 mln omzet). **Niet geverifieerd door eigen belastingtests.**

---

## 3. Prijzen

### 3.1 Wat er feitelijk publiek geprijsd is

| Item | Bedrag | Model | Bron | Datum geverifieerd |
|---|---|---|---|---|
| Phoenix 5 licentie | **$799 (USD) per licentie** | Model **niet op de pagina vermeld** — de webshop noemt alleen "$799 per license", zonder termijn en zonder de woorden "perpetual"/"one-time" | https://www.phoenixcpm.com/shop/purchase.php | 25-07-2026 (herverifieerd) |
| Phoenix 5 licentie via wederverkoper | **$799 per licentie**; "Need more than 6 licenses? Please contact us" | Model **niet vermeld** op de pagina | https://www.cdp-inc.com/products/software/purchase-phoenix-project-manager | 25-07-2026 (herverifieerd) |
| Capterra-vermelding | **"$799 Per Feature, One Time"** (letterlijke Capterra-tekst; "Per Feature" is een metadata-artefact van Capterra, niet een echte prijseenheid) | **Eenmalig** | https://www.capterra.com/p/199258/Phoenix-Project-Manager/ | 25-07-2026 (herverifieerd) |
| Solevant-vermelding | *"Offers a perpetual license with a one-time payment"* (geen bedrag genoemd; "Request a quote") | **Perpetual** | https://solevant.com/software/phoenix-project-manager | 25-07-2026 (herverifieerd) |
| Academische licentie | **$0 (gratis)**, 1 per student, `.edu`- of goedgekeurd schooldomein vereist; geen looptijdbeperking vermeld, wel intrekbaar bij verlies van studentstatus | Gratis | https://www.phoenixcpm.com/shop/academic.php | 25-07-2026 (herverifieerd) |
| Proefversie | **$0**, 30 dagen. Letterlijke tekst op de trialpagina: *"Printing is disabled in the trial version."* (de sterkere formulering "printing is the **only** feature that is disabled" staat daar niet — zie Verificatie) | Trial | https://www.phoenixcpm.com/free-trial/ | 25-07-2026 (herverifieerd) |
| Belasting | 6,85% Utah State Sales Tax wordt in de webshop toegepast (regio-afhankelijk berekend) | — | phoenixcpm.com/shop/purchase.php | 25-07-2026 (herverifieerd) |
| Bestelmaximum | *"Quantity must be between 1 and 999"* per order via de webshop | — | phoenixcpm.com/shop/purchase.php | 25-07-2026 (herverifieerd) |

### 3.2 Licentiemodel: perpetual, geen abonnement

**Er is geen abonnementsmodel aangetroffen.** De onderzoeksopdracht vroeg naar "perpetual + subscription"; het onderzoek wijst uit dat Phoenix Project Manager **uitsluitend perpetual** wordt verkocht. Maar de bewijskracht per bron is ongelijk, en dat is bij herverificatie op 25-07-2026 aangescherpt:

- **De eigen webshop en de wederverkoper noemen alleen een bedrag, geen model.** Beide pagina's zeggen "$799 per license" zonder de woorden "perpetual", "one-time", "per year" of "per month". Zij bewijzen dus *het bedrag*, niet *het licentiemodel*. De eerdere formulering "geverifieerd op drie onafhankelijke plaatsen" gold voor de **prijs**; voor het **model** leveren zij hooguit indirect bewijs (afwezigheid van een termijn).
- **Capterra** registreert het pricingmodel expliciet als **"One Time"** (letterlijk: "$799 Per Feature, One Time"). ⚠️ Capterra's overige metadata over dit product is bij herverificatie **aantoonbaar onbetrouwbaar**: de pagina noemt de deployment "web-based" met Android- en iPhone/iPad-apps en meldt "no free trial available" — alle drie in strijd met de leveranciersbronnen. De "One Time"-registratie is daarmee een zwakker bewijsstuk dan eerder aangenomen.
- **Solevant** is de enige bron die het model letterlijk benoemt: *"Offers a perpetual license with a one-time payment, which can be more cost-effective than subscription models."* Solevant noemt zelf géén bedrag ("Request a quote"), dus prijs en model komen uit verschillende bronnen.
- Nergens op de site of bij wederverkopers is een prijs per maand, per jaar, per gebruiker of "per seat/year" aangetroffen. De vindplaatsen waar zo'n prijs zou moeten staan (webshop, wederverkoperspagina, homepage) zijn alle drie gecontroleerd.

**Conclusie (bijgesteld):** $799 eenmalig per benoemde licentie is de best onderbouwde lezing, en er is **geen enkele aanwijzing voor een abonnement**. Maar het "perpetual"-etiket rust op één secundaire bron (Solevant) plus één onbetrouwbaar gebleken aggregator (Capterra), niet op een expliciete leveranciersuitspraak. De EULA-pagina waarmee dit definitief te sluiten zou zijn (`phoenixcpm.com/eula/`) gaf HTTP 404. **Zeer waarschijnlijk correct, niet leveranciersbevestigd.**

### 3.3 Wat er níét publiek geprijsd is (kanttekeningen)

| Item | Status | Toelichting |
|---|---|---|
| **Jaarlijks onderhoud/support** | **Niet publiek geprijsd, en niet aangetroffen als aparte post.** | Er staat geen maintenance-fee op de shop-, support- of prijspagina's. Ondersteuning verloopt via een supportformulier en een klantendashboard, zonder zichtbare betaalde tiers. Het lijkt erop dat er **geen verplicht jaarlijks onderhoudscontract** bestaat — passend bij een micro-ISV. **Kan niet met zekerheid worden uitgesloten dat er een niet-gepubliceerd supportcontract bestaat.** |
| **Upgrade Phoenix 4 → Phoenix 5** | **Prijs achter login.** | `https://www.phoenixcpm.com/shop/upgrade.php` geeft *"You must be logged in. Redirecting."* Er bestaat dus wel degelijk een **betaalde major-upgrade**; het bedrag is niet publiek. **Schatting: $199–$399 per licentie** — gebruikelijke 25–50% van de nieuwprijs bij dit type ISV. **Uitdrukkelijk een schatting, niet onderbouwd door een bron.** |
| **Volumekorting / enterprise-staffels** | **Op aanvraag.** | Bij >6 licenties verwijst CDP naar "contact us"; de eigen webshop accepteert tot 999 licenties per order zonder zichtbare staffel. Er is **geen gepubliceerde kortingsstructuur**. **Schatting: 10–25% korting bij tientallen seats**, gebaseerd op gangbare ISV-praktijk. **Schatting.** |
| **Minimale afname** | **Geen.** | Eén licentie is gewoon te kopen; geen minimum aangetroffen. |
| **Modules / add-ons** | **Bestaan niet.** | Phoenix wordt als één ongedeeld product verkocht. Geen risico-, EVM-, portfolio- of BIM-module. Alle functionaliteit zit in de $799. |
| **Training** | **Op aanvraag bij wederverkoper.** | CDP Inc. biedt implementatie, planningsdiensten en openbare/besloten trainingen; geen gepubliceerde tarieven. **Schatting: $500–$1.500 per deelnemer voor een meerdaagse openbare cursus** — gangbaar in de Amerikaanse markt. **Schatting.** |
| **Prijzen buiten de VS** | **Niet gepubliceerd.** | Geen EUR-, GBP- of andere valutaprijzen aangetroffen. Buitenlandse afnemers kopen in USD via de Amerikaanse webshop of via een lokale distributeur zonder gepubliceerde prijs. |

### 3.4 Prijsvergelijking in context (peildatum juli 2026)

| Product | Model | Indicatieve prijs |
|---|---|---|
| **Phoenix Project Manager** | **Perpetual, eenmalig** | **$799 eenmalig** (geverifieerd) |
| Oracle Primavera P6 Professional | Perpetual + verplicht jaarlijks onderhoud, of named-user cloud | Ordegrootte $2.500–$3.000 perpetual + ~22% onderhoud/jaar; cloud enkele honderden $/gebruiker/maand — **niet in dit onderzoek geverifieerd, contextueel** |
| Microsoft Project Plan 3 | Abonnement | Ordegrootte $30/gebruiker/maand — **contextueel, niet geverifieerd** |
| Elecosoft Asta Powerproject | Perpetual of abonnement | Op aanvraag — **contextueel** |

**Total cost of ownership over 5 jaar (analyse):** een enkele Phoenix-planner kost $799 plus mogelijk één upgrade. Een P6-planner kost in dezelfde periode al snel een veelvoud. **Bij deze functionele scope is Phoenix bijna zeker het goedkoopste serieuze CPM-gereedschap in de Amerikaanse markt.** Dat is de kern van zijn bestaansrecht.

---

## 4. VOORDELEN

**1. Radicaal gunstige prijs-kwaliteitverhouding — $799 eenmalig, geen abonnement aangetroffen, geen onderhoudscontract aangetroffen.**
Het **bedrag** is geverifieerd bij twee onafhankelijke verkoopkanalen (eigen webshop en CDP Inc.) plus Capterra; het **licentiemodel** (perpetual) staat alleen bij Capterra en Solevant, niet bij de leverancier zelf (§3.2). "Geen onderhoudscontract" is bovendien *afwezigheid van bewijs*, geen bewijs van afwezigheid — geen publieke pagina noemt zo'n fee, maar de EULA was niet ophaalbaar. Voor een product met een echte CPM-engine (longest path, vier relatietypen, retained logic, multi-kalender, onbeperkte baselines) is dit uitzonderlijk. De enige Capterra-review scoort **"Value for money" 5,0/5,0** — de hoogste deelscore van die review. Over vijf jaar is de TCO een fractie van P6.

**2. Geen IT-infrastructuur, nul deploymentkosten.**
*"NONE! Phoenix uses a custom XML file type that saves all of your data in a single file"* (FAQ). Geen databaseserver, geen licentieserver, geen DBA, geen migratieproject. Voor een aannemer met 50 medewerkers en geen IT-afdeling is dit het verschil tussen "vandaag beginnen" en "een implementatietraject van drie maanden". De leverancier verkoopt dit terecht als *"lowering cost to acquire, deploy, and maintain"*.

**3. Volwaardige, niet-afgeknepen CPM-kern.**
De rekenkern doet wat een professionele planner nodig heeft: kritiek pad via **Total Float óf Longest Path** (pariteit met P6, en beter dan MS Project), alle vier relatietypen met lag, Retained Logic bij out-of-sequence-voortgang, zes constrainttypen, hammocks, milestones, free én total float. Plan Academy oordeelt: *"a solid CPM scheduling engine"* dat "de meeste kernfuncties van P6" doet. Dit is geen speelgoed.

**4. Storepoints: onbeperkte baselines in één bestand, met visuele verschilanalyse.**
Onbeperkt aantal opgeslagen revisies binnen het projectbestand, te vergelijken via `SCHEDULE > COMPARE STOREPOINTS`, plus change highlighting met geanimeerde balkovergangen (v5). Vergelijk MS Project: maximaal 11 baselines en geen vergelijkbare viewer. Voor maandelijkse update-cycli en voor het reconstrueren van "wat is er tussen revisie 7 en 8 veranderd" is dit een sterk, praktisch ontworpen mechanisme.

**5. Native macOS-ondersteuning — een echte marktleemte.**
Phoenix levert een DMG-installer en behandelt Mac als volwaardig platform (v5.6.3.0 en v4.8.17.0 staan beide als Windows- én Mac-installer op de downloadpagina; herverifieerd 25-07-2026). **Primavera P6 *Professional* heeft geen native Mac-versie.** Voor architecten-, ingenieurs- en designbureaus die op Mac werken is Phoenix een van de zeer weinige serieuze CPM-desktopopties zonder Parallels/VM. Plan Academy noemt Mac-ondersteuning expliciet als differentiator. **Nuance:** P6 EPPM's webclient draait wél in een Mac-browser, dus het voordeel geldt tegenover de desktopclient, niet tegenover het hele P6-product (§2.1).

**6. Sterke, gedifferentieerde visualisatie — met name het Timescaled Network Diagram.**
Het tijdgeschaalde netwerkdiagram consolideert activiteiten tot logische werkstromen en toont grote projecten op één afdruk. Daarnaast oordeelde Plan Academy dat Phoenix' relatielijnen in de Gantt *"veel verfijnder"* getekend worden dan die van P6 — voor logica-review is dat functioneel, niet cosmetisch. De v5-toevoegingen (layouts met tabs, expressie-filters, custom bars, sightlines & nets, kleuren-per-code) maken het presenteren van dezelfde planning aan verschillende doelgroepen echt makkelijk.

**7. Ingebouwde CPM Checker — kwaliteitsborging zonder extra tool.**
Signaleert logicafouten en planningsproblemen voordat ze het project raken. Bij P6 koop je hiervoor een aparte tool (Acumen Fuse, Schedule Analyzer, Steelray); bij Phoenix zit het in de $799. Voor teams zonder senior planningsreviewer verhoogt dit de schemakwaliteit meetbaar.

**8. Vriendelijke migratiepositie vanuit de P3/SureTrak-generatie.**
Import van SureTrak- en P3 Project Groups staat nog altijd in de featurelijst. Voor de aanzienlijke Amerikaanse groep die na Oracle's uitfasering van P3/SureTrak vastzat, is Phoenix bewust de zachte landing — vertrouwde werkwijze, oude bestanden lezen, geen enterprise-prijskaartje.

**9. USACE SDEF-export — federale contractcompliance ingebouwd.**
SDEF is verplicht in veel contracten van de US Army Corps of Engineers. Phoenix exporteert het standaard. Voor Amerikaanse federale bouwaannemers is dit een concrete vinkje-op-de-eisenlijst dat de meeste goedkope planningstools níét afvinken.

**10. Gratis academische licenties en een niet-verminkte proefversie.**
Volledig gratis voor studenten met een `.edu`- of goedgekeurd schooldomein (één per student; geen looptijdbeperking vermeld, wel intrekbaar bij verlies van studentstatus). En de trial: **30 dagen**, met op de trialpagina letterlijk *"Printing is disabled in the trial version."* — er is geen andere beperking vermeld. *(Correctie 25-07-2026: de eerder geciteerde formulering "printing is the **only** feature that is disabled" staat niet op de trialpagina; dat het de enige beperking is, is een redelijke maar niet-geciteerde gevolgtrekking.)* Dat is een zeldzaam ruime trial en het bouwt aan een instroom van planners die het product al kennen.

---

## 5. NADELEN

**1. Geen resource leveling — officieel bevestigd.**
*"Can I level resources in Phoenix?" → "No. At this time Phoenix does not have a resource leveling feature."* (eigen FAQ). Je kunt overbezetting zíén in het histogram, maar de software lost het niet op. Voor resource-gedreven planning (prefab, gespecialiseerde ploegen, kraanbeschikbaarheid) betekent dit handmatig schuiven. P6, MS Project, Asta en zelfs veel goedkope tools kunnen dit wél.

**2. Resources kunnen niet geïmporteerd of geëxporteerd worden — "coming soon" sinds jaren.**
*"Can I import or export resources?" → "Not yet… but it's coming soon!"* (eigen FAQ). Dit is voor een uitwisselingsscenario **fataal**: een schema dat je naar P6 exporteert komt aan zónder resourcetoewijzingen. Voor resource- of kostengeladen planningen is Phoenix daarmee een **eenrichtings-eindstation**. Dat de formulering "coming soon" is en de FAQ nog naar Phoenix 4 verwees terwijl Phoenix 5 al uit is, suggereert dat deze belofte **al lange tijd onvervuld** is — een reëel signaal over ontwikkeltempo.

**3. Uitsluitend dagplanning — geen uren.**
*"No. At this time Phoenix only schedules in days."* (eigen FAQ). Harde diskwalificatie voor shutdowns, turnarounds, buitendienststellingen, inbedrijfstelling, offshore-vensters en elke gefaseerde uitvoering met uur-precisie. Ook voor Nederlandse/Europese infra-praktijk (nachtelijke treinvrije periodes, weekendvensters) is dit een showstopper.

**4. Geen risicoanalyse, geen Monte Carlo, geen QSRA.**
Volledig afwezig: geen driepuntsschattingen, geen simulatie, geen P50/P80, geen risicoregister, geen koppeling met externe risicotools. Elke opdrachtgever die kwantitatieve schedule risk analysis eist — Brits en Australisch infra, olie & gas, veel Europese aanbestedingen, grote PPS-projecten — sluit Phoenix hiermee direct uit.

**5. Geen 4D/BIM, geen IFC, geen enkele modelkoppeling.**
Geen IFC-import/-export, geen IfcWorkSchedule/IfcTask, geen viewer, geen model-linking, geen koppeling met Synchro/Navisworks/Bexel/Vico. In een markt die richting modelgebaseerde uitvoering beweegt, staat Phoenix volledig buiten het BIM-ecosysteem. Zie §6.

**6. Geen API, geen integraties, geen automatisering.**
Er is geen publieke API, geen SDK, geen webhooks, geen commandline-interface, geen plugin-model aangetroffen. Outbuild vat het samen als *"no direct integrations with major construction platforms"*. Alles verloopt via handmatige bestandsimport/-export. Voor organisaties die planning willen koppelen aan ERP, kostenbewaking, voortgangsregistratie of BI-dashboards is dat een dood spoor.

**7. Bevestigde stabiliteits- en bruikbaarheidsklachten, met name op macOS.**
De enige gedetailleerde publieke review (Capterra, 25-07-2026 geraadpleegd) scoort **ease of use 2,0/5,0** en meldt: *"The Mac version frequently crashes"* en *"Reports are clumsy and new print preview windows open behind other windows instead of in front."* Dat de macOS-versie tegelijk een belangrijk verkoopargument (voordeel 5) én het onderwerp van de enige gedocumenteerde stabiliteitsklacht is, is een serieus signaal. **Kanttekening: N=1** — één review is geen statistiek (herverifieerd 25-07-2026: nog steeds precies één review, totaalscore 4,0/5). Maar het is wél de enige diepgaande gebruikersgetuigenis die publiek bestaat.

**⚠️ Extra kanttekening bij Capterra als bron (herverificatie 25-07-2026).** Diezelfde Capterra-pagina bevat aantoonbaar onjuiste productmetadata: zij noemt de deployment "web-based" met **Android- en iPhone/iPad-apps** en meldt dat er **geen gratis proefversie** is. Alle drie zijn in strijd met de leveranciersbronnen (desktop-only; 30-daagse trial op phoenixcpm.com/free-trial/). Capterra's *review-inhoud* blijft bruikbaar, maar Capterra's *feitenvelden* over dit product — inclusief het pricingveld "One Time" waarop §3.2 leunt — zijn niet als betrouwbare verificatie te beschouwen.

**8. Vrijwel geen publieke gebruikersfeedback, community of ecosysteem.**
Capterra: één review. G2: productpagina zonder substantiële beoordelingen. TrustRadius, Gartner Peer Insights: geen bruikbaar profiel. Geen actief gebruikersforum, geen zichtbare Planning-Planet-discussie, nauwelijks Reddit-vermeldingen (één positieve terzijde in r/Construction: "gebruiksvriendelijker en rechttoe rechtaan dan MS Project"). Voor een koper betekent dit: **je kunt de aanschaf niet valideren bij peers**, er is geen kennisbank van derden, geen boekenplank, geen YouTube-ecosysteem, en de arbeidsmarkt kent het product niet.

**9. Leverancierrisico: micro-ISV van 2–10 mensen met één product.**
Phoenix Project Management Systems bestaat sinds 2005 — dat is continuïteitsbewijs. Maar met 2–10 medewerkers, één oprichter-gedreven product en geen concernverband is er een reëel **key-person- en bedrijfscontinuïteitsrisico**. Er is geen escrow-regeling, geen open-source-fallback en geen tweede leverancier aangetroffen. Bij bedrijfsbeëindiging houd je een gesloten XML-bestandsformaat over dat niemand anders leest.

**10. Geen cloud, geen web, geen mobiel, geen samenwerking.**
Solevant: *"No cloud-based or web browser version available"*, *"lacks a native mobile application"*. Outbuild: *"desktop-based and lacks a connected lookahead"*, geen iPad-app voor de bouwplaats, geen Lean/Last-Planner-workflow. Planera: *"schedules often remain siloed within the planning team"*. Eén bestand, één gebruiker tegelijk — samenwerken betekent bestanden mailen en handmatig samenvoegen. In 2026 is dat een structurele achterstand op vrijwel de hele markt.

**11. Geen WBS-hiërarchie zoals P6 en MS Project die kennen.**
Phoenix organiseert via activity codes (level 1/2/3 plus vrije codes), niet via een formele WBS-boom. Praktisch vaak prettiger, maar het maakt uitwisseling met P6 structureel lastiger en het botst met contracteisen die een genummerde WBS voorschrijven. **Analytisch afgeleid uit het datamodel, niet gemeten.**

**12. Geen portfolio, geen multi-project, geen enterprise-laag.**
Eén bestand = één project. Geen EPS, geen resourcepool over projecten, geen programmaniveau, geen rollenmodel of rechtenbeheer. Zodra een organisatie planning centraal wil sturen, groeit ze het product uit. Dit is een bewuste architectuurkeuze, geen bug — maar het begrenst de klant tot een bepaalde omvang.

**13. Zwakke rapportagelaag.**
`TOOLS > REPORTS` met HTML-export en Excel-export, en verder niets: geen rapportontwerper, geen dashboards, geen geplande of geautomatiseerde rapportage, geen PDF-batch. De enige review noemt de rapportage expliciet "clumsy". Voor organisaties met contractueel voorgeschreven rapportagesjablonen is dit handwerk.

**14. Rommelige, deels verouderde publieke documentatie en online aanwezigheid.**
De supportpagina verwees tijdens dit onderzoek nog naar "Phoenix 4" als huidige versie terwijl Phoenix 5.6.3.0 de actuele release is; een Britse distributeur adverteert nog systeemeisen uit het Windows-XP/PowerPC-tijdperk; er zijn geen publieke releasenotes met datums; en er is geen gepubliceerde roadmap. Bovendien circuleert er over Phoenix aantoonbaar onjuiste informatie op vergelijkingssites (zie §0). Een koper kan zich moeilijk een betrouwbaar beeld vormen zonder de leverancier te bellen.

---

## 6. Interoperabiliteit — het hoofdstuk dat er voor deze opdrachtgever toe doet

### 6.1 Ondersteunde formaten (officieel feature-overzicht, phoenixcpm.com/about/, 25-07-2026)

| Formaat | Import | Export | Opmerking |
|---|:--:|:--:|---|
| **Primavera P6 XER** | ✅ | ✅ | Het belangrijkste uitwisselingskanaal. Bidirectioneel. |
| **Primavera P6 XML (PMXML)** | ❓ | ❓ | **Niet expliciet genoemd.** De featurelijst noemt "P6 XER files"; "XML" staat alleen in combinatie met MS Project ("Project MPX and XML"). PMXML-ondersteuning is dus **onbevestigd en waarschijnlijk afwezig.** |
| **Primavera P3 (Project Groups)** | ✅ | ❌ | Legacy-migratiepad. |
| **Primavera SureTrak** | ✅ | ❌ | Legacy-migratiepad. |
| **Microsoft Project MPX** | ✅ | ✅ | **Bevestigd bidirectioneel** — letterlijk: *"Import and Export to Project MPX and XML"* (about-pagina, herverifieerd 25-07-2026). Het eerdere voorbehoud "(waarschijnlijk)" is vervallen. MPX blijft een verouderd tekstformaat dat MS Project sinds 2010 niet meer schrijft. |
| **Microsoft Project XML (MSPDI)** | ✅ | ✅ | **Bevestigd bidirectioneel** (zelfde bronzin). Het bruikbare MS-Project-kanaal. |
| **Microsoft Project MPP** | ❌ | ❌ | **Het native MPP-binaireformaat wordt niet ondersteund.** Gebruiker moet in MS Project eerst naar XML opslaan. |
| **Excel XLS / XLSX** | ✅ | ✅ | Excel-import is een v5-nieuwigheid. |
| **CSV** | ✅ | ✅ | `TOOLS > IMPORT > CSV` / `TOOLS > EXPORT`. |
| **USACE SDEF** | ❌ | ✅ | **Alleen export.** Amerikaanse federale contractstandaard. |
| **HTML** | ❌ | ✅ | Rapporten, in Excel te openen. |
| **Phoenix eigen formaat** | ✅ | ✅ | **Ongedocumenteerd, propriëtair XML-schema, één bestand per project.** |
| **IFC 4.3 (IfcWorkSchedule / IfcTask)** | ❌ | ❌ | **Volledig afwezig.** |
| **API / REST / SDK / CLI** | ❌ | ❌ | **Bestaat niet.** |
| **Databasekoppeling (ODBC/SQL)** | ❌ | ❌ | Er ís geen database. |

### 6.2 De harde beperkingen van de uitwisseling

**(a) Resources reizen niet mee.** Dit is de belangrijkste en meest onderschatte beperking. De eigen FAQ: *"Can I import or export resources?" → "Not yet… but it's coming soon!"* Elke XER die Phoenix uitschrijft is dus **resourceloos**. Een P6-gebruiker die zo'n XER inleest, krijgt de logica en de data, maar niet de bemanning, niet de kosten, niet de toewijzingen. Voor round-trip-scenario's tussen hoofdaannemer en onderaannemer is dat een structureel datalek.

**(b) Geen MPP.** Het formaat dat de meeste opdrachtgevers daadwerkelijk mailen (`.mpp`) kan Phoenix niet lezen. Er zit altijd een handmatige conversiestap in MS Project tussen.

**(c) SDEF is eenrichtingsverkeer.** Wel exporteren (voor USACE-compliance), niet importeren.

**(d) WBS-mismatch.** Phoenix' activity-code-model heeft geen 1-op-1-equivalent voor P6's WBS-boom. Structuurverlies bij round-trip is aannemelijk. **Analyse, niet gemeten.**

**(e) Gesloten native formaat.** Het "custom XML file type" is niet gedocumenteerd, niet gestandaardiseerd en heeft geen publieke schemadefinitie. Het feit dát het XML is maakt reverse engineering theoretisch mogelijk — een genuanceerd verschil met een binair formaat — maar er is geen leveranciersondersteuning voor.

### 6.3 IFC 4.3 — de conclusie voor de opdrachtgever

**Phoenix Project Manager ondersteunt IFC in geen enkele vorm.** Geen IFC-import, geen IFC-export, geen `IfcWorkSchedule`, geen `IfcTask`, geen `IfcTaskTime`, geen `IfcWorkCalendar`, geen `IfcRelSequence`, geen koppeling naar een IFC-model, geen 4D-viewer, geen enkele buildingSMART-conformiteit. Het woord IFC komt in de volledige productdocumentatie niet voor.

**Wat dit betekent voor een open-source, IFC-gebaseerde planner:**

1. **Phoenix is geen concurrent op het open-standaardenvlak — het is een illustratie van het probleem.** Een aannemer die vandaag Phoenix gebruikt, heeft zijn planningsdata opgesloten in een ongedocumenteerd propriëtair XML-formaat bij een leverancier met 2–10 medewerkers. Dat is precies de lock-in die een IFC-native planner adresseert.

2. **De realistische integratieroute is XER, niet IFC.** Wil een open planner Phoenix-gebruikers bedienen, dan is **P6 XER lezen én schrijven** de enige praktische brug — Phoenix' beste uitwisselingskanaal. XER is een de-facto-standaard, geen open standaard, maar het is waar de markt zit. Aanvullend: CSV en MSPDI-XML.

3. **Er ligt een concrete, aantoonbare functionele leemte om in te vullen.** Een IFC-native planner die wél doet wat Phoenix niet doet — IFC 4.3-round-trip, resource-uitwisseling die niet halverwege sneuvelt, urenplanning, een gedocumenteerd open bestandsformaat — heeft tegenover deze categorie gebruikers een helder verhaal. En omgekeerd: Phoenix laat zien welke functies je *niet* per se nodig hebt om een levensvatbaar CPM-product te zijn (portfolio, cloud, Monte Carlo).

4. **Les uit Phoenix' architectuur.** Het "één bestand, geen database, geen server"-model is duidelijk een groot deel van Phoenix' aantrekkingskracht: het verlaagt de drempel tot bijna nul. Voor een open-source desktopplanner met IFC als native formaat is dat een direct bruikbaar precedent — met als verschil dat het bestandsformaat dan een **open, gedocumenteerde standaard** is in plaats van een gesloten XML-dialect.

5. **Het Storepoints-concept is het overwegen waard.** Onbeperkte, in-bestand opgeslagen revisies met visuele verschilanalyse is een elegant model dat MS Project (max. 11 baselines) en veel andere tools niet zo goed hebben opgelost. In IFC-termen zou dat neerkomen op meerdere `IfcWorkSchedule`-instanties (baseline/actual/planned) binnen één bestand — wat IFC 4.3 via `PredefinedType` op `IfcWorkSchedule` daadwerkelijk toestaat.

---

## 7. Marktpositie

### 7.1 Waar Phoenix sterk staat, en waarom

**Segment:** kleine tot middelgrote **Amerikaanse** bouwbedrijven ($10–300 mln omzet) met contractuele CPM-verplichtingen en zonder planningsafdeling. Dat is een reëel, groot en chronisch onderbediend segment: te veeleisend voor MS Project, te klein voor P6.

**Waarom het daar wint:**
1. **Prijs.** $799 eenmalig tegenover duizenden dollars plus jaarlijks onderhoud.
2. **Nul implementatiedrempel.** Geen server, geen IT, geen project.
3. **Echte CPM.** Longest path, retained logic, vier relatietypen — niet de afgezwakte semantiek van MS Project.
4. **P3/SureTrak-erfenis.** De zachte landing voor de generatie planners die Oracle liet vallen.
5. **SDEF.** Federale compliance voor een fractie van de prijs.
6. **macOS.** Een leemte die P6 gewoon niet vult.

### 7.2 Belangrijkste concurrenten

| Concurrent | Verhouding tot Phoenix |
|---|---|
| **Oracle Primavera P6** | De referentie waartegen Phoenix zich definieert. P6 wint op schaal, portfolio, resources, enterprise en marktacceptatie; Phoenix wint op prijs, eenvoud, deploymentgemak en Mac. |
| **Microsoft Project** | Directe prijsconcurrent. Phoenix wint op CPM-diepgang, netwerkdiagram en bouwsemantiek; MS Project wint op alomtegenwoordigheid, ecosysteem, resource leveling en integratie met Microsoft 365. |
| **Elecosoft Asta Powerproject** | De sterkste functionele concurrent, en in Europa/VK dominant waar Phoenix afwezig is. Asta biedt méér (4D/BIM-module, resource leveling, risico) tegen een hogere prijs. |
| **Deltek Open Plan / Acumen** | Enterprise/EVM-segment; nauwelijks overlap. |
| **Planera, Outbuild, Touchplan, ALICE** | Nieuwe cloud/Lean/AI-generatie. Zij vallen Phoenix expliciet aan op precies de punten waar het zwak is: samenwerking, mobiel, lookahead, integraties. Twee van hen publiceren vergelijkingspagina's tégen Phoenix — een indicatie dat ze het als verdringbare installed base zien. |
| **Procore, Fieldwire** | Door G2 als "top alternatives" genoemd, maar dat is een categoriefout: dat zijn bouwmanagementplatforms, geen CPM-tools. |

### 7.3 Trend: stabiel tot langzaam krimpend (analyse, met onderbouwing)

**Argumenten vóór stabiliteit:**
- Twintig jaar onafgebroken bestaan (2005–2026) met een actueel product (v5.6.3.0).
- Phoenix 5 is een substantiële release (layouts, expressie-filters, custom bars, Excel-import, performance).
- De prijs-/eenvoudpropositie is structureel en niet makkelijk te kopiëren door enterprise-leveranciers.
- Perpetual licentiëring is in een abonnementsmarkt juist weer onderscheidend.

**Argumenten vóór krimp:**
- **Vrijwel geen digitale voetafdruk:** één Capterra-review, geen G2-beoordelingen, geen forumactiviteit, geen recente persberichten of releasenotes met datum.
- **Beloofde functies blijven liggen:** resource-import/-export is al lang "coming soon".
- **Documentatie loopt achter** op de eigen releases (supportpagina verwees nog naar Phoenix 4).
- **Structurele achterstand op de markttrend:** geen cloud, geen mobiel, geen samenwerking, geen API, geen BIM, geen AI — terwijl de hele bouwtechnologiemarkt precies daarheen beweegt.
- **Actieve verdringing** door cloud/Lean-aanbieders die Phoenix in vergelijkingspagina's als verouderd wegzetten.
- **Micro-organisatie:** 2–10 mensen kunnen niet gelijktijdig een cloudplatform, een mobiele app, een API en BIM-integratie bouwen.

**Oordeel: stabiel-krimpend.** Phoenix verliest geen bestaande klanten snel — perpetual licenties en een werkend product houden gebruikers vast — maar wint vermoedelijk weinig nieuwe. Het is een gezond nicheproduct in een krimpende niche. **Analyse op basis van indicatoren; geen omzet- of installed-base-cijfers beschikbaar.**

### 7.4 Klanten en verplichtstellingen

**Bekende klanten** (Apps Run The World, kleine steekproef): Del Amo Construction, Centric Projects, Peinado Construction — alle Amerikaanse aannemers in de $34–250 mln-klasse. Elders werd een casus met Scott-Long Construction genoemd (multimiljoen-dollar commerciële bouw). **Geen enkele grote enterprise-klant, geen overheidsinstantie en geen internationale klant geïdentificeerd.**

**Verplichtstellingen:** Phoenix wordt nergens voorgeschreven. Omgekeerd geldt wel dat Phoenix voldoet aan de **USACE SDEF-eis** die in Amerikaanse federale bouwcontracten wél verplicht is — Phoenix is dus een goedkope manier om aan een verplichting van een ánder te voldoen. Dat is zijn positie: nooit de norm, wel de betaalbare weg ernaartoe.

### 7.5 Over de claim "sterk bij claims en forensische planning"

Deze veronderstelling uit de onderzoeksopdracht moet worden **bijgesteld**.

**Wat Phoenix wél biedt dat in claimwerk bruikbaar is:**
- **Retained Logic** — expliciet ondersteund en gepromoot; essentieel bij het analyseren van out-of-sequence-uitvoering.
- **Onbeperkte Storepoints met verschilvisualisatie** — de revisiereeks (as-planned, updates, as-built) in één bestand, met change highlighting. Voor windows-analyse en time-impact-analyse is dat werkbaar materiaal.
- **XER-import** — het openen en narekenen van P6-schema's van een tegenpartij, tegen $799 in plaats van een P6-licentie. **Dit is waarschijnlijk de echte kern van Phoenix' reputatie in claimkringen: het is de goedkoopste manier om iemand anders' P6-planning te lezen en te controleren.**
- **CPM Checker** — snelle logica-kwaliteitscontrole van een aangeleverd schema.
- **Sterke netwerkdiagram- en relatievisualisatie** — bruikbaar bewijsmateriaal voor rapportages en zittingen.

**Wat Phoenix níét biedt en wat forensisch planners wél nodig hebben:**
- Geen geautomatiseerde schemavergelijking op claim-niveau (geen equivalent van Oracle Claim Digger).
- Geen DCMA-14-/metriekanalyse zoals Acumen Fuse of Schedule Analyzer.
- Geen Monte Carlo voor kwantificering van vertragingsrisico.
- **Geen resource- en kostenimport** — bij verstoringsclaims (disruption, loss of productivity) is dat precies de data die je nodig hebt.
- Geen audit trail, geen gebruikersadministratie, geen wijzigingslog buiten de Storepoints om — bewijskracht in een juridische context is daarmee beperkt.
- Geen dagelijkse/uurlijkse granulariteit.

**Conclusie:** Phoenix is een **betaalbaar hulpmiddel bij** claimwerk — vooral als goedkope XER-lezer en revisievergelijker — maar het is **geen forensisch analyseplatform**. Wie forensische planning als kernactiviteit heeft, gebruikt P6 plus gespecialiseerde tooling en houdt Phoenix hooguit als tweede werkbank. De onderzoeksaanwijzing overschatte dit punt; het is een reëel maar bescheiden sterktepunt, geen kernpositionering.

---

## 8. Samenvattende beoordelingsmatrix

| Criterium | Score | Toelichting |
|---|:--:|---|
| CPM-engine (kwaliteit) | 8/10 | Longest path, retained logic, 4 relatietypen, 6 constraints. Alleen dagen. |
| Kalenders | 7/10 | Multi-kalender, custom werkweken, feestdagen. Geen uren. |
| Resources | 3/10 | Toewijzen en visualiseren wel; leveling niet; import/export niet. |
| Kosten | 4/10 | Vaste kosten per activiteit, resourcekosten. Geen EVM. |
| Baselines | 9/10 | Storepoints: onbeperkt, in-bestand, visuele diff. Beter dan MS Project. |
| Risico / Monte Carlo | 0/10 | Volledig afwezig. |
| 4D / BIM / IFC | 0/10 | Volledig afwezig. |
| Portfolio / multi-project | 1/10 | Eén bestand, één project. |
| Rapportage | 3/10 | HTML/Excel-export, geen ontwerper, "clumsy". |
| Visualisatie | 8/10 | Timescaled network diagram, verfijnde relatielijnen, layouts, custom bars. |
| Schaalbaarheid | 4/10 | *Schatting:* comfortabel tot ~3.000–5.000 activiteiten. |
| Interoperabiliteit | 4/10 | XER bidirectioneel is sterk; geen resources, geen MPP, geen PMXML, geen IFC, geen API. |
| Prijs-kwaliteit | 10/10 | $799 eenmalig voor deze CPM-kern is uitzonderlijk. |
| Implementatiegemak | 10/10 | Geen server, geen database, geen IT. |
| Samenwerking / cloud / mobiel | 0/10 | Bestaat niet. |
| Leverancierstabiliteit | 4/10 | 20 jaar bestaan, maar 2–10 fte, één product, geen escrow. |
| Community / ecosysteem | 1/10 | Nagenoeg afwezig. |

---

## 9. Eindoordeel

### Voor wie is Phoenix Project Manager de juiste keuze?

**Uitstekend geschikt voor:**

1. **Amerikaanse bouwbedrijven van $10–300 mln omzet** met contractuele CPM-verplichtingen, één tot vijf planners en geen IT-afdeling. Dit is het doelsegment en Phoenix bedient het beter dan wat dan ook in zijn prijsklasse.
2. **Aannemers op USACE-, federale en publieke projecten** die SDEF moeten leveren en geen P6-budget hebben. De $799 verdient zich terug bij het eerste contract.
3. **Mac-gebruikende architecten-, ingenieurs- en designbureaus** die echte CPM nodig hebben. P6 is voor hen simpelweg geen optie zonder virtualisatie.
4. **Claim- en schema-reviewconsultants als goedkope tweede werkbank** — voor het lezen, narekenen en visualiseren van P6-schema's van tegenpartijen, en voor revisievergelijking via Storepoints. **Niet** als forensisch hoofdplatform.
5. **Onderwijs.** Gratis academische licenties met een volwaardig CPM-model maken het een prima leeromgeving voor CPM-onderwijs.
6. **P3/SureTrak-nabestaanden** die hun oude bestanden en werkwijze willen behouden zonder naar P6 te migreren.

**Redelijk geschikt, met open ogen:**

7. Onderaannemers die een fragment-planning moeten leveren aan een hoofdaannemer die in P6 werkt — mits duidelijk is dat **resources niet meereizen** in de XER.

### Voor wie is het níét de juiste keuze?

1. **Iedereen die uren nodig heeft.** Shutdowns, turnarounds, buitendienststellingen, inbedrijfstelling, offshore-vensters, nachtelijke infra-vensters — geen discussie: uitgesloten.
2. **Iedereen die resource leveling of resource-uitwisseling nodig heeft.** Officieel niet aanwezig respectievelijk officieel "coming soon".
3. **Iedereen die kwantitatieve risicoanalyse moet leveren.** Britse en Australische infra, olie & gas, grote PPS- en EU-aanbestedingen: uitgesloten.
4. **Iedereen die met BIM/IFC werkt.** Nul ondersteuning. Voor modelgebaseerde uitvoering staat Phoenix volledig buiten het speelveld.
5. **Organisaties die portfolio, programma of centrale planningsregie willen.** De architectuur sluit dit per definitie uit.
6. **Organisaties die planning willen integreren met ERP, kostenbewaking, voortgangsregistratie of BI.** Geen API, geen integraties.
7. **Teams die willen samenwerken, vanaf de bouwplaats willen bijwerken, of Lean/Last-Planner-workflows draaien.** Geen cloud, geen mobiel, geen concurrency.
8. **Europese, Britse, Midden-Oosterse en Aziatische organisaties in het algemeen.** Geen lokalisatie, geen lokale valuta, geen lokale support, geen regionale standaarden (alleen SDEF), nauwelijks aanwezigheid. In Nederland en België is Phoenix praktisch onbekend en is Asta Powerproject, P6 of MS Project de realistische keuze.
9. **Organisaties met strenge leverancierscontinuïteitseisen.** Een 2–10-persoonsbedrijf met een gesloten bestandsformaat en zonder escrow zal veel inkoop- en risicoafdelingen niet passeren.
10. **Zeer grote schema's.** *Schatting:* boven ~10.000 activiteiten niet geschikt.

### Slotsom

Phoenix Project Manager is een **eerlijk, scherp afgebakend en verrassend competent nicheproduct**. Het doet één ding — CPM-planning voor bouwprojecten op een enkele desktop — en doet dat voor $799 eenmalig beter dan alles wat in die prijsklasse bestaat. De CPM-kern is serieus, het Storepoints-baselinemechanisme is beter doordacht dan dat van veel duurdere producten, en de "geen server, geen IT"-architectuur verlaagt de drempel tot bijna nul.

Maar het is ook een product dat **op vrijwel elke as waarlangs de markt zich sinds 2015 heeft ontwikkeld stilstaat**: geen cloud, geen mobiel, geen samenwerking, geen API, geen BIM/IFC, geen risicoanalyse, geen resource-optimalisatie, geen urenplanning. En het wordt gebouwd door een handvol mensen die dat achterstallige onderhoud realistisch niet kunnen inhalen.

**Voor de opdrachtgever van dit onderzoek — een open-source, IFC-gebaseerde planner — is de conclusie tweeledig.**

*Als concurrent* is Phoenix nauwelijks relevant: het opereert in een Amerikaanse niche zonder IFC, zonder open standaarden en zonder ambitie in die richting.

*Als leerobject* is het waardevol, en op drie punten concreet:
- **Het bevestigt de bestaansreden.** Duizenden aannemers hebben hun planningsdata opgesloten in een ongedocumenteerd propriëtair formaat bij een micro-ISV, omdat de open respectievelijk betaalbare alternatieven ontbraken. Dat is precies het lock-inprobleem dat een IFC-native, open-source planner oplost.
- **Het valideert de architectuurkeuze.** "Eén bestand, geen database, geen server, draait op Windows én Mac" is aantoonbaar een winnende propositie in dit segment — Open Planner Studio's Tauri-desktopmodel met IFC als native single-file-formaat is daar de open-standaarden-variant van.
- **Het wijst de integratieroute aan.** Wil je Phoenix-gebruikers ooit bedienen, dan is dat via **P6 XER**, niet via IFC. En wil je ze iets bieden dat Phoenix niet kan, dan zijn de vier meest tastbare punten: **IFC 4.3-round-trip, resource-uitwisseling die niet sneuvelt, urenplanning, en een open gedocumenteerd bestandsformaat.**

---

## 10. Bronnenlijst

Alle bronnen geraadpleegd op **25 juli 2026**.

### Primaire leveranciersbronnen
1. Phoenix Project Manager — homepage. https://www.phoenixcpm.com/
2. Phoenix Project Manager — About / volledig feature-overzicht + "What's New in v5.0". https://www.phoenixcpm.com/about/
3. Phoenix Project Manager — Support, inclusief volledige FAQ (17 vragen). https://www.phoenixcpm.com/support/
4. Phoenix Project Manager — Purchase / webshop ($799 per licentie, 1–999, Utah sales tax). https://www.phoenixcpm.com/shop/purchase.php
5. Phoenix Project Manager — Academische licentie (gratis, schoolmailadres vereist). https://www.phoenixcpm.com/shop/academic.php
6. Phoenix Project Manager — Free trial (30 dagen, alleen afdrukken uitgeschakeld). https://www.phoenixcpm.com/free-trial/
7. Phoenix Project Manager — Latest versions (Phoenix 5 v5.6.3.0; Phoenix 4 v4.8.17.0; Win + Mac). https://www.phoenixcpm.com/downloads/latest.php
8. Phoenix Project Manager — Upgradepagina (prijs achter login). https://www.phoenixcpm.com/shop/upgrade.php

### Wederverkopers en distributeurs
9. CDP Inc. — Phoenix Project Manager productpagina (CPM Checker, Storepoints, formaten, training). https://www.cdp-inc.com/products/phoenix-project-manager
10. CDP Inc. — Purchase Phoenix Project Manager ($799/licentie, >6 op aanvraag). https://www.cdp-inc.com/products/software/purchase-phoenix-project-manager
11. Project Controls Online (Projcon Group, VK) — Phoenix Project Manager listing (verouderde systeemeisen). https://projectcontrolsonline.com/phoenix-project-manager

### Reviewsites en aggregatoren
12. Capterra — Phoenix Project Manager ($799 one-time; 1 review: 4,0 totaal / 2,0 ease of use / 5,0 value / 5,0 support; Mac-crashes; "reports are clumsy"). https://www.capterra.com/p/199258/Phoenix-Project-Manager/
13. G2 — Phoenix Project Manager alternatives (Procore, Fieldwire, Oracle Primavera). https://www.g2.com/products/phoenix-project-manager/competitors/alternatives
14. GoodFirms — Phoenix Project Manager reviews & pricing. https://www.goodfirms.co/software/phoenix-project-manager
15. Solevant — Phoenix Project Manager review (sinds 2005; perpetual; geen mobiel; geen cloud). https://solevant.com/software/phoenix-project-manager

### Bedrijfs- en marktdata
16. LinkedIn — Phoenix Project Management Systems (Salt Lake City UT, opgericht 2005, 2–10 fte, oprichter Jerry Poulsen). https://www.linkedin.com/company/phoenix-project-management-systems
17. Apps Run The World — Phoenix Project Manager klantendatabase (Del Amo Construction, Centric Projects, Peinado Construction; bedrijfsgroottes; VS-concentratie). https://www.appsruntheworld.com/customers-database/products/view/phoenix-project-manager

### Vakpublicaties en vergelijkingen
18. Plan Academy — "3 Project Scheduling Tools You May Not Know About" (lijkt op P6 Pro; verfijndere relatielijnen; Flag-type; Mac; $799; gratis academisch). https://www.planacademy.com/3-coming-project-scheduling-tools-may-not-know/
19. Planera — "Primavera P6 Alternatives" (Phoenix "best for CPM specialists"; geen cloudsamenwerking; gesiloeerd). https://www.planera.io/post/primavera-p6-alternatives
20. Outbuild — "Outbuild vs Phoenix Project Manager" (concurrentievergelijking: geen lookahead, geen mobiel, geen integraties, geen risicoanalyse). https://www.outbuild.com/compare/outbuild-vs-phoenix-project-manager

### Uitdrukkelijk verworpen bron
21. ConstructionBids.ai — "Best Oracle Primavera P6 Alternatives" — bevat aantoonbaar onjuiste beweringen over Phoenix (cloud-native, EVM-dashboards, $1.500–$2.400/gebruiker/jaar) die strijdig zijn met alle primaire bronnen. **Als onbetrouwbaar aangemerkt en niet gebruikt voor feitelijke uitspraken; alleen vermeld als voorbeeld van circulerende desinformatie.** https://constructionbids.ai/blog/oracle-primavera-alternative-construction

### Niet toegankelijk tijdens dit onderzoek (transparantie)
- G2 productreviewpagina — HTTP 403.
- TrustRadius — HTTP 403.
- Reddit (r/Construction, r/ConstructionManagers) en beschikbare mirrors — geblokkeerd; alleen via zoekmachinesnippets indirect geraadpleegd.
- Planning Planet — geen relevante treffers over Phoenix aangetroffen.
- Gartner Peer Insights — geen profiel aangetroffen.
- Phoenix Project Manager user manual (manualzz) — HTTP 403.
- Web Archive — niet bereikbaar vanuit deze omgeving.

---

*Alle bedragen in USD, prijspeil juli 2026. Schattingen zijn in de tekst expliciet als "schatting" gemarkeerd en zijn niet door bronnen onderbouwd. Waar bronnen elkaar tegenspreken, is de primaire leveranciersbron leidend.*

---

## Verificatie

**Adversariële fact-check, uitgevoerd 25 juli 2026.** Opzet: van elke belangrijke falsifieerbare bewering is geprobeerd haar te *weerleggen* door de genoemde bron opnieuw op te halen en, waar mogelijk, met een niet eerder gebruikte bron te confronteren. Oordelen: **bevestigd** / **gecorrigeerd** / **onzeker**.

**Methodische beperking van deze controle (transparantie):** het zoekmachinebudget van deze sessie was uitgeput, dus de verificatie is volledig uitgevoerd met **directe URL-ophaling**, niet met vrije zoekopdrachten. Beweringen waarvoor geen bekende URL bestond (met name leveranciersonafhankelijke bevestiging van eigendom/oprichter) konden daardoor niet actief worden weerlegd en staan hieronder als **onzeker**. Niet-ophaalbaar tijdens deze controle: `goodfirms.co/software/phoenix-project-manager` (HTTP 403), `phoenixcpm.com/eula/` (HTTP 404), twee Microsoft-supportpagina's over baselines (HTTP 404), Oracle's *P6 Professional Tested Configurations* (HTTP 404).

### A. Prijs en licentiemodel

| # | Bewering | Oordeel | Bevinding | Bron |
|---|---|---|---|---|
| 1 | Lijstprijs **$799 per licentie** | **bevestigd** | Drie onafhankelijke vindplaatsen noemen exact $799: eigen webshop ("$799 per license"), CDP Inc. ("$799/license"), Capterra ("$799 … One Time"). Plan Academy bevestigt onafhankelijk *"$799 per license, much less than a license of P6"*. | [phoenixcpm.com/shop/purchase.php](https://www.phoenixcpm.com/shop/purchase.php) · [cdp-inc.com](https://www.cdp-inc.com/products/software/purchase-phoenix-project-manager) · [capterra.com](https://www.capterra.com/p/199258/Phoenix-Project-Manager/) · [planacademy.com](https://www.planacademy.com/3-coming-project-scheduling-tools-may-not-know/) |
| 2 | **"Perpetual, geverifieerd op drie onafhankelijke plaatsen"** | **gecorrigeerd** | Deels onjuist gepresenteerd. De webshop en CDP noemen **alleen een bedrag, geen termijn en niet het woord perpetual/one-time** — zij verifiëren de prijs, niet het model. Alleen Capterra ("One Time") en Solevant (*"Offers a perpetual license with a one-time payment"*) benoemen het model, en Solevant noemt zelf geen bedrag. §3.1/§3.2 zijn hierop herschreven. Conclusie blijft overeind, bewijskracht is lager dan geclaimd. | [solevant.com](https://solevant.com/software/phoenix-project-manager) · [capterra.com](https://www.capterra.com/p/199258/Phoenix-Project-Manager/) |
| 3 | **Geen abonnementsmodel** | **bevestigd** | Alle drie de plekken waar een termijnprijs zou moeten staan (webshop, CDP-verkooppagina, phoenixcpm-homepage) zijn opnieuw gecontroleerd: geen prijs per maand/jaar/seat, geen edities, geen cloud- of SaaS-variant. De homepage biedt één ongedeeld desktopproduct. | [phoenixcpm.com](https://www.phoenixcpm.com/) |
| 4 | Solevant-citaat *"perpetual license model with a one-time payment **option**"* | **gecorrigeerd** | De letterlijke tekst is *"Offers a perpetual license with a one-time payment, which can be more cost-effective than subscription models."* Het in §3.2 aangehaalde tweede citaat (*"one-time licensing fee avoids recurring subscription costs"*) is bij herophaling **niet aangetroffen**; het is uit de tekst verwijderd. | [solevant.com](https://solevant.com/software/phoenix-project-manager) |
| 5 | **Geen aparte jaarlijkse onderhouds-/supportfee** | **onzeker** (ongewijzigd, maar aangescherpt geformuleerd) | Herbevestigd dat webshop, CDP-pagina en homepage géén maintenance-fee noemen. Dit blijft echter *afwezigheid van bewijs*: de EULA-pagina die dit definitief zou sluiten gaf HTTP 404. In §4 (voordeel 1) is "geen onderhoudscontract" daarom afgezwakt tot "geen onderhoudscontract aangetroffen". | — (EULA niet ophaalbaar) |
| 6 | Upgrade Phoenix 4 → 5 bestaat, **prijs achter login**; schatting $199–$399 | **bevestigd** (het feit) / **onzeker** (het bedrag) | De upgradepagina geeft letterlijk *"You must be logged in. Redirecting."* Er is dus een betaald upgradepad; het bedrag blijft een niet-onderbouwde schatting en is als zodanig gemarkeerd. | [phoenixcpm.com/shop/upgrade.php](https://www.phoenixcpm.com/shop/upgrade.php) |
| 7 | Volumekorting op aanvraag boven 6 licenties; webshop tot 999 per order | **bevestigd** | CDP: *"Need more than 6 licenses? Please contact us."* Webshop: *"Quantity must be between 1 and 999."* Geen gepubliceerde staffel op enige pagina — de schatting 10–25% blijft onderbouwd noch weerlegd. | [cdp-inc.com](https://www.cdp-inc.com/products/software/purchase-phoenix-project-manager) · [phoenixcpm.com/shop/purchase.php](https://www.phoenixcpm.com/shop/purchase.php) |
| 8 | Academische licentie **gratis, 1 per student, schoolmailadres** | **bevestigd** | Letterlijk: *"Limit one Academic License per student"*, `.edu`- of goedgekeurd schooldomein vereist, gratis, intrekbaar bij verlies van studentstatus, geen looptijd vermeld. Onafhankelijk bevestigd door Plan Academy (*"an academic license allowing students to use it free of charge"*). | [phoenixcpm.com/shop/academic.php](https://www.phoenixcpm.com/shop/academic.php) · [planacademy.com](https://www.planacademy.com/3-coming-project-scheduling-tools-may-not-know/) |
| 9 | Proefversie 30 dagen, **"printen is de enige uitgeschakelde functie"** | **gecorrigeerd** | 30 dagen is bevestigd. De trialpagina zegt echter alleen *"Printing is disabled in the trial version."* — het woord "only" staat er niet. Citaat in §3.1 en §4 (voordeel 10) gecorrigeerd; "enige beperking" is nu als gevolgtrekking gemarkeerd, niet als citaat. ⚠️ Capterra beweert bovendien dat er **géén** trial is — aantoonbaar onjuist. | [phoenixcpm.com/free-trial/](https://www.phoenixcpm.com/free-trial/) |
| 10 | Geen prijzen in EUR/GBP; buitenlandse kopers betalen USD | **bevestigd** | De enige aangetroffen niet-Amerikaanse distributeur (Project Controls Online, VK) noemt **geen enkele prijs in welke valuta dan ook** en verwijst door naar phoenixcpm.com. Geen regionale prijslijst gevonden. | [projectcontrolsonline.com](https://projectcontrolsonline.com/phoenix-project-manager) |
| 11 | Trainingstarieven CDP niet gepubliceerd (schatting $500–$1.500 p.p.) | **bevestigd** (het feit) / **onzeker** (het bedrag) | CDP biedt "Training Classes" en "Implementation Support" als aparte diensten, **zonder enig tarief**. De bandbreedte blijft een niet-onderbouwde schatting. | [cdp-inc.com/products/phoenix-project-manager](https://www.cdp-inc.com/products/phoenix-project-manager) |
| 12 | **Geen modules of add-ons; alles zit in de $799** | **bevestigd** | De homepage toont één ongedeeld desktopproduct, geen edities, geen modulaire opbouw, geen add-ons. ⚠️ Let op: juist hierop steunt de weerlegging van de constructionbids.ai-prijs "afhankelijk van modules" (zie #22). | [phoenixcpm.com](https://www.phoenixcpm.com/) |

### B. Technische claims

| # | Bewering | Oordeel | Bevinding | Bron |
|---|---|---|---|---|
| 13 | **Alleen dagen, geen uren** | **bevestigd** | FAQ herbevestigd: *"Phoenix only schedules in days"*. Poging tot weerlegging via about-pagina en homepage: geen enkele vermelding van uurplanning. | [phoenixcpm.com/support/](https://www.phoenixcpm.com/support/) |
| 14 | **Geen resource leveling**; **resources niet im-/exporteerbaar** | **bevestigd** | FAQ herbevestigd: *"Phoenix does not have a resource leveling feature"* en *"Not yet… but its coming soon!"* voor resource-import/-export. Dit is de zwaarstwegende interoperabiliteitsbevinding van het rapport en houdt stand. | [phoenixcpm.com/support/](https://www.phoenixcpm.com/support/) |
| 15 | Formaten: XER bidirectioneel, MPX/XML **"waarschijnlijk"** bidirectioneel, SDEF alleen export, **geen MPP** | **gecorrigeerd** (in het voordeel van het product) | De about-pagina noemt letterlijk *"Import and **Export** to Project MPX and XML"*, *"Import and Export to P6 XER Files"*, *"Import and Export to XLS & XLSX"*, *"Import and Export to CSV"* en *"**Export to** U.S. Army Corps of Engineers SDEF format"*. MPX en MS-Project-XML zijn dus **bevestigd bidirectioneel** — het voorbehoud "(waarschijnlijk)" in §6.1 is verwijderd. SDEF-eenrichtingsverkeer bevestigd. **MPP komt in geen enkele leveranciersbron voor** → afwezigheid bevestigd. | [phoenixcpm.com/about/](https://www.phoenixcpm.com/about/) |
| 16 | **PMXML (P6 XML) niet ondersteund** | **onzeker** (ongewijzigd) | De featurelijst noemt "XML" uitsluitend in de combinatie *"Project MPX and XML"* (= MS Project), en voor P6 alleen "XER Files". Afwezigheid van PMXML blijft daarmee een redelijke gevolgtrekking, niet een leveranciersuitspraak. Terecht als onbevestigd gemarkeerd. | [phoenixcpm.com/about/](https://www.phoenixcpm.com/about/) |
| 17 | **Geen IFC in enige vorm; het woord IFC komt niet voor** | **bevestigd** | Vier leveranciersbronnen (homepage, about/featurelijst, FAQ/support, downloads) en drie derdenbronnen (CDP, Outbuild, Solevant) opgehaald: **nul vermeldingen** van IFC, buildingSMART, 4D, BIM, Navisworks of Synchro. De sterkst geformuleerde claim in het rapport, en zij houdt volledig stand. | [phoenixcpm.com/about/](https://www.phoenixcpm.com/about/) · [phoenixcpm.com/support/](https://www.phoenixcpm.com/support/) · [outbuild.com](https://www.outbuild.com/compare/outbuild-vs-phoenix-project-manager) |
| 18 | Longest Path / Retained Logic / 4 relatietypen / activiteittypen Task-Milestone-Flag-Hammock | **bevestigd** | About-pagina letterlijk: *"Calculate Critical Path by Total Float or Longest Path"*, *"Retained Logic Relationships"*, vier relatietypen, en task/milestone/flag/hammock. Flag-type onafhankelijk bevestigd door Plan Academy als onderscheidend. | [phoenixcpm.com/about/](https://www.phoenixcpm.com/about/) · [planacademy.com](https://www.planacademy.com/3-coming-project-scheduling-tools-may-not-know/) |
| 19 | **Zes constrainttypen** (ES/EF/LS/LF/MS/MF) | **onzeker** | De about-pagina noemt "constraints" als functiegroep maar **niet de zes typen bij naam**. Aantal noch namen konden worden bevestigd; §2.2 is hierop gemarkeerd. | [phoenixcpm.com/about/](https://www.phoenixcpm.com/about/) |
| 20 | **Onbeperkt aantal Storepoints** | **onzeker** | De leverancier zegt alleen *"Create storepoints to track revisions/updates"* — **zonder aantal**. "Unlimited" komt uitsluitend van wederverkoper CDP ("baseline tracking with unlimited comparisons"). Plausibel, niet leveranciersbevestigd; §2.5 aangevuld. De vergelijkingsclaim "MS Project max. 11 baselines" kon evenmin met een Microsoft-bron worden gestaafd (2× HTTP 404) en berust op algemene productkennis. | [phoenixcpm.com/about/](https://www.phoenixcpm.com/about/) · [cdp-inc.com](https://www.cdp-inc.com/products/phoenix-project-manager) |
| 21 | Huidige versies **Phoenix 5 v5.6.3.0** en **Phoenix 4 v4.8.17.0**, Win + Mac | **bevestigd** | Downloadpagina letterlijk: *"Current Phoenix 5 Version: 5.6.3.0"* en *"Current Phoenix 4 Version: 4.8.17.0"*, met installers voor Windows én Mac OS X voor beide releases. Bevestigt tegelijk dat macOS een volwaardig, actueel platform is. | [phoenixcpm.com/downloads/latest.php](https://www.phoenixcpm.com/downloads/latest.php) |
| 22 | **Primavera P6 Professional draait niet native op macOS** (voordeel 5) | **onzeker / genuanceerd** | Oracle's *Tested Configurations*-document was niet ophaalbaar (HTTP 404), dus de claim is niet aan een primaire bron getoetst. Bovendien is de bredere formulering "P6 is voor Mac-gebruikers geen optie" te sterk: **P6 EPPM heeft een browsergebaseerde webclient die op macOS werkt**. Het voordeel geldt tegenover de *desktopclient* P6 Professional. §2.1 en §4 (voordeel 5) zijn hierop genuanceerd. | — (Oracle-bron niet ophaalbaar) |
| 23 | Schaalbaarheid ~3.000–5.000 activiteiten comfortabel, >10.000 ongeschikt | **onzeker** (ongewijzigd) | De leverancier publiceert geen limiet en geen benchmarks; niets in de opgehaalde bronnen weerspreekt of bevestigt de bandbreedte. Blijft een expliciet gemarkeerde, ongetoetste schatting. Geen wijziging nodig — het rapport claimt hier niet meer dan het waarmaakt. | — |
| 24 | **Geen API/SDK/CLI, geen integraties** | **bevestigd** | Geen enkele leveranciersbron noemt een API, SDK, CLI, webhook of pluginmodel. Onafhankelijk bevestigd door concurrent Outbuild: *"Phoenix has no direct integrations with major construction platforms"* en *"manual updates between systems"*. (Concurrentbron — belanghebbend, maar hier consistent met de leverancierslacune.) | [outbuild.com](https://www.outbuild.com/compare/outbuild-vs-phoenix-project-manager) |

### C. Bedrijf, markt en brongebruik

| # | Bewering | Oordeel | Bevinding | Bron |
|---|---|---|---|---|
| 25 | Vestiging **Salt Lake City, Utah**; opgericht **2005**; onafhankelijk, geen overname | **bevestigd** (locatie + jaar) / **onzeker** (eigendom) | Onafhankelijk bevestigd door Solevant: vendor "Phoenix Project Management Systems", adres "44 W. Broadway, #2007, Salt Lake City, UT 84101, US", actief sinds **2005**, deployment Windows/macOS. De 6,85% Utah sales tax op de eigen webshop ondersteunt de vestigingsplaats. **Afwezigheid van een overname is niet actief te bewijzen** en berust op het uitblijven van tegenbewijs. | [solevant.com](https://solevant.com/software/phoenix-project-manager) · [phoenixcpm.com/shop/purchase.php](https://www.phoenixcpm.com/shop/purchase.php) |
| 26 | Oprichter **Jerry Poulsen**; **2–10 medewerkers** | **onzeker** | Beide gegevens komen uitsluitend uit LinkedIn/aggregatoren; LinkedIn is niet ophaalbaar en het zoekbudget was uitgeput, dus er is **geen tweede, onafhankelijke bevestiging**. Apps Run The World en Solevant noemen oprichter noch personeelsomvang. Behandel de "micro-ISV van 2–10 fte" als plausibel maar ongeverifieerd — het draagt wel gewicht in nadeel 9 (leverancierrisico). | — |
| 27 | Klantenbasis: **N≈7**, ~43%/~57% grootteverdeling, geen enterprise | **gecorrigeerd** (aangevuld) | Exacte percentages zijn **42,86% / 57,14%**; "no adoption among larger enterprises" letterlijk bevestigd. Het rapport noemde slechts 3 van de 7 klanten — de ontbrekende vier zijn toegevoegd: **Steele & Freeman ($114 mln/250 fte), WESPAC Construction ($50 mln/200 fte), Dawson Construction ($20 mln/150 fte), HESS Construction ($18 mln/80 fte)**. De omzetklasse loopt daarmee van ~$18 mln (niet $34 mln) tot ~$250 mln. ⚠️ De zinsnede "adoption tracked across 195 countries" is boilerplate over de aggregatordatabase, **niet** over Phoenix — als zodanig gemarkeerd. | [appsruntheworld.com](https://www.appsruntheworld.com/customers-database/products/view/phoenix-project-manager) |
| 28 | Apps Run The World categoriseert Phoenix onjuist als **"Project Portfolio Management"** | **bevestigd** | De categorie "Project Portfolio Management" staat er inderdaad, terwijl het product aantoonbaar geen PPM doet (één bestand, één project, geen EPS). De kritiek van het rapport op de aggregator is terecht. | [appsruntheworld.com](https://www.appsruntheworld.com/customers-database/products/view/phoenix-project-manager) |
| 29 | Capterra: **één review**, 4,0 totaal, Mac-crashes, "reports are clumsy" | **bevestigd** (review) / **gecorrigeerd** (bronwaardering) | Nog steeds precies **één** review, totaalscore **4,0/5**, met de Mac-crashklacht. ⚠️ Nieuw bij deze controle: Capterra's **productmetadata is aantoonbaar fout** — de pagina claimt "web-based" deployment met Android- en iPhone/iPad-apps en "no free trial", alle drie in strijd met de leverancier. Capterra is daarom gedegradeerd van verificatiebron naar indicatieve bron; nadeel 7 en §3.2 zijn hierop aangepast. | [capterra.com](https://www.capterra.com/p/199258/Phoenix-Project-Manager/) |
| 30 | CDP-citaat *"as easy to use as Microsoft Project and as powerful as Primavera"* | **gecorrigeerd** | Dit citaat staat **niet** op de CDP-productpagina. De aangetroffen formulering is *"easier to use than Microsoft Project™, P3, and SureTrak"*, met wél de "two clicks to complete"-workflow. §1.2 gecorrigeerd. | [cdp-inc.com/products/phoenix-project-manager](https://www.cdp-inc.com/products/phoenix-project-manager) |
| 31 | ConstructionBids.ai claimt **$1.500–$2.400/gebruiker/jaar**, cloud-native, EVM-dashboards — en dat is onjuist | **bevestigd** (beide helften) | De bron is opgehaald en bevat letterlijk *"$1,500-$2,400/user/year depending on modules"*, *"cloud-native architecture"* en *"CPI, SPI, TCPI, EAC, and VAC in real time"*, met aanbeveling voor ANSI/EIA-748-rapportage. Dit is **onverenigbaar** met de geverifieerde leveranciersfeiten: desktop-only, één ongedeeld product zonder modules (#12), geen EVM in de featurelijst, $799 eenmalig. De verwerping in §0 is **terecht en blijft staan**. | [constructionbids.ai](https://constructionbids.ai/blog/oracle-primavera-alternative-construction) |
| 32 | Britse distributeur voert **verouderde systeemeisen** en geen prijs | **bevestigd** | Project Controls Online noemt letterlijk "Microsoft Windows 7, Windows Vista, Windows XP … or Windows 2000" en "Mac OS X version 10.4 (Tiger) or later" met "PowerPC or Intel". Bevestigt zowel de verouderde-listing-observatie (nadeel 14) als de afwezigheid van niet-USD-prijzen (#10). | [projectcontrolsonline.com](https://projectcontrolsonline.com/phoenix-project-manager) |

### D. Samenvatting van de fact-check

- **Kernconclusies van het rapport houden stand.** De vier zwaarstwegende bevindingen — **$799 eenmalig**, **alleen dagplanning**, **resources niet im-/exporteerbaar**, **nul IFC/BIM-ondersteuning** — zijn alle vier opnieuw en met letterlijke citaten bevestigd. Er is niets gevonden dat ze weerlegt.
- **Vier feitelijke correcties** aangebracht: het CDP-citaat (#30), het trial-citaat (#9), de klantenlijst (#27) en de MPX/XML-uitwisseling, die **beter** blijkt dan gerapporteerd (#15).
- **Eén methodologische correctie:** de bewering "perpetual, geverifieerd op drie onafhankelijke plaatsen" verwarde verificatie van de *prijs* met verificatie van het *licentiemodel* (#2). De conclusie verandert niet, de onderbouwing is nu eerlijk weergegeven.
- **Eén bron gedegradeerd:** Capterra's productmetadata bleek aantoonbaar fout (web-based, mobiele apps, geen trial) en is niet langer als verificatiebron gebruikt (#29).
- **Zes punten als onzeker gemarkeerd** die eerder als vaststaand of impliciet vaststaand oogden: jaarlijkse onderhoudsfee (#5), zes constrainttypen (#19), "onbeperkte" Storepoints (#20), P6-op-macOS (#22), oprichter en personeelsomvang (#26), en het ontbreken van een overname (#25).
- **Alle expliciete schattingen** (upgradeprijs, volumekorting, trainingstarief, activiteitenlimiet) blijven schattingen: geen enkele kon worden onderbouwd, geen enkele kon worden weerlegd. Ze zijn in de tekst al correct als schatting gemarkeerd.
