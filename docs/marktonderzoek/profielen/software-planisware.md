# Planisware — diepgaand softwareprofiel

**Onderzoeksdatum:** 25 juli 2026
**Onderzoeker:** marktonderzoek planningssoftware (deelprofiel)
**Status van cijfers:** alle bedragen zijn voorzien van bron en datum. Waar ik zelf heb afgeleid of geschat, staat expliciet **[SCHATTING]** of **[AFGELEID]**.

---

## 0. Managementsamenvatting

Planisware is een Frans, beursgenoteerd PPM-/SPM-softwarehuis (Euronext Paris: PLNW) dat sinds 1996 software levert voor project- en portfoliobeheer van R&D-, engineering- en IT-portfolio's. Het is géén bouwplanningstool en presenteert zichzelf ook niet zo. Het vlaggenschip **Planisware Enterprise** (voorheen OPX2) is een zwaar configureerbare enterprise-suite; **Planisware Orchestra** (overgenomen van NQI in 2018) is het turnkey mid-market product; daarnaast bestaan **Horizon** (IT-SPM) en **Nova** (productontwikkeling).

Op de kernvraag van dit onderzoek — *heeft het een echte netwerkplanning of tekent het alleen balken?* — is het antwoord: **ja, Planisware heeft een echte CPM-achtige netwerkplanningsmotor.** Aantoonbaar aanwezig zijn: WBS met consolidatie, taken en mijlpalen, vier relatietypen (FS/FF/SS/SF), lag met een **eigen kalender per relatie**, datumconstraints (SNET/FNLT), werk-/niet-werkkalenders, baselines met Budget at Completion, PERT-diagram, Earned Value en resource-/kostenmodellen. Dat is wezenlijk meer dan de balkenschema-simulatie van werkbeheertools als Asana, Monday of Smartsheet.

Maar: het is een **PPM-suite met CPM erin, niet een CPM-tool met portfolio erbij**. De schemadiepte die Primavera P6 of Asta Powerproject bieden (retained/progress-override logic, multiple float paths, activity codes, XER-uitwisseling, resource-levelingheuristieken op activiteitsniveau) is publiek niet aantoonbaar. Voor bouw- en infraplanning is Planisware niet de eerste keus; voor farma-, aerospace- en R&D-portfolio's van honderden miljoenen is het een van de sterkste opties ter wereld.

Prijs: er is geen publieke prijslijst voor Enterprise. Orchestra begint bij circa **$45 per gebruiker per maand (≈ $540 p.g.p.j.)**; Enterprise-deals lopen realistisch in de honderdduizenden euro's per jaar plus een implementatietraject van dezelfde orde.

---

## 1. Wat het is

### 1.1 Leverancier en historie

| Feit | Waarde | Bron |
|---|---|---|
| Opgericht | 1996, Frankrijk (regio Parijs) | Wikipedia |
| Oprichters | Matthieu Delille, Pierre Demonsant, Yves Humblot, François Pelissolo — allen afkomstig van Thales Group | Wikipedia |
| Oorsprong | Wikipedia bevestigt alleen: *"The founding team was from Thales Group, a French aerospace and defence corporation."* Het specifiekere verhaal (spin-off van **Syseca**, een Thales-dochter; OPX2 binnen Thales ontwikkeld voor meerjarige defensie-R&D) leunt op Grokipedia — een AI-gegenereerde bron zonder redactionele borging. **[ONZEKER]**, richting klopt, detail niet hard | Wikipedia (bevestigd); Syseca-detail alleen Grokipedia |
| Naamswijziging product | OPX2 → Planisware Enterprise in 2009, bij versie 5 | Planisware glossary "OPX2" |
| Overname NQI | maart 2018; NQI's *Orchestra PPM* wordt *Planisware Orchestra*. NQI bediende de PPM-markt sinds 2004, had ~250 klanten (70% IT-organisaties), waaronder Essilor International, CMA CGM, ArcelorMittal | Business Wire, 27-03-2018 |
| Beursgang | april 2024, Euronext Paris, ticker **PLNW**, waardering €1,11 miljard. Bij de IPO: **500 klanten en 700 medewerkers** (o.a. PepsiCo, Pfizer) | Wikipedia (bevestigd 25-07-2026) |
| Eigendom | Oprichters behielden na de IPO de meerderheid; private-equityhuis Ardian kondigde in september 2024 de verkoop van zijn resterende belang aan | Wikipedia |
| Bestuur | Chairman Pierre Demonsant, CEO Loïc Sautour | Wikipedia |

De Thales-afkomst verklaart veel: de tool is vanaf dag één gebouwd voor meerjarige, hoog-gereguleerde R&D-programma's met budget-, resource- en fasengovernance — niet voor de dagelijkse bouwplaats.

Een opvallend technisch detail: Planisware gebruikt sinds 1993 **Allegro Common Lisp** voor de regelinterpretatiemotor van OPX2. De toenmalige marketingdirecteur Nicolas Vilars: *"Compared to other languages, it is two times quicker to develop under Lisp than any other languages."* Dat verklaart zowel de enorme configureerbaarheid als de klachten over onderhoudbaarheid van zwaar gecustomiseerde installaties (bron: franz.com case study; **let op: gedateerde pagina**, ik heb geen recente bevestiging gevonden dat de huidige cloudstack nog op Lisp draait — **[SCHATTING]** dat de kern-regelmotor dat nog steeds doet).

### 1.2 Productportfolio (2026)

| Product | Doelgroep | Positionering |
|---|---|---|
| **Planisware Enterprise** | Grote organisaties, "business transformation at scale" | De volledige suite: budgetten, forecasts, planningen, resources en werkelijke kosten geïntegreerd op ondernemingsniveau |
| **Planisware Orchestra** | PMO's die snel resultaat willen | Turnkey, voorgeconfigureerd PPM; expliciet upgradepad naar Enterprise |
| **Planisware Horizon** | IT-afdelingen, digitale transformatie | IT Strategic Portfolio Management, technical debt, applicatieportfolio |
| **Planisware Nova** | Productontwikkeling en innovatie | SPM voor NPD: producten, programma's, resources en prioritering |

Bron: planisware.com/products-overview, geraadpleegd 25-07-2026.

### 1.3 Doelgroep, sectoren en regio's

**Sectoren** (volgens Planisware zelf en Wikipedia): farma en medische hulpmiddelen, aerospace & defense, automotive, energie, chemie, high-tech, consumer goods, overheid.

**Genoemde klanten:**
- *Farma/life sciences*: Pfizer, AstraZeneca, Sanofi, Roche, AbbVie, Amgen, Gilead, Ipsen, UCB, Jazz Pharmaceuticals, Curia, Johnson & Johnson (planisware.com/industries/pharma). De eerste maatwerkoplossing voor **Sanofi** dateert uit 1996 — Planisware zit dus 30 jaar in deze niche.
- *Aerospace & defense*: **Northrop Grumman** koos in januari 2025 Planisware Enterprise als enterprise-breed programmamanagementsysteem (Business Wire, 27-01-2025).
- *Automotive*: **Dana Incorporated** (juli 2025).
- *Consumer goods*: PepsiCo.
- *Via NQI/Orchestra*: Essilor, CMA CGM, ArcelorMittal, Société du Canal de Provence.

**Regio's** — omzetverdeling FY2025:

| Regio | Omzet | Aandeel | Medewerkers |
|---|---|---|---|
| Europa | €96,5 mln | 49% | 458 |
| Noord-Amerika | €85,2 mln | 43% | 184 |
| APAC & rest van de wereld | €16,4 mln | 8% | 196 |

Bron: Planisware FY2025-resultaten, planisware.com/resources/corporate-news/strong-2025-performance-renewed-commercial-momentum-year-end, geraadpleegd 25-07-2026.

**Typische gebruiker:** portfoliomanager, PMO-lead, R&D-programmamanager, resource manager, financieel controller op projectniveau. De *dagelijkse* gebruiker is meestal iemand die uren boekt of een projectstatus bijwerkt — niet een fulltime planner. Dat is een belangrijk verschil met P6/Asta, waar de primaire gebruiker een planningsspecialist is.

---

## 2. Functionaliteit en techniek — kritisch getoetst

### 2.1 Is er een échte netwerkplanningsmotor? Ja.

Op basis van een stap-voor-stap Planisware Enterprise-tutorial (prodsens.live, 18-01-2024) en Planisware's eigen productpagina's is het volgende aantoonbaar aanwezig:

**Structuur**
- **WBS-elementen** vormen de fasen en de projectstructuur; taken hangen eronder.
- **Mijlpalen** zijn taken zonder duur — nieuwe taken zijn standaard mijlpaal tot je een duur invult.
- **Auto-consolidatie**: WBS-elementen rollen duur, data en kosten automatisch op vanuit onderliggende activiteiten (uitschakelbaar).

**Netwerklogica**
- **Vier relatietypen**: Finish-Start (default), Finish-Finish, Start-Start, Start-Finish.
- **Lag/lead**: instelbaar, positief én negatief; standaardwaarde 0.
- **Kalender per relatie**: bij het openen van een link kun je naast het type en de lag ook *een kalender voor de link* zetten. MS Project kent zo'n instelling niet. **Correctie t.o.v. eerdere formulering:** P6 kent wél een lag-kalender, maar als *projectbrede* scheduling-optie ("Calendar for scheduling Relationship Lag": predecessor / successor / 24-hour / project default), niet per individuele relatie. Als Planisware dit écht per link laat zetten, is dat fijnmaziger dan P6 — maar de bron hiervoor is één tutorialpagina (prodsens.live) die in deze verificatieronde achter een bot-check zat, en de OnePager-pagina gaf HTTP 403. **[ONZEKER]** — hard aantonen in een POC.
- Links maken via aanvinken + `Ctrl+L` of drag-and-drop in de Gantt (die laatste maakt automatisch FS). De eerst aangevinkte activiteit is altijd de voorganger.

**Constraints**
- "Start no earlier than" en "Finish no later than" zijn expliciet beschikbaar.
- Het handmatig wijzigen van een *Planned start* creëert automatisch een constraint — hetzelfde gedrag als MS Project, met dezelfde valkuil dat gebruikers ongemerkt hun netwerk kapot constrainen.

**Kalenders**
- Niet-werkdagen worden automatisch verwerkt in alle datumberekeningen. *Planned finish* = start + duur, gerespecteerd tegen de toegewezen kalender.
- Taken zonder constraint of voorganger worden op de projectstartdatum gezet.

**Kritiek pad, float en visualisatie**
- Planisware noemt zelf een "advanced Gantt chart engine, PERT diagram" plus WBS-opbouw, en ondersteuning voor **Earned Value** en **stage-gate** (planisware.com/planisware-enterprise).
- Reviewsites beschrijven "critical path highlighting", "automated critical path calculation that updates in real-time as task durations change, with full support for lead/lag times and multiple dependency types" en "cross-project dependencies with automated impact analysis" (productowl.io; softwareadvice, 2026). **Let op:** dit is reviewsite-taal, geen leveranciersdocumentatie. Ik heb **geen publieke Planisware-documentatie kunnen vinden** die expliciet *total float* / *free float* / *forward pass–backward pass* benoemt. **[ONBEVESTIGD]** — voor een aanbesteding zou ik dit hard laten aantonen in een POC.
- **Verificatie versterkt dit voorbehoud.** De volledige scheduling-alinea op Planisware's eigen Enterprise-productpagina luidt letterlijk: *"For scheduling, Planisware Enterprise provides an advanced Gantt chart engine, PERT diagram, and the means to construct the WBS. Earned Value and the Stage-Gate methodology are supported as well."* Kritiek pad, float/slack, baselines en resource-leveling worden dáár dus **niet** genoemd. Dat een PPM-leverancier "critical path" niet eens als marketingterm inzet op zijn kernproductpagina, is een zwak signaal voor schemadiepte.

**Baselines**
- Snapshots die *Planned start*, *Planned finish* en *Budget at Completion* vastleggen, met afwijkingsanalyse. Meerdere baselines worden door reviewbronnen genoemd ("multiple baseline management for variance tracking"). Wie de baseline mag zetten is een procesbeslissing: sommige klanten koppelen het automatisch aan het stage-gate-proces, andere beperken het tot de PMO.

### 2.2 Resource- en kostenmodel

**Resources**
- Generieke én benoemde resources.
- Toewijzing op *working factor* (aantal resources) of *total load* (uren).
- Skills en locaties voor flexibele allocatie.
- Capaciteitsplanning met "Resource Bottleneck" en "Supply vs. Demand vs. Capacity"-views; what-if-simulatie van resourcewijzigingen over het portfolio.
- Geautomatiseerde resource-leveling over portfolio's wordt door reviewbronnen genoemd; het onderliggende mechanisme is echter portfolio-optimalisatie (zie hieronder), niet klassieke activiteitsgewijze leveling. **[SCHATTING]** op basis van de gepubliceerde algoritmebeschrijvingen.

**Kosten**
- **Cost accounts / expenditures** met verdeelmethodes over de tijd: *Extendible*, *Lag during*, *Fixed dates*, *At end of activity*.
- Budget, forecast en werkelijke kosten in één model; koppeling naar ERP voor actuals.
- Business-case-metrics: NPV, cashflow, ECV; P&L-modellering.
- Earned Value Management wordt genoemd als ondersteunde methodiek.

**Portfolio-optimalisatie — het echte onderscheidend vermogen**
- **Particle Swarm Portfolio Optimization** (zwermintelligentie) voor het balanceren van resources en het inplannen van projecten.
- **Efficient frontier**-analyse voor portfoliosamenstelling binnen budget- en resourcebeperkingen.
- **Monte Carlo-simulatie** voor kosten- en resourceforecasting.
- **PTRS** (Probability of Technical and Regulatory Success) — farma-specifieke risicoweging.
- Generatieve AI voor het opstellen van WBS'en en planningen; "Oscar" AI-assistent; ML-gebaseerde kostenforecast.

Dit soort optimalisatie-instrumentarium vind je bij P6, MS Project of Asta simpelweg niet. Het is de reden dat farma dit koopt.

### 2.3 Methodieken

Waterfall, Agile, hybride, Phase-Gate, SAFe (Trains), Scrum en Kanban — op zowel enterprise- als teamniveau. De agile-implementatie is echter zwak (zie nadelen).

### 2.4 Platform, techniek en schaalbaarheid

| Aspect | Bevinding | Bron |
|---|---|---|
| Kerntechnologie | Allegro Common Lisp (regelmotor), sinds 1993 | franz.com (gedateerd) |
| Ondersteunde platforms | Windows, Linux 64-bit, macOS; versie v6 | tyneo.net (gedateerd) |
| Deployment | SaaS, private cloud/hosting, on-premises op eigen servers; "container based architecture" volgens reviewers | planisware.com; softwarefinder.com |
| Certificering | SOC 1/SOC 2 Type 2, ISO 27001 | planisware.com brochure |
| SaaS-aandeel | SaaS & Hosting €93,7 mln van €198,0 mln FY2025 (+16,7% cc) | FY2025-resultaten |

**Schaalbaarheid — eerlijk beeld:**
- Marketing/analistenclaim: geschikt voor "extensive portfolios containing thousands of projects" (adeaca) en "several tens of thousands of users" (tyneo, gedateerd).
- Praktijk uit reviews: prestaties zakken bij grote datasets en complexe portfolio's; gebruikers op eigen Linux-servers rapporteren betere schaalbaarheid dan sommige SaaS-gebruikers; er zijn signalen van prestatiedips boven circa **5.000 gebruikers** (peerspot/rfp.wiki-samenvattingen).
- Concreet knelpunt uit een review: het projectdashboard werkte prima voor kleine tot middelgrote projecten, maar was "op grote schaal niet flexibel genoeg voor een programmaniveau-dashboard" (Steven Thompson, PeerSpot).

**Hoeveel taken realistisch per planning?** Planisware publiceert hierover geen enkel getal en geen enkele onafhankelijke bron noemt er een. **[SCHATTING]** op basis van het productkarakter: Planisware is geoptimaliseerd voor *breedte* (honderden tot duizenden projecten × honderden tot enkele duizenden taken elk), niet voor *diepte* (één schema van 50.000–200.000 activiteiten, zoals P6 in mega-infra aankan). Voor een bouwschema van meer dan ~10.000 activiteiten met dagelijkse voortgangsupdates zou ik Planisware niet zonder harde benchmark inzetten.

### 2.5 Streng oordeel over de planningsdiepte

**Wel aantoonbaar:** WBS + consolidatie, 4 relatietypen, lags met eigen kalender, SNET/FNLT-constraints, werkkalenders, baselines met BAC, PERT, EVM, kosten per activiteit, generieke/benoemde resources met skills.

**Niet aantoonbaar in publieke bronnen (en dus te verifiëren in een POC):**
- Total float / free float als expliciete, rapporteerbare velden
- Meerdere kritieke paden / longest-path-analyse / multiple float paths
- Out-of-sequence progress handling (retained logic vs. progress override)
- Meer dan één kalender per activiteit; resourcekalenders vs. activiteitskalenders
- Klassieke resource-leveling met prioriteitsregels en levelingdelay per activiteit
- Activity codes / WBS-codes in P6-zin voor filtering en rapportage
- Schedule-kwaliteitsanalyse (DCMA 14-point of vergelijkbaar)
- Native XER-in/uitvoer

Conclusie: Planisware valt **niet** in de categorie "tekent alleen balken" — dat verwijt is hier onterecht. Maar het valt evenmin in de categorie "P6-klasse schema-engine". Het zit er tussenin, met het zwaartepunt duidelijk aan de portfolio-/financiële kant.

---

## 3. Prijzen

### 3.1 Uitgangspunt: er is geen prijslijst

> *"The provider does not communicate any price information. This is a common practice for software vendors and service providers."*
> — OMR Reviews, pagina Planisware Enterprise pricing, geraadpleegd 25-07-2026 (https://omr.com/en/reviews/product/planisware-enterprise/pricing)

Ook rfp.wiki bevestigt: *"Pricing is generally based on factors such as user count, modules selected, and customization complexity"* en *"No concrete per-user or contract values are disclosed."* (rfp.wiki, geraadpleegd 25-07-2026).

Alles hieronder komt dus van derden of is afgeleid. Behandel het als indicatie, niet als offerte.

### 3.2 Gevonden bedragen

| Product | Bedrag | Model | Bron | Datum geraadpleegd |
|---|---|---|---|---|
| **Planisware Orchestra** | **$45 / gebruiker / maand** = **$540 / gebruiker / jaar** | SaaS-abonnement, per gebruiker, maandelijkse frequentie | getapp.com/project-management-planning-software/a/nqi-orchestra/ | 25-07-2026 |
| **Planisware Orchestra** | **$45 / gebruiker / maand**, "starting price"; geen gratis proefversie, geen gratis versie | SaaS | softwareadvice.com/project-management/planisware-orchestra-profile/ | 25-07-2026 |
| **Planisware Orchestra** | 1 gebruiker $540/jr · 10 gebruikers $5.400/jr · 100 gebruikers $54.000/jr | Lineaire doorrekening van $45 p.g.p.m. **Let op — gecorrigeerde bronkwalificatie:** de bron labelt deze bedragen zélf *niet* als extrapolatie en zegt niet of ze leveranciersbevestigd zijn; PricingNow vermeldt dat zijn content met "AI tools… then editor-reviewed" tot stand komt. Dat de reeks exact lineair is, is mijn eigen constatering. Lage bewijswaarde. | pricingnow.com/question/planisware-orchestra-pricing/ | 25-07-2026 |
| **Planisware Orchestra** | Prijs "not available"; per-user maandelijks model | — | capterra.com/p/146320/Planisware-Orchestra/pricing/ | 25-07-2026 |
| **Planisware (algemeen)** | vanaf **$45 / gebruiker / maand** | — | ITQlick (via zoekresultaat; pagina zelf gaf HTTP 403) | 25-07-2026 |
| **Planisware (algemeen)** | vanaf **$50 / gebruiker / maand** voor kleine bedrijven | — | ITQlick / SoftwareSuggest (via zoekresultaat) | 25-07-2026 |
| **Planisware (algemeen)** | **$30–$40 / gebruiker / maand** bij >1.000 gebruikers | Volumestaffel | ITQlick (via zoekresultaat) | 25-07-2026 |
| **Planisware Enterprise** | "starting price $1 per user, per year" | — | capterra.com/p/72483/Planisware/ | 25-07-2026 |

**Waarschuwing bij die laatste regel:** de Capterra-vermelding van "$1 per gebruiker per jaar" voor Planisware Enterprise is vrijwel zeker een placeholder-/invulartefact van het Capterra-formulier en **absoluut geen reële prijs**. Niet gebruiken.

**Tegenstrijdigheid bij Orchestra:** GetApp meldt dat er zowel een gratis proefversie als een gratis versie beschikbaar is; SoftwareAdvice (zelfde moederbedrijf, Gartner Digital Markets) meldt dat géén van beide beschikbaar is. Een TrustRadius-reviewer noemt een **14-daagse trial**. Ik houd aan: **er is geen gratis tier; een trial is mogelijk maar wordt per aanvraag geregeld.** **[SCHATTING]**

### 3.3 Implementatie, add-ons en verborgen kosten

| Kostenpost | Bedrag | Bron |
|---|---|---|
| Implementatie SMB → enterprise | "van een paar duizend dollar tot meer dan $100.000" | Zoekresultaatsamenvatting reviewsites (2026) |
| Implementatie complexe enterprise | **$50.000 – $500.000+**, afhankelijk van complexiteit, maatwerk en datamigratie | ITQlick (via zoekresultaat), 25-07-2026 |
| Consultancy | *"Planisware is very costly… the consultants from Planisware charge a very high rate for their time."* — Avinash Padmanabhan | PeerSpot pros-and-cons, 25-07-2026 |
| Overige | Eenmalige setup fees, datamigratie, training, "renewal caps" (verwachte jaarlijkse abonnementsverhoging) | pricingnow.com, 25-07-2026 |
| Structureel risico | *"User tiering and module packaging can materially change total cost over time"* en *"Connector and data-integration scope may shift from product to services spend"* | rfp.wiki, 25-07-2026 |
| OData-toegang | Aparte licentie vereist — *bron aangescherpt*: de integratiepagina noemt dit concreet bij de OnePager-koppeling (*"…requires an ODATA license"*), niet als algemene productregel | planisware.com integratiepagina, geverifieerd 25-07-2026 |

### 3.4 Afgeleide werkelijke prijs per klant **[AFGELEID]**

Uit de FY2025-cijfers kan een reëler beeld worden gedestilleerd dan uit reviewsites:

- Totale omzet FY2025: **€198,0 mln**
- Terugkerende omzet: **€179,7 mln** (91%)
- Aantal klantorganisaties: **~650**

→ **Gemiddelde terugkerende omzet per klant ≈ €276.000 per jaar** (€179,7 mln / 650 = €276.462)
→ **Gemiddelde totale omzet per klant ≈ €305.000 per jaar** (€198,0 mln / 650 = €304.615)

*Rekenkundig nagelopen en correct. Eén methodische waarschuwing die er eerst niet stond:* de noemer beweegt hard. Wikipedia noteert **500 klanten bij de IPO (april 2024)** tegenover ~650 eind 2025 — een groei van circa 30% in ~20 maanden. Je deelt dus jaaromzet door een eindstand-klantental, wat het gemiddelde per klant **structureel te laag** maakt (nieuwe klanten dragen maar een deel van het jaar bij). Het werkelijke gemiddelde per *volledig jaar actieve* klant ligt hoger dan €276k. Behandel deze getallen als ondergrens, niet als puntschatting.

Dit gemiddelde wordt sterk opgetrokken door grote Enterprise-accounts (Pfizer, Northrop Grumman-klasse) en gedrukt door kleinere Orchestra-klanten. **[SCHATTING]** van de werkelijke spreiding:

| Segment | Indicatieve jaarlijkse licentiekosten | Zetels |
|---|---|---|
| Orchestra, mid-market PMO | €25.000 – €80.000 | 50 – 150 |
| Enterprise, één divisie | €150.000 – €400.000 | 200 – 800 |
| Enterprise, concernbreed (farma/A&D) | €500.000 – €2.000.000+ | 1.000 – 10.000+ |

Plus in jaar 1 een implementatie van dezelfde of grotere orde. **Minimale zetelaantallen worden nergens gepubliceerd**; op basis van het salesmodel schat ik een praktische ondergrens rond **50 zetels voor Orchestra en 200+ voor Enterprise** **[SCHATTING]**.

### 3.5 Prijsvergelijking in context

SelectHub (geraadpleegd 25-07-2026) stelt Primavera P6 op **$3.168 per gebruiker per jaar** tegenover Planisware "$45 monthly starting price". Dat is een appels-met-peren-vergelijking: P6 wordt hier als volledige planner-licentie geprijsd, Planisware als goedkoopste gebruikerstype (waarschijnlijk een lees-/urenboekgebruiker). ITQlick merkt op dat Planisware's equivalente functionaliteit **2 à 3× de kosten** van bijvoorbeeld Clarizen/AdaptiveWork kan bedragen, oftewel **$50.000–$100.000+ per jaar extra** voor een vergelijkbare gebruikersbasis.

---

## 4. VOORDELEN

1. **Echte netwerkplanning, geen pseudo-Gantt.** Vier relatietypen (FS/FF/SS/SF), positieve én negatieve lags, datumconstraints (SNET/FNLT), werkkalenders en — mits bevestigd — **een aparte kalender per relatie**. Dat laatste kent MS Project niet; P6 heeft het wél maar alleen als projectbrede scheduling-optie. Bron: Planisware Enterprise-tutorial (prodsens.live, 18-01-2024) — bij herverificatie niet opnieuw op te halen, zie §2.1 **[ONZEKER]**.

2. **Eén datamodel voor planning, resources, kosten en portfolio.** Cost accounts met tijdsverdeling (Extendible / Lag during / Fixed dates / At end of activity), Budget at Completion in de baseline, Earned Value en stage-gate in dezelfde structuur. Capterra-reviewers noemen expliciet "project control, control of funds, expenditure, time monitoring" en de "comprehensive integration of project and portfolio management aspects in one tool".

3. **Portfolio-optimalisatie op wetenschappelijk niveau.** Particle Swarm Optimization, efficient-frontier-analyse, Monte Carlo-simulatie en PTRS-weging zijn out-of-the-box aanwezig. Geen enkele klassieke CPM-tool (P6, Asta, MS Project) heeft dit; het is de reden dat farma en A&D hiervoor betalen.

4. **Domeinspecifieke farma-inhoud die tien jaar implementatiewerk uitspaart.** Centraliseren van trial- en submissieplannen over FDA/EMA/post-market-workflows, IRA-prijsregels, R&D-tax-credit-terugvordering, dynamische roadmaps tussen R&D, klinisch, regulatory, manufacturing en commercie. Sanofi is klant sinds 1996 — dertig jaar domeinaccumulatie.

5. **Bewezen op de allergrootste schaal, bij de meest risicomijdende kopers.** Klantenlijst: Pfizer, AstraZeneca, Sanofi, Roche, AbbVie, Amgen, Gilead, J&J, UCB, Ipsen, PepsiCo, Northrop Grumman (jan. 2025), Dana (juli 2025). ~650 klantorganisaties in 35+ landen (FY2025-resultaten).

6. **Financieel uitzonderlijk stabiele leverancier — laag vendorrisico voor 10-jarige programma's.** FY2025: omzet €198,0 mln, 91% terugkerend, adj. EBITDA-marge 37,4%, nettowinst €50,0 mln, **churn 1,4%**, net retention rate 110%, netto kaspositie €195,6 mln, cash conversion 80,1%. Voor een tool waarin je een tienjarig ontwikkelportfolio parkeert, is dit een reëel selectiecriterium.

7. **Extreme configureerbaarheid via de regelmotor.** Reviewers op SoftwareFinder: *"high degree of freedom to customize almost every aspect to suit my needs"*, *"flexible tool"* met features die *"really well across different industries"* werken. Organisaties met een eigen governance-taal kunnen die in de tool afdwingen in plaats van eromheen te werken.

8. **Brede, volwassen integratielaag.** SAP (met actief onderhouden SAP-certificering), Oracle Fusion/NetSuite/JD Edwards/Hyperion, Anaplan, PLM (Windchill, Enovia, Teamcenter), ALM (Jira, Azure DevOps), MS Project, Primavera P6, Smartsheet, CRM (Salesforce, Dynamics 365, HubSpot, SAP CX), BI (Tableau, Power BI, Qlik, Cognos, Spotfire via "BI-Box"), plus open REST API, OData, Apache Kafka event streaming en iPaaS (Tray.io). Bron: planisware.com/seamless-integration-your-critical-enterprise-applications.

9. **Alle deployment-modellen, inclusief on-premises.** SaaS, private cloud/hosting én draaien op eigen servers — met SOC 1/SOC 2 Type 2 en ISO 27001. Voor defensie- en farma-compliance is de on-premises-optie vaak doorslaggevend, en juist die verdwijnt bij veel concurrenten.

10. **Duidelijk instapproduct met upgradepad.** Orchestra is turnkey en voorgeconfigureerd voor PMO's, met een expliciet gedocumenteerd "straightforward upgrade path to Planisware Enterprise". Je kunt klein beginnen zonder je datamodel weg te gooien bij opschaling.

---

## 5. NADELEN

1. **Ondoorzichtige en hoge prijs.** Geen enkele publieke prijslijst voor Enterprise. TrustRadius-reviewers: *"Price is considerably higher than other options, especially when enabling numerous premium features."* PeerSpot: *"Planisware is very costly… the consultants from Planisware charge a very high rate for their time."* (Avinash Padmanabhan). ITQlick schat 2–3× de kosten van vergelijkbare PPM-tools.

2. **Implementatie is een programma, geen installatie.** rfp.wiki: *"Implementation often involves substantial configuration to tailor the platform to enterprise workflows and governance models. It typically requires dedicated project management and change management resources."* Alleen de leveranciersselectie duurt al 6–10 weken; implementatiekosten van **$50.000 tot $500.000+** worden genoemd. Voor kleinere organisaties is dit onhaalbaar.

3. **Steile leercurve; niet geschikt voor de massa.** TrustRadius: *"requires significant skill and experience; not a great planning tool for the masses."* Capterra-reviewer: het systeem is *"not intuitive and not-user friendly making adoption/acceptance challenging."* Formele training is praktisch verplicht.

4. **Gedateerde UI en trage schermen.** rfp.wiki: *"Recurring feedback calls out dated UI and a steep learning curve."* PeerSpot: *"UI and UX of Planisware are not that advanced"* (Avinash Padmanabhan), *"user experience and interface need improvement"* (Neeraj Chaudhari). SoftwareFinder-reviewers melden expliciet "sluggish behavior" in Internet Explorer en Edge.

5. **De Gantt/planningsworkflow zelf is omslachtig.** SoftwareFinder: *"Gantt charts and related scheduling visuals require substantial improvement"* en *"Planning/Gantt timeline requires multiple sequential steps"* wat de efficiëntie verlaagt. Ook Orchestra-reviewers noemen beperkingen bij het uitrapporteren van Gantt-views. Voor een dagelijks planner is dit een reële productiviteitsrem — en precies het gebied waar P6/Asta uitblinken.

6. **Prestatie- en stabiliteitsproblemen bij volume.** Trage laadtijden bij grote datasets en complexe portfolio's; grote rapportgeneratie draagt bij aan waargenomen onbetrouwbaarheid (rfp.wiki); stabiliteitsproblemen bij on-premises-installaties (PeerSpot); prestatiedips gemeld boven ~5.000 gebruikers; dashboards die op programmaniveau niet flexibel genoeg zijn.

7. **Geen aparte CBS naast WBS.** Planisware kent geen onderscheiden cost- en work breakdown structures; er is één gedeelde "Project Breakdown Structure" voor zowel financiële als operationele doeleinden. Voor grote, complexe projecten die verschillende granulariteit nodig hebben voor uitvoering versus financiën is dat een structurele beperking (adeaca.com analyse, geraadpleegd 25-07-2026).

8. **Support is een terugkerende klacht — vooral buiten de VS.** Capterra: *"Lack on 2nd level support, response on time and with qualified solutions."* PeerSpot: *"technical support process can be quite challenging, takes significant time"* (Puja Mahato) en *"takes years for development unless one pays dearly for special services"* (John Andrew Kossey). TrustRadius: trage reacties en onopgeloste issues.

9. **Over-customization wreekt zich.** rfp.wiki noemt als expliciet implementatierisico: *"Over-customization creates brittle workflows and expensive maintenance"* en *"Heavy customization can increase admin load and downstream maintenance."* Paradoxaal genoeg klagen andere reviewers juist over "limited flexibility in customization" — beide zijn waar: het platform is diep configureerbaar maar niet altijd langs de assen die de klant wil.

10. **Agile-ondersteuning is oppervlakkig.** Ondanks SAFe/Scrum/Kanban-claims: geen burndown-charts of velocity-tracking out-of-the-box, "basic" kanbanborden zonder swimlanes of WIP-limieten, sprint planning vereist workarounds. Jira-integratie wordt door PeerSpot-gebruikers als zwak beoordeeld. Slack/Teams-integratie is grotendeels maatwerk.

11. **API-beperkingen voor massadata.** Planisware leunt voor massale datastromen op file-based integraties; de OData-API kent prestatieproblemen bij hoog volume en ondersteunde (in elk geval historisch) alleen basic auth (adeaca-analyse). rfp.wiki: *"Third-party ecosystem is narrower than generalist work-management platforms"* en *"Integration work can be non-trivial for less common tools."*

12. **Weinig onafhankelijke publieke signalen — maar minder extreem dan hieronder eerst gesteld** *(genuanceerd na verificatie)*. Capterra heeft inderdaad slechts **5 reviews** voor Planisware Enterprise (4,1/5; ease of use 3,1; customer service 2,7) en 19 voor Orchestra (4,2/5, via GetApp bevestigd). Maar dat lage Capterra-getal is een Capterra-artefact, geen marktbreed beeld: **Gartner Peer Insights telde al 64 reviews in oktober 2023**, SelectHub aggregeert **80 gebruikersreviews** (user sentiment 84/100 — exact gelijk aan Primavera P6's 84/100 uit 371 reviews) en SoftwareFinder heeft er 26. De juiste formulering is dus: er is **redelijk wat gestructureerde reviewdata op enterprise-reviewplatforms, maar vrijwel geen ongefilterde community-discussie** — een gerichte Reddit-zoektocht leverde **geen enkele substantiële thread** op in r/projectmanagement, r/construction of vergelijkbaar. Voor een koper betekent dit vooral: de kritische, niet-bemiddelde geluiden ontbreken; referentiebezoeken blijven nodig.

---

## 6. Interoperabiliteit

Dit hoofdstuk is voor de opdrachtgever (open-source, IFC-gebaseerde planner) het belangrijkste.

### 6.1 Wat aantoonbaar ondersteund wordt

| Formaat / kanaal | Status | Details |
|---|---|---|
| **MS Project XML (MSPDI)** | **Ja, bidirectioneel** | "Planisware-Microsoft Project Connector": import/export van MSP-bestanden ad hoc, via drag-and-drop. Creëert en werkt **taken, resources en kalenders** bij; detecteert wijzigingen, toevoegingen en verwijderingen automatisch. Beheerders configureren de veldmapping. Uitwisseling verloopt via "Planisware's XML file exchange" en de standaard REST API. Beschikbaar over alle producten (Orchestra, Horizon, Nova, Enterprise). Bron: planisware.com/resources/work-management-collaboration/microsoft-project-planisware-enterprise-data-integration |
| **MS Project MPP (binair)** | **Onbevestigd** | De documentatie noemt XML-uitwisseling; sommige beschrijvingen spreken van "MSP files". Er is geen bewijs van native .mpp-parsing. **[SCHATTING]** dat de connector .mpp accepteert via een MS-Project-clientconversie, niet native. |
| **Oracle Primavera P6** | **Bidirectionele schema-uitwisseling geclaimd; formaat deels bekend** — *gecorrigeerd* | Planisware's eigen integratiepagina zegt letterlijk: *"Export and import Planisware schedules to Oracle Primavera P6. Schedules can also be exported in XML format."* Dat is **meer** dan de eerdere formulering "mechanisme onbekend" suggereerde: import én export van schema's wordt expliciet geclaimd. Wat er **nog steeds niet staat**: het woord **XER**, of het P6-XML-schema (`PMXML`) wordt bedoeld, en of relaties/kalenders/constraints meekomen. **[DEELS ONBEVESTIGD]** — voor een bouworganisatie die op XER draait blijft dit een POC-punt. |
| **CSV / Excel** | **Ja** | Configureerbare import/export-interface; Planisware verwijst naar eigen documentatie "Importing From and Exporting To Office". |
| **REST API** | **Ja, open** | *"Our Planisware REST APIs use RESTful architecture to enable access to data without using the Planisware user interface."* Gepositioneerd als hét integratiekanaal. |
| **OData** | **Ja; aparte licentie bestaat aantoonbaar** — *genuanceerd* | De integratiepagina noemt de OData-licentie op één plek, en wel specifiek bij de OnePager-koppeling: *"The data exchange with OnePager occurs via Planisware's standard API, which requires an ODATA license."* Daarmee staat vast dat een OData-licentie een **apart te kopen item** is; de pagina doet géén algemene uitspraak dat álle OData-toegang los gelicentieerd is. Beperkingen: prestaties bij hoog datavolume; (historisch) alleen basic auth. |
| **Apache Kafka** | **Ja, vanaf platformversie 26Q1** | Planisware kan events naar Kafka publiceren, andere systemen abonneren zich erop. De versie-eis (26Q1) staat expliciet op de integratiepagina — relevant voor klanten op oudere releases. |
| **iPaaS** | **Ja** | Tray.io. |
| **BI** | **Ja, via "BI-Box"** | Tableau, Power BI, Qlik, Cognos, Spotfire. Ook een ingebouwde BI-tool die reviewers "kan worden vergeleken met Power BI of Tableau" noemen. |

### 6.2 IFC 4.3 / IfcWorkSchedule / IfcTask — de kernvraag

**Bevinding: geen enkel bewijs van IFC-ondersteuning voor planningsdata.**

Wat Planisware wél zegt over BIM:

> *"Planisware BIM integration let you integrate your BIM models directly within the solution and augment these models with data about tasks (4D planning) and costs (5D planning). Data exchange takes place via Planisware's standard REST API and configurable import/export interface."*
> — planisware.com/seamless-integration-your-critical-enterprise-applications, geraadpleegd 25-07-2026

Analyse van deze formulering, streng gelezen:
- Het gaat om het **inbrengen van BIM-modellen in Planisware** en het **verrijken** daarvan met taak- en kostendata. Dat is een viewer-/koppelscenario, geen formaatondersteuning.
- Het uitwisselingsmechanisme is expliciet **"the standard REST API and configurable import/export interface"** — dus niet een IFC-parser/-serializer.
- Er wordt **nergens** gesproken over IFC, IFC 4.3, IfcWorkSchedule, IfcTask, IfcTaskTime, IfcRelSequence of IfcWorkCalendar.
- Er is geen aparte productpagina, whitepaper of documentatiepagina over BIM/IFC gevonden; het is één alinea op een integratie-overzichtspagina.

**Conclusie voor de opdrachtgever:** Planisware is **geen IFC-native systeem en geen realistische IFC-uitwisselingspartner**. Wie planningsdata tussen een IFC-gebaseerde planner en Planisware wil uitwisselen, zal dat via MSPDI-XML, CSV of de REST API moeten doen — met het bekende verlies: relatiekalenders, constraints, baselines en kostenrekeningen overleven zo'n conversie zelden volledig.

**Strategische implicatie:** dit is tegelijk een kans. De grootste PPM-leverancier ter wereld voor R&D-portfolio's heeft geen IFC-planningsuitwisseling. Een open-source IFC-native planner concurreert niet met Planisware (andere markt, andere prijsklasse, andere koper), maar kan wél de rol vervullen die Planisware structureel niet invult: het bouwkundige, modelgebonden schema. Voor een concernbrede farma- of A&D-klant die zowel R&D-portfolio als capex-bouw doet, is dat een complementaire positie, geen concurrerende.

### 6.3 Wat je aan het datamodel kunt lenen

Voor de bouw van een eigen planner is het Planisware-datamodel op drie punten leerzaam:
1. **Kalender per relatie** (niet alleen per activiteit) — sterk model voor lags die andere werkritmes volgen dan de taken zelf.
2. **Cost accounts met expliciete tijdsverdelingsmethode** (Extendible / Lag during / Fixed dates / At end of activity) — een schoner model dan het gebruikelijke "kosten volgen de taakduur".
3. **Baseline = planned start + planned finish + Budget at Completion** als één atomair snapshot, met automatische WBS-consolidatie eroverheen.

---

## 7. Marktpositie

### 7.1 Erkenning door analisten

- **Leader** in *The Forrester Wave™: Strategic Portfolio Management Tools, Q2 2024*. **[ONZEKER]** — niet te bevestigen met een gedateerde, onafhankelijke bron in deze ronde (Forrester- en Planisware-persberichtpagina's gaven 404). Planisware's eigen *Why Planisware*-pagina claimt alleen ongedateerd: *"recognized as a Leader by Gartner, Forrester and IDC across multiple PPM categories"* — dus zonder rapportnaam, kwartaal of jaar. Opvallend: die zin noemt óók **IDC**, wat in dit profiel eerder ontbrak.
- **Gartner Peer Insights Customers' Choice** voor Strategic Portfolio Management (2023). **Bevestigd, woordelijk:** *"Planisware received the most 5-star reviews among the vendors based on 64 reviews as of 4 October 2023"*, na het overtreffen van zowel het marktgemiddelde voor User Interest and Adoption als voor Overall Experience (Business Wire, 04-10-2023).
- **#1 PPM Enterprise Champion** in het Info-Tech Research Group 2022 Emotional Footprint Report. **[ONZEKER]** — geen onafhankelijke bevestiging gevonden; Planisware's eigen site noemt Info-Tech niet.
- SelectHub geeft Planisware een analyst rating van **88/100** tegenover Primavera P6 **78/100** — maar dat is een PPM-schaal, niet een schedulingschaal, en die weegt portfolio/demand/agile zwaar mee.

*Kanttekening:* in de **2025 Gartner Magic Quadrant for Strategic Portfolio Management** is Planview de meest zichtbaar gepositioneerde Leader (vierde jaar op rij, hoogste positie op beide assen). Ik heb Planisware's exacte positie in de 2025-MQ niet kunnen verifiëren — Gartner-pagina's gaven HTTP 403. **[ONBEVESTIGD]**

### 7.2 Financiële prestaties en omvang (FY2025)

| Metriek | Waarde |
|---|---|
| Omzet | €198,0 mln (+7,9% gerapporteerd, +10,3% in constante valuta) |
| Terugkerende omzet | €179,7 mln (91% van totaal, +12,8%) |
| SaaS & Hosting | €93,7 mln (+16,7% cc) |
| Adjusted EBITDA | €74,1 mln — marge 37,4% (+220 bps) |
| Nettowinst | €50,0 mln (+17,0%) — EPS €0,71 |
| Adjusted free cash flow | €59,3 mln (80,1% conversie) |
| Netto kaspositie | €195,6 mln |
| Klanten | ~650 organisaties in 35+ landen |
| Net retention rate | 110% |
| Churn | 1,4% |
| Nieuwe Enterprise-klanten H2 2025 | 24 |
| Medewerkers | 838 (+12,0%) |
| Guidance 2026 | Low double-digit omzetgroei cc, ~37% adj. EBITDA-marge, ~80% cash conversion |

Bron: planisware.com, FY2025-resultaten, geraadpleegd 25-07-2026.

**Gebruikersaantallen:** Planisware publiceert geen totaal gebruikersaantal in recente communicatie. Een oude bron (franz.com) noemt "more than 100,000 customers" — dat is duidelijk een verhaspeling van gebruikers versus klanten en onbruikbaar. **[SCHATTING]**: bij ~650 klanten met gemiddeld enkele honderden tot duizenden zetels ligt de installed base in de orde van **enkele honderdduizenden benoemde gebruikers wereldwijd**.

### 7.3 Waar sterk en waarom

**Sterk in:**
- **Farma & life sciences** — dominant. Dertig jaar domeinaccumulatie, PTRS/Monte Carlo/efficient frontier, klinische en regulatory-workflows, een klantenlijst met vrijwel elke grote speler. Dit is de thuisbasis.
- **Aerospace & defense** — Thales-erfgoed, on-premises-optie, EVM en programmagovernance. Northrop Grumman (2025) is een zwaar referentiepunt.
- **Automotive & high-tech NPD** — stage-gate productontwikkeling, Dana (2025).
- **Energie, chemie, consumer goods, overheid** — secundair maar aanwezig.
- **Frankrijk/Europa als thuismarkt** (49% van de omzet) met een sterke tweede positie in Noord-Amerika (43%).

**Zwak of afwezig in:**
- **Bouw, infra en civiele techniek** — hier heersen Oracle Primavera P6, Asta Powerproject, MS Project en de nieuwe generatie (Nodes, Planera, ALICE). Planisware's eigen positionering noemt "engineering, construction and capital asset management" wel, maar de klantreferenties en de featureset wijzen niet op serieuze penetratie. Voor bouw-CPM is Planisware een outsider.
- **Kleine en middelgrote organisaties** — Orchestra bedient de mid-market, maar met $45 p.g.p.m. plus implementatie en een steile leercurve is het geen MKB-product.
- **Pure agile organisaties** — de agile-features zijn niet concurrerend met Jira/Azure DevOps/Rally.

### 7.4 Belangrijkste concurrenten

| Categorie | Concurrenten |
|---|---|
| Enterprise SPM/PPM (direct) | **Planview** (Portfolios, AdaptiveWork, ProjectAdvantage), **Broadcom Clarity**, **ServiceNow SPM**, **Sciforma**, **Triskell**, **Dassault Systèmes**, **Sopheon** (NPD-innovatie), **SAP** |
| Klassieke CPM/scheduling (indirect) | **Oracle Primavera P6 / Primavera Cloud / Unifier**, **Microsoft Project**, **Asta Powerproject**, **Deltek Acumen/Open Plan** |
| Lichte werkbeheertools (van onderaf) | Smartsheet, Asana, Monday, Wrike, Jira — geen echte CPM, maar wel prijsdruk aan de onderkant |
| Mid-market | Meisterplan, Prism PPM, Zoho Projects |

### 7.5 Trend

- 2024–2025 kende **verlengde salescycli en IT-budgetdruk**; Planisware sprak zelf van "limited visibility, elongated customer decision cycles". Eind 2025 herstelde het commerciële momentum, met 24 nieuwe Enterprise-klanten in H2.
- **AI is de strategische inzet**: Oscar AI-assistent, generatieve AI voor WBS-opbouw ("comprehensive work breakdown structures and schedules in seconds"), ML-kostenforecast, swarm-optimalisatie, intelligente auto-tagging.
- **Cloudverschuiving loopt**: SaaS & Hosting groeit met 16,7% cc terwijl de totale omzet met 10,3% groeit — de on-premises-basis wordt geleidelijk geconverteerd.
- **Consolidatie in de PPM-markt** (Planview's serie overnames) zet Planisware onder druk om breder te worden; Planisware antwoordt met vier producten voor vier koperssegmenten in plaats van één suite.

---

## 8. Eindoordeel

### Voor wie wél

- **Grote, R&D-gedreven organisaties** — farma, biotech, medtech, aerospace & defense, automotive, high-tech — die tientallen tot honderden ontwikkelprogramma's naast elkaar moeten prioriteren, bemensen en financieren. Hier is Planisware wereldtop en is er nauwelijks een gelijkwaardig alternatief.
- **Organisaties waarvoor portfoliobeslissingen zwaarder wegen dan schemadetail.** Als de vraag "welke twaalf van deze veertig projecten doen we, gegeven €300 mln en 2.400 FTE?" belangrijker is dan "haalt activiteit 14.320 zijn early finish?", dan is dit het juiste gereedschap.
- **Organisaties met een volwassen PMO en een eigen beheerteam.** Planisware beloont investering in configuratie en bestraft de afwezigheid ervan.
- **Kopers met een zes- tot zevencijferig meerjarenbudget** en een tijdshorizon van 10+ jaar, die vendorstabiliteit als selectiecriterium hanteren — daar scoort Planisware met 1,4% churn en €195,6 mln netto kas uitzonderlijk.
- **Compliance-zware omgevingen** die on-premises of private-cloud eisen met SOC 2 Type 2 / ISO 27001.

### Voor wie niet

- **Bouw-, infra- en civiele planners.** De schemadiepte, de XER-interoperabiliteit, de dagelijkse Gantt-productiviteit en de sectorreferenties zijn er niet. Kies P6, Asta Powerproject of een moderne bouwspecifieke tool.
- **MKB en afdelingen.** Prijs, implementatielast en leercurve maken het onhaalbaar; Orchestra verzacht dit maar lost het niet op.
- **Teams die binnen weken willen draaien.** Reken op maanden, met dedicated project- en changemanagement.
- **Pure agile organisaties.** De agile-laag is niet concurrerend.
- **Iedereen die IFC-native uitwisseling nodig heeft.** Er is geen IFC-planningsondersteuning.

### Is dit een serieus alternatief voor klassieke CPM-tools?

**Gedeeltelijk — en niet in de richting die de vraag suggereert.**

Planisware verdient het predicaat "echte planningstool": het heeft een werkende netwerkmotor met vier relatietypen, lags met eigen kalenders, constraints, kalenders, baselines en kostenrekeningen op activiteitsniveau. Het valt daarmee ruim buiten de categorie werkbeheertools die alleen een balkenschema tekenen. Wie Planisware afserveert als "portfoliodashboard met een Gantt-plaatje" heeft ongelijk.

Maar Planisware is **geen vervanging voor P6 of Asta in een schema-intensieve omgeving**. De gepubliceerde bewijslast voor float-analyse, meerdere kritieke paden, out-of-sequence-logica, activiteitsgewijze resource-leveling en XER-uitwisseling ontbreekt, terwijl gebruikers de Gantt-workflow juist als traag en omslachtig beschrijven ("multiple sequential steps", "require substantial improvement"). Dat is precies het omgekeerde profiel van een klassieke CPM-tool.

Andersom geldt hetzelfde en dat is belangrijker: **P6 is geen alternatief voor Planisware.** Wie efficient-frontier-portfoliokeuzes, PTRS-gewogen R&D-waardering en concernbrede capaciteitsbalancering nodig heeft, komt er met een schema-engine niet.

De juiste conclusie is dat het twee verschillende producten zijn die in grote organisaties **naast elkaar** staan — met de MS-Project-connector en de REST API als brug. En precies daar zit het gat dat relevant is voor een open-source, IFC-gebaseerde planner: die brug is vandaag proprietary XML en CSV, niet IFC. Planisware bezet de portfolio-laag, P6 de bouwschema-laag, en de modelgebonden, IFC-native laag is nog steeds grotendeels onbezet.

---

## Bronnenlijst

Alle URL's geraadpleegd op **25 juli 2026**, tenzij anders vermeld.

**Leverancier (primair)**
1. Planisware — Products Overview. https://planisware.com/products-overview
2. Planisware — Planisware Enterprise (productpagina). https://planisware.com/planisware-enterprise
3. Planisware — Planisware Orchestra (productpagina). https://planisware.com/products/planisware-orchestra
4. Planisware — Brochure Planisware Enterprise. https://planisware.com/resources/product-brochure/brochure-planisware-enterprise
5. Planisware — Solution Functional Overview. https://planisware.com/resources/selecting-tool/planisware-solution-functional-overview
6. Planisware — Seamless integration with your critical enterprise applications. https://planisware.com/seamless-integration-your-critical-enterprise-applications *(integraties, REST API, OData, Kafka, BIM 4D/5D)*
7. Planisware — Microsoft Project / Planisware Enterprise data integration. https://planisware.com/resources/work-management-collaboration/microsoft-project-planisware-enterprise-data-integration
8. Planisware — Accelerate Pharma Innovation (industriepagina, klantnamen). https://planisware.com/industries/pharma
9. Planisware — "Strong 2025 performance with renewed commercial momentum at year-end" (FY2025-resultaten). https://planisware.com/resources/corporate-news/strong-2025-performance-renewed-commercial-momentum-year-end
10. Planisware — Q3 2025 revenue. https://planisware.com/resources/corporate-news/q3-2025-revenue-%E2%82%AC-496-million-90-constant-currencies
11. Planisware — Glossary: OPX2. https://planisware.com/glossary/opx2
12. Planisware — corporate news: acquisition of NQI. https://planisware.com/resources/corporate-news/planisware-acquires-nqi-extends-ppm-market-coverage-both-global-and-mid

**Bedrijfsinformatie en pers**
13. Wikipedia — Planisware. https://en.wikipedia.org/wiki/Planisware *(oprichting, oprichters, Thales/Syseca-oorsprong, IPO 2024, Ardian, FY2025-kerncijfers)*
14. Business Wire — "Planisware Acquires NQI, Extends PPM Market Coverage for Both Global and Mid-Market Companies", 27-03-2018. https://www.businesswire.com/news/home/20180327005833/en/Planisware-Acquires-NQI-Extends-PPM-Market-Coverage
15. Business Wire — "Planisware Enterprise Selected by Northrop Grumman…", 27-01-2025. https://www.businesswire.com/news/home/20250127178190/en/
16. Business Wire — "Planisware is recognized as a 2023 Gartner® Peer Insights™ Customers' Choice for Strategic Portfolio Management", 04-10-2023. https://www.businesswire.com/news/home/20231004393149/en/
17. Business Wire — Dana selects Planisware, 29-07-2025 (via financialcontent). https://markets.financialcontent.com/startribune/article/bizwire-2025-7-29-dana-selects-planisware-for-enterprise-wide-program-management-amid-transformative-shift-in-the-automotive-industry
18. GlobeNewswire — Planisware H1 2025 resultaten, 31-07-2025. https://www.globenewswire.com/news-release/2025/07/31/3124648/

**Techniek en functionaliteit**
19. prodSens.live — "Planisware Enterprise Tutorial: Steps to Build Plan", 18-01-2024. https://prodsens.live/2024/01/18/planisware-enterprise-tutorial/ *(WBS, mijlpalen, 4 relatietypen, lags, constraints SNET/FNLT, kalenders, baselines, cost accounts, resources)*
20. Franz Inc. — Planisware/OPX2 customer application (Allegro Common Lisp). https://franz.com/success/customer_apps/knowledge_mgmt/planisware.lhtml *(gedateerd)*
21. Tyneo — Planisware (EPM/PPM toolfiche). https://www.tyneo.net/en/tools/epm-ppm/planisware *(gedateerd; platforms, schaal)*
22. OnePager — "Planisware Gantt Chart with Predecessors". https://www.onepager.com/howto/planisware-gantt-chart-with-predecessors.html *(HTTP 403 bij fetch; inhoud via zoekresultaatsamenvatting: Ctrl+L links, drag-and-drop FS, link-attribuutblad met type, lag en kalender)*
23. PMO-Performance — Orchestra PPM 6.2 (ex NQI) productfiche (PDF). http://www.pmo-performance.com/Files/fiche_orchestra_ppm_6.2.pdf

**Reviews en gebruikersfeedback**
24. Capterra — Planisware Enterprise. https://www.capterra.com/p/72483/Planisware/ *(4,1/5 uit 5 reviews; ease of use 3,1; customer service 2,7; value 4,0)*
25. Capterra — Planisware Orchestra pricing. https://www.capterra.com/p/146320/Planisware-Orchestra/pricing/
26. GetApp — Planisware Orchestra. https://www.getapp.com/project-management-planning-software/a/nqi-orchestra/ *($45 p.g.p.m.; 4,2/5 uit 19 reviews)*
27. Software Advice — Planisware Orchestra profiel. https://www.softwareadvice.com/project-management/planisware-orchestra-profile/
28. SoftwareFinder — Planisware Enterprise reviews. https://softwarefinder.com/project-management-software/planisware/reviews *(4,5/5 uit 26 reviews; concrete pro/con-citaten)*
29. PeerSpot — Planisware pros and cons. https://www.peerspot.com/products/planisware-pros-and-cons *(geciteerde gebruikers: Avinash Padmanabhan, Puja Mahato, Steven Thompson, Anas SIWAR, Chandrajit Rudra, Neeraj Chaudhari, John Andrew Kossey)*
30. PeerSpot — Oracle Primavera Portfolio Management vs Planisware. https://www.peerspot.com/products/comparisons/oracle-primavera-portfolio-management_vs_planisware
31. TrustRadius — Planisware reviews (pros & cons). https://www.trustradius.com/products/planisware/reviews?qs=pros-and-cons
32. rfp.wiki — "Planisware — Rollout Reality: Setup & Adoption (2026)". https://www.rfp.wiki/project-management/strategic-portfolio-management/planisware
33. ProductOwl — Planisware analyse (score 2,8/4). https://www.productowl.io/project-management-software/planisware
34. SelectHub — Primavera P6 vs Planisware. https://www.selecthub.com/ppm-software/primavera-p6-vs-planisware/
35. Adeaca — "What is Planisware?" (kritische analyse, WBS/CBS, oData/basic auth). https://www.adeaca.com/blog/faq-items/what-is-planisware/
36. Gartner Peer Insights — Planisware Enterprise / Orchestra. https://www.gartner.com/reviews/market/strategic-portfolio-management/vendor/planisware *(HTTP 403 bij directe fetch; alleen indirect geraadpleegd)*
37. G2 — Planisware Enterprise pros & cons. https://www.g2.com/products/planisware-planisware-enterprise/reviews?qs=pros-and-cons *(HTTP 403 bij fetch)*

**Prijsbronnen**
38. PricingNow — "Planisware Orchestra Pricing 2026: The True TCO & Hidden Costs". https://pricingnow.com/question/planisware-orchestra-pricing/
39. OMR Reviews — Planisware Enterprise pricing. https://omr.com/en/reviews/product/planisware-enterprise/pricing *("The provider does not communicate any price information")*
40. ITQlick — Planisware pricing. https://www.itqlick.com/planisware/pricing *(HTTP 403 bij fetch; cijfers via zoekresultaatsamenvatting: $45 p.g.p.m.; $30–40 bij >1.000 gebruikers; implementatie $50k–$500k+)*
41. SaaSworthy — Planisware Enterprise pricing. https://www.saasworthy.com/product/planisware-enterprise/pricing

**Marktcontext**
42. Planview — "Planview Again Named by Gartner® as a Leader in Strategic Portfolio Management", 16-06-2026. https://www.businesswire.com/news/home/20260616691154/en/
43. PeerSpot — Top 10 Planisware alternatives. https://www.peerspot.com/products/planisware-alternatives-and-competitors
44. SelectHub — Planisware alternatives. https://www.selecthub.com/ppm-software/planisware/alternatives/

**Niet-beschikbare bronnen (transparantie)**
- Reddit: een gerichte zoekopdracht naar Planisware-discussies leverde **geen enkele relevante thread** op in r/projectmanagement, r/construction of aanverwante subreddits; directe toegang tot Reddit-zoekresultaten was in deze omgeving geblokkeerd. De afwezigheid van community-discussie is op zichzelf een bevinding (zie nadeel 12).
- Gartner Peer Insights, G2, ITQlick en Research.com blokkeerden directe fetch (HTTP 403); van deze bronnen zijn alleen indexeerbare samenvattingen gebruikt, wat expliciet is aangegeven bij de betreffende cijfers.

---

## Verificatie

**Uitgevoerd:** 25 juli 2026, adversariële fact-check — opzet was per bewering te proberen deze te **weerleggen** met onafhankelijke bronnen, niet te bevestigen. Primaire bronnen (planisware.com, Wikipedia, Business Wire) zijn opnieuw opgehaald; reviewsites zijn tegen elkaar uitgespeeld.

**Beperking van deze ronde:** het zoekbudget was uitgeput, dus verificatie verliep uitsluitend via directe URL-fetches. Bronnen die eerder al 403 gaven (ITQlick, Gartner, G2, OnePager) bleven ontoegankelijk, en prodsens.live zat achter een bot-check. Waar dat de doorslag gaf, staat dat hieronder.

### Prijzen en licentiemodel

| # | Bewering | Oordeel | Bron / toelichting |
|---|---|---|---|
| 1 | Geen publieke prijslijst Enterprise: *"The provider does not communicate any price information."* | **Bevestigd** — woordelijk teruggevonden | https://omr.com/en/reviews/product/planisware-enterprise/pricing |
| 2 | Orchestra vanaf **$45 per gebruiker per maand** | **Bevestigd door drie onafhankelijke listings** (GetApp, Software Advice, PricingNow noemen alle drie exact $45 p.g.p.m.). Weerleggingspoging mislukt: geen enkele bron noemt een afwijkend startbedrag | https://www.getapp.com/project-management-planning-software/a/nqi-orchestra/ · https://www.softwareadvice.com/project-management/planisware-orchestra-profile/ |
| 3 | Afgeleid **$540 per gebruiker per jaar**; 10 gebr. $5.400, 100 gebr. $54.000 | **Bevestigd als rekensom, maar bronkwalificatie gecorrigeerd.** PricingNow noemt deze bedragen zonder te zeggen of ze leveranciersbevestigd of geëxtrapoleerd zijn, en meldt zelf dat zijn content met "AI tools… then editor-reviewed" gemaakt is. Het is een lineaire doorrekening van $45×12 — geen onafhankelijk prijsbewijs, en het negeert volumekortingen die ITQlick juist wél noemt | https://pricingnow.com/question/planisware-orchestra-pricing/ |
| 4 | Facturatiemodel: **per gebruiker, maandelijks** genoteerd | **Bevestigd** dat de listings het zó noteren ("$45.00 per month / per user, per month"). **Onzeker** of Planisware daadwerkelijk maandelijks factureert; bij een enterprise-SaaS met 91% recurring revenue en 1,4% churn is een jaarcontract het waarschijnlijke werkelijke model. De reviewsite-eenheid is een *weergave*conventie, geen contractvoorwaarde | https://www.softwareadvice.com/project-management/planisware-orchestra-profile/ |
| 5 | ITQlick: $50 p.g.p.m. voor kleine bedrijven; **$30–40 p.g.p.m. bij >1.000 gebruikers**; implementatie **$50.000–$500.000+** | **Onzeker — niet verifieerbaar.** itqlick.com/planisware/pricing gaf opnieuw HTTP 403. Deze drie cijfers rusten dus nog steeds uitsluitend op een zoekresultaatsamenvatting en zijn door geen tweede bron bevestigd. De volumestaffel ($30–40) is de zwakst onderbouwde prijsbewering in het hele profiel | (403) https://www.itqlick.com/planisware/pricing |
| 6 | Capterra's "$1 per user per year" voor Enterprise is een placeholder-artefact | **Bevestigd dat de vermelding er staat** (Capterra toont letterlijk "$1.00 Per User, Per Year", geen trial, geen gratis versie). De duiding als artefact blijft een oordeel, maar is sluitend: $1 p.g.p.j. is onverenigbaar met €276k gemiddelde recurring omzet per klant. **Terecht als onbruikbaar bestempeld** | https://www.capterra.com/p/72483/Planisware/ |
| 7 | Geen gratis tier; hooguit trial op aanvraag — bronnen spreken elkaar tegen | **Bevestigd, inclusief de tegenspraak zélf.** GetApp: free trial **available**, free version **available**. Software Advice (zelfde moederbedrijf Gartner Digital Markets): **beide niet beschikbaar**. Capterra Enterprise: beide niet beschikbaar. Twee zustersites die elkaar tegenspreken over hetzelfde product is op zichzelf bewijs dat geen van beide op leveranciersopgave rust. De aangehouden conclusie (geen gratis tier, trial per aanvraag) blijft **[SCHATTING]** — terecht zo gelabeld | zie #2 |
| 8 | OData wordt apart gelicentieerd | **Gecorrigeerd (aangescherpt).** Aantoonbaar bestaat er een OData-licentie, maar de integratiepagina noemt die uitsluitend in de OnePager-context: *"…which requires an ODATA license."* Er staat geen algemene regel dat alle OData-toegang los verkocht wordt. Tekst in §3.3 en §6.1 aangepast | https://planisware.com/seamless-integration-your-critical-enterprise-applications |
| 9 | Minimale zetelaantallen ~50 (Orchestra) / 200+ (Enterprise) | **Onzeker — blijft onbewezen.** Geen enkele bron, ook niet bij hernieuwd zoeken, publiceert minimumaantallen. Correct als **[SCHATTING]** gelabeld; niet als feit te gebruiken | — |
| 10 | Spreiding €25k–€80k / €150k–€400k / €500k–€2 mln+ per segment | **Onzeker.** Geheel afgeleid, geen externe bevestiging. Wel intern consistent met de FY2025-afleiding. Correct als **[SCHATTING]** gelabeld | — |
| 11 | Afgeleid gemiddelde €276k recurring / €305k totaal per klant | **Bevestigd qua rekenwerk** (179,7/650 = 276,5k; 198,0/650 = 304,6k) maar **methodisch gecorrigeerd**: de klantenbasis groeide van 500 (IPO, apr. 2024) naar ~650 (eind 2025), dus jaaromzet delen door de eindstand geeft een **te lage** uitkomst. Toegevoegd als expliciete waarschuwing in §3.4 | FY2025-resultaten + https://en.wikipedia.org/wiki/Planisware |
| 12 | SelectHub: P6 $3.168 p.g.p.j. vs Planisware "$45 monthly"; 88/100 vs 78/100 | **Bevestigd, exact.** Aanvullend gevonden en toegevoegd aan nadeel 12: user sentiment is voor **beide** 84/100 (P6 uit 371 reviews, Planisware uit 80) — wat het analistenverschil 88 vs 78 relativeert | https://www.selecthub.com/ppm-software/primavera-p6-vs-planisware/ |

### CPM- en planningsfunctionaliteit

| # | Bewering | Oordeel | Bron / toelichting |
|---|---|---|---|
| 13 | Planisware heeft een echte netwerkmotor: 4 relatietypen, lags, SNET/FNLT, kalenders, baselines, PERT | **Grotendeels bevestigd voor het deel dat de leverancier zelf claimt** (Gantt-engine, PERT, WBS, Earned Value, stage-gate staan letterlijk op de Enterprise-productpagina). De detailclaims (FS/FF/SS/SF, lag ±, SNET/FNLT, cost-accountverdeling) rusten echter nog steeds op **één tutorialbron** (prodsens.live), die bij herverificatie achter een bot-check zat. Eén bron voor de kernconclusie van dit profiel is dun — **[DEELS ONZEKER]** | https://planisware.com/planisware-enterprise (bevestigd) · prodsens.live (niet herverifieerbaar) |
| 14 | Kalender per relatie; "zelfs MS Project heeft dit niet, P6 wél" | **Gecorrigeerd.** P6 kent de lag-kalender als **projectbrede scheduling-optie** ("Calendar for scheduling Relationship Lag"), niet per individuele relatie — de oorspronkelijke formulering suggereerde ten onrechte gelijkwaardigheid. Bovendien konden beide bronnen voor de Planisware-kant (prodsens.live, OnePager) niet opnieuw worden opgehaald (bot-check resp. HTTP 403). §2.1 en voordeel 1 herschreven naar **[ONZEKER]** | Oracle P6-documentatie kon niet worden opgehaald (404 op de geprobeerde deeplinks); correctie steunt op productkennis, niet op een geciteerde fetch — daarom bewust als onzeker gemarkeerd |
| 15 | Geen publiek bewijs voor total float / free float / forward-backward pass | **Bevestigd en versterkt.** De volledige scheduling-alinea op Planisware's eigen Enterprise-pagina luidt: *"For scheduling, Planisware Enterprise provides an advanced Gantt chart engine, PERT diagram, and the means to construct the WBS. Earned Value and the Stage-Gate methodology are supported as well."* Kritiek pad, float, baselines en resource-leveling ontbreken daar volledig. Dat de leverancier "critical path" niet eens als marketingterm gebruikt, is een **sterker negatief signaal** dan het profiel eerst aangaf. Toegevoegd aan §2.1 | https://planisware.com/planisware-enterprise |
| 16 | Reviewsites claimen "automated critical path calculation… real-time" | **Onzeker — en nu aantoonbaar in spanning met de leverancier zelf.** Deze claim komt uitsluitend van reviewsites (productowl, softwareadvice) en wordt door Planisware's eigen productpagina niet gedragen. Het profiel merkte dit al op; die scepsis is met #15 gerechtvaardigd | zie #15 |
| 17 | Geschikt tot ~5.000 gebruikers, prestatiedips daarboven | **Onzeker.** rfp.wiki bevestigt wel prestatie- en stabiliteitsklachten in algemene termen (*"Some reviews mention occasional instability or performance issues"*, *"large-report generation can contribute to perceived reliability issues"*), maar noemt **geen getal**. De grens van 5.000 gebruikers is nergens onafhankelijk bevestigd en moet als indicatief gelden | https://www.rfp.wiki/project-management/strategic-portfolio-management/planisware |
| 18 | Geen IFC-ondersteuning; BIM-integratie is een REST-koppelscenario | **Bevestigd — expliciet negatief geverifieerd.** De integratiepagina zegt letterlijk: *"Planisware BIM integration let you integrate your BIM models directly within the solution and augment these models with data about tasks (4D planning) and costs (5D planning)."* De woorden **IFC, IFC 4.3, IfcWorkSchedule, IfcTask en buildingSMART komen er niet in voor**. Dit is de best onderbouwde bevinding van het hele profiel en dus veilig voor de opdrachtgever | https://planisware.com/seamless-integration-your-critical-enterprise-applications |
| 19 | P6-integratie: "genoemd, mechanisme onbekend, geen bevestiging van XER/P6-XML" | **Gecorrigeerd — het profiel was hier te streng.** De integratiepagina claimt wel degelijk bidirectionaliteit: *"Export and import Planisware schedules to Oracle Primavera P6. Schedules can also be exported in XML format."* Wat ontbreekt blijft **XER** en de vraag of relaties/kalenders/constraints meekomen. §6.1 herschreven | idem |
| 20 | MS Project-connector: bidirectioneel, taken/resources/kalenders, wijzigingsdetectie, XML-uitwisseling, alle producten | **Bevestigd, woordelijk:** *"create and update Planisware tasks, resources, and calendars in real-time"*, *"detect changes, additions, and deletions, updating only the necessary tasks"*, *"the data exchange occurs via Planisware's XML file exchange"*, *"available in all Planisware products"*. Kanttekening: de pagina zegt "MSP files"/"XML", **niet** letterlijk "MSPDI"; die precisering is een interpretatie | https://planisware.com/resources/work-management-collaboration/microsoft-project-planisware-enterprise-data-integration |
| 21 | Kafka-ondersteuning | **Bevestigd, met toegevoegde beperking:** vereist platformversie **26Q1**. Dat stond niet in het profiel en is toegevoegd — relevant voor klanten op oudere releases | zie #18 |

### Bedrijf, gebruikersaantallen en marktpositie

| # | Bewering | Oordeel | Bron / toelichting |
|---|---|---|---|
| 22 | FY2025: omzet €198,0 mln; recurring €179,7 mln (91%); SaaS/hosting €93,7 mln; adj. EBITDA €74,1 mln / 37,4%; nettowinst €50,0 mln; EPS €0,71; FCF €59,3 mln (80,1%); netto kas €195,6 mln; ~650 klanten in 35+ landen; NRR 110%; churn 1,4%; 24 nieuwe Enterprise-klanten H2; 838 medewerkers; guidance 2026 | **Alle veertien cijfers bevestigd, één voor één, tegen de primaire bron.** Geen enkele afwijking gevonden. Ook de regionale splitsing (Europa €96,5 mln/49%/458 fte; NA €85,2 mln/43%/184 fte; APAC €16,4 mln/8%/196 fte) klopt exact. Dit is het sterkste feitenblok in het profiel | https://planisware.com/resources/corporate-news/strong-2025-performance-renewed-commercial-momentum-year-end |
| 23 | Opgericht 1996 Frankrijk; vier genoemde oprichters ex-Thales; IPO april 2024 Euronext Paris ticker PLNW, €1,11 mrd; oprichters houden meerderheid; Ardian verkoopt sept. 2024; Demonsant chairman, Sautour CEO | **Bevestigd** op alle punten | https://en.wikipedia.org/wiki/Planisware |
| 24 | Oorsprong als spin-off van **Syseca** (Thales-dochter) | **Gecorrigeerd naar onzeker.** Wikipedia zegt alleen *"The founding team was from Thales Group"*. Het Syseca-detail komt van Grokipedia — AI-gegenereerd, geen redactionele borging. Richting klopt, detail niet hard. §1.1 aangepast | idem |
| 25 | NQI-overname maart 2018; ~250 klanten; 70% IT; NQI actief sinds 2004; klanten Essilor, CMA CGM, ArcelorMittal | **Bevestigd, exact** (27-03-2018; "250 customers"; "70% are IT organizations"; "serving the PPM market since 2004"; drie genoemde klanten). Kanttekening: **Société du Canal de Provence** staat *niet* in dit persbericht en komt elders vandaan — kleine, onbevestigde toevoeging in §1.3 | https://planisware.com/resources/corporate-news/planisware-acquires-nqi-extends-ppm-market-coverage-both-global-and-mid |
| 26 | Northrop Grumman koos jan. 2025 Planisware Enterprise als enterprise-breed programmamanagementsysteem | **Bevestigd, woordelijk** (27-01-2025): *"has selected Planisware Enterprise to serve as its enterprise-wide program management system."* | https://www.businesswire.com/news/home/20250127178190/en/ |
| 27 | Gartner Peer Insights Customers' Choice 2023, meeste 5-sterrenreviews, 64 reviews | **Bevestigd, woordelijk** | https://www.businesswire.com/news/home/20231004393149/en/ |
| 28 | Leader in Forrester Wave SPM Tools Q2 2024 | **Onzeker.** Niet bevestigd: Forrester-blog en het vermoede Planisware-persbericht gaven 404, Gartner/G2 403. Planisware's eigen site claimt slechts ongedateerd *"recognized as a Leader by Gartner, Forrester and IDC across multiple PPM categories"* — zonder rapport, kwartaal of jaar. §7.1 aangepast; **IDC** toegevoegd als eerder ontbrekende erkenning | https://planisware.com/why-planisware |
| 29 | #1 PPM Enterprise Champion, Info-Tech 2022 Emotional Footprint | **Onzeker.** Geen onafhankelijke bevestiging; Planisware noemt Info-Tech zelf niet | idem |
| 30 | Gebruikersaantal: "enkele honderdduizenden benoemde gebruikers wereldwijd" | **Onzeker — blijft een schatting, en de onderbouwing is zwak.** Planisware publiceert geen gebruikersaantal; de franz.com-bron ("more than 100,000 customers") is terecht als verhaspeling verworpen. De schatting volgt alleen uit 650 klanten × aangenomen zetelaantallen, wat circulair is met de eveneens geschatte zetelbandbreedtes in §3.4. Correct als **[SCHATTING]** gelabeld, maar niet als cijfer te citeren | — |
| 31 | Weinig onafhankelijke publieke signalen (Capterra 5 reviews) | **Gecorrigeerd/genuanceerd.** Capterra's 5 reviews kloppen, maar zijn niet representatief: Gartner Peer Insights had er al 64 in okt. 2023, SelectHub aggregeert 80, SoftwareFinder 26, GetApp 19. De juiste stelling is: veel *gestructureerde reviewdata*, nauwelijks *ongefilterde community-discussie*. Nadeel 12 herschreven | zie #12, #27 |
| 32 | Zwakke marktpositie in bouw/infra | **Onzeker maar plausibel — bewust niet weerlegd kunnen worden.** Geen bron bevestigt óf ontkent bouwpenetratie; de conclusie rust op de afwezigheid van bouwreferenties in een verder rijke klantenlijst. Dat is een redelijk argument uit stilte, geen bewijs. Voor de kernvraag van de opdrachtgever is dit niet doorslaggevend, omdat #18 (geen IFC) los daarvan hard staat | — |

### Samenvattend oordeel

**Sterk onderbouwd en veilig te gebruiken:** het volledige FY2025-financiële blok (#22), de bedrijfshistorie (#23, #25), de klantreferenties Northrop Grumman en Gartner Peer Insights (#26, #27), het $45-startpunt voor Orchestra (#2), en — het belangrijkste voor de opdrachtgever — **de afwezigheid van IFC-ondersteuning (#18), expliciet negatief geverifieerd tegen de leverancierspagina zelf.**

**Zwakste plekken, in volgorde van risico:**
1. **Alle ITQlick-cijfers (#5)** — volumestaffel $30–40, SMB-prijs $50, implementatie $50k–$500k. Eén ontoegankelijke bron, geen tweede bevestiging. Niet als feit citeren.
2. **De CPM-detailclaims (#13, #14)** — de kernconclusie "Planisware heeft een echte netwerkmotor" leunt op één tutorialbron die niet herverifieerbaar bleek, terwijl de leverancier zelf kritiek pad en float niet noemt (#15). De conclusie is waarschijnlijk juist maar dunner onderbouwd dan de stellige toon van §2.1 suggereerde.
3. **Alle bedragen in §3.4 en de zetelminima (#9, #10, #30)** — correct als schatting gelabeld, maar het is afgeleid op afgeleid.

**Netto-effect van deze ronde:** drie inhoudelijke correcties (P6-integratie was te streng beoordeeld, OData-licentie te breed geformuleerd, "weinig publieke signalen" overdreven), twee aanscherpingen ten nadele van Planisware (leverancier noemt zelf geen kritiek pad/float; Kafka vereist 26Q1), één methodische correctie (€276k is een ondergrens door groeiende klantenbasis) en vier claims teruggezet naar onzeker (kalender per relatie, Forrester Wave, Info-Tech, Syseca-oorsprong). Geen enkele bewering bleek **onjuist**; de fouten zaten in overmoedige formulering en in bronnen die zwakker waren dan hun stelligheid deed vermoeden.
