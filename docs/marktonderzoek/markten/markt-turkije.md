# Marktonderzoek: projectplanning- en schedulingsoftware in Turkije

**Datum onderzoek:** 25 juli 2026
**Regio:** Turkije (Türkiye)
**Scope:** software voor projectplanning/scheduling met Gantt/CPM — bouwspecifiek, generiek en lokaal
**Onderzoekstaal:** Turks (primair) en Engels

> **Methodologische waarschuwing vooraf.** Er bestaat géén publieke, betrouwbare marktcijferbron voor "planningsoftware in Turkije" als afgebakende categorie. De twee commerciële rapporten die deze categorie claimen ([Statista](https://www.statista.com/outlook/tmo/software/productivity-software/construction-and-design-software/turkey), [6Wresearch](https://www.6wresearch.com/industry-report/turkey-construction-and-design-software-market)) staan volledig achter een betaalmuur — de cijfers waren niet verifieerbaar. Alle marktomvangcijfers in hoofdstuk 2 zijn daarom **eigen bottom-up schattingen**, expliciet als zodanig gemarkeerd, met de rekenstappen erbij. Wat wél hard is: licentieprijzen (van Turkse resellers), wisselkoersen, aantallen ingenieurs, aanbestedingsregels en sectorgroei — die staan met bron-URL.

---

## 1. Samenvatting

**De kern in zeven punten:**

1. **Turkije is een planningsmarkt met twee gescheiden helften.** De export-EPC-helft (45 Turkse aannemers in de ENR Top 250, $20,8 mrd internationale omzet in 2024) draait op **Oracle Primavera P6**, omdat buitenlandse opdrachtgevers dat contractueel afdwingen. De binnenlandse helft draait op **Microsoft Project** en — veel vaker — op **Excel**. Deze splitsing is de belangrijkste structurele eigenschap van de markt.

2. **De Turkse overheid dwingt géén P6 af.** Dit is het meest contra-intuïtieve onderzoeksresultaat. Artikel 17 van de *Yapım İşleri Genel Şartnamesi* (Algemene Voorwaarden Bouwwerken) verplicht de aannemer binnen 15 dagen na terreinoverdracht een goedgekeurd *iş programı* te leveren, maar **schrijft geen softwarepakket en geen bestandsformaat voor** — alleen bij "complexe werken" mág de aanbestedende dienst pakketsoftware verlangen ([bron](https://herpoz.com/mevzuat/yapim-isleri-genel-sartnamesi/madde-17)). Er is dus geen Turkse tegenhanger van de Amerikaanse/Golfstaat-praktijk van verplichte XER-oplevering. De P6-dominantie in Turkije is *geïmporteerd* via buitenlandse opdrachtgevers, niet *opgelegd* door Ankara.

3. **De B2B-kanaalprijzen zijn gedollariseerd — dat is hét valuta-effect.** Een Turkse Microsoft-CSP-reseller noteert Project Plan 3 op **$31,50/gebruiker/maand** met een leeg "—TL"-veld ernaast ([bron](https://www.microsoftkurumsal.com/urunler/microsoft-project-plan-3/)). Oracle Primavera wordt door Turkse partners in dollars geprijsd ($3.880 voor P6 Professional). **Nuance (gecorrigeerd bij verificatie):** "volledig" gedollariseerd is te sterk — Microsofts eigen Turkse winkel prijst de perpetual-desktopproducten wél in lira (Project Professional 2024 ₺61.499,99; Project Standard 2024 ₺31.399,99, [microsoft.com/tr-tr](https://www.microsoft.com/tr-tr/microsoft-365/project/microsoft-project-enterprise-plans-and-pricing)). Het is het *indirecte kanaal* (CSP-resellers, Oracle-partners) dat in dollars offreert, niet elke Turkse prijskaart. Juridisch mag dat: softwarelicenties gelden onder Besluit nr. 32 als *dienst*, en voor buitenlandse software is vreemde valuta toegestaan — alleen **binnenlands geproduceerde** software moet in TL worden gefactureerd ([bron](https://www.gureli.com.tr/sirkuler/vergi-sirkuleri-109-turkiyede-uretilen-yazilim-ve-donanimlara-iliskin-lisans-ve-hizmet-sozlesmeleri-de-dovizle-yapilamayacaktir/)).

4. **Daardoor is planningsoftware in Turkije relatief 3 à 4× zo duur als in West-Europa.** Een P6-licentie van $3.880 kost bij een koers van 47,3 TL/USD ± 183.500 TL — gelijk aan **2,5 bruto maandsalarissen** van een Turkse planningsingenieur (73.564 TL/maand, [kariyer.net 2026](https://www.kariyer.net/pozisyonlar/planlama+muhendisi/maas)). In Nederland is diezelfde licentie ongeveer 0,7 maandsalaris. Dit verklaart uitstel van aankopen, seat-sharing, en het aanhoudend hoge aandeel niet-gelicentieerd gebruik (Turkije zat historisch rond **60%** onlicensed software, tegen 43% wereldwijd — [Sabah/BSA](https://www.sabah.com.tr/teknokulis)).

5. **Excel is de grootste concurrent, niet een ander pakket.** 68% van de Turkse bouwbedrijven doet hakediş (termijnstaten) uitsluitend in Excel; de digitale-volwassenheidsindex staat op 38,4/100 landelijk, met een kloof van 4,5× tussen grote (72,8) en micro-bedrijven (14,1) ([AEC Kraft 2026](https://aeckraft.com/blog/aeckraft-insaat-sektoru-dijitallesme-raporu-2026) — *let op: dit is een synthese-rapport zonder eigen veldonderzoek, zie §2.6*).

6. **Er bestaat geen Turks CPM-pakket.** Gericht zoeken in het Turks naar een lokaal alternatief voor Primavera leverde nul resultaten op. De omvangrijke Turkse bouwsoftware-industrie (Yapıtaşı ERP, Uyumsoft, PİR Cloud, maliyetLOG, BuiltUp, Opsen, Plansizin) is volledig gespecialiseerd in **metraj/keşif/hakediş** (hoeveelheden, bestek, termijnstaten volgens de officiële ÇŞB-eenheidsprijzen) — nadrukkelijk *niet* in CPM-netwerkplanning. Dat is een open gat in de markt.

7. **De AI-planningsgeneratie is in Turkije afwezig.** ALICE Technologies, nPlan en Nodes & Links leverden bij gericht zoeken **geen enkele** Turkse referentie, reseller of vermelding op. Hetzelfde geldt grotendeels voor Safran, Deltek Open Plan, InEight en Hexagon EcoSys.

**Geschatte marktomvang (eigen schatting, zie §2 voor onderbouwing):**

| Component | Schatting per jaar (USD) |
|---|---|
| Pure licenties/abonnementen planningsoftware | **$2,4 – 5,7 mln** |
| Training | $0,4 – 1,2 mln |
| Consultancy, implementatie, planning-as-a-service, claims | $4 – 9 mln |
| **Totaal ecosysteem** | **± $7 – 16 mln (midden ≈ $11 mln)** |
| Actieve CPM-softwaregebruikers | ± 8.000 – 14.000 personen |
| Waarvan betaalde seats | ± 4.000 – 8.400 |

> **Rekencorrectie (verificatieronde).** Een eerdere versie van deze tabel noemde "$3 – 6 mln licenties" en "$8 – 16 mln totaal". Die getallen waren opgerond bóven de eigen bottom-up-optelling uit §2.5 uit: de deeltabel daar sommeert tot **$2,4 – 5,7 mln** licenties en daarmee tot **$6,8 – 15,9 mln** totaal. De middenwaarde van ≈ $11 mln blijft ongewijzigd; alleen de ondergrens is naar beneden bijgesteld. Idem voor de betaalde seats: 50–60% van 8.000–14.000 is 4.000–8.400, niet 4.500–8.000.

---

## 2. Marktomvang

### 2.1 Macro-context (harde cijfers)

| Indicator | Waarde | Jaar | Bron |
|---|---|---|---|
| BBP Turkije | ± 65 biljoen TL / **± $1,60 biljoen** *(gecorrigeerd — was $1,7 biljoen)* | 2025 | [Wereldbank via TradingEconomics](https://tradingeconomics.com/turkey/gdp) |
| BBP-groei | +3,6% *(bevestigd)* | 2025 | [TradingEconomics](https://tradingeconomics.com/turkey/gdp-growth-annual) |
| Groei bouwsector | **+10,8%** (snelst groeiende sector) | 2025 | [finanzen.com.tr](https://www.finanzen.com.tr) |
| Groei bouwsector Q1 | +7,3% | Q1 2025 | [TÜİK](https://data.tuik.gov.tr) |
| Groei bouwsector Q2 | +10,9% (TradingEconomics noteert +11,1%) | Q2 2025 | [insaatdunyasi.com.tr](https://www.insaatdunyasi.com.tr) / [TradingEconomics](https://tradingeconomics.com/turkey/gdp-growth-annual) |
| Groei bouwsector Q3 / Q4 | +13,9 à 14,1% / +8,6% | 2025 | [TradingEconomics](https://tradingeconomics.com/turkey/gdp-growth-annual) |
| Bouwuitgaven Q2 | 2,29 biljoen TL (+48,1% nominaal) | Q2 2025 | [insaatdunyasi.com.tr](https://www.insaatdunyasi.com.tr) |
| BBP per hoofd | $18.040 | 2025 | [gazetekritik.com](https://www.gazetekritik.com) |
| ICT-markt totaal | 2.129,3 mrd TL = **$53,8 mrd** (+77% TL, +47% USD) | 2025 | [TÜBİSAD](https://www.tubisad.org.tr) / [marjinal.com.tr](https://marjinal.com.tr) |
| USD/TRY | laag 42,971 (1 jan) – hoog **47,343** (24 juli) – gem. 44,933 | 2026 YTD | [ValutaFX](https://www.valutafx.com/history/usd-try-2026) |

### 2.2 De internationale aannemerij — de motor achter P6

| Indicator | Waarde | Jaar | Bron |
|---|---|---|---|
| Turkse firma's in ENR Top 250 International Contractors | **45** (2e plaats na China met 76) | 2025-lijst | [T.C. Ticaret Bakanlığı](https://ticaret.gov.tr/haberler/enr-2025-listesinde-rekor-basari) |
| Internationale omzet van die 45 firma's | **$20,8 mrd** | 2024 | idem |
| Aandeel in totale Top-250-omzet | 4,2% (9e plaats naar waarde) | 2024 | idem |
| Turkse firma's in Top 100 / Top 50 | 8 / 2 | 2025 | idem |
| Nieuw verworven buitenlandse projecten | **$28,6 mrd** | 2024 | [TMB](https://v2.tmb.org.tr/tr/n/679bbf83d4824408abc5108e/yurt-disi-muteahhitlik-ve-teknik-musavirlik-hizmetleri-degerlendirme-toplantisi-30-ocak-2025) |
| Nieuw verworven buitenlands, H1 | $6,2 mrd (93 projecten) | H1 2025 | [memurlar.net](https://www.memurlar.net/haber/1140091/) |
| Cumulatief sinds 1972 | 12.627 projecten, **$543,6 mrd**, 137 landen | t/m juli 2025 | [ekoturk.com](https://www.ekoturk.com/haberler/turk-muteahhitlerden-yurt-disinda-dev-atak-137-ulkede-543-milyar-dolarlik-turkiye-imzasi/) |

**Top-aannemers 2025 (ENR-positie):** ENKA (46), Rönesans (50), Limak (61), Çalık Enerji (63), Esta (72) ([tebanews.com.tr](https://tebanews.com.tr), [insaatderyasi.com](https://insaatderyasi.com)).

**Belangrijkste exportmarkten (cumulatief 1972-2025):** Rusland (18,9% van alle projecten), Turkmenistan, Irak, Saoedi-Arabië, Libië. Recente groeimarkten: VAE, Saoedi-Arabië, Oeganda, Gabon, Algerije.

> **Waarom dit ertoe doet voor planningsoftware:** in vrijwel al deze markten — Golfstaten, Irak, Centraal-Azië, Noord-Afrika — is de opdrachtgever een olie-/gas-/infrastructuurentiteit of een internationaal PMC-bureau dat Primavera P6 als contractvereiste stelt, inclusief XER-oplevering, resource-loading en earned value. De P6-vraag in Turkije is dus vraag-gedreven vanuit het buitenland.

### 2.3 De gebruikersbasis

| Indicator | Waarde | Jaar | Bron |
|---|---|---|---|
| Leden İnşaat Mühendisleri Odası (İMO, civiel ingenieurs) | **164.234** (+2,36%) | 2026 | [thesantiye.com](https://thesantiye.com) |
| Idem vorig jaar | 160.455 | 2025 | idem |
| TMMOB totaal (24 kamers) | 705.792 | eind 2024 | [TMMOB](https://www.tmmob.org.tr) |
| Openstaande vacatures "planlama mühendisi" | 241+ | juli 2026 | [Jooble TR](https://tr.jooble.org/iş-ilanları-planlama-mühendisi) |
| Openstaande vacatures "proje planlama mühendisi" | 464+ | juli 2026 | [Jooble TR](https://tr.jooble.org/iş-ilanları-proje-planlama-mühendisi/Türkiye) |

**Salarissen planningsingenieur (2026), sterk uiteenlopend per bron:**

| Bron | Gemiddeld bruto/maand | Bandbreedte |
|---|---|---|
| [kariyer.net](https://www.kariyer.net/pozisyonlar/planlama+muhendisi/maas) | 73.564 TL (2025: 63.625 TL) | — |
| [kariyer.net — proje planlama](https://www.kariyer.net/pozisyonlar/proje+planlama+muhendisi/maas) | 63.900 TL | — |
| [eleman.net](https://www.eleman.net/meslek/planlama-muhendisi/maas) | 54.900 TL (2025: 40.400 TL) | 38.300 – 93.500 TL |
| [istemulakat.com](https://istemulakat.com/meslek/planlama-muhendisi/maaslari) | 51.229 TL (n=59) | — |
| [secretcv.com](https://www.secretcv.com/pozisyon-rehberi/planlama-muhendisi/maas) | 42.167 TL | 30.167 – 84.333 TL |

Bij 47,3 TL/USD komt dat neer op circa **$890 – $1.555 bruto per maand**.

### 2.4 Eigen schatting: aantal gebruikers — SCHATTING

> **Dit is een eigen schatting.** Geen enkele bron publiceert het aantal Primavera- of MS Project-gebruikers in Turkije. Hieronder de redenering, laag voor laag.

**Laag A — internationale EPC-planners.**
45 ENR-firma's realiseerden $20,8 mrd internationale omzet (2024). Op EPC-werk met volledige project controls ligt de planningsbezetting doorgaans op 1 planner per $8–15 mln jaaromzet. Bij $12 mln per planner: **± 1.700 planners**. Dit zijn vrijwel allemaal P6-gebruikers.

**Laag B — binnenlandse projecten met formele CPM.**
Bouwuitgaven Q2 2025 waren 2,29 biljoen TL; geannualiseerd ± 9,2 biljoen TL.

> **Wisselkoerscorrectie (verificatieronde).** Een eerdere versie rekende dit om tegen "± 45 TL/USD" en kwam op $195–205 mrd. Die koers lag **buiten de hele koersband van 2025**: volgens de eigen ValutaFX-reeks in §2.1 stond USD/TRY op 1 januari 2026 nog op 42,971, dus geen enkele dag in 2025 kende een koers van 45. De juiste omrekening gebruikt de gemiddelde koers van 2025 (± 40 TL/USD) → **± $225–235 mrd**. Ook geldt: één kwartaal × 4 annualiseren is methodisch zwak (Q2 is een piekkwartaal en groeide +48,1% nominaal bij hoge inflatie) — behandel dit als ordegrootte, niet als meting.

Het overgrote deel is woningbouw en kleine infra zonder netwerkplanning — 68% van de bedrijven doet zelfs hakediş nog volledig in Excel. Aanname: 10–15% van de binnenlandse bouwuitgaven zit op projecten met een echt CPM-schema → **$23–35 mrd**, bij een lagere planningsintensiteit van 1 planner per $15–25 mln → rekenkundig 900–2.350, aangehouden als **± 1.000–2.000 planners** (bewust niet de uiterste hoeken van de bandbreedte gestapeld).

**Laag C — opdrachtgevers, ingenieurs- en müşavirlik-bureaus, industrie.**
Publieke opdrachtgevers (KGM/Karayolları, DSİ, TCDD, TOKİ, ministeries), energie- en defensie-industrie (Aselsan, TPAO, Alp Havacılık — allemaal bekende Primavera-referenties, zie §3.1), scheepsbouw, en de advies-/müşavirlik-sector. **± 1.500–3.000 gebruikers**, gemengd P6/MS Project.

**Laag D — de lange staart.**
Ingenieurs die incidenteel MS Project openen voor een balkenschema, docenten en studenten, ZZP-planners, kleine aannemers. Dit is verreweg de grootste groep in koppen maar de kleinste in omzet. **± 4.000–8.000**.

**Totaal: ± 8.000 – 14.000 actieve gebruikers van CPM-/Gantt-software in Turkije (midden ≈ 11.000).**
Waarvan "serieuze" dagelijkse CPM-gebruikers: **± 3.000 – 4.500**.

### 2.5 Eigen schatting: marktomvang in geld — SCHATTING

**Stap 1 — betaalde seats.**
Turkije kende historisch een onlicensed-softwarepercentage van ± 60% ([Sabah/BSA, 2014](https://www.sabah.com.tr/teknokulis); [Cumhuriyet](https://www.cumhuriyet.com.tr/haber/turkiyede-her-100-yazilimdan-60i-korsan-564609); 64–66% in 2003–2008 volgens [BT Dünyası](https://btdunyasi.net)). Voor dure B2B-engineeringsoftware ligt de nalevingsgraad hoger dan het landgemiddelde — grote aannemers met buitenlandse opdrachtgevers worden geaudit en kunnen zich geen licentierisico veroorloven. MKB, individuele planners en studenten kopen structureel niet. Aanname: **50–60% van de actieve gebruikers zit op een betaalde seat** → **4.000 – 8.400 betaalde seats** (midden ≈ 6.200). *(Gecorrigeerd: 50% × 8.000 = 4.000 en 60% × 14.000 = 8.400; de eerdere "4.500 – 8.000" volgde niet uit de eigen aanname.)*

> **Bronvoorbehoud bij de 60%.** Het BSA-cijfer van 60% betreft meetjaar 2013 (publicatie 2014). BSA is na de editie van 2018 (meetjaar 2017) gestopt met de Global Software Survey, dus er bestaat **geen cijfer na 2017**; de Turkse Wikipedia noemt zonder jaartal 64%. Een schatting voor 2026 op een twaalf jaar oud percentage bouwen is de zwakste schakel in deze berekening — behandel de seat-ratio als aanname, niet als gemeten.

**Stap 2 — verdeling en jaaromzet per pakket.**

| Pakket | Geschatte betaalde seats | Gerealiseerde kosten/seat/jaar* | Jaaromzet (schatting) |
|---|---|---|---|
| Oracle Primavera (P6 Pro/EPPM/Cloud + Unifier/Risk) | 2.000 – 3.000 | $700 – 1.400 | **$1,7 – 3,6 mln** |
| Microsoft Project (Plan 1/3/5 + perpetual) | 3.000 – 5.000 | $150 – 350 | **$0,6 – 1,6 mln** |
| Overige (Asta, TILOS, SYNCHRO, Safran, Spider, generieke SaaS ingezet voor planning) | 300 – 800 | $200 – 800 | **$0,1 – 0,5 mln** |
| **Totaal licenties** | **± 6.000** | | **$2,4 – 5,7 mln** |

\* *Gerealiseerd, niet lijstprijs.* Perpetual P6 ($3.880) afgeschreven over 5 jaar = $776/jaar, plus 22% onderhoud ($854/jaar) = $1.630 op lijstprijs; Oracle-kortingen van 30–50% op volume brengen dat naar $800–1.150. Primavera Cloud is met $305/maand ($3.660/jaar) veel duurder maar heeft weinig seats in Turkije door de minimumafname van 25 gebruikers ($91.500/jaar instapdrempel).

**Stap 3 — diensten.**
- **Training:** ± 15 aanbieders (zie §4.5). Schatting 1.500–3.000 cursisten/jaar à $150–500 → **$0,4 – 1,2 mln**.
- **Consultancy, implementatie, planning-as-a-service, claims/vertragingsanalyse:** 3 gespecialiseerde Oracle-partners (PRM, Akım, PYBS) plus circa een dozijn boutiques (Mantis PM, Loop, PrimePMO, Tanplan, Yaka Danışmanlık) en zelfstandige planners. Schatting **$4 – 9 mln**.

**Stap 4 — totaal.**

> **SCHATTING: het totale Turkse ecosysteem voor planning-/schedulingsoftware bedraagt ± $7 – 16 mln per jaar, met een middenwaarde van ongeveer $11 mln. Daarvan is $2,4 – 5,7 mln pure software-omzet; de rest is dienstverlening.**

*Optelling: licenties $2,4–5,7 mln + training $0,4–1,2 mln + diensten $4–9 mln = **$6,8 – 15,9 mln**. De eerder gepubliceerde ondergrens van $8 mln volgde niet uit deze som en is gecorrigeerd naar ± $7 mln.*

**Groei — SCHATTING:** de bouwsector groeide 10,8% reëel in 2025 en de ICT-markt 47% in USD, maar planningsoftware is FX-geremd: elke devaluatie maakt de dollarprijs onbetaalbaarder en duwt gebruikers naar Excel of naar niet-gelicentieerd gebruik. Realistische USD-groei: **5–10% per jaar**, met sterke volatiliteit gekoppeld aan de lira en aan de orderportefeuille in het buitenland.

### 2.6 Cross-checks op de schatting

| Check | Uitkomst | Oordeel |
|---|---|---|
| Aandeel in Turkse ICT-markt ($53,8 mrd, 2025, [TÜBİSAD](https://www.tubisad.org.tr)) | 0,02 – 0,03% | Plausibel voor een smalle verticale niche |
| Aandeel in wereldwijde construction-management-softwaremarkt — **peiljaar aangepast**: Kings Research geeft $9,67 mrd (2023) én $10,52 mrd (2024) bij 10,12% CAGR, wat voor 2026 uitkomt op ± **$12,8 mrd** ([Kings Research](https://www.kingsresearch.com/construction-management-software-market-146)) | **0,06 – 0,13%** *(was 0,08–0,17% op de verouderde 2023-basis)* | Plausibel: Turkije is ± 1% van het wereld-BBP maar heeft een veel lagere software-uitgaveintensiteit door FX en piraterij |
| Vergelijking met "Turkey Construction Technology Market: $51,42 mln (2024)" ([MarketStrides](https://marketstrides.com/omega/insights/construction-technology-market/turkey)) | onze $7–16 mln ≈ 14–31% daarvan | Plausibel als planning ± een vijfde van alle bouw-tech is; *let op: MarketStrides is een syndicated-rapportaanbieder van lage verifieerbaarheid, gebruik alleen als ordegrootte* |
| Omzet per betaalde seat | ± $650/jaar gemiddeld over alle pakketten | Consistent met een markt waarin het goedkopere MS Project in koppen domineert |

### 2.7 Het digitaliseringsbeeld (met bronvoorbehoud)

Het [AEC Kraft Digitalisatierapport 2026](https://aeckraft.com/blog/aeckraft-insaat-sektoru-dijitallesme-raporu-2026) geeft de meest gedetailleerde Turkse cijfers die publiek beschikbaar zijn:

| Metriek | Waarde |
|---|---|
| Digitale Volwassenheidsindex (DMI), landelijk | 38,4 / 100 |
| DMI groot (250+ mdw) / midden (50-250) / klein (5-50) / micro (1-5) | 72,8 / 53,4 / 31,7 / 14,1 |
| Digitale kloof groot vs. micro | 4,5× |
| BIM-gebruik groot / midden / klein / micro | 94% / 52% / 18% / 4% |
| Hakediş uitsluitend in Excel | **68%** |
| Hakediş op digitaal platform / hybride | 19% / 13% |
| Projectmanagement-modulepenetratie bij grote bedrijven | 96% |
| Mobiele veld-app-adoptie 2024 → 2026 | 24% → 47% |

> ⚠️ **Bronvoorbehoud:** AEC Kraft geeft zelf aan dat dit een *synthese* is van TÜİK-statistiek, brancheorganisatiedata (TMB, Kamer van Architecten), KOSGEB-rapporten en geanonimiseerde eigen platformdata — **zonder onafhankelijk veldonderzoek**, met externe verificatie pas gepland voor de editie 2027. Behandel deze percentages als indicatief, niet als gemeten. De richting (Excel domineert, enorme kloof groot/klein) wordt wel bevestigd door de bredere signalen: het [TMB Digitale Transformatie Topverslag (oktober 2025)](https://tmb.org.tr/uploads/publications/68f87f4d4171c42cf398ed08/1761115964699-idd-sonuc-raporu-ekim-2025.pdf) spreekt over "ciddi engeller" (ernstige belemmeringen) bij digitale transformatie.

---

## 3. Gebruikte software: marktpositie en prijzen

### 3.1 Oracle Primavera P6 — marktleider in het topsegment

**Positie: #1 in waarde, #2 in aantal gebruikers.** Het onbetwiste standaardpakket voor grote aannemers, EPC-werk, energie, defensie en alle export-projecten. Turkse vacatureteksten noemen P6 standaard als eerste: Nurol İnşaat vraagt om "*Primavera P6 veya MS Project kullanarak proje iş programlarının hazırlanması*" ([kariyer.net](https://www.kariyer.net/is-ilani/nurol-insaat-ve-ticaret-a-s-planlama-muhendisi-4363367)); het planningsbureau Tanplan omschrijft zichzelf als "*başta Primavera P6 olmak üzere...*" (in de eerste plaats Primavera P6) ([LinkedIn](https://tr.linkedin.com/jobs/view/planlama-mühendisi-4350781822)).

**Bekende Turkse referenties** (via partner PYBS/PRM): TPAO/TPOTC, Alp Havacılık, **Tekfen**, **Aselsan**, **ENKA**, **Doğuş** ([pybs.com](https://www.pybs.com/tr/prm-kurumsal)) — d.w.z. olie & gas, defensie/lucht- en ruimtevaart, en de grootste aannemers.

**Prijzen (Turkse resellers, USD, juni 2025):**

| Product | Prijs | Type | Bron |
|---|---|---|---|
| P6 Professional | **$3.880** | perpetual, named/application user, on-prem | [PRM](https://prmyazilim.com/en/primavera-p6-pricing), [Akım](https://www.akimeng.com/oracle-primavera-price-list.html) |
| P6 Professional — 1e jaar support | $854 (= 22%) | jaarlijks | [PRM](https://prmyazilim.com/en/primavera-p6-pricing) |
| P6 Enterprise (EPPM) | **$4.240** | perpetual, named user | [PRM](https://prmyazilim.com/en/primavera-p6-pricing), [Akım](https://www.akimeng.com/oracle-primavera-price-list.html) |
| P6 Enterprise — 1e jaar support | $933 (= 22%) | jaarlijks | [PRM](https://prmyazilim.com/en/primavera-p6-pricing) |
| **Primavera Cloud** | **$305/gebruiker/maand, minimaal 25 gebruikers** | abonnement, support inbegrepen | [PRM](https://prmyazilim.com/en/primavera-p6-pricing) |
| Primavera Risk Analysis | $10.450 | perpetual | [Akım](https://www.akimeng.com/oracle-primavera-price-list.html) |
| P6 Progress Reporter | $1.460 | perpetual | [Akım](https://www.akimeng.com/oracle-primavera-price-list.html) |

**Omgerekend naar TL (koers 47,3 TL/USD, juli 2026):**
- P6 Professional: **± 183.500 TL** eenmalig + **± 40.400 TL/jaar** onderhoud
- P6 Enterprise: ± 200.600 TL + ± 44.100 TL/jaar
- Primavera Cloud: ± 14.400 TL/gebruiker/maand, minimale jaarafname **± 4,33 mln TL** (25 × $305 × 12) — voor de meeste Turkse bedrijven prohibitief

**Kortingen:** Oracle-volumekortingen van 30–50% zijn gebruikelijk bij enterprise-deals; Turkse partners onderhandelen die namens klanten. Geen publieke prijslijst met kortingsstaffels.

**Voordelen (Turkse context):** contractueel vereist in exportmarkten; ondersteunt multi-project/portfolio, resource- en kostenloading, earned value en XER-uitwisseling; grote lokale expertisepool; sterke lokale partners met 20-30 jaar ervaring.
**Nadelen:** de dollarprijs is bij een lira-koers van 47 een echte barrière; steile leercurve die verplichte training vereist; Cloud-minimum van 25 gebruikers sluit MKB volledig uit; Oracle-audits vormen een reëel risico voor bedrijven die seats delen.

### 3.2 Microsoft Project — marktleider in aantallen

**Positie: #1 in aantal gebruikers, #2 in waarde.** Het standaardgereedschap voor binnenlandse projecten, middelgrote aannemers, ingenieursbureaus, de industrie en overal waar de opdrachtgever niets specifieks eist. De Turkse vakliteratuur is hierover eenduidig: "*Küçük projelerde Microsoft Project, büyük projelerde Primavera P6 kullanılır*" — kleine projecten MS Project, grote projecten P6 ([Gezgin Şantiyeci](https://gezginsantiyeci.com/primavera-p6-microsoft-project/)). Ook [sanalsantiye.com](https://sanalsantiye.com) plaatst in "de 14 programma's die elke civiel ingenieur moet kennen" Primavera bij multi-project werk en MS Project bij "enkelvoudige, eenvoudigere projecten".

**Prijzen (Turkse Microsoft CSP-reseller, USD, excl. btw):**

| Plan | Prijs | Bron |
|---|---|---|
| Planner Plan 1 | **$12,00/maand** | [microsoftkurumsal.com](https://www.microsoftkurumsal.com/urunler/microsoft-project-plan-3/) |
| Project Plan 3 (desktop Project + Planner) | **$31,50/gebruiker/maand** | idem |
| Project Plan 5 (+ portfolio, demand mgmt, analytics) | **$66,00/maand** | idem |
| Project Professional 2024 | **₺61.499,99** eenmalig (VS: $1.129,99) — *gecorrigeerd, prijs wél gepubliceerd door Microsoft zelf* | [microsoft.com/tr-tr](https://www.microsoft.com/tr-tr/microsoft-365/project/microsoft-project-enterprise-plans-and-pricing), [microsoft.com/en-us](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software) |
| Project Standard 2024 | **₺31.399,99** eenmalig (VS: $679,99) — *toegevoegd bij verificatie* | idem |

Internationale referentieprijzen liggen lager: Microsoft publiceert zelf Planner Plan 1 op **$10,00** en Planner and Project Plan 3 op **$30,00** per gebruiker per maand bij jaarabonnement ([microsoft.com](https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner-pricing)); Plan 5 staat internationaal op $55.

> **Interpretatiecorrectie (verificatieronde).** Het verschil is grotendeels **géén Turkse resellermarge**. Microsoft rekent standaard ± 20% opslag voor maandelijkse in plaats van jaarlijkse verplichting, en de Turkse noteringen zijn daar exact gelijk aan: $12,00 = 1,20 × $10,00 (Plan 1) en $66,00 = 1,20 × $55,00 (Plan 5). Alleen Plan 3 wijkt af: $31,50 is +5% op de jaarprijs van $30,00 en past bij géén van beide Microsoft-tarieven ($30 jaar / $36 maand). De conclusie "5–20% resellermarge" moet dus worden teruggebracht tot: **hooguit enkele procenten opslag op Plan 3; de rest is Microsofts eigen maand-versus-jaartarief.**

**Cruciale observatie:** de Turkse resellerpagina toont "$31,50 /kullanıcı/ay" met daarnaast een leeg **"—TL"**-veld. De TL-prijs wordt dus niet eens meer gepubliceerd; er wordt bij facturering omgerekend tegen dagkoers. Bij 47,3 TL/USD is Plan 3 ± **1.490 TL/gebruiker/maand** — ongeveer 2% van een bruto planningsingenieurssalaris per maand, tegen ± 0,6% in West-Europa.

**Voordelen:** laag instapniveau, snel te leren, Office-integratie, ruime beschikbaarheid van Turkstalig lesmateriaal, veruit de laagste kosten per seat.
**Nadelen:** zwakker in multi-project/portfolio en resource-nivellering; wordt door buitenlandse opdrachtgevers vaak niet geaccepteerd als contractueel schema; de maandelijkse dollarabonnementskosten worden bij lira-devaluatie een terugkerende pijn (in tegenstelling tot een eenmalige perpetual aankoop).

### 3.3 Excel — de facto nummer één in volume

**Positie: het feitelijk meest gebruikte "planningsgereedschap" van het land.** 68% van de bedrijven doet hakediş uitsluitend in Excel ([AEC Kraft](https://aeckraft.com/blog/aeckraft-insaat-sektoru-dijitallesme-raporu-2026), zie bronvoorbehoud §2.6). Ook bij bedrijven mét P6 is Excel de rapportagelaag: er bestaat een levendig Turks genre van artikelen over het exporteren van P6/MS Project-data naar Excel voor analyse ([LinkedIn: "PrimaVera P6 *.xer Dosyadan Veri Alma Örneği"](https://www.linkedin.com/pulse/primavera-project-planner-p6-xer-dosyadan-veri-alma-örneği-ulusaraç-1skuf)); Udemy TR biedt zelfs cursussen "P6 met Excel voor budgetanalyse".

**Prijs:** effectief nul bovenop een bestaande Microsoft 365-licentie. Dit is de kostenbenchmark waar elk betaald pakket in Turkije tegenaan botst.

### 3.4 Overige internationale pakketten — marginaal

| Pakket | Aanwezigheid in Turkije | Bewijs |
|---|---|---|
| **Elecosoft Asta Powerproject** | Marginaal; alleen via consultancy. Mantis PM noemt Asta expliciet in zijn dienstenaanbod | [pmantis.com](https://pmantis.com/is-programi-danismanligi/) |
| **Trimble TILOS** (lijn-/locatieplanning) | Marginaal; idem via Mantis PM. Relevant voor de vele Turkse spoor-/wegprojecten maar zonder lokale reseller gevonden | [pmantis.com](https://pmantis.com/is-programi-danismanligi/) |
| **Bentley SYNCHRO** (4D) | Geen Turkse reseller of referentie gevonden. Logisch gevolg van de lage BIM-volwassenheid buiten de grote bedrijven (94% groot vs. 4% micro) | geen bron gevonden |
| **ALICE Technologies** | **Nul** Turkse vermeldingen gevonden | gerichte zoekactie leverde "no results" |
| **nPlan** | **Nul** Turkse vermeldingen | idem |
| **Nodes & Links** | **Nul** Turkse vermeldingen | idem |
| **Safran Project** | Geen Turkse aanwezigheid gevonden (zoekresultaten domineerden door het Franse Safran S.A.) | geen bron gevonden |
| **Deltek Open Plan** | Geen Turkse aanwezigheid gevonden | geen bron gevonden |
| **InEight** | Geen Turkse aanwezigheid gevonden | geen bron gevonden |
| **Hexagon EcoSys** | Geen Turkse aanwezigheid gevonden | geen bron gevonden |
| **RIB Candy / iTWO** | Geen Turkse aanwezigheid gevonden | geen bron gevonden |
| **Spider Project** | Geen Turkse aanwezigheid gevonden (ondanks de Russische marktband — Rusland is de grootste exportmarkt van Turkse aannemers) | geen bron gevonden |

> **Interpretatie:** de Turkse markt is uitzonderlijk geconsolideerd rond twee leveranciers. Waar in Noordwest-Europa Asta en TILOS substantiële nissen bezetten, en in de VS Deltek/InEight/EcoSys, is er in Turkije feitelijk P6, MS Project, en verder niets van betekenis. De verklaring is economisch: bij een gedollariseerde prijs en een gedevalueerde lira loont het niet om een derde pakket te introduceren zonder de contractuele dwang die P6 wél heeft.

### 3.5 Generieke werkbeheertools — aanwezig, maar niet als CPM-vervanger

monday.com, Smartsheet, Wrike, Asana, Jira, Zoho en ClickUp zijn in Turkije beschikbaar en worden verkocht, maar **uitsluitend via self-service**: gericht zoeken naar Turkse resellers/bayi's leverde er geen op. monday.com heeft wel een Turkstalige prijspagina ([monday.com/lang/tr/pricing](https://monday.com/lang/tr/pricing/)); ClickUp doet actief Turkstalige contentmarketing rond "iş programı uygulamaları" ([clickup.com/tr](https://clickup.com/tr/blog/71313/ish-programi-uygulamalari)).

**Positie:** deze tools worden in Turkije gebruikt voor takenbeheer en samenwerking bij vastgoedontwikkeling, IT en kantoorprojecten — **niet** voor het contractuele iş programı van een bouwproject. Ze voldoen niet aan de CPM-/resource-/EVM-eisen die een opdrachtgever stelt en hebben geen XER-uitwisseling. Ze concurreren met Excel, niet met P6.

### 3.6 Open source — nauwelijks zichtbaar in het Turks

ProjectLibre, GanttProject en OpenProject zijn technisch beschikbaar en worden internationaal gepositioneerd als "#1 alternative to Microsoft Project" (ProjectLibre, 7,8-8,4 mln downloads in 193 landen — [SourceForge](https://sourceforge.net/projects/projectlibre/), [Wikipedia](https://en.wikipedia.org/wiki/Projectlibre)). Gericht zoeken in het Turks leverde echter **geen Turkstalige content, community of adoptiebewijs** op — alle resultaten waren Engelstalig.

**Interpretatie — SCHATTING:** dit is opmerkelijk, want in een markt met deze prijsdruk zou open source logischerwijs moeten floreren. De waarschijnlijke verklaring is dat de goedkope uitweg in Turkije niet open source is maar (a) Excel en (b) niet-gelicentieerd MS Project/P6. Waar men in andere landen naar ProjectLibre grijpt, grijpt men in Turkije naar een gekraakte kopie van het pakket dat de opdrachtgever tóch al eist. **Dit is een gat in de markt voor een gratis/goedkope, Turkstalige, XER-compatibele CPM-tool.**

### 3.7 Lokale Turkse bouwsoftware — een parallelle, niet-overlappende markt

Turkije heeft een substantiële eigen bouwsoftware-industrie. Deze is echter volledig gespecialiseerd in **metraj (hoeveelheden), keşif (bestek/raming) en hakediş (termijnstaten)** op basis van de officiële eenheidsprijzen van het Ministerie van Milieu, Urbanisatie en Klimaatverandering (ÇŞB) — niet in CPM-netwerkplanning.

| Product | Leverancier/URL | Focus |
|---|---|---|
| **Yapıtaşı ERP** | [yapitasierp.com](https://www.yapitasierp.com/tr/pages/yapitasi_erp) | Volledige bouw-ERP: business development, planning, uitvoering, financiën |
| **Uyumsoft Şantiye/İnşaat** | [uyumsoft.com](https://www.uyumsoft.com/santiye-insaat-takip-programi) | Geïntegreerd: bouw, woningverkoop, hakediş, inkoopplanning |
| **PİR Cloud** | [pircloud.com](https://www.pircloud.com/insaat-yazilimi-insaat-proje-yonetim-programi/) | Claimt "Turkije's eerste online bouwsoftware" (2010); project- en budgetbeheer |
| **maliyetLOG** | [maliyetlog.com](https://www.maliyetlog.com) | Metraj + hakediş "10× sneller", officiële eenheidsprijzen |
| **Plansizin** | [plansizin.com](https://www.plansizin.com) | 2026 YFK-eenheidsprijzen, kostencalculatie, mobiele dagrapportage, hakediş |
| **BuiltUp®** | [builtup.com.tr](https://builtup.com.tr) | Şantiye-tracking: hakediş, verkoop, CRM, voorraad, personeel |
| **Opsen** | [useopsen.com](https://useopsen.com/insaat-yonetim-programi) | ERP: metraj, hakediş, *iş programı*, inkoop, budgettering — gratis instap |
| **Demsoft** | [demsoftyazilim.com](https://demsoftyazilim.com/proje-yonetimi-programi.html) | Projectgebonden hakediş, kosten, planning, voorraad, onderaannemers |
| **Orca Software** | [orcasoftware.com.tr](https://orcasoftware.com.tr) | Projectvolgsoftware voor bouwbedrijven |
| **AEC Kraft** | [aeckraft.com](https://aeckraft.com) | Metraj-vergelijkingsplatform + sectorrapportage |

**Voor- en nadelen van de lokale pakketten (eigen beoordeling op basis van productdocumentatie en positionering):**

*Voordelen:*
- Volledig afgestemd op Turkse regelgeving: ÇŞB/YFK-eenheidsprijzen, hakediş-formats, KDV, KVKK — iets wat geen enkel buitenlands pakket biedt.
- Turkstalige interface en support; lokale telefonische helpdesk.
- **Prijsstelling in TL**, wat ze immuun maakt voor het FX-probleem dat P6 en MS Project teistert. Dit is hun belangrijkste structurele voordeel.
- Cloud/SaaS met lage instapdrempel, soms gratis (Opsen).
- Sterk in mobiele veldrapportage — het snelst groeiende adoptiegebied (24% → 47% tussen 2024 en 2026).

*Nadelen:*
- **Geen serieuze CPM-motor.** Waar "iş programı" wordt genoemd (Opsen, Demsoft) gaat het om balkenschema's en voortgangsregistratie, niet om echte netwerkplanning met kritieke-pad-berekening, float-analyse, kalenders en resource-nivellering.
- **Geen XER/MPP-interoperabiliteit**, waardoor ze onbruikbaar zijn zodra een opdrachtgever een schema in P6-formaat verlangt — precies de situatie op alle exportprojecten.
- Geen internationale erkenning; niet inzetbaar op buitenlandse projecten, terwijl dát juist het domein is waar Turkse aannemers hun geld verdienen.
- Fragmentatie: tien-plus aanbieders in een relatief kleine markt, met bijbehorende twijfel over levensvatbaarheid op lange termijn.
- Weinig onafhankelijke reviews of gebruikersfora vindbaar — de informatie komt vrijwel volledig van de leveranciers zelf, wat objectieve beoordeling bemoeilijkt.

> **Belangrijkste conclusie van dit hoofdstuk:** Turkse bouwsoftware en internationale planningsoftware overlappen nauwelijks. Een Turkse aannemer koopt beide: een lokaal pakket voor hakediş en metraj (in TL), en P6 of MS Project voor het schema (in USD). Er is geen enkele leverancier die beide bedient.

---

## 4. Lokale bijzonderheden

### 4.1 Aanbestedings- en contracteisen: géén verplichte P6

Dit is het meest opvallende resultaat van het onderzoek en het corrigeert een gangbare aanname.

**Artikel 17 van de Yapım İşleri Genel Şartnamesi** (Algemene Voorwaarden voor Bouwwerken, onder Wet 4735) bepaalt:

- De aannemer moet **binnen 15 dagen** na terreinoverdracht (*yer teslimi*) een iş programı ter goedkeuring indienen bij de aanbestedende dienst ([herpoz.com](https://herpoz.com/mevzuat/yapim-isleri-genel-sartnamesi/madde-17); volledige tekst als [PDF](https://www.hakedis.org/wp-content/uploads/2020/02/yapim-isleri-genel-sartnamesi-20191102.pdf)).
- Het programma moet aansluiten op de voorbeelden van de dienst, de betalingsvoorwaarden van het contract, en de kwaliteit/technische eigenschappen/uitvoeringstermijnen van het werk.
- "*İş programları idarenin onayıyla geçerli olur*" — het programma is pas geldig ná goedkeuring, die met wijzigingen kan worden verleend ([kilichukuk.org](https://www.kilichukuk.org/Sozluk/is-programinin-teslimi-yapim-isleri)).
- **GECORRIGEERD — de boete is niet gelijk aan de opleverboete.** De originele verordeningstekst bepaalt: bij afkeuring krijgt de aannemer eerst **eenmalig vijf dagen extra zonder boete** ("bir defaya mahsus olmak üzere ceza uygulamaksızın, beş gün süre verilir"), en pas daarna geldt per dag vertraging een boete ter grootte van **10% van** de contractuele dagelijkse vertragingsboete ("günlük gecikme cezasının **%10'u** oranında ceza uygulanır"). Een eerdere versie van dit rapport stelde dat de boete gelijk was aan de opleverboete; dat is een factor 10 te hoog. Geverifieerd op de originele PDF van het Ministerie van Milieu en Verstedelijking ([ÇŞB Çorum, Madde 17, lid 1](https://webdosya.csb.gov.tr/db/corum/icerikler/yapim-genel-sartname-20231030133116.pdf)).
- Bij een goedgekeurde termijnverlenging, hoeveelheidswijziging of nieuwe prijsvaststelling moet binnen **zeven dagen** een herzien iş programı worden ingediend (Madde 17 lid 7) — *toegevoegd bij verificatie*.
- **Voor omvangrijke werken ("kapsamlı işler")** mag de dienst verlangen dat het programma wordt opgesteld met "paket yazılım iş programı veya ... bilgisayar destekli iş programı" in plaats van een balkendiagram (*çubuk diyagram*) — Madde 17 lid 5, letterlijk bevestigd in de originele tekst. Let op de exacte formulering: *kapsamlı* betekent "omvangrijk/uitgebreid", niet per se "complex".

**Wat er níét in staat:** geen genoemd softwarepakket, geen verplicht bestandsformaat, geen XER-eis, geen CPM-verplichting voor gewone werken. De 15-dagentermijn is de scherpste eis; het *instrument* is vrij.

**Praktisch gevolg:** voor binnenlandse overheidswerken volstaat een MS Project-balkenschema of zelfs een Excel-gantt in veel gevallen. De 15-dagentermijn creëert wel een acute vraag naar snelle schema-opstelling — wat de markt voor planningsconsultancy voedt (bureaus als [Yaka Danışmanlık](https://www.yakadanismanlik.com/makaleler/is-programi-cpm-nasil-hazirlanir-idare-onayi-sureci) publiceren expliciet handleidingen over "iş programı (CPM) nasıl hazırlanır — idare onayı süreci").

**Waar P6 wél verplicht is:** op buitenlandse projecten. De contractuele dwang komt van Golfstaat-opdrachtgevers, olie- en gasmaatschappijen, internationale PMC's en IFI-gefinancierde projecten — niet van Turkse regelgeving. Turkije is daarmee een **P6-importeur van contractuele eisen**.

### 4.2 Valuta-instabiliteit: het dominante economische feit

De lira daalde in 2026 alleen al van 42,971 naar 47,343 per dollar — ruim 10% in zeven maanden ([ValutaFX](https://www.valutafx.com/history/usd-try-2026)). Voor softwareaankopen betekent dit:

**a) Dollarisering van het B2B-kanaal.** Turkse resellers noteren zowel Oracle als Microsoft in USD. De Microsoft-resellerpagina toont letterlijk een leeg "—TL"-veld naast "$31,50 /kullanıcı/ay" ([microsoftkurumsal.com](https://www.microsoftkurumsal.com/urunler/microsoft-project-plan-3/)) — bij verificatie letterlijk zo aangetroffen. **Maar niet "volledig":** Microsofts eigen Turkse consumentenwinkel prijst Project Professional 2024 op ₺61.499,99 en Project Standard 2024 op ₺31.399,99 ([microsoft.com/tr-tr](https://www.microsoft.com/tr-tr/microsoft-365/project/microsoft-project-enterprise-plans-and-pricing)). Omgerekend tegen 47,34 TL/USD is dat $1.299 tegen $1.129,99 in de VS — een Turkije-opslag van ± 15% in dollars, geen zuivere dollarpariteit. Dollarisering is dus een kenmerk van het **partnerkanaal**, niet van elke Turkse prijskaart.

**b) Juridisch toegestaan — voor buitenlandse software.** Onder de Turkse deviezenregelgeving (Besluit nr. 32) geldt in beginsel een verbod op contracten in vreemde valuta tussen ingezetenen. Softwarelicenties worden echter gekwalificeerd als **dienstverlening**, waarvoor het verbod niet geldt ([muhasebenews.com](https://www.muhasebenews.com/bilisim-teknolojileri-kapsaminda-yurt-disindan-alinan-lisanslarin-satislarinda-doviz-cinsinden-tahsilat-yapilmasi-mumkun-mudur/)). Voor **in Turkije geproduceerde** software heeft het Ministerie van Financiën verduidelijkt dat licentie- en dienstencontracten juist **niet** in vreemde valuta mogen worden gesloten ([Güreli](https://www.gureli.com.tr/sirkuler/vergi-sirkuleri-109-turkiyede-uretilen-yazilim-ve-donanimlara-iliskin-lisans-ve-hizmet-sozlesmeleri-de-dovizle-yapilamayacaktir/); [Esin Avukatlık](https://www.esin.av.tr/tr/2018/10/19/turkiyede-uretilen-donanim-ve-yazilimlara-iliskin-lisans-ve-hizmet-sozlesmelerinin-de-dovizle-odeme-yasagi-kapsaminda-oldugu-konusu-netlestirildi/)). **Dit geeft Turkse pakketten een gedwongen TL-prijsstelling en daarmee een structureel prijsvoordeel** — een onderschatte concurrentiefactor.

**c) Historische koersfixatie als noodmaatregel.** In 2022 fixeerden Microsoft-distributeurs in Turkije de dollarkoers voor CSP-aankopen op 16,99 TL tot 30 september 2022, om aankopen niet volledig te laten stilvallen ([chip.com.tr](https://www.chip.com.tr/haber/microsoft-csp-urunlerinde-dolar-kurunu-1699-tlye-sabitlendi_153232.html)). Dat illustreert hoe direct de koers de verkoop raakt.

**d) Turkije wordt uitgezonderd van prijsverlagingen.** Bij de Microsoft-prijsverhogingsronde die per 1 juli 2026 ingaat (5–43% afhankelijk van plan — [microsoftkurumsal.com](https://www.microsoftkurumsal.com/blog/microsoft-365-fiyat-artislari-2026-tasarruf-taktikleri/)) is Turkije **niet** opgenomen in het uitstel dat veel andere landen kregen ([turkinform.com.tr](https://turkinform.com.tr/microsoft-zammi-turkiye-haric-bircok-ulkede-ertelendi-iste-yeni-fiyatlar)). Ter illustratie van de TL-impact: Microsoft 365 Family ging van 3.100 naar 4.100 TL, Personal van 2.300 naar 3.300 TL ([nefes.com.tr](https://www.nefes.com.tr/microsoft-urunlerine-zam-9050)).

**e) Voorkeur voor perpetual boven abonnement.** Een eenmalige perpetual aankoop van P6 ($3.880) bevriest de valutablootstelling op het aankoopmoment; een abonnement ($31,50 of $305 per maand) herhaalt de blootstelling elke maand. **SCHATTING:** dit verklaart waarom Primavera Cloud in Turkije weinig voet aan de grond krijgt, ook los van het 25-gebruikersminimum, en waarom Turkse resellers perpetual prominent blijven adverteren terwijl Oracle wereldwijd naar cloud duwt.

**f) Relatieve betaalbaarheid — SCHATTING/berekening:**

| | Turkije | West-Europa (ter vergelijking) |
|---|---|---|
| P6 Professional perpetual | $3.880 ≈ 183.500 TL | ± €3.600 |
| Bruto maandsalaris planner | 73.564 TL (~$1.555) | ± €5.000 |
| **Licentie in maandsalarissen** | **≈ 2,5** | **≈ 0,7** |
| MS Project Plan 3/maand als % maandsalaris | ≈ 2,0% | ≈ 0,6% |

*Berekend uit [kariyer.net](https://www.kariyer.net/pozisyonlar/planlama+muhendisi/maas), [PRM](https://prmyazilim.com/en/primavera-p6-pricing), [microsoftkurumsal.com](https://www.microsoftkurumsal.com/urunler/microsoft-project-plan-3/) en de koers van 47,3 TL/USD. De West-Europese kolom is een indicatieve vergelijking, geen gemeten cijfer.*

**Conclusie: planningsoftware is in Turkije, gemeten naar lokale koopkracht, ruwweg 3 à 4 keer zo duur als in West-Europa.** Dat is de kernverklaring voor Excel-dominantie, seat-sharing en niet-gelicentieerd gebruik.

### 4.3 Niet-gelicentieerd gebruik

Turkije heeft een langdurige historie van hoge softwarepiraterij:

| Periode | Percentage niet-gelicentieerd | Bron |
|---|---|---|
| 2003–2008 | 64–66% (stabiel) | [BT Dünyası](https://btdunyasi.net) |
| 2014 | **60%** (wereldgemiddelde: 43%) | [Sabah/BSA](https://www.sabah.com.tr/teknokulis) |
| recenter | "60 van elke 100 softwarepakketten" | [Cumhuriyet](https://www.cumhuriyet.com.tr/haber/turkiyede-her-100-yazilimdan-60i-korsan-564609) |

Wettelijk staat hierop 1–5 jaar gevangenisstraf plus drievoudige schadevergoeding ([Yaşam Gazetesi](https://www.yasamgazetesi.com.tr)).

**Nuance voor deze specifieke markt — SCHATTING:** het gerichte zoeken naar gekraakte Primavera-distributie in het Turks leverde **geen** Turkse crack-sites op; de resultaten wezen consequent naar legitieme kanalen (Oracle-trial, officiële downloads, resellers, YouTube-tutorials die expliciet "tamamen ücretsiz ve yasal" claimen). Twee verklaringen, beide waarschijnlijk deels waar:
1. Grote Turkse aannemers met internationale opdrachtgevers zijn audit-blootgesteld en kopen wél; het licentierisico is een contractrisico.
2. De niet-gelicentieerde laag zit bij individuen, studenten en kleine bureaus, en beweegt zich via gesloten kanalen (Telegram, gedeelde bedrijfsinstallaties, verlopen trials) die niet in zoekmachines verschijnen.

Het praktische gevolg voor marktschattingen: **het aantal gebruikers is fors hoger dan het aantal betaalde seats** — een factor waar §2.5 rekening mee houdt (50–60% betaald).

### 4.4 Normen, taal en methodiek

- **Contracttaal:** binnenlands Turks; op exportprojecten Engels (en in Golfstaten soms Arabisch). Planners werken dus routinematig tweetalig.
- **Lesmateriaal:** Turkse aanbieders leveren expliciet **tweetalig** materiaal — [P6Viewer](https://p6viewer.com/tr) omschrijft zijn trainingen als "computerondersteund met Engels en Turks materiaal". Dat is nodig omdat de P6-terminologie (float, WBS, EVM) in het Engels blijft, terwijl de contractterminologie (*iş programı*, *hakediş*, *yer teslimi*, *keşif*, *metraj*) Turks is.
- **Geen Turkstalige P6-interface aangetroffen** in het onderzoek; Turkse ondersteuning betreft installatiehandleidingen en cursusmateriaal, niet een gelokaliseerde UI.
- **Eenheidsprijzenstelsel:** de ÇŞB/YFK-eenheidsprijzen zijn de spil van de Turkse kostenkant. Geen enkel internationaal planningspakket ondersteunt die native — vandaar de scheiding tussen lokale hakediş-software en internationale planningssoftware (§3.7).
- **PMI/PMP:** PMI Türkiye is actief met certificeringsprogramma's en een eigen vakblad ([pmi.org.tr](https://www.pmi.org.tr/sertifikasyon/)), maar publiceert geen ledentallen of PMP-aantallen voor Turkije; die konden niet worden achterhaald.
- **Academische inbedding:** planningsoftware is een gevestigd scriptieonderwerp aan Turkse universiteiten — proefschriften over Primavera-toepassing en MS Project/Primavera-vergelijkingen zijn te vinden via [tez.yok.gov.tr](https://tez.yok.gov.tr) en [tezara.org](https://tezara.org). Dat levert een gestage instroom van afgestudeerden met basiskennis, en verklaart mede de brede beschikbaarheid van P6-vaardigheid tegen relatief lage loonkosten.

### 4.5 Lokale spelers: resellers, consultants en opleiders

**Oracle Primavera-partners (de drie gevestigde namen):**

| Bedrijf | Profiel | Bron |
|---|---|---|
| **Akım Mühendislik** (Maltepe, İstanbul) | Opgericht **1993**; positioneert zich als "Primavera Türkiye Temsilcisi" en Oracle **Gold Partner**; licentieverkoop, gecertificeerde training, technische support, consultancy. Maandelijkse gecertificeerde cursussen o.l.v. İlhan Bozdeniz; klaslokalen in İstanbul, Ankara en İzmir plus live online. Publiceert een openbare prijslijst. | [akimmuhendislik.com.tr](https://www.akimmuhendislik.com.tr), [akimeng.com](https://www.akimeng.com/oracle-primavera-price-list.html), [Kompass](https://tr.kompass.com/c/akim-muhendislik-tic-ve-san-ltd-sti/) |
| **PRM Yazılım / PYBS** (Ataşehir, İstanbul) | Actief sinds **2003**; Oracle **Primavera Specialized Partner** (en Aconex-expertise); claimt "een van Europa's grootste business partners" naar verkoopvolume en competentie. Portfolio: P6, Unifier, Oracle Primavera Cloud, Aconex, Risk Analysis, AutoVue, TimeControl. Referenties: TPAO/TPOTC, Alp Havacılık, Tekfen, Aselsan, ENKA, Doğuş. Publiceert een openbare prijslijst (bijgewerkt juni 2025). | [prmyazilim.com](https://prmyazilim.com/en/), [pybs.com](https://www.pybs.com/tr/prm-kurumsal) |
| **Method IT Services** | Algemene Oracle-licentiepartner (niet Primavera-gespecialiseerd), gericht op compliance | [methodtr.com](https://methodtr.com/yazilim-donanim/oracle-lisans) |

**Planningsconsultancy (boutiques):**

| Bureau | Specialisatie | Bron |
|---|---|---|
| **Mantis PM** | İş programı-consultancy over Primavera, MS Project, **TILOS én Asta** — de enige gevonden Turkse partij die de nichepakketten aanbiedt; ook BIM | [pmantis.com](https://pmantis.com/is-programi-danismanligi/) |
| **Tanplan** | Gespecialiseerd planningsbureau, "in de eerste plaats Primavera P6"; schema's en budgetbewaking | [LinkedIn](https://tr.linkedin.com/jobs/view/planlama-mühendisi-4350781822) |
| **Loop Danışmanlık Grubu** | Planningsmethodologie op Oracle Primavera | [loopcongroup.com](https://www.loopcongroup.com/planlama-metodolojisi-oracle-primavera/) |
| **PrimePMO** | P6-implementatie voor complexe kapitaalprojecten | [primepmo.com](https://primepmo.com/tr/primavera-p6/) |
| **Yaka Danışmanlık** | CPM-iş programı en het goedkeuringsproces bij aanbestedende diensten | [yakadanismanlik.com](https://www.yakadanismanlik.com/makaleler/is-programi-cpm-nasil-hazirlanir-idare-onayi-sureci) |
| **Erachron** | P6 voor bouw en grootschalige engineering | [erachron.com](https://erachron.com) |
| **Digitatek**, **AEC Akademi**, **Grid Group**, **Mimari Bilişim** | Training/advies rond P6 en MS Project | diverse |

**Opleidingsmarkt:** minstens vijftien aanbieders, waaronder de partners zelf (PRM, Akım), commerciële cursusinstituten ([Üçüncü Binyıl Akademi](https://www.ucuncubinyil.com/egitim/primavera-kursu) — 24 uur; [İnşaat Academy](https://www.insaatacademy.com/course/primavera-kursu/) — 24 uur met universiteitscertificaat verifieerbaar via e-Devlet; [Biladım](https://www.biladim.com/kurslar/primavera-p6-kurslari/) — 21 uur over 3,5 weken, vestigingen Beşiktaş en Şirinevler; [ARC Enstitü](https://www.arcenstitu.com/egitim/primavera-ile-proje-planlama-ve-yonetme-egitimi); [Milimetrik](https://www.milimetrik.com/course/primavera-kursu-egitimi/)), cursusmarktplaatsen ([kurs.com](https://www.kurs.com/primavera-kursu), Armut), en Udemy TR met Turkstalige P6-cursussen.

> **Prijstransparantie in training: nul.** Zes verschillende zoekacties naar concrete TL-bedragen voor P6-training leverden **geen enkele gepubliceerde prijs** op. Alle aanbieders werken met offerte-op-aanvraag; Biladım toont zelfs "₺0,00" met een vermelding van 30% korting. Dat is typisch voor de Turkse B2B-trainingsmarkt en maakt prijsvergelijking onmogelijk zonder direct contact.
>
> **SCHATTING op basis van de omliggende signalen** (24-uurs cursusduur, salarisniveaus, positionering als premium schaarstevaardigheid): een open-inschrijving P6-basiscursus kost vermoedelijk **8.000 – 25.000 TL per deelnemer** ($170 – $530); in-company trajecten met groepskorting liggen per deelnemer lager, per dag hoger. Behandel dit expliciet als een afgeleide schatting, niet als een waargenomen prijs.

### 4.6 De opleidingscultuur: schaarste als verkoopargument

Turkse opleiders verkopen planningsvaardigheid consequent als **schaarstevaardigheid**. Üçüncü Binyıl Akademi belooft cursisten "*Türkiye'de az sayıda kişinin olduğu konularda uzman*" te maken — expert worden in onderwerpen waarin Turkije weinig mensen heeft ([bron](https://www.ucuncubinyil.com/egitim/primavera-kursu)). Dat is commerciële retoriek, maar het sluit aan bij de vacaturedata (241–464 openstaande planningsposities op één jobboard) en bij de salarissprong van 63.625 → 73.564 TL tussen 2025 en 2026 (+15,6% nominaal, [kariyer.net](https://www.kariyer.net/pozisyonlar/planlama+muhendisi/maas)) — al is die sprong bij de Turkse inflatie reëel vermoedelijk vlak tot negatief.

De praktische betekenis voor softwareleveranciers: **in Turkije is de trainingsmarkt een substantiëler en stabieler inkomstenkanaal dan de licentiemarkt.** Licentie-inkomsten worden platgedrukt door FX; training wordt in TL afgerekend, schaalt met het aantal ingenieurs (164.000 en groeiend), en is immuun voor piraterij.

### 4.7 De strategische conclusie voor een nieuwe toetreder

Op basis van het bovenstaande zijn dit de openingen en de barrières in de Turkse markt:

**Openingen:**
1. **Geen enkel Turks CPM-pakket bestaat.** De lokale industrie doet metraj/hakediş, de internationale doet planning. Niemand overbrugt dat.
2. **TL-prijsstelling is een structureel wapen.** Buitenlandse concurrenten móéten in dollars prijzen; een lokaal geproduceerd pakket moet wettelijk in TL factureren en is daarmee immuun voor de FX-schok die de concurrentie teistert.
3. **XER-interoperabiliteit is de sleutel.** Wie een goedkoop/gratis pakket levert dat XER kan lezen en schrijven, bedient de enorme groep die P6-schema's moet kunnen ontvangen, controleren en rapporteren zonder een P6-seat van $3.880 te kunnen betalen — de onderaannemers, kleine aannemers, en de opdrachtgeverskant.
4. **Turkstalige UI is onbezet.** Geen enkel groot planningspakket biedt een Turkse interface.
5. **Open source heeft hier geen positie ingenomen**, ondanks maximale prijsdruk. De ruimte ligt open.
6. **De 15-dagenregel van artikel 17** creëert terugkerende, wettelijk afgedwongen vraag naar snelle schema-opstelling bij elk publiek werk in het land.

**Barrières:**
1. **P6 is contractueel verankerd op alle exportprojecten** — daar is niet tegenop te concurreren, alleen naast te bestaan (als viewer/analyse/rapportagelaag).
2. **Excel is gratis en universeel geaccepteerd** bij binnenlandse werken; dat is de echte concurrent.
3. **De betalingsbereidheid is laag** en de piraterijcultuur hardnekkig — een betaald pakket moet ofwel zeer goedkoop zijn, ofwel iets bieden dat je niet kunt kraken (cloud-samenwerking, compliance-bewijs).
4. **De markt is klein in absolute euro's** ($7–16 mln totaal, waarvan $2,4–5,7 mln software) en versnipperd.

---

## 5. Bronnen

### Marktomvang, macro-economie en sector
1. T.C. Ticaret Bakanlığı — ENR 2025 recordprestatie (45 Turkse firma's, $20,8 mrd, 4,2%): https://ticaret.gov.tr/haberler/enr-2025-listesinde-rekor-basari
2. Türkiye Müteahhitler Birliği (TMB) — Evaluatie buitenlandse aannemerij, jan. 2025 ($28,6 mrd in 2024): https://v2.tmb.org.tr/tr/n/679bbf83d4824408abc5108e/yurt-disi-muteahhitlik-ve-teknik-musavirlik-hizmetleri-degerlendirme-toplantisi-30-ocak-2025
3. TMB — Digitale Transformatie Topverslag, oktober 2025 (PDF): https://tmb.org.tr/uploads/publications/68f87f4d4171c42cf398ed08/1761115964699-idd-sonuc-raporu-ekim-2025.pdf
4. Ekotürk — 12.627 projecten / $543,6 mrd / 137 landen sinds 1972: https://www.ekoturk.com/haberler/turk-muteahhitlerden-yurt-disinda-dev-atak-137-ulkede-543-milyar-dolarlik-turkiye-imzasi/
5. Memurlar.net — H1 2025: 93 projecten, $6,2 mrd: https://www.memurlar.net/haber/1140091/
6. TEBA News — ENR 2025 posities ENKA (46), Rönesans (50): https://tebanews.com.tr
7. İnşaat Deryası — grootste Turkse aannemers 2025: https://insaatderyasi.com
8. TÜİK — Kwartaal-BBP, bouwsector Q1 2025 +7,3%: https://data.tuik.gov.tr
9. İnşaat Dünyası — Q2 2025: bouw +10,9%, 2,29 biljoen TL bouwuitgaven: https://www.insaatdunyasi.com.tr
10. Finanzen.com.tr — BBP 2025 +3,6%, bouw +10,8%: https://www.finanzen.com.tr
11. Gazete Kritik — BBP 2025 63 biljoen TL / $1,7 biljoen, $18.040 p.p.: https://www.gazetekritik.com
12. TÜBİSAD — ICT-markt 2025: 2,1 biljoen TL (+77%): https://www.tubisad.org.tr
13. Marjinal — TÜBİSAD-cijfers: 2.129,3 mrd TL = $53,8 mrd (+47% USD): https://marjinal.com.tr
14. ValutaFX — USD/TRY historie 2026 (hoog 47,343 / laag 42,971 / gem. 44,933): https://www.valutafx.com/history/usd-try-2026
15. Wise — USD/TRY 47,3340 op 25 juli 2026: https://wise.com/us/currency-converter/usd-to-try-rate/history
16. MarketStrides — Turkey Construction Technology Market $51,42 mln (2024) *[lage verifieerbaarheid]*: https://marketstrides.com/omega/insights/construction-technology-market/turkey
17. Kings Research — wereldwijde construction management software $9,67 mrd (2023) → $20,67 mrd (2031): https://www.kingsresearch.com/tr/construction-management-software-market-146
18. Statista — Construction & Design Software Turkije *[betaalmuur, cijfers niet verifieerbaar]*: https://www.statista.com/outlook/tmo/software/productivity-software/construction-and-design-software/turkey
19. 6Wresearch — Turkey Construction and Design Software Market *[betaalmuur]*: https://www.6wresearch.com/industry-report/turkey-construction-and-design-software-market

### Gebruikersbasis, arbeidsmarkt en opleiding
20. The Şantiye — İMO-ledental 164.234 (2026), 160.455 (2025): https://thesantiye.com
21. TMMOB — 705.792 leden over 24 kamers (eind 2024): https://www.tmmob.org.tr
22. Kariyer.net — salaris planlama mühendisi 73.564 TL (2026) / 63.625 TL (2025): https://www.kariyer.net/pozisyonlar/planlama+muhendisi/maas
23. Kariyer.net — salaris proje planlama mühendisi 63.900 TL (2026): https://www.kariyer.net/pozisyonlar/proje+planlama+muhendisi/maas
24. Eleman.net — 54.900 TL gem., 38.300–93.500 TL: https://www.eleman.net/meslek/planlama-muhendisi/maas
25. SecretCV — 42.167 TL gem., 30.167–84.333 TL: https://www.secretcv.com/pozisyon-rehberi/planlama-muhendisi/maas
26. İşteMülakat — 51.229 TL (n=59): https://istemulakat.com/meslek/planlama-muhendisi/maaslari
27. Jooble TR — 241+ vacatures planlama mühendisi: https://tr.jooble.org/iş-ilanları-planlama-mühendisi
28. Jooble TR — 464+ vacatures proje planlama mühendisi: https://tr.jooble.org/iş-ilanları-proje-planlama-mühendisi/Türkiye
29. Kariyer.net — vacature Nurol İnşaat ("Primavera P6 veya MS Project"): https://www.kariyer.net/is-ilani/nurol-insaat-ve-ticaret-a-s-planlama-muhendisi-4363367
30. Kariyer.net — vacature Mimas Mühendislik (raffinaderij/petrochemie, İzmir): https://www.kariyer.net/is-ilani/mimas-muhendislik-a-s-planlama-muhendisi-4491480
31. LinkedIn — vacature Tanplan ("başta Primavera P6 olmak üzere"): https://tr.linkedin.com/jobs/view/planlama-mühendisi-4350781822
32. PMI Türkiye — certificering: https://www.pmi.org.tr/sertifikasyon/
33. YÖK Ulusal Tez Merkezi: https://tez.yok.gov.tr
34. Tezara — scripties over Primavera in bouwprojectmanagement: https://tezara.org/theses/698881

### Prijzen en licentiemodellen
35. **PRM Yazılım — Primavera P6-prijslijst (juni 2025): P6 Pro $3.880 (+$854 support), P6 Enterprise $4.240 (+$933), P6 Cloud $305/gebruiker/maand min. 25 gebruikers, 22% onderhoud**: https://prmyazilim.com/en/primavera-p6-pricing
36. **Akım Engineering — Oracle Primavera prijslijst: P6 Professional $3.880, P6 Enterprise $4.240, Risk Analysis $10.450, Progress Reporter $1.460 (perpetual, application user, excl. support)**: https://www.akimeng.com/oracle-primavera-price-list.html
37. **Microsoft Kurumsal (TR) — Project Plan 3 $31,50/gebruiker/maand, Plan 5 $66,00/maand, Planner Plan 1 $12,00/maand, CSP, excl. btw, leeg "—TL"-veld**: https://www.microsoftkurumsal.com/urunler/microsoft-project-plan-3/
38. Microsoft Kurumsal — Project-licentietypes Standard/Plan 3/Plan 5: https://www.microsoftkurumsal.com/blog/microsoft-project-lisans-turleri-standard-plan-3-plan-5/
39. Microsoft Kurumsal — Project Professional 2024 (perpetual): https://www.microsoftkurumsal.com/urunler/project-professional-2021/
40. Microsoft — Project enterprise plannen en prijzen (TR): https://www.microsoft.com/tr-tr/microsoft-365/project/microsoft-project-enterprise-plans-and-pricing
41. A Guide to Cloud — internationale referentieprijzen Plan 1 $10 / Plan 3 $30 / Plan 5 $55: https://aguidetocloud.com/licensing/microsoft-project/
42. Taradigm — P6-kostenanalyse (perpetual + support): https://www.taradigm.com/how-much-does-primavera-p6-cost/
43. Project Manager Template — P6 perpetual ± $3.520/gebruiker: https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models
44. Oracle — P6 EPPM Licensing Information (v25): https://docs.oracle.com/cd/G18294_01/English/licensing_information/p6_eppm_licensing_information/
45. monday.com — Turkstalige prijspagina: https://monday.com/lang/tr/pricing/

### Valuta-effecten en licentierecht
46. Microsoft Kurumsal — prijsverhogingen per 1 juli 2026 (5–43%): https://www.microsoftkurumsal.com/blog/microsoft-365-fiyat-artislari-2026-tasarruf-taktikleri/
47. Turkinform — Turkije uitgezonderd van uitstel Microsoft-prijsverhoging: https://turkinform.com.tr/microsoft-zammi-turkiye-haric-bircok-ulkede-ertelendi-iste-yeni-fiyatlar
48. Nefes — M365 Family 3.100 → 4.100 TL, Personal 2.300 → 3.300 TL: https://www.nefes.com.tr/microsoft-urunlerine-zam-9050
49. Chip.com.tr — Microsoft CSP-dollarkoers gefixeerd op 16,99 TL (2022): https://www.chip.com.tr/haber/microsoft-csp-urunlerinde-dolar-kurunu-1699-tlye-sabitlendi_153232.html
50. Güreli — binnenlands geproduceerde software: licentiecontracten niet in vreemde valuta: https://www.gureli.com.tr/sirkuler/vergi-sirkuleri-109-turkiyede-uretilen-yazilim-ve-donanimlara-iliskin-lisans-ve-hizmet-sozlesmeleri-de-dovizle-yapilamayacaktir/
51. Muhasebe News — buitenlandse softwarelicenties: inning in vreemde valuta toegestaan (dienst): https://www.muhasebenews.com/bilisim-teknolojileri-kapsaminda-yurt-disindan-alinan-lisanslarin-satislarinda-doviz-cinsinden-tahsilat-yapilmasi-mumkun-mudur/
52. Esin Avukatlık Ortaklığı — verduidelijking deviezenverbod voor binnenlandse software/hardware: https://www.esin.av.tr/tr/2018/10/19/turkiyede-uretilen-donanim-ve-yazilimlara-iliskin-lisans-ve-hizmet-sozlesmelerinin-de-dovizle-odeme-yasagi-kapsaminda-oldugu-konusu-netlestirildi/
53. Erdem & Erdem — verbod op contracten in/geïndexeerd op vreemde valuta: https://www.erdem-erdem.av.tr/bilgi-bankasi/guncel-duzenlemeler-isiginda-dovizle-veya-dovize-endeksli-sozlesme-yapma-yasagi
54. TCMB — officiële wisselkoersen: https://www.tcmb.gov.tr/kurlar/kurlar_tr.html

### Aanbesteding en regelgeving
55. **Yapım İşleri Genel Şartnamesi, Madde 17 (İş Programı) — 15 dagen, goedkeuring, pakketsoftware bij complexe werken, géén formaat voorgeschreven**: https://herpoz.com/mevzuat/yapim-isleri-genel-sartnamesi/madde-17
56. Yapım İşleri Genel Şartnamesi — volledige tekst (PDF, versie 2019): https://www.hakedis.org/wp-content/uploads/2020/02/yapim-isleri-genel-sartnamesi-20191102.pdf
57. Kılıç Hukuk — "İş programları idarenin onayıyla geçerli olur": https://www.kilichukuk.org/Sozluk/is-programinin-teslimi-yapim-isleri
58. KİK EKAP Akademi — wijzigingen bouwcontractregelgeving (PDF): https://ekapakademi.kik.gov.tr/wp-content/uploads/2020/01/Yapım-Sözleşme-Uygulamalarına-Dair-Mevzuat-Değişiklikleri_Sunum.pdf
59. Mevzuat.gov.tr — Yapım İşleri İhaleleri Uygulama Yönetmeliği: https://www.mevzuat.gov.tr/anasayfa/MevzuatFihristDetayIframe?MevzuatTur=7&MevzuatNo=12916&MevzuatTertip=5
60. Yaka Danışmanlık — "İş programı (CPM) nasıl hazırlanır — idare onayı süreci": https://www.yakadanismanlik.com/makaleler/is-programi-cpm-nasil-hazirlanir-idare-onayi-sureci
61. Çevre ve Şehircilik Bakanlığı Çorum — Yapım Genel Şartname (PDF, 2023): https://webdosya.csb.gov.tr/db/corum/icerikler/yapim-genel-sartname-20231030133116.pdf

### Piraterij en digitalisering
62. Cumhuriyet — "Türkiye'de her 100 yazılımdan 60'ı korsan": https://www.cumhuriyet.com.tr/haber/turkiyede-her-100-yazilimdan-60i-korsan-564609
63. Sabah/Teknokulis — BSA: 60% onlicensed in Turkije (2014) vs 43% wereldwijd: https://www.sabah.com.tr/teknokulis
64. BT Dünyası — BSA-historie 2003–2008, 64–66%: https://btdunyasi.net
65. Wikipedia (TR) — Türkiye'de korsan yazılım: https://tr.wikipedia.org/wiki/Türkiye'de_korsan_yazılım
66. **AEC Kraft — Digitalisatierapport bouwsector 2026 (DMI 38,4; 68% Excel; BIM 94% vs 4%)** *[synthese zonder eigen veldonderzoek]*: https://aeckraft.com/blog/aeckraft-insaat-sektoru-dijitallesme-raporu-2026
67. Özerdem — Turkse bouwsector rapport 2026: https://ozerdem.com/2025/07/31/turkiye-insaat-sektoru-2026-raporu-buyume-riskler-ve-firsatlar/

### Leveranciers, resellers, consultants en opleiders
68. PRM Yazılım (Oracle Primavera Specialized Partner, sinds 2003): https://prmyazilim.com/en/
69. PYBS — bedrijfsprofiel, referenties TPAO, Tekfen, Aselsan, ENKA, Doğuş: https://www.pybs.com/tr/prm-kurumsal
70. PRM Yazılım — Primavera P6 productpagina (TR): https://prmyazilim.com/tr/yazilim-cozumleri/primavera-p6
71. Akım Mühendislik (Primavera Türkiye Temsilcisi, sinds 1993): https://www.akimmuhendislik.com.tr
72. Akım Mühendislik — diensten: https://www.akimmuhendislik.com.tr/hizmetler.html
73. Akım Mühendislik — online P6-cursus: https://www.akimmuhendislik.com.tr/oracle-primavera-p6-online-kurs-proje-yonetimi.html
74. Kompass — Akım Mühendislik als officieel Primavera Turkije-vertegenwoordiger/Gold Partner: https://tr.kompass.com/c/akim-muhendislik-tic-ve-san-ltd-sti/
75. Method IT Services — Oracle-licenties: https://methodtr.com/yazilim-donanim/oracle-lisans
76. Oracle Türkiye — partnerprogramma: https://www.oracle.com/tr/partner/
77. Mantis PM — iş programı-consultancy (Primavera, MS Project, **TILOS, Asta**): https://pmantis.com/is-programi-danismanligi/
78. Loop Danışmanlık Grubu — planningsmethodologie Oracle Primavera: https://www.loopcongroup.com/planlama-metodolojisi-oracle-primavera/
79. PrimePMO — Oracle Primavera P6 (TR): https://primepmo.com/tr/primavera-p6/
80. P6Viewer (TR) — training met Engels/Turks materiaal: https://p6viewer.com/tr
81. Erachron — P6 voor bouw en engineering: https://erachron.com
82. Üçüncü Binyıl Akademi — Primavera-cursus 24 uur: https://www.ucuncubinyil.com/egitim/primavera-kursu
83. İnşaat Academy — Primavera-cursus 24 uur, universiteitscertificaat via e-Devlet: https://www.insaatacademy.com/course/primavera-kursu/
84. Biladım — P6-cursus 21 uur / 3,5 weken, Beşiktaş & Şirinevler: https://www.biladim.com/kurslar/primavera-p6-kurslari/
85. ARC Enstitü — Primavera-planningsprogramma: https://www.arcenstitu.com/egitim/primavera-ile-proje-planlama-ve-yonetme-egitimi
86. Milimetrik — Primavera P6-cursus: https://www.milimetrik.com/course/primavera-kursu-egitimi/
87. Kurs.com — Primavera-cursusmarktplaats: https://www.kurs.com/primavera-kursu

### Turkse vakinhoudelijke bronnen (softwarekeuze)
88. Gezgin Şantiyeci — "Proje Yönetimi Savaşları: Primavera P6 & Microsoft Project": https://gezginsantiyeci.com/primavera-p6-microsoft-project/
89. Sanal Şantiye — "Bir İnşaat Mühendisinin Bilmesi Gereken 14 Program": https://sanalsantiye.com
90. Digitatek — kritische verschillen P6 vs MS Project: https://www.digitatek.com/proje-yonetim-devi-savaslari-primavera-p6-ve-ms-project-arasindaki-kritik-farklar-blog
91. AEC Akademi — waarom MS Project en Primavera gebruikt worden: https://aecakademi.com.tr/proje-yonetiminde-ms-project-ve-primavera-neden-kullaniliyor
92. Mindset — MS Project vs Primavera P6 vergelijking 2026: https://mindset.com.tr/kariyer-rehberi/ms-project-vs-primavera-p6-hangi-projede-hangi-arac
93. Grid Group — Oracle Primavera vs Microsoft Project: https://gridgroup.com.tr
94. LinkedIn — "PrimaVera P6 *.xer Dosyadan Veri Alma Örneği": https://www.linkedin.com/pulse/primavera-project-planner-p6-xer-dosyadan-veri-alma-örneği-ulusaraç-1skuf
95. ClickUp (TR) — "En İyi 10 İş Programı Uygulaması": https://clickup.com/tr/blog/71313/ish-programi-uygulamalari

### Lokale Turkse bouwsoftware
96. Yapıtaşı ERP: https://www.yapitasierp.com/tr/pages/yapitasi_erp
97. Uyumsoft — şantiye/inşaat takip: https://www.uyumsoft.com/santiye-insaat-takip-programi
98. PİR Cloud — "Turkije's eerste online bouwsoftware" (2010): https://www.pircloud.com/insaat-yazilimi-insaat-proje-yonetim-programi/
99. maliyetLOG — metraj en hakediş: https://www.maliyetlog.com
100. Plansizin — 2026 YFK-eenheidsprijzen, mobiele rapportage: https://www.plansizin.com
101. BuiltUp® — şantiye-tracking: https://builtup.com.tr
102. Opsen — gratis bouwbeheerprogramma (incl. iş programı-module): https://useopsen.com/insaat-yonetim-programi
103. Demsoft — proje yönetimi programı: https://demsoftyazilim.com/proje-yonetimi-programi.html
104. Orca Software — projectvolgsoftware voor bouwbedrijven 2026: https://orcasoftware.com.tr/blog/insaat-sirketi-proje-takip-yazilimi-2026
105. AEC Kraft — metraj-programmavergelijking 2026: https://aeckraft.com/blog/metraj-programi-karsilastirma-2026

### Open source (ter vergelijking; geen Turkse adoptie aangetroffen)
106. ProjectLibre: https://www.projectlibre.com/
107. ProjectLibre op SourceForge (7,8 mln downloads, 193 landen): https://sourceforge.net/projects/projectlibre/
108. GanttProject: https://www.ganttproject.biz/
109. Wikipedia — ProjectLibre (8,4 mln downloads): https://en.wikipedia.org/wiki/Projectlibre

### Bronnen toegevoegd bij de verificatieronde (25 juli 2026)
110. Wereldbank via TradingEconomics — Turks BBP 2025: $1.597,29 mrd: https://tradingeconomics.com/turkey/gdp
111. TradingEconomics — BBP-groei 2025 +3,6%; bouwsector per kwartaal (Q3 +13,9/14,1%, Q4 +8,6%): https://tradingeconomics.com/turkey/gdp-growth-annual
112. TradingEconomics — Turks BBP uit de bouwsector, kwartaalreeks: https://tradingeconomics.com/turkey/gdp-from-construction
113. **Microsoft (VS) — Planner Plan 1 $10,00 en Planner and Project Plan 3 $30,00 per gebruiker/maand bij jaarabonnement** (vervangt de secundaire bron aguidetocloud.com): https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner-pricing
114. **Microsoft (VS) — Project Professional 2024 $1.129,99 / Project Standard 2024 $679,99, perpetual**: https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software
115. **Microsoft Türkiye — Project Professional 2024 ₺61.499,99 / Project Standard 2024 ₺31.399,99, prijzen in lira**: https://www.microsoft.com/tr-tr/microsoft-365/project/microsoft-project-enterprise-plans-and-pricing
116. XE — USD/TRY 47,3451 op 25 juli 2026 (onafhankelijke koersbevestiging): https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=TRY
117. **ÇŞB — Yapım İşleri Genel Şartnamesi, originele tekst Madde 17 (15 dagen; 5 dagen respijt; boete = 10% van de dagboete; lid 5 "kapsamlı işler … paket yazılım"; lid 7 herziening binnen 7 dagen)**: https://webdosya.csb.gov.tr/db/corum/icerikler/yapim-genel-sartname-20231030133116.pdf
118. Kings Research — construction management software: $9,67 mrd (2023), $10,52 mrd (2024), CAGR 10,12%, $20,67 mrd (2031): https://www.kingsresearch.com/construction-management-software-market-146

---

## Bijlage: overzicht van gemarkeerde schattingen

Voor de volledigheid, alle plaatsen waar dit rapport een eigen schatting doet in plaats van een bron te citeren:

| § | Schatting | Basis |
|---|---|---|
| 2.4 | 8.000–14.000 actieve CPM-gebruikers in Turkije | Vier-lagenopbouw uit ENR-omzet, binnenlandse bouwuitgaven, İMO-ledental en planningsintensiteitsratio's |
| 2.5 | 4.000–8.400 betaalde seats (50–60% van gebruikers) *(gecorrigeerd)* | BSA-piraterijcijfer uit **2013** gecorrigeerd voor auditdruk in het enterprise-segment — bron is twaalf jaar oud |
| 2.5 | P6 $1,7–3,6 mln / MS Project $0,6–1,6 mln / overig $0,1–0,5 mln per jaar | Seats × gerealiseerde prijs na aangenomen korting. *Let op: dit zijn handmatig versmalde banden — de rekenkundige uitersten zijn ruimer (P6 $1,4–4,2 mln; MSP $0,45–1,75 mln; overig $0,06–0,64 mln).* |
| 2.5 | Diensten $4,4–10,2 mln per jaar | Aantal aanbieders × aangenomen cursisten/omzetvolume |
| 2.5 | Totale markt **$7–16 mln/jaar** *(gecorrigeerd van $8–16)* | Som van bovenstaande = $6,8–15,9 mln |
| 2.5 | Groei 5–10%/jaar in USD | Bouwgroei minus FX-rem |
| 3.6 | Verklaring afwezigheid open source | Redenering, geen directe bron |
| 4.2 | Voorkeur perpetual boven cloud wegens FX | Redenering uit prijsstructuur en Cloud-minimum |
| 4.2 | Relatieve prijsvergelijking Turkije vs West-Europa (3–4×) | Berekening uit bronsalarissen, bronprijzen en koers; West-Europese kolom indicatief |
| 4.3 | Verklaring afwezigheid Turkse crack-sites | Redenering, geen directe bron |
| 4.5 | P6-training 8.000–25.000 TL per deelnemer | Afgeleid uit cursusduur, salarisniveaus en positionering — géén waargenomen prijs |

---

## Verificatie

**Uitgevoerd:** 25 juli 2026, adversariële fact-check. Werkwijze: per bewering actief geprobeerd te wéérleggen met bronnen **buiten** de oorspronkelijk geciteerde set (primaire verordeningstekst, Microsoft en Oracle zelf, Wereldbank, XE, TÜİK-afgeleiden), plus narekenen van elke schatting. Onderstaand de uitkomst per bewering.

### Gecorrigeerd (aantoonbare fout, hersteld in de tekst hierboven)

| # | Bewering (origineel) | Bevinding | Bron |
|---|---|---|---|
| 1 | "BBP 2025 ± USD 1,7 biljoen" | **Te hoog.** Wereldbank: $1.597,29 mrd voor 2025 → **± $1,60 biljoen**. Het rapport was hier ook intern inconsistent: het eigen cijfer van $18.040 BBP per hoofd × 85,7 mln inwoners geeft ± $1,55 biljoen, niet $1,7 biljoen. | [tradingeconomics.com/turkey/gdp](https://tradingeconomics.com/turkey/gdp) |
| 2 | "Bij niet-tijdige indiening gelden dagelijkse vertragingsboetes, **gelijk aan** die voor het missen van de opleverdatum" (Madde 17 YİGŞ) | **Fout, factor 10.** De originele verordeningstekst: eerst eenmalig **5 dagen respijt zonder boete**, daarna per dag **10% van** de contractuele dagelijkse vertragingsboete ("günlük gecikme cezasının %10'u oranında ceza uygulanır"). Ook ontbrak lid 7: herzien iş programı binnen **7 dagen**. Geverifieerd op de originele ministerie-PDF, niet op de secundaire samenvatting die het rapport citeerde. | [ÇŞB — Yapım İşleri Genel Şartnamesi, Madde 17 (PDF)](https://webdosya.csb.gov.tr/db/corum/icerikler/yapim-genel-sartname-20231030133116.pdf) |
| 3 | Bouwuitgaven "9,2 biljoen TL ≈ $195–205 mrd (bij ± 45 TL/USD)" | **Verkeerde koers.** 45 TL/USD lag buiten de héle koersband van 2025 — het rapport meldt zelf dat USD/TRY op 1 jan 2026 nog 42,971 was. Tegen de gemiddelde koers van 2025 (± 40) is het **± $225–235 mrd**. Gevolg: de CPM-plak wordt $23–35 mrd i.p.v. $20–30 mrd. | Eigen herberekening op de ValutaFX-reeks in §2.1 |
| 4 | "Totaal ecosysteem $8–16 mln"; "licenties $3–6 mln" | **Optelfout.** De eigen deeltabel sommeert tot $2,4–5,7 mln licenties en $6,8–15,9 mln totaal. De ondergrenzen waren met 25% resp. 18% naar boven afgerond zonder onderbouwing. Middenwaarde ≈ $11 mln blijft staan. | Narekening §2.5 |
| 5 | "4.500–8.000 betaalde seats" | **Volgt niet uit de eigen aanname.** 50–60% × 8.000–14.000 = **4.000–8.400**. | Narekening §2.5 |
| 6 | "Internationale referentie Plan 1 $10 / Plan 3 $30 / Plan 5 $55, wat duidt op 5–20% resellermarge" | **Interpretatie fout.** De prijzen kloppen (bevestigd bij Microsoft zelf i.p.v. bij aguidetocloud.com), maar $12,00 en $66,00 zijn exact 1,20 × $10 en 1,20 × $55 — Microsofts eigen standaardopslag voor maandelijkse i.p.v. jaarlijkse verplichting. Alleen Plan 3 ($31,50 vs $30) toont een echte opslag van 5%. Er is dus nauwelijks sprake van een Turkse resellermarge. | [microsoft.com — Planner pricing](https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner-pricing) |
| 7 | "Project Professional 2024 perpetual — prijs niet gepubliceerd" | **Onjuist.** Microsoft publiceert de prijs zelf: **$1.129,99** (VS) en **₺61.499,99** (Turkse winkel); Project Standard 2024 $679,99 / ₺31.399,99. | [microsoft.com/tr-tr](https://www.microsoft.com/tr-tr/microsoft-365/project/microsoft-project-enterprise-plans-and-pricing) |
| 8 | "Prijzen zijn **volledig** gedollariseerd" | **Te absoluut.** Microsofts eigen Turkse storefront prijst de perpetual Project-producten in lira. Dollarisering geldt voor het CSP-/Oracle-partnerkanaal, niet voor elke Turkse prijskaart. (De onderliggende observatie — leeg "—TL"-veld bij de reseller — is wél letterlijk bevestigd.) | idem |
| 9 | Cross-check "0,08–0,17% van de wereldwijde markt van $9,67 mrd (2023)" | **Verouderd peiljaar.** Kings Research geeft zelf ook $10,52 mrd (2024) bij 10,12% CAGR → 2026 ≈ **$12,8 mrd**, wat het aandeel op **0,06–0,13%** brengt. De conclusie ("plausibel") verandert niet. | [kingsresearch.com](https://www.kingsresearch.com/construction-management-software-market-146) |

### Bevestigd (weerleggingspoging mislukt — bewering houdt stand)

| # | Bewering | Bevinding | Bron |
|---|---|---|---|
| 10 | ENR 2025: 45 Turkse firma's, $20,8 mrd internationale omzet 2024, 4,2% aandeel, 2e na China met 76, 8 in Top 100 / 2 in Top 50 | **Bevestigd, alle zes deelcijfers**, op de primaire aankondiging van het Ministerie van Handel. ENR.com zelf gaf 403. | [ticaret.gov.tr](https://ticaret.gov.tr/haberler/enr-2025-listesinde-rekor-basari) |
| 11 | Primavera-prijzen: P6 Pro $3.880 (+$854), P6 Enterprise $4.240 (+$933), Cloud $305/gebruiker/maand met min. 25 gebruikers, Risk Analysis $10.450, Progress Reporter $1.460 | **Bevestigd op beide resellersites, exact, inclusief de vermelding "Updated June 2025" en de 22%-supportvoet.** Alle vervolgberekeningen kloppen: 25 × $305 × 12 = $91.500; $3.880 ÷ 5 + $854 = $1.630/jaar; $3.880 × 47,3 = ₺183.524. | [prmyazilim.com](https://prmyazilim.com/en/primavera-p6-pricing), [akimeng.com](https://www.akimeng.com/oracle-primavera-price-list.html) |
| 12 | Turkse Microsoft-resellerprijzen $12,00 / $31,50 / $66,00 met leeg "—TL"-veld | **Letterlijk bevestigd**, inclusief de "$31,50 /kullanıcı/ay"-notatie en het lege TL-veld. | [microsoftkurumsal.com](https://www.microsoftkurumsal.com/urunler/microsoft-project-plan-3/) |
| 13 | Madde 17: 15 dagen na yer teslimi, geldig pas na goedkeuring, **géén softwarepakket of bestandsformaat voorgeschreven**, pakketsoftware alleen optioneel bij omvangrijke werken | **Bevestigd op de originele verordeningstekst.** Lid 1: "on beş gün içinde"; lid 3: "İş programları idarenin onayıyla geçerli olur"; lid 5: "Kapsamlı işlerde idare, iş programının, çubuk diyagram yerine, paket yazılım iş programı ... kullanılarak düzenlenmesini isteyebilir". Nergens een pakketnaam, formaat of CPM-verplichting. Dit is de belangrijkste bewering van het rapport en hij houdt stand. | [ÇŞB PDF, Madde 17](https://webdosya.csb.gov.tr/db/corum/icerikler/yapim-genel-sartname-20231030133116.pdf) |
| 14 | USD/TRY ± 47,3 in juli 2026 | **Bevestigd via een derde, onafhankelijke bron:** XE noteert 47,3451 op 25 juli 2026 (rapport gebruikte ValutaFX en Wise). | [xe.com](https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=TRY) |
| 15 | BBP-groei 2025 +3,6% | **Bevestigd** (net onder de marktverwachting van 3,7%). | [tradingeconomics.com](https://tradingeconomics.com/turkey/gdp-growth-annual) |
| 16 | Bouwsector snelst groeiende sector in 2025, ± +10,8% | **Indirect bevestigd** via de kwartaalreeks: Q1 +7,3%, Q2 +10,9 à 11,1%, Q3 +13,9 à 14,1%, Q4 +8,6% — gemiddeld ± 10,4%, en bouw was in Q3 de sterkste van alle expliciet genoemde sectoren. Een officieel jaarcijfer voor de sector kon niet worden opgehaald (TÜİK-portaal onbereikbaar), dus het precieze getal 10,8% blijft onbevestigd; de richting niet. | [tradingeconomics.com](https://tradingeconomics.com/turkey/gdp-growth-annual) |
| 17 | Kings Research: wereldwijde construction-management-software $9,67 mrd (2023) → $20,67 mrd (2031) | **Bevestigd**, plus aanvullend $10,52 mrd (2024) en CAGR 10,12%. | [kingsresearch.com](https://www.kingsresearch.com/construction-management-software-market-146) |

### Onzeker (niet te bevestigen én niet te weerleggen — behandel met terughoudendheid)

| # | Bewering | Waarom onzeker |
|---|---|---|
| 18 | **De hele marktomvangschatting ($7–16 mln, 8.000–14.000 gebruikers)** | Onverifieerbaar van opzet. De twee bekende bronnen (Statista, 6Wresearch) staan achter een betaalmuur; er is geen onafhankelijke maatstaf om tegen te toetsen. De optellingen kloppen ná bovenstaande correcties, maar rusten volledig op ongepubliceerde ratio's. Het rapport markeert dit zelf correct als schatting — dat oordeel blijft staan. |
| 19 | Planningsintensiteit "1 planner per $8–15 mln omzet" (laag A) en "per $15–25 mln" (laag B) | Geen enkele bron gevonden voor deze ratio's. Het is de gevoeligste aanname in de hele berekening: laag A alleen verandert bij 1 per $20 mln naar ± 1.040 planners i.p.v. 1.700. |
| 20 | Marktleiderschap: "P6 #1 in waarde, MS Project #1 in aantal gebruikers" | Geen marktaandeelcijfers voor Turkije gevonden bij welke bron dan ook. De onderbouwing is anekdotisch (vacatureteksten, Turkse vakblogs zoals gezginsantiyeci.com). Richting is aannemelijk, rangorde is niet gemeten. |
| 21 | Onlicensed-gebruik ± 60% | Cijfer stamt uit BSA-meetjaar 2013. BSA is na de editie 2018 (meetjaar 2017) gestopt met de Global Software Survey; er bestaat **geen recenter cijfer**. Turkse Wikipedia noemt zonder jaartal 64%. Een 2026-schatting hierop bouwen is zwak. |
| 22 | "Er bestaat geen Turks CPM-pakket" en "nul Turkse vermeldingen" voor ALICE/nPlan/Nodes & Links/Safran/Deltek/InEight/EcoSys | Negatieve beweringen op basis van niet-vinden. Niet falsifieerbaar met de beschikbare middelen; afwezigheid van bewijs is geen bewijs van afwezigheid. Aannemelijk, maar niet vast te stellen. |
| 23 | BBP per hoofd $18.040 (2025) | Consistent met $1,60 biljoen ÷ 85,7 mln inwoners (= $18.640) in lopende prijzen, maar TradingEconomics noteert $15.883 in constante prijzen. Prijsbasis onduidelijk; niet gecorrigeerd. |
| 24 | ICT-markt $53,8 mrd (TÜBİSAD 2025) en İMO-ledental 164.234 | Beide bronsites gaven 403/404 bij verificatie; geen onafhankelijke bevestiging gevonden. Overgenomen zoals gerapporteerd. |
| 25 | AEC Kraft-cijfers (68% Excel, DMI 38,4, BIM 94% vs 4%) | Het rapport markeert dit zelf al correct als vendorsynthese zonder veldonderzoek. Die waarschuwing blijft volledig van kracht — deze percentages mogen nergens als gemeten worden gebruikt. |
| 26 | Trainingsprijs 8.000–25.000 TL en dienstenomzet $4–9 mln | Geen enkele gepubliceerde prijs gevonden (het rapport meldt dit zelf). De dienstenpost is met $4–9 mln de grootste component van de totale schatting én de slechtst onderbouwde. |

> **Netto-oordeel van de verificatie.** De *harde* laag van het rapport — prijzen, aanbestedingsregels, ENR-cijfers, wisselkoers — is opvallend degelijk en overleefde de weerleggingspoging vrijwel intact; twee prijsbeweringen zijn zelfs bij de fabrikant zelf bevestigd in plaats van bij de reseller. De fouten zitten in (a) één macro-cijfer ($1,7 → $1,60 biljoen), (b) één juridische overdrijving (de boete uit Madde 17, factor 10 te hoog), (c) een verkeerd gekozen wisselkoers, en (d) optellingen die naar boven waren afgerond. De *zachte* laag — alles in §2.4/§2.5 — blijft precies wat het rapport zegt dat het is: een onverifieerbare eigen schatting, waarvan de dienstencomponent en de planner-ratio's de zwakste schakels zijn.
