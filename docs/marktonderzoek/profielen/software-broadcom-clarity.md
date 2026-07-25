# Broadcom Clarity (voorheen CA PPM / CA Clarity PPM / Niku Clarity)

*Softwareprofiel — marktonderzoek planningssoftware*
*Onderzoeksdatum: 25 juli 2026*
*Analist: software-analist, wereldwijd marktonderzoek planningssoftware*

> **Leeswijzer bij betrouwbaarheid.** Broadcom publiceert **geen** openbare lijstprijzen voor Clarity. Alle bedragen in dit profiel komen uit reviewsites, aggregators en resellers. Ze zijn per stuk gemarkeerd met een betrouwbaarheidsniveau:
> `[HARD]` = primaire bron (leverancier/officiële documentatie), `[SECUNDAIR]` = gevestigde review-/analistensite, `[ZWAK]` = aggregator/SEO-site van onbekende kwaliteit, `[SCHATTING]` = eigen inschatting van de analist.

---

## 1. Wat het is

### Leverancier en eigendom

**Clarity** is een enterprise **Strategic Portfolio Management (SPM) / Project Portfolio Management (PPM)**-platform van **Broadcom Inc.** (San Jose, VS; NASDAQ: AVGO). Het product zit in Broadcom's software-portfolio onder het merk **ValueOps**, samen met Rally (agile), ConnectALL (integratie) en Insights (analytics). ([valueops.broadcom.com/products/clarity](https://valueops.broadcom.com/products/clarity)) `[HARD]`

### Historie — vier eigenaren in twintig jaar

| Periode | Eigenaar | Productnaam |
|---|---|---|
| ±1998–2005 | **Niku Corporation** | Niku Clarity / Clarity |
| 2005–2018 | **CA Technologies** (nam Niku over in 2005) | CA Clarity PPM → **CA PPM** (vanaf ±2016) |
| nov. 2018 – heden | **Broadcom** | **Clarity PPM** → **Clarity** (binnen ValueOps) |

Broadcom kondigde de overname van CA Technologies aan in **juli 2018** voor **USD 18,9 miljard** en rondde die af op **5 november 2018**. Kort daarna draaide Broadcom veel CA-productnamen terug naar hun oorspronkelijke naam; "CA PPM" werd weer "Clarity". `[SECUNDAIR]`

Dat de erfenis nog leeft, zie je aan de codebase: **Open Workbench**, de gratis desktop-scheduler die Clarity als alternatief voor Microsoft Project meelevert, stamt rechtstreeks uit de Niku-tijd en wordt nog altijd in de actuele documentatie genoemd. `[HARD]`

**Belangrijke context bij de eigendomsvraag:** Broadcom staat bekend om een agressief post-overnamemodel — kostenbesparing, focus op de grootste accounts, abonnementsdwang en fors hogere verlengprijzen. Bij CA werd na de overname naar schatting **circa 40% van het personeel** geschrapt; hetzelfde patroon herhaalde zich bij VMware (overname dec. 2023, USD 61 mrd), waar eeuwigdurende licenties werden vervangen door abonnementen met minimumafnames en bundeldwang. `[SECUNDAIR]` Dit is voor Clarity-klanten geen theoretisch risico: reviewers melden dat de overstap naar het abonnementsmodel hun jaarlijkse onderhoudskosten **verdubbelde**. `[SECUNDAIR]` (zie §3 en §5)

### Actuele versie

**Clarity 16.4.2**, **algemeen beschikbaar op 11 mei 2026** — Broadcom's eigen GA-aankondiging stelt dat de release "now available for On-Premises and SaaS customers" is; support loopt tot 30 november 2028. (De eerder genoteerde datum "12 juni 2026" is géén tweede GA-datum maar hoogstens een SaaS-upgradevenster; de GA-datum is 11 mei 2026.) `[HARD — Broadcom Community GA-aankondiging]` Belangrijkste nieuws: uitbreiding van de AI-assistent **Vaia** met native ondersteuning voor Anthropic-modellen, een nieuwe **MCP-server** waarmee externe AI-assistenten (Claude Desktop, Cursor) met Clarity kunnen praten (eerst alleen urenregistratie-workflows), 15+ rapportageverbeteringen en High Contrast Mode. **Jaspersoft (CA Business Intelligence) wordt verwijderd bij de 16.4.3-upgrade op 11 september 2026** (SaaS) — 16.4.2 is *"the final release that will support Jaspersoft Reporting"* — een substantiële migratie voor iedereen met eigen rapporten. `[HARD — Broadcom product advisory 36023]`

### Doelgroep, typische gebruikers, sectoren en regio's

- **Doelgroep:** grote en zeer grote organisaties met een **PMO/EPMO**, een investeringsportfolio en behoefte aan financiële governance over honderden tot duizenden initiatieven. Broadcom positioneert Clarity expliciet op het niveau *strategie → financiering → uitvoering*, niet op het niveau *taakplanning*.
- **Typische gebruikers:** portfoliomanagers, PMO-leads, resourcemanagers, financieel controllers, CIO-office. Projectmanagers zijn gebruiker maar niet de primaire ontwerpdoelgroep; teamleden gebruiken het vaak vrijwel uitsluitend voor **urenregistratie**.
- **Schaal:** een PeerSpot-consultant beschrijft zijn klantenbestand als *"customers ranging from 50 users to 100 to 200,000 users"*; andere reviewers noemen eigen implementaties van ~2.000 (piek 10.000) en ~20.000 gebruikers. Let op de nuance: **200.000 is de bovenkant van één consultant-uitspraak over meerdere klanten, geen geverifieerde individuele implementatie** — het eerder genoteerde "200.000+" (met plus) is niet door de bron gedekt. `[SECUNDAIR]`
- **Sectoren (door Broadcom zelf genoemd):** telecom, maakindustrie, financiële dienstverlening, zorg, overheid en onderwijs, **bouw**, vastgoed, zakelijke dienstverlening. `[HARD]` Let op: "bouw" staat op die lijst als *klantsector*, niet als bewijs dat Clarity bouwplanning doet — zie §2 en §8.
- **Regio's:** wereldwijd, met zwaartepunt Noord-Amerika en West-Europa. Grote publieke referenties in de VS (o.a. federale programma's, mede door de EVM-module die aan Amerikaanse overheidseisen voldoet). `[SECUNDAIR]`

### Twee interfaces in één product

Clarity heeft historisch **twee gescheiden UI's**:

1. **Classic Clarity PPM** — de oude Java/JSP-interface, waar traditioneel de diepste projectfunctionaliteit zat (Gantt-weergave, autoschedule, cost plans, EVM, MSP/Open Workbench-koppeling).
2. **Modern UX** (sinds ±15.x) — de nieuwe interface met Timeline/Gantt-layout, roadmaps, blueprints.

Broadcom stuurt actief op migratie naar Modern UX, maar partners waarschuwen dat het **geen skin over Classic** is: *"The Modern UX is also not just an updated look and feel for Classic; they are two distinct entities"* (Rego Consulting). `[SECUNDAIR]` Voor kopers betekent dit: functiepariteit per module controleren, en rekening houden met een meerjarig migratietraject.

---

## 2. Functionaliteit en techniek — heeft dit een échte CPM-engine?

**Kort antwoord: ja, Clarity heeft een echte netwerkplanningsengine — maar hij is bewust ondiep gehouden en de praktische schaal ligt ordes van grootte onder wat een bouwplanner nodig heeft.**

Dat is een belangrijk onderscheid. Veel enterprise-werkbeheertools (Asana, monday.com, Smartsheet in basisvorm, Jira) tekenen alleen een balkenschema en berekenen niets. Clarity doet dat wél. Maar het is óók geen Primavera P6.

### 2.1 De CPM-engine: Autoschedule

Clarity's planningsengine heet **Autoschedule**. De officiële documentatie beschrijft een klassieke **twee-passen CPM**: `[HARD]`

- **Voorwaartse pass** door de afhankelijkheden om **early start / early finish** te bepalen en het langste pad te vinden;
- **Achterwaartse pass** vanaf de einddatum van de investering om **late start / late finish** te bepalen;
- **Float** = *"the number of days that a task's initiation or completion can be delayed without adversely affecting the investment finish date"*, berekend als Late Start − Early Start;
- Taken met **float = 0** vormen het **kritieke pad**; *"the critical path determines the earliest finish date of the project."*

Dit is dus geen marketing-"kritiek pad", maar een berekend netwerk met early/late-data en total float.

**Autoschedule-opties (exacte namen uit de documentatie):** `[HARD]`

| Optie | Betekenis |
|---|---|
| **Autoschedule Date** | Startdatum vanaf waar gepland wordt (default: vandaag) |
| **Schedule from Finish Date** | Achterwaarts plannen vanaf een deadline |
| **Resource Constraints** | Resourcebeschikbaarheid meenemen → resource-constrained scheduling / levelling |
| **Subnets** | Aparte kritiekepadberekening per subnet in plaats van één voor het hele project |
| **Honor Constraints on Started Tasks** | Constraints respecteren op reeds gestarte taken |
| **Ignore Tasks Starting Before / After** | Taken buiten een datumvenster uitsluiten van herplanning |
| **Start Successors on Next Day** | Opvolgers met lag 0 de dag ná de voorganger laten starten |
| **Publish After Scheduling** | Voorlopig schema meteen publiceren naar het plan of record |

**Tentatief vs. gepubliceerd schema:** Autoschedule produceert eerst een *tentative schedule* en **vergrendelt de investering**; via een banner kies je publiceren (vervangt het huidige schema, ontgrendelt) of verwerpen. `[HARD]` Dit is een net stukje ontwerp — vergelijkbaar met een "what-if"-run — en beter dan tools die direct destructief herplannen.

### 2.2 Afhankelijkheidstypen en lags

Clarity Modern UX (Timeline-layout) ondersteunt **alle vier relatietypen** met lag: `[HARD]`

- **Finish-Start** — *"The predecessor task must finish before the successor task can start. This dependency is the most common type."*
- **Start-Start** — *"The predecessor task must start before the successor task can start."*
- **Finish-Finish** — *"The predecessor task must finish before the successor task can finish."*
- **Start-Finish** — *"The predecessor task must start before the successor task can finish."*

Lag wordt per relatie ingesteld met **type en waarde**. Relaties kunnen **binnen én tussen investeringen** (cross-project) worden gelegd. `[HARD]`

**Beperking:** *"You cannot create dependencies from phases and summary tasks."* Alleen detailtaken kunnen relaties dragen. `[HARD]` Dat is verdedigbaar (P6 raadt hetzelfde af), maar in Clarity is het een harde blokkade, geen advies.

### 2.3 Constraints — hier zit een wezenlijk verschil met P6

Clarity kent datumconstraints (*must start on*, *start or finish no later than*) en het **vergrendelen** van taken zodat data niet verschuiven. Maar de documentatie zegt expliciet dat Autoschedule constraints **overrulet**: het schema geeft voorrang aan constrained taken, *"but overrides this rule if it violates a dependency or over-allocates a resource."* `[HARD]`

**Analyse:** in Primavera P6 en Microsoft Project zijn constraints (deels) *harde* schema-eisen die het netwerk kunnen breken en negatieve float produceren — precies wat je in claim- en vertragingsanalyse nodig hebt. In Clarity zijn ze *zachte* voorkeuren die wijken voor logica en resourcebeschikbaarheid. Voor portfolioplanning is dat prima; voor contractuele bouwplanning is het een gebrek.

Er is in de documentatie **geen bewijs** gevonden voor:
- **retained logic / progress override** (P6-schema-opties bij out-of-sequence progress);
- **meerdere activiteitkalenders per relatie-lag** (lag-kalender);
- **negatieve lag/lead** expliciet gedocumenteerd (wel "gaps or overlaps" bij duurberekening — waarschijnlijk ondersteund, maar niet bevestigd) `[SCHATTING: onzeker]`;
- **duurtypes** in P6-zin (Fixed Duration & Units, Fixed Units/Time, …). Clarity werkt met **loading patterns** (Uniform, Front, Back, …), **Max % Load** en **ETC** per toewijzing — een ander en simpeler model.

### 2.4 Kalenders

Clarity heeft een volwaardig, hiërarchisch kalendermodel: `[HARD]`

- **Base calendars** fungeren als sjabloon voor resource- en rolkalenders; er is precies één **standard** kalender als systeemdefault;
- **Parent-child-overerving** tussen kalenders, aanpasbaar en te ontkoppelen;
- Tot **vier shifts per dag**; standaard *"two 4-hour shifts with one hour for lunch for a total of eight work hours"*;
- Werkdagen/niet-werkdagen per losse datum of per weekdagpatroon;
- De kalender van een resource of rol *"determines their FTE when you allocate them to a project team"* en voedt beschikbaarheid, capaciteit, vraag en allocatie;
- Wijzigingen worden pas zichtbaar in capaciteitsrapportage **nadat de Time Slicing Job draait** — een batchjob, geen realtime herberekening.

Dat laatste is typerend voor Clarity: veel is batch-gedreven (time slices, datawarehouse-load), niet reactief.

### 2.5 Resourcemodel en levelling

- Globale resourcepool met **rollen** (voor vraag vóórdat namen bekend zijn), skills, OBU/organisatiestructuur, locatie en kostenmatrices.
- **Capaciteitsplanning** op portfolio-niveau (vraag vs. capaciteit per rol/periode) — dit is aantoonbaar Clarity's sterkste functionele gebied; het komt in vrijwel elke positieve review terug.
- **Resource-constrained scheduling** via de Autoschedule-optie *Resource Constraints*. Staat die uit, dan *"treats resources as if they have unlimited availability"* — kortere schema's, maar met overallocatie. `[HARD]`
- **Bekend defect/gedrag:** bij Max Load 100% + loading pattern *Uniform* + resource constraints aan, *"pushes task dates and ETC out and changes task duration"* (Broadcom KB 29379). `[HARD]` Levelling is dus aanwezig, maar niet zorgeloos.

### 2.6 Baselines

- **Onbeperkt aantal projectbaselines**; advies is een initiële baseline te maken vóór er uren geboekt worden. `[HARD]`
- In Modern UX Timeline is er een **"Compare to Baseline"**-weergave die baseline-balken toont op basis van de huidige baseline-revisie; hiervoor zijn **geen extra rechten** nodig. `[HARD]`
- Baselines voeden de **EVM**-berekeningen (BCWS/BCWP).

### 2.7 Kostenmodel en Earned Value

- **Cost plans / budget plans**, met een aangewezen **plan of record** als budgetbaseline; multi-currency. `[HARD]`
- **Earned Value Manager (EVM)** als add-in: EV, **EAC**, **ETC**, CPI/SPI-achtige metrieken, plus **EVM Contracts** voor compliance met Amerikaanse federale programma-eisen. `[HARD]`
- Chargeback/interne doorbelasting, tarieven- en kostenmatrices, capitalisatie (CapEx/OpEx-splitsing).

Dit financiële model is dieper dan dat van vrijwel elke bouwplanner en dieper dan MS Project. Het is een van Clarity's echte onderscheidende sterktes.

### 2.8 WBS en taakstructuur

- **Onbeperkt aantal WBS-niveaus**. `[HARD]`
- Drie elementtypen: **Phases** (bovenste niveau), **Summary Tasks** (data automatisch gerold uit kinderen) en **Detail Tasks** (enige niveau met toewijzingen en relaties). `[HARD]`
- Mijlpalen, %-gereed, statusgebaseerde kleuring van balken, "Show Today"-lijn.
- Beperking: een summary task kan geen kinderen krijgen als hij al relaties of toewijzingen heeft. `[HARD]`

### 2.9 Platform en schaalbaarheid — de belangrijkste beperking

**Deployment:** SaaS (door Broadcom gehost) en on-premise. Databases: **Oracle, Microsoft SQL Server en PostgreSQL** — bevestigd in Broadcom's eigen installatiedocumentatie voor 16.4.x (aparte *Install Clarity With PostgreSQL* / *With Microsoft SQL*-handleidingen plus de Oracle-RAC-vermelding in de compatibiliteitsspecificatie), dus `[HARD]` in plaats van `[SECUNDAIR]`. Webgebaseerd; geen native desktop-client (behalve de MSP/OWB-connector) en beperkte mobiele functionaliteit.

**Schaal per project — hier wringt het:**

| Bron | Uitspraak |
|---|---|
| Broadcom-community (consultants) | *"PPM consultants suggest there should not be more than 100 tasks under one project, to make sure that the performance does not get affected"* `[HARD]` |
| Broadcom-medewerker, zelfde thread | *"I know that there is customer who defines 1000 or more tasks in project"* `[HARD]` |
| Broadcom KB 213970 (MSP-limieten) | *"There's no limit to the number of tasks…"*, maar openingstijd loopt op met taakaantal, aantal toewijzingen, duur en aantal baselines; *"There are no benchmarks / quantifiable values available"* — voorbeeldcasus: een project met **7.500 taken** `[HARD]` |
| Systeemparameter | *"Maximum tasks allowed in a timesheet"* staat standaard op **250**, wijzigen wordt afgeraden `[HARD]` |

**Analyse.** Er is geen harde limiet, maar Broadcom's eigen ecosysteem adviseert **~100 taken per project** en behandelt 4.500–7.500 taken als een prestatie-uitzondering zonder benchmarks. Ter vergelijking: een middelgroot bouwproject in Primavera P6 heeft routineus **5.000–20.000 activiteiten**, en P6-programma's van 100.000+ activiteiten zijn niet uitzonderlijk. Clarity is dus **twee ordes van grootte** onder bouwplanningsschaal ontworpen. Het schaalt breed (veel projecten, veel gebruikers), niet diep (veel taken per project).

### 2.10 Eindconclusie techniek (streng)

| Criterium | Oordeel |
|---|---|
| Echte CPM-engine (forward/backward pass, float) | **Ja** — gedocumenteerd twee-passen-algoritme |
| Kritiek pad berekend (niet alleen getekend) | **Ja**, incl. subnet-optie |
| FS / SS / FF / SF | **Ja, alle vier**, met lag, ook cross-project |
| Negatieve lag / lead | **Waarschijnlijk**, niet bevestigd in documentatie `[SCHATTING]` |
| Constraints | **Zwak** — zacht; worden overruled door logica en resourcebeschikbaarheid |
| Retained logic / progress override | **Niet gevonden** — vermoedelijk afwezig |
| Kalenders | **Ja**, hiërarchisch, shifts, resource-/rolkalenders; batch-verwerkt |
| Resource levelling | **Ja**, optioneel; bekende gedragsproblemen |
| Baselines | **Ja**, onbeperkt, met vergelijkweergave |
| Kostenmodel / EVM | **Sterk** — beter dan de meeste planningstools |
| Schaal per project | **Zwak** — richtlijn ~100 taken; 7.500 = uitzonderingscasus |
| Schaal per portfolio | **Sterk** — tot 200.000+ gebruikers gemeld |

**Verdict:** Clarity is *geen* balkenschema-tekentool zonder netwerk — die aantijging is onterecht. Maar het is een **portfolio-tool met een adequate CPM-engine**, niet een **planningstool met portfoliofuncties**. De engine is gemaakt om een projectplan van tientallen tot enkele honderden taken consistent te houden binnen een resource- en financieel model — niet om een bouwschema van 10.000 activiteiten met harde contractuele constraints te dragen. Broadcom zelf onderschrijft dit impliciet: het levert al twintig jaar een **externe scheduler** mee (Microsoft Project of Open Workbench) voor wie dieper wil plannen.

---

## 3. Prijzen

### 3.1 Structureel: geen openbare prijs

Broadcom publiceert **geen lijstprijzen** voor Clarity. Er is **geen gratis tier**. Over een proefversie spreken bronnen elkaar tegen: SelectHub meldt een *"Free Trial"* op aanvraag, terwijl Capterra bij dezelfde productlisting expliciet *"Free trial not available"* vermeldt — behandel "proefversie" als **onbevestigd en per deal onderhandeld**. Verkoop loopt via Broadcom-accountmanagers en partners (Rego Consulting, itdesign, Winmill, Tricise e.a.), met onderhandelde meerjarige contracten; het licentiedocument bevestigt dat aantallen en typen gebruikers per **Transaction Document** worden vastgelegd. Alle onderstaande bedragen zijn dus **derdenbronnen**, met de bijbehorende onzekerheid.

### 3.2 Licentietypen

Clarity kent drie gebruikersklassen. Dit is niet langer alleen partner-/KB-informatie: Broadcom's eigen **Specific Program Documentation — Clarity** (april 2023) definieert ze contractueel. `[HARD — Broadcom SPD, primair]`

| Type | Contractuele definitie (letterlijk) | Wie |
|---|---|---|
| **Full Function User** (*f/k/a Manager User*) | *"users who have full use of and access to the functions within the CA Software licensed"* | Projectmanagers, PMO, resourcemanagers |
| **Restricted User** (*f/k/a Team Member user*) | *"limited rights … and may only (i) view data and run reports in all licensed products; (ii) collaboratively participate in processes, discussions and document sharing and receive notifications …; (iii) view project tasks and calendars, and report and approve time and project status; and (iv) enter and view status of ideas."* Plus: *"a Restricted User may not modify the design of any report."* | Teamleden |
| **View Only User** | *"limited rights … and may only (i) view data and run regular reports; (ii) originate idea workflows, and (iii) participate in the continuation of those workflows."* | Stakeholders, management |

**Correctie t.o.v. de gangbare samenvatting:** een Restricted User is méér dan "urenregistratie" — hij mag óók in *alle gelicentieerde producten* data bekijken en rapporten draaien, meedoen aan processen/discussies/documentdeling, en **tijd én projectstatus goedkeuren**. Alleen rapportontwerp is uitgesloten.

**Verplichte pakketgrootte — dit is het enige gepubliceerde minimum:** `[HARD — Broadcom SPD]`

- *"View Only Users are licensed per 'Pack.' A Pack of View Only Users includes 100 View Only Users."* en *"Customer may license View Only Users by the number of Packs of View Only Users which will be set forth in the Transaction Document."* → **View Only is niet per stuk te kopen; de eenheid is 100 zetels.**
- *"If the Transaction Document indicates that Customer has received a license for at least one Full Function User, Customer is entitled to an Environment."* → één Full Function User geeft recht op één Environment (prod/dev/test).
- Herallocatie tussen typen mag, mits het aantal per type de contractuele aantallen niet overschrijdt.

Sinds 16.2.3 zijn er extra velden (*User Status*, *Sub License Type*) in de gebruikerslijst voor licentietelling — een sterke aanwijzing dat Broadcom actief op licentiecompliance stuurt. `[HARD]`

### 3.3 Gevonden prijspunten

| Bedrag | Model | Bron | Datum geraadpleegd | Betrouwbaarheid |
|---|---|---|---|---|
| **~USD 50 / gebruiker / maand** (met volumekorting) | SaaS | PeerSpot-reviewers: *"about fifty dollars per month per user, although there are discounts available"* | 25-07-2026 | `[SECUNDAIR]` — echte klantuitspraken |
| **USD 60 / gebruiker / maand** (≈ USD 720/jr) | SaaS, per gebruiker, maandelijks gefactureerd | SelectHub, productpagina Clarity PPM | 25-07-2026 | `[SECUNDAIR]` |
| **USD 3.000 per 10 gebruikers / jaar** (= USD 300/gebruiker/jaar ≈ USD 25/mnd) | instapprijs | ITQlick | 25-07-2026 | `[ZWAK]` — pagina zelf gaf 403; cijfer uit zoekresultaat |
| **USD 65–120 / gebruiker / maand** afhankelijk van modules en tier | SaaS | VendorBenchmark, "Broadcom Clarity PPM Pricing 2026" | 25-07-2026 | `[ZWAK]` — aggregator, methodologie niet verifieerbaar |
| **USD 300K–700K eenmalig** (100–200 gebruikers) + **22% p.j. onderhoud** | on-premise eeuwigdurend | VendorBenchmark | 25-07-2026 | `[ZWAK]` |
| **USD 150K–800K per jaar** typische dealgrootte; **20–40% korting** op lijst haalbaar (tot 40–50% bij grote volumes) | enterprise-contract | VendorBenchmark | 25-07-2026 | `[ZWAK]` |
| **USD 29/mnd (Team Member) resp. USD 55/mnd (Enterprise)** | SaaS-tiers | PricingNow | 25-07-2026 | `[ZWAK]` — SEO-aggregator; "tier"-namen komen niet overeen met Broadcom's eigen licentietypen; **behandel als onbetrouwbaar** |
| **USD 500K jaar 1 (installatie + kickoff), daarna USD 200K/jaar** | on-premise implementatie bij één klant | PeerSpot-consultant | 25-07-2026 | `[SECUNDAIR]` — één datapunt |
| **~USD 150.000/jaar voor 100 gebruikers** (= USD 1.500/gebruiker/jaar) | concurrentievergelijking | vermeld in aggregatie van alternatieven-artikelen | 25-07-2026 | `[ZWAK]` |
| Abonnementsovergang **verdubbelde** het eerdere jaarlijkse onderhoudsbedrag | verlenging | PeerSpot-reviewer (na onderhandeling gemitigeerd) | 25-07-2026 | `[SECUNDAIR]` |

### 3.4 Interpretatie `[SCHATTING]`

Wegend over de bronnen — waarbij de klantuitspraken op PeerSpot en de SelectHub-notering het zwaarst wegen en de SEO-aggregators het lichtst — is een realistische bandbreedte:

- **Full Function User, SaaS:** ruwweg **USD 50–120 per gebruiker per maand** (**USD 600–1.450 per gebruiker per jaar**) vóór korting; na volumekorting in grote deals eerder **USD 40–70/maand**.
- **Restricted / View Only:** substantieel goedkoper (vaak een fractie van een full user), maar geen enkele bron geeft harde bedragen. Dit is precies de reden dat organisaties Clarity vaak breed uitrollen als *urenregistratie*-tool met weinig full users.
- **Realistische instap-jaarcontracten:** **USD 100.000–200.000** voor een middelgrote uitrol; grote enterprises **USD 300.000–800.000+** per jaar.
- **Minimumzetels — gecorrigeerd.** Voor Full Function en Restricted Users publiceert Broadcom geen minimum (aantallen staan per deal in het Transaction Document). Maar voor **View Only geldt wél een gepubliceerd, contractueel minimum: licenties worden verkocht per "Pack" van 100 gebruikers** (Broadcom SPD). De eerdere formulering "geen gepubliceerd minimum aantal zetels" was dus onjuist. Los daarvan maakt de dealstructuur (accountverkoop, enterprise-onderhandeling) Clarity **de facto ontoegankelijk onder ±50–100 gebruikers**.
- **Maandelijks vs. jaarlijks:** SelectHub noteert het startbedrag als *"$60 Per User, Monthly"*, maar géén bron bevestigt of dat een maandelijks factureerbaar abonnement is dan wel een maandequivalent van een jaarcontract. Gezien de enterprise-dealstructuur (meerjarige Transaction Documents) is **jaarlijkse of meerjarige facturering veel waarschijnlijker**; behandel alle "per maand"-bedragen in dit profiel als *rekeneenheid*, niet als factureringsritme. `[SCHATTING]`
- **On-premise eeuwigdurend bestaat nog.** Onafhankelijk bevestigd door een PeerSpot-klantuitspraak: *"if you are on-premises, you can buy a perpetual license"* — dit stond eerder alleen op een `[ZWAK]`-aggregator. `[SECUNDAIR]`
- **Bijkomende, vaak onderschatte kosten:** implementatie/configuratie door een partner (3–6 maanden, gespecialiseerde consultants — zie §5), datamigratie, integratiebouw (Jira!), rapportagemigratie (**Jaspersoft verdwijnt in 16.4.3**), training, en doorlopend administratiebeheer. Meerdere bronnen schatten dat de dienstverlening in jaar 1 in dezelfde orde van grootte ligt als de licentiekosten zelf `[SCHATTING]`.

### 3.5 Add-ons

Bekende afzonderlijk gelicentieerde of afzonderlijk te implementeren onderdelen: **Earned Value Manager (EVM)**, **MSP/Open Workbench Schedule Connect-connector**, **Rally** (agile, apart product), **ConnectALL** (integratie, apart product), **Insights** (analytics), geavanceerde rapportage/datawarehouse. VendorBenchmark suggereert een modulaire prijsopbouw — Portfolio Management 35–40% van de kosten, Project Management 25–30%, Resource Management 20–25%, Financial Management 15–20% `[ZWAK]`. Dat is niet te verifiëren en dient uitsluitend als indicatie dat Clarity **modulair geprijsd** is: je koopt niet automatisch alles.

---

## 4. VOORDELEN

1. **Er zit een echte CPM-engine in — geen nep-Gantt.** Autoschedule doet een gedocumenteerde voorwaartse en achterwaartse pass, berekent early/late start en finish, total float (LS − ES) en markeert het kritieke pad bij float = 0, met een optie voor aparte kritieke paden per subnet. Alle vier relatietypen (FS/SS/FF/SF) met lag worden ondersteund, ook tussen projecten. Dat plaatst Clarity boven vrijwel alle "enterprise work management"-tools. `[HARD]`

2. **Resource- en capaciteitsmanagement op portfolioniveau is de topklasse.** Rollen-vóór-namen, skills, OBS, capaciteit-vs-vraag per periode, en resource-constrained scheduling. Dit is consistent het meest geprezen onderdeel in reviews; PeerSpot noemt het het kernsterkpunt en stelt dat zelfs ServiceNow SPM en Microsoft Project *"lack Clarity's resource management depth"*. `[SECUNDAIR]`

3. **Financieel model dat verder gaat dan planningstools.** Cost plans/budget plans met plan of record, multi-currency, tarieven- en kostenmatrices, chargebacks, CapEx/OpEx, en een volwaardige **Earned Value Manager** met EAC/ETC en EVM-contracten die geschikt zijn voor Amerikaanse federale programmacompliance. Voor organisaties die investeringen moeten verantwoorden is dit een echte differentiator. `[HARD]`

4. **Bewezen schaal op organisatieniveau.** Klanten en consultants melden implementaties van 50 tot **200.000 gebruikers** (concrete eigen implementaties in de reviews: ~2.000, piek 10.000, en ~20.000 gebruikers), met *"99.9% uptime"* en algemene stabiliteit. Weinig PPM-producten hebben dit trackrecord. Kanttekening: het cijfer 200.000 komt uit één consultant-uitspraak over diens klantenbestand, niet uit een geverifieerde referentie-implementatie. `[SECUNDAIR]`

5. **Onbeperkte baselines met vergelijkweergave.** Je kunt willekeurig veel projectbaselines vastleggen en in de Modern UX Timeline direct tegen de actuele planning zetten — zonder extra rechten. Voor voortgangs- en afwijkingsanalyse is dat solide. `[HARD]`

6. **Volwassen, hiërarchisch kalendermodel.** Base calendars als sjabloon met parent-child-overerving, tot vier shifts per dag, werk-/niet-werkdagen per datum of weekdagpatroon, en aparte resource- en rolkalenders die FTE, beschikbaarheid en capaciteit voeden. Dit is een echte kalenderengine, geen "weekend uit"-checkbox. `[HARD]`

7. **Rijke, open integratielagen.** **XOG** (SOAP/XML Open Gateway) voor bulk-in/uitvoer van vrijwel elk object, een officieel ondersteunde **REST API**, **OData**-endpoints op het datawarehouse voor Power BI/Tableau, **SCIM** voor gebruikersprovisioning, sFTP en GEL-scripting. Voor een enterprise-integratielandschap is dat ruim voldoende gereedschap. `[HARD/SECUNDAIR]`

8. **Erkende marktpositie.** Broadcom is **Leader** in het *Gartner Magic Quadrant for Strategic Portfolio Management* (augustus 2025), op zowel Completeness of Vision als Ability to Execute. PeerSpot geeft Clarity **9,6% mindshare** in PPM (rang 3) en een 91%-aanbeveling over 143 reviews. `[SECUNDAIR]`

9. **Deploymentkeuze blijft bestaan.** Zowel SaaS als on-premise, met Oracle, SQL Server én PostgreSQL. Voor organisaties met datasoevereiniteits- of regelgevingseisen (overheid, defensie, bank/verzekeraar) is de on-premise-optie nog steeds beschikbaar — bij veel concurrenten niet meer. `[SECUNDAIR]`

10. **Serieuze AI-investering, inclusief open protocollen.** Vaia (AI-assistent) met native ondersteuning voor Anthropic-modellen, een prompt-bibliotheek, en sinds 16.4.2 een **MCP-server** waarmee externe AI-clients (Claude Desktop, Cursor) via natuurlijke taal met Clarity kunnen werken. Broadcom kiest hier voor een open standaard in plaats van een gesloten assistent. `[SECUNDAIR]`

---

## 5. NADELEN

1. **De gebruikersinterface is het meest genoemde probleem, structureel.** SelectHub meet dat **88% van de reviewers** vindt dat *"the user interface is outdated, and navigation is cumbersome"*. PeerSpot noemt de UI *"one of the major pain points"*. Capterra geeft Clarity een **ease-of-use-score van 3,4/5** tegenover 4,2/5 overall — precies de kloof tussen "krachtig" en "bruikbaar". Reviewers noemen *"too many options on screens"* en gebrekkige mobiele functionaliteit. `[SECUNDAIR]`

2. **Prijs wordt breed als te hoog ervaren, en verlengingen zijn een risico.** **85%** van de SelectHub-reviewers noemt het aanbod *"too expensive"*. Een reviewer meldt dat de abonnementskosten *"was double what we paid in the past as the yearly maintenance"*; anderen noemen *"the cost per user is very high"* en *"lack of transparency from Broadcom in terms of licensing expenses"*. Organisaties beperken bewust het aantal Clarity-licenties omdat ze duurder zijn dan Jira. `[SECUNDAIR]`

   **Nuancering na verificatie:** het beeld is niet unaniem. Op dezelfde PeerSpot-prijspagina staan ook uitspraken als *"competitive and not expensive"*, *"price is in the market range"* en *"It is not the cheapest option, but definitely worth the price"*. Capterra scoort *value for money* op **3,8/5** — matig, niet rampzalig. De eerder genoteerde claim "PeerSpot-gebruikers geven prijs-kwaliteit een 3–4 op 10" is **niet terug te vinden** op de geraadpleegde PeerSpot-pagina's en is uit dit profiel verwijderd. `[ONZEKER — niet geverifieerd]`

3. **Broadcom-risico is reëel, niet hypothetisch.** Broadcom schrapte na de CA-overname naar schatting **40% van het personeel**; bij VMware voerde het abonnementsdwang, minimumafnames en forse verlengverhogingen door. Partners melden voor Clarity *"steadily increased licensing and maintenance fees"* zonder evenredige productverbetering en dat *"regional support teams have moved offshore"* met tragere responstijden. Wie nu tekent, tekent bij een leverancier met een gedocumenteerd patroon van waarde-extractie uit bestaande klantenbestanden. `[SECUNDAIR]`

4. **Zeer steile leercurve en zware implementatie.** **100%** van de SelectHub-reviewers die de leercurve noemen, vinden het product *"difficult to learn"*. PeerSpot meldt een initiële inrichting van **3–6 maanden met gespecialiseerde consultants**, oplopend met de mate van maatwerk. Er is een hele partner-industrie (Rego, itdesign, Winmill, Tricise) die louter van Clarity-implementaties bestaat — dat is geen toeval. `[SECUNDAIR]`

5. **De planningsengine is ondiep voor echte schedulers.** Constraints zijn zacht: Autoschedule *"overrides this rule if it violates a dependency or over-allocates a resource"*. Geen aangetoonde retained logic/progress override, geen relatie-lagkalenders, en de bekende KB-fout waarbij Max Load 100% + Uniform-loading + resource constraints *"pushes task dates and ETC out and changes task duration"*. Een Reddit-gebruiker in r/projectmanagement vat het samen: *"Out of the box scheduling and resource management features in Clarity are not great."* `[HARD/SECUNDAIR]`

6. **Praktische schaal per project is laag.** Broadcom-consultants adviseren **niet meer dan ~100 taken per project**; projecten met 1.000+ taken bestaan maar zijn de uitzondering; Broadcom's eigen KB behandelt 4.500–7.500 taken als een prestatiecasus **zonder benchmarks**. Voor een bouw- of engineeringschema is dit onbruikbaar. `[HARD]`

7. **Integratie met Jira is een bekend pijnpunt.** Meerdere PeerSpot-reviewers: *"The integration between Broadcom Clarity and Atlassian Jira is very cumbersome and not straightforward."* Ook mét ConnectALL blijft het volgens gebruikers beperkt effectief. In hybride organisaties waar de uitvoering in Jira zit en de governance in Clarity, is dit de meest voelbare dagelijkse frictie. `[SECUNDAIR]`

8. **Rapportage is een doorlopend probleem — en verandert nu opnieuw.** De Jaspersoft-integratie wordt door reviewers *"painful"* en beperkend genoemd voor geavanceerde analyse. Erger: **Jaspersoft wordt verwijderd in 16.4.3** (sept. 2026 voor SaaS), wat betekent dat iedereen met eigen Jaspersoft-rapporten een **verplichte migratie** voor de boeg heeft. Een Reddit-gebruiker beschrijft *"hours creating manual, custom executive reports"* na zes maanden Modern UX. `[SECUNDAIR]`

9. **Twee UI's, één product — de migratie is niet triviaal.** Classic en Modern UX zijn volgens partners *"two distinct entities"*, geen skin. Functies zitten historisch verspreid (de diepste projectfunctionaliteit zat in Classic). Klanten zitten daardoor jarenlang in een dubbele wereld met dubbele training en gedeeltelijke functiepariteit. `[SECUNDAIR]`

10. **Batch- in plaats van realtime-architectuur, en exportfrictie.** Capaciteits- en beschikbaarheidscijfers worden pas actueel na de **Time Slicing Job**; rapportage draait op een apart datawarehouse. Eén reviewer noemt de voortgangsopvolging *"not real-time"* met handmatige verificatie. CSV-exports boven **500 rijen** gaan asynchroon naar een achtergrondjob met notificatie en bestanden die na **7 dagen verlopen** — voor mensen die dagelijks data eruit trekken is dat hinderlijk. `[HARD/SECUNDAIR]`

11. **Lage feitelijke adoptie is een veelvoorkomend faalpatroon.** Meerdere bronnen melden dat Clarity in de praktijk vaak verwordt tot *"just a time-tracking tool"* in plaats van echt portfoliomanagement. De combinatie van hoge licentiekosten, zware UI en steile leercurve maakt dat teamleden het minimaal gebruiken — waardoor de data die het portfoliomanagement zou moeten voeden onbetrouwbaar wordt. `[SECUNDAIR]`

---

## 6. Interoperabiliteit

### 6.1 Overzicht per formaat

| Formaat / kanaal | Ondersteund? | Toelichting |
|---|---|---|
| **XER (Primavera)** | **Nee** — geen enkel bewijs gevonden | Uitwisseling met P6 vereist maatwerk (XOG/REST) of een derde-partij-connector |
| **P6 XML / Primavera XML** | **Nee** — geen enkel bewijs gevonden | Idem |
| **MPP (Microsoft Project)** | **Ja, via connector** | *Schedule Connect* / MSP-connector, in x86- en x64-varianten; installatie lokaal, via netwerkshare, silent of push-deployment. Round-trip van taken met *"flexible import and export capabilities, so you can control the Tasks you save between Clarity and MSP"* `[HARD]` |
| **MSPDI / Microsoft Project XML** | **Waarschijnlijk indirect** via MSP zelf; niet als native Clarity-formaat gedocumenteerd `[SCHATTING]` | De koppeling loopt via de MSP-client, niet via bestandsuitwisseling |
| **Open Workbench (RMP)** | **Ja** | Meegeleverde open-source desktop-scheduler uit de Niku-erfenis; zelfde Schedule Connect-mechanisme |
| **CSV** | **Ja**, met beperkingen | UI-export: ≤500 rijen direct, daarboven asynchroon met job-ID (`jobid_viewname.csv`), notificatie via belletje, bestand **7 dagen** beschikbaar. Import beperkter dan export. `[HARD]` |
| **Excel / PDF / PPTX** | **Ja** (rapportage) | Sinds 16.4.2 ook losse tabellen naar Excel en uitklapbare boomstructuren naar PDF/PPTX `[SECUNDAIR]` |
| **IFC 4.3 / IfcWorkSchedule / IfcTask** | **Nee. Volledig afwezig.** | Grondig gezocht: **geen enkele** verwijzing naar IFC, BIM, buildingSMART, BCF, IDS of 4D-planning in Clarity-documentatie, releasenotes, partnermateriaal of reviews. Er is geen roadmapaanwijzing dat dit ooit komt. |
| **XOG (XML Open Gateway)** | **Ja** — de historische ruggengraat | SOAP/XML-interface voor bulk-lees/schrijf op vrijwel elk Clarity-object (projecten, taken, relaties, resources, toewijzingen, financiën). Krachtig maar verbose en versiegevoelig |
| **REST API** | **Ja, officieel ondersteund** | Broadcom ondersteunt REST inmiddels formeel; volgens praktijkbronnen kan *"most of the data that needs to be manipulated"* via REST zonder terug te vallen op XOG `[SECUNDAIR]` |
| **GraphQL** | **Nee** — geen enkel bewijs gevonden |  |
| **OData** | **Ja** | REST(OData)-endpoints op het datawarehouse; *"SaaS customers can access the data warehouse and develop analytics dashboards and reports"* — gebruikt voor Power BI en Tableau `[HARD]` |
| **SCIM** | **Ja** | Gebruikers-/groepsprovisioning vanuit IdP |
| **sFTP** | **Ja** | Bulk-bestandsuitwisseling |
| **MCP (Model Context Protocol)** | **Ja, nieuw in 16.4.2** | MCP-server waarmee externe AI-assistenten met Clarity praten; eerste scope = urenregistratie-workflows `[SECUNDAIR]` |
| **Jira** | **Ja, maar problematisch** | Native koppeling plus ConnectALL; door reviewers herhaaldelijk *"cumbersome and not straightforward"* genoemd `[SECUNDAIR]` |
| **Rally** | **Ja** | Zusterproduct binnen ValueOps; strakste integratie in het portfolio |

### 6.2 Betekenis voor een open-source, IFC-gebaseerde planner

Dit is voor de opdrachtgever het meest relevante deel van dit profiel, dus expliciet:

- **Clarity is geen concurrent op IFC-terrein.** Er is geen IFC-ondersteuning, geen BIM-ondersteuning, geen 4D-koppeling, geen buildingSMART-lidmaatschap dat in het materiaal opduikt. Clarity's "constructie"-klanten gebruiken het voor **investerings- en programmagovernance**, niet voor werkvoorbereiding of uitvoeringsplanning.
- **Clarity is wél een potentiële *bovenliggende* laag.** Een realistisch scenario voor een bouwbedrijf is: uitvoeringsschema's in P6/Asta/een IFC-planner, portfolio- en financiële governance in Clarity, gekoppeld via CSV/REST/XOG. Een open-source IFC-planner die **XER- en MSPDI-export** kan én een nette CSV/REST-uitvoer heeft, kan in zo'n landschap prima naast Clarity leven zonder ermee te concurreren.
- **De integratieroute is haalbaar maar niet gratis.** Zonder XER/P6 XML moet een koppeling met Clarity via **XOG of REST** worden gebouwd, waarbij het datamodel (investment → phase → summary task → detail task, met assignments en cost plans) gemapt moet worden op IfcWorkSchedule/IfcTask/IfcTaskTime. Dat is een reëel project, geen bestandsexport. `[SCHATTING]`
- **Praktisch advies:** wie compatibiliteit met de PPM-wereld wil, wint meer met **MSPDI (Microsoft Project XML)** dan met een Clarity-specifieke koppeling — Clarity's eigen brug naar de planningswereld loopt óók via Microsoft Project.

---

## 7. Marktpositie

### 7.1 Positie en erkenning

- **Gartner Magic Quadrant for Strategic Portfolio Management (augustus 2025): Leader.** Geverifieerd bij beide bronnen: Broadcom's **eigen** aankondiging (11 augustus 2025) spreekt letterlijk van *"a Leader in the 2025 Gartner® Magic Quadrant™ for Strategic Portfolio Management"* voor het **tweede opeenvolgende jaar**; partner Tricise claimt *"its fifth consecutive year in this position"*. **Aanhouden: "tweede opeenvolgende jaar"** — dat is de primaire bron (de leverancier zelf), en een leverancier onderschat zijn eigen trackrecord niet; de "vijfde" van de partner slaat vermoedelijk op voorgangers van de MQ onder andere namen. Planview is in dezelfde MQ eveneens Leader en claimt bovendien *"the highest and furthest position in both Completeness of Vision and Ability to Execute indices"* — Broadcom is dus Leader, maar niet de best geplaatste. `[HARD/SECUNDAIR]`
- **PeerSpot:** rang **3** in Project Portfolio Management met **9,6% mindshare — dalend, van 10,1% een jaar eerder**, gemiddelde score **8,0** (= 4,0/5), **143 reviews**, **91% aanbeveling**. De dalende mindshare ondersteunt de "stabiel-tot-erosief"-conclusie in §7.4. Ter vergelijking: Smartsheet 4,6% mindshare; Primavera P6 Enterprise staat op PeerSpot op rang 35 met 0,7% mindshare (dat zegt vooral iets over PeerSpot's IT-georiënteerde publiek, niet over P6's echte marktpositie in de bouw). `[SECUNDAIR]`
- **SelectHub:** rang **11** in PPM-software — merkbaar lager dan PeerSpot, wat de spreiding tussen bronnen illustreert. `[SECUNDAIR]`
- **Reviewvolumes:** Gartner Peer Insights **271 reviews**, G2 **91 reviews**, PeerSpot **143 reviews**, Capterra slechts **12 reviews** (4,2/5 overall, 3,4/5 ease of use — let op: de Capterra-listing staat nog onder "CA PPM" en is dun bezet). `[SECUNDAIR]`
- **Klantaantallen:** TheirStack noemt **3.475 bedrijven** die Clarity PPM gebruiken `[ZWAK]`. Broadcom publiceert zelf geen klant- of gebruikersaantallen, en geen omzetsplitsing voor Clarity — het valt onder de Infrastructure Software-divisie zonder aparte rapportage. `[HARD — afwezigheid van data]`

### 7.2 Waar Clarity sterk staat, en waarom

1. **Grote, gereguleerde, financieel gedreven organisaties.** Bank/verzekering, telecom, farma, overheid. Daar wint Clarity op het financiële model, EVM, auditbaarheid en on-premise-optie.
2. **IT-portfolio's en het CIO-office.** De van oorsprong CA-installed base is diep verankerd in IT-afdelingen; Clarity is daar vaak het systeem waar het IT-investeringsbudget doorheen loopt.
3. **Amerikaanse federale programma's.** De EVM Contracts-functionaliteit is specifiek gebouwd voor Amerikaanse overheidscompliance — een niche waar weinig alternatieven zijn.
4. **Zeer grote gebruikerspopulaties.** Waar tienduizenden mensen uren moeten schrijven tegen investeringen, schaalt Clarity aantoonbaar.
5. **Resource-capaciteitsplanning over een heel bedrijf.** Consistent het best beoordeelde onderdeel.

### 7.3 Belangrijkste concurrenten

| Segment | Concurrenten |
|---|---|
| **Directe SPM/PPM-concurrenten** | **Planview** (Portfolios, AdaptiveWork; ook MQ-Leader, nam Sciforma over), **ServiceNow SPM** (sterkste groeier, wint op platformconsolidatie), **Planisware** (R&D/NPD-zwaartepunt), **Triskell**, **Sciforma**, **Celoxis** |
| **Platformbedreiging van onderaf** | **Atlassian** (Jira + Jira Align), **Smartsheet**, **Adobe Workfront**, **monday.com**, **Asana**, **Microsoft Planner Premium / Project for the web** |
| **Klassieke CPM-tools (ander segment)** | **Oracle Primavera P6**, **Microsoft Project**, **Asta Powerproject**, **Deltek Acumen/Open Plan** — deze concurreren nauwelijks met Clarity; ze worden er vaker náást gebruikt |

De scherpste positioneringszin die ik in het onderzoek vond, komt van SelectHub en is precies raak: *"Pick Primavera P6 if you're running heavy construction, engineering, or oil and gas schedules and need deep critical-path control. Pick Clarity PPM if your focus is portfolio-level financials, resource planning, and investment analysis across a mix of projects."* `[SECUNDAIR]`

### 7.4 Trend

Het beeld is **stabiel-tot-erosief**, niet groeiend:

- **Positief:** het Gartner-Leaderschap houdt stand; Broadcom investeert zichtbaar in AI (Vaia, MCP-server) en rapportagevernieuwing; de installed base is groot en plakkerig door diepe maatwerkconfiguratie.
- **Negatief:** Broadcom's overnamemodel drijft klanten actief naar alternatievenonderzoek — er bestaat een hele contentindustrie rond "Clarity PPM alternatives". De genoemde drijfveren zijn steeds dezelfde: stijgende licentiekosten, verouderde UI, offshore support, en dure migratie naar SaaS. ServiceNow SPM is de meest gevaarlijke concurrent omdat het meelift op een platform dat de klant toch al heeft.
- **Structureel:** de PPM-markt beweegt naar SPM (strategie-gedreven) en naar geïntegreerde platformen. Clarity zit qua visie goed in die beweging; de vraag is of de uitvoering (UI, kosten, adoptie) klanten vasthoudt.

**Eigen inschatting `[SCHATTING]`:** Clarity behoudt de komende 3–5 jaar zijn positie bij de grootste, meest gereguleerde klanten, maar verliest gestaag terrein in het middensegment aan ServiceNow, Planview en lichtere platformen. Het is een cash-cow-profiel: hoge marges op een verankerde basis, weinig netto-nieuwe logo's.

---

## 8. Eindoordeel

### Voor wie wél

- **Enterprises (1.000+ medewerkers) met een volwassen EPMO** die honderden tot duizenden investeringen moeten besturen op geld, capaciteit en strategische bijdrage.
- **Financieel zwaar gereguleerde sectoren** — bank, verzekering, farma, nuts, overheid — waar auditeerbaarheid, CapEx/OpEx-splitsing en EVM belangrijker zijn dan planningsdiepte.
- **Amerikaanse federale programma's** met EVM-compliance-eisen.
- **Organisaties met een grote resourcepool** waar capaciteit-vs-vraag over honderden rollen de kernvraag is.
- **Bestaande CA/Clarity-klanten** met diepe maatwerkconfiguratie — voor hen is blijven bijna altijd goedkoper dan migreren, ook al is het niet leuk.

### Voor wie niet

- **Bouw, infrastructuur, engineering, offshore, scheepsbouw.** De praktische taaklimiet (~100 per project als richtlijn, 7.500 als uitzondering) en de zachte constraints maken Clarity ongeschikt voor uitvoeringsplanning. Gebruik P6, Asta Powerproject of een gespecialiseerde tool — en Clarity hooguit als bovenliggende investeringslaag.
- **Iedereen die contractuele vertragingsanalyse doet.** Zonder harde constraints, zonder aantoonbare retained logic/progress override en zonder XER-uitwisseling is Clarity niet forensisch bruikbaar.
- **Het MKB en snelgroeiende bedrijven.** De prijsstelling (indicatief USD 50–120 per full user per maand, plus een implementatie van 3–6 maanden met consultants) en de dealstructuur maken het onder ±50–100 gebruikers onrealistisch.
- **Organisaties die adoptie boven compleetheid stellen.** Als je twijfelt of teamleden een tool gaan gebruiken, is Clarity de verkeerde gok — het bekende faalpatroon is dat het verwordt tot een dure urenregistratie.
- **Agile-first organisaties.** Rally of Jira Align passen beter; Clarity's agile-verhaal loopt via een zusterproduct.
- **Wie een IFC/BIM-gebaseerde workflow bouwt.** Nul raakvlak. Clarity begrijpt geen enkel bouwstandaardformaat.

### Is dit een serieus alternatief voor klassieke CPM-tools?

**Nee — en dat is ook niet de bedoeling.** Clarity heeft een echte CPM-engine, en dat verdient erkenning: het is aantoonbaar meer dan de balkenschema-tekentools die zich als planningssoftware voordoen. Alle vier relatietypen met lag, een gedocumenteerde forward/backward pass, float, kritiek pad, hiërarchische kalenders, resource-constrained scheduling, onbeperkte baselines — dat is een respectabele feature-set.

Maar de engine is een **ondersteunende component in een portfolio-tool**, geen planningsproduct. De signalen zijn eenduidig:

1. Broadcom levert al twintig jaar een **externe scheduler** mee (Microsoft Project of Open Workbench) voor wie serieus wil plannen. Dat is een leverancier die zijn eigen engine relativeert.
2. Het eigen ecosysteem adviseert **~100 taken per project**.
3. Constraints zijn **zacht** en wijken voor logica en resourcebeschikbaarheid.
4. Kernbegrippen van professionele scheduling — retained logic, progress override, activiteitkalenders op relaties, XER-uitwisseling — ontbreken.

**Praktische conclusie voor de opdrachtgever.** Clarity is voor een open-source, IFC-gebaseerde planner **geen concurrent maar een potentiële buurman in het landschap**. De relevante lessen die eruit te trekken zijn:

- Een **echte CPM-engine met alle vier relatietypen, lags, float en een gepubliceerd-vs-tentatief schema** is de ondergrens van geloofwaardigheid — Clarity haalt die, veel "moderne" tools niet.
- Clarity's **tentative/publish-model** (voorlopig herplannen, vergrendelen, publiceren of verwerpen) is een elegant patroon dat het overwegen waard is.
- Clarity's **zachte constraints** zijn een waarschuwing: als je constraints implementeert, maak ze hard en toon negatieve float, anders is de planning niet contractueel bruikbaar.
- Op **schaal** is er ruimte: Clarity valt om bij duizenden taken per project. Een planner die 10.000+ taken vlot rendert en berekent, heeft daar een concreet, meetbaar voordeel.
- Op **interoperabiliteit** ligt de winst bij **MSPDI en XER**, niet bij een Clarity-koppeling — ook Clarity's eigen brug naar de planningswereld loopt via Microsoft Project.

---

## Bronnen

### Leverancier en officiële documentatie (primair)

1. Broadcom — Clarity productpagina, ValueOps: <https://valueops.broadcom.com/products/clarity> (geraadpleegd 25-07-2026)
2. Broadcom — *"Broadcom Named a Leader in the 2025 Gartner Magic Quadrant for SPM"*: <https://valueops.broadcom.com/blog/broadcom-named-a-leader-in-the-2025-gartner-magic-quadrant-for-spm> (geraadpleegd 25-07-2026)
3. Broadcom TechDocs — *Automatically Create Project Schedules with Autoschedule* (Clarity 16.3.0, Classic): <https://techdocs.broadcom.com/us/en/ca-enterprise-software/business-management/clarity-project-and-portfolio-management-ppm-on-premise/16-3-0/Using-Classic-Clarity-PPM/project-management/project-schedules-in-the-gantt-view/automatically-create-project-schedules-with-autoschedule.html>
4. Broadcom TechDocs — *Working with Autoschedule* (Clarity 16.2.3, Modern UX): <https://techdocs.broadcom.com/us/en/ca-enterprise-software/business-management/clarity-project-and-portfolio-management-ppm-on-premise/16-2-3/using/new-user-experience-create-open-and-view-projects/projects--investment-phases--milestones--tasks--and-to-do-items/working-with-autoschedule.html>
5. Broadcom TechDocs — *Managing Tasks in Timeline Layout* (Clarity 16.2.3): <https://techdocs.broadcom.com/us/en/ca-enterprise-software/business-management/clarity-project-and-portfolio-management-ppm-on-premise/16-2-3/using/new-user-experience-create-open-and-view-projects/projects--investment-phases--milestones--tasks--and-to-do-items/managing-tasks-in-timeline-layout.html>
6. Broadcom TechDocs — *Configure Base Calendars, Shifts, and Work Days* (Clarity 16.4.0): <https://techdocs.broadcom.com/us/en/ca-enterprise-software/business-management/clarity-project-and-portfolio-management-ppm-on-premise/16-4-0/Using-Classic-Clarity-PPM/resource-management/configure-base-calendars-shifts-and-work-days.html>
7. Broadcom TechDocs — *Integrate Clarity with Microsoft Project (MSP) or Open Workbench (OWB)* (16.3.3): <https://techdocs.broadcom.com/us/en/ca-enterprise-software/business-management/clarity-project-and-portfolio-management-ppm-on-premise/16-3-3/add-ins-and-integrations/integrate-clarity-ppm-with-microsoft-project-msp-or-open-workbench-owb.html>
8. Broadcom TechDocs — *Create Project Baselines*: <https://techdocs.broadcom.com/us/en/ca-enterprise-software/business-management/clarity-project-and-portfolio-management-ppm-on-demand/15-6/using/getting-started-with-classic-ppm/project-management/create-projects-teams-and-tasks/create-project-baselines.html>
9. Broadcom TechDocs — *Configure OData Access to the Data Warehouse*: <https://techdocs.broadcom.com/us/en/ca-enterprise-software/business-management/clarity-project-and-portfolio-management-ppm-on-demand/15-6-1/administration/configure-the-data-warehouse-and-advanced-reporting/configure-odata-access-to-the-data-warehouse.html>
10. Broadcom TechDocs — *Add-in: Earned Value Manager (EVM)*: <https://techdocs.broadcom.com/us/en/ca-enterprise-software/business-management/clarity-project-and-portfolio-management-ppm-on-demand/15-6-1/add-ins-and-integrations/add-in-earned-value-manager-evm.html>
11. Broadcom Knowledge — *Export to CSV using Clarity UI* (art. 204141): <https://knowledge.broadcom.com/external/article/204141/export-to-csv-using-clarity-ui.html>
12. Broadcom Knowledge — *MSP: limit on number of tasks for performance* (art. 213970): <https://knowledge.broadcom.com/external/article/213970/msp-limit-on-number-of-tasks-for-perform.html>
13. Broadcom Knowledge — *Autoscheduling without resource constraints* (art. 266690): <https://knowledge.broadcom.com/external/article/266690/autoscheduling-without-resource-constrai.html>
14. Broadcom Knowledge — *OWB or Gantt autoscheduling with Uniform loading pattern* (art. 29379): <https://knowledge.broadcom.com/external/article/29379/owb-or-gantt-autoscheduling-with-unifor.html>
15. Broadcom Community — discussie over maximaal aantal taken per project: <https://community.broadcom.com/communities/community-home/digestviewer/viewthread?mid=798748>
16. Broadcom Community — *General Availability Announcement for Clarity Release 16.4.2* (GA 11 mei 2026; support t/m 30-11-2028; EOL-aankondiging CA Business Intelligence): <https://community.broadcom.com/discussion/general-availability-announcement-for-clarity-release-1642>
16a. **Broadcom — *Specific Program Documentation: Clarity* (april 2023)** — het contractuele licentiedocument met de definities van Full Function / Restricted / View Only User en de "Pack of 100 View Only Users": <https://ftpdocs.broadcom.com/cadocs/0/contentimages/SPD_Clarity_April_2023.pdf> `[HARD — primair]`
16b. Broadcom Support — *Product Advisory 36023: End of Life CA Business Intelligence for Clarity* (*"removed as part of the production 16.4.3 upgrade scheduled for September 11, 2026"*): <https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/ProductAdvisories/0/36023>
16c. Broadcom TechDocs — *Install Clarity With PostgreSQL* (16.4.1): <https://techdocs.broadcom.com/us/en/ca-enterprise-software/business-management/clarity-project-and-portfolio-management-ppm-on-premise/16-4-1/installing-and-upgrading/Install-Clarity-With-PostgreSQL.html> — plus *Install Clarity With Microsoft SQL* (idem 16.4.1) en *Hardware and Software Compatibility Specifications* (16.4.0)
16d. Broadcom Knowledge — *Licensing differences between Full, Restricted and View Only* (art. 232714, verwijst door naar de licentiedocumentatie): <https://knowledge.broadcom.com/external/article/232714/licensing-differences-between-full-restr.html>
16e. Broadcom Knowledge — *Clarity licensing change in 16.2.3* (art. 406204): <https://knowledge.broadcom.com/external/article/406204/clarity-licensing-change-in-1623.html>

### Reviews en gebruikersbronnen

17. PeerSpot — Broadcom Clarity reviews (4,0/5; 143 reviews; 91% aanbeveling): <https://www.peerspot.com/products/broadcom-clarity-reviews>
18. PeerSpot — Broadcom Clarity pricing (klantuitspraken over kosten): <https://www.peerspot.com/products/broadcom-clarity-pricing>
19. PeerSpot — Broadcom Clarity vs Primavera P6 (mindshare, rangen): <https://www.peerspot.com/products/comparisons/broadcom-clarity_vs_primavera-p6-enterprise-project-portfolio-management>
20. Capterra — Clarity / CA PPM (geverifieerd 25-07-2026: **4,2/5 overall, 12 reviews**; sub-scores **ease of use 3,4**, features 4,1, customer service 4,2, **value for money 3,8**; *"Free trial not available"*): <https://www.capterra.com/p/145502/CA-PPM/>
21. SelectHub — Clarity PPM (prijs *"Starting From $60"* per gebruiker/maand; free trial op aanvraag; 88% UI-kritiek; 85% te duur; ~100% "difficult to learn"; **rang #11** in de PPM-directory) — werkende URL: <https://www.selecthub.com/p/ppm-software/clarity-ppm/> (de eerder genoteerde `/ppm-software/clarity-ppm/` redirect/faalt)
22. SelectHub — Primavera P6 vs Clarity PPM: <https://www.selecthub.com/ppm-software/primavera-p6-vs-clarity-ppm/>
23. Reddit r/projectmanagement — *"Anyone else struggle with Clarity PPM?"*: <https://www.reddit.com/r/projectmanagement/comments/qwg18i/anyone_else_struggle_with_clarity_ppm/> *(directe fetch geblokkeerd; inhoud via zoekmachine-snippets: "Out of the box scheduling and resource management features in Clarity are not great"; "hours creating manual, custom executive reports")*
24. G2 — Clarity reviews (91 reviews; score niet ophaalbaar, pagina 403): <https://www.g2.com/products/broadcom-clarity/reviews>
25. Gartner Peer Insights — Clarity (271 reviews; score niet ophaalbaar, pagina 403): <https://www.gartner.com/reviews/product/clarity>
26. TrustRadius — Broadcom Clarity (pagina 403): <https://www.trustradius.com/products/broadcom-clarity/reviews>

### Partners, analisten en marktbronnen

27. Tricise — *Broadcom Clarity 16.4.2: AI Upgrades & MCP Server*: <https://tricise.com/clarity-16-4-2-whats-new/>
28. Tricise — *Clarity by Broadcom Recognized as Leader in Gartner MQ for SPM*: <https://tricise.com/clarity-broadcom-leader-gartner-magic-quadrant-spm/>
29. itdesign — Clarity software-overzicht (licentietypen Full/Restricted/View Only): <https://clarity.itdesign.de/en/software/>
30. Rego Consulting — *Different Migration Paths to the Modern UX*: <https://regoconsulting.com/different-migration-paths-to-the-modern-ux-clarity/>
31. Rego Consulting — *A Better Integration: Clarity PPM to Microsoft Project*: <https://info.regoconsulting.com/a-better-integration-clarity-ppm-microsoft-project>
32. Triskell Software — *Clarity PPM alternatives* (2025; kritiek op UI, kosten, offshore support): <https://triskellsoftware.com/blog/alternatives-clarity-ppm/>
33. Gartner — *Magic Quadrant for Strategic Portfolio Management*, 4 augustus 2025: <https://www.gartner.com/en/documents/6807234>
34. Planview newsroom — Leader-positie in dezelfde MQ: <https://newsroom.planview.com/planview-again-named-by-gartner-as-a-leader-in-strategic-portfolio-management/>
35. Kore1 — *VMware/Broadcom layoffs* (circa 40% personeelsreductie bij CA na de overname): <https://www.kore1.com/vmware-broadcom-layoffs-2026/>
36. Hippobyte — *Clarity PPM OData* (beperkingen van de OData-oplossing): <https://hippobyte.com/articles/clarity-ppm-odata/>

### Bronnen met lage betrouwbaarheid (uitsluitend als indicatie gebruikt, expliciet gemarkeerd)

37. VendorBenchmark — *Broadcom Clarity PPM Pricing 2026* (USD 65–120/gebruiker/maand; on-prem USD 300K–700K; 22% onderhoud; dealgroottes): <https://vendorbenchmark.com/vendors/broadcom-clarity-ppm-pricing> — **aggregator, methodologie niet verifieerbaar**
38. PricingNow — *Clarity PPM Cost 2026* (USD 29 resp. USD 55/gebruiker/maand): <https://pricingnow.com/question/clarity-ppm-cost/> — **SEO-aggregator; tiernamen komen niet overeen met Broadcom's licentiemodel; onbetrouwbaar**
39. ITQlick — Clarity PPM pricing (vanaf USD 3.000 per 10 gebruikers/jaar): <https://www.itqlick.com/clarity-ppm/pricing> — **pagina gaf 403; cijfer uit zoekresultaat**
40. TheirStack — 3.475 bedrijven die Clarity PPM gebruiken — **scraping-gebaseerde schatting**

### Methodologische kanttekening

Tijdens dit onderzoek was het WebSearch-budget van de sessie uitgeput; het onderzoek is uitgevoerd met directe WebFetch-aanroepen plus DuckDuckGo-Lite als zoekvervanger. Enkele bronnen (G2, TrustRadius, Gartner Peer Insights, ITQlick, Reddit) blokkeerden geautomatiseerde toegang (HTTP 403); van die bronnen zijn alleen review-aantallen en snippets uit zoekresultaten overgenomen, en **geen** scores die niet konden worden geverifieerd. Waar bronnen elkaar tegenspreken (Gartner-MQ "2e vs. 5e opeenvolgende jaar"; releasedatum 16.4.2 "11 mei vs. 12 juni 2026"; marktrang 3 vs. 11) is dat in de tekst benoemd in plaats van weggepoetst.

---

## Verificatie

*Adversariële fact-check, 25 juli 2026. Opzet: elke bewering actief proberen te **weerleggen** met onafhankelijke bronnen, niet bevestigen. WebSearch-budget was uitgeput; gewerkt met directe WebFetch plus DuckDuckGo-Lite als zoekvervanger. Bij twijfel is "onzeker" toegekend.*

| # | Bewering (zoals oorspronkelijk geformuleerd) | Oordeel | Bevinding en bron |
|---|---|---|---|
| 1 | Geen openbare lijstprijs; verkoop uitsluitend via accountmanagers/partners; geen gratis tier, proefversie op aanvraag | **Gecorrigeerd (deels)** | Geen lijstprijs en geen gratis tier: bevestigd — Capterra toont "Contact vendor for pricing". Broadcom's eigen SPD bevestigt dat aantallen/typen per *Transaction Document* worden vastgelegd. **Maar de proefversie is betwist:** SelectHub meldt "Free Trial", Capterra expliciet *"Free trial not available"*. Nu als onbevestigd gemarkeerd. <https://www.capterra.com/p/145502/CA-PPM/> · <https://www.selecthub.com/p/ppm-software/clarity-ppm/> |
| 2 | Drie licentietypen: Full Function User, Restricted User (teamlid/uren), View Only | **Gecorrigeerd** | Typen kloppen, maar de omschrijving van *Restricted User* was te smal. Primaire bron gevonden (Broadcom SPD, april 2023): Restricted = "view data and run reports in all licensed products", meedoen aan processen/discussies/documentdeling, "view project tasks and calendars, and **report and approve** time and project status", ideeën invoeren; alleen rapport**ontwerp** uitgesloten. Ook toegevoegd: Full Function = f/k/a Manager User, Restricted = f/k/a Team Member user. <https://ftpdocs.broadcom.com/cadocs/0/contentimages/SPD_Clarity_April_2023.pdf> |
| 3 | "Geen gepubliceerd minimum aantal zetels" | **Gecorrigeerd — dit was fout** | Broadcom publiceert wél een minimum voor één klasse: *"View Only Users are licensed per 'Pack.' A Pack of View Only Users includes 100 View Only Users."* View Only is dus niet per stuk te kopen. Voor Full/Restricted blijft gelden dat er geen gepubliceerd minimum is. Zelfde SPD-bron. |
| 4 | ~USD 50/gebruiker/maand met kortingen (PeerSpot) | **Bevestigd** | Letterlijk op de PeerSpot-prijspagina: *"about fifty dollars per month per user, although there are discounts available"*. <https://www.peerspot.com/products/broadcom-clarity-pricing> |
| 5 | USD 60/gebruiker/maand ≈ USD 720/jr (SelectHub) | **Bevestigd (met kanttekening)** | SelectHub noteert *"Starting From $60"* per gebruiker/maand. **Onzeker blijft of dit maandelijks gefactureerd wordt** dan wel een maandequivalent van een jaarcontract is; geen bron bevestigt het factureringsritme. Toegevoegd als expliciete kanttekening in §3.4. <https://www.selecthub.com/p/ppm-software/clarity-ppm/> |
| 6 | USD 65–120/mnd (VendorBenchmark), USD 3.000 per 10 gebruikers/jr (ITQlick), USD 29/55 (PricingNow) | **Onzeker — terecht als ZWAK gemarkeerd** | De sites bestaan en tonen deze cijfers in zoekresultaten, maar zijn niet verifieerbaar: ITQlick geeft HTTP 403, VendorBenchmark en PricingNow zijn methodologieloze aggregators. PricingNow's tiernamen ("Team Member", "Enterprise") komen aantoonbaar niet overeen met Broadcom's contractuele licentietypen (SPD) — de kwalificatie "onbetrouwbaar" is terecht en blijft staan. |
| 7 | Eén klantcasus USD 500K jaar 1, daarna USD 200K/jaar; abonnementsovergang verdubbelde het onderhoud | **Bevestigd** | Beide letterlijk terug te vinden: *"costs us $500K…first year. For each succeeding year, it'll cost you $200K"* en *"subscription costs…was double what we paid in the past as the yearly maintenance"*. <https://www.peerspot.com/products/broadcom-clarity-pricing> |
| 8 | Prijs breed als te hoog ervaren; "prijs-kwaliteit 3–4 op 10" op PeerSpot | **Gecorrigeerd** | Het 85%-cijfer van SelectHub is bevestigd, maar de "3–4 op 10" is **niet terug te vinden** op de geraadpleegde PeerSpot-pagina's en is verwijderd. Tegenbewijs toegevoegd: PeerSpot bevat óók *"competitive and not expensive"* en *"price is in the market range"*; Capterra scoort value-for-money 3,8/5. Het oorspronkelijke beeld was eenzijdiger dan de bronnen toestaan. |
| 9 | On-premise eeuwigdurende licentie bestaat (USD 300K–700K + 22% onderhoud) | **Deels bevestigd, deels onzeker** | Het *bestaan* van eeuwigdurende on-prem-licenties is nu onafhankelijk bevestigd door een PeerSpot-klant: *"if you are on-premises, you can buy a perpetual license"* (opgewaardeerd van ZWAK naar SECUNDAIR). De **bedragen** (300K–700K, 22%) blijven onbevestigd en `[ZWAK]`. |
| 10 | Echte CPM-engine: twee-passen forward/backward, float = LS − ES, kritiek pad bij float 0 | **Bevestigd — letterlijk in Broadcom-documentatie** | *"The first pass works forward through the network to determine the early start and early end dates… and calculates the longest duration path"*; *"The second pass works backward… starting from the investment finish date"*; *"Float is calculated using the following formula: Late Start - Early Start. Tasks with a float of zero (0) appear on the critical path."* Ook het tentative/publish-lockmodel is letterlijk bevestigd. <https://techdocs.broadcom.com/us/en/ca-enterprise-software/business-management/clarity-project-and-portfolio-management-ppm-on-premise/16-2-3/using/new-user-experience-create-open-and-view-projects/projects--investment-phases--milestones--tasks--and-to-do-items/working-with-autoschedule.html> |
| 11 | Alle vier relatietypen (FS/SS/FF/SF) met lag, cross-investment; geen relaties vanaf phases/summary tasks | **Bevestigd** | Alle vier definities letterlijk aangetroffen, inclusief lag-type/lag-waarde, *"Add External Dependency"* voor cross-investment, en *"You cannot create dependencies from phases and summary tasks."* Zelfde Timeline-layout-documentatie. |
| 12 | Praktijkrichtlijn ~100 taken per project; 1.000+ is uitzondering; timesheetlimiet 250 | **Bevestigd** | Broadcom-communitythread bevat *"PPM consultants suggest there should not be more than 100 tasks under one [project]"*, *"there is customer who defines 1000 or more tasks in project"* en de timesheetparameter van 250. <https://community.broadcom.com/communities/community-home/digestviewer/viewthread?mid=798748> |
| 13 | Implementaties van 50 tot 200.000+ gebruikers | **Gecorrigeerd (nuance)** | De bron is één consultant over zijn **klantenbestand**: *"customers ranging from 50 users to 100 to 200,000 users"* — geen geverifieerde individuele implementatie, en zonder "+". Concrete eigen implementaties in de reviews: ~2.000 (piek 10.000) en ~20.000. Ook de 99,9%-uptime-uitspraak is bevestigd. <https://www.peerspot.com/products/broadcom-clarity-reviews> |
| 14 | Gartner MQ SPM aug. 2025: Leader; "2e vs. 5e opeenvolgende jaar" onopgelost | **Bevestigd, discrepantie nu beslecht** | Broadcom's eigen aankondiging (11-08-2025) zegt **"second consecutive year"**; Tricise zegt *"fifth consecutive year"*. Primaire bron prevaleert → aanhouden: tweede jaar. Planview is eveneens Leader en claimt *"the highest and furthest position in both… indices"* — Broadcom is dus niet de best geplaatste Leader. <https://valueops.broadcom.com/blog/broadcom-named-a-leader-in-the-2025-gartner-magic-quadrant-for-spm> · <https://newsroom.planview.com/planview-again-named-by-gartner-as-a-leader-in-strategic-portfolio-management/> |
| 15 | PeerSpot rang 3, 9,6% mindshare, 143 reviews, 91% aanbeveling; Capterra 4,2 / 3,4 ease of use / 12 reviews; SelectHub rang 11 | **Bevestigd, met één toevoeging** | Alle cijfers exact bevestigd. **Nieuw feit:** de mindshare is **dalend — 9,6% tegen 10,1% een jaar eerder**, wat de erosie-these in §7.4 versterkt. Capterra-subscores toegevoegd (features 4,1; service 4,2; value 3,8). |
| 16 | Clarity 16.4.2 GA "11 mei of 12 juni 2026" (onopgelost); Jaspersoft weg in 16.4.3, sept. 2026 | **Gecorrigeerd — beide data nu hard** | Broadcom's eigen GA-aankondiging: 16.4.2 *"is now available for On-Premises and SaaS customers"* per **11 mei 2026**, support t/m 30-11-2028. De "12 juni" is geen concurrerende GA-datum. Jaspersoft-EOL is exacter dan genoteerd: *"removed as part of the production 16.4.3 upgrade scheduled for **September 11, 2026**"*, en 16.4.2 is *"the final release that will support Jaspersoft Reporting"*. <https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/ProductAdvisories/0/36023> |
| 17 | Databases: Oracle, SQL Server, PostgreSQL (gemarkeerd `[SECUNDAIR]`) | **Bevestigd — opgewaardeerd naar `[HARD]`** | Broadcom TechDocs 16.4.x heeft aparte installatiehandleidingen *Install Clarity With PostgreSQL* en *Install Clarity With Microsoft SQL*, plus Oracle-RAC in de compatibiliteitsspecificatie. |
| 18 | Broadcom nam CA over voor USD 18,9 mrd, afgerond 5 november 2018 | **Bevestigd** | Broadcom's eigen persbericht plus onafhankelijke berichtgeving (PRNewswire, TechCrunch, Axios, Newsday) bevestigen zowel het bedrag als de afrondingsdatum. <https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-completes-acquisition-ca-technologies> |
| 19 | Open Workbench wordt nog meegeleverd/gedocumenteerd | **Bevestigd voor 16.4.0, onzeker voor 16.4.2** | TechDocs 16.4.0 bevat nog *OWB: Install and Configure Open Workbench* en *OWB: Manage Projects with Open Workbench*. Voor 16.4.2 specifiek is geen bevestiging gevonden; de 16.4.2-releasenotes noemen OWB niet. Behandel "wordt nog altijd meegeleverd" als geldend t/m 16.4.0. |
| 20 | Implementatie 3–6 maanden met gespecialiseerde consultants; ~100% van SelectHub-reviewers noemt het product moeilijk te leren | **Bevestigd (leercurve) / onzeker (3–6 maanden)** | SelectHub letterlijk: *"Approximately 100% of users who mentioned the learning curve think that Clarity PPM is difficult to learn"* en 88% UI-kritiek. De **3–6 maanden implementatietijd** is niet in een primaire of onafhankelijke bron teruggevonden; blijft een PeerSpot-afgeleide indicatie. `[ONZEKER]` |

**Netto-oordeel.** Het profiel is inhoudelijk solide: de zwaarste technische claims (twee-passen CPM, vier relatietypen, ~100-takenrichtlijn, zachte constraints) zijn letterlijk in Broadcom's eigen documentatie terug te vinden, en de marktcijfers kloppen exact. De belangrijkste correcties zitten in het **licentiemodel**: er bestaat wél een gepubliceerd minimum (View Only per pack van 100), en een Restricted User heeft substantieel méér rechten dan "urenregistratie" — beide nu onderbouwd met Broadcom's contractuele *Specific Program Documentation*, een primaire bron die in het oorspronkelijke onderzoek ontbrak. Eén claim ("prijs-kwaliteit 3–4 op 10") kon niet worden teruggevonden en is verwijderd; het prijsoordeel in de reviews blijkt minder eenduidig negatief dan geschetst. De prijsschatting zelf (USD 50–120 per full user per maand) blijft overeind, maar rust nog altijd op twee bruikbare bronnen (PeerSpot, SelectHub) — geen enkele primaire bron bevestigt een bedrag, en dat blijft de grootste onzekerheid in dit profiel.
