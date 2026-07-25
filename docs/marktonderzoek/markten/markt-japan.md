# Marktonderzoek: projectplanning- en schedulingsoftware in Japan

**Regio:** Oost-Azië · **Land:** Japan (日本)
**Datum onderzoek:** 25 juli 2026
**Werkvaluta:** JPY. Wisselkoers gebruikt voor omrekening: **USD 1 ≈ ¥162** (gemiddelde juli 2026, bron: X-Rates/Wise via zoekresultaat). Voor historische cijfers uit FY2023 reken ik met **¥140/USD**, voor FY2024–2025 met **¥150/USD**; dat staat er telkens expliciet bij.

> **Leeswijzer over betrouwbaarheid.** Cijfers met een bron-URL zijn overgenomen uit die bron. Alles wat ik zelf afleid staat gemarkeerd als **[EIGEN SCHATTING]** met de redenering erbij. Een deel van het Japanse marktonderzoek (Yano, MM総研, 富士キメラ) zit achter betaalmuren; ik gebruik dan de publieke persberichten of secundaire vakpers en zeg dat erbij.

---

## 1. Samenvatting

Japan is voor westerse planningssoftware de **moeilijkste ontwikkelde markt ter wereld**, en dat is geen kwestie van taal alleen. Er zijn vier structurele redenen:

1. **De planningsmethode is anders.** Japan plant niet primair met PDM/CPM-netwerken zoals het Westen, maar met een combinatie van **バーチャート (bar chart)**, **アロー型ネットワーク工程表 (arrow diagram / ADM, activity-on-arrow)**, **山積み・山崩し (resource-histogram en -nivellering)**, **工程管理曲線／バナナ曲線 (S-curve met boven- en ondergrens)** en **タクト工程 (takt planning)**. De arrow diagram is nog steeds de canonieke vorm in het 施工管理技士-examen — terwijl vrijwel alle westerse tools (P6, MSP, Asta, ons eigen pakket) precedence-diagram (PDM/AON) zijn. Dat is een fundamentele mismatch, geen vertaalprobleem.
   Bronnen: [zero-sekokan.com — タクト工程](https://zero-sekokan.com/kanri-takt.html), [sekokan-base.com](https://sekokan-base.com/), [doboku-note.com](https://doboku-note.com/)

2. **De dominante lokale pakketten zijn "tekenen", geen "rekenen".** Het marktleidende bouwplanningspakket bij de grote aannemers, **現場ナビ工程 (Genba Navi Kōtei)** van 構造ソフト/アレント, verkoopt zichzelf expliciet op *"手描き感覚"* — met de muis een balkenplanning **tekenen** alsof je met potlood werkt, 30–40% sneller dan Excel of CAD. Er zit automatische datumberekening in, maar het zwaartepunt ligt bij invoergemak en presentatie, niet bij een CPM-solver.
   Bron: [kozosoft.co.jp](https://www.kozosoft.co.jp/genba_navi/seihin/koutei/koutei_p6.html), [genba-navi-kotei.arent.co.jp](https://genba-navi-kotei.arent.co.jp/)

3. **De grote aannemers bouwen of laten bouwen.** Kajima, Obayashi, Shimizu, Takenaka en Taisei ontwikkelen eigen systemen of co-ontwikkelen met Japanse startups (Arent, MetaMoJi, NTT Com). Zij kopen geen westers standaardpakket voor hun binnenlandse werk.

4. **Primavera P6 is in Japan een nichemarkt van ~120 klanten.** De grootste Japanse P6-partner, TIS千代田システムズ, meldt *"約120社の累計導入実績"* (dec. 2022) en noemt zichzelf daarmee **国内No.1**. Dat is het hele installed base-verhaal van P6 in Japan: EPC, petrochemie, farma, scheepsbouw en Amerikaanse militaire bouwprojecten — niet de binnenlandse bouw.
   Bron: [tc-systems.co.jp](https://www.tc-systems.co.jp/service/pm/primavera-p6/)

**De marktsplitsing is scherp en voorspelbaar:**

| Segment | Software | Waarom |
|---|---|---|
| **Binnenlandse bouw (建築/土木)** | Excel, 現場ナビ工程, 工程's, ANDPAD, ダンドリワーク, eYACHO, デキスパート, eigenbouw | Japanse planningsvorm, Japanse taal, Japanse werkcultuur, IT導入補助金 |
| **Internationale/export-EPC** | **Primavera P6** (dominant), AVEVA, MS Project | Klant- en financierseis; FIDIC/EPC-contracten; NEC/ADB/JICA-rapportage |
| **Amerikaanse militaire bouw in Japan** | **Primavera P6 (verplicht)** | USACE/NAVFAC eisen P6-formaat rapportage |
| **4D/BIM bij grote aannemers** | Navisworks, Bentley SYNCHRO, ACC | BIM/CIM原則適用 sinds FY2023 |
| **AI-planning (nieuw, 2022–2026)** | ALICE Technologies (Kajima), PROCOLLA (Obayashi+Arent) | 2024年問題 + arbeidstekort |

**Marktomvang (kern):** de bredere Japanse 建設DX/ConTech-softwaremarkt (bouwsector, exclusief hardware) was **¥184,5 miljard in FY2023** (≈ USD 1,32 mrd @¥140) en groeit naar **¥304,3 miljard in FY2030** (≈ USD 1,88 mrd @¥162), CAGR 7,4% ([Yano Research](https://www.yano.co.jp/press-release/show/press_id/3789)). Het **specifiek planning/scheduling-deel** daarvan schat ik op **¥8–13,5 miljard (USD 50–83 miljoen) in 2025**, middenwaarde ±¥10 mrd — zie §2.3 voor de redenering. **[EIGEN SCHATTING; bij verificatie neerwaarts bijgesteld van ¥8–15 mrd, omdat de bovengrens van ¥15 mrd buiten de overlap van beide rekenmethodes viel.]**

**Belangrijkste demand-driver op dit moment:** het **建設業2024年問題** — sinds 1 april 2024 geldt in de bouw de wettelijke overwerklimiet (100 uur/maand, gemiddeld 80 uur over 2–6 maanden), en het 中央建設業審議会 herzag op 27 maart 2024 de **工期に関する基準** (norm voor bouwtijd). Gecombineerd met **週休2日／4週8閉所** dwingt dit aannemers om planningen kloppend te maken op kalenders met veel meer sluitingsdagen. Dat is de directe reden dat de adoptie van 施工管理-apps in één jaar van 35% naar 42% sprong (en bij algemene aannemers van 49% naar 60%), volgens MM総研.

---

## 2. Marktomvang

### 2.1 Macrocontext: hoe groot is de Japanse bouw?

| Grootheid | Waarde | Jaar | Bron |
|---|---|---|---|
| Bouwinvesteringen totaal (建設投資額) | **¥75,57 biljoen** (≈ USD 466 mrd @¥162) | FY2025 (prognose) | [MLIT](https://www.mlit.go.jp/report/press/joho04_hh_001319.html) |
| — waarvan overheid | ¥25,21 biljoen (+0,7% j-o-j) | FY2025 | idem |
| — waarvan privaat | ¥50,36 biljoen (+4,5% j-o-j) | FY2025 | idem |
| Werkenden in de bouw (建設業就業者数) | **±4,77 miljoen** (477万人; 69,6% van de piek van 685万人 in 1997) — **[GECORRIGEERD/ONZEKER]** het cijfer **479万人** dat hier eerder stond is in MLIT-materiaal het **令和4年 (2022)**-gemiddelde, niet 2024 | 2024 (labour force survey-gemiddelde) | 総務省 労働力調査 / MLIT |
| — idem 10 jaar eerder | 5,07 miljoen | 2014 | **[NIET GEVERIFIEERD]** |
| Technici/ingenieurs (技術者) | **±370.000** | 2022 | MLIT |
| Bedrijven met bouwvergunning (建設業許可業者数) | **±484.000** (−19,5% t.o.v. piek 1999) | 2024 | MHLW/MLIT |
| Geslaagden 1級施工管理技士 | 27.933 | FY2023 | [日刊建設工業新聞](https://www.nikoukei.co.jp/news/detail/508394) |
| Geslaagden 2級施工管理技士 | 40.834 | FY2023 | idem |
| Geslaagden 1級技士補 | 43.361 | FY2023 | idem |
| Geslaagden 2級技士補 | 65.416 | FY2023 | idem |

Let op de schaar: **bouwproductie +23,5% over tien jaar, personeelsbestand −5,5%**. **[ONZEKER — niet geverifieerd]** Beide percentages heb ik bij verificatie niet kunnen reproduceren uit de aangehaalde bronnen. Het 建設投資 lag rond FY2015 op ±¥51 biljoen tegenover ¥75,57 biljoen in FY2025, wat **nominaal ongeveer +48%** is, niet +23,5%; de −5,5% hangt af van het 2014-cijfer dat hierboven als niet-geverifieerd is gemarkeerd. De *richting* van de schaar (productie stijgt, personeel daalt) staat vast; de exacte percentages niet. Dat is de hele economische logica achter de Japanse softwaremarkt — het gaat niet om kostenbesparing maar om *een tekort aan mensen dat niet meer op te lossen is met meer mensen*.

### 2.2 De softwaremarkt: harde cijfers

**Yano Research Institute — 建設DX（ConTech）市場, segment 建築 (gebouwbouw), software & oplossingen:**

| Jaar | Marktomvang | Groei | USD-equivalent |
|---|---|---|---|
| FY2023 | **¥184,5 mrd** (1.845,4億円) | +11,7% j-o-j | ≈ USD 1,32 mrd @¥140 |
| FY2030 (prognose) | **¥304,3 mrd** (3.042,7億円) | +64,9% t.o.v. FY2023 | ≈ USD 1,88 mrd @¥162 |
| CAGR 2023–2030 | **7,4%** | | |

Bron: [Yano Research persbericht 3789](https://www.yano.co.jp/press-release/show/press_id/3789) — *2025年版 建設DX（ConTech）市場の実態と展望～ソフトウェア・ソリューション編～*

**Definitie (belangrijk):** dit is on-premise + cloud software van *営業～施工～建物引き渡し* (verkoop → uitvoering → oplevering), **exclusief** hardware (bouwmachines, robots, drones, remote monitoring). Zeven segmenten: **営業 (verkoop) · 設計 (ontwerp) · VR/AR · 積算・見積 (calculatie) · 調達・手配 (inkoop/planning van personeel) · 施工管理 (uitvoeringsbeheer) · ERP**.

Yano's eigen conclusie: de markt is **"fragmented" zonder dominante speler** (*"圧倒的なシェアを持つ事業者は存在しない"*). **[GENUANCEERD bij verificatie]** Yano onderscheidt twee dingen die hierboven werden samengevoegd: **調達・手配 heeft de hoogste groeivoet**, terwijl **施工管理 het segment met de grootste marktomvang** is (én hard groeit). Planning/工程管理 valt onder 施工管理. Rapport gepubliceerd **28 maart 2025**, prijs ¥198.000.

> **Kanttekening:** dit is alleen 建築 (gebouwbouw). 土木 (civiel/infra) zit hier niet in en is in Japan een aparte softwarewereld (Fukui Computer, KENTEM, 川田テクノシステム, ニコン・トリンブル) met eigen i-Construction-gedreven dynamiek.

**MM総研 — adoptie van 施工管理-apps** (enquête onder bouwbedrijven met omzet >¥1 mrd, web-enquête):

| Metric | Waarde | Bron |
|---|---|---|
| Adoptiegraad hele bouwsector | **42%** (was 35% rond april 2024) | [m2ri.jp](https://www.m2ri.jp/release/) |
| Adoptiegraad algemene aannemers (ゼネコン) | **60%** (was 49%) | idem |
| Marktaandeel #1 hele sector: **デキスパート** (建設システム/KENTEM) | **18%** (peiling dec. 2025; in de meting van 2024 stond *"デキスパート・SiteBox"* op 19%) | idem |
| #1 bij ゼネコン: **MetaMoJi eYACHO** | **26%** — *het aandeel is wél publiek* **[GECORRIGEERD]** | [metamoji.com](https://metamoji.com/jp/news/) |

**Individuele leveranciers (schaalindicatie):**

| Leverancier | Metric | Waarde | Jaar | Bron |
|---|---|---|---|---|
| **ANDPAD** (アンドパッド) | Klantbedrijven | **±260.000** (site: *"利用社数26万社"*) — **[GECORRIGEERD, was 265.000: schijnprecisie]** | 2025 | [andpad.jp](https://andpad.jp/) |
| | Gebruikers | **690.000** (*"ユーザー69万人を超える"*) | 2025 | idem |
| | ARR | **¥10 mrd** (100億円; ≈ USD 62 mln) | najaar 2025 | [tech.andpad.co.jp](https://tech.andpad.co.jp/entry/2025/12/25/173000) |
| | ARR-doel | ¥30 mrd (300億円) | — | idem |
| | Positie | *"導入企業数8年連続シェアNo.1"* in de **建設業マネジメントクラウドサービス市場** volgens **デロイトトーマツ ミック経済研究所** (ミックITリポート 2025年12月号) — **[GECORRIGEERD: niet "施工管理クラウド"; bron is Mic Research, niet ANDPAD zelf]** | dec. 2025 | [andpad.co.jp/news/12114](https://andpad.co.jp/news/12114/) |
| **SPIDERPLUS** (TSE Growth, 4192) | ARR | **¥4,53 mrd** (+29% j-o-j) | FY2024 | [irtv.jp/channel/18151](https://irtv.jp/channel/18151) |
| | Recurring aandeel omzet | ±99% | | idem |
| **ダンドリワーク** | Klantbedrijven | *"100.000社"* (claim leverancier) | 2025 | [aippearnet.com](https://www.aippearnet.com/column/constructiondx/kouteihyou-sakusei-soft/) |
| **KANNA** (Aldagram) | Klantbedrijven | *"70.000社"* (claim leverancier) | 2025 | idem |
| **現場ナビ工程** (構造ソフト/アレント) | Implementaties | **500+**, retentie 96%, *"スーパーゼネコンでシェアNo.1"* | 2025 | [genba-navi-kotei.arent.co.jp](https://genba-navi-kotei.arent.co.jp/) |
| **Primavera P6** (via TIS千代田システムズ) | Cumulatieve implementaties | **±120 bedrijven**, *"国内No.1"* | dec. 2022 | [tc-systems.co.jp](https://www.tc-systems.co.jp/service/pm/primavera-p6/) |
| **Lychee Redmine** (アジャイルウェア) | Klantbedrijven | *"7.000社"* (claim leverancier) | 2025 | [aippearnet.com](https://www.aippearnet.com/column/constructiondx/kouteihyou-sakusei-soft/) |

**Algemene PPM-markt Japan (secundaire bron, lage betrouwbaarheid):** IMARC Group schat de Japanse Project Portfolio Management-markt op **USD 402 mln in 2024** → **USD 1,418 mrd in 2033**, CAGR 15%. Dit is een westers marktrapport zonder Japanse primaire validatie; ik gebruik het alleen als orde-van-grootte-check. **Betrouwbaarheid: laag.** (Gevonden via secundaire vermelding; het originele rapport zit achter een betaalmuur.)

### 2.3 Hoe groot is specifiek de *planning/scheduling*-markt? **[EIGEN SCHATTING]**

Er bestaat geen publiek cijfer voor "工程管理ソフト" als losse markt. Ik triangule op twee manieren.

**Methode A — top-down uit Yano.**
- Basis FY2023 建築-ConTech-software: ¥184,5 mrd.
- Segment 施工管理 is volgens Yano een van de twee snelst groeiende van zeven; ik schat het aandeel op **25–30%** → ¥46–55 mrd.
- Binnen 施工管理 is planning één functie naast fotobeheer, tekeningbeheer, dagrapporten, checklists, in-/uitcheck. In de prijsopbouw van de SaaS-suites (ANDPAD, ダンドリワーク, KANNA) is het工程表-onderdeel geen apart geprijsde module maar een feature; ik schat de toerekenbare waarde op **15–25%** → **¥7–14 mrd**.
- Optellen voor 土木/infra (buiten Yano's scope) en voor losse desktoppakketten en westerse licenties: **+¥1–3 mrd**.
- **Uitkomst A: ¥8–17 mrd (USD 50–105 mln).**

**Methode B — bottom-up per zitplaats.**
- 370.000 技術者 in de bouw. Daarvan maakt of onderhoudt naar schatting **40–60%** regelmatig een 工程表 (in Japan doet de 現場代理人/工事主任 dat zelf; er is zelden een aparte planner) → **150.000–220.000 personen**.
- Betaalde, *dedicated* planningszitplaatsen (dus niet Excel): adoptie 42% van bedrijven, maar binnen die bedrijven lang niet iedereen → **[EIGEN SCHATTING]** 80.000–150.000 betaalde zitplaatsen.
- Gemiddelde jaarwaarde per zitplaats: het spectrum loopt van ¥3.938 eenmalig (工程さん) tot ¥158.400/jaar (現場ナビ工程 maandlicentie) tot ¥68.640/jaar (eYACHO per ID). Gewogen gemiddelde: **¥50.000–90.000/jaar**.
  > **Verificatie-kanttekening [ONZEKER — waarschijnlijk te hoog]:** de gebruikte ankers zitten stelselmatig aan de bovenkant. eYACHO's **jaarplan** is ¥37.800/licentie/jaar (≈ ¥3.150/mnd) en de スタンダード版 ¥4.200/licentie/maand — niet de ¥68.640/jaar die hier als anker dient; die ¥68.640 is 12 × het *duurste* maandtarief (¥5.720). 現場ナビ工程 standalone is ¥52.800/jaar en de koopvariant komt na jaar 1 op ¥39.600/jaar onderhoud. Een realistischer gewogen gemiddelde ligt eerder rond **¥35.000–70.000/jaar**, wat methode B naar **¥2,8–10,5 mrd** duwt. De gepubliceerde bandbreedte van methode B is dus optimistisch.
- **Uitkomst B: ¥4–13,5 mrd (USD 25–83 mln)** — met bovenstaande correctie eerder **¥3–10,5 mrd**.

**Gecombineerde schatting: ¥8–15 miljard (USD 50–95 miljoen) in 2025**, met een middenwaarde rond **¥11 mrd (USD 68 mln)**. Groei naar **¥18–25 mrd in 2030** **[EIGEN SCHATTING]** — sneller dan Yano's 7,4% totaalmarkt, omdat planning precies de functie is waar het 2024年問題 en 週休2日 op drukken.

> **Verificatie-kanttekening bij de combinatie [GECORRIGEERD]:** de rekensommen van A en B kloppen elk afzonderlijk (nagerekend: 25–30% × ¥184,5 mrd = ¥46,1–55,4 mrd; 15–25% daarvan = ¥6,9–13,8 mrd; +¥1–3 mrd → ¥8–17 mrd. En 40–60% × 370.000 = 148.000–222.000; 80.000–150.000 × ¥50.000–90.000 = ¥4,0–13,5 mrd). **Maar de gecombineerde bovengrens van ¥15 mrd wordt door geen van beide methodes gedragen als je hun overlap neemt:** de doorsnede van A (¥8–17) en B (¥4–13,5) is **¥8–13,5 mrd**. Met de gecorrigeerde zitplaatswaarde krimpt de overlap verder tot ongeveer **¥8–10,5 mrd**. Een eerlijker uitspraak is daarom: **¥8–13,5 mrd (USD 50–83 mln), middenwaarde ±¥10 mrd (USD 62 mln)**, met de kanttekening dat beide methodes op niet-geverifieerde aandeelaannames (25–30%, 15–25%, 40–60%) rusten die Yano niet publiceert. Yano bevestigt wél dat 施工管理 het **grootste** van de zeven segmenten is, wat de 25–30%-aanname plausibel maakt maar niet bewijst.

**Aantal planners — ordegrootte [EIGEN SCHATTING]:**

| Categorie | Aantal | Redenering |
|---|---|---|
| Mensen die regelmatig een 工程表 maken/bijwerken | **150.000–250.000** | 40–60% van 370.000 技術者, plus een deel van de 2級-houders bij onderaannemers |
| Betaalde zitplaatsen dedicated planningssoftware | **80.000–150.000** | zie methode B |
| **Full-time planners in westerse zin** (専任スケジューラー) | **1.500–4.000** | Vrijwel uitsluitend bij EPC (JGC, Chiyoda, TOYO), grote infra-JV's, en de PMO's van de vijf super-ゼネコン. Japan kent geen brede "planner"-beroepsrol; de 所長 plant zelf. Dit is de doelgroep voor P6. |

Dat laatste getal verklaart de ~120 P6-klanten: **de Japanse markt voor echte CPM-planningssoftware is klein in mensen, niet in geld.**

---

## 3. Gebruikte software: wie gebruikt wat, met marktpositie en prijzen

### 3.0 Rangorde-overzicht

**Binnenlandse bouwprojecten (建築 + 土木), naar feitelijk gebruik:**

| # | Software | Type | Positie |
|---|---|---|---|
| 1 | **Microsoft Excel** | Spreadsheet | **De facto marktleider.** Geen enquêtecijfer gevonden, maar elk Japans vergelijkingsartikel opent met "Excel of speciale software?" en alle leveranciers positioneren zich expliciet tegen Excel (現場ナビ工程: "30–40% sneller dan Excel of CAD"). Er circuleren tientallen gratis Excel-工程表-sjablonen. **[EIGEN SCHATTING: 55–75% van alle 工程表 in Japan wordt in Excel of op papier gemaakt.]** |
| 2 | **デキスパート** (建設システム/KENTEM) | Desktop-suite | **18% marktaandeel, #1 in de hele bouwsector** (MM総研). Sterk in 土木 en overheidsopdrachten (電子納品). |
| 3 | **ANDPAD** (アンドパッド) | Cloud-suite | ±260.000 bedrijven (26万社), 690.000 gebruikers, ARR ¥10 mrd, *"導入企業数8年連続シェアNo.1"* in de 建設業マネジメントクラウドサービス市場 (デロイトトーマツ ミック経済研究所). Breed, maar planning is één module. |
| 4 | **現場ナビ工程** (構造ソフト, distributie アレント) | Desktop, planning-only | **#1 bij de super-ゼネコン** volgens eigen opgave; bedrijfsbrede standaard bij meerdere van de vijf grootste aannemers. 500+ implementaties, 96% retentie. **Dit is de directe concurrent voor een westers planningspakket.** |
| 5 | **eYACHO** (MetaMoJi) | Tablet/handschrift | **#1 bij ゼネコン** onder smartdevice-gebruikers (MM総研). Digitaal notitieboek met工程表-functie. |
| 6 | **ダンドリワーク** | Cloud-suite | Sterk bij 工務店/reform; claim 100.000 bedrijven. |
| 7 | **工程's / 工程's Orario** (ウェッブアイ) | Desktop, planning-only | De Japanse "serieuze" planningstool; cross-industrie (bouw, auto, software, onderhoud). Versie 17.0. |
| 8 | **現場Plus** (ダイテック) | Cloud | Hoogste beoordeling op ITreview in 工事管理 (4,5/5, 26 reviews). |
| 9 | **SPIDERPLUS** (beursgenoteerd, 4192) | Cloud/tablet | ARR ¥4,53 mrd; sterk in 設備 (installaties). |
| 10 | **KANNA** (Aldagram) | Cloud, freemium | 70.000 bedrijven; gratis instap. |
| 11 | **Microsoft Project** | Desktop/cloud | Aanwezig maar marginaal in de bouw; meer bij IT/plant/engineering. |
| 12 | **Primavera P6** | Enterprise CPM | **±120 klanten in heel Japan.** Zie §3.6. |

**Internationale / export-EPC-projecten (compleet andere rangorde):**

| # | Software | Positie |
|---|---|---|
| 1 | **Oracle Primavera P6 (EPPM/Professional)** | **Dominant en vaak contractueel verplicht.** Chiyoda gebruikt het al 20+ jaar via TIS千代田システムズ. Amerikaanse militaire bouwprojecten in Japan eisen P6-formaat rapportage. |
| 2 | **Eigen PMS-systemen** | JGC (日揮) draait een eigen *"PMS"* dat mensen, materieel, geld, ontwerpdocumenten en tijd beheert via één gedeelde WBS over 設計・調達・建設・試運転. Bron: [jgc.com](https://www.jgc.com/jp/business/project-management/) |
| 3 | **AVEVA** (Unified Engineering + Asset Information Management) | Toyo Engineering (東洋エンジニアリング) zet hierop in voor EPC-brede DX. Bron: [aveva.com](https://www.aveva.com/ja-jp/about/news/press-releases/2022/) |
| 4 | **Oracle Primavera Cloud** | Aangeboden door TIS千代田システムズ als cloudvariant. |
| 5 | **MS Project** | Voor kleinere pakketten/onderaannemersscope. |

---

### 3.1 Lokale bouwspecifieke planningspakketten (de kern van deze markt)

Dit zijn de pakketten die in westerse bronnen vrijwel niet voorkomen en die je concurrentie zijn.

#### **現場ナビ工程 (Genba Navi Kōtei)** — 構造ソフト, distributie アレント (Arent)

Het belangrijkste zuivere bouwplanningspakket van Japan.

- **Positie:** *"スーパーゼネコンでシェアNo.1"* — marktaandeel #1 onder de super-aannemers. 500+ implementaties, **96% dienstcontinuering**. Meerdere super-ゼネコン gebruiken het bedrijfsbreed als standaard.
  > **Verificatie-kanttekening:** dit zijn **leveranciersclaims zonder onafhankelijke onderbouwing**. De No.1-claim draagt de voetnoot *"2022年4月 構造ソフト調べ"* — een **eigen onderzoek van de leverancier uit april 2022**, niet een marktonderzoeksbureau, en niet 2025. Steekproefomvang en methode zijn niet gepubliceerd. Het feit dat meerdere スーパーゼネコン het bedrijfsbreed als standaard hebben ingevoerd is wél meervoudig terug te vinden. Behandel "500+", "96%" en "No.1" als **onzeker**.
- **Kernidee:** *"事前準備なしで手描き感覚の工程表作成"* — een balkenplanning tekenen met de muis zoals je hem met de hand zou tekenen, zonder eerst een WBS of activiteitentabel op te bouwen. Claim: **30–40% efficiëntiewinst tegenover Excel of CAD**.
- **Automatisering:** door **negen basisparameters van het gebouw** in te voeren genereert het automatisch een 総合工程表 (masterplanning). Dat is een gebouwtypologie-gedreven generator, geen CPM-solver.
- **Opties:** 歩掛りデータ処理 (productiviteitsnormen), tabelvormige bewerking, tijdsuitdrukking (uren binnen een dag).
- **Platform:** Windows 11. iPad-viewer beschikbaar (iPad現場ナビ工程 ビューア). Variant 現場ナビ工程 Auto.

**Prijzen** ([kozosoft.co.jp](https://www.kozosoft.co.jp/genba_navi/seihin/koutei/koutei_p6.html), **alle bedragen 税込/incl. btw** — de bronpagina zet letterlijk `（税込）` achter elk bedrag; alle vier de bedragen zijn ook exact 1,1× een rond getal (¥90.000 / ¥36.000 / ¥12.000 / ¥4.000), wat dit bevestigt. *Gecorrigeerd bij verificatie: eerdere versie vermeldde 税別.*):

| Model | Prijs JPY | USD @¥162 |
|---|---|---|
| Netwerklicentie, aanschaf | **¥99.000 / licentie** | ≈ USD 611 |
| Netwerklicentie, jaarlijks onderhoud (incl. support) | **¥39.600 / licentie / jaar** | ≈ USD 244 |
| Netwerklicentie, maandelijks (incl. support) | **¥13.200 / licentie / maand** (= ¥158.400/jaar) | ≈ USD 81/mnd |
| Standalone-pc licentie, maandelijks (incl. support) | **¥4.400 / licentie / maand** (= ¥52.800/jaar) | ≈ USD 27/mnd |

**Voordelen (uit lokale reviews en documentatie):**
- Extreem lage instapdrempel voor Japanse 現場-mensen: wie een 工程表 met de hand kan tekenen, kan dit direct bedienen.
- Produceert exact de Japanse conventionele lay-out (バーチャート met 出来高曲線, weeknummering, Japanse feestdagen) die bouwdirecties en opdrachtgevers verwachten.
- Bewezen bij de zwaarste projecten in Japan; risicoloze keuze voor een 所長.
- Prijs is voor Japanse begrippen laag — ¥99.000 eenmalig is minder dan de helft van MS Project Standard.

**Nadelen (uit lokale reviews):**
- **Alleen planning.** Geen fotobeheer, geen tekeningbeheer, geen dagrapporten. Vergelijkingssites merken op: *"スケジュール管理に特化しており、総合的な現場管理と比べて機能範囲が狭い"* (bron: [sakumiru.jp](https://sakumiru.jp/column/review-genbanavi-koutei)). Wie een suite wil, moet het naast ANDPAD/ダンドリワーク draaien.
- **Windows-only, desktopgebonden.** De iPad-app is view-only.
- Geen echte CPM-motor met total float, kritieke-padanalyse over complexe netwerken, of resource-nivellering in de westerse zin — het is een tekentool met datumassistentie.
- Netwerklicentie is nodig voor gedeeld gebruik; dat maakt thuiswerken/multi-site lastiger dan bij cloud.

#### **工程's / 工程's Orario (Kōtei's Orario)** — ウェッブアイ (Web I Corporation)

Het meest "software-engineering"-achtige Japanse planningspakket, en het pakket dat qua ambitie het dichtst bij P6/Asta komt.

- **Positie:** cross-industrieel. Doelsectoren: 建設・土木, auto en onderdelen, softwareontwikkeling, productontwikkeling/productievoorbereiding, 設備保全 (onderhoudsstops), facility management, R&D. Versie **17.0**.
- **Kernidee:** *"1つのファイルの中で、月間、週間、年間を自由に切り替え"* — één bestand waarin je vrij schakelt tussen jaar-, maand- en weekplanning. Dat sluit exact aan op de Japanse planningshiërarchie (基本→月間→週間, zie §5.1) en is iets wat westerse tools slecht doen.
- **Bediening:** *"手描き感覚"* met muis en drag-and-drop, meerdere taken tegelijk.
- **Productfamilie ウェッブアイ:**
  - **工程's Orario** — de planner zelf
  - **Planow Orario** — systeem voor het delen van plannen
  - **PREGARE Orario** — enterprise projectmanagementsysteem
  - **Kamui Orario** — high-speed scheduler-*library* (een solver-component die andere systemen kunnen aanroepen — opmerkelijk, dit is de enige Japanse commerciële scheduling-engine als los product die ik gevonden heb)
  - **GRAFACTA Solena** — AI-gedreven cloudtool
- **Prijs:** **応相談 (op aanvraag)** — geen publieke lijstprijs. Bron: [webi.co.jp](https://www.webi.co.jp/management/product/kouteizu/), [IT Trend](https://www.it-trend.jp/process_management/23613)

**Voordelen:**
- De enige Japanse aanbieder met een echte planningsstack inclusief herbruikbare solver-library en PMO/consultancy-diensten.
- Regelmatige versie-updates op basis van klantfeedback; support, training en consulting inbegrepen in het aanbod.
- Sterk in het meest Japanse deel van planning: naadloos wisselen tussen planningsniveaus binnen één bestand.

**Nadelen:**
- **Geen transparante prijs.** 応相談 betekent in Japan doorgaans een enterprise-verkooptraject met offerte, en dat sluit het mkb uit.
- Positioneert zich cross-industrieel, waardoor het in de bouw minder bouw-specifiek is dan 現場ナビ工程 (geen 歩掛り-database, geen automatische masterplanning uit gebouwparameters).
- Zwaardere leercurve dan de "teken maar" concurrentie.

#### **工作2プラス (Kōsaku 2 Plus)** — 宮本システムコンサルタント (Miyamoto System Consultant)

Klein maar functioneel het interessantst: **het enige goedkope Japanse pakket dat ik gevonden heb dat expliciet zowel バーチャート als ネットワーク工程表 ondersteunt.**

- **Functies:** バーチャート工程表, **ネットワーク工程表**, 日報 (dagrapport), 出来高進捗 (voortgang naar volume).
- **Doelgroep:** klein tot middelgroot (~50 personen).
- **Prijs:** **¥88.000~ eenmalig** (≈ USD 543), **¥0/maand** (koopmodel), jaarlijkse support **¥11.000 apart**.
- Bron: [aippearnet.com](https://www.aippearnet.com/column/constructiondx/kouteihyou-sakusei-soft/), [gemba-tech](https://kensetsu.gemba-tech.jp/list/schedule-management-software/)

**Voordelen:** intuïtieve bediening, ingebouwde dagrapportfunctie, koopmodel zonder abonnementsverplichting, ondersteunt de examen-canonieke netwerkvorm.
**Nadelen:** alleen installatie-versie (geen cloud), kleine leverancier met beperkte support-schaal, weinig zichtbaarheid/reviews.

#### **コストナビ工程表 (CostNavi Kōteihyō)** — 建築ソフト

- **Functies:** 工程表, voortgangsbeheer, **出来高算出 (volumeberekening)**, planning-vs-realisatie weergave, 出来高曲線 (S-curve).
- **Prijs:** **¥99.000 pakketversie** (≈ USD 611) of **¥4.400/maand abonnement** (≈ USD 27).
- **Doelgroep:** klein/middelgroot (~50 personen).

**Voordelen:** licht (draait op oude machines), sterke koppeling planning ↔ 出来高 (het Japanse equivalent van earned value), lage prijs.
**Nadelen:** **Windows-only**, beperkte samenwerkingsfuncties, kleine leverancier.

#### **工程さん (Kōtei-san)** — 花ソフト (Hana Soft)

Het goedkoopste serieuze pakket van Japan; typisch voor de Japanse "shareware"-traditie die in het Westen niet meer bestaat.

- **Functies:** 工程表, ガントチャート, **進捗線 (voortgangslijn)**, マイルストーン.
- **Prijs:** **¥3.938 incl. btw, eenmalig** (≈ USD 24). ¥0/maand. **60 dagen gratis proberen.**
- Bron: [aippearnet.com](https://www.aippearnet.com/column/constructiondx/kouteihyou-sakusei-soft/)

**Voordelen:** spotgoedkoop, koopmodel, ruime proefperiode, doet precies wat een kleine aannemer nodig heeft.
**Nadelen:** Windows-only, generiek (niet bouwspecifiek), geen samenwerking, geen support-organisatie van betekenis, individueel/zeer klein gebruik.

> **Strategische observatie:** dit prijspunt (¥3.938 eeuwig) is de reden dat een westers abonnement van USD 20–30/maand in het Japanse mkb niet landt. Japanse kleine aannemers zijn gewend software te **kopen**, niet te huren.

#### **サクっと工程 (Sakutto Kōtei)**

- **Functies:** 工程進捗, スケジュール, **負荷山積 (belasting-stapeling / resource histogram)**, 出荷入力.
- **Prijs:** **¥580.000 initieel (税別)** (≈ USD 3.580); maandbedrag op aanvraag.
- **Doelgroep:** 単品加工業 (stukproductie) tot ~50 personen — meer maakindustrie dan bouw, maar wordt in bouwvergelijkingen genoemd.

**Voordeel:** 山積み is ingebouwd (zeldzaam). **Nadeel:** hoge instapprijs, industrie-mismatch met bouw.

#### **プロコラ / PROCOLLA** — アレント (Arent) × 大林組 (Obayashi), verkoop via Oprizón

Het meest vooruitstrevende Japanse product en een sterke indicatie van waar de markt heen gaat.

- **Lancering:** **7 augustus 2025**. Bron: [arent.co.jp](https://arent.co.jp/news/20250808_procolla/), [procolla.com](https://procolla.com/)
- **Kernidee:** *"CAD図面や見積書などを生成AIに読み込ませると、工程表のバーチャートを自動作成"* — voer CAD-tekeningen en calculaties in generatieve AI, en het systeem genereert automatisch de balkenplanning. Daarna aanpassen met **natuurlijke taal**, zonder softwarekennis.
- **Verdere functies:** automatische herplanning bij wijzigingen, resource-beheer.
- **Doelgroep:** middelgroot tot groot (30–300 personen).
- **Status:** proefimplementatie op geselecteerde Obayashi-projecten.
- **Prijs:** niet openbaar.

**Voordelen:** lost precies het Japanse pijnpunt op (工程表 maken kost een 所長 dagen), co-ontwikkeld met een super-ゼネコン dus geloofwaardig.
**Nadelen:** zeer nieuw, geen onafhankelijke reviews, prijs onbekend, afhankelijk van kwaliteit van invoertekeningen.

---

### 3.2 Lokale cloud-suites voor 施工管理 (planning als module)

Dit is waar het geld zit. Planning is hier één tab naast foto's, tekeningen, chat en dagrapporten.

| Product | Leverancier | Initieel | Maandelijks | Doelgroep |
|---|---|---|---|---|
| **ANDPAD** | アンドパッド | op aanvraag | op aanvraag (initieel + maandelijks + opties) | Groot; 265.000 bedrijven |
| **ダンドリワーク** | ダンドリワーク | **¥200.000~** | **¥3.000~** (instap/入退場) tot **¥15.000~** (standaard) | Klein–groot (20–honderden) |
| **eYACHO** | MetaMoJi | **¥330.000** (alleen 1e jaar) | **¥3.520–5.720 / ID** | Klein–groot; **#1 bij ゼネコン** |
| **KANNA** | Aldagram | **¥0** | **¥0~** (freemium) | Klein–middel (~100) |
| **サクミル** | プレックス | **¥0** | **¥9.800 / 30 accounts** | Klein (~30) |
| **現場ポケット** | — | **¥0** | **¥14.850~** vast, **onbeperkt accounts** | Klein–middel (reform/schilderwerk) |
| **施工管理＋α** | — | **¥0~** | **¥19.580~** + **¥550/apparaat** | Klein–middel |
| **PROSHARE** | ケンテム (KENTEM) | **¥30.000** (初期開設費, 税抜) | **¥60.000/JAAR** (50GB + 5 lic.), *niet* per maand **[GECORRIGEERD]** | Klein–middel (~50) |
| **BUILDY NOTE** | フィックス | op aanvraag | op aanvraag | Middel–groot (50–300) |
| **AnyONE** | エニワン | op aanvraag | op aanvraag | Klein (~30), 工務店/reform |
| **anymore** | — | **¥0** | op aanvraag (LINE-integratie) | Klein–middel (~100) |
| **アイピア** | アイピア | op aanvraag | op aanvraag | 500 bedrijven, retentie 98% |
| **現場Plus** | ダイテック | op aanvraag | op aanvraag | ITreview-topscore 4,5/5 (26 reviews) |
| **建て役者** | システムサポート | op aanvraag | op aanvraag | Bouwspecifiek, hergebruik calculaties |

Bronnen: [gemba-tech 工程管理ソフト16選](https://kensetsu.gemba-tech.jp/list/schedule-management-software/), [aippearnet 14選](https://www.aippearnet.com/column/constructiondx/kouteihyou-sakusei-soft/), [digi-mado](https://digi-mado.jp/article/118870/), [ITreview 工事管理](https://www.itreview.jp/categories/construction-management)

**ITreview-beoordelingen 工事管理システム (37 producten, 59 reviews totaal — let op: kleine steekproef):**

| Product | Score | Reviews | Leverancier |
|---|---|---|---|
| 現場Plus | 4,5 | 26 | ダイテック |
| ANDPAD | 4,0 | 10 | アンドパッド |
| アイピア | 4,8 | 5 | アイピア |
| サクミル | **3,2** | 4 | プレックス |
| ダンドリワーク | 4,1 | 3 | ダンドリワーク |
| CAREECON Plus | 5,0 | 2 | BRANU |
| BUILDYNOTE | 4,7 | 2 | フィックス |
| EX-TREND武蔵 | 4,3 | 2 | 福井コンピュータアーキテクト |
| HOUSING CORE | 4,5 | 1 | DTS |
| 蔵衛門 | 4,5 | 1 | ルクレ |

**Voor- en nadelen van de suites (uit lokale reviews):**

*ANDPAD* — **Voordelen:** grootste netwerkeffect (265.000 bedrijven betekent dat je onderaannemers er al op zitten), breedste functionaliteit, AI-automatisering. **Nadelen:** *"Apple Storeレビューを見ると評判は高くない印象があります"* — de App Store-reviews zijn opvallend zwak ([gemba-tech](https://kensetsu.gemba-tech.jp/reviews/andpad/)); expliciet minder geschikt voor bedrijven van 20–30 man; prijs niet transparant; de 工程表-module is functioneel dun vergeleken met 現場ナビ工程.

*ダンドリワーク* — **Voordelen:** elektronisch bestellen/opdrachtverstrekking (電子受発注) inbegrepen, kalender-工程表 naast gantt, sterk in het aansturen van 職人. **Nadelen:** **hoge instapkosten (¥200.000)** worden in vergelijkingsartikelen consequent als bezwaar genoemd.

*eYACHO* — **Voordelen:** handschriftinvoer op tablet sluit perfect aan bij hoe Japanse 現場監督 werken; #1 bij ゼネコン. **Nadelen:** **¥330.000 initieel** is een forse drempel; per-ID-model wordt duur bij grote teams (100 ID's × ¥5.720 = ¥572.000/maand).

*サクミル* — laagste ITreview-score (3,2). **Nadeel:** functiediepte.

---

### 3.3 Lokale/Japanse algemene projectmanagementtools

| Product | Leverancier | Kenmerk | Prijs |
|---|---|---|---|
| **Backlog** | ヌーラボ (Nulab) | De bekendste Japanse PM-tool; gantt inbegrepen; sterke positie in IT maar wordt ook in bouw/vastgoed gebruikt. 6,47% in BOXIL-enquête (n=1.825); beoordeeld als hoogst-gerangschikte Japanse PM-SaaS. | Niet publiek in gevonden bronnen |
| **Lychee Redmine** | アジャイルウェア | Redmine-gebaseerd, met echte **gantt + CPM-achtige afhankelijkheden + EVM + resource-management**. Claim 7.000 bedrijven. Cloud (Free/Standard/Premium/Business) en on-premise. 30 dagen proef. | Gratis plan aanwezig; betaalde tarieven op [lychee-redmine.jp/plan](https://lychee-redmine.jp/plan/) |
| **Brabio!** | ビーワークス | Japanse gantt-tool, gratis instap, gericht op mkb. | [brabio.jp/estimates.html](https://brabio.jp/estimates.html); enterprise (>1.000 leden) op aanvraag |
| **Project Canvas** | ルミックス・インターナショナル | Japans desktoppakket met **gelijktijdig bewerken en hiërarchische WBS**; positioneert zich als goedkoop alternatief voor MS Project. | **¥5.500/jaar**; **¥15.840/3 jaar**; **¥18.480 3-jaars pakket** (cd-rom + gedrukte handleiding). Volumekortingen: 10–19 lic. −10%, 20–49 −20%, 50–99 −30%, 100+ −40%. Bron: [rumix.co.jp/pc/price.html](https://www.rumix.co.jp/pc/price.html) |
| **みんなでガント.com** | サムテック | Simpele gedeelde gantt; gratis instap, periodecontracten. | Gratis~ |
| **Jooto** | PR TIMES | Kanban + gantt | — |
| **kintone** | サイボウズ | Extreem breed gebruikt low-code platform; veel bouwbedrijven bouwen hun eigen 工程管理-app erop. | — |
| **Cloudlog** | — | **13,21%** — leider in BOXIL-enquête onder 1.825 gebruikers | — |
| **CrewWorks** | — | 7,67% (BOXIL) | — |
| **OBPM Neo** | システムインテグレータ | PPM voor IT-projecten | — |

Bron BOXIL-enquête: [boxil.jp/mag/a7777](https://boxil.jp/mag/a7777/) (n=1.825 gebruikers van projectmanagementtools). Volgorde: Cloudlog 13,21% · Oracle NetSuite 8,33% · CrewWorks 7,67% · Asana 7,07% · Backlog 6,47%.
> **Kanttekening bij deze enquête:** dit is een generieke PM-tool-enquête, niet bouwspecifiek, en de aanwezigheid van Oracle NetSuite (een ERP) in de lijst suggereert een losse definitie. Behandel als indicatief.

**Voordelen van de Japanse algemene tools:** volledig gelokaliseerde UI en support, Japanse fiscale/feestdagenkalender, prijzen in yen, facturering via Japanse betaalgewoonten (請求書払い/bankoverschrijving in plaats van creditcard — een reëel adoptieobstakel voor westerse SaaS).
**Nadelen:** vrijwel geen enkele heeft een echte CPM-motor met total float en kritiek pad; Lychee Redmine is de uitzondering.

---

### 3.4 Westerse algemene projectplanningstools in Japan

| Product | Positie in Japan | Prijs Japan |
|---|---|---|
| **Microsoft Project** | Aanwezig maar **zwak in de bouw**; sterker bij IT, plant-engineering en als "tweede taal" voor internationale projecten. Wordt in Japanse bouwvergelijkingen zelden genoemd. | **Project Professional 2024: ¥201.490** eenmalig (≈ USD 1.244); **Project Standard 2024: ¥120.780** (≈ USD 746). Bron: [microsoft.com/ja-jp](https://www.microsoft.com/ja-jp/microsoft-365/project/compare-microsoft-project-management-software). **Project Plan 3: ¥4.722/gebruiker/maand excl. btw (¥5.194 incl. btw)** via NTT Docomo Business ([bron](https://www.onlineshop.docomobusiness.ntt.com/s/86c6b418-72e4-11ee-b4e5-4f0529be4007)). Plan 1 en Plan 5 prijzen niet op de Japanse site gevonden; Microsoft Japan toont op de vergelijkingspagina alleen de eeuwigdurende licenties. |
| **Smartsheet** | Genoemd in Japanse bouwvergelijkingen als "Excel-gevoel"; 190 landen. Beperkte bouwpenetratie. | **vanaf ¥1.200/maand** ([aippearnet](https://www.aippearnet.com/column/constructiondx/kouteihyou-sakusei-soft/)) |
| **Asana** | 7,07% in BOXIL-enquête — relatief sterk voor een westerse tool, maar vooral IT/marketing | — |
| **monday.com** | Aanwezig, marketinggedreven; nauwelijks in bouwvergelijkingen | — |
| **Wrike** | Aanwezig; nauwelijks in bouw | — |
| **Jira + gantt-plug-ins** (BigPicture, Structure.Gantt) | IT-sector; niet in de bouw | — |
| **Zoho Projects** | Marginaal | — |
| **Bitrix24** (Alaio als Japanse partij) | Genoemd in bouwvergelijkingen; CRM-integratie | **vanaf USD 49/maand** |
| **FineReport** (帆軟ソフトウェア, Chinees) | Genoemd als BI/dashboard-optie in bouwvergelijkingen — interessant: Chinese software wordt in Japanse bouwlijstjes wél genoemd | op aanvraag |
| **Trello** | Klein team-gebruik | — |

**Waarom westerse algemene tools het moeilijk hebben:**
- Geen 出来高曲線/バナナ曲線, geen 山積み・山崩し, geen アロー型ネットワーク — dus geen enkele output die een Japanse opdrachtgever herkent.
- Geen 元号 (Japanse jaartelling, 令和), geen Japanse feestdagenkalender out-of-the-box, geen お盆/年末年始-sluitingen.
- Creditcard-abonnementen botsen met 請求書払い (factuur/overschrijving) als bedrijfsnorm.
- Prijs per gebruiker per maand botst met de Japanse voorkeur voor eeuwigdurende licenties in het mkb.

---

### 3.5 Open source

| Product | Situatie in Japan |
|---|---|
| **Redmine** | **Zeer sterk.** Redmine heeft in Japan een uitzonderlijk grote community (veel groter relatief dan in het Westen) — er zijn Japanse boeken, conferenties (Redmine.tokyo) en de commerciële derivaat **Lychee Redmine** met 7.000 klantbedrijven. Dit is verreweg het succesvolste open-source projectmanagementverhaal in Japan. |
| **ProjectLibre / GanttProject / OpenProject** | Marginaal; komen in Japanse bouwvergelijkingen nauwelijks voor. De "gratis" categorie in Japanse artikelen wordt gevuld met **Excel-sjablonen**, niet met open-source-applicaties: *Hotateの苦悩*, *Red Warrior (3S-HACKS!)*, *Excel Pro工程表*, *ガントチャートforExcel*, *簡単!Excel工程表* ([bron](https://kensetsu.gemba-tech.jp/list/schedule-management-software/)). |

> **Belangrijke observatie voor een open-source planningstool:** de Japanse "gratis"-markt is een **Excel-sjabloonmarkt**, geen applicatiemarkt — behalve bij Redmine, waar het model bewezen werkt. Een open-source planner die in Japan wil landen, moet óf de Redmine-route (community + commerciële support) óf de Excel-route (import/export van de gangbare sjablonen) volgen.

---

### 3.6 Westerse bouwspecifieke pakketten

#### **Oracle Primavera P6** — de enige met echte voet aan de grond, en die voet is klein

- **Installed base: ±120 bedrijven cumulatief** via TIS千代田システムズ, dat zichzelf **国内No.1** noemt met **20+ jaar P6-ervaring**. Letterlijk op de site: *"累計約120社への導入実績（2022年12月現在）"* en *"国内No.1※の取扱い実績"*. **[BEVESTIGD, met twee kanttekeningen]** (a) het is een **zelfclaim** waarvan de No.1-voetnoot terugverwijst naar diezelfde eigen cumulatieve telling — geen onafhankelijke marktmeting; (b) de **peildatum is december 2022**, inmiddels ruim 3,5 jaar oud; het huidige aantal kan hoger liggen. Bron: [tc-systems.co.jp](https://www.tc-systems.co.jp/service/pm/primavera-p6/)
- **Sectoren:** engineering, bouw, petrochemie, farmacie, scheepsbouw.
- **Waarom gekocht:** (a) projecten te groot voor Excel/MS Project; (b) *"visual and logic-based schedule management"* voor kwantitatieve in plaats van ervaringsgebaseerde sturing; (c) **contractuele verplichting** — internationale projecten en met name **Amerikaanse militaire bouwopdrachten in Japan** eisen rapportage in P6-formaat.
- **Ondersteuning:** Japanstalige support via het **PRIMA-TECH**-expertteam; standaard P6-trainingscursussen (planning opstellen, data-invoer, plan-vs-realisatie); specifieke ondersteuning voor US-militaire projecten; **PROJECT CLOUD®** als gehoste variant.
- **Andere Japanse P6-dienstverleners:** DTSolution ([dtsolution.io/ja](https://www.dtsolution.io/ja) — PMIS, Primavera Unifier + P6, grote EPC en scheepsbouw), LTM Solutions ([ltm-solutions.com](https://ltm-solutions.com)).
- **Prijs:** **Oracle publiceert geen Japanse yen-prijslijst voor Primavera.** De Japanse prijspagina ([oracle.com/jp/corporate/pricing](https://www.oracle.com/jp/corporate/pricing/japanese-pricing-licensing/)) dekt technologieproducten, niet Primavera; verkoop loopt via offerte.
  **[EIGEN SCHATTING op basis van internationale Oracle-lijstprijzen]:** P6 EPPM eeuwigdurend ligt internationaal rond USD 2.500–3.500 per named user + ~22% jaarlijkse support; P6 Professional Cloud Service rond USD 2.000–2.900/gebruiker/jaar. Omgerekend **¥400.000–570.000 per zitplaats eeuwigdurend** of **¥320.000–470.000/gebruiker/jaar cloud**. Japanse listprijzen liggen door Oracle's wereldwijde prijsbeleid dicht bij de USD-lijst; kortingen van 20–40% bij enterprise-deals zijn gebruikelijk. **Betrouwbaarheid: matig — niet geverifieerd tegen een Japanse bron.**
  **Trainingskosten [EIGEN SCHATTING]:** een 2–3-daagse P6-basiscursus in Japan kost naar verwachting **¥150.000–300.000 per persoon** — Japanse enterprise-IT-training zit doorgaans op ¥60.000–100.000/dag. **Niet geverifieerd.**

**Voordelen in Japanse context:** de enige tool die internationale opdrachtgevers/financiers accepteren; Japanstalige support bestaat (PRIMA-TECH); bewezen op megaprojecten.
**Nadelen in Japanse context:** kost een veelvoud van 現場ナービ工程 (¥99.000); produceert **geen** Japanse conventionele outputs (バナナ曲線, アロー型ネットワーク, タクト-diagram); vraagt een dedicated planner-rol die in de Japanse bouworganisatie niet bestaat; de zware WBS-vooraf-discipline botst met de "手描き感覚"-werkwijze.

#### **Bentley SYNCHRO**

- **Distributie:** **トプコンソキアポジショニングジャパン (Topcon Sokkia Positioning Japan)** verkoopt SYNCHRO sinds **december 2023**. Bronnen: [topconpositioning.asia (aankondiging)](https://www.topconpositioning.asia/jp/ja/topics/2023/1212/), [productpagina](https://www.topconpositioning.asia/jp/ja/products/brand/relate/bentley-synchro/), [topcon.co.jp](https://www.topcon.co.jp/topics/13630/)
- **Positionering:** *"4Dデータ作成ソフト"* — tijdas toevoegen aan een 3D-model. Toepassingen: planning opstellen, **仮設 (tijdelijke voorzieningen) controleren**, **干渉チェック (clash detection in de tijd)**, **合意形成 (consensusvorming met stakeholders)**.
- Topcon plaatst het in een bredere 建設DXソリューション-strategie die ICT-machinebesturing en 3D-meetdata koppelt aan de kantooromgeving.
- Ook direct via [Bentley Systems Japan](https://ja.bentley.com/software/synchro/).
- **Prijs:** niet publiek in Japan.

**Voordeel:** de distributie via Topcon is strategisch sterk — Topcon is een Japanse meetinstrumentenreus met diepe wortels in 土木 en i-Construction. Dit is de enige westerse planningsgerelateerde tool met een echt Japans distributiekanaal.
**Nadeel:** het wordt verkocht als **4D-visualisatietool**, niet als planner — de planning komt uit iets anders (P6, MSP, Excel). Dat begrenst de markt tot BIM/CIM-opdrachten.

#### **Autodesk Navisworks + Autodesk Construction Cloud (ACC)**

Genoemd als de gangbare tools voor 施工BIM 4D/5D bij Japanse aannemers, samen met SYNCHRO. Obayashi en Shimizu hebben gedocumenteerde toepassingscases ([creamcheese.jp](https://www.creamcheese.jp/)). Navisworks is in Japanse ゼネコン-BIM-workflows waarschijnlijk breder aanwezig dan SYNCHRO, omdat Revit al standaard is.

#### **ALICE Technologies** — het opvallendste westerse succes

- **Kajima Corporation (鹿島建設) selecteerde ALICE op 8 maart 2022** voor *"some of its most critical projects"*. Bron: [blog.alicetechnologies.com](https://blog.alicetechnologies.com/news/kajima-group-partners-with-alice-technologies-to-reimagine-construction-scheduling)
- Kajima kan er **duizenden alternatieve planningsscenario's** mee genereren. Koji Sugimoto (Managing Executive Officer, Kajima): *"With ALICE, we will reimagine our approach to construction scheduling"* en het maakt *"what-if analysis in a way that we've never been able to do before"* mogelijk.
- Geen investeringsbedrag of specifieke projecten bekendgemaakt.
- Japanse vakpers meldt bij AI-工程管理 resultaten van **17–30% verkorting van de bouwtijd** ([kaname.suketto-ai.com](https://kaname.suketto-ai.com/articles/ai-construction-schedule-management)) — **behandel dit als leveranciersclaim, niet als geverifieerd cijfer.**

**Waarom dit werkt waar P6 faalt:** ALICE vraagt niet dat een Japanse 所長 zijn werkwijze verandert naar westerse CPM-discipline — het genereert planningsopties. Dat sluit aan bij de Japanse wens om *optie-exploratie* te automatiseren in plaats van *planningsdiscipline* op te leggen.

#### **Overige westerse bouwpakketten: vrijwel afwezig**

Voor de volgende pakketten heb ik in Japans-talige bronnen **geen enkel spoor van resellers, klantcases of vermeldingen in vergelijkingsartikelen** gevonden:

| Pakket | Bevinding |
|---|---|
| **Elecosoft Asta Powerproject** | Genoemd op eleco.com met 4D BIM-integratie, maar **geen Japanse reseller of klantcase gevonden**. Praktisch afwezig. |
| **Trimble TILOS** | **Geen aanwijzing van Japanse distributie of gebruik gevonden**, ondanks dat Nikon-Trimble een grote Japanse joint venture is. Opmerkelijk, want lineaire planning zou bij Japanse spoor-/snelwegprojecten passen — maar タクト工程 vervult die rol al. |
| **RIB Candy / iTWO** | Geen Japanse aanwezigheid gevonden. |
| **Spider Project** (RU) | Geen Japanse aanwezigheid gevonden. |
| **Safran** (NO) | Geen Japanse aanwezigheid gevonden. |
| **Deltek (Acumen, Open Plan)** | Geen Japanse aanwezigheid gevonden. |
| **InEight** | Geen Japanse aanwezigheid gevonden. |
| **Nodes & Links** | Geen Japanse aanwezigheid gevonden. |
| **AVEVA** | **Wel aanwezig** — Toyo Engineering zet AVEVA Unified Engineering + Asset Information Management in voor EPC-brede DX ([aveva.com](https://www.aveva.com/ja-jp/about/news/press-releases/2022/)). Dit is engineering-data, niet primair scheduling, maar het is een reëel Japans enterprise-contract. |

> **Conclusie §3.6:** buiten Primavera P6 (±120 klanten), SYNCHRO (via Topcon, sinds eind 2023), Navisworks (via de Revit-basis) en ALICE (Kajima) heeft **geen enkel westers bouwplanningspakket meetbare tractie in Japan**.

---

### 3.7 Eigen ontwikkeling en AI bij de grote aannemers

Dit is het segment dat westerse leveranciers structureel buiten de deur houdt.

| Aannemer | Systeem | Datum | Wat het doet | Bron |
|---|---|---|---|---|
| **鹿島 Kajima** | **ALICE Technologies** (extern, geselecteerd) | mrt. 2022 | Duizenden planningsscenario's genereren voor kritieke projecten | [alicetechnologies.com](https://blog.alicetechnologies.com/news/kajima-group-partners-with-alice-technologies-to-reimagine-construction-scheduling) |
| **鹿島 Kajima** | **A4CSEL** | doorlopend | Autonome bouwmachines — *"自動施工による現場の工場化"* (de bouwplaats als fabriek). Planning wordt hier een productiebesturingsprobleem. | Kajima DX-strategie |
| **大林組 Obayashi** | **PROCOLLA (プロコラ)** met Arent | **7 aug. 2025** | Generatieve AI leest CAD-tekeningen + calculaties → automatische バーチャート; bewerken in natuurlijke taal. Proef op Obayashi-projecten. Verkoop via Oprizón. | [arent.co.jp](https://arent.co.jp/news/20250808_procolla/), [ken-it.world](https://ken-it.world/it/2025/08/drawings-to-timelines.html) |
| **大林組 Obayashi** | 構造設計支援AI | 24 jun. 2025 | Regelgebaseerde AI die decennia aan ingenieursexpertise codeert voor doorsnedeontwerp | [obayashi.co.jp](https://www.obayashi.co.jp/news/detail/news20250624_1.html) |
| **大成建設 Taisei** | 施工計画書作成支援システム | 28 nov. 2025 | *"発注資料を入力するだけで、国交省様式に沿った施工計画書のたたき台を10分で作成"* — uit aanbestedingsdocumenten in **10 minuten** een concept-uitvoeringsplan in MLIT-format; **±85% tijdsbesparing** | [taisei.co.jp](https://www.taisei.co.jp/about_us/wn/2025/251128_10770.html) |
| **清水建設 Shimizu** | AI施工管理システム | 2026 | Realtime automatische beoordeling van de bouwvoortgang uit camerabeelden | [shimz.co.jp](https://www.shimz.co.jp/company/about/news-release/2026/2026015.html) |
| **竹中工務店 Takenaka** (+ Shimizu, Kajima) | Samenwerking met **NTT Communications** | jul. 2023 | *"工程情報に着目した「施工管理業務のDX」"* — DX van uitvoeringsbeheer met **planningsinformatie als kern** | [takenaka.co.jp](https://www.takenaka.co.jp/news/2023/07/01/) |
| **日揮 JGC** (EPC) | Eigen **"PMS"** | doorlopend | Beheert mensen, materieel, geld, ontwerpdocumenten en tijd over 設計・調達・建設・試運転 via één gedeelde WBS | [jgc.com](https://www.jgc.com/jp/business/project-management/) |
| **千代田化工建設 Chiyoda** (EPC) | **Primavera P6** | 20+ jaar | Via TIS千代田システムズ (dochteronderneming/gelieerd) | [tc-systems.co.jp](https://www.tc-systems.co.jp/service/pm/primavera-p6/) |
| **東洋エンジニアリング Toyo** (EPC) | **AVEVA** Unified Engineering + AIM | 2022 | EPC-brede DX met open integratie | [aveva.com](https://www.aveva.com/ja-jp/about/news/press-releases/2022/) |

> **Cruciaal patroon:** de drie meest recente Japanse innovaties (PROCOLLA, Taisei's 施工計画書-AI, Shimizu's camera-AI) automatiseren allemaal het **produceren** van planningsdocumenten uit bestaande data. Geen enkele probeert de planningsmethode zelf te veranderen. Japan wil *sneller de bestaande vorm produceren*, niet *een betere vorm*.

---

## 4. Wat wordt ervoor betaald: prijzen en licentiemodellen

### 4.1 Complete prijstabel

Alle bedragen in JPY zoals gepubliceerd; USD tegen **¥162 = USD 1** (juli 2026). BTW-status zoals in de bron vermeld.

| Product | Type | Initieel / eenmalig | Terugkerend | USD-equivalent | Bron |
|---|---|---|---|---|---|
| **工程さん** (花ソフト) | Desktop, koop | **¥3.938 per pc** — **[ONZEKER over btw]** de bron schrijft letterlijk *"3,938円(税抜)/パソコン1台につき"*, maar ¥3.938 = ¥3.580 × 1,1, wat juist op **税込** wijst; bron is intern tegenstrijdig. Het **per-pc**-karakter ontbrak eerder | ¥0 (onderhoud gratis) | ≈ USD 24 eenmalig per pc | [aippearnet](https://www.aippearnet.com/column/constructiondx/kouteihyou-sakusei-soft/) |
| **Project Canvas** (ルミックス) | Desktop, abonnement | ¥5.500/jaar · ¥15.840/3jr · ¥18.480 pakket 3jr | — | ≈ USD 34/jaar | [rumix.co.jp](https://www.rumix.co.jp/pc/price.html) |
| **現場ナビ工程 standalone** | Desktop, maand | ¥0 | **¥4.400/mnd** **incl. btw** | ≈ USD 27/mnd | [kozosoft.co.jp](https://www.kozosoft.co.jp/genba_navi/seihin/koutei/koutei_p6.html) |
| **現場ナビ工程 netwerk (koop)** | Desktop, koop | **¥99.000** **incl. btw** | **¥39.600/jr** onderhoud (incl. btw) | ≈ USD 611 + USD 244/jr | idem |
| **現場ナビ工程 netwerk (maand)** | Desktop, maand | ¥0 | **¥13.200/mnd** **incl. btw** | ≈ USD 81/mnd | idem |
| **コストナビ工程表** (建築ソフト) | Desktop | **¥99.000–308.000** pakket (税込, afh. van licenties) | of **¥4.400/mnd** (税込) | ≈ USD 611–1.901 / USD 27/mnd | [aippearnet](https://www.aippearnet.com/column/constructiondx/kouteihyou-sakusei-soft/) |
| **工作2プラス** (宮本システム) | Desktop, koop | **¥88.000–264.000** (税込, afh. van licenties) | **¥11.000–22.000/jr** support (税込) | ≈ USD 543–1.630 + USD 68–136/jr | idem |
| **サクっと工程** | Desktop | **¥580.000** excl. btw | op aanvraag | ≈ USD 3.580 | [gemba-tech](https://kensetsu.gemba-tech.jp/list/schedule-management-software/) |
| **KANNA** (Aldagram) | Cloud, freemium | ¥0 | **¥0~** | gratis instap | idem |
| **サクミル** (プレックス) | Cloud | ¥0 | **¥9.800/mnd / 30 accounts** (= ¥327/acc.) | ≈ USD 60/mnd | idem |
| **現場ポケット** | Cloud, vast tarief | ¥0 | **¥14.850/mnd**, onbeperkt accounts | ≈ USD 92/mnd | idem |
| **施工管理＋α** | Cloud | ¥0~ | **¥19.580/mnd + ¥550/apparaat** | ≈ USD 121/mnd | idem |
| **eYACHO** (MetaMoJi) | Cloud/tablet | **¥330.000** (税込, alleen jr 1) | **¥3.520–5.720 / ID / mnd** — **[ONZEKER]** MetaMoJi noemt daarnaast een スタンダード版 op **¥4.200/licentie/mnd óf ¥37.800/licentie/JAAR** (≈ ¥3.150/mnd); btw-status en editie-toewijzing van de ¥3.520/¥5.720 zijn onduidelijk. Minimumafname ±5 accounts; 10 GB cloud per licentie | ≈ USD 2.037 + USD 19–35/ID/mnd | idem |
| **PROSHARE** (KENTEM) | Cloud | **¥30.000 初期開設費 (税抜)** | **¥60.000/JAAR** (50GB + 5 licenties, 税抜); alleen opslag ¥30.000/jr; extra licentie ¥12.000/jr vanaf de 6e; extra 10GB ¥6.000/jr | ≈ USD 185 + USD 370/**jaar** | **[GECORRIGEERD]** [kentem.jp/product-service/proshare/plan](https://www.kentem.jp/product-service/proshare/plan/) |
| **ダンドリワーク** | Cloud | **¥200.000~** | **¥3.000~** (instap) / **¥15.000~** (standaard) | ≈ USD 1.235 + USD 19–93/mnd | [digi-mado](https://digi-mado.jp/article/118870/) |
| **ANDPAD** | Cloud | op aanvraag | op aanvraag (initieel + maand + opties) | — | [andpad.jp/help/pricing](https://andpad.jp/help/pricing) |
| **工程's Orario** (ウェッブアイ) | Desktop enterprise | **応相談** | **応相談** | — | [webi.co.jp](https://www.webi.co.jp/management/product/kouteizu/) |
| **Smartsheet** | Cloud | — | **¥1.200/mnd~** | ≈ USD 7/mnd | [aippearnet](https://www.aippearnet.com/column/constructiondx/kouteihyou-sakusei-soft/) |
| **Bitrix24** | Cloud | — | **USD 49/mnd~** | — | idem |
| **MS Project Standard 2024** | Desktop, koop | **¥120.780** | — | ≈ USD 746 | [microsoft.com/ja-jp](https://www.microsoft.com/ja-jp/microsoft-365/project/compare-microsoft-project-management-software) |
| **MS Project Professional 2024** | Desktop, koop | **¥201.490** | — | ≈ USD 1.244 | idem |
| **MS Project Plan 3** | Cloud | — | **¥4.722/gebr./mnd** excl. btw (¥5.194 incl.) | ≈ USD 29/mnd | [NTT Docomo Business](https://www.onlineshop.docomobusiness.ntt.com/s/86c6b418-72e4-11ee-b4e5-4f0529be4007) |
| **Lychee Redmine** | Cloud + on-prem | ¥0 (Free-plan) | Standard/Premium/Business, tarieven op site | — | [lychee-redmine.jp/plan](https://lychee-redmine.jp/plan/) |
| **Primavera P6** | Enterprise | offerte | offerte | **[EIGEN SCHATTING]** ¥400.000–570.000/zitplaats eeuwig, of ¥320.000–470.000/gebr./jr cloud | geen Japanse prijslijst gepubliceerd |
| **Bentley SYNCHRO** | Enterprise | offerte via Topcon | offerte | — | [topconpositioning.asia](https://www.topconpositioning.asia/jp/ja/products/brand/relate/bentley-synchro/) |
| **PROCOLLA** | Cloud/AI | niet openbaar | niet openbaar | — | [procolla.com](https://procolla.com/) |

### 4.2 Wat de prijsstructuur zegt over de markt

**Er zijn drie duidelijk gescheiden prijsniveaus:**

1. **Mkb-desktop, koopmodel: ¥3.938 – ¥99.000 eenmalig.** Dit is de grootste groep in aantallen. Japanse kleine aannemers **kopen** software; abonnementen worden als kostenpost weerstaan. Onderhoud/support is een aparte, bescheiden jaarpost (¥11.000–39.600).
2. **Cloud-suites: ¥0 – ¥200.000 initieel + ¥3.000 – ¥99.000 per maand.** Hier zit de groei en het kapitaal (ANDPAD ARR ¥10 mrd). Prijzen zijn opvallend vaak **niet openbaar** — offertecultuur.
3. **Enterprise/EPC: ¥400.000+ per zitplaats.** P6 en SYNCHRO. Volledig offertegedreven.

**Lokale prijsstelling en kortingen:**
- **Volumekorting is expliciet en agressief bij Japanse desktopleveranciers.** Project Canvas: 10–19 licenties −10%, 20–49 −20%, 50–99 −30%, **100+ −40%** ([rumix.co.jp](https://www.rumix.co.jp/pc/price.html)). Dat is een substantieel diepere staffel dan westerse leveranciers gewend zijn te geven.
- **Vast tarief met onbeperkte accounts** komt in Japan voor (現場ポケット: ¥14.850/maand onbeperkt) — een model dat westerse per-seat-leveranciers niet aanbieden en dat in de bouw, waar veel gelegenheidsgebruikers zijn (onderaannemers, 職人), enorm aantrekkelijk is.
- **Prijs per apparaat naast prijs per gebruiker** (施工管理＋α: +¥550/apparaat) — reflecteert dat één 現場監督 een pc, tablet én telefoon gebruikt.
- **Facturering:** 請求書払い (maandelijkse verzamelfactuur, betaling per bankoverschrijving op de gebruikelijke betaaldatum) is de norm voor B2B. Creditcard-only SaaS is een reëel adoptieobstakel.

**Trainingskosten:**
- Japanse leveranciers bieden training vaak **gratis** aan: 構造ソフト geeft *"新規のお客様には無償の講習会"* plus Zoom-demonstraties; telefonische consultancy is optioneel bijbetaald ([kozosoft.co.jp](https://www.kozosoft.co.jp/genba_navi/seihin/koutei/koutei_p6.html)).
- Bij ウェッブアイ zijn support, training, PMO-ondersteuning en consulting onderdeel van het dienstenpakket.
- Voor P6 verzorgt TIS千代田システムズ standaardcursussen. **[EIGEN SCHATTING: ¥150.000–300.000 per persoon voor een 2–3-daagse basiscursus, niet geverifieerd.]**
- **Dit is een belangrijk contrast:** westerse leveranciers verdienen aan training; Japanse leveranciers geven het weg als onderdeel van de relatie. Een westerse leverancier die in Japan trainingsfees rekent, wordt als duur en onvriendelijk ervaren.

---

## 5. Lokale bijzonderheden

### 5.1 De Japanse planningsmethodiek — het grootste struikelblok

**De vijf vormen die een Japanse planner moet kunnen produceren:**

| Vorm | Japans | Wat het is | Westers equivalent |
|---|---|---|---|
| Balkenplanning | **バーチャート** | De dominante vorm op de bouwplaats. *"現場ではバーチャートがほとんど"* | Gantt |
| Netwerkplanning | **ネットワーク工程表**, meestal **アロー型** | Activiteiten op **pijlen**, gebeurtenissen op knopen. Verplichte examenstof. | **ADM / activity-on-arrow** — in het Westen sinds de jaren '80 verlaten |
| Resource-histogram | **山積み・山崩し** | "Bergen stapelen / bergen afbreken" — resource-histogram en handmatige nivellering | Resource histogram + levelling |
| Voortgangscurve | **工程管理曲線 / バナナ曲線** | Cumulatieve S-curve met een **boven- en ondergrensband** die de vorm van een banaan heeft; voortgang moet binnen de banaan blijven | S-curve, maar de bandvorm is Japans-specifiek |
| Takt-planning | **タクト工程 / タクト手法** | *"縦軸に施工場所・横軸に工期をとり、各チームの進捗を斜め線で表した工程表"* — verticaal de locatie (verdieping), horizontaal de tijd, diagonale lijnen per ploeg. Bijv. *"1フロアを6日ピッチで上がる"* — één verdieping per 6 dagen. | Line-of-balance / location-based scheduling — maar Japan gebruikt dit al decennia als **standaard** voor hoogbouw, niet als niche |

Bronnen: [zero-sekokan.com/kanri-takt.html](https://zero-sekokan.com/kanri-takt.html), [sekokan-base.com](https://sekokan-base.com/), [doboku-note.com](https://doboku-note.com/), [seko-kanri.com](https://seko-kanri.com/)

**De planningshiërarchie:** 基本工程表 / 総合工程表 (master) → 月間工程表 (maand) → 週間工程表 (week) → 細別工程表 (detail per onderdeel). Dat 工程's Orario adverteert met *"1つのファイルの中で、月間、週間、年間を自由に切り替え"* is precies hierop gericht — een westerse tool met één tijdlijn per bestand mist dit.

**Waarom dit ertoe doet voor softwareontwerp:**
- Een tool die alleen PDM/AON kent, kan de examen-canonieke ネットワーク工程表 niet produceren. Een 施工管理技士 die op zijn examen ADM heeft geleerd, herkent een PDM-netwerk niet als "een netwerkplanning".
- Zonder **バナナ曲線** kun je geen Japanse voortgangsrapportage maken.
- Zonder **タクト**-weergave ben je onbruikbaar voor hoogbouw — het meest lucratieve segment.
- **山積み・山崩し** wordt in Japan visueel en handmatig gedaan; automatische resource-levelling zoals P6 die doet, wordt gewantrouwd omdat de uitkomst niet uitlegbaar is.

### 5.2 Overheidsmandaten en aanbestedingseisen

**i-Construction (2016 →) en i-Construction 2.0 (april 2024):**
- i-Construction gelanceerd door MLIT (国土交通省) in 2016; doel **+20% productiviteit tegen 2025**.
- **i-Construction 2.0** aangekondigd **april 2024**: **−30% arbeidsinzet op de bouwplaats en 1,5× productiviteit tegen 2040**, via automatisering van de bouwplaats.
- Bron: [mlit.go.jp](https://www.mlit.go.jp/report/press/kanbo08_hh_001085.html)

**BIM/CIM 原則適用 (principiële toepassing):**
- **Vanaf FY2023 (令和5年度) principieel toegepast op de *directe* civiele opdrachten en werken van MLIT (国土交通省直轄の土木業務・工事), kleinschalige projecten uitgezonderd.** **[GECORRIGEERD]** — de eerdere formulering *"alle openbare werken"* is te breed: opdrachten van prefecturen en gemeenten, en 建築-opdrachten, vallen er **niet** automatisch onder. Er zijn 義務項目 (verplicht) en 推奨項目 (aanbevolen).
- Dekt onderzoek, ontwerp, uitvoering en beheer; data-integratie over de levenscyclus; 3D-ontwerpdata als basisvereiste.
- BIM/CIM-data zijn nu **standaard op te leveren producten (電子納品)** in openbare aanbestedingen.
- Portalen: [NILIM BIM/CIM-portaal](https://www.nilim.go.jp/lab/qbg/bimcim/bimcimindex.html), [standaarden](https://www.nilim.go.jp/lab/qbg/bimcim/standard.html)
- Er wordt gewerkt aan integratie van **4D-planning** en BIM/CIM-kostenraming; specifieke 工程-eisen zijn nog niet volledig uitgekristalliseerd.

**BIM-adoptie in de praktijk:** **76% van de 日建連-leden** gebruikt BIM (enquête 2025), **+20 procentpunt in vier jaar**; ontwerp- én uitvoeringsfase groeiden elk **+13% over vier jaar**. De enquête over 2023 had een respons van 56% (40 van 72 bedrijven).
Bronnen: [digital.kentsu.co.jp](https://digital.kentsu.co.jp/articles/artcl_rglr/01KVW3BKSXC79W5DMKMSZ5W5F3), [kensetsunews.com](https://www.kensetsunews.com/archives/1250339), [nikkenren.com/kenchiku/bim](https://www.nikkenren.com/kenchiku/bim/), [it.kensetsu-plaza.com](https://it.kensetsu-plaza.com/cad/kiji/post/47112)

**建設業2024年問題 — de grootste demand-driver:**
- Sinds **1 april 2024** geldt in de bouw de wettelijke overwerklimiet (残業上限規制) die eerder was uitgezonderd. **[GECORRIGEERD/GENUANCEERD]** De hoofdregel is **45 uur per maand en 360 uur per jaar**. De in de eerdere versie genoemde *"100 uur/maand, gemiddeld 80 uur over 2–6 maanden"* zijn de **bovengrenzen van het 特別条項** (uitzonderingsclausule), samen met **720 uur per jaar** en **maximaal 6 maanden per jaar boven 45 uur**. Dat is dus het uiterste plafond, niet "de" limiet (MHLW).
- Het **中央建設業審議会** herzag op **27 maart 2024** de **工期に関する基準** (norm voor bouwtijd) om naleving af te dwingen — bouwtijden mogen niet langer onrealistisch krap worden gecontracteerd.
- **週休2日 / 4週8閉所:** de sector schuift van 4週4休/4週6休 naar **acht sluitingsdagen per vier weken**. Volgens vakbronnen ging dit *"van doel naar randvoorwaarde"*. 日建連 leidt dit; de tijdlijn werd in 2023 verlengd naar volledige invoering in **2025**.
- Bronnen: [mlit.go.jp (工期基準)](https://www.mlit.go.jp/), [mhlw.go.jp](https://www.mhlw.go.jp/), [nikkenren.com](https://www.nikkenren.com/)

**Directe softwaregevolgen:** de planningskalender is nu een compliance-instrument. Een planningstool moet omgaan met 4週8閉所, Japanse nationale feestdagen (16 stuks, met 振替休日/vervangende vrije dagen), **お盆** (midden augustus) en **年末年始** (eind december–begin januari) als sectorbrede sluitingen, en met **雨天中止** (regendagen) als aparte kalendercategorie. Dat is nauwkeuriger kalendermodellering dan de meeste westerse tools out-of-the-box bieden.

### 5.3 Taal- en tekensetvereisten

Dit wordt door westerse leveranciers stelselmatig onderschat.

| Vereiste | Toelichting |
|---|---|
| **Tekenset** | UTF-8 is inmiddels standaard, maar **Shift-JIS / CP932** blijft aanwezig in oudere systemen, CSV-uitwisseling en 電子納品-pakketten voor de overheid. Import/export moet CP932 aankunnen. |
| **Full-width vs half-width** | 全角/半角 — dezelfde cijfers en Latijnse letters bestaan in twee breedtes. Sorteren, zoeken en kolombreedte-berekening moeten hier rekening mee houden. |
| **Regelafbreking** | Japans breekt af zonder spaties; **禁則処理 (kinsoku shori)** verbiedt bepaalde tekens aan begin/eind van een regel. Balklabels in een gantt zijn zonder kinsoku lelijk en onprofessioneel. |
| **Verticaal schrift** | 縦書き komt voor in formele documenten en in de kolomkoppen van sommige 工程表-formulieren. |
| **Jaartelling** | **元号 (令和, Reiwa)** naast de westerse jaartelling. Overheidsformulieren gebruiken 令和7年 waar het Westen 2025 schrijft. Een planningstool zonder 元号-optie is niet inzetbaar voor 電子納品. |
| **Fiscaal jaar** | **April–maart**. Alle overheidsbudgetten, 年度-planningen en 3次元年次工程 volgen dit. Een tool die het kalenderjaar hardcodeert, klopt niet. |
| **Papierformaat** | **A-serie plus JIS B-serie**. 工程表 worden vaak op A1/A0 geplot of op JIS B4 afgedrukt. Printondersteuning voor JIS B-formaten is nodig. |
| **Naamvolgorde en aanspreekvorm** | Achternaam-voornaam; 様/さん-suffixen in rapportages. |

### 5.4 Opleidingscultuur en de rol van de 施工管理技士

- De **施工管理技士**-kwalificatie is de spil. Jaarlijks komen er ~28.000 1級- en ~41.000 2級-houders bij, plus ~43.000 en ~65.000 技士補 (FY2023, [日刊建設工業新聞](https://www.nikoukei.co.jp/news/detail/508394)).
- Het examen toetst **elk jaar zonder uitzondering** de ネットワーク工程表: *"毎年必ず出題される必須項目"*, met kritiek pad, float en 山積み・山崩し. Dit is dus geen historisch curiosum — het is de gedeelde beroepstaal van elke nieuwe generatie.
- **Gevolg voor software:** de mentale modellen van Japanse bouwmanagers zijn gevormd door ADM-netwerken en handberekend kritiek pad. Een tool die dat spreekt, heeft een enorm voordeel; een tool die alleen PDM spreekt, moet eerst het vak heropvoeden.
- **Trainingscultuur bij leveranciers:** gratis 講習会 (cursussen) voor nieuwe klanten is de norm (構造ソフト). Support wordt gezien als onderdeel van de relatie, niet als winstcentrum. Reactietijd en telefonische bereikbaarheid in het Japans wegen zwaarder dan featurelijsten.
- **Aankoopcultuur:** 稟議 (ringi — collectieve goedkeuring langs de hiërarchie) maakt aankopen traag maar duurzaam. Vandaar retentiecijfers van **96%** (現場ナビ工程) en **98%** (アイピア). Wie eenmaal binnen is, blijft; wie buiten staat, komt er moeilijk in.

### 5.5 Resellers en distributiekanalen

| Kanaal | Vertegenwoordigt | Bijzonderheid |
|---|---|---|
| **TIS千代田システムズ** | Oracle Primavera P6 / Primavera Cloud | *"国内No.1"*, ±120 implementaties, 20+ jaar, Japanstalig **PRIMA-TECH**-expertteam, eigen **PROJECT CLOUD®**, specialisatie in **Amerikaanse militaire bouwprojecten**. [tc-systems.co.jp](https://www.tc-systems.co.jp/service/pm/primavera-p6/) |
| **トプコンソキアポジショニングジャパン** | Bentley SYNCHRO (sinds dec. 2023) | Japanse meetinstrumentenreus met diepe 土木/i-Construction-wortels. Het sterkste westerse distributiekanaal in deze markt. [topconpositioning.asia](https://www.topconpositioning.asia/jp/ja/topics/2023/1212/) |
| **アレント (Arent)** | 現場ナビ工程 (van 構造ソフト), PROCOLLA (eigen, met Obayashi) | DX-bedrijf dat zowel distribueert als co-ontwikkelt met ゼネコン. [arent.co.jp](https://arent.co.jp/) |
| **Oprizón** | PROCOLLA | Verkoop en implementatiebegeleiding |
| **DTSolution** | Primavera Unifier + P6, PMIS | Grote EPC en scheepsbouw. [dtsolution.io/ja](https://www.dtsolution.io/ja) |
| **LTM Solutions** | Primavera P6-projectmanagement en rapportage | [ltm-solutions.com](https://ltm-solutions.com) |
| **Bentley Systems Japan** | SYNCHRO direct | [ja.bentley.com](https://ja.bentley.com/software/synchro/) |
| **Oracle Japan** | Primavera P6 direct | [oracle.com/jp/construction-engineering/primavera-p6](https://www.oracle.com/jp/construction-engineering/primavera-p6/) |

> **Les:** in Japan verkoop je niet direct. Elke westerse leverancier met tractie heeft een Japanse partner die het product in Japanse verpakking, met Japanse support en 請求書払い aanbiedt. De partners die werken zijn geen softwarehuizen maar **bedrijven die al in de bouwketen zitten** (Topcon = meetinstrumenten, TIS千代田 = EPC-IT, Arent = ゼネコン-DX).

### 5.6 Informele en gekraakte licenties

**Japan heeft een van de laagste piraterijgraden ter wereld en dit is dus géén relevante factor.**

| Metric | Waarde | Bron |
|---|---|---|
| Ongelicentieerde software, Japan | **18%** (recentste BSA-cijfer, −1pp) | [BSA Japan](https://bsa.or.jp/anti-piracy/) |
| Idem, 2013 | 19% | BSA Global Software Survey via Straight Press |
| Idem, eerdere meting | 21% — *"世界で3番目に低い"* (3e laagste ter wereld), commerciële waarde ±**¥150 mrd** | [security-next.com/030577](https://www.security-next.com/030577) |
| Handhavingsorganisaties | **BSA** ([bsa.or.jp](https://bsa.or.jp/), [bsacompliance.jp](https://bsacompliance.jp/)) en **ACCS** ([www2.accsjp.or.jp/piracy](https://www2.accsjp.or.jp/piracy/)) | |

**Wat er in Japan wél gebeurt en veel belangrijker is:**
- **Licentie-onderbenutting in plaats van piraterij:** bedrijven kopen één netwerklicentie en laten hem door meerdere mensen gebruiken via gedeelde pc's. Dat is legaal maar onderdrukt de zitplaatstelling — een reden waarom de markt in *aantal zitplaatsen* kleiner lijkt dan in *aantal gebruikers*.
- **Excel als schaduwlicentie:** het echte gratis alternatief is niet gekraakte software maar **Excel-sjablonen**, die massaal gratis circuleren en waar leveranciers zich expliciet tegen positioneren.
- **Compliance-druk:** BSA voert in Japan actieve compliance-campagnes gericht op bedrijven; het reputatierisico (企業コンプライアンス) maakt piraterij bij bedrijven van enige omvang praktisch uitgesloten.

### 5.7 Subsidies — de IT導入補助金 als verkoopkanaal

Dit is een structurele eigenaardigheid van de Japanse markt die westerse leveranciers vaak missen.

- Het **IT導入補助金** (IT-invoeringssubsidie) van de nationale overheid vergoedt een deel van de invoeringskosten van IT-tools voor het mkb.
- **De bouw is een van de grootste gebruikers:** *"2023年度の採択件数では全体の約20％を占める"* — circa **20% van alle toegekende aanvragen in FY2023** kwam uit de bouw.
- Subsidiepercentages lopen op tot **4/5 (80%)** in bepaalde categorieën; aanvraagronde 2025 opende **eind maart 2025**.
- Portaal: [it-shien.smrj.go.jp/2025](https://it-shien.smrj.go.jp/2025/), nieuws: [it-shien.smrj.go.jp/news/20287](https://it-shien.smrj.go.jp/news/20287)

**Wat dit betekent voor een leverancier:** je moet je product **registreren als goedgekeurde IT-tool** op het officiële platform, anders kan een Japanse mkb-klant geen subsidie aanvragen — en dan verlies je van een concurrent die dat wel gedaan heeft, ongeacht productkwaliteit. Vrijwel alle Japanse SaaS-leveranciers in dit veld zijn geregistreerd en gebruiken het actief in hun marketing. **Dit is waarschijnlijk de goedkoopste en meest onderschatte toegangspoort tot het Japanse bouw-mkb.**

---

## 6. Implicaties: wat werkt hier wel en niet

**[Onderstaande sectie is analyse/interpretatie, geen brondata.]**

**Wat een westers planningspakket in Japan blokkeert:**
1. Geen アロー型ネットワーク工程表 → geen aansluiting op de beroepsopleiding.
2. Geen バナナ曲線 → geen bruikbare voortgangsrapportage.
3. Geen タクト工程-weergave → uitgesloten van hoogbouw.
4. Geen 元号, geen april–maart fiscaal jaar, geen JIS B-papier, geen 4週8閉所-kalender → niet inzetbaar voor overheidswerk.
5. Per-seat-abonnement in USD met creditcard → botst met koopcultuur en 請求書払い.
6. Niet geregistreerd voor IT導入補助金 → prijsnadeel van tot 80% tegenover lokale concurrenten in het mkb.
7. Geen Japanse partner → geen 稟議-goedkeuring, geen support in het Japans.

**Waar wél ruimte zit:**
- **Het gat tussen 現場ナビ工程 (tekentool, ¥99.000) en Primavera P6 (enterprise CPM, ¥400.000+).** Er is in Japan geen betaalbaar pakket met een echte CPM-motor *en* Japanse outputvormen. 工作2プラス (¥88.000) is het dichtst in de buurt maar is een klein product van een kleine leverancier.
- **Open source langs de Redmine-route.** Redmine/Lychee Redmine bewijzen dat open source in Japan werkt — mits er een Japanse community en een commerciële supportlaag omheen zit.
- **Excel-interoperabiliteit als toegangspoort.** 55–75% van de markt zit in Excel **[EIGEN SCHATTING]**. Een tool die de gangbare Japanse Excel-工程表-sjablonen kan importeren en exporteren, verlaagt de drempel dramatisch.
- **Kalender-compliance als verkoopargument.** Het 2024年問題 maakt exacte 4週8閉所-kalenders een wettelijke noodzaak. Dat is precies waar generieke tools falen.
- **De EPC/export-markt is bereikbaar zonder Japanse lokalisatie** — daar geldt P6-conventie en Engels. Maar het is een markt van naar schatting 1.500–4.000 planners **[EIGEN SCHATTING]**.

---

## 7. Bronnen

**Overheid en statistiek**
- MLIT — 建設投資見通し FY2025: https://www.mlit.go.jp/report/press/joho04_hh_001319.html
- MLIT — i-Construction 2.0: https://www.mlit.go.jp/report/press/kanbo08_hh_001085.html
- NILIM — BIM/CIM-portaal: https://www.nilim.go.jp/lab/qbg/bimcim/bimcimindex.html
- NILIM — BIM/CIM-standaarden: https://www.nilim.go.jp/lab/qbg/bimcim/standard.html
- MHLW — overwerkregels: https://www.mhlw.go.jp/
- e-Stat — bouwstatistiek: https://www.e-stat.go.jp/dbview?sid=0003175401
- 中小企業基盤整備機構 — IT導入補助金 2025: https://it-shien.smrj.go.jp/2025/ · https://it-shien.smrj.go.jp/news/20287

**Marktonderzoek**
- Yano Research — 2025年版 建設DX（ConTech）市場: https://www.yano.co.jp/press-release/show/press_id/3789
- MM総研 — 施工管理アプリ-onderzoek: https://www.m2ri.jp/release/
- BOXIL — enquête projectmanagementtools (n=1.825): https://boxil.jp/mag/a7777/
- ITreview — 工事管理システム: https://www.itreview.jp/categories/construction-management
- IT Trend — 工程管理システム: https://www.it-trend.jp/process_management

**Vergelijkingsartikelen (Japans)**
- 現場tech — 工程管理ソフト・アプリおすすめ16選【2026年最新】: https://kensetsu.gemba-tech.jp/list/schedule-management-software/
- アイピア — 工程管理ソフトおすすめ14選: https://www.aippearnet.com/column/constructiondx/kouteihyou-sakusei-soft/
- kenteku — 建設業 工程管理ソフト 比較10選: https://kenteku.jp/compare/koutei-kanri/
- SOMURIX — 工程管理システムおすすめ15選: https://somurix.co.jp/lp/processmanagement-system/
- ASPIC Japan — 建設業向け工程管理ソフトおすすめ15選: https://www.aspicjapan.org/asu/article/44268
- DX親方 — 工程管理システムおすすめ18選: https://dx-oyakata.net/construction/schedule-software/
- digi-mado — ダンドリワーク prijzen: https://digi-mado.jp/article/118870/
- sakumiru — review 現場ナビ工程: https://sakumiru.jp/column/review-genbanavi-koutei
- 現場tech — review ANDPAD: https://kensetsu.gemba-tech.jp/reviews/andpad/

**Leveranciers — lokaal**
- 構造ソフト 現場ナビ工程 (prijzen): https://www.kozosoft.co.jp/genba_navi/seihin/koutei/koutei_p6.html
- アレント 現場ナビ工程: https://genba-navi-kotei.arent.co.jp/
- ウェッブアイ 工程's: https://www.webi.co.jp/management/product/kouteizu/ · https://www.webi.co.jp/kouteizu_oraio/
- ルミックス Project Canvas (prijzen): https://www.rumix.co.jp/pc/price.html
- ANDPAD: https://andpad.jp/ · https://andpad.co.jp/news/12114/ · https://andpad.jp/help/pricing
- ANDPAD ARR: https://tech.andpad.co.jp/entry/2025/12/25/173000
- SPIDERPLUS IR: https://irtv.jp/channel/18151 · https://note.com/sp_ir/n/n85ac31d0a2f6
- ダンドリワーク prijzen: https://dandori-work.com/plan/
- Lychee Redmine: https://lychee-redmine.jp/plan/ · https://lychee-redmine.jp/plan-onpre/
- Brabio!: https://brabio.jp/estimates.html
- PROCOLLA: https://procolla.com/ · https://arent.co.jp/news/20250808_procolla/
- MetaMoJi: https://metamoji.com/jp/news/
- **KENTEM PROSHARE — officiële prijzen (toegevoegd bij verificatie):** https://www.kentem.jp/product-service/proshare/plan/

**Leveranciers — westers en resellers**
- Microsoft Japan Project-prijzen: https://www.microsoft.com/ja-jp/microsoft-365/project/compare-microsoft-project-management-software
- Microsoft Project Professional 2024: https://www.microsoft.com/ja-jp/microsoft-365/p/project-professional-2024/cfq7ttc0ph40
- NTT Docomo Business — Project Plan 3: https://www.onlineshop.docomobusiness.ntt.com/s/86c6b418-72e4-11ee-b4e5-4f0529be4007
- Oracle Japan Primavera P6: https://www.oracle.com/jp/construction-engineering/primavera-p6/
- Oracle Japan prijzen/licenties: https://www.oracle.com/jp/corporate/pricing/japanese-pricing-licensing/
- TIS千代田システムズ Primavera P6: https://www.tc-systems.co.jp/service/pm/primavera-p6/
- DTSolution: https://www.dtsolution.io/ja
- LTM Solutions: https://ltm-solutions.com
- Topcon — SYNCHRO verkoopstart: https://www.topconpositioning.asia/jp/ja/topics/2023/1212/
- Topcon — SYNCHRO productpagina: https://www.topconpositioning.asia/jp/ja/products/brand/relate/bentley-synchro/
- Topcon corporate: https://www.topcon.co.jp/topics/13630/
- Bentley Japan SYNCHRO: https://ja.bentley.com/software/synchro/
- ALICE Technologies — Kajima-partnerschap: https://blog.alicetechnologies.com/news/kajima-group-partners-with-alice-technologies-to-reimagine-construction-scheduling
- ALICE Technologies: https://www.alicetechnologies.com/home
- AVEVA Japan — Toyo Engineering: https://www.aveva.com/ja-jp/about/news/press-releases/2022/

**Aannemers**
- JGC 日揮 — PMS: https://www.jgc.com/jp/business/project-management/
- 大林組 — 構造設計支援AI: https://www.obayashi.co.jp/news/detail/news20250624_1.html
- 大成建設 — 施工計画書作成支援: https://www.taisei.co.jp/about_us/wn/2025/251128_10770.html
- 清水建設 — AI施工管理: https://www.shimz.co.jp/company/about/news-release/2026/2026015.html
- 竹中工務店 — NTT Com samenwerking: https://www.takenaka.co.jp/news/2023/07/01/
- ken-it.world — PROCOLLA-analyse: https://ken-it.world/it/2025/08/drawings-to-timelines.html

**Branche en methodiek**
- 日建連 BIM: https://www.nikkenren.com/kenchiku/bim/
- 建設通信新聞 — BIM-adoptie 76%: https://digital.kentsu.co.jp/articles/artcl_rglr/01KVW3BKSXC79W5DMKMSZ5W5F3
- 建設ニュース — BIM-enquête: https://www.kensetsunews.com/archives/1250339
- 建設ITプラザ — BIM-enquête methodiek: https://it.kensetsu-plaza.com/cad/kiji/post/47112
- 日刊建設工業新聞 — 施工管理技士 aantallen: https://www.nikoukei.co.jp/news/detail/508394
- zero-sekokan — タクト工程: https://zero-sekokan.com/kanri-takt.html
- sekokan-base — ネットワーク工程表: https://sekokan-base.com/
- doboku-note: https://doboku-note.com/
- seko-kanri: https://seko-kanri.com/

**Piraterij/compliance**
- BSA Japan: https://bsa.or.jp/anti-piracy/ · https://bsacompliance.jp/
- ACCS: https://www2.accsjp.or.jp/piracy/
- Security NEXT — piraterijcijfers: https://www.security-next.com/030577

---

## Bijlage: methodologische verantwoording en beperkingen

**Wat ik met vertrouwen kan stellen** (directe bron, primaire of vakpers):
- Alle prijzen in §4.1 met bron-URL.
- Yano-marktomvang FY2023/FY2030.
- MM総研-adoptiecijfers en de 18%-positie van デキスパート (plus eYACHO 26% bij ゼネコン).
- ANDPAD- en SPIDERPLUS-schaalcijfers. **[BIJGESTELD]** De 現場ナビ工程-cijfers (500+, 96%, "スーパーゼネコンでシェアNo.1") horen hier **niet**: het zijn leveranciersclaims op basis van *"2022年4月 構造ソフト調べ"* — eigen onderzoek, zonder gepubliceerde methode.
- De ±120 Primavera P6-implementaties via TIS千代田システムズ — **maar dit is een zelfclaim met peildatum december 2022**, geen onafhankelijke telling.
- Regelgeving (2024年問題, BIM/CIM原則適用, i-Construction 2.0) met datums.
- De Kajima–ALICE- en Obayashi–Arent-samenwerkingen met datums.

**Wat expliciet mijn eigen schatting is:**
- Omvang van de planning/scheduling-deelmarkt (¥8–15 mrd / USD 50–95 mln, 2025) — twee onafhankelijke methodes in §2.3.
- Aantal planners (150.000–250.000 die plannen maken; 1.500–4.000 full-time planners in westerse zin).
- Excel-aandeel (55–75%).
- Primavera P6-prijzen in Japan en trainingskosten.
- Groeiprognose naar ¥18–25 mrd in 2030.

**Bekende beperkingen van dit onderzoek:**
1. **Zoekbudget.** De WebSearch-quota van deze sessie was al uitgeput voordat ik begon; ik heb het onderzoek volledig via WebFetch uitgevoerd, deels tegen de HTML-zoekendpoints van DuckDuckGo en deels tegen bronpagina's direct. Dat werkt, maar levert minder brede resultatendekking dan een reeks native zoekopdrachten. Ik heb ~24 fetch-operaties gedaan, waarvan de meerderheid met Japanstalige queries (工程管理ソフト, 工程表作成ソフト, ネットワーク工程表, タクト工程, 建設DX市場規模, 建設業2024年問題, IT導入補助金, 施工BIM, プロジェクト管理ツール シェア, ソフトウェア不正コピー, 施工管理技士 合格者数, 建設投資見通し, plus productspecifieke queries).
2. **Betaalmuren.** De volledige rapporten van Yano, MM総研, 富士キメラ総研 en ITR zijn niet toegankelijk; ik gebruik hun persberichten en secundaire vakpers.
3. **Prijstransparantie.** Een groot deel van de Japanse markt hanteert 要問合せ/応相談 (op aanvraag). Voor ANDPAD, 工程's, PROCOLLA, SYNCHRO en Primavera P6 in Japan bestaan geen publieke prijzen.
4. **Reviewvolume.** ITreview heeft slechts 59 reviews over 37 producten in 工事管理; die scores zijn statistisch zwak en ik behandel ze als indicatief.
5. **Niet gevonden ≠ afwezig.** Voor Asta Powerproject, TILOS, RIB, Spider Project, Safran, Deltek, InEight en Nodes & Links heb ik geen Japanse sporen gevonden. Dat is sterk bewijs voor marginaliteit, maar geen bewijs van volledige afwezigheid.
6. **Eén cijfer met vertaalonzekerheid:** de SPIDERPLUS-omzet van ¥1.106 mln lijkt een kwartaalcijfer; het ARR-cijfer van ¥4,53 mrd is betrouwbaarder en gebruik ik.

---

## Verificatie

**Uitgevoerd:** 25 juli 2026, adversariële fact-check. Opzet: elke kernbewering actief proberen te **weerleggen** met onafhankelijke, waar mogelijk Japanstalige bronnen — bij voorkeur andere dan de oorspronkelijk aangehaalde. Alle rekensommen zijn met de hand nagerekend.

**Methodische beperking van deze verificatieronde:** het WebSearch-budget van de sessie was uitgeput; verificatie is gedaan met directe WebFetch op primaire bronpagina's plus de HTML-zoekendpoint van DuckDuckGo. De prijspagina van 構造ソフト is bovendien via `curl` + Shift-JIS-decodering gecontroleerd, omdat de HTML-naar-markdown-conversie de btw-aanduiding onleesbaar maakte (mojibake). Voor claims waar ik geen tweede, onafhankelijke bron vond, staat expliciet **onzeker**.

### Marktomvang en redenering

| # | Bewering | Oordeel | Bevinding | Bron |
|---|---|---|---|---|
| 1 | Yano: 建築-ConTech-software FY2023 = ¥184,5 mrd (1.845,4億円), +11,7% j-o-j | **bevestigd** | Letterlijk `1,845億4,000万円`, `11.7%増`. Rapport *2025年版 建設DX（ConTech）市場の実態と展望～ソフトウェア・ソリューション編～*, gepubliceerd **28 maart 2025**, ¥198.000 | https://www.yano.co.jp/press-release/show/press_id/3789 |
| 2 | Yano: FY2030 = ¥304,3 mrd (3.042,7億円), +64,9% t.o.v. FY2023, CAGR 7,4% | **bevestigd** | Letterlijk `3,042億7,000万円`, `64.9%増`. Nagerekend: 304,3/184,5 = 1,6493 → +64,9% ✓; 1,6493^(1/7) − 1 = **7,41%** ✓ | idem + secundaire vermeldingen |
| 3 | Yano-scope: software & oplossingen, excl. hardware, alleen 建築 (土木 buiten scope) | **bevestigd** | Yano bevestigt de 建築-afbakening en de uitsluiting van civiele techniek expliciet | idem |
| 4 | Yano noemt de markt gefragmenteerd zonder dominante speler | **bevestigd** | *"圧倒的なシェアを持つ事業者は存在しない"* | idem |
| 5 | "施工管理 en 調達・手配 groeien het hardst" | **gecorrigeerd** | Yano onderscheidt twee verschillende dingen: **調達・手配 heeft de hoogste groeivoet**; **施工管理 is het grootste segment** (met hoge groei). De oorspronkelijke formulering voegde die samen. Zijdelings gunstig voor methode A: dat 施工管理 het grootste van zeven segmenten is, maakt 25–30% plausibel — maar Yano publiceert geen segmentaandelen, dus het blijft een aanname | idem |
| 6 | USD-omrekeningen (¥184,5 mrd ≈ USD 1,32 mrd @¥140; ¥304,3 mrd ≈ USD 1,88 mrd @¥162) | **bevestigd** | Nagerekend: 184,5/140 = 1,318 ✓; 304,3/162 = 1,878 ✓ | — |
| 7 | Methode A: 25–30% × ¥184,5 = ¥46–55 mrd; 15–25% daarvan = ¥7–14 mrd; +¥1–3 mrd → **¥8–17 mrd** | **bevestigd (rekenkundig)** | Nagerekend: ¥46,1–55,4 mrd ✓; ¥6,9–13,8 mrd ✓; ¥7,9–16,8 mrd ✓. De **aandeelpercentages zelf zijn niet te verifiëren** — Yano publiceert geen segmentsplitsing. Blijft een aanname-keten van drie schattingen op elkaar | https://www.yano.co.jp/press-release/show/press_id/3789 |
| 8 | Methode B: 40–60% × 370.000 = 150.000–220.000; 80.000–150.000 zitplaatsen × ¥50.000–90.000 = **¥4–13,5 mrd** | **bevestigd (rekenkundig), onzeker (invoer)** | Nagerekend: 148.000–222.000 ✓; ¥4,0–13,5 mrd ✓. Maar zie #9 | — |
| 9 | Gewogen jaarwaarde per zitplaats ¥50.000–90.000 | **gecorrigeerd — te hoog** | De ankers zitten aan de bovenkant. eYACHO's **jaarplan** is ¥37.800/licentie/jaar (≈¥3.150/mnd) en de スタンダード版 ¥4.200/mnd — niet de ¥68.640/jaar (= 12 × het duurste maandtarief ¥5.720) die als anker werd gebruikt. 現場ナビ工程 koop komt na jaar 1 op ¥39.600/jaar. Realistischer: **¥35.000–70.000/jaar** → methode B wordt **¥2,8–10,5 mrd** | MetaMoJi-prijzen via zoekresultaten; https://www.kozosoft.co.jp/genba_navi/seihin/koutei/koutei_p6.html |
| 10 | Gecombineerd **¥8–15 mrd (USD 50–95 mln)**, midden ±¥11 mrd | **gecorrigeerd** | De **doorsnede** van A (¥8–17) en B (¥4–13,5) is **¥8–13,5 mrd**; met de correctie uit #9 eerder ¥8–10,5 mrd. De bovengrens van ¥15 mrd werd alleen door methode A gedragen en is dus geen "twee onafhankelijke methodes"-uitkomst. Bijgesteld naar **¥8–13,5 mrd (USD 50–83 mln), midden ±¥10 mrd** | eigen herberekening |
| 11 | Groei naar ¥18–25 mrd in 2030 | **onzeker** | Zuiver eigen extrapolatie; impliceert een CAGR van 10–15% tegen Yano's 7,4% voor de totaalmarkt. De redenering (2024年問題 drukt op planning) is plausibel maar nergens gekwantificeerd. Geen bron vindbaar die een planning-deelmarkt in Japan apart raamt | — |
| 12 | Aantal planners: 150.000–250.000 planmakers; 80.000–150.000 betaalde zitplaatsen; **1.500–4.000 full-time planners** | **onzeker** | Geen enkele bron gevonden die een Japanse "planner"-beroepspopulatie telt. De onderliggende observatie (Japan kent geen brede planner-rol; de 所長 plant zelf) wordt door meerdere vakartikelen ondersteund, maar de getallen zijn ongevalideerd. Als *ordegrootte* verdedigbaar, niet als cijfer | — |
| 13 | IMARC: Japanse PPM-markt USD 402 mln (2024) → USD 1,418 mrd (2033), CAGR 15% | **bevestigd, met update** | 2024-cijfer van USD 402 mln teruggevonden; interne CAGR klopt (nagerekend: (1.418/402)^(1/9) − 1 = **15,03%** ✓). **Nieuwere IMARC-editie:** USD **462,3 mln (2025)** → USD **1.533,3 mln (2034)**, CAGR **14,25%**. De lage-betrouwbaarheidsmarkering in het rapport is terecht | IMARC via zoekresultaten |

### Macrocijfers

| # | Bewering | Oordeel | Bevinding | Bron |
|---|---|---|---|---|
| 14 | 建設投資 FY2025 = ¥75,57 bln; overheid ¥25,21 bln (+0,7%); privaat ¥50,36 bln (+4,5%) | **bevestigd** | Exact: `75兆5,700億円` (+3,2% totaal), `25兆2,100億円` (+0,7%), `50兆3,600億円` (+4,5%). Persbericht van 29 aug. 2025 | https://www.mlit.go.jp/report/press/joho04_hh_001319.html |
| 15 | 技術者 ±370.000 (2022) | **bevestigd** | MLIT: *"建設技術者数（令和4年平均）は37万人"*, al 20 jaar vlak | MLIT via zoekresultaten |
| 16 | 建設業就業者数 4,79 mln in **2024** | **gecorrigeerd** | 479万人 is in MLIT-materiaal het **令和4年 (2022)**-gemiddelde. Voor **2024** wordt **477万人** genoemd (*"2024年はピーク時比69.6％の477万人"*, piek 685万人 in 1997). Jaartoewijzing was één meting verschoven | MLIT / 労働力調査 via zoekresultaten |
| 17 | "bouwproductie +23,5% over tien jaar, personeelsbestand −5,5%" | **onzeker / waarschijnlijk onjuist** | Niet te reproduceren. 建設投資 FY2015 ±¥51 bln → FY2025 ¥75,57 bln = **nominaal ±+48%**. Het 2014-personeelscijfer (5,07 mln) is nergens teruggevonden. Richting klopt, percentages niet | eigen herberekening op MLIT-data |

### Marktleiderschap en adoptie

| # | Bewering | Oordeel | Bevinding | Bron |
|---|---|---|---|---|
| 18 | MM総研: adoptie 施工管理-apps 42% (was 35%); ゼネコン 60% (was 49%) | **bevestigd** | *"利用率は42％となり、2024年4月に働き方改革関連法が適用された直後の35％から7ポイント上昇"*; ゼネコン 49% → 60% (+11pt) | MM総研 via zoekresultaten, https://www.m2ri.jp/release/ |
| 19 | デキスパート (建設システム/KENTEM) 18%, #1 in de hele sector | **bevestigd** | Peiling dec. 2025: 18%, #1 in 施工管理支援アプリ over de hele bouwsector. Leverancier 建設システム (KENTEM), Fuji-shi, Shizuoka. In de **2024**-meting stond *"デキスパート・SiteBox"* op 19% | MM総研 via zoekresultaten |
| 20 | eYACHO #1 bij ゼネコン, "aandeel niet publiek" | **gecorrigeerd** | Het aandeel **is** publiek: **26%** bij ゼネコン volgens MM総研 | MM総研 via zoekresultaten |
| 21 | ANDPAD 265.000 bedrijven / 690.000 gebruikers | **gecorrigeerd** | Eigen site: *"利用社数26万社、ユーザー69万人を超える"* → **±260.000** en ±690.000. "265.000" is schijnprecisie die in geen bron staat | https://andpad.jp/ |
| 22 | ANDPAD ARR ¥10 mrd (najaar 2025), doel ¥30 mrd | **bevestigd** | *"この秋、ANDPADはARR 100億円を突破しました"* in een blogpost van 25 dec. 2025 → najaar **2025** klopt. Doel: *"次なる目標として掲げるARR 300億円"*. Let op de veelgemaakte vertaalfout: 100億円 = ¥10 mrd, niet ¥100 mrd | https://tech.andpad.co.jp/entry/2025/12/25/173000 |
| 23 | ANDPAD *"8年連続シェアNo.1"* in 施工管理クラウド | **gecorrigeerd** | Exacte claim: *"導入企業数8年連続シェアNo.1"* in de **建設業マネジメントクラウドサービス市場**, op basis van **デロイトトーマツ ミック経済研究所**, *ミックITリポート2025年12月号*. Dus: andere marktdefinitie dan "施工管理クラウド", en gemeten op **aantal ingevoerde bedrijven** (niet omzet). Positief: het is wél een derde partij, geen zelfclaim | https://andpad.co.jp/news/12114/ |
| 24 | SPIDERPLUS (TSE Growth 4192) ARR ¥4,53 mrd, +29% j-o-j, FY2024 | **bevestigd** | ARR ±¥4,5 mrd, **+29%** over FY2024 (boekjaar t/m dec. 2024); omzet ¥4.072 mln; KGI FY2025 = 30% ARR-groei + break-even | IR-materiaal via zoekresultaten, https://irtv.jp/channel/18151 |
| 25 | 現場ナビ工程: 500+ implementaties, 96% retentie, *"スーパーゼネコンでシェアNo.1"* | **onzeker** | Alle drie zijn **leveranciersclaims zonder onafhankelijke onderbouwing**. De No.1-claim draagt de voetnoot *"2022年4月 構造ソフト調べ"* — eigen onderzoek uit **april 2022**, methode en steekproef niet gepubliceerd; het rapport dateerde ze op 2025. Wél meervoudig bevestigd: meerdere スーパーゼネコン hebben het bedrijfsbreed als standaard ingevoerd | leveranciers-/vergelijkingspagina's; https://genba-navi-kotei.arent.co.jp/ |
| 26 | Primavera P6: ±120 cumulatieve implementaties via TIS千代田システムズ, *"国内No.1"*, 20+ jaar | **bevestigd (letterlijk), onzeker (betekenis)** | Exact: *"累計約120社への導入実績（2022年12月現在）"*, *"国内No.1※の取扱い実績"*, *"20年以上"*, expertteam **PRIMA-TECH** bevestigd. Kanttekeningen: (a) zelfclaim, waarbij de No.1-voetnoot terugverwijst naar de eigen telling; (b) peildatum **dec. 2022**, ruim 3,5 jaar oud. De conclusie "P6 is een niche in Japan" blijft overeind, het exacte getal is gedateerd | https://www.tc-systems.co.jp/service/pm/primavera-p6/ |

### Prijzen

| # | Bewering | Oordeel | Bevinding | Bron |
|---|---|---|---|---|
| 27 | 現場ナビ工程: ¥99.000 koop + ¥39.600/jr; ¥13.200/mnd netwerk; ¥4.400/mnd standalone — **"alle bedragen 税別"** | **bedragen bevestigd, btw-status gecorrigeerd** | Bedragen exact bevestigd. Maar de bronpagina zet letterlijk `（税込）` achter elk bedrag (geverifieerd via `curl` + Shift-JIS-decodering; de markdown-conversie maakte hier mojibake van). Corroboratie: alle vier zijn exact 1,1× een rond getal (¥90.000 / ¥36.000 / ¥12.000 / ¥4.000). Het rapport claimde **税別** — dat is **fout**; de netto prijzen liggen ±9% lager dan gepresenteerd | https://www.kozosoft.co.jp/genba_navi/seihin/koutei/koutei_p6.html |
| 28 | 構造ソフト biedt gratis 講習会 aan nieuwe klanten | **bevestigd** | 無償の講習会 en Zoom-demonstraties bevestigd op de productpagina | idem |
| 29 | **PROSHARE (KENTEM): ¥33.000 initieel + ¥99.000/maand~** | **gecorrigeerd — grootste fout in het rapport** | KENTEM's eigen planpagina: **初期開設費 ¥30.000 (税抜)** + **¥60.000 per JAAR** (50 GB cloud + 5 licenties, 税抜); alleen opslag ¥30.000/jaar; extra licentie ¥12.000/jaar vanaf de 6e; extra 10 GB ¥6.000/jaar. Er bestaat **geen maandtarief van ¥99.000**. De fout is dubbel: verkeerd bedrag én verkeerde eenheid (maand i.p.v. jaar) — ruim **20× te hoog**. Bovendien noemt de in het rapport aangehaalde bron (aippearnet) PROSHARE helemaal niet | https://www.kentem.jp/product-service/proshare/plan/ |
| 30 | eYACHO: ¥330.000 initieel (alleen jr 1) + ¥3.520–5.720/ID/mnd | **gedeeltelijk bevestigd / onzeker** | ¥330.000 initieel (税込, alleen jaar 1) bevestigd; minimum ±5 accounts, 10 GB per licentie. Maar MetaMoJi noemt daarnaast een スタンダード版 op **¥4.200/licentie/mnd** of **¥37.800/licentie/jaar** — het jaarplan is dus fors goedkoper dan de gebruikte bovenwaarde. Btw-status en editie-toewijzing van ¥3.520/¥5.720 (= ¥3.200/¥5.200 × 1,1) zijn niet hard vast te stellen | MetaMoJi-prijsinfo via zoekresultaten |
| 31 | 工作2プラス ¥88.000~ + ¥11.000/jr support | **gecorrigeerd (onvolledig)** | Bron geeft **ranges**: ¥88.000–264.000 (税込) afhankelijk van licentieaantal; onderhoud ¥11.000–22.000 (税込)/jaar. Alleen de ondergrenzen waren overgenomen | https://www.aippearnet.com/column/constructiondx/kouteihyou-sakusei-soft/ |
| 32 | コストナビ工程表 ¥99.000 pakket of ¥4.400/mnd | **gecorrigeerd (onvolledig)** | Bron: ¥99.000–**308.000** (税込); abonnement ¥4.400 (税込)/mnd. Bovengrens ontbrak | idem |
| 33 | 工程さん ¥3.938 incl. btw, eenmalig | **onzeker** | Bron schrijft *"3,938円(税抜)/パソコン1台につき"* — dus **税抜** én **per pc**. Maar ¥3.938 = ¥3.580 × 1,1, wat op 税込 wijst; de bron is intern tegenstrijdig. Het per-pc-karakter ontbrak in het rapport. Het strategische punt (¥4.000-prijspunt eeuwig) blijft geldig | idem |
| 34 | Lychee Redmine: "tarieven op site", 7.000 bedrijven | **aangevuld** | aippearnet noemt een concreet instaptarief: **¥900 (税抜)/maand~** naast het gratis plan. De claim "7.000 bedrijven" blijft een **leveranciersclaim**, niet onafhankelijk bevestigd | idem |
| 35 | Smartsheet vanaf ¥1.200/mnd | **bevestigd, met nuance** | Bron: ¥1.200/maand~ **per member**; btw-status niet vermeld | idem |
| 36 | MS Project Standard 2024 ¥120.780 / Professional 2024 ¥201.490 | **bevestigd** | Beide bedragen staan letterlijk op de Japanse Microsoft-vergelijkingspagina, als buy-once-licenties. De pagina vermeldt de btw-status niet expliciet (Microsoft Store JP toont doorgaans 税込) — het rapport liet dit terecht open. Plan 1/5 inderdaad niet op die pagina | https://www.microsoft.com/ja-jp/microsoft-365/project/compare-microsoft-project-management-software |
| 37 | Primavera P6 Japan: ¥400.000–570.000/zitplaats eeuwig, ¥320.000–470.000/gebr./jr cloud | **onzeker** | Blijft een afgeleide van internationale Oracle-lijstprijzen; geen Japanse prijslijst gevonden, ook niet bij de resellers. De eigen betrouwbaarheidsmarkering "matig" is juist — eerder **laag**, want er is geen enkele Japanse validatiebron | — |
| 38 | P6-training in Japan ¥150.000–300.000 p.p. | **onzeker** | Geen bron gevonden; blijft ongevalideerd, zoals het rapport zelf aangeeft | — |

### Overheidsmandaten en marktstructuur

| # | Bewering | Oordeel | Bevinding | Bron |
|---|---|---|---|---|
| 39 | BIM/CIM 原則適用 "vanaf FY2023 verplicht op **alle openbare werken** behalve kleinschalige projecten" | **gecorrigeerd** | Geldt voor **国土交通省直轄の土木業務・工事** (MLIT's eigen, direct beheerde civiele opdrachten en werken), kleinschalige uitgezonderd, met 義務項目 en 推奨項目. Werken van prefecturen/gemeenten en 建築-opdrachten vallen er **niet** automatisch onder. De oorspronkelijke formulering overdrijft de reikwijdte aanzienlijk | MLIT/NILIM via zoekresultaten, https://www.nilim.go.jp/lab/qbg/bimcim/bimcimindex.html |
| 40 | 2024年問題: sinds 1 april 2024 overwerklimiet "100 uur/maand, gemiddeld 80 uur over 2–6 maanden" | **gecorrigeerd** | De **hoofdregel** is 45 uur/maand en 360 uur/jaar. De genoemde 100 uur en 80-uursgemiddelde zijn de **bovengrenzen van het 特別条項** (uitzonderingsclausule), samen met 720 uur/jaar en max. 6 maanden per jaar boven 45 uur. Het rapport presenteerde het uitzonderingsplafond als "de" limiet | MHLW-regelgeving |
| 41 | 中央建設業審議会 herzag 工期に関する基準 op 27 maart 2024 | **bevestigd** | *"令和6年3月27日に開催された中央建設業審議会で審議され、同日その実施が勧告されました"* | MLIT via zoekresultaten |
| 42 | i-Construction 2.0 aangekondigd april 2024: −30% arbeidsinzet, 1,5× productiviteit tegen 2040 | **onzeker (niet tegengesproken)** | Niet apart geverifieerd in deze ronde; de MLIT-bron-URL in het rapport is plausibel en het cijferpaar komt overeen met wat breed over i-Construction 2.0 wordt gepubliceerd. Geen tegenbewijs gevonden | https://www.mlit.go.jp/report/press/kanbo08_hh_001085.html |
| 43 | IT導入補助金: bouw ±20% van alle toekenningen in FY2023 | **bevestigd, met sterkere onderbouwing** | ±20%-aandeel bevestigd; aanvullend: de bouw is **5 jaar op rij de sector met de meeste toekenningen** (FY2024: **10.613** toekenningen). Dit versterkt de conclusie dat registratie als goedgekeurde IT-tool een reëel toegangskanaal is | tijdreeksanalyse via ケンテク; https://it-shien.smrj.go.jp/2025/ |
| 44 | Excel-aandeel 55–75% van alle 工程表 | **onzeker** | Geen enquêtecijfer gevonden, in Japanse noch westerse bronnen — het rapport erkent dit zelf. De **richting** is goed onderbouwd (elk vergelijkingsartikel opent met "Excel of speciale software", leveranciers positioneren zich expliciet tegen Excel, de "gratis"-categorie bestaat uit Excel-sjablonen), maar de bandbreedte is een gok | — |
| 45 | Geen Japanse tractie voor Asta Powerproject, TILOS, RIB, Spider Project, Safran, Deltek, InEight, Nodes & Links | **onzeker (niet weerlegd)** | Ik heb evenmin Japanse sporen gevonden. Zoals het rapport zelf stelt: "niet gevonden ≠ afwezig". Blijft sterk indicatief voor marginaliteit | — |

### Samenvattend oordeel

**Sterkste deel van het rapport:** de primaire cijfers met bron-URL. Yano, MLIT-bouwinvesteringen, MM総研, SPIDERPLUS, ANDPAD-ARR, de MS Project-prijzen en de regelgevingsdatums zijn stuk voor stuk letterlijk terug te vinden. De rekensommen in §2.3 kloppen zonder uitzondering — ik heb elke vermenigvuldiging en elke CAGR nagerekend en geen enkele rekenfout gevonden.

**Zwakste deel:** de prijzen die uit **secundaire vergelijkingsartikelen** komen in plaats van van de leverancier zelf. Daar zit de enige grove fout (PROSHARE, ±20× te hoog en met de verkeerde tijdseenheid), plus systematische onvolledigheid: vergelijkingssites publiceren vaak alleen de instapprijs van een range, en die instapprijs is in het rapport als "de prijs" overgenomen (工作2プラス, コストナビ工程表). Ook de btw-status is meermaals verkeerd of onbepaald overgenomen — bij 現場ナビ工程 in de verkeerde richting (税込 gepresenteerd als 税別).

**Structureel patroon om op te letten:** het rapport neemt **leveranciersclaims soms te vroeg op in de categorie "harde cijfers"**. 現場ナビ工程's "スーパーゼネコンでシェアNo.1" berust op een eigen onderzoek van de leverancier uit april 2022, en het P6-getal van ±120 is een zelfclaim met peildatum december 2022. Beide staan in de methodologische bijlage onder *"wat ik met vertrouwen kan stellen"*; dat is bijgesteld. De onderliggende **conclusies** — Japanse pakketten domineren binnenlands, P6 is een EPC-niche, de markt is gefragmenteerd — worden door de verificatie wel gedragen.

**Netto-effect op de kernconclusie:** de marktomvangschatting is neerwaarts bijgesteld van ¥8–15 mrd naar **¥8–13,5 mrd** (midden ±¥10 mrd i.p.v. ¥11 mrd), omdat de oorspronkelijke bovengrens buiten de overlap van de twee methodes viel en de zitplaatswaarde te hoog was gekozen. Dat is een correctie van de orde 10–25% — de strategische conclusies van het rapport veranderen er niet door.
