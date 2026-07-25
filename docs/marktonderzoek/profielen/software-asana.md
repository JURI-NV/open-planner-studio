# Asana — diepgaand softwareprofiel

**Categorie:** Collaborative Work Management (CWM) / werkbeheer — *geen* klassieke CPM-planningstool
**Onderzoeksdatum:** 25 juli 2026
**Analist-conclusie in één zin:** Asana tekent een balkenschema en heeft sinds 2024 wél vier afhankelijkheidstypen, maar het heeft **geen echte netwerkplanning**: geen duur-gedreven scheduling, geen forward/backward pass, geen float-berekening, geen lag/lead, geen constraint-types en geen resourcekalenders — het "kritieke pad" is aantoonbaar verkeerd berekend.

> **Methodologische noot.** Dit profiel is opgebouwd uit primaire bronnen (Asana prijspagina, developer-documentatie, investor relations, Asana Community Forum) plus secundaire reviewbronnen. G2, Capterra, TrustRadius, Gartner Peer Insights, Reddit en TechRepublic blokkeerden geautomatiseerde toegang (HTTP 403); als vervanging zijn Software Advice, PeerSpot en het officiële Asana-forum gebruikt. Het Asana Community Forum is hier de meest waardevolle bron: het bevat expliciete bevestigingen van Asana-medewerkers over ontbrekende functionaliteit. Alle schattingen zijn expliciet gemarkeerd met **[SCHATTING]**.

---

## 1. Wat het is

### Leverancier en historie

| Feit | Waarde | Bron |
|---|---|---|
| Bedrijf | Asana, Inc. — San Francisco, VS | Wikipedia |
| Opgericht | 16 december 2008 | Wikipedia |
| Oprichters | Dustin Moskovitz en Justin Rosenstein (beiden ex-Facebook) | Wikipedia |
| Publieke bèta | november 2011; commercieel april 2012 | Wikipedia |
| Financiering | $50 mln Serie C (2016, o.l.v. Sam Altman/Y Combinator); $75 mln Serie D (2018, Generation Investment Management); $50 mln Serie E (nov 2018) | Wikipedia |
| Beursgang | september 2020, **directe notering** NYSE, ticker **ASAN**, waardering ca. $5,5 mrd | Wikipedia |
| Tweede notering | Long-Term Stock Exchange, augustus 2021 | Wikipedia |
| Leiderschap | Moskovitz kondigde in maart 2025 zijn vertrek aan (koers −25%); **Dan Rogers** (ex-ServiceNow, ex-LaunchDarkly) is CEO sinds 21 juli 2025; Moskovitz blijft chairman | Wikipedia |
| Eigendom/zeggenschap | Moskovitz controleert ca. **53%** van de stemrechten — Asana is dus een beursgenoteerd bedrijf met een dominante founder-aandeelhouder | Wikipedia |
| Overname | mei 2026: **StackAI** (no-code AI-workflowplatform) voor **$75 mln** | Wikipedia / TechCrunch via asana.com/press |
| Personeel | ca. **1.767** (stockanalysis.com, juli 2026); 1.819 per 31-01-2025 (Wikipedia) | stockanalysis.com |
| Kantoren | 13 locaties: San Francisco (HQ), Chicago, New York, Vancouver, Dublin, Londen, München, Parijs, Warschau, Stockholm, Tokio, Sydney, Singapore | asana.com/company |

### Financiële positie (belangrijk voor leveranciersrisico)

| Metric | Waarde | Periode | Bron |
|---|---|---|---|
| Omzet FY2026 | **$790,8 mln**, +9% j-o-j | boekjaar t/m 31-01-2026 | IR-persbericht 2 maart 2026 |
| Omzet FY2025 | $723,9 mln | t/m 31-01-2025 | stockanalysis.com |
| Omzet Q1 FY2027 | $205,1 mln, +9,5% | kwartaal t/m 30-04-2026 | IR-persbericht 28 mei 2026 |
| Guidance FY2027 | $855,5–863,5 mln (+8,2–9,2%) | — | IR 28 mei 2026 |
| Nettoverlies FY2026 | −$189,0 mln (26% verbeterd t.o.v. FY2025) | — | stockanalysis.com |
| "Core"-klanten (≥ $5.000/jaar) | 26.103 (+7%) | Q1 FY27 | IR 28 mei 2026 |
| Klanten ≥ $100.000/jaar | 817 (+12%) | Q1 FY27 | IR 28 mei 2026 |
| Dollar-based net retention | **96%** totaal / 97% core / 96% bij $100k+ | Q1 FY27 | IR 28 mei 2026 |
| Marktkapitalisatie | **$1,58 mrd** (koers $6,86), −55,6% op jaarbasis | 24 juli 2026 | stockanalysis.com |

**Analistenduiding:** een DBNRR van 96% betekent dat de bestaande klantenbasis **krimpt** in uitgaven (onder de 100%). Gecombineerd met een omzetgroei die is teruggevallen van ~45% (2021) naar ~9% en een koersdaling van 55% in een jaar, is Asana een volwassen, vertragende SaaS-speler die zijn hoop op AI-agents zet ("operating system for human-agent teams", Work Graph®, AI Teammates, StackAI-overname).

### Doelgroep, typische gebruikers, sectoren, regio's

- **Doelgroep:** kenniswerkteams — marketing, operations, productmanagement, IT, HR, creatieve bureaus, professional services. Van 5-persoonsteams tot enterprise-brede uitrol (FedRAMP Moderate voor Asana Gov sinds 24 juni 2026 [ONGEVERIFIEERD, zie §Verificatie] opent de Amerikaanse publieke sector).
- **Typische gebruiker:** een teamlead of programmamanager die overzicht wil over veel parallelle, kortcyclische werkstromen — niet een planner die een contractueel schema met mijlpaalboetes moet verdedigen.
- **Sectoren:** technologie, media/marketing, retail, financiële dienstverlening, onderwijs, non-profit, overheid (VS). **Bouw en infrastructuur zijn géén doelmarkt**: in de Asana app-directory staat géén enkele bouw-/BIM-/engineering-integratie (geen Procore, Autodesk Construction Cloud, Revit, Navisworks, Bentley, Primavera). Zoekopdrachten in het Asana-forum op "construction / contractor / BIM / IFC / 4D" leveren **nul resultaten** op.
- **Regio's:** zwaartepunt Noord-Amerika; substantiële EMEA-aanwezigheid (Dublin, Londen, München, Parijs, Warschau, Stockholm) en APAC (Tokio, Sydney, Singapore).

---

## 2. Functionaliteit en techniek — een strenge beoordeling

### 2.1 Is er een echte CPM-engine? **Nee.**

Dit is het kernpunt van dit profiel en het verdient een harde formulering.

**Wat Asana wél heeft:** een `Highlight critical path`-schakelaar in Timeline- en Gantt-weergave.

**Wat die schakelaar werkelijk doet:** de langste keten van afhankelijke taken oplichten. Het is een *pad-lengte-heuristiek*, geen CPM-berekening.

**Bewijs dat het aantoonbaar fout is** (forumthread 479444, "Improve critical path", 39 posts, tag `considered`):

- Gebruiker `@ka_nishiyama` (13 sept 2023) documenteert dat Asana het pad `1(1)-2(2)-4(3)-2(4)-1(5)` oplicht terwijl het correcte kritieke pad `1(1)-2(2)-5(31)-2(4)-1(5)` is.
- Gebruiker `@Jan-Rienk` bekritiseert de implementatie inhoudelijk: *"the critical path isn't wrong according to the documentation. That's not the whole story though, as the purpose of critical path in project management is to be aware of the path that can't afford any delays"* en *"Using the critical path in this instance would work to delay the project rather than ensure it is completed on time."* (Correctie: de eerder geciteerde formulering "plainly wrong and misleading" en de datum 31 juli 2024 zijn bij herlezing van de thread **niet** teruggevonden; bovenstaande citaten zijn wel geverifieerd.)
- Forumleider `@Phil_Seeman` legt de correcte definitie uit ("the path of dependent tasks that has the least amount of flexibility"). Asana's implementatie **negeert float/slack volledig**.
- Officiële reactie van Asana (Emily Roman, 30 april 2024): *"I'll create a task to our product team to investigate further and consider updates to critical path in future updates."* De thread staat per september 2025 nog altijd op `considered` — dus **niet opgelost**.

**Wat er ontbreekt voor een echte netwerkplanning:**

| CPM-element | Aanwezig in Asana? |
|---|---|
| Duur als invoerveld die datums berekent | **Nee** — taken zijn datumbereiken; Gantt heeft een afgeleide "Duration"-kolom, geen driver |
| Forward pass (ES/EF) | **Nee** |
| Backward pass (LS/LF) | **Nee** |
| Total float / free float als waarde | **Nee** (nergens als veld, filter of kolom) |
| Kritiek pad op basis van float | **Nee** (langste-ketenheuristiek) |
| Achterwaarts plannen vanaf einddatum | **Nee** (niet gevonden in documentatie noch forum) |
| Constraint-types (SNET, FNLT, MSO, MFO, ALAP) | **Nee** (niet gevonden — effectief afwezig) |
| Deadline apart van einddatum | **Nee** |
| Kalender-gedreven duurrekening | **Zeer beperkt** (zie 2.3) |

Migranten vanuit MS Project benoemen dit letterlijk. Thread 1127584 (Kristin Harpster): *"I am a new Asana user, having recently switched over from MS Project. My project plans have thousands of tasks and multiple workstreams. I am accustomed to creating due dates from number of days."* Asana kan dat niet. Thread 20537 (94 posts, sinds april 2018): *"I need to be able to type in only a few things to automatically build a project timeline: Task Name, duration, dependency"* — en: *"This is a reallllly big deal for those of us who are used to using MS Project and is a key reason I still don't use Asana for my project management unless forced to do so."*

**Conclusie:** Asana tekent een balkenschema over handmatig ingevoerde datums. De datums zijn de invoer, niet de uitvoer. Dat is het definiërende verschil met een CPM-tool.

### 2.2 Afhankelijkheidstypen, lag en auto-scheduling

**Afhankelijkheidstypen — sinds 2024 wel compleet, maar ondiep.**

Tot medio 2024 kende Asana uitsluitend Finish-to-Start. Alle vier types (FS/SS/FF/SF) bestaan inmiddels nominaal: het Help Center-artikel "How to use task dependencies" benoemt expliciet *"Finish-to-Start, Finish-to-Finish, Start-to-Start, and Start-to-Finish"*, en de introductiethread 885797 ("Mastering Advanced Task Dependencies", Christine Bolton, **12 augustus 2024**) behandelt ze als nieuw.

> **Correctie bij verificatie (25-07-2026):** een eerdere versie dateerde de lancering op **28 juni 2024** met een citaat van Emily Roman in thread 99691. Thread 99691 bevat die aankondiging niet — het is een feature request uit november 2020 die t/m eind 2022 nog om SS/FF/SF vráágt. Het citaat is niet te verifiëren en de precieze lanceerdatum staat daarmee niet vast; alleen "uiterlijk augustus 2024" is hard. Dat de vier types bestaan, is wél bevestigd via het Help Center.

**Maar de uitvoering rammelt** (thread 885797, "Mastering Advanced Task Dependencies", aug 2024):

- **Visuele bug:** *"SS and FF dependency types visually showing as a conflict, appearing red, but are not."* (12 aug 2024)
- **SS werkt niet als SS:** Holly Day (21 aug 2024) constateert dat een SS-afhankelijkheid de opvolger blokkeert tot de voorganger *klaar* is — de facto gedraagt SS zich als FF.
- **Auto-verschuiving faalt bij SS:** Jan-Rienk Hemminga (16 sept 2024): bij het slepen van een blokkerende taak naar later verschuift de geblokkeerde taak bij SS **niet** mee.

**Lag/lead time: bestaat niet.** Dit is expliciet bevestigd:

- Thread 94528: forumleider Julien op de vraag of je een vast interval tussen afhankelijke taken kunt vastleggen: **"No you can't."** (gesloten 27 april 2022)
- Thread 885797: Christy Bonds vraagt (14 aug 2024) *"Is there any plans to include lead/lag times with these dependencies to cascade due dates?"* — Asana-medewerker Christine Bolton verwijst naar een feature request om op te stemmen. **Geen toezegging, geen levering.**
- Thread 1136693 (16 april 2026, nog geen jaar oud): een gebruiker vraagt nog steeds om *"No lag/lead time support: Cannot add delays or overlaps between tasks directly"*.
- De enige werkende oplossing is een **derde partij**: Flowsana's "Lag Time"-functie in de Dynamic Dependency-workflow.

**Auto-shift is een sleepgedrag, geen scheduler.** Asana introduceerde op 2 januari 2023 (thread 215172) het "auto-shift dependent tasks"-gedrag: *"pushing Task A forward 3 days will also push Task B forward 3 days, maintaining the 3 day gap."* Beperkingen zoals gedocumenteerd in diezelfde thread:

- Werkt **uitsluitend in Timeline-weergave** — niet in List, Board, Inbox of My Tasks.
- Werkt **alleen op taakniveau, niet op subtaken**.
- Kan **niet als standaard** in projectsjablonen worden ingesteld (stand maart 2025).
- Weekend-bewust verschuiven kwam pas op 27 januari 2023 en kent alleen zaterdag/zondag als niet-werkdag.

Het gaat dus om *relatief verschuiven van handmatig gezette datums*, niet om herberekening van een netwerk.

### 2.3 Kalenders

Asana heeft **geen kalendermodel** in planningszin.

- Sinds ~2025 bestaan er **projectinstellingen voor werkdagen** (thread 1021225): je kiest per project welke dagen van de week werkdagen zijn.
- **Geen feestdagenkalender.** Thread 1089416 is een openstaand verzoek om bedrijfs- en nationale feestdagen uit te sluiten; de huidige aanpassing is *"limited to weekly day selection"*.
- **Geen resource-specifieke kalenders**, geen ploegendiensten, geen uren-per-dag-kalender, geen kalender-exceptions per taak.
- **Geen uur-nauwkeurige duurrekening.** Wél `start_at`/`due_at` als ISO-8601-datetimes in de API, maar de planningslogica rekent in dagen.
- Terugkerende klacht: taken veranderen van duur als je ze over een weekend verplaatst; gebruikers noemen de formule-functiebibliotheek voor werkdagberekeningen *"woefully lacking"*.

Voor bouwplanning — waar feestdagen, vorstverlet, ploegenroosters en 6-daagse werkweken standaard zijn — is dit diskwalificerend.

### 2.4 Resource- en kostenmodel

**Workload (vanaf Advanced):**

- Inspanning per taak komt uit het ingebouwde veld "Estimated time" of een eigen numeriek veld.
- Uren worden **gelijkmatig verdeeld over het datumbereik** van een taak (thread 84004) — geen curves, geen front-/back-loading, geen dagelijkse toewijzingsprofielen.
- Capaciteit wordt per persoon per week/dag ingesteld.
- **Geen automatische resource-leveling.** Geen zoekresultaten in het forum voor leveling; er is geen leveling-functie in de documentatie. Over-allocatie wordt alleen *gekleurd*, niet *opgelost*.
- **Out-of-office verlaagt de capaciteit niet** (thread 1143806, 2026): *"Out of Office periods [don't] automatically reduce available capacity in Workload."*
- Gerapporteerde rekenfouten: afronding van 30-minutentaken naar 1 uur (thread 434658); onjuiste geplande uren waarbij alle teamleden hetzelfde bedrag tonen (thread 756815); rode overbezettingsindicator die niet afgaat (thread 415168).
- **Harde limieten:** 300 taken per persoon in Workload; 200 personen in Portfolio Workload; 200 personen in Reporting Workload; 500 personen in capaciteitsplannen; 100 personen voor gemiddelde-percentageberekeningen; 100 projecten voor totalen in capaciteitsplannen.
- **Universal workload en capacity planning zitten pas op Enterprise.**

**Kostenmodel: bestaat niet in de kernproducten.** Er is een betaalde add-on **Timesheets & Budgets** (aangekondigd 20 november 2025, thread 1107760; sinds 2026 self-service met 14 dagen proef, thread 1137286):

- Levert: urenstaten met goedkeuring, uurtarieven per persoon per project, budget versus werkelijk, prognose van declarabele omzet, export van tijd- en kostendata.
- **Beschikbaar op Starter, Advanced, Enterprise en Enterprise+** (prijs "billed annually"). *(Gecorrigeerd: bij de lancering in november 2025 was de add-on beperkt tot Advanced en hoger; sinds de self-service-uitrol van 20 april 2026 — forum 1137286 — noemen zowel de prijspagina als de aankondiging expliciet ook Starter.)*
- Gasten kunnen geen urenstaten invullen (alleen betaalde members).
- **Geen earned value management** — geen BCWS/BCWP/ACWP, geen CPI/SPI, geen S-curves, geen kostenresources of materiaalkosten, geen cashflowprognose op basis van het schema.

### 2.5 Baselines

Asana heeft sinds enkele jaren een **"Compare baseline"** in Gantt-weergave. De uitvoering is mager:

- **Eén baseline per project, die bij elke nieuwe vastlegging de vorige overschrijft** (thread 1104074) — geen baseline 1/2/3 zoals in MS Project, geen interim plans.
- **Geen rechtenmodel:** iedereen kan de baseline overschrijven (thread 1105375).
- **Niet beschikbaar via de API** (thread 838366: "API and the Gantt 'Compare Baseline' date").
- **Geen datavelden voor variantie:** de baseline is uitsluitend een visuele overlay; er zijn geen kolommen "baseline start/finish/variance" om op te filteren of te rapporteren (thread 1097147, 923685).
- Gebruiker in thread 1097147: *"All creating the baseline did was make the bar graphs on the Gantt chart half"*.

Voor contractuele voortgangsbewaking (delay analysis, EOT-claims, as-planned vs as-built) is dit onbruikbaar.

### 2.6 WBS-hiërarchie

- Subtaken tot **maximaal 5 niveaus** diep.
- **Ouderlijke taken rollen niet automatisch op**: thread 4404 (Michael Trafton): *"We need to be able to roll up sub-tasks into a parent task where the end date of the parent task is the latest end date of its sub-task"* — dat kan niet.
- Slechts **50 subtaken zichtbaar in Timeline**; 30 subtaken meegenomen in kolomfunctieberekeningen.
- Een taak kan in maximaal **20 projecten** tegelijk zitten (multi-homing).

Een klassieke WBS met summary-taken die datums en kosten optellen bestaat dus niet.

### 2.7 Platform en schaalbaarheid

**Platform:** pure SaaS (web, Electron-achtige desktop-wrappers voor Windows/macOS, iOS/Android). **Geen on-premise, geen private cloud, geen offline-modus.** Data-residency en audit logs zitten op Enterprise+.

**Harde gedocumenteerde limieten** (Asana-forum thread 236641, "List of technical and data limitations in Asana", bijgewerkt t/m 16 juli 2026 — samengesteld door Asana-consultant Richard Sather):

| Gebied | Limiet |
|---|---|
| **Afhankelijkheden per taak** | **30–45** |
| **Taken met einddatum voor kritiek pad** | **2.000** |
| Subtaakniveaus | 5 |
| Subtaken zichtbaar in Timeline | 50 |
| Taken per persoon in Workload | 300 |
| Projecten per portfolio | 1.500 |
| Multi-homing van één taak | 20 projecten |
| Zichtbare taken in een sectie (inklapbaar) | 1.000 |
| Taken selecteerbaar voor bulkactie | 500 |
| Custom fields per project | 150 (verhoogd van 100 in jan 2026) |
| Regels per project/portfolio | 50 |
| Componenten per regel | 100 |
| **CSV-import** | **2.000 rijen**, 2.000 kolommen |
| CSV-export uit project | 140.000 rijen |
| CSV-export uit zoekresultaat | 5.000 rijen |
| Read-only link, Timeline | 100 taken zichtbaar |
| Taakomschrijving | 65.000 tekens |
| Bestandsbijlage | 100 MB |
| Dashboard | 20 grafieken |
| Duplicatie van een sectie | 15.000 taken |

**API-limieten** (developers.asana.com/docs/rate-limits): 150 requests/minuut op het gratis niveau, **1.500 requests/minuut op betaalde plannen**; 50 gelijktijdige GET-requests, 15 gelijktijdige schrijfrequests; Search API 60 rpm; 5 gelijktijdige duplicatie-/export-jobs per gebruiker; kostengebaseerde limiet bovenop het volume; `429` met `Retry-After` bij overschrijding.

**Realistische schaal — [SCHATTING]:** in de praktijk is Asana bruikbaar voor planningen tot ongeveer **500–1.500 taken per project**. Boven de 2.000 taken met einddatum stopt het kritieke pad met werken (harde limiet), en gebruikers rapporteren al bij *"hundreds of tasks"* prestatieproblemen in de Gantt (thread 1136693, april 2026). Een CSV-migratie is bovendien gekapt op 2.000 rijen per import, wat het overzetten van een groot bestaand schema in meerdere stappen dwingt. Ter vergelijking: een middelgroot utiliteitsbouwproject in Primavera P6 telt vaak 5.000–20.000 activiteiten — dat past hier niet in.

---

## 3. Prijzen

**Bron:** https://asana.com/pricing — geraadpleegd **25 juli 2026**. Prijzen worden zelfs op de Nederlandse pagina (asana.com/nl/pricing) in **US dollars** getoond; lokale btw/belasting wordt bovenop het totaal berekend afhankelijk van het factuuradres.

### Lijstprijzen

| Plan | Jaarlijks gefactureerd | Maandelijks gefactureerd | Per gebruiker per jaar (berekend) |
|---|---|---|---|
| **Personal** (gratis) | $0 | $0 | $0 |
| **Starter** | **$10,99** p/gebruiker/maand | **$13,49** p/gebruiker/maand | **$131,88** [berekend: 10,99 × 12] |
| **Advanced** | **$24,99** p/gebruiker/maand | **$30,49** p/gebruiker/maand | **$299,88** [berekend: 24,99 × 12] |
| **Enterprise** | prijs op aanvraag | prijs op aanvraag | — |
| **Enterprise+** | prijs op aanvraag | prijs op aanvraag | — |

Jaarlijkse facturering levert *"up to 18%"* korting op ten opzichte van maandelijks.

### Gratis tier — sterk uitgekleed

De Personal-tier is nu **"2 users"** — letterlijk: *"For one or two people managing personal projects"*, *"Up to 2 users can collaborate for free"* (asana.com/pricing, 25-07-2026).

Dit is een forse aanscherping. Historisch verloop:
- "Basic": **15 gebruikers**
- Hernoemd naar "Personal", verlaagd naar **10 gebruikers** (bevestigd door Richard Sather op het Asana-forum, thread 631260, 11 december 2023: *"The maximum amount of users on a Basic plan was 15, but on the Personal tier it is now down to 10."*)
- Nu: **2 gebruikers** (juli 2026)

Inhoud van Personal: onbeperkt taken en projecten, List-/Board-/Calendar-weergave, onbeperkte opslag met 100 MB per bestand, statusupdates, tijdregistratie via integraties, 100+ gratis integraties. **Geen Timeline, geen Gantt.**

### Minimale zetelaantallen en verkoopblokken

Er is geen absoluut minimum aantal seats, maar Asana verkoopt in **blokken**:

| Aantal gebruikers | Toevoegen in stappen van |
|---|---|
| 2–5 | 1 |
| tot 30 | 5 |
| tot 100 | 10 |
| tot 500 | 25 |
| 500+ | 50 |

Praktisch betekent dit dat je bij 31 gebruikers voor 35 seats betaalt en bij 101 gebruikers voor 125 seats. Betaalde plannen zelf kennen *"No user seat limits"* aan de bovenkant.

### Wat zit in welk plan (planningsrelevant)

| Functie | Personal | Starter | Advanced | Enterprise |
|---|:--:|:--:|:--:|:--:|
| Timeline- en Gantt-weergave | — | ✅ | ✅ | ✅ |
| Rapportagedashboards | — | ✅ | ✅ | ✅ |
| Onbeperkte automatiseringen, formulieren, custom fields | — | ✅ | ✅ | ✅ |
| Onbeperkte gasten | — | ✅ | ✅ | ✅ |
| **Portfolio's (onbeperkt)** | — | — | ✅ | ✅ |
| **Goals (OKR)** | — | — | ✅ | ✅ |
| **Workload** | — | — | ✅ | ✅ |
| Approvals & proofing, formules, tijdregistratie | — | — | ✅ | ✅ |
| Salesforce / Tableau / Power BI | — | — | ✅ | ✅ |
| **Universal workload + capacity planning** | — | — | — | ✅ |
| SAML SSO, SCIM-provisioning, service accounts, view-only licenties | — | — | — | ✅ |
| AI Studio-credits per factuuraccount per maand | — | 50.000 | 75.000 | 200.000 |
| Data-residency, audit logs, SIEM, managed workspaces | — | — | — | Enterprise+ |

**Kritiek prijspunt voor planners:** Gantt zit achter Starter ($10,99), maar **Workload en portfolio's zitten pas op Advanced ($24,99)** — bijna 2,3× duurder. Wie in Asana resourceplanning wil doen, betaalt onvermijdelijk het Advanced-tarief voor *iedere* gebruiker, ook voor mensen die alleen taken afvinken.

### Add-ons

| Add-on | Prijs | Voorwaarde | Bron |
|---|---|---|---|
| **Timesheets & Budgets** | **$5,99** p/gebruiker/maand, jaarlijks gefactureerd (**$71,88/jaar** [berekend]) | Starter / Advanced / Enterprise / Enterprise+ (was bij lancering Advanced+; sinds 20-04-2026 ook Starter) | asana.com/pricing, 25-07-2026; forum 1137286 |
| **AI Teammates** | prijs op aanvraag | Starter en hoger | asana.com/pricing |
| **Compliance Management** | prijs op aanvraag | Enterprise | asana.com/pricing |
| **Permissions Management** | prijs op aanvraag | Enterprise | asana.com/pricing |

Op het forum klagen meerdere klanten (Ed Faris, Tim Bowen, Ben — december 2025) dat ze de prijs van Timesheets & Budgets **niet uit de verkoopafdeling kregen**; gebruiker Maria stelt dat het *"an integral part of the paid plans, not an add-on"* zou moeten zijn.

### Werkelijk betaalde prijzen (onderhandelde contracten)

**Bron:** Vendr buyer guide voor Asana, dataset van 455–481 geanonimiseerde transacties t/m **februari 2026**.

| Metric | Waarde |
|---|---|
| Gemiddelde/mediane contractwaarde | **$42.000 per jaar** |
| Bandbreedte | $7.497 – $142.800 per jaar |
| Gemiddelde korting op lijstprijs | **14,84%** |
| Starter, 20–100 gebruikers | $8–11 p/gebruiker/maand (lijst $10,99) |
| Advanced, 100–500 gebruikers | $18–24 p/gebruiker/maand (lijst $24,99) |
| Enterprise, 500–2.000 gebruikers | $22–32 p/gebruiker/maand (custom-basis $30–40+) |
| Volumekorting + meerjarige verbintenis | in de praktijk 20–35% onder lijstprijs |

*(Gecorrigeerd 25-07-2026: een eerdere versie van dit profiel gaf staffels per 50/100/500 gebruikers met bedragen van $20–24 / $18–22 / $22–28. Die indeling staat niet in de Vendr-gids; hierboven staan de staffels zoals Vendr ze werkelijk publiceert. Ook de kortingsregels "5–15% bij Q4-timing" en "15–25% bij concurrerende evaluatie" waren niet als aparte percentages terug te vinden en zijn samengevoegd tot de wél gepubliceerde 20–35%.)*

**Opmerkelijk:** de Enterprise-tier ligt in de praktijk **hoger** per gebruiker dan Advanced-lijstprijs bij kleinere volumes — Enterprise is een feature-uitbreiding (SSO/SCIM/capacity planning), geen kortingstier.

### Kostenvergelijking voor een fictieve planningsafdeling — [SCHATTING/BEREKENING]

25 gebruikers die Gantt én Workload én urenregistratie nodig hebben:
- Advanced: 25 × $299,88 = **$7.497/jaar** (komt exact overeen met Vendr's laagste waargenomen contract)
- \+ Timesheets & Budgets: 25 × $71,88 = **$1.797/jaar**
- **Totaal ≈ $9.294/jaar** (excl. btw, tegen lijstprijs, zonder korting)

Ter vergelijking [SCHATTING, ordegrootte]: één Primavera P6 Professional-licentie kost een veelvoud per seat, maar je hebt er meestal maar 1–3 van nodig omdat alleen planners plannen. Asana's model rekent per *deelnemer*, niet per *planner* — dat is duur als je 200 uitvoerenden hebt en 3 planners.

---

## 4. VOORDELEN

1. **Uitzonderlijk lage adoptiedrempel en hoge gebruikerstevredenheid.** Software Advice: **4,5/5 over 13.616 geverifieerde reviews** (8.094 × 5 sterren, slechts 233 reviews van 1–2 sterren); ease-of-use 4,4/5; value for money 4,4/5. PeerSpot: 4,1/5 over 57 reviews met **87% aanbevelingsbereidheid**. Voor een tool die door niet-planners gebruikt moet worden, is dat een reëel en zwaarwegend voordeel — een perfect P6-schema dat niemand bijwerkt is waardeloos.

2. **Vier afhankelijkheidstypen aanwezig (FS/SS/FF/SF) sinds medio 2024** (bevestigd via het Help Center; uiterlijk augustus 2024 uitgerold). Daarmee is Asana verder dan de meeste werkbeheertools (Trello, Notion, basis-Monday) die alleen FS of helemaal geen typen kennen. Dat het gedrag rammelt (zie nadelen) neemt niet weg dat de datamodellering er is.

3. **Sterke portfolio-laag met echte doorrekening naar strategie.** Portfolio's tot **1.500 projecten**, geneste rapportagevelden, Goals/OKR's die aan projecten en taken gekoppeld worden. Gartner gaf Asana de **hoogste score van alle geëvalueerde leveranciers voor de OKR-managementusecase: 4,63/5** (Magic Quadrant Collaborative Work Management, 30 oktober 2025). Voor programmaportfolio-overzicht op directieniveau is dit een van de betere producten in de markt.

4. **Automatiseringsmotor die serieus is.** 50 regels per project/portfolio, 100 componenten per regel, 25 vertakkingen, 20 condities per tak, 20 triggers en 20 acties per regel — plus formulevelden (2 ketenlagen, 10 formulevelden als input). Dit is workflow-automatisering op het niveau van een low-code platform, niet een speeltje. Voor herhalende procesplanning (onboarding, campagnes, releasetreinen) verslaat dit klassieke CPM-tools ruimschoots.

5. **Volwassen, goed gedocumenteerde REST API met webhooks.** OAuth 2.0, OpenID Connect en Personal Access Tokens; batch requests; paginering; audit-log-events; **1.500 requests/minuut op betaalde plannen** met 50 gelijktijdige leesrequests. Voor integratiebouwers is dit een prettige API — de beperking zit in *wat* er wordt blootgesteld, niet in de kwaliteit van de interface.

6. **Breed integratielandschap in de kenniswerk-stack.** 100+ gratis integraties zelfs op de gratis tier; Slack, Microsoft Teams, Google Drive, Salesforce, ServiceNow, GitHub, Jira, Azure DevOps, HubSpot; Tableau en Power BI-connectoren (Advanced+). Asana past in de gereedschapskist van een moderne organisatie zonder maatwerk.

7. **Analistenerkenning en enterprise-geloofwaardigheid.** Leader in de **Gartner Magic Quadrant Collaborative Work Management 2025** (derde jaar op rij, gepubliceerd 30 oktober 2025) en Leader in **The Forrester Wave: Collaborative Work Management Tools, Q2 2025** met de hoogst mogelijke scores op negen criteria waaronder Innovation, Roadmap en Enterprise Work Management. Sinds **24 juni 2026 FedRAMP Moderate** voor Asana Gov — **datum niet onafhankelijk geverifieerd**, zie §Verificatie.

8. **Transparante, publieke lijstprijs met zelfbediening.** Geen verplicht verkoopgesprek voor Starter of Advanced; je kunt met 2 seats beginnen en groeien. In een markt waar Primavera, Powerproject en Workfront allemaal "neem contact op" zijn, is de zichtbare $10,99/$24,99 een reëel voordeel voor kleine organisaties.

9. **Auto-shift van afhankelijke taken met behoud van tussenruimte** (sinds 2 januari 2023) inclusief weekend-bewust verschuiven (27 januari 2023). Binnen zijn beperkte scope werkt dit goed en scheelt het veel handmatig sleepwerk bij vertragingen.

10. **Uitgebreide, publieke documentatie van harde systeemlimieten.** De limietenlijst (forum 236641) is weliswaar community-onderhouden, maar Asana laat hem staan en breidt hem bij. Voor architectuurbeslissingen is dat waardevoller dan de doorgaans ondoorzichtige limieten van concurrenten.

---

## 5. NADELEN

1. **Het "kritieke pad" is aantoonbaar onjuist.** Asana licht de langste dependency-keten op en negeert float volledig. Meerdere onafhankelijke gebruikers documenteren met reproduceerbare voorbeelden dat Asana het verkeerde pad kiest (forum 479444, vanaf sept 2023); de kritiek is expliciet dat de implementatie het doel van het kritieke pad mist — *"the purpose of critical path in project management is to be aware of the path that can't afford any delays"*. Asana's officiële reactie (30 april 2024) was een ticket bij het productteam; per september 2025 nog steeds `considered`. **Een fout kritiek pad is erger dan geen kritiek pad** — het geeft schijnzekerheid bij precies de beslissingen waar het om gaat.

2. **Geen duur-gedreven planning: datums zijn invoer, niet uitvoer.** Je kunt niet "10 werkdagen" invoeren en Asana de datums laten uitrekenen. Dit staat sinds april 2018 open (thread 20537, 94 posts) en werd in 2026 nog steeds gevraagd. Een MS Project-migrant (thread 1127584): *"My project plans have thousands of tasks... I am accustomed to creating due dates from number of days."* Zonder duur-driver is elke vertraging handwerk.

3. **Geen lag/lead time — bevestigd door Asana zelf.** *"No you can't"* (forumleider Julien, thread 94528). Bij de lancering van de nieuwe afhankelijkheidstypen (aug 2024) weigerde Asana toe te zeggen dat lag komt. Het gevolg: uithardingstijden, levertijden, wachttijden en overlappen zijn in Asana niet te modelleren zonder een dummy-taak of een externe tool (Flowsana).

4. **De nieuwe afhankelijkheidstypen werken niet betrouwbaar.** Gedocumenteerd in de officiële aankondigingsthread (885797): SS/FF tonen valse rode conflictmarkeringen; SS blokkeert de opvolger tot de voorganger *klaar* is en gedraagt zich dus als FF; bij SS verschuift de opvolger niet mee bij het slepen van de voorganger. En: **auto-shift werkt alleen in Timeline-weergave, alleen op taakniveau, niet op subtaken, en niet als standaard in sjablonen.**

5. **Baselines zijn een visuele overlay, geen meetinstrument.** Eén baseline per project die bij elke nieuwe vastlegging overschreven wordt; geen rechtenbeheer wie hem mag zetten (thread 1105375); niet beschikbaar via de API (thread 838366); geen datakolommen voor baseline-start/-einde/-variantie om op te rapporteren of filteren (threads 1097147, 923685). Delay analysis, EOT-onderbouwing of as-planned-vs-as-built is hiermee onmogelijk.

6. **Geen kalendermodel dat de werkelijkheid aankan.** Alleen een weekpatroon van werkdagen per project. **Geen feestdagen** (openstaand verzoek 1089416), geen resourcekalenders, geen ploegen, geen urenkalenders. Een gebruiker met een 4-daagse werkweek moest handmatig corrigeren omdat het systeem alleen weekenden uitsluit.

7. **Workload rekent onbetrouwbaar en is niet levelbaar.** Uren worden gelijkmatig over het datumbereik gesmeerd (84004); 30-minutentaken ronden af naar een uur (434658); geplande uren tonen soms hetzelfde bedrag voor alle teamleden ongeacht ingevoerde effort (756815); de rode overbezettingsindicator gaat niet altijd af (415168); **out-of-office verlaagt de capaciteit niet** (1143806, 2026). Er is **geen automatische resource-leveling**. Bovendien harde limieten: 300 taken per persoon, 200 personen per workload-tab.

8. **Prijs-/functiestapeling straft planningsgebruik af.** Timeline/Gantt vergt Starter ($10,99), maar Workload en portfolio's vergen **Advanced ($24,99 — 2,3× zoveel)**, universal workload en capacity planning vergen **Enterprise**, en kosten/urenstaten vergen een **extra add-on van $5,99** bovenop het planabonnement (sinds april 2026 wel al vanaf Starter verkrijgbaar). Software Advice noemt prijs de **belangrijkste klacht**: *"premium features like Timeline view and advanced reporting requiring costly upgrades for larger teams."* Bovendien wordt in blokken van 5/10/25/50 seats verkocht, dus je betaalt structureel voor ongebruikte plaatsen.

9. **De gratis tier is uitgehold van 15 → 10 → 2 gebruikers.** Wat ooit een bruikbaar teamplan was, is nu een demo. Voor kleine aannemers, ZZP-collectieven of pilots is Asana daarmee vanaf dag één een betaald product.

10. **Geen echte WBS-hiërarchie.** Maximaal 5 subtaakniveaus, **ouders rollen geen datums op uit kinderen** (thread 4404), slechts 50 subtaken zichtbaar in Timeline en 30 subtaken meegenomen in kolomberekeningen. Een klassieke bouw-WBS met summary-balken die de fase-einddatum tonen bestaat niet.

11. **Schaalbaarheidsplafonds die bij middelgrote projecten al pijn doen.** Kritiek pad stopt boven **2.000 taken met einddatum**; maximaal **30–45 afhankelijkheden per taak**; CSV-import gekapt op **2.000 rijen**; prestatieklachten al *"with hundreds of tasks"* (thread 1136693, april 2026); Gantt/Timeline/dashboards **kunnen niet geëxporteerd worden** (thread 1120538).

12. **Terugkerende reviewklachten buiten de planningsdomein:** notificatiemoeheid bij veel actieve projecten (Software Advice); resourcemanagement *"lacks robustness compared to competing solutions"* (Software Advice); support als grootste ergernis op PeerSpot, waar een manager klaagt dat het *"customer service team provide hands-on training"* tegen meerprijs, ondanks een enterprise-abonnement; en ondoorzichtige verkoop rond de Timesheets-add-on (forum 1107760, dec 2025).

13. **Leveranciersrisico is toegenomen.** Omzetgroei terug naar ~9%, **DBNRR van 96%** (bestaande klanten krimpen), marktkapitalisatie −55,6% in een jaar tot $1,58 mrd, nettoverlies $189 mln in FY2026, en een founder-CEO die in 2025 vertrok. De productstrategie is bovendien scherp gedraaid naar AI-agents (StackAI-overname mei 2026, "operating system for human-agent teams") — er is geen enkele aanwijzing dat planningsfunctionaliteit prioriteit krijgt.

---

## 6. Interoperabiliteit

### Overzicht formaten

| Formaat | Import | Export | Toelichting |
|---|:--:|:--:|---|
| **CSV** | ✅ | ✅ | Import max **2.000 rijen** × 2.000 kolommen; export uit project max 140.000 rijen, uit zoekresultaat 5.000 rijen. "Dependents" is sinds **oktober 2019** een mapbaar veld (forum 62154). Herhalingen (recurrence) niet importeerbaar. |
| **Excel (.xlsx)** | — | ✅ | Alleen vanuit **List-weergave**. |
| **JSON** | — | ✅ | Via API. |
| **PDF / afbeelding van Gantt** | — | ❌ | *"Currently we can only export a list view as a csv and excel file"* — dashboard, Timeline en Gantt zijn **niet exporteerbaar** (forum 1120538). |
| **MPP (Microsoft Project)** | ❌ | ❌ | Niet ondersteund. Microsoft Project staat niet in de Asana app-directory. |
| **MSPDI / Project XML** | ❌ | ❌ | Niet gevonden in documentatie, app-directory of forum. |
| **XER (Primavera P6)** | ❌ | ❌ | Niet ondersteund; Primavera ontbreekt volledig in het integratielandschap. |
| **P6 XML** | ❌ | ❌ | Niet ondersteund. |
| **IFC 4.3 / IfcWorkSchedule / IfcTask** | ❌ | ❌ | **Volledig afwezig.** Zoekopdrachten op "IFC", "BIM", "construction" in het Asana-forum geven **nul resultaten**. |
| **BCF, COBie, gbXML** | ❌ | ❌ | Niet ondersteund. |

### API — kwalitatief goed, inhoudelijk ontoereikend voor planning

De REST API (developers.asana.com) is technisch net in orde: OAuth 2.0 / OIDC / PAT, webhooks, batch requests, paginering, audit-log-events, 1.500 rpm op betaald.

**Maar de planningsdata die je nodig hebt, is niet blootgesteld:**

| Veld | Via API beschikbaar? | Bron |
|---|:--:|---|
| `start_on` / `due_on` (datum) | ✅ | developers.asana.com/reference/tasks |
| `start_at` / `due_at` (datetime, UTC) | ✅ | idem |
| Afhankelijkheidsrelatie (welke taak) | ✅ (`getDependenciesForTask`, `getDependentsForTask`) | idem |
| **Afhankelijkheidstype (FS/SS/FF/SF)** | **❌** | Dependency-objecten geven uitsluitend `gid` + `resource_type` terug. Forum 1081087 ("Dependency type should be provided by the API", juli 2025) en 1118522 (jan 2026). |
| **Lag/lead** | ❌ | Bestaat niet in het product |
| **Duur** | ❌ | Geen duurveld in het datamodel |
| **Kritiek pad / float** | ❌ | Niet berekend, niet blootgesteld |
| **Baseline-datums** | ❌ | Forum 838366 |
| Kosten/tarieven | Beperkt (alleen via Timesheets-add-on) | forum 1107760 |

Asana Ambassador Rithika Pujary formuleerde het probleem exact (15 januari 2026, thread 1118522): de API laat zien **welke** taken van elkaar afhangen maar niet **hoe** ze zich verhouden, waardoor automatisering *"forced to rely on assumptions rather than explicit rules"* is. Forumleider Phil Seeman voegde de thread samen met het bestaande verzoek en sloot hem op 16 januari 2026 — **zonder officiële Asana-reactie**.

### Specifieke betekenis voor een open-source, IFC-gebaseerde planner

Voor Open Planner Studio (IFC 4.3 als native formaat, `IfcWorkSchedule` / `IfcTask` / `IfcTaskTime` / `IfcRelSequence`) is Asana **geen uitwisselingspartner, hoogstens een eenrichtings-databron**.

**Wat je uit Asana zou kunnen halen (via API of CSV):**

| IFC-entiteit/attribuut | Bron in Asana | Kwaliteit |
|---|---|---|
| `IfcTask.Name` | `task.name` | Goed |
| `IfcTask.Identification` | `task.gid` of een custom field | Goed |
| `IfcTask.Description` | `task.notes` | Goed |
| `IfcTaskTime.ScheduleStart` | `start_on` / `start_at` | Redelijk (dag-granulair) |
| `IfcTaskTime.ScheduleFinish` | `due_on` / `due_at` | Redelijk |
| `IfcTaskTime.ScheduleDuration` | **niet beschikbaar** — moet worden **afgeleid** uit start/eind | Verliesgevend: zonder kalender is de afleiding kalenderdagen, geen werkdagen |
| `IfcRelSequence` (RelatingProcess/RelatedProcess) | dependencies-endpoint | Structuur ✅ |
| `IfcRelSequence.SequenceType` | **niet beschikbaar via API** | **Moet hard op `FINISH_START` gezet worden** — de andere drie types gaan verloren |
| `IfcRelSequence.TimeLag` | bestaat niet in Asana | Altijd `NULL` |
| `IfcTaskTime.IsCritical` / float | niet beschikbaar (en intern onjuist berekend) | Onbruikbaar |
| `IfcWorkCalendar` / `IfcWorkTime` | alleen een weekpatroon per project, geen feestdagen | Nagenoeg onbruikbaar |
| `IfcResource` / `IfcResourceTime` | assignee + Workload-effort | Zeer grof; geen resourcekalender, geen tarief in de publieke API |
| `IfcCostValue` | alleen via betaalde Timesheets-add-on | Niet via publieke API in gestructureerde vorm |
| Baseline (`IfcWorkSchedule` van type BASELINE) | niet via API | Onmogelijk |

**Praktische consequenties:**

1. **Round-trip is uitgesloten.** Je kunt niet exporteren naar Asana, daar laten bewerken en terug importeren zonder onherstelbaar verlies van sequence-type, lag, duur, kalender, float en baseline. Elke terugweg degradeert het schema tot "namen met datums".
2. **De import moet defensief zijn.** Bij het inlezen van Asana-data moet je expliciet aannemen dat elke `IfcRelSequence` een `FINISH_START` is met `TimeLag = NULL`, en dat markeren als *afgeleid/onbetrouwbaar* in de UI — anders liegt je eigen CPM-solver mee.
3. **De enige zinvolle rol van Asana in een IFC-workflow is de omgekeerde:** de IFC-planner is de bron van waarheid, en Asana krijgt een *afgeleide, uitvoerende takenlijst* geduwd (taak, verantwoordelijke, start, eind) voor operationele opvolging. Wijzigingen in Asana zijn dan statusinformatie (`% complete`, `actual start/finish`), niet planningsinformatie.
4. **CSV is voor volumes ongeschikt:** de importlimiet van 2.000 rijen betekent dat een schema van 6.000 activiteiten in minstens 3 batches moet, waarbij de "Dependents"-koppelingen over batchgrenzen heen breken (een dependent-verwijzing naar een taaknaam die nog niet bestaat, faalt). Bovendien breekt een komma in een taaknaam de dependency-kolom (forum 482223).
5. **Geen enkele BIM-brug bestaat.** Er is geen Procore-, Autodesk-, Bentley-, Revit- of Navisworks-integratie in de Asana app-directory. 4D-koppeling (schema ↔ geometrie) is fundamenteel onmogelijk omdat Asana geen concept van een object-ID heeft dat aan een IFC GlobalId gekoppeld kan worden, behalve via een zelfgebouwd custom field.

**Aanbeveling voor Open Planner Studio:** bouw hooguit een **eenrichtings-Asana-exporter** (IFC-schema → Asana-taken via de REST API, met de IFC GlobalId in een custom field) als operationele doorzetlaag. Investeer géén tijd in een Asana-importer als planningsbron; de data-integriteit is er niet.

---

## 7. Marktpositie

### Waar Asana sterk staat en waarom

Asana is **Leader in de Gartner Magic Quadrant for Collaborative Work Management 2025** (derde jaar op rij, gepubliceerd 30 oktober 2025) en **Leader in The Forrester Wave: Collaborative Work Management Tools, Q2 2025**, met de hoogst mogelijke scores op negen criteria waaronder Innovation, Roadmap en Enterprise Work Management.

**Let goed op de categorie.** Dit is *Collaborative Work Management* — niet *Adaptive Project Management and Reporting* en zeker niet *Construction Project Management*. Asana wint in de categorie "hoe krijgen honderden kenniswerkers hun werk zichtbaar en op elkaar afgestemd", niet in "hoe verdedig ik een contractueel schema bij een claim". Dat verschil verklaart alle bevindingen in dit profiel.

**Sterke punten in de markt:**
- Strategische alignering: portfolio's + Goals/OKR's + Work Graph. Gartner gaf Asana de **hoogste score voor de OKR-usecase (4,63/5)** van alle geëvalueerde leveranciers.
- Enterprise-brede uitrol bij niet-technische populaties: lage trainingslast, hoge tevredenheid (4,5/5 over 13.616 reviews op Software Advice).
- Amerikaanse publieke sector sinds FedRAMP Moderate (24 juni 2026 — ongeverifieerd).

### Belangrijkste concurrenten

**Directe (zelfde categorie):** monday.com, Smartsheet, Wrike, ClickUp, Atlassian (Jira / Jira Product Discovery / Trello), Microsoft Planner + Project for the web, Notion, Airtable, Adobe Workfront, Miro (deels), Basecamp.

**Aangrenzend (waar Asana níet mee concurreert maar wel mee verward wordt):** Oracle Primavera P6 / Primavera Cloud, Microsoft Project (desktop), Elecosoft Powerproject, Trimble TILOS, Deltek Acumen, Safran Planner, Bentley SYNCHRO, Procore, Buildertrend. In bouwplanning is Asana geen alternatief maar een categoriefout.

**Voor de opdrachtgever relevant:** een open-source, IFC-gebaseerde CPM-planner concurreert met de tweede groep, niet met Asana. Asana kan hoogstens naast zo'n planner staan als operationele takenlaag.

### Trend

De cijfers vertellen een duidelijk verhaal:

- Omzetgroei gedaald naar **~9%** (FY2026: $790,8 mln; guidance FY2027: +8,2–9,2%).
- **DBNRR 96%** — bestaande klanten geven per saldo *minder* uit.
- Marktkapitalisatie **−55,6%** op jaarbasis naar $1,58 mrd (24 juli 2026, koers $6,86).
- Nettoverlies FY2026 **−$189 mln**, wel 26% verbeterd.
- Analistenconsensus "Hold", koersdoel $9,13 (15 analisten).

**Strategische reactie:** een volledige pivot naar AI-agents. Overname van **StackAI voor $75 mln** (mei 2026); positionering als *"the operating system for human-agent teams"*; "AI Teammates" als add-on; AI Studio-credits als tier-differentiator (50k/75k/200k per maand). De persberichten van 2026 gaan uitsluitend over AI — **niet één over planningsfunctionaliteit**.

**Gebruikers-/klantaantallen:** Asana publiceert geen totaal aantal betalende klanten of gebruikers. Bekend is: **26.103 core-klanten (≥$5.000/jaar)** en **817 klanten ≥$100.000/jaar** per Q1 FY2027. **[SCHATTING]** Op basis van $790,8 mln omzet gedeeld door een gemiddelde betaalde prijs van circa $18–22 per gebruiker per maand ligt het aantal betaalde seats wereldwijd ruwweg tussen de **3,0 en 3,7 miljoen**. Dit is een eigen afleiding, geen door Asana bevestigd cijfer.

---

## 8. Eindoordeel

### Voor wie wél

- **Teams en programma's die coördinatie nodig hebben, geen netwerkplanning.** Marketingcampagnes, productreleases, operationele processen, onboarding, klantimplementaties: waar het werk parallel loopt, de afhankelijkheden zacht zijn en de deadlines afspraken zijn in plaats van contractuele verplichtingen, is Asana uitstekend.
- **Organisaties die portfolio- en OKR-overzicht willen op directieniveau** zonder een PMO-tool uit te rollen die niemand gebruikt.
- **Bedrijven die automatisering van herhalende werkstromen belangrijker vinden dan schemanauwkeurigheid.** De regelmotor is werkelijk sterk.
- **Als operationele "downstream"-laag naast een echte planningstool.** Dit is voor bouw de enige verdedigbare inzet: P6/MS Project/een IFC-planner is de bron van waarheid, Asana is waar de uitvoerende taken en checklists landen.

### Voor wie níet

- **Iedereen die een verdedigbaar schema moet opleveren.** Geen betrouwbaar kritiek pad, geen float, geen bruikbare baselines, geen kalenders, geen lag. Bij een vertragingsclaim heb je niets in handen.
- **Bouw, infrastructuur, industriële stilstanden, scheepsbouw, energie.** Geen feestdagenkalenders, geen ploegen, geen resource-leveling, geen kosten-/EVM-model, geen enkele BIM- of IFC-koppeling, geen bouwsector-integraties in de app-directory, geen enkele bouwdiscussie op het eigen forum.
- **Projecten boven ~2.000 activiteiten.** Het kritieke pad valt hard uit boven 2.000 taken met einddatum; prestatieklachten beginnen al bij enkele honderden taken in de Gantt.
- **Organisaties die schema-uitwisseling nodig hebben.** Geen XER, geen P6 XML, geen MPP, geen MSPDI, geen IFC. CSV is de enige uitweg en die verliest afhankelijkheidstype, lag, duur, kalender, float en baseline.
- **Kostenprijsbewuste organisaties met veel uitvoerenden.** Het per-gebruiker-model met verplichte Advanced-tier voor Workload maakt het duur zodra je meer dan een handvol mensen mee laat kijken.

### Is dit een serieus alternatief voor klassieke CPM-tools?

**Nee — en dat is geen grensgeval.**

Asana slaagt niet voor de basistest van netwerkplanning. Een CPM-tool neemt duur, kalender, logica en constraints als invoer en produceert datums en float als uitvoer. Asana neemt **datums als invoer** en tekent er balken bij. Alles wat daar bovenop is gebouwd — het "kritieke pad", de auto-shift, de baseline — is cosmetiek over een datamodel dat de onderliggende grootheden niet kent.

De vier afhankelijkheidstypen uit 2024 zijn de meest serieuze stap richting planning die Asana ooit heeft gezet, maar ze zijn twee jaar later nog steeds buggy (SS gedraagt zich als FF, valse conflictmarkeringen, geen betrokkenheid bij auto-shift) en **niet eens via de API zichtbaar**. Dat laatste is veelzeggend: als het dependency-type geen deel uitmaakt van het publieke datamodel, is het geen eerste-klas concept in het product maar een UI-attribuut.

De aantoonbaar foute kritieke-padberekening is het zwaarste bezwaar. Asana is er sinds 2023 herhaaldelijk op gewezen met reproduceerbare tegenvoorbeelden, heeft in april 2024 alleen toegezegd het te "onderzoeken", en heeft er per september 2025 niets aan gedaan. Ondertussen blijft de functie in het product staan onder de naam "critical path". Voor een planner die de term serieus neemt, is dat een integriteitsprobleem, geen featuregat.

**Voor Open Planner Studio betekent dit:** Asana is geen concurrent en geen migratiebron. Het is een categorie ernaast. De relevante lessen zijn eerder inspiratie dan waarschuwing — Asana's gebruiksgemak, zijn automatiseringsmotor en zijn portfolio-laag zijn stuk voor stuk domeinen waar klassieke CPM-tools zwak staan. Een IFC-planner die een *correcte* CPM-kern combineert met Asana's adoptiegemak zou een gat vullen dat vandaag door geen van beide kampen gedekt wordt.

---

## Bronnenlijst

**Leverancier — primair**
1. [Asana prijzen](https://asana.com/pricing) — geraadpleegd 25 juli 2026 (tiers, lijstprijzen, seat-increments, add-ons, featurematrix, "2 users" op Personal)
2. [Asana prijzen NL](https://asana.com/nl/pricing) — geraadpleegd 25 juli 2026 (prijzen in USD op NL-site; btw-clausule)
3. [Asana — over het bedrijf](https://asana.com/company) — geraadpleegd 25 juli 2026 (13 kantoren, Work Graph)
4. [Asana app-directory](https://asana.com/apps) — geraadpleegd 25 juli 2026 (integratiecategorieën; géén bouw/BIM/Primavera/MS Project)
5. [Asana press/newsroom](https://asana.com/press) — geraadpleegd 25 juli 2026 (AI-pivot, StackAI-berichtgeving)
6. [Asana Leader in Gartner MQ Collaborative Work Management 2025](https://asana.com/inside-asana/leader-in-2025-gartner-magic-quadrant-collaborative-work-management-report) — gepubliceerd 30 oktober 2025
7. [Asana Leader in Forrester Wave CWM Q2 2025](https://asana.com/inside-asana/leader-in-the-forrester-wave-collaborative-work-management-tools-2025) — gepubliceerd 13 november 2025

**Leverancier — technische documentatie**
8. [Asana Developers — API overview](https://developers.asana.com/docs/overview) — geraadpleegd 25 juli 2026 (OAuth/OIDC/PAT, webhooks, batch, audit logs)
9. [Asana Developers — Rate limits](https://developers.asana.com/docs/rate-limits) — geraadpleegd 25 juli 2026 (150/1.500 rpm, concurrency, kostenlimiet)
10. [Asana Developers — Tasks reference](https://developers.asana.com/reference/tasks) — geraadpleegd 25 juli 2026 (dependency-endpoints geven alleen `gid`+`resource_type`; `start_at`/`due_at`; géén type/lag/duur/critical path)
11. [Asana Help Center](https://help.asana.com/) — geraadpleegd 25 juli 2026 (structuur; artikelinhoud is JS-gerenderd en niet machinaal leesbaar)

**Financieel**
12. [Asana Investor Relations](https://investors.asana.com/) — geraadpleegd 25 juli 2026
13. [Asana Q4 & FY2026 resultaten](https://investors.asana.com/news-releases/news-release-details/asana-announces-fourth-quarter-and-fiscal-year-2026-results/) — 2 maart 2026 ($790,8 mln FY26; Q4 $205,6 mln; 25.928 core; 817 × $100k+; DBNRR 96%)
14. [Asana Q1 FY2027 resultaten](https://investors.asana.com/news-releases/news-release-details/asana-announces-first-quarter-fiscal-2027-results/) — 28 mei 2026 ($205,1 mln; +9,5%; 26.103 core; guidance FY27)
15. [stockanalysis.com — ASAN](https://stockanalysis.com/stocks/asan/) — geraadpleegd 24/25 juli 2026 (marktkap $1,58 mrd; koers $6,86; 1.767 medewerkers; nettoverlies)
16. [Vendr buyer guide — Asana](https://www.vendr.com/buyer-guides/asana) — dataset t/m februari 2026 (gemiddeld contract $42.000; prijs per staffel; kortingen)

**Historie en eigendom**
17. [Wikipedia — Asana (software)](https://en.wikipedia.org/wiki/Asana_(software)) — geraadpleegd 25 juli 2026 (oprichting, funding, IPO, CEO-wissel, StackAI, Moskovitz 53%)

**Reviewplatforms**
18. [Software Advice — Asana reviews](https://www.softwareadvice.com/project-management/asana-profile/reviews/) — geraadpleegd 25 juli 2026 (4,5/5 over 13.616 reviews; sterrenverdeling; prijs- en resourcemanagementkritiek)
19. [PeerSpot — Asana reviews](https://peerspot.com/products/asana-reviews) — geraadpleegd 25 juli 2026 (4,1/5 over 57 reviews; 87% aanbeveling; supportkritiek)
> G2, Capterra, TrustRadius, Gartner Peer Insights, Reddit (r/projectmanagement, r/construction), TechRepublic, PCMag, Cloudwards en Forbes Advisor blokkeerden geautomatiseerde toegang (HTTP 403/503) op de onderzoeksdatum en zijn daarom **niet** in dit profiel verwerkt. De reviewbevindingen leunen op Software Advice, PeerSpot en het Asana Community Forum.

**Asana Community Forum (vakforum — primaire bron voor tekortkomingen)**
20. [Thread 236641 — "List of technical and data limitations in Asana"](https://forum.asana.com/t/236641) — gestart 23 oktober 2022, bijgewerkt t/m 16 juli 2026 (alle harde limieten)
21. [Thread 479444 — "Improve critical path"](https://forum.asana.com/t/479444) — 39 posts, tag `considered`; foutbewijs sept 2023 en juli 2024; Asana-reactie 30 april 2024
22. [Thread 99691 — "Increase Task Dependency Options"](https://forum.asana.com/t/99691) — feature request vanaf november 2020; **bevat géén lanceringsaankondiging** (gecontroleerd 25-07-2026)
22b. [Help Center — How to use task dependencies](https://help.asana.com/s/article/how-to-use-task-dependencies) — bevestigt FS/FF/SS/SF als ondersteunde typen
23. [Thread 885797 — "Mastering Advanced Task Dependencies in Asana"](https://forum.asana.com/t/885797) — Christine Bolton, 12 augustus 2024; lag-time afgewezen; SS/FF-bugs
24. [Thread 94528 — "Adding Set Date Ranges to Dependencies"](https://forum.asana.com/t/94528) — gesloten 27 april 2022; *"No you can't"*; Flowsana als workaround
25. [Thread 215172 — "Introducing a new option to shift dependent tasks in your Timeline"](https://forum.asana.com/t/215172) — 2 januari 2023; weekendondersteuning 27 januari 2023; beperkingen
26. [Thread 20537 — "Adding time length to tasks (for Timeline)"](https://forum.asana.com/t/20537) — 94 posts sinds 22 april 2018 t/m juli 2025; duur-driver ontbreekt
27. [Thread 1136693 — "Native Advanced Gantt Chart & Full Dependency Types (SS, FF, SF, FS)"](https://forum.asana.com/t/1136693) — 16 april 2026; prestatieklachten, ontbrekende lag, Instagantt/GanttPRO-vergelijking
28. [Thread 1118522 — dependency-typen niet via API](https://forum.asana.com/t/1118522) — 15 januari 2026; samengevoegd met 1081087 (16 juli 2025) en gesloten zonder Asana-reactie
29. [Thread 1127584 — "Creating due dates from durations (in days)"](https://forum.asana.com/t/1127584) — MS Project-migrant
30. [Thread 4404 — "Project Folders (sub-teams)"](https://forum.asana.com/t/4404) — geen rollup van subtaakdatums naar ouder
31. Baseline-threads: [39009](https://forum.asana.com/t/39009), [1104074](https://forum.asana.com/t/1104074), [1105375](https://forum.asana.com/t/1105375), [838366](https://forum.asana.com/t/838366), [1097147](https://forum.asana.com/t/1097147), [923685](https://forum.asana.com/t/923685), [1142498](https://forum.asana.com/t/1142498)
32. Workload-threads: [84004](https://forum.asana.com/t/84004) (uren gelijk verdeeld), [434658](https://forum.asana.com/t/434658) (afronding), [756815](https://forum.asana.com/t/756815) (onjuiste uren), [415168](https://forum.asana.com/t/415168) (indicator), [1143806](https://forum.asana.com/t/1143806) (OOO telt niet mee), [52540](https://forum.asana.com/t/52540) (geen taakgewichten)
33. Kalender-/werkdagthreads: [1021225](https://forum.asana.com/t/1021225) (project schedule settings), [1089416](https://forum.asana.com/t/1089416) (feestdagen — openstaand), [18792](https://forum.asana.com/t/18792) (126 posts, weekenden), [27484](https://forum.asana.com/t/27484)
34. [Thread 1120538 — "Ability to export views to use in presentations"](https://forum.asana.com/t/1120538) — Gantt/Timeline/dashboard niet exporteerbaar
35. [Thread 1107760 — "Introducing Asana's Timesheets & Budgets Add-On"](https://forum.asana.com/t/1107760) — 20 november 2025; alleen Advanced+ jaarcontract; prijsklachten dec 2025
36. [Thread 1137286 — "Timesheets and Budgets Add-On Now Available for All Customers"](https://forum.asana.com/t/1137286) — self-service, 14 dagen proef
37. [Thread 62154](https://forum.asana.com/t/62154) / [111291](https://forum.asana.com/t/111291) / [482223](https://forum.asana.com/t/482223) — CSV-importer en "Dependents"-kolom (oktober 2019), komma-probleem
38. [Thread 631260 — "Free users - 10 or 15"](https://forum.asana.com/t/631260) — 11 december 2023: Basic 15 → Personal 10
39. [Thread 25689](https://forum.asana.com/t/25689) / [1078984](https://forum.asana.com/t/1078984) — Instagantt als workaround voor multi-project timelines en Gantt-gaten

---

*Opgesteld 25 juli 2026. Alle bedragen in USD tenzij anders vermeld. Berekende en geschatte waarden zijn in de tekst gemarkeerd met [berekend] respectievelijk [SCHATTING].*

---

## Verificatie

**Adversariële fact-check uitgevoerd 25 juli 2026.** Werkwijze: van elke bewering is actief geprobeerd haar te *weerleggen* met een onafhankelijke of primaire bron (asana.com/pricing, developers.asana.com, help.asana.com, investors.asana.com, stockanalysis.com, vendr.com, Wikipedia, Asana Community Forum). Beweringen die niet hard te maken waren, zijn als **onzeker** gemarkeerd in plaats van stil te blijven staan.

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 1 | Lijstprijzen Starter $10,99 jaarlijks / $13,49 maandelijks; Advanced $24,99 / $30,49; Enterprise(+) op aanvraag; "save up to 18%" bij jaarfacturering | **bevestigd** — twee onafhankelijke ophalingen van de prijspagina geven exact deze bedragen; 1 − 10,99/13,49 = 18,5% en 1 − 24,99/30,49 = 18,0%, dus "tot 18%" klopt rekenkundig | https://asana.com/pricing |
| 2 | Gratis Personal-tier beperkt tot **2 gebruikers**; historisch 15 (Basic) → 10 (Personal, dec 2023) → 2 | **bevestigd** — prijspagina citeert letterlijk *"Up to 2 users can collaborate for free"*; Richard Sather, 11-12-2023: *"The maximum amount of users on a Basic plan was 15, but on the Personal tier it is now down to 10."* | https://asana.com/pricing · https://forum.asana.com/t/631260 |
| 3 | Geen absoluut seat-minimum, maar verkoop in blokken: 1 (2–5 gebruikers), 5 (tot 30), 10 (tot 100), 25 (tot 500), 50 (500+) | **bevestigd** — staffels exact zoals op de prijspagina | https://asana.com/pricing |
| 4 | Timesheets & Budgets $5,99 p/gebruiker/maand jaarlijks, **uitsluitend op Advanced/Enterprise(+) met jaarcontract** | **gecorrigeerd** — de prijs ($5,99, "billed annually") klopt, maar de plan-beperking niet: prijspagina én forumaankondiging noemen **Starter, Advanced, Enterprise en Enterprise+**. De Advanced+-beperking gold bij de lancering (nov 2025) en verviel bij de self-service-uitrol van **20 april 2026**. Een expliciete *jaarcontract*-eis is nergens gedocumenteerd; alleen de prijs is jaarlijks gefactureerd. §2.4, §3 en nadeel 8 aangepast | https://asana.com/pricing · https://forum.asana.com/t/1137286 |
| 5 | Timeline/Gantt vereist Starter; Workload, portfolio's en Goals vereisen Advanced; universal workload en capacity planning vereisen Enterprise | **bevestigd** — featurematrix op de prijspagina bevestigt Gantt vanaf Starter en Portfolios/Goals/Workload vanaf Advanced | https://asana.com/pricing |
| 6 | Vendr: gemiddeld/mediaan contract $42.000/jaar; bandbreedte $7.497–$142.800; gemiddelde korting 14,84%; 455–481 deals; dataset t/m februari 2026 | **bevestigd** (kerncijfers) | https://www.vendr.com/buyer-guides/asana |
| 7 | Vendr-staffels: 50 gebruikers Advanced $20–24; 100 gebruikers $18–22; 500+ Enterprise meerjarig $22–28; Q4-timing +5–15% korting; concurrerende evaluatie +15–25% | **gecorrigeerd** — deze indeling staat niet in de gids. Vendr publiceert: Starter 20–100 gebruikers **$8–11**; Advanced 100–500 gebruikers **$18–24**; Enterprise 500–2.000 gebruikers **$22–32** (custom-basis $30–40+); volume + meerjarig samen **20–35%** onder lijst. Tabel in §3 vervangen | https://www.vendr.com/buyer-guides/asana |
| 8 | Rekenvoorbeeld: 25 gebruikers Advanced + Timesheets ≈ $9.294/jaar lijstprijs | **bevestigd** — 25 × $299,88 = $7.497 en 25 × $71,88 = $1.797, samen $9.294. Rekenkundig juist bij de geverifieerde lijstprijzen | eigen herberekening op geverifieerde prijzen |
| 9 | Asana heeft geen echte CPM-engine: "critical path" is een langste-ketenheuristiek die float negeert en aantoonbaar het verkeerde pad kiest | **bevestigd** — thread 479444 documenteert onjuiste padkeuze, negeren van float en strijdigheid met de standaarddefinitie (ISO 21500); officiële reactie Emily Roman 30-04-2024 (*"I'll create a task to our product team to investigate further"*), status nog steeds `considered` | https://forum.asana.com/t/479444 |
| 10 | Citaat `@Jan-Rienk` (31 juli 2024): kritiek pad **"plainly wrong and misleading"** | **gecorrigeerd** — deze formulering en datum zijn bij herlezing niet teruggevonden. Wél geverifieerd van dezelfde auteur: *"the purpose of critical path in project management is to be aware of the path that can't afford any delays"* en *"Using the critical path in this instance would work to delay the project rather than ensure it is completed on time."* Citaat vervangen in §2.1 en nadeel 1 | https://forum.asana.com/t/479444 |
| 11 | Vier afhankelijkheidstypen (FS/SS/FF/SF) gelanceerd op **28 juni 2024** door Emily Roman in thread 99691, met letterlijk citaat | **gecorrigeerd** — dát de vier types bestaan is bevestigd door het Help Center (*"Finish-to-Start, Finish-to-Finish, Start-to-Start, and Start-to-Finish"*). Maar thread 99691 bevat géén lanceringsaankondiging: het is een feature request uit november 2020 die t/m eind 2022 nog om die types vraagt. Het citaat en de datum 28-06-2024 zijn niet verifieerbaar. Hardste datering is nu "uiterlijk augustus 2024" (introductiethread 885797, Christine Bolton, 12-08-2024). §2.2, voordeel 2 en bronnenlijst aangepast | https://help.asana.com/s/article/how-to-use-task-dependencies · https://forum.asana.com/t/99691 · https://forum.asana.com/t/885797 |
| 12 | Geen lag/lead time; SS-bugs (gedraagt zich als FF, valse rode conflictmarkering) | **bevestigd** — Christine Bolton (Asana) op de lag-vraag: *"At this time, Asana does not release their product roadmap. I searched in the Forum for a found this product feedback request that you can upvote!"* — geen toezegging. Holly Day (21-08-2024) bevestigt het SS-blokkeergedrag; de valse rode conflictmarkering staat in de thread | https://forum.asana.com/t/885797 |
| 13 | Harde limieten: kritiek pad stopt boven 2.000 taken met einddatum; 30–45 afhankelijkheden per taak; 5 subtaakniveaus; 50 subtaken in Timeline; 300 taken p.p. in Workload; 1.500 projecten per portfolio; multi-homing 20; CSV-import 2.000 rijen/kolommen; CSV-export 140.000 resp. 5.000 rijen; 150 custom fields; 50 regels | **bevestigd** — alle genoemde waarden komen exact overeen met de limietenlijst (bijgewerkt t/m juli 2026) | https://forum.asana.com/t/236641 |
| 14 | API: 150 rpm gratis / 1.500 rpm betaald; 50 gelijktijdige GET, 15 schrijf; Search 60 rpm; 5 gelijktijdige export-/duplicatiejobs; kostengebaseerde limiet; 429 met `Retry-After` | **bevestigd** — alle waarden exact | https://developers.asana.com/docs/rate-limits |
| 15 | Financieel: FY2026-omzet $790,8 mln (+9%); Q1 FY27 $205,1 mln (+9,5%); 26.103 core-klanten (+7%); 817 klanten ≥$100k (+12%); DBNRR 96%/97%/96%; guidance FY27 $855,5–863,5 mln | **bevestigd** — alle cijfers exact zoals in het IR-persbericht van 28 mei 2026 (guidance bevat ca. 50 bp van StackAI) | https://investors.asana.com/news-releases/news-release-details/asana-announces-first-quarter-fiscal-2027-results/ |
| 16 | Beurs: koers $6,86, marktkap $1,58 mrd, nettoverlies FY26 −$189,0 mln, 1.767 medewerkers, consensus "Hold" met koersdoel $9,13 (15 analisten) | **bevestigd** — alle waarden exact per 24-07-2026. Kanttekening: de **−55,6% op jaarbasis** is niet als zodanig op de bron te lezen; wel een 52-weeksbereik van $5,38–$15,71, wat een daling van die orde plausibel maakt | https://stockanalysis.com/stocks/asan/ |
| 17 | Bedrijf: opgericht 16-12-2008; directe notering NYSE sept 2020 bij ca. $5,5 mrd; Dan Rogers CEO sinds 21-07-2025; Moskovitz ca. 53% van de stemrechten; StackAI overgenomen mei 2026 voor $75 mln | **bevestigd** — alle punten. Kanttekening: Wikipedia noemt bij Rogers ook Rubrik naast ServiceNow en LaunchDarkly | https://en.wikipedia.org/wiki/Asana_(software) |
| 18 | Software Advice: 4,5/5 over 13.616 reviews; 8.094 × 5 sterren; 233 reviews van 1–2 sterren; ease-of-use 4,4; value for money 4,4; prijs als hoofdklacht | **bevestigd** — exacte verdeling 8.094 / 4.370 / 919 / 131 / 102; 131 + 102 = 233 klopt. Prijs en notificatiemoeheid staan als hoofdklachten genoemd | https://www.softwareadvice.com/project-management/asana-profile/reviews/ |
| 19 | Gartner MQ Collaborative Work Management: Leader, derde jaar op rij; hoogste score van alle leveranciers voor de OKR-usecase (4,63/5) | **bevestigd**, met datumcorrectie: de publicatie is van **30 oktober 2025**, niet 28 oktober. Overal in het document aangepast | https://asana.com/inside-asana/leader-in-2025-gartner-magic-quadrant-collaborative-work-management-report |
| 20 | Geen enkele bouw-/BIM-/engineering-integratie in de app-directory (geen Procore, Autodesk, Revit, Navisworks, Bentley, Primavera, MS Project) | **bevestigd** — geen van deze namen komt voor; de veertien categorieën zijn uitsluitend kenniswerk-georiënteerd | https://asana.com/apps |
| 21 | FedRAMP Moderate voor Asana Gov sinds **24 juni 2026** | **onzeker** — niet te verifiëren: asana.com/press en /press/releases leverden geen bijbehorend persbericht op en de FedRAMP Marketplace is JS-gerenderd en niet machinaal leesbaar. De claim is in §1, voordeel 7 en §7 als ongeverifieerd gemarkeerd | — |
| 22 | **[SCHATTING]** 3,0–3,7 miljoen betaalde seats wereldwijd, afgeleid uit $790,8 mln ÷ $18–22 p/gebruiker/maand | **onzeker (maar rekenkundig consistent)** — $790,8 mln ÷ $264/jaar = 3,00 mln en ÷ $216/jaar = 3,66 mln, dus de afleiding klopt intern. De ingaande aanname (gemiddeld $18–22) is echter zelf een schatting en Asana publiceert geen seat-aantal. Blijft terecht als [SCHATTING] gemarkeerd; niet als feit gebruiken | eigen herberekening |

### Samenvattend

- **Bevestigd:** 16 van 22 beweringen, waaronder alle lijstprijzen, seat-staffels, harde product- en API-limieten, de volledige financiële set en de onjuistheid van het kritieke pad. De harde kern van het profiel — Asana is geen CPM-tool — houdt volledig stand.
- **Gecorrigeerd:** 4 beweringen. Eén materieel (Timesheets & Budgets is niet Advanced-only maar vanaf Starter beschikbaar), één significant (de Vendr-staffels waren verzonnen banden), twee betreffen niet-verifieerbare citaten/datering (kritiek-padcitaat, lanceerdatum afhankelijkheidstypen).
- **Onzeker:** 2 beweringen (FedRAMP-datum; geschat aantal betaalde seats).
- **Patroon om op te letten:** de fouten zitten niet in de cijfers die uit een tabel komen, maar in **verbatim citaten met precieze datums** en in **fijnmazige staffels** die net iets specifieker zijn dan de bron toelaat. Twee van de vier correcties zijn van dat type; behandel losse citaat-plus-datum-combinaties in dit profiel met terughoudendheid tenzij ze hierboven expliciet bevestigd zijn.
