# TeamGantt — softwareprofiel

*Onderdeel van het wereldwijde marktonderzoek planningssoftware*
**Onderzoeksdatum:** 25 juli 2026
**Analist:** software-analist marktonderzoek
**Categorie:** online Gantt-/planningstool (SaaS), mkb-segment, met bouwspecifieke editie

> **Methodologische opmerking.** De WebSearch-quota van deze sessie was uitgeput; het onderzoek is uitgevoerd met directe WebFetch op leveranciersdocumentatie, de publieke feature-request-board (Canny), reviewaggregatoren en een fetchbare zoekmachine (DuckDuckGo HTML). G2, Capterra, Forbes Advisor, TrustRadius, Trustpilot en Reddit blokkeerden geautomatiseerde toegang (HTTP 403/404); waar hun cijfers voorkomen zijn die overgenomen uit secundaire bronnen en als zodanig gemarkeerd. Alle expliciete schattingen zijn gelabeld met **[SCHATTING]**.

---

## 1. Wat het is

### Leverancier en historie

| Item | Gegeven | Bron |
|---|---|---|
| Product | TeamGantt | teamgantt.com |
| Juridische oorsprong | Groundbreaking Designs LLC, opgericht mei 2009 | teamgantt.com/about-us |
| Publieke productlancering | november 2010 | teamgantt.com/about-us |
| Oprichters | John Correlli en Nathan Gilmore | teamgantt.com/about-us |
| Vestiging | Timonium / Baltimore, Maryland (VS); volledig remote team | teamgantt.com/about-us |
| Eigendom | Privaat, bootstrapped — "100% customer-funded", nooit venture capital opgehaald | teamgantt.com, teamgantt.com/about-us; Tracxn labelt het bedrijf als "unfunded" |
| Personeelsomvang | 11–50 (LeadIQ) tot 25–100 (SignalHire) — bronnen lopen uiteen | secundair, via zoekresultaten |
| Omzet | Niet gepubliceerd | — |

Het ontstaansverhaal is relevant voor het productkarakter: de oprichters bouwden de eerste versie 's avonds en in het weekend naast hun werk voor een **dakdekkersbedrijf**. TeamGantt is dus vanaf dag één ontstaan uit een praktische bouw-/uitvoeringsbehoefte, niet uit de PMO-/project-controls-wereld. Dat verklaart zowel de sterke bruikbaarheid als het ontbreken van klassieke project-controls-diepte.

Het bedrijf hanteert een 4-daagse werkweek (32 uur) en presenteert zich nadrukkelijk als onafhankelijk van investeerders. Voor een inkopende partij betekent dit een **laag overname-/end-of-life-risico** vergeleken met VC-gefinancierde concurrenten, maar ook een **beperkt R&D-budget** — wat terug te zien is in de lange doorlooptijd van feature-requests (zie §5).

### Claims over omvang

De leverancier communiceert inconsistente gebruikersaantallen:

- Homepage (juli 2026, geverifieerd 25-07-2026): "More than 2,000,000 users choose TeamGantt", "Trusted by 20,000+ companies", "96% customer retention". De homepage toont daarnaast zelf reviewscores: G2 4,8 / Capterra 4,6 / GetApp 4,6 (leverancierclaims).
- About-pagina (juli 2026, geverifieerd 25-07-2026): in de lopende tekst "Today, millions of people across 120 countries have used TeamGantt to plan and execute projects", in de footer "Over 1 million users around the world work smarter with TeamGantt"

Beide zijn ongeauditeerde marketingcijfers en spreken elkaar met een factor twee tegen. **[SCHATTING]** Het realistische aantal *betalende* accounts ligt waarschijnlijk in de orde van enkele tienduizenden bedrijven; "gebruikers" telt vrijwel zeker gratis accounts en uitgenodigde collaborators mee.

### Doelgroep, typische gebruikers, sectoren en regio's

**Doelgroep:** "schedule-driven teams" — teams waarvoor de tijdlijn het primaire coördinatiemiddel is, maar die géén planningsspecialist in dienst hebben. De typische gebruiker is een projectmanager, marketingmanager, accountdirector of uitvoerder die zelf plant en geen opleiding in netwerkplanning heeft gehad.

**Sectoren** (volgens leverancier): bouw, engineering, softwareontwikkeling, marketing/reclamebureaus, manufacturing, evenementen, onderwijs.

**Sinds circa 2024–2026 een duidelijke verticale pivot naar bouw**, zichtbaar aan:
- een aparte **Builder Edition** met bouwspecifieke functies (lookahead-planning, roadblocks, selections management, procurement management, cost-loaded scheduling)
- een **one-click Procore-sync**
- een landingspagina `teamgantt.com/construction-scheduling-software` **[GECORRIGEERD]** — deze pagina blijkt bij hercontrole (25-07-2026) geen frontale aanval op Primavera P6, maar een **vergelijkend overzichtsartikel van tien bouwplanningstools** (waaronder P6, MS Project, JobTread). Het artikel *concedeert* P6 juist voor "large commercial, infrastructure, and government projects where contracts require detailed CPM scheduling and formal project controls" en MS Project voor "commercial construction teams with experienced schedulers". TeamGantt positioneert zichzelf daar dus onder die categorie, niet ertegenover — content-marketing via een vergelijkingsstuk, geen concurrentieclaim.

**Regio's:** sterk VS-gecentreerd. Prijzen worden uitsluitend in **USD** getoond; er zijn geen lokale valuta, geen EU-datacenteroptie en geen meertalige interface aangetroffen. Voor Europese/Nederlandse aanbestedingen met AVG-/dataresidentie-eisen is dit een aandachtspunt dat expliciet bij de leverancier nagevraagd moet worden — **[SCHATTING]** op basis van het ontbreken van elke vermelding, is er vermoedelijk alleen US-hosting.

---

## 2. Functionaliteit en techniek

### 2.1 Heeft TeamGantt een échte CPM-engine? — Genuanceerd nee

Dit is de kernvraag voor dit onderzoek, en het antwoord verdient precisie, want TeamGantt zit in een **tussencategorie** die zeldzaam is.

**Wat er wél is — en dat is meer dan de meeste worktools:**

| Capaciteit | Status | Bewijs |
|---|---|---|
| Finish-to-Start (FS) | Ja | support.teamgantt.com/article/8-dependencies |
| Start-to-Start (SS) | Ja | idem |
| Finish-to-Finish (FF) | Ja | idem |
| Start-to-Finish (SF) | Ja | idem |
| Lag / lead | Ja — "positive values are used for lag, and negative values are used for lead" | idem |
| Kritiek pad | Ja — highlight- én filtermodus | support.teamgantt.com/article/165-critical-path |
| Automatisch doorschuiven van opvolgers | Ja, met preference "remove float when dragging" | support.teamgantt.com/article/98-my-preferences-dependencies |
| Reparatie van ongeldige afhankelijkheden | Ja, optie "automatically fix invalid dependencies when task dates are edited" | idem |
| Mijlpalen | Ja | support.teamgantt.com/article/143-gantt-view |

Volledige SS/FF/SF-ondersteuning mét lag is **echt uitzonderlijk** in het segment onder $30/maand. Asana, Monday.com, Trello en Basecamp bieden dit niet of alleen FS. TeamGantt hoort daarmee **niet** in de categorie "tekent alleen een balkenschema".

**Wat er níet is — en dat is precies wat een CPM-engine definieert:**

1. **Geen float-/slackwaarden.** Nergens in de documentatie of kolomopties komt total float, free float of slack voor. De enige verwijzing is een feature-request "Float time" ("allow the ability to show float time in the Gantt chart") met **2 stemmen** en zonder status op teamgantt.canny.io. Het kritieke pad wordt dus als **kleur** getoond, niet als **berekende reserve**. Je ziet *welke* taken kritiek zijn, maar niet *hoeveel dagen speling* de rest heeft — en dus ook niet hoe dicht een niet-kritieke keten bij kritiek wordt. Vertragingsanalyse, "near-critical path"-monitoring en wat-als-onderbouwing zijn hiermee onmogelijk.

2. **Geen constraints.** Er is geen documentatie voor Must Start On, Start No Earlier Than, Finish No Later Than, deadlines of ALAP-planning. Ook de Canny-zoekopdracht op "constraints" en "deadlines" leverde geen enkele treffer op. Een planner kan een taak dus niet vastzetten tegen een contractuele mijlpaal en de tool laten uitrekenen wat er stukloopt.

3. **Geen zichtbare backward pass.** Er is geen late-start/late-finish-kolom. Zonder late dates en zonder float is er geen bruikbare bewijsvoering van een tweerichtings-netwerkberekening richting de gebruiker.

4. **Het scheduling-model lijkt reactief, niet netwerkbreed.** De preferences spreken over het *repareren* van ongeldige afhankelijkheden "when task dates are edited" en over het *verwijderen van float bij slepen*. Dat is de taal van een lokale, incrementele correctie rond een bewerkte taak — niet van een volledige forward/backward pass over het gehele netwerk bij elke herberekening. **[SCHATTING/BEOORDELING]** De leverancier documenteert de engine niet, dus dit is een gefundeerde interpretatie, geen vastgesteld feit. Consequentie voor de praktijk: het is niet gegarandeerd dat het schema na een reeks bewerkingen een consistente netwerkoplossing is, en er is geen "herbereken alles"-knop waarmee je dat kunt afdwingen.

**Eindconclusie §2.1:** TeamGantt is **dependency-aware scheduling met kritieke-padmarkering** — een categorie boven de generieke worktools, maar een categorie onder echte CPM. Het is een *planningsvisualisatie met netwerklogica*, geen *planningsanalysemotor*. Wie forensische vertragingsanalyse, EOT-claims, float-eigendomsdiscussies of contractuele schemaverantwoording moet doen, kan hier niet mee werken.

### 2.2 Kalenders

| Aspect | Bevinding | Bron |
|---|---|---|
| Werkdagen | Per **project** instelbaar (welke dagen van de week), via Menu > Open Project Details | support.teamgantt.com/article/72-customizing-days-in-your-projects |
| Feestdagen | Alleen **bedrijfsbreed**, via Account Settings > Manage Holidays | support.teamgantt.com/article/35-adding-company-holidays |
| Datumbereiken bij feestdagen | **Niet mogelijk** — "only individual dates can be selected. A date range cannot be selected" | idem |
| Effect op planning | Taken verschuiven naar de laatst beschikbare zichtbare dag | idem |
| Resource-specifieke kalenders / verlof | **Bestaat niet.** Officiële workaround: maak een taak "vakantie" aan | idem |
| Ploegendiensten, uren per dag als kalender, meerdere kalenders per taak | Niet aangetroffen | — |

Dit is een **serieuze beperking voor bouw en voor internationale teams**. Eén bedrijfsbrede feestdagenlijst werkt niet bij ploegen die in het weekend doorwerken naast kantoorpersoneel dat dat niet doet, en niet bij projecten over landsgrenzen. De feature-request "Allow resource-specific holidays/vacations" heeft **197 stemmen**, staat op "Under review" en is **aangemaakt op 9 februari 2013** — ruim **dertien jaar** zonder oplevering (gecorrigeerd: een eerdere versie van dit profiel noemde 17 maart 2022; de Canny-post zelf vermeldt 09-02-2013 als aanmaakdatum). Het is met 197 stemmen tevens de **hoogst gestemde** post op de board. De aanvrager (John Hunt) schrijft: "We have people in different countries working on the same projects. It would be nice if each person/resource could have an individual set of holidays or vacations assigned to them."

Bovendien: feestdagen één voor één invoeren zonder datumbereiken is voor een bouwvakantie of kerstsluiting simpelweg omslachtig.

### 2.3 Resourcemodel

| Capaciteit | Status | Bewijs |
|---|---|---|
| Toewijzen van personen en labels aan taken | Ja | support.teamgantt.com/article/138-workloads |
| Workloads-rapport (taken óf uren, per dag/week) | Ja — Business+ (docs noemen nog "Pro en Unlimited") | idem |
| Urenraming per taak (Avg Hours/Day of Total Hours) | Ja — Business en Builder | support.teamgantt.com/article/79-hourly-estimation |
| Overbelastingssignaal | Alleen visueel: >8 uur/dag kleurt rood | idem |
| Tijdregistratie | Ja | support.teamgantt.com/article/102-time-tracking |
| **Resource leveling** | **Nee** — Canny-request, 48 stemmen, "Under review" | teamgantt.canny.io |
| **Bezettingspercentage per resource** | **Nee** — Canny "Resource Allocation %", 74 stemmen | teamgantt.canny.io |
| **Resource-kalender (deeltijd, beschikbaarheid)** | **Nee** — Canny "Resource Calendar", 2 stemmen | teamgantt.canny.io |
| **Uurtarieven per resource** | Niet gedocumenteerd | — |
| Effort-driven scheduling (uren sturen duur/toewijzing) | **Nee** — expliciet alleen rapportage: de documentatie beschrijft het als hulpmiddel om "your team's workload more accurately" te bepalen, niet om te herplannen | support.teamgantt.com/article/79-hourly-estimation |

Het resourcemodel is dus **descriptief, niet prescriptief**: je kunt zien dat iemand overbelast is, maar de tool lost het niet op en rekent het ook niet door in de planning. Er is geen capaciteitsmodel (beschikbare uren per persoon per periode), alleen een vaste drempel van 8 uur/dag.

### 2.4 Kostenmodel

"Cost-Loaded Scheduling" (Builder Edition; als **add-on van $24/maand** op Basic):

- Velden: **budgeted cost** en **actual cost** per taak
- Output: cumulatieve cashflow, maandtotalen in een Cost-tab, schakelbaar tussen begroot en werkelijk
- **Expliciete beperking uit de eigen documentatie:** "costs can only be shown per month" — geen week- of dagresolutie
- Geen uurtarieven, geen resource-gedreven kosten, geen **earned value management** (geen BCWS/BCWP/ACWP, geen CPI/SPI), geen S-curve-grafiek gedocumenteerd
- Canny-request "Resource Costs & Budgeting (Costing)" heeft **120 stemmen** en staat op "In progress" — bevestigt dat resource-gebaseerde kosten er nú niet zijn

Voor bouwkundige cashflowprognose op hoofdlijnen is dit bruikbaar; voor project controls, EVM-rapportage of kostenbewaking op contractniveau is het ontoereikend.

### 2.5 Baselines

- Meerdere **baseline-sets** per project, aan te maken via Baselines > Create new baseline set
- Weergave als lichtgrijze balk onder de actuele taakbalk, plus een **baseline-kolom** met "how many days ahead or behind the task is"
- Bewerken en verwijderen van baselines mogelijk
- Geen gedocumenteerd maximum aantal baselines
- Beschikbaar op de betaalde plannen (documentatie noemt nog de oude namen "Pro en Unlimited")
- Openstaande wensen op Canny: baseline per taak, baseline start-/einddatum als kolom, meerdere baselines tegelijk tonen, baselines in PDF-export — alle zonder status

Baselines zijn dus **aanwezig en functioneel**, maar op het niveau "planned vs. actual dagen verschil", niet op het niveau van baseline-varianties per kostenpost of per resource.

### 2.6 Platform, architectuur en schaalbaarheid

**Platform:** pure SaaS-webapplicatie, geen download nodig. Native apps voor iOS en Android. Geen desktopclient, geen offline modus, geen on-premise of private-cloud-optie aangetroffen.

**Weergaven:** Gantt, board/Kanban, kalender, lijst — allemaal over dezelfde dataset.

**Structuur:** groepen en subgroepen. Volgens TeamGantt-materiaal is het aantal subgroepniveaus onbeperkt, maar er is een Canny-request "Support for multiple levels of subtasks" waaruit blijkt dat **subtaken zelf slechts één niveau diep** gaan. Er is geen automatische WBS-codering in de applicatie; WBS-nummers komen alleen voor als **importveld** in de CSV-import.

**Schaalbaarheid — dit is een harde beperking, in twee lagen:**

*Laag 1 — contractuele limieten per plan (pricing-pagina, 25-07-2026):*

| Plan | Taken per project | Projecten |
|---|---|---|
| Free / Personal | **40** (de pricing-pagina) — maar support-artikel 106 zegt **60**; tegenstrijdig | 1 |
| Basic | **150** | 2–5 (max 5) |
| Business | **500** | 5–20 (max 20) |
| Builder Edition | Onbeperkt | 10 (uitbreidbaar) |
| Enterprise | Onbeperkt | Onbeperkt |

Een taaklimiet van 150 respectievelijk 500 per project is voor bouwplanningen **zeer laag**. Een middelgroot utiliteitsproject zit al snel op 1.500–5.000 activiteiten; een infraproject op 10.000+. Op Business loop je dus bij een reëel bouwschema tegen een muur en moet je door naar Builder Edition of Enterprise — een prijssprong van $19/project/maand naar $159–199/maand.

*Laag 2 — feitelijke prestaties, ook zónder limiet:*

De Canny-post **"Improve Performance for Large Projects"** (aangemaakt 15 maart 2022, **15 stemmen**, samengevoegd met verwante posts, geen statuslabel, **meest recente reactie 9 september 2024** — dus al ruim vier jaar open) bevat citaten van gebruikers:

- "We have around 77 groups with tasks totalling over 1200, with dependencies heavily mapped out and the project has become very slow."
- "It's taking half an hour to do something that should take 5 minutes!"
- "Recently TG has become almost unworkable, due to how slow it has become when having multiple projects open."
- "Our TeamGantt account has become unusable because it takes so long to update and reload!"
- "I need a tool that can handle a minimum of 2000 tasks and 4000 links between tasks in a single project."

Ook SoftwareAdvice-reviewers noemen als terugkerend nadeel dat het beheer van grote schema's met meerdere WBS-niveaus lastig wordt en updates "may get out of control".

**[SCHATTING] Realistisch werkbaar bereik:** tot circa **300–500 taken** loopt het comfortabel; **500–1.000 taken** met een dicht afhankelijkheidsnetwerk wordt merkbaar traag; **boven ~1.200 taken** melden gebruikers onwerkbaarheid. Dit is een schatting op basis van gebruikersmeldingen, niet op eigen benchmarking.

---

## 3. Prijzen

**Bron voor alle bedragen in deze paragraaf:** https://www.teamgantt.com/pricing — geraadpleegd **25 juli 2026**. Alle bedragen in **USD**; er zijn geen andere valuta aangetroffen.

### 3.1 Belangrijk: het licentiemodel is recent fundamenteel veranderd

TeamGantt hanteerde jarenlang een klassiek **per-manager-seat**-model (plannen Free / Lite / Pro / Unlimited). De actuele pricing-pagina hanteert een **per-project**-model met de plannen Free / Basic / Business / Builder Edition / Enterprise.

**Bewijs dat dit recent is:** de eigen supportdocumentatie is nog niet bijgewerkt en verwijst op meerdere plaatsen naar de oude plannamen — bijvoorbeeld "Baselines are an available feature on our **Pro and Unlimited** plans" (artikel 48) en "This dashboard is only available on the **Pro and Unlimited** plans" (artikel 138), terwijl artikel 79 al wel "Available in **Business and Builder**" zegt. Bij hercontrole (25-07-2026) blijkt de rommeligheid nog groter dan eerder beschreven: **artikel 106 noemt in één en hetzelfde artikel zeven plannamen door elkaar — Free, Standard, Advanced, Pro, Business, Builder, Unlimited én Enterprise.** Kopers moeten dus rekening houden met **verouderde documentatie en mogelijke migratieafspraken voor bestaande klanten**.

**Onafhankelijke bevestiging van het oude model:** externe prijstrackers beschrijven TeamGantt nog steeds seat-gebaseerd — ITQlick: "The Pro plan costs $49 per month per manager"; pricingnow.com beschrijft Free/Pro/Unlimited met "20 projects per manager". Die pagina's zijn zelf niet gedateerd en dus geen bewijs van *wanneer* de omzetting plaatsvond, maar ze bevestigen wel dat het per-manager-model het historische model was. **De exacte datum van de overstap is niet vast te stellen** — het Internet Archive was tijdens deze verificatie niet bereikbaar.

### 3.2 Actuele lijstprijzen (25-07-2026)

| Plan | Maandelijks | Jaarlijks | Eenheid | Inbegrepen | Managers | Collaborators | Taken/project |
|---|---|---|---|---|---|---|---|
| **Free / Personal** ("free personal plan") | $0 | $0 | — | 1 project | — | — | 40 (pricing-pagina: "Get started with 1 project and 40 tasks"); 60 volgens support-artikel 106 |
| **Basic** | **$12 per project/maand** | **$10 per project/maand** | per project | 2–5 projecten | **1** | 10 | **150** |
| **Business** | **$24 per project/maand** | **$19 per project/maand** | per project | 5–20 projecten | Onbeperkt | Onbeperkt | **500** |
| **Builder Edition** | **$99/maand introductie (eerste 3 maanden), daarna $199/maand** | **$1.908/jaar** (= $159/maand) | vast, per account | 10 projecten | Onbeperkt | Onbeperkt | Onbeperkt |
| **Enterprise** | Op aanvraag | Op aanvraag | — | Onbeperkt projecten, taken, gebruikers | Onbeperkt | Onbeperkt | Onbeperkt |

**Extra projecten boven de staffel** (geverifieerd 25-07-2026): Basic **+$12 per extra project/maand** of **+$120 per extra project/jaar**; Business **+$24 per extra project/maand** of **+$228 per extra project/jaar**. De plannen zijn *echt* per project geprijsd, ook binnen de inbegrepen staffel: de pricing-pagina toont voor Business "Starts at $120/mo" bij 5 inbegrepen projecten (= 5 × $24). Daarmee is het staffelminimum feitelijk bevestigd: Basic minimaal 2 projecten, Business minimaal 5.

**Rollen (definities van de pricing-pagina):** *Managers* = "Full control over schedules & team management. Can create, edit, assign & manage tasks."; *Collaborators* = "Limited editing rights. Can view and update assigned tasks only." Vanaf Business zijn beide "Unlimited. Included in your plan" — er is geen aparte seat-prijs. **Gratis proefperiode: 14 dagen** op de betaalde plannen.

### 3.3 Add-ons (uitsluitend op het Basic-plan, 25-07-2026)

| Add-on | Prijs |
|---|---|
| Project Health Report | **+$12/maand** |
| Cost Loaded Scheduling | **+$24/maand** |
| Custom Boards | **+$24/maand** |

Op Basic kost cost-loaded scheduling dus twee keer zoveel als het basisplan zelf per project — een klassieke upsell-constructie richting Business/Builder.

### 3.4 Functiegating per plan

- **Basic:** kalenderweergave, lijstweergave, bestandsbeheer, onbeperkte exports
- **Business voegt toe:** project health, workload management, **kritiek pad**, RACI-toewijzingen, tijdregistratie, financiële forecasting, geavanceerde afhankelijkheden, portfoliomanagement, planned-vs-actual, uurraming, teamresourcing, Kanban
- **Builder Edition voegt toe:** Procore-integratie, roadblock management, selections management, procurement management, **lookahead-planning**, 1-op-1 onboarding
- **Enterprise voegt toe:** onbeperkte schaal, geavanceerde rapportage en forecasting

**Let op:** het **kritieke pad zit niet op Basic**. Wie CPM-markering wil, zit minimaal op Business ($19–24 per project per maand).

### 3.5 Contractvoorwaarden

- **Geen langlopend contract vereist**; maandelijks of jaarlijks, "Cancel anytime". FAQ op de vraag naar contractverplichting: "No. You can choose the plan that's best for you."
- Jaarkorting wordt op de pricing-pagina **inconsistent** gecommuniceerd: bij het Basic-plan staat het jaartarief gelabeld als **20% korting**, terwijl de FAQ zegt: "If you pay by credit card for a yearly plan, you can simplify your billing and save over 15%." (beide geverifieerd 25-07-2026)
- Betaalmethoden: "major credit cards—including Visa, MasterCard, Discover, and American Express—as well as PayPal"; betaling per cheque uitsluitend bij **50+ gebruikers of Enterprise** — de facto het enige zichtbare Enterprise-drempelsignaal
- **Geen minimum aantal seats** (het model is niet seat-gebaseerd); wel een minimum aantal projecten per staffel (2 op Basic, 5 op Business — bevestigd door "Starts at $120/mo" bij Business)
- **Onderwijskorting:** letterlijk — "Yes, we actually have free plans for professors using TeamGantt to teach project management in the classroom. Contact us from your .edu account, and we'll get you set up!" Dit is dus expliciet gericht op **docenten die projectmanagement onderwijzen**, niet op studenten of onderwijsinstellingen in het algemeen.
- Geen non-profitkorting aangetroffen
- Gebruikersklachten over **auto-pay/automatische verlenging** komen terug in reviews (GetApp/SoftwareAdvice, 203 reviews)

### 3.6 Rekenvoorbeelden [EIGEN BEREKENING]

| Scenario | Berekening | Jaarkosten |
|---|---|---|
| Klein bureau, 5 projecten, 3 planners, jaarlijks Business | 5 × $19 × 12 | **$1.140** |
| Bureau met 20 lopende projecten, jaarlijks Business | 20 × $19 × 12 | **$4.560** |
| Aannemer, 10 projecten, Builder Edition jaarlijks | vaste prijs | **$1.908** |
| Aannemer, 40 projecten — Business (indien toegestaan tot 20) niet mogelijk → Builder/Enterprise | — | **offerte vereist** |

**Kernobservatie over het model:** omdat er vanaf Business **geen kosten per gebruiker** zijn, is TeamGantt uitzonderlijk goedkoop voor **grote teams met weinig projecten** en relatief duur voor **kleine teams met veel projecten**. Dat is precies het omgekeerde van MS Project (Planner Plan 3, per gebruiker) en Primavera P6 (per named user). Voor een bouwbedrijf dat onderaannemers, opdrachtgevers en uitvoerders wil laten meekijken, is dit een substantieel voordeel: externe partijen kosten niets.

---

## 4. VOORDELEN

1. **Volledige set afhankelijkheidstypen mét lag/lead in een goedkope tool.** FS, SS, FF én SF worden alle vier ondersteund, met positieve waarden voor lag en negatieve voor lead (support-artikel 8). Concurrerende worktools in dezelfde prijsklasse (Asana, Monday, Trello, Basecamp) bieden dit niet of alleen FS. Dit tilt TeamGantt boven de categorie "balkenschema-tekenprogramma" uit.

2. **Aantoonbaar hoge gebruikerswaardering, met name op bruikbaarheid en support.** GetApp/SoftwareAdvice: **4,6/5 op 203 geverifieerde reviews**, waarvan 130 vijfsterren en slechts 1 eensterrenbeoordeling. Deelscores: Customer Support **4,7**, Ease-of-Use **4,5**, Value for Money 4,4. De leverancier claimt daarnaast 4,8 op G2 (niet onafhankelijk verifieerbaar in dit onderzoek wegens 403).

3. **Kritiek pad én meerdere baselinesets zijn daadwerkelijk aanwezig.** Het kritieke pad kent zowel een highlight- als een filtermodus (artikel 165), en baselines ondersteunen meerdere sets met een kolom die per taak toont hoeveel dagen voor of achter men loopt (artikel 48). Dat zijn twee functies die de meeste lichte planners geheel missen.

4. **Per-project-prijsmodel met onbeperkte gebruikers vanaf Business.** Onderaannemers, opdrachtgevers en veldploegen kunnen het actuele schema live inzien zonder extra licentiekosten: de pricing-pagina zet zowel Managers als Collaborators op Business en hoger op "Unlimited. Included in your plan". *(Gecorrigeerd: een eerdere versie schreef de formulering "free external users" aan de TeamGantt-constructiepagina toe; die pagina is een vergelijkingsartikel over tien tools en gebruikt "unlimited free external users" over **JobTread**, niet over TeamGantt. De onderliggende bewering blijft overeind via de pricing-pagina, maar het citaat was misattributie.)* Dit verwijdert de klassieke reden waarom bouwschema's als verouderde PDF's circuleren.

5. **Werkende kalenderlogica op projectniveau.** Werkdagen zijn per project instelbaar (artikel 72) en bedrijfsbrede feestdagen verschuiven taken automatisch naar de laatst beschikbare zichtbare dag (artikel 35). Basisniveau, maar het functioneert en het is niet vanzelfsprekend in dit segment.

6. **Serieuze bouwspecifieke editie.** Builder Edition levert lookahead-planning met een instelbaar venster van 2–6 weken dat alleen taken toont die in die periode starten, eindigen of overlappen (artikel 166), plus roadblock-, selections- en procurement-management en cost-loaded scheduling. Dit is geen marketinglaag over de generieke tool maar een echte verticale invulling van de Last-Planner-achtige praktijk.

7. **Volwaardige, gedocumenteerde REST API met webhooks.** Bearer-token-authenticatie, tokens beheerd via `app.teamgantt.com/admin/developers/tokens`, en endpoints voor projecten, taken (inclusief bulk updates en dependencies), groepen, resources, RACI, boards, comments, tijdregistratie, bedrijfsinstellingen inclusief holidays, plus webhooks (api-docs.teamgantt.com). De supportdocumentatie bevestigt volledige CRUD, inclusief **baselines** en **workloads**. Daarnaast Zapier-integratie voor niet-ontwikkelaars. Data is dus programmatisch bereikbaar — cruciaal voor een integratiescenario.

8. **Lage leveranciersrisico's door onafhankelijkheid en levensduur.** Ruim vijftien jaar actief, bootstrapped, geen VC-druk om te exiten, geclaimde retentie van 96%. Vergeleken met de golf van overnames in PM-software (Wrike→Citrix→Vista, Clarizen→Planview) is de kans op een abrupte productwijziging of prijsschok relatief klein.

9. **Eén dataset, vier weergaven.** Gantt, board/Kanban, kalender en lijst werken over dezelfde taken, plus native iOS-/Android-apps. Dat maakt de tool bruikbaar voor gemengde teams waar niet iedereen in een Gantt wil werken — een van de belangrijkste redenen waarom klassieke CPM-tools in kleinere organisaties stranden.

10. **Bruikbare importroutes voor gestructureerde data.** MS Project `.mpp`-import (artikel 161) en CSV-import met een work-breakdown-methode die WBS-nummer, naam, start/eind, **predecessors**, percentage gereed, geraamde uren, opmerkingen en taakkleur ondersteunt (artikel 20). Voor een migratie vanuit een bestaande planning is er dus een pad.

---

## 5. NADELEN

1. **Het kritieke pad is een kleur, geen berekening — er zijn geen float-/slackwaarden.** Nergens in de kolomopties, de Gantt-view-documentatie of het critical-path-artikel komt total float of free float voor. De enige verwijzing is een Canny-request "Float time" met **2 stemmen** en geen status. Gevolg: je kunt niet zien welke niet-kritieke keten bijna kritiek is, je kunt vertragingsimpact niet kwantificeren, en je kunt geen enkele schema-onderbouwing leveren die in een contractuele discussie standhoudt.

2. **Geen resource leveling, geen bezettingspercentage, geen resource-kalenders.** Op de publieke feature-board staan al jaren: "Resource Leveling" (**48 stemmen**, Under review), "Resource Allocation %" (**74 stemmen**), "Resource Calendar" (2 stemmen), "Resource Costs & Budgeting" (**120 stemmen**, In progress). Het resourcemodel signaleert alleen met een rode kleur boven 8 uur/dag — het lost niets op en herplant niets.

3. **Harde taaklimieten die bouwschema's uitsluiten.** 150 taken per project op Basic, 500 op Business (pricing-pagina, 25-07-2026). Een reëel bouwschema begint waar Business ophoudt. Alleen Builder Edition ($199/maand na de introductieperiode) en Enterprise bieden onbeperkte taken — een prijssprong van ongeveer een factor tien.

4. **Aantoonbare prestatieproblemen bij grote schema's, al jaren onopgelost.** De Canny-post "Improve Performance for Large Projects" loopt sinds **15 maart 2022**, heeft 15 stemmen, geen statuslabel, en de laatste reactie dateert van **9 september 2024** *(gecorrigeerd: eerder stond hier "klachten tot in 2026"; die datering is niet terug te vinden op de post)*: "It's taking half an hour to do something that should take 5 minutes!" en "TeamGantt has become almost unworkable, due to how slow it has become" — bij circa 1.200 taken in 77 groepen met veel afhankelijkheden. Een gebruiker die 2.000 taken en 4.000 links nodig heeft, krijgt geen toezegging.

5. **Feestdagen zijn alleen bedrijfsbreed en alleen per losse datum.** De eigen documentatie erkent: "only individual dates can be selected. A date range cannot be selected." Persoonlijk verlof kent geen ondersteuning; de officiële workaround is om een *taak* aan te maken die vakantie heet. De feature-request "Allow resource-specific holidays/vacations" is met **197 stemmen de hoogst gestemde post op de hele feature-board**, staat op "Under review" en is **aangemaakt op 9 februari 2013** — ruim dertien jaar zonder oplevering.

6. **Kostenmodel is rudimentair.** Alleen begrote versus werkelijke kosten per taak, en de documentatie stelt expliciet: "costs can only be shown per month". Geen uurtarieven, geen resource-gedreven kostenopbouw, geen earned value (CPI/SPI), geen S-curve. Voor project controls is dit niet toereikend.

7. **Geen constraints, deadlines of ALAP-planning.** Zoeken op de feature-board naar constraints en deadlines levert geen resultaten op, en de documentatie kent geen equivalent van "Finish No Later Than". Contractmijlpalen kunnen dus niet als harde randvoorwaarde in het netwerk worden vastgelegd.

8. **Prijsmodel is recent omgegooid en de documentatie loopt achter.** De pricing-pagina hanteert per-project-prijzen met Basic/Business/Builder, terwijl de supportartikelen nog "Pro and Unlimited" noemen (artikelen 48 en 138). Ook binnen de pricing-pagina zelf zijn er inconsistenties: jaarkorting "20%" versus "over 15%", en de gratis limiet is **40 taken** op de pricing-pagina tegenover **60 taken** in support-artikel 106. Dat maakt budgettering en contractonderhandeling onnodig lastig.

9. **Terugkerende reviewklachten over prijs-per-functionaliteit en facturering.** GetApp/SoftwareAdvice (203 reviews): "the software becomes expensive when upgrading for full functionality", ontevredenheid over auto-pay-beleid, en de gratis laag wordt als "restrictive" ervaren. Veelzeggend is dat **Functionality met 4,2/5 de laagst scorende deelscore is**, terwijl support 4,7 haalt — gebruikers houden van het bedrijf, maar lopen tegen de functionele grenzen aan.

10. **Import is lossy: resources gaan verloren.** Bij MS Project-import komen alleen taaknaam, afhankelijkheden, start-/einddatums en percentage gereed mee; de documentatie noemt "Task Resource Assignments" en "Resources" **expliciet als niet-importeerbaar** (artikel 161). Of lags, kalenders, constraints en baselines meekomen wordt niet vermeld — **[SCHATTING]** vermoedelijk niet, gezien de opsomming van wat wél werkt.

11. **CSV-import kan alleen nieuwe projecten maken.** De documentatie: CSV-import "can only be used to create a *new* project in TeamGantt. It can't be used to import data into an existing project." Terugkerende data-updates via CSV zijn dus onmogelijk; daarvoor moet je de API gebruiken.

12. **Geen realtime co-editing van de Gantt.** Bovenaan de standaardweergave van de feature-board staat "Update the chart in real time as other users modify it" (**35 stemmen**, status: **Planned**) — *gecorrigeerd: dit is de bovenste post in de default-sortering, niet de hoogst gestemde van de board; die eer gaat naar de resource-specifieke feestdagen met 197 stemmen* — gebruikers willen dit onder meer tijdens gezamenlijke planningssessies. Momenteel zie je wijzigingen van collega's dus niet live.

13. **Geen desktop, geen offline modus, geen on-premise.** Uitsluitend SaaS. In bouwomgevingen met slechte connectiviteit op de bouwplaats en in organisaties met dataresidentie-eisen is dat een reële blokkade.

---

## 6. Interoperabiliteit

Dit is de meest kritische paragraaf voor de opdrachtgever, die een open-source, IFC-gebaseerde planner bouwt.

### 6.1 Overzicht per formaat

| Formaat | Import | Export | Toelichting en bron |
|---|---|---|---|
| **IFC 4.3 / IfcWorkSchedule / IfcTask** | **Nee** | **Nee** | Geen enkele vermelding van IFC, BIM of 4D in de leverancierscommunicatie, documentatie of feature-board. Volledig afwezig. |
| **Primavera XER** | **Nee** | **Nee** | Niet gedocumenteerd, niet genoemd. |
| **Primavera P6 XML** | Onduidelijk | Onduidelijk | De homepage claimt bij hercontrole (25-07-2026) letterlijk import vanuit **"Primavera P6" (P6 files)**, naast "MS Project" (MPP) en "Microsoft Excel" (CSV). Er is echter **geen enkel supportartikel** dat een P6-importroute beschrijft, en het formaat ("P6 files") wordt niet gespecificeerd (XER? XML?). **[ONZEKER]** Marketingclaim zonder documentatie; behandel als onbevestigd tot de leverancier het aantoont. |
| **MS Project `.mpp`** | **Ja** | **Ja** (indirect) | Import gedocumenteerd in artikel 161; export naar MPP wordt genoemd als alternatief in het Procore-artikel (162). |
| **MSPDI / MS Project XML** | Niet gedocumenteerd | Niet gedocumenteerd | — |
| **CSV** | **Ja** — alleen nieuwe projecten | **Ja** — Menu > Export CSV | Import-velden: WBS-nummer, naam, start-/einddatum (MM/DD/YYYY of YYYY-MM-DD), **predecessors**, percentage gereed, geraamde uren, opmerkingen, taakkleur. Resource-toewijzingen en kosten ontbreken. |
| **PDF** | — | **Ja** | Free-plan beperkt tot maximaal 3 PDF-exports. |
| **Excel (XLSX)** | Nee | Nee | Alleen als Canny-request "Export to Excel" (2 stemmen); reviewers vragen om opmaakbehoud in plaats van kale CSV. |
| **PNG/afbeelding** | — | Nee | Canny-request "Export Image (PNG)", 2 stemmen. |
| **REST API** | **Ja** | **Ja** | Zie hieronder — dit is de enige echt robuuste integratieroute. |

### 6.2 De API als integratieroute

De API is duidelijk het sterkste interoperabiliteitspunt:

- **Authenticatie:** bearer-token via `Authorization: Bearer API_TOKEN`; tokens beheerd op `app.teamgantt.com/admin/developers/tokens`
- **Endpoints:** projecten (aanmaken, lijst, bijwerken, archiveren, instellingen), taken (volledige CRUD, bulk updates, **dependencies**, checklists, documenten), groepen (hiërarchie, dupliceren, historie), resources (bedrijfs- en projectniveau, workload), RACI, boards/Kanban, comments, webhooks, bedrijfsinstellingen inclusief **holidays**, tijdregistratie
- **Ook via de API:** baselines en workloads (bevestigd in supportartikel 132)
- **Rate limits:** niet gedocumenteerd — **een risico voor bulkmigratie**, moet vooraf worden nagevraagd
- **Plangebonden beschikbaarheid:** niet gedocumenteerd; onduidelijk of de API op alle betaalde plannen zit
- **Lag/lead via de API:** het dependency-endpoint bestaat, maar of lag/lead als parameter meegegeven kan worden is **niet gedocumenteerd** — **[SCHATTING]** waarschijnlijk wel, gezien de UI-ondersteuning, maar te verifiëren
- **Zapier:** volledige connector inclusief webhooks-integratie

### 6.3 Procore-koppeling (bouw)

- Sync van TeamGantt naar het Procore Schedule-tabblad, met mapping van TeamGantt-gebruikers op Procore-resources
- **Eenrichtingsverkeer:** "Whenever you make changes to your schedule in TeamGantt, you'll need to re-sync your project to Procore" — en dat hersyncen is **handmatig**
- Alternatief pad: `.mpp` exporteren en handmatig in Procore uploaden

Dit is een uploadmechanisme, geen tweerichtings-integratie. Wijzigingen in Procore komen niet terug in TeamGantt.

### 6.4 Betekenis voor een IFC-gebaseerde open-source planner

**Harde conclusie: TeamGantt is geen interoperabiliteitspartner op modelniveau.** Er is geen IFC, geen BIM-koppeling, geen 4D-viewer, geen link met Navisworks, Synchro of vergelijkbare 4D-omgevingen. De volledige bouwpositionering rust op *procesintegratie* (Procore) en niet op *modelintegratie*.

Praktische consequenties voor een uitwisselingsscenario:

- **IFC → TeamGantt** is technisch mogelijk via `IfcTask` → CSV (met WBS-nummer en predecessors) of via de REST API. Verlies bij die route: **resource-toewijzingen, kalenders, constraints, float, kosten** — en bij CSV bovendien de afhankelijkheids*types* en *lags*, omdat het importformaat alleen een `predecessors`-veld kent zonder typering.
- **TeamGantt → IFC** is een lossy exercitie: de CSV-export bevat geen dependency-typering, geen float, geen resourcemodel dat op `IfcResource` te mappen valt, en geen kalenders die op `IfcWorkCalendar`/`IfcWorkTime` passen. Via de API is meer op te halen (dependencies, resources, workloads, baselines, holidays), maar er blijft geen float- of constraintinformatie te halen omdat die simpelweg niet bestaat.
- **Round-trip is niet haalbaar** zonder verlies. Wie beide tools wil gebruiken, moet TeamGantt behandelen als een *presentatie- en samenwerkingslaag* en de IFC-planner als de *bron van waarheid*.

**Strategische lezing.** TeamGantt is het levende bewijs dat er een grote markt is voor "leesbare, deelbare planning" — 20.000+ bedrijven op een tool zonder float, zonder leveling en zonder constraints. Tegelijk laat het precies de twee gaten open die een IFC-native open-source planner kan bezetten: (a) échte netwerkanalyse met float en constraints, en (b) koppeling aan het bouwwerkinformatiemodel. Een open-source planner hoeft TeamGantt niet te verslaan op bruikbaarheid — hij moet TeamGantt verslaan op *rekenkracht en modelverbinding*, en de bruikbaarheidslat halen die TeamGantt heeft gelegd.

---

## 7. Marktpositie

### Waar TeamGantt sterk staat, en waarom

**Segment:** het mkb en het middensegment van organisaties die *wel* een tijdlijn nodig hebben maar *geen* planner in dienst hebben. De tool wint waar de keuze feitelijk gaat tussen "TeamGantt" en "een Excel-balkenschema" — niet waar de keuze gaat tussen TeamGantt en P6.

**Verklaring van de sterkte:**
1. Het gat tussen worktools (Asana/Monday: geen echte afhankelijkheden) en CPM-tools (MSP/P6: te complex, te duur, te steil) is groot, en TeamGantt vult het met een tool die SS/FF/SF/lag én kritiek pad heeft zonder opleiding te vereisen.
2. Het per-project-model met gratis externe gebruikers past uitzonderlijk goed bij bouw- en bureaucontexten waar veel partijen moeten *kijken* en weinig moeten *plannen*.
3. Vijftien jaar bootstrapped opereren heeft een loyale basis opgeleverd (geclaimde 96% retentie) en een supportreputatie (4,7/5) die in dit segment zwaar telt.

### Belangrijkste concurrenten

| Categorie | Concurrenten | Positionering t.o.v. TeamGantt |
|---|---|---|
| Directe Gantt-SaaS | GanttPRO, Instagantt, ProjectManager.com, Toggl Plan | Vergelijkbare positionering; GanttPRO en ProjectManager.com bieden vaak meer resource-/kostenfuncties |
| Brede worktools met tijdlijn | Smartsheet, Wrike, monday.com, Asana, ClickUp, Notion | Meer breedte en automatisering, minder planningsdiepte; Smartsheet en Wrike zijn de gevaarlijkste in enterprise-deals |
| Bouwplatformen | Procore (Schedule), Buildertrend, CoConstruct, Autodesk Build | Procore is deels **partner** (integratie) en deels **bedreiging** (eigen Schedule-module) |
| Klassieke CPM | Microsoft Project, Oracle Primavera P6, Asta Powerproject, Deltek Acumen | Andere markt; TeamGantt concurreert hier alleen aan de onderkant en positioneert zichzelf expliciet als het toegankelijke alternatief |
| 4D/BIM-planning | Synchro (Bentley), Bexel Manager, Navisworks TimeLiner | **Geen overlap** — TeamGantt speelt hier niet |

### Trend

De richting is duidelijk **verticalisatie plus ARPU-verhoging**:
- Introductie van de bouwspecifieke **Builder Edition** met eigen functionaliteit en een prijspunt van $199/maand ("Builder Edition: $199/mo for 10 projects and unlimited users") — een veelvoud van het generieke plan
- Omschakeling van seat-based naar **per-project pricing**, wat de omzet loskoppelt van teamgrootte en koppelt aan projectvolume
- Bouwspecifieke content-marketing rond vergelijkingsartikelen waarin P6 en MS Project voorkomen — **[GECORRIGEERD]** niet, zoals eerder gesteld, een frontale positionering *tegen* P6; het eigen artikel wijst P6 juist toe aan contractueel verplichte CPM-projecten

**[SCHATTING/INTERPRETATIE]** Dit is een logische, waarschijnlijk noodzakelijke zet: het generieke Gantt-SaaS-segment is gecommoditiseerd doordat Asana, Monday en ClickUp gratis tijdlijnweergaven meeleveren. Verticaal gaan is de enige manier om prijs te verdedigen. Het risico is dat TeamGantt daarmee in een markt stapt (bouwplanning) waar de functionele lat — leveling, float, kalenders, taakvolume — precies ligt op de punten waar het product het zwakst is.

### Gebruikersaantallen en omzet

- **Gebruikers:** eigen claims van 1 miljoen (about-pagina) tot 2 miljoen (homepage), 120 landen, 20.000+ bedrijven. Ongeauditeerd en intern tegenstrijdig.
- **Omzet:** niet gepubliceerd. **[SCHATTING — geen bron, puur afgeleid]** Bij 11–50 medewerkers, volledig remote, bootstrapped en zonder salesorganisatie ligt de ARR vermoedelijk in de orde van **$5–15 miljoen**. Behandel dit als een orde-van-grootte-indicatie, niet als een cijfer.
- **Reviewvolume als proxy:** 203 reviews op GetApp/SoftwareAdvice is bescheiden voor een tool met 15 jaar historie — passend bij een gezond nichespeler-profiel, niet bij een marktleider.

---

## 8. Eindoordeel

### Voor wie wel

- **Bureaus, marketing- en interne bedrijfsteams** die een gedeelde tijdlijn nodig hebben met échte afhankelijkheden en zonder opleidingstraject. Hier is TeamGantt waarschijnlijk de beste prijs-kwaliteitverhouding in de markt.
- **Kleine tot middelgrote aannemers en residentiële bouwers** met projecten tot enkele honderden activiteiten, die vooral moeten *communiceren* met onderaannemers en opdrachtgevers. De Builder Edition met lookahead-planning, gratis externe kijkers en Procore-sync is voor die praktijk goed doordacht.
- **Organisaties met veel gebruikers en weinig gelijktijdige projecten**, waar het per-project-model dramatisch goedkoper uitpakt dan seat-based licenties.
- **Teams die een leesbare tijdlijn willen náást een echte planningstool**, als presentatielaag.

### Voor wie niet

- **Iedereen die schema's contractueel moet verantwoorden.** Zonder float, zonder constraints en zonder zichtbare late dates is vertragingsanalyse, EOT-onderbouwing of forensische planningsbeoordeling onmogelijk. Dit is geen kwestie van gemak maar van geschiktheid.
- **Projecten boven ongeveer 1.000 activiteiten.** De plan-limieten (150/500 taken) én de gedocumenteerde prestatieklachten bij circa 1.200 taken maken dit een harde grens. Infra, utiliteit, industrie en grote renovaties vallen af.
- **Organisaties die resourcecapaciteit echt moeten sturen.** Geen leveling, geen bezettingspercentage, geen resource-kalenders, geen tarieven — alleen een rode kleur boven 8 uur per dag.
- **Internationale teams en ploegendienstorganisaties**, wegens bedrijfsbrede feestdagen zonder datumbereiken en zonder persoonlijke agenda's.
- **BIM-/4D-georiënteerde organisaties.** Geen IFC, geen modelkoppeling, geen 4D. Nul.
- **Organisaties met dataresidentie- of on-premise-eisen.**

### Is dit een serieus alternatief voor klassieke CPM-tools?

**Nee — en het probeert dat ook niet echt te zijn, ondanks de marketing.**

De eerlijke plaatsbepaling: TeamGantt is een **substituut voor het Excel-balkenschema**, niet voor Primavera P6 of Microsoft Project. Het is duidelijk beter dan de generieke worktools — de volledige ondersteuning van SS/FF/SF met lag is echt en verdient erkenning, en het kritieke pad en de baselines zijn geen schijnfuncties. Maar de drie pijlers die een CPM-tool tot een CPM-tool maken — **float-berekening, constraints en resource-leveling** — ontbreken alle drie, en twee daarvan staan al ruim vier jaar als "under review" op de publieke feature-board zonder oplevering.

De positionering tegen P6 op de bouwpagina is daarmee **marketing die de functionele werkelijkheid vooruitloopt**. Wie op basis van die pagina TeamGantt inzet voor een schema dat een opdrachtgever of jurist moet overtuigen, komt bedrogen uit.

**Voor de opdrachtgever van dit onderzoek (open-source, IFC-gebaseerde planner):**

TeamGantt is geen concurrent, maar wel een **belangrijk ijkpunt in twee richtingen**:

1. **Als bruikbaarheidslat.** Met 4,5/5 op ease-of-use en 4,7/5 op support laat TeamGantt zien welk niveau van toegankelijkheid nodig is om planning uit de handen van specialisten te krijgen. Een open-source CPM-tool die technisch superieur is maar deze lat niet haalt, wint geen gebruikers. De multi-view-aanpak (Gantt/board/kalender/lijst over dezelfde data) is een expliciet navolgbaar patroon.

2. **Als kaart van het onbezette terrein.** TeamGantt bewijst dat er een grote markt is voor leesbare planning, en laat tegelijkertijd precies de twee gaten open die een IFC-native planner kan vullen: échte netwerkanalyse (float, constraints, leveling, volume boven 1.000 taken) en verbinding met het bouwwerkinformatiemodel. Dat is een ongewoon scherp gedefinieerde positioneringskans.

3. **Als integratiedoel van beperkte waarde.** Uitwisseling is alleen zinvol via de REST API en is onvermijdelijk lossy. Een CSV-brug is triviaal te bouwen maar verliest dependency-types en lags. Prioriteit: **laag** — TeamGantt-gebruikers zijn geen IFC-gebruikers en omgekeerd.

**Samenvattend cijfer [EIGEN BEOORDELING]:**

| Dimensie | Score (1–10) |
|---|---|
| Gebruiksgemak | 9 |
| CPM-/netwerkdiepte | 4 |
| Resourcemanagement | 3 |
| Kostenmanagement | 3 |
| Schaalbaarheid | 3 |
| Interoperabiliteit (algemeen) | 5 |
| Interoperabiliteit (IFC/BIM) | 0 |
| Prijs-kwaliteit voor doelgroep | 8 |
| Leveranciersstabiliteit | 8 |

---

## Bronnenlijst

Alle bronnen geraadpleegd op **25 juli 2026**, tenzij anders vermeld.

### Leverancier — primair
1. https://www.teamgantt.com/ — productoverzicht, gebruikersclaims (2M gebruikers, 20.000+ bedrijven, 96% retentie), formaatvermeldingen
2. https://www.teamgantt.com/pricing — **alle prijzen in §3**: planstructuur, per-project-tarieven, taaklimieten, add-ons, billing-FAQ
3. https://www.teamgantt.com/about-us — historie, oprichters, bootstrapping, 1M gebruikers/120 landen, remote werken
4. https://www.teamgantt.com/construction-scheduling-software — Builder Edition, Procore-sync, $199/maand, positionering tegen Primavera P6

### Leverancier — supportdocumentatie
5. https://support.teamgantt.com/ — overzicht documentatiecategorieën
6. https://support.teamgantt.com/article/8-dependencies/ — FS/SS/FF/SF, lag/lead
7. https://support.teamgantt.com/article/165-critical-path/ — kritiek pad (highlight/filter), geen float
8. https://support.teamgantt.com/article/48-baselines/ — baselinesets, baselinekolom, planbeschikbaarheid
9. https://support.teamgantt.com/article/98-my-preferences-dependencies/ — "remove float when dragging"
10. https://support.teamgantt.com/article/143-gantt-view/ — subgroepen, mijlpalen, weergavemogelijkheden
11. https://support.teamgantt.com/article/147-frequently-asked-questions/ — import/export, werkweek, feestdagen, cost-loaded scheduling, PDF-limiet free
12. https://support.teamgantt.com/article/106-projects/ — free plan "1 project, 60 tasks" (afwijkend van pricing-pagina)
13. https://support.teamgantt.com/article/161-import-from-microsoft-project/ — `.mpp`-import; resources expliciet niet ondersteund
14. https://support.teamgantt.com/article/20-importing-a-csv/ — CSV-velden, WBS-methode, alleen nieuwe projecten
15. https://support.teamgantt.com/article/68-how-can-i-save-my-data/ — PDF-/CSV-export, back-upbeleid
16. https://support.teamgantt.com/article/162-exporting-importing-to-procore/ — eenrichtings-Procore-sync, MPP-alternatief
17. https://support.teamgantt.com/article/138-workloads/ — Workloads-rapport, planbeschikbaarheid
18. https://support.teamgantt.com/article/79-hourly-estimation/ — urenraming, 8-uursdrempel, Business/Builder
19. https://support.teamgantt.com/article/72-customizing-days-in-your-projects/ — werkdagen per project
20. https://support.teamgantt.com/article/35-adding-company-holidays/ — bedrijfsbrede feestdagen, geen datumbereiken, vakantie-workaround
21. https://support.teamgantt.com/article/166-lookaheads/ — lookahead 2–6 weken, Builder Edition
22. https://teamgantt.helpscoutdocs.com/article/167-cost-loaded-scheduling — begroot vs. werkelijk, "costs can only be shown per month"
23. https://teamgantt.helpscoutdocs.com/article/132-teamgantt-api — publieke API, CRUD-omvang inclusief baselines en workloads
24. https://api-docs.teamgantt.com/ — endpoints, bearer-token-authenticatie, webhooks

### Leverancier — publieke feature-request-board (Canny)
25. https://teamgantt.canny.io/feature-requests — topverzoeken en stemtallen
26. https://teamgantt.canny.io/feature-requests/p/allow-resource-specific-holidaysvacations — 197 stemmen, "Under review" sinds 17-03-2022
27. https://teamgantt.canny.io/feature-requests/p/improve-performance-for-large-projects — prestatieklachten, 1.200+ taken, klachten t/m 2026
28. https://teamgantt.canny.io/feature-requests?search=resource — Resource Leveling (48), Allocation % (74), Resource Costs (120)
29. https://teamgantt.canny.io/feature-requests?search=float — "Float time", 2 stemmen
30. https://teamgantt.canny.io/feature-requests?search=critical%20path — kritiek pad (193, Complete)
31. https://teamgantt.canny.io/feature-requests?search=MS%20Project — Import/Export met MS Project (67, Complete), lag (16, Complete)
32. https://teamgantt.canny.io/feature-requests?search=export — exportwensen incl. Excel
33. https://teamgantt.canny.io/feature-requests?search=baseline — baselinewensen
34. https://teamgantt.canny.io/feature-requests/p/support-for-multiple-levels-of-subtasks — één niveau subtaken

### Onafhankelijke reviews en analyses
35. https://www.getapp.com/project-management-planning-software/a/teamgantt/reviews/ — 4,6/5, 203 reviews, pro's en con's
36. https://www.softwareadvice.com/project-management/teamgantt-profile/reviews/ — 4,6/5 (203 reviews); deelscores support 4,7 / ease-of-use 4,5 / value 4,4 / **functionality 4,2**; klachten over prijs en grote projecten
37. https://apitracker.io/a/teamgantt — API-metadata
38. Bedrijfsprofielen via zoekresultaten: Crunchbase, Tracxn ("unfunded"), LeadIQ (11–50 medewerkers), SignalHire (25–100), The Company Check

### Niet toegankelijk tijdens dit onderzoek (HTTP 403/404)
- G2 (g2.com/products/teamgantt/reviews) — 403; de door de leverancier geclaimde 4,8/5 kon niet onafhankelijk worden geverifieerd
- Capterra (capterra.com/p/135790/TeamGantt) — 404
- TrustRadius, Trustpilot, Forbes Advisor, The Digital Project Manager, research.com — 403
- Reddit (r/projectmanagement) — geblokkeerd voor geautomatiseerde toegang; alleen threadtitels via zoekresultaten verkregen, geen inhoudelijke citaten

### Gebruikte zoekmachine
- https://html.duckduckgo.com/html/ — als vervanging voor de uitgeputte WebSearch-quota

---

## Verificatie

**Adversariële fact-check uitgevoerd op 25 juli 2026.** Methode: elke bewering hieronder is actief geprobeerd te *weerleggen* door de primaire bron live op te halen (WebFetch) en de exacte formulering te vergelijken. Waar de bron de bewering niet dekt, is de tekst hierboven aangepast en staat hieronder "gecorrigeerd". Beperking van deze ronde: **WebSearch-quota van de sessie uitgeput** (200/200), en **web.archive.org is niet bereikbaar vanuit deze omgeving** — historische prijspagina's konden daarom niet worden geverifieerd. G2, Capterra en TrustRadius blijven ontoegankelijk.

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 1 | Licentiemodel is **per project** (Free/Basic/Business/Builder/Enterprise), niet per seat; geen minimum aantal zetels | **bevestigd** | https://www.teamgantt.com/pricing |
| 2 | Het model was voorheen **per-manager-seat** (Lite/Pro/Unlimited) en de omzetting is recent | **bevestigd (deels onzeker)** — het oude per-manager-model is onafhankelijk bevestigd ("The Pro plan costs $49 per month per manager"), maar de **datum** van de omzetting is niet vast te stellen: archive.org onbereikbaar | https://www.itqlick.com/teamgantt/pricing; https://pricingnow.com/question/teamgantt-pricing/ ; https://support.teamgantt.com/article/106-projects |
| 3 | Basic: $12 per project/maand, $10 jaarlijks; 2–5 projecten; 1 manager; 10 collaborators; 150 taken/project | **bevestigd** (letterlijk zo op de pagina) | https://www.teamgantt.com/pricing |
| 4 | Business: $24 per project/maand, $19 jaarlijks; 5–20 projecten; onbeperkt managers én collaborators; 500 taken/project | **bevestigd** | https://www.teamgantt.com/pricing |
| 5 | Extra projecten: Basic +$12/maand, Business +$24/maand | **bevestigd + aangevuld** — jaarlijks is dat +$120/project/jaar (Basic) en +$228/project/jaar (Business); de pagina toont bovendien "Starts at $120/mo" voor Business, wat het staffelminimum van 5 projecten bevestigt | https://www.teamgantt.com/pricing |
| 6 | Builder Edition: $99/maand introductie (3 maanden), daarna $199/maand; jaarlijks $1.908; 10 projecten; onbeperkt taken/gebruikers | **bevestigd** — de constructiepagina bevestigt onafhankelijk "Builder Edition: $199/mo for 10 projects and unlimited users" | https://www.teamgantt.com/pricing ; https://www.teamgantt.com/construction-scheduling-software |
| 7 | Add-ons uitsluitend op Basic: Project Health Report +$12/mnd, Cost Loaded Scheduling +$24/mnd, Custom Boards +$24/mnd | **bevestigd** | https://www.teamgantt.com/pricing |
| 8 | Free-plan-tegenstrijdigheid: 40 taken (pricing) vs. 60 taken (support-artikel 106); 1 project; max 3 PDF-exports | **bevestigd** — pricing: "Get started with 1 project and 40 tasks"; artikel 106: "The Free plan is limited to 1 project with 60 tasks"; FAQ: "the Free plan only supports a max of 3 PDF exports" | https://www.teamgantt.com/pricing ; https://support.teamgantt.com/article/106-projects ; https://support.teamgantt.com/article/147-frequently-asked-questions |
| 9 | Jaarkorting inconsistent gecommuniceerd: "20%" vs. "over 15%" | **bevestigd** — beide staan op dezelfde pagina | https://www.teamgantt.com/pricing |
| 10 | Geen langlopend contract; betaling per cheque alleen bij 50+ gebruikers of Enterprise | **bevestigd** ("No. You can choose the plan that's best for you"; "if you are subscribing for 50 users or more, we can work out arrangements for paying by check") | https://www.teamgantt.com/pricing |
| 11 | Onderwijs: gratis plannen via .edu; geen non-profitkorting | **bevestigd, met nuancering** — het aanbod geldt expliciet voor **docenten** die projectmanagement onderwijzen, niet voor studenten of instellingen breed. Geen non-profitkorting aangetroffen | https://www.teamgantt.com/pricing |
| 12 | **Kritiek pad zit niet op Basic** — minimaal Business vereist | **bevestigd** | https://www.teamgantt.com/pricing |
| 13 | Rekenvoorbeelden: 5 projecten Business jaarlijks = $1.140; 20 projecten = $4.560; Builder jaarlijks = $1.908 | **bevestigd** — herrekend en consistent met zowel het per-project-jaartarief ($19 × 12) als met de expliciete extra-projecttarieven (5 × $19 × 12 + 15 × $228 = $4.560) | eigen berekening op https://www.teamgantt.com/pricing |
| 14 | FS, SS, FF **én** SF met lag/lead ("positive values are used for lag, and negative values are used for lead") | **bevestigd** — alle vier letterlijk gedocumenteerd | https://support.teamgantt.com/article/8-dependencies |
| 15 | Geen float-/slackwaarden; kritiek pad alleen als kleur (highlight- en filtermodus), geen late dates, geen constraints | **bevestigd** — het critical-path-artikel noemt uitsluitend visuele weergave; geen float, slack, late start/finish of numerieke uitkomst. De enige "float"-vermelding in de docs is de preference "Remove float when dragging predecessor tasks". Canny-request "Float time": 2 stemmen | https://support.teamgantt.com/article/165-critical-path ; https://support.teamgantt.com/article/8-dependencies ; https://teamgantt.canny.io/feature-requests?search=float |
| 16 | Geen resource leveling (48 st., Under review), geen allocatie-% (74 st.), geen resource-kalender (2 st.), resource costs "In progress" (120 st.) | **bevestigd** — alle vier stemtallen en statussen exact zoals vermeld | https://teamgantt.canny.io/feature-requests?search=resource |
| 17 | Resource-specifieke feestdagen: 197 stemmen, "Under review" **sinds 17 maart 2022** (ruim vier jaar) | **gecorrigeerd** — 197 stemmen en "Under review" kloppen, maar de post is **aangemaakt op 9 februari 2013**, dus ruim **dertien** jaar oud. Het is bovendien de **hoogst gestemde** post van de board | https://teamgantt.canny.io/feature-requests/p/allow-resource-specific-holidaysvacations |
| 18 | Prestatieklachten "Improve Performance for Large Projects" met klachten **tot in 2026** | **gecorrigeerd** — post aangemaakt 15-03-2022, 15 stemmen, geen statuslabel; **meest recente reactie 9 september 2024**. De citaten zelf (77 groepen/1.200 taken, "half an hour", "almost unworkable", 2.000 taken/4.000 links) zijn woordelijk bevestigd | https://teamgantt.canny.io/feature-requests/p/improve-performance-for-large-projects |
| 19 | "Update the chart in real time" is de **hoogst gestemde** wens (35 st., planned) | **gecorrigeerd** — 35 stemmen en status "Planned" kloppen, maar het is de bovenste post in de *standaardsortering*, niet de hoogst gestemde; die is nr. 17 met 197 stemmen | https://teamgantt.canny.io/feature-requests |
| 20 | Gebruikersaantallen intern tegenstrijdig: 2 mln (homepage) vs. 1 mln (about) | **bevestigd** — homepage: "More than 2,000,000 users choose TeamGantt", "Trusted by 20,000+ companies", "96% customer retention"; about-pagina: "millions of people across 120 countries" in de tekst én "Over 1 million users around the world" in de footer. De tegenstrijdigheid staat dus zelfs *binnen* de about-pagina | https://www.teamgantt.com/ ; https://www.teamgantt.com/about-us |
| 21 | Reviewscores: 4,6/5 op 203 reviews; support 4,7 / ease-of-use 4,5 / value 4,4 / functionality 4,2 | **bevestigd** — alle vijf cijfers exact | https://www.getapp.com/project-management-planning-software/a/teamgantt/reviews/ |
| 22 | G2 4,8 kon niet onafhankelijk worden geverifieerd | **bevestigd (blijft onzeker)** — G2 blokkeert nog steeds; de homepage claimt zelf G2 4,8, Capterra 4,6 en GetApp 4,6. Alleen die laatste is onafhankelijk bevestigd | https://www.teamgantt.com/ |
| 23 | Bedrijfshistorie: opgericht 2009 door John Correlli en Nathan Gilmore, Baltimore, bootstrapped ("never taken a dime of venture capital"), 4-daagse werkweek van 32 uur | **bevestigd** — de maand ("mei 2009") staat niet op de pagina; die blijft **onzeker** | https://www.teamgantt.com/about-us |
| 24 | Geen IFC, geen BIM, geen 4D — nergens vermeld | **bevestigd** — geen enkele vermelding op de bouwpagina, de homepage of in de documentatie | https://www.teamgantt.com/construction-scheduling-software |
| 25 | De constructiepagina positioneert "expliciet tegen Primavera P6" en noemt "free external users" | **gecorrigeerd** — de pagina is een **vergelijkend overzicht van tien tools** dat P6 juist *toewijst* aan projecten "where contracts require detailed CPM scheduling and formal project controls"; de frase "unlimited free external users" hoort bij **JobTread**, niet bij TeamGantt. De onderliggende bewering over gratis externe gebruikers blijft geldig via de pricing-pagina ("Collaborators: Unlimited. Included in your plan") | https://www.teamgantt.com/construction-scheduling-software ; https://www.teamgantt.com/pricing |
| 26 | Homepage noemt Primavera P6 als import-/exportformaat, maar er is geen supportartikel | **bevestigd, blijft onzeker** — de homepage claimt letterlijk import vanuit "Primavera P6" (P6 files); geen documentatie, geen formaatspecificatie | https://www.teamgantt.com/ |
| 27 | Supportdocumentatie loopt achter met oude plannamen ("Pro and Unlimited") | **bevestigd en verscherpt** — artikel 106 hanteert in één artikel zeven plannamen door elkaar: Free, Standard, Advanced, Pro, Business, Builder, Unlimited, Enterprise | https://support.teamgantt.com/article/106-projects |

**Niet verifieerbaar gebleven (blijven als [SCHATTING] gemarkeerd):** ARR $5–15 mln, personeelsomvang 11–50 vs. 25–100, realistisch werkbaar taakbereik 300–1.200, hosting-/dataresidentielocatie, API-rate-limits, plangebonden API-beschikbaarheid, en of lag/lead via het API-dependency-endpoint meegegeven kan worden.

**Netto-effect op de conclusies:** geen enkele prijs- of licentiebewering bleek onjuist — §3 staat volledig overeind, inclusief de rekenvoorbeelden. De correcties raken drie datums/attributies (§2.2, §5.4, §5.12) en één positioneringsclaim (§1/§7). De correctie op de feestdagen-request (2013 in plaats van 2022) maakt het nadeel **zwaarder**, niet lichter; de correctie op de prestatiepost (laatste klacht 2024 in plaats van 2026) maakt het iets **lichter**. De kernconclusie — dependency-aware scheduling zonder float, constraints of leveling, en zonder enige IFC-/BIM-koppeling — is op alle onderdelen bevestigd.
