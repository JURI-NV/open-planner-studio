# Microsoft Project — diepgaand softwareprofiel

*Marktonderzoek planningssoftware · opgesteld 25 juli 2026*
*Alle prijzen en statusinformatie zijn geverifieerd op 25 juli 2026, tenzij anders vermeld.*

---

## 0. Managementsamenvatting

Microsoft Project is al ruim veertig jaar het meest verbreide CPM-planningspakket ter wereld, maar het product bevindt zich in 2026 in de meest ingrijpende transitie uit zijn geschiedenis. De naam dekt vandaag **vier verschillende producten met verschillende toekomsten**:

| Product | Technologie | Status juli 2026 |
|---|---|---|
| **Project desktop** (Standard/Professional 2024, Project Online Desktop Client) | Win32, MPP-formaat | Levend, maar functioneel bevroren. Ondersteuning t/m 9 okt 2029 |
| **Project Online** | SharePoint Online | **Wordt uitgezet op 30 september 2026** (over ~2 maanden) |
| **Project for the web** | Power Platform / Dataverse | **Als merk opgeheven op 1 augustus 2025**, opgegaan in Planner |
| **Project Server Subscription Edition** | On-prem, op SharePoint SE | In ondersteuning, maar "no major features or enhancements" |
| **Planner (Premium)** | Power Platform / Dataverse | De strategische opvolger; AI-first (Project Manager agent) |

De kern van het verhaal: **Microsoft trekt zich terug uit klassieke enterprise-PPM en herpositioneert "Project" als een AI-ondersteunde werkbeheer-laag binnen Microsoft 365.** De harde CPM-planningsfunctionaliteit blijft alleen in de desktopclient bestaan — een 30 jaar oude Win32-applicatie die geen enkele BIM- of IFC-koppeling kent en waarvan de webopvolger op 3.000 taken per project vastloopt.

Voor een IFC-gebaseerde open-source planner is dat relevant in twee richtingen: (a) Microsoft laat een gat achter bij organisaties die per 30-9-2026 van Project Online af moeten, en (b) MSPDI (Project XML) is het enige goed gedocumenteerde uitwisselingsformaat van Microsoft en heeft al een werkende, open-source brug naar `IfcWorkSchedule`/`IfcTask` in IfcOpenShell.

---

## 1. Wat het is

### 1.1 Leverancier en eigendom

**Microsoft Corporation** (Redmond, WA, VS). Het product valt organisatorisch onder de Microsoft 365 / Work Management-groep; de productblog draait sinds 2024 onder de naam **Planner Blog** in plaats van Project Blog — op zichzelf al een signaal over de strategische richting.

### 1.2 Historie

| Jaar | Gebeurtenis |
|---|---|
| begin jaren '80 | Ron Bredehoeft (ex-IBM systems engineer) ontwikkelt het oorspronkelijke concept; richt Microsoft Application Services (MAS) Consulting op; OEM-overeenkomst met Microsoft |
| 1984 | Eerste commerciële release (MS-DOS) |
| **1985** | **Microsoft koopt de rechten**; versie 2 |
| 1986 | Versie 3 en 4 voor DOS (laatste DOS-versies) |
| 1990 | Project 1.0 voor Windows |
| 1991–1994 | Macintosh-versies (laatste: Project 4.0, 1993); Mac-ontwikkeling gestaakt in 1994 |
| 1998 | Project 98 (v8.0) — MPX-schrijfondersteuning eindigt hierna |
| 2000 | Project 2000 + **eerste Project Server (Project Central)** |
| 2002 | Project 2002 — introductie van **MSPDI XML** als uitwisselingsformaat |
| 2003–2021 | Project 2003, 2007, 2010, 2013, 2016, 2019, 2021 |
| ~2013 | **Project Online** (SharePoint Online-gebaseerde PPM-cloud) |
| 2019 | **Project for the web** (Power Platform / Dataverse) |
| april 2024 | Project Plan 1 → **Planner Plan 1** |
| 18 sep 2024 | Project Plan 3/5 → **Planner and Project Plan 3/5** |
| 1 okt 2024 | **Project 2024** (Standard/Professional) uitgebracht |
| **1 aug 2025** | **Project for the web met pensioen**, functionaliteit opgegaan in Planner |
| 5 sep 2025 | Aankondiging: **Project Online wordt uitgezet** |
| 1 okt 2025 | **End of sale** Project Online-only SKU's voor nieuwe klanten |
| 14 juli 2026 | **Einde extended support Project Server 2016 én 2019** |
| **30 sep 2026** | **Officiële retirement Project Online** |

Bron voor de versiehistorie: [Wikipedia — Microsoft Project](https://en.wikipedia.org/wiki/Microsoft_Project) (geraadpleegd 25-07-2026). Bron voor de retirement-data: [Microsoft Community Hub, 5-9-2025](https://techcommunity.microsoft.com/blog/plannerblog/microsoft-project-online-is-retiring-what-you-need-to-know/4450558).

> **Verificatienoot (25-07-2026), twee voorbehouden bij deze tabel:**
> 1. **De exacte dag van de Project Online-retirement is niet dubbel bevestigd.** Microsoft's eigen productdocumentatie zegt op twee onafhankelijke plaatsen alleen *"Microsoft Project Online will be retired in **September 2026**"* — zonder dagaanduiding ([Project Online service description](https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/microsoft-project-online-service-description), bijgewerkt 12-01-2026; [Project Online software boundaries and limits](https://learn.microsoft.com/en-US/ProjectOnline/project-online-software-boundaries-and-limits), bijgewerkt 25-05-2026). De precieze datum **30 september 2026** komt uitsluitend uit de Planner-blogaankondiging, waarvan de artikeltekst bij hercontrole niet opnieuw uitleesbaar was (de pagina levert alleen de titel op). **De maand is hard, de dag is niet onafhankelijk geverifieerd.** Hetzelfde geldt voor de afgeleide data 1-10-2025 (end of sale) en 1-4-2026 (geen nieuwe tenants).
> 2. **De versiehistorie steunt volledig op één bron (Wikipedia).** Verkoop in 1985, eerste MS-DOS-release in 1984, Ron Bredehoeft als bedenker en Project 4.0 voor Mac (1993) als laatste Mac-versie zijn wél letterlijk terug te vinden in dat artikel, maar er is geen tweede, onafhankelijke bron bij gezocht. De toevoeging *"Mac-ontwikkeling gestaakt in 1994"* staat niet in die vorm in de bron — behandel het jaartal 1994 als afgeleid, niet als geciteerd.

### 1.3 Doelgroep, typische gebruikers, sectoren en regio's

**Doelgroep.** Microsoft Project bedient historisch het brede midden van de projectmanagementmarkt: individuele projectmanagers, PMO's, en enterprise-portfoliobeheer. Het is niet gebouwd voor één sector — precies daarin verschilt het van Primavera P6 (zware infra/EPC) en Asta Powerproject (Britse bouw).

**Typische gebruikers:**
- Projectmanagers in IT, ICT-implementaties, product- en organisatieverandering — het historische kernsegment;
- PMO's en portfoliomanagers in grote organisaties (via Project Online / Project Server);
- Planners in bouw en installatietechniek, vooral bij **kleinere tot middelgrote werken** en bij aannemers die geen P6-verplichting van de opdrachtgever hebben;
- Teamleden die alleen voortgang terugmelden (via Planner / voorheen Project Online Essentials).

**Sectoren.** Op PeerSpot is bouw met **13% van de bezoekers de grootste enkele sector** die naar Microsoft Project kijkt, gevolgd door IT/telecom, overheid en financiële dienstverlening ([PeerSpot](https://www.peerspot.com/products/microsoft-project-reviews), geraadpleegd 25-07-2026). Dat is opvallend, omdat bouw juist de sector is waar de zwakke punten van het product (grote schema's, XER-uitwisseling, 4D) het hardst aankomen.

**Regio's.** Wereldwijd beschikbaar in de commerciële, onderwijs- en Amerikaanse overheidsclouds (GCC). Belangrijke beperking: **premium Planner-functionaliteit is niet beschikbaar in GCC High en DoD-tenants**, en Project for the web was daar evenmin beschikbaar ([Microsoft Learn — Planner for admins](https://learn.microsoft.com/en-us/planner/planner-for-admins), bijgewerkt 21-08-2025). Voor defensie- en zwaar gereguleerde overheidsprojecten in de VS is de cloudlijn dus feitelijk geen optie; die klanten zitten vast aan de desktop of aan Project Server SE.

---

## 2. Functionaliteit en techniek

### 2.1 De CPM-engine (desktop)

De rekenkern in de desktopclient is een klassieke, volwassen CPM-implementatie:

- **Forward/backward pass** met early start/finish, late start/finish, total float en free float;
- **Kritiek pad** met instelbare drempel (standaard float ≤ 0 dagen), plus **Task Path**-analyse (highlight van predecessors/successors, driving/driven paths) en **Task Inspector** die uitlegt waarom een taak op een datum staat;
- **Task types**: Fixed Units, Fixed Duration, Fixed Work, gecombineerd met de effort-driven-vlag — het duur/werk/eenheden-driehoeksmodel;
- **Manually scheduled** versus **auto scheduled** taken (sinds Project 2010) — krachtig maar berucht als bron van "waarom beweegt mijn planning niet"-fouten;
- **Constraints** (8 typen: ASAP, ALAP, SNET, SNLT, FNET, FNLT, MSO, MFO) plus **Deadlines** die geen constraint zijn maar wel een indicator geven;
- **Relaties**: FS, SS, FF, SF met lead/lag, ook procentuele lag;
- **Inactive tasks** (Professional): taken uitschakelen zonder ze te verwijderen — handig voor scope-scenario's;
- **Resource leveling** met prioriteiten, leveling order en split-opties;
- **Master projects / subprojects** met cross-project links.

**Wat er niet in zit:** geen retained/progress-override logica zoals P6, geen multiple float paths, geen activity codes met de diepte van P6, geen ingebouwde Monte-Carlo-simulatie, geen earned-value-methodes buiten de standaard EVM-velden (BCWS/BCWP/ACWP, CPI/SPI), en geen echte multi-baseline-vergelijking naast elkaar.

### 2.2 Kalenders

- **Base calendars** (organisatiekalenders), **project calendars**, **task calendars** en **resource calendars**, in die overervingsvolgorde.
- Werktijden per weekdag, uitzonderingen met **recurrence patterns** (bijv. "elke laatste vrijdag van de maand").
- Getest tot **30.000+ base calendars** per bestand ([Microsoft Support — Specifications for Microsoft Project](https://support.microsoft.com/en-us/office/specifications-for-microsoft-project-71e29e86-28dd-4582-a578-6506c5cc603a)).
- Microsoft waarschuwt expliciet dat veel afwijkende kalenders de rekentijd verlengt: *"It takes more time to calculate multiple calendars"* ([Microsoft Learn — Project Online software boundaries and limits](https://learn.microsoft.com/en-US/ProjectOnline/project-online-software-boundaries-and-limits)).

Belangrijk voor interoperabiliteit: het **MSPDI-uitwisselingsformaat kent alleen een werkweekpatroon** en geen rijke recurrence — zie §6.3.

### 2.3 Resource- en kostenmodel

- Drie resourcetypen: **Work** (mensen/materieel op tijdbasis), **Material** (verbruik) en **Cost** (vaste kostenposten).
- Per resource: **5 rate tables** (A–E), elk met **25 variabele tarieven** over de tijd, en **100 availability-datumbereiken**.
- Standard rate, overtime rate, cost per use, accrual (start/prorated/end).
- **Budget resources** en **cost resources** voor top-down budgetten.
- **Team Planner** (alleen Professional): drag-and-drop herverdeling met directe zichtbaarheid van overallocaties.
- **Timesheets** en goedkeuringsworkflow: alleen via Project Online / Project Server, niet in de standalone desktop.
- **Geen multi-currency** — herhaaldelijk als tekortkoming genoemd in reviews ([PeerSpot](https://www.peerspot.com/products/microsoft-project-reviews)). Voor internationale bouwconsortia met valuta per contractpakket is dat een echte blocker.

### 2.4 Baselines

- **11 baselines** per bestand: `Baseline` plus `Baseline1` t/m `Baseline10`.
- Per baseline worden start, finish, duration, work en cost vastgelegd, ook getimefaseerd.
- **Kritieke beperking:** je kunt er in de standaardweergaven maar **één tegelijk** effectief vergelijken. Primavera P6 kan er vier tegelijk toewijzen (Project, Primary, Secondary, Tertiary) en er onbeperkt bewaren ([Plan Academy — MS Project vs Primavera P6](https://www.planacademy.com/microsoft-project-vs-primavera-p6/), geverifieerd 25-07-2026: *"can assign 4 baseline to a project at one go"*, P6-opslag alleen begrensd door de database). Voor claims- en vertragingsanalyse (windows analysis, time impact analysis) is dat verschil substantieel.
  > *Telverschil tussen bronnen:* Plan Academy spreekt van **10** baselines in MS Project, Microsoft's eigen specificatie van **11**. Beide zijn te verdedigen — Microsoft telt `Baseline` plus `Baseline1`–`Baseline10`, Plan Academy telt alleen de genummerde. Dit profiel volgt Microsoft's eigen telling (11).

### 2.5 Risico en Monte-Carlo

**Niet aanwezig in het product.** Microsoft Project heeft geen ingebouwde probabilistische analyse — geen three-point estimates, geen risicoregister met kwantitatieve koppeling, geen tornado-diagrammen.

Dit wordt ingevuld door add-ins van derden, wat de effectieve total cost of ownership verhoogt:

- **Barbecana Full Monte SRA** — draait in-place binnen Microsoft Project (2010 t/m 2021) én binnen Primavera P6 (8.4 t/m 22.12); Monte-Carlo met meerdere kritieke paden en sensitivity-analyse. Prijs niet publiek; alleen op aanvraag ([barbecana.com/full-monte](https://www.barbecana.com/full-monte/), geraadpleegd 25-07-2026).
- **@RISK for Project** (Palisade/Lumivero), **Safran Risk**, **Intaver RiskyProject**, en historisch **Deltek Acumen Risk** — vergelijkbare rol.

**Let op de versie-ondersteuning:** Full Monte noemt Microsoft Project t/m 2021, niet t/m 2024. Bij add-in-afhankelijkheid loop je dus structureel achter op de hoofdversie — een bekend patroon in dit ecosysteem *(observatie op basis van de leverancierspagina; niet als beleid bevestigd)*.

### 2.6 4D / BIM

**Microsoft Project heeft geen enkele native BIM- of IFC-ondersteuning.** Geen IFC-import, geen IFC-export, geen modelviewer, geen koppeling tussen taken en bouwdelen.

4D wordt in de praktijk gerealiseerd door de planning te exporteren naar een 4D-tool:

- **Autodesk Navisworks TimeLiner** — koppelt aan MS Project (MPX/MPP via de Project-installatie en MSPDI XML), Primavera en CSV;
- **Bentley SYNCHRO 4D** — importeert MSPDI/MPP en XER naast IFC-modellen;
- **Bexel Manager, Vico Office, RIB iTWO** — vergelijkbaar.

Dat betekent dat de MS Project-planning altijd een **eenrichtings-donor** is: taken gaan naar het 4D-model, maar de koppeling tussen taak en object leeft in de 4D-tool, niet in het MPP-bestand. Er is geen equivalent van `IfcRelAssignsToProduct` in het Microsoft-datamodel. Voor een IFC-native planner is dit precies het gat.

### 2.7 Portfolio en rapportage

- **Portfolio analysis and prioritization** (business drivers, cost/resource-constrained optimalisatie) bestond alleen in **Project Online Plan 5** en Project Server — en verdwijnt dus met Project Online ([Microsoft Learn — Project Online service description](https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/microsoft-project-online-service-description), bijgewerkt 12-01-2026).
- **Roadmaps** (cross-project tijdlijn, ook met Azure DevOps) in Plan 3/5.
- **Rapportage desktop**: ingebouwde rapportengalerij, visuele rapporten via Excel/Visio, custom fields met formules en graphical indicators.
- **Power BI** wordt door Microsoft als de rapportagelaag gepositioneerd, maar vereist **een aparte Power BI-licentie** — expliciet in de servicebeschrijving vermeld. Reviewers noemen dit als verborgen kostenpost.
- **OLAP-cubes** bestaan alleen in Project Server on-prem; *"Project Online does not support OLAP cubes"* ([Microsoft Learn — What the CSOM does and does not do](https://learn.microsoft.com/en-us/office/client-developer/project/what-the-csom-does-and-does-not-do)).

### 2.8 Platform

| Component | Platform |
|---|---|
| Project Standard/Professional 2024, Project Online Desktop Client | **Windows only** (Win32). Geen macOS, geen Linux, geen web |
| Project Online | Browser, op SharePoint Online — *classic mode only* |
| Planner Premium / Project for the web | Browser, Teams, mobiel — op Dataverse |
| Project Server Subscription Edition | Windows Server 2019/2022 + SQL Server 2019, als service-applicatie in SharePoint Server SE |

Het ontbreken van een macOS-versie sinds **1994** is voor architecten- en ontwerpbureaus (traditioneel Mac-zwaar) een structureel bezwaar.

### 2.9 Schaalbaarheid — hoeveel activiteiten realistisch?

Dit is waar theorie en praktijk ver uiteenlopen.

**Theoretische limieten desktop** ([Microsoft Support — Specifications for Microsoft Project](https://support.microsoft.com/en-us/office/specifications-for-microsoft-project-71e29e86-28dd-4582-a578-6506c5cc603a)):

| Grootheid | Limiet |
|---|---|
| Taken per project | 400.000 |
| Resources per project | 700.000 |
| Predecessors / successors per taak | 50.000 elk |
| Outline levels | 65.535 |
| Geconsolideerde projecten | 998 |
| Baselines | 11 |
| Rekendatumbereik | 1 jan 1984 – 31 dec 2149 |
| Base calendars | getest tot 30.000+ |
| Tekstveldlengte | 255 tekens |

Microsoft voegt daar zelf aan toe dat out-of-memory-fouten kunnen optreden *vóór* deze limieten bereikt worden.

**Praktijk.** Reviewers op PeerSpot melden dat het product *"very unstable on large project plans with more than 400 lines"* wordt en dat de prestaties merkbaar degraderen boven ~400 regels. Dat is een gebruikerswaarneming en waarschijnlijk pessimistisch voor moderne hardware, maar het patroon is consistent bekend.

> **Schatting (eigen inschatting op basis van bovenstaande bronnen en algemene praktijkervaring):** een MPP-bestand blijft comfortabel werkbaar tot ongeveer **5.000–10.000 taken**; daarboven worden herberekening, filteren en printen merkbaar traag, en boven ~20.000 taken is opsplitsen in een master/subproject-structuur praktisch noodzakelijk. Dit is expliciet een schatting, geen gemeten benchmark.

**Harde limieten Project for the web / Planner Premium** ([Microsoft Learn — Project for the web service description](https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/project-web-service-description), bijgewerkt 02-12-2025):

| Grootheid | Limiet |
|---|---|
| **Taken per project** | **3.000** |
| Hiërarchieniveaus | 10 |
| **Links (voorganger + opvolger) per taak** | **20** |
| Links (alleen opvolger) per project | 2.000 |
| **Resources per project** | **150** |
| Resources per taak | 20 |
| Duur leaf task | 1.250 dagen |
| Duur summary task / project | 3.650 dagen (10 jaar) |
| Datumbereik | 1-1-2000 – 31-12-2149 |

Dit is de meest onderschatte tekortkoming in het hele Microsoft Project-verhaal: **de webopvolger van een tool die 400.000 taken aankan, stopt bij 3.000.** Voor een bouwplanning van enige omvang — een middelgroot utiliteitsproject zit al snel op 2.000–5.000 activiteiten — is dat een harde muur. En 20 links per taak is voor een netwerkplanning met veel parallelle werkfronten krap.

**Limieten Project Online** (relevant tot 30-9-2026, [Microsoft Learn](https://learn.microsoft.com/en-US/ProjectOnline/project-online-software-boundaries-and-limits)):
- 30.000 projecten per Project Web App-site; maximaal 2.000 project sites per site collection;
- initiële quota **25 GB per PWA-site**;
- reporting schema: 450 tekstvelden, 450 lookup tables en 450 overige custom fields per categorie — daarboven verschijnen velden niet in de OData-feed, **zonder dat je kunt kiezen welke wél**;
- rapporten met een Excel-bronbestand > 10 MB kunnen niet ververst worden;
- PWA en project sites worden **alleen in SharePoint classic mode ondersteund**.

---

## 3. Prijzen

> **Methodische noot.** Alle onderstaande bedragen zijn op **25 juli 2026** rechtstreeks van Microsoft's publieke prijspagina's gehaald, tenzij anders vermeld. Microsoft publiceert géén enterprise-staffels, EA-kortingen of Project Server-prijzen; die lopen uitsluitend via partners en volumelicentie-overeenkomsten.

### 3.1 Abonnementen (Planner-/Project-lijn)

Bron: [microsoft.com — Microsoft Planner plans and pricing (en-us)](https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner-plans-and-pricing) en [(nl-nl)](https://www.microsoft.com/nl-nl/microsoft-365/planner/microsoft-planner-plans-and-pricing), beide geraadpleegd 25-07-2026.

| Plan | VS (USD) | Nederland (EUR, excl. btw) | Termijn |
|---|---|---|---|
| **Planner** (basis) | Inbegrepen in Microsoft 365 | Inbegrepen | n.v.t. |
| **Planner Plan 1** | **$10,00** per gebruiker/maand | **€8,70** per gebruiker/maand | jaarabonnement, jaarlijks betaald, auto-renew |
| **Planner and Project Plan 3** | **$30,00** per gebruiker/maand | **€26,00** per gebruiker/maand | jaarabonnement, jaarlijks betaald, auto-renew |
| **Planner and Project Plan 5** | *niet meer publiek geprijsd* | *niet meer publiek geprijsd* | via partner / volumelicentie |
| Microsoft 365 Copilot (add-on) | $30,00 per gebruiker/maand | €26,00 per gebruiker/maand | jaarabonnement |

**Wat zit erin:**
- **Planner (basis)** — inbegrepen in Microsoft 365 Business Basic/Standard, Office 365 E1/E3/E5 en Microsoft 365 A1. Grid-, Board-, Schedule- en Charts-weergaven; dependencies alleen *bekijken*.
- **Planner Plan 1** — subtaken, premium-sjablonen, portfolio's bekijken, backlogs/sprints, dependencies *maken*, Timeline (Gantt), People-view, doelen en mijlpalen, custom fields. **Géén kritiek pad.**
- **Planner and Project Plan 3** — alles uit Plan 1 plus task history, Assignments-view, portfolio's *maken*, **baselines en kritiek pad**, advanced dependencies met lead/lag, **Project desktop-toegang**, en (tot 30-9-2026) Project Online-toegang.
- **Planner and Project Plan 5** — daarbovenop resource capacity planning, portfolio analysis & prioritisation, demand management/workflows, custom branding, service- en gebruikersadministratie, en onbeperkte custom tables in Dataverse.

**Belangrijke observatie.** Plan 5 wordt in de productdocumentatie en in de retirement-FAQ nog steeds genoemd, maar staat **niet meer op de publieke prijspagina** (geverifieerd 25-07-2026 op zowel de overzichtspagina als de plan-detailpagina's). Ook Microsoft's eigen licensing-artikel noemt alleen nog Planner Plan 1 en Planner and Project Plan 3 als premium-abonnementen ([Microsoft Learn — Microsoft Planner Subscriptions](https://learn.microsoft.com/en-us/planner/licensing), bijgewerkt 01-06-2026). Plan 5 is daarmee feitelijk een **enterprise-only SKU zonder transparante prijs** geworden.

> **Gerapporteerd bedrag, NIET geverifieerd — behandel als onbetrouwbaar:** de historische lijstprijs van Project Plan 5 / Planner and Project Plan 5 zou **$55,00 per gebruiker/maand** bij jaarlijkse facturering zijn geweest. Bij een tweede, onafhankelijke verificatieronde op 25-07-2026 kon dit bedrag op **geen enkele** bron worden teruggevonden: niet op de en-us- of nl-nl-prijspagina, niet op de vergelijkingspagina, en niet op een Plan 5-productpagina (`/en-us/microsoft-365/planner/project-plan-5` gaf HTTP 503). Onafhankelijke zoekmachines waren in deze sessie niet beschikbaar (DuckDuckGo captcha, Mojeek HTTP 403), zodat ook geen secundaire bron kon worden aangetroffen. **Gebruik dit bedrag niet in een vergelijkende kostenanalyse**; vraag een partneroffer op.

### 3.2 Eeuwigdurende licenties (perpetual)

Bron: [microsoft.com — Compare project management solutions and costs](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software), geraadpleegd 25-07-2026.

| Product | Prijs | Voorwaarden |
|---|---|---|
| **Project Standard 2024** | **$679,99** eenmalig | 1 gebruiker, 1 pc; Windows only |
| **Project Professional 2024** | **$1.129,99** eenmalig | 1 gebruiker, 1 apparaat; inclusief resource management, timesheets, verbinding met Project Server SE |

- Ondersteuning: Project 2024 volgt de **Modern Lifecycle Policy**, gestart 1 okt 2024, **retirement 9 oktober 2029** ([Microsoft Learn Lifecycle — Project 2024](https://learn.microsoft.com/en-us/lifecycle/products/project-2024)). Dat is vijf jaar, zónder de klassieke extended-support-periode.
- **Geen jaarlijks onderhoud in de retailprijs.** Onder volumelicenties bestaat wel **Software Assurance**, doorgaans geprijsd als een percentage van de licentieprijs per jaar — *schatting: in de orde van 25–29% per jaar voor applicatiesoftware; niet publiek gepubliceerd door Microsoft en dus niet geverifieerd.*

### 3.3 Project Server Subscription Edition

**Geen publieke prijs.** Microsoft's eigen vergelijkingspagina toont voor Project Server SE uitsluitend een "Find a partner"-link. Het licentiemodel is klassiek: **serverlicentie + Client Access Licenses (CALs) per gebruiker of per device**, bovenop een SharePoint Server Subscription Edition-licentie en SQL Server-licenties.

> **Schatting, niet geverifieerd.** Op basis van de historische structuur van Project Server-licenties moet men rekenen op een serverlicentie in de orde van enkele duizenden dollars plus CALs per gebruiker in de orde van enkele honderden dollars, náást SharePoint SE- en SQL Server-licenties. Dit is een **ruwe schatting** — er is geen publieke prijslijst en de werkelijke prijs hangt volledig af van het volumelicentiecontract. Het is bovendien de duurste optie in totale eigendomskosten, omdat je ook Windows Server-, SQL Server- en beheerkosten draagt.

### 3.4 Minimale afnames en staffels

- Voor Planner Plan 1 en Planner and Project Plan 3 via de webshop geldt **geen minimum aantal seats** (geverifieerd: de prijspagina toont geen minimumafname).
- Wel geldt een licentie-technische drempel: **Project for the web mag pas in Power Platform Production- en Sandbox-omgevingen worden uitgerold vanaf 5 of meer Project-licenties**; daaronder zit je vast aan de default-omgeving ([Microsoft Learn — Project for the web service description](https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/project-web-service-description)).
- Enterprise Agreement-staffels zijn niet publiek. In de praktijk worden kortingen per contract onderhandeld.

### 3.5 Verborgen bijkomende kosten

Dit is voor een eerlijke vergelijking essentieel — de kale seat-prijs is niet de werkelijke prijs:

1. **Power BI-licentie** voor serieuze rapportage — expliciet vereist volgens de servicebeschrijvingen.
2. **Power Apps-abonnement** zodra je apps bouwt die verder gaan dan de out-of-the-box Project-app.
3. **Power Automate platform-licentie** zodra een flow iets doet buiten de Project-applicatiecontext.
4. **Dataverse-opslag** boven de inbegrepen capaciteit: Plan 1 krijgt 3 GB per tenant + 50 MB per gebruiker; Plan 3/5 krijgen 5 GB + 250 MB per gebruiker.
5. **Microsoft Teams-licentie** voor de Teams-integratie.
6. **Risicoanalyse-add-ins** (Full Monte, @RISK, Safran) — losse aanschaf.
7. **Microsoft 365 Copilot** à $30/gebruiker/maand als je de AI-functies wilt die Microsoft nu als hoofdreden voor de hele koerswijziging opvoert. Effectief verdubbelt dat de prijs van Plan 3.

---

## 4. VOORDELEN

1. **Een volwassen, betrouwbare CPM-engine met uitzonderlijk hoge theoretische limieten.** 400.000 taken, 700.000 resources, 50.000 relaties per taak, 998 subprojecten, 11 baselines, rekendatumbereik 1984–2149. Dat is geen marketingclaim maar Microsoft's eigen gepubliceerde specificatie. De engine zelf — forward/backward pass, float, kritiek pad, task path, task inspector — is in veertig jaar grondig doorontwikkeld en levert reproduceerbare resultaten. *(Bron: Microsoft Support specificaties.)*

2. **Verreweg de grootste beschikbare pool van geschoolde gebruikers.** Volgens Wikipedia was Project van 2015 tot 2020 de populairste projectmanagement-applicatie volgens Project Management Zone, en werd het "the dominant PC-based project management software" binnen enkele jaren na lancering. Praktisch betekent dit: je vindt overal planners die MPP kunnen lezen, elke opleiding besteedt er aandacht aan, en de kennisdrempel bij nieuwe medewerkers is laag. Dat is een reëel bedrijfseconomisch voordeel dat concurrenten niet kunnen kopiëren.

3. **Diepe integratie met het Microsoft 365-ecosysteem.** Teams, Outlook, SharePoint, Excel, Power BI en Power Automate koppelen out-of-the-box. PeerSpot-reviewers noemen dit consistent als de belangrijkste sterkte na Gantt/scheduling zelf. Voor organisaties die al volledig op Microsoft draaien, is de marginale integratiekost bijna nul.

4. **Rijk resource- en kostenmodel voor de prijsklasse.** Werk-, materiaal- én kostenresources, 5 tarieftabellen per resource met 25 tijdvariabele tarieven elk, 100 beschikbaarheidsperioden, overtime rates, cost-per-use, accrual-methodes, budget resources, en resource leveling met instelbare volgorde. Team Planner geeft directe drag-and-drop-herverdeling. Dit haalt het niveau van veel duurdere gespecialiseerde tools.

5. **Uitstekend gedocumenteerd XML-uitwisselingsformaat (MSPDI).** In tegenstelling tot het gesloten binaire MPP-formaat is MSPDI een open, gepubliceerd XSD-schema dat sinds Project 2002 stabiel is. Dat maakt Microsoft Project de facto het best benaderbare planningspakket voor integratiebouwers — en verklaart waarom vrijwel elke andere tool MSPDI ondersteunt. Voor een open-source IFC-planner is dit het makkelijkste realistische koppelvlak.

6. **Sterke desktop-ergonomie voor het handmatige planwerk.** Multi-level undo, filtered views, custom sorting/grouping, auto-complete op taak- en resourcenamen, graphical indicators, formules in custom fields, Excel-copy-paste rechtstreeks in het taakraster. Reviewers noemen expliciet dat het importeren van activiteitenlijsten uit Excel bij MS Project triviaal is, terwijl P6 formele import/export-procedures vereist.

7. **Toegankelijke instapprijs vergeleken met enterprise-alternatieven.** $10/gebruiker/maand voor Planner Plan 1 en $30 voor Plan 3 zijn per-seat-bedragen die een MKB-aannemer kan dragen. De perpetual-optie ($679,99 / $1.129,99) blijft bestaan, wat voor organisaties die abonnementsmoeheid hebben een reële uitweg is — en die door reviewers ook expliciet zo wordt gebruikt: *"We purchase perpetual licenses due to the high cost of subscriptions."*

8. **De desktopclient blijft expliciet gespaard in de herstructurering.** Microsoft benoemt in de retirement-FAQ drie keer dat Project desktop *niet* geraakt wordt: *"Project desktop remains available and is not impacted by this change."* Voor wie alleen de desktop gebruikt, is er tot minstens oktober 2029 continuïteit. Dat is een echt voordeel ten opzichte van klanten die op Project Online zitten.

9. **Volwassen programmeerbaarheid op de desktop.** VBA-objectmodel, COM-automation en .NET-interop geven volledige toegang tot het taak-, resource- en assignmentmodel. Er bestaan decennia aan macro's, add-ins en bedrijfsspecifieke automatiseringen. Dat is een ecosysteem-voordeel dat webtools nog niet benaderen.

10. **Brede internationale beschikbaarheid en compliance-dekking.** *(Gecorrigeerd na verificatie 25-07-2026.)* Microsoft's uitspraak "available in commercial, education and GCC, GCC High and DoD subscriptions" staat in de **Project Online**-servicebeschrijving en slaat dus op Project Online, niet op de Win32-desktopclient (die als lokaal geïnstalleerde applicatie sowieso niet clouds-gebonden is). Voor **Project for the web / Planner premium** staat in dezelfde documentatieset juist het tegendeel: *"It is not yet available in GCC High, and DoD."* Netto: de gereguleerde-overheidsdekking geldt voor de uitfaserende Project Online-lijn plus de desktop, niet voor de strategische opvolger — met de Microsoft 365-compliance-, retentie- en encryptiekaders eromheen. Voor gereguleerde sectoren scheelt dat een inkooptraject, maar niet op de Planner-lijn. ([Project Online service description](https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/microsoft-project-online-service-description); [Project for the web service description](https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/project-web-service-description))

---

## 5. NADELEN

1. **De cloudlijn wordt afgebroken en klanten moeten binnen twee maanden weg.** Project Online is **op 30 september 2026 definitief weg**; sinds 1 oktober 2025 kunnen nieuwe klanten de Project Online-only SKU's niet meer kopen, en sinds 1 april 2026 kunnen bestaande klanten geen nieuwe tenants meer aanmaken. Microsoft's eigen tekst: *"you will no longer be able to access your projects or any associated data within the service."* Daarvóór was Project for the web al op 1 augustus 2025 als merk opgeheven. Twee cloudplatformen in twee jaar afgeschoten is een ernstig roadmap-risico voor iedereen die op deze lijn heeft gestandaardiseerd.

2. **De webopvolger is functioneel een enorme stap terug.** Planner Premium / Project for the web stopt bij **3.000 taken per project, 20 links per taak, 2.000 links per project, 150 resources en 10 hiërarchieniveaus**. Dat is twee ordes van grootte minder dan de desktop. Kritiek pad zit niet in Plan 1. Er is geen resource leveling, geen master/subproject-structuur, geen network diagram, geen 11 baselines, geen inactive tasks, geen formules met de diepte van de desktop. Wie van Project Online komt, verliest bovendien portfolio analysis, demand management workflows, OLAP-cubes en timesheets tenzij hij naar Project Server SE of Dynamics 365 Project Operations gaat.

3. **De on-premises opvolger krijgt geen ontwikkeling meer.** Microsoft schrijft over Project Server Subscription Edition letterlijk: *"In Project Server Subscription Edition, there are no major features or enhancements."* De enige genoteerde wijziging is een nieuwe SQL Analysis Services-clientvereiste. Tegelijk is er **geen in-place upgrade**, is upgraden alleen mogelijk vanaf Project Server 2016/2019 via PowerShell met een nieuwe farm, en liep de extended support voor Project Server 2016 én 2019 af op **14 juli 2026**. De aanbevolen "veilige haven" is dus een bevroren product op een dure infrastructuurstack.

4. **De prijs wordt door gebruikers als slecht in verhouding tot de waarde ervaren.** PeerSpot-reviewers omschrijven de prijs als *"very expensive, costing roughly double what it should"* en één beoordeelt de prijsstelling met *"a three out of ten."* Australische klanten noemen ~AUD 1.000 per jaar. Daar bovenop komen de niet-inbegrepen Power BI-, Power Apps-, Power Automate- en Dataverse-kosten, plus $30/gebruiker/maand als je de Copilot-functies wilt waarmee Microsoft de hele koerswijziging rechtvaardigt.

5. **Steile leercurve en foutgevoelig gedrag voor niet-experts.** Reviewers noemen het *"not for non-technical teams"* en melden dat de initiële inrichting uren tot dagen kost. Het beruchtste struikelblok is de combinatie van manually/auto scheduled taken met de duur/werk/eenheden-driehoek en de acht constraint-typen: planningen die niet reageren zoals verwacht, of stilletjes constraints krijgen door drag-and-drop. Dit is de belangrijkste bron van foute schema's in de praktijk.

6. **Verouderde desktop-UI en Windows-exclusiviteit.** De Win32-client is sinds de ribbon-introductie in 2010 visueel nauwelijks veranderd. Er is **sinds 1994 geen macOS-versie**, geen webversie van de volwaardige client, en geen Linux-ondersteuning. Voor bureaus met gemengde werkplekken betekent dat VDI, Parallels of een aparte Windows-machine puur voor de planning.

7. **Schaalbaarheidsklachten in de praktijk.** Ondanks de theoretische 400.000-takenlimiet melden reviewers dat het product *"very unstable on large project plans with more than 400 lines"* wordt en dat het worstelt met het printen van grote datasets. Zelfs met een royale marge op die gebruikerswaarneming: een groot infrawerk met 20.000+ activiteiten is geen comfortabel MS Project-terrein, terwijl dat voor P6 routine is.

8. **Zwakke ondersteuning bij problemen.** PeerSpot-reviewers beschrijven het als *"challenging to reach the right person for specific issues, often taking days or weeks"* en beoordelen support met een 4 uit 10, met sterk wisselende responsiviteit per regio. Voor een product waar een verkeerd berekend schema direct contractuele gevolgen heeft, is dat een reëel risico.

9. **Migratiepad van MPP naar de cloud is slecht geregeld.** Op Microsoft's eigen Q&A-forum melden gebruikers dat de directe MPP-importfunctie uit Project for the web is verdwenen en dat de vervanger — een Power App die "Planner" heet en in de *Default*-omgeving van Power Apps staat — voor veel bedrijven niet zichtbaar of beschikbaar is en nauwelijks gedocumenteerd. Het geciteerde sentiment: Microsoft heeft *"dropped the ball"* door de importmogelijkheid te verwijderen vóórdat er een duidelijk alternatief was. De workaround is export naar Excel plus een handgebouwde Power Automate-flow.

10. **Sterke vendor lock-in via het MPP-formaat.** MPP is een ongedocumenteerd binair formaat. Er bestaat geen officiële specificatie en geen officiële leesbibliotheek buiten Microsoft. De open-source-oplossing (MPXJ) is **read-only** voor MPP — schrijven kan alleen via MSPDI of MPX. Praktisch betekent dat: je kunt uit MS Project komen, maar je kunt niet zonder Microsoft Project een MPP-bestand *produceren* dat een klant of opdrachtgever kan openen. Voor organisaties waar de opdrachtgever "lever aan in MPP" contractueel eist, is dat een permanente licentieverplichting.

11. **Ontbrekende functies die in de doelsectoren standaard zijn.** Geen multi-currency. Geen ingebouwde Monte-Carlo/risicoanalyse. Geen IFC/BIM. Geen echte multi-baseline-vergelijking (P6 doet er vier tegelijk). Geen activity codes met P6-diepte. Zwakke agile/Kanban-ondersteuning. Risicomanagement gebeurt volgens reviewers *buiten* het platform.

12. **API-beperkingen bij automatisering.** De CSOM voor Project Online kent een **2 MB-limiet per request**, wat in de praktijk neerkomt op ongeveer **252 minimale taken per aanroep** — daarboven volgt `The request uses too many resources` en moet je zelf batchen. De CSOM dekt bovendien twaalf van de PSI-services niet (admin, archive, security, portfolio analyses, notifications, …) en heeft **geen toegang tot data in lokale .mpp-bestanden**. En met de retirement van Project Online verdwijnt deze hele API-laag alsnog.

---

## 6. Interoperabiliteit

Dit hoofdstuk is uitgebreid, omdat het voor een open-source IFC-planner het beslissende onderwerp is.

### 6.1 Native bestandsformaten van Microsoft Project

| Formaat | Extensie | Lezen | Schrijven | Opmerking |
|---|---|---|---|---|
| **Project** | `.mpp` | ja | ja | Proprietair binair formaat, **niet publiek gespecificeerd** |
| **Project Template** | `.mpt` | ja | ja | |
| **Project Database** | `.mpd` | tot Project 2003 | tot Project 2003 | Microsoft Access-database |
| **Workspace** | `.mpw` | historisch | historisch | |
| **MSPDI / Project XML** | `.xml` | ja | ja | **Open XSD-schema**, sinds Project 2002 |
| **MPX (Project Exchange)** | `.mpx` | **afgeschaft** | **afgeschaft** | Schrijfbaar t/m Project 98 (geverifieerd); leesbaar t/m Project 2010 (**niet geverifieerd**, zie noot) |
| Excel | `.xlsx` | ja | ja | Via wizard-mapping |
| CSV / tekst | `.csv`, `.txt` | ja | ja | |
| PDF / XPS | | — | ja | Alleen output |

> **Verificatienoot MPX (25-07-2026).** Dat Project 98 de laatste versie was die naar `.mpx` kon *opslaan*, is bevestigd ([Wikipedia — Microsoft Project](https://en.wikipedia.org/wiki/Microsoft_Project): Project 98 was "the last to open Project 4.0/95 files and save in .mpx … file format"). De bewering dat Project **2010** de laatste versie was die `.mpx` nog kon *lezen* is bij hercontrole **niet** met een bron onderbouwd — noch de MPXJ-formatendocumentatie noch de geraadpleegde Microsoft-pagina's noemen die grens. Behandel "leesbaar t/m 2010" als onbevestigd.

**Kritiek gat: er is géén native ondersteuning voor XER, P6 XML (PMXML), of IFC.** Microsoft Project kan geen enkel Primavera-formaat lezen of schrijven, en heeft geen enkele relatie met buildingSMART-standaarden. Uitwisseling met de bouwkolom loopt daarom altijd via een derde partij.

### 6.2 Uitwisseling met Primavera P6 en de rest van de markt (MPXJ)

De praktische brug is **MPXJ** — een volwassen open-source bibliotheek (Java/.NET/Python, LGPL) die als de facto standaard voor planningsformaat-conversie fungeert. Bron: [mpxj.org/supported-formats](https://www.mpxj.org/supported-formats/), geraadpleegd 25-07-2026.

**Lezen én schrijven:**
- **MSPDI** (Microsoft Project XML)
- **MPX**
- **XER** (Primavera P6)
- **PMXML** (Primavera P6 XML)
- Planner (GNOME), SDEF (US Army Corps of Engineers)

**Alleen lezen:**
- **MPP** — Project 98, 2000, 2002, 2003, 2007, 2010, 2013, 2016, 2019 (plus MPT-templates)
- MPD (Access), Asta Powerproject (PP v8+ en MDB), Phoenix (PPX v4+), Primavera P3 & SureTrak (Btrieve/PRX/STX), FastTrack, GanttProject, TurboProject, ConceptDraw, **Synchro Scheduler (.SP v6+)**, Gantt Designer, Project Commander, **Deltek Open Plan (BK3)**, Edraw Project

**Serverkoppelingen (lezen):** Microsoft Project Server, Microsoft Planner, Primavera P6 Web Services, Oracle Primavera Cloud.

**De asymmetrie is essentieel:** MPXJ kan MPP **lezen maar niet schrijven**. Wie MPP moet *leveren*, heeft Microsoft Project nodig. Wie MPP moet *consumeren*, kan volledig open-source werken.

### 6.3 IFC 4.3 — de brug bestaat al, en is open source

Voor een IFC-gebaseerde planner is dit de belangrijkste bevinding van dit profiel.

**IFC-kant.** IFC 4.3 modelleert planning via `IfcWorkPlan` → `IfcWorkSchedule` → `IfcTask`, met `IfcRelSequence` voor logica en `IfcWorkCalendar` voor werktijden. Enkele details uit de specificatie ([buildingSMART IFC 4.3 — IfcWorkSchedule](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkSchedule.htm), geraadpleegd 25-07-2026):
- `IfcWorkSchedule` erft van `IfcWorkControl` met `CreationDate`, `StartTime`, `FinishTime`, `Duration`, `Purpose` en `PredefinedType` (`IfcWorkScheduleTypeEnum`);
- taken worden aan het schema gekoppeld via `IfcRelAssignsToControl`; root-taken worden op `IfcProject` gedeclareerd via `IfcRelDeclares`;
- schema's nesten in werkplannen via `IfcRelAggregates`;
- **een werkkalender wordt aan de summary task toegewezen, niet aan het werkschema** — een subtiliteit die makkelijk fout gaat bij importers.

**De bestaande brug: IfcOpenShell `ifc4d`.** In de IfcOpenShell-repository (`src/ifc4d/ifc4d/`) zit een compleet 4D-conversiemodule met de volgende bestanden:

```
csv2ifc.py    csv4d2ifc.py    ifc2msp.py    ifc2p6.py
msp2ifc.py    p62ifc.py       p6xer2ifc.py  pp2ifc.py
common.py     wpattern.py
```

- **`msp2ifc.py`** — parst Microsoft Project XML (MSPDI) en genereert `IfcWorkSchedule`, `IfcTask` (inclusief subtaakhiërarchie via `OutlineNumber`/`OutlineLevel`), `IfcRelSequence` en `IfcWorkCalendar`. Gemapte velden: Name, OutlineNumber, OutlineLevel, Start, Finish, Duration, Priority, CalendarUID en predecessor-relaties; kalenders met standaard werkweken en uitzonderingsperioden. Alle vier de relatietypen worden ondersteund (`FINISH_START`, `START_START`, `FINISH_FINISH`, `START_FINISH`).
- **`ifc2msp.py`** — de omgekeerde richting: leest `IfcWorkSchedule`, `IfcProject`, `IfcWorkCalendar`, `IfcTask` en `IfcRelSequence`, en schrijft MSPDI met projectmetadata, kalenderdefinities, taakhiërarchie met outline levels, kritiek-pad-vlaggen, predecessor-links met lag en early/late-datums.
- Daarnaast bestaan `p62ifc.py`, `p6xer2ifc.py` en `ifc2p6.py` voor de Primavera-kant, en `pp2ifc.py` voor Asta Powerproject.

**Gedocumenteerde beperkingen van deze brug** (uit de broncommentaren — direct relevant als ontwerpwaarschuwing):

| Beperking | Gevolg |
|---|---|
| *"Microsoft Project XML only understands a working week"* — MSPDI kent geen rijke recurrence | IFC-kalenders met complexere `IfcRecurrencePattern` degraderen naar ma–vr 09:00–17:00 |
| Holiday-uitzonderingen: *"TODO Exceptions not yet implemented"* in `ifc2msp` | Feestdagen/vorstverlet gaan verloren richting MS Project |
| Lag wordt in MSPDI uitgedrukt in **tienden van een minuut** (in de code becommentarieerd als *"Seriously, Microsoft?"*) | Afrondingsrisico bij lead/lag-conversie |
| Resources in `msp2ifc`: *"Doesn't do anything right now"* | Resourcetoewijzingen worden **niet** overgenomen van MSPDI naar IFC |
| Exception-type-enums van Microsoft zijn ongedocumenteerd; de code maakt *"BIG assumptions"* | Kalenderuitzonderingen kunnen verkeerd geïnterpreteerd worden |

**Conclusie voor de opdrachtgever.** Een IFC-native planner die (a) MSPDI **leest** en (b) MSPDI **schrijft**, dekt praktisch de volledige uitwisseling met de Microsoft-wereld — zonder licentie, zonder reverse engineering van MPP, en met een bestaand open-source referentie-implementatie om tegen te testen. De vier bovengenoemde beperkingen (kalenderrecurrence, uitzonderingen, lag-eenheden, resources) zijn precies de plekken waar je het beter kunt doen dan de bestaande brug. MPP-schrijven is daarentegen **geen realistisch doel**: het formaat is ongedocumenteerd en zelfs MPXJ heeft er na twintig jaar geen schrijfondersteuning voor.

### 6.4 API's en programmatische toegang

| Laag | API | Status |
|---|---|---|
| **Desktop** | VBA-objectmodel, COM-automation, .NET Interop | Stabiel, volledig, Windows-only |
| **Project Online** | **CSOM** (`Microsoft.ProjectServer.Client`), REST/OData, **OData reporting endpoint** | **Verdwijnt met de dienst op 30-9-2026** |
| **Project Online (legacy)** | **PSI** (ASMX/WCF webservices) | Legacy; CSOM dekt 12 PSI-services niet |
| **Project Server SE** | CSOM + PSI + directe SQL op reporting-tabellen | In stand, maar geen ontwikkeling |
| **Planner Premium / Project for the web** | **Dataverse Web API**, **Project Schedule API (v2)**, Power Automate-connectoren, Business Process Flows | De strategische API-laag |
| **Planner Basic** | **Microsoft Graph** (`/planner`-endpoints) | Alleen basistaken, geen CPM-data |

**Beperkingen die je moet kennen:**
- CSOM: **2 MB per request** (~252 minimale taken); geen toegang tot lokale `.mpp`-data; geen admin-, archive-, security-, notification- of portfolio-analysefunctionaliteit; PSI-extensies zijn niet via CSOM bereikbaar.
- Project Online OData: alleen de eerste **450 custom fields per type** komen in de feed, **zonder keuzemogelijkheid** welke.
- Planner Premium: het schrijven naar het planningsmodel loopt via de Project Schedule API op Dataverse, niet via Graph. Bestaande Power Automate-flows en third-party-apps **moeten worden herschreven** wanneer een basisplan naar een premiumplan wordt geconverteerd — Microsoft zegt dit expliciet in de plan-conversie-documentatie.
- Dataopslag is versnipperd: To Do/Outlook-taken in Exchange, basisplannen in Azure, bijlagen in SharePoint, **premiumprojecten in Dataverse**. Eén rapportagequery over alles heen bestaat niet.

### 6.5 Praktische uitwisselingsmatrix

| Doel | Route | Kwaliteit |
|---|---|---|
| MS Project → P6 | MSPDI → MPXJ → XER/PMXML | Goed; logica en kalenders komen over, resource-mapping vergt handwerk |
| P6 → MS Project | XER → MPXJ → MSPDI | Goed |
| MS Project → IFC 4.3 | MSPDI → `msp2ifc.py` | Werkt voor taken/logica/kalenders; **resources gaan verloren** |
| IFC 4.3 → MS Project | `ifc2msp.py` → MSPDI | Werkt; **kalenderuitzonderingen gaan verloren**, recurrence degradeert |
| MS Project → 4D/BIM | MPP/MSPDI → Navisworks TimeLiner / SYNCHRO | Standaardpraktijk; koppeling taak↔object leeft in de 4D-tool |
| MS Project → MPP (produceren) | **alleen met Microsoft Project** | Geen open-source alternatief |
| MPP → alles | MPXJ (read-only) | Goed, dekt Project 98 t/m 2019 |

---

## 7. Marktpositie

### 7.1 Waar het sterk staat, en waarom

- **Generiek projectmanagement en IT.** Het historische thuisland. De combinatie van een correcte CPM-engine, Office-vertrouwdheid en een lage seat-prijs is daar moeilijk te verslaan.
- **Organisaties die volledig op Microsoft 365 draaien.** De marginale kosten van adoptie zijn laag en de identiteits-, compliance- en beveiligingskaders zijn al ingericht.
- **MKB en middelgrote bouw- en installatiebedrijven zonder P6-verplichting.** Hier wint MS Project op prijs, beschikbaarheid van personeel en Excel-integratie.
- **De perpetual-markt.** Project Standard/Professional 2024 als eenmalige aankoop is een reële optie voor organisaties die geen abonnement willen — en dat is een segment dat door de hele PPM-markt heen wordt verwaarloosd.

### 7.2 Waar het verliest

- **Zware infrastructuur, EPC, olie & gas, nucleair, spoor.** Hier is **Primavera P6** de norm. Reviewers verwoorden het praktisch: *"if they are using Oracle Financials and Oracle Cloud, they are constrained to using Primavera for most project planning."* Oracle positioneert P6 expliciet op grote engineering- en bouwprogramma's met klanten als ITER, Assystem, Clayco en Swinerton.
- **Contractueel voorgeschreven XER-uitwisseling.** In grote infra- en offshoreprojecten is levering in XER of P6 XML vaak een contractuele eis. Microsoft Project kan dat formaat niet zelf produceren, wat een conversiestap en dus een risicopunt toevoegt. *(Kwalitatieve observatie op basis van de formaatondersteuning en marktpositionering; niet met één specifieke aanbestedingstekst onderbouwd.)*
- **4D/BIM-gedreven bouwprojecten.** Zonder IFC-ondersteuning kan MS Project geen rol spelen in een open BIM-workflow anders dan als donor van een activiteitenlijst.
- **Claims- en vertragingsanalyse.** Eén effectief vergelijkbare baseline tegen P6's vier, en beperktere float-paden, maken forensische planning lastiger.

### 7.3 Belangrijkste concurrenten

**Klassieke CPM/PPM:**
- **Oracle Primavera P6 (EPPM/Professional)** en **Oracle Primavera Cloud** — de directe tegenpool in de zware bouw
- **Asta Powerproject** (Elecosoft) — sterk in de Britse en Noord-Europese bouw
- **Deltek Open Plan / Acumen**, **Safran Project/Risk**, **Spider Project**
- **Microsoft's eigen Dynamics 365 Project Operations** — door Microsoft zelf als transitie-optie genoemd

**Modern werkbeheer (het segment waar Microsoft nu op mikt):**
- **Smartsheet, Asana, monday.com, Wrike, Atlassian Jira**
- **Planview, Planisware, Sciforma** in de enterprise-PPM-laag

**Bouwspecifiek/4D:** Bentley SYNCHRO, Autodesk Navisworks/Construction Cloud, Bexel Manager, RIB iTWO — deze concurreren niet direct op CPM maar bezetten wel de 4D-laag waar MS Project niet komt.

### 7.4 Trend

**De klassieke desktop: stabiel maar bevroren.** Project 2024 is uitgebracht en wordt tot 9 oktober 2029 ondersteund, maar er is geen aanwijzing voor substantiële functionele vernieuwing in de rekenkern.

**De PPM-lijn: krimpend, actief afgebouwd.** Project for the web opgeheven (aug 2025), Project Online end-of-sale (okt 2025) en retirement (sep 2026), Project Server 2016/2019 uit support (juli 2026), Project Server SE zonder nieuwe functionaliteit. Microsoft's eigen motivering: *"The legacy architecture of Project Online limits our ability to deliver modern, AI-powered experiences."*

**De Planner-lijn: groeiend, maar vanaf een veel lager functioneel niveau.** De investering gaat naar Planner, Microsoft 365 Copilot en de **Project Manager agent** — een AI-assistent (public preview) die taken aanmaakt, statusrapportages genereert en uitvoering automatiseert.

> **Interpretatie (eigen analyse, geen bronclaim):** Microsoft ruilt bewust diepte in voor bereik. Voor de honderden miljoenen Microsoft 365-gebruikers is een AI-ondersteunde werkbeheer-laag commercieel veel interessanter dan een CPM-engine voor enkele honderdduizenden planners. Het gevolg is dat het gespecialiseerde CPM-segment — precies waar bouwplanning zit — door de grootste speler in de markt actief wordt losgelaten.

### 7.5 Opvallende klanten en verplichtstellingen

Microsoft publiceert geen klantenlijst voor Project. Wat wel vaststaat:
- **Project Online** is beschikbaar in **GCC, GCC High en DoD**-abonnementen, wat aangeeft dat Amerikaanse overheids- en defensieklanten het gebruiken. *(Gecorrigeerd 25-07-2026: deze beschikbaarheidsuitspraak van Microsoft betreft Project Online, niet de desktopclient; de eerdere formulering schreef haar aan de desktopclient toe.)*;
- **premium Planner-functionaliteit is niet beschikbaar in GCC High en DoD** — die klanten kunnen de cloudopvolger dus niet gebruiken, wat de desktop daar de facto verplicht maakt;
- Voor US federal EVMS-programma's onder ANSI/EIA-748 wordt Microsoft Project doorgaans gecombineerd met een aparte kostentool (bijv. Deltek Cobra). *(Algemeen bekende praktijk; in dit onderzoek niet met een primaire bron bevestigd — behandelen als indicatie.)*

---

## 8. Eindoordeel

### Voor wie is dit de juiste keuze

- **Organisaties die al volledig op Microsoft 365 draaien en projecten tot enkele duizenden activiteiten plannen.** De integratie, de personeelsbeschikbaarheid en de instapprijs zijn dan doorslaggevend.
- **Individuele planners en kleine bureaus die een correcte CPM-engine willen zonder enterprise-infrastructuur.** Project Standard 2024 als eenmalige aankoop van $679,99 is in die situatie een verstandige, voorspelbare uitgave.
- **Organisaties waarvan opdrachtgevers of onderaannemers MPP eisen.** Dan is er domweg geen alternatief — MPP kan alleen door Microsoft Project geproduceerd worden.
- **Teams die vooral werkbeheer en samenwerking nodig hebben en CPM slechts oppervlakkig gebruiken.** Voor hen is Planner (basis of Plan 1) waarschijnlijk toereikend en veel goedkoper.

### Voor wie niet

- **Zware infrastructuur, EPC, offshore, nucleair, spoor en alles waar de opdrachtgever XER/P6 XML voorschrijft.** Kies P6 of Asta.
- **Iedereen die vandaag op Project Online zit.** Dat platform is over twee maanden weg. De transitie moet nú lopen, en géén van de drie geboden uitwegen (Planner Premium, Project Server SE, Dynamics 365 Project Operations) is een gelijkwaardige vervanger: de eerste is functioneel veel lichter, de tweede is bevroren en duur, de derde is een ander product met een andere focus.
- **Organisaties die een open BIM/IFC-workflow bouwen.** Microsoft Project speelt daar structureel geen rol; het kan hooguit een activiteitenlijst leveren aan een 4D-tool.
- **Bouwbedrijven die planningen van 20.000+ activiteiten beheren met meerdere gelijktijdige baselines en formele vertragingsanalyse.** De baseline-beperking en de praktische performancegrens maken dit een slechte fit.
- **Mac- en Linux-werkplekken.** Er is geen oplossing behalve virtualisatie.
- **Organisaties die roadmap-stabiliteit zwaar wegen.** Twee cloudplatformen in twee jaar uitgezet, plus een bevroren on-prem-opvolger, is een track record dat serieus meegewogen moet worden.

### Betekenis voor een open-source, IFC-gebaseerde planner

1. **Er ontstaat op 30 september 2026 een concreet marktgat.** Project Online-klanten moeten weg en krijgen geen gelijkwaardig alternatief van Microsoft. Dat is een timingvoordeel.
2. **MSPDI (Project XML) is het juiste koppelvlak** — open, stabiel sinds 2002, universeel ondersteund. Lezen én schrijven van MSPDI dekt de Microsoft-wereld af.
3. **MPP-schrijven moet je niet nastreven.** Ongedocumenteerd binair formaat; zelfs MPXJ heeft er na twintig jaar geen schrijfondersteuning voor. Positioneer dit expliciet als bewuste keuze, niet als tekortkoming.
4. **De IFC-brug bestaat al en is vrij te bestuderen**: `msp2ifc.py` en `ifc2msp.py` in IfcOpenShell's `ifc4d`-module. De vier gedocumenteerde zwakke plekken — kalenderrecurrence, feestdaguitzonderingen, lag in tienden van minuten, en het volledig ontbreken van resource-overdracht — zijn een concrete verbeterlijst.
5. **De 3.000-takenlimiet van Planner Premium is het scherpste verkoopargument** dat een open planner tegenover Microsoft's cloudlijn heeft. Een bouwplanning die daar niet in past, past nergens in de Microsoft-cloud.
6. **Vier hardnekkige gaten in het hele Microsoft-aanbod** die een nieuwe speler kan invullen: geen IFC/4D, geen multi-currency, geen ingebouwde Monte-Carlo, en geen echte multi-baseline-vergelijking.

---

## Verantwoording en onderzoeksbeperkingen

**Werkwijze.** Dit profiel is opgesteld door directe bevraging van primaire bronnen (Microsoft Learn-documentatie, Microsoft's publieke prijspagina's in twee regio's, Microsoft's eigen aankondigingen en Q&A-forum, buildingSMART IFC 4.3-specificatie, MPXJ-documentatie en de IfcOpenShell-broncode) aangevuld met gebruikersreviews.

**Beperking 1 — zoekmachines.** Het zoekbudget van deze sessie was bij aanvang van dit onderzoek uitgeput. Er kon geen gebruik worden gemaakt van reguliere WebSearch; alternatieve zoekmachines (DuckDuckGo, Mojeek) blokkeerden geautomatiseerde toegang. Als vervanging is de Microsoft Learn search-API gebruikt en zijn bronnen via directe URL-constructie benaderd. Dit betekent dat de bronnenselectie systematischer is voor Microsoft-eigen documentatie dan voor onafhankelijke commentaren.

**Beperking 2 — geblokkeerde reviewbronnen.** De volgende in de opdracht gevraagde bronnen weigerden geautomatiseerde toegang (HTTP 403/blokkade) en konden niet worden geraadpleegd: **G2, Capterra, TrustRadius, Gartner Peer Insights, Reddit (r/projectmanagement, r/construction, r/civilengineering), Software Advice, GetApp, Forbes Advisor, TechRepublic en The Digital Project Manager.** Planning Planet was evenmin bereikbaar. Als vervangende reviewbron is **PeerSpot** gebruikt (4,0/5 uit 86 reviews, 93% aanbeveling), aangevuld met Microsoft's eigen Q&A-forum waar gebruikers ongefilterd klagen. De gebruikersreviewkant van dit profiel steunt dus op minder bronnen dan gewenst; de citaten zijn representatief maar niet breed gevalideerd.

**Beperking 3 — prijzen.** Microsoft publiceert geen prijzen voor Planner and Project Plan 5, Project Server Subscription Edition, Software Assurance-percentages of Enterprise Agreement-staffels. Waar bedragen genoemd zijn zonder directe bron, zijn ze expliciet als schatting of als gerapporteerd-maar-ongeverifieerd gemarkeerd.

**Alles wat in dit document een schatting is, is als zodanig gemarkeerd.**

---

## Bronnen

**Microsoft — officiële documentatie en aankondigingen** (alle geraadpleegd 25 juli 2026)

1. [Microsoft Project Online is retiring: What you need to know](https://techcommunity.microsoft.com/blog/plannerblog/microsoft-project-online-is-retiring-what-you-need-to-know/4450558) — Microsoft Community Hub, Planner Blog, gepubliceerd 5 september 2025. *Bron voor: retirement 30-9-2026, end-of-sale 1-10-2025, geen nieuwe tenants vanaf 1-4-2026, transitie-opties, Project Server 2016/2019 extended support 14-7-2026.*
2. [Microsoft Project service description](https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/project-online-service-description) — Microsoft Learn.
3. [Microsoft Project Online service description](https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/microsoft-project-online-service-description) — Microsoft Learn, bijgewerkt 12 januari 2026. *Bron voor: featurematrix Plan 3 vs Plan 5, retirement-notitie.*
4. [Microsoft Project for the web service description](https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/project-web-service-description) — Microsoft Learn, bijgewerkt 2 december 2025. *Bron voor: retirement Project for the web 1-8-2025, featurematrix Plan 1/3/5, harde limieten (3.000 taken, 20 links/taak, 150 resources), Dataverse-capaciteiten.*
5. [Microsoft Project Online desktop client service description](https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/project-online-desktop-client-service-description) — Microsoft Learn.
6. [Project Online software boundaries and limits](https://learn.microsoft.com/en-US/ProjectOnline/project-online-software-boundaries-and-limits) — Microsoft Learn, bijgewerkt 25 mei 2026. *Bron voor: 30.000 projecten/PWA, 25 GB quota, 450 custom fields, classic mode.*
7. [Specifications for Microsoft Project](https://support.microsoft.com/en-us/office/specifications-for-microsoft-project-71e29e86-28dd-4582-a578-6506c5cc603a) — Microsoft Support. *Bron voor: 400.000 taken, 700.000 resources, 50.000 predecessors, 11 baselines, 998 subprojecten, datumbereik 1984–2149, 30.000+ kalenders.*
8. [Microsoft Planner Subscriptions](https://learn.microsoft.com/en-us/planner/licensing) — Microsoft Learn, bijgewerkt 1 juni 2026.
9. [Microsoft Planner for admins](https://learn.microsoft.com/en-us/planner/planner-for-admins) — Microsoft Learn, bijgewerkt 21 augustus 2025. *Bron voor: hernoemingen april 2024 en 18 september 2024, GCC High/DoD-beperking.*
10. [Plan Conversion — Microsoft Planner](https://learn.microsoft.com/en-us/planner/plan-conversion) — Microsoft Learn. *Bron voor: 90-dagen-archief, herschrijven van flows/third-party-apps.*
11. [Frequently asked questions for admins about Microsoft Planner](https://learn.microsoft.com/en-us/planner/faq-for-planner-admins) — Microsoft Learn. *Bron voor: versnipperde dataopslag (Exchange/Azure/SharePoint/Dataverse).*
12. [What the CSOM does and does not do](https://learn.microsoft.com/en-us/office/client-developer/project/what-the-csom-does-and-does-not-do) — Microsoft Learn. *Bron voor: 2 MB requestlimiet ≈ 252 taken, niet-gedekte PSI-services, geen .mpp-toegang, geen OLAP in Online.*
13. [What's new for IT pros in Project Server Subscription Edition](https://learn.microsoft.com/en-us/project/new-features-capabilities-project-server-subscription-edition) — Microsoft Learn, bijgewerkt 22 december 2025. *Bron voor: "no major features or enhancements", geen in-place upgrade, systeemvereisten.*
14. [Lifecycle — Project Server Subscription Edition](https://learn.microsoft.com/en-us/lifecycle/products/project-server-subscription-edition) — Microsoft Learn, bijgewerkt 15 juni 2026.
15. [Lifecycle — Project Server 2019](https://learn.microsoft.com/en-us/lifecycle/products/project-server-2019) — Microsoft Learn. *Bron voor: extended support t/m 14 juli 2026.*
16. [Lifecycle — Project 2024](https://learn.microsoft.com/en-us/lifecycle/products/project-2024) — Microsoft Learn. *Bron voor: start 1 oktober 2024, retirement 9 oktober 2029.*
17. [Introduction to Project XML Data](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)) — Microsoft Learn (gearchiveerd). *Bron voor: MSPDI-schema.*
18. [How do I convert an MS mpp Project file to Planner?](https://learn.microsoft.com/en-us/answers/questions/5529307/how-do-i-convert-an-ms-mpp-project-file-to-planner) — Microsoft Q&A. *Bron voor: verdwenen MPP-import, Power App-workaround, gebruikersfrustratie.*
19. [Advanced capabilities with premium plans in Planner](https://support.microsoft.com/en-us/office/advanced-capabilities-with-premium-plans-in-planner-6cdba2aa-da06-4e08-be4c-baaa4fda17ba) — Microsoft Support.

**Microsoft — prijzen** (geraadpleegd 25 juli 2026)

20. [Microsoft Planner plans and pricing (en-us)](https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner-plans-and-pricing) — *Planner Plan 1 $10,00; Planner and Project Plan 3 $30,00; Copilot add-on $30,00; alle per gebruiker/maand, jaarlijks betaald.*
21. [Microsoft Planner-abonnementen en prijzen (nl-nl)](https://www.microsoft.com/nl-nl/microsoft-365/planner/microsoft-planner-plans-and-pricing) — *Planner Abonnement 1 €8,70; Planner en Project Abonnement 3 €26,00; per gebruiker/maand, excl. btw, jaarlijks betaald.*
22. [Planner Plan 1 productpagina](https://www.microsoft.com/en-us/microsoft-365/planner/project-plan-1) — *bevestiging $10,00/gebruiker/maand.*
23. [Compare project management solutions and costs](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software) — *Project Standard 2024 $679,99; Project Professional 2024 $1.129,99; Project Server SE "find a partner".*

**Standaarden en open-source interoperabiliteit**

24. [IFC 4.3 — IfcWorkSchedule](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkSchedule.htm) — buildingSMART.
25. [MPXJ — Supported Formats](https://www.mpxj.org/supported-formats/) — *volledige lees-/schrijfmatrix voor MPP, MSPDI, MPX, XER, PMXML en 15+ andere formaten.*
26. [IfcOpenShell — `src/ifc4d/ifc4d/`](https://github.com/IfcOpenShell/IfcOpenShell/tree/v0.8.0/src/ifc4d/ifc4d) — *modulelijst: `msp2ifc.py`, `ifc2msp.py`, `p62ifc.py`, `p6xer2ifc.py`, `ifc2p6.py`, `pp2ifc.py`, `csv2ifc.py`, `csv4d2ifc.py`.*
27. [IfcOpenShell — `ifc2msp.py`](https://raw.githubusercontent.com/IfcOpenShell/IfcOpenShell/v0.8.0/src/ifc4d/ifc4d/ifc2msp.py) — *bron voor de gedocumenteerde MSPDI-beperkingen (werkweek-only, niet-geïmplementeerde exceptions, lag in tienden van minuten).*
28. [IfcOpenShell — `msp2ifc.py`](https://raw.githubusercontent.com/IfcOpenShell/IfcOpenShell/v0.8.0/src/ifc4d/ifc4d/msp2ifc.py) — *bron voor de veldmapping en de niet-geïmplementeerde resource-overdracht.*

**Reviews, vergelijkingen en marktcontext**

29. [PeerSpot — Microsoft Project Reviews](https://www.peerspot.com/products/microsoft-project-reviews) — *4,0/5 uit 86 reviews, 93% aanbeveling; bron voor alle geciteerde gebruikerskritiek over prijs, leercurve, stabiliteit boven 400 regels, support (4/10), multi-currency en de webversie; bouw = 13% van de bezoekers.*
30. [Plan Academy — Microsoft Project vs Primavera P6](https://www.planacademy.com/microsoft-project-vs-primavera-p6/) — *bron voor de baseline-vergelijking (11 vs onbeperkt/4 gelijktijdig), activiteitstypen, duurtypen, percent-complete-methodes en de sectorpositionering.*
31. [Oracle — Primavera P6 EPPM](https://www.oracle.com/uk/construction-engineering/primavera-p6/) — *concurrentiepositionering en referentieklanten.*
32. [Barbecana — Full Monte Schedule Risk Analysis](https://www.barbecana.com/full-monte/) — *Monte-Carlo-add-in; ondersteunt MS Project 2010–2021 en P6 8.4–22.12; geen publieke prijs.*
33. [Wikipedia — Microsoft Project](https://en.wikipedia.org/wiki/Microsoft_Project) — *historie, versietijdlijn, formaatlijst, marktpositieclaims.*
34. [MPUG — Project Online migratie-artikelen](https://www.mpug.com/?s=project+online+retirement) — *praktijkperspectief; bevestigt retirementdatum 30 september 2026.*

---

## Verificatie

*Onafhankelijke, adversariële hercontrole uitgevoerd op 25 juli 2026. Werkwijze: elke bewering is actief geprobeerd te **weerleggen** door de primaire bron opnieuw op te halen en, waar mogelijk, tegen een tweede bron te leggen. Het WebSearch-budget van deze sessie was uitgeput (200/200) en de onafhankelijke zoekmachines DuckDuckGo (captcha) en Mojeek (HTTP 403) weigerden toegang; verificatie verliep daarom via directe URL-ophaling. Dat is een reële beperking: claims die alleen via een zoekmachine tegen te spreken waren, staan hieronder als **onzeker**.*

### Prijzen en licentiemodel

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 1 | Planner basis inbegrepen in M365 Business Basic/Standard, Office 365 E1/E3/E5, M365 A1 | **bevestigd** — exact deze zes SKU's | https://learn.microsoft.com/en-us/planner/planner-for-admins |
| 2 | Planner Plan 1 = $10,00 p/gebruiker/maand, jaarabonnement, auto-renew | **bevestigd** (letterlijk op de pagina) | https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner-plans-and-pricing |
| 3 | Planner and Project Plan 3 = $30,00 p/gebruiker/maand | **bevestigd** | idem |
| 4 | Microsoft 365 Copilot add-on = $30,00 p/gebruiker/maand | **bevestigd** | idem |
| 5 | NL: Planner Abonnement 1 = €8,70 en Planner en Project Abonnement 3 = €26,00, excl. btw, jaarlijks betaald | **bevestigd**; Copilot-add-on staat er op €26,00 | https://www.microsoft.com/nl-nl/microsoft-365/planner/microsoft-planner-plans-and-pricing |
| 6 | Plan 5 staat NIET op de publieke prijspagina, maar bestaat nog in de documentatie | **bevestigd, dubbel** — Plan 5 ontbreekt op zowel de en-us- als de nl-nl-prijspagina; het licensing-artikel noemt als premium-abonnementen alleen Plan 1 en Plan 3; de Project-for-the-web-servicebeschrijving heeft nog wél een volledige Plan 5-kolom | https://learn.microsoft.com/en-us/planner/licensing (bijgewerkt 01-06-2026) · https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/project-web-service-description |
| 7 | Plan 5 historische lijstprijs $55,00 p/gebruiker/maand | **onzeker → aangescherpt naar "niet bruikbaar"** — nergens teruggevonden; Plan 5-productpagina gaf HTTP 503, zoekmachines geblokkeerd. Tekst in §3.1 aangepast: niet gebruiken in kostenvergelijking | *(geen bron gevonden)* |
| 8 | Project Standard 2024 = $679,99 eenmalig, 1 pc, Windows only | **bevestigd** — "one-time purchase", "Licensed for one PC" | https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software |
| 9 | Project Professional 2024 = $1.129,99 eenmalig | **bevestigd** | idem |
| 10 | Project Server SE heeft geen publieke prijs ("find a partner") | **bevestigd** — de vergelijkingspagina toont uitsluitend een partner-link | idem |
| 11 | Software Assurance ≈ 25–29%/jaar | **onzeker** — als schatting gemarkeerd in §3.2 en niet te verifiëren; Microsoft publiceert geen SA-percentages | *(geen bron)* |
| 12 | Project Server SE: serverlicentie enkele duizenden $ + CALs enkele honderden $ | **onzeker** — expliciet als ruwe schatting gemarkeerd in §3.3; geen publieke prijslijst bestaat | *(geen bron)* |
| 13 | Geen minimum seat-afname Plan 1/3; wel 5+ licenties nodig voor Power Platform Production/Sandbox | **bevestigd** — *"For Project Customers with five (5) or more Project for the web licenses, you may deploy Project for the web to Power Platform Production and Sandbox environments"* | https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/project-web-service-description |
| 14 | Verborgen kosten: Power BI-, Power Apps-, Power Automate-licentie; Dataverse boven quota (Plan 1: 3 GB/tenant + 50 MB/gebruiker; Plan 3/5: 5 GB + 250 MB); Teams-licentie | **bevestigd** — alle vier de voetnoten en de capaciteitstabel staan letterlijk in de servicebeschrijving | idem |
| 15 | Monte-Carlo-add-ins als extra kostenpost; Full Monte ondersteunt MS Project 2010–2021 en P6 8.4–22.12, geen publieke prijs | **bevestigd** (letterlijk: "Microsoft Project 2010 through 2021 and Primavera P6 8.4 through 22.12") | https://www.barbecana.com/full-monte/ |

### Technische claims en limieten

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 16 | Desktoplimieten: 400.000 taken, 700.000 resources, 50.000 predecessors/successors, 65.535 outline levels, 998 geconsolideerde projecten, 11 baselines, 1-1-1984 t/m 31-12-2149, 30.000+ base calendars, 255 tekens | **bevestigd, alle tien getallen letterlijk** | https://support.microsoft.com/en-us/office/specifications-for-microsoft-project-71e29e86-28dd-4582-a578-6506c5cc603a |
| 17 | Planner Premium / Project for the web: 3.000 taken, 10 hiërarchieniveaus, 20 links per taak, 2.000 links per project, 150 resources, 20 resources per taak, leaf 1.250 dagen, summary 3.650 dagen, 1-1-2000 – 31-12-2149 | **bevestigd, alle negen getallen letterlijk in de boundaries-tabel** | https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/project-web-service-description |
| 18 | Kritiek pad ontbreekt in Plan 1 | **bevestigd** — featurematrix: Critical path = No voor Office 365 en Plan 1, Yes voor Plan 3/5 | idem |
| 19 | Project Online-limieten: 30.000 projecten/PWA, 2.000 project sites per site collection, 25 GB initiële quota, 450 custom fields per categorie zonder keuzemogelijkheid, Excel-bron >10 MB niet ververbaar, alleen SharePoint classic mode | **bevestigd, alle zes letterlijk** | https://learn.microsoft.com/en-US/ProjectOnline/project-online-software-boundaries-and-limits |
| 20 | Citaat *"It takes more time to calculate multiple calendars"* | **bevestigd, letterlijk als kopje** | idem |
| 21 | CSOM: 2 MB per request ≈ 252 minimale taken; foutmelding "The request uses too many resources"; geen toegang tot lokale .mpp-data; *"Project Online does not support OLAP cubes"* | **bevestigd, alle vier letterlijk** | https://learn.microsoft.com/en-us/office/client-developer/project/what-the-csom-does-and-does-not-do |
| 22 | "CSOM dekt twaalf PSI-services niet" | **bevestigd, met leesrisico** — de niet-gedekte lijst telt inderdaad 12 services (Admin, Archive, CubeAdmin, Driver, LoginForms, LoginWindows, Notifications, ObjectLinkProvider, PortfolioAnalyses, QueueSystem, Security, WssInterop). Let op: dezelfde pagina zegt óók dat CSOM "the twelve most commonly used PSI services" wél dekt — twee verschillende twaalftallen, makkelijk te verwarren | idem |
| 23 | Project Server SE: *"there are no major features or enhancements"*, geen in-place upgrade, alleen via PowerShell vanaf Project Server 2016/2019, Windows Server 2019/2022 + SQL Server 2019 | **bevestigd, alle vier letterlijk** | https://learn.microsoft.com/en-us/project/new-features-capabilities-project-server-subscription-edition |
| 24 | Portfolio analysis & prioritization alleen in Plan 5 / Project Server | **bevestigd** — featurematrix: Plan 3 = No, Plan 5 = Yes; idem voor resource capacity planning, custom branding, user management, service administration | https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/microsoft-project-online-service-description |
| 25 | MS Project heeft geen enkele IFC-/BIM-ondersteuning | **bevestigd bij benadering** — een negatieve claim is niet hard te bewijzen, maar geen van de geraadpleegde Microsoft-formaat-, service- en specificatiepagina's noemt IFC, buildingSMART of enig BIM-formaat; ook de MPXJ-formatenlijst kent geen IFC-koppeling aan de Microsoft-kant | *(afwezigheidsbewijs; zie bronnen 7, 23, 25)* |

### Levenscyclus en eigendom

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 26 | Project 2024 volgt Modern Lifecycle Policy, start 1-10-2024, retirement 9-10-2029, geldt voor Standard én Professional | **bevestigd, exact** (`2024-10-01` → `2029-10-09`) | https://learn.microsoft.com/en-us/lifecycle/products/project-2024 |
| 27 | Extended support Project Server **2019** eindigt 14-7-2026 | **bevestigd, exact** (`2026-07-14`; mainstream eindigde 9-1-2024) | https://learn.microsoft.com/en-us/lifecycle/products/project-server-2019 |
| 28 | Extended support Project Server **2016** eindigt eveneens 14-7-2026 | **bevestigd, exact** (`2026-07-14`; mainstream eindigde 13-7-2021) — apart nagetrokken, was in het oorspronkelijke profiel niet los onderbouwd | https://learn.microsoft.com/en-us/lifecycle/products/project-server-2016 |
| 29 | Project Online wordt uitgezet op **30 september 2026** | **gecorrigeerd naar deels onzeker** — Microsoft's productdocumentatie bevestigt op twee onafhankelijke plaatsen alleen *"will be retired in September 2026"*, zonder dag. De dag 30-9 komt uitsluitend uit de Planner-blogaankondiging, die bij hercontrole niet uitleesbaar was. Maand hard, dag onbevestigd. Voorbehoud toegevoegd in §1.2 | https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/microsoft-project-online-service-description · https://learn.microsoft.com/en-US/ProjectOnline/project-online-software-boundaries-and-limits |
| 30 | Project for the web met pensioen op 1 augustus 2025, opgegaan in Planner | **bevestigd, letterlijk** — *"Microsoft Project for the web is retiring on August 1, 2025"* | https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/project-web-service-description |
| 31 | Hernoemingen: Project Plan 1 → Planner Plan 1 in april 2024; Project Plan 3/5 → Planner and Project Plan 3/5 op 18 september 2024 | **bevestigd, beide data letterlijk** | https://learn.microsoft.com/en-us/planner/planner-for-admins |
| 32 | Premium Planner-functionaliteit niet beschikbaar in GCC High en DoD | **bevestigd, tweemaal** — *"premium capabilities are currently not available for customers in Government Cloud Communities (GCC) High nor Department of Defense (DoD) tenants"* en *"It is not yet available in GCC High, and DoD"* | idem · Project for the web service description |
| 33 | GCC/GCC High/DoD-beschikbaarheid "voor de desktopclient" (§4.10 en §7.5) | **gecorrigeerd** — Microsoft's uitspraak betreft **Project Online**, niet de desktopclient. Beide passages herschreven | https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/microsoft-project-online-service-description |
| 34 | Eigendom: Microsoft kocht de rechten in 1985; eerste commerciële release 1984 (MS-DOS); concept van Ron Bredehoeft; laatste Mac-versie Project 4.0 in 1993 | **bevestigd op één bron** — alle vier letterlijk in het Wikipedia-artikel; geen tweede onafhankelijke bron beschikbaar zonder zoekmachine. De toevoeging "Mac-ontwikkeling gestaakt in 1994" staat er níet zo; als afgeleid gemarkeerd in §1.2 | https://en.wikipedia.org/wiki/Microsoft_Project |
| 35 | Marktleiderschap: "dominant PC-based project management software"; populairste PM-applicatie 2015–2020 volgens Project Management Zone | **bevestigd als citaat, onzeker als feit** — het profiel schrijft de claim correct aan Wikipedia toe en presenteert haar niet als eigen meting. De onderliggende ranglijst (Project Management Zone) is niet zelf geraadpleegd en de periode eindigt in 2020 — als bewijs voor de marktpositie in 2026 is dit **zwak** | idem |
| 36 | Plan 5 wordt nog genoemd in productdocumentatie en retirement-FAQ | **bevestigd** — volledige Plan 5-kolom in beide servicebeschrijvingen, terwijl het licensing-artikel Plan 5 weglaat | zie #6 |

### Interoperabiliteit

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 37 | MPXJ leest MPP maar kan het **niet schrijven**; MPP-leesondersteuning dekt Project 98 t/m 2019 | **bevestigd, letterlijk** — *"MPXJ supports read only access to MPP files"*; leeslijst eindigt inderdaad bij Project 2019 (dus géén 2021/2024) | https://www.mpxj.org/supported-formats/ |
| 38 | MPXJ leest én schrijft MSPDI, MPX, XER, PMXML, Planner, SDEF | **bevestigd, alle zes** | idem |
| 39 | MPX: schrijven eindigde na Project 98; lezen mogelijk t/m Project 2010 | **deels gecorrigeerd** — schrijfgrens bevestigd via Wikipedia; de **leesgrens Project 2010 is nergens onderbouwd**. Tabel §6.1 en een noot aangepast | https://en.wikipedia.org/wiki/Microsoft_Project |
| 40 | IFC 4.3: `IfcWorkSchedule` erft `CreationDate`, `StartTime`, `FinishTime`, `Duration`, `Purpose` + `PredefinedType`; taken via `IfcRelAssignsToControl`; nesten via `IfcRelAggregates`; **werkkalender aan de summary task, niet aan het werkschema** | **bevestigd, alle vier** — letterlijk: *"a work calendar shall be assigned to the summary task and not the work schedule"* | https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkSchedule.htm |
| 41 | IfcOpenShell `msp2ifc.py` parst MSPDI, mapt Name/OutlineNumber/OutlineLevel/Start/Finish/Duration/Priority/CalendarUID/predecessors en ondersteunt alle vier relatietypen | **bevestigd in de broncode** (sequence-mapping 0=FF, 1=FS, 2=SF, 3=SS) | https://raw.githubusercontent.com/IfcOpenShell/IfcOpenShell/v0.8.0/src/ifc4d/ifc4d/msp2ifc.py |
| 42 | De vier gedocumenteerde brugbeperkingen: working-week-only, *"Exceptions not yet implemented"*, lag in tienden van een minuut (*"Seriously, Microsoft?"*), resources *"Doesn't do anything right now"*, plus *"BIG assumptions"* over exception-types | **bevestigd — alle vijf citaten letterlijk in de broncode teruggevonden** | idem · https://raw.githubusercontent.com/IfcOpenShell/IfcOpenShell/v0.8.0/src/ifc4d/ifc4d/ifc2msp.py |

### Reviews en marktcontext

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 43 | PeerSpot: 4,0/5 uit 86 reviews, 93% aanbeveling, bouw = 13% en grootste sector | **bevestigd, alle vier** (bouw is expliciet *"the top industry researching this solution"*) | https://www.peerspot.com/products/microsoft-project-reviews |
| 44 | P6 kan vier baselines tegelijk toewijzen en onbeperkt bewaren | **bevestigd** — *"can assign 4 baseline to a project at one go"*; opslag begrensd door de database | https://www.planacademy.com/microsoft-project-vs-primavera-p6/ |
| 45 | 11 baselines in MS Project | **bevestigd via Microsoft (11), telverschil met Plan Academy (10) genoteerd** in §2.4 | zie #16 en #44 |
| 46 | Gebruikersklachten (*"very unstable … more than 400 lines"*, support 4/10, prijs "roughly double what it should", geen multi-currency) | **onzeker** — deze citaten staan op individuele PeerSpot-reviewpagina's die in deze ronde niet afzonderlijk uitleesbaar waren; alleen de aggregaatcijfers (#43) zijn hercontroleerd. Het profiel presenteert ze correct als gebruikerswaarneming, niet als meting | *(niet hercontroleerd)* |
| 47 | Eigen schatting "comfortabel werkbaar tot 5.000–10.000 taken" | **onzeker, maar correct gelabeld** — expliciet als eigen inschatting gemarkeerd in §2.9; geen benchmark beschikbaar | *(eigen inschatting)* |

### Samenvattend oordeel

**Sterk punt van dit profiel:** de harde, falsifieerbare kern — alle vier de actuele prijzen (US én NL), beide perpetual-bedragen, alle tien desktoplimieten, alle negen Planner-Premium-limieten, alle zes Project Online-limieten, drie lifecycle-datums en vijf letterlijke broncode-citaten — is **volledig en letterlijk bevestigd**. Er zijn geen verzonnen getallen aangetroffen.

**Zwakke plekken, in volgorde van belang:**
1. **De $55-lijstprijs voor Plan 5** is nergens terug te vinden en moet uit elke kostenvergelijking worden gehouden (was al als schatting gemarkeerd, nu aangescherpt).
2. **De precieze retirementdag 30 september 2026** rust op één niet-hercontroleerbare blogpost; Microsoft's documentatie noemt alleen de maand.
3. **GCC High/DoD-beschikbaarheid werd aan de verkeerde component toegeschreven** (desktopclient i.p.v. Project Online) — gecorrigeerd op twee plaatsen.
4. **De marktleiderschapsclaim** steunt op een Wikipedia-verwijzing naar een ranglijst uit 2015–2020 en is als bewijs voor 2026 zwak.
5. **"MPX leesbaar t/m Project 2010"** en de **hele versiehistorie** hangen aan één bron of aan geen bron.

*Verificatie uitgevoerd 25-07-2026. Alle in deze sectie genoemde URL's zijn op die datum daadwerkelijk opgehaald, tenzij anders vermeld.*
