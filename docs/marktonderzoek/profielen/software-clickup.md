# Softwareprofiel: ClickUp

**Categorie:** All-in-one werkbeheer (collaborative work management, CWM) met Gantt-view
**Onderzoeksdatum:** 25 juli 2026
**Analist:** marktonderzoek planningssoftware
**Kernoordeel in één zin:** ClickUp is een zeer brede, scherp geprijsde werkbeheersuite met een Gantt-view en een gemarkeerd "kritiek pad" — maar **geen echte CPM-netwerkplanner**, en tot juni 2026 kende het zelfs alleen Finish-to-Start-relaties zonder lag.

> **Leeswijzer bronvermelding.** Bedragen en harde claims hebben een bron-URL en datum. Waar ik iets afleid of inschat in plaats van citeer, staat expliciet **[SCHATTING]** of **[ONGEVERIFIEERD]**. Waar bronnen elkaar tegenspreken staat **[CONFLICT]** met beide lezingen.
>
> **Methodologische beperking.** De WebSearch-quota van deze sessie was uitgeput vóór aanvang. Het onderzoek is uitgevoerd met directe WebFetch op leveranciers-, documentatie- en reviewpagina's plus DuckDuckGo-HTML/Lite als zoekvervanger. G2, Capterra, TrustRadius, PCMag en Reddit blokkeerden directe fetch (HTTP 403 / geblokkeerde host); hun inhoud is daarom via zoekmachine-snippets en aggregators verkregen en is navenant minder betrouwbaar. Dat is per punt gemarkeerd.

---

## 1. Wat het is

### Leverancier en eigendom

| Item | Gegeven | Bron |
|---|---|---|
| Product | ClickUp | clickup.com |
| Juridische entiteit | Mango Technologies, Inc. (h.o.d.n. ClickUp) | algemeen bekend **[ONGEVERIFIEERD in deze sessie]** |
| Hoofdkantoor | San Diego, Californië, VS | getlatka.com/companies/clickup |
| Opgericht | 2017 | getlatka.com; dexteragent.ai |
| Oprichters | Zeb Evans (CEO), Alex Yurkowski (CTO) | dexteragent.ai/companies/clickup-1771932438 |
| Eigendom | Privaat, VC-gefinancierd — geen beursnotering | getlatka.com |
| Totale financiering | $537,5 mln over 5 rondes | getlatka.com (peildatum 3 juli 2026) |
| Grootste ronde | $400 mln Serie C, okt. 2021, o.l.v. Andreessen Horowitz + Tiger Global | getlatka.com |
| Waardering | $4 mrd | getlatka.com (3 juli 2026) |
| ARR | > $300 mln | Zeb Evans, aangekondigd 9 sept. 2025; bevestigd getlatka.com feb. 2026 |
| Gebruikers | 20 mln+ | sqmagazine.co.uk/clickup-statistics (via snippet) |
| Betalende klanten | ~100.000 | getlatka.com |
| Medewerkers | ~1.010 (mei 2026), ná reorganisatie | getlatka.com |

### Bedrijfsontwikkeling 2026 — relevant voor leveranciersrisico

In **mei 2026** ontsloeg ClickUp **22% van het personeel** (ca. 290 van 1.300 posities) en zette het naar eigen zeggen ~**3.000 interne AI-agents** in — een verhouding van 3 agents per medewerker. CEO Zeb Evans presenteerde dit niet als kostenbesparing maar als "structurele verschuiving naar AI-gedreven operatie", met beloofde salarisbanden tot $1 mln voor overblijvende medewerkers die "100x output" leveren.
Bronnen: mlq.ai/news/clickup-lays-off-22-of-staff-deploys-3000-ai-agents-in-radical-restructuring/ (22 mei 2026); layoffhedge.com/company/clickup; aieatingtheworld.com.

Parallel daaraan is een enterprise-offensief ingezet (o.a. Jeff de Ruyter als Global VP & GM Enterprise) met als doel $1 mrd ARR, en meldt het bedrijf dat "meer dan 40% van nieuwe sales-led deals AI bevat".

**Analyse:** een reorganisatie van deze omvang, gecombineerd met een agressieve AI-herpositionering, is een reëel continuïteits- en roadmaprisico voor kopers die op een 5-10-jarige planningshorizon zitten (zoals bouw). Het is géén faillissementssignaal — $300 mln ARR en $4 mrd waardering zijn solide — maar wél een signaal dat productprioriteiten kunnen verschuiven van diepe planningsfunctionaliteit naar AI-features.

### Doelgroep, typische gebruikers, sectoren en regio's

- **Doelgroep:** primair MKB en midmarket; teams van 5-500. Sinds 2025/2026 een expliciete enterprise-push.
- **Typische gebruikers:** marketingteams, digitale bureaus/agencies, product- en softwareteams, operations, interne PMO's, client services. Dit zijn *werkbeheer*-gebruikers, geen planners.
- **Sectoren:** ClickUp positioneert zich horizontaal (elke sector) met marketing-landingspagina's per verticaal, waaronder één voor bouw (clickup.com/teams/construction). Die pagina noemt Gantt, dependencies, RFI-formulieren, tijdregistratie en bestandsannotatie — maar **noemt nergens CPM, BIM, planningscompressie of earned value**. Bouw is een marketingverticaal, geen productverticaal.
- **Regio's:** wereldwijd, met VS-zwaartepunt. Dataresidentie beschikbaar in AWS-regio's Ierland (Europa), Australië, Singapore en VS; EU-hosting sinds juli 2023 zonder meerkosten voor Enterprise-abonnees (businesswire.com, 17 juli 2023; clickup.com/security).
- **Compliance:** SOC 2 Type II, ISO 27001, GDPR, HIPAA beschikbaar (Enterprise), 99,9% uptime-SLA. Bron: clickup.com/security via snippet **[ONGEVERIFIEERD — securitypagina niet direct gefetcht]**.

---

## 2. Functionaliteit en techniek — is dit echte netwerkplanning?

### Kort antwoord: nee

ClickUp tekent een balkenschema met verbindingslijnen en kleurt een reeks taken rood als "kritiek pad". Dat is niet hetzelfde als een CPM-engine. Hieronder de onderbouwing, punt voor punt.

### 2.1 Afhankelijkheidstypen — het doorslaggevende bewijs

Dit is de belangrijkste bevinding van dit profiel.

Op ClickUps eigen feedbackportaal staat het feature-verzoek **"Advanced Dependency Options"** met **792 stemmen**. De officiële statusupdates van ClickUp-productmanagers:

- **29 april 2026** — Bugra Oktay (ClickUp Product): *"We are getting very close to completing this feature. In the next couple weeks, I'll share the sign up form for our beta program."*
- **6 mei 2026** — aanmelding early access geopend, doel "uitrol naar early-accessgebruikers in juni".
- **9 juni 2026** — Vasil Enchev (ClickUp Product): *"We're actively rolling this out to early access users right now and targeting a broader release soon this quarter."*

Bron: feedback.clickup.com/feature-requests/p/advanced-dependency-options (geraadpleegd 25 juli 2026).

Wat dit betekent:

| Relatietype | Status per juli 2026 |
|---|---|
| Finish-to-Start (FS) | Ja — enige type dat jarenlang bestond |
| Start-to-Start (SS) | Beta / early access sinds juni 2026 |
| Finish-to-Finish (FF) | Beta / early access sinds juni 2026 |
| Start-to-Finish (SF) | Beta / early access sinds juni 2026 |
| **Lead/lag time (bijv. FS+5d, SS-2d)** | **Bestaat niet.** Op de roadmap als "onder overweging" ná "dependency enforcement" |

De officiële formulering op datzelfde verzoek — **bij verificatie gedateerd op 15 juli 2026, Vasil Enchev (ClickUp Product)**, de meest recente statusupdate: *"Advanced dependency types are now in beta, dependency enforcement is coming next, and we're actively deciding what to build after that — including lead/lag time."* De status van het verzoek staat op **"building now"**; het stemmenaantal van **792** is bevestigd.

Kanttekening bij verificatie: de officiële staf-updates bevestigen *"advanced dependency types"* in beta zónder de vier typen bij naam te noemen; de expliciete opsomming FS/SS/FF/SF komt uit gebruikerscommentaar op dezelfde pagina. De richting is dus zeker, de precieze scope van de beta is dat net niet. **[deels ONGEVERIFIEERD]** Het ontbreken van lead/lag time is wél letterlijk door ClickUp zelf bevestigd en is de dragende bevinding.

**Dit is diskwalificerend voor bouwplanning.** Een bouwschema zonder lags is niet te modelleren: "wapening vlechten kan starten 2 dagen nadat bekisting begonnen is" (SS+2), "uitharden beton 21 dagen" als lag in plaats van fantoomtaak, "oplevering uiterlijk 5 dagen na laatste keuring" (FF+5) — geen daarvan kan in ClickUp zonder kunstmatige hulptaken. Wie het toch probeert, bouwt een schema vol dummy-taken die de netwerkintegriteit en elke latere vertragingsanalyse onbruikbaar maken.

Meerdere derde bronnen die claimen dat ClickUp "alle vier de afhankelijkheidstypen" ondersteunt (o.a. vergelijkingssites) zijn **onjuist of hooguit sinds juni 2026 gedeeltelijk juist**; ze verwarren waarschijnlijk de generieke Gantt-uitleg in ClickUps blog met de daadwerkelijke productfunctionaliteit. **[CONFLICT — opgelost in het voordeel van het leveranciers-feedbackportaal, dat de primaire bron is]**

### 2.2 Kritiek pad en float

ClickUp heeft wél een functie "Critical Path and Slack Time" (help.clickup.com/hc/en-us/articles/6310440099479 — pagina zelf gaf HTTP 403, inhoud via zoeksnippet). De documentatiezin die in de snippet zichtbaar is:

> *"If the last task in the critical path is dependent on another task, and there is no time gap in between them, each of the tasks will be added to the path (shown in red)."*

**Analyse van die formulering:** dit beschrijft een *achterwaartse ketenwandeling vanaf de laatste taak, waarbij een keten breekt zodra er een tijdgat is*. Dat is een vereenvoudigde heuristiek, geen klassieke forward-pass/backward-pass met early start / early finish / late start / late finish per activiteit. Een echte CPM-engine berekent total float per activiteit en definieert het kritieke pad als de verzameling activiteiten met float ≤ 0 (of ≤ drempel), inclusief meerdere parallelle kritieke paden en near-critical-paden. De ClickUp-formulering suggereert een enkelvoudige ketentraversering. **[SCHATTING — gebaseerd op de documentatietekst; de daadwerkelijke implementatie is niet publiek gespecificeerd en ik kon de volledige helppagina niet openen]**

Beperkingen die wél hard vaststaan:
- Kritiek pad en slack time vereisen minimaal het **Unlimited**-plan; op Unlimited zijn ze beperkt tot **100 keer gebruiken**, onbeperkt vanaf Business (help.clickup.com via snippet).
- Op het **gratis** plan is Gantt beperkt tot ca. **60 keer gebruiken** (usecarly.com/blog/clickup-free-plan-limits; costbench.com noemt 60 uses).
- Er is **geen onderscheid tussen total float en free float** aangetroffen — alleen "slack time" als enkelvoudig begrip. **[SCHATTING]**

### 2.3 Planningsengine en kalenders

Hier heeft ClickUp in 2026 wél serieus geïnvesteerd. ClickUp **herbouwde de Gantt-planningsengine**: één gedeelde engine propageert datumwijzigingen over duur, afhankelijkheden, parent-childrelaties en niet-werkdagen (zenpilot.com/clickup-weekly/clickup-gantt-auto-scheduling/).

Wat er nu is:
- **Duur-veld** per taak; de engine plant rond weekenden en ingestelde vrije dagen bij het toekennen van duur.
- **ClickApps** die je aan/uit zet: *Reschedule Dependencies*, *Duration*, *Remap Subtask Due Dates*, *Only Use Working Days for Scheduling*.
- **Parent-taak-autoremapping:** startdatum van de ouder = vroegste subtaak, einddatum = laatste subtaak, dynamisch bijgewerkt.
- **Skip non-working days** werkt consistent door bij herplanning, subtask-remaps en automatiseringen.
- **Out-of-office-beheer** staat op de 2026-roadmap.

Wat er **niet** is:
- **Geen kalendermodel in CPM-zin.** Er is één workspace-brede notie van werkdagen. Geen meerdere benoemde kalenders, geen ploegendiensten, geen per-taak- of per-resource-kalender, geen kalender met uren-per-dag-profielen, geen feestdagenkalenders per land/project. Dit is een fundamenteel verschil met P6/MSP, waar kalendertoewijzing per activiteit en per resource de kern van het rekenmodel is. **[SCHATTING — gebaseerd op afwezigheid van enige vermelding in documentatie, roadmap of reviews; ik heb geen expliciete bevestiging van deze beperking gevonden]**
- **Geen constraints.** Geen Start-No-Earlier-Than, Finish-No-Later-Than, Must-Start-On, As-Late-As-Possible, deadlines met constraint-semantiek. **[SCHATTING — niet aangetroffen in enige bron]**
- **Geen resource-levelling.** Expliciet niet aangetroffen; geen enkele bron noemt levelling of smoothing.
- **Geen kalender-gedreven duurconversie** (bijv. "10 werkdagen op een 5-daagse kalender vs. 7-daagse kalender per activiteit).

De engine is dus een **datumpropagatiemechanisme** ("als A schuift, duw B door"), niet een netwerkoplosser die het hele schema herberekent vanuit logica, kalenders, constraints en resources.

### 2.4 Baselines

Hier is ClickUp in 2026 verbeterd. **Gantt-baselines** zijn uitgerold — **gecorrigeerd: release 6 mei 2026 (ClickUp v4.04)**, niet juli 2026; de juli-releasenotes waren een latere vermelding, niet de introductie (changelog v4.04: *"This week's ClickUpdates brings Gantt Baselines to track how your project plans shift over time"*; releasebot.io/updates/clickup; zenpilot.com/clickup-weekly/clickup-weekly-013/):

> *"Use baselines to create visual snapshots of your task dates in Gantt views. Baselines capture the start and end dates of the tasks in a List, Folder, or Space, at a point in time."*

Daarnaast **Baseline Fields (beta)**: baselinegegevens (start/einddatum, duur, status) worden als custom fields op taken ontsloten, zodat je er in views en dashboards mee kunt rekenen.

Beperking: dit is een **datum-baseline**, geen **kosten- of urenbaseline**. Er is geen baselined budget, geen baselined resource-inzet, en dus geen fundament voor earned value.

### 2.5 Resource- en kostenmodel

**Resources:**
- **Workload-view**: visualiseert capaciteit per persoon per dag/week/maand, meetbaar in uren, taken, story points of een custom eenheid; markeert over-/ondercapaciteit.
- **Ingebouwde tijdregistratie** met schattingen, globale timer, rapportage.
- Wat ontbreekt: resource-pools met kosttarieven per rol, resourcekalenders, resourcegedreven planning, levelling, materialen/materieel als resourcetype. Reviewers noemen expliciet gebrekkig inzicht in toewijzingsbelasting (r/clickup "Your Thoughts on Clickup").

**Kosten:**
- **Geen native kostenmodel.** Kostenopvolging gebeurt via custom fields, formulevelden en tijdregistratie met tarieven.
- Bekende blokkade uit de community: *"formula custom fields columns cannot be summed up together"* — formulevelden zijn niet optelbaar over taken heen, wat rollup van kosten naar project- of faseniveau frustreert.
- **Geen earned value management.** Community-oordeel: *"The project-level calculations needed for EV are very difficult to achieve in ClickUp."*
- Geen kostenbaseline, geen cashflowprognose, geen S-curves anders dan handmatig in dashboards.

### 2.6 Platform en schaalbaarheid

**Architectuur:** SaaS, multi-tenant op AWS. Web-app, desktopwrappers (Electron-achtig), iOS/Android. Publieke REST-API v2 en v3. Geen on-premise optie.

**Harde limiet:** **maximaal 5.000 taken laden tegelijk in een view** — bevestigd in ClickUps eigen documentatie (*"Up to 5,000 tasks can load at a time in one view"*), met het advies *"Use filters to refine the tasks displayed in List view."* **Gecorrigeerd:** de eerder geciteerde motivatie "to improve platform performance" is bij verificatie **niet als letterlijke leverancierstekst terug te vinden**; de documentatie noemt de limiet zonder expliciete reden. De prestatie-interpretatie blijft plausibel maar is een afleiding. **[SCHATTING]**

**Praktische schaal — dit is het pijnpunt.** Het aantal taken dat je *kunt aanmaken* is onbeperkt; het aantal dat *werkbaar* is, ligt veel lager. Bevindingen:

- Medium-analyse van een intensieve gebruiker: ClickUp 3.0 is *"slow and buggy"* bij **50+ records**, verergerend bij hogere volumes (medium.com/@oleksandrsh4, "16 Ridiculous ClickUp Issues That Nobody Expected").
- ClickUps eigen feedbackportaal heeft een permanente thread **"SLOWNESS"**, plus *"Severe performance degradation in a low-data, single-user workspace"* — waarbij de conclusie is dat het probleem serverzijdig of workspace-structuurgebonden is, niet clientzijdig.
- r/clickup bevat meerdere jarenlange klaagdraden: *"Why is ClickUp so slow?"* (twee aparte threads), *"So slow and laggy - anyone else?"*, *"ClickUp takes 30s to open a doc"*.
- Een LinkedIn-analyse claimt dat 66% van ontevreden gebruikers snelheid/prestaties als topzorg noemt **[ONGEVERIFIEERD — marketingcontent van een concurrerende app, Excavator; behandel met scepsis]**.
- Prestatiefactoren volgens ClickUp zelf: aantal custom fields op een List, volume gesloten taken, totaal aantal taken in combinatie met filtering.

**Realistisch bruikbaar volume voor een planning:** **[SCHATTING]** Op basis van bovenstaande schat ik dat een ClickUp-Gantt comfortabel werkt tot enkele honderden taken per view, met merkbare degradatie richting 1.000-2.000 en de harde muur op 5.000 per view. Ter vergelijking: een middelgroot bouwproject in P6 heeft routinematig 3.000-15.000 activiteiten in één schema, een groot infraproject 50.000+. **ClickUp zit één tot twee ordes van grootte onder wat klassieke planningstools aankunnen.**

### 2.7 Samenvattend technisch oordeel — streng

| CPM-criterium | ClickUp |
|---|---|
| Echte forward/backward pass met ES/EF/LS/LF | Niet aantoonbaar; heuristische ketentraversering **[SCHATTING]** |
| Total float per activiteit | "Slack time", enkelvoudig; geen total/free-onderscheid |
| Meerdere parallelle kritieke paden | Onduidelijk, waarschijnlijk niet **[SCHATTING]** |
| FS / SS / FF / SF | FS altijd; SS/FF/SF sinds juni 2026 in beta |
| Lead/lag | **Nee** |
| Constraints (SNET/FNLT/MSO/ALAP) | **Nee** |
| Meerdere kalenders (project/taak/resource) | **Nee** — één werkdagen-instelling |
| Resource-levelling / smoothing | **Nee** |
| Kostenmodel + kostenbaseline | **Nee** (custom fields workaround) |
| Earned value | **Nee** |
| Datum-baseline | **Ja** (2026) |
| Schaal (activiteiten) | Honderden tot laag-duizenden; hard cap 5.000/view |

**Conclusie: ClickUp is een balkenschema-tool met afhankelijkheden en een gemarkeerd kritiek pad, geen netwerkplanner.** Het is precies het patroon dat de opdracht voorspelde: een werkbeheertool die een Gantt *tekent* zonder er echt in te *rekenen*. Dat ClickUp in 2026 de planningsengine herbouwde, baselines uitrolde en eindelijk aan SS/FF/SF begon, is echte vooruitgang — maar het bevestigt tegelijk hoe laag het startpunt lag.

---

## 3. Prijzen

Alle bedragen in **USD**, per gebruiker per maand, tenzij anders vermeld. **Primaire bron: clickup.com/pricing, geraadpleegd 25 juli 2026.**

### 3.1 Kernplannen

| Plan | Jaarlijkse facturering | Maandelijkse facturering | Per gebruiker per jaar (jaarlijks gefactureerd) |
|---|---|---|---|
| **Free Forever** | $0 | $0 | $0 |
| **Unlimited** | **$7** (leverancier bevestigd) | **$10** (onafhankelijk bevestigd) | $84 |
| **Business** | **$12** (leverancier bevestigd) | **$19** (onafhankelijk bevestigd) | $144 |
| **Enterprise** | Op aanvraag (custom) | Op aanvraag | zie 3.4 |

Bron jaarprijzen: clickup.com/pricing, 25 juli 2026 — letterlijk *"$7 Per user/month, billed yearly"* en *"$12 Per user/month, billed yearly"*. De pagina meldt *"Save up to 30% with yearly"*. Bij hernieuwde fetch (verificatieronde 25 juli 2026) toont de pagina de plannen als *"$7+"* en *"$12+"* — het plusteken duidt op het hogere maandtarief.

**[CONFLICT OPGELOST] over de maandprijs.** Bij een eerste fetch van clickup.com/pricing gaf de pagina $9 (Unlimited) en $15 (Business) als maandtarief. Dat is bij verificatie **niet reproduceerbaar** en wordt door geen enkele onafhankelijke bron ondersteund; vermoedelijk een verouderde of verkeerd gerenderde prijsschakelaar. Twee onafhankelijke bronnen bevestigen **$10 en $19**: thebusinessdive.com/clickup-review (*"$7 monthly if choosing the yearly billing. However, if you choose the monthly billing, it is $10 per user per month"* en *"$12 per user if you opt for the yearly plan… monthly billing, it is $19 per user"*) en comparedge (*"ClickUp runs free to $19 per user monthly, dropping to $7 and $12 billed yearly as of July 8, 2026"*). **$10 / $19 wordt hierbij als vastgesteld beschouwd; de $9/$15-lezing is verworpen.**

**[CONFLICT] over een prijsverhoging in feb. 2026.** De aggregator getpricepulse.com/companies/clickup-pricing.html claimt dat ClickUp in februari 2026 Unlimited van $7 naar $10 en Business van $12 naar $19 *jaarlijks* verhoogde (+43% resp. +58%). **Dit wordt tegengesproken door de live leverancierspagina van 25 juli 2026, die $7 en $12 jaarlijks toont.** De aggregator verwart vrijwel zeker jaar- met maandtarieven. Ik verwerp deze claim, maar noteer hem omdat hij in AI-samenvattingen circuleert.

### 3.2 Gratis tier — wat er echt in zit

- Onbeperkt taken en onbeperkt leden
- **60 MB** opslag (sommige bronnen noemen 100 MB — **[CONFLICT]**, leverancierspagina zegt 60 MB; bij verificatiefetch op 25 juli 2026 opnieuw **60 MB** — bevestigd)
- **100 automatiseringen/maand** (was onbeperkt tot Q3 2025)
- **1 dashboard** per workspace
- **Gantt beperkt tot 60 keer gebruiken *per maand*** — gecorrigeerd: het is een maandelijks quotum, geen eenmalig totaal (Forbes Advisor: *"limits the Gantt chart to 60 uses per month"*; usecarly.com; costbench.com)
- Collaborative docs, kanban, basis custom fields, 1 formulier, 24/7 support

De gratis tier is genereus qua zitplaatsen maar bewust nutteloos gemaakt voor planning: 60 Gantt-uses is een demo, geen werkinstrument.

### 3.3 AI-add-ons — de verborgen TCO-verdubbelaar

Bron: clickup.com/pricing, 25 juli 2026.

| Add-on | Prijs (jaarlijks gefactureerd) | Inhoud |
|---|---|---|
| Brain AI Free | $0 | Proeftoegang tot kern-AI |
| **Brain AI** | **$9** per gebruiker/maand | Onbeperkte Brain Assistant, onbeperkt @Brain Agent, 1.500 AI Super Credits/maand |
| **Everything AI** | **$28** per gebruiker/maand (aanbevolen door ClickUp) | Onbeperkte ambient answers, notetaker, beeldgeneratie, 5.000 Super Credits/maand |
| AI Super Credits | pay-as-you-go, $0,001–$10 per 10.000 credits | bijkoop |

De pagina meldt *"Save up to 20% with yearly"* op de AI-plannen en een **"Super Fair Billing policy"** die de prijs aanpast aan schommelende AI-kosten — dat wil zeggen: **ClickUp behoudt zich contractueel het recht voor de AI-prijs te wijzigen**.

**Rekensom:** Business ($12) + Everything AI ($28) = **$40 per gebruiker per maand jaarlijks gefactureerd = $480 per gebruiker per jaar**. Dat is meer dan drie keer de kale Business-prijs en ligt op enterprise-niveau. De aantrekkelijke instapprijs van $7 is dus alleen representatief zonder AI.

### 3.4 Enterprise

Geen publieke lijstprijs; verkoop via demo. Derde-partijschattingen (alle **[SCHATTING]**, geen leveranciersbevestiging):

| Bron | Genoemd bereik |
|---|---|
| Spendbase | $25–$40 per gebruiker/maand |
| Project Cost Estimator | $25–$45 per gebruiker/maand |
| Vendor Benchmark | $30–$44 lijst; $21–$34 effectief bij 500+ zitplaatsen (22–38% korting) |
| hackceleration.com | ~$500–$2.000/maand totaal voor 50+ gebruikers |

Enterprise voegt toe: SAML SSO, onbeperkte automatiseringen (250K/maand), custom roles, audit logs, HIPAA, dataresidentie per regio, API-limiet 10.000 req/min.

### 3.5 Licentiemodel — de commerciële addertjes

Dit is waar de meeste klachten zitten, en het is materieel voor TCO-berekeningen.

1. **Upgrades zijn workspace-breed.** ClickUps eigen pricingpagina: *"Workspace-wide upgrades required (no individual user upgrades)."* Je kunt niet drie planners op Business zetten en de rest op Free. Elke gebruiker in de workspace betaalt hetzelfde tarief. Voor een bouwbedrijf van 200 man dat 6 planners heeft, betekent dit 200 × $12 = $28.800/jaar in plaats van 6 × $12 = $864.
2. **Minimum zitplaatsen — CLAIM INGETROKKEN.** Het eerdere vermoeden van een minimum van 2 zitplaatsen is bij verificatie **weerlegd**: meerdere onafhankelijke bronnen stellen expliciet dat ClickUp **geen minimum zitplaatsaantal** kent (*"ClickUp has no minimum seat count for its Unlimited plan"*, resources.oreateai.com; *"ClickUp Unlimited is $7/user with no seat minimum"*, verdictscout.com), in tegenstelling tot bijv. Monday.com met een 3-zitplaatsenminimum. Eén betaalde zitplaats is mogelijk. Dit is dus juist een **voordeel** ten opzichte van concurrenten, niet een addertje.
3. **Jaarcontracten: zitplaatsverlaging werkt pas bij verlenging (genuanceerd).** De oorspronkelijke formulering "je kunt gedurende de termijn geen zitplaatsen verwijderen" is te sterk. Correcter: je kúnt leden mid-cyclus verwijderen, maar dat levert **geen tussentijdse restitutie of factuurverlaging** op — de vrijgekomen zitplaats telt pas mee bij de volgende verlenging (*"Removing a member mid-cycle on annual plans typically does not generate an immediate refund; the seat credit applies at renewal"*). Het economische effect is dus vergelijkbaar met vergrendeling, maar het mechanisme is een restitutiebeleid, geen harde lock. Gebruikers melden bovendien dat verlengingsfacturen alsnog oude zitplaatsaantallen overnemen ondanks toezeggingen van support: een non-profit van 40 mensen betaalde voor 46 zitplaatsen bij 39 actieve leden (r/clickup, "ClickUp's pricing is a masterclass in hostage-taking", 21 apr. 2026).
4. **Gratis promotiezitplaatsen worden betaald bij verlenging** — door meerdere gebruikers beschreven als *"extremely unethical"*.
5. **Business Plus is verborgen, niet afgeschaft — GECORRIGEERD.** De eerdere formulering "afgeschaft / verwijderd" is te sterk. De tier ($19/gebruiker/maand jaarlijks) staat **niet meer op de publieke pricingpagina**, maar bestaat nog en is bereikbaar via de upgradeflow in de workspace. ClickUp-support: *"Business Plus is not included on our pricing page, but you can see plan details when following the upgrade instructions in your Workspace"*; derden bevestigen *"Business Plus ($19/user/mo annual, hidden from public page)"* (Agiled) en *"not always prominently displayed on ClickUp's pricing page but exists in their documentation"* (QuackBack). Het aanbod is dus publiekelijk 4 tiers, feitelijk 5. Business Plus omvat custom role permissions, subtasks in multiple lists, 50.000 automatiseringen/maand en priority support. Datering van het verbergen onzeker (Q4 2024 volgens getpricepulse) **[ONGEVERIFIEERD]**. Consistent met het feit dat de API-rate-limit-tabel nog steeds een Business Plus-niveau kent.
6. **100% money-back guarantee** wordt geadverteerd op de pricingpagina.

---

## 4. VOORDELEN

1. **Ongeëvenaarde functionele breedte voor de prijs.** Taken, docs, whiteboards, chat, doelen, formulieren, dashboards, tijdregistratie, mindmaps en automatiseringen in één abonnement. Voor organisaties die nu Asana + Confluence + Toggl + Typeform betalen, is consolidatie naar $12/gebruiker/maand een reële besparing. Bron: clickup.com/pricing; hackceleration.com noemt ClickUp 30-50% goedkoper dan Monday.com of Asana bij vergelijkbare breedte.

2. **Meerdere views op dezelfde dataset zonder dubbele invoer.** List, Board, Gantt, Calendar, Timeline, Workload, Table, Mind Map — allemaal projecties van dezelfde taken. Een uitvoerder kijkt naar een bordweergave, de projectleider naar dezelfde data als Gantt. Dit is precies wat klassieke CPM-tools slecht doen.

3. **Een gratis tier die daadwerkelijk bruikbaar is voor niet-planningswerk.** Onbeperkt taken én onbeperkt gebruikers is uitzonderlijk; concurrenten limiteren doorgaans het aantal gebruikers. Uitstekend voor pilots, onderaannemers en klantcollaboratie. (Zij het: Gantt is er tot ~60 uses beperkt.)

4. **Ingebouwde tijdregistratie plus Workload-capaciteitsweergave.** Native timer, schattingen, rapportage, en capaciteitsvisualisatie in uren/taken/story points/custom eenheid. In deze prijsklasse is dat zeldzaam — bij Asana en Monday zijn dit add-ons of hogere tiers.

5. **Diepe configureerbaarheid.** Custom fields, custom statussen per Space/List, formulevelden, 5.000 automatiseringen/maand op Business, custom roles op Enterprise. Een team kan de tool naar zijn proces vormen in plaats van andersom.

6. **Volwassen, open integratielaag.** 1.000+ native integraties, REST-API v2 én v3 met personal- en OAuth-tokens, webhooks voor events, endpoints voor taken, afhankelijkheden, custom fields, tijdregistratie en de volledige hiërarchie (workspace → space → folder → list → task). Bron: developer.clickup.com. Voor wie zelf wil integreren is dit een prettige API.

7. **Aantoonbare roadmapuitvoering in 2026.** Herbouwde Gantt-planningsengine met één gedeelde datumpropagatie, auto-remapping van ouder-taken uit subtaken, "skip non-working days" die consistent doorwerkt, Gantt-baselines uitgerold, Baseline Fields in beta, en SS/FF/SF-afhankelijkheden in early access. Na jaren stilstand op de Gantt beweegt het nu daadwerkelijk. Bronnen: zenpilot.com/clickup-weekly/clickup-gantt-auto-scheduling/; releasebot.io/updates/clickup (juli 2026); feedback.clickup.com.

8. **Enterprise-compliance en dataresidentie.** SOC 2 Type II, ISO 27001, GDPR, HIPAA-optie, AES-256, 99,9% uptime-SLA, en EU-hosting (Ierland) zonder meerkosten voor Enterprise sinds juli 2023 — plus AU en SG. Voor Europese organisaties met datalokaliteitseisen is dat een echte afvinker. Bron: businesswire.com, 17 juli 2023; clickup.com/security.

9. **Hoge gebruikerswaardering en marktvalidatie.** G2 **4,6-4,7/5 over ~13.300 reviews** (gecorrigeerd: het eerder genoemde bereik "9.000-13.000+" is te ruim; actuele tellingen liggen op 13.314-13.331 reviews, en de score wordt zowel als 4,6 als 4,7 gerapporteerd); Capterra 4,6/5 over ~4.608 reviews; top-3 in 500+ G2-categorieën en aanwezig in 1.500+ G2 Winter 2026-rapporten. Dat weerspiegelt tevredenheid over *werkbeheer* — niet over planning — maar het is een echte markt-signaal. **[ONGEVERIFIEERD — via zoeksnippets; G2 en Capterra blokkeerden directe fetch]**

10. **Financiële soliditeit op korte termijn.** >$300 mln ARR, ~100.000 betalende klanten, 20 mln+ gebruikers, $4 mrd waardering, $537,5 mln opgehaald. Geen startupgokje.

---

## 5. NADELEN

1. **Geen echte CPM-engine — het zwaarste bezwaar.** Tot juni 2026 uitsluitend Finish-to-Start-relaties; SS/FF/SF nu in beta/early access; **lead/lag time bestaat nog steeds niet** en staat als "onder overweging" ná dependency enforcement. Bron: feedback.clickup.com/feature-requests/p/advanced-dependency-options, officiële ClickUp-productupdates 29 apr., 6 mei en 9 juni 2026, 792 stemmen. Zonder lags is een bouw- of engineeringschema alleen met dummy-taken te benaderen, wat de netwerklogica corrumpeert.

2. **Geen constraints, geen resource-levelling, geen kostenmodel, geen EVM.** Geen SNET/FNLT/MSO-constraints aangetroffen; geen levelling of smoothing; kostenopvolging alleen via custom fields en formules, waarbij *"formula custom fields columns cannot be summed up together"* — formulevelden zijn niet op te tellen over taken heen, waardoor kostenrollup naar fase- of projectniveau vastloopt. Community-oordeel over earned value: *"The project-level calculations needed for EV are very difficult to achieve in ClickUp."*

3. **Eén werkdagenmodel in plaats van kalenders.** Er is een "Only Use Working Days for Scheduling"-ClickApp en weekend-skipping, maar geen benoemde kalenders per project, taak of resource, geen ploegendiensten, geen feestdagenkalenders per land. Voor projecten met verschillende ploegen, 6-daagse werkweken of landspecifieke feestdagen is dit onwerkbaar. **[SCHATTING — gebaseerd op consistente afwezigheid in documentatie, roadmap en reviews]**

4. **Structurele prestatieklachten, ook bij bescheiden datavolumes.** Harde limiet van 5.000 taken per List-view. Een intensieve gebruiker rapporteert *"slow and buggy"* al bij **50+ records**, verergerend bij hogere volumes (medium.com/@oleksandrsh4). ClickUps eigen feedbackportaal draagt een permanente **"SLOWNESS"**-thread én *"Severe performance degradation in a low-data, single-user workspace"* — waarbij de conclusie is dat het probleem serverzijdig of workspace-structuurgebonden is. r/clickup heeft jarenlange klaagdraden: *"Why is ClickUp so slow?"* (twee threads), *"So slow and laggy"*, *"ClickUp takes 30s to open a doc"*. ClickUp 3.0 beloofde "2x overall app performance"; de klachten hielden aan.

5. **De Gantt-view stagneerde jarenlang en heeft nog steeds basale gaten.** r/clickup, sept. 2023: *"Gantt possibilities in ClickUp... Suck! No improvements for years"* — met als concrete klacht het ontbreken van **groepering en custom fields als kolommen** in de Gantt. In april 2026 nog steeds: *"Anyone else struggling with ClickUp Gantt sorting?"*, van gebruikers die ClickUp al jaren gebruiken. Een planner die gewend is aan een WBS-boom met kolommen naast het balkenschema mist hier het halve werkoppervlak.

6. **Steile leercurve en configuratiemoeheid.** Hackceleration scoort ease-of-use **3,0/5** en noemt *"steep learning curve before full productivity kicks in"* met 2-3 weken tot volledige productiviteit, plus een *"overwhelming number of configuration options"*. Reddit-samenvattingen noemen *"overwhelming setup, too many layers, bad UX, random friction"* (r/clickup, "Do you still trust ClickUp as your team's source of truth?", 21 mei 2026). Voor een bouwploeg die af en toe iets moet afvinken is dit te veel machinerie.

7. **Vijandig aanvoelend licentie- en zitplaatsbeleid.** Workspace-brede upgrades verplicht (iedereen betaalt hetzelfde tarief, ook wie alleen leest) — bij verificatie letterlijk bevestigd op clickup.com/pricing: *"To upgrade ClickUp, you'll need to upgrade your entire Workspace, which means all members in your Workspace."* Verder: zitplaatsverlaging op jaarcontracten werkt pas bij verlenging en levert geen tussentijdse restitutie op, verlengingsfacturen nemen oude zitplaatsaantallen over, en gratis promotiezitplaatsen worden bij verlenging betaald. (Wél gecorrigeerd: er is géén minimum zitplaatsaantal — zie §3.5.) Illustratief: een non-profit van 40 mensen betaalde voor 46 zitplaatsen bij 39 actieve leden. Bron: r/clickup, *"ClickUp's pricing is a masterclass in hostage-taking"*, 21 apr. 2026; diverse refundklachten.

8. **AI-add-ons verdrievoudigen de effectieve prijs.** Business $12 + Everything AI $28 = $40 per gebruiker per maand jaarlijks. De "Super Fair Billing policy" geeft ClickUp bovendien expliciet ruimte de AI-prijs aan te passen aan eigen kostenschommelingen. De geadverteerde instapprijs van $7 is niet de prijs die ClickUp je uiteindelijk wil verkopen.

9. **Exportbeperkingen en lock-in-risico.** Op Free en Unlimited kun je *"only export five List, Table, or Form views"*; export is CSV/Excel. Een volledige workspace-export vereist de API. Individuele tijdregistratiegegevens zijn niet apart exporteerbaar. Combineer dat met de afwezigheid van standaard planningsuitwisselingsformaten (zie §6) en je hebt een reëel exit-probleem.

10. **Bekende functionele irritaties die opstapelen bij gevorderd gebruik.** Uit de Medium-inventarisatie van 16 problemen, o.a.: relatievelden breken wanneer taken tussen Lists verplaatst worden; je kunt niet filteren op relaties; automatisering is per Space in plaats van workspace-breed; custom datumvelden werken niet in automatiseringen; grafieken zijn *"practically useless"* voor multivariabele rapportage; geen Power BI-integratie zonder derde partij; subtaken kunnen geen eigen statusset hebben. Rode draad: *"issues intensify with advanced use cases, not typical workflows"* — precies waar planning zit.

11. **Mobiele app en support blijven achter.** Meerdere reviews noemen de mobiele app buggy en minder verzorgd dan desktop; thebusinessdive.com noemt *"poor customer support"* met trage reactietijden.

12. **Leveranciersrisico door de 2026-koerswijziging.** 22% van het personeel ontslagen in mei 2026, vervangen door ~3.000 AI-agents, met een expliciete herpositionering naar AI-first. Voor een tool die net begonnen is zijn planningsschulden in te lopen, is dat een risico dat die inhaalslag stilvalt. Bron: mlq.ai, 22 mei 2026.

---

## 6. Interoperabiliteit

Voor een opdrachtgever die een open-source, IFC-gebaseerde planner bouwt, is dit hoofdstuk het belangrijkste — en het antwoord is grotendeels negatief.

### 6.1 Planningsuitwisselingsformaten

| Formaat | Import | Export | Toelichting |
|---|---|---|---|
| **Primavera XER** | **Nee** | **Nee** | Geen enkele ondersteuning aangetroffen |
| **Primavera P6 XML** | **Nee** | **Nee** | Geen enkele ondersteuning aangetroffen |
| **MS Project MPP** | **Nee** | **Nee** | *"ClickUp cannot import an MPP file. It has to be converted to CSV or XLS."* |
| **MS Project XML / MSPDI** | Gedeeltelijk **[ONGEVERIFIEERD]** | Nee | Bronnen noemen XML als importoptie *"for more detailed project data"*, maar het is niet bevestigd dat dit MSPDI-conform is inclusief relaties, kalenders en constraints |
| **CSV / Excel** | Ja (onbeperkt, alle plannen via Import-pagina) | Ja (Free/Unlimited: max 5 views) | Het werkelijke uitwisselingsformaat |
| **IFC 4.3 (IfcWorkSchedule / IfcTask / IfcWorkCalendar)** | **Nee** | **Nee** | **Volledig afwezig** |
| Tool-naar-tool-importers | Ja | n.v.t. | Asana, Trello, Jira, Monday, Wrike, Basecamp, Todoist |

Bij migratie vanuit MS Project geldt volgens de bronnen: *"dependencies typically require manual correction after import"* en *"advanced features like baseline and resource leveling behave differently in ClickUp and may need adjustment"*. In de praktijk betekent dat: je importeert een takenlijst, geen schema.

### 6.2 IFC en BIM — expliciet nul

ClickUp heeft **geen IFC-ondersteuning in welke vorm dan ook**. Geen IfcWorkSchedule, geen IfcTask, geen IfcWorkCalendar, geen IfcRelSequence, geen 4D-koppeling naar geometrie, geen IFC-viewer, geen classificatie- of GUID-mapping.

Wat er wél is, is uitsluitend marketing: clickup.com/blog/bim-project-management/ legt uit hoe je *"BIM project management into your workflow"* integreert, maar dat is een contentmarketingartikel over BIM als managementpraktijk, niet over een productfunctie. De bouw-landingspagina (clickup.com/teams/construction) noemt Gantt, dependencies, RFI-formulieren, bestandsannotatie en tijdregistratie — **en noemt CPM noch BIM noch IFC**.

**Consequentie voor de opdrachtgever:** een IFC-planner kan niet met ClickUp uitwisselen anders dan via zelfgebouwde CSV- of API-koppelingen, waarbij alle planningssemantiek (relatietypen, lags, kalenders, float, constraints, WBS-hiërarchie boven een niveau) verloren gaat. ClickUp is geen partij in de openBIM-keten en toont geen enkele intentie dat te worden.

### 6.3 API

De API is het sterkste interoperabiliteitspunt.

- **Basis-URL:** `https://api.clickup.com/api/v2` (v2), plus een publieke v3.
- **Authenticatie:** personal tokens en OAuth2-tokens.
- **Rate limits per token per minuut:** Free/Unlimited/Business **100**; Business Plus **1.000**; Enterprise **10.000**. Response-headers `X-RateLimit-Limit`, `-Remaining`, `-Reset`; HTTP 429 bij overschrijding. Bron: developer.clickup.com.
- **Relevante endpoints:** taken (CRUD, bulk filtering, merge), **task dependencies (add/delete)**, task links, tijdregistratie (entries, ranges, running timer, tags), custom fields, task types, comments, checklists, attachments, de volledige hiërarchie (workspace/space/folder/list), templates, webhooks, chat.

**Kritieke beperking:** de API stelt de *invoer* van planning bloot (taken, datums, afhankelijkheden, duur) maar er is **geen endpoint gevonden dat de berekende planningsresultaten teruggeeft** — early/late start, early/late finish, total float, kritiek-pad-vlag, baseline-varianties. Dat past bij de conclusie dat ClickUp deze grootheden niet als eersterangs domeinmodel bijhoudt. **[SCHATTING — gebaseerd op de gepubliceerde endpointlijst; ik heb de volledige v3-referentie niet uitputtend kunnen doorlopen]**

De rate limit van 100 req/min op alles onder Enterprise is bovendien pijnlijk voor bulk-synchronisatie: 5.000 taken ophalen of bijwerken duurt bij die limiet aanzienlijk lang zonder paginering-optimalisatie.

### 6.4 Overige integratie

1.000+ native integraties (Slack, Teams, Google Workspace, Salesforce, GitHub, Figma, …), 8.000+ apps via Zapier, webhooks voor events. Geen Power BI-connector zonder derde partij (Make.com o.i.d.). Reviewers melden sync-vertragingen van 2-5 minuten bij integraties.

---

## 7. Marktpositie

### Waar ClickUp sterk staat en waarom

- **MKB en midmarket werkbeheer.** De combinatie breedte + prijs + gratis tier is moeilijk te verslaan. Instapprijs $7 tegen Monday ~$12 en Asana ~$10,99.
- **Bureaus, marketing, operations, client services.** Werk dat wel deadlines en afhankelijkheden kent, maar geen contractuele planningsverplichtingen.
- **Tool-consolidatie.** Het sterkste koopargument: vier abonnementen vervangen door één.
- **Bottom-up adoptie.** Gratis tier → team → workspace → betaald. Klassieke PLG-motie, en die werkt: 20 mln+ gebruikers naar ~100.000 betalende klanten.

### Belangrijkste concurrenten

| Segment | Concurrenten |
|---|---|
| Direct (all-in-one werkbeheer) | Monday.com, Asana, Wrike, Notion, Smartsheet, Teamwork, Hive, Airtable |
| Software/product | Jira, Linear, Azure DevOps |
| **Echte planning (waar ClickUp níét meespeelt)** | **Oracle Primavera P6, Microsoft Project / Project for the web, Asta Powerproject, Deltek Acumen, Spider Project, Safran** |
| Bouw-specifiek | Procore, Autodesk Construction Cloud, Bluebeam, Fieldwire, PlanRadar, Synchro (4D), Vico |

Illustratief: G2 noemt als leidende ClickUp-alternatieven Wrike, Hive en monday.com — **geen enkele CPM-tool**. De markt zelf plaatst ClickUp niet in het planningssegment.

### Trend

1. **AI-first herpositionering** met ClickUp Brain en Everything AI; >40% van nieuwe sales-led deals bevat AI; AI-omzet +400% j-o-j. Ambitie: $1 mrd ARR.
2. **Enterprise-offensief**: eigen Global VP & GM Enterprise, focus op gereguleerde sectoren, dataresidentie, compliance.
3. **Radicale operationele herstructurering** (22% ontslagen, 3.000 AI-agents, mei 2026).
4. **Inhaalslag op planning**: herbouwde Gantt-engine, baselines, SS/FF/SF in beta — de eerste serieuze planningsinvestering in jaren, maar startend van ver achter.
5. **Prijsdruk naar boven** via add-ons in plaats van lijstprijzen, wat de "goedkoop"-positionering ondermijnt.

### Cijfers

| Metriek | Waarde | Peildatum |
|---|---|---|
| ARR | > $300 mln | feb. 2026 |
| Gebruikers | 20 mln+ | sept. 2025 |
| Betalende klanten | ~100.000 | 2026 |
| Waardering | $4 mrd | juli 2026 |
| Medewerkers | ~1.010 | mei 2026 |
| G2 | 4,6-4,7/5, ~13.314 reviews | 2026 (gecorrigeerd bij verificatie) |
| Capterra | 4,6/5, ~4.608 reviews | 2026 (bevestigd bij verificatie) |

Geen bewijs gevonden van een Gartner Magic Quadrant-leiderspositie in enige planningsmarkt; ClickUp verschijnt bij Gartner Peer Insights vooral in de categorie *generative-AI knowledge management / general productivity apps* — wat op zichzelf tekenend is voor hoe analisten het product classificeren.

---

## 8. Eindoordeel

### Voor wie wel

- **Teams die werkbeheer willen consolideren** en planning slechts als tijdlijnvisualisatie nodig hebben: bureaus, marketing, interne IT, operations, client services.
- **Organisaties met veel deelnemers en weinig planners**, waar de waarde in samenwerking, docs, formulieren en dashboards zit — mits men de workspace-brede licentiekosten accepteert.
- **Bouwbedrijven voor het niet-planningsdeel**: RFI's, submittals, keuringen, actielijsten, klantcommunicatie, selectietracking, bidmanagement. Als *aanvulling* naast een echte planner is ClickUp verdedigbaar.
- **Kostenbewuste kopers zonder AI-behoefte**: $12/gebruiker/maand jaarlijks voor deze breedte is scherp.
- **Kleine projecten met eenvoudige, lineaire logica** (tot enkele honderden taken, alleen FS-relaties, één werkweek).

### Voor wie niet

- **Bouw-, infra- en EPC-planners.** Zonder lags, constraints, resourcekalenders en levelling is een realistisch uitvoeringsschema niet te modelleren.
- **Iedereen met contractuele planningsverplichtingen.** Vertragingsanalyse (as-planned vs. as-built, windows analysis, time impact analysis), claims, EOT-onderbouwing — allemaal onmogelijk. Een ClickUp-schema houdt geen stand in een geschil.
- **Resource- of kostengedreven planning.** Geen resourcemodel met tarieven, geen levelling, geen kostenbaseline, geen EVM.
- **Grote schema's.** 5.000 taken per view is de muur; praktisch bruikbaar ligt lager. Klassieke planningsprojecten zitten daar één tot twee ordes boven.
- **openBIM-/IFC-workflows.** Nul ondersteuning, geen roadmapintentie.
- **Organisaties die XER-, P6 XML- of MPP-uitwisseling met opdrachtgevers of onderaannemers moeten leveren.** Dat kan simpelweg niet.

### Is dit een serieus alternatief voor klassieke CPM-tools?

**Nee — en het pretendeert dat zelf ook niet.** ClickUps eigen bouwpagina noemt CPM niet één keer. De feature-request voor lag time staat nog altijd op "we beslissen nog of we dit bouwen", met 792 stemmen erachter.

Wat ClickUp biedt is een **balkenschema met afhankelijkheden en een rood gemarkeerde keten**. Dat is nuttige communicatie en soms voldoende sturing. Het is geen netwerkplanning. Het verschil tussen "een Gantt tekenen" en "een schema doorrekenen" is precies het verschil tussen ClickUp en P6 — en dat verschil is niet cosmetisch maar fundamenteel: het zit in het ontbreken van lags, constraints, kalendermodellen, resource-integratie en een volwaardige forward/backward pass.

Waar ClickUp **wél** een reëel alternatief voor is: het veelvoorkomende gebruik van MS Project als veredelde takenlijst met datums. Voor die gebruikers — en dat is een groot deel van de MS Project-installed base — is ClickUp beter: goedkoper, samenwerkingsgerichter, moderner, met echte tijdregistratie en capaciteitsinzicht.

### Relevantie voor de opdrachtgever (open-source, IFC-gebaseerde planner)

Drie observaties:

1. **ClickUp is geen concurrent op functionaliteit, wel op aandacht.** Het wint de projectleider met UX, breedte en prijs — niet met planningsdiepte. Een IFC-CPM-planner concurreert dus niet op features maar op de vraag "waar leeft het schema?".
2. **De zwakte van deze hele categorie is exact het sterke punt van een echte planner.** Geen lags, geen constraints, geen kalenders, geen levelling, geen IFC, geen XER/P6 XML/MPP, en een schaalplafond van 5.000 taken. Dat is een breed en goed gedocumenteerd gat — en het is een gat dat ClickUp na negen jaar nog steeds niet gedicht heeft, wat suggereert dat het geen prioriteit heeft en dat ook niet snel wordt.
3. **De les die wél overgenomen moet worden:** ClickUps succes toont dat de markt bereid is te betalen voor bruikbaarheid, meerdere views op dezelfde data en samenwerkingsfuncties. Een IFC-planner die alleen technisch superieur is maar aanvoelt als P6 uit 2005, verliest de gebruiker alsnog. De winnende combinatie is ClickUps ergonomie met P6's rekenkern — en die bestaat vandaag niet.

---

## Bronnen

### Leverancier (primair)
1. ClickUp — Pricing. https://clickup.com/pricing — geraadpleegd 25 juli 2026. *(Plannen, jaartarieven $7/$12, Brain AI $9, Everything AI $28, workspace-brede upgrades, Super Fair Billing)*
2. ClickUp Feedback — Advanced Dependency Options. https://feedback.clickup.com/feature-requests/p/advanced-dependency-options — geraadpleegd 25 juli 2026. *(792 stemmen; officiële updates 29 apr., 6 mei, 9 juni 2026; lead/lag time nog niet gebouwd)*
3. ClickUp Feedback — SLOWNESS. https://feedback.clickup.com/feature-requests/p/slowness
4. ClickUp Feedback — Severe performance degradation in a low-data, single-user workspace. https://feedback.clickup.com/feature-requests/p/severe-performance-degradation-in-a-low-data-single-user-workspace
5. ClickUp — Construction teams. https://clickup.com/teams/construction — geraadpleegd 25 juli 2026. *(Geen vermelding van CPM, BIM of IFC)*
6. ClickUp Help — Critical Path and Slack Time. https://help.clickup.com/hc/en-us/articles/6310440099479-Critical-Path-and-Slack-Time — **pagina gaf HTTP 403; inhoud via zoeksnippet**
7. ClickUp Help — Gantt view (sectie). https://help.clickup.com/hc/en-us/sections/17044455039895-Gantt-view — **HTTP 403**
8. ClickUp Help — Data hosting. https://help.clickup.com/hc/en-us/articles/15999383444247-Data-hosting — via snippet
9. ClickUp Help — Upgrade your plan. https://help.clickup.com/hc/en-us/articles/6303314345623-Upgrade-your-plan — via snippet *(Business Plus niet meer op pricingpagina)*
10. ClickUp Developer — API-referentie. https://developer.clickup.com/reference/getauthorizeduser — geraadpleegd 25 juli 2026
11. ClickUp — Security. https://clickup.com/security — via snippet
12. ClickUp Blog — BIM project management. https://clickup.com/blog/bim-project-management/ — via snippet
13. BusinessWire — ClickUp Extends Capabilities in Europe with Localised Data Hosting, 17 juli 2023. https://www.businesswire.com/news/home/20230717908571/en/

### Bedrijfsgegevens
14. LATKA — ClickUp Revenue 2026: $300M ARR, $4B Valuation. https://getlatka.com/companies/clickup — peildatum 3 juli 2026
15. SQ Magazine — ClickUp Statistics 2026. https://sqmagazine.co.uk/clickup-statistics/ — **HTTP 403; via snippet**
16. Dexter Agent — ClickUp Profile 2026. https://dexteragent.ai/companies/clickup-1771932438
17. MLQ.ai — ClickUp Lays Off 22% of Staff, Deploys 3,000 AI Agents in Radical Restructuring, 22 mei 2026. https://mlq.ai/news/clickup-lays-off-22-of-staff-deploys-3000-ai-agents-in-radical-restructuring/
18. LayoffHedge — ClickUp Layoffs 2026. https://layoffhedge.com/company/clickup
19. AI Eating The World — ClickUp Layoffs: 22% Cut, $1M Salary Bands in AI Shift. https://aieatingtheworld.com/articles/clickup-layoffs-22-percent-ai-restructuring-million-dollar-salary

### Reviews en gebruikerservaring
20. TheBusinessDive — My Honest ClickUp Review After Using It For 3+ Months (2026). https://thebusinessdive.com/clickup-review — score 4,3/5; prijzen $7/$10 en $12/$19
21. Hackceleration — ClickUp Review 2026. https://hackceleration.com/labs/review/clickup — score 4,1/5; ease-of-use 3,0/5
22. Medium (Alex Shevchenko) — 16 Ridiculous ClickUp Issues That Nobody Expected. https://medium.com/@oleksandrsh4/16-ridiculous-clickup-issues-that-nobody-expected-04cf3af257c6 — *(traagheid bij 50+ records; formulevelden; relatieverlies)*
23. OpinionDeck — ClickUp Complaints on Reddit — 6 Real Threads. https://opiniondeck.com/reddit/clickup-complaints/
24. Reddit r/clickup — Gantt possibilities in ClickUp... Suck! No improvements for years. https://reddit.com/r/clickup/comments/16j5zkm/ — **directe fetch geblokkeerd; via snippet/aggregator**
25. Reddit r/clickup — ClickUp's pricing is a masterclass in hostage-taking, 21 apr. 2026. https://reddit.com/r/clickup/comments/1srnyq1/
26. Reddit r/clickup — Do you still trust ClickUp as your team's source of truth?, 21 mei 2026. https://reddit.com/r/clickup/comments/1tjp3oq/
27. Reddit r/clickup — Anyone else struggling with ClickUp Gantt sorting?, 15 apr. 2026. https://reddit.com/r/clickup/comments/1smejr7/
28. Reddit r/clickup — I'm so tired, ClickUp, 18 mrt. 2026. https://reddit.com/r/clickup/comments/1rxbtla/
29. Reddit r/clickup — Why is ClickUp so slow? https://reddit.com/r/clickup/comments/167cnqn/ en https://reddit.com/r/clickup/comments/ymkq4d/
30. G2 — ClickUp Pros and Cons. https://www.g2.com/products/clickup/reviews?qs=pros-and-cons — **HTTP 403; via snippet**
31. TrustRadius — ClickUp reviews. https://www.trustradius.com/products/clickup/reviews — **HTTP 403**
32. Gartner Peer Insights — ClickUp. https://www.gartner.com/reviews/market/generative-ai-knowledge-management-apps-general-productivity/vendor/clickup

### Analyse en documentatie van derden
33. ZenPilot — Gantt: Auto-Schedule Parent Tasks & Skip Weekends. https://www.zenpilot.com/clickup-weekly/clickup-gantt-auto-scheduling/ — *(herbouwde planningsengine)*
34. ZenPilot — ClickUp's 2026 Roadmap Explained. https://www.zenpilot.com/clickup-weekly/clickup-weekly-013/ — *(Gantt-baselines, out-of-office)*
35. ReleaseBot — ClickUp release notes, juli 2026. https://releasebot.io/updates/clickup
36. ConsultEvo — ClickUp Critical Path: How To. https://consultevo.com/clickup-critical-path-how-to/
37. UseCarly — ClickUp Free Plan Limits (2026). https://www.usecarly.com/blog/clickup-free-plan-limits/
38. CostBench — Is ClickUp Free? https://costbench.com/software/project-management/clickup/free-plan/
39. GetPricePulse — ClickUp Pricing 2026. https://www.getpricepulse.com/companies/clickup-pricing.html — **claims tegengesproken door leverancierspagina; opgenomen als [CONFLICT]**
40. Tuck Consulting Group — Spring 2026 ClickUp Features. https://tuckconsultinggroup.com/articles/clickup-features-for-your-small-business/
41. SelectHub — ClickUp vs Primavera P6. https://www.selecthub.com/project-management-software/clickup-vs-primavera-p6/
42. SelectHub — ClickUp vs Microsoft Project. https://www.selecthub.com/project-management-software/clickup-vs-microsoft-project/
43. ToolDirection — ClickUp Issues and Limitations in 2026. https://tooldirection.com/clickup-issues-limitations-2026/ — **pagina leeg bij fetch; alleen titel/snippet gebruikt**

### Betrouwbaarheidsnotitie per bronklasse
- **Hoog:** clickup.com/pricing, feedback.clickup.com, developer.clickup.com, businesswire.com — primaire leveranciersbronnen, direct opgehaald.
- **Middel:** getlatka.com, zenpilot.com, mlq.ai, thebusinessdive.com, hackceleration.com — direct opgehaald, redactioneel, maar niet geauditeerd.
- **Laag:** zoeksnippets van geblokkeerde sites (G2, Capterra, TrustRadius, Reddit, help.clickup.com), AI-gegenereerde prijsaggregators (getpricepulse), en marketingcontent van concurrenten (de LinkedIn-post over "54% ontevreden"). Alle claims uit deze klasse zijn in de tekst gemarkeerd.

---

## Verificatie

**Adversariële fact-check, 25 juli 2026.** Opzet: elke bewering actief proberen te *weerleggen* met onafhankelijke bronnen, niet bevestigen. Methode: directe WebFetch op de leverancierspagina en het feedbackportaal, plus DuckDuckGo-HTML/Lite als zoekvervanger (de WebSearch-quota van deze sessie was uitgeput). 17 beweringen getoetst: **9 bevestigd, 7 gecorrigeerd, 1 onzeker.**

### Bevestigd

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 1 | Jaartarieven Unlimited $7 en Business $12 per gebruiker/maand, jaarlijks gefactureerd ($84 resp. $144 per jaar) | **Bevestigd** — leverancierspagina toont bij herfetch $7/$12, met "+"-notatie die op een hoger maandtarief duidt | https://clickup.com/pricing |
| 2 | Free Forever: $0, 60 MB opslag, onbeperkt taken én gebruikers | **Bevestigd** — leverancierspagina noemt expliciet 60 MB; de 100 MB-lezing van derden is onjuist | https://clickup.com/pricing |
| 3 | AI-add-ons: Brain AI $9 en Everything AI $28 per gebruiker/maand jaarlijks; Super Credits $0,001–$10 per 10.000; "Super Fair Billing policy" | **Bevestigd** — alle bedragen letterlijk op de leverancierspagina | https://clickup.com/pricing |
| 4 | Licentiemodel: upgrades zijn workspace-breed, geen individuele gebruikersupgrades | **Bevestigd** — letterlijk: *"To upgrade ClickUp, you'll need to upgrade your entire Workspace, which means all members in your Workspace."* Rekensom Business + Everything AI = $40/gebruiker/maand = $480/jaar klopt | https://clickup.com/pricing |
| 5 | getpricepulse-claim dat jaartarieven in feb. 2026 naar $10/$19 stegen, terecht verworpen | **Bevestigd** — de live leverancierspagina toont $7/$12 jaarlijks; de aggregator verwarde jaar- met maandtarieven. Verwerping was juist | https://clickup.com/pricing + https://www.getpricepulse.com/companies/clickup-pricing.html |
| 6 | Geen lead/lag time; SS/FF/SF pas sinds juni 2026 in beta; 792 stemmen | **Bevestigd** — status "building now", 792 stemmen, staf-updates 29 apr. / 6 mei / 9 juni / **15 juli 2026**; lead/lag expliciet nog "actively deciding what to build after that" | https://feedback.clickup.com/feature-requests/p/advanced-dependency-options |
| 7 | Kritiek pad/slack vereist Unlimited, daar beperkt tot 100 keer; onbeperkt vanaf Business | **Bevestigd** — *"100 uses of these Gantt tools are included on Unlimited Plans"* | https://help.clickup.com/hc/en-us/articles/6310440099479-Critical-Path-and-Slack-Time (via snippet) |
| 8 | Harde limiet van 5.000 taken per view | **Bevestigd** — *"Up to 5,000 tasks can load at a time in one view"* (zie ook #15 voor de gecorrigeerde motivatie) | ClickUp Help, via snippet |
| 9 | Bedrijfscijfers: >$300 mln ARR, $4 mrd waardering, $537,5 mln funding over 5 rondes, ~100.000 betalende klanten, ~1.010 medewerkers, 20 mln+ gebruikers; mei 2026 22% ontslagen (~290 van 1.300) met ~3.000 AI-agents | **Bevestigd** — alle cijfers reproduceerbaar; 20 mln gebruikers onafhankelijk gecorroboreerd door persbericht (9 sept. 2025) en Wedbush (4 feb. 2026). *Nuance:* ARR was **vlak** van 2025 naar 2026 (beide $300 mln) — relevant voor de groeiclaim | https://getlatka.com/companies/clickup + https://mlq.ai/news/clickup-lays-off-22-of-staff-deploys-3000-ai-agents-in-radical-restructuring/ |

### Gecorrigeerd

| # | Oorspronkelijke bewering | Correctie | Bron |
|---|---|---|---|
| 10 | Maandtarieven "ca. $10/$19" met **[CONFLICT]**; leverancierspagina toonde eenmaal $9/$15 | **Conflict opgelost: $10 en $19 zijn correct.** De $9/$15-lezing is niet reproduceerbaar en door geen enkele bron ondersteund — verworpen. Twee onafhankelijke bevestigingen | https://thebusinessdive.com/clickup-review + comparedge (via DuckDuckGo, 8 juli 2026) |
| 11 | "Minimum zitplaatsen niet officieel gepubliceerd; gebruikers melden een minimum van 2 **[ONGEVERIFIEERD]**" | **WEERLEGD — claim ingetrokken.** ClickUp kent **geen** minimum zitplaatsaantal; één betaalde zitplaats kan. Dit is juist een pluspunt t.o.v. Monday.com (3-zitplaatsenminimum). Meest impactvolle correctie van deze ronde | resources.oreateai.com; verdictscout.com (via DuckDuckGo) |
| 12 | "Jaarcontracten vergrendelen het zitplaatsaantal zonder tussentijdse verlaging" | **Te sterk geformuleerd.** Leden kunnen mid-cyclus wél verwijderd worden; wat ontbreekt is tussentijdse **restitutie** — het zitplaatscredit geldt pas bij verlenging. Economisch effect vergelijkbaar, mechanisme anders | DuckDuckGo-snippets ClickUp-billingdocumentatie + r/clickup |
| 13 | "Business Plus ($19/zitplaats) is afgeschaft; aanbod ging van 5 naar 4 tiers" | **Verborgen, niet afgeschaft.** De tier bestaat nog op $19/gebruiker/maand jaarlijks en is bereikbaar via de upgradeflow; alleen van de publieke pricingpagina gehaald. Publiek 4 tiers, feitelijk 5 | ClickUp Help (upgrade-artikel, via snippet); Agiled; QuackBack |
| 14 | Free-plan Gantt "beperkt tot ca. 60 keer gebruiken" | **Het is 60 uses *per maand***, een terugkerend quotum, niet een eenmalig totaal | Forbes Advisor (via snippet): *"limits the Gantt chart to 60 uses per month"* |
| 15 | 5.000-takenlimiet "expliciet gemotiveerd 'to improve platform performance'" | **Motivatie niet verifieerbaar** als letterlijke leverancierstekst; documentatie noemt de limiet zonder reden. Gedegradeerd tot **[SCHATTING]**. (De limiet zelf staat wel vast — zie #8) | ClickUp Help, via snippet |
| 16 | G2 "4,7/5 over 9.000-13.000+ reviews" | **Aangescherpt naar 4,6-4,7/5 over ~13.314 reviews.** Het reviewbereik was onnodig ruim; de score wordt zowel als 4,6 als 4,7 gerapporteerd. Capterra 4,6/5 over 4.608 reviews bevestigd | DuckDuckGo-snippets G2/Capterra (directe fetch geblokkeerd) |

### Onzeker

| # | Bewering | Status | Toelichting |
|---|---|---|---|
| 17 | Enterprise: derde-partijschattingen $25–$44 lijst, $21–$34 effectief bij 500+ zitplaatsen | **Onzeker — blijft [SCHATTING]** | Niet te weerleggen én niet te bevestigen: ClickUp publiceert geen Enterprise-lijstprijs en verkoopt uitsluitend via demo. De genoemde bereiken komen van vendor-benchmarkaggregators zonder controleerbare methodologie. Behandel als indicatie, niet als prijs |

### Niet weerlegd bij poging tot weerlegging

De **dragende conclusie van het profiel — ClickUp is geen CPM-netwerkplanner** — is bij deze ronde actief aangevallen en houdt stand. Het beste tegenbewijs dat te vinden was, zijn marketingpagina's die "Finish-to-Start, Start-to-Start, and more" claimen; die worden tegengesproken door ClickUps eigen feedbackportaal, dat de geavanceerde types op 15 juli 2026 nog steeds als **beta** en lead/lag time als **nog niet gebouwd** aanmerkt. Ook de interoperabiliteitsclaims (geen MPP-, XER- of P6 XML-import; CSV/Excel/XML als enige route) zijn niet weerlegd: leveranciersdocumentatie noemt uitsluitend *"Excel, CSV, JSON, TSV, or TXT"*, en MPP-import staat als openstaand feature-verzoek op het feedbackportaal.

**Eén nuance bij de dependency-bevinding:** de officiële staf-updates spreken over *"advanced dependency types"* zonder FS/SS/FF/SF bij naam te noemen — die opsomming komt uit gebruikerscommentaar op dezelfde pagina. De richting staat vast, de precieze scope van de beta net niet. Dat is in §2.1 gemarkeerd.
