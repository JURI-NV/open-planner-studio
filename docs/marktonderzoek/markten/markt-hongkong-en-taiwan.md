# Markt voor projectplanning-/schedulingsoftware: Hongkong en Taiwan (Groot-China)

**Onderzoeksdatum:** 25 juli 2026
**Regio:** Hongkong SAR en Taiwan
**Scope:** software voor projectplanning/scheduling met Gantt/CPM — bouwspecifiek, generiek én lokaal
**Wisselkoersen gebruikt (25-07-2026):** USD 1 = HKD 7,8421 / TWD 32,3518 — bron: <https://open.er-api.com/v6/latest/USD> (HKD-controle: <https://api.frankfurter.dev/v1/latest?from=USD&to=HKD>, 7,8426 op 24-07-2026). De HKD hangt in een currency board aan de USD (7,75–7,85), de TWD zweeft.

> **Leeswijzer bij cijfers.** Elk hard cijfer heeft een bron-URL. Alles wat ik zelf heb afgeleid is expliciet gemarkeerd met **[SCHATTING]** en gaat vergezeld van de redenering en de aannames. Er bestaat *geen* publiek, betrouwbaar marktonderzoek dat "schedulingsoftware in Hongkong" of "in Taiwan" apart becijfert; de commerciële rapporten die zo heten (LinkedIn/Verified Market-achtige pagina's) tonen in hun previews letterlijk "USD xx Billion" en bevatten dus geen bruikbare data (<https://www.linkedin.com/pulse/hong-kong-project-management-software-tools-market-intelligence-gh9xc/>). Ik bouw de marktomvang daarom bottom-up.

---

## 1. Samenvatting

**Hongkong en Taiwan zijn twee radicaal verschillende planningsmarkten die geografisch dicht bij elkaar liggen.** Ze delen bijna niets behalve de taal van de documenten.

**Hongkong is een "programme-cultuur" van Britse snit.** De contractvorm is NEC (Engineering and Construction Contract), inmiddels toegepast op meer dan 680 openbare werkencontracten met een waarde van boven de HK$450 miljard (<https://www.nechk.gov.hk/>, <https://www.devb.gov.hk/en/publications_and_press_releases/publications/standard_contract_documents/practice_notes_nec_engineering_construction_contract/index.html>). Onder NEC is het programma geen bijlage maar het kloppend hart van het contract: clausule 31.2 eist een programma "in the form stated in the Scope", en de Development Bureau-standaard-Scopes in Hongkong schrijven méér voor dan gebruikelijke Britse Scopes — expliciet software, sjablonen en rapportagestructuur (<https://www.necplanningsolutions.co.uk/post/hong-kong-nec4-ecc-programme-compliance>). Zolang het programma niet is ingediend mag de Project Manager een kwart van de betaling inhouden (<https://www.pinsentmasons.com/out-law/analysis/time-and-programming-under-nec-in-hong-kong-sar>). Het gevolg: Oracle Primavera P6 is de facto standaard op civiele en infrastructuurcontracten, tot en met contractclausules die de aannemer verplichten P6-licenties (en hardware) aan de Engineer te leveren — zie de General Specification Section 6-I-B-verwijzing "Provision of Primavera P6 Programming Software to the Engineer" (<https://groups.google.com/g/dptmp-cpd/c/z5JcLNTW4dE>). Aannemers vragen in vacatures letterlijk "Primavera (P6) and MS Project are a must" (<https://www.chunwo.com/zh-hk/current-openings/29>). Asta Powerproject is de sterke nummer drie, met Hong Kong International Airport als door de leverancier zelf genoemde referentie (<https://eleco.com/news/astagpt/>).

**Taiwan is een "compliance-cultuur" van eigen makelij.** Er is geen NEC en geen FIDIC-dominantie; de normstelling komt van het Public Construction Commission (工程會) en het 內政部營建署. De sleutelnorm is hoofdstuk 01103 進度管理 van de 公共工程施工綱要規範, van toepassing op projecten boven NT$1 miljard en op apart aanbestede werken. Die norm eist WBS + 要徑法 (Critical Path Method),桿狀圖 (Gantt), 網圖 (netwerk), 總浮時 (total float), 價值曲線 (S-curve) en drie schaalniveaus van planning (綱要/中階/詳細). Cruciaal: hij eist expliciet dat de aannemer *personeel heeft dat computerplanningsoftware gebruikt* — "施工廠商須有使用電腦排程軟體之人員" — maar noemt géén merk (<https://www.nlma.gov.tw/uploads/files/fb54d0531f35519de3dd4154b34346a6.pdf>). Het resultaat is een gefragmenteerde markt waarin Microsoft Project en Excel domineren, lokale PMIS-/工程管理系統-pakketten de compliance-laag invullen, en Primavera P6 een dure niche is die per stuk wordt aanbesteed (bijv. 交通部鐵道局, zaak 110GY010, "Primavera P6 PPM專業專案管理軟體2套", richtprijs NT$298.000 — <https://www.taiwanbuying.com.tw/ShowCCDetailOri.ASP?RecNo=4127119>).

**De ironie:** Taiwan bouwt de meest tijdkritische gebouwen ter wereld — TSMC bouwde in 2025 negen nieuwe faciliteiten (8 fabs + 1 advanced packaging) en de 1,4nm-fab in Centraal-Taiwan alleen al vergt NT$1,2–1,5 biljoen (<https://www.gvm.com.tw/article/123893>) — maar doet dat overwegend zónder de zware CPM-toolchain die Hongkong contractueel afdwingt. De fab-aannemers (漢唐 2404, 帆宣 6196, 亞翔 2415, 聖暉) draaien op interne systemen, MS Project en Excel met extreem korte cycli; er is publiek geen enkel bewijs van brede P6-adoptie in de halfgeleiderbouw.

**Marktomvang, samengevat [SCHATTING]:**

| | Hongkong | Taiwan |
|---|---|---|
| Bouwproductie (referentiejaar) | HK$286,6 mrd (2025) ≈ **US$36,5 mrd** | NT$784 mrd (2024) ≈ **US$24 mrd** (enge definitie) / US$77,8 mrd (brede definitie) |
| Bouwspecifieke Gantt/CPM-software (licenties+SaaS) | **US$5–7 mln/jr** | **US$4–6 mln/jr** (echte CPM-engines) |
| Incl. lokale PMIS/工程管理系統 met planningsmodule | n.v.t. (nauwelijks lokale pakketten) | **US$12–25 mln/jr** totaal |
| Incl. training + implementatieconsultancy | **US$8–11 mln/jr** | **US$16–32 mln/jr** |
| Totale PM-softwaremarkt (alle sectoren, incl. generieke SaaS) | **US$30–55 mln/jr** | **US$45–75 mln/jr** |
| Toegewijde planners (orde van grootte) | **1.300–1.700** | **500–1.500** |
| Gelegenheidsgebruikers van planningstools | 5.000–10.000 | 10.000–20.000 |
| Groei | +3–6%/jr (publieke kapitaalwerken stijgen van ~HK$90 mrd naar ~HK$120 mrd/jr) | +8–12%/jr (fab-boom + Biljoen-NT-plan) |

---

## 2. Marktomvang

### 2.1 Hongkong — de anker-cijfers

**Bouwproductie.** De totale brutowaarde van door hoofdaannemers uitgevoerde bouwwerken (GVCW) bedroeg in heel 2025 **HK$286,6 miljard**, een nominale daling van 1,4% en een reële daling van 4,5% (<https://www.info.gov.hk/gia/general/202603/12/P2026031200297p.htm>). De splitsing daarbinnen is voor deze markt veelzeggend:

- publieke sector op bouwplaatsen: **HK$130,1 mrd**, +10,2% nominaal / +6,2% reëel
- private sector op bouwplaatsen: **HK$70,7 mrd**, −16,9% nominaal / −19,2% reëel
- werk buiten bouwplaatsen: **HK$85,7 mrd**, −1,9% nominaal

Kwartaalcijfers ter controle: Q1 2025 HK$70,5 mrd (<https://www.info.gov.hk/gia/general/202506/10/P2025061000355.htm>), Q3 2025 HK$73,4 mrd (<https://www.censtatd.gov.hk/en/press_release_detail.html?id=5654>), Q4 2025 HK$73,2 mrd (zelfde jaarbericht).

**Dit is de belangrijkste structurele observatie voor softwareverkopers in Hongkong:** het private segment implodeert (−17%) terwijl het publieke segment met dubbele cijfers groeit. Publieke werken zijn precies het segment dat NEC gebruikt en programma-eisen contractueel afdwingt. De vraag naar planningsoftware in Hongkong is daarmee *tegengesteld gecorreleerd* aan de vastgoedmarkt.

**Publieke kapitaaluitgaven.** Voor FY2025-26 is de geraamde capital works expenditure **HK$119,8 miljard**, waarvan ca. HK$61,9 mrd gebouwen en HK$57,9 mrd infrastructuur/civiel (<https://www.info.gov.hk/gia/general/202507/09/P2025070900640.htm>). De Budget 2025-26 stelt dat de gemiddelde jaarlijkse kapitaalwerkenuitgave stijgt van circa **HK$90 miljard naar circa HK$120 miljard per jaar** over de komende vijf jaar (<https://www.budget.gov.hk/2025/eng/budget52.html>, <https://www.budget.gov.hk/2025/eng/pf.html>).

**Groeivooruitzicht.** GlobalData verwacht dat de bouwsector in 2026 met 1,6% reëel krimpt (<https://www.globaldata.com/store/report/hong-kong-construction-market-analysis/>); een parallel rapport ziet de groei vertragen van 3,7% (2024) naar 0,7% (2025), met daarna gemiddeld 2,6% in 2026-2029 (<https://www.businesswire.com/news/home/20250919632634/en/>).

**Beroepsbevolking.** De HKIE heeft ruim 35.000 leden, waarvan circa 16.000 Corporate Members (<https://www.beltandroadglobalforum.com/en/node/1386>); een HKIE-bericht van juni 2025 noemt "over 32,000 members" (<https://www.facebook.com/TheHKIE/posts/>). De CIC/VTC-arbeidsmarktcijfers voor 2025 tonen ~37.940 werkenden op bouwplaatsen met een tekort van ~7.800, en een verwacht tekort aan *professioneel* personeel van 5.500–6.000 over vijf jaar (<https://manpower-survey.vtc.edu.hk/>, <https://www.cic.hk/>).

**Salarisniveau planners** (relevant voor de kosten/baten-afweging van software): een project controls engineer verdient in Hongkong gemiddeld HK$433.157 (1-3 jaar ervaring) tot HK$759.116 (8+ jaar) per jaar (<https://www.salaryexpert.com/salary/job/project-controls-engineer/hong-kong-sar>). Eén planner kost dus HK$430k–760k/jaar; een P6-seat kost minder dan 1% daarvan. Dat verklaart waarom licentieprijs in Hongkong zelden de doorslag geeft.

### 2.2 Taiwan — de anker-cijfers

**Bouwproductie — let op twee incompatibele definities.**

- **Enge definitie (bouwwerken):** GlobalData's *Taiwan Construction Industry Databook 2024* raamt de sector op **TWD 784 miljard in 2024** (+4,0%), met een verwachte CAGR van 3,4% t/m 2028 (<https://www.businesswire.com/news/home/20241023420868/en/Taiwan-Construction-Industry-Databook-2024-Market-Size-Forecast-by-Value-and-Volume-Area-and-Units-2019-2028---ResearchAndMarkets.com>). Dat is ≈ **US$24,2 miljard** bij 32,35.
- **Brede definitie (sectoromzet incl. projectontwikkeling):** MarketLine/Research and Markets komt uit op **US$77,8 miljard omzet in 2024**, waarvan niet-residentieel US$54,6 mrd (70,3%), met een CAGR van 7,1% over 2019-2024 en +1,3% in 2024 (<https://www.researchandmarkets.com/reports/5995638/construction-in-taiwan>).

Ik gebruik de enge definitie voor softwarepenetratie (want software wordt per bouwproject verkocht, niet per grondtransactie) en noem de brede definitie alleen ter context. Wikipedia's cijfer voor de bouwbijdrage aan het BBP — NT$224 mrd in Q1 2025 versus NT$193 mrd in Q4 2024 (<https://en.wikipedia.org/wiki/Construction_industry_in_Taiwan>) — ligt qua orde van grootte tussen beide in en ondersteunt de enge definitie (4 × ~NT$210 mrd ≈ NT$840 mrd/jaar toegevoegde waarde-achtig).

**Publieke werken.** Taiwan investeerde NT$739,2 miljard (US$22,59 mrd) in publieke infrastructuur — het hoogste bedrag in bijna 17 jaar (<https://www.taiwannews.com.tw/news/6042392>). In 2025 werden 160 PPP-contracten getekend voor NT$380,7 miljard, ver boven het doel van NT$149,8 mrd (<https://www.mof.gov.tw/eng/singlehtml/f48d641f159a4866b1d31c0916fbcc71>). Het "Trillion NT Dollar Investment National Development Plan" loopt van 2025 tot 2028 (<https://english.ey.gov.tw/News3/9E5540D592A5FECD/aec5f2a0-6b7c-4ca1-8bf5-82116a08c0ab>), na het Forward-looking Infrastructure Development Program (2017-2025).

**Marktstructuur.** Taiwan telde in Q2 2025 **20.206 bouwbedrijven** met een gecombineerd kapitaal van bijna **NT$887,1 miljard**; het aantal firma's groeide twaalf jaar op rij (+2.774 bedrijven, +15,91% over 2016-2025), terwijl er in diezelfde periode bijna 4.000 stopten (<https://uptogo.com.tw/財經/產業分析/台灣營造廠有幾家/>). Die extreme fragmentatie — gemiddeld NT$44 mln kapitaal per firma — is de kern van waarom dure enterprise-planningsoftware in Taiwan niet aanslaat: de overgrote meerderheid van de bedrijven is te klein voor een P6-implementatie.

**De halfgeleider-anomalie.** TSMC kondigde negen nieuwe faciliteiten aan voor 2025 (8 wafer fabs + 1 advanced packaging plant), en de 1,4nm-fab in Centraal-Taiwan vergt naar schatting NT$1,2–1,5 biljoen investering (<https://www.gvm.com.tw/article/123893>). Persberichten melden dat TSMC de bouwschema's wereldwijd *comprimeert* om AI-vraag bij te benen (<https://ctee.com.tw/news/20260324700102-439901>) en dat Kaohsiung duidelijk vóór ligt op schema (<https://ctee.com.tw/news/20251007700039-439901>). De turnkey-aannemers hebben orderboeken die jaren vooruit reiken: 漢唐 (2404) met meer dan NT$100 miljard aan orders, 帆宣 (6196) met een orderportefeuille in de orde van NT$100+ miljard *[eenheid uit de bronsnippet onzeker: "1.081,7" — waarschijnlijk 1.081,7 億元 = ca. NT$108 mrd]*, 亞翔 (2415) met een turnkey-opdracht voor Micron Singapore met levering tot 2029.

**PMP-populatie** als proxy voor formeel projectmanagement: Taiwan heeft naar schatting ruim 10.000 actieve PMP-houders; bronnen variëren van ~8.800 tot ~17.000 afhankelijk van of verlopen certificaten worden meegeteld (<https://uptogo.com.tw/職場/成功/職涯發展/台灣有多少人有pmp/>). Ter vergelijking: dat is een veelvoud van het aantal mensen dat in Taiwan daadwerkelijk CPM-netwerken bouwt.

### 2.3 Bottom-up raming van de softwaremarkt **[SCHATTING]**

Er bestaat geen publiek cijfer. Ik reken van onder naar boven. Alle onderstaande getallen zijn mijn eigen afleiding.

#### Stap 1 — hoeveel planners zijn er?

**Hongkong.** Drie onafhankelijke aanwijzingen:

1. *Vacaturedichtheid.* Op één momentopname staan er 19 "Primavera P6"-vacatures op JobsDB (<https://hk.jobsdb.com/zh/primavera-p6-jobs/in-香港>), 17 op CTgoodjobs (<https://jobs.ctgoodjobs.hk/zh/jobs/planning-engineer-caribbean-epc-primavera-p6-jobs>) en 12 op Indeed (<https://hk.indeed.com/q-primavera-p6-jobs.html>). Bij een gebruikelijk jaarlijks verloop van 10–15% in de bouw en een gemiddelde vacatureduur van ~2 maanden impliceert 15-20 gelijktijdige openstaande posities een populatie van grofweg 15-20 × 6 / 0,125 ≈ **700–1.000 P6-gebruikende planners**.
2. *Productie per planner.* Op NEC-infrawerk in Hongkong is een grove vuistregel één toegewijde planner per HK$300–600 mln contractwaarde per jaar; op woning-/gebouwbouw eerder per HK$500 mln–1 mrd. HK$286,6 mrd productie / HK$400 mln ≈ **700 aannemerszijdige planners**.
3. *Cliënt- en adviseurszijde.* Hongkong heeft een ongewoon zware laag aan opdrachtgevers en Engineers met eigen programma-teams (MTR Corporation, Airport Authority, CEDD, Highways, Drainage Services, Housing Authority, plus AECOM/Arup/Atkins/Meinhardt/WSP) én een aparte claims-/delay-analysemarkt (bijv. AprimaHK: "Programming, Delay Analysis, Contract Advisory, Training, Dispute Resolution" — <https://www.aprimahk.com/>). Dat voegt naar mijn inschatting 60–80% toe.

Convergerend: **1.300–1.700 toegewijde planners in Hongkong**, plus 5.000–10.000 ingenieurs/QS/PM's die programma's openen of licht MS Project gebruiken. **[SCHATTING]**

**Taiwan.** Hier is de "planner" nauwelijks een apart beroep; 進度管理 zit meestal bij de 工地主任 of een 工程師 met meerdere petten. Aanwijzingen:

- Norm 01103 geldt alleen voor projecten ≥ NT$1 miljard en apart aanbestede werken (<https://www.nlma.gov.tw/uploads/files/fb54d0531f35519de3dd4154b34346a6.pdf>). Het aantal Taiwanese projecten boven die drempel is per jaar hooguit enkele tientallen tot ruim honderd.
- Zoekopdrachten naar Taiwanese vacatures met "Primavera" leveren feitelijk niets op — er is geen zichtbare markt voor P6-planners op 104人力銀行.
- De enige zichtbare Primavera-distributeur is PTMS 普錸資訊 (<https://www.ptms.com.tw/>), één klein bedrijf in Taipei, met een P6-training van NT$15.750 p.p. — geen infrastructuur voor een markt van duizenden gebruikers.

**300–800 gebruikers van echte CPM-tools (P6-klasse)**, plus **5.000–15.000 MS Project-gebruikers** in bouw/engineering en enkele duizenden gebruikers van lokale PMIS-systemen. **[SCHATTING]**

#### Stap 2 — wat kost een seat effectief per jaar?

Ik reken licentiekosten om naar een jaarlijkse effectieve kost (perpetual afgeschreven over 5 jaar + onderhoud):

| Product | Lijstprijs | Effectief/jaar | Bron |
|---|---|---|---|
| Primavera P6 Professional (perpetual) | ~US$3.500–3.520/gebruiker + 22% support | ~US$1.470 | <https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models>, <https://primaverascheduling.com/home/buy-primavera-software/>, <https://prmyazilim.com/en/primavera-p6-pricing> |
| P6 EPPM (concurrent) | US$8.000–25.000/concurrent user + 22% SULS | US$2.400–7.500 | <https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing> |
| Oracle Primavera Cloud | ~US$7.800/jaar voor 5 gebruikers ≈ US$130/gebr./mnd | ~US$1.560 | <https://globalpm.com/oracle-primavera-cloud-pricing/> |
| Asta Powerproject (single user) | £880/jaar (≈US$1.170) — resellers noemen ook US$2.000/gebr./jaar | US$1.200–2.000 | <https://softwarefinder.com/project-management-software/powerproject>, <https://www.itqlick.com/asta-powerproject/pricing> |
| MS Project Professional 2024 (HK) | HK$10.899 eenmalig (≈US$1.390) | ~US$280 | <https://www.microsoft.com/zh-hk/microsoft-365/project/microsoft-project-enterprise-plans-and-pricing> |
| MS Project Professional 2024 (TW) | NT$45.990 eenmalig (≈US$1.420) | ~US$285 | <https://www.microsoft.com/zh-tw/microsoft-365/project/compare-microsoft-project-management-software> |
| MS Project Online/Plan 3 | ~US$30/gebr./mnd (~US$360/jr) | US$360 | <https://www.itqlick.com/oracle-primavera/pricing> |
| Deltek Acumen Risk | ~US$10.300 eerste jaar | ~US$3.000 | <https://www.linkedin.com/pulse/comparative-analysis-schedule-risk-tools-intaver-institute-inc-vimsc> |
| Smartsheet | US$9 (Pro) / US$19 (Business) per gebr./mnd | US$108–228 | <https://costbench.com/software/project-management/smartsheet/> |

#### Stap 3 — de rekensom

**Hongkong [SCHATTING]:**

| Segment | Seats/deals | Effectieve prijs | Jaarwaarde |
|---|---|---|---|
| P6 Professional/EPPM bij aannemers, Engineers, opdrachtgevers | ~850 seats (55% van 1.500 kernplanners) | US$1.470 | US$1,25 mln |
| Asta Powerproject | ~300 seats (20%) | US$1.500 | US$0,45 mln |
| MS Project bij kernplanners | ~300 seats (20%) | US$300 | US$0,09 mln |
| TILOS / SYNCHRO / overig CPM | ~75 seats (5%) | US$2.000 | US$0,15 mln |
| MS Project/Planner bij gelegenheidsgebruikers in de bouw | ~4.000 seats | US$250 | US$1,0 mln |
| 4D-planning (SYNCHRO, Powerproject BIM, Fuzor) — aangejaagd door 4D-tendereisen | 150–300 seats | US$1.500 | US$0,3 mln |
| Risico-/schema-analytics (Acumen, Safran, ALICE, Nodes & Links) | project-based | — | US$0,5–1,5 mln |
| Enterprise EPPM/Unifier-implementaties (MTR, AAHK, departementen, grote aannemers) | handvol, geamortiseerd | — | US$1,5–3,0 mln |
| **Subtotaal licenties + SaaS** | | | **US$5,2–7,2 mln** |
| Training + implementatie/consultancy gekoppeld aan de tools (30–60% van licentiespend) | | | **US$2–4 mln** |
| **Totaal HK bouwplanningsoftware + directe diensten** | | | **US$8–11 mln/jaar** |

**Taiwan [SCHATTING]:**

| Segment | Volume | Effectieve prijs | Jaarwaarde |
|---|---|---|---|
| Primavera P6 (overheidsbureaus, 中興/台灣世曦-klasse consultants, petrochemie/energie-EPC, enkele fab-aannemers) | ~500 seats | US$1.400 | US$0,7 mln |
| Primavera Unifier / enterprise deals | enkele | — | US$1,0–2,0 mln |
| MS Project | ~8.000 seats | US$250 | US$2,0 mln |
| Lokale PMIS/工程管理系統 met planningsmodule (孟華 ezteamwork/ePM, E-PMIS, 中程資訊, 高益, 鈞陽, J Project Master) — organisatielicenties | 800–2.000 betalende organisaties × NT$50k–300k/jr | — | US$3–12 mln |
| Projectgebonden PMIS-uitrollen op publieke werken (0,05–0,1% van projectwaarde op de kopende subset van NT$739 mrd) | — | — | US$5–12 mln |
| 4D/BIM + AI-scheduling (nog embryonaal) | — | — | US$0,5–1,5 mln |
| **Subtotaal** | | | **US$12–25 mln** |
| Training + implementatie (in Taiwan structureel een groter aandeel: lokale pakketten worden met maatwerk verkocht, 50–80%) | | | **US$6–15 mln** |
| **Totaal TW bouwplanningsoftware + directe diensten** | | | **US$18–40 mln/jaar** |

**Kruiscontrole via de wereldmarkt.** De wereldwijde markt voor projectmanagementsoftware groeide van US$7,98 mrd (2024) naar US$9,22 mrd (2025) volgens The Business Research Company; een Chineestalige raming zet 2025 op ruim US$7,24 mrd met US$18,9 mrd in 2035 (CAGR ~10,7%) (<https://www.researchnester.com/tw/reports/project-management-software-market/4176>). Hongkong is ongeveer 0,35–0,45% van het wereld-BBP en heeft bovengemiddelde SaaS-adoptie → **US$30–55 mln** totale PM-softwaremarkt over alle sectoren. Taiwan is ~0,7% van het wereld-BBP maar heeft lagere SaaS-adoptie in het MKB en veel lokale substituten → **US$45–75 mln**. In beide gevallen is de bouwspecifieke Gantt/CPM-hoek dus **10–25% van de totale PM-softwaremarkt** — hoger in Hongkong (contractueel afgedwongen) dan in Taiwan.

**Groei [SCHATTING].** Hongkong: +3–6%/jaar, aangedreven door publieke kapitaalwerken (HK$90 mrd → HK$120 mrd/jaar) en gedrukt door de private krimp. Taiwan: +8–12%/jaar, gedreven door fab-bouw, het Biljoen-NT-plan en digitaliseringssubsidies; de groei zit vooral in lokale PMIS/SaaS, niet in P6.

---

## 3. Gebruikte software: marktpositie en prijzen

### 3.1 Hongkong — rangorde

| # | Pakket | Positie | Wie gebruikt het | Prijsindicatie |
|---|---|---|---|---|
| 1 | **Oracle Primavera P6** (Professional/EPPM) | **De facto standaard** voor civiel, infra, spoor, tunnels, publieke werken | Gammon, China State Construction (HK), Chun Wo, Leighton, Dragages, Build King; MTR Corp; Airport Authority; CEDD/Highways/DSD; alle grote Engineers | US$3.500/gebr. perpetual + 22% support; EPPM US$8.000–25.000/concurrent user |
| 2 | **Microsoft Project** | Sterke tweede; standaard bij E&M/MEP, onderaannemers, kleinere gebouwcontracten, en als tweede tool náást P6 | breed | HK$5.499 (Standard 2024) / HK$10.899 (Professional 2024) eenmalig |
| 3 | **Elecosoft Asta Powerproject** | Derde; sterk bij gebouwbouw en bij Britse/HK-Britse aannemers; 4D-planning | Elecosoft noemt zelf Hong Kong International Airport als referentieproject | £880/jaar single user; enterprise/concurrent op offerte |
| 4 | **Microsoft Excel** | Feitelijk alomtegenwoordig als schaduwtool | iedereen | inbegrepen |
| 5 | **Bentley SYNCHRO / 4D-tools** | Groeiend, aangejaagd door 4D-eisen in tenderbeoordeling | Housing Authority-tenders vragen 4-D video's bij complexe nieuwbouw | op offerte |
| 6 | **Oracle Primavera Cloud / Unifier** | Enterprise-niche bij grote opdrachtgevers | — | ~US$7.800/jaar voor 5 gebruikers |
| 7 | **Deltek Acumen Fuse/Risk, Safran Risk** | Niche: schemakwaliteitscontrole en QSRA bij claims en tenderassurance | claims-/delay-consultants | Acumen Risk ~US$10.300 eerste jaar |
| 8 | **ALICE Technologies** | Vroege adoptie via lokale partner | Cranborne (HK) — partnerschap sinds aug 2024; werkte aan de 1701 Oyster Bay station-tender voor China State Construction and Engineering (Hong Kong) Ltd. Swire Properties nam deel aan ALICE's financieringsronde | op offerte |
| 9 | **Trimble TILOS** | Zeer klein: lineaire infra (spoor, wegen, pijpleidingen) | via PMS Systems (HK) | op offerte |
| 10 | **Smartsheet / monday.com / Asana / Wrike / Jira** | Buiten de contractuele planning; corporate PMO's, IT, ontwikkelaars | breed in dienstensector | Smartsheet US$9–19/gebr./mnd |
| 11 | **ProjectLibre / GanttProject / OpenProject** | Marginaal; niet acceptabel als contractueel programma-instrument | studenten, kleine onderaannemers | gratis |
| 12 | **RIB iTWO** | Aanwezig als rechtspersoon (RIB Software Hong Kong Limited, PCCW Tower, Taikoo Place); iTWO World Conference 2013 in HK; nauwelijks zichtbare planningspenetratie | — | op offerte |
| 13 | **Glodon (广联达)** | Aanwezig, maar in *kosten*, niet planning: Cubicost 5D BIM met HKSMM5-regels (dec 2025) | QS-bureaus | op offerte |

**Bewijs voor de rangorde:**
- Chun Wo (grote lokale aannemer) eist in vacatures met 6 jaar ervaring: *"Primavera (P6) and MS Project are a must"* (<https://www.chunwo.com/zh-hk/current-openings/29>).
- Een Hongkongs werkencontract verwijst naar General Specification Section 6-I-B met "Provision of Primavera P6 Programming Software to the Engineer" — de aannemer moet de Engineer van P6 voorzien (<https://groups.google.com/g/dptmp-cpd/c/z5JcLNTW4dE>).
- PMS Systems (HK) Ltd. verkoopt **P6 + Asta Powerproject + TILOS** en zegt zelf: *"We have successfully implemented and deployed Oracle Primavera P6 EPPM and Asta Powerproject Enterprise solutions to both private and public sector organizations"* (<https://www.pmsystems.com.hk/>, <https://www.pmsystems.com.hk/asta>).
- Computer Services & Management (HK) Ltd. is Oracle Primavera-partner in Kwun Tong (<https://csm.com.hk/primavera_p6_hk/>).
- Elecosoft noemt Hong Kong International Airport in dezelfde adem als Tottenham Hotspur Stadium en The Shard (<https://eleco.com/news/astagpt/>).
- Cranborne (HK) over ALICE: *"ALICE Core allows us to upload our P6 schedule into the platform and explore scenarios in minutes"* — bevestigt dat P6 de brondata levert (<https://constructionlinks.ca/news/alice-technologies-and-cranborne-partner-to-optimize-construction-projects-in-apac/>).

### 3.2 Taiwan — rangorde

| # | Pakket | Positie | Wie gebruikt het | Prijsindicatie |
|---|---|---|---|---|
| 1 | **Microsoft Project** | Marktleider onder echte planningstools; Chineestalige UI, lage drempel, geaccepteerd als "電腦排程軟體" onder 01103 | vrijwel alle 甲級-aannemers, consultants, fab-aannemers | NT$27.290 (Standard 2024) / NT$45.990 (Professional 2024) eenmalig |
| 2 | **Microsoft Excel** | Co-nummer 1 in de praktijk; 進度表 en S-curves worden massaal in Excel gemaakt; talloze Taiwanese tutorials over "Excel 甘特圖" | iedereen | inbegrepen |
| 3 | **Lokale PMIS / 工程管理系統** | Dominant voor *compliance*: 施工日誌, 監造報表, 估驗計價, 送審管制 én进度 met Gantt/S-curve | overheidsprojecten, monteurs/監造廠商, mid-size aannemers | zie §5 |
| 4 | **Oracle Primavera P6** | Dure niche; per stuk aanbesteed | 交通部鐵道局, 高公局/捷運局-achtige bureaus, 中興工程顧問/台灣世曦-klasse consultants, petrochemie- en energie-EPC, ITER-achtige internationale programma's | NT$298.000 richtprijs voor 2 seats ⇒ ~NT$149.000/seat ≈ US$4.600 |
| 5 | **monday.com / Asana / ClickUp / Notion / Trello** | Sterk in tech/HQ/product, niet in contractuele bouwplanning | halfgeleider- en elektronicabedrijven, startups | ClickUp Unlimited ~NT$300/mnd, Business ~NT$570/mnd |
| 6 | **Autodesk Construction Cloud / Procore / GoBuid / Fieldwire / Novade** | Veldmanagement en documentbeheer; nauwelijks CPM | grotere aannemers, buitenlandse opdrachtgevers | GoBuid US$15,90/mnd |
| 7 | **Buildertrend** | Enige in de Taiwanese "top 9"-lijstjes met expliciete 排程與甘特圖 | woningbouw | — |
| 8 | **用友 Yongyou 建築資源管理系統** | Genoemd in Taiwanese ERP-gidsen; low-code, mobiel, realtime voortgang | — | — |
| 9 | **Asta Powerproject / TILOS / SYNCHRO / ALICE / Nodes & Links / Spider / Safran / InEight / RIB Candy** | Praktisch afwezig; geen zichtbare reseller of referentie in Taiwan | — | — |
| 10 | **ProjectLibre / GanttProject / OnlineGantt** | Gratis alternatieven, veel genoemd in Taiwanese blogs ("100% 永久免費") | studenten, ZZP, kleine firma's | gratis |

**Bewijs voor de rangorde:**
- Concreet Taiwanees overheidstender: 交通部鐵道局, zaaknr. 110GY010, *"Primavera P6 PPM專業專案管理軟體2套"*, richtprijs NT$298.000 (<https://www.taiwanbuying.com.tw/ShowCCDetailOri.ASP?RecNo=4127119>). Twee licenties voor een heel spoorwegbureau illustreert de schaal.
- PTMS 普錸資訊 (Taipei, Zhongshan-district, Fuxing N. Rd. 150, 13F-4) verkoopt P6, Unifier en Risk Analysis; hun P6-training kost NT$15.750 p.p. (<https://www.ptms.com.tw/>).
- Oracle's Taiwanese pagina bestaat wel (<https://www.oracle.com/tw/construction-engineering/primavera-p6/>), maar er is geen zichtbaar netwerk van implementatiepartners zoals in Hongkong.
- Taiwanese vergelijkingsartikelen positioneren MS Project als "微軟企業級專案排程軟體，適合大型專案嚴謹時程管理" en zetten daarnaast Monday/Asana/ClickUp/Notion/Google Sheets (<https://projectmanager.com.tw/專案管理工具/甘特圖產生器軟體/>).

### 3.3 Wat er niet is: mijnbouw

**Deswik en mijnbouwspecifieke planningssoftware zijn in beide markten niet relevant.** Hongkong heeft geen actieve mijnbouw meer (de laatste steengroeven zijn de afgelopen jaren afgebouwd tot ontwikkellocaties); Taiwan heeft alleen cement-/kalksteenwinning (台泥, 亞泥) op bescheiden schaal, en de bijbehorende planning gebeurt in-house of met generieke tools. Er is geen zichtbaar Deswik-, MineSched- of Spider Project-kanaal in beide markten. Idem voor RIB Candy (Zuid-Afrikaanse calculatie), Safran (Noorse olie & gas) en InEight (Amerikaanse zware civiele techniek): geen aantoonbare lokale aanwezigheid — hooguit incidenteel gebruik door internationale joint ventures.

---

## 4. Lokale bijzonderheden

### 4.1 Hongkong: NEC maakt het programma contractueel geld waard

**De NEC-adoptie is compleet en verplicht in de praktijk.** De Development Bureau propageert sinds 2009 een "collaborative partnership"-benadering met NEC; per november 2024 hadden **meer dan 680 openbare werkencontracten met een totale waarde van meer dan HK$450 miljard** de NEC-vorm aangenomen (in juni 2024 stond de teller nog op 570 contracten / HK$380 mrd) (<https://www.nechk.gov.hk/>, <https://www.devb.gov.hk/en/publications_and_press_releases/publications/standard_contract_documents/practice_notes_nec_engineering_construction_contract/index.html>).

**Wat NEC contractueel doet met het programma:**
- De aannemer moet een programma ter acceptatie indienen; **zolang dat niet is gebeurd mag de Project Manager een kwart van de betaling inhouden** (<https://www.pinsentmasons.com/out-law/analysis/time-and-programming-under-nec-in-hong-kong-sar>).
- Het programma moet startdatum, toegangsdata, key dates, completion date, planned completion, de volgorde en timing van operaties, plus **float en time risk allowances** tonen.
- De Project Manager heeft twee weken om te accepteren of te verwerpen; reageert hij niet, dan kan de aannemer het programma na kennisgeving als geaccepteerd behandelen.
- **NEC zelf schrijft géén software voor** en eist strikt genomen niet eens logische koppelingen of een geïdentificeerd kritiek pad — *"the NEC does not require the use of programming software, require activities to be logically linked, show early or late start and finish dates or require that there be a critical path identified"*. Die eisen staan in de **Scope**.

**En precies daar zit Hongkong's bijzonderheid.** De Hongkongse NEC4 ECC 2023 Edition houdt vast aan clausule 31.2 "in the form stated in the Scope", en **DEVB-standaard-Scopes schrijven meer voor dan gebruikelijke Britse Scopes: software, sjablonen en rapportagestructuur** (<https://www.necplanningsolutions.co.uk/post/hong-kong-nec4-ecc-programme-compliance>). Betalingsindieningen moeten twee weken voor de assessment date binnen zijn; mist men dat venster, dan begrenst clausule 50.4 het verschuldigde bedrag tot het laagste van de huidige of vorige assessment.

**Het praktische gevolg voor softwarekeuze:** er is *geen* Hongkong-brede wettelijke verplichting die P6 bij naam noemt, maar de eis staat contract voor contract in de General Specification/Scope — inclusief clausules die de aannemer verplichten P6-licenties en -hardware ter beschikking van de Engineer te stellen (General Specification Section 6-I-B, <https://groups.google.com/g/dptmp-cpd/c/z5JcLNTW4dE>). Dit is de belangrijkste enkele reden waarom P6 in Hongkong onaantastbaar is: een aannemer kan niet unilateraal overstappen zonder een contractwijziging.

**4D wordt eveneens contractueel afgedwongen.** De Housing Authority-paper TC44-24 over Tendering Procedures and Tender Evaluation verwijst naar *"requirements for submission of 4-D videos to facilitate tender assessment of complex building new works"* (<https://www.housingauthority.gov.hk/en/common/pdf/about-us/housing-authority/ha-paper-library/TC44-24EN.pdf>). Dat is een directe vraagimpuls voor SYNCHRO/Powerproject-BIM/Fuzor bij aanbestedingen, ook al is de eis niet merkspecifiek.

**Claim- en dispuutcultuur.** Hongkong heeft een volwassen delay-analysemarkt (SCL Delay Protocol, as-planned vs as-built, time impact analysis, windows) waarin het P6-bestand het bewijsstuk is. Adviesbureaus als AprimaHK bieden "Programming, Delay Analysis, Contract Advisory, Training, Dispute Resolution" en houden een lijst van NEC4-geaccrediteerde Project Managers bij (<https://www.aprimahk.com/>). Deze markt is groter in omzet dan de licentiemarkt zelf: één EOT-dispuut kan meer adviseursuren kosten dan honderd P6-seats.

**Opleidingscultuur.** Training is geïnstitutionaliseerd via het beroepsonderwijs, niet alleen via leveranciers. De VTC (IVE Tsing Yi) draait een *Workshop on Primavera P6 – Advanced Project Management* van **36 contacturen voor HK$8.600**, op zaterdagen 13:00-19:00, in het Kantonees met Engels (<https://cpe.vtc.edu.hk/en/admission/programmes/Workshop_on_Primavera_P6_%E2%80%93_Advanced_Project_Management/1319/1>). Daarnaast bieden NobleProg HK, SPOC Learn, Invensis, The Knowledge Academy, Unichrone en de resellers (PMS Systems, AprimaHK) commerciële cursussen. De prijs van HK$8.600 voor 36 uur is opvallend laag ten opzichte van commerciële 3-daagse cursussen elders — een gesubsidieerd beroepsonderwijskanaal is een structureel kenmerk van deze markt.

**Resellers en kanaal (Hongkong):**
- **PMS Systems (HK) Ltd.** — Primavera P6, Asta Powerproject, TILOS; EPPM-implementatie, systeemintegratie, training basis→gevorderd, ook maatwerk in-company; sectoren bouw, engineering, IT, banken, publieke sector (<https://www.pmsystems.com.hk/>)
- **Computer Services & Management (HK) Ltd.** — Oracle Primavera P6 plus Autodesk (Gold Partner), SketchUp Pro, Acronis; lokaal technisch supportteam, remote support via TeamViewer; Benson Tower, Kwun Tong (<https://csm.com.hk/primavera_p6_hk/>)
- **AprimaHK** — geen licentieverkoop maar NEC-programmering, delay-analyse, P6- en NEC-training (<https://www.aprimahk.com/>)
- **Cranborne** — project controls/planning consultancy, APAC-partner van ALICE Technologies (<https://constructionlinks.ca/news/alice-technologies-and-cranborne-partner-to-optimize-construction-projects-in-apac/>)
- **RIB Software Hong Kong Limited** — geregistreerd op Unit 3668, Level 36, PCCW Tower, Taikoo Place (<https://coltd.hk/company-51470220-details.htm>)
- **Glodon Hong Kong** — Cubicost 5D BIM voor kosten/QS, met HKSMM5-regels sinds december 2025 (<https://hk.glodon.com/>)

**Exportcontrole — een reëel en onderschat risico.** Sinds **23 december 2020** behandelt de Amerikaanse Bureau of Industry and Security Hongkong onder de Export Administration Regulations als bestemming **China**: dezelfde vergunningplichten, dezelfde uitzonderingen, Country Group D:1 (<https://www.federalregister.gov/documents/2020/12/23/2020-28101/removal-of-hong-kong-as-a-separate-destination-under-the-export-administration-regulations>, <https://www.bis.gov/media/documents/new-china-hk-faqs.pdf>). Daaraan voorafgaand waren op 31 juli 2020 alle licentie-uitzonderingen voor Hongkong opgeschort (<https://www.federalregister.gov/documents/2020/07/31/2020-16278/revision-to-the-export-administration-regulations-suspension-of-license-exceptions-for-hong-kong>). Gewone commerciële planningssoftware (EAR99/massamarkt) blijft leverbaar, maar het betekent dat:
1. Amerikaanse leveranciers (Oracle, Microsoft, Bentley, Deltek, ALICE) hun Hongkongse klanten screenen als China-klanten, inclusief Entity List-checks bij staatsgelieerde opdrachtgevers;
2. Foreign Direct Product-regels van toepassing kunnen zijn op afgeleide producten van Amerikaanse technologie;
3. Er een structureel, permanent argument bestaat voor niet-Amerikaanse of open-source alternatieven bij Hongkongse entiteiten met gevoelige eindgebruikers.
Voor een Europese/open-source planningstool is dit een concreet verkoopargument in Hongkong dat in Taiwan niet bestaat.

**Excel en informele licenties in Hongkong.** Er zijn geen betrouwbare, land-specifieke piraterijcijfers voor Hongkong of Taiwan in de publieke BSA-samenvattingen (de regionale uitsplitsing is niet zichtbaar in openbare snippets). Wat wel vaststaat: op contractueel niveau kán Hongkong zich geen informele licenties veroorloven, omdat het programma-bestand aan de Engineer wordt geleverd en bij een dispuut door tegenpartij-experts wordt geopend. De informele laag zit elders: **Excel als schaduw-planning** naast het contractuele P6-bestand. Vrijwel elke Hongkongse projectorganisatie draait een "echte" Excel-planning voor het bouwteam en een "contractuele" P6-planning voor de Engineer. Dat is geen anekdote maar een structureel gevolg van de contractvorm: het geaccepteerde programma is een juridisch instrument, geen werkinstrument.

### 4.2 Taiwan: norm 01103 en de PMIS-compliancelaag

**De maatgevende norm.** Hoofdstuk **01103 進度管理** van de 公共工程施工綱要規範 (uitgave 內政部營建署, versie 2017/08), *"適用於 10 億元以上及分開招標工程"* — van toepassing op projecten boven NT$1 miljard en apart aanbestede werken (<https://www.nlma.gov.tw/uploads/files/fb54d0531f35519de3dd4154b34346a6.pdf>). De inhoud is verrassend modern en gedetailleerd:

- **Methode:** *"施工廠商應使用分工結構與要徑法(或其他適當之方法)來規劃、排程、執行及報告契約工作"* — WBS + CPM (of een andere passende methode), met kosten en resources meegewogen. Voortgangsdata moeten zowel als document **als elektronisch bestand** worden geleverd.
- **Definities in de norm zelf:** WBS, 桿狀圖 (Gantt), 網圖 (netwerk), **要徑法 (CPM)**, 總浮時 (total float), **價值曲線 (value/S-curve)**.
- **Drielaagse planningshiërarchie:** 綱要進度表 (summary, 5–20 activiteiten, jaar/maand-schaal), 中階進度表 (intermediate, het primaire tijdbeheersingsinstrument, maand/week-schaal, moet code, naam, duur, ES/EF/LS/LF, mijlpalen tonen; het netwerk daarnaast **total float, kritiek pad, relatietypes en lags**), en 詳細進度表 (detail, dag-schaal, twee-/drie-weekse look-ahead).
- **Personeels- en software-eis:** *"施工廠商須有使用電腦排程軟體之人員"* — de aannemer moet personeel hebben dat computerplanningsoftware gebruikt, waarvan de kwalificaties vóór aanvang ter goedkeuring worden voorgelegd; *"施工廠商使用之電腦軟體排程必須製作本章所規定之進度表、報告及處理時程資料"*. **Merkneutraal, maar functioneel dwingend.**
- **Indieningsritme:** 綱要進度表 samen met het integrale bouwplan; 中階-Gantt voor de eerste drie maanden binnen 2 weken na start; volledige netwerk- + Gantt-planning met voortgangstoelichting en elektronische bestanden binnen 2 maanden; 詳細進度表 elke 2 weken; maandelijkse update van 中階/綱要 inclusief Gantt, activiteitenrapport, waarde-/resourcerapport, toelichting, **elektronische bestanden** en de dagrapporten van de vorige maand.
- **Float-eigendom — dit is de scherpste bepaling.** De norm biedt twee aanvinkopties: float wordt gezamenlijk beheerd na overeenstemming, óf **float is eigendom van de opdrachtgever** waarbij de aannemer impact moet onderbouwen ter beoordeling. En expliciet: *"未勾選時為第二項"* — **wordt niets aangevinkt, dan geldt automatisch optie twee: de opdrachtgever bezit de float.** Ook wordt "float suppression" verboden: *"施工廠商不可濫用「浮時抑制技巧」"* (kunstmatige datumbeperkingen, opgerekte duren, niet-gecontracteerd werk).

**Procedureel bovenop 01103.** Het Public Construction Commission publiceert de 公共工程施工進度管理作業參考要項 (105.04.22) (<https://www.pcc.gov.tw/content/index?eid=7546&type=C&lang=1>). Lokale overheden vertalen dat in eigen procedures; de procedure 332 施工進度管制 van 臺中市政府建設局 is representatief (<https://www.construction.taichung.gov.tw/media/438122/施工進度管制.pdf>):
- de aannemer stelt na gunning een **整體施工預定進度表** en een **整體施工網圖** op, ter toetsing door de 監造廠商 en ter vaststelling door de opdrachtgevende dienst;
- dagelijkse 施工日誌, wekelijkse 週施工進度表 en maandelijkse 月施工進度表 in tweevoud;
- bij achterstand: oorzaakanalyse, coördinatievergadering, en een verplicht **趲趕計畫** (inhaalplan) met extra materieel, materiaal, personeel en werktijd;
- **sancties:** blijft de achterstand bestaan zonder duidelijke verbetering, dan kan de dienst conform contract de **werfleider laten vervangen of de betaling van 估驗款 (interim payments) opschorten**; verder geldt het 公共工程廠商延誤履約進度處理要點 van het 工程會.

**Wat dit betekent voor softwareleveranciers in Taiwan.** De norm eist netwerk, kritiek pad, float, S-curve én elektronische levering — dus functioneel exact wat een CPM-engine doet. Maar hij noemt geen merk, geen bestandsformaat (geen XER-, geen MPP-verplichting) en geen uitwisselstandaard. Het gevolg is dat de compliance-last is opgevangen door **lokale PMIS-pakketten die de formulieren, dagrapporten en 估驗計價 automatiseren en er een Gantt/S-curve bij leveren**, in plaats van door een internationale CPM-tool. Het is een classificerend verschil met Hongkong: Taiwan reguleert de *rapportage*, Hongkong reguleert het *instrument*.

**Aanbesteding.** Alles loopt via het 政府電子採購網 (<https://planpe.pcc.gov.tw/pis/>) onder de 政府採購法. Software wordt daar als losse post aanbesteed — vandaar de zichtbaarheid van "Primavera P6 PPM專業專案管理軟體2套" bij het 鐵道局 met richtprijs NT$298.000 (<https://www.taiwanbuying.com.tw/ShowCCDetailOri.ASP?RecNo=4127119>). Dat maakt Taiwan transparant maar prijsgevoelig: elke aankoop is publiek en wordt op prijs afgerekend.

**Opleidingscultuur (Taiwan).** Anders dan in Hongkong is de opleidingscultuur PMP-georiënteerd, niet tool-georiënteerd. Ruim 10.000 actieve PMP-houders (spreiding 8.800–17.000 afhankelijk van definitie) (<https://uptogo.com.tw/職場/成功/職涯發展/台灣有多少人有pmp/>); de 中華專案管理學會 (<https://npma.org.tw/certification/pmp-info>) en de 中興工程顧問社-stichting draaien PMP-opleidingen (bijv. een zevenweekse PMP®-cursus, <https://www.sinotech.org.tw/>). Tool-training is dun: PTMS' P6-cursus kost NT$15.750 p.p. (<https://www.ptms.com.tw/index.php/blog/newest-p6-training/itemlist/tag/P6>); daarnaast NobleProg TW, Invensis, SPOC Learn en 104 Learning. **Een Taiwanese planner leert methodiek (PMBOK, 要徑法) op school en de tool in Excel op kantoor.**

**Excel in Taiwan.** De zoekresultaten in het Chinees leveren overweldigend Excel-materiaal op: "Excel制作工作進度表，自動顯示工作進度", "成為 Excel 甘特圖大師", 甘特圖-sjablonen van ProjectClub, plus tutorials over 條件式格式設定 voor automatische voortgangssystemen. Vergelijkende artikelen benadrukken zelfs expliciet het onderscheid tussen een simpele balkgrafiek en een **邏輯長條圖** (logische Gantt met afhankelijkheden) — een teken dat veel Taiwanese "Gantt-charts" in de praktijk logica-loze balkjes zijn. Dit is *de* structurele zwakte van de Taiwanese markt en tegelijk de grootste kans voor een betaalbare CPM-tool met Chineestalige UI.

**Resellers en kanaal (Taiwan):**
- **PTMS 普錸資訊股份有限公司** — Primavera-distributeur (P6, Unifier, Risk Analysis); Taipei, Zhongshan-district, Fuxing N. Rd. 150, 13F-4; tel. 02-2715-1758 (<https://www.ptms.com.tw/>)
- **群昱 Accesssoft** — softwaredistributeur met presales-consultancy, systeemintegratie, upgrades en support (<https://www.accesssoft.com.tw/>, HTTP 403 bij directe toegang)
- **孟華科技 (mt.com.tw)** — eigen PMIS/ePM binnen het ezteamwork-platform (<https://www.mt.com.tw/solutions/epc/>)
- Verder een lange staart van lokale ERP-/PMIS-huizen: 高益電腦 Goinfo, 中程資訊顧問 CMIS, 鈞陽系統整合 ERPKing, J Project Master, E-PMIS

**Export-/sanctierisico in Taiwan.** Taiwan valt niet onder de Hongkong-behandeling; Amerikaanse software wordt normaal geleverd. Het relevante geopolitieke risico is omgekeerd: Taiwanese halfgeleiderklanten zijn extreem gevoelig voor datasoevereiniteit en cloud-hosting, wat cloud-only planningstools (Oracle Primavera Cloud, ALICE, Nodes & Links) bemoeilijkt op fab-projecten. **[SCHATTING — dit is mijn interpretatie op basis van de sectorcontext, niet uit een expliciete bron.]**

### 4.3 Twee markten, één vergelijking

| Dimensie | Hongkong | Taiwan |
|---|---|---|
| Contractvorm | NEC4 ECC (HK Edition 2023), >680 contracten / >HK$450 mrd | 政府採購法 + 工程會-richtlijnen; geen NEC/FIDIC-dominantie |
| Wie schrijft de software voor | de **Scope** per contract (DEVB-standaard noemt software, sjablonen, rapportagestructuur) | **niemand** — 01103 eist alleen "personeel dat computerplanningsoftware gebruikt" |
| De facto standaard | Oracle Primavera P6 | Microsoft Project + Excel + lokale PMIS |
| Float-eigendom | onderhandeld onder NEC (float + time risk allowance expliciet in het programma) | **default: opdrachtgever bezit de float** (01103 §1.6.2, "未勾選時為第二項") |
| Bestandsformaat verplicht? | niet wettelijk; contractueel de facto P6-native (XER/XLS) | alleen "電子檔"; geen formaatvoorschrift |
| Sanctie bij niet-indienen | ¼ van de betaling ingehouden (NEC 31.2/50) | vervanging werfleider / opschorting 估驗款 |
| 4D | wordt afgedwongen in tenderbeoordeling (HA TC44-24: 4-D video's) | vrijwel afwezig |
| Taal van de planning | Engels | Traditioneel Chinees |
| Grootste concurrent van commerciële tools | Excel als schaduwplanning naast contractueel P6 | Excel als primaire planning |
| Exportcontrole | Hongkong = China onder EAR sinds 23-12-2020 | geen bijzonderheden |
| Kansrijkste opening voor een nieuwe tool | interoperabiliteit met P6/XER; 4D; claims/as-built | **betaalbare, Chineestalige CPM-engine met 01103-conforme rapportages en S-curve** |

---

## 5. Lokale en niche-pakketten: voor- en nadelen

Voor Taiwan is dit het interessantste deel van de markt, want daar zit het volume. Formele, onafhankelijke reviews zijn schaars — Taiwanese B2B-software wordt via relaties en referenties verkocht, niet via G2/Capterra. Ik baseer de voor-/nadelen op de leveranciersdocumentatie, referentieprojecten, prijszichtbaarheid en de functionele gaten die uit de documentatie blijken. **Dit oordeel is mijn eigen analyse, niet dat van een reviewsite.**

### 5.1 孟華科技 — PMIS 工程管理系統 / ezteamwork ePM (Taiwan)

Bron: <https://www.mt.com.tw/solutions/epc/>, <https://www.mt.com.tw/success_story/>

Het functioneel sterkste lokale pakket dat ik heb gevonden. Bevat **甘特圖, S-curve, 基準版管理 (baseline-versiebeheer), MS Project .mpp import/export, SPI-voortgangsindicatoren** en automatische voortgangsberekening uit dagrapporten, plus 施工日誌 conform 工程會-standaard, kwaliteits-/veiligheidsformulieren met mobiele handtekening, documenten-/tekeningversiebeheer, wijzigingsbeheer, 估驗計價 en een veld-app. Claimt cumulatief meer dan NT$110 miljard aan beheerde projecten; referenties zijn onder meer het New Taipei City Art Museum, de Groene Lijn van Taoyuan MRT, de verkeerstoren van Taoyuan International Airport en het National Military Museum. Levering als huur (abonnement) of koop (perpetual), cloud of on-premise.

**Voordelen**
- Het enige lokale pakket met aantoonbaar échte planningsfunctionaliteit (baseline, SPI, S-curve) in plaats van alleen balkjes
- .mpp-in/export overbrugt de dominantie van MS Project zonder de gebruiker te dwingen over te stappen
- Volledige 工程會-compliance uit de doos: dagrapporten, keuringsformulieren, 估驗計價 — precies de administratieve last die 01103 en de lokale procedures opleggen
- Sterke publieke referenties (metro, luchthaven, musea) — in Taiwan is dat het belangrijkste verkoopargument
- Flexibel leveringsmodel (huur/koop, cloud/on-prem) past bij zowel projectorganisaties als vaste bedrijven

**Nadelen**
- **Geen gepubliceerde prijs.** Alles gaat via offerte ("(07)727-9337 of info@mt.com.tw"), wat een langere salescyclus en prijsondoorzichtigheid betekent. Eén online vermelding noemt NT$36.000/jaar voor de "advanced"-versie van ezteamwork (peildatum september 2025), maar de bron is een gebruikersnotitie, geen leverancierspagina — **[LAGE BETROUWBAARHEID]**
- Documentatie toont geen expliciet CPM-rekenhart met forward/backward pass, total float per activiteit, relatietypes (SS/FF/SF) en lags zoals 01103 §2.2.2 vereist voor het netwerk. Waarschijnlijk voldoende voor 桿狀圖, twijfelachtig voor volwaardig 網圖 op megaprojecten
- Geen internationale uitwisseling: geen XER, geen P6-interoperabiliteit — een breekpunt zodra een buitenlandse opdrachtgever of JV-partner meedoet
- Uitsluitend Chineestalig; niet inzetbaar in een tweetalige projectorganisatie
- Sterk gebonden aan het ezteamwork-EIP-platform; wie alleen planning wil, koopt een heel samenwerkingsplatform

### 5.2 E-PMIS (pmis.org.tw, Taiwan)

Bron: <https://www.pmis.org.tw/service/PMISService.asp>

Werkt met 工程日誌紀錄與報告, 會議管理系統, en claimt AI-, BIM- en RWD-ondersteuning plus data-analyse; won een 工程金質獎.

**Voordelen**
- Award-erkenning binnen de Taiwanese publieke-werkenwereld — in deze markt telt dat zwaar bij aanbestedingen
- Sterke focus op de vergader- en dagrapportage-workflow die 監造 daadwerkelijk opslokt
- Responsive/mobiel, wat de veldinvoer verbetert

**Nadelen**
- **Geen aantoonbare Gantt/CPM-functionaliteit** in de productbeschrijving; het is een documenten- en rapportagesysteem, geen planningstool
- Geen prijsinformatie, geen zichtbare klantenlijst
- Als planningsoplossing feitelijk incompleet: gebruikers blijven Excel of MS Project nodig hebben naast het systeem

### 5.3 中程資訊顧問 (CMIS, Taiwan)

Bron: <https://www.cmis.tw/> (server gaf HTTP 503 tijdens dit onderzoek; beschrijving via zoekresultaat)

營建工程管理資訊系統 met modules voor 土地開發, 工程進度 en 品質查核.

**Voordelen**
- Dekt de volledige keten van grondontwikkeling tot kwaliteitscontrole — past bij Taiwanese ontwikkelaar-aannemercombinaties
- Nichespeler met domeinkennis van Taiwanese regelgeving

**Nadelen**
- Website was tijdens dit onderzoek niet bereikbaar (503) — een signaal over de schaal van de leverancier
- Geen zichtbare informatie over CPM, float of baselines
- Geen publieke prijzen of referenties

### 5.4 高益電腦 (Goinfo, Taiwan)

Bron: <https://www.goinfo.com.tw/> (redirect-lus tijdens onderzoek; beschrijving via zoekresultaat)

ERP-huis dat 營建管理資訊系統 ontwikkelt voor bouw- en ontwikkelbedrijven.

**Voordelen**
- ERP-integratie (kosten, inkoop, onderaanneming) is voor een Taiwanese aannemer waardevoller dan een losstaande planner
- Gevestigde partij in het lokale ERP-landschap

**Nadelen**
- Planning is bijzaak: een ERP-module, geen scheduling-engine
- Technisch bereikbaarheidsprobleem tijdens onderzoek (redirect-lus) — geen moderne webpresentatie
- Geen prijstransparantie

### 5.5 J Project Master (Taiwan)

Bron: <https://jprojectmaster.com/construction/>

工程專案管理系統 met realtime voortgang op de werf, kosten/budget, onderaannemersbeheer en automatische waarschuwingen bij overschrijding of vertraging.

**Voordelen**
- Waarschuwingslogica (自動預警超支與延誤) is precies wat de Taiwanese 趲趕計畫-procedure vraagt
- Modern gepositioneerd, kostengeoriënteerd

**Nadelen**
- Geen zichtbaar CPM-/netwerkmodel; "vertraging" wordt vermoedelijk gedetecteerd op geplande vs. werkelijke datums, niet op kritiek pad
- Kleine leverancier, weinig publieke referenties
- Geen prijs gepubliceerd

### 5.6 鈞陽系統整合 ERPKing / 用友 Yongyou (Taiwan)

Bronnen: <https://www.erpking.com.tw/construction-erp>, <https://blog.lookoutspace.com/zh-hant/popular-articles/2025營造業erp推薦：五大系統評測與導入分析指南/>

ERPKing richt zich op kostenbeheersing in 工程營造業-ERP. Yongyou's 建築資源管理系統 wordt in Taiwanese ERP-gidsen genoemd met low-code-ontwikkeling, PC- en mobiele app, realtime voortgangsmonitoring en risicowaarschuwingen.

**Voordelen**
- ERP-first benadering sluit aan op hoe Taiwanese aannemers geld verdienen (marges, onderaanneming)
- Yongyou brengt low-code-aanpasbaarheid, wat bij Taiwanese maatwerkcultuur past

**Nadelen**
- Yongyou is een **vastelandse Chinese leverancier** — voor Taiwanese overheidsprojecten en zeker voor halfgeleiderklanten is dat een politiek en veiligheidsbezwaar dat de adoptie hard begrenst **[SCHATTING op basis van sectorcontext]**
- Beide: geen aantoonbare CPM-engine
- De Taiwanese "top 5 ERP"-gids die ik heb gefetcht bevat feitelijk maar één met naam genoemd systeem en geen prijzen — de kwaliteit van de lokale vergelijkingsliteratuur is laag, wat een koper dwingt tot demo's

### 5.7 GoBuid (Taiwan/regionaal)

Bron: <https://gobuid.com/zh>, <https://gobuid.com/zh/blog/all-articles/best-construction-management-software>

Cloud-veldmanagement met aanpasbare digitale formulieren en een "evidence-first" documentsysteem dat werfrapporten omzet in claim-bruikbare rapporten. Prijs **US$15,90/maand**.

**Voordelen**
- **De enige lokale/regionale speler met een openbare prijs** — US$15,90/maand is een radicaal andere prijsklasse dan alles hierboven en verlaagt de drempel voor de 20.206 kleine Taiwanese aannemers enorm
- Claim-georiënteerde documentatie is een echte differentiator
- Chinees + Engels

**Nadelen**
- **Geen scheduling.** In hun eigen vergelijking van negen pakketten is Buildertrend de enige die expliciet 排程與甘特圖 biedt — GoBuid zelf niet
- Positioneert zich tegen Procore/PlanGrid/Fieldwire, dus documenten en veldwerk, niet tijdbeheersing
- Voor 01103-compliance op grote projecten onvoldoende als enige systeem

### 5.8 Hongkongse lokale spelers

Bron: <http://www.csmarthk.com/>, <https://www.yonyou.com.hk/industry/construction/>, en berichtgeving over Ailytics

Hongkong heeft **nauwelijks lokale planningsoftware** — de contractvorm zuigt alle zuurstof naar P6 en Asta. Wat er wel is, zit in aanpalende domeinen:
- **C-SMART** — digitaal bouwmanagementplatform met AI-torenkraancamera's die beelden automatisch tegen CAD-tekeningen leggen, plus BIM-gebaseerde voortgangsvisualisatie
- **Yonyou Hong Kong** — bouwoplossing met voortgangsoverzichten en matrix-dashboard
- **Ailytics** — AI-veiligheidsanalyse op werven; werkt met China State Construction aan ziekenhuizen, scholen en publieke huisvesting; claimt 70% minder veiligheidsovertredingen binnen twee maanden
- **Glodon Hong Kong** — Cubicost 5D BIM voor QS/kosten, HKSMM5-regels sinds december 2025 (<https://hk.glodon.com/>)

**Voordelen (als categorie)**
- Vullen gaten die P6 en Asta niet dekken: automatische voortgangsmeting uit beeld, veiligheid, HKSMM-conforme calculatie
- Lokale support en HK-specifieke standaarden

**Nadelen (als categorie)**
- **Geen van deze pakketten kan een NEC-programma produceren.** Ze zijn complementair aan, geen vervanging van, de CPM-tool
- Yonyou is vastelands Chinees, wat bij Amerikaanse/Britse JV-partners in Hongkong tot leveranciersbezwaren kan leiden **[SCHATTING]**
- Geen prijstransparantie

### 5.9 Niche-analysetools (beide markten)

| Tool | Waar | Voordelen | Nadelen |
|---|---|---|---|
| **ALICE Technologies** | HK via Cranborne; Swire Properties is investeerder | Genereert duizenden scenario's uit een bestaand P6-bestand; ideaal bij tenderoptimalisatie en herstelplanning; sluit naadloos aan op de P6-installed base | Vereist een goede P6-planning als input — verergert dus de afhankelijkheid van Oracle; cloudmodel; prijs op offerte; nog nauwelijks adoptie buiten early adopters |
| **Nodes & Links** | geen aantoonbare aanwezigheid in HK/TW | — | Geen zichtbaar kanaal in de regio |
| **Deltek Acumen Fuse/Risk** | HK bij claims- en assuranceconsultants | Standaard voor schemakwaliteitscontrole (DCMA 14-point) en Monte Carlo; integreert met P6, MS Project, Open Plan | ~US$10.300 eerste jaar is duur voor een controlefunctie; alleen zinvol bij grote portefeuilles |
| **Safran Risk** | geen aantoonbare aanwezigheid | Goede QSRA | Noordzee-olie-en-gas-oriëntatie sluit niet aan bij HK/TW-bouw |
| **Trimble TILOS** | HK via PMS Systems | Onmisbaar voor lineaire infra (spoor, riool-/drainagetunnels, wegen) | Zeer kleine gebruikersbasis; Trimble heeft TILOS de afgelopen jaren afgebouwd ten gunste van andere producten — een reëel continuïteitsrisico voor kopers **[SCHATTING]** |
| **Spider Project** | afwezig | — | Russische herkomst maakt het in beide markten commercieel en compliance-technisch onhaalbaar |
| **RIB Candy / iTWO** | RIB HK-entiteit bestaat; Candy afwezig | iTWO 5D koppelt calculatie aan planning | Geen zichtbare planningspenetratie in HK/TW; Candy is een Zuid-Afrikaans calculatieproduct zonder regionaal kanaal |
| **InEight** | afwezig | — | Geen aantoonbaar kanaal |
| **Deswik / mijnbouwplanning** | n.v.t. | — | Geen mijnbouw in HK; alleen kleinschalige kalksteen-/cementwinning in Taiwan |
| **ProjectLibre / GanttProject / OpenProject** | beide markten, marginaal | Gratis; GanttProject wordt in Taiwanese blogs genoemd als cross-platform en offline bruikbaar; OnlineGantt adverteert "100% 永久免費" | Geen contractuele acceptatie in HK; geen 01103-conforme rapportages in TW; geen Chineestalige support; geen XER |

---

## 6. Wat dit betekent voor een nieuwe planningstool

Uit het bovenstaande volgen een paar harde conclusies. **[Dit is mijn analyse, geen bronmateriaal.]**

1. **Hongkong is niet te winnen op prijs, alleen op interoperabiliteit.** Een P6-seat kost ~US$1.470/jaar tegenover een planner van HK$430k–760k/jaar; de licentie is ruis. De enige echte opening is dat een aannemer of consultant *náást* het contractuele P6-bestand werkt — en dan is vlekkeloze XER-import/-export een absolute toegangseis, geen feature. Zonder XER is Hongkong gesloten.
2. **Taiwan is wél te winnen op prijs — maar alleen met Traditioneel Chinees en 01103-rapportages.** De markt bestaat uit 20.206 firma's waarvan het overgrote deel Excel gebruikt omdat P6 NT$149.000/seat kost en MS Project NT$45.990. Een tool die 桿狀圖 + 網圖 + 總浮時 + 價值曲線 + 電子檔 conform hoofdstuk 01103 produceert, in het Traditioneel Chinees, voor een fractie van die prijs, valt in een gat dat geen enkele bestaande speler bezet: de lokale PMIS-pakketten hebben geen CPM-hart, en de CPM-tools hebben geen 01103-rapportage.
3. **Het float-eigendom is een functionele eis, geen detail.** In Taiwan bezit de opdrachtgever standaard de float en is float-suppressie contractueel verboden; in Hongkong moeten float én time risk allowance expliciet in het NEC-programma staan. Een tool die total float, free float en time risk allowance apart kan tonen en rapporteren, spreekt in beide markten de juiste taal.
4. **Exportcontrole is in Hongkong een verkoopargument voor niet-Amerikaanse software.** Hongkong is sinds 23-12-2020 EAR-technisch China. Elke Hongkongse organisatie met gevoelige eindgebruikers heeft een structureel motief om niet volledig van Amerikaanse leveranciers afhankelijk te zijn.
5. **4D groeit in Hongkong door aanbestedingsdruk, niet door enthousiasme.** De Housing Authority vraagt 4-D video's bij tenderbeoordeling van complexe nieuwbouw. Dat is een afdwingbare, meetbare vraagimpuls.
6. **IFC als projectbestandsformaat is in geen van beide markten een gevestigde praktijk voor planning** — maar Hongkong duwt via DEVB actief op BIM-diversificatie en open standaarden (<https://hk.on.cc/>, nov 2025), wat een open, IFC-gebaseerde planningstool politiek in de kaart speelt.

---

## 7. Bronnen

### Hongkong — statistiek en overheid
- Bouwoutput Q4 en heel 2025 (HK$286,6 mrd; publiek HK$130,1 mrd; privaat HK$70,7 mrd; niet-locatiegebonden HK$85,7 mrd): <https://www.info.gov.hk/gia/general/202603/12/P2026031200297p.htm>
- Bouwoutput Q1 2025 (HK$70,5 mrd): <https://www.info.gov.hk/gia/general/202506/10/P2025061000355.htm>
- Bouwoutput Q3 2025 (HK$73,4 mrd): <https://www.censtatd.gov.hk/en/press_release_detail.html?id=5654>
- Kapitaalwerkenuitgaven FY2025-26 (HK$119,8 mrd): <https://www.info.gov.hk/gia/general/202507/09/P2025070900640.htm>
- Budget 2025-26, stijging HK$90 mrd → HK$120 mrd/jaar: <https://www.budget.gov.hk/2025/eng/budget52.html> en <https://www.budget.gov.hk/2025/eng/pf.html>
- GlobalData HK-bouwmarkt (−1,6% reëel in 2026): <https://www.globaldata.com/store/report/hong-kong-construction-market-analysis/>
- Groeivertraging 3,7% → 0,7%, herstel gem. 2,6% 2026-2029: <https://www.businesswire.com/news/home/20250919632634/en/>
- Lijsten van goedgekeurde publieke-werkenaannemers (DEVB): <https://www.devb.gov.hk/en/construction_sector_matters/contractors/lists_of_public_works/index.html>
- Contractor Management Handbook (rev. apr. 2025): <https://www.devb.gov.hk/filemanager/en/content_187/CMH_Rev27%20(Apr25).pdf>
- Housing Authority — General Conditions of Contract for Capital Works: <https://www.housingauthority.gov.hk/en/business-partnerships/resources/general-conditions-of-contract-for-capital-works/index.html>
- Housing Authority TC44-24, 4-D video's bij tenderbeoordeling: <https://www.housingauthority.gov.hk/en/common/pdf/about-us/housing-authority/ha-paper-library/TC44-24EN.pdf>
- Arbeidsmarkt bouw HK (VTC): <https://manpower-survey.vtc.edu.hk/>; CIC: <https://www.cic.hk/>
- HKIE-ledental (>35.000, ~16.000 corporate): <https://www.beltandroadglobalforum.com/en/node/1386>
- Salaris project controls engineer HK: <https://www.salaryexpert.com/salary/job/project-controls-engineer/hong-kong-sar>

### Hongkong — NEC en contractpraktijk
- NEC Hong Kong (officieel): <https://www.nechk.gov.hk/> en Knowledge Hub: <https://www.nechk.gov.hk/knowledge_hub.html>
- DEVB NEC-praktijkrichtlijnen (>680 contracten / >HK$450 mrd): <https://www.devb.gov.hk/en/publications_and_press_releases/publications/standard_contract_documents/practice_notes_nec_engineering_construction_contract/index.html>
- Pinsent Masons — Time and programming under NEC in Hong Kong SAR: <https://www.pinsentmasons.com/out-law/analysis/time-and-programming-under-nec-in-hong-kong-sar>
- NEC Planning Solutions — Hong Kong NEC4 ECC Programme Compliance (clausule 31.2, Scope schrijft software voor): <https://www.necplanningsolutions.co.uk/post/hong-kong-nec4-ecc-programme-compliance>
- Contractueel "Provision of Primavera P6 Programming Software to the Engineer", General Specification Section 6-I-B: <https://groups.google.com/g/dptmp-cpd/c/z5JcLNTW4dE>
- SCL Delay and Disruption Protocol (2e editie): <https://www.scl.org.uk/sites/default/files/documents/SCL_Delay_Protocol_2nd_Edition_Final.pdf>

### Hongkong — leveranciers, resellers, opleiding
- PMS Systems (HK) — P6, Asta Powerproject, TILOS: <https://www.pmsystems.com.hk/> en <https://www.pmsystems.com.hk/asta>
- Computer Services & Management (HK) — Oracle Primavera-partner: <https://csm.com.hk/primavera_p6_hk/>
- AprimaHK — NEC-programmering, delay-analyse, P6-training: <https://www.aprimahk.com/>
- Elecosoft — Powerproject, referentie Hong Kong International Airport: <https://eleco.com/news/astagpt/> en <https://eleco.com/products/asta/asta-powerproject/>
- ALICE Technologies × Cranborne (HK), China State Construction (HK), Swire Properties: <https://constructionlinks.ca/news/alice-technologies-and-cranborne-partner-to-optimize-construction-projects-in-apac/>
- VTC/IVE Tsing Yi — Workshop on Primavera P6, 36 uur, HK$8.600: <https://cpe.vtc.edu.hk/en/admission/programmes/Workshop_on_Primavera_P6_%E2%80%93_Advanced_Project_Management/1319/1>
- Chun Wo vacature "Primavera (P6) and MS Project are a must": <https://www.chunwo.com/zh-hk/current-openings/29>
- JobsDB HK — 19 Primavera P6-vacatures: <https://hk.jobsdb.com/zh/primavera-p6-jobs/in-香港>
- Indeed HK — 12 Primavera P6-vacatures: <https://hk.indeed.com/q-primavera-p6-jobs.html>
- CTgoodjobs — 17 planning engineer/P6-vacatures: <https://jobs.ctgoodjobs.hk/zh/jobs/planning-engineer-caribbean-epc-primavera-p6-jobs>
- Glodon Hong Kong (Cubicost 5D BIM, HKSMM5): <https://hk.glodon.com/>
- RIB Software Hong Kong Limited (registratie): <https://coltd.hk/company-51470220-details.htm>; RIB-geschiedenis incl. iTWO World Conference 2013 in HK: <https://en.wikipedia.org/wiki/RIB_Software>
- C-SMART (HK-platform): <http://www.csmarthk.com/>; Yonyou Hong Kong bouw: <https://www.yonyou.com.hk/industry/construction/>

### Hongkong — exportcontrole
- Removal of Hong Kong as a Separate Destination under the EAR (23-12-2020): <https://www.federalregister.gov/documents/2020/12/23/2020-28101/removal-of-hong-kong-as-a-separate-destination-under-the-export-administration-regulations>
- Opschorting licentie-uitzonderingen (31-07-2020): <https://www.federalregister.gov/documents/2020/07/31/2020-16278/revision-to-the-export-administration-regulations-suspension-of-license-exceptions-for-hong-kong>
- BIS China/HK FAQ: <https://www.bis.gov/media/documents/new-china-hk-faqs.pdf>
- BIS landenrichtlijn Hongkong: <https://media.bis.gov/licensing/country-guidance/hong-kong-export-controls>
- trade.gov Strategic Trade Controls Hong Kong/Macau: <https://www.trade.gov/country-commercial-guides/hong-kong-strategic-trade-controls-exports-hong-kong-macau>

### Taiwan — normen en aanbesteding
- **Hoofdstuk 01103 進度管理**, 公共工程施工綱要規範 (內政部營建署, 2017/08), incl. 要徑法, 網圖, 總浮時, 價值曲線, "施工廠商須有使用電腦排程軟體之人員", float-eigendom: <https://www.nlma.gov.tw/uploads/files/fb54d0531f35519de3dd4154b34346a6.pdf>
- 公共工程施工進度管理作業參考要項 (工程會, 105.04.22): <https://www.pcc.gov.tw/content/index?eid=7546&type=C&lang=1>
- 臺中市政府建設局 procedure 332 施工進度管制 (整體施工網圖, 趲趕計畫, sancties): <https://www.construction.taichung.gov.tw/media/438122/施工進度管制.pdf>
- 政府電子採購網: <https://planpe.pcc.gov.tw/pis/>
- Aanbesteding 交通部鐵道局 110GY010, "Primavera P6 PPM專業專案管理軟體2套", richtprijs NT$298.000: <https://www.taiwanbuying.com.tw/ShowCCDetailOri.ASP?RecNo=4127119>

### Taiwan — markt en macro
- Taiwan Construction Industry Databook 2024 (TWD 784 mrd in 2024, +4,0%, CAGR 3,4% t/m 2028): <https://www.businesswire.com/news/home/20241023420868/en/Taiwan-Construction-Industry-Databook-2024-Market-Size-Forecast-by-Value-and-Volume-Area-and-Units-2019-2028---ResearchAndMarkets.com>
- Construction in Taiwan (US$77,8 mrd omzet 2024; niet-residentieel US$54,6 mrd / 70,3%; CAGR 7,1% 2019-24): <https://www.researchandmarkets.com/reports/5995638/construction-in-taiwan>
- BBP-bijdrage bouw Q1 2025 NT$224 mrd: <https://en.wikipedia.org/wiki/Construction_industry_in_Taiwan>
- 20.206 bouwbedrijven Q2 2025, kapitaal ~NT$887,1 mrd: <https://uptogo.com.tw/財經/產業分析/台灣營造廠有幾家/>
- Publieke infrastructuurinvestering NT$739,2 mrd (US$22,59 mrd): <https://www.taiwannews.com.tw/news/6042392>
- PPP 2025: 160 contracten, NT$380,7 mrd: <https://www.mof.gov.tw/eng/singlehtml/f48d641f159a4866b1d31c0916fbcc71>
- Trillion NT Dollar Investment National Development Plan (2025-2028): <https://english.ey.gov.tw/News3/9E5540D592A5FECD/aec5f2a0-6b7c-4ca1-8bf5-82116a08c0ab>
- Forward-looking Infrastructure Development Program (2017-2025): <https://english.ey.gov.tw/News3/9E5540D592A5FECD>
- TSMC 1,4nm-fab Centraal-Taiwan, NT$1,2–1,5 biljoen: <https://www.gvm.com.tw/article/123893>
- TSMC comprimeert bouwschema's wereldwijd: <https://ctee.com.tw/news/20260324700102-439901>; Kaohsiung vóór op schema: <https://ctee.com.tw/news/20251007700039-439901>
- PMP-houders Taiwan (>10.000 actief; spreiding 8.800–17.000): <https://uptogo.com.tw/職場/成功/職涯發展/台灣有多少人有pmp/>
- 中華專案管理學會 PMP-informatie: <https://npma.org.tw/certification/pmp-info>
- 中興工程顧問社-stichting, PMP-opleiding: <https://www.sinotech.org.tw/>

### Taiwan — leveranciers en pakketten
- PTMS 普錸資訊 (Primavera-distributeur; P6-training NT$15.750): <https://www.ptms.com.tw/> en <https://www.ptms.com.tw/index.php/blog/newest-p6-training/itemlist/tag/P6>
- 群昱 Accesssoft: <https://www.accesssoft.com.tw/>
- Oracle Taiwan — Primavera P6: <https://www.oracle.com/tw/construction-engineering/primavera-p6/>
- 孟華科技 PMIS/ePM (Gantt, S-curve, baseline, .mpp, SPI; >NT$110 mrd projecten): <https://www.mt.com.tw/solutions/epc/> en klantcases <https://www.mt.com.tw/success_story/>
- E-PMIS: <https://www.pmis.org.tw/service/PMISService.asp>
- 中程資訊顧問 CMIS: <https://www.cmis.tw/>
- 高益電腦 Goinfo: <https://www.goinfo.com.tw/>
- 鈞陽 ERPKing 營建管理ERP: <https://www.erpking.com.tw/construction-erp>
- J Project Master: <https://jprojectmaster.com/construction/>
- GoBuid (US$15,90/mnd) en vergelijking van negen pakketten: <https://gobuid.com/zh> en <https://gobuid.com/zh/blog/all-articles/best-construction-management-software>
- Taiwanese ERP-gids 2025 (用友 Yongyou genoemd): <https://blog.lookoutspace.com/zh-hant/popular-articles/2025營造業erp推薦：五大系統評測與導入分析指南/>
- Taiwanese Gantt-tool-vergelijkingen incl. ClickUp NT$300/NT$570 per maand: <https://projectmanager.com.tw/專案管理工具/甘特圖產生器軟體/> en <https://projectmanager.com.tw/專案管理工具/專案管理工具推薦/>
- Taoyuan Metro Construction Bureau voortgangsoverzicht: <https://dorts.tycg.gov.tw/cp.aspx?n=23173>
- Taichung voortgangsvraagsysteem: <https://assess-public.taichung.gov.tw/>

### Prijzen (internationale lijstprijzen, geldig voor beide markten)
- Primavera P6 Professional ~US$3.520/gebruiker perpetual; P6 EPPM ~US$2.750/application user: <https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models>
- "Primavera P6 starts at $3,500 perpetual": <https://primaverascheduling.com/home/buy-primavera-software/>
- 22% onderhoudsfee eerste jaar (juni 2025): <https://prmyazilim.com/en/primavera-p6-pricing>
- P6 perpetual-only + supportjaar: <https://www.taradigm.com/how-much-does-primavera-p6-cost/>
- P6-licentie US$3.500–7.000; MS Project Online ~US$360/jaar: <https://www.itqlick.com/oracle-primavera/pricing>
- P6 EPPM US$8.000–25.000/concurrent user; SULS 22%/jaar: <https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing>
- Oracle Primavera Cloud ~US$7.800/jaar voor 5 gebruikers: <https://globalpm.com/oracle-primavera-cloud-pricing/>
- Primavera P6 vanaf US$175/maand/gebruiker: <https://contractorsandbuilders.com/pricing/oracle-primavera/>
- Asta Powerproject £880/jaar single user: <https://softwarefinder.com/project-management-software/powerproject>
- Asta Powerproject US$2.000/gebruiker/jaar (reseller-indicatie): <https://www.itqlick.com/asta-powerproject/pricing>
- Powerproject >100.000 gebruikers wereldwijd: <https://projectintegration.net/powerproject.html>
- Microsoft Project Hongkong (Standard HK$5.499 / Professional HK$10.899): <https://www.microsoft.com/zh-hk/microsoft-365/project/microsoft-project-enterprise-plans-and-pricing>
- Microsoft Project Taiwan (Standard NT$27.290 / Professional NT$45.990): <https://www.microsoft.com/zh-tw/microsoft-365/project/compare-microsoft-project-management-software>
- Deltek Acumen Risk ~US$10.300 eerste jaar: <https://www.linkedin.com/pulse/comparative-analysis-schedule-risk-tools-intaver-institute-inc-vimsc>
- Smartsheet US$9 (Pro) / US$19 (Business) per gebruiker/maand: <https://costbench.com/software/project-management/smartsheet/> en <https://automationatlas.io/answers/smartsheet-pricing-explained-2026/>
- Wereldmarkt PM-software US$7,24 mrd (2025) → US$18,9 mrd (2035), CAGR ~10,7%: <https://www.researchnester.com/tw/reports/project-management-software-market/4176>
- Wisselkoersen 25-07-2026: <https://open.er-api.com/v6/latest/USD> en <https://api.frankfurter.dev/v1/latest?from=USD&to=HKD,GBP,EUR>

### Methodologische kanttekeningen
- **WebSearch was in deze sessie uitgeput**; al het onderzoek is uitgevoerd met directe URL-fetches en zoekopdrachten via DuckDuckGo (html/lite) en Yahoo Search, in het Engels én in Traditioneel Chinees. Enkele bronnen waren tijdelijk onbereikbaar (cmis.tw HTTP 503, goinfo.com.tw redirect-lus, accesssoft.com.tw HTTP 403); die zijn als zodanig gemarkeerd.
- **Het orderboekcijfer van 帆宣 (6196)** komt uit een zoeksnippet waarvan de eenheid (億元 vs. 十億元) niet eenduidig is; ik heb het als "orde van grootte NT$100+ miljard" gerapporteerd.
- **Geen betrouwbare piraterijcijfers** voor Hongkong of Taiwan afzonderlijk gevonden in publieke BSA-/Revenera-samenvattingen; de opmerkingen over informele licenties zijn structureel-analytisch, niet becijferd.
- **De prijs van NT$36.000/jaar voor ezteamwork advanced** komt uit een gebruikersnotitie, niet van de leverancier — expliciet gemarkeerd als lage betrouwbaarheid.
- Alle marktomvangcijfers in §2.3 zijn **eigen bottom-up schattingen** met vermelde aannames; behandel ze als orde-van-grootte, niet als meting.
