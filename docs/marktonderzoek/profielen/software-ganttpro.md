# GanttPRO — diepgaand softwareprofiel

**Categorie:** online Gantt-/projectplanningtool (SaaS) voor het MKB
**Onderzoeksdatum:** 25 juli 2026
**Analist:** marktonderzoek planningssoftware (OpenAEC / Open Planner Studio)
**Betrouwbaarheidsnotitie:** alle bedragen en cijfers hieronder zijn voorzien van bron-URL en raadpleegdatum. Waar geen primaire bron bestaat, staat er expliciet **[SCHATTING]** of **[ONBEVESTIGD]**.

---

## 0. Correctie op de opdrachtaanname

De opdracht omschrijft GanttPRO als een tool uit **Oekraïne/Estland**. Dat klopt niet en is belangrijk voor due diligence:

- De oorsprong ligt in **Minsk, Belarus** — GanttPRO is ontwikkeld door **XB Software Ltd** (opgericht 2008), en de DHTMLX-blog bevestigt in het klantprofiel expliciet dat GanttPRO in Minsk gevestigd was. ([dhtmlx.com, geraadpleegd 25-07-2026](https://dhtmlx.com/blog/customer-spotlight-dhtmlxgantt-ganttpro/); [project-management.com](https://project-management.com/ganttpro-software-review/))
- De **huidige juridische entiteit is Pools**: *DPM Solutions Spółka z ograniczoną odpowiedzialnością*, Koszykarska 27B/26, 30-717 Kraków, Polen; VAT `PL6793271397`, KRS `0001046070`; Pools recht is van toepassing. ([ganttpro.com/terms-of-use](https://ganttpro.com/terms-of-use/), geraadpleegd 25-07-2026; bevestigd op [ganttpro.com/about-us](https://ganttpro.com/about-us/))
- Er is **geen bewijs gevonden** voor een Estse OÜ- of Oekraïense entiteit. **[ONBEVESTIGD]** — een verhuizing van (een deel van) het ontwikkelteam naar Polen/EU na februari 2022 is de meest waarschijnlijke verklaring voor de Poolse KRS-registratie (KRS-nummer 0001046070 duidt op registratie rond 2023), maar dat is **[SCHATTING]**.

Voor een Europese opdrachtgever is dit relevant: **de contractpartij zit in de EU (Polen), data staat in Microsoft Azure-datacenters binnen de EU** ([ganttpro.com/pricing](https://ganttpro.com/pricing/), FAQ, 25-07-2026), maar de ontwikkelhistorie en vermoedelijk een deel van het team hebben Belarussische wortels. Dat is voor sommige overheids- of nutsopdrachtgevers een aandachtspunt bij leveranciersgoedkeuring.

---

## 1. Wat het is

### Leverancier en historie

| Item | Gegeven | Bron |
|---|---|---|
| Product | GanttPRO (ganttpro.com) | — |
| Idee/start | 2014 | [about-us](https://ganttpro.com/about-us/) |
| Publieke release | 2 april 2015, aangekondigd vanuit Minsk | [Newswire persbericht](https://www.newswire.com/news/meet-ganttpro-online-gantt-chart-software-for-small-and-medium) |
| Oorspronkelijke bouwer | XB Software Ltd, Minsk (opgericht 2008, gestart met 5 developers) | [project-management.com](https://project-management.com/ganttpro-software-review/) |
| Huidige entiteit | DPM Solutions Sp. z o.o., Kraków (PL) | [terms-of-use](https://ganttpro.com/terms-of-use/) |
| Financiering | Geen bekende VC-ronde; bootstrapped **[SCHATTING]** — Crunchbase/Dealroom/Tracxn tonen een profiel zonder gerapporteerde funding | [Crunchbase](https://www.crunchbase.com/organization/ganttpro), [Tracxn](https://tracxn.com/d/companies/ganttpro/__SmbEtQlyIor3gKCTFCHO3gcxzFXHxtCKHrIFGkeXj2I) |
| Gebruikers | **[GECORRIGEERD]** De pagina zegt letterlijk *"800K+ **customers** using the software"* en *"1M+ successful projects completed"* — dus **klanten/accounts**, niet gebruikers, en dat is een wezenlijk verschil bij een per-zetel-model. De eerder vermelde toevoeging "mijlpaal 2022" staat **niet** op de pagina en is geschrapt. Blijft een **onverifieerbare eigen opgave** zonder externe onderbouwing. | [about-us](https://ganttpro.com/about-us/), geverifieerd 25-07-2026 |
| Omzet/personeel | Niet publiek. **[SCHATTING]**: orde van grootte USD 5–15 mln ARR bij ~50.000–100.000 betalende zetels; personeel 50–150. Niet onderbouwd — behandel als ruwe orde van grootte. | — |

Het verhaal dat de leverancier zelf vertelt: eerste betaling van **$9** een jaar na de start; inmiddels klanten als **Sony, Salesforce, Booking.com** (about-us), en in reviewliteratuur ook **Intel, Vodafone, NASA, Amway** ([project-management.com](https://project-management.com/ganttpro-software-review/)). Deze logo's zijn marketingclaims — ze zeggen niets over de omvang van het gebruik binnen die organisaties.

### Doelgroep en typische gebruikers

- **Primair:** kleine en middelgrote teams (5–100 personen) die een **visueel, deelbaar tijdschema** nodig hebben en Microsoft Project te zwaar/te duur vinden.
- **Typische gebruiker:** projectmanager, teamlead, marketingmanager, bouwkundig projectleider bij een kleine aannemer, docent/student. Reviewers benadrukken herhaaldelijk dat niet-technische teamleden er binnen een uur mee werken.
- **Sectoren** (op volgorde van zichtbaarheid in reviews en eigen use-case-pagina's): IT/softwareontwikkeling, marketing/agency, **bouw en constructie**, professional services, onderwijs, non-profit. ([Capterra](https://www.capterra.com/p/142293/GanttPRO/), [blog.ganttpro.com use cases](https://blog.ganttpro.com/en/top-use-cases-ganttpro-users-love/))
- **Regio's:** wereldwijd verkocht in USD; sterke aanwezigheid in Noord-Amerika en Europa. Interface historisch beschikbaar in Engels, Russisch, Duits, Spaans en Portugees ([project-management.com](https://project-management.com/ganttpro-software-review/)) — **[ONBEVESTIGD]** of dat in 2026 nog exact zo is. Geen Nederlandstalige interface aangetroffen.

---

## 2. Functionaliteit en techniek — hoe "echt" is de planning?

### 2.1 De technische onderbouw (belangrijk voor het oordeel)

GanttPRO is **geen zelfgebouwde planningsengine**. Het is een SaaS-schil om een commerciële JavaScript-Ganttcomponent:

> "our Gantt chart JS library has been a core component of GanttPRO for over 5 years" — DHTMLX over GanttPRO. GanttPRO gebruikt daarnaast **Webix Jet**, **Vue.js** (client) en **Node.js** (backend). ([dhtmlx.com/blog/customer-spotlight-dhtmlxgantt-ganttpro](https://dhtmlx.com/blog/customer-spotlight-dhtmlxgantt-ganttpro/), geraadpleegd 25-07-2026)

De DHTMLX-features die GanttPRO expliciet benut zijn volgens diezelfde bron: **auto scheduling, critical path, dynamic loading, resource management, tijdschalen en taakgroepering**.

Dit is de sleutel tot een streng oordeel. De rekenkern is de **DHTMLX auto-scheduling module**: een topologische doorrekening van het afhankelijkheidsnetwerk (forward pass) met vier relatietypen en lag/lead, plus een longest-path-markering voor het kritieke pad. Dat is **wél echte netwerkplanning** — het is nadrukkelijk méér dan de "gekleurde balkjes zonder rekenkern" die je bij monday.com, Asana Timeline of Notion ziet. Maar het is **niet** het volledige CPM-apparaat van MS Project of Primavera P6.

**[ONBEVESTIGD]** De veelgehoorde bewering dat XB Software zowel DHTMLX als GanttPRO bezit, kon ik in dit onderzoek niet met een primaire bron staven; de DHTMLX-blog presenteert GanttPRO als *klant*, niet als zusterproduct. Behandel de relatie als "leverancier–klant, mogelijk verbonden".

### 2.2 Wat aantoonbaar aanwezig is

| Capaciteit | Aanwezig? | Detail / bron |
|---|---|---|
| **Afhankelijkheidstypen** | Ja — "four standard types" | FS/SS/FF/SF. GanttPRO noemt ze niet expliciet bij naam op de featurepagina, maar DHTMLX Gantt ondersteunt finish-to-start, start-to-start, finish-to-finish en start-to-finish. ([ganttpro.com/dependencies](https://ganttpro.com/dependencies/); [docs.dhtmlx.com/gantt](https://docs.dhtmlx.com/gantt/)) |
| **Lag / lead** | Ja | **[GECORRIGEERD 25-07-2026]** De officiële pagina schrijft letterlijk: *"Connect tasks with one out of four types of dependencies, setting up **lag (-) or lead (+)** with the simplicity of drag & drop."* Dat is omgekeerd aan de gangbare PM-conventie (positief = lag, negatief = lead) die eerder in dit profiel stond. Welke van de twee de UI daadwerkelijk hanteert is **[ONZEKER]** — de kennisbank (die uitsluitsel zou geven) gaf HTTP 403. Neem het teken niet klakkeloos over bij een importer. ([ganttpro.com/dependencies](https://ganttpro.com/dependencies/), geverifieerd 25-07-2026) |
| **Auto scheduling** | Ja, aan per default, uitzetbaar | "recalculates task schedules when you change the start and/or end dates of the tasks connected with dependencies". Uit te zetten in projectinstellingen → dan volledig handmatig plannen. ([help.ganttpro.com Project settings](https://help.ganttpro.com/hc/en-us/articles/5423962258449-Project-settings)) |
| **Kritiek pad** | Ja, maar als **toggle per project** | "switch on the critical path in the project settings in one click… shown in red". ([ganttpro.com/critical-path](https://ganttpro.com/critical-path/), [help.ganttpro.com Critical path](https://help.ganttpro.com/hc/en-us/articles/5593265704849-Critical-path)) |
| **Baselines** | Ja | Snapshot van het oorspronkelijke plan, vergelijkbaar met de actuele situatie; ook in Excel-export mee te nemen. ([ganttpro.com/ganttpro-features](https://ganttpro.com/ganttpro-features/)) |
| **Kalenders** | Ja | Projectkalender met werkdagen, werkuren, pauzes en uitzonderingen; **persoonlijke kalenders per teamlid**. Kalenderuitzonderingen zitten pas vanaf het **Advanced**-plan. ([ganttpro.com/pricing](https://ganttpro.com/pricing/), [ganttpro.com/ganttpro-features](https://ganttpro.com/ganttpro-features/)) |
| **WBS-hiërarchie** | Ja | Projecten → groepen → taken → subtaken → mijlpalen. ([help.ganttpro.com Types of tasks and levels](https://help.ganttpro.com/hc/en-us/articles/16403302087314-Types-of-tasks-and-levels)) |
| **Resourcemodel** | Ja, drie typen | Teamleden (labor) + **virtuele resources**: material en fixed cost. Kosten per uur, per stuk of vast bedrag. Meerdere toegewezen personen per taak met automatische urenverdeling. ([ganttpro.com/ganttpro-features](https://ganttpro.com/ganttpro-features/)) |
| **Kostenmodel / budget** | Ja, vanaf **Business** | Budget berekend uit taken + resources; *actual cost* uit tijdregistratie of voortgangspercentage; budgetrapport. ([ganttpro.com/ganttpro-features](https://ganttpro.com/ganttpro-features/), [pricing](https://ganttpro.com/pricing/)) |
| **Workload / overbelasting** | Ja, vanaf **Business** | Workload-view toont over- en onderbezetting; herverdeling is **handmatig**. ([ganttpro.com/ganttpro-features](https://ganttpro.com/ganttpro-features/)) |
| **Tijdregistratie** | Ja, vanaf **Business** | Timer + handmatige logs, exporteerbare tijdrapporten. |
| **Portfolio** | Ja, vanaf **Business** | Meerdere projecten in één weergave. |
| **Weergaven** | Gantt, Board (kanban), List/Grid, Calendar (Advanced), Dashboard (Business) | ([Capterra pricing](https://www.capterra.com/p/142293/GanttPRO/pricing/)) |

### 2.3 Wat aantoonbaar ontbreekt of niet gedocumenteerd is — het strenge deel

Dit is waar GanttPRO als **planningsinstrument** onder een klassieke CPM-tool blijft. Ik heb hier specifiek naar gezocht en niets gevonden in de officiële documentatie, de featurepagina's of de API-documentatie:

1. **Geen expliciete constraint-typen.** MS Project/P6 kennen SNET, SNLT, FNET, FNLT, MSO, MFO, ASAP, ALAP. In de GanttPRO-documentatie komen deze niet voor. Er is auto-scheduling aan/uit en er zijn afhankelijkheden — meer niet. **Beoordeling: afwezig (bevestigd 25-07-2026).**
   **[NUANCE, toegevoegd na verificatie]** Er bestaat wél een **`deadline`-veld** — zowel als taakattribuut in de REST API als als feature op de featurepagina. Het is echter géén constraint: *"Precisely track the deadlines of your tasks. GanttPRO sends email and push notifications and makes them visual on the diagram."* Het is dus een markering met notificaties, die de doorrekening niet stuurt en geen late dates genereert. Dat versterkt de conclusie in plaats van haar te verzwakken. ([ganttpro.com/ganttpro-features](https://ganttpro.com/ganttpro-features/), [developer.ganttpro.com](https://developer.ganttpro.com/), beide geverifieerd 25-07-2026)
2. **Geen zichtbare float/slack-waarden.** **Bevestigd bij hercontrole 25-07-2026.** De critical-path-pagina noemt uitsluitend *"the longest chain of tasks"* en een rode markering — geen slack, geen float, geen late dates, geen backward pass. De API-taakobjecten bevatten alléén `startDate`, `endDate`, `duration`, `estimation`, `progress`, `status` en `deadline`: **geen** `float`/`slack`/`lateStart`/`lateFinish`/`earlyStart`/`earlyFinish`/`constraintType`. Zonder float kun je niet prioriteren op speelruimte, geen near-critical-analyse doen en geen fatsoenlijke vertragingsanalyse uitvoeren. **Dit is het zwaarste functionele gat voor CPM-gebruik.** ([ganttpro.com/critical-path](https://ganttpro.com/critical-path/), [developer.ganttpro.com](https://developer.ganttpro.com/))
3. **Geen backward pass zichtbaar / geen planning vanaf een einddatum.** Er is geen gedocumenteerde optie om een project vanaf de opleverdatum terug te plannen (ALAP-scheduling). Kritiek pad wordt daarmee vermoedelijk afgeleid uit de langste keten, niet uit een echte late-dates-berekening. **[SCHATTING]** op basis van het ontbreken van late-date-velden in documentatie en API.
4. **Geen resource leveling.** Er is een workload-*visualisatie*, maar geen algoritme dat taken automatisch verschuift om overallocatie op te lossen. Reviewers bevestigen dit: "does not offer advanced resource forecasting tools" ([projectmanagers.net](https://projectmanagers.net/the-pros-and-cons-of-using-ganttpro-software/)).
5. **Geen risicoanalyse.** Geen Monte Carlo, geen drie-punts-schattingen, geen PERT.
6. **Geen earned value management.** Wel budget vs. actual cost, maar geen BCWS/BCWP/CPI/SPI.
7. **Geen verdiencurve/S-curve, geen resource-histogram als planningsinstrument** (alleen workloadweergave).
8. **Kritiek pad en baseline zijn prestatie-schakelaars, geen basisstaat.** De eigen kennisbank adviseert letterlijk om ze **uit te zetten** bij grote projecten:
   > "Keeping the critical path always enabled in projects with many tasks can slow down performance… disable it when not needed to prevent overloading the system with unnecessary calculations." — [help.ganttpro.com, Maximizing GanttPRO's performance](https://help.ganttpro.com/hc/en-us/articles/25405684007954-Maximizing-GanttPRO-s-performance)

   Dat is diagnostisch. In een echte CPM-tool ís de netwerkberekening de motor; hier is het een optionele visualisatielaag die je uitzet als hij in de weg zit. Voor een planner die dagelijks op het kritieke pad stuurt, is dat de verkeerde architectuur.

### 2.4 Platform en schaalbaarheid

- **Architectuur:** browsergebaseerde SPA (Vue.js + DHTMLX Gantt + Webix Jet), Node.js-backend, **hosting in Microsoft Azure-datacenters in de EU** ([pricing-FAQ](https://ganttpro.com/pricing/), 25-07-2026).
- **Geen desktopapplicatie, geen offline-modus.** Reviewers noemen "no offline functionality" expliciet als beperking ([eLearning Industry](https://elearningindustry.com/directory/elearning-software/ganttpro/reviews)).
- **Mobiele apps (iOS/Android)** bestaan, maar zijn functioneel arm: "the smartphone app is limited; you cannot work with Gantt chart" ([projectmanagers.net](https://projectmanagers.net/the-pros-and-cons-of-using-ganttpro-software/)). **[GENUANCEERD 25-07-2026]** De eerder genoemde "4,4 — het laagste subcijfer" is geen review-subscore maar de **feature-rating voor "Mobile access"** op GetApp (Android/iPhone/iPad ondersteund). GetApp voert mobiel niet als aparte subscore op; de vier echte subscores zijn ease of use, features, value for money en customer support. Het cijfer 4,4 klopt, de kwalificatie "laagste subscore" niet. ([GetApp](https://www.getapp.com/project-management-planning-software/a/ganttpro/reviews/))
- **Officiële schaallimiet [ONZEKER — herverificatie mislukt]:**
  > "GanttPRO supports up to **10.000 tasks** within a single project or portfolio while maintaining stable performance on mid-range systems (Intel i5, 8GB RAM, 8th gen and beyond). Exceeding this limit may lead to slowdowns." — [help.ganttpro.com, Maximizing GanttPRO's performance](https://help.ganttpro.com/hc/en-us/articles/25405684007954-Maximizing-GanttPRO-s-performance)

  **Verificatienotitie 25-07-2026:** het hele kennisbankdomein `help.ganttpro.com` gaf bij hernieuwde poging **HTTP 403**. Dit citaat (en het advies om kritiek pad/baseline uit te zetten, §2.3 punt 8 en §5 punt 2) stamt uit een zoekresultaatsamenvatting en is **niet direct aan de bron geverifieerd**. De strekking sluit aan bij onafhankelijke reviewerklachten over traagheid, maar behandel het exacte getal 10.000 en de exacte citaten als **[ONZEKER]**.
- **Realistische schaal [SCHATTING]:** met kritiek pad én baseline ingeschakeld, veel afhankelijkheden en auto-scheduling aan, is de praktische comfortgrens naar mijn inschatting **±1.000–2.000 taken per project**. Onderbouwing: de kennisbank noemt dependencies + auto-scheduling, critical path en baseline elk apart als prestatierisico, en reviewers melden vertraging bij "large projects" ver onder 10.000 taken ("the website can be quite slow… it slows down more when your project gets bigger", [projectmanagers.net](https://projectmanagers.net/the-pros-and-cons-of-using-ganttpro-software/)). De 10.000-claim is een bovengrens onder gunstige omstandigheden, geen werkbare planningsomvang.
- **Ter vergelijking:** een middelgroot bouwproject in P6 telt al snel 3.000–15.000 activiteiten, een groot infraproject 30.000+. GanttPRO valt daar buiten.

---

## 3. Prijzen

**Primaire bron: [ganttpro.com/pricing](https://ganttpro.com/pricing/), geraadpleegd 25 juli 2026.** Alle bedragen in **USD, per gebruiker per maand, bij jaarlijkse facturatie.**

| Plan | Prijs (jaarlijks gefactureerd) | Min. zetels | Kern van het plan |
|---|---|---|---|
| **Core** | **$7** | 1 (zie noot) | Gantt-chart, Board- en List-view, projectkalender, auto scheduling, onbeperkte virtuele resources, taakstatus/prioriteit |
| **Advanced** | **$10** | 1 | + custom fields, filters, **kalenderuitzonderingen**, templates, overdue-tracking, Calendar-view |
| **Business** | **$17** | 1 | + **workload management, portfolio's, budgetplanning, tijdregistratie**, Dashboard-view |
| **Enterprise** | **$25** (afgeprijsd van **$35**) | **5+, alleen jaarlijks** | + SAML SSO, custom roles & rights, priority support, onboarding-begeleiding |

### Aanvullende prijsfeiten (zelfde bron, zelfde datum)

- **Gratis tier: nee.** Alleen een **14-daagse volledige proefperiode**, zonder creditcard. Capterra bevestigt: "Free Version: No". ([Capterra pricing](https://www.capterra.com/p/142293/GanttPRO/pricing/), 25-07-2026)
- **Jaarkorting: 20%** ten opzichte van maandelijkse facturatie (de prijspagina toont "-20%" bij de jaartoggle).
- **Afgeleide maandprijzen [BEREKEND, niet direct afgelezen — en ONZEKER]:** $7 / 0,8 ≈ **$8,75**; $10 / 0,8 ≈ **$12,50**; $17 / 0,8 ≈ **$21,25**. De prijspagina rendert de maandbedragen via JavaScript en gaf ze ook bij hercontrole (25-07-2026) niet prijs.
  **[WAARSCHUWING toegevoegd na verificatie]** Deze afleiding veronderstelt dat maandprijs = jaarprijs / 0,8 voor élke laag. Dat klopt historisch niet: projectmanagers.net (gepubliceerd 20-10-2025) noteerde jaarprijzen $8 / $12 / $19 naast maandprijzen $9 / $15 / $24 — dat is respectievelijk ~11%, 20% en 21% korting, dus geen uniforme 20%. De $8,75/$12,50/$21,25 zijn daarom **rekenkundig correct maar empirisch onbevestigd**; gebruik ze niet in een offerte of TCO-berekening zonder dagverse bevestiging. ([projectmanagers.net/ganttpro-pricing](https://projectmanagers.net/ganttpro-pricing/), geraadpleegd 25-07-2026)
- **Externe bronnen wijken af** — behandel de officiële pagina als leidend en verwacht regionale/promotionele variatie:
  - Capterra noemt Enterprise **$20 "Limited Offer"** ([Capterra pricing](https://www.capterra.com/p/142293/GanttPRO/pricing/), 25-07-2026) tegenover $25 op de eigen site.
  - Andere aggregators noemen maandprijzen Core **$9**, Advanced **$15**, Business **$24**, Enterprise **$30**, en oudere reviews $7,99/$12,99 per gebruiker ([project-management.com](https://project-management.com/ganttpro-software-review/); [projectmanagers.net](https://projectmanagers.net/ganttpro-pricing/)).
  - Conclusie: **de prijslijst is de afgelopen jaren meermaals herzien en aggregators lopen achter.** Vraag bij een aanbesteding altijd een dagverse offerte.
- **Jaarkosten per gebruiker (afgeleid van de officiële jaarprijzen):** Core **$84**, Advanced **$120**, Business **$204**, Enterprise **$300**.
- **Rekenvoorbeeld team van 10, Business, jaarlijks:** 10 × $17 × 12 = **$2.040 per jaar** vóór eventuele volumekorting.
- **Volumekorting:** de prijspagina toont een teamgrootte-selector met **1, 5, 10, 15, 20** en verder **25, 30, 35, 40+** leden, met de tekst *"Lower price per user for larger teams."* — beide **bevestigd bij hercontrole 25-07-2026**. De **exacte staffelpercentages worden niet gepubliceerd** — die moet je uitonderhandelen. Dat de korting bij **20+ zetels** begint is nu onderbouwd met een **onafhankelijke bron** in plaats van een geblokkeerd kennisbankartikel: *"discounts available for annual subscriptions for teams of 20 or more"* ([projectmanagers.net/ganttpro-pricing](https://projectmanagers.net/ganttpro-pricing/), 20-10-2025, geraadpleegd 25-07-2026).
- **Minimum zetels — let op de tegenspraak.** De officiële pagina laat de selector bij 1 gebruiker beginnen en noemt alleen bij Enterprise "5+ users with an annual subscription" — **bevestigd 25-07-2026**; de Terms of Use zwijgen volledig over minimumzetels of zetelstappen. Het **5-zetelminimum bij maandelijkse facturatie** staat dus **niet** op een primaire bron, maar is wel door twee onafhankelijke bronnen bevestigd. Expliciet bij projectmanagers.net: *"Monthly plans require at least five users."* ([projectmanagers.net/ganttpro-pricing](https://projectmanagers.net/ganttpro-pricing/), 20-10-2025) — plus een Capterra-reviewer die schrijft:
  > "they enforce a 5-user minimum subscription tier. If you are a freelancer, a duo, or a tiny team of three, you are still forced to pay for five seats." ([Capterra](https://www.capterra.com/p/142293/GanttPRO/), 25-07-2026)

  **Praktische lezing:** 1 zetel kan bij jaarbetaling; maandbetaling is per 5. Verifieer dit bij inkoop.
- **Kortingen:** **50% op elk jaarplan** voor non-profits, onderwijs, studenten/docenten en gezondheidszorg (op aanvraag bij support). ([pricing-FAQ](https://ganttpro.com/pricing/))
- **Betaalmethoden:** creditcard, PayPal, wire transfer, purchase order.
- **Add-ons:** GanttPRO verkoopt **geen losse add-ons**. Alles loopt via plan-gating. Dat betekent wel dat je functies die bij klassieke tools standaard zijn (tijdregistratie, budget, portfolio) alleen krijgt door naar **Business ($17)** te springen — meer dan een verdubbeling ten opzichte van Core. **[GECORRIGEERD 25-07-2026]** Eerder stond hier dat de plan-gating van API en Jira Cloud "[ONBEVESTIGD op primaire bron]" was. Dat is onjuist: de vergelijkingstabel op [ganttpro.com/pricing](https://ganttpro.com/pricing/) gate't beide wel degelijk expliciet — **API-toegang en de Jira Cloud-integratie staan op `false` bij Core en Advanced en op `true` vanaf Business**. Dat maakt de gating strenger dan het profiel eerst aannam: wie GanttPRO via de API wil koppelen (de enige route die kalenders en afhankelijkheden verliesvrij meeneemt, zie §6) betaalt **minimaal $17 per gebruiker per maand**. Voor een integratiescenario is dat de effectieve instapprijs, niet $7.
- **Trial-beperking:** exports tijdens de proefperiode krijgen een **watermerk** ([GetApp](https://www.getapp.com/project-management-planning-software/a/ganttpro/reviews/), 25-07-2026).

### Prijspositionering

Core op $7 is **goedkoop** — vergelijkbaar met TeamGantt en onder monday.com/Smartsheet. Maar de bruikbare configuratie voor een planner (budget + workload + portfolio + tijdregistratie) is **Business op $17**, en daar zit GanttPRO in hetzelfde vaarwater als Smartsheet, Wrike en ProjectManager.com — terwijl de planningsdiepte lager is. De "vanaf $7"-boodschap is dus enigszins misleidend voor de doelgroep die dit rapport betreft.

---

## 4. VOORDELEN

1. **Er zit een echte netwerkkern onder, geen namaak-Gantt.** Vier afhankelijkheidstypen met lag/lead, auto-scheduling die de keten daadwerkelijk doorrekent, en een kritieke-padberekening. Daarmee staat GanttPRO **boven** het gros van de "work management"-tools (monday.com, Asana, Notion, Trello Timeline) die een balk tekenen zonder rekenkern. Onderbouwing: [ganttpro.com/dependencies](https://ganttpro.com/dependencies/), [DHTMLX-klantprofiel](https://dhtmlx.com/blog/customer-spotlight-dhtmlxgantt-ganttpro/).
2. **Uitzonderlijk lage leerdrempel voor een planningstool.** **[GECORRIGEERD 25-07-2026]** Eerder stond hier "consistent hoogste subscore op ease of use (4,8/5)". Bij hercontrole klopt dat niet precies: **Capterra toont ease of use 4,7** (naast features 4,7, value for money 4,7 en **customer service 4,8** — die laatste is dus de hóógste subscore, niet ease of use). GetApp toont voor dezelfde reviewpool wél **ease of use 4,8**; het verschil is afrondings-/weergaveverschil tussen de twee Gartner-zusterplatforms. De onderliggende observatie blijft overeind — ease of use zit consistent op 4,7–4,8 en reviewers melden herhaaldelijk dat niet-technische teamleden binnen een dag productief zijn — maar "hoogste subscore" was onjuist. ([Capterra](https://www.capterra.com/p/142293/GanttPRO/), [GetApp](https://www.getapp.com/project-management-planning-software/a/ganttpro/reviews/), beide 25-07-2026)
3. **Volwaardig kalendermodel inclusief persoonlijke resource-kalenders.** Werkdagen, werkuren, pauzes en uitzonderingen op projectniveau plus afwijkende kalenders per teamlid — dat is meer dan veel SaaS-concurrenten bieden en essentieel voor realistische doorlooptijden. ([ganttpro.com/ganttpro-features](https://ganttpro.com/ganttpro-features/))
4. **Kosten- en resourcemodel met drie resourcetypen.** Labor, material en fixed cost, met tarieven per uur / per stuk / vast, plus *actual cost* afgeleid uit tijdregistratie of voortgang. Voor een tool in deze prijsklasse is dat opvallend compleet. ([ganttpro.com/ganttpro-features](https://ganttpro.com/ganttpro-features/))
5. **Baselines aanwezig.** Plan-versus-actueel vergelijken, inclusief baselinedata in de Excel-export. Veel goedkope Gantt-tools laten dit weg; hier zit het erin. ([ganttpro.com/ganttpro-features](https://ganttpro.com/ganttpro-features/))
6. **Directe MPP-import.** `.mpp`-bestanden uit MS Project kunnen rechtstreeks worden geïmporteerd, naast `.xlsx`, `.csv` en Jira Cloud. Dat verlaagt de migratiedrempel voor teams die al een MS Project-plan hebben liggen. ([ganttpro.com/integrations](https://ganttpro.com/integrations/), [help.ganttpro.com Importing a project](https://help.ganttpro.com/hc/en-us/articles/5423958492945-Importing-a-project))
7. **Publieke REST API met webhooks.** `https://api.ganttpro.com/v1.0/`, authenticatie via `X-API-KEY`, objecten voor tasks, projects, resources, **links (afhankelijkheden)**, comments, attachments, time logs, roles en team; webhooks voor taak-, tijdlog-, comment-, attachment- en resource-events. Codevoorbeelden in Node, Ruby, JavaScript en Python. Dat maakt eigen koppelingen bouwbaar. ([developer.ganttpro.com](https://developer.ganttpro.com/), geraadpleegd 25-07-2026)
8. **Data in de EU, EU-contractpartij.** Microsoft Azure-datacenters binnen de EU en een Poolse rechtspersoon met Pools recht — praktisch voor AVG-verantwoording bij Europese opdrachtgevers. ([pricing-FAQ](https://ganttpro.com/pricing/), [terms-of-use](https://ganttpro.com/terms-of-use/))
9. **Zeer goede supportreputatie.** Support scoort 4,8/5 op Capterra met 24/7 live chat, e-mail, kennisbank en webinars — voor een tool van deze prijs ongebruikelijk. ([Capterra](https://www.capterra.com/p/142293/GanttPRO/))
10. **50% korting voor onderwijs, zorg en non-profit**, wat de instapdrempel voor die sectoren effectief halveert. ([pricing-FAQ](https://ganttpro.com/pricing/))

---

## 5. NADELEN

1. **Geen float/slack-waarden, geen constraint-typen — dus geen volwaardige CPM.** Het kritieke pad is een rode markering, geen analytisch instrument. Er zijn geen total-float/free-float-kolommen aangetroffen in documentatie of API, en geen SNET/FNLT/MSO-achtige constraints. Vertragingsanalyse, near-critical-monitoring en contractuele claimonderbouwing zijn daarmee niet te doen. *(Bevinding uit gericht zoeken; zie §2.3.)*
2. **Kritiek pad en baseline moeten uitgezet worden om de tool snel te houden.** De leverancier adviseert dit zelf in de kennisbank. Voor een planner die continu op het kritieke pad stuurt, is dat een fundamentele architectuurbeperking, geen instelling. ([help.ganttpro.com, Maximizing GanttPRO's performance](https://help.ganttpro.com/hc/en-us/articles/25405684007954-Maximizing-GanttPRO-s-performance))
3. **Prestatieproblemen bij grote schema's.** Officiële bovengrens 10.000 taken; in de praktijk melden reviewers al vertraging veel eerder: "the website can be quite slow, it seems to slow down more when your project gets bigger" en "occasional glitches, such as task renaming not saving correctly". ([projectmanagers.net](https://projectmanagers.net/the-pros-and-cons-of-using-ganttpro-software/), [eLearning Industry](https://elearningindustry.com/directory/elearning-software/ganttpro/reviews))
4. **Geen resource leveling of resourceprognose.** De workload-view laat overbelasting *zien*; oplossen is handwerk. "GanttPRO does not offer advanced resource forecasting tools, making it challenging for managers to predict team workload accurately over long-term projects." ([projectmanagers.net](https://projectmanagers.net/the-pros-and-cons-of-using-ganttpro-software/))
5. **Geen gratis tier en een 14-daagse trial met watermerk op exports.** Meerdere reviewbronnen noemen de trial "too short to fully explore all features", en één reviewer verwoordt het bruut: "you need to buy a plan to recover your gantt project so it's useless". Voor studenten en zzp'ers een reële adoptiedrempel. ([GetApp](https://www.getapp.com/project-management-planning-software/a/ganttpro/reviews/), [eLearning Industry](https://elearningindustry.com/directory/elearning-software/ganttpro/reviews))
6. **Het 5-zetelminimum bij maandbetaling raakt precies de kleinste doelgroep.** "If you are a freelancer, a duo, or a tiny team of three, you are still forced to pay for five seats." Dat is 5 × $8,75 ≈ **$44/maand** voor een eenmanszaak die alleen een balkenschema wil. ([Capterra](https://www.capterra.com/p/142293/GanttPRO/))
7. **Agressieve plan-gating duwt je snel naar $17.** Tijdregistratie, budget, workload, portfolio en dashboards zitten pas in Business; custom fields, filters en kalenderuitzonderingen pas in Advanced. De "vanaf $7"-instap is voor serieus planningswerk onbruikbaar. ([ganttpro.com/pricing](https://ganttpro.com/pricing/))
8. **Beperkte mobiele app.** Je kunt de Gantt-chart er niet mee bewerken; de GetApp-**feature-rating** voor "Mobile access" staat op 4,4/5 (zie correctie in §2.4 — dit is geen review-subscore). Voor bouw — waar de uitvoerder op de bouwplaats staat — is dat een reëel gemis. ([projectmanagers.net](https://projectmanagers.net/the-pros-and-cons-of-using-ganttpro-software/), [GetApp](https://www.getapp.com/project-management-planning-software/a/ganttpro/reviews/))
9. **Klunzig herstructureren van grote schema's.** "Moving tasks and subtasks within GanttPRO can feel clunky and unintuitive, especially in complex projects… it's not possible to move tasks to subtasks and having to copy and paste tasks individually can be very time consuming." Ook de undo-functie krijgt kritiek. ([projectmanagers.net](https://projectmanagers.net/the-pros-and-cons-of-using-ganttpro-software/), [GetApp](https://www.getapp.com/project-management-planning-software/a/ganttpro/reviews/))
10. **Magere rapportage en beperkte export-opmaak.** Dashboards zijn "basic overviews only; limited tailored reporting capabilities" — vaak zijn externe tools nodig. Reviewers noemen ook beperkte lettertype-/kleuraanpassing en "limited export formatting options". ([projectmanagers.net](https://projectmanagers.net/the-pros-and-cons-of-using-ganttpro-software/), [eLearning Industry](https://elearningindustry.com/directory/elearning-software/ganttpro/reviews))
11. **Dunne integratielaag.** Slack, MS Teams, Google Drive, OneDrive, Jira Cloud, MS Project/Excel-import en de API — meer is er niet. Geen Zapier, geen Outlook, geen ERP, geen bouwspecifieke koppelingen. ([ganttpro.com/integrations](https://ganttpro.com/integrations/))
12. **Geen offline-modus en geen desktopclient.** Geen internet = geen planning. Voor bouwplaatsgebruik en voor beveiligde omgevingen een blokkade. ([eLearning Industry](https://elearningindustry.com/directory/elearning-software/ganttpro/reviews))

---

## 6. Interoperabiliteit — kritisch voor een IFC-gebaseerde planner

### Wat er in en uit kan

| Formaat | Import | Export | Opmerking |
|---|:--:|:--:|---|
| **MPP** (MS Project binair) | **Ja** | **Nee** | Import via de MS Project-integratie. Eenrichtingsverkeer: je komt binnen, je komt er niet in dit formaat weer uit. ([integrations](https://ganttpro.com/integrations/), [help.ganttpro.com Importing a project](https://help.ganttpro.com/hc/en-us/articles/5423958492945-Importing-a-project)) |
| **XML** (vermoedelijk MSPDI) | Onduidelijk | **Ja, maar beperkt** | "When exporting in XML format, only **basic project information** is included… XML and Excel export **do not include a Gantt chart**." Of dit valide MSPDI is dat MS Project inleest, is **[ONBEVESTIGD]** — de documentatie zegt het niet. ([help.ganttpro.com Exporting a project](https://help.ganttpro.com/hc/en-us/articles/5584426869649-Exporting-a-project)) |
| **XLSX / Excel** | **Ja** | **Ja** (met filters en baselinedata) | ([help.ganttpro.com Importing from Excel](https://help.ganttpro.com/hc/en-us/articles/5584346852753-Importing-from-Excel)) |
| **CSV** | **Ja** | Onduidelijk | Import van databases in `.csv`. CSV-export niet expliciet gedocumenteerd. |
| **PDF / PNG** | — | **Ja**, met de meeste opmaakopties | Rapportage-/presentatieformaten. |
| **Jira Cloud** | **Ja** | Nee | Projectimport. |
| **XER (Primavera P6)** | **Nee** | **Nee** | Nergens genoemd. |
| **P6 XML / PMXML** | **Nee** | **Nee** | Nergens genoemd. |
| **IFC 4.3 / IfcWorkSchedule / IfcTask** | **Nee** | **Nee** | Geen enkele vermelding van IFC, buildingSMART, BCF, BIM of 4D in de gehele productdocumentatie, integratiepagina of API-referentie. |
| **REST API** | **Ja** | **Ja** | `api.ganttpro.com/v1.0/`, `X-API-KEY`, **public beta**, rate limit **5 req/s** voor insert/delete/update. Objecten: tasks, projects (incl. calendars/custom workdays), resources, **links**, users, comments, attachments, time logs, roles, team. Webhooks aanwezig. ([developer.ganttpro.com](https://developer.ganttpro.com/)) |

### Beoordeling voor de opdrachtgever (open-source, IFC-gebaseerde planner)

- **GanttPRO is geen BIM-tool en heeft geen enkel raakvlak met IFC.** Er is geen IfcWorkSchedule/IfcTask-ondersteuning, geen koppeling naar IfcProduct voor 4D, geen BCF, geen viewer. Wie een 4D-planning wil koppelen aan een model, kan met GanttPRO niets. Dat is meteen het scherpste onderscheid met wat de opdrachtgever bouwt.
- **De enige realistische uitwisselingsroutes zijn Excel/CSV en de REST API.** Voor een open-source planner betekent dat:
  - **Import vanuit GanttPRO:** haalbaar via de API (`tasks` + `links` geven je de netwerkstructuur, `resources` de toewijzingen) of via een Excel-export. De API is de betere route omdat de Excel-export de afhankelijkheidsstructuur niet gegarandeerd meeneemt.
  - **Export naar GanttPRO:** via `.xlsx`/`.csv`-import of via de API. De rate limit van **5 schrijfacties per seconde** maakt bulkmigratie van een schema van 2.000 taken tot een operatie van enkele minuten — werkbaar, maar niet elegant.
  - **Rond-trip is niet verliesvrij.** Kalenders, baselines, kosten en custom fields overleven een Excel-heen-en-weer vrijwel zeker niet. De API is de enige weg die kalenders en custom workdays raakt.
- **Vendor lock-in: middelhoog.** Je data komt eruit, maar alleen in rapportageformaten (PDF/PNG/XLSX) of via een beta-API. Er is geen open, gestandaardiseerd projectuitwisselingsformaat. Wie GanttPRO verlaat richting MS Project of P6 doet dat handmatig of via een eigen script.
- **Aandachtspunt voor concurrentieanalyse:** GanttPRO's MPP-**import** is precies de functie die de opdrachtgever ook zou moeten hebben. Het is de belangrijkste migratiehefboom in dit segment, en GanttPRO gebruikt hem actief in de marketing ("If you already started your plan in MS Project, you can import it directly to GanttPRO in seconds").

---

## 7. Marktpositie

### Reputatie en beoordelingen (peildatum 25-07-2026)

| Platform | Score | Aantal reviews | Subscores | Bron |
|---|---|---|---|---|
| Capterra | **4,8 / 5** ✅ geverifieerd | **551** ✅ | ease of use **4,7**, customer service **4,8**, features **4,7**, value for money **4,7** | [capterra.com](https://www.capterra.com/p/142293/GanttPRO/) |
| GetApp | **4,8 / 5** ✅ geverifieerd | **551** ✅ | ease of use **4,8**, customer support **4,8**, features 4,7, value for money 4,7 | [getapp.com](https://www.getapp.com/project-management-planning-software/a/ganttpro/reviews/) |
| G2 | 4,8 / 5 **[ONZEKER]** | ±553–560 **[ONZEKER]** | — | [g2.com](https://www.g2.com/products/ganttpro-ganttpro/reviews) — **fetch opnieuw geblokkeerd (HTTP 403) op 25-07-2026; niet onafhankelijk te verifiëren, niet gebruiken als hard cijfer** |
| eLearning Industry | 85% **[ONZEKER]** | 69 | — | [elearningindustry.com](https://elearningindustry.com/directory/elearning-software/ganttpro/reviews) — niet opnieuw geverifieerd |

*Let op: Capterra en GetApp zijn beide Gartner-eigendom en delen dezelfde reviewpool (551) — het zijn géén twee onafhankelijke bevestigingen. De subscores verschillen licht tussen beide weergaven (ease of use 4,7 vs 4,8).*

GanttPRO wint met regelmaat G2-badges (Leader, Best Usability, Best Value) en Capterra-onderscheidingen voor *ease of use* en *value for money*. Let op de leesregel: **4,8 bij ~550 reviews betekent een tevreden maar relatief kleine gebruikersbasis van reviewers**, en de reviewers zijn overwegend kleine teams. Het is geen indicator voor geschiktheid bij grote, complexe schema's — die gebruikersgroep zit er nauwelijks tussen.

### Waar sterk, en waarom

- **Het gat tussen "Excel/monday.com" en "MS Project".** Dat is de sweet spot: teams die wél afhankelijkheden en een kritiek pad willen, maar geen planner in dienst hebben. GanttPRO is daar goedkoper dan Smartsheet/Wrike en veel toegankelijker dan MS Project.
- **Gantt-first positionering.** Waar concurrenten Gantt als één van tien views aanbieden, is het hier het product. Dat levert een betere Gantt-ervaring op dan bij de all-in-one-tools.
- **Sterke SEO/contentmachine.** blog.ganttpro.com rankt breed op "Gantt chart", "critical path", "construction scheduling software" — een aanzienlijk deel van de instroom komt daar vandaan. **[SCHATTING]** Dit is vermoedelijk het belangrijkste acquisitiekanaal.

### Belangrijkste concurrenten

| Segment | Concurrenten |
|---|---|
| **Direct (online Gantt, MKB)** | TeamGantt, Instagantt, ProjectManager.com, Toggl Plan, Zoho Projects, Ganttic, Bitrix24 |
| **Werkbeheer met Gantt-view** | monday.com, ClickUp, Wrike, Smartsheet, Asana, Notion, Jira (met Advanced Roadmaps) |
| **Klassieke CPM** | Microsoft Project / Project for the Web, Oracle Primavera P6, Asta Powerproject, Deltek Open Plan, Spider Project |
| **Bouw/4D-specifiek** | Primavera P6, Asta Powerproject, Bentley SYNCHRO, Planera, Bexel Manager, Vico/Trimble, ALICE Technologies |
| **Open source** | GanttProject, ProjectLibre, OpenProject, Open Planner Studio (de opdrachtgever) |

De reviewliteratuur plaatst GanttPRO consequent in de lijstjes "beste MS Project-alternatieven" naast Businessmap, Smartsheet en Planview — nooit in de lijstjes "volwaardige CPM voor bouw", waar Planera, P6, MS Project, Asta Powerproject en Phoenix Project Manager staan. ([businessmap.io](https://businessmap.io/blog/microsoft-project-alternatives), [planera.io](https://www.planera.io/post/microsoft-project-alternatives), 25-07-2026) **Dat onderscheid maakt de markt zelf al — en het is het juiste onderscheid.**

### Trend

- **Uitbreiding richting werkbeheer:** board-, list-, calendar- en dashboardviews, portfolio's, tijdregistratie. GanttPRO probeert van "Gantt-tool" naar "lichte PM-suite" te bewegen — precies het terrein waar monday.com en ClickUp met veel grotere budgetten zitten.
- **AI:** een "AI Gantt Chart Maker" is inmiddels in **alle** plannen inbegrepen ([pricing](https://ganttpro.com/pricing/), 25-07-2026). Functioneel vermoedelijk taakgeneratie uit een projectomschrijving — **[ONBEVESTIGD]** wat het precies doet; er is geen technische documentatie over gevonden.
- **Prijsverhogingen:** de prijslijst is meermaals herzien (van ~$7,99/$12,99 naar de huidige vierlaagse Core/Advanced/Business/Enterprise-structuur), met de duurdere functies steeds hoger in de stapel. Verwacht verdere verschuiving richting Business/Enterprise. **[SCHATTING]**
- **Risico:** GanttPRO zit klem. Aan de onderkant vreten gratis Gantt-views in monday.com/ClickUp/Jira de instapmarkt aan; aan de bovenkant komt het niet bij P6/Asta binnen door het ontbreken van float, constraints en leveling. Zonder duidelijke verdieping is dat een lastige positie op vijf jaar termijn.

---

## 8. Eindoordeel

### Is dit een serieus alternatief voor klassieke CPM-tools?

**Nee — maar het is ook geen speelgoed.** GanttPRO zit in een tussencategorie die scherp benoemd moet worden:

- **Het is meer dan een balkenschema.** Er is een echt afhankelijkheidsnetwerk met vier relatietypen, lag/lead, doorrekening bij wijziging en een kritiek pad. Dat onderscheidt GanttPRO wezenlijk van monday.com, Asana en consorten, die alleen een tijdlijn tekenen. Wie dat verschil negeert, doet GanttPRO tekort.
- **Het is minder dan CPM.** Zonder float-waarden, zonder constraint-typen, zonder backward-pass-gebaseerde late dates, zonder resource leveling en zonder EVM kun je er geen contractuele planning mee beheren, geen vertragingsanalyse mee uitvoeren en geen claim mee onderbouwen. En de leverancier adviseert zelf het kritieke pad uit te zetten bij grote schema's — dat is geen tool waarmee je op float stuurt.

### Voor wie wél

- Teams van **5–50** met projecten tot **enkele honderden taken** die afhankelijkheden en een kritiek pad nodig hebben zonder een planner in dienst.
- **MKB-aannemers, installateurs en kleine bouwbedrijven** die nu in Excel plannen en een deelbaar, herrekenbaar schema willen — met kosten- en workloadinzicht erbij.
- **Marketing-, agency- en IT-teams** die van een statisch schema af willen zonder de MS Project-leercurve.
- **Onderwijs en non-profit** — de 50%-korting maakt het effectief $3,50–$8,50 per gebruiker per maand.
- Organisaties die **snel een MS Project-plan willen ontsluiten** voor een breder, niet-planningsgeschoold publiek: importeer de MPP en deel een publieke URL.

### Voor wie niet

- **Iedereen die contractueel op CPM stuurt.** Infra, utiliteitsbouw met boeteclausules, EPC-projecten, alles met vertragingsanalyse of claims. Geen float = geen zaak.
- **Projecten boven ~2.000 taken** [SCHATTING op basis van §2.4]. De 10.000-taakclaim geldt onder gunstige omstandigheden met critical path en baseline uitgeschakeld.
- **Wie resource leveling of capaciteitsprognose nodig heeft.** Alleen visualisatie, geen optimalisatie.
- **Wie 4D/BIM doet.** Nul IFC-, BCF- of modelkoppeling. Dit is voor de opdrachtgever de kernconclusie: GanttPRO is op dit vlak volledig afwezig.
- **Wie een P6/XER-keten in moet.** Geen XER, geen P6 XML, zelfs geen MPP-export.
- **Offline of bouwplaatsgebruik zonder verbinding**, en teams die mobiel moeten kunnen plannen.
- **Zzp'ers en duo's die maandelijks willen betalen** — het 5-zetelminimum maakt dat onnodig duur.

### Relevantie voor Open Planner Studio

1. **Geen directe concurrent op het IFC-vlak** — maar wél een concurrent om de aandacht van de MKB-bouwer, die vandaag kiest tussen Excel, GanttPRO en MS Project.
2. **De lat voor UX ligt hier hoog.** 4,7–4,8 op ease of use bij 551 reviews (Capterra 4,7 / GetApp 4,8 — zie correctie in §4) is de benchmark waar een open-source alternatief tegenaan wordt gehouden. Het lage instaptarief van $7 vormt daarbij het psychologische prijsanker — al is de reële instap voor integratiewerk **$17** (API zit pas in Business).
3. **Waar Open Planner Studio kan winnen:** echte CPM met total/free float en constraint-typen, IFC 4.3 als native formaat (IfcWorkSchedule/IfcTask), offline desktopgebruik, geen zetellimiet, geen 5-zetelminimum, en open interoperabiliteit (XER/MSPDI/IFC) waar GanttPRO eenrichtingsverkeer biedt.
4. **Waar GanttPRO wint en wat over te nemen valt:** MPP-import als migratiehefboom, publieke deelbare projectlinks voor stakeholders, en de gepolijste onboarding. Die drie zijn kopieerwaardig.
5. **Praktische koppeling, als die ooit nodig is:** REST API (`links` + `tasks` + `resources`) of `.xlsx`. Reken op 5 schrijfacties per seconde en op verlies van kalenders en baselines bij de Excel-route.

**Samenvattend oordeel:** een goed gebouwde, eerlijk geprijsde, prettig werkende Gantt-tool met een echte — maar ondiepe — netwerkkern. Voor het MKB een uitstekende Excel-vervanger; voor professionele CPM-planning en voor alles wat met BIM/IFC te maken heeft, ongeschikt.

---

## Bronnen

**Primaire leveranciersbronnen** (alle geraadpleegd 25 juli 2026)
1. [GanttPRO — Pricing](https://ganttpro.com/pricing/) — plannen, prijzen, minimumzetels, FAQ, Azure EU-hosting
2. [GanttPRO — Terms of Use](https://ganttpro.com/terms-of-use/) — juridische entiteit DPM Solutions Sp. z o.o., Kraków, KRS 0001046070
3. [GanttPRO — About Us](https://ganttpro.com/about-us/) — historie, 800.000 gebruikers, klanten
4. [GanttPRO — Features](https://ganttpro.com/ganttpro-features/) — functieoverzicht
5. [GanttPRO — Dependencies](https://ganttpro.com/dependencies/) — vier afhankelijkheidstypen, lag/lead
6. [GanttPRO — Critical Path](https://ganttpro.com/critical-path/) — kritiek pad als toggle
7. [GanttPRO — Advanced Import](https://ganttpro.com/advanced-import/) — importformaten
8. [GanttPRO — Integrations](https://ganttpro.com/integrations/) — integratielijst
9. [GanttPRO Developer API](https://developer.ganttpro.com/) — endpoints, rate limits, webhooks, public beta

**Kennisbank** (via zoekresultaten; directe fetch gaf HTTP 403)
10. [Maximizing GanttPRO's performance](https://help.ganttpro.com/hc/en-us/articles/25405684007954-Maximizing-GanttPRO-s-performance) — **10.000-taakgrens**, advies kritiek pad/baseline uit te zetten
11. [Importing a project](https://help.ganttpro.com/hc/en-us/articles/5423958492945-Importing-a-project)
12. [Exporting a project](https://help.ganttpro.com/hc/en-us/articles/5584426869649-Exporting-a-project) — XML bevat alleen basisinformatie
13. [Project settings](https://help.ganttpro.com/hc/en-us/articles/5423962258449-Project-settings) — auto scheduling aan/uit
14. [Subscription](https://help.ganttpro.com/hc/en-us/articles/5395506249745-Subscription) — zetels in stappen van 5 bij maandbetaling
15. [Creating dependencies](https://help.ganttpro.com/hc/en-us/articles/5486660021905-Creating-dependencies)
16. [Types of tasks and levels](https://help.ganttpro.com/hc/en-us/articles/16403302087314-Types-of-tasks-and-levels)

**Reviewplatforms** (geraadpleegd 25 juli 2026)
17. [Capterra — GanttPRO](https://www.capterra.com/p/142293/GanttPRO/) — 4,8/5, 551 reviews, 5-zetelklacht
18. [Capterra — GanttPRO Pricing](https://www.capterra.com/p/142293/GanttPRO/pricing/) — geen gratis versie
19. [GetApp — GanttPRO Reviews](https://www.getapp.com/project-management-planning-software/a/ganttpro/reviews/) — subscores, watermerk in trial
20. [G2 — GanttPRO Reviews](https://www.g2.com/products/ganttpro-ganttpro/reviews) — 4,8/5, ±553–560 reviews (via zoekresultaat; fetch geblokkeerd)
21. [eLearning Industry — GanttPRO Reviews](https://elearningindustry.com/directory/elearning-software/ganttpro/reviews) — 85%, 69 reviews, offline/export-kritiek
22. [Gartner Peer Insights — GanttPRO](https://www.gartner.com/reviews/product/ganttpro) — profiel bestaat; fetch geblokkeerd (HTTP 403), geen cijfers overgenomen
23. [Trustpilot — ganttpro.com](https://www.trustpilot.com/review/ganttpro.com) — fetch geblokkeerd (HTTP 403), niet gebruikt

**Onafhankelijke analyses**
24. [projectmanagers.net — The Pros and Cons of Using GanttPRO](https://projectmanagers.net/the-pros-and-cons-of-using-ganttpro-software/) — meest gedetailleerde nadelenlijst
24b. [projectmanagers.net — GanttPRO Pricing](https://projectmanagers.net/ganttpro-pricing/) — gepubliceerd 20-10-2025; **enige bereikbare bron die het 5-zetelminimum bij maandbetaling en de 20+-zetelvolumekorting expliciet stelt**; bevat tevens verouderde prijzen ($8/$12/$19 jaarlijks, $9/$15/$24 maandelijks) die aantonen dat de staffel niet uniform 20% is
25. [project-management.com — GanttPRO Review](https://project-management.com/ganttpro-software-review/) — XB Software, historie, klanten, talen
26. [thedigitalprojectmanager.com — GanttPRO Review](https://thedigitalprojectmanager.com/tools/ganttpro-review/) — fetch geblokkeerd (403); alleen via zoekresultaten
27. [Forbes Advisor — GanttPRO Review](https://www.forbes.com/advisor/business/software/ganttpro-review/) — fetch geblokkeerd (403); alleen via zoekresultaten
28. [businessmap.io — MS Project-alternatieven 2026](https://businessmap.io/blog/microsoft-project-alternatives)
29. [planera.io — Best Microsoft Project Alternatives 2026](https://www.planera.io/post/microsoft-project-alternatives) — plaatst GanttPRO buiten de "full CPM"-categorie

**Techniek**
30. [DHTMLX — Customer Spotlight: dhtmlxGantt for GanttPRO](https://dhtmlx.com/blog/customer-spotlight-dhtmlxgantt-ganttpro/) — techstack (Vue.js, Node.js, Webix Jet, DHTMLX Gantt), Minsk
31. [DHTMLX Gantt Docs](https://docs.dhtmlx.com/gantt/) — FS/SS/FF/SF, auto scheduling, kritiek pad in de onderliggende component
32. [DHTMLX Gantt — Export/Import MS Project](https://docs.dhtmlx.com/gantt/guides/export-msproject/)

**Bedrijfsdata**
33. [Crunchbase — GanttPRO](https://www.crunchbase.com/organization/ganttpro)
34. [Tracxn — GanttPRO Company Profile 2026](https://tracxn.com/d/companies/ganttpro/__SmbEtQlyIor3gKCTFCHO3gcxzFXHxtCKHrIFGkeXj2I)
35. [Newswire — Meet GanttPRO (releaseaankondiging 2015)](https://www.newswire.com/news/meet-ganttpro-online-gantt-chart-software-for-small-and-medium)

**Onderzoeksbeperkingen**
- Reddit (r/projectmanagement, r/construction) was in deze omgeving niet bereikbaar; `site:reddit.com`-zoekopdrachten leverden geen relevante treffers op. De fora-input in dit rapport komt daarom uit review-platforms en onafhankelijke analyses, niet uit Reddit.
- G2, Gartner Peer Insights, Trustpilot, Forbes en TrustRadius blokkeerden directe ophaling (HTTP 403); cijfers uit die bronnen zijn via zoekresultaatsamenvattingen overgenomen en als zodanig gemarkeerd.
- De maandbedragen op de officiële prijspagina worden via JavaScript gerenderd en waren niet direct af te lezen; de genoemde maandprijzen zijn afgeleid uit de gepubliceerde 20%-jaarkorting en gemarkeerd als **[BEREKEND]**.

---

## Verificatie

**Adversariële hercontrole uitgevoerd op 25 juli 2026.** Methode: voor elke bewering is actief geprobeerd haar te *weerleggen* met de primaire bron plus, waar mogelijk, een onafhankelijke tweede bron. Beweringen die niet aan een bereikbare bron te toetsen waren, zijn afgewaardeerd naar **onzeker** — ook als ze plausibel klinken.

### Bevestigd

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 1 | Lijstprijzen per gebruiker per maand bij jaarfacturatie: **Core $7 / Advanced $10 / Business $17 / Enterprise $25** | **bevestigd** — letterlijk op de prijspagina | https://ganttpro.com/pricing/ |
| 2 | Enterprise is **afgeprijsd van $35** en vereist **5+ gebruikers met jaarabonnement** | **bevestigd** — "limited offer from $35", "available for 5+ users with an annual subscription" | https://ganttpro.com/pricing/ |
| 3 | **Geen gratis tier**; alleen **14-daagse volledige trial zonder creditcard** | **bevestigd** op primaire bron én Capterra ("No free version available") | https://ganttpro.com/pricing/ · https://www.capterra.com/p/142293/GanttPRO/pricing/ |
| 4 | **Jaarkorting 20%** t.o.v. maandbetaling | **bevestigd** als gepubliceerde claim op de prijspagina (de resulterende maandbedragen zelf niet, zie #14) | https://ganttpro.com/pricing/ |
| 5 | **50% korting** op elk jaarplan voor non-profit, onderwijs, studenten/docenten en zorg | **bevestigd** — "50% discount on any annual plan", via support@ganttpro.com | https://ganttpro.com/pricing/ |
| 6 | Betaalmethoden: creditcard, PayPal, wire transfer, purchase order | **bevestigd** — creditcards/PayPal self-service, wire/PO via sales | https://ganttpro.com/pricing/ |
| 7 | Capterra noemt Enterprise **$20 "Limited Offer"** (afwijkend van $25 op eigen site) | **bevestigd** — aggregator loopt aantoonbaar achter | https://www.capterra.com/p/142293/GanttPRO/pricing/ |
| 8 | Capterra-score **4,8/5 bij 551 reviews** | **bevestigd** (idem GetApp, zelfde reviewpool) | https://www.capterra.com/p/142293/GanttPRO/ |
| 9 | **Geen float/slack, geen late dates, geen constraint-typen** — het zwaarste CPM-gat | **bevestigd, sterker dan eerst gesteld**: API-taakobjecten bevatten alléén `startDate`, `endDate`, `duration`, `estimation`, `progress`, `status`, `deadline` — geen float/slack/lateStart/lateFinish/constraintType; de critical-path-pagina noemt uitsluitend "the longest chain of tasks" | https://developer.ganttpro.com/ · https://ganttpro.com/critical-path/ |
| 10 | **Kritiek pad is een toggle**, geen basisstaat | **bevestigd** — "In one click, switch on the critical path in the project settings… shown in red" | https://ganttpro.com/critical-path/ |
| 11 | **Vier afhankelijkheidstypen** met lag/lead | **bevestigd** — "one out of four types of dependencies"; de typen worden op de pagina niet bij naam genoemd (FS/SS/FF/SF komt van de onderliggende DHTMLX-component) | https://ganttpro.com/dependencies/ · https://docs.dhtmlx.com/gantt/ |
| 12 | Rekenkern is **DHTMLX Gantt**, niet zelfgebouwd; Vue.js + Node.js + Webix Jet; Minsk-oorsprong; GanttPRO is *klant* van DHTMLX | **bevestigd** — "our Gantt chart JS library has been a core component of GanttPRO for over 5 years"; genoemde features: auto scheduling, critical path, dynamic loading, resource management, time scales, task grouping | https://dhtmlx.com/blog/customer-spotlight-dhtmlxgantt-ganttpro/ |
| 13 | Juridische entiteit **DPM Solutions Sp. z o.o., Kraków**, NIP PL6793271397, KRS 0001046070, Pools recht | **bevestigd** op Terms of Use én about-us | https://ganttpro.com/terms-of-use/ · https://ganttpro.com/about-us/ |
| 14 | **Geen MPP-export**; import wél (MPP/XLSX/CSV/Jira), export PNG/PDF/XML/Excel | **bevestigd** — "Export your chart to PNG, PDF, XML or Excel"; MPP komt in de exportlijst niet voor | https://ganttpro.com/advanced-import/ · https://ganttpro.com/integrations/ |
| 15 | **Nul raakvlak met IFC/BIM/BCF/4D**; dunne integratielaag zonder Zapier/Outlook/ERP | **bevestigd** — de integratiepagina noemt uitputtend zeven integraties: Slack, Google Drive, Jira Cloud, OneDrive, MS Project, MS Teams, MS Excel. Geen IFC, BIM, buildingSMART, BCF of 4D | https://ganttpro.com/integrations/ |
| 16 | REST API: `X-API-KEY`, **public beta**, rate limit **5 req/s** voor insert/delete/update | **bevestigd** — letterlijk "The API is now in Public Beta state" en "5 req / sec" | https://developer.ganttpro.com/ |
| 17 | Kalendermodel (werkdagen/uren/pauzes/uitzonderingen + persoonlijke resourcekalenders), drie resourcetypen (labor/material/fixed cost, per uur/per stuk/vast), baselines, actual cost | **bevestigd**, allemaal letterlijk op de featurepagina | https://ganttpro.com/ganttpro-features/ |
| 18 | **Geen resource leveling** — alleen workloadvisualisatie | **bevestigd** door afwezigheid: workload staat er wel, van automatisch verschuiven/levelen geen spoor | https://ganttpro.com/ganttpro-features/ |
| 19 | **AI Gantt Chart Maker in alle plannen** | **bevestigd** — "New: AI Gantt Chart Maker included in all plans" (wát het doet blijft ongedocumenteerd) | https://ganttpro.com/pricing/ |
| 20 | Volumekortingselector met teamgroottes en "Lower price per user for larger teams" | **bevestigd**; korting begint bij **20+ zetels** nu onderbouwd met onafhankelijke bron i.p.v. geblokkeerde kennisbank | https://ganttpro.com/pricing/ · https://projectmanagers.net/ganttpro-pricing/ |

### Gecorrigeerd

| # | Bewering (oud) | Correctie | Bron |
|---|---|---|---|
| 21 | "API-toegang en Jira Cloud zitten volgens **reviewsites** in hogere plannen; de officiële prijspagina specificeert dit niet — **[ONBEVESTIGD op primaire bron]**" | **Onjuist gemarkeerd.** De vergelijkingstabel op de prijspagina gate't beide expliciet: **API en Jira Cloud zijn `false` bij Core en Advanced, `true` vanaf Business**. Gevolg voor het eindoordeel: de effectieve instapprijs voor een integratiescenario is **$17/gebruiker/maand**, niet $7 — dat is toegevoegd aan §3 en §8 | https://ganttpro.com/pricing/ |
| 22 | "Lag/lead: **positieve** waarde = lag, **negatieve** = lead" | **Tegengesproken door de geciteerde bron zelf.** ganttpro.com/dependencies schrijft "setting up **lag (-) or lead (+)**" — precies omgekeerd. Welke conventie de UI hanteert is niet vast te stellen (kennisbank 403). Gemarkeerd als onzeker met waarschuwing voor importerbouw | https://ganttpro.com/dependencies/ |
| 23 | "Consistent **hoogste** subscore op ease of use (**4,8**/5 bij 551 Capterra-reviews)" | **Capterra toont ease of use 4,7**, niet 4,8; de hoogste subscore is **customer service (4,8)**. GetApp toont voor dezelfde pool wél 4,8. Beide platforms zijn Gartner-eigendom met één reviewpool — dus geen twee onafhankelijke bevestigingen. Tabel in §7 aangevuld met alle subscores | https://www.capterra.com/p/142293/GanttPRO/ · https://www.getapp.com/project-management-planning-software/a/ganttpro/reviews/ |
| 24 | "**800.000+ gebruikers** (mijlpaal 2022)" | Pagina zegt "800K+ **customers**" — klanten/accounts, niet zetels of gebruikers, wat bij een per-gebruiker-model materieel scheelt. "Mijlpaal 2022" staat er niet en is geschrapt. Blijft onverifieerbare eigen opgave | https://ganttpro.com/about-us/ |
| 25 | "Mobiel scoort 4,4 — het **laagste subcijfer**" | 4,4 is de GetApp-**feature-rating voor "Mobile access"**, geen review-subscore; GetApp voert mobiel niet als subscore. Cijfer klopt, kwalificatie niet | https://www.getapp.com/project-management-planning-software/a/ganttpro/reviews/ |
| 26 | "Geen deadline-constraint aangetroffen" | Er **is** een `deadline`-veld (API-taakobject én featurepagina), maar het is een **notificatie-/markeringsfunctie**, geen constraint die de doorrekening stuurt: "GanttPRO sends email and push notifications and makes them visual on the diagram". Nuance toegevoegd — versterkt de conclusie | https://ganttpro.com/ganttpro-features/ · https://developer.ganttpro.com/ |
| 27 | Selectorwaarden "1, 5, 10, 15, 20 en verder **20**, 25, 30, 35, 40+" | Dubbeltelling van 20 weggehaald: de tweede reeks is **25, 30, 35, 40+** | https://ganttpro.com/pricing/ |

### Onzeker

| # | Bewering | Waarom onzeker | Bron |
|---|---|---|---|
| 28 | **5-zetelminimum bij maandelijkse facturatie**, zetels in stappen van 5 | **Niet op enige primaire bron.** De prijspagina laat de selector bij 1 gebruiker beginnen en noemt 5+ uitsluitend bij Enterprise; de Terms of Use zwijgen volledig over minimumzetels, zetelstappen of seat-increments. Wél bevestigd door **twee onafhankelijke secundaire bronnen**: projectmanagers.net ("Monthly plans require at least five users", 20-10-2025) en een Capterra-reviewer. **Praktische lezing blijft: 1 zetel kan bij jaarbetaling, maandbetaling per 5 — maar dit vóór inkoop schriftelijk laten bevestigen.** | https://projectmanagers.net/ganttpro-pricing/ · https://www.capterra.com/p/142293/GanttPRO/ · https://ganttpro.com/terms-of-use/ |
| 29 | Afgeleide maandprijzen **$8,75 / $12,50 / $21,25** | Rekenkundig correct bij uniforme 20%, maar **empirisch weerlegd voor het verleden**: projectmanagers.net noteerde jaar $8/$12/$19 tegenover maand $9/$15/$24 — respectievelijk ~11%, 20% en 21% korting, dus géén uniforme staffel. Maandbedragen blijven JS-gerenderd en onafleesbaar. Niet gebruiken in TCO of offerte | https://projectmanagers.net/ganttpro-pricing/ · https://ganttpro.com/pricing/ |
| 30 | **10.000-taakgrens** en het advies "zet kritiek pad/baseline uit" | Het volledige domein `help.ganttpro.com` gaf bij herverificatie opnieuw **HTTP 403**. Beide citaten stammen uit zoekresultaatsamenvattingen en zijn **niet aan de bron geverifieerd**. Strekking sluit aan bij onafhankelijke traagheidsklachten, maar getal en citaat zijn niet hard. Geldt ook voor §2.3 punt 8 en §5 punt 2 | https://help.ganttpro.com/hc/en-us/articles/25405684007954-Maximizing-GanttPRO-s-performance (403) |
| 31 | **G2: 4,8/5 bij ±553–560 reviews** | Fetch opnieuw geblokkeerd (**HTTP 403**) op 25-07-2026. Niet onafhankelijk verifieerbaar; niet als hard cijfer gebruiken. Idem eLearning Industry (85%/69) | https://www.g2.com/products/ganttpro-ganttpro/reviews (403) |
| 32 | Alle overige `help.ganttpro.com`-citaten (auto-scheduling aan/uit, importeren, exporteren-XML, zetelstappen, dependencies aanmaken, taakniveaus) | Hele kennisbank blijft achter een 403. De strekking wordt op onderdelen gedekt door ganttpro.com-pagina's, maar de **exacte citaten** zijn niet geverifieerd | help.ganttpro.com (403) |
| 33 | Klantlogo's **Intel, Vodafone, NASA, Amway** | About-us noemt alléén "SONY, Salesforce, Booking.com, and other giants". De overige logo's komen uit één secundaire review en zijn niet bevestigd; het zijn hoe dan ook marketingclaims zonder gebruiksomvang | https://ganttpro.com/about-us/ |
| 34 | Omzet/personeel (USD 5–15 mln ARR, 50–150 fte), realistische schaalgrens ±1.000–2.000 taken, SEO als belangrijkste acquisitiekanaal, XB Software-eigendomsrelatie met DHTMLX | Onveranderd **[SCHATTING]/[ONBEVESTIGD]** — geen nieuwe bronnen gevonden die deze bevestigen of weerleggen. De DHTMLX-blog blijft GanttPRO als *klant* presenteren, niet als zusterproduct | https://dhtmlx.com/blog/customer-spotlight-dhtmlxgantt-ganttpro/ |

### Netto-effect op het eindoordeel

De **kern van het rapport houdt stand en wordt op het belangrijkste punt sterker**: dat GanttPRO een echte maar ondiepe netwerkkern heeft, en geen volwaardige CPM is, wordt door de API-objectlijst (#9) harder onderbouwd dan het profiel eerst deed. De prijstabel is volledig bevestigd op de primaire bron.

Twee wijzigingen raken wél de conclusie:
1. **De effectieve instapprijs is $17, niet $7**, zodra API of Jira Cloud nodig is (#21). Dat versterkt het argument in §3 "Prijspositionering" dat de "vanaf $7"-boodschap misleidend is voor deze doelgroep.
2. **De UX-benchmark is 4,7–4,8, niet 4,8**, en de superlatief "hoogste subscore" was onjuist (#23).

Structurele beperking van deze verificatieronde: `help.ganttpro.com`, G2, Gartner Peer Insights en Trustpilot blokkeren geautomatiseerde ophaling met HTTP 403, en het zoekbudget was uitgeput vóór afronding. Daardoor leunen de claims #28 t/m #33 op secundaire bronnen. **Voor een aanbestedings- of inkoopbeslissing zijn met name het zetelminimum (#28) en de maandprijzen (#29) schriftelijk bij GanttPRO te bevestigen.**
