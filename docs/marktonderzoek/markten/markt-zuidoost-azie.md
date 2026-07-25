# Markt voor projectplanning-/schedulingsoftware in Zuidoost-Azië

**Regio:** Singapore, Maleisië, Indonesië, Vietnam, Thailand, Filipijnen ("SEA-6")
**Peildatum onderzoek:** 25 juli 2026
**Taal rapport:** Nederlands · **Onderzoekstalen:** Engels, Indonesisch/Maleis, Vietnamees, Thai

---

## 0. Methodologische verantwoording (lees dit eerst)

Twee dingen die de lezer moet weten voordat hij een cijfer uit dit rapport overneemt:

1. **De WebSearch-tool was in deze sessie uitgeput** (budget 200/200 verbruikt vóór aanvang van deze opdracht). Het onderzoek is daarom uitgevoerd via **WebFetch**, deels rechtstreeks op primaire bronnen en deels via zoekmachine-proxy's (`lite.duckduckgo.com`, `html.duckduckgo.com`). Er zijn ~30 zoekopdrachten uitgevoerd, waarvan een substantieel deel in het **Indonesisch/Maleis, Vietnamees en Thai**, plus ~12 directe fetches van leverancierssites, prijslijsten en overheidspagina's. Enkele proxy-verzoeken liepen op een CAPTCHA of 403; die zijn met andere formuleringen of andere endpoints overgedaan. De inhoudelijke dekking is daarmee vergelijkbaar met de gevraagde opzet, maar het is géén exacte uitvoering van de instructie "minstens 10 WebSearch-opdrachten".
2. **De marktomvangcijfers in dit segment zijn structureel zwak.** Commerciële marktrapporten spreken elkaar met factoren 3–10 tegen (zie §2.3). Waar ik een getal geef dat niet direct uit een bron komt, staat er expliciet **[EIGEN SCHATTING]** bij, met de redenering erachter.

Verder geldt: **prijzen van lokale pakketten** zijn vaak niet publiek. Waar leveranciers "neem contact op" zeggen, staat dat er ook zo. Prijzen die uit blogs of resellers komen zijn als zodanig gelabeld — die zijn indicatief, geen officiële prijslijst.

---

## 1. Samenvatting

**De kern in acht punten:**

1. **De markt is scherp tweegedeeld — en dat is de belangrijkste bevinding.** Er bestaat geen "Zuidoost-Aziatische planningsmarkt"; er bestaan twee markten die naast elkaar leven in dezelfde landen. (a) De **internationale/EPC-laag**: olie & gas, LNG, petrochemie, metro's, luchthavens, datacenters, buitenlandse hoofdaannemers en multilaterale gefinancierde infrastructuur. Daar is **Oracle Primavera P6 de de-facto contractuele standaard**, vaak letterlijk voorgeschreven in het contract. (b) De **binnenlandse laag**: lokale aannemers, gebouwen, woningbouw, kleinere overheidswerken. Daar wint **Microsoft Project met grote afstand**, en daaronder ligt een enorme laag **Excel + handmatige S-curve**. De twee lagen praten nauwelijks met elkaar.
2. **Singapore is het uitzonderingsgeval.** Als BIM-/IDD-koploper met verplichte e-submission sinds 2013 en CORENET X nu, met een bouwvraag van S$47–53 mrd in 2026 ([BCA/Straits Times](https://www.straitstimes.com/singapore/housing/47b-to-53b-in-construction-contracts-expected-in-2026-bca)), en met een piraterijgraad van 27% tegen 83% in Indonesië ([BSA GSS 2018](https://gss.bsa.org/)), is Singapore veruit de meest *betalende* markt. Ik schat dat Singapore **~25–30% van de regionale licentie-omzet** levert bij **<7% van de bouwproductie** — een orde van grootte hogere monetisatie per bouw-dollar dan de rest. **[EIGEN SCHATTING, zie §2.4]**
3. **Er is geen echte lokale CPM-concurrent.** Dit is opvallend en commercieel relevant. Ik heb in vier talen gezocht naar inheemse pakketten met een echte CPM-engine (netwerklogica, kritiek pad, float, kalenders). Die zijn er in de SEA-6 **niet** in noemenswaardige vorm. Wat er wél is — en dat is een bloeiend, snel groeiend segment — zijn **lokale bouw-SaaS/ERP-pakketten** (Indonesië: PROGRESI, Ukirama, Mandoran, KontraktorOS; Vietnam: IBOM, FastCons, MISA AMIS, Base.vn; Maleisië: BuildTrack, KonstrakOS; Thailand: Builk; Filipijnen: AIMHI). Die doen kosten, RAB/BOQ, dagrapporten, inkoop, cashflow en een **S-curve of een simpele Gantt** — maar géén CPM. De planning zelf gaat er dus alsnog naast, in MS Project of P6.
4. **De prijskloof is extreem.** Oracle P6 Professional: **US$3.880 per named user, eeuwigdurend** ([AkimEng prijslijst, Thailand](https://www.akimeng.com/oracle-primavera-price-list.html)) + 22% jaarlijkse support ([Oracle-standaard](https://www.oracle.com/)). Lokale bouw-SaaS: **PROGRESI Rp 18.000.000/jaar voor ónbeperkt aantal gebruikers** (~US$1.100) ([progresi.co.id](https://progresi.co.id/)); **FastCons vanaf 100.000 VND/gebruiker/maand** (~US$4) ([fastcons.fastwork.vn](https://fastcons.fastwork.vn/bang-gia/)); **GXD softkey 500.000 VND/machine/jaar** (~US$20) ([dobockhoiluong.com](https://dobockhoiluong.com/huong-dan-su-dung-phan-mem-du-toan-gxd/)); **Builk gratis** ([builk.com](https://www.builk.com/en/about-us/)). Eén P6-seat kost evenveel als 3–5 jaar volledige bedrijfslicentie van een lokaal pakket.
5. **Informele licenties zijn geen randverschijnsel maar een marktstructuur.** BSA meet 83% ongelicentieerd in Indonesië, 74% Vietnam, 66% Thailand, 64% Filipijnen tegen 27% Singapore ([BSA 2018 via VietnamNet/Saigoneer](https://vietnamnet.vn/en/)). Op Indonesische marktplaatsen staat "Primavera P6 Professional Full Version" voor **Rp 150.550** (~US$9) ([toco.id via zoekresultaat](https://lite.duckduckgo.com/)). Vietnamese sites publiceren openlijk "Tải Phần Mềm Primavera P6 Full Crack"-gidsen. Het praktische gevolg: de *installed base* van P6/MSP in de regio is een veelvoud van de *betaalde* base, wat betekent dat marktomvangcijfers op licentie-omzet de werkelijke gebruikersaantallen zwaar onderschatten.
6. **Overheidsmandaten sturen BIM, niet planning.** Alle zes landen hebben inmiddels BIM-beleid — Singapore (e-submission verplicht in fasen vanaf juli 2013, nu CORENET X), Maleisië (Treasury-circulaire **PK 1.15**, **overheids**projecten ≥ **RM 10 mln** vanaf **1 juli 2025**; privésector aangemoedigd maar *niet* verplicht — [gecorrigeerd bij verificatie, zie §4.1](https://mila-asia.com/docs/pk-1-15-pelaksanaan-building-information-modelling-bim/)), Vietnam (**Besluit 258/QĐ-TTg**, 17 maart 2023: klasse I/speciaal vanaf 2023, klasse II vanaf 2025, [LuatVietnam](https://english.luatvietnam.vn/)), Indonesië (**Permen PUPR 22/PRT/M/2018**: staatsgebouwen >2.000 m², >2 verdiepingen, [BPK RI](https://peraturan.bpk.go.id/Details/159730)). **Geen enkel land mandateert een planningsmethode of -tool via BIM-beleid.** De planningsverplichtingen zitten elders: in aanbestedingsdocumenten (Filipijnen: PERT/CPM + PDM verplicht in de GPPB-standaardbestekken; Indonesië: **kurva S** verplicht bij inschrijving op straffe van diskwalificatie).
7. **Opleiding is een aparte, verrassend grote markt.** Primavera-training in Indonesië kost **Rp 2,75–5,5 mln per deelnemer** (US$170–340) ([diverse aanbieders](https://www.pusdikipd.com/pelatihan-primavera-p6-level-dasar-tahun-2025/)); in de Filipijnen loopt de bandbreedte van **PHP 1.000 tot 73.200** ([Laimoon](https://laimoon.com/)); in Vietnam ~**2.000.000 VND** (~US$76) ([kienthucxanh.org](http://www.kienthucxanh.org/2024/08/chao-mung-ban-en-voi-khoa-hoc-thuc.html)). Er zijn tientallen trainingsaanbieders per land. Voor de meeste lokale gebruikers is de *training* de aankoop, niet de licentie — omdat de software daarna gekraakt wordt gebruikt.
8. **Marktomvang, mijn beste schatting:** **US$60–110 mln per jaar (2025)** — **[bij verificatie bijgesteld naar US$43–110 mln; de ondergrens van 60 bleek niet uit de eigen berekening te volgen, zie de verificatienoot in §2.4]** aan software-omzet voor planning/scheduling in enge zin in de SEA-6, waarvan grofweg twee derde bouwspecifiek (P6, MSP-in-bouw, 4D, Asta) en een derde algemene PM-tools die voor bouwplanning worden ingezet. **[EIGEN SCHATTING — twee onafhankelijke methoden, zie §2.4.]** Het aantal mensen dat in de regio daadwerkelijk planningsoftware bedient schat ik op **30.000–60.000**, waarvan **7.500–13.000 fulltime planners/schedulers**. **[EIGEN SCHATTING, §2.5]**

**Wat dit betekent voor een nieuwe toetreder** (bijvoorbeeld een open-source/IFC-gebaseerde Gantt/CPM-tool): het gat zit niet aan de bovenkant — P6 is daar onaantastbaar op contractuele gronden. Het gat zit precies tussen de lokale bouw-SaaS (die geen CPM heeft) en MS Project (dat te duur is om legaal te kopen, geen IFC kent, en geen S-curve in het lokale format levert). Een tool die *CPM + IFC + S-curve/kurva S* combineert, lokaliseerbaar is naar Bahasa Indonesia/Vietnamees/Thai, en gratis of zeer goedkoop is, adresseert een reële, aantoonbaar onbediende laag.

---

## 2. Marktomvang

### 2.1 De onderliggende bouwmarkt

| Regio/land | Cijfer | Jaar | Bron |
|---|---|---|---|
| Zuidoost-Azië, bouwproductie | **US$ 538,5 mrd** | 2024 | [GlobalData](https://www.globaldata.com/store/report/south-east-asia-construction-market-analysis/) |
| Zuidoost-Azië, bouwmarkt | **US$ 571 mrd**, naar US$ 981,2 mrd in 2034 (CAGR 6,2%) | 2025 | [TheReportCubes](https://www.thereportcubes.com/report-store/construction-market-southeast-asia) |
| Singapore, bouwproductie (output) | **~S$ 38,4 mrd** (voorlopig) | 2024 | [BCA](https://www1.bca.gov.sg/resources/newsroom/construction-demand-to-remain-strong-for-2025/) |
| Singapore, bouwproductie (output) | **S$ 39–42 mrd** (prognose) | 2025 | [BCA](https://www1.bca.gov.sg/resources/newsroom/construction-demand-to-remain-strong-for-2025/) |
| Singapore, bouwvraag (contracten gegund) | **S$ 47–53 mrd** (prognose) | 2025 | [Straits Times](https://www.straitstimes.com/singapore/housing/construction-demand-of-up-to-53-billion-expected-in-2025-bca) |
| Singapore, bouwvraag (feitelijk, voorlopig) | **S$ 50,5 mrd** | 2025 | [REDAS/BCA mediabericht](https://redas.com/wp-content/uploads/2026/01/media-release-for-bca-redas-built-environment-and-real-estate-prospects-seminar-2026-final.pdf) |
| Singapore, bouwproductie (output) | **S$ 43–46 mrd** (prognose) | 2026 | [BCA](https://www1.bca.gov.sg/resources/newsroom/steady-construction-demand-in-2026-as-singapore-steps-up-support-for-built-environment-firms-through-collaboration-and-innovation/) |
| Singapore, bouwvraag | **S$ 47–53 mrd** (prognose), gedreven door o.a. Changi T5 | 2026 | [Straits Times](https://www.straitstimes.com/singapore/housing/47b-to-53b-in-construction-contracts-expected-in-2026-bca) |
| Indonesië, werkgelegenheid bouw | **>8,7 mln werkenden** (5,97% van totale werkgelegenheid) | **Sakernas februari 2025** | [Antara News](https://en.antaranews.com/news/374269/ris-construction-sector-employs-over-87-mln-workers-bps); geverifieerd via [Katadata](https://katadata.co.id/finansial/makro/68a423af1f2fb/bps-sektor-konstruksi-serap-8-7-juta-pekerja-kontributor-terbesar-ke-4-pdb), [CNN Indonesia](https://www.cnnindonesia.com/ekonomi/20250819145053-92-1264049/bps-catat-sektor-konstruksi-serap-lebih-dari-87-juta-pekerja) |
| Indonesië, werkgelegenheid bouw (alternatief) | **13,1 mln**, waarvan 65% informeel/niet-geregistreerd | 2026 | [WorldMetrics](https://worldmetrics.org/indonesia-construction-industry-statistics/) — *let op: aggregator, lagere betrouwbaarheid; wijkt sterk af van BPS* |

> **[VERIFICATIE — GECORRIGEERD]** De twee bouwproductiecijfers hierboven zijn **niet onafhankelijk van elkaar**. GlobalData meet US$538,5 mrd voor 2024 bij een CAGR van 6,2% (2024–2028); 538,5 × 1,062 = **US$571,9 mrd voor 2025** — exact het "TheReportCubes"-cijfer. Het tweede getal is dus vrijwel zeker een afgeleide van het eerste, geen tweede waarneming. Bovendien klopt de CAGR-annotatie niet: US$571 mrd (2025) → US$981,2 mrd (2034) is (981,2/571)^(1/9)−1 = **6,0%**, niet 6,2%. Gebruik dit als **één** bron met één onzekerheidsband, niet als convergentie. ([ResearchAndMarkets/GlobalData persbericht](https://www.businesswire.com/news/home/20240823508342/en/South-East-Asia-Construction-Industry-Report-2024-Market-Size-will-be-Evaluated-at-$538.5-Billion-in-2024-Growing-at-a-CAGR-of-6.2-During-2024-2028---ResearchAndMarkets.com))

**Let op het onderscheid demand vs. output in Singapore.** "Construction demand" = waarde van gegunde contracten in het jaar; "construction output" = uitgevoerd werk. BCA publiceert beide en ze verschillen ~20%. Wie deze twee door elkaar haalt, overschat de markt met een kwart.

### 2.2 Markt voor projectmanagementsoftware — APAC-cijfers

Deze cijfers zijn onderling *sterk* inconsistent. Ik geef ze allemaal, met de tegenspraak zichtbaar:

| Bron | Scope | Omvang | Jaar | Groei |
|---|---|---|---|---|
| [Ken Research](https://www.kenresearch.com/apac-project-management-software-market) | APAC PM-software | US$ 1,6 mrd | 2025 (basisjaar 2025–2030) | n.v.t. |
| [Grand View Research](https://www.grandviewresearch.com/horizon/outlook/project-management-software-market/asia-pacific) | APAC PM-software | US$ 5.891,2 mln in **2030** | 2030 (prognose) | 19,7% CAGR 2024–2030 |
| [KBV Research](https://www.kbvresearch.com/asia-pacific-project-management-software-market/) | APAC PM-software | (geen absoluut cijfer in bron) | 2023–2030 | 14,7% CAGR |
| [DataIntelo](https://dataintelo.com/report/construction-project-management-software-market) | **APAC bouw**-PM-software | US$ 2,54 mrd (32,5% wereldwijd) | 2025 | — |
| LinkedIn-artikel (secundair) | APAC bouwmanagementsoftware | US$ 198,26 mln → US$ 382 mln | 2024 | — |

**Interpretatie.** Ken Research (US$1,6 mrd voor héél APAC PM-software) en DataIntelo (US$2,54 mrd voor alleen bouw-PM in APAC) zijn logisch onverenigbaar: het deel kan niet groter zijn dan het geheel. Het LinkedIn-cijfer (US$198 mln voor APAC bouwmanagementsoftware) verschilt weer een factor 13 met DataIntelo. **Conclusie: deze rapporten zijn niet bruikbaar als bron voor een absoluut getal.** Ze zijn hooguit bruikbaar als indicatie van *groeirichting* (alle bronnen: dubbelcijferig, 11–20% CAGR) en van *APAC-aandeel* (rond 30–38% wereldwijd, waarbij dat aandeel vooral China, India, Japan, Korea en Australië is — niet SEA).

Ter kalibratie, de wereldwijde cijfers zijn even divers: bouwsoftware US$11,78 mrd (2026, [Fortune Business Insights](https://www.fortunebusinessinsights.com/construction-software-market-110155)); bouw-PM-software US$11,72 mrd (2025, [FnF Research](https://www.fnfresearch.com/)); *construction scheduling software* specifiek US$2,1 mrd (2025, [MarketIntelo](https://marketintelo.com/)) resp. US$2,1 mrd (2024, [Verified Market Research](https://www.verifiedmarketresearch.com/)) resp. US$4,6 mrd (2025, [DataIntelo](https://dataintelo.com/)). De "scheduling"-subcategorie ligt dus wereldwijd ergens op **US$2–5 mrd**.

### 2.3 Waarom de bestaande cijfers niet deugen voor deze regio

Drie structurele redenen, die ook verklaren waarom elke top-downbenadering hier misgaat:

1. **Piraterij ontkoppelt gebruik van omzet.** Bij 83% ongelicentieerd (Indonesië) meet je met licentie-omzet ~17% van de werkelijke installed base. Marktrapporten die "adoptie" schatten uit "omzet" zitten er in Indonesië en Vietnam dus systematisch een factor 4–6 naast.
2. **Enterprise-deals zijn ondoorzichtig.** Een P6 EPPM/Unifier/Aconex-implementatie bij één Maleisische of Indonesische staatsaannemer kan zes cijfers per jaar bedragen en verschijnt in geen enkele publieke bron. De omzet is geconcentreerd bij een handvol accounts.
3. **De grens "projectmanagementsoftware" is arbitrair.** Telt Autodesk Construction Cloud mee? Aconex (document control)? Ukirama (ERP met projectmodule)? Elke rapportmaker trekt de lijn anders — vandaar de factor 13 hierboven.

### 2.4 Eigen schatting van de marktomvang **[EIGEN SCHATTING]**

Ik gebruik twee onafhankelijke methoden en kijk of ze convergeren.

**Methode A — top-down, van bouwproductie naar softwarebesteding.**
- SEA-6 bouwproductie 2024/25: **US$ 538–571 mrd** ([GlobalData](https://www.globaldata.com/store/report/south-east-asia-construction-market-analysis/); [TheReportCubes](https://www.thereportcubes.com/report-store/construction-market-southeast-asia)).
- Softwarebesteding als % van bouwproductie: in volwassen markten (VS, VK, Nordics) ligt de totale bouw-IT-besteding rond 0,3–0,6% van de bouwomzet. SEA ligt daar structureel onder wegens lagere digitaliseringsgraad, hoge informele sector en piraterij. Ik hanteer **0,10–0,20%** → **US$ 0,54–1,14 mrd** totale bouwsoftware in de SEA-6.
- Aandeel van *planning/scheduling* binnen totale bouwsoftware: BIM/CAD, documentbeheer, ERP en veldtools slokken het leeuwendeel op. Planningssoftware is een klein, taai segment. Ik hanteer **8–12%** → **US$ 43–137 mln**.

**Methode B — bottom-up, van seats naar omzet.**
- Fulltime planners in de SEA-6: **7.500–13.000** (zie §2.5).
- Verdeling **[schatting op basis van de kwalitatieve bevindingen in §3]**: ~40–45% werkt primair in P6, ~40% in MS Project, ~15% in overige tools (Asta, TILOS, SYNCHRO, Spider, lokale/algemene tools).
- Betalende fractie: Singapore ~90–95%, Maleisië/Thailand ~55–65%, Indonesië/Vietnam/Filipijnen ~25–40% (afgeleid van de BSA-piraterijgraden, met correctie omdat internationale EPC-werkgevers wél compliant zijn).
- P6: ~4.500 primaire gebruikers × ~55% betaald = **~2.500 betaalde seats**. Kosten per seat per jaar: perpetual US$3.880 geamortiseerd over 5 jaar (US$776) + 22% support (US$854) ≈ **US$1.630**, met regionale korting van 15–25% → **~US$1.250–1.400**. → **US$ 3–3,5 mln/jaar** aan P6 *desktop*-seats.
- Daarbovenop: P6 EPPM-servers, Primavera Cloud, Unifier, Aconex, Risk Analysis. Deze enterprise-laag is bij Oracle in de bouw doorgaans **3–6× de desktop-seatomzet** → **US$ 10–20 mln**.
- MS Project: ~4.500 primaire gebruikers × ~45% betaald ≈ 2.000 seats × US$360/jr (Plan 3) ≈ **US$0,7 mln**; plus een veel bredere laag deeltijdgebruikers (zie §2.5) die via M365-bundels of Plan 1 betaalt → **US$ 3–8 mln**.
- Overige bouwspecifiek (Asta, SYNCHRO, TILOS, iTWO, InEight, Deltek, ALICE): dun aanwezig, zwaar geconcentreerd in Singapore en bij enkele Maleisische/Thaise grootaannemers → **US$ 5–15 mln**.
- Algemene PM-tools ingezet voor bouwplanning (monday.com, Smartsheet, Asana, Wrike, Jira, Zoho Projects) plus lokale bouw-SaaS met planningsmodule: dit is het snelst groeiende deel, met veel meer seats maar lagere prijzen → **US$ 20–40 mln**.

**Totaal methode B: US$ 41–86 mln.**

**Convergentie.** Methode A geeft US$43–137 mln, methode B geeft US$41–86 mln. De overlap ligt op **US$ 43–86 mln**. Ik verbreed dat licht naar boven omdat methode B de niet-waarneembare enterprise-deals vermoedelijk onderschat, en kom uit op:

> **[VERIFICATIE — GECORRIGEERD, twee bezwaren tegen deze afleiding]**
> 1. **De twee methoden zijn niet onafhankelijk.** Beide starten op dezelfde teller: de US$538–571 mrd bouwproductie (en dat is zelf één GlobalData-cijfer, zie §2.1). Methode B's plannersaantal (§2.5) wordt letterlijk uit die bouwproductie afgeleid via twee zelfgekozen ratio's. Convergentie tussen A en B is daarmee grotendeels ingebouwd, niet gevonden. Behandel dit als **één schatting met vier vrije parameters** (softwarebestedingsintensiteit, planningsaandeel, plannersdichtheid, betaalpercentage), niet als kruisvalidatie.
> 2. **De sprong van 43–86 naar 60–110 is niet onderbouwd.** De gegeven reden (onderschatte enterprise-deals) rechtvaardigt hooguit het optrekken van het *plafond*. De **ondergrens gaat met 40% omhoog** (43 → 60) zonder enig argument. Een verdedigbare uitkomst op basis van de eigen berekening is **US$43–110 mln**; alles daarbinnen is even goed onderbouwd. Het genoemde punt "60" is een keuze, geen resultaat.
>
> De rekenkundige stappen binnen A en B zijn wél nagerekend en kloppen: 538,5 × 0,10% × 8% = 43,1; 1.142 × 0,20%… × 12% = 137,0; 3.880/5 + 0,22×3.880 = 776 + 854 = 1.630; 3.880 + 5×854 = 8.150; 2.500 × 1.250–1.400 = 3,1–3,5 mln; 3,1+10+3+5+20 = 41 en 3,5+20+8+15+40 = 86,5.

> **Beste schatting: US$ 60–110 mln per jaar (2025) aan software-omzet voor projectplanning/scheduling in de SEA-6.** **[EIGEN SCHATTING]**
> Verdeling **[EIGEN SCHATTING]**: bouwspecifieke tools ~US$40–70 mln, algemene PM-tools ingezet voor bouwplanning ~US$20–40 mln.
> Groei: **12–18% per jaar**, sneller dan de onderliggende bouwmarkt (6,2%), gedreven door BIM-mandaten, cloudmigratie en formalisering van de aannemerij — consistent met de CAGR-range die alle APAC-bronnen noemen.

**Landverdeling van die omzet [EIGEN SCHATTING]:**

| Land | Aandeel regionale planningsoftware-omzet | Aandeel regionale bouwproductie (indicatief) | Monetisatie-index |
|---|---|---|---|
| Singapore | **25–30%** | ~6–7% | **~4,3×** |
| Maleisië | 15–18% | ~9–11% | ~1,6× |
| Indonesië | 18–22% | ~28–32% | ~0,7× |
| Thailand | 13–16% | ~13–15% | ~1,0× |
| Vietnam | 12–15% | ~16–19% | ~0,8× |
| Filipijnen | 8–11% | ~13–15% | ~0,7× |

*Redenering:* de monetisatie-index volgt vrijwel exact het omgekeerde van de BSA-piraterijgraad, gecorrigeerd voor het aandeel internationale EPC-projecten (hoog in Singapore en Maleisië, laag in de Filipijnen). Singapore's index van ~4,3× is de kwantitatieve uitdrukking van punt 2 in de samenvatting.

> **[VERIFICATIE — nagerekend]** De indexkolom is intern consistent (middenwaarden: 27,5/6,5 = 4,2; 16,5/10 = 1,65; 20/30 = 0,67; 14,5/14 = 1,04; 13,5/17,5 = 0,77; 9,5/14 = 0,68). **Maar de kolom "aandeel regionale bouwproductie" telt niet op tot 100%**: de middenwaarden sommeren tot ~92% (30+17,5+14+14+10+6,5). Ofwel de kolom slaat op héél Zuidoost-Azië inclusief Myanmar/Cambodja/Laos/Brunei — dan is de vergelijking met een SEA-6-omzetkolom scheef — ofwel er ontbreekt ~8 procentpunt. De omzetkolom sommeert wél naar ~101,5%. De monetisatie-indices zijn daardoor systematisch **~8% te hoog**; Singapore's 4,3× wordt bij een op 100% genormeerde noemer ~3,9×. De ordegrootte (Singapore monetiseert enkele malen beter dan de rest) blijft overeind, het precieze getal niet.

### 2.5 Aantal planners **[EIGEN SCHATTING]**

Er bestaat geen telling. Ik leid het af:

- SEA-6 bouwproductie: **US$ 538–571 mrd**.
- Aandeel dat door de *formele, georganiseerde* sector wordt uitgevoerd (waar überhaupt een planner bestaat): Singapore ~95–100%, Maleisië ~65–75%, Thailand ~55–65%, Vietnam ~50–60%, Indonesië ~45–55% (**[VERIFICATIE — zwakke schakel]** de 65%-informaliteit komt uitsluitend van [WorldMetrics](https://worldmetrics.org/indonesia-construction-industry-statistics/), een statistiek-aggregator die in dezelfde tabel 13,1 mln bouwwerkenden noemt tegen BPS' geverifieerde **8,7 mln** — een afwijking van 50%. Een bron die op het ene cijfer 50% mis zit, mag niet de sleutelparameter leveren voor de plannersschatting. De 45–55%-formaliteitsaanname voor Indonesië is daarmee **feitelijk ongefundeerd**; zij bepaalt wel rechtstreeks de onder- en bovengrens van de 7.500–13.000 planners), Filipijnen ~45–55%. Gewogen: **~55–60%** → **US$ 300–340 mrd** "formeel gemanaged" werk.
- Vuistregel dichtheid: **1 fulltime planner/scheduler per US$ 25–40 mln** formeel gemanaged jaarproductie (aannemer + opdrachtgever + adviseur samen). Deze vuistregel is aan de lage kant t.o.v. Europa/Golfstaten, omdat in SEA veel planningswerk door site-engineers "erbij" wordt gedaan.

→ **7.500–13.000 fulltime planners/schedulers in de SEA-6.**

- Daarnaast de veel grotere groep die *deeltijd* planningssoftware bedient: uitvoerders, QS'ers, site-engineers die de kurva S / Gantt bijhouden. Ratio conservatief **3–5×**.

→ **30.000–60.000 personen die in de SEA-6 planningssoftware bedienen.**

Grove landverdeling van de fulltime planners **[EIGEN SCHATTING]**: Indonesië 2.000–3.500 · Vietnam 1.200–2.200 · Maleisië 1.100–1.900 · Thailand 1.000–1.800 · Singapore 1.300–2.300 · Filipijnen 900–1.600. Singapore is bewust hoog gezet ten opzichte van zijn bouwvolume: de project-controls-cultuur, de aanwezigheid van regionale hoofdkantoren van internationale aannemers en consultants, en de IDD-verplichtingen maken het de dichtstbevolkte plannersmarkt per bouw-dollar in de regio.

---

## 3. Gebruikte software: marktpositie en prijzen

### 3.1 De rangorde in één tabel

Rangorde is **[EIGEN SCHATTING]**, gebaseerd op de kwalitatieve signalen uit de bronnen: vacatureteksten, trainingsaanbod (het aantal trainers per tool is een goede proxy voor gebruikersaantallen), lokale ranglijstartikelen, reseller-aanwezigheid en marktplaatsaanbod.

| # | Pakket | Positie binnenlands | Positie internationaal/EPC | Kern-sterkte in deze regio |
|---|---|---|---|---|
| 1 | **Microsoft Project** | **Marktleider binnenlands** | Secundair (soms verboden in contract) | Prijs, bekendheid, opleidingsaanbod, "iedereen kan het openen" |
| 2 | **Oracle Primavera P6** (Professional/EPPM) | Niche (staatsaannemers, grote gebouwen) | **De facto standaard, contractueel voorgeschreven** | Contractuele acceptatie, multi-project, resource-/kostenintegratie |
| 3 | **Excel** (geen software-omzet, wel de grootste "installed base") | **Feitelijk nr. 1 naar volume** | Ondersteunend | Kurva S/S-curve in het lokaal vereiste format |
| 4 | Lokale bouw-SaaS/ERP (PROGRESI, IBOM, FastCons, Ukirama, Builk, BuildTrack, AIMHI, …) | **Snelst groeiende segment** | Vrijwel afwezig | Taal, prijs, lokale boekhoud-/BOQ-conventies, S-curve |
| 5 | **Primavera Cloud / Oracle Aconex / Unifier** | Beperkt | Groeiend bij megaprojecten | Document control + schedule in één keten |
| 6 | **Bentley SYNCHRO** en **Navisworks (4D)** | Zeer beperkt | Groeiend in **Singapore** (IDD) en bij metro's | 4D-simulatie gekoppeld aan BIM-mandaten |
| 7 | Algemene PM-SaaS (**monday.com, Smartsheet, Asana, Wrike, Jira, Zoho Projects, ClickUp**) | Groeiend bij developers/PMO/interieur | Zelden voor het bouwprogramma | Prijs, gebruiksgemak, geen CPM |
| 8 | **Elecosoft Asta Powerproject** | Zeer beperkt | Beperkt (Britse/Commonwealth-invloed) | Sterk in gebouwen, populair waar Britse contractvormen gelden |
| 9 | **RIB iTWO / Candy**, **InEight**, **Deltek Acumen**, **Safran**, **Trimble TILOS**, **Spider Project**, **Nodes & Links**, **ALICE** | Verwaarloosbaar | Nichegebruik, projectgebonden | Specialisme (lineair, risico, forensisch, AI-optimalisatie) |
| 10 | Open source (**ProjectLibre, GanttProject, OpenProject**) | Marginaal, maar reëel bij MKB/onderwijs | Afwezig | Gratis, offline, Gantt |

### 3.2 Oracle Primavera P6 — de contractuele standaard

**Positie.** P6 is in deze regio geen keuze maar een contractvereiste. Waar het geldt: olie & gas en LNG (Maleisië, Indonesië, Thailand, Vietnam offshore), petrochemie, energiecentrales, metro's en spoor, luchthavens, en vrijwel elk project met een buitenlandse hoofdaannemer of multilaterale financiering (ADB, Wereldbank, JICA). Ook de Indonesische staatsaannemers (BUMN Karya) hebben aparte *Scheduler*-functies; PT Hutama Karya werft er actief voor ([LinkedIn-vacature Scheduler, Balikpapan](https://www.linkedin.com/jobs/view/scheduler-at-pt-hutama-karya-persero-3798186302)).

**Prijzen — dit is de best gedocumenteerde prijsinformatie in dit rapport.** De Thaise reseller AkimEng publiceert een expliciete prijslijst:

| Product | Licentie | Lijstprijs |
|---|---|---|
| Primavera P6 Professional | On-premises, eeuwigdurend, per Application User | **US$ 3.880** |
| Primavera P6 Enterprise | On-premises, eeuwigdurend, per Application User | **US$ 4.240** |
| Primavera Risk Analysis | On-premises, eeuwigdurend, per Application User | **US$ 10.450** |
| P6 Progress Reporter | On-premises, eeuwigdurend, per Application User | **US$ 1.460** |

Bron: [AkimEng Oracle Primavera price list](https://www.akimeng.com/oracle-primavera-price-list.html). Updates en support zijn **niet** inbegrepen.

> **[VERIFICATIE — bevestigd, met twee correcties]**
> - De AkimEng-lijst is nagelezen: alle vier de bedragen staan er letterlijk, maar de licentiemetriek is **"Application User"**, niet "named user". Dat is Oracle-jargon met een eigen definitie (een geïdentificeerd individu dat het programma mag gebruiken, ongeacht actief gebruik) en het is verstandig die term over te nemen in plaats van hem te vertalen. De prijslijst draagt **geen datum** — de ouderdom is niet vast te stellen.
> - **De twee belangrijkste bedragen zijn nu wél onafhankelijk bevestigd**, wat het rapport eerder niet had: de Turkse Oracle-reseller PRM noemt (bijgewerkt juni 2025) **P6 Professional US$3.880** en **P6 Enterprise US$4.240**, beide "named-user perpetual licence fee, excluding maintenance", plus expliciet **22% onderhoud** en eerstejaarssupport van **US$854** resp. **US$933** ([prmyazilim.com](https://prmyazilim.com/en/primavera-p6-pricing)). 0,22 × 3.880 = 853,6 en 0,22 × 4.240 = 932,8 — de 22%-regel klopt dus tot op de dollar. Dit is bevestiging uit een tweede werelddeel en maakt de "één Thaise reseller"-zwakte grotendeels ongedaan.
> - **Risk Analysis (US$10.450) en Progress Reporter (US$1.460) blijven single-source** (alleen AkimEng); PRM noemt ze niet. Behandel die twee als onbevestigd. *(Voetnoot: Primavera Risk Analysis is door Oracle bovendien uitgefaseerd ten gunste van in P6/OPC ingebouwde risicoanalyse — een prijs voor dit product kan een legacy-notering zijn.)*

**Support.** Oracle rekent standaard **22% van de netto licentiewaarde per jaar** voor Software Update License & Support, met jaarlijkse verhogingen van doorgaans 3–8% ([meerdere licentie-adviesbronnen, o.a. Redress Compliance / Oracle Negotiations](https://redresscompliance.com/)). Dit maakt de TCO over vijf jaar circa **US$ 8.150 per seat** (US$3.880 + 5 × US$854).

**Andere prijspunten ter kalibratie** (allemaal derde partijen, geen Oracle-publicatie):
- "vanaf **US$ 3.500** eeuwigdurend" ([Primavera Scheduling](https://primaverascheduling.com/home/buy-primavera-software/))
- lijstprijs P6 Professional **US$ 3.520** ([Compass Consult](https://compassconsult.co/primavera-p6-software-cost-in-the-usa-a-comprehensive-guide/); [ProjectManagerTemplate](https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models))
- **US$ 2.500–3.500 per gebruiker** eeuwigdurend + US$500–800/jr support ([ITQlick](https://www.itqlick.com/primavera-p6/pricing)); elders "US$3.500–7.000 per licentie" ([ITQlick Oracle Primavera](https://www.itqlick.com/oracle-primavera/pricing))
- Primavera Cloud: **US$ 175/gebruiker/maand** ([Contractors and Builders](https://contractorsandbuilders.com/pricing/oracle-primavera/)); Progress Cloud Service **US$ 144/gebruiker/jaar** ([FindPM Software](https://findpmsoftware.com/products/primavera-cloud)) — deze twee zijn duidelijk verschillende modules, niet vergelijkbaar
- **Minimaal 5 gebruikerslicenties per module** verplicht bij Primavera Cloud ([Taradigm](https://www.taradigm.com/how-much-does-primavera-cloud-cost/))

> **[VERIFICATIE — GECORRIGEERD: de US$175 is één punt in een zeer brede, tegenstrijdige range]** Onafhankelijke noteringen voor Primavera Cloud lopen ver uiteen:
> - **US$130/gebruiker/maand** — 5-user starterpakket à US$7.800/jaar, extra licenties US$1.560/jaar ([CDP Inc.](https://cdp-inc.com/products/software/purchase-oracle-primavera-cloud-5-users); [Global PM](https://globalpm.com/oracle-primavera-cloud-pricing/))
> - **US$175/gebruiker/maand** — Contractors and Builders (de bron in dit rapport)
> - **US$305/gebruiker/maand, minimaal 25 gebruikers** ([PRM](https://prmyazilim.com/en/primavera-p6-pricing))
>
> Het genoemde minimum verschilt dus óók per bron (5 vs. 25 seats). Oracle publiceert zelf geen actuele OPC-prijs. Presenteer dit als **US$130–305/gebruiker/maand, minimum 5–25 seats afhankelijk van pakket** en niet als één getal. De 5-jaars-TCO-vergelijking met P6-desktop verandert daardoor materieel: bij US$305 is Primavera Cloud ~2,3× duurder per jaar dan de US$175 waarop het rapport impliciet leunt.

**Indonesische indicatie:** een Indonesisch overzichtsartikel noemt **Rp 60.000.000** voor Primavera P6 (EPPM) — ~US$3.700, wat aardig overeenkomt met de wereldwijde lijstprijs ([Ukirama](https://ukirama.com/blogs/software-konstruksi-terbaik)). *Let op: dit is een blogprijs van een concurrerende ERP-leverancier, geen officiële notering.*

**Kanaal/resellers.** De regio wordt bediend via een dun maar duidelijk gedefinieerd partnernetwerk:
- **Crown Systems (S) Pte Ltd** — Oracle Certified Gold Partner en *geautoriseerd distributeur, reseller én trainingscentrum voor Oracle Primavera in Singapore, Brunei, Indonesië, de Filipijnen en Vietnam* ([StreetDirectory bedrijfsprofiel](https://www.streetdirectory.com/businessfinder/company_detail.php?companyid=21973)). Eén partij die vijf landen dekt zegt veel over de dunbezette kanaalstructuur.
- **IPEC Systems** (Maleisië) — P6 EPPM, Primavera Cloud, Unifier, Aconex ([ipecsystems.com.my](https://www.ipecsystems.com.my/Oracle-Primavera))
- **AppliCAD Co., Ltd.** (Thailand) — Primavera-distributeur ([applicadthai.com/primavera](https://www.applicadthai.com/primavera/))
- **AkimEng** (Thailand) — publiceert de prijslijst hierboven
- **8baht.com** (Thailand) — biedt P6 EPPM on-premises aan
- **softwareasli.com** (Indonesië) — presenteert zich als officiële distributeur/reseller

**Voordelen in deze markt:** contractuele acceptatie (bij een claim is een P6-XER het bewijsmiddel); multi-projectportfolio; resource- en kostenintegratie; onbetwiste positie in olie & gas.
**Nadelen in deze markt:** prijs is een orde van grootte boven wat een lokale aannemer kan verantwoorden; steile leercurve — Vietnamese vakbronnen noemen expliciet de "hoge leercurve en operationele complexiteit" als het belangrijkste nadeel ([IBOM ranglijst 2026](https://ibom.vn/tin-giai-phap/top-phan-mem-quan-ly-tien-do-cong-trinh-tot-nhat-2026.html)); geen Bahasa Indonesia/Vietnamese/Thaise UI; produceert niet out-of-the-box de kurva S in het door Indonesische aanbestedingen vereiste format.

### 3.3 Microsoft Project — de feitelijke volumeleider binnenlands

**Positie.** Voor binnenlandse projecten in alle zes landen is MS Project de standaard. Indonesische academische literatuur behandelt de keuze MSP-vs-P6 als *de* vraag in het vakgebied — er zijn tientallen scripties en artikelen over ([Neliti](https://www.neliti.com/publications/80457/perbandingan-aplikasi-program-microsoft-project-dan-primavera-dalam-penjadwalan); [USU Repository](https://repositori.usu.ac.id/handle/123456789/31695); [Unigoro Sintesi](https://ojs.ejournalunigoro.org/sintesi/article/view/1632.html)). De bevindingen zijn consistent: MSP is "sangat user friendly, tidak memerlukan waktu yang lama dalam menyelesaikan hubungan antar aktivitas" (zeer gebruiksvriendelijk, kost weinig tijd om relaties te leggen), terwijl P6 uitblinkt in risicobeheer en resource-allocatie. Eén vergelijkende studie vond: handmatig plannen 132 werkdagen, P6 114 dagen, MS Project Planner 115 dagen — dus in pure planningsuitkomst nauwelijks verschil.

Trainingsaanbieders bundelen de twee vaak: [protrain.id](https://protrain.id/training-microsoft-project-with-primavera/) biedt één programma "Microsoft Project with Primavera", wat bevestigt dat de markt ze als één competentiedomein ziet.

**Prijzen (lijstprijs Microsoft Store VS):**

| Product | Prijs |
|---|---|
| Project Plan 1 | **US$ 10 /gebruiker/maand** |
| Project Plan 3 | **US$ 30 /gebruiker/maand** |
| Project Plan 5 | **US$ 55 /gebruiker/maand** |
| Project Standard 2024 (eeuwigdurend) | **US$ 679,99** |
| Project Professional 2024 (eeuwigdurend) | **US$ 1.129,99** |

Bronnen: [The Digital Project Manager](https://thedigitalprojectmanager.com/tools/microsoft-project-pricing/); [Milient Software](https://milientsoftware.com/blog/microsoft-project-pricing); [Tech.co](https://tech.co/project-management-software/microsoft-project-review); [ITQlick](https://www.itqlick.com/microsoft-project/pricing). De vijf bedragen zelf zijn bevestigd (Plan 1/3/5 op US$10/30/55; Standard 2024 US$679,99; Professional 2024 US$1.129,99 — [Microsoft Store US](https://www.microsoft.com/en-us/microsoft-365/p/project-standard-2024/cfq7ttc0prmx)).

> **[VERIFICATIE — WEERLEGD: Microsoft hanteert wél regionale prijsstelling]** De oorspronkelijke formulering ("wereldwijde lijstprijs, geldt ook in ZO-Azië — Microsoft doet hier geen regionale prijsstelling") is onjuist. De **Microsoft Store Singapore** noteert:
> - **Project Standard 2024: SG$ 1.109,00** — bij ~SGD 1,29/USD is dat **US$ 860**, tegen US$679,99 in de VS: **+26%**
> - **Project Professional 2024: SG$ 2.199,00** — **US$ 1.705**, tegen US$1.129,99 in de VS: **+51%**
>
> ([Microsoft Singapore, vergelijkingspagina Project](https://www.microsoft.com/en-sg/microsoft-365/project/compare-microsoft-project-management-software)). Zelfs na aftrek van 9% GST resteert +16% resp. +38%. De eeuwigdurende Project-edities kennen dus **wel degelijk een regionale prijsopslag** in Zuidoost-Azië, en die opslag is bovendien niet uniform tussen de twee edities. Voor de abonnementen (Plan 1/3/5) heb ik geen SGD-notering op de Microsoft-pagina aangetroffen; daarvoor blijft de claim onbevestigd.
>
> Consequentie voor het rapport: de conclusie in §4.8 dat "op één na alle lokale prijzen simpele omrekeningen van de USD-lijstprijs zijn" en dat Microsoft/Oracle geen regionale differentiatie voeren, moet worden afgezwakt. Voor Microsoft is dat aantoonbaar onjuist; voor Oracle is het niet aangetoond (alleen niet weerlegd).

Een Indonesisch overzicht noteert MS Project op **Rp 860.000/gebruiker/maand** (~US$53) ([Ukirama](https://ukirama.com/blogs/software-konstruksi-terbaik)) — dat komt overeen met Plan 5, of met een reseller-opslag op Plan 3.

**Lokaal kanaal (Indonesië):** Kitameraki (officieel Microsoft-distributeur, [kitameraki.com](https://www.kitameraki.com/id/microsoft-licenses)), Bhinneka, Multicakra (verkoop én *verhuur* van Microsoft-software), Farinotech. Daarnaast een zeer groot aanbod op Tokopedia en Shopee — waar de grens tussen legitieme OEM-keys en grijze/gestolen keys onscherp is.

**Voordelen:** prijs binnen bereik van MKB; iedereen kan het bestand openen; enorm trainingsaanbod; Gantt met CPM-motor die voor 90% van de binnenlandse projecten volstaat.
**Nadelen in deze markt:** Vietnamese vakbronnen noemen "gebrek aan diepgang bij opschaling over meerdere projecten en bij veldcollaboratie" ([IBOM](https://ibom.vn/tin-giai-phap/top-phan-mem-quan-ly-tien-do-cong-trinh-tot-nhat-2026.html)); geen IFC; geen native S-curve/kurva S; abonnementsmodel wordt in Indonesië/Vietnam slecht ontvangen omdat men gewend is aan eenmalige aanschaf (of aan niets betalen).

### 3.4 Lokale pakketten — uitgebreid, per land

Dit is het deel waar westerse bronnen tekortschieten. Wat volgt is per land, met expliciete voor- en nadelen.

#### Indonesië

**PROGRESI** ([progresi.co.id](https://progresi.co.id/)) — het meest complete lokale pakket dat ik gevonden heb, en het enige met transparante prijzen.
- *Modules:* **Planning** (Gantt-chart planning, AHSPK/eenheidsprijsanalyse, budget), **Daily Reporting** (voortgang, materiaal, materieel, K3/veiligheid), **Analysis** (S-curve-monitoring, financiële rapportage, prestatiemetriek). Volgt vier parameters: kosten, tijd, kwaliteit, veiligheid/K3.
- *Gebruikers:* naar eigen opgave **>100 aannemers en onderwijsinstellingen**.
- *Prijs:* **Rp 2.000.000/maand** (~US$122) · **Rp 10.000.000/6 maanden** (1 maand gratis, ~US$610) · **Rp 18.000.000/jaar** (2 maanden gratis, ~US$1.100). **Alle plannen: onbeperkt gebruikers, onbeperkt projecten.** Er is een gratis mobiele versie, PROGRESI Lite, voor individuele aannemers.
- *Voordelen:* het prijsmodel is dodelijk voor per-seat-concurrenten — een aannemer met 20 planners betaalt hetzelfde als een met twee. Native AHSPK en kurva S sluiten aan op wat Indonesische aanbestedingen eisen. Bahasa Indonesia. K3-module dekt de wettelijke veiligheidsrapportage.
- *Nadelen:* de "Planning"-module is een Gantt, geen volwaardige CPM-engine — er is in de productcommunicatie geen sprake van netwerklogica, float-berekening of kritiek-padanalyse. Voor een project waar een claim of EOT-analyse speelt, is dit niet toereikend; men zal alsnog terugvallen op P6. Geen IFC. Geen aantoonbare aanwezigheid buiten Indonesië. Bedrijfsomvang is klein (>100 klanten), wat continuïteitsrisico geeft bij meerjarige projecten.

**Ukirama** ([ukirama.com](https://ukirama.com/blogs/software-konstruksi-terbaik)) — lokale ERP met projectmodule, positioneert zich als "Manajemen Proyek Terintegrasi dalam Ekosistem ERP Lokal".
- *Prijs:* **Rp 1.000.000/maand** (~US$61) volgens hun eigen vergelijkingsartikel.
- *Voordelen (eigen opgave):* complete modules, cloud, gebruiksvriendelijke interface, integratie met Indonesische boekhouding.
- *Nadelen (eigen opgave, opvallend eerlijk):* **geen CRM**, en **"tidak cocok untuk kontraktor multinasional"** — niet geschikt voor multinationale aannemers. Impliciet: geen CPM, geen internationale rapportageformaten.

**Mandoran** ([mandoran.id](https://mandoran.id/)) — SaaS die projectmanagement en financiën verenigt.
- *Modules:* RAB/RAP-budgettering, realtime voortgang met **S-curve**, materiaalbeheer en voorraad, werknemers- en loonbeheer met SPK (werkopdrachten), financiële rapportage **conform PSAK 72** (de Indonesische IFRS-15-equivalent voor opbrengstverantwoording), multi-project, mobiel.
- *Gebruikers:* naar eigen opgave **>100 bouwbedrijven**.
- *Prijs:* **niet gepubliceerd** — alleen gratis proef en demo via WhatsApp.
- *Voordelen:* PSAK 72-conformiteit is een echt, moeilijk te kopiëren lokaal voordeel — internationale pakketten doen dit niet. SPK/loonbeheer sluit aan op de Indonesische onderaannemingspraktijk (mandor-systeem, waar de naam vandaan komt).
- *Nadelen:* geen CPM, geen transparante prijs (in een markt waar prijsgevoeligheid het beslissende criterium is, is "vraag een demo aan" een verkoopdrempel), S-curve zonder onderliggende netwerkplanning betekent dat de curve handmatig gevoed moet worden.

**KontraktorOS** ([kontraktoros.com](https://kontraktoros.com/)) — cloudplatform voor projectteams, financiën en logistiek. Prijs niet gepubliceerd. Positionering vrijwel identiek aan Mandoran; het segment raakt verzadigd.

**Planvexio** ([planvexio.com](https://planvexio.com/)) — "Platform manajemen proyek konstruksi untuk kontraktor profesional Indonesia". Prijs niet gepubliceerd.

**HitungBangun.id** ([hitungbangun.id](https://hitungbangun.id/)) — "Software RAB & Manajemen Proyek", **Rp 197.000/jaar** (~US$12). Dit is het prijspunt waarop het echte Indonesische MKB koopt. Het is in wezen een RAB-calculator (begrotingstool) met wat projectbeheer; van CPM is geen sprake. Maar het laat zien wat de betalingsbereidheid onderaan de markt is: **twaalf dollar per jaar**.

**Waarnemingen over het Indonesische segment als geheel:** er zijn minstens zes actieve lokale aanbieders, allemaal met dezelfde vorm (bouw-SaaS/ERP met kosten, RAB, dagrapport, S-curve), allemaal zonder CPM, allemaal met <200 klanten. De markt is gefragmenteerd en niemand heeft gewonnen. De inhoudelijke reden dat niemand CPM bouwt is vermoedelijk dat de *aanbestedingseis* een kurva S is, geen netwerk — dus de betalingsbereidheid voor CPM is laag, terwijl de bouwkosten van een correcte CPM-engine hoog zijn.

#### Vietnam

**IBOM** ([ibom.vn](https://ibom.vn/), leverancier: **ISOFT — Công Ty Cổ Phần Phần Mềm Trí Tuệ**) — het serieuste Vietnamese platform.
- *Modules:* IBOM.PM (bouwprojectmanagement), IBOM.IM (investeringsbeheer), IBOM.IS (integraal platform met juridische documentatie, budgettering, workflows). Functionaliteit: voortgangsbewaking, tekeningbeheer, risicoanalyse, TMĐT (totale investeringskostenberekening), kostenbeheersing en cashflow, aanbestedings-/contract-/uitbetalingsbeheer, voorraad-/materieel-/HR-subsystemen, waarschuwingen bij verlopende certificaten.
- *Prijs:* **niet gepubliceerd.**
- *Voor-/nadelen volgens hun eigen (dus bevooroordeelde, maar informatieve) ranglijstartikel* ([IBOM top-8 2026](https://ibom.vn/tin-giai-phap/top-phan-mem-quan-ly-tien-do-cong-trinh-tot-nhat-2026.html)): *voordeel* — "sluit aan bij Vietnamees managementdenken", koppelt planning aan uitvoeringsdata en strategische sturing; *nadeel* — **"overkill als je alleen basis-Gantt nodig hebt"**. Dat laatste is een eerlijke zelfdiagnose en tegelijk de bevestiging dat IBOM een governance-/investeringsplatform is, geen planningstool.
- *Extra observatie:* dat IBOM zichzelf in eigen ranglijst op #1 zet vóór Primavera P6 en MS Project is marketing, maar de rest van de ranglijst (P6 #2, MSP #3, Procore #4, Autodesk Build #5, Fieldwire #6, Buildertrend #7, monday.com #8) is een redelijke weergave van wat er in Vietnam überhaupt bekend is. Opvallend: **Asta, SYNCHRO, TILOS, iTWO en InEight komen er niet in voor** — die bestaan in het Vietnamese bewustzijn niet.

**FastCons** ([fastcons.fastwork.vn](https://fastcons.fastwork.vn/), van FastWork/MBW) — het best geprijsde Vietnamese pakket met échte planningsfunctionaliteit, en het enige lokale pakket in dit rapport met een volledig transparante prijskaart.
- *Prijzen:*
  - **FastCons Basic: 100.000 VND/gebruiker/maand** (~US$4) — alleen interne bedrijfsvoering (HRM, CRM, financiën, kantoor), **géén bouwprojectmanagement**. Onbeperkt gebruikers en projecten.
  - **FastCons Enterprise: 150.000–200.000 VND/gebruiker/maand** (~US$6–8) — minimaal 5 accounts bij het 150k-tarief. Bevat *"Quản lý kế hoạch thi công, Nhật ký thi công, Quản lý vật tư"* (uitvoeringsplanning, bouwdagboek, materiaalbeheer) inclusief **Gantt-achtige planning**. Onbeperkt projecten. Interne bedrijfsvoeringstools gratis meegeleverd.
  - **Mobile Timesheet: 20.000 VND/gebruiker/maand** (~US$0,80) — mobiele tijdregistratie met FaceID en GPS; kan niet als hoofdaccount dienen.
  - **Eenmalige implementatiekosten: 5–12 miljoen VND** (~US$190–460). **[VERIFICATIE — GECORRIGEERD; oorspronkelijk stond hier 2–12 mln VND]** De prijspagina geeft een expliciete staffel voor cloud-setup: **≤30 gebruikers 5.000.000 VND · ≤60 6.000.000 · ≤100 7.000.000 · ≤300 10.000.000 · >300 12.000.000 VND**. De ondergrens is dus 5 mln VND (~US$190), niet 2 mln. **Training: 1.000.000 VND per klas/sessie** (~US$38) — bevestigd. Jaarbetaling verplicht.
- *Voordelen:* ronduit agressieve prijsstelling — een aannemer met 20 gebruikers betaalt ~36 mln VND/jaar (~US$1.380), minder dan één P6-seat. Vietnamees, mobiel-eerst, met FaceID/GPS-tijdregistratie die aansluit op de Vietnamese arbeidspraktijk. Bouwdagboek (nhật ký thi công) is een wettelijk vereist document in Vietnam — dat native ondersteunen is een echt lokaal voordeel.
- *Nadelen:* geen CPM/kritiek pad; de "kế hoạch thi công" is een taakplanning, geen netwerkplanning. **[VERIFICATIE — onzeker]** De prijspagina noemt bij Enterprise wél "Không giới hạn user" naast "Không giới hạn dự án", wat op gebundelde in plaats van zuivere per-seat-verkoop kan duiden; en de verhouding tussen het 150k- en het 200k-tarief (jaarbetaling vs. maandbetaling, dan wel ≥5 accounts) is uit de gepubliceerde tekst niet eenduidig af te leiden. De rekensom "20 gebruikers ≈ 36 mln VND/jaar" berust op het 150k-tarief en is dus een ondergrens; bij 200k wordt het 48 mln VND (~US$1.830) plus 5 mln setup. Per-seat-model wordt duur bij grote organisaties, in tegenstelling tot PROGRESI's onbeperkte model. Verplichte jaarbetaling plus setup-fee is een drempel. Geen IFC.

**GXD (Giá Xây Dựng)** — de gevestigde Vietnamese speler, maar in *calculatie* (dự toán), niet in planning.
- *Producten:* Dự toán GXD (begroting), Thanh Quyết toán GXD (afrekening), Quản lý chất lượng GXD (kwaliteitsbeheer), Đấu thầu GXD (aanbesteding).
- *Prijs:* **softkey 500.000 VND per machine per jaar** (~US$19); **hardkey (USB-dongle) 3.000.000 VND** (~US$114) ([dobockhoiluong.com](https://dobockhoiluong.com/huong-dan-su-dung-phan-mem-du-toan-gxd/)); een bundel van meerdere modules met hardkey op **4.000.000 VND** (~US$152) ([Facebook-groep dutoangxd](https://www.facebook.com/groups/dutoangxd/)). Hardkey-versie heeft onbeperkt gebruik en gratis updates ([giaxaydung.vn](https://giaxaydung.vn/)).
- *Betekenis:* GXD's hardkey-model is een direct antwoord op de piraterij — een USB-dongle valt niet te kraken zoals een serienummer. Dat een Vietnamese leverancier daarvoor kiest bij een prijs van US$114 zegt alles over de handhavingsomgeving.
- *Concurrenten in hetzelfde calculatiesegment:* **Acitt, Escon, Delta, Eta, F1, G8** — allemaal Vietnamese begrotingssoftware. Dit is een verrassend dicht bezet, volwassen lokaal softwaresegment. Geen van deze doet CPM.

**MISA AMIS** ([amis.misa.vn](https://amis.misa.vn/)) — brede Vietnamese enterprise-suite (financiën, boekhouding, HR, sales/marketing, projectmanagement, e-facturen, digitale handtekening, belastingintegratie). Gratis proef met volledige functionaliteit. MISA is een van de grootste Vietnamese softwarehuizen; de projectmodule is generiek, niet bouwspecifiek.

**Base.vn** en **CoDX** — Vietnamese work-management-platforms, generiek, geen bouwspecialisme, geen CPM.

**Kênh Xây Dựng** ([kenhxaydung.vn](https://kenhxaydung.vn/microsoft-project-va-primavera-p6)) is geen software maar een belangrijke Vietnamese vakcommunity/opleidingsportaal die MSP en P6 als "de twee krachtigste voortgangsbeheersoftwarepakketten ter wereld" presenteert en er cursussen bij verkoopt. Vergelijkbaar: **FMIT** ([fmit.vn](https://fmit.vn/tu-dien-quan-ly/software-tools-for-cpm-primavera-ms-project-la-gi)), dat CPM-terminologie in het Vietnamees uitlegt. De Vietnamese markt heeft dus een levendige *kennis*infrastructuur rond CPM, terwijl de *software* import is.

#### Thailand

**Builk (BUILK One Group Co., Ltd., Bangkok)** — het meest interessante lokale bedrijf in de hele regio, om economische in plaats van functionele redenen.
- *Model:* **100% gratis** voor kleine en middelgrote aannemers, gefinancierd door **sponsoring van bouwmateriaalmerken, moderne bouwmarkten, fabrikanten, banken en projectontwikkelaars** ([builk.com/about-us](https://www.builk.com/en/about-us/)). Dit is een advertentie-/leadgeneratiemodel toegepast op bouwsoftware — de aannemer betaalt niets, de materiaalleverancier betaalt voor toegang tot de inkoopstroom.
- *Producten:* **BUILK** (online kostenbeheersing: projectbeheer, offerteaanvragen/RFQ, inkooporders, facturen/bonnen, inkomsten-uitgavenrapportage), **JUBILI by BUILK** (CRM/salesmanagement voor bouwmaterialenhandel), **Yello** (bouwmateriaalprijzen uit de grootste orderdatabase). Verder B2B-e-commerce, field service management en vastgoed-CRM.
- *Schaal:* de eigen opgaven zijn inconsistent — **">18.000 gebruikers"** en **">30.000 bedrijven"** staan op dezelfde site ([about-us](https://www.builk.com/en/about-us/); [homepage](https://www.builk.com/en/)); elders **">25.000 MKB-bouwbedrijven in vijf landen"**. In 2016 werd geclaimd dat via BUILK voor **>US$800 mln** aan projecten werd beheerd.
  **[VERIFICATIE — GECORRIGEERD op twee punten]** (1) De vijf landen zijn **Thailand, Indonesië, Myanmar, Laos en Cambodja** — de **Filipijnen horen er niet bij**; die stonden ten onrechte in de oorspronkelijke opsomming (en dat maakt van "vijf landen" ook weer een consistente vijf in plaats van zes). (2) De inconsistentie is nog groter dan gemeld: elders claimt Builk **">50.000 gebruikers"** voor alleen het BUILK-product. De scepsis in dit rapport is dus terecht en zelfs te mild — behandel elk Builk-gebruikersaantal als marketing. Bevestigd blijft: opgericht 2005, Bangkok, gratis model met sponsoring door bouwmateriaalmerken. ([builk.one](https://www.builk.one/); [Crunchbase](https://www.crunchbase.com/organization/builk-one))
- *Cruciale beperking:* **BUILK doet geen planning.** De productcommunicatie noemt kostenbeheersing, documentbeheer en financiële sturing — **geen Gantt, geen CPM, geen tijdlijn**. Het is een kosten-ERP, geen planner.
- *Voordelen:* onverslaanbare prijs (nul); het grootste lokale gebruikersbestand in de regio; sterke inbedding in de Thaise materiaalketen (SCG is betrokken bij het ecosysteem); Thaise taal en boekhoudpraktijk.
- *Nadelen:* het sponsormodel betekent dat de aannemer het product niet stuurt — de materiaalleverancier wel. Data-eigendom en inkoopneutraliteit zijn reële zorgen. Ontbreken van planning maakt het complementair, niet concurrerend, aan MSP/P6. De inconsistente gebruikersclaims (18k vs. 25k vs. 30k) verdienen scepsis.
- *Let op — veelgemaakte verwarring:* Builk One Group is **niet** hetzelfde als **BBIK / Bluebik Group**, dat wél aan de Stock Exchange of Thailand genoteerd is. Verscheidene zoekbronnen halen deze twee door elkaar. Ik heb geen betrouwbare bevestiging gevonden dat Builk One Group beursgenoteerd is; behandel het als privaat.

**Overig Thailand:** het Thaise kanaal draait om Oracle-resellers (**AppliCAD**, **AkimEng**, **8baht.com**) en trainers (**DETI**, [deti.co.th](https://deti.co.th/)). P6 wordt op **Shopee Thailand** aangeboden ("Primavera P6 Professional v19.12", "Primavera P6 Professional 2023 v22") — een sterke indicatie van grijze/gekraakte distributie ook in Thailand, ondanks een lagere piraterijgraad (66%) dan Indonesië.

#### Maleisië

**BuildTrack** ([buildtrack.com.my](https://buildtrack.com.my/)) — "Construction management software for Malaysian contractors and interior design studios. Run lead-to-cash from one platform". Er is een prijspagina ([buildtrack.com.my/pricing](https://buildtrack.com.my/pricing)) maar de inhoud daarvan was niet uitleesbaar; **geen MYR-prijs vastgesteld**. De positionering ("lead-to-cash", interieurstudio's) verraadt dat dit een commercieel/administratief pakket is, geen planningstool.

**KonstrakOS** ([mydigital.contractors](https://mydigital.contractors/)) — "Cloud construction management platform built for Malaysian contractors — CIDB project contractors and renovation specialists". Prijs niet gepubliceerd. De expliciete verwijzing naar CIDB-geregistreerde aannemers is de kernpositionering: aansluiting op de Maleisische registratie- en compliancestructuur.

**Speedbrick** — cloud-bouwmanagementsoftware, genoemd in bedrijvendatabases ([ensun.io](https://ensun.io/)); weinig publieke informatie.

**RPM Schedulers** ([rpmschedulers.com](https://rpmschedulers.com/)) — geen softwareproduct maar een **dienstverlener**: planning, vertragingsanalyse, scope-analyse. Dit is een belangrijk signaal: in Maleisië is een deel van de vraag naar planning uitbesteed aan gespecialiseerde bureaus die zelf P6 draaien, in plaats van dat de aannemer licenties koopt. Dat drukt de licentiemarkt en verklaart deels waarom Maleisië relatief weinig seats telt bij een relatief groot bouwvolume.

**HashMicro** ([hashmicro.com/my](https://www.hashmicro.com/my/blog/best-construction-management-software/)) — Singaporees/Maleisisch ERP-huis dat vergelijkingsartikelen publiceert en zelf bouw-ERP verkoopt.

#### Filipijnen

**AIMHI Builder Suite** ([aimhi.ai](https://www.aimhi.ai/)) — gepositioneerd als "de eerste AI-aangedreven bouwprojectmanagement-app van de Filipijnen", met "Clarity Intelligence for builders".
- *Functionaliteit:* budgetbewaking, uitgavenmonitoring, kostenraming, risicobeheer, materieel-/materiaaltracking, sitedocumentatie, financiële analyse. Gericht op vier gebruikersgroepen: CEO/CFO, engineers, aannemers, inkoop.
- *Cruciale beperking:* **de site noemt planning, Gantt of CPM niet.** Net als Builk, Mandoran en KontraktorOS is dit een kosten-/inzichtplatform.
- *Prijs:* niet gepubliceerd; wel een prijspagina, een 3-daagse hands-on proef en demoboeking.
- *Voordelen:* eerste bewegers-positie in een markt zonder lokale concurrentie; AI-positionering trekt aandacht van grotere Filipijnse bouwgroepen.
- *Nadelen:* onbewezen schaal (geen klantaantallen gepubliceerd); "© 2023 Eve" in de footer duidt op een klein team/pivot; geen planningsfunctionaliteit; ondoorzichtige prijs.

**BuildIT** — genoemd in de [Tracxn-directory](https://tracxn.com/) van 23 Filipijnse bouwtech-startups (waarvan 2 gefinancierd). Weinig publieke informatie.

**Medianeth.dev** — biedt *maatwerk*bouwsoftware voor Manilla-aannemers met "8–12 weken oplevering". Dat er een levensvatbare markt is voor custom-built bouwsoftware zegt dat het standaardaanbod als ontoereikend wordt ervaren.

**Observatie Filipijnen:** dit is de dunst bezette lokale markt van de zes. Het aanbod is vrijwel volledig import (P6, MSP) plus een zeer groot en levendig **trainingsaanbod** (zie §4.5). De Filipijnen exporteren bovendien grote aantallen planners naar het Midden-Oosten, wat de binnenlandse P6-competentie hoog houdt zonder dat het tot binnenlandse licentieverkoop leidt.

### 3.5 Algemene projectplanningstools

Deze categorie groeit hard in de regio, vooral bij ontwikkelaars, PMO's, interieur- en afbouwbedrijven — niet bij hoofdaannemers voor het bouwprogramma. monday.com richt zich blijkens de bronnen expliciet op "Southeast Asia's adoption gap", wat suggereert dat de regio als onderpenetreerd wordt gezien.

Indicatieve prijzen zoals gepresenteerd op de Indonesische markt ([Ukirama](https://ukirama.com/blogs/software-konstruksi-terbaik) — *let op: dit zijn de conversies van een concurrent, niet de officiële prijslijsten van de leveranciers*):

| Tool | Prijs zoals genoteerd in Indonesië | ≈ USD | Genoemde nadelen |
|---|---|---|---|
| Zoho Projects | Rp 150.000 /gebruiker/mnd | ~US$9 | Beperkte integraties met derden |
| Clockify | Rp 250.000 /gebruiker/mnd | ~US$15 | Handmatige foutcorrectie, geen geautomatiseerde loonverwerking |
| ClickUp | Rp 300.000 /gebruiker/mnd | ~US$18 | Zwak feedbackbeheer, steile leercurve |
| Smartsheet | Rp 300.000 /gebruiker/mnd | ~US$18 | Vereist extra modules, geen realtime updates |
| Asana | Rp 375.000 /gebruiker/mnd | ~US$23 | "Kurang ideal untuk pekerjaan yang membutuhkan grafik intensif atau 3D" |
| Wrike | Rp 400.000 /gebruiker/mnd | ~US$24 | Verwarrende interface |
| OrangeScrum | Rp 600.000 /mnd (5 gebruikers) | ~US$37 | Beperkte mobiele app |
| TeamGantt | Rp 750.000 /gebruiker/mnd | ~US$46 | Geen boekhoud-/financiële functies |
| MS Project | Rp 860.000 /gebruiker/mnd | ~US$53 | (geen genoemd) |
| Fieldwire | Rp 1.250.000 /gebruiker/mnd | ~US$76 | Duur bij grote teams, geen boekhouding in basispakket |
| CMiC | Rp 1.500.000+ /gebruiker/mnd | ~US$92+ | (geen genoemd) |
| Autodesk / BIM 360 | Rp 1.900.000+ /gebruiker/mnd | ~US$116+ | Moeizame overstap |
| Procore | Rp 8.600.000 /mnd (volledige suite) | ~US$527 | Duur, lastige beeldbewerking |
| RedTeam | Rp 11.300.000 /mnd | ~US$693 | (geen genoemd) |
| Sage 300 CRE | Rp 100.000.000+ /jaar | ~US$6.100+ | Verouderde interface, lastige navigatie |
| Oracle Primavera P6 (EPPM) | Rp 60.000.000 | ~US$3.700 | (geen genoemd) |
| Ukirama (lokaal) | Rp 1.000.000 /mnd | ~US$61 | Geen CRM, ongeschikt voor multinationale aannemers |
| Oracle Aconex | niet vermeld | — | (geen genoemd) |

*Wisselkoers gehanteerd: ~Rp 16.300 = US$1 (indicatief, medio 2026).*

**Kritische kanttekening bij deze tabel:** de nadelen zijn geformuleerd door een concurrent (Ukirama, die zichzelf op #1 zet en als enige lokale aanbieder wordt aangemerkt). Dat verklaart waarom MS Project en P6 "geen nadelen" hebben (die zijn niet de directe concurrent) terwijl ClickUp en Asana wel worden afgekraakt. Gebruik de tabel voor de *prijspunten*, niet voor de oordelen.

**Open source** (ProjectLibre, GanttProject, OpenProject) kwam in geen enkele lokale ranglijst of vergelijking naar boven. Dat is opmerkelijk gezien de prijsgevoeligheid, en heeft naar mijn inschatting één dominante oorzaak: **wie geen geld wil uitgeven, gebruikt geen open source maar een gekraakte MS Project.** Het functionele niveau van een gekraakte MSP ligt hoger dan dat van ProjectLibre, de kosten zijn gelijk (nul), en het bestandsformaat is compatibel met wat de opdrachtgever vraagt. Dit is de belangrijkste concurrentiebarrière voor elk gratis/open alternatief in deze regio.

### 3.6 4D/BIM-gekoppelde planning

**Bentley SYNCHRO** en **Autodesk Navisworks** zijn in Singapore de genoemde tools voor 4D-sequentiëring ([Conserve Solution SG](https://www.conservesolution.com/sg/4d-bim-sequencing-simulation/); [Bentley](https://www.bentley.com/software/synchro/)). Singaporese dienstverleners zoals [AcePLP](https://www.aceplp.com.sg/4d-scheduling/) verkopen 4D-planning als *dienst* — opnieuw het patroon dat de tool bij de dienstverlener zit, niet bij de aannemer.

APAC vertegenwoordigde **38,2% van de wereldwijde BIM-softwaremarkt in 2025** (secundaire bron, geen primaire verificatie gevonden — behandel met voorzichtigheid), met megaprojecten als aanjager.

**RIB iTWO**, **ALICE Technologies**, **Nodes & Links**, **InEight**, **Deltek Acumen**, **Safran**, **Trimble TILOS** en **Spider Project**: ik heb **geen enkel bewijs van betekenisvolle aanwezigheid in Zuidoost-Azië** kunnen vinden. Gerichte zoekopdrachten leverden alleen generieke productinformatie zonder regionale klantcases, distributeurs of lokale content op. TILOS zou theoretisch goed passen bij Vietnamese snelwegen en Indonesische tolwegen (lineaire projecten), maar er is geen spoor van adoptie. Deze pakketten zijn in deze markt **projectgebonden import** — ze komen mee met een westerse hoofdaannemer en verdwijnen weer.

---

## 4. Lokale bijzonderheden

### 4.1 Overheidsmandaten: BIM overal, planning nergens

| Land | Instrument | Reikwijdte | Vanaf | Bron |
|---|---|---|---|---|
| **Singapore** | BIM e-submission via CORENET, gefaseerd verplicht | Architectuur geaccepteerd sinds jan 2010, engineering sinds apr 2011, **verplicht in fasen vanaf juli 2013** met dalende projectgrootte-drempel | 2010→2015 | [BCA BIM Roadmap-presentatie](https://www.baa-conference.com/uploads/3WRmjWIA/Part1VivienLeongSingaporesBIMRoadmap1.compressedcopy.pdf) |
| **Singapore** | **CORENET X** — "One-Stop Integrated Digital Shopfront", >20 goedkeuringspunten teruggebracht tot **3 approval gateways**, agentschappen beoordelen het geïntegreerde BIM-model | Alle bouwvergunningen | lopend | [info.corenet.gov.sg](https://info.corenet.gov.sg/regulatory-process/about-the-new-submission-process) |
| **Singapore** | **IDD** (Integrated Digital Delivery) — 19 essentiële use cases, IDD Requirements Guide, Strategic IDD Adoption Guide, Digital Delivery Management-accreditatie, Shared Services Provider-programma via STAS | Bouwsector breed | lopend | [BCA IDD](https://www1.bca.gov.sg/growth-and-transformation/productivity/idd-integrated-digital-delivery/) |
| **Maleisië** | **Pekeliling Perbendaharaan PK 1.15** (Treasury-circulaire, Ministerie van Financiën) — BIM verplicht over de gehele levenscyclus | **Overheids**ontwikkelingsprojecten **≥ RM 10 mln** (verplicht); privésector **aangemoedigd, niet verplicht** — *gecorrigeerd, zie noot* | **1 juli 2025** | [MiLA Asia (PK 1.15-toelichting)](https://mila-asia.com/docs/pk-1-15-pelaksanaan-building-information-modelling-bim/); [The Star](https://www.thestar.com.my/news/nation/2024/09/04/all-projects-worth-rm10mil-and-above-to-use-construction-software-bim-says-ahmad-maslan); [RTM Berita](https://berita.rtm.gov.my/nasional/senarai-berita-nasional/senarai-artikel/projek-bernilai-rm10-juta-ke-atas-perlu-guna-sistem-bim/) |
| **Maleisië** | CIDB BIM-programma; ~**198 nieuwe overheidsprojecten** met BIM, training via **MyBIM Centre** | Overheidsprojecten | 2024 e.v. | [Utusan Malaysia (parlementair verslag)](https://www.utusan.com.my/nasional/2024/10/parlimen); [CIDB](https://www.cidb.gov.my/bim/) |
| **Vietnam** | **Besluit 258/QĐ-TTg** (premier, 17 maart 2023) — routekaart BIM-toepassing | **Fase 1 (vanaf 2023):** verplicht voor klasse I en speciale klasse. **Fase 2 (vanaf 2025):** klasse **II en hoger**. Financieringsscope in beide fasen: publieke investeringsmiddelen (*vốn đầu tư công*), **staatskapitaal buiten publieke investering** (*vốn nhà nước ngoài đầu tư công*) **én PPP** — breder dan in de oorspronkelijke tekst van dit rapport stond. Alleen voor **nieuwe** projecten die aan de projectvoorbereiding beginnen; eerdere vrijwillige toepassing wordt aangemoedigd | 2023 / 2025 | [LuatVietnam](https://english.luatvietnam.vn/xay-dung/decision-258-qd-ttg-2023); [vanban.chinhphu.vn](https://vanban.chinhphu.vn/) |
| **Indonesië** | **Permen PUPR No. 22/PRT/M/2018** over staatsgebouwen | Staatsgebouwen die **niet-eenvoudig** zijn, met **oppervlak >2.000 m²** en **>2 verdiepingen** | 2018 | [BPK RI Peraturan](https://peraturan.bpk.go.id/Details/159730/permen-pupr-no-22prtm2018-tahun-2018); [tekniksipil.id](https://tekniksipil.id/standarisasi-bim-di-indonesia/) |
| **Thailand** | **Geen wettelijk mandaat.** Standaarden via beroepsverenigingen: **Thailand BIM Standard** (EIT), **Thailand BIM Object Standard Guideline** (TBIM), ASA-handboek; SCG werkt met FTI en TBIM aan gestandaardiseerde BIM-objecten | Vrijwillig | 2015→2021 e.v. | [thaibim.net](https://thaibim.net/2021/01/31/now-available-thailand-building-information-modeling-standard-by-eit/); [tbim.or.th](https://tbim.or.th/); [ASA](https://asa.or.th/handbook/handbook20150427/) |
| **Filipijnen** | Geen BIM-mandaat gevonden; wel **PERT/CPM en Precedence Diagram Method verplicht** in DPWH-praktijk en in de standaard-aanbestedingsdocumenten voor infrastructuur | Overheidsinfrastructuur | lopend | [GPPB Philippine Bidding Documents, Infrastructure Works 6th Edition](https://www.gppb.gov.ph/wp-content/uploads/2023/06/Infrastructure-Works-6th-Edition.docx); [GPPB downloadable forms](https://www.gppb.gov.ph/downloadable-forms/) |

> **[VERIFICATIE — GECORRIGEERD: "publiek én privaat" is onjuist]** PK 1.15 is een **Pekeliling Perbendaharaan**, een schatkist-/financiëncirculaire. Zo'n instrument bindt naar zijn aard uitsluitend de rijksoverheid en haar aanbestedende diensten; het kan private opdrachtgevers niet verplichten. De toelichtingen bevestigen dat: BIM is verplicht voor **"all Government development projects valued at RM10 million and above"** per 1 juli 2025, terwijl de circulaire private adoptie **"strongly encourages"** ([MiLA Asia](https://mila-asia.com/docs/pk-1-15-pelaksanaan-building-information-modelling-bim/)). Secundaire bronnen (waaronder de in dit rapport gebruikte formulering "public or private") hebben de aanmoediging tot een verplichting gepromoveerd. Voor de marktinschatting is dit materieel: de afdwingbare vraag beperkt zich tot overheidsopdrachten, niet tot de hele Maleisische bouwsector ≥RM 10 mln.

**Let op een tegenspraak in de Maleisische bronnen:** PlanRadar meldt dat verplichte BIM-implementatie in **augustus 2024** begon ([PlanRadar SG](https://www.planradar.com/sg/malaysian-construction-bim-implementation-august-2024/)), terwijl de meerderheid van de bronnen **1 juli 2025** noemt voor PK 1.15. Vermoedelijk gaat het om twee verschillende instrumenten (een eerdere overheidsrichtlijn versus de latere Treasury-circulaire met RM 10 mln-drempel). **Niet geverifieerd.**

**De hoofdconclusie van deze paragraaf:** de mandaten gaan over **modellen**, niet over **planningen**. Geen enkel land schrijft CPM, een specifieke schedule-kwaliteitsnorm (à la DCMA 14-point) of een specifiek planningsformaat voor. De doorwerking op planningssoftware is dus **indirect** — via 4D-use-cases in Singapore's IDD-programma, en via het feit dat een verplicht BIM-proces de vraag naar model-gekoppelde planning opdrijft.

### 4.2 Aanbestedingseisen — hier zitten de echte planningsverplichtingen

**Indonesië — de kurva S.** Dit is het scherpst gedefinieerde planningsvereiste in de hele regio, en het is géén CPM.
- Een **jadwal pelaksanaan met kurva S** (uitvoeringsschema met S-curve) is een **verplicht onderdeel van het inschrijvingsdossier**; ontbreken leidt tot **automatische diskwalificatie** ([UMA Civil Engineering](https://sipil.uma.ac.id/cara-membuat-jadwal-pelaksanaan-pekerjaan-kurva-s-dengan-benar/)).
- Na contractondertekening is de kurva S het **formele referentiedocument voor voortgangsbewaking** ([Indokontraktor](https://indokontraktor.com/kamus-jasa-konstruksi/kurva-s)).
- De curve moet de werkelijke veldomstandigheden en uitvoeringsmethodiek weerspiegelen zonder de looptijd te verlengen.
- Regelgevend kader via **LKPP** (Lembaga Kebijakan Pengadaan Barang/Jasa Pemerintah, [lkpp.go.id](https://www.lkpp.go.id/)).

**Waarom dit ertoe doet voor softwarekeuze:** een kurva S is een gewogen cumulatieve voortgangscurve gebaseerd op de RAB (begroting). Excel doet dit uitstekend. MS Project doet het slecht (je moet het exporteren en handmatig wegen). P6 doet het redelijk maar met veel configuratie. **Dat verklaart waarom de Indonesische markt zo Excel-zwaar is: het vereiste deliverable is een curve, geen netwerk.** Elk pakket dat een correcte kurva S direct uit een CPM-planning genereert, adresseert een pijnpunt dat geen enkele internationale tool native oplost.

**Filipijnen — PERT/CPM verplicht.** **[VERIFICATIE — bevestigd voor PERT/CPM, onzeker voor PDM]** Onafhankelijk bevestigd: het *Program of Work* voor infrastructuurprojecten moet "estimates of the work, items, quantities and costs **and a PERT/CPM network of the project activities**" bevatten, en herziene PERT/CPM-netwerkdiagrammen zijn vereist bij voortgangsbetalingen ([GPPB Manual of Procedures, Volume 3](https://www.gppb.gov.ph/wp-content/uploads/2023/06/GPM-Volume-3.pdf); [DPWH Philippine Bidding Documents](https://www.dpwh.gov.ph/dpwh/business/procurement/civil_works/forms/pbd_infra); [CAAP MC 11-2021 over progress payments](https://caap.gov.ph/wp-content/uploads/2023/09/MC-11-2021_Guidelines-on-progress-payments-for-work-accomplished-on-infrastructure-projects06-11-2021_compressed.pdf)). Dat maakt de Filipijnen inderdaad het enige van de zes landen met een expliciet voorgeschreven **netwerkplanningsmethode**. Dat daarnaast specifiek de **Precedence Diagram Method (PDM)** wordt *voorgeschreven* is in de aanbestedingsdocumenten zelf niet teruggevonden — dat berust op DPWH-trainingsmateriaal (een Scribd-upload) en is dus **niet bevestigd**; PDM is daar de gangbare praktijk, niet aantoonbaar een eis. De DPWH (Department of Public Works and Highways) en de standaard **Philippine Bidding Documents for Infrastructure Projects** (GPPB, 6e editie) vereisen dat aannemers **PERT/CPM** hanteren ([GPPB](https://www.gppb.gov.ph/wp-content/uploads/2023/06/Infrastructure-Works-6th-Edition.docx); DPWH Bureau of Construction-trainingsmateriaal via [Scribd](https://www.scribd.com/document/432121428/Pdm)). Dit is het enige land in de zes waar een **netwerkplanningsmethode** expliciet is voorgeschreven — en het verklaart waarom de Filipijnen ondanks een relatief kleine markt zo'n groot P6-trainingsaanbod heeft.

**Singapore — PSSCOC.** De Public Sector Standard Conditions of Contract is de standaardcontractvorm voor alle publieke bouwprojecten ([BCA PSSCOC](https://www1.bca.gov.sg/growth-and-transformation/procurement/standard-contract-forms/public-sector-standard-conditions-of-contract-psscoc/)). De contractueel vereiste "master programme" en de detaileisen daaraan heb ik **niet in de brontekst kunnen verifiëren** — de gepubliceerde samenvattingen gaan er niet op in. Wat wel vaststaat: de praktijk in Singapore is een volledig geresourced CPM-programma, doorgaans in P6, met periodieke update en vertragingsanalyse volgens SCL-protocol-achtige beginselen.

**Maleisië en Thailand:** geen specifieke planningsmethodiekvereiste gevonden in de doorzochte bronnen.

### 4.3 Taal- en tekensetvereisten

Dit is een reëel, onderschat obstakel:

- **Vietnamees** gebruikt Latijns schrift met uitgebreide diakritiek (ă â ê ô ơ ư + vijf tonen, via Unicode-combinaties). Software die niet volledig Unicode-correct is, produceert onleesbare taaknamen. Historisch een groot probleem met oudere P6-versies en met XER-uitwisseling.
- **Thai** gebruikt een eigen schrift zonder spatiëring tussen woorden, met boven- en onderliggende tekens. Regelafbreking, tekstmeting in Gantt-balken en sorteervolgorde zijn niet-triviaal. Thaise datumnotatie gebruikt bovendien vaak het **Boeddhistische jaartal (BE = CE + 543)** — een veelvoorkomende bron van fouten in geïmporteerde planningen.
- **Bahasa Indonesia / Bahasa Melayu** zijn Latijns en tekensetneutraal, maar de *terminologie* is sterk gestandaardiseerd (kurva S, RAB, RAP, AHSP/AHSPK, SPK, K3, addendum) en een niet-gelokaliseerde tool voelt onmiddellijk vreemd.
- **Filipijns** bouwjargon is Engels; taal is daar geen barrière.
- **Singapore** werkt volledig in het Engels.

De lokale pakketten winnen hier zonder uitzondering: PROGRESI's AHSPK en K3-modules, Mandoran's PSAK 72 en SPK, FastCons' nhật ký thi công, GXD's Vietnamese calculatienormen. Geen internationaal pakket biedt dit.

### 4.4 Resellers en kanaalstructuur

Het kanaal is **dun en geconcentreerd**, met één opvallend feit: **Crown Systems (S) Pte Ltd** in Singapore presenteert zich als de geautoriseerde Oracle Primavera-distributeur, -reseller én -trainingscentrum voor **vijf landen tegelijk** (Singapore, Brunei, Indonesië, Filipijnen, Vietnam) ([bron](https://www.streetdirectory.com/businessfinder/company_detail.php?companyid=21973)). Dat één Singaporese partij vijf markten bedient zou betekenen dat de lokale verkoop- en supportcapaciteit in Indonesië, Vietnam en de Filipijnen structureel beperkt is — een van de redenen waarom P6 daar buiten de EPC-bubbel nauwelijks penetreert.

> **[VERIFICATIE — ONZEKER]** De formulering is bij de bron woordelijk teruggevonden ("authorized Distributor, Reseller and Training Center for Oracle Primavera in Singapore, Brunei, Indonesia, Philippines and Vietnam", plus Oracle Certified Gold Partner). **Maar:** het is een zelf-aangeleverd profiel in een bedrijvengids **zonder enige datum of laatst-bijgewerkt-indicatie**, en "Oracle Certified Gold Partner" is een partnerniveau dat Oracle jaren geleden heeft afgeschaft (opgegaan in het Oracle Partner Network / Oracle PartnerNetwork-tiers). Dat wijst op een verouderd profiel. Zonder bevestiging in Oracle's eigen partnerregister is dit **geen betrouwbare basis** voor de daarop gebouwde conclusie over de kanaalstructuur van vijf landen. Behandel de conclusie ("dun kanaal") als plausibel maar niet bewezen.

Overzicht van geïdentificeerde kanaalpartijen:

| Land | Partij | Rol |
|---|---|---|
| Singapore (+BN, ID, PH, VN) | Crown Systems (S) Pte Ltd | Oracle Gold Partner, distributeur/reseller/training Primavera |
| Maleisië | IPEC Systems | P6 EPPM, Primavera Cloud, Unifier, Aconex |
| Thailand | AppliCAD Co., Ltd. | Primavera-distributeur |
| Thailand | AkimEng | Primavera-prijslijst/reseller |
| Thailand | 8baht.com | P6 EPPM on-premises |
| Thailand | DETI | P6-training |
| Indonesië | softwareasli.com | Distributeur/reseller (eigen claim) |
| Indonesië | Kitameraki | Officieel Microsoft-distributeur |
| Indonesië | Multicakra | Microsoft-reseller én **verhuur** van software |
| Indonesië | Bhinneka, Farinotech | Microsoft-licenties |
| Griekenland/globaal | Elioplus, G2, AppsRunTheWorld | Reseller-directories voor de regio |

**De verhuurcategorie verdient aandacht:** Multicakra biedt expliciet "jual / rental software Microsoft". Softwareverhuur per maand of per project is in Indonesië een gangbaar model dat in westerse markten niet bestaat, en het is een directe reactie op de kapitaalschaarste bij aannemers.

### 4.5 Opleidingscultuur — een markt op zich

Training is in deze regio een **grotere en zichtbaarder markt dan licenties**. De reden is simpel: de licentie kan men "regelen"; de kennis niet.

**Indonesië — Primavera P6-training, prijzen per deelnemer:**

| Aanbieder | Vorm | Prijs (IDR) | ≈ USD |
|---|---|---|---|
| [PUSDIKIPD](https://www.pusdikipd.com/pelatihan-primavera-p6-level-dasar-tahun-2025/) | Level Dasar 2025 | **Rp 5.500.000** | ~US$337 |
| [PrimaveraReader (private)](https://www.primaverareader.com/) | Private, min. 2 deelnemers | **Rp 3.950.000** | ~US$242 |
| PrimaveraReader (semi-private) | min. 3 deelnemers | **Rp 3.750.000** | ~US$230 |
| PrimaveraReader (regulier) | min. 10 deelnemers | **Rp 3.150.000** | ~US$193 |
| [Danis Mitra Utama](https://danismitrautama.com/) | Offline | **Rp 3.500.000** | ~US$215 |
| Danis Mitra Utama | Online | **Rp 2.800.000** | ~US$172 — 10% groepskorting bij ≥3 |
| [Projects.co.id](https://projects.co.id/) | 4-daagse training, min. 2 deelnemers | **Rp 3.500.000** | ~US$215 |
| Scribd-aanbieding (regulier) | min. 10 deelnemers | **Rp 2.750.000** | ~US$169 — Rp 200.000 korting bij Zoom |
| [Kelas Teknik](https://kelasteknik.id/training-primavera) | Online, levenslange opnames | **vanaf Rp 100.000** | ~US$6 |

De spreiding is een factor 55 (Rp 100k tot Rp 5,5 mln). Dat weerspiegelt twee verschillende producten: geaccrediteerde klassikale training voor bedrijven die het als opleidingsbudget declareren, versus goedkope online video-cursussen voor individuen die hun cv willen opwaarderen.

**Filipijnen:** cursusprijzen lopen van **PHP 1.000 tot PHP 73.200** (Manilla) resp. PHP 1.000–72.600 landelijk ([Laimoon](https://laimoon.com/)). Aanbieders: ICAD Training Center, CIM Education Center, Spoclearn, Invensis Learning, Simpliaxis, Unichrone, The Knowledge Academy. ICAD adverteert klassikaal onderwijs ("face to face class") vanaf juni 2025 — een teken dat post-pandemische klassikale training terugkeert.

**Vietnam:** **2.000.000 VND** (~US$76) voor een praktijkgerichte P6-cursus, online of offline, flexibel gepland ([kienthucxanh.org](http://www.kienthucxanh.org/2024/08/chao-mung-ban-en-voi-khoa-hoc-thuc.html)). Verdere aanbieders: [primavera.vn](https://primavera.vn/), Primavera Solutions Việt Nam, StudyVN Academy, Technico. De Vietnamese prijs is fors lager dan de Indonesische — vermoedelijk een gevolg van hardere concurrentie tussen kleine zelfstandige trainers.

**Singapore:** [BCA Academy](https://www.bcaa.edu.sg/) verzorgt onder meer de PSSCOC-cursus. De **Productivity Solutions Grant (PSG)** dekt tot **50%** van de kosten van vooraf goedgekeurde IT-oplossingen, apparatuur en consultancy, met een gerapporteerd plafond van **S$30.000 per jaar** ([BCA Built Environment PSG](https://www1.bca.gov.sg/grants-and-funded-programmes/built-environment-productivity-solutions-grant/); [GoBusiness](https://grants.gobusiness.gov.sg/support/productivity-solutions-grant); [Bimeco](https://www.bimeco.io/blog/bim-psg-grant/)). *Let op:* PSG werkt met een lijst van vooraf gescopete oplossingen; **of specifieke planningssoftware daarop staat, heb ik niet kunnen verifiëren.* Dit is voor een leverancier de belangrijkste te onderzoeken toegangsroute tot de Singaporese MKB-markt: op de PSG-lijst komen betekent effectief een prijshalvering.

**Culturele observatie:** in Indonesië en Vietnam is een certificaat een carrière-instrument. Trainingsaanbieders adverteren met de ervaring van de instructeur ("meer dan 10 jaar planning met Primavera P6 in olie/gas en multinationals"). De vraag naar P6-training is daarmee deels **losgekoppeld van de vraag naar P6-licenties**: mensen leren P6 om in aanmerking te komen voor een baan bij een internationale EPC-aannemer of in het Midden-Oosten, niet omdat hun huidige werkgever een licentie heeft.

### 4.6 Informele en gekraakte licenties

**De harde cijfers (BSA Global Software Survey 2018, i.s.m. IDC, 110+ landen; wereldwijd 37% ongelicentieerd, waarde US$46,3 mrd):**

| Land | Ongelicentieerd | Bron |
|---|---|---|
| **Indonesië** | **83%** | [English MST Vietnam](https://english.mst.gov.vn/vietnam-records-higher-usage-of-patent-software-bsa-survey-197137294.htm); [Saigoneer](https://saigoneer.com/) |
| **Vietnam** | **74%** | [VietnamNet](https://vietnamnet.vn/en/); [Saigoneer](https://saigoneer.com/) |
| **Thailand** | **66%** | [Saigoneer](https://saigoneer.com/) |
| **Filipijnen** | **64%** | [Saigoneer](https://saigoneer.com/) |
| **Brunei** | **64%** | [Saigoneer](https://saigoneer.com/) |
| **Singapore** | **27%** | [Saigoneer](https://saigoneer.com/) |
| Azië-Pacific gemiddeld | **57%** | [VietnamNet](https://vietnamnet.vn/en/) |
| **Maleisië** | **51%** *(gevonden bij verificatie)* | [BSA persbericht Maleisië](https://www.bsa.org/news-events/news/businesses-in-malaysia-should-assess-their-software-needs-and-eliminate-unlicensed-software-use-in-order-to-reduce-the-risk-of-cyberattacks-and-boost-bottom-line-says-bsa); [gss.bsa.org/countries](https://gss.bsa.org/countries/) |

> **[VERIFICATIE — LEEMTE GEDICHT + waarschuwing]** Het ontbrekende Maleisische cijfer is **51%** in de BSA-survey van 2018 (2 punten lager dan de **53%** uit de survey van 2016 — let op, meerdere secundaire bronnen citeren nog die oudere 53%). Daarmee is de rangorde compleet: **Indonesië 83% > Vietnam 74% > Thailand 66% > Filipijnen 64% > Maleisië 51% > Singapore 27%**, tegen 57% APAC-gemiddeld. Belangrijk gevolg voor §2.4: het rapport zet Maleisië's betaalpercentage op "~55–65%", vergelijkbaar met Thailand — maar Maleisië is met 51% piraterij **duidelijk schoner dan Thailand (66%)** en zou dus een hógere betaalfractie moeten krijgen dan Thailand, niet dezelfde. De monetisatie-index van Maleisië (1,6×) is daarmee eerder te laag dan te hoog. De overige vijf landcijfers zijn onafhankelijk bevestigd bij BSA zelf.

*Kanttekening: dit is de meest recente BSA-survey waarvoor landcijfers beschikbaar zijn (2018, meetjaar 2017). De cijfers zijn inmiddels ruim acht jaar oud; de trend is wereldwijd dalend, maar de onderlinge rangorde is naar alle waarschijnlijkheid stabiel. Het gebruik van deze cijfers als directe proxy voor het betaalpercentage van **professionele bouwplanningsoftware** blijft een aanname: BSA meet alle software op alle pc's, gedomineerd door besturingssystemen en kantoorpakketten, niet door enterprise-engineeringtools.*

**Concreet bewijs uit de bouwsoftware zelf:**
- Op de Indonesische marktplaats **toco.id** staat "Primavera P6 Professional Full Version Software" voor **Rp 150.550** (~US$9) — tegenover een lijstprijs van US$3.880. Op **Shopee Indonesië** wordt "Primavera P6 Professional Full Version Software Management Full Lisensi" met "lifetime licensing" aangeboden. Op **Tokopedia** staan pagina's `find/primavera-p6` en `find/primavera-software` met "harga murah" (goedkope prijzen).
- Op **Shopee Thailand** worden "Primavera P6 Professional v19.12" en "Primavera P6 Professional 2023 v22" verkocht met "kwaliteitsgarantie".
- Vietnamese sites publiceren openlijk gidsen getiteld *"Tải Phần Mềm Primavera P6 Full Crack: Hiểu Rõ Nguy Cơ và Cách Tải An Toàn"* (Primavera P6 full crack downloaden: begrijp de risico's en hoe je veilig downloadt) — let op de framing: niet "of", maar "hoe veilig".
- Er circuleren GitHub-repository's met "Primavera P6 Professional Crack — 100% Working", freelancer-opdrachten voor gekraakte versies, en Facebook-groepen waarin het openlijk wordt besproken.

**De structurele gevolgen, die elk marktmodel moet meenemen:**
1. **De installed base is een veelvoud van de betaalde base.** In Indonesië en Vietnam is de verhouding vermoedelijk 3–6:1. Marktomvang gemeten in omzet zegt niets over marktomvang gemeten in gebruikers.
2. **Piraterij verstevigt de positie van de marktleiders.** Dit is contra-intuïtief maar cruciaal: omdat P6 en MS Project gratis verkrijgbaar zijn voor wie niet betaalt, is er **geen prijsvoordeel te behalen door over te stappen** op een goedkoper alternatief. Een gratis open-source planner concurreert niet met een US$3.880-product, maar met een US$9-product dat functioneel superieur is. Dit is de belangrijkste enkele reden waarom ProjectLibre/GanttProject in deze regio nergens zijn.
3. **Het verklaart de dongle-strategie van lokale leveranciers.** GXD's hardkey (3–4 mln VND) is duurder dan de softkey (500k VND/jaar) juist omdat hij niet te kraken is.
4. **Het verklaart waarom lokale leveranciers SaaS kiezen.** PROGRESI, Mandoran, FastCons, IBOM, Builk zijn allemaal cloud-only. Een serverside SaaS is het enige distributiemodel dat in deze markten niet te kraken is. **De verschuiving naar SaaS in Zuidoost-Azië is dus geen technologiekeuze maar een anti-piraterijkeuze.**
5. **De formele sector is wél compliant.** Internationale EPC-aannemers, beursgenoteerde bedrijven en bedrijven die voor multilateraal gefinancierde projecten werken, kunnen zich piraterij niet veroorloven (audit-risico, contractuele verplichtingen, ISO-certificering). Daar zit dus de volledige betalende markt — wat opnieuw de tweedeling uit §1.1 bevestigt.

### 4.7 Binnenlands versus internationaal/export-EPC — de scheidslijn expliciet

| Dimensie | Binnenlandse projecten | Internationale / export-EPC-projecten |
|---|---|---|
| **Typische opdrachtgever** | Lokale overheid, lokale ontwikkelaar, staatsbedrijf | IOC/NOC (Petronas, PTT, Pertamina), buitenlandse investeerder, ADB/Wereldbank/JICA |
| **Typische hoofdaannemer** | Lokale aannemer, BUMN Karya (ID), CIDB G7 (MY) | Japanse, Koreaanse, Chinese, Europese aannemer; joint ventures |
| **Planningssoftware** | **MS Project**, Excel, lokale SaaS | **Primavera P6**, contractueel voorgeschreven |
| **Deliverable** | Kurva S (ID), voortgangs-Gantt, %-rapportage | Geresourced CPM-netwerk, XER-uitwisseling, baselinevergelijking, EOT/vertragingsanalyse |
| **Update-frequentie** | Maandelijks, vaak handmatig | Wekelijks, met progress reporting-workflow |
| **Rolbenaming** | Site engineer / pelaksana, "erbij" | Planning Engineer / Project Controls Manager, fulltime |
| **Licentiestatus** | Vaak informeel | Compliant, ge-audit |
| **Taal van de planning** | Lokale taal + Engels gemengd | Engels |
| **Salarisniveau planner** | Lokaal marktniveau | Fors hoger; vaak opstap naar Midden-Oosten |
| **Betalingsbereidheid software** | US$5–100/gebruiker/maand | US$1.500+/gebruiker/jaar TCO |

Bewijs voor deze scheidslijn: PT Hutama Karya (Indonesische staatsaannemer) werft aparte **Scheduler**-functies voor nationale strategische projecten ([LinkedIn](https://www.linkedin.com/jobs/view/scheduler-at-pt-hutama-karya-persero-3798186302)); trainingsaanbieders adverteren met instructeurs met "10+ jaar planning met P6 in olie/gas en multinationals"; Indonesische academische literatuur behandelt MSP en P6 als *aparte* werelden en niet als concurrenten binnen één keuze.

**Wat ik niet heb kunnen bevestigen:** ondanks gerichte zoekopdrachten vond ik **geen publiek document** waarin Petronas, PTT of Pertamina P6 formeel voorschrijft in hun contractvoorwaarden. Dat het in de praktijk zo werkt is breed erkend in de vakwereld, maar het is in dit rapport een **onbevestigde aanname** — geen bewezen feit.

### 4.8 Overige regionale eigenaardigheden

- **Uitbesteding van planning aan bureaus.** In Maleisië (RPM Schedulers) en Singapore (AcePLP voor 4D) zit de tool bij de dienstverlener. Dit is een structurele rem op de licentiemarkt: één bureau met tien P6-seats bedient dertig aannemers die anders elk seats zouden kopen.
- **Softwareverhuur** (Multicakra, Indonesië) — maandelijkse of projectgebonden verhuur van Microsoft-licenties, een model dat inspeelt op de projectcyclus van aannemers.
- **Maatwerksoftware als categorie** (Medianeth.dev, Manilla: 8–12 weken oplevering). Dat dit levensvatbaar is, betekent dat het standaardaanbod als onvoldoende passend wordt ervaren.
- **De ranglijst-content-industrie.** Elke markt heeft leveranciers die zelf "top 10/18 software"-artikelen publiceren waarin ze zichzelf op #1 zetten (Ukirama in Indonesië, IBOM in Vietnam, HashMicro in Maleisië). Voor onderzoek zijn deze bruikbaar als *inventarisatie van wat bekend is*, niet als *beoordeling*.
- **Prijs-in-lokale-valuta is zelden echte lokale prijsstelling** — *maar deze stelling is bij verificatie te absoluut gebleken.* De meeste "lokale" prijzen die ik voor internationale producten vond zijn inderdaad omrekeningen van de USD-lijstprijs (soms met reseller-marge). **Microsoft voert echter aantoonbaar wél een regionale opslag**: Project Standard 2024 kost SG$1.109 en Project Professional 2024 SG$2.199 in de Microsoft Store Singapore, respectievelijk ~26% en ~51% boven de omgerekende Amerikaanse lijstprijs (zie de verificatienoot in §3.3). Voor Oracle/Primavera is regionale differentiatie **niet aangetoond en niet weerlegd**. Kortingen komen daarnaast tot stand via onderhandeling per deal (volume, meerjarig, enterprise agreement), niet via een gepubliceerde regionale prijslijst.

---

## 5. Wat ik niet heb kunnen vaststellen

Eerlijkheidshalve, de open punten:

1. ~~**Geen officiële Oracle-prijslijst.**~~ **[VERIFICATIE — GECORRIGEERD]** Het PDF-prijslijstdocument gaf **geen 404**: `https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf` levert **HTTP 200** met een 216 KB PDF getiteld *Oracle Primavera Global Price List*, gehost op oracle.com zelf. Het document is bij deze verificatie wel opgehaald maar niet betrouwbaar naar tekst te converteren (ingebedde/gecodeerde opmaak), zodat de tabelwaarden er niet uit bevestigd konden worden. De juiste formulering is dus: *er bestaat wél een officieel Oracle-prijslijstdocument, maar de inhoud is niet uitleesbaar gebleken* — niet dat het niet bestaat. Onafhankelijke bevestiging van US$3.880/US$4.240/22% kwam er intussen alsnog, via reseller PRM (§3.2). Oracle's eigen ASEAN-productpagina bevat inderdaad geen prijzen ([oracle.com/sg](https://www.oracle.com/sg/construction-engineering/primavera-p6/)).
2. **Geen marktcijfer specifiek voor de SEA-6.** Alle beschikbare rapporten zijn APAC-breed of wereldwijd; het SEA-aandeel is door mij geschat.
3. **Geen betrouwbaar aantal geregistreerde aannemers** voor Maleisië (CIDB), Indonesië (LPJK), Filipijnen (PCAB), Singapore (BCA) of Vietnam — de registers bestaan online maar publiceren geen totalen in doorzoekbare vorm.
4. **Geen MYR-prijzen** voor Maleisische lokale pakketten (BuildTrack's prijspagina was niet uitleesbaar; KonstrakOS publiceert niet).
5. **Geen PHP-prijzen** voor AIMHI of andere Filipijnse pakketten.
6. **Geen bevestiging van P6-verplichting** in de contractvoorwaarden van Petronas/PTT/Pertamina.
7. **Geen PSSCOC-detail** over de contractueel vereiste master programme.
8. ~~**Maleisische piraterijgraad** ontbreekt.~~ **[OPGELOST bij verificatie: 51% (BSA 2018); 53% in de survey van 2016.]** Zie §4.6.
9. **Builk's corporate status** (privaat vs. genoteerd) is niet definitief vastgesteld; meerdere bronnen verwarren het met Bluebik/BBIK. **[Verificatie: geen enkele aanwijzing voor een SET-notering aangetroffen; de behandeling als privaat bedrijf is de juiste voorzichtige keuze.]**
10. **De piraterijcijfers zijn van 2018** — ruim acht jaar oud, en meten alle software op alle pc's, niet specifiek engineeringsoftware.
11. **AppliCAD Thailand** gaf 503 bij directe fetch; hun productportfolio is alleen via zoekresultaten bekend.

---

## Verificatie

Onafhankelijke, adversariële toets van 14 falsifieerbare kernbeweringen (uitgevoerd 25 juli 2026). Opzet: elke bewering is actief geprobeerd te **weerleggen**, met andere bronnen dan de oorspronkelijk gebruikte, primaire bronnen waar mogelijk en lokale taal (Bahasa Indonesia, Vietnamees, Bahasa Melayu) waar relevant. Alle schattingen zijn nagerekend. Correcties zijn ook **in de lopende tekst** verwerkt, gemarkeerd als `[VERIFICATIE — …]`.

**Samenvattend oordeel:** het rapport is feitelijk beter dan gemiddeld — de prijsinformatie houdt vrijwel volledig stand en is op het belangrijkste punt (Oracle) nu ook dubbel bevestigd. De zwakte zit niet in de feiten maar in **twee overgeneralisaties** (Microsoft-prijsstelling, Maleisisch BIM-mandaat) en in de **presentatie van de marktomvangschatting als convergentie van twee onafhankelijke methoden**, wat zij niet is.

| # | Bewering | Oordeel | Bevinding | Bron |
|---|---|---|---|---|
| 1 | **Oracle P6 Professional US$3.880 / P6 Enterprise US$4.240 per user, eeuwigdurend; +22% support/jaar; 5-jaars-TCO ~US$8.150** | **bevestigd** (versterkt) | Weerlegging mislukt — en de belangrijkste zwakte van het rapport ("één Thaise reseller") is opgeheven. Een Turkse Oracle-reseller noemt onafhankelijk exact US$3.880 en US$4.240, "named-user perpetual, excluding maintenance", plus 22% onderhoud met eerstejaarssupport US$854 resp. US$933 (= 0,22 × de licentieprijs, tot op de dollar). AkimEng-lijst woordelijk nagelezen: metriek is Oracle's **"Application User"**, niet "named user"; lijst is **ongedateerd**. TCO-som nagerekend: 3.880 + 5 × 854 = 8.150 ✓ (wel een ondergrens: het rapport noemt zelf 3–8% jaarlijkse support-indexatie en rekent die niet mee — met 5% escalatie wordt het ~US$8.600) | [prmyazilim.com](https://prmyazilim.com/en/primavera-p6-pricing) · [akimeng.com](https://www.akimeng.com/oracle-primavera-price-list.html) |
| 2 | **Primavera Risk Analysis US$10.450 / Progress Reporter US$1.460** | **onzeker** | Blijft single-source (alleen AkimEng); geen tweede notering gevonden. Risk Analysis is bovendien een uitgefaseerd product, dus mogelijk een legacy-prijs | [akimeng.com](https://www.akimeng.com/oracle-primavera-price-list.html) |
| 3 | **Primavera Cloud US$175/gebruiker/maand, min. 5 seats per module** | **gecorrigeerd** | Eén punt in een range die per bron met factor 2,3 verschilt: US$130/gebr./mnd (5-user pakket à US$7.800/jr) — US$175 (rapportbron) — US$305 bij **minimum 25 gebruikers**. Ook het seat-minimum verschilt per bron (5 vs. 25). Presenteer als **US$130–305, min. 5–25 seats** | [CDP Inc.](https://cdp-inc.com/products/software/purchase-oracle-primavera-cloud-5-users) · [Global PM](https://globalpm.com/oracle-primavera-cloud-pricing/) · [PRM](https://prmyazilim.com/en/primavera-p6-pricing) |
| 4 | **"Geen officiële Oracle-prijslijst; het PDF-document gaf 404"** (§5.1) | **gecorrigeerd** | Weerlegd. De *Oracle Primavera Global Price List* op oracle.com geeft **HTTP 200** en levert een 216 KB PDF. Inhoud bleek niet betrouwbaar naar tekst te converteren, dus de tabelwaarden zijn er niet uit bevestigd — maar "bestaat niet / 404" is onjuist | [oracle.com](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf) (HTTP 200, 221.160 bytes, `%PDF-1.5`) |
| 5 | **MS Project Plan 1/3/5 = US$10/30/55; Standard 2024 US$679,99; Professional 2024 US$1.129,99** | **bevestigd** | Alle vijf bedragen bevestigd, inclusief bij Microsoft zelf voor de eeuwigdurende edities | [Microsoft Store US](https://www.microsoft.com/en-us/microsoft-365/p/project-standard-2024/cfq7ttc0prmx) · [costbench](https://costbench.com/software/project-management/microsoft-project/) |
| 6 | **"Wereldwijde lijstprijs, geldt ook in ZO-Azië — Microsoft doet geen regionale prijsstelling voor Project"** (§3.3 en §4.8) | **gecorrigeerd (weerlegd)** | De sterkste weerlegging van deze toets. Microsoft Store **Singapore**: Project Standard 2024 **SG$1.109** (≈US$860 bij SGD 1,29/USD = **+26%** t.o.v. US$679,99) en Project Professional 2024 **SG$2.199** (≈US$1.705 = **+51%** t.o.v. US$1.129,99). Na aftrek van 9% GST resteert +16% resp. +38%, en de opslag is niet eens uniform tussen de twee edities. Microsoft voert dus **wel** regionale prijsstelling in ZO-Azië. Voor de abonnementen (Plan 1/3/5) geen SGD-notering gevonden → daar blijft het onbevestigd. De bredere conclusie in §4.8 is dienovereenkomstig afgezwakt | [Microsoft Singapore](https://www.microsoft.com/en-sg/microsoft-365/project/compare-microsoft-project-management-software) |
| 7 | **PROGRESI: Rp 2 mln/mnd · Rp 10 mln/6 mnd · Rp 18 mln/jaar, alle plannen onbeperkt gebruikers én projecten; >100 klanten; gratis PROGRESI Lite** | **bevestigd** | Rechtstreeks bij de leverancier geverifieerd in het Indonesisch: "Tanpa batasan jumlah pengguna" en "Tanpa batasan proyek yang diinput" op alle betaalde plannen; 6-maandenplan geeft 7 maanden, jaarplan 14 maanden (dus de "1 resp. 2 maanden gratis" klopt); "100+ Kontraktor & Instansi Pendidikan"; Lite gratis op iOS en Android. Modules Planning/Daily Reporting/Analysis met Gantt en kurva S bevestigd. Dat er géén CPM-engine onder zit, is **niet hard vast te stellen** — het is een afwezigheidsargument uit productcommunicatie; behandel die deelconclusie als plausibel maar onbewezen | [progresi.co.id](https://progresi.co.id/) |
| 8 | **FastCons: Basic 100k VND, Enterprise 150–200k VND/gebr./mnd, Mobile Timesheet 20k, setup 2–12 mln VND, training 1 mln VND** | **gecorrigeerd** | Prijzen per gebruiker bevestigd op de Vietnamese prijspagina. **De setup-staffel is fout weergegeven:** de gepubliceerde staffel is ≤30 gebr. **5 mln** · ≤60 6 mln · ≤100 7 mln · ≤300 10 mln · >300 **12 mln VND**. De ondergrens is dus **5 mln VND (~US$190)**, niet 2 mln (~US$76) — de instapdrempel voor een kleine aannemer is ruim 2,5× hoger dan gemeld. Training 1 mln VND/klas bevestigd | [fastcons.fastwork.vn/bang-gia](https://fastcons.fastwork.vn/bang-gia/) |
| 9 | **Marktomvang US$60–110 mln/jaar, onderbouwd via twee convergerende onafhankelijke methoden** | **gecorrigeerd** | Alle rekenstappen binnen A en B kloppen (nagerekend: 43,1 / 137,0 / 1.630 / 8.150 / 3,1–3,5 / 41–86,5). Twee bezwaren tegen de constructie: **(a) de methoden zijn niet onafhankelijk** — beide starten op dezelfde GlobalData-bouwproductie, en methode B's plannersaantal wordt letterlijk uit die productie afgeleid; convergentie is ingebouwd, niet gevonden. **(b) De sprong van de overlap 43–86 naar 60–110 tilt de ondergrens 40% op** terwijl het gegeven argument (onzichtbare enterprise-deals) alleen het plafond raakt. Verdedigbaar uit de eigen som: **US$43–110 mln**. De groei van 12–18% p.j. is een overname van APAC-CAGR's zonder SEA-specifieke onderbouwing → onzeker | eigen herberekening; §2.4 |
| 10 | **SEA-bouwproductie US$538,5 mrd (2024, GlobalData) én US$571 mrd (2025, TheReportCubes) als twee referenties** | **gecorrigeerd** | US$538,5 mrd voor 2024 bij CAGR 6,2% is bevestigd. Maar 538,5 × 1,062 = **571,9** — het "tweede" cijfer is vrijwel zeker een afgeleide van het eerste, geen onafhankelijke waarneming. Bovendien: US$571 mrd (2025) → US$981,2 mrd (2034) is **6,0% CAGR**, niet de vermelde 6,2% | [ResearchAndMarkets/GlobalData](https://www.businesswire.com/news/home/20240823508342/en/South-East-Asia-Construction-Industry-Report-2024-Market-Size-will-be-Evaluated-at-$538.5-Billion-in-2024-Growing-at-a-CAGR-of-6.2-During-2024-2028---ResearchAndMarkets.com) |
| 11 | **Landverdeling omzet + monetisatie-index (Singapore ~4,3× bij 25–30% omzet en 6–7% bouwproductie)** | **gecorrigeerd** | Alle zes indices intern consistent nagerekend. **Maar de kolom bouwproductie-aandeel telt op tot ~92%, niet 100%** (middenwaarden), terwijl de omzetkolom op ~101,5% uitkomt. Genormeerd zakt Singapore van 4,3× naar **~3,9×**. Kwalitatieve conclusie (Singapore monetiseert enkele malen beter) blijft staan | eigen herberekening; §2.4 |
| 12 | **Piraterijgraden (BSA 2018): ID 83%, VN 74%, TH 66%, PH 64%, SG 27%; Maleisië onbekend** | **bevestigd + leemte gedicht** | De vijf genoemde percentages bevestigd bij BSA zelf. **Maleisië = 51%** in de survey van 2018 (53% in die van 2016 — dat oudere cijfer circuleert nog veel). Gevolg voor §2.4: Maleisië is met 51% duidelijk *schoner* dan Thailand (66%), maar krijgt in het model hetzelfde betaalpercentage (55–65%) — inconsistent, de Maleisische monetisatie-index is vermoedelijk te laag gezet. Extra kanttekening: BSA meet álle software op álle pc's, wat een zwakke proxy is voor betaalgedrag rond enterprise-engineeringtools | [BSA Maleisië](https://www.bsa.org/news-events/news/businesses-in-malaysia-should-assess-their-software-needs-and-eliminate-unlicensed-software-use-in-order-to-reduce-the-risk-of-cyberattacks-and-boost-bottom-line-says-bsa) · [gss.bsa.org/countries](https://gss.bsa.org/countries/) |
| 13 | **Maleisië: PK 1.15 maakt BIM verplicht voor projecten ≥RM 10 mln, publiek én privaat, vanaf 1 juli 2025** | **gecorrigeerd** | Datum en RM 10 mln-drempel bevestigd; uitgever (Ministerie van Financiën) bevestigd. **"Publiek én privaat" is onjuist:** PK 1.15 is een schatkistcirculaire en verplicht **"all Government development projects valued at RM10 million and above"**; private adoptie wordt "strongly encouraged", niet verplicht. Secundaire persbronnen hebben de aanmoediging tot verplichting gepromoveerd. Materieel voor de marktinschatting: de afdwingbare vraag is beperkt tot overheidsopdrachten | [MiLA Asia](https://mila-asia.com/docs/pk-1-15-pelaksanaan-building-information-modelling-bim/) · [RTM Berita](https://berita.rtm.gov.my/nasional/senarai-berita-nasional/senarai-artikel/projek-bernilai-rm10-juta-ke-atas-perlu-guna-sistem-bim/) |
| 14 | **Vietnam: Besluit 258/QĐ-TTg (17-3-2023), klasse I/speciaal vanaf 2023, klasse II vanaf 2025** | **bevestigd** (scope aangevuld) | Datum, nummer en fasering bevestigd in de Vietnamese grondtekst. Twee aanvullingen: fase 2 betreft "công trình **cấp II trở lên**" (klasse II **en hoger**), en de financieringsscope is in beide fasen breder dan "publieke investeringsmiddelen": ook *vốn nhà nước ngoài đầu tư công* (staatskapitaal buiten publieke investering) **en PPP**. Geldt alleen voor nieuwe projecten die aan de projectvoorbereiding beginnen | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Xay-dung-Do-thi/Quyet-dinh-258-QD-TTg-2023-ap-dung-Mo-hinh-thong-tin-cong-trinh-BIM-trong-hoat-dong-xay-dung-559799.aspx) · [Đảng Cộng sản – tulieuvankien](https://tulieuvankien.dangcongsan.vn/he-thong-van-ban/van-ban-quy-pham-phap-luat/quyet-dinh-so-258qd-ttg-ngay-1732023-cua-thu-tuong-chinh-phu-phe-duyet-lo-trinh-ap-dung-mo-hinh-thong-tin-cong-trinh-bim-trong-9318) |
| 15 | **Filipijnen: PERT/CPM én PDM verplicht in de standaard-aanbestedingsdocumenten** | **bevestigd voor PERT/CPM, onzeker voor PDM** | Bevestigd: het Program of Work moet "a PERT/CPM network of the project activities" bevatten, en herziene PERT/CPM-diagrammen zijn vereist bij voortgangsbetalingen. De conclusie dat dit het enige SEA-6-land met een voorgeschreven netwerkmethode is, houdt stand. Dat specifiek **PDM** wordt voorgeschreven is niet in de aanbestedingsdocumenten teruggevonden — dat steunt op DPWH-trainingsmateriaal (Scribd) en is praktijk, geen aantoonbare eis | [GPPB Manual Vol. 3](https://www.gppb.gov.ph/wp-content/uploads/2023/06/GPM-Volume-3.pdf) · [DPWH PBD Infra](https://www.dpwh.gov.ph/dpwh/business/procurement/civil_works/forms/pbd_infra) · [CAAP MC 11-2021](https://caap.gov.ph/wp-content/uploads/2023/09/MC-11-2021_Guidelines-on-progress-payments-for-work-accomplished-on-infrastructure-projects06-11-2021_compressed.pdf) |
| 16 | **Singapore: bouwvraag S$50,5 mrd (2025, feitelijk) en S$47–53 mrd (2026, BCA)** | **bevestigd** | Beide cijfers bevestigd bij BCA en onafhankelijke financiële analyse; 2025 was het sterkste jaar in een decennium. Het door het rapport benadrukte onderscheid demand vs. output is correct gehanteerd | [BCA nieuwsbericht 2026](https://www1.bca.gov.sg/resources/newsroom/steady-construction-demand-in-2026-as-singapore-steps-up-support-for-built-environment-firms-through-collaboration-and-innovation/) · [BCA Academy, Construction Prospects 2026 (PDF)](https://www.bcaa.edu.sg/docs/librariesprovider2/events-seminars/berep2026/presentation-slides/2-spore-construction-prospects_2026_final_15-jan-26.pdf) |
| 17 | **Indonesië: bouwsector 8,7 mln werkenden (BPS)** | **bevestigd** (gepreciseerd) | Bevestigd in Indonesische bronnen: 8,7 mln = **5,97%** van de werkende bevolking, uit **Sakernas februari 2025**; bouw draagt 9,48% aan het bbp bij (4e sector). Het rapport dateerde dit alleen als "recent" — het is nu te pinnen. Tegelijk ondermijnt dit de in §2.5 gebruikte WorldMetrics-aggregator, die 13,1 mln noemt (+50%): die bron levert óók de 65%-informaliteit die de plannersschatting stuurt, en is daarmee de zwakste schakel in de hele keten | [Katadata](https://katadata.co.id/finansial/makro/68a423af1f2fb/bps-sektor-konstruksi-serap-8-7-juta-pekerja-kontributor-terbesar-ke-4-pdb) · [CNN Indonesia](https://www.cnnindonesia.com/ekonomi/20250819145053-92-1264049/bps-catat-sektor-konstruksi-serap-lebih-dari-87-juta-pekerja) · [Antara](https://www.antaranews.com/berita/5048153/bps-sektor-konstruksi-menyerap-lebih-dari-87-juta-tenaga-kerja) |
| 18 | **Builk: 100% gratis, sponsormodel, >18k/25k/30k gebruikers in vijf landen incl. Filipijnen; niet beursgenoteerd** | **gecorrigeerd** | Gratis model, sponsoring door bouwmateriaalmerken en oprichting 2005 in Bangkok bevestigd. **De vijf landen zijn Thailand, Indonesië, Myanmar, Laos en Cambodja — de Filipijnen horen er niet bij** (die stonden ten onrechte in de opsomming, die daardoor ook zes landen telde bij "vijf"). De cijferinconsistentie is nog groter dan gemeld: elders claimt Builk **>50.000 gebruikers**. De scepsis van het rapport is terecht en zelfs te mild. Geen enkele aanwijzing voor een SET-notering → behandeling als privaat bedrijf is juist | [builk.one](https://www.builk.one/) · [builk.com](https://www.builk.com/en/) · [Crunchbase](https://www.crunchbase.com/organization/builk-one) |
| 19 | **Filipijnen: AIMHI biedt geen planning/Gantt/CPM, geen gepubliceerde prijs, "© 2023 Eve" in de footer** | **bevestigd** | Homepage rechtstreeks nagelezen: geen enkele vermelding van Gantt, CPM, kritiek pad of tijdlijn; functies zijn budget, uitgaven, materieel/materiaal, sitedata, rapportage, "Decision Support". Geen prijzen ondanks een "See Pricing"-link, geen klantaantallen, footer luidt inderdaad "All Rights Reserved © 2023 Eve". De conclusie dat dit een kosten-/inzichtplatform is en geen planner, houdt stand | [aimhi.ai](https://www.aimhi.ai/) |
| 20 | **Crown Systems (S) Pte Ltd is geautoriseerd Oracle Primavera-distributeur voor vijf landen** — dragende onderbouwing van de "dun kanaal"-conclusie | **onzeker** | De formulering staat woordelijk in de bron, maar het is een **zelf-aangeleverd, ongedateerd** profiel in een bedrijvengids, en de vermelde status "Oracle Certified Gold Partner" is een partnerniveau dat Oracle jaren geleden heeft afgeschaft — sterke aanwijzing voor een verouderd profiel. Geen bevestiging in Oracle's eigen partnerregister gevonden. De daarop gebouwde conclusie over de kanaalstructuur van vijf markten is plausibel maar **niet bewezen** | [StreetDirectory](https://www.streetdirectory.com/businessfinder/company_detail.php?companyid=21973) |

**Niet weerlegd, maar structureel zwak (geen apart oordeel mogelijk):**

- **"Er is geen echte lokale CPM-concurrent in de SEA-6"** — een negatieve bewering die niet te bewijzen en nauwelijks te weerleggen is. De onderliggende observaties per pakket (PROGRESI, IBOM, FastCons, Builk, Mandoran, AIMHI: geen netwerklogica/float/kritiek pad in de productcommunicatie) zijn stuk voor stuk bevestigd of aannemelijk, maar afwezigheid in marketingtekst is geen afwezigheid in het product. Behandel als goed onderbouwd vermoeden, niet als vaststelling.
- **De ranglijst in §3.1** is expliciet als eigen schatting gelabeld en steunt op proxy's (trainingsaanbod, vacatures, reselleraanwezigheid). Niet toetsbaar; de labeling is correct.
- **Het aantal planners (7.500–13.000) en gebruikers (30.000–60.000)** volgt rekenkundig correct uit de gekozen parameters, maar elke parameter is zelfgekozen en één ervan (informaliteitsgraad Indonesië) komt van een aantoonbaar onbetrouwbare aggregator. De bandbreedte is daarmee optimistisch smal: bij realistische onzekerheid op alle vier de parameters is een factor 2 aan weerszijden verdedigbaar.
- **De P6-verplichting bij Petronas/PTT/Pertamina** was in het rapport al eerlijk als onbevestigde aanname gemarkeerd; die markering is bij deze toets niet weggenomen.

**Beperking van deze verificatie:** het WebSearch-budget van deze sessie (200 opdrachten) raakte tijdens de toets uitgeput; de laatste controles (Crown Systems, AIMHI, AkimEng, PK 1.15, Microsoft Singapore) zijn met directe WebFetch op de primaire bron uitgevoerd, wat voor die punten sterker is dan zoeken. Niet meer aan toegekomen: de Ukirama-prijstabel in §3.5 (concurrentbron, prijspunten ongecontroleerd), de Indonesische kurva S-diskwalificatieregel (steunt op één universiteitsblog, geen LKPP-primaire tekst), en de trainingsprijzen in §4.5.

---

## 6. Bronnen

### Overheid en regelgeving
- BCA Singapore — IDD: https://www1.bca.gov.sg/growth-and-transformation/productivity/idd-integrated-digital-delivery/
- BCA Singapore — Productiviteit: https://www1.bca.gov.sg/growth-and-transformation/productivity/
- BCA Singapore — PSSCOC: https://www1.bca.gov.sg/growth-and-transformation/procurement/standard-contract-forms/public-sector-standard-conditions-of-contract-psscoc/
- BCA Singapore — Built Environment PSG: https://www1.bca.gov.sg/grants-and-funded-programmes/built-environment-productivity-solutions-grant/
- BCA Singapore — bouwvraag 2025: https://www1.bca.gov.sg/resources/newsroom/construction-demand-to-remain-strong-for-2025/
- BCA Singapore — bouwvraag 2026: https://www1.bca.gov.sg/resources/newsroom/steady-construction-demand-in-2026-as-singapore-steps-up-support-for-built-environment-firms-through-collaboration-and-innovation/
- CORENET X: https://info.corenet.gov.sg/regulatory-process/about-the-new-submission-process
- BCA BIM Roadmap-presentatie (2015): https://www.baa-conference.com/uploads/3WRmjWIA/Part1VivienLeongSingaporesBIMRoadmap1.compressedcopy.pdf
- GoBusiness Singapore — PSG: https://grants.gobusiness.gov.sg/support/productivity-solutions-grant
- CIDB Malaysia — BIM: https://www.cidb.gov.my/bim/
- Maleisië PK 1.15 (circulaire): https://mila-asia.com/docs/pk-1-15-pelaksanaan-building-information-modelling-bim/
- LuatVietnam — Besluit 258/QĐ-TTg 2023: https://english.luatvietnam.vn/xay-dung/decision-258-qd-ttg-2023
- BPK RI — Permen PUPR 22/PRT/M/2018: https://peraturan.bpk.go.id/Details/159730/permen-pupr-no-22prtm2018-tahun-2018
- LKPP Indonesië: https://www.lkpp.go.id/
- GPPB Filipijnen — Philippine Bidding Documents Infrastructure Works 6th Ed.: https://www.gppb.gov.ph/wp-content/uploads/2023/06/Infrastructure-Works-6th-Edition.docx
- GPPB Filipijnen — standaardformulieren: https://www.gppb.gov.ph/downloadable-forms/
- Thai BIM Association: https://tbim.or.th/ · Thailand BIM Standard (EIT): https://thaibim.net/2021/01/31/now-available-thailand-building-information-modeling-standard-by-eit/ · ASA-handboek: https://asa.or.th/handbook/handbook20150427/

### Marktomvang en macrocijfers
- GlobalData — South-East Asia construction market: https://www.globaldata.com/store/report/south-east-asia-construction-market-analysis/
- TheReportCubes — Southeast Asia construction market: https://www.thereportcubes.com/report-store/construction-market-southeast-asia
- Ken Research — APAC PM software: https://www.kenresearch.com/apac-project-management-software-market
- Grand View Research — APAC PM software: https://www.grandviewresearch.com/horizon/outlook/project-management-software-market/asia-pacific
- KBV Research — APAC PM software: https://www.kbvresearch.com/asia-pacific-project-management-software-market/
- DataIntelo — construction PM software: https://dataintelo.com/report/construction-project-management-software-market
- Fortune Business Insights — construction software: https://www.fortunebusinessinsights.com/construction-software-market-110155
- Straits Times — bouwvraag 2025: https://www.straitstimes.com/singapore/housing/construction-demand-of-up-to-53-billion-expected-in-2025-bca
- Straits Times — bouwvraag 2026: https://www.straitstimes.com/singapore/housing/47b-to-53b-in-construction-contracts-expected-in-2026-bca
- REDAS/BCA mediabericht 2026: https://redas.com/wp-content/uploads/2026/01/media-release-for-bca-redas-built-environment-and-real-estate-prospects-seminar-2026-final.pdf
- Antara News — Indonesische bouwwerkgelegenheid (BPS): https://en.antaranews.com/news/374269/ris-construction-sector-employs-over-87-mln-workers-bps
- WorldMetrics — Indonesia construction statistics: https://worldmetrics.org/indonesia-construction-industry-statistics/

### Prijzen internationale software
- AkimEng (Thailand) — Oracle Primavera prijslijst: https://www.akimeng.com/oracle-primavera-price-list.html
- Oracle ASEAN — Primavera P6: https://www.oracle.com/sg/construction-engineering/primavera-p6/
- Primavera Scheduling — koopprijzen: https://primaverascheduling.com/home/buy-primavera-software/
- Compass Consult — P6-kosten: https://compassconsult.co/primavera-p6-software-cost-in-the-usa-a-comprehensive-guide/
- ProjectManagerTemplate — licentie vs. abonnement: https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models
- ITQlick — P6-prijzen: https://www.itqlick.com/primavera-p6/pricing · Oracle Primavera: https://www.itqlick.com/oracle-primavera/pricing
- Taradigm — Primavera Cloud-kosten: https://www.taradigm.com/how-much-does-primavera-cloud-cost/
- Contractors and Builders — Primavera-prijzen: https://contractorsandbuilders.com/pricing/oracle-primavera/
- FindPM Software — Primavera Cloud: https://findpmsoftware.com/products/primavera-cloud
- Oracle licentiedocumentatie Primavera Cloud: https://docs.oracle.com/en/industries/construction-engineering/primavera-cloud/licensing-information/index.html
- The Digital Project Manager — MS Project-prijzen: https://thedigitalprojectmanager.com/tools/microsoft-project-pricing/
- Milient Software — MS Project-prijzen: https://milientsoftware.com/blog/microsoft-project-pricing
- Tech.co — MS Project-review: https://tech.co/project-management-software/microsoft-project-review
- ITQlick — MS Project-prijzen: https://www.itqlick.com/microsoft-project/pricing

### Lokale pakketten
- PROGRESI (ID): https://progresi.co.id/
- Ukirama (ID) — bouwsoftware-overzicht met prijzen: https://ukirama.com/blogs/software-konstruksi-terbaik
- Mandoran (ID): https://mandoran.id/
- KontraktorOS (ID): https://kontraktoros.com/ · Planvexio (ID): https://planvexio.com/ · HitungBangun (ID): https://hitungbangun.id/
- IBOM (VN) — ranglijst planningsoftware 2026: https://ibom.vn/tin-giai-phap/top-phan-mem-quan-ly-tien-do-cong-trinh-tot-nhat-2026.html · https://ibom.vn/ · https://help.ibom.vn/
- FastCons (VN) — prijzen: https://fastcons.fastwork.vn/bang-gia/
- MISA AMIS (VN): https://amis.misa.vn/
- GXD (VN) — prijsindicatie: https://dobockhoiluong.com/huong-dan-su-dung-phan-mem-du-toan-gxd/ · https://giaxaydung.vn/
- Builk (TH): https://www.builk.com/en/ · https://www.builk.com/en/about-us/
- BuildTrack (MY): https://buildtrack.com.my/ · https://buildtrack.com.my/pricing
- KonstrakOS (MY): https://mydigital.contractors/
- RPM Schedulers (MY): https://rpmschedulers.com/
- HashMicro (MY/SG): https://www.hashmicro.com/my/blog/best-construction-management-software/
- AIMHI (PH): https://www.aimhi.ai/

### Resellers en kanaal
- Crown Systems (S) Pte Ltd — Oracle Primavera-distributeur SG/BN/ID/PH/VN: https://www.streetdirectory.com/businessfinder/company_detail.php?companyid=21973
- IPEC Systems (MY): https://www.ipecsystems.com.my/Oracle-Primavera
- AppliCAD (TH): https://www.applicadthai.com/primavera/
- Kitameraki (ID, Microsoft): https://www.kitameraki.com/id/microsoft-licenses
- Multicakra (ID, Microsoft verkoop/verhuur): https://www.multicakra.com/microsoft
- Elioplus — Primavera-partners APAC: https://elioplus.com/asia-pacific/singapore/channel-partners/oracle_primavera

### Training
- PUSDIKIPD (ID): https://www.pusdikipd.com/pelatihan-primavera-p6-level-dasar-tahun-2025/
- Danis Mitra Utama (ID): https://danismitrautama.com/
- Kelas Teknik (ID): https://kelasteknik.id/training-primavera
- Projects.co.id (ID): https://projects.co.id/
- ProTrain (ID) — MS Project + Primavera gecombineerd: https://protrain.id/training-microsoft-project-with-primavera/
- Kienthucxanh (VN): http://www.kienthucxanh.org/2024/08/chao-mung-ban-en-voi-khoa-hoc-thuc.html
- Primavera.vn (VN): https://primavera.vn/
- Kênh Xây Dựng (VN): https://kenhxaydung.vn/microsoft-project-va-primavera-p6
- FMIT (VN) — CPM-terminologie: https://fmit.vn/tu-dien-quan-ly/software-tools-for-cpm-primavera-ms-project-la-gi
- DETI (TH): https://deti.co.th/
- Laimoon (PH) — cursusprijzen: https://laimoon.com/
- BCA Academy (SG): https://www.bcaa.edu.sg/

### Piraterij
- BSA Global Software Survey: https://gss.bsa.org/
- English MST Vietnam — BSA-cijfers: https://english.mst.gov.vn/vietnam-records-higher-usage-of-patent-software-bsa-survey-197137294.htm
- VietnamNet — BSA-cijfers: https://vietnamnet.vn/en/
- Saigoneer — regionale piraterijcijfers: https://saigoneer.com/

### Academisch en vakinhoudelijk (Indonesië/Vietnam)
- Neliti — vergelijking MS Project vs. Primavera: https://www.neliti.com/publications/80457/perbandingan-aplikasi-program-microsoft-project-dan-primavera-dalam-penjadwalan
- USU Repository — scriptie P6 vs. MSP: https://repositori.usu.ac.id/handle/123456789/31695
- Unigoro Sintesi — planningsvergelijking: https://ojs.ejournalunigoro.org/sintesi/article/view/1632.html
- Tekniksipil.id — BIM-standaardisatie Indonesië: https://tekniksipil.id/standarisasi-bim-di-indonesia/
- UMA Civil Engineering — kurva S opstellen: https://sipil.uma.ac.id/cara-membuat-jadwal-pelaksanaan-pekerjaan-kurva-s-dengan-benar/
- Indokontraktor — kurva S (verplicht document): https://indokontraktor.com/kamus-jasa-konstruksi/kurva-s
- PengadaanBarang — kurva S-methodiek: https://www.pengadaanbarang.co.id/2019/12/kurva-s.html

### 4D/BIM-diensten
- Bentley SYNCHRO: https://www.bentley.com/software/synchro/
- AcePLP (SG) — 4D-planning: https://www.aceplp.com.sg/4d-scheduling/
- Conserve Solution (SG) — 4D BIM-sequentiëring: https://www.conservesolution.com/sg/4d-bim-sequencing-simulation/
- Bimeco (SG) — IDD-diensten: https://www.bimeco.io/services/idd/ · PSG-toelichting: https://www.bimeco.io/blog/bim-psg-grant/
- PlanRadar — Maleisische BIM-implementatie: https://www.planradar.com/sg/malaysian-construction-bim-implementation-august-2024/
- Infinity Wave — Malaysia BIM mandate 2025: https://infinitywave.io/blog/malaysia-bim-mandate-2025/
- FOX Malaysia — BIM verplicht 2025: https://foxmy.io/blog/bim-mandatory-malaysia-2025
- The Star — RM10 mln BIM-drempel: https://www.thestar.com.my/news/nation/2024/09/04/all-projects-worth-rm10mil-and-above-to-use-construction-software-bim-says-ahmad-maslan
- Utusan Malaysia — 198 overheidsprojecten met BIM: https://www.utusan.com.my/nasional/2024/10/parlimen

---

*Rapport opgesteld 25 juli 2026. Alle wisselkoersen indicatief. Cijfers gemarkeerd met **[EIGEN SCHATTING]** zijn afgeleid, niet gemeten — de redenering staat er telkens bij zodat de lezer de aannames kan vervangen.*
