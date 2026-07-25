# LiquidPlanner (nu: Tempo Portfolio Manager)

**Diepgaand softwareprofiel — marktonderzoek planningssoftware**
Onderzoeksdatum: 25 juli 2026 · Alle webbronnen opgehaald op 25 juli 2026

> **Twee bevindingen vooraf die het hele profiel kleuren:**
>
> 1. **LiquidPlanner bestaat niet meer als zelfstandig merk.** `liquidplanner.com` geeft sinds de overname een HTTP 308-redirect naar `tempo.io`. Het product heet officieel **Tempo Portfolio Manager (formerly LiquidPlanner)**.
> 2. **Het product vertoont duidelijke tekenen van stilstand.** De laatste release note in de officiële documentatie dateert van **7 mei 2025** (gecontroleerd op 25 juli 2026 — dus ruim 14 maanden geen aangekondigde functionaliteit). Tegelijk toont de URL `tempo.io/pricing/portfolio-manager` inmiddels géén Portfolio-Manager-prijzen meer, maar een wachtlijst voor een **"Adaptive Planner EAP"** (Early Access Program) — sterk suggestief voor een opvolgerproduct. *Dit laatste is mijn interpretatie, geen officiële sunset-aankondiging.*

---

## 1. Wat het is

### Leverancier en eigendom

| Item | Gegeven | Bron |
|---|---|---|
| Oorspronkelijke oprichting | 27 januari 2006, Seattle (WA), VS | Wikipedia |
| Oprichters | Charles Seybold en Jason Carlson | Wikipedia |
| Publieke beta | DEMO 08-conferentie, 2008 | Wikipedia |
| Financiering | Eerste ontvanger kapitaal Alliance of Angels seed fund (juni 2009); $2 mln in 2018; winstgevend per 2018 (GeekWire) | Wikipedia |
| CEO-historie | Liz Pearce → Todd Humphrey (nov 2017) → Ted Hawksford (ten tijde van overname) | Wikipedia / Tempo-persbericht |
| **Overgenomen door** | **Tempo Software — aangekondigd 16 maart 2023, Boston. Voorwaarden niet bekendgemaakt.** | tempo.io/newsroom |
| Huidige productnaam | Tempo Portfolio Manager (formerly LiquidPlanner) | tempo.io |

**Over de moeder, Tempo Software** (bron: `try.tempo.io/about-us`):

- Ontstaan in **2007** als intern project bij TM Software (IJsland); hoofdkantoor nu **Boston**.
- Investeerder/eigenaar: **Diversis Capital** (private equity, investering 2018).
- Overnamereeks: **Roadmunk (2021)**, **ALM Works (2021, Structure PPM/Gantt)**, **LiquidPlanner (2023)**, **Old Street Solutions (2023)**, **AlphaServe (2024)**.
- **30.000+ organisaties**, **350+ medewerkers** wereldwijd.
- Ten tijde van de LiquidPlanner-overname: **>$100 mln ARR in 2022**, 28.000+ klanten, "one in three Fortune 500".

Betekenis: LiquidPlanner is een klein onderdeel geworden van een PE-gefinancierde roll-up die zijn zwaartepunt in het **Atlassian/Jira-ecosysteem** heeft. Tempo won in 2026 nog "Atlassian Partner of the Year (Cloud Transformation Apps)". LiquidPlanner is daarin het enige niet-Jira-native product.

### Twee generaties product

Er bestaan **twee losse codebases**, met eigen documentatie én eigen API:

- **LiquidPlanner Classic** — `app.liquidplanner.com`. Eigen helpcenter (`help.tempo.io/liquidplannerclassic`) en eigen API (`developer.liquidplanner.com`). De Classic-API-changelog eindigt met **"August 2022 – End of updates for LP Classic API"**. Bevroren.
- **LiquidPlanner New / Portfolio Manager** — de huidige lijn, API op `api-docs.liquidplanner.com`.

Klanten op Classic zitten dus op een dood spoor; migratiedocumentatie is mager (de Classic-helppagina verwijst enkel door met een notitie van 16 januari 2025: *"Looking for Portfolio Manager documentation?"*).

### Doelgroep, typische gebruikers, sectoren, regio's

- **Positionering (vendor, letterlijk):** *"the market's only predictive scheduling solution"* en *"The only project management solution that adapts to change and manages uncertainty"*. Doelgroep volgens Tempo: *"large organizations managing multiple concurrent complex projects with interdependencies"*, incl. gesiloëerde teams en professional-services-automatisering.
- **Genoemde klanten (uit het overnamepersbericht):** KPMG, Delta Airlines, Bayer.
- **Typische gebruikers in de praktijk:** software-/productontwikkeling, R&D, engineering, IT-afdelingen, marketing- en creatieve bureaus, professional services / consultancy, en enige maakindustrie. Kern-usecase: een **gedeelde pool van schaarse specialisten** die over veel gelijktijdige projecten verdeeld moet worden.
- **Sectoren waar het níét zit:** bouw, infra, EPC, offshore, scheepsbouw, defensie — kortom alles met contractuele planningsverplichtingen. Er is in de volledige documentatie geen enkele bouwspecifieke functie, term of referentie te vinden.
- **Regio's:** primair Noord-Amerika (Seattle-oorsprong, nu Boston), daarnaast West-Europa en Australië. Uitsluitend cloud/SaaS, Engelstalige UI. *Regioverdeling is een inschatting — Tempo publiceert geen regiocijfers voor Portfolio Manager afzonderlijk.*

---

## 2. Functionaliteit en techniek — streng beoordeeld

### 2.1 Het scheduling-model: dit is géén CPM

Dit is het belangrijkste punt van het hele profiel, en het is een bewuste ontwerpkeuze van LiquidPlanner — geen tekortkoming die ze proberen te verbergen.

**Hoe het wél werkt** (letterlijke citaten uit `help.tempo.io/portfoliomanager/latest`):

- **Prioriteitsvolgorde bepaalt datums, niet andersom:** *"Order is important at each level because dates are calculated based on the order items are listed, from top to bottom."*
- Taken plannen zich *"as soon as possible based on the availability of the person assigned and the task's priority in the workspace"*.
- **Ranged estimates:** elke taak krijgt een **low estimate** en **high estimate** in uren (niet één getal, en niet een duur maar een *inspanning*).
- **Monte Carlo over de hele portefeuille:** *"Portfolio Manager runs sophisticated Monte Carlo simulations on the whole portfolio whenever priorities, assignments and estimates change."*
- **Uitkomst is een bandbreedte, geen datum:** *"The Expected Finish to Latest Finish range is a landing zone that spans 50% confidence (Expected Finish) to 90% confidence (Latest Finish)."*
- **Automatische resource leveling:** *"LiquidPlanner automatically levels your team's workload across multiple projects and dependencies."*

**Wat er dus ontbreekt ten opzichte van een echte CPM-engine:**

| CPM-concept | Aanwezig in LiquidPlanner? |
|---|---|
| Forward pass / backward pass | **Nee** — datums komen uit prioriteitsvolgorde + beschikbaarheid + simulatie |
| Early Start / Early Finish / Late Start / Late Finish | **Nee** — er is Expected Start/Finish en Latest Finish (P90), wat iets heel anders is dan LS/LF |
| Total float / free float | **Nee** — nergens gedocumenteerd |
| Kritiek pad (identificatie of visualisatie) | **Nee** — komt in de volledige documentatieboom niet voor |
| Netwerkanalyse over het afhankelijkhedennet | **Deels** — afhankelijkheden blokkeren wel, maar er wordt geen padlengte geanalyseerd |
| Duur-gedreven planning | **Nee** — inspanning-gedreven (uren), duur is een *uitkomst* van beschikbaarheid |

**Streng oordeel:** LiquidPlanner is géén balkenschema-zonder-logica zoals veel werkbeheertools (Asana, Monday, Trello) — er zit een echte, wiskundig serieuze rekenmachine onder. Maar het is **een stochastische capaciteitssimulator, geen CPM-solver**. Wie "kritiek pad" of "total float" nodig heeft, vindt dat hier niet, in geen enkel abonnement.

### 2.2 Afhankelijkheidstypen — de harde beperking

Letterlijk uit `help.tempo.io/portfoliomanager/latest/dependencies-wait-time`:

> *"LiquidPlanner supports finish to start dependencies on all plan items: Packages, Projects, Sub-Folders, and Tasks."*

- **Alleen Finish-to-Start (FS).** Geen SS, geen FF, geen SF. Dat is voor bouwplanning een breekpunt: overlappende activiteiten (SS+lag), gelijk-eindigende werkstromen (FF), en trekkende logica zijn simpelweg niet uitdrukbaar.
- **Lag heet "Wait Time"** en is eenzijdig: *"Wait Time tells the scheduling engine how many days to wait after the predecessor dependencies are satisfied before starting the successor plan item."* Dus:
  - alleen **positieve** vertraging (geen lead / negatieve lag);
  - **granulariteit in hele dagen**, niet in uren of procenten;
  - alleen op FS-relaties (er zijn geen andere).
- Predecessor-statussen: `Scheduled`, `Satisfied`, `Unscheduled`, `Circular` (waarschuwing bij circulaire logica).
- Cross-container afhankelijkheden (tussen packages/projecten/sub-folders) zijn wél mogelijk.
- Verwijderen van een predecessor breekt de keten: successors *"schedule based on their priority position"*.
- De documentatie stimuleert actief om **weinig** afhankelijkheden te gebruiken: de engine vult wachttijd op met werk van lagere prioriteit, *"reducing explicit dependency needs in priority-driven schedules"*. Afhankelijkheden zijn hier de uitzondering, prioriteit is de regel — precies omgekeerd aan CPM.

### 2.3 Constraints

- **Target Start / Target Finish** — *"fixed dates set on the Edit Panel Scheduling tab to guide Predictive Scheduling"*. Target Start voorkomt starten vóór een datum; Target Finish is de deadline. Erven neerwaarts: *"When Targets are applied to a Project, Sub-Folder or Package, everything inside the container inherits those dates."*
- **Target Date Deltas** — *"calculate the difference between Expected Dates and Target Dates"*, in dagen (Early / Late / 0). Rood signaal wanneer de verwachte datum ná de Target Finish valt.
- **Scheduling Limits** — uur-plafonds per dag/week/maand op een plan item, bereik **0,25 uur tot 744 uur**; combineerbaar. Dit is de manier om parallel werk af te dwingen in plaats van watervalgedrag.
- **ASAP Priority Override** — tilt een item naar de hoogste positie binnen project/package/workspace zonder het fysiek te verslepen.

Er zijn géén MS-Project-achtige constraint-typen (Must Start On, Finish No Later Than, As Late As Possible, deadline met negatieve speling, etc.).

### 2.4 Kalenders en beschikbaarheid

Redelijk solide, maar persoonsgericht in plaats van projectgericht:

- **Werktijdregels per persoon.** Default: *"8 hours a day, Monday through Friday, 8am to 4pm"*. Aanpasbaar; *"Working Times are rules that tell the scheduling engine when it's ok to schedule your tasks."*
- Regelstapeling met precedentie: *"as rules are added, the lowest rule (bottom row) takes precedence."*
- **Persoonlijk verlof** met labels (Training, Vacation, Travel, Out of Office, Personal Day).
- **Feestdagen** via *"Everyone Time Off"* door Org Admin / Workspace Manager: *"blocks scheduling for everyone in the workspace"*.

Wat ontbreekt: er zijn **geen taakkalenders** (een taak kan geen eigen kalender hebben, alleen de kalender van de toegewezen persoon), geen ploegendienst-/24-uurskalenders per activiteit, geen kalenders per locatie of per apparaat.

### 2.5 Resource- en kostenmodel

Dit is de sterkste kant van het product.

- **Members** = gelicentieerde gebruikers. **Resources** = *"two Resources for every user license in the Organization"* (niet-menselijke of generieke capaciteit). **Placeholders** = gratis, voor nog-niet-ingevulde rollen — uitstekend voor capaciteitsscenario's.
- **Workload View**: verdeling over 30/60/90/180 dagen, portfolio-/package-/project-/persoonsniveau; *"Availability Used"* als percentage van beschikbare uren; risicovlaggen wanneer *"Total Work exceeds Work Limit"*.
- **Automatische leveling** (zie 2.1) — geen handmatige "level resources"-knop nodig.
- **Rate Sheets** (kosten): *"Rate Sheet Rules are designated by Person or Resource"*, met wildcard `*` voor catch-all, aparte **billing rates** (klantfacturatie) en **pay rates** (kosten), gekoppeld aan **Cost Codes**, in de workspace-valuta. **Alleen op PROFESSIONAL en ULTIMATE**; vereist Timesheet Exporter- en Cost Viewer-rechten.
- **Tijdregistratie is ingebouwd** en is het mechanisme waarmee de engine leert (logged time vermindert remaining effort binnen de ranged estimate).

Wat ontbreekt: geen materiaalresources met verbruikseenheden, geen kostenkalender/inflatie, geen cashflow-curve, geen earned value (EV/PV/AC, SPI/CPI).

### 2.6 Baselines — afwezig

Er is **geen baseline-functie** in de zin van klassieke planningssoftware: geen bevroren snapshot van het volledige plan, geen Baseline 1..10, geen variantierapportage tegen een goedgekeurde baseline, geen trendhistorie.

Het dichtstbijzijnde is **Target Dates & Deltas** — een *per item* vastgezette streefdatum plus het verschil in dagen met de verwachte datum. De documentatie bevat geen historische tracking of trendanalyse van die prestatie. Voor contractuele vertragingsanalyse (impacted as-planned, time impact analysis, windows analysis) is dat volstrekt ontoereikend.

### 2.7 Visualisatie — er is geen echte Gantt

De volledige lijst met views uit de documentatie: **Priority Views** (Portfolio / Package / Project), **Workload View**, **Board View**, **Grid View**, **Search View**, **Changes & Deleted Items**, **Favorites**, **Iterations**.

- Er staat **geen Timeline-/Gantt-/Netwerkdiagram-view** in die lijst.
- Wat er wel is: **schedule bars** binnen de prioriteitslijsten, met een *"Timeline Mode"* die *"reduces the view to plan items and schedule bars"*. De bar toont de landing zone (P50→P90); rood bij verwachte overschrijding van Target Finish.
- De documentatie **noemt nergens afhankelijkheidspijlen of kritiek-padkleuring** in enige view.
- Prioriteren gaat per drag-and-drop: *"Changing priorities updates the schedule in real time."*

Voor iemand die uit MS Project/P6 komt is dit vervreemdend: je ziet geen netwerk, je ziet een gerangschikte lijst met onzekerheidsbalken.

### 2.8 Platform en schaalbaarheid

- **Uitsluitend cloud/SaaS.** Geen on-premise, geen desktop, geen offline modus (dat laatste is een expliciete reviewklacht).
- **Mobiel:** de iPhone/iPad-app uit september 2011 is *"no longer available as of 2024"* (Wikipedia). Er is dus feitelijk geen native mobiele app meer.
- **Harde takenplafonds per abonnement** — dit is de scherpste schaalbaarheidsgrens:
  - Essentials: **max 5.000 taken**
  - Professional: **max 50.000 taken**
  - Ultimate: **onbegrensd**
- Hiërarchie: Workspace → Packages → Projects → Sub-Folders → Tasks → Assignments. Meerdere workspaces alleen op **ULTIMATE**.
- **Realistische omvang:** het rekenmodel (Monte Carlo over de gehele portfolio bij élke wijziging) is fundamenteel zwaarder dan een CPM-pass. Voor een portefeuille van enkele duizenden tot tienduizenden taken met tientallen tot honderden mensen werkt dat prima. *Inschatting:* 5.000–25.000 actieve taken is comfortabel; daarboven is Ultimate nodig en zijn er reviewsignalen over traagheid. Een enkel bouwproject van 20.000+ activiteiten met dichte netwerklogica is niet het scenario waarvoor dit gebouwd is en zou ook functioneel stuklopen op de FS-only-beperking, lang voordat performance het probleem wordt.

---

## 3. Prijzen

**Belangrijke waarschuwing over bronkwaliteit:** Tempo publiceert **geen** prijslijst meer voor Portfolio Manager op de eigen site. `tempo.io/pricing` toont alleen Timesheets-prijzen; `tempo.io/pricing/portfolio-manager` toont een wachtlijst voor "Adaptive Planner EAP" zonder bedragen. De onderstaande bedragen komen daarom van twee onafhankelijke reviewplatforms die de prijzen bijhouden, beide **laatst bijgewerkt juli 2026**.

| Plan | Prijs per gebruiker/maand | Per gebruiker/jaar (afgeleid) | Max. taken | Kernfuncties |
|---|---|---|---|---|
| **Free** | $0 | $0 | *niet gepubliceerd* | Geen bestandsopslag (*"File storage is not offered on the free plan"*) |
| **Essentials** | **$15** | **$180** *(rekenkundig)* | **5.000** | Board/Grid/Portfolio views, tijdregistratie, predictive scheduling |
| **Professional** | **$28** | **$336** *(rekenkundig)* | **50.000** | + custom fields/data, **rate sheets**, cost codes, package-dashboards |
| **Ultimate** | **$42** | **$504** *(rekenkundig)* | **onbeperkt** | + **meerdere workspaces**, **SSO**, leden in meerdere workspaces zonder extra licentie, granulaire toegangsrollen |

**Bronnen en datum:**
- GetApp — Portfolio Manager (LiquidPlanner) pricing, "Last updated: July 2026": `https://www.getapp.com/project-management-planning-software/a/liquidplanner/pricing/` (opgehaald 25-07-2026). Levert zowel de bedragen als de takenplafonds.
- Software Advice — LiquidPlanner profile: `https://www.softwareadvice.com/project-management/liquidplanner-profile/` (opgehaald 25-07-2026). Identieke bedragen $15 / $28 / $42, expliciet onder de kop **"Billed Monthly"**.

**Let op — bronnen zijn niet volledig eensluidend over het gratis plan:** GetApp vermeldt "Free version: Yes"; Software Advice noemt alléén de drie betaalde treden en geen gratis versie. Het bestaan van een FREE-plan is desondanks **wél door de leverancier bevestigd**: de Tempo-helppagina *Administration & Settings* noemt FREE / ESSENTIALS / PROFESSIONAL / ULTIMATE en stelt *"File storage is not offered on the free plan"*. De takenplafonds (5.000 / 50.000 / onbeperkt) komen daarentegen **uitsluitend** van de twee reviewplatforms — ze staan niet in de Tempo-documentatie en zijn dus niet bij de bron geverifieerd.

**Overige licentievoorwaarden:**

- **Gratis proefperiode:** ja. Daarnaast een **"Premium Trial" van 7 dagen** voor organisaties op FREE, ESSENTIALS en PROFESSIONAL, die tijdelijk hogere-plan-functies ontsluit (bron: Tempo helpcenter, *Administration & Settings*).
- **Gratis tier:** ja, er is een FREE-plan (bevestigd in de Tempo-documentatie), maar de precieze limieten daarvan zijn nergens publiek gedocumenteerd.
- **Minimale zetelaantallen:** **niet publiek gedocumenteerd.** GetApp meldt wel dat gebruikers het product duur vinden *"especially due to minimum seat requirements and inflexible pricing"* — er zijn dus minima, maar Tempo publiceert ze niet meer. Ook de Tempo-helppagina's *Administration & Settings* en *Members* noemen géén minimum-aantal licenties (alleen: *"If there aren't enough licenses available you'll be prompted to purchase one"*). *Het eerder genoemde historische minimum van circa 3 / 5 / 10 gebruikers is in deze verificatieronde **niet reproduceerbaar** gebleken: het Internet Archive is vanuit deze omgeving niet bereikbaar en geen enkele actuele bron noemt getallen. Gebruik die getallen niet — het enige verdedigbare statement is "er bestaan minima, hoogte onbekend".*
- **Maand- versus jaarbetaling: GECORRIGEERD.** De eerdere inschatting ("dit zullen jaarbetalingstarieven zijn met een maandtoeslag") wordt **niet ondersteund**. Beide reviewplatforms merken de tarieven expliciet aan als **maandelijkse facturering**: Software Advice presenteert de drie treden onder de kop *"Billed Monthly"*, GetApp geeft "Billing cycle: Monthly". $15 / $28 / $42 zijn dus vermoedelijk **maandtarieven bij maandbetaling**; een eventuele jaarkorting is nergens gepubliceerd. *Restonzekerheid:* dit is metadata van reviewplatforms, niet van de leverancier — Tempo publiceert zelf niets. De afgeleide jaarbedragen ($180 / $336 / $504) blijven daarmee een **bovengrens** (×12 zonder korting), geen gepubliceerde jaarprijs.
- **Enterprise-staffels:** niet publiek. Ultimate is de bovenste gepubliceerde trede; volumekorting loopt via sales. Tempo publiceert wél gestaffelde volumeprijzen voor Timesheets — geverifieerd op `tempo.io/pricing`: $1 (1–10 gebruikers), **$5,21** (11–100), $3,66 (101–250), $1,81 (251–1.000), $1,01 (1.001–2.500), $0,58 (2.501–5.000), aflopend tot **$0,25–$0,39** boven 5.000 — wat suggereert dat een vergelijkbare staffel voor Portfolio Manager onderhandelbaar is. *Die transfer naar Portfolio Manager blijft een inschatting.*
- **Add-ons:** geen aparte add-on-catalogus. De belangrijkste kostenverhoger is dat noodzakelijke zaken (rate sheets, SSO, meerdere workspaces, onbeperkte taken) achter hogere treden zitten, niet achter losse add-ons. Jira-integratie zit in het product en vergt uiteraard wél een aparte Jira-licentie.
- **Valuta:** USD. Er is een workspace-valuta-instelling voor rate sheets, maar de facturatie is in dollars.

**Prijsvergelijking in context:** Ultimate op $42 p.g.p.m. is ruwweg het dubbele van Microsoft Project Plan 3 (~$30) en ligt in dezelfde orde als Smartsheet Business/Wrike Business, terwijl je geen kritiek pad, geen baselines en geen MPP/XER-uitwisseling krijgt. Voor een organisatie die de probabilistische methode écht gebruikt is dat te verdedigen; voor iedereen die "gewoon een planning" wil is het duur.

---

## 4. VOORDELEN

1. **Echt probabilistisch, niet cosmetisch.** Ranged estimates (low/high uren) plus Monte Carlo over de hele portefeuille leveren een **landing zone van P50 (Expected Finish) tot P90 (Latest Finish)**. Dat is intellectueel eerlijker dan de schijnprecisie van één harde datum die uit een deterministische CPM-pass rolt. Vrijwel geen enkele mainstream-planningstool doet dit standaard; in de klassieke wereld heb je er een aparte tool voor nodig (Primavera Risk Analysis / Safran Risk) bovenop je planning.

2. **Herplannen kost niets.** Prioriteiten verslepen herrekent de hele portefeuille in realtime: *"When priorities shift, schedule dates change and workload rebalances automatically for everyone involved."* Waar een CPM-planner na elke wijziging handmatig moet relateren, levelen en opnieuw uitrekenen, is hier prioriteit de enige stuurknop. Voor omgevingen met wekelijks veranderende prioriteiten is dat een enorm onderhoudsvoordeel.

3. **Automatische multi-project resource leveling.** *"LiquidPlanner automatically levels your team's workload across multiple projects and dependencies."* Dit is precies het probleem waar de meeste organisaties met een gedeelde specialistenpool op vastlopen, en waar MS Project's resource leveling berucht onvoorspelbaar in is.

4. **Beschikbaarheidsmodel met echte diepte.** Per-persoon werktijdregels met precedentie-stapeling, individueel verlof met labels, en workspace-brede *"Everyone Time Off"* voor feestdagen — plus **Scheduling Limits** (0,25–744 uur per dag/week/maand) om parallel werk af te dwingen. Dit is fijnmaziger dan het capaciteitsmodel van vrijwel alle werkbeheertools.

5. **Ingebouwde tijdregistratie én kostenmodel in hetzelfde datamodel.** Rate Sheets met gescheiden **billing rates** en **pay rates**, per persoon of per rol, met wildcards en Cost Codes, in workspace-valuta, met Excel-timesheetexport. Dat maakt het een bruikbare lichte PSA-oplossing voor bureaus en consultancies — één systeem voor plannen, uren en facturatiegrondslag.

6. **Placeholders zijn gratis.** *"Placeholders are free"* en elke licentie geeft twee Resources. Capaciteitsscenario's ("wat als we deze rol nog niet invullen?") kosten dus geen extra licenties — een reëel voordeel bij vraagplanning.

7. **Directe risicosignalering via Target Deltas.** De delta tussen Expected en Target in dagen, met rode markering bij verwachte overschrijding, geeft management een leesbaar risicodashboard zonder dat iemand float hoeft te interpreteren.

8. **Diepe tweeweg-Jira-integratie.** Jira-issues worden taken; status, herverdelingen en prioriteitspositie gaan terug; sprintdata en worklogs synchroniseren; nieuwe taken kunnen naar Jira gepusht worden. Voor een Jira-organisatie levert dit de capaciteits- en forecastinglaag die Jira zelf niet heeft.

9. **Solide reviewwaardering.** 4,3/5 over **669 geverifieerde reviews** (Software Advice / GetApp, juli 2026), met klantenondersteuning als hoogste subscore (**4,4/5**) — support wordt consequent geprezen, en dat is bij een tool met deze leercurve geen bijzaak.

10. **Lage instapdrempel.** Er is een gratis plan, een gratis proefperiode én een 7-daagse Premium Trial die tijdelijk hogere-plan-functies ontsluit — je kunt de methode uitproberen zonder inkooptraject.

---

## 5. NADELEN

1. **Geen kritiek pad, geen float, geen echte CPM.** In de volledige documentatieboom komt "critical path", "total float" of "free float" niet voor. Datums ontstaan uit prioriteitsvolgorde + beschikbaarheid + simulatie, niet uit een forward/backward pass. Elk contract, elke aanbesteding en elke vertragingsclaim die om een kritiek pad of speling vraagt, is met dit product niet te bedienen. **Dit alleen al diskwalificeert het voor bouw, infra en EPC.**

2. **Alleen Finish-to-Start.** Letterlijk: *"LiquidPlanner supports finish to start dependencies"*. Geen SS, FF of SF. Bouwlogica (fundering SS+5d met wapening, afbouw FF met oplevering, trekkende ketens) is domweg niet modelleerbaar. Dit is geen configuratiekwestie maar een architectuurkeuze.

3. **Lag is armetierig.** "Wait Time" kent alleen **positieve vertraging in hele dagen** na het vervullen van predecessors. Geen leads (negatieve lag), geen uur-granulariteit, geen procentuele lag, en geen lag op andere relatietypen (want die bestaan niet).

4. **Geen baselines, geen trendhistorie, geen EVM.** Er is alleen een per-item Target Date met een delta in dagen. Geen bevroren planversies, geen variantierapport tegen een goedgekeurde baseline, geen SPI/CPI. Voor formele voortgangsrapportage of forensische planninganalyse onbruikbaar.

5. **Geen echte Gantt.** Geen enkele view toont afhankelijkheidspijlen of een netwerkdiagram; er zijn alleen schedule bars in prioriteitslijsten plus een "Timeline Mode". Stakeholders die een klassiek balkenschema met logica verwachten, krijgen dat niet — en de export ervan al helemaal niet.

6. **Harde takenplafonds per licentie.** 5.000 taken op Essentials en 50.000 op Professional zijn geen soft limits maar productbeperkingen. Wie een grote portefeuille heeft, wordt naar Ultimate ($42 p.g.p.m.) gedwongen, ongeacht het aantal gebruikers.

7. **De import is bijna onbruikbaar voor migratie.** Alleen een **Excel-sjabloon**, **maximaal 100 taken per keer**, en **afhankelijkheden staan niet in de kolomlijst**. Multi-select-velden, multi-line text en notities worden expliciet niet geïmporteerd. Een bestaand plan van enige omvang overzetten is API-werk of handwerk.

8. **Steile leercurve — de meest genoemde klacht.** Reviewsamenvattingen: *"complex and not very intuitive"*, *"steep learning curve, especially for new team members, and note that training is often required"*, navigatie is *"cluttered"* met *"awkward filters"* en *"limited customization"* voor zoeken. De methode vraagt bovendien gedragsverandering van het hele team (iedereen schat in bandbreedtes, iedereen boekt uren) — niet alleen van de planner.

9. **Prijs, prijsverhogingen en zetelminima.** GetApp: *"Some reviewers find Portfolio Manager expensive, especially due to minimum seat requirements and inflexible pricing. Users say recent price increases and per-seat licensing reduce value."* Value-for-money scoort met 4,0/5 het laagst van alle subscores.

10. **Technische schuld van twee generaties.** Classic en New draaien naast elkaar met gescheiden helpcenters en gescheiden API's, en de **Classic-API is sinds augustus 2022 bevroren** (*"End of updates for LP Classic API"*). Bovendien: *"Workspace members with SSO enabled cannot use the API"* op Classic — een onhandige uitsluiting.

11. **Geen offline gebruik, geen mobiele app.** Reviewers noemen expliciet *"it lacks offline access"*; de iOS-app is per 2024 niet meer beschikbaar. Voor veldwerk (bouwplaats!) is dat fataal.

12. **Productmomentum en toekomstrisico.** Laatste release note **7 mei 2025**; merk opgegaan in Tempo; de eigen prijspagina-URL toont inmiddels een wachtlijst voor **"Adaptive Planner EAP"**. Tempo's R&D-zwaartepunt ligt zichtbaar bij Jira-apps. *Mijn inschatting: reëel risico dat Portfolio Manager op termijn wordt uitgefaseerd of opgaat in Adaptive Planner. Er is geen officiële sunset-aankondiging — behandel dit als risicosignaal, niet als feit.*

---

## 6. Interoperabiliteit

Dit is voor een IFC-georiënteerde opdrachtgever het meest ontluisterende hoofdstuk.

### 6.1 Uitwisseling met planningsstandaarden

| Formaat | Ondersteund? | Toelichting |
|---|---|---|
| **Primavera XER** | **Nee** | Nergens gedocumenteerd, geen import en geen export |
| **P6 XML** | **Nee** | Idem |
| **MS Project MPP** | **Nee** | Idem |
| **MSPDI (Project XML)** | **Nee** | Idem |
| **CSV** | **Indirect** | Import is expliciet gedocumenteerd als *Excel* met een verplicht eigen sjabloon; export gaat naar Excel |
| **Excel (XLSX)** | **Ja, beperkt** | Import max 100 taken/keer, geen afhankelijkheden; export van Grid View-data en Timesheet Export |
| **IFC 4.3 / IfcWorkSchedule / IfcTask** | **Nee, totaal afwezig** | Geen enkele referentie in product, documentatie of marketing |
| **BCF, COBie, gbXML** | **Nee** | Geen BIM-interoperabiliteit van welke aard dan ook |
| **4D-koppeling (Synchro, Navisworks, Bexel, Fuzor)** | **Nee** | Geen partnerintegraties, geen model-ID-veld |

**Importvelden die wél ondersteund worden** (Excel-sjabloon): Task Name, 1st Assignment, Low Estimate (h), High Estimate (h), Work Limit, Task Status, Description, Done Date, Target Start, Target Finish, ASAP Priority Override, Assignment Scheduling. **Afhankelijkheden ontbreken in die lijst.**

### 6.2 API's

- **Portfolio Manager Open API** — token-gebaseerd (*"token-based authentication which uses a unique token identifier"*), Org Admin beheert tokens. Ondersteunt: plan items aanmaken/bijwerken/dupliceren in elke Collection, tijd loggen op een assignment met timesheetnotitie, plan-itemdata en logged time ophalen in JSON, en een project aanmaken uit een Template. Filterbare endpoints: Workspace, Users, Plan Items, Task Status, Cost Codes, Logged Time Entries, Timesheet Export. Schrijfrechten vereisen Project Editor-niveau of hoger. Documentatie op `api-docs.liquidplanner.com`.
- **LiquidPlanner Classic API** — REST op `https://app.liquidplanner.com/api/v1`, datamodel rond *treeitems*, assignments, timesheet entries, comments, custom fields, documents, tags, todo items, analytics snapshots. Ondersteunt filtering/ordering/limiting, **webhooks** en Zapier. **Bevroren sinds augustus 2022.** SSO-gebruikers kunnen de API niet gebruiken.
- Rate limits worden nergens publiek gespecificeerd.

### 6.3 Overige integraties

Jira (tweeweg, met limiet van 50 nieuwe taken per push, en met eenrichtings-eigenaardigheden: Jira-beschrijvingen overschrijven lokale edits, notities/schattingen gaan niet terug naar Jira), Slack, SSO (alleen Ultimate), Outlook, Google Workspace, Zapier.

### 6.4 Betekenis voor een open-source, IFC-gebaseerde planner

- **LiquidPlanner is geen concurrent en geen uitwisselingspartner.** Er is geen enkel pad om een LiquidPlanner-plan naar IFC te krijgen behalve via de Open API + zelfgebouwde mapping. Zet het niet op de interoperabiliteitsroadmap.
- **Fundamentele modelmismatch.** IFC 4.3's `IfcTaskTime` is expliciet CPM-vormig: het draagt `ScheduleStart`/`ScheduleFinish`/`ScheduleDuration`, `EarlyStart`/`EarlyFinish`/`LateStart`/`LateFinish`, `FreeFloat`/`TotalFloat` en `IsCritical`. Al die velden zijn in het LiquidPlanner-model **leeg of betekenisloos** — er bestaat geen late-datum en geen float. Omgekeerd heeft IFC geen native plek voor een P50/P90-bandbreedte; die zou je via een `IfcPropertySet` op de `IfcTask` moeten hangen. En `IfcRelSequence` ondersteunt `START_START`, `FINISH_FINISH`, `START_FINISH` en `FINISH_START` met `TimeLag` — LiquidPlanner kan van die vier alleen de laatste vullen. Een round-trip is dus principieel lossy in beide richtingen.
- **Wél waardevol als ideeënbron.** Drie concepten zijn de moeite van het overnemen waard in een IFC-planner, zonder de CPM-kern op te geven:
  1. **Optionele ranged estimates per taak** (low/high) met een Monte Carlo-laag *bovenop* de deterministische CPM-pass, resulterend in een P50/P90-bandbreedte naast de harde CPM-datums. Dat is wat Primavera Risk Analysis doet, en het is in een moderne codebase goed te doen.
  2. **De "landing zone"-visualisatie** — een balk met een zekerheidsverloop in plaats van een harde rand — is grafisch superieur aan een enkele balk en zou als renderoptie in de Gantt-renderer passen.
  3. **Prioriteitsgedreven resource leveling als alternatieve levelmodus** naast klassieke leveling: laat de gebruiker een globale prioriteitsvolgorde bepalen en level daarop.

---

## 7. Marktpositie

### Waar het sterk is en waarom

LiquidPlanner heeft één duidelijke, verdedigbare niche: **organisaties met een gedeelde pool van schaarse specialisten, veel gelijktijdige projecten, hoge inhoudelijke onzekerheid en géén contractuele planningsverplichting.** Concreet: interne software- en productontwikkeling, R&D, engineering-afdelingen, IT-PMO's, marketing- en creatieve bureaus, en professional services. Daar is de klassieke aanpak (iemand tekent een netwerk, het klopt twee weken) aantoonbaar slechter dan LiquidPlanners aanpak (iedereen schat in bandbreedtes, prioriteit stuurt, de machine rekent).

Het was jarenlang praktisch de **enige** commerciële SaaS-tool met probabilistische, capaciteitsgedreven planning als kernproduct in plaats van als dure add-on. Dat leverde een loyale, uitgesproken gebruikersgroep op — zichtbaar in 669 reviews met 4,3/5 en een uitzonderlijk hoge supportscore.

### Waarom het niche is gebleven — de kernanalyse

1. **De methode vraagt organisatieverandering, niet alleen softwareaankoop.** Ranged estimates werken alleen als het *hele* team ze consequent geeft, en de forecast klopt alleen als iedereen dagelijks uren boekt en werk afvinkt. Eén globale prioriteitsvolgorde afdwingen over afdelingsgrenzen heen is bovendien politiek zwaar. Tools die alleen de planner raken verkopen makkelijker.

2. **Het botst frontaal met contractuele en regelgevende werelden.** Bouw, infra, defensie, olie & gas, farma-klinisch: die eisen een goedgekeurde baseline, een aantoonbaar kritiek pad, XER/MPP-uitwisseling met opdrachtgever en onderaannemers, en vertragingsanalyse volgens SCL/AACE-protocollen. LiquidPlanner biedt daar **niets** van. Dat sluit in één klap het grootste, meest betalende segment van de planningsmarkt uit.

3. **Bouwlogica is niet uit te drukken.** FS-only is geen detail. Zonder SS+lag en FF kun je overlappende werkstromen, faseovergangen en trekkende ketens niet modelleren. Het model gaat uit van "één persoon werkt aan één taak"; bouwplanning gaat over "een ploeg produceert een hoeveelheid over een locatie".

4. **Geen netwerkeffect, wel een mid-marketprijs.** Jira, Asana en Monday groeien viraal binnen organisaties. LiquidPlanner vraagt vooraf commitment, training en $15–$42 p.g.p.m. Dat is een verkoopmodel met wrijving in een markt die het van bottom-up-adoptie moet hebben.

5. **Ontbrekende basisverwachtingen.** Geen echte Gantt, geen baselines, geen offline, geen mobiele app, geen MPP-import: elk daarvan is voor een deel van de kopers een knock-out in de eerste demo, ongeacht hoe goed de engine is.

6. **Na de overname is de R&D-focus verschoven.** Tempo is een Atlassian-ecosysteemspeler; het zwaartepunt ligt bij Jira-apps (Timesheets, Structure, Custom Charts, BI Connectors). Portfolio Manager kreeg sinds mei 2025 geen aangekondigde functionaliteit meer.

### Belangrijkste concurrenten

- **Direct (capaciteits-/portfoliogedreven):** Float, Resource Guru, Forecast, Runn, Kantata (voorheen Mavenlink), Productive, Planview AdaptiveWork, Adobe Workfront.
- **Breed werkbeheer dat de deal wint op prijs en adoptie:** Monday.com, Asana, Wrike, Smartsheet, ClickUp, Microsoft Planner/Project for the web.
- **In het Jira-ecosysteem (deels Tempo's eigen huis):** Jira Advanced Roadmaps/Plans, Tempo Structure PPM, Jira Align.
- **Klassieke CPM waar LiquidPlanner nooit tegen kon opboksen:** Oracle Primavera P6, Microsoft Project (desktop), Asta Powerproject, Deltek Open Plan, Spider Project.
- **In de probabilistische hoek specifiek:** Safran Risk en Oracle Primavera Risk Analysis — maar die zijn *Monte Carlo bóvenop CPM*, wat contractueel acceptabel is en LiquidPlanners methode niet.

### Trend, gebruikersaantallen en omzet

- **Gebruikersaantallen voor Portfolio Manager afzonderlijk zijn niet publiek.** Tempo als geheel: **30.000+ organisaties**, 350+ medewerkers, **>$100 mln ARR (2022)**. Bij de overname had LiquidPlanner klanten als KPMG, Delta Airlines en Bayer.
- *Schatting, expliciet als zodanig gemarkeerd:* op basis van het reviewvolume (669 reviews over ~15 jaar), de bedrijfsomvang vóór overname (klein, winstgevend, ~$2 mln financiering in 2018) en de afwezigheid van enterprise-schaalvermeldingen, schat ik het betalende bestand op de orde van **enkele duizenden workspaces / laag tienduizendtal zetels**, met een omzet in de **lage tot midden tientallen miljoenen dollars per jaar** — dus enkele procenten van Tempo's totaal. **Dit is een inschatting zonder harde bron.**
- **Trend: dalend / bevriezend.** Merknaam verdwenen, domein doorgeleid, laatste release mei 2025, prijspagina vervangen door een EAP-wachtlijst voor een ander product. *De richting is duidelijk; de eindbestemming (uitfaseren versus opgaan in Adaptive Planner) is dat niet.*

---

## 8. Eindoordeel

### Voor wie wel

- **Interne product-, software- en R&D-organisaties** met 20–500 kenniswerkers, veel parallelle projecten en een gedeelde pool van schaarse specialisten. Hier is de methode aantoonbaar beter dan een handmatig onderhouden netwerkplanning.
- **Professional services en bureaus** die plannen, uren en facturatiegrondslag in één systeem willen: rate sheets + cost codes + timesheet export maken het een lichte PSA.
- **Jira-organisaties** die een echte capaciteits- en forecastinglaag boven Jira willen en al bij Tempo inkopen.
- **Teams die volwassen genoeg zijn** om ranged estimates te geven en discipline op tijdregistratie te houden. Zonder die twee is de forecast waardeloos.

### Voor wie niet

- **Bouw, infra, EPC, offshore, defensie — categorisch niet.** Geen kritiek pad, geen float, geen baselines, geen SS/FF/SF, geen XER/MPP, geen IFC, geen 4D, geen offline, geen mobiele app voor de bouwplaats. Dit is geen kwestie van "past minder goed"; het mist elk contractueel vereist mechanisme.
- **Iedereen die formele voortgangsrapportage of vertragingsanalyse moet leveren** (EVM, SCL-protocol, time impact analysis).
- **Kleine teams met budgetdruk** — de leercurve en de zetelminima maken de instap duur relatief tot de opbrengst.
- **Organisaties die planningsdata moeten uitwisselen met een keten** van opdrachtgevers en onderaannemers die in P6/MS Project werken.
- **Wie langetermijnzekerheid over de leverancier nodig heeft**, gezien de stilstand sinds mei 2025 en het EAP-signaal.

### Is dit een serieus alternatief voor klassieke CPM-tools?

**Nee — en dat is ook niet de juiste vraag.** LiquidPlanner is geen betere CPM-tool; het is een *andere school* van plannen. CPM beantwoordt: "welke keten van activiteiten bepaalt de einddatum, en hoeveel speling heb ik waar?" LiquidPlanner beantwoordt: "gegeven mijn prioriteiten en mijn mensen, wanneer landt dit werk waarschijnlijk, en hoe zeker ben ik daarvan?" Dat zijn complementaire vragen.

Als *vervanging* van P6, Asta of MS Project in een contractuele omgeving faalt het op elk formeel criterium. Als *aanvulling* of als primaire tool in een niet-contractuele, capaciteitsbeperkte omgeving is het conceptueel superieur aan wat de klassieke tools zonder dure add-ons bieden.

### Specifiek advies voor de opdrachtgever (open-source, IFC-gebaseerde planner)

1. **Niet als concurrent behandelen, niet als integratiedoel.** LiquidPlanner deelt geen enkel formaat, geen enkele domeinterm en geen enkele klant met een IFC-bouwplanner. Elke ontwikkeltijd aan een LiquidPlanner-koppeling is verspild.
2. **Wel als ideeënbron oogsten.** Drie concreet overneembare concepten: (a) optionele ranged estimates met een Monte Carlo-laag *naast* — niet in plaats van — de deterministische CPM-pass, resulterend in P50/P90 naast de harde CPM-datums; (b) de "landing zone"-balkvisualisatie met een zekerheidsverloop in de Gantt-renderer; (c) prioriteitsgedreven resource leveling als alternatieve levelmodus.
3. **De les uit hun marktfalen is de belangrijkste conclusie.** LiquidPlanner had een technisch superieur idee en bleef niche omdat het de contractuele werkelijkheid van planningsmarkten negeerde: baselines, kritiek pad, float en XER/MPP-uitwisseling zijn geen legacy-ballast maar de toegangsprijs tot de serieuze markt. Voor een IFC-planner betekent dat: **eerst de CPM-canon volledig en correct implementeren** (inclusief alle vier `IfcRelSequence`-typen met `TimeLag`, `TotalFloat`/`FreeFloat`, `IsCritical` en echte baselines), en pas dáárna innoveren met probabilistiek. Innovatie zonder de canon = niche.

---

## Bronnen

Alle URL's opgehaald op **25 juli 2026**.

**Leverancier / officiële documentatie**
1. Tempo — Portfolio Manager (Formerly LiquidPlanner), productpagina — https://www.tempo.io/products/portfolio-manager
2. Tempo — Pricing (Portfolio Manager-URL toont "Adaptive Planner EAP") — https://www.tempo.io/pricing/portfolio-manager
3. Tempo — Pricing (algemeen; alleen Timesheets-tarieven) — https://www.tempo.io/pricing
4. Tempo — Newsroom: "Tempo acquires LiquidPlanner", 16 maart 2023 — https://www.tempo.io/newsroom/tempo-acquires-liquidplanner
5. Tempo — About us (oprichting, eigendom, overnames, klant- en personeelsaantallen) — https://try.tempo.io/about-us/
6. Tempo Help Center — Portfolio Manager (LiquidPlanner), hoofdindex — https://help.tempo.io/portfoliomanager/latest
7. Tempo Help Center — Predicting Project Outcomes (Monte Carlo, 90% confidence) — https://help.tempo.io/portfoliomanager/latest/predicting-project-outcomes
8. Tempo Help Center — **Dependencies & Wait Time** (FS-only, wait time) — https://help.tempo.io/portfoliomanager/latest/dependencies-wait-time
9. Tempo Help Center — Introduction to Schedule Bars (P50/P90 landing zone) — https://help.tempo.io/portfoliomanager/latest/introduction-to-schedule-bars
10. Tempo Help Center — Scheduling Limits (0,25–744 uur) — https://help.tempo.io/portfoliomanager/latest/scheduling-limits
11. Tempo Help Center — Target Dates & Deltas (geen baselines) — https://help.tempo.io/portfoliomanager/latest/target-dates-deltas
12. Tempo Help Center — Availability & Vacations (werktijden, feestdagen) — https://help.tempo.io/portfoliomanager/latest/availability-vacations
13. Tempo Help Center — Customizing Rate Sheets (kostenmodel, Prof/Ultimate) — https://help.tempo.io/portfoliomanager/latest/customizing-rate-sheets
14. Tempo Help Center — Import Tasks from Excel (max 100 taken, geen dependencies) — https://help.tempo.io/portfoliomanager/latest/import-tasks-from-excel
15. Tempo Help Center — Views (geen Gantt-view in de lijst) — https://help.tempo.io/portfoliomanager/latest/views
16. Tempo Help Center — Priority Views (schedule bars, Timeline Mode) — https://help.tempo.io/portfoliomanager/latest/priority-views
17. Tempo Help Center — Workload View (resource leveling, 30/60/90/180 dagen) — https://help.tempo.io/portfoliomanager/latest/workload-view
18. Tempo Help Center — Work on the Right Things (prioriteitsvolgorde bepaalt datums) — https://help.tempo.io/portfoliomanager/latest/work-on-the-right-things
19. Tempo Help Center — ASAP Task Scheduling — https://help.tempo.io/portfoliomanager/latest/asap-task-scheduling
20. Tempo Help Center — Administration & Settings (plantiers, workspace-limieten, Premium Trial) — https://help.tempo.io/portfoliomanager/latest/administration-settings
21. Tempo Help Center — Members (licentiemodel) — https://help.tempo.io/portfoliomanager/latest/members
22. Tempo Help Center — Open API (token-auth, endpoints) — https://help.tempo.io/portfoliomanager/latest/open-api
23. Tempo Help Center — Jira Integration (sync-richting, limieten) — https://help.tempo.io/portfoliomanager/latest/jira-integration
24. Tempo Help Center — Release Notes (laatste entry 7 mei 2025) — https://help.tempo.io/portfoliomanager/latest/release-notes
25. Tempo Help Center — LiquidPlanner Classic (index, notitie 16 jan 2025) — https://help.tempo.io/liquidplannerclassic/latest
26. LiquidPlanner Classic API — documentatie en changelog ("August 2022 – End of updates") — https://developer.liquidplanner.com/ en https://developer.liquidplanner.com/docs.md

**Reviewplatforms**
27. GetApp — Portfolio Manager (LiquidPlanner) profiel: prijzen, takenplafonds, pros/cons — https://www.getapp.com/project-management-planning-software/a/liquidplanner/
28. GetApp — Pricing (bedragen, "Last updated: July 2026") — https://www.getapp.com/project-management-planning-software/a/liquidplanner/pricing/
29. GetApp — Reviews (samengevatte klachten over leercurve, prijs, UI) — https://www.getapp.com/project-management-planning-software/a/liquidplanner/reviews/
30. Software Advice — LiquidPlanner profiel (4,3/5 over 669 reviews; subscores; prijzen) — https://www.softwareadvice.com/project-management/liquidplanner-profile/
31. Software Advice — Reviews (kritische citaten) — https://www.softwareadvice.com/project-management/liquidplanner-profile/reviews/

**Achtergrond**
32. Wikipedia — LiquidPlanner (oprichting, oprichters, financiering, CEO-historie, mobiele app) — https://en.wikipedia.org/wiki/LiquidPlanner

**Niet toegankelijk tijdens dit onderzoek** (403/blokkade — genoemd voor volledigheid en reproduceerbaarheid): G2 (`g2.com/products/liquidplanner/reviews`), TrustRadius (`trustradius.com/products/liquidplanner/reviews`), Gartner Peer Insights, Capterra-productpagina, PCMag, The Digital Project Manager, Reddit (`r/projectmanagement`), en het Internet Archive. De gebruikerskritiek in dit profiel steunt daarom op de samengevatte reviewdata van GetApp en Software Advice (samen 669 geverifieerde reviews) in plaats van op individuele, integraal geciteerde reviews. **Dit is een erkende beperking van dit onderzoek.**

---

## Expliciete markering van schattingen

De volgende uitspraken in dit document zijn **inschattingen of interpretaties**, niet direct onderbouwde feiten:

- Dat "Adaptive Planner EAP" een opvolger van Portfolio Manager is en dat er sunset-risico bestaat — **interpretatie** op basis van de URL-vervanging en het uitblijven van releases; geen officiële aankondiging gevonden.
- De historische zetelminima (±3 / 5 / 10 gebruikers voor Essentials / Professional / Ultimate) — **ingetrokken als getal**. In de verificatieronde niet reproduceerbaar (archief onbereikbaar, geen actuele bron); alleen "er bestaan minima, hoogte onbekend" is verdedigbaar.
- ~~Dat de genoemde bedragen jaarbetalingstarieven zijn met een maandtoeslag~~ — **ingetrokken/gecorrigeerd**: GetApp én Software Advice merken de tarieven aan als *maandelijkse* facturering. Zie §3.
- Dat er een gepubliceerde jaarkorting bestaat — **geen bron gevonden**; de ×12-jaarbedragen zijn daarom een bovengrens.
- Dat enterprise-volumestaffels bestaan voor Portfolio Manager — **inschatting**, afgeleid van de wél gepubliceerde Timesheets-staffel.
- De jaarprijzen in de prijstabel (×12) — **rekenkundig afgeleid**, niet als jaarprijs gepubliceerd.
- Realistische schaal (5.000–25.000 actieve taken comfortabel) — **inschatting** op basis van de gedocumenteerde plafonds en de rekenkundige zwaarte van portfolio-brede Monte Carlo; geen gepubliceerde benchmark.
- Gebruikersaantal en omzet van Portfolio Manager afzonderlijk — **expliciet gemarkeerde schatting zonder bron**.
- De regionale verdeling van het klantenbestand — **inschatting**.
- De concurrentenlijst — **analytische samenstelling**, niet een door de leverancier of een analist gepubliceerde peer group.

---

## Verificatie

Adversariële controle uitgevoerd op **25 juli 2026**: per bewering is actief geprobeerd deze te *weerleggen* met onafhankelijke bronnen (leveranciersdocumentatie naast reviewplatforms). Beperking van deze ronde: de WebSearch-quota was uitgeput, dus verificatie liep via directe fetches van bekende URL's; `web.archive.org`, Capterra, G2 en TrustRadius waren onbereikbaar (404/blokkade). Dat raakt vooral de historische prijsclaims.

| # | Bewering | Oordeel | Bevinding | Bron |
|---|---|---|---|---|
| 1 | Vier treden Free / Essentials $15 / Professional $28 / Ultimate $42 p.g.p.m., USD, cloud-only | **bevestigd** | Beide reviewplatforms geven identiek $15 / $28 / $42; het FREE-plan is bovendien door de leverancier zelf bevestigd (FREE/ESSENTIALS/PROFESSIONAL/ULTIMATE genoemd, *"File storage is not offered on the free plan"*). Tempo publiceert zelf géén Portfolio-Manager-bedragen — die claim klopt eveneens. | https://www.getapp.com/project-management-planning-software/a/liquidplanner/pricing/ · https://www.softwareadvice.com/project-management/liquidplanner-profile/ · https://help.tempo.io/portfoliomanager/latest/administration-settings |
| 2 | *"Of dit maand- of jaarbetalingstarieven zijn is NIET GEVERIFIEERD (inschatting: jaarbetaling met maandtoeslag)"* | **gecorrigeerd** | Weerlegd. Software Advice zet de drie treden onder de kop **"Billed Monthly"**; GetApp geeft **"Billing cycle: Monthly"**. De aanname "jaarbetaling met maandtoeslag" is dus niet houdbaar; het zijn vermoedelijk maandtarieven. Restonzekerheid: geen leveranciersbevestiging, en een jaarkorting kan bestaan zonder gepubliceerd te zijn. Tekst in §3 aangepast. | https://www.softwareadvice.com/project-management/liquidplanner-profile/ · https://www.getapp.com/project-management-planning-software/a/liquidplanner/ |
| 3 | Afgeleide jaarbedragen $180 / $336 / $504 (×12, niet gepubliceerd) | **gecorrigeerd (nuance)** | Rekenkundig juist, maar gegeven bevinding 2 zijn dit **bovengrenzen** bij maandbetaling, geen "jaarprijs". Zo geherformuleerd. | idem als 2 |
| 4 | Zetelminima bestaan wél maar zijn niet gepubliceerd; historisch ±3/5/10 = onbevestigde schatting | **onzeker → getal ingetrokken** | Het bestaan van minima is alleen indirect onderbouwd (GetApp-reviewsamenvatting: *"especially due to minimum seat requirements and inflexible pricing"*). Beide platforms melden expliciet dat minima niet worden bekendgemaakt; `Administration & Settings` en `Members` bij Tempo noemen geen minimum (alleen *"If there aren't enough licenses available you'll be prompted to purchase one"*). Het Internet Archive is onbereikbaar, dus ±3/5/10 kon noch bevestigd noch weerlegd worden — als getal ingetrokken. | https://www.getapp.com/project-management-planning-software/a/liquidplanner/ · https://help.tempo.io/portfoliomanager/latest/members |
| 5 | Takenplafonds 5.000 / 50.000 / onbeperkt per trede | **onzeker (consistent, maar niet bij de bron)** | Beide reviewplatforms noemen exact dezelfde plafonds — maar dat zijn geen onafhankelijke waarnemingen (GetApp en Software Advice zijn beide Gartner Digital Markets). De Tempo-documentatie noemt de plafonds niet. Behandel als niet-leveranciersbevestigd. | https://www.getapp.com/project-management-planning-software/a/liquidplanner/pricing/ · https://help.tempo.io/portfoliomanager/latest/administration-settings |
| 6 | Gratis proefperiode + 7-daagse "Premium Trial" voor Free/Essentials/Professional | **bevestigd** | Leverancier, letterlijk: *"A Premium Trial gives you access to features not available on your current billing plan for 7 days"*, getoond voor FREE, ESSENTIALS en PROFESSIONAL. Gratis proefperiode bevestigd door beide reviewplatforms. | https://help.tempo.io/portfoliomanager/latest/administration-settings |
| 7 | Timesheets-volumestaffel $5,21 → $0,25 p.g.p.m.; suggereert onderhandelbare staffel voor Portfolio Manager | **bevestigd (staffel) / onzeker (transfer)** | Staffel geverifieerd op de leverancierspagina en preciezer gemaakt: $1 (1–10), $5,21 (11–100), $3,66 (101–250), $1,81 (251–1.000), $1,01 (1.001–2.500), $0,58 (2.501–5.000), $0,25–$0,39 boven 5.000. Portfolio Manager staat er niet op. De gevolgtrekking naar Portfolio Manager blijft een inschatting. | https://www.tempo.io/pricing |
| 8 | Geen CPM: geen kritiek pad, geen float, geen forward/backward pass | **bevestigd** | Poging tot weerlegging mislukt: noch de productmarketingpagina noch de scheduling-documentatie noemt critical path of float. De vendor positioneert het expliciet als *"predictive scheduling"* met Monte Carlo en 90%-betrouwbaarheid — een ander paradigma. | https://www.tempo.io/products/portfolio-manager · https://help.tempo.io/portfoliomanager/latest/predicting-project-outcomes |
| 9 | Alleen Finish-to-Start-afhankelijkheden; lag ("Wait Time") alleen positief, in hele dagen | **bevestigd** | Leverancier, letterlijk: *"LiquidPlanner supports finish to start dependencies on all plan items: Packages, Projects, Sub-Folders, and Tasks."* Wait Time wordt ingevoerd in een kolom **"Wait (days)"**; geen enkele vermelding van SS/FF/SF of van leads/negatieve lag. | https://help.tempo.io/portfoliomanager/latest/dependencies-wait-time |
| 10 | Geen echte Gantt-/netwerkview | **bevestigd** | De views-index noemt uitsluitend Priority Views, Workload, Board, Grid, Search, Changes & Deleted Items, Favorites, Iterations. Geen Gantt-, Timeline- of netwerkdiagram-view. | https://help.tempo.io/portfoliomanager/latest/views |
| 11 | Product staat stil: laatste release note 7 mei 2025; prijspagina toont "Adaptive Planner EAP" | **bevestigd (feiten) / interpretatie blijft interpretatie** | Laatste entry is inderdaad **7 mei 2025** ("Introducing High Level Team Planning"), daarvoor 30 apr 2025 en 27 jan 2025. `tempo.io/pricing/portfolio-manager` toont een **Adaptive Planner EAP-wachtlijst zonder bedragen**. Geen sunset-aankondiging gevonden — het risico-oordeel blijft terecht als interpretatie gemarkeerd. | https://help.tempo.io/portfoliomanager/latest/release-notes · https://www.tempo.io/pricing/portfolio-manager |
| 12 | Reviewscore 4,3/5 over 669 reviews; value for money 4,0 laagste, support 4,4 hoogste | **bevestigd** | Software Advice: 4,3/5 over 669 geverifieerde reviews; subscores ease of use 4,0 / value for money 4,0 / customer support 4,4 / functionality 4,1. GetApp identiek. Kanttekening: beide platforms delen dezelfde reviewpool (Gartner Digital Markets) — het is één bron, niet twee. | https://www.softwareadvice.com/project-management/liquidplanner-profile/ |
| 13 | Overname door Tempo, 16 maart 2023, voorwaarden niet bekendgemaakt; Tempo >$100 mln ARR (2022), 28.000+ klanten; KPMG/Delta/Bayer | **bevestigd** | Persbericht bevestigt datum (16 maart 2023, Boston), *"terms not disclosed"*, ARR >$100M in 2022, 28.000+ klanten in 100+ landen, en de klantnamen KPMG, Delta Airlines, Bayer. Aanvulling: Tempo-CEO ten tijde van de deal was **Mark Lorion**; LiquidPlanner-CEO Ted Hawksford. | https://www.tempo.io/newsroom/tempo-acquires-liquidplanner |
| 14 | Tempo: 30.000+ organisaties, 350+ medewerkers, opgericht 2007, Diversis Capital (2018), overnamereeks | **bevestigd** | Alle elementen letterlijk terug te vinden, inclusief de overnamejaren (Roadmunk 2021, ALM Works 2021, LiquidPlanner 2023, Old Street Solutions 2023, AlphaServe 2024) en "more than one third of the Fortune 500" (profieltekst zegt "one in three" — equivalent). | https://try.tempo.io/about-us/ |
| 15 | Licentiemodel: 2 Resources per user license, Placeholders gratis en ongelimiteerd | **bevestigd** | Letterlijk: *"With every User License purchased, two Resources are included for modeling"* en *"Placeholders are free and do not require a license. You can have an unlimited number of Placeholders."* | https://help.tempo.io/portfoliomanager/latest/resources · https://help.tempo.io/portfoliomanager/latest/placeholders |
| 16 | Oprichting 2006 Seattle, Seybold & Carlson, $2 mln in 2018, CEO-wissel nov 2017, iOS-app vervallen per 2024 | **bevestigd (zwakke bron)** | Alles bevestigd, maar uitsluitend via Wikipedia — en dat artikel draagt onderhoudsvlaggen voor promotionele inhoud en primaire bronnen. De Tempo-overname staat er níét in. Behandel als indicatief. | https://en.wikipedia.org/wiki/LiquidPlanner |
| 17 | Gebruikersaantal/omzet van Portfolio Manager afzonderlijk (enkele duizenden workspaces, lage-tot-midden tientallen miljoenen $) | **onzeker — blijft ongefundeerd** | Geen enkele bron publiceert cijfers voor Portfolio Manager los van Tempo. De schatting kon niet worden getoetst en is ook niet weerlegbaar; terecht als schatting-zonder-bron gemarkeerd, maar niet citeerbaar. | — (geen bron gevonden) |
| 18 | *"Tempo won in 2026 Atlassian Partner of the Year (Cloud Transformation Apps)"* | **onzeker — niet geverifieerd** | Deze claim is in deze ronde **niet** gecontroleerd (geen zoekcapaciteit meer beschikbaar). Niet gebruiken zonder aanvullende verificatie. | — (niet geverifieerd) |

**Netto-uitkomst:** de kern van het profiel houdt stand. Eén materiële correctie op de prijsstelling (facturering is maandelijks, niet jaarlijks — waarmee ook de jaarbedragen van "afgeleide jaarprijs" naar "bovengrens" verschuiven), één ingetrokken getal (de historische zetelminima), en drie claims die zijn gedegradeerd naar "consistent maar niet bij de bron bevestigd" (takenplafonds), "één gedeelde reviewpool" (4,3/669) of "niet geverifieerd" (Atlassian-award). Alle functionele claims over het ontbreken van CPM, float, andere relatietypen dan FS en een echte Gantt zijn bij de leverancier zelf bevestigd en hielden stand tegen actieve weerleggingspogingen.
