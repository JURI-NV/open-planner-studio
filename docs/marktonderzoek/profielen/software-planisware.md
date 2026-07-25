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
| Oorsprong | Spin-off van Syseca, een dochter van Thales; de basissoftware **OPX2** werd binnen Thales ontwikkeld voor complexe meerjarige defensie-R&D | Wikipedia / Grokipedia |
| Naamswijziging product | OPX2 → Planisware Enterprise in 2009, bij versie 5 | Planisware glossary "OPX2" |
| Overname NQI | maart 2018; NQI's *Orchestra PPM* wordt *Planisware Orchestra*. NQI bediende de PPM-markt sinds 2004, had ~250 klanten (70% IT-organisaties), waaronder Essilor International, CMA CGM, ArcelorMittal | Business Wire, 27-03-2018 |
| Beursgang | april 2024, Euronext Paris, ticker **PLNW**, waardering €1,11 miljard | Wikipedia |
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
- **Kalender per relatie**: bij het openen van een link kun je naast het type en de lag ook *een kalender voor de link* zetten. Dit is een geavanceerde feature die zelfs MS Project niet heeft en die P6 wél kent — een sterk signaal dat hier een serieuze scheduler onder zit.
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
| **Planisware Orchestra** | 1 gebruiker $540/jr · 10 gebruikers $5.400/jr · 100 gebruikers $54.000/jr | Lineaire extrapolatie van $45 p.g.p.m. door de bron zelf | pricingnow.com/question/planisware-orchestra-pricing/ | 25-07-2026 |
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
| OData-toegang | Wordt apart gelicentieerd ("OData licensing" genoemd naast REST API) | planisware.com integratiepagina, 25-07-2026 |

### 3.4 Afgeleide werkelijke prijs per klant **[AFGELEID]**

Uit de FY2025-cijfers kan een reëler beeld worden gedestilleerd dan uit reviewsites:

- Totale omzet FY2025: **€198,0 mln**
- Terugkerende omzet: **€179,7 mln** (91%)
- Aantal klantorganisaties: **~650**

→ **Gemiddelde terugkerende omzet per klant ≈ €276.000 per jaar**
→ **Gemiddelde totale omzet per klant ≈ €305.000 per jaar**

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

1. **Echte netwerkplanning, geen pseudo-Gantt.** Vier relatietypen (FS/FF/SS/SF), positieve én negatieve lags, datumconstraints (SNET/FNLT), werkkalenders en — opvallend geavanceerd — **een aparte kalender per relatie**. Dat laatste kennen zelfs MS Project en veel "enterprise" werkbeheertools niet. Bron: Planisware Enterprise-tutorial (prodsens.live, 18-01-2024).

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

12. **Weinig onafhankelijke publieke signalen.** Capterra heeft slechts **5 reviews** voor Planisware Enterprise (4,1/5; ease of use 3,1; customer service 2,7) en 19 voor Orchestra (4,2/5). Een gerichte Reddit-zoektocht leverde **geen enkele substantiële discussie** op in r/projectmanagement, r/construction of vergelijkbaar. Voor een koper betekent dit: je kunt de claims van de leverancier nauwelijks crowd-sourced valideren; je bent afhankelijk van referentiebezoeken.

---

## 6. Interoperabiliteit

Dit hoofdstuk is voor de opdrachtgever (open-source, IFC-gebaseerde planner) het belangrijkste.

### 6.1 Wat aantoonbaar ondersteund wordt

| Formaat / kanaal | Status | Details |
|---|---|---|
| **MS Project XML (MSPDI)** | **Ja, bidirectioneel** | "Planisware-Microsoft Project Connector": import/export van MSP-bestanden ad hoc, via drag-and-drop. Creëert en werkt **taken, resources en kalenders** bij; detecteert wijzigingen, toevoegingen en verwijderingen automatisch. Beheerders configureren de veldmapping. Uitwisseling verloopt via "Planisware's XML file exchange" en de standaard REST API. Beschikbaar over alle producten (Orchestra, Horizon, Nova, Enterprise). Bron: planisware.com/resources/work-management-collaboration/microsoft-project-planisware-enterprise-data-integration |
| **MS Project MPP (binair)** | **Onbevestigd** | De documentatie noemt XML-uitwisseling; sommige beschrijvingen spreken van "MSP files". Er is geen bewijs van native .mpp-parsing. **[SCHATTING]** dat de connector .mpp accepteert via een MS-Project-clientconversie, niet native. |
| **Oracle Primavera P6** | **Genoemd als integratie, mechanisme onbekend** | P6 staat op de integratiepagina onder "Project Scheduling" naast MS Project en Smartsheet. Er is **geen enkele publieke bevestiging van XER- of P6-XML-ondersteuning**. **[ONBEVESTIGD]** — waarschijnlijk via REST/CSV of een partnerconnector. Voor een bouworganisatie die op XER draait is dit een hard te verifiëren punt. |
| **CSV / Excel** | **Ja** | Configureerbare import/export-interface; Planisware verwijst naar eigen documentatie "Importing From and Exporting To Office". |
| **REST API** | **Ja, open** | *"Our Planisware REST APIs use RESTful architecture to enable access to data without using the Planisware user interface."* Gepositioneerd als hét integratiekanaal. |
| **OData** | **Ja, apart gelicentieerd** | Voor BI-consumptie. Beperkingen: prestaties bij hoog datavolume; (historisch) alleen basic auth. |
| **Apache Kafka** | **Ja** | Event streaming genoemd als integratiemechanisme. |
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

- **Leader** in *The Forrester Wave™: Strategic Portfolio Management Tools, Q2 2024*.
- **Gartner Peer Insights Customers' Choice** voor Strategic Portfolio Management (2023), met de meeste 5-sterrenreviews van alle leveranciers op basis van 64 reviews (oktober 2023).
- **#1 PPM Enterprise Champion** in het Info-Tech Research Group 2022 Emotional Footprint Report.
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
