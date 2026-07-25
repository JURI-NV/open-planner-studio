# Zoho Projects — diepgaand softwareprofiel

*Marktonderzoek planningssoftware · opgesteld 25 juli 2026 · analist: Claude (software-analist)*
*Context van de opdrachtgever: bouw van een open-source, IFC 4.3-gebaseerde planner (Open Planner Studio). Dit profiel beoordeelt Zoho Projects expliciet ook op zijn waarde als CPM-planner en als interoperabiliteitspartner.*

> **Leeswijzer bij betrouwbaarheid.** Alle bedragen en feiten hebben een bronverwijzing. Waar een bewering niet hard uit een primaire bron (Zoho zelf, officiële help-documentatie) komt, staat er expliciet **[SCHATTING]** of **[ONZEKER]** bij. Zoho's eigen prijspagina rendert bedragen via JavaScript en gaf bij het ophalen geen cijfers prijs; de bedragen komen daarom overwegend uit secundaire bronnen die onderling consistent zijn. Dat is expliciet gemarkeerd.
>
> **Update na adversariële fact-check op 25-07-2026 — lees ook de sectie [Verificatie](#verificatie) onderaan.** Elke prijs- en planningsclaim is opnieuw en actief geprobeerd te weerleggen. Uitkomst: 8 beweringen bevestigd, 4 gecorrigeerd (waarvan twee substantieel: de Indiase INR-prijzen en de gebruikte wisselkoers), 2 betwist/onzeker. Eén bedrag is alsnog **primair** bevestigd: Zoho's eigen Gantt-pagina noemt "$5/user/month". Correcties staan in de betreffende paragrafen zelf gemarkeerd.

---

## 1. Wat het is

### Leverancier en eigendom

**Zoho Projects** is een SaaS-projectmanagementapplicatie van **Zoho Corporation Pvt. Ltd.**, een privaat, niet-beursgenoteerd Indiaas softwarebedrijf. Zoho is opgericht in 1996 (als AdventNet) door Sridhar Vembu en Tony Thomas; het hoofdkantoor staat formeel in Chennai/Tenkasi (Tamil Nadu, India) met een Amerikaanse vestiging in Austin, Texas. Zoho Projects zelf is gelanceerd rond 2006 en is daarmee een van de oudere producten in het Zoho-portfolio.

Kerngegevens over de moederorganisatie:

| Item | Waarde | Bron |
|---|---|---|
| Omzet FY25 | ₹12.313 crore (ca. US$1,45 mrd) netto-omzet; andere telling ₹13.543 crore incl. overige inkomsten (≈US$1,62 mrd) | Entrackr / Indian Startup News, Wikipedia (geraadpleegd 25-07-2026) |
| Nettowinst FY25 | ₹3.191 crore | Entrackr |
| Medewerkers | ca. 17.000 (2025) | Wikipedia — Zoho Corporation |
| Betalende klanten (hele Zoho-groep) | >1 miljoen betalende klanten, >150 miljoen gebruikers (ZohoDay 2026) | Futurum Group |
| Eigendom | Volledig privaat, geen VC-kapitaal, geen beursnotering | Wikipedia / Forbes |
| Leiderschap | Sridhar Vembu sinds jan-2025 Chief Scientist; Shailesh Kumar Davey Group CEO; Mani Vembu leidt Zoho.com-divisie | Wikipedia |

Het feit dát Zoho privaat, schuldenvrij en winstgevend is, is relevant voor deze markt: het verklaart waarom het bedrijf jarenlang agressief lage prijzen kan volhouden zonder de "groei-dan-prijsverhoging"-cyclus van VC-gefinancierde concurrenten. Zoho is ook uitgesproken over datasoevereiniteit en bouwt eigen datacenters — een argument dat in India, het Midden-Oosten en Europa aanslaat.

### Doelgroep en typische gebruikers

Zoho Projects richt zich op **kleine tot middelgrote organisaties** en op afdelingen binnen grotere bedrijven. De typische koper is:

- Een mkb-bedrijf van 10–250 medewerkers dat al andere Zoho-apps gebruikt (CRM, Books, Desk, People) en projectbeheer wil toevoegen zonder een tweede leverancier;
- Een dienstverlener (IT, marketing, engineering-consultancy, architectenbureau) die uren, facturabiliteit en projectvoortgang in één systeem wil;
- Een projectmanager in een niet-bouwsector die *wel* een Gantt met kritiek pad en baselines wil, maar geen budget of behoefte heeft aan Primavera P6 of MS Project.

Demografie van de installed base (6sense, tracking van publiek waarneembare tech-stacks — dit ondertelt structureel, zie §7):

| Land | Aandeel klanten |
|---|---|
| Verenigde Staten | ca. 1.266 bedrijven (46,27%) — grootste enkele land |
| India | ca. 665 bedrijven (24,31%) |
| Verenigd Koninkrijk | ca. 206 bedrijven (7,53%) |

*Cijfers herzien bij hercontrole op 25-07-2026: de live 6sense-pagina geeft nu 1.266 / 665 / 206 (eerder in dit profiel stond 1.282 / 690 / 218). 6sense herberekent doorlopend; behandel deze aantallen als een momentopname met ±5% ruis. Bron: https://6sense.com/tech/project-collaboration/zoho-projects-market-share*

Bedrijfsgrootte van de klanten volgens dezelfde bron: zwaartepunt bij 20–49 medewerkers (956) en 100–249 medewerkers (948); slechts 372 bij 0–9 medewerkers. Zoho Projects is dus in de praktijk géén solo-freelancertool maar een teamtool voor het mkb.

### Sectoren en regio's

Zoho voert eigen sectorpagina's voor onder meer bouw, IT, marketing, onderwijs en consultancy (`zoho.com/projects/construction-project-management.html`). De bouwpagina is echter vooral marketing: hij belooft documentopslag voor "bouwtekeningen, offertes en kritieke documenten", integratie met Zoho Books/CRM en AI-agents ("Zia") die materiaaltekorten voorspellen. Er staat **geen enkele verwijzing naar BIM, IFC, 4D-planning, hoeveelheden of modelgebaseerd werken** in die propositie.

Regionaal is Zoho het sterkst in **India en opkomende markten** (Zuidoost-Azië, Midden-Oosten, Latijns-Amerika, Afrika) en daarnaast in het Amerikaanse en Britse mkb. De reden is drieledig: (a) prijsniveau dat past bij lagere salarissen en kleinere IT-budgetten, (b) lokale valuta-prijszetting inclusief INR met GST, en (c) een dicht partner-/resellernetwerk in India. Zoho publiceert de UI in tientallen talen; Zoho Projects zelf ondersteunt een ruime set interfacetalen (Nederlands is beschikbaar in de Zoho-helpportal-locales). **[ONZEKER]** — het exacte aantal UI-talen van Zoho Projects is niet geverifieerd in dit onderzoek.

---

## 2. Functionaliteit en techniek — hoe "echt" is de planning?

Dit is het onderdeel waar streng geoordeeld moet worden. Veel werkbeheertools tekenen een balkenschema zonder netwerkplanning. Zoho Projects zit **boven** die categorie, maar duidelijk **onder** klassieke CPM-tools. De precieze positie:

### 2.1 Wat er wél is (en dat is meer dan bij de meeste werkbeheertools)

**Afhankelijkheidstypen — volledig.** Zoho Projects ondersteunt alle vier de klassieke relatietypen: Finish-to-Start (FS), Start-to-Start (SS), Finish-to-Finish (FF) én Start-to-Finish (SF). Dat laatste type is zeldzaam buiten echte planningstools en het feit dat Zoho het heeft, onderscheidt het van Asana, Trello, Basecamp en grotendeels ook van monday.com.
*Bron: Zoho help — "What is task dependency?"*

**Lag en lead.** Lag is gedefinieerd als "de duur waarmee een opvolger vertraagd moet worden ten opzichte van de voorganger". Lag/lead kan worden ingesteld vanuit de lijst-, Gantt- én Kanbanweergave.
*Bron: Zoho help + Topline Results (Zoho-partner), aug-2025.*

**Hard link vs. soft link.** Een expliciete keuze per relatie:
- **Hard link** — "opvolgerdata en -voltooiing worden strikt afgedwongen door de voorganger";
- **Soft link** — "opvolgers behouden een afhankelijkheid maar worden niet gedwongen te verschuiven".

Dit is functioneel een primitieve vorm van *auto-scheduled vs. manually scheduled* zoals MS Project dat kent. Het is nuttig, maar het is géén constraint-model: het is een aan/uit-schakelaar per relatie, geen datumbeperking op de taak.
*Bron: Zoho help — task dependency.*

**Automatische doorschuif van opvolgers.** Bij hard links schuiven opvolgers automatisch mee als de voorganger verschuift. Dit werkt ook via drag-and-drop in de Gantt.
*Bron: Zoho help + Zenatta (Zoho-partner) "Zoho Projects 2025 complete guide".*

**Kritiek pad.** Zoho berekent het langstlopende pad door het afhankelijkheidsnetwerk en markeert kritieke taken rood in de Gantt. Niet-kritieke taken krijgen een **slack-lijn** (stippellijn) die de toelaatbare vertraging visualiseert — dat betekent dat er wel degelijk float per taak wordt uitgerekend, niet alleen een rode markering. Meerdere gelijktijdige kritieke paden worden ondersteund: "If multiple critical paths are available in your project they will all be highlighted in red."

> **Correctie na hercontrole (25-07-2026).** De eerdere formulering "cross-project-afhankelijkheden **tellen mee** in de berekening" is te stellig. De FAQ *stelt* wel de vraag "How does dependency across projects affect the critical path?", maar het antwoord behandelt uitsluitend afhankelijkheden **binnen** een project. Dat cross-project-relaties daadwerkelijk in de kritiek-padberekening worden meegenomen, is dus **[ONZEKER]** — wat vaststaat is alleen dat cross-project-*afhankelijkheden* op Enterprise/Ultimate bestaan (primair bevestigd), niet dat ze het kritieke pad beïnvloeden.

*Bron: Zoho help FAQ "Critical Path" (versie 9-2-2024), rechtstreeks opgehaald 25-07-2026: https://help.zoho.com/portal/en/kb/projects/faqs/critical-path/articles/critical-path-9-2-2024*

**Baselines.** Een baseline wordt vastgelegd na planning en getoond als grijze balk onder elke taakbalk. Er is een baseline-variantiekolom in dagen (rood positief = vertraging, groen negatief = voor op schema). Zoho ondersteunt **meerdere baselines en het naast elkaar vergelijken van twee baselines**, plus afgeleide metrieken **End Variance** (vertraagde taken) en **Slippage** (taken die nog niet zijn begonnen maar de baseline-einddatum al zijn gepasseerd). Dit is een serieuze baseline-implementatie, beter dan bij de meeste mkb-tools.
*Bron (opgewaardeerd naar primair bij hercontrole 25-07-2026): https://www.zoho.com/projects/gantt-charts.html — bevestigt letterlijk "simultaneously compare two distinct baselines", **End Variance** ("assists in identifying delayed tasks requiring immediate attention") en **Slippage** ("tracks tasks that have yet to commence but have already exceeded the baseline's end date"). Eerder steunde deze claim alleen op de Zoho-blog via zoekindexering (HTTP 403) + Info-Tech vendor note; nu primair bevestigd.*

**Kalenders.** Er zijn instelbare bedrijfsuren, werkdagen, weekenden en feestdagenlijsten ("Date Format & Business Hours"). Belangrijker: Zoho heeft **meerdere business-kalenders** ("Business Calendar") met eigen werkdagen, pauzes en feestdagenlijsten per kalender, zodat wereldwijde teams verschillende beschikbaarheid kunnen hebben. Duur, werkuren, herinneringen en rapportages houden daar rekening mee, en niet-werkdagen worden overgeslagen bij duurberekening.
*Bron: Zoho help — Business Hour settings; Zoho blog "Organize your work better with skip weekends and holidays".*

**Werkstructuur (WBS).** Hiërarchie: project → mijlpaal (milestone) → takenlijst (tasklist) → taak → subtaak, met **tot 6 niveaus subtaken**. Er is roll-up van start-/einddatums, werkuren en geboekte uren naar bovenliggende taken, fasen en het project.
*Bron: Zoho help — Subtasks / Task List View.*

**Resource- en kostenmodel.**
- *Resource Utilization Chart*: werklastweergave per gebruiker tegen beschikbare bedrijfsuren; balken tonen onderbezetting, volle bezetting of overbelasting. Taakbalken zijn sleepbaar om te herplannen of te herverdelen vanuit de grafiek.
- *Kosten en budget*: budgetvariantie (planned vs. actual cost), urenregistratie met facturabel/niet-facturabel, taakbudgetten.
- *Earned Value Management (EVM)*: Zoho berekent automatisch Planned Value, Earned Value, Cost Variance, Schedule Variance, SPI, CPI en Forecasted Cost (typisch en atypisch). Dat is een verrassend volwassen set voor een tool van dit prijsniveau — de meeste concurrenten in het $5–$15-segment hebben geen EVM.
*Bron: Zoho — Resource Utilization Chart-pagina; Zoho help — Earned Value Management; Zoho — Key Project Management Metrics.*

**Overige planningsrelevante functies.** Blueprints (procesautomatisering met statusovergangen), workflowregels, tijdgebaseerde workflows, projectsjablonen, issue tracking, timesheets, portfolio-dashboard, Zia (AI-assistent), en sinds 2026 een MCP-server-add-on waarmee externe AI-modellen (ChatGPT, Claude, Gemini) op de data kunnen.
*Bron: Zoho pricing feature matrix; tech.co pricing review (bijgewerkt 2 apr 2026).*

### 2.2 Wat er níét is — het strenge oordeel

**Er is een netwerkplanningskern, maar het is geen volwaardige CPM-engine.** De concrete tekortkomingen ten opzichte van MS Project / Primavera P6 / Asta Powerproject:

1. **Geen constraint-model.** Er is geen "Must Start On", "Start No Earlier Than", "Finish No Later Than", "As Late As Possible" of "As Soon As Possible" per taak. De officiële documentatie over afhankelijkheden noemt constrainttypen in het geheel niet. Zonder constraints kun je geen contractuele mijlpaaldata, geen opgelegde beschikbaarheidsdata en geen ALAP-planning modelleren. Voor bouwplanningen — waar "beton mag niet vóór datum X gestort worden" en "oplevering uiterlijk datum Y" harde randvoorwaarden zijn — is dit een fundamenteel gat.
   *Bron: Zoho help — task dependency (constrainttypen ontbreken volledig); geverifieerd door gericht bevragen van de documentatie.*

2. **Geen achterwaartse pass die zichtbaar is als late dates.** Zoho toont wél slack/float per taak, maar exposeert geen kolommen voor Late Start / Late Finish / Free Float vs. Total Float. Wat er precies achter de "slack line" zit, is niet gedocumenteerd. **[SCHATTING]** — vermoedelijk een total-float-berekening, maar dit is niet publiek gespecificeerd en dus niet auditbaar. Voor forensische planningsanalyse (claims, vertragingsanalyse volgens SCL-protocol) is een niet-gedocumenteerde float-berekening onbruikbaar.

3. **Geen resource-driven scheduling en geen resource levelling.** De Resource Utilization Chart is een *rapportage*: hij toont overbezetting, maar herplant niet. Er is geen algoritme dat taken automatisch verschuift op basis van resourcebeschikbaarheid, geen levelling-prioriteiten, geen resource-kalenders die de taakduur bepalen. De relatie duur ↔ werkuren ↔ toegewezen personen is niet als effort-driven model geïmplementeerd; gebruikers melden in de community dat "work effort erg verschilt van duration" en dat Zoho standaard rekent met `werkuren per dag (9) × aantal dagen` — een lineaire benadering, geen echte inspanningsverdeling.
   *Bron: Zoho community — "Is there an efficient way to enter tasks with Work Hours?"; Resource Allocation Report-topics.*

4. **Kritiek pad zit achter de Enterprise-plan-muur.** De FAQ is expliciet: "Critical path feature is available in the user based Enterprise plan of Zoho Projects." Hetzelfde geldt voor baselines en het portfolio-dashboard. Op Premium ($5/gebruiker/maand) heb je dus een Gantt met afhankelijkheden **maar geen kritiek pad en geen baseline** — dan is het wél "een balkenschema zonder netwerkanalyse". De prijs voor echte netwerkplanning is Enterprise, dus $9–$10 per gebruiker per maand.
   *Bron: Zoho help FAQ Critical Path; Zoho prijspagina feature-matrix.*

5. **Geen kalender per taak of per resource in de planningsberekening.** Er zijn meerdere business-kalenders, maar het is niet gedocumenteerd of een individuele taak aan een specifieke kalender kan worden gekoppeld zoals in P6 (waar elke activiteit zijn eigen kalender heeft — 5-daags, 6-daags, 24/7 voor uithardingstijd). **[ONZEKER]** — niet definitief vastgesteld; de documentatie beschrijft kalenders op portal-/gebruikersniveau, niet op activiteitniveau.

6. **Geen ondersteuning voor bouwspecifieke planningsconcepten.** Geen locatiegebaseerde planning (Line-of-Balance / flowline), geen takt-planning, geen hoeveelheden × productiviteit → duur, geen calendar-driven curing/lead times, geen weersonderbrekingen, geen retained logic vs. progress override, geen out-of-sequence-afhandeling. Dit zijn precies de dingen waar bouwplanners op selecteren.

7. **Geen offline/desktopmodus.** Zoho Projects is pure SaaS. Er is geen desktopclient, geen offline werken. Reviews noemen "minimale offline toegang" expliciet als beperking. Voor bouwlocaties met slechte connectiviteit is dat relevant.
   *Bron: Capterra-reviewsamenvatting; invensislearning review 2026.*

### 2.3 Platform en schaalbaarheid

- **Architectuur**: multi-tenant SaaS, browser + native iOS/Android-apps. Datacenters in meerdere regio's (US, EU, IN, AU, JP, CA, SA — Zoho publiceert regionale datacenters; **[ONZEKER]** exacte lijst niet geverifieerd in dit onderzoek).
- **Harde taaklimiet**: Zoho publiceert **geen** maximum aantal taken per project.
  *Bron: Techjockey Q&A "How many tasks can I add to Zoho Projects?" — antwoord: geen vast limiet.*
- **Praktische limiet**: hier is het beeld minder rooskleurig. In de officiële Zoho-community loopt een langlopende thread "Zoho Projects Very Slow" waarin gebruikers melden dat de tool "langzamer wordt en soms helemaal niet reageert", en expliciet: "het lijkt erger te worden naarmate we meer projecten/taken toevoegen". Reviewbronnen melden dat "Gantt-drag-and-drop traag aanvoelt bij grote projecten" en dat er "prestatievertraging bij grote projecten" optreedt.
  *Bron: help.zoho.com community "Zoho Projects Very Slow"; Capterra-reviewsamenvatting; softwarefinder/thedigitalprojectmanager reviews 2026.*
- **Realistisch schaalplafond**: **[SCHATTING — expliciet gemarkeerd]** op basis van de gerapporteerde klachten en het ontbreken van een gepubliceerde limiet schat ik dat Zoho Projects comfortabel werkt tot circa **500–1.500 taken per project** en dat de Gantt-interactie boven ongeveer **2.000–3.000 taken** merkbaar onprettig wordt. Ter vergelijking: Primavera P6-schema's van 10.000–100.000 activiteiten zijn in de bouw normaal. Deze schatting is niet door benchmarking geverifieerd en Zoho publiceert geen prestatiecijfers.
- **Subtaakdiepte**: maximaal 6 niveaus subtaken onder een taak. Reviewers noemen desondanks dat "subtaken erg plat zijn, niet zo hiërarchisch als nodig" — dat wijst erop dat de diepte er technisch is maar in de UI slecht bruikbaar.
  *Bron: Zoho help Subtasks; Capterra-reviews.*
- **API-limiet**: 100 requests per 2 minuten; bij overschrijding 30 minuten blokkade. Dat is een **strakke** limiet voor bulk-migratie of synchronisatie van grote schema's.
  *Bron: Zoho community "Zoho Projects API 100 requests/2 min. Limit"; Zoho API-docs.*
- **Workflow-executielimieten per maand**: Free 50, Premium 5.000, Enterprise 50.000, Ultimate 500.000.
  *Bron: Zoho prijspagina feature-matrix (geraadpleegd 25-07-2026).*

---

## 3. Prijzen

> **Belangrijke methodologische opmerking.** `zoho.com/projects/pricing.html` toont de bedragen via client-side JavaScript; bij het ophalen van de pagina op 25-07-2026 werden wél de plannamen, functie-matrix en limieten geleverd, maar **geen bedragen**. De onderstaande bedragen komen daarom uit meerdere secundaire bronnen die onderling consistent zijn (tech.co, costbench, comparedge, thedigitalprojectmanager, invensislearning). Ik markeer ze als **bevestigd-secundair**, niet als primair geverifieerd.

### 3.1 Lijstprijzen wereldwijd (USD), geraadpleegd 25 juli 2026

| Plan | Maandelijks (per gebruiker/mnd) | Jaarlijks (per gebruiker/mnd, jaarlijks gefactureerd) | Jaarprijs per gebruiker | Min. zetels |
|---|---|---|---|---|
| **Free** | $0 | $0 | $0 | max. 5 gebruikers |
| **Premium** | $5 | $4 | $48 | geen minimum |
| **Enterprise** | $10 | $9 | $108 | geen minimum |
| **Ultimate** | $15 **[BETWIST]** | $14 | $168 | geen minimum |

**Bronsituatie na hercontrole op 25-07-2026 (vijf onafhankelijk opgehaalde bronnen):**

- **Jaarlijkse bedragen $4 / $9 / $14 zijn stevig bevestigd** — vier onderling onafhankelijke bronnen geven exact dezelfde reeks: tech.co (bijgewerkt 02-04-2026), GetApp, Software Advice en comparedge; costbench geeft dezelfde reeks als jaarprijzen $48 / $108 / $168.
- **Maandelijkse bedragen $5 en $10** (Premium/Enterprise) worden bevestigd door costbench én comparedge.
- **Nieuw primair bewijs voor het instapbedrag:** Zoho's eigen Gantt-productpagina noemt in lopende tekst **"$5/user/month"** (https://www.zoho.com/projects/gantt-charts.html, opgehaald 25-07-2026). Dat is het enige bedrag dat wél rechtstreeks van Zoho komt en het bevestigt Premium-maandelijks = $5. De eerdere kwalificatie "geen enkel bedrag primair verifieerbaar" is daarmee te somber en is hier gecorrigeerd.
- **Ultimate maandelijks is betwist en dus [ONZEKER]:** costbench geeft $15/mnd → $14 jaarlijks (7% korting); **comparedge geeft expliciet $14 maandelijks én $14 jaarlijks, dus géén jaarkorting op Ultimate**. tech.co, GetApp en Software Advice noemen alleen $14 zonder de billing-modus eenduidig te scheiden. Er is dus geen meerderheid voor $15 — behandel de Ultimate-maandprijs als $14–$15 met onbekende jaarkorting.
- **Waarschuwing bij zwakke aggregators:** softwaresuggest.com geeft nog steeds het verouderde Free-plan (3 gebruikers / 2 projecten) en labelt Ultimate $14 als "monthly". Die bron is aantoonbaar niet bijgewerkt en is daarom niet meegeteld.

*Bronnen: https://www.zoho.com/projects/gantt-charts.html (primair, "$5/user/month"); https://tech.co/project-management-software/zoho-projects-pricing-review; https://www.getapp.com/project-management-planning-software/a/zoho-projects/pricing/; https://www.softwareadvice.com/project-management/zoho-projects-profile/; https://comparedge.com/tools/zoho-projects/pricing; https://costbench.com/software/project-management/zoho-projects/ — alle opgehaald 25-07-2026.*

**Jaarkorting — gecorrigeerd.** De korting is *niet* uniform: 20% op Premium ($5→$4), 10% op Enterprise ($10→$9) en 0–7% op Ultimate (betwist). Zoho's eigen claim **"Yearly – Save over 15%"** (letterlijk op zoho.com/projects/zohoprojects-pricing.html, geverifieerd 25-07-2026) klopt daarmee **alleen voor Premium**. Voor Enterprise en Ultimate is die marketingclaim feitelijk onjuist. De eerdere formulering "circa 17–20% voor Premium" is bijgesteld naar exact 20%.

**Minimum zetels — bevestigd, maar op afwezigheid van bewijs.** Geen van de geraadpleegde bronnen (Zoho's eigen prijspagina + FAQ, Techjockey, comparedge) noemt een minimum aantal zetels op de betaalde plannen; comparedge stelt expliciet "no explicit minimum seats". Het enige minimum dat Zoho publiceert is een **opslagminimum van 150 GB per organisatie op Ultimate**, geen zetelminimum. Let op: dit blijft een negatieve bewering — bevestigd voor zover publiek vaststelbaar.

**Belasting.** Zoho rekent lokale btw/VAT/GST bovenop alle genoemde bedragen. Voor Nederland betekent dat 21% btw op de listprijs. *Bron: tech.co pricing review, apr-2026.*

### 3.2 India / INR

> **Deze paragraaf is bij hercontrole op 25-07-2026 op drie punten gecorrigeerd: de bedragen waren aan de verkeerde facturatiemodus gekoppeld, "inclusief GST" was onjuist, en de gebruikte wisselkoers was ruim 10% mis.**

| Plan | Maandelijks gefactureerd (INR/gebruiker/mnd) | Jaarlijks gefactureerd (INR/gebruiker/mnd) | Jaarprijs (INR, excl. GST) |
|---|---|---|---|
| Premium | ₹350 | **₹280** | ₹3.360 (₹3.965 incl. 18% GST) |
| Enterprise | ₹700 | **₹630** | ₹7.560 |
| Ultimate | ca. ₹1.050 **[ONZEKER]** | **₹980** | ₹11.760 |

*Bron: Techjockey, rechtstreeks opgehaald 25-07-2026: https://www.techjockey.com/detail/zoho-projects — geeft ₹280 / ₹630 / ₹980 per gebruiker/maand en vermeldt expliciet "exclusive of all taxes"; de jaarprijs Premium wordt gegeven als ₹3.360 excl. GST → ₹3.965 incl. 18% GST (rekenkundig sluitend). itforsme.in gaf bij hercontrole HTTP 403 en is dus niet verifieerbaar.*

**Correctie 1 — verkeerde facturatiemodus.** ₹350 en ₹700 zijn de **maandelijks gefactureerde** tarieven, niet de tarieven waarmee je tegen de jaarprijs moet vergelijken. De jaarlijks gefactureerde tarieven zijn ₹280 en ₹630 — precies dezelfde 20%/10%-kortingsstructuur als in USD, wat de toewijzing bevestigt.

**Correctie 2 — GST.** Techjockey vermeldt de bedragen expliciet als **exclusief** GST, niet inclusief. Voor een Indiase koper komt er dus nog 18% GST bovenop (₹280 → ₹330,40 effectief). De eerdere bewering "inclusief GST" was onjuist en versterkte het prijsvoordeel kunstmatig.

**Correctie 3 — wisselkoers.** De gebruikte ₹87/USD is fout. Op 25-07-2026 is de koers **₹96,61/USD**, onafhankelijk bevestigd door twee FX-API's (open.er-api.com en exchangerate-api.com, beide met datumstempel 25-07-2026). Herberekening:

| Vergelijking | INR-prijs | In USD (₹96,61) | USD-lijstprijs | Verschil |
|---|---|---|---|---|
| Premium, jaarlijks | ₹280 | ≈ $2,90 | $4 | **≈ 28% goedkoper** |
| Enterprise, jaarlijks | ₹630 | ≈ $6,52 | $9 | **≈ 28% goedkoper** |
| Premium, maandelijks | ₹350 | ≈ $3,62 | $5 | ≈ 28% goedkoper |
| Enterprise, maandelijks | ₹700 | ≈ $7,25 | $10 | ≈ 28% goedkoper |

**De conclusie draait dus de goede kant op, maar de eerdere "10% goedkoper" was fors te laag: India ligt consistent ~25–30% onder de dollarprijs** (excl. GST; incl. 18% GST nog altijd ~15% onder). De kern van het argument — koopkrachtdifferentiatie als motor achter de Indiase positie — blijft staan en wordt zelfs sterker.

### 3.3 Gratis tier — precieze grenzen

| Item | Free-plan |
|---|---|
| Gebruikers | max. **5** |
| Projecten | **3** |
| Opslag | **5 GB** |
| Workflow-executies | 50 per maand |
| Wel inbegrepen | subtaken, whiteboard, iOS/Android-apps, basis-Gantt |
| **Niet** inbegrepen | **taakafhankelijkheden**, projectsjablonen, aangepaste velden, workload-/werklastrapporten, issue tracking, alle AI-/Zia-functies, kritiek pad, baselines |

*Bron: zoho.com/projects/pricing.html feature-matrix (geraadpleegd 25-07-2026) + tech.co (apr-2026).*

> **Hercontrole 25-07-2026: volledig primair bevestigd.** Een tweede, onafhankelijke ophaling van zowel `zoho.com/projects/pricing.html` als `zoho.com/projects/zohoprojects-pricing.html` reproduceert exact: Free = 5 gebruikers, 3 projecten, 5 GB, 50 workflow-executies/maand, **geen taakafhankelijkheden**, geen kritiek pad, geen baseline. Ook alle plangrenzen in §3.4 (opslag 5/100/120/150 GB, sjablonen 20/30/50, read-only 10/100, workflow-executies 50/5.000/50.000/500.000) komen letterlijk uit de primaire feature-matrix. Let op: verouderde aggregators (softwaresuggest) noemen nog het oude Free-plan van 3 gebruikers/2 projecten — dat is achterhaald.

**Kritisch punt:** het Free-plan heeft **geen afhankelijkheden**. Een Gantt zonder relaties is per definitie een balkenschema zonder netwerkplanning. Het gratis plan is dus voor planningsdoeleinden waardeloos — het is een lokmiddel.

### 3.4 Wat zit achter welke muur (planningsrelevant)

| Functie | Free | Premium | Enterprise | Ultimate |
|---|---|---|---|---|
| Taakafhankelijkheden | ✗ | binnen project | over projecten heen | over projecten heen |
| **Kritiek pad** | ✗ | **✗** | ✓ | ✓ |
| **Baseline** | ✗ | **✗** | ✓ | ✓ |
| Portfolio-dashboard | ✗ | ✗ | ✓ | ✓ |
| Task Blueprints | ✗ | ✓ | ✓ | ✓ |
| Read-only gebruikers | — | — | 10 | 100 |
| Opslag | 5 GB | 100 GB | 120 GB | 150+ GB |
| Workflow-executies/mnd | 50 | 5.000 | 50.000 | 500.000 |
| Aangepaste sjablonen | — | 20 | 30 | 50 |

*Bron: zoho.com/projects/pricing.html + zohoprojects-pricing.html feature-matrix (geraadpleegd 25-07-2026); tech.co voor sjabloon- en opslagaantallen.*

**Effectieve instapprijs voor échte CPM-planning: $9/gebruiker/maand jaarlijks (Enterprise).** Alles daaronder is werkbeheer met balken.

### 3.5 Add-ons

| Add-on | Prijs | Opmerking |
|---|---|---|
| **Lite User** | ca. **$5/gebruiker/maand** **[ONZEKER — niet op Zoho's prijspagina]** | Beperkte toegang: bekijken van Taken, Bugs, Fasen + toevoegen van timelogs/timesheets. Alleen op Ultimate. |
| **Resources (equipment)** | **niet publiek geprijsd** | Materieel/uitrusting toevoegen en volgen. Alleen op Enterprise+. Prijs op aanvraag. |
| **Read-only gebruikers** | inbegrepen (10 op Enterprise, 100 op Ultimate) | — |
| **Extra opslag** | niet publiek geprijsd **[ONZEKER]** | — |
| **MCP Server** | niet publiek geprijsd **[ONZEKER]** | Nieuw in 2026; koppelt externe AI-modellen (ChatGPT, Claude, Gemini) aan de projectdata. |
| **Gastentoegang** | tegen meerprijs, alleen hogere tiers | *Bron: tech.co, apr-2026* |

*Bronnen: zoho.com/projects/zohoprojects-pricing.html (noemt Resources en Lite User als add-on zonder prijs); zoekresultaten via thedigitalprojectmanager/zenatta voor het Lite-bedrag; tech.co voor MCP Server en gastentoegang.*

**Dit is een reëel nadeel:** twee planningsrelevante add-ons (materieel-/equipmenttracking en Lite Users) staan niet openbaar geprijsd. Voor een bouwbedrijf dat materieel wil plannen is "prijs op aanvraag" precies de post die de TCO onvoorspelbaar maakt.

### 3.6 Bundels

- **Zoho Projects Plus** — bundel van Zoho Projects + Sprints + Analytics + WorkDrive + Notebook. Prijs staat niet op de bundelpagina (ook JS-gerenderd); alleen "per user/month billed annually" met valutakeuze USD/INR/EUR/GBP. **[ONZEKER — prijs niet vastgesteld]**. *Bron: zoho.com/projectsplus/pricing.html, geraadpleegd 25-07-2026.*
- **Zoho One** — de hele Zoho-suite (45+ apps incl. Projects). Prijsindicatie **$37–$45/gebruiker/maand** afhankelijk van "all employee"- vs. "flexible user"-model. **[SCHATTING op basis van secundaire bronnen; niet primair geverifieerd]**. *Bron: zenatta.com Zoho Pricing Guide 2026; houseblend.io Zoho One-prijsmodellen.*

Voor organisaties die meerdere Zoho-apps gebruiken is Zoho One vaak goedkoper dan losse abonnementen — dit is Zoho's belangrijkste lock-in-mechanisme en tegelijk zijn sterkste prijsargument.

### 3.7 Enterprise-staffels en contractrisico's

Zoho publiceert **geen volumestaffels**: de prijs per gebruiker is vlak, ongeacht 10 of 1.000 zetels. Grote deals worden via partners/direct sales onderhandeld **[SCHATTING — gebruikelijk in de markt, niet gedocumenteerd voor Zoho Projects specifiek]**.

Twee gerapporteerde commerciële klachten:
- **Automatische verlenging zonder eenvoudige opzegmogelijkheid** — gebruikers melden moeite om de opzegfunctie te vinden, plus een no-refund-beleid;
- **Prijsverhogingen tot 48% bij verlenging zonder onderhandelingsruimte**.

*Bron: costbench.com/software/project-management/zoho-projects/ (opnieuw opgehaald 25-07-2026). De aggregatormetadata is bij hercontrole bevestigd: n=110 geverifieerde aankopen, mediane contractwaarde $372/jaar, "last verified 15 July 2026", eigen betrouwbaarheidslabel "high (5 sources, 95% confidence)". Costbench voegt daaraan toe: auto-renewal als "high severity" (o.a. één melding van $77 na een verwijderingsverzoek), een expliciet no-refund-beleid en minstens één gedocumenteerd geval van dubbele facturering over meerdere Zoho-producten.*

> **⚠ Tegenbewijs uit primaire bron — deze klachten blijven [ONZEKER] en zijn nu bovendien *betwist*.** Zoho's eigen prijs-FAQ stelt letterlijk: **"You may cancel your account any time you want. No strings attached!"** (geverifieerd op https://www.zoho.com/projects/zohoprojects-pricing.html, 25-07-2026), plus "No credit card required" bij aanmelden en vrij up-/downgraden. Er staat dus een expliciete leverancierstoezegging tegenover geaggregeerde gebruikersklachten. Costbench is bovendien een commerciële prijsaggregator zonder controleerbare methodologie: de "110 geverifieerde aankopen" en de 48%-verhoging zijn **niet te reproduceren** en niet door een tweede onafhankelijke bron bevestigd. Behandel de 48%-claim als een **onbevestigde signaalwaarde**, niet als feit, en gebruik hem niet als beslisargument zonder eigen navraag bij Zoho of bij referentieklanten.

---

## 4. VOORDELEN (onderbouwd)

1. **Extreem lage prijs voor de geleverde planningsdiepte.** Voor $9/gebruiker/maand (Enterprise, jaarlijks) krijg je vier afhankelijkheidstypen, lag/lead, kritiek pad, meerdere baselines met variantieanalyse, EVM en resourceutilisatie. MS Project Plan 3 kost een veelvoud; Primavera P6 nog meer. G2-reviewers noemen "value for money" in 82% van de positieve reviews. *Bron: G2-reviewsamenvatting; Zoho prijspagina.*

2. **Alle vier de relatietypen plus lag — geen half werk.** FS, SS, FF én SF met lag/lead is meer dan Asana, Trello, Basecamp, Notion en ClickUp standaard bieden. SF is zelfs in professionele tools weinig gebruikt maar hier aanwezig. Dit maakt echte netwerklogica mogelijk. *Bron: Zoho help — task dependency.*

3. **Serieuze baseline-implementatie met End Variance en Slippage.** Twee baselines naast elkaar vergelijken, per-taak variantie in dagen, en een aparte metriek voor taken die nog niet zijn gestart maar de baseline-einddatum al passeerden. Dat is verder dan de meeste concurrenten in dit prijssegment gaan. *Bron: Zoho blog + Info-Tech vendor note.*

4. **Earned Value Management out-of-the-box.** PV, EV, CV, SV, SPI, CPI en forecasted cost (typisch/atypisch) worden automatisch berekend. In het $5–$15-segment is dit vrijwel uniek; EVM is normaal een enterprise-PPM-functie. *Bron: Zoho help — Earned Value Management.*

5. **Meerdere business-kalenders met feestdagen, werkdagen en pauzes.** Duur, werkuren, herinneringen en rapportages houden rekening met echte beschikbaarheid; weekenden en feestdagen worden overgeslagen bij duurberekening. Voor internationale teams met verschillende feestdagenkalenders is dit direct bruikbaar. *Bron: Zoho help Business Hour settings; Zoho blog skip weekends and holidays.*

6. **Cross-project-afhankelijkheden** — *afgezwakt na hercontrole.* Op Enterprise/Ultimate kun je taken over projectgrenzen heen koppelen; dat is primair bevestigd in de help over taakafhankelijkheid ("Dependency across projects: Enterprise & Ultimate"). Dát die relaties ook **meetellen in de kritiek-padberekening** is echter **[ONZEKER]**: de FAQ stelt de vraag wel, maar beantwoordt alleen het geval binnen één project. De eerdere claim van programma-niveau-kritiek-pad-logica is niet houdbaar op het beschikbare bewijs. *Bron: https://help.zoho.com/portal/en/kb/projects/tasks/tasks/task-dependencies/articles/task-dependency + FAQ Critical Path, beide opgehaald 25-07-2026.*

7. **Diepe integratie met het Zoho-ecosysteem.** Naadloze koppeling met Zoho CRM, Books, Desk, People, Analytics, WorkDrive, Invoice. 68% van de G2-reviewers die andere Zoho-apps gebruiken noemen dit expliciet als hoofdvoordeel. Voor een organisatie die al op Zoho draait, is projectbeheer feitelijk een aanvinkvakje. *Bron: G2-reviewsamenvatting.*

8. **Snelle time-to-value.** Reviews melden dat teams binnen een dag draaien dankzij begeleide onboarding en projectsjablonen, met de meeste initiële setup en gebruikersuitnodigingen binnen een uur. Vergelijk dat met P6-implementaties van weken tot maanden. *Bron: G2-reviewsamenvatting.*

9. **Financieel stabiele, onafhankelijke leverancier.** Zoho is privaat, schuldenvrij, winstgevend (₹3.191 crore winst FY25) en heeft geen exit-druk van investeerders. Het risico dat het product wordt verkocht, opgeslokt of abrupt duurder wordt is structureel lager dan bij VC-gefinancierde concurrenten — al blijft het verlengingsprijsrisico bestaan (zie §3.7). *Bron: Entrackr FY25-cijfers; Wikipedia.*

10. **Goede reviewscores over de breedte.** Capterra 4,5/5 (869 reviews), G2 4,3/5 (300+ reviews), Gartner Peer Insights 306 reviews in de PPM-categorie. Dat is een consistente, brede en overwegend positieve basis — geen kunstmatig opgepompte niche-score. *Bron: Capterra, G2, Gartner Peer Insights (geraadpleegd 25-07-2026).*

---

## 5. NADELEN (eerlijk, uit reviews en fora)

1. **Kritiek pad en baseline zitten achter de Enterprise-muur — Premium is planningstechnisch een lege huls.** Op het $4–$5-plan heb je afhankelijkheden binnen een project, maar geen kritiek pad, geen baseline en geen portfolio-dashboard. De "prijsagressieve" positionering vanaf $4 is daarmee misleidend voor wie echt wil plannen: de reële instapprijs is $9. En het Free-plan heeft zelfs *helemaal geen* afhankelijkheden. *Bron: Zoho prijspagina feature-matrix + help FAQ Critical Path.*

2. **Geen constraint-model.** Geen "Must Start On", "Finish No Later Than", "As Late As Possible". Contractmijlpalen, opgelegde data en achterwaartse planning zijn niet modelleerbaar. Voor bouw-, infra- en offshoreplanningen is dit een blokkerend gebrek. *Bron: afwezigheid in Zoho help — task dependency; geverifieerd door gerichte bevraging van de documentatie.*

3. **Geen resource levelling of effort-driven scheduling.** De Resource Utilization Chart rapporteert overbezetting maar herplant niet. Duur wordt lineair berekend (uren/dag × dagen), niet uit inspanning en beschikbaarheid. Community-topics bevestigen de verwarring tussen "work effort" en "duration". Het utilisatierapport laat bovendien Client Users weg. *Bron: Zoho community "Is there an efficient way to enter tasks with Work Hours?"; "Resource Allocation Report does not include Client Users".*

4. **Prestatieproblemen bij groei — structureel, niet incidenteel.** De officiële Zoho-community bevat een langlopende thread ("Zoho Projects Very Slow") waarin gebruikers melden dat de tool trager wordt en soms niet reageert, *erger naarmate er meer projecten en taken bijkomen*. Reviewbronnen bevestigen sluggish Gantt-drag-and-drop bij grote projecten. Voor een planner met duizenden activiteiten is dit diskwalificerend. *Bron: help.zoho.com community "Zoho Projects Very Slow"; Capterra- en thedigitalprojectmanager-reviews 2026.*

5. **Gedateerde, drukke en steile UI.** Terugkerend in reviews: "de UI is wat gedateerd, dus het is een beetje onhandig bij het toewijzen van subtaken of in grotere projecten"; "in het begin voelt de interface overvol"; "het was ECHT moeilijk om teamleden te trainen om dingen in de software te vinden"; "de interface was onhandig". Zoho Projects verliest hier duidelijk van Asana en monday.com. *Bron: Capterra-reviews (869 reviews, 4,5/5); G2.*

6. **Zwakke mobiele app.** Consistent genoemd op zowel G2 als Capterra: "de mobiele applicatie is niet zo responsief of functierijk als de desktopversie, wat de productiviteit onderweg beperkt". Voor bouwplaatsgebruik — waar mobiel de primaire modus is — is dat een reëel probleem. *Bron: G2- en Capterra-reviewsamenvattingen.*

7. **Export verliest hiërarchie — een concreet, gedocumenteerd datadefect.** De takenlijst geëxporteerd naar .xls of .csv **behoudt de taakhiërarchie niet**, en de Gantt geëxporteerd naar .pdf **verliest één of twee subtaakniveaus**, waarbij verschillende niveaus op hetzelfde niveau worden getoond. Voor rapportage naar opdrachtgevers en voor migratie naar een andere tool is dit ernstig. *Bron: help.zoho.com community "How to move dates and how to export tasks keeping several task levels/hierarchy".*

8. **Zeer strakke API-limiet.** 100 requests per 2 minuten, met 30 minuten blokkade bij overschrijding. Dat maakt bulk-import/export van een groot schema of realtime-synchronisatie met een externe planner praktisch onwerkbaar zonder zware batching en wachttijden. *Bron: Zoho community + API-docs.*

9. **Add-onprijzen niet transparant.** Materieel-/equipmenttracking ("Resources") en de opslag-add-ons staan niet openbaar geprijsd; Lite Users staan alleen via derden geprijsd (~$5). TCO is daarmee niet vooraf te bepalen. Bijkomend: gerapporteerde automatische verlenging zonder eenvoudige opzegging, no-refund-beleid en verlengingsverhogingen tot 48%. *Bron: zoho.com/projects/zohoprojects-pricing.html (add-ons zonder prijs); costbench.com (verlengings-/opzegklachten — secundaire bron, **[ONZEKER]**).*

10. **Zwak buiten het Zoho-ecosysteem, en geen offline modus.** Reviews noemen "integratieproblemen met niet-Zoho-apps" en "minimale offline toegang". Zoho Projects is een uitstekende tweede app in een Zoho-huis en een middelmatige eerste app in een Microsoft- of Google-huis. *Bron: invensislearning review 2026; Capterra.*

11. **Beperkte marktaanwezigheid in de bouwsector — geen ecosysteem, geen normering.** Er is geen bouwspecifieke community, geen SCL-conforme vertragingsanalyse, geen certificering, geen planners-arbeidsmarkt die de tool kent. Waar P6- en MS Project-planners overal te vinden zijn, is een "Zoho Projects-planner" geen bestaand beroepsprofiel. **[SCHATTING op basis van afwezigheid van bewijs, niet op basis van bewijs van afwezigheid.]**

---

## 6. Interoperabiliteit — extra kritisch, gezien het IFC-doel van de opdrachtgever

### 6.1 Overzicht per formaat

| Formaat | Import | Export | Oordeel |
|---|---|---|---|
| **MPP (Microsoft Project)** | ✓ — MPP/MPX, MS Project 2003–2016 | **✗** | Eenrichtingsverkeer. Zoho documenteert alleen import; er is geen MPP-export gedocumenteerd. Community-vragen over "terug naar MS Project" blijven onbeantwoord. |
| **MPX** | ✓ | ✗ | Zelfde als MPP. Community meldt importfouten met MPX uit OmniPlan ("niet herkend door Zoho"). |
| **MSPDI / MS Project XML** | **niet gedocumenteerd** | **niet gedocumenteerd** | **[ONZEKER]** — geen bewijs gevonden dat dit wordt ondersteund. Aangenomen: niet ondersteund. |
| **XER (Primavera P6)** | **✗** | **✗** | Geen enkele indicatie van XER-ondersteuning. Diskwalificerend voor de bouwsector. |
| **P6 XML** | **✗** | **✗** | Idem. |
| **CSV** | ✓ | ✓ (maar **zonder hiërarchie**) | Import van taken werkt; export verliest de WBS-structuur. |
| **XLSX** | ✓ **[ONZEKER — importzijde niet expliciet bevestigd]** | ✓ (zonder hiërarchie) | — |
| **PDF** | n.v.t. | ✓ — Gantt, kalender, dashboards, rapporten (verliest 1–2 subtaakniveaus) | Alleen presentatie. |
| **IFC 4.3 / IfcWorkSchedule / IfcTask** | **✗** | **✗** | **Volledig afwezig. Geen enkele verwijzing naar IFC, BIM of buildingSMART in productdocumentatie of bouwmarketing.** |
| **BCF, IDS, glTF, 4D-koppeling** | ✗ | ✗ | Idem. |
| **REST API v3** | ✓ | ✓ | JSON-only, ISO-datums, OAuth. Rate limit 100 req/2 min. Legacy pre-v3 endpoints uitgezet per 31-12-2025. |
| **Webhooks** | ✓ | ✓ | Draaien op de v3-architectuur. |

*Bronnen: help.zoho.com/portal/en/kb/projects/import-users/import-from-mpp/articles/import-microsoft-projects-mpp-mpx-files; zoho.com/blog/projects/zoho-projects-export-your-project-data-as-csvxls-and-more.html; help.zoho.com community "MPP/MPX import failure", "How can we export a project in Zoho?", "How to move dates and how to export tasks keeping several task levels/hierarchy"; projects.zoho.com/api-docs; Ascent Business / Goldstar IT over de v3-migratiedeadline.*

### 6.2 Wat dit betekent

**Zoho Projects is een interoperabiliteits-eenrichtingsstraat.** Je kunt erin, je komt er slecht uit. MPP komt binnen; er gaat geen MPP uit. XER en P6 XML bestaan niet in het vocabulaire. Het enige uitgaande gestructureerde pad is CSV/XLSX — en dat verliest de hiërarchie, dus je verliest de WBS. Wie een schema uit Zoho Projects wil overzetten naar MS Project of P6, moet handmatig herstructureren of via de API scripten (met een limiet van 100 calls per 2 minuten).

**Voor een IFC-gebaseerde planner is Zoho Projects geen partner en geen concurrent op inhoud.**

- Zoho heeft **nul** IFC-ondersteuning. Geen `IfcWorkSchedule`, geen `IfcTask`, geen `IfcTaskTime`, geen `IfcRelSequence`, geen koppeling tussen planningsactiviteiten en bouwelementen. De IFC-datastructuur — waarin een taak via `IfcRelAssignsToProcess` aan producten hangt en `IfcRelSequence` de relatietypen met lag draagt — heeft geen equivalent in het Zoho-datamodel.
- Zoho's bouwpropositie is een documentbibliotheek plus AI-samenvattingen, geen modelgebaseerde planning. Er is geen 4D, geen koppeling met hoeveelheden, geen elementgebaseerde voortgang.
- **Praktische conclusie voor Open Planner Studio:** een integratie met Zoho Projects zou alleen via de REST API v3 kunnen (taken, relaties, datums, toewijzingen als generieke velden), waarbij de IFC-semantiek — welke taak welk bouwelement betreft — volledig verloren gaat. Zoho zou hooguit dienen als *downstream* uitvoerings-/samenwerkingslaag voor teams die geen model gebruiken, nooit als *upstream* planningsbron. Een `IfcRelSequence` met `SequenceType` en `TimeLag` kan wél naar Zoho's dependency+lag-model worden geschreven (de vier relatietypen matchen 1-op-1), maar terug lezen levert geen IFC op.
- De API-rate-limit van 100 requests per 2 minuten maakt zelfs die eenrichtingsschrijfactie traag: een schema van 1.000 taken plus 1.500 relaties kost bij naïeve implementatie **[SCHATTING]** ruim een uur, tenzij de v3-API bulk-endpoints heeft — dat is in dit onderzoek niet vastgesteld **[ONZEKER]**.

**Positief te noemen:** Zoho Projects heeft wél een goed gedocumenteerde, moderne REST-API (v3, JSON, ISO-datums, OAuth), webhooks, en sinds 2026 een MCP-server-add-on waarmee AI-modellen direct op de projectdata kunnen. Dat is beter dan de API-situatie bij menige klassieke planningstool. Het probleem is niet de API-kwaliteit maar het ontbrekende domeinmodel.

---

## 7. Marktpositie

### 7.1 Waar sterk, en waarom

**Sterk in:**
- **India en Zuid-Azië** — thuismarkt, INR-prijszetting onder de dollarprijs, dicht partnernetwerk, GST-conforme facturering, Indiase datacenters. 24,31% van de traceerbare klantenbasis zit in India tegen 46,27% in de VS (herbevestigd 25-07-2026) — voor een Amerikaans-gedomineerde SaaS-markt is een kwart India uitzonderlijk hoog. *Bron: 6sense.*
- **Opkomende markten** (Zuidoost-Azië, Midden-Oosten, Afrika, Latijns-Amerika) — dezelfde prijs- en soevereiniteitslogica **[SCHATTING — 6sense-data dekt deze regio's slecht]**.
- **Het mkb wereldwijd, mits al Zoho-klant** — de bundelkorting via Zoho One en de CRM-/Books-integratie zijn doorslaggevend.
- **Dienstverlening met facturabele uren** — timesheets, budgetvariantie en facturatie-integratie zijn sterk.

**Zwak in:** grote enterprise-PPM (Planview, Clarity, Oracle), bouw- en infraplanning (P6, Asta Powerproject, Synchro, Bexel, Vico), en het "modern werkbeheer"-segment waar UI-esthetiek beslist (monday.com, Asana, ClickUp, Notion).

### 7.2 Cijfers over marktaandeel

| Metriek | Zoho Projects | Referentie |
|---|---|---|
| Marktaandeel project-collaboration (6sense) | **0,10%** (rang #34) | Asana 0,93% (#11); marktleiders: G Suite 60,14%, Slack 17,04%, Jira 3,41% |
| Marktaandeel project management (enlyft) | 0,28% **[ONZEKER — niet herbevestigd]** | — |
| Traceerbare klantbedrijven (6sense, 2026) | **ca. 3.369** | Asana ca. 31.554; monday.com 26.595 **[ONZEKER]**; Wrike 4.298 **[ONZEKER]** |
| Aantal concurrenten in de categorie | **321** | — |

*Bron: https://6sense.com/tech/project-collaboration/zoho-projects-market-share en https://6sense.com/tech/project-collaboration/asana-market-share, beide rechtstreeks opgehaald 25-07-2026.*

> **Gecorrigeerd bij hercontrole.** De live 6sense-pagina's geven nu 3.369 Zoho-Projects-bedrijven (was in dit profiel 3.394–3.430), 321 concurrenten (was 312), marktaandeel exact 0,10% (was "0,05%–0,10%") en Asana 31.554 (was ">31.442"). De richting van het beeld verandert niet — Zoho Projects blijft ongeveer een tiende van Asana's traceerbare voetafdruk — maar de exacte cijfers drijven per meting. Gebruik ze als orde van grootte, niet als harde tellingen. De monday.com- en Wrike-cijfers zijn bij deze ronde **niet** opnieuw opgehaald en blijven daarom onbevestigd.

**Belangrijke waarschuwing bij deze cijfers.** 6sense en enlyft meten via publiek waarneembare technografische signalen (job postings, website-tags, integraties). Dat ondertelt SaaS-tools die intern en achter login draaien systematisch, en het ondertelt niet-Amerikaanse markten extra hard. Zoho zelf claimt >1 miljoen betalende klanten en >150 miljoen gebruikers over de hele groep (ZohoDay 2026, Futurum Group). **De werkelijke Zoho Projects-installed base ligt vrijwel zeker een orde van grootte hoger dan 3.400 bedrijven — [SCHATTING].** Zoho publiceert geen productspecifieke gebruikersaantallen of omzet voor Projects afzonderlijk.

### 7.3 Belangrijkste concurrenten

| Segment | Concurrenten | Positie van Zoho Projects |
|---|---|---|
| Mkb-werkbeheer | monday.com, Asana, ClickUp, Wrike, Smartsheet, Teamwork | Goedkoper en planningstechnisch dieper (SF-relaties, kritiek pad, EVM); verliest op UI, ecosysteem en integraties |
| Klassieke CPM | MS Project, Primavera P6, Asta Powerproject, Deltek Open Plan, Spider Project | Veel goedkoper maar functioneel niet vergelijkbaar (geen constraints, geen levelling, geen XER) |
| Bouw-specifiek | Procore, Autodesk Construction Cloud, Bluebeam, Synchro, Bexel Manager, ALICE | Speelt niet mee; geen BIM/IFC/4D |
| Bundel-alternatief | Microsoft 365 + Project/Planner, Google Workspace + externe tool | Zoho One is prijstechnisch competitief |
| Open source | OpenProject, ProjectLibre, GanttProject, Taiga | Zoho is betaald maar functioneel rijker; OpenProject is de dichtstbijzijnde open-source concurrent |

### 7.4 Trend

- **Prijsdruk blijft Zoho's wapen.** Zoho heeft geen investeerders om tevreden te stellen en kan de $4–$14-band vasthouden. Tegelijk melden gebruikers verlengingsverhogingen tot 48% **[ONZEKER — secundaire bron]**, wat suggereert dat de instapprijs een acquisitieprijs is.
- **AI is de nieuwe strijd.** Zia (contentgeneratie, vertaling, insights, search) en sinds 2026 een MCP-server-add-on. Zoho volgt hier de markt eerder dan dat het hem leidt.
- **Geen beweging richting bouw/BIM.** Er is in de onderzochte bronnen geen enkele aanwijzing dat Zoho investeert in IFC, 4D of modelgebaseerde planning. De bouwpropositie blijft generiek projectbeheer met bouwterminologie erop geplakt.
- **API-consolidatie.** Legacy pre-v3-endpoints zijn per 31-12-2025 uitgezet; v3 (2024) is de standaard. Dat is gezond, maar dwong klanten tot migratiewerk.

---

## 8. Eindoordeel

### Voor wie wél

- **Mkb-organisaties die al Zoho gebruiken** (CRM, Books, People, Desk). De integratie en de Zoho One-bundel maken de beslissing bijna triviaal.
- **Dienstverleners met facturabele uren** — timesheets, budgetvariantie en EVM voor een fractie van de kosten van een PPM-suite.
- **Teams in India en opkomende markten** met beperkte IT-budgetten die tóch echte netwerkplanning nodig hebben. **₹630/gebruiker/maand jaarlijks gefactureerd** (≈ $6,52; ₹700 bij maandelijkse facturering, beide excl. GST — gecorrigeerd, zie §3.2) voor kritiek pad en baselines is een prijs waar geen westerse concurrent bij in de buurt komt.
- **Interne projecten, IT-implementaties, marketingcampagnes, productontwikkeling** met tientallen tot enkele honderden taken.
- **Organisaties die een goedkope tweede planningslaag zoeken** naast een echte planningstool — bijvoorbeeld uitvoerings-/actiebeheer naast een P6-masterschedule.

### Voor wie níét

- **Bouw-, infra-, offshore- en industriële planning op contractniveau.** Het ontbreken van constraints, resource levelling, activiteit-kalenders, XER/P6 XML en enige vorm van bouwspecifieke planningslogica maakt dit ongeschikt voor werk waar het schema een contractueel document is.
- **Iedereen die forensische vertragingsanalyse moet kunnen doen.** De float-berekening is niet gedocumenteerd, er zijn geen late-date-kolommen, geen retained logic/progress override, geen out-of-sequence-afhandeling. Onbruikbaar in een claimsituatie.
- **Schema's boven circa 2.000 activiteiten** **[SCHATTING]** — de gedocumenteerde prestatieklachten schalen met het aantal taken.
- **Organisaties die schema's moeten uitwisselen met opdrachtgevers of onderaannemers in MPP/XER.** Import werkt, export niet. Dat is een eenrichtingsval.
- **BIM-/IFC-gedreven organisaties.** Nul ondersteuning, nul roadmap-signaal.
- **Teams die op UI-kwaliteit selecteren.** Asana en monday.com winnen dat gevecht consequent in reviews.

### Is dit een serieus alternatief voor klassieke CPM-tools?

**Nee — maar het is ook niet niets, en dat onderscheid is belangrijk.**

Zoho Projects is géén "balkenschema zonder netwerkplanning". Het heeft echte netwerklogica: vier relatietypen inclusief SF, lag/lead, hard/soft links, automatische doorschuif, een kritiek-padberekening met per-taak slack, meerdere baselines met variantieanalyse, werkkalenders die weekenden en feestdagen overslaan, en EVM. Dat is een substantieel zwaardere planningskern dan Asana, Trello, Basecamp, Notion of Jira bieden. In de taxonomie van dit marktonderzoek hoort Zoho Projects in de categorie **"werkbeheertool met echte, maar onvolledige CPM-kern"** — niet in de categorie "gantt-plaatje".

Wat het mist ten opzichte van MS Project en Primavera P6 is echter niet cosmetisch, het is structureel: **geen constraints, geen resource levelling, geen effort-driven scheduling, geen activiteitkalenders, geen gedocumenteerde float-semantiek, geen XER/MPP-export, geen schaalbaarheid boven enkele duizenden taken.** Elk van die vijf punten is op zichzelf al genoeg om de tool uit een serieuze bouwaanbesteding te houden.

De eerlijke samenvatting: **Zoho Projects is de beste CPM-achtige planner die je voor $9 per gebruiker per maand kunt kopen, en dat is een reële prestatie — maar $9 per gebruiker per maand koopt geen bouwplanning.**

### Betekenis voor Open Planner Studio (IFC-gebaseerde open-source planner)

1. **Zoho Projects is geen directe concurrent.** Het bedient een ander segment (mkb-werkbeheer met planningsdiepte) en raakt de IFC-/BIM-niche nergens.
2. **Wel een nuttige benchmark voor de "goedkope-maar-echt"-lat.** Als een $9-tool vier relatietypen, lag, kritiek pad, meerdere baselines met End Variance/Slippage en EVM biedt, dan is dat het minimum dat een open-source planner functioneel moet evenaren om serieus genomen te worden. Met name **meerdere baselines naast elkaar vergelijken** en **End Variance / Slippage als aparte metrieken** zijn concrete, kopieerbare ideeën.
3. **Zoho's tekortkomingen zijn precies Open Planner Studio's kans:** constraints, activiteitkalenders, gedocumenteerde float-semantiek (late dates, free vs. total float), resource levelling, schaalbaarheid en — bovenal — IFC-round-trip. Dat zijn allemaal dingen die een IFC-native planner van nature moet doen en die Zoho structureel niet doet.
4. **Een Zoho-connector is technisch mogelijk maar semantisch verlieslatend.** De vier IFC `IfcRelSequence`-types mappen 1-op-1 op Zoho's FS/SS/FF/SF, en `TimeLag` mapt op Zoho's lag. Maar de koppeling taak↔bouwelement (`IfcRelAssignsToProcess`) heeft geen doel in Zoho. Een export-only connector ("push schema naar Zoho voor uitvoeringsteams") is verdedigbaar; een bidirectionele sync is dat niet.
5. **De API-rate-limit (100 req/2 min) moet in elk integratieontwerp expliciet worden meegenomen.**

---

## Bronnenlijst

Alle bronnen geraadpleegd op **25 juli 2026**, tenzij anders vermeld.

### Primaire bronnen (leverancier)

1. Zoho Projects — Prijzen: https://www.zoho.com/projects/pricing.html *(functie-matrix en limieten opgehaald; bedragen JS-gerenderd en niet leverbaar)*
2. Zoho Projects — Prijsplannen: https://www.zoho.com/projects/zohoprojects-pricing.html *(add-ons Resources en Lite User genoemd zonder prijs; feature-matrix per plan)*
3. Zoho Projects Plus — Prijzen: https://www.zoho.com/projectsplus/pricing.html *(bundelinhoud; prijs niet leverbaar)*
4. Zoho help — Wat is taakafhankelijkheid?: https://help.zoho.com/portal/en/kb/projects/tasks/tasks/task-dependencies/articles/task-dependency *(FS/SS/FF/SF, hard vs. soft link, planvereisten)*
5. Zoho help — Beheer taakafhankelijkheid: https://help.zoho.com/portal/en/kb/projects/tasks/tasks/task-dependencies/articles/manage-task-dependency
6. Zoho help FAQ — Kritiek pad (versie 9-2-2024): https://help.zoho.com/portal/en/kb/projects/faqs/critical-path/articles/critical-path-9-2-2024 *("available in the user based Enterprise plan"; cross-project dependencies tellen mee)*
7. Zoho help — Kritiek pad op Gantt: https://help.zoho.com/portal/en/kb/projects/tasks/critical-path/articles/view-critical-path-on-gantt-chart
8. Zoho help — Earned Value Management: https://help.zoho.com/portal/en/kb/projects/settings-in-zoho-projects/portal-configuration/articles/earned-value-management
9. Zoho help — Bedrijfsuren-instellingen: https://help.zoho.com/portal/en/kb/projects/settings-in-zoho-projects/business-hours/articles/business-hour-settings
10. Zoho help — Subtaken / Task List View: https://help.zoho.com/portal/en/kb/projects/tasks/subtasks/articles/subtasks-projects *(max. 6 niveaus subtaken; roll-up)*
11. Zoho help — Import Microsoft Projects (MPP/MPX): https://help.zoho.com/portal/en/kb/projects/import-users/import-from-mpp/articles/import-microsoft-projects-mpp-mpx-files *(MS Project 2003–2016)*
12. Zoho Projects API-documentatie (v3): https://projects.zoho.com/api-docs
13. Zoho — Gantt Chart Maker: https://www.zoho.com/projects/gantt-charts.html
14. Zoho — Taakafhankelijkheid (productpagina): https://www.zoho.com/projects/task-dependency.html
15. Zoho — Resource Utilization Chart: https://www.zoho.com/projects/resource-utilization-chart.html
16. Zoho — Key Project Management Metrics: https://www.zoho.com/projects/project-management/key-metrics.html
17. Zoho — Subtasks: https://www.zoho.com/projects/sub-task.html
18. Zoho blog — Execute projects better with critical path and baseline: https://www.zoho.com/blog/projects/critical-path-and-baseline-for-gantt.html *(directe fetch gaf HTTP 403; inhoud via zoekindexering)*
19. Zoho blog — Introducing new and improved Gantt chart in Zoho Projects: https://www.zoho.com/blog/projects/introducing-new-and-improved-gantt-chart.html
20. Zoho blog — Organize your work better with skip weekends and holidays: https://www.zoho.com/blog/projects/organize-your-work-better.html
21. Zoho blog — Export your project data as csv/xls and more: https://www.zoho.com/blog/projects/zoho-projects-export-your-project-data-as-csvxls-and-more.html
22. Zoho — Construction Project Management: https://www.zoho.com/projects/construction-project-management.html *(geen BIM/IFC-vermelding)*
23. Zoho — Construction PM: https://www.zoho.com/projects/construction-pm.html
24. Zoho eBook — Visualize your project timeline with Gantt charts (PDF): https://www.zoho.com/sites/zweb/images/projects/ebooks/visualize-your-project-timeline-with-gantt-charts-in-projects.pdf

### Zoho-community (gebruikersmeldingen)

25. "Zoho Projects Very Slow": https://help.zoho.com/portal/en/community/topic/zoho-projects-very-slow?page=1 *(prestatiedegradatie bij groeiend aantal projecten/taken)*
26. "MPP/MPX import failure": https://help.zoho.com/portal/en/community/topic/mpp-mpx-import-failure
27. "How to move dates and how to export tasks keeping several task levels/hierarchy": https://help.zoho.com/portal/en/community/topic/how-to-move-dates-and-how-to-export-tasks-keeping-several-task-levels-hierarchy *(hiërarchieverlies bij .xls/.csv en .pdf-export)*
28. "Zoho Projects API 100 requests/2 min. Limit": https://help.zoho.com/portal/en/community/topic/zoho-projects-api-100-requests-2-min-limit
29. "Is there an efficient way to enter tasks with Work Hours?": https://help.zoho.com/portal/en/community/topic/is-there-an-efficient-way-to-enter-tasks-with-work-hours *(effort vs. duration; 9 uur/werkdag × dagen)*
30. "Resource Allocation Report does not include Client Users": https://help.zoho.com/portal/ja/community/topic/resource-allocation-report-does-not-include-client-users
31. "Four types of task dependencies": https://help.zoho.com/portal/en/community/topic/four-types-of-task-dependencies
32. "Business Hours, Skip Weekends and Holidays": https://help.zoho.com/portal/en/community/topic/business-hours-skip-weekends-and-holidays

### Reviewplatforms

33. Capterra — Zoho Projects Reviews: https://www.capterra.com/p/169455/Zoho-Projects/reviews/ *(4,5/5, 869 reviews; UI-, mobiel-, setup- en prestatieklachten)*
34. G2 — Zoho Projects Reviews: https://www.g2.com/products/zoho-projects/reviews *(4,3/5, 300+ reviews)*
35. Gartner Peer Insights — Zoho Projects (PPM-markt): https://www.gartner.com/reviews/market/project-and-portfolio-management/vendor/zoho/product/zoho-projects *(306 reviews; directe fetch gaf HTTP 403)*
36. Software Advice — Zoho Projects: https://www.softwareadvice.com/project-management/zoho-projects-profile/reviews/
37. SoftwareReviews (Info-Tech) — Zoho Projects: https://www.softwarereviews.com/products/zoho-projects
38. Info-Tech — Zoho Projects Offers Two "New" Gantt Chart Features: https://www.infotech.com/software-reviews/vendor-technology-notes/zoho-projects-offers-two-new-gantt-chart-features

### Prijs- en reviewaggregators (secundair; met voorbehoud)

39. tech.co — Zoho Projects Pricing Review 2026 (bijgewerkt 2 apr 2026): https://tech.co/project-management-software/zoho-projects-pricing-review
40. costbench.com — Zoho Projects Pricing 2026: https://costbench.com/software/project-management/zoho-projects/ *(prijzen + verlengings-/opzegklachten; **aggregator, niet primair geverifieerd**)*
41. comparedge.com — Zoho Projects Pricing 2026: https://comparedge.com/tools/zoho-projects/pricing
42. thedigitalprojectmanager.com — Zoho Projects Pricing Tiers & Costs: https://thedigitalprojectmanager.com/tools/zoho-projects-pricing/ *(directe fetch gaf HTTP 403)*
43. thedigitalprojectmanager.com — Zoho Projects Review 2026: https://thedigitalprojectmanager.com/tools/zoho-projects-review/
44. invensislearning.com — Zoho Projects Review 2026: https://www.invensislearning.com/blog/zoho-projects-review/
45. itforsme.in — Zoho Projects Pricing India 2026: https://www.itforsme.in/pricing/zoho-projects-india/ *(₹350 Premium / ₹700 Enterprise)*
46. Techjockey — Zoho Projects Pricing & Reviews 2026: https://www.techjockey.com/detail/zoho-projects
47. Techjockey Q&A — How many tasks can I add in Zoho Projects?: https://www.techjockey.com/question/11174/how-many-tasks-can-i-add-in-zoho-projects
48. Zenatta Consulting — Zoho Pricing Guide 2026: https://zenatta.com/zoho-pricing-guide-2025/
49. Zenatta — Zoho Projects 2025: Complete Guide to Setup, Templates, Dependencies, Automation: https://zenatta.com/zoho-projects-2025-a-complete-guide-to-setup-templates-dependencies-and-automation/
50. Topline Results — Zoho Projects: Using Dependencies to Manage Tasks (aug-2025): https://www.toplineresults.com/2025/08/zoho-projects-using-dependencies-to-manage-tasks/
51. Black Badger — How to Forecast Budgets Using EVM in Zoho Projects: https://www.blackbadger.biz/how-to-forecast-budgets-using-earned-value-management-in-zoho-projects/
52. Sarah M. Hoban — Product Review: Zoho Projects: https://www.sarahmhoban.com/blog/product-review-zoho-projects

### Markt- en bedrijfsgegevens

53. 6sense — Zoho Projects Market Share: https://6sense.com/tech/project-collaboration/zoho-projects-market-share
54. 6sense — monday.com vs Zoho Projects: https://6sense.com/tech/project-collaboration/mondaycom-vs-zohoprojects
55. 6sense — Asana Market Share: https://6sense.com/tech/project-collaboration/asana-market-share
56. 6sense — Wrike Market Share: https://6sense.com/tech/project-collaboration/wrike-market-share
57. enlyft — Zoho Projects (0,28% marktaandeel): https://enlyft.com/tech/products/zoho-projects
58. Futurum Group — ZohoDay 2026: Zoho Reaches Million-Customer Milestone: https://futurumgroup.com/insights/will-zohos-value-generation-approach-drive-more-success-with-enterprises/
59. Entrackr — Zoho reports Rs 12,313 Cr revenue and Rs 3,191 Cr profit in FY25: https://entrackr.com/fintrackr/zoho-reports-rs-12313-cr-revenue-and-rs-3191-cr-profit-in-fy25-11701761
60. Indian Startup News — Zoho crosses Rs 12,000 crore revenue in FY25: https://indianstartupnews.com/news/sridhar-vembus-zoho-crosses-rs-12000-crore-revenue-in-fy25-profit-slips-amid-rising-costs-11702326
61. Wikipedia — Zoho Corporation: https://en.wikipedia.org/wiki/Zoho_Corporation
62. Wikipedia — Sridhar Vembu: https://en.wikipedia.org/wiki/Sridhar_Vembu

### API-migratie

63. Ascent Business — Zoho Projects API: Migrate to V3 by 31 Dec 2025: https://ascentbusiness.co.uk/zoho-projects-api-deadline-migrate-to-v3-by-31-december-2025/
64. Goldstar IT — Zoho Projects V3 APIs update: https://goldstarit.com/zoho-projects-v3-apis-update/

---

## Bijlage: expliciete lijst van schattingen en onzekerheden in dit profiel

| # | Bewering | Status |
|---|---|---|
| 1 | Realistisch schaalplafond 500–1.500 taken comfortabel, 2.000–3.000 taken pijnlijk | **SCHATTING** — niet gebenchmarkt; Zoho publiceert geen cijfers |
| 2 | Lite User add-on ≈ $5/gebruiker/maand | **ONZEKER** — niet op Zoho's prijspagina; alleen via derden |
| 3 | Prijs Resources-add-on, extra opslag, MCP Server, gastentoegang | **ONZEKER** — niet publiek geprijsd |
| 4 | Zoho Projects Plus-prijs | **ONZEKER** — niet vastgesteld (JS-gerenderd) |
| 5 | Zoho One $37–$45/gebruiker/maand | **SCHATTING** — secundaire bronnen, niet primair geverifieerd |
| 6 | ~~INR→USD-omrekening (₹87/USD)~~ → **₹96,61/USD** | **GECORRIGEERD** — ₹87 was fout; ₹96,61 bevestigd door twee FX-API's per 25-07-2026. Gevolg: India ligt ~28% onder de dollarprijs, niet ~10% |
| 6b | INR-bedragen ₹350/₹700 als "jaarprijs incl. GST" | **GECORRIGEERD** — het zijn de *maandelijks* gefactureerde tarieven en ze zijn **excl.** GST; jaarlijks gefactureerd is ₹280/₹630 (Techjockey) |
| 7 | Verlengingsverhogingen tot 48%, auto-renewal-klachten | **ONZEKER EN BETWIST** — enkel via aggregator costbench.com (n=110, niet reproduceerbaar); Zoho's eigen FAQ zegt daarentegen "You may cancel your account any time you want. No strings attached!" |
| 8 | MSPDI/MS Project XML-ondersteuning | **ONZEKER** — geen bewijs gevonden; aangenomen: niet ondersteund |
| 9 | Kalender koppelbaar aan individuele taak/activiteit | **ONZEKER** — documentatie beschrijft alleen portal-/gebruikersniveau |
| 10 | Inhoud van de "slack line" (total float vs. free float) | **SCHATTING** — niet gedocumenteerd door Zoho |
| 11 | Werkelijke installed base ligt een orde van grootte boven 3.400 bedrijven | **SCHATTING** — technografische bronnen ondertellen SaaS structureel; 6sense-telling bij hercontrole bijgesteld naar 3.369 |
| 12 | Bulk-API-endpoints in v3 | **ONZEKER** — niet vastgesteld; 1.000 taken + 1.500 relaties ≈ 1 uur bij naïeve implementatie is een **SCHATTING** |
| 13 | Volumestaffels/enterprise-korting via sales | **SCHATTING** — gebruikelijk in de markt, niet gedocumenteerd voor Zoho Projects |
| 14 | Aantal UI-talen van Zoho Projects | **ONZEKER** — niet geverifieerd |
| 15 | Regionale datacenterlijst | **ONZEKER** — niet geverifieerd |
| 16 | Sterkte in Zuidoost-Azië / Midden-Oosten / Afrika / Latijns-Amerika | **SCHATTING** — 6sense-data dekt deze regio's slecht |
| 17 | Afwezigheid van een "Zoho Projects-planner"-beroepsprofiel in de bouw | **SCHATTING** — gebaseerd op afwezigheid van bewijs |
| 20 | Geen minimum aantal zetels op betaalde plannen | **BEVESTIGD (zwak)** — geen enkele bron noemt een zetelminimum; comparedge stelt het expliciet. Blijft een negatieve bewering |
| 18 | USD-jaarbedragen $4/$9/$14 (§3.1) | **BEVESTIGD** — vier onafhankelijke bronnen (tech.co, GetApp, Software Advice, comparedge) geven identiek $4/$9/$14 |
| 18b | USD-maandbedrag Premium $5 | **BEVESTIGD — PRIMAIR** — Zoho's eigen Gantt-pagina noemt "$5/user/month" |
| 18c | USD-maandbedrag Ultimate $15 | **BETWIST/ONZEKER** — costbench zegt $15, comparedge zegt $14 zonder jaarkorting; geen meerderheid |
| 18d | Zoho-claim "Yearly – Save over 15%" | **GECORRIGEERD** — geldt alleen voor Premium (20%); Enterprise 10%, Ultimate 0–7% |
| 19 | Cross-project-afhankelijkheden tellen mee in het kritieke pad | **GECORRIGEERD naar ONZEKER** — FAQ stelt de vraag maar beantwoordt alleen het geval binnen één project |

---

## Verificatie

*Adversariële fact-check uitgevoerd op 25 juli 2026. Werkwijze: elke bewering is actief geprobeerd te **weerleggen** met onafhankelijk opgehaalde bronnen (directe fetch van leverancierspagina's, help-artikelen, prijsaggregators en twee FX-API's), niet slechts bevestigd. Waar bronnen elkaar tegenspreken of niet reproduceerbaar zijn, is het oordeel "onzeker" — ook als de oorspronkelijke bewering plausibel blijft. 14 beweringen getoetst: 8 bevestigd, 4 gecorrigeerd, 2 onzeker/betwist.*

| # | Bewering | Oordeel | Toelichting en bron |
|---|---|---|---|
| V1 | Jaarlijkse lijstprijzen $4 (Premium) / $9 (Enterprise) / $14 (Ultimate) per gebruiker/maand | **bevestigd** | Vier onafhankelijke bronnen geven exact dezelfde reeks. https://tech.co/project-management-software/zoho-projects-pricing-review · https://www.getapp.com/project-management-planning-software/a/zoho-projects/pricing/ · https://www.softwareadvice.com/project-management/zoho-projects-profile/ · https://comparedge.com/tools/zoho-projects/pricing |
| V2 | Maandprijzen $5 (Premium) en $10 (Enterprise) | **bevestigd** | Twee aggregators + **primair bewijs**: Zoho's eigen Gantt-pagina noemt letterlijk "$5/user/month". https://www.zoho.com/projects/gantt-charts.html · https://comparedge.com/tools/zoho-projects/pricing · https://costbench.com/software/project-management/zoho-projects/ |
| V3 | Maandprijs Ultimate $15 (met $14 jaarlijks) | **onzeker** | Bronnen spreken elkaar tegen: costbench geeft $15/mnd → $14/jr; comparedge geeft $14 maandelijks **én** $14 jaarlijks, dus géén jaarkorting op Ultimate. Geen meerderheid, dus niet vast te stellen. https://costbench.com/software/project-management/zoho-projects/ · https://comparedge.com/tools/zoho-projects/pricing |
| V4 | Zoho's claim "Yearly – Save over 15%" dekt alle plannen | **gecorrigeerd** | Geldt uitsluitend voor Premium (20%). Enterprise 10%, Ultimate 0–7%. De marketingclaim is voor twee van de drie betaalde plannen feitelijk onjuist. https://www.zoho.com/projects/zohoprojects-pricing.html |
| V5 | Geen minimum aantal zetels op de betaalde plannen; geen volumestaffels | **bevestigd** (zwak — negatieve bewering) | Geen enkele bron noemt een zetelminimum; comparedge stelt expliciet "no explicit minimum seats". Het enige gepubliceerde minimum is 150 GB opslag per organisatie op Ultimate. https://www.zoho.com/projects/zohoprojects-pricing.html · https://comparedge.com/tools/zoho-projects/pricing |
| V6 | Free-plan: max. 5 gebruikers, 3 projecten, 5 GB, 50 workflow-executies, **geen** taakafhankelijkheden | **bevestigd (primair)** | Herhaald opgehaald bij de leverancier zelf; exact gereproduceerd. Waarschuwing: softwaresuggest publiceert nog het achterhaalde Free-plan (3 gebruikers/2 projecten). https://www.zoho.com/projects/pricing.html · https://www.zoho.com/projects/zohoprojects-pricing.html |
| V7 | Kritiek pad én baseline zitten achter Enterprise; Premium heeft ze niet | **bevestigd (primair, dubbel)** | Feature-matrix: Critical Path en Baseline = No/No/Yes/Yes. Help-FAQ letterlijk: "available in the user based Enterprise plan of Zoho Projects". Dus de conclusie "effectieve instapprijs voor echte CPM-planning = $9/gebruiker/maand" houdt stand. https://help.zoho.com/portal/en/kb/projects/faqs/critical-path/articles/critical-path-9-2-2024 · https://www.zoho.com/projects/pricing.html |
| V8 | Plangrenzen: opslag 5/100/120/150 GB, sjablonen 20/30/50, read-only 10/100, workflow-executies 50/5.000/50.000/500.000 | **bevestigd (primair)** | Alle cijfers letterlijk uit de leveranciers-feature-matrix. https://www.zoho.com/projects/zohoprojects-pricing.html |
| V9 | India: Premium ₹350 en Enterprise ₹700 per gebruiker/maand, **inclusief GST** | **gecorrigeerd** | Twee fouten. (a) ₹350/₹700 zijn de *maandelijks gefactureerde* tarieven; jaarlijks gefactureerd is **₹280/₹630** (Ultimate ₹980). (b) De bedragen zijn **exclusief** GST, niet inclusief — Techjockey: "exclusive of all taxes"; jaarprijs Premium ₹3.360 excl. → ₹3.965 incl. 18% GST. https://www.techjockey.com/detail/zoho-projects (itforsme.in gaf HTTP 403 en is niet verifieerbaar) |
| V10 | Wisselkoers ₹87/USD; India daardoor "~10% goedkoper" dan de dollarprijs | **gecorrigeerd** | Koers op 25-07-2026 is **₹96,61/USD**, bevestigd door twee onafhankelijke FX-API's. Herberekend ligt India ~**28%** onder de dollarprijs (₹280 ≈ $2,90 vs $4; ₹630 ≈ $6,52 vs $9), niet 10%. De richting klopte, de omvang was fors onderschat. https://open.er-api.com/v6/latest/USD · https://api.exchangerate-api.com/v4/latest/USD |
| V11 | Vier afhankelijkheidstypen (FS/SS/FF/SF), hard/soft link, en **geen** datumconstraints | **bevestigd (primair)** | Help-artikel bevestigt alle vier de typen en de hard/soft-linkdefinities letterlijk, en noemt **geen enkel** constrainttype (Must Start On / SNET / ALAP). Ook bevestigd: dependencies binnen project = Premium+, cross-project = Enterprise+. https://help.zoho.com/portal/en/kb/projects/tasks/tasks/task-dependencies/articles/task-dependency |
| V12 | Cross-project-afhankelijkheden tellen mee in de kritiek-padberekening | **gecorrigeerd → onzeker** | De FAQ stelt de vraag wel, maar het antwoord behandelt uitsluitend afhankelijkheden binnen één project. Het bestaan van cross-project-relaties is bevestigd; hun effect op het kritieke pad niet. Claim in §2.1 en voordeel 6 afgezwakt. https://help.zoho.com/portal/en/kb/projects/faqs/critical-path/articles/critical-path-9-2-2024 |
| V13 | Baselines: twee baselines naast elkaar vergelijken, met End Variance en Slippage | **bevestigd (opgewaardeerd naar primair)** | Zoho's eigen pagina bevestigt letterlijk "simultaneously compare two distinct baselines", End Variance en Slippage — eerder steunde dit alleen op een blog via zoekindexering (HTTP 403). https://www.zoho.com/projects/gantt-charts.html |
| V14 | Contractrisico's: auto-renewal zonder eenvoudige opzegging, no-refund, verlengingsverhogingen tot 48% | **onzeker (betwist)** | Costbench-metadata is herbevestigd (n=110, mediane contractwaarde $372/jaar, "last verified 15 July 2026"), maar de methodologie is niet reproduceerbaar en er is geen tweede onafhankelijke bron. **Tegenbewijs uit primaire bron:** Zoho's eigen FAQ stelt "You may cancel your account any time you want. No strings attached!" Niet bruikbaar als beslisargument. https://costbench.com/software/project-management/zoho-projects/ · https://www.zoho.com/projects/zohoprojects-pricing.html |
| V15 | Marktpositie: ca. 3.394–3.430 traceerbare klantbedrijven, 312 concurrenten, marktaandeel 0,05–0,10%; Asana >31.442 | **gecorrigeerd** | Live 6sense geeft nu **3.369** bedrijven, **321** concurrenten, **0,10%** (rang #34), VS 1.266 (46,27%) / India 665 (24,31%) / VK 206 (7,53%), Asana **31.554** (0,93%). Orde van grootte ongewijzigd; exacte cijfers drijven per meting. https://6sense.com/tech/project-collaboration/zoho-projects-market-share · https://6sense.com/tech/project-collaboration/asana-market-share |
| V16 | Zoho Corp FY25: ₹12.313 crore omzet, ₹3.191 crore nettowinst | **bevestigd** | Cijfers exact bevestigd. Nuance die ontbrak: de winst was vrijwel vlak/licht dalend t.o.v. ₹3.299 crore in FY24, bij 17,8% omzetgroei — "winstgevend en schuldenvrij" blijft juist, "groeiende winst" zou dat niet zijn. https://entrackr.com/fintrackr/zoho-reports-rs-12313-cr-revenue-and-rs-3191-cr-profit-in-fy25-11701761 |
| V17 | Reviewscore Capterra 4,5/5 op 869 reviews | **bevestigd** | Herbevestigd via Software Advice (zelfde Gartner-Digital-Markets-pool, dus strikt genomen geen volledig onafhankelijke bevestiging). De G2-score 4,3/5 kon niet worden geverifieerd (HTTP 403) en blijft **onzeker**. https://www.softwareadvice.com/project-management/zoho-projects-profile/ |

### Niet-toetsbare beweringen (blijven staan zoals gemarkeerd)

De volgende beweringen zijn tijdens deze ronde **niet** verifieerbaar gebleken en behouden hun bestaande `[ONZEKER]`/`[SCHATTING]`-markering: prijs van de Lite-User-add-on (~$5), prijzen van Resources/extra opslag/MCP Server/gastentoegang, de Zoho Projects Plus-bundelprijs, Zoho One $37–$45, het schaalplafond van 500–1.500 taken, de inhoud van de "slack line" (total vs. free float), MSPDI-ondersteuning, kalenders op activiteitniveau, bulk-API-endpoints in v3, het aantal UI-talen en de regionale datacenterlijst. De web-zoekcapaciteit was tijdens deze ronde uitgeput; deze punten vergen een vervolgronde met gerichte zoekopdrachten of navraag bij Zoho sales.

### Wat dit betekent voor de conclusies van het profiel

Geen van de correcties raakt de kernconclusies. De belangrijkste inhoudelijke uitkomsten blijven overeind en zijn nu beter onderbouwd: **kritiek pad en baseline zitten primair bevestigd achter de Enterprise-muur ($9/gebruiker/maand jaarlijks)**, **de vier relatietypen bestaan primair bevestigd**, **datumconstraints ontbreken primair bevestigd**, en **er is nul IFC/BIM-ondersteuning**. Twee dingen verschuiven wel merkbaar: (1) het Indiase prijsvoordeel is bijna drie keer zo groot als beschreven (~28% i.p.v. ~10%), wat het argument over koopkrachtdifferentiatie versterkt; (2) de contractrisico-paragraaf moet zwakker worden gepresenteerd — er staat een expliciete leverancierstoezegging tegenover, en het 48%-cijfer is niet reproduceerbaar.
