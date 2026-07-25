# Marktonderzoek: projectplanning- en schedulingsoftware in Israël

**Regio:** Midden-Oosten
**Peildatum onderzoek:** 25 juli 2026
**Valuta-referentie:** USD/ILS = **3,055** (25 juli 2026, geverifieerd — [XE](https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=ILS); Trading Economics noteert 3,0466 op 24 juli 2026)
> **[VERIFICATIE — GECORRIGEERD]** Het oorspronkelijke "jaargemiddelde 2026 ≈ 3,0358" is geschrapt: het is onverenigbaar met de eigen bewering in §3.1 dat de koers van 3,19 (1 jan) naar 3,05 (juli) liep. Een jaargemiddelde over jan–jul kan niet *onder* het juli-niveau liggen als de reeks vanaf een hoger punt daalde; het zou ca. 3,10–3,12 moeten zijn. De startkoers 3,19 is bovendien niet geverifieerd — Trading Economics meldt +9,06% shekelversteviging over 12 maanden en koersen rond 2,80–2,88 in mei–juni 2026, wat op een ander (grilliger) pad wijst. **Behandel alle YTD-valuta-uitspraken in dit rapport als onzeker.**
**BTW Israël:** 18% sinds 1 januari 2025 ([Herzog Law](https://herzoglaw.co.il/), [TaxAtlas](https://taxatlas.io/))

---

## 0. Methodologische verantwoording en betrouwbaarheid

Dit onderzoek is uitgevoerd met ruim 25 afzonderlijke zoekopdrachten (Engels én Hebreeuws) plus directe fetches van vendor-, tender-, opleidings- en vacaturepagina's. Twee kanttekeningen die de lezer moet meewegen:

1. **De `WebSearch`-tool was in deze sessie uitgeput** (budget 200/200 verbruikt vóór aanvang). Alle zoekopdrachten zijn daarom uitgevoerd via het HTML-eindpunt van DuckDuckGo (`html.duckduckgo.com`) met de fetch-tool. Dat levert vergelijkbare resultaten, maar de snippets zijn korter en er is minder herrangschikking. Enkele pagina's gaven 503/403 (Megatec, ENR-PDF, exchange-rates.org) en konden niet direct worden gelezen; daar is teruggevallen op zoeksnippets.
2. **Israël is een kleine, ondergerapporteerde markt voor deze softwarecategorie.** Er bestaat géén publiek marktonderzoek dat "projectplanningsoftware in Israël" apart kwantificeert. Alle marktomvangcijfers in hoofdstuk 2 die niet expliciet aan een bron hangen, zijn **eigen schattingen met expliciete redenering** en zijn als zodanig gemarkeerd met **[SCHATTING]**.

Waar ik geen bewijs vond, staat dat er ook zo — "geen bewijs gevonden" is niet hetzelfde als "niet aanwezig".

---

## 1. Samenvatting

**Israël is een MS Project-first markt.** Dat is de belangrijkste en meest onderscheidende bevinding van dit onderzoek, en het is het tegenovergestelde van de Golfstaten en het VK, waar Primavera P6 de contractuele standaard is. Het bewijs is expliciet en meervoudig:

- De **standaardspecificatie voor lokale infrastructuur** schrijft MS Project bij naam voor: *"De aannemer stelt het gedetailleerde tijdschema op met behulp van Microsoft MS PROJECT-software 2013 en hoger. Een gelicentieerde kopie van de software wordt geïnstalleerd op het kantoor van de toezichthouder op de bouwplaats."* — [Trans-Israel Highway (Kvish 6), Bijlage F bij de overeenkomst: מפרט ניהול לוחות זמנים](https://www.transisrael.co.il/Uploads/tenderDocuments/)
- De breed gebruikte Israëlische **specificatie voor tijdschemamanagement** (HCP) noemt MS Project in de laatste versie als default, met de mogelijkheid dat de opdrachtgever een alternatief aanwijst — [hcp.co.il, hoofdstuk 2](https://www.hcp.co.il/project-time-management-specification-chapter2/)
- In **Israëlische vacatures** is MS Project verplicht en zijn Primavera en TILOS "een pré": *"MS Project-kennis is verplicht; Primavera- en TILOS-software-ervaring is een voordeel"* — [AllJobs vacature PMO/bakr lo"z, JobID 8671342](https://www.alljobs.co.il/); idem [Shapir Engineering via JobKarov](https://www.jobkarov.com/Search/Site/2673176)
- De **Israëlische opleidingsmarkt** is overweldigend MS Project: ICPM, IITC, CivilEng, Carmel Training, Spectra, AG Projects en de Vereniging van Ingenieurs bieden allemaal MS Project-cursussen aan; Primavera-cursussen komen vrijwel uitsluitend van internationale SEO-landingspagina's (Knowledge Academy, Unichrone, Spoclearn) plus één echte lokale partij (Megatec).

**Primavera P6 bezet de megaproject- en enterprise-laag**, niet de brede markt: Tel Aviv Metro/lightrail (NTA), nationale infrastructuur, defensie, energie en de grootste aannemers. Twee Israëlische Oracle-partners zijn actief: **Megatec** (pm.megatec.co.il, positioneert Primavera als "al 25 jaar toonaangevend in EPM") en **Coral Technologies** (mrcoral.co.il), plus **Top Vision** ("het huis van Oracle-oplossingen in Israël").

**Excel is feitelijk marktleider bij kleine en middelgrote aannemers.** De Hebreeuwstalige zoekresultaten worden gedomineerd door Gantt-sjablonen voor Excel, Excel-cursussen voor projectbeheer en "Excel vs. projectmanagementsoftware"-vergelijkingen.

**monday.com is de Israëlische thuisspeler** ($1,23 mrd omzet FY2025, +27%, hoofdkantoor Tel Aviv/New York — [monday.com IR](https://ir.monday.com/)) en is alomtegenwoordig in Israëlische kantooromgevingen, inclusief de back-office van bouwbedrijven. Het is echter een work-management-tool met Gantt/timeline-weergaven, **geen CPM-scheduler**.

**Lokale, echt-Israëlische CPM-software bestaat nauwelijks.** De lokale softwarelaag is sterk in *kostprijs/hoeveelheden* (Benarit, Conwize, Dekel-prijsboeken) en in *kwaliteitscontrole/oplevering* (Conqum), maar niet in netwerkplanning. De enige noemenswaardige lokale planningssoftware is **HCP-Go** (₪129/maand incl. btw), een MS Project-add-on van Tal Levanon die "verborgen kritieke paden" analyseert — en die via zijn gepubliceerde specificatie een invloed heeft die zijn omvang ver overstijgt.

**Een groot deel van "planning" wordt in Israël als dienst ingekocht, niet als licentie.** Er is een dichte laag gespecialiseerde bureaus voor het opstellen en bewaken van tijdschema's (Shaar-PM, Lurtam, OG Projects, C²/CCCE, MK Consulting, Sohlberg, Itzik Atzav, HCP). NTA schrijft hier zelfs een eigen aanbesteding voor uit: *"מכרז פומבי ממוכן למתן שירותי יעוץ ובקרת לוחות זמנים עבור חברת נת"ע"* (openbare elektronische aanbesteding voor advies- en tijdschemabewakingsdiensten) — [nta.co.il/tenders](https://www.nta.co.il/tenders/). Wie in Israël een planningstool wil verkopen, verkoopt in de praktijk aan of via deze bureaus.

**Marktcontext:** de bouwsector is groot maar zwaar geraakt. De Israëlische bouw verloor in 2024 ILS 98 mrd ($26 mrd), circa 4,9% van het bbp ([CBS via GlobalData](https://www.marketresearch.com/GlobalData-v3648/Israel-Construction-Size-Trends-Forecasts-41587122/)). Tegelijk loopt met de Tel Aviv Metro het grootste infrastructuurprogramma in de Israëlische geschiedenis: ILS 180 mrd / ca. $50 mrd ([Globes](https://en.globes.co.il/en/article-The-Metro-is-really-happening-1001506357), [Railway Gazette/IRJ](https://www.railjournal.com/passenger/metros/tel-aviv-launches-50bn-metro-project/)). Dat maakt de planningsmarkt structureel groeiend, ondanks een verwachte reële krimp van de bouw van 1,5% in 2026 ([GlobalData](https://www.globaldata.com/store/report/israel-construction-market-analysis/)).

---

## 2. Marktomvang

### 2.1 Beschikbare harde ankers

| Grootheid | Waarde | Jaar | Bron |
|---|---|---|---|
| Israëlische bouwsector, omzet | **$68,1 mrd** (CAGR 8,2% 2020–2025) | 2025 | [MarketLine via MarketResearch.com](https://www.marketresearch.com/MarketLine-v3883/Construction-Israel-45429289/) |
| Israëlische bouwsector, omzet | $53 mrd (CAGR 2,7% 2019–2024) | 2024 | [MarketLine via MarketPublishers](https://marketpublishers.com/report/industry/construction/construction-in-israel_marketline.html) |
| Israëlische bouwmarkt, omvang | $40,22 mrd → $41,67 mrd (2026), $52,69 mrd (2035) | 2025 | [Next Move Strategy Consulting](https://www.nextmsc.com/report/israel-construction-market-se4733) |
| Bbp uit bouw (toegevoegde waarde) | ILS 19,82 mrd in Q4-2025 (≈ ILS 79 mrd/jr ≈ **$26 mrd**) | 2025 | [Trading Economics](https://tradingeconomics.com/israel/gdp-from-construction) |
| Bouw als % bbp | 6,2% | 2023 | [worldmetrics.org](https://worldmetrics.org/israel-construction-industry-statistics/) |
| Werkenden in de bouw | 320.000 | 2023 | [worldmetrics.org](https://worldmetrics.org/israel-construction-industry-statistics/) |
| Reële groei bouw | +12,9% (2025), **−1,5% verwacht (2026)** | 2025/26 | [GlobalData](https://www.globaldata.com/store/report/israel-construction-market-analysis/), [Research and Markets](https://www.researchandmarkets.com/reports/5767964/israel-construction-market-size-trends) |
| Verlies bouwsector door oorlog | ILS 98 mrd ($26 mrd) ≈ 4,9% bbp | 2024 | [CBS via GlobalData](https://www.marketresearch.com/GlobalData-v3648/Israel-Construction-Size-Trends-Forecasts-41587122/) |
| Cumulatief outputverlies economie | 8,6% jaar-bbp (ca. ILS 177 mrd) | t/m 2025 | [Bank of Israel jaarverslag 2025](https://www.boi.org.il/en/communication-and-publications/regular-publications/bank-of-israel-annual-report/bank-of-israel-annual-report-2025-1/) |
| Ingeschreven aannemers (רשם הקבלנים) | ~~ca. 23.978~~ → **ca. 17.745 aannemers** met **24.223 registratie-bevoegdheden** | ~2025 | [govil.ai dataset רשם הקבלנים](https://govil.ai/), [gov.il פנקס הקבלנים](https://www.gov.il/apps/moch/rasham/home) |
| Israëlische ICT-markt | **$53,43 mrd** (2025) → $55,01 mrd (2026) → $63,64 mrd (2031), CAGR 2,95% | 2025 | [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/israel-ict-market) |
| Waarvan IT-software | 41,63% van ICT-markt ≈ **$22,3 mrd** | 2025 | [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/israel-ict-market) |
| Tel Aviv Metro-programma | fase A **ILS 65 mrd** (bevestigd, ~78 km tunnel, 59 stations); totaalprogramma ILS 180 mrd **of** ILS ~300 mrd afhankelijk van scope (**omstreden**) | 2025/26 | [NTA](https://www.nta.co.il/metro/), [ice.co.il](https://www.ice.co.il/realestate/news/article/1090422), [Globes](https://en.globes.co.il/en/article-The-Metro-is-really-happening-1001506357), [IRJ](https://www.railjournal.com/passenger/metros/tel-aviv-launches-50bn-metro-project/) |
| Wereldmarkt **bouwsoftware breed** (níet PM-software) | $10,76 mrd (2025) → $11,78 mrd (2026), CAGR 9,70% | 2025/26 | [Fortune Business Insights](https://www.fortunebusinessinsights.com/construction-software-market-110155) |
| Wereldmarkt bouwmanagementsoftware | $7,7 mrd (2025), CAGR 10,2% | 2025 | [Grand View Research](https://www.grandviewresearch.com/industry-analysis/construction-management-software-market-report) |
| Aandeel "scheduling" binnen bouw-PM-software | **38,2%** van omzet | 2025 | [DataIntelo](https://dataintelo.com/report/construction-project-management-software-market) |

> **[VERIFICATIE — valuta-omrekeningen in deze tabel zijn inconsistent]** Het rapport verklaart USD/ILS 3,04 als werkkoers, maar rekent twee grote shekelbedragen om tegen een veel oudere koers (~3,6–3,8):
>
> | Bedrag | Rapport zegt | Tegen 3,055 (geverifieerd) | Impliciete koers |
> |---|---|---|---|
> | Metro ILS 180 mrd | "$50 mrd" | **$58,9 mrd** | 3,60 |
> | Oorlogsverlies bouw ILS 98 mrd | "$26 mrd" | **$32,1 mrd** | 3,77 |
> | Bbp bouw ILS 79,3 mrd/jr | "$26 mrd" | $26,0 mrd ✓ | 3,05 ✓ |
>
> De eerste twee zijn USD-cijfers uit oudere berichtgeving die ongecorrigeerd zijn overgenomen naast een actuele koers. Óf de shekelbedragen consequent tegen 3,055 omrekenen, óf de USD-cijfers als "USD ten tijde van publicatie" labelen. Overige omrekeningen zijn wél correct: ₪129 = $42,2 ✓, ₪26 = $8,5 ✓, ILS 300–480k = $98–157k ✓. Ook de afgeleide reeksen kloppen: 53,43 × 41,63% = $22,24 mrd ✓; (63,64/55,01)^(1/5) − 1 = 2,96% ✓ (Mordor-cijfers letterlijk bevestigd); 19,82 × 4 = ILS 79,3 mrd ✓; 8,6% bbp ≈ ILS 177 mrd impliceert bbp ILS 2.058 mrd ✓ plausibel.

> **Let op de spreiding in de bouwcijfers.** MarketLine ($68 mrd, 2025) en Next Move ($40 mrd, 2025) verschillen met een factor 1,7. Dat komt door verschillende definities (bruto bouwproductie inclusief onderaanneming en materialen vs. netto bouwmarktwaarde). Voor de sizing hieronder gebruik ik de middenwaarde van ca. **$50 mrd bouwproductie**.
>
> **[VERIFICATIE — ONZEKER, met kanttekening in het voordeel van MarketLine]** De MarketLine-pagina gaf bij hercontrole HTTP 403; het cijfer $68,1 mrd is dus **niet onafhankelijk te verifiëren** en steunt op één betaalde aggregator. Wél is er een consistentietoets die het rapport zelf niet uitvoert: de toegevoegde waarde van de Israëlische bouw is ca. $26 mrd/jr (Trading Economics, hierboven). Een bruto bouwproductie van $68 mrd impliceert een toegevoegde-waarderatio van 38% — normaal voor de bouw. De Next Move-waarde van $40 mrd impliceert 65%, wat voor een bouwsector **implausibel hoog** is. Next Move meet dus vrijwel zeker een engere grootheid (bijv. alleen contractwaarde of alleen woningbouw), geen bruto productie. De "factor 1,7 spreiding" is daarmee géén onzekerheidsband tussen twee gelijkwaardige metingen maar een definitieverschil, en de middenwaarde van $50 mrd is een **appels-en-perenmiddeling**. Gebruik óf $68 mrd (productie) óf $26 mrd (toegevoegde waarde), niet het gemiddelde.

### 2.2 Eigen sizing — gelaagd **[SCHATTING]**

Er is geen enkele bron die de Israëlische markt voor planningssoftware kwantificeert. Ik bouw hem daarom bottom-up op in drie lagen, met de redenering expliciet.

#### Stap 1: aantal planners

*Redenering:*
- 320.000 bouwmedewerkers (2023). In een ontwikkelde markt met veel infrastructuur ligt de verhouding "toegewijde planner : bouwmedewerker" grofweg tussen 1:250 en 1:500 → **650–1.300 planners in de bouw**.

> **[VERIFICATIE — GECORRIGEERD]** De basis van 320.000 komt van worldmetrics.org, een AI-gegenereerde aggregator die het rapport in §6 zelf als onbetrouwbaar bestempelt — en het cijfer is verouderd (2023). Hebreeuwstalige bronnen die naar Bank of Israel/CBS (הלמ"ס) verwijzen geven **366.000 werkenden in de bouw in Q3-2025** ([hakablan.co.il](https://www.hakablan.co.il/)), 336.000 in Q1-2025 ([nadlan.walla.co.il](https://nadlan.walla.co.il/)) en 353.000 als pre-oorlogsbasis Q3-2023 ([ynet](https://www.ynet.co.il/)). Met 366.000 wordt de afgeleide **730–1.460 planners in de bouw** in plaats van 650–1.300. Effect op de totaalschatting is klein, maar het anker moet worden vervangen door de CBS/BoI-reeks.
- Daarnaast planners/PMO buiten de bouw: defensie-primes (IAI, Elbit, Rafael), energie (IEC), water (Mekorot), chemie/mijnbouw (ICL), spoor (Israel Railways, NTA, Netivei Israel), plus de grote ingenieursbureaus. Israël heeft een uitzonderlijk grote defensie- en systeemindustrie voor zijn omvang → **800–1.500 planning/project-controls-posities**.
- Plus de gespecialiseerde tijdschemabureaus die ik geïdentificeerd heb (Shaar-PM, Lurtam, OG Projects, C², MK, Sohlberg, Itzik Atzav, HCP): elk 5–50 mensen → **150–400 mensen**.

→ **[SCHATTING] ca. 2.000–4.000 mensen in Israël voor wie CPM-planning/projectbeheersing de kerntaak is; daarvan ca. 500–1.000 echte P6/CPM-specialisten.** Betrouwbaarheid: matig.

> **[VERIFICATIE — GECORRIGEERD, rekenfout]** De drie componenten tellen niet op tot de gepresenteerde bandbreedte. 650–1.300 (bouw) + 800–1.500 (buiten de bouw) + 150–400 (bureaus) = **1.600–3.200**, niet 2.000–4.000. De bovengrens is met 25% opgehoogd zonder onderbouwing. Met het gecorrigeerde bouwanker (730–1.460) wordt de som **1.680–3.360**. Gebruik **1.700–3.400**. Dit is een afgeleide, geen telling. Israël heeft geen publiek register van planners; het PMI Israel Chapter (opgericht 1995 door prof. Zvi Raz, [pmi.org.il](https://pmi.org.il)) publiceert geen ledenaantal — de Facebookpagina toont slechts ~2.048 volgers.

Daarnaast gebruiken **tienduizenden** Israëli's een lichte planningstool (monday.com, Excel, Smartsheet) zonder planner te zijn.

#### Laag 1 — pure CPM-/schedulinglicenties

| Component | Aanname | Rekenwerk |
|---|---|---|
| MS Project-zitplaatsen (bouw + infra + defensie) | ~65% van 2.500–3.000 zitplaatsen ≈ 1.800 | 1.800 × $360/jr = **$0,65 mln** |
| Primavera P6 desktop/professional | ~700 zitplaatsen à ca. $2.000 effectief (na korting) | **$1,4 mln** |
| P6 EPPM enterprise-deployments (NTA, Netivei Israel, Israel Railways, IEC, ICL, IAI/Elbit/Rafael, Shapir/Danya Cebus/Electra/Ashtrom/Minrav/Shikun&Binui — 15–25 organisaties × 20–200 zitplaatsen) | 1.500–3.000 zitplaatsen à $1.300–2.500 | **$2–7 mln** |
| Niche (TILOS, Asta Powerproject, Deltek Acumen, Safran, HCP-Go) | 250–400 zitplaatsen | **$0,3–0,8 mln** |

→ **[SCHATTING] Laag 1 = ca. $5–10 mln per jaar (2026), middenwaarde ≈ $6–7 mln.**

> **[VERIFICATIE — GECORRIGEERD; dit is de ernstigste fout in het rapport]** De optelling van de tabel klopt op zichzelf ($0,65 + $1,4 + $2–7 + $0,3–0,8 = $4,35–9,85 mln ≈ "$5–10 mln"), **maar de zitplaatsaantallen spreken stap 1 direct tegen**:
>
> | | Zitplaatsen volgens laag 1 | Populatie volgens stap 1 |
> |---|---|---|
> | Primavera (desktop 700 + EPPM 1.500–3.000) | **2.200–3.700** | 500–1.000 "echte P6/CPM-specialisten" |
> | Alle tools samen (1.800 + 700 + 1.500–3.000 + 250–400) | **4.250–5.900** | 2.000–4.000 planners (gecorrigeerd: 1.700–3.400) |
>
> Het rapport kent dus **2 tot 7 keer zoveel Primavera-zitplaatsen toe als het zelf P6-specialisten telt**, en meer totale zitplaatsen dan er planners zijn. Dubbeltelling (één planner met zowel MSP als P6) verklaart een deel, maar wordt nergens gesteld en dekt de P6-discrepantie niet.
>
> **Herberekening met interne consistentie:** bij 500–1.000 P6-specialisten hoort ca. 500–1.000 P6-zitplaatsen (desktop + EPPM samen), niet 2.200–3.700. Tegen de geverifieerde Israëlische prijzen ($1.320–2.570/jr, Coral) levert dat **$0,7–2,6 mln** in plaats van $3,4–8,4 mln. Laag 1 komt daarmee uit op ca. **$1,7–4,1 mln/jr** — ruwweg **de helft tot een derde** van de geclaimde $5–10 mln.
>
> Ook los daarvan: de MS Project-regel rekent met $360/jr/zitplaats (= $30/mnd, Plan 3 list) terwijl het rapport elders een mediane jaarcontractwaarde van $480 én een Plan 1 van $120/jr citeert; bij een realistische mix van Plan 1/3/5 is $360 een aanname, geen afgeleide. En 1.800 MS Project-zitplaatsen is moeilijk te rijmen met de kernstelling dat MS Project de contractueel verplichte standaard is voor *alle* aannemersklassen bij 1.700–3.400 planners.
>
> **Conclusie: laag 1 ligt waarschijnlijk rond $2–5 mln, niet $5–10 mln.** Dat versterkt overigens de kernboodschap van het rapport (de licentiemarkt in enge zin is een niche) in plaats van haar te ondermijnen.

Dit is een klein getal, en dat hoort ook zo: pure netwerkplanninglicenties zijn overal een dun segment. Ter kalibratie: als Israël 0,5–1,0% van de wereldwijde bouw-PM-softwaremarkt zou vertegenwoordigen ($10,8 mrd in 2025, [Fortune BI](https://www.fortunebusinessinsights.com/construction-software-market-110155)) en scheduling daarvan 38,2% is ([DataIntelo](https://dataintelo.com/report/construction-project-management-software-market)), dan komt dat uit op $20–41 mln — maar dat cijfer omvat óók de brede bouwmanagement-SaaS (laag 3), niet alleen CPM. De twee benaderingen zijn consistent zodra je de lagen scheidt.

> **[VERIFICATIE — GECORRIGEERD, scope-fout]** De rekensom zelf klopt ($10,76 mrd × 38,2% = $4,11 mrd; × 0,5–1,0% = $20,6–41,1 mln), maar de twee factoren komen uit **verschillende marktdefinities** en mogen niet worden vermenigvuldigd. Hercontrole van de Fortune-BI-pagina bevestigt dat $10,76 mrd de **brede "construction software"-markt** is: expliciet inclusief safety reporting, quality management, field service management, cost accounting en analytics — *niet* bouw-PM-software. DataIntelo's 38,2%-schedulingaandeel is daarentegen een aandeel *binnen de bouw-PM-softwaremarkt*. Een aandeel uit de smalle markt toepassen op het totaal van de brede markt **overschat de schedulingbasis stelselmatig**. De kalibratieband van $20–41 mln is daarmee opgeblazen en bevestigt laag 1 niet. Bron: [Fortune Business Insights](https://www.fortunebusinessinsights.com/construction-software-market-110155) (scope geverifieerd 25-7-2026).

#### Laag 2 — planningsdiensten, training en consultancy

Redenering: de Israëlische markt koopt planning grotendeels als dienst. Als 500–1.000 fte-equivalent aan externe projectbeheersing/tijdschemabewaking wordt ingehuurd tegen ILS 25.000–40.000 per maand per adviseur (≈ $100.000–160.000/jr aan factuurwaarde, marktconform voor senior Israëlische ingenieursadvies), dan:

→ **[SCHATTING] Laag 2 = ca. $50–120 mln per jaar.** Betrouwbaarheid: laag-tot-matig;

> **[VERIFICATIE — GECORRIGEERD, rekenfout]** De eigen invoer levert een andere bovengrens: 500–1.000 fte × $100.000–160.000 = **$50–160 mln**, niet $50–120 mln. De bovengrens is zonder motivering met een kwart verlaagd. De omrekening van het tarief klopt wél: ILS 25.000–40.000/mnd = ILS 300.000–480.000/jr ÷ 3,055 = $98.000–157.000/jr ✓. het tarief is niet uit een gepubliceerde bron maar afgeleid van Israëlische ingenieurs-consultancy-tarieven. De NTA-aanbesteding voor "יעוץ ובקרת לוחות זמנים" bevestigt dat dit een aparte, aanbestede dienstencategorie is.

#### Laag 3 — brede PM-/work-managementsoftware met Gantt

Israël ligt ver boven de trend in SaaS-adoptie (SaaS-uitgaven ≈ $1,8 mrd in 2026, 65% van de totale software-uitgaven — [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/israel-ict-market)).

> **[VERIFICATIE — GECORRIGEERD, interne tegenspraak]** Deze twee getallen zijn onverenigbaar met het andere Mordor-cijfer dat het rapport in §2.1 gebruikt. Als SaaS $1,8 mrd is en dat 65% van alle software-uitgaven vormt, dan is de totale Israëlische softwaremarkt **$2,77 mrd** — terwijl §2.1 uit dezelfde Mordor-rapportage "IT-software 41,63% van $53,43 mrd ≈ **$22,3 mrd**" overneemt. Een verschil van **factor 8** tussen twee cijfers uit één bron. Hercontrole van de Mordor-pagina bevestigt de §2.1-cijfers letterlijk ($53,43 mrd 2025, $55,01 mrd 2026, 41,63% IT-software, CAGR 2,95% naar $63,64 mrd in 2031), maar levert **geen bevestiging voor de $1,8 mrd / 65%-uitspraak**. Laag 3 hangt daarmee aan een noemer die niet vaststaat: $70–150 mln is 4–8% van $1,8 mrd, maar slechts 0,3–0,7% van $22,3 mrd. **Laag 3 is feitelijk ongeankerd — behandel de bandbreedte als illustratief, niet als schatting.** Wereldwijde PM-softwaremarkt: $9,1 mrd (2025, [Verified Market Reports](https://www.verifiedmarketreports.com/product/project-management-software-market/)) tot $13,2 mrd (2026, [Research and Markets](https://www.researchandmarkets.com/report/construction-project-management-software)). Israël is ~0,5% van het wereld-bbp maar over-indexeert sterk op SaaS; bovendien is monday.com een Israëlisch product met een sterke thuismarkt.

→ **[SCHATTING] Laag 3 = ca. $70–150 mln per jaar** aan Israëlische bestedingen aan work-management/PM-SaaS met Gantt-functionaliteit (monday.com, Smartsheet, Wrike, Asana, ClickUp, Jira-plug-ins, lokale contech).

#### Totaal

| Laag | Omvang (2026) | Zekerheid |
|---|---|---|
| 1. Pure CPM-/schedulinglicenties | **$5–10 mln** | Matig |
| 2. Planningsdiensten, training, consultancy | **$50–120 mln** | Laag–matig |
| 3. Brede PM-/work-management-SaaS met Gantt | **$70–150 mln** | Laag |
| **Totaal "planning-ecosysteem"** | **≈ $125–280 mln/jr** | **[SCHATTING]** |

> **[VERIFICATIE — GECORRIGEERD]** De optelling klopt (5+50+70 = 125; 10+120+150 = 280), maar drie van de drie lagen zijn hierboven naar beneden of naar de zijkant bijgesteld. Met de gecorrigeerde lagen — laag 1 $2–5 mln, laag 2 $50–160 mln, laag 3 ongeankerd/illustratief $70–150 mln — wordt het totaal **ca. $120–315 mln/jr**, met een veel bredere onzekerheidsmarge dan het rapport suggereert. Belangrijker: het totaal wordt volledig gedomineerd door de twee zwakst onderbouwde lagen (2 en 3), die samen 96–98% van de som uitmaken. **De totaalwaarde van $125–280 mln draagt vrijwel geen informatie over de planningssoftwaremarkt** en moet niet als kengetal worden geciteerd. De enige laag die dit rapport werkelijk onderbouwt — laag 1 — is de kleinste.

**Kernboodschap over de omvang:** de *softwaremarkt in enge zin* (CPM-planningstools) is in Israël nauwelijks $10 mln groot — een niche. Het geld zit in de diensten eromheen en in de brede work-management-SaaS. Wie hier een planningstool positioneert, concurreert niet primair op licentieprijs maar op de vraag of hij de dienstenlaag goedkoper of beter maakt.

### 2.3 Groei

- Bouwsector: **−1,5% reëel in 2026** ([GlobalData](https://www.globaldata.com/store/report/israel-construction-market-analysis/)) na +12,9% in 2025 ([Research and Markets](https://www.researchandmarkets.com/reports/5767964/israel-construction-market-size-trends)). Gedreven door hoge bouwkosten, arbeidstekort (110.000 buitenlandse werknemers, [zipdo](https://zipdo.co/israel-construction-industry-statistics/)) en oorlogsnasleep.
- ICT-markt: CAGR **2,95%** 2026–2031 ([Mordor](https://www.mordorintelligence.com/industry-reports/israel-ict-market)) — bescheiden.
- Infrastructuur: sterk positief. NIS 180 mrd metroprogramma; regeringsakkoord over meer dan ILS 10 mrd voor openbaar vervoer in de begroting 2026 ([Port2Port](https://en.port2port.co.il/article/Industry-Trade/Governance/Transportation-and-Treasury-Ministries-Agree-on-2026-Budget/)); "Infrastructure for Growth 2026"-plan ([gov.il](https://www.gov.il/BlobFolder/generalpage/plan-infrastructure-2025/he/files_Infrastructure240326.pdf)).
- Contech-investering: sterk. Buildots haalde $45 mln Series D op (totaal $166 mln sinds 2018), #3 op Calcalists "50 meest belovende start-ups van 2025" ([Buildots](https://buildots.com/blog/buildots-raises-45m-in-series-d-funding/)); Tel Aviv telt ~35 contech-start-ups, 22 gefinancierd ([Tracxn](https://tracxn.com/d/explore/construction-tech-startups-in-tel-aviv-israel)).

→ **[SCHATTING] Netto groei van de planningssoftwaremarkt: 4–8% per jaar in USD**, waarbij de infrastructuur-/megaprojectlaag (P6, TILOS, project-controls-diensten) sneller groeit dan de residentiële bouwlaag (die krimpt).

> **[VERIFICATIE — ONZEKER, met één aantoonbare fout]** De 4–8% is een niet-afgeleide schatting: hij wordt nergens teruggerekend op de drie lagen, die elk een andere groeivoet zouden hebben (laag 1 volgt licentievernieuwing, laag 2 volgt infrastructuurbudgetten, laag 3 volgt SaaS-adoptie). Een gewogen groeivoet van 4–8% is niet in strijd met de aangehaalde ankers (bouw −1,5% reëel 2026; ICT +2,95% CAGR), maar ligt wel **boven beide**, wat om motivering vraagt die ontbreekt. Behandel als richtingsuitspraak, geen cijfer.
>
> **Aantoonbaar onjuist onderdeel:** TILOS kan niet tot de sneller groeiende laag behoren — Trimble faseert het product per 1 maart 2026 uit (zie §3.4). Schrap TILOS uit deze opsomming.

---

## 3. Gebruikte software: marktpositie en prijzen

### Rangorde **[SCHATTING, op basis van bewijs uit tenderspecificaties, vacatures, opleidingsaanbod en Hebreeuwstalige zoekresultaten]**

| # | Pakket | Positie in Israël | Wie gebruikt het |
|---|---|---|---|
| 1 | **Microsoft Excel** | De facto marktleider bij kleine/middelgrote aannemers | Onderaannemers, kleine hoofdaannemers, ontwikkelaars |
| 2 | **Microsoft Project** | De contractuele en professionele standaard | Alle aannemersklassen, toezichthouders, opdrachtgevers, adviesbureaus |
| 3 | **Oracle Primavera P6 / Primavera Cloud** | Enterprise-/megaprojectlaag | NTA, Netivei Israel, Israel Railways, IEC, defensie, grote aannemers, internationale JV-partners |
| 4 | **monday.com** | Thuisspeler, alomtegenwoordig maar niet-CPM | Back-office, ontwikkelaars, kleinere bouwbedrijven, hi-tech |
| 5 | **Trimble TILOS** ⚠️ **EOL 1-3-2026** | Reële niche in lineaire infra, maar **product uitgefaseerd** | Spoor/weg: Shapir, Alstom Israel, NTA |
| 6 | **HCP-Go** | Lokale niche-add-on met bovenmaatse invloed | Tijdschemaadviseurs, aannemers, opdrachtgevers |
| 7 | **Smartsheet / ClickUp / Wrike / Asana / Jira** | Aanwezig, vooral hi-tech en licht bouwgebruik | Hi-tech, ontwerpbureaus |
| 8 | **ROG-Tech, Conqum, Benarit, Conwize** | Lokale bouwsoftware; sterk op kosten/kwaliteit, zwak op CPM | Gemeenten, waterbedrijven, aannemers, opzichters |
| — | **Asta Powerproject, Deltek, Safran, InEight, Deswik, RIB/iTWO, Spider, Bentley SYNCHRO, ALICE, Nodes & Links** | **Geen bewijs van betekenisvolle Israëlische aanwezigheid gevonden** | n.v.t. |

---

### 3.1 Microsoft Project — de standaard

**Marktpositie.** MS Project is in Israël niet alleen de populairste tool, maar in delen van de markt *contractueel verplicht*. De Trans-Israel Highway-specificatie (Kvish 6) eist letterlijk MS Project 2013 of hoger, met een gelicentieerde kopie op het kantoor van de toezichthouder ([transisrael.co.il tenderdocument](https://www.transisrael.co.il/Uploads/tenderDocuments/)). De HCP-specificatie voor tijdschemamanagement — die in veel Israëlische contracten wordt overgenomen — stelt MS Project in de nieuwste versie als default en verplicht de aannemer op eigen kosten een legale kopie te installeren op de computer van de projectmanager ([hcp.co.il](https://www.hcp.co.il/project-time-management-specification-chapter2/)). Native bestandsformaat: **MPP**.

De Israëlische adviseurspagina van Shaar-PM noemt MS Project en Primavera P6 samen *"שתי התוכנות המובילות בשוק הישראלי"* (de twee leidende softwarepakketten in de Israëlische markt), en positioneert MS Project voor projecten tot duizenden activiteiten en Primavera voor tienduizenden ([guide.shaar-pm.com/scheduling-software](https://guide.shaar-pm.com/scheduling-software/)).

**Prijzen.** Microsoft rekent Israël **in dollars af**, niet in shekel — de Hebreeuwstalige Microsoft-pagina toont `USD$30.00` per gebruiker per maand voor Project Plan 3, jaarlijks vooruitbetaald ([microsoft.com/he-il](https://www.microsoft.com/he-il/microsoft-365/planner/project-plan-3)).

| SKU | Prijs (list, USD) | Bron |
|---|---|---|
| Planner & Project Plan 1 | ~$10 /gebruiker/maand | [A Guide to Cloud](https://www.aguidetocloud.com/licensing/microsoft-project/) |
| **Project Plan 3** | **$30 /gebruiker/maand** (Israël, jaarlijks) | [Microsoft Israël (he-IL)](https://www.microsoft.com/he-il/microsoft-365/planner/project-plan-3) |
| Project Plan 5 | ~$55 /gebruiker/maand | [A Guide to Cloud](https://www.aguidetocloud.com/licensing/microsoft-project/) |
| Mediane jaarcontractwaarde | ~$480 | [CostBench](https://costbench.com/software/project-management/microsoft-project/) |
| Lokale reseller-instapprijs | vanaf **₪26,00** (≈ $8,5) | [Toolz.co.il](https://toolz.co.il/product/microsoft-project/) |

**Valuta-effect.** Omdat Microsoft in USD factureert, is de shekelprijs volledig afhankelijk van de wisselkoers. In 2026 verstevigde de shekel van 3,19 (1 jan) naar ca. 3,04–3,08 (juli), circa −4,4% — dat maakt MS Project in shekeltermen ruwweg 4% goedkoper op jaarbasis. Bovenop de listprijs komt 18% btw.

**Kortingen.** Israëlische organisaties kopen doorgaans via CSP-resellers of Enterprise Agreements. Concrete Israëlische kortingspercentages heb ik niet publiek gevonden; internationaal is 10–25% op volume gebruikelijk. **[SCHATTING]**

---

### 3.2 Oracle Primavera P6 / Primavera Cloud — de megaprojectlaag

**Marktpositie.** Primavera is in Israël de tool van de zware infrastructuur en de internationale JV's. Het grootste bewijsstuk is de Tel Aviv Metro (NTA): drie metrolijnen, 150 km, ruim 100 stations onder 24 gemeenten, ILS 180 mrd / ca. $50 mrd, met internationale aanbestedingsrondes en internationale aannemers ([NTA](https://www.nta.co.il/en/metro-israel/), [Globes](https://en.globes.co.il/en/article-The-Metro-is-really-happening-1001506357), [ENR](https://www.enr.com/articles/62509-major-procurement-process-begins-for-israels-49b-tel-aviv-metro)).

Cruciale nuance: in Israëlische vacatures verschijnt Primavera consequent als *"יתרון"* (voordeel), niet als eis, terwijl MS Project verplicht is. Dat bevestigt de nummer-2-positie in de binnenlandse markt — anders dan in de Golf.

**Israëlische kanaalstructuur:**

| Partij | Rol | Bron |
|---|---|---|
| **Megatec Advanced Technologies** (מגהטק) | Oracle Primavera-vertegenwoordiger, gespecialiseerd in engineering & construction; ook cursussen en trainingen; positioneert Primavera als "al 25 jaar toonaangevend in EPM"; bedient hi-tech, infrastructuur en defensie | [pm.megatec.co.il](https://pm.megatec.co.il/EnCContentPage.aspx?lang=he-il), [megatec.co.il](https://megatec.co.il/he/index.html) |
| **Coral Technologies** (קורל טכנולוגיות) | Implementatie/consultancy voor P6 EPPM, P6 Professional, Unifier, Risk Analysis, Contractor, Cloud, Analytics, Gateway, Progress Reporter; **publiceert Israëlische prijzen** | [mrcoral.co.il/oracle-primavera](https://www.mrcoral.co.il/oracle-primavera) |
| **Top Vision** | "Het huis van Oracle-oplossingen in Israël", Oracle-integrator | [top-vision.co.il](https://www.top-vision.co.il) |
| **Makit Systems** (מקיט מערכות) | Historisch aangesteld als Oracle-vertegenwoordiger in Israël, begon met marketing van o.a. Primavera | [Talniri](https://www.talniri.co.il/marketnews/article.asp?mp=null&id=55645) |

**Prijzen — Israëlisch (het meest waardevolle prijsdatapunt in dit rapport):**

Coral Technologies noemt op zijn Hebreeuwstalige site expliciet:
- P6 Professional (desktop): *"עלות הרישיון השנתי היא כ- 2,570 דולר למשתמש"* — **jaarlijkse licentiekosten ca. $2.570 per gebruiker**
- *"דמי תחזוקה שנתיים של כ- 550 דולר"* — **jaarlijkse onderhoudskosten ca. $550**
- P6 EPPM (cloud): *"עלות הרישיון השנתי מתחילה מ- 1,320 דולר למשתמש"* — **jaarlijkse licentie vanaf $1.320 per gebruiker**

Bron: [mrcoral.co.il/oracle-primavera](https://www.mrcoral.co.il/oracle-primavera)

Ter vergelijking, internationale referentieprijzen:

| Referentie | Prijs | Bron |
|---|---|---|
| P6 Professional perpetueel | ~$3.520/gebruiker | [Oracle Licensing Experts](https://oraclelicensingexperts.com/blog/oracle-primavera-p6-licensing/) |
| P6 Professional perpetueel (range) | $3.500–7.000 + ~20% jaarlijks onderhoud | [ITQlick](https://www.itqlick.com/primavera-p6/pricing) |
| Primavera Cloud EPPM | vanaf $175/gebruiker/maand ($2.100/jr) | [Contractors and Builders](https://contractorsandbuilders.com/pricing/oracle-primavera/) |
| P6 EPPM abonnement | $250–350/gebruiker/maand | [ITQlick](https://www.itqlick.com/primavera-p6/pricing) |
| P6 EPPM (per gebruiker, enterprise) | $8.000–25.000/gebruiker; typische korting 30–50% op list | [Vendor Benchmark](https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing) |
| Officiële Oracle-prijslijst | [oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf) (inhoud niet toegankelijk via fetch) | — |

**Interpretatie.** De Israëlische prijzen liggen *onder* de internationale listprijs. Coral's $2.570/jaar voor P6 Professional en $1.320/jaar voor EPPM suggereren dat Israëlische afnemers in de praktijk in de 30–50%-kortingsband van Oracle zitten die Vendor Benchmark noemt. Dat is plausibel voor een kleine markt met een handvol grote afnemers die volumecontracten sluiten.

> **[VERIFICATIE — PRIJZEN BEVESTIGD, INTERPRETATIE GECORRIGEERD]** De Coral-prijzen zijn bij hercontrole **letterlijk bevestigd** op [mrcoral.co.il/oracle-primavera](https://www.mrcoral.co.il/oracle-primavera): *"עלות הרישיון השנתי היא כ- 2,570 דולר למשתמש"*, onderhoud ca. $550, EPPM *"מתחילה מ- 1,320 דולר למשתמש"*. Dit blijft het waardevolste prijsdatapunt in het rapport.
>
> **De conclusie die eruit wordt getrokken, klopt echter niet.** Het rapport vergelijkt een **jaarlicentie** ($2.570/jr, Coral — het Hebreeuws zegt expliciet רישיון **שנתי**) met een **perpetuele licentie** ($3.520 eenmalig, Oracle Licensing Experts) en concludeert dat Israël "onder de listprijs" zit. Dat is een appels-en-perenvergelijking. Doorgerekend over drie jaar:
>
> | | Jaar 1 | 3-jaars-TCO |
> |---|---|---|
> | Perpetueel $3.520 + 20% onderhoud ($704/jr) | $4.224 | **$5.632** |
> | Israëlische jaarlicentie $2.570 + $550 onderhoud | $3.120 | **$9.360** |
>
> Over drie jaar is de Israëlische constructie dus **ruim 1,6× zo duur** als de internationale perpetuele referentie; vanaf jaar 5 loopt dat op naar ruim 2×. De stelling "de Israëlische prijzen liggen in de 30–50%-kortingsband" is daarmee **niet onderbouwd en waarschijnlijk in de verkeerde richting**. Er is geen bewijs dat Israëlische afnemers korting krijgen; er is bewijs dat de lokale partner een abonnementsmodel voert.
>
> *Kanttekening:* Oracle verkoopt P6 tegenwoordig zowel perpetueel als per abonnement, en ik kon Oracle's actuele officiële prijslijst niet ophalen (de PDF is niet toegankelijk; een hercontrole via zoekmachine liep op een CAPTCHA). De vergelijking hierboven gebruikt de referenties die het rapport zelf aandraagt. **Behandel het kortingspercentage als onbekend, niet als 30–50%.**

**Kosten van implementatie.** Coral beschrijft implementatie als *"תהליך מורכב"* (een complex proces) met behoefteanalyse, infrastructuur, ERP/CRM-integratie, training, maatwerk, kwaliteitscontrole en onderhoud, maar noemt geen bedragen. **[SCHATTING]** Een P6 EPPM-implementatie bij een Israëlische infrastructuurorganisatie kost naar analogie van vergelijkbare markten $80.000–400.000 aan diensten, afhankelijk van integratiescope.

---

### 3.3 monday.com — de Israëlische thuisspeler

**Marktpositie.** monday.com is Israëls grootste softwaresucces in deze categorie: hoofdkantoor Tel Aviv (+ New York), FY2025-omzet **$1,23 mrd** (+27% j-o-j), 89% brutomarge, $118,7 mln nettowinst, 4.281 klanten met >$50.000 ARR ([monday.com IR](https://ir.monday.com/news-and-events/news-releases/news-details/2026/monday-com-Announces-Fourth-Quarter-and-Fiscal-Year-2025-Results/default.aspx), [StockTitan 20-F](https://www.stocktitan.net/sec-filings/MNDY/)).

In Hebreeuwstalige "beste bouwprojectmanagementsoftware"-lijsten staat monday.com structureel op nummer 1 ([WebsitePlanet HE](https://www.websiteplanet.com/he/blog/), [building.org.il](https://www.building.org.il/articles/)). Dat is deels thuisvoordeel en deels affiliate-SEO — behandel deze lijsten met scepsis.

**Belangrijk voorbehoud:** monday.com heeft timeline-/Gantt-weergaven en afhankelijkheden, maar **geen CPM-engine** (geen echte total float, geen kritiek-padberekening in de planningszin, geen kalenderrekenmodel op activiteitenniveau). Het concurreert dus niet met MS Project/P6 op planningsdiepte, maar het *verdringt* ze wel bij organisaties die anders MS Project "light" zouden gebruiken.

**Prijzen (per zitplaats, jaarlijks gefactureerd, USD, 2026):**

| Tier | Prijs | Opmerking |
|---|---|---|
| Free | $0 | max. 2 zitplaatsen |
| Basic | $9 | min. 3 zitplaatsen |
| Standard | $12 | min. 3 zitplaatsen |
| Pro | $19 | verhoogd van $16 in feb. 2026 |
| Enterprise | op aanvraag | — |

Maandelijkse facturering ligt hoger: Basic $12, Standard $14, Pro $24. Bron: samengesteld uit [buyersprint.com, costbench.com, pmworld360.com e.a.](https://costbench.com/) — genoteerd dat Basic sinds eind 2025 met 12,5% steeg.

> **[VERIFICATIE — JAARPRIJZEN BEVESTIGD, REST ONZEKER]** Hercontrole rechtstreeks op [monday.com/pricing](https://monday.com/pricing) bevestigt de jaarprijzen exact: **Free $0 (max. 2 zitplaatsen), Basic $9, Standard $12, Pro $19, Enterprise op aanvraag**. Ook de bedrijfscijfers kloppen: FY2025-omzet **$1.232 mln**, groei **26,75%** (≈ +27%), nettowinst **$118,74 mln** ([stockanalysis.com/stocks/mndy](https://stockanalysis.com/stocks/mndy/financials/)) ✓.
>
> Drie nevenbeweringen houden géén stand of zijn niet te bevestigen:
> 1. **"min. 3 zitplaatsen"** — de prijspagina noemt geen 3-zitplaatsenminimum; de rekenvoorbeelden staan op 10 zitplaatsen. Onzeker.
> 2. **Maandprijzen $12/$14/$24** — de pagina vermeldt een jaarkorting van **18%**, wat maandprijzen van ca. $11 / $14,60 / $23,20 impliceert. Twee onafhankelijke fetches gaven geen bevestiging van $12/$14/$24. Onzeker (de pagina is JS-gedreven en prijzen variëren per zitplaatsaantal).
> 3. **"Pro verhoogd van $16 in feb. 2026" en "Basic +12,5% sinds eind 2025"** — geen enkele onafhankelijke bevestiging gevonden. De bron is een aggregator-samenvoeging zonder datering. **Schrappen of als onbevestigd markeren.**

---

### 3.4 Trimble TILOS — de infrastructuurniche

TILOS (lineaire/tijd-wegplanning) is een van de weinige nichepakketten waarvoor ik **direct Israëlisch bewijs** vond, en dat is opvallend:

- Vacature Shapir Engineering: *"שליטה בתוכנות לוחות זמנים נוספות (Primavera, Tilos) יתרון"* ([JobKarov](https://www.jobkarov.com/Search/Site/2673176))
- Vacature planningsingenieur Herzliya: *"עבודה בתוכנות MSPROJECT (PRIMAVERA, TILOS יתרון)"* ([AllJobs, JobID 8375717](https://www.alljobs.co.il/Search/UploadSingle.aspx?JobID=8375717))
- Vacature PMO/tijdschemabeheersing: *"MS Project-kennis verplicht; Primavera- en TILOS-ervaring een voordeel"* ([AllJobs, JobID 8671342](https://www.alljobs.co.il/))
- NTA-tenderdocumenten verwijzen naar TILOS en lineaire-planningsoftware voor infrastructuurprojecten ([nta.co.il](https://www.nta.co.il/media/xmqnjku3/))

Dit is logisch: Israël bouwt tegelijk zware spoor-, metro- en snelweginfrastructuur, precies het domein waar tijd-wegdiagrammen meerwaarde hebben. **Geen publieke Israëlische prijs gevonden.** Internationaal ligt TILOS in de $5.000–10.000 per perpetuele licentie-orde — **[SCHATTING, niet geverifieerd]**.

> **[VERIFICATIE — WEERLEGD; belangrijkste feitelijke misser van het rapport]** TILOS is **geen levend product meer**. Trimble heeft aangekondigd dat TILOS per **1 maart 2026** in de *End of Maintenance*-fase gaat; **TILOS 11.1 MR4 is de laatste release**, daarna geen updates of onderhoud meer. Bron: [BuildingPoint (Trimble-distributeur) — "Important Announcement: Tilos Entering End of Maintenance on 1 March 2026"](https://help.buildingpoint.com.au/hc/en-au/articles/55527556493849--Important-Announcement-Tilos-Entering-End-of-Maintenance-on-1-March-2026). De Trimble-productpagina (`trimble.com/en/products/tilos`) geeft inmiddels HTTP 404.
>
> Dit raakt drie plaatsen in het rapport:
> 1. **Rangorde (§3, plaats 5):** TILOS is een uitfaserend product, geen "reële niche" met toekomst. De Israëlische vacatures die het rapport aanhaalt bewijzen historische adoptie, niet een lopende markt.
> 2. **Laag 1 (§2.2):** de nichecategorie "TILOS, Asta, Acumen, Safran, HCP-Go" à $0,3–0,8 mln bevat een product waarvan de licentie-inkomsten per maart 2026 aflopen.
> 3. **Groei (§2.3):** de bewering dat "de infrastructuur-/megaprojectlaag (P6, **TILOS**, project-controls-diensten) sneller groeit" is voor TILOS aantoonbaar onjuist.
>
> **Kans, niet alleen correctie:** een EOL-product met een verankerde gebruikersbasis in precies het segment (lineaire spoor-/weginfra) waar Israël nu ILS 65 mrd aan metro-fase-A aanbesteedt, is een **migratievenster**. Voor een nieuwe planningstool met lineaire/tijd-wegweergave is dit het meest concrete aanknopingspunt in dit hele rapport — concreter dan de Hebreeuwse locale.

---

### 3.5 Lokale en niche-pakketten — met eigen voor- en nadelen

#### HCP / HCP-Go — het enige echte lokale planningsproduct

**Wat het is.** HCP staat voor *Hidden Critical Path*. Ontwikkeld door ing. Tal Levanon (bedrijf opgericht 2002 in Maccabim-Re'ut, patenthouder, methode toegepast op >200 grote projecten sinds eind 2004 — [PMI-evenementenprofiel](https://pmi-2019.events.co.il/people/3556-), [TheBuilder](https://thebuilder.co.il/Supplier-122742/)). HCP-Go is een **MS Project-add-on/SaaS** die met één klik een tijdschema analyseert: het identificeert alle kritieke paden én "verborgen kritieke paden" (paden bijna zo lang als het langste pad), toont de padverdeling als histogram (klokvorm = gezond schema; zaagtandpatroon = structureel probleem) en genereert kwaliteitsrapporten met slaagkansindicaties op tijd, scope en budget ([hcp.co.il/hcp-go](https://www.hcp.co.il/hcp-go/)).

**Referentieprojecten:** ziekenhuizen (Hadassah), kantoortorens, stadions, snelweginfrastructuur ([hcp.co.il](https://www.hcp.co.il/)).

**Prijs:** Professional **₪129/maand incl. btw** (≈ $42). Premium-variant inclusief 3 uur persoonlijke training. Jaarabonnement met keuze tussen eenmalige betaling met korting of 12 termijnen. Gratis proefmaand zonder creditcard ([hcp.co.il/hcp-go](https://www.hcp.co.il/hcp-go/)).

**Voordelen (op basis van documentatie, vakvereniging-erkenning en tenderdoorwerking):**
- **Bovenmaatse invloed via zijn specificatie.** Levanon publiceerde een uitgebreide Israëlische specificatie voor tijdschemamanagement die door Israëlische opdrachtgevers in contractdocumenten wordt overgenomen. Dat maakt HCP een *de-facto normstellende partij* — zeldzaam voor een klein lokaal bedrijf.
- **Erkenning door de beroepsgroep:** de Israëlische Vereniging van Ingenieurs (engineering.org.il) voert zijn cursus "professionele tijdschema's met de HCP-methode" in het officiële cursusprogramma.
- **Prijs.** ₪129/maand is een fractie van een P6-licentie en drempelloos voor kleine adviesbureaus.
- **Vult een echte leemte.** Schemakwaliteitscontrole (DCMA-14-achtig) is precies wat MS Project níet biedt, en waar Israëlische opdrachtgevers om vragen.
- **Hebreeuws-native, RTL, lokale support.**

**Nadelen:**
- **Het is geen scheduler.** HCP-Go vereist MS Project; het vervangt niets. Wie geen MS Project heeft, heeft er niets aan.
- **Proprietaire, niet-gestandaardiseerde methodologie.** "Verborgen kritiek pad" is geen erkende AACE/SCL/PMI-term. De site zelf positioneert HCP als aanvulling op CPM, niet als CPM. Internationale validatie ontbreekt; er zijn geen peer-reviewed publicaties of onafhankelijke reviews gevonden.
- **Sleutelpersoonrisico.** Bedrijf, methode, boek, cursus, specificatie en software hangen aan één persoon. Facebookpagina met 168 likes; geen zichtbare organisatie erachter.
- **Geen Primavera-ondersteuning gevonden.** Voor de megaprojectlaag (juist waar padanalyse het meest waard is) is dat een harde beperking.
- **Geen enterprise-/multi-userarchitectuur gevonden**; geen API-, integratie- of SSO-documentatie aangetroffen.
- **Ingebakken belangenverstrengeling.** Dezelfde partij schrijft de specificatie, verkoopt de tool die eraan meet, geeft de cursus en levert de adviesdienst. Dat is commercieel slim maar zou opdrachtgevers moeten laten nadenken.

#### Benarit (בנארית) — marktleider in hoeveelheden/calculatie, géén planning

Cloud- en modulair platform voor bouwprojectbeheer: kwaliteitsstaten (כתבי כמויות), calculatie/prijsstelling, hoeveelhedenberekening uit tekeningen, inkoop, onderaannemersbeheer, tenderbeheer, budgetbewaking, werkdagboeken, factuurbeheer en meegeleverde GstarCAD-tekensoftware. Klanten: gemeenten (Hof HaCarmel, Yokneam), aannemers (Gordis, Tabor, Rolider), overheidsinstanties. De marketingpagina claimt *"Israels leidende geavanceerde software voor de bouw"* ([benarit.com](https://benarit.com/), [lp.benarit.com/quantities](https://lp.benarit.com/quantities/), [engineering.org.il bedrijfsprofiel](https://www.engineering.org.il/index/company/benarit)).

- **Voordelen:** onbetwiste positie in Israëlische BoQ/calculatie; sluit aan op lokale prijsboeken (Dekel-conventies); brede modulaire dekking van de kostenkant; Hebreeuws-native; publieke referentieklanten inclusief gemeenten.
- **Nadelen:** **geen CPM/Gantt-engine aangetroffen** — dit is een kosten- en hoeveelhedenpakket, geen planner. **Geen publieke prijs** (volledig opaak, alleen offerte). Geen bewijs van MPP/XER-interoperabiliteit. Bundelt GstarCAD, wat vendor-lock-in versterkt.
- **Relevantie:** Benarit is een *complement*, geen concurrent, voor een planningstool. Er is een integratiekans (BoQ → activiteiten).

#### ROG-Tech (רוג-טק) — het enige lokale pakket met een echte Gantt

Software voor "geavanceerd projectbeheer in de bouw en infrastructuur", met gedetailleerde tijdschema's, taakafhankelijkheden, mijlpalen, resourcetoewijzing en voortgangsbewaking tegen de planning, plus resourcebeheer, budgetbewaking, documentbeheer met versiebeheer, samenwerking, 3D-BIM-integratie met clashdetectie en risicomanagement. Klanten: gemeenten en waterbedrijven (תאגידי מים) ([rog-tech.com](https://rog-tech.com/)). Biedt ook automatische BoQ uit BIM ([rog-tech.com/כתב-כמויות-אוטומטי](https://rog-tech.com/)).

- **Voordelen:** het enige duidelijk geïdentificeerde lokale pakket met Gantt-planning én BIM/GIS-integratie; sterke positie bij Israëlische gemeenten en waterbedrijven — een publieke-sectorniche waar internationale spelers niet komen; Hebreeuws en RTL native; combineert kosten, documenten en planning in één systeem, wat voor een kleine gemeente aantrekkelijker is dan drie losse tools.
- **Nadelen:** **geen bewijs van een echte CPM-engine** (float, kritiek pad, kalendermodel) — de beschrijving suggereert planning-tracking, niet netwerkberekening; **geen prijs publiek**; geen aangetoonde MS Project/Primavera-interoperabiliteit (fataal wanneer dezelfde gemeente van haar aannemer een MPP-bestand eist); geen onafhankelijke reviews of gebruikersfora gevonden; kleine installed base; alle referenties zijn testimonials op de eigen site.

#### Conqum (קונקאם)

Bouwprojectmanagementsysteem met nadruk op kwaliteitsborging, opleveringsprotocollen voor appartementen en tijdschemabeheer; publiceert eigen content over "ניהול לוח זמנים לפרויקט בניה" ([conqum-ltd.com](https://conqum-ltd.com/)).

- **Voordelen:** raakt de pijnpunten van Israëlische residentiële ontwikkelaars (snagging, oplevering, kwaliteitsprotocollen) die internationale planners niet dekken; Hebreeuws; concreet en praktisch gepositioneerd.
- **Nadelen:** planningsfunctionaliteit lijkt voortgangsregistratie, geen netwerkplanning; geen prijs, geen reviews, geen interoperabiliteitsinformatie gevonden.

#### Conwize

Israëlische SaaS voor digitale kwaliteitsstaten en aanbestedingen, met AI-assistentie en positionering als Excel-vervanger ([conwize.co.il](https://conwize.co.il/)).
- **Voordelen:** modern, AI-gedreven, richt zich expliciet op het vervangen van Excel — precies de pijn in de Israëlische markt.
- **Nadelen:** calculatie/aanbesteding, niet planning. Geen CPM.

#### Buildots — de best gefinancierde Israëlische contech

AI/computer vision voor automatische voortgangsregistratie op de bouwplaats; $45 mln Series D (leider: Qumra Capital), totaal $166 mln sinds 2018, #3 op Calcalists "50 meest belovende start-ups 2025". Platform omvat projecttracking, onderaannemersbeheer, geautomatiseerde werkdagboeken, betalingen, **scheduling**, defectbeheer ([buildots.com](https://buildots.com/blog/buildots-raises-45m-in-series-d-funding/), [Globes](https://en.globes.co.il/)).

- **Voordelen:** verreweg het best gefinancierde Israëlische bedrijf in deze hoek; genuinely differentiërend (automatische voortgangsopname die het tijdschema voedt in plaats van handmatige updates); internationale klantenbasis; bewijst dat Israëlische contech kan schalen.
- **Nadelen:** het *consumeert* een planning, het maakt er geen; vereist volwassen BIM en hardware (helmcamera's/vaste camera's) op de bouwplaats; enterprise-pricing, niet publiek; alleen zinvol bij grote, herhalende projecten. Voor de meeste Israëlische aannemers buiten bereik.

#### Overige lokale spelers die in het onderzoek opdoken

Makom Ltd ([makomltd.com](https://makomltd.com/)), Ziv ERP voor aannemers ([ziv.co.il](https://ziv.co.il)), Moran B ([moranb.com](https://moranb.com)), Projecteam ([projecteam.tools](https://projecteam.tools/he/project_mng_advi)), RBS Projects ([rbsprojects.co.il](https://www.rbsprojects.co.il/)). Alle Hebreeuws, alle zonder publieke prijzen, alle zonder aangetoonde CPM-engine.

---

### 3.6 Waar géén bewijs van Israëlische aanwezigheid werd gevonden

Voor de volledigheid, en expliciet als "niet gevonden" en niet als "niet aanwezig":

- **Elecosoft Asta Powerproject** — geen Israëlische distributeur, klant of vacature gevonden.
- **Bentley SYNCHRO** — geen Israëlische referentie gevonden (wel plausibel via internationale JV's op het metroprogramma).
- **ALICE Technologies, Nodes & Links, nPlan, SmartPM** — geen Israëlische klant of kanaal gevonden. Nodes & Links haalde $12 mln op maar zonder Israëlisch verband.
- **Deltek (Acumen Fuse/Open Plan), Safran, InEight, RIB Candy/iTWO, Spider Project** — geen Israëlisch bewijs gevonden.
- **Deswik (mijnbouw)** — Israël heeft substantiële mijnbouw (ICL Dead Sea Works: potas, broom, magnesium; Rotem: fosfaat in de Negev), maar ik heb **géén bevestiging** kunnen vinden dat ICL Deswik, Micromine of vergelijkbare mijnplanningssoftware gebruikt. Een zoekresultaat suggereerde dit verband, maar dat bleek een inferentie van de zoekmachine zonder onderliggende bron. **Behandel als onbekend.** De Israëlische mijnbouw is qua planningssoftware een blinde vlek in dit onderzoek.
- **ProjectLibre / GanttProject / OpenProject** — geen Hebreeuwse lokalisatie of Israëlische community gevonden. Open source speelt in de Israëlische bouwplanning geen zichtbare rol.

---

## 4. Lokale bijzonderheden

### 4.1 Contract- en aanbestedingsraamwerk

**Het Israëlische standaardcontract is niet FIDIC maar "formulier 3210" (חוזה מדף 3210).** Dat is het standaard overheidsbouwcontract dat door alle ministeries wordt gebruikt, met de "Blauwe Boek"-algemene specificatie (המפרט הכללי לעבודות בנייה) als integraal onderdeel. Het Blauwe Boek wordt beheerd door een interministeriële commissie en gratis gepubliceerd door het Ministerie van Defensie op [mifratclali.mod.gov.il](https://mifratclali.mod.gov.il) — alle hoofdstukken zijn vrij te downloaden ([CivilEng: הספר הכחול](https://www.civileng.co.il/useful-info/blue-book)). Hoofdstuk 81 behandelt beheer, coördinatie en uitvoering van bouwwerken ([engineering.org.il](https://www.engineering.org.il/)).

**FIDIC wordt gebruikt, maar aanvullend.** Israëlische tenderdocumenten kunnen internationale voorwaarden (zoals FIDIC) opnemen naast de 3210-bepalingen — vooral bij internationale aanbestedingen zoals het metroprogramma. **NEC heb ik in Israël niet aangetroffen.**

**Alle overheidsinkoop valt onder חוק חובת המכרזים (Wet verplichte aanbestedingen, 5752-1992) en de bijbehorende regelgeving 5753-1993.** NTA voert zijn tijdschema-adviesaanbesteding uit als elektronische aanbesteding conform regel 19c ([nta.co.il/tenders](https://www.nta.co.il/tenders/)). Netivei Israel publiceerde 374 tenders in het afgelopen jaar ([Govi](https://govi.co.il/publisher/865)).

### 4.2 Verplichte softwarelevering — de belangrijkste lokale eigenaardigheid

Israël kent **geen verplichte P6/XER-levering** zoals de Golfstaten. Wat het wél kent, is een even harde maar tegenovergestelde eis:

> *"הקבלן יכין את לוח הזמנים המפורט באמצעות תוכנת MS PROJECT של מיקרוסופט גרסה 2013 ומעלה. עותק מורשה של התוכנה יותקן במשרד המפקח באתר."*
> "De aannemer stelt het gedetailleerde tijdschema op met MS PROJECT van Microsoft, versie 2013 of hoger. Een gelicentieerde kopie van de software wordt geïnstalleerd in het kantoor van de toezichthouder op de bouwplaats."
> — [Trans-Israel Highway, Bijlage F: מפרט ניהול לוחות זמנים](https://www.transisrael.co.il/Uploads/tenderDocuments/)

**Het leverbestandsformaat is dus MPP, niet XER.** Voor iedere leverancier van planningssoftware die de Israëlische markt wil betreden is dat de doorslaggevende technische eis: MS Project-interoperabiliteit is gating, XER is optioneel.

> **[VERIFICATIE — DEELS BEVESTIGD, DEELS ONZEKER; dit is de kernstelling van het rapport en verdient de meeste scepsis]**
>
> **Wat wél hard is.** De HCP-specificatie is bij hercontrole **letterlijk geverifieerd** ([hcp.co.il, hoofdstuk 2](https://www.hcp.co.il/project-time-management-specification-chapter2/)). De softwarebepaling luidt voluit:
> > *"זכותו של המזמין לקבוע את תוכנת הלו"ז שבה ישתמש הקבלן וחובת הקבלן להשתמש בתוכנה שנבחרה על ידי המזמין. אם לא נקבע אחרת בחוזה, ישתמש הקבלן בתוכנת MS-Project במהדורתה האחרונה."*
> > "Het is het recht van de opdrachtgever de planningssoftware te bepalen die de aannemer gebruikt, en de plicht van de aannemer de door de opdrachtgever gekozen software te gebruiken. Is in het contract niets anders bepaald, dan gebruikt de aannemer MS-Project in de laatste versie."
>
> **Belangrijke nuance die het rapport laat vallen:** de primaire regel is **opdrachtgeversdiscretie**; MS Project is de *fallback* wanneer de opdrachtgever niets voorschrijft. Dat is iets zwakkers dan "MPP is het leverformaat" — het betekent dat een concurrerend formaat contractueel gewoon kan worden aangewezen. De formulering in §1 ("contractueel verplicht") en hier ("het leverbestandsformaat is dus MPP") is **sterker dan de geverifieerde brontekst draagt**.
>
> **Wat níet geverifieerd is.** De Trans-Israel Highway-eis ("MS PROJECT versie 2013 en hoger") is de tweede pijler onder de MS-Project-first-these, maar de opgegeven bron-URL (`transisrael.co.il/Uploads/tenderDocuments/`) is een **mapverwijzing, geen document** — er is geen controleerbare vindplaats. Ik heb het citaat niet onafhankelijk kunnen terugvinden. **Markeer als onbevestigd.**
>
> **Tegenbewijs gezocht, niet gevonden.** Een gerichte Hebreeuwstalige zoektocht naar Israëlische aanbestedingen die juist *Primavera* voorschrijven leverde geen enkel tenderdocument op — alleen leveranciers (Megatec, Coral) en adviseurs. Dat is zwak negatief bewijs, maar het spreekt de these niet tegen.
>
> **Netto oordeel:** de richting van de bevinding (Israël leunt op MS Project waar de Golf op P6 leunt) wordt door de HCP-spec ondersteund en is waarschijnlijk juist. De **hardheid** ervan is overtrokken: één geverifieerde spec met een opdrachtgevers-override plus één niet-verifieerbaar tendercitaat is geen bewijs dat MPP marktbreed "gating" is.

### 4.3 De Israëlische tijdschemaspecificatie — buitengewoon gedetailleerd

De breed gebruikte specificatie voor tijdschemamanagement ([hcp.co.il hoofdstuk 2](https://www.hcp.co.il/project-time-management-specification-chapter2/)) legt eisen op die veel verder gaan dan wat in Europa gebruikelijk is. Dit is de facto de Israëlische planningsnorm:

**Softwarevereiste:** MS Project, laatste versie, legale kopie op kosten van de aannemer op de computer van de projectmanager.

**Vier verplichte schematypen:** skeletschema (voorlopig, laag detail) → gedetailleerd schema → baselineschema (goedgekeurd) → maandelijkse geactualiseerde schema's. De baseline moet bewaard blijven en **op de achtergrond van elke update zichtbaar zijn** ter vergelijking. Bestanden in native formaat (MPP).

**Structuureisen:**
- Hiërarchische WBS, **minimaal niveaus 1 t/m 4** in het gedetailleerde schema
- Alle activiteiten met unieke ID, duur en logische relaties
- Contractuele mijlpalen met streefdata
- Eigenaarstoewijzing per activiteit (aannemer / opdrachtgever / derden)
- Resourcetoewijzing en -nivellering
- **Activiteiten mogen niet langer dan één kalendermaand duren** — langer werk moet worden opgesplitst

**CPM-regels (opvallend prescriptief):**
- Kritiek pad volgens CPM: *"יוצג הנתיב הקריטי לפי CPM (הנתיב שמסתיים מאוחר ביותר)"* — het pad dat het laatst eindigt
- **Start-Finish (SF)-relaties zijn verboden**
- **Negatieve lags zijn verboden**; circulaire logica verboden
- Early-start-planning als default; constraints alleen met motivering
- Bij gebruik van HCP-software: identificatie van "verborgen kritieke paden" nabij het kritieke pad

**Bufferbeheer:** een **20% marge** op de projectoplevering, tenzij anders onderbouwd met statistische risicoanalyse (Monte Carlo). De buffer neemt maandelijks af volgens `buffer = resterende duur ÷ 6`. Mijlpaaldata worden berekend als skeletschema + 20% buffer. Vertragingsboetes en versnellingsbonussen moeten in balans zijn.

**Vertragingsanalyse en documentatie:**
- **Wekelijkse hindernissenregistratie** (obstakelenlog met documentatie, eigenaar, oplosdatum)
- **Maandelijkse schema-updates** met werkelijke voortgang en herziene prognoses
- **Verwijderen van activiteiten is verboden** — in plaats daarvan duur op nul met toelichtende notitie
- Notities in gestandaardiseerd formaat: "Datum – uitleg met verwijzingen naar documenten"; *"ההערה צריכה להיות עובדתית בלבד"* — de notitie moet uitsluitend feitelijk zijn
- Formele baseline-resets (Baseline 1, Baseline 2, …) met behoud van historie voor geschillenbeslechting

**Gedeelde tijdschemaadviseur:** projecten kunnen een neutrale planningsadviseur aanstellen die beide partijen dient, met transparante updates, **50/50-kostendeling**, onafhankelijkheid en distributie van alle rapporten aan beide partijen. Dit is een genuine Israëlische praktijk die ik in weinig andere markten tegenkom.

**Referentiestandaarden:** PMBOK voor simulatiemethodieken; HCP-Go-methodologie als optionele aanvulling.

**Implicatie voor softwareleveranciers:** deze specificatie is bijna een functionele requirements-lijst. Een tool die SF-relaties toestaat, negatieve lags niet blokkeert, geen baseline-overlay kan tonen of geen WBS tot niveau 4 ondersteunt, voldoet aantoonbaar niet aan de Israëlische contractpraktijk.

### 4.4 Opleidingscultuur en -prijzen

Israël heeft een **dichte, vrijwel volledig MS Project-georiënteerde** opleidingsmarkt. Trainingen worden per cursus verkocht (niet per certificeringstraject zoals in de Golf).

| Aanbieder | Cursus | Prijs / vorm | Bron |
|---|---|---|---|
| **Vereniging van Ingenieurs** (engineering.org.il) | "Professionele tijdschema's met de HCP-methode" (MS Project), docent ing. Tal Levanon | **₪3.273** leden/ingenieurs · **₪3.480** bouwbond/gemeente-ingenieurs/architectenbond · **₪3.680** overigen | [engineering.org.il](https://www.engineering.org.il/event/professional_timetables_course) |
| **ICPM** | MS Project voor bouw en infrastructuur | 4 sessies, maandag 17:00–20:00, hybride (fysiek + Zoom); prijs alleen bij afrekenen zichtbaar | [icpm.co.il](https://icpm.co.il/ms-project-construction-course/) |
| **HCP** | Digitale cursus "professionele tijdschema's" | 20 lessen + bonusles over veiligheidsmarge, zelfstudie | [hcp.co.il](https://www.hcp.co.il/schedule-part1-course/) |
| **IITC** | MS Project | Geen prijs publiek | [iitc.co.il](https://iitc.co.il/management/ms-project/) |
| **CivilEng** | MS Project tijdschemabeheer | Geen prijs publiek | [civileng.ravpage.co.il](https://civileng.ravpage.co.il/MSProject) |
| **Carmel Training, Spectra, AG Projects** | MS Project | Geen prijs publiek | [ctraining.co.il](https://ctraining.co.il/construction-of-schedules-ms-project/), [spectra.co.il](https://www.spectra.co.il/courses/ms-project/) |
| **Megatec** | Oracle Primavera P6 cursussen en trainingen | Geen prijs publiek | [pm.megatec.co.il](https://pm.megatec.co.il/EnCContentPage.aspx?lang=he-il) |
| **P.M. Team Ltd** | Workshops planning en projectbeheersing met Primavera | Geen prijs publiek | [pmteam.co.il](https://www.pmteam.co.il/project-management-with-primavera-course) |
| **MSL** | Online Oracle Primavera PPM-specialisatie (Coursera/PMI-certificaat) | Geen prijs publiek | [msl.org.il](https://msl.org.il/) |

**Waarschuwing bij internationale aanbieders.** The Knowledge Academy, Unichrone, Spoclearn, Invensis Learning en primaveracertificationcourses.com hebben allemaal `/il/`-landingspagina's met "Primavera P6-training in Israël" en zelfs "in Tel Aviv". Dit zijn vrijwel zeker geo-getargete SEO-landingspagina's voor virtuele klassikale cursussen, geen fysieke Israëlische aanwezigheid. Behandel dit **niet** als bewijs voor een lokale Primavera-opleidingsmarkt.

**Cultureel kenmerk:** de opleidingsmarkt is gericht op *bouwkundigen die planner worden*, niet op *planners die certificeren*. Er is geen zichtbaar Israëlisch equivalent van de PSP/PMI-SP-certificeringscultuur; het PMI Israel Chapter (opgericht 1995, prof. Zvi Raz) publiceert geen ledental.

### 4.5 Consultancy als het echte distributiekanaal

Een markante lokale structuur: **planning wordt in Israël in belangrijke mate als dienst ingekocht**. Geïdentificeerde bureaus:

| Bureau | Specialisatie | Bron |
|---|---|---|
| **Shaar Project Management** (שער) | Tijdschemaplanning en -beheersing, 16+ jaar, infrastructuur/bouw/hi-tech/defensie/HLS | [shaar-pm.com](https://www.shaar-pm.com) |
| **Lurtam** (לורתם) | BIM, tijdschema's, CPM, Gantt, MS Project, Primavera, risicomanagement | [lurtam.co.il](https://lurtam.co.il) |
| **OG Projects** | Baseline-schema's, updates, vertragingsimpactanalyse, documentatie | [og-projects.co.il](https://www.og-projects.co.il) |
| **C² / CCCE** | Projectmanagement, engineering-advies, BIM-management, tijdschemaplanning en -beheersing | [ccce.co.il](https://www.ccce.co.il) |
| **Itzik Katzav** (איציק קצב) | Tijdschemabeheer bouw/infra, PMO-beheersing, juridisch advies, 25+ jaar | [itzikatzav.com](https://itzikatzav.com) |
| **MK Consulting** | PMO-diensten: tijdschema, budget, resources | [mkcon.co.il](https://www.mkcon.co.il) |
| **Sohlberg Consulting** (סולברג) | Engineering-, budget- en tijdschemabeheersing, rekeningcontrole | [sohlberg.co.il](https://sohlberg.co.il) |
| **HCP** (Tal Levanon) | HCP-analyse, tijdschema-opbouw en -beheersing, risicomanagement | [hcp.co.il](https://www.hcp.co.il) |

Deze bureaus brengen hun eigen MS Project-/Primavera-licenties mee. Dat betekent: **de licentiemarkt is geconcentreerder dan het aantal projecten doet vermoeden**, en een nieuwe tool die niet door deze bureaus wordt geadopteerd, bereikt de markt niet.

### 4.6 De rol van Excel

Excel is in Israël niet de uitzondering maar de basislijn buiten de grote projecten. Het Hebreeuwstalige zoeklandschap staat vol met:
- Gratis en betaalde Gantt-sjablonen voor Excel ([exayard.com/il](https://exayard.com/il/blog/tbnyt-lvkh-zmnym-lbnyyh), [finitefield.org/he](https://finitefield.org/he/excel-templates/construction/), [excel-road.com](https://excel-road.com/free_files/gantt_template/), [WPS he-IL](https://www.wps.com/template/he-IL/gantt-chart-excel/))
- Cursussen "projectmanagement in Excel" van reguliere Israëlische opleiders ([ctraining.co.il/project-excel](https://ctraining.co.il/project-excel/), [excel.kova.co.il](https://excel.kova.co.il/general/tasks-with-gantt/))
- "Excel vs. projectmanagementsoftware"-vergelijkingsartikelen in het Hebreeuws ([taskee.pro/he](https://taskee.pro/he/blog/project-management-software-vs-excel-which-tool-is-right-for-your-project/))

Ook aan de calculatiekant: Conwize positioneert zich expliciet als Excel-vervanger voor digitale kwaliteitsstaten, en bonimbayit.co.il meldt dat handmatige hoeveelhedenopname *"8-10 uur voor ervaren professionals"* kost ([bonimbayit.co.il](https://bonimbayit.co.il/bill-of-quantities/)).

**Conclusie: de reële concurrent voor een nieuwe planningstool in Israël is Excel, niet Primavera.**

### 4.7 Informele licenties en compliance

Ik heb **geen recent, betrouwbaar cijfer** kunnen vinden voor het percentage ongelicentieerde software in Israël. Het enige gevonden Israël-specifieke datapunt is verouderd: **41% in 2000**, met $66,3 mln aan gederfde omzet ([Globes, BSA-rapportage](https://en.globes.co.il/en/article-492699)). De BSA Global Software Survey (laatste editie 2018, [gss.bsa.org](https://gss.bsa.org/countries/)) publiceert Israël-landendata, maar die was via deze onderzoeksmethode niet extraheerbaar. Wereldwijd lag het percentage in 2017 op 37%.

**Indirect bewijs dat licentiecompliance in de Israëlische bouw een reëel aandachtspunt is:** zowel de Trans-Israel-specificatie als de HCP-specificatie eisen *expliciet* dat een **gelicentieerde/legale kopie** wordt geïnstalleerd — en de HCP-spec voegt toe dat dat op kosten van de aannemer gebeurt. Een dergelijke bepaling schrijf je niet op als het vanzelfsprekend is. Dit is een sterke aanwijzing dat informeel licentiegebruik bij Israëlische aannemers voorkomt en dat opdrachtgevers zich daartegen contractueel indekken. **[INTERPRETATIE — geen direct bewijs]**

### 4.8 Sancties, exportbeperkingen en geopolitiek

- **Geen exportbeperkingen op commerciële planningssoftware richting Israël gevonden.** Zowel Oracle als Microsoft hebben grote Israëlische vestigingen en R&D-centra; Microsoft prijst Israël gewoon in USD; Oracle heeft een Israëlische website (`oracle.com/il`) en meerdere Israëlische partners.
- **Wat wél materieel is, is de oorlogsimpact op de vraagzijde:** cumulatief outputverlies van 8,6% van het jaar-bbp (≈ ILS 177 mrd) t/m eind 2025 ([Bank of Israel](https://www.boi.org.il/en/communication-and-publications/regular-publications/bank-of-israel-annual-report/bank-of-israel-annual-report-2025-1/)); ILS 98 mrd verlies in de bouw in 2024 ([CBS via GlobalData](https://www.marketresearch.com/GlobalData-v3648/Israel-Construction-Size-Trends-Forecasts-41587122/)); arbeidstekort door het wegvallen van Palestijnse arbeidskrachten, deels opgevangen met 110.000 buitenlandse werknemers ([zipdo](https://zipdo.co/israel-construction-industry-statistics/)).
- **Megaprojectvertragingen:** de Paarse en Groene lightraillijnen zouden in 2026 openen maar draaien volgens bronnen niet vóór 2030 ([Globes](https://en.globes.co.il/en/article-tel-aviv-light-rail-construction-plagued-by-delays-1001486278)); de Staatscontroleur waarschuwde in december 2025 dat het metroproject *"ernstige organisatorische en financiële uitdagingen"* kent die de oplevering kunnen vertragen en miljarden kunnen toevoegen ([israel.com](https://israel.com/business/tel-aviv-metro-project-faces-delays-cost-overruns-comptroller-warns/)). Dit is precies het klimaat waarin de vraag naar tijdschemabeheersing, vertragingsanalyse en claimondersteuning stijgt.
- **Ik heb geen bewijs gevonden** van boycot- of leveringsbeperkingen die de verkoop van planningssoftware in Israël raken.

> **[VERIFICATIE — GECORRIGEERD/GENUANCEERD]** De enge bewering blijft staan: er zijn **geen exportbeperkingen op commerciële planningssoftware** richting Israël gevonden. Maar de geruststellende toon van deze paragraaf ("Zowel Oracle als Microsoft hebben grote Israëlische vestigingen…") laat drie materiële feiten weg die een leverancier die deze markt overweegt wél moet kennen:
>
> 1. **Microsoft heeft in september 2025 daadwerkelijk clouddiensten afgesloten voor een Israëlische staatsklant.** Op 25 september 2025 schakelde Microsoft bepaalde Azure-diensten uit voor Unit 8200 (militaire inlichtingen), na onderzoek van The Guardian en +972 Magazine. Aangekondigd door Microsoft-president Brad Smith. Bronnen: [Microsoft On the Issues](https://blogs.microsoft.com/on-the-issues/2025/09/25/update-on-ongoing-microsoft-review/), [The Guardian](https://www.theguardian.com/world/2025/sep/25/microsoft-blocks-israels-use-of-its-technology), [BBC](https://www.bbc.com/news/articles/cvgjx0zve2no), [CNN](https://edition.cnn.com/2025/09/25/tech/microsoft-israel-surveillance). Dit raakt geen planningssoftware, maar het weerlegt wel de impliciete aanname dat westerse softwareleveranciers in Israël onvoorwaardelijk leveren. Voor een markt waarin de contractuele standaard **één Amerikaanse leverancier** is (MS Project), is dat een reëel concentratierisico — en tegelijk een argument vóór een onafhankelijke/open tool.
> 2. **Israël voert zelf nieuwe exportcontrole in.** Een *Dual-Use Export Control Bill* (Q1 2026) bundelt de Israëlische exportcontrole op dual-use goederen, **software en technologie** in één wet ([globaladvisoryexperts.com](https://globaladvisoryexperts.com/sanctions-compliance-israel-2026/)). Relevant voor wie vanuit Israël wil exporteren of daar wil ontwikkelen.
> 3. **Georganiseerde boycotdruk op de leveranciers zelf** is reëel en gedocumenteerd ([bdsmovement.net/microsoft](https://bdsmovement.net/microsoft)), met aanhoudende interne en externe druk op Google, Microsoft en Amazon.
>
> **Herformulering:** "geen sanctiebelemmering voor de verkoop van planningssoftware aan Israëlische private partijen; wél aangetoond leveranciersrisico bij publieke/defensieklanten en een veranderend Israëlisch exportcontroleregime."

### 4.9 Taal en RTL — een onderschatte drempel

Hebreeuws is een RTL-taal. MS Project heeft een Hebreeuwse UI; Primavera P6 heeft **geen** officiële Hebreeuwse lokalisatie. Alle lokale pakketten (Benarit, ROG-Tech, Conqum, HCP-Go, Conwize) zijn Hebreeuws-native, en dat is een van hun belangrijkste verdedigingslinies tegen internationale concurrentie.

Voor Open Planner Studio specifiek is dit een concreet, goedkoop aanknopingspunt: de app ondersteunt veertien locales (`nl, en, fr, de, es, zh, it, pt, pl, tr, ar, ja, ko, fa`) waarvan `ar` en `fa` al RTL zijn — de RTL-infrastructuur (`RTL_LOCALES`, `document.documentElement.dir`) staat er dus al. **Hebreeuws (`he`) ontbreekt.** Toevoegen kost vier namespace-vertalingen en nul architectuurwerk.

### 4.10 Delay claims en forensische planningsanalyse

Israëlische bronnen over forensische vertragingsanalyse zijn schaars; er is **geen bewijs** gevonden van formele adoptie van het SCL Delay & Disruption Protocol of AACE 29R-03 in Israël. Wat er wél is, is een lokaal equivalent: de HCP-specificatie regelt vertragingsdocumentatie tot op het niveau van notitieformaat, wekelijkse obstakelenlogboeken en baseline-resets met historiebehoud "voor geschillenbeslechting". Israël heeft dus een eigen, contractueel verankerde vertragingsdocumentatiepraktijk in plaats van een geïmporteerd protocol.

---

## 5. Wat dit betekent voor een nieuwe/open planningstool

Concreet en toegespitst:

1. **MPP-interoperabiliteit is de poortwachter, niet XER.** In de Golf verkoop je op XER; in Israël verkoop je op MPP. Een tool zonder MS Project-import/export kan aantoonbaar niet aan de Trans-Israel- of HCP-specificatie voldoen.
2. **De HCP-specificatie is een kant-en-klare feature-checklist.** Verbod op SF-relaties, verbod op negatieve lag, activiteiten ≤ 1 maand, WBS-niveau 1–4, baseline zichtbaar op de achtergrond, activiteiten nooit verwijderen maar op duur nul zetten, gestandaardiseerd notitieformaat, 20%-buffer met maandelijkse afbouw (`resterende duur ÷ 6`). Een ingebouwde "Israëlische schemakwaliteitscontrole" tegen deze regels is een scherp, verdedigbaar onderscheidend kenmerk — en het sluit direct aan op een bestaande CPM-engine.
3. **Hebreeuwse locale toevoegen is goedkoop en noodzakelijk.** RTL-plumbing bestaat al voor `ar`/`fa`.
4. **De prijsanker ligt laag.** HCP-Go zet ₪129/maand (~$42) als lokaal referentiepunt voor "serieuze planningssoftware". Een gratis of open tool heeft een sterke wig, zeker tegenover $2.570/jaar voor P6 Professional.

   > **[VERIFICATIE — GECORRIGEERD, misleidende vergelijking]** Hier wordt een **maandprijs** naast een **jaarprijs** gezet, wat de kloof ruim vijf keer overdrijft. Correct op jaarbasis: HCP-Go ₪129 × 12 = **₪1.548 = $507/jr** (incl. 18% btw; ex btw $429) tegenover P6 Professional **$2.570/jr + $550 onderhoud = $3.120/jr**. De werkelijke verhouding is ca. **1 : 6**, niet 1 : 61. Het argument blijft overeind — het prijsanker ligt inderdaad laag — maar met een factor 6, en HCP-Go is bovendien een *add-on bovenop* een MS Project-licentie ($360/jr), zodat de reële lokale instap ca. **$870/jr** is, niet $507.
5. **Ga via de adviesbureaus, niet via de aannemers.** Shaar-PM, Lurtam, OG Projects, C², MK, Sohlberg, HCP — zij zijn het feitelijke distributiekanaal en de opinieleiders.
6. **De echte concurrent is Excel.** Positioneer tegen Excel-Gantts, niet tegen Primavera.
7. **IFC als native formaat sluit aan bij de BIM-oriëntatie** die ROG-Tech, Benarit en Buildots in Israël al normaliseren, en bij de metroprojecten waar BIM contractueel wordt geëist.

---

## 6. Openstaande vragen en zwaktes in dit onderzoek

Eerlijkheidshalve, zodat de lezer weet waar hij niet op moet leunen:

- **Geen enkel cijfer over de Israëlische planningssoftwaremarkt komt uit een marktonderzoeksbureau.** Hoofdstuk 2.2 is volledig eigen redeneerwerk.
- **Aantal planners is een afgeleide schatting**, geen telling. Geen Israëlisch register, PMI-ledental of CBS-beroepsclassificatie gevonden.
- **Mijnbouw is een blinde vlek.** ICL is een grote Israëlische mijnbouwer maar ik kon niet vaststellen welke mijnplanningssoftware daar draait.
- **Defensie is een blinde vlek.** IAI, Elbit en Rafael zijn grote programmaorganisaties; geen bewijs gevonden van welke planningstool zij gebruiken.
- **Geen publieke prijzen** voor Benarit, ROG-Tech, Conqum, TILOS-Israël, of Megatec/Coral-diensten.
- **Geen onafhankelijke gebruikersreviews** van de lokale pakketten gevonden (geen G2/Capterra-vermeldingen, geen Israëlische fora). De voor-/nadelen in hoofdstuk 3.5 zijn daarom gebaseerd op vendor-documentatie, derdenvermeldingen, prijs- en positioneringsanalyse en het ontbreken van bewijs — niet op gebruikerservaringen.
- **Twee sleutelpagina's waren niet bereikbaar** (megatec.co.il gaf 503, de NTA/ENR-projectPDF gaf 403).
- **Enkele "statistieken"-sites** (worldmetrics.org, zipdo.co) zijn AI-gegenereerde aggregators van twijfelachtige betrouwbaarheid; hun cijfers zijn hier opgenomen met bronvermelding maar verdienen onafhankelijke verificatie.

---

## 7. Bronnen

### Markt en macro
- [MarketLine – Construction in Israel (via MarketResearch.com)](https://www.marketresearch.com/MarketLine-v3883/Construction-Israel-45429289/)
- [MarketLine – Construction in Israel (via MarketPublishers)](https://marketpublishers.com/report/industry/construction/construction-in-israel_marketline.html)
- [Next Move Strategy Consulting – Israel Construction Market](https://www.nextmsc.com/report/israel-construction-market-se4733)
- [GlobalData – Israel Construction Market Analysis](https://www.globaldata.com/store/report/israel-construction-market-analysis/)
- [Research and Markets – Israel Construction Market Size, Trends and Forecasts](https://www.researchandmarkets.com/reports/5767964/israel-construction-market-size-trends)
- [GlobalData via MarketResearch.com – Israel Construction (CBS ILS 98 mrd verlies 2024)](https://www.marketresearch.com/GlobalData-v3648/Israel-Construction-Size-Trends-Forecasts-41587122/)
- [Trading Economics – Israel GDP from Construction](https://tradingeconomics.com/israel/gdp-from-construction)
- [Bank of Israel – Annual Report 2025](https://www.boi.org.il/en/communication-and-publications/regular-publications/bank-of-israel-annual-report/bank-of-israel-annual-report-2025-1/)
- [worldmetrics.org – Israel Construction Industry Statistics](https://worldmetrics.org/israel-construction-industry-statistics/) *(aggregator; verifieer)*
- [zipdo.co – Israel Construction Industry Statistics](https://zipdo.co/israel-construction-industry-statistics/) *(aggregator; verifieer)*
- [Mordor Intelligence – Israel ICT Market](https://www.mordorintelligence.com/industry-reports/israel-ict-market)
- [Fortune Business Insights – Construction Software Market](https://www.fortunebusinessinsights.com/construction-software-market-110155)
- [Grand View Research – Construction Management Software Market](https://www.grandviewresearch.com/industry-analysis/construction-management-software-market-report)
- [DataIntelo – Construction Project Management Software (scheduling 38,2%)](https://dataintelo.com/report/construction-project-management-software-market)
- [Verified Market Reports – Project Management Software Market](https://www.verifiedmarketreports.com/product/project-management-software-market/)
- [Research and Markets – Construction Project Management Software](https://www.researchandmarkets.com/report/construction-project-management-software)
- [Israëlische regering – Infrastructure for Growth 2026 (PDF)](https://www.gov.il/BlobFolder/generalpage/plan-infrastructure-2025/he/files_Infrastructure240326.pdf)
- [Port2Port – Transportation and Treasury Ministries Agree on 2026 Budget](https://en.port2port.co.il/article/Industry-Trade/Governance/Transportation-and-Treasury-Ministries-Agree-on-2026-Budget/)

### Megaprojecten
- [NTA – Metro Israel](https://www.nta.co.il/en/metro-israel/) · [NTA tenders](https://www.nta.co.il/tenders/) · [NTA projectschema's](https://www.nta.co.il/לוחות-זמנים-לפרויקטים/)
- [Globes – The Metro is really happening (ILS 180 mrd)](https://en.globes.co.il/en/article-The-Metro-is-really-happening-1001506357)
- [Globes – Tel Aviv light rail construction plagued by delays](https://en.globes.co.il/en/article-tel-aviv-light-rail-construction-plagued-by-delays-1001486278)
- [International Railway Journal – Tel Aviv launches $50bn metro project](https://www.railjournal.com/passenger/metros/tel-aviv-launches-50bn-metro-project/)
- [ENR – Major Procurement Process Begins for Israel's $49B Tel Aviv Metro](https://www.enr.com/articles/62509-major-procurement-process-begins-for-israels-49b-tel-aviv-metro)
- [Ynetnews – Israel launches first phase of $20 billion Tel Aviv metro megaproject](https://www.ynetnews.com/real-estate/article/h1004fhygzx)
- [israel.com – Tel Aviv Metro Project Faces Delays, Cost Overruns; Comptroller Warns](https://israel.com/business/tel-aviv-metro-project-faces-delays-cost-overruns-comptroller-warns/)
- [Netivei Israel – tenders](https://www.iroads.co.il/מכרזים/מכרזים/) · [Govi – Netivei Israel 374 tenders](https://govi.co.il/publisher/865)

### Contract-, norm- en specificatiekader
- [המפרט הכללי לעבודות בנייה ("הספר הכחול") – mifratclali.mod.gov.il](https://mifratclali.mod.gov.il)
- [CivilEng – הספר הכחול (toelichting)](https://www.civileng.co.il/useful-info/blue-book)
- [Trans-Israel Highway – נספח ו' להסכם: מפרט ניהול לוחות זמנים (MS Project 2013+ verplicht)](https://www.transisrael.co.il/Uploads/tenderDocuments/)
- [HCP – מפרט ניהול זמן בפרויקט, פרק 2 (Israëlische tijdschemaspecificatie)](https://www.hcp.co.il/project-time-management-specification-chapter2/)
- [FIDIC – Contracts](https://fidic.org/themes/fidic-contracts)
- [Engineers Association – Chapter 81 / bedrijfsregister](https://www.engineering.org.il/)

### Software, leveranciers en prijzen
- [Oracle Israël – Primavera P6](https://www.oracle.com/il-en/construction-engineering/primavera-p6/) · [Primavera Cloud](https://www.oracle.com/il-en/construction-engineering/primavera-cloud-project-management/)
- [Coral Technologies (קורל טכנולוגיות) – Oracle Primavera, mét Israëlische prijzen](https://www.mrcoral.co.il/oracle-primavera)
- [Megatec – Primavera for Engineering & Construction](https://pm.megatec.co.il/EnCContentPage.aspx?lang=he-il) · [Megatec – Primavera P6](https://www.pm.megatec.co.il/PrimaveraContentPage.aspx?lang=he-il) · [megatec.co.il](https://megatec.co.il/he/index.html)
- [Top Vision – Oracle-oplossingen in Israël](https://www.top-vision.co.il)
- [Talniri – מקיט מערכות מונתה לנציגה של אורקל בישראל](https://www.talniri.co.il/marketnews/article.asp?mp=null&id=55645)
- [Oracle Licensing Experts – P6 licensing guide](https://oraclelicensingexperts.com/blog/oracle-primavera-p6-licensing/)
- [ITQlick – Primavera P6 pricing](https://www.itqlick.com/primavera-p6/pricing)
- [Vendor Benchmark – Oracle Primavera P6 pricing](https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing)
- [Contractors and Builders – Oracle Primavera pricing](https://contractorsandbuilders.com/pricing/oracle-primavera/)
- [Oracle – Primavera price list (PDF; inhoud niet toegankelijk)](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf)
- [Microsoft Israël (he-IL) – Project Plan 3, USD$30/gebruiker/maand](https://www.microsoft.com/he-il/microsoft-365/planner/project-plan-3)
- [Toolz.co.il – Microsoft Project vanaf ₪26](https://toolz.co.il/product/microsoft-project/)
- [A Guide to Cloud – Microsoft Project licensing (Plan 1/3/5)](https://www.aguidetocloud.com/licensing/microsoft-project/)
- [CostBench – Microsoft Project pricing](https://costbench.com/software/project-management/microsoft-project/)
- [monday.com – FY2025 results](https://ir.monday.com/news-and-events/news-releases/news-details/2026/monday-com-Announces-Fourth-Quarter-and-Fiscal-Year-2025-Results/default.aspx) · [persbericht](https://monday.com/p/press-release/monday-com-announces-fourth-quarter-and-fiscal-year-2025-results/) · [StockTitan 20-F](https://www.stocktitan.net/sec-filings/MNDY/)

### Lokale/niche-pakketten
- [HCP (הנתיב הקריטי הנסתר) – hoofdsite](https://www.hcp.co.il/) · [HCP-Go productpagina met prijs ₪129/mnd](https://www.hcp.co.il/hcp-go/) · [over ons](https://www.hcp.co.il/about/) · [digitale cursus](https://www.hcp.co.il/schedule-part1-course/)
- [Tal Levanon – PMI-profiel (HCP-methode, patent, 200+ projecten)](https://pmi-2019.events.co.il/people/3556-)
- [TheBuilder – HCP bedrijfsprofiel](https://thebuilder.co.il/Supplier-122742/)
- [Benarit (בנארית)](https://benarit.com/) · [Benarit – כתבי כמויות](https://lp.benarit.com/quantities/) · [Engineers Association bedrijfsprofiel](https://www.engineering.org.il/index/company/benarit)
- [ROG-Tech (רוג-טק) – תוכנה לניהול פרויקטים](https://rog-tech.com/) 
- [Conqum (קונקאם)](https://conqum-ltd.com/)
- [Conwize – digitale kwaliteitsstaten](https://conwize.co.il/)
- [Buildots – $45M Series D](https://buildots.com/blog/buildots-raises-45m-in-series-d-funding/)
- [Tracxn – Construction Tech startups in Tel Aviv](https://tracxn.com/d/explore/construction-tech-startups-in-tel-aviv-israel)
- [Makom Ltd – ניהול לוחות זמנים](https://makomltd.com/) · [RBS Projects](https://www.rbsprojects.co.il/) · [Projecteam](https://projecteam.tools/he/project_mng_advi)

### Adviesbureaus (planning/projectbeheersing)
- [Shaar Project Management – gids scheduling software](https://guide.shaar-pm.com/scheduling-software/) · [shaar-pm.com](https://www.shaar-pm.com)
- [Lurtam](https://lurtam.co.il) · [OG Projects](https://www.og-projects.co.il) · [C²/CCCE](https://www.ccce.co.il) · [Itzik Katzav](https://itzikatzav.com) · [MK Consulting](https://www.mkcon.co.il) · [Sohlberg Consulting](https://sohlberg.co.il)

### Opleidingen
- [Vereniging van Ingenieurs – cursus professionele tijdschema's (prijzen ₪3.273 / ₪3.480 / ₪3.680)](https://www.engineering.org.il/event/professional_timetables_course)
- [ICPM – MS Project bouw en infrastructuur](https://icpm.co.il/ms-project-construction-course/) · [ICPM – MS Project](https://icpm.co.il/ms-project-course/)
- [IITC – MS Project](https://iitc.co.il/management/ms-project/) · [CivilEng](https://civileng.ravpage.co.il/MSProject) · [Carmel Training](https://ctraining.co.il/construction-of-schedules-ms-project/) · [Spectra](https://www.spectra.co.il/courses/ms-project/) · [CTraining – projectmanagement in Excel](https://ctraining.co.il/project-excel/)
- [P.M. Team Ltd – Primavera-workshops](https://www.pmteam.co.il/project-management-with-primavera-course) · [MSL – Oracle Primavera PPM online](https://msl.org.il/)
- [PMI Israel Chapter](https://pmi.org.il)

### Vacatures en beroepspraktijk (bewijs voor werkelijke softwarevereisten)
- [AllJobs – planningsingenieur Herzliya, JobID 8375717 (MS Project; Primavera, TILOS pré)](https://www.alljobs.co.il/Search/UploadSingle.aspx?JobID=8375717)
- [AllJobs – PMO/tijdschemabeheersing bouwbedrijf, JobID 8671342](https://www.alljobs.co.il/)
- [JobKarov – Shapir Engineering (Primavera, Tilos pré)](https://www.jobkarov.com/Search/Site/2673176)
- [Jobify360 – Project Scheduler](https://jobify360.co.il/jobs/Project%20Scheduler) · [Alstom Green Line-project](https://jobify360.co.il/jobs/35629183-dr)
- [Drushim – Primavera P6-vacatures](https://www.drushim.co.il/jobs/search/Primavera%20P6/) · [Indeed Israël – Primavera](https://il.indeed.com/q-primavera-משרות.html)

### Excel-praktijk
- [Exayard (IL) – 10 beste bouwtijdschema-sjablonen 2026](https://exayard.com/il/blog/tbnyt-lvkh-zmnym-lbnyyh) · [FiniteField (HE) – Excel-bouwsjablonen](https://finitefield.org/he/excel-templates/construction/) · [Excel-Road – Gantt-sjabloon](https://excel-road.com/free_files/gantt_template/) · [WPS (he-IL) – Gantt](https://www.wps.com/template/he-IL/gantt-chart-excel/) · [Excel Kova – taken met Gantt](https://excel.kova.co.il/general/tasks-with-gantt/) · [Taskee (HE) – software vs. Excel](https://taskee.pro/he/blog/project-management-software-vs-excel-which-tool-is-right-for-your-project/)
- [Bonim Bayit – wat is een כתב כמויות (8-10 uur handwerk)](https://bonimbayit.co.il/bill-of-quantities/)

### Aannemersregister, licenties, macro-parameters
- [gov.il – פנקס הקבלנים (register van aannemers)](https://www.gov.il/apps/moch/rasham/home) · [kablan.israel-estates.com](https://kablan.israel-estates.com) · [Bonei HaAretz – contractantenzoeken](https://my.acb.org.il/Search.aspx)
- [Globes – BSA: software piracy rate in Israel down to 41% in 2000](https://en.globes.co.il/en/article-492699) *(verouderd)*
- [BSA Global Software Survey 2018 – landendata](https://gss.bsa.org/countries/)
- [Herzog Law – btw-verhoging naar 18% per 1-1-2025](https://herzoglaw.co.il/) · [TaxAtlas – Israel VAT 18%](https://taxatlas.io/)
- [Knesset – goedkeuring btw-verhoging](https://main.knesset.gov.il)
- [ValutaFX / Wise – USD/ILS 2026](https://www.valutafx.com/)

### Hebreeuwstalige overzichts- en vergelijkingsartikelen (met voorbehoud: deels affiliate-SEO)
- [WebsitePlanet HE – 6 beste bouwprojectmanagementsoftware 2026](https://www.websiteplanet.com/he/blog/) · [WebsitePlanet HE – 10 gratis PM-tools 2026](https://www.websiteplanet.com/he/blog/)
- [Building.org.il – 10 tools die elke projectmanager moet kennen](https://www.building.org.il/articles/) · [SoftwareCompare.co.il – tools voor projectmanagement](https://softwarecompare.co.il/blog/)

---

*Rapport opgesteld op 25 juli 2026. Alle cijfers zonder bronvermelding in hoofdstuk 2.2 zijn expliciet gemarkeerde eigen schattingen. Wisselkoers gehanteerd: USD/ILS 3,04.*

---

## Verificatie

**Uitgevoerd:** 25 juli 2026 · **Methode:** adversariële fact-check — per bewering actief geprobeerd te wéérleggen met bronnen **buiten** de door het rapport aangehaalde set, plus narekening van alle rekenstappen. Waar mogelijk primaire bronnen (vendor-prijspagina's, Microsoft/monday.com zelf, Trimble-distributeur, beursdata) in plaats van de aggregators waar het oorspronkelijke rapport op leunt. Hebreeuwstalige zoekopdrachten voor de Israël-specifieke claims.

**Beperking:** de `WebSearch`-tool was ook in deze verificatiesessie uitgeput (200/200). Verificatie verliep via directe fetches en het HTML-eindpunt van DuckDuckGo. MarketLine (403), de Oracle-prijslijst-PDF en één DuckDuckGo-query (CAPTCHA) bleven ontoegankelijk; die punten staan hieronder als **onzeker**, niet als bevestigd.

### Oordeel per bewering

| # | Bewering | Oordeel | Bevinding | Bron |
|---|---|---|---|---|
| 1 | Laag 1 (pure CPM-licenties) = **$5–10 mln/jr** | **gecorrigeerd** | Ernstigste fout. Laag 1 kent **2.200–3.700 Primavera-zitplaatsen** toe terwijl stap 1 slechts **500–1.000 P6-specialisten** telt (2–7× overtelling); totaal 4.250–5.900 zitplaatsen tegen 2.000–4.000 planners. Intern consistent herrekend: **$1,7–4,1 mln**, praktisch **$2–5 mln**. | interne narekening; prijzen via [mrcoral.co.il](https://www.mrcoral.co.il/oracle-primavera) |
| 2 | **2.000–4.000** planners in Israël | **gecorrigeerd** | Componenten sommeren tot **1.600–3.200**, niet 2.000–4.000 (bovengrens +25% zonder grond). Basiscijfer 320.000 bouwmedewerkers komt van AI-aggregator worldmetrics en is verouderd; CBS/Bank of Israel geven **366.000 (Q3-2025)**. Gecorrigeerd: **1.700–3.400**. | [hakablan.co.il](https://www.hakablan.co.il/) (BoI/הלמ"ס), [nadlan.walla.co.il](https://nadlan.walla.co.il/) |
| 3 | Kalibratie "$20–41 mln" via wereldmarkt × schedulingaandeel | **gecorrigeerd** | Scope-fout. Fortune BI's $10,76 mrd is de **brede bouwsoftwaremarkt** (incl. safety, quality, field service, cost accounting, analytics) — bevestigd bij hercontrole — terwijl DataIntelo's 38,2% een aandeel *binnen bouw-PM-software* is. Vermenigvuldiging overschat de basis; de band bevestigt laag 1 niet. | [Fortune Business Insights](https://www.fortunebusinessinsights.com/construction-software-market-110155) |
| 4 | Laag 2 (diensten) = **$50–120 mln/jr** | **gecorrigeerd** | Eigen invoer (500–1.000 fte × $100–160k) geeft **$50–160 mln**; bovengrens onverklaard verlaagd. Tariefomrekening zelf correct ✓. | narekening; koers via [XE](https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=ILS) |
| 5 | Laag 3 (brede PM-SaaS) = **$70–150 mln/jr** | **gecorrigeerd** | Anker "$1,8 mrd SaaS = 65% van software-uitgaven" impliceert een softwaremarkt van $2,77 mrd, tegenover de $22,3 mrd die het rapport uit **dezelfde** Mordor-bron haalt — **factor 8 tegenspraak**. Mordor bevestigt wél $53,43/$55,01 mrd, 41,63%, CAGR 2,95%; niet de $1,8 mrd/65%. Laag 3 is ongeankerd. | [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/israel-ict-market) |
| 6 | Totaal ecosysteem **$125–280 mln/jr** | **gecorrigeerd** | Optelling klopt, maar 96–98% zit in de twee zwakst onderbouwde lagen. Herrekend **$120–315 mln** met veel bredere marge. Niet als kengetal citeren. | narekening |
| 7 | Israëlische bouwsector **$68,1 mrd** (MarketLine) vs $40,2 mrd (Next Move) | **onzeker** | MarketLine-pagina gaf 403 — niet verifieerbaar. Wél nieuwe toets: bij $26 mrd toegevoegde waarde impliceert $68 mrd een VA-ratio van 38% (normaal), $40 mrd een ratio van 65% (implausibel voor de bouw). De "middenwaarde $50 mrd" middelt twee **verschillende grootheden**. | [Trading Economics](https://tradingeconomics.com/israel/gdp-from-construction); MarketLine-pagina 403 |
| 8 | **Trimble TILOS** als levende niche + groeilaag | **gecorrigeerd (weerlegd)** | TILOS gaat per **1 maart 2026** in *End of Maintenance*; **11.1 MR4 is de laatste release**. Trimble-productpagina geeft 404. Raakt de rangorde (§3), laag 1 (§2.2) en de groeiclaim (§2.3). Tegelijk het concreetste **migratievenster** in het rapport. | [BuildingPoint (Trimble-distributeur)](https://help.buildingpoint.com.au/hc/en-au/articles/55527556493849--Important-Announcement-Tilos-Entering-End-of-Maintenance-on-1-March-2026) |
| 9 | **MS Project Plan 3 = $30/gebruiker/maand**; Plan 1 ~$10, Plan 5 ~$55 | **bevestigd** | Onafhankelijk bevestigd op Microsofts eigen (niet-Israëlische) pagina: "$30.00 user/month, paid yearly". Bevestigt dat de he-IL-prijs de wereldwijde USD-listprijs is. | [microsoft.com/en-us — Project Plan 3](https://www.microsoft.com/en-us/microsoft-365/planner/project-plan-3) |
| 10 | **Primavera Israëlische prijzen** (Coral: $2.570/jr, $550 onderhoud, EPPM v.a. $1.320/jr) | **bevestigd** | Letterlijk teruggevonden in het Hebreeuws: *"עלות הרישיון השנתי היא כ- 2,570 דולר למשתמש"* en *"מתחילה מ- 1,320 דולר למשתמש"*. Blijft het sterkste prijsdatapunt. | [mrcoral.co.il/oracle-primavera](https://www.mrcoral.co.il/oracle-primavera) |
| 11 | Israëlische P6-prijzen liggen **in de 30–50%-kortingsband** | **gecorrigeerd** | Appels-en-peren: een **jaarlicentie** ($2.570) wordt vergeleken met een **perpetuele** licentie ($3.520). 3-jaars-TCO: perpetueel $5.632 vs Israëlisch abonnement $9.360 — ruim **1,6× duurder**, niet goedkoper. Kortingspercentage = onbekend. (Oracle-prijslijst-PDF niet toegankelijk; hercontrole liep op CAPTCHA.) | narekening op de door het rapport zelf aangedragen referenties |
| 12 | **monday.com**: Basic $9 / Standard $12 / Pro $19 (jaarlijks); FY2025 $1,23 mrd, +27% | **bevestigd** | Prijzen exact bevestigd op monday.com zelf. Financials: omzet **$1.232 mln**, groei **26,75%**, nettowinst **$118,74 mln** ✓. | [monday.com/pricing](https://monday.com/pricing), [stockanalysis.com/stocks/mndy](https://stockanalysis.com/stocks/mndy/financials/) |
| 13 | monday.com: min. 3 zitplaatsen; maandprijzen $12/$14/$24; Pro verhoogd van $16 in feb. 2026 | **onzeker** | Geen 3-zitplaatsenminimum op de pagina (voorbeelden staan op 10). Pagina noemt **18% jaarkorting**, wat maandprijzen ~$11/$14,60/$23,20 impliceert — $12/$14/$24 niet bevestigd. Prijsverhogingsdata nergens onafhankelijk terug te vinden. | [monday.com/pricing](https://monday.com/pricing) |
| 14 | **HCP-Go = ₪129/maand incl. btw**, proefmaand, jaarabonnement | **bevestigd** | Letterlijk: *"HCP-Go במסלול ה- Professional עולה 129 ש"ח לחודש כולל מע"מ."* Ook 12 termijnen óf eenmalige betaling met korting, en gratis proefmaand zonder creditcard ✓. | [hcp.co.il/hcp-go](https://www.hcp.co.il/hcp-go/) |
| 15 | Prijsanker: "₪129 (~$42) tegenover $2.570/jaar" | **gecorrigeerd** | Maandprijs tegen jaarprijs gezet → kloof 5× overdreven. Jaarbasis: $507 vs $3.120 (incl. onderhoud) ≈ **1 : 6**. HCP-Go is bovendien een add-on: reële lokale instap ≈ **$870/jr** inclusief MS Project. | narekening |
| 16 | **HCP-specificatie**: MS Project default, SF verboden, negatieve lag verboden, activiteit ≤ 1 maand, WBS 1–4, 20% buffer met `resterende duur ÷ 6` | **bevestigd** | Alle zes regels letterlijk teruggevonden, inclusief het "Y/6"-afbouwmechanisme en WBS 1–2 voor het skeletschema. Dit hoofdstuk (§4.3) is het best onderbouwde deel van het rapport. | [hcp.co.il hoofdstuk 2](https://www.hcp.co.il/project-time-management-specification-chapter2/) |
| 17 | **"MS Project is contractueel verplicht"** / "leverformaat is MPP, niet XER" | **onzeker (overtrokken)** | De HCP-spec stelt als **primaire** regel de *opdrachtgeversdiscretie*: MS Project is de **fallback** "אם לא נקבע אחרת בחוזה". Dat is zwakker dan "verplicht". De tweede pijler — het Trans-Israel-citaat (MS Project 2013+) — hangt aan een **mapverwijzing, geen document**, en is niet terug te vinden. Richting waarschijnlijk juist, hardheid niet bewezen. Gericht gezocht naar Israëlische tenders die juist Primavera eisen: geen gevonden. | [hcp.co.il hoofdstuk 2](https://www.hcp.co.il/project-time-management-specification-chapter2/); Trans-Israel-URL onverifieerbaar |
| 18 | **Geen sancties/leveringsbeperkingen** die planningssoftware in Israël raken | **gecorrigeerd (genuanceerd)** | Enge claim blijft staan. Maar: Microsoft schakelde op **25-9-2025** Azure-diensten uit voor Unit 8200; Israël voert in Q1-2026 een **Dual-Use Export Control Bill** in die software omvat; er is gedocumenteerde boycotdruk op Microsoft/Google/Amazon. Relevant leveranciersrisico bij een markt die op één Amerikaanse leverancier standaardiseert. | [Microsoft](https://blogs.microsoft.com/on-the-issues/2025/09/25/update-on-ongoing-microsoft-review/), [The Guardian](https://www.theguardian.com/world/2025/sep/25/microsoft-blocks-israels-use-of-its-technology), [BBC](https://www.bbc.com/news/articles/cvgjx0zve2no), [globaladvisoryexperts.com](https://globaladvisoryexperts.com/sanctions-compliance-israel-2026/) |
| 19 | **23.978 ingeschreven aannemers** | **gecorrigeerd** | Verwart aannemers met bevoegdheden: **~17.745 aannemers** met **24.223 registratie-bevoegdheden**. De adresseerbare basis is ca. 35% kleiner dan gesteld. | [govil.ai — dataset רשם הקבלנים](https://govil.ai/), [gov.il פנקס הקבלנים](https://www.gov.il/apps/moch/rasham/home) |
| 20 | **USD/ILS 3,04–3,08; jaargemiddelde 3,0358; shekel −4,4% YTD** | **gecorrigeerd** | Spotkoers bevestigd: **3,055** (25-7-2026). Maar het "jaargemiddelde 3,0358" is **rekenkundig onmogelijk** naast het eigen pad 3,19 → 3,05 (een jan–jul-gemiddelde kan niet ónder het julipeil liggen; het zou ~3,10–3,12 zijn). Startkoers 3,19 onbevestigd; Trading Economics wijst op +9,06% over 12 maanden en niveaus 2,80–2,88 in mei–juni 2026. Bovendien: metro ($50 mrd) en oorlogsverlies ($26 mrd) zijn omgerekend tegen ~3,6–3,8 terwijl 3,04 als werkkoers is verklaard. | [XE](https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=ILS), [Trading Economics](https://tradingeconomics.com/israel/currency) |
| 21 | **Btw 18% sinds 1-1-2025** | **bevestigd** | Onafhankelijk bevestigd: "The 2025 current rate of VAT is 18%." (Ingangsdatum 1-1-2025 niet expliciet in deze bron, maar het tarief staat vast.) | [PwC Tax Summaries — Israel](https://taxsummaries.pwc.com/israel/corporate/other-taxes) |
| 22 | **Tel Aviv Metro ILS 180 mrd / $50 mrd** | **onzeker** | Fase A **ILS 65 mrd** onafhankelijk bevestigd (~78 km tunnel, 59 stations, NTA nov. 2025). Het **totaal** is omstreden: bronnen noemen zowel ILS 180 mrd als **ILS ~300 mrd** afhankelijk van scope/prijspeil. De $50 mrd-conversie hoort bij koers 3,6. | [NTA](https://www.nta.co.il/metro/), [ice.co.il](https://www.ice.co.il/realestate/news/article/1090422) |

### Samenvattend oordeel

**22 beweringen gecontroleerd: 6 bevestigd, 12 gecorrigeerd, 4 onzeker.**

Het rapport is **sterk waar het primaire Israëlische bronnen citeert** en **zwak waar het rekent**. Alle vier de letterlijk narekenbare prijsclaims (MS Project, Primavera/Coral, HCP-Go, monday.com) en de volledige HCP-specificatie (§4.3) houden stand bij onafhankelijke controle — dat is het waardevolle deel en het mag zo worden gebruikt. Hoofdstuk 2.2 daarentegen bevat **vier zelfstandige rekenfouten of interne tegenspraken** (zitplaatsen vs. planners, sommatie van de plannerscomponenten, scope-fout in de kalibratie, factor-8-tegenspraak in het SaaS-anker), waardoor de kernschatting van laag 1 ruwweg een factor 2 te hoog uitkomt en het totaal van $125–280 mln geen bruikbaar kengetal is.

**Twee bevindingen veranderen de conclusies inhoudelijk:**
1. **TILOS is uitgefaseerd (EOL 1-3-2026).** Het rapport behandelt het als groeiproduct. Dit is tegelijk de meest bruikbare vondst: een EOL-product met verankerde gebruikers in lineaire infra, precies terwijl Israël ILS 65 mrd aan metro-fase-A aanbesteedt, is een concreet migratievenster.
2. **De Israëlische P6-prijzen zijn geen korting maar een abonnement.** Over drie jaar is de Israëlische constructie ~2× duurder dan de internationale perpetuele referentie — wat het argument vóór een goedkoop alternatief juist versterkt, maar op een andere grond dan het rapport aanvoert.

**Wat de lezer níet moet overnemen:** het totaal van $125–280 mln, de laag-1-schatting van $5–10 mln, de 30–50%-kortingsband, het jaargemiddelde 3,0358, het aantal van 23.978 aannemers, en de stelligheid waarmee MPP als marktbreed verplicht leverformaat wordt gepresenteerd.
