# Marktonderzoek: projectplanning-/schedulingsoftware in Canada

*Onderzoeksdatum: juli 2026. Regio: Noord-Amerika. Focus: software met Gantt/CPM voor bouw, infra, energie en industrie.*

---

## 1. Samenvatting

Canada is een klassieke "P6-markt": een grote, professionele planningsmarkt naar Angelsaksisch model, gedomineerd door **Oracle Primavera P6** in infra, transit, mijnbouw en olie & gas, met **Microsoft Project** als breed tweede pakket voor gebouwen, ingenieursbureaus en kleinere aannemers. De markt wordt gedreven door een zware publieke investeringsagenda — in 2025 werd een infra-uitgavenniveau van boven de 100 miljard geprojecteerd (valuta niet gespecificeerd door de bron; zie §2 en §Verificatie), met lopende megaprogramma's als GO Expansion/Ontario Line en Scarborough Subway (Metrolinx, Toronto) en de Surrey–Langley-SkyTrain (Vancouver) — plus een volwassen claims-/delay-analysecultuur waarin CPM-schedules contractueel afdwingbare documenten zijn. *(Correctie t.o.v. eerdere versie: Trans Mountain (in dienst mei 2024), LNG Canada fase 1 (eerste cargo 30 juni 2025) en Site C zijn inmiddels opgeleverd en zijn dus geen lopende vraagdrijvers meer — [CER](https://www.cer-rec.gc.ca/en/data-analysis/energy-markets/market-snapshots/2025/market-snapshot-trans-mountain-expansion-eases-pipeline-constraints-and-increases-exports-to-overseas-markets.html), [LNG Canada](https://www.lngcanada.ca/news/first-cargo-puts-canada-on-the-map-of-lng-exporting-nations/).)*

Kernbevindingen:

- **P6 is de de-facto standaard** bij opdrachtgevers (Metrolinx, Infrastructure Ontario, Hydro-Québec, TransLink), grote aannemers (PCL, EllisDon, Aecon, Ledcor, Graham, Kiewit Canada) en energie/mijnbouw (Suncor, Teck, hatch-/AtkinsRéalis-projecten). Vacatures voor planners noemen vrijwel altijd "Primavera P6 en/of MS Project"; Glassdoor toont doorlopend 100–120 open P6-planner-vacatures in Canada ([Glassdoor](https://www.glassdoor.ca/Job/primavera-p6-scheduler-jobs-SRCH_KO0,22.htm)).
- **Microsoft Project** is alomtegenwoordig als tweede/instappakket; hybride gebruik (MSP intern, P6 richting klant) is de norm ([FLAG](https://frontlineadvisorygroup.com/the-two-sides-of-the-scheduling-coin-primavera-p6-vs-microsoft-project/)).
- Er is een levendig ecosysteem van **Canadese Oracle-Primavera-resellers en consultants** (Emerald Associates in Calgary — sinds 1995 Primavera-partner en enige Canadese "Premier Solution Provider" — plus opleiders in Montreal als Doussou Formation en Ecostar Plan).
- **Nichepakketten** hebben duidelijke plekken: TILOS voor pijpleidingen en lineaire infra (gebruikt op de Alberta Clipper-pijpleiding en Toronto-LRT-projecten), InEight (Kiewit-oorsprong) voor heavy civil/energie, Powerproject via exclusieve partner PM ERA in Ontario, Phoenix Project Manager als goedkoop CPM-alternatief, Safran/Deltek Open Plan in energie/defensie.
- **Lokale Canadese software** zit vooral naast de planning (workforce/kosten): Bridgit Bench (Kitchener), 4castplus (Calgary), Maestro (Montreal ERP). Een echte Canadese CPM-Gantt-concurrent bestaat niet — de markt koopt Amerikaans/Brits.
- **Tweetaligheid**: Quebec is een aparte deelmarkt met Franstalige opleidingen, Franstalige tender-documentatie (Hydro-Québec, MTQ) en taaleisen (Wet 96 / Charte de la langue française) — een pluspunt voor software met een goede FR-locale.
- **Marktomvang** (schatting, zie §2): de totale Canadese projectmanagementsoftware-markt is volgens Grand View Research ca. **USD 0,9–1,0 miljard (2024)**, groeiend met ~15,5% CAGR naar USD 2,24 miljard in 2030 ([Grand View Research](https://www.grandviewresearch.com/horizon/outlook/project-management-software-market/canada)) — **let op: dit GVR-cijfer impliceert dat Canada ~11% van de wéreldmarkt zou zijn, wat niet te rijmen valt met Canada's ~2% aandeel in het wereld-bbp; behandel het als bovengrens, zie §Verificatie**. Het bouwspecifieke CPM/Gantt-schedulingsegment daarbinnen is naar schatting **USD 40–80 miljoen per jaar** (eigen schatting, herzien; redenering in §2).

---

## 2. Marktomvang

### Harde cijfers (met bron)

| Metric | Waarde | Jaar | Bron |
|---|---|---|---|
| Canada projectmanagementsoftware-markt (breed) | USD 2.244,4 mln (prognose) | 2030 | [Grand View Research](https://www.grandviewresearch.com/horizon/outlook/project-management-software-market/canada) |
| CAGR Canada PM-software | 15,5% | 2024–2030 | [Grand View Research](https://www.grandviewresearch.com/horizon/outlook/project-management-software-market/canada) |
| Canada-aandeel in wereldwijde PM-softwaremarkt | 11,1% — *implausibel hoog, zie §Verificatie* | 2023 | [Grand View Research](https://www.grandviewresearch.com/horizon/outlook/project-management-software-market/canada) |
| Canada constructiesoftware-markt (alle bouwsoftware) | USD 222,0 mln (2024) → **USD 675,0 mln (2035)**, CAGR **10,64%** (2025–2035) | 2024/2035 | [Market Research Future](https://www.marketresearchfuture.com/reports/canada-construction-software-market-45911) — *gecorrigeerd; eerdere versie noemde 640,7 mln / 5,04%* |
| Wereldwijde construction-scheduling-software | USD 1,31 mrd (2024) → 1,44 mrd (2025) → 2,09 mrd (2029), CAGR 9,8% | 2025 | [Research and Markets / GlobeNewswire](https://www.globenewswire.com/news-release/2025/10/22/3170911/0/en/Construction-Schedule-Software-Market-Report-2025-Digital-Tools-Drive-Rapid-Growth-Reaching-US-2-09-Billion-by-2029.html) |
| Noord-Amerika-aandeel construction scheduling | 38,2%; **USD 550 mln** op de R&M-basis (1,44 mrd), of USD 803 mln op MarketIntelo's eigen basis (2,1 mrd) | 2025 | [MarketIntelo](https://marketintelo.com/report/construction-scheduling-software-market) — *bronattributie gecorrigeerd: het 38,2%/803-mln-paar komt van MarketIntelo, niet van Cognitive Market Research* |
| Canadese infra-uitgaven | "infrastructure spending projected to exceed $100 billion" in 2025 (valuta niet gespecificeerd; **eenmalige jaarprojectie**, geen structureel jaarcijfer); federaal daarnaast CAD 180 mrd over 12 jaar | 2025 | [Market Research Future](https://www.marketresearchfuture.com/reports/canada-construction-software-market-45911) |

### Afgeleide schatting (expliciet gemarkeerd als SCHATTING)

- **Canada PM-software 2024 ≈ USD 0,95 mrd (bovengrens)**: terugrekenen van USD 2.244,4 mln (2030) met 15,5% CAGR over 6 jaar geeft 2.244,4 / 1,155^6 = USD 945,4 mln. *(Rekenkundig nagerekend en correct.)* **Kanttekening:** GVR's eigen wereldcijfer is USD 6,6 mrd (2022) → USD 20,5 mrd (2030) bij 15,7% CAGR ([GVR](https://www.grandviewresearch.com/industry-analysis/project-management-software-market-report)), dus wereldwijd ≈ USD 8,8 mrd in 2024. USD 945 mln voor Canada is dan **~11% van de wereldmarkt**, terwijl Canada ~2% van het wereld-bbp en grofweg 3% van de wereldwijde IT-uitgaven vertegenwoordigt. GVR's "Horizon"-landenpagina's zijn geautomatiseerde afgeleiden; behandel USD 0,95 mrd als bovengrens en een realistischer orde als **USD 0,2–0,4 mrd**.
- **Bouwspecifieke CPM/Gantt-scheduling in Canada ≈ USD 40–80 mln/jaar (2025)** *(herzien; was 60–90 mln)*: de Noord-Amerikaanse basis is zelf onzeker — 38,2% van Research & Markets' USD 1,44 mrd = **USD 550 mln**, terwijl MarketIntelo dezelfde 38,2% op een eigen wereldbasis van USD 2,1 mrd zet en op USD 803 mln uitkomt. Canada is ~7% van het gezamenlijke bbp van de VS + Canada (CAD/USD 2,2 bln tegen ~30 bln), dus 7–10% van de NA-omzet is realistischer dan de eerder gebruikte 8–11% → 0,07 × 550 ≈ USD 39 mln tot 0,10 × 803 ≈ USD 80 mln. *(Eigen schatting; de eerdere onderbouwing "consistent met 11,1% wereldaandeel" is geschrapt omdat dat wereldaandeel zelf niet houdbaar is.)*
- **Aantal professionele planners/schedulers**: Glassdoor toonde bij raadpleging ± 100–120 open P6-vacatures ([Glassdoor](https://www.glassdoor.ca/Job/primavera-p6-scheduler-jobs-SRCH_KO0,22.htm)) — een momentopname van een brede trefwoordzoekopdracht, niet reproduceerbaar en niet beperkt tot echte P6-planners. Met een aangenomen vacaturegraad van 3–5% zou dat een beroepsgroep van orde 3.000–8.000 fulltime planners impliceren; **markeer dit als zwak onderbouwd** (twee ongevalideerde aannames op elkaar gestapeld). Planner-salarissen: gemiddeld **CAD 105.000/jaar (≈ CAD 53,85/uur)**, instapniveau ~CAD 90.000 ([talent.com Canada](https://ca.talent.com/salary?job=project+scheduler), 10.000 opgaven) — dit vervangt de eerdere band "CAD 70k–120k" en het ZipRecruiter-cijfer van CAD 51/uur (ziprecruiter.com is de VS-site en noteert in USD).

---

## 3. Gebruikte software: marktpositie en prijzen

### Tier 1 — de standaarden

**1. Oracle Primavera P6 (Professional / EPPM / Oracle Primavera Cloud)** — *marktleider infra, transit, energie, mijnbouw*
- Gebruikers: opdrachtgevers, heavy-civil- en transit-aannemers, olie & gas in Alberta, mijnbouw (Teck, Agnico), ingenieursbureaus (Hatch, AtkinsRéalis, Stantec, WSP). In vacaturebanken is P6 veruit de meest gevraagde planningsskill ([Indeed Canada](https://ca.indeed.com/q-scheduler-primavera-p6-l-toronto,-on-jobs.html), [Glassdoor](https://www.glassdoor.ca/Job/primavera-p6-scheduler-jobs-SRCH_KO0,22.htm)). *(Gecorrigeerd: de eerder aangehaalde Metrolinx-pagina over GO Expansion noemt P6 noch enige planningssoftware — die bron onderbouwt de claim niet; zie §Verificatie.)*
- Prijzen: P6 Professional perpetual — geen publieke Oracle-lijstprijs; **resellers/aggregators noemen consistent ~USD 3.500 per named-user-licentie** (ook genoemd: USD 3.520) + **22% software update licence & support per jaar** (≈ USD 770); de eerder genoemde ondergrens van USD 2.500 is nergens te staven ([Taradigm](https://www.taradigm.com/how-much-does-primavera-p6-cost/), [primaverascheduling.com](https://primaverascheduling.com/), [Compass Consult](https://compassconsult.co/the-cost-to-buy-a-primavera-p6-licence-why-it-matters/)). Oracle Primavera Cloud (OPC): **USD 7.800/jaar voor 5 seats = USD 1.560/gebruiker/jaar = USD 130/gebruiker/maand**, minimaal 5 gebruikers per module, support inbegrepen ([Global PM](https://globalpm.com/oracle-primavera-cloud-pricing/)); een UK G-Cloud-tarief voor P6 EPPM staat op £220/gebruiker/maand bij minimaal 25 gebruikers. *(Let op: dit zijn resellerprijzen, geen Oracle-lijstprijs.)* De claim "TCO 2–3× de licentieprijs" staat **niet** op de aangehaalde Compass-Consult-pagina — behandel als onbevestigd vuistregel.
- Kanaal: Canadese resellers, met **Emerald Associates (Calgary)** als oudste en grootste — Primavera-partner sinds 1995 (bevestigd via de eigen sitebeschrijving). *De aanvullende claims "geautoriseerd reseller sinds 2004" en "ooit als enige Canadees Premier Solution Provider" zijn zelfrapportage en waren bij verificatie niet te controleren (emerald-associates.com gaf HTTP 403); Oracle hanteert de tiernaam "Premier Solution Provider" bovendien niet meer in het huidige partnerprogramma — behandel als onzeker* ([Emerald](https://www.emerald-associates.com/emerald-associates/about-us/history.html), [Oracle Partner Finder](https://partner-finder.oracle.com/catalog/Partner/SC2PP-EMERALD)).

**2. Microsoft Project (Project Plan 3/5, Project Professional/Standard)** — *breedste installed base*
- Gebruikers: vrijwel alle middelgrote aannemers, ingenieursbureaus, gemeenten, vastgoedontwikkelaars; vaak naast P6 ("MSP intern, P6 naar de klant") ([FLAG](https://frontlineadvisorygroup.com/the-two-sides-of-the-scheduling-coin-primavera-p6-vs-microsoft-project/), [Plan Academy](https://www.planacademy.com/microsoft-project-vs-primavera-p6-which-is-the-best-project-management-tool/)).
- Prijzen (juli 2026, geverifieerd op microsoft.com): **Planner Plan 1 USD 10, Planner & Project Plan 3 USD 30, Planner & Project Plan 5 USD 55 — per gebruiker per maand, "paid yearly"** (dus USD 360 resp. USD 660 per gebruiker per jaar) ([Microsoft Plan 3](https://www.microsoft.com/en-us/microsoft-365/planner/project-plan-3), [Costbench](https://costbench.com/software/project-management/microsoft-project/)); desktop-eenmalig: **Project Standard 2024 USD 679,99 en Project Professional 2024 USD 1.129,99** ([Microsoft](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software)).

**3. Procore (Scheduling-module + P6/MSP-integratie)** — *breed gebruikt projectmanagementplatform, scheduling als satelliet* *(term "dominant" afgezwakt: er is geen marktaandeelcijfer voor Canada gevonden en Autodesk Construction Cloud/Bluebeam zijn serieuze alternatieven)*
- Sterk verankerd bij Canadese GC's (o.a. EllisDon zichtbaar in het Procore-netwerk: [Procore](https://network.procore.com/p/ellisdon-ottawa)); Procore Scheduling centraliseert planningen maar de CPM-planning zelf komt meestal uit P6/MSP ([Procore](https://www.procore.com/en-ca/project-management/schedule)). Prijs: geen lijstprijzen; Procore rekent **een jaarlijkse fee per product op basis van Annual Construction Volume (ACV) — het bouwvolume van de projecten, níet de bedrijfsomzet**, met onbeperkte gebruikers ([Procore pricing](https://www.procore.com/pricing)). Orde USD 10k–100k+/jaar is een *schatting op basis van publieke reviews*.

### Tier 2 — sector-specialisten

**4. InEight Schedule / Project Controls** — Kiewit-oorsprong; gebruikt door Kiewit (groot actief in Canadese heavy civil/energie) en naar eigen opgave 850+ bedrijven / 575.000 gebruikers wereldwijd (zelfrapportage, consistent herhaald) ([Kiewit](https://www.kiewit.com/about-us/technology-at-kiewit/ineight/), [InEight](https://ineight.com/products/ineight-project-controls/)). Prijs: enterprise quote-based (*orde USD 100+/gebruiker/maand — schatting*).

**5. TILOS (Trimble)** — lineaire planning (tijd-weg-diagrammen) voor pijpleidingen, wegen, rail. Bewezen Canadese inzet: **Alberta Clipper-pijpleiding** en **Toronto Transit LRT-uitbreidingen** ([Planning Planet/TILOS](https://planningplanet.com/groups/506158/tilos), [Trimble](https://construction.trimble.com/en/products/tilos)). Prijs: quote-based; *veldschatting orde USD 5.000–8.000 per seat perpetual (schatting)*.

**6. Elecosoft Asta Powerproject** — VK-standaard, in Canada een niche met een eigen kanaal: PM ERA Inc. presenteert zich op de eigen site als "the exclusive Powerproject partner in Ontario, Canada" en positioneert het als 4D/5D-alternatief ([PM ERA](https://www.pmera.com/services/project-scheduling/), [Elecosoft](https://elecosoft.com/us/products/asta/asta-powerproject/)) — *zelfrapportage, niet bevestigd door Elecosoft zelf*. Prijs (gecorrigeerd): Elecosoft verkoopt Powerproject inmiddels als **abonnement**, single-user vanaf **~£880 per jaar**, concurrent-licentie ~**£2.000 per jaar**; enterprise/SaaS op offerte ([pricingnow](https://pricingnow.com/question/powerproject-pricing/), [itqlick](https://www.itqlick.com/powerproject/pricing)). *De eerdere "£1.200–1.700 per licentie" vermeldde geen periode en is niet te staven; aggregatorprijzen — onzeker.*

**7. Deltek Open Plan + Acumen Fuse/Risk** — energie, defensie, compliance-gedreven programma's; Acumen Fuse is bij Canadese owners een gangbare schedule-kwaliteitstool ([Deltek](https://www.deltek.com/products/delivery-assurance/ppm/open-plan/), [Deltek Acumen](https://www.deltek.com/products/delivery-assurance/ppm/acumen/)). Prijs: quote-based.

**8. Safran Project / Safran Risk** — Noors, sterk in olie & gas/offshore; aanwezig in Alberta-energieprojecten via project-controls-consultancies ([Opteam-overzicht](https://opteam.ai/project-controls-software-for-construction-projects/)). Prijs: quote-based.

**9. Bentley Synchro (4D)** — 4D-planning op transit-megaprojecten (koppelt P6-planningen aan BIM); gangbaar bij P3-consortia in Toronto/Vancouver. *(Positie: aanvullend op P6, geen vervanger.)*

**10. Phoenix Project Manager (CDP Inc.)** — goedkoop, door schedulers gewaardeerd CPM-pakket voor heavy civil; **USD 799 per licentie** (Phoenix 5) — de bestelpagina bevestigt het bedrag maar noemt de term "perpetual" niet en vermeldt geen jaarlijkse supportfee; importeert/exporteert P6 en MSP ([Phoenix](https://www.phoenixcpm.com/shop/purchase.php), [SmartPM-review](https://smartpm.com/blog/best-construction-scheduling-software)).

**11. AI-/analytics-laag (opkomend)**: SmartPM (schedule-analytics op XER), nPlan, Nodes & Links en ALICE Technologies worden op Noord-Amerikaanse megaprojecten gepilot; concrete gedocumenteerde Canadese referenties zijn nog schaars ([nPlan](https://www.nplan.io/), [ALICE](https://www.alicetechnologies.com/home)). Prijs: enterprise quote-based.

### Tier 3 — lichte/algemene tools (serieus gebruikt voor planning)

- **Smartsheet** — veel gebruikt door owners/PMO's en mid-market aannemers voor Gantt-planning en rapportage. Prijs (gecorrigeerd, juli 2026): **Pro USD 9 en Business USD 19 per gebruiker per maand bij jaarfacturering**; USD 12 resp. USD 24 bij maandfacturering; Enterprise op offerte ([Smartsheet pricing](https://www.smartsheet.com/pricing), [Capterra Canada](https://www.capterra.ca/software/79104/smartsheet)). *De eerdere USD 12/24 waren de maandprijzen, niet de lijstprijs op jaarbasis.* Capterra Canada noteert Smartsheet in **US$**; Smartsheet's eigen prijspagina toont daarnaast CAD-bedragen — "rekent af in CAD" is dus hooguit deels juist.
- **Monday.com / Wrike / Asana (Timeline)** — kantoor-/PMO-planning, zelden contractuele CPM. Lijstprijzen per gebruiker/maand **bij jaarfacturering** (geverifieerd juli 2026): monday.com Standard USD 12 (USD 20 bij maandfacturering), Wrike Team USD 10 (2–15 seats, tarieven geldig vanaf 21-01-2026), Asana Starter USD 10,99 (USD 13,49 maandelijks) ([monday](https://monday.com/pricing), [Wrike](https://www.wrike.com/price/), [Asana](https://asana.com/pricing)).
- **Buildertrend** en **CoConstruct** — woningbouw-planning ([ProjectManager FR-overzicht](https://www.projectmanager.com/fr/meilleurs-logiciels-de-planification-de-la-construction)). *De eerder genoemde "20.000+ aannemers" komt uit bedrijvendatabases (ZoomInfo) en is gedateerd; Buildertrend communiceert zelf "meer dan 1 miljoen gebruikers in 100 landen" — beide cijfers zijn niet onafhankelijk verifieerbaar.*
- **Open source**: ProjectLibre, GanttProject, OpenProject — in Canada vooral onderwijs en incidenteel mkb; geen zichtbare rol in contractuele planning. *(Kwalitatieve vaststelling; geen bron met cijfers gevonden.)*

### Lokale Canadese spelers (naast/rond de planning)

| Pakket | Herkomst | Rol | Prijs |
|---|---|---|---|
| **Bridgit Bench** | Kitchener, ON | Workforce-/resourceplanning voor GC's (geen CPM) | quote-based ([Bridgit](https://gobridgit.com/)) |
| **4castplus** | Calgary, AB | Projectkostenbeheersing + progress/forecasting voor infra & overheid; profileert zich op "100% Canadese" datasoevereiniteit | quote-based ([4castplus](https://4castplus.com/canadian-lp/)) |
| **Maestro (Maestro Technologies)** | Montreal, QC | Bouw-ERP (boekhouding/projectbeheer) voor Quebecse aannemers; planning is bijzaak | quote-based ([Sercom-overzicht Quebecse bouwsoftware](https://www.sercom.io/guides-articles/logiciels-de-gestion-de-chantier-construction-quebecois)) |
| **Jonas Construction Software** | Toronto, ON (Constellation) | Bouw-ERP; scheduling beperkt | quote-based |

**Voor- en nadelen van deze lokale pakketten** (omdat ze buiten Canada nauwelijks voorkomen):
- *Bridgit Bench*: + zeer gebruiksvriendelijk, sterke workforce-Gantt, goede Procore-integratie; − geen CPM/geen taaklogica, dus geen vervanger van P6/MSP — het is personeelsplanning, geen projectplanning (bron: eigen site + Capterra-reviews).
- *4castplus*: + sterke integratie kosten↔voortgang, Canadese hosting (relevant voor overheidsdata); − geen volwaardige CPM-engine, gebruikt naast P6/MSP; kleinere community ([4castplus](https://4castplus.com/)).
- *Maestro*: + diep verankerd in Quebec (FR-first, CCQ-loonadministratie); − verouderde UI volgens reviews, planningsmodule rudimentair; alleen relevant als ERP-context.

---

## 4. Lokale bijzonderheden

1. **Contractuele scheduling-cultuur (Angelsaksisch)** *(genuanceerd)*: CCDC 2 GC 3.5 verplicht de aannemer een bouwschema op te stellen en in te dienen vóór de eerste betalingsaanvraag, met "the timing of the major activities" en "sufficient detail of the critical events and their inter-relationship", en dat schema te bewaken en bij te werken; vertragingsmeldingen lopen via GC 6.5 ([CCDC 2, tekst via CANS](https://cans.ns.ca/wp-content/uploads/2020/12/CCDC2-E.pdf)). **CCDC 2 schrijft géén CPM-methode en géén specifieke software voor** — de eerdere formulering "vereisen een baseline-schedule" was te stellig. Delay-claims worden in de praktijk wél met forensische CPM-analyse beslecht (AACE RP 29R-03 als referentie), en dát houdt de vraag naar P6 en XER-uitwisseling hoog.
2. **P6/XER als feitelijke tenderformaat-eis — ONBEVESTIGD**: het beeld is dat grote publieke opdrachtgevers (Metrolinx, Infrastructure Ontario-P3's, TransLink, provinciale ministeries) in projectovereenkomsten een resource-loaded CPM-schedule eisen, in de praktijk in P6 met XER-aanlevering. **Er is bij verificatie geen enkele publieke Canadese aanbestedings- of specificatietekst gevonden die P6 voorschrijft**, en de eerder aangehaalde Metrolinx-pagina over GO Expansion noemt geen planningssoftware. Behandel dit als sectorobservatie op basis van vacature-eisen, niet als aantoonbare contracteis. Amerikaans-geïnspireerde specs (USACE-stijl) werken door via grensoverschrijdende aannemers ([Ten Six](https://tensix.com/understanding-the-primavera-p6-usace-mandatory-requirements/)).
3. **Tweetaligheid EN/FR**: Quebec vormt ~22% van de markt (*onzeker: dit is het bevolkingsaandeel; Quebec's aandeel in het Canadese bbp ligt eerder rond 19–20% en software-uitgaven concentreren zich in Ontario en Alberta*) met een eigen ecosysteem: Franstalige P6-opleiders in Montreal (Doussou Formation, Ecostar Plan — [Doussou](https://www.doussou-formation.com/formation/formation-en-primavera-expertise-en-planification-et-controle-de-projets/), [Ecostar](https://ecostarplan.com/training/primavera-training-project-planning-and-control-with-oracle-primavera-p6/)), Franstalige tenders (Hydro-Québec publiceert appels d'offres primair in het Frans — [Hydro-Québec](https://www.hydroquebec.com/achats-electricite-quebec/appels-propositions/2026-01.html)) en taalwetgeving (Charte de la langue française/Wet 96) die Franstalige software-UI op de werkvloer bevordert. Een goede FR-locale is hier een concreet verkoopargument.
4. **Opleidings-/certificeringscultuur**: sterk PMI-gedreven (PMP is quasi-verplicht in vacatures), AACE-certificeringen (PSP, CCP) voor planners; P6-training is een eigen mini-industrie (Emerald, Global PM, Procept, CAI Classroom, plus de genoemde Montrealse aanbieders).
5. **Regionale clusters**: Toronto (transit-megaprojecten, hoogbouw), Vancouver (transit, LNG), Calgary/Edmonton (olie & gas, pijpleidingen — hier zit ook het Primavera-kanaal: Emerald, 4castplus), Noord-Ontario/Quebec/BC (mijnbouw). Elk cluster heeft eigen dominante tooling-accenten (TILOS in pijpleidingen; InEight in Kiewit-achtige heavy civil; Safran/Open Plan in energie).
6. **Hoge softwarebereidheid maar prijsgevoelig mkb**: de vele kleine/middelgrote subcontractors gebruiken MSP, Smartsheet of niets; de dure P6-seat blijft voorbehouden aan dedicated planners. Dit creëert ruimte voor goedkope CPM-tools die XER kunnen lezen/schrijven (het gat dat Phoenix in de VS vult).

---

## 5. Bronnen (selectie)

- Grand View Research — Canada Project Management Software Market: https://www.grandviewresearch.com/horizon/outlook/project-management-software-market/canada
- Market Research Future — Canada Construction Software Market: https://www.marketresearchfuture.com/reports/canada-construction-software-market-45911
- GlobeNewswire/Research & Markets — Construction Schedule Software Market 2025: https://www.globenewswire.com/news-release/2025/10/22/3170911/0/en/Construction-Schedule-Software-Market-Report-2025-Digital-Tools-Drive-Rapid-Growth-Reaching-US-2-09-Billion-by-2029.html
- MarketIntelo — Construction Scheduling Software Market (werkelijke herkomst van het NA-aandeel van 38,2% / USD 803 mln): https://marketintelo.com/report/construction-scheduling-software-market
- Cognitive Market Research — Construction Scheduling Software (*bij verificatie: geen zichtbare cijfers, preview gemaskeerd — was onterecht als bron voor het NA-aandeel opgevoerd*): https://www.cognitivemarketresearch.com/construction-scheduling-software-market-report
- Taradigm — How much does Primavera P6 cost: https://www.taradigm.com/how-much-does-primavera-p6-cost/
- Global PM — Oracle Primavera Cloud pricing: https://globalpm.com/oracle-primavera-cloud-pricing/
- Microsoft — Planner and Project Plan 3: https://www.microsoft.com/en-us/microsoft-365/planner/project-plan-3
- Emerald Associates (Calgary, Oracle-partner): https://www.emerald-associates.com/emerald-associates/about-us/history.html
- PM ERA (exclusieve Powerproject-partner Ontario): https://www.pmera.com/services/project-scheduling/
- Trimble TILOS + Planning Planet (Alberta Clipper, Toronto LRT): https://planningplanet.com/groups/506158/tilos
- Kiewit/InEight: https://www.kiewit.com/about-us/technology-at-kiewit/ineight/
- Phoenix Project Manager pricing: https://www.phoenixcpm.com/shop/purchase.php
- Glassdoor Canada — P6-planner-vacatures: https://www.glassdoor.ca/Job/primavera-p6-scheduler-jobs-SRCH_KO0,22.htm
- talent.com Canada — salaris project scheduler (vervangt ZipRecruiter): https://ca.talent.com/salary?job=project+scheduler
- ZipRecruiter — P6-salarissen Alberta (*VS-site, USD; niet op te halen bij verificatie*): https://www.ziprecruiter.com/Jobs/Primavera-P6/--in-Alberta
- Metrolinx — GO Expansion delivery (*bevat géén verwijzing naar P6/scheduling; onderbouwt de eraan gekoppelde claims niet*): https://www.metrolinx.com/en/discover/how-metrolinx-will-tackle-future-go-expansion-projects-
- CCDC 2 (volledige tekst via CANS) — GC 3.5 construction schedule: https://cans.ns.ca/wp-content/uploads/2020/12/CCDC2-E.pdf
- Grand View Research — wereldwijde PM-softwaremarkt (voor de plausibiliteitstoets op het Canada-aandeel): https://www.grandviewresearch.com/industry-analysis/project-management-software-market-report
- Defence Construction Canada / OPO — contractadministratie: https://opo-boa.gc.ca/contract-administration-eng.html
- Doussou Formation (Montreal, FR P6-training): https://www.doussou-formation.com/formation/formation-en-primavera-expertise-en-planification-et-controle-de-projets/
- Hydro-Québec — appels d'offres: https://www.hydroquebec.com/achats-electricite-quebec/appels-propositions/2026-01.html
- Sercom — Quebecse bouwsoftware: https://www.sercom.io/guides-articles/logiciels-de-gestion-de-chantier-construction-quebecois
- 4castplus (Calgary): https://4castplus.com/canadian-lp/
- Bridgit (Kitchener): https://gobridgit.com/
- Capterra Canada — Smartsheet: https://www.capterra.ca/software/79104/smartsheet
- Procore Canada: https://www.procore.com/en-ca/project-management/schedule

*Alle bedragen zijn lijst-/indicatieprijzen in USD tenzij anders vermeld; als "schatting" gemarkeerde cijfers zijn eigen afleidingen met vermelde redenering.*

---

## Verificatie

*Adversariële fact-check, uitgevoerd juli 2026. Per bewering is geprobeerd deze te wéérleggen met bronnen buiten de oorspronkelijk aangehaalde. Oordeel: **bevestigd** / **gecorrigeerd** / **onzeker**. Correcties zijn hierboven in de lopende tekst verwerkt.*

### Marktomvang en doorgerekende schattingen

**1. Canada PM-software 2024 ≈ USD 945 mln (terugrekening uit USD 2.244,4 mln @ 15,5% CAGR) — bevestigd (rekenkundig)**
2.244,4 / 1,155^6 = 945,38. De rekensom klopt en de periode (2024–2030 = 6 jaar) sluit aan op de bronformulering "a CAGR of 15.5% is expected of Canada project management software market from 2024 to 2030". Bron: GVR-snippet via [DuckDuckGo-index van de GVR Horizon-pagina](https://html.duckduckgo.com/html/?q=Grand+View+Research+Canada+project+management+software+market+2030) (grandviewresearch.com zelf gaf HTTP 403).

**2. "Canada = 11,1% van de wereldwijde PM-softwaremarkt (2023)" — onzeker, waarschijnlijk fors overschat**
Het cijfer is intern consistent met GVR's eigen data (wereldmarkt USD 6,6 mrd in 2022 → USD 20,5 mrd in 2030 bij 15,7% CAGR ⇒ ~USD 8,8 mrd in 2024; USD 945 mln Canada = 10,7%), maar niet met de werkelijkheid: Canada is ~2% van het wereld-bbp en grofweg 3% van de wereldwijde IT-uitgaven. Een aandeel van 11% zou betekenen dat Canada vijf keer zijn economisch gewicht aan PM-software uitgeeft. GVR's "Horizon"-landenpagina's zijn geautomatiseerde afsplitsingen van het wereldmodel. Aanbeveling: als bovengrens gebruiken, realistischer orde USD 0,2–0,4 mrd. Bron: https://www.grandviewresearch.com/industry-analysis/project-management-software-market-report

**3. "Canada constructiesoftware-markt: USD 640,7 mln bij 2035, CAGR 5,04%" — gecorrigeerd**
De aangehaalde bron zelf geeft andere cijfers: basisjaar 2024 **USD 222,0 mln**, 2025 USD 245,62 mln, **USD 675,0 mln in 2035** bij **CAGR 10,64% (2025–2035)**. Beide oorspronkelijke getallen waren fout (omvang én groeivoet, de laatste ruim een factor 2). Bron: https://www.marketresearchfuture.com/reports/canada-construction-software-market-45911

**4. "Noord-Amerika = 38,2% ≈ USD 803 mln (2025), bron Cognitive Market Research" — gecorrigeerd (bronattributie én rekenfout)**
(a) De bronvermelding klopt niet: Cognitive Market Research publiceert geen zichtbare cijfers voor dit segment (preview gemaskeerd, "exact values … in the paid report"). Het paar 38,2%/USD 803 mln komt van **MarketIntelo** (en wordt door DataIntelo herhaald). (b) Rekenfout: 38,2% van de in dezelfde tabel gebruikte wereldbasis van Research & Markets (USD 1,44 mrd, 2025) is **USD 550 mln**, niet 803 mln. USD 803 mln volgt uit MarketIntelo's eigen wereldbasis van **USD 2,1 mrd (2025)**. De tabel mengde dus twee onverenigbare bronnen. Ter illustratie van de spreiding: DataIntelo hanteert voor hetzelfde segment een wereldmarkt van USD 4,6 mrd. Bronnen: https://marketintelo.com/report/construction-scheduling-software-market en https://www.cognitivemarketresearch.com/construction-scheduling-software-market-report

**5. "Bouwspecifieke CPM/Gantt-scheduling Canada ≈ USD 60–90 mln/jaar" — gecorrigeerd naar USD 40–80 mln**
De oude berekening (8–11% × USD 803 mln) stapelde de te hoge NA-basis op een te hoog Canada-aandeel. Canada is ~7% van het gezamenlijke bbp van VS+Canada (~2,2 bln tegen ~30 bln USD), dus 7–10% is realistischer dan 8–11%. Nieuwe bandbreedte: 0,07 × 550 ≈ 39 mln tot 0,10 × 803 ≈ 80 mln. De oude onderbouwing "consistent met Canada's 11,1% wereldaandeel" is geschrapt (zie punt 2).

**6. "Wereldwijde construction-scheduling-software USD 1,44 mrd (2025) → 2,09 mrd (2029)" — bevestigd**
De bron noemt USD 1,31 mrd (2024), USD 1,44 mrd (2025) en USD 2,09 mrd (2029); de CAGR naar 2029 is **9,8%**, niet "~10%" afgerond uit de 10,1% voor 2024–2025. Bron: https://www.globenewswire.com/news-release/2025/10/22/3170911/0/en/Construction-Schedule-Software-Market-Report-2025-Digital-Tools-Drive-Rapid-Growth-Reaching-US-2-09-Billion-by-2029.html

**7. "Canadese infra-uitgaven > CAD 100 mrd/jaar" — gecorrigeerd/onzeker**
De aangehaalde bron zegt niet dat dit een structureel jaarniveau is: "In 2025, infrastructure spending is projected to exceed $100 billion" — een eenmalige jaarprojectie, zónder valuta-aanduiding, van een marktonderzoeksbureau (geen statistiekbureau). Daarnaast noemt de bron een federale toezegging van "approximately CAD 180 billion over 12 years" (≈ CAD 15 mrd/jaar). Een officieel Statistics Canada-cijfer voor totale jaarlijkse infra-investeringen kon niet worden opgehaald. Bron: https://www.marketresearchfuture.com/reports/canada-construction-software-market-45911

### Prijzen en licentiemodellen

**8. Microsoft Project — bevestigd (met verscherping van de eenheid)**
microsoft.com toont "Planner and Project Plan 3 — $30.00 user/month, paid yearly" en "Planner Plan 1 — $10.00 user/month, paid yearly"; Plan 5 staat op **$55/user/month, billed annually**. Per jaar dus USD 360 resp. USD 660 per gebruiker. Eenmalige desktoplicenties: **Project Standard 2024 USD 679,99** en **Project Professional 2024 USD 1.129,99** (het rapport zei "rond 680/1.130" — correct). Bronnen: https://www.microsoft.com/en-us/microsoft-365/planner/project-plan-3 , https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software , https://costbench.com/software/project-management/microsoft-project/

**9. "P6 Professional perpetual USD 2.500–3.500 + 22%" — gecorrigeerd/onzeker**
Oracle publiceert geen lijstprijs voor P6 Professional (de Oracle-prijslijst-PDF bevat het product niet). Onafhankelijke bronnen clusteren rond **USD 3.500** (primaverascheduling.com) en **USD 3.520** (Compass Consult) per named-user perpetual, plus **22% software update licence & support** per jaar (≈ USD 770). De ondergrens van USD 2.500 kon door geen enkele bereikbare bron worden gestaafd. Bovendien: de claim "TCO 2–3× de licentieprijs" staat **niet** op de aangehaalde Compass-Consult-pagina — die pagina bevat helemaal geen bedragen. Bron: https://compassconsult.co/the-cost-to-buy-a-primavera-p6-licence-why-it-matters/

**10. "Oracle Primavera Cloud vanaf USD 100–130/gebruiker/maand, USD 7.800/jaar voor 5 seats" — bevestigd (met kanttekening)**
USD 7.800 / 5 seats / 12 maanden = **USD 130/gebruiker/maand = USD 1.560/gebruiker/jaar**; minimaal 5 gebruikers per module, support inbegrepen (anders dan bij P6 perpetual). Het is een **resellerprijs**, geen Oracle-lijstprijs. Ter vergelijking staat P6 EPPM in de Britse G-Cloud-catalogus op £220/gebruiker/maand bij minimaal 25 gebruikers. De ondergrens "USD 100/maand" en de range "USD 1.300–2.700/gebruiker/jaar" zijn niet onafhankelijk bevestigd. Bron: https://globalpm.com/oracle-primavera-cloud-pricing/

**11. "Smartsheet Pro USD 12 / Business USD 24 per gebruiker per maand" — gecorrigeerd (verkeerde facturatiebasis)**
Dit zijn de **maandelijks gefactureerde** tarieven. Bij jaarfacturering — de gangbare lijstprijs — is het **USD 9 (Pro)** en **USD 19 (Business)** per gebruiker per maand. Capterra Canada bevestigt: "Starting Price US$12.00 per user (monthly billing) … Plans start at $9.00/month when billed annually." Ook de bijzin "rekent af in CAD" is te stellig: Capterra Canada noteert Smartsheet in US$, terwijl Smartsheet's eigen prijspagina wel CAD-bedragen toont. Bronnen: https://www.smartsheet.com/pricing , https://www.capterra.ca/software/79104/smartsheet

**12. "monday Standard ~USD 12–14, Wrike Team ~USD 10, Asana Starter ~USD 10,99" — bevestigd (met eenheid verscherpt)**
Alle drie zijn jaarfacturering-tarieven per gebruiker per maand: monday.com Standard **USD 12** jaarlijks / **USD 20** maandelijks (de "14" in het rapport is niet terug te vinden); Wrike Team **USD 10**, jaarlijks gefactureerd, 2–15 seats, tarieven geldig vanaf 21-01-2026; Asana Starter **USD 10,99** jaarlijks / **USD 13,49** maandelijks. Bronnen: https://monday.com/pricing , https://www.wrike.com/price/ , https://asana.com/pricing

**13. "Asta Powerproject ~£1.200–1.700 per licentie" — gecorrigeerd/onzeker**
De schatting noemde geen periode en is niet te staven. Actuele opgaven: single-user **abonnement vanaf ~£880 per jaar**, concurrent-licentie ~**£2.000 per jaar**, enterprise/SaaS op offerte — Elecosoft verkoopt dus abonnementen, geen perpetual licenties. Bronnen zijn prijsaggregators (geen Elecosoft-lijstprijs; shop.eleco.com gaf HTTP 429), dus blijft **onzeker**. Bronnen: https://pricingnow.com/question/powerproject-pricing/ , https://www.itqlick.com/powerproject/pricing

**14. "Phoenix Project Manager USD 799 perpetual" — deels bevestigd**
De bestelpagina bevestigt **$799 per license** (Phoenix 5), maar noemt de term "perpetual" niet en vermeldt geen jaarlijkse support-/onderhoudsfee. Het licentiemodel is dus niet hard bevestigd. Bron: https://www.phoenixcpm.com/shop/purchase.php

**15. "Procore: quote-based, typisch % van jaaromzet" — gecorrigeerd**
Procore rekent "an upfront annual fee by product and based upon your **Annual Construction Volume (ACV)** — the aggregate dollar value of the construction work across your projects", met onbeperkte gebruikers. Dat is bouwvolume, niet bedrijfsomzet. Er zijn geen gepubliceerde lijstprijzen; de orde USD 10k–100k+/jaar blijft een schatting. Bron: https://www.procore.com/pricing

### Marktleiderschap, kanaal en contracteisen

**16. "P6/XER is de feitelijke tenderformaat-eis bij Canadese publieke opdrachtgevers" — onzeker (niet te staven)**
Er is geen publieke Canadese aanbestedings-, specificatie- of projectovereenkomsttekst gevonden die Primavera P6 voorschrijft, ook niet met gerichte zoekopdrachten op standaardformuleringen ("Primavera P6 or approved equal"). Belangrijker: de aangehaalde onderbouwing deugt niet — de Metrolinx-pagina over GO Expansion gaat over milieumaatregelen, geluid en stof en **noemt geen planningssoftware, geen P6 en geen CPM**. Dezelfde bron werd in §3 gebruikt voor "Metrolinx zet P6 in voor GO Expansion"; ook die claim is daarmee ongefundeerd. Behandelen als sectorobservatie op basis van vacature-eisen. Bron: https://www.metrolinx.com/en/discover/how-metrolinx-will-tackle-future-go-expansion-projects-

**17. "CCDC 2 vereist een baseline-schedule, updates en delay-notificaties" — gecorrigeerd (te stellig)**
CCDC 2 GC 3.5 verplicht de aannemer vóór de eerste betalingsaanvraag "a construction schedule that indicates the timing of the major activities" in te dienen, met "sufficient detail of the critical events and their inter-relationship", en dat schema te bewaken en bij te werken; vertragingsmeldingen lopen via GC 6.5. **CCDC 2 schrijft geen CPM-methode, geen baseline-formalisme en geen software voor.** De forensische CPM-praktijk (AACE RP 29R-03) is een marktgewoonte, geen contractuele verplichting uit CCDC 2. Bron: https://cans.ns.ca/wp-content/uploads/2020/12/CCDC2-E.pdf

**18. "PM ERA is de exclusieve Powerproject-partner in Ontario" — bevestigd als zelfrapportage**
Letterlijk op pmera.com: "PM ERA, as the exclusive Powerproject partner in Ontario, Canada". Elecosoft bevestigt dit nergens publiek, dus het blijft een claim van de partij zelf. Bron: https://www.pmera.com/services/project-scheduling/

**19. "Emerald Associates: Primavera-partner sinds 1995, reseller sinds 2004, enige Canadese Premier Solution Provider" — deels bevestigd / onzeker**
"Primavera partner since 1995" is terug te vinden in de sitebeschrijving. De datum 2004 en de exclusiviteitsclaim zijn niet te verifiëren (emerald-associates.com gaf HTTP 403) en betreffen bovendien een Oracle-partnertier die in het huidige partnerprogramma niet meer bestaat. Bron: https://www.emerald-associates.com/emerald-associates/about-us/history.html

**20. "InEight: 850+ bedrijven" — bevestigd (zelfrapportage, consistent)**
InEight en meerdere onafhankelijke registers herhalen "over 850 companies" en "575.000 gebruikers". Het is een leveranciersopgave, niet extern geauditeerd. Bron: https://www.featuredcustomers.com/vendor/ineight

**21. "Buildertrend 20.000+ aannemers" — onzeker/gedateerd**
Buildertrend communiceert zelf "over 1 million users across 100 countries"; het cijfer 20.000+ komt uit bedrijvendatabases (ZoomInfo), andere aggregators noemen 43.284 geverifieerde klanten. Geen van deze cijfers is onafhankelijk verifieerbaar of Canada-specifiek.

**22. "Megaprojecten Site C, LNG Canada en Trans Mountain drijven de markt" — gecorrigeerd (verouderd)**
Trans Mountain Expansion is in dienst sinds **mei 2024** ([CER](https://www.cer-rec.gc.ca/en/data-analysis/energy-markets/market-snapshots/2025/market-snapshot-trans-mountain-expansion-eases-pipeline-constraints-and-increases-exports-to-overseas-markets.html)); LNG Canada laadde zijn **eerste cargo op 30 juni 2025** ([LNG Canada](https://www.lngcanada.ca/news/first-cargo-puts-canada-on-the-map-of-lng-exporting-nations/)); Site C is afgerond. Per juli 2026 zijn dit geen lopende vraagdrijvers meer; de actuele drijvers zijn transit (Ontario Line, GO Expansion, Scarborough Subway, Surrey–Langley SkyTrain) en nieuwe energieprojecten.

**23. "Planner-salarissen CAD 70k–120k; Alberta ~CAD 51/uur (ZipRecruiter)" — gecorrigeerd**
Onafhankelijke Canadese salarisdata (talent.com, 10.000 opgaven) geven een **gemiddelde en mediaan van CAD 105.000/jaar (CAD 53,85/uur)** met instapniveau ~CAD 90.000 — de bovenkant van de gerapporteerde band is dus te laag gezet. Daarnaast is de ZipRecruiter-bron problematisch: ziprecruiter.com is de Amerikaanse site en noteert in USD, zodat "CAD 51/uur" mogelijk een valutaverwarring is; de pagina zelf was niet op te halen (HTTP 403). Bron: https://ca.talent.com/salary?job=project+scheduler

**24. "Glassdoor toont doorlopend 100–120 open P6-planner-vacatures → 3.000–8.000 planners" — onzeker (zwak onderbouwd)**
Een live vacatureteller van een brede trefwoordzoekopdracht is een momentopname, niet reproduceerbaar en niet gefilterd op echte P6-planningsrollen. De afleiding naar beroepsgroepomvang stapelt daar een tweede ongevalideerde aanname op (vacaturegraad 3–5%). Niet als hard cijfer gebruiken.

**25. "Quebec vormt ~22% van de markt" — onzeker**
Geen bron gevonden. Het getal komt overeen met Quebec's **bevolkingsaandeel** (~22%), terwijl het aandeel in het Canadese bbp rond 19–20% ligt en zakelijke software-uitgaven zich juist concentreren in Ontario en Alberta. Waarschijnlijk een lichte overschatting van het marktaandeel.

**26. "Procore is dominant projectmanagementplatform in Canada" — onzeker**
Geen marktaandeelcijfer voor Canada gevonden; Autodesk Construction Cloud en Bluebeam zijn serieuze alternatieven. Formulering is hierboven afgezwakt naar "breed gebruikt".

### Niet weerlegd

Deze beweringen hielden stand of konden niet worden ontkracht en zijn ongewijzigd gelaten: TILOS is nog steeds een actief verkocht Trimble-product zonder end-of-life-aankondiging ([Trimble](https://construction.trimble.com/en/products/tilos)); de kwalitatieve positionering van P6 als dominant pakket in Canadese infra/energie (geen tegenbewijs, maar ook geen marktaandeelcijfer); en het ontbreken van een Canadese CPM-Gantt-concurrent.
