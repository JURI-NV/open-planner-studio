# Project Plan 365 (Housatonic Software)

*Marktonderzoek planningssoftware — diepteprofiel*
**Onderzoeksdatum: 25 juli 2026.** Alle prijzen en claims zijn op die datum geverifieerd, tenzij anders vermeld.

> **Dit profiel is nagelopen door een adversariële fact-check** (zie het hoofdstuk [Verificatie](#verificatie) onderaan). Zeven beweringen zijn gecorrigeerd — waarvan één feitelijk onjuist (de Google Play-waardering) en één een leesfout die als leverancierstegenstrijdigheid was gepresenteerd (de "omgekeerde" prijspagina). Twee blijven `onzeker`. Waar de tekst hieronder afwijkt van de oorspronkelijke versie, is dat expliciet gemarkeerd.

> **Methodologische noot vooraf.** Dit profiel is opgebouwd uit directe fetches van de leverancierswebsite (inclusief de volledige online-help/artikelenbibliotheek), de Apple App Store- en Mac App Store-metadata (inclusief de publieke reviewfeed) en de Google Play-listing. De algemene zoekmachine-quota van deze sessie was uitgeput, waardoor G2, Capterra, TrustRadius, Gartner Peer Insights en Reddit **niet** direct opgehaald konden worden (403/404/CAPTCHA). Waar reviewbewijs nodig was, is teruggevallen op de **publieke Apple App Store-reviewfeed** (primaire, ongefilterde gebruikersbron) en op één via zoeksnippet gevonden Reddit-fragment. Punten die daardoor op inferentie of één bron steunen zijn expliciet gemarkeerd met **[schatting]** of **[één bron]**.

---

## 1. Wat het is

### Leverancier en eigendom

**Housatonic Software, Inc.** — postadres PO Box 131, Pittsfield, Massachusetts 01202, VS. Het bedrijf presenteert zich onder het merk "Housatonic" op housatonic.com en met het product op projectplan365.com.

Belangrijke nuance die niet op de website staat maar wel uit de app-storemetadata blijkt: de **juridische verkoper in zowel de iOS App Store als de Mac App Store is "Viewer Central Inc"**, niet "Housatonic Software, Inc.". Housatonic lijkt dus een handelsnaam/merk van Viewer Central Inc te zijn. Dit is relevant voor inkoop- en leveranciersbeoordeling: het is een klein, privaat gehouden Amerikaans softwarehuis zonder gepubliceerde financiële cijfers, geen bekende venture-financiering, en geen aanwijzingen van overname of consolidatie.

### Historie

Volgens de eigen "About"-pagina:

| Jaar | Mijlpaal |
|---|---|
| 2001 | Oprichting door PMI/PMP-gecertificeerde projectmanagers en IT'ers; bouwden "de eerste project viewer ter wereld voor MS Project-bestanden" (→ het latere **Project Viewer 365**) |
| 2009 | Eerste cross-platform planningssoftware |
| 2013/2014 | Mobiele apps: iOS-app eerste release **18 november 2013**; Windows-versie volgens AppAgg februari 2014 |
| 2018 | Drie abonnementsniveaus (Individual/Business/Enterprise) + realtime samenwerking |
| 2019 | AI-assistent "Erix" geïntroduceerd |
| 2020 | Private cloud-opslag + agile-mogelijkheden |
| 2023–2026 | Jaarlijkse "Release"-cyclus; nieuwste is **Release 2026 (1 april 2026)** met Erix.AI, tijdregistratie, AI-projectcreatie en Apple Silicon-optimalisatie |

Het product wordt dus al **ruim 12 jaar** actief doorontwikkeld, met een voorspelbare release-cadans (doorgaans 1 april en 1 december). De iOS-app stond op 4 mei 2026 op versie 26.9; de Mac-app op 26.31. Dat is een gezond teken van continuïteit — dit is geen verlaten product.

### Doelgroep en typische gebruikers

De positionering is scherp en eenduidig: **iedereen die met MS Project-bestanden (.mpp) moet werken, maar geen Microsoft Project-licentie wil of kan hebben.** Concreet:

- **Projectmanagers bij mkb en middelgrote organisaties** die één of twee planners hebben en de MS Project-prijs niet kunnen verantwoorden.
- **Mac-gebruikers.** Dit is historisch de sterkste niche: Microsoft levert geen native MS Project voor macOS. Project Plan 365 is een van de weinige tools die .mpp op de Mac native kan openen én opslaan.
- **Ontvangers van .mpp-bestanden** — aannemers, onderaannemers, leveranciers en klanten die een planning van een opdrachtgever moeten lezen en beperkt bewerken.
- **Mobiele/veldgebruikers** die op tablet of telefoon voortgang willen bijwerken.
- **Studenten en zzp'ers** (blijkt uit reviews en het "Full Sail University"-testimonial).

### Sectoren en regio's

De leverancier voert oplossingspagina's voor onder meer **bouw** ("Construction Managers, Civil Engineers and Architects"; residentieel, commercieel, institutioneel, industrieel, heavy civil, milieu), maakindustrie, bankwezen/M&A, verzekeringen, onderwijs en IT.

Regio: hoofdzakelijk Noord-Amerika en Europa. De leverancier claimt op /ms-project-alternative/ en /solutions/construction/ letterlijk *"support for 12 languages, over 20 date formats, and more than 100 currencies"* — op de bouwpagina met de formulering *"**Customizable** to support 12 languages"*. **[onzeker]** De App Store-metadata van zowel de iOS- als de Mac-app noemt echter uitsluitend **Engels** (`languageCodesISO2A = ["EN"]`). De claim is dus mogelijk een instelbaarheid (datum-/valutanotatie, vertaalbare UI) en geen set meegeleverde UI-lokalisaties. Prijzen worden in USD gezet met omrekening voor andere regio's.

**Klantenclaims — met voorbehoud.** De homepage claimt "20.000+ tevreden klanten wereldwijd" en toont logo's van NASA, Amazon, IBM en SpaceX. De "About"-pagina zegt tegelijkertijd, veel bescheidener, dat het product "gebruikt wordt door honderden bedrijven wereldwijd". Die twee claims zijn moeilijk te verenigen. **[schatting]** De meest plausibele lezing is dat "20.000+" cumulatieve accounts/downloads over 12 jaar betreft (inclusief de gratis viewer), en dat de logo's individuele medewerkers bij die organisaties betreffen — niet enterprise-brede uitrol. Behandel beide getallen als marketing, niet als geverifieerde installed base.

---

## 2. Functionaliteit en techniek

### Is er een échte CPM-engine? — Ja, aantoonbaar

Dit is het belangrijkste onderscheid in dit onderzoek. Veel "werkbeheertools" (monday.com, ClickUp, Asana, Wrike) tekenen een balkenschema en noemen dat een Gantt-chart, zonder netwerkplanning, zonder forward/backward pass, zonder echte float-berekening. **Project Plan 365 hoort níet in die categorie.** Het is een volwaardige netwerkplanner.

De leverancier documenteert het algoritme expliciet in het help-artikel *Scheduling Engine*:

> "Project Plan 365 uses an enhanced scheduling engine starting from Precedence Diagram Method."

**Stap 1 (forward pass):** "Create a graph where nodes are tasks and edges are precedence relations between tasks", gevolgd door topologische sortering om de verwerkingsvolgorde te bepalen en early start/early finish te berekenen.

**Stap 2 (backward pass):** een tweede graaf over de opvolgers berekent late start/late finish, waarmee "real start and finish date of tasks and slack" bepaald wordt.

**Stap 3:** kosten, werk en resourcetoewijzingen worden doorgerekend.

Daarbij worden "all the constraints for a task and all types of predecessors" meegenomen, plus kalenders en resources. De engine verwerkt bovendien niet alleen simpele taken maar "auto tasks, manual tasks, placeholder tasks, split tasks, null tasks and summary tasks".

Dit is letterlijk de Microsoft Project-schedulingsemantiek, herbouwd. Voor een IFC-gebaseerde open-source planner is dat relevant: het is de referentie-implementatie waartegen je je eigen CPM-solver zou willen valideren.

### Kritiek pad en float

- Kritiek pad wordt bepaald op **total slack = 0**: "A task is critical based on the calculation made in the project. A critical task needs to have the total slack 0."
- Total slack gedefinieerd als "the amount of time this sequence of tasks can slip before it affects the finish date of the project".
- Er is een apart help-artikel *Slack calculation* (free/total float), plus *Early Start/Early Finish* en *Late Start/Late Finish*.
- **Belangrijke beperking:** meerdere kritieke paden worden **niet** ondersteund. Letterlijk: *"We are sorry, but at this point, you cannot have multiple Critical Paths in one project."* MS Project heeft hiervoor de optie "Calculate multiple critical paths" (per netwerk/deelnet). Bij multi-project- of multi-netwerkplanningen — in de bouw eerder regel dan uitzondering — is dit een reëel gemis.

### Afhankelijkheidstypen en lag/lead

**Alle vier de relatietypes worden ondersteund.** Uit het help-artikel *Link/Unlink Tasks*, letterlijk geciteerd:

> "The supported link types are: Finish to Start (FS), Finish to Finish (FF), Start to Start (SS), Start to Finish (SF)."

**Lead en lag** worden ondersteund met MS Project-syntaxis in de Predecessors-kolom: lag positief (`4SS + 5days`), lead negatief (`-2d`). Percentuele lag **[schatting]** is waarschijnlijk ook ondersteund gezien de MPP-round-trip, maar wordt in de documentatie niet expliciet bevestigd.

### Constraints

Alle **acht** MS Project-constrainttypes zijn geïmplementeerd, met de correcte driedeling:

| Categorie | Types |
|---|---|
| Flexibel (geen datum) | ASAP (default), ALAP |
| Semi-flexibel (datum vereist) | SNET, SNLT, FNET, FNLT |
| Inflexibel (datum vereist) | MSO, MFO |

Daarnaast **deadlines** als aparte, niet-schedulingsdwingende markering (net als MS Project) — een detail dat zwakkere tools bijna altijd missen.

### Kalendermodel

Volledig viertrapsmodel, identiek aan MS Project:

- **Base calendars** (Standard, 24 Hours, Night Shift — de standaardset)
- **Project calendars**
- **Task calendars** ("Set a Calendar to a Task"), inclusief de optie *"Scheduling ignores resource calendars"* op tabblad Advanced
- **Resource calendars** ("Set Resource Calendar")
- Werkdagen/werktijden aanpasbaar ("Change Working Days"), met uitzonderingen/feestdagen

Dit is een echt kalendermodel, geen simpele "weekend uit"-schakelaar.

### Taakmodel

- **Task modes:** Auto Scheduled / Manually Scheduled (zoals MS Project 2010+)
- **Task types:** Fixed Units / Fixed Duration / Fixed Work (help-artikel *Set Task Type*)
- Mijlpalen, samenvattende taken, gesplitste taken (*Split Task*), terugkerende taken (*Insert Recurring Task*), inactieve taken
- **WBS-codes** (veld op tabblad Advanced)
- **Custom fields** per taak (eigen tabblad in Task Information)
- Prioriteit, notities, hyperlinks, timeline-weergave
- Duur in minuten/uren/dagen/weken/maanden, met verstreken (elapsed) duur **[schatting]** — impliciet uit MPP-compatibiliteit maar niet expliciet gedocumenteerd

### Resource- en kostenmodel

- Resourcetypen work/material/cost (*Cost Resources*, *Resource Material*-rapport)
- **Pay rates** per resource (*Enter Pay Rates for Resources*); of volledige cost rate tables A–E worden ondersteund is **niet** gedocumenteerd **[schatting: waarschijnlijk beperkt tot standaardtarief + overtime]**
- Max Units, Peak Units, Assignment Units
- **Overallocatie-detectie** (*Resource Overallocation*, rapport "Overallocated Resources")
- **Resource leveling** — bestaat, maar met stevige beperkingen (zie hieronder)
- Kostentracking, Budget-, Overbudget Tasks/Resources-, Cash Flow- en **Earned Value**-rapporten (deze zitten in **beide** tiers)
- **S-Curve-rapport** — voor een bouwplanner een serieus punt in het voordeel, **maar Business-only** (geverifieerd in de vergelijkingstabel; zie §3)

**Resource leveling — de kleine lettertjes.** Beschikbaar, met vier scopes (per resource, hele project, geselecteerde taken, enkele taak). Maar de leverancier documenteert zelf de beperkingen:

- werkt niet op taken met % Complete > 0%
- lost overallocatie niet op bij resources die op 200% aan een taak hangen
- lost overallocatie op summary tasks niet op
- *"Project Plan 365 does not take care of deadlines when performing resource leveling"*
- past duur of werk niet aan als onderdeel van leveling
- er is géén "level within available slack", géén instelbare leveling order, géén automatische levelingmodus gedocumenteerd

**En: resource leveling zit alleen in het Business-abonnement.** Dat is een significante feature-gating voor een functie die veel planners als basaal beschouwen.

### Baselines

Sterk punt. Ondersteuning voor **Baseline plus Baseline 1–10** (dus 11 baselines totaal, zoals MS Project), plus **interim plans**. Weergaven: **Variance-tabel** (baseline vs. gepland start/finish), **Tracking Gantt** en **Multiple Baselines Gantt**. Een baseline slaat volgens de documentatie ~20 datapunten op (kosten, werk, duur, start, finish — voor taken, resources én assignments).

Dit is precies wat je in de bouw nodig hebt voor claims, vertragingsanalyse en voortgangsrapportage.

### Weergaven en rapportage

MS Project-standaardweergaven: Gantt Chart, Task Sheet, **Network Diagram**, Project Calendar, Task Usage, Resource Usage, **Team Planner**, Timeline, Resource Sheet. Filters, tijdschalen, groeperingen.

**Circa 31 rapporttypen** — de eerder genoemde "35" is niet reproduceerbaar: de rapporten-index van de online help telt **31 afzonderlijke rapportartikelen** (geteld op /onlinehelp/reports/, 25 juli 2026). Waaronder: Earned Value, Cash Flow, S-Curve, Burndown, Budget, Critical Tasks, Milestones, Slipping Tasks, Should Have Started Tasks, Overallocated Resources, Overbudget Tasks/Resources, Project Status, Project Summary, Who Does What (When), Resource Work/Usage/Material, Task Usage, To-Do List, Working Days, Custom Reports, Scheduled Reports en Visual Reports. Van deze lijst zijn **S-Curve, Burndown en Visual Reports Business-only**.

Agile/Kanban is er sinds 2020, maar duidelijk als bijproduct — dit is een waterval-tool met een agile-vinkje, niet andersom.

### Platform en architectuur

| Platform | Status |
|---|---|
| Windows | Native desktop (.NET Framework 4.5+) |
| macOS | Native desktop, Apple Silicon-geoptimaliseerd sinds Release 2026; min. macOS 12.0, versie 26.31 (16 juli 2026), Mac App Store-debuut 4 dec. 2016 |
| iOS/iPadOS | Native app, min. iOS 15.0, versie 26.9 (4 mei 2026), eerste release 18 nov. 2013 |
| Android | Native app (`com.housatonic.pp365`) |
| Web | Browsergebaseerd |
| Server/Citrix/Terminal Server | Alleen aangeboden "for teams with more than 100 Editor Users" |

De architectuur is **file-centric, niet database-centric**: het .mpp-bestand ís de database. Opslag loopt via lokale schijf of cloudopslag (OneDrive, Google Drive, Dropbox, Box, iCloud Drive, SharePoint, SharePoint Online, SharePoint Task List, MS Project Server, Project Online) plus de eigen "Drive 365"-dienst.

**Realtime samenwerking (rTc)** werkt alleen als het bestand in **Drive 365** staat (dus niet in je eigen cloud). Kenmerken:
- automatische opslag bij elke wijziging
- kleurcodering per gebruiker; de rij waarin iemand werkt wordt grijs voor anderen (row-level locking, geen operational transform)
- **maximaal 10 gelijktijdige gebruikers**
- inactiviteitstimeout: waarschuwing na 5 min, sluiten na nog 3 min (instelbaar 5–120 min)
- outlining, sorteren, filteren, zoomen en opmaak synchroniseren **niet**
- alleen in **Business**, alleen voor Editor-rollen

### Schaalbaarheid — hoeveel taken realistisch?

De leverancier publiceert **geen** taaklimieten. De systeemeisenpagina is bovendien opvallend verouderd (noemt Windows XP, IE 8, iOS 7.1, Android 4.1, 512 MB RAM) en is daarmee niet bruikbaar als schaalbaarheidsindicatie.

**[schatting — belangrijk voorbehoud]** Op basis van de gebruikersreviews (herhaalde meldingen van "soooooo slooooow", "does everything advertised at a snails pace", bevriezen bij Dropbox-sync, crashen bij recurring tasks) en het ontbreken van enige performance-claim, schat ik het realistische comfortabele bereik op:

- **Desktop (Windows/Mac): tot circa 2.000–5.000 taken** werkbaar; daarboven merkbare traagheid.
- **Mobiel (iOS/Android): tot circa 500–1.000 taken**; grote MPP's zijn er een frustratie-ervaring.
- **Web: laagste van de drie**; het minst uitontwikkelde platform.

Ter vergelijking: MS Project Professional en Primavera P6 draaien routineus 20.000–100.000+ activiteiten. Voor een groot infra- of utiliteitsproject met een integrale planning van tienduizenden regels is Project Plan 365 **geen** kandidaat. Deze schatting is niet met benchmarks onderbouwd en verdient verificatie bij een concrete inkoopbeslissing.

---

## 3. Prijzen

Alle bedragen in **USD**, geverifieerd op **25 juli 2026**.

### Directe abonnementen (leverancierswebsite)

Bron: <https://www.projectplan365.com/purchase/> — geraadpleegd 25 juli 2026.

| Plan | Actuele prijs | Doorgestreepte lijstprijs | Effectief per jaar (1e termijn) | Read-only-gebruikers inbegrepen |
|---|---|---|---|---|
| **Standard** | **$9.99** /gebruiker/maand | ~~$10.99/month~~ | **$119,88** | tot 5 |
| **Business** | **$16.19** /gebruiker/maand | ~~$17.99/month~~ | **$194,28** | tot 10 |

> **Opgehelderd (was eerder als onzeker gemarkeerd).** Er is niets omgekeerd aan de prijspagina: het tweede bedrag staat in de HTML letterlijk in een `<del>`-tag (doorstreept), en de Business-kaart draagt een rode `10 % off`-lintje. $17,99 × 0,9 = $16,19 — exact. Beide bedragen vallen onder het kopje *"when purchased annually"*. De structuur is dus **$9.99 resp. $16.19 per gebruiker per maand bij jaarlijkse vooruitbetaling (actieprijs)**, met $10.99 resp. $17.99 als doorgestreepte lijstprijs. Dat is **$119,88 resp. $194,28 per gebruiker voor het eerste jaar**. Geverifieerd in de ruwe HTML van <https://www.projectplan365.com/purchase/>, 25 juli 2026.

> **Let op — de verlengprijs is hoger.** De algemene voorwaarden bepalen dat automatische verlenging plaatsvindt *"at the same price (subject to applicable Tax changes and **excluding any discount or other promotional offer provided for the first Subscription Plan**)"*. De 10%-actie geldt dus naar de letter alleen voor de eerste termijn. Reken voor jaar 2 e.v. op de lijstprijs: **$10,99 resp. $17,99 per gebruiker per maand = $131,88 resp. $215,88 per gebruiker per jaar.** Bron: <https://www.projectplan365.com/terms/> — 25 juli 2026. De daadwerkelijke afschrijving is niet te verifiëren zonder account (de checkout achter `/ups/Purchase/…` vereist inloggen).

Overige voorwaarden van de purchase-pagina:
- Alleen jaarabonnementen; geen maand-tot-maand.
- Per bewerkende gebruiker één abonnement: *"You need to purchase a subscription for each user that needs to edit the file"*.
- Read-only teamleden zijn gratis (binnen de tierlimiet van 5 resp. 10).
- Eén abonnement dekt meerdere apparaten en platformen — dat is echt gunstig (Windows + Mac + iPad + telefoon op één seat).
- **Volumekorting** bestaat maar is niet gepubliceerd: bij **11+ gebruikers** staat "contact us". *"The discount depends on the number of users."*
- **Geen minimum aantal seats**; de seat-keuzelijst op de purchase-pagina begint bij "1 user". Geverifieerd.
- Betaling: alle grote creditcards (**geen debitcards**) — Visa, MasterCard, Amex, Discover, Diners Club, JCB, Carte Bleue, Union Pay; wire transfer alleen bij orders boven een minimumbedrag.
- **Restitutie:** de voorwaarden zijn hard — *"Upon purchase, all sales are final. We do not offer refunds on digital download versions of our software."* (<https://www.projectplan365.com/terms/>). De proefperiode is expliciet bedoeld als het enige evaluatiemoment.

### Gratis tier / proefperiode

- **Geen permanent gratis tier** voor bewerken. Er is een gratis **viewer**-modus/product (Project Viewer 365) en een tijdelijke proef.
- Proefperiode: **de leverancier is hierover intern tegenstrijdig, en niet in de richting die eerder in dit profiel stond.** De feitelijke situatie op 25 juli 2026:
  - purchase-pagina/FAQ: *"We also offer a **30-day** free trial for the full functioning product in both the Standard and Business plans … without putting a credit card down."*
  - de eigen vergelijkingstabel (/comparison/) voert rijen *"Start **14-Day** Standard Trial"* en *"Start **14-Day** Business Trial"* voor het directe kanaal, *"App Store iOS – Start **30-Day** Trial"*, *"App Store Mac – Start **14-Day** Trial"* en *"Microsoft Store - Start **30-Day** Trial"*.
  - de Mac App Store-listing zelf zegt in de productomschrijving: *"Try Project Plan 365 with full functionalities free for **1 month**!"* — dus 30 dagen, niet 14.
  
  Er lopen dus twee proeflengtes door elkaar **binnen hetzelfde kanaal**; het is géén nette scheiding "web = 30, App Store = 14". Ga uit van 14 dagen en verifieer bij aanvang van de proef. Bronnen: projectplan365.com/purchase/, projectplan365.com/comparison/, apps.apple.com/us/app/project-plan-365/id742239304.
- **Automatische verlenging na de proef.** De FAQ: *"if you don't cancel your trial before it expires you will be automatically charged"*, en verlenging stopt alleen als je *"no later than 48 hours before the end of the current period"* opzegt. Geverifieerd op <https://www.projectplan365.com/faq/>.

### App-storeprijzen (afwijkend en hoger)

Deze zijn hard geverifieerd via de officiële Apple-metadata-API, 25 juli 2026:

| Kanaal | Product | Prijs |
|---|---|---|
| iOS App Store | Project Plan 365 — jaarabonnement | **$129,99 / jaar** |
| Mac App Store | Project Plan 365 — Standard | **$129,99 / jaar** |
| Mac App Store | Project Plan 365 — Business | **$199,99 / jaar** |
| Mac App Store | Project Viewer 365 — Advanced View | **$19,99 / jaar** |
| Mac App Store | Project Viewer 365 — Editor | **$129,99 / jaar** |
| Mac App Store | Project Viewer 365 — Business | **$199,99 / jaar** |

Bron: `itunes.apple.com/lookup?bundleId=com.Housatonic.ProjectPlan`, `itunes.apple.com/search?entity=macSoftware` en de productomschrijving op de Mac App Store-pagina, die de bedragen letterlijk bevestigt: *"Project Plan 365 subscriptions are offered on a yearly (1 year) basis for a price of $129.99 USD per year for the Standard Subscription and $199.99 USD per year for the Business Subscription."* Herverifieerd 25 juli 2026.

**Conclusie — genuanceerder dan eerder gesteld.** Tegenover de **eerstejaars actieprijs** is de App Store ~8% duurder ($129,99 vs. $119,88 Standard; $199,99 vs. $194,28 Business). Tegenover de **verlengprijs zonder actiekorting** is de App Store juist *goedkoper* ($129,99 vs. $131,88 Standard; $199,99 vs. $215,88 Business). Het advies "koop direct" geldt dus alleen voor het eerste jaar; over een meerjarige horizon ontlopen de kanalen elkaar nauwelijks. Let wel: de App Store hanteert Apples standaard opzegtermijn van 24 uur, de leverancier 48 uur.

### Enterprise / "lifetime" licentie

Dit is het antwoord op de vraag naar lifetime-licenties. Bron: <https://www.projectplan365.com/articles/purchase-enterprise-license/> — 25 juli 2026.

- De **Enterprise-licentie is een eeuwigdurende (perpetual) sitelicentie**, geen abonnement.
- Eerste betaling **inclusief één jaar onderhoud en support**; daarna jaarlijkse verlenging van onderhoud/support nodig (de software zelf blijft bruikbaar).
- **Alleen vanaf meer dan 100 gebruikers**: *"perpetual site licenses for more than 100 users."*
- Site-licentie, geen serverlicentie; de sleutel activeert op meerdere Windows- en Mac-apparaten zonder geografische beperking. **Belangrijke beperking, geverifieerd:** *"The perpetual licenses can be used only on Mac and Windows devices."* — de perpetual licentie dekt dus **niet** iOS, Android of web, terwijl "één seat dekt alle vijf platformen" juist een kernvoordeel van het abonnement is.
- Zonder doorlopend onderhoudscontract blijft de software werken, maar *"will not get access to latest releases or support unless the product is repurchase at full price"*.
- **Prijs niet gepubliceerd** — uitsluitend op offerte.
- Windows Server / Citrix / Terminal Server-installatie wordt eveneens alleen aangeboden bij **>100 Editor Users** (bron: systeemeisenpagina).

Er is dus **geen lifetime-optie voor individuen of kleine teams.** Wie als zzp'er of klein bureau een eenmalige aankoop zoekt, komt bij Project Plan 365 niet aan zijn trekken — dat is een verandering ten opzichte van hoe het product vroeger verkocht werd en een veelgehoorde klacht in de reviews.

### Benodigde add-ons

Geen aparte betaalde add-ons gevonden. Wel **feature-gating tussen Standard en Business** die in de praktijk als verplichte upgrade werkt.

De vergelijkingstabel op /comparison/ is machinaal uitgelezen (25 juli 2026): van de ~310 functieregels staan er **282 aangevinkt in béide plannen**. Slechts **16 productfuncties zijn echt Business-only** (de overige verschilrijen zijn koop-/verlengacties per plan, geen functionaliteit):

Global Settings · Export to My Calendar · **Enabling MPP for Real-Time Collaboration** · My Tasks · Task Notification · **Resource Leveling** · Manage Divisions · Restrict Project Editing · Team Member Planner Dialog · Work Schedule Calendar · Burndown Report · Portfolio Info · **Risk Management** · **S-Curve Report** · **Visual Reports** · **Master project and subprojects** · **Custom Views** · Enterprise Team Planner View

Twee correcties op de eerdere versie van dit profiel:

- **"Project Goals" is géén Business-only functie** — die rij staat in beide kolommen aangevinkt.
- **S-Curve Report en Visual Reports zijn wél Business-only.** Dat was eerder gemist en is voor een bouwplanner het pijnlijkst: de S-curve is precies het rapport waarom je deze tool zou kiezen. Onafhankelijk bevestigd door de Mac App Store-omschrijving: *"The Business Subscription unlocks all the Standard functionalities together with more powerful planning features: master and subprojects, risk management, visual reports, resource leveling and much more."*

**Wat Standard wél heeft** (aangevinkt in beide kolommen, geverifieerd): Critical Path, Baseline, Network Diagram, Tracking Gantt, Team Planner, Task Usage, Resource Usage, Earned Value Report, Cash Flow Report, Critical Tasks Report. De volledige CPM-kern zit dus in Standard.

Resource leveling, master projects, custom views, risicomanagement en de S-curve achter de duurdere tier zetten is agressief. Voor bouwplanning betekent het feitelijk dat **Business de enige realistische tier is** → reken op ~$194 (eerste jaar) tot ~$216 (verlenging) per gebruiker per jaar, niet op ~$120.

### Prijsvergelijking met de referentie

**[onzeker — niet verifieerbaar in deze ronde]** Microsoft Project Plan 3 (de tier met echte desktop-scheduling) staat naar verluidt op ongeveer $30/gebruiker/maand. Project Plan 365 Business op $16,19–$17,99 zou daarmee ruwweg de **helft** zijn, niet de door reseller United ADDins geclaimde *"6 times less expensive"* (die claim is wél geverifieerd aanwezig op unitedaddins.com en vergelijkt vermoedelijk met een oudere perpetual MS Project Professional-prijs).

**Voorbehoud:** de Microsoft-prijspagina's gaven bij herverificatie op 25 juli 2026 HTTP 403/404 en de zoekquota van deze sessie was uitgeput, dus het bedrag van ~$30 is **niet** onafhankelijk bevestigd. Behandel elke "helft van de prijs"-formulering in dit profiel (ook in §4 en §7) als onbevestigde orde-van-grootte, niet als prijsvergelijking.

---

## 4. Voordelen

1. **Echte CPM/PDM-engine met gedocumenteerde forward- en backward pass.** Dit is geen balkenschema-tekenaar. De leverancier publiceert het algoritme (topologische sortering, ES/EF, LS/LF, slack, daarna kosten/werk/resources) en implementeert alle acht constrainttypes en alle vier de relatietypes (FS/SS/FF/SF) met lead/lag. In een markt vol tools die "Gantt" zeggen en "takenlijst met datums" bedoelen, is dat een reëel en zeldzaam onderscheid.

2. **Native .mpp lezen én schrijven — het enige echte verkoopargument, en het werkt.** Geen import/export-tussenstap, geen conversieverlies-ritueel: het bestand ís het formaat. Ondersteuning geclaimd voor MS Project 2024, 2021, 2019, 2016, 2013, 2010, 2007, 2003 en ouder. Meerdere onafhankelijke App Store-reviewers bevestigen dit als het sterkste punt: *"Works directly with MPP files. Very solid tool."* en *"I use it on my MacBook and iPad and never have any problems sending it to [other PMs] or receiving MPP files."*

3. **Volwaardige macOS-oplossing waar Microsoft er geen levert.** Microsoft heeft nooit een native MS Project voor Mac uitgebracht. Voor Mac-gebruikers die in een .mpp-keten zitten is dit een van de weinige serieuze opties, en sinds Release 2026 is de Mac-versie geoptimaliseerd voor Apple Silicon.

4. **Eén seat dekt alle vijf platformen.** Windows, Mac, iOS, Android en web op één abonnement. Bij MS Project betaal je per omgeving en krijg je op mobiel niets vergelijkbaars. Voor een planner die op kantoor op Windows werkt en op de bouwplaats op iPad voortgang bijwerkt, is dit een concreet praktisch voordeel.

5. **Baselinemodel op MS Project-niveau: 11 baselines plus interim plans.** Met Variance-tabel, Tracking Gantt en Multiple Baselines Gantt. Voor vertragingsanalyse, claims en voortgangsrapportage in de bouw is dit precies de functionaliteit die je nodig hebt — en die de meeste "moderne" werkbeheertools volledig missen.

6. **Rapportagediepte: ~31 rapporttypen inclusief Earned Value, Cash Flow en S-Curve.** EVM en S-curves zijn de standaardvaluta van projectbeheersing in de bouw en bij overheidsopdrachten. Dat een tool van deze prijsklasse ze out-of-the-box levert, is ongebruikelijk. **Kanttekening:** Earned Value en Cash Flow zitten in beide tiers, maar S-Curve, Burndown en Visual Reports zijn Business-only.

7. **Compleet kalendermodel op vier niveaus** (base / project / task / resource), met werkdagen, werktijden en uitzonderingen, plus de MS Project-optie "scheduling ignores resource calendars". Dit is wat een planning correct laat rekenen rond vakanties, ploegendiensten en weekendwerk — precies waar zwakkere tools stukgaan.

8. **Prijs vermoedelijk ongeveer de helft van Microsoft Project Plan 3** — **[onzeker: de MS-prijs is in deze ronde niet verifieerbaar gebleken, zie §3]** — zonder Microsoft 365-tenant, zonder Project Online, zonder administratieve overhead. Read-only gebruikers zijn gratis (5 resp. 10), wat het verspreiden van een planning door een projectorganisatie goedkoop maakt.

9. **Twaalf talen, 20+ datumformaten, 100+ valuta.** Voor internationale of meertalige projectorganisaties is dat meer lokalisatie dan veel grotere concurrenten bieden.

10. **Aantoonbaar levend product met voorspelbare release-cadans.** Twaalf jaar continue ontwikkeling, jaarlijkse major releases (nieuwste: Release 2026, 1 april 2026), actuele mobiele builds (iOS 26.9, mei 2026). Geen zombieproduct.

---

## 5. Nadelen

Alle punten hieronder zijn onderbouwd met de publieke Apple App Store-reviewfeed (primaire gebruikersbron), de eigen documentatie van de leverancier, of beide.

1. **Stabiliteit en dataverlies.** Dit is het ernstigste patroon in de reviews. Letterlijk uit de App Store-feed: *"Nope Nope Nope"* — de app crashte bij het verwerken van terugkerende taken **en verwijderde daarbij het hele project**. Een andere gebruiker: *"I have to be really careful not to make it crash."* En: *"Full of bugs"* — Dropbox-sync bevriest, publiceren en exporteren lukt niet. Voor een tool waar het bestand de database ís (geen server-side versiegeschiedenis) is crashen met dataverlies een categoriaal risico, geen ongemak.

2. **Prestaties.** Herhaald en expliciet: *"Soooooooooooo slooooooooooooow ... COMPLETELY USELESS"*, *"It's great, when it works ... Does everything advertised at a snails pace."* Combineer dat met het volledig ontbreken van gepubliceerde performance- of schaalcijfers, en je moet aannemen dat grote planningen problematisch zijn. Test met je eigen grootste .mpp vóór aanschaf.

3. **Licentie- en facturatieproblemen zijn een structureel klachtenthema, geen incident.** Reviewtitels spreken voor zich: *"Purchased but Keep saying TRIAL Period is OVER!. Scam???!"*, *"Doesn't work!!!"* (betaald abonnement wordt niet herkend), *"Bait and switch again"*, *"Like so many things you can't figure out how much it costs unless you download"*. Op de Microsoft Learn-community staan meldingen van automatische afschrijving na de proefperiode en dubbele afschrijvingen. De eigen FAQ voegt daaraan toe: automatische verlenging tenzij je **uiterlijk 48 uur** vóór het einde van de periode opzegt, en — veelzeggend — *"Once a dispute or chargeback is initiated with your bank ... we are no longer permitted to issue a refund."* Dat is een leverancier die zich op restitutiegeschillen heeft ingericht.

4. **Een aantal planningsfuncties zit achter de duurdere tier.** Resource leveling, master projects/subprojects, custom views, risicomanagement, portfolio-info, S-Curve, Burndown, Visual Reports en realtime samenwerking zijn Business-only. Wie Standard koopt in de veronderstelling een volledige MS Project-vervanger te hebben, ontdekt dat planner-basisfuncties als resource leveling en de S-curve ontbreken.

   **Correctie op een eerdere formulering in dit profiel: "effectief is Standard een viewer-plus" is onjuist.** Machinale uitlezing van de vergelijkingstabel laat zien dat 282 van de ~310 functieregels in béide tiers zitten, inclusief de volledige CPM-kern: Critical Path, Baseline, Network Diagram, Tracking Gantt, Team Planner, Task/Resource Usage, Earned Value en Cash Flow. Standard is een volwaardige netwerkplanner; het mist 16 specifieke functies, waarvan er vijf à zes voor bouwplanning zwaar wegen. Dat is een reëel bezwaar, maar een ander bezwaar dan "viewer-plus".

5. **Resource leveling is zwak, zelfs in Business.** De leverancier documenteert het zelf: werkt niet op taken met voortgang > 0%, lost 200%-toewijzingen niet op, lost overallocatie op summary tasks niet op, negeert deadlines (*"Project Plan 365 does not take care of deadlines when performing resource leveling"*), en past duur/werk niet aan. Geen "level within slack", geen instelbare leveling order. Voor resource-gedreven planning is dit onvoldoende.

6. **Geen ondersteuning voor meerdere kritieke paden.** *"We are sorry, but at this point, you cannot have multiple Critical Paths in one project."* Bij master/subproject-structuren of meerdere onafhankelijke netwerken binnen één plan — de norm bij grotere bouwprojecten — mis je de per-netwerk-kritiekpadanalyse die MS Project en P6 wel bieden.

7. **Realtime samenwerking is beperkt en vendor-lock-in.** Alleen als het bestand in de eigen Drive 365 staat (dus níet in je eigen SharePoint of OneDrive), maximaal 10 gelijktijdige gebruikers, row-level locking in plaats van echte gelijktijdige bewerking, een inactiviteitstimeout die je uit het bestand gooit, en outlining/sorteren/filteren/opmaak synchroniseren niet. Alleen in Business.

8. **Geen API, geen automatisering, geen macro's.** In de volledige "Other Features"-documentatie ontbreekt elke vermelding van een REST-API, webhooks, SDK, VBA-equivalent of scriptbaarheid. Wat er wél is: een AI-chatbot (Erix), een browserextensie en Siri-shortcuts. Voor integratie in een bredere toolketen — kostenkalkulatie, ERP, BIM — betekent dit: bestandsuitwisseling of niets.

9. **Documentatie en systeemeisen zijn verouderd en soms tegenstrijdig.** De systeemeisenpagina noemt in 2026 nog Windows XP, Windows Server 2003, Internet Explorer 8, iOS 7.1, Android 4.1 en 512 MB RAM — terwijl de werkelijke App Store-builds minimaal iOS 15.0 en macOS 12.0 vereisen. De proefperiode is op de ene pagina 30 dagen en op de andere 14, en die tegenstrijdigheid loopt dwars door dezelfde kanalen heen (zie §3). Dat bemoeilijkt due diligence en is een signaal over de operationele volwassenheid van de leverancier.

    **Twee punten uit de eerdere versie vervallen hier:** (a) de prijspagina is *niet* omgekeerd — het tweede bedrag is een doorgestreepte lijstprijs met een expliciete "10 % off"-actie erop; (b) de klantenclaims "honderden bedrijven" en "20.000+" zijn niet gelijktijdig — de eerste is gedateerd 2019/2020 in een tijdlijn. Beide waren leesfouten, geen leverancierstegenstrijdigheden.

10. **Zwakke onafhankelijke reputatie — en op Android ronduit slecht.** iOS-app: **3,29 sterren over 41 beoordelingen** (geverifieerd). De Mac App Store-versie heeft **nul** beoordelingen (geverifieerd).

    **Gecorrigeerd:** Google Play staat niet op "circa 3,4 sterren" maar op **2,21 sterren over 444 beoordelingen** (`aggregateRating.ratingValue = 2.2142856`, `ratingCount = 444`, uitgelezen uit de schema.org-JSON van de Play-listing, 25 juli 2026). Dat verandert het beeld op twee manieren: (a) de Android-waardering is *ver* onder de drempel die je normaal als acceptabel beschouwt — 2,2★ is het domein van "werkt niet"; (b) het reviewvolume is met 444 beoordelingen tien keer groter dan op iOS, dus dit is het **best onderbouwde** reputatiesignaal in dit hele profiel, geen bijvangst. De eerdere formulering "dun reviewvolume" gold voor iOS/Mac, niet voor Android. Op Reddit (r/projectmanagement) luidt het commentaar: *"the ProjectPlan365 product offers basic functionality for project schedules and Gantt view. The product is not intuitive..."* **[één bron — via zoeksnippet, thread niet direct toegankelijk]**. De testimonials op de eigen site zijn zelfgeselecteerd: *"The above feedback is selected from support tickets and feedback form."* Voor een product van 12 jaar oud is dit opvallend weinig onafhankelijke validatie — een teken van een kleine actieve gebruikersbasis.

11. **Support wordt als zwak ervaren.** *"No support, just starting out and no support, videos, not addressing the issues"* (1 ster). Dat staat tegenover de claim van een "24/7 Help & Support"-team. Er is wel een uitgebreide artikelenbibliotheek en een YouTube-kanaal.

12. **Geen lifetime/perpetual optie onder 100 gebruikers.** Voor zzp'ers en kleine bureaus die juist wegvluchten voor Microsofts abonnementsmodel, biedt Project Plan 365 exact hetzelfde model — abonnement, jaarlijks, automatisch verlengd. De perpetual sitelicentie begint pas boven 100 gebruikers en is alleen op offerte.

---

## 6. Interoperabiliteit

Dit is voor de opdrachtgever (open-source, IFC-gebaseerde planner) het meest bepalende hoofdstuk.

### Ondersteunde formaten

Bron: <https://www.projectplan365.com/onlinehelp/import-export/> — geraadpleegd 25 juli 2026.

| Formaat | Import | Export | Opmerking |
|---|---|---|---|
| **MPP** (Microsoft Project binair) | ✅ (native openen) | ✅ (native opslaan) | Kernfunctie; versies 2003 t/m 2024 |
| **XML / MSPDI** (Microsoft Project XML) | ✅ | ✅ | Het enige gestructureerde uitwisselingsformaat |
| **Excel / CSV** | ✅ | ✅ | Platte tabel; netwerkstructuur gaat grotendeels verloren |
| **Smartsheet** | ✅ | ❌ | |
| **MindManager** | ✅ | ❌ | |
| **XMind** | ✅ | ❌ | |
| **PDF** | ❌ | ✅ | Presentatie |
| **Afbeelding (PNG/JPG)** | ❌ | ✅ | Presentatie |
| **PowerPoint / Word** | ❌ | ✅ | Presentatie |
| **Dashboard / My Calendar** | ❌ | ✅ | |

### Wat er níet is — en dat is veel

- **Primavera P6 XER: NIET ondersteund.** Nergens in de documentatie, importlijst of exportlijst.
- **Primavera P6 XML: NIET ondersteund.**
- **IFC 4.3 (IfcWorkSchedule / IfcTask / IfcWorkPlan / IfcRelAssignsToProcess): NIET ondersteund.** Er is geen enkele vermelding van IFC, buildingSMART, BIM of 4D — ook niet op de dedicated bouw-oplossingspagina, waar je het zou verwachten.
- **BCF, COBie, gbXML: NIET ondersteund.**
- **4D-koppeling naar een BIM-model: NIET aanwezig.** Geen Synchro-, Navisworks-, Bexel- of Solibri-integratie.
- **Publieke API (REST/GraphQL), webhooks, SDK: NIET gedocumenteerd.**
- **Macro's/VBA of scripting: NIET gedocumenteerd.**

### Praktische betekenis voor een IFC-gebaseerde open-source planner

**Project Plan 365 is geen partner in de BIM-keten — het is een eindpunt in de MS Project-keten.**

De enige zinvolle interoperabiliteitsroute is via **MSPDI (Microsoft Project XML)**. Dat is goed nieuws in één opzicht: MSPDI is een open, gedocumenteerd XML-schema van Microsoft, met een volledige representatie van taken, relaties (inclusief type en lag), kalenders, resources, toewijzingen, baselines en constraints. Wie een open-source planner bouwt en compatibiliteit met de MS Project-wereld wil, moet **MSPDI-import/-export bouwen** — niet MPP-binair, dat is een gesloten, reverse-engineerd formaat.

Concrete implicaties:

1. **MSPDI is de brug.** Via MSPDI kan een IFC-planner data uitwisselen met Project Plan 365, MS Project, en (via converters) met P6. Het schema mapt redelijk goed op `IfcTask` / `IfcTaskTime` / `IfcRelSequence` (met `SequenceType` voor FS/SS/FF/SF en `TimeLag`) en `IfcWorkCalendar` / `IfcWorkTime`. De semantische afstand is beperkt: beide modellen kennen ES/EF/LS/LF, float, constrainttypes en kalenders.
2. **Verliespunten bij MSPDI-round-trip [schatting]:** custom fields, opmaak/weergaven, split-taken en interim plans zullen niet schoon overleven. Baselines 1–10 zijn wél in MSPDI gedefinieerd.
3. **CSV/Excel is géén alternatief.** Het verliest de netwerkstructuur; je houdt een lijst met datums over, geen planning.
4. **Er is geen enkele weg van IFC naar Project Plan 365 en terug.** Wie een IFC-gebaseerde planning heeft en die aan een Project Plan 365-gebruiker wil geven, moet die naar MSPDI serialiseren. Andersom evenzo.
5. **Voor de open-source planner is dit eerder kans dan bedreiging.** Project Plan 365 bezet de niche "goedkoop MPP openen op elk platform". Een IFC-native planner bezet een niche die Project Plan 365 volledig leeg laat: model-gekoppelde 4D-planning. Ze concurreren niet direct; ze zouden via MSPDI kunnen samenleven. De les uit dit profiel is vooral **welk functioneel niveau je CPM-engine moet halen** om serieus genomen te worden: alle vier relatietypes, alle acht constraints, viertraps-kalendermodel, deadlines, task types, en 10+ baselines. Dat is de lat.

---

## 7. Marktpositie

### Waar het sterk staat, en waarom

Project Plan 365 heeft **één verdedigbare positie**, en die is smal maar reëel: **native .mpp-bewerking op platformen waar Microsoft niets levert, tegen een substantieel lagere prijs** (de precieze verhouding tot MS Project Plan 3 is in deze ronde niet verifieerbaar gebleken — zie §3).

Die positie bestaat door een structurele gril van de markt:

- Microsoft levert **geen** MS Project voor macOS. Al 30 jaar niet.
- Microsoft levert **geen** volwaardige MS Project voor iOS/Android.
- Het .mpp-formaat is desondanks de de-facto uitwisselingsstandaard in grote delen van de bouw, defensie, engineering en overheid.
- Er zit dus een permanente groep gebruikers klem: ze *moeten* met .mpp werken maar zitten op het verkeerde platform of hebben het budget niet.

Project Plan 365 bedient exact die klem. Het is geen visie op projectmanagement — het is een compatibiliteitsproduct. En daar is niets mis mee: het is een duurzame niche omdat Microsoft hem al decennia niet dicht.

### Belangrijkste concurrenten

| Categorie | Spelers | Verhouding |
|---|---|---|
| **De referentie** | Microsoft Project (Plan 1/3/5), Project for the Web | Het product dat Project Plan 365 imiteert. Verliest op functiediepte, wint op prijs en platformdekking. |
| **Directe MPP-alternatieven** | ProjectLibre, GanttProject, ProjectPlan/Steelray, MOOS Project Viewer | ProjectLibre is gratis/open source en leest MPP, maar staat al jaren zo goed als stil en heeft geen mobiel. Project Plan 365 wint op polish en platformdekking, verliest op prijs (ProjectLibre kost niets). |
| **Mac-planners** | Merlin Project (ProjectWizards), OmniPlan (Omni Group) | Beide beter geïntegreerd in macOS en beter beoordeeld (OmniPlan 3,85★). Beide zwakker in .mpp-round-trip. Merlin Project verscheen in dezelfde Mac App Store-zoekresultaten. |
| **Zware CPM** | Oracle Primavera P6, Asta Powerproject, TILOS, Deltek Acumen | Andere klasse en andere prijs. Voor grote infra/bouw is dit de echte concurrentie — en Project Plan 365 speelt daar niet mee. |
| **Werkbeheer/Gantt-lookalikes** | monday.com, Smartsheet, Wrike, ClickUp, Asana, Teamhood | Winnen op UX, samenwerking en marketing; verliezen categorisch op planningsdiepte (geen echte CPM). Op Reddit wordt Wrike als alternatief aanbevolen bóven Project Plan 365 — tekenend voor hoe de markt beweegt. |
| **BIM/4D** | Synchro (Bentley), Navisworks TimeLiner, Bexel Manager, Vico | Volledig andere as. Project Plan 365 is hier afwezig. |

### Trend

**[schatting, gebaseerd op de verzamelde signalen]** De positie is stabiel maar krimpend aan de randen, om drie redenen:

1. **De .mpp-hegemonie brokkelt af.** Nieuwe organisaties standaardiseren steeds vaker op cloud-werkbeheer of, in zware bouw, op P6. De groep die "moet .mpp openen" is verzadigd en vergrijst.
2. **Microsofts eigen cloudkoers.** Project for the Web / Planner Premium maken .mpp minder centraal — wat de niche op termijn ondergraaft, hoewel het Mac-gat blijft.
3. **AI-positionering als reactie, niet als strategie.** De investeringen sinds 2019 (Erix AI-assistent, ChatGPT-integratie, AI-projectcreatie, browserextensie) lezen als een poging tot relevantie in een markt waar de kernfunctie een commodity wordt. Het zijn geen investeringen in de schedulingengine.

Tegelijk: het product is 12 jaar oud, wordt nog altijd twee keer per jaar bijgewerkt, en de niche wordt door niemand anders goed bediend. Verdwijnen doet het voorlopig niet.

### Gebruikersaantallen en omzet

- Geen gepubliceerde financiële cijfers. Privaat gehouden, geen bekende financieringsrondes.
- Claims: "TRUSTED BY 20,000+ HAPPY CUSTOMERS WORLDWIDE" (homepage, geverifieerd) versus "hundreds of companies worldwide" (About, geverifieerd). **Nuance t.o.v. de eerdere versie:** die twee zijn minder hard strijdig dan gesteld — de About-zin staat in een chronologisch overzicht en is expliciet gedateerd (*"In 2019 / 2020 Project Plan 365 is used by hundreds of companies worldwide, and on thousands of platforms and devices"*). Het is een historische mijlpaal, geen actuele tegenspraak. Beide blijven onverifieerbare marketingcijfers.
- Harde signalen wijzen op **klein tot middelgroot in downloads, klein in betalende basis**: 41 iOS-beoordelingen, **444** Google Play-beoordelingen (2,21★), nul Mac App Store-beoordelingen, geen vindbare G2/Capterra/TrustRadius-aanwezigheid van betekenis, één magere Reddit-thread. De 444 Android-beoordelingen suggereren een bredere (grotendeels gratis/viewer-)gebruikersbasis dan eerder aangenomen; het zegt niets over betalende seats.
- **[schatting]** Op basis van reviewvolume, afwezigheid op reviewplatforms en de omvang van de operatie schat ik de actieve betalende basis op **enkele duizenden seats wereldwijd** en de jaaromzet op de **lage enkele miljoenen USD**. Dit is een ruwe indicatie zonder harde onderbouwing en mag niet als feit worden overgenomen.

---

## 8. Eindoordeel

### Is dit een serieus alternatief voor klassieke CPM-tools?

**Technisch: ja, verrassend genoeg.** Project Plan 365 is een echte netwerkplanner. Gedocumenteerde forward/backward pass over een precedentiegraaf, alle vier de relatietypes, alle acht constrainttypes, lead/lag, viertraps-kalendermodel, task types en modes, 11 baselines met interim plans, total slack, EVM- en S-curve-rapportage. Wie dit afdoet als "weer een Gantt-tool" heeft de documentatie niet gelezen. Op zuiver functioneel niveau doet het meer echte planning dan monday.com, Asana, ClickUp, Wrike en Smartsheet bij elkaar.

**Operationeel: met stevige reserves.** De reviews vertellen een consistent verhaal van traagheid, crashes — inclusief minstens één gemeld geval van volledig projectverlies — en licentie-/facturatiefrictie. Er is geen API, geen scriptbaarheid, geen gepubliceerde schaalbaarheid, en de eigen documentatie is op punten jaren achterhaald. Dat is het profiel van een klein team dat een groot productoppervlak onderhoudt.

### Voor wie wél

- **Mac- en mobiele gebruikers die vastzitten in een .mpp-keten.** Dit is de kernklant en hier is het product bijna onvervangbaar.
- **Kleine en middelgrote organisaties met één tot vijf planners** die MS Project-functionaliteit nodig hebben tegen de helft van de prijs, met planningen tot enkele duizenden taken.
- **Onderaannemers, leveranciers en adviseurs** die planningen van een opdrachtgever moeten lezen en beperkt bewerken, zonder een volledige MS Project-stack.
- **Organisaties die zowel Windows als Mac als veldtablets bedienen** — één seat dekt alles, dat is uniek.
- **Projecten waar EVM, S-curves en baselinevergelijking vereist zijn** maar het budget van P6 niet beschikbaar is.

### Voor wie níet

- **Grote bouw- en infraplanningen.** Tienduizenden activiteiten, meerdere kritieke paden, zware resource-leveling, multi-projectportfolio's: hier zit P6 of Asta Powerproject, en Project Plan 365 haalt het niet — noch qua schaal, noch qua levelingdiepte, noch qua ontbrekende multi-critical-path.
- **Iedereen die XER of P6 XML moet uitwisselen.** Volledig afwezig. In de zware bouw is dat een showstopper.
- **BIM-gedreven organisaties.** Geen IFC, geen 4D, geen modelkoppeling. Nul.
- **Teams die integratie en automatisering nodig hebben.** Geen API, geen webhooks, geen macro's. Bestandsuitwisseling of niets.
- **Organisaties met strenge eisen aan stabiliteit en dataveiligheid.** File-centric architectuur plus gerapporteerde crashes met dataverlies plus geen server-side versiegeschiedenis is een risicocombinatie die je in een gereguleerde omgeving niet wilt.
- **Grote gelijktijdige teams.** Realtime samenwerking stopt bij 10 gebruikers, vereist de eigen Drive 365 en synchroniseert lang niet alles.
- **Wie een eenmalige aankoop zoekt.** Perpetual bestaat alleen boven 100 gebruikers.

### Relevantie voor een open-source, IFC-gebaseerde planner

Drie conclusies:

1. **Geen directe concurrent.** Project Plan 365 concurreert om "goedkoop .mpp op elk platform". Een IFC-native planner concurreert om "planning gekoppeld aan het bouwmodel". Die markten raken elkaar nauwelijks.
2. **Wel de functionele lat.** Dit profiel laat zien wat een gebruiker anno 2026 minimaal verwacht van iets dat zich planner noemt: vier relatietypes, acht constraints, lead/lag, viertraps-kalenders, task types en modes, deadlines, ES/EF/LS/LF met total en free float, en meerdere baselines met varianties. Een CPM-engine die daar onder blijft, wordt niet serieus genomen door de doelgroep.
3. **MSPDI is de enige zinvolle brug.** Niet MPP-binair (gesloten), niet CSV (verliest de structuur). Wie interoperabiliteit met de MS Project-wereld wil — en dus ook met Project Plan 365 — bouwt MSPDI-import/-export. De mapping naar `IfcTask`/`IfcTaskTime`/`IfcRelSequence`/`IfcWorkCalendar` is haalbaar; `IfcRelSequence.SequenceType` dekt FS/SS/FF/SF en `TimeLag` dekt lead/lag.

**Samenvattend oordeel:** een technisch degelijke, functioneel verrassend complete MS Project-kloon met een echte CPM-engine, tegen ongeveer de helft van de prijs en op vijf platformen — maar geleverd door een kleine leverancier met merkbare kwaliteits-, prestatie- en facturatieproblemen, zonder API, zonder P6-uitwisseling, en zonder enige BIM/IFC-connectie. Een prima keuze in zijn niche. Geen kandidaat voor zware bouwplanning of voor een modelgedreven werkwijze.

---

## Bronnen

Alle bronnen geraadpleegd op **25 juli 2026** tenzij anders vermeld.

### Leverancier — product en bedrijf
1. Project Plan 365 — homepage: <https://www.projectplan365.com/>
2. Housatonic Software — bedrijfssite: <https://www.housatonic.com/>
3. Over ons / historie: <https://www.projectplan365.com/about/>
4. Enterprise solutions: <https://www.housatonic.com/enterprise_solutions.html>
5. Functies: <https://www.projectplan365.com/features/>
6. MS Project-alternatief (positionering): <https://www.projectplan365.com/ms-project-alternative/>
7. Bouwoplossing: <https://www.projectplan365.com/solutions/construction/>
8. Klantenreviews (zelfgeselecteerd): <https://www.projectplan365.com/reviews/>
9. What's New / releasehistorie: <https://www.projectplan365.com/whatsnew/>
10. Systeemeisen: <https://www.projectplan365.com/system-requirements/>
11. Support-overzicht: <https://www.projectplan365.com/support/>
12. FAQ: <https://www.projectplan365.com/faq/>

### Leverancier — prijzen en licenties
13. Purchase / prijzen: <https://www.projectplan365.com/purchase/>
14. Vergelijking Standard vs. Business: <https://www.projectplan365.com/comparison/>
15. Sales & billing help-index: <https://www.projectplan365.com/onlinehelp/sales-billing/>
16. Enterprise (perpetual site) licentie: <https://www.projectplan365.com/articles/purchase-enterprise-license/>
17. Standard-abonnement kopen: <https://www.projectplan365.com/articles/purchase-standard-subscription/>

### Leverancier — technische documentatie (schedulingbewijs)
18. Online help-index: <https://www.projectplan365.com/onlinehelp/>
19. **Scheduling Engine** (forward/backward pass, PDM): <https://www.projectplan365.com/articles/scheduling-engine/>
20. **Critical Path** (total slack = 0; geen meerdere kritieke paden): <https://www.projectplan365.com/articles/critical-path>
21. **Apply Constraints** (alle 8 types): <https://www.projectplan365.com/articles/apply-constraints>
22. **Lead and Lag Times**: <https://www.projectplan365.com/articles/lead-and-lag-times/>
23. **Link/Unlink Tasks** (FS/SS/FF/SF letterlijk bevestigd): <https://www.projectplan365.com/articles/link-unlink-tasks/>
24. **Baseline** (Baseline 1–10, interim plans, Variance/Tracking Gantt): <https://www.projectplan365.com/articles/baseline>
25. **Resource Leveling** (met gedocumenteerde beperkingen): <https://www.projectplan365.com/articles/resource-leveling>
26. Task Information (tabbladen, WBS, custom fields, deadlines): <https://www.projectplan365.com/articles/task-information/>
27. Scheduling help-sectie: <https://www.projectplan365.com/onlinehelp/scheduling/>
28. Taken help-sectie: <https://www.projectplan365.com/onlinehelp/tasks/>
29. Kalender help-sectie: <https://www.projectplan365.com/onlinehelp/calendar/>
30. Team/resources help-sectie: <https://www.projectplan365.com/onlinehelp/team/>
31. Rapporten help-sectie (31 rapportartikelen geteld; EVM, S-Curve, Cash Flow): <https://www.projectplan365.com/onlinehelp/reports/>
32. **Import/Export** (volledige formaatlijst — bewijs van ontbreken XER/P6/IFC): <https://www.projectplan365.com/onlinehelp/import-export/>
33. Share/collaboratie help-sectie: <https://www.projectplan365.com/onlinehelp/share/>
34. Realtime samenwerking (max. 10 gebruikers, Drive 365-vereiste): <https://www.projectplan365.com/articles/enabling-mpp-for-real-time-collaboration/>
35. Other Features (bewijs van ontbreken API/macro's): <https://www.projectplan365.com/onlinehelp/other-features/>

### Onafhankelijke bronnen — apps, ratings en gebruikersreviews
36. Apple App Store — productmetadata (iOS): `https://itunes.apple.com/lookup?bundleId=com.Housatonic.ProjectPlan&country=us` — rating 3,29★ / 41 beoordelingen; versie 26.9 (4 mei 2026); eerste release 18 nov. 2013; verkoper Viewer Central Inc; IAP $129,99/jaar
37. Apple App Store — **publieke reviewfeed** (primaire klachtenbron): `https://itunes.apple.com/us/rss/customerreviews/id=742239541/sortBy=mostRecent/json`
38. Mac App Store — productmetadata en IAP-prijzen: `https://itunes.apple.com/search?term=project+plan+365&entity=macSoftware` — Standard $129,99/jr, Business $199,99/jr; Project Viewer 365 $19,99 / $129,99 / $199,99 per jaar
39. iOS App Store-productpagina: <https://apps.apple.com/us/app/project-plan-365/id742239541>
40. Mac App Store-productpagina: <https://apps.apple.com/us/app/project-plan-365/id742239304>
41. Google Play — Project Plan 365 (`com.housatonic.pp365`), **2,21★ over 444 beoordelingen** (schema.org-`aggregateRating`, geverifieerd 25 juli 2026): <https://play.google.com/store/apps/details?id=com.housatonic.pp365>
42. Reddit r/projectmanagement — "Has anyone ever used ProjectPlan365?" **[één bron, via zoeksnippet; thread niet direct toegankelijk vanuit deze omgeving]**: <https://www.reddit.com/r/projectmanagement/comments/13s70xn/has_anyone_ever_used_projectplan365/>
43. Microsoft Learn Community — meldingen van automatische en dubbele afschrijvingen na proefperiode **[via zoeksnippet]**
44. United ADDins (reseller) — licentieprogramma's en "6 times less expensive"-claim: <https://www.unitedaddins.com/product/project-plan-365/>
45. The Digital Project Manager — Project Plan 365 review **[niet toegankelijk: HTTP 403]**: <https://thedigitalprojectmanager.com/tools/project-plan-365-review/>

### Niet toegankelijk tijdens dit onderzoek
De volgende bronnen konden niet worden opgehaald (403 / 404 / CAPTCHA) en zijn daarom **niet** in de conclusies verwerkt: G2 (<https://www.g2.com/products/project-plan-365/reviews>), Capterra, TrustRadius (<https://www.trustradius.com/products/project-plan-365/reviews>), Gartner Peer Insights, GetApp, Software Advice, SourceForge, Slashdot, Trustpilot en FinancesOnline. Bij een vervolgronde met beschikbare zoekquota verdienen deze prioriteit, met name om het reviewbewijs in hoofdstuk 5 breder te onderbouwen dan de App Store-feed.

---

## Verificatie

**Adversariële fact-check, 25 juli 2026.** Doel was niet bevestigen maar *weerleggen*: elke bewering hieronder is actief aangevallen met de ruwe HTML/JSON van de primaire bron in plaats van met een samenvatting. Methode: directe HTTPS-fetches met machinale parsing (regex over `<del>`-tags, uitlezen van de `<tr>`-structuur van de vergelijkingstabel, schema.org-JSON van de app stores). De WebSearch-quota van deze sessie was uitgeput, waardoor secundaire/onafhankelijke reviewbronnen en de Microsoft-prijspagina's niet konden worden geraadpleegd — zie de twee `onzeker`-regels.

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 1 | Standard $9,99 en Business $16,19 per gebruiker/maand; $10,99 resp. $17,99 als tweede bedrag | **bevestigd** — en de eerdere twijfel is weggenomen: het tweede bedrag staat in een `<del>`-tag (doorstreepte lijstprijs) en de Business-kaart draagt een `10 % off`-lint; $17,99 × 0,9 = $16,19 exact | <https://www.projectplan365.com/purchase/> (ruwe HTML) |
| 2 | "De prijspagina zet de bedragen in een logisch omgekeerd ogende volgorde — verifieer bij de leverancier" | **gecorrigeerd** — er is niets omgekeerd; het is een normale doorgestreepte-lijstprijs met actiekorting. Waarschuwing verwijderd | idem |
| 3 | Jaarbedrag $119,88 resp. $194,28 per gebruiker | **bevestigd voor het eerste jaar**, maar **onvolledig**: de voorwaarden sluiten de actiekorting uit bij verlenging (*"excluding any discount or other promotional offer provided for the first Subscription Plan"*), dus jaar 2 e.v. is $131,88 resp. $215,88. Toegevoegd | <https://www.projectplan365.com/terms/> |
| 4 | Abonnement, alleen jaarlijks, per bewerkende gebruiker | **bevestigd** — *"We sell our product only with annual subscription"* en *"You need to purchase a subscription for each user that needs to edit the file"* | <https://www.projectplan365.com/purchase/> |
| 5 | 5 resp. 10 gratis read-only gebruikers inbegrepen | **bevestigd** — *"Up to 5 / Up to 10 Read-Only users per subscription"* | idem |
| 6 | Geen minimum aantal seats | **bevestigd** — seat-keuzelijst begint bij "1 user" | idem |
| 7 | Volumekorting vanaf 11 gebruikers uitsluitend op offerte | **bevestigd** — keuzelijst eindigt op "11+ users contact us"; *"The discount depends on the number of users… Please contact us"*. Geen gepubliceerde staffel; de prijs op de pagina verandert niet met het gekozen aantal | idem |
| 8 | App Store duurder: iOS $129,99/jr, Mac Standard $129,99/jr, Mac Business $199,99/jr | **bevestigd** (dubbel: IAP-blok én productomschrijving) — maar de conclusie "koop direct, 8–10% duurder" is **gecorrigeerd**: dat geldt alleen jaar 1; tegenover de verlengprijs is de App Store juist goedkoper | <https://apps.apple.com/us/app/project-plan-365/id742239304> |
| 9 | Geen permanent gratis tier | **bevestigd** — alleen Project Viewer 365 en een tijdelijke proef | <https://www.projectplan365.com/purchase/> |
| 10 | Proefperiode 30 dagen (web) of 14 dagen (App Store) | **gecorrigeerd** — de tegenstrijdigheid bestaat, maar niet langs die scheidslijn: purchase-FAQ zegt 30 dagen, de eigen vergelijkingstabel zegt 14 dagen voor het *directe* kanaal en 30 dagen voor iOS App Store én Microsoft Store, en de Mac App Store-listing zegt *"free for 1 month"* | <https://www.projectplan365.com/comparison/>, <https://apps.apple.com/us/app/project-plan-365/id742239304> |
| 11 | Lifetime/perpetual alleen als Enterprise-sitelicentie vanaf >100 gebruikers, prijs op aanvraag, eerste jaar onderhoud inbegrepen | **bevestigd**, letterlijk: *"We offer perpetual site licenses for more than 100 users"* en *"In the first payment, it is included one year of free maintenance and support"*. **Aanvulling:** *"The perpetual licenses can be used only on Mac and Windows devices"* — geen mobiel/web | <https://www.projectplan365.com/articles/purchase-enterprise-license/> |
| 12 | Business is de enige realistische tier: resource leveling, master projects, custom views, risicomanagement en realtime samenwerking zijn Standard-uitgesloten | **bevestigd** door machinale uitlezing van de vergelijkingstabel (Standard-kolom leeg, Business-kolom aangevinkt), onafhankelijk herbevestigd door de Mac App Store-omschrijving. **Aangevuld:** ook S-Curve Report, Visual Reports, Burndown Report, Task Notification en My Tasks zijn Business-only. **Gecorrigeerd:** "Project Goals" staat wél in beide tiers | <https://www.projectplan365.com/comparison/> |
| 13 | "Effectief is Standard een viewer-plus" | **gecorrigeerd — onjuist.** 282 van ~310 functieregels staan in beide tiers, inclusief Critical Path, Baseline, Network Diagram, Tracking Gantt, Earned Value en Cash Flow. Standard is een volwaardige netwerkplanner met 16 ontbrekende functies | idem |
| 14 | Echte CPM-engine: PDM, forward pass met topologische sortering, backward pass, slack | **bevestigd**, letterlijk geciteerd | <https://www.projectplan365.com/articles/scheduling-engine/> |
| 15 | Alle vier relatietypes FS/FF/SS/SF, met lead als negatieve lag | **bevestigd**, letterlijk | <https://www.projectplan365.com/articles/link-unlink-tasks/> |
| 16 | Kritiek pad op total slack = 0; géén meerdere kritieke paden | **bevestigd**, letterlijk: *"you cannot have multiple Crtical Paths in one project"* (spelfout in origineel) | <https://www.projectplan365.com/articles/critical-path> |
| 17 | Resource leveling zwak: niet bij %Complete > 0, niet bij 200%-toewijzing, niet op summary tasks, negeert deadlines, past duur/werk niet aan | **bevestigd**, alle vijf letterlijk | <https://www.projectplan365.com/articles/resource-leveling> |
| 18 | Realtime samenwerking: max. 10 gelijktijdige gebruikers, vereist Drive 365, Business-only | **bevestigd**, letterlijk | <https://www.projectplan365.com/articles/enabling-mpp-for-real-time-collaboration/> |
| 19 | Geen XER, geen P6 XML, geen IFC/BIM/4D in import/export | **bevestigd** — nul treffers voor XER, Primavera, P6, IFC, buildingSMART, BIM en 4D in de volledige import/export-help; ook de bouw-oplossingspagina noemt alleen XLS/XLSX/CSV/XML | <https://www.projectplan365.com/onlinehelp/import-export/> |
| 20 | 35 rapporttypen | **gecorrigeerd** naar ~31 — de rapporten-index telt 31 afzonderlijke rapportartikelen | <https://www.projectplan365.com/onlinehelp/reports/> |
| 21 | iOS 3,29★ / 41 beoordelingen; Mac nul beoordelingen; verkoper Viewer Central Inc | **bevestigd** — `averageUserRating 3.29268`, `userRatingCount 41`, Mac 0/0, `sellerName "Viewer Central Inc"` | `itunes.apple.com/lookup?id=742239541` en `?id=742239304` |
| 22 | Google Play "circa 3,4 sterren" | **gecorrigeerd — feitelijk onjuist.** Werkelijk **2,21★ over 444 beoordelingen** (`ratingValue 2.2142856`, `ratingCount 444`). Zowel de score als het volume weken sterk af; dit is het best onderbouwde reputatiesignaal in het profiel | <https://play.google.com/store/apps/details?id=com.housatonic.pp365> (schema.org-JSON) |
| 23 | Automatische verlenging tenzij 48 uur vooraf opgezegd; geen restitutie na chargeback | **bevestigd**, beide letterlijk. **Aangevuld met een strengere clausule:** *"Upon purchase, all sales are final. We do not offer refunds on digital download versions of our software."* | <https://www.projectplan365.com/faq/>, <https://www.projectplan365.com/terms/> |
| 24 | Systeemeisen verouderd (Windows XP, IE 8, 512 MB, iOS 7.1, Android 4.1); server/Citrix alleen >100 Editor Users | **bevestigd**, letterlijk — terwijl de werkelijke builds iOS 15.0 en macOS 12.0 vereisen | <https://www.projectplan365.com/system-requirements/> |
| 25 | Claims "20.000+ klanten" vs. "honderden bedrijven" zijn onderling strijdig | **gecorrigeerd (genuanceerd)** — beide teksten bestaan, maar de About-zin is gedateerd *"In 2019 / 2020"* binnen een chronologie en is dus geen gelijktijdige tegenspraak | <https://www.projectplan365.com/>, <https://www.projectplan365.com/about/> |
| 26 | "12 talen, 20+ datumformaten, 100+ valuta" | **onzeker** — de claim staat er letterlijk (op de bouwpagina zelfs als *"Customizable to support…"*), maar de App Store-metadata van iOS én Mac noemt uitsluitend Engels. Mogelijk instelbaarheid in plaats van meegeleverde lokalisaties; niet onafhankelijk te toetsen zonder de app te draaien | <https://www.projectplan365.com/ms-project-alternative/>, `itunes.apple.com/lookup` |
| 27 | MS Project Plan 3 ≈ $30/gebruiker/maand → Project Plan 365 is "ongeveer de helft" | **onzeker — niet verifieerbaar.** De Microsoft-prijspagina's gaven HTTP 403/404 en de zoekquota was uitgeput. De reseller-claim *"6 times less expensive"* is wél geverifieerd aanwezig, maar is een leveranciersclaim, geen prijsvergelijking | <https://www.unitedaddins.com/product/project-plan-365/>; microsoft.com 403 |

### Wat deze ronde niet kon toetsen

- **Alle gebruikersreview-citaten in §5** steunen nog steeds op de Apple App Store-reviewfeed en één Reddit-snippet. G2, Capterra en TrustRadius bleven onbereikbaar. De crash-/dataverliesmeldingen zijn dus wel authentiek maar niet gekwantificeerd — behalve dat de Google Play-score van 2,21★ over 444 beoordelingen het klachtenpatroon nu wél breed onderbouwt.
- **De schaalbaarheidsschatting (2.000–5.000 taken desktop)** blijft een ongetoetste inschatting; er zijn geen benchmarks en de leverancier publiceert geen limieten.
- **De omzet-/seatschatting in §7** blijft ongefundeerd en is als zodanig gemarkeerd.
- **De daadwerkelijk afgeschreven jaarbedragen** konden niet worden bevestigd: de checkout achter `/ups/Purchase/Standard` en `/ups/Purchase/Business` redirect naar een inlogpagina.
