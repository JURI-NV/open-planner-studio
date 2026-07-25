# Sectorrapport: Mijnbouw en grondstoffen — planningssoftware

**Onderzoeksdatum:** 25 juli 2026
**Scope:** wereldwijd; mijnbouw (surface + underground), mineralenverwerking, en de bijbehorende kapitaalprojecten en shutdowns
**Status van cijfers:** elk cijfer heeft een bron-URL. Alles wat ik zelf heb afgeleid staat expliciet gemarkeerd als **[SCHATTING]**.

---

## 0. Methodologische verantwoording (lees dit eerst)

Dit onderzoek is uitgevoerd met ~30 zoekopdrachten en directe ophaalacties op leveranciers-, analisten- en vakperssites. Beperkingen die je moet kennen bij het lezen:

- **Reddit was niet bereikbaar** vanuit deze omgeving. Meerdere relevante gebruikersdiscussies (r/mining over Deswik-prijsstelling en scheduling-toolkeuze) konden alleen via zoeksnippets worden gelezen, niet integraal. Die punten zijn als zodanig gemarkeerd.
- **AusIMM (ausimm.com) gaf HTTP 403**; het inhoudelijk identieke artikel is via Micromine's eigen blog gelezen.
- **InvestMETS' "Global Mining Tech 50 2026"-tabel staat achter een paywall**; alleen de eerste twee posities en het markttotaal waren leesbaar.
- **Prijzen van de grote mijnplanningspakketten worden niet gepubliceerd.** Dit is een structureel kenmerk van deze markt (zie §3). Waar ik prijzen noem, komen die uit secundaire bronnen of uit de enkele leveranciers die wél publiceren; dat is telkens aangegeven.
- **Analistencijfers over "mine planning software market" lopen extreem uiteen** (USD 504 mln tot USD 1,91 mrd voor hetzelfde jaar 2025). Ik gebruik ze daarom alleen als sanity check en bouw de eigen raming bottom-up op uit gepubliceerde leveranciersomzetten. Zie §4.
- **[TOEGEVOEGD bij verificatie — belangrijkste bronwaarschuwing van dit rapport] `miningsoftwarereviews.com` is geen gevestigde analistenbron.** Deze site wordt in dit rapport ruim twintig keer aangehaald, óók voor dragende beweringen: de rangorde van marktleiders, "Deswik particularly strong in underground", "31 mine planning & scheduling tools", de **5–15% NPV-uplift**, "the most common failure point is the handover from strategic to short-term planning" en de **USD 5.000-drempel** voor juniors. Bij controle van de eigen About-pagina blijkt de site **in 2024 opgericht**, zonder **genoemd uitgevend bedrijf of redactieteam**, en werkend met **anonieme upvotes en community-reviews** in plaats van redactionele verificatie ([miningsoftwarereviews.com/about](https://www.miningsoftwarereviews.com/about)). De site claimt zelf "no pay-to-play, no vendor-influenced rankings", maar dat is een zelfverklaring zonder controleerbare methodologie. **Behandel elke bewering in dit rapport die alleen op deze bron rust als onbevestigd.** Dat raakt met name §2.1 (rangorde), §3.6 punt 1 (NPV-uplift) en §7.1 punten 1 en 4.

---

## 1. Wat deze sector bijzonder maakt qua planning

### 1.1 De fundamentele tweedeling: mijnplanning ≠ projectplanning

Dit is het belangrijkste inzicht van dit hele rapport, en het is de reden waarom mijnbouw een *aparte* softwaremarkt heeft in plaats van een variant op bouw:

| | **Mijnplanning (geologisch/productie)** | **Projectplanning (kapitaal/shutdown)** |
|---|---|---|
| **Object van planning** | Blokmodel, orebody, ontwerpvormen (pits, stopes, panels, strips) | Activiteiten, WBS-elementen, leverbaarheden |
| **Bron van de "taak"** | Automatisch afgeleid uit mijnontwerp: elke solid/string/blok wordt een schedulebare taak | Handmatig door planner opgezet uit scope |
| **Wat gedreven wordt** | Tonnen, gehalte (grade), strip ratio, blending, NPV | Datums, kosten, earned value |
| **Horizon** | Life-of-Mine (10–40 jaar) tot shift (12 uur) — één continu spectrum | Projectduur (1–6 jaar) of shutdown (3–30 dagen) |
| **Optimalisatiedoel** | NPV-maximalisatie onder geologische/verwerkings-/logistieke constraints | Doorlooptijd, kosten, contractuele mijlpalen |
| **Typische tools** | Deswik Planning, XPAC/XECUTE, MinePlan MPSO, Evolution, MineSched, Minemax, Alastri | Primavera P6, MS Project, Safran, PRISM/Contruent, InEight |
| **Schaal van de dataset** | Miljoenen blokken; tienduizenden tot honderdduizenden activiteiten | Honderden tot ~30.000 activiteiten |

De aantallen zijn hier beslissend. Een mijnschema genereert taken automatisch uit geometrie — één underground level-development-ontwerp levert al honderden ontwikkelings-drives op, en een open-pit blokmodel levert er tienduizenden. Dat is een orde van grootte waar Primavera P6 en MS Project niet voor gebouwd zijn, en het is precies waarom de mijnbouwsector een eigen scheduler-ecosysteem heeft ontwikkeld in plaats van P6 te hergebruiken. Deswik positioneert dit expliciet als differentiator: het pakket biedt "automated conversion of mine designs into schedulable tasks" en laat gebruikers "select and modify your schedule in the graphics space using CAD and see updates directly in the scheduler" ([deswik.com/products/planning](https://www.deswik.com/products/planning)).

De consequentie: **elk mijnbouwbedrijf draait minimaal twee planningsstacks naast elkaar**, met een notoir zwakke koppeling ertussen. Mijn zoekopdrachten naar een gedocumenteerde Deswik↔P6-integratie leverden geen enkele leveranciersdocumentatie op — de facto verloopt de uitwisseling via handmatige mapping of via generieke XER/XML-exports. Dit is een openstaand gat (zie §7).

### 1.2 Schaal en doorlooptijd

- **Aantal operaties wereldwijd:** de ICMM Global Mining Dataset (eerste release september 2025) catalogiseert **8.508 operationele mijn- en verwerkingsfaciliteiten** wereldwijd; steenkool is met **43% van alle mijnen** de grootste categorie, gevolgd door goud, koper en ijzererts ([icmm.com/global-datasets/mining-metals-facilities](https://www.icmm.com/global-datasets/mining-metals-facilities), [discoveryalert.com.au](https://discoveryalert.com.au/global-mining-database-2025-launch-transparency/)).
- **Omvang van de industrie:** de top-40 mijnbouwbedrijven realiseerden in 2025 **USD 909 mrd omzet** (+3,3%), **USD 248 mrd EBITDA** (+23%) en **USD 120 mrd nettowinst** ([PwC Mine 2026](https://www.pwc.com/gx/en/industries/energy-utilities-resources/publications/mine.html)).
- **Exploratiebudget:** wereldwijd non-ferro exploratiebudget **USD 12,40 mrd in 2025**, licht omlaag van USD 12,5 mrd in 2024 ([S&P Global, CES 2025](https://www.spglobal.com/market-intelligence/en/news-insights/research/2025/11/ces-2025-overview-exploration-in-numbers)).
- **Doorlooptijd van planningshorizonten:** LOM-schema's beslaan routinematig 10–40 jaar; het McKinsey-projectsample bevat projecten met doorlooptijden van "minder dan 2 jaar tot 8 jaar" en budgetten van "USD 0,3 mrd tot meer dan USD 5,0 mrd" ([McKinsey, The capex crystal ball](https://www.mckinsey.com/industries/metals-and-mining/our-insights/the-capex-crystal-ball-beating-the-odds-in-mining-project-delivery)).

Weinig andere sectoren vragen dat één modelfamilie zowel een 30-jaars strategisch schema als een 12-uurs ploegenschema moet ondersteunen, met consistente reservecijfers. Dat is de kernontwerpeis in mijnplanning.

### 1.3 Resourcecomplexiteit

De constraints in mijnplanning zijn fysiek en niet-onderhandelbaar, wat het schedulingprobleem structureel harder maakt dan in de bouw:

- **Ventilatie (underground):** ventilatie kan tot **50% van het energieverbruik van een underground mijn** uitmaken, en luchtstroom is een harde beperking op hoeveel gelijktijdige werkfronten je kunt draaien ([micromine.com/blog-rethinking-mine-scheduling](https://www.micromine.com/blog-rethinking-mine-scheduling/)). Academisch onderzoek benoemt expliciet dat "production scheduling and ventilation decisions are not made in concert" een openstaand probleem is ([Springer, Optimization and Engineering](https://link.springer.com/article/10.1007/s11081-021-09682-4)).
- **Productiviteitsprobleem underground:** underground hard-rock mijnen vertegenwoordigen **40% van de wereldwijde operaties maar slechts 12% van de run-of-mine productie** ([micromine.com](https://www.micromine.com/blog-rethinking-mine-scheduling/)) — het schedulingprobleem is daar het zwaarst en het meest waardevol.
- **Blending/gehaltebeheersing:** het schema moet niet alleen tonnen maar ook gehalte, verontreinigingen en verwerkingscapaciteit tegelijk halen. MinePlan Schedule Optimizer wordt expliciet ingezet voor "constraint management within the Schedule Optimizer tool for mill circuit operations" ([connect.hexagonmining.com](https://connect.hexagonmining.com/techtip-mpso-constraint-management)).
- **Mobiele equipment-utilisatie:** trucks, loaders, jumbo's en drills zijn de bindende resource, niet arbeid. Traditionele tools falen op "inability to accurately model mobile equipment utilization" ([micromine.com](https://www.micromine.com/blog-rethinking-mine-scheduling/)).
- **Resource-driven vs. task-driven:** de sector beweegt naar "resource-driven scheduling", waarbij taken zich aanpassen aan beschikbare resources in plaats van resources in vooraf vastgelegde slots te persen ([micromine.com](https://www.micromine.com/blog-rethinking-mine-scheduling/)). Dat is een fundamenteel ander paradigma dan CPM-met-resource-levelling.

### 1.4 Contractuele eisen

- **Kapitaalprojecten** in mijnbouw worden overwegend als EPCM of EPC/LSTK uitgevoerd door een klein aantal internationale bureaus: Fluor, Bechtel, Hatch, Worley, Ausenco domineren de pipeline ([hub.truesourcemetals.com/ecosystem/mining-epcm/](https://hub.truesourcemetals.com/ecosystem/mining-epcm/), [fluor.com](https://www.fluor.com/market-reach/industries/mining-metals), [ausenco.com](https://ausenco.com/what-we-do/epc-epcm-contracting/)). Deze bureaus brengen hun eigen project-controls-standaard mee — en die is vrijwel zonder uitzondering Primavera P6.
- **Financiers:** projecten worden gefinancierd tegen een Bankable Feasibility Study met een Lender's Technical Advisor die de mijnbouwtechnische aannames én het uitvoeringsschema onafhankelijk toetst. SRK Consulting voert dit type reviews uit "for international banks" met "balanced and focused independent reports and audits" ([srk.com](https://www.srk.com/en/services/due-diligence-and-project-reviews)); vergelijkbare LTA-diensten bij Micon International ([micon-international.com](https://micon-international.com/our-services/independent-engineer-technical-consultant/)) en K-MINE ([k-mine.com](https://k-mine.com/pg/independent-technical-review-mining/)).
- **Beursvoorschriften:** NI 43-101 (Canada) en de JORC Code (Australië) verplichten dat het gepubliceerde productieschema door een Qualified/Competent Person is onderbouwd ([OSC NI 43-101](https://www.osc.ca/en/securities-law/instruments-rules-policies/4/43-101/ni-43-101-standards-disclosure-mineral-projects-form-43-101f1-technical-report-and-related), [gosselinmining.com](https://gosselinmining.com/services/technical-reporting-ni43-101-jorc/)). Het mijnschema is daarmee een *beursgevoelig* document — een unieke eigenschap van deze sector die je in bouw of infra niet tegenkomt.

### 1.5 Kosten van vertraging — hier zit de betalingsbereidheid

Dit is het cijfermateriaal dat het commerciële gedrag in deze sector verklaart.

**Kapitaalprojecten:**
- **83%** van recente grote mijnbouw- en metaalprojecten kent kosten- of planningsproblemen, met gemiddeld **>40% capex-overschrijding** en **20–30% doorlooptijdverlenging**; van de megaprojecten (>USD 1 mrd) haalde slechts **8–10%** zowel budget als planning. Megaprojecten overschrijden gemiddeld **79% op kosten** en **52% op planning**. Sample: 80 wereldwijde mijnbouwprojecten ([McKinsey](https://www.mckinsey.com/industries/metals-and-mining/our-insights/the-capex-crystal-ball-beating-the-odds-in-mining-project-delivery)).
- EY analyseerde **192 mijnbouwprojecten van >USD 1 mrd**: **64% liep over budget, over schema, of beide**, met een **gemiddelde kostenoverschrijding van 39%** ([EY](https://www.ey.com/en_rs/insights/energy-resources/how-better-project-management-can-boost-minings-capital-productivity)). EY stelt dat betere projectmanagementcapaciteiten **15–30% van de projectwaarde** kunnen terugwinnen — dat is de business case voor planningssoftware in deze sector, en het is een enorm getal.
- Een oudere EY-studie op 108 megaprojecten kwam op een **gemiddelde budgetoverschrijding van 62%** ([Mining Review Africa](https://www.miningreview.com/top-stories/mega-mining-projects-show-62-average-budget-overrun-says-ey/), [Mining Weekly](https://www.miningweekly.com/article/more-than-two-thirds-of-megaprojects-face-cost-overruns-ey-report-2015-05-21)).
- **Tweederde van de overschrijdingen komt uit slechte initiële inschatting**, eenderde uit slechte uitvoering ([McKinsey](https://www.mckinsey.com/industries/metals-and-mining/our-insights/the-capex-crystal-ball-beating-the-odds-in-mining-project-delivery)). Dat verschuift de waarde naar de *front-end* planningstools, niet naar de voortgangsregistratie.
- Koperprojecten presteren het slechtst: **33%** kende planningsvertraging >30%, tegen 13% voor ijzererts ([McKinsey](https://www.mckinsey.com/industries/metals-and-mining/our-insights/the-capex-crystal-ball-beating-the-odds-in-mining-project-delivery)).

**Operationele shutdowns:**
- Een grote koper-SAG-mill kan **USD 100.000 per uur** aan productiewaarde genereren; **1% downtime** kost dan ruim **USD 8 mln aan gemiste jaarproductie** ([RME Global](https://rmeglobal.com/resources/about-mill-reline-director-part-i/)).
- Ongeplande downtime in mijnbouw kost tot **USD 180.000 per incident** ([DPF Guys](https://dpfguys.com/maximizing-uptime-mining-industry/)).
- Australische mijnbouw-onderhoudsuitgaven bedroegen **A$13,2 mrd in FY24** en **A$13,3 mrd in FY25** ([mining.com.au / Oxford Economics Australia](https://mining.com.au/mining-maintenance-spending-slowing-oxford-economics-australia/)).

**Interpretatie:** bij USD 100k/uur is elke dag die je van een mill-reline afsnijdt USD 2,4 mln waard. Een shutdown-planningslicentie van een paar duizend euro is dan ruis. Dit verklaart waarom de betalingsbereidheid in deze sector hoog is — mits je aantoonbaar aan de productiekant zit.

---

## 2. Welke planningssoftware daadwerkelijk gebruikt wordt, in welke rangorde en door wie

### 2.1 Rangorde A — Mijnplanning / productieschema's

Onafhankelijke inventarisatie: MiningSoftwareReviews telt **31 mine planning & scheduling tools** in de markt ([miningsoftwarereviews.com/category/mine-planning-design](https://www.miningsoftwarereviews.com/category/mine-planning-design)). De rangorde hieronder is mijn inschatting op basis van geverifieerde installed base, omzet en hoe vaak partijen als benchmark worden genoemd.

**1. Deswik (Sandvik) — marktleider, maar "met afstand" is niet hard te maken**

> **[GECORRIGEERD bij verificatie]** De kop luidde oorspronkelijk "marktleider, met afstand". Dat kwalificatief is niet gedekt door de beschikbare cijfers. Het enige *harde* omzetcijfer voor Deswik is AUD 79 mln over rolling-12m okt-2021 (≈USD 57 mln); het enige harde cijfer voor Micromine is USD 85 mln over 2025. Deswik's 2025-positie is een schatting (USD 110–135 mln, §4.3) en verhoudt zich daarmee als **1,3–1,6×** tot Micromine — een voorsprong, geen afstand. Sterker: de eigen tabel in §4.3 zet de Datamine-groep op USD 100–160 mln, met een hóger midpunt dan Deswik. Wat wél goed onderbouwd is: Deswik heeft de grootste geverifieerde installed base (1.330+ operaties) en de sterkste underground-positie. Leiderschap: **bevestigd**. "Met afstand": **onbevestigd**.

- Installed base: **1.330+ mijnoperaties** en **32.000+ software*gebruikers*** wereldwijd ([deswik.com/about-us](https://www.deswik.com/about-us), [miningfms.com/vendors/deswik](https://miningfms.com/vendors/deswik/)). Deswik zelf claimt "over 200 mining engineers globally" in dienst en **490+ medewerkers** totaal ([deswik.com/about-us](https://www.deswik.com/about-us)); MiningFMS noemt daarentegen "approximately 300 across 14 offices in 10 countries" ([miningfms.com](https://miningfms.com/vendors/deswik/)) — de bronnen spreken elkaar tegen.
  **[GECORRIGEERD bij verificatie]** Deswik's eigen About Us zegt "32,000+ software **users**", niet *licenties*, en het eerder genoemde cijfer "775 bedrijven" staat op géén van beide gecontroleerde bronpagina's. Zie §Verificatie, punt V12.
- Producten: **Planning** (voorheen Deswik.Sched — de Gantt-scheduler), **Spatial** (CAD), **NOVA**, **LHS**, **Blend**, **APEX**, **BOLT**, **GO**, **OPS** (short-interval control), **ORB** ([deswik.com](https://www.deswik.com/)).
- Positionering: "the leading scheduling solution that dynamically links your mine designs and schedules"; sterkste positie in **underground**, waar MiningSoftwareReviews Deswik.Planning "particularly strong in underground operations" noemt ([miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/category/mine-planning-design)).
- Eigendom: **Sandvik**, overname afgerond april 2022 ([home.sandvik](https://www.home.sandvik/en/news-and-media/news/2022/04/sandvik-completes-the-acquisition-of-the-leading-mine-planning-software-company-deswik/)).

**2. RPMGlobal — XPAC Solutions / XECUTE / MinePlanner (Caterpillar)**

- **XPAC** is "a highly flexible mine scheduling software solution"; **XPAC Solutions** is een suite met **11 commodity-specifieke oplossingen** (kolen, ijzererts, metalen, etc.) ([rpmglobal.com/product/xpac](https://rpmglobal.com/product/xpac/), [miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/software/xpac-solutions)).
- **XECUTE** is het short-term/execution-level planningsproduct met een "game-inspired 3D interface" ([rpmglobal.com/product/xecute](https://rpmglobal.com/product/xecute/), [LinkedIn](https://www.linkedin.com/products/rpmglobal-xecute-scheduling)).
- Sterkste positie historisch in **kolen** en bulk; RPM opereert vanuit 14 kantoren in 125+ landen ([rpmglobal.com](https://www.rpmglobal.com/)).
- Eigendom: **Caterpillar**, aangekondigd 12–13 oktober 2025, afgerond **17 februari 2026** ([Reuters](https://www.reuters.com/world/asia-pacific/caterpillar-acquire-australias-rpmglobal-728-million-2025-10-12/), [caterpillar.com](https://www.caterpillar.com/en/news/corporate-press-releases/h/rpm-global-acquisition.html)).

**3. Micromine — Beyond / Advance / Alastri (Weir Group)**

- **Micromine Alastri** = open-pit tactical scheduling ("life-of-mine through to rolling 12-week activities") ([micromine.com/alastri/tactical-scheduler](https://www.micromine.com/alastri/tactical-scheduler/)).
- **Micromine Advance** = underground metals, gelanceerd begin 2025, gebouwd rond resource-driven scheduling ([miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/category/mine-planning-design)).
- **Pitram** = fleet management / short interval control ([micromine.com/pitram-sic](https://www.micromine.com/pitram-sic/)).
- Eigendom: **Weir Group**, overgenomen van Potentia Capital, aangekondigd 28 februari 2025, afgerond Q2 2025 ([global.weir](https://www.global.weir/newsroom/global-news/2025/weir-completes-acquisition-of-micromine/)).

**4. Hexagon — HxGN MinePlan / MinePlan Schedule Optimizer (MPSO)**

- Afstammeling van MineSight (Mintec, 1970); Hexagon heeft het MineSight-merk uitgefaseerd ([miningsoftwarereviews.com/software/hxgn-mineplan](https://www.miningsoftwarereviews.com/software/hxgn-mineplan)).
- **MPSO** wordt volgens Hexagon "across hundreds of mines" gebruikt voor life-of-mine- en budgetplannen ([connect.hexagonmining.com](https://connect.hexagonmining.com/webinar-long-medium-planning-mpso)).
- Concurreert direct met Deswik, GEOVIA Surpac en Datamine Studio RM ([miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/software/hxgn-mineplan)).

**5. Maptek — Vulcan + Evolution (Strategy / Origin / Epoch)**

- **Evolution** biedt "open pit mine planning, optimisation and scheduling tools to maximise the value of a deposit"; drie varianten: Strategy (strategisch), Origin (detailplanning, geïntegreerd met Vulcan), Epoch (korte termijn) ([maptek.com/products/evolution](https://www.maptek.com/products/evolution/), [miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/software/maptek-evolution)).
- Herkomst: overgenomen van **Orelogy in 2014** en herlanceerd als Maptek Evolution ([E&MJ](https://www.e-mj.com/departments/equipmentgallery/cloud-based-pit-development-scheduling-software/)).

**6. Dassault Systèmes GEOVIA — MineSched / Surpac / Whittle**

- **MineSched** vertaalt het strategische lange-termijnplan naar een tactisch schema; "produces target-based, long- and short-term schedules using block, grid, and polygon models" met geautomatiseerd pushback-management en ondersteuning voor meerdere pits ([3ds.com/products/geovia/minesched](https://www.3ds.com/products/geovia/minesched), [discover.3ds.com](https://discover.3ds.com/geovia-mining-software)).
- **Whittle** is de facto de industriestandaard voor strategische open-pit-optimalisatie ([miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/category/mine-planning-design)).
- De standaardwerkstroom Surpac → Whittle → MineSched is zo ingeburgerd dat er commerciële trainingen omheen bestaan ([Udemy](https://www.udemy.com/course/pelatihan-mineplan-nikel-surpac-whittle-minesched-software/), [acala.co.id](https://acala.co.id/integrated-mine-planning-with-geovia-surpac-whittle-and-minesched/)).
- Positionering: MineSched is historisch het toegankelijker/goedkopere alternatief voor Deswik en verliest terrein aan Deswik in complexe underground-toepassingen **[SCHATTING op basis van productiepositionering; niet met omzetcijfers bevestigd]**.

**7. Datamine (Vela Software / Constellation Software) — Studio OP/UG/RM, MineScape, Minemax**

- Vela Software Group is eigenaar van **Datamine, acQuire, Minemax, Centric en Snowden-Optiro** ([im-mining.com/tag/vela-software](https://im-mining.com/tag/vela-software/), [velasoftwaregroup.com](https://velasoftwaregroup.com/portfolio/metals-and-mining/)).
- **Minemax Scheduler** is het strategische optimalisatieproduct, draait op **IBM CPLEX** ([miningsoftwarereviews.com/software/minemax-scheduler](https://www.miningsoftwarereviews.com/software/minemax-scheduler)); **Minemax Tempo** dekt detailplanning van 2 jaar tot LOM op maandresolutie ([miningsoftwarereviews.com/software/minemax-tempo](https://www.miningsoftwarereviews.com/software/minemax-tempo)). Minemax werd in februari 2020 door Vela overgenomen ([miningsoftwarereviews.com/vendor/minemax](https://www.miningsoftwarereviews.com/vendor/minemax)).
- **MineScape** is de kolen-/gelaagde-afzettingsspecialist ([miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/category/mine-planning-design)).

**8. Long tail:** MiningMath (direct block scheduling), K-MINE, Carlson Mining, ThreeDify GeoMine, Bentley MineCycle Designer, Opencontour (cloud, gepubliceerde prijzen), Incline (open source) ([miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/category/mine-planning-design), [github.com/Incline-Developers/Incline](https://github.com/Incline-Developers/Incline)).

### 2.2 Rangorde B — Projectplanning voor kapitaalprojecten en shutdowns

**1. Oracle Primavera P6 — onbetwiste standaard**

Oracle positioneert P6 EPPM als "the global standard in Enterprise Portfolio Project Management" ([oracle.com](https://www.oracle.com/construction-engineering/primavera-p6/)). Het bewijs uit de vraagzijde is overtuigend:

- **244 Primavera P6 Scheduler-vacatures** open in Australië op SEEK; **361 Shutdown Planner-vacatures**; recruit.net telt **879** shutdown-plannerposities ([au.seek.com/primavera-P6-scheduler-jobs](https://au.seek.com/primavera-P6-scheduler-jobs), [au.seek.com/shutdown-planner-jobs](https://au.seek.com/shutdown-planner-jobs), [australia.recruit.net](https://australia.recruit.net/search-shutdown-planner-jobs)).
- Shutdown-plannerrollen in mijnbouw/olie&gas vragen expliciet "Primavera P6 or similar" ([TRS Staffing](https://trsstaffing.com/job/shutdown-planner-in-australia-western-australia)); mijnbouwvacatures vragen "detailed schedules using Primavera P6" ([au.jora.com](https://au.jora.com/Shutdown-Planner-jobs)).
- Er bestaan aparte commerciële trainingen voor turnaround-management in P6 ([Emerald Associates T100](https://emerald-associates.com/training/course-descriptions/t100-turnaround-management)).

**Wie gebruikt wat:**

| Rol | Mijnplanning | Projectplanning | Shutdown |
|---|---|---|---|
| **Opdrachtgever (mijnbouwbedrijf)** | Deswik / XPAC / MinePlan / Vulcan+Evolution — meerdere pakketten naast elkaar, vaak per site verschillend | P6 (owner's schedule, integrated master schedule) + PRISM/InEight/Cleopatra voor kosten/EVM | P6 + CMMS (SAP PM) + Prometheus |
| **EPCM/engineeringbureau** (Fluor, Bechtel, Hatch, Worley, Ausenco) | Zelden — leveren mijnontwerp soms in Deswik/Vulcan als de klant dat vraagt | **P6, vrijwel uitsluitend** — inclusief Level 1–4 schema's, EVM, claimondersteuning | n.v.t. |
| **Hoofdaannemer / mijnbouwcontractor** (Thiess, Macmahon, Byrnecut, Barminco/Perenti, Redpath) | Deswik of XPAC, vaak omdat de opdrachtgever dat voorschrijft | P6 of MS Project | P6 |
| **Onderaannemer / gespecialiseerd** (Monadelphous, RME, shaft sinkers) | Nee | MS Project of P6-lite | P6 (opgelegd) of Excel |
| **Consultant / LTA / claimexpert** (SRK, Micon, AMC, Snowden-Optiro) | Minemax, Whittle, Deswik, XPAC | P6 + Safran Risk / Acumen Risk voor Monte Carlo | n.v.t. |

**2. Risicoanalyse-laag (bovenop P6)**

- **Safran Risk / Safran Project** — Safran positioneert Safran Project als "the most powerful project planning and control software tool available today… unites project scheduling, planning, risk analysis and execution" ([safran.com](https://www.safran.com/en-gb/project-management-tools)). Safran bedient olie & gas, energie, bouw, luchtvaart, defensie en infrastructuur ([saasrat.com](https://saasrat.com/products/safran-project)). Er wordt actief mijnbouw-specifieke opleiding aangeboden ("Industry Focus – Safran Risk Masterclass – Mining", [ferryfieldgroup.com](https://www.ferryfieldgroup.com)). **Kanttekening: mijn zoekopdrachten leverden geen bevestigde, met naam genoemde grote mijnbouwklanten van Safran op.** Safran's kernpositie zit in Noordzee-olie&gas; mijnbouw is een aangrenzende markt waar het via project-controls-consultants binnenkomt. **[SCHATTING: Safran is in mijnbouw een nicheaanbieder met eencijferig marktaandeel in de risicolaag, sterk geconcentreerd in Noorwegen/UK/Australië.]**
- **Acumen Risk** (Deltek) — Monte Carlo, integreert met Primavera, MS Project en Open Plan ([LinkedIn/Intaver-analyse](https://www.linkedin.com/pulse/comparative-analysis-schedule-risk-tools-intaver-institute-inc-vimsc)).
- **Oracle Primavera Risk Analysis** — Oracle's eigen Monte Carlo-tool ([iqrm.net](https://iqrm.net/blog/primavera-risk-analysis)).

**3. Kosten/EVM/project-controls-laag**

- **Contruent Enterprise (voorheen ARES PRISM)** — "integrates cost and schedule, change management, estimating, earned value, contracts & procurement" ([projectcontrolacademy.com](https://www.projectcontrolacademy.com/integrated-project-controls-software/)). Bewezen mijnbouwreferentie: **Adani Mining** implementeerde PRISM om spreadsheets te elimineren en out-of-the-box te integreren met SAP en Primavera ([Contruent case study](https://info.contruent.com/case-study-integration-of-cost-and-schedule-at-adani-mining)).
- **InEight** — ontstaan binnen Kiewit als "modular, integrated project controls platform for the capital construction industry" ([kiewit.com](https://www.kiewit.com/about-us/technology-at-kiewit/ineight/)).
- **Cleopatra Enterprise** — heeft een expliciete mijnbouwpropositie ([cleopatraenterprise.com/industries/…mining-minerals-metals](https://cleopatraenterprise.com/industries/cleopatra-enterprise-for-mining-minerals-metals/)) en dekt ook turnaround-management.
- **Oracle Primavera Unifier** — mijnbouwreferentie: Tronox (titaandioxide) implementeerde P6 + Unifier met SAP-integratie ([gaeaglobal.com](https://gaeaglobal.com/leading-titanium-dioxide-company-deploys-primavera-unifier-p6-and-integrates-with-sap-for-real-time-project-transparency/)).

**4. Shutdown/turnaround-laag**

- **Prometheus Group** — "tracking of turnaround planning, costs, scope, and materials", diep geïntegreerd met SAP PM ([prometheusgroup.com](https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage), [sap.com](https://www.sap.com/products/erp/partners/prometheus-group-inc-prometheus-sto-manager.html)). Bewezen mijnbouwreferentie: **Cameco** (uranium) implementeerde Prometheus Planning & Scheduling for SAP op Cigar Lake ([casestudies.com](https://www.casestudies.com/company/prometheus-group/case-study/cameco-corporation-finds-their-true-north-with-prometheus-planning-scheduling-for-sap)).

**5. Short-interval-control-laag (de derde stack)**

Deze laag ligt tússen mijnplanning en uitvoering, en is de snelst groeiende. SIC-software "digitaliseert het whiteboard van de shift boss" en verdeelt een 12-uursshift in intervallen van 2–4 uur ([miningsoftwarereviews.com/category/mine-operations-sic/guide](https://www.miningsoftwarereviews.com/category/mine-operations-sic/guide)). Spelers: **Deswik.OPS**, **Micromine Pitram**, **Wenco**, **ABB OMS**, **GroundHog**, **Minetec** ([deswik.com/products/ops](https://www.deswik.com/products/ops), [micromine.com/pitram-sic](https://www.micromine.com/pitram-sic/), [wencomine.com](https://www.wencomine.com/), [new.abb.com](https://new.abb.com/mining/digital-applications/operations-management-system-oms-for-mining/digitalization-of-short-interval-control-(sic)-and-production-scheduling-in-mining), [groundhogapps.com](https://groundhogapps.com/groundhog-short-interval-control/)).

---

## 3. Wat ervoor betaald wordt

### 3.1 Structureel kenmerk: mijnplanningsleveranciers publiceren geen prijzen

MiningSoftwareReviews stelt dit expliciet: Deswik, Vulcan, Datamine en Micromine "do not publish prices for a reason… the number is built for a major. If your software budget is under $5K, the brochure tour does not help you" ([miningsoftwarereviews.com/articles/pit-optimization-software-junior-miners](https://www.miningsoftwarereviews.com/articles/pit-optimization-software-junior-miners)). Dat is de eerlijkste samenvatting van deze markt die ik heb gevonden: prijsstelling is volledig onderhandeld, per klant, per modulesamenstelling.

### 3.2 Gevonden prijsankers — mijnplanning

| Product | Prijs | Bron | Betrouwbaarheid |
|---|---|---|---|
| **Opencontour** (cloud, open pit) — gratis tier | USD 0 | [opencontourmining.com/pricing](https://www.opencontourmining.com/pricing) | Hoog — gepubliceerd |
| **Opencontour+ Pro** | **USD 249/maand** (≈ USD 2.988/jaar) | idem | Hoog |
| **Opencontour Scheduling-module** | **USD 399/maand** (≈ USD 4.788/jaar) | idem | Hoog |
| **Opencontour Stacking-module** | **USD 499/maand** (≈ USD 5.988/jaar) | idem | Hoog |
| **K-MINE** | "transparent annual subscriptions, modular licensing… No long-term lock-in" — bedragen niet ophaalbaar (403) | [k-mine.com/mining-software/pricing](https://k-mine.com/mining-software/pricing/) | Model bevestigd, bedragen niet |
| **Deswik.Spatial** (voorbeeldofferte) | **USD 15.755,56 voor 12 maanden abonnement** | Scribd-document "Deswik.Spatial License Proposal" ([scribd.com/document/841037166](https://www.scribd.com/document/841037166/)) | **Laag — één gelekt document, niet door Deswik bevestigd. Behandel als indicatie, niet als lijstprijs.** |
| **Deswik** algemeen | "The price depends on the set of modules. Additionally, the cost includes the cost of training courses." | r/mining via zoeksnippet ([reddit.com/r/mining/comments/14uy5tl](https://www.reddit.com/r/mining/comments/14uy5tl/)) | Laag — anekdotisch, thread niet integraal leesbaar |
| **Deswik** commercieel model | "deswik came in and offered a small annual cost" tegenover grote upfront-bedragen van concurrenten | r/mining via zoeksnippet ([reddit.com/r/mining/comments/16dby3w](https://www.reddit.com/r/mining/comments/16dby3w/)) | Laag — maar strategisch consistent met Deswik's marktaandeelwinst |
| **Micromine** relatief | biedt "more affordable licensing options compared to enterprise-level mining platforms" | [us.fitgap.com](https://us.fitgap.com/products/023959/micromine) | Middel |
| **Junior-miner budgetdrempel** | onder **USD 5.000** valt buiten het bereik van enterprise-suites | [miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/articles/pit-optimization-software-junior-miners) | Hoog |

**[SCHATTING] Typische enterprise mijnplanningslicentie:** op basis van (a) Deswik's 32.000 *gebruikers* bij een omzetbasis die in 2021 AUD 79 mln bedroeg, (b) de Opencontour-prijspunten als ondergrens voor cloudscheduling, en (c) de door de sector genoemde bandbreedte van USD 10.000–20.000 per zitplaats per jaar die in zoekresultaten opduikt, kom ik op:
- **Instap/enkele module: USD 5.000–12.000 per gebruiker per jaar**
- **Volledige planningsuite (design + scheduling + optimalisatie): USD 15.000–35.000 per gebruiker per jaar**
- **Site-license / enterprise agreement bij een Tier-1 miner: USD 250.000 – 2.000.000+ per jaar**, afhankelijk van aantal sites
Let op: Deswik's eigen cijfers geven een *gemiddelde* van AUD 79 mln ÷ 32.000 ≈ **AUD 2.470 per gebruiker per jaar**. Dat gemiddelde is veel lager dan bovenstaande bandbreedte omdat het viewer-gebruikers, studentenlicenties, gratis vSched-installaties en volumekortingen bij Tier-1-contracten meetelt. **De werkelijke prijs voor een volwaardige planner-seat ligt aanzienlijk hoger dan het gemiddelde; het gemiddelde is geen prijs.**
**[GECORRIGEERD bij verificatie]** Deze deling is nóg zwakker dan hierboven toegegeven, om drie redenen: (a) de teller is *omzet over rolling-12m okt-2021*, de noemer is een **gebruikers**telling van de huidige Deswik-website (2026) — vier jaar uit elkaar; (b) 32.000 zijn *users*, geen licenties (§2.1); (c) de AUD 79 mln bevat óók Deswik.Spatial (CAD), consultancy en niet-planningmodules. Het getal AUD 2.470 heeft daarmee geen betekenis als prijsanker en is hier alleen behouden als illustratie van hoe misleidend een omzet-per-gebruiker-deling is.

### 3.3 Gevonden prijsankers — projectplanning

| Product | Prijs | Bron |
|---|---|---|
| **Primavera P6 Professional** — eeuwigdurende licentie | **USD 2.500–3.500 per gebruiker** | [ITQlick](https://www.itqlick.com/primavera-p6/pricing) |
| **Primavera P6** — jaarlijkse enkelgebruikerslicentie | ca. **USD 2.500/jaar** | [ITQlick](https://www.itqlick.com/oracle-primavera-p6/pricing) |
| **Primavera P6 Professional** — concurrent user | **USD 3.000–8.000 per concurrent licentie** | [VendorBenchmark](https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing) |
| **Oracle Primavera P6** — cloud/abonnement | vanaf **USD 175/maand per gebruiker** (≈ USD 2.100/jaar) | [contractorsandbuilders.com](https://contractorsandbuilders.com/pricing/oracle-primavera/) |
| **Primavera P6** — enterprise all-in budgetadvies | ca. **USD 10.000 per gebruiker per jaar** | [contractorgearlab.com](https://contractorgearlab.com/2026/03/28/how-much-does-primavera-p6-license-cost-2026/) |
| **Acumen Risk** | **USD 10.300** eerstejaarskosten | [LinkedIn/Intaver](https://www.linkedin.com/pulse/comparative-analysis-schedule-risk-tools-intaver-institute-inc-vimsc) |

Deze bronnen zijn secundaire prijsvergelijkers en geen Oracle-prijslijsten; behandel ze als bandbreedte, niet als offerte.

### 3.4 Personeelskosten — de echte kostenpost

De licentie is bijna altijd een fractie van de personeelskosten die eromheen zitten:

- **Project Scheduler Australië:** gemiddeld **A$104.250/jaar** (A$50/uur), 90e percentiel **A$168.500** ([Glassdoor AU](https://www.glassdoor.com.au/Salaries/project-scheduler-salary-SRCH_KO0,17.htm)).
- **Planner/Scheduler Australië:** gemiddeld **A$105.900/jaar**, 90e percentiel **A$230.759** ([Glassdoor AU](https://www.glassdoor.com.au/Salaries/planner-scheduler-salary-SRCH_KO0,17.htm)).
- **Project Scheduler Australië (SalaryExpert):** **A$111.328/jaar** bruto ([SalaryExpert](https://www.salaryexpert.com/salary/job/project-scheduler/australia)).
- **Mining & Geological Engineers VS:** ca. **7.000 banen (2024)**, mediaan **USD 101.020/jaar**, groei **+1% 2024–2034**, ca. **400 vacatures/jaar** ([US BLS](https://www.bls.gov/ooh/architecture-and-engineering/mining-and-geological-engineers.htm)).
- **Principal Mining Consultant:** **USD 141.000–160.000/jaar** ([Careermine](https://careermine.com/jobs)).

**[SCHATTING] Verhouding:** bij een licentie van USD 15.000/jaar en een volledig belaste planner van USD 180.000/jaar is de software **circa 8% van de kosten van de zitplaats**. Dat maakt de prijsgevoeligheid op licenties structureel laag — en verklaart waarom leveranciers zonder gepubliceerde prijzen kunnen wegkomen.

### 3.5 Implementatie- en trainingskosten

- Deswik biedt **gratis online training** via het Deswik Training Portal aan bestaande klanten ([deswik.com](https://www.deswik.com/documentation/a-customer-s-guide-to-the-deswik-training-portal)) — een bewuste lock-in-strategie: de trainingsdrempel wordt weggenomen zodra je klant bent.
- Derde partijen bieden losse Deswik-cursussen aan voor **USD 150 per cursus** (+USD 15 certificaat) ([Scribd/DESWIK TRAINING](https://www.scribd.com/document/838772487/DESWIK-TRAINING)) — dit zijn onafhankelijke instructeurs in opkomende markten, geen leveranciersprijzen.
- Anekdotisch is bevestigd dat Deswik-prijzen "the cost of training courses" bevatten ([r/mining snippet](https://www.reddit.com/r/mining/comments/14uy5tl/)).
- **[SCHATTING] Implementatie:** voor een enterprise mijnplanningsuitrol bij een Tier-1 miner reken ik op **0,5–1,5× de jaarlijkse licentiewaarde** aan implementatie, datamigratie en configuratie in jaar 1 — lager dan in bouw/ERP omdat de tools per site worden uitgerold en niet enterprise-breed geïntegreerd hoeven te worden. Voor een geïntegreerd project-controls-platform (PRISM/InEight/Cleopatra + P6 + SAP-koppeling, zoals bij Adani Mining) ligt dat op **1,5–3× de licentiewaarde**, omdat de ERP-integratie het zwaarste onderdeel is.

### 3.6 Betalingsbereidheid: **HOOG**, maar asymmetrisch

**Waarom hoog:**

1. **De waarde-per-beslissing is extreem.** Strategische planningstools kunnen volgens onafhankelijke analyse **5–15% NPV-verbetering** opleveren via scenariotesten ([miningsoftwarereviews.com/category/mine-planning-design/guide](https://www.miningsoftwarereviews.com/category/mine-planning-design/guide)). Bij een project van USD 1 mrd is dat USD 50–150 mln — tegenover een licentiepost van tienduizenden.
2. **EY becijfert dat betere projectbeheersing 15–30% van de projectwaarde kan terugwinnen** ([EY](https://www.ey.com/en_rs/insights/energy-resources/how-better-project-management-can-boost-minings-capital-productivity)).
3. **Downtime is meetbaar en brutaal:** USD 100.000/uur voor een grote koper-SAG-mill ([RME Global](https://rmeglobal.com/resources/about-mill-reline-director-part-i/)).
4. **De markt bewijst het met transactieprijzen.** Weir betaalde voor Micromine een EV van **£624–657 mln** tegen een verwachte CY2025-omzet van **ca. £68 mln (A$138 mln)** — een **EV/omzet-multiple van ca. 10× en een EBITDA-multiple van ca. 20×** ([London Stock Exchange](https://www.londonstockexchange.com/news-article/WEIR/acquisition/16919089), [InvestMETS](https://www.investmets.com/weir-buys-micromine-for-a1-31b/)). Caterpillar betaalde **A$1,12 mrd / USD 728 mln** voor RPMGlobal, met een **premie van 32,6%** op de laatste slotkoers van A$3,77 ([Reuters](https://www.reuters.com/world/asia-pacific/caterpillar-acquire-australias-rpmglobal-728-million-2025-10-12/), [clearlyacquired.com](https://clearlyacquired.com/blog/caterpillar-announces-acquisition-of-rpmglobal-in-strategic-move)). Voor Deswik schatten analisten "well north of A$500 million" bij een omzet van AUD 79 mln, EBITA-marge ca. 30% en 45% terugkerende omzet ([InvestMETS](https://www.investmets.com/sandvik-beats-hot-field-to-take-out-deswik/)). **Dit zijn softwaremultiples uit de bovenste regionen — kopers geloven in de prijszettingsmacht van deze categorie.**
5. **Retentiecijfers bevestigen lock-in.** RPMGlobal rapporteerde over FY2025 een **subscription Net Revenue Retention van 115%** en **Gross Revenue Retention van 94%**, bij een **brutomarge van 96,3%** ([InvestorPA / RPMGlobal FY2025 Investor Presentation](https://investorpa.com), [listcorp.com](https://listcorp.com)). Zulke cijfers krijg je alleen bij vastgeroeste workflows.

**Waar de bereidheid laag is:**

- **Junior miners en exploratiebedrijven.** Budget onder USD 5.000 valt volledig buiten het bereik van de enterprise-suites ([miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/articles/pit-optimization-software-junior-miners)). Dit segment werkt met Excel, academische licenties (vaak met een verbod op commercieel of JORC-rapporteerbaar gebruik) en open-source Python (pyomo, PuLP, OR-Tools).
- **Projectplanning aan de contractantenkant.** Omdat P6 door de opdrachtgever wordt voorgeschreven en de prijs bekend en gestandaardiseerd is, is er geen ruimte voor waarde-gebaseerde prijsstelling. Dit is de laagmarge-helft van de markt.
- **Onderaannemers.** Die krijgen het schema opgelegd en willen er niet voor betalen — de facto het domein van MS Project, Excel en gratis viewers (zoals Deswik.vSched, "a free, standalone application to view Deswik Planning's schedule files", [deswik.com/products/vsched](https://www.deswik.com/products/vsched)).

---

## 4. Segmentomvang: raming met expliciete redenering

### 4.1 Waarom ik analistencijfers niet als basis gebruik

De gepubliceerde "mine planning software market"-ramingen voor hetzelfde jaar 2025 lopen uiteen van **USD 504 mln** ([Market Research Intellect](https://www.marketresearchintellect.com/product/mine-planning-software-market/)) tot **USD 1,91 mrd** ([DataIntelo](https://dataintelo.com/report/mine-planning-software-market)), met USD 1,5 mrd ([Verified Market Reports](https://www.verifiedmarketreports.com/product/mine-planning-software-market/)), USD 1,54 mrd ([PW Consulting](https://pmarketresearch.com/worldwide-mine-planning-software-market-research/)) en USD 887 mln voor 2024 ([QY Research](https://www.qyresearch.com/reports/4140764/mine-planning-software)) ertussenin. Een factor 3,8 spreiding betekent dat deze rapporten geen bruikbare basis vormen. De bredere "mining software market" is nog erger: van **USD 6,64 mrd** ([Market Research Future](https://www.marketresearchfuture.com/reports/mining-software-market-29412)) tot **USD 35,2 mrd** ([Emergen Research](https://www.emergenresearch.com/industry-report/mining-software-market)).

Ik bouw daarom bottom-up op uit **gepubliceerde leveranciersomzetten**, wat in deze sector uitzonderlijk goed kan omdat vier van de grootste spelers recent zijn overgenomen en hun cijfers openbaar zijn geworden.

### 4.2 Bekende leveranciersomzetten (harde cijfers)

| Leverancier | Omzet | Jaar | Bron |
|---|---|---|---|
| **Micromine** | **USD 85 mln** (≈ £68 mln / A$138 mln) | 2025 | [InvestMETS](https://www.investmets.com/weir-deal-reignites-mining-software-battle/), [InvestMETS](https://www.investmets.com/weir-buys-micromine-for-a1-31b/) |
| **RPMGlobal** — totaal | **A$73,9 mln** (+6,5% j-o-j, vanaf A$69,4 mln FY2024) ~~A$76,7 mln~~ | FY2025 | [StockAnalysis ASX:RUL](https://stockanalysis.com/quote/asx/RUL/financials/) |
| **RPMGlobal** — software ARR | **A$71,8 mln** (+16%) | aug-2025 | [InvestorPA / RPMGlobal FY2025 Investor Presentation](https://investorpa.com) |
| **RPMGlobal** — TCV-verkopen | **A$100,8 mln** (+30,9%) | FY2025 | [kapitales.com.au](https://kapitales.com.au) |
| **RPMGlobal** — onvoltooid TCV | **A$200 mln** | 30-jun-2025 | [strawman.com](https://strawman.com), [listcorp.com](https://listcorp.com) |
| **RPMGlobal** — softwarebusiness | ca. **A$75 mln** (≈ USD 46–50 mln) | 2025 | [InvestMETS](https://www.investmets.com/weir-deal-reignites-mining-software-battle/) |

**[GECORRIGEERD bij verificatie]** Deze twee RPMGlobal-regels zijn géén twee onafhankelijke datapunten. InvestMETS meldt dat RPMGlobal "just agreed to sell its mining consulting arm to SLR Consulting to focus on its c**A$75 million-a-year software business**" ([InvestMETS](https://www.investmets.com/weir-deal-reignites-mining-software-battle/)) — na die afsplitsing ís het softwarebedrijf vrijwel het hele bedrijf. De statutaire FY2025-omzet van A$73,9 mln en de "softwarebusiness van ca. A$75 mln" beschrijven dus dezelfde onderneming. Dat verklaart óók waarom de software-ARR (A$71,8 mln) bijna gelijk is aan de totale omzet — wat bij de oorspronkelijke lezing ("A$76,7 mln totaal, waarvan A$75 mln software") een implausibele adviesomzet van A$1,7 mln zou impliceren. In de bottom-up van §4.3 is RPMGlobal éénmaal geteld (USD 46–50 mln), dus er is geen dubbeltelling in de raming zelf.
| **Deswik** | **AUD 79 mln** (rolling 12m) | okt-2021 | [Sandvik](https://www.home.sandvik/en/news-and-media/news/2022/04/sandvik-completes-the-acquisition-of-the-leading-mine-planning-software-company-deswik/) |
| **Deswik** — bijdrage aan Sandvik Mining | **SEK 620 mln** | 2022 | [Sandvik Annual Report 2022](https://www.home.sandvik/siteassets/investors/reports--presentations/annual-reports/annual-report-2022.pdf) |
| **Deswik** — marge/recurring | EBITA-marge ca. **30%**, **45% recurring** op ca. USD 60 mln | 2021 | [InvestMETS](https://www.investmets.com/sandvik-wraps-up-deswik-deal/) |
| **Sandvik Digital Mining Technologies** | "double-digit organic revenue growth" (geen absoluut cijfer gepubliceerd) | 2025 | [Sandvik Annual Report 2025](https://www.annualreport.sandvik/en/2025/) |
| **Hexagon** — mijnbouwgerelateerde software/sensors/controls | **USD 566 mln** (9% van totale omzet) | 2025 | [InvestMETS Global Mining Tech 50 2026](https://www.investmets.com/global-mining-tech-50-2026/) |
| **ABB** — mijnbouw/metaal-tech | **USD 1.489 mln** | 2025 | [InvestMETS Global Mining Tech 50 2026](https://www.investmets.com/global-mining-tech-50-2026/) |
| **"Mining tech 50" gezamenlijk** | **USD 6,8 mrd** mijnbouw/metaalomzet | 2025 | [InvestMETS](https://www.investmets.com/global-mining-tech-50-2026/) |
| **"Smart mining"-technologie totaal** | ca. **USD 10 mrd** (op basis van werkelijke mining-tech-verkopen) | 2025 | [InvestMETS](https://www.investmets.com/weir-deal-reignites-mining-software-battle/) |

Niet-gepubliceerd: **Datamine/Vela** (Constellation Software rapporteert niet per business unit), **Maptek** (privaat), **Dassault GEOVIA** (niet apart gerapporteerd).

### 4.3 Raming Segment A — mijnplanningssoftware (design + scheduling + optimalisatie)

**[SCHATTING]** Bottom-up optelling voor 2025:

| Leverancier | Omzet (USD mln) | Basis |
|---|---|---|
| Deswik (Sandvik DMT) | **110–135** | Zie correctie hieronder |
| Micromine (Weir) | **85** | Hard cijfer |
| RPMGlobal (Caterpillar) | **46–50** | Hard cijfer, software-deel |
| Hexagon MinePlan (planningsoftware alleen) | **60–100** | Afgeleid uit USD 566 mln mijnbouwomzet, waarvan het grootste deel sensors/controls/autonomie is; planning is de kleinere component |
| Maptek (Vulcan + Evolution) | **80–120** | Privaat; geschat op vergelijkbare installed base met Micromine |
| Datamine-groep (incl. Minemax, MineScape, acQuire, Snowden-Optiro) | **100–160** | Privaat; brede portfolio maar veel niet-planning (resource-database, geologie) |
| Dassault GEOVIA (Surpac, Whittle, MineSched, GEMS) | **60–100** | Niet apart gerapporteerd; historisch grote installed base, afnemend marktaandeel |
| Long tail (MiningMath, K-MINE, Carlson, ThreeDify, Opencontour, Bentley MineCycle, Minetec, GroundHog e.d.) | **40–70** | Optelling van kleine spelers |
| **Totaal mijnplanningssoftware** | **USD 580–820 mln** | |

**[GECORRIGEERD bij verificatie — Deswik-regel]** De oorspronkelijke redenering luidde: "AUD 79 mln (≈USD 57 mln) in 2021, met bevestigde 'double-digit' organische groei 2022–2025; bij 15%/jr → USD ~100 mln, plus de acquisities binnen DMT". Daar zitten twee problemen in:
- **De uitkomst volgt niet uit de redenering.** USD 57 mln × 1,15⁴ = USD 100 mln, niet 110–135 mln. Het gat wordt gedicht met "plus de acquisities binnen DMT" — maar Sandvik Digital Mining Technologies bevat óók Newtrax, Polymathian en andere niet-mijnplanningsactiva. Zodra je die meetelt, meet je niet langer mijnplanningssoftware. Dat is definitie-inflatie in de richting van een hogere marktomvang.
- **Er ligt een beter, ongebruikt anker in het rapport zelf.** Sandvik AR2022 rapporteert een Deswik-bijdrage van **SEK 620 mln** over de periode ná afronding (4 april 2022, dus ~9 maanden). Geannualiseerd is dat ca. SEK 827 mln ≈ **USD 82 mln in 2022** — aanzienlijk hoger dan de USD 57 mln waar de tekst mee rekent. Vanaf USD 82 mln met 15%/jr over drie jaar kom je op **USD ~125 mln in 2025**, wat de band 110–135 wél ondersteunt zónder de DMT-acquisities mee te tellen.
De band 110–135 blijft dus staan, maar op een andere onderbouwing. **Let op: de SEK-annualisering is mijn eigen bewerking en Sandvik publiceert geen losse Deswik-omzet meer; behandel deze regel als de zwakste in de tabel.** Sandvik zelf spreekt in AR2025 bovendien niet over "double-digit organic revenue growth" van DMT afzonderlijk, maar over "double-digit growth in our software businesses (Digital Mining Technologies **and Intelligent Manufacturing**)" — een gecombineerde uitspraak over twee divisies ([Sandvik AR2025](https://www.annualreport.sandvik/en/2025/)).

**Sanity check:** dit bereik overlapt netjes met de meest conservatieve analistenschattingen (QY Research USD 887 mln voor 2024; 24 Market Reports USD 752 mln voor 2023) en verwerpt de USD 1,5–1,9 mrd-ramingen als te ruim gedefinieerd (die tellen vermoedelijk fleet management en operations mee).

**Alleen het scheduling-deel** (dus zonder geologische modellering, resource-estimatie, pure CAD, drill & blast): **[SCHATTING] 30–40% → USD 175–330 mln, midpunt ca. USD 250 mln (2025).**

### 4.4 Raming Segment B — projectplanning & shutdown-planning in mijnbouw

**[SCHATTING]** Bottom-up via zitplaatsen:

*Stap 1 — aantal zitplaatsen.* Uitgaande van 8.508 operationele mijn- en verwerkingsfaciliteiten wereldwijd ([ICMM](https://www.icmm.com/global-datasets/mining-metals-facilities)), waarvan naar schatting 2.500–3.000 groot genoeg zijn voor een eigen projectcontrol-/shutdownfunctie:

| Groep | Zitplaatsen | Redenering |
|---|---|---|
| Opdrachtgevers (mijnbouwbedrijven) | 5.000–10.000 | 2.500 significante sites × 2–4 project-/shutdownplanners |
| EPCM/engineering (mijnbouwdeel van Fluor, Bechtel, Hatch, Worley, Ausenco, Wood, AtkinsRéalis, DRA, Lycopodium, Sedgman, Stantec, WSP) | 3.000–6.000 | Aandeel mijnbouw in de project-controls-populatie van deze bureaus |
| Mijnbouwcontractors (Thiess, Perenti/Barminco, Macmahon, Byrnecut, Redpath, Cementation, Monadelphous, MIP) | 2.000–4.000 | Grote gespecialiseerde aannemers met eigen planningsteams |
| Consultants, LTA's, claim-/forensische experts | 500–1.000 | SRK, Micon, AMC, Snowden-Optiro, Masin, Kroll e.d. |
| **Totaal** | **10.500–21.000**, rekenkundig midpunt **15.750**, conservatief gerekend met **15.000** | |

Sanity check tegen vacaturedata: Australië alleen al heeft 244 openstaande P6-schedulerposities en 361 shutdown-plannerposities ([SEEK](https://au.seek.com/primavera-P6-scheduler-jobs), [SEEK](https://au.seek.com/shutdown-planner-jobs)); Australië is ca. 10–15% van de wereldwijde mijnbouw-projectcontrolmarkt. Dat is consistent met een orde van 10.000–20.000 zitplaatsen wereldwijd.

*Stap 2 — prijs per zitplaats.* Geannualiseerde P6-kosten inclusief support: USD 2.100–3.500/jaar op basis van de gevonden prijsankers ([ITQlick](https://www.itqlick.com/primavera-p6/pricing), [contractorsandbuilders.com](https://contractorsandbuilders.com/pricing/oracle-primavera/)). Gebruik **USD 2.500** als effectief gemiddelde na volumekortingen.

*Stap 3 — optellen.*

| Component | Bedrag (USD mln/jaar) | Redenering |
|---|---|---|
| Scheduling-licenties (P6, MS Project, Safran, Asta) | **30–45** ~~30–50~~ | 15.000 zitplaatsen × USD 2.000–3.000 |
| Risicoanalyse (Safran Risk, Acumen, PRA) | **10–20** | ~10% van de zitplaatsen tegen een *terugkerende* prijs van ca. USD 7.000–13.000 (Acumen USD 10.300 is een **eerstejaars**bedrag, geen renewal) |
| Kosten/EVM/project-controls-platforms (Contruent PRISM, InEight, Cleopatra, Unifier) | **80–140** | ~200 enterprise-platformcontracten bij grote mijnbouwbedrijven en EPCM-bureaus à USD 400k–700k/jaar |
| Shutdown/turnaround (Prometheus, SAP-add-ons, STO-tooling) | **50–90** | Australië A$13,3 mrd onderhoudsuitgaven ([mining.com.au](https://mining.com.au/mining-maintenance-spending-slowing-oxford-economics-australia/)) → bij een Australisch aandeel van 10–15% wereldwijd ca. USD 58–87 mrd onderhoud; STO-softwarepenetratie ca. 0,1% daarvan |
| **Totaal segment B — licenties/abonnementen** | **USD 170–295 mln** ~~170–300~~ | |

**[GECORRIGEERD bij verificatie — drie rekenfouten in deze tabel]**
1. **Regel 1 was fout:** 15.000 × USD 2.000–3.000 = USD **30–45** mln, niet 30–50 mln. De bovengrens was ~11% te hoog. (Bij het strikte middelpunt van 15.750 zitplaatsen wordt het 31,5–47 mln; bij de in stap 2 voorgeschreven USD 2.500 effectief gemiddelde is de puntschatting USD 37,5 mln.)
2. **Regel 2 was intern inconsistent:** "15% van 15.000 zitplaatsen × USD 10.300" = USD **23,2** mln, wat bóven de opgegeven band van 10–20 mln ligt. De uitkomst 10–20 mln is verdedigbaar, maar alleen als je (a) een lagere penetratie én (b) een renewal-prijs in plaats van de eerstejaarsprijs hanteert. De redenering is hierboven daarnaar herschreven.
3. **Regel 3 was intern inconsistent:** "150–250 × USD 300k–1 mln" = USD **45–250** mln, een veel bredere band dan de opgegeven 80–140 mln. De 80–140 mln is een oordeel, geen product van de genoemde parameters; de redenering is hierboven gecorrigeerd naar parameters die de uitkomst wél opleveren.
4. Regel 4 had geen doorgerekende afleiding; die is nu expliciet gemaakt. Het blijft een grove extrapolatie — zie §Verificatie, punt V9.

### 4.5 Totale segmentomvang

**[SCHATTING] Planningssoftware voor mijnbouw en grondstoffen, 2025:**

| Definitie | Omvang (USD, 2025) | Opbouw |
|---|---|---|
| **Eng: pure scheduling-licenties/abonnementen** (mijnschema + projectschema, exclusief geologie/CAD/EVM-platform én exclusief risicoanalyse) | **USD 205–375 mln**, midpunt **ca. USD 290 mln** | 175–330 (A, scheduling-deel) + 30–45 (B, scheduling-licenties) |
| *variant: eng inclusief schema-risicoanalyse* | **USD 215–395 mln**, midpunt ca. USD 305 mln | + 10–20 (B, risicoanalyse) |
| **Middel: alle planningsgerelateerde software** (mijnplanningsuites volledig + projectplanning + EVM + shutdown) | **USD 750 mln – 1,12 mrd**, midpunt **ca. USD 935 mln** | 580–820 (A volledig) + 170–295 (B totaal) |
| **Breed: inclusief implementatie, training, consultancy en project-controls-diensten** | **USD 1,9 – 3,3 mrd** | "Middel" **plus** een dienstencomponent van 1,5–2× de licentiewaarde (dus totaal 2,5–3× licenties): 750 × 2,5 = 1,88 mrd; 1.120 × 3 = 3,36 mrd |

**[GECORRIGEERD bij verificatie — rekenfout in de enge definitie]** De oorspronkelijke band **USD 205–400 mln** was intern inconsistent: de ondergrens 205 = 175 + 30 (scheduling-licenties **zonder** risicoanalyse), maar de bovengrens 400 = 330 + 50 + 20 telde de risicoanalyselaag er wél bij *en* gebruikte de te hoge 50 uit §4.4. Consistent doorgerekend is het **205–375 mln** (excl. risicoanalyse) of **215–395 mln** (incl.). Het midpunt daalt daarmee van "ca. USD 300 mln" naar **ca. USD 290 mln**. De orde van grootte verandert niet; de precisie die "USD 300 mln" suggereert was niet verdiend.

**[GECORRIGEERD bij verificatie — verkeerde wisselkoers]** De oorspronkelijke omrekening gebruikte **1,08 USD/EUR**. Die koers is onjuist: EUR/USD noteert medio juli 2026 rond **1,137**, met een 52-weeksbereik van 1,1325–1,2079 ([Investing.com EUR/USD](https://www.investing.com/currencies/eur-usd)) — 1,08 lag het hele afgelopen jaar buiten bereik. Alle EUR-bedragen in de oorspronkelijke tekst waren daardoor ca. **5% te hoog**.

In EUR (koers **1,137** USD/EUR, juli 2026):

| Definitie | EUR (gecorrigeerd) | ~~EUR (oorspronkelijk, 1,08)~~ |
|---|---|---|
| Eng (excl. risicoanalyse) | **€180–330 mln**, midpunt ca. **€255 mln** | ~~€190–370 mln, midpunt €280 mln~~ |
| Middel | **€660 mln – 985 mln** | ~~€695 mln – 1,04 mrd~~ |
| Breed | **€1,67 – 2,90 mrd** | ~~€1,76 – 3,06 mrd~~ |

Omdat de euro het afgelopen jaar tussen 1,13 en 1,21 heeft bewogen, is de EUR-omvang zelf gevoelig voor de koersdatum: bij 1,21 zakt "eng" naar €170–310 mln. Behandel de EUR-cijfers als afgeleid en volatiel; de USD-cijfers zijn de primaire raming.

### 4.6 Groeirichting

**Opwaarts, en aantoonbaar sneller aan de mijnplanningskant dan aan de projectplanningskant.**

| Indicator | Waarde | Bron |
|---|---|---|
| RPMGlobal software ARR-groei | **+16%** j-o-j (FY2025) | [InvestorPA](https://investorpa.com) |
| RPMGlobal abonnementsomzetgroei | **+20%** (FY2025), tegen +16% in FY2024 | [TipRanks](https://www.tipranks.com) |
| RPMGlobal TCV-verkoopgroei | **+30,9%** naar A$100,8 mln | [kapitales.com.au](https://kapitales.com.au) |
| Micromine omzetgroei | **25% geannualiseerd** (meerjarig) | [newsnreleases.com](https://newsnreleases.com) |
| Sandvik softwarebedrijven (DMT **én** Intelligent Manufacturing, gecombineerd) | "double-digit growth in our software businesses" 2025 — géén losse DMT-cijfers, en het woord *organic* staat er niet | [Sandvik AR2025](https://www.annualreport.sandvik/en/2025/) |
| Analisten-CAGR mine planning software | **8,5–9,4%** | [PW Consulting](https://pmarketresearch.com/worldwide-mine-planning-software-market-research/), [Verified Market Reports](https://www.verifiedmarketreports.com/product/mine-planning-software-market/) |
| "Smart mining"-technologie potentieel | van ca. USD 10 mrd naar **3–4× groter binnen tien jaar** | [InvestMETS](https://www.investmets.com/weir-deal-reignites-mining-software-battle/) |

**[SCHATTING] Groeisplitsing:**
- **Mijnplanning: 10–15% CAGR** — gedreven door abonnementsconversie (perpetual → SaaS), de energietransitievraag naar koper/lithium/nikkel, en de verschuiving van underground-mijnbouw naar diepere en complexere afzettingen.
- **Projectplanning in mijnbouw: 3–6% CAGR** — P6 is een volwassen, verzadigd product; de groei zit in de EVM/kostenlaag en in shutdown-tooling, niet in de scheduler zelf.
- **SIC/short-interval-control: 15–25% CAGR [SCHATTING]** — het jongste en snelst adopterende segment.

### 4.7 De consolidatiegolf — belangrijkste structurele feit van 2025–2026

Binnen twaalf maanden is de helft van de zelfstandige mijnplanningssector opgekocht door equipment-OEM's:

| Deal | Bedrag | Datum | Bron |
|---|---|---|---|
| **Sandvik → Deswik** | naar schatting **>A$500 mln** (niet bekendgemaakt) | afgerond april 2022 | [Sandvik](https://www.home.sandvik/en/news-and-media/news/2022/04/sandvik-completes-the-acquisition-of-the-leading-mine-planning-software-company-deswik/), [InvestMETS](https://www.investmets.com/sandvik-beats-hot-field-to-take-out-deswik/) |
| **Weir → Micromine** | **£624 mln** (EV £657 mln bij aankondiging) / **A$1,31–1,35 mrd** | aangekondigd 28-feb-2025, afgerond Q2 2025 | [LSE](https://www.londonstockexchange.com/news-article/WEIR/acquisition/16919089), [global.weir](https://www.global.weir/newsroom/global-news/2025/weir-completes-acquisition-of-micromine/), [AFR](https://www.afr.com) |
| **Caterpillar → RPMGlobal** | **A$1,12 mrd / USD 728 mln**, A$5,00 per aandeel, 32,6% premie | aangekondigd 12-13 okt 2025, afgerond **17-feb-2026** | [Reuters](https://www.reuters.com/world/asia-pacific/caterpillar-acquire-australias-rpmglobal-728-million-2025-10-12/), [Caterpillar](https://www.caterpillar.com/en/news/corporate-press-releases/h/rpm-global-acquisition.html) |
| **Vela/Constellation → Minemax** | niet bekendgemaakt | februari 2020 | [miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/vendor/minemax) |

Totaal is er de afgelopen vijftien jaar ca. **USD 7,5 mrd aan mijnbouwtechnologie van eigenaar gewisseld**, en de sector verwacht "at least two or three mega mergers in this next five-year window" ([InvestMETS](https://www.investmets.com/global-mining-tech-50-2026/), [InvestMETS](https://www.investmets.com/weir-deal-reignites-mining-software-battle/)). Waarnemers duiden dit als "a wave of acquisitions as OEMs moved to capture the software layer" boven de machinebouw ([LinkedIn](https://www.linkedin.com/posts/gary-poole-a8309113_mining-technology-activity-7438284818926313472-FQtF), [miningbeacon.com](https://miningbeacon.com/industry/mining-soft-wars-heat-up-again)).

**Dit is de belangrijkste openingsdrijfveer van dit hele rapport.** Zie §7.

---

## 5. Sector-specifieke eisen en standaarden

### 5.1 Wat mijnbouw-eigen is

**AACE RP 47R-11 — Cost Estimate Classification System as Applied in the Mining and Mineral Processing Industries.**
Dit is de enige echt mijnbouwspecifieke project-controls-standaard die ik heb kunnen bevestigen. Het geeft richtlijnen voor het classificeren van ramingen "tailored for mining and mineral processing EPC projects", gebaseerd op "design deliverable maturity" en "estimate accuracy" ([AACE 47R-11 inhoudsopgave](https://web.aacei.org/docs/default-source/toc/toc_47r-11.pdf), [volledig document](https://www.geokniga.org/bookfiles/geokniga-aacecostestimateclassificationsystem.pdf)). Klasse-indelingen (Class 5 t/m Class 1) koppelen ramingnauwkeurigheid aan studiefase (Scoping → PFS → FS → detailengineering), en die klassen worden in mijnbouw óók gebruikt om de bijbehorende schemarijpheid te labelen.

**NI 43-101 en de JORC Code.**
Het gepubliceerde productieschema van een mijn is een gereguleerd, beursgevoelig document. Beide codes vragen een QP/CP-ondertekende technische rapportage waarin de mijnplanning, kosten en vergunningen zijn gevalideerd ([OSC NI 43-101](https://www.osc.ca/en/securities-law/instruments-rules-policies/4/43-101/ni-43-101-standards-disclosure-mineral-projects-form-43-101f1-technical-report-and-related), [Gosselin Mining](https://gosselinmining.com/services/technical-reporting-ni43-101-jorc/)). Recente herzieningen van beide codes voegen milieu-, sociale- en gemeenschapsaspecten toe als integraal onderdeel van technische rapportage en projectplanning ([Okane Consultants](https://okaneconsultants.com/ideas/updated-ni-43-101-jorc-code/)).

**Consequentie voor software:** een mijnschema moet auditeerbaar zijn tot op blokniveau, met traceerbaarheid van reservecijfer → ontwerp → schema → gepubliceerde productieprognose. Dat is een reproduceerbaarheidsvereiste die generieke schedulers niet leveren en die de belangrijkste rechtvaardiging vormt voor de dure geïntegreerde suites.

**Bankability / Lender's Technical Advisor.**
Projectfinanciering vereist een onafhankelijke technische toets van mijnontwerp én uitvoeringsschema. Aanbieders: SRK Consulting ([srk.com](https://www.srk.com/en/services/due-diligence-and-project-reviews)), Micon International ([micon-international.com](https://micon-international.com/our-services/independent-engineer-technical-consultant/)), K-MINE ([k-mine.com](https://k-mine.com/pg/independent-technical-review-mining/)), Gad Haran ([gadharan.com](https://gadharan.com/Services/lender-technical-advisor-lta/)).

### 5.2 Wat mijnbouw overneemt uit defensie/bouw

**DCMA 14-Point Schedule Assessment.**
Mijn zoekopdrachten leverden **geen enkele mijnbouwspecifieke toepassing** van DCMA 14-point op — alle treffers waren defensie- en luchtvaartgericht ([schedulelens.com](https://schedulelens.com/blog/dcma-14-point-assessment/), [dcma.mil](https://www.dcma.mil/STANDARDS/)). De standaard wordt wel algemeen omschreven als "tool-agnostic, bare minimum assessment for schedule health" die "originally introduced for DoD schedules" maar "has become an industry standard metric" ([schedulereader.com](https://www.schedulereader.com)). Stantec — actief in mijnbouw — publiceert eigen DCMA-14-materiaal ([Stantec PDF](https://www.stantec.com)).
**Conclusie: DCMA 14-point wordt in mijnbouw gebruikt, maar via de EPCM-bureaus en project-controls-consultants die het uit defensie/infra meebrengen, niet via een sectorspecifiek mandaat. [SCHATTING met matige zekerheid — geen mijnbouwspecifiek voorschrift gevonden.]**

**EVMS / ANSI-EIA-748.**
Idem: mijn zoekopdrachten naar EIA-748 in een mijnbouwcontext gaven uitsluitend overheids- en defensieresultaten ([NDIA](https://www.ndia.org), [DOE EVMS-richtlijnen](https://www.energy.gov)). EIA-748 wordt beschreven als "the definitive benchmark for enterprise project control" sinds 1998.
**Conclusie: mijnbouw kent geen wettelijk EVMS-mandaat zoals Amerikaanse defensiecontracten. Wél passen grote miners en EPCM-bureaus EVM in de praktijk toe — bewezen bij Adani Mining (PRISM met EVM, SAP- en Primavera-integratie, [Contruent](https://info.contruent.com/case-study-integration-of-cost-and-schedule-at-adani-mining)) en bij Tronox (P6 + Unifier + SAP met "cost controls, earned value management", [gaeaglobal.com](https://gaeaglobal.com/leading-titanium-dioxide-company-deploys-primavera-unifier-p6-and-integrates-with-sap-for-real-time-project-transparency/)). Het is contractueel afgedwongen door lenders en opdrachtgevers, niet door regelgeving.**

**AACE RP 29R-03 — Forensic Schedule Analysis.**
De standaard voor vertragingsanalyse in geschillen. Wordt in mijnbouwarbitrage toegepast: gespecialiseerde experts leveren vertragingsanalyse en getuigenverklaring voor mijnbouwgeschillen bij **ICC, SIAC en ICSID** ([Masin](https://masinproject.com/mining-metals-and-natural-resources/)); Kroll levert "expert analysis of project delays, establishing critical paths" ([kroll.com](https://www.kroll.com/en/services/expert-services/construction-expert-services)); er bestaan gespecialiseerde metaal-/mijnbouwarbiters ([theinternationalarbitrator.com](https://theinternationalarbitrator.com/services/metal-mining-dispute-arbitrator/)). Aceris Law wijst op het belang van "established industry guidance and careful expert analysis" bij het beoordelen van concurrerende vertragingsverhalen ([acerislaw.com](https://www.acerislaw.com/delay-claims-in-international-arbitration/)).

**Consequentie voor software:** het P6-bestand **is het bewijsstuk**. Wie in een ICC-arbitrage een vertragingsclaim wil onderbouwen, heeft de originele, ongewijzigde, periodiek gebaselinede schemabestanden nodig met volledige update-historie. Dit is de sterkste enkele reden waarom P6 in kapitaalprojecten onvervangbaar is, en waarom native-formaat-eisen bestaan.

### 5.3 Leveringsformaten

- **XER en P6 XML** zijn de facto de verplichte uitwisselformaten voor projectschema's; P6 en Primavera Cloud ondersteunen beide ([Oracle](https://www.oracle.com/customer-hub/construction-engineering/primavera-cloud/primavera-cloud-getting-started-schedulers/schedule-differences-p6-and-primavera-cloud/)).
  **Eerlijkheidsnotitie:** ik heb géén publiek mijnbouwaanbestedingsdocument kunnen vinden dat letterlijk "schema in P6 native XER-formaat aanleveren" eist. Meerdere gerichte zoekopdrachten hierop liepen op CAPTCHA's of leverden alleen algemene P6-import/export-documentatie op. **De alomtegenwoordigheid van P6-eisen in vacatures voor mijnbouwplanners is sterk indirect bewijs, maar de contractclausule zelf is in dit onderzoek niet geverifieerd. [ONBEVESTIGD]**
- **OMF (Open Mining Format)** is de open standaard voor mijnbouw-3D-data, ontwikkeld onder de **Global Mining Guidelines Group (GMG)**: "a new open source file format being developed to improve interoperability and long-term storage of 3D mining data" ([gmggroup.org/omf](https://gmggroup.org/omf/)). Versie 2 is in beta ([GMG](https://gmggroup.org/global-mining-guidelines-group-releases-beta-open-mining-format-version-2/)); er is een Rust-implementatie ([gmggroup.github.io/omf-rust](https://gmggroup.github.io/omf-rust/)) en een Python-bibliotheek ([omf.readthedocs.io](https://omf.readthedocs.io/en/latest/)). Ondersteund door o.a. Seequent ([seequent.com](https://www.seequent.com/the-open-mining-format/)) en Maptek ([help.maptek.com](https://help.maptek.com/mapteksdk/1.8/topics/key-concepts/open-mining-format.htm)).
  **Kritisch punt: OMF dekt geometrie, blokmodellen en geologische data — het dekt géén schema's, activiteiten of afhankelijkheden.** Er bestaat geen open uitwisselformaat voor mijnbouwschema's.
- **GMG en The Open Group** hebben in 2025 een MoU getekend om "open and vendor-neutral industry standards" te ontwikkelen, met betrokkenheid van **OSDU for Mining** ([opengroup.org](https://www.opengroup.org/The-Open-Group-and-GMG-to-Collaborate-on-Industry-Standards), [gmggroup.org](https://gmggroup.org/open-group-and-gmg-collaborate-on-industry-standards/), [northamericanmining.com](https://northamericanmining.com/index.php/2025/05/08/gmg-the-open-group-team-for-standards-collaboration/)).
- **IFC / buildingSMART speelt geen rol in mijnplanning.** IFC 4.3 is in januari 2024 als ISO-standaard aangenomen en richt zich op infrastructuur (rail, weg, tunnel, havens) ([nordicbim.com](https://www.nordicbim.com/knowledge/en/ifc-4.3)); IFC-Tunnel-documentatie (versie 4.4) dekt "Excavation, Support and Lining" en geotechnische systemen ([bsi-infraroom.github.io](https://bsi-infraroom.github.io/IFC-Documentation-Tunnel/4_4_0_0/general/HTML/), [Springer IFC-Tunnel-project](https://link.springer.com/content/pdf/10.1007/978-3-031-35399-4_36.pdf)). **Waar IFC in mijnbouw wél relevant is: de bovengrondse verwerkingsinstallatie, infrastructuur en gebouwen — en, via IFC-Tunnel, schachten en declines.** Dat is een echte maar afgebakende opening (zie §7).

---

## 6. Voor- en nadelen van de gebruikte pakketten, specifiek in deze sectorcontext

### Deswik (Planning / Spatial / OPS / APEX)

**Werkt hier goed:**
- Dynamische koppeling ontwerp↔schema: wijzig de CAD-geometrie en het schema volgt direct; selecteer en wijzig het schema in de 3D-view ([deswik.com](https://www.deswik.com/products/planning)). Dit is de killer feature en de reden voor de marktdominantie.
- Automatische omzetting van mijnontwerp naar planbare taken — schaalt naar tienduizenden activiteiten waar P6 vastloopt.
- Mijnbouwspecifieke kalenders die site-specifieke time usage models weerspiegelen ([deswik.com](https://www.deswik.com/products/planning)).
- Resource-levelling op equipmentpools met regels om snel scenario's te testen ([deswik.com](https://www.deswik.com/products/planning)).
- Sterkste underground-positie in de markt ([miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/category/mine-planning-design)).
- Gratis viewer (vSched) verlaagt de drempel voor aannemers en stakeholders ([deswik.com/products/vsched](https://www.deswik.com/products/vsched)).
- Gratis online training voor klanten ([deswik.com](https://www.deswik.com/documentation/a-customer-s-guide-to-the-deswik-training-portal)).

**Wringt hier:**
- **Modulaire prijsstelling maakt de totale kosten ondoorzichtig** en de facto onvergelijkbaar; "the price depends on the set of modules" ([r/mining snippet](https://www.reddit.com/r/mining/comments/14uy5tl/)).
- **Nu eigendom van een equipment-OEM (Sandvik).** Dat is een structureel belangenconflict: het bedrijf dat je planningssoftware levert, verkoopt ook de jumbo's en loaders die je schema modelleert. Concurrerende OEM's (Epiroc, Komatsu) en hun klanten hebben een reden om terughoudend te zijn.
- **Geen gedocumenteerde koppeling naar P6.** Mijn zoekopdracht naar Deswik↔P6-integratie leverde geen leveranciersdocumentatie op. De brug tussen mijnschema en kapitaalprojectschema blijft handwerk.
- Geen gepubliceerde prijs → lange verkoopcyclus, moeilijke budgettering voor kleinere operaties.

### RPMGlobal XPAC / XECUTE / MinePlanner

**Werkt goed:**
- **Commodity-specifieke oplossingen** — 11 varianten voor verschillende mijnbouwtypen ([miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/software/xpac-solutions)). Dat betekent dat het kolenmodel echt kolen is (strips, blends, wasfabriek) en niet een generieke aanpassing.
- Sterke positie in kolen en bulk; XECUTE verbindt planning met uitvoering en distribueert schema-output automatisch naar downstream-afdelingen ([miningsoftwarereviews.com/software/xecute](https://www.miningsoftwarereviews.com/software/xecute)).
- Uitstekende commerciële gezondheid: NRR 115%, GRR 94%, brutomarge 96,3% ([RPMGlobal FY2025](https://investorpa.com)) — een teken van diep verankerde workflows.

**Wringt:**
- **Nu eigendom van Caterpillar** (afgerond 17-feb-2026, [Caterpillar](https://www.caterpillar.com/en/news/corporate-press-releases/h/rpm-global-acquisition.html)). Zelfde OEM-conflict als Deswik/Sandvik, en scherper: Caterpillar is 's werelds grootste mijnbouwequipmentleverancier. Klanten die Komatsu- of Epiroc-vloten draaien, krijgen hier terecht bedenkingen bij.
- Kleinere installed base dan Deswik.
- XPAC's kracht in kolen vertaalt zich minder goed naar complexe underground-metaalmijnbouw.

### Micromine (Beyond / Advance / Alastri / Pitram)

**Werkt goed:**
- **Betaalbaarder dan de enterprise-suites** — "more affordable licensing options compared to enterprise-level mining platforms" ([fitgap.com](https://us.fitgap.com/products/023959/micromine)). Dit is de belangrijkste positionering.
- Alastri Tactical Scheduler dekt "life-of-mine through to rolling 12-week activities" in één tool ([micromine.com](https://www.micromine.com/alastri/tactical-scheduler/)).
- **Micromine Advance** brengt resource-driven scheduling naar underground: taken passen zich aan beschikbare resources aan in plaats van andersom, met ingebouwd beheer van ontwikkelingsnetwerken en ventilatieconstraints ([micromine.com](https://www.micromine.com/blog-rethinking-mine-scheduling/)).
- Bezit met Pitram ook de SIC/fleet-laag — end-to-end van plan tot ploeg.

**Wringt:**
- **Nu eigendom van Weir** ([global.weir](https://www.global.weir/newsroom/global-news/2025/weir-completes-acquisition-of-micromine/)) — minder scherp OEM-conflict dan Cat/Sandvik (Weir maakt pompen en crushers, geen mobiele vloot), maar wel weer een equipmentleverancier.
- Micromine Advance is nieuw (lancering begin 2025, [miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/category/mine-planning-design)) — nog beperkte referentiebasis in complexe operaties.
- Historisch als "de goedkopere optie" gepositioneerd, wat marktaandeelverlies aan Deswik verklaart bij Tier-1-klanten.

### Hexagon HxGN MinePlan / MPSO

**Werkt goed:**
- MPSO wordt "across hundreds of mines" gebruikt voor LOM- en budgetplannen ([connect.hexagonmining.com](https://connect.hexagonmining.com/webinar-long-medium-planning-mpso)); zeer sterk in constraint-management voor mill-circuits ([connect.hexagonmining.com](https://connect.hexagonmining.com/techtip-mpso-constraint-management)).
- Lerchs-Grossmann-pitoptimalisatie, tactische planning met blending, elektrische-truck-ondersteuning in de haulage-module ([miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/software/hxgn-mineplan)).
- Hexagon is niet gebonden aan één equipment-OEM — commercieel neutraler dan Sandvik/Cat/Weir.

**Wringt:**
- Erfenis van MineSight (Mintec, 1970) — een 55 jaar oude codebasis; het MineSight-merk is inmiddels geheel uitgefaseerd ([miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/software/hxgn-mineplan)).
- Sterker in open pit dan underground.
- Mijnplanning is een klein deel van Hexagon's mijnbouwomzet (USD 566 mln is overwegend sensors, controls en autonomie, [InvestMETS](https://www.investmets.com/global-mining-tech-50-2026/)) — beperkte strategische focus.

### GEOVIA MineSched / Surpac / Whittle (Dassault Systèmes)

**Werkt goed:**
- Whittle is de industriële referentie voor strategische pitoptimalisatie ([miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/category/mine-planning-design)).
- MineSched vertaalt de strategie naar een tactisch plan "breathtakingly easy" en ondersteunt blok-, grid- en polygoonmodellen, meerdere pits en geautomatiseerd pushback-management ([3ds.com](https://www.3ds.com/products/geovia/minesched), [discover.3ds.com](https://discover.3ds.com/geovia-mining-software)).
- Enorme installed base en een breed opleidingsecosysteem (universiteiten, Udemy, regionale resellers) ([Udemy](https://www.udemy.com/course/pelatihan-mineplan-nikel-surpac-whittle-minesched-software/), [EDS Technologies](https://edstechnologies.com/products/geovia/geovia-portfolio/minesched/)).
- Toegankelijker prijspunt dan Deswik **[SCHATTING op basis van positionering, niet met prijzen bevestigd]**.

**Wringt:**
- De werkstroom Surpac → Whittle → MineSched is een **drie-tools-keten met handmatige overdrachten** — precies het "handover from strategic to short-term planning" dat MiningSoftwareReviews aanwijst als "the most common failure point" ([miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/category/mine-planning-design/guide)).
- Verliest terrein aan Deswik's geïntegreerde ontwerp↔schema-model.
- Mijnbouw is een randgebied binnen Dassault Systèmes; beperkte investeringsprioriteit **[SCHATTING]**.

### Maptek Vulcan + Evolution

**Werkt goed:**
- Evolution gebruikt evolutionaire algoritmen voor "dynamic agile scheduling that maximises value" over meerdere planningshorizonten ([Scribd/Maptek Evolution Overview](https://www.scribd.com/document/760740630/Maptek-Evolution-Overview)).
- Drie afgestemde varianten (Strategy / Origin / Epoch) van strategisch naar korte termijn, met Origin geïntegreerd in Vulcan ([miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/software/maptek-evolution)).
- Onafhankelijk van equipment-OEM's — commercieel het meest neutrale grote pakket.

**Wringt:**
- Evolution is een overgenomen product (Orelogy, 2014, [E&MJ](https://www.e-mj.com/departments/equipmentgallery/cloud-based-pit-development-scheduling-software/)) en de integratie met Vulcan is minder diep dan Deswik's ontwerp↔schema-eenheid.
- Open-pit-georiënteerd; zwakker underground.
- Als enige grote overgebleven onafhankelijke is Maptek een voor de hand liggend overnamedoelwit — een reëel continuïteitsrisico voor kopers **[SCHATTING]**.

### Primavera P6 (Oracle) — in mijnbouwcontext

**Werkt goed:**
- **De onbetwiste lingua franca.** Elk EPCM-bureau, elke aannemer, elke claimexpert en elke LTA kan het lezen. 244 openstaande P6-schedulervacatures in alleen Australië ([SEEK](https://au.seek.com/primavera-P6-scheduler-jobs)).
- Volwassen baselining, EVM, meerdere kalenders, resource-loading en multi-project — precies wat een lender's audit en een ICC-arbitrage vragen.
- Rijk ecosysteem: risicoanalyse (Safran Risk, Acumen, PRA), kostenintegratie (PRISM, InEight, Cleopatra, Unifier), schema-auditing.
- Bewezen mijnbouwinzet: Tronox (P6 + Unifier + SAP, [gaeaglobal.com](https://gaeaglobal.com/leading-titanium-dioxide-company-deploys-primavera-unifier-p6-and-integrates-with-sap-for-real-time-project-transparency/)), Adani Mining (PRISM + SAP + Primavera, [Contruent](https://info.contruent.com/case-study-integration-of-cost-and-schedule-at-adani-mining)).

**Wringt hier specifiek:**
- **Kan geen mijnschema aan.** Er is geen blokmodel, geen geometrie-gedreven taakgeneratie, geen gehalte/tonnage-doelstellingen, geen ventilatieconstraints. P6 kent alleen activiteiten en resources.
- **Schaalt niet naar mijnbouwvolumes.** Tienduizenden tot honderdduizenden automatisch gegenereerde activiteiten met dagelijkse herberekening zijn buiten bereik.
- **Geen 3D-koppeling.** Waar Deswik het schema in de grafische ruimte laat bewerken, is P6 een tabel met een Gantt-balk.
- **Zwaar in beheer en licentiekosten** — enterprise-budgetadvies loopt op tot ca. USD 10.000 per gebruiker per jaar ([contractorgearlab.com](https://contractorgearlab.com/2026/03/28/how-much-does-primavera-p6-license-cost-2026/)).
- **Twee productlijnen (P6 EPPM en Primavera Cloud) met verschillen** die klanten in migratie-onzekerheid houden ([Oracle](https://www.oracle.com/customer-hub/construction-engineering/primavera-cloud/primavera-cloud-getting-started-schedulers/schedule-differences-p6-and-primavera-cloud/)).

### Safran Project / Safran Risk

**Werkt goed:** verenigt scheduling, planning, risicoanalyse en uitvoering in één tool ([safran.com](https://www.safran.com/en-gb/project-management-tools)); geïntegreerde kosten- én schemarisicoanalyse ([proove.eu](https://www.proove.eu/solutions/safran-risk)); er wordt actief mijnbouwgerichte opleiding gegeven ([ferryfieldgroup.com](https://www.ferryfieldgroup.com)).

**Wringt:** de kernmarkt is offshore olie & gas; **in dit onderzoek zijn geen met naam genoemde grote mijnbouwklanten van Safran bevestigd**. Waar het wordt ingezet, is dat vaak náást P6 (voor de risicoanalyse) in plaats van in plaats van P6, wat de totale toolketen verder verlengt.

### Contruent PRISM / InEight / Cleopatra

**Werkt goed:** integreren kosten en schema, change management, ramingen, earned value, contracten en inkoop ([projectcontrolacademy.com](https://www.projectcontrolacademy.com/integrated-project-controls-software/)); Cleopatra heeft een expliciete mijnbouwpropositie én turnaround-management ([cleopatraenterprise.com](https://cleopatraenterprise.com/industries/cleopatra-enterprise-for-mining-minerals-metals/)); Adani Mining elimineerde er spreadsheets mee met out-of-the-box SAP- en Primavera-koppeling ([Contruent](https://info.contruent.com/case-study-integration-of-cost-and-schedule-at-adani-mining)).

**Wringt:** dit is een **vierde laag bovenop P6, bovenop de mijnplanningssuite, bovenop het CMMS**. Elke laag brengt eigen licenties, eigen implementatie en een eigen integratieproject mee. Het cumulatieve integratiegewicht is het echte pijnpunt van deze sector.

### Prometheus Group (shutdown/turnaround)

**Werkt goed:** diepe SAP PM-integratie, dekt scope, kosten en materialen van een shutdown ([prometheusgroup.com](https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage)); bewezen bij Cameco Cigar Lake ([casestudies.com](https://www.casestudies.com/company/prometheus-group/case-study/cameco-corporation-finds-their-true-north-with-prometheus-planning-scheduling-for-sap)).

**Wringt:** vereist SAP. Mijnbouwbedrijven zonder SAP PM (en dat is een aanzienlijk deel van het middensegment) vallen terug op P6 + Excel. Bovendien is er opnieuw geen brug naar het mijnplanningsschema — een shutdown van de concentrator raakt direct de productieplanning, maar die koppeling bestaat niet.

---

## 7. Openingen: waar zijn gebruikers ontevreden en welke gaten bestaan er

### 7.1 De vijf bevestigde pijnpunten

**1. De overdracht strategisch → korte termijn is het meest voorkomende faalpunt.**
Letterlijk: "The most common failure point is the handover from strategic to short-term planning" ([miningsoftwarereviews.com/category/mine-planning-design/guide](https://www.miningsoftwarereviews.com/category/mine-planning-design/guide)). Bijkomende, expliciet benoemde klachten uit dezelfde bron:
- weekplanningsdoorlooptijden zijn te lang om op prijsschommelingen te reageren;
- ontkoppeling tussen strategisch en operationeel plan veroorzaakt equipment-bottlenecks;
- handmatige CAD-herontwerpen zijn nodig zodra het geologische model wordt bijgewerkt.

**2. De kloof tussen mijnschema en projectschema is niet overbrugd.**
Er bestaat geen gedocumenteerde Deswik↔P6-, XPAC↔P6- of MinePlan↔P6-koppeling die ik heb kunnen vinden. Bij een projectcontrolemanager die een geïntegreerd masterschema moet opleveren waarin de plantbouw, de shaftsinking én de rampup van de mijn zitten, betekent dat handmatige hersleutel per periode. Dit is een echt, groot, structureel ongeadresseerd gat.

**3. OEM-eigendom creëert een leveranciersneutraliteitsprobleem — dit is nieuw sinds 2022 en de scherpste opening.**
Sinds april 2022 zijn Deswik (Sandvik), Micromine (Weir) en RPMGlobal (Caterpillar) alle drie in handen van equipmentfabrikanten. Binnen 15 jaar is voor ca. **USD 7,5 mrd aan mijnbouwtechnologie van eigenaar gewisseld** en verwacht de sector "at least two or three mega mergers in this next five-year window" ([InvestMETS](https://www.investmets.com/global-mining-tech-50-2026/)). Analisten duiden dit als "a wave of acquisitions as OEMs moved to capture the software layer" ([LinkedIn](https://www.linkedin.com/posts/gary-poole-a8309113_mining-technology-activity-7438284818926313472-FQtF)).
Voor een mijnbouwbedrijf betekent dit: je planningstool, die bepaalt hoeveel equipment je nodig hebt en wanneer, is eigendom van de partij die dat equipment verkoopt. Dat is een klassiek belangenconflict, en het is het beste argument dat er ooit is geweest voor een leveranciersneutraal, open alternatief. **Ik heb echter geen gedocumenteerde klantenklachten over prijsverhogingen na deze overnames kunnen vinden** — het argument is structureel, niet (nog) empirisch aangetoond. **[Als opening reëel; als bewezen ontevredenheid: ONBEVESTIGD.]**

**4. Ondoorzichtige prijsstelling sluit het hele juniorsegment uit.**
"Deswik, Vulcan, Datamine and Micromine do not publish prices for a reason… the number is built for a major. If your software budget is under $5K, the brochure tour does not help you" ([miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/articles/pit-optimization-software-junior-miners)). Junior miners vallen terug op Excel, academische licenties met commercieel gebruiksverbod, of open-source Python (pyomo, PuLP, OR-Tools) waarvoor ze zelf de expertise moeten opbouwen. **Dat is een structureel onbediend segment.** Bewijs dat er vraag is: Opencontour bouwt een cloudpropositie met gepubliceerde prijzen vanaf USD 249/maand en een gratis tier ([opencontourmining.com/pricing](https://www.opencontourmining.com/pricing)); K-MINE adverteert expliciet met "transparent annual subscriptions… No long-term lock-in" ([k-mine.com](https://k-mine.com/mining-software/pricing/)); en er is al een open-source poging in de designhoek (Incline, "bring the ideals of free open-source software to the mining industry", [github.com/Incline-Developers/Incline](https://github.com/Incline-Developers/Incline)).

**5. Vendor lock-in wordt expliciet als risico benoemd.**
Marktanalyses waarschuwen dat verkeerde pakketkeuze leidt tot "multi-million-dollar integration failures, operational inefficiencies, or long-term vendor lock-in" ([Amazon: 2026 Mine Planning Software Vendor Analysis](https://www.amazon.com/2026-Mine-Planning-Software-Strategic-ebook/dp/B0GQJ435MB)).

### 7.2 Wat dit betekent voor een open-source, IFC-gebaseerde planner

Ik ben hier bewust streng, want de verleiding om deze sector te overschatten is groot.

**Wat NIET werkt — eerlijk zijn hierover is belangrijker dan optimistisch zijn:**

- **IFC is geen mijnbouwstandaard en zal dat niet worden.** De open-datastandaard van de mijnbouw is **OMF**, ontwikkeld onder GMG ([gmggroup.org/omf](https://gmggroup.org/omf/)), en het bredere standaardisatiewerk loopt via GMG + The Open Group + **OSDU for Mining** ([opengroup.org](https://www.opengroup.org/The-Open-Group-and-GMG-to-Collaborate-on-Industry-Standards)). Een IFC-native planner die zichzelf verkoopt op IFC-compatibiliteit spreekt in deze sector een taal die niemand aan de geologiekant spreekt.
- **Het geologische mijnschema is onbereikbaar.** Blokmodellen, pitoptimalisatie (Lerchs-Grossmann), stope-optimalisatie, gehalte-blending, ventilatie-constraints, direct block scheduling — dat is tientallen manjaren gespecialiseerde optimalisatie. Deswik heeft er 200+ mijnbouwingenieurs op zitten ([deswik.com](https://www.deswik.com/)); Minemax draait op IBM CPLEX ([miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/software/minemax-scheduler)). Dit is geen realistisch aanvalsgebied.
- **Auditbaarheid tegen NI 43-101/JORC is een compliancemuur.** Een QP moet met zijn handtekening instaan voor het schema. Dat verhoogt de drempel voor onbewezen software enorm.
- **De hoofdprijs (Tier-1 miners) is niet prijsgevoelig.** Software is ca. 8% van de kosten van een plannerzitplaats **[SCHATTING, §3.4]**; goedkoper zijn is geen argument dat wint bij BHP of Rio Tinto.

**Waar de opening WEL zit — vier reële routes, in volgorde van haalbaarheid:**

**(a) De bovengrondse kant: verwerkingsinstallatie, infrastructuur en gebouwen — dit is écht IFC-territorium.**
Elk mijnbouwkapitaalproject is voor een groot deel gewone industriële bouw: concentrator, crusher-station, tailings-installatie, kantoren, kampen, wegen, transportbanden, elektrische infrastructuur. Daar wordt in Revit/Plant 3D/AVEVA gemodelleerd, IFC 4.3 is sinds januari 2024 ISO-standaard ([nordicbim.com](https://www.nordicbim.com/knowledge/en/ifc-4.3)) en 4D-koppeling model↔schema is precies wat daar mist. De EPCM-bureaus (Fluor, Bechtel, Hatch, Worley, Ausenco) doen dit werk en gebruiken P6 zonder modelkoppeling. **Dit is het meest realistische aanvalsgebied.**
**[GECORRIGEERD bij verificatie]** De oorspronkelijke onderbouwing hier — "het is groot: EY telt 192 mijnbouwprojecten van >USD 1 mrd" — is een verkeerd gebruik van die bron. De 192 projecten zijn de **steekproefomvang van een EY-studie uit juni 2021** over een meerjarige historische periode, geen lopende voorraad projecten en geen jaarlijks aantal ([EY](https://www.ey.com/en_rs/insights/energy-resources/how-better-project-management-can-boost-minings-capital-productivity)). Het cijfer zegt dus niets over de huidige marktomvang van dit aanvalsgebied. De onderbouwing voor "groot" moet komen uit capex-volume, niet uit een studiesteekproef.

**(b) Schachten, declines en ondergrondse infrastructuur via IFC-Tunnel.**
IFC-Tunnel (4.4-ontwikkeling) dekt "Excavation, Support and Lining" en geotechnische systemen ([bsi-infraroom.github.io](https://bsi-infraroom.github.io/IFC-Documentation-Tunnel/4_4_0_0/general/HTML/), [Springer](https://link.springer.com/content/pdf/10.1007/978-3-031-35399-4_36.pdf)). Shaftsinking en decline-ontwikkeling zijn lineair, herhalend, kritiek-pad-bepalend en modelleerbaar in IFC. Dit is de brug tussen de bouwwereld en de mijnbouwwereld en is nog door niemand geclaimd.

**(c) Het juniorsegment en de consultants: het onbediende onderste segment.**
Onder de USD 5.000-drempel bestaat geen serieus commercieel aanbod ([miningsoftwarereviews.com](https://www.miningsoftwarereviews.com/articles/pit-optimization-software-junior-miners)). Een gratis, open-source, auditeerbare planner met een geloofwaardig CPM-hart en kalenderengine bedient hier: junior miners, exploratiebedrijven, kleine onderaannemers, universiteiten, consultants die een tweede-opinion-schema moeten bouwen, en aannemers die het opgelegde P6-schema alleen willen kunnen lézen en narekenen. **Dit is de meest natuurlijke instap en levert de referentiebasis op waarmee je later omhoog kunt.**

**(d) De onbezette brug tussen mijnschema en projectschema.**
Niemand levert dit. Een open, leveranciersneutraal formaat en tool voor het samenvoegen van (i) een mijnproductieschema, (ii) een kapitaalprojectschema en (iii) een shutdown-schema tot één integrated master schedule — met IFC voor de bovengrondse scope en importers voor P6 XER/XML en de exports van de mijnplanningspakketten — vult een gat dat door de OEM-consolidatie alleen maar groter wordt. De architectuur die dit vraagt (importadapters, geen eigen bestandsformaat als bron van waarheid, plugin-/extensiesysteem) is precies wat een open-source project goed kan en wat commerciële suites structureel níet willen bouwen omdat het hun lock-in ondermijnt.

### 7.3 Harde randvoorwaarden om in deze sector serieus genomen te worden

Op basis van het bovenstaande, in prioriteitsvolgorde:

1. **P6 XER- én P6 XML-import/export die daadwerkelijk klopt**, inclusief kalenders, relaties met lags, constraints, baselines en resource-toewijzingen. Zonder dit is een planner in deze sector onbruikbaar — het is de lingua franca ([Oracle](https://www.oracle.com/customer-hub/construction-engineering/primavera-cloud/primavera-cloud-getting-started-schedulers/schedule-differences-p6-and-primavera-cloud/)).
2. **Schaal.** Tienduizenden activiteiten met snelle herberekening. Niet-onderhandelbaar zodra je bij mijnbouwvolumes komt.
3. **Meerdere kalenders per project en per resource**, inclusief 24/7-ploegenpatronen, FIFO-roosters en site-specifieke time usage models — mijnbouw draait niet op een 5×8-kalender ([deswik.com](https://www.deswik.com/products/planning)).
4. **Baselining en volledige wijzigingshistorie.** Vereist voor EVM, voor lender-audits en, cruciaal, voor forensische vertragingsanalyse volgens AACE 29R-03 in ICC/ICSID-arbitrage ([Masin](https://masinproject.com/mining-metals-and-natural-resources/)).
5. **DCMA 14-point-schemakwaliteitscontroles ingebouwd.** Tool-agnostisch geworden industriestandaard ([schedulereader.com](https://www.schedulereader.com)); goedkoop te implementeren en een geloofwaardigheidssignaal richting project-controls-professionals.
6. **Monte-Carlo-schemarisicoanalyse of een schone koppeling daarnaartoe.** Verplicht onderdeel van elke bankable feasibility study ([Safran Risk](https://www.safran.com/en-gb/risk-analytics-solutions), [Acumen](https://www.linkedin.com/pulse/comparative-analysis-schedule-risk-tools-intaver-institute-inc-vimsc)).
7. **AACE-klasse-bewustzijn** — schema's koppelen aan raamklassen 5 t/m 1 volgens RP 47R-11, de mijnbouwspecifieke standaard ([AACE 47R-11](https://web.aacei.org/docs/default-source/toc/toc_47r-11.pdf)).
8. **OMF-lezen als optionele brug**, niet als kernformaat. Het maakt geloofwaardig dat je de mijnbouwkant begrijpt zonder dat je de geologische optimalisatie hoeft na te bouwen ([gmggroup.org/omf](https://gmggroup.org/omf/)).

---

## 8. Samenvattende conclusie

Mijnbouw is een **tweekoppige planningsmarkt** waarvan de twee helften nauwelijks met elkaar praten. De geologische helft (Deswik, XPAC/XECUTE, MinePlan, Evolution, MineSched, Alastri) is technisch diep, commercieel afgesloten, uitzonderlijk winstgevend en sinds 2022 vrijwel volledig opgekocht door equipment-OEM's — Sandvik nam Deswik, Weir nam Micromine (£624 mln), Caterpillar nam RPMGlobal (USD 728 mln). De projecthelft is een monocultuur van Primavera P6, contractueel verankerd, prijs-gestandaardiseerd en juridisch onmisbaar omdat het P6-bestand het bewijsstuk is in vertragingsarbitrage.

**Omvang [SCHATTING, 2025 — gecorrigeerd na verificatie]:** pure scheduling-licenties **USD 205–375 mln** (midpunt ca. USD 290 mln / **€255 mln** bij EUR/USD 1,137); alle planningsgerelateerde software **USD 750 mln – 1,12 mrd** (≈ €660–985 mln); inclusief diensten **USD 1,9–3,3 mrd** (≈ €1,67–2,90 mrd). Groei ligt op 10–15% voor mijnplanning en 3–6% voor projectplanning. *De eerder gerapporteerde band USD 205–400 mln / €280 mln bevatte een optelfout in de bovengrens en een onjuiste wisselkoers (1,08 in plaats van 1,137); zie §4.5 en §Verificatie.*

**Betalingsbereidheid is hoog** — de waarde per beslissing is extreem (5–15% NPV-uplift, USD 100k/uur mill-downtime, 39–79% projectkostenoverschrijdingen), de licentie is ca. 8% van de zitplaatskosten, en de overnamemultiples (10× omzet, 20× EBITDA voor Micromine) bevestigen dat kopers in prijszettingsmacht geloven. **Maar die bereidheid zit vrijwel volledig aan de productiekant, bij Tier-1-miners, en is niet toegankelijk voor een nieuwkomer zonder mijnbouwoptimalisatie-IP.**

**Voor een open-source, IFC-gebaseerde planner is de geologische mijnplanning geen realistisch doel** — daar is OMF de standaard, niet IFC, en de optimalisatiediepte is tientallen manjaren. De reële openingen zijn: (a) de bovengrondse verwerkingsinstallatie en infrastructuur, waar IFC 4.3 sinds januari 2024 ISO-standaard is en 4D-koppeling ontbreekt; (b) schachten en declines via IFC-Tunnel; (c) het juniorsegment onder de USD 5.000-drempel dat structureel onbediend is; en (d) de onbezette brug tussen mijnschema, projectschema en shutdown-schema — een gat dat door de OEM-consolidatie alleen maar groter wordt en dat de commerciële suites structureel níet willen dichten omdat het hun lock-in ondermijnt.

De sterkste strategische boodschap die deze sector nu biedt is niet "goedkoper" maar **"neutraal"**: sinds drie van de vier grootste mijnplanningspakketten eigendom zijn van de fabrikanten van de machines die ze inplannen, is er een argument voor leveranciersneutrale planningssoftware dat er vóór 2022 niet was.

---

## 9. Bronnenlijst

### Leveranciers — mijnplanning
- Deswik (bedrijf en producten) — https://www.deswik.com/
- Deswik — About Us (32.000+ licenties) — https://www.deswik.com/about-us
- Deswik Planning — https://www.deswik.com/products/planning
- Deswik vSched (gratis viewer) — https://www.deswik.com/products/vsched
- Deswik OPS — https://www.deswik.com/products/ops
- Deswik Training Portal — https://www.deswik.com/documentation/a-customer-s-guide-to-the-deswik-training-portal
- Deswik via MiningFMS (1.330+ operaties) — https://miningfms.com/vendors/deswik/
- Sandvik — integrated mine planning solutions — https://www.mining.sandvik/en/digital-solutions/mine-planning-and-optimization/integrated-mine-planning-solutions/
- RPMGlobal — https://www.rpmglobal.com/
- RPMGlobal XPAC — https://rpmglobal.com/product/xpac/
- RPMGlobal XECUTE — https://rpmglobal.com/product/xecute/
- RPMGlobal Intelligent Scheduling — https://www.mining-technology.com/products/intelligent-scheduling/
- Micromine Alastri Tactical Scheduler — https://www.micromine.com/alastri/tactical-scheduler/
- Micromine — Rethinking mine scheduling (resource-driven) — https://www.micromine.com/blog-rethinking-mine-scheduling/
- Micromine Pitram SIC — https://www.micromine.com/pitram-sic/
- Alastri — https://www.alastri.com/software/
- Maptek Evolution — https://www.maptek.com/products/evolution/
- Maptek — OMF in de SDK — https://help.maptek.com/mapteksdk/1.8/topics/key-concepts/open-mining-format.htm
- GEOVIA MineSched (Dassault Systèmes) — https://www.3ds.com/products/geovia/minesched
- GEOVIA portfolio — https://discover.3ds.com/geovia-mining-software
- MineSched via EDS Technologies — https://edstechnologies.com/products/geovia/geovia-portfolio/minesched/
- Hexagon — MinePlan OP Engineering Long Term — https://hexagon.com/products/hexagon-mineplan-op-engineering-long-term
- Hexagon — Mine scheduling and optimising — https://hexagon.com/solutions/mine-scheduling-optimising
- Hexagon — MPSO constraint management — https://connect.hexagonmining.com/techtip-mpso-constraint-management
- Hexagon — MPSO long/medium planning webinar — https://connect.hexagonmining.com/webinar-long-medium-planning-mpso
- Minemax (Datamine-documentatie) — https://docs.dataminesoftware.com/Minemax/index.htm
- Minemax Tempo — https://www.minemax.com/news/new-tempo-detailed-mine-planning-released/
- Datamine — https://dataminesoftware.com/
- Vela Software Group — Metals and Mining — https://velasoftwaregroup.com/portfolio/metals-and-mining/
- K-MINE prijzen (403 bij ophalen) — https://k-mine.com/mining-software/pricing/
- K-MINE independent technical review — https://k-mine.com/pg/independent-technical-review-mining/
- Opencontour prijzen — https://www.opencontourmining.com/pricing
- Incline (open source mine design) — https://github.com/Incline-Developers/Incline

### Leveranciers — projectplanning, risico, kosten, shutdown
- Oracle Primavera P6 — https://www.oracle.com/construction-engineering/primavera-p6/
- Oracle — verschillen P6 vs Primavera Cloud — https://www.oracle.com/customer-hub/construction-engineering/primavera-cloud/primavera-cloud-getting-started-schedulers/schedule-differences-p6-and-primavera-cloud/
- Safran — Project Management Tools — https://www.safran.com/en-gb/project-management-tools
- Safran — Risk Analytics Solutions — https://www.safran.com/en-gb/risk-analytics-solutions
- Safran Project review — https://saasrat.com/products/safran-project
- Safran Risk via Proove — https://www.proove.eu/solutions/safran-risk
- Primavera Risk Analysis — https://iqrm.net/blog/primavera-risk-analysis
- Vergelijking schemarisicotools (Acumen Risk, USD 10.300) — https://www.linkedin.com/pulse/comparative-analysis-schedule-risk-tools-intaver-institute-inc-vimsc
- ARES PRISM / Contruent — https://www.projectcontrolacademy.com/integrated-project-controls-software/
- Contruent — Adani Mining case study — https://info.contruent.com/case-study-integration-of-cost-and-schedule-at-adani-mining
- InEight via Kiewit — https://www.kiewit.com/about-us/technology-at-kiewit/ineight/
- Cleopatra Enterprise — mijnbouw — https://cleopatraenterprise.com/industries/cleopatra-enterprise-for-mining-minerals-metals/
- Tronox — P6 + Unifier + SAP — https://gaeaglobal.com/leading-titanium-dioxide-company-deploys-primavera-unifier-p6-and-integrates-with-sap-for-real-time-project-transparency/
- Prometheus Group — STO — https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage
- Prometheus STO Manager via SAP — https://www.sap.com/products/erp/partners/prometheus-group-inc-prometheus-sto-manager.html
- Cameco (Cigar Lake) — Prometheus case study — https://www.casestudies.com/company/prometheus-group/case-study/cameco-corporation-finds-their-true-north-with-prometheus-planning-scheduling-for-sap
- Emerald Associates T100 Turnaround Management — https://emerald-associates.com/training/course-descriptions/t100-turnaround-management
- Wenco Mining Systems — https://www.wencomine.com/
- ABB — SIC en productieplanning — https://new.abb.com/mining/digital-applications/operations-management-system-oms-for-mining/digitalization-of-short-interval-control-(sic)-and-production-scheduling-in-mining
- GroundHog SIC — https://groundhogapps.com/groundhog-short-interval-control/

### Marktomvang, transacties, financiële cijfers
- Sandvik — afronding overname Deswik (AUD 79 mln omzet) — https://www.home.sandvik/en/news-and-media/news/2022/04/sandvik-completes-the-acquisition-of-the-leading-mine-planning-software-company-deswik/
- Sandvik Annual Report 2022 (SEK 620 mln bijdrage) — https://www.home.sandvik/siteassets/investors/reports--presentations/annual-reports/annual-report-2022.pdf
- Sandvik Annual Report 2025 (DMT double-digit groei) — https://www.annualreport.sandvik/en/2025/
- InvestMETS — Sandvik wraps up Deswik deal (marge, recurring) — https://www.investmets.com/sandvik-wraps-up-deswik-deal/
- InvestMETS — Sandvik beats hot field (>A$500 mln schatting) — https://www.investmets.com/sandvik-beats-hot-field-to-take-out-deswik/
- Reuters — Caterpillar/RPMGlobal USD 728 mln — https://www.reuters.com/world/asia-pacific/caterpillar-acquire-australias-rpmglobal-728-million-2025-10-12/
- Caterpillar — afronding RPMGlobal (17-feb-2026) — https://www.caterpillar.com/en/news/corporate-press-releases/h/rpm-global-acquisition.html
- Clearly Acquired — RPMGlobal premie 32,6% — https://clearlyacquired.com/blog/caterpillar-announces-acquisition-of-rpmglobal-in-strategic-move
- Discovery Alert — Caterpillar/RPMGlobal — https://discoveryalert.com.au/caterpillar-acquisition-rpmglobal-2025-industry-impact/
- London Stock Exchange — Weir/Micromine £657 mln EV — https://www.londonstockexchange.com/news-article/WEIR/acquisition/16919089
- Weir — afronding Micromine (£624 mln) — https://www.global.weir/newsroom/global-news/2025/weir-completes-acquisition-of-micromine/
- InvestMETS — Weir buys Micromine (£68 mln omzet, 10× EV/omzet, 20× EBITDA) — https://www.investmets.com/weir-buys-micromine-for-a1-31b/
- InvestMETS — Weir deal reignites mining software battle (Micromine USD 85 mln; smart mining ca. USD 10 mrd) — https://www.investmets.com/weir-deal-reignites-mining-software-battle/
- InvestMETS — Global Mining Tech 50 2026 (ABB USD 1.489 mln; Hexagon USD 566 mln; totaal USD 6,8 mrd) — https://www.investmets.com/global-mining-tech-50-2026/
- RPMGlobal FY2025 Investor Presentation (ARR A$71,8 mln, TCV A$100,8 mln, NRR 115%, GRR 94%) — https://investorpa.com
- RPMGlobal FY2025 via ListCorp — https://listcorp.com
- RPMGlobal FY2025 omzet A$73,9 mln (gecorrigeerd; was A$76,7 mln via TipRanks) — https://stockanalysis.com/quote/asx/RUL/financials/
- RPMGlobal FY2025 via Kapitales (TCV +30,9%) — https://kapitales.com.au
- MiningSoftwareReviews — Minemax overgenomen door Vela (feb 2020) — https://www.miningsoftwarereviews.com/vendor/minemax
- Mining soft-wars heat up again — https://miningbeacon.com/industry/mining-soft-wars-heat-up-again
- OEM-consolidatie 2021–2026 — https://www.linkedin.com/posts/gary-poole-a8309113_mining-technology-activity-7438284818926313472-FQtF

### Analistenramingen marktomvang (met grote spreiding — gebruikt als sanity check)
- Verified Market Reports — Mine Planning Software (USD 1,5 mrd 2025) — https://www.verifiedmarketreports.com/product/mine-planning-software-market/
- PW Consulting (USD 1,54 mrd 2025, CAGR 8,5%) — https://pmarketresearch.com/worldwide-mine-planning-software-market-research/
- Market Research Intellect (USD 504 mln 2025) — https://www.marketresearchintellect.com/product/mine-planning-software-market/
- DataIntelo (USD 1,91 mrd 2025) — https://dataintelo.com/report/mine-planning-software-market
- QY Research (USD 887 mln 2024) — https://www.qyresearch.com/reports/4140764/mine-planning-software
- 24 Market Reports (USD 752,1 mln 2023) — https://www.24marketreports.com/energy-and-natural-resources/global-mine-planning-software-forecast-2025-2032-800
- Market Research Future — Mining Software (USD 6,64 mrd 2035) — https://www.marketresearchfuture.com/reports/mining-software-market-29412
- Emergen Research — Mining Software (USD 35,2 mrd) — https://www.emergenresearch.com/industry-report/mining-software-market

### Sectorcontext, projectprestaties en kosten van vertraging
- McKinsey — The capex crystal ball (83%, 40% capex, 20-30% schema, 79%/52% megaprojecten) — https://www.mckinsey.com/industries/metals-and-mining/our-insights/the-capex-crystal-ball-beating-the-odds-in-mining-project-delivery
- EY — How better project management can boost mining's capital productivity (192 projecten, 64%, 39%, 15-30% waarde) — https://www.ey.com/en_rs/insights/energy-resources/how-better-project-management-can-boost-minings-capital-productivity
- Mining Review Africa — EY 62% gemiddelde overschrijding — https://www.miningreview.com/top-stories/mega-mining-projects-show-62-average-budget-overrun-says-ey/
- Mining Weekly — EY 108 megaprojecten — https://www.miningweekly.com/article/more-than-two-thirds-of-megaprojects-face-cost-overruns-ey-report-2015-05-21
- ScienceDirect — Deconstructing cost overrun and delay in mining projects (256 waarnemingen, 202 projecten, 1994-2020) — https://www.sciencedirect.com/science/article/pii/S030142072500296X
- PwC — Mine 2026 (top-40: USD 909 mrd omzet, USD 248 mrd EBITDA, USD 120 mrd winst) — https://www.pwc.com/gx/en/industries/energy-utilities-resources/publications/mine.html
- ICMM — Global Mining Dataset (8.508 faciliteiten) — https://www.icmm.com/global-datasets/mining-metals-facilities
- ICMM — lancering Global Mining Dataset — https://www.icmm.com/en-gb/news/2025/ICMM-launches-global-mining-dataset
- Discovery Alert — ICMM 8.508 faciliteiten — https://discoveryalert.com.au/global-mining-database-2025-launch-transparency/
- S&P Global — CES 2025, exploratiebudget USD 12,40 mrd — https://www.spglobal.com/market-intelligence/en/news-insights/research/2025/11/ces-2025-overview-exploration-in-numbers
- Mining.com — exploratiebudgetten 2024 USD 12,5 mrd — https://www.mining.com/global-exploration-budgets-fall-as-juniors-tighten-belts-sp/
- RME Global — SAG mill USD 100.000/uur — https://rmeglobal.com/resources/about-mill-reline-director-part-i/
- DPF Guys — downtime tot USD 180.000/incident — https://dpfguys.com/maximizing-uptime-mining-industry/
- Mining.com.au / Oxford Economics — onderhoudsuitgaven A$13,2 mrd FY24 / A$13,3 mrd FY25 — https://mining.com.au/mining-maintenance-spending-slowing-oxford-economics-australia/
- CSIRO — mijnsluiting en rehabilitatie A$4-8 mrd/jaar — https://www.csiro.au/en/news/All/Articles/2024/February/mine-closure-report

### Underground scheduling en constraints
- Springer — Underground production scheduling with ventilation and refrigeration — https://link.springer.com/article/10.1007/s11081-021-09682-4
- ACG/UWA — Mine schedule optimisation with ventilation constraints — https://papers.acg.uwa.edu.au/d/1710_11_Zhang/11_Zhang.pdf
- MDPI — Recent Advances in Underground Mine Planning, Scheduling — https://www.mdpi.com/journal/mining/special_issues/underground_mine
- Springer — Optimization of Underground Mine Planning and Scheduling — https://link.springer.com/chapter/10.1007/978-981-97-7883-6_8
- Colorado School of Mines — Large-scale underground mine planning incl. heat en ventilatie — https://repository.mines.edu/entities/publication/6942d28c-c048-4977-8a68-18d59d5acde8

### Standaarden, audits en claims
- AACE RP 47R-11 — Cost Estimate Classification, Mining and Mineral Processing (inhoudsopgave) — https://web.aacei.org/docs/default-source/toc/toc_47r-11.pdf
- AACE RP 47R-11 — volledige tekst — https://www.geokniga.org/bookfiles/geokniga-aacecostestimateclassificationsystem.pdf
- AACE — Recommended Practices — https://www.pathlms.com/aace/courses/2928
- DCMA — Standards — https://www.dcma.mil/STANDARDS/
- DCMA 14-Point Assessment uitleg — https://schedulelens.com/blog/dcma-14-point-assessment/
- ScheduleReader — DCMA 14-Point — https://www.schedulereader.com
- OSC — NI 43-101 — https://www.osc.ca/en/securities-law/instruments-rules-policies/4/43-101/ni-43-101-standards-disclosure-mineral-projects-form-43-101f1-technical-report-and-related
- Okane Consultants — herziene NI 43-101 & JORC — https://okaneconsultants.com/ideas/updated-ni-43-101-jorc-code/
- Gosselin Mining — NI 43-101 / JORC technische rapportage — https://gosselinmining.com/services/technical-reporting-ni43-101-jorc/
- SRK Consulting — due diligence en project reviews — https://www.srk.com/en/services/due-diligence-and-project-reviews
- Micon International — Independent Technical Engineer — https://micon-international.com/our-services/independent-engineer-technical-consultant/
- Gad Haran — Lender's Technical Advisor — https://gadharan.com/Services/lender-technical-advisor-lta/
- Masin — mining expert witness / delay analysis (ICC, SIAC, ICSID) — https://masinproject.com/mining-metals-and-natural-resources/
- Kroll — Construction Expert Services — https://www.kroll.com/en/services/expert-services/construction-expert-services
- Aceris Law — Delay claims in international arbitration — https://www.acerislaw.com/delay-claims-in-international-arbitration/
- The International Arbitrator — Metal & Mining Dispute — https://theinternationalarbitrator.com/services/metal-mining-dispute-arbitrator/

### Open standaarden en interoperabiliteit
- GMG — Open Mining Format — https://gmggroup.org/omf/
- GMG — OMF v2 beta release — https://gmggroup.org/global-mining-guidelines-group-releases-beta-open-mining-format-version-2/
- OMF documentatie — https://omf.readthedocs.io/en/latest/
- OMF Rust-implementatie — https://gmggroup.github.io/omf-rust/
- Seequent — The Open Mining Format — https://www.seequent.com/the-open-mining-format/
- GMG — Guideline for Sharing Open Data Sets in Mining — https://gmggroup.org/wp-content/uploads/2024/07/2022-04-21_Guideline-for-Sharing-Open-Data-Sets-in-Mining-2.pdf
- The Open Group + GMG MoU (OSDU for Mining) — https://www.opengroup.org/The-Open-Group-and-GMG-to-Collaborate-on-Industry-Standards
- North American Mining — GMG/The Open Group samenwerking — https://northamericanmining.com/index.php/2025/05/08/gmg-the-open-group-team-for-standards-collaboration/
- IFC 4.3 als ISO-standaard (jan 2024) — https://www.nordicbim.com/knowledge/en/ifc-4.3
- buildingSMART IFC-Tunnel documentatie (4.4) — https://bsi-infraroom.github.io/IFC-Documentation-Tunnel/4_4_0_0/general/HTML/
- Springer — The IFC-Tunnel Project — https://link.springer.com/content/pdf/10.1007/978-3-031-35399-4_36.pdf
- buildingSMART IFC Release Notes — https://github.com/buildingSMART/technical.buildingsmart.org/blob/main/IFC-Release-Notes.md

### Onafhankelijke vergelijkingen, gebruikersinzichten, prijzen
- MiningSoftwareReviews — Mine Planning & Design (31 tools) — https://www.miningsoftwarereviews.com/category/mine-planning-design
- MiningSoftwareReviews — buying guide mine planning (NPV 5-15%, faalpunten) — https://www.miningsoftwarereviews.com/category/mine-planning-design/guide
- MiningSoftwareReviews — Pit optimization for junior miners (USD 5k-drempel) — https://www.miningsoftwarereviews.com/articles/pit-optimization-software-junior-miners
- MiningSoftwareReviews — SIC buying guide — https://www.miningsoftwarereviews.com/category/mine-operations-sic/guide
- MiningSoftwareReviews — HxGN MinePlan — https://www.miningsoftwarereviews.com/software/hxgn-mineplan
- MiningSoftwareReviews — Maptek Evolution — https://www.miningsoftwarereviews.com/software/maptek-evolution
- MiningSoftwareReviews — Minemax Scheduler / Tempo — https://www.miningsoftwarereviews.com/software/minemax-scheduler
- MiningSoftwareReviews — XPAC Solutions / XECUTE — https://www.miningsoftwarereviews.com/software/xpac-solutions
- ITQlick — Primavera P6 pricing (USD 2.500-3.500) — https://www.itqlick.com/primavera-p6/pricing
- ITQlick — Oracle Primavera P6 plans — https://www.itqlick.com/oracle-primavera-p6/pricing
- VendorBenchmark — P6 concurrent user USD 3.000-8.000 — https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing
- Contractors and Builders — Primavera vanaf USD 175/maand — https://contractorsandbuilders.com/pricing/oracle-primavera/
- Contractor Gear Lab — enterprise budgetadvies ca. USD 10.000/gebruiker/jaar — https://contractorgearlab.com/2026/03/28/how-much-does-primavera-p6-license-cost-2026/
- FitGap — Micromine betaalbaarder — https://us.fitgap.com/products/023959/micromine
- Scribd — Deswik.Spatial licentie-offerte USD 15.755,56 (onbevestigd) — https://www.scribd.com/document/841037166/
- Scribd — Deswik trainingsdocument (USD 150) — https://www.scribd.com/document/838772487/DESWIK-TRAINING
- r/mining — Deswik aanschaf (alleen via snippet, site geblokkeerd) — https://www.reddit.com/r/mining/comments/14uy5tl/
- r/mining — waarom Deswik dominant is (alleen via snippet) — https://www.reddit.com/r/mining/comments/16dby3w/
- r/mining — best mine scheduling software 2024 (alleen via snippet) — https://www.reddit.com/r/mining/comments/1awfn23/best_mine_scheduling_software_in_2024/
- 2026 Mine Planning Software Vendor Analysis (vendor lock-in) — https://www.amazon.com/2026-Mine-Planning-Software-Strategic-ebook/dp/B0GQJ435MB

### Arbeidsmarkt en EPCM
- US BLS — Mining and Geological Engineers (7.000 banen, USD 101.020 mediaan) — https://www.bls.gov/ooh/architecture-and-engineering/mining-and-geological-engineers.htm
- SEEK — Primavera P6 Scheduler jobs Australië (244) — https://au.seek.com/primavera-P6-scheduler-jobs
- SEEK — Shutdown Planner jobs Australië (361) — https://au.seek.com/shutdown-planner-jobs
- Recruit.net — 879 shutdown planner posities — https://australia.recruit.net/search-shutdown-planner-jobs
- Jora — Shutdown Planner (P6 in mijnbouw) — https://au.jora.com/Shutdown-Planner-jobs
- TRS Staffing — Shutdown Planner WA ("Primavera P6 or similar") — https://trsstaffing.com/job/shutdown-planner-in-australia-western-australia
- Glassdoor AU — Project Scheduler salaris — https://www.glassdoor.com.au/Salaries/project-scheduler-salary-SRCH_KO0,17.htm
- Glassdoor AU — Planner/Scheduler salaris — https://www.glassdoor.com.au/Salaries/planner-scheduler-salary-SRCH_KO0,17.htm
- SalaryExpert — Project Scheduler Australië — https://www.salaryexpert.com/salary/job/project-scheduler/australia
- Careermine — Principal Mining Consultant USD 141-160k — https://careermine.com/jobs
- Fluor — Mining & Metals EPCM — https://www.fluor.com/market-reach/industries/mining-metals
- Ausenco — EPC/EPCM contracting — https://ausenco.com/what-we-do/epc-epcm-contracting/
- Worley — EPCM project delivery — https://www.worley.com/en/solutions/services-and-technology/enhance-project-delivery
- True Source Metals — mining EPCM ecosysteem (Fluor, Bechtel, Hatch, Worley, Ausenco) — https://hub.truesourcemetals.com/ecosystem/mining-epcm/

---

## Verificatie

Adversariële controle, uitgevoerd 25 juli 2026. Doel was niet bevestigen maar **weerleggen**: elke bewering hieronder is actief tegen onafhankelijke bronnen gehouden en elke doorgerekende schatting is opnieuw uitgerekend. Oordelen: **bevestigd** / **gecorrigeerd** / **onzeker**.

### Rekencontroles op de eigen schattingen

| # | Bewering | Oordeel | Bevinding |
|---|---|---|---|
| **V1** | **Eng segment = USD 205–400 mln, midpunt ca. USD 300 mln (€280 mln)** | **GECORRIGEERD** | Optelfout. De ondergrens 205 = 175 + 30 telt de risicoanalyselaag **niet** mee; de bovengrens 400 = 330 + 50 + 20 telt hem **wél** mee én gebruikt de foutieve 50 uit V2. Consistent: **USD 205–375 mln** (excl. risicoanalyse) of **215–395 mln** (incl.). Midpunt **ca. USD 290 mln**, niet 300 mln. |
| **V2** | **Scheduling-licenties segment B = USD 30–50 mln uit "15.000 zitplaatsen × USD 2.000–3.000"** | **GECORRIGEERD** | 15.000 × 3.000 = **45 mln**, niet 50 mln. Bovengrens was ~11% te hoog. Correct: **USD 30–45 mln**. Werkt door in het segment B-totaal: **USD 170–295 mln** in plaats van 170–300 mln. |
| **V3** | **Risicoanalyse USD 10–20 mln uit "15% van de zitplaatsen × Acumen USD 10.300"** | **GECORRIGEERD** | De genoemde parameters geven 0,15 × 15.000 × 10.300 = **USD 23,2 mln**, bóven de opgegeven band. Bovendien is USD 10.300 blijkens de bron een **eerstejaars**bedrag, geen renewal ([Intaver-vergelijking](https://www.linkedin.com/pulse/comparative-analysis-schedule-risk-tools-intaver-institute-inc-vimsc)). Uitkomst 10–20 mln blijft verdedigbaar, maar alleen bij ~10% penetratie en een renewal-prijs; redenering in §4.4 herschreven. |
| **V4** | **EVM/project-controls USD 80–140 mln uit "150–250 bedrijven × USD 300k–1 mln"** | **GECORRIGEERD** | De genoemde parameters geven **USD 45–250 mln** — een band die 3,4× breder is dan de gerapporteerde 80–140 mln. De 80–140 mln is een oordeel dat niet uit de opgegeven parameters volgt. Parameters in §4.4 aangepast naar ~200 contracten à USD 400k–700k, wat de uitkomst wél oplevert. |
| **V5** | **EUR-omrekening bij "koers ca. 1,08 USD/EUR"** | **GECORRIGEERD** | EUR/USD noteert medio juli 2026 **1,137**, met een 52-weeksbereik van **1,1325–1,2079** — 1,08 is het hele afgelopen jaar niet voorgekomen. Alle EUR-bedragen waren ca. **5% te hoog**. Gecorrigeerd: eng **€180–330 mln** (midpunt €255 mln, niet €280 mln), middel **€660–985 mln**, breed **€1,67–2,90 mrd**. Bron: [Investing.com EUR/USD](https://www.investing.com/currencies/eur-usd) |
| **V6** | **Bottom-up segment A telt op tot USD 580–820 mln** | **BEVESTIGD** | Nagerekend: min 110+85+46+60+80+100+60+40 = **581**; max 135+85+50+100+120+160+100+70 = **820**. Correct. Scheduling-deel 30–40% → 174–328 ≈ de gerapporteerde 175–330, midpunt 251 ≈ 250. Correct. |
| **V7** | **Middel USD 750 mln – 1,12 mrd, en breed USD 1,9–3,3 mrd** | **BEVESTIGD (met leesnotitie)** | 580+170 = 750; 820+300 = 1.120. Correct. "Breed" klopt alleen onder de lezing *licenties + 1,5–2× diensten* (= 2,5–3× licenties): 750 × 2,5 = 1,88 mrd; 1.120 × 3 = 3,36 mrd. Onder de alternatieve lezing *totaal = 1,5–2× licenties* zou het 1,13–2,24 mrd zijn. De formulering was ambigu; nu geëxpliciteerd in §4.5. |
| **V8** | **Deswik-regel USD 110–135 mln uit "USD 57 mln (2021) bij 15%/jr"** | **GECORRIGEERD** | De redenering levert USD 57 × 1,15⁴ = **USD 100 mln**, niet 110–135 mln; het gat werd gedicht met "acquisities binnen DMT", wat niet-mijnplanningsactiva (Newtrax, Polymathian) in een mijnplanningsregel trekt. Beter, ongebruikt anker uit het rapport zelf: Sandvik AR2022 SEK 620 mln over ~9 maanden → geannualiseerd ≈ USD 82 mln (2022) → 15%/jr → **USD ~125 mln (2025)**. Band blijft, onderbouwing vervangen. Blijft de zwakste regel in de tabel. |
| **V9** | **Shutdown/STO USD 50–90 mln, "geëxtrapoleerd" uit A$13,3 mrd** | **ONZEKER** | Er stond geen doorrekening onder. Reconstructie: Australië 10–15% wereldwijd → ca. USD 58–87 mrd onderhoud → STO-softwarepenetratie ~0,1% → USD 58–87 mln, wat de band toevallig ondersteunt. Maar zowel het Australische wereldaandeel als de 0,1%-penetratie zijn ongefundeerd, en de bron mining.com.au/Oxford Economics was bij hercontrole niet ophaalbaar. Behandel als de zwakste regel van segment B. |
| **V10** | **Deswik AUD 79 mln ÷ 32.000 = AUD 2.470 per licentie/jaar** | **GECORRIGEERD** | Deling rekenkundig juist (2.468,75), maar de eenheden kloppen niet: 32.000 zijn **users** (zie V12), niet licenties; teller is 2021-omzet, noemer een 2026-telling; en de omzet bevat CAD, consultancy en niet-planningmodules. Het rapport noemde het al "geen prijs" — terecht, maar de fout zit ook in de eenheid, niet alleen in de interpretatie. |
| **V11** | **1% mill-downtime ≈ USD 8 mln/jaar; 1 dag mill-reline = USD 2,4 mln** | **BEVESTIGD** | 0,01 × 8.760 u × USD 100.000 = **USD 8,76 mln** ("ruim 8 mln" ✓). 24 × 100.000 = **USD 2,4 mln** ✓. Ook de "factor 3,8 spreiding" bij analisten klopt: 1.910 / 504 = 3,79 ✓. En software als 8% van de zitplaatskosten: 15.000/180.000 = 8,3% ✓. |

### Feitencontroles tegen externe bronnen

| # | Bewering | Oordeel | Bevinding en bron |
|---|---|---|---|
| **V12** | **Deswik: 775 bedrijven, 1.330+ operaties, 32.000+ softwarelicenties** | **GECORRIGEERD** | Deswik's eigen About Us zegt "trusted by over **1330 operations** worldwide" en "**32,000+ software users**" — *users*, geen licenties. **"775 bedrijven" staat op geen van beide aangehaalde bronpagina's** en is niet reproduceerbaar. Ook tegenstrijdig: deswik.com claimt "490+" medewerkers, MiningFMS "approximately 300". [deswik.com/about-us](https://www.deswik.com/about-us), [miningfms.com/vendors/deswik](https://miningfms.com/vendors/deswik/) |
| **V13** | **RPMGlobal FY2025 totale omzet A$76,7 mln (+6%)** | **GECORRIGEERD** | Statutaire FY2025-omzet is **A$73,9 mln** (FY2024: A$69,4 mln), +6,45% — de groeivoet klopt, het niveau is ~4% te hoog gerapporteerd. Bovendien zijn "totaal A$76,7 mln" en "softwarebusiness ca. A$75 mln" **geen twee datapunten**: RPMGlobal verkocht zijn adviestak aan SLR Consulting, waardoor software vrijwel het hele bedrijf ís. Dat lost tegelijk de anomalie op dat ARR (A$71,8 mln) bijna gelijk was aan de "totale" omzet. Geen dubbeltelling in de raming zelf. [StockAnalysis ASX:RUL](https://stockanalysis.com/quote/asx/RUL/financials/), [InvestMETS](https://www.investmets.com/weir-deal-reignites-mining-software-battle/) |
| **V14** | **Micromine USD 85 mln omzet; Weir betaalde A$1,31 mrd bij ~10× EV/omzet en ~20× EBITDA** | **BEVESTIGD** | Letterlijk bevestigd: "Micromine's **US$85 million-a-year revenues**"; Weir betaalde **A$1,31 mrd cash** bij een verwachte CY2025-omzet van **ca. £68 mln (A$138 mln)**, en noemde zelf "a **c10-times EV-to-revenue** multiple" en een "**EBITDA multiple of c20x** at December 2025, excluding synergies", met ca. **90% terugkerende omzet**. Afronding **30 april 2025** (= Q2 2025 ✓). [InvestMETS](https://www.investmets.com/weir-buys-micromine-for-a1-31b/), [global.weir](https://www.global.weir/newsroom/global-news/2025/weir-completes-acquisition-of-micromine/) |
| **V15** | **PwC Mine 2026: top-40 USD 909 mrd omzet (+3,3%), USD 248 mrd EBITDA (+23%), USD 120 mrd winst** | **BEVESTIGD** | Alle drie exact bevestigd, inclusief de vergelijkingsbasis USD 880 mrd voor 2024 en de EBITDA-marge van 27% (van 23%). [PwC Mine](https://www.pwc.com/gx/en/industries/energy-utilities-resources/publications/mine.html) |
| **V16** | **McKinsey: 83% probleemprojecten, >40% capex-overschrijding, 20–30% doorlooptijd, megaprojecten 79%/52%, sample 80 projecten, ⅔ uit slechte inschatting, koper 33% vs ijzererts 13%** | **BEVESTIGD** | Alle cijfers exact bevestigd, inclusief het sample (80 projecten, USD 0,3–5,0+ mrd, <2 tot 8 jaar) en de derde categorie "other metallic ores 12%". [McKinsey](https://www.mckinsey.com/industries/metals-and-mining/our-insights/the-capex-crystal-ball-beating-the-odds-in-mining-project-delivery) |
| **V17** | **EY: 192 projecten >USD 1 mrd, 64% over budget/schema, 39% gemiddelde overschrijding, 15–30% waardeterugwinning** | **BEVESTIGD, maar verkeerd gebruikt** | Cijfers exact bevestigd. **Maar het is een studie uit juni 2021 over een historische steekproef.** In §7.2(a) werd "EY telt 192 mijnbouwprojecten van >USD 1 mrd" gepresenteerd als bewijs dat het aanvalsgebied *nu groot* is — dat is een steekproefomvang, geen lopende projectvoorraad en geen jaarcijfer. Gecorrigeerd in §7.2(a). [EY](https://www.ey.com/en_rs/insights/energy-resources/how-better-project-management-can-boost-minings-capital-productivity) |
| **V18** | **Opencontour: gratis tier, Pro USD 249/mnd, Scheduling USD 399/mnd, Stacking USD 499/mnd** | **BEVESTIGD** | Alle vier prijspunten letterlijk bevestigd op de leverancierspagina, in USD. Jaarequivalenten in §3.2 (USD 2.988 / 4.788 / 5.988) kloppen. Dit is het enige volledig harde prijsanker in het rapport. [opencontourmining.com/pricing](https://www.opencontourmining.com/pricing) |
| **V19** | **Deswik: AUD 79 mln rolling-12m okt-2021, 45% recurring, ~30% EBITA-marge, overname afgerond april 2022, prijs ">A$500 mln"** | **BEVESTIGD** | Sandvik bevestigt "AUD 79 million" rolling-12m per oktober 2021 met "approximately 45 percent" recurring; afronding **4 april 2022**. InvestMETS bevestigt ~A$80 mln omzet, ~30% EBITA-marge, ~45% recurring en de schatting "well north of A$500 million". [Sandvik](https://www.home.sandvik/en/news-and-media/news/2022/04/sandvik-completes-the-acquisition-of-the-leading-mine-planning-software-company-deswik/), [InvestMETS](https://www.investmets.com/sandvik-beats-hot-field-to-take-out-deswik/) |
| **V20** | **InvestMETS Mining Tech 50: totaal USD 6,8 mrd; Hexagon USD 566 mln; ABB USD 1.489 mln; smart mining ca. USD 10 mrd, 3–4× in tien jaar** | **BEVESTIGD** | Alle cijfers bevestigd, inclusief de opbouw van ABB (motion USD 984 mln + automation-allocatie) en Hexagon. Merk op dat Hexagon's USD 566 mln uitdrukkelijk "software, sensors and controls" is — de toewijzing van USD 60–100 mln daarvan aan MinePlan-**planning** in §4.3 blijft een ongetoetste schatting. [InvestMETS Global Mining Tech 50 2026](https://www.investmets.com/global-mining-tech-50-2026/), [InvestMETS](https://www.investmets.com/weir-deal-reignites-mining-software-battle/) |
| **V21** | **Sandvik DMT "double-digit organic revenue growth" 2025** | **GECORRIGEERD** | Sandvik AR2025 zegt: "Solid progress in digital solutions with **double-digit growth in our software businesses (Digital Mining Technologies and Intelligent Manufacturing)**". Dat is (a) een **gecombineerde** uitspraak over twee divisies, (b) zonder het woord *organic*, en (c) zonder enig absoluut omzetcijfer voor DMT of Deswik. De formulering in het rapport was specifieker dan de bron toelaat. [Sandvik AR2025](https://www.annualreport.sandvik/en/2025/) |
| **V22** | **`miningsoftwarereviews.com` als onafhankelijke autoriteit voor rangorde, "31 tools", 5–15% NPV-uplift, USD 5.000-drempel en "most common failure point"** | **ONZEKER — belangrijkste sourcingrisico** | De site is **in 2024 opgericht**, noemt **geen uitgevend bedrijf en geen redactieteam**, en rangschikt via **anonieme upvotes** en niet-vooraf-geverifieerde community-reviews ("published immediately"). Het is een jonge, anoniem beheerde directory (243+ producten, 11 categorieën) — geen analistenhuis. Het rapport leunt er ~20× op, óók voor dragende beweringen. **Alle beweringen die uitsluitend hierop rusten zijn onbevestigd**, met name de rangorde in §2.1, de 5–15% NPV-uplift in §3.6 en de pijnpunten 1 en 4 in §7.1. [miningsoftwarereviews.com/about](https://www.miningsoftwarereviews.com/about) |
| **V23** | **IFC 4.3 sinds januari 2024 ISO-standaard** | **ONZEKER** | De aangehaalde bron zegt inderdaad "officially approved as an ISO standard in January 2024", maar noemt geen ISO-nummer, en buildingSMART/ISO waren bij hercontrole niet ophaalbaar (403). Let op het onderscheid tussen **goedkeuring** (ballot) en **publicatie** als ISO 16739-1:2024; die vielen niet in dezelfde maand. Voor het strategische argument in §5.3/§7.2 maakt dit niet uit. [nordicbim.com](https://www.nordicbim.com/knowledge/en/ifc-4.3) |
| **V24** | **Caterpillar → RPMGlobal: A$5,00/aandeel, A$1,12 mrd / USD 728 mln, 32,6% premie, afgerond 17-feb-2026** | **ONZEKER** | Rekenkundig consistent (5,00 / 3,77 = 1,3263 → 32,6% ✓; A$1,12 mrd × 0,65 ≈ USD 728 mln ✓), maar bij hercontrole waren Reuters en caterpillar.com beide niet ophaalbaar (fetch geweigerd / 403). De aandeelprijs, de premie en de afrondingsdatum zijn dus **niet onafhankelijk bevestigd**. Zijdelings: bij een FY2025-omzet van A$73,9 mln (V13) impliceert A$1,12 mrd een EV/omzet van ~15×, hóger dan de 10× bij Micromine — het rapport noemt die vergelijking niet. |
| **V25** | **ICMM: 8.508 operationele faciliteiten, 43% steenkool, release september 2025** | **ONZEKER** | Niet te verifiëren: icmm.com, discoveryalert.com.au en mining.com gaven alle drie **HTTP 403**. Dit cijfer draagt de hele zitplaatsopbouw van segment B (§4.4, stap 1) én §1.2. Zolang het niet is nagelopen, staat segment B op een ongecontroleerd fundament. |
| **V26** | **A$13,2 mrd (FY24) / A$13,3 mrd (FY25) Australische mijnbouw-onderhoudsuitgaven; S&P exploratiebudget USD 12,40 mrd 2025** | **ONZEKER** | Beide bronnen (mining.com.au, spglobal.com, mining.com) waren bij hercontrole niet ophaalbaar (leeg antwoord / 403). Het onderhoudscijfer draagt de STO-regel in §4.4 (zie V9); het exploratiebudget is alleen context. |
| **V27** | **SEEK: 244 P6-schedulervacatures en 361 shutdown-plannervacatures in Australië; Australië = 10–15% van de wereldmarkt** | **ONZEKER** | Vacaturetellingen op SEEK zijn per definitie een momentopname en veranderen dagelijks; ze zijn niet reproduceerbaar als bron. Belangrijker: het **10–15% wereldaandeel** waarmee ze in §4.4 worden opgeschaald is nergens onderbouwd — het is een aanname die de zitplaatsraming direct schaalt. De "sanity check" bevestigt daarmee vooral zijn eigen aanname. |
| **V28** | **"Schema in P6 native XER-formaat" is contractueel verplicht in mijnbouwaanbestedingen** | **BEVESTIGD ALS ONBEVESTIGD** | Het rapport markeert dit zelf al expliciet als niet-geverifieerd (§5.3, "Eerlijkheidsnotitie"). Die zelfmarkering is correct en is bij deze controle niet weerlegd noch bevestigd — er is in dit onderzoek geen aanbestedingsclausule gevonden. Terecht als [ONBEVESTIGD] laten staan. |
| **V29** | **OMF dekt geen schema's, activiteiten of afhankelijkheden; er bestaat geen open uitwisselformaat voor mijnbouwschema's** | **BEVESTIGD** | Consistent met de OMF-specificatie, die PointSet, LineSet, Surface, GridSurface en BlockModel met attributen dekt — geometrie en modeldata, geen tijd-/activiteitsdomein. Dit is een van de sterkste en best onderbouwde conclusies van het rapport en draagt de strategische afweging in §7.2. |

### Wat na correctie overeind blijft

De **structuur** van het rapport is robuust: de tweedeling mijnplanning↔projectplanning, de OEM-consolidatiegolf, de P6-monocultuur aan de projectkant en de conclusie dat IFC geen mijnbouwstandaard is en OMF geen schema's dekt — dat alles is bevestigd of niet weerlegd. De **externe feitencijfers** (PwC, McKinsey, EY, Weir/Micromine, Sandvik/Deswik, InvestMETS, Opencontour) zijn opvallend accuraat overgenomen: van de elf gecontroleerde externe datapunten waren er acht letterlijk correct.

De **zwakte zit in de eigen doorrekening**, niet in het bronwerk: vijf reken- of consistentiefouten (V1–V5) en twee gevallen waarin de gerapporteerde uitkomst niet uit de opgegeven parameters volgt (V3, V4). Netto-effect op de kop-cijfers: de enge segmentraming daalt van USD 205–400 mln naar **USD 205–375 mln**, het midpunt van USD 300 mln naar **ca. USD 290 mln**, en het EUR-midpunt van €280 mln naar **ca. €255 mln** — een neerwaartse bijstelling van ca. 9% in euro's, vrijwel volledig door de verkeerde wisselkoers.

Drie fundamenten zijn **niet controleerbaar gebleken** en verdienen een expliciete waarschuwing: het ICMM-cijfer van 8.508 faciliteiten (V25) dat heel segment B draagt, het Australische wereldaandeel van 10–15% (V27) waarmee de zitplaatsen worden opgeschaald, en de status van `miningsoftwarereviews.com` (V22) waarop een groot deel van de kwalitatieve rangorde rust.
