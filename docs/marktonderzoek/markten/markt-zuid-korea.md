# Markt voor projectplanning-/schedulingsoftware in Zuid-Korea

**Regio:** Oost-Azië
**Peildatum onderzoek:** 25 juli 2026
**Gehanteerde wisselkoers:** ₩1.480 = US$1 (midden-2026; USD/KRW-gemiddelde 2026 ≈ ₩1.485, bandbreedte ₩1.427,9–₩1.559,4 — [ValutaFX via zoekresultaat](https://lite.duckduckgo.com/lite/?q=%EC%9B%90%EB%8B%AC%EB%9F%AC+%ED%99%98%EC%9C%A8+2026%EB%85%84+7%EC%9B%94+%ED%8F%89%EA%B7%A0+%EC%9B%90)). Alle USD-bedragen in dit rapport zijn met deze koers omgerekend tenzij de bron zelf al USD noemt.

> **Leeswijzer bij de betrouwbaarheid.** Cijfers met bron-URL zijn overgenomen uit die bron. Alles wat als **[EIGEN SCHATTING]** is gemarkeerd is een redenering van mijzelf, met de gebruikte aannames erbij. Zuid-Korea publiceert géén afzonderlijke statistiek voor "planningssoftware"; elke marktomvang op dat niveau is dus per definitie een afleiding.

---

## 1. Samenvatting

Zuid-Korea is een markt met een **scherpe tweedeling** die veel sterker is dan in West-Europa:

1. **Export-EPC (buitenlandse projecten).** De grote Koreaanse aannemers — Samsung C&T, Samsung E&A (voorheen Samsung Engineering), Hyundai E&C, Hyundai Engineering, Daewoo E&C, GS E&C, DL E&C, POSCO E&C, SK ecoplant, Lotte E&C, Doosan — draaien op **Oracle Primavera P6**. Dat is geen keuze maar een contracteis: opdrachtgevers in het Midden-Oosten, Zuidoost-Azië en (sinds 2025 dominant) Europa schrijven P6/.xer voor. Koreaanse vacatureteksten voor `공정관리` (planning) noemen P6 expliciet als eis of pré ([zoekresultaat vacatures](https://lite.duckduckgo.com/lite/?q=%EC%B1%84%EC%9A%A9+%EA%B3%B5%EC%A0%95%EA%B4%80%EB%A6%AC+Primavera+P6+%EA%B2%BD%EB%A0%A5+%ED%95%B4%EC%99%B8%ED%98%84%EC%9E%A5+%EC%9A%B0%EB%8C%80+%EC%82%BC%EC%84%B1%EB%AC%BC%EC%82%B0+%ED%98%84%EB%8C%80%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EB%A7%81)). Dit segment is klein in stoelen maar zeer hoogwaardig, en het is de reden dat Korea een volwassen P6-consultancy-ecosysteem heeft (P6ix, DTSolution, 한국PM, CPM Planner).

2. **Binnenlandse projecten.** Hier is het beeld radicaal anders. Een Koreaanse vakbron stelt onomwonden dat MS Project in de Koreaanse bouw **zelden** wordt gebruikt en dat men Excel prefereert, en dat Procore/Buildertrend/Smartsheet "국내에서는 거의 사용되지 않습니다" (worden binnenlands vrijwel niet gebruikt) ([한국pm](https://hkpm.co.kr/%EA%B3%B5%EC%A0%95%EA%B4%80%EB%A6%AC-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EC%A2%85%EB%A5%98-%EB%B0%8F-%ED%8A%B9%EC%A7%95/)). De feitelijke standaard voor het binnenlandse `예정공정표` (planningsschema) is **Excel** — er circuleert een hele industrie aan gratis/goedkope Excel-macroprogramma's (bijv. `예정공정표_엑셀프로그램 V43`). Daarnaast bestaat een dunne laag echte Koreaanse CPM-pakketten.

3. **De Koreaanse pakketten zelf.** Er zijn twee historisch relevante binnenlandse CPM-producten die in westerse bronnen praktisch niet voorkomen: **EasyPEM** van ㈜다인씨엔씨 (₩1,5–3,0 mln perpetual) en **neoPLAN** van ㈜한과박소프트, dat claimt "10년 이상 1,000여 현장에서 검증된" (in 10+ jaar op 1.000+ bouwplaatsen bewezen) en tegenwoordig gratis meekomt bij het ProjectWare-abonnement van ₩110.000/maand. Daarnaast is er een dikke laag Koreaanse **PMIS**-leveranciers (TEOS, Human-Plus, CrossTeam, DTSolution) die planning als module leveren, meestal met P6 als rekenmotor eronder in plaats van een eigen CPM-engine.

4. **Hancom-ecosysteem.** Hancom levert géén planningstool, maar het **HWP-formaat** domineert wél de oplevering van overheidsdocumenten in de bouw (준공서류, 공문). Praktisch effect: een planningsschema moet uiteindelijk als afbeelding/tabel in een HWP- of Excel-document belanden. Elke tool die de Koreaanse publieke markt raakt, moet dus export naar afbeelding/Excel/PDF ondersteunen — pure "eigen bestandsformaat"-tools stuiten op een muur.

5. **Overheid als aanjager.** Het BIM-mandaat van het 국토교통부 (Ministerie van Land, Infrastructuur en Transport) is de belangrijkste structurele groeimotor: **sinds 2023** ≥₩100 mrd, **per 2026** ≥₩50 mrd, **per 2028** ≥₩30 mrd, en in 2030 álle publieke werken ([연합뉴스](https://www.yna.co.kr/view/AKR20230609128900003), [buildlibrary](https://buildlibrary.co.kr/bim-%EC%9D%98%EB%AC%B4%ED%99%94-%EB%A1%9C%EB%93%9C%EB%A7%B5-2026%EB%85%84-500%EC%96%B5-%EC%9D%B4%EC%83%81-%EA%B3%B5%EC%82%AC-%EC%A0%81%EC%9A%A9-%EA%B8%B0%EC%A4%80-%EC%B4%9D%EC%A0%95%EB%A6%AC/)). *[GECORRIGEERD bij verificatie — zie §11: de eerdere versie noemde 2024 i.p.v. 2023 voor de ₩100 mrd-drempel, "2025/2026" i.p.v. 2026 voor ₩50 mrd, en miste de 2028-stap van ₩30 mrd.]* Kritisch detail voor planningssoftware: de Koreaanse 4D-CAD-richtlijn definieert het `공정관리 성과품` (planningsdeliverable) expliciet als **IFC-model + 2D-tekening + 3D-model + planningsdata** ([koreascience JAKO202429153279722](https://koreascience.or.kr/article/JAKO202429153279722.pdf)) — een openbare, IFC-gebaseerde planningsketen wordt hier dus door regelgeving afgedwongen.

6. **Grootte.** De totale Zuid-Koreaanse PPM-softwaremarkt (alle sectoren) was **US$92,4 mln in 2024**, groeiend naar **US$594,3 mln in 2035** bij 18,4% CAGR ([Spherical Insights](https://www.sphericalinsights.com/reports/south-korea-project-portfolio-management-market)). Mijn afgeleide schatting voor het bouw-/engineeringdeel specifiek: **US$25–40 mln/jaar aan licenties (2026)**, en **US$70–130 mln/jaar** als je PMIS-implementaties, 4D en consultancy/training meetelt. Zie §2.4 voor de redenering. **⚠ Belangrijke nuance na verificatie:** dit "anker" is géén hard cijfer. Vijf andere bureaus geven voor dezelfde markt en hetzelfde basisjaar US$90,8 mln (Decisions Advisors), US$95,8 mln (Grand View / Research and Markets) tot **US$195,9 mln (MarketsandMarkets)** — een spreiding van meer dan 2× waarbinnen het Spherical-cijfer aan de onderkant zit. Zie §11.

7. **Piraterij.** Korea's SW-piraterijgraad hangt al jaren "in de hoge 20%" ([전자신문](https://www.etnews.com/20240201000251)). De handhavingsstatistiek van de 한국소프트웨어저작권협회 over 2025 laat 856 meldingen zien met ~₩9,3 mrd geschatte schade, waarbij **CAD/CAM-ontwerpsoftware met 197 zaken de op één na grootste categorie** is en de voorzitter stelt dat inbreuk zich concentreert "특정 업종과 고가 설계 SW 환경에" (in specifieke branches en dure ontwerp-SW-omgevingen) ([디지털데일리](https://www.ddaily.co.kr/page/view/2026020410395955839)). Voor duur nichegereedschap als P6 is de facto-realiteit dat individuen en kleine bureaus geen legale weg vinden: "Oracle 프리마베라 p6 프로그램 소프트웨어는 설치 파일을 구하기가 어렵습니다" (het is moeilijk om aan de installatiebestanden te komen) — je moet via een Koreaanse Oracle-verkooppunt ([네이버 프리미엄콘텐츠 한국PM](https://contents.premium.naver.com/primavera/p6/contents/250423185257838dy)).

---

## 2. Marktomvang

### 2.1 Macro-context: hoe groot is de onderliggende bouwmarkt?

| Grootheid | Waarde | Jaar | Bron |
|---|---|---|---|
| Bouwinvesteringen (건설투자) | ₩295,3 bln (≈ US$199,5 mrd) | 2025 (prognose) | [CMPI/건설산업연구원](https://data.cmpi.or.kr/program/issue/2412_2-6.pdf) |
| Binnenlandse bouworders (국내 건설수주) | ₩210,4 bln (≈ US$142 mrd) | 2025 (prognose) | [CMPI](https://data.cmpi.or.kr/program/issue/2412_2-6.pdf) |
| Binnenlandse bouworders — alternatieve raming | ₩222,1 bln (≈ US$150 mrd) | 2025 (prognose) | [CERIK](https://www.cerik.re.kr/report/briefing/2983) |
| Buitenlandse bouworders (해외건설 수주) | US$37,11 mrd — hoogste in 9 jaar; cumulatief US$1 bln bereikt; 254 bedrijven, 101 landen, 605 projecten | 2024 | [연합뉴스](https://www.yna.co.kr/view/MYH20250109022400641), [뉴시스](https://www.newsis.com/view/NISX20250109_0003026318) |
| Buitenlandse bouworders | **US$47,27 mrd (≈ ₩68 bln)** — +27% j-o-j, hoogste sinds 2014; Europa 42,6% = US$20,16 mrd | 2025 | [국토교통부 via Finance Scope](https://www.finance-scope.com/article/view/scp202601090009), [ANC뉴스](https://www.ancnews.kr/news/articleView.html?idxno=20057), [조선비즈](https://biz.chosun.com/real_estate/real_estate_general/2026/01/09/) |
| Geregistreerde bouwbedrijven ⚠ | 101.614 totaal — 종합 (hoofdaannemers) 18.294, 전문 (specialisten) 83.320 | juni 2026 | [KISCON](https://www.kiscon.net/statistic/) |
| — *tegenstrijdige officiële telling* ⚠ | 국토교통 통계누리 geeft voor **dezelfde maand** 종합 18.294 maar 전문 **67.454**; 건설산업정보센터 telde Q1-2025 **65.207 전문-bedrijven tegenover 133.841 등록건수**. Het KISCON-getal 83.320 telt vrijwel zeker registraties/업종 en niet unieke bedrijven. Realistischer totaal: **≈85.700 bedrijven**. | juni 2026 / Q1 2025 | [stat.molit.go.kr](https://stat.molit.go.kr/portal/cate/statView.do), [KCINET](https://www.kcinet.or.kr) |
| Geregistreerde bouwtechnici (건설기술인) | 1.000.000 leden bereikt — 건축 380.235 / 토목 329.073 / 기계 103.364 (+ 안전관리 40.000+) | **11 april 2024** | [한국건설기술인협회 / CEPIK](https://www.cepik.re.kr/trend/technique_view/661) |
| R&D-uitgaven top-5 beursgenoteerde aannemers | ₩385,9 mrd (≈ US$261 mln), −11,4% j-o-j | 2025 | [뉴스핌](https://www.newspim.com/news/view/20260708001082) |
| CM/PM-omzet Hanmi Global (grootste Koreaanse CM-bureau) | US$244,8 mln (≈ ₩325,9 mrd); ENR #8 wereldwijd buiten de VS | 2023 | zoekresultaat ENR/한미글로벌 |
| Gecombineerde omzet top-10 binnenlandse CM/감리-bureaus | ₩957,3 mrd (≈ US$647 mln) | recent | zoekresultaat 건설경제 |

**Interpretatie.** De export-EPC-tak is in 2025 met 27% gegroeid tot US$47,3 mrd en heeft daarmee het hoogste niveau sinds 2014 bereikt. Dat is precies het segment waar P6 verplicht is. De binnenlandse markt is in waarde ~3× zo groot (₩210–222 bln orders) maar softwaretechnisch veel armer bediend.

### 2.2 Softwaremarkt: de directe cijfers

| Grootheid | Waarde | Jaar | Bron |
|---|---|---|---|
| **Zuid-Korea PPM-softwaremarkt (alle sectoren)** | **US$92,4 mln** | 2024 (basisjaar) | [Spherical Insights](https://www.sphericalinsights.com/reports/south-korea-project-portfolio-management-market) |
| Zuid-Korea PPM-softwaremarkt, prognose | US$594,3 mln, CAGR 18,4% (2024–2035) | 2035 | [Spherical Insights](https://www.sphericalinsights.com/reports/south-korea-project-portfolio-management-market) |
| Segmentleiders binnen die markt | Cloud-deployment domineert; "IT & telecom" is de grootste verticale in 2024 | 2024 | idem |
| Genoemde spelers in dat rapport | Microsoft, Oracle, SAP, ServiceNow, Planview e.a. (9 bedrijven) | 2024 | idem |
| Wereldwijde PPM-markt (referentie) | US$5,5 mrd (2024) → US$10,29 mrd (2032), CAGR 8,9% | 2024–2032 | [Consegic](https://www.consegicbusinessintelligence.com/ko/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4-%EA%B4%80%EB%A6%AC-%EC%8B%9C%EC%9E%A5-2598) |
| Wereldwijde bouwsoftwaremarkt (referentie) | US$11,78 mrd (2026) → US$24,72 mrd (2034), CAGR 9,7% | 2026–2034 | [Fortune Business Insights](https://www.fortunebusinessinsights.com/ko/construction-software-market-110155) |
| Wereldwijde smart-constructionmarkt (referentie) | US$18,2 mrd (2025) → US$65 mrd (2035), CAGR 15,2% | 2025–2035 | [PwC Korea](https://www.pwc.com/kr/ko/insights/industry-focus/smart-construction-tech.html) |
| Koreaanse SaaS-markt totaal | ~₩1,8 bln (2022) → >₩3 bln verwacht in 2026 (IDC Korea) | 2022–2026 | [Basily blog, citerend IDC Korea](https://blog.basily.space/guksan-collaboration-tools-comparison) |
| Signaal over binnenlandse smart-constructionmarkt | Hoge groei maar "글로벌 시장 대비 매우 적은 시장규모" (zeer klein t.o.v. wereldmarkt) | recent | [RICON](https://www.ricon.re.kr/board/view.php?no=5756) |

Extrapolatie van de Spherical-reeks naar nu: US$92,4 mln × 1,184² ≈ **US$129,5 mln in 2026** voor de totale Koreaanse PPM-softwaremarkt. **[EIGEN SCHATTING — lineaire toepassing van de door de bron opgegeven CAGR op het basisjaar; de bron publiceert zelf geen 2026-punt.]**

**Rekencontrole en bronvergelijking (toegevoegd bij verificatie).** De rekensom klopt: (594,3/92,4)^(1/11) − 1 = 18,44%, dus de door Spherical opgegeven CAGR is intern consistent, en 92,4 × 1,184² = 129,5. Ook onafhankelijk gecorroboreerd: **Precedence Research** geeft US$110,53 mln voor 2025 bij ~18% CAGR, wat voor 2026 op US$130,4 mln uitkomt — vrijwel identiek. **Maar de spreiding tussen bureaus is fors** en het rapport mag niet als één "hard anker" worden gelezen:

| Bureau | 2024 (of aangegeven jaar) | Prognose |
|---|---|---|
| Decisions Advisors | US$90,8 mln | US$555,8 mln (2035) |
| Spherical Insights | US$92,4 mln | US$594,3 mln (2035), 18,4% |
| Grand View Research | US$95,8 mln | 17,9% CAGR (2025–2030) |
| Research and Markets | US$95,8 mln | US$251,9 mln (2030), 17,9% |
| Precedence Research | US$110,53 mln (2025) | US$578,5 mln (2035), 18% |
| **MarketsandMarkets** | **US$195,9 mln** | US$417,7 mln (2029), 16,3% |

Vier van de zes bureaus clusteren rond US$91–96 mln (2024), maar MarketsandMarkets zit ruim 2× hoger. Doorgerekend naar 2026 loopt de bandbreedte dus van **≈US$127 mln tot ≈US$265 mln**. Het in §2.4 gebruikte anker van US$129,5 mln is daarmee een *ondergrens-scenario*, geen consensuscijfer. **[GECORRIGEERD/genuanceerd bij verificatie — zie §11.]**

### 2.3 Ordegrootte van het aantal planners

Er bestaat geen officiële telling van `공정관리` -specialisten. Wat er wél is:

- 1.000.000 geregistreerde 건설기술인 (bouwtechnici) in totaal (mei 2024, [CEPIK](https://www.cepik.re.kr/trend/technique_view/661)). `공정관리` is binnen het Koreaanse stelsel een **전문분야** (specialisatie) die je per loopbaan laat erkennen bij het 건설기술인 경력관리수탁기관; het aantal per specialisatie wordt niet publiek uitgesplitst.
- 18.294 hoofdaannemers en 83.320 specialistische aannemers ([KISCON](https://www.kiscon.net/statistic/)).
- 254 bedrijven voerden in 2024 605 buitenlandse projecten uit ([뉴시스](https://www.newsis.com/view/NISX20250109_0003026318)).

**[EIGEN SCHATTING]** Redenering in twee lagen:

*Laag A — echte CPM-planners (P6/MS Project/netwerkplanning als dagtaak).*
Buitenlandse EPC: met US$47,3 mrd aan nieuwe orders per jaar en een gemiddelde looptijd van ~3 jaar draaien er op enig moment ruwweg US$110–140 mrd aan lopende buitenlandse contractwaarde. ⚠ *Kanttekening na verificatie:* deze band is 3 × de twee béste jaren ooit sinds 2014 (3 × US$37,1 mrd = US$111 mrd; 3 × US$47,3 mrd = US$142 mrd). De jaren 2016–2023 lagen structureel onder US$40 mrd (2025 was volgens het 국토교통부 het eerste jaar sinds 2015 boven US$40 mrd), dus de werkelijke lopende contractwaarde ligt vermoedelijk dichter bij de ondergrens. Ik heb geen gepubliceerd 해외건설 수주잔액-cijfer kunnen vinden om dit te toetsen. Bij de gangbare EPC-vuistregel van 1 planner per US$40–70 mln lopende contractwaarde geeft dat **≈ 1.800–3.400 planners** op exportwerk, inclusief hoofdkantoorafdelingen (Samsung C&T, Samsung E&A, Hyundai E&C/Engineering, Daewoo, GS, DL, POSCO, SK ecoplant, Lotte, Doosan) en de plant-engineeringbureaus.
Binnenlands grootschalig: publieke megaprojecten (LH, 도로공사, 철도공단, KHNP), semiconductor-fabs en grote private ontwikkelingen. Deze groep is dunner bemand — schat **≈ 1.500–3.000**.
→ **Laag A totaal ≈ 3.500–6.500 personen.**

*Laag B — iedereen die beroepsmatig een `공정표` maakt (overwegend Excel/bar chart).*
Elke actieve bouwplaats van enige omvang heeft een 공무 of 현장기술자 die het 예정공정표 bijhoudt, want dat is contractueel verplicht (zie §5.1). Met tienduizenden gelijktijdige projecten bij 18.294 hoofdaannemers schat ik **≈ 60.000–120.000 personen**, waarvan het overgrote deel nooit een CPM-tool aanraakt.

Deze verhouding (≈5% "echte" planners) verklaart waarom de betaalde-licentiemarkt zo veel kleiner is dan de bouwmarkt zou doen vermoeden.

### 2.4 Eigen raming van de marktomvang voor planningssoftware in de bouw

**[EIGEN SCHATTING — bottom-up, 2026]**

*Aannames en tussenstappen:*

| Component | Aanname | Bedrag/jaar |
|---|---|---|
| Primavera P6 (perpetual + support + cloud, bouw/engineering) | 3.500–6.000 seats; blended US$900–1.400/seat/jr (perpetual met 22% support ≈ US$900; Primavera Cloud ≈ US$3.660/jr trekt het gemiddelde omhoog) | **US$4–8 mln** |
| Microsoft Project (bouw/engineering-deel) ⚠ | 20.000–35.000 seats; blended US$150–250/jr (mix van geamortiseerde perpetuals ₩1,07–1,77 mln en Project Plan-abonnementen) | **US$3,5–8 mln** |
| Koreaanse CPM-pakketten (EasyPEM, neoPLAN/ProjectWare, e.d.) | enkele duizenden seats, lage ASP (₩1,5–3,0 mln perpetual of ₩110k/mnd) | **US$2–5 mln** |
| Planningsmodules binnen Koreaanse PMIS (TEOS, Human-Plus, CrossTeam, DTSolution, P6ix PMIS-X) — alleen het licentiedeel | schatting op basis van een tiental leveranciers met tientallen tot honderden klanten | **US$8–12 mln** |
| Bouw-SaaS met planningsfunctie (CaaS Works, Tigerbeam, 서진ERP e.d.) | ₩9.000–₩110.000 p/m; groeiend maar nog beperkt betalend volume | **US$3–5 mln** |
| Nederlandse/algemene tools met Gantt (Flow, Dooray, Jira, Smartsheet) toegerekend aan bouw | zeer klein aandeel; bouw is geen kernmarkt van deze tools in Korea | **US$2–4 mln** |
| **Subtotaal — puur licenties/abonnementen planningssoftware in bouw & engineering** | | **≈ US$25–40 mln** |
| Implementatie, maatwerk, PMIS-projecten, 4D-diensten | services-zwaar; P6ix alleen al 330+ projecten in 13 jaar | **US$35–70 mln** |
| Training & consultancy (KPC, 건설기술교육원, P6ix, DTSolution, 한국PM, CPM Planner) | zie §4 voor tarieven | **US$8–20 mln** |
| **Totaal, brede definitie** | | **≈ US$70–130 mln** |

*Sanity-check tegen de top-down:* de totale Koreaanse PPM-markt is ≈US$129,5 mln (2026, geëxtrapoleerd). Als bouw/engineering ~25–30% van die PPM-uitgaven vertegenwoordigt — plausibel, want Spherical noemt IT & telecom als grootste verticale — kom je op **US$32–39 mln licenties**, wat precies binnen mijn bottom-up-band van US$25–40 mln valt. De twee methodes bevestigen elkaar.

> **⚠ CORRECTIE NA VERIFICATIE — deze sanity-check houdt geen stand.** Drie problemen, in volgorde van ernst:
>
> 1. **De check is circulair.** Het aandeel van 25–30% is nergens uit een bron afgeleid; het is een vrij gekozen parameter. Ik heb gericht gezocht naar een gepubliceerde verticale-uitsplitsing van de PPM-markt en die bestaat niet in openbare vorm: Blueweave en Adroit noemen "Construction" wél als segment maar publiceren géén percentages. Bij een meer gangbaar aandeel van 12–15% zou de top-down op **US$15,5–19,4 mln** uitkomen — ruim *onder* de bottom-up-band. De overeenkomst is dus volledig het gevolg van de gekozen parameter, niet van onafhankelijke bevestiging.
> 2. **De onderbouwing is een non-sequitur.** Dat "IT & telecom de grootste verticale is" pleit *tegen*, niet vóór, een bouwaandeel van 25–30%: bij vijf genoemde leveranciers (Microsoft, Oracle, SAP, ServiceNow, Planview) en een groter IT&telecom-segment zou er voor alle overige verticalen samen (BFSI, overheid, zorg, maakindustrie, energie, onderwijs) minder dan ~45% overblijven.
> 3. **Scopeconflict.** Ruim 40% van de bottom-up-band (PMIS-licenties US$8–12 mln + bouw-SaaS US$3–5 mln) bestaat uit Koreaanse producten die vrijwel zeker *buiten* de definitie van de syndicated PPM-marktrapporten vallen. De twee getallen meten niet hetzelfde en kunnen elkaar per definitie niet bevestigen.
>
> **Aanvullende rekenpunten.** (a) De componentbanden sommeren tot **US$22,5–42 mln**, niet tot de gepresenteerde US$25–40 mln; de gepresenteerde band is (verdedigbaar, maar onvermeld) versmald. (b) Het brede totaal sommeert tot US$68–130 mln, afgerond gepresenteerd als US$70–130 mln. (c) **De 20.000–35.000 MS Project-seats zijn intern tegenstrijdig met §2.3 en §3.2**: §2.3 raamt in totaal slechts 3.500–6.500 "echte CPM-planners" over álle tools en stelt expliciet dat de 60.000–120.000 Excel-gebruikers "nooit een CPM-tool aanraken" — terwijl MS Project een CPM-tool is; §3.2 noemt MS Project bovendien "marginaal in de bouw". Tegelijk claimt de P6-regel al 3.500–6.000 seats, wat vrijwel de hele planner-populatie opsoupeert. Minstens één van deze drie getallen moet omlaag.
>
> **Netto-oordeel:** de bottom-up-band van US$25–40 mln blijft een verdedigbare *orde van grootte*, maar hij is **niet top-down bevestigd**. Behandel hem als één schatting met een reële onzekerheid van grofweg US$15–50 mln.

*Groei:* ik verwacht dat het bouwsegment **sneller** groeit dan de 18,4% CAGR van de totale PPM-markt in de periode 2026–2030, gedreven door het BIM-mandaat (§5.2) dat in 2030 alle publieke werken raakt, en daarna afvlakt. **[EIGEN SCHATTING]**

---

## 3. Welke software wordt daadwerkelijk gebruikt — marktpositie per pakket

### 3.1 Segment 1: export-EPC / internationale projecten

Hier geldt één regel: **P6 of niets.**

| # | Pakket | Positie | Wie gebruikt het |
|---|---|---|---|
| 1 | **Oracle Primavera P6 (Professional + EPPM)** | **Onbetwiste #1, de facto verplicht** | Samsung C&T, Samsung E&A, Hyundai E&C, Hyundai Engineering, Daewoo E&C, GS E&C, DL E&C, POSCO E&C, SK ecoplant, Lotte E&C, Doosan; alle plant-/offshore-EPC |
| 2 | Oracle Primavera Cloud (OPC) | Groeiend, door Oracle actief gepusht | Oracle's Koreaanse pagina stuurt expliciet aan op migratie P6 → Primavera Cloud |
| 3 | Primavera Risk Analysis (PRA) / Safran Risk | Niche, maar standaard bij tenderrisico | Grote plant-EPC; PRA zit in het KPC-curriculum |
| 4 | MS Project | Secundair; alleen als de klant het toestaat | Kleinere buitenlandse contracten, China-projecten (Samsung C&T vraagt "P6 또는 MS Project") |
| 5 | Aconex / Unifier / Procore | Documentbeheer + kosten naast P6 | DTSolution levert Aconex, Procore, Unifier, CostOS naast P6 |

**Bewijs voor de dominantie.** Een Koreaanse vakbron formuleert het zo: "P6 Primavera Tool이 가장 강력하고, 가장 호환성이 높고 많이 통용된다" (P6 is het krachtigst, het meest compatibel en het meest gangbaar) ([한국PM, Naver Premium](https://contents.premium.naver.com/primavera/p6/contents/250415154408787cz)). Een andere: "프리마베라(P6)는 프로젝트 관리 소프트웨어로, 주로 대형 프로젝트에서 공정표 작성 및 공정률 산정에 많이 사용됩니다" ([hkpm.co.kr](https://hkpm.co.kr/)). En het gebruikersprofiel wordt daar samengevat als "대부분의 해외공사(미국방부, Microsoft, 공항 등)" — de meeste buitenlandse werken.

**Waarom het onwrikbaar is.** Het gaat niet om functionaliteit maar om **claimwaarde**. Koreaanse consultants verkopen P6 expliciet als instrument voor "공정관리, 공기지연 분석, EOT(공기연장), 클레임 대응" (planning, vertragingsanalyse, Extension of Time, claimafhandeling) ([blog.naver.com/kwango3894](https://blog.naver.com/kwango3894/224136360955)) en CPM Planner verkoopt zelfs kant-en-klare `.xer`/`.plt`-databases ([cpmplanner.com](https://cpmplanner.com/about/)). Als een vertragingsclaim van honderden miljoenen dollars op je planning rust, wisselt niemand van tool.

### 3.2 Segment 2: binnenlandse grote projecten

| # | Pakket | Positie |
|---|---|---|
| 1 | **Excel** (+ macroprogramma's) | **Feitelijke #1 naar volume**, ook op grote werken |
| 2 | Primavera P6 | #1 naar waarde; gebruikt op semiconductor-fabs, energie, grote infra, projecten met CM-bureau |
| 3 | Koreaanse PMIS met P6 eronder | Sterk groeiend; TEOS Reliance.PMIS, Human-Plus SWP, CrossTeam, DTSolution, P6ix PMIS-X |
| 4 | MS Project | Marginaal in de bouw ondanks brede beschikbaarheid |
| 5 | Koreaanse CPM-pakketten (EasyPEM, neoPLAN) | Klein, verouderend, maar reëel |
| 6 | 4D-BIM-tools (Navisworks TimeLiner, Bentley SYNCHRO) | Groeit door BIM-mandaat; visualisatie, niet planning |

**Het meest verrassende punt voor westerse lezers:** MS Project is in de Koreaanse bouw géén standaard. De vakbron 한국pm zegt het botweg: MS Project wordt in de bouw zelden gebruikt en men vervangt het door Excel; bovendien "실적관리를 할 때는 다소 불편한 점이 있습니다" (het is nogal onhandig bij voortgangsregistratie) ([한국pm](https://hkpm.co.kr/%EA%B3%B5%EC%A0%95%EA%B4%80%EB%A6%AC-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EC%A2%85%EB%A5%98-%EB%B0%8F-%ED%8A%B9%EC%A7%95/)).

Dezelfde bron zegt over de Amerikaanse SaaS-generatie (Procore, Buildertrend, Smartsheet): **"국내에서는 거의 사용되지 않는 Tool입니다"** — worden binnenlands vrijwel niet gebruikt. Dit is een belangrijk marktsignaal: de westerse bouw-SaaS-golf is aan Korea grotendeels voorbijgegaan, deels door taal, deels doordat Koreaanse aannemers hun eigen systemen bouwen.

> ⚠ **Bronkritiek (toegevoegd bij verificatie).** De letterlijke citaten op hkpm.co.kr zijn geverifieerd en kloppen: over MS Project *"건설 실무에서는 MS Project 를 많이 사용하지 않는 편입니다"*, over Procore/Buildertrend/Smartsheet *"국내에서는 거의 사용되지 않는 Tool입니다"*, over neoPLAN *"해외에서 많이 사용하지 않아, 국내에서도 사용 빈도가 낮은 편입니다"*. **Maar het blijft één blog, en geen neutrale.** 한국PM monetariseert P6-content (betaalde Naver-Premium-collegereeks; in §5.6 zelf gerubriceerd als "Training/consulting + contentkanaal"). Het is dus een belanghebbende partij die verklaart dat P6 dominant is en de concurrentie irrelevant. Dit rapport leunt op deze ene bron voor drie kernbeweringen: P6-dominantie, MS Project-marginaliteit en het vernietigende neoPLAN-oordeel. Ik heb géén tweede onafhankelijke Koreaanse bron gevonden die dit bevestigt of weerlegt. **Behandel de rangorde in §3.1/§3.2 daarom als plausibel maar zwak onderbouwd, niet als vastgesteld feit.**

### 3.3 Segment 3: binnenlandse MKB-bouw en interieur

Hier draait alles om Excel en, sinds ~2020, een generatie Koreaanse bouw-SaaS:

- **Excel-macroprogramma's** — bijv. `예정공정표_엑셀프로그램 V43` met "3가지 유형의 공정계획표", instelbare grafiekkleuren en automatisch opslaan ([kanghanet.tistory.com](https://kanghanet.tistory.com/entry/%EC%98%88%EC%A0%95%EA%B3%B5%EC%A0%95%ED%91%9C%EC%97%91%EC%85%80%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-V43)); gratis CPM-netwerksjablonen op [freeforms.co.kr](http://www.freeforms.co.kr/view/544186C9-24E0-626.html) in HWP/DOC/XLS.
- **CaaS Works (카스웍스)** — claimt "4,200개 건설 현장이 선택한" (gekozen door 4.200 bouwplaatsen), met een `공정표`-module met sjablonen per gebouwtype en Excel-/beeldexport ([caas.works/services/gantt](https://www.caas.works/services/gantt)).
- **Tigerbeam (타이거빔)** — markup, hoeveelheden, inspectie en realtime voortgang; gratis instap + ₩9.000/gebruiker/maand.
- **서진ERP** bouwmodule — basistarief ₩100.000, add-onmodules ₩10.000–20.000/maand of ₩300.000 aankoop.

### 3.4 Segment 4: algemene projectplanningstools (niet-bouwspecifiek)

Korea heeft een sterke **binnenlandse** samenwerkingstoolmarkt die de westerse tools grotendeels verdringt:

| Tool | Leverancier | Prijs | Gantt? | Positie |
|---|---|---|---|---|
| **Flow (플로우)** | 마드라스체크 | vanaf ₩8.000/gebr./mnd | Ja, expliciet Gantt + 5-stappen-workflow + OKR | De meest projectgerichte Koreaanse tool; sterkste kandidaat voor lichte bouwplanning |
| **Dooray!** | NHN | gratis ≤25 gebruikers, daarna vanaf ₩8.000 | Ja (project/Gantt) | Groupware-zwaar (mail, goedkeuringen, wiki); sterk bij organisaties met formele 결재-stromen |
| **JANDI (잔디)** | Toss Lab | freemium tot premium | Nee/beperkt | Messenger-first; nauwelijks planning |
| **Naver Works** | Naver | — | Beperkt | #1 op gebruiksintensiteit (16,5 dagen/maand/gebruiker) |
| **Basily** | Basily | vanaf ₩8.000/gebr./mnd | Taakbeheer | Nieuwkomer, <50 personen |

Bron voor prijzen en marktcijfers: [Basily-vergelijking](https://blog.basily.space/guksan-collaboration-tools-comparison); gebruiksintensiteit uit [Naver-blogonderzoek](https://m.blog.naver.com/thdwlsdn9901/222780672328); marktdynamiek Flow vs JANDI 2025 in [뉴스에포크](https://newsepoch.co.kr/news/2026041700003).

Westerse tools — **Smartsheet, monday.com, Wrike, Asana** — hebben in Korea geen zichtbare bouwpositie; ze duiken in Koreaanse zoekresultaten nauwelijks op naast Jira en Notion, die wél bij IT-bedrijven leven. **Jira** (met Gantt-plug-ins als BigPicture/Structure) is de enige westerse tool met echte penetratie, maar in software/IT, niet in de bouw.

**Open source** — ProjectLibre, GanttProject, OpenProject — komt in Koreaanse bouwbronnen praktisch niet voor. Dat is opvallend gezien de prijsgevoeligheid; de verklaring is waarschijnlijk dat Excel diezelfde behoefte al gratis afdekt en dat er geen Koreaanse taalondersteuning/community omheen staat. **[EIGEN INTERPRETATIE — afwezigheid in bronnen, geen positief bewijs.]**

### 3.5 Segment 5: nichegereedschap (bouwspecifiek, westers)

| Pakket | Koreaanse aanwezigheid | Distributeur |
|---|---|---|
| **Elecosoft Asta Powerproject** | Reëel maar klein; verkocht op "Excel과 완벽호환" en "LOB(Line of Balance) 자동 생성" voor Tact-planning; leverancier claimt >60.000 gebruikers wereldwijd | **엘엔엠케이 (LNMK)**, [lnmk.co.kr/asta.html](http://www.lnmk.co.kr/asta.html) |
| **Bentley SYNCHRO** | Genoemd als 4D-tool naast Navisworks TimeLiner | via BIM-dienstverleners |
| **Trimble TILOS** | Genoemd voor lineaire projecten (weg/spoor); geen zichtbare Koreaanse distributeur gevonden | — |
| **Safran** | Genoemd voor risicoanalyse | — |
| **RIB MTWO / iTWO** | Genoemd voor 5D-integratie | — |
| **ALICE Technologies** | Genoemd in Koreaanse AI-planningsartikelen naast SYNCHRO 4D | — |
| **Nodes & Links, InEight, Deltek, Spider Project, RIB Candy** | Geen noemenswaardige Koreaanse voetafdruk gevonden | — |

De genoemde lijst komt uit een Koreaanse vergelijkingsblog die TILOS, Safran en RIB MTWO/iTWO als "specialistische programma's" categoriseert ([we_buld op Naver](https://blog.naver.com/we_buld/224050487076)). Belangrijk nuancepunt uit diezelfde bron: 4D-tools "serve presentation purposes but don't independently improve schedule quality" — 4D wordt in Korea vooral als *presentatie*-laag gezien, niet als planningsmotor. De planning komt uit P6.

### 3.6 4D-BIM: Koreaanse spelers

Door het BIM-mandaat is er een eigen 4D-dienstverleningslaag ontstaan:

- **A.nD Plus** — "BIM DATA를 기반으로 Room별 WBS 및 BM을 자동 집계하는 Process" (automatische WBS/hoeveelheden per ruimte uit BIM) ([andplus.co.kr](http://andplus.co.kr/service/4d_process_simulation.html))
- **고려소프트웨어 (Koryosoft)** — **UniKBIM**, "건설표준체계를 기반으로 개발된 한국형 BIM정보 플랫폼" (Koreaans BIM-informatieplatform op basis van de Koreaanse bouwstandaarden) ([koryosoft.co.kr](http://www.koryosoft.co.kr))
- **㈜창소프트아이앤아이 — BuilderHub** — opgericht 2008, "국내 최초 3D 건설정보모델링(BIM) 디지털 건축설계 원천기술" (eerste Koreaanse eigen BIM-technologie); wapening/bekisting-detaillering ([대한경제](https://www.dnews.co.kr/uhtml/view.jsp?idxno=202307180215351440694))
- **BASISSOFT** — "대한민국을 대표하는 건설 소프트웨어 전문회사" ([basis.co.kr](http://www.basis.co.kr))
- **5D With, BIM FACTORY** — 4D/5D-simulatie, kostenkoppeling
- **P6ix** — "공정데이터와 연계된 BIM 모델" met "4D 가상건축 워크플로우"

### 3.7 In-house systemen van de grote aannemers

Dit is het deel dat westerse marktrapporten structureel missen. De grote Koreaanse aannemers **bouwen zelf**:

- **Hyundai E&C — SCMP (Smart Construction Management Platform)**, samen ontwikkeld met softwarebedrijf **ENG Soft**, met BIM-data als kern en "3D 기반으로 데이터 관리" van materialen door het bouwproces heen ([hdec.kr newsroom](https://www.hdec.kr/kr/newsroom/news_view.aspx?NewsSeq=277)).
- **Samsung C&T** — eigen PMIS plus zwaar smart-construction/robotica-programma; gezamenlijke ontwikkeling met Hyundai E&C van materiaaltransportrobots ([news.samsungcnt.com](https://news.samsungcnt.com/ko/)).
- **AI-toepassingen bij 현대건설, 삼성물산, DL이앤씨** met claims tot 90% tijdsreductie in ontwerpautomatisering en 30% kostenreductie ([dfinite.ai](https://blog.dfinite.ai/construction-ai-case-studies)) — **let op: leveranciersclaim, niet geverifieerd.**

Het effect op de softwaremarkt: de grootste, rijkste klanten kopen geen standaardplanningspakket voor hun binnenlandse werk. Ze kopen P6 voor export (omdat het moet) en bouwen de rest zelf of laten het bouwen door SI's (Samsung SDS, Douzone) en PMIS-leveranciers.

### 3.8 Consolidatie: rangorde totale markt

**[EIGEN SCHATTING — rangschikking naar bestede euro's in bouw/engineering, 2026]**

1. **Oracle Primavera P6/OPC** — grootste bestedingen, geconcentreerd bij ~50 organisaties
2. **Excel** — grootste installed base, nul licentiekosten toerekenbaar aan planning
3. **Koreaanse PMIS-suites** (TEOS, Human-Plus, CrossTeam, DTSolution, P6ix) — grootste groeicomponent
4. **In-house systemen** van de top-10 aannemers — grote absolute bestedingen, geen "markt"
5. **Microsoft Project** — brede, ondiepe aanwezigheid
6. **Bouw-SaaS** (CaaS Works, Tigerbeam) — snelgroeiend MKB-segment
7. **Koreaanse CPM-pakketten** (EasyPEM, neoPLAN) — krimpende legacy
8. **Asta Powerproject** en overige westerse niche — marginaal
9. **Algemene samenwerkingstools** (Flow, Dooray) — randgebruik in de bouw

---

## 4. Prijzen, licentiemodellen en trainingskosten

### 4.1 Overzichtstabel

| Product | Leverancier | Prijs (lokaal) | Prijs (USD, @₩1.480) | Model | Bron |
|---|---|---|---|---|---|
| **Primavera P6** (Koreaanse catalogus) | Oracle / Koreaanse reseller | **소비자가 ₩6.100.000 / 판매가 ₩5.700.000** — ⚠ **"PPM Oracle Premier Support 1년 포함", Version 18, 부가세 별도** (incl. 1 jaar support, excl. btw) | **US$4.122 / US$3.851** | Perpetual **inclusief eerstejaars support** | [softwarecatalog.co.kr](https://softwarecatalog.co.kr/item/itemView?itemId=QSC841301) |
| — overige regels op dezelfde catalogus­pagina (bij verificatie opgehaald) | idem | Professional Project Management **₩3.200.000** (btw inbegrepen); Software Update License & Support 1 Year ₩1.500.000 (btw inbegrepen); Premier Support 갱신 ₩748.000; EPPM Premier Support 1년 ₩4.800.000; Risk Analysis incl. 1 jr onderhoud ₩13.096.000 | licentie-alleen ≈US$1.966 (ex btw) | Perpetual | idem |
| P6 Professional (internationale referentie) | Oracle | US$3.880 + US$854 eerstejaars support | US$3.880 | Named user perpetual, 22% onderhoud | [prmyazilim.com](https://prmyazilim.com/en/primavera-p6-pricing) (juni 2025) |
| P6 Enterprise (internationale referentie) | Oracle | US$4.240 + US$933 support | US$4.240 | Named user perpetual | idem |
| Primavera Cloud (internationale referentie) ⚠ | Oracle | US$305/gebruiker/maand, min. 25 gebruikers | US$3.660/jr | Abonnement, support inbegrepen | idem — **⚠ enige bron; niet onafhankelijk te bevestigen, zie §11** |
| **MS Project Professional 2024** | Microsoft Korea | **₩1.769.999** | **US$1.196** | Eenmalige aankoop | [microsoft.com/ko-kr](https://www.microsoft.com/ko-kr/microsoft-365/project/compare-microsoft-project-management-software) |
| **MS Project Standard 2024** | Microsoft Korea | **₩1.069.999** | **US$723** | Eenmalige aankoop | idem |
| MS Project Server (abonnement) | Microsoft Korea | prijs op aanvraag via partner | — | Abonnement | idem |
| **EasyPEM Professional** | ㈜다인씨엔씨 | **₩1.500.000** (50 sjablonen, 9 modules) | **US$1.014** | Perpetual | [easypem.co.kr/product.htm](http://www.easypem.co.kr/product.htm) |
| **EasyPEM Master** | ㈜다인씨엔씨 | **₩3.000.000** (150 sjablonen, 19 modules) | **US$2.027** | Perpetual | idem |
| EasyPEM China | ㈜다인씨엔씨 | 12.000 CNY | ≈US$1.680 | Perpetual | idem |
| EasyPEM Pro (tweedehands, marktbewijs) | — | ₩1.650.000 incl. btw betaald bij aankoop | US$1.115 | doorverkocht na projecteinde | [중고나라](https://web.joongna.com/product/213445223) |
| **ProjectWare (incl. gratis neoPLAN + neoMAX)** ⚠ | ㈜한과박소프트 | **₩110.000/maand, incl. btw** ("표준형 기본요금") — ⚠ dit is een *bundelbasistarief*; er circuleert daarnaast een per-gebruikerstarief "표준형 1인 월 2.000원부터" en een lopende "신규 고객 50% 할인" | **US$74/mnd ≈ US$892/jr** | Abonnement | [projectware.kr](http://w01.projectware.kr/site/Use.html); tariefvarianten via zoekresultaat, zie §11 |
| **Tigerbeam** | 타이거빔 | gratis instap; **₩9.000/gebruiker/maand** | US$6,08/gebr./mnd | SaaS | [tigerbeam.co.kr/pricing](https://tigerbeam.co.kr/pricing) |
| CaaS Works | ㈜에이아이콘 | prijs op aanvraag; gratis proef | — | SaaS | [caas.works](https://www.caas.works) |
| 서진ERP bouwmodule | 서진정보기술 | basis ₩100.000; add-ons ₩10.000–20.000/mnd of ₩300.000 aankoop; 6 mnd gratis onderhoud | US$68 / US$7–14 / US$203 | Jaarcontract | [erp.seojine.com](https://erp.seojine.com/construction/cs2_01.aspx) |
| Flow (플로우) | 마드라스체크 | vanaf ₩8.000/gebruiker/mnd | US$5,41 | SaaS | [Basily-vergelijking](https://blog.basily.space/guksan-collaboration-tools-comparison) |
| Dooray! | NHN | gratis ≤25 gebruikers; daarna vanaf ₩8.000 | US$5,41 | SaaS | idem |
| P6-handboek (R8.x) | — | ₩43.200 | US$29 | Boek | [alltimeprice.com](https://alltimeprice.com/product/?pid=20491702-3285797509) |

### 4.2 Wat opvalt aan de Koreaanse prijsstelling

> ### ⚠ HERZIEN NA VERIFICATIE — de oorspronkelijke conclusie was fout
>
> De oorspronkelijke tekst luidde: *"Er is nauwelijks lokale korting op P6. De Koreaanse catalogusprijs van ₩6,1 mln ≈ US$4.122 ligt boven de internationale referentieprijs van US$3.880 voor P6 Professional. (…) Conclusie: Oracle voert in Korea geen koopkrachtcorrectie."*
>
> **Dat is een appels-met-peren-vergelijking.** Bij hercontrole van de catalogus­pagina blijkt de Koreaanse regel expliciet te luiden **"PPM Oracle Premier Support 1년 포함"** — de prijs is **inclusief het eerste jaar Oracle Premier Support**, en **부가세 별도** (excl. btw). De internationale referentie van US$3.880 is juist **exclusief** support; het bijbehorende eerstejaars­supportbedrag is US$854. De juiste vergelijking is dus:
>
> | | Licentie | 1e jaar support | Totaal |
> |---|---|---|---|
> | Internationale referentie (prmyazilim, juni 2025) | US$3.880 | US$854 | **US$4.734** |
> | Korea 소비자가 ₩6.100.000 (ex btw) | \- | \- | **US$4.122** |
> | Korea 판매가 ₩5.700.000 (ex btw) | \- | \- | **US$3.851** |
>
> De Koreaanse verkoopprijs ligt daarmee **circa 19% ónder** de internationale bundelprijs, en zelfs de adviesprijs ligt er ~13% onder. Bovendien staat op dezelfde pagina een licentie-alleen-regel **"Professional Project Management ₩3.200.000" (incl. btw)** = ₩2,91 mln ex btw ≈ **US$1.966**, ongeveer de helft van de internationale US$3.880; en een supportvernieuwing van ₩748.000, wat bij 22% onderhoud impliceert dat de onderliggende licentie rond ₩3,4 mln (≈US$2.300) ligt.
>
> **Herziene conclusie: de bewering "Koreaanse prijs ligt boven de wereldprijs / geen koopkrachtcorrectie" is niet houdbaar.** De Koreaanse catalogusprijzen liggen op like-for-like-basis eerder *onder* de internationale referentie. Twee kanttekeningen die het beeld onzeker houden: (a) de catalogus is een reseller-lijst met onderling inconsistente SKU's (v17.9 naast v18, btw wisselend in/exclusief), en (b) de "internationale referentie" is zelf een Turkse resellerpagina, geen Oracle-prijslijst — ik heb Oracle's eigen lijstprijs niet kunnen verifiëren. **Wat overeind blijft: P6 is in absolute zin duur voor het Koreaanse bouw-MKB. Wat vervalt: de conclusie dat Oracle Korea bewust *duurder* beprijst.** *[GECORRIGEERD — zie §11.]*

**De prijskloof tussen westers en lokaal is groot maar niet extreem.** EasyPEM Pro (₩1,5 mln) kost ~25% van de P6-bundelprijs; neoPLAN via ProjectWare (₩110k/mnd) is over drie jaar ₩3,96 mln, dus ~65% van ₩6,1 mln. Dat is een minder dramatisch prijsverschil dan in bijvoorbeeld Zuidoost-Azië — de Koreaanse lokale spelers positioneren zich niet als bodemprijs maar als "goed genoeg en in het Koreaans". ⚠ *Twee correcties op deze vergelijking:* (a) de oorspronkelijke formulering "~65% van een P6-licentie **zónder support**" was fout — ₩6,1 mln is juist **inclusief** een jaar support; (b) ₩110.000 is btw-inclusief en ₩6,1 mln btw-exclusief, dus de zuivere ex-btw-verhouding is ₩3,6 mln / ₩6,1 mln ≈ **59%**, en met de lopende 50%-introductiekorting aanzienlijk minder.

**Cloud is duur in Korea. ⚠ [ONZEKER — de onderbouwing houdt niet.]** De claim dat Primavera Cloud US$305/gebruiker/maand kost met een minimum van 25 gebruikers (= US$91.500/jaar ≈ ₩135 mln) berust op **één enkele bron**: dezelfde Turkse resellerpagina. Ik heb dit cijfer bij gerichte controle **niet onafhankelijk kunnen bevestigen** — Oracle publiceert geen openbare Primavera-Cloud-prijs en geen enkele andere vindbare bron noemt US$305 of het 25-gebruikersminimum. Bovendien is het per definitie géén Koreaans cijfer, zodat de kop "Cloud is duur *in Korea*" nergens op een Koreaanse waarneming steunt. De rekensom zelf klopt (305 × 25 × 12 = 91.500; × ₩1.480 = ₩135,4 mln), maar de invoer is onbevestigd. Behandel de conclusie "onbetaalbaar voor alles behalve de top-20 aannemers" als **onbewezen**.

### 4.3 Trainingskosten en -cultuur

| Aanbieder | Cursus | Duur | Prijs | Bron |
|---|---|---|---|---|
| **KPC (한국생산성본부)** | "프로젝트 통합관리를 위한 Primavera P6 & PRA" | 3 dagen / 21 uur, 09:30–17:30 | **₩850.000** (US$574); leden ₩800.000 (US$541) | [kpc.or.kr](https://www.kpc.or.kr/PTWED003_dtil_view.do?ecno=45361&cono=143140) |
| **현대건설 기술교육원** | Bouwmanagement incl. "프로그램(Primavera, 데이터관리)을 활용한 공정표를 작성" | meerweeks | **"교육비 전액 무료·훈련 장려금 지원"** — volledig gratis + trainingstoelage | [edu.hdec.co.kr](https://edu.hdec.co.kr) |
| **건설기술교육원 (KICTE)** | Wettelijk verplichte bijscholing 건설기술인 | — | op aanvraag (032-4600-118) | [kicte.or.kr](https://www.kicte.or.kr) |
| **P3EC** | Primavera P6 basis t/m gevorderd | — | op aanvraag | [p3ec.com/kr/edu/primavera.htm](http://www.p3ec.com/kr/edu/primavera.htm) |
| **Airklass** | "Primavera P6 사용자 가이드 기본 과정" | online | op aanvraag | [airklass.com](https://www.airklass.com/app/klass/8870) |
| **한국PM (Naver Premium)** | Abonnementsserie P6-colleges | doorlopend | Naver Premium-abonnement | [contents.premium.naver.com/primavera/p6](https://contents.premium.naver.com/primavera/p6) |
| **Kmong (프리랜서 마켓)** | 1-op-1 P6-planningsdiensten door schedulers met ervaring sinds 2014 | per opdracht | variabel | [kmong.com/gig/305044](https://kmong.com/gig/305044) |

**De belangrijkste observatie over opleidingscultuur:** Hyundai E&C's eigen technische academie geeft P6-training **gratis, mét trainingstoelage**, omdat het onder de Koreaanse door de overheid gesubsidieerde beroepsopleidingsregeling valt. Dit is de kern van hoe Korea planners opleidt: **niet via een commerciële trainingsmarkt maar via bedrijfsacademies en overheidsgesubsidieerde 직업훈련.** Gevolg: er is een levendige *content*-markt (Naver Premium-abonnementen, blogs, Kmong-freelancers) maar de commerciële klassikale trainingsmarkt is dun — KPC is zowat de enige zichtbare aanbieder met een openbaar tarief.

Een tweede observatie: het Koreaanse `건설기술인`-stelsel kent **verplichte periodieke bijscholing** met sancties bij verzuim, en `공정관리` is een erkende **전문분야** waarvoor je loopbaanpunten laat registreren bij het 건설기술인 경력관리수탁기관, waarbij "경력지수는 건설기술인이 실제 건설관련업무를 수행한 경력에 따라 직무 및 전문분야별로 구분하여 각각 산정한다". Planning is dus een **formeel erkend, geregistreerd carrièrepad** — dat maakt de beroepsgroep stabieler en tool-conservatiever dan in landen zonder zo'n stelsel.

---

## 5. Lokale bijzonderheden

### 5.1 Wettelijke en contractuele verplichtingen rond het `공정표`

Planning is in Korea geen managementkeuze maar een wettelijke plicht:

- **건설기술진흥법 제55조 (건설공사의 품질관리)**: aannemers en geregistreerde woningbouwers moeten voor bij presidentieel besluit aangewezen werken een "품질 및 공정 관리 등 건설공사의 품질관리계획" opstellen ([law.go.kr](https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EA%B1%B4%EC%84%A4%EA%B8%B0%EC%88%A0%EC%A7%84%ED%9D%A5%EB%B2%95)).
- **건설기술진흥법 제35조**: bij aanvraag tot goedkeuring van onderaannemingscontracten is indiening van het **하도급 예정 공정표** verplicht ([tigerbeam-gids](https://tigerbeam.co.kr/blog/construction-schedule-management-guide)).
- **KCS (한국건설기준)**: "수급인은 설계도서에 따른 상세 공정표를 작성해 담당원에게 제출해야 하며, 변경 사항 발생 시 지체 없이 변경공정표를 작성하고 승인을 받아야 한다" — de aannemer moet een gedetailleerd schema indienen en bij wijzigingen onverwijld een gewijzigd schema laten goedkeuren (idem). Herzieningen moeten binnen zeven dagen worden ingediend en goedgekeurd ([blog.naver.com/ksupt](https://m.blog.naver.com/ksupt/223260086885)).
- **Voortgangsmeting** is genormeerd: `공정률 = 완료된 공사금액 ÷ 전체 공사금액 × 100` — dus **waarde-gebaseerd, niet duur-gebaseerd**. Interventie is verplicht wanneer "누계 계획공정률 대비 실적이 5% 이상 지연" (cumulatieve realisatie ≥5% achterloopt op plan) ([tigerbeam-gids](https://tigerbeam.co.kr/blog/construction-schedule-management-guide)).

**Implicatie voor softwarebouwers:** een tool die de Koreaanse markt serieus wil bedienen moet (a) kostgewogen voortgangspercentage aankunnen, (b) een audittrail van goedgekeurde revisies bijhouden (변경공정표), en (c) een 5%-afwijkingssignalering hebben. Dat is geen westerse standaardfunctionaliteit.

### 5.2 Het BIM-mandaat: de belangrijkste structurele driver

Het 국토교통부 voert een gefaseerd verplichtingstraject uit:

| Fase | Drempel | Status | Bron |
|---|---|---|---|
| 2020 | 건설산업 BIM 기본지침 gepubliceerd | ingevoerd | [molit.go.kr](https://www.molit.go.kr/USR/NEWS/m_71/dtl.jsp?id=95084979) |
| 2022 | 건설산업 BIM 시행지침 (opstellen/opleveren/gebruiken van BIM-deliverables) | ingevoerd | [molit.go.kr policyData](https://www.molit.go.kr/USR/policyData/m_34681/dtl.jsp?id=4634) |
| 2023-01-01 | 조달청 시설사업 BIM 적용지침서 v2.1 van kracht voor 맞춤형서비스-projecten | ingevoerd | [조달청 PPS](https://www.pps.go.kr/kor/bbs/view.do?bbsSn=2212280034&key=00324) |
| **2023** | Publieke werken **≥₩100 mrd** (1.000억원) verplicht — start bij grote 건축/철도-werken | ingevoerd | [DEC](https://info.dec-w.com/114), [allbim.kr](https://allbim.kr), [kmecnews](https://www.kmecnews.co.kr) |
| 2024 | Uitbreiding van de ₩100 mrd-drempel naar SOC-werken | ingevoerd | [연합뉴스](https://www.yna.co.kr/view/AKR20230609128900003), [DEC](https://info.dec-w.com/114) |
| **2026** | Publieke werken **≥₩50 mrd** (500억원) — *alle* publieke werken boven die drempel | actief | [buildlibrary](https://buildlibrary.co.kr/bim-%EC%9D%98%EB%AC%B4%ED%99%94-%EB%A1%9C%EB%93%9C%EB%A7%B5-2026%EB%85%84-500%EC%96%B5-%EC%9D%B4%EC%83%81-%EA%B3%B5%EC%82%AC-%EC%A0%81%EC%9A%A9-%EA%B8%B0%EC%A4%80-%EC%B4%9D%EC%A0%95%EB%A6%AC/), [kmecnews](https://www.kmecnews.co.kr) |
| **2028** ⚠ *ontbrak eerder* | Publieke werken **≥₩30 mrd** (300억원) | gepland | [allbim.kr](https://allbim.kr), [DEC](https://info.dec-w.com/114), [kmecnews](https://www.kmecnews.co.kr) |
| 2030 | **Alle** publieke werken (ook <₩30 mrd) | doel | [Autodesk Korea BIM-mandaat](https://www.autodesk.com/kr/campaigns/bim-mandate) |

> ⚠ **GECORRIGEERD bij verificatie.** De eerdere tabel zette de ₩100 mrd-drempel op 2024 (moet 2023 zijn — 2024 was de *uitbreiding* naar SOC), noemde "2025/2026" voor de ₩50 mrd-drempel (moet 2026 zijn) en **miste de tussenstap van 2028 (₩30 mrd)** volledig. Drie onafhankelijke Koreaanse bronnen geven eensluidend: 2023 → 1.000억, 2026 → 500억, 2028 → 300억, 2030 → 300억 미만/alles ("2026년에는 500억원 이상의 모든 공공공사에 적용하고, 2028년 300억원 이상 공공공사, 2030년 300억원 미만의 공공공사로 단계적으로 확대될 예정이다"). Zie §11.

Stand van zaken medio 2026: BIM-aanbestedingen groeien het derde jaar op rij en 7 sectoren / 11 instanties hebben de BIM-basisvereisten overgenomen ([대한경제](https://www.dnews.co.kr/uhtml/view.jsp?idxno=202510161720421880021)).

**Het cruciale detail voor planningssoftware:** de Koreaanse richtlijn voor 4D-CAD-planning definieert het op te leveren `공정관리 성과품` als **"IFC 모델, 2D 도면, 3D 모델, 공정 데이터"** ([koreascience JAKO202429153279722](https://koreascience.or.kr/article/JAKO202429153279722.pdf)). Korea is daarmee een van de weinige markten waar een **IFC-gebaseerde planningsdeliverable expliciet in de overheidsrichtlijn staat**. Dat is een directe opening voor open, IFC-native planningstools — en tegelijk een reden waarom Koreaanse partijen 4D nu vooral als *aanvullende* leverlaag zien bovenop de P6-planning, niet als vervanging.

### 5.3 Taal- en tekenseteisen

- **Hangul/HWP.** Officiële bouwstukken richting de overheid — 준공계, 준공검사원, 공문 — worden in HWP geleverd; standaardformulieren circuleren in "한글(HWP), 워드(DOC) 형식" ([freeforms.co.kr](http://www.freeforms.co.kr/view/463DC34D-8B8A-1499.html), [conmanager](https://conmanager.tistory.com/23)). Er is zelfs een aparte publieke HWP-editor: "공공기관의 개방형 문서 표준 포맷을 지원하는 민원 문서 에디터" ([online.hancom.co.kr](https://online.hancom.co.kr)). Bovendien bestaan er dedicated overheidsportalen voor het indienen van opleverdossiers (bijv. [uics.jiha.go.kr](https://uics.jiha.go.kr)).
- **Praktisch gevolg:** planningssoftware hoeft geen HWP te schrijven, maar moet wél schone **beeld-/PDF-/Excel-export** leveren die zonder herwerk in een HWP-document past. Tools die alleen hun eigen viewer of een webdashboard bieden, vallen in de publieke keten door de mand.
- **Tekenset.** Volledige Hangul (UTF-8/EUC-KR-legacy), lange taaknamen in Koreaans, en gemengd Koreaans/Engels op exportprojecten. Human-Plus verkoopt zijn PMIS expliciet op "해외현장의 삼국인, 현지인 사용자를 위한 다국어 Setting Table 기능" (meertalige instellingstabellen voor derde-landen- en lokale gebruikers op buitenlandse werven) — meertaligheid is dus een expliciet verkooppunt in dit segment.
- **P6-lokalisatie** is een reëel pijnpunt: er is een levendige Koreaanstalige P6-uitleg-industrie (Naver Premium-abonnementen, brunch.co.kr-series, tistory-blogs) juist omdát de tool zelf Engelstalig en zwaar is.

### 5.4 Aanbestedings- en inkoopkanalen

- **나라장터 (KONEPS, [shop.g2b.go.kr](https://shop.g2b.go.kr))** en de **디지털서비스몰 ([digitalmall.g2b.go.kr](https://digitalmall.g2b.go.kr))** zijn de verplichte inkoopkanalen voor publieke instellingen. Software voor overheidsgebruik moet daar genoteerd staan; dat is een niet-triviale toetredingsdrempel voor buitenlandse leveranciers zonder Koreaanse rechtspersoon.
- **소프트웨어카탈로그 ([softwarecatalog.co.kr](https://softwarecatalog.co.kr))** functioneert als de zichtbare commerciële prijslijst voor zakelijke software, inclusief P6.
- Voor het overige loopt de verkoop via **resellers/partners** — zie §5.6.

### 5.5 Informele en gekraakte licenties

De handhavingscijfers over 2025 van de 한국소프트웨어저작권협회:

| Metric | 2025 | 2024 |
|---|---|---|
| Aantal meldingen | **856** | 1.237 |
| Aantal geïdentificeerde softwaretitels | 137 | — |
| Geschatte schade | **₩9,3 mrd (US$6,3 mln)** | — |
| Categorie 1 | Kantoorsoftware — 293 zaken | — |
| Categorie 2 | **CAD/CAM-ontwerpsoftware — 197 zaken** | — |
| Categorie 3 | OS en grafische software | — |

Bron: [디지털데일리](https://www.ddaily.co.kr/page/view/2026020410395955839) en [cncjr.tistory.com](https://cncjr.tistory.com/431).

Aanvullende bevindingen:
- Voorzitter 유병한: **"불법 SW 침해는 특정 업종과 고가 설계 SW 환경에 집중되는 경향이 있다"** — inbreuk concentreert zich in specifieke branches en dure ontwerpsoftware-omgevingen.
- De grootste risicogroep is het **maakindustrie- en chemie-MKB**, niet de grote concerns.
- De dominante inbreukvorm is het gebruik van **cracked versies**; daarnaast licentievoorwaardenschendingen (persoonlijke licenties zakelijk gebruikt, account-sharing bij cloudlicenties).
- De opsporing is geëvolueerd naar **loganalyse en cloudgebruikssporen** in plaats van bestandsherkenning; thuiswerken heeft het onderzoeksbereik uitgebreid naar VPN-gekoppelde externe apparaten.
- Landelijk hangt het piraterijpercentage al jaren "수년째 20% 후반" ([전자신문](https://www.etnews.com/20240201000251)).

**Wat dit betekent voor planningssoftware specifiek.** P6 valt in de categorie "고가 설계 SW" waar de handhaving zich op richt. Tegelijk is de legale aanschaf voor een individu of klein bureau praktisch geblokkeerd: je komt niet eens aan de installatiebestanden zonder een Koreaans Oracle-verkooppunt te benaderen ([한국PM](https://contents.premium.naver.com/primavera/p6/contents/250423185257838dy)). Die combinatie — hoge prijs, moeilijke aanschaf, verplichte tool voor de carrière — is de klassieke voedingsbodem voor informeel gebruik door studenten en freelancers, terwijl de grote aannemers keurig betalen. **[EIGEN ANALYSE op basis van de bovengenoemde bronnen; ik heb geen Koreaanse bron gevonden die P6-piraterij kwantificeert.]**

Praktische consequentie: een gratis of goedkope legale tool met CPM/Gantt heeft in Korea een **echte** doelgroep bij studenten, freelance schedulers (zie de Kmong-markt) en het 전문건설-MKB — mits Koreaans en mits het `.xer` kan lezen.

### 5.6 Resellers en ecosysteem

| Bedrijf | Rol | Details |
|---|---|---|
| **P6ix SC (㈜피식스에스씨)** | **Officiële Oracle Primavera-partner**, opgericht 2013 | "공정, BIM, PMIS-X를 ONE-STOP 서비스로 제공"; **330+ projecten in 13 jaar**; klanten: Samsung Electronics, Samsung Engineering, Hyundai E&C, SK Hynix, Lotte E&C, POSCO E&C, Microsoft, Oracle, CapitaLand; awards: BIM Awards, Smart Challenge, Smart Leader, Oracle Partner ([p6ix.co.kr](https://www.p6ix.co.kr)) |
| **DT Solution** | P6 EPPM-implementatie + bredere toolportfolio | Primavera P6, Unifier, Primavera Risk Analysis + Aconex, Procore, OpenSpace, DocuSign, CostOS; sectoren: scheepsbouw/zware industrie, bouw/engineering, plant/infra; biedt "AI 공정 스케줄링" ([dtsolution.io](https://www.dtsolution.io/ko/services/software/p6)) |
| **Ideait** | Primavera media packs en licenties | "미디어 팩은 Primavera P6 Enterprise 소프트웨어의 설치 및 문서 파일" ([primavera.ideait.co.kr](https://primavera.ideait.co.kr/?page_id=923)) |
| **엘엔엠케이 (LNMK)** | Distributeur **Elecosoft Powerproject** | "영국 Elecosoft 제품으로 전 세계적으로 60,000개 이상"; verkoopargumenten "Excel과 완벽호환" en "LOB(Line of Balance) 자동 생성" voor Tact-planning ([lnmk.co.kr/asta.html](http://www.lnmk.co.kr/asta.html)) |
| **한국PM (HKPM)** | Training/consulting + contentkanaal | Website + Naver Premium-abonnementsserie over P6 ([hkpm.co.kr](https://hkpm.co.kr)) |
| **CPM Planner** | P6-planningsdienstverlening | "Primavera P6 Scheduling Service for Plant/Architecture/Civil Construction Project"; verkoopt `.xer`/`.plt`-databases; EVM en vertragingsanalyse voor EOT-claims ([cpmplanner.com](https://cpmplanner.com/about/)) |
| **Samsung SDS** | SI, "국내 최초 ERP 구축 사업자", 30 jaar ERP-ervaring | [samsungsds.com](https://www.samsungsds.com/kr/erp/erp.html) |
| **Douzone (더존)** | ERP + groupware + documentbeheer | [douzone.com](https://www.douzone.com/solution/erp.jsp) |
| **ENG Soft** | Co-ontwikkelaar van Hyundai E&C's SCMP | [hdec.kr](https://www.hdec.kr/kr/newsroom/news_view.aspx?NewsSeq=277) |

Wat opvalt: **er is geen Koreaanse distributeur gevonden voor TILOS, Safran, Deltek, InEight, Nodes & Links, Spider Project of RIB Candy.** Voor ALICE Technologies vond ik alleen redactionele vermeldingen. Dat betekent dat het westerse niche-aanbod buiten P6 en Powerproject in Korea in de praktijk **onbereikbaar** is zonder directe internationale aankoop — een reële markt-opening.

### 5.7 Contech-investeringsklimaat

- Koreaanse contech-investeringen waren in 2023 **slechts 4,3% van alle proptech-investeringen** ([더스탁](https://www.the-stock.kr/news/articleView.html?idxno=20489)) — de sector is dus kapitaalarm ten opzichte van de omvang van de bouwsector.
- Wereldwijd trekt contech wél sterk aan: 69 investeringsrondes in mei–juni 2026, waarvan 40% in bouw/ontwikkeling; het Koreaanse **Spanner** haalde >₩50 mrd op ([대한경제](https://www.dnews.co.kr/m_home/view.jsp?idxno=202607101551211460729)).
- Relevante planningsgerelateerde startups: **업사이트 (Upsite)** — "AI·딥러닝 기술을 활용한 건설 공정·품질관리 솔루션", opgericht juni 2021 door 임강후 ([한경 매거진](https://magazine.hankyung.com/job-joy/article/202411252993d)); **㈜팀워크** — "AI Agent 건설현장 관리 서비스 ponder" ([건설이야기](https://www.conslove.co.kr/news/articleView.html?idxno=86027)).

---

## 6. Lokale/niche-pakketten in detail — met voor- en nadelen

### 6.1 EasyPEM — ㈜다인씨엔씨 (Dain C&C)

**Wat het is.** Een Windows-desktopprogramma voor PERT/CPM-planning, ontstaan als "Excel-vriendelijke" tegenhanger van P6. Verkocht in drie edities: Professional (₩1,5 mln, 50 sjablonen, 9 modules), Master (₩3,0 mln, 150 sjablonen, 19 modules) en een Chinese editie (12.000 CNY). Actuele versies volgens het eigen forum: Master v4.7, Pro v4.3.

**Functionaliteit** ([easypem.co.kr](http://www.easypem.co.kr/easypem2.htm)): PERT/CPM-netwerk, Gantt/bar chart, resourcegrafiek, kosteninvoer per activiteit met automatische aggregatie, mijlpalen, S-curve en earned-value-analyse, en een **AUTO-scheduling-functie** die conflicten oplost. Meer dan 50 voorbeeldprojecten en 120+ mastersjablonen.

**Voordelen (uit Koreaanse bronnen en documentatie):**
- **Excel-first ontwerp.** Het kernverkoopargument is letterlijk: "엑셀 프로그램으로 작성된 데이터를 직접 입력할 수 있다는 점이고 프로그램의 호환성이 높습니다" — je kunt Excel-data rechtstreeks invoeren en de compatibiliteit is hoog. In een markt waar Excel de de-factostandaard is, is dat precies de juiste wig.
- **Sjabloonrijk.** 120+ mastersjablonen betekent dat een 현장 지원 zonder planningsopleiding binnen een dag een presentabel `예정공정표` heeft.
- **Prijs.** ₩1,5 mln is een kwart van P6 en er is geen jaarlijkse supportverplichting.
- **EVMS ingebouwd** — sluit aan op de Koreaanse waardegebaseerde `공정률`-berekening.
- **Breder publiek dan alleen de aannemer.** Een academische bron stelt: "현장 관리자는 물론 발주처, 감리자 등도 EasyPEM을 활용하면 프로젝트를 관리하는데 큰 도움" — ook opdrachtgevers en toezichthouders hebben er baat bij ([KISTI ScienceON](https://scienceon.kisti.re.kr)).
- **Bewezen praktijkgebruik.** Een tweedehandsadvertentie luidt: "공정표 작성프로그램 EasyPEM Pro 프로그램 판매합니다. 165만(VAT포함)에 직접 구매하여 현장에서 공정관리시 잘 활용했습니다" — iemand kocht het voor ₩1,65 mln, gebruikte het naar tevredenheid op de bouwplaats en verkocht het na projecteinde ([중고나라](https://web.joongna.com/product/213445223)).

**Nadelen:**
- **Verouderd product.** De website is technisch gedateerd (frames, Flash-navigatie, tekencodeerproblemen); het productforum toont slechts sporadische updates. Dit is legacy-software in onderhoudsmodus. **[EIGEN OBSERVATIE bij het bezoeken van de site.]**
- **Geen internationale erkenning.** Er is geen `.xer`-uitwisseling met P6 gedocumenteerd; voor exportprojecten is het onbruikbaar.
- **Perpetual-model betekent hergebruikmarkt.** Dat er een levendige tweedehandsmarkt is (licentie na projecteinde doorverkopen) duidt op projectgebonden, niet-organisatiebrede adoptie — een teken van beperkte verankering.
- **Geen cloud/multi-user.** Alles wijst op single-user desktop; samenwerking en centrale rapportage ontbreken.
- **Kleine expertisepool.** Als je EasyPEM-planner vertrekt, vind je moeilijk vervanging.

**Oordeel:** functioneel verrassend compleet voor de prijs, en het Excel-uitgangspunt is strategisch scherp. Maar het is een product dat zijn moment (2000–2015) heeft gehad en nu tegen zowel P6 als de nieuwe SaaS-generatie aanloopt.

### 6.2 neoPLAN + ProjectWare — ㈜한과박소프트 (HnP Soft)

**Wat het is.** neoPLAN is een PERT/CPM-planningsprogramma dat "프로젝트 진행상의 시간·비용·자원을 효율적으로 관리" (tijd, kosten en resources gedurende de projectuitvoering efficiënt beheert). De marketingclaim: **"10년 이상 1,000 이상 현장에서 검증된 최적의 공정관리 프로그램!"** — het optimale planningsprogramma, in 10+ jaar op 1.000+ bouwplaatsen bewezen ([pm1.kr](http://pm1.kr/Site/neoPLAN.html)).

Functies volgens de leverancier: 일정분석 (Time Analysis), 진도관리 (Progress Measurement), 비용분석 (kostenanalyse), geïntegreerde planning-budgetanalyse om besparingen en knelpunten te vinden, en geaggregeerde rapportage ([pm1.kr/Site/npl-04.html](http://pm1.kr/Site/npl-04.html)).

**Het commerciële model is het interessantst.** neoPLAN wordt niet meer los verkocht: het is opgegaan in **ProjectWare**, een geïntegreerde suite die "그룹웨어 + 프로젝트관리 + 프로젝트회계 + 웹하드 + 메신저 등을 하나로 결합" (groupware + projectbeheer + projectboekhouding + webopslag + messenger in één) samenbrengt, met een eigen "Lite Planner"-Gantt en timesheets gekoppeld aan de salarisadministratie ([hnpsoft.com](http://www.hnpsoft.com/support/previous.html)). Prijs: **₩110.000/maand incl. btw** voor het standaardpakket; **neoPLAN en neoMAX zijn gratis voor ProjectWare-abonnees** ([projectware.kr](http://w01.projectware.kr/site/Use.html)). De leverancier maakt ook **neoMAX-3D**, een constructieanalyse-/ontwerppakket in C++ met statische, dynamische, lineaire en niet-lineaire analyse — een ongewone maar typisch Koreaanse combinatie van planning en rekensoftware onder één dak.

**Voordelen:**
- **Volledig Koreaans**, inclusief terminologie die aansluit op de Koreaanse contractpraktijk (진도관리 in plaats van "progress").
- **Bewezen installed base** — 1.000+ werven is voor een Koreaans nichepakket substantieel.
- **Bundelprijs.** Voor ₩110k/maand krijg je groupware, projectboekhouding én CPM. Dat is voor een 전문건설-bedrijf van 20 man aantrekkelijker dan één P6-licentie voor ₩6,1 mln.
- **Integratie met projectboekhouding en timesheets** — sluit aan bij hoe Koreaanse bedrijven `공정률` aan facturatie koppelen.

**Nadelen:**
- **한국pm plaatst het expliciet onderaan de ranglijst**: neoPLAN wordt daar beschreven als een betaald PERT/CPM-programma met **lage gebruiksfrequentie**, **geen internationale adoptie**, een **smalle expertisepool**, en toepasbaar op "alleen kleine binnenlandse Koreaanse projecten" ([한국pm](https://hkpm.co.kr/%EA%B3%B5%EC%A0%95%EA%B4%80%EB%A6%AC-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EC%A2%85%EB%A5%98-%EB%B0%8F-%ED%8A%B9%EC%A7%95/)). Dit is het scherpste lokale review dat ik heb gevonden en het is niet mals.
- **Sterk verouderde distributie.** Installatiebestanden circuleren via blogposts uit 2010–2013 ("neoPLAN 6.0 설치 프로그램") en zelfs gratis-downloadposts; het betaalkanaal is een bankrekeningnummer bij 외환은행 op een statische HTML-pagina. Dat straalt geen doorlopende productinvestering uit. **[EIGEN OBSERVATIE.]**
- **Marginale positie binnen het eigen productportfolio.** De leverancier presenteert neoPLAN op de pagina "옛날 제품" / "이전 제품" (oude producten) — het is bij de leverancier zelf legacy.
- **Geen P6-interoperabiliteit** gedocumenteerd.

**Oordeel:** het is het duidelijkste voorbeeld van "software die in westerse bronnen niet bestaat maar in Korea reëel is gebruikt". Vandaag is het echter vooral een gratis toevoeging bij een groupware-abonnement, geen serieuze planningskeuze meer.

### 6.3 Koreaanse PMIS-suites (de belangrijkste lokale categorie)

Dit is waar de Koreaanse markt zijn eigen antwoord op planningssoftware heeft gevonden: **niet een concurrerende CPM-engine bouwen, maar P6 inkapselen in een Koreaans PMIS.**

| Leverancier | Product | Kenmerken |
|---|---|---|
| **TEOS** | **Reliance.PMIS** | "건설사업관리시스템" met WBS-opzet, voortgangsmeting en geïntegreerd kosten-/planningsbeheer; gespecialiseerd in gestandaardiseerde werkclassificatie ([teos.co.kr](https://teos.co.kr/solution/reliance-pmis/)) |
| **Human-Plus** | **SWP (Smart Work Place)** | EPC-gericht; **bidirectionele P6-koppeling**: "Primavera(P6) EPPM 표준 API를 이용한 공정자료 활용 및 양방향 DB연동 기술적용"; meertalige setting-tabellen voor buitenlandse werven ([human-plus.co.kr](https://www.human-plus.co.kr/construction-pmis-swp)) |
| **CrossTeam** | Cloud PMIS | Geïntegreerd platform voor ontwerp, uitvoering, kwaliteit, veiligheid, budget en documenten ([crossteam.co.kr](https://www.crossteam.co.kr)) |
| **DT Solution** | PMIS op Primavera-basis | Planning, kosten, contracten, documentbeheer ([dtsolution.io/ko/pmis](https://www.dtsolution.io/ko/pmis)) |
| **P6ix** | **PMIS-X** | Planning + BIM + PMIS + AI als één pakket |
| **서린 D&C (SEORIN)** | 종합사업관리 시스템 | Voor CM-projecten en grootschalige ontwikkelingen ([seorin.com](https://seorin.com)) |
| **한국CMC** | Geïntegreerd projectmanagementsysteem | Plant, faciliteiten, bouw ([hkcmc.co.kr](https://hkcmc.co.kr)) |
| Publieke sector | **One-PMIS Seoul** | 건설정보관리시스템 van de stad Seoul voor aannemers en projectmanagers ([pmis.eseoul.go.kr](https://pmis.eseoul.go.kr)) |

**Voordelen van deze categorie:**
- **Koreaanse UI, Koreaanse workflow, Koreaanse goedkeuringsketen (결재).** Dat is het beslissende voordeel dat Procore en Smartsheet niet kunnen leveren.
- **P6 blijft de rekenmotor**, dus je verliest niets aan claim-waardigheid of `.xer`-uitwisselbaarheid.
- **Publieke sector heeft eigen instanties** — Seoul draait One-PMIS — wat een verplicht raakvlak creëert.
- **Meertaligheid voor exportwerven** is expliciet ingebouwd (Human-Plus).

**Nadelen:**
- **Geen transparante prijzen.** Geen enkele van deze leveranciers publiceert tarieven; alles gaat via offertes. Dat maakt de markt ondoorzichtig en duur voor kleinere partijen.
- **Projectgebonden maatwerk** betekent hoge implementatiekosten en leveranciersafhankelijkheid.
- **Dubbele licentiekosten**: je betaalt het PMIS én de onderliggende P6.
- **Fragmentatie.** Er zijn minstens tien serieuze aanbieders voor een markt van deze omvang; consolidatie ligt voor de hand.

### 6.4 Bouw-SaaS voor het MKB

**CaaS Works (카스웍스, ㈜에이아이콘)** — "4,200개 건설 현장이 선택한 스마트 건설 플랫폼", met videodocumentatie, veiligheidsbeheer, slimme veiligheidsuitrusting én `공정관리` in één. De Gantt-module biedt "건축 유형별 기본 공정표 세팅으로 새로운 프로젝트 진행 시 세팅 된 공정표를 바로 불러올 수 있습니다" (standaardplanningen per gebouwtype, direct inlaadbaar), meerdere weergaves incl. Excel-versie, export als bestand en afbeelding, arbeidsinzetplanning gekoppeld aan voortgang, en een kalenderweergave voor interieurprojecten ([caas.works/services/gantt](https://www.caas.works/services/gantt)).
- *Voordelen:* zeer lage instapdrempel, sjablonen per gebouwtype, integratie met de dagelijkse werfrealiteit (video, veiligheid), gratis proefperiode, Koreaanse support (1666-1967).
- *Nadelen:* geen gepubliceerde prijs (de `/pricing`-pagina geeft 404), geen CPM/kritiek-pad-analyse zichtbaar, geen P6-uitwisseling, planning is een bijproduct van een veiligheids-/documentatieplatform.

**Tigerbeam (타이거빔)** — markup, hoeveelheidsbepaling, inspectieworkflows en realtime voortgang; **gratis instap + ₩9.000/gebruiker/maand**. Sterke contentmarketing rond de wettelijke `공정표`-plicht.
- *Voordelen:* transparante prijs, moderne SaaS, uitstekend Koreaans educatief materiaal dat de wettelijke context uitlegt.
- *Nadelen:* platformbreed, geen diepe CPM; positionering is voortgangsregistratie, niet planning.

**서진ERP bouwmodule** — jaarcontract met basistarief ₩100.000, add-ons ₩10.000–20.000/maand of ₩300.000 aankoop, cloudkosten inbegrepen, 6 maanden gratis onderhoud ([erp.seojine.com](https://erp.seojine.com/construction/cs2_01.aspx)).

### 6.5 Excel-macroprogramma's — de echte "marktleider" in volume

Niet te onderschatten: er bestaat een hele micromarkt van Koreaanse Excel-planningstools, deels gratis, deels tegen kleine bedragen:
- `예정공정표_엑셀프로그램 V43` — drie soorten planningstabellen, instelbare grafiekkleuren en lijnstijlen, automatisch opslaan ([kanghanet.tistory.com](https://kanghanet.tistory.com/entry/%EC%98%88%EC%A0%95%EA%B3%B5%EC%A0%95%ED%91%9C%EC%97%91%EC%85%80%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-V43), [kangha.blogspot.com](https://kangha.blogspot.com/2024/09/v43.html))
- Maand-/weekvarianten met handleiding ([architecture-estimate.com](https://architecture-estimate.com/3796))
- Uitleg van Gantt, CPM/PERT-netwerkanalyse en S-curve in Excel ([blog.naver.com/acoff](https://blog.naver.com/acoff/223746440286))
- Gratis CPM-netwerksjablonen in HWP/DOC/XLS ([freeforms.co.kr](http://www.freeforms.co.kr/view/544186C9-24E0-626.html))

*Voordelen:* nul kosten, iedereen kan het, past direct in de HWP/Excel-opleverketen, geen licentierisico.
*Nadelen:* geen echte netwerkberekening, geen kritiek pad dat automatisch herrekent, geen versiebeheer voor 변경공정표, foutgevoelig bij grote projecten, niet auditbaar bij claims.

**Dit is de werkelijke concurrent voor elke nieuwe toetreder in het Koreaanse MKB — niet P6.**

---

## 7. Praktijk: hoe men in Korea plant

Uit de Koreaanse vakgids ([tigerbeam](https://tigerbeam.co.kr/blog/construction-schedule-management-guide)) en de vergelijkingsblog ([we_buld](https://blog.naver.com/we_buld/224050487076)):

**Drie schematypen:**
1. **바차트 (bar chart / Gantt)** — in Excel, voor kleine projecten
2. **CPM 네트워크 (PDM)** — met Primavera P6 of MS Project, voor grote projecten waar het kritieke pad moet worden aangewezen
3. **LOB (반복작업형)** — Line of Balance voor repeterend werk (dit is precies waar Asta Powerproject zich in Korea op verkoopt)

**Zesstappen-werkwijze voor het opstellen van een `공정표`:** contractperiode vaststellen → mijlpalen bepalen → duur per activiteit berekenen → levertijden materiaal inpassen → onderaannemers afstemmen → indienen bij en goedkeuring krijgen van de opdrachtgever/toezichthouder.

**Praktijkinzicht over P6 uit Koreaanse vakliteratuur** ([brunch.co.kr/@onesaram/45](https://brunch.co.kr/@onesaram/45)): de auteur richt zich op projecten "van honderden miljarden tot biljoenen won" en behandelt als eerste twee vragen (1) negatieve Total Float — "계약된 완료일을 이미 지킬 수도 없는 상태" (de contractuele opleverdatum is al niet meer haalbaar), met crashing en fast-tracking als oplossing in plaats van data verschuiven; en (2) activity types, waarbij Task Dependent >90% van de activiteiten uitmaakt en LOE staat voor "지속적으로 발생하는 지원·관리 활동". Dit bevestigt dat het Koreaanse P6-gebruik technisch volwassen is — dit zijn geen beginnersvragen.

**Nuance over P6-versies** die in Korea verwarring geeft: "P6는 여전히 설치형(Professional)과 서버형(EPPM)으로 운영됩니다" — P6 draait nog steeds als Professional (lokaal geïnstalleerd) of EPPM (server), los van het aparte product Primavera Cloud ([we_buld](https://blog.naver.com/we_buld/224050487076)).

---

## 8. Implicaties en kansen

**[EIGEN ANALYSE — dit is mijn interpretatie, geen bronbewering.]**

1. **De IFC-hoek is uniek gunstig.** Korea is een van de weinige markten waar de overheidsrichtlijn het planningsdeliverable definieert als "IFC-model + 2D + 3D + planningsdata". Een planningstool die IFC als nátief formaat gebruikt in plaats van als export-add-on sluit direct aan op het 4D-CAD-공정관리 성과품-regime.

2. **Het gat zit in het midden.** Boven zit P6 (₩6,1 mln incl. 1 jr support, verplicht voor export). Onder zit Excel (gratis). Daartussen is bijna niets levends meer: EasyPEM is legacy, neoPLAN is legacy. De 전문건설-markt van **≈65.000–67.000 bedrijven** (⚠ gecorrigeerd — niet 83.320; dat KISCON-getal telt vrijwel zeker registraties, zie §2.1 en §11) wordt door niemand goed bediend met echte CPM.

3. **`.xer`-lezen is de toegangspoort.** Elke tool die de Koreaanse markt binnen wil, moet P6-bestanden kunnen importeren — niet om P6 te vervangen, maar om ernaast te kunnen bestaan. Dat blijkt uit het feit dat de succesvolle Koreaanse PMIS-leveranciers precies dat doen.

4. **Koreaans is niet optioneel.** Elke bron in dit onderzoek — inclusief de leveranciers die aan Samsung en Hyundai leveren — communiceert primair in het Koreaans. Een Engelstalige tool zonder Hangul-UI komt de binnenlandse markt niet in.

5. **HWP-compatibele export** (schone afbeelding/PDF/Excel die in een HWP-document past) is een harde eis voor publieke werken.

6. **Waardegebaseerde `공정률` en de 5%-afwijkingsregel** zijn Korea-specifieke functionaliteit die westerse tools standaard niet hebben.

7. **De piraterijdynamiek is een kans, geen bedreiging.** De handhaving richt zich op dure ontwerpsoftware; een legale gratis/goedkope tool neemt exact het risico weg waar Koreaanse MKB-bedrijven op worden aangesproken.

---

## 9. Bronnen

### Marktomvang en macro-economie
- [Spherical Insights — South Korea Project Portfolio Management Market](https://www.sphericalinsights.com/reports/south-korea-project-portfolio-management-market) — US$92,4 mln (2024) → US$594,3 mln (2035), CAGR 18,4%
- [Consegic — 프로젝트 포트폴리오 관리 시장](https://www.consegicbusinessintelligence.com/ko/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4-%EA%B4%80%EB%A6%AC-%EC%8B%9C%EC%9E%A5-2598) — wereldwijde PPM-markt
- [Fortune Business Insights — 건설 소프트웨어 시장](https://www.fortunebusinessinsights.com/ko/construction-software-market-110155)
- [Business Research Insights — Construction Software Market](https://www.businessresearchinsights.com/ko/market-reports/construction-software-market-120413)
- [Research Nester — 건설 소프트웨어 시장](https://www.researchnester.com/kr/reports/construction-software-market/3726)
- [PwC Korea — 스마트건설 기술](https://www.pwc.com/kr/ko/insights/industry-focus/smart-construction-tech.html)
- [RICON — 스마트건설 시장 분석](https://www.ricon.re.kr/board/view.php?no=5756)
- [CMPI/건설산업연구원 — 2025 건설경기 전망](https://data.cmpi.or.kr/program/issue/2412_2-6.pdf) — 건설투자 ₩295,3조, 건설수주 ₩210,4조
- [CERIK — 2025년 건설수주 전망](https://www.cerik.re.kr/report/briefing/2983) — ₩222,1조
- [건설경제 — 2040년 건설수주 전망](https://m.cennews.co.kr/news/articleView.html?idxno=24807)
- [뉴스핌 — 건설사 R&D 투자 2025](https://www.newspim.com/news/view/20260708001082) — ₩3.859억, −11,4%

### Buitenlandse bouworders (export-EPC)
- [연합뉴스 — 2024 해외건설 수주 371억 달러, 누적 1조 달러](https://www.yna.co.kr/view/MYH20250109022400641)
- [뉴시스 — 254개 기업, 101개국, 605건](https://www.newsis.com/view/NISX20250109_0003026318)
- [글로벌이코노믹 — 2015년 이후 최대치](https://www.g-enews.com/article/Real-Estate/2025/01/202501091106508081056c162803_1)
- [Finance Scope — 2025년 472억7000만달러 (약 68조원)](https://www.finance-scope.com/article/view/scp202601090009)
- [ANC뉴스 — 2025 해외수주 472.7억 달러](https://www.ancnews.kr/news/articleView.html?idxno=20057)
- [조선비즈 — 유럽 42.6%, 201.6억 달러](https://biz.chosun.com/real_estate/real_estate_general/2026/01/09/)

### Bouwsector-statistiek
- [KISCON — 건설업체 통계](https://www.kiscon.net/statistic/) — 종합 18.294 / 전문 83.320 (juni 2026)
- [국토교통부 통계누리](https://stat.molit.go.kr/portal/cate/statView.do)
- [건설산업정보센터 KCINET](https://www.kcinet.or.kr)
- [CEPIK — 건설기술인 100만 명 돌파](https://www.cepik.re.kr/trend/technique_view/661)

### Software, prijzen en leveranciers
- [소프트웨어카탈로그 — Primavera P6, 소비자가 ₩6.100.000 / 판매가 ₩5.700.000](https://softwarecatalog.co.kr/item/itemView?itemId=QSC841301)
- [Microsoft Korea — Project 가격](https://www.microsoft.com/ko-kr/microsoft-365/project/compare-microsoft-project-management-software) — Professional 2024 ₩1.769.999, Standard 2024 ₩1.069.999
- [Oracle Korea — Primavera P6](https://www.oracle.com/kr/construction-engineering/primavera-p6/)
- [prmyazilim — Primavera P6 pricing (juni 2025)](https://prmyazilim.com/en/primavera-p6-pricing) — internationale referentieprijzen
- [Taradigm — How much does Primavera P6 cost](https://www.taradigm.com/how-much-does-primavera-p6-cost/)
- [EasyPEM — 제품 및 가격](http://www.easypem.co.kr/product.htm) — Professional ₩1.500.000, Master ₩3.000.000
- [EasyPEM — 기능 소개](http://www.easypem.co.kr/easypem2.htm)
- [중고나라 — EasyPEM Pro 중고 판매 (₩165만 구매)](https://web.joongna.com/product/213445223)
- [ProjectWare 이용안내 — ₩110.000/월, neoPLAN·neoMAX 무료](http://w01.projectware.kr/site/Use.html)
- [pm1.kr — neoPLAN 소개](http://pm1.kr/Site/neoPLAN.html)
- [pm1.kr — neoPLAN 주요기능](http://pm1.kr/Site/npl-04.html)
- [한과박소프트 — 이전 제품 (ProjectWare, neoPLAN, neoMAX-3D)](http://www.hnpsoft.com/support/previous.html)
- [Tigerbeam — 요금제](https://tigerbeam.co.kr/pricing) — ₩9.000/gebruiker/maand
- [CaaS Works — 공정표](https://www.caas.works/services/gantt)
- [서진ERP — 건설 모듈 가격](https://erp.seojine.com/construction/cs2_01.aspx)
- [Basily — 국산 협업툴 비교 (Flow, Dooray, JANDI, 가격)](https://blog.basily.space/guksan-collaboration-tools-comparison)
- [뉴스에포크 — 잔디 vs 플로우 2025 성적표](https://newsepoch.co.kr/news/2026041700003)
- [네이버 블로그 — 국내 협업툴 시장 조사](https://m.blog.naver.com/thdwlsdn9901/222780672328)

### Marktpositie en vergelijkingen (Koreaanse vakbronnen)
- [한국pm — 공정관리 프로그램 종류 및 특징](https://hkpm.co.kr/%EA%B3%B5%EC%A0%95%EA%B4%80%EB%A6%AC-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EC%A2%85%EB%A5%98-%EB%B0%8F-%ED%8A%B9%EC%A7%95/) — **belangrijkste bron voor rangorde en het neoPLAN-oordeel**
- [we_buld — 공정관리 소프트웨어 선택 가이드: Primavera vs MS Project vs BIM 4D](https://blog.naver.com/we_buld/224050487076)
- [we_buld — MS Project와 Primavera 무엇이 다를까?](https://blog.naver.com/we_buld/224318079359)
- [brunch.co.kr/@onesaram — 프리마베라 P6 Q&A 베스트 10](https://brunch.co.kr/@onesaram/45)
- [한국PM Naver Premium — 프리마베라 P6 강의](https://contents.premium.naver.com/primavera/p6)
- [한국PM — P6 다운로드(구매) 및 설치 방법](https://contents.premium.naver.com/primavera/p6/contents/250423185257838dy)
- [한국PM — 네트워크 공정표 기초](https://contents.premium.naver.com/primavera/p6/contents/250409185500657lo)
- [blog.naver.com/kwango3894 — 공정표와 EOT/클레임 대응](https://blog.naver.com/kwango3894/224136360955)

### Resellers, PMIS en dienstverleners
- [P6ix SC](https://www.p6ix.co.kr) — Oracle Primavera partner, 330+ projecten sinds 2013
- [DT Solution — P6 EPPM](https://www.dtsolution.io/ko/services/software/p6) en [PMIS](https://www.dtsolution.io/ko/pmis)
- [Ideait — Primavera 제품](https://primavera.ideait.co.kr/?page_id=923)
- [엘엔엠케이 (LNMK) — Asta Powerproject](http://www.lnmk.co.kr/asta.html)
- [CPM Planner](https://cpmplanner.com/about/)
- [TEOS — Reliance.PMIS](https://teos.co.kr/solution/reliance-pmis/)
- [Human-Plus — SWP PMIS (P6 EPPM API 양방향 연동)](https://www.human-plus.co.kr/construction-pmis-swp)
- [CrossTeam Cloud PMIS](https://www.crossteam.co.kr)
- [서린 D&C — PMIS 구축](https://seorin.com)
- [한국CMC](https://hkcmc.co.kr)
- [One-PMIS 서울시 건설정보관리시스템](https://pmis.eseoul.go.kr)
- [Samsung SDS — ERP](https://www.samsungsds.com/kr/erp/erp.html)
- [더존 — ERP](https://www.douzone.com/solution/erp.jsp)

### BIM, 4D en in-house systemen
- [국토교통부 보도자료 — 건설산업 BIM 기본지침](https://www.molit.go.kr/USR/NEWS/m_71/dtl.jsp?id=95084979)
- [국토교통부 — 건설산업 BIM 시행지침](https://www.molit.go.kr/USR/policyData/m_34681/dtl.jsp?id=4634)
- [조달청 — 시설사업 BIM 적용지침서 v2.1](https://www.pps.go.kr/kor/bbs/view.do?bbsSn=2212280034&key=00324)
- [연합뉴스 — 1천억 이상 공공공사 BIM 도입](https://www.yna.co.kr/view/AKR20230609128900003)
- [건설라이브러리 — BIM 의무화 로드맵 2026년 500억 이상](https://buildlibrary.co.kr/bim-%EC%9D%98%EB%AC%B4%ED%99%94-%EB%A1%9C%EB%93%9C%EB%A7%B5-2026%EB%85%84-500%EC%96%B5-%EC%9D%B4%EC%83%81-%EA%B3%B5%EC%82%AC-%EC%A0%81%EC%9A%A9-%EA%B8%B0%EC%A4%80-%EC%B4%9D%EC%A0%95%EB%A6%AC/)
- [Autodesk Korea — BIM 의무화](https://www.autodesk.com/kr/campaigns/bim-mandate)
- [대한경제 — 공공공사 BIM 발주 3년째 증가](https://www.dnews.co.kr/uhtml/view.jsp?idxno=202510161720421880021)
- [KoreaScience — 4D CAD 기반 공정관리 성과품 (IFC)](https://koreascience.or.kr/article/JAKO202429153279722.pdf)
- [현대건설 — 스마트 공사관리 플랫폼 SCMP](https://www.hdec.kr/kr/newsroom/news_view.aspx?NewsSeq=277)
- [삼성물산 건설부문 뉴스룸](https://news.samsungcnt.com/ko/)
- [삼성물산 — 스마트기술](https://www.secc.co.kr/ko/library/tech/smart)
- [고려소프트웨어 — UniKBIM](http://www.koryosoft.co.kr)
- [A.nD Plus — 4D 공정 시뮬레이션](http://andplus.co.kr/service/4d_process_simulation.html)
- [BASISSOFT](http://www.basis.co.kr)
- [대한경제 — 창소프트아이앤아이 빌더허브](https://www.dnews.co.kr/uhtml/view.jsp?idxno=202307180215351440694)

### Regelgeving en praktijk
- [건설기술진흥법 (법제처)](https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EA%B1%B4%EC%84%A4%EA%B8%B0%EC%88%A0%EC%A7%84%ED%9D%A5%EB%B2%95)
- [건설기술진흥법 시행규칙](https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EA%B1%B4%EC%84%A4%EA%B8%B0%EC%88%A0%EC%A7%84%ED%9D%A5%EB%B2%95%EC%8B%9C%ED%96%89%EA%B7%9C%EC%B9%99)
- [Tigerbeam — 공정표 작성부터 공정률 관리까지 (KCS, 건진법 제35조, 5% 규칙)](https://tigerbeam.co.kr/blog/construction-schedule-management-guide)
- [blog.naver.com/ksupt — 건진법 공정관리 규정과 실무](https://m.blog.naver.com/ksupt/223260086885)
- [나라장터 종합쇼핑몰](https://shop.g2b.go.kr) / [디지털서비스몰](https://digitalmall.g2b.go.kr)
- [준공도서 제출시스템](https://uics.jiha.go.kr)
- [한컴 — 공공 한글 민원 문서 에디터](https://online.hancom.co.kr)
- [freeforms.co.kr — 준공 공문 서식 (HWP/DOC)](http://www.freeforms.co.kr/view/463DC34D-8B8A-1499.html)
- [freeforms.co.kr — CPM 공정표(네트워크) 서식](http://www.freeforms.co.kr/view/544186C9-24E0-626.html)

### Piraterij en handhaving
- [디지털데일리 — 한국소프트웨어저작권협회 2025년 불법복제 SW 제보 856건](https://www.ddaily.co.kr/page/view/2026020410395955839)
- [cncjr.tistory.com — 2025년 불법복제 소프트웨어 제보 통계](https://cncjr.tistory.com/431)
- [전자신문 — 국내 SW 불법 복제율 수년째 20% 후반](https://www.etnews.com/20240201000251)

### Training
- [KPC — 프로젝트 통합관리를 위한 Primavera P6 & PRA (₩850.000)](https://www.kpc.or.kr/PTWED003_dtil_view.do?ecno=45361&cono=143140)
- [현대건설 기술교육원 (무료 + 훈련장려금)](https://edu.hdec.co.kr)
- [건설기술교육원 KICTE](https://www.kicte.or.kr)
- [P3EC — Primavera Course](http://www.p3ec.com/kr/edu/primavera.htm)
- [Airklass — Primavera P6 사용자 가이드 기본 과정](https://www.airklass.com/app/klass/8870)
- [Kmong — P6 공정표 작성 대행](https://kmong.com/gig/305044)

### Excel-praktijk en MKB-tools
- [architecture-estimate.com — 예정공정표 엑셀 프로그램](https://architecture-estimate.com/3796)
- [kanghanet.tistory.com — 예정공정표_엑셀프로그램 V43](https://kanghanet.tistory.com/entry/%EC%98%88%EC%A0%95%EA%B3%B5%EC%A0%95%ED%91%9C%EC%97%91%EC%85%80%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-V43)
- [kangha.blogspot.com — V43](https://kangha.blogspot.com/2024/09/v43.html)
- [blog.naver.com/acoff — 예정 공정표 엑셀프로그램 완벽 해설](https://blog.naver.com/acoff/223746440286)
- [bbang-1.tistory.com — 건설 공정표 작성 가이드](https://bbang-1.tistory.com/34)

### Contech en startups
- [더스탁 — 콘테크 스타트업 VC 투자](https://www.the-stock.kr/news/articleView.html?idxno=20489)
- [대한경제 — 글로벌 스타트업 콘테크 투자](https://www.dnews.co.kr/m_home/view.jsp?idxno=202607101551211460729)
- [한경 매거진 — 업사이트 (AI 건설 공정·품질관리)](https://magazine.hankyung.com/job-joy/article/202411252993d)
- [건설이야기 — 팀워크 AI Agent 'ponder'](https://www.conslove.co.kr/news/articleView.html?idxno=86027)
- [dfinite.ai — 건설 AI 적용 사례 (현대건설, 삼성물산, DL이앤씨)](https://blog.dfinite.ai/construction-ai-case-studies)
- [메이사 (Meissa) — 건설 현장 관리](https://www.meissa.ai/kr/cons/management)
- [넥스트유니콘 — 콘테크 스타트업 파인더](https://www.nextunicorn.kr/finder/theme/contech)

### Academisch
- [KISTI ScienceON — 국내 건설현장 공정관리 현황 실태 조사 (한국건설관리학회, 2008)](https://scienceon.kisti.re.kr/srch/selectPORSrchArticle.do?cn=NPAP08388116)
- [KISTI ScienceON — 공정관리 소프트웨어 활용성 향상을 위한 스케줄링 지원 프로그램](https://scienceon.kisti.re.kr/srch/selectPORSrchArticle.do?cn=JAKO201001660923809)

---

## 10. Beperkingen van dit onderzoek

Eerlijkheidshalve, zodat de lezer weet wat hij in handen heeft. *(Zie ook §11 — Verificatie, waarin een tweede onderzoeker de kernbeweringen adversarieel heeft nagetrokken en op zes punten heeft gecorrigeerd.)*

1. **Het WebSearch-budget van deze sessie was bij aanvang al uitgeput.** Al het onderzoek is uitgevoerd via WebFetch tegen DuckDuckGo-lite als zoekproxy en via `r.jina.ai` voor Koreaanse sites die directe fetches blokkeren. Dat werkt, maar geeft minder resultaten per zoekopdracht dan een echte zoek-API en DuckDuckGo heeft tijdens de sessie tweemaal met een CAPTCHA geblokkeerd. Er is in totaal ongeveer 30 keer gezocht/opgehaald, waarvan het merendeel in het Koreaans.
2. **Naver-zoekresultaten waren niet toegankelijk** (`search.naver.com` wordt geblokkeerd). Omdat Naver in Korea de dominante zoekmachine is, mis ik daardoor vrijwel zeker Koreaanse blog- en cafécontent die alleen via Naver vindbaar is. De Naver-blogs die ik wél heb gelezen, kwamen via DuckDuckGo-indexering en r.jina.ai.
3. **Geen enkele Koreaanse PMIS-leverancier publiceert prijzen.** De cijfers in §2.4 voor die categorie zijn daarom volledig een eigen schatting.
4. **Het aantal planners (§2.3) is nergens officieel geteld.** Mijn bandbreedtes zijn afgeleid van EPC-vuistregels en bedrijfsaantallen, niet van een Koreaanse bron.
5. **De marktomvang in §2.4 is mijn eigen constructie.** De enige externe Korea-specifieke softwareanker is het Spherical Insights-cijfer van US$92,4 mln (2024) voor PPM over álle sectoren; de bouwuitsplitsing is van mij. ⚠ *Bij verificatie bijgesteld:* er blijken **minstens zes** bureaus een Korea-specifiek PPM-cijfer te publiceren, met een spreiding van US$90,8 mln tot US$195,9 mln voor hetzelfde basisjaar — zie §2.2 en §11. Bovendien houdt de top-down "sanity-check" in §2.4 geen stand (circulair); zie §11, bewering 3.
6. **Claims over AI-resultaten bij grote aannemers** (90% tijdsreductie, 30% kostenreductie) komen uit een leveranciersblog en zijn niet onafhankelijk geverifieerd.
7. **Voor TILOS, Safran, Deltek, InEight, Nodes & Links, Spider Project, RIB Candy en ALICE** heb ik geen Koreaanse distributeur of gebruikersbewijs kunnen vinden. Afwezigheid van bewijs is hier geen bewijs van afwezigheid, maar het is wel een sterke aanwijzing dat hun Koreaanse voetafdruk verwaarloosbaar is.

---

## 11. Verificatie

*Adversariële fact-check, uitgevoerd 25 juli 2026 door een tweede onderzoeker met als opdracht de kernbeweringen actief te **weerleggen**, waar mogelijk met andere bronnen dan de oorspronkelijk gebruikte en in het Koreaans. Methode: 10 falsifieerbare kernbeweringen geselecteerd (marktomvang en redenering, prijzen, marktleiderschap, overheidsmandaten, lokale pakketten), elk nagerekend en tegen onafhankelijke bronnen gehouden. Alle bedragen zijn opnieuw doorgerekend.*

**Beperking van deze verificatieronde:** het WebSearch-budget van de sessie was uitgeput; alle controles zijn uitgevoerd via directe WebFetch op bronpagina's en via DuckDuckGo-lite/Bing als zoekproxy. Enkele pagina's (Spherical Insights, KISCON, projectware.kr) gaven HTTP 503 en zijn indirect geverifieerd.

### Samenvattend oordeel

| # | Bewering | Oordeel |
|---|---|---|
| 1 | Spherical Insights: PPM Korea US$92,4 mln (2024) → US$594,3 mln (2035), 18,4% CAGR | **bevestigd**, maar context toegevoegd |
| 2 | Extrapolatie naar US$129,5 mln (2026) | **bevestigd** (rekenkundig én extern) |
| 3 | Bouwraming US$25–40 mln licenties; top-down sanity-check op 25–30% "bevestigt" de bottom-up | **gecorrigeerd** — check is circulair |
| 4 | P6-prijs Korea ₩6,1/5,7 mln; "geen koopkrachtkorting, Koreaanse prijs boven wereldprijs" | **gecorrigeerd** — conclusie omgedraaid |
| 5 | Primavera Cloud US$305/gebr./mnd, min. 25 gebruikers = US$91.500/jr | **onzeker** — enkelvoudige bron |
| 6 | MS Project 2024 Korea: ₩1.769.999 / ₩1.069.999 | **bevestigd** |
| 7 | EasyPEM ₩1,5 mln / ₩3,0 mln / 12.000 CNY | **bevestigd** |
| 8 | neoPLAN/ProjectWare ₩110.000/mnd, neoPLAN gratis, ≈65% van P6 over 3 jaar | **gecorrigeerd** — tariefstructuur en vergelijkingsbasis |
| 9 | BIM-mandaat: 2024 ≥₩100 mrd, 2025/2026 ≥₩50 mrd, 2030 alles | **gecorrigeerd** — jaren fout, 2028-stap ontbrak |
| 10 | 101.614 bouwbedrijven (18.294 + 83.320) | **gecorrigeerd** — dubbeltelling |
| 11 | Buitenlandse bouworders US$47,27 mrd (2025), +27%, hoogste sinds 2014 | **bevestigd** |
| 12 | Piraterij: 856 meldingen 2025, ₩9,3 mrd, CAD/CAM #2 met 197 zaken | **bevestigd** |
| 13 | 1.000.000 건설기술인 (mei 2024) | **gecorrigeerd** — datum |
| 14 | P6 is onbetwiste #1 / MS Project marginaal in Koreaanse bouw | **onzeker** — één belanghebbende bron |

---

### Bewering 1 — Spherical Insights PPM-cijfer: **bevestigd, met belangrijke context**

De cijfers zijn correct geciteerd (US$92,4 mln 2024 → US$594,3 mln 2035, 18,4% CAGR) en **intern consistent**: (594,3/92,4)^(1/11) − 1 = **18,44%**. De brontpagina zelf gaf HTTP 503, maar de cijfers zijn bevestigd via onafhankelijke aggregatie van marktonderzoeksresultaten.

**Wat niet klopte aan de framing:** het rapport presenteert dit als "hard anker". Dat is het niet. Vijf andere bureaus rapporteren dezelfde markt anders: Decisions Advisors US$90,8 mln, Grand View Research US$95,8 mln, Research and Markets US$95,8 mln, Precedence Research US$110,53 mln (2025), en **MarketsandMarkets US$195,9 mln — ruim 2× het Spherical-cijfer**. Spherical zit aan de onderkant van de spreiding. Toegevoegd als vergelijkingstabel in §2.2.
Bron: [Spherical Insights](https://www.sphericalinsights.com/reports/south-korea-project-portfolio-management-market) · [MarketsandMarkets / Precedence / Grand View — via zoekaggregatie](https://lite.duckduckgo.com/lite/?q=Spherical+Insights+South+Korea+Project+Portfolio+Management+Market+size+2024+2035)

### Bewering 2 — extrapolatie naar US$129,5 mln (2026): **bevestigd**

Nagerekend: 92,4 × 1,184² = **129,53**. Correct. Bovendien **onafhankelijk gecorroboreerd**: Precedence Research geeft US$110,53 mln voor 2025 bij ~18% CAGR → US$130,4 mln voor 2026, vrijwel identiek. Dit is het best onderbouwde cijfer in het hele rapport. Wel geldt de spreiding uit bewering 1: over alle bureaus loopt 2026 van ≈US$127 mln tot ≈US$265 mln.
Bron: zie bewering 1.

### Bewering 3 — de eigen bouwraming en haar "sanity-check": **gecorrigeerd**

De rekensommen kloppen (25–30% × 129,5 = 32,4–38,9), maar **de sanity-check bewijst niets**:

- **Circulair.** Het aandeel 25–30% is een vrij gekozen parameter zonder bron. Gerichte controle: **er bestaat geen openbaar gepubliceerde verticale uitsplitsing van de PPM-markt.** Blueweave en Adroit noemen "Construction" als segment maar publiceren geen percentages. Bij 12–15% zou de top-down op US$15,5–19,4 mln uitkomen, ruim onder de bottom-up-band. De "bevestiging" volgt volledig uit de parameterkeuze.
- **Non-sequitur.** "IT & telecom is de grootste verticale" pleit *tegen* een bouwaandeel van 25–30%, niet ervóór.
- **Scopeconflict.** ~40% van de bottom-up (PMIS-licenties US$8–12 mln + bouw-SaaS US$3–5 mln) valt buiten de definitie van de syndicated PPM-rapporten (genoemde spelers: Microsoft, Oracle, SAP, ServiceNow, Planview). De twee getallen meten niet hetzelfde.
- **Rekenkundig:** de componentbanden sommeren tot US$22,5–42 mln, niet US$25–40 mln; het brede totaal tot US$68–130 mln, gepresenteerd als US$70–130 mln.
- **Interne tegenspraak:** de aanname van 20.000–35.000 MS Project-seats in bouw/engineering is onverenigbaar met §2.3 (3.500–6.500 "echte CPM-planners" in totaal; de 60.000–120.000 Excel-gebruikers "raken nooit een CPM-tool aan") én met §3.2 ("MS Project marginaal in de bouw"). Daarbovenop claimt de P6-regel al 3.500–6.000 seats.

De orde van grootte blijft verdedigbaar; de claim "de twee methodes bevestigen elkaar" is geschrapt. Reële onzekerheid: grofweg US$15–50 mln.
Bron: [Blueweave PPM-segmentatie](https://www.blueweaveconsulting.com/report/project-portfolio-management-market) · [Adroit PPM](https://www.adroitmarketresearch.com/industry-reports/project-portfolio-management-market)

### Bewering 4 — P6-prijs en "geen lokale koopkrachtkorting": **gecorrigeerd — de conclusie draait om**

De prijzen zelf kloppen: de Koreaanse catalogus geeft **소비자가 ₩6.100.000 / 판매가 ₩5.700.000** (= US$4.122 / US$3.851 @₩1.480; nagerekend, correct).

**Maar de vergelijking was ongeldig.** De catalogusregel luidt voluit **"PPM Oracle Premier Support 1년 포함, Version 18"** en **부가세 별도** — dus **inclusief het eerste jaar support** en **exclusief btw**. De internationale referentie van US$3.880 is juist *exclusief* support (+US$854 eerstejaars). Like-for-like:

- Internationaal, licentie + 1 jr support: **US$4.734**
- Korea 판매가 (ex btw): **US$3.851** → **≈19% goedkoper**
- Korea 소비자가 (ex btw): **US$4.122** → **≈13% goedkoper**

Op dezelfde catalogus­pagina staat bovendien een licentie-alleen-regel **"Professional Project Management ₩3.200.000"** (btw inbegrepen) = ₩2,91 mln ex btw ≈ **US$1.966**, ruwweg de helft van de internationale US$3.880; en een supportvernieuwing van ₩748.000, wat bij 22% onderhoud een onderliggende licentie van ~₩3,4 mln (≈US$2.300) impliceert.

Ook de zinsnede *"Reken je btw (10% VAT) mee"* was in de verkeerde richting toegepast: de prijs is al btw-exclusief.

**De conclusie "Oracle voert in Korea geen koopkrachtcorrectie / Koreaanse prijs ligt boven de wereldprijs" is niet houdbaar** en is in §4.2 vervangen. Kanttekening: de catalogus is een resellerlijst met inconsistente SKU's (v17.9 naast v18), en de "internationale referentie" is zelf een Turkse resellerpagina — Oracle's eigen lijstprijs was niet verifieerbaar. Wat overeind blijft: P6 is in absolute zin duur voor het Koreaanse bouw-MKB.
Bron: [softwarecatalog.co.kr QSC841301](https://softwarecatalog.co.kr/item/itemView?itemId=QSC841301) (rechtstreeks opgehaald, alle prijsregels uitgelezen) · [prmyazilim P6 pricing, juni 2025](https://prmyazilim.com/en/primavera-p6-pricing)

### Bewering 5 — Primavera Cloud US$305/gebruiker/maand, min. 25 gebruikers: **onzeker**

De rekensommen kloppen (305 × 25 × 12 = US$91.500; × ₩1.480 = ₩135,4 mln). **De invoer niet te bevestigen.** Het cijfer komt van één bron — dezelfde Turkse resellerpagina die ook de P6-referentieprijs levert. Gerichte controle leverde **geen enkele onafhankelijke bevestiging** van US$305 of van het 25-gebruikersminimum; Oracle publiceert geen openbare Primavera-Cloud-prijs. Bovendien is het geen Koreaans cijfer, terwijl het rapport er de kop "Cloud is duur **in Korea**" en de conclusie "onbetaalbaar voor alles behalve de top-20 aannemers" op baseert. Gemarkeerd als onbewezen in §4.1 en §4.2.
Bron: [prmyazilim](https://prmyazilim.com/en/primavera-p6-pricing) (enige vindplaats) · negatieve controle: [Bing-zoekopdracht op "$305" + "25 users"](https://www.bing.com/search?q=%22Primavera+Cloud%22+%22%24305%22+per+user+per+month+minimum+25+users)

### Bewering 6 — MS Project 2024 Koreaanse prijzen: **bevestigd**

Rechtstreeks bij Microsoft Korea opgehaald: **Project Professional 2024 ₩1.769.999** en **Project Standard 2024 ₩1.069.999**, beide eenmalige aankoop; Project Server alleen via partner. USD-omrekening nagerekend: US$1.196 en US$723 @₩1.480 — correct.
Bron: [microsoft.com/ko-kr](https://www.microsoft.com/ko-kr/microsoft-365/project/compare-microsoft-project-management-software)

### Bewering 7 — EasyPEM-prijzen: **bevestigd**

Rechtstreeks bij de leverancier opgehaald: **Pro ₩1.500.000** (50 sjablonen, 9 modules), **Master ₩3.000.000** (150 sjablonen, 19 modules), **China 12.000 ￥** (50 sjablonen, 9 modules). Omrekening US$1.014 / US$2.027 nagerekend, correct. Eén kleine afwijking: de leverancier noemt de instapeditie **"Pro"**, het rapport schrijft "Professional". De China-editie heeft 50 sjablonen/9 modules (gelijk aan Pro), wat het rapport niet vermeldde. Geen btw-informatie op de pagina.
Bron: [easypem.co.kr/product.htm](http://www.easypem.co.kr/product.htm)

### Bewering 8 — neoPLAN/ProjectWare ₩110.000/maand en de 65%-vergelijking: **gecorrigeerd**

Bevestigd: neoPLAN is **legacy** en wordt **gratis meegeleverd** aan ProjectWare-abonnees ("프로젝트웨어 사용자는 회원 가입하시면 'neoPLAN' 무료로 이용하실 수 있습니다"); de leverancier ㈜한과박소프트 bouwde neoPLAN vanaf 1999 en verlegde de focus in 2006 naar ProjectWare. Ook bevestigd: betaling via bankoverschrijving, wat de indruk van legacy-distributie ondersteunt.

**Gecorrigeerd op drie punten:**
1. ₩110.000/maand is **niet het enige tarief**. Er circuleert daarnaast "표준형 1인 월 2.000원부터" (per gebruiker vanaf ₩2.000/maand) én een lopende **"신규 고객 50% 할인"**. ₩110.000 is een bundelbasistarief, geen vaste prijs.
2. De uitspraak "~65% van een P6-licentie **zónder support**" is fout: ₩6,1 mln is juist **inclusief** een jaar support (zie bewering 4).
3. De vergelijking mengt btw-inclusief (₩110.000) met btw-exclusief (₩6,1 mln). Zuiver ex btw: ₩100.000 × 36 = ₩3,6 mln / ₩6,1 mln = **59%**, niet 65% — en met de introductiekorting aanzienlijk minder.

De rekensom 110.000 × 36 = ₩3.960.000 en 3,96/6,1 = 64,9% is op zichzelf correct; alleen de grondslag deugde niet.
Bron: [projectware.kr Use.html](http://w01.projectware.kr/site/Use.html) (503 bij directe fetch) · [tariefvarianten en neoPLAN-bundeling via Koreaanse zoekresultaten](https://lite.duckduckgo.com/lite/?q=projectware.kr+%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%9B%A8%EC%96%B4+%EC%9A%94%EA%B8%88+%EC%95%88%EB%82%B4+%ED%91%9C%EC%A4%80%ED%98%95+%EA%B8%B0%EB%B3%B8%EC%9A%94%EA%B8%88)

*(Niet weerlegd, maar wel te noteren:* de claim **"10년 이상 1,000여 현장에서 검증된"** is een **marketingtekst van de leverancier zelf**, staat alleen op pm1.kr, en is nergens onafhankelijk bevestigd. Het rapport citeert hem al met bronvermelding, maar hij verdient de status "leveranciersclaim", niet "installed base".)*

### Bewering 9 — BIM-mandaat drempels en jaren: **gecorrigeerd**

Drie onafhankelijke Koreaanse bronnen geven eensluidend een ander schema dan het rapport had:

> "2026년에는 500억원 이상의 모든 공공공사에 적용하고, 2028년 300억원 이상 공공공사, 2030년 300억원 미만의 공공공사로 단계적으로 확대될 예정이다"

Correcties: de ₩100 mrd-drempel (1.000억원) startte **2023**, niet 2024 — 2024 was de *uitbreiding* naar SOC-werken; de ₩50 mrd-drempel (500억원) geldt **2026**, niet "2025/2026"; en **de tussenstap van 2028 (₩30 mrd / 300억원) ontbrak volledig**. De 2030-einddoelstelling ("alle publieke werken") is correct. Tabel in §5.2 en samenvatting in §1 zijn bijgewerkt. *De 연합뉴스-bron kon niet rechtstreeks worden opgehaald (fetch geblokkeerd); de correctie steunt op drie andere Koreaanse bronnen.*
Bron: [allbim.kr](https://allbim.kr) · [DEC](https://info.dec-w.com/114) · [kmecnews.co.kr](https://www.kmecnews.co.kr) — via [Koreaanse zoekaggregatie](https://lite.duckduckgo.com/lite/?q=%EA%B1%B4%EC%84%A4%EC%82%B0%EC%97%85+BIM+%EC%8B%9C%ED%96%89%EC%A7%80%EC%B9%A8+%EB%A1%9C%EB%93%9C%EB%A7%B5+2023%EB%85%84+1000%EC%96%B5+2025%EB%85%84+500%EC%96%B5+2028%EB%85%84+300%EC%96%B5)

### Bewering 10 — 101.614 geregistreerde bouwbedrijven: **gecorrigeerd (dubbeltelling)**

Het KISCON-getal is correct geciteerd (종합 18.294 / 전문 83.320, juni 2026, "개사") en optelling klopt. **Maar het is vrijwel zeker geen telling van unieke bedrijven:**

- Het **국토교통 통계누리** toont voor **dezelfde maand** 종합 18.294 maar 전문 **67.454** — een gat van bijna 16.000.
- Het 건설산업정보센터 (KCINET) meldde voor Q1-2025: **"전문건설업체는 65.207개"** tegenover **"건설업종 등록수는 총 133.841건"** — expliciet bewijs dat één bedrijf meerdere 업종-registraties houdt.
- MOLIT geeft voor 2025 66.368 전문-bedrijven.

Conclusie: 83.320 is een registratie-/업종-telling, geen bedrijfstelling. Het realistische totaal is **≈85.700 bedrijven** (18.294 + ~67.000), niet 101.614. Dit raakt ook §2.3 (basis voor de planner-raming) en §8 punt 2, dat "de 전문건설-markt van 83.320 bedrijven" als doelgroep noemt — beide bijgewerkt.
Bron: [stat.molit.go.kr](https://stat.molit.go.kr/portal/cate/statView.do) · [KCINET](https://www.kcinet.or.kr) · [KISCON](https://www.kiscon.net/statistic/) (503 bij directe fetch, indirect geverifieerd)

### Bewering 11 — buitenlandse bouworders US$47,27 mrd (2025): **bevestigd**

Bevestigd door het 국토교통부 via meerdere kanalen: US$47,27 mrd in 2025, hoogste in **11 jaar** (dus hoogste sinds 2014, toen US$66 mrd), en het eerste jaar sinds 2015 boven US$40 mrd; Europa 42,6% van het totaal, mede door het Tsjechische kerncentraleproject. Het 2024-cijfer van US$37,11 mrd is eveneens bevestigd ("총 371억1143만" dollar), net als het cumulatieve US$1 bln-record ("59년 만에 1조 달러를 돌파"). Groei nagerekend: 47,27/37,11 = **+27,4%** — het rapport zegt +27%, correct. Europa-bedrag nagerekend: 47,27 × 0,426 = US$20,14 mrd ≈ de genoemde US$20,16 mrd, correct.
Bron: [datanews.co.kr](https://www.datanews.co.kr/news/article.html?no=136626) · [머니투데이](https://www.mt.co.kr/opinion/2025/11/26/2025112510240639309) · [Finance Scope](https://www.finance-scope.com/article/view/scp202601090009)

### Bewering 12 — piraterijcijfers 2025: **bevestigd**

Rechtstreeks bij de bron gecontroleerd, alle details kloppen: **856 meldingen in 2025** (tegen **1.237 in 2024**), **≈₩9,3 mrd** geschatte schade over **137** inbreukmakende titels, en de categorierangorde **1. kantoorsoftware 293 zaken, 2. CAD/CAM-ontwerpsoftware 197 zaken, 3. OS en grafische software**. Ook het citaat van voorzitter 유병한 is letterlijk correct: *"불법 SW 침해는 특정 업종과 고가 설계 SW 환경에 집중되는 경향이 있다"*. Omrekening ₩9,3 mrd = US$6,3 mln @₩1.480 nagerekend, correct.
Bron: [디지털데일리](https://www.ddaily.co.kr/page/view/2026020410395955839)

### Bewering 13 — 1.000.000 건설기술인: **gecorrigeerd (datum)**

De mijlpaal en de uitsplitsing kloppen (건축 380.235 / 토목 329.073 / 기계 103.364, plus 40.000+ 안전관리), maar de datum is **11 april 2024**, niet "mei 2024". De vereniging bereikte de grens 37 jaar na oprichting in 1987. Tabel in §2.1 bijgewerkt.
Bron: [CEPIK / 한국건설기술인협회](https://www.cepik.re.kr/trend/technique_view/661) — via [Koreaanse zoekaggregatie](https://lite.duckduckgo.com/lite/?q=%EA%B1%B4%EC%84%A4%EA%B8%B0%EC%88%A0%EC%9D%B8+100%EB%A7%8C%EB%AA%85+%EB%8F%8C%ED%8C%8C+%ED%95%9C%EA%B5%AD%EA%B1%B4%EC%84%A4%EA%B8%B0%EC%88%A0%EC%9D%B8%ED%98%91%ED%9A%8C)

### Bewering 14 — P6 onbetwiste #1, MS Project marginaal, neoPLAN onderaan: **onzeker**

De citaten op hkpm.co.kr zijn **letterlijk geverifieerd en correct weergegeven** (met één kleine afwijking: het rapport citeert "국내에서는 거의 사용되지 않습니다", de bron schrijft "국내에서는 거의 사용되지 않는 Tool입니다"). De bron bevestigt ook het neoPLAN-oordeel: *"해외에서 많이 사용하지 않아, 국내에서도 사용 빈도가 낮은 편입니다"*.

**Het probleem is niet de weergave maar de bronbasis.** Dit rapport leunt voor drie kernbeweringen over marktleiderschap — P6-dominantie, MS Project-marginaliteit, neoPLAN-irrelevantie — op **één Koreaanse blog**, en dat is een belanghebbende partij: 한국PM monetariseert P6-content via een betaalde Naver-Premium-collegereeks en wordt in §5.6 van dit rapport zelf als "Training/consulting + contentkanaal" gerubriceerd. Ik heb geen tweede onafhankelijke Koreaanse bron gevonden die de rangorde bevestigt of weerlegt, en geen Koreaanse marktaandeelcijfers per pakket. De richting is plausibel (P6-dominantie in EPC is wereldwijd goed gedocumenteerd), maar de specifieke Koreaanse rangorde in §3.1/§3.2 blijft **niet vastgesteld**. Bronkritiek toegevoegd in §3.2.
Bron: [hkpm.co.kr](https://hkpm.co.kr/%EA%B3%B5%EC%A0%95%EA%B4%80%EB%A6%AC-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EC%A2%85%EB%A5%98-%EB%B0%8F-%ED%8A%B9%EC%A7%95/) (rechtstreeks opgehaald en integraal gecontroleerd)

---

### Overige rekencontroles (allemaal correct bevonden)

Alle valuta-omrekeningen @₩1.480 zijn nagerekend en kloppen: ₩6,1 mln→US$4.122 · ₩5,7 mln→US$3.851 · ₩1.769.999→US$1.196 · ₩1.069.999→US$723 · ₩1,5 mln→US$1.014 · ₩3,0 mln→US$2.027 · ₩110.000→US$74/mnd en US$892/jr · ₩9.000→US$6,08 · ₩8.000→US$5,41 · ₩850.000→US$574 · ₩295,3 bln→US$199,5 mrd · ₩210,4 bln→US$142 mrd · ₩222,1 bln→US$150 mrd · ₩9,3 mrd→US$6,3 mln · ₩385,9 mrd→US$261 mln · ₩957,3 mrd→US$647 mln · US$91.500→₩135 mln.

**Twee kleine inconsistenties met de eigen koersconventie**, beide toe te schrijven aan de bron en niet materieel: (a) Hanmi Global ₩325,9 mrd → US$244,8 mln impliceert ₩1.331/US$ (de 2023-koers), niet ₩1.480; (b) US$47,27 mrd ≈ ₩68 bln impliceert ₩1.438/US$ — dat is het cijfer zoals het 국토교통부 het zelf publiceerde.

**Kleine afrondingen in §2.3:** de EPC-planner­afleiding US$110–140 mrd ÷ US$40–70 mln geeft strikt 1.571–3.500 (rapport: 1.800–3.400, binnen bereik); Laag A sommeert tot 3.300–6.400 (rapport: 3.500–6.500). De "≈5% echte planners" is een middenwaarde — de volledige band is 2,9–10,8%.

**Niet geverifieerd (buiten scope van deze ronde):** de CaaS Works-claim "4.200개 건설 현장", de P6ix-claim "330+ projecten in 13 jaar", de Elecosoft-claim ">60.000 gebruikers wereldwijd", de KPC-cursusprijs van ₩850.000, en de Hanmi Global ENR #8-positie. Alle vijf zijn leveranciers-/aanbiedersclaims uit één bron.
