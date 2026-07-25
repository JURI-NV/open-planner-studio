# Marktonderzoek: projectplanning-/schedulingsoftware in China (Oost-Azië)

**Datum onderzoek:** 25 juli 2026
**Regio:** Volksrepubliek China (vasteland; Hongkong/Macau/Taiwan expliciet buiten scope)
**Werkwisselkoers:** USD 1 = CNY 7,15 (gemiddelde 2024–2025). Alle omrekeningen in dit rapport gebruiken deze koers, tenzij de bron zelf al een USD-bedrag geeft.
**Talen waarin gezocht is:** Chinees (vereenvoudigd) en Engels.

> **Leeswijzer bij betrouwbaarheid.** Elk cijfer heeft een bron-URL. Waar ik zelf reken of extrapoleer staat er **[EIGEN SCHATTING]** met de redenering erbij. Waar een bron commercieel/marketing-achtig is (Chinese content-farms, SEO-blogs van leveranciers) staat er **[ZWAKKE BRON]**. Chinese overheidsbronnen, beursverslagen en rechterlijke uitspraken zijn als sterk behandeld.
>
> **⚠ Dit rapport is nadien adversarieel gefact-checkt — zie [§ Verificatie](#verificatie) onderaan.** Belangrijkste uitkomsten: de headline-marktomvang is naar beneden bijgesteld (van CNY 1,5–3,0 mrd naar **CNY 0,8–2,0 mrd**), het 0,08 %-anker bleek van 2021–2022 te stammen en intern inconsistent, en één feitelijke fout over 梦龙 is gecorrigeerd (Glodon heeft het bedrijf in 2010 overgenomen, niet "een opvolger gebouwd"). Waar de hoofdtekst en de verificatiesectie botsen, geldt de verificatiesectie.

---

## 1. Samenvatting

China is met afstand de grootste bouwmarkt ter wereld — CNY 32,65 biljoen (≈ USD 4,57 biljoen) bruto bouwproductie in 2024 — maar besteedt daaraan verhoudingsgewijs het minste aan software van alle grote bouwmarkten: **0,08 % van de bouwproductie tegen ~1 % in West-Europa en de VS**. Dat is de sleutel tot deze markt: enorm volume, extreem lage betalingsbereidheid per gebruiker, en een softwareprijspunt dat een orde van grootte onder het westerse ligt.

De planningsmarkt is **structureel gescheiden in twee werelden**:

1. **Binnenlandse projecten.** Vrijwel volledig lokaal bediend. Het dominante pakket is **广联达斑马进度计划 (Glodon Zebra Schedule Planning)**, opvolger van het klassieke **梦龙网络计划 (Menglong)**. Microsoft Project speelt een bijrol, Primavera P6 speelt vrijwel geen rol. De reden is niet patriottisme maar een **technische norm**: de Chinese praktijk en de branchenorm **JGJ/T 121-2015 《工程网络计划技术规程》** draaien om het **双代号(时标)网络图** — het activity-on-arrow-netwerkdiagram, en met name de tijdgeschaalde variant met 前锋线 (voortgangs-/frontlijn). Microsoft Project ondersteunt dat formaat niet (Project werkt met activity-on-node), en P6 evenmin in de Chinese conventie. Aanbestedings- en 施工组织设计-documenten vragen er wél expliciet om. Dat is de belangrijkste beschermingswal van de lokale pakketten.
2. **Internationale / export-EPC-projecten.** Hier geldt precies het omgekeerde: **Oracle Primavera P6 is de de-facto standaard**, opgelegd door buitenlandse opdrachtgevers, lenders en FIDIC-achtige contracten. CSCEC International, China Railway, PowerChina/CEEC en soortgelijke staatsaannemers draaien P6 op overzeese projecten en organiseren daarvoor eigen trainingen (bijv. een P6-training van CEEC Yunnan Thermal Power in Egypte, augustus 2025).

Drie krachten bepalen de komende jaren de dynamiek:

- **信创 (xinchuang) / verplichte binnenlandse substitutie.** Centrale staatsondernemingen moeten hun kernsystemen vóór eind 2027 vervangen door binnenlandse software. Dat raakt Oracle en Microsoft direct bij precies de klanten (CSCEC, CRCC, CREC, CCCC, PowerChina) die nu de grootste P6/Project-installaties hebben.
- **BIM- en 智能建造-mandaten.** 24 pilotsteden voor "intelligent construction" sinds november 2022; Shanghai eist BIM op projecten ≥ CNY 30 miljoen; 2026 wordt in de vakpers gepresenteerd als het jaar van landelijke uitrol.
- **Krimpende bouwsector.** Het aantal bouwmedewerkers daalde in 2024 met 12,26 % naar 59,6 miljoen; de winstmarge zakte naar 2,30 %. Softwarebudgetten staan onder druk — Glodon zag de omzet in 2024 én 2025 dalen.

**Marktomvang planningssoftware specifiek:** na fact-check schat ik het Chinese segment voor toegewijde planning-/CPM-software (licenties + abonnementen + implementatie + training) op **CNY 0,8–2,0 miljard (USD 110–280 miljoen) voor 2025**, puntschatting ≈ CNY 1,2 mrd — **[EIGEN SCHATTING]**, met de volledige redenering én de correctie op de eerdere, te hoge schatting (CNY 1,5–3,0 mrd) in §2.4. De belangrijkste beperkende toets: Glodons eigen claim van ~30 % marktaandeel impliceert dat de héle Chinese markt voor bouwuitvoeringssoftware ongeveer CNY 2,6 mrd is, waar een planningssegment van CNY 1,5–3,0 mrd niet in past. De ruimere categorie "工程项目管理软件" (engineering-PM-platformen, incl. ERP-achtige suites) wordt door een Chinese bron op CNY 11,6 miljard (USD 1,6 mld) voor 2025 geschat, maar die bron is zwak.

**Aantal planners:** **[EIGEN SCHATTING]** 150.000–400.000 mensen in China maken planningen als substantieel deel van hun werk; daarvan zijn 20.000–60.000 toegewijde 计划工程师/进度工程师, en 5.000–15.000 werken primair in P6 op internationale projecten. Redenering in §2.5.

**Piraterij is een eersteklas marktfactor**, geen voetnoot. Het Hooggerechtelijk Parket publiceerde in augustus 2025 een zaak waarin 11 verdachten voor CNY 25 miljoen aan illegale dongles voor bouwkostensoftware verkochten; de legale jaarlicentie kostte daar ~CNY 15.000 en de piraat vroeg een derde. Op Taobao worden Glodon-netwerkdongles openlijk **per dag verhuurd vanaf CNY 5,80/dag**. Elke prijsstelling voor deze markt moet tegen die schaduwprijs concurreren.

---

## 2. Marktomvang

### 2.1 Macro-context: de bouwmarkt zelf

| Indicator | Waarde | Jaar | Bron |
|---|---|---|---|
| Bruto bouwproductie (建筑业总产值) | CNY 326.501,11 × 10⁸ = **CNY 32,65 biljoen** (≈ USD 4,57 biljoen), +3,85 % j-o-j | 2024 | [sohu/中国建筑业协会](https://www.sohu.com/a/877285085_122006510), [hbjtjt.com.cn](https://www.hbjtjt.com.cn/xwzx/zgsdt/202505/t20250520_152244.shtml) |
| Toegevoegde waarde bouw (建筑业增加值) | CNY 89.949 × 10⁸ = **CNY 9,0 biljoen** | 2024 | [中国建筑装饰协会 / NBS](https://www.cbda.cn/html/yj/20250312/141927.html) |
| Voltooide bouwproductie (竣工产值) | CNY 135.238,80 × 10⁸, −1,65 % | 2024 | [hbjtjt.com.cn](https://www.hbjtjt.com.cn/xwzx/zgsdt/202505/t20250520_152244.shtml) |
| Werkzame personen in de bouw | **59,62 miljoen** (5.962,07 万人), −8,33 miljoen / **−12,26 %** j-o-j | 2024 | [中国建筑业协会 via sohu](https://www.sohu.com/a/870249747_121123767) |
| Winstmarge bouwbedrijven | 2,30 % (was 2,73 %) | 2024 | [idem](https://www.sohu.com/a/870249747_121123767) |
| Bedrijven met 特级 (hoogste) kwalificatie | 852 bedrijven / 1.015 certificaten | 2024 | [zhihu-samenvatting van 住建部-lijsten](https://zhuanlan.zhihu.com/p/681372234) |
| Provincies met >10.000 bouwbedrijven | Jiangsu, Shandong, Guangdong, Zhejiang, Henan, Sichuan | 2024 | [中国建筑业协会 via sohu](https://www.sohu.com/a/870249747_121123767) |
| Overzeese aanneming — omzet (完成营业额) | **USD 165,97 mrd** (CNY 11.819,9 × 10⁸), +3,1 % | 2024 | [MOFCOM](https://www.mofcom.gov.cn/zfxxgk/fdzdgknr/ztfl/tjsj/gwjjhztj/art/2025/art_65dc63635da34a5294625d978bc06653.html) |
| Overzeese aanneming — nieuwe contracten | **USD 267,3 mrd** (CNY 19.036,3 × 10⁸), +1,1 % | 2024 | [MOFCOM](https://www.mofcom.gov.cn/zfxxgk/fdzdgknr/ztfl/tjsj/gwjjhztj/art/2025/art_65dc63635da34a5294625d978bc06653.html), [JCCIEF](https://www.jccief.org.cn/v-1-23707.aspx) |

**Interpretatie.** De binnenlandse markt is ~17× zo groot als de exportmarkt in omzet, maar de exportmarkt is de plek waar westerse software geld verdient. Beide krimpen of stagneren nu; de daling van 12,26 % in personeel is dramatisch en betekent dat softwareverkopers per-seat-modellen zien eroderen.

### 2.2 Bouw-IT-uitgaven: de 0,08 %-anomalie

Dit is het belangrijkste getal van dit rapport.

| Indicator | Waarde | Bron |
|---|---|---|
| Bouw-informatisering als % van bouwproductie — **China** | **0,08 %** | [黄奇帆, Tsinghua 产业研究院](https://www.iii.tsinghua.edu.cn/info/1131/3500.htm); herhaald in [Eastmoney sectoronderzoek](https://data.eastmoney.com/report/zw_industry.jshtml), [chyxx.com](https://www.chyxx.com/industry/1174172.html), [hangyan.co](https://www.hangyan.co/charts/2776350293095351633) |
| Idem — Europa/VS | **≈ 1 %** | idem |
| Bevestiging door buitenlandse CEO | Pascal Daloz (Dassault Systèmes), nov. 2024: "建筑信息化投入在建筑业总产值中的占比仅为0,08 %" | [QQ News](https://news.qq.com/rain/a/20241101A09WGG00) |
| Alternatieve formulering | "我国建筑信息化占总产值的比例仅为0,1 %" | [chinairn.com](https://www.chinairn.com/news/20230530/142056788.shtml) |
| Markt bouw-informatisering | CNY 12,0 mrd (2015) → **CNY 38,1 mrd (2021)** | [zhihu-onderzoeksrapport](https://zhuanlan.zhihu.com/p/21932850383) (samengevat via zoekresultaat; de pagina zelf blokkeert directe fetch) |

> **⚠ Verificatiewaarschuwing bij het 0,08 %-anker (toegevoegd na fact-check).** Drie problemen die dit "belangrijkste getal van het rapport" verzwakken:
>
> 1. **Het is een cijfer van 2021–2022, niet van 2024.** De uitspraak van 黄奇帆 circuleert in artikelen uit 2021–2022 en gaat terug op een rapport van het 清华大学互联网产业研究院 met 中国建筑业协会 als statistische bron. Het toepassen op de bouwproductie van 2024 veronderstelt dat de IT-intensiteit in drie jaar niet is veranderd — precies in de periode van de BIM- en 智能建造-mandaten. Dat is een aanvechtbare aanname.
> 2. **Pascal Daloz is géén onafhankelijke bevestiging.** Een buitenlandse CEO die in een Chinees interview een bekend Chinees beleidscijfer herhaalt, is een *herhaling* van dezelfde bron, geen tweede meting. Het rapport presenteerde dit als "bevestigd door buitenlandse CEO"; dat is te sterk.
> 3. **Het anker is intern inconsistent met de andere cijferreeks in deze tabel.** De markt bouw-informatisering wordt op **CNY 38,1 mrd voor 2021** gezet (geverifieerd: CNY 12,0 mrd in 2015 → CNY 38,1 mrd in 2021, meerdere onafhankelijke weergaven). De bouwproductie in 2021 was **CNY 293.079 × 10⁸ = CNY 29,31 biljoen** (geverifieerd, +11,0 %). Dan is de IT-intensiteit **38,1 / 29.308 = 0,13 %** — ruim 60 % hóger dan de 0,08 % die hierboven als anker dient. De twee "harde ankercijfers" spreken elkaar dus tegen.
>
> **Gevolg:** de afgeleide totale bouwsoftwaremarkt hieronder is eerder een ondergrens dan een centrale schatting. Bij 0,13 % zou 2024 uitkomen op ≈ CNY 42 mrd in plaats van CNY 26–33 mrd.

**Afgeleide totale bouwsoftwaremarkt 2024 [EIGEN SCHATTING]:** 0,08–0,10 % × CNY 32,65 biljoen = **CNY 26–33 miljard (USD 3,7–4,6 miljard)**. Dit omvat álles: kostenraming, CAD, BIM, ERP, smart-site-hardware/software, planning. Neem de bovengrens serieuzer dan de ondergrens (zie waarschuwing hierboven).

Ter kruiscontrole van die bandbreedte, opgeteld uit bekende spelers:

| Speler | Omzet 2024/2025 | Bron |
|---|---|---|
| Glodon (广联达, 002410.SZ) | CNY 6,240 mrd (2024) — zie voetnoot; **CNY 6,068 mrd (2025)**, nettowinst CNY 405 mln (+61,77 %) | [Eastmoney 2024-analyse](https://caifuhao.eastmoney.com/news/20250403211915613638780); [2025-jaarverslag via cninfo](https://static.cninfo.com.cn/finalpage/2026-03-24/1225024978.PDF) |
| Pinming (品茗科技, 688109.SH) | **CNY 447 mln (2024)** (+2,69 %), nettowinst (归母) **CNY 31,48 mln (+153,27 %)** | definitief jaarverslag (19 apr. 2025), via [zoekverificatie](https://html.duckduckgo.com/html/?q=%E5%93%81%E8%8C%97%E7%A7%91%E6%8A%80+2024%E5%B9%B4%E6%8A%A5+%E8%90%A5%E4%B8%9A%E6%94%B6%E5%85%A5+4.47%E4%BA%BF); eerdere cijfers CNY 31,2 mln / +150,96 % kwamen uit het 业绩快报 van [QQ News](https://news.qq.com/rain/a/20250224A06LVN00) |
| Pinming (2025) | CNY 437 mln, nettowinst CNY 46,6 mln — **niet onafhankelijk bevestigd** | [topnews.cn](https://www.topnews.cn/news/145CDFE248B14E75) |

> **Voetnoot Glodon FY2024 (onzeker na verificatie).** Er circuleren twee waarden voor 2024: **CNY 6,240 mrd** (−4,93 % t.o.v. CNY 6,563 mrd in 2023, de meest geciteerde) en **CNY 6,203 mrd**. Het FY2025-verslag rapporteert CNY 6,068 mrd als **−2,17 %** j-o-j, wat rekenkundig alleen uitkomt op een vergelijkingsbasis van ≈ CNY 6,20 mrd (6,068 / 6,203 − 1 = −2,18 %), niet op CNY 6,240 mrd (dat zou −2,76 % geven). Waarschijnlijk gaat het om 营业收入 vs. 营业总收入 of een herrubricering. Het verschil (0,6 %) is voor dit rapport niet materieel, maar gebruik CNY 6,20–6,24 mrd als bandbreedte, niet één exact getal.

Glodon is met ~CNY 6 mrd de grootste; als je daar Pinming, Luban, PKPM/CABR, de kostensoftware-concurrenten (宏业, 鹏业, 神机妙算 e.a.) en de bouwverticals van 用友/金蝶/浪潮/新中大 bij optelt, kom je plausibel op CNY 15–25 miljard aan *softwarelicenties* — de rest van de 26–33 miljard is dienstverlening en smart-site-hardware. De optelsom is consistent met de 0,08 %-benadering.

### 2.3 BIM- en PM-softwaremarkt: publieke cijfers (met waarschuwing)

| Indicator | Waarde | Jaar | Bron | Oordeel |
|---|---|---|---|---|
| BIM-markt China | CNY 10,25 mrd (102,5 亿元) | 2023 | [toutiao/智研咨询](https://www.toutiao.com/article/7561317968030761510/) | plausibel |
| BIM-markt China | CNY 21,71 mrd (217,1 亿元), CAGR 16,2 % (2020–2024) | 2024 | [华经产业研究院](https://www.huaon.com/channel/trend/1107207.html), [Sina Finance](https://finance.sina.com.cn/roll/2025-09-22/doc-infrizmi4651308.shtml) | **inconsistent** — meer dan verdubbeling in één jaar bij een gemelde CAGR van 16,2 %; waarschijnlijk verschillende scope-definities. Niet gebruiken zonder voorbehoud. |
| "工程项目管理软件"-markt | CNY 11,6 mrd (116 亿元), CAGR 15,8 % | 2025 (prognose) | [juejin.cn](https://juejin.cn/post/7535001600735428654) | **[ZWAKKE BRON]** — leverancier-SEO-artikel dat zich beroept op "权威市场研究数据" zonder onderzoeksbureau te noemen |
| Idem, concurrerende claim | CNY 82 mrd (820 亿元), CAGR 32 % | 2025 | [juejin.cn](https://juejin.cn/post/7536078945658683438) | **onwaarschijnlijk** — zou 0,25 % van de bouwproductie zijn, ruim 3× de totale gemeten informatiseringsuitgaven. Verwerpen. |
| 信创-markt (alle sectoren) | > CNY 2,6 biljoen geprojecteerd | 2026–2027 | [zhihu](https://zhuanlan.zhihu.com/p/2030221474141881114) | contextueel, niet bouwspecifiek |

**Conclusie:** er bestaat geen betrouwbare, publiek beschikbare marktmeting voor "planningssoftware in China". De publieke cijfers zijn óf te breed (heel BIM, heel PM) óf afkomstig van contentmarketing. Onderstaande eigen schatting is daarom de bruikbaarste referentie.

### 2.4 Eigen schatting: het planningssoftware-segment

**[EIGEN SCHATTING — volledige redenering]**

*Bottom-up, vraagzijde:*

1. Glodon's segment **数字施工 (digitale uitvoering)** deed in 2024 CNY 786,87 miljoen ([华经情报网, o.b.v. jaarverslag](https://www.huaon.com/channel/comdata/1085441.html)). Dat segment omvat BIM5D, smart-site (deels hardware), projectmanagement én 斑马进度计划. Als planning daar 15–35 % van uitmaakt, is Glodons planningsomzet **CNY 120–275 miljoen**.
2. Glodon claimt in bouwmanagementsoftware een marktaandeel van **~30 %** ([Toutiao-analyse van het halfjaarbericht 2025](https://www.toutiao.com/article/7555676931149005355/), geverifieerd: "在施工信息化领域（如数字施工），市场占有率约30%"; ook bevestigd door [Eastmoney](https://caifuhao.eastmoney.com/news/20250403211915613638780): "施工管理软件业务占据约30%市场份额"). In planning specifiek is het aandeel vermoedelijk hóger (er is geen serieuze binnenlandse concurrent van vergelijkbare schaal — en 梦龙, ooit dé concurrent, is sinds 2010 van Glodon zelf), zeg 40–60 %. Dat geeft een binnenlandse markt van **CNY 197–690 miljoen** voor pure planningsproducten (**arithmetische correctie:** ondergrens = 118 / 0,60 ≈ 197, niet 250 zoals eerder vermeld; de eerdere ondergrens combineerde de bovengrens van de omzetschatting met de bovengrens van het aandeel).
3. Daar bovenop:
   - **Primavera P6 in China** (licenties + cloud + implementatie + support), vooral bij staatsaannemers en hun internationale divisies: bij een geschatte 5.000–15.000 betaalde seats à CNY 8.000–25.000/jaar plus implementatie → **CNY 100–350 miljoen/jaar**.
   - **Microsoft Project** via 21Vianet en OEM: bij 30.000–100.000 betaalde seats à CNY 2.378/jaar (Plan 3) tot CNY 555 (Planner Plan 1) → **CNY 50–200 miljoen/jaar**; het feitelijke betaalde volume is laag doordat piraterij en de meegeleverde-licentie-praktijk het verdringen.
   - **Planningsmodules binnen Chinese engineering-PM/ERP-suites** (普华 PowerOn, 建文, 邦永 PM2, 新中大 i8, 用友/金蝶/浪潮 bouwverticals): planning is daar een module in een grotere deal. Toegerekend aandeel → **CNY 400–1.200 miljoen**.
   - **Niche/legacy planningstools** (CCPROJECT 西西, 梦龙-restinstallaties, 品茗智绘进度计划, 恒智天成) → **CNY 50–150 miljoen**.
   - **Training, certificering en consultancy rond planning** → **CNY 150–400 miljoen**.

*Optelling (nagerekend):* ondergrens 197 + 100 + 50 + 400 + 50 + 150 = **CNY 0,95 miljard**; bovengrens 690 + 350 + 200 + 1.200 + 150 + 400 = **CNY 2,99 miljard**. De bottom-up levert dus **CNY 0,95–3,0 miljard**.

> **⚠ Correctie na fact-check — de gepubliceerde bandbreedte was te hoog.** Het rapport sprong hier van de berekende CNY 1,0–3,0 mrd naar een "centrale bandbreedte" van CNY 1,5–3,0 mrd. Die verhoging van de ondergrens met 50 % is nergens onderbouwd en is een niet-verantwoorde ophoging. Drie verdere bezwaren:
>
> - **Plafondtoets via Glodons eigen marktaandeelclaim.** Als Glodons 数字施工-omzet CNY 787 mln is en dat ~30 % van de markt is, dan is de héle Chinese markt voor bouwuitvoeringssoftware ≈ **CNY 2,6 miljard**. De hier geschatte planningsmarkt (CNY 1,5–3,0 mrd) zou dan 58–115 % van álle bouwuitvoeringssoftware in China zijn. Dat is onhoudbaar, en het spreekt de eigen top-down-aanname tegen dat planning maar 8–15 % van de bouw-IT-uitgaven is.
> - **De grootste post is de zwakst onderbouwde.** "Planningsmodules binnen Chinese engineering-PM/ERP-suites" (CNY 400–1.200 mln) is ~40 % van de puntschatting, berust op geen enkele bron, en is groter dan de schatting voor het feitelijke marktleidende planningsproduct. Zonder bewijs voor deze post valt de schatting met bijna de helft terug.
> - **Dubbeltelling met piraterij.** De P6- en MS-Project-posten gaan uit van 5.000–15.000 resp. 30.000–100.000 *betaalde* seats, terwijl het rapport elders betoogt dat piraterij de betaalde installed base tot een fractie reduceert. Beide kunnen niet tegelijk waar zijn.
>
> **Herzien oordeel:** de verdedigbare bandbreedte is **CNY 0,8–2,0 miljard (USD 110–280 miljoen)** met een puntschatting rond **CNY 1,2 miljard ≈ USD 170 miljoen**. Behandel de oorspronkelijke CNY 2,1 mrd als een bovengrensscenario, niet als centrale schatting. Blijft: **[EIGEN SCHATTING]**, met een onzekerheidsmarge van minstens een factor 2 naar beide kanten.

*Oorspronkelijke publicatie (nu als bovengrensscenario te lezen):* centrale bandbreedte **CNY 1,5–3,0 miljard = USD 210–420 miljoen voor 2025**, puntschatting **CNY 2,1 miljard ≈ USD 295 miljoen**. (De valuta-omrekeningen zelf zijn nagerekend en kloppen bij CNY 7,15/USD.)

*Kruiscontrole, top-down — en waarom die zwakker is dan gepresenteerd:* planning is in westerse bouw-IT-budgetten typisch 8–15 % van de softwareuitgaven. 8–15 % van CNY 15–25 miljard licentie-omzet = CNY 1,2–3,8 miljard; die rekensom klopt. **Maar het is geen onafhankelijke controle.** De CNY 15–25 mrd is zelf afgeleid uit het 0,08 %-anker in §2.2 — dezelfde bron als de bottom-up-context. Twee schattingen die op hetzelfde anker rusten en dan "consistent" blijken te zijn, bevestigen elkaar niet. Bovendien is de 8–15 %-verhouding een *westers* budgetpatroon dat op een markt wordt toegepast waarvan het hele rapport betoogt dat die structureel anders is.

*Groei:* de onderliggende bouwmarkt groeit ~4 % nominaal en het personeelsbestand krimpt met 12 %; digitaliseringsmandaten duwen de andere kant op. Ik schat de reële groei van het planningssegment op **8–15 % per jaar** — hoger dan de bouw zelf omdat het uitgangspunt (0,08 % IT-intensiteit) zo laag is, maar lager dan de 15,8–32 % die Chinese marketingbronnen claimen. **[EIGEN SCHATTING]**

### 2.5 Ordegrootte van het aantal planners

**[EIGEN SCHATTING — redenering]**

| Ankerpunt | Waarde | Bron |
|---|---|---|
| Werkzame personen bouw | 59,62 miljoen | [中国建筑业协会](https://www.sohu.com/a/870249747_121123767) |
| Cumulatief geregistreerde 一级建造师 (Klasse-1 constructors) | ~1,13 miljoen registraties over alle publicatiebatches | [233网校](https://www.233.com/jzs1/zhuce/202501/02113537461485.html) |
| Nieuwe initiële registraties 一级建造师 | ~126.500–130.000 in 2024 | [zhihu](https://zhuanlan.zhihu.com/p/14173869890), [233网校](https://www.233.com/jzs1/zhuce/202501/02113537461485.html) |
| Glodon-claim: gebruikers 斑马进度计划 | "上万家企业和20万以上从业人员" (>10.000 bedrijven, >200.000 professionals) | [zhihu](https://zhuanlan.zhihu.com/p/26233861028) |
| Glodon-claim (gratis-actie) | "近百万用户享受到了免费福利，涵盖从设计到施工近十万家企业" | [服务新干线](https://www.fwxgx.com/articles/234293) |
| Glodon-klantenbestand (服务新干线-platform) | 340.000 bedrijfsklanten | [sohu](https://www.sohu.com/a/694218360_121090399) |

*Redenering:* de 斑马-claim van >200.000 gebruikende professionals is een leveranciersclaim en telt vermoedelijk ook incidentele/gratis gebruikers mee; de "bijna 1 miljoen gebruikers" slaat op een gratis-actie en is geen actieve gebruikersbasis. In China wordt de planning meestal níét door een aparte planner gemaakt maar door de **技术负责人 / 施工员 / 技术员** als onderdeel van het 施工组织设计. Bij 852 特级-bedrijven, tienduizenden 一级-bedrijven en honderdduizenden actieve projecten kom je op:

- **150.000–400.000 personen** die regelmatig een bouwplanning opstellen of bijwerken (breed);
- **20.000–60.000** met "计划工程师 / 进度工程师" als functietitel;
- **5.000–15.000** die primair in Primavera P6 werken, vrijwel allemaal bij internationale divisies van staatsaannemers, ontwerpinstituten en EPC-bedrijven.

*Salarisindicatie voor die laatste groep:* een P6-planningsvacature in Shanghai staat op **CNY 20.000–28.000 per maand** ([智联招聘 / 猎聘-vacatures](https://www.liepin.com/s/964c62c630a1e96fca822da8ca880688/)). **Twee waarschuwingen na verificatie:** (1) dit is voor zover ik kon nagaan **één vacature**, geen salarisonderzoek — de eerdere formulering ("vacatures staan op…") suggereert ten onrechte een gemeten bandbreedte; (2) "P6" is in Chinese vacatureteksten óók de functieniveau-aanduiding van Alibaba en verwante techbedrijven, waardoor geautomatiseerd zoeken op "P6 + salaris" systematisch vervuilde resultaten geeft. Het cijfer is een **indicatie uit één waarneming**, niet een marktgemiddelde; de onderliggende stelling (P6-vaardigheid is schaars en wordt bovengemiddeld betaald) blijft plausibel maar is niet kwantitatief onderbouwd.

---

## 3. Welke software wordt daadwerkelijk gebruikt — rangorde en marktpositie

### 3.1 Rangorde binnenlandse projecten

| # | Pakket | Leverancier | Positie | Toelichting |
|---|---|---|---|---|
| 1 | **广联达斑马进度计划** (Zebra) | Glodon (广联达, 002410.SZ) | **Marktleider, de facto standaard** | Enige pakket met landelijke schaal, echte 双代号-ondersteuning, AI-features en een gratis instap |
| 2 | **Microsoft Project** | Microsoft / 21Vianet | Nr. 2 in installaties, grotendeels illegaal | Breed bekend, maar kan het verplichte 双代号网络图 niet tekenen |
| 3 | **Planningsmodules in Chinese engineering-PM-suites** | 普华 PowerOn, 建文 Jawin, 邦永 PM2, 新中大 i8, 用友/金蝶/浪潮 | Sterk bij groepen/holdings | Planning als onderdeel van kosten-/contract-/ERP-suite, niet als losstaand CPM-gereedschap |
| 4 | **CCPROJECT 西西进度计划编制软件** | onafhankelijk (klein) | Taaie niche, ~20 jaar oud | Fanatieke aanhang om tekenkwaliteit; goedkoop |
| 5 | **梦龙网络计划 (Menglong)** | 北京梦龙 (legacy) | Legacy-installaties | De historische standaard; ontwikkeling lag ~10 jaar stil, opgevolgd door 斑马 |
| 6 | **品茗智绘进度计划** | 品茗科技 (688109.SH) | Klein, bundel-verkoop | Meeliftend op Pinming's veiligheids-/documentatiesoftware |
| 7 | **PKPM-CM (施工管理)** | 中国建筑科学研究院 (CABR) | Institutioneel/design-institute-kanaal | Sterk in ontwerp, zwak in uitvoering |
| 8 | **Zelfbouwplatformen van staatsaannemers** | CSCEC, CRCC, CREC, CCCC | Groeiend, groepsniveau | Vaak schil om 广联达/斑马 of eigen webapplicaties |
| 9 | **Oracle Primavera P6** | Oracle | Marginaal binnenlands | Alleen kerncentrales, LNG, enkele megaprojecten en joint ventures met buitenlandse partners |
| 10 | **Algemene PM-SaaS** (Worktile, PingCode, Teambition, TAPD, 飞书项目, ONES, 禅道, 进度猫) | diverse | Buiten de bouw dominant, in de bouw randverschijnsel | Missen CPM/netwerkdiagram-diepte |

### 3.2 Rangorde internationale / export-EPC-projecten

Hier keert de rangorde volledig om.

| # | Pakket | Positie |
|---|---|---|
| 1 | **Oracle Primavera P6 (Professional + EPPM)** | **De facto verplicht**. Opdrachtgevers, engineers en financiers eisen P6-XER-bestanden. Bevestigd bij 中建国际 (CSCEC International, P6 EPPM-centralisatie — [aib-software.cn](https://www.aib-software.cn/cases-cscec-international/)), 中国中铁 ([lanyancloud](https://www.lanyancloud.com/news/1997113856438198272)), overzeese waterkracht-EPC in Maleisië en Indonesië ([Baidu Xueshu](https://xueshu.baidu.com/usercenter/paper/show?paperid=1h0w0mu0a4250em04x490vy0xb723148)), en 中国能建云南火电 dat in augustus 2025 P6-training gaf in Egypte ([CEEC](http://www.ytpc.ceec.net.cn/art/2025/8/6/art_47374_2517726.html)). |
| 2 | **普华 PowerOn / PowerPIP** | Chinese uitdager voor internationale EPC; kan EVM en meerlaags planningsoverleg. Historisch de P3/Primavera-distributeur, dus methodologisch P6-compatibel van geest. |
| 3 | **Microsoft Project** | Werkschema's van onderaannemers, tussenrapportages |
| 4 | **广联达斑马进度计划** | Alleen intern/schaduw: Chinese teams maken hun *werkelijke* planning in 斑马 en zetten die om naar P6 voor de opdrachtgever. Glodon adverteert expliciet met MS-Project-import en netwerkdiagram-generatie ([zhihu](https://zhuanlan.zhihu.com/p/395833283)). |
| 5 | **Bentley SYNCHRO / Autodesk Navisworks** | 4D-simulatie op verzoek van westerse opdrachtgevers |

**Dit dubbelspoor is een van de belangrijkste bevindingen van dit onderzoek.** Een Chinese planner bij een staatsaannemer werkt binnenlands in 斑马 en overzees in P6, en de conversie tussen die twee werelden is een reëel, terugkerend pijnpunt.

---

### 3.3 De pakketten in detail

#### 3.3.1 广联达斑马进度计划 (Glodon Zebra Schedule Planning) — **het pakket dat je moet verslaan**

**Leverancier.** 北京广联达斑马科技有限公司, opgericht **22 maart 2016** als dochter van 广联达科技股份有限公司 (Glodon, 002410.SZ) — [Baidu Baike / Tianyancha via Baidu-zoekresultaten].

**Herkomst — gecorrigeerd na verificatie.** Het product is de erfgenaam van **梦龙网络计划 (Menglong Network Planning)**, maar niet doordat Glodon "een opvolger bouwde" van een stilgevallen product: **Glodon heeft 北京梦龙软件技术有限公司 op 9 december 2010 voor CNY 94,34 miljoen volledig overgenomen** (100 % van de aandelen, gefinancierd uit overtekende IPO-middelen — Glodon ging in mei 2010 naar de beurs). De genoemde rationale was complementariteit tussen Glodons projectmanagementsysteem en Menglongs 协同办公-systeem. Pas daarna, op **22 maart 2016**, werd 北京广联达斑马科技有限公司 opgericht als het vehikel voor het nieuwe planningsproduct.

Het populaire verhaal dat Menglong "om bepaalde redenen 10 jaar stil lag" is dus beter te lezen als: overgenomen in 2010, gestald, en zes jaar later opnieuw uitgebracht onder een nieuw merk. Dat verklaart nog steeds waarom de Chinese markt het pakket meteen accepteerde — het is de institutionele opvolger van de standaard die iedere Chinese bouwkundige op school leerde — maar de mechanistische verklaring is een **overname**, geen onafhankelijke herbouw. (Verificatie: zoekbevestiging van de overnameaankondiging van 9 dec. 2010 en de oprichtingsdatum van 斑马科技; het eerdere rapport steunde hier op één stuk leveranciers-productcommunicatie via Baidu-snippets.)

**Functionaliteit** ([Glodon productpagina](https://www.glodon.com/product/204.html)):
- **一表多图**: één tabel genereert tegelijk een Gantt-balkendiagram, een **双代号网络图** (AOA) en een **双代号时标网络图** (tijdgeschaald AOA). Dit is *het* verkoopargument.
- **前锋线** (frontlijn / voortgangslijn) voor werkelijk-vs-plan visualisatie — de Chinese conventie voor voortgangsrapportage.
- Dynamische kritieke-pad-analyse met automatische herberekening.
- AI-ondersteunde planopbouw; cloudbibliotheek met planningssjablonen per projecttype.
- Meerlaagse plannen (totaalplan → maandplan → weekplan) met realtime doorkoppeling.
- Import/export met **Microsoft Project** en Excel; conversie van een Project-plan naar een automatisch gegenereerd 双代号网络图 ([zhihu](https://zhuanlan.zhihu.com/p/395833283)).
- Resource-koppeling (mensen/materieel/materialen) en multiproject-dashboard.
- Marketingclaim: 5–10 % besparing op planningsgerelateerde kosten.

**Marktpositie.** Glodon claimt >10.000 bedrijven en >200.000 professionals ([zhihu](https://zhuanlan.zhihu.com/p/26233861028)); een gratis-actie bereikte "bijna 1 miljoen gebruikers bij bijna 100.000 bedrijven" ([服务新干线](https://www.fwxgx.com/articles/234293)). Glodon zelf heeft 340.000 bedrijfsklanten op zijn 服务新干线-platform ([sohu](https://www.sohu.com/a/694218360_121090399)) en een marktaandeel van >60–68 % in kostensoftware (in sommige provincies ~90 %) plus ~30 % in bouwmanagementsoftware ([Sina Finance](https://finance.sina.com.cn/roll/2026-03-26/doc-inhshhra0403855.shtml), [Eastmoney](https://caifuhao.eastmoney.com/news/20250403211915613638780), [Toutiao](https://www.toutiao.com/article/7555676931149005355/)). Die kostensoftware-monopolie is het distributiekanaal waarlangs 斑马 de markt in ging.

**Prijs.**
- **斑马进度编制版: CNY 999 per jaar** ([服务新干线 aankondiging](https://www.fwxgx.com/articles/241537)) ≈ **USD 140/jaar**. **Nuance na verificatie:** de bron kondigt dit aan onder de noemer "感恩回馈，礼遇升级" — het is een **actie-/introductieprijs**, niet aantoonbaar de permanente lijstprijs. Behandel CNY 999 als het laagst waarneembare prijspunt van de marktleider, niet als vaststaand tarief.
- Professionele en enterprise-edities worden niet publiek geprijsd; die gaan via offerte en accountmanagement. **[EIGEN SCHATTING]** op basis van Glodons prijsladder elders (CNY 800–10.300/jaar per module, [Baidu Wenku-samenvatting van prijslijsten](https://wenku.baidu.com/view/5458d5f85bbfc77da26925c52cc58bd6318693a4.html)): professionele edities CNY 3.000–8.000/gebruiker/jaar, enterprise-implementaties CNY 100.000–1.000.000+.
- Er is een langlopend **gratis / 360-dagen-gratis**-programma ([zhihu](https://zhuanlan.zhihu.com/p/420295832), [Bilibili trialversie met AI](https://www.bilibili.com/video/BV1xPS7B7E9b/)). Glodon gebruikt planning bewust als *loss leader* om de kostensoftware-relatie te verbreden. Voor een nieuwe toetreder betekent dat: **de effectieve prijs van de marktleider is nul tot CNY 999.**

**Voordelen (uit Chinese bronnen en reviews).**
- Enige serieuze pakket dat het **verplichte diagramtype** native produceert. ([Zhihu-analyse waarom China 斑马 verkiest boven Project/P3/P6](https://zhuanlan.zhihu.com/p/26234429238))
- "会用Excel就会用斑马进度计划" — wie Excel kan, kan dit ([zpert.com](https://www.zpert.com/frontend/home/index)). Zeer lage leerdrempel; claim van 10× snellere planopbouw.
- Gedachtemodel "tijd + ruimte + logica" past op Chinese uitvoeringsvolgorde (流水段/流水施工 — takttiming per werkzone), iets wat westerse tools slecht modelleren.
- Meerlaagse plankoppeling (jaar/maand/week) sluit aan op de rapportageketen van Chinese aannemers.
- Gratis instapversie; brede tutorials, Bilibili-video's, actieve community ([bbs.zpert.com](https://bbs.zpert.com/t/topic/117)).
- Gedragen door Glodons enorme kanaal en trainingsinfrastructuur.

**Nadelen (uit Chinese bronnen en reviews).**
- **Lock-in en abonnementsmoeheid.** Glodon staat in China bekend als een quasi-monopolist met agressieve licentie-handhaving; op Zhihu loopt een prominente discussie "广联达是否已经形成垄断？" ([zhihu](https://www.zhihu.com/question/435523941)) en er is documenteerbare gebruikersweerstand tegen de "查杀盗版锁"-campagnes ([zhihu](https://zhuanlan.zhihu.com/p/630827971)).
- **Zwak in internationale interoperabiliteit.** Prima MPP-import, maar de brug naar P6/XER en naar westerse contractuele planningseisen (baselines, delay analysis volgens SCL-protocol, resource-nivellering op P6-niveau) is dun. Chinese bronnen positioneren 斑马 expliciet als "middelgrote bedrijven, binnenlandse projecten" en P6 als "grote EPC, kerncentrales, mega-infrastructuur" ([sohu-vergelijking](https://www.sohu.com/a/953333339_122546448)).
- **Minder diepgang in resource- en kostenmanagement** dan P6; earned value is niet de kernmethodiek.
- Volledig gebonden aan het Chinese ecosysteem: geen Engelstalige positie van betekenis, geen internationale gebruikersbasis.
- Gratis-strategie ondermijnt de perceptie dat planningssoftware geld waard is — een probleem dat de héle categorie in China treft.

---

#### 3.3.2 梦龙网络计划 (Menglong Network Planning) — het historische origineel

**Positie:** legacy, en sinds 2010 **eigendom van Glodon** (overname van 北京梦龙软件技术有限公司 voor CNY 94,34 mln, aangekondigd 9 december 2010). De productnaam "斑马梦龙网络计划软件" op downloadportalen is dus geen toeval maar de merkbrug tussen het overgenomen product en de 斑马-lijn. Nog aanwezig als encryptiedongle-product op JD.com en Taobao ([JD-listing](https://www.jd.com/hprm/6706c3db029865da53a.html)), en verkocht als "斑马梦龙网络计划软件 2.6" op downloadportalen ([ZOL](https://xiazai.zol.com.cn)). Ondersteunt Project-import met automatische netwerkdiagram-generatie.

**Correctie t.o.v. de eerste versie van dit rapport:** Menglong is géén onafhankelijke legacy-concurrent van 斑马 — het is dezelfde eigenaar. Dat betekent dat het "aantal serieuze binnenlandse aanbieders van pure netwerkplanningssoftware" één lager is dan het rapport oorspronkelijk suggereerde, en het versterkt het beeld van Glodon als quasi-monopolist in dit segment.

**Voordelen:** het is de norm waarop generaties Chinese bouwkundigen zijn opgeleid; tekenconventies zijn exact conform 双代号-praktijk; goedkoop en offline.
**Nadelen:** ontwikkeling lag jarenlang stil; verouderde UI; geen cloud, geen samenwerking; effectief opgevolgd door 斑马.

---

#### 3.3.3 CCPROJECT / 西西进度计划编制软件 — de taaie niche-kampioen

Een klein, onafhankelijk Chinees pakket dat expliciet bestaat omdat MS Project geen 双代号网络图 kan. Genoemd als hét antwoord op de vraag "welke software tekent een 双代号网络图" ([Baidu Zhidao](https://zhidao.baidu.com/)).

- **Functies:** 双代号-netwerkdiagram, tijdgeschaald netwerk, balkendiagram, 单代号-netwerk, resource-curves, mankrachtoverzichten, voortgangsvoorspelling; ondersteunt MS-Project-bestandsformaten. ([华军软件园](https://www.onlinedown.net), [CO土木在线](https://co.163.com))
- **Prijs — geverifieerd:** **CNY 1.500 zonder factuur / CNY 1.800 met (btw-)factuur** voor de single-user-versie, letterlijk op de officiële prijspagina: "开发票价格：1800元（可开增值税普通发票或专用发票）不开发票价格：1500元". Leverancier is **杭州西铭软件工作室**, dat ook via Taobao verkoopt (à CNY 1.800). Een gratis versie met functiebeperking bestaat; de goedkopere variant van ~CNY 680 kon ik **niet** bevestigen. ([ccproject.cn](https://www.ccproject.cn) — officiële site, gevonden bij verificatie; het rapport steunde eerder alleen op Baidu-zoekresultaten)
- **Zelfclaim:** "经过20年与直接用户的磨合，CC的绘图排版功能超过所有同类软件" — na 20 jaar bijschaven met gebruikers overtreft de teken- en opmaakfunctionaliteit alle vergelijkbare software.

**Voordelen:** eenmalige aanschaf i.p.v. abonnement (belangrijk in prijsgevoelige markt); uitstekende tekening/opmaak voor afdrukbare netwerkdiagrammen die in aanbestedingsdossiers moeten; heel goedkoop.
**Nadelen:** desktop-only, geen samenwerking/cloud, geen BIM-koppeling, geen mobiel, klein leveranciersrisico, geen AI; er circuleren "破解版"-handleidingen, wat aangeeft dat zelfs op CNY 1.500 piraterij loont.

---

#### 3.3.4 品茗科技 / 品茗智绘进度计划 (Pinming)

**Leverancier:** 杭州品茗科技 (688109.SH), opgericht 11 juli 2011, beursgang Shanghai STAR Market 30 maart 2021 ([sohu](https://www.sohu.com/a/949765038_122014422)). Omzet 2024 CNY 447,3 mln, nettowinst CNY 31,2 mln (+150,96 %) ([QQ News](https://news.qq.com/rain/a/20250224A06LVN00)).

**Product:** "品茗智绘进度计划软件是基于网络计划技术原理开发的施工进度计划职能编制系统" ([pmddw.com](https://www.pmddw.com/product/jd/index.html)) — dus expliciet gebouwd op netwerkplanningstheorie.

**Prijs (indicatief, uit officiële shop en Zhihu):** het bekendste product, 品茗安全计算软件, staat op **CNY 9.800** officieel; dongle-upgradeservice **CNY 3.600**. De planningsmodule wordt in bundels verkocht; losse lijstprijs niet publiek. ([shop.pinming.cn](https://shop.pinming.cn/mall/soft/list/?type=2))

**Voordelen:** beursgenoteerd (leverancierszekerheid); sterke positie in veiligheidsberekeningen, bekistings-/steigerontwerp en projectdocumentatie — planning is een logische aanvulling in dezelfde workflow; goede regionale dekking in Oost-China.
**Nadelen:** planning is duidelijk niet het vlaggenschip; kleiner ecosysteem en minder trainingsmateriaal dan Glodon; hoge prijspunten op de hoofdproducten maken het bundelen duur.

---

#### 3.3.5 PKPM (中国建筑科学研究院 / CABR)

Het software-instituut van de staat. PKPM is in China vooral bekend als *het* pakket voor constructieberekeningen conform Chinese normen, maar levert ook **PKPM施工管理软件** met modules voor planning, kosten, kwaliteit, veiligheid en materialen ([lanyancloud](https://www.lanyancloud.com/news/1970104280388157440)) en een **PKPM BIM施工综合管理平台** met "实际进度与模型实时对比" (realtime vergelijking werkelijke voortgang met het model) ([Baidu Wenku](https://wenku.baidu.com/view/2dab734c79563c1ec5da7152.html)).

**Prijs:** **CNY 8.000 – 150.000** afhankelijk van versie, aantal gebruikers en dienstverlening ([zhemaiyun](https://www.zhemaiyun.com/news/2004493348886437888)); geavanceerde constructieontwerp-versies kosten CNY 100.000 tot enkele honderdduizenden ([wandingsujiao](https://www.wandingsujiao.cn/jiegou/248.html)).

**Voordelen:** overheidsafkomst geeft normconformiteit en institutionele legitimiteit; onbetwist in structureel ontwerp; sterke positie bij ontwerpinstituten; automatisch 信创-conform.
**Nadelen:** de uitvoeringsmodules zijn duidelijk secundair aan de ontwerpmodules; verouderde UX-reputatie; zwaar getroffen door piraterij (er is een gedocumenteerde zaak waarin een provinciale bouwautoriteit illegale PKPM gebruikte — [lanyancloud](https://www.lanyancloud.com/news/1958765196327690240)); geen serieuze planningscommunity.

---

#### 3.3.6 鲁班软件 (Luban Software)

**Leverancier:** 上海鲁班软件股份有限公司, opgericht 2001, BIM-ontwikkeling begonnen 1999 ([ruanfujia](https://www.ruanfujia.com/vendor/9229/), [上海市绿色建筑协会](http://www.shgbc.org/xiehuidongtai/202409120945251860.html)). Positioneert zich als "基于BIM的数字孪生技术服务商" met de missie "建设1:1数字世界" ([lubansoft.com](https://www.lubansoft.com)).

**Schaal:** >1 miljoen installaties van de modelleer-/hoeveelheidssoftware ([Baidu Baike](https://baike.baidu.com/item/鲁班软件股份有限公司/60146481)); >700 projecten met volledige BIM-implementatie; claim van ~30 % kostenbesparing ([bimsz.com](https://www.bimsz.com/mdiyPage/company.html?id=1798243686109466625)).

**Positie voor planning:** Luban is primair hoeveelheidsbepaling + BIM-datamanagement + digital twin. Planning zit erin als onderdeel van het BIM-managementplatform (4D-koppeling), niet als zelfstandig CPM-gereedschap. Luban is de historische uitdager van Glodon in kostensoftware en die strijd grotendeels verloren.

**Voordelen:** sterke BIM-modelleer- en hoeveelheidsengine; grote geïnstalleerde basis; onafhankelijk alternatief voor wie Glodon-lock-in wil vermijden.
**Nadelen:** geen serieus CPM-product; financiële positie onduidelijk (geen beursnotering gevonden; de ticker 鲁班股份 872018 betreft een ander bedrijf); ik vond geen publieke omzet- of winstcijfers, wat op zichzelf een signaal is. Marktaandeel is in het laatste decennium door Glodon verdrongen.

---

#### 3.3.7 普华科技 / PowerOn (Shanghai Powerise) — de meest interessante lokale speler voor internationale EPC

**Herkomst — cruciaal detail:** 上海普华科技发展股份有限公司 werd opgericht op **23 september 1992** en werd in datzelfde jaar **de distributeur van Primavera P3 in China** ([Baidu Baike](https://baike.baidu.com/item/上海普华科技发展股份有限公司/20037088), [mypm.net](http://www.mypm.net/software/show_provider_info.asp?ID=1074), [Qcc](https://www.qcc.com/firm/aa0ad51d2f30042e7956438426571d18.html)). Het bedrijf draait nog steeds op het domein **p3china.com**. Na de Primavera E/C-serie in 2003 en Oracle's overname van Primavera schoof het bedrijf op naar eigen producten: **PowerOn, PowerPIP, PPE, PowerBIM, PowerEdu** ([p3china.com](https://www.p3china.com/childernPage/Template/ProductCenter.html)).

**Product PowerOn:** "跨地域、分布式项目管理平台" met nadruk op planning, contractbeheer en kostenbeheersing ([powerpms.com](https://www.powerpms.com/childernPage/ProductCenter/ProductCenter_PowerOn.html)); ondersteunt **多级计划协同与赢得值精细分析 (EVM)** ([sohu TOP10-review](https://www.sohu.com/a/923004172_121342678)); integreert mobiel internet, IoT en BIM ([PowerOn PDF](https://www.p3china.com/UpLoadFile/productCenter/PowerOn工程乙方项目管理信息集成平台.pdf)).

**Doelgroep:** internationale projecten en grote industriële projecten, EPC-volledige levenscyclus ([sohu](https://www.sohu.com/a/922950912_122460312)).

**Voordelen:** 30+ jaar Primavera-DNA en methodologie; kent de westerse planningsdiscipline (EVM, WBS, meerlaags plannen) beter dan welke andere Chinese leverancier ook; is 信创-conform en dus het natuurlijke vervangingspad voor P6 bij staatsondernemingen die vóór 2027 moeten migreren; regionaal servicecentrum in Beijing (北京普华春天, sinds 2000) en lid van de Chinese aannemersvereniging CHINCA ([chinca.org](http://www.chinca.org/CICA/Member/Query/Show/100020230607)).
**Nadelen:** een enterprise-platform, geen snel planningsgereedschap voor een uitvoerder; implementatiezwaar en duur; geen publieke prijs; geen internationale merkbekendheid; het gaat om projectmanagement-informatiesystemen — de zuivere CPM-engine is niet het onderscheidende element.

---

#### 3.3.8 建文软件 (Jawin / justwin.cn)

Positioneert zich expliciet als **"进度为龙头、成本为核心"** — planning als kop, kosten als kern — voor grote complexe projecten en EPC ([sohu TOP10](https://www.sohu.com/a/922950912_122460312), [justwin.cn/epc.html](https://www.justwin.cn/epc.html)). Onderscheidt zich met een "进度引擎" (planningsengine), dynamische kostenbeheersing en een "工程管理沙盘"-visualisatie.

**Voordelen:** een van de weinige Chinese PM-suites die planning als hoofdverkoopargument neemt; EPC-georiënteerd; AI+-positionering.
**Nadelen:** klein t.o.v. Glodon; weinig openbaar bewijs van installaties; geen openbare prijs; positionering leunt sterk op review-artikelen die commercieel geplaatst lijken.

---

#### 3.3.9 邦永科技 PM2

Chinese PM-suite met planning, resource- en risicomodules ([pm2.com.cn](http://www.pm2.com.cn/soft/)). Licentiemodel: **per gebruiker óf per project** ([36dianping](https://www.36dianping.com/qa/26489.html)); een prijsvergelijker plaatst het in de band **CNY 5.000–10.000, SaaS, grote onderneming** ([xuanruanjian](https://www.xuanruanjian.com/brand/789_EA16C22D4C10D32C885DBFAB.phtml)).

**Voordelen:** flexibel licentiemodel (per project is aantrekkelijk voor aannemers met wisselende bezetting); lange staat van dienst; referenties in overheid/onderwijsbouw.
**Nadelen:** gedateerde website en technologie-indruk; weinig zichtbaarheid in recente marktoverzichten; geen sterk planningsprofiel.

---

#### 3.3.10 De overige Chinese engineering-PM/ERP-suites

Uit de meest complete Chinese TOP10-review ([sohu, 2025](https://www.sohu.com/a/922950912_122460312)) en een tweede lijst ([ONES](https://ones.cn/blog/tools/2026-engineering-project-management-software-guide-2)):

| Pakket | Leverancier | Positionering | Sterk | Zwak |
|---|---|---|---|---|
| **新中大 i8 (Seentao)** | 新中大 | Groepsbrede beheersing, "业财税金档一体化" | Diepe integratie projectbeheer ↔ financiën; grote bouwgroepen | Zwaar, traag te implementeren; planning is bijzaak |
| **用友建筑云 (Yonyou)** | 用友 | Project + bedrijfsvoering op één platform | Integratie met financiën, supply chain, HR; grootste ERP-merk van China | Generiek; geen bouwspecifieke planningslogica |
| **金蝶云星空 (Kingdee)** | 金蝶 | Groeiende bouwbedrijven | Multidimensionale kostentoerekening, wendbare configuratie | Idem: ERP-logica, geen CPM |
| **浪潮 PS Cloud (Inspur)** | 浪潮 | Multi-organisatie-groepsbeheersing | PPM-portfoliomanagement, staatsbedrijf-vriendelijk | Zwaar; weinig planningsdiepte |
| **明建云** | — | Kostenbeheersing in de uitvoering | Dynamische kostprijsberekening, materiaalketen | Nauwelijks planning |
| **红圈工程项目管理系统** | 红圈 | Bedrijven met CNY 50 mln – 2 mrd omzet | PaaS/SaaS, licht en snel, 5 AI-modules | Ondiep voor complexe planning |
| **企企管理云** | 企企 | Onderaannemers en MKB | Snel uitrolbaar, goedkoop | Beperkt |
| **ONES** | ONES.cn | Software-/IT-projecten, ook bouw-instap | Moderne UX, sterke API | Niet bouwspecifiek; geen netwerkdiagram |

**Gemeenschappelijk zwak punt:** geen van deze suites kan het 双代号时标网络图 op het niveau van 斑马 of CCPROJECT. Ze bedienen de *bestuurlijke* planningslaag (rapportage, mijlpalen, kosten), niet de *technische* planningslaag (CPM-netwerk, 流水施工, frontlijn).

---

#### 3.3.11 Oracle Primavera P6

**Positie:** verwaarloosbaar binnenlands, dominant internationaal (zie §3.2).

**Kanaal in China.** Er is geen dominante Oracle-distributeur maar een lappendeken van gespecialiseerde dienstverleners:
- **AIB Software** (aib-software.cn) — P6 EPPM-implementaties, o.a. de casus 中建国际 (CSCEC International); trainers met 21+ jaar internationale projectbeheersingservaring ([aib-software.cn/training](https://www.aib-software.cn/training/))
- **奥赛多（北京）科技** (osydo.com) — "onmisbare partner van Oracle" voor P6-verkoop ([osydo.com/p6rjxs](https://www.osydo.com/p6rjxs))
- **北京普为海通软件** (bjpowerway), opgericht 2007 als gespecialiseerd P6-dienstenbedrijf ([bjpowerway.com](https://www.bjpowerway.com/info.aspx?catID=13&subcatID=38))
- **杰信软件 (Jiexin)** als geregistreerde distributeur op de softwaremarktplaats 软服之家 ([ruanfujia](https://www.ruanfujia.com/software/27608/reseller/))
- **艾威培训 (Avtech)** voor 2- en 3-daagse P6-trainingen ([avtechcn.com](https://www.avtechcn.com/ap/pm/27011.html))
- Historisch: **上海普华科技** was de P3-distributeur vanaf 1992 (zie §3.3.7) en is nu concurrent geworden.

**Prijzen in China** — Oracle publiceert geen Chinese lijstprijs; de bekendste Chinese prijsanalyse geeft **[ZWAKKE BRON]** ([lanyancloud](https://www.lanyancloud.com/news/1964886467511795712)):

| Licentievorm | Prijs (CNY) | ≈ USD |
|---|---|---|
| Basis (Project Manager), per gebruiker per jaar | 8.000 – 15.000 | 1.120 – 2.100 |
| Professioneel (Advanced User), per gebruiker per jaar | 15.000 – 25.000 | 2.100 – 3.500 |
| Projectlicentie, groot infraproject | 50.000 – 150.000 | 7.000 – 21.000 |
| Cloud basis, per gebruiker per maand | 1.000 – 2.000 | 140 – 280 |
| Cloud professioneel, per gebruiker per maand | 2.500 – 4.000 | 350 – 560 |
| Implementatie | 50.000 – 500.000 | 7.000 – 70.000 |
| Training per persoon | 2.000 – 5.000 | 280 – 700 |
| Technische support | 20–30 % van de jaarlijkse licentiekosten | — |

**Ter kalibratie — herzien na fact-check.** De eerdere formulering ("ligt in dezelfde orde als Oracle's internationale prijsstelling") houdt geen stand, om twee redenen:

- **Verkeerde licentiemodaliteit.** Oracle verkoopt P6 Professional internationaal als **perpetual named-user-licentie** van ongeveer **USD 2.500–4.240 eenmalig** plus **USD 500–800 per jaar** support (opgaven van resellers en licentie-adviesbureaus; Oracle publiceert zelf geen lijstprijs). De Chinese bron presenteert daarentegen **jaarlijks terugkerende** bedragen van CNY 8.000–25.000 (USD 1.120–3.500 per jaar). Dat is een ander model, niet dezelfde ordegrootte: een terugkerende USD 1.120–3.500/jaar is over vijf jaar aanzienlijk duurder dan een perpetual van USD 2.500–4.240 plus support. Óf de Chinese bron beschrijft een subscription-aanbod dat Oracle internationaal niet zo voert, óf hij verwart perpetual met jaarlijks.
- **De factor 8–25× is een appels-met-perenvergelijking.** Die rekent P6-*professioneel* af tegen 斑马's **goedkoopste instaptarief** (CNY 999, dat blijkens de bron bovendien een actieprijs is). Tegen de in dit rapport zelf geschatte 斑马-professional-prijs (CNY 3.000–8.000/gebruiker/jaar) is de factor eerder **1–8×**. De richting van de conclusie — P6 is fors duurder — blijft overeind; de gepubliceerde factor is opgeblazen.

Het prijsverschil verklaart nog steeds een deel van P6's binnenlandse marginaliteit, maar minder dominant dan het rapport oorspronkelijk suggereerde; de diagramtype-eis (§5.1) is waarschijnlijk de zwaarder wegende factor.

**Voordelen (zoals Chinese bronnen ze zien):** onbetwiste internationale standaard; sterke resource- en kostenbeheersing; portfoliomanagement over meerdere projecten; onmisbaar voor grote EPC, kerncentrales en mega-infrastructuur ([sohu](https://www.sohu.com/a/953333339_122546448)).
**Nadelen (zoals Chinese bronnen ze zien):** "复杂操作、学习曲线长、总体拥有成本较高" — complexe bediening, lange leercurve, hoge TCO; "对中大型项目性价比差" — slechte prijs-kwaliteitverhouding voor middelgrote projecten; "本地化适配不足" — onvoldoende lokale aanpassing ([zhihu](https://zhuanlan.zhihu.com/p/26234429238)). Én, doorslaggevend: **geen 双代号时标网络图**.

**Bedreiging:** 信创. Als de SASAC-eis dat centrale staatsondernemingen hun kernsystemen vóór eind 2027 op binnenlandse software draaien strikt wordt toegepast op projectbeheersing, verliest Oracle precies zijn Chinese kernklanten. Zie §5.3.

---

#### 3.3.12 Microsoft Project

**Prijzen in China (officieel, via 21Vianet-operated Microsoft 365 China):** ([ms365.com.cn](https://www.ms365.com.cn/plans-indep/82))

| Plan | Binnenlandse (21Vianet) versie | Internationale versie |
|---|---|---|
| Planner Plan 1 | **CNY 555 /gebruiker/jaar** (≈ USD 78) | CNY 924 /gebruiker/jaar |
| Planner and Project Plan 3 | **CNY 2.378 /gebruiker/jaar** (≈ USD 333) | CNY 2.784 /gebruiker/jaar |

Project Plan 5 en de eeuwigdurende Project Professional-licentie staan niet op de Chinese pagina.

**Voordelen:** vertrouwd Office-idioom; integratie met Excel/SharePoint; internationaal herkend als "行业标准"; goedkoper dan P6.
**Nadelen (Chinese bronnen):**
- **Ondersteunt geen 双代号网络图.** Letterlijk: "微软Project采用的是单代号网络图技术，不支持双代号网络图" ([CSDN via Baidu](https://blog.csdn.net)). Dit alleen al diskwalificeert Project voor formele Chinese planningsdocumenten.
- "界面和操作逻辑更偏向于通用项目管理" — te generiek voor bouw; "逻辑关系的直观性不如专业软件" ([sohu](https://www.sohu.com/a/953333339_122546448)).
- **Massale piraterij.** Er bestaat een volwaardige Chinese content-industrie rond "Project破解版" ([lanyancloud](https://www.lanyancloud.com/news/1965583561016950784), [lanyancloud](https://www.lanyancloud.com/news/2007933596735791104)), met waarschuwingen dat gekraakte versies "常嵌入木马、键盘记录器等恶意程序" ([Baidu Zhidao](https://zhidao.baidu.com/question/1588917115632097260.html)). De betaalde installed base is een fractie van de feitelijke.

---

#### 3.3.13 4D-BIM en simulatie: SYNCHRO, Navisworks, Fuzor, BIM5D

De Chinese vergelijkingsartikelen noemen consequent dezelfde set: **Autodesk Navisworks, Bentley SYNCHRO, Fuzor, Trimble Connect, BIM 360, Bentley Navigator en 广联达BIM5D** ([zhihu](https://zhuanlan.zhihu.com/p/78314669), [zhemaiyun](https://www.zhemaiyun.com/news/1960814459991834624), [lanyancloud](https://www.lanyancloud.com/news/1964419892912537600)). Navisworks is verreweg het meest gebruikt als 4D-tool, met Beijing Daxing Airport als het meest genoemde referentieproject ([zhemaiyun](https://www.zhemaiyun.com/news/2001020970617430016)).

**Belangrijk voor positionering:** in China wordt 4D-simulatie gezien als een *presentatie*- en *coördinatie*-activiteit (botsingscontrole, visualisatie voor de opdrachtgever), niet als de plek waar de planning wordt gemaakt. De planning komt uit 斑马 of Project en wordt daarna aan het model gekoppeld. SYNCHRO's ambitie om de planningsengine zélf te zijn landt hier niet.

---

#### 3.3.14 Trimble TILOS, Elecosoft Asta Powerproject, RIB iTWO, ALICE / nPlan / Nodes & Links

| Pakket | Aanwezigheid in China | Bewijs |
|---|---|---|
| **Trimble TILOS** | Beperkte, aantoonbare aanwezigheid via technische distributeurs voor lineaire projecten (snelwegen, spoor, pijpleidingen, tunnels) | [Baidu Baike TILOS-lemma](https://baike.baidu.com/item/tilos/7688505); [titgroup.cn productpagina](https://titgroup.cn/productinfo/1579707.html); [ybzhan-listing van 北京天梯装备科技](https://www.ybzhan.cn/st159665/product_16083829.html) |
| **Elecosoft Asta Powerproject** | Chinese productdocumentatie bestaat (CPM + LOB, "企业级项目组合管理软件") maar ik vond **geen actieve Chinese wederverkoper**. Let op: het domein powerproject.com.cn is een **ander, Chinees** product, geen Asta | [Baidu Wenku Asta-introductie](https://wenku.baidu.com/view/17f22953be23482fb4da4c31.html) |
| **RIB iTWO** | Marginale aanwezigheid: Chinese demovideo's op Bilibili uit 2021–2022 met **347 tot 2.700 weergaven**. Dat is verwaarloosbaar voor een markt van deze omvang | Bilibili-resultaten via Yahoo-zoekopdracht "RIB iTWO 中国" |
| **ALICE Technologies, nPlan, Nodes & Links** | **Geen enkel bewijs van Chinese activiteit, klanten of localisatie gevonden** in Chinees- of Engelstalige bronnen | Zoekopdrachten leverden alleen westerse vergelijkingsartikelen op ([contechnews](https://www.contechnews.com/blog/AI/the_rise_of_ai_driven_construction_project_management)) |
| **Spider Project, Safran, Deltek Acumen, InEight** | **Geen resultaten** op gerichte Chinese zoekopdrachten | Yahoo-zoekopdracht met deze merknamen + 中国/代理 gaf letterlijk "We did not find results" |
| **RIB Candy** | Niet aangetroffen in Chinese bronnen | — |

**Duiding:** de Chinese markt is voor westerse niche-planningsleveranciers effectief gesloten — niet door verbod, maar door afwezigheid van kanaal, taal, lokale normconformiteit en een prijspunt dat werkt.

---

#### 3.3.15 Algemene projectplanningstools (niet bouwspecifiek)

**Westerse SaaS is grotendeels onbruikbaar of afwezig:**

| Tool | Status in vasteland China | Bron |
|---|---|---|
| **Smartsheet** | **Geblokkeerd / onbereikbaar.** Meerdere threads in Smartsheets eigen community: "Smartsheet is not accessible from China right now"; Chinese medewerkers van multinationals kunnen projectinformatie niet bijwerken | [Smartsheet Community](https://community.smartsheet.com/discussion/70274/access-blocked-from-china-workarounds), [Smartsheet Community](https://community.smartsheet.com/discussion/128883/users-from-china-cannot-logon), [AppInChina](https://appinchina.co/does-smartsheet-work-in-china/) |
| **Asana** | Bereikbaar maar traag; "访问速度及本地化支持问题"; er bestaat een hele Chinese categorie "Asana替代：满足国产化诉求的项目管理工具" | [CSDN](https://blog.csdn.net/hyang1226/article/details/144292579) |
| **monday.com, Wrike** | Geen bewijs van betekenisvolle Chinese aanwezigheid gevonden; verschijnen alleen in vergelijkingsartikelen | [PingCode-vergelijking](https://docs.pingcode.com/baike/5227704) |
| **Jira** | Wel gebruikt in Chinese softwarebedrijven; verschijnt standaard in Chinese vergelijkingen | [zhihu](https://zhuanlan.zhihu.com/p/2000650800259700104) |

**De feitelijke Chinese "algemene PM"-markt** bestaat uit binnenlandse SaaS:

**Worktile** (hoog marktaandeel, klanten 小红书, 长城汽车, Tsinghua), **PingCode**, **Teambition** (Alibaba), **TAPD** (Tencent), **飞书项目** (ByteDance/Lark), **云效** (Alibaba), **禅道 ZenTao** (open source), **ONES**, **简道云**, **Tita**, en **进度猫** — dat laatste specifiek als "国产轻量级可视化进度管理工具" met Gantt-diagram en mindmap. Bronnen: [zhihu 16-tools-vergelijking](https://zhuanlan.zhihu.com/p/1919076797934475051), [PingCode](https://docs.pingcode.com/baike/5227704), [cnblogs/Worktile](https://www.cnblogs.com/worktile/articles/18932524).

**Relevantie voor bouw:** laag. Deze tools missen CPM, kalenderregimes, netwerkdiagrammen en resource-nivellering. Ze worden in bouwbedrijven hooguit gebruikt voor kantoorprocessen en IT-projecten, niet voor 施工进度计划.

**Open source:** ProjectLibre en GanttProject zijn in China bekend en worden actief aanbevolen als gratis MS-Project-alternatief voor MKB met beperkt budget ([zhihu ProjectLibre-gids](https://zhuanlan.zhihu.com/p/488577569), [CSDN](https://blog.csdn.net/weixin_28366053/article/details/159848274), [kaiyuanapp.cn over GanttProject](https://kaiyuanapp.cn/ganttproject-免费开源的桌面项目调度与管理工具/)). ProjectLibre wordt geprezen om .mpp-ondersteuning en earned value. Maar: geen 双代号网络图, geen Chinese normconformiteit, geen support — dus in de bouw randverschijnsel. **Wel relevant als bewijs dat er een reële, actief zoekende doelgroep is voor gratis, offline, Project-compatibele planningssoftware in China.**

---

## 4. Prijzen en licentiemodellen — overzicht

**Alle bedragen omgerekend tegen USD 1 = CNY 7,15.**

| Product | Model | Prijs CNY | Prijs USD | Bron |
|---|---|---|---|---|
| **广联达斑马进度 编制版** | abonnement/jaar | **999** | ~140 | [服务新干线](https://www.fwxgx.com/articles/241537) |
| 广联达斑马进度 (proef) | gratis / 360 dagen | 0 | 0 | [zhihu](https://zhuanlan.zhihu.com/p/420295832) |
| 广联达 professioneel/enterprise | offerte | *3.000–8.000/gebr./jaar; enterprise 100k–1M+* **[EIGEN SCHATTING]** | 420–1.120 / 14k–140k | afgeleid van [Glodon-prijsbanden](https://wenku.baidu.com/view/5458d5f85bbfc77da26925c52cc58bd6318693a4.html) |
| 广联达 modules algemeen (jaarabonnement) | abonnement | 800 – 10.300 /jaar | 112 – 1.440 | [Baidu Wenku prijsoverzicht](https://wenku.baidu.com/view/5458d5f85bbfc77da26925c52cc58bd6318693a4.html) |
| 广联达 begroting/hoeveelheden (eenmalig) | perpetual per module | 7.800 – 8.200 | 1.090 – 1.150 | [itangsoft](https://www.itangsoft.com/baike/show-204866.html) |
| 广联达 kostensoftware jaarlicentie (dongle) | abonnement | **≈ 15.000** | ≈ 2.100 | [最高人民检察院 strafzaak](https://www.spp.gov.cn/spp/zdgz/202508/t20250812_703521.shtml) |
| 广联达 servicekosten per project | projectgebonden | klein 3.000–8.000; middel 8.000–20.000; groot >20.000 | 420–2.800+ | [Baidu Wenku](https://wenku.baidu.com/view/ed0bb1b4950ef12d2af90242a8956bec0975a585.html) |
| 广联达 5D maatwerk (onderwijsinstelling) | project | ≈ 120.000 incl. 1 jaar onderhoud | ≈ 16.800 | [lanyancloud](https://www.lanyancloud.com/news/1960289126389592064) |
| **CCPROJECT 西西** single-user | perpetual | **1.500** (zonder factuur) / **1.800** (met factuur) | 210 / 252 | [ccproject.cn](https://www.ccproject.cn) — officiële prijspagina (geverifieerd) |
| CCPROJECT beperkte versie | gratis | 0 | 0 | idem |
| **品茗安全计算软件** | perpetual | 9.800 | 1.370 | [shop.pinming.cn](https://shop.pinming.cn/mall/soft/list/?type=2) |
| 品茗 dongle-upgrade | dienst | 3.600 | 505 | idem |
| **PKPM 施工管理** | licentie, versie-/gebruikersafhankelijk | 8.000 – 150.000 | 1.120 – 21.000 | [zhemaiyun](https://www.zhemaiyun.com/news/2004493348886437888) |
| PKPM constructie (geavanceerd) | licentie | 100.000 – enkele honderdduizenden | 14.000 – 42.000+ | [wandingsujiao](https://www.wandingsujiao.cn/jiegou/248.html) |
| **邦永 PM2** | per gebruiker óf per project | 5.000 – 10.000 (SaaS-band) | 700 – 1.400 | [xuanruanjian](https://www.xuanruanjian.com/brand/789_EA16C22D4C10D32C885DBFAB.phtml), [36dianping](https://www.36dianping.com/qa/26489.html) |
| **Microsoft Planner Plan 1** (China) | abonnement/jaar | **555** | 78 | [ms365.com.cn](https://www.ms365.com.cn/plans-indep/82) |
| **Microsoft Planner & Project Plan 3** (China) | abonnement/jaar | **2.378** | 333 | [ms365.com.cn](https://www.ms365.com.cn/plans-indep/82) |
| Microsoft Plan 3 (internationale versie in CN) | abonnement/jaar | 2.784 | 389 | idem |
| **Primavera P6** basis | per gebruiker/jaar | 8.000 – 15.000 **[ZWAKKE BRON]** | 1.120 – 2.100 | [lanyancloud](https://www.lanyancloud.com/news/1964886467511795712) |
| Primavera P6 professioneel | per gebruiker/jaar | 15.000 – 25.000 **[ZWAKKE BRON]** | 2.100 – 3.500 | idem |
| Primavera Cloud basis | per gebruiker/maand | 1.000 – 2.000 **[ZWAKKE BRON]** | 140 – 280 | idem |
| Primavera projectlicentie | per groot project | 50.000 – 150.000 **[ZWAKKE BRON]** | 7.000 – 21.000 | idem |
| **P6 implementatie** | dienst | 50.000 – 500.000 | 7.000 – 70.000 | idem |
| **P6 support** | jaarlijks | 20–30 % van licentiekosten | — | idem |

### 4.1 Trainingskosten

| Aanbod | Prijs CNY | USD | Bron |
|---|---|---|---|
| Glodon GIAC-certificering, module 土建 | **399** | 56 | [建筑鱼网校](https://www.jianzhuyu.com/front/couinfo/971.json) |
| Glodon-softwaretraining, basiscursus | ~900 | 126 | [Baidu Zhidao](https://zhidao.baidu.com/question/467633472356439925.html) |
| Glodon-training, geautoriseerde instelling | ~2.000 | 280 | [zhihu](https://zhuanlan.zhihu.com/p/27790325849) |
| Glodon 一造-opleiding (breed) | enkele honderden – 9.000 | 42 – 1.260 | [Baidu Zhidao](https://zhidao.baidu.com/question/661654386424203965.html) |
| Glodon eigen leerplatformen | 建筑云课 ([ai.glodonedu.com](https://ai.glodonedu.com/front/coursecenter/course/detail?courseId=3574130878745805185)), docententraining ([szpx.glodonedu.com](https://szpx.glodonedu.com)) | — | — |
| **P6-training per persoon** | 2.000 – 5.000 | 280 – 700 | [lanyancloud](https://www.lanyancloud.com/news/1964886467511795712) |
| P6-training, 2–3 daagse klassikale cursus (艾威培训) | offerte | — | [avtechcn](https://www.avtechcn.com/ap/pm/25974.html) |
| 斑马进度 training met officieel certificaat | offerte | — | [Baidu Wenku](https://wenku.baidu.com/view/45529ca7660e52ea551810a6f524ccbff121ca9a.html) |

**Patroon:** lokale training is spotgoedkoop (CNY 399–2.000) en is gestandaardiseerd rond leverancierscertificaten. P6-training kost 5–10× zoveel en gaat via gespecialiseerde trainingsbureaus. Voor een buitenlandse leverancier betekent dit dat trainingsinkomsten in China geen serieus verdienmodel zijn — de training moet gratis, video-gebaseerd en in het Chinees zijn (Bilibili is het belangrijkste kanaal).

### 4.2 De schaduwprijs: piraterij en dongleverhuur

Dit hoort in het prijshoofdstuk omdat het de feitelijke prijs bepaalt.

| Kanaal | Prijs | Bron |
|---|---|---|
| **Verhuur Glodon-netwerkdongle op Taobao** | **vanaf CNY 5,80 per dag** (≈ USD 0,81), met week-, maand-, kwartaal-, halfjaar-, jaar- en "permanente" pakketten | [Taobao-listing](https://www.taobao.com/list/item/ZWRKOVBKY0VVZGxRYmZlTWF3UHJGUT09.htm) |
| Illegale dongle | ~1/3 van de legale prijs (dus ~CNY 5.000 tegen CNY 15.000) | [最高人民检察院](https://www.spp.gov.cn/spp/zdgz/202508/t20250812_703521.shtml) |
| Kraakprogramma per stuk | CNY 400 – 3.000 | idem |
| Illegale dongles (historische zaak 2012–2014) | CNY 60 – 300 per stuk | [中国知识产权律师网](https://www.ciplawyer.cn/articles/122597.html) |

**Als je prijsstelling voor China bepaalt, is je echte concurrent niet CNY 999 maar CNY 5,80 per dag.**

---

## 5. Lokale bijzonderheden

### 5.1 De beslissende technische norm: 双代号时标网络图

Dit is het belangrijkste inzicht voor iedereen die planningssoftware voor China bouwt.

- **Norm:** 《工程网络计划技术规程》 **JGJ/T 121-2015**, uitgegeven 13 maart 2015, van kracht sinds **1 november 2015**, vervangt JGJ/T 121-99 (dat gelijktijdig werd ingetrokken). Uitgegeven door 住建部 (MOHURD). **Belangrijke correctie: de "/T" betekent 推荐性行业标准 — een *aanbevolen* branchenorm, niet een verplichte (强制性) norm.** De norm zelf dwingt dus niets af; de bindende werking komt uit het **招标文件** (aanbestedingsdossier) en uit lokale regelingen die ernaar verwijzen. Zie de nuancering onderaan deze paragraaf. Acht hoofdstukken: algemene bepalingen, terminologie, **双代号网络计划** (activity-on-arrow), **单代号网络计划** (activity-on-node), optimalisatie, uitvoering/beheersing, en computertoepassing. Toepassingsgebied: "采用肯定型网络计划技术进行进度计划管理的城乡建设工程" — deterministische netwerkplanning in stedelijke en landelijke bouwprojecten. Bronnen: [gongbiaoku](https://www.gongbiaoku.com/mobile/book/y0p18477us1), [coyis](https://coyis.com/guifantuji/guifan/2018041117484.html), [中国建筑出版社 e-book](https://ebook.chinabuilding.com.cn/zbooklib/book/detail/show?SiteID=1&bookID=59516), [antpedia](https://www.antpedia.com/standard/7078621-1.html).
- **Gerelateerd:** GB/T 50326 《建设工程项目管理规范》 (projectmanagementnorm voor bouwprojecten).
- **Praktische gevolgen:**
  - Het aanbestedingsdossier bepaalt welk diagramtype vereist is: "应当选用哪一种进度图，则需要根据招标文件的明确要求和规定" ([zhihu](https://zhuanlan.zhihu.com/p/434047231)).
  - Beijing heeft een eigen 《投标施工组织设计编制规程》 die de inhoud van het 施工组织设计 voorschrijft, inclusief 流水段划分 (indeling in werkzones voor takt-uitvoering), totale uitvoeringsvolgorde, arbeidsinzet, hoofdmaterieel en het uitvoeringsschema ([Beijing 市场监管局 PDF](https://bzh.scjgj.beijing.gov.cn/bzh/apifile/file/2021/20210325/2b20a210-f025-45cc-80c0-42ffbe39beb3.PDF)).
  - **Microsoft Project kan het niet:** "微软Project采用的是单代号网络图技术，不支持双代号网络图."
  - Het 时标网络图 (tijdgeschaald netwerkdiagram) met **前锋线** is dé Chinese conventie voor voortgangsrapportage — een verticale/gebroken lijn die op rapportagedatum door alle activiteiten wordt getrokken en direct laat zien welke voor- of achterlopen. Westerse tools hebben hier geen equivalent van (de dichtstbijzijnde is de "progress line" in Project, maar niet op een AOA-netwerk).
  - **流水施工** (takt-/stroomuitvoering per werkzone) is de kern van Chinese uitvoeringsplanning en wordt door 斑马 expliciet ondersteund via het model "tijd + ruimte + logica".

**Conclusie — met gecorrigeerde nuance:** dit is een *contractuele/aanbestedingstechnische* barrière die op een aanbevolen norm steunt, niet een wettelijk verplichte norm. JGJ/T 121-2015 is 推荐性 (aanbevolen); wat bindt is het aanbestedingsdossier, dat in de praktijk vrijwel altijd naar deze norm en dit diagramtype verwijst. Praktisch verandert dat de conclusie niet — elk pakket dat de Chinese markt serieus wil bedienen moet 双代号 (AOA), 单代号 (AON), tijdgeschaalde netwerken, frontlijnen en werkzone-gebaseerde takting kunnen renderen én afdrukken in het aanbestedingsformaat — maar het is **geen wettelijke verplichting** en de formulering "normatieve inschrijvingseis" elders in dit rapport is in die zin te sterk. Het effect is de facto, via de opdrachtgever, niet de jure.

### 5.2 Overheidsmandaten: BIM en 智能建造

| Beleidsstuk | Inhoud | Datum | Bron |
|---|---|---|---|
| 《"十四五"建筑业发展规划》 | Landelijk plan voor de bouwsector; versterkte inzet op 智能建造 en BIM | 19/27 jan. 2022 | [gov.cn](http://www.gov.cn/zhengce/zhengceku/2022-01/27/content_5670687.htm) |
| 《"十四五"住房和城乡建设信息化规划》 | Verdieping van BIM- en CIM-toepassing in de gehele sector | 十四五-periode | [mohurdic.org.cn](http://www.mohurdic.org.cn/zz/tbgz/art/2023/art_441b526287254cd7b0f06ec201c70c2a.html) |
| BIM-doelstelling 2025 | "2025年，基本形成BIM技术框架和标准体系" | doel 2025 | [zhihu beleidsoverzicht](https://zhuanlan.zhihu.com/p/612163083) |
| 24 智能建造试点城市 | Beijing + 23 andere steden aangewezen als pilotstad, 3-jarige proefperiode | nov. 2022 | [gov.cn](http://www.gov.cn/zhengce/zhengceku/2022-11/09/content_5725611.htm) |
| 《智能建造技术导则（试行）》 建办市〔2025〕14号 | Vereist BIM en digitale technieken voor detaillering, botsingscontrole, materiaaluitgifte en **施工模拟 (uitvoeringssimulatie)** | 2025 | [gov.cn](http://www.gov.cn/zhengce/zhengceku/202503/content_7014454.htm), [soujianzhu](https://www.soujianzhu.cn/NormAndRules/NormContent.aspx?id=2654) |
| Shanghai BIM-drempel | Projecten vanaf **CNY 30 miljoen** moeten BIM toepassen | 2023 | [sohu](https://www.sohu.com/a/676613466_100129758) |
| Shanghai BIM-aanbestedingspilot | Vanaf 1 februari 2025 pilot met BIM-modellen in aanbestedingen + intelligente toetsing | 2025 | [sohu](https://www.sohu.com/a/882689479_121123829) |
| Beijing | Overheidsgefinancierde projecten: BIM over de volledige levenscyclus | — | [zhihu](https://zhuanlan.zhihu.com/p/612163083) |
| 2026-uitrol | Vakpers: binnen de 24 pilotsteden moeten alle nieuwe overheidsprojecten 100 % BIM-forward-design gebruiken; zonder naleving geen bouwvergunning | 2026 | [chinabim.com](https://www.chinabim.com/news/825052161778913285) **[ZWAKKE BRON — vakpers, niet de officiële tekst]** |

**Duiding:** de mandaten gaan over **BIM en simulatie**, niet direct over planningssoftware. Maar 施工模拟 (4D-uitvoeringssimulatie) is expliciet genoemd in de 2025-technische richtlijn, en 4D-simulatie vereist per definitie een planning. Dat trekt planning mee omhoog. Vergelijk het met de EU: de mandaten scheppen vraag naar *modelkoppeling*, niet naar CPM-kwaliteit.

### 5.3 信创 (xinchuang) — verplichte binnenlandse substitutie

De belangrijkste structurele bedreiging voor Oracle en Microsoft in deze markt.

| Maatregel | Inhoud | Bron |
|---|---|---|
| **国资委 79号文** (SASAC-document 79) | Centrale staatsondernemingen moeten hun kernsystemen **vóór eind 2027** volledig vervangen door binnenlandse hard- en software | [HSW Software-analyse](https://www.hswsoftware.com.cn/page199?article_id=264) (pagina zelf niet direct fetchbaar; titel en samenvatting via zoekresultaat) |
| Bredere claim | "2027年前央企国企核心系统需实现100 % 信创替代" | [zhihu](https://zhuanlan.zhihu.com/p/1905934004898756343), [Sina](https://t.cj.sina.com.cn/articles/view/6106520611/16bfa1c23001018pso) |
| Overheidsinkoop — nationale producten | Staatsraad-circulaire over toepassing van standaarden voor binnenlandse producten bij overheidsinkoop | sept. 2025 — [gov.cn](https://www.gov.cn/zhengce/content/202509/content_7042999.htm) |
| 7 inkoopstandaarden basis-hard/software | Ministerie van Financiën + MIIT: standaarden voor besturingssystemen, databases, servers, werkstations, laptops, desktops; van toepassing op partij- en overheidsorganen vanaf gemeentelijk niveau | dec. 2023 — [CSDN-analyse](https://blog.csdn.net/yts1985/article/details/137913960), [sohu](https://www.sohu.com/a/747665002_114984) |
| Handleiding overheidsinkoop binnenlandse software | 中国政府采购网 publiceert expliciete gidsen "如何采购国产化软件" | [ccgp.gov.cn](http://www.ccgp.gov.cn/specialtopic/zfcgxqbz/xgzn/202411/t20241125_23699291.htm) |
| BIM-localisatie | "国产BIM信创技术以自主可控、场景适配、生态协同为核心优势，逐步打破国外技术垄断" | [CSDN](https://blog.csdn.net/lgf228/article/details/147528702) |

**Gevolg voor de planningsmarkt:** CSCEC, CRCC, CREC, CCCC en PowerChina zijn allemaal centrale staatsondernemingen. Zij zijn precies de grootste P6- en MS-Project-klanten in China. Als 79号文 strikt wordt toegepast op projectbeheersingssystemen, verschuift die installed base binnen enkele jaren naar Chinese alternatieven — waarbij 普华 PowerOn en Glodon de meest voor de hand liggende ontvangers zijn.

**Nuance:** overzeese projecten van diezelfde bedrijven blijven P6 gebruiken, omdat de eis daar van de buitenlandse opdrachtgever komt, niet van SASAC. Dat versterkt het dubbelspoor uit §3.2 in plaats van het op te heffen.

### 5.4 Taal en tekenset: GB 18030-2022

- **GB 18030-2022 《信息技术 中文编码字符集》** is een **verplichte** (强制性) nationale norm, van kracht sinds **1 augustus 2023**, met **87.887 Chinese karakters** — 17.000 zeldzame karakters meer dan de 2005-versie (uitbreidingsblokken C, D, E, F). Van toepassing op "需要进行中文处理的信息系统". Bronnen: [SAC](https://www.sac.gov.cn/xw/bzhyw/art/2022/art_1b52e919b7b8434d912342086cb7f132.html), [SAMR](https://www.samr.gov.cn/xw/zj/art/2023/art_76ce782e7c584ea991c3a887d3ad0d02.html), [openstd.samr.gov.cn](https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=A1931A578FE14957104988029B0833D3), [MOE](http://www.moe.gov.cn/jyb_zzjg/huodong/202207/t20220729_649675.html).
- Vanaf **1 oktober 2025** dekt productcertificering ook wijzigingsblad nr. 1 ([CESI](https://www.cc.cesi.cn/news/show-4889.aspx)).
- **Praktisch:** codeer alles in UTF-8 (compatibel), maar zorg dat import/export ook GB18030 en de legacy GBK aankan — Chinese CSV/Excel-exports uit oudere systemen zijn vrijwel altijd GBK/GB18030, niet UTF-8. Ondersteun bovendien de volledige CJK Extension-blokken: Chinese persoons- en plaatsnamen in bouwprojecten gebruiken zeldzame karakters.
- **Overige taal-implicaties:** verticale ruimte in Gantt-labels is anders (Chinese karakters zijn breder maar compacter per woord); afdrukformaten volgen Chinese A3/A1-conventies voor netwerkdiagrammen; datums in `YYYY年M月D日`; de bouwkalender draait om het maanjaar (Chinees Nieuwjaar legt bouwplaatsen 2–4 weken stil — dit móét als kalenderregime modelleerbaar zijn).

### 5.5 Aanbestedingseisen en de rol van het 施工组织设计

- Het **施工组织设计** (uitvoeringsorganisatieplan) is het kerndocument in Chinese aanbestedingen. Het bevat verplicht een uitvoeringsplanning, in het diagramtype dat het aanbestedingsdossier voorschrijft.
- De keuze balkendiagram vs. netwerkdiagram wordt bepaald door complexiteit én door de aanbesteding: balkendiagram voor eenvoudige projecten, netwerkdiagram voor complexe ([Baidu Wenku](https://wenku.baidu.com/view/f456571987868762caaedd3383c4bb4cf7ecb790.html)).
- De planning wordt **beoordeeld als onderdeel van het technisch bod (技术标)** — de kwaliteit van het diagram telt mee in de gunning. Dat verklaart CCPROJECT's obsessie met tekening- en opmaakkwaliteit: het is letterlijk een gunningscriterium.
- Praktijkeffect: veel Chinese planningen worden gemaakt **om te winnen**, niet om uit te voeren. Er is een cultureel gat tussen het aanbestedingsplan en het werkelijke uitvoeringsplan — een van de redenen dat Glodon's PDCA-verhaal (plan-do-check-act met frontlijn-tracking) commercieel aanslaat.

### 5.6 Kanaal, resellers en distributie

- **Glodon** verkoopt zowel direct als via een uitgebreid regionaal agentennetwerk en via zijn eigen community-/servicekanaal **服务新干线 (fwxgx.com)**, dat 340.000 bedrijfsklanten bedient en fungeert als leerplatform, downloadportaal én verkoopkanaal ([sohu](https://www.sohu.com/a/694218360_121090399)).
- **Consolidatie:** Glodon kocht op 23 februari 2011 100 % van 上海兴安得力软件 voor **CNY 320 miljoen** ([Glodon persbericht](https://www.glodon.com/news/87.html)). Daarmee kwam een concurrent met "bijna 400.000 directe gebruikers en 53 % marktaandeel" in kostensoftware binnen — de basis van de huidige dominantie.
- **Oracle:** geen enkele dominante distributeur, maar meerdere gespecialiseerde P6-dienstenbedrijven (zie §3.3.11). Dit versnippert de servicekwaliteit en verhoogt de drempel voor nieuwe P6-klanten.
- **Microsoft:** via 21Vianet (世纪互联) als operator van Microsoft 365 China; aparte binnenlandse en internationale prijslijsten en tenants.
- **Marktplaatsen:** 软服之家 (ruanfujia.com), 选软件 (xuanruanjian.com) en 36氪点评 (36dianping) functioneren als B2B-softwarevergelijkers waar leveranciers offertes kunnen laten aanvragen. Prijzen zijn er zelden publiek — offerte-op-aanvraag is de norm.
- **Taobao/JD:** een substantieel deel van de daadwerkelijke softwaretransacties in de Chinese bouw loopt via consumentenmarktplaatsen — inclusief legale doorverkoop, dongleverhuur en illegale kopieën door elkaar.
- **Bilibili** is het belangrijkste marketing- en trainingskanaal voor bouwsoftware. Glodon publiceert daar zijn trialversies ([Bilibili](https://www.bilibili.com/video/BV1xPS7B7E9b/)); RIB's magere Bilibili-cijfers waren de duidelijkste indicator van hun marktafwezigheid.

### 5.7 Piraterij en de grijze licentiemarkt

Piraterij is in de Chinese bouwsoftwaremarkt geen randverschijnsel maar een **parallelle distributiestructuur**, en Glodon voert er een permanente juridische campagne tegen.

**Gedocumenteerde zaken:**

| Zaak | Omvang | Uitkomst | Bron |
|---|---|---|---|
| **最高人民检察院-publicatie, aug. 2025** (bouwkostensoftware, 11 verdachten) | Legale jaarlicentie dongle ≈ **CNY 15.000**; illegale dongles verkocht op 1/3 van de prijs; kraakprogramma's CNY 400–3.000/stuk; **totale verkoop CNY 25 miljoen**; illegale winst ≈ **CNY 7 miljoen** (hoofdverdachte >CNY 3 mln, tweede verdachte CNY 2,41 mln) | Mei 2024, rechtbank Longchang: alle 11 veroordeeld wegens inbreuk op auteursrecht; 1–3 jaar, meeste voorwaardelijk; hoofdverdachte 3 jaar met 4 jaar proeftijd; >CNY 6 miljoen schadevergoeding | [spp.gov.cn](https://www.spp.gov.cn/spp/zdgz/202508/t20250812_703521.shtml) |
| **Haidian-rechtbank (Beijing), Taobao-winkels** | 9 zaken, 15 verdachten, betrokken bedrag CNY 4,1 miljoen, hoogste boete CNY 1,2 miljoen; illegale dongles CNY 60–300/stuk (2012–2014) | 8 maanden – 5 jaar cel; boetes CNY 20.000 – 1,2 miljoen | [66law](https://lawyers.66law.cn/s2b03961630908_anli31292.aspx), [中国知识产权律师网](https://www.ciplawyer.cn/articles/122597.html) |
| Taobao-verkoop Glodon-dongles | CNY 1,63 miljoen omzet in een half jaar | meerdere veroordelingen van 3,5 jaar | [sohu](https://www.sohu.com/a/388292378_465914) |
| Andere zaak | 5 jaar 6 maanden cel + CNY 1,7 miljoen boete | — | [Baidu Wenku](https://wenku.baidu.com/view/49657224ad8271fe910ef12d2af90242a895abed.html) |
| Adviesbureau met illegale dongles 2018–2019 | 36 softwaredongles in beslag genomen | — | [Glodon safeap](https://safeap.glodon.com/) |

**Structurele kenmerken:**
- Glodon exploiteert een eigen **piraterij-detectiedienst** ([safeap.glodon.com](https://safeap.glodon.com/)) en voert publieke "打击盗版"-campagnes ([Glodon nieuws](https://www.glodon.com/news/182)).
- Die handhaving veroorzaakt periodiek gebruikersweerstand: de "广联达查杀盗版锁风波" waarbij gebruikers klaagden over de kosten van legale software ([zhihu](https://zhuanlan.zhihu.com/p/630827971)).
- Er bestaat een technische grijze industrie rond "D版广联达加密锁授权工具" sinds juli 2022 ([CSDN](https://blog.csdn.net/weixin_42525738/article/details/162537144)).
- **De verhuurmarkt is het meest opvallende fenomeen:** Taobao-verkopers verhuren Glodon-netwerkdongles **per dag** vanaf CNY 5,80, met week-/maand-/kwartaal-/jaar-/"permanent"-pakketten ([Taobao](https://www.taobao.com/list/item/ZWRKOVBKY0VVZGxRYmZlTWF3UHJGUT09.htm)). Er is zelfs een Chinese uitleg over "广联达加密锁可以日租吗？如何判断是否合规？" ([Taobao topic](https://tvgame.taobao.com/topic/cdkey_229/b2942291602542a92859431b8ddbd643.html)). Dit is een legitieme respons op een reëel behoeftepatroon: een uitvoerder heeft de software drie dagen nodig voor een inschrijving, niet een jaar.
- Voor MS Project bestaat een volledige Chinese "破解版"-content-industrie, met breed gedocumenteerde malwarerisico's.

**Strategische les:** in China concurreer je niet met de lijstprijs van je concurrent maar met de kosten van *gratis of vrijwel gratis toegang*. Een gratis, open-source of zeer goedkoop pakket zonder dongle heeft in deze markt een structureel voordeel dat in West-Europa niet bestaat. Omgekeerd: elk dongle-gebaseerd model wordt binnen maanden gekraakt en verhuurd.

### 5.8 Opleidingscultuur

- De Chinese bouw kent een **sterk gecertificeerde beroepsstructuur**: 一级建造师 (Klasse-1 constructor), 二级建造师, 造价工程师, 监理工程师. Circa 1,13 miljoen cumulatieve 一级建造师-registraties, ~130.000 nieuwe initiële registraties in 2024 ([233网校](https://www.233.com/jzs1/zhuce/202501/02113537461485.html), [zhihu](https://zhuanlan.zhihu.com/p/14173869890)).
- De examenstof van 一级建造师 项目管理 bevat **expliciet netwerkplanning volgens JGJ/T 121** ([Edrawsoft-mindmap van het 2023-leerboek, hoofdstuk 3](https://mm.edrawsoft.cn/template/407098)). Iedere gecertificeerde Chinese projectleider heeft dus formeel 双代号/单代号-netwerkplanning geleerd. **Dat is een enorm, kant-en-klaar getraind gebruikersbestand voor CPM-software — en tegelijk een verwachtingspatroon waaraan software móét voldoen.**
- Leveranciers bouwen hun eigen certificeringen: **Glodon GIAC** vanaf CNY 399, Glodon 建筑云课 en docenten-trainingsprogramma's voor hogescholen (szpx.glodonedu.com) — een klassieke academische-inbedding-strategie die de volgende generatie op Glodon-producten opleidt.
- Zelfstudie loopt via **Bilibili, Zhihu, Baidu Wenku, 豆丁网 en 原创力文档** — allemaal met tientallen tutorials over 梦龙 en 斑马 ([voorbeeld: Zhihu-tutorial 斑马](https://zhuanlan.zhihu.com/p/338535489), [梦龙-handleidingen op max.book118.com](https://max.book118.com/html/2022/1207/5032310042010031.shtm)).
- **P6-training** is een aparte, duurdere markt via commerciële trainers (艾威培训) en consultants met internationale ervaring (AIB Software).

### 5.9 Zelfbouw bij staatsaannemers

De grootste Chinese aannemers bouwen in toenemende mate hun eigen digitale platformen — een reële concurrent voor commerciële software op groepsniveau:

- **CSCEC (中国建筑):** 云筑网 (yzw.cn) als groepsbreed platformmatrix; het "中建136工程" digitaliseringsprogramma; 中建四局 hield in maart 2025 een digitaliseringsconferentie met een eigen DMP (数字化管理平台) ([4bur.cscec.com](http://4bur.cscec.com/zjywlbt/202503/3859561.html)); prijswinnende eigen platformen voor wapening-engineering ([cscec.com](https://www.cscec.com/zgjz_new/ztzl_new/zgjzkjz/zlzgjz/znjz/202410/3820591.html)). Tegelijk sloot Glodon een strategisch partnerschap met 中建七局 ([Glodon](https://www.glodon.com/news/1017)) — dus: samenwerken én zelf bouwen.
- **CRCC (中国铁建):** eigen smart-site-platform met modules voor BIM-model, samenwerking, kwaliteit, veiligheid en kosten, geprofileerd door SASAC ([sasac.gov.cn](http://www.sasac.gov.cn/n2588025/n2641616/c15387735/content.html)); 中铁建工集团 lanceerde een bedrijfsbreed "smart control cloud platform" volgens het "12345"-concept ([sohu](https://www.sohu.com/a/569231579_121123785)).
- **CCCC (中交):** 中交路桥科技 bouwvisualisatie-cloudplatform met videobewaking, aanwezigheidsregistratie, kraanbeheer en milieumonitoring ([sohu](https://www.sohu.com/a/926441074_100139277)).

**Duiding:** deze platformen zijn sterk in *toezicht en rapportage* (smart site, IoT, camera's, aanwezigheid) en zwak in *planningsberekening*. Ze consumeren planningen; ze maken ze niet. Dat laat ruimte voor gespecialiseerde CPM-software als API-leverancier — mits die API's, exportformaten en Chinese datastandaarden ondersteunt.

---

## 6. Wat dit betekent voor een westerse/open-source planningsleverancier

Kort en concreet, afgeleid uit het bovenstaande:

1. **Zonder 双代号时标网络图 en 前锋线 ben je niet verkoopbaar** voor binnenlandse Chinese projecten. Dat is geen nice-to-have; het is een normatieve inschrijvingseis. Dit is verreweg de belangrijkste functionele investering.
2. **流水施工 / werkzone-gebaseerde takting** moet een eersteklas concept zijn, niet een work-around met constraints.
3. **Prijsanker: CNY 999/jaar of gratis.** Elk abonnementsmodel boven CNY 3.000/gebruiker/jaar concurreert met CNY 5,80/dag dongleverhuur en verliest.
4. **Geen dongle.** Dongle-gebaseerde bescherming is in deze markt aantoonbaar een gekraakt en verhuurd product binnen maanden.
5. **De P6-brug is een reëel, onderbediend pijnpunt.** Chinese staatsaannemers moeten binnenlands 斑马-achtig plannen en overzees P6-XER leveren, en dat wordt nu handmatig gedaan. Een tool die 双代号-planning én schone XER-export doet, bedient een geschatte markt van 5.000–15.000 planners. (De eerder genoemde CNY 20–28k/maand berust op één vacature en is geen marktgemiddelde — zie §2.5.)
6. **信创 werkt in je voordeel als je open source bent en lokaal draait**, en tegen je als je een buitenlandse cloud-SaaS bent. Een zelf te hosten, offline-capabel, open-source pakket past beter in het Chinese inkoopklimaat dan een westerse SaaS.
7. **GB18030/GBK-import, Chinese kalender met Nieuwjaar-stilstand, en Chinese A1/A3-afdrukformaten** zijn harde lokalisatie-eisen, niet cosmetisch.
8. **Distributie loopt via Bilibili, Zhihu en gratis tutorials in het Chinees**, niet via sales. De marketingkosten zijn laag, de contentkosten zijn hoog.
9. **Verwacht geen trainingsomzet.** Lokale training kost CNY 399–2.000; het is geen verdienmodel maar een acquisitiekanaal.
10. **Wees realistisch over de marktomvang.** Het toegankelijke segment (buiten Glodons gratis-strategie) is na correctie orde **CNY 0,8–2,0 miljard** — nog steeds groot in absolute zin, maar met een gemiddelde opbrengst per gebruiker die een tiende is van West-Europa, en met een onzekerheidsmarge van minstens een factor 2. Bouw geen businesscase op de bovengrens.

---

## 7. Belangrijkste onzekerheden en beperkingen van dit onderzoek

Eerlijkheid over wat ik níét heb kunnen vaststellen:

1. **Er bestaat geen betrouwbare publieke marktmeting voor planningssoftware in China.** De cijfers in §2.3 zijn óf te breed óf commercieel. Mijn schatting in §2.4 is een reconstructie, geen meting.
2. **Glodon publiceert geen omzetuitsplitsing voor 斑马进度计划.** De toerekening binnen het 数字施工-segment (CNY 787 mln in 2024) is mijn schatting.
3. **P6's Chinese installed base is onbekend.** Oracle publiceert geen landencijfers; ik heb geen enkele bron gevonden met een aantal Chinese P6-seats. Mijn 5.000–15.000 is een redenering vanuit vacatures, casestudy's en de omvang van de export-EPC-sector.
4. **Prijzen voor P6 in China komen uit één Chinese content-farm-bron**, gekruisd tegen Oracle's internationale ordegrootte. Behandel ze als indicatief, niet als offerte.
5. **De BIM-marktcijfers spreken elkaar tegen** (CNY 10,25 mrd in 2023 vs. CNY 21,71 mrd in 2024 bij een gemelde CAGR van 16,2 %). Waarschijnlijk verschillende scopes; niet oplosbaar met publieke bronnen.
6. **Ik heb 79号文 niet in de originele tekst kunnen lezen** — de analyse-pagina gaf HTTP 503. De inhoud is bevestigd via drie onafhankelijke secundaire bronnen, maar de exacte reikwijdte (welke systeemcategorieën vallen eronder?) blijft onzeker en is juist voor projectbeheersingssoftware doorslaggevend.
7. **Spider Project, Safran, Deltek Acumen, InEight en RIB Candy leverden nul Chinese resultaten op.** Afwezigheid van bewijs is hier sterk bewijs van afwezigheid (deze markt is goed geïndexeerd in het Chinees), maar het blijft een negatief resultaat.
8. **Zhihu blokkeert directe fetches (HTTP 403).** Enkele belangrijke discussiebronnen zijn alleen via zoeksnippets en een proxy-render benaderd.
9. **Ik heb geen primaire gebruikersinterviews of forumdiepgang kunnen doen.** De voor- en nadelen in §3.3 zijn gedestilleerd uit publieke vergelijkingsartikelen, leveranciersmateriaal en Zhihu-discussies — een deel van die vergelijkingsartikelen is aantoonbaar commercieel geplaatst (de "TOP10-测评"-genre in Chinese media is grotendeels betaalde content). Ik heb dat waar mogelijk gemarkeerd.

---

## 8. Bronnen

### Overheid, normen en beleid
- 住房和城乡建设部 — 《"十四五"建筑业发展规划》: http://www.gov.cn/zhengce/zhengceku/2022-01/27/content_5670687.htm
- 国务院 — 智能建造试点城市(24 steden): http://www.gov.cn/zhengce/zhengceku/2022-11/09/content_5725611.htm
- 住建部 — 《智能建造技术导则（试行）》建办市〔2025〕14号: http://www.gov.cn/zhengce/zhengceku/202503/content_7014454.htm
- 住建部信息中心 — 《"十四五"住房和城乡建设信息化规划》解读: http://www.mohurdic.org.cn/zz/tbgz/art/2023/art_441b526287254cd7b0f06ec201c70c2a.html
- 国务院办公厅 — 政府采购本国产品标准: https://www.gov.cn/zhengce/content/202509/content_7042999.htm
- 中国政府采购网 — 如何采购国产化软件: http://www.ccgp.gov.cn/specialtopic/zfcgxqbz/xgzn/202411/t20241125_23699291.htm
- 国家标准委 — GB 18030-2022 (87.887 karakters, van kracht 2023-08-01): https://www.sac.gov.cn/xw/bzhyw/art/2022/art_1b52e919b7b8434d912342086cb7f132.html
- 市场监管总局 — GB 18030-2022 aankondiging: https://www.samr.gov.cn/xw/zj/art/2023/art_76ce782e7c584ea991c3a887d3ad0d02.html
- 国家标准全文公开系统 — GB 18030-2022: https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=A1931A578FE14957104988029B0833D3
- 中国电子技术标准化研究院 — GB18030 certificering vanaf 2025-10-01: https://www.cc.cesi.cn/news/show-4889.aspx
- JGJ/T 121-2015 《工程网络计划技术规程》 — 工标库: https://www.gongbiaoku.com/mobile/book/y0p18477us1
- JGJ/T 121-2015 toepassingsgebied: https://coyis.com/guifantuji/guifan/2018041117484.html
- JGJ/T 121-2015 — 中国建筑出版社 e-book: https://ebook.chinabuilding.com.cn/zbooklib/book/detail/show?SiteID=1&bookID=59516
- 北京市《投标施工组织设计编制规程》: https://bzh.scjgj.beijing.gov.cn/bzh/apifile/file/2021/20210325/2b20a210-f025-45cc-80c0-42ffbe39beb3.PDF
- 最高人民检察院 — strafzaak illegale encryptiedongles bouwkostensoftware (aug. 2025): https://www.spp.gov.cn/spp/zdgz/202508/t20250812_703521.shtml
- 国资委 — CRCC smart-site profiel: http://www.sasac.gov.cn/n2588025/n2641616/c15387735/content.html

### Statistiek en macro
- 商务部 — 2024年对外承包工程统计: https://www.mofcom.gov.cn/zfxxgk/fdzdgknr/ztfl/tjsj/gwjjhztj/art/2025/art_65dc63635da34a5294625d978bc06653.html
- 中国对外承包工程商会 (JCCIEF) — idem: https://www.jccief.org.cn/v-1-23707.aspx
- 中国建筑业协会 — 《2024年建筑业发展统计分析》 (personeel −12,26 %, marge 2,30 %): https://www.sohu.com/a/870249747_121123767
- 建筑业总产值 2024 (32,65 biljoen, +3,85 %): https://www.sohu.com/a/877285085_122006510
- 建筑业竣工产值 2024: https://www.hbjtjt.com.cn/xwzx/zgsdt/202505/t20250520_152244.shtml
- 国家统计局 — 建筑业增加值 2024 (CNY 89.949 亿元): https://www.cbda.cn/html/yj/20250312/141927.html
- 一级建造师 registraties 2024: https://www.233.com/jzs1/zhuce/202501/02113537461485.html en https://zhuanlan.zhihu.com/p/14173869890
- 特级资质企业 852 stuks: https://zhuanlan.zhihu.com/p/681372234

### Bouw-IT-uitgaven en marktomvang
- 黄奇帆 / 清华大学产业研究院 — 0,08 % vs 1 %: https://www.iii.tsinghua.edu.cn/info/1131/3500.htm
- Dassault Systèmes CEO bevestigt 0,08 %; JV met 中南建筑设计院: https://news.qq.com/rain/a/20241101A09WGG00
- 建筑信息化占总产值 0,1 %: https://www.chinairn.com/news/20230530/142056788.shtml
- 建筑信息化投入-grafiek: https://www.hangyan.co/charts/2776350293095351633
- BIM-markt 2024 CNY 217,1 亿元, CAGR 16,2 %: https://www.huaon.com/channel/trend/1107207.html
- BIM-markt 2023 CNY 102,5 亿元: https://www.toutiao.com/article/7561317968030761510/
- 工程项目管理软件-markt CNY 116 亿元 (zwakke bron): https://juejin.cn/post/7535001600735428654
- Concurrerende claim CNY 820 亿元 (verworpen): https://juejin.cn/post/7536078945658683438

### Glodon (广联达)
- Productpagina 斑马进度计划: https://www.glodon.com/product/204.html
- 斑马进度 编制版 CNY 999/jaar: https://www.fwxgx.com/articles/241537
- 斑马进度 softwaredownload: https://www.fwxgx.com/softwares/922.html
- 斑马进度 officiële site: https://www.zpert.com/frontend/home/index
- 斑马进度 community: https://bbs.zpert.com/t/topic/117
- Gratis-actie "近百万用户 ... 近十万家企业": https://www.fwxgx.com/articles/234293
- 360 dagen gratis: https://zhuanlan.zhihu.com/p/420295832
- Trialversie met AI (Bilibili): https://www.bilibili.com/video/BV1xPS7B7E9b/
- Project-import → automatisch 双代号网络图: https://zhuanlan.zhihu.com/p/395833283
- Tutorial: https://zhuanlan.zhihu.com/p/338535489
- 2025-jaarverslag (omzet CNY 60,68 亿元, netto CNY 4,05 亿元, overzee CNY 2,40 亿元): https://static.cninfo.com.cn/finalpage/2026-03-24/1225024978.PDF
- 2024-jaarverslaganalyse (CNY 62,40 亿元, −4,93 %; marktaandeel >55 %): https://caifuhao.eastmoney.com/news/20250403211915613638780
- Segmentomzet 2024 (数字成本 CNY 49,86 亿元 / 数字施工 CNY 7,87 亿元): https://www.huaon.com/channel/comdata/1085441.html
- Marktaandeel >68 % kostensoftware: https://finance.sina.com.cn/roll/2026-03-26/doc-inhshhra0403855.shtml
- Marktaandeel >60 % + ~30 % bouwmanagement: https://www.toutiao.com/article/7555676931149005355/
- Monopoliediscussie: https://www.zhihu.com/question/435523941
- Overname 兴安得力 (CNY 320 mln, feb. 2011; 400.000 gebruikers, 53 % aandeel): https://www.glodon.com/news/87.html
- 服务新干线 — 340.000 bedrijfsklanten: https://www.sohu.com/a/694218360_121090399
- Anti-piraterij: https://www.glodon.com/news/182 en https://safeap.glodon.com/
- Partnerschap met 中建七局: https://www.glodon.com/news/1017
- Prijsbanden CNY 800–10.300/jaar: https://wenku.baidu.com/view/5458d5f85bbfc77da26925c52cc58bd6318693a4.html
- Servicekosten per project: https://wenku.baidu.com/view/ed0bb1b4950ef12d2af90242a8956bec0975a585.html
- Modulprijzen CNY 7.800–8.200: https://www.itangsoft.com/baike/show-204866.html
- 5D-maatwerk CNY 120.000: https://www.lanyancloud.com/news/1960289126389592064
- GIAC-certificering CNY 399: https://www.jianzhuyu.com/front/couinfo/971.json
- Trainingskosten: https://zhidao.baidu.com/question/661654386424203965.html en https://zhidao.baidu.com/question/467633472356439925.html en https://zhuanlan.zhihu.com/p/27790325849
- 建筑云课: https://ai.glodonedu.com/front/coursecenter/course/detail?courseId=3574130878745805185

### Overige Chinese leveranciers
- 鲁班软件: https://www.lubansoft.com — Baidu Baike (>1 mln installaties): https://baike.baidu.com/item/鲁班软件股份有限公司/60146481 — profiel: https://www.ruanfujia.com/vendor/9229/ — 上海市绿色建筑协会: http://www.shgbc.org/xiehuidongtai/202409120945251860.html — 700+ BIM-projecten: https://www.bimsz.com/mdiyPage/company.html?id=1798243686109466625
- 品茗科技: https://www.pinming.cn/investor.html — winkel: https://shop.pinming.cn/mall/soft/list/?type=2 — 智绘进度计划: https://www.pmddw.com/product/jd/index.html — cijfers 2024: https://news.qq.com/rain/a/20250224A06LVN00 — cijfers 2025: https://www.topnews.cn/news/145CDFE248B14E75 — bedrijfsprofiel: https://www.sohu.com/a/949765038_122014422
- PKPM 施工管理软件: https://www.lanyancloud.com/news/1970104280388157440 — BIM-platform: https://wenku.baidu.com/view/2dab734c79563c1ec5da7152.html — prijzen CNY 8.000–150.000: https://www.zhemaiyun.com/news/2004493348886437888 — structuurmodule-prijzen: https://www.wandingsujiao.cn/jiegou/248.html — illegale PKPM bij overheidsinstantie: https://www.lanyancloud.com/news/1958765196327690240
- 普华科技 / PowerOn: https://www.powerpms.com/childernPage/ProductCenter/ProductCenter_PowerOn.html — productoverzicht: https://www.p3china.com/childernPage/Template/ProductCenter.html — PowerOn PDF: https://www.p3china.com/UpLoadFile/productCenter/PowerOn工程乙方项目管理信息集成平台.pdf — historie als P3-distributeur sinds 1992: https://baike.baidu.com/item/上海普华科技发展股份有限公司/20037088 en http://www.mypm.net/software/show_provider_info.asp?ID=1074 — CHINCA-lidmaatschap: http://www.chinca.org/CICA/Member/Query/Show/100020230607
- 建文软件 (Jawin): https://www.justwin.cn en https://www.justwin.cn/epc.html
- 邦永 PM2: http://www.pm2.com.cn/soft/ — licentiemodel: https://www.36dianping.com/qa/26489.html — prijsband: https://www.xuanruanjian.com/brand/789_EA16C22D4C10D32C885DBFAB.phtml
- 恒智天成: https://www.hztc.com.cn — profiel: https://www.sohu.com/a/1008302863_122016332
- 智多星: https://www.wisestar.cn
- TOP10-vergelijking Chinese engineering-PM-software: https://www.sohu.com/a/922950912_122460312 en https://www.sohu.com/a/923004172_121342678
- ONES-vergelijking (incl. Oracle P6, 邦永 PM2, 普华): https://ones.cn/blog/tools/2026-engineering-project-management-software-guide-2
- 梦龙网络计划 (legacy): https://www.jd.com/hprm/6706c3db029865da53a.html — handleiding: https://max.book118.com/html/2022/1207/5032310042010031.shtm
- CCPROJECT 西西 — recensie/handleiding en prijzen: via 华军软件园, CO土木在线 en Baidu Wenku (zoekresultaten Baidu, juli 2026)

### Westerse leveranciers in China
- Oracle Primavera P6 (CN): https://www.oracle.com/cn/construction-engineering/primavera-p6/
- CSCEC International P6 EPPM-casus: https://www.aib-software.cn/cases-cscec-international/
- AIB Software training: https://www.aib-software.cn/training/
- 奥赛多(北京)科技 — P6-verkoop: https://www.osydo.com/p6rjxs
- 北京普为海通 (2007) — P6-diensten: https://www.bjpowerway.com/info.aspx?catID=13&subcatID=38
- P6-distributeur op 软服之家: https://www.ruanfujia.com/software/27608/reseller/
- 艾威培训 P6-cursussen: https://www.avtechcn.com/ap/pm/27011.html en https://www.avtechcn.com/ap/pm/25974.html
- P6-prijsanalyse (zwakke bron): https://www.lanyancloud.com/news/1964886467511795712
- 中国中铁 gebruikt P6: https://www.lanyancloud.com/news/1997113856438198272
- P6 op overzeese waterkracht-EPC (Maleisië/Indonesië): https://xueshu.baidu.com/usercenter/paper/show?paperid=1h0w0mu0a4250em04x490vy0xb723148
- 中国能建云南火电 P6-training in Egypte (aug. 2025): http://www.ytpc.ceec.net.cn/art/2025/8/6/art_47374_2517726.html
- Microsoft Project China-prijzen (21Vianet): https://www.ms365.com.cn/plans-indep/82
- Microsoft Project China (officieel): https://www.microsoft.com/zh-cn/microsoft-365/project/microsoft-project-enterprise-plans-and-pricing
- Vergelijking MS Project / Glodon / P6: https://www.sohu.com/a/953333339_122546448
- Waarom China 斑马 verkiest boven Project/P3/P6: https://zhuanlan.zhihu.com/p/26234429238
- 4D-tools vergelijking: https://zhuanlan.zhihu.com/p/78314669 en https://www.zhemaiyun.com/news/1960814459991834624 en https://www.lanyancloud.com/news/1964419892912537600 en https://www.zhemaiyun.com/news/2001020970617430016
- Trimble TILOS in China: https://baike.baidu.com/item/tilos/7688505 en https://titgroup.cn/productinfo/1579707.html en https://www.ybzhan.cn/st159665/product_16083829.html
- Asta Powerproject Chinese productintroductie: https://wenku.baidu.com/view/17f22953be23482fb4da4c31.html
- Smartsheet geblokkeerd in China: https://community.smartsheet.com/discussion/70274/access-blocked-from-china-workarounds en https://community.smartsheet.com/discussion/128883/users-from-china-cannot-logon en https://appinchina.co/does-smartsheet-work-in-china/
- Asana-alternatieven wegens 国产化-eisen: https://blog.csdn.net/hyang1226/article/details/144292579

### Chinese algemene PM-SaaS en open source
- Vergelijking 16 Chinese PM-systemen: https://zhuanlan.zhihu.com/p/1919076797934475051
- PingCode-vergelijking 9 platformen: https://docs.pingcode.com/baike/5227704
- 30 samenwerkingstools vergeleken: https://www.cnblogs.com/worktile/articles/18932524
- 10 tools 2026: https://zhuanlan.zhihu.com/p/2000650800259700104
- ProjectLibre-gids: https://zhuanlan.zhihu.com/p/488577569
- ProjectLibre als gratis Project-alternatief: https://blog.csdn.net/weixin_28366053/article/details/159848274
- GanttProject: https://kaiyuanapp.cn/ganttproject-免费开源的桌面项目调度与管理工具/

### 信创 en localisatie
- 国资委 79号文-analyse (5 jaar tot volledige substitutie): https://www.hswsoftware.com.cn/page199?article_id=264
- 2027 100 % 信创-substitutie: https://zhuanlan.zhihu.com/p/1905934004898756343
- Routekaart 2027, 10 sectoren: https://t.cj.sina.com.cn/articles/view/6106520611/16bfa1c23001018pso
- 信创-omvang 2026–2027: https://zhuanlan.zhihu.com/p/2030221474141881114
- 7 inkoopstandaarden basis-hard/software (dec. 2023): https://blog.csdn.net/yts1985/article/details/137913960 en https://www.sohu.com/a/747665002_114984
- 国产BIM信创: https://blog.csdn.net/lgf228/article/details/147528702

### Piraterij
- 最高人民检察院-zaak (zie boven): https://www.spp.gov.cn/spp/zdgz/202508/t20250812_703521.shtml
- Haidian-rechtbank, 9 zaken / 15 verdachten / CNY 4,1 mln: https://lawyers.66law.cn/s2b03961630908_anli31292.aspx
- 15 Taobao-winkeliers veroordeeld, dongles CNY 60–300: https://www.ciplawyer.cn/articles/122597.html
- Taobao-verkoop CNY 1,63 mln in half jaar: https://www.sohu.com/a/388292378_465914
- 5,5 jaar cel + CNY 1,7 mln boete: https://wenku.baidu.com/view/49657224ad8271fe910ef12d2af90242a895abed.html
- "查杀盗版锁"-controverse: https://zhuanlan.zhihu.com/p/630827971
- Grijze dongle-autorisatietools sinds 2022: https://blog.csdn.net/weixin_42525738/article/details/162537144
- Dongleverhuur CNY 5,80/dag op Taobao: https://www.taobao.com/list/item/ZWRKOVBKY0VVZGxRYmZlTWF3UHJGUT09.htm
- Uitleg legaliteit dongleverhuur: https://tvgame.taobao.com/topic/cdkey_229/b2942291602542a92859431b8ddbd643.html
- MS Project 破解版-risico's: https://www.lanyancloud.com/news/1965583561016950784 en https://zhidao.baidu.com/question/1588917115632097260.html

### Staatsaannemers en zelfbouw
- CSCEC 云筑网: https://www.yzw.cn
- CSCEC digitale industrie: https://www.cscec.com/zgjz_new/ztzl_new/zgjzkjz/zlzgjz/znjz/202410/3820591.html
- 中建四局 digitaliseringsconferentie 2025: http://4bur.cscec.com/zjywlbt/202503/3859561.html
- 中建安装 eigen platform: http://inco.cscec.com/inco/xwzx_new_41667/gsyw/202303/3639643.html
- 中铁建工 cloudplatform: https://www.sohu.com/a/569231579_121123785
- 中交路桥科技 platform: https://www.sohu.com/a/926441074_100139277

### Aanbesteding en planningspraktijk
- Balkendiagram vs. netwerkdiagram, keuze volgt aanbestedingsdossier: https://zhuanlan.zhihu.com/p/434047231 en https://zhuanlan.zhihu.com/p/434714128
- 施工组织设计 横道图/网络图: https://wenku.baidu.com/view/f456571987868762caaedd3383c4bb4cf7ecb790.html en https://wenku.baidu.com/view/8d2f5a4ba68da0116c175f0e7cd184254b351bc3.html
- 一级建造师 leerboek — netwerkplanning: https://mm.edrawsoft.cn/template/407098
- P6-planningsvacatures China: https://www.liepin.com/s/964c62c630a1e96fca822da8ca880688/ en https://www.zhaopin.com/jobdetail/CC000589080J40739285813.htm
- P6 in EPC-contractomstandigheden: https://zhuanlan.zhihu.com/p/606578864

---

*Rapport opgesteld 25 juli 2026. Alle URL's geraadpleegd op die datum. Waar een pagina een fetch-fout gaf (HTTP 403/503) is dat in de tekst vermeld en zijn de gegevens uit zoekmachinesnippets of secundaire bronnen afgeleid.*

---

## Verificatie

**Uitgevoerd:** 25 juli 2026, als adversariële fact-check — opzet was om elke bewering te *weerleggen*, niet te bevestigen. Onafhankelijk webonderzoek, grotendeels in het Chinees, met andere zoekpaden dan het oorspronkelijke rapport. Alle rekensommen zijn nagerekend.

**Methodologische beperking van deze verificatie:** het WebSearch-budget van de sessie was uitgeput; verificatie liep via directe fetches en een DuckDuckGo-HTML-zoekproxy. Dat werkt goed voor Chineestalige bronnen, maar snippet-verificatie is zwakker dan het lezen van het primaire document. Waar ik alleen snippets zag, staat dat er expliciet bij. Eén primaire bron (`ms365.com.cn`) gaf HTTP 503 en kon niet direct worden gelezen.

**Samenvattend oordeel:** de *structurele* analyse van het rapport houdt goed stand — de tweedeling binnenland/export, de rol van het 双代号时标网络图, Glodons dominantie, de piraterij-economie. De *kwantitatieve* kern is zwakker dan gepresenteerd: de headline-marktomvang is naar beneden bijgesteld, en twee "harde ankercijfers" bleken elkaar tegen te spreken. Eén feitelijke fout over een lokaal pakket (梦龙) is gecorrigeerd.

### Gecontroleerde beweringen

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| 1 | Bouwproductie 2024 = CNY 326.501,11 × 10⁸ (+3,85 %) | **bevestigd** | Letterlijk teruggevonden: "全国建筑业企业完成建筑业总产值326501.11亿元，同比增长3.85%". Groei 1,41 pp lager dan 2023; derde jaar op rij vertragend. | [zoekverificatie](https://html.duckduckgo.com/html/?q=2024%E5%B9%B4+%E5%BB%BA%E7%AD%91%E4%B8%9A%E6%80%BB%E4%BA%A7%E5%80%BC+326501%E4%BA%BF%E5%85%83+%E5%A2%9E%E9%95%BF3.85%25) |
| 2 | Bouwpersoneel 59,62 mln, −12,26 % in 2024 | **bevestigd, met scope-nuance** | "2024年，直接从事生产经营活动的平均人数5,962.07万人，同比减少12.26%". Let op: dit is het *gemiddeld aantal direct in productie/bedrijfsvoering werkzame personen bij bouwbedrijven*, niet de totale werkgelegenheid in de bouwsector. Het rapport gebruikt het als "werkzame personen in de bouw" — te breed geformuleerd. | [zoekverificatie](https://html.duckduckgo.com/html/?q=2024%E5%B9%B4+%E5%BB%BA%E7%AD%91%E4%B8%9A+%E4%BB%8E%E4%B8%9A%E4%BA%BA%E6%95%B0+5962%E4%B8%87%E4%BA%BA+%E4%B8%8B%E9%99%8D) |
| 3 | 0,08 %-anker (bouw-IT als % bouwproductie), "bevestigd door Dassault-CEO" | **gecorrigeerd** | Drie problemen: (a) het cijfer stamt uit artikelen van **2021–2022** (清华大学互联网产业研究院, 中国建筑业协会 als statistische bron) en wordt in het rapport op 2024-productie toegepast; (b) Pascal Daloz die het in nov. 2024 herhaalt is géén onafhankelijke bevestiging maar dezelfde bron; (c) **intern inconsistent**: de eveneens geciteerde CNY 38,1 mrd bouw-informatiseringsmarkt voor 2021 gedeeld door de geverifieerde bouwproductie 2021 van CNY 293.079 × 10⁸ geeft **0,13 %**, niet 0,08 %. Waarschuwingsblok toegevoegd in §2.2. | [0,08 %-herkomst](https://html.duckduckgo.com/html/?q=%E9%BB%84%E5%A5%87%E5%B8%86+%E5%BB%BA%E7%AD%91%E4%BF%A1%E6%81%AF%E5%8C%96+0.08%25); [CNY 38,1 mrd 2021](https://html.duckduckgo.com/html/?q=%E5%BB%BA%E7%AD%91%E4%BF%A1%E6%81%AF%E5%8C%96+%E5%B8%82%E5%9C%BA%E8%A7%84%E6%A8%A1+2021%E5%B9%B4+381%E4%BA%BF%E5%85%83); [bouwproductie 2021](https://html.duckduckgo.com/html/?q=2021%E5%B9%B4+%E5%85%A8%E5%9B%BD%E5%BB%BA%E7%AD%91%E4%B8%9A%E6%80%BB%E4%BA%A7%E5%80%BC+293079%E4%BA%BF%E5%85%83) |
| 4 | **Marktomvang planningssoftware CNY 1,5–3,0 mrd (USD 210–420 mln), punt CNY 2,1 mrd** | **gecorrigeerd — te hoog** | Vier bevindingen. (a) *Rekenfout:* stap 2 gaf CNY 250–690 mln, maar 118/0,60 = **197**, niet 250 — de ondergrens combineerde de bovengrens van de omzetschatting met de bovengrens van het aandeel. (b) *Onverantwoorde ophoging:* de bottom-up levert CNY 0,95–3,0 mrd, waarna de gepubliceerde ondergrens zonder motivering naar 1,5 mrd gaat. (c) *Plafondtoets:* Glodons 数字施工-omzet CNY 787 mln bij ~30 % aandeel impliceert een totale markt voor bouwuitvoeringssoftware van ≈ **CNY 2,6 mrd** — een planningssegment van 1,5–3,0 mrd zou daar 58–115 % van zijn, wat de eigen aanname (planning = 8–15 % van bouw-IT) tegenspreekt. (d) *Zwakste post is de grootste:* "planningsmodules in PM/ERP-suites" (CNY 400–1.200 mln, ~40 % van de puntschatting) heeft geen enkele bron. **Herzien naar CNY 0,8–2,0 mrd, punt ≈ CNY 1,2 mrd.** Valuta-omrekeningen zelf kloppen. | eigen herberekening, §2.4; plafondtoets o.b.v. [Glodon-marktaandeel](https://html.duckduckgo.com/html/?q=%E5%B9%BF%E8%81%94%E8%BE%BE+%E6%96%BD%E5%B7%A5%E7%AE%A1%E7%90%86%E8%BD%AF%E4%BB%B6+%E5%B8%82%E5%8D%A0%E7%8E%87+%E7%BA%A630%25) |
| 5 | Top-down kruiscontrole (8–15 % × CNY 15–25 mrd) is "consistent" | **gecorrigeerd** | De rekensom klopt (CNY 1,2–3,8 mrd), maar het is **geen onafhankelijke controle**: de CNY 15–25 mrd is zelf afgeleid uit hetzelfde 0,08 %-anker als de rest. Twee schattingen op één anker bevestigen elkaar niet. Bovendien is de 8–15 %-ratio een westers budgetpatroon, toegepast op een markt waarvan het rapport zelf betoogt dat die structureel afwijkt. | eigen analyse, §2.4 |
| 6 | Glodon 数字施工-segment CNY 786,87 mln in 2024 | **bevestigd** | 7,87 亿元, −8,71 % j-o-j, brutomarge 35,87 % (+4,40 pp). 数字成本 49,86 亿元 = 79,92 % van de omzet; die verhouding impliceert een totaal van 62,4 亿元 en is dus intern consistent. | [zoekverificatie](https://html.duckduckgo.com/html/?q=%E5%B9%BF%E8%81%94%E8%BE%BE+2024%E5%B9%B4%E6%8A%A5+%E6%95%B0%E5%AD%97%E6%96%BD%E5%B7%A5+%E8%90%A5%E4%B8%9A%E6%94%B6%E5%85%A5) |
| 7 | Glodon ~30 % in bouwmanagementsoftware; >68 % in kostensoftware | **bevestigd** | Twee onafhankelijke weergaven: "在施工信息化领域（如数字施工），市场占有率约30%" (Toutiao) en "施工管理软件业务占据约30%市场份额" (Eastmoney). Kostensoftware >68 % eveneens meervoudig bevestigd. **Nuance:** de 30 % slaat op 施工信息化/数字施工 in den brede, niet op planningssoftware specifiek. Een derde treffer (Baidu Wenku) claimt "2025年施工管理软件业务收入为42.3亿元，市场占有率为42.3%" — omzet en aandeel exact hetzelfde getal, een duidelijk teken van gegenereerde of gefabriceerde inhoud; **niet gebruiken**. | [zoekverificatie](https://html.duckduckgo.com/html/?q=%E5%B9%BF%E8%81%94%E8%BE%BE+%E6%96%BD%E5%B7%A5%E7%AE%A1%E7%90%86%E8%BD%AF%E4%BB%B6+%E5%B8%82%E5%8D%A0%E7%8E%87+%E7%BA%A630%25) |
| 8 | Glodon FY2024 CNY 6,240 mrd / FY2025 CNY 6,068 mrd | **grotendeels bevestigd, FY2024 onzeker** | FY2025 bevestigd: "2025年公司实现营业收入60.68亿元…净利润4.05亿元，同比大幅增长61.77%". Maar de gerapporteerde daling van **−2,17 %** impliceert een basis van ≈ CNY 6,203 mrd, niet 6,240 mrd (dat zou −2,76 % geven). Beide waarden circuleren voor 2024. Voetnoot toegevoegd. De claim "overzee CNY 240 mln, +18,18 %" kon ik **niet** bevestigen. | [zoekverificatie](https://html.duckduckgo.com/html/?q=%E5%B9%BF%E8%81%94%E8%BE%BE+2025%E5%B9%B4%E5%BA%A6%E6%8A%A5%E5%91%8A+%E8%90%A5%E4%B8%9A%E6%94%B6%E5%85%A5+60.68%E4%BA%BF%E5%85%83) |
| 9 | Pinming FY2024 CNY 447 mln, nettowinst CNY 31,2 mln (+150,96 %) | **gecorrigeerd** | Het definitieve jaarverslag (19 apr. 2025) geeft omzet CNY 447 mln **+2,69 %** en 归母净利润 **CNY 31,48 mln, +153,27 %**. De cijfers in het rapport kwamen uit het 业绩快报 van februari 2025 (voorlopig). Klein verschil, maar het rapport presenteerde voorlopige cijfers als definitief. FY2025 (CNY 437 mln / CNY 46,6 mln) kon ik **niet** bevestigen. | [zoekverificatie](https://html.duckduckgo.com/html/?q=%E5%93%81%E8%8C%97%E7%A7%91%E6%8A%80+2024%E5%B9%B4%E6%8A%A5+%E8%90%A5%E4%B8%9A%E6%94%B6%E5%85%A5+4.47%E4%BA%BF) |
| 10 | **梦龙 lag "10 jaar stil", Glodon bouwde de opvolger** | **gecorrigeerd — feitelijke fout** | Glodon heeft **北京梦龙软件技术有限公司 op 9 december 2010 voor CNY 94,34 miljoen volledig overgenomen** (100 % aandelen, uit overtekende IPO-middelen; Glodon beursgang mei 2010). 北京广联达斑马科技有限公司 werd pas op 22 maart 2016 opgericht. Menglong is dus geen onafhankelijke legacy-concurrent maar sinds 2010 eigendom van Glodon — wat de concurrentieanalyse raakt: er is één serieuze binnenlandse aanbieder minder dan het rapport suggereerde. De oorspronkelijke bewering steunde op één stuk leveranciers-productcommunicatie via Baidu-snippets; precies het type enkelvoudige bron waar dit rapport voorzichtig mee had moeten zijn. | [zoekverificatie overname](https://html.duckduckgo.com/html/?q=%E5%B9%BF%E8%81%94%E8%BE%BE+%E6%94%B6%E8%B4%AD+%E5%8C%97%E4%BA%AC%E6%A2%A6%E9%BE%99%E8%BD%AF%E4%BB%B6%E6%8A%80%E6%9C%AF+9434%E4%B8%87%E5%85%83) |
| 11 | 斑马进度编制版 CNY 999/jaar | **bevestigd, met nuance** | Letterlijk: "新版发布｜斑马进度编制版，仅需999元/年". Maar de aankondiging staat onder "感恩回馈，礼遇升级" — het is een **actie-/introductieprijs**, niet aantoonbaar de permanente lijstprijs. Het rapport gebruikt CNY 999 als vast prijsanker voor meerdere conclusies (o.a. de "8–25× duurder"-factor en aanbeveling 3 in §6); dat is op een actieprijs gebouwd. | [zoekverificatie](https://html.duckduckgo.com/html/?q=%E6%96%91%E9%A9%AC%E8%BF%9B%E5%BA%A6%E8%AE%A1%E5%88%92+%E7%BC%96%E5%88%B6%E7%89%88+999%E5%85%83+%E4%BB%B7%E6%A0%BC) |
| 12 | 斑马: >10.000 bedrijven, >200.000 professionals | **onzeker** | Alleen terug te vinden in door de leverancier beheerde kanalen (productpagina's, geautoriseerde wederverkopers, lesmateriaal). **Geen enkele onafhankelijke bevestiging.** Het rapport markeert dit zelf al als leveranciersclaim — die behandeling is correct en blijft staan. Ook de afgeleide claim "斑马 is marktleider in planning" heeft geen meting onder zich: er bestaat geen marktaandeelcijfer voor planningssoftware specifiek. Plausibel, niet gemeten. | [zoekverificatie](https://html.duckduckgo.com/html/?q=%E5%B9%BF%E8%81%94%E8%BE%BE+%E6%96%91%E9%A9%AC%E8%BF%9B%E5%BA%A6%E8%AE%A1%E5%88%92+%E4%B8%87%E5%AE%B6%E4%BC%81%E4%B8%9A+20%E4%B8%87) |
| 13 | CCPROJECT CNY 1.500 (zonder factuur) / CNY 1.800 (met factuur), perpetual | **bevestigd — sterker onderbouwd dan in het rapport** | Officiële prijspagina, letterlijk: "开发票价格：1800元（可开增值税普通发票或专用发票）不开发票价格：1500元". Leverancier **杭州西铭软件工作室**, verkoopt ook via Taobao à CNY 1.800. Het rapport gaf hier alleen "officiële verkoopinformatie via zoekresultaat"; de vindplaats is nu concreet (**ccproject.cn**). De genoemde goedkopere variant van ~CNY 680 kon ik **niet** bevestigen — die claim is verwijderd/gemarkeerd. | [ccproject.cn](https://www.ccproject.cn), via [zoekverificatie](https://html.duckduckgo.com/html/?q=CCPROJECT+%E8%A5%BF%E8%A5%BF%E8%BF%9B%E5%BA%A6%E8%AE%A1%E5%88%92%E7%BC%96%E5%88%B6%E8%BD%AF%E4%BB%B6+%E4%BB%B7%E6%A0%BC+1500+1800) |
| 14 | MS Project China: Planner Plan 1 CNY 555; Plan 3 CNY 2.378 | **deels bevestigd** | **Plan 3 CNY 2.378/gebruiker/jaar bevestigd** via meerdere weergaven van de 世纪互联-prijzen. **Planner Plan 1 CNY 555 niet onafhankelijk bevestigd**; de primaire bron (`ms365.com.cn/plans-indep/82`) gaf bij hercontrole **HTTP 503**. De internationale-versieprijzen (CNY 924 / CNY 2.784) evenmin bevestigd. Behandel alles behalve Plan 3 als onzeker. | [zoekverificatie](https://html.duckduckgo.com/html/?q=Microsoft+Project+Plan+3+%E4%B8%AD%E5%9B%BD+%E4%B8%96%E7%BA%AA%E4%BA%92%E8%81%94+%E4%BB%B7%E6%A0%BC+2378) |
| 15 | P6-prijzen China "in dezelfde orde als internationaal"; P6 8–25× duurder dan 斑马 | **gecorrigeerd** | Oracle internationaal: P6 Professional als **perpetual named-user** ≈ **USD 2.500–4.240 eenmalig** + **USD 500–800/jaar** support (reseller- en licentieadviesopgaven; Oracle publiceert geen lijstprijs). De Chinese bron geeft **jaarlijks terugkerende** CNY 8.000–25.000 (USD 1.120–3.500/jaar) — een andere licentiemodaliteit, dus "dezelfde orde" is niet houdbaar. De factor **8–25×** vergelijkt bovendien P6-professioneel met 斑马's goedkoopste (actie)tarief; tegen de in het rapport zelf geschatte 斑马-professional-prijs is de factor **1–8×**. Richting van de conclusie blijft, de factor is opgeblazen. De onderliggende Chinese prijsbron blijft een content-farm en wordt in het rapport terecht als **[ZWAKKE BRON]** gemarkeerd. | [Oracle-prijsverificatie](https://html.duckduckgo.com/html/?q=Oracle+Primavera+P6+Professional+list+price+per+named+user+perpetual) |
| 16 | JGJ/T 121-2015 als "normatieve inschrijvingseis" | **gecorrigeerd** | Datum, uitgever en vervanging bevestigd: 住建部, uitgegeven 13 maart 2015, van kracht 1 november 2015, JGJ/T 121-99 gelijktijdig ingetrokken. **Maar de "/T" betekent 推荐性行业标准 — een aanbevolen, niet-verplichte branchenorm.** De norm dwingt zelf niets af; de bindende werking komt uit het 招标文件. Het rapport noemt dit "een technische norm" en "geen culturele maar een normatieve barrière" — praktisch klopt het effect, juridisch is de formulering te sterk. Aangepast naar een de-facto- i.p.v. de-jure-formulering. | [zoekverificatie](https://html.duckduckgo.com/html/?q=JGJ%2FT+121-2015+%E5%B7%A5%E7%A8%8B%E7%BD%91%E7%BB%9C%E8%AE%A1%E5%88%92%E6%8A%80%E6%9C%AF%E8%A7%84%E7%A8%8B+%E5%AE%9E%E6%96%BD%E6%97%A5%E6%9C%9F) |
| 17 | 国资委 79号文: staatsondernemingen 100 % 信创 vóór eind 2027 | **onzeker — blijft tweedehands** | Meerdere onafhankelijke weergaven zijn onderling consistent (eind 2027, 100 % vervanging van 信息化系统 over de keten besturingssysteem–database–middleware–applicatiesoftware; plannen in te dienen nov. 2022, kwartaalrapportage vanaf jan. 2023). **Maar de originele tekst is nergens publiek**; alle bronnen parafraseren. Het rapport erkent dit al in §7.6. Voor planningssoftware is juist de open vraag doorslaggevend: valt applicatiesoftware voor projectbeheersing eronder, en per wanneer? Onbeantwoord. | [zoekverificatie](https://html.duckduckgo.com/html/?q=%E5%9B%BD%E8%B5%84%E5%A7%9479%E5%8F%B7%E6%96%87+2027%E5%B9%B4+%E4%BF%A1%E5%88%9B+%E5%A4%AE%E4%BC%81+%E6%9B%BF%E4%BB%A3) |
| 18 | Shanghai: BIM verplicht bij projecten ≥ CNY 30 mln | **bevestigd** | Meervoudig bevestigd, met het beleidsstuk erbij: 《上海市全面推进建筑信息模型技术深化应用的实施意见》, 沪住建规范联〔2023〕14号 (2023). Het rapport noemde alleen jaartal en drempel; het documentnummer is nu vastgesteld. | [zoekverificatie](https://html.duckduckgo.com/html/?q=%E4%B8%8A%E6%B5%B7+BIM+3000%E4%B8%87%E5%85%83%E4%BB%A5%E4%B8%8A+%E5%BC%BA%E5%88%B6+%E5%BA%94%E7%94%A8BIM) |
| 19 | 普华科技 opgericht 1992, in datzelfde jaar P3-distributeur | **bevestigd** | "上海普华科技发展股份有限公司成立于1992年9月23日" en "同年成为美国Primavera（P3）软件在中国境内的代理商". Corroboratie vanaf het eigen domein p3china.com. **Nuance:** de primaire vindplaats is Baidu Baike, dat gebruikersbewerkt is; de bedrijfseigen site bevestigt de strekking maar is niet onafhankelijk. Voldoende voor de conclusie in §3.3.7. | [zoekverificatie](https://html.duckduckgo.com/html/?q=%E4%B8%8A%E6%B5%B7%E6%99%AE%E5%8D%8E%E7%A7%91%E6%8A%80+1992+Primavera+P3+%E4%B8%AD%E5%9B%BD%E6%80%BB%E4%BB%A3%E7%90%86) |
| 20 | P6-planners verdienen CNY 20.000–28.000/maand in Shanghai | **onzeker** | Er is één vacature met "计划工程师 P6 上海 20K–28K". Dat is een enkele waarneming, geen salarisonderzoek; het rapport formuleerde het als een bandbreedte voor de beroepsgroep. Extra risico: "P6" is in Chinese vacatureteksten óók het functieniveau van Alibaba en verwante techbedrijven (bijv. "P6：年薪35-50万"), waardoor zoeken op "P6 + salaris" systematisch vervuilde treffers geeft. Onderliggende stelling (P6-vaardigheid is schaars, betaalt bovengemiddeld) blijft plausibel maar onbewezen. | [zoekverificatie](https://html.duckduckgo.com/html/?q=%E8%AE%A1%E5%88%92%E5%B7%A5%E7%A8%8B%E5%B8%88+P6+%E4%B8%8A%E6%B5%B7+%E6%8B%9B%E8%81%98+%E8%96%AA%E8%B5%84+20K+28K) |
| 21 | "Er bestaat geen betrouwbare publieke meting van dit segment" | **bevestigd** | Gerichte zoektocht naar cijfers van met naam genoemde onderzoeksbureaus (IDC, 赛迪/CCID, 艾瑞, 头豹, 贝哲斯) leverde wél verwijzingen op — IDC heeft segmentatiedata over 工程项目管理软件 (grote ondernemingen = 47 % van de markt in 2025) — maar **geen toegankelijk totaalcijfer in 亿元**. De kernstelling van het rapport houdt dus stand: publiek is er geen bruikbare meting van dit segment. | [zoekverificatie](https://html.duckduckgo.com/html/?q=%E4%B8%AD%E5%9B%BD+%E5%B7%A5%E7%A8%8B%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86%E8%BD%AF%E4%BB%B6+%E5%B8%82%E5%9C%BA%E8%A7%84%E6%A8%A1+IDC+%E8%B5%9B%E8%BF%AA) |
| 22 | MS Project ondersteunt geen 双代号网络图 (AOA) | **bevestigd (op technische gronden)** | Microsoft Project werkt uitsluitend met het precedence-diagram/activity-on-node-model; er is geen AOA-weergave en geen 时标网络图 met 前锋线. Dit volgt uit het productontwerp en is niet controversieel. De Chinese bronnen die het rapport aanhaalt zijn zwak (CSDN/Baidu), maar de bewering zelf is juist. | productkennis + Chinese vakbronnen zoals aangehaald in §5.1 |

### Wat níét geverifieerd kon worden

Deze beweringen bleven buiten bereik van deze controle en moeten als onbevestigd gelden:

- **Taobao-dongleverhuur vanaf CNY 5,80/dag** — een individuele marktplaatsadvertentie, vluchtig en niet reproduceerbaar te controleren. De bredere stelling (er bestaat een verhuurmarkt voor Glodon-dongles) is via meerdere kanalen plausibel; het exacte prijspunt niet. Dit cijfer draagt aanbeveling 3 in §6 ("je echte concurrent is CNY 5,80 per dag") — bouw daar geen prijsstrategie op zonder eigen waarneming.
- **Pinming FY2025** (CNY 437 mln / nettowinst CNY 46,6 mln) — één bron, niet bevestigd.
- **Glodon overzeese omzet CNY 240 mln, +18,18 %** — niet bevestigd.
- **Glodon-prijsbanden CNY 800–10.300/jaar** (Baidu Wenku) — de basis onder de eigen schatting van professional-/enterprise-prijzen; Baidu Wenku is een gebruikersuploadplatform zonder redactie. De hele prijsladder voor 斑马 boven het instaptarief blijft daarmee speculatief.
- **De P6-prijstabel in §3.3.11 als geheel** — één Chinese content-farm-bron; alleen de ordegrootte is tegen internationale opgaven gekalibreerd, en die kalibratie bleek zelf niet te kloppen (zie #15).
- **Aantallen planners (150.000–400.000 / 20.000–60.000 / 5.000–15.000)** — dit zijn constructies uit ankerpunten, geen metingen. De ankerpunten (59,62 mln bouwmedewerkers, ~1,13 mln 一级建造师) zijn deels geverifieerd; de afleiding ernaartoe is niet toetsbaar. Behandel als ordegrootte-indicatie.

### Aanbevolen vervolgstappen

1. **Glodons jaarverslagen zelf lezen** (cninfo-PDF's, FY2024 en FY2025) in plaats van analistensamenvattingen — dat lost de omzetdiscrepantie op en geeft de segmentcijfers uit de primaire bron.
2. **Een IDC- of CCID-rapport over 工程项目管理软件 aanschaffen** — dat is de enige route naar een gemeten marktomvang; alle publieke cijfers zijn afgeleid of commercieel.
3. **JGJ/T 121-2015 en een reëel 招标文件 in de originele tekst opvragen** om vast te stellen hoe hard de diagramtype-eis feitelijk is geformuleerd. Dat is de belangrijkste productbeslissing die uit dit rapport volgt en hij rust nu op secundaire beschrijvingen.
4. **Prijzen bij 斑马 opvragen als prospect** — de hele prijsladder boven CNY 999 is nu schatting.

*Verificatie uitgevoerd 25 juli 2026. Waar het oorspronkelijke rapport en deze controle van elkaar afwijken, geldt deze sectie.*
