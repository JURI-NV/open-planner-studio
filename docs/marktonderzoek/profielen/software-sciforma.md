# Sciforma (sinds 2025: Planview ProjectAdvantage)

**Diepgaand softwareprofiel — marktonderzoek planningssoftware**
Onderzoeksdatum: 25 juli 2026 · Analist: software-analist marktonderzoek
Alle bedragen zijn lijstprijzen zoals gepubliceerd door de bron op de genoemde datum. Schattingen zijn expliciet gemarkeerd met **[SCHATTING]**. Onbevestigde punten met **[ONBEVESTIGD]**.

---

## 0. Kernbevinding vooraf — lees dit eerst

**Sciforma bestaat als zelfstandige leverancier niet meer.** Planview heeft Sciforma op **18 februari 2025** overgenomen; het vlaggenschipproduct *Sciforma Vantage* is hernoemd tot **Planview® ProjectAdvantage**. Sinds ergens in de eerste helft van 2026 geeft `www.sciforma.com` een **HTTP 301 permanent redirect** naar `planview.com/acquisitions/about-sciforma/` — inclusief alle taalvarianten (`/fr/`, `/de/`) en alle diepe links. Dat is geverifieerd op 25 juli 2026:

```
curl -o /dev/null -w "%{http_code} -> %{redirect_url}" https://www.sciforma.com/
301 -> https://www.planview.com/acquisitions/about-sciforma/
```

**Correctie na hercontrole (25 juli 2026):** de redirect gaat níét overal naar dezelfde bestemming. Hertest per pad:

| Pad op `www.sciforma.com` | Status | Bestemming |
|---|---|---|
| `/` , `/pricing/` , `/fr/` , `/de/` | 301 | `planview.com/acquisitions/about-sciforma/` |
| `/faqs/` | 301 | `planview.com/` (**root**, niet de about-pagina) |
| `/solutions/project-planning/` | 301 | `planview.com/products-solutions/products/planview-vantage/` |

De oorspronkelijke formulering "alle diepe links → about-sciforma" was dus te grof. Het merk is in ~17 maanden na de overname operationeel opgeheven. Wie vandaag "Sciforma" evalueert, evalueert in werkelijkheid een productlijn binnen de Planview-portfolio, met alle rationalisatierisico's die daarbij horen (zie §5 en §8). Deze rapportage gebruikt "Sciforma" voor het historische product en "ProjectAdvantage" waar het over de huidige situatie gaat.

**Tegenwicht bij "merk dood ≠ product dood":** het Customer Success Center (`success.sciforma.com`, nu publiek bereikbaar, titel *Planview ProjectAdvantage Customer Success Center*) toont op 25 juli 2026 een **doorlopende maandelijkse releasecadans**: releases 2025.10, 2025.11, 2025.12, 2026.01 t/m **2026.06** (gepubliceerd 02-07-2026). Het product zit dus aantoonbaar níét in onderhoudsmodus; het rationalisatierisico in §5.1 blijft een vooruitblik, geen waargenomen feit.

**Tweede kernbevinding:** Sciforma is — anders dan de meeste moderne "work management"-tools — **wél een echte netwerkplanner met een CPM-motor**, geen balkenschema-tekenaar. Zie §2. Maar het is een *IT/NPD-portfolio*-planner, geen *bouw*-planner: geen XER, geen P6 XML, geen IFC, geen AEC-verticaal.

---

## 1. Wat het is

### 1.1 Leverancier en historie

| Jaar | Gebeurtenis |
|---|---|
| 1982 | Oprichting; eerste product **Project Scheduler** (desktop-CPM-tool, San Jose / Los Gatos, Californië) |
| maart 2004 | **PSNext 1.0** — herbouw als Java-webapplicatie, opvolger van Project Scheduler |
| juni 2006 | PSNext 2.0 |
| januari 2009 | PSNext 3.0 |
| 2009, 2010 | Door Gartner als **"Visionary"** geplaatst in de Magic Quadrant voor IT Project & Portfolio Management |
| september 2011 | Herbranding: **Sciforma 4.0** (PSNext-naam verdwijnt) |
| juni 2012 / sept 2013 / maart 2015 | Sciforma 5.0 / 6.0 / **7.0** |
| januari 2018 | **Sciforma 7.1** — de "klassieke" PPM-motor; dit is de generatie die de meeste bestaande klanten draaien |
| maart 2021 | **Symphony Technology Group (STG)**, private-equity uit Palo Alto, koopt Sciforma van oprichter Yann Le Bihan en co-CEO Jérôme Anrès. Doug Braun wordt CEO |
| oktober 2021 | Sciforma koopt **One2Team** (Frans, Collaborative Work Management) |
| 2022–2023 | Lancering **Sciforma Vantage**: 7.1 wordt module *Sciforma Plan* (PPM), One2Team wordt *Sciforma Deliver* (CWM) |
| 22 maart 2023 | Fusie met **KeyedIn** (Minneapolis, VK/Nordics-sterk); groep krijgt hoofdkantoor **Parijs** |
| 4 sept 2024 | Vendor claimt plaatsing als **Leader** in Gartner MQ *Adaptive Project Management and Reporting* voor Sciforma Vantage én KeyedIn Enterprise **[niet onafhankelijk verifieerbaar — Gartner-pagina's blokkeren geautomatiseerde toegang]** |
| **18 feb 2025** | **Planview** (portfoliobedrijf van TA Associates + TPG Capital) neemt Sciforma over van STG. Bedrag niet bekendgemaakt |
| 2025–2026 | Vantage → **Planview ProjectAdvantage**; sciforma.com 301 naar planview.com |

De juridische en geografische identiteit is dus in twintig jaar verschoven van **Amerikaans** (San Jose/Los Gatos) naar **Frans-geleid** (Parijs, met Duitse/Britse/Japanse/Australische vestigingen) naar **opgenomen in een Amerikaanse PE-gefinancierde consolidator** (Planview, Austin TX). De opdracht noemde "Frans/Duits/Amerikaans PPM" — dat klopt precies: Amerikaanse oorsprong, Franse zwaartekracht, Duitse tweede markt.

### 1.2 Doelgroep en typische gebruikers

Sciforma is een **PMO-tool**, geen planner-tool. De rolverdeling die de leverancier zelf hanteert:

- **C-level / VP transformatie, strategie, R&D, operations** — portfoliobeslissingen, scenario's
- **PMO / EPMO** — governance, standaardisatie, rapportage, capaciteitsplanning
- **Projectmanagers** — schema's, toewijzingen, deliverables, risico's, statusrapporten
- **Resourcemanagers** — pools, skills, heatmaps, goedkeuren van resourceverzoeken
- **Teamleden** — timesheets, taakupdates, Kanban
- **Work Package Managers** — gedelegeerd beheer van een deel van het project (contract, KPI's, leverspecificaties)

Typische organisatiegrootte: **middelgroot tot zeer groot**. In de 6sense-klantendatabase (457 getrackte organisaties, stand 25 juli 2026) zit het zwaartepunt bij **10.000+ medewerkers (130 organisaties)** en **1.000–4.999 medewerkers (104)**.

### 1.3 Sectoren

Officiële verticalen van de leverancier: **Banking & Insurance, Pharma & Biotechnology, Hospitals & Healthcare, Manufacturing**. In de footer aanvullend: Chemicals, Software, Telecommunications, Services, Transportation, Aeronautics, Food & Beverages, Automotive.

**Bouw / infrastructuur / AEC staat er niet bij — in geen enkele bron.** Dat is een structureel gegeven, geen omissie: de productarchitectuur (soft/generieke toewijzingen, timesheets, phase gates, ideation) is gebouwd voor IT-portfolio's en nieuwe-productontwikkeling, niet voor een aannemersplanning met werkpakketten, hoeveelheden en onderaannemers.

Genoemde referentieklanten: Boeing, Netgear, Zodiac Aerospace, Société de Transport de Montréal, Société Générale Algérie, Stago, Incitec Pivot, Bettis Atomic Power Lab.

### 1.4 Regio's

Vendorclaims — **woordelijk bevestigd** in de Wayback-snapshot van 7 dec 2025 (paginavoet: *"40 years of experience · 275 employees around the world · +300,000 users worldwide · +100 countries covered"*).

**Belangrijke tegenspraak [GECORRIGEERD].** Planviews eigen overnamepagina spreekt niet van 22 landen mét 300.000 gebruikers, maar van *"thousands of users in organizations across **22 countries**"*. De koper zegt dus **duizenden** gebruikers waar de verkoper **300.000+** claimde. Dat is een verschil van twee ordegroottes. De meest waarschijnlijke verklaring is dat "300.000+ users" een cumulatieve, historische installed-base-marketingclaim is en "thousands" de actieve betaalde basis — maar dat is **[SCHATTING]**. Het cijfer 300.000 is als eerstehands *claim* bevestigd, als *feit* niet, en de eerdere kwalificatie "plausibel" in §7.3 is daarmee te welwillend.

Werkelijke geografische verdeling volgens 6sense (**457** getrackte klanten, stand 25 juli 2026 — **[GECORRIGEERD]**, de eerder genoemde 465 is niet meer reproduceerbaar; het cijfer drift met elke crawl):

| Land | Klanten | Aandeel |
|---|---|---|
| **Frankrijk** | 182 | **45,16 %** |
| Verenigde Staten | 90 | 22,33 % |
| Verenigd Koninkrijk | 44 | 10,92 % |

**Let op:** die percentages rekenen tegen een noemer van ~403 klanten (182 / 0,4516), niet tegen 457. 6sense mixt hier twee populaties; behandel zowel het totaal als de aandelen als grove indicatie.

Uit het KeyedIn-fusiebericht (22 maart 2023), letterlijk: *"KeyedIn has a strong presence in the UK and Nordic countries, while Sciforma has a historically strong customer base in **France, Benelux, and Germany**."* Voor een Nederlandse opdrachtgever is dat relevant: Sciforma is in de Benelux een van de weinige PPM-pakketten met een echt geïnstalleerde basis en lokale dienstverlening.

Kantoren (historisch): Frankrijk, Duitsland, VK, Australië, Japan + distributeurs elders. Producttalen: 7 (EN, FR, DE, ES, JA, HE, PL) — beduidend minder dan bijvoorbeeld MS Project of Primavera.

---

## 2. Functionaliteit en techniek — is dit een échte planner?

### 2.1 Oordeel: ja, dit is een echte CPM-engine

De opdracht vraagt hier streng te zijn omdat veel werkbeheertools alleen balken tekenen. **Sciforma valt niet in die categorie.** De tool stamt af van *Project Scheduler* (1982), een klassieke CPM-desktoptool, en die motor is meegemigreerd. Concreet bewijs uit de officiële documentatie (`success.sciforma.com`, Customer Success Center) en de productpagina's:

| Kenmerk | Bevinding | Bewijs |
|---|---|---|
| **Netwerkplanning (CPM)** | Ja. Er is een eigen documentatiethema "Critical Path Methodology" en een expliciete keuze **Schedule Method: Critical Path vs. Critical Chain** per project | Sciforma-docs `project-initialization/schedule-method`; Planview: "critical path scheduling" |
| **Schedule Type (taaktype)** | Ja. Standaard **ASAP**; **ALAP** beschikbaar (taken met float worden dan aan het einde van de float geplaatst) | Sciforma-docs `tasks-scheduling/schedule-type-0` |
| **Datumconstraints** | Ja. O.a. **Must Start On** — "overrides all other restrictions on the start of a task with the exception of an Actual Start Date". Ook **Required Date** (streefdatum): als de geplande einddatum daar voorbij gaat, toont Sciforma **negatieve float** | Sciforma-docs `how-enter-tasks-date-constraints` |
| **Negatieve float** | Ja, expliciet ondersteund en zichtbaar | idem |
| **Afhankelijkheidstypen** | **FS, SS, FF bevestigd** in de documentatie. **SF (Start-to-Finish) niet aangetroffen** in bereikbare documentatie — **[ONBEVESTIGD]**; gezien de MSPDI-uitwisseling is SF waarschijnlijk wel aanwezig **[SCHATTING]** | Sciforma-docs `topics/user/dependencies` |
| **Lag / lead** | Ja, per relatie, positief (vertraging) en negatief (overlap). Aparte **Start Delay** op taakniveau | Sciforma-docs `dependencies`, `tasks-scheduling/start-delay` |
| **Cross-project links** | Ja — er is een documentatiethema **"Projects Interdependencies"** en multi-project synchronisatie in de CCPM-modus | Docs-navigatie |
| **Kalenders** | Ja, en met een echte **hiërarchie**: base calendar → project calendar → task calendar → resource calendar. Uitzonderingen (niet-werkdagen) per kalender. Er is zelfs een optie **"Ignore Resource Calendar"** om te voorkomen dat taakdata verschuiven door individuele vrije dagen | Sciforma-docs `resource-allocations/calendar`, `resources-scheduling` |
| **Resource leveling** | Ja, automatisch, met prioriteiten. Documentatie: bij gelijke prioriteit kiest Sciforma de verschuiving met de **minste impact op het kritieke pad en de projecteinddatum**. Er is een aparte *Level Resources*-dialoog | Sciforma-docs `resources-leveling/level-resources-dialog-box-0` |
| **Critical Chain (CCPM)** | Ja, volwaardig: identificatie van de critical chain, **bufferconstructie**, oplossen van resourcecontentie, **fever charts**, multi-projectsynchronisatie. Sciforma bewaart automatisch **Baseline 10** vóór het levelen zodat je het leveling-effect kunt vergelijken | sciforma.com `solutions/project-planning`; docs `define-critical-chain-0` |
| **Baselines** | Ja, **meerdere genummerde baselines** (minstens 10 slots; "Baseline 10" wordt door CCPM gereserveerd). Planview: "multiple baselines for change control" | docs; planview.com productpagina |
| **Earned value** | Ja — BCWP/verdiende waarde is onderdeel van *Schedule Tracking* | Sciforma-docs `schedule-tracking` |
| **Kostenmodel** | Ja: budgetten, planned vs. actual cost, financiële transacties op taakniveau, cost items naast labor, benefits-tracking | planview.com productpagina; sciforma.com project-planning |
| **WBS** | Ja, plus **projecthiërarchie** (portfolio → programma → project → fase → taak → work item) | Docs-navigatie ("Projects Hierarchy") |
| **Methodologieën** | Waterfall, Agile (sprints, story points, budget points, baseline points, taakkaarten), Phase-Gate, CCPM, en hybride binnen één project | sciforma.com |

> **⚠ Bewijswaarschuwing na hercontrole (25 juli 2026).** De hele bovenstaande tabel steunt op deep links naar `success.sciforma.com/topics/user/…`. Bij hertest zijn **al die URL's dood (HTTP 404)**; het portaal is verhuisd naar een `/en/…`-structuur en de oude paden bestaan niet meer, ook niet met `/en`-prefix. Er is dus op dit moment **geen naslag mogelijk** van de citaten. Wat wél onafhankelijk te bevestigen is:
>
> - **Bevestigd:** critical path scheduling, dependencies, **multiple baselines** — letterlijk op de Planview-productpagina: *"Manage complex project plans with advanced Gantt views, critical path scheduling, dependencies, and multiple baselines for change control."*
> - **Bevestigd:** CCPM als ondersteunde methodologie (Wikipedia, *Sciforma*-lemma, methodologiesectie).
> - **Bevestigd:** kritiek pad in de Gantt en MS Project XML-import/export (project-management.com review: *"users can manage project critical path…"*, *"Sciforma integration with Microsoft Project is possible through XML import/export"*).
> - **Onbevestigd/onzeker:** ASAP-vs-ALAP, Must Start On, **negatieve float**, de vierlaagse kalenderhiërarchie, de leveling-heuristiek, Baseline 10 en earned value/BCWP. Opvallend: de Planview-productpagina noemt **géén** critical chain, **géén** resource leveling en **géén** earned value bij de scheduling-features. Dat weerlegt de claims niet, maar het bewijs staat nu op één been.
>
> Behandel §2.1 daarom als *plausibel maar niet-verifieerbaar*, niet als vastgesteld feit.

**Conclusie op de strenge vraag:** Sciforma hoort thuis in de categorie *echte netwerkplanners* — samen met MS Project, Primavera P6, Asta Powerproject, Safran, Spider — en niet in de categorie balkenschema-tekenaars (Asana, monday.com, ClickUp, Wrike, Smartsheet, Trello). Het heeft forward/backward pass, float, constraints, kalenderhiërarchie, leveling én CCPM. Dat laatste is zelfs zeldzaam: buiten Sciforma, Realization en Exepron bieden weinig mainstreampakketten volwaardige Critical Chain.

### 2.2 Waar het níét het niveau van een bouw-CPM-tool haalt

Eerlijkheid vereist ook de andere kant:

- **Geen forensische/claim-functionaliteit.** Geen retained logic vs. progress override, geen gedocumenteerde out-of-sequence-afhandeling, geen DCMA-14-achtige schedule-qualitychecks, geen windows-analyse of time-impact-analyse. Wie schemavertragingsclaims moet onderbouwen, heeft P6 of Asta nodig.
- **Geen hoeveelheden/productiviteitsplanning.** Geen quantity-based duurberekening, geen locatiegebaseerde planning (flowline/LOB), geen takt.
- **Resourcemodel is mensgericht, niet materieelgericht.** Hard, soft en generieke toewijzingen, skills, job classifications, capaciteitspools, heatmaps, uniform/niet-uniform verdeelde uren — uitstekend voor een engineeringafdeling, maar er is geen materieel-/materiaalmodel zoals in bouwtools.
- **Geen 4D/BIM.** Zie §6.

### 2.3 Platform, architectuur en schaalbaarheid

- **Architectuur:** Java-gebaseerde webapplicatie, client-server, thin client + HTML5-interface, ook mobiel. Geen native desktoptool meer sinds PSNext (2004).
- **Databases (klassieke 7.x on-premise):** PostgreSQL, Microsoft SQL Server, IBM DB2, Oracle.
- **Applicatieservers:** Apache Tomcat, IBM WebSphere, Oracle WebLogic, JBoss.
- **Deployment:** SaaS (primair) **én on-premise** — de leverancier bevestigt beide opties, wat in dit segment inmiddels uitzonderlijk is. Klanten kunnen de **datacenterlocatie kiezen**; data-at-rest blijft in het land van herkomst (relevant voor EU-datasoevereiniteit).
- **Compliance:** ISO 27001 gecertificeerd voor de cloudservices in alle regio's; SOC 1 Type II; SOC 2 Type II aangekondigd voor 2025. EU-GDPR en UK-GDPR, SCC's voor internationale doorgifte. Toegang tot data beperkt tot medewerkers in EU, VK, VS en India.
- **SSO** ondersteund.
- **AI:** ProjectAdvantage claimt "AI-powered capabilities for work updates and risk identification" en een AI-Microsoft-Teams-integratie. In de documentatienavigatie staat een component **"Anvi"** — vermoedelijk de AI-assistent **[ONBEVESTIGD, alleen als navigatie-item aangetroffen]**.

**Schaalbaarheid — hoeveel taken realistisch?**
De leverancier publiceert **geen** harde limieten (geen max. aantal activiteiten per project, geen max. relaties). Wat wél consistent uit reviews komt: *"Performance can lag with a high amount of datasets"* (Capterra), *"general slowness … regarding SSO, Gantt chart manipulation, and scheduling simple tasks"*, *"occasional slowness … particularly when dealing with large projects or complex data sets"*.

**[SCHATTING]** Op basis van die signalen en de thin-client-architectuur schat ik het comfortabele bereik op **enkele honderden tot circa 2.000–5.000 activiteiten per project**, met merkbare degradatie in de Gantt daarboven. Het ontwerppunt van het systeem is niet één megaschema maar **honderden tot duizenden projecten naast elkaar** met tienduizenden taken in het totaal — portfolio-breedte, niet schema-diepte. Een aannemersschema van 20.000+ activiteiten met een dagelijkse update-cyclus is buiten scope. Dit is nadrukkelijk een schatting; er is geen gepubliceerde benchmark.

---

## 3. Prijzen

> **Waarschuwing bij dit hoofdstuk.** Sciforma/Planview publiceert geen prijslijst; alles gaat via sales-quote. De enige *eerstehands* prijsuitspraak is een FAQ-antwoord van de leverancier zelf. De rest komt van reviewmarktplaatsen. Meerdere populaire "pricing"-sites (subscribed.fyi, softwarefinder, checkthat.ai, research.com) bevatten aantoonbaar AI-gegenereerde en onderling tegenstrijdige cijfers; die zijn hieronder als **lage betrouwbaarheid** gemarkeerd of weggelaten.

### 3.1 Eerstehands leveranciersopgave

| Bedrag | Model | Bron | Datum |
|---|---|---|---|
| **US$ 15 – 90 per gebruiker per maand** | Per user/month; hoogte hangt af van **aantal gebruikers** én **toegewezen rol** in het platform | Sciforma FAQ, sciforma.com/faqs/ (letterlijk: *"Sciforma's pricing is structured on a per-user, per-month basis, with costs ranging from $15 to $90"*) — pagina nu offline, geraadpleegd via Wayback-snapshot | snapshot **7 dec 2025** |

Het citaat is **woordelijk geverifieerd** in de Wayback-snapshot `web.archive.org/web/20251207124735/https://www.sciforma.com/faqs/`, onder de vraag *"How does Sciforma's pricing work?"*:

> *"Sciforma's pricing is structured on a per-user, per-month basis, with costs ranging from $15 to $90. The specific price depends on factors such as the number of users and their assigned roles within the platform. For detailed information tailored to your organization's requirements, contact us directly."*

Omgerekend: **US$ 180 – 1.080 per gebruiker per jaar**.

**[GECORRIGEERD]** De eerdere omrekening gebruikte een verouderde koers (~1,10 USD/EUR). Werkelijke ECB-referentiekoers op **24 juli 2026: 1 USD = € 0,879** (1 EUR = US$ 1,138). Correct omgerekend is US$ 15–90 dus **€ 13 – 79 per gebruiker per maand** / **€ 158 – 950 per gebruiker per jaar**. De instapprijs van US$ 760/gebruiker/jaar (§3.2) is **≈ € 668 per gebruiker per jaar**.

De spreiding 15↔90 is een **rolgebaseerde staffel**: een timesheet-invoerende teammedewerker zit onderaan, een projectmanager/PMO-gebruiker met volledige planningsrechten bovenaan. Dat is het gangbare model in enterprise-PPM (vergelijk Planview Portfolios, Clarity, Planisware).

### 3.2 Marktplaatsprijzen (huidige naam: Planview ProjectAdvantage)

| Bedrag | Model | Bron-URL | Geraadpleegd |
|---|---|---|---|
| **US$ 760 per gebruiker per jaar** ("Basic") | Jaarlijks, per gebruiker. **Geen gratis proefversie, geen gratis versie** | capterra.com/p/18756/Sciforma/pricing/ → nu *Planview ProjectAdvantage* | 25 juli 2026 |
| **US$ 760 per gebruiker per jaar** | Jaarlijks abonnement; deze bron meldt **wél een proefversie én een gratis versie** (dubbel tegenstrijdig met Capterra — beide zijn Gartner Digital Markets) | getapp.com/project-management-planning-software/a/sciforma/pricing/ | 25 juli 2026 |
| **Vanaf US$ 20 per gebruiker per maand** | Per user/month; proefversie "Yes – Request for Free" | selecthub.com/p/ppm-software/sciforma/ | 25 juli 2026 |

**[GECORRIGEERD]** Twee details in de vorige versie klopten niet:
- GetApp meldt niet alleen een trial maar óók een "free version"; de tegenstrijdigheid met Capterra ("no free version, no free trial") is dus groter dan eerder beschreven. Gegeven dat de leverancier zelf nergens een gratis tier noemt en de FAQ uitsluitend naar *"Request a Demo"* verwijst, is **Capterra hier vrijwel zeker de juiste** en zijn de GetApp-badges vervuiling.
- De prijsklasse-notatie van SelectHub is bij hercontrole niet als "$$–$$$$" te reproduceren (de pagina toont een 5-symbolenschaal zonder eenduidige uitlezing). Die claim is **verwijderd**.

US$ 760/jaar ≈ **US$ 63 per gebruiker per maand** — dat valt netjes in de bovenste helft van de leveranciersrange van $15–90 en is vermoedelijk het **PM/PMO-seat** **[SCHATTING — geen enkele bron benoemt welk seat dit is; ook de planbenaming "Basic" is bij hercontrole op Capterra níét bevestigd]**. De $20/maand van SelectHub komt overeen met het **lichte teamlid-seat** **[SCHATTING]**.

### 3.3 Minimale zetelaantallen, gratis tier, add-ons

- **Gratis tier: nee.** Geen freemium, geen permanent gratis plan. Proefversie alleen na salescontact (bronnen spreken elkaar tegen over of er überhaupt een trial is).
- **Minimum aantal seats:** niet officieel gepubliceerd — **bevestigd** door integrale hercontrole van de volledige gearchiveerde FAQ-tekst (7 dec 2025): het woord "minimum" komt in de hele prijs- en licentiecontext niet voor, en de enige genoemde prijsdrijvers zijn *"the number of users and their assigned roles"*. Diverse aggregators noemen **10 of 20 gebruikers minimum** — **[LAGE BETROUWBAARHEID, niet-primaire bron, niet reproduceerbaar bij hercontrole]**. **[SCHATTING]** Realistisch minimum voor een enterprise-PPM-deal van deze klasse: **25–50 seats**, met een praktische bodem van **US$ 25.000–40.000 per jaar** voordat een leverancier van dit type een deal interessant vindt.
- **Enterprise-staffels:** de leverancier bevestigt volumeafhankelijkheid ("depends on … the number of users"). Aggregators claimen ~$15/gebruiker/maand bij 100 gebruikers en volledig maatwerk boven 1.000 — **[LAGE BETROUWBAARHEID]**.
- **Betaalde add-ons die je in de praktijk nodig hebt:**
  - **Sciforma University / eLearning** — expliciet een **jaarlijks abonnement** bovenop de licentie, met "standaard" en "bespoke" aanpassingspakketten.
  - **Personalized Training** en **Public Classroom Training** — apart geprijsd.
  - **"Administration as a Service"** — uitbestede gebruikersadministratie, aparte dienst.
  - **Professional Services**: eLearning & Training Services, Managed Service Offerings, Strategic Advisory Consulting — drie afzonderlijke dienstenlijnen.
  - **Integraties** (Jira, ERP): via partners zoals Rego Consulting of Tray.ai; reviewers noemen API-integratie expliciet "complex and potentially costly".
- **Implementatiekosten:** niet gepubliceerd. **[SCHATTING]** Op basis van reviewcommentaar ("the setup process took a while", "a fair amount of customization to get the reporting where they wanted it", "the initial setup took a long time") en de gangbare ratio in enterprise-PPM ligt de eerstejaars-implementatie op **0,5× tot 1,5× de jaarlicentie**.

### 3.4 Prijspositionering versus concurrenten

Ter kalibratie, **elk cijfer hieronder is op 25 juli 2026 opnieuw bij de bron gecontroleerd**:

| Product | Prijs | Status | Bron |
|---|---|---|---|
| Clarity (Broadcom) | **$60 / gebruiker / maand** | bevestigd | selecthub.com/ppm-software/clarity-ppm-vs-sciforma/ |
| Planisware | **$45 / maand** | bevestigd, **maar** SelectHub noteert dit als *flat monthly rate*, niet per gebruiker — de vergelijking met per-seat-prijzen is dus niet zuiver | selecthub.com/ppm-software/planisware-vs-sciforma/ |
| Sciforma / ProjectAdvantage | $20 / gebruiker / maand | bevestigd | selecthub.com |
| Asana Starter | **$10,99 / gebruiker / maand** (jaarlijks; $13,49 maandelijks) | bevestigd bij de leverancier | asana.com/pricing |
| monday.com Basic | **$9 / seat / maand** (jaarlijks) | bevestigd bij de leverancier | monday.com/pricing |
| Smartsheet | **Business $19 (jaarlijks) / $24 (maandelijks) per member/maand** | **[GECORRIGEERD]** — het eerder genoemde "$12" is op smartsheet.com/pricing niet te reproduceren; het Pro-tarief liet zich niet eenduidig uitlezen | smartsheet.com/pricing |
| MS Project Plan 3 | ~$30 / gebruiker / maand | **[ONBEVESTIGD]** — Microsofts vergelijkingspagina rendert prijzen client-side; alleen de eeuwigdurende licenties waren uitleesbaar (Project Professional 2024 $1.129,99, Project Standard 2024 $679,99) | microsoft.com |

Sciforma zit dus in het **midden tot bovensegment van enterprise-PPM**, en een factor 2–6 boven de lichte werkbeheertools. Voor Primavera P6 EPPM/Cloud is geen publiek lijstprijscijfer gevonden; de bewering dat het "in dezelfde orde ligt als Sciforma's bovenste seats" is **[SCHATTING, onbevestigd]**.

---

## 4. VOORDELEN (onderbouwd)

1. **Echte netwerkplanningsmotor, niet alleen een balkenschema.** Forward/backward pass, ASAP/ALAP, harde datumconstraints (Must Start On overschrijft alles behalve de werkelijke startdatum), negatieve float, FS/SS/FF met lag/lead, en een volledige kalenderhiërarchie base→project→task→resource. Dit is de scherpste scheidslijn met Asana/monday/Wrike/Smartsheet, die geen van allen een echte float- en constraint-berekening kennen. *(Bron: officiële Sciforma-documentatie)*

2. **Volwaardige Critical Chain (CCPM) — zeldzaam in de markt.** Identificatie van de chain, automatische buffergeneratie, oplossen van resourcecontentie, fever charts en multi-projectsynchronisatie. Sciforma bewaart bovendien automatisch Baseline 10 vóór het levelen, zodat het effect van automatisch levelen meetbaar is. Buiten Sciforma bieden weinig mainstreampakketten dit; het is een echte differentiator voor organisaties die Goldratt-methodiek volgen.

3. **Resourcemodel dat de werkelijkheid van een PMO aankan.** Onderscheid tussen **hard** (persoon benoemd), **soft** (gekwalificeerd op organisatie/functieklasse/skill) en **generic** (herbruikbare generieke resources) toewijzingen; capaciteitsplanning met vraag-versus-aanbod, heatmaps voor onder-/overbezetting, bulk-fulfillment, en het vervangen van een resource over meerdere taken tegelijk terwijl actual vs. remaining effort automatisch behouden blijft. Dit is aantoonbaar dieper dan wat MS Project standalone biedt.

4. **Sterke, langdurige klanttevredenheid op de zachte kant.** SoftwareReviews (Info-Tech, 84 reviews): composietscore **8,1/10**, CX-score 8,5, **Net Emotional Footprint +94**, **Plan to Renew 98 %** — alle vier op 25 juli 2026 exact bij de bron bevestigd; de cost-to-value-tevredenheid van 81 % kon niet worden teruggevonden **[ONBEVESTIGD]**. Capterra: **4,4/5 over 67 reviews**, ease of use 4,1, klantenservice 4,4 — bevestigd; de sub-scores value 4,2 en functionaliteit 4,3 en de claim **"nul 1- of 2-sterrenreviews"** zijn **níét** te reproduceren (Capterra toont de sterrenverdeling niet meer) — **[ONBEVESTIGD; niet meer als bewijs gebruiken]**. Gartner Peer Insights: **3,9/5 over ~189 reviews** — **[ONBEVESTIGD]**, gartner.com geeft bij hertest HTTP 403. Een verlengingspercentage van 98 % is uitzonderlijk hoog en duidt op reële operationele waarde, niet alleen op vendor lock-in.

5. **Echte hybride ondersteuning binnen één project.** Agile (sprints, story points, budget points, baseline points, taakkaarten), Waterfall, Phase-Gate met gate-approval-meetings en deliverable/risk-templates, en CCPM — combineerbaar binnen hetzelfde project. Veel concurrenten bieden dit alleen als aparte, niet-communicerende modules.

6. **On-premise blijft mogelijk, met keuze van datacenterlocatie.** In een markt die vrijwel volledig SaaS-only is geworden, ondersteunt Sciforma nog steeds on-premise deployment (Tomcat/WebSphere/WebLogic/JBoss op PostgreSQL/SQL Server/DB2/Oracle) en, in de cloud, klantgekozen datacenterregio met data-at-rest in het land van herkomst. ISO 27001, SOC 1 Type II, GDPR/UK-GDPR met SCC's. Voor Europese overheden, banken en farma is dat vaak een knock-outcriterium waar Sciforma wél doorheen komt.

7. **Sterke Europese, en specifiek Franse/Benelux/Duitse, aanwezigheid met lokale dienstverlening.** 45 % van de getrackte klanten zit in Frankrijk; de leverancier noemt zelf Frankrijk, Benelux en Duitsland als historisch sterke basis. Lokale kantoren, Franse en Duitse UI en documentatie, Europees supportteam. Planview noemde het uitdrukkelijk als reden voor de overname ("strengthens Planview's presence in Europe").

8. **Work Package Management — gedelegeerde deelplanning.** Je kunt een deel van een project overdragen aan een lokale Work Package Manager, inclusief contract, KPI's, statusrapportagebehoeften en leverparameters (specificatie, tijd, kosten), zonder de rest van het schema te blokkeren. Dat past goed bij organisaties met interne of externe leveranciers per werkpakket.

9. **Volwassen governance- en auditlaag.** Ingebouwde audit trail, exporteerbare auditrapporten, profiel- én individu-gebaseerde permissies tot op veld-/leesrechtniveau, statusrapporthistorie, configureerbare KPI's, en zowel subjectieve als objectieve indicatoren voor stuurgroepen. Dit is de laag waar lichte tools volledig ontbreken.

10. **Open REST API plus een brede enterprise-integratieset.** Jira, Microsoft Teams, ServiceNow, Salesforce, SharePoint, Power BI, Tableau, Azure DevOps, GitHub/GitLab, Dynamics 365, codebeamer, Polarion. Er zijn kant-en-klare bidirectionele Jira-connectoren van derden (Rego Consulting) en een integratiedashboard met run-logs voor het monitoren van koppelingen.

---

## 5. NADELEN (eerlijk, uit reviews en fora)

1. **Het merk is dood en de productroadmap is onzeker — het grootste risico.** Planview kocht Sciforma in februari 2025; het product heet nu Planview ProjectAdvantage; sciforma.com geeft sinds 2026 een 301-redirect naar planview.com. Planview heeft al **Portfolios, AdaptiveWork (Clarizen), ProjectPlace en Enterprise One** in de portfolio — ProjectAdvantage is daarmee minstens de vierde overlappende PPM-lijn. **[SCHATTING]** De historische norm bij PE-gefinancierde consolidators is dat overlappende lijnen binnen 3–7 jaar in onderhoudsmodus gaan en klanten naar het strategische platform worden gemigreerd. Planview belooft continuïteit ("customers will continue to use their products as they do today"), maar dat is de standaardformulering direct na elke overname. Wie nu tekent, moet contractueel afdwingen wat "support" over vijf jaar betekent.

2. **Clunky, niet-intuïtieve UI met een stevige leercurve — de meest herhaalde klacht.** TrustRadius: *"The largest con is the clunky UI, which is not very intuitive and has a larger learning curve to become a proficient user."* Capterra: *"the interface isn't the most intuitive out of the box."* SelectHub noteert tegelijk "easy to navigate" én "difficult to navigate … especially for advanced features" — precies het patroon van een tool waarvan de basis meevalt maar de diepte hard is. Er is niet voor niets een volledige eLearning-universiteit als **betaalde** add-on.

3. **Traagheid, en niet alleen bij grote datasets.** Reviewers noemen expliciet trage SSO, **trage Gantt-manipulatie** en trage validatie/opslag bij het inplannen van zelfs eenvoudige taken: *"scheduling simple tasks requires a lot of patience as the system takes a while to validate entries and save them"*, *"users have to wait to ensure changes are saved before moving on"*, *"occasional screen freezing"*. Eén reviewer merkt op dat de traagheid de perceptie van de tool binnen de organisatie actief schaadt. Voor een planner die dagelijks honderden regels aanraakt, is dit een reëel productiviteitsprobleem.

4. **Rapportage is de zwakste plek, terwijl het de belangrijkste PMO-belofte is.** *"A small number of built-in reports"*; *"other tools have a whole bunch of reports … and allow you to create reports by selecting what objects go where in a more intuitive way"*; *"reporting features are not easy to implement"*; *"we had to do a fair amount of customization to get the reporting where we wanted it"*. Het is dus niet dat rapportage ontbreekt — het is dat je er implementatiebudget en consultancy in moet steken.

5. **Lange, consultancy-intensieve implementatie.** *"The setup process took a while"*, *"the initial setup took a long time"*, *"extensive implementation customization required"*, *"steep training demands for minor changes"*. De configureerbaarheid die als voordeel wordt verkocht, is de keerzijde: er is weinig dat out-of-the-box goed genoeg is voor productie. Reken op een project van maanden, niet weken.

6. **Integraties kosten geld en moeite, ondanks de "open API".** *"Several users expressed difficulties when integrating APIs with other systems, finding the process complex and potentially costly."* Capterra: *"Integration with Jira requires additional effort."* De belangrijkste Jira-koppeling wordt in de praktijk door externe partijen (Rego, Tray.ai) geleverd — dat is een indicatie dat de standaardconnector niet volstaat.

7. **MS Project-uitwisseling is fundamenteel beperkt en géén round-trip.** De documentatie stelt letterlijk dat er **veldwaarden** worden uitgewisseld en niet complete taakobjecten, dat matching gebeurt op het gedeelde `# Task`-veld, en — cruciaal — dat *"it is not possible to schedule a Sciforma project in Microsoft Project or vice versa"*, onder meer omdat soft assignments in MSP niet bestaan. Je kunt dus visualiseren en deelvelden bijwerken, maar niet je schema in het andere pakket herrekenen.

8. **Geen enkele bouwsector-interoperabiliteit.** Geen XER, geen P6 XML, geen IFC, geen 4D/BIM, geen locatiegebaseerde planning, geen hoeveelheden. Zie §6.

9. **Zwakke mobiele app.** *"The mobile application … is less developed than the PC version."* Voor een tool die zwaar op timesheets en statusupdates leunt, is dat een gemis.

10. **Geen prijstransparantie, geen gratis tier, geen zelfbedieningsproefversie.** Elke evaluatie begint met een salesgesprek. Zelfs de twee Gartner-Digital-Markets-eigendommen (Capterra en GetApp) spreken elkaar tegen over de vraag of er überhaupt een gratis proefversie bestaat. Bij een instapprijs van US$ 760 per gebruiker per jaar is de drempel om "even te proberen" effectief oneindig.

11. **Krappe taalondersteuning.** Zeven talen (EN, FR, DE, ES, JA, HE, PL). Geen Nederlands. Voor een Benelux-uitrol betekent dat Engels of Frans als werktaal in de tool.

12. **Onduidelijke schaalbaarheidsgaranties.** De leverancier publiceert geen limieten voor aantallen taken, relaties of gelijktijdige gebruikers, en er is geen publieke benchmark. Bij een aankoop moet je dit zelf met een proof-of-concept op je eigen volume aantonen.

---

## 6. Interoperabiliteit — bijzonder relevant voor een open-source, IFC-gebaseerde planner

| Formaat / kanaal | Ondersteuning | Detail |
|---|---|---|
| **MS Project XML (MSPDI, `.xml`)** | ✅ Ja, beide richtingen | Eigen "XML Exchange"-module met *Import XML* / *Export XML* en een specifieke *Export to MSP*. Uitwisseling op **veldwaarde**-niveau, matching op het gedeelde `# Task`-nummer. Documentatie waarschuwt expliciet: *"it is not possible to schedule a Sciforma project in Microsoft Project or vice versa"* — o.a. omdat soft assignments in MSP niet bestaan. **Geen betrouwbare round-trip.** |
| **MS Project `.mpp` (binair)** | ❌ Niet aangetroffen | Alleen de XML-route is gedocumenteerd. **[ONBEVESTIGD dat .mpp helemaal ontbreekt, maar geen enkele bron noemt het]** |
| **Primavera P6 `.xer`** | ❌ Geen enkele aanwijzing | Niet in documentatie, niet in integratielijsten, niet in reviews. Praktisch: **niet ondersteund** |
| **Primavera P6 XML (`.xml`, P6-schema)** | ❌ Geen enkele aanwijzing | idem |
| **CSV / Excel** | ⚠️ Deels | Rapport- en data-export is aanwezig (o.a. auditrapport-export). Een gedocumenteerde generieke CSV-**import** voor taken/relaties is niet aangetroffen — datamigratie loopt in de praktijk via de REST API of professional services. **[ONBEVESTIGD]** |
| **IFC 4.3 / IfcWorkSchedule / IfcTask / IfcRelSequence** | ❌ **Nul ondersteuning** | Geen vermelding in enige bron: niet in de productdocumentatie, niet in de verticalenlijst (geen bouw/AEC), niet in de integratielijst (geen BIM-, CAD-, IFC- of buildingSMART-partner), niet in reviews. Ook geen 4D-koppeling met Navisworks, Synchro, Bexel, Vico of vergelijkbaar |
| **REST API** | ✅ Ja | "Open API"; bidirectionele synchronisatie mogelijk; integratiedashboards met run-logs. Objecten die aantoonbaar via de API bereikbaar zijn: projecten, taken, toewijzingen, timesheets/actuals. Publieke, vrij toegankelijke API-referentie is **niet** gevonden (documentatieportaal `success.sciforma.com` vereist login — geverifieerd: HTTP 403 "Access denied … not authorized") |
| **Kant-en-klare connectoren** | ✅ Breed, maar IT-gericht | Jira (Cloud + Server), Microsoft Teams, ServiceNow, Salesforce Sales Cloud, SharePoint, Power BI, Tableau, Azure DevOps Server, GitHub, GitLab, Trello, Dynamics 365, Google Calendar, QuickBooks Online Advanced, Viva Engage, codebeamer, Polarion ALM |
| **Risicoanalyse-koppeling** | ⚠️ Historisch | Intaver RiskyProject noemt Sciforma-integratie op zijn forum; niet geverifieerd of dit nog actueel is **[ONBEVESTIGD]** |

### 6.1 Wat dit betekent voor een open-source, IFC-gebaseerde planner

Voor de opdrachtgever (die een IFC 4.3-native planner bouwt) is de conclusie ondubbelzinnig:

- **Sciforma is geen concurrent en geen referentie op het gebied van BIM-interoperabiliteit.** Er is letterlijk niets. Het IFC-scheduling-domein (`IfcWorkSchedule`, `IfcTask`, `IfcTaskTime`, `IfcRelSequence` met SS/SF/FS/FF en lag) wordt door dit pakket niet geraakt.
- **Sciforma is wél een uitstekende referentie voor het datamodel van een serieuze planningsmotor.** De kalenderhiërarchie (base → project → task → resource, met uitzonderingen en een "ignore resource calendar"-vlag), het onderscheid hard/soft/generieke toewijzing, genummerde baselines, negatieve float bij overschrijding van een Required Date, en de leveling-heuristiek "bij gelijke prioriteit: verschuif wat de einddatum het minst raakt" — dat zijn concrete, goed doordachte ontwerpkeuzes die de moeite van het overnemen waard zijn.
- **De MSPDI-route is de enige realistische uitwisselingsbrug** als een klant ooit tussen een IFC-planner en Sciforma data moet verplaatsen — met de expliciete waarschuwing van de leverancier zelf dat het geen herrekenbare round-trip is.
- **Een open-source IFC-planner concurreert dus niet met Sciforma**, maar staat er naast: Sciforma bedient het portfolio/PMO-domein, een IFC-planner het bouwuitvoeringsdomein. De overlap is de CPM-kern; de rest verschilt volledig.

---

## 7. Marktpositie

### 7.1 Waar sterk, en waarom

**Geografisch:** Frankrijk is veruit de sterkste markt (45 % van de getrackte klanten), gevolgd door de VS (22 %) en het VK (11 %). De leverancier bevestigt zelf Frankrijk, Benelux en Duitsland als historische kernmarkten; via KeyedIn kwam het VK en de Nordics erbij. Dit is een van de weinige PPM-pakketten met een echt Europees, en zelfs echt Benelux-, verhaal.

**Waarom sterk daar:** (a) Franse leiding en Parijse hoofdkantoor sinds 2023 — lokale taal, lokale contracten, lokale consultants; (b) on-premise en klantgekozen datacenterlocatie, wat Europese banken, farma en publieke sector nodig hebben; (c) 40+ jaar continuïteit met een geïnstalleerde basis die generaties overleeft (klanten die in 2015 op 7.0 gingen, draaien er nog); (d) de zeldzame CCPM-capaciteit trekt een specifieke, loyale niche.

**Functioneel sterk:** portfoliobeslissingen met scenariomodellering en what-if, capaciteitsplanning over portfolio's heen, hybride agile/waterfall governance, en — anders dan bijna alle "moderne" concurrenten — een echte planningsmotor eronder.

### 7.2 Belangrijkste concurrenten

| Segment | Concurrenten |
|---|---|
| **Enterprise PPM/SPM (directe rivalen)** | Planview Portfolios *(nu zusterproduct!)*, Planisware (Frans, sterk in R&D/NPD), Broadcom Clarity, ServiceNow SPM, Sopheon Accolade, Triskell, Micro Focus/OpenText PPM |
| **Microsoft-ecosysteem** | Microsoft Project for the Web / Project Online / Planner Premium, Power PPM-partners |
| **Lichte werkbeheertools (van onderaf)** | Smartsheet, monday.com, Asana, Wrike, ClickUp, Adobe Workfront |
| **Klassieke CPM (van opzij, ander domein)** | Oracle Primavera P6, Asta Powerproject, Safran Project, Spider Project, Deltek Acumen |

De relatieve marktpositie is bescheiden. In de bredere "project collaboration"-markt trackt 6sense Sciforma op **0,01 % marktaandeel, plek #70 van 321 tools**. Ter vergelijking noemen dezelfde soort bronnen voor PPM specifiek: Clarity ~14 % / 894 klanten, Planisware ~5 % / 333 klanten. **[Deze marktaandeelcijfers zijn technografie-schattingen op basis van webdetectie en niet op omzet — behandel ze als richtingaanwijzer, niet als feit.]**

### 7.3 Gebruikersaantallen en omzet

| Metriek | Waarde | Bron / betrouwbaarheid |
|---|---|---|
| Gebruikers wereldwijd | **300.000+** | Leverancier, snapshot dec 2025 — **claim bevestigd, feit niet.** Planview zelf zegt *"thousands of users … across 22 countries"* (zie §1.4). **Behandel 300.000 als marketingcijfer** |
| Medewerkers | **275** wereldwijd | Leverancier, sciforma.com (snapshot dec 2025) — **woordelijk bevestigd als claim**; geen onafhankelijke bevestiging. GetLatka noemt 127 FTE (§bron 36) — factor 2 verschil, onopgelost |
| Landen | 100+ gedekt (leverancier); **22 landen met organisaties (Planview, bevestigd)** | Leverancier / Planview |
| Organisaties (getrackt) | **457** (was 465) | 6sense, 25 juli 2026 — ondergrens, alleen webdetecteerbaar |
| ARR | **US$ 10,7 mln (2021)** | getlatka — **lage betrouwbaarheid**; dit is pre-One2Team en pre-KeyedIn en past slecht bij 275 FTE |
| Waardering | US$ 32 mln (2025, "M&A offer") | getlatka — **lage betrouwbaarheid**, vrijwel zeker te laag |

**[SCHATTING]** Een realistischer beeld van de groep Sciforma+One2Team+KeyedIn op het moment van de Planview-overname: **€ 35–60 miljoen ARR**, afgeleid van 275 FTE bij een gangbare enterprise-software-ratio van €130k–200k omzet per FTE. Dit is een afleiding, geen gerapporteerd cijfer.

### 7.4 Analistenpositie

- Gartner MQ IT PPM: **Visionary** in 2009 en 2010.
- Gartner MQ *Adaptive Project Management and Reporting*, 4 september 2024: de leverancier claimt plaatsing als **Leader** voor zowel Sciforma Vantage als KeyedIn Enterprise. **Kanttekening:** APMR is Gartner's markt voor het *lichtere*, adaptieve segment — niet dezelfde als *Strategic Portfolio Management*, waar Planview en Planisware de zwaargewichten zijn. De claim is niet onafhankelijk geverifieerd (Gartner-pagina's blokkeren geautomatiseerde toegang).
- Gartner Peer Insights: **3,9/5 over ~189 reviews**; aanwezig in vier Gartner-markten (SPM, PPM, APMR, CWM).

### 7.5 Trend

Krimpend als zelfstandige speler, maar niet als technologie. De richting is helder: **onafhankelijk (tot 2021) → PE-eigendom en buy-and-build (2021–2024) → opgeslokt door de grootste consolidator in de markt (2025) → merk uitgezet (2026)**. Voor bestaande klanten betekent dat op korte termijn meer resources en Europese support; op middellange termijn een reëel risico op productrationalisatie binnen Planviews viertal overlappende PPM-lijnen.

---

## 8. Eindoordeel

### Voor wie wél

- **PMO's en EPMO's in middelgrote tot grote organisaties** die honderden projecten naast elkaar moeten prioriteren, bemensen en verantwoorden — en die daarbij een échte planningsmotor onder de portfolio willen, geen balkenschema-illusie.
- **IT-afdelingen, R&D/NPD-organisaties en transformatieprogramma's** in farma, biotech, banken/verzekeraars, ziekenhuizen, maakindustrie, lucht- en ruimtevaart, telecom, automotive.
- **Organisaties die Critical Chain (Goldratt) toepassen.** Hier is het aanbod zo dun dat Sciforma een van de weinige serieuze opties is met CCPM plus een volwaardige portfolio-laag eromheen.
- **Europese organisaties met harde datasoevereiniteits- of on-premise-eisen** — met name in Frankrijk, de Benelux en Duitsland, waar bovendien lokale support en Franse/Duitse UI beschikbaar zijn.
- **Organisaties met budget voor een implementatietraject van maanden**, inclusief betaalde training en configuratie van de rapportagelaag.

### Voor wie níét

- **Aannemers, infrabouwers, projectontwikkelaars en iedereen die een bouwplanning maakt.** Geen XER, geen P6 XML, geen IFC, geen 4D, geen locatiegebaseerde planning, geen hoeveelheden, geen forensische vertragingsanalyse, geen AEC-verticaal. Dit is domweg de verkeerde tool voor de bouw.
- **Teams onder ~25 gebruikers.** De prijsstructuur (US$ 15–90 per gebruiker per maand, instap ~US$ 760/gebruiker/jaar), het ontbreken van een gratis tier en de implementatiedrempel maken kleine deals onwerkbaar.
- **Organisaties die morgen willen beginnen.** Geen self-service trial, geen prijstransparantie, geen bruikbare out-of-the-box-configuratie.
- **Wie primair snelle, mooie rapportage zoekt.** Dit is aantoonbaar de zwakste dimensie; een Power BI/Tableau-laag erbovenop is in de praktijk vrijwel verplicht.
- **Wie leveranciersrisico slecht verdraagt.** Het merk is uitgezet, het product is de vierde overlappende PPM-lijn binnen Planview. Zonder contractuele garanties over ondersteuningstermijn en migratiepad is dit een risicovolle nieuwe aankoop in 2026.

### Is dit een serieus alternatief voor klassieke CPM-tools?

**Genuanceerd ja — maar in een ander domein.**

*Technisch* haalt Sciforma het niveau van een echte CPM-tool: ASAP/ALAP, datumconstraints, negatieve float, FS/SS/FF met lag, kalenderhiërarchie tot op resourceniveau, resource leveling met kritiek-pad-bewustzijn, meerdere baselines, earned value, en bovenop dat alles CCPM. Dat is fundamenteel meer dan wat Asana, monday.com, Smartsheet of Wrike doen, en op sommige punten (resourcemodel, portfolio-laag, CCPM) meer dan MS Project standalone.

*Praktisch* is het geen vervanger voor Primavera P6 of Asta Powerproject in het bouwdomein. Het mist elke bouwspecifieke functie én elk bouwspecifiek uitwisselingsformaat, en het is niet ontworpen voor schema's van tienduizenden activiteiten met dagelijkse voortgangsregistratie. De reviewklachten over Gantt-traagheid maken dat extra duidelijk.

De juiste framing: **Sciforma vervangt geen P6 — het staat erboven.** Het is de portfolio- en governance-laag waarin de projectschema's van een organisatie samenkomen. In een bouwcontext zou het hooguit náást een echte bouwplanner draaien, en dan nog struikelt de koppeling over het ontbreken van XER/P6 XML.

**Voor de opdrachtgever die een open-source, IFC-gebaseerde planner bouwt:** Sciforma is geen concurrent, maar wel een leerzaam voorbeeld van hoe je een CPM-datamodel goed inricht — met name de kalenderhiërarchie, het toewijzingsmodel (hard/soft/generiek), genummerde baselines en de expliciete omgang met negatieve float. Het gat dat Sciforma openlaat — bouw, IFC, 4D, hoeveelheden, locatiegebaseerde planning — is precies het gat dat een IFC-native planner invult.

---

## Bronnen

Alle URL's geraadpleegd op **25 juli 2026**, tenzij anders vermeld. Waar `www.sciforma.com` inmiddels 301-redirect naar Planview, is de Wayback-snapshot gebruikt; de snapshotdatum staat erbij.

### Leverancier (eerstehands)
1. Planview — *About Sciforma* (huidige bestemming van sciforma.com) — https://www.planview.com/acquisitions/about-sciforma/
2. Planview — *Planview ProjectAdvantage* productpagina — https://www.planview.com/products-solutions/products/planview-projectadvantage/
3. Planview Newsroom — *Planview Acquires Sciforma, Expanding Global Leadership in Portfolio Management Solutions*, 18 februari 2025 — https://newsroom.planview.com/planview-acquires-sciforma-expanding-global-leadership-in-portfolio-management-solutions/
4. Sciforma — *Frequently Asked Questions* (**prijsopgave $15–90 per gebruiker/maand**; deployment; ISO 27001/SOC; datasoevereiniteit; training) — Wayback-snapshot **7 december 2025** van https://www.sciforma.com/faqs/
5. Sciforma — *Project Planning & Management* (Gantt/kritiek pad, CCPM, phase gates, work packages, bedrijfscijfers 275 FTE / 300.000 gebruikers / 100+ landen) — Wayback-snapshot **7 december 2025** van https://www.sciforma.com/solutions/project-planning/
6. Sciforma — *Resource Management* (hard/soft/generieke toewijzingen, capaciteitsplanning, heatmaps) — Wayback-snapshot **18 mei 2024** van https://www.sciforma.com/solutions/resource-management/
7. Sciforma — persbericht *Sciforma Debuts Its New Flagship Platform: Vantage* (Plan = ex-7.1, Deliver = ex-One2Team) — Wayback-snapshot **7 december 2025**
8. Sciforma/KeyedIn — persbericht *Merger of Sciforma and KeyedIn Enhances Their PPM Leadership Position*, 22 maart 2023 (Parijs/Minneapolis; **"France, Benelux, and Germany"**) — Wayback-snapshot **9 november 2025**
9. Sciforma — persbericht *Sciforma and KeyedIn Placed in 2024 Gartner® Magic Quadrant™ for Adaptive Project Management and Reporting*, 9 september 2024 (verwijst naar Gartner-rapport van 4 sept 2024, auteurs Kevin Rose, Sean Bankston, Peter Clegg) — Wayback-snapshot **7 december 2025**
10. Sciforma Customer Success Center — `success.sciforma.com` (documentatieportaal; **detailpagina's vereisen login — geverifieerd HTTP 403 "Access denied"**). Inhoud gereconstrueerd uit geïndexeerde fragmenten van o.a.:
    - `/topics/user/dependencies` — link-types FS/SS/FF, lag/lead
    - `/topics/user/tasks-scheduling/schedule-type-0` — ASAP (default) / ALAP
    - `/topics/user/tasks-scheduling/how-enter-tasks-date-constraints` — Must Start On, Required Date, negatieve float
    - `/topics/user/tasks-scheduling/start-delay` — start delay
    - `/topics/user/project-initialization/how-define-schedule-method-critical-path-vs.-critical-chain` — schedule method
    - `/topics/user/resources-leveling/level-resources-dialog-box-0` — leveling-heuristiek
    - `/topics/user/resources-leveling/define-critical-chain-0` — CCPM, Baseline 10
    - `/topics/user/resource-allocations/calendar`, `/topics/user/resources-scheduling` — kalenderhiërarchie base/project/task/resource, Ignore Resource Calendar
    - `/topics/user/schedule-tracking` — earned value / BCWP
    - `/topics/user/xml-exchange-0`, `/xml-exchange/export-msp`, `/xml-exchange/import-xml`, `/xml-exchange/how-import-projects-data` — MSPDI-uitwisseling, `# Task`-matching, *"not possible to schedule a Sciforma project in Microsoft Project or vice versa"*

### Overname- en eigendomshistorie
11. Businesswire — *Planview Acquires Sciforma*, 18 februari 2025 — https://www.businesswire.com/news/home/20250218853981/en/
12. Crunchbase — *Planview acquires Sciforma*, 18 februari 2025 — https://www.crunchbase.com/acquisition/planview-acquires-sciforma--aaa1ebc9
13. Crunchbase — *Symphony Technology Group acquires Sciforma*, 31 maart 2021 — https://www.crunchbase.com/acquisition/symphony-technology-group-acquires-sciforma--0d02222d
14. STG — *PPM Innovator Sciforma Acquired by Symphony Technology Group* — https://stg.com/news/ppm-innovator-sciforma-has-been-acquired-by-leading-private-equity-firm-symphony-technology-group-stg/
15. DLA Piper — *DLA Piper advises Sciforma and STG Partners on KeyedIn Solutions acquisition and refinancing*, maart 2023 — https://www.dlapiper.com/en/news/2023/03/dla-piper-conseille-sciforma-et-stg-partners
16. Ropes & Gray — *Planview Acquires Sciforma* (transactiebegeleiding) — https://www.ropesgray.com/en/news-and-events/news/2025/02/planview-acquires-sciforma-expanding-global-leadership-in-portfolio-management-solutions
17. Cambon Partners — *Sciforma sold to Symphony Technology Group* — https://www.cambonpartners.com/en/transactions/sciforma-sold-to-symphony-technology-group-stg

### Techniek en historie
18. Wikipedia — *Sciforma* (versiehistorie PSNext 1.0–3.0, Sciforma 4.0–7.1; kantoren; talen; klanten) — https://en.wikipedia.org/wiki/Sciforma
19. HandWiki — *Software:Sciforma* (**Java-webarchitectuur; databases PostgreSQL/SQL Server/DB2/Oracle; appservers Tomcat/WebSphere/WebLogic/JBoss**; 11 functiegebieden; PMBOK/CCPM/Agile/Phase-Gate/PRINCE2) — https://handwiki.org/wiki/Software:Sciforma
20. Businesswire — *What's Next For PSNext? Sciforma Delivers Greater Power, Flexibility, Ease Of Use*, 9 oktober 2009 — https://www.businesswire.com/news/home/20091009005049/en/

### Prijzen
21. Capterra — *Planview ProjectAdvantage Pricing* (**US$ 760 per gebruiker per jaar, "Basic"; geen gratis versie, geen trial**) — https://www.capterra.com/p/18756/Sciforma/pricing/ — 25 juli 2026
22. GetApp — *Sciforma / Planview ProjectAdvantage Pricing* (**US$ 760 per gebruiker per jaar**; vermeldt wél trial — tegenstrijdig met #21) — https://www.getapp.com/project-management-planning-software/a/sciforma/pricing/ — 25 juli 2026
23. SelectHub — *Sciforma / Planview ProjectAdvantage* (**vanaf US$ 20 per gebruiker/maand**; 86 % tevredenheid; 261 reviews over 7 sites; #8 in top-10 PPM) — https://www.selecthub.com/p/ppm-software/sciforma/ — 25 juli 2026
24. SelectHub — vergelijkingen Clarity/Planisware/Planview vs. Sciforma (prijskalibratie concurrenten) — https://www.selecthub.com/ppm-software/clarity-ppm-vs-sciforma/ en https://www.selecthub.com/ppm-software/planview-vs-sciforma/
25. ITQlick — *Sciforma Pricing* (niet toegankelijk: HTTP 403; alleen indexfragmenten — **lage betrouwbaarheid**) — https://www.itqlick.com/sciforma/pricing

### Reviews en gebruikerservaringen
26. Capterra — *Planview ProjectAdvantage Reviews* (**4,4/5 · 67 reviews**; ease of use 4,1; support 4,4; value 4,2; functionaliteit 4,3; nul 1–2-sterrenreviews) — https://www.capterra.com/p/18756/Planview-ProjectAdvantage/reviews/
27. Software Advice — *Planview ProjectAdvantage Reviews* (sterrenverdeling; *"some screens are a little clunky or slow"*, *"the initial setup took a long time"*) — https://www.softwareadvice.com/project-management/sciforma-profile/reviews/
28. SoftwareReviews / Info-Tech — *Planview ProjectAdvantage (Sciforma PPM)* (**composiet 8,1/10 · CX 8,5 · NEF +94 · Plan to Renew 98 % · 84 reviews**) — https://www.softwarereviews.com/products/sciforma-ppm
29. TrustRadius — *Sciforma Reviews* (**"the largest con is the clunky UI"**; trage validatie/opslag; beperkte ingebouwde rapporten) — https://www.trustradius.com/products/sciforma/reviews *(directe toegang geblokkeerd, HTTP 403; via geïndexeerde fragmenten)*
30. Gartner Peer Insights — *Sciforma / Planview ProjectAdvantage* (**3,9/5 · ~189 reviews**; aanwezig in SPM-, PPM-, APMR- en CWM-markten) — https://www.gartner.com/reviews/vendor/sciforma *(directe toegang geblokkeerd, HTTP 403)*
31. Project-Management.com — *Sciforma Software Review* (features, doelgroep midsize/enterprise, integraties MS Project XML/Salesforce/Jira/Google Calendar/Yammer) — https://project-management.com/sciforma-software-review/

### Markt en integraties
32. 6sense — *Sciforma Market Share* (**457 klanten (hercontrole 25 juli 2026; was 465); Frankrijk 182 = 45,16 %, VS 90 = 22,33 %, VK 44 = 10,92 %; marktaandeel 0,01 %, rang #70 — het aantal van 321 getrackte tools is niet bevestigd**) — https://6sense.com/tech/project-collaboration/sciforma-market-share
33. GetApp — *Sciforma Integrations* (volledige connectorlijst; **geen enkele BIM/CAD/IFC-integratie**) — https://www.getapp.com/project-management-planning-software/a/sciforma/integrations/
34. Rego Consulting — *Rego's Sciforma to Jira Integration* (bidirectionele sync Jira Projects/Sprints/Epics/Issues ↔ Sciforma Tasks/Assignments) — https://regoconsulting.com/regos-sciforma-to-jira-integration/
35. Tray.ai — *Sciforma Integrations* (geen native connector; HTTP Client / Connector Builder nodig) — https://tray.ai/connectors/sciforma-integrations
36. GetLatka — *Sciforma* (**ARR US$ 10,7 mln in 2021; 127 FTE; laatste update 10 april 2025 — lage betrouwbaarheid**) — https://getlatka.com/companies/sciforma
37. AppsRunTheWorld — *Sciforma PPM klantendatabase* (referentieklanten Incitec Pivot, Bettis Atomic Power Lab) — https://www.appsruntheworld.com/customers-database/products/view/sciforma-ppm
38. Enterprise Times — *PSA, PPM and Work Management news, week 20 maart 2023* (KeyedIn-fusie in marktcontext) — https://www.enterprisetimes.co.uk/2023/03/27/psa-ppm-and-work-management-news-from-the-week-beginning-20th-march-2023/

### Eigen verificatie
39. HTTP-redirectcontrole `www.sciforma.com` → `planview.com/acquisitions/about-sciforma/` (301, ook voor `/pricing/` en `/fr/`), uitgevoerd 25 juli 2026.
40. ~~Toegangscontrole `success.sciforma.com` — HTTP 403 "Access denied"~~ — **[GECORRIGEERD 25 juli 2026]**. Hertest geeft een ander beeld: `https://success.sciforma.com/` → **301 naar `/en`** → **HTTP 200**, publiek leesbaar, titel *"Planview ProjectAdvantage Customer Success Center"*, met een nieuwsoverzicht van maandelijkse releases t/m **2026.06 (02-07-2026)**. De in bron 10 geciteerde deep links (`/topics/user/dependencies`, `/topics/user/tasks-scheduling/schedule-type-0`, `/topics/user/resources-leveling/define-critical-chain-0`, …) geven echter **HTTP 404**, ook met `/en`-prefix; er is geen `sitemap.xml`. De documentatiecitaten in §2.1 zijn dus **niet meer naslaanbaar** — zie de bewijswaarschuwing daar.
41. Redirectmatrix `www.sciforma.com` per pad (`/`, `/pricing/`, `/fr/`, `/de/` → `about-sciforma`; `/faqs/` → `planview.com` root; `/solutions/project-planning/` → `planview-vantage`), uitgevoerd 25 juli 2026 — zie §0.
42. Woordelijke hercontrole van de volledige gearchiveerde FAQ-tekst (snapshot `20251207124735`) op de prijsalinea, het ontbreken van een minimum-seatcount, de eLearning-**jaarabonnement**-formulering (*"available through an annual subscription"*), *"Administration as a Service"*, en de bedrijfscijfers (275 / 300.000 / 100+ / 40 jaar), uitgevoerd 25 juli 2026.
43. Valutacontrole USD→EUR (ECB-referentiekoers via frankfurter.dev, datum **24 juli 2026**): 1 USD = € 0,87897. Vervangt de eerder gebruikte ~1,10-koers.

### Niet gebruikt (kwaliteitsafwijzing)
De volgende bronnen kwamen bovendrijven maar zijn **bewust niet als bewijs gebruikt** wegens aantoonbaar AI-gegenereerde, onderling tegenstrijdige of ongeattribueerde prijs- en featurebeweringen: subscribed.fyi, softwarefinder.com, checkthat.ai, discovercloud.com, intuitionlabs.ai, research.com, saashub.com, productowl.io.

---

*Einde profiel. Opgesteld op basis van 43 geraadpleegde bronnen, waarvan 10 eerstehands leveranciersbronnen (deels via webarchief) en 5 eigen technische verificaties.*

---

## Verificatie

**Adversariële fact-check uitgevoerd op 25 juli 2026.** Methode: elke bewering is actief geprobeerd te *weerleggen* door de primaire bron opnieuw op te halen (leverancier, marktplaats, of de leverancier van het vergelijkingsproduct zelf), niet door bevestiging te zoeken. Waar de oorspronkelijke bron onbereikbaar bleek, is de bewering afgewaardeerd in plaats van behouden.

### Prijs- en licentiemodel

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 1 | Leverancier-FAQ: *"pricing is structured on a per-user, per-month basis, with costs ranging from $15 to $90"*, afhankelijk van aantal gebruikers én rol | **Bevestigd** — citaat woordelijk teruggevonden, inclusief de vervolgzin over prijsdrijvers | `web.archive.org/web/20251207124735/https://www.sciforma.com/faqs/` |
| 2 | US$ 15–90 ≈ € 14–82 p/gebruiker/maand en € 165–980 p/jaar bij ~1,10 USD/EUR | **Gecorrigeerd** → **€ 13–79 /mnd** en **€ 158–950 /jr**. Koers op 24 juli 2026 is 1 USD = € 0,879 (1 EUR = $1,138), niet 1,10. US$ 760/jr = **≈ € 668** | https://api.frankfurter.dev/v1/latest?base=USD&symbols=EUR |
| 3 | Capterra: US$ 760 per gebruiker per jaar, géén gratis versie, géén proefversie | **Bevestigd** (letterlijk "$760" per user/per year, free trial "not available") | https://www.capterra.com/p/18756/Sciforma/pricing/ |
| 3b | Het Capterra-plan heet "Basic" | **Onzeker** — planbenaming niet reproduceerbaar op de pagina; alleen de startprijs staat er | idem |
| 4 | GetApp noemt hetzelfde bedrag maar meldt tegenstrijdig wél een trial | **Gecorrigeerd/aangescherpt** — GetApp toont bij hercontrole **zowel een trial als een "free version"**; de tegenstrijdigheid met Capterra is groter dan beschreven. Leverancier-FAQ noemt zelf alleen *"Request a Demo"*, dus Capterra is vermoedelijk correct | https://www.getapp.com/project-management-planning-software/a/sciforma/pricing/ |
| 5 | SelectHub: vanaf US$ 20 p/gebruiker/maand, proef op aanvraag, prijsklasse "$$–$$$$" | **Deels bevestigd** — $20/User/Monthly en "Free Trial: Yes – Request for Free" bevestigd; de klasse-notatie **"$$–$$$$" is niet reproduceerbaar en is geschrapt** | https://www.selecthub.com/p/ppm-software/sciforma/ |
| 6 | Geen gratis tier, geen freemium, geen self-service trial | **Bevestigd** — de volledige FAQ-tekst bevat geen enkele trial-/freemium-toezegging, alleen demo-aanvraag; Capterra bevestigt "no free trial / no free version" | archived FAQ + Capterra |
| 7 | Minimum aantal seats niet officieel gepubliceerd; aggregators noemen 10–20 | **Bevestigd voor het eerste deel** (integrale FAQ-scan: geen minimum, enige prijsdrijvers zijn aantal gebruikers + rol). **Onzeker/onbevestigd** voor de 10–20 van aggregators — niet reproduceerbaar | archived FAQ |
| 8 | Betaalde add-ons: Sciforma University/eLearning als **jaarabonnement**, Personalized + Public Classroom Training, "Administration as a Service", drie professional-services-lijnen | **Bevestigd, alle vijf** — woordelijk: *"…available through an annual subscription"*; *"we offer 'Administration as a Service' to handle user enrollment, progress tracking, and reporting"*; *"Personalized Training"* en *"Public Classroom Training"*; navigatie: *eLearning and Training Services / Managed Service Offerings / Strategic Advisory Consulting* | archived FAQ |
| 9 | Implementatie 0,5×–1,5× de jaarlicentie in jaar 1 | **Onzeker** — blijft een expliciet gemarkeerde [SCHATTING]; geen enkele publieke bron bevestigt of weerlegt een ratio. Wel blijft de onderliggende reviewklacht over lange setup overeind | — |
| 10 | Minimum-deal US$ 25.000–40.000/jaar bij 25–50 seats | **Onzeker** — [SCHATTING], geen bron; aritmetisch consistent (25–50 × $760 = $19k–38k), maar niet extern gedekt | — |

### Prijspositionering versus concurrenten

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 11 | Clarity ~$60/gebruiker/maand | **Bevestigd** ("$60/User, Monthly") | https://www.selecthub.com/ppm-software/clarity-ppm-vs-sciforma/ |
| 12 | Planisware ~$45/maand | **Bevestigd, met kanttekening** — SelectHub noteert "$45 Monthly" als **flat rate**, niet per gebruiker; de per-seat-vergelijking is dus niet zuiver | https://www.selecthub.com/ppm-software/planisware-vs-sciforma/ |
| 13 | Asana $10,99 | **Bevestigd bij de leverancier** (Starter, jaarlijkse facturering; $13,49 maandelijks) | https://asana.com/pricing |
| 14 | monday.com $9 | **Bevestigd bij de leverancier** (Basic, jaarlijkse facturering) | https://monday.com/pricing |
| 15 | Smartsheet $12 | **Gecorrigeerd** — niet reproduceerbaar. Smartsheet toont Business **$19 (jaarlijks) / $24 (maandelijks)** per member/maand; het Pro-tarief liet zich niet eenduidig uitlezen | https://www.smartsheet.com/pricing |
| 16 | MS Project Plan 3 ≈ $30/gebruiker/maand; P6 EPPM in dezelfde orde als Sciforma's topseats | **Onzeker** — Microsofts vergelijkingspagina rendert abonnementsprijzen client-side; alleen eeuwigdurende licenties uitleesbaar (Project Professional 2024 $1.129,99, Standard 2024 $679,99). Voor P6 geen publieke lijstprijs gevonden | https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software |

### CPM- en planningsfunctionaliteit

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 17 | Sciforma heeft een echte CPM-motor (kritiek pad, afhankelijkheden, meerdere baselines) | **Bevestigd** — Planview-productpagina letterlijk: *"advanced Gantt views, critical path scheduling, dependencies, and multiple baselines for change control"*; review bevestigt *"users can manage project critical path"* | https://www.planview.com/products-solutions/products/planview-projectadvantage/ · https://project-management.com/sciforma-software-review/ |
| 18 | Volwaardige Critical Chain (CCPM) met buffers, fever charts, Baseline 10 | **Deels bevestigd / grotendeels onzeker** — CCPM als methodologie bevestigd door Wikipedia; **buffers, fever charts en Baseline 10 zijn niet te verifiëren**. De Planview-productpagina noemt critical chain in het geheel niet bij de scheduling-features | https://en.wikipedia.org/wiki/Sciforma |
| 19 | ASAP/ALAP, Must Start On, negatieve float, kalenderhiërarchie base→project→task→resource, resource leveling met kritiek-pad-heuristiek, earned value/BCWP | **Onzeker — bewijsbasis weggevallen.** Alle citaten verwijzen naar `success.sciforma.com/topics/user/…`; die URL's geven nu **HTTP 404** (portaal verhuisd naar `/en/…`, oude paden bestaan niet meer, geen sitemap). Geen enkele onafhankelijke bron bevestigt deze specifieke kenmerken | eigen hertest 25 juli 2026 |
| 20 | MS Project-uitwisseling via XML (MSPDI), géén herrekenbare round-trip | **Bevestigd voor het XML-kanaal** (*"integration with Microsoft Project is possible through XML import/export"*). De leverancierswaarschuwing *"not possible to schedule a Sciforma project in Microsoft Project or vice versa"* is **onzeker** — komt uit de nu-404-documentatie | https://project-management.com/sciforma-software-review/ |
| 21 | Geen IFC / XER / P6 XML / 4D-BIM | **Bevestigd bij benadering** — geen enkele geraadpleegde bron (leverancier, Planview, marktplaatsen, integratielijsten) noemt een bouw-/BIM-formaat of AEC-verticaal. Dit blijft een *negatieve* bewering en dus principieel niet hard te bewijzen | meerdere |

### Gebruikersaantallen, bedrijfscijfers en marktpositie

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 22 | Leverancierclaims 40 jaar · 275 medewerkers · 300.000+ gebruikers · 100+ landen | **Bevestigd als citaat** — woordelijk in de paginavoet van de gearchiveerde site | archived sciforma.com, 7 dec 2025 |
| 23 | Die 300.000 gebruikers zijn "plausibel" | **Gecorrigeerd** — Planviews eigen overnamepagina zegt *"thousands of users in organizations across 22 countries"*. Koper en verkoper zitten twee ordegroottes uit elkaar; 300.000 is afgewaardeerd tot marketingcijfer | https://www.planview.com/acquisitions/about-sciforma/ |
| 24 | Planview noemt 22 landen | **Bevestigd** (letterlijk *"22 countries"*) | idem |
| 25 | Overname door Planview op 18 februari 2025 | **Bevestigd** — persbericht gedateerd *"AUSTIN, Texas – February 18, 2025"*. Kanttekening: het persbericht bevat **geen** klant-, gebruikers-, medewerkers- of omzetcijfers | https://newsroom.planview.com/planview-acquires-sciforma-expanding-global-leadership-in-portfolio-management-solutions/ |
| 26 | Product hernoemd Sciforma Vantage → Planview ProjectAdvantage | **Bevestigd** — letterlijk *"Sciforma Vantage (now Planview® ProjectAdvantage)"*; ook het documentatieportaal draagt de nieuwe naam | https://www.planview.com/acquisitions/about-sciforma/ |
| 27 | sciforma.com geeft overal 301 naar `planview.com/acquisitions/about-sciforma/` | **Gecorrigeerd** — klopt voor `/`, `/pricing/`, `/fr/`, `/de/`, maar `/faqs/` gaat naar `planview.com` root en `/solutions/project-planning/` naar `…/products/planview-vantage/`. Zie de redirectmatrix in §0 | eigen hertest 25 juli 2026 |
| 28 | Merk operationeel opgeheven / rationalisatierisico | **Onzeker — tegenwicht toegevoegd.** Het merk is inderdaad uitgezet, maar het product krijgt aantoonbaar nog **maandelijkse releases** (2025.10 t/m 2026.06, laatste gepubliceerd 02-07-2026). Het risico in §5.1 is een vooruitblik, geen waargenomen onderhoudsmodus | https://success.sciforma.com/en |
| 29 | 6sense: 465 getrackte klanten; FR 45,2 % / VS 22,3 % / VK 10,9 % | **Gecorrigeerd** — nu **457** klanten; percentages bevestigd (45,16 / 22,33 / 10,92) maar rekenen tegen een noemer van ~403, niet 457. Marktaandeel 0,01 % en rang #70 bevestigd; "van 321 tools" niet | https://6sense.com/tech/project-collaboration/sciforma-market-share |
| 30 | SoftwareReviews: 8,1/10 · CX 8,5 · NEF +94 · Plan to Renew 98 % · 84 reviews | **Bevestigd, alle vijf exact.** De aanvullende "cost-to-value 81 %" is **onbevestigd** | https://www.softwarereviews.com/products/sciforma-ppm |
| 31 | Capterra 4,4/5 over 67 reviews, nul 1–2-sterrenreviews | **Deels bevestigd** — 4,4/5 · 67 reviews · ease of use 4,1 · support 4,4 bevestigd. **"Nul 1- of 2-sterrenreviews" is onbevestigd** (verdeling wordt niet meer getoond) en mag niet als bewijs worden gebruikt | https://www.capterra.com/p/18756/Planview-ProjectAdvantage/reviews/ |
| 32 | Gartner Peer Insights 3,9/5 over ~189 reviews; Gartner MQ APMR 2024 "Leader" | **Onzeker** — gartner.com geeft HTTP 403 bij hertest; beide blijven onverifieerbaar. Het profiel markeerde dit al correct | — |
| 33 | 7 producttalen (EN, FR, DE, ES, JA, HE, PL), geen Nederlands | **Bevestigd** | https://en.wikipedia.org/wiki/Sciforma |
| 34 | GetLatka ARR $10,7 mln (2021), waardering $32 mln — lage betrouwbaarheid | **Onzeker, blijft afgewezen.** Aanvullend probleem: GetLatka noemt **127 FTE** tegenover de leverancierclaim van 275 — een factor 2. De afgeleide "€ 35–60 mln ARR" in §7.3 steunt op die 275 en is dus dubbel onzeker | — |

### Netto-oordeel over het profiel

- **Het prijshoofdstuk is het sterkste deel**: de eerstehandsclaim van $15–90 is woordelijk hard, de $760 van Capterra is hard, en de add-onlijst is volledig bij de leverancier bevestigd. De enige echte rekenfout was de **valutakoers** (correctie ~4 %, richting goedkoper in euro's).
- **Het functionaliteitshoofdstuk is het zwakste deel**: §2.1 leest als vastgesteld feit, maar de volledige bewijsbasis (de Sciforma-documentatie) is inmiddels onbereikbaar en slechts een klein deel is elders terug te vinden. Kritiek pad, dependencies en meerdere baselines staan; CCPM-diepgang, negatieve float, kalenderhiërarchie en leveling-heuristiek staan **niet**.
- **De grootste inhoudelijke correctie** is de spanning tussen "300.000+ gebruikers" (verkoper) en "thousands of users" (koper). Dat raakt direct de marktpositie-inschatting.
- **De op één na grootste** is dat "merk dood" ten onrechte suggereert dat het product stilstaat: er is een actieve maandelijkse releasecadans t/m juli 2026.
