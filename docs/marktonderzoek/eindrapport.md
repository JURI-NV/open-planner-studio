# Eindrapport marktonderzoek: projectplanning- en schedulingsoftware wereldwijd

**Synthese van 92 deelrapporten — 26 geografische markten, 14 sectoren, 44 softwareprofielen, 8 dwarsdoorsnede-thema's**
Onderzoeksperiode: juli 2026 · Peildatum cijfers: 25 juli 2026 · Alle bedragen in USD tenzij anders vermeld

> **Over de betrouwbaarheid van dit document.** Elk deelrapport is na afronding onderworpen aan een adversariële verificatieronde waarin de eigen beweringen actief zijn geprobeerd te weerleggen. Die rondes hebben substantiële correcties opgeleverd — in sommige rapporten meer gecorrigeerde dan bevestigde beweringen. Dat is geen zwakte van het onderzoek maar het resultaat ervan: waar hieronder een getal staat, staat er ook bij hoe hard het is. Cijfers die wij zelf hebben afgeleid zijn gemarkeerd als **[schatting]**. Wie één getal uit dit rapport wil citeren, moet eerst het bijbehorende deelrapport lezen.

---

## 1. Managementsamenvatting

**De gepubliceerde marktramingen zijn onbruikbaar zonder herdefinitie.** Voor exact dezelfde markt — "project portfolio management software", jaar 2025 — circuleren ramingen van **$0,82 mrd tot $12,2 mrd**: een factor 15. Dat is geen meetruis maar een definitieverschil. De hoge cijfers tellen work-management-SaaS mee (Asana, monday.com, Jira, Smartsheet, ClickUp); de lage tellen alleen klassieke portfoliogovernance. Beperkt tot ramingen die wij daadwerkelijk bij de uitgever konden reproduceren blijft een spreiding van $0,82–9,91 mrd over: nog altijd factor 12.

**Onze eigen triangulatie komt op circa $2,5–4,5 miljard voor de smalle planningsmarkt.** Twee onafhankelijke methoden — bottom-up (aantal planners × prijs per seat) en optelling van toerekenbare leveranciersomzet — leveren vrijwel hetzelfde getal op. Voor de smalle definitie (CPM, Gantt, resource-levelling als kernfunctie: P6, MS Project, Powerproject, Safran, Spider, Open Plan/Acumen, SYNCHRO, TILOS, ALICE, nPlan) komen wij uit op **$2,5–4,5 mrd, centrale waarde ~$3,0 mrd, groei 4–7 %/jaar**. Het **bouw- en infradeel** daarvan is **$0,9–1,7 mrd, centraal ~$1,3 mrd, groei 5–8 %/jaar**. Beide zijn **[schatting]** met een expliciet erkende onzekerheid.

**Gartner en IDC publiceren géén openbaar marktomvangcijfer** voor PPM of scheduling. Verwijzingen in de vakpers naar "Gartner: de PPM-markt is $X mrd" zijn vrijwel altijd misattributie. De cijfers die wél circuleren komen van commerciële syndicated-rapportuitgevers (Grand View, Mordor, MarketsandMarkets, Fortune Business Insights, Technavio, Verified Market Research) die geen methodologie, geen steekproef en geen leveranciersopbouw publiceren. Eén uitgever verkoopt twee elkaar overlappende rapporten over dezelfde markt met CAGR's van 3,9 % en 15,42 %.

**De veelgeciteerde groeicijfers horen bij een andere markt.** "$20 mrd in 2030 bij 15,7 % CAGR" beschrijft work management, niet planning. De echte CPM-markt is klein en groeit ongeveer mee met de bouwconjunctuur. Ter kalibratie: de héle wereldwijde bouwplanningsmarkt ligt in dezelfde orde van grootte als de jaaromzet van Procore alléén ($1,323 mrd, FY2025 — geverifieerd).

**De markt spant vier ordes van grootte in prijs, en de trappen zijn scherp.** Van $0 (Open Planner Studio, OpenProject Community, ProjectLibre) via ~$110–230 (Smartsheet, monday, Wrike, Zoho) en ~$360–660 (MS Project Plan 3/5) naar ~$1.000–1.500 (Asta Powerproject, Primavera P6) tot ~$4.980 (Bentley SYNCHRO 4D). Daarboven ligt een vijfde laag die niet per planner maar per project wordt geprijsd, tot £620.239 per project per jaar. De 22 %-onderhoudsformule van Oracle klopt in de eigen prijslijst tot op de cent, over alle producten.

**Niet functionaliteit maar contractuele acceptatie bepaalt wie meedoet.** Zes lock-in-mechanismen — van formaatmandaat tot betalingskoppeling — maken van de planningsmarkt een toelatingsmarkt. Het Amerikaanse defensiebestek UFGS 01 32 01.00 10 schrijft niet alleen P6 voor maar zelfs P6-*instellingen* (`Longest Path`, `Retained Logic`), en eist bovendien dat de software "commercially available ... with vendor software support agreements available" is. Dat laatste is het scherpste obstakel voor open source dat wij zijn tegengekomen.

**En daar zit tegelijk het gat.** Er bestaat geen enkel serieus open-source project dat een echte CPM-solver combineert met IFC als natief formaat. De open-source projecten met een echte scheduler (ProjectLibre, GanttProject, LibrePlan, Plan/KDE) zijn structureel onderfinancierd en fragiel; de gezonde open-core platforms (OpenProject, Odoo, Tuleap) hebben géén CPM-engine — OpenProject documenteert zelf dat het alleen Finish-to-Start kent, één werkdagenkalender voor de hele installatie heeft en geen resourcemanagement. De hele IfcOpenShell/Bonsai-stack, de facto de open-source IFC-infrastructuur wereldwijd, draait op een jaarbudget van circa $25.620. IFC 4.3 draagt de volledige CPM-payload al (`IfcTaskTime` met `EarlyStart`, `LateFinish`, `FreeFloat`, `TotalFloat`, `IsCritical`), maar geen enkel gecertificeerd uitwisselingsscenario dekt planning. De positie die Open Planner Studio kiest is leeg — niet verzadigd.

---

## 2. Wereldwijd totaalbeeld

### 2.1 Vier marktdefinities, vier antwoorden

| Marktdefinitie | Eigen bandbreedte 2025/26 **[schatting]** | Centrale waarde | Realistische CAGR |
|---|---|---|---|
| **(a1) Smalle planning/scheduling** — CPM, Gantt, resource-levelling als kernfunctie | **$2,5 – 4,5 mrd** | ~$3,0 mrd | **4 – 7 %** |
| **(a2) Brede PPM** — incl. portfoliogovernance, resourcemanagement, timesheets, diensten | $6 – 10 mrd | ~$7,5 mrd | 7 – 11 % |
| **(a3) Work management** — incl. Asana/monday/Jira/Smartsheet/ClickUp/Planner | $18 – 25 mrd | ~$21 mrd | 12 – 18 % |
| **(b) Bouw-/infradeel van (a1)** | **$0,9 – 1,7 mrd** | ~$1,3 mrd | 5 – 8 % |
| (b2) Brede "construction PM & scheduling" | $3 – 4 mrd | ~$3,4 mrd | 9 – 10 % |

Wie de drie definities door elkaar haalt, kan elke gewenste conclusie onderbouwen. Dat is precies wat de vakpers doet.

### 2.2 De belangrijkste trends

**De consolidatiegolf is voorbij haar hoogtepunt; de desintegratiegolf is begonnen.** Het verhaal van 2008–2022 was overname: Oracle kocht Primavera, Trimble kocht Vico en TILOS, Bentley kocht SYNCHRO, Roper kocht Deltek, Schneider kocht RIB, Nemetschek kocht zich in. Nu draait het om. Producten worden afgestoten of doodgelegd in plaats van geïntegreerd — Trimble TILOS bereikt End of Maintenance op 1 maart 2026, Vico Office is sinds 2023 niet meer verkocht en sinds 30 juni 2024 niet meer ondersteund, Oracle Primavera Risk Analysis wordt de facto niet meer ontwikkeld, Glodon zette BIM5D uit.

**De SaaS-transitie is bij de Europese spelers klaar, en dat verwijdert een groeimotor.** Nemetschek's licentieomzet zakte van €234,8 mln (2021) naar €55,9 mln (2025) — min 76 % — terwijl de totale omzet met 75 % groeide naar €1,19 mrd. Bentley haalde in FY2025 91,7 % van de omzet uit abonnementen; Eleco plc rapporteerde 81 % terugkerende omzet en verklaarde de transitie voltooid. Tegelijk verkoopt Microsoft nog steeds Project Standard 2024 ($679,99) en Professional 2024 ($1.129,99) als eenmalige aankoop.

**De hardste migratiedeadline in dit veld is zojuist verstreken.** Microsoft Project Server 2019 verloor Extended Support op **14 juli 2026**. De opvolger is niet "de cloud" maar Project Server Subscription Edition; de webopvolger van de desktopclient is functioneel een forse stap terug.

**AI in planning is klein, en wat werkt is smal.** Het publiek aangekondigde durfkapitaal in "AI voor planning" telt op tot circa **$115 mln** (ALICE $47M cumulatief, Trunk Tools $40M, nPlan $16M, Nodes & Links $12M). nPlan had in 2024 gemiddeld 34 werknemers. Eén ding is met gepubliceerde, kruisgevalideerde cijfers onderbouwd: het voorspellen van kansverdelingen van activiteitsduren uit historische planningen (nPlan: MAE 106,3 werkuren voor hun GNN tegen 1.514,1 voor PERT). De rest — "17 % kortere doorlooptijd", "tot 20 % versnelling" — zijn leveranciers- en adviesbureauclaims zonder gepubliceerde methodologie of controlegroep.

**De onderkant wordt afgesnoept tegen prijzen die tot 12× lager liggen.** monday.com Standard kost $144/jaar tegen InEight Schedule NOW $1.800/jaar. Wat die goedkope tools níét doen is CPM: geen float, geen constraints, geen kalendermodel, geen resource-levelling. Voor werk waar de planning geen contractueel document is, blijkt dat vaak genoeg.

**De moat is een bestandsformaat, en dat formaat is al opengebroken.** MPXJ — LGPL, één onderhouder — leest en schrijft P6 XER en PMXML, MS Project MPP en MSPDI, Asta Powerproject, Deltek Open Plan, SYNCHRO en SDEF, met maandelijkse releases. Het schrijven van MPP lukt na 25 jaar nog steeds niemand, ook MPXJ niet. Er bestaat bovendien een levensvatbare commerciële markt puur voor het *lezen* van XER (ScheduleReader, $344–440/jaar).

---

## 3. Geografische markten

Per markt: onze eigen schatting van de jaarlijkse licentie-/abonnementsomvang voor planning- en schedulingsoftware (niet de bredere PM- of bouwsoftwaremarkt, tenzij vermeld), de drie pakketten die het veld feitelijk beheersen, en het betrouwbaarheidsoordeel uit de verificatieronde van het deelrapport.

| Markt | Omvangschatting planning/scheduling per jaar | Top-3 software | Betrouwbaarheid |
|---|---|---|---|
| [Verenigde Staten](markten/markt-verenigde-staten.md) | Bouwspecifiek **$505–740 mln**; totale VS planning/PPM ~$2,4 mrd (band $2,3–2,5 mrd) | Primavera P6 · MS Project · Deltek/Smartsheet | **Matig** — kernraming gecorrigeerd na rekenfout; plannerspopulatie (30.000–60.000) blijft zwak onderbouwd |
| [Canada](markten/markt-canada.md) | **USD 40–80 mln** bouwspecifiek CPM/Gantt | Primavera P6 · MS Project · Asta/TILOS | **Matig** — neerwaarts herzien (was 60–90 mln); Noord-Amerikaanse basis zelf onzeker |
| [VK & Ierland](markten/markt-verenigd-koninkrijk-ierland.md) | **£20–40 mln** *(zuivere eigen schatting)*; totale UK PM-software $334,7 mln (2023, GVR) | Asta Powerproject · Primavera P6 · MS Project | **Matig** — 18 beweringen: 6 bevestigd, 9 gecorrigeerd, 3 onzeker |
| [Benelux](markten/markt-benelux.md) | **€15–40 mln** — bewust brede band: top-down (€32–43 mln) en bottom-up (€6–24 mln) overlappen nauwelijks | Primavera P6 · MS Project · Asta Powerproject / KYP Project | **Matig** — rekenfout in omvang gecorrigeerd, twee bronnen dekten hun claim niet, drie basiscijfers hersteld |
| [DACH](markten/markt-dach-duitsland-oostenrijk-zwitserland.md) | **€65–135 mln** bouwspecifiek (gecorrigeerd, was €80–150 mln); PM-software Duitsland $350–435 mln | Excel · MS Project · TILOS / Asta Powerproject | **Redelijk** — hoofdcorrectie op omvang, externe cijfers bevestigd |
| [Frankrijk](markten/markt-frankrijk.md) | **€185–240 mln** breed, waarvan **€60–90 mln** bouwspecifiek | MS Project · Primavera P6 · TILOS / Sciforma | **Matig** — 12 beweringen: 5 bevestigd, 6 gecorrigeerd, 1 onzeker |
| [Italië](markten/markt-italie.md) | **€11–33 mln**, waarvan **€9–26 mln** bouw/infra | ACCA PriMus(-K) · MS Project · Primavera P6 | **Zwak** — hoofdconclusie volgde rekenkundig niet uit de eigen tabel; externe kruiscontrole berustte op een leesfout |
| [Spanje & Portugal](markten/markt-spanje-en-portugal.md) | **€20–50 mln** licenties + €10–30 mln training/diensten | Primavera P6 · MS Project · Presto / lokale bouw-ERP | **Matig** — omvang gecorrigeerd; optelling herzien naar €15–51 mln |
| [Nordics](markten/markt-nordics-zweden-noorwegen-denemarken-finland.md) | **EUR 35–75 mln** bouw/infra-planning; USD 195–290 mln PM breed | Safran · Asta Powerproject (+ Bidcon) · Primavera P6 | **Matig** — omvangafleiding, bbp-ankers en een klantenlijst gecorrigeerd |
| [Polen & Centraal-Europa](markten/markt-polen-en-centraal-europa.md) | **EUR 5,1–12,9 mln** pure licenties (midpunt ~€9 mln); EUR 9–31 mln incl. diensten | MS Project · Primavera P6 · Norma/lokale calculatiepakketten | **Zwak** — meerdere kernclaims verworpen; oorspronkelijke raming (€12–25 mln) was ruim twee keer te hoog |
| [Rusland & GOS](markten/markt-rusland-en-de-gos-landen.md) | PM-softwaremarkt ~6,4 mrd RUB (2024); MS Project-aandeel gehalveerd van 80 % (2022) naar 43 % (2024) | MS Project · Spider Project · Primavera P6 (aflopend) | **Redelijk** — kerncijfers bevestigd; let op de valutakoppeling (koppel 6,4 mrd RUB níét aan $81 mln) |
| [Turkije](markten/markt-turkije.md) | **$7–16 mln**, midden ~$11 mln (heel ecosysteem) | Primavera P6 (geïmporteerd via buitenlandse opdrachtgevers) · MS Project · Excel | **Redelijk** — bottom-up met expliciete rekenstappen; prijzen bevestigd bij Microsoft zelf |
| [Israël](markten/markt-israel.md) | CPM-tools in enge zin **nauwelijks $10 mln** | Excel *(feitelijk marktleider bij mkb)* · MS Project · monday.com | **Zwak** — het totaal van $125–280 mln is uitdrukkelijk ingetrokken als kengetal; laag-1-schatting was ~2× te hoog |
| [Golfstaten (GCC)](markten/markt-golfstaten-gcc.md) | **~$45 mln** pure licenties (band $30–85 mln); daarnaast ~$370 mln training/claims-consultancy | Primavera P6 *(de facto de enige geaccepteerde valuta)* · MS Project · Aconex/ACC | **Matig** — vier beweringen gecorrigeerd, één teruggezet naar onbevestigd |
| [Egypte & Noord-Afrika](markten/markt-egypte-en-noord-afrika.md) | **$11–16 mln**, centraal ~$13 mln | Primavera P6 *(onbetwist)* · MS Project · Excel | **Zwak** — drie beweringen weerlegd, drie rekenkundig inconsistent, vier bevestigd |
| [Zuid-Afrika & Sub-Sahara](markten/markt-zuid-afrika-en-sub-sahara-afrika.md) | **US$ 45–75 mln** CPM/Gantt-licenties (incl. Egypte); ZA-kern $22–38 mln, waarvan mijnbouwplanning $6–20 mln | RIB Candy · Primavera P6 · MS Project / mijnplanningstools | **Matig** — 4 bevestigd, 4 gecorrigeerd, 2 onzeker; mijnbouwscheduling is de grootste onzekerheid |
| [India](markten/markt-india.md) | Som der segmenten **$39,4–125,6 mln**; **echte CPM-engine-licenties ≈ $8–30 mln** | Primavera P6 *(#1 professioneel)* · MS Project · Zoho / lokale bouw-ERP | **Matig** — de gepubliceerde totaalregel ($45–110 mln) is een onverdedigbare optelling; gebruik de segmentsom |
| [China](markten/markt-china.md) | **CNY 0,8–2,0 mrd (USD 110–280 mln)**, punt ≈ CNY 1,2 mrd | Glodon 斑马进度计划 (Zebra) · Primavera P6 *(alleen export/EPC)* · MS Project | **Redelijk** — na fact-check fors neerwaarts bijgesteld; één feitelijke fout over 梦龙 hersteld |
| [Japan](markten/markt-japan.md) | Planning/scheduling-deel **¥8–13,5 mrd (USD 50–83 mln)**; 建設DX-totaal ¥184,5 mrd (FY2023) | Lokale "tekenende" pakketten · Primavera P6 (plant/EPC) · MS Project | **Goed** — Yano-cijfers bevestigd; eigen schatting bij verificatie neerwaarts bijgesteld |
| [Zuid-Korea](markten/markt-zuid-korea.md) | **US$ 25–40 mln** licenties; **$70–130 mln** incl. PMIS, 4D en consultancy | Primavera P6 *(contracteis van buitenlandse opdrachtgevers)* · Excel · lokale PMIS | **Goed** — rekenkundig én extern bevestigd |
| [Hongkong & Taiwan](markten/markt-hongkong-en-taiwan.md) | HK **US$ 7–12 mln**; TW **US$ 18–45 mln** (incl. directe diensten) | Primavera P6 *(HK, via Scope-eisen)* · MS Project · Excel | **Goed** — primaire bron letterlijk bevestigd én kruisgecontroleerd |
| [Zuidoost-Azië](markten/markt-zuidoost-azie.md) | **US$ 43–110 mln** (ondergrens bij verificatie verlaagd van 60) | Primavera P6 *(contractueel voorgeschreven)* · MS Project · lokale pakketten/Excel | **Redelijk** — op het belangrijkste punt (Oracle) dubbel bevestigd |
| [Australië & Nieuw-Zeeland](markten/markt-australie-en-nieuw-zeeland.md) | Kernmarkt CPM-seats **A$18–30 mln (USD 13–21 mln)**; incl. project-controlsplatformen A$116–210 mln (USD 81–147 mln) | Primavera P6 · MS Project · Asta Powerproject | **Goed** — alle optellingen exact bevestigd; brede raming gecorrigeerd |
| [Brazilië](markten/markt-brazilie.md) | **USD 31–46 mln** (bouwdeel van de PM-softwaremarkt), excl. bouw-ERP | MS Project · Excel · Sienge (ERP, Softplan) | **Matig** — bronattributie gecorrigeerd |
| [Mexico](markten/markt-mexico.md) | LatAm PM-software **USD 550,6 mln (2023)** breed; Mexicaans planningsdeel niet apart afleidbaar | Opus (Ecosoft) · Neodata · MS Project / Primavera P6 | **Zwak** — 16 beweringen: 4 bevestigd, 8 gecorrigeerd (waarvan één ernstig), 4 onzeker |
| [Rest Latijns-Amerika](markten/markt-rest-latijns-amerika.md) *(CL, CO, PE, AR)* | **USD 150–190 mln** generiek PM, waarvan **USD 35–60 mln** echte Gantt/CPM | Primavera P6 *("excluyente" in mijnbouw en olie/gas)* · MS Project · S10 / SINCO | **Zwak** — 14 beweringen: 4 bevestigd, 8 gecorrigeerd, 2 onzeker |

**Wat opvalt in de rij.** De som van alle regionale schattingen komt lager uit dan onze wereldwijde triangulatie, ook als je de bandbreedtes maximaal oprekt. Dat is te verwachten — regionale bottom-ups missen structureel de wereldwijde raamcontracten, de concernlicenties die op één hoofdkantoor worden geboekt, en de sectoren die geen "bouw" zijn. Behandel de regionale cijfers als *ondergrenzen per markt*, niet als een partitie van het wereldtotaal.

---

## 4. Sectormarkten

| Sector | Omvang planning-/schedulingsoftware per jaar | Dominante software | Betalingsbereidheid |
|---|---|---|---|
| [Bouw & infrastructuur (algemeen)](sectoren/sector-bouw-en-infrastructuur-algemeen.md) | US$ 1,44 mrd (2025) → US$ 2,09 mrd (2029) *(externe raming)* | Primavera P6 · MS Project · Asta Powerproject | **Hoog** — de planning ís het contract, met eigen betalingsregime en sancties |
| [Woningbouw, ontwikkeling & kleine aannemers](sectoren/sector-woningbouw-projectontwikkeling-en-kleinere-aannemers.md) | Planningsdeel **~$660 mln** binnen een bouwsoftwaremarkt van $11,58 mrd (2026) | **Excel** *(marktleider, geen leverancier)* · Buildertrend · MS Project | **Laag in absolute zin, niet nul** — prijselastisch, seat-gedreven |
| [Energie, nutsbedrijven & nucleair](sectoren/sector-energie-nutsbedrijven-en-nucleair.md) | **$1,05–1,75 mrd**, midden ~$1,4 mrd (software + directe diensten) **[schatting, herzien]** | Primavera P6 · Safran · Hexagon EcoSys | **Zeer hoog** — hoogste per planner ter wereld, en tegelijk de meest verstarde softwarekeuze |
| [Olie & gas — turnarounds/shutdowns](sectoren/sector-olie-en-gas-turnarounds-en-shutdowns.md) | **~$300 mln** **[schatting]**; raffinage-uitgaven $30 mrd (2024) → ~$135 mrd (2026) | Primavera P6 *(XER als de facto uitwisseling)* · Prometheus/IAMTech · Safran | **Hoog tot zeer hoog** — één bespaarde outagedag betaalt jaren licentie |
| [Aerospace & defensie](sectoren/sector-aerospace-en-defensie.md) | **$0,1 – 1,0 mrd** licenties **[schatting, band te breed om op te sturen]** | Deltek Open Plan / Acumen Fuse · MS Project · Primavera P6 | **Extreem hoog, maar volledig compliance-gedreven** — EVMS/DCMA bepaalt de keuze, niet de gebruiker |
| [Industriële EPC & procesindustrie](sectoren/sector-industriele-epc-en-procesindustrie.md) | Niet apart afleidbaar; onderliggende EPC-markt $864–936 mrd (2025) | Primavera P6 · Hexagon EcoSys · Safran / InEight | **Hoog** — vertragingskosten domineren elke licentiediscussie |
| [Spoor, tunnels & lineaire infra](sectoren/sector-spoor-tunnels-en-lineaire-infrastructuur.md) | **USD 90–250 mln**, midden ~$150–170 mln; TILOS-niche $6–15 mln | Primavera P6 · Trimble TILOS *(EOM 1-3-2026)* · Asta Powerproject | **Hoog, prijsgevoeligheid laag** — maar uitsluitend voor contractueel *toegelaten* tools |
| [Mijnbouw & grondstoffen](sectoren/sector-mijnbouw-en-grondstoffen.md) | **USD 250 mln (2025)** mijnplanning/-scheduling | Deswik · Minemax/MineSched · Primavera P6 | **Hoog** — geclaimde NPV-uplift van 5–15 % rechtvaardigt elk licentiebedrag |
| [Scheepsbouw & offshore](sectoren/sector-scheepsbouw-en-offshore.md) | **~USD 195 mln** licenties **[schatting]** | Primavera P6 *(XER als uitwisselingstaal)* · Safran · werfeigen systemen | **Hoog tot zeer hoog** — LD-clausules in de orde van tienduizenden tot miljoenen per dag |
| [Overheid & publieke opdrachtgevers](sectoren/sector-overheid-en-publieke-opdrachtgevers.md) | **$0,15 – 0,8 mrd**, centraal ~$0,4 mrd **[schatting]** | Primavera P6 EPPM · MS Project · lokale PMIS | **Hoog** — governance-gedreven; desktoptools halen het hier niet |
| [Farma, biotech & R&D](sectoren/sector-farma-biotech-en-r-d.md) | Per klant €0,3–3 mln/jaar all-in; Planisware alleen al €198,0 mln omzet FY2025 | **Planisware** · Sciforma · MS Project | **Hoogste per planner van de hele markt** — hoger dan defensie en olie & gas |
| [IT, software & telecom](sectoren/sector-it-software-en-telecom.md) | **~USD 2,46 mrd** (35,60 % van de PPM-markt 2025 — grootste verticaal) | Jira/Atlassian · Broadcom Clarity · MS Project / monday.com | **Laag voor pure planningstools** — planning is hier niet het pijnpunt |
| [Onderhoud, asset management & MRO](sectoren/sector-onderhoud-asset-management-en-mro.md) | MRO-softwaremarkt $8,0 mrd (2025), maar grotendeels overlappend met andere tellingen | Primavera P6 · Prometheus Group · SAP PM | **Zeer hoog in het geplande-stilstandregime**, laag daarbuiten |
| [Aangrenzend: APS & personeelsroostering](sectoren/sector-aangrenzende-segmenten-productieplanning-aps-en-personeelsroostering.md) | Enterprise SCP-suites $0,5–5 mln/klant/jaar; UKG Pro WFM $6,5–8,9 mln/jaar bij 10.000 medewerkers | Kinaxis · o9 · Blue Yonder / UKG | **Zeer hoog, maar andere markt** — geen CPM, geen projectlogica |

**Let op de dubbeltellingen.** De sectorcijfers hierboven zijn niet optelbaar tot een wereldtotaal. Energie, olie & gas, EPC en MRO overlappen elkaar substantieel (dezelfde P6-seats bij dezelfde aannemer, anders gerubriceerd), en het MRO-rapport waarschuwt daar expliciet voor: "de MRO-softwaremarkt van $8,0 mrd en de luchtvaart-MRO-softwaremarkt van $7,7 mrd zijn vrijwel zeker grotendeels dezelfde omzet".

---

## 5. Softwarevergelijking

Prijzen zijn genormaliseerd naar **USD per gebruiker per jaar**, met perpetual licenties geamortiseerd over vijf jaar. Bron- en hardheidsclassificatie per bedrag staat in [thema-prijsbenchmark-en-licentiemodellen.md](dwarsdoorsnede/thema-prijsbenchmark-en-licentiemodellen.md).

### 5.1 Echte CPM-planners

| Pakket | Leverancier | Prijs/gebruiker/jaar | Kernvoordelen | Kernnadelen |
|---|---|---|---|---|
| [Primavera P6](profielen/software-oracle-primavera-p6.md) | Oracle | **$1.050** (Prof., perpetual + 22 %) · **$1.155** (EPPM) · **$1.500** cloud (min. 25 seats) | De facto standaard met contractuele acceptatie · Volwassen, fijnmazig instelbare CPM-engine · Uurgebaseerd kalendermodel per entiteit | Kostenstructuur (22 %-support, alleen-omhoog-clausules) · Steile leercurve · Verouderde, versplinterde UI |
| [Primavera Cloud (OPC)](profielen/software-oracle-primavera-cloud.md) | Oracle | ~$1.800–2.746 (aanbestedingsband) | P6-gelijkwaardige CPM-engine, geverifieerd · Kalendermodel op punten béter dan P6 · Monte Carlo in de doos | Migratie vanaf P6 verliest aantoonbaar data (Oracle documenteert het zelf) · Expenses-gat breekt kostgeladen schema's · Geen levelling tijdens schedulen |
| [Microsoft Project](profielen/software-microsoft-project.md) | Microsoft | **$226** (Prof. 2024 perpetual, 5 jr) · **$360** Plan 3 · **$660** Plan 5 | Volwassen CPM-engine met hoge theoretische limieten · Verreweg de grootste pool geschoolde gebruikers · Diepe M365-integratie | Cloudlijn wordt afgebroken, klanten moeten binnen twee maanden weg · Webopvolger is functioneel een grote stap terug · On-prem opvolger krijgt geen ontwikkeling meer |
| [Asta Powerproject](profielen/software-elecosoft-asta-powerproject.md) | Elecosoft (Eleco plc) | **$977–1.447** named · **$2.200** concurrent · **$2.218** incl. BIM | Echt bouwspecifieke planningssemantiek · Meest configureerbare CPM-engine van de drie groten · Kalenders per taak, zichtbaar op de balk | Prestatieproblemen bij grote programma's (door leverancier gedocumenteerd) · Geen portfolio-/capital-planninglaag · Geen API in het standaardproduct |
| [Safran Project](profielen/software-safran-project.md) | Safran Software Solutions | **schatting $1.500–3.000** (quote-only) | Alles-in-één project-controlsstack zonder toolketen · Ingebouwde scope-/wijzigingsregistratie · Serieuze, snelle risico-engine | Verouderde codebase en UI · Windows-desktop-only; geen echte SaaS · Zware infrastructuurvoetafdruk |
| [Deltek Open Plan / Acumen Fuse](profielen/software-deltek-open-plan-en-acumen-fuse.md) | Deltek (Roper) | **schatting $1.800–4.800** (quote-only) | Diepste schedule-kwaliteitsmotor op de markt (600+ metrics, DCMA/DECM/NASA/GAO) · De facto standaard in de Amerikaanse defensie-EVMS-keten · Leveranciersagnostisch over P6, MSP en meer | Volstrekt ondoorzichtige prijsstelling, geen proefversie · Windows-only fat client, geen webversie · Verouderde stack (.NET Framework 4.8, SQL Server 2012-providers) |
| [Spider Project](profielen/software-spider-project.md) | Spider Project Team | **$160** (Lite) · **$340** (Desktop) · **$450–900** (Plus/Professional) | Resource Critical Path is standaard, geen add-on · Duur wordt afgeleid uit hoeveelheid × productiviteit · Rijkste resourcemodel op de markt | Geopolitiek en leveranciersrisico · Steile leercurve en piepkleine arbeidsmarkt · Windows-only, geen geloofwaardig cloudverhaal |
| [Phoenix Project Manager](profielen/software-phoenix-project-manager.md) | Phoenix CPM | **$160** ($799 perpetual, 5 jr) | Goedkoopste echte CPM-desktop · Nul deploymentkosten · Storepoints: onbeperkte baselines in één bestand | Geen resource levelling (officieel bevestigd) · Alleen dagplanning, geen uren · Geen risicoanalyse/Monte Carlo |
| [Project Plan 365](profielen/software-project-plan-365.md) | Housatonic Software | ~$180–430 (per tier) | Echte CPM/PDM-engine met gepubliceerd algoritme · Native .mpp lezen én schrijven · Eén seat over vijf platformen, incl. macOS | Stabiliteit en dataverlies zijn het ernstigste reviewpatroon · Prestatieklachten · Licentie-/facturatieproblemen structureel |
| [Sciforma](profielen/software-sciforma.md) | Sciforma (Octave) | quote-only | Echte netwerkplanningsmotor · Volwaardige Critical Chain (CCPM) — zeldzaam · Resourcemodel dat een echte PMO aankan | Het merk is dood en de roadmap onzeker · Clunky UI met stevige leercurve · Traagheid, ook bij kleine datasets |
| [Planisware](profielen/software-planisware.md) | Planisware SA (Euronext: PLNW) | quote-only (€0,3–3 mln/klant/jaar) | Echte netwerkplanning, geen pseudo-Gantt · Eén datamodel voor planning, resources, kosten en portfolio · Portfolio-optimalisatie op wetenschappelijk niveau | Ondoorzichtige en hoge prijs · Implementatie is een programma, geen installatie · Steile leercurve |
| [Broadcom Clarity](profielen/software-broadcom-clarity.md) | Broadcom | quote-only | Echte CPM-engine, geen nep-Gantt · Resource-/capaciteitsmanagement op portfolioniveau in de topklasse · Financieel model dieper dan planningstools | UI is het structureel meest genoemde probleem · Prijs breed als te hoog ervaren; verlengingen zijn een risico · Zware implementatie |
| [SAP PS / PPM](profielen/software-sap-project-system-en-sap-portfolio-and-project-management.md) | SAP | onderdeel van S/4HANA-licentie | Echte complete CPM-engine · Eén waarheid voor auditors en revenue recognition · Volwaardige EVM met versies als baseline | Zwakke planningsergonomie (SAP documenteert het zelf) · Schaalbaarheidsantwoord voor grote projecten geschrapt in S/4HANA · Klassieke PS-grafiek in compatibility scope |
| [InEight Schedule](profielen/software-ineight-schedule.md) | InEight (Kiewit) | vanaf ~$1.800 (Schedule NOW) | Volwaardige kwantitatieve risicoanalyse ingebouwd · Collaborative-markup-workflow, functioneel uniek · Bewezen op megaprojecten (80.000+ activiteiten) | Support scoort structureel het laagst van alle dimensies · Prijs sluit de mid-market uit · Implementatie duurt maanden |
| [Hexagon EcoSys](profielen/software-hexagon-ecosys.md) | Hexagon | quote-only, enterprise | Kostenbeheersing op cost-engineeringniveau · Echte cost/schedule-integratie op portfolioniveau · Bewezen op megaprojectschaal (Bechtel, Dow, Jacobs, BHP) | Steile leercurve en niet-intuïtieve interface (ease-of-use 3,4/5) · Verouderde UI · Rapportage aanpassen vereist specialisten |

### 5.2 4D/BIM en locatiegebaseerd

| Pakket | Leverancier | Prijs/gebruiker/jaar | Kernvoordelen | Kernnadelen |
|---|---|---|---|---|
| [Bentley SYNCHRO](profielen/software-bentley-synchro.md) | Bentley Systems | **$1.394** (Control) · **$4.642–4.980** (4D) · $29k–806k per project | Een echte CPM-engine, geen visualisatielaag · Onbeperkte baselines en scenario's met side-by-side vergelijking · Sterkste schemakoppeling van de geteste 4D-tools | Prijs, vooral voor kleinere partijen · Zware leercurve · Gedateerde, overvolle interface |
| [Navisworks TimeLiner](profielen/software-autodesk-navisworks-timeliner.md) | Autodesk | inbegrepen in AEC Collection | Onovertroffen modelaggregatie · 4D economisch gratis voor AEC-Collection-bezitters · Levende koppeling met de planningsbron | Er zit geen planningsengine onder · Geen kalender · Lokale bewerkingen worden bij elke refresh weggegooid |
| [Trimble TILOS](profielen/software-trimble-tilos.md) | Trimble | **schatting $800–1.600** (quote-only) | Plaats is een eersteklas datamodel, geen plaatje · Eén blad in plaats van veertig pagina's balkenschema · Lineair-specifieke rekenlogica | **End of Maintenance per 1 maart 2026** — dit overschaduwt alles · Verouderde UI · Steile leercurve met schrale leermiddelen |
| [Trimble Vico Office](profielen/software-trimble-vico-office.md) | Trimble | niet meer verkrijgbaar | Duur wordt berekend (hoeveelheid × productiviteit), niet geraden · Echte locatiegebaseerde planning met flowline als rekenmodel · 4D ontstaat gratis uit de takeoff | **Het product is dood** (verkoop 2023 gestopt, support 30-6-2024) · Geen opvolger aangeboden · Zware, verouderde client-serverstack; databasefragiliteit |
| [BEXEL Manager](profielen/software-bexel-manager.md) | BEXEL Consulting | quote-only | Echte automatische WBS- en schemageneratie uit het BIM-model · Volwaardige CPM-netwerkengine, geen animatieschil · Meerdere planningsparadigma's in één tool | Onafhankelijke reviewbasis vrijwel afwezig — zelf een risicosignaal · Uitsluitend Windows · Beoordeeld als inflexibel bij complexe logica |
| [RIB iTWO](profielen/software-rib-itwo.md) | RIB Software (Schneider) | quote-only | Echte 5D-integratie, niet gebolt-on · Sterke calculatiefunctionaliteit · Weg-Tijd-diagram standaard | Slechtste deelscore is prijs-kwaliteit (2,9/5) · Verouderde interface · Structurele performanceproblemen bij grote projecten |

### 5.3 Bouwplatformen, uitvoering en specialisten

| Pakket | Leverancier | Prijs/gebruiker/jaar | Kernvoordelen | Kernnadelen |
|---|---|---|---|---|
| [Procore](profielen/software-procore.md) | Procore Technologies | ACV-model, onbeperkt gebruikers | Onbeperkt aantal gebruikers is een structureel voordeel · Breedste import-ondersteuning voor planningsbestanden · Echte koppeling planning ↔ uitvoeringsdata | ACV-prijsmodel straft groei en verbiedt krimp · Geen aantoonbare CPM-engine — diskwalificerend voor contractueel planwerk · Geen export naar XER/MPP/XML: data-lock-in |
| [Autodesk Build / ACC](profielen/software-autodesk-build-en-autodesk-construction-cloud.md) | Autodesk | per-project/per-user, quote | Ongeëvenaarde koppeling ontwerp-BIM ↔ uitvoering · Eén samenhangende CDE met sterk documentbeheer · Ontsluit de planning voor wie nooit P6 opent | Geen planning-engine — dit is geen planningssoftware · Kritiekpadmarkering wordt geïmporteerd, niet berekend, en gaat aantoonbaar mis · Eenrichtingsverkeer, geen round-trip |
| [RIB Candy](profielen/software-rib-candy.md) | RIB Software | quote-only | Werkelijke geld-tijd-integratie · First-principles calculatie met auditspoor · Aantoonbaar hoge gebruikerswaardering | Win32-architectuur zonder database · Geen echte cloud- of webversie · Steile leercurve met kosten buiten de licentie |
| [Glodon (Zebra)](profielen/software-glodon.md) | Glodon 广联达 | escalerende jaarabonnementen | Onaantastbare marktpositie in China met netwerkeffecten · Lokalisatiediepte die geen westerse leverancier evenaart · Zebra is een volwaardige, gratis netwerkplanner | Monopolieprijsstelling met hard escalerende jaarkosten · Door een overheidsinstantie aangetoonde rekenfouten in de kernsoftware · Productdiscontinuïteit (BIM5D uitgezet) |
| [Buildertrend](profielen/software-buildertrend.md) | Buildertrend | quote (volumegebaseerd sinds 2026) | Echt end-to-end voor woningbouw-MKB · Support is aantoonbaar het sterkste onderdeel · Volwassenheid en netwerkeffect | Geen echte netwerkplanning-engine · Prijsintransparantie sinds 2026 · Forse prijsstijgingen bij verlenging, herhaaldelijk gerapporteerd |
| [Sablono](profielen/software-sablono.md) | Sablono GmbH | quote-only | Activiteit-op-object-model past werkelijk bij repetitief werk · Trade-to-trade-overdracht geautomatiseerd · Onbetwistbare audit trail voor voortgang én kwaliteit | Baselinedatums niet te wijzigen · Slecht bestand tegen wijzigingen op de bouwplaats · Look-ahead werkt aantoonbaar niet goed voor verdiepingsgewijze woningbouw |
| [ALICE Technologies](profielen/software-alice-technologies.md) | ALICE Technologies | quote-only, megaprojectklasse | Onafhankelijk verifieerbare resultaten op echte megaprojecten · Extreem korte doorlooptijd voor "wat als"-vragen · Ingebouwde DCMA 14-point analyse bij elke run | Kosten structureel prohibitief buiten de megaprojectklasse · Volledig ondoorzichtige prijsstelling, geen proefversie · De inputvereiste is de achilleshiel |
| [nPlan](profielen/software-nplan.md) | nPlan Ltd | quote-only | Elimineert subjectieve QSRA-inputs · Frequentie in plaats van momentopname · Realistische, niet-parametrische verdelingsvormen | Volstrekt gesloten prijsstelling · Geen resources, geen kosten — dus geen volledige projectbeheersing · Substantiële uitsluitingen vertekenen de forecast systematisch |
| [Nodes & Links](profielen/software-nodes-links.md) | Nodes & Links | quote-only | Schema-QA van uren naar minuten, grotere checkbibliotheek dan de standaard · QSRA op schaal zonder aparte desktoptool · Portfolio-gekalibreerde forecasting | Volstrekt ondoorzichtige prijsstelling · Het is geen planningstool — kosten zijn additief · Documentatie volledig achter een login |
| [Primavera Risk Analysis](profielen/software-oracle-primavera-risk-analysis.md) | Oracle | $9.500 + $2.090/jaar (2016-lijst) | Methodologisch nog steeds diep · Volledig geïntegreerde kosten- én schemarisicoanalyse · Eigen, volwaardige CPM-engine | Het product is dood, Oracle zegt het alleen niet hardop · Prijs staat in geen verhouding tot wat je krijgt · Harde schaalgrens met erkende, nooit opgeloste bug |

### 5.4 Work management met Gantt (geen CPM)

Deze categorie wordt in de meeste marktrapporten meegeteld als "projectmanagementsoftware" en verklaart daarmee zowel het niveau als de CAGR van de hoge ramingen. Geen van deze pakketten heeft een volwaardige kritieke-padberekening met kalenders, float en resource-levelling.

| Pakket | Leverancier | Prijs/gebruiker/jaar | Kernvoordelen | Kernnadelen |
|---|---|---|---|---|
| [Smartsheet](profielen/software-smartsheet.md) | Smartsheet Inc. | **$108** (Pro) · **$228** (Business) | Laagste adoptiedrempel van alle Gantt-dragende tools · Onbeperkte gratis Contributors en Guests · Vier relatietypen met lag én lead | Geen echte CPM-engine — balkenschema met datum-solver · Geen constraints, geen deadlines · Geen afhankelijkheden over sheets heen |
| [monday.com](profielen/software-monday-com.md) | monday.com Ltd | **$108** (Basic) · **$144** (Standard) · **$228** (Pro) | Uitzonderlijk lage adoptiedrempel · Zeer sterke no-code automatiseringsmotor · Volwassen GraphQL-API | Geen echte CPM-engine — het fundament ontbreekt · Geen kalendermodel · Geen lag/lead op relaties |
| [Wrike](profielen/software-wrike.md) | Wrike (Symphony/Vista) | **$120** (Team) · **$300** (Business) | Alle vier afhankelijkheidstypen plus lead/lag · Kritiek pad mét total én free float, correct onderscheiden · Rapporteerbare baselinevelden | Meervoudige afhankelijkheden worden aantoonbaar fout samengevoegd · Kritiek pad door gebruikers als onbetrouwbaar gerapporteerd · Herplanningsengine doet niet wat planners verwachten |
| [Zoho Projects](profielen/software-zoho-projects.md) | Zoho Corp | **~$48–168** | Extreem lage prijs voor de geleverde planningsdiepte · Alle vier relatietypen plus lag · Serieuze baseline met End Variance en Slippage | Geen constraint-model · Geen resource levelling of effort-driven scheduling · Prestatieproblemen bij groei, structureel |
| [Asana](profielen/software-asana.md) | Asana Inc. | ~$131–305 | Uitzonderlijk lage adoptiedrempel, hoge tevredenheid · Vier afhankelijkheidstypen sinds medio 2024 · Sterke portfoliolaag met doorrekening naar strategie | Het "kritieke pad" is aantoonbaar onjuist · Geen duur-gedreven planning: datums zijn invoer, niet uitvoer · Geen lag/lead (door Asana zelf bevestigd) |
| [ClickUp](profielen/software-clickup.md) | ClickUp | ~$84–228 | Ongeëvenaarde functionele breedte voor de prijs · Meerdere views op dezelfde dataset · Bruikbare gratis tier | Geen echte CPM-engine · Geen constraints, levelling, kostenmodel of EVM · Eén werkdagenmodel in plaats van kalenders |
| [Jira + Advanced Roadmaps / BigPicture / Structure.Gantt](profielen/software-atlassian-jira-met-advanced-roadmaps-bigpicture-en-structure-gantt.md) | Atlassian + partners | vanaf ~$100 | Eén bron van waarheid met het uitvoerende werk · Nul adoptiedrempel waar Jira al draait · Uitstekende prijs-prestatie bij kleine teams | Er is geen echte CPM-engine — nergens in de stack · Advanced Roadmaps kent alleen FS en geen lag · BigPicture berekent kritiek pad zonder niet-werkdagen |
| [TeamGantt](profielen/software-teamgantt.md) | TeamGantt | ~$118–290 | Volledige set afhankelijkheidstypen mét lag/lead in een goedkope tool · Aantoonbaar hoge waardering op bruikbaarheid en support · Kritiek pad én meerdere baselinesets aanwezig | Het kritieke pad is een kleur, geen berekening — geen float-waarden · Geen levelling, bezetting of resource-kalenders · Harde taaklimieten sluiten bouwschema's uit |
| [GanttPRO](profielen/software-ganttpro.md) | XB Software | ~$110–240 | Er zit een echte netwerkkern onder · Uitzonderlijk lage leerdrempel voor een planningstool · Volwaardig kalendermodel incl. resource-kalenders | Geen float/slack, geen constraint-typen — dus geen volwaardige CPM · Kritiek pad en baseline moeten uit voor snelheid · Prestatieproblemen bij grote schema's |
| [LiquidPlanner](profielen/software-liquidplanner.md) | LiquidPlanner | ~$180–420 | Echt probabilistisch, niet cosmetisch · Herplannen kost niets · Automatische multi-project resource levelling | Geen kritiek pad, geen float, geen echte CPM · Alleen Finish-to-Start · Lag is armetierig |

### 5.5 Open source en gratis

| Pakket | Leverancier | Prijs/gebruiker/jaar | Kernvoordelen | Kernnadelen |
|---|---|---|---|---|
| [OpenProject](profielen/software-openproject.md) | OpenProject GmbH | **$0** (Community) · **$79–211** (Enterprise, min. 25 resp. 100 users) | Echte volledige open source onder GPLv3, geen open-core-schijnvertoning · Datasoevereiniteit en publieke-sectorgeloofwaardigheid van het hoogste niveau · Volwassen REST-API (HAL+JSON, OAuth 2.0, SCIM) en werkelijke BCF/IFC-viewer | **Geen CPM-engine, geen kritiek pad, geen float** · Alleen Finish-to-Start · Eén werkdagenkalender voor de hele installatie; resourcemanagement bestaat officieel niet |
| [ProjectLibre](profielen/software-projectlibre.md) | ProjectLibre Inc. | **$0** (desktop) · **$120** (Cloud, min. 3) | Een échte CPM-netwerkplanner, geen balkenschema-tekenaar · Volledig gratis zonder functionele afknijping · Open source onder CPAL 1.0 | Desktopontwikkeling ligt praktisch stil · "Open source" in naam, gesloten in praktijk · macOS op Apple Silicon al ruim een jaar kapot |
| [GanttProject](profielen/software-ganttproject.md) | GanttProject-team | **$0** | Werkelijk gratis en werkelijk vrij, zonder addertjes · Echte deterministische scheduler met kritiek pad · Local-first, offline, geen account, geen telemetrie | Geen sub-dag-planning · Geen resource levelling in enige vorm · Resourcevakanties zijn puur cosmetisch — een verborgen, gevaarlijke valkuil |

---

## 6. Dwarsanalyse

### 6.1 Wie domineert waar, en waarom

**Primavera P6 is niet marktleider maar toelatingsvoorwaarde.** In de GCC formuleert het deelrapport het scherpst: P6 is "de facto de enige geaccepteerde valuta". Dat patroon herhaalt zich in de VS (federaal en DOT-werk), Hongkong (Scope-eisen op civiele contracten), Zuid-Korea (opgelegd door buitenlandse opdrachtgevers), Latijns-Amerika (in vacatures letterlijk "excluyente"), Zuidoost-Azië, Egypte, India, Australië en de Nederlandse infra. Waar P6 wint, wint het via het contract, niet via de functionaliteit.

**Microsoft Project wint waar de planning géén contractueel document is.** Het middensegment, de ingenieurs- en adviesbureaus, het mkb en alles buiten de bouw. In Rusland is MS Project met 43 % nog steeds marktleider ondanks een halvering sinds 2022; in Polen wint het via contractdwang op EU-gefinancierde projecten; in Frankrijk domineert het bij OPC-bureaus en maîtrise d'œuvre.

**Excel is in meer markten de facto marktleider dan enig softwarepakket.** Israël (kleine en middelgrote aannemers), Duitsland (54 % van het mkb gebruikt niets anders), Zuid-Korea, Turkije, Taiwan, en het hele woningbouwsegment wereldwijd. Het sectorrapport woningbouw stelt het onomwonden: "Excel is de marktleider, niet een leverancier".

**Lokale kampioenen winnen waar taal, norm en calculatie samenvallen.** Glodon Zebra in China, ACCA PriMus-K in Italië, Opus (Ecosoft) en Neodata in Mexico, RIB Candy in Zuid-Afrika, Sienge in Brazilië, S10 in Peru en SINCO in Colombia, Asta Powerproject in het VK, Safran in Noorwegen, Spider Project in Rusland, KYP Project in Nederland. Het gemeenschappelijke kenmerk: ze koppelen planning aan de lokale calculatie-, bestek- of aanbestedingspraktijk. Dat is een moat die geen internationale leverancier kan kopiëren zonder de lokale norm over te nemen.

### 6.2 Prijspatronen

**De ladder.** De markt kent geen prijscontinuüm maar duidelijke treden:

```
$0        open source (Open Planner Studio, OpenProject Community, ProjectLibre)
$48–170   instap-SaaS + de goedkoopste echte CPM-desktops (Phoenix $160, Spider Lite $160)
$210–360  midden-SaaS (Smartsheet Business, monday Pro $228) + MS Project Prof. perpetual
$450–900  Spider Desktop Plus/Professional · MS Project Plan 5 ($660)
$980–1500 Asta Powerproject · Primavera P6 Prof./EPPM ($1.050/$1.155) · SYNCHRO Control
          · P6 EPPM Cloud ($1.500, met 25-seat-vloer)
$1800–2800 Oracle Prime · Powerproject concurrent · Primavera Cloud (bovenkant)
$4600–5000 Bentley SYNCHRO 4D ($4.980)
$29k–806k  SYNCHRO project-abonnementen, per project per jaar (tier 1 t/m 9)
```

De factor tussen het goedkoopste betaalde volwaardige CPM-pakket (Phoenix, $160) en het duurste per-planner-pakket (SYNCHRO 4D, $4.980) is **31×**. Ten opzichte van gratis is de factor oneindig — en toch verkopen alle treden.

**Oracle's 22 %-onderhoudsformule is geen onderhandelingsvariabele.** Op de eigen prijslijst klopt het tot op de cent, over de hele productlijn: P6 EPPM $2.750/$605, P6 Professional $2.500/$550, Progress Reporter $950/$209, Unifier Project Controls $3.950/$869 — alle exact 22,000 %. Drie contractclausules maken die 22 % in de praktijk tot een tarief dat alleen omhoog kan: *Matching Service Levels* (je kunt geen deelverzameling van licenties ondersteunen), *Pricing Following Reduction* (afschalen verlaagt de rekening niet evenredig), en *Reinstatement* (support laten vervallen en terugkomen kost 150 % plus alle overgeslagen jaren). Oracle's termijnlicentiemodel is bovendien zó geprijsd dat het nooit goedkoper is: 1 jaar = 20 % van de perpetual prijs, maar de support blijft 22 % van de *volle* perpetual lijstprijs.

**De 25-seat-drempel is de grootste verborgen kostenpost.** Primavera P6 EPPM Cloud kent een minimum van 25 hosted named users à $125/maand: **$37.500 per jaar voordat er één planner iets doet**. Hetzelfde minimum geldt voor Unifier Project Controls ($45.000/jaar), Prime Projects ($45.000/jaar), Prime Portfolios ($37.500/jaar) en Analytics ($27.000/jaar). Dit is niet uniek voor Oracle: OpenProject Premium heeft een minimum van 100 gebruikers (€19.140/jaar), OpenProject Enterprise een minimum van 25, ProjectLibre Cloud van 3. De drempel bepaalt in de praktijk wie überhaupt kán kopen — een aannemer met vier planners wordt niet duur bediend, hij wordt niet bediend.

**Floating kost ongeveer 1,7× een named user.** Het enige publiek naast elkaar staande paar: Powerproject single user $1.320/jaar tegen concurrent $2.200/jaar. Break-even bij ~60 % gelijktijdig gebruik.

**Prijsstijgingen versnellen.** Microsoft verhoogde per 1 maart 2022 Office 365 E1 met 25 % en E3 met 15 % en voegde per 1 april 2025 een premie van 5 % toe op maandbetaling van jaarcontracten. Oracle publiceert sinds november 2016 geen Primavera-prijslijst meer — het feit dát de laatste openbare lijst tien jaar oud is, is zelf een bevinding.

**De duurste helft van de markt publiceert geen prijzen.** Direct geverifieerd op de leverancierspagina's van Oracle Primavera Cloud, Trimble TILOS, Deltek Acumen, Safran, ALICE, nPlan, Nodes & Links, InEight, Planisware, Broadcom Clarity, BEXEL en Sablono. Waar wij toch een bedrag noemen is dat een **[schatting]** met expliciete redenering.

### 6.3 Lock-in via aanbestedingseisen

Zes mechanismen, in oplopende hardheid:

1. **Formaatmandaat** — het contract eist een specifiek bestandsformaat (`.xer`, P6 XML/PMXML, SDEF). *Oplosbaar met een converter.*
2. **Instellingsmandaat** — het contract schrijft *productinstellingen* voor die alleen binnen één product bestaan. UFGS 01 32 01.00 10 §3.12 draagt letterlijk de kop "PRIMAVERA P6 MANDATORY REQUIREMENTS" en maakt P6-enums (`Fixed Duration & Units`, `Longest Path`, `Retained Logic`, activiteitcodes op *Project*- in plaats van *EPS*-niveau) tot contracttekst. *Niet oplosbaar met een converter.*
3. **Auditortoolmandaat** — de toetsende instantie draait haar eigen analysetool op jouw bestand. DCMA publiceerde per softwareproduct een aparte assessmentgids (MS Project EVC-101, Deltek Open Plan EVC-102, Primavera EVC-103). Wie buiten dat rijtje valt is de facto niet-toetsbaar.
4. **Personeelsmandaat** — UFGS eist een planner die "at least three previous construction schedules ... using Primavera P6" heeft gemaakt. De eis geldt de mens, niet de software.
5. **Commercialiteitsmandaat** — het scherpste obstakel voor open source. UFGS §2.1.2: software moet "commercially available from the software vendor for purchase with **vendor software support agreements available**" zijn, en de SDEF-exportroutine moet "created and supported by the software manufacturer" zijn. Een project zonder commerciële supportentiteit is formeel niet inzetbaar.
6. **Betalingskoppeling** — NEC clause 50.3 (NEC3) / 50.5 (NEC4): ontbreekt een programma in de Contract Data, dan wordt **een kwart van de Price for Work Done to Date ingehouden** tot de aannemer een eerste programma ter acceptatie heeft ingediend.

Het onderwijskanaal versterkt dit alles: certificeringen, curricula en resellernetwerken zijn productgebonden, waardoor de arbeidsmarkt zelf een lock-in-laag wordt. In Turkije en Latijns-Amerika is de P6-dominantie aantoonbaar *geïmporteerd* via buitenlandse opdrachtgevers en vervolgens in de lokale arbeidsmarkt vastgezet.

Tegenover deze zes staan twee openingen. Binnen het USACE-*bouw*regime is **SDEF** een verplicht, publiek gedocumenteerd, non-proprietair uitwisselingsformaat, expliciet bedoeld als route waarlangs een "in-house program" schedule-data mag aanleveren. En voor DoD-EVMS-contracten schrijft de **IPMDAR Schedule Performance Dataset** (DID DI-MGMT-81861D, 12 maart 2026) JSON voor. Beide deuren zijn smal: de NAVFAC-tegenhanger UFGS 01 32 17.00 20 noemt SDEF nul keer en verklaart importeren in P6 "using data conversion techniques or third party software" tot *grond voor afkeuring*.

### 6.4 De gaten in de markt

1. **Echte CPM onder de $500 per planner per jaar, met moderne UI en cloud.** Tussen Phoenix ($160, geen levelling, geen uren, geen risico) en Powerproject/P6 (~$1.000+) zit vrijwel niets. Spider Project bezet het gat functioneel maar draagt geopolitiek risico en een Windows-only UI.
2. **Kleine organisaties onder de seat-drempels.** De 25-seat-vloer van Oracle en de 100-user-vloer van OpenProject Premium sluiten structureel iedereen uit met minder dan een handvol planners — precies de meerderheid van de bouwbedrijven wereldwijd. Taiwan is hier het extreemste voorbeeld: gemiddeld NT$44 mln kapitaal per firma, "te klein voor een P6-seat".
3. **Meerkalenderplanning in het middensegment.** De SCDOT-specificatie eist projectspecifieke kalenders inclusief een verplichte 7-daagse kalender voor uithardings- en zettingsperioden naast een 5-daagse werkkalender. MS Project gebruikt "a single duration factor for all calendars" en struikelt daar structureel; P6 en Powerproject niet. Vrijwel geen goedkopere tool heeft een echt kalendermodel.
4. **4D/IFC-planning.** OpenProject BIM levert IFC-viewer + BCF maar géén 4D-koppeling van model aan planning. Bonsai's scheduling-documentatie draagt letterlijk de melding "🚧 Work in Progress – This page is incomplete". `IfcTaskTime` draagt de volledige CPM-payload, maar geen gecertificeerd uitwisselingsscenario dekt planning.
5. **Locatiegebaseerde/lineaire planning na TILOS.** TILOS bereikt End of Maintenance op 1 maart 2026 en Vico Office is al dood. Het sectorrapport spoor/tunnels stelt vast: "de marktleider in die niche wordt vervangen — niet opgeheven". Er staat geen opvolger klaar.
6. **Niet-Engelstalige, niet-Amerikaanse normconformiteit.** Elke markt met eigen bestek-, calculatie- en oplevernormen (Japan, Korea, Italië, Mexico, Polen) wordt bediend door lokale pakketten zonder CPM-diepte, of door internationale pakketten zonder lokale norm. Niemand doet beide.

---

## 7. Groeipotentieel voor Open Planner Studio

Dit hoofdstuk rangschikt alle 26 geografische markten en 14 sectoren op kansrijkheid voor
een open source, IFC-natieve planner met een echte CPM-solver.

**De vijf criteria.** Per markt/sector is gewogen:

1. **Prijsgevoeligheid en de onbediende onderkant.** Waar Excel de facto marktleider is, of
   waar informele licenties structureel voorkomen, is er een grote groep die *wel* wil
   plannen maar niet kán betalen. Dat is vraag, geen afwezigheid van vraag.
2. **Contractdwang.** Waar een aanbesteding P6, XER-levering of P6-*instellingen* voorschrijft,
   is functionaliteit irrelevant. Verplichte P6 = barrière, dus lage score.
3. **BIM-/IFC-volwassenheid en overheidsmandaten.** Dit is het onderscheidende punt van het
   product; zonder IFC-adoptie is het geen argument.
4. **Gesloten lokaal ecosysteem.** Een dominant lokaal platform met eigen formaten, taal en
   normen (China, Rusland) is vrijwel niet te penetreren, ongeacht productkwaliteit.
5. **De commerciële prijsdrempel.** Waar de gemiddelde organisatie onder de 25-seat-vloer van
   P6 Cloud ($37.500/jaar voordat er iemand iets doet) of onder een vergelijkbaar minimum
   valt, wordt zij nu niet duur bediend maar *niet* bediend.

> **Waarschuwing.** De kansenscore is een eigen samenvattend oordeel, geen gemeten grootheid.
> De vijf criteria wijzen soms tegengesteld (de GCC is prijsgevoelig aan de onderkant én
> maximaal P6-verplicht aan de bovenkant); de score volgt dan het criterium dat in het
> deelrapport het zwaarst weegt. Gebruik de tabel om te prioriteren, niet om te besluiten.
> De marktomvangkolom herhaalt de cijfers uit §3 en §4, inclusief hun betrouwbaarheidsniveau.

### 7.1 Geografische markten, gerangschikt

| Markt | Omvang planning/scheduling per jaar | Dominante speler | Kans |
|---|---|---|---|
| [Benelux](markten/markt-benelux.md) | €15–40 mln | Primavera P6 (infra) / MS Project | **Hoog** — wereldwijd leidende openBIM/IFC-adoptie (BIM Basis ILS, RVB BIM-norm); het deelrapport concludeert letterlijk dat een IFC-native planner "nergens beter aansluit dan hier". Nederlandstalig veld dat vrijwel geen concurrent bedient. Klein maar met hoge referentiewaarde. |
| [Nordics](markten/markt-nordics-zweden-noorwegen-denemarken-finland.md) | EUR 35–75 mln bouw/infra | Safran · Asta Powerproject (+ Bidcon) | **Hoog** — hoge BIM-volwassenheid, sterke publieke opdrachtgevers, en géén monolithische P6-dwang: de markt is verdeeld over Safran, Powerproject en lokale suites. Verdeeldheid betekent dat een nieuwe toetreder geen enkel monopolie hoeft te breken. |
| [DACH](markten/markt-dach-duitsland-oostenrijk-zwitserland.md) | €65–135 mln bouwspecifiek | **Excel** · MS Project · TILOS | **Hoog** — het deelrapport stelt vast dat er "geen dominante CPM-planningscultuur buiten grote infra" is en dat 54 % van het Duitse mkb niets anders dan Excel gebruikt. Grote onbediende onderkant, serieuze BIM-mandaten voor infra, en TILOS' End of Maintenance (1-3-2026) laat de lineaire planning open. |
| [Zuidoost-Azië](markten/markt-zuidoost-azie.md) | US$ 43–110 mln | Primavera P6 (contractueel) · MS Project | **Middel-hoog** — sterk gesplitste markt: contractdwang aan de top, maar het deelrapport waarschuwt expliciet dat licentie-omzetcijfers de werkelijke gebruikersaantallen zwaar onderschatten (informele licenties). Die kloof tussen gebruik en betaling is precies waar gratis wint. |
| [India](markten/markt-india.md) | Segmentsom $39,4–125,6 mln; echte CPM-licenties ≈$8–30 mln | Primavera P6 · MS Project · Zoho | **Middel-hoog** — het deelrapport noteert dat India's plannerspopulatie veel groter is dan zijn softwaremarkt: enorm veel planners, weinig betaalde seats. Sterke prijsgevoeligheid en FX-druk. Barrière: P6 is de facto standaard in de professionele laag, en de IFC-adoptie is beperkt. |
| [Italië](markten/markt-italie.md) | €11–33 mln, waarvan €9–26 mln bouw | ACCA PriMus(-K) · MS Project | **Middel** — lage prijsniveaus (PriMus-K zit in een POWER PACK-abonnement van €199/jaar) en weinig P6-dwang buiten grote infra. Barrière: het lokale ecosysteem koppelt planning aan calculatie en aan de Italiaanse bestekpraktijk, wat een sterke, taalgebonden moat is. Rapportkwaliteit is bovendien zwak. |
| [Spanje & Portugal](markten/markt-spanje-en-portugal.md) | €20–50 mln licenties | Primavera P6 · MS Project · lokale ERP | **Middel** — vergelijkbaar met Italië: gefragmenteerd, prijsgevoelig, lokale calculatiepakketten domineren de onderkant. P6-dwang bestaat maar is beperkt tot grote infra en export-EPC. |
| [Polen & Centraal-Europa](markten/markt-polen-en-centraal-europa.md) | EUR 5,1–12,9 mln licenties | MS Project · Primavera P6 · Norma | **Middel** — sterk prijsgevoelig (gewogen gemiddelde EUR 300–400/seat/jaar) en dus ver onder het P6-niveau. Barrière: de bouwvraag is grotendeels publiek en EU-gefinancierd, en publieke opdrachtgevers stellen contractuele planningseisen die richting MS Project/P6 wijzen. |
| [Turkije](markten/markt-turkije.md) | $7–16 mln, midden ~$11 mln | Primavera P6 (geïmporteerd) · MS Project · Excel | **Middel** — het deelrapport is expliciet: planningssoftware is FX-geremd, elke devaluatie maakt de dollarprijs onbetaalbaarder en duwt gebruikers naar alternatieven. Dat is een structurele wind in de rug voor gratis. Barrière: P6-dwang van buitenlandse opdrachtgevers op de exportprojecten waar het geld zit. |
| [Brazilië](markten/markt-brazilie.md) | USD 31–46 mln (bouwdeel) | MS Project · Excel · Sienge (ERP) | **Middel** — MS Project en Excel domineren, niet P6; dat is een lagere drempel dan elders. Barrière: het bouw-ERP (Sienge) bezit de klantrelatie, en planning is daar een module in, geen aankoop. |
| [Mexico](markten/markt-mexico.md) | Niet apart afleidbaar (LatAm PM breed USD 550,6 mln, 2023) | Opus (Ecosoft) · Neodata | **Middel-laag** — een lokaal duopolie dat kostencalculatie én Gantt/CPM combineert in formaten die aan de Mexicaanse aanbestedingspraktijk vastzitten. Dat is een gesloten ecosysteem in het klein. Rapportkwaliteit is bovendien zwak (8 van 16 beweringen gecorrigeerd). |
| [Rest Latijns-Amerika](markten/markt-rest-latijns-amerika.md) | USD 35–60 mln echte CPM | Primavera P6 ("excluyente") · MS Project · S10/SINCO | **Middel-laag** — tweedeling: mijnbouw en olie & gas zijn hard P6-verplicht (in vacatures letterlijk "excluyente"), de bredere bouw draait op MS Project en lokale calculatiepakketten. Alleen die tweede helft is bereikbaar. |
| [Frankrijk](markten/markt-frankrijk.md) | €185–240 mln breed, €60–90 mln bouw | MS Project · Primavera P6 · TILOS/Sciforma | **Middel** — grote markt, MS Project domineert bij OPC-bureaus en maîtrise d'œuvre (dus geen P6-monopolie), en TILOS' einde laat lineaire planning open. Barrière: sterk taalgebonden opleidingskanaal (IPTIC, Ordre des architectes) dat expliciet MS Project noemt. |
| [Verenigd Koninkrijk & Ierland](markten/markt-verenigd-koninkrijk-ierland.md) | £20–40 mln *(zuivere eigen schatting)* | Asta Powerproject · Primavera P6 | **Middel-laag** — hoge BIM-volwassenheid (pluspunt), maar Asta Powerproject is al decennia dominant bij hoofd- én onderaannemers en won twaalf jaar op rij de vakprijs. Een ingegraven, bouwspecifieke incumbent met een lokale reseller- en opleidingsketen is moeilijker te verdringen dan een generieke. |
| [Japan](markten/markt-japan.md) | ¥8–13,5 mrd (USD 50–83 mln) | Lokale "tekenende" pakketten · Primavera P6 (EPC) | **Middel** — het deelrapport doet een opvallende constatering: de dominante lokale pakketten zijn "tekenen", geen "rekenen". Er is dus geen sterke CPM-incumbent in de brede markt, en het personeelstekort (2024年問題, 週休2日) drukt precies op planning. Barrières: taal, en een gesloten leveranciers- en documentcultuur. |
| [Zuid-Korea](markten/markt-zuid-korea.md) | US$ 25–40 mln licenties | Primavera P6 (contracteis) · Excel | **Laag-middel** — Excel domineert binnenlands (kans), maar de exportgerichte bovenkant is hard P6-verplicht vanuit buitenlandse opdrachtgevers, en het HWP-formaat domineert de overheidsoplevering. Het deelrapport is scherp: "als een vertragingsclaim van honderden miljoenen op je planning rust, wisselt niemand van tool". |
| [Hongkong & Taiwan](markten/markt-hongkong-en-taiwan.md) | HK US$ 7–12 mln; TW US$ 18–45 mln | Primavera P6 (HK) · MS Project · Excel | **Gesplitst: Taiwan middel-hoog, Hongkong laag** — Taiwan is extreem gefragmenteerd (gemiddeld NT$44 mln kapitaal per firma, "te klein voor een P6-seat"): een schoolvoorbeeld van een markt onder de commerciële prijsdrempel. Hongkong daarentegen kent P6 als de facto standaard via Scope-eisen op civiele contracten. |
| [Australië & Nieuw-Zeeland](markten/markt-australie-en-nieuw-zeeland.md) | Kernmarkt CPM-seats A$18–30 mln (USD 13–21 mln) | Primavera P6 · MS Project · Asta Powerproject | **Laag-middel** — het deelrapport typeert het als "een P6-land aan de bovenkant en een MS Project + Excel-land aan de onderkant". De onderkant is bereikbaar, maar klein in absolute zin, en de bovenkant is dichtgetimmerd door infra-, mijnbouw- en defensiecontracten. |
| [Canada](markten/markt-canada.md) | USD 40–80 mln bouwspecifiek CPM/Gantt | Primavera P6 · MS Project | **Laag** — P6 is de facto standaard bij álle grote opdrachtgevers (Metrolinx, Infrastructure Ontario, Hydro-Québec, TransLink) én bij de grote aannemers. Waar opdrachtgever én aannemer beide P6 draaien, is er geen wig. |
| [Verenigde Staten](markten/markt-verenigde-staten.md) | Bouwspecifiek $505–740 mln | Primavera P6 · MS Project | **Laag** — verreweg de grootste markt, en tegelijk de zwaarst gemandateerde. UFGS schrijft niet alleen P6 voor maar P6-instellingen, eist een planner met P6-ervaring, en verlangt software die "commercially available ... with vendor software support agreements" is. Het commercialiteitsmandaat sluit een open-sourceproject zonder supportentiteit formeel uit. Alleen de SDEF- en IPMDAR-deuren staan op een kier. |
| [Golfstaten (GCC)](markten/markt-golfstaten-gcc.md) | ~$45 mln licenties (band $30–85 mln) | Primavera P6 | **Laag** — het deelrapport formuleert het onomwonden: P6 is "geen marktleider — het is de facto de enige geaccepteerde valuta". De $370 mln aan training en claims-consultancy eromheen is bovendien zelf een lock-in-laag met eigen belang bij de status quo. |
| [Egypte & Noord-Afrika](markten/markt-egypte-en-noord-afrika.md) | $11–16 mln, centraal ~$13 mln | Primavera P6 (onbetwist) | **Laag** — P6-dominantie in het hele EPC-circuit, kleine absolute markt, en een omvangrijk informeel licentiekanaal dat de betalende markt nóg kleiner maakt. Rapportkwaliteit is bovendien zwak. |
| [Israël](markten/markt-israel.md) | CPM-tools in enge zin nauwelijks $10 mln | Excel · MS Project · monday.com | **Laag** — Excel is feitelijk marktleider bij kleine en middelgrote aannemers, wat op papier een kans is, maar de totale markt is te klein om een gerichte inspanning te dragen. Het deelrapport heeft bovendien zijn eigen totaalcijfers ingetrokken. |
| [Zuid-Afrika & Sub-Sahara](markten/markt-zuid-afrika-en-sub-sahara-afrika.md) | US$ 45–75 mln CPM/Gantt (incl. Egypte) | RIB Candy · Primavera P6 | **Laag** — RIB Candy is diep verankerd via het universitaire curriculum, een eigen kantorennet en de distributiedekking, en koppelt calculatie aan planning. Dat is een lokaal ecosysteem, niet slechts een pakket. De bouwsector krimpt bovendien als bbp-aandeel. |
| [China](markten/markt-china.md) | CNY 0,8–2,0 mrd (USD 110–280 mln) | Glodon 斑马进度计划 (Zebra) | **Zeer laag** — het gesloten ecosysteem in reinste vorm: onaantastbare marktpositie met netwerkeffecten, een lokalisatiediepte die "geen westerse leverancier evenaart", én Zebra wordt gratis aangeboden. Concurreren op prijs kan niet als de incumbent al nul rekent en de norm bezit. |
| [Rusland & GOS](markten/markt-rusland-en-de-gos-landen.md) | PM-software ~6,4 mrd RUB (2024) | MS Project (43 %) · Spider Project | **Zeer laag** — importsubstitutiebeleid, sanctieregime, betalingsproblematiek en een sterke inheemse CPM-motor (Spider). Niet praktisch bereikbaar, ongeacht productkwaliteit. |

### 7.2 Sectoren, gerangschikt

| Sector | Omvang planning/scheduling per jaar | Dominante speler | Kans |
|---|---|---|---|
| [Woningbouw, ontwikkeling & kleine aannemers](sectoren/sector-woningbouw-projectontwikkeling-en-kleinere-aannemers.md) | Planningsdeel ~$660 mln | **Excel** (marktleider, geen leverancier) · Buildertrend | **Hoog** — de grootste onbediende onderkant in het hele onderzoek. Prijsgevoelig, ver onder elke seat-drempel, geen contractdwang, en de incumbents (Buildertrend) hebben geen echte netwerkplanning-engine en zijn sinds 2026 prijsintransparant met gerapporteerde forse verlengingsstijgingen. |
| [Bouw & infrastructuur (algemeen)](sectoren/sector-bouw-en-infrastructuur-algemeen.md) | US$ 1,44 mrd (2025) | Primavera P6 · MS Project · Asta | **Gesplitst: hoog onder de contractgrens, laag erboven** — dit is de kernsector en tegelijk de scherpste tweedeling. Waar de planning een contractueel deliverable is met eigen betalingsregime, geldt formaat- én instellingsmandaat. Waar dat niet zo is (onderaannemers, werkvoorbereiding, look-ahead op niveau 4/5), is er geen barrière en wel een reële meerkalender-behoefte die goedkope tools niet invullen. |
| [Spoor, tunnels & lineaire infrastructuur](sectoren/sector-spoor-tunnels-en-lineaire-infrastructuur.md) | USD 90–250 mln, midden ~$150–170 mln | Primavera P6 · TILOS *(EOM 1-3-2026)* | **Middel-hoog, met een deadline** — TILOS bereikt End of Maintenance op 1 maart 2026 en Vico Office is al dood; het sectorrapport stelt vast dat "de marktleider in die niche wordt vervangen — niet opgeheven". Er staat geen opvolger klaar. Barrière: hoge betalingsbereidheid geldt uitsluitend voor contractueel *toegelaten* tools, dus dit is een kans mét een toelatingsvraagstuk. |
| [IT, software & telecom](sectoren/sector-it-software-en-telecom.md) | ~USD 2,46 mrd (grootste PPM-verticaal) | Jira · Clarity · monday.com | **Middel** — grootste verticale segment in omvang, geen enkele contractdwang, en de betalingsbereidheid voor pure planningstools is laag: precies de conditie waarin gratis wint. Maar: planning is hier niet het pijnpunt, dus de vraag naar een CPM-solver is beperkt, en IFC is irrelevant. Volume zonder passend product. |
| [Onderhoud, asset management & MRO](sectoren/sector-onderhoud-asset-management-en-mro.md) | MRO-software $8,0 mrd (grotendeels overlappend) | Primavera P6 · Prometheus · SAP PM | **Middel-laag** — tweedelig: in het geplande-stilstandregime is de betalingsbereidheid zeer hoog en de toolkeuze verstard; daarbuiten is er ruimte, maar dan gaat het om onderhoudsbeheer, niet om CPM. |
| [Industriële EPC & procesindustrie](sectoren/sector-industriele-epc-en-procesindustrie.md) | Niet apart afleidbaar | Primavera P6 · EcoSys · Safran/InEight | **Laag** — P6 met XER-uitwisseling is de contractuele taal tussen opdrachtgever, hoofdaannemer, onderaannemer en claim-expert. Vervanging vereist dat de hele keten meebeweegt. |
| [Overheid & publieke opdrachtgevers](sectoren/sector-overheid-en-publieke-opdrachtgevers.md) | $0,15–0,8 mrd, centraal ~$0,4 mrd | Primavera P6 EPPM | **Laag, met één opening** — governance-gedreven, enterprise-database-gedreven, desktoptools halen het hier niet. Maar dit is óók de sector die IFC-mandaten uitvaardigt; een overheid die openBIM verplicht stelt is op termijn een bondgenoot, niet alleen een barrière. |
| [Olie & gas — turnarounds/shutdowns](sectoren/sector-olie-en-gas-turnarounds-en-shutdowns.md) | ~$300 mln | Primavera P6 · Prometheus/IAMTech | **Laag** — P6 is contractueel geëist en het enige pakket dat door alle vier de partijen wordt geaccepteerd. Hoge betalingsbereidheid maakt prijs bovendien geen argument. |
| [Energie, nutsbedrijven & nucleair](sectoren/sector-energie-nutsbedrijven-en-nucleair.md) | $1,05–1,75 mrd, midden ~$1,4 mrd | Primavera P6 · Safran · EcoSys | **Laag** — het sectorrapport noemt dit tegelijk het segment met de hoogste betalingsbereidheid per planner ter wereld én de meest verstarde softwarekeuze. Beide werken tegen een gratis alternatief. |
| [Scheepsbouw & offshore](sectoren/sector-scheepsbouw-en-offshore.md) | ~USD 195 mln | Primavera P6 (XER als uitwisselingstaal) · Safran | **Laag** — LD-clausules in de orde van tienduizenden tot miljoenen per dag; niemand experimenteert daar met een nieuwe tool. Bovendien is IFC hier niet het relevante modelformaat. |
| [Mijnbouw & grondstoffen](sectoren/sector-mijnbouw-en-grondstoffen.md) | USD 250 mln | Deswik · Minemax/MineSched | **Laag** — een volledig eigen toolwereld (blokmodellen, ontginningssequenties) die met CPM weinig te maken heeft. De claim van 5–15 % NPV-uplift rechtvaardigt elk licentiebedrag. Buiten scope van een IFC-planner. |
| [Farma, biotech & R&D](sectoren/sector-farma-biotech-en-r-d.md) | €0,3–3 mln per klant per jaar | **Planisware** · Sciforma | **Zeer laag** — hoogste betalingsbereidheid per planner van de hele markt, portfolio-gedreven in plaats van bouwplaats-gedreven, en geen enkele rol voor IFC. Prijs is hier geen argument, geometrie evenmin. |
| [Aerospace & defensie](sectoren/sector-aerospace-en-defensie.md) | $0,1–1,0 mrd *(band te breed)* | Deltek Open Plan/Acumen · MS Project · P6 | **Zeer laag** — volledig compliance-gedreven: DCMA publiceerde per softwareproduct een aparte assessmentgids, en wie buiten dat rijtje valt is de facto niet-toetsbaar. Het commercialiteitsmandaat sluit open source formeel uit. |
| [Aangrenzend: APS & personeelsroostering](sectoren/sector-aangrenzende-segmenten-productieplanning-aps-en-personeelsroostering.md) | SCP-suites $0,5–5 mln/klant/jaar | Kinaxis · o9 · Blue Yonder · UKG | **Niet van toepassing** — geen CPM, geen projectlogica, geen IFC. Een andere markt, hier alleen in kaart gebracht om de afbakening scherp te houden. |

### 7.3 De vijf beste kansen

**1. Benelux — het thuisvoordeel is echt en niet te kopiëren.** Nederland heeft wereldwijd
de hoogste openBIM/IFC-adoptie (BIM Basis ILS, RVB BIM-norm), UAV-GC- en BVP-contracten die
planningsverantwoordelijkheid bij de opdrachtnemer leggen, en een Nederlandstalig veld dat
geen enkele internationale concurrent bedient. Het deelrapport formuleert het als bevinding,
niet als hoop: een IFC-native planner sluit nergens beter aan. De markt is klein (€15–40 mln
licenties, met een brede band omdat top-down en bottom-up nauwelijks overlappen), maar
referentieprojecten hier zijn elders inzetbaar.

**2. Woningbouw en kleinere aannemers, wereldwijd — de grootste onbediende groep.** Excel is
hier de marktleider, en dat is geen grap: het is de conclusie van het sectorrapport. Het
planningsdeel is ~$660 mln, er is geen contractdwang, en de bestaande spelers hebben geen
echte netwerkplanning-engine. Buildertrend werd sinds 2026 prijsintransparant en er worden
herhaaldelijk forse verlengingsstijgingen gerapporteerd — dat is een reden voor klanten om
te kijken. De betalingsbereidheid is laag in absolute zin, maar het sectorrapport voegt er
uitdrukkelijk aan toe: niet nul.

**3. DACH — een grote markt zonder CPM-cultuur.** 54 % van het Duitse mkb gebruikt niets
anders dan Excel voor de Bauzeitenplan, en het deelrapport stelt vast dat er buiten grote
infra geen dominante CPM-planningscultuur bestaat. Tegelijk zijn de BIM-mandaten voor infra
serieus en laat TILOS' End of Maintenance de lineaire planning open. €65–135 mln
bouwspecifiek is de grootste bereikbare Europese markt in dit rapport. Barrière: de
Duitstalige markt verwacht Duitstalige software en Duitstalige support.

**4. De TILOS-opvolging in lineaire infrastructuur — een aflopende termijn.** Trimble TILOS
bereikt End of Maintenance op 1 maart 2026 en Vico Office is sinds 2024 dood. Het
sectorrapport spoor/tunnels stelt vast dat de niche vervangen wordt, niet opgeheven, en er
staat geen opvolger klaar. Dit is de enige kans in dit hoofdstuk met een harde datum. De
beperking is even hard: het segment is klein ($6–15 mln voor de TILOS-niche zelf) en de
betalingsbereidheid geldt uitsluitend voor contractueel *toegelaten* tools — dus het gat
vullen vereist ook toelating regelen, niet alleen bouwen.

**5. Nordics — verdeelde markt, hoge BIM-volwassenheid.** Geen enkele speler domineert:
Safran, Asta Powerproject (met Bidcon), Antura en lokale suites delen de markt. Een nieuwe
toetreder hoeft dus geen monopolie te breken, alleen goed genoeg te zijn. Publieke
opdrachtgevers zijn BIM-gedreven en de regio staat open voor Europese leveranciers.
EUR 35–75 mln voor bouw/infra-planning is een reële omvang. Kanttekening: het deelrapport
heeft in de verificatieronde substantiële correcties ondergaan, waaronder de
marktomvangafleiding zelf.

*Eervolle vermelding, met meer risico:* **Taiwan** is het zuiverste voorbeeld van een markt
onder de commerciële prijsdrempel — gemiddeld NT$44 mln kapitaal per firma, expliciet "te
klein voor een P6-seat". De logica is sterk; de absolute omvang (US$ 18–45 mln inclusief
diensten) en de taalbarrière maken het geen startpunt.

### 7.4 De drie markten die ik zou mijden

**1. China.** Glodon bezit de markt via 斑马进度计划 (Zebra) met een lokalisatiediepte die
volgens het deelrapport "geen westerse leverancier evenaart" — en Zebra is bovendien *gratis*.
Concurreren op prijs is onmogelijk als de incumbent al nul rekent én de nationale norm,
taal en netwerkeffecten bezit. Dat Glodon aantoonbare rekenfouten in de kernsoftware heeft
(vastgesteld door een overheidsinstantie) en monopolieprijsstelling hanteert op andere
producten, verandert dat niet: dit is een positie die niet met productkwaliteit te
bestrijden is.

**2. Rusland en de GOS-landen.** Importsubstitutiebeleid, sanctieregime, betalings- en
distributieproblematiek, en een sterke inheemse CPM-motor (Spider Project) die functioneel
bovendien uitzonderlijk diep is — Resource Critical Path als standaard, duur afgeleid uit
hoeveelheid × productiviteit. Niet praktisch bereikbaar, ongeacht productkwaliteit. De
markt is bovendien klein (~6,4 mrd RUB voor alle PM-software) en de valutareeksen zijn zo
onbetrouwbaar dat het deelrapport waarschuwt dat de omvang jaar-op-jaar sterk kan lijken te
fluctueren zonder dat het reële volume verandert.

**3. Aerospace, defensie en het Amerikaanse federale bouwregime.** Niet vanwege de omvang —
die is aanzienlijk — maar vanwege het commercialiteitsmandaat. UFGS §2.1.2 eist software die
"commercially available from the software vendor for purchase with vendor software support
agreements available" is, en de SDEF-exportroutine moet "created and supported by the
software manufacturer" zijn. Een open-sourceproject zonder commerciële supportentiteit is
formeel niet inzetbaar. Daarbovenop publiceert DCMA per softwareproduct een aparte
assessmentgids (MS Project, Deltek Open Plan, Primavera): wie buiten dat rijtje valt is de
facto niet-toetsbaar. Dit is de enige barrière in het hele onderzoek die niet met techniek
of prijs op te lossen is, maar alleen met een juridische en organisatorische constructie.

*De GCC verdient een eervolle vermelding in deze categorie:* P6 is daar "de facto de enige
geaccepteerde valuta", en de ~$370 mln aan training- en claims-consultancy eromheen vormt
een beroepsgroep met een eigen belang bij het handhaven van die status quo.

---

## 8. Implicaties voor Open Planner Studio

Open Planner Studio is open source (LGPL-3.0), IFC 4.3-natief en heeft een echte CPM-solver met kalendermodel. Op basis van dit onderzoek: **die combinatie bestaat nergens anders.** Dat is de belangrijkste enkele bevinding uit 92 deelrapporten.

**Het gat is aantoonbaar, niet aangenomen.** De open-sourcewereld valt uiteen in twee groepen die elkaar niet raken. De gezonde, goed gefinancierde platforms (OpenProject: 15.205 commits in 52 weken, 15.666 GitHub-sterren) hebben géén CPM — OpenProject documenteert zelf dat het alleen Finish-to-Start kent, één werkdagenkalender voor de hele installatie heeft, en "currently does not offer resource management". De projecten met echte scheduling zijn fragiel: GanttProject 237 commits/jaar, LibrePlan 159 (waarvan 0 in de laatste zes weken), ProjectLibre desktop praktisch stil met een al ruim een jaar kapotte macOS-build. En de open-source IFC-infrastructuur waarop iedereen leunt — IfcOpenShell/Bonsai — draait op een jaarbudget van ongeveer $25.620.

**IFC is gratis; interoperabiliteit is dat niet.** De standaard zelf kost nul (IFC 4.3, CC BY-ND 4.0) en draagt de volledige CPM-payload. Bij de commerciële pakketten zit de prijs van de interoperabiliteit *in de licentie ingebakken*: er bestaat een levensvatbare markt puur voor het lezen van XER (ScheduleReader, $344–440/jaar). Dat is de wig. De aanbeveling uit het interoperabiliteitsrapport is concreet: **IFC 4.3 als natief formaat, MSPDI en P6 XML (PMXML) als volwaardig lees/schrijf-paar, CSV en ICS als lichte in-/uitgang, en XER zelf lezen én schrijven** — XER is platte tekst, dat kan. MPP schrijven kan niemand, ook MPXJ niet na 25 jaar; die illusie moet niet nagejaagd worden. Het juridische risico van XER/MPP-ondersteuning is in de EU aanzienlijk kleiner dan doorgaans gedacht (Richtlijn 2009/24/EG art. 6 staat decompilatie voor interoperabiliteit uitdrukkelijk toe), maar niet nul.

**Nederland is de gunstigst denkbare thuismarkt.** Wereldwijd leidende openBIM/IFC-adoptie (BIM Basis ILS, RVB BIM-norm), UAV-GC- en BVP-contracten die planningsverantwoordelijkheid bij de opdrachtnemer leggen, en een Nederlandstalig veld dat vrijwel geen internationale concurrent bedient. Het Benelux-deelrapport concludeert: *"een IFC-native planner sluit nergens beter aan dan hier"*. De markt is klein (€15–40 mln licenties per jaar) maar de referentiewaarde is groot.

**Vier realistische conclusies over de positionering:**

1. **De prijsvraag is grotendeels de verkeerde vraag.** $0 tegen $4.980 wint geen enkele aanbesteding waar het commercialiteitsmandaat geldt. De relevante vraag is *wie de switching cost betaalt*. Waar prijs wél doorslaggevend is: onder de seat-drempels, in valuta-geremde markten (Turkije, Egypte, Latijns-Amerika, India — waar de dollarprijs bij elke devaluatie onbetaalbaarder wordt), en in het onderwijskanaal.
2. **Het commercialiteitsmandaat is het echte obstakel, niet de functionaliteit.** UFGS-achtige eisen ("vendor software support agreements available") sluiten een project zonder commerciële supportentiteit formeel uit. Waar dat regime geldt, is de route niet concurreren maar *interoperabel zijn*: SDEF en IPMDAR-JSON zijn de twee gedocumenteerde, non-proprietaire deuren.
3. **De deterministische kern verslaan is haalbaar; de AI-hype najagen is dat niet.** De hele AI-planningsmarkt is $115 mln aan aangekondigd durfkapitaal en draait zonder uitzondering om P6/XER als uitwisselformaat. Een IFC-native planner staat daar structureel náást. De verdedigbare investering is CPM-correctheid, kalenderdiepte en logica-integriteit — precies waar MS Project structureel struikelt (één duration factor voor alle kalenders) en waar de hele goedkope SaaS-laag helemaal niets biedt.
4. **De niches die vrijkomen zijn concreet en gedateerd.** TILOS End of Maintenance op 1 maart 2026 laat de lineaire/locatiegebaseerde planning onbezet. Vico Office is sinds 2024 dood. Primavera Risk Analysis wordt niet meer ontwikkeld. Microsoft Project Server 2019 verloor support op 14 juli 2026. Dat zijn geen theoretische openingen maar aflopende termijnen met bestaande gebruikersgroepen die ergens naartoe moeten.

**Wat dit onderzoek niet zegt.** Het zegt niets over de vraag of er een betalende markt is voor een open-source planner — de prijsanalyse laat juist zien dat de duurste helft van de markt niet op prijs concurreert. Het zegt evenmin dat het gat leeg is omdat niemand het geprobeerd heeft; LibrePlan bracht in mei 2026 een release uit na elf jaar stilte, wat eerder illustreert hoe hard dit segment is dan hoe open. De bevinding is smaller en harder: **de combinatie van een werkende CPM-solver, IFC als natief formaat en open source bestaat op dit moment nergens.**

---

## 9. Leeswijzer — alle deelrapporten

### Dwarsdoorsnede-thema's (8)

Begin hier. Deze rapporten dragen de analytische conclusies; de markt- en sectorrapporten leveren het materiaal.

- [Wereldmarktomvang en triangulatie](dwarsdoorsnede/thema-wereldmarktomvang-en-triangulatie.md) — de factor 15, de eigen triangulatie, waarom Gartner/IDC geen cijfer publiceren
- [Prijsbenchmark en licentiemodellen](dwarsdoorsnede/thema-prijsbenchmark-en-licentiemodellen.md) — de volledige prijsladder, Oracle's 22 %, seat-drempels, TCO-stapel
- [Normen, aanbestedings- en contracteisen](dwarsdoorsnede/thema-normen-aanbestedings-en-contracteisen.md) — de zes lock-in-mechanismen, UFGS, NEC, SDEF, IPMDAR
- [Interoperabiliteit en bestandsformaten](dwarsdoorsnede/thema-interoperabiliteit-en-bestandsformaten.md) — XER, MPP, MSPDI, PMXML, IFC 4.3, MPXJ, en de juridische ruimte
- [Open source en gratis alternatieven](dwarsdoorsnede/thema-open-source-en-gratis-alternatieven.md) — het complete open-sourcelandschap met commit- en financieringscijfers
- [Marktdynamiek, consolidatie en migratiepatronen](dwarsdoorsnede/thema-marktdynamiek-consolidatie-en-migratiepatronen.md) — de desintegratiegolf, SaaS-transitie, aflopende supportdeadlines
- [AI en automatisering in planning](dwarsdoorsnede/thema-ai-en-automatisering-in-planning.md) — wat aantoonbaar werkt, wat marketing is, en hoe klein het veld is
- [Kanalen, resellers, training en certificering](dwarsdoorsnede/thema-kanalen-resellers-training-en-certificering.md) — het onderwijs- en resellerkanaal als lock-in-laag

### Geografische markten (26)

[Australië & Nieuw-Zeeland](markten/markt-australie-en-nieuw-zeeland.md) ·
[Benelux](markten/markt-benelux.md) ·
[Brazilië](markten/markt-brazilie.md) ·
[Canada](markten/markt-canada.md) ·
[China](markten/markt-china.md) ·
[DACH (Duitsland, Oostenrijk, Zwitserland)](markten/markt-dach-duitsland-oostenrijk-zwitserland.md) ·
[Egypte & Noord-Afrika](markten/markt-egypte-en-noord-afrika.md) ·
[Frankrijk](markten/markt-frankrijk.md) ·
[Golfstaten (GCC)](markten/markt-golfstaten-gcc.md) ·
[Hongkong & Taiwan](markten/markt-hongkong-en-taiwan.md) ·
[India](markten/markt-india.md) ·
[Israël](markten/markt-israel.md) ·
[Italië](markten/markt-italie.md) ·
[Japan](markten/markt-japan.md) ·
[Mexico](markten/markt-mexico.md) ·
[Nordics](markten/markt-nordics-zweden-noorwegen-denemarken-finland.md) ·
[Polen & Centraal-Europa](markten/markt-polen-en-centraal-europa.md) ·
[Rest Latijns-Amerika](markten/markt-rest-latijns-amerika.md) ·
[Rusland & GOS](markten/markt-rusland-en-de-gos-landen.md) ·
[Spanje & Portugal](markten/markt-spanje-en-portugal.md) ·
[Turkije](markten/markt-turkije.md) ·
[Verenigd Koninkrijk & Ierland](markten/markt-verenigd-koninkrijk-ierland.md) ·
[Verenigde Staten](markten/markt-verenigde-staten.md) ·
[Zuid-Afrika & Sub-Sahara-Afrika](markten/markt-zuid-afrika-en-sub-sahara-afrika.md) ·
[Zuid-Korea](markten/markt-zuid-korea.md) ·
[Zuidoost-Azië](markten/markt-zuidoost-azie.md)

### Sectoren (14)

[Aangrenzende segmenten (APS & personeelsroostering)](sectoren/sector-aangrenzende-segmenten-productieplanning-aps-en-personeelsroostering.md) ·
[Aerospace & defensie](sectoren/sector-aerospace-en-defensie.md) ·
[Bouw & infrastructuur (algemeen)](sectoren/sector-bouw-en-infrastructuur-algemeen.md) ·
[Energie, nutsbedrijven & nucleair](sectoren/sector-energie-nutsbedrijven-en-nucleair.md) ·
[Farma, biotech & R&D](sectoren/sector-farma-biotech-en-r-d.md) ·
[Industriële EPC & procesindustrie](sectoren/sector-industriele-epc-en-procesindustrie.md) ·
[IT, software & telecom](sectoren/sector-it-software-en-telecom.md) ·
[Mijnbouw & grondstoffen](sectoren/sector-mijnbouw-en-grondstoffen.md) ·
[Olie & gas — turnarounds en shutdowns](sectoren/sector-olie-en-gas-turnarounds-en-shutdowns.md) ·
[Onderhoud, asset management & MRO](sectoren/sector-onderhoud-asset-management-en-mro.md) ·
[Overheid & publieke opdrachtgevers](sectoren/sector-overheid-en-publieke-opdrachtgevers.md) ·
[Scheepsbouw & offshore](sectoren/sector-scheepsbouw-en-offshore.md) ·
[Spoor, tunnels & lineaire infrastructuur](sectoren/sector-spoor-tunnels-en-lineaire-infrastructuur.md) ·
[Woningbouw, projectontwikkeling & kleinere aannemers](sectoren/sector-woningbouw-projectontwikkeling-en-kleinere-aannemers.md)

### Softwareprofielen (44)

**Echte CPM-planners:**
[Oracle Primavera P6](profielen/software-oracle-primavera-p6.md) ·
[Oracle Primavera Cloud](profielen/software-oracle-primavera-cloud.md) ·
[Oracle Primavera Risk Analysis](profielen/software-oracle-primavera-risk-analysis.md) ·
[Microsoft Project](profielen/software-microsoft-project.md) ·
[Elecosoft Asta Powerproject](profielen/software-elecosoft-asta-powerproject.md) ·
[Safran Project](profielen/software-safran-project.md) ·
[Deltek Open Plan & Acumen Fuse](profielen/software-deltek-open-plan-en-acumen-fuse.md) ·
[Spider Project](profielen/software-spider-project.md) ·
[Phoenix Project Manager](profielen/software-phoenix-project-manager.md) ·
[Project Plan 365](profielen/software-project-plan-365.md) ·
[Sciforma](profielen/software-sciforma.md) ·
[Planisware](profielen/software-planisware.md) ·
[Broadcom Clarity](profielen/software-broadcom-clarity.md) ·
[SAP PS & PPM](profielen/software-sap-project-system-en-sap-portfolio-and-project-management.md) ·
[InEight Schedule](profielen/software-ineight-schedule.md) ·
[Hexagon EcoSys](profielen/software-hexagon-ecosys.md)

**4D/BIM en locatiegebaseerd:**
[Bentley SYNCHRO](profielen/software-bentley-synchro.md) ·
[Autodesk Navisworks TimeLiner](profielen/software-autodesk-navisworks-timeliner.md) ·
[Trimble TILOS](profielen/software-trimble-tilos.md) ·
[Trimble Vico Office](profielen/software-trimble-vico-office.md) ·
[BEXEL Manager](profielen/software-bexel-manager.md) ·
[RIB iTWO](profielen/software-rib-itwo.md)

**Bouwplatformen, uitvoering en specialisten:**
[Procore](profielen/software-procore.md) ·
[Autodesk Build & ACC](profielen/software-autodesk-build-en-autodesk-construction-cloud.md) ·
[RIB Candy](profielen/software-rib-candy.md) ·
[Glodon](profielen/software-glodon.md) ·
[Buildertrend](profielen/software-buildertrend.md) ·
[Sablono](profielen/software-sablono.md) ·
[ALICE Technologies](profielen/software-alice-technologies.md) ·
[nPlan](profielen/software-nplan.md) ·
[Nodes & Links](profielen/software-nodes-links.md)

**Work management met Gantt:**
[Smartsheet](profielen/software-smartsheet.md) ·
[monday.com](profielen/software-monday-com.md) ·
[Wrike](profielen/software-wrike.md) ·
[Zoho Projects](profielen/software-zoho-projects.md) ·
[Asana](profielen/software-asana.md) ·
[ClickUp](profielen/software-clickup.md) ·
[Atlassian Jira + Advanced Roadmaps/BigPicture/Structure.Gantt](profielen/software-atlassian-jira-met-advanced-roadmaps-bigpicture-en-structure-gantt.md) ·
[TeamGantt](profielen/software-teamgantt.md) ·
[GanttPRO](profielen/software-ganttpro.md) ·
[LiquidPlanner](profielen/software-liquidplanner.md)

**Open source en gratis:**
[OpenProject](profielen/software-openproject.md) ·
[ProjectLibre](profielen/software-projectlibre.md) ·
[GanttProject](profielen/software-ganttproject.md)

---

## 10. Beperkingen van dit onderzoek

Volledigheidshalve, en omdat een marktonderzoek dat zijn eigen zwaktes verzwijgt geen onderzoek is:

- **Het zoekbudget van de onderzoekssessie raakte uitgeput.** Meerdere deelrapporten (interoperabiliteit, kanalen, marktdynamiek, en een aantal marktrapporten) zijn geschreven zonder enige `WebSearch`, uitsluitend met directe ophaalacties op bekende URL's. Dat maakt die rapporten **bronkwalitatief sterker** (bijna alles komt uit jaarrekeningen, prijslijsten, normteksten en aanbestedingsdocumenten) maar **smaller in dekking**: geen vakpers, geen gebruikersfora, geen regionale bronnen in de lokale taal.
- **Gartner, IDC en Forrester zijn niet geraadpleegd** — paywall en HTTP 403. Er staat geen enkel Gartner- of IDC-cijfer in dit onderzoek, ook niet uit het geheugen.
- **Grand View Research blokkeerde directe toegang (HTTP 403).** GVR-cijfers komen uit zoeksnippets, niet uit de bronpagina. Hetzelfde geldt voor Technavio, Research Nester en Business Research Insights.
- **De duurste helft van de markt publiceert geen prijzen.** Voor TILOS, Deltek, Safran, ALICE, nPlan, Nodes & Links, InEight, Planisware, Clarity, BEXEL en Sablono zijn de genoemde bedragen **[schatting]** met expliciete redenering, of ontbreken ze.
- **Oracle's laatste openbare prijslijst is van november 2016.** Alle P6-prijzen in dit rapport zijn daarop gebaseerd, gekalibreerd tegen wederverkoperprijzen van 2026.
- **Bandbreedtes zijn breed en soms niet-overlappend.** Waar top-down en bottom-up elkaar niet raken (Benelux, India, Aerospace) hebben we de band opgerekt in plaats van een puntschatting te forceren. Een brede band is eerlijker dan een precies getal met verzwegen spanning.
- **De regionale cijfers zijn geen partitie van het wereldtotaal**, en de sectorcijfers zijn niet optelbaar. Zie de noten bij §3 en §4.
