# nPlan — diepgaand softwareprofiel

**Onderzoeksdatum:** 25 juli 2026
**Leverancier:** nPlan Limited (Verenigd Koninkrijk)
**Categorie:** AI-gedreven schedule-risicovoorspelling / project controls assurance (SaaS)
**Korte typering:** nPlan is *geen* planningspakket in de klassieke zin. Het is een cloudlaag **bovenop** bestaande CPM-planningen (Primavera P6, Asta Powerproject, MS Project) die met deep learning op ~750.000 historische planningen per activiteit een kansverdeling van de duur voorspelt en daaruit een probabilistische projectprognose afleidt. Sinds 2024–2026 is daar generatieve AI bijgekomen (schema's genereren, rapporteren, een agent).

> **Belangrijke onderzoekskanttekening vooraf.** nPlan heeft nagenoeg **geen onafhankelijke reviewvoetafdruk**. G2, Capterra, TrustRadius, SoftwareAdvice en Gartner Peer Insights leverden bij directe raadpleging óf een blokkade (HTTP 403 / captcha) óf geen productpagina op. De enige gevonden ratingindicatie is een **4,3/5 op G2** die alleen via een zoeksnippet zichtbaar was en niet direct verifieerbaar bleek; het aantal reviews is onbekend en vermoedelijk zeer laag (schatting: enkele tientallen of minder). Reddit- en Planning-Planet-discussies noemen nPlan wel, maar zonder gebruikerservaringen van diepte. Onderstaande **nadelen** zijn daarom overwegend afgeleid uit (a) nPlans eigen documentatie en contractvoorwaarden, (b) de productarchitectuur en (c) het enige gevonden openbare aanbestedingsdossier — niet uit een grote reviewpool. Dat is expliciet gemarkeerd waar relevant.

---

## 1. Wat het is

### Leverancier, historie en eigendom

| Item | Gegeven | Bron |
|---|---|---|
| Juridische entiteit | NPLAN LIMITED, company number **11043916** | Companies House |
| Opgericht | **2 november 2017**, Londen | Companies House / nplan.io/our-story |
| HQ | Second Home Spitalfields, 68–80 Hanbury Street, London E1 5JL | nplan.io footer |
| Oprichters | **Dev Amratia** (CEO) en **Alan Mosca** (CTO), ontmoet via Entrepreneur First | nplan.io/our-story |
| Seed | 2018 | nplan.io/our-story |
| Series A | **$18,5 mln**, geleid door **GV (Google Ventures)**, 2021 | nplan.io/our-story |
| Series B | **$16 mln / £11,9 mln**, 17 okt 2025; lead: **CapHorn, Chevron Technology Ventures, Suffolk Technologies**; mee: GV, Pentech Ventures, LocalGlobe | nplan.io persbericht; Digital Construction Plus |
| Totaal opgehaald | ca. **$36,5 mln** over ~7 rondes (aggregatorgegeven, niet primair geverifieerd) | TheCompanyCheck via zoekresultaat |
| Waardering | ca. **$70 mln** — *alleen aggregatorclaim, ongeverifieerd, behandel als onbetrouwbaar* | zoekresultaat |
| Personeel | ca. **34 medewerkers** (laatste confirmation statement, aggregatorlezing) — *indicatief* | GlobalDatabase via zoekresultaat |
| Jaarrekening | Laatste gedeponeerd: **"total exemption full accounts" t/m 31-12-2024** (21-05-2025). Dit is de kleine-ondernemingsvrijstelling: **géén openbare omzet of winst-en-verliesrekening** | Companies House filing history |

Eigendom is dus privaat/VC-gedreven; geen beursnotering, geen overname. Opvallend: **Chevron** en **Suffolk** (Amerikaanse aannemer) zijn zowel klant als investeerder — strategisch kapitaal uit de eigen afzetmarkt.

Erkenningen: CIR Risk Management Product of the Year (2020); New Civil Engineer TechFest "Best use of AI" (dec 2021, Network Rail Great Western Main Line); finalist MacRobert Award (2023).

### Doelgroep en typische gebruikers

nPlan richt zich expliciet op **grote kapitaalprojecten en portfolio's**, niet op de mkb-aannemer:

- **Organisatietypen:** owner-operators (opdrachtgevers/asset owners), general contractors, consultants.
- **Rollen:** planners, risicomanagers, PMO-managers, project- en programmadirecteuren, portfoliodirecteuren. nPlans eigen helpdesk: *"Our most common users include planners, project managers, programme managers, members of the risk team, and executives in charge of the project."*
- **Projectomvang:** de FAQ noemt "projects with schedules in excess of 30,000 activities" en stelt dat nPlan "best suited precisely for such complex mega projects" is. Onder ongeveer L3-detailniveau en enkele duizenden activiteiten verdampt de meerwaarde.

### Sectoren en regio's

**Sectoren:** spoor, wegen/highways, energie & olie/gas, nutsbedrijven/water, nucleair, transit, ziekenhuizen, commerciële en publieke gebouwen, datacenters.

**Regio's en referentieklanten** (uit nPlans eigen persberichten, casestudy's en site):

- **VK (kernmarkt):** Network Rail (Great Western Main Line), HS2 via SCS JV (Skanska–Costain–STRABAG, Londense tunnels), Transpennine Route Upgrade (TRU), Anglian Water (AMP8, £11 mrd portfolio), Sizewell C, National Highways, BAM, Kier, Houses of Parliament Restoration & Renewal Delivery Authority.
- **VS:** Suffolk Construction (ziekenhuisuitbreiding Boston), Chicago Transit Authority (Red Line Extension), blogs gericht op FTA-richtlijnen voor transit.
- **Canada:** LNG Canada, City of Ottawa Stage 2.
- **Australië:** Spark NEL D&C (Webuild, CPB Contractors, GS E&C, China Construction Oceania) voor de **North East Link** (A$11 mrd, Victoria's grootste wegenproject), dec 2025; Rail Projects Victoria.
- **Midden-Oosten/Azië:** NEOM (Saoedi-Arabië), MTR (Hongkong).
- **Energie-majors:** Chevron, Shell, ExxonMobil, Google (genoemd op de homepage).

Claims van nPlan zelf (marketing, niet onafhankelijk geverifieerd): AI beheert **> $500 mrd aan lopende projecten**; **> $1,2 mrd bespaard** voor klanten tot nu toe.

---

## 2. Functionaliteit en techniek

### 2.1 De AI-motor (het eigenlijke product)

**Dataset:** > 750.000 historische "as-planned én as-built" planningsbestanden, met **> 2 miljard individuele activiteiten**, verzameld sinds 2017 uit klantdata. nPlan representeert elke planning als een **DAG** (activiteiten = nodes met numerieke én tekstuele features, relaties = edges met type/gewicht/richting) plus een temporele component (hoe het project door revisies veranderde).

*Let op inconsistentie in de marketing:* de dataset wordt afwisselend beschreven als "$2 trillion", "$2,5 trillion" en "€2,5 trillion" aan bouwuitgaven, en als "over 500,000" (oudere FAQ) versus "750,000" (huidige site). Zie *Nadelen*.

**Modelfamilies** (bron: nPlan-helpcentrum, artikel "Model Selection", en /our-ai):

1. **MLP's** (multi-layer perceptrons) — activiteitniveau, tabulaire features.
2. **GNN's** (graph neural networks) — leren over de netwerkstructuur: relaties, edge cases, correlaties.
3. **Ensembles** van bovenstaande.
4. **ICE-LM** — eigen, in-house gefinetunede LLM's voor risicomanagement; plus **GraphGen**, een generatief model dat planningen genereert.

**Per-klant modeltraining.** Bij onboarding traint nPlan *een op de klant toegesneden model* op diens historische planningen: *"Using your historic schedules, we train a personalised Machine Learning model that is unique to you."* Daarna kiest nPlan per geüploade planning het best presterende model uit een set voorgetrainde varianten, op basis van gemeten fout op die specifieke planning.

**Voorspellingsfeatures** (expliciet benoemd): activiteitomschrijving (tekst), geplande duur, projectomvang (aantal activiteiten), tijdspanne, gelijktijdigheid/concurrency, voorgangers en opvolgers, WBS-context. **Geen** resource- of kostendata.

**Output per activiteit:** een volledige kansverdeling van de duur ("Duration Range" = het interval waarbuiten slechts 20% kans ligt), plus kans om de geplande start-/einddatum te halen. Verdelingen kunnen **multimodaal** zijn ("good day / bad day"-scenario's) — een reëel voordeel boven de gebruikelijke PERT/driehoeksverdelingen. nPlan publiceert zelfs een blog "PERT distribution leads to overconfidence in outcomes".

**Simulatie-engine.** Eigen bouw, expliciet als vervanging van standaard Monte Carlo: *"We saw the industry standard for Monte Carlo simulation and said 'it's not good enough'."* Werkt op programma's met tienduizenden activiteiten en levert prognoses "in minuten".

**Afgeleide analyses:** criticality (% van de simulatietijd op het kritieke pad), delay contribution (gemiddeld aantal dagen dat een activiteit toevoegt aan de einddatum wanneer die kritiek is), **Driving Paths** (deterministisch vs. probabilistisch kritiek pad naast elkaar), merge bias-analyse, **Intervention Recommender** (zoekt iteratief de meest impactvolle activiteit, houdt die op tijd, herberekent, zoekt de volgende), **Mitigation Scenarios** (scenario-tester met "mitigation effectiveness" 0,1–0,9 per activiteit), **Activity Correlation Explorer**, **Activity Neighbourhood** (netwerkvisualisatie rond een risicoactiviteit).

### 2.2 Productlijn (per juli 2026)

| Product | Wat het is |
|---|---|
| **Insights Pro** | Vlaggenschip: forecasting + risicomanagement voor één project. Driving Paths, insights, mitigation strategies, risicoregister, Barry, Power BI-koppeling. 14 dagen gratis proef. |
| **Insights Core** | "No risk team? No problem." Uitgeklede variant voor planners zonder risicoafdeling: self-service upload-wizard, één dashboard, Barry. |
| **Insights Risk Professional** | Voor risicoprofessionals: netwerkdiagram, sub-kritieke paden, scenariomodellering, "AI-SRA". |
| **Insights PMP** | Voor projectmanagers: samenvattingen en aanbevelingen. |
| **Insights Contract Risk** | Contractrisico (pagina niet publiek renderbaar op onderzoeksdatum). |
| **Portfolio** | Multi-project: portfolio-deliverability, KPI's, thema's, Barry, Power BI. Gelanceerd juli 2023 met **BAM** als launch partner (start: 50 projecten). |
| **Decision Intelligence** | Waardeert beslisopties ("wat is deze keuze waard?"); positioneert zich expliciet als vervanger van consultantreviews. |
| **Schedule Studio** | Generatieve AI (GraphGen): van scope-document/RFP naar logisch gekoppelde planning met WBS tot 3 niveaus diep en "1000s of activities". Export **rechtstreeks naar Primavera P6**. Bewerken via natuurlijke taal is **BETA**. Gratis te proberen, geen creditcard. |
| **AutoReport** | GenAI project-controls-rapportage uit XER/XML/PP, CSV/XLSX/XLS-risicoregisters en PDF's; templates, realtime samenwerking. |
| **Schedule Integrity Checker (SIC)** | **Gratis**, onbeperkt gebruik: DCMA-14-achtige checks plus nPlan-specifieke checks; PDF-rapport. |
| **Barry** | AI-agent over de forecast, schedule-integrity en planningsdata. Geen internettoegang, geen toegang tot de historische dataset, kan geen data muteren of versturen; guardrails tegen prompt-injectie. |

### 2.3 Wat nPlan expliciet **niet** heeft

Dit is voor een planningsmarktonderzoek het belangrijkste deel:

- **Geen eigen CPM-authoring/onderhoudsomgeving.** Je plant niet in nPlan; je uploadt. (Schedule Studio genereert wel een eerste versie, maar exporteert die naar P6 om verder te werken.) nPlans eigen FAQ "known limitations": *"We do not yet offer solutions to build schedules"* — inmiddels deels achterhaald door Schedule Studio, maar het onderhoudsproces blijft in P6/Asta.
- **Geen resourcemodel, geen kostenmodel.** Letterlijk: *"We do not make predictions concerning resources or costs as this information is not consistently available in our dataset."* Geen resource levelling, geen resource-kritiek pad, geen cash-flow, geen EVM-berekening (nPlan publiceert zelfs "EVM vs nPlan" als positionering, niet als functie).
- **Geen 4D/BIM, geen IFC, geen modelkoppeling.** Nergens in site, sitemap (220+ URL's), helpcentrum (87 artikelen) of contractdocumenten komt IFC, IfcWorkSchedule, IfcTask, BIM of 4D voor.
- **Geen baselinebeheer in de klassieke zin.** Wel revisietracking: geplande vs. voorspelde duur per revisie, end-milestone slippage t.o.v. de vorige maand, milestone tracking over tijd.
- **Geen desktopclient.** Alles browser-gebaseerd.

### 2.4 Kalender-, constraint- en logicabehandeling (relevant voor engine-vergelijking)

nPlan is verrassend expliciet over de modelleringsaannames — nuttig materiaal voor wie een eigen engine bouwt:

- **Kalenders** worden gerespecteerd als ze meegeleverd worden ("if your firm breaks for a 2-week period around Christmas … nPlan will not forecast any work to be pushed into that period"). Kalenders met **meer dan 2 aaneengesloten niet-werkweken** worden gemarkeerd als risico voor onrealistische output. Verschillende kalenders aan weerszijden van één relatie worden gevlagd.
- **Constraints worden standaard gerelaxeerd.** *"nPlan adopts some standard modelling assumptions, such as relaxing all constraints."* Onwrikbare constraints moeten handmatig gemeld worden. Harde constraints (must start/finish on) maken resultaten voor die activiteit **ongeldig**.
- **Lags krijgen geen onzekerheid** — alleen duren worden stochastisch gemaakt. Overmatig lag-gebruik maakt het netwerk rigide. Negatieve lags worden afgeraden/gevlagd.
- **Uitsluitingen:** LoE-taken worden niet voorspeld (geen vaste duur). Activiteiten **> 60 dagen of > 15% van de totale projectduur** vallen standaard buiten de analyse (wél modelleerbaar op verzoek). Minimale duur 0,5 dag; ideaal 3–30 dagen. Planeenheid: dagen.
- **Detailniveau:** L3 ideaal; L2 en L4 werken; L1 levert betekenisloze resultaten. Minimaal geaccepteerd is L2.
- **Aanbevolen P6-instellingen** worden voorgeschreven: expected finish dates gebruiken, retained logic, SS-lag vanaf early start, kritiek bij total float ≤ 0h, float per project, total float = late finish − early finish, lag-kalender = predecessor.
- **Contingency/Time Risk Allowance moet verwijderd of op nul gezet worden** — nPlan wil er niet op forecasten en wil juist beoordelen of de contingency toereikend is.
- **Cyclische logica blokkeert de forecast volledig** — moet eerst opgelost.

### 2.5 Platform, schaal en service

- **Platform:** 100% webgebaseerd SaaS. Certificeringen **ISO 27001** en **SOC 2 Type II**; "clouds and datacenters certified for Government-level operations".
- **Schaal:** ">30.000 activiteiten" moeiteloos; simulatie op "tienduizenden activiteiten" in minuten. In Schedule Studio: WBS tot 3 niveaus, "1000s of activities".
- **Doorlooptijd:** gemiddelde verwerkingstijd nieuw programma ≈ **1 uur**. Maar: **eerste** planning van een nieuw project ≈ **1 week** (modelselectie/-opzet); volgende revisies **1–2 dagen**. Dat is dus geen realtime tool.
- **SLA (Master Services T&Cs 251210):** uptime-doel **99,5%**, service credits 5% (<99,5%) / 10% (<99,0%) bij twee slechte maanden in drie. Support per e-mail binnen support-uren; responsdoelen Sev1 ≤ 1 werkdag, Sev2 ≤ 2 werkdagen, Sev3 ≤ 5 werkdagen, Sev4 ≤ 15 werkdagen. Resolutietijden zijn **doelen, geen garanties**.
- **Onboarding/training:** wordt aangeboden ("comprehensive training", periodieke check-ins met het risicoteam) — het is duidelijk een begeleid, high-touch enterprise-model, geen self-service (behalve Insights Core, SIC en Schedule Studio).

---

## 3. Prijzen

### 3.1 Wat openbaar is

**nPlan publiceert geen enkele lijstprijs.** Er bestaat geen `/pricing`-pagina (HTTP 404 op 25-07-2026), geen prijstabel op de productpagina's, en nPlan staat **niet** op het Britse G-Cloud 14-raamwerk (0 resultaten op Digital Marketplace, 25-07-2026) waar prijskaarten verplicht openbaar zijn. De AutoReport-koopvraagpagina zegt letterlijk: *"Fill out the form on the right and we'll get in touch with pricing information."*

**Wel openbaar en gratis:**

| Item | Voorwaarde | Bron / datum |
|---|---|---|
| **Schedule Integrity Checker** | **Volledig gratis**, geen creditcard, **geen usage caps**, "we plan to keep it that way for the foreseeable future" | nplan.io/products/schedule-integrity-checker + Zendesk, geraadpleegd 25-07-2026 |
| **Schedule Studio** | Gratis uit te proberen, "no obligation or credit card required" | nplan.io/page/schedule-studio-signup, 25-07-2026 |
| **Insights Pro proefperiode** | **14 dagen** gratis | nPlan Insights Pro Free Trial T&Cs, versie 240717 (PDF) |
| **AutoReport proefperiode** | Gratis proef (duur niet gespecificeerd in de gevonden versie) | AutoReport Free Trial Ts&Cs 240611 (PDF) |

### 3.2 Licentiemodel (uit de contractdocumenten)

Uit de **Master Services Terms & Conditions v251210** (PDF, gepubliceerd op nplan.io/terms-of-service):

- **SaaS-abonnement**, geen perpetual licentie, geen on-premises optie.
- Prijs, scope, **Service Term** en betalingscondities staan in een **Ordering Document** per klant — dat is dus volledig onderhandeld maatwerk.
- Facturatie per factuur, **betaling binnen 30 dagen**; 1,5% rente per maand bij te late betaling; opschorting mogelijk.
- Termijn zoals in het Ordering Document; opzegging bij materiële wanprestatie met 30 dagen opzegtermijn.
- Er is een aparte **Master Services Agreement Australië** en aparte T&Cs voor **Schedule Studio** — regionale/productspecifieke contractvarianten.

Er is dus **geen** gepubliceerde staffel per gebruiker, per project of per portfolio. Uit de productstructuur (Insights Core "no-frills" vs. Insights Pro vs. Portfolio vs. Enterprise-modules) valt af te leiden dat nPlan **per product-tier en per project/portfolio-scope** prijst, niet primair per named user.

### 3.3 Het enige harde openbare bedrag

| Bedrag | Wat | Opdrachtgever | Datum | Bron |
|---|---|---|---|---|
| **£60.756,17** | "Schedule Assurance Services" — **single tender action** | Restoration & Renewal Delivery Authority Ltd (Houses of Parliament, Londen) | Gegund **28-11-2022**, looptijd 28-11-2022 t/m 06-01-2023 | UK Contracts Finder API, notice `tender_339745/1160324`, opgehaald 25-07-2026 |

Dit is de **enige** nPlan-gunning in de volledige Contracts Finder-database (1 hit op zoekterm "nplan"). Het betreft een korte, ~6 weken durende assurance-opdracht op één programma — niet een meerjarige platformlicentie. Het is niettemin de best beschikbare harde ankerwaarde.

### 3.4 Geschatte prijsstelling — **NADRUKKELIJK EEN SCHATTING**

> **SCHATTING (eigen afleiding, geen bron):** op basis van (a) het R&R-datapunt van £60,8k voor een zes weken durende single-project assurance-opdracht, (b) het enterprise-SaaS-model met verplichte per-klant modeltraining en begeleide onboarding, en (c) de expliciete positionering als vervanger van QSRA-consultancy (die zelf al snel £30k–£100k+ per programma per jaar kost):
> - **Insights Core / single project, licht:** ordegrootte **£15k–£40k per project per jaar**.
> - **Insights Pro, één groot programma:** ordegrootte **£50k–£150k per programma per jaar**.
> - **Portfolio / enterprise (tientallen projecten, zoals BAM's start met 50):** ordegrootte **£150k–£500k+ per jaar**, met initiële onboarding-/modeltrainingskosten daarbovenop.
> - **Minimale afname:** vrijwel zeker een jaarcontract per Ordering Document; geen maandelijkse of per-gebruiker-instap gevonden.
>
> Deze bandbreedtes zijn **niet gevalideerd** door een leverancieropgave, review of aanbesteding en moeten als indicatie worden gelezen, niet als offerte.

### 3.5 Prijsanker van concurrenten (ter vergelijking — derde-partijschattingen, lage betrouwbaarheid)

Uit ITQlick-afgeleide vergelijkingen (via zoekresultaat, 25-07-2026; ITQlick-cijfers zijn zelf schattingen):

- **Deltek Acumen Risk:** ca. **$10.300** eerste jaar.
- **Safran Risk:** ca. **$14.000** over 3 jaar incl. onderhoud.
- **Oracle Primavera Risk Analysis:** ca. **$10.800** over 3 jaar.
- **RiskyProject:** ca. **$13.300** over 3 jaar.

Conclusie: klassieke QSRA-desktoptools zijn **één tot twee ordes van grootte goedkoper per licentie** dan een nPlan-programma-abonnement naar schatting is. nPlan concurreert dan ook niet op licentieprijs, maar op de vervanging van **mensuren** (workshops, consultants).

---

## 4. VOORDELEN

1. **Elimineert de belangrijkste zwakte van klassieke QSRA: subjectieve inputs.** Traditionele Monte-Carlo-analyse hangt volledig af van driepuntsschattingen uit workshops, met aantoonbare optimism bias, recency bias en salience bias. nPlan leidt de verdelingen af uit gerealiseerde uitkomsten van 750.000 planningen. Dit is een fundamenteel, niet-cosmetisch verschil — en het is de reden dat TRU aangaf QSRA **volledig** te willen vervangen door nPlan over het hele programma.

2. **Frequentie in plaats van momentopname.** QSRA op een groot programma is zo arbeidsintensief dat het kwartaal- of halfjaarlijks gebeurt. TRU deed het per project maandelijks en programmabreed elke 3–6 maanden; met nPlan kan bij **elke** planningsupdate opnieuw geanalyseerd worden (verwerkingstijd ≈ 1 uur na de initiële modelopzet). Voor een programma dat wekelijks muteert is dat een categorisch andere besturingscyclus.

3. **Realistische, niet-parametrische verdelingsvormen.** Omdat de verdelingen empirisch geleerd zijn, komen **multimodale** ("good day / bad day") en langstaartige verdelingen naar voren die een PERT- of driehoeksverdeling per constructie niet kan produceren. nPlans eigen onderzoek — 80% van bijna 500.000 planningen loopt uit — onderbouwt dat de lange staart, niet de mediaan, de projectuitkomst bepaalt.

4. **Netwerkbewuste analyse in plaats van activiteitgewijze.** De GNN-aanpak plaatst elke activiteit in zijn grafcontext (voorgangers, opvolgers, gelijktijdigheid, projectomvang, WBS). Twee identiek genoemde activiteiten krijgen daardoor bewust verschillende verdelingen. De afgeleide **Driving Paths** — deterministisch kritiek pad náást het probabilistisch kritieke pad — legt sub-kritieke paden en merge bias bloot die een normale CPM-uitdraai onzichtbaar laat.

5. **Van analyse naar actie.** De **Intervention Recommender** is meer dan een risicoranglijst: hij zoekt de meest impactvolle activiteit, veronderstelt dat die op tijd blijft, **herberekent het hele netwerk**, en zoekt de volgende. Gecombineerd met Mitigation Scenarios (mitigation effectiveness 0,1–0,9) levert dat een testbare mitigatiestrategie in plaats van een rapport. Dit is precies waar traditionele QSRA-uitvoer meestal stopt.

6. **Uitstekende, ongewoon transparante schedule-integrity-analyse — en die is gratis.** De Schedule Integrity Checker doet DCMA-14 plus nPlan-specifieke checks (activiteiten met alleen "to-finish"-voorgangers, alleen "from-start"-opvolgers, links met verschillende kalenders, dubbele links, allowance-activiteiten, inconsistente actuals, negatieve float/lag). Onbeperkt, gratis, zonder creditcard. Voor iedereen die planningskwaliteit meet is dit op zichzelf al bruikbaar — óók als je nPlan verder niet koopt.

7. **Bewezen tractie bij zeer grote, risicomijdende opdrachtgevers.** HS2/SCS JV, Network Rail, TRU, Anglian Water (£11 mrd AMP8), Sizewell C, National Highways, BAM, LNG Canada, Chevron, NEOM, MTR, Spark NEL (A$11 mrd North East Link). Dat zijn organisaties met zware assurance-eisen; hun acceptatie is een substantieel vertrouwenssignaal. ISO 27001 + SOC 2 Type II onderbouwen dat.

8. **Wetenschappelijk gefundeerd, niet alleen gemarket.** nPlan heeft een eigen onderzoeksafdeling (nERD) die publiceert: o.a. Mosca, Hovhannisyan & Phillips, *"Quantitative Schedule Risk Analysis Using Artificial Intelligence Trained on Historical Data"* (Lecture Notes in Civil Engineering, CSCE 2024-proceedings, DOI 10.1007/978-3-031-97701-5_19) en Zachares, Hovhannisyan, Mosca & Gal, *"Form follows Function: Text-to-Text Conditional Graph Generation based on Functional Requirements"* (arXiv:2311.00444). Er is ook samenwerking met de Construction Information Technology Lab van de University of Cambridge.

9. **Lage instapdrempel qua IT.** Puur browser-gebaseerd, geen installatie, geen Citrix, geen desktoplicenties te beheren. Voor JV's en samenwerkingsverbanden waarin partijen elkaars IT niet in kunnen, is dat praktisch waardevol. De "Views"-functie laat meerdere risicoteams onafhankelijk in hetzelfde bestand werken.

10. **Volwassen uitbreiding naar rapportage en generatie.** Power BI-connector (okt 2025) voor Insights Pro en Portfolio, AutoReport (GenAI-rapportage uit XER/XML/PP + CSV/XLSX + PDF), Schedule Studio (scope-document → P6-planning in < 1 uur). Dat maakt nPlan meer dan een puntoplossing.

---

## 5. NADELEN

1. **Volstrekt gesloten prijsstelling — geen enkel publiek prijspunt.** Geen prijspagina, geen G-Cloud-rate card, "contact sales" voor elk betaald product. Voor een publieke opdrachtgever betekent dat: elke aanschaf is maatwerkonderhandeling zonder benchmark. Het enige openbare bedrag ter wereld (voor zover vindbaar) is £60.756 voor zes weken assurance bij Houses of Parliament R&R — en dat was een **single tender action**, dus zonder concurrentie gegund. Vergelijken is praktisch onmogelijk.

2. **Geen resources, geen kosten — dus geen volledige projectbeheersing.** nPlan voorspelt uitsluitend **duren**. Geen resource levelling, geen resource-kritiek pad, geen kostenprognose, geen cash-flow, geen EVM. De motivering ("resource data is not consistently available in our dataset") is eerlijk maar verandert niets aan de consequentie: je hebt er altijd nog een volwaardig planningspakket én meestal een kostentool náást nodig. Voor wie tijd én geld in één model wil, is dit geen oplossing. (Vergelijk het Planning Planet-commentaar dat een systeem als Spider Project "real integration" van tijd, kosten, resources en risico's biedt, "not gathering different standalone components in a dashboard".)

3. **De AI verklaart niet *waarom*.** nPlans eigen "known limitations"-artikel: *"nPlan doesn't provide specific causes for risky activities as often there is not one distinct cause for a delay on an activity. Instead nPlan will work with you to identify potential causes of delay for top risks using your expert knowledge."* Voor contractuele of juridische onderbouwing (EOT-claims, delay analysis, business-case-goedkeuring) is "het model zegt dat deze activiteit riskant is" een zwakke basis. nPlan werkt aan explainability (Activity Correlation Explorer, "Explainability in AI: Our Next Steps") — wat bevestigt dat het nu nog een tekort is.

4. **Zware afhankelijkheid van planningskwaliteit — garbage in, garbage out, maar dan duurder.** De vereistenlijst is lang en streng: minimaal L2 (L3 gewenst), alle activiteiten voor- én nagekoppeld, geen SF-relaties, geen negatieve lags, geen cyclische logica (blokkeert de forecast volledig), harde constraints verwijderen, contingency op nul, kalenders opschonen, acroniemen uitschrijven ("build a Large Hadron Collider" i.p.v. "build a LHC"), specifieke P6-scheduleringsinstellingen. Organisaties met slordige planningen — dat is een groot deel van de markt — moeten eerst maanden opruimen vóór nPlan waarde levert. De gratis SIC is niet toevallig het instapproduct.

5. **Substantiële uitsluitingen die de forecast systematisch vertekenen.** Activiteiten **> 60 dagen of > 15% van de projectduur** vallen standaard buiten de analyse; **LoE-taken** ook; activiteiten met alleen "to-finish"-voorgangers zweven vrij; activiteiten met alleen "from-start"-opvolgers dragen niet bij. Bij een grofmazige of niet-DCMA-conforme planning kan daardoor een aanzienlijk deel van het werk buiten de risicoanalyse vallen — zonder dat de eindgebruiker dat noodzakelijkerwijs doorheeft.

6. **Onboarding is traag en data-hongerig.** Je moet **je eigen historische planningen afstaan** om een klantspecifiek model te laten trainen. Uit de FAQ: *"we require that you share any historical data that you have available."* De eerste analyse van een nieuw project duurt ca. **een week**; pas daarna 1–2 dagen. Voor organisaties met weinig gearchiveerde P6/Asta-bestanden, of met contractuele beperkingen op het delen van planningsdata (JV's, defensie, opdrachtgeverdata), is dit een reële blokkade. Een externe analyse merkte scherp op dat nPlan op 750.000 planningen traint terwijl een typische bouwer er zelf misschien 200 heeft.

7. **De standaardvoorwaarden geven nPlan een blijvende licentie op jouw planningsdata.** Master Services T&Cs v251210, clausules 3.5 en 3.6: nPlan mag klantdata in geaggregeerde/gede-identificeerde vorm gebruiken om "de Services te verbeteren", **"enhancing or developing the Company's machine learning or AI models"** en voor "insights and benchmarking analysis" — en is daartoe vrij **"during and after the term"**. Dat is precies hoe de 750.000-dataset groeit. Juridisch verdedigbaar en gebruikelijk in AI-SaaS, maar het betekent dat jouw uitvoeringsdata de concurrentiepositie van de leverancier permanent versterkt, ook nadat je bent opgestapt. Voor opdrachtgevers met gevoelige programma's is dit een expliciet onderhandelpunt.

8. **De leverancier disclaimt contractueel exact datgene wat hij verkoopt.** De Schedule Studio-voorwaarden stellen dat de outputs *"analytical tools only"* zijn en dat nPlan *"accepts no liability whatsoever for any reliance on or use of outputs"*, met **"no representations, warranties, or guarantees … as to the accuracy, completeness, fitness for purpose, or reliability of any output"*. De algemene MSA doet hetzelfde (art. 6.2: geen garantie op "the results that may be obtained from use of the Services"). De marketing claimt "accuracy which human operators are unable to match"; het contract garandeert niets. Dat is juridisch normaal, maar de kloof is hier ongewoon groot en verdient aandacht bij assurance-gebruik.

9. **Geen enkele onafhankelijke reviewbasis.** Geen verifieerbare G2-, Capterra-, TrustRadius-, SoftwareAdvice- of Gartner-Peer-Insights-pagina met substantie; de enige gevonden rating (4,3/5 op G2) was niet direct te verifiëren en het reviewaantal is onbekend. Er zijn geen gebruikersfora, geen community, geen publieke feature-requests. Vrijwel alle beschikbare "bewijs" — casestudy's, whitepapers, ROI-cijfers, de $1,2 mrd besparingsclaim, de "accuracy" — is **door nPlan zelf gepubliceerd**, en de casestudy's zitten bovendien achter een e-mailmuur. Voor een inkoopbeslissing is dat een onbevredigende evidentiepositie.

10. **Inconsistente en niet-gekwantificeerde claims.** De dataset wordt beschreven als "$2 trillion", "$2,5 trillion" en "€2,5 trillion", en als ">500,000" (helpcentrum) versus ">750,000" (site) planningen. De pagina /our-ai belooft superioriteit boven "the industry standard for Monte Carlo simulation" maar geeft **geen enkel accuratessecijfer, geen MAE, geen kalibratiegrafiek, geen blind-testresultaat**. Alleen in een FAQ staat dat 20% van de dataset wordt achtergehouden voor blind testing over 91 miljoen activiteiten. Voor een product waarvan de hele propositie "wij zijn nauwkeuriger" is, is de publieke validatie mager.

11. **Kleine leverancier, categorierisico.** Ca. 34 medewerkers, $36,5 mln totaal opgehaald, jaarrekening met kleine-ondernemingsvrijstelling (dus geen publieke omzet), één productcategorie. Tegenover Oracle, Deltek en een groeiend veld AI-concurrenten. Voor een 10-jarig infrastructuurprogramma is leveranciers-continuïteit een reëel aandachtspunt; het exit-scenario is bovendien mager gedefinieerd (bij beëindiging stelt nPlan klantdata beschikbaar "in a form the Company deems appropriate" gedurende 30 dagen).

12. **Beperkte support-SLA voor een assurance-kritisch systeem.** Sev1 (productie volledig onbeschikbaar): responsdoel **≤ 1 werkdag**, oplossing binnen 3 werkdagen — en dat zijn expliciet "targets, not guarantees". Support alleen per e-mail binnen support-uren. Uptimedoel 99,5% (≈ 3,6 uur downtime per maand toegestaan zonder credit). Dat is bescheiden voor software die stuurt op miljardenprogramma's.

---

## 6. Interoperabiliteit

Dit is voor een open-source, IFC-gebaseerde planner het meest relevante hoofdstuk — en het oordeel is scherp: **nPlan is een gesloten, P6-centrisch ecosysteem zonder enige openBIM-aansluiting.**

### 6.1 Ondersteunde importformaten

| Formaat | Bron-tool | Status | Bewijs |
|---|---|---|---|
| **`.xer`** | Primavera P6 | Primair, volledig ondersteund | Zendesk "What are the accepted file formats"; Schedule Integrity-tabel; AutoReport-pagina |
| **`.xml`** | P6 XML én MS Project XML (MSPDI) | Ondersteund | Idem — de Schedule-Integrity-tabel noemt `*.xml (MS Project)`, de FAQ noemt `.XML (supported by P6)`; in de praktijk beide |
| **`.pp` / `.programme`** | Asta Powerproject | Ondersteund | Schedule Integrity-tabel; upload-artikel ("`.xml`, `.xer`, `.programme` files"); AutoReport ("XER, XML and PP format") |
| **`.mpp`** | MS Project (binair) | **Niet genoemd, vrijwel zeker niet ondersteund** — de route is MS Project → XML | Afwezig in alle documentatie |
| **CSV / XLSX / XLS** | Risicoregisters | Ondersteund, **alleen in AutoReport** | AutoReport-pagina |
| **PDF / Word / PowerPoint / spreadsheets** | Contextdocumenten | Ondersteund in AutoReport en Schedule Studio (scope, charter, bill of quantities) | AutoReport- en Schedule-Studio-FAQ |
| **IFC 4.3 (`IfcWorkSchedule`, `IfcTask`, `IfcWorkCalendar`, `IfcRelSequence`)** | openBIM | **NIET ONDERSTEUND — nergens genoemd** | Volledige sitemap (220+ URL's), 87 helpcentrum-artikelen, alle contract-PDF's: nul treffers op IFC/BIM/4D |

Voor niet-ondersteunde formaten is het antwoord handmatig: *"If you use a different software that does not support .XER or .XML formats, send us a message and we will figure out a solution."*

### 6.2 Exportmogelijkheden

- **CSV** van alle insights (open én gesloten risico's, inclusief toegewezen acties) — de enige gestructureerde uitvoerroute.
- **PDF** — Schedule Integrity Checker-rapporten en AutoReport-rapporten.
- **Primavera P6** — **alleen vanuit Schedule Studio**: een AI-gegenereerd schema wordt rechtstreeks naar P6 geëxporteerd met behoud van logica, duren en structuur. Dit is de enige echte schema-uitvoerroute in het hele portfolio.
- **Power BI** — sinds okt 2025 een connector ("nTegrations") die forecasts en risico-insights van Insights Pro en Portfolio in Power BI streamt. Activering loopt via het accountteam, niet self-service.

### 6.3 API

nPlan bevestigt dat er een API is: *"Yes, our API allows integrations with other softwares. Contact us at support@nplan.io for more information."* Maar:

- **Geen publieke API-documentatie.** Geen developerportal, geen OpenAPI-spec, geen `docs.nplan.io` / `developers.nplan.io` (alle subdomeinen leveren geen respons). Geen SDK's, geen GitHub-organisatie met client libraries.
- **Geen webhooks of eventmodel** gedocumenteerd.
- Toegang tot de API is dus contractueel en per klant — een **gesloten** API, geen open platform.

### 6.4 Consequenties voor een IFC-gebaseerde open planner

1. **IFC is geen route naar nPlan.** Er bestaat geen IFC-import, geen `IfcWorkSchedule`-mapping, geen 4D-koppeling. Wie zijn planning in IFC 4.3 beheert en nPlan wil gebruiken, moet **eerst naar P6 XML of XER converteren**.
2. **De praktische brug is P6 XML.** Van de drie ondersteunde formaten is **P6 XML** verreweg het meest realistisch om te genereren vanuit een open-source tool: het is XML, gedocumenteerd via Oracle's schema, en tolerant. XER is een ongedocumenteerd, tab-gescheiden Oracle-dumpformaat waarvan de structuur alleen via reverse-engineering (bijv. planp6.com-gidsen) bekend is — technisch haalbaar maar bewerkelijk en fragiel. Asta `.pp` is binair en gesloten.
3. **Er is een concrete kans hier.** Als Open Planner Studio betrouwbaar **P6 XML** kan schrijven (met kalenders, relatietypes, lags, constraints en WBS conform de nPlan-integriteitseisen), dan is een IFC-native planner in één stap koppelbaar aan nPlan én aan de rest van de P6-wereld. Omgekeerd: nPlans **integriteitschecklist is een uitstekende gratis specificatie** voor wat een "forecast-waardige" planning is — 12 punten plus de uitgebreide factfile-checks, publiek leesbaar in het helpcentrum.
4. **Er is geen weg terug uit nPlan.** Behalve CSV-insights en de Schedule-Studio→P6-export komt er niets gestructureerds uit. Risicoregister, acties, mitigatiescenario's, forecast-historie en dashboards leven uitsluitend in nPlan. Bij beëindiging: 30 dagen, "in a form the Company deems appropriate".
5. **Lock-in-oordeel: middelmatig, maar asymmetrisch.** De *bron* van de planning blijft in P6/Asta — nPlan is een overlay, dus je verliest je planning niet. Maar de *opgebouwde risico-intelligentie* en het **klantspecifieke getrainde model** zijn niet overdraagbaar, en jouw historische data heeft ondertussen nPlans generieke model verbeterd (MSA 3.5/3.6). De lock-in zit dus in het model en de historie, niet in het bestandsformaat.

---

## 7. Marktpositie

### Waar nPlan sterk is, en waarom

- **Britse infrastructuur is de thuisbasis en het bolwerk.** Spoor (Network Rail, HS2/SCS JV, TRU), water (Anglian Water AMP8), nucleair (Sizewell C), wegen (National Highways), parlementair vastgoed (R&R). Dit is een markt met (a) zeer grote programma's, (b) formele assurance-verplichtingen, (c) een cultuur van QSRA, en (d) chronisch tekort aan ervaren planners. Precies nPlans wig.
- **Het dataset-voordeel is een echte moat.** 750.000 as-planned/as-built planningen met 2 miljard activiteiten is niet in een jaar na te bouwen, en groeit contractueel door met elke klant (MSA 3.6). Dit is de sterkste structurele verdediging van het bedrijf.
- **Uitbreiding weg van het VK loopt.** Energie (Chevron, Shell, LNG Canada — met Chevron als investeerder), VS-transit (Chicago Transit Authority, Suffolk/Boston), Australië (North East Link dec 2025, expliciet gepositioneerd als de doorbraak in highways), Midden-Oosten (NEOM), Hongkong (MTR), Canada (Ottawa Stage 2).

### Belangrijkste concurrenten

| Categorie | Spelers | Verhouding tot nPlan |
|---|---|---|
| **Directe AI-schedule-analytics** | **Nodes & Links** (dichtstbij: AI over planningsdata voor risk, delay, change, EVM), **SmartPM**, Clarity Axis | Directe rivalen; Planning Planet noemt nPlan en Nodes & Links in één adem als de serieuze AI-tools |
| **Generatieve AI-planning** | **ALICE Technologies** (optimaliseert/genereert planningen met resource- en methodevarianten) | Complementair én overlappend sinds Schedule Studio; ALICE zit op duurreductie, nPlan op risicovoorspelling |
| **Klassieke QSRA** | **Safran Risk**, **Deltek Acumen Risk/Fuse**, **Oracle Primavera Risk Analysis**, Full Monte, RiskyProject | Dit is wie nPlan wil verdringen; nPlan publiceert hier expliciete "vs"-content over |
| **Geïntegreerde planningssuites** | Oracle Primavera P6/Cloud, **InEight**, Asta Powerproject, **Spider Project** | Bezitten de plandata; nPlan is afhankelijk van hun exportformaten |
| **Consultancy** | Turner & Townsend, Mace, AECOM, Arcadis (QSRA-dienstverlening) | nPlan positioneert Decision Intelligence expliciet als "without the time, cost, and subjectivity of consultants" |

### Trend

**Groeiend.** Bewijs: Series B okt 2025 ($16 mln, met strategisch kapitaal van Chevron en Suffolk); productlijn uitgebreid van één product (Insights) in 2021 naar elf in 2026 (Portfolio 2023, Barry 2024, AutoReport 2024, Schedule Studio 2025, Power BI-connector okt 2025, Decision Intelligence 2026); geografische doorbraak in highways (Australië, dec 2025); actieve onderzoeksafdeling met publicaties. De bredere markt trekt mee — ASCE rapporteert toenemend AI-gebruik in infrastructuur richting een "$10 trillion building boom".

**Risico's op de trend:** kleine schaal (~34 fte), geen openbare omzet, één categorie, en de mogelijkheid dat Oracle of Deltek vergelijkbare functionaliteit inbouwt in de suites die de data al bezitten.

### Verplichtstellingen en opvallende adoptie

Er is **geen** formele mandaatstelling gevonden (geen overheids- of opdrachtgeversverplichting om nPlan te gebruiken). Wel het sterkste de-facto signaal dat gevonden is: **Transpennine Route Upgrade gaf in 2022 aan nPlan te willen inzetten *in plaats van* QSRA over het volledige programma** — een expliciete vervanging van de industriestandaard, niet een aanvulling. BAM was launch partner voor Portfolio met een startportfolio van 50 projecten.

---

## 8. Eindoordeel

### Voor wie is nPlan de juiste keuze

- **Opdrachtgevers en aannemers van megaprojecten (> £/€ 500 mln) met L3-planningen in P6 of Asta** en een bestaande, maar frustrerende, QSRA-praktijk. Als je nu twee keer per jaar een workshopgedreven Monte-Carlo doet die niemand vertrouwt, is nPlan een reële categoriesprong.
- **Portfolio- en programmadirecteuren** die tientallen projecten moeten vergelijken op leverbaarheid zonder per project een risicoteam te hebben (Portfolio + Barry).
- **Assurance-, tender- en investeringsbeslissingsprocessen:** onafhankelijke, niet-partijdige beoordeling van aannemersplanningen bij aanbesteding, en van baselines vóór FID. Dat is een van nPlans overtuigendste toepassingen (zie de highways-tenderevaluatie).
- **Organisaties met een goed archief aan historische P6-bestanden** en zonder contractuele bezwaren tegen het delen daarvan.
- **Iedereen die planningskwaliteit wil meten** — de gratis Schedule Integrity Checker is onvoorwaardelijk aan te raden, ongeacht of je nPlan verder koopt.

### Voor wie niet

- **Wie een planningspakket zoekt.** nPlan vervangt P6, Asta of MS Project niet en wil dat ook niet. Je hebt er altijd een volwaardige CPM-tool náást nodig.
- **Wie tijd, kosten en resources in één model wil.** Geen resourcemodel, geen kostenmodel, geen EVM, geen levelling. Voor geïntegreerde beheersing kijk je eerder naar Primavera/InEight/Spider Project.
- **Mkb, woningbouw, kleinere commerciële projecten.** De economie van het model (per-klant modeltraining, begeleide onboarding, enterprise-contract) past niet, en onder L3-detail met een paar honderd activiteiten levert het model weinig.
- **Organisaties met slechte planningshygiëne.** Zonder volledige logicaketen, zonder opgeruimde constraints en kalenders, en met activiteiten van meerdere maanden, valt te veel buiten de analyse. Eerst opruimen, dan pas nPlan.
- **Wie IFC/openBIM als spil hanteert.** Er is geen IFC-, BIM- of 4D-aansluiting. De enige brug is een conversie naar P6 XML/XER.
- **Wie contractueel harde garanties op prognosekwaliteit nodig heeft**, of wie geen licentie op zijn planningsdata voor modeltraining wil verstrekken. Beide zijn onderhandelbaar noch standaard in het voordeel van de klant.
- **Wie prijsvergelijking en aanbestedingstransparantie nodig heeft.** Zonder publieke lijstprijs en zonder G-Cloud-vermelding is een concurrerende gunning lastig te onderbouwen — het enige precedent in Contracts Finder is een single tender action.

### Samenvattend

nPlan is de meest overtuigende exponent van een echte categorieverschuiving in schedule risk: van subjectieve, incidentele QSRA naar datagedreven, continue prognose. De techniek is serieus (GNN's, per-klant modellen, eigen simulatie-engine, peer-reviewed publicaties), de klantenlijst is zwaar, en de gratis integriteitstool is oprecht nuttig. Daar staat tegenover dat het een **smalle, dure, gesloten en slecht extern gevalideerde** oplossing is: geen resources, geen kosten, geen IFC, geen publieke prijs, geen publieke API-documentatie, geen onafhankelijke reviewbasis, en een contract dat de accuratesse die het verkoopt expliciet niet garandeert terwijl het wél een blijvende licentie op jouw data neemt. Voor een klein aantal zeer grote programma's is dat een verdedigbare ruil. Voor de meeste organisaties niet.

**Relevantie voor een open-source IFC-planner:** nPlan is geen concurrent — het is een aanpalende laag. De enige zinvolle integratieroute is **P6 XML-export**, en nPlans publieke schedule-integriteitseisen zijn gratis, bruikbare specificatie voor wat een kwalitatief goede CPM-planning moet zijn.

---

## Bronnen

Alle URL's geraadpleegd op **25 juli 2026**.

### Leverancier (primair)
1. nPlan homepage — https://www.nplan.io
2. Producten-overzicht — https://www.nplan.io/products-overview
3. Insights Pro — https://www.nplan.io/products/insights-pro
4. Insights Core — https://www.nplan.io/products/insights-core
5. Insights Risk Professional — https://www.nplan.io/products/insights-risk-professional
6. Portfolio — https://www.nplan.io/products/portfolio
7. Schedule Studio — https://www.nplan.io/products/schedule-studio
8. Schedule Studio (P6-variant) — https://www.nplan.io/page/schedule-studio-primavera-p6
9. Schedule Studio signup / gratis proef — https://www.nplan.io/page/schedule-studio-signup
10. AutoReport — https://www.nplan.io/products/autoreport
11. AutoReport aanschaf ("we'll get in touch with pricing information") — https://www.nplan.io/get-autoreport
12. Schedule Integrity Checker (gratis) — https://www.nplan.io/products/schedule-integrity-checker
13. Decision Intelligence — https://www.nplan.io/products/decision-intelligence
14. Our AI (modelarchitectuur) — https://www.nplan.io/our-ai
15. nERD onderzoeksafdeling — https://www.nplan.io/nerd
16. Our Story (historie, funding) — https://www.nplan.io/our-story
17. Careers — https://www.nplan.io/careers
18. Knowledge Base — https://www.nplan.io/knowledge-base
19. Terms of Service (index van contractdocumenten) — https://www.nplan.io/terms-of-service
20. Sitemap (220+ URL's; geverifieerd nul treffers op IFC/BIM/4D) — https://www.nplan.io/sitemap.xml

### Contractdocumenten (PDF, primair — belangrijk voor licentiemodel en datarechten)
21. **Master Services Terms & Conditions 251210** — https://cdn.prod.website-files.com/65b3e9229ea906a76be3ac7f/6939d34634ef38e395733516_Master%20Services%20Terms%20%26%20Conditions%20251210.pdf (art. 3.5/3.6 datalicentie voor AI-training; art. 4 fees/Ordering Document; art. 5 termijn; art. 6 warranty disclaimer; art. 9 uptime 99,5% + service credits; art. 10 support-SLA)
22. **Master Services Terms & Conditions — Schedule Studio** — https://cdn.prod.website-files.com/65b3e9229ea906a76be3ac7f/69f1dcc8f445c5dba36a04cb_nPlan_SST_MSTCs.pdf ("analytical tools only", "no liability whatsoever")
23. **Insights Pro Free Trial T&Cs 240717** (14 dagen) — https://cdn.prod.website-files.com/65b3e9229ea906a76be3ac7f/669f7eee5363ab791d22187a_nPlan%20Insights%20Pro%20Free%20Trial%20-%20Terms%20and%20Conditions%20240717.pdf
24. AutoReport Free Trial Ts&Cs 240611 — https://cdn.prod.website-files.com/65b3e9229ea906a76be3ac7f/6668254a72662cdc2ac26a91_AutoReport%20Free%20Trial%20Ts%26Cs%20240611.pdf
25. Master Services Agreement Australië — https://cdn.prod.website-files.com/65b3e9229ea906a76be3ac7f/65b3e9229ea906a76be3ad2f_5889f5df851014d385dbaffc71a34839_Master%20Services%20Agreement%20AUS.pdf
26. Data and Cloud Hosting Policy v1.1 — https://cdn.prod.website-files.com/65b3e9229ea906a76be3ac7f/6824a140e4c9b1d3638831cc_Data%20and%20Cloud%20Hosting%20Policy%20v1.1.pdf

### Officiële documentatie / helpcentrum (nPlan Zendesk — 87 artikelen, opgehaald via de publieke Help Center API)
27. Accepted file formats — https://nplan.zendesk.com/hc/en-us/articles/360018903937
28. **Known limitations of nPlan** — https://nplan.zendesk.com/hc/en-us/articles/360019028078
29. Are resources and costs included? — https://nplan.zendesk.com/hc/en-us/articles/360019026058
30. Calendar restrictions — https://nplan.zendesk.com/hc/en-us/articles/360018901417
31. Unchangeable constraints — https://nplan.zendesk.com/hc/en-us/articles/360018901397
32. Schedule Integrity (12-punts eisenlijst + factfile-checks) — https://nplan.zendesk.com/hc/en-us/articles/18013236754205 en https://nplan.zendesk.com/hc/en-us/articles/8861807368349
33. Model Selection (MLP/GNN/ensemble) — https://nplan.zendesk.com/hc/en-us/articles/18013101008797
34. Understanding nPlan Projections (verdelingsvormen) — https://nplan.zendesk.com/hc/en-us/articles/17844380650909
35. Schedule Logic / driving paths / merge bias — https://nplan.zendesk.com/hc/en-us/articles/17844601852829
36. Mitigation Scenarios — https://nplan.zendesk.com/hc/en-us/articles/18012867641501
37. How does nPlan select top risks? (Intervention Recommender) — https://nplan.zendesk.com/hc/en-us/articles/8948995782813
38. Why does nPlan not identify the potential cause of delay? — https://nplan.zendesk.com/hc/en-us/articles/8948797805981
39. Level of detail — https://nplan.zendesk.com/hc/en-us/articles/8948794774557 en https://nplan.zendesk.com/hc/en-us/articles/360019023378
40. LoE tasks excluded — https://nplan.zendesk.com/hc/en-us/articles/8948990284317
41. Can nPlan be integrated with other software? (API) — https://nplan.zendesk.com/hc/en-us/articles/360012506617
42. Turnaround time — https://nplan.zendesk.com/hc/en-us/articles/360018905677 en processing time https://nplan.zendesk.com/hc/en-us/articles/360012558378
43. Configure/setup (per-klant modeltraining) — https://nplan.zendesk.com/hc/en-us/articles/360019028118
44. Where do you get your data from? — https://nplan.zendesk.com/hc/en-us/articles/360012386017
45. Is my data secure? (ISO 27001, SOC 2 Type II) — https://nplan.zendesk.com/hc/en-us/articles/11385200375837
46. Does it cost me anything…? (SIC gratis) — https://nplan.zendesk.com/hc/en-us/articles/11385168127773
47. Criticality / delay contribution — https://nplan.zendesk.com/hc/en-us/articles/360012573638 en https://nplan.zendesk.com/hc/en-us/articles/360012573678
48. Barry FAQ's / Is my data safe when using Barry? — https://nplan.zendesk.com/hc/en-us/articles/11016327125149 en https://nplan.zendesk.com/hc/en-us/articles/10962047001757
49. How to download your insights (CSV) — https://nplan.zendesk.com/hc/en-us/articles/10509378026269

### Persberichten en releasenieuws
50. Series B $16 mln — https://www.nplan.io/press-releases/nplan-raises-16m-series-b-to-scale-its-ai-led-transformation-of-capital-project-delivery
51. Spark NEL / North East Link (9 dec 2025; klantenlijst, $500 mrd claim) — https://www.nplan.io/press-releases/spark-nel-ignites-ai-partnership-with-nplan-to-assure-and-de-risk-victorias-largest-highways-project
52. BAM launch partner nPlan Portfolio (27 juli 2023) — https://www.nplan.io/press-releases/bam-joins-forces-with-nplan-to-roll-out-new-approach-to-portfolio-risk-management-powered-by-ai-and-past-project-data
53. Transpennine Route Upgrade-deal (1 nov 2022; "use nPlan rather than QSRA") — https://www.nplan.io/press-releases/nplan-on-track-for-rail-sector-expansion-with-transpennine-route-upgrade-deal
54. Power BI-integratie (24 okt 2025) — https://www.nplan.io/blog-posts/nplan-insights-pro-and-nplan-portfolio-now-integrate-with-power-bi
55. Traditional risk software vs nPlan (27 jan 2026) — https://www.nplan.io/blog-posts/traditional-risk-software-vs-nplan
56. Casestudy's: Network Rail GWML, TRU, HS2/SCS JV, highways-tenderevaluatie, LNG Canada, Suffolk Boston — https://www.nplan.io/case-studies

### Overheids- en registerbronnen
57. **UK Contracts Finder API** — gunning nPlan Limited, £60.756,17, "Schedule Assurance Services", Restoration & Renewal Delivery Authority Ltd, single tender action, gegund 28-11-2022 — https://www.contractsfinder.service.gov.uk/api/rest/2/search_notices/json (notice `tender_339745/1160324`)
58. **Companies House** — NPLAN LIMITED, nr. 11043916, opgericht 02-11-2017, jaarrekening "total exemption full accounts" t/m 31-12-2024 — https://find-and-update.company-information.service.gov.uk/company/11043916
59. **Crown Commercial Service Digital Marketplace (G-Cloud 14)** — 0 resultaten voor "nPlan", d.w.z. geen openbare rate card — https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/search?q=nPlan

### Wetenschappelijke publicaties
60. Mosca, A., Hovhannisyan, V., Phillips, R. — *Quantitative Schedule Risk Analysis Using Artificial Intelligence Trained on Historical Data*, Lecture Notes in Civil Engineering (CSCE 2024 proceedings, vol. 2) — DOI 10.1007/978-3-031-97701-5_19 (metadata via Crossref)
61. Zachares, P.A., Hovhannisyan, V., Mosca, A., Gal, Y. — *Form follows Function: Text-to-Text Conditional Graph Generation based on Functional Requirements* — https://arxiv.org/abs/2311.00444

### Onafhankelijke/derde bronnen
62. Planning Planet, forumdraad "AI driven tools for Planning" (posts apr 2026) — nPlan genoemd naast Nodes & Links, Clarity Axis en ALICE; tegengeluid van Alex Lyaschenko over geïntegreerde systemen (Spider Project) — https://planningplanet.com/forums/planning-scheduling-programming-discussion/1079091/ai-driven-tools-planning
63. Digital Construction Plus — nPlan Series B, klantenlijst incl. MTR/NEOM, "$1,2 mrd bespaard"-claim — https://digitalconstructionplus.com/nplan-secures-16m-to-scale-ai-project-de-risking-tech/
64. UK Tech News — Series B details — https://www.uktechnews.info/2025/10/17/nplan-secures-11-9-million-series-b-investment-led-by-caphorn/
65. B2BSalesTools, "nPlan Review 2026" — marktpositionering en "contact-sales pricing with enterprise contract structure". **Let op: AI-gegenereerde aggregatorpagina, lage betrouwbaarheid** — https://b2bsalestools.com/tools/nplan/
66. ITQlick-afgeleide prijsvergelijkingen voor Deltek Acumen Risk / Safran Risk / Primavera Risk Analysis / RiskyProject — **derde-partijschattingen, lage betrouwbaarheid** — https://www.itqlick.com/acumen/pricing

### Niet toegankelijk gebleken (relevant als bevinding op zich)
67. G2 — https://www.g2.com/products/nplan/reviews — HTTP 403 / captcha; gerapporteerde rating **4,3/5** alleen via zoeksnippet, **niet direct geverifieerd**, reviewaantal onbekend
68. TrustRadius — https://www.trustradius.com/products/nplan/reviews — HTTP 403
69. SoftwareAdvice, SourceForge, Slashdot, F6S, Glassdoor — HTTP 403 of botdetectie
70. Capterra / Gartner Peer Insights — geen nPlan-productpagina gevonden
