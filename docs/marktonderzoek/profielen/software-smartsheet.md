# Smartsheet — diepgaand softwareprofiel

**Categorie:** spreadsheet-gebaseerd werkbeheer / collaboratief werk-managementplatform (CWM) met Gantt
**Peildatum onderzoek:** 25 juli 2026
**Onderzoeksmethode:** gerichte WebFetch op leverancierssite, officiële Help/Developer-documentatie, reviewplatforms en financiële bronnen.

> **Methodologische kanttekening (transparantie).** Het WebSearch-quotum van deze sessie was bij aanvang al uitgeput; het onderzoek is daarom volledig uitgevoerd met directe WebFetch-opdrachten op vooraf bekende en via indexpagina's ontdekte URL's (ruim 35 fetches). Een aantal beoogde bronnen bleek niet ophaalbaar: **G2, TrustRadius, Gartner Peer Insights en The Digital Project Manager gaven HTTP 403**; **Reddit (r/projectmanagement, r/construction) en PCMag zijn door de omgeving geblokkeerd**; **community.smartsheet.com gaf 403**. De gebruikersstem is daarom gedekt via **Capterra, GetApp, Software Advice en SelectHub** (samen enkele duizenden reviews). Waar een claim niet uit een primaire bron kon worden bevestigd, staat dat expliciet gemarkeerd als *[SCHATTING]* of *[ONBEVESTIGD]*.

---

## 1. Wat het is

### Leverancier en historie

| Feit | Waarde | Bron |
|---|---|---|
| Bedrijf | Smartsheet Inc. | Wikipedia (Smartsheet Inc.) |
| Opgericht | Zomer 2005; product publiek in 2006 | Wikipedia |
| Oprichters | Brent Frei, Eric Brown, Maria Colacurcio | Wikipedia |
| Hoofdkantoor | Bellevue, Washington, VS | Wikipedia / smartsheet.com/about |
| Beursgang | NYSE, 27 april 2018 (ticker SMAR) | Wikipedia |
| Eigendom nu | **Private equity: Blackstone + Vista Equity Partners** | Wikipedia |
| Overname | Aangekondigd september 2024, **$8,4 miljard**, **$56,50 per aandeel**; afgerond **januari 2025** | Wikipedia |
| Medewerkers | 3.330 (2024); "meer dan 3.000" | Wikipedia / smartsheet.com/about |
| Omzet FY2024 (t/m 31-01-2024) | **$958,3 mln**, +24,96% | stockanalysis.com |
| Omzet FY2023 | $766,9 mln, +39,23% | stockanalysis.com |
| Omzet FY2022 | $550,8 mln, +42,88% | stockanalysis.com |
| Nettoresultaat FY2024 | **−$104,6 mln** (marge −10,9%) — structureel verliesgevend, wél positieve vrije kasstroom ($155,3 mln) | stockanalysis.com |
| Klantbereik | "meer dan 85% van de Fortune 500" | smartsheet.com/about |

Eigen overnames die er voor de planningsfunctionaliteit toe doen: **Converse.AI** (2018, automatiseringsbots) en **10,000ft** (mei 2019) — dat laatste is het huidige losse product **Resource Management by Smartsheet**.

Historische gebruikersaantallen: 10.000 gebruikers na het eerste jaar; **1 miljoen gebruikers bij 20.000 organisaties in 2012** (Wikipedia). Een actueel officieel gebruikersaantal is in deze ronde niet gevonden — *[ONBEVESTIGD]*.

### Doelgroep, typische gebruikers, sectoren, regio's

Smartsheet richt zich op **zakelijk werkbeheer**, niet primair op planners. De typische gebruiker is de projectcoördinator, PMO-medewerker, marketing- of operations-manager die gewend is aan Excel en een gedeeld, geautomatiseerd raster wil met een Gantt erbij. Kernafnemers zijn grote ondernemingen (>85% Fortune 500), plus non-profits en mkb.

Sectoren waar Smartsheet zich expliciet op richt, inclusief **bouw en engineering**. Op de constructionpagina noemt Smartsheet als klanten onder meer **JLL, Colliers, Miller and Long, Hanmi Global, NSCC International, McCorvey Companies, Sutter Roofing, Hanson Installation Services, American Roofing & Metal, A.G. Coombs en Trafag**. De bouw-use-cases die Smartsheet zelf opvoert zijn veelzeggend: **pre-construction planning, punchlists, subcontractor-notificaties, veldveiligheidsrapportage via QR-codes, RFI/RFP-workflows, submittal- en budgettracking, kwaliteitscontrole en inspecties**. Dat is de *administratieve en uitvoeringslaag* van een bouwproject — niet het contractuele CPM-programma. Integraties die Smartsheet daar noemt: Procore, Egnyte, DocuSign, Google Workspace, Microsoft 365, Tableau.

Regio's: zwaartepunt Verenigde Staten, met wereldwijde verkoop. Datalocaties/endpoints zijn gescheiden per regio: **US (`api.smartsheet.com`), EU (`api.smartsheet.eu`), Australië (`api.smartsheet.au`) en US-overheid (`api.smartsheetgov.com`)** — relevant voor Europese aanbestedingen en dataresidentie.

---

## 2. Functionaliteit en techniek — streng beoordeeld

### Wat er wél zit

Een Smartsheet-projectplanning is een **sheet** (raster) waarin je in *Projectinstellingen* "afhankelijkheden" aanzet. Je hebt dan de kolommen **Startdatum, Einddatum, Duur, Voorganger (Predecessor)** en **% Gereed**, met een Gantt-weergave ernaast.

**Afhankelijkheden — verrassend compleet voor deze productcategorie:**

- **Alle vier de relatietypen**: Finish-to-Start (FS), Finish-to-Finish (FF), Start-to-Start (SS) en Start-to-Finish (SF).
- **Lag én lead**: `2w`, `4d`, `3.5d`, `7h`, `60m`, `500s`, `50000ms`, gecombineerd (`4h 30m`); negatieve waarden (`-1d`) geven lead.
- **Syntaxis**: rijnummer in de kolom Voorganger, meerdere gescheiden door komma's (`1,3,5`).
- **Verstreken duur (elapsed)**: prefix `e` (`e3d`, `e5h`) negeert niet-werktijd inclusief feestdagen — de klassieke "kalenderdagen"-modus voor uithardingstijden.
- **Mijlpalen**: duur 0 → ruit in de Gantt.
- **Automatische datumberekening**: startdatum + duur = einddatum, met uitsluiting van niet-werkdagen; geef je twee van de drie waarden (start, eind, duur), dan wordt de derde berekend.

**Kalender:** per sheet stel je **werkdagen, werkuren en uitgesloten data (feestdagen)** in. Standaard rekent Smartsheet met **8 uur per werkdag**.

**Hiërarchie / WBS:** parent-rijen (samenvattingstaken) rollen automatisch op: startdatum = vroegste kinddatum, einddatum = laatste kinddatum, en **% gereed is een op duur gewogen gemiddelde** van de kinderen. Parent-waarden zijn read-only.

**Kritiek pad:** Smartsheet toont het kritieke pad in rood in de Gantt-weergave. Definitie in de eigen documentatie: *"de langste reeks taken (van start tot finish) die op tijd moet worden voltooid om op schema te blijven"*, bepaald met startdata, einddata, duur en voorgangers. Het pad wordt automatisch herrekend bij elke datum- of relatiewijziging. Daarnaast bestaan **driving path** (welke voorgangers sturen de startdatum van déze taak) en **summary path** (welke subtaken sturen de einddatum van hun parent) — diagnostisch nuttig en niet in elke tool aanwezig.

**Baselines:** aanwezig, maar **pas vanaf het Business-plan** (in de Pro-kolom van de plannenvergelijking staat een streepje). Het aantal opslaanbare baselines en de exacte vastgelegde velden zijn in deze ronde niet uit primaire documentatie te bevestigen — *[ONBEVESTIGD]*; de gangbare aanname is **één actieve baseline per sheet** *[SCHATTING]*.

**Overige projectfuncties per plan** (uit de plannenvergelijking op de prijspagina):

| Functie | Pro | Business | Enterprise | Advanced Work Mgmt |
|---|---|---|---|---|
| Gantt-weergave | ✓ | ✓ | ✓ | ✓ |
| Afhankelijkheden/voorgangers | ✓ | ✓ | ✓ | ✓ |
| Baselines | – | ✓ | ✓ | ✓ |
| Timeline view | – | ✓ | ✓ | ✓ |
| Workload tracking | – | ✓ | ✓ | ✓ |
| Resource Management | – | add-on | add-on | inbegrepen |
| Portfolios | – | – | ✓ (nieuw) | ✓ |
| Scenario Planning | – | – | ✓ (nieuw) | ✓ |
| Control Center | – | add-on | add-on | inbegrepen |
| API-toegang | – | ✓ | ✓ | ✓ |
| SAML SSO | – | – | ✓ | ✓ |
| Automatiseringen | 250/mnd | onbeperkt | onbeperkt | onbeperkt |
| Bijlage-opslag | 20 GB | 1 TB | onbeperkt | onbeperkt |

Merk op: **kritiek pad staat niet als aparte rij in de vergelijkingstabel**, maar de leerdocumentatie zegt dat het beschikbaar is in Pro, Business en Enterprise.

### Wat er níet zit — de harde beoordeling

Dit is het punt waar de opdracht om strengheid vraagt. Smartsheet is **geen CPM-planningssysteem**. Het is een **dependency-driven datum-solver met een Gantt-visualisatie**. Concreet:

1. **Geen float / slack als data.** Nergens in de officiële documentatie over kritiek pad, driving path of summary path wordt **total float, free float, late start of late finish** genoemd. Er is geen Total-Slack-kolom, geen negatieve float, geen late-datumreeks. Smartsheet *tekent* het langste pad rood, maar levert de onderliggende CPM-grootheden niet als bruikbare data. Gevolg: **geen float-analyse, geen DCMA 14-point assessment, geen forensische vertragingsanalyse, geen "hoeveel speling heb ik hier"-vraag beantwoordbaar zonder handmatige formules.** Voor een planner die contractueel moet kunnen aantonen wat kritiek was, is dit diskwalificerend.
2. **Geen constraints en geen deadlines.** Must-Start-On, Start-No-Earlier-Than, Finish-No-Later-Than, As-Late-As-Possible, deadline-markers: geen daarvan komt voor in de Projectinstellingen zoals gedocumenteerd. Contractuele mijlpaaldata en oplevermomenten kun je dus **niet als planningsconstraint modelleren** — alles is puur voorganger-gedreven, met alleen een handmatig ingetikte startdatum als verankering.
3. **Geen backward pass.** Zonder constraints, deadlines en late dates is er de facto geen tweerichtings-netwerkberekening. Het kritieke pad wordt afgeleid uit de langste keten van forward-berekende data — functioneel bruikbaar, wetenschappelijk geen CPM.
4. **Geen cross-sheet afhankelijkheden.** Voorgangers zijn **rijnummers binnen hetzelfde sheet**. Er is geen mechanisme om een taak in sheet A als voorganger van een taak in sheet B te zetten. Voor bouwprogramma's met deelplanningen per discipline/perceel/aannemer en interface-mijlpalen daartussen betekent dit: **het programma kan niet als één netwerk worden doorgerekend.** Je kunt aggregeren in rapporten en dashboards, maar niet plannen over sheets heen. Dit is de zwaarste structurele beperking voor grote projecten.
5. **Geen handmatig-vs-automatisch geplande taken.** Het MS Project-onderscheid ontbreekt; er is één modus.
6. **Eén kalender per sheet.** Geen taakspecifieke kalenders, geen resource-kalenders, geen ploegendienst- of shiftkalenders. Voor bouw (winterstop per discipline, andere werktijden voor onderaannemer X, 24/7-werk in een fase) is dat te grof.
7. **Geen resource-gedreven planning.** Geen units/effort/work-model, geen effort-driven scheduling, **geen resource levelling**. *Workload tracking* (Business+) is een allocatie-visualisatie, geen levelling-engine. Echte capaciteitsplanning zit in het **aparte product Resource Management** (ex-10,000ft), waar je sheets naartoe synct via "Import work from Smartsheet" — een tweede datamodel, met bijbehorende synchronisatiefoutmeldingen als eigen helpcategorie.
8. **Geen kostenmodel in de scheduler.** Geen resourcetarieven, geen kostenrollup over het netwerk, geen cashflowcurve, **geen earned value management**. Budget bouw je met gewone kolommen en formules. Reviewers benoemen dit expliciet: Smartsheet "vereist integratie met externe budgetteringssoftware voor volledige financiële projectanalyse" (Software Advice).
9. **Formuleverbod in planningskolommen.** Zodra afhankelijkheden aanstaan, mag je **geen formules gebruiken in Startdatum, Einddatum, Duur, % Gereed en Voorganger**. Precies de kolommen waar spreadsheetgebruikers instinctief formules in willen zetten.
10. **Fragiel netwerk.** Documentatie: *"Manually changing a predecessor-driven date removes the predecessor value."* Eén handmatige datumcorrectie **wist stilzwijgend de relatie**. Op een plan van honderden regels erodeert het netwerk zo ongemerkt — er is geen integriteitsbewaking zoals P6 of MS Project die kennen.

### Platform en schaalbaarheid

- **Architectuur:** pure multi-tenant SaaS. Browser + native mobiele apps (iOS/Android). **Geen desktopclient, geen on-premises optie, geen offline-modus.**
- **API:** REST API v2, vereist **Business-plan of hoger**. Officiële SDK's voor JavaScript/Node, Python, Java en C#. Webhooks, CRUD op reports, asset-path-endpoints en sinds kort een **MCP-server** voor AI-clients. Regio-endpoints US/EU/AU/Gov. Rate limits konden in deze ronde niet uit de primaire documentatie worden opgehaald (de pagina gaf 404) — *[ONBEVESTIGD]*.
- **Schaalbaarheid:** dit is een zwak punt en het wordt door vrijwel elke reviewbron genoemd. Capterra registreert **61% negatief sentiment op "performance and reliability" over 190 reviews**, met expliciet *"slow load times, occasional crashes, and frustrating delays, especially with large data sets"*. Software Advice noemt "performance concerns with large sheets". SelectHub: *"slower loading times, especially with larger spreadsheets"*.
- **Realistisch aantal taken per planning:** Smartsheet publiceert harde rij-/cel-limieten per sheet, maar die pagina was in deze ronde niet ophaalbaar — de exacte cijfers zijn hier bewust **niet** overgenomen om fabricatie te vermijden *[ONBEVESTIGD]*. Op basis van de consistente prestatieklachten en het feit dat het netwerk sheet-gebonden is, is een **werkbare bovengrens van grofweg 500–2.000 regels per projectsheet** een verdedigbare inschatting, met merkbare traagheid daarboven *[SCHATTING]*. Ter vergelijking: een P6-programma van 20.000–100.000 activiteiten is routine. Een bouwprogramma van die orde is in Smartsheet **niet** te modelleren als één netwerk — niet vanwege een rij-limiet alleen, maar vooral omdat cross-sheet relaties ontbreken.

---

## 3. Prijzen

**Bron voor alle bedragen hieronder:** `https://www.smartsheet.com/pricing`, geraadpleegd **25 juli 2026**.

> **Leesnoot bij de bron.** De prijspagina rendert per valuta het maand- én het jaarbedrag direct achter elkaar zonder scheidingsteken (bijv. "$129" = $12 maandelijks / $9 jaarlijks). Die decodering is over **alle dertien valuta's consistent** en wordt onafhankelijk bevestigd door SelectHub ($9/gebruiker/maand jaarlijks voor Pro, $19 voor Business) en GetApp ($12/gebruiker/maand voor Pro, $24 voor Business bij maandelijkse betaling).

### Lijstprijzen (USD)

| Plan | Per lid/maand, **jaarlijks** betaald | Per lid/maand, **maandelijks** betaald | Per lid/jaar (jaarcontract) | Zetels |
|---|---|---|---|---|
| **Pro** | **$9** | **$12** | **$108** | min. 1, **max. 10 leden** |
| **Business** | **$19** | **$24** | **$228** | **min. 3 leden**, geen max |
| **Enterprise** | Op aanvraag | Op aanvraag | Op aanvraag | **min. 10 leden** |
| **Advanced Work Management** | Op aanvraag | Op aanvraag | Op aanvraag | Maatwerk |

### Lijstprijzen in andere valuta's (afgeleid uit dezelfde valutakiezer, 25-07-2026)

| Valuta | Pro (jaarlijks / maandelijks) | Business (jaarlijks / maandelijks) |
|---|---|---|
| EUR | **€8 / €11** | **€17 / €22** |
| GBP | **£7 / £10** | **£15 / £19** |
| CHF | 8 / 11 | 17 / 22 |
| AUD | $13 / $17 | $27 / $35 |
| CAD | $12 / $16 | $26 / $33 |
| NZD | $15 / $20 | $32 / $40 |
| SGD | $12 / $16 | $25 / $33 |
| JPY | ¥1.200 / ¥1.600 | ¥2.500 / ¥3.200 |
| DKK | 62 / 83 | 132 / 170 |
| NOK | 98 / 130 | 207 / 260 |
| SEK | 97 / 130 | 205 / 260 |
| ZAR | 170 / 230 | 359 / 450 |

Ondersteunde valuta's op de prijspagina: AUD, CAD, CHF, DKK, EUR, GBP, JPY, NOK, NZD, SEK, SGD, USD, ZAR.

### Gratis tier

- **Er is géén gratis plan meer voor nieuwe gebruikers.** Het Free plan *"hasn't been available to new users since **August 28, 2024**"* (help.smartsheet.com, artikel "Free plan details"). Bestaande Free-accounts blijven bestaan met: max. 2 editors/viewers naast de eigenaar (3 gebruikers totaal), max. 2 eigen sheets, 100 automatiseringen/maand, 500 MB bijlagen, dashboards tot 10 widgets, rapporten beperkt tot één bronsheet zonder groepering.
- Nieuwe gebruikers krijgen een **30-daagse gratis proefperiode** ("30 days free, no credit card required"; SelectHub noemt 50 sheets in de trial).

### Add-ons (prijzen 25-07-2026)

| Add-on | Beschikbaar op | Prijs |
|---|---|---|
| **Dynamic View** | Business, Enterprise | **vanaf $125/maand** |
| **Data Shuttle** (geautomatiseerde CSV/XLSX-in/uitvoer) | Business, Enterprise | **vanaf $100/maand** |
| **Resource Management** (ex-10,000ft) | Business, Enterprise | Op aanvraag |
| **Brandfolder** (DAM) | Alle plannen | Op aanvraag |
| **Control Center** | Business, Enterprise (add-on); inbegrepen in AWM | Op aanvraag |

Het **Advanced Work Management**-pakket bundelt Control Center, Dynamic View, Data Shuttle, Connectors, DataMesh, Calendar App, Pivot App en premium support.

### Licentiemodel — de "user subscription model"-omslag

Dit is essentieel om de kosten te begrijpen (bron: help.smartsheet.com, "Seat types"):

| Seat-type | Kosten | Kan wat |
|---|---|---|
| **Member** | **Betaald** (telt mee voor de zetels) | Volledig: sheets/rapporten/dashboards/workspaces maken, bewerken, verwijderen, delen, automatiseringen bouwen |
| **Provisional Member** | Tijdelijk gratis tot einde factuurcyclus | Zelfde rechten als Member; wordt automatisch toegekend als een gratis gebruiker een Member-actie uitvoert, daarna terug naar gratis óf automatisch upgraden |
| **Contributor** | **Gratis, onbeperkt** (Pro, Business, Enterprise) | Bekijken, reageren, bijlagen beheren, update-requests beantwoorden, formulieren indienen — **niet** aanmaken of delen |
| **Guest** | **Gratis** (Business, Enterprise) | Externe gebruiker (ander e-maildomein); Viewer/Commenter/Editor afhankelijk van deelrechten; kan niets aanmaken |
| **System Admin** | Geen zetelvereiste | Gebruikers, accountinstellingen, security, zetelbeheer |

Dat gratis-Contributor-model is Smartsheets sterkste commerciële wapen én tegelijk de bron van de grootste klachten: bij de overgang van het oude "licensed user"-model naar het nieuwe model gingen kosten bij sommige klanten hard omhoog. Capterra citeert een non-profit die van **$600 naar $4.000 per jaar** ging na de abonnementswijziging.

### Rekenvoorbeelden

- 10 planners op **Pro**, jaarlijks: 10 × $9 × 12 = **$1.080/jaar** — maar zónder API, baselines, timeline view en workload tracking, en met een harde limiet van 10 leden.
- 25 planners op **Business**, jaarlijks: 25 × $19 × 12 = **$5.700/jaar**, plus onbeperkt gratis contributors/guests.
- 25 planners op Business **plus** Dynamic View en Data Shuttle: $5.700 + (12 × $125) + (12 × $100) = **$8.400/jaar** minimaal.
- Enterprise/AWM met Control Center: geen lijstprijs; realistisch **vijfcijferig tot laag zescijferig per jaar** voor een middelgrote onderneming *[SCHATTING]*.

---

## 4. VOORDELEN

1. **Laagste adoptiedrempel van alle Gantt-dragende tools.** De spreadsheet-metafoor betekent dat een uitvoerder, werkvoorbereider of opdrachtgever zonder training kan meedoen. Capterra: **4,5/5 over 3.530 reviews**, ease-of-use 4,3, value-for-money 4,4. Real-time samenwerking scoort **98% positief sentiment over 361 reviews**.
2. **Onbeperkte gratis Contributors en Guests.** Alleen makers hebben een betaalde zetel nodig; iedereen die leest, becommentarieert, bijlagen uploadt of formulieren indient is gratis. Voor de bouw — met tientallen onderaannemers, adviseurs en opdrachtgeversvertegenwoordigers per project — is dat een enorm kostenvoordeel tegenover per-seat CPM-tools waar elke kijker een licentie kost.
3. **Vier volwaardige relatietypen met lag én lead.** FS/SS/FF/SF, negatieve lag, partial-day lag (`3.5d`), uur-/minuutniveau, en **elapsed duration** (`e3d`) voor uithardings- en droogtijden. Dat is aantoonbaar méér planningsdiepte dan Asana, Monday.com, Trello, Notion of ClickUp bieden, en het is het punt waarop Smartsheet zich losmaakt van de rest van de werkbeheercategorie.
4. **Kritiek pad plús driving path en summary path.** Het driving path — *"welke voorganger stuurt de startdatum van juist deze taak"* — is een diagnostische functie die zelfs in sommige echte CPM-tools ontbreekt of verstopt zit. Alles herrekent live bij elke wijziging.
5. **Werkstroomautomatisering zonder code, plus formulieren.** Trigger-conditie-actie-workflows voor goedkeuringen, herinneringen en update-requests, gekoppeld aan webformulieren. Dit is waar Smartsheet in de bouw echt waarde levert: punchlists, RFI's, submittals, veiligheidsmeldingen en keuringen worden gestructureerde, traceerbare processen in plaats van e-mailketens. Eén klant rapporteert 90% minder e-mail.
6. **Portfoliolaag die daadwerkelijk schaalt in de breedte.** Control Center (project-uitrol vanuit blauwdrukken), Portfolios, rapporten over honderden sheets en dashboards maken standaardisatie over veel *gelijkvormige* projecten mogelijk. Waar Smartsheet niet diep schaalt, schaalt het wel breed.
7. **Enterprise-inkoopbaar.** REST API v2 met officiële SDK's (JS, Python, Java, C#), webhooks, MCP-server, SAML SSO, directory-integratie (Okta, Microsoft Entra ID), en **dataresidentie in US, EU, Australië en US-Gov**. Connectors voor Jira, Salesforce, ServiceNow, SAP ERP, SAP BO, Workday, Power BI en Tableau.
8. **Sterke mobiele app voor veldwerk.** SelectHub scoort mobiel **88, boven de concurrentie**, met foto-upload, markup-tools en barcodescanning — direct relevant voor de bouwplaats waar de meeste planningstools alleen een read-only viewer bieden.
9. **Aantoonbare bouwsector-tractie in de VS.** Publieke referenties bij JLL, Colliers, Miller and Long, Hanmi Global, Sutter Roofing en A.G. Coombs, kant-en-klare bouwtemplates, en koppeling met Procore, Egnyte en DocuSign.
10. **Continuïteit en schaal van de leverancier.** ~$958 mln omzet (FY2024), +25% groei, >85% van de Fortune 500 als klant, ~3.300 medewerkers, en sinds januari 2025 kapitaalkrachtige PE-eigenaren. Leveranciersrisico is laag.

---

## 5. NADELEN

1. **Geen echte CPM-engine — het is een balkenschema met een datum-solver.** Het kritieke pad wordt getekend, maar **float/slack, late start/finish en negatieve float bestaan niet als data**. Er is geen aantoonbare backward pass. Gevolg: geen float-analyse, geen DCMA-checks, geen vertragings-/claimanalyse, geen "wat is mijn speling"-antwoord. Voor contractuele planning is dit een showstopper.
2. **Geen constraints, geen deadlines.** Geen SNET/FNLT/MSO/ALAP en geen deadline-markers. Contractuele mijlpaaldata, boeteclausules en oplevermomenten zijn niet als planningsobject te modelleren. Alles hangt aan handmatig ingetikte startdata plus voorgangers.
3. **Geen afhankelijkheden over sheets heen.** Voorgangers zijn rijnummers binnen één sheet. Deelplanningen per discipline, perceel of onderaannemer kunnen **niet als één netwerk worden doorgerekend**. Precies de programmastructuur die grote bouwprojecten nodig hebben, ontbreekt.
4. **Prestatieproblemen bij grote sheets — breed en consistent gemeld.** Capterra: **61% negatief sentiment over performance/reliability op 190 reviews**, met *"slow load times, occasional crashes, and frustrating delays, especially with large data sets"*. Bevestigd door Software Advice ("performance concerns with large sheets") en SelectHub ("slower loading times, especially with larger spreadsheets").
5. **Fragiele netwerkintegriteit.** Eén handmatige wijziging van een door de voorganger gestuurde datum **wist de voorganger stilzwijgend**. Combineer dat met het **verbod op formules** in Start/Eind/Duur/%Gereed/Voorganger en je krijgt een model dat gebruikers ongemerkt kapotmaken. Er is geen validatie of waarschuwingsmechanisme zoals in P6/MS Project.
6. **Resource- en kostenmodel is dun.** Geen units/effort/work, **geen resource levelling**, geen resourcekalenders, geen tarieven, geen kostenrollup, **geen earned value**. Workload tracking is visualisatie; echte capaciteitsplanning vereist het **aparte Resource Management-product** met een eigen datamodel en synchronisatie (het helpcentrum heeft een aparte categorie voor sync-fouten). Software Advice noteert dat je externe budgetteringssoftware nodig hebt voor volledige financiële analyse.
7. **Kosten lopen snel op, en het prijsmodel is beweeglijk.** Business is $19–24 per gebruiker per maand, daarbovenop add-ons met **eigen maandabonnementen** (Dynamic View vanaf $125/mnd, Data Shuttle vanaf $100/mnd) en Control Center/AWM op aanvraag. Capterra registreert **46% negatief sentiment over prijs op 330 reviews**, inclusief een non-profit die van $600 naar $4.000 per jaar ging. Het gratis plan is sinds 28-08-2024 dicht voor nieuwe gebruikers.
8. **Zware feature-gating richting Business+.** **API, baselines, timeline view en workload tracking zitten allemaal pas op Business.** Pro is bovendien **hard gelimiteerd op 10 leden**. Pro is daarmee geen serieuze planningslicentie; wie planning wil, betaalt minimaal Business.
9. **Rapportage en export zijn een bekend zwak punt.** Gebruikers melden **PDF-exportopmaak die tekst vervormt**, beperkte aanpasbaarheid van data-export en stakeholderpresentaties, en moeite met het genereren van rapporten (Software Advice, GetApp). Capterra noteert daarnaast **60% negatief sentiment over "limited advanced formula support" op 99 reviews**.
10. **Cloud-only, met leercurve ondanks de spreadsheetschijn.** Geen desktopclient, geen on-premises, geen offline werken — problematisch voor projectlocaties met slechte connectiviteit en voor opdrachtgevers met strikte data-eisen. En hoewel het basisgebruik simpel is, melden reviewers een reële leercurve voor geavanceerde workflows, dashboards en cross-sheet formules. GetApp citeert bovendien direct dat Smartsheet *"less effective for complex projects compared to other tools like Microsoft Project or Primavera"* is.

---

## 6. Interoperabiliteit

Dit hoofdstuk is extra relevant omdat de opdrachtgever een **open-source, IFC-gebaseerde planner** bouwt.

### Formaatondersteuning

| Formaat | Import | Export | Opmerking |
|---|---|---|---|
| **Excel (.xlsx)** | Ja | Ja | Kernpad; Data Shuttle automatiseert dit (betaalde add-on) |
| **CSV** | Ja | Ja | Kernpad; verliest hiërarchie, relatietypen en lags |
| **Google Sheets** | Ja | Ja | Via Google Workspace-integratie |
| **PDF / PNG** | – | Ja | Bekende klachten over opmaakvervorming |
| **Microsoft Project (.mpp)** | Historisch aangeboden — **niet te bevestigen** in deze onderzoeksronde *[ONBEVESTIGD]* | **Nee** | Geen MS Project-connector in de integratielijst |
| **MSPDI / MS Project XML** | Nee | Nee | Geen enkele vermelding in documentatie of integratielijst |
| **Primavera P6 XER** | **Nee** | **Nee** | Geen ondersteuning, geen connector |
| **Primavera P6 XML** | **Nee** | **Nee** | Geen ondersteuning, geen connector |
| **IFC / IFC 4.3** | **Nee** | **Nee** | Zie hieronder |

### Wat dat praktisch betekent

- **Uitwisseling met de klassieke planningswereld is er niet.** Smartsheet biedt geen XER, geen P6 XML en geen MSPDI. Wie in een keten werkt waarin de opdrachtgever een XER-oplevering eist (in de VS en het Midden-Oosten standaard bij grote infra- en utiliteitsprojecten), kan Smartsheet niet als primaire planningstool gebruiken. Uitwisseling loopt dan via Excel/CSV en verliest daarbij **relatietypen, lags, kalenders, hiërarchie en float** — dus alles wat een planning tot een planning maakt.
- **Smartsheet positioneert zich als vervánger van MS Project, niet als partner ervan.** De officiële integratiepagina somt Jira, Power BI, Salesforce, SAP ERP, SAP BusinessObjects, ServiceNow, Tableau, Workday, Microsoft Teams, Slack, Adobe CC, Docusign, Miro, Zapier, Power Automate, Workato, Tray.ai, UiPath en een reeks AI-integraties (ChatGPT, Claude, Google Gemini, Microsoft Copilot MCP, Atlassian Rovo, Glean) op — **en geen enkele planningsuitwisseling**.

### IFC 4.3 / IfcWorkSchedule / IfcTask — geen enkele ondersteuning

Smartsheet heeft **geen IFC-ondersteuning in welke vorm dan ook**: geen IFC-import, geen IFC-export, geen `IfcWorkSchedule`/`IfcTask`/`IfcWorkCalendar`-mapping, geen 4D-koppeling, geen modelviewer. In de volledige integratielijst ontbreken **Autodesk (Navisworks, Construction Cloud), Bentley SYNCHRO, Solibri, Trimble en elke andere BIM-authoring- of coördinatietool**. De enige bouwspecifieke integraties die Smartsheet noemt zijn Procore, Egnyte, DocuSign en Achievan — allemaal documentbeheer en projectadministratie, geen modelgegevens.

**Consequentie voor een IFC-gebaseerde open-source planner:** Smartsheet is **geen uitwisselingspartner en geen semantische tegenhanger**. Er is geen gemeenschappelijke taxonomie. De enige realistische koppelroutes zijn:

1. **REST API v2** (Business+ vereist) — sheets als generieke tabellen lezen/schrijven met JS-, Python-, Java- of C#-SDK's. Dit is de nette route: een `IfcTask`-set naar een Smartsheet-projectsheet schrijven en teruglezen kan, maar relatietypen moeten dan handmatig op de Predecessor-syntaxis worden afgebeeld (`3FS +2d`) en float/constraints gaan verloren omdat Smartsheet ze niet kent.
2. **CSV/XLSX**, eventueel geautomatiseerd met **Data Shuttle** (extra $100+/maand).

Ofwel: **Smartsheet is een eiland met een goede API en zwakke planningssemantiek.** Voor een IFC-planner is de vertaling per definitie lossy in de richting van Smartsheet, en zeer arm in de richting terug.

---

## 7. Marktpositie

### Waar Smartsheet sterk staat, en waarom

- **Collaboratief werkbeheer (CWM) bij grote ondernemingen.** SelectHub rangschikt Smartsheet **#1 in de categorie Work Management Software** (score 81/100, 88% gebruikerstevredenheid over 25.822 reviews) — en tegelijk pas **#7 op de project-managementranglijst**. Dat verschil vat de positionering perfect samen: uitstekend werkbeheer, middelmatig als projectplanner.
- **PMO-standaardisatie over veel gelijkvormige projecten.** Control Center + Portfolios + dashboards is een sterke propositie voor organisaties die 50–500 vergelijkbare projecten willen uitrollen en aggregeren.
- **De uitvoerings- en administratielaag van bouwprojecten in de VS.** Punchlists, RFI's, submittals, veldveiligheid, inspecties, subcontractor-communicatie, portfoliorapportage naar de directie. Níet het contractuele CPM-programma.
- **Waarom het werkt:** adoptiegemak, gratis contributors, sterke automatisering, mobiel, en enterprise-governance (SSO, dataresidentie, admin center).

### Concurrenten

| Segment | Concurrenten |
|---|---|
| Werkbeheer / CWM (directe strijd) | Monday.com, Asana, Wrike, ClickUp, Airtable, Notion, Microsoft Planner / Project for the web |
| Enterprise PPM | Planview, Adobe Workfront, Broadcom Clarity, ServiceNow SPM |
| Bouwspecifiek (project-administratie) | Procore, Autodesk Construction Cloud, Oracle Aconex, Trimble Viewpoint |
| Klassieke CPM-planning (**waar Smartsheet niet meespeelt**) | Oracle Primavera P6, Microsoft Project (desktop), Asta Powerproject, Deltek Acumen Fuse, Bentley SYNCHRO, TILOS |

De essentiële observatie: Smartsheet concurreert **niet** met de vierde rij. Het wint deals van Monday/Asana/Excel, niet van P6. In bouwbedrijven staat het **naast** P6 of MS Project, niet in plaats daarvan.

### Trend

- **Financieel:** sterke omzetgroei ($551 mln FY22 → $767 mln FY23 → $958 mln FY24), maar structureel nettoverlies (−$105 mln FY24) met inmiddels positieve vrije kasstroom. De **take-private van $8,4 miljard door Blackstone en Vista (afgerond januari 2025)** betekent dat de sturing verschuift van groei naar winstgevendheid.
- **Verwachte gevolgen daarvan** *[SCHATTING]*: verdere verharding van het prijsmodel (het sluiten van het gratis plan in augustus 2024 en de overgang naar het user-subscription-model passen al in dat patroon), meer upsell-druk richting Enterprise en Advanced Work Management, en minder gratis functionaliteit.
- **Productstrategie:** zeer zwaar op AI in 2025–2026 — Smart Assist, Smart Columns, AI-gestuurde dashboards, een eigen MCP-server en integraties met ChatGPT, Claude, Google Gemini, Microsoft Copilot, Atlassian Rovo en Glean. Nieuwe planningsfuncties zijn Portfolios en Scenario Planning (beide Enterprise+). Er zijn **geen aanwijzingen dat Smartsheet investeert in echte CPM-verdieping** (float, constraints, cross-sheet netwerken, resource levelling).
- **Gebruikersaantallen:** geen recent officieel cijfer gevonden. Historisch >1 miljoen gebruikers in 20.000 organisaties (2012); >85% van de Fortune 500 als klant (2026). Actuele totalen *[ONBEVESTIGD]*.

---

## 8. Eindoordeel

### Voor wie wél

- **PMO's en projectkantoren** die veel gelijkvormige projecten willen standaardiseren, uitrollen en aggregeren, met dashboards richting directie.
- **Bouw- en engineeringbedrijven op de uitvoerings- en administratielaag**: punchlists, RFI's, submittals, keuringen, veiligheid, veldrapportage, onderaannemercoördinatie. Hier is Smartsheet aantoonbaar goed en kostenefficiënt door de gratis contributors.
- **Organisaties waar het planningsprobleem vooral een coördinatie- en communicatieprobleem is** — waar het echte knelpunt niet de netwerklogica is maar het feit dat niemand weet wat de laatste versie is.
- **Teams die uit Excel komen** en een gedeeld, geautomatiseerd, geversioneerd raster met een Gantt erbij willen zonder een planningsopleiding.
- **Projecten tot enkele honderden activiteiten**, binnen één sheet, zonder contractuele float-verantwoording.

### Voor wie níet

- **Contractuele netwerkplanning.** Zonder float, constraints en late dates kun je geen contractueel programma verdedigen.
- **Claims, vertragingsanalyse en forensische planning.** Onmogelijk: de CPM-grootheden bestaan niet als data.
- **Grote programma's** met tienduizenden activiteiten en deelplanningen per discipline of perceel — cross-sheet afhankelijkheden ontbreken.
- **Resource- en kostgeladen planningen** met levelling, tarieven, cashflow en earned value.
- **4D/BIM-integratie** en alles wat met IFC te maken heeft.
- **Ketens waarin XER of P6 XML wordt geëist** door opdrachtgever of hoofdaannemer.
- **Organisaties met on-premises- of offline-eisen.**

### Is dit een serieus alternatief voor klassieke CPM-tools?

**Nee.** Smartsheet is een **balkenschema met een dependency-solver**, geen CPM-planningssysteem. De vier relatietypen met lag, de werkdagenkalender en de rode kritieke-padweergave zijn indrukwekkend *voor een werkbeheertool* en zetten Smartsheet ruim boven Monday, Asana en ClickUp. Maar zodra je vraagt naar **total float, late dates, constraints, deadlines, resource levelling, kostgeladen netwerken of afhankelijkheden over deelplanningen heen**, is het antwoord telkens: dat kan niet. En dat zijn precies de dingen die een planning tot een *plan* maken in plaats van een *overzicht*.

De eerlijke positionering is **complementair**: Smartsheet naast P6 of MS Project, niet in plaats daarvan. In veel Amerikaanse bouwbedrijven is dat ook exact de praktijk — de planner werkt in P6, de rest van de organisatie leest en werkt in Smartsheet.

### Relevantie voor een open-source, IFC-gebaseerde planner

Smartsheet is **geen directe concurrent op planningsdiepte**, maar wel een concurrent op **verwachtingspatroon en adoptie**. Drie lessen:

1. **Het gratis-contributor-model is een adoptiewapen van de eerste orde.** Onbeperkt gratis lezen/reageren/bijlagen is waarom Smartsheet in bouworganisaties binnenkomt. Een open-source planner heeft dat voordeel intrinsiek — dat moet keihard worden uitgespeeld.
2. **De tabel-editor náást de Gantt is wat mensen verwachten**, niet alleen de Gantt. Smartsheets hele succes berust op de spreadsheetmetafoor. Een planner die alleen een canvas-Gantt biedt, voelt voor deze doelgroep incompleet.
3. **Het differentiatiegebied ligt exact waar Smartsheet stopt:** echte float en late dates, constraints en deadlines, resource- en taakkalenders, netwerken over deelplanningen heen, en bovenal **IFC 4.3-native round-tripping (`IfcWorkSchedule`, `IfcTask`, `IfcWorkCalendar`, `IfcRelSequence`)** — waar Smartsheet exact nul aanbiedt en, gezien de PE-gedreven strategie, ook niet gaat aanbieden.

---

## Bronnenlijst

Alle bronnen geraadpleegd op **25 juli 2026**.

**Leverancier — prijzen en positionering**
1. Smartsheet prijspagina — https://www.smartsheet.com/pricing (plannen, USD/EUR/GBP en 10 andere valuta's, zetelminima, add-ons Dynamic View/Data Shuttle, plannenvergelijkingstabel met feature-gating)
2. Smartsheet over ons — https://www.smartsheet.com/about (oprichting 2005, Bellevue WA, >3.000 medewerkers, >85% Fortune 500)
3. Smartsheet bouwoplossingen — https://www.smartsheet.com/solutions/construction (klantreferenties, bouw-use-cases, Procore/Egnyte/DocuSign)
4. Smartsheet projectmanagement — https://www.smartsheet.com/solutions/project-management (geadverteerde PM-capaciteiten)
5. Smartsheet integraties — https://www.smartsheet.com/integrations (volledige connectorlijst; geen MS Project, geen P6, geen BIM/IFC)

**Officiële documentatie — techniek**
6. Afhankelijkheden en voorgangers — https://help.smartsheet.com/articles/765727-enabling-dependencies-using-predecessors (FS/SS/FF/SF, lag/lead-formaten, elapsed duration, mijlpalen, parent-rollup, formuleverbod, wissen van voorganger bij handmatige datumwijziging)
7. Kritiek pad, summary path en driving path — https://help.smartsheet.com/learning-track/level-3-solutions/critical-summary-and-driving-paths (definitie kritiek pad; géén vermelding van float/slack of backward pass)
8. Kritiek pad (advanced track) — https://help.smartsheet.com/learning-track/smartsheet-advanced/critical-path (activering, Gantt-only, plannen Pro/Business/Enterprise)
9. Gantt met afhankelijkheden — https://help.smartsheet.com/learning-track/level-3-solutions/gantt-chart-dependencies
10. Projectmanagement-tutorial — https://help.smartsheet.com/learning-track/level-3-solutions/project-management-tutorial (Projectinstellingen, werkdagen/uren/feestdagen, 8u standaard, gewogen %gereed; géén constraints of baselines genoemd)
11. Seat types — https://help.smartsheet.com/articles/520100-user-types (Member, Provisional Member, Contributor, Guest, System Admin)
12. Free plan — https://help.smartsheet.com/articles/2482687-free-plan (niet meer beschikbaar voor nieuwe gebruikers sinds **28 augustus 2024**; limieten)
13. Plan- en gebruikerstype identificeren — https://help.smartsheet.com/articles/2476781-identify-smartsheet-plan-user-type (user model vs. legacy model)
14. Resource Management — https://help.smartsheet.com/learning-track/getting-started-resource-management (apart product, sheet-sync, premium feature)
15. Smartsheet API v2 — https://developers.smartsheet.com/api/smartsheet/introduction (Business+ vereist, SDK's JS/Python/Java/C#, MCP-server, regio-endpoints US/EU/AU/Gov)
16. Helpcentrum categorie-index — https://help.smartsheet.com/ , https://help.smartsheet.com/category/sheets-and-rows , https://help.smartsheet.com/category/account-management , https://help.smartsheet.com/category/smartsheet-integrations

**Gebruikersreviews**
17. Capterra — https://www.capterra.com/p/79104/Smartsheet/reviews/ (**4,5/5, 3.530 reviews**; prijs 46% negatief over 330 reviews; performance 61% negatief over 190 reviews; formules 60% negatief over 99 reviews; non-profit $600 → $4.000/jaar)
18. GetApp — https://www.getapp.com/project-management-planning-software/a/smartsheet/ (4,5/5, 3.530 reviews; $12 en $24 per gebruiker/maand; *"less effective for complex projects compared to other tools like Microsoft Project or Primavera"*)
19. Software Advice — https://www.softwareadvice.com/project-management/smartsheet-profile/reviews/ (4,5/5; ease-of-use 4,3, support 4,3, value 4,4, functionality 4,3; PDF-exportproblemen, externe budgetsoftware nodig, performance bij grote sheets)
20. SelectHub — https://www.selecthub.com/p/project-management-software/smartsheet/ (score 81/100, **#1 Work Management** maar **#7 Project Management**; $9 en $19 per gebruiker/maand jaarlijks; mobiel 88; performance-degradatie bij grote datasets)

**Bedrijf en financiën**
21. Wikipedia — Smartsheet Inc. — https://en.wikipedia.org/wiki/Smartsheet_Inc. (oprichting, oprichters, IPO 27-04-2018, omzet FY2024 $958 mln, 3.330 medewerkers, overnames Converse.AI en 10,000ft, take-private $8,4 mrd / $56,50 per aandeel, afgerond januari 2025)
22. Wikipedia — Smartsheet (product) — https://en.wikipedia.org/wiki/Smartsheet (historie, 1 mln gebruikers / 20.000 organisaties in 2012)
23. StockAnalysis — https://stockanalysis.com/stocks/smar/financials/ (omzet FY2022–FY2024, nettoresultaat, vrije kasstroom)

**Niet-ophaalbare bronnen (voor volledigheid)**
- G2 (https://www.g2.com/products/smartsheet/reviews) — HTTP 403
- TrustRadius (https://www.trustradius.com/products/smartsheet/reviews) — HTTP 403
- Gartner Peer Insights (adaptive project management and reporting) — HTTP 403
- Smartsheet Community (community.smartsheet.com) — HTTP 403
- The Digital Project Manager Smartsheet-review — HTTP 403
- Reddit (r/projectmanagement, r/construction) — geblokkeerd door de omgeving
- PCMag Smartsheet-review — geblokkeerd door de omgeving
- Smartsheet "System requirements and guidelines" (harde rij-/kolom-/cellimieten) — URL loste niet op naar het juiste artikel; numerieke limieten daarom bewust niet overgenomen
