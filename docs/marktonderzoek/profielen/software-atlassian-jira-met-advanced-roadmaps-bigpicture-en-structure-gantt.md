# Atlassian Jira + Advanced Roadmaps / Plans, BigPicture, Structure.Gantt & WBS Gantt-Chart

**Profiel voor marktonderzoek planningssoftware**
Onderzoeksdatum: **25 juli 2026**. Alle prijzen zijn opgehaald op deze datum, tenzij anders vermeld.
Categorie: *werkbeheer-platform (agile/ITSM) met Gantt- en portfoliolagen via marketplace-apps* — nadrukkelijk **geen** klassieke CPM-planningssuite.

> **Leeswijzer over schattingen.** Alles wat niet direct uit een leveranciersbron, officiële documentatie of een publieke API komt, is gemarkeerd met **[SCHATTING]**. Bedragen uit de Atlassian Marketplace-API en de commerce-payload van atlassian.com zijn *lijstprijzen* (USD, commercieel, exclusief btw en exclusief partner-/volumekortingen).

---

## 1. Wat het is

### 1.1 Het platform

**Jira** (oorspronkelijk "JIRA", 2002) is het issue-tracking- en werkbeheerproduct van **Atlassian Corporation** — opgericht in 2002 door Mike Cannon-Brookes en Scott Farquhar, hoofdkantoor Sydney (AU) met een tweede hoofdvestiging in San Francisco, beursgenoteerd (NASDAQ: TEAM). Atlassian meldt zelf "300.000+ klanten" en "12.000+ Atlassians" ([atlassian.com/company](https://www.atlassian.com/company), 25-07-2026). Jira zelf is dus geen planningsprogramma: het is een taak-/ticketdatabase met workflows, waar planning als *laag* bovenop wordt gelegd.

Jira is oorspronkelijk een bugtracker, daarna de de-facto standaard voor agile softwareontwikkeling (scrum/kanban), en tegenwoordig gepositioneerd als breed "werkbeheer"-platform. Sinds 2024 zijn Jira Software en Jira Work Management samengevoegd tot één product "Jira".

### 1.2 De vier planningslagen die in dit profiel worden beoordeeld

| Laag | Leverancier | Wat het is | Installs (Marketplace) |
|---|---|---|---|
| **Plans (Advanced Roadmaps)** | Atlassian | Ingebouwd in Jira **Premium/Enterprise**; voorheen "Portfolio for Jira" (2014), in 2020 hernoemd naar Advanced Roadmaps, sinds ±2024 in de UI simpelweg "Plans" | n.v.t. (in product) |
| **BigPicture PPM & Strategic Portfolio Management** | **Appfire** (oorspronkelijk SoftwarePlant, Polen; overgenomen door Appfire) | Volwaardige PPM-suite in Jira: Gantt-module, Scope/WBS, Resources, Risks, Board, Financials, OKR | **11.235** actieve installs |
| **Gantt Charts for Structure PPM** (bekend als **Structure.Gantt**) | **Tempo Software** (oorspronkelijk ALM Works; overgenomen door Tempo) | Gantt-uitbreiding *bovenop* de app **Structure**; los onbruikbaar | **6.540** (Structure zelf: **13.291**) |
| **WBS Gantt-Chart for Jira** | **Ricksoft, Inc.** (Tokio, Japan) | MS Project-achtige WBS + Gantt in Jira | **5.718** |

*(Installcijfers: Atlassian Marketplace REST API `/rest/2/addons/...`, opgehaald 25-07-2026.)*

Appfire adverteert BigPicture met "Trusted by 20.000+ teams" (Marketplace-samenvatting, 25-07-2026) — dat is een marketingclaim, geen geverifieerd installcijfer; het gemeten aantal actieve installs is 11.235.

### 1.3 Doelgroep, typische gebruikers, sectoren en regio's

- **Kerndoelgroep:** IT- en softwareorganisaties die Jira al hebben en er "ook nog planning" bij willen. De koopbeslissing is bijna nooit "welke planningstool kiezen we", maar "hoe krijgen we een Gantt in de tool die we al gebruiken".
- **Typische gebruikers:** delivery managers, release-/programmamanagers, RTE's in SAFe-omgevingen, PMO's van IT-afdelingen, agile coaches. In BigPicture-installaties ook echte projectmanagers en resource managers.
- **Sectoren:** software/SaaS, telecom, financiële dienstverlening, overheids-IT, automotive-software, medtech-software, engineering-R&D. **Bouw, infra en offshore zijn géén kernmarkt** — daar wordt Jira hooguit gebruikt voor de digitale/IT-werkstroom naast een echte planner (P6, MS Project, Asta).
- **Regio's:** wereldwijd; sterkst in Noord-Amerika, West-Europa, Australië, India. Ricksoft (WBS Gantt-Chart) is opvallend sterk in Japan, waar MS Project-achtige WBS-conventies diep verankerd zijn. BigPicture heeft een sterke Europese (met name DACH/Poolse) basis.
- **Bedrijfsgrootte:** van 10-persoons teams (gratis tiers) tot 20.000+ gebruikers (Jira-tierplafond Standard/Premium is 20.000 gebruikers, Enterprise 50.000 — af te leiden uit de `chargeElements.user.ceiling`-waarden in de commerce-payload van atlassian.com/software/jira/pricing, 25-07-2026).

---

## 2. Functionaliteit en techniek — streng beoordeeld

Dit is het belangrijkste deel van het profiel. De centrale vraag: **is hier sprake van echte netwerkplanning (CPM), of alleen van balken tekenen?** Het antwoord verschilt sterk per laag.

### 2.1 Jira zelf: geen planningsengine, punt

Jira kent geen duur, geen kalender, geen voorganger/opvolger-semantiek en geen planningsberekening. Een Jira-issue heeft hooguit een `duedate`, een `Start date`-customfield en `originalEstimate`/`timeSpent`. Issue links (`blocks`, `relates to`) zijn *ongetypeerde* relaties zonder tijdsbetekenis. Alles wat op planning lijkt komt uit Plans of uit een marketplace-app.

### 2.2 Advanced Roadmaps / Plans (Jira Premium) — **geen CPM-engine**

Dit is streng te beoordelen en het oordeel is hard negatief voor klassieke planning.

| Criterium | Bevinding | Bron |
|---|---|---|
| **Afhankelijkheidstypen** | **Alleen Finish-to-Start.** De documentatie is expliciet: welke Jira-linktypes je ook als "dependency" configureert, "they're all treated as though they're of the **Blocks** type meaning that the first work item must end before the second one can begin." **Geen SS, FF of SF.** | Atlassian support-docs, *What are dependencies in your plan?* |
| **Lag / lead** | **Niet ondersteund.** Nergens in de dependency-documentatie gedocumenteerd. | idem |
| **Kritiek pad** | **Bestaat niet.** Er is geen kritiek pad, geen totale/vrije speling, geen forward/backward pass. Het is een openstaand feature-verzoek sinds jaren: **JSWSERVER-24925 "Highlight blockers on the critical path", status "Gathering Interest", 139 stemmen**; JSWSERVER-24924 (63 stemmen) en JSWSERVER-24942 (13 stemmen) vragen hetzelfde. | jira.atlassian.com publieke tracker (REST-query, 25-07-2026) |
| **Auto-scheduler** | Een **greedy, rank-gebaseerde capaciteitsverdeler**, geen netwerkplanner. Atlassian beschrijft het zelf als "first-come, first-serve": begin bovenaan het plan, werk naar beneden op basis van work item rank, hoger geschatte items eerst, story-niveau vóór epic-niveau. Cyclische afhankelijkheden worden **genegeerd**. Items in een actieve sprint worden niet herpland, ook als de sprint overboekt is. | Atlassian, *How does the auto-scheduler in my plan work?* |
| **Constraints** | Geen SNET/FNLT/MSO-achtige constraints. Wel "target start/end dates" en release-datums als zachte invoer. | idem |
| **Kalenders / werktijden** | **Geen werkkalender-model.** Er is geen instelbare werkweek, geen feestdagenkalender per resource, geen ploegendienst. Planning gebeurt in *sprints/iteraties*, niet in werkdagen. | Atlassian, *Manage capacity in your plan* |
| **Resourcemodel** | **Team-niveau, niet persoonsniveau.** Capaciteit per iteratie in story points of uren. Geen individuele toewijzing, geen skills, geen kalender per persoon, **geen resource-levelling**. | idem |
| **Kostenmodel** | **Volledig afwezig.** Geen tarieven, geen budget, geen EVM, geen CapEx/OpEx. | idem |
| **Baselines** | **Geen baselines.** Wel "scenario's" (wat-als-varianten binnen een plan) en een sandbox: wijzigingen worden pas naar Jira geschreven na "Review changes". Dat is versiebeheer van een concept, geen vastgelegde nulmeting met variantie-analyse. | Atlassian, *What is Advanced Roadmaps* |
| **Mijlpalen** | **Niet ondersteund** als eigen objecttype — openstaand verzoek JSWSERVER-25115 "Milestones", 282 stemmen, "Gathering Interest". | jira.atlassian.com tracker |
| **Schaal** | Gedocumenteerd hard: **max. 10.000 work items per plan** ("At that point, you'll begin to see warnings that your plan performance will be affected"), **max. ±50 teams** (daarboven worden teams onzichtbaar in de Teams-tab), **max. 100 Jira-spaces per plan**. | Atlassian, *Limits on plan size* |

**Conclusie 2.2:** Advanced Roadmaps is een **capaciteits- en portfoliovisualisatie**, geen planningsengine. Het tekent balken op basis van sprints, schattingen en teamvelocity en trekt lijnen tussen blokkeerrelaties. Wie hier een netwerkplanning verwacht, koopt het verkeerde product. Voor een bouw- of infraplanning is dit **onbruikbaar**.

### 2.3 BigPicture (Appfire) — het serieuze midden: echte afhankelijkheidstypen, maar geen echte CPM

BigPicture is duidelijk de meest ambitieuze van de drie apps en de enige met een echt PPM-model.

**Wat er wél is (gedocumenteerd):**

- **Vier afhankelijkheidstypen.** De documentatie ("Strong dependencies") beschrijft expliciet **End to Start, End to End, Start to End, Start to Start** — functioneel FS/FF/SF/SS. Daarnaast "soft links" (puur informatief, geen planningsimpact) en "external links" (tussen Boxes).
- **Lag time** in dagen, positief én negatief (overlap). Let op: "The working and non-working days are both included in the Lag time calculation" — lag telt dus in **kalenderdagen**, niet werkdagen. Dat is een afwijking van MS Project/P6-conventie en een reële bron van fouten.
- **ASAP-modus** per afhankelijkheid: aan = de opvolger schuift mee zodat het gat minimaal blijft (dus echt "as soon as possible"); uit = de link werkt alleen als *ondergrens* ("kan niet eerder dan"). Standaard staat ASAP **uit**, wat betekent dat een plan zonder expliciete ASAP-instelling niet automatisch verdicht.
- **Vijf scheduling modes per taak:** Auto basic, Auto bottom-up (ouder = min(start kinderen)/max(eind kinderen)), Auto top-down (ouder duwt kinderen binnen zijn periode), Manual, Locked. Dit is vergelijkbaar met MS Project's manual/auto-scheduled model plus samenvattingstaken.
- **Prioriteitsvolgorde van planningsregels** (gedocumenteerd): scheduling mode → parent-child → kalender (niet-werkdagen) → afhankelijkheden.
- **Kritiek pad.** Aanwezig, met eigen Infobar-tab en rood gemarkeerde taken.
- **Resources-module:** capaciteit, workload, utilisatie, "Find the Perfect Match" (skill-based matching), meerdere effort-modi.
- **Financials-module** (alleen **Advanced**-editie): budget, actuals, forecast op basis van teamtarieven en effort, CapEx/OpEx-classificatie, kostenbaselines/variantie.
- **Risicomodule** met probability/impact-matrix en risicoscores.
- **Scope-module** als echte WBS: vrij indenteren, hiërarchie, geaggregeerde kolommen.
- **Baselines** (o.a. budget-baselines met variantie-inzicht).

**Waar het als CPM-engine tekortschiet — dit is de kern:**

1. **Het kritieke pad is een heuristische achterwaartse ketenmarkering, geen CPM-berekening.** De eigen documentatie: *"The path is calculated from the end (the last task(s) in the project). The algorithm works backward, looking for strong links connecting tasks. The most direct path (without a time gap between tasks) is highlighted. A gap between tasks is allowed only if an ASAP link has the lag time added."* Dat is: markeer de langste aaneengesloten keten zonder gaten. Het is **geen** forward pass/backward pass met ES/EF/LS/LF.
2. **Er is geen speling (float/slack).** In de hele BigPicture-documentatieruimte leveren zoekopdrachten op "total float" en "free float" **nul** resultaten (Confluence-zoek-API op space `SPM`, 25-07-2026). Zonder totale speling is er geen kritiek-padanalyse in de PMI/AACE-zin, alleen een gekleurde lijn.
3. **Niet-werkdagen tellen niet mee in de kritieke-padberekening.** Letterlijk gedocumenteerd: *"The non-working days do not affect the critical path calculation."* Voor een bouwplanning met weekenden, bouwvak en weerverlet is dat een fundamenteel probleem.
4. **Geen constraint-types.** Geen Start-No-Earlier-Than / Finish-No-Later-Than / Must-Start-On. "Locked" en "Manual" zijn grofkorrelige vervangers.
5. **Het kritieke pad breekt bij ontbrekende datums.** Gedocumenteerd: als één taak in de keten zijn start-/einddatum verliest, "the critical path may be disrupted".
6. **Geen resource-levelling met kritiek-padrespect.** De Resources-module toont over-allocatie en helpt matchen, maar er is geen levelling-algoritme dat speling gebruikt (zoals P6 of MS Project).
7. **Schaal:** er is een *instelbaar* takenplafond per Box ("Maximum number of tasks in a box"), met de waarschuwing dat "tens of thousands of tasks in a single box can reduce the app's performance". Er is geen harde bovengrens gedocumenteerd, maar praktisch ligt de comfortzone bij enkele duizenden taken per box. **[SCHATTING]** Realistisch werkbaar: 2.000–10.000 taken per box; daarboven merkbare vertraging.

### 2.4 Structure.Gantt (Tempo) — technisch het meest "planner-achtig", maar bewust ondiep

**Wat er wél is (gedocumenteerd):**

- **Vier afhankelijkheidstypen**, expliciet benoemd: Finish to Start, Start to Start, Finish to Finish, Start to Finish.
- **Lead/lag time** per afhankelijkheid, met een eigen documentatiepagina.
- **Drie planningsmethoden:** automatic scheduling (op basis van projectstartdatum, schattingen, voorgangers en afhankelijkheden), manual scheduling (op start- en/of einddatum), en **sprint-based scheduling** — die laatste is een agile-eigenaardigheid die klassieke planners niet kennen.
- **Werkkalenders** ("Calendars" in de Gantt-configuratie), fixed-duration taken, zero-duration taken, precisie-instelling (uren/dagen).
- **Resource leveling** met een eigen algoritme: leveling priority, respect voor links, vroeger geplande taken blijven vroeg, langere taken krijgen voorrang; het resultaat is een "Leveling Delay" per taak die handmatig aanpasbaar is.
- **Kritiek pad als veld:** in de lijst van Gantt-attributen staat expliciet **`Gantt Critical Path` — "Indicates if a task belongs to the critical path"**.
- **Baselines**, in twee smaken: Gantt-baselines (snapshots) en Jira-gebaseerde baselines (uit velden of formules).
- **Scheduling conflicts** met concrete resolutie-acties (Auto Schedule / Respect Link / Reduce Estimate / Increase Duration) en een bulk "Resolve now".
- **Sandbox Mode** (Data Center) voor wat-als-scenario's.
- **Mijlpalen** als eigen objecttype.

**Waar het tekortschiet:**

1. **Geen speling.** De volledige lijst Gantt-velden in Structure bevat wél `Gantt Critical Path`, maar **géén** total float, free float, early start/finish, late start/finish of constraint-veld. Je krijgt dus een kritiek-padvlag zonder de onderliggende netwerkanalyse. Je kunt niet zien *hoeveel* speling een niet-kritieke taak heeft — de kernvraag van elke planner.
2. **Resource leveling gebruikt geen speling.** De documentatie noemt prioriteit, links, starttijd en duur — kritiek pad en slack komen er niet in voor. Levelling die het kritieke pad niet respecteert, is per definitie suboptimaal.
3. **Levelling raakt Jira niet.** Expliciet gedocumenteerd: leveling "DOES NOT reschedule work items in Jira" — het effect blijft in de Gantt-laag hangen. Dat is een fundamentele scheiding tussen "wat de planner ziet" en "wat het team ziet".
4. **Levelling is traag en niet-concurrent:** "Only one leveling operation runs per structure at a time" en het kan "several seconds to dozens of minutes" duren.
5. **Geen kostenmodel.** Geen tarieven, geen budget, geen EVM. Structure.Gantt is puur tijd + resource-uren.
6. **Geen constraint-types.**
7. **Verplichte tandem-licentie.** Structure.Gantt werkt niet zonder de app **Structure**. Je betaalt dus altijd twee apps. Een reviewer op de Marketplace verwoordt het scherp: *"The add-in is fantastic, but its major limitation is that it cannot function independently; it requires the accompanying structure app. Consequently, you're essentially paying for two separate apps."*
8. **Geen REST API voor de Gantt-laag** — een Marketplace-reviewer vraagt er expliciet om als verbeterpunt.

### 2.5 WBS Gantt-Chart for Jira (Ricksoft) — de MS Project-imitatie

**Wat er is (leverancierssite, 25-07-2026):** vier afhankelijkheidstypen, auto-scheduling met herberekening van afhankelijke taken, **kritiek pad (rood gemarkeerd)**, **baselines** met afwijkingsmonitoring, voortgangslijn (progress line), mijlpalen, "Smart Workload Allocation" met over-allocatiewaarschuwingen, onbeperkte hiërarchie, en **één-klik import/export naar Excel en MS Project**. Ricksoft claimt ondersteuning voor **"up to 10.000 issues with fast load times"**.

**Waar het tekortschiet:** ook hier geen float-velden, geen constraint-types, geen kostenmodel, geen resource-levelling-algoritme. En de gebruikerservaring is het zwakste van de drie — zie §5.

### 2.6 Platform en schaalbaarheid — samenvattend oordeel

| Laag | Echte CPM? | FS/SS/FF/SF | Lag | Kritiek pad | Float | Kalenders | Resource-model | Kosten | Baselines | Realistisch max. taken |
|---|---|---|---|---|---|---|---|---|---|---|
| Jira (kaal) | nee | nee | nee | nee | nee | nee | nee | nee | nee | n.v.t. |
| Advanced Roadmaps | **nee** | alleen FS | nee | **nee** | nee | nee (sprint-based) | team-niveau | nee | nee (scenario's) | **10.000** (gedocumenteerd) |
| BigPicture | **half** | **ja (4)** | ja (kalenderdagen) | heuristisch | **nee** | ja | persoon + team, skills | **ja** (Advanced) | ja | ~2.000–10.000/box **[SCHATTING]** |
| Structure.Gantt | **half** | **ja (4)** | **ja** | ja (vlag) | **nee** | ja | ja + levelling | nee | ja | ~5.000–20.000 **[SCHATTING]**, afhankelijk van Structure-performance |
| WBS Gantt-Chart | **half** | ja (4) | **[SCHATTING]** waarschijnlijk ja | ja | nee | ja | workload | nee | ja | **10.000** (leverancierclaim) |

**Kernoordeel:** geen enkele laag levert een volledige CPM-engine met totale en vrije speling, constraint-types en een gedocumenteerde forward/backward pass. BigPicture en Structure.Gantt komen het dichtst in de buurt en zijn genoeg voor *IT-projectplanning*; ze zijn **niet** genoeg voor contractueel afdwingbare planning (EOT-claims, vertragingsanalyse, forensische planning) zoals in bouw en infra.

---

## 3. Prijzen

> Alle bedragen: **USD, commerciële lijstprijs, jaarlijkse facturering tenzij anders vermeld, exclusief btw**, opgehaald **25 juli 2026**.
> Bronnen: (a) de commerce-payload in `https://www.atlassian.com/software/jira/pricing`; (b) de publieke Atlassian Marketplace REST API `https://marketplace.atlassian.com/rest/2/addons/{key}/pricing/{cloud|datacenter}/live`.

### 3.1 Jira Cloud

Atlassian noemt op de prijspagina als headline (schema.org-blok, 25-07-2026): **Standard $7,91 per gebruiker/maand**, **Premium $14,54 per gebruiker/maand**. Dat zijn afgevlakte gemiddelden. De werkelijk gefactureerde bedragen zijn getrapt:

**Jaarlijkse facturering (vast bedrag per staffel):**

| Gebruikers | Standard | Premium | Enterprise |
|---|---|---|---|
| 1–10 | $900 | $1.850 | $2.800 |
| 11–15 | $1.350 | $2.750 | $4.500 |
| 16–25 | $2.250 | $4.600 | $7.000 |
| 26–50 | $4.550 | $9.150 | $13.500 |
| 51–100 | $9.050 | $18.300 | $27.500 |
| 101–200 | $16.500 | $32.000 | $48.000 |
| 201–300 | $23.500 | $43.500 | $65.500 |
| 301–400 | $30.000 | $53.000 | $80.000 |
| 401–500 | $36.500 | $62.500 | $94.000 |

**Maandelijkse facturering (prijs per gebruiker/maand):**

| Gebruikers | Standard | Premium |
|---|---|---|
| 1–100 | $9,05 | $18,30 |
| 101–250 | $7,65 | $13,70 |
| 251–1.000 | $6,40 | $9,55 |
| 1.001–2.500 | $5,80 | $9,25 |
| 2.501–5.000 | $5,40 | $8,90 |
| 5.001–7.500 | $5,10 | $8,20 |
| 7.501–10.000 | $4,80 | $7,85 |
| 10.001–15.000 | $4,15 | $7,20 |
| 15.001–20.000 | $3,80 | $6,90 |

*Enterprise wordt alleen jaarlijks gefactureerd.*

**Gratis tier:** Jira Free — tot **10 gebruikers**, 2 GB opslag, geen Plans/Advanced Roadmaps, geen SLA.
**Minimum:** geen minimum-zetelaantal in de cloud; de eerste staffel loopt vanaf 1 gebruiker.
**Plafonds:** Standard en Premium tot **20.000 gebruikers**; Enterprise tot **50.000**.
**Advanced Roadmaps/Plans zit uitsluitend in Premium en Enterprise** — dat is de eerste betaaldrempel voor planning.

**Jira Data Center (on-prem/self-hosted):** jaarlijks, alleen grote staffels. Atlassian publiceert de tabel niet in machineleesbare vorm; SoftwareAdvice noemt een startprijs van **$44.000/jaar** (25-07-2026). **[SCHATTING/derde partij]** — dit cijfer komt niet van Atlassian zelf en moet bij een offerte geverifieerd worden. Data Center is in de praktijk alleen relevant boven ±500 gebruikers.

### 3.2 BigPicture (Appfire)

**Cloud, jaarlijks** (Standard-plan; laatst gewijzigd 09-07-2026):

| Gebruikers | Prijs/jaar | Effectief per gebruiker/maand |
|---|---|---|
| tot 10 | **$0 (gratis)** | — |
| 15 | $859,50 | $4,78 |
| 25 | $1.432,50 | $4,78 |
| 50 | $2.865,00 | $4,78 |
| 100 | $5.730,00 | $4,78 |
| 200 | $10.530,00 | $4,39 |
| 500 | $16.880,00 | $2,81 |
| 1.000 | $24.780,00 | $2,07 |
| 2.000 | $36.180,00 | $1,51 |
| 5.000 | $57.880,00 | $0,96 |
| 10.000 | $75.380,00 | $0,63 |
| 50.000 | $167.380,00 | $0,28 |
| 100.000 | $242.380,00 | $0,20 |

**Cloud, maandelijks:** $5,73 per gebruiker/maand tot 100 gebruikers; $4,80 bij 250; $1,58 bij 1.000; $0,15 bij 50.000+.

**Data Center, jaarlijks** (laatst gewijzigd 15-07-2026): 50 gebruikers $3.100 · 100 $5.800 · 250 $12.100 · 500 $17.000 · 1.000 $27.600 · 2.000 $33.350 · **Unlimited $159.600**.

**Edities:** sinds **24 juli 2026** (dus letterlijk vorige week) bestaat BigPicture voor Jira Cloud in twee plannen: **Standard** (PPM: portfolio, tijdlijn, resources/capaciteit, dependencies, risico's) en **Advanced** (+ Financials, OKR, Priorities-module met ICE/RICE/WSJF/Eisenhower/Balanced Scorecard, geavanceerde rapportage). Bestaande klanten blijven automatisch op Standard. De oude **BigPicture Enterprise**-editie wordt gemigreerd naar Advanced. De hierboven getoonde prijzen zijn de gepubliceerde Marketplace-prijzen; **[SCHATTING]** de Advanced-editie wordt hoger geprijsd, maar Appfire had op 25-07-2026 nog geen aparte Advanced-prijstabel via de Marketplace-API gepubliceerd.

**Verborgen kosten:** MS Project-import en de export van het kritieke pad naar XLSX vereisen de **aparte app BigTemplate**. Cloud jaarlijks: gratis tot 10 gebruikers, $597,50 (25), $1.195 (50), $2.390 (100), $5.825 (500), $8.375 (1.000). Data Center: $775 (50), $1.150 (100), $3.350 (500), $6.100 (1.000).

### 3.3 Structure.Gantt (Tempo) — let op: altijd samen met Structure

**Structure.Gantt Cloud, jaarlijks** (laatst gewijzigd 05-06-2026): 10 gebruikers $100 · 25 $317,50 · 50 $635 · 100 $1.270 · 500 $3.860 · 1.000 $6.310 · 2.000 $9.710. Maandelijks $1,27/gebruiker tot 100.

**Structure.Gantt Data Center, jaarlijks** (19-02-2026): 50 $725 · 100 $1.323 · 250 $2.381 · 500 $3.749 · 1.000 $5.520 · 2.000 $9.360 · **Unlimited $46.776**.

**Structure (verplicht) Cloud, jaarlijks:** 10 $100 · 25 $880 · 50 $1.760 · 100 $3.520 · 500 $12.725 · 1.000 $24.025 · 2.000 $34.825. Maandelijks $3,52/gebruiker tot 100.

**Structure Data Center, jaarlijks:** 50 $1.895 · 100 $3.445 · 250 $6.959 · 500 $10.537 · 1.000 $20.036 · **Unlimited $138.319**.

**Gecombineerd (Structure + Structure.Gantt), Cloud, jaarlijks:** 50 gebruikers **$2.395** · 100 **$4.790** · 500 **$16.585** · 1.000 **$30.335**. Er is **geen gratis tier**: de laagste staffel (10 gebruikers) kost $100 + $100 = $200/jaar.

### 3.4 WBS Gantt-Chart for Jira (Ricksoft)

**Cloud, jaarlijks** (19-02-2026): **gratis tot 10 gebruikers** · 25 $330 · 50 $660 · 100 $1.320 · 500 $3.845 · 1.000 $6.195 · 2.000 $9.695. Maandelijks $1,32/gebruiker tot 100.

**Data Center, jaarlijks:** 50 $770 · 100 $1.430 · 250 $2.860 · 500 $4.070 · 1.000 $5.940 · 2.000 $6.843 · **Unlimited $33.855**.

### 3.5 De licentie-adder: apps moeten de volledige Jira-tier matchen

Dit is de duurste en meest onderschatte regel. Atlassian: *"The app will only function if its license matches or exceeds the tier of the host product – even if only some of your licensed users need to use the app."* En: *"If you have a 500-User Jira license, and a 20-Agent Jira Service Management license, your apps must be at the 500-User level."*

**Gevolg:** heb je 800 Jira-gebruikers maar slechts 6 planners, dan betaal je BigPicture voor 800 gebruikers. Voor een bouwbedrijf dat Jira voor de IT-afdeling gebruikt en er een planningstool op wil zetten voor drie planners, is dit prijsmodel ronduit vijandig.

### 3.6 Rekenvoorbeelden totale jaarkosten (lijstprijs, cloud, jaarlijks)

| Scenario | Jira Premium | Planningsapp | **Totaal/jaar** | Per gebruiker/maand |
|---|---|---|---|---|
| 10 gebruikers, BigPicture | $1.850 | $0 (gratis tier) | **$1.850** | $15,42 |
| 50 gebruikers, BigPicture Standard | $9.150 | $2.865 | **$12.015** | $20,03 |
| 50 gebruikers, Structure + Structure.Gantt | $9.150 | $2.395 | **$11.545** | $19,24 |
| 50 gebruikers, WBS Gantt-Chart (op Jira **Standard**) | $4.550 | $660 | **$5.210** | $8,68 |
| 500 gebruikers, BigPicture + BigTemplate | $62.500 | $16.880 + $5.825 | **$85.205** | $14,20 |
| 1.000 gebruikers, Structure + Gantt (DC, unlimited) | offerte | $138.319 + $46.776 | **$185.095 + Jira** | — |

Merk op dat WBS Gantt-Chart en BigPicture **niet** Jira Premium vereisen — ze werken op Jira Standard. Dat maakt ze bij kleine teams fors goedkoper dan Advanced Roadmaps, dat je naar Premium dwingt.

---

## 4. VOORDELEN

1. **Eén bron van waarheid met het uitvoerende werk.** De planning staat op dezelfde records als de daadwerkelijke tickets. Verandert de status van een issue, dan verandert de voortgang op de Gantt automatisch — geen wekelijkse handmatige update-ronde zoals bij een losstaande planner. Dit is het enige echt structurele voordeel van deze categorie en het is groot: de nummer-één faalmodus van P6/MS Project is dat de planning verouderd is.

2. **Nul adoptiedrempel bij organisaties die Jira al hebben.** Geen nieuwe tool, geen nieuwe logins, geen nieuwe SSO-integratie, geen nieuw beheerregime. Bij 300.000+ Atlassian-klanten wereldwijd is dat een enorme installed base waarin planning "gratis meelift" op bestaand IT-beleid.

3. **Uitstekende prijs-prestatie bij kleine teams.** Tot 10 gebruikers zijn zowel BigPicture als WBS Gantt-Chart **volledig gratis** (Cloud). Een 10-persoons team krijgt voor $1.850/jaar (Jira Premium) of zelfs $900/jaar (Jira Standard + gratis BigPicture) een portfoliotool met Gantt, resources en risicomatrix. Vergelijk dat met Primavera P6 of MS Project Plan 3 per gebruiker.

4. **BigPicture heeft een echt kostenmodel — zeldzaam in deze categorie.** De Financials-module (Advanced) doet budget, actuals, forecast op basis van teamtarieven en effort, kostenbaselines met variantie-inzicht, en CapEx/OpEx-classificatie. Dat gaat verder dan wat de meeste "Gantt-apps" bieden en verder dan wat MS Project standaard doet zonder Project Online.

5. **Structure.Gantt heeft volwaardige afhankelijkheidssemantiek plus resource leveling.** Vier linktypes, lead/lag, automatische én handmatige planning, werkkalenders, fixed-duration taken, mijlpalen, baselines, sandbox-modus en een levelling-algoritme met instelbare prioriteit. Voor een softwareorganisatie is dat meer planningsvermogen dan 95% van de teams gebruikt.

6. **Hybride agile/waterval in één beeld.** Structure.Gantt kan taken plannen op sprintbasis *of* op datumbasis, in dezelfde grafiek. BigPicture doet hetzelfde via de Board- en Gantt-modules naast elkaar. Voor organisaties die een watervalcontract naar buiten en scrum naar binnen draaien, is dit een genuanceerd voordeel dat klassieke CPM-tools niet hebben.

7. **Diepe hiërarchie en flexibele WBS.** Structure (de basis-app) is een van de best beoordeelde Jira-apps ooit (**4,55 / 5 over 408 reviews**, Marketplace-API 25-07-2026) juist vanwege willekeurig diepe, formule-gestuurde hiërarchieën. Een reviewer: *"Structure's Gantt charts are more detailed and user-friendly compared to Jira's standard 'Plans' or Advanced Roadmaps."*

8. **Enorm ecosysteem en integratiebereik.** Jira's REST API, webhooks, Automation for Jira, en duizenden marketplace-apps betekenen dat vrijwel elke koppeling (Slack, Teams, GitHub, ServiceNow, Power BI, Tableau) al bestaat. Voor rapportage naar een datawarehouse is dat een reëel voordeel boven gesloten planningstools.

9. **Volumeschaling is agressief goedkoop.** BigPicture kost bij 10.000 gebruikers nog maar $0,63 per gebruiker per maand; Structure.Gantt DC Unlimited is $46.776/jaar voor een onbeperkt aantal gebruikers. Voor een concern van 20.000 medewerkers is dit dramatisch goedkoper dan enterprise-P6-licenties.

10. **Actieve doorontwikkeling.** BigPicture zat op 25-07-2026 op versie 8.7.0 (release 20-07-2026) met maandelijkse release-notes; Structure.Gantt op 7.52.0. Dit zijn geen stilstaande producten.

---

## 5. NADELEN

1. **Er is geen echte CPM-engine — nergens in de stack.** Geen enkele laag berekent totale en vrije speling. Advanced Roadmaps kent zelfs geen kritiek pad (openstaand verzoek JSWSERVER-24925, 139 stemmen, status "Gathering Interest" — dus na jaren nog niet eens in de roadmap). BigPicture markeert de langste aaneengesloten keten achterwaarts; Structure.Gantt heeft een `Gantt Critical Path`-vlag maar publiceert geen float-veld. Zonder speling kun je geen "wat kost deze vertraging" beantwoorden, geen vertragingsanalyse doen en geen EOT-claim onderbouwen. **Voor contractuele planning is dit diskwalificerend.**

2. **Advanced Roadmaps kent alleen Finish-to-Start en geen lag.** Atlassian's eigen documentatie: alle linktypes worden behandeld "as though they're of the Blocks type". Geen SS/FF/SF, geen lead/lag. Een simpele bouwsequentie ("bekisting start 2 dagen na start wapening") kan je in Advanced Roadmaps niet uitdrukken. En er zijn geen mijlpalen (JSWSERVER-25115, 282 stemmen, "Gathering Interest").

3. **BigPicture berekent het kritieke pad zonder rekening te houden met niet-werkdagen.** Letterlijk uit de docs: *"The non-working days do not affect the critical path calculation."* Combineer dat met lag die in **kalender**dagen telt in plaats van werkdagen, en je hebt twee onafhankelijke bronnen van systematische datumfouten in elke planning met weekenden of bouwvak.

4. **Structure.Gantt's resource leveling schrijft niets terug naar Jira.** Gedocumenteerd: leveling "DOES NOT reschedule work items in Jira". Je genivelleerde planning bestaat alleen in de Gantt-laag; het team ziet de oorspronkelijke data. Daarmee is het exact het probleem dat deze categorie zou oplossen — de kloof tussen plan en uitvoering — opnieuw geïntroduceerd. Bovendien kan levelling "several seconds to dozens of minutes" duren en er kan er maar één tegelijk lopen per structure.

5. **Stapeling van licenties maakt het duur en de app-tier moet de hele Jira-tier matchen.** Structure.Gantt kán niet zonder Structure: bij 500 gebruikers is dat $12.725 + $3.860 = $16.585/jaar bovenop Jira. Een Marketplace-reviewer: *"its major limitation is that it cannot function independently; it requires the accompanying structure app. Consequently, you're essentially paying for two separate apps."* En Atlassians tier-matching-regel betekent dat je apps koopt voor élke Jira-gebruiker, ook al plannen er maar vijf. Bij BigPicture komt daar BigTemplate ($2.390 bij 100 gebruikers) bovenop zodra je MS Project wilt importeren of het kritieke pad wilt exporteren.

6. **Steile leercurve en configuratielast — consistent in reviews.** BigPicture staat op **3,91 / 5 over 504 reviews** (Marketplace, 25-07-2026). Terugkerende opmerkingen: *"BigPicture is a beast. It's complex and deeply integrated with Jira"*; *"you need training to be able to use the tool to its full extent, as there are many configuration options"*; *"A bit pricey, but well worth the investment"*. Structure.Gantt (4,20/5 over 61 reviews): *"very difficult setup to use"*; *"it's a bit complex to get the hang of"*; *"there may be a learning curve to configure and use it effectively"*.

7. **Prestatieproblemen bij schaal — bij alle lagen.** Advanced Roadmaps waarschuwt zelf boven 10.000 work items en breekt boven 50 teams (teams worden dan onzichtbaar in de Teams-tab). BigPicture heeft een instelbaar takenplafond per Box met de expliciete waarschuwing dat "tens of thousands of tasks in a single box can reduce the app's performance", en een hele documentatiesectie gewijd aan performance-troubleshooting (trage functies, overbelaste databaseserver, hoog geheugengebruik). Een BigPicture-reviewer: *"This plugin used to be problematic, buggy and slowing our instance down."* PeerSpot-reviewers over Jira zelf: *"Jira can occasionally feel slow, especially when loading filters, reports, or larger boards."*

8. **WBS Gantt-Chart is duidelijk het zwakste product — 3,47 / 5 over 159 reviews.** Concrete klachten uit de Marketplace-reviews: *"Good when it works, but it only worked for 3 months out of the 6 that we used it. Support was too slow to respond to bugs"*; *"the view can not be saved, keeps coming back to original generic view... We will not use this app"*; *"I moved all my issues (one by one) several times into a structure which would work for the gantt chart. And after reopening the page later all my changes were lost. This renders it useless for me"*; *"I found it really slow to open and also not very easy to slide across the gantt chart view"*; *"Unfortunately doesn't allow to input task estimations in hours"*; en een gebruiker meldde zelfs een antivirus-waarschuwing bij het laden.

9. **Afhankelijkheid van derde partijen en versie-lock.** De planningsfunctionaliteit zit bij Appfire/Tempo/Ricksoft, niet bij Atlassian. Een BigPicture-reviewer: *"why it is not compatible with jira 11.x (since 13-Aug-2025)? This prevents from upgrading the jira-core system."* Een Structure.Gantt-koper beschrijft "extreme dissatisfaction" over een actief betaald abonnement dat niet werkte op Jira Cloud. Bij een Jira-upgrade zit je vast aan de release-agenda van je app-leverancier — en op Cloud kan Atlassian API's wijzigen buiten jouw invloed.

10. **Kosten stijgen structureel.** PeerSpot-reviewers over Jira: *"The new pricing is indeed quite expensive compared to what it was a few years ago"* en *"plugins and add-ons incur additional per-user licensing costs"*. Capterra/SoftwareAdvice-samenvatting noemt "pricing increases significantly between tier levels". De sprong van Standard naar Premium is bijna een verdubbeling ($9.050 → $18.300 bij 100 gebruikers) — en Premium is nodig zodra je Advanced Roadmaps wilt.

11. **Cloud-versies lopen achter op Data Center.** Structure.Gantt DC heeft **Sandbox Mode** (wat-als-scenario's); die staat niet in de Cloud-documentatie-index. Een Structure-reviewer: *"We recently moved from Data Center to the Cloud and there are quite some limitations in the Cloud version."* Voor wie de Atlassian-migratie naar Cloud moet doen, is functieverlies een reëel risico.

---

## 6. Interoperabiliteit

Dit is voor een IFC-gebaseerde open-source planner de meest relevante paragraaf — en het beeld is zeer eenzijdig.

### 6.1 Wat kan wél

| Formaat / kanaal | Ondersteuning | Details |
|---|---|---|
| **CSV** | **Ja, goed** | Jira's CSV-importer ondersteunt summary, status, prioriteit, assignee, componenten, versies, labels, due date, original/remaining estimate, time spent, worklogs, comments, custom fields en parent-child-hiërarchie. Atlassian adviseert **max. ±1.500 work items per bestand** voor acceptabele performance. |
| **Excel / XLSX** | Ja | Diverse apps (Better Excel Exporter, 4.599 installs; Exporter for Jira, 1.484). BigPicture exporteert het kritieke pad naar XLSX — **maar alleen met BigTemplate**. |
| **MS Project (import)** | **Beperkt, en betaald** | BigPicture kan MS Project-taken importeren en converteren naar Jira work items of naar BigPicture-eigen taken — **vereist BigTemplate**. WBS Gantt-Chart (Ricksoft) claimt "one-click import/export" naar Excel en MS Project; dat is de sterkste MPP-interop in het Jira-ecosysteem. |
| **MS Project (export)** | Marginaal | Alleen via WBS Gantt-Chart. Structure.Gantt exporteert **alleen PDF en SVG** — geen XML, geen MPP, geen Excel. |
| **REST API** | **Ja, uitstekend — voor Jira-data** | Jira's REST API is volwassen, goed gedocumenteerd, met webhooks. Maar: het exporteert *issues*, niet *planning*. Duur, afhankelijkheidstypen, lag, kalenders en resourcetoewijzingen wonen in de app-laag, niet in Jira. Een Structure.Gantt-reviewer vraagt expliciet om een REST API voor de Gantt-laag — die is er niet. |
| **PDF / SVG / afbeelding** | Ja | Voor rapportage. Advanced Roadmaps-PDF-export is nog steeds een openstaand verzoek (JSWSERVER-25222, 412 stemmen, "Gathering Interest"). |

### 6.2 Wat kan absoluut niet

| Formaat | Status |
|---|---|
| **Primavera P6 XER** | **Niet ondersteund. Nergens.** Een zoekopdracht op de volledige Atlassian Marketplace naar "Primavera P6" levert **nul** resultaten op (Marketplace REST API, 25-07-2026). Er bestaat geen enkele app, van geen enkele leverancier, die XER kan lezen of schrijven. |
| **P6 XML / Primavera XML** | **Niet ondersteund.** |
| **MSPDI (MS Project XML)** | Geen gedocumenteerde ondersteuning bij Atlassian; **[SCHATTING]** WBS Gantt-Chart en BigPicture lezen waarschijnlijk XML naast MPP, maar dit is niet expliciet gedocumenteerd. |
| **IFC 4.3 / IfcWorkSchedule / IfcTask** | **Volstrekt niet ondersteund, en er is geen enkel spoor van interesse.** Een Marketplace-zoekopdracht op "IFC BIM" levert alleen 3D-viewers voor Confluence op (3D Viewer+ for Confluence, 57 installs; Online 3D Viewer, 128 installs) — geen enkele planningsapp, geen enkele IFC-importer, geen enkele koppeling naar `IfcWorkSchedule`/`IfcTask`/`IfcTaskTime`. Er bestaat in het hele Jira-ecosysteem geen 4D-BIM-integratie. |
| **BCF / COBie / buildingSMART-standaarden** | Niet ondersteund. |

### 6.3 Betekenis voor een IFC-gebaseerde open-source planner

Dit is strategisch belangrijk, en het is goed nieuws voor de opdrachtgever:

- **Er is geen concurrentie op IFC-terrein.** Het Jira-ecosysteem heeft geen enkel raakvlak met buildingSMART-standaarden. De 11.235 BigPicture-installaties en 6.540 Structure.Gantt-installaties zitten praktisch allemaal in IT-organisaties.
- **Er is óók geen migratiepad.** Een bouwbedrijf dat vandaag in BigPicture plant, kan die planning niet naar IFC exporteren, en een IFC-planning niet naar BigPicture importeren, anders dan via CSV met verlies van alle netwerkstructuur (afhankelijkheidstypen, lag, kalenders, constraints). CSV kan geen typed dependencies dragen.
- **Datamodel-mismatch is fundamenteel.** Jira's atomaire eenheid is een *work item* met een status en een assignee. IFC's `IfcTask` heeft `IfcTaskTime` met `ScheduleStart`, `ScheduleFinish`, `ScheduleDuration`, `FreeFloat`, `TotalFloat`, `IsCritical`, `EarlyStart`/`LateFinish` en `IfcWorkCalendar`. **Jira heeft simpelweg geen velden voor `TotalFloat` of `FreeFloat`** — de apps ook niet. Een round-trip is dus niet alleen niet geïmplementeerd, hij is met het huidige model niet zinvol te implementeren.
- **Concreet advies:** positioneer de open-source IFC-planner niet als "Jira-alternatief" maar als **complement**. De realistische integratie is een CSV- of REST-koppeling waarbij Jira de *uitvoeringsstatus* levert (%-gereed, actuals) en de IFC-planner het *netwerk* bezit. Een lichte Jira-connector die issue-status naar `IfcTask`-voortgang mapt, is technisch triviaal en zou een echt onderscheidend verkoopargument zijn — juist omdat de andere kant het spiegelbeeld nooit zal bouwen.

---

## 7. Marktpositie

### 7.1 Omvang en cijfers

- **Atlassian FY2025 (afgesloten 30 juni 2025): $5,2 miljard omzet**, +20% j-o-j (FY2024: $4,4 mrd). Cloud-omzet **$3,45 mrd**. Non-GAAP operationele marge 25%, vrije kasstroom $1,415 mrd. **51.978 klanten met >$10.000 cloud-ARR** (+13% j-o-j). Verwachte FY2026-groei: cloud ~21%, Data Center ~12,5%, **Marketplace & overig ~10%** (Atlassian Q4/FY2025-resultaten, investors.atlassian.com).
- **300.000+ klanten** en **12.000+ medewerkers** bedrijfsbreed (atlassian.com/company).
- **[SCHATTING]** Jira is verantwoordelijk voor grofweg de helft van Atlassians productomzet; Atlassian rapporteert niet per product. Het aantal Jira-gebruikers wereldwijd wordt vaak op 10–15 miljoen geschat — Atlassian bevestigt dit niet.
- Marktplaats-apps: BigPicture 11.235 installs / 654.233 downloads · Structure 13.291 · Structure.Gantt 6.540 / 96.423 downloads · WBS Gantt-Chart 5.718 / 67.834 downloads.
- Reviewscores: Jira **4,4/5 op 15.426 reviews** (SoftwareAdvice) en **4,1/5 op 285 reviews** met 91% aanbeveling (PeerSpot, #1 in ALM Suites). Apps: Structure 4,55 (408) · Structure.Gantt 4,20 (61) · BigPicture 3,91 (504) · WBS Gantt-Chart 3,47 (159).

### 7.2 Waar sterk, en waarom

Jira is **dominant tot bijna monopolistisch in softwareontwikkeling en IT-delivery**. De reden is padafhankelijkheid, niet planningskwaliteit: de organisatie heeft Jira al voor bugtracking en sprints; de PMO wil een portfolio-overzicht; de goedkoopste weg is een marketplace-app. Advanced Roadmaps versterkt dat door in Premium te zitten — je "krijgt" het bij een upgrade die je toch al overwoog.

Secundair sterk in: SAFe/scaled-agile-programma's (BigPicture's Board- en Goals-modules zijn hier expliciet op ontworpen), release-/programmamanagement, en hybride organisaties die naar buiten een watervalcontract moeten tonen en naar binnen agile werken.

**Zwak tot afwezig in:** bouw en infra, offshore/EPC, scheepsbouw, turnarounds/onderhoudsstops, en overal waar de planning een contractueel document is. Daar is het speling- en vertragingsanalysevermogen doorslaggevend en biedt deze stack het niet.

### 7.3 Belangrijkste concurrenten

| Segment | Concurrent | Verhouding |
|---|---|---|
| **Binnen Atlassian** | **Jira Align** (Atlassians eigen enterprise-agile-planningsproduct, alleen op offerte) | Upsell boven Advanced Roadmaps; nog verder van CPM af |
| **Binnen de Marketplace** | BigPicture ↔ Structure.Gantt ↔ WBS Gantt-Chart ↔ Portfolio by HeroCoders (5.147 installs) ↔ Projectrak (Deiser, 1.401) | Onderling sterk concurrerend; BigPicture is functioneel het breedst, Structure.Gantt technisch het scherpst |
| **Werkbeheer-platformen** | Monday.com, Asana, Wrike, Smartsheet, ClickUp, Notion | Dezelfde "Gantt zonder CPM"-tekortkoming, maar lagere adoptiedrempel |
| **Microsoft** | Microsoft Planner / Project for the web / Project Online, en steeds meer Microsoft Loop + Copilot | Directe bedreiging in Microsoft-huizen; Project for the web heeft óók geen volwaardige CPM, Project Desktop wel |
| **Klassieke CPM** | **Oracle Primavera P6**, **Microsoft Project (desktop)**, Asta Powerproject, Deltek Open Plan, Spider Project, TILOS | **Geen overlap in koopproces.** Deze worden gekocht door planningsafdelingen op basis van CPM-vermogen; Jira-apps door IT-afdelingen op basis van integratie |
| **4D-BIM / bouw** | Synchro (Bentley), Navisworks TimeLiner, Vico, Trimble, en open-source zoals Bonsai/IfcOpenShell | **Volledig disjuncte markt.** Nul Jira-aanwezigheid |

### 7.4 Trend

1. **Consolidatie van de app-laag.** ALM Works (Structure/Structure.Gantt) is opgegaan in Tempo; SoftwarePlant (BigPicture) in Appfire. De drie tot vier serieuze Gantt-apps zitten nu bij twee grote app-consolidators. **[SCHATTING]** Dit drukt de innovatiesnelheid en drijft de prijzen omhoog; het BigPicture-Standard/Advanced-model dat op 24 juli 2026 werd geïntroduceerd, is een klassieke consolidator-zet (features naar een duurdere editie tillen).
2. **Verschuiving naar "strategisch portfoliomanagement" (SPM), weg van planning.** BigPicture's nieuwe Advanced-editie draait om OKR's, Priorities (ICE/RICE/WSJF), Financials en executive dashboards. De richting is duidelijk: **omhoog naar de directiekamer, niet omlaag naar de planningsengine.** Niemand in dit ecosysteem investeert in float-berekening.
3. **Server → Data Center → Cloud.** Atlassian heeft Server end-of-life gemaakt (feb 2024). Cloud-functiepariteit is nog niet compleet (Sandbox Mode in Structure.Gantt DC ontbreekt in Cloud), maar de richting is onomkeerbaar. Voor sectoren met datasoevereiniteitseisen (defensie, bepaalde overheidsbouw) is dat een blokkade.
4. **AI-laag erbovenop.** Atlassian rapporteert 2,3 miljoen maandelijkse AI-gebruikers (Rovo). **[SCHATTING]** AI zal de komende jaren de zichtbare investeringsprioriteit zijn, niet planningscorrectheid.
5. **Marketplace-groei vlakt af.** Atlassian verwacht ~10% groei voor "Marketplace and other" in FY2026 tegenover ~21% voor cloud — de app-laag groeit duidelijk langzamer dan het platform.

---

## 8. Eindoordeel

### Voor wie wel

- **Softwareorganisaties en IT-afdelingen die Jira al hebben** en een portfoliolaag nodig hebben: dit is de goedkoopste en snelste route naar acceptabele planning, en de automatische koppeling tussen plan en uitvoering is een echt structureel voordeel dat P6 en MS Project niet hebben.
- **Scaled-agile-programma's (SAFe, LeSS)**: BigPicture's combinatie van Board, Goals, Dependencies en Resources is voor PI-planning beter geschikt dan welke klassieke CPM-tool dan ook.
- **Kleine teams (≤10 gebruikers)**: BigPicture en WBS Gantt-Chart zijn gratis. Voor $0 extra krijg je Gantt, WBS, resources en risicomatrix. Dat is moeilijk te verslaan.
- **Hybride organisaties** die naar de klant een tijdlijn moeten tonen en intern agile werken.
- **Grote concerns die op volume willen inkopen**: bij 10.000+ gebruikers is dit dramatisch goedkoper per hoofd dan enterprise-CPM-licenties.

### Voor wie niet

- **Bouw, infra, EPC, offshore, scheepsbouw, turnarounds** — kortom iedereen voor wie de planning een contractueel document is. Zonder totale en vrije speling is vertragingsanalyse onmogelijk, is een EOT-claim niet te onderbouwen en is forensische planning uitgesloten. BigPicture's kritieke pad negeert bovendien expliciet niet-werkdagen, en lag telt in kalenderdagen. Dat zijn geen kleine schoonheidsfoutjes maar rekenfouten in de kern van het domein.
- **Iedereen die P6- of MPP-uitwisseling nodig heeft.** XER wordt door geen enkele app in het hele Atlassian-ecosysteem ondersteund. MPP alleen door WBS Gantt-Chart (3,47/5) of via de betaalde BigTemplate-add-on.
- **Iedereen die Advanced Roadmaps als planningstool overweegt.** Alleen Finish-to-Start, geen lag, geen kritiek pad, geen mijlpalen, geen kalenders, geen baselines. Dit is een capaciteitsvisualisatie, geen planner.
- **Organisaties met veel Jira-gebruikers en weinig planners.** De tier-matching-regel maakt dit prijsmodel bij 800 Jira-gebruikers en 5 planners absurd duur.
- **BIM-/4D-organisaties.** Nul IFC-ondersteuning, nul BIM-integratie, geen enkel signaal dat daar ooit iets komt.

### Is dit een serieus alternatief voor klassieke CPM-tools?

**Nee — en het probeert het ook niet te zijn.**

Dat verdient nuance, want het is niet hetzelfde als "slecht". BigPicture en Structure.Gantt zijn goed gebouwde producten die een reëel probleem oplossen: het gat tussen agile uitvoering en portfolio-overzicht. Structure.Gantt heeft vier afhankelijkheidstypen, lead/lag, werkkalenders, resource leveling en baselines — meer planningsvermogen dan de meeste teams ooit gebruiken. BigPicture heeft daarbovenop een echt kostenmodel, risicomanagement en WBS.

Maar op de vier criteria die een CPM-tool tot CPM-tool maken, faalt de hele stack:

1. **Totale en vrije speling worden nergens berekend of getoond.** Dit is niet onderhandelbaar. Zonder float is er geen kritiek-padanalyse, alleen een gekleurde lijn.
2. **Er zijn geen constraint-types** (SNET/FNLT/MSO). "Manual" en "Locked" zijn grofkorrelige vervangers zonder semantiek.
3. **De kalenderbehandeling is inconsistent.** BigPicture negeert niet-werkdagen bij de kritieke-padberekening en telt lag in kalenderdagen. Advanced Roadmaps heeft überhaupt geen werkkalender.
4. **De architectuur is fundamenteel niet-planningsgericht.** Jira's datamodel kent geen duur, geen kalender, geen typed dependency. Alles wat op planning lijkt, is een schil om een ticketdatabase. Structure.Gantt's levelling die niet naar Jira terugschrijft, is het scherpste symptoom: de planningswaarheid en de uitvoeringswaarheid zijn twee verschillende dingen.

En de trend maakt het onwaarschijnlijk dat dit verandert. Het kritiek-padverzoek bij Atlassian staat na jaren nog op "Gathering Interest" met 139 stemmen; BigPicture's productinvesteringen gaan naar OKR's, prioriteringsframeworks en executive-dashboards. Deze markt beweegt **omhoog** naar strategisch portfoliomanagement, niet **omlaag** naar planningscorrectheid.

**Voor het open-source IFC-project betekent dit:** Jira met zijn Gantt-apps is geen concurrent, maar ook geen partner. Het is de dominante tool in een aangrenzende markt die de bouwsector nooit serieus heeft bediend en dat ook niet van plan is. Het reële risico is niet dat een bouwbedrijf BigPicture kiest in plaats van een IFC-planner — het is dat de *IT-afdeling* van dat bouwbedrijf Jira al heeft en dat de projectplanning daar in een goedbedoelde Gantt-app terechtkomt zonder dat iemand doorheeft dat er geen speling wordt berekend. Dát argument — "uw planning heeft geen kritiek pad, alleen een rode lijn" — is de scherpste positionering die er is, en hij is volledig te onderbouwen met de eigen documentatie van de leveranciers.

---

## Bronnen

**Officiële Atlassian-bronnen** (alle geraadpleegd 25-07-2026)
1. Jira Cloud prijspagina + ingebedde commerce-payload (staffelprijzen, gebruikersplafonds, schema.org-headlineprijzen) — https://www.atlassian.com/software/jira/pricing
2. Jira Premium featurepagina — https://www.atlassian.com/software/jira/premium
3. Atlassian bedrijfsprofiel (oprichting 2002, 300.000+ klanten, 12.000+ medewerkers) — https://www.atlassian.com/company
4. Marketplace-licentieregels (tier-matching) — https://www.atlassian.com/licensing/marketplace
5. Jira Data Center prijspagina — https://www.atlassian.com/software/jira/data-center/pricing
6. Roadmaps-featurepagina — https://www.atlassian.com/software/jira/features/roadmaps
7. *What are dependencies in your plan?* (alleen FS, geen lag) — https://support.atlassian.com/jira-software-cloud/docs/what-are-dependencies-in-advanced-roadmaps/
8. *Use sequential or concurrent dependencies in your plan* — https://support.atlassian.com/jira-software-cloud/docs/use-sequential-or-concurrent-dependencies-in-your-plan/
9. *How does the auto-scheduler in my plan work?* (greedy, rank-based) — https://support.atlassian.com/jira-software-cloud/docs/how-does-the-auto-scheduler-in-advanced-roadmaps-work/
10. *Auto-schedule work items on your timeline* — https://support.atlassian.com/jira-software-cloud/docs/auto-schedule-issues-on-your-advanced-roadmaps-timeline/
11. *Limits on plan size* (10.000 items, 50 teams, 100 spaces) — https://support.atlassian.com/jira-software-cloud/docs/limits-on-plan-size-in-advanced-roadmaps/
12. *Manage capacity in your plan* (team-niveau, geen kostenmodel) — https://support.atlassian.com/jira-software-cloud/docs/manage-capacity-in-advanced-roadmaps/
13. *What is Advanced Roadmaps / Plans* (voorheen Portfolio for Jira; Premium/Enterprise-only) — https://support.atlassian.com/jira-software-cloud/docs/what-is-advanced-roadmaps/
14. *Import data from a CSV file* (velden en 1.500-items-advies) — https://support.atlassian.com/jira-cloud-administration/docs/import-data-from-a-csv-file/
15. Atlassian FY2025 Q4-resultaten ($5,2 mrd omzet, 51.978 klanten >$10k ARR) — https://investors.atlassian.com/news/news-details/2025/Atlassian-Announces-Fourth-Quarter-and-Fiscal-Year-2025-Results/default.aspx
16. Publieke Atlassian issue tracker (JSWSERVER-24925 kritiek pad, 139 stemmen; JSWSERVER-25115 mijlpalen, 282 stemmen; JSWSERVER-25222 PDF-export, 412 stemmen) — https://jira.atlassian.com (REST-query op projecten JSWCLOUD/JSWSERVER)

**Atlassian Marketplace** (REST API `marketplace.atlassian.com/rest/2/...`, opgehaald 25-07-2026)
17. BigPicture app-record, installs, reviews en cloud/DC-prijzen — key `eu.softwareplant.bigpicture` — https://marketplace.atlassian.com/apps/1212259/
18. Structure.Gantt app-record en prijzen — key `com.almworks.structure.gantt` — https://marketplace.atlassian.com/apps/1217809/
19. Structure app-record en prijzen — key `com.almworks.jira.structure`
20. WBS Gantt-Chart app-record en prijzen — key `jp.ricksoft.plugins.wbsgantt-for-jira`
21. BigTemplate prijzen — key `softwareplant.bigtemplate`
22. Marketplace-zoekopdrachten op "Primavera P6" (0 resultaten), "IFC BIM" (alleen 3D-viewers), "Microsoft Project import"
23. Marketplace-reviews (gemiddelden en citaten): BigPicture 3,91/504 · Structure 4,55/408 · Structure.Gantt 4,20/61 · WBS Gantt-Chart 3,47/159

**Appfire / BigPicture-documentatie** (Confluence-space `SPM` op appfire.atlassian.net, geraadpleegd 25-07-2026)
24. *Critical path* (achterwaarts algoritme; niet-werkdagen tellen niet mee) — pagina 1918405060
25. *Strong dependencies* (End-to-Start / End-to-End / Start-to-End / Start-to-Start) — pagina 1918701700
26. *Dependency Types* (strong / soft / external) — pagina 1918702538
27. *Lag time* (kalenderdagen, negatieve lag) — pagina 1918406747
28. *ASAP mode* — pagina 1918764948
29. *Scheduling mode* (Auto basic / bottom-up / top-down / Manual / Locked) — pagina 1918831395
30. *Automations* (prioriteitsvolgorde planningsregels) — pagina 1918535176
31. *BigPicture Standard vs Advanced* (editie-vergelijking) — pagina 3451617346
32. *App Editions announcement Jul 24, 2026* — pagina 3482747495
33. *Import MS Project tasks* (vereist BigTemplate) — pagina 3416851775
34. *Current task limit is set to X tasks* (instelbaar takenplafond per Box) — pagina 3019309781
35. Zoekopdrachten "total float" / "free float" in space SPM: **0 resultaten**

**Tempo / Structure.Gantt-documentatie** (help.tempo.io, geraadpleegd 25-07-2026)
36. *Dependencies* (FS/SS/FF/SF + lead/lag) — https://help.tempo.io/gantt/latest/dependencies en /gantt-dc/latest/dependencies
37. *Scheduling Tasks* (automatic / manual / sprint-based) — https://help.tempo.io/gantt/latest/scheduling-tasks
38. *Gantt Configuration* (kalenders, work estimates, precisie, sprints) — https://help.tempo.io/gantt/latest/gantt-configuration
39. *Resource Leveling* (algoritme, "DOES NOT reschedule work items in Jira") — https://help.tempo.io/gantt/latest/resource-leveling
40. *Baselines* — https://help.tempo.io/gantt/latest/baselines
41. *Scheduling Conflict* — https://help.tempo.io/gantt/latest/scheduling-conflict
42. *List of Gantt Fields Available in Structure* (`Gantt Critical Path` aanwezig; géén float/early/late/constraint-velden) — https://help.tempo.io/gantt/latest/list-of-gantt-fields-available-in-structure
43. *Export Gantt Chart* (alleen PDF en SVG) — https://help.tempo.io/gantt/latest/export-gantt-chart
44. DC-gebruikersgids incl. *Sandbox Mode* — https://help.tempo.io/gantt-dc/latest/gantt-charts-for-structure-user-s-guide

**Ricksoft / WBS Gantt-Chart**
45. Productpagina (4 afhankelijkheidstypen, kritiek pad, baselines, MS Project-/Excel-import-export, 10.000 issues) — https://www.ricksoft-inc.com/products/wbs-gantt-chart-for-jira/
46. Documentatiehub — https://docs.ricksoft-inc.com/

**Reviewplatforms en gebruikersfeedback**
47. SoftwareAdvice — Jira-profiel: 4,4/5 op 15.426 reviews, prijstiers, pros/cons — https://www.softwareadvice.com/project-management/jira-profile/
48. PeerSpot — Jira-reviews: 4,1/5 op 285 reviews, 91% aanbeveling, #1 in ALM Suites; citaten over performance en prijsstijgingen — https://www.peerspot.com/products/jira-reviews
49. Atlassian Marketplace-reviews (letterlijke citaten in §5), opgehaald via de publieke reviews-API

**Niet toegankelijk tijdens dit onderzoek** (geblokkeerd met HTTP 403/429 of botbescherming): G2.com, TrustRadius, Capterra-productpagina's, Gartner Peer Insights, Reddit (r/projectmanagement, r/jira, r/construction), appfire.com (Vercel-bot-checkpoint). Waar deze bronnen normaal gesproken kwalitatief bewijs zouden leveren, is dat vervangen door de publieke Atlassian Marketplace-reviews-API (letterlijke gebruikerscitaten, 1.132 reviews over vier apps), de publieke Atlassian issue tracker (stemtellingen op feature-verzoeken) en PeerSpot/SoftwareAdvice.

---

*Profiel opgesteld 25 juli 2026. Alle prijzen zijn lijstprijzen in USD, exclusief btw en exclusief partner-, volume- en non-profitkortingen. Prijzen in het Atlassian-ecosysteem wijzigen frequent — de Marketplace-prijsrecords in dit profiel dragen tijdstempels tussen 19-02-2026 en 15-07-2026.*
