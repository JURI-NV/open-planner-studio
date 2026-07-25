# GanttProject — diepgaand softwareprofiel

**Onderzoeksdatum:** 25 juli 2026
**Analist:** marktonderzoek planningssoftware
**Categorie:** open-source desktop-Gantt / lichte projectplanning
**Onderzochte versie:** GanttProject 3.3.x (stabiel), 3.4 Beta IV (11 mei 2026)

> **Methodologische noot.** Dit profiel is opgebouwd uit primaire bronnen: de leverancierssite, de officiële documentatie (`docs.ganttproject.biz`), het officiële supportforum (`help.ganttproject.biz`, Discourse — doorzocht via de JSON-API), de GitHub-repository, en reviewplatforms (Capterra, SourceForge, AlternativeTo).
> **Beperkingen van deze ronde die je moet kennen:**
> - Het WebSearch-budget van de sessie was uitgeput; al het onderzoek is via directe WebFetch op bekende en via sitemaps gevonden URL's gedaan. Er zijn dus geen brede zoekopdrachten uitgevoerd.
> - **G2** (`g2.com/products/ganttproject/reviews`) en **TrustRadius** (`trustradius.com/products/ganttproject/reviews`) gaven **HTTP 403**; **Reddit** is door de omgeving geblokkeerd; **web.archive.org** eveneens. Gebruikersgeluid komt daarom uit Capterra, SourceForge, AlternativeTo en — vooral — het officiële forum, dat in de praktijk de rijkste en eerlijkste klachtenbron is (de hoofdontwikkelaar antwoordt er zelf, vaak ontwapenend direct).
> - ~~`www.ganttproject.biz` en `ganttproject.cloud` zijn client-side JavaScript-SPA's; diepe pagina's waren niet uitleesbaar.~~ **[GECORRIGEERD in de verificatieronde van 25-07-2026]** Dit klopte niet en heeft in de eerste versie een onterecht "prijs niet vaststelbaar"-oordeel veroorzaakt. `www.ganttproject.biz` levert bij een rechtstreekse `curl` gewoon volledige HTML-inhoud op. En hoewel `ganttproject.cloud` inderdaad een lege Vue-shell rendert, staan de complete prijs- en ToS-teksten als statische strings in de bundel `https://ganttproject.cloud/js/about.js` — daarmee is **alle** Cloud-prijsinformatie publiek verifieerbaar. Zie §3.2. Les voor volgende profielen: bij een SPA altijd de JS-bundels ophalen en doorzoeken vóór je "niet vaststelbaar" concludeert.
> - Alle schattingen zijn gemarkeerd met **[SCHATTING]**. Claims uit achtergrondkennis die in deze ronde niet primair geverifieerd zijn, staan als **[NIET GEVERIFIEERD]**.

---

## 1. Wat het is

### Product in één zin
GanttProject is een gratis, open-source **desktop**-applicatie (GPLv3) voor het tekenen en doorrekenen van Gantt-schema's, gepositioneerd als "Gantt chart for small and medium businesses. Local-first, works offline on Windows, macOS and Linux" (ganttproject.biz, opgehaald 25-07-2026).

### Leverancier en eigendom
- **Ontwikkelaar/eigenaar:** BarD Software s.r.o. — **[GECORRIGEERD]** gevestigd in **Tsjechië**, niet in Slowakije. AlternativeTo vermeldt "Slovakia", maar dat is aantoonbaar fout: de eigen Terms of Service en Privacy Policy zeggen driemaal letterlijk *"BarD Software s.r.o., a limited liability company **registered in Czech Republic**"* respectievelijk *"a privately held company registered in Czech Republic"* (ganttproject.cloud, opgehaald 25-07-2026). Primaire bron gaat hier vóór het reviewplatform. De bedrijfssite `bardsoftware.com` gaf HTTP 403 en kon niet geverifieerd worden; contactadres is `contact@ganttproject.cloud`.
- **Boegbeeld/lead:** **Dmitry Barashev** (GitHub-handle `dbarashev`). Hij is aantoonbaar de dominante figuur: hij is "most recent poster" op vrijwel alle forumthreads, schrijft de feature-requests zelf in de issue-tracker, en beantwoordt supportvragen persoonlijk.
- **Historie:** de site claimt "established in 2003". Dat het project oorspronkelijk door **Alexandre Thomas** is gestart en later door BarD Software is overgenomen, is algemeen gedocumenteerd maar in deze ronde **[NIET GEVERIFIEERD]**.
- **Teamgrootte:** **[SCHATTING]** effectief 1–3 personen. Onderbouwing: 6.077 commits over ~22 jaar, **1.082 GitHub-sterren en 339 forks**, **471 open issues + PR's** (GitHub API, 25-07-2026; de eerdere telling 456 issues + 15 PR's komt op precies datzelfde totaal), en één persoon die de volledige support draait. Dit is een klein, ontwikkelaar-gedreven project, geen softwarebedrijf met een productteam.

### Businessmodel
Drieledig, maar in de praktijk vooral het eerste:
1. **Gratis download** van de desktop-app onder GPLv3, met "pay-what-you-wish"-donatie bij de download.
2. **GanttProject Cloud** — een commerciële collaboratie-/opslagdienst voor de desktop-app (zie §3).
3. Merchandising/nevenlinks (de sitemap bevat zelfs een link naar een externe webshop `esther-clay-creatures.studio?utm_source=gp`) — een teken van de zeer beperkte commerciële schaal.

### Doelgroep, typische gebruikers, sectoren, regio's
- **Doelgroep volgens leverancier:** **[GECORRIGEERD]** de homepage noemt onder "GanttProject is For You" als **eerste** doelgroep letterlijk *"Project managers in **construction**, architecture, engineering, media production and other industries"*, gevolgd door *"Small and medium-sized companies seeking affordable solutions"* en *"Agile teams working on different computer platforms"*. De leverancier **positioneert zich dus expliciet op de bouw** — een eerdere versie van dit profiel stelde ten onrechte dat bouw als doelgroep ontbrak. Dat maakt de functionele analyse in §2 alleen maar scherper: de claim wordt gemaakt, de bijbehorende functionaliteit (uren, resourcekalenders, leveling, XER/IFC) ontbreekt volledig. Behandel de bouwpositionering als **marketing, niet als capability**.
- **Feitelijke gebruikers** (op basis van reviewprofielen op Capterra/SourceForge en forumtaal): **onderwijs** (docenten en studenten die een Gantt moeten inleveren), **kleine adviesbureaus en zzp'ers**, **non-profits en overheden met beperkt budget**, en **Linux-gebruikers** die geen MS Project kunnen draaien. Capterra vat het samen als "small to medium teams and individuals needing straightforward Gantt chart creation without budget constraints".
- **Bouw/infra specifiek:** de leverancier **noemt** bouw wel als doelgroep (zie hierboven), maar er is geen spoor van bouwspecifieke **functionaliteit** of van een bouwspecifieke functiediscussie. **[GECORRIGEERD]** Een aparte forumzoekopdracht geeft: `IFC` → **0 treffers** (bevestigd), `BIM` → **1 treffer**, niet nul — de thread *"GANTT PROJECT x LAST PLANNER SYSTEM"*, over Lean-bouwplanning. `construction` geeft 19 treffers, maar dat zijn overwegend generieke bug- en importvragen van gebruikers die toevallig in de bouw zitten, geen functionele bouwdiscussie. De tool wordt in de bouw hooguit ad hoc gebruikt voor een globale fasering, niet als werkvoorbereidingsplanning.
- **Regio's:** **[GECORRIGEERD]** de leverancier claimt niet "een paar duizend wekelijkse gebruikers" maar *"A few thousands of people **download** GanttProject weekly"* — dat zijn **downloads, geen actieve gebruikers**, wat een wezenlijk ander (en voor de installed-base-schatting gunstiger) cijfer is. Verder: *"They can be found in nearly 200 countries on all continents and speak **25+ languages**"* (ganttproject.biz, 25-07-2026). Het aantal van 18 talen in een eerdere versie kwam uit SourceForge en betreft de daar gepubliceerde vertalingenlijst; de leverancier claimt zelf 25+. Het forum bevat threads in het Frans, Duits, Spaans en Italiaans. Sterke penetratie in **Europa en Latijns-Amerika** **[SCHATTING]**, mede door de gratis licentie en de sterke lokalisatie.

---

## 2. Functionaliteit en techniek — streng beoordeeld

### 2.1 Is er een échte CPM-engine?

**Gedeeltelijk. GanttProject is méér dan een balkentekenaar, maar minder dan een CPM-tool.**

Dit is het scherpste onderscheid in dit hele profiel, dus laten we het precies maken.

**Wat er wél is** — de officiële documentatie ("GanttProject Scheduler Explained", `docs.ganttproject.biz/user/scheduler/`) beschrijft een echte **constraint-propagatie-scheduler** die na elke wijziging draait en taakdata zo kiest dat de projectduur geminimaliseerd wordt:
- Er is een **echte voorwaartse doorrekening** (forward pass) over het netwerk van afhankelijkheden.
- Er zijn **vier afhankelijkheidstypen**: Finish-Start, Finish-Finish, Start-Start, Start-Finish — volledig aanwezig, in tegenstelling tot de meeste moderne werkbeheertools die alleen FS kennen.
- **Lag** wordt ondersteund, zowel **positief als negatief** (lead). Dat is functioneel gelijkwaardig aan klassieke CPM-tools.
- Er is een concept **"hardness"** per relatie: **Strong** (gelijkheid — de opvolger schuift mee in beide richtingen) versus **Rubber** (ongelijkheid — de lag mag oprekken). Dit is een eigenzinnige maar doordachte toevoeging die MS Project niet heeft.
- **Kritiek pad wordt berekend en getoond.** Het forum bevestigt een werkende toggle "Show Critical Path" / "Hide Critical Path" (meerdere threads, o.a. "Critical Path — change color and/or pattern"). **Belangrijke nuance uit de verificatieronde:** het kritieke pad is *uitsluitend* een visualisatie. Een gebruiker stelt vast — onweersproken — dat *"the critical path is not an existing attribute for tasks, in GP, to be filtered by"*, en er loopt een open verzoek "Boolean flag indicating if a task is on critical path". Je kunt er dus niet op filteren, niet op sorteren en het niet exporteren; je moet naar Excel exporteren en het zelf afleiden. Voor rapportage is dat een reële beperking bovenop het ontbreken van float.
- **Verzameltaken (summary tasks)** leiden hun data af uit hun kinderen en zijn sinds 2.8 niet handmatig bewerkbaar — netjes, en correcter dan tools die verzameltaken vrij laten slepen.

**Wat er níet is — en dit is fataal voor serieus CPM-werk:**

| Klassiek CPM-onderdeel | GanttProject | Bron |
|---|---|---|
| Achterwaartse doorrekening zichtbaar (late start / late finish) | **Nee** — geen kolommen | Forumthreads "Latest start date for tasks", "Cannot visualize Float" |
| **Total float / slack als waarde** | **Nee** — alleen binair "wel/niet kritiek" | GitHub issue **#1906 "A column indicating task float"**, geopend door de ontwikkelaar zelf op 7 mei 2021, **nog steeds open** |
| Free float | Nee | idem |
| **Deadline / Finish-No-Later-Than-constraint** | **Nee** | Forumthreads #5416, #11473 — herhaalde, onbeantwoorde feature-requests |
| Must-Start-On / As-Late-As-Possible | Nee | Documentatie noemt uitsluitend één constrainttype |
| **Resource-leveling** | **Nee, categorisch** | FAQ (forum topic 8): *"Can GanttProject do resource leveling? No."* Barashev: *"there is no resource leveling of any kind in GanttProject, sorry."* |
| Effort-driven scheduling (werk = duur × units) | **Nee** | Forum #9456: gebruiker meldt "The resource is working 50% registered in the field 'units', however this does not have an impact on duration"; #4826 vraagt hier expliciet om |
| Uren/sub-dag-duren | **Nee** | FAQ: *"Is it possible to use hours as task duration? No. In GanttProject tasks are measured in days, sorry."* |
| Werkelijke start/einde (actuals) | Nee | Forum #2151, #433 — Barashev verwijst naar baselines als enige vergelijkingsmechanisme |
| Earned Value / verdiende waarde | Nee | Forum #12176: *"GanttProject can compare task dates using Baselines, but not the costs"* |
| Multi-project / gekoppelde subprojecten | Beperkt/nee | Forum "Can u include one project in another?" |
| Monte-Carlo / risicoanalyse | Nee | — |

**De enige constraint die bestaat** is **"Earliest begin"** (start-niet-eerder-dan): *"Task which has non-empty constraint Earliest begin can't be started earlier than the date specified"* (scheduler-documentatie). Eén constrainttype, waar MS Project er acht heeft en P6 er nog meer.

**Verdict op de engine:** GanttProject heeft een **echte, correct werkende netwerkscheduler met een halve CPM-implementatie**. De voorwaartse doorrekening is er, het kritieke pad wordt daadwerkelijk afgeleid, en alle vier de relatietypes met lags werken. Maar de **achterwaartse doorrekening is niet blootgesteld aan de gebruiker**: je kunt niet zien hoeveel speling een taak heeft, alleen of hij toevallig nul speling heeft. Voor een planner is "waar zit mijn speling en hoeveel" de kernvraag — en die kan GanttProject niet beantwoorden. Het is dus **geen vervanging voor een klassieke CPM-tool**, maar het is ook nadrukkelijk **niet** de categorie "tekent alleen balken zonder netwerklogica" waar Trello, Monday, Asana Timeline en Notion in vallen. Het zit er duidelijk boven.

### 2.2 Kalenders

- **Projectkalender** met weekenden en feestdagen.
- **iCalendar-import (.ics)** voor feestdagenkalenders sinds 2.7 "Ostrava" (2015/2016) — je kunt bijvoorbeeld Mozilla Holiday Calendars inladen.
- **Weekend-uitzonderingen**: specifieke weekenddagen als werkdag markeren (inhaaldagen). Netjes gedaan.
- **Geen echte resourcekalenders.** Dit is een van de ernstigste tekortkomingen en verdient een letterlijk citaat. Over vakantiedagen in resource-eigenschappen zegt de ontwikkelaar: ***"Vacations (days off in resource properties) show up as yellow bars on the chart. They do not have any other meaning except for yellow color."*** Vakanties zijn dus **puur cosmetisch** — de scheduler negeert ze volledig. Je kunt een taak zonder waarschuwing plannen midden in de vakantie van de enige toegewezen medewerker (forum #505, #1394, #2060, #11528 — de laatste uit januari 2025, dus de situatie is niet veranderd).
- **Geen deeltijdbeschikbaarheid** (halve dagen, ploegendiensten) — feature-request #520, niet geïmplementeerd.
- **Geen ploegen-/meerploegenkalenders**, wat voor infra- en industriebouw disqualificerend is.

### 2.3 Resourcemodel

- Resources met **rollen**, toewijzing aan taken met een **units-percentage**.
- **Resource load chart** (belastingsdiagram) met kleurcodering voor overbelasting — je **ziet** overbelasting dus wel, maar de tool doet er niets mee en kan er niets aan veranderen.
- **Geen leveling, geen smoothing, geen automatische herplanning op capaciteit.**
- Resource-import uit een teamdatabase in de Cloud sinds 3.1 (mei 2023).
- Klachten dat resource-namen "greyed out" zijn bij Cloud-import (forum, 18-11-2024).

### 2.4 Kostenmodel

- Sinds **2.7 "Ostrava"**: automatische taakkosten = **tarief van de resource × units-percentage × duur**, met de mogelijkheid om kosten handmatig te overschrijven.
- **Geen kostensoorten** (materiaal vs. arbeid vs. vaste kosten als aparte klassen), **geen kostenverdeling over de tijd**, **geen cashflow-curve**, **geen werkelijke kosten**, **geen EVM**.
- Baselines vergelijken **alleen data, geen kosten** (forum #12176).
- Er zijn zelfs klachten dat "Resource total cost is 0" blijft staan.

### 2.5 Baselines

Aanwezig en functioneel: knop "Baselines" boven het diagram, snapshots van de planning die je tegen de huidige stand kunt afzetten. Maar:
- Alleen **datumvergelijking**, geen kosten- of voortgangsvergelijking.
- Barashev over de onderliggende beperking: *"Tasks have only one duration... you can save baselines and compare how task durations changed"* — er is dus geen apart veld voor geplande vs. werkelijke duur.
- Geen genummerde baselines-set zoals MS Project (Baseline 0–10) met per-veld-vergelijking. **[SCHATTING]** op basis van de forumbeschrijvingen.

### 2.6 Platform, techniek en schaalbaarheid

- **Techniek:** **Java + Kotlin**, UI deels Swing en deels JavaFX. Vereist **Java Runtime 17+ met JavaFX-modules**. Installers voor Windows en macOS bundelen een JRE; Linux DEB en ZIP vereisen een eigen Java-installatie. ~300 MB schijfruimte, 4 GB RAM aanbevolen (GitHub releases-pagina).
- **Native Apple Silicon-ondersteuning** sinds 3.3.
- **Modulaire architectuur:** losse pakketten voor core, desktop-UI, import/export (iCal, MS Project) en charts (PERT, HTML/PDF).
- **Geen web-app, geen Android, geen iOS.** Expliciet in de release-documentatie: "Android and iOS not supported".
- **Bestandsformaat:** `.gan` — een **XML-formaat**. De ontwikkelaar garandeert achterwaartse leesbaarheid: *"We guarantee that it remains the same across minor updates"* en *"older files are readable by newer versions"*.

**Schaalbaarheid — realistisch aantal taken:**

De ontwikkelaar geeft een verrassend en belangrijk antwoord: ***"Project length matters from performance point of view, not the number of tasks. One task which is 2000 years long is worse than 2000 tasks of 1 day duration."*** De renderer is dus tijdas-gebonden, niet taak-gebonden.

Toch zijn er harde performanceklachten:
- Barashev zelf over een ingestuurd project: *"GP 3.3 has severe performance issues when working with this project"* (thread "Column resize issues").
- Threads "GANTTPROJECT very slow" (14 posts), "GP v3.3 responsive refresh when dragging Gantt Chart" met ~80% CPU-gebruik tijdens slepen, "Gantt software started lagging while using Apple M1" (27 posts), "GP 3.3 Performance issues on M3" (7 posts).
- 3.4 zou deze problemen adresseren.
- Capterra noemt "Performance issues with large projects" als terugkerende kritiek.

**[SCHATTING] Realistisch plafond: 300–800 taken voor comfortabel dagelijks werk; tot ~2.000 taken technisch haalbaar maar met merkbare traagheid, zeker in 3.3.** Een bouwplanning van 5.000–20.000 activiteiten — normaal voor een groot infraproject in P6 — is buiten bereik. Bovendien maakt het ontbreken van uren-granulariteit een gedetailleerde werkvoorbereidingsplanning sowieso onmogelijk, ongeacht performance.

**Stabiliteit:** dit is een reëel risico, geen theoretisch punt. Forumthreads: "GanttProject crashes all the time on my MAC", "GanttProject crash (V.3.2.3246)" — *"after ~15 minutes of use the program is guaranteed to crash"* met oplopend geheugengebruik, "Windows 10, ganttproject crashes, with project loaded or not" (sluit binnen 5–60 seconden), "Oh No! Lost my file!" (crash tijdens kopiëren/plakken, *"weeks of work"* verloren), "File no longer loads". Een SourceForge-reviewer: *"After spending two hours entering my data, it keeps crashing now, and there is no way I can open my file."*

---

## 3. Prijzen

### 3.1 Desktop-applicatie

| Item | Prijs | Voorwaarden | Bron | Datum |
|---|---|---|---|---|
| GanttProject Desktop, alle platformen | **€/$ 0,00** | Onbeperkt aantal installaties en gebruikers; GPLv3 | https://www.ganttproject.biz/ | 25-07-2026 |
| "Pay-what-you-wish"-download | Vrij te kiezen bedrag, optioneel | Puur donatie; geeft geen extra functionaliteit of licentierechten | https://www.ganttproject.biz/ | 25-07-2026 |

Letterlijk citaat van de leverancier: *"All GanttProject packages are available for free. There is an option to choose a paid download and pay as much as you wish to support those who work on GanttProject."*

**Er is geen betaalde desktop-editie, geen pro-versie, geen enterprise-licentie, geen minimaal zetelaantal, en geen verplichte add-ons.** De totale eigendomskosten van de desktop-tool zijn de arbeidskosten van je planners plus de kosten van het risico (zie §5).

### 3.2 GanttProject Cloud

> **[GECORRIGEERD 25-07-2026]** Een eerdere versie van dit profiel stelde dat de Cloud-prijs "niet publiek vaststelbaar" was en schatte € 3–8 per gebruiker per maand. **Dat was onjuist.** `ganttproject.cloud` is inderdaad een client-side SPA, maar de volledige prijs- én ToS-tekst staat als statische string in de Vue-bundel `https://ganttproject.cloud/js/about.js`, die zonder JavaScript op te halen is. De echte prijs is **€ 1,00** per credit — de schatting zat er een factor 3 à 8 náást.

De prijspagina is `https://ganttproject.cloud/about/pricing`, de bindende voorwaarden staan op `https://ganttproject.cloud/about/tos#pricing`. Beide zijn uitgelezen uit `https://ganttproject.cloud/js/about.js` (opgehaald 25-07-2026).

**Harde, geciteerde prijzen:**

| Item | Prijs | Voorwaarden | Bron |
|---|---|---|---|
| **1 credit point** | **€ 1,00** (incl. btw naar tarief van het land van vestiging) | *"While GanttProject Cloud is in beta testing, one credit point costs EUR 1 (one euro)."* / ToS: *"As of 16 April 2021, the price of one credit is 1 EUR"* | ganttproject.cloud/js/about.js |
| **Kosten per actief teamlid** | **1 credit = € 1 per facturatiecyclus (maand)** | Team-eigenaar wordt niet belast | idem |
| **Minimale afname** | **€ 10,00** top-up | *"the minimum top-up amount is 10 EUR"* — dit is het feitelijke **instapminimum**, niet een seat-minimum | idem |
| **Gratis tier** | Team van **2** personen (eigenaar + 1 actief lid) is **volledig gratis** | *"Teams of two members are free"* + 1 gratis credit per team per maand | idem |
| **Aanmeldbonus** | **5 gratis credits** | *"everyone who signs up gets 5 credits for free"* | idem |
| **Instapprijs grotere teams** | *"Bigger teams start from EUR 1 per team member per month."* | — | idem |
| Betaalmodel | **Pay-as-you-go, prepaid** — credits vooraf kopen, saldo op een Billing Account | Geen abonnement, geen jaarcontract, geen jaarlijks-vs-maandelijks-korting | idem |
| Merchant of Record | **Paddle.com** | Paddle handelt betalingen, support-inquiries en retouren af | idem |
| Restitutie | Volledige terugbetaling binnen **30 dagen**; geen deelrestitutie | idem | idem |

**Rekenvoorbeelden, letterlijk van de leverancier:**
- *"You are the sole member of your team. This is free."*
- *"You have a team of 5 active members, excluding you… This costs 4 credits, because 1 credit comes for free."* → **€ 4 per maand voor een team van 6.**
- *"You have a team of 20 members, but only 5 of them, excluding you, have been active this month. This costs 4 credits"* → **inactieve leden zijn gratis; € 4 per maand voor een team van 21.**
- *"You have 5 teams, and every team consists of 5 active members. This costs 5x4=20 credits."*

**Licentiemodel** (forum topic 1958, "What is a Team in GanttProject Cloud", 19-05-2020 — bevestigd door de huidige ToS):

| Element | Regel |
|---|---|
| Eenheid | **Credit point** per **actieve gebruiker** per **facturatiecyclus** |
| Definitie "actief" | Minstens één *billable activity* per cyclus; de enige belastbare activiteit is **lezen of schrijven van projectbestanden vanuit de desktop-app**. Frequentie maakt niet uit — vast tarief |
| Inactieve gebruikers | **Gratis**, ongeacht aantal |
| Team-eigenaar | **Gratis** |
| Gratis tier | **1 gratis credit per team per maand** |
| Facturatiescope | Per team; één Billing Account kan meerdere teams bedienen |
| Negatief saldo | *"we may reject billable activities"* — dienst wordt geblokkeerd |
| Prijsgarantie | Gekochte credits blijven geldig tot gebruik, maar *"purchase prices of subsequent credits may change"* |

**Er zijn geen prijsstaffels, geen volumekortingen, geen enterprise-tier en geen gepubliceerde SLA** — het is één vlak tarief van € 1 per actieve gebruiker per maand. Ook geen jaarabonnement: het model is prepaid credits, dus de vraag "maandelijks vs. jaarlijks" is niet van toepassing.

**Kostenrealiteit:** een bouwteam van 25 actieve planners kost **€ 24 per maand** (€ 288 per jaar) — verwaarloosbaar. **De prijs is dus níet het bezwaar tegen GP Cloud; de volwassenheid is dat.**

**Belangrijker dan de prijs is de status.** Op 15 maart 2023 antwoordde Dmitry Barashev op een expliciete vraag naar de prijs en de waardepropositie van GP Cloud (forum topic 6697): ***"It is currently in beta, and the most valuable features are not yet released, so it makes little sense to sell anything actively."***

Die betastatus is per 25-07-2026 **hard bevestigd uit de live productteksten zelf**, niet slechts "geen aanwijzing van het tegendeel": de prijspagina zegt *"**While GanttProject Cloud is in beta testing**, one credit point costs EUR 1"* en de privacyverklaring opent met *"This page provides an overview of GanttProject Cloud Privacy Policy **during the beta testing period**. The policy may change when GanttProject Cloud **graduates from beta**"*, met clausules die expliciet een `post-beta`-badge dragen. De prijs van € 1 is dus zelf een **betaprijs met een aangekondigd voorbehoud**. Ondertussen registreert het forum onafgebroken Cloud-storingen tot en met januari 2026, en de effectieve datum van de privacyverklaring staat nog altijd op **8 mei 2020** — zes jaar ongewijzigd. **GanttProject Cloud moet je behandelen als een experimentele, niet-actief-verkochte bijdienst — niet als een enterprise-collaboratieplatform.**

### 3.3 Vergelijkende kostencontext

| Tool | Indicatieve lijstprijs | Verhouding |
|---|---|---|
| GanttProject Desktop | € 0 | referentie |
| GanttProject Cloud | **€ 1,00 /actieve gebruiker/mnd** (geciteerd, incl. btw; min. afname € 10) | goedkoopste betaalde collaboratie-optie in dit onderzoek |
| ProjectLibre Cloud (ter vergelijking) | $ 9,99 /gebruiker/mnd (Wikipedia, geverifieerd 25-07-2026) | ~10× GP Cloud |
| MS Project Plan 3 | **[NIET GEVERIFIEERD IN DEZE RONDE]** ordegrootte $30 /gebruiker/mnd | ~ oneindig maal duurder |
| Oracle Primavera P6 | **[NIET GEVERIFIEERD IN DEZE RONDE]** ordegrootte $2.500+ /named user, eeuwig | — |

De MS Project- en P6-bedragen zijn hier alleen ter kalibratie en zijn in deze onderzoeksronde **niet** geverifieerd; gebruik de aparte profielen van die producten voor harde cijfers.

---

## 4. VOORDELEN

1. **Werkelijk gratis en werkelijk vrij — zonder addertjes.** GPLv3, onbeperkt aantal gebruikers, geen seat-minimum, geen functionele beperking, geen watermerk, geen tijdslimiet. Voor onderwijsinstellingen, non-profits en zzp'ers is dit doorslaggevend: je zet het op 200 studentenlaptops zonder één licentiegesprek. De broncode is beschikbaar, forkbaar en herdistribueerbaar. (Bron: ganttproject.biz, 25-07-2026)

2. **Alle vier de relatietypen plus positieve én negatieve lags — dat is meer dan de meeste "moderne" tools.** FS, FF, SS, SF zijn allemaal geïmplementeerd, met lag in beide richtingen, en met een expliciet "hardness"-concept (Strong/Rubber) dat bepaalt of een lag mag oprekken. De hele generatie werkbeheertools (Asana, Monday, Trello, Notion, ClickUp) biedt hooguit FS zonder lag. GanttProject zit hier aantoonbaar in het CPM-kamp. (Bron: docs.ganttproject.biz/user/scheduler/)

3. **Een echte, deterministische scheduler met kritiek pad — geen decoratieve balken.** De scheduler propageert constraints na elke wijziging en minimaliseert de projectduur; het kritieke pad wordt daadwerkelijk berekend en getoond. Verzameltaken leiden hun data af uit hun kinderen en zijn niet handmatig te verslepen — correcter dan menig commercieel product. (Bron: docs.ganttproject.biz/user/scheduler/; forumthreads over "Show Critical Path")

4. **Local-first, offline, geen account, geen telemetrie-afhankelijkheid.** Het bestand is een `.gan`-XML op je eigen schijf. Voor organisaties met dataresidentie-eisen, luchtgat-netwerken of gewoon wantrouwen tegenover SaaS is dit een structureel voordeel dat geen enkele cloud-tool kan bieden. Het XML-formaat is bovendien met de hand of met een script te bewerken — forumgebruikers doen dat aantoonbaar ("Turns out the .gan file is XML, so editing that is one way").

5. **Echte cross-platform-pariteit, inclusief Linux.** Windows, macOS (met native Apple Silicon sinds 3.3), Linux en zelfs BSD, met identieke functionaliteit. Dit is de belangrijkste reden dat Linux-gebruikers de tool aandragen; MS Project bestaat daar simpelweg niet. (Bron: SourceForge; GitHub releases)

6. **Zeer lage leercurve.** Capterra scoort "Ease of Use" op **4,1/5** bij 175 reviews; SourceForge geeft 4/5 op ease of use. AlternativeTo-gebruikers noemen het "keyboard friendly" met een leercurve die "very low" is. Een reviewer: *"does exactly what it says without over complication."* Voor een organisatie die alleen een fasering en mijlpalen moet vastleggen, is dat een reëel productiviteitsvoordeel boven P6.

7. **Bruikbaar kostenmodel voor eenvoudige gevallen.** Sinds 2.7 rekent de tool taakkosten automatisch uit als tarief × units × duur, met handmatige override. Voor een klein bureau dat uurtarieven op een fasering wil leggen is dat voldoende. (Bron: docs.ganttproject.biz/releases/ostrava/)

8. **Baselines aanwezig — je kunt plan versus huidige stand vergelijken.** Snapshots van de planning zijn opslaan en overlayen. Beperkt tot data, maar het bestáát, en dat is meer dan veel gratis alternatieven. (Bron: forumthreads #2119, #2151, #4920)

9. **Stabiel, gedocumenteerd bestandsformaat met achterwaartse compatibiliteit-garantie.** De ontwikkelaar committeert zich expliciet: oudere bestanden blijven leesbaar in nieuwere versies. Voor archiefwaarde over projectlevensduren van 10+ jaar is dat relevant, en het XML-formaat is niet-proprietair leesbaar.

10. **Rechtstreekse, snelle en eerlijke support van de hoofdontwikkelaar.** Het forum laat zien dat Barashev persoonlijk antwoordt, vaak binnen dagen, en beperkingen ronduit toegeeft ("there is no resource leveling of any kind in GanttProject, sorry"). Dat is zeldzaam en waardevol — je weet waar je aan toe bent, zonder marketingmist.

---

## 5. NADELEN

1. **Geen sub-dag-planning. Punt.** De FAQ is onomwonden: *"Is it possible to use hours as task duration? No. In GanttProject tasks are measured in days, sorry."* De MS Project-importdocumentatie bevestigt: *"GanttProject's duration granularity is 1 day."* Dit is een feature-request die volgens AlternativeTo **al meer dan een decennium** loopt. Voor bouwwerkvoorbereiding, ploegenwerk, stops/turnarounds, ombouwweekends of welke uurgedreven planning dan ook is dit **disqualificerend**. Eén AlternativeTo-reviewer noemt de tool zonder urenondersteuning zelfs "totally useless". (Bron: help.ganttproject.biz topic 8; docs.ganttproject.biz/user/troubleshooting-msproject-import/)

2. **Geen resource-leveling, in geen enkele vorm.** FAQ: *"Can GanttProject do resource leveling? No."* Barashev, twee keer letterlijk: *"there is no resource leveling of any kind in GanttProject, sorry"* en *"Resource levelling is not supported, sorry."* Je ziet overbelasting in de resource-load-grafiek, maar de tool kan er niets aan doen. Voor elke organisatie met schaarse ploegen, kranen of specialisten is dit een harde muur. (Bron: help.ganttproject.biz topics 8, 268, 2029)

3. **Resourcevakanties zijn puur cosmetisch — een verborgen, gevaarlijke valkuil.** Letterlijk van de ontwikkelaar: ***"Vacations (days off in resource properties) show up as yellow bars on the chart. They do not have any other meaning except for yellow color."*** Je plant dus zonder één waarschuwing werk in de vakantie van de enige beschikbare persoon. Dit is erger dan een ontbrekende feature: het is een UI die suggereert dat er iets gebeurt terwijl er niets gebeurt. Gebruikers lopen er nog in januari 2025 tegenaan. (Bron: help.ganttproject.biz topics #505, #1394, #2060, #11528)

4. **Geen float/slack-waarden en geen late dates — je ziet alleen "kritiek: ja/nee".** De achterwaartse doorrekening wordt niet blootgesteld. GitHub issue **#1906 "A column indicating task float"**, geopend **door de ontwikkelaar zelf op 7 mei 2021**, is **vijf jaar later nog open**. Forumthreads "Cannot visualize Float", "Latest start date for tasks" en "How to show the time range (delay) allowed to an activity become critical" bevestigen dat gebruikers dit missen. Zonder float kun je geen vertragingsanalyse, geen prioriteringsgesprek en geen contractuele claimonderbouwing voeren. (Bron: github.com/bardsoftware/ganttproject/issues/1906)

5. **Slechts één constrainttype ("Earliest begin") — geen deadlines, geen FNLT, geen ALAP.** Gebruikers vragen herhaaldelijk om een harde einddatum ("hard date I can put in that I know I need to work to") en om mijlpalen die niet meeschuiven als voorgangers uitlopen. Beide bestaan niet. MS Project heeft acht constrainttypen; GanttProject heeft er één. (Bron: docs.ganttproject.biz/user/scheduler/; forumthreads #5416, #11473)

6. **Reële stabiliteits- en dataverliesrisico's.** Threads: "GanttProject crash (V.3.2.3246)" — *"after ~15 minutes of use the program is guaranteed to crash"* met oplopend geheugengebruik; "GanttProject crashes all the time on my MAC"; "Windows 10, ganttproject crashes, with project loaded or not" (5–60 seconden); "Oh No! Lost my file!" waarin een gebruiker *"weeks of work"* verliest bij een crash tijdens kopiëren/plakken; "File no longer loads" na een kalenderwijziging. Een SourceForge-reviewer: *"After spending two hours entering my data, it keeps crashing now, and there is no way I can open my file."* Er is geen zichtbare auto-save/recovery-voorziening in de klachten terug te vinden. (Bron: help.ganttproject.biz; sourceforge.net/projects/ganttproject/reviews/)

7. **Performanceproblemen die de ontwikkelaar zelf erkent.** Over een ingestuurd projectbestand: *"GP 3.3 has severe performance issues when working with this project."* Verder: ~80% CPU tijdens het slepen van het diagram, 27 posts over lag op Apple M1, aparte threads over M3. Capterra noemt "Performance issues with large projects" als standaardkritiek. 3.4 (nog beta in mei 2026) zou dit verhelpen, maar dat is al ruim een jaar in beta. (Bron: help.ganttproject.biz forumzoekopdracht "performance"; capterra.com)

8. **Geen officiële API en geen automatisering.** Barashev, 27 april 2021: *"GanttProject Cloud protocol is not WebDAV, and at the moment there is no API which could be considered as 'supported'/'official'."* Verzoeken om een Java-, Python- of REST-API lopen terug tot **2017** en zijn nooit ingewilligd. Integratie in een toolketen — ERP, BIM, kostenbeheersing, dashboards — kan alleen via het handmatig parsen van `.gan`-XML. (Bron: help.ganttproject.biz, topics over API/SDK 2017–2023)

9. **GanttProject Cloud is een zwakke schakel: nog steeds beta en met een lange klachtenlijst.** **[GECORRIGEERD]** "Ongepubliceerde prijzen" is geschrapt — de prijzen zijn wél gepubliceerd (€ 1 per actieve gebruiker per maand, min. € 10 afname; zie §3.2). Het bezwaar is niet de prijs maar de volwassenheid: de prijspagina zelf zegt *"While GanttProject Cloud is **in beta testing**…"* en de privacyverklaring staat sinds **8 mei 2020** onveranderd op "beta testing period". De ontwikkelaar in maart 2023: *"It is currently in beta, and the most valuable features are not yet released, so it makes little sense to sell anything actively."* Het forum documenteert van 2020 tot januari 2026 onafgebroken storingen: eindeloze "Verifying Access Token"-loops (okt 2024, jan 2025), "ERROR 500 Failed to send a verification email" (juli 2024), "Error 500: Gantt Chart Loading Failed" (dec 2021 t/m sept 2025), niet-aankomende activatiemails (aug 2025, jan 2025), oneindig laadscherm (okt 2025), teamleden die uitgenodigde projecten niet kunnen openen, en — het ernstigst — **dataverlies bij gelijktijdige bewerking**: "Working with Cloud" beschrijft wijzigingen die verdwijnen bij een update-notificatie. Bovendien: geen lezer/schrijver-rollen, alleen platte teamtoegang. (Bron: help.ganttproject.biz forumzoekopdracht "GanttProject Cloud")

10. **Geen handleiding, gedateerde UI, geen web- of mobiele client.** FAQ, letterlijk: *"We have no user guides or manuals, sorry."* De documentatiesite bevat **twaalf pagina's totaal**, waarvan drie gebruikersgericht. Capterra en AlternativeTo noemen beide de "outdated user interface design". Er is geen browserversie en geen Android/iOS-app; Capterra-reviewers noemen "Desktop-only functionality (no web-based access)" en "Lack of cloud integration and collaboration features" als hoofdbezwaren. En met **456 open issues** tegenover 15 open PR's is de backlog structureel groter dan de capaciteit. (Bron: help.ganttproject.biz topic 8; docs.ganttproject.biz/sitemap.xml; capterra.com; github.com/bardsoftware/ganttproject)

11. **Import/export is aantoonbaar broos** — zie §6 voor de details; genoemd als apart nadeel omdat het bij reviewers structureel terugkomt ("the import feature is pretty rough").

---

## 6. Interoperabiliteit

### 6.1 Overzichtsmatrix

| Formaat / standaard | Import | Export | Kwaliteit / opmerkingen |
|---|---|---|---|
| **`.gan`** (eigen, XML) | ✅ | ✅ | Native. Stabiel, achterwaarts compatibel, met de hand leesbaar/bewerkbaar |
| **MS Project `.mpp`** | ⚠️ deels | ❌ | Import via de MPXJ-bibliotheek **[NIET GEVERIFIEERD, sterk vermoeden]**; forum topic #5685 "Can not import mpp files" heeft 24 posts. Standaardadvies van de community: exporteer eerst naar MS Project XML |
| **MS Project XML (MSPDI)** | ✅ | ✅ | De feitelijke uitwisselroute. Maar: meerdere threads (#10567, #162, #688) melden dat **MS Project de door GanttProject geëxporteerde bestanden weigert** met *"That file isn't an .mpp file and can't be imported"* |
| **MS Project `.mpx`** | ⚠️ vermoedelijk | ❌ | **[NIET GEVERIFIEERD]** |
| **CSV** | ✅ | ✅ | Werkt, maar broos — zie §6.3 |
| **Excel `.xls`/`.xlsx`** | ✅ | ✅ | Sinds 3.0 (feb 2020). Forum: "Excel (.xls) imports less reliable than CSV" |
| **PDF** | ❌ | ✅ | Rapport/print. Eén thread meldt een crash bij PDF-bewerking |
| **PNG** | ❌ | ✅ | Diagram-afbeelding |
| **HTML** | ❌ | ✅ | Statisch rapport |
| **iCalendar `.ics`** | ✅ (feestdagen) | ✅ (taken) | Sinds 2.7 |
| **PERT-diagram** | — | ✅ | Weergave, geen uitwisselformaat |
| **WebDAV** | ✅ opslag | ✅ opslag | Als opslaglocatie voor `.gan`. GP Cloud gebruikt **géén** WebDAV |
| **Primavera XER** | ❌ | ❌ | **Volledig afwezig** |
| **Primavera P6 XML** | ❌ | ❌ | **Volledig afwezig** |
| **IFC 4.3 / IfcWorkSchedule / IfcTask** | ❌ | ❌ | **Volledig afwezig — nul vermeldingen op het hele officiële forum** |
| **BCF / bSDD / IDS** | ❌ | ❌ | Afwezig |
| **REST/JSON API** | ❌ | ❌ | Geen officiële API; expliciet bevestigd door de ontwikkelaar |

### 6.2 MS Project-uitwisseling: wat er echt gebeurt

De leverancier adverteert prominent met "export documents to Microsoft Project format and import existing documents". De **officiële troubleshooting-pagina** (`docs.ganttproject.biz/user/troubleshooting-msproject-import/`) is echter een openhartige opsomming van waarom dat vaak misgaat:

1. **Weekendconflicten** — taken die in MS Project op een weekend beginnen, verschuiven bij import in een project met niet-werkende weekenden.
2. **Lags worden opgegeten** — *"GanttProject makes the project as short as possible and when it can remove the lag, it will"*, terwijl MS Project lags standaard behoudt. Je planning **verandert dus semantisch** bij import.
3. **Sub-dag-duren gaan verloren** — alles onder één dag wordt herschaald.
4. **Strengere afhankelijkheidshandhaving** — *"Microsoft Project is known to be somewhat forgiving with respect to dependencies"*, GanttProject niet; taken schuiven daardoor.

Het advies van de documentatie ("begin je troubleshooting bij de vroegste taak, want vroege wijzigingen cascaderen") bevestigt dat een import in de praktijk **handmatig nagelopen moet worden**.

En de andere kant op is nog slechter: GanttProject kan **geen `.mpp` schrijven**, alleen MSPDI-XML, en meerdere gebruikers melden dat MS Project die XML weigert. **Rondrit-uitwisseling met MS Project is dus onbetrouwbaar en niet verliesvrij.**

### 6.3 CSV/Excel: het feitelijke, maar broze werkpaard

Officiële richtlijn: exporteer eerst een voorbeeldproject naar CSV en gebruik dat als sjabloon. Kolommen omvatten ID, Name, Start Date, End Date, Duration, Predecessors, Resources en custom fields. Gedocumenteerde problemen uit het forum:
- Datumformaten die verkeerd of verschoven binnenkomen (regionale instellingen, komma vs. punt).
- CSV's gemaakt in Excel importeren onbetrouwbaar; CSV's geëxporteerd uít GanttProject werken wel (topic #1473).
- **Afhankelijkheden gaan verloren** bij import.
- Resourcetoewijzingen komen niet mee.
- Stille mislukking: het bestand importeert zonder foutmelding en zonder zichtbaar resultaat.
- Dubbele "ID"-kolom blokkeert de import.
- **Resource-afwezigheid wordt niet meegeëxporteerd** naar CSV (topic #4186).
- **Alleen invoegen, niet bijwerken:** import maakt nieuwe taken in plaats van bestaande te wijzigen — synchronisatie-workflows zijn dus niet mogelijk.

### 6.4 Wat dit betekent voor een open-source, IFC-gebaseerde planner

Dit is het meest relevante onderdeel voor de opdrachtgever, dus expliciet:

- **GanttProject heeft nul BIM-/IFC-capaciteit.** Geen import, geen export, geen roadmap-item. **[GECORRIGEERD]** De eerdere formulering "niet één forumbericht dat de termen IFC of BIM noemt" is te sterk: `IFC` geeft inderdaad **0** treffers, maar `BIM` geeft er **1** (de Lean-thread "GANTT PROJECT x LAST PLANNER SYSTEM"). De conclusie verandert daar niet door — één BIM-vermelding in ruim twintig jaar is functioneel nul. Het domeinmodel (`.gan`) kent geen enkel concept van een bouwelement, een GUID-koppeling, een 4D-relatie of een `IfcWorkSchedule`. Er is geen migratiepad van of naar `IfcTask`/`IfcRelSequence`.
- **GanttProject is daarom géén concurrent van een IFC-native planner** — het is een aangrenzend product in een andere categorie. De overlap zit alleen in "een Gantt-balk tekenen met FS-relaties".
- **Maar het is wel een uitstekende referentie voor twee dingen.** Ten eerste: het schedulerontwerp (vier relatietypen, lags in beide richtingen, Strong/Rubber-hardness, afgeleide verzameltaakdata, minimalisering van de projectduur) is compact, gedocumenteerd, correct en GPL-open leesbaar. Ten tweede: de **kloof** die GanttProject laat liggen — geen float, geen late dates, geen deadlines, geen resourcekalenders, geen uren, geen leveling — is precies de lijst met functies die een serieuze open-source planner wél moet hebben om het predicaat CPM te verdienen. Behandel §2.1 als een checklist, niet als een beschrijving.
- **Licentie-aandachtspunt:** GanttProject is **GPLv3**, niet LGPL. Code hergebruiken in een LGPL-3.0-project (zoals Open Planner Studio) is licentietechnisch **niet zonder meer toegestaan** — GPLv3-code trekt het geheel naar GPLv3. Kijken en leren mag; kopiëren niet. **[Juridische duiding, geen advies — laat dit toetsen.]**
- **Praktische brug:** wil je toch data uitwisselen met GanttProject-gebruikers, dan is de enige realistische route `.gan`-XML rechtstreeks lezen/schrijven (goed gedocumenteerd, stabiel, achterwaarts compatibel) of CSV. MSPDI is een derde optie maar erft de MS-Project-problemen.

---

## 7. Marktpositie

### 7.1 Waar het sterk staat, en waarom

| Segment | Positie | Waarom |
|---|---|---|
| **Onderwijs** (hbo/wo/mbo, projectmanagementvakken) | **Zeer sterk, waarschijnlijk marktleider onder gratis Gantt-tools** | € 0, geen accounts, geen inkooptraject, draait op elke laptop, en de vier relatietypen zijn precies wat een PM-cursus behandelt |
| **Linux-desktop** | **Sterk** | Vrijwel geen concurrentie; MS Project bestaat er niet, ProjectLibre is de enige echte rivaal |
| **Zzp'ers en microbureaus** | **Sterk** | Prijs, eenvoud, geen abonnement |
| **Non-profit / lokale overheid met budgetdruk** | **Redelijk** | Prijs en offline-werking; stabiliteit is het bezwaar |
| **MKB-projectorganisaties (10–100 medewerkers)** | **Zwak** | Geen samenwerking, geen leveling, geen web-client; Capterra-reviewer: het wordt "almost unusable" bij grotere teams met verlof- en vrije-dagenbeheer |
| **Bouw/infra werkvoorbereiding** | **Nagenoeg afwezig** | Geen uren, geen resourcekalenders, geen leveling, geen XER/P6-uitwisseling, geen IFC |
| **Enterprise / portfolio** | **Afwezig** | Geen multi-project, geen rollen, geen governance, geen API |

### 7.2 Belangrijkste concurrenten

- **Direct (gratis desktop-CPM):** **ProjectLibre** — de nauwste rivaal; wel MPP-lezen/schrijven en resource-leveling, maar een eigen UI-erfenis en eigen kwaliteitsklachten. **GanttProject en ProjectLibre zijn samen praktisch de hele categorie "gratis desktop-CPM".**
- **Direct (open source, technischer):** ProjeQtOr, TaskJuggler (tekstgebaseerd, wél echte resource-leveling en uren — technisch superieur maar met een veel steilere leercurve), OpenProject (webgebaseerd).
- **Betaald, één trede hoger:** Microsoft Project (Plan 1/3/5), Smartsheet, Wrike, monday.com — allemaal met samenwerking, web en mobiel, waar GanttProject niets tegenover zet.
- **Betaald, professioneel CPM:** Oracle Primavera P6, Asta Powerproject, Deltek Acumen, Spider Project, Elecosoft. GanttProject speelt hier **niet mee** en pretendeert dat ook niet.
- **BIM/4D-planning:** Synchro, Navisworks TimeLiner, Bexel Manager, Vico. **GanttProject heeft hier geen positie en geen ambitie.**

### 7.3 Omvang, omzet en trend

- **Gebruikersaantallen:** **[GECORRIGEERD]** de leverancier claimt géén "few thousands weekly *users*" maar *"A few thousands of people **download** GanttProject weekly"*, in "nearly 200 countries on all continents", sprekend "25+ languages" (ganttproject.biz, geverifieerd 25-07-2026). Downloads ≠ gebruikers, en een paar duizend downloads per week is over twintig jaar cumulatief fors — de eerdere lezing onderschatte de installed base structureel. SourceForge — een secundaire mirror — laat slechts **231 downloads per week** zien; het leeuwendeel van de distributie loopt dus via de eigen site en Linux-distributiepakketten.
- **[SCHATTING] Totale installed base:** enkele honderdduizenden cumulatieve downloads (bij ~3.000/week × ~20 jaar zou de bruto teller in de miljoenen lopen; actieve installaties zijn een fractie daarvan), met een sterke onderwijs-piek per semester. Onderbouwing: de eigen "few thousands weekly downloads", 1.082 GitHub-sterren, 175 Capterra-reviews en 43 SourceForge-reviews. **Deze bandbreedte is breed en zwak onderbouwd — behandel hem als ordegrootte, niet als cijfer.**
- **[SCHATTING] Omzet:** zeer laag — vermoedelijk **onder € 100k per jaar**, uit donaties plus een marginale Cloud-omzet. Onderbouwing: de Cloud is naar eigen zeggen nog beta en wordt "not actively sold", het inkomstenmodel is een vrijwillige donatie bij de download, en er wordt zelfs naar een externe hobbywebshop gelinkt vanuit de sitemap.
- **Ontwikkeltrend:** **traag maar levend, en dat is de eerlijkste samenvatting.** Releasetempo volgens de GitHub-releasepagina (geverifieerd 25-07-2026): **3.0 (4 feb 2021)** → 3.1 (18 mei 2023) → 3.2 (15 feb 2024) → 3.3 (22 jan 2025; SourceForge toont onderhoudsbuild 3.3.3300 op 07-12-2025) → 3.4 Beta IV (11 mei 2026, alleen via ganttproject.biz, **niet** als GitHub-release gepubliceerd). **[GECORRIGEERD]** Een eerdere versie dateerde 3.0 op feb 2020 en sprak van "drie jaar stilte"; het gat 3.0 → 3.1 is in werkelijkheid ruim **twee jaar en drie maanden**. Daarna een jaarlijkse cadans. *(Kanttekening: de eigen homepage dateert 3.3 op "15 Jan, 2024", wat onmogelijk is omdat 3.2 van feb 2024 is — vermoedelijk een typefout voor 2025. GitHub is hier de betrouwbaarder bron.)* Recente inhoud is bovendien **UI- en tabelwerk** (herontworpen takentabel met filtering en multi-kolom-sortering in 3.2; berekende kolommen met SQL-expressies en projectrelatieve weeknummers in 3.3; native Apple Silicon), **niet** scheduler-versterking. **De planningsengine is in essentie sinds 2.8 (2016) niet fundamenteel uitgebreid.** Met 456 open issues en één zichtbare ontwikkelaar is een sprong naar volwaardig CPM onwaarschijnlijk.
- **Concurrentiedruk:** de brede markt is naar SaaS-werkbeheer verschoven (monday, ClickUp, Smartsheet). GanttProject verliest daar op samenwerking en wint op prijs, privacy en offline-werking — een krimpende maar taaie niche.

### 7.4 Reviewscores (opgehaald 25-07-2026)

| Platform | Score | Aantal | Deelscores |
|---|---|---|---|
| Capterra | **4,2 / 5** | 175 | Ease of Use 4,1 · **Features 4,1** · Customer Service 3,9 · **Value for Money 4,6** |
| SourceForge | **4,4 / 5** | 43 | Ease of use 4 · **Features 3** · Design 4 · Support 3 |
| AlternativeTo | **3,3 / 5** | 113 likes, 12 reviews | — |
| G2 | niet toegankelijk (403) | — | — |
| TrustRadius | niet toegankelijk (403) | — | — |
| Gartner Peer Insights | geen vermelding gevonden | — | — |

De sleutel zit in de **deelscore "Features: 3/5"** op SourceForge, tegenover 4/5 voor bruikbaarheid en design. Gebruikers waarderen precies wat het is en straffen precies wat het niet kan. **[NUANCE toegevoegd in verificatie]** Dit signaal is echter minder eenduidig dan de eerste versie suggereerde: **Capterra geeft "Features" juist 4,1/5** — even hoog als bruikbaarheid — en de hoogste deelscore van allemaal is **"Value for Money: 4,6/5"**. De twee platforms spreken elkaar op features dus tegen; wat consistent is, is dat de prijs-kwaliteitverhouding uitzonderlijk hoog scoort. Lees de Features-3/5 van SourceForge als het oordeel van de zwaardere gebruiker, niet als een marktbreed feit. Let ook op de bimodale verdeling op SourceForge: 32× vijf sterren, maar 4× één ster, vrijwel allemaal over crashes en dataverlies.

---

## 8. Eindoordeel

### Voor wie wél

- **Onderwijs.** Zonder aarzeling de beste keuze voor een projectmanagementvak: gratis, installeerbaar op elke laptop, en het dwingt studenten om met echte FS/FF/SS/SF-relaties en een echt kritiek pad te werken in plaats van met een gekleurde spreadsheet.
- **Zzp'ers en microbureaus** die een fasering met mijlpalen en een grove kostenopstelling nodig hebben, en die het bestand als PDF naar een klant sturen.
- **Linux-organisaties** die geen MS Project kunnen draaien en geen SaaS willen.
- **Iedereen met harde offline- of dataresidentie-eisen** — de local-first XML-opslag is hier een structureel, niet te evenaren voordeel.
- **Ontwikkelaars van planningssoftware**, als leesbare referentie-implementatie van een compacte constraint-scheduler (mits de GPLv3-grens gerespecteerd wordt).

### Voor wie níet

- **Bouw- en infra-werkvoorbereiding.** Drie afzonderlijk fatale gebreken: geen uren-granulariteit, resourcekalenders die niets doen, en geen resource-leveling. Elk daarvan alleen al sluit serieus uitvoeringswerk uit.
- **Iedereen die float, late dates of vertragingsanalyse nodig heeft.** Contractueel claimwerk, forensische planningsanalyse en zelfs normaal prioriteringsoverleg zijn onmogelijk zonder slack-waarden.
- **Teams die gelijktijdig aan één planning werken.** GP Cloud is beta (naar eigen zeggen, op de prijspagina), kent gedocumenteerd dataverlies bij gelijktijdige bewerking en heeft geen rollenmodel. De prijs (€ 1 per actieve gebruiker per maand) is juist opvallend laag — het risico zit in de volwassenheid, niet in de kosten.
- **Organisaties met een toolketen.** Geen API, geen XER, geen P6 XML, geen IFC, en onbetrouwbare MS Project-uitwisseling.
- **Projecten boven ~1.000 taken** **[SCHATTING]**, en zeker boven de paar duizend.
- **Elke organisatie waar planningsverlies onacceptabel is.** De crash- en dataverliesmeldingen zijn te talrijk en te recent om weg te wuiven; wie het toch gebruikt, moet een strak extern back-upregime voeren.

### Is dit een serieus alternatief voor klassieke CPM-tools?

**Nee — maar om een genuanceerder reden dan bij de meeste gratis tools, en die nuance is de belangrijkste conclusie van dit profiel.**

GanttProject is nadrukkelijk **niet** de categorie "tekent alleen balken zonder netwerklogica". Er zit een echte, deterministische scheduler in, met alle vier de relatietypen, lags in beide richtingen, afgeleide verzameltaakdata en een daadwerkelijk berekend kritiek pad. Op dat punt verslaat het de hele generatie SaaS-werkbeheertools die "Gantt" op hun doos zetten. Het verdient het respect dat daarbij hoort.

Maar het blijft steken op **de helft van CPM**. De voorwaartse doorrekening is af; de achterwaartse is niet zichtbaar gemaakt. Zonder float, zonder late dates, zonder deadlines, zonder werkende resourcekalenders, zonder leveling en zonder uren mist het exact de instrumenten waarvoor planners een CPM-tool aanschaffen. En het is geen kwestie van tijd: de engine is sinds 2016 in essentie onveranderd, terwijl het ontwikkelwerk naar tabellen en UI gaat en de issue-backlog groeit.

**Positioneer het daarom eerlijk: GanttProject is de beste gratis desktop-Gantt-tool voor eenvoudige, kleinschalige, offline planningen — een uitstekende opstap en een prima onderwijstool — maar het is een categorie onder MS Project en twee categorieën onder P6 of Asta Powerproject. Voor bouwplanning op IFC-basis is het geen concurrent en geen migratiedoel; het is hooguit een leerzame referentie voor wat een minimale, correcte scheduler wél kan, en een precieze inventaris van wat er daarna nog moet komen.**

---

## Bronnenlijst

Alle URL's opgehaald op **25 juli 2026**.

**Leverancier**
1. https://www.ganttproject.biz/ — homepage: positionering, GPL3, "established 2003", "a few thousands" wekelijkse gebruikers / bijna 200 landen, versie 3.3 en 3.4 Beta IV, exportformaten, gratis + pay-what-you-wish
2. https://www.ganttproject.biz/sitemap.xml — sitemapstructuur; leverde de Capterra-review-URL en de link naar ganttproject.cloud
3. https://ganttproject.cloud/ — Cloud-startpagina; **JS-SPA, inhoud niet uitleesbaar**
4. https://ganttproject.cloud/about/pricing — officiële prijspagina (via forum topic 1958); **JS-SPA, bedragen niet uitleesbaar**
5. https://bardsoftware.com/ — leverancierssite; **HTTP 403, niet toegankelijk**

**Officiële documentatie**
6. https://docs.ganttproject.biz/sitemap.xml — volledige documentatie-inventaris (12 pagina's)
7. http://docs.ganttproject.biz/user/scheduler/ — "GanttProject Scheduler Explained": constrainttypen, "Earliest begin", vier afhankelijkheidstypen, lag, hardness Strong/Rubber, verzameltaken
8. http://docs.ganttproject.biz/user/troubleshooting-msproject-import/ — MS Project-importproblemen, "duration granularity is 1 day", lag-verwijdering
9. http://docs.ganttproject.biz/releases/ostrava/ — 2.7-release: kostenberekening, iCalendar-feestdagen, weekend-uitzonderingen, systeemeisen
10. http://docs.ganttproject.biz/releases/pilsen/ — 2.8-release: "early begin"-constraint, Scheduler Audit and Report, compatibiliteit

**Officieel supportforum (Discourse, doorzocht via JSON-API)**
11. https://help.ganttproject.biz/ — forumoverzicht, actieve threads juli 2026
12. https://help.ganttproject.biz/latest — recente onderwerpen: bugs, ontbrekende functies, import/exportproblemen
13. https://help.ganttproject.biz/t/8.json — **FAQ**: geen uren ("measured in days, sorry"), geen resource-leveling, geen handleiding, weeknummering, settings-reset
14. https://help.ganttproject.biz/t/1958.json — "What is a Team in GanttProject Cloud": credit-point-model, gratis credit per maand, 5 startcredits, geen lezer/schrijver-rollen
15. https://help.ganttproject.biz/t/6697.json — GP Cloud "selling resources": *"It is currently in beta... it makes little sense to sell anything actively"* (15-03-2023)
16. https://help.ganttproject.biz/search.json?q=critical%20path — kritiek-pad-threads; "Cannot visualize Float", "Latest start date for tasks"
17. https://help.ganttproject.biz/search.json?q=resource%20leveling — *"there is no resource leveling of any kind"*; *"Resource levelling is not supported, sorry"*
18. https://help.ganttproject.biz/search.json?q=resource%20vacation — *"They do not have any other meaning except for yellow color"*
19. https://help.ganttproject.biz/search.json?q=baseline%20compare — baselines vergelijken data, niet kosten; één duur per taak
20. https://help.ganttproject.biz/search.json?q=deadline — ontbrekende deadline-/FNLT-constraint (#5416, #11473)
21. https://help.ganttproject.biz/search.json?q=performance — *"GP 3.3 has severe performance issues"*, M1/M3-lag, 80% CPU, "project length matters, not number of tasks"
22. https://help.ganttproject.biz/search.json?q=crash — crash- en dataverliesthreads (#4368, #5653, #51, #2379, #2169)
23. https://help.ganttproject.biz/search.json?q=API — *"there is no API which could be considered as 'supported'/'official'"* (27-04-2021); SDK-verzoeken vanaf 2017
24. https://help.ganttproject.biz/search.json?q=GanttProject%20Cloud — volledige Cloud-storingsgeschiedenis 2020 → januari 2026
25. https://help.ganttproject.biz/search.json?q=csv%20import — CSV-import/exportbeperkingen
26. https://help.ganttproject.biz/search.json?q=gan%20file%20format — `.gan` is XML, compatibiliteitsgarantie, MSPDI-exportweigeringen door MS Project
27. https://help.ganttproject.biz/search.json?q=duration%20resource%20units — geen effort-driven scheduling (#4826, #9456)
28. https://help.ganttproject.biz/search.json?q=pricing — verwijzing naar ganttproject.cloud/about/pricing
29. https://help.ganttproject.biz/search.json?q=export%20mpp%20microsoft%20project — "Can not import mpp files" (#5685, 24 posts)

**Broncode en releases**
30. https://github.com/bardsoftware/ganttproject — 1.1k sterren, 339 forks, **456 open issues**, 15 PR's, 6.077 commits, Java+Kotlin, GPLv3, modulestructuur
31. https://raw.githubusercontent.com/bardsoftware/ganttproject/master/README.md — featureoverzicht, bouwinstructies
32. https://github.com/bardsoftware/ganttproject/issues/1906 — **"A column indicating task float"**, geopend 07-05-2021 door dbarashev, **nog open**
33. https://github.com/bardsoftware/ganttproject/releases — releasegeschiedenis 2.8.11 → 3.3, systeemeisen (Java 17+ JavaFX, 300 MB, 4 GB RAM)

**Reviewplatforms**
34. https://www.capterra.com/p/136586/GanttProject/reviews/ — **4,2/5 bij 175 reviews**; Ease of Use 4,1; Customer Service 3,9; kritiek op schaalbaarheid, cloud, UI, performance
35. https://sourceforge.net/projects/ganttproject/reviews/ — **4,4/5 bij 43 reviews**; **Features 3/5**; crash- en importklachten
36. https://sourceforge.net/projects/ganttproject/ — 231 downloads/week, versie 3.3.3300, laatste update 07-12-2025, 18+ talen
37. https://alternativeto.net/software/ganttproject/about/ — BarD Software s.r.o. (Slowakije), ~3,3 sterren, decennialange uren-feature-request

**Niet toegankelijk in deze ronde**
38. https://www.g2.com/products/ganttproject/reviews — HTTP 403
39. https://www.trustradius.com/products/ganttproject/reviews — HTTP 403
40. https://www.reddit.com/r/projectmanagement/ — geblokkeerd door de omgeving
41. https://en.wikipedia.org/wiki/GanttProject — HTTP 404 (opnieuw bevestigd 25-07-2026: er bestáát geen Engelstalig Wikipedia-artikel over GanttProject)
42. https://web.archive.org/ — geblokkeerd door de omgeving

**Aanvullende bronnen uit de verificatieronde (25-07-2026)**

43. **https://ganttproject.cloud/js/about.js** — de Vue-bundel achter `/about/pricing`, `/about/tos` en `/about/privacy`. Bevat de volledige prijstekst als statische strings: *"One credit is EUR 1"*, *"Teams of two members are free"*, *"Bigger teams start from EUR 1 per team member per month"*, *"While GanttProject Cloud is in beta testing, one credit point costs EUR 1 (one euro)"*, *"everyone who signs up gets 5 credits for free"*, *"As of 16 April 2021, the price of one credit is 1 EUR and the minimum top-up amount is 10 EUR"*, Paddle.com als Merchant of Record, 30-dagen-restitutie, en driemaal *"BarD Software s.r.o., a … company registered in Czech Republic"*. **Dit is de bron die het "prijs niet vaststelbaar"-oordeel van de eerste ronde weerlegt.**
44. https://www.ganttproject.biz/ (rechtstreekse HTML-ophaal, niet via SPA-render) — *"Project managers in construction, architecture, engineering, media production and other industries"*; *"A few thousands of people download GanttProject weekly… nearly 200 countries… speak 25+ languages"*; *"All GanttProject packages are available for free"*; GPL3; 3.3 en 3.4 Beta IV (11 mei 2026)
45. https://api.github.com/repos/bardsoftware/ganttproject — 1.082 sterren, 339 forks, 471 open issues+PR's, licentie GPL-3.0, laatste push 18-07-2026
46. https://github.com/bardsoftware/ganttproject/issues/1906 — herbevestigd **OPEN** op 25-07-2026; geopend door `dbarashev` op 07-05-2021; labels `Tasks`, `TasksTable`, `enhancement`; geen milestone
47. https://github.com/bardsoftware/ganttproject/releases — 3.3 (22-01-2025) is de laatste stabiele GitHub-release; **geen** 3.4-release gepubliceerd; releasenotes noemen geen uren, float of leveling
48. https://help.ganttproject.biz/search.json?q=IFC — **0 treffers**; …?q=BIM — **1 treffer**; …?q=construction — 19 treffers
49. https://en.wikipedia.org/wiki/ProjectLibre — .mpp openen én opslaan bevestigd, licentie CPAL, ProjectLibre Cloud US$ 9,99 /gebruiker/mnd; **resource-leveling niet bevestigd** in deze bron
50. https://www.capterra.com/p/136586/GanttProject/ — 4,2/5 bij 175 reviews; Ease of Use 4,1; **Features 4,1**; Customer Service 3,9; **Value for Money 4,6**; prijs $ 0,00

---

## Verificatie

**Adversariële fact-check, uitgevoerd 25 juli 2026.** Opzet: elke onderstaande bewering is actief *weerlegd* geprobeerd te krijgen met onafhankelijke of primaire bronnen. Het WebSearch-budget van de sessie was uitgeput; de controle is daarom gedaan met rechtstreekse HTTP-ophaal (`curl`, inclusief het downloaden en doorzoeken van JavaScript-bundels), de GitHub-API, en de Discourse-JSON-API van het officiële forum. Die aanpak leverde juist méér op dan de oorspronkelijke ronde, omdat de SPA-blokkade doorbroken kon worden.

**Uitkomst: 16 beweringen getoetst — 10 bevestigd, 5 gecorrigeerd, 1 onzeker.** Twee correcties zijn materieel: de Cloud-prijs en de bouwpositionering.

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| 1 | Desktop is volledig gratis (€/$ 0,00), GPLv3, onbeperkt gebruikers/installaties, geen seat-minimum, geen pro-editie, geen verplichte add-ons; optionele pay-what-you-wish-donatie | **BEVESTIGD** | Citaat letterlijk teruggevonden: *"All GanttProject packages are available for free. There is an option to choose a paid download and pay as much as you wish."* Licentie onafhankelijk bevestigd op drie plekken: homepage ("distributed under GPL3"), GitHub-API-veld `license: GPL-3.0`, en README ("GNU General Public License v3"). Geen enkel spoor van een betaalde desktop-editie of zetelvoorwaarde. | https://www.ganttproject.biz/ · https://api.github.com/repos/bardsoftware/ganttproject · https://raw.githubusercontent.com/bardsoftware/ganttproject/master/README.md |
| 2 | **Cloud-prijs is "niet publiek vaststelbaar"; [SCHATTING] € 3–8 per gebruiker per maand** | **GECORRIGEERD — kernfout** | Weerlegd. De prijs is volledig publiek: **1 credit = € 1,00**, en er wordt 1 credit per actieve gebruiker per facturatiecyclus in rekening gebracht. Ook publiek: minimale afname **€ 10**, 1 gratis credit per team per maand, 5 gratis credits bij aanmelding, teams van twee gratis, btw inbegrepen, Paddle.com als Merchant of Record, 30 dagen volledige restitutie. De schatting van € 3–8 was een **factor 3 à 8 te hoog**. Oorzaak van de fout: de eerste ronde concludeerde "SPA, dus onleesbaar" zonder de JS-bundel op te halen. | https://ganttproject.cloud/js/about.js (bundel achter /about/pricing en /about/tos#pricing) |
| 3 | Geen enterprise-staffels, geen volumekortingen, geen gepubliceerde SLA | **BEVESTIGD** | De ToS kent één vlak tarief zonder tiers; wel het voorbehoud *"purchase prices of subsequent credits may change"*. Geen SLA-document gevonden. Aanvulling: het model is prepaid pay-as-you-go, dus "maandelijks vs. jaarlijks" is niet van toepassing — er bestaat geen jaarabonnement. | https://ganttproject.cloud/js/about.js |
| 4 | GP Cloud is nog steeds beta (uitspraak Barashev, 15-03-2023, forum 6697) | **BEVESTIGD — en sterker dan geclaimd** | Het profiel stelde voorzichtig dat "geen aanwijzing is gevonden dat de status is opgeheven". Er is nu **positief bewijs**: de live prijspagina zegt zelf *"While GanttProject Cloud is in beta testing…"* en de privacyverklaring draagt effectieve datum **8 mei 2020** met `post-beta`-badges op toekomstige clausules. | https://ganttproject.cloud/js/about.js |
| 5 | Geen uren / sub-dag-duren | **BEVESTIGD** | FAQ letterlijk: *"Is it possible to use hours as task duration? No. In GanttProject tasks are measured in days, sorry."* Onafhankelijk bevestigd via AlternativeTo ("debated/requested/IGNORED for over 12 years") en via de 3.4-releasenotes, die niets over uren melden. | https://help.ganttproject.biz/t/8.json · https://alternativeto.net/software/ganttproject/about/ |
| 6 | Geen resource-leveling, in geen enkele vorm | **BEVESTIGD** | FAQ letterlijk: *"Can GanttProject do resource leveling? No."* Geen tegenbewijs in releasenotes t/m 3.3. | https://help.ganttproject.biz/t/8.json |
| 7 | Geen float/slack-waarden; GitHub-issue #1906 nog open | **BEVESTIGD** | Rechtstreeks nagetrokken: issue #1906 "A column indicating task float", geopend door `dbarashev` op 07-05-2021, status **OPEN** op 25-07-2026, labels `Tasks`/`TasksTable`/`enhancement`, geen milestone. Ook de scheduler-documentatie noemt float, late dates en kritiek pad in het geheel niet. | https://github.com/bardsoftware/ganttproject/issues/1906 · https://docs.ganttproject.biz/user/scheduler/ |
| 8 | Vier relatietypen (FS/FF/SS/SF), positieve én negatieve lag, hardness Strong/Rubber, en slechts één constrainttype ("Earliest begin") | **BEVESTIGD** | Alle vier onderdelen letterlijk in de officiële scheduler-documentatie: vier dependency-typen, *"can be changed to both positive and negative value"*, Strong = gelijkheid / rubber = ongelijkheid, en "Earliest begin" als enige genoemde taakconstraint. | https://docs.ganttproject.biz/user/scheduler/ |
| 9 | Kritiek pad wordt berekend en getoond | **BEVESTIGD, met verzwarende nuance** | De toggle "Show/Hide Critical Path" bestaat aantoonbaar. Maar het kritieke pad is **alleen een visualisatie**: het is geen taakattribuut, dus niet filterbaar, sorteerbaar of exporteerbaar (onweersproken forumpost; open verzoek "Boolean flag indicating if a task is on critical path"). Deze nuance is aan §2.1 toegevoegd — hij maakt het oordeel over de tool strenger, niet milder. | https://help.ganttproject.biz/search.json?q=critical%20path |
| 10 | Leverancier claimt "a few thousands" **wekelijkse gebruikers** | **GECORRIGEERD** | De homepage zegt *"A few thousands of people **download** GanttProject weekly"* — downloads, geen gebruikers. Ook: "25+ languages", niet de 18 uit SourceForge. §1 en §7.3 aangepast; de installed-base-schatting is naar boven bijgesteld en expliciet als zwak gemarkeerd. | https://www.ganttproject.biz/ |
| 11 | "Geen enkel spoor van bouwspecifiek gebruik als doelgroep" | **GECORRIGEERD — materieel** | Weerlegd door de leverancier zelf: de homepage noemt onder "GanttProject is For You" als **eerste** doelgroep *"Project managers in **construction**, architecture, engineering, media production and other industries."* De bouw wordt dus expliciet geclaimd. Het profiel is aangepast: de claim bestaat, de onderliggende functionaliteit niet — dat is een scherpere kritiek dan "bouw is geen doelgroep". | https://www.ganttproject.biz/ |
| 12 | BarD Software s.r.o. gevestigd in **Slowakije** (via AlternativeTo) | **GECORRIGEERD** | Primaire bron weerlegt het reviewplatform: ToS en Privacy Policy zeggen driemaal *"BarD Software s.r.o., a limited liability company registered in **Czech Republic**"*. AlternativeTo's "Slovakia" is onjuist. | https://ganttproject.cloud/js/about.js |
| 13 | "Niet één forumbericht noemt IFC of BIM in ruim twintig jaar" | **GECORRIGEERD (klein)** | `IFC` → 0 treffers (bevestigd). `BIM` → **1** treffer, niet nul: de thread "GANTT PROJECT x LAST PLANNER SYSTEM". `construction` → 19 treffers, alle generiek. De conclusie (nul BIM-capaciteit) blijft staan; de absolute formulering is bijgesteld. | https://help.ganttproject.biz/search.json?q=BIM |
| 14 | GitHub: ~1,1k sterren, 339 forks, 456 open issues + 15 PR's, GPLv3 | **BEVESTIGD** | GitHub-API op 25-07-2026: 1.082 sterren, 339 forks, **471** open issues+PR's (GitHub telt PR's mee in `open_issues_count`; 456 + 15 = 471, dus intern consistent), licentie GPL-3.0, laatste push 18-07-2026. Cijfers verfijnd in §1. | https://api.github.com/repos/bardsoftware/ganttproject |
| 15 | Reviewscores: Capterra 4,2/5 (175), SourceForge 4,4/5 (43) met Features 3/5, 231 downloads/week, AlternativeTo ~3,3 | **BEVESTIGD, met correctie op de interpretatie** | Alle cijfers exact bevestigd, inclusief SourceForge-versie 3.3.3300 en laatste update 07-12-2025. Maar: **Capterra geeft "Features" 4,1/5 en "Value for Money" 4,6/5.** Het profiel presenteerde SourceForge's Features-3/5 als "consistent signaal"; dat is het niet — de platforms spreken elkaar tegen. §7.4 aangevuld. | https://www.capterra.com/p/136586/GanttProject/ · https://sourceforge.net/projects/ganttproject/ |
| 16 | Concurrentie: ProjectLibre heeft MPP-lezen/schrijven én resource-leveling | **ONZEKER** | MPP openen én opslaan is bevestigd (*"full compatibility for opening and saving .mpp files"*, MS Project 2010-compatibiliteit; licentie CPAL). **Resource-leveling kon in deze ronde niet worden bevestigd** — Wikipedia noemt het niet en projectlibre.com gaf geen bruikbare featurepagina (404 op de productpagina). Laat staan als onbevestigd tot het uit de ProjectLibre-documentatie blijkt. Terzijde bevestigd: ProjectLibre Cloud kost US$ 9,99 per gebruiker per maand — bijna 10× GP Cloud. | https://en.wikipedia.org/wiki/ProjectLibre |

### Wat dit betekent voor het vertrouwen in dit profiel

- **De functionele analyse (§2, §5, §6) is robuust.** Elke geteste kernclaim over de planningsengine — geen uren, geen leveling, geen float, één constrainttype, vier relatietypen met negatieve lag, werkend kritiek pad — is met primaire bronnen bevestigd en op één punt zelfs strenger geworden. Het oordeel "halve CPM-implementatie" houdt stand.
- **De prijsanalyse was de zwakke plek.** Eén methodische misser (SPA niet doorbroken) leidde tot een verzonnen bandbreedte die er een factor 3–8 naast zat en tot het onterechte verwijt "publiceert geen prijs". Beide zijn hersteld. **Generieke les: markeer "niet vaststelbaar" pas nadat de JS-bundels zijn doorzocht.**
- **De marktpositie-cijfers blijven het zwakst.** De omzetschatting (< € 100k/jaar) en de installed-base-schatting zijn niet toetsbaar met publieke bronnen en zijn niet geverifieerd; ze staan terecht als **[SCHATTING]** maar verdienen geen gewicht in besluitvorming.
- **Onveranderd relevant voor de opdrachtgever:** GanttProject blijft geen IFC-concurrent en geen migratiedoel. De correctie dat de leverancier zich wél op de bouw richt, versterkt dat punt eerder dan dat het het verzwakt: er is een geclaimde bouwmarkt die functioneel onbediend blijft.
