# Procore — softwareprofiel

**Onderzoeksdatum:** 25 juli 2026
**Categorie:** Bouwmanagementplatform (SaaS) met scheduling-module — géén klassiek planningspakket
**Onderzoeker:** softwareanalist, wereldwijd marktonderzoek planningssoftware

> **Leeswijzer bij markeringen**
> `[FEIT]` = direct terug te voeren op leverancierdocumentatie, SEC-filing of primaire bron.
> `[SCHATTING]` = eigen afleiding of derde-partij-aggregatie zonder primaire bevestiging.
> `[CLAIM-LEVERANCIER]` = marketingclaim van Procore zelf, niet onafhankelijk geverifieerd.
> `[CLAIM-CONCURRENT]` = afkomstig van een direct concurrerende leverancier; met opzet apart gehouden.

---

## 1. Wat het is

### Leverancier en historie

Procore Technologies, Inc. is een Amerikaans beursgenoteerd softwarebedrijf, opgericht in **2002** door Craig "Tooey" Courtemanche, met hoofdkantoor in **Carpinteria, Californië** (een terrein van circa 9 acre aan de Stille Oceaan). `[FEIT]` De oprichtingsanekdote is inmiddels folklore in de sector: Courtemanche liep tegen coördinatieproblemen aan bij de bouw van zijn eigen huis op afstand en bouwde daarop een webgebaseerde projectmanagementoplossing — Procore was daarmee een van de eerste echt cloud-native (destijds: "web-based") toepassingen in de bouw, jaren vóór de SaaS-golf.

Financiering en eigendom:

| Jaar | Gebeurtenis | Bedrag |
|---|---|---|
| 2002–2013 | Grotendeels gebootstrapt, eenmansoprichting | — |
| 2014 | Serie met Bessemer Venture Partners | $15 mln |
| 2015 | Bessemer + Iconiq Capital | $30 mln |
| 2016 | Iconiq Capital — unicornstatus ($1 mrd waardering) | $50 mln |
| 2018 | Groeironde | $75 mln |
| 2020 | Groeironde | >$150 mln |
| **20 mei 2021** | **Beursgang NYSE, ticker PCOR**, introductiekoers $67 | **$634,5 mln opgehaald**, waardering ca. $11 mrd |

`[FEIT]` Totaal opgehaald pre-IPO circa $500 mln. Procore is dus **geen private-equity-bezit maar een publiek bedrijf**; grootaandeelhouders zijn institutionele beleggers (Iconiq, Bessemer historisch, plus reguliere fondsen na de IPO).

**Overnames** (selectie, allemaal "point solutions" die diep in het platform worden geïntegreerd):

- **Honest Buildings** (2019) — opdrachtgeverszijde/projectmanagement voor vastgoedeigenaren
- **Esticom** (2020) — calculatie/estimating
- **Avata Intelligence** (2020) — AI
- **INDUS.AI** (2021) — computer vision/bouwplaatsanalyse
- **Levelset** (september 2021) — betalings- en lien-compliance, **circa $500 mln** — verreweg de grootste
- **Unearth** (2023) — GIS/kaartfunctionaliteit

`[FEIT]` Opvallend: **in geen enkele overname zat een planningsengine**. Procore heeft zijn scheduling-technologie zelf gebouwd in plaats van een CPM-huis te kopen — een belangrijk signaal voor de beoordeling in §2.

### Doelgroep, sectoren en regio's

Primaire doelgroep is de **hoofdaannemer (general contractor)**, met daarnaast onderaannemers ("specialty contractors") en opdrachtgevers/vastgoedeigenaren. De sweet spot is de middelgrote tot grote GC: aggregators plaatsen het omslagpunt rond **$10–20 mln jaarlijks bouwvolume aan de onderkant**; daaronder wordt het platform vrij unaniem als overkill beschreven. `[SCHATTING]`

Sectoren: commerciële bouw, industriebouw, healthcare, onderwijs, datacenters, publieke werken en in toenemende mate infrastructuur. Procore is uitgesproken zwak in de zuivere woningbouw/renovatiemarkt (daar domineren Buildertrend en soortgelijke), en het is géén ontwerp- of BIM-autoringplatform.

Regio's waar het echt gebruikt wordt:

- **Verenigde Staten en Canada** — thuismarkt, veruit dominant. `[CLAIM-LEVERANCIER]` "70% van de ENR 400-bedrijven kiest Procore."
- **Verenigd Koninkrijk en Ierland** — serieuze aanwezigheid; EMEA-hub in **Dublin**. `[FEIT]`
- **Australië en Nieuw-Zeeland** — sterke tweede markt, mede door de Engelstalige contractcultuur.
- **Midden-Oosten** — groeiend (Dubai).
- **DACH (Duitsland/Oostenrijk/Zwitserland)** — Procore is hier expliciet gelanceerd en voert een volledige Duitstalige site (`procore.com/de`, inclusief een aparte pagina "Terminplanungssoftware für die Baubranche"). `[FEIT]` De feitelijke penetratie in DACH is echter bescheiden: de Duitse bouw draait grotendeels op AVA-software (RIB iTWO, California.pro, Nevaris) en Duitse aannemers plannen in MS Project, Asta of Powerproject — niet in een Amerikaans GC-platform. `[SCHATTING]`
- **Nederland/België** — géén aparte Nederlandstalige propositie aangetroffen; geen noemenswaardige lokale referentiecases gevonden. Benelux wordt vanuit de EMEA-hub in Dublin bediend. Voor de Nederlandse markt is Procore in de praktijk een randspeler naast Bouw7, 12Build, Ibis-Main/Bakker & Spees en de MS Project/Primavera-hoofdstroom. `[SCHATTING]`

Schaal: `[CLAIM-LEVERANCIER]` "meer dan 2 miljoen gebruikers in 150+ landen" en "meer dan $1 biljoen aan bouwwaarde" via het platform. Het aantal *landen* moet met een korrel zout worden genomen — dat telt elke onderaannemer met een gratis samenwerkingsaccount mee. Het harde, door de SEC gecontroleerde cijfer is **17.850 organische klanten** per 31 december 2025. `[FEIT]`

---

## 2. Functionaliteit en techniek — hoe serieus is de planning werkelijk?

Dit is de kern van de beoordeling, en het antwoord is genuanceerder dan zowel de marketing als de kritiek doet vermoeden. **Er zijn twee verschillende producten die allebei "schedule" heten**, en wie ze door elkaar haalt komt tot verkeerde conclusies.

### 2a. De legacy-tool: "Schedule" (Project) — een viewer, geen planner

Dit is de tool die Procore al ruim tien jaar heeft en die het overgrote deel van de installed base nog steeds gebruikt. Werking:

1. De planner maakt en onderhoudt de planning in **Primavera P6, MS Project, Asta Powerproject of Phoenix**.
2. Het bestand wordt geüpload naar Procore (handmatig via de webapp, of "live" gesynchroniseerd via het hulpprogramma **Procore Drive**).
3. In Procore is het resultaat **read-only**.

Procore's eigen documentatie is hier onomwonden: *"Project schedules cannot be edited in Procore."* Alleen het veld **Percent Complete** kan vanaf mobiel worden bijgewerkt; elke andere wijziging vereist aanpassing in de bronsoftware en opnieuw uploaden. `[FEIT]` Voor P6 geldt bovendien: **één P6-planning per Procore-project**, en *"Schedule modifications must be made in Primavera and then uploaded to Procore."* `[FEIT]`

De ondersteunde importformaten zijn wel indrukwekkend breed:

| Formaat | Bron |
|---|---|
| `.MPP` | Microsoft Project |
| `.MPX` | MS Project / SureTrak |
| `.XER` | Primavera P6, Primavera Contractor |
| `.PRX` | Primavera P3 |
| `.STX` | Primavera SureTrak |
| `XML` (MSPDI) | MS Project-formaat, ook Smartsheet/OpenProject |
| `XML` (PMXML) | Primavera PMXML |
| `.PP` | Asta Powerproject |
| `.PPX` | Phoenix Project Manager |
| `.FTS` | FastTrack Schedule |
| `.POD` | ProjectLibre |
| `.GAN` | GanttProject |
| `.PEP` | TurboProject |
| `.CDPX`/`.CDPZ` | ConceptDraw PROJECT |
| `.SP` | Synchro Scheduler |
| `.ZIP` | container met bovenstaande |

`[FEIT]` Bron: Procore-supportdocumentatie "Upload a Project Schedule File to Procore's Web Application".

**Oordeel legacy-tool:** dit is een *distributie- en visualisatielaag* bovenop een planning die elders leeft. Er zit geen engine onder omdat er geen engine hoeft te zitten — P6 heeft het rekenwerk al gedaan. Als zodanig doet hij zijn werk goed: de uitvoerende ploeg ziet dezelfde planning als het kantoor, mét lookaheads en gekoppelde dagrapporten. Maar het is per definitie **geen planningssoftware**.

### 2b. De nieuwe tool: "Procore Scheduling" — wél native, maar jong

Tijdlijn `[FEIT]`:

- **Closed beta** — 2025, met 130+ klanten
- **Open beta** — 30 september 2025, via "Procore Explore" (self-service opt-in)
- **General Availability** — **17 februari 2026**

Wat er bij GA in zit `[FEIT]`, op basis van Procore's eigen GA-aankondiging en release notes:

- Native aanmaken en bewerken van planningen in een Gantt- én lijstweergave (dus geen bronbestand meer nodig)
- Import uit **P6 (.XER)** en **MS Project (.MPP)**, hetzij **read-only als referentie**, hetzij **als bewerkbaar startpunt**
- Afhankelijkheden met lead/lag — sneltoetsnotatie in het raster zoals `5SS+2d` (verwijzing naar regel 5, start-start, 2 dagen lag), wat impliceert dat naast FS ook SS wordt ondersteund `[FEIT]`
- Gantt-manipulatie met slepen; de documentatie stelt dat het systeem *"dynamically updates the logic chain as you move or resize bars"* `[FEIT]`
- Schaal tot **10.000+ activiteiten** `[CLAIM-LEVERANCIER]`
- Real-time multi-user bewerking met conflictafhandeling — feitelijk het enige echt onderscheidende technische kenmerk
- Lookahead-plannen afgeleid van het masterschema, in dezelfde tool
- "Assign Responsibility": activiteiten toewijzen aan **Assignees en Approvers**
- Read-only-permissies, 360 Reporting/Analytics-integratie, internationalisatie
- **GET-API-endpoints** (let op: alleen lezen bij GA)
- Roadmap bij GA: koppeling met Submittals (Q1 2026), daarna RFI's, inspecties en Action Plans

Ná GA geleverd of aangekondigd voor voorjaar/zomer 2026 `[FEIT]`:

- **Custom Workday Calendars** — projectspecifieke werkschema's, feestdagen en beperkingen
- **Versions & Baseline Comparisons** — automatische versiehistorie, terugzetten en vergelijken met een baseline
- Kalender-UI-verbeteringen (markering niet-werkbare dagen, "Back to today")
- **Native mobiele app** (iOS/Android) — beta gestart 30 juni 2026

### 2c. Zit er een échte netwerkplanningsengine onder? — het strenge oordeel

**Nee, niet in de zin die een planner bedoelt.** De onderbouwing, in volgorde van bewijskracht:

**Bewijs 1 — het exportformaat verraadt de architectuur `[FEIT]`.** Procore's *eigen* supportpagina "Export a Project Schedule" documenteert precies twee uitvoerformaten: **PDF** en **CSV** (CSV uitsluitend vanuit de Gantt-weergave), plus een lookahead-PDF op A3. Er is **geen XER-, MPP-, MSPDI-XML- of PMXML-export**. Dit is diagnostisch: een tool die een echte activiteitennetwerk-datastructuur bijhoudt (relaties, kalenders, constraints, data date, float) kan die triviaal serialiseren. Een tool die alleen naar PDF en een platte CSV kan exporteren, heeft die structuur waarschijnlijk niet volledig — of acht hem niet compleet genoeg om te tonen.

**Bewijs 2 — de kalender kwam ná de engine `[FEIT]`.** Een CPM-engine kán niet bestaan zonder werkkalender: de forward pass is niets anders dan datumrekenen over een kalender. Dat **Custom Workday Calendars pas ná GA (voorjaar/zomer 2026) werd uitgeleverd**, betekent dat Procore Scheduling bij lancering hoogstens met een impliciete standaardkalender rekende. Voor een product dat als "powerful scheduling engine" wordt gepositioneerd is dat een vernietigend detail. Hetzelfde geldt voor baselines: **variantieanalyse tegen een baseline is de kernfunctie van projectbeheersing**, en die kwam eveneens pas na GA.

**Bewijs 3 — float ontbreekt in alle documentatie `[FEIT, negatief bewijs]`.** In de doorzochte Procore-supportdocumentatie, release notes en GA-aankondiging komt **geen enkele vermelding van total float, free float, slack, backward pass, data date, retained logic/progress override of constraint-typen** voor. Voor een CPM-tool zijn dat de meest basale begrippen; hun volledige afwezigheid in de leveranciersdocumentatie is significant. De "Edit the Gantt Chart"-pagina documenteert expliciet alleen **Finish-to-Start** slepen en noemt geen float-kolom of kritieke-padberekening.

**Bewijs 4 — onafhankelijke bevestiging, mét voorbehoud `[CLAIM-CONCURRENT]`.** Planera (een directe concurrent met een echte CPM-engine, dus zwaar belanghebbend) stelt categorisch: geen forward/backward pass, geen geautomatiseerde float, kritiek pad als *"visual toggle, not a computed output from logic"*, gebruikers kunnen data vrij overschrijven zonder logicavalidatie, geen data date, geen audittrail/versiehistorie, geen DCMA-14-kwaliteitscontroles, en her-import **overschrijft** de vorige planning zonder merge of reconciliatie. Deze bron is partijdig en moet niet op eigen kracht worden geloofd — maar **de exportbeperking die Planera aanvoert wordt letterlijk bevestigd door Procore's eigen documentatie**, en het versiehistorie-punt wordt indirect bevestigd doordat Procore "Versions & Baseline Comparisons" pas ná GA als *nieuwe* functie aankondigde. Dat maakt de rest van de lijst plausibel.

**Contra-indicatie, eerlijkheidshalve `[FEIT]`.** Procore's eigen Gantt-documentatie zegt dat het systeem *"dynamically updates the logic chain as you move or resize bars"*. Dat duidt op op zijn minst een **voorwaartse doorrekening** van opvolgers. De notatie `5SS+2d` bewijst ondersteuning voor minimaal FS en SS met lag. Het is dus té grof om te zeggen "het is alleen een tekenprogramma": er zit een logicamotor in die opvolgers verschuift. Wat ontbreekt is de **achterwaartse doorrekening en floatberekening** — precies de helft die van een Gantt-editor een CPM-tool maakt. `[SCHATTING]` Mijn taxatie: Procore Scheduling is een *forward-only scheduler met dependency-propagatie*, geen tweezijdige CPM-solver.

### 2d. Overige planningsdisciplines

| Discipline | Ondersteuning in Procore | Oordeel |
|---|---|---|
| **Klassieke CPM** | Gedeeltelijk (zie 2c) — forward-propagatie ja, backward pass/float niet aantoonbaar | Onvoldoende voor contractueel planwerk |
| **Locatiegebaseerd / flowline / LBMS** | **Afwezig** | Geen enkel spoor in documentatie |
| **Takt planning** | **Afwezig** als native functie | Vereist Touchplan/Nialli/Hoylu |
| **Lean / pull planning (Last Planner)** | Alleen **lookaheads**; geen pull-planningsessies, geen PPC/commitment-tracking, geen digitale stickies | Ecosysteem-afhankelijk (Touchplan is de facto standaard ernaast) |
| **4D-simulatie** | **Niet native.** Procore publiceert wel uitgebreide *educatieve* content over 4D BIM, maar levert geen 4D-simulator; koppeling model↔planning gebeurt in Synchro, Navisworks of Bexel | Belangrijke lacune voor een BIM-georiënteerde koper |
| **Resource management** | Er is een aparte **Resource Management**-productlijn (arbeid, materieel, telematica, timekeeping, Materials-tool) — maar die is **niet gekoppeld aan een resource-loaded CPM-schema**. In de nieuwe Scheduling-tool bestaan alleen *Assignees/Approvers* (personen), geen resource-toewijzing met hoeveelheden | **Geen resource-loading, geen levelling, geen histogrammen, geen S-curves** |
| **Kalenders** | Custom workday calendars pas ná GA 2026 | Onvolwassen |
| **Baselines** | Versions & Baseline Comparisons pas ná GA 2026 | Onvolwassen |
| **EVM / verdiende waarde** | Afwezig als planningsfunctie | — |
| **Kwaliteitscontrole (DCMA-14)** | Afwezig `[CLAIM-CONCURRENT]`, geen tegenbewijs in Procore-docs | — |

### 2e. Platform en schaalbaarheid

Multi-tenant SaaS, browsergebaseerd, met native iOS/Android-apps. Schaalbaarheid op ondernemingsniveau is bewezen: 17.850 klanten, 115 klanten met >$1 mln ARR, en **FedRAMP Moderate Equivalency** voor Procore for Government. `[FEIT]` De API kent een quotum van **3.600 requests per uur per OAuth-client_id** (niet per eindgebruiker) `[FEIT]`; Procore erkent zelf in de community dat het quotasysteem *"a number of years old"* is en herzien wordt.

Bekende zwakke plekken op platformniveau uit reviews: **traagheid bij piekbelasting en grote uploads**, **gebrekkige offline-werking** op mobiel (tekeningen die offline niet laden, dagrapporten die in "pending" blijven hangen, corrupte tekening-tags na synchronisatie), en **inconsistente UI-conventies tussen tools** (sommige slaan automatisch op, andere vereisen expliciet opslaan). `[FEIT — reviewaggregatie]`

---

## 3. Prijzen

### Het model

Procore's officiële prijspagina is expliciet over het mechanisme en zwijgt over de bedragen:

> *"Procore charges an upfront annual fee by product and based upon your Annual Construction Volume (ACV) — the aggregate dollar value of the construction work across your projects."*
> — procore.com/pricing, geraadpleegd 25-07-2026 `[FEIT]`

Kernkenmerken van het model `[FEIT]`:

- **Onbeperkt aantal gebruikers.** *"We'll never charge you for adding more users to Procore"* — inclusief opdrachtgevers, onderaannemers en leveranciers. Dit is een van de sterkste eigenschappen van het model.
- **Onbeperkte dataopslag**, 24/7-support, alle productverbeteringen inbegrepen, *"NO hidden fees"*.
- **Uitzondering:** Field Productivity wordt geprijsd **per FTE**, niet onder het unlimited-usersmodel.
- Modulair: los af te nemen productlijnen (Preconstruction, Project Management, Financial Management, Resource Management, Quality & Safety, BIM, Procore Pay, Analytics).
- **Geen enkel bedrag wordt publiek gemaakt.** Alles verloopt via een offertetraject.

Er is dus **geen prijs per gebruiker per maand en geen prijs per project**: de teller is het **jaarlijkse bouwvolume in euro's/dollars van de klant**. Dat is in deze markt uitzonderlijk en heeft een scherpe economische consequentie — zie §5.

### Bedragen uit derde-partijbronnen

Omdat Procore niets publiceert, komt élk bedrag hieronder van derden. Ik geef bron én raadpleegdatum; alle bedragen zijn **USD per jaar** tenzij anders vermeld.

| Segment / post | Bedrag (USD/jr) | Bron | Datum |
|---|---|---|---|
| ACV-percentage, indicatief | **0,1%–0,2% van harde bouwkosten** | scanmanifold.com/blog-posts/procore-pricing-2026-contractors | geraadpleegd 25-07-2026 `[SCHATTING]` |
| Volume-benchmark | **$700–$1.000 per $1 mln jaarlijks bouwvolume** | costbench.com/software/construction-management/procore/ (geverifieerd 08-07-2026) | 08-07-2026 `[SCHATTING]` |
| Kleine GC ($10–50 mln ACV) | **$15.000–$30.000** | scanmanifold.com | 25-07-2026 |
| Middelgroot ($50–200 mln ACV) | **$30.000–$80.000** | scanmanifold.com | 25-07-2026 |
| Kleine aannemer <$50 mln omzet | **$10.000–$80.000** | projul.com/blog/procore-pricing-analysis-2026/ (gepubliceerd 12-09-2025, bijgewerkt maart 2026) | maart 2026 |
| Middelgroot ($50–250 mln omzet) | **$50.000–$150.000** | projul.com | maart 2026 |
| Groot (>$250 mln omzet) | **$100.000–$600.000+** | projul.com | maart 2026 |
| Instapniveau, één module | **± $375/maand (± $4.500/jr)** | projul.com; costbench.com | maart / juli 2026 |
| Capterra "starting price" | **$10.000** | capterra.com/p/56250/Procore/ | geraadpleegd 25-07-2026 |
| Zelfgerapporteerd voorbeeld: aannemer met $55 mln werk | **± $55.000** | projul.com (citeert een Reddit-gebruiker) | maart 2026 `[SCHATTING — anekdotisch]` |
| Financial Management-module (add-on) | **+$6.000–$12.000** | via checkthat.ai/brands/procore/pricing | geraadpleegd 25-07-2026 `[SCHATTING]` |
| Losse add-onmodules (Quality/Safety, Bid Management, Field Productivity) | **$1.200–$6.000 per module** | projul.com | maart 2026 |

### Implementatie- en bijkomende kosten

| Post | Bedrag (USD) | Bron | Datum |
|---|---|---|---|
| Implementatieconsultancy | **$10.000–$30.000** | projul.com | maart 2026 |
| Datamigratie | **$2.000–$5.000** | projul.com | maart 2026 |
| Training per persoon | **$150–$500** | projul.com | maart 2026 |
| ERP-integratie-opzet | **$2.000–$10.000** | projul.com | maart 2026 |
| Implementatie + training (alternatieve raming) | **$5.000–$15.000** | costbench.com | 08-07-2026 |
| Implementatie eerste jaar (hoge raming) | **$50.000–$150.000+** | scanmanifold.com | 25-07-2026 `[SCHATTING — vermoedelijk enterprise-scenario]` |
| **Totale eerstejaars-TCO, middelgrote aannemer** | **$35.000–$75.000+** | projul.com | maart 2026 |

> De spreiding tussen `$5.000–$15.000` en `$50.000–$150.000+` implementatiekosten is enorm. Mijn lezing `[SCHATTING]`: de lage cijfers gelden voor een enkele module bij een kleine aannemer, de hoge voor een multi-module-uitrol met ERP-koppeling bij een enterprise-GC. Beide kunnen kloppen; ze beschrijven verschillende klanten.

### Contractvoorwaarden en verlengingen

`[FEIT]` Minimale looptijd **1 jaar**, automatische verlenging, opzegtermijn onderhandelbaar, en — belangrijk — **tussentijds afschalen is niet toegestaan**. Dat laatste is het scherpste randje van het ACV-model.

Verhogingen bij verlenging `[SCHATTING, breed gerapporteerd]`:

- **5–14% per jaar**, waarbij ">10% gebruikelijk" is (projul.com, maart 2026)
- Gevallen van **+150% over vijf jaar** gerapporteerd (checkthat.ai-reviewaggregatie, 25-07-2026)
- Procore's eigen **Net Revenue Retention van 106%** over FY2025 `[FEIT, SEC/investor relations]` bevestigt structurele netto-uitbreiding bij bestaande klanten — al is 106% aanzienlijk gematigder dan de 114% die projul.com noemt. **Ik hecht meer waarde aan het door de SEC gerapporteerde cijfer van 106%.**

### Lokale prijzen

Procore hanteert geen publieke prijslijst in enige valuta; er is **geen EUR-, GBP- of AUD-prijslijst** aangetroffen. `[FEIT]` Duitse, Britse en Australische Procore-sites verwijzen alle naar hetzelfde offertetraject.

`[SCHATTING]` Ruwe omrekening voor de Nederlandse context, bij een aangenomen koers van **€0,90 per USD**:

- Kleine Nederlandse aannemer, €25 mln bouwvolume → **€15.000–€30.000/jaar** abonnement
- Middelgrote aannemer, €100 mln bouwvolume → **€35.000–€90.000/jaar**
- Plus eenmalig **€10.000–€30.000** implementatie in jaar 1

Deze bedragen zijn afgeleid, niet door Procore bevestigd, en zullen in EMEA vermoedelijk **hoger** uitvallen dan in de VS omdat het volume per klant kleiner is en de vaste supportkosten gelijk blijven.

---

## 4. VOORDELEN

1. **Onbeperkt aantal gebruikers is een structureel, niet cosmetisch, voordeel.** `[FEIT — procore.com/pricing]` Elke onderaannemer, opdrachtgever en leverancier kan gratis meedoen. In een sector waar per-seat-licenties er standaard toe leiden dat de ketenpartners *buiten* het systeem worden gehouden (en dus terugvallen op e-mail en WhatsApp), verwijdert Procore de belangrijkste rem op keten-adoptie. Voor een planningstool die door de hele keten gelezen moet worden, is dit precies het juiste incentive-ontwerp.

2. **De breedste import-ondersteuning voor planningsbestanden in de markt.** `[FEIT]` Vijftien-plus formaten, inclusief exoten als Asta `.PP`, Phoenix `.PPX`, ProjectLibre `.POD`, GanttProject `.GAN` en Synchro `.SP`. Geen enkele concurrent — P6 en MS Project incluis — leest zo'n brede waaier. Wie een planning heeft, kán hem in Procore krijgen.

3. **Werkelijk gerealiseerde koppeling tussen planning en uitvoeringsdata.** Dit is Procore's echte troef en geen marketing: activiteiten hangen aan RFI's, submittals, dagrapporten, inspecties en foto's binnen hetzelfde datamodel. Vertragingen zijn terug te voeren op de *oorzaak* (een openstaande RFI, een afgekeurde submittal) in plaats van alleen op een verschoven balk. `[FEIT — GA-roadmap bevestigt Submittals Q1 2026, RFI's daarna]` Geen enkel klassiek planningspakket (P6, Asta, MS Project) heeft dit, en het is de reden waarom aannemers Procore náást P6 draaien.

4. **Real-time multi-user bewerking met conflictafhandeling.** `[FEIT]` Meerdere mensen kunnen gelijktijdig aan dezelfde planning werken. P6 is een client-serverproduct uit een ander tijdperk; MS Project is in de praktijk single-writer. Dit is technisch het meest onderscheidende aan Procore Scheduling en het enige punt waarop het de gevestigde orde overtreft in plaats van achtervolgt.

5. **Lookahead-planning zit in hetzelfde systeem als het masterschema.** `[FEIT]` De klassieke werkwijze — masterschema in P6, 3-weekse lookahead in Excel of op de muur — creëert een structurele kloof tussen wat gepland is en wat de ploeg doet. Procore laat lookaheads afleiden uit het masterschema en houdt ze gekoppeld. Voor veldcoördinatie is dat waardevoller dan een correcte floatberekening.

6. **Financiële solide leverancier met langetermijnperspectief.** `[FEIT — SEC/IR]` FY2025: **$1,323 mrd omzet (+15%)**, non-GAAP bedrijfsresultaat **$187 mln (14% marge)**, vrije kasstroom **$215 mln (+69%)**, bruto-retentie **95%**. Voor een tienjarige platforminvestering is leverancierscontinuïteit een reëel criterium, en Procore scoort daar uitstekend — dit is geen kasstroomverbrandende SaaS-belofte meer.

7. **Volwassen ecosysteem en API.** `[CLAIM-LEVERANCIER: 500+ integraties/apps]`, gedocumenteerde publieke REST-API met OAuth, webhooks, BIM-endpoints, en ERP-koppelingen (Sage, Viewpoint, QuickBooks, Xero, MS Dynamics). Ook al zijn er quota-beperkingen, de API is echt en breed gebruikt.

8. **Sterke BIM-viewer met echte IFC-ondersteuning op mobiel.** `[FEIT]` Procore ondersteunt Revit, Navisworks **en IFC**, kan disciplinemodellen samenvoegen tot één gecoördineerd beeld en opent grote IFC-bestanden op iOS/Android zonder dat de bouwplaats dure ontwerplicenties nodig heeft. Ook **BCF-import** in de Coordination Issues-tool. Voor de geometriekant is Procore aantoonbaar openBIM-vriendelijk.

9. **Hoge klanttevredenheid op de brede propositie.** `[FEIT — reviewaggregatie]` G2 **4,6/5** (4.186 reviews, 76% vijf sterren), Capterra **4,5/5** (2.667 reviews), TrustRadius **8,6/10** (1.340 reviews). Dat zijn grote, consistente steekproeven — geen cherry-picked cijfers.

10. **Alles inbegrepen: opslag, support, updates.** `[FEIT]` Geen datalimieten, geen supporttiers, geen betaalde upgrades. Dat maakt de TCO ondanks de hoge prijs wél voorspelbaar op de posten die bij andere leveranciers verrassingen opleveren.

---

## 5. NADELEN

1. **Het ACV-prijsmodel straft groei en verbiedt krimp.** Dit is de scherpste, meest structurele kritiek. De rekening stijgt automatisch mee met het bouwvolume — óók als het aantal gebruikers, projecten of het gebruik van de software helemaal niet toeneemt. En `[FEIT]` **tussentijds afschalen is contractueel niet toegestaan**. Een aannemer die na een topjaar terugvalt naar een half zo groot orderboek, blijft het hoge tarief betalen. In een cyclische sector als de bouw is dat een asymmetrisch risico dat volledig bij de klant ligt. Bijkomend: het koppelt softwarekosten aan *omzet* in plaats van aan *marge* — precies verkeerd om in een sector met 2–5% nettomarges.

2. **Geen aantoonbare CPM-engine, en dat is diskwalificerend voor contractueel planwerk.** Zie §2c. Geen gedocumenteerde float, geen backward pass, geen data date, geen constrainttypen, geen DCMA-14. `[FEIT voor de documentatie-afwezigheid; CLAIM-CONCURRENT voor de expliciete ontkenning]` Voor forensische vertragingsanalyse, claims, EOT-aanvragen of elke opdrachtgever die een gekwalificeerde CPM-planning eist, is Procore Scheduling niet inzetbaar. Het is een field-coördinatietool die eruitziet als een planner.

3. **Export naar XER, MPP of XML ontbreekt volledig — data-lock-in op planningsniveau.** `[FEIT — Procore's eigen supportdocumentatie]` Uitvoer is **uitsluitend PDF en CSV**. Procore leest vijftien formaten en schrijft er nul terug. Wie zijn masterschema in Procore Scheduling opbouwt, kan het er nooit meer als planning uit krijgen — alleen als plaatje of platte tabel waarin de netwerklogica verdwenen is. Voor een opdrachtgever die een elektronische planningsindiening eist, is dit een showstopper. Dit is asymmetrie met opzet: import is gratis, export is er niet.

4. **Kalenders en baselines waren er bij lancering niet.** `[FEIT]` Procore Scheduling ging op 17 februari 2026 GA zónder custom workday calendars en zónder baselinevergelijking; beide werden pas voor voorjaar/zomer 2026 aangekondigd. Een planningsproduct dat generally available gaat zonder werkkalender en zonder baseline is niet af — dat is een beta met een ander etiket. Voor een koper in 2026 betekent het dat de tool nog minstens één à twee jaar rijping nodig heeft.

5. **Geen resource-loading, geen levelling, geen 4D, geen locatiegebaseerde planning.** `[FEIT/SCHATTING]` De Resource Management-productlijn (arbeid, materieel, timekeeping) staat **náást** en niet **ín** het schema; in Scheduling bestaan alleen personen als Assignee/Approver, geen hoeveelheden. Geen histogrammen, geen S-curves, geen egalisatie. 4D-simulatie is er niet native (Procore schrijft er artikelen over, maar levert het niet). Flowline/LBMS en takt ontbreken volledig. Wie op deze technieken plant, moet er sowieso een tweede pakket naast zetten.

6. **Steile leercurve en langdurige implementatie.** `[FEIT — reviewaggregatie]` "Learning Curve" komt in **192 G2-reviews** voor, "Difficult Learning" in **148**. Reële uitrol duurt **6–12 maanden** (tegen de 3 maanden die G2's gemiddelde suggereert). Adoptie bij onderaannemers is een apart en hardnekkig probleem: de licentie is gratis, de bereidheid niet.

7. **Ondoorzichtige prijsstelling en moeizaam verkoopproces.** `[FEIT — reviewaggregatie]` Geen enkel bedrag is publiek; reviewers op zowel G2 als Capterra melden dat je meerdere gesprekken, demo's en follow-ups nodig hebt om überhaupt een prijs te krijgen. Dat maakt objectieve vergelijking met alternatieven vooraf onmogelijk en verschuift de onderhandelingsmacht structureel naar de verkoper.

8. **Agressieve verlengingsverhogingen.** `[SCHATTING, breed gerapporteerd]` 5–14% per jaar, met gedocumenteerde uitschieters tot +150% over vijf jaar. Gecombineerd met nadeel 1 (geen tussentijdse afschaling) en nadeel 3 (data-lock-in) ontstaat een klassieke lock-in-driehoek: de kosten stijgen, je kunt niet krimpen, en je krijgt je planningsdata er niet in bruikbare vorm uit.

9. **Geen volwaardige boekhouding — verborgen functionele kloof.** `[FEIT — reviewaggregatie]` Geen grootboek, geen volledige job costing, geen WIP-rapportage. De QuickBooks Online-koppeling vereist connectors van derden en wijzigingsopdrachten komen niet schoon over. Eén CFO rapporteerde **>$21.500** te hebben uitgegeven vóór te ontdekken dat alleen QuickBooks *Desktop* werkte. Kopers verwachten bij dit prijspeil een financieel gesloten systeem en krijgen dat niet.

10. **Mobiele offline-werking en prestaties laten te wensen over.** `[FEIT — reviewaggregatie]` Tekeningen die offline niet laden ondanks eerdere toegang, dagrapporten die in "pending" blijven steken, corrupte tekening-tags na synchronisatie, trage uploads bij piekbelasting. Gebruikers wijken uit naar aparte clouddrives als achtervang — precies het gedrag dat het platform zou moeten elimineren. Voor bouwplaatsen met slechte connectiviteit is dit een reëel operationeel bezwaar.

11. **Overkill voor kleinere bedrijven.** `[SCHATTING]` Onder circa **$10–20 mln jaarlijks bouwvolume** is de functionele omvang eerder een last dan een voordeel; reviewers noemen ook inconsistente UI-conventies tussen modules (sommige tools slaan automatisch op, andere niet).

---

## 6. Interoperabiliteit — hoe open of gesloten is dit pakket?

Dit is voor de opdrachtgever — die een open-source, IFC-gebaseerde planner bouwt — de meest relevante paragraaf. De conclusie is dat Procore **asymmetrisch open** is: royaal in wat het binnenlaat, restrictief in wat het teruggeeft.

### Planningsformaten

| Formaat | Import | Export | Opmerking |
|---|---|---|---|
| **Primavera XER** | ✅ Ja | ❌ **Nee** | Legacy-tool: read-only, 1 per project |
| **Primavera PMXML** | ✅ Ja | ❌ **Nee** | |
| **Primavera P3 (.PRX), SureTrak (.STX)** | ✅ Ja | ❌ Nee | |
| **MS Project MPP** | ✅ Ja | ❌ **Nee** | |
| **MS Project MPX** | ✅ Ja | ❌ Nee | |
| **MSPDI-XML** | ✅ Ja | ❌ **Nee** | Ook Smartsheet/OpenProject-variant |
| **Asta Powerproject (.PP)** | ✅ Ja | ❌ Nee | |
| **Phoenix (.PPX)** | ✅ Ja | ❌ Nee | |
| **Synchro (.SP)** | ✅ Ja | ❌ Nee | |
| **ProjectLibre (.POD), GanttProject (.GAN)** | ✅ Ja | ❌ Nee | Open-sourceformaten wél gelezen |
| **CSV** | ✅ (batch-import van taken) | ✅ **Ja** (alleen vanuit Gantt-weergave) | Platte tabel; netwerklogica gaat verloren |
| **PDF** | — | ✅ Ja (Letter/Tabloid/A3 + lookahead-A3) | Alleen visueel |

`[FEIT]` Bron: Procore-supportdocumentatie voor upload respectievelijk export.

**Beoordeling:** een 15-op-2-verhouding tussen lees- en schrijfformaten is geen technische beperking maar een commerciële keuze. Procore wil de bestemming zijn van planningsdata, niet een knooppunt. Voor een open-source planner betekent dit: **je kunt Procore niet als upstream-bron gebruiken via bestandsuitwisseling** — alleen via de API, en alleen lezend (zie hieronder).

### IFC — geometrie ja, planning nee

`[FEIT]` Procore ondersteunt **IFC als BIM-viewerformaat**: naast Revit en Navisworks kunnen IFC-modellen worden gepubliceerd vanuit de Documents-tool naar de Models-tool, disciplinemodellen worden samengevoegd, en er is een performante mobiele IFC-viewer voor iOS/Android. Ook is er **BCF-import** in de Coordination Issues-tool.

Maar dat is **uitsluitend de geometrie- en issue-kant**. In alle doorzochte Procore-documentatie is **geen enkele verwijzing gevonden naar `IfcWorkSchedule`, `IfcTask`, `IfcWorkPlan`, `IfcRelSequence` of `IfcWorkCalendar`** — de IFC 4.3-entiteiten waarmee een planning zelf wordt uitgedrukt. `[FEIT — negatief bewijs]` De planning en het model leven in Procore in gescheiden werelden; er is geen native koppeling tussen modelobjecten en activiteiten, en dus ook geen IFC-gebaseerde 4D-uitwisseling.

`[SCHATTING]` Dit is overigens niet uniek voor Procore — de IFC-planningsentiteiten worden marktbreed nauwelijks ondersteund; vrijwel iedereen wisselt planningen uit via XER/MPP en modellen via IFC, zonder brug daartussen. **Dat is precies de opening die de open-source IFC-planner van de opdrachtgever adresseert.** Procore ondersteunt die brug niet en lijkt hem ook niet te ambiëren.

### BCF

✅ Ondersteund voor import in Coordination Issues. `[FEIT]` De buildingSMART BCF-API (RESTful uitwisseling van issues) wordt door Procore **niet** aangeboden als server-implementatie; het is bestandsgebaseerde import. `[SCHATTING]`

### API's

`[FEIT]` Procore heeft een echte, publiek gedocumenteerde REST-API (`developers.procore.com`) met OAuth 2.0, webhooks, sandbox-omgevingen en endpoints voor onder meer BIM Models, BIM Files, BIM Plan Batch, en gebruikersbeheer.

Specifiek voor planning is de situatie mager: bij GA van Procore Scheduling in februari 2026 werden **alleen GET-endpoints** uitgeleverd. `[FEIT]` Dat betekent: je kunt de planning **uitlezen**, maar niet programmatisch **schrijven**. Een externe planningsengine kan dus niet als schrijvende bron dienen; Procore blijft de master.

Beperkingen: **3.600 requests/uur per OAuth-client_id** (niet per gebruiker), wat bij portfoliobrede synchronisatie snel knelt. `[FEIT]` Bulkexports tegen de `per_page=10000`-limiet naderen het quotum. Procore erkent in de eigen community dat het quotasysteem verouderd is en op de schop gaat.

### Openheidsscore

| Dimensie | Score | Toelichting |
|---|---|---|
| Import planningsformaten | 🟢 **Zeer open** | Breedste ondersteuning in de markt, inclusief open-sourceformaten |
| Export planningsformaten | 🔴 **Gesloten** | Alleen PDF/CSV; geen XER/MPP/XML |
| IFC-geometrie | 🟢 **Open** | Native IFC-viewer, mobiel, meerdere disciplines |
| IFC-planning (IfcWorkSchedule/IfcTask) | 🔴 **Afwezig** | Geen enkele ondersteuning aangetroffen |
| BCF | 🟡 **Gedeeltelijk** | Bestandsimport ja, BCF-API nee |
| REST-API algemeen | 🟢 **Open** | Volwassen, breed gebruikt, goed gedocumenteerd |
| REST-API planning | 🟡 **Alleen lezen** | Alleen GET bij GA 2026 |
| Rate limits | 🟡 **Knellend** | 3.600/uur per client_id |
| Datamodel/broncode | 🔴 **Volledig gesloten** | Proprietary SaaS, geen self-hosting, geen open datamodel |

**Eindconclusie interoperabiliteit:** Procore is een **one-way valve voor planningsdata**. Het is uitstekend als bestemming en onbruikbaar als bron. Voor een open-source, IFC-gebaseerde planner is Procore geen partner maar een **concurrerend zwaartepunt**: het trekt planningsdata naar binnen en laat ze niet in gestructureerde vorm gaan. De enige realistische integratieroute is de lezende REST-API — met quota-beperkingen, zonder schrijfmogelijkheid, en zonder IFC-planningssemantiek.

---

## 7. Marktpositie

### Financiële en klantpositie `[FEIT — SEC/investor relations]`

| Metriek | FY2023 | FY2024 | FY2025 | FY2026 (guidance) |
|---|---|---|---|---|
| Omzet | $950 mln | $1.152 mln | **$1.323 mln (+15%)** | $1.489–1.494 mln (+13%) |
| GAAP-bedrijfsresultaat | — | — | **–$124 mln (–9%)** | — |
| Non-GAAP-bedrijfsresultaat | — | — | **+$187 mln (14% marge)** | 17,5–18% marge |
| Vrije kasstroom | — | — | **$215 mln (+69%)** | 19% marge |
| Organische klanten | — | — | **17.850** | — |
| Klanten >$100k ARR | — | — | **2.710 (+16%)** | — |
| Klanten >$1 mln ARR | — | — | **115 (+34%)** | — |
| Bruto-retentie | — | — | **95%** | — |
| Netto-retentie | — | — | **106%** | — |
| Multi-product (4+ producten) | — | — | **78% van ARR** | — |

Belangrijkste leesbare signalen:

- **Groeivertraging is reëel:** van +21% (2024) naar +15% (2025) naar +13% guidance (2026). Procore is de hypergroeifase uit.
- **Winstgevendheid komt op orde:** non-GAAP-marge van 14% naar 17,5–18%, vrije kasstroom +69%. Het bedrijf is overgeschakeld van "groei koste wat kost" naar "efficiënte groei" — de klassieke post-IPO-transitie.
- **NRR van 106% is bescheiden voor enterprise-SaaS** en verklaart de druk om nieuwe modules te lanceren (Scheduling, Resource Management, Procore Pay). Scheduling is expliciet een **ARR-uitbreidingsproduct**, niet een antwoord op een technische roeping.
- **78% van ARR uit klanten met 4+ producten** bevestigt dat de land-and-expand-strategie werkt en dat Procore's echte waarde de *platformbreedte* is, niet enige losse module.
- **International groeide 38%** volgens voorlopige Q4-2025-cijfers `[SCHATTING — persbericht-parafrase]` — internationale expansie is de belangrijkste groeimotor nu de VS verzadigd raakt.

### Waar Procore sterk staat, en waarom

1. **Amerikaanse mid-market en enterprise-GC's.** Hier is Procore de facto standaard geworden. De reden is netwerkeffect: `[CLAIM-LEVERANCIER]` 70% van de ENR 400 gebruikt het, waardoor onderaannemers het sowieso moeten kennen, waardoor de volgende GC het makkelijker invoert. Het gratis-gebruikersmodel is de motor onder dat netwerkeffect.
2. **Documentbeheer, RFI's, submittals, dagrapporten en financiën.** Dit is de onbetwiste kern en het is écht goed.
3. **Sectorfocus.** `[CLAIM-LEVERANCIER]` "93% van Procore's G2-reviews komt uit de bouwcategorie, tegen 54% voor Autodesk Construction Cloud." Als claim is dat zelfselectief, maar de onderliggende observatie klopt: Procore is 100% bouw, terwijl Autodesk vanuit ontwerp komt.

### Concurrentieveld

| Concurrent | Positionering | Verhouding tot Procore |
|---|---|---|
| **Autodesk Construction Cloud / Build** | Ontwerp-en-bouw, verankerd in BIM en het Autodesk-ecosysteem | Directe hoofdconcurrent; wint waar BIM leidend is, verliest waar bouwplaats-administratie leidend is |
| **Oracle (Primavera P6, Aconex, Primavera Cloud)** | Enterprise projectbeheersing en documentbeheer, infra/olie-gas | **Complementair én bedreigend**: P6 is de engine die Procore níét heeft; Oracle probeert omgekeerd de samenwerkingslaag te pakken |
| **Trimble (ProjectSight, Tekla, e-Builder)** | Hardware-software-continuüm, survey/veldwerk | Sterk in infra en zelfbouwende aannemers |
| **Bentley Systems (SYNCHRO)** | Infrastructuur, **echte 4D-planning** | Bezit precies wat Procore mist op 4D |
| **CMiC** | Bouw-ERP rond financiën | Wint waar het grootboek doorslaggevend is |
| **Asta Powerproject (Elecosoft)** | Volwaardige CPM tegen lagere kosten dan P6, sterk in UK/EU | Het pakket dat Europese aannemers náást Procore draaien |
| **Buildertrend, Projul, Buildern** | Woningbouw/kleine aannemers | Vangen consequent de klanten op die Procore te duur/te zwaar vinden |
| **Planera, Touchplan, Outbuild, Nialli, Hoylu** | Gespecialiseerde planning/lean/pull | Groeiende niche die Procore's zwakte exploiteert |

**Marktomvang:** `[SCHATTING — Mordor Intelligence]` de markt voor bouwmanagementsoftware wordt in 2026 op **$11,58 mrd** geraamd, met een CAGR van 8,99% naar **$17,81 mrd in 2031**. Procore's $1,32 mrd omzet impliceert daarmee een aandeel van circa **11%** van een gefragmenteerde markt — leidend, maar bepaald niet dominant.

### Trend

- **De strategische beweging is duidelijk:** Procore breidt van administratie naar uitvoering (Scheduling, Resource Management, Materials, Safety Hub) en naar geld (Procore Pay, Direct Sub-tier Payments, e-notary). Het doel is het "system of record" van de bouw worden.
- **AI is het speerpunt voor 2026** ("Digital Coworker"/agentic AI, aangekondigd op Groundbreak 2025, uitgeleverd in 2026-releases). `[FEIT]` `[SCHATTING]` Voorlopig meer positionering dan planningswaarde — Planera merkt op dat aangekondigde AI-planningsfuncties bij GA niet waren geleverd.
- **Overheid:** FedRAMP Moderate Equivalency opent de Amerikaanse federale markt. `[FEIT]`
- **Internationale expansie** is de belangrijkste groeihefboom, met de EMEA-hub in Dublin als spil.
- **Scheduling is een defensieve zet.** `[SCHATTING]` Procore bouwt geen planner omdat het P6 wil verslaan, maar omdat elke workflow die buiten het platform leeft een aanvalsvector is voor een concurrent. Dat verklaart waarom de tool prioriteit geeft aan samenwerking en integratie boven rekenkundige correctheid — en waarom float, baselines en kalenders achteraan de wachtrij stonden.

---

## 8. Eindoordeel

**Procore is een uitstekend bouwmanagementplatform met een middelmatige planningstool erin — en het is belangrijk die twee niet te verwarren.**

Als *system of record* voor een hoofdaannemer is Procore moeilijk te verslaan: het onbeperkte-gebruikersmodel lost het adoptieprobleem in de keten op, de administratieve kern is volwassen en breed geliefd (G2 4,6/5 over ruim 4.000 reviews), het ecosysteem is diep, en de leverancier is financieel gezond met $1,3 mrd omzet en positieve vrije kasstroom. Wie zoekt naar één plek waar tekeningen, RFI's, submittals, dagrapporten, keuringen en budgetten samenkomen, koopt hier iets goeds.

Als *planningssoftware* houdt het geen stand bij streng onderzoek. De legacy Schedule-tool is expliciet een read-only viewer voor P6/MS Project-bestanden — Procore's eigen documentatie stelt onomwonden dat planningen niet in Procore bewerkt kunnen worden. De nieuwe Procore Scheduling (GA 17 februari 2026) is een echte native editor met dependency-propagatie, maar ging live **zonder werkkalenders en zonder baselines**, kent in geen enkel document total float, backward pass, data date of constrainttypen, en **exporteert uitsluitend naar PDF en CSV**. Dat laatste is geen detail: een tool die vijftien planningsformaten inleest en er nul uitschrijft, houdt de netwerklogica intern niet volledig bij, óf houdt hem bewust binnen. Beide verklaringen zijn slecht nieuws voor de koper. Voor contractuele planning, EOT-claims of forensische vertragingsanalyse is Procore Scheduling ongeschikt; voor veldcoördinatie en lookaheads is het bruikbaar en soms zelfs beter dan P6, juist omdat het aan de uitvoeringsdata hangt.

Het prijsmodel verdient een aparte waarschuwing. Afrekenen op **jaarlijks bouwvolume** — indicatief 0,1–0,2% van de harde bouwkosten, ofwel ruwweg $700–1.000 per miljoen — koppelt softwarekosten aan omzet in een sector met flinterdunne marges, laat de rekening automatisch meestijgen met groei die niets met softwaregebruik te maken heeft, en verbiedt tussentijds afschalen als het orderboek krimpt. Gecombineerd met verlengingsverhogingen van 5–14% per jaar en het ontbreken van planningsexport ontstaat een lock-in die stevig genoeg is om vooraf hard over te onderhandelen: leg meerjarige prijsplafonds vast en bedwing de ACV-definitie contractueel.

**Voor de opdrachtgever die een open-source, IFC-gebaseerde planner bouwt** is het oordeel eenduidig. Procore is **asymmetrisch open**: breed in import (inclusief open-sourceformaten als ProjectLibre en GanttProject), gesloten in export, met een REST-API die voor planning alleen GET-endpoints biedt. IFC wordt uitsluitend als geometrie- en viewerformaat ondersteund — van `IfcWorkSchedule`, `IfcTask`, `IfcWorkCalendar` of `IfcRelSequence` is nergens sprake, en er is geen native koppeling tussen modelobjecten en activiteiten. Procore is dus geen integratiepartner maar een concurrerend zwaartepunt dat planningsdata aantrekt en niet in gestructureerde vorm teruggeeft.

Tegelijk legt Procore's zwakte precies de marktkans bloot. De hele sector wisselt planningen uit via XER/MPP en modellen via IFC, zónder brug ertussen — en de grootste speler ter wereld heeft die brug niet, bouwt hem niet, en heeft er in twintig jaar en zeven overnames nooit in geïnvesteerd. **Een open planner die IFC 4.3-planningsentiteiten serieus neemt en wél naar XER/MPP/MSPDI kan schrijven, valt Procore niet aan op zijn sterkte (het platform), maar bezet exact het gat dat Procore structureel openlaat.** De aangewezen positionering is niet "vervanger van Procore", maar "de open planningslaag die Procore weigert te zijn" — met export als kernpropositie, precies daar waar Procore dichtklapt.

**Samenvattend advies:** koop Procore voor het platform, niet voor de planning. Reken erop dat P6, Asta of MS Project ernaast blijft draaien — Procore's eigen legacy-tool is daar zelfs op ontworpen. Herzie die conclusie op zijn vroegst wanneer Procore Scheduling aantoonbaar total float berekent én naar XER of MSPDI kan exporteren; vóór die twee mijlpalen is het een Gantt-viewer met ambitie.

---

## Bronnenlijst

Alle bronnen geraadpleegd op **25 juli 2026**, tenzij anders vermeld.

### Primaire leveranciersbronnen (Procore)

1. [Procore — Pricing](https://www.procore.com/pricing) — ACV-model, onbeperkte gebruikers, Field Productivity per FTE
2. [Procore Support — Scheduling (Project)](https://support.procore.com/products/online/user-guide/project-level/scheduling) — functionaliteit nieuwe Scheduling-tool
3. [Procore Support — Project Schedule (legacy)](https://support.procore.com/products/online/user-guide/project-level/schedule) — legacy-tool, Procore Drive, lookaheads
4. [Procore Support — Upload a Project Schedule File to Procore's Web Application](https://support.procore.com/products/online/user-guide/project-level/schedule/tutorials/upload-a-project-schedule-file-to-procores-web-application) — volledige lijst importformaten; *"Project schedules cannot be edited in Procore"*
5. [Procore Support — Export a Project Schedule](https://support.procore.com/products/online/user-guide/project-level/schedule/tutorials/export-a-project-schedule) — **PDF en CSV als enige exportformaten**
6. [Procore Support — Release Notes: Procore Scheduling](https://support.procore.com/products/online/user-guide/project-level/scheduling/release-notes) — GA 17-02-2026, open beta 30-09-2025
7. [Procore Support — FAQ: What is Primavera P6 and how does it integrate with Procore?](https://support.procore.com/faq/what-is-primavera-p6-and-how-does-it-integrate-with-procore) — één P6-planning per project, wijzigingen alleen in P6
8. [Procore Support (v2) — Edit the Gantt Chart](https://v2.support.procore.com/product-manuals/scheduling-project/tutorials/edit-the-gantt-chart) — FS-afhankelijkheden, `5SS+2d`-notatie, *"dynamically updates the logic chain"*
9. [Procore Blog — Introducing Procore Scheduling, Now Available via Procore Explore](https://www.procore.com/blog/introducing-procore-scheduling) — open beta, P6/MPP-import read-only of bewerkbaar
10. [Procore Blog — Procore Scheduling Reaches General Availability](https://www.procore.com/blog/procore-scheduling-reaches-general-availability) — GA-featureset, roadmap kalenders/baselines voorjaar-zomer 2026
11. [Procore Blog — Procore Shapes Future of Construction with New Platform Enhancements](https://www.procore.com/blog/procore-shapes-future-of-construction-with-new-platform-enhancements) — Groundbreak 2025, roadmap, FedRAMP
12. [Procore What's New — Procore Scheduling Now Available](https://www.procore.com/whats-new/procore-scheduling-now-available) — 28-01-2026, GET-API-endpoints
13. [Procore — Terminplanungssoftware für die Baubranche (DE)](https://www.procore.com/de/projektmanagement/terminplan) — Duitstalige propositie
14. [Procore — Compare: Procore vs Autodesk](https://www.procore.com/compare/procore-vs-autodesk) — 70% ENR 400, 500+ integraties, $1 biljoen bouwwaarde
15. [Procore — Mobile IFC Viewer (UK)](https://www.procore.com/en-gb/fc/mobile-ifc-viewer) — IFC-ondersteuning in BIM-viewer
16. [Procore — IFC Viewers (UK)](https://www.procore.com/en-gb/library/ifc-viewer) — samenvoegen disciplinemodellen
17. [Procore What's New — BIM: BCF File Import](https://www.procore.com/whats-new/bim-enhance-your-coordination-with-procore-bims-bcf-file-import) — BCF-import in Coordination Issues
18. [Procore Library — Industry Foundation Classes](https://www.procore.com/library/industry-foundation-classes) — educatieve IFC-content (geen productclaims)
19. [Procore Library — 4D BIM](https://www.procore.com/library/4d-bim) — educatieve 4D-content
20. [Procore Developers — Rate Limiting](https://developers.procore.com/documentation/rate-limiting) — 3.600 requests/uur per client_id
21. [Procore Community — Procore's API Quota System](https://community.procore.com/s/topic/0TO8V000000oWjuWAE/procores-api-quota-system) — erkenning verouderd quotasysteem
22. [Procore Developers — REST API reference](https://developers.procore.com/reference/rest/bim-models) — BIM-endpoints

### Financiële en bedrijfsinformatie

23. [Procore Investor Relations — Q4 & Full Year 2025 Financial Results](https://investors.procore.com/news/news-details/2026/Procore-Announces-Fourth-Quarter-and-Full-Year-2025-Financial-Results/default.aspx) — FY2025 omzet $1,323 mrd, klantcijfers, NRR 106%, GRR 95%
24. [SEC EDGAR — Procore Technologies Form 8-K FY2026 (Q4 2025)](https://www.sec.gov/Archives/edgar/data/1611052/000162828026007662/pcor-q425x8xkxexx991.htm)
25. [SEC EDGAR — Procore Technologies Form ARS FY2025](https://www.sec.gov/Archives/edgar/data/0001611052/000119312526177333/d68111dars.pdf)
26. [Procore Investor Relations — Q1 2026 Financial Results](https://investors.procore.com/news/news-details/2026/Procore-Announces-First-Quarter-2026-Financial-Results/default.aspx)
27. [Macrotrends — Procore Technologies Revenue 2019–2026](https://www.macrotrends.net/stocks/charts/PCOR/procore-technologies/revenue)
28. [Wikipedia — Procore](https://en.wikipedia.org/wiki/Procore) — oprichting, financieringsrondes, IPO, overnames
29. [Bessemer Venture Partners — Breaking new ground to IPO: The Procore Story](https://www.bvp.com/atlas/procore-ipo)
30. [Procore Press — Procore Acquires INDUS.AI](https://www.procore.com/press/procore-acquires-construction-artificial-intelligence-company-indusai)

### Prijsbronnen (derden)

31. [ScanManifold — Procore Pricing 2026: $15K–$80K/Year (ACV Model Breakdown)](https://www.scanmanifold.com/blog-posts/procore-pricing-2026-contractors) — 0,1–0,2% van harde bouwkosten; segmentbedragen
32. [Projul — Procore Pricing 2026: Real Cost Per Month Exposed](https://projul.com/blog/procore-pricing-analysis-2026/) — gepubliceerd 12-09-2025, bijgewerkt maart 2026; gedetailleerde implementatie- en verlengingskosten
33. [CostBench — Procore Pricing 2026](https://costbench.com/software/construction-management/procore/) — geverifieerd 08-07-2026; $700–1.000 per $1 mln volume; contractvoorwaarden. *Let op: de op deze pagina genoemde "mediaan $2.500/jaar over 19 verified purchases" is niet consistent met alle overige bronnen en is als onbetrouwbaar terzijde gelegd.*
34. [PricingNow — Procore Pricing 2026](https://pricingnow.com/question/procore-pricing/) — gepubliceerd 08-03-2026; TTV 4–12 weken
35. [CheckThat.ai — Procore Pricing 2026](https://checkthat.ai/brands/procore/pricing) — module-add-onkosten
36. [ITQlick — Procore Pricing](https://www.itqlick.com/procore/pricing)
37. [TrustRadius — Procore Pricing 2026](https://www.trustradius.com/products/procore/pricing) — *(pagina gaf HTTP 403 bij directe raadpleging; alleen via zoekresultaten benaderd)*

### Reviews en gebruikerservaringen

38. [Capterra — Procore](https://www.capterra.com/p/56250/Procore/) — 4,5/5 over 2.667 reviews; subscores; startprijs $10.000
39. [Capterra — Procore Reviews](https://www.capterra.com/p/56250/Procore/reviews/)
40. [G2 — Procore Pros and Cons](https://www.g2.com/products/procore/reviews?qs=pros-and-cons) — *(HTTP 403 bij directe raadpleging; via zoekresultaten en aggregatoren benaderd)*
41. [CheckThat.ai — Procore Reviews: What 8.190+ Users Actually Think](https://checkthat.ai/brands/procore/reviews) — aggregatie G2 4,6/5 (4.186), Capterra 4,5/5 (2.661), TrustRadius 8,6/10 (1.340); leercurve-mentietellingen; offline- en boekhoudkritiek
42. [GetApp — Procore Pricing, Features, Reviews & Alternatives](https://www.getapp.com/construction-software/a/procore/)
43. [Capterra Deutschland — Procore Erfahrungen, Vor- und Nachteile](https://www.capterra.com.de/software/56250/procore)

### Concurrentie- en marktanalyse

44. [Planera — Planera vs. Procore Scheduling: A Real CPM Engine vs. a Gantt Chart](https://www.planera.io/compare/planera-vs-procore) — **directe concurrent**; gedetailleerde technische kritiek op CPM-engine, float, export, DCMA-14
45. [Planera — Best Procore Alternative for Construction Scheduling 2026](https://www.planera.io/post/procore-alternatives) — **directe concurrent**; alternatievenoverzicht
46. [Mordor Intelligence — Construction Management Software Market Size, Growth Trends 2026–2031](https://www.mordorintelligence.com/industry-reports/construction-management-software-market) — $11,58 mrd (2026) → $17,81 mrd (2031), CAGR 8,99%
47. [G2 — Autodesk Construction Cloud vs. Procore Comparison 2026](https://www.g2.com/compare/autodesk-construction-cloud-vs-procore)
48. [Business-Software.com — Procore vs Autodesk vs CMiC](https://www.business-software.com/blog/vendor-comparison-procore-vs-autodesk-vs-cmic-ai-construction-solutions/)
49. [WhatIsBest — Procore vs. Oracle Primavera: Which Is Better for Enterprise Project Scheduling?](https://www.whatisbest.com/construction/procore-vs-oracle-primavera-which-is-better-for-enterprise-project-scheduling)
50. [Lean Construction Blog — Last Planner and Takt Software Directory](https://leanconstructionblog.com/Last-Planner-and-Takt-Software-Directory.html) — positionering Touchplan/lean-tools
51. [Computer Spezial — Procore startet in DACH](https://www.computer-spezial.de/artikel/procore-startet-in-dach-3873170.html) — DACH-marktintroductie
52. [VeilSun — Why Procore Alone Doesn't Solve Operations](https://www.veilsun.com/blog/why-procore-alone-doesnt-solve-operations)
53. [Bolder Apps — Procore Integration for Custom Construction Apps in 2026](https://www.bolderapps.com/blog-posts/procore-integration-custom-construction-apps-2026) — API-praktijk, rate limits, veelgemaakte integratiefouten
54. [Releasebot — Procore Release Notes juni/juli 2026](https://releasebot.io/updates/procore) — recente releases, mobiele Scheduling-beta

### Methodologische aantekening

Procore publiceert geen prijzen en geen technische specificatie van zijn planningsengine. Het strenge oordeel in §2c berust daarom op drie soorten bewijs: (a) **positief bewijs** uit Procore's eigen documentatie (exportformaten, read-only-status legacy-tool, roadmap-timing van kalenders en baselines); (b) **negatief bewijs** — de systematische afwezigheid van CPM-vaktermen in álle doorzochte leveranciersdocumentatie; en (c) **partijdig bewijs** van concurrent Planera, dat alleen is meegewogen waar het door (a) wordt bevestigd. Waar deze drie elkaar tegenspreken, is de leveranciersdocumentatie leidend en is de tegenspraak expliciet benoemd (zie de contra-indicatie over *"dynamically updates the logic chain"*). Reddit was tijdens dit onderzoek niet toegankelijk voor de gebruikte tooling; forumsentiment is daarom indirect meegenomen via reviewaggregatoren en secundaire citaten, wat als lichte beperking van de bronnenmix geldt.
