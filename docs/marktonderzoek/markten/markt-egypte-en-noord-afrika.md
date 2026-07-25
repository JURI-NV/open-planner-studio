# Marktonderzoek: projectplanning- en schedulingsoftware in Egypte en Noord-Afrika

**Regio:** Egypte, Marokko, Algerije, Tunesië, Libië
**Peildatum onderzoek:** 25 juli 2026
**Wisselkoersen gebruikt:** USD/EGP 51,34 ([Xe, 25-07-2026, 13:25 UTC](https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=EGP)) — bevestigd door [Wise](https://wise.com/gb/currency-converter/usd-to-egp-rate) op 51,35. MAD/USD ≈ 9,79 (afgeleid uit [BusinessWire](https://www.businesswire.com/news/home/20250922298977/en/): "MAD6.1 billion ($623 million)"). TND/USD ≈ 2,95 `[SCHATTING — niet apart geverifieerd]`.

---

## 0. Methodologische verantwoording en betrouwbaarheid

**Belangrijke beperking, expliciet vermeld:** het WebSearch-budget van deze sessie was al volledig verbruikt (200/200) voordat dit onderzoek startte. Al het onderzoek is daarom uitgevoerd met **WebFetch**: deels als directe fetch op bronpagina's, deels via zoekmachine-resultaatpagina's (DuckDuckGo lite/html) die als zoekproxy zijn opgehaald. Er zijn ruim 60 WebFetch-aanroepen gedaan, waarvan circa 25 zoekopdrachten — inclusief **zes Arabischtalige** en **vier Franstalige** zoekopdrachten, conform de opdracht. Een deel van de zoekopdrachten liep tegen CAPTCHA's of rate-limits aan (DuckDuckGo, Brave, Ecosia, Mojeek, Startpage, searx); die zijn waar mogelijk herhaald of via directe bronfetches vervangen.

**Gevolg voor de kwaliteit:** de cijfers over bouwmarkten, softwarelijstprijzen, trainingsprijzen en piraterij zijn met bron-URL onderbouwd. De cijfers over **aantallen planners, aantallen betaalde licenties en de marktomvang van planningsoftware specifiek** bestaan niet als gepubliceerde statistiek — voor die getallen is een expliciete redeneerketen opgesteld en zijn ze gemarkeerd met `[SCHATTING]`. Neem die niet over als feit.

**Betrouwbaarheidsniveaus in dit rapport:**

| Label | Betekenis |
|---|---|
| `[BRON]` | Direct uit een geciteerde bron, URL vermeld |
| `[AFGELEID]` | Rekenkundig afgeleid uit geciteerde bronnen |
| `[SCHATTING]` | Eigen schatting met expliciete redenering; geen bron |
| `[ZWAK]` | Bron bestaat maar is van lage kwaliteit (aggregator, vendor-blog, forum) |

---

## 1. Managementsamenvatting

1. **Oracle Primavera P6 is onbetwist marktleider** in de zware bouw- en infrastructuursegmenten van Egypte en, in mindere mate, de rest van Noord-Afrika. De reden is niet technische superioriteit maar **contractuele dwang uit de Golfstaten**: P6 wordt "named directly in most GCC public-sector and EPC tender documents" en het aanleveren van MS Project-bestanden bij opdrachtgevers als ADNOC of Saudi Aramco kan een inschrijving diskwalificeren ([Gulf Certifications](https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction)). Egyptische aannemers en planners werken structureel voor of naast Golf-opdrachtgevers en nemen die standaard mee terug.

2. **Excel is in volume de feitelijke nummer één.** Voor de meerderheid van de middelgrote en kleine aannemers in alle vijf landen is het planningsinstrument een spreadsheet. Zelfs Arabischtalige planningopleidingen adverteren expliciet met "Primavera **and Excel**" als het gereedschapspaar ([Planning Engineer, Arabische basiscursus](https://planningengineer.net/courses/planning-basics-course-arabic/)).

3. **De prijs-inkomensverhouding is extreem, en dat verklaart het gedrag van de markt.** Een perpetual Primavera P6 Professional-licentie staat bij een regionale Oracle-wederverkoper op **$3.880** ([AKIM Engineering prijslijst](https://www.akimeng.com/oracle-primavera-price-list.html)) — omgerekend **~EGP 199.200**. Het gemiddelde jaarsalaris van een Egyptische planning engineer is **EGP 151.191** ([PayScale, 2026](https://www.payscale.com/research/EG/Job=Planning_Engineer/Salary)). **Eén licentie kost dus ongeveer 1,3 keer het jaarsalaris van de ingenieur die hem gebruikt.** `[AFGELEID]` In West-Europa is die verhouding ongeveer 1:15 tot 1:20. Dit is de kernverklaring voor de omvang van informele en gekraakte licenties.

4. **Informele licenties zijn geen randverschijnsel maar infrastructuur.** Een Arabischtalige zoekopdracht naar Primavera P6-downloads levert vrijwel uitsluitend ongeautoriseerde distributiekanalen op: YouTube-installatiehandleidingen, LinkedIn-posts met directe downloadlinks, Facebook-groepen, Telegram-kanalen (@sixthdimeng), het Arab Engineering Forum en downloadportalen — voor versies R17.7, V23.1, 24.12 en V25.12. BSA schatte het Egyptische piraterijpercentage op **59%** (2017-cijfer, laatste publicatie) ([EgyptToday](https://www.egypttoday.com/Article/3/57869/BSA-Egypt-sees-software-piracy-drop-by-2)); voor Marokko op **64%** ([U.S. Chamber IP Index 2025](https://www.uschamber.com/assets/documents/maps/Ipindex_25/Morocco_IPIndex-2025.pdf)).

5. **De echte commerciële markt zit in opleiding, niet in licenties.** De opleidingsmarkt is dieper, breder en beter betaalbaar dan de licentiemarkt: tientallen aanbieders in Caïro alleen al, met prijzen van EGP 1.500 (~$29) voor een 20-uurs cursus tot EGP 163.458 (~$3.184) voor een corporate 5-daagse.

6. **Marktomvang planning-/schedulingsoftware Noord-Afrika (licenties/abonnementen): ~$11–16 miljoen per jaar, centrale schatting ~$13 miljoen (2026).** Inclusief training, implementatie en consultancy: **~$25–40 miljoen per jaar.** `[SCHATTING — redenering in hoofdstuk 5]` Egypte is daarvan ongeveer de helft.

7. **Aantal planners in de regio: 19.000–31.000** `[SCHATTING]`, waarvan 12.000–20.000 in Egypte. Daarbovenop werken naar schatting **20.000–40.000 Egyptische en Noord-Afrikaanse planners in de Golfstaten** `[SCHATTING]` — die groep is voor softwareleveranciers commercieel interessanter dan de thuismarkt, want daar wordt in AED/SAR betaald.

8. **Lokale pakketten zijn nauwelijks planningsoftware.** Wat lokaal bestaat is ofwel bouw-ERP met een planningsmodule (Egypte: BabelERP, Hunt ERP, Bright ERP, Nodhom, Pioneers, Salis, Buildo, Microsystems, SkySoft), ofwel lichte werfplanning-SaaS (Marokko: MarocBTP, GestionBTP.ma, Odoo-BTP-pakketten). De enige serieuze regionale uitdager van P6 is **Opteam** (Dubai, opgericht 2020, AI-gedreven, pre-seed/seed-gefinancierd) — geen Noord-Afrikaans product, maar wel Arabischtalig en expliciet gepositioneerd als "بديل بريمافيرا" (Primavera-alternatief).

---

## 2. De onderliggende bouwmarkt per land

Softwarevraag volgt bouwvolume. Hieronder de macrocijfers, met de spreiding tussen bronnen expliciet gemaakt — die spreiding is groot en dat is zelf een bevinding.

### 2.1 Egypte

| Cijfer | Waarde | Jaar | Bron |
|---|---|---|---|
| Bouwsector, toegevoegde waarde | **EGP 1,8 biljoen** (~$35,1 mrd `[AFGELEID]`) | FY2024/25 | [Arab Finance](https://arabfinance.com/en/news/newdetails/egypt-construction-sector-key-driver-of-growth-and-investment) |
| Aandeel in BBP | **10,3%** | FY2024/25 | [Arab Finance](https://arabfinance.com/en/news/newdetails/egypt-construction-sector-key-driver-of-growth-and-investment) |
| Sectorgroei | 4,1% (FY24/25); doel 4,3%; prognose 5,6% (FY26/27) en 6,6% (FY27/28) | | [Arab Finance](https://arabfinance.com/en/news/newdetails/egypt-construction-sector-key-driver-of-growth-and-investment) |
| Aandeel in totale werkgelegenheid | **10,65%** (mannen 13,3%, vrouwen 0,42%) | 2025 | [Arab Finance](https://arabfinance.com/en/news/newdetails/egypt-construction-sector-key-driver-of-growth-and-investment) |
| Gemiddeld dagloon bouw | **EGP 267** (~$5,20 `[AFGELEID]`) | eind 2025 | [Arab Finance](https://arabfinance.com/en/news/newdetails/egypt-construction-sector-key-driver-of-growth-and-investment) |
| Publieke investeringen in de sector | EGP 38,8 mrd (+82% j-o-j) | FY2024/25 | [Arab Finance](https://arabfinance.com/en/news/newdetails/egypt-construction-sector-key-driver-of-growth-and-investment) |
| Buitenlandse directe investeringen in de sector | $979 mln (4,1% van totale instroom) | FY2024/25 | [Arab Finance](https://arabfinance.com/en/news/newdetails/egypt-construction-sector-key-driver-of-growth-and-investment) |

**Marktomvang bouwsector volgens commerciële rapporten — de spreiding is enorm:**

| Bron | 2024/2025 | Prognose | Bron-URL |
|---|---|---|---|
| Mordor Intelligence | **$48,67 mrd** (2025) | $70,27 mrd (2031), CAGR 6,31% | [mordorintelligence.com](https://www.mordorintelligence.com/industry-reports/egypt-construction-market) |
| NextMSC | **$59,55 mrd** (2025) | $107,07 mrd (2035), CAGR 5,95% | [nextmsc.com](https://www.nextmsc.com/report/egypt-construction-market-cm4742) |
| MarketLine | **$69,8 mrd** (2024), CAGR 8,6% | | [marketresearch.com](https://www.marketresearch.com/MarketLine-v3883/Construction-Egypt-41634737/) |
| BlueWeave | $74,42 mrd (2024) | $139,13 mrd (2031), CAGR 9,35% | via zoekresultaat blueweaveconsulting.com |
| Verified Market Research | $65,6 mrd (2024) | $146,04 mrd (2032), CAGR 10,5% | via zoekresultaat verifiedmarketresearch.com |
| IMARC | $29,3 mrd (2025) | | via zoekresultaat europesays.com |

**Interpretatie:** de spanwijdte $29 mrd – $74 mrd voor hetzelfde jaar laat zien dat deze rapporten grotendeels niet-vergelijkbare definities hanteren (output vs. toegevoegde waarde vs. contractwaarde) en dat sommige nog met pre-devaluatie-wisselkoersen rekenen. **Gebruik geen van deze getallen zonder de definitie.** De CAPMAS-gebaseerde EGP 1,8 biljoen toegevoegde waarde (~$35 mrd) is het betrouwbaarste anker.

**Segmentatie (Mordor, 2025)** ([bron](https://www.mordorintelligence.com/industry-reports/egypt-construction-market)):
- Residentieel 45% van de activiteit; infrastructuur groeit het snelst (9,2% CAGR)
- Nieuwbouw 92% van het volume
- **Publieke sector 72% van de markt** — cruciaal voor softwarevraag: de overheid is de facto de norm­stellende opdrachtgever
- Groot-Caïro 48% van de activiteit
- Conventionele bouw ter plaatse 90%

**Grootste spelers** ([Mordor](https://www.mordorintelligence.com/industry-reports/egypt-construction-market), [NextMSC](https://www.nextmsc.com/report/egypt-construction-market-cm4742)): The Arab Contractors (El Mokawloon), Orascom Construction PLC, Hassan Allam Holding, Elsewedy Electric, Petrojet, Enppi, China State Construction Engineering Corp (CSCEC), Consolidated Contractors Company (CCC), Siemens Mobility.

**Megaprojecten:**
- Hogesnelheidslijn ("Suez Canal on rails"): **$4,5 mrd contract** met Siemens-consortium, aandeel Siemens Mobility ~$3 mrd ([RailwayPro](https://www.railwaypro.com/wp/usd-4-5-billion-contract-signed-for-suez-canal-on-tracks/), [Times of Israel](https://www.timesofisrael.com/workers-begin-laying-tracks-for-egypts-high-speed-rail-megaproject/)); totale programmawaarde wordt elders op **$23 mrd** gesteld `[ZWAK — unthinkablebuild.com]`
- New Administrative Capital en Suez-corridor: geen enkelvoudige contractwaarde publiek beschikbaar in dit onderzoek

### 2.2 Marokko

| Cijfer | Waarde | Jaar | Bron |
|---|---|---|---|
| Bouwmarkt | **MAD 97,39 mrd** (~$9,95 mrd `[AFGELEID]`) | 2025 | [BusinessWire/ResearchAndMarkets](https://www.businesswire.com/news/home/20250512137600/en/Morocco-Construction-Industry-Report-2025-A-MAD-112.33-Billion-Market-by-2029-with-2.8-CAGR-Forecast-During-2025-2029---ResearchAndMarkets.com) |
| Prognose | MAD 112,33 mrd (2029), CAGR 2,8% | | idem |
| Historische groei | CAGR 6,5% (2020-2024) | | idem |
| Reële outputgroei | **4,5%** (2025); 3,9% gemiddeld 2026-2029 | | [BusinessWire](https://www.businesswire.com/news/home/20250922298977/en/) |
| Toegevoegde waarde bouw Q1 2025 | +6,3% j-o-j | 2025 | [BusinessWire](https://www.businesswire.com/news/home/20250922298977/en/) |
| Aandeel bouw in BBP | **6,5%** | 2025 | [Oasis Technocloud](https://oasistechnocloud.com/blog/logiciel-gestion-chantier-btp-maroc/) `[ZWAK — vendor-blog]` |

**WK 2030 / AFCON 2025-investeringsprogramma:**
- Totaal goedgekeurd: **MAD 380 mrd (~$41 mrd)** voor luchthavens en overige infrastructuur ([AGBI, okt 2025](https://www.agbi.com/infrastructure/2025/10/))
- Stadions: 9 stuks, tot 115.000 zitplaatsen, **MAD 20 mrd** tot 2028 ([7news.ma](https://en.7news.ma/moroccos-construction-boom-mega-projects-reshaping-the-industry/))
- Spoor: **$9,6 mrd** modernisering tot 2030 — HSL Kenitra-Marrakech $5,3 mrd, treinaankoop $2,9 mrd, stations $1,4 mrd ([ITA/trade.gov](https://www.trade.gov/country-commercial-guides/morocco-infrastructure)); ONCF-investering ~MAD 87 mrd ([7news.ma](https://en.7news.ma/moroccos-construction-boom-mega-projects-reshaping-the-industry/))
- Havens: **$7,5 mrd** voor 27 havens; Nador West Med $1,5 mrd; Dakhla Atlantique $1,7 mrd ([ITA](https://www.trade.gov/country-commercial-guides/morocco-infrastructure))
- Luchthavens: **~$2,8 mrd**, doel 80 mln passagiers in 2030; nieuwe terminal Casablanca MAD 15,7 mrd ($1,6 mrd) ([ITA](https://www.trade.gov/country-commercial-guides/morocco-infrastructure), [BusinessWire](https://www.businesswire.com/news/home/20250922298977/en/))
- Wegen: **$1,3 mrd** snelwegprojecten 2025-2032; MAD 4,1 mrd voor 2025; doel 3.000 km snelweg in 2030 ([ITA](https://www.trade.gov/country-commercial-guides/morocco-infrastructure), [7news.ma](https://en.7news.ma/moroccos-construction-boom-mega-projects-reshaping-the-industry/))
- Werkgelegenheidseffect: **250.000 tijdelijke bouwbanen**, 100.000 permanente banen ([7news.ma](https://en.7news.ma/moroccos-construction-boom-mega-projects-reshaping-the-industry/))
- Infrastructuurgat tot 2040: **$37 mrd** (Global Infrastructure Hub, via [ITA](https://www.trade.gov/country-commercial-guides/morocco-infrastructure))

**Relevante beleidsprikkel voor softwareverkoop:** het Marokkaanse **MOWAKABA**-subsidieprogramma kan tot **90% van digitaliseringsprojecten** financieren ([Oasis Technocloud](https://oasistechnocloud.com/blog/logiciel-gestion-chantier-btp-maroc/)) `[ZWAK — vendor-blog, niet geverifieerd bij de Marokkaanse overheid]`. Als dit klopt is Marokko de enige markt in de regio met een structureel subsidiekanaal voor bouwsoftware.

### 2.3 Algerije

- Reële groei bouwsector: **4,1% in 2025** ([BusinessWire/GlobalData](https://www.businesswire.com/), bevestigd door meerdere heruitgaven: finance.yahoo.com, financialcontent.com, tecnaexpo.com)
- Drijvers: transportinfrastructuur, huisvesting, industrie
- Huisvestingsprogramma: **235.000 nieuwe woningen** in de begrotingswet 2025 ([dzair-tube.dz](https://dzair-tube.dz/))
- **Absolute marktomvang in USD of DZD is in dit onderzoek niet in een openbare bron gevonden.** `[LEEMTE]` Algerije publiceert bouwoutput niet in een vorm die de gangbare rapportenmakers overnemen.

### 2.4 Tunesië

- Groeiprognose 2025: bronnen spreken elkaar tegen — **1,2%** ([Yahoo Finance/ResearchAndMarkets](https://uk.finance.yahoo.com/news/tunisia-construction-industry-report-2025-104700577.html)) versus **4,6%** ([Yahoo Finance, ander rapport](https://finance.yahoo.com/news/tunisia-construction-industry-report-2025-152400145.html)); 3,1-3,2% voor 2026
- Buitenlandse investeringen 2024: **TND 2,9 mrd** ([Yahoo Finance](https://uk.finance.yahoo.com/news/tunisia-construction-industry-report-2025-104700577.html))
- Zonneparkprojecten: TND 1,3 mrd (**$386,3 mln**), operationeel verwacht 2027 ([Chronicle Journal/markets](https://markets.chroniclejournal.com/))
- **Absolute marktomvang niet gevonden.** `[LEEMTE]`

### 2.5 Libië

- Wederopbouwmarkt Libië + Irak samen: **tot $400 mrd** tot eind 2025 ([Libya Review](https://libyareview.com/54118/egypt-expands-presence-in-libyas-400-billion-reconstruction-market/)) — dit is een gecombineerd en zeer optimistisch cijfer, behandel met scepsis `[ZWAK]`
- **Egyptische aannemers zijn de dominante buitenlandse partij:** coalitie van **41 Egyptische bedrijven**; 12 grote Egyptische firma's in gesprek met Europese partners; vier grote Egyptische bedrijven al betrokken bij projecten van **meer dan $4 mrd** ([Libya Review](https://libyareview.com/54118/egypt-expands-presence-in-libyas-400-billion-reconstruction-market/))
- Great Man-Made River-project: **$25 mrd** ([Construction Review Online](https://constructionreviewonline.com/region/libya/))

**Consequentie voor softwarekeuze in Libië:** de planningsoftwarestandaard in Libië wordt niet in Libië bepaald maar geïmporteerd door Egyptische, Turkse, Italiaanse, Franse en Chinese aannemers. In de praktijk betekent dat P6 (Egyptisch/Golf-model) of MS Project (Europees/Turks model).

---

## 3. Welke software wordt daadwerkelijk gebruikt — rangorde

De volgende rangorde is opgesteld op basis van: het aantal trainingsaanbieders per product per land (de sterkste beschikbare proxy voor installed base), het aantal vacatures dat het product noemt, de aanwezigheid van resellers, en de aanwezigheid van informele distributiekanalen. Er bestaat **geen gepubliceerd marktaandeelonderzoek** voor deze regio. `[LEEMTE — de rangorde zelf is dus een beredeneerde inschatting]`

### Rang 1 — Microsoft Excel (feitelijk, niet formeel)

**Wie:** vrijwel elke kleine en middelgrote aannemer in alle vijf landen; onderaannemers op alle projectniveaus; kostenbewaking bij vrijwel iedereen, ook waar P6 formeel wordt gebruikt.

**Evidentie:** Arabischtalige planningopleidingen adverteren expliciet met de combinatie: "comprehensive practical course using **Primavera and Excel** for construction projects" ([Planning Engineer](https://planningengineer.net/courses/planning-basics-course-arabic/)). Een Arabische zoekopdracht naar "برنامج جدول زمني للمشروع" (projectplanningsprogramma) levert als top-resultaten grotendeels **Excel-templates** op (ClickUp Arabic templates, Albanknote "25+ ready-made timeline templates in Excel, Word, PDF", Musely timeline generator).

**Waarom Excel wint:** nul marginale kosten, al aanwezig, Arabisch/RTL werkt, geen training nodig, iedereen kan het bestand openen, en — cruciaal — **het is wat de opdrachtgever accepteert bij projecten onder de aanbestedingsdrempel**.

### Rang 2 — Oracle Primavera P6 (Professional / EPPM / Cloud)

**Wie:**
- Alle grote Egyptische aannemers: Arab Contractors, Orascom Construction, Hassan Allam, Elsewedy, Petrojet, Enppi
- Olie & gas en petrochemie (EPC-standaard)
- Project management consultants en engineering consultants
- Overheids- en aan het leger gelieerde opdrachtgevers bij megaprojecten
- Buitenlandse aannemers actief in de regio (CSCEC, CCC, Siemens Mobility)
- **Elke Egyptische planner die naar de Golf wil** — dit is de belangrijkste vraagbron

**Evidentie voor dominantie:**
- **Contractuele verplichting in de Golf:** "Primavera P6 is named directly in most GCC public-sector and EPC tender documents"; MS Project-bestanden bij ADNOC of Saudi Aramco kunnen een inschrijving vóór evaluatie elimineren; "No P6, no payment certificate" ([Gulf Certifications](https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction)) `[ZWAK — vendor/opleider-blog, maar consistent met alle andere signalen]`
- **Vacaturevolume:** 344 P6-vacatures in de Golf ([NaukriGulf](https://www.naukrigulf.com/primavera-p6-jobs)), 160 in de VAE, 253 in Dubai ([Jooble](https://ae.jooble.org/jobs-primavera-p6/Dubai)), 196 in Saudi-Arabië ([Jooble](https://sa.jooble.org/jobs-primavera-p6/Saudi-Arabia)), 340+ via [Bayt](https://www.bayt.com/en/international/jobs/primavera-p6-jobs/); 40+ Primavera-vacatures in Egypte zelf ([Bayt Egypte, Arabisch](https://www.bayt.com/ar/egypt/jobs/primavera-jobs/))
- **Trainingsaanbod:** in Egypte alleen al minstens 15 identificeerbare aanbieders (zie hoofdstuk 6); in Algerije UPMS, ADEX Training Center, Business Leads Algeria, AGA Academy; in Tunesië FormationTunisie, Expert Team, Tunipages Academy, TMR Partners; in Marokko New Learning, TMR Partners
- **Resellers:** vier geïdentificeerde partijen in Egypte alleen (hoofdstuk 7)
- **Informele distributie:** de omvang van het gekraakte kanaal (hoofdstuk 8) is zelf een indicator van installed base

**Belangrijk onderscheid:** P6 **Professional** (desktop, perpetual) domineert; P6 **EPPM** en **Primavera Cloud** zijn zeldzaam buiten de allergrootste organisaties en internationale opdrachtgevers, omdat de prijs per gebruiker per jaar in cloudvorm structureel onbetaalbaar is (zie hoofdstuk 4).

### Rang 3 — Microsoft Project

**Wie:**
- Marokko, Algerije en Tunesië: **sterker dan in Egypte**, mede door de Franstalige opleidingstraditie en de Europese (Franse/Spaanse) aannemerspresentie
- In heel de regio: opdrachtgevers, ontwikkelaars, kleinere consultants, IT-/telecom-/energieprojecten
- Bouwbedrijven die niet in het Golf-EPC-circuit zitten

**Evidentie:**
- In Algerije en Marokko biedt vrijwel elke opleider **MS Project én Primavera** aan, vaak met MS Project eerst genoemd en goedkoper: [Business Leads Algeria](https://blalgeria.com/training/details/gerer-ses-projets-avec-ms-project), [ADEX](https://adextraining.dz/), [AGA Academy](https://aga-dz.com/produit/formation-logiciel-ms-project/), [Ouedkniss](https://www.ouedkniss.com/), [ITAB Academy](https://itab.ma/) (Rabat/Casablanca), [OFPPT](https://www.ofppt.ma/) (het Marokkaanse staatsopleidingsinstituut — veelzeggend: de staat leidt op in MS Project, niet in P6), MindTech Maroc, Afrique Academy, ODC Plus, CIF-Pro
- In Tunesië is MS Project **structureel goedkoper** dan Primavera: 450 DT vs. 550 DT voor dezelfde 20 uur ([FormationTunisie](https://www.formationtunisie.com/formations/pack-management-chef-de-projet-primavera-p6-pmp-ms-project/))

**Nuance:** het feit dat OFPPT — de Marokkaanse publieke beroepsopleider — "Gestion de projet sous MS Project" aanbiedt, betekent dat MS Project in Marokko de *default* is voor de brede beroepsbevolking, terwijl P6 het specialistenproduct is voor grote infrastructuur.

### Rang 4 — Bouw-ERP met planningsmodule (lokaal/regionaal)

**Wie:** middelgrote Egyptische aannemers die één systeem willen voor kostprijs, facturatie, inhoudingen en voortgang.

**Producten (Egypte, alle Arabischtalig):** BabelERP ([babelsoftco.com](https://babelsoftco.com)), Buildo ([buildo.solutions](https://buildo.solutions)), Bright ERP ([erpbright.com.eg](https://erpbright.com.eg/arabic/contracting.php)), Hunt ERP ([hunt-eg.com](https://hunt-eg.com/ar/blog/contracting-construction-erp-egypt)), Salis ERP ([saliserp.com](https://saliserp.com/contracting-management/)), Nodhom ([nodhom.com](https://nodhom.com/ar/ar-contracting/)), Pioneers ERP ([pioneers-solutions.com](https://pioneers-solutions.com/blog-erp-contracting-companies)), BySmart ([bysmart-soft.com](https://bysmart-soft.com)), Microsystems ([microsystems-eg.com](https://microsystems-eg.com/AR/Construction-and-contracting.html)), SkySoft ([skysft.com](https://skysft.com)).

**Kenmerkend:** deze pakketten doen *kostenbeheersing en administratie*, niet *CPM-planning*. Ze concurreren met Excel en met de boekhouder, niet met P6. Hun verkoopargument is expliciet Egyptisch: BySmart adverteert met "het exact berekenen van de inhouding op de aanneemsom op facturen" — een Egyptisch-specifieke contractpraktijk.

### Rang 5 — Algemene SaaS-projecttools

**Producten en aanwezigheid:**
- **monday.com** — Arabische interface beschikbaar, actieve MENA-marketing; prijs $9-19/seat/maand ([monday.com/pricing](https://monday.com/pricing))
- **Smartsheet** — aanwezig, vooral bij multinationals; Pro-plan $129 en Business $241 per gebruiker (jaarbedrag zoals getoond op de prijspagina) ([smartsheet.com/pricing](https://www.smartsheet.com/pricing)) `[LET OP — de weergegeven bedragen zijn vermoedelijk jaarprijzen per gebruiker; de pagina toonde geen expliciete periode]`
- **ClickUp** — heeft een volledige **Arabische blog en Arabische templates** ([clickup.com/ar](https://clickup.com/ar/blog/76302/project-timeline-software)); dit is het enige westerse algemene pakket met serieuze Arabische contentmarketing
- **Zoho, Wrike** — aanwezig via reseller/online, geen specifiek bewijs van bouwadoptie gevonden in dit onderzoek `[LEEMTE]`
- **Odoo (BTP-pakketten)** — in Marokko actief gecommercialiseerd door lokale integrators (zie hoofdstuk 4)

**Positie:** deze tools winnen bij **niet-bouw** projectwerk (IT, marketing, vastgoedontwikkeling, facility) en bij bouwbedrijven voor *taakcoördinatie*, maar verliezen op het moment dat een opdrachtgever een CPM-netwerk met total float en een baseline eist.

### Rang 6 — Overige gespecialiseerde bouwplanningspakketten

| Product | Leverancier | Aanwezigheid in Noord-Afrika |
|---|---|---|
| **Asta Powerproject** | Elecosoft | **Zeer beperkt.** Geen Midden-Oosten- of Noord-Afrikaanse distributeur gevonden; Elecosoft meldt alleen "International customers outside the UK are supported by selected international distribution partners" ([diripro.com](https://diripro.com/en/elecosoft-en/)). Asta is een Brits/Scandinavisch product; het Egyptische en Golf-circuit is P6-gedomineerd. `[LEEMTE — meerdere zoekpogingen liepen vast op CAPTCHA; conclusie op basis van afwezigheid van bewijs]` |
| **TILOS** (lijn-/wegplanning) | Trimble | Geen aanwezigheid gevonden. Relevantie zou hoog moeten zijn (Egyptische HSL, Marokkaanse HSL, snelwegen) maar er is geen reseller- of trainingsspoor. `[LEEMTE]` |
| **SYNCHRO 4D** | Bentley | Geen specifiek Noord-Afrikaans spoor gevonden. Waarschijnlijk aanwezig bij internationale opdrachtgevers en BIM-gedreven projecten in de NAC. `[LEEMTE]` |
| **RIB Candy / CCS Candy** | RIB Software (Schneider) | Geen Noord-Afrikaans spoor gevonden. Candy is sterk in Zuidelijk Afrika en de Golf, maar in Egypte/Maghreb niet aantoonbaar. `[LEEMTE]` |
| **RIB iTWO** | RIB Software | Idem `[LEEMTE]` |
| **Safran** (Planner/Project) | Safran Software | Sterk in olie & gas Noorwegen/Golf; geen Noord-Afrikaans spoor. `[LEEMTE]` |
| **Deltek** (Acumen Fuse/Risk, Open Plan) | Deltek | Acumen Fuse is in de Golf gangbaar voor schedule-quality-analyse bij grote opdrachtgevers; geen Noord-Afrikaans spoor gevonden. `[LEEMTE]` |
| **InEight** (Schedule) | InEight | Idem `[LEEMTE]` |

**Belangrijke conclusie over deze categorie:** het volledige "tweede echelon" van westerse bouwplanningsoftware is in Noord-Afrika **praktisch afwezig**. Er is geen distributiekanaal, geen opleidingsaanbod, geen vacaturevraag. De markt is een duopolie P6/MSP met Excel eronder. Dat is voor een nieuwe toetreder zowel een kans (geen gevestigde concurrentie behalve de twee reuzen) als een waarschuwing (blijkbaar lukt het niemand om die twee te doorbreken).

### Rang 7 — Open source

**ProjectLibre, GanttProject, OpenProject:** in dit onderzoek is **geen enkel spoor** gevonden van georganiseerd gebruik, lokalisatie, training of community in Egypte of Noord-Afrika. `[LEEMTE]`

**Waarom dit belangrijk is:** de theoretische logica ("prijsgevoelige markt → open source wint") **werkt hier niet**. De reden is dat de effectieve prijs van P6 in deze markt niet $3.880 is maar **nul** — via het informele kanaal. Open source concurreert dus niet tegen een dure commerciële licentie, maar tegen een gratis gekraakte marktleider met volledige bestandscompatibiliteit en volledige arbeidsmarktwaarde. Dat is een fundamenteel ander gevecht. `[EIGEN ANALYSE]`

### Rang 8 — Regionale uitdager: Opteam

**Wat:** AI-gedreven bouwmanagement-/planningsoftware, opgericht 2020 door dr. Tarek Hegazy en Ahmed Hegazy, gevestigd in Dubai Digital Park, Dubai Silicon Oasis ([TheSaaSNews](https://thesaasnews.com/news/opteam-secures-pre-seed-round/), [Crunchbase](https://www.crunchbase.com/organization/opteam)).

**Financiering:** pre-seed en seed, geleid door Plus Ventures, met Dar Ventures, SIAC Ventures, Oraseya Capital en Eurasia Capital ([Dealroom](https://app.dealroom.co/news/feed/opteam-secures-seed-funding-for-ai-expansion), [MenaHunt](https://menahunt.com/event/3437-opteam-secures-preseed-funding-to-revolutionize-construction-management)). Bedragen niet openbaar ([Jawlah](https://jawlah.co/en/38061)).

**Positionering:** heeft een dedicated Arabischtalige landingspagina "بديل بريمافيرا" (Primavera-alternatief) ([opteam.ai/ar](https://opteam.ai/ar/بديل-بريمافيرا/)) waarin P6 wordt aangevallen op complexiteit, hoge kosten, slechte integratie, trage updates, technische vereisten, verouderde interface en moeilijke aanpasbaarheid. Kan **P6-bestanden importeren en analyseren**. Gratis proefperiode van 14 dagen; **geen prijs openbaar**.

**Betekenis:** Opteam is het beste bewijs dat er een regionale markt wordt vermoed voor een goedkoper, moderner, Arabischtalig P6-alternatief — en tegelijk dat de weg daarheen loopt via **P6-bestandscompatibiliteit**, niet via een schone lei.

### Rang 9 — Lokale werfplanning-SaaS (Marokko)

- **MarocBTP** ([marocbtp.com](https://www.marocbtp.com/service-planification.html)) — SaaS, claimt "de eerste 100% Marokkaanse mobiele applicatie voor het beheren en plannen van bouwplaatsen". Functies: multi-site kalender, teamtoewijzing, realtime conflictdetectie bij dubbelboekingen, sync mobiel/desktop, fasen en mijlpalen, export. Claimt dat "meer dan 40% van de bouwvertragingen in Marokko direct samenhangt met planningsgebreken". Prijs niet openbaar, wel "aangepast aan de lokale markt" in dirham.
- **GestionBTP.ma** ([gestionbtp.ma](https://www.gestionbtp.ma)) — all-in-one met boekhouding, voorraad en HR.
- **BTPro.ma**, **imoz.ai** — adviesplatforms/integrators.

---

## 4. Wat wordt ervoor betaald

### 4.1 Oracle Primavera — lijstprijzen

**Perpetual (eeuwigdurende) licenties, prijslijst van een regionale Oracle-wederverkoper (AKIM Engineering, Turkije — dichtstbijzijnde publiek gepubliceerde prijslijst voor de regio):**

| Product | Prijs (USD) | In EGP `[AFGELEID @51,34]` |
|---|---|---|
| Primavera P6 Professional | **$3.880** | EGP 199.200 |
| Primavera P6 Enterprise | **$4.240** | EGP 217.700 |
| Primavera Risk Analysis | **$10.450** | EGP 536.500 |
| P6 Progress Reporter | **$1.460** | EGP 75.000 |

Bron: [akimeng.com/oracle-primavera-price-list.html](https://www.akimeng.com/oracle-primavera-price-list.html). Alle prijzen zijn "application user licenses with perpetual rights"; **support is niet inbegrepen** en updates moeten apart worden gekocht.

**Bevestigende bronnen voor de orde van grootte:**
- ITQlick: "one-time perpetual license cost of approximately **$2,500 to $3,500 per user**, with an optional annual support fee of **$500 to $800**" ([itqlick.com](https://www.itqlick.com/primavera-p6/pricing)) `[ZWAK — aggregator]`
- ProjectManagerTemplate: "Primavera P6 Professional license has been quoted at about **US$3,520 per user** for a perpetual license" ([projectmanagertemplate.com](https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models)) `[ZWAK — blog]`

**Cloud/abonnement:**

| Module | Prijs per gebruiker per jaar | Bron |
|---|---|---|
| Primavera Cloud — Progress | **$144** | [FindPM](https://findpmsoftware.com/products/primavera-cloud) |
| Primavera Cloud — Task Management | **$660** | idem |
| Primavera Cloud — Scheduling | **$1.320** | idem |
| Primavera Cloud — Portfolio Planning | **$2.640** | idem |
| Primavera Cloud (bundel) | **$7.800/jaar voor 5 gebruikers** (~$1.560 p/u) | [GlobalPM](https://globalpm.com/oracle-primavera-cloud-pricing/) |
| P6 EPPM Cloud Service (VK, G-Cloud 14) | **£220 per hosted named user per maand**, minimaal 25 gebruikers | [UK Digital Marketplace](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/) |

**Minimumafname:** doorgaans **5 gebruikers per module** ([FindPM](https://findpmsoftware.com/products/primavera-cloud), [Taradigm](https://www.taradigm.com/how-much-does-primavera-cloud-cost/)).

**Wat dit betekent in Egypte:**
- P6 EPPM Cloud tegen £220/gebruiker/maand met een minimum van 25 gebruikers = **£66.000/jaar ≈ $84.000 ≈ EGP 4,3 miljoen per jaar**. Dat is meer dan het bruto jaarsalaris van **28 planning engineers** in Egypte `[AFGELEID op basis van PayScale EGP 151.191]`. Dit product is in de Egyptische markt effectief niet verkoopbaar buiten olie & gas en internationaal gefinancierde projecten.
- Primavera Cloud Scheduling à $1.320/gebruiker/jaar = **EGP 67.800/jaar**, ongeveer **45% van een jaarsalaris** van de gebruiker. Ook dat is voor de meeste Egyptische aannemers onhaalbaar.
- Perpetual P6 Professional à $3.880 = **EGP 199.200**, ofwel **1,3× het gemiddelde jaarsalaris** van de planner. Bedrijven kopen daarom een handvol licenties en laten er tien mensen op werken, of kopen niets.

### 4.2 Microsoft Project — lijstprijzen

| Product | Prijs | Bron |
|---|---|---|
| Project Standard 2024 (on-premises, eenmalig) | **$679,99** | [Microsoft](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software) |
| Project Professional 2024 (on-premises, eenmalig) | **$1.129,99** | idem |
| Planner Plan 1 | **$10** per gebruiker/maand (jaarlijks gefactureerd) | [A Guide to Cloud](https://www.aguidetocloud.com/licensing/microsoft-project/), [TheDigitalProjectManager](https://thedigitalprojectmanager.com/tools/microsoft-project-pricing/) |
| Project Plan 3 | **$30** per gebruiker/maand | idem |
| Project Plan 5 | **$55** per gebruiker/maand | idem |

**In Egyptische context:** Project Professional 2024 à $1.129,99 = **EGP 58.000** ≈ **4,6 maandsalarissen** van de gebruiker `[AFGELEID]`. Project Plan 3 à $30/maand = **EGP 1.540/maand** ≈ **12% van een maandsalaris per gebruiker per maand** — voor een tienkoppig planningsteam is dat EGP 15.400/maand, wat neerkomt op ruim één extra ingenieur op de loonlijst.

### 4.3 Algemene SaaS

| Product | Plan | Prijs per seat/maand (USD, jaarlijkse facturering) | In EGP/maand `[AFGELEID]` | Bron |
|---|---|---|---|---|
| monday.com | Basic | $9 | EGP 462 | [monday.com/pricing](https://monday.com/pricing) |
| monday.com | Standard | $12 | EGP 616 | idem |
| monday.com | Pro | $19 | EGP 975 | idem |
| Smartsheet | Pro | $129 (jaarbedrag, zie voorbehoud) | — | [smartsheet.com/pricing](https://www.smartsheet.com/pricing) |
| Smartsheet | Business | $241 (jaarbedrag, zie voorbehoud) | — | idem |

**monday.com is met $9-12/seat/maand het enige westerse pakket dat in Egypte structureel binnen budget valt** voor een middelgrote aannemer — en dat is precies waarom het in de regio actief adverteert. Maar het levert geen CPM-netwerk dat een opdrachtgever accepteert.

### 4.4 Lokale/regionale prijzen (Marokko)

**Odoo BTP-pakketten (lokale installatie, eenmalige implementatieprijs)** ([Oasis Technocloud](https://oasistechnocloud.com/blog/logiciel-gestion-chantier-btp-maroc/)):

| Pakket | Prijs (MAD) | In USD `[AFGELEID @9,79]` | Inhoud |
|---|---|---|---|
| "Chantier Simple" | **12.900 MAD** | ~$1.318 | projecten + voorraad + facturen, 3 gebruikers |
| "BTP Complet" | **18.900 MAD** | ~$1.931 | + onderaannemers + wagenpark + voortgangsrapporten, 5 gebruikers |
| "Multi-Chantiers" | **24.900 MAD** | ~$2.543 | meerdere gelijktijdige projecten + geconsolideerde rapportage, 10 gebruikers |

**Cloud-BTP-software in Marokko:** **1.000–3.000 MAD/maand** (~$102–306/maand) voor multi-site beheer met materiaaltracking ([Oasis Technocloud](https://oasistechnocloud.com/blog/logiciel-gestion-chantier-btp-maroc/)).

**Referentiepunt:** de bron stelt dat Marokkaanse bouwbedrijven **5% tot 15% van hun marge** verliezen door onvoldoende kostenbewaking — het standaard verkoopargument in deze markt `[ZWAK — vendor-blog]`.

### 4.5 Trainingsprijzen — de echte commerciële laag

**Tunesië (harde, gepubliceerde prijzen — de best gedocumenteerde markt in de regio):**

| Cursus | Duur | Prijs (TND) | In USD `[AFGELEID @2,95]` | Bron |
|---|---|---|---|---|
| MS Project | 20 uur / 6 dagen | **450 DT** | ~$153 | [FormationTunisie](https://www.formationtunisie.com/formations/pack-management-chef-de-projet-primavera-p6-pmp-ms-project/) |
| Primavera P6 | 20 uur / 6 dagen | **550 DT** | ~$186 | idem |
| PMP | 35 uur / 11 dagen | **1.250 DT** | ~$424 | idem |
| Pack 3-in-1 | | **1.800 DT** i.p.v. 2.250 DT | ~$610 | idem |

**Egypte (gefragmenteerd, grote spreiding):**

| Aanbod | Prijs | In USD `[AFGELEID @51,34]` | Bron |
|---|---|---|---|
| Aggregator-bandbreedte alle Primavera-cursussen Egypte | **EGP 1.000 – 1.000.000** | $19 – $19.478 | [Laimoon](https://courses.laimoon.com/egypt/project-management/primavera/fees) `[ZWAK — aggregator, bovengrens is vrijwel zeker een outlier of datafout]` |
| Aggregator-bandbreedte Caïro (Arabische versie) | **EGP 1.000 – 183.900** | $19 – $3.582 | [Laimoon AR](https://courses.laimoon.com/ar/egypt/cairo/project-management/primavera/fees) |
| Corporate 5-daagse Primavera, Caïro | **EGP 163.458** | ~$3.184 | [Laimoon AR](https://courses.laimoon.com/ar/egypt/cairo/project-management/primavera) |
| 2-daags virtueel PRIMAVERA P6 (Vedant Trainings) | **EGP 30.191** | ~$588 | idem |
| 20 uur Planning + Primavera P6 incl. certificaat (lokaal, Facebook-gepromoot) | **EGP 1.500** (van EGP 2.500) | ~$29 (van ~$49) | [Primavera P6 Course Cairo, Facebook](https://www.facebook.com/primaverap6course/) |
| Kayan Academy, "Planning Engineer by Primavera P6 G5", 13u48m online | **$80** (van $120) | EGP ~4.107 | [kayan-co.org](https://www.kayan-co.org/courses/planning-engineer-by-primavera-p6-g5/) |
| eMastery Academy (Arabisch, docent dr. Ahmed Al-Lobban), 63 lessen / 5u11m | **$129** | EGP ~6.623 | [emasteryacademy.com](https://emasteryacademy.com/courses/course?coursetitle=Primavera&id=232) |
| BECOM Academy, 30 uur (niveau 1+2), 10 colleges, Arabisch/Engels, PMI-gecertificeerde docenten | prijs op aanvraag | — | [becomacademy.com](https://www.becomacademy.com/primavera/) |

**Structuur van de opleidingsmarkt in Egypte, zoals die uit de data blijkt:** er zijn feitelijk **twee markten naast elkaar**.

- **Markt A — internationale/corporate training:** The Knowledge Academy, Invensis Learning, SPOCTECH, TrainingCred, Simpliaxis, Primavera Training Experts. Prijzen in USD of hoge EGP-bedragen (EGP 30.000–165.000). Klanten: multinationals, olie & gas, overheidsprogramma's met donorfinanciering. **Volume: klein.**
- **Markt B — lokale Egyptische academies:** Kayan Academy, BECOM Academy, Global Academy Egypt, Pioneers Academy, Prime Academy, Benaa Academy, CLS Learn, Learnovate, Experts House, Global Premier Training Center, eMastery. Prijzen EGP 1.500–7.000 (~$29–136), veelal Arabischtalig met Engelse slides, vaak online met levenslange videotoegang. **Volume: groot.** Dit is waar de Egyptische planner daadwerkelijk wordt opgeleid.

**Marokko en Algerije:** vergelijkbaar aanbod (New Learning, TMR Partners, ITAB Academy, MindTech, Afrique Academy, ODC Plus, CIF-Pro, IIPM, OFPPT in Marokko; UPMS, ADEX, Business Leads Algeria, AGA Academy, Medina SARL, Infocarto in Algerije) maar **geen enkele aanbieder publiceert prijzen** — alles is "devis personnalisé" / prijs op aanvraag. `[LEEMTE]` New Learning Maroc geeft wel de vorm: 3-5 dagen, inter-/intra-entreprise, presentieel/virtueel/blended ([newlearning.ma](https://newlearning.ma/formation-planification-et-pilotage-ms-project-primavera-etc/)).

### 4.6 Valuta-effect: wat de devaluaties met deze markt hebben gedaan

**De devaluatiereeks:**

| Moment | Effect | Bron |
|---|---|---|
| Januari 2023 | Devaluatie van **40%**, naar $0,03 per EGP | [PIIE](https://www.piie.com/) |
| 6 maart 2024 | Volledige float, onmiddellijke devaluatie van **~60%**, naar $0,02 per EGP | [PIIE](https://www.piie.com/), [Meridian Briefs](https://www.meridian.org/) |
| 2024 totaal | **38%** devaluatie als onderdeel van de IMF-hervormingen | Franklin Templeton, via zoekresultaat |
| Juli 2026 | **USD/EGP 51,34** | [Xe, 25-07-2026](https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=EGP) |

**De consequentie, expliciet uitgerekend `[AFGELEID]`:**

Vóór de devaluatiereeks stond de pond rond **15,7 EGP/USD** (het niveau van begin 2022, algemeen bekend; niet apart gefetcht `[SCHATTING]`). Bij die koers kostte een P6 Professional-licentie van $3.880 ongeveer **EGP 60.900**. Bij de huidige koers van 51,34 kost diezelfde licentie **EGP 199.200** — een stijging van **227% in lokale valuta, zonder dat Oracle de prijs verhoogde**.

Salarissen zijn in dezelfde periode niet met 227% meegestegen. Het resultaat is een **structurele verdrievoudiging van de reële prijs van alle in USD geprijsde software** voor Egyptische kopers. Dit is de belangrijkste enkelvoudige gebeurtenis in deze markt in de afgelopen vijf jaar en verklaart:
- de verschuiving van perpetual-aankoop naar "we gebruiken wat we al hebben"
- de vrijwel volledige afwezigheid van cloud-abonnementen (die kunnen niet worden bevroren zoals een oude perpetual licentie)
- de groei van het informele kanaal
- de bloei van de goedkope, lokale, Arabischtalige opleidingsmarkt tegenover de internationale aanbieders
- de aantrekkelijkheid van vertrek naar de Golf voor planners (salaris in AED/SAR, gekoppeld aan USD)

**Marokko, Algerije, Tunesië:** de dirham, dinar en Tunesische dinar zijn niet vergelijkbaar gedevalueerd. De prijsgevoeligheid daar is reëel maar veel minder extreem dan in Egypte. Dat is een van de weinige plekken waar de vijf landen echt uiteenlopen.

### 4.7 Salarissen van planners — het referentiekader

De data zijn rommelig en spreken elkaar tegen. Dit is zelf een bevinding: **er is geen betrouwbare salarisstatistiek voor Egyptische planning engineers.**

| Bron | Cijfer | Opmerking |
|---|---|---|
| [PayScale Egypte, 2026](https://www.payscale.com/research/EG/Job=Planning_Engineer/Salary) | **EGP 151.191/jaar** (~$2.945) | meest bruikbaar |
| [SalaryExpert Egypte, 2026](https://www.salaryexpert.com/salary/job/planning-engineer/egypt) | entry (1-3 jr) **EGP 293.806/jaar**; senior (8+ jr) **EGP 476.336/jaar** | werkgevers-survey, hoger |
| [Glassdoor Caïro, 2025](https://www.glassdoor.com/) | EGP 11.625/maand (= EGP 139.500/jaar) | consistent met PayScale |
| [Glassdoor Egypte](https://www.glassdoor.co.uk/) | EGP 23.180/maand | inconsistent met bovenstaande |
| [Indeed Egypte (Arabisch)](https://eg.indeed.com/career/مهندس-تخطيط/salaries) | **EGP 4.692/maand** | verouderd of ondergrens |
| [Glassdoor Caïro](https://www.glassdoor.com/Salaries/cairo-egypt-planning-engineer-salary) | "EGP 10.375 **per jaar**" | datafout in de bron |

**Werkbare bandbreedte `[SCHATTING]`:** EGP 12.000–40.000 per maand (~$234–779) voor een planner in Egypte, afhankelijk van ervaring en werkgeverstype (lokale aannemer aan de onderkant, internationale PMC/olie & gas aan de bovenkant).

**Ter contrast, de Golf** ([Gulf Certifications](https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction)) `[ZWAK — opleiderbron]`:
- Junior planner: **AED 8.000–14.000/maand** (~$2.178–3.812) — dat is **9 tot 16 keer** het Egyptische instapsalaris `[AFGELEID]`
- Senior planner / planning manager: **AED 25.000–45.000/maand** (~$6.807–12.252)
- P6-vaardigheden zouden mid-career salarissen met 30-50% verhogen binnen twee contractcycli

**Dit salarisverschil van een factor 10 is de motor onder de hele opleidingsmarkt in Egypte.** Een Egyptische ingenieur die EGP 3.000 (~$58) uitgeeft aan een P6-cursus en daarmee een Golf-baan bemachtigt, verdient dat binnen één dag terug. Geen enkele softwareleverancier concurreert daar op prijs mee.

---

## 5. Marktomvang en aantal planners

**Er bestaat geen gepubliceerde marktomvang voor planning-/schedulingsoftware in Egypte of Noord-Afrika.** Wat volgt is een expliciete, controleerbare schatting.

### 5.1 Aantal planners — bottom-up `[SCHATTING]`

**Egypte:**

| Stap | Redenering | Uitkomst |
|---|---|---|
| Geregistreerde ingenieurs | Egyptisch Ingenieurssyndicaat: **>900.000 leden**, 70+ afdelingen ([UIPE](https://uipe.co.ug/)); een digitaal platform bedient "more than one million engineers" ([Cloud4Rain](https://cloud4rain.com/)) | 900.000+ |
| Aandeel civiel/bouwkundig | `[SCHATTING]` ~30% van de ingenieursberoepen in Egypte is civiel/bouwkundig/architectuur | ~270.000 |
| Actief en in Egypte werkzaam | `[SCHATTING]` ~60% (rest geëmigreerd, inactief, ander vak) | ~160.000 |
| Aandeel in een planning-/scheduling-/projectcontrolrol | `[SCHATTING]` 6–10% — planning is een specialisme binnen de bouwingenieurspopulatie | **10.000–16.000** |
| Plus: planners bij consultants, PMC's, opdrachtgevers, olie & gas, buiten syndicaatregistratie | `[SCHATTING]` +2.000–4.000 | |
| **Totaal Egypte** | | **12.000–20.000** |

**Kruiscontrole:** de bouwsector werkt 10,65% van de Egyptische beroepsbevolking ([Arab Finance](https://arabfinance.com/en/news/newdetails/egypt-construction-sector-key-driver-of-growth-and-investment)); bij een werkende bevolking van grofweg 28-30 miljoen is dat **~3 miljoen bouwwerkers**. Een verhouding van 1 planner op 150–250 bouwwerkers is voor een markt met 90% conventionele bouw ter plaatse en veel informele arbeid plausibel. `[AFGELEID]`

**Regio:**

| Land | Geschat aantal planners `[SCHATTING]` | Redenering |
|---|---|---|
| Egypte | **12.000–20.000** | zie boven |
| Marokko | **2.500–4.500** | bouwmarkt ~$10 mrd vs. Egypte ~$35-50 mrd, maar hogere formalisering en Franse projectcultuur → hogere planner-dichtheid per bouw-dollar |
| Algerije | **2.000–3.500** | groot bouwvolume, sterk staatsgestuurd, lagere formalisering van projectcontrols |
| Tunesië | **800–1.500** | kleine economie, wel sterke technische opleiding |
| Libië | **500–1.200** | grotendeels via buitenlandse aannemers; lokale planningcapaciteit beperkt |
| **Totaal Noord-Afrika** | **17.800–30.700**, afgerond **19.000–31.000** | |

**Daarbovenop — de diaspora, commercieel het belangrijkst:**
- **3,3 miljoen Egyptenaren** werken in de GCC ([The Expat Story](https://theexpatstory.com/gcc-expat-communities-where-workers-come-from/))
- **1,47 miljoen Egyptenaren** in Saudi-Arabië alleen, 11% van alle buitenlandse inwoners ([Ahram English, Saudi census](https://english.ahram.org.eg/NewsContent/1/1234/503272/Egypt/Foreign-Affairs/-million-Egyptians-living-and-working-in-Saudi-Ara.aspx)); een andere bron noemt ~1,5 miljoen ([SwiftRecharge](https://blog.swiftrecharge.com/blog-articles/diverse-immigrant-experience-worldwide/the-diverse-immigrant-experience-in-saudi-arabia/))
- Egypte heeft naar schatting **12–14 miljoen expats**, grotendeels in de GCC ([Arab News](https://www.arabnews.com/node/2600404/business-economy))
- Overmakingen: **$32,8 mrd** juli 2024–mei 2025, record ([ainvest](https://www.ainvest.com/)); **$29,4 mrd** in tien maanden FY2024/25, +77,1% ([Centrale Bank van Egypte](https://www.cbe.org.eg))

**Schatting Egyptische/Noord-Afrikaanse planners werkzaam in de Golf: 20.000–40.000** `[SCHATTING]` — afgeleid uit 3,3 miljoen Egyptenaren in de GCC, waarvan een substantieel deel in de bouw, en een planneraandeel dat door de P6-eis in Golf-tenders structureel hoger ligt dan thuis.

### 5.2 Marktomvang planning-/schedulingsoftware `[SCHATTING]`

**Egypte, bottom-up:**

| Categorie | Betaalde seats `[SCHATTING]` | ARPU/jaar `[SCHATTING, gebaseerd op geciteerde lijstprijzen]` | Omzet/jaar |
|---|---|---|---|
| Oracle Primavera (perpetual geamortiseerd + support + cloud) | 1.500–3.500 | $600–1.400 | **$0,9–4,9 mln** |
| Microsoft Project (alle plannen, incl. via bestaande EA/CSP) | 2.000–6.000 | $120–400 | **$0,24–2,4 mln** |
| Overige gespecialiseerde bouwplanning (Asta/TILOS/SYNCHRO/Safran/Deltek/InEight/Candy samen) | 100–400 | $1.000–3.000 | **$0,1–1,2 mln** |
| Algemene SaaS ingezet voor bouwplanning (monday, Smartsheet, ClickUp, Zoho, Wrike, Odoo) | 3.000–10.000 | $120–400 | **$0,36–4,0 mln** |
| Planningmodules binnen lokale bouw-ERP (toegerekend deel) | — | — | **$0,5–1,5 mln** |
| **Subtotaal software Egypte** | | | **$2,1–14,0 mln; centrale schatting ~$6–7 mln** |

**Penetratiegraad die hieruit volgt:** ongeveer **6.600–19.900 betaalde seats** tegenover **12.000–20.000 planners**. Maar veel planners gebruiken twee tools (P6 + Excel, of MSP + Excel), en veel seats staan bij niet-planners. Netto komt de schatting neer op **20–40% van de planners werkt op een betaalde licentie**; **60–80% werkt op Excel, een gedeelde licentie of een informele kopie**. `[SCHATTING — dit is het onzekerste getal in dit rapport, maar het is consistent met het BSA-piraterijpercentage van 59% en met de vindbaarheid van het informele kanaal]`

**Diensten Egypte:**

| Categorie | Redenering `[SCHATTING]` | Omzet/jaar |
|---|---|---|
| Training | 8.000–15.000 cursisten/jaar × gemiddeld EGP 5.000 (~$97) | **$0,8–1,5 mln** (formeel); daarnaast een aanzienlijk informeel/online segment |
| Implementatie, consultancy, schedule audits, claims support | 4 geïdentificeerde Oracle-partners + tientallen freelance consultants | **$2–5 mln** |
| **Totaal Egypte, ecosysteem** | | **~$10–20 mln/jaar; centrale schatting ~$14 mln** |

**Top-down kruiscontrole:**
- Egypte's IT-markt: **$3,5 mrd in 2025**, groeiend naar $9,2 mrd in 2031 ([EgyptToday](https://www.egypttoday.com/Article/3/141934/Egypt's-IT-Market-to-grow-from-3-5B-in-2025)); IT-diensten alleen **$1,63 mrd in 2025** ([Statista](https://www.statista.com/outlook/tmo/it-services/egypt?currency=USD)); bredere ICT-markt **$28,8 mrd in 2025** ([IMARC](https://www.imarcgroup.com/egypt-ict-market), [DataInsights](https://www.datainsightsmarket.com/reports/egypt-ict-market-11206))
- Als software ~20–25% van de $3,5 mrd IT-markt is → **$700–875 mln**
- Project-/portfoliosoftware is wereldwijd in de orde van **~1% van enterprise-softwarebestedingen** `[SCHATTING]` → **$7–9 mln**
- **De top-down uitkomst ($7–9 mln) valt binnen de bottom-up bandbreedte ($2,1–14 mln) en dicht bij de centrale schatting ($6–7 mln).** Dat is een bevestiging, geen bewijs, maar het maakt de orde van grootte geloofwaardig.

**Regio totaal `[SCHATTING]`:**

| Land | Software/jaar | Redenering |
|---|---|---|
| Egypte | **$6–7 mln** | zie boven; grootste plannerpopulatie, laagste koopkracht |
| Marokko | **$2,5–4 mln** | kleinere populatie maar 3-5× hogere koopkracht per planner, MOWAKABA-subsidie, WK-investeringsgolf, sterkere formele licentiediscipline (Frans/Europees opdrachtgeverschap) |
| Algerije | **$1,5–3 mln** | groot volume, staatsgedreven, gesloten markt, moeizame internationale betalingen |
| Tunesië | **$0,5–1 mln** | klein maar formeel; goed opleidingsaanbod met transparante prijzen |
| Libië | **$0,3–0,8 mln** | grotendeels ingekocht door buitenlandse aannemers buiten de Libische markt om |
| **Totaal Noord-Afrika, software** | **$10,8–15,8 mln; centrale schatting ~$13 mln (2026)** | |
| **Totaal incl. training, implementatie en consultancy** | **~$25–40 mln/jaar** | |

**Zet dit in perspectief:** de bouwsector in deze vijf landen vertegenwoordigt makkelijk **$70–100 miljard** aan jaarlijkse activiteit. De planningsoftware daarvoor kost **~$13 miljoen** — ongeveer **0,015%** van het bouwvolume. `[AFGELEID]` In West-Europa ligt die verhouding een factor 5 tot 15 hoger. **Dat gat is precies het informele kanaal plus Excel.**

---

## 6. Lokale bijzonderheden

### 6.1 Aanbestedings- en contracteisen

**Egypte — Wet 182/2018** ("Law regulating contracts concluded by public authorities") is het raamwerk voor alle publieke aanbestedingen. Vindplaatsen: [Andersen Egypt vertaling](https://eg.andersen.com/translation-of-law-182-of-2018/), [Andersen PDF](https://eg.andersen.com/wp-content/uploads/2026/01/Law-No.-182-of-2018.pdf), [Ellaithy Lawyers samenvatting](https://ellaithylawyers.com/law-no-182-of-2018/), [Africa Construction Law](https://africaconstructionlaw.org/egypt-key-features-of-recent-law-regulating-contracts-concluded-by-public-authorities/), [Shand & Partners/Lexology 2025](https://shandpartners.com/insights/firm-news/government-procurement-egypt-lexology-2025/).

**Belangrijke bevinding, en die is negatief:** in dit onderzoek is **geen bepaling in Wet 182/2018 gevonden die een specifiek planningsoftwarepakket voorschrijft**, en evenmin een expliciete eis tot het indienen van een CPM-programma in een bepaald formaat. `[LEEMTE — de wetsteksten zijn niet integraal doorgelezen; alleen samenvattingen en commentaren]` De wet regelt aanbestedingsprocedures, gunningsmethoden en drempels, niet de technische vorm van het tijdschema.

**Waar de eis wél vandaan komt:** de *softwarestandaard is contractueel, niet wettelijk*. Hij komt uit drie richtingen:
1. **FIDIC-gebaseerde contracten** (gangbaar bij internationaal gefinancierde projecten in alle vijf landen) eisen onder Clause 8.3 een gedetailleerd programma met logica en kritieke pad — in de praktijk vertaald naar P6 of MSP.
2. **Golf-opdrachtgevers**: "Primavera P6 is named directly in most GCC public-sector and EPC tender documents"; MS Project-bestanden bij ADNOC of Saudi Aramco kunnen leiden tot uitsluiting; "No P6, no payment certificate" ([Gulf Certifications](https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction)). Egyptische aannemers die in de Golf werken importeren die standaard.
3. **Hoofdaannemers**: CSCEC, CCC, Siemens en Orascom leggen hun eigen planningsstandaard op aan onderaannemers.

**Praktische consequentie voor een nieuwe toetreder:** het is niet nodig om aan een wet te voldoen. Het is nodig om **XER- en XML-bestanden te kunnen lezen en schrijven** die door P6 worden geaccepteerd, en om een uitdraai te produceren die een opdrachtgevers-planner herkent. Zonder dat is een tool onbruikbaar in het formele circuit, ongeacht kwaliteit of prijs. `[EIGEN ANALYSE]`

### 6.2 De rol van P6-certificering voor werk in de Golf

Dit is het **belangrijkste enkelvoudige gedragsmechanisme in deze markt.**

**De keten:**
1. Een Egyptische bouwkundig ingenieur verdient thuis EGP 12.000–40.000/maand (~$234–779).
2. Een junior planner in de VAE verdient AED 8.000–14.000/maand (~$2.178–3.812) ([Gulf Certifications](https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction)) — **een factor 5 tot 16**.
3. Toegang tot die banen loopt via P6: 344 P6-vacatures op NaukriGulf, 253 in Dubai, 196 in Saudi-Arabië, 160 in de VAE, 340+ op Bayt, 400+ actieve vacatures volgens [Edoxi](https://www.edoxi.com/studyhub/how-to-become-a-primavera-p6-professional-in-dubai).
4. Vacatures eisen expliciet P6-ervaring, vaak "minimum of 6 years of UAE experience in construction planning and scheduling" ([Indeed VAE](https://ae.indeed.com/q-primavera-p6-planning-engineer-jobs.html)) — maar de instapeis is de tool, niet het diploma.
5. Een lokale Egyptische P6-cursus kost EGP 1.500–7.000 (~$29–136).

**Gevolg:** de vraag naar P6-*kennis* in Egypte is een **arbeidsmigratie-investering**, geen bedrijfsinvestering. Dat is een fundamenteel andere marktdynamiek dan in Europa. Het betekent:
- De opleidingsmarkt is structureel groter en gezonder dan de licentiemarkt.
- De cursist betaalt zelf, niet de werkgever.
- De cursist heeft **geen licentie nodig om te leren** — vandaar het informele kanaal.
- Een concurrerend product zonder Golf-arbeidsmarktwaarde is voor de individuele Egyptische planner waardeloos, hoe goed het ook is. Hij leert niet wat zijn cv niet verkoopt.

**Nuance over "certificering":** wat in de praktijk telt is niet een Oracle-examen maar een **cursuscertificaat van een academie plus aantoonbare projecten**. Oracle-certificeringen (Oracle Certified Specialist) zijn zeldzaam en duur; de markt draait op academiecertificaten van Kayan, BECOM, Global Academy, The Knowledge Academy et cetera. PMP is de tweede as (in Tunesië 1.250 DT / ~$424 — bijna 3× de MS Project-cursus, wat de prijsvorming laat zien: het internationale certificaat is duurder dan de toolvaardigheid).

### 6.3 Opleidingsmarkt — samenvattend beeld

| Land | Aanbieders geïdentificeerd | Prijstransparantie | Taal |
|---|---|---|---|
| Egypte | 15+ (Kayan, BECOM, Global Academy Egypt, Pioneers Academy, Prime Academy, Benaa Academy, CLS Learn, Learnovate, Experts House, GPC Training, eMastery, The Knowledge Academy, Invensis, SPOCTECH, TrainingCred, Simpliaxis, Primavera Training Experts) | Laag; aggregators tonen extreme spreiding | Arabisch met Engelse slides is de norm |
| Marokko | 10+ (New Learning, TMR Partners, ITAB Academy, MindTech, Afrique Academy, ODC Plus, CIF-Pro, IIPM, Group Academy, **OFPPT** (staat)) | Geen enkele publiceert prijzen | Frans |
| Algerije | 6+ (UPMS, ADEX Training Center, Business Leads Algeria, AGA Academy, Medina SARL, Infocarto; ook via Ouedkniss-advertenties) | Geen prijzen | Frans |
| Tunesië | 6+ (FormationTunisie, Expert Team/Expertunisie, Tunipages Academy, Tunisie-Formation, TMR Partners) | **Hoog — enige markt met gepubliceerde prijzen** | Frans |
| Libië | Geen aanbieders gevonden | — | `[LEEMTE]` |

**Opvallend:** UPMS in Algerije adverteert met "Formateurs certifiés pour les formations en gestion de projet avec Oracle Primavera P6" én PMP-examenvoorbereiding ([upms.dz](https://upms.dz)) — de standaardcombinatie in de hele regio.

**Ook opvallend:** TMR Partners bedient **Tunesië én Marokko** vanuit één merk ([tmrpartners.com](https://tmrpartners.com/formation-primavera-p6/)) — er is een Maghreb-brede opleidingsmarkt in het Frans, terwijl Egypte een aparte Arabischtalige markt is. Dat is de scherpste tweedeling in de regio.

### 6.4 Resellers en het kanaal

**Egypte — Oracle Primavera:**

| Partij | Positie | Bron |
|---|---|---|
| **Metra Group** | "Oracle's foremost Value-Added Distributor in the MENA region since 2021", eigen business unit voor Oracle in Egypte; projecten voor Ministerie van Elektriciteit en Ministerie van Financiën | [metragroup.com](https://metragroup.com/vendors/oracle/) |
| **B-Trust** | "Authorized partner of Oracle in Egypt and the Middle East"; verkoopt P6 Professional, P6 EPPM en Primavera Unifier; levert licenties, training en support; gevestigd in Maadi, Caïro; 11 jaar actief; **publiceert geen prijzen** | [b-trust.net](https://b-trust.net/oracle-primavera-software-primavera-licence/) |
| **The Cloudors** | Oracle Projects en Primavera P6 implementatie en managed services in Egypte en Saudi-Arabië | [thecloudors.com](https://www.thecloudors.com/projects/) |
| **Promastar** | "Regional Oracle Primavera specialized consultant and implementer", Engineering & Construction verticaal | [promastar.net](https://www.promastar.net/about/) |

**Kanaalobservatie:** alle vier de partijen publiceren **geen prijzen**. In een markt met een piraterijpercentage van 59% en een prijs van 1,3 jaarsalaris per licentie is dat begrijpelijk — maar het maakt de markt ondoorzichtig en verhoogt de drempel voor een eerlijke koper. De enige publiek gepubliceerde regionale prijslijst die dit onderzoek vond is die van een **Turkse** wederverkoper.

**Marokko, Algerije, Tunesië, Libië:** **geen Oracle Primavera-reseller gevonden.** `[LEEMTE]` Het kanaal daar loopt via opleiders (TMR Partners, UPMS, Business Leads Algeria) die soms ook licenties bemiddelen, en via Franse/Europese systeemintegrators. Voor Asta Powerproject, TILOS, SYNCHRO, Safran, Deltek en InEight is **in de gehele regio geen distributeur gevonden**.

### 6.5 Excel en informele/gekraakte licenties — de dominante realiteit

**Piraterijcijfers:**

| Land | Percentage | Jaar | Bron |
|---|---|---|---|
| Egypte | **59%** (was 61%, daling van 2 procentpunt) | 2017 (BSA, laatste publicatie) | [EgyptToday](https://www.egypttoday.com/Article/3/57869/BSA-Egypt-sees-software-piracy-drop-by-2), [Egypt Independent](https://www.egyptindependent.com/egypt-witnesses-software-piracy-drop-according-to-recent-study/), [Broadcast Pro ME](https://www.broadcastprome.com/news/egypt-sees-software-piracy-drop-following-legal-reforms/) |
| Egypte — commerciële waarde ongelicentieerde software | **$157 mln (2015) → $64 mln (2017)** | | idem |
| Marokko | **64%** (BSA-schatting) | IP Index 2025 | [U.S. Chamber IP Index 2025, Morocco](https://www.uschamber.com/assets/documents/maps/Ipindex_25/Morocco_IPIndex-2025.pdf) |
| Sub-Sahara-Afrika (referentie) | 73% | | [worldmetrics.org](https://worldmetrics.org/software-piracy-statistics/) |
| Noord-Amerika (referentie) | 19% | | idem |
| Algerije, Tunesië, Libië | **geen cijfer gevonden** | | `[LEEMTE]` |

**Belangrijk voorbehoud:** BSA heeft na 2018 geen landenrapport meer gepubliceerd. Alle bovenstaande percentages zijn **minstens acht jaar oud**. Gezien de devaluatie sinds 2022 — die de reële prijs van USD-software in Egypte verdrievoudigde — is het aannemelijk dat het feitelijke percentage voor betaalde bouwsoftware **hoger** ligt dan 59%, niet lager. `[SCHATTING]`

**Directe observatie van het informele kanaal:** een Arabischtalige zoekopdracht naar Primavera P6-downloads levert een volledig uitgebouwd distributienetwerk op:

| Kanaal | Voorbeeld | Versies |
|---|---|---|
| YouTube-tutorials (installatie + activatie) | meerdere kanalen | diverse |
| LinkedIn-posts met directe downloadlinks | `ae.linkedin.com/posts/easy-pmp_...`, `ae.linkedin.com/posts/alhlhli_...` | V23.1, 24.12 |
| Facebook-groepen | "Experts House" | V25.12 |
| Arabische engineering-fora | [arab-eng.org/threads/506596/](https://arab-eng.org/threads/506596/) | R8.3 |
| Telegram-kanalen | @sixthdimeng | diverse |
| Downloadportalen | tahmilsoft.com, civil-guide.com | R17.7 |
| LMS van een opleider | [lms.engosoft.com](https://lms.engosoft.com/front/ar/help-center/article/40) — installatie- en downloadinstructies in het helpcentrum | |

**Dat laatste is het meest veelzeggende punt:** een *opleidingsinstituut* host installatie-instructies in zijn officiële helpcentrum. Het informele kanaal is geen schaduwmarkt maar de normale infrastructuur waarmee in Egypte P6 wordt geleerd en gebruikt.

**Wat de opdracht "belangrijk in deze markt" hier concreet betekent, voor wie een product wil positioneren:**
1. **De concurrent is niet Oracle's prijs, maar Oracle's product tegen nul kosten.** Een gratis of goedkoop alternatief heeft geen prijsvoordeel ten opzichte van een gekraakte P6.
2. **Legitimiteit heeft wel waarde in het formele segment.** Grote aannemers die voor internationale opdrachtgevers, IFI-gefinancierde projecten of Golf-klanten werken, worden geaudit en kunnen zich geen ongelicentieerde software veroorloven. Dat is het betalende segment — 20-40% van de planners `[SCHATTING]` — en dat segment groeit met de internationalisering van Egyptische aannemers (Libië, Golf, Sub-Sahara).
3. **Bij overheidsaanbestedingen wordt licentiestatus zelden gecontroleerd.** `[SCHATTING — geen bron gevonden die het tegendeel aantoont]`
4. **Excel blijft de terugvaloptie voor alles wat niet contractueel wordt afgedwongen.**

### 6.6 BIM en digitalisering

`[LEEMTE]` Meerdere zoekpogingen naar BIM-mandaten in Egypte en Marokko liepen vast op CAPTCHA's. Wat wel vaststaat: NextMSC en Mordor rapporteren dat "Modern Methods of Construction" in Egypte met 11,1% CAGR groeit vanaf een basis van 10% van de markt ([Mordor](https://www.mordorintelligence.com/industry-reports/egypt-construction-market)) — dus 90% van de Egyptische bouw is nog conventioneel ter plaatse. Een 4D/BIM-gedreven planningpropositie richt zich daarmee op een zeer kleine kop van de markt.

---

## 7. Lokale en regionale pakketten: concrete voor- en nadelen

### 7.1 Opteam (Dubai, VAE) — de serieuze regionale uitdager

**Bron:** [opteam.ai/ar](https://opteam.ai/ar/بديل-بريمافيرا/), [Crunchbase](https://www.crunchbase.com/organization/opteam), [TheSaaSNews](https://thesaasnews.com/news/opteam-secures-pre-seed-round/), [Dealroom](https://app.dealroom.co/news/feed/opteam-secures-seed-funding-for-ai-expansion)

**Voordelen:**
- Volwaardige **Arabischtalige** positionering en marketing — uniek in dit segment
- **Kan P6-bestanden importeren en analyseren** — lost het compatibiliteitsprobleem op in plaats van het te negeren
- AI-gedreven schemaoptimalisatie; claim "reduces the time to strategize from weeks to minutes" ([FeedTheAI](https://feedtheai.com/opteam-raises-pre-seed-funding/))
- Gefinancierd door regionale VC's met bouwconnecties (Dar Ventures — link met Dar Al-Handasah-sfeer; SIAC Ventures — link met SIAC Construction, een grote Egyptische aannemer). Dat is distributie via de kapitaaltafel.
- Expliciet gericht op UAE- en Saudi-marktexpansie ([Sustainable Construction Review](https://sustainableconstructionreview.com/2025/01/27/opteam-secures-funding-to-revolutionize-construction-with-ai-solutions/))
- 14 dagen gratis proef

**Nadelen:**
- **Geen prijs openbaar** — in de meest prijsgevoelige markt ter wereld is dat een fundamentele fout; het dwingt elke prospect door een salesgesprek
- Pre-seed/seed-stadium, bedragen niet openbaar → **leveranciersrisico** bij een tienjarig infrastructuurproject
- Cloud-only → problematisch bij projecten met datarestricties (defensie-gelieerde opdrachtgevers in Egypte, wat een groot deel van de NAC-projecten raakt) en bij slechte connectiviteit op afgelegen werven
- **Lost het kernprobleem niet op:** de opdrachtgever eist een P6-bestand en de arbeidsmarkt beloont P6-ervaring. Opteam kan importeren, maar een planner die alleen Opteam kent, komt niet aan de bak in Riyad.
- Geen Noord-Afrikaanse aanwezigheid; Dubai-gecentreerd, niet Caïro- of Casablanca-gecentreerd

### 7.2 MarocBTP (Marokko)

**Bron:** [marocbtp.com](https://www.marocbtp.com/service-planification.html)

**Voordelen:**
- "Eerste 100% Marokkaanse mobiele applicatie voor werfbeheer en -planning" — sterke lokale identiteit, wat in Marokko commercieel werkt
- Mobile-first en realtime sync: past bij de werkelijke werkwijze van een Marokkaanse werfleider
- **Realtime conflictdetectie** bij dubbelgeboekte mensen of materieel — het praktische probleem van een multi-site aannemer
- Prijzen "aangepast aan de lokale markt" in dirham; gratis proefperiode
- Richt zich op alle bedrijfsgroottes, van zelfstandige uitvoerder tot multi-projectgroep

**Nadelen:**
- **Het is resourcekalenderplanning, geen CPM.** Geen netwerklogica, geen kritieke pad, geen total float, geen baseline-vergelijking. Het is onbruikbaar voor een contractueel programma onder FIDIC.
- **Geen prijs openbaar** — dezelfde fout als Opteam
- Geen P6/MSP-interoperabiliteit aangetoond
- Alleen Marokko; geen schaal richting Egypte of de Golf
- De claim "meer dan 40% van de bouwvertragingen in Marokko hangt direct samen met planningsgebreken" is marketing zonder geciteerde onderbouwing `[ZWAK]`

### 7.3 Odoo-BTP-pakketten (Marokko, via lokale integrators)

**Bron:** [Oasis Technocloud](https://oasistechnocloud.com/blog/logiciel-gestion-chantier-btp-maroc/)

**Voordelen:**
- **Volledig transparante prijzen** — 12.900 / 18.900 / 24.900 MAD, de enige leverancier in dit hele onderzoek die dat in Noord-Afrika doet
- Eenmalige aanschaf bij lokale installatie: past bij de kapitaalvoorkeur van familiebedrijven in de regio (liever eenmalig dan abonnement)
- Open source-basis → geen vendor lock-in, lokale ontwikkelaars beschikbaar
- Combineert projecten, voorraad, facturatie, onderaannemers, wagenpark en voortgangsstaten — dekt de werkelijke administratieve pijn
- Kan tot 90% gesubsidieerd worden via MOWAKABA `[ZWAK — één bron]`

**Nadelen:**
- **Geen CPM-planning.** Odoo Project is takenlijst plus Gantt-weergave, geen scheduler met logica en float.
- Zeer beperkte gebruikersaantallen in de pakketten (3 / 5 / 10)
- Kwaliteit staat of valt met de lokale integrator; geen productgarantie
- Geen IFC, geen bouwspecifieke datamodellen
- Geen interoperabiliteit met P6/MSP

### 7.4 Egyptische bouw-ERP's (BabelERP, Hunt ERP, Bright, Nodhom, Pioneers, Salis, Buildo, BySmart, Microsystems, SkySoft)

**Voordelen:**
- **Volledig Arabischtalig en RTL** — geen enkel westers planningspakket biedt dat op vergelijkbaar niveau
- **Egyptisch-specifieke contractpraktijk ingebouwd:** BySmart adverteert met exacte berekening van inhoudingen op aanneemsommen ([bysmart-soft.com](https://bysmart-soft.com)); Nodhom dekt contracten, facturen, inkoop en kostentracking ([nodhom.com](https://nodhom.com/ar/ar-contracting/))
- Prijsstelling in EGP, lokale support, lokale implementatie — geen valutarisico
- Hunt ERP claimt "diep begrip van de Egyptische aannemerssector" ([hunt-eg.com](https://hunt-eg.com/ar/blog/contracting-construction-erp-egypt))
- Pioneers ERP bedient zowel Egypte als Saudi-Arabië ([pioneers-solutions.com](https://pioneers-solutions.com/blog-erp-contracting-companies)) — de commercieel juiste as

**Nadelen:**
- **Het zijn geen planningspakketten.** Dit is administratie, kostprijs en facturatie. De planningsfunctie is doorgaans een Gantt-weergave over taken, zonder CPM-netwerk, zonder kalenders met uitzonderingen, zonder resource-levelling, zonder baseline-variantieanalyse.
- Geen interoperabiliteit met P6/MSP → de planner exporteert alsnog naar Excel
- Vrijwel geen enkele publiceert prijzen
- Kleine schaal: Hunt ERP noemt "5+ grote bedrijven" als klantenbestand — dat is een indicatie van de werkelijke marktomvang van dit segment
- Geen IFC of BIM-integratie
- Sterke fragmentatie: minstens tien aanbieders voor een markt die er hooguit twee kan dragen

### 7.5 GestionBTP.ma, BTPro.ma, imoz.ai (Marokko)

**Voordelen:** all-in-one (boekhouding, voorraad, HR), Franstalig, lokale support, gericht op de Marokkaanse KMO-aannemer.
**Nadelen:** geen CPM, geen prijstransparantie, geen schaal, geen interoperabiliteit. Grotendeels marketingsites van integrators. `[ZWAK — weinig substantie gevonden]`

---

## 8. Wat dit betekent voor een nieuwe toetreder (bijvoorbeeld een open-source IFC-gebaseerde planner)

`[EIGEN ANALYSE — geen bronnen, maar afgeleid uit het bovenstaande]`

**Wat werkt in deze markt:**

1. **P6-bestandsinteroperabiliteit is het toegangsbewijs, niet een feature.** XER-import en -export is de voorwaarde voor elke serieuze overweging. Opteam begreep dit; MarocBTP en de Egyptische ERP's niet — en dat is precies waarom die laatste categorie geen planningsmarkt heeft veroverd.
2. **Arabisch + RTL, en Frans, zijn geen nice-to-have.** De Maghreb werkt in het Frans (OFPPT, alle Algerijnse en Marokkaanse opleiders), Egypte in het Arabisch met Engelse terminologie (BECOM: "Arabic/English languages with presentation slides in English"). Een product dat beide talen native ondersteunt heeft een positie die geen enkele westerse concurrent bezet.
3. **Gratis of nagenoeg gratis is de enige werkbare prijs in Egypte** — niet omdat de markt arm is, maar omdat de referentieprijs van de marktleider daar feitelijk nul is. In Marokko en Tunesië is een betaald model wel haalbaar (Tunesische opleiders publiceren prijzen; Marokko heeft subsidie).
4. **Offline/desktop werkt beter dan cloud-only.** Connectiviteit op werven, datarestricties bij defensie-gelieerde opdrachtgevers in Egypte, en de voorkeur voor eenmalige aanschaf boven abonnement wijzen allemaal dezelfde kant op.
5. **De opleidingsmarkt is de distributie.** Wie de Egyptische academies (Kayan, BECOM, Global Academy, Benaa, Pioneers) zover krijgt om een tool in het curriculum op te nemen, koopt zich in bij 8.000–15.000 cursisten per jaar `[SCHATTING]`. Dat is een efficiëntere go-to-market dan enige resellerstrategie.
6. **De diaspora is het echte geld.** 20.000–40.000 Noord-Afrikaanse planners in de Golf `[SCHATTING]`, betaald in aan de dollar gekoppelde valuta, met werkgevers die wél licentie-audits ondergaan.

**Wat niet werkt:**

- Concurreren op prijs met een gekraakte P6 (onmogelijk — beide zijn nul)
- Een product zonder arbeidsmarktwaarde aanbieden aan individuele planners (zij investeren in hun cv, niet in productiviteit)
- Cloud-abonnement per gebruiker per maand in EGP (de devaluatie maakt elk USD-abonnement ieder jaar duurder in lokale valuta)
- Verkopen aan de aannemer zonder dat de opdrachtgever het formaat accepteert

---

## 9. Belangrijkste leemtes in dit onderzoek

Eerlijk opgesomd, zodat de lezer weet wat níet is vastgesteld:

1. **Geen marktaandeelonderzoek** voor planningsoftware in Egypte of Noord-Afrika bestaat publiek. De rangorde in hoofdstuk 3 is een beredeneerde proxy-analyse.
2. **Geen absolute bouwmarktomvang** in USD/DZD voor Algerije en Tunesië gevonden.
3. **Wet 182/2018 is niet integraal gelezen** — de conclusie dat er geen softwarevoorschrift in staat, berust op samenvattingen en commentaren.
4. **Asta Powerproject, TILOS, SYNCHRO, Safran, Deltek en InEight:** meerdere zoekopdrachten liepen vast op CAPTCHA's. De conclusie "praktisch afwezig" berust op afwezigheid van bewijs (geen resellers, geen opleidingen, geen vacatures), niet op bewijs van afwezigheid.
5. **BSA-piraterijcijfers zijn 8+ jaar oud**; BSA publiceert geen landenrapporten meer.
6. **Geen prijzen** voor Primavera of MS Project van een Egyptische, Marokkaanse, Algerijnse of Libische reseller gevonden — de gebruikte prijslijst is Turks.
7. **Salarisdata zijn inconsistent** tussen Glassdoor, PayScale, SalaryExpert en Indeed; verschillen van een factor 5.
8. **Geen ProjectLibre/GanttProject/OpenProject-spoor** gevonden; dat kan betekenen dat ze afwezig zijn of dat ze onder de radar gebruikt worden zonder online voetafdruk.
9. **Libië is nauwelijks onderzoekbaar**: geen opleiders, geen resellers, geen marktdata.
10. **De MOWAKABA-subsidieclaim (90% financiering)** komt uit één vendor-blog en is niet bij de Marokkaanse overheid geverifieerd.

---

## 10. Volledige bronnenlijst

**Bouwmarkt Egypte**
- [Arab Finance — Egypt's construction sector](https://arabfinance.com/en/news/newdetails/egypt-construction-sector-key-driver-of-growth-and-investment)
- [Mordor Intelligence — Egypt Construction Market](https://www.mordorintelligence.com/industry-reports/egypt-construction-market)
- [NextMSC — Egypt Construction Market](https://www.nextmsc.com/report/egypt-construction-market-cm4742)
- [MarketResearch.com / MarketLine — Construction in Egypt](https://www.marketresearch.com/MarketLine-v3883/Construction-Egypt-41634737/)
- [RailwayPro — $4,5 mrd contract HSL Egypte](https://www.railwaypro.com/wp/usd-4-5-billion-contract-signed-for-suez-canal-on-tracks/)
- [Times of Israel — Egypt high-speed rail](https://www.timesofisrael.com/workers-begin-laying-tracks-for-egypts-high-speed-rail-megaproject/)

**Bouwmarkt Marokko**
- [BusinessWire/ResearchAndMarkets — Morocco Construction Industry Report 2025 (MAD 112,33 mrd)](https://www.businesswire.com/news/home/20250512137600/en/Morocco-Construction-Industry-Report-2025-A-MAD-112.33-Billion-Market-by-2029-with-2.8-CAGR-Forecast-During-2025-2029---ResearchAndMarkets.com)
- [BusinessWire — Morocco Construction Industry Report 2025 (4,5% groei)](https://www.businesswire.com/news/home/20250922298977/en/)
- [ITA / trade.gov — Morocco Infrastructure](https://www.trade.gov/country-commercial-guides/morocco-infrastructure)
- [AGBI — Morocco approves $41bn World Cup infrastructure spending](https://www.agbi.com/infrastructure/2025/10/)
- [7news.ma — Morocco's construction boom](https://en.7news.ma/moroccos-construction-boom-mega-projects-reshaping-the-industry/)

**Bouwmarkt Algerije, Tunesië, Libië**
- [Yahoo Finance — Tunisia Construction Industry Report 2025 (1,2%)](https://uk.finance.yahoo.com/news/tunisia-construction-industry-report-2025-104700577.html)
- [Yahoo Finance — Tunisia Construction Industry Report 2025 (4,6%)](https://finance.yahoo.com/news/tunisia-construction-industry-report-2025-152400145.html)
- [Libya Review — Egypt expands presence in Libya's $400 billion reconstruction market](https://libyareview.com/54118/egypt-expands-presence-in-libyas-400-billion-reconstruction-market/)
- [Construction Review Online — Libya](https://constructionreviewonline.com/region/libya/)

**Softwareprijzen**
- [AKIM Engineering — Oracle Primavera price list](https://www.akimeng.com/oracle-primavera-price-list.html)
- [FindPM — Primavera Cloud pricing](https://findpmsoftware.com/products/primavera-cloud)
- [GlobalPM — Oracle Primavera Cloud pricing](https://globalpm.com/oracle-primavera-cloud-pricing/)
- [Taradigm — How much does Primavera Cloud cost](https://www.taradigm.com/how-much-does-primavera-cloud-cost/)
- [UK G-Cloud 14 — Oracle Primavera pricing document](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/)
- [ITQlick — Primavera P6 pricing](https://www.itqlick.com/primavera-p6/pricing)
- [ProjectManagerTemplate — Primavera P6 cost](https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models)
- [Microsoft — Compare Project management software](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software)
- [A Guide to Cloud — Microsoft Project licensing](https://www.aguidetocloud.com/licensing/microsoft-project/)
- [The Digital Project Manager — Microsoft Project pricing](https://thedigitalprojectmanager.com/tools/microsoft-project-pricing/)
- [monday.com pricing](https://monday.com/pricing)
- [Smartsheet pricing](https://www.smartsheet.com/pricing)
- [Oracle — Primavera P6 productpagina](https://www.oracle.com/construction-engineering/primavera-p6/)

**Resellers en kanaal**
- [B-Trust (Caïro)](https://b-trust.net/oracle-primavera-software-primavera-licence/)
- [Metra Group — Oracle VAD MENA](https://metragroup.com/vendors/oracle/)
- [The Cloudors](https://www.thecloudors.com/projects/)
- [Promastar](https://www.promastar.net/about/)
- [diripro.com — Elecosoft internationale distributie](https://diripro.com/en/elecosoft-en/)

**Opleiding en prijzen**
- [Laimoon — Primavera course fees Egypt](https://courses.laimoon.com/egypt/project-management/primavera/fees)
- [Laimoon AR — Primavera Caïro](https://courses.laimoon.com/ar/egypt/cairo/project-management/primavera)
- [Kayan Academy — Planning Engineer by Primavera P6 G5](https://www.kayan-co.org/courses/planning-engineer-by-primavera-p6-g5/)
- [BECOM Academy — Primavera](https://www.becomacademy.com/primavera/)
- [eMastery Academy — Primavera (Arabisch)](https://emasteryacademy.com/courses/course?coursetitle=Primavera&id=232)
- [Primavera P6 Course Cairo (Facebook)](https://www.facebook.com/primaverap6course/)
- [FormationTunisie — Pack Chef de Projet (Primavera P6 / PMP / MS Project)](https://www.formationtunisie.com/formations/pack-management-chef-de-projet-primavera-p6-pmp-ms-project/)
- [Expert Team Tunisie — Primavera P6](https://www.expertunisie.com/oracle-primavera-p6-formation-tunisie/)
- [Tunipages Academy — Primavera P6](https://tunipages.academy/formation/primavera-p6/)
- [TMR Partners — Formation Primavera P6 Tunisie/Maroc](https://tmrpartners.com/formation-primavera-p6/)
- [New Learning Maroc — Formation planification et pilotage](https://newlearning.ma/formation-planification-et-pilotage-ms-project-primavera-etc/)
- [UPMS Algérie](https://upms.dz)
- [Business Leads Algeria — Oracle Primavera P6](https://blalgeria.com/training/details/oracle-primavera-p6)
- [ADEX Training Center — Primavera P6](https://adextraining.dz/course/Primavera%20P6)
- [AGA Academy — Formation MS Project](https://aga-dz.com/produit/formation-logiciel-ms-project/)
- [Planning Engineer — Arabische basiscursus (Primavera + Excel)](https://planningengineer.net/courses/planning-basics-course-arabic/)

**Golf, certificering, arbeidsmarkt**
- [Gulf Certifications — Primavera P6 GCC construction](https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction)
- [NaukriGulf — Primavera P6 jobs](https://www.naukrigulf.com/primavera-p6-jobs)
- [Jooble Dubai — Primavera P6](https://ae.jooble.org/jobs-primavera-p6/Dubai)
- [Jooble Saudi-Arabië — Primavera P6](https://sa.jooble.org/jobs-primavera-p6/Saudi-Arabia)
- [Bayt — Primavera P6 jobs Middle East](https://www.bayt.com/en/international/jobs/primavera-p6-jobs/)
- [Bayt AR — Primavera jobs Egypte](https://www.bayt.com/ar/egypt/jobs/primavera-jobs/)
- [Edoxi — How to become a Primavera P6 professional in Dubai](https://www.edoxi.com/studyhub/how-to-become-a-primavera-p6-professional-in-dubai)
- [Indeed VAE — Primavera P6 planning engineer jobs](https://ae.indeed.com/q-primavera-p6-planning-engineer-jobs.html)

**Salarissen**
- [PayScale — Planning Engineer Egypt](https://www.payscale.com/research/EG/Job=Planning_Engineer/Salary)
- [SalaryExpert — Planning Engineer Egypt](https://www.salaryexpert.com/salary/job/planning-engineer/egypt)
- [Indeed Egypte (Arabisch) — مهندس تخطيط](https://eg.indeed.com/career/مهندس-تخطيط/salaries)

**Diaspora en macro-economie**
- [Ahram English — 1,47 miljoen Egyptenaren in Saudi-Arabië](https://english.ahram.org.eg/NewsContent/1/1234/503272/Egypt/Foreign-Affairs/-million-Egyptians-living-and-working-in-Saudi-Ara.aspx)
- [The Expat Story — GCC expat communities (3,3 mln Egyptenaren)](https://theexpatstory.com/gcc-expat-communities-where-workers-come-from/)
- [Arab News — Egyptian remittances $32,6 mrd, 12-14 mln expats](https://www.arabnews.com/node/2600404/business-economy)
- [Centrale Bank van Egypte — remittances $29,4 mrd](https://www.cbe.org.eg)
- [Xe — USD/EGP 51,34 op 25-07-2026](https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=EGP)
- [Wise — USD/EGP 51,35](https://wise.com/gb/currency-converter/usd-to-egp-rate)
- [PIIE — Egypte devaluaties 2023/2024](https://www.piie.com/)

**Piraterij**
- [EgyptToday — BSA: Egypt software piracy 59%](https://www.egypttoday.com/Article/3/57869/BSA-Egypt-sees-software-piracy-drop-by-2)
- [Egypt Independent — software piracy drop](https://www.egyptindependent.com/egypt-witnesses-software-piracy-drop-according-to-recent-study/)
- [Broadcast Pro ME — Egypt piracy drop](https://www.broadcastprome.com/news/egypt-sees-software-piracy-drop-following-legal-reforms/)
- [U.S. Chamber IP Index 2025 — Morocco (64%)](https://www.uschamber.com/assets/documents/maps/Ipindex_25/Morocco_IPIndex-2025.pdf)
- [worldmetrics.org — Software piracy statistics](https://worldmetrics.org/software-piracy-statistics/)
- [Arab Engineering Forum — P6-thread](https://arab-eng.org/threads/506596/)
- [Engosoft LMS — installatiehulp](https://lms.engosoft.com/front/ar/help-center/article/40)

**Lokale en regionale pakketten**
- [Opteam — بديل بريمافيرا (Primavera-alternatief, Arabisch)](https://opteam.ai/ar/بديل-بريمافيرا/)
- [Crunchbase — Opteam](https://www.crunchbase.com/organization/opteam)
- [TheSaaSNews — Opteam pre-seed](https://thesaasnews.com/news/opteam-secures-pre-seed-round/)
- [Dealroom — Opteam seed](https://app.dealroom.co/news/feed/opteam-secures-seed-funding-for-ai-expansion)
- [MenaHunt — Opteam investeerders](https://menahunt.com/event/3437-opteam-secures-preseed-funding-to-revolutionize-construction-management)
- [MarocBTP — Planification](https://www.marocbtp.com/service-planification.html)
- [GestionBTP.ma](https://www.gestionbtp.ma)
- [Oasis Technocloud — Logiciel gestion chantier BTP Maroc (+ prix)](https://oasistechnocloud.com/blog/logiciel-gestion-chantier-btp-maroc/)
- [BabelERP](https://babelsoftco.com) · [Buildo](https://buildo.solutions) · [Bright ERP](https://erpbright.com.eg/arabic/contracting.php) · [Hunt ERP](https://hunt-eg.com/ar/blog/contracting-construction-erp-egypt) · [Salis ERP](https://saliserp.com/contracting-management/) · [Nodhom](https://nodhom.com/ar/ar-contracting/) · [Pioneers Solutions](https://pioneers-solutions.com/blog-erp-contracting-companies) · [BySmart](https://bysmart-soft.com) · [Microsystems Egypt](https://microsystems-eg.com/AR/Construction-and-contracting.html) · [SkySoft](https://skysft.com)
- [ClickUp Arabic — project timeline software](https://clickup.com/ar/blog/76302/project-timeline-software)

**Aanbesteding en recht**
- [Andersen Egypt — Vertaling Wet 182/2018](https://eg.andersen.com/translation-of-law-182-of-2018/)
- [Andersen Egypt — Wet 182/2018 PDF](https://eg.andersen.com/wp-content/uploads/2026/01/Law-No.-182-of-2018.pdf)
- [Ellaithy Lawyers — Samenvatting Wet 182/2018](https://ellaithylawyers.com/law-no-182-of-2018/)
- [Africa Construction Law — Egypt key features](https://africaconstructionlaw.org/egypt-key-features-of-recent-law-regulating-contracts-concluded-by-public-authorities/)
- [Shand & Partners / Lexology — Government procurement Egypt 2025](https://shandpartners.com/insights/firm-news/government-procurement-egypt-lexology-2025/)

**Ingenieurspopulatie en IT-markt**
- [UIPE — Egyptian Syndicate of Engineers, >900.000 leden](https://uipe.co.ug/)
- [Cloud4Rain — platform voor >1 miljoen ingenieurs](https://cloud4rain.com/)
- [EgyptToday — IT-markt $3,5 mrd (2025) → $9,2 mrd (2031)](https://www.egypttoday.com/Article/3/141934/Egypt's-IT-Market-to-grow-from-3-5B-in-2025)
- [Statista — IT Services Egypt $1,63 mrd (2025)](https://www.statista.com/outlook/tmo/it-services/egypt?currency=USD)
- [IMARC — Egypt ICT market $28,8 mrd (2025)](https://www.imarcgroup.com/egypt-ict-market)

---

*Rapport opgesteld 25 juli 2026. Alle `[SCHATTING]`-gemarkeerde cijfers zijn eigen redeneringen zonder bron en mogen niet als feit worden geciteerd.*
