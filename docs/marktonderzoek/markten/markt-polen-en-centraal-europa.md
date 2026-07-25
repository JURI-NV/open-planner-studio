# Markt voor projectplanning-/schedulingsoftware in Polen en Centraal-/Oost-Europa

**Regio:** Polen, Tsjechië, Slowakije, Hongarije, Roemenië (CEE-5)
**Scope:** software voor projectplanning/scheduling met Gantt/CPM — bouwspecifiek, algemeen én lokaal
**Datum onderzoek:** 25 juli 2026
**Auteur:** marktonderzoek t.b.v. Open Planner Studio

---

## 0. Methodeverantwoording en betrouwbaarheid

Dit rapport is opgebouwd uit ~25 afzonderlijke zoekopdrachten in het Pools, Tsjechisch, Slowaaks, Hongaars, Roemeens en Engels, plus directe fetches van leverancierspagina's, prijslijsten (incl. PDF's) en statistiekbureaus.

**Belangrijke beperking, expliciet vermeld:** de reguliere WebSearch-tool was in deze sessie uitgeput (200/200 calls). Het onderzoek is daarom uitgevoerd via directe HTTP-fetches naar DuckDuckGo (lite/html-endpoints) plus WebFetch op bronpagina's. Dat werkt, maar geeft minder resultaten per zoekopdracht dan een volwaardige search-API en liep tweemaal tegen een CAPTCHA aan. Praktische gevolgen:

- Enkele gewenste cijfers (aantal bouwbedrijven in Polen per GUS, officiële Oracle-prijslijst, CENKROS-prijzen in EUR) zijn **niet** hard te krijgen geweest. Die staan hieronder expliciet als "niet geverifieerd" of als schatting.
- Twee PDF-prijslijsten (Oracle CEGBU service descriptions, KROS Slowakije) waren binair/gecomprimeerd en niet uitleesbaar.
- Waar een cijfer uit een aggregator (ITQlick, Datanyze, vendorbenchmark, gitnux) komt in plaats van uit een primaire bron, is dat **gemarkeerd als lage betrouwbaarheid**.

**Betrouwbaarheidscodering die hieronder gebruikt wordt:**

| Code | Betekenis |
|---|---|
| ✅ **Geverifieerd** | Rechtstreeks van de leverancier, een statistiekbureau of een overheidsbron gehaald |
| ⚠️ **Secundair** | Uit een handelspublicatie, reseller of nieuwsbericht; plausibel maar niet primair |
| ❓ **Aggregator** | Uit een prijsvergelijker/scraper (ITQlick, Datanyze, softwarefinder); indicatief, vaak verouderd |
| 🔶 **SCHATTING** | Eigen berekening/redenering; expliciet als schatting gemarkeerd, met de rekenstappen erbij |

**Gebruikte wisselkoersen.** ~~(indicatief, niet live geverifieerd): 1 EUR ≈ 4,25 PLN ≈ 24,5 CZK ≈ 390 HUF ≈ 5,0 RON; 1 USD ≈ 0,92 EUR.~~ **GECORRIGEERD bij verificatie** met de officiële referentiekoersen van 24-07-2026 ([ECB](https://data-api.ecb.europa.eu/service/data/EXR/D.USD+PLN+CZK+HUF+RON.EUR.SP00.A?lastNObservations=1&format=csvdata), [NBP tabela A nr 142/A/NBP/2026](https://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json)) ✅:

| Paar | Werkelijk (24-07-2026) | Gebruikt in het oorspronkelijke rapport | Afwijking |
|---|---|---|---|
| EUR/PLN | **4,3155** | 4,25 | −1,5% |
| EUR/CZK | **24,149** | 24,5 | +1,5% |
| EUR/HUF | **361,88** | 390 | **+7,8% — materieel** |
| EUR/RON | **5,2343** | 5,0 | +4,5% |
| EUR/USD | **1,1377** (1 USD = 0,879 EUR) | 1 USD = 0,92 EUR | **−4,6%** |
| USD/PLN | **3,8000** (NBP) | 3,65 (§5.5) | **−3,9%** |

De HUF- en USD-koersen zijn materieel fout gebruikt; alle EUR-bedragen die uit HUF of USD zijn afgeleid, zijn hieronder herrekend. Let ook op de **interne inconsistentie** in het oorspronkelijke rapport: 1 USD = 0,92 EUR × 4,25 PLN/EUR impliceert 3,91 PLN/USD, terwijl §5.5 met 3,65 rekende.

---

## 1. Samenvatting

**De kern in acht punten:**

1. **Microsoft Project is de facto de standaard.** ⚠️ **AFGEZWAKT BIJ VERIFICATIE.** Het oorspronkelijke rapport stelde dat in Poolse FIDIC-wegcontracten de "harmonogram rzeczowo-finansowy" *letterlijk in Microsoft Office Project-formaat* wordt geëist. **Die bewering is niet reproduceerbaar.** De voetnoot verwees niet naar een document maar naar een **DuckDuckGo-zoekopdracht-URL** — dat is geen bron. Het letterlijke citaat `"opracowany w Microsoft Office Project"` levert bij herhaling **nul zoekresultaten** op. Het is aannemelijk dat individuele Poolse aanbestedingen MSP-formaat noemen (vaak als "MS Project lub równoważny"), maar **een contractuele MSP-plicht is in dit onderzoek niet aangetoond**. Behandel dit als 🔶 hypothese, niet als vondst. Wat wél overeind blijft: **MPP/XML-uitwisseling is een toegangseis**, ongeacht of die eis contractueel of gewoontematig is.

2. **Primavera P6 is de tweede laag: grote infra, energie en internationale aannemers.** In Roemenië is het bereik verrassend groot: exclusief Oracle-partner TotalSoft claimt **>600 Primavera-klanten** en **>5.000 internationaal gecertificeerde specialisten** opgeleid ⚠️. **GECORRIGEERD BIJ VERIFICATIE:** deze twee getallen staan **niet** op de huidige pagina [totalsoft.ro/primavera](https://www.totalsoft.ro/primavera); ze zijn terug te voeren op persberichten uit **circa 2007–2011** (o.a. [finantare.ro, 5 mei 2011](https://www.finantare.ro/totalsoft-intra-pe-piata-de-retail.html): *"pregatind deja peste 5000 de specialisti certificati international"*; plandeafacere.ro voor de 600 klanten). Het zijn dus **~15 jaar oude, cumulatieve claims**, geen actuele installed base. In Polen is de installed base smaller — LinkedIn Polen toont slechts **31 openstaande Primavera P6-vacatures** ([pl.linkedin.com/jobs/primavera-p6-jobs](https://pl.linkedin.com/jobs/primavera-p6-jobs)) ⚠️, wat duidt op een niche van enkele honderden tot ruim duizend actieve planners.

3. **De lokale pakketten zijn géén planningspakketten — het zijn calculatiepakketten met een harmonogram-tabblad.** Norma (PL), Zuzia/BIMestiMate (PL), Rodos (PL), KROS 4 / CENKROS (CZ/SK), TERC V.I.P. (HU), WindevRO/eDevize (RO): allemaal gebouwd rond de nationale normcatalogi (KNR, TSKP, ÚRS, HG 907/2016), met scheduling als bijproduct. **Dit is het belangrijkste structurele inzicht van dit rapport:** het lokale ecosysteem is verankerd in *kostenramingsnormen*, niet in *planningsmethodiek*. Een pure planningstool concurreert dus niet met Norma of KROS — hij vult het gat dat zij openlaten.

4. **Er is één echte uitzondering: CONTEC (Tsjechië).** Ontwikkeld door prof. ing. Čeněk Jarský, DrSc. — een volwaardig bouwplanningssysteem met netwerkdiagrammen, harmonogrammen, **cyclogrammen (tijd-weg-diagrammen)**, resource-balansgrafieken, kwaliteitscontroleplanning en cashflow, gevoed door de APSTA-normdatabase ([contec.cz](https://www.contec.cz), [netdatasoft.cz](https://netdatasoft.cz/software-pro-casovou-pripravu/)) ✅. Dit is het enige inheemse CEE-pakket dat methodologisch met TILOS/Asta in dezelfde categorie speelt.

5. **Polen heeft twee kleine inheemse planningstools die vrijwel niemand buiten Polen kent:** **PLANISTA** (PERT/Gantt, kritiek pad, koppeling naar arbeids- en materiaalkosten, module Karty Pracy; via planista.com.pl / unilogic.pl / astino.pl) en **PROGPOL** (harmonogrammen met vrije structuur, voortgangsregistratie in % en omvang, onderdeel van het TelkomBud-systeem; progpol.com) ⚠️. Beide publiceren geen prijzen — telefonische offerte.

6. **De bouwmarkt zelf is groot en groeit:** Polen EUR 54,04 mrd in 2025 (+5,1%, vanaf EUR 51,41 mrd in 2024 → EUR 66,66 mrd in 2029) ✅ [Businesswire](https://www.businesswire.com/news/home/20250430779835/en/) — **let op: de uitgever is ResearchAndMarkets.com ("Poland Construction Industry Databook Series"), niet GlobalData; die attributie is bij verificatie gecorrigeerd**; Slowakije brak in 2025 voor het eerst door **EUR 8,4 mrd** (+7% reëel) ✅ [Štatistický úrad SR](https://slovak.statistics.sk/); Hongarije HUF 7.699 mrd in 2024, −1,2% reëel (≈ EUR 19,5 mrd tegen de koers van 2024) ✅ [KSH](https://www.ksh.hu/epitoipar); Tsjechië **CZK 695,8 mrd aan uitgevoerde bouwwerken in 2024 ≈ EUR 28,8 mrd** ✅ ([MPO, *Stavebnictví České republiky 2025*](https://www.mpo.gov.cz)) plus +9,3% in 2025 → **≈ EUR 31,5 mrd** — dit absolute cijfer ontbrak in de eerste versie en is bij verificatie toegevoegd; Roemenië +8% in 2025 ⚠️ [agendaconstructiilor.ro](https://www.agendaconstructiilor.ro), investeringen in *nieuwe* bouwwerken alleen al RON ~117 mrd in 2024 ⚠️ (INS via agendaconstructiilor.ro).

7. **De softwaremarkt is daarentegen klein.** 🔴 **GECORRIGEERD — dit punt sprak §3.3 tegen.** De oorspronkelijke tekst noemde hier "EUR 12–25 mln pure licenties (midpunt 18), EUR 20–40 mln inclusief diensten", maar de eigen rekenstap in §3.3 komt uit op **EUR 5,1–12,9 mln pure licenties (midpunt ≈ EUR 9 mln)** en **EUR 9–31 mln inclusief training/consultancy**. De §3.3-getallen zijn leidend; de samenvatting was fout. De reden voor de lage waarde is niet marktgrootte maar **prijsrealisatie en penetratie**: Excel en informele licenties vullen het gat.

8. **Prijsniveaus zijn nominaal Westers, koopkrachtgecorrigeerd hoog.** MS Project Professional 2024 kost in Polen **7.099 PLN** ✅ ([microsoft.com/pl-pl](https://www.microsoft.com/pl-pl/microsoft-365/project/compare-microsoft-project-management-software), opnieuw geverifieerd) tegen **$1.129,99** in de VS ✅ (idem). 🔴 **GECORRIGEERD:** na aftrek van 23% Poolse btw is dat 5.771,54 PLN; tegen de **werkelijke** NBP-koers van 3,80 PLN/USD (niet de gebruikte 3,65) is dat **$1.518,83**, dus **+34%** ten opzichte van de VS — niet de geclaimde ~40%. Voor Standard: 3.251,22 PLN netto = $855,58 vs. $679,99 = **+26%** (niet +31%). De conclusie blijft staan, de scherpte was overdreven.

**Wat dit betekent voor een product als Open Planner Studio:** de combinatie van (a) contractueel afgedwongen MSP-compatibiliteit, (b) hoge nominale prijzen van de gevestigde spelers, (c) lokale pakketten die planning niet serieus doen, en (d) een bouwmarkt die door EU-fondsen groeit, is ongewoon gunstig. De toegangseis is niet functionaliteit — het is **bestandsuitwisseling (MPP/XML/XER), lokalisatie in vijf talen, en een prijs die onder de MSP-drempel duikt.**

---

## 2. Onderliggende bouwmarkt: hoe groot is de vraagzijde?

De softwaremarkt is een afgeleide van de bouwmarkt. Eerst de basis.

### 2.1 Bouwproductie per land

| Land | Waarde | Jaar | Groei | Bron | Code |
|---|---|---|---|---|---|
| **Polen** | **EUR 54,04 mrd** | 2025 | +5,1% j-o-j; CAGR 4,1% → EUR 66,66 mrd in 2029 | [Businesswire/GlobalData](https://www.businesswire.com/news/home/20250430779835/en/) | ✅ |
| Polen (alt. raming) | USD 67,28 mrd | 2025 | CAGR 2,92% → USD 89,74 mrd in 2035 | [Market Research Future](https://www.marketresearchfuture.com/reports/poland-construction-market-25780) | ⚠️ |
| Polen (historisch) | — | 2020–2024 | CAGR **7,7%** | [Businesswire/GlobalData](https://www.businesswire.com/news/home/20250430779835/en/) | ✅ |
| **Slowakije** | **EUR 8,4 mrd** | 2025 | +7% reëel; hoogste ooit gemeten | [Štatistický úrad SR](https://slovak.statistics.sk/wps/portal/ext/products/informationmessages/inf_sprava_detail/4b10de05-8b13-4df8-8923-65cc8f3404c4/) / [Aktuality](https://www.aktuality.sk/clanok/3N9y6rS/stavebnictvo-na-slovensku-lame-rekordy-prvykrat-prekrocilo-hranicu-84-miliardy-eur-za-jediny-rok/) | ✅ |
| **Hongarije** | **HUF 7.699 mrd** (≈ EUR 19,7 mrd) | 2024 | −1,2% reëel t.o.v. 2023; 2025 herstel (+4,9 tot +6,5% per maand) | [KSH](https://www.ksh.hu/epitoipar), [KSH gyorstájékoztató](https://www.ksh.hu/gyorstajekoztatok/epi/epi2506.html) | ✅ (HUF-waarde); EUR-omrekening = eigen |
| **Tsjechië** | **CZK 695,8 mrd ≈ EUR 28,8 mrd** aan uitgevoerde bouwwerken | **2024** | +9,3% productie in 2025 → ≈ EUR 31,5 mrd; nieuwe orders +8,8%; gemiddeld loon >43.000 CZK (+10,3%) | [MPO, *Stavebnictví České republiky 2025*](https://www.mpo.gov.cz) — *"Stavební společnosti provedly v roce 2024 stavební práce v hodnotě 695,8 miliard Kč"* | ✅ **bij verificatie toegevoegd** |
| **Roemenië** | +8% marktgroei; investeringen in **nieuwe** bouwwerken ≈ RON 117 mrd (≈ EUR 22,4 mrd) | 2024/2025 | 2024 volume bouwwerken **−5,9%** t.o.v. 2023 (INS) — niet −4% zoals eerder vermeld | [INS via agendaconstructiilor.ro](https://www.agendaconstructiilor.ro), [smartestate.ro](https://smartestate.ro/2025/02/28/piata-constructiilor) | ⚠️ |
| **CEE-5, consistente EU-basis** | **Omzet EUR 274,9 mrd / productiewaarde EUR 243,8 mrd / toegevoegde waarde EUR 71,9 mrd**; 988.198 ondernemingen; 2.609.466 werkenden | 2023 | NACE F (Bouwnijverheid), alle vijf landen op één definitie | [Eurostat SBS, `sbs_ovw_act`](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/sbs_ovw_act?format=JSON&nace_r2=F&time=2023) | ✅ **bij verificatie toegevoegd — de enige onderling vergelijkbare reeks** |
| **Oost-Europa (regio)** | USD 117 mrd (2024) resp. USD 482 mrd (2025-projectie) | 2024/2025 | 7% CAGR | [Verified Market Research](https://www.verifiedmarketresearch.com/product/eastern-europe-construction-market/), [Data Insights Market](https://www.datainsightsmarket.com/reports/eastern-europe-construction-market-17452) | ❓ — de twee cijfers verschillen factor 4; regiodefinities lopen uiteen. **Niet bruikbaar.** |

> **Waarschuwing bij de regiocijfers:** USD 117 mrd (2024) en USD 482 mrd (2025) voor "Eastern Europe" zijn onverenigbaar. Marktrapportenbureaus hanteren verschillende landafbakeningen (met/zonder Rusland, Turkije, Oekraïne). Gebruik uitsluitend de landcijfers.

**Eigen optelling CEE-5 bouwproductie:** ~~🔶 SCHATTING ≈ EUR 145–155 mrd (2025). Rekenstap: Polen 54,0 + Slowakije 8,4 + Hongarije ~20,5 + Tsjechië ~24–26 + Roemenië ~38–42.~~

🔴 **DEZE OPTELLING IS BIJ VERIFICATIE VERWORPEN.** Drie afzonderlijke bezwaren:

**(a) Het is een optelling van onvergelijkbare grootheden.** Elk land is met een andere definitie ingebracht: Polen met een marktrapport-*outputwaarde* (ResearchAndMarkets), Slowakije met de nationale *stavebná produkcia* (een smalle reeks: EUR 8,4 mrd, terwijl Eurostat voor dezelfde sector EUR 15,4 mrd productiewaarde meet), Hongarije met de KSH-*bruto termelés*, en Tsjechië/Roemenië met eigen giswerk. Zulke reeksen mogen niet bij elkaar worden opgeteld. Dit was de zwakste stap in het hele rapport.

**(b) De twee zelfgeschatte componenten zijn allebei aantoonbaar mis.**
- **Tsjechië geschat op EUR 24–26 mrd** — werkelijk **CZK 695,8 mrd = EUR 28,8 mrd in 2024** ✅ (MPO), en met de eigen +9,3% voor 2025 ≈ **EUR 31,5 mrd**. Onderschatting van **~20–30%**.
- **Roemenië geschat op EUR 38–42 mrd**, met de expliciete redenering *"Roemenië ligt qua bouwvolume structureel boven Tsjechië"*. **Dat is onjuist.** Eurostat NACE F: productiewaarde 2023 CZ **EUR 51,1 mrd** vs. RO **EUR 49,0 mrd**; 2022 CZ **EUR 47,4 mrd** vs. RO **EUR 39,9 mrd**. Op omzetbasis is het verschil nog groter (CZ 51,9 vs. RO 44,5). **Tsjechië ligt in beide jaren en op beide maatstaven boven Roemenië** — precies omgekeerd aan de aanname.

**(c) Op één consistente basis is de regio veel groter.** Eurostat SBS 2023, NACE F, CEE-5 ✅:

| Land | Ondernemingen | Werkzame personen | Netto-omzet (mln EUR) | Productiewaarde (mln EUR) | Toegevoegde waarde (mln EUR) |
|---|---:|---:|---:|---:|---:|
| Polen | 421.178 | 1.146.998 | 129.383 | 105.003 | 33.276 |
| Tsjechië | 201.528 | 415.010 | 51.945 | 51.116 | 11.742 |
| Slowakije | 136.769 | 201.123 | 16.554 | 15.382 | 3.645 |
| Hongarije | 123.796 | 330.168 | 32.542 | 23.291 | 8.175 |
| Roemenië | 104.927 | 516.167 | 44.521 | 48.972 | 15.066 |
| **CEE-5** | **988.198** | **2.609.466** | **274.944** | **243.763** | **71.904** |

**Werkbare conclusie:** noem geen enkel getal zonder de maatstaf erbij.
- *Toegevoegde waarde* (dubbeltellingsvrij, de zuiverste maat): **≈ EUR 72 mrd** (2023) ✅
- *Productiewaarde* NACE F: **≈ EUR 244 mrd** (2023) ✅
- *Netto-omzet* NACE F: **≈ EUR 275 mrd** (2023) ✅
- *Som van nationale "bouwproductie"-reeksen zoals de statistiekbureaus die publiceren:* ordegrootte **EUR 120–140 mrd** — lager dan de eerder genoemde 145–155, omdat die optelling deels ruimere reeksen gebruikte.

Het oorspronkelijke "EUR 145–155 mrd" hoort dus nergens thuis: het is te hoog voor de smalle nationale reeksen en 40% te laag voor de EU-brede definitie. **Alle afgeleide ratio's in §3.4 zijn hierop herrekend.**

### 2.2 De EU-fondsenmotor

Dit is wat de regio onderscheidt van West-Europa: de bouwvraag is voor een groot deel **publiek en EU-gefinancierd**, en publieke opdrachtgevers stellen contractueel planningseisen. Dat is precies de mechaniek die scheduling-software verkoopt.

| Land | EU-instroom | Jaar | Bron | Code |
|---|---|---|---|---|
| Roemenië | ~EUR 4,4 mrd betalingsverzoeken Cohesiebeleid | 2025 | [arenaconstruct.ro](https://arenaconstruct.ro/absorbtia-fondurilor-europene-pnrr) | ⚠️ |
| Roemenië | EUR 1,3 mrd extra tranche PNRR (betalingsverzoek #3) | 2025 | [arenaconstruct.ro](https://arenaconstruct.ro/absorbtia-fondurilor-europene-pnrr) | ⚠️ |
| Roemenië | EUR 3,2 mrd ontvangen in eerste zes maanden | 2025 | [puterea.ro](https://www.puterea.ro) | ⚠️ |
| Roemenië | PNRR-subsidies na heronderhandeling: **EUR 13,57 mrd** | 2025 | [politicmedia.ro](https://politicmedia.ro/romania-a-finalizat-renegocierea-pnrr) | ⚠️ |
| Roemenië | Rijksbegroting rekent op RON 87,7 mrd uit EU-fondsen — **verdubbeling** t.o.v. RON 42,92 mrd het jaar ervoor | 2025 | [profit.ro](https://www.profit.ro) | ⚠️ |
| Roemenië | RON 2,9 mrd (USD 629,7 mln) staatssteunregeling | maart 2025 | [ResearchAndMarkets via Businesswire](https://secure.businesswire.com) | ⚠️ |
| Polen | Groei "backed by government infrastructure investments"; hernieuwbare-energiedoel 56% in 2030 | 2026–2029, AAGR 4% | [Businesswire/GlobalData](https://www.businesswire.com/news/home/20250904367608/en/) | ✅ |

**Interpretatie:** Roemenië is qua *fondsenversnelling* het meest dynamisch, Polen qua *absolute omvang*. Beide zijn de logische eerste markten.

### 2.3 Werkgelegenheid en bedrijven

| Metric | Waarde | Jaar | Bron | Code |
|---|---|---|---|---|
| **Polen, werkenden in de bouw** | **1.146.998** (waarvan 759.965 werknemers) | **2023** | [Eurostat SBS `sbs_ovw_act`, NACE F](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/sbs_ovw_act?format=JSON&geo=PL&nace_r2=F&time=2023) | ✅ **bij verificatie vervangen** — de eerdere gitnux-schatting van "~1,0 mln" blijkt ordegrootte-correct maar ~13% te laag |
| **Polen, aantal bouwondernemingen (NACE F)** | **421.178** | 2023 | [Eurostat SBS](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/sbs_ovw_act?format=JSON&geo=PL&nace_r2=F&time=2023) | ✅ **bij verificatie toegevoegd — dit vulde kennisleemte §9.1** |
| Polen, tekort aan bouwvakkers | ~60.000 | 2024/2025 | TVP.info / INN Poland, citerend GUS | ⚠️ |
| Polen, banenverlies industrie + bouw samen | >160.000 | 2024 | TVP.info / INN Poland, citerend GUS | ⚠️ |
| Tsjechië, werkenden in de bouw | ~~**215.000**~~ → **415.010** | 2023 | [Eurostat SBS, NACE F](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/sbs_ovw_act?format=JSON&geo=CZ&nace_r2=F&time=2023) | 🔴 **GECORRIGEERD.** Het rapport bevatte hier twee eigen cijfers die elkaar met factor 2 tegenspraken: "215.000 werkenden" én "7,72% van 5,4 mln" (= 416.880). Eurostat geeft **415.010 werkzame personen** en beslist daarmee ten gunste van de tweede. De 215.000 is vermoedelijk alleen *werknemers bij bouwbedrijven met 50+ werkzamen* — een veel smallere reeks, die ook elders in het rapport (§6.3) onterecht als "de" werkgelegenheid is gebruikt. |
| Tsjechië, aandeel bouw in totale werkgelegenheid | 7,72% (van 5,4 mln) = ~417.000 | 2024 | ČSÚ | ✅ consistent met Eurostat |
| CZ/SK/HU/RO, bouwondernemingen (NACE F) | CZ 201.528 · SK 136.769 · HU 123.796 · RO 104.927 | 2023 | [Eurostat SBS](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/sbs_ovw_act?format=JSON&nace_r2=F&time=2023) | ✅ **bij verificatie toegevoegd — dit vulde kennisleemte §9.2** |
| Polen, totaal REGON-registraties (alle sectoren) | 5.384,2 duizend | eind juli 2025 | [GUS](https://stat.gov.pl) | ✅ |
| Polen, bouwproductie 2024 | ≈ −8% t.o.v. 2023 | 2024 | [GUS, "Efekty działalności budowlanej w 2024 r."](https://stat.gov.pl/obszary-tematyczne/przemysl-budownictwo-srodki-trwale/budownictwo/) | ⚠️ |

> ~~**Niet gelukt:** het exacte aantal geregistreerde bouwbedrijven in Polen en de Eurostat-cijfers per land.~~ ✅ **BIJ VERIFICATIE ALSNOG OPGELOST.** Beide gaten zijn gevuld via de Eurostat-disseminatie-API (dataset `sbs_ovw_act`, dimensie `nace_r2=F`), die per land ondernemingen, werkzame personen, werknemers, netto-omzet, productiewaarde en toegevoegde waarde geeft. Het is geen zoekmachine nodig — de API is publiek en zonder sleutel bevraagbaar:
> ```
> https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/sbs_ovw_act?format=JSON&geo=PL&nace_r2=F&time=2023
> ```
> **Leerpunt voor vervolgonderzoek:** waar het oorspronkelijke onderzoek op zoekmachines vastliep, waren de cijfers gewoon via statistische API's beschikbaar (Eurostat, ECB, NBP). Dat is de betere route voor kwantitatieve claims.

---

## 3. Marktomvang van de planningssoftware zelf

### 3.1 Wat de marktrapporten zeggen (en waarom je ze niet moet vertrouwen)

| Metric | Waarde | Bron | Code |
|---|---|---|---|
| Wereldwijde bouwsoftwaremarkt | USD 4,6 mrd (2025) → USD 9,2 mrd (2034), CAGR 8,2% | via zoekresultaat, uitgever niet identificeerbaar | ❓ **Onbruikbaar zonder uitgever** |
| Wereldwijde bouwsoftware, alt. | USD 7,77 mrd in 2030 | idem | ❓ |
| Wereldwijde PM-software | USD 6,6–11,91 mrd (2025), afhankelijk van bureau | diverse | ❓ — spreiding factor 1,8 |
| Polen PM-softwaremarkt 2025–2031 | *rapport bestaat, cijfer niet publiek* | [6Wresearch](https://www.6wresearch.com/industry-report/poland-project-management-software-market) | ❌ geen cijfer |
| Polen PPM-softwaremarkt 2025–2031 | *rapport bestaat, cijfer niet publiek* | [6Wresearch](https://www.6wresearch.com/industry-report/poland-project-and-portfolio-management-software-market) | ❌ geen cijfer |
| Polen IT-diensten & software totaal | USD 19,5 mrd (2025) → USD 40,64 mrd (2034) | [thereportcubes.com](https://www.thereportcubes.com/report-store/it-services-software-market-insights-poland) | ❓ veel te breed om iets over planning te zeggen |
| Oracle Primavera P6, wereldwijd marktaandeel in categorie PM | 0,69%, >1.564 bedrijven | [Datanyze](https://www.datanyze.com) | ❓ meet alleen webscrape-detecteerbaar gebruik; sterk onderschat voor desktop-software |

**Conclusie:** er bestaat **geen publiek, betrouwbaar cijfer** voor de omvang van de bouwplanningssoftwaremarkt in de CEE-5. Wie zo'n cijfer nodig heeft, moet het zelf afleiden.

### 3.2 Rangorde-schatting van het aantal gebruikers

🔶 **SCHATTING — volledige redenering:**

**Stap 1 — hoeveel mensen maken hier serieus een CPM-planning?**

Uitgangspunten:
- CEE-5 bouwproductie ≈ EUR 150 mrd (§2.1).
- Vuistregel uit de sector: bij formele aannemers is er ongeveer **één planningsverantwoordelijke per EUR 15–30 mln jaaromzet** (bij infra dichter bij 15, bij woningbouw/kleinbedrijf richting 30+, en bij micro-ondernemingen nul).
- Een groot deel van de CEE-bouwproductie zit bij micro- en kleinbedrijven die géén formele planning voeren.

Berekening: neem aan dat **55–65%** van de productie bij bedrijven zit die überhaupt planningssoftware overwegen (EUR 85–95 mrd), en deel door EUR 15–30 mln per planner:

> EUR 90 mrd ÷ EUR 20 mln = **~4.500 dedicated planners**
> Bandbreedte: EUR 85 mrd ÷ 30 mln = 2.800 … EUR 95 mrd ÷ 15 mln = 6.300

- **Dedicated planningsengineers CEE-5: 3.000–6.500** 🔶

**Stap 2 — plus de gelegenheidsplanners.** Uitvoerders (kierownik budowy / stavbyvedoucí / șef de șantier), calculators en projectleiders die zelf een harmonogram onderhouden zonder "planner" te heten. Ervaringsregel: 3–5× het aantal dedicated planners.

- **Gelegenheidsgebruikers CEE-5: 10.000–30.000** 🔶

**Stap 3 — totaal aanspreekbare gebruikers.**

- **Totaal: 13.000–36.000 personen; werkbaar midpunt ≈ 22.000** 🔶
- Waarvan Polen ≈ 40–45% (naar rato van bouwvolume): **~9.000–10.000** 🔶

**Kruiscontrole 1:** LinkedIn Polen toont 31 openstaande Primavera P6-vacatures ⚠️. Bij een gebruikelijke vacature-op-installed-base-ratio van 2–5% impliceert dat **600–1.500 actieve P6-planners in Polen**. Dat past binnen het bovenstaande (P6 als tweede laag naast een veel grotere MSP-laag). ✅ consistent.

**Kruiscontrole 2:** TotalSoft claimt >5.000 opgeleide/gecertificeerde Primavera-specialisten in Roemenië ⚠️. Dat is een *cumulatief* opleidingscijfer over ~20 jaar, niet een actieve installed base — reken op 20–35% nog actief in het vak, dus **1.000–1.750 actieve P6-gebruikers in Roemenië**. Ook consistent, en het bevestigt dat Roemenië relatief P6-zwaarder is dan Polen.

### 3.3 Geldomvang van de markt

🔶 **SCHATTING — volledige redenering, laag voor laag:**

**A. Microsoft Project (de volumelaag)**

- Aanname: 60–70% van de ~22.000 gebruikers gebruikt MSP als primaire tool = **13.000–15.000 seats**, maar een aanzienlijk deel daarvan is (a) meegeleverd via bedrijfsbrede Microsoft-overeenkomsten, (b) een oude perpetual licentie, of (c) niet correct gelicentieerd (§6.6).
- Aanname betaalde, jaarlijks-toerekenbare seats: **8.000–11.000**.
- Gemiddelde jaarwaarde per seat: Project Plan 3 ≈ 151,38 PLN/mnd bruto ≈ 1.816 PLN/jr ≈ EUR 427 ✅; perpetual Professional 7.099 PLN over 4 jaar afgeschreven ≈ EUR 417/jr ✅; veel gebruikers zitten op het goedkopere Plan 1/Standard-niveau. Gewogen gemiddelde: **EUR 300–400/seat/jaar**.

> **MSP-omzet CEE-5: 8.000–11.000 × EUR 300–400 = EUR 2,4–4,4 mln/jaar** 🔶

**B. Oracle Primavera (de waarde-laag)**

- Aanname actieve betaalde P6-seats CEE-5: **1.800–3.000** (Polen ~700–1.200, Roemenië ~800–1.400, CZ/SK/HU samen ~300–500) 🔶.
- Jaarwaarde per seat: cloud $175/mnd = $2.100/jr ≈ EUR 1.930 ❓; perpetual $3.500–7.000 + ~22% support, over 5 jaar ≈ $1.500–2.400/jr ❓. Bovendien geeft Oracle in deze regio stevige kortingen (30–50% is gangbaar ❓). Reken **EUR 1.200–1.800 netto/seat/jaar**.

> **Primavera-omzet CEE-5: 1.800–3.000 × EUR 1.200–1.800 = EUR 2,2–5,4 mln/jaar** 🔶

**C. Overige bouwspecifieke tools (Asta, TILOS, SYNCHRO, CONTEC, PLANISTA, PROGPOL, ALICE)**

- Zeer dunne aanwezigheid (§4.4). Aanname: **500–1.500 seats** totaal, gemiddeld EUR 500–1.200/jaar.

> **EUR 0,3–1,8 mln/jaar** 🔶

**D. Algemene PM-tools voor zover ingezet als planningstool in de bouw (monday.com, Smartsheet, Wrike, Asana, ClickUp, Jira)**

- Deze worden in de regio breed gebruikt ⚠️ ([procesywbiznesie.pl](https://procesywbiznesie.pl), [rankingo.pl](https://rankingo.pl)) maar zelden als CPM-tool. Toerekening aan "bouwplanning": aanname **2.000–5.000 seats × EUR 100–250/jaar**.

> **EUR 0,2–1,3 mln/jaar** 🔶

**Totaal pure planningslicenties CEE-5:**

> **EUR 5,1 – 12,9 mln/jaar; midpunt ≈ EUR 9 mln** 🔶

**Plus training, implementatie en consultancy.** In deze regio is de dienstencomponent naar verhouding hoog: P6-implementaties gaan altijd met consultancy gepaard, en de opleidingscultuur is sterk (§6.5). Ratio diensten:licenties bij enterprise-tools is typisch 1:1 tot 2:1; bij MSP veel lager. Gewogen: **+80–140%**.

> **Totaal inclusief diensten: EUR 9 – 31 mln/jaar; werkbare centrale schatting ≈ EUR 18–20 mln/jaar** 🔶

**Uitgebreide definitie ("planning-adjacent"):** tel je de lokale calculatiepakketten mee die een harmonogram-module bevatten (Norma, Zuzia, Rodos, KROS 4, CENKROS, TERC, WindevRO, eDevize) — voor veel bedrijven in de regio zijn dát de programma's waarin de planning ontstaat — dan komt daar een aanzienlijk bedrag bij. Ruwe raming: 25.000–50.000 licenties in de CEE-5 à EUR 300–900/jaar =

> **EUR 7,5 – 45 mln/jaar extra** 🔶

🔴 **REKENFOUT GECORRIGEERD:** het rapport concludeerde hier "totale planning-adjacent markt ≈ EUR 30–75 mln/jaar". Dat volgt niet uit de eigen componenten. Correct opgeteld:
- centrale variant: EUR 18–20 mln + EUR 7,5–45 mln = **EUR 25,5 – 65 mln/jaar**
- volledige bandbreedte: EUR 9–31 mln + EUR 7,5–45 mln = **EUR 16,5 – 76 mln/jaar**

Gebruik **EUR 25–65 mln/jaar** als centrale planning-adjacent-schatting 🔶. De ondergrens van 30 was ~18% te hoog gesteld.

**Groei:** 🔶 SCHATTING **8–12% per jaar** voor de softwarecomponent, dus sneller dan de onderliggende bouwmarkt (4–5% ✅). Redenering: (a) de bouwmarkt groeit zelf, (b) digitaliseringsachterstand wordt ingelopen — de Poolse sector "worstelt nog met lage adoptie van moderne IT" ⚠️ ([builderpolska.pl](https://builderpolska.pl/2025/01/15/cyfryzacja-branzy-budowlanej-ewolucja-zamiast-rewolucji/)), wat inhaalgroei impliceert, (c) EU-fondsen dwingen rapportagediscipline af, (d) BIM-verplichtingen in publieke aanbestedingen ⚠️ ([gov.pl, "Cyfryzacja procesu budowlanego w Polsce"](https://www.gov.pl/attachment/6f1257e0-74d4-48c4-8e71-2b9570bff7c3)).

### 3.4 Waarom de markt zo klein is ten opzichte van de bouwomzet

Het opvallende getal was: **EUR ~18 mln software op EUR ~150 mrd bouwproductie = 0,012%**. De rekensom klopt, maar 🔴 **de noemer was niet gedefinieerd en is bij verificatie verworpen (§2.1)**. De ratio is volledig afhankelijk van welke maatstaf je kiest:

| Noemer (CEE-5) | Waarde | Ratio bij EUR 18 mln software |
|---|---:|---:|
| Verworpen optelling uit de eerste versie | EUR 150 mrd | 0,0120% |
| Eurostat NACE F **productiewaarde** 2023 ✅ | EUR 243,8 mrd | **0,0074%** |
| Eurostat NACE F **netto-omzet** 2023 ✅ | EUR 274,9 mrd | 0,0065% |
| Eurostat NACE F **toegevoegde waarde** 2023 ✅ (dubbeltellingsvrij) | EUR 71,9 mrd | **0,0250%** |

**Noem voortaan de maatstaf erbij.** De eerlijkste enkele ratio is die op toegevoegde waarde (0,025%), omdat softwarebudgetten uit marge betaald worden en niet uit doorgeschoven onderaannemersomzet.

⚠️ **"3–5× hoger in West-Europa" is een onbewezen bewering.** Nergens in dit rapport staat een West-Europees softwarebestedingscijfer, en er is er ook geen gevonden. De multiplicator is dus niet afgeleid maar gepostuleerd. Behandel hem als 🔶 gevoel, niet als bevinding. Drie verklaringen die wél onderbouwd zijn:

1. **Excel-substitutie** (§6.6) — de grootste concurrent is geen product.
2. **Informele licenties** (§6.6) — Roemenië 59% niet-gelicentieerde software ⚠️.
3. **Prijsafschrikking** — nominale Westerse prijzen bij CEE-lonen (§5.5).

Dat is tegelijk het *argument vóór* een betaalbaar alternatief: de markt is niet klein omdat er geen behoefte is, maar omdat het aanbod te duur geprijsd is.

---

## 4. Welke software wordt hier daadwerkelijk gebruikt — rangorde en marktpositie

### 4.1 Laag 1 — Microsoft Project: marktleider door contractdwang

**Positie: waarschijnlijk #1 in alle vijf de landen.** 🔴 **AFGEZWAKT BIJ VERIFICATIE.** De oorspronkelijke formulering was *"#1 in alle vijf de landen, met afstand"* — maar het rapport erkent zélf in §9.8 dat **harde marktaandeelcijfers voor MS Project vs. P6 vs. Excel niet bestaan**, niet regionaal en niet mondiaal. Een rangorde-uitspraak "met afstand" is dan niet houdbaar; het is een plausibele inschatting op basis van indirecte signalen (prijs, opleidingsaanbod, aanwezigheid in vergelijkingsartikelen, afwezigheid van alternatieven). Behandel als 🔶, niet als ✅.

Indirect bewijs per land:

- **Polen:** het rapport citeerde hier *"szczegółowy Program/Harmonogram ... opracowany w Microsoft Office Project"* als contractuele eis. 🔴 **Dit citaat is niet verifieerbaar gebleken** — de onderliggende verwijzing was een DuckDuckGo-zoekopdracht-URL in plaats van een document, en de exacte zinsnede levert nul zoekresultaten op. **De bewering "MSP is in Polen contractueel voorgeschreven" is dus niet aangetoond** en mag niet als vondst worden gepresenteerd. Wat plausibel blijft: individuele aanbestedingen noemen MS Project als aanleverformaat, gebruikelijk met de clausule "lub równoważny" (of gelijkwaardig) die het Poolse aanbestedingsrecht (Pzp) bij merknoemen verplicht stelt — wat de "dwang" eerder tot een *de-facto* dan een *de-jure* standaard maakt.
- **Tsjechië:** beschreven als de *"uživatelsky přívětivý a cenově dostupný standardní univerzální program"* voor bouwplanning ⚠️ ([stavebniklub.cz](https://www.stavebniklub.cz)).
- **Hongarije:** Microsoft voert een eigen Hongaarse Project-productpagina ✅ ([microsoft.com/hu-hu](https://www.microsoft.com/hu-hu/microsoft-365/p/project-professional-2024/CFQ7TTC0PH40)); het vergelijkingsgenre "Primavera vs MS Project" is in het Hongaars breed vertegenwoordigd ⚠️.
- **Roemenië:** MSP is de standaard onder de P6-laag; Gantt-eisen in aanbestedingen (§6.2) worden overwegend in MSP of Excel ingevuld ⚠️.

**Gebruikers:** vrijwel alle aannemers boven ~20 medewerkers, ingenieursbureaus, overheidsopdrachtgevers, industriële opdrachtgevers.

**Sterk:** universeel, contractueel geaccepteerd, iedereen kan het lezen, ruim opleidingsaanbod, lage instapdrempel.
**Zwak:** geen bouwspecifieke functionaliteit (geen tijd-weg-diagram, geen locatiegebaseerde planning, zwakke resource-optimalisatie voor bouwploegen), duur in lokale koopkracht, geen koppeling met de nationale normcatalogi.

### 4.2 Laag 2 — Oracle Primavera P6: grote infra, energie, internationale aannemers

**Positie: #2 regionaal; #1 binnen het segment grote infrastructuur en energie.**

**Roemenië — sterkste positie in de regio.** TotalSoft is de exclusieve Oracle-gecertificeerde Primavera-partner en levert *"vânzare, implementare, training, consultanță și suport tehnic a întregii suite de produse Primavera"* ⚠️ ([totalsoft.ro/primavera](https://www.totalsoft.ro/primavera)):

- **>600 Primavera-klanten** — 🔴 **gedateerd:** dit getal staat niet op de huidige productpagina; het is traceerbaar naar handelsartikelen van rond 2007–2010 (plandeafacere.ro: *"Portofoliul TotalSoft numara peste 600 de clienti Primavera, peste 5000 de specialisti scolarizati si certificati international"*). Ter kalibratie: marketwatch.ro meldt dat TotalSoft na twaalf jaar exclusiviteit **491 klanten en >85% marktaandeel** had.
- **>5.000 internationaal gecertificeerde PM-specialisten opgeleid** — 🔴 **gedateerd:** dezelfde claim staat woordelijk in een artikel van [finantare.ro van 5 mei 2011](https://www.finantare.ro/totalsoft-intra-pe-piata-de-retail.html). Het is dus een **cumulatief cijfer van ~15 jaar geleden**. De kruiscontrole in §3.2 (die uitging van "cumulatief over ~20 jaar, 20–35% nog actief") blijft daarmee geldig en is zelfs eerder conservatief dan optimistisch.
- Referentieklanten: **Hidroelectrica** (14 filialen), **OMV-Petrom**, **Rompetrol**, **Euroconstruct** ("una dintre cele mai importante firme de construcții generale din România"), **Sisteme HVAC**, **Avrig 35**
- Tweede kanaal: [Smart Project Solutions](https://smartprojectsolutions.ro/oracle-primavera/) ⚠️
- Integratie: **Charisma Business Suite** is *"integrat nativ cu Charisma ERP și Primavera"* en claimt een significant marktaandeel in de Roemeense civiele en industriële bouw ⚠️ ([charisma.ro](https://www.charisma.ro/sisteme-erp/constructii-si-proiectare))

**Polen.** Partner: **DAT Computer Concepts** (Warschau, ul. Jeździecka 21F) ✅ ([datcc.pl](https://datcc.pl/rozwiazania/oracle-primavera-p6/)). Portfolio: P6 EPPM, Oracle Primavera Cloud (OPC), Primavera Unifier, Primavera Risk Analysis, plus integraties met **CostOS**, **Trimble TILOS** en Autodesk; diensten omvatten training, implementatie, consultancy, OCI-migraties en BIM-integratie (2D→3D, 4D/5D, clashdetectie). Ondersteunt P6 EPPM 24.12. Doelsectoren: bouw, energie, industrie, financiën, luchtvaart, IT, publieke sector. Oracle voert een Poolstalige P6-pagina ✅ ([oracle.com/pl](https://www.oracle.com/pl/construction-engineering/primavera-p6/)).

**Tsjechië.** Partner: **Solutia s.r.o.**, met expertise-erkenning voor *"Oracle Primavera P6 EPPM in EE"* ⚠️ ([solutia.cz](https://www.solutia.cz/co-delame/oracle-reseni/)). Positionering: *"Řízení velkých projektů bez zpoždění a navýšení rozpočtu."* Ook in Tsjechische ingenieurskringen genoemd als *"jeden z nejsofistikovanějších univerzálních programů"* ⚠️ ([ČKAIT](https://www.ckait.cz)).

**Slowakije / Hongarije.** Geen expliciete lokale Primavera-partner gevonden ❌. Waarschijnlijk bediend vanuit Tsjechië resp. Oostenrijk/regionale hubs.

**Sterk:** enterprise-schaalbaarheid, multi-project portfolio, resource- en kostenintegratie, risicoanalyse, XER als de-facto uitwisselingsstandaard bij internationale FIDIC-contracten.
**Zwak:** prijs, complexiteit, lange implementatietrajecten, sterke afhankelijkheid van consultants — precies wat het buiten bereik houdt van de middenmarkt die het grootste deel van de CEE-bouw uitmaakt.

### 4.3 Laag 3 — Lokale pakketten: calculatie-eerst, planning-tweede

Dit is de kern van het lokale ecosysteem. **Let op de structurele eigenschap:** deze pakketten zijn gebouwd rond nationale kostennormcatalogi. Planning is een aanvullende module.

#### Polen

| Pakket | Leverancier | Wat het is | Bron |
|---|---|---|---|
| **Norma EXPERT / Norma STANDARD / Norma PRO** | Athenasoft | Historisch dominant Pools calculatiepakket. Norma PRO was ~20 jaar de standaard onder kosztorysanci en is inmiddels **uitgefaseerd** ten gunste van Norma EXPERT (met BIM-ondersteuning). Bevat XML-integratie en de **"nakładka ATH Project"** waarmee de calculatie naar **MS Project** wordt doorgezet — dus zelfs de Poolse marktleider besteedt de planning uit aan Microsoft. | ⚠️ [programy-do-kosztorysowania.pl](https://www.programy-do-kosztorysowania.pl), [do-kosztorysowania.pl](https://www.do-kosztorysowania.pl), [kosztorysowe.komako.pl](https://kosztorysowe.komako.pl/athenasoft.html) |
| **Zuzia → BIMestiMate** | Datacomp | Geïntegreerd *"przedmiarowanie, kosztorysowanie i harmonogramowanie"* (opmeten, calculeren, plannen) in 3D/BIM. Eigen **harmonogram**-weergaven voor "Zadania" en "Plan". Voor bouw, renovatie, installatie, weg-, spoor- en telecomwerken. Herbenoemd van Zuzia naar BIMestiMate. | ✅ [zuzia.com.pl/harmonogram](https://www.zuzia.com.pl/harmonogram/), ⚠️ [abonament.datacomp.com.pl](https://abonament.datacomp.com.pl) |
| **Rodos** | Eurocenbud | Calculatiepakket; onderscheiden door de Vereniging van Bouwcalculatoren en een gouden medaille van de Internationale Beurs van Poznań. Modules + abonnement, jaarlijks of per kwartaal. | ⚠️ [kosztorysuj.pl](https://kosztorysuj.pl) |
| **SeKo PRIX** | Sekocenbud | Calculaties via gedetailleerde, vereenvoudigde of gemengde methode; ingebouwde catalogusdatabase en prijslijstimport. | ⚠️ [sekocenbud.pl](https://www.sekocenbud.pl) |
| **WINBUD Kosztorys** | Chandney Software | Student-/professionele versies; **gratis academische licenties (356 dagen)** — een slimme onderwijs-instapstrategie. | ⚠️ [winbudkosztorys.pl](https://winbudkosztorys.pl) |
| **Kalkulex, KOMA 5, EDBUD** | diverse | Kleinere calculatiepakketten in dezelfde categorie. | ⚠️ [programkosztorysowy.pl](https://programkosztorysowy.pl) |

**En dan de twee échte Poolse planningstools:**

| Pakket | Leverancier | Wat het is | Bron |
|---|---|---|---|
| **PLANISTA / Planista Max** | PMC Piotr Chyliński (planista.com.pl); ook via Unilogic, Astino, oprogramowanie.sklep.pl | *"Sporządzanie harmonogramów robót dla różnych branż: budowlanych, montażowych, instalacyjnych."* **PERT- en Gantt-analyse, bepaling van projectduur en kritiek pad.** Planista Max voegt modules toe: Karty Pracy (BZ) en formulieren PZ, RW, ZW. Koppelt arbeids- en materiaaltoewijzing aan de begroting uit de calculatie. Ontworpen voor snelle planning en eenvoudige aanpassing tijdens uitvoering. Bestelling **uitsluitend telefonisch/e-mail** (600-335-067, planista@planista.com.pl) — geen online prijzen. | ⚠️ [planista.com.pl](https://planista.com.pl), [unilogic.pl](https://www.unilogic.pl) |
| **PROGPOL** | Progpol (onderdeel van het TelkomBud-systeem, uitvoeringsmodule) | Bouwharmonogrammen met **vrije structuur afhankelijk van complexiteit**; ondersteunt subtaken, categorieën en projectfasen; registreert voortgang **in procenten én in omvang** per fase; resultaten als Gantt-diagram. | ⚠️ [progpol.com](https://progpol.com) |

#### Tsjechië

| Pakket | Leverancier | Wat het is | Bron |
|---|---|---|---|
| **CONTEC** ⭐ | Auteur: prof. ing. **Čeněk Jarský, DrSc., FEng.**; distributie sinds 1-12-2017 via Housing for You CZ a.s.; verkoop via **NETDATA SOFTWARE** | **Het serieuze inheemse bouwplanningssysteem van de regio.** *"Automatizovaný systém pro přípravu a řízení realizace staveb."* Versie 12.12. Modules: **síťové grafy** (netwerkdiagrammen per gebouwtype), **harmonogramy** (tijdschema's), **cyklogramy** (tijd-weg-/tijd-ruimtediagrammen), **resource-balansgrafieken** (materiaal- en arbeidsbehoefte over tijd), operationele planning en voortgangsbewaking, **kwaliteitscontroleplanning met inspectieplanning**, financiële planning en cashflow, projectcontrolling. Gevoed door de **APSTA-normdatabase**: normatieve procesdata op activiteitniveau incl. tijdsbehoefte, ploeggrootte, arbeidsproductiviteitsnormen en eenheidsprijzen. Koppeling naar boekhoudsystemen. Halfjaarlijkse updates. Onderscheidingen: eervolle vermelding For Arch 2000, Innovatie van het Jaar 2004. NETDATA claimt 30 jaar ervaring, honderden gebruikers, duizenden projecten. | ✅ [contec.cz](https://www.contec.cz), ✅ [netdatasoft.cz](https://netdatasoft.cz/software-pro-casovou-pripravu/) |
| **KROS 4** | KROS a.s. | Calculatie + management met **ÚRS**-prijssysteem; begrotingen, calculaties **én harmonogrammen**. Modules: Rozpočet, Kalkulace, Čerpání + datafiles. | ⚠️ [kros.cz](https://www.kros.cz), [app.urs.cz](https://app.urs.cz) |
| **BUILDpower S** | RTS a.s. | Calculatiesoftware voor aannemers en calculators; ondersteunt *"vytvoření časového plánu"*; aparte "projektant"-editie voor architectenbureaus. Het programma "Ceník stavebních prací" bevat een module **"Harmonogram stavby"**. | ⚠️ [rts.cz](https://www.rts.cz) |
| **euroCALC** | Callida | Calculatiepakket, derde speler in het Tsjechische calculatielandschap. | ⚠️ |
| **RONET** | via NETDATA | Begrotingssysteem voor bouwwerken, gepositioneerd als *"Dostupný pro každého"* (betaalbaar voor iedereen). | ⚠️ [netdatasoft.cz](https://netdatasoft.cz) |

#### Slowakije

| Pakket | Leverancier | Wat het is | Bron |
|---|---|---|---|
| **CENKROS 4** | KROS a.s. (Žilina) | Slowaakse marktleider in bouwcalculatie. Maakt begrotingen *"v členení podľa štruktúry **TSKP**"*. Doelgroepen expliciet gesegmenteerd: **stavebná firma** (desktop), **investor a verejná správa** (desktop), **rozpočtár a projektant** (online + desktop), **malá stavebná firma** (online). Versie 2025/I bracht verbeteringen in btw-berekening, meertraps goedkeuringsworkflows en prijsdatabases. Ondersteunt kostenplanning **en projectplanning** door de bouwfasen heen. | ✅ [kros.sk/cenkros](https://www.kros.sk/cenkros/cennik/) |

#### Hongarije

| Pakket | Leverancier | Wat het is | Bron |
|---|---|---|---|
| **TERC V.I.P.** (GOLD / SILVER / BRONZ) + **TERC-ETALON** (online) | TERC Kft. | *"Offline építőipari költségvetés-készítő program"* — het Hongaarse standaard-calculatiepakket. Drie kennisniveaus. GOLD geeft volledige toegang tot itemcomponenten, bewerken van bedrijfsresourceprijzen, eigen resourcedatabase, uurtarieven per beroep, eigen prijslijsten. **Hardwaresleutel**-licentiemodel: aankoop levert een dongle; na afloop van het 365-daagse abonnement worden updates online rechtstreeks naar de sleutel geschreven. Gebruikers: zonne-installateurs, elektro-aannemers, ontwerpbureaus, vastgoedbeheerders, bouwbedrijven. | ✅ [terc.hu](https://www.terc.hu/oldal/terc-vip-arlista) |
| **Innobau** | Innobau | *"Magyarország legmodernebb felhőalapú építőipari projektmenedzsment szoftvere"* — cloud, van planning tot financiële administratie. | ⚠️ [innobau.hu](https://innobau.hu) |
| **LILBUILD** | LILBUILD | Digitaal projectmanagement voor bouwbedrijven; ontwikkeling gestart in 2015. | ⚠️ [lilbuild.hu](https://lilbuild.hu) |
| **myPlan.cloud** | myPlan | Bouwprojectmanagementplatform. | ⚠️ [myplan.cloud/hu](https://myplan.cloud/hu) |
| **Eniac** | Eniac | Geïntegreerde cloudoplossing: budgettering, offertes, contracten, facturatie. | ⚠️ [eniac.hu](https://eniac.hu/projektkezeles/) |
| **PROCON-X** | PROCON-X | Projectmanagement, communicatie, klantevaluatie voor bouwworkflows. | ⚠️ [procon-x.hu](https://procon-x.hu) |

> **Observatie Hongarije:** het is het enige land in de vijf waar een cluster van *moderne cloud-bouwprojectmanagement*-startups is ontstaan (Innobau, LILBUILD, myPlan, Eniac, PROCON-X). Geen van hen positioneert zich echter op CPM/kritiek-padplanning — het zijn samenwerkings-, documentatie- en administratieplatformen. **Het CPM-gat in Hongarije is dus dubbel open.**

#### Roemenië

| Pakket | Leverancier | Wat het is | Bron |
|---|---|---|---|
| **WindevRO Professional 7.3** | Softeh (Boekarest) | Calculatie ("deviz") + projectmanagement. Modules: **ProdReal** (projectmanagement), **EMMA**, materiaalprijzendatabase, calculatienormen, wetgevingsupdates (aangepast op Ordonanță 1116, november 2023). Werkt offline en op bedrijfsnetwerken. **Geen expliciete Gantt-/planningsmodule aangetroffen.** | ✅ [windev.ro](https://www.windev.ro) |
| **WinDoc Deviz** | deviz.ro | Onbeperkte licentie voor Windows 10/11/12; *"Nu necesită conexiune la internet"* — werkt offline, ook op bedrijfsnetwerk. | ⚠️ [deviz.ro](https://www.deviz.ro) |
| **Deviz Professional 10** | InterSOFT | Modulair, voor consultants, ontwerpers en projectmanagers. | ⚠️ [devize.ro](https://devize.ro) |
| **eDevize / eDevize Plus** | eDevize | Conform **HG 907/2016**; beheer van uitrustingsdatabases en haalbaarheidsstudies. | ⚠️ [edevize.ro](https://edevize.ro) |
| **Deviz 360 / Deviz AR** | Deviz 360 | Multi-module; opmeten vanaf tekeningen of veldopname; offertes en inkoop richting **SEAP** en **MTender** (de aanbestedingsplatformen). | ⚠️ |
| **Deviz Digital / Deviz Instalator** | diverse | Lichte SaaS-varianten, freemium-instap. | ⚠️ |
| **Charisma Business Suite** | TotalSoft | ERP voor de bouw, *"integrat nativ cu Charisma ERP și Primavera"*; claimt significant marktaandeel in Roemeense civiele en industriële bouw. | ⚠️ [charisma.ro](https://www.charisma.ro/sisteme-erp/constructii-si-proiectare) |

### 4.4 Laag 4 — Internationale nichespelers: opvallend afwezig

Dit is een belangrijk **negatief** resultaat, en het is met meerdere zoekopdrachten bevestigd:

| Pakket | Aanwezigheid CEE-5 | Bevinding |
|---|---|---|
| **Elecosoft Asta Powerproject** | **Geen kanaal, wél gebruik** 🔴 **GECORRIGEERD** | De distributie-bevinding blijft staan: geen reseller of distributeur gevonden in PL/CZ/SK/HU/RO; de dichtstbijzijnde Powerproject-partner is **Prime PMO** (Ankara) met kantoren in Turkije, Dubai en Tasjkent — dus TR/MENA/Centraal-Azië, **niet** de CEE-5 ✅ ([primepmo.com](https://primepmo.com/)). **Maar "vrijwel nihil aanwezigheid" was te sterk:** Elecosoft publiceert een eigen Poolse referentiecase over de **centrale verlenging van metrolijn 2 in Warschau** (~EUR 900 mln, consortium AGP Metro Polska), waar consortiumpartner **Gülermak** Asta Powerproject gebruikte voor het bouwschema, resources en voortgangsbewaking ✅ ([eleco.com/stories/gulermark-warsaw](https://eleco.com/stories/gulermark-warsaw/), [case study PDF](https://primepmo.com/case-studies/en/powerproject/Prime-PMO-Case-Study-Gulermak-Warsaw-Metro-Extension.pdf)). Het pakket is dus op ten minste één groot Pools infraproject in productie geweest. Ook genoemd als importformaat in PlanRadar CZ ⚠️. |
| **Trimble TILOS** | **Zeer beperkt, indirect** | Geen eigen distributeur. Wél in het portfolio van de Poolse Oracle-partner **DAT Computer Concepts** als integratie naast P6 ✅ ([datcc.pl](https://datcc.pl/rozwiazania/oracle-primavera-p6/)). De Poolse Trimble-distributeurs (Geotronics Polska, SITECH Poland, Impexgeo, Trimtech) verkopen uitsluitend meetapparatuur en machinebesturing — **geen TILOS** ⚠️. |
| **Bentley SYNCHRO** | **Niet aangetroffen** | Geen Poolse of regionale implementatiepartner gevonden ❌. |
| **ALICE Technologies** | **Niet aangetroffen** | ❌ |
| **nPlan** | **Niet aangetroffen** | ❌ |
| **Nodes & Links** | **Niet aangetroffen** | ❌ |
| **Spider Project** | **Marginaal** | Alleen de internationale productsite gevonden (drie-scenario-planning: optimistisch/waarschijnlijk/pessimistisch) ⚠️ [spiderproject.pro](https://www.spiderproject.pro/en/spider-project/). Geen CEE-reseller. Historisch Russische herkomst maakt het na 2022 commercieel problematisch in deze regio. |
| **Sciforma** | **Marginaal** | Overgenomen door **Planview** ⚠️ ([planview.com](https://www.planview.com/acquisitions/about-sciforma/)). Geen CEE-bouwaanwezigheid gevonden. |
| **Safran, Deltek Open Plan, Phoenix, InEight, Hexagon EcoSys, RIB Candy/iTWO** | **Niet aangetroffen in de bouw-CEE** | ❌ Geen resellers, geen lokale referenties. RIB (iTWO) heeft via de RIB/Schneider-groep wel Europese aanwezigheid, maar niet als bouwplanner in deze vijf landen aangetroffen. |

> **Dit is strategisch het belangrijkste resultaat van §4.** Het middensegment tussen "MS Project" en "Primavera P6" is in Centraal-Europa **structureel leeg**. In het VK vult Asta Powerproject dat gat, in Duitstalig Europa TILOS/iTWO. In de CEE-5 vult niemand het. Dat is precies de positie waarin een bouwspecifieke Gantt/CPM-tool met sterke MPP/XER-uitwisseling kan landen.

### 4.5 Laag 5 — Algemene PM-tools

**monday.com, Asana en ClickUp** domineren de Poolse PM-tool-rankings; één bron stelt dat deze tools *"al jaren de PM-platformranglijsten domineren"* ⚠️. Wrike wordt aanbevolen voor enterprise-schaal, Jira voor IT/Agile, Trello voor eenvoudig kanban, Smartsheet en FlexiProject (een Poolse speler) worden ook genoemd. Trend voor 2025: *"all-in-one platformen en automatisering"*.
Bronnen ⚠️: [procesywbiznesie.pl](https://procesywbiznesie.pl), [rankingo.pl](https://rankingo.pl), [czaslidera.pl](https://czaslidera.pl), [mikolajek.eu](https://mikolajek.eu). Geen marktaandeelpercentages voor Polen gevonden ❌.

**Relevantie voor de bouw:** beperkt maar niet nul. Deze tools worden bij ontwikkelaars, ingenieursbureaus en bouwgerelateerde dienstverleners gebruikt voor projectcoördinatie — maar niet voor CPM-planning van uitvoering. Ze concurreren dus om budget en aandacht, niet om functionaliteit.

**PlanRadar** (Oostenrijks) is opvallend goed gelokaliseerd voor deze regio: eigen Poolse, Tsjechische, Hongaarse en Roemeense sites, met artikelen over Gantt-diagrammen in de bouw ✅ ([planradar.com/ro](https://www.planradar.com/ro/diagrame-gantt-pentru-proiecte-de-constructii/), [planradar.com/hu](https://www.planradar.com/hu/ugyfelek/epiteszeti-projektmenedzsment-szoftver/), [planradar.com/cs](https://www.planradar.com/cs)). PlanRadar importeert planningen uit **Primavera P6, Microsoft Project én Asta Powerproject** ⚠️ — een bevestiging dat dít de drie relevante uitwisselingsformaten zijn.

**Fieldwire by Hilti** wordt in Polen genoemd voor three-week rolling wave planning ⚠️; **GanttPRO** biedt een bouwprojecttijdlijnsjabloon ⚠️.

### 4.6 Laag 6 — Gratis en open source

| Pakket | Positie in de regio |
|---|---|
| **ProjectLibre** | Meest genoemde gratis MSP-alternatief. Wereldwijd **>8,2 miljoen keer** gedownload als MSP-vervanger, in gebruik op **1.700 universiteiten** ✅ ([projectlibre.com](https://www.projectlibre.com/projectlibre-desktop/)). Biedt Gantt, WBS, netwerkdiagrammen en earned value. De Poolse PM-expert Paweł Kawalec beschrijft het als *"kontynuacją aplikacji OpenProject"* met MSP-vergelijkbare interface ⚠️ ([kawalec.eu](https://kawalec.eu/project-management/programy-do-zarzadzania-projektami/)). |
| **GanttProject** | *"A free, open-source project scheduling and management application"* — Gantt en PERT, resources, voortgang ⚠️. |
| **OpenProject** | Genoemd, maar minder prominent in Poolstalige bronnen ⚠️. |

**Betekenis:** de gratis laag is reëel en wordt in de regio actief aanbevolen. Voor een commercieel product betekent dat: **de prijs moet gerechtvaardigd worden door bouwspecifieke functionaliteit en bestandsuitwisseling, niet door "het is een Gantt-tool".**

### 4.7 De grootste concurrent: Excel

Geen enkele bron in dit onderzoek leverde een hard percentage voor Excel-gebruik in de CEE-bouwplanning ❌ — maar het indirecte bewijs is consistent:

- De Poolse sector *"worstelt nog met lage adoptieniveaus van moderne IT-technologieën"* ⚠️ ([builderpolska.pl](https://builderpolska.pl/2025/01/15/cyfryzacja-branzy-budowlanej-ewolucja-zamiast-rewolucji/)).
- Poolse zoekresultaten voor bouwplanning leveren stelselmatig **Excel-sjablonen** op naast software ⚠️.
- Roemeense aanbestedingsdienstverleners verkopen *"modele complete de propunere tehnică și financiară inclusiv grafic Gantt"* — kant-en-klare Gantt-sjablonen om aan de ANAP-eis te voldoen ⚠️ ([e-Licitati.ro](https://e-licitati.ro)). Dat is per definitie geen CPM-planning; het is een compliance-artefact.
- De Poolse overheid publiceert eigen digitaliseringsrapporten (*"Cyfryzacja procesu budowlanego w Polsce"*, *"Cyfryzacja projektowania w sektorze budowlanym w Polsce"*) precies omdat de adoptie achterblijft ⚠️ ([gov.pl](https://www.gov.pl/attachment/6f1257e0-74d4-48c4-8e71-2b9570bff7c3), [gov.pl](https://www.gov.pl/attachment/e36d2e47-4454-4460-bd66-955e11c93d4b)).
- EY beschrijft digitale transformatie in de bouw als een **prioriteit die nog gerealiseerd moet worden** ⚠️ ([ey.com/pl_pl](https://www.ey.com/pl_pl/insights/digital-first/cyfryzacja-w-branzy-budowlanej-to-priorytet-ai-fy25)).

🔶 **SCHATTING:** in de CEE-5 wordt **50–70% van alle bouwplanningen** primair in Excel opgesteld en onderhouden, oplopend tot >85% bij bedrijven onder ~50 medewerkers. Onderbouwing: bovenstaande signalen plus het prijsverschil (§5.5) plus het feit dat de contractuele eis vaak alleen een *leesbaar Gantt-diagram* is, niet een gevalideerd CPM-netwerk.

---

## 5. Prijzen en licentiemodellen

### 5.1 Microsoft Project

| Product | Prijs | Markt | Bron | Code |
|---|---|---|---|---|
| Project Professional 2024 (perpetual) | **7.099,00 PLN** | Polen | [microsoft.com/pl-pl](https://www.microsoft.com/pl-pl/microsoft-365/project/compare-microsoft-project-management-software) | ✅ |
| Project Standard 2024 (perpetual) | **3.999,00 PLN** | Polen | idem | ✅ |
| Project Professional 2024 (perpetual) | **$1.129,99** | VS | [microsoft.com/en-us](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software) | ✅ |
| Project Standard 2024 (perpetual) | **$679,99** | VS | idem | ✅ |
| Project Plan 3 (abonnement) | vanaf **151,38 PLN/maand** | Polen | [ceneo.pl/140247159](https://www.ceneo.pl/140247159) | ⚠️ prijsvergelijker |
| Project Server Subscription Edition | op aanvraag via partner | alle | microsoft.com | ✅ |
| Project Plan 1 / Plan 5 | **niet publiek gevonden** | — | — | ❌ |

### 5.2 Oracle Primavera

| Product | Prijs | Bron | Code |
|---|---|---|---|
| Primavera P6 cloud | **$175 per gebruiker per maand** (= $2.100/jaar) | [contractorsandbuilders.com](https://contractorsandbuilders.com/pricing/oracle-primavera/) | ❓ |
| P6 perpetual licentie | **$3.500 – $7.000** per licentie | [ITQlick](https://www.itqlick.com/oracle-primavera/pricing) | ❓ |
| P6, totale jaarkosten per gebruiker | $3.000 – $25.000 (afhankelijk van modules) | [vendorbenchmark.com](https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing) | ❓ zeer brede range, waarschijnlijk incl. modules en diensten |
| **Typische korting** | **30–50%** | vendorbenchmark | ❓ |
| Primavera Progress Cloud Service | $144 per gebruiker per **jaar** (= $12/mnd) | FindPM | ❓ |
| Basispakket-voorbeeld | $7.800/jaar voor 5 gebruikers (= $130/gebruiker/jaar) | via zoekresultaat | ❓ |

> **Kanttekening:** Oracle publiceert geen standaardprijzen. De officiële CEGBU service-descriptions-PDF ([oracle.com](https://www.oracle.com/a/ocom/docs/industries/construction-engineering/cegbu-service-descriptions.pdf)) was technisch niet uitleesbaar ❌. Alle P6-cijfers hierboven komen uit aggregators en zijn **indicatief**. De onderlinge inconsistentie ($144/jaar vs. $2.100/jaar) is zelf informatief: Oracle prijst per module, en "Primavera" dekt een productfamilie, geen product.

### 5.3 Overige internationale pakketten

| Product | Prijs | Bron | Code |
|---|---|---|---|
| Asta Powerproject, single-user | **£880 per jaar** | [softwarefinder.com](https://softwarefinder.com/project-management-software/powerproject) | ❓ |
| Asta Powerproject, sticker price | **$2.000 per gebruiker per jaar** | [ITQlick](https://www.itqlick.com/asta-powerproject/pricing) | ❓ |
| ProjectLibre / GanttProject / OpenProject | **gratis** (open source) | [projectlibre.com](https://www.projectlibre.com/projectlibre-desktop/) | ✅ |

### 5.4 Lokale pakketten — de echte prijstabel

#### Polen — Athenasoft (Norma-familie), prijslijst via reseller Unilogic ✅

| Product | Prijs (PLN, **netto**) | Type |
|---|---|---|
| **Norma EXPERT**, eerste werkplek | **6.390** | perpetual |
| Norma EXPERT, extra werkplek | 5.590 | perpetual |
| **Norma EXPERT 365**, basis (Podstawowy + BzG) | **2.590 /jaar** | abonnement |
| Norma EXPERT 365, compleet (Kompletny + BzG + Intercenbud) | 2.990 /jaar | abonnement |
| **Norma EXPERT 365, Profesjonalny** | **3.790 /jaar** | abonnement — 🔴 **ontbrak in de eerste versie; bij verificatie toegevoegd** |
| **Norma STANDARD**, één werkplek | **3.390** | perpetual |
| Norma STANDARD 365 | 1.590 /jaar | abonnement |
| ~~Overstap vanaf Norma PRO / Standard 4: 1.990~~ | zie hieronder | 🔴 **misleidend — gecorrigeerd** |
| **Miara PRO** | 2.190 | perpetual |
| Miara PRO 365 | 890 /jaar | abonnement |
| **Intercenbud** (online prijzendatabase) | 1.190 /jaar | abonnement |
| CAD Rysunek | 790 | module |
| AthBIM | 490 /jaar | module |

Bron: [unilogic.pl prijslijst](https://www.unilogic.pl/pliki/cenniki/cenniknorma.htm) ✅ (opnieuw opgehaald bij verificatie; alle bovenstaande bedragen bevestigd). Alle bedragen **netto**, exclusief 23% btw.

🔴 **Correctie op de overstapprijzen.** De eerste versie noemde één regel "Overstap vanaf Norma PRO / Standard 4 — 1.990 PLN". De prijslijst kent daar vier verschillende regels, en 1.990 is **niet** de prijs om op Norma EXPERT over te stappen:

| Overstap | Prijs (PLN netto) |
|---|---|
| Norma PRO → **Norma STANDARD** ("50% taniej") | **1.990** |
| Norma STANDARD 4 of Norma PRO → Norma STANDARD, één werkplek | 1.990 |
| Norma PRO → **Norma EXPERT** ("50% taniej") | **2.990** |
| Norma PRO → Norma EXPERT incl. aktualizacja + jaar Intercenbud | 3.990 |
| Norma STANDARD (met actueel BzG-pakket) → Norma EXPERT | 2.390 |

De relevante migratieprijs voor de installed base die naar het huidige vlaggenschip gaat is dus **2.990 PLN netto**, 50% hoger dan gerapporteerd.

✅ **Bij verificatie toegevoegd — uitfaseringsdatum Norma PRO.** Het rapport meldde dat Norma PRO "inmiddels is uitgefaseerd" zonder datum. Athenasoft heeft Norma PRO **per 1 januari 2023 uit de verkoop genomen** en de ontwikkeling gestaakt; bestaande gebruikers worden naar Norma EXPERT gestuurd ⚠️ (meerdere Poolse resellers, o.a. programy-do-kosztorysowania.pl). Dat maakt de gedwongen migratie een lopend, niet een historisch feit — relevant voor timing van een alternatief aanbod.

> **Reken door:** Norma EXPERT eerste werkplek 6.390 PLN netto = **7.860 PLN bruto** — dus duurder dan MS Project Professional 2024 (7.099 PLN bruto). De Poolse calculator betaalt méér voor zijn calculatiepakket dan voor Microsoft Project. Dat zegt iets over de betalingsbereidheid: **die is er wel degelijk, mits de software de nationale normcatalogi bedient.**

#### Polen — Datacomp (Zuzia / BIMestiMate)

| Product | Prijs | Bron | Code |
|---|---|---|---|
| Versie-upgrade (voorbeeld) | **1.353,00 PLN incl. 23% btw** | via resellers (Remiz, SAMAX, TIM) | ⚠️ |
| Volledige prijslijst | niet publiek uitleesbaar gekregen | [zuzia.com.pl/cennik](https://www.zuzia.com.pl/program-do-kosztorysowania/cennik/) | ❌ |

#### Polen — PLANISTA, PROGPOL

**Geen gepubliceerde prijzen.** Bestelling telefonisch of per e-mail ⚠️. Eén bron vermeldt dat een klant bij bundelaankoop *"ponad 1000 zł netto"* bespaart (System Athena-bundel) ⚠️. 🔶 **SCHATTING** op basis van positionering en de Poolse markt: **1.500–4.000 PLN netto per perpetual licentie**; deze categorie prijst structureel onder de calculatiepakketten.

#### Tsjechië

| Product | Prijs | Bron | Code |
|---|---|---|---|
| **KROS 4 Pro** (compleet: Rozpočet + Kalkulace + Čerpání + datafiles, tot 7 werkcatalogi + volledige materiaalprijzen) | **vanaf 1.050 CZK per maand** (≈ EUR 43/mnd ≈ EUR 515/jaar) | overheidscontract op [smlouvy.gov.cz](https://smlouvy.gov.cz) | ✅ **primaire bron — een gepubliceerd overheidscontract** |
| **RONET** (begrotingssysteem) | **8.000 CZK** voor onbeperkte installatie | via NETDATA | ⚠️ |
| **CONTEC** | **niet gepubliceerd** — offerte op aanvraag | [contec.cz](https://www.contec.cz) | ❌ |
| **BUILDpower S** (RTS) | **niet gepubliceerd** — e-shop/offerte | [rts.cz](https://www.rts.cz) | ❌ |

#### Slowakije

| Product | Prijs | Bron | Code |
|---|---|---|---|
| **CENKROS 4** | **niet gepubliceerd.** De prijspagina toont uitsluitend "Prejsť do košíka"-knoppen; prijs pas zichtbaar in de winkelwagen. Verkoopcontact: +421 905 315 591 (west/midden), 0902 908 004 (oost), obchod.stavebneriesenie@kros.sk | [kros.sk/cenkros/cennik](https://www.kros.sk/cenkros/cennik/) | ❌ (bewust ondoorzichtig) |
| Archief-prijslijst "Stavebné riešenia" | geldig t/m 30-11-2025; PDF technisch niet uitleesbaar | [ftpkros.sk](https://ftpkros.sk/files/documents/marketing/cenniky/Cennik_archiv_STAVEBNE_RIESENIA.pdf) | ❌ |

> 🔶 **SCHATTING CENKROS 4:** naar analogie van KROS 4 in Tsjechië (1.050 CZK/mnd ≈ EUR 43) en gecorrigeerd voor het hogere Slowaakse prijspeil in EUR: **EUR 40–70 per maand, of EUR 500–850 per jaar** per werkplek.

#### Hongarije — TERC V.I.P., officiële prijslijst geldig vanaf 05-01-2026 ✅

| Product | Prijs (HUF, **+ áfa/btw**) |
|---|---|
| **SILVER365** (jaarabonnement), eerste licentie | **175.000 /jaar** (~~≈ EUR 449~~ → **EUR 484**) |
| SILVER365, extra licentie | 157.500 /jaar (EUR 435) |
| **GOLD365** (jaarabonnement), eerste licentie | **239.900 /jaar** (~~≈ EUR 615~~ → **EUR 663**) |
| GOLD365, extra licentie | 215.910 /jaar |
| *Legacy, niet meer nieuw verkrijgbaar:* BRONZ TIME | 94.900 |
| *Legacy:* BRONZ FREE | 129.400 |
| *Legacy:* SILVER | 171.700 |
| *Legacy:* GOLD | 344.200 |
| **Halfjaarlijkse update**, één licentie | **70.000** |
| Halfjaarlijkse update, extra licentie | 59.500 |
| **Jaarlijkse vooruitbetaling update** (korting) | **119.000** (i.p.v. 140.000 — **15% korting**) |
| Jaarlijkse vooruitbetaling, extra licentie | 101.200 |
| Vergelijkingsmodule (Összehasonlító modul) | 55.000 |
| Gebruikershandleiding | 7.000 |
| Vervanging hardwaresleutel | 17.250 |
| **Persoonlijke support** | **20.000 per begonnen uur** (~~≈ EUR 51/uur~~ → **EUR 55/uur**) |

Bron: [terc.hu/oldal/terc-vip-arlista](https://www.terc.hu/oldal/terc-vip-arlista) ✅

🔴 **EUR-omrekeningen gecorrigeerd.** De HUF-bedragen zelf zijn niet betwist, maar het rapport rekende met 390 HUF/EUR terwijl de ECB-referentiekoers op 24-07-2026 **361,88** is. Alle TERC-prijzen in euro's waren daardoor **~7,8% te laag** weergegeven. TERC is in EUR dus **duurder dan gedacht** — een GOLD365-abonnement kost EUR 663/jaar, tegen EUR 515/jaar voor KROS 4 Pro in Tsjechië. Dat versterkt de conclusie in §5.4 dat Hongarije en Polen de markten zijn met de hoogste betalingsbereidheid.

*(De KSH-omrekening van HUF 7.699 mrd naar ≈ EUR 19,7 mrd in §2.1 blijft wél verdedigbaar: dat is een cijfer over 2024 en hoort tegen de gemiddelde koers van 2024 (~395 HUF/EUR) te worden omgerekend, niet tegen de dagkoers van vandaag.)*

> **Let op het TERC-model:** het is een **update-abonnementsmodel op een hardwaresleutel**. De halfjaarlijkse update (70.000 HUF) is in feite verplicht om de normdatabase actueel te houden — dat is de echte terugkerende omzet. Dit is het typische CEE-verdienmodel: *de normdata, niet de software, is het product.*

#### Roemenië

| Product | Prijs | Bron | Code |
|---|---|---|---|
| **WindevRO 7.3 Professional**, onbeperkte licentie | **EUR 600 + btw** | [windev.ro](https://www.windev.ro) | ✅ |
| WindevRO, twee Professional-licenties (2e met 50% korting) | **EUR 922** totaal | idem | ✅ |
| WindevRO, 1-jaars on-premise licentie | **EUR 300** | idem | ✅ |
| **eDevize Plus**, 12-maands abonnement | **1.465 RON (EUR 289,15)** | [edevize.ro](https://edevize.ro) | ⚠️ |
| **Deviz Digital** | vanaf **EUR 0,79/dag** (≈ EUR 23,70/mnd ≈ EUR 285/jaar) | | ⚠️ |
| **Deviz Instalator** | gratis tier; betaald vanaf **39 RON/maand** (≈ EUR 8) | | ⚠️ |
| **Deviz 360**, online cursus incl. platformtoegang (10 weken) | **600 lei excl. btw** | | ⚠️ |
| WinDoc Deviz, Deviz Professional 10 (InterSOFT) | niet gepubliceerd | | ❌ |

> **Opvallend:** Roemeense pakketten zijn **veruit het goedkoopst in de regio** (EUR 285–600 perpetual/jaar) — een factor 3–10 onder de Poolse en Hongaarse equivalenten. Dat weerspiegelt zowel lagere koopkracht als scherpere concurrentie in een gefragmenteerde markt (minstens 7 aanbieders gevonden). Voor prijszetting: **Roemenië is de moeilijkste markt om marge te halen, Polen en Hongarije de makkelijkste.**

### 5.5 Valuta- en koopkrachteffect — de kernanalyse

Dit is waar de commerciële kans zit. Vergelijk hetzelfde product over markten:

🔴 **Deze tabel is bij verificatie herrekend.** De prijzen zelf zijn bevestigd (beide Microsoft-pagina's opnieuw opgehaald), maar er werd met een **verkeerde dollarkoers (3,65 PLN/USD)** gerekend. De werkelijke NBP-middenkoers op 24-07-2026 is **3,8000 PLN/USD**.

| Product | Polen | VS | Verschil (**gecorrigeerd**) | Verschil (zoals eerder beweerd) |
|---|---|---|---|---|
| MS Project Professional 2024 | **7.099 PLN** bruto = **5.771,54 PLN netto** (÷1,23) = **$1.518,83** | **$1.129,99** | Polen betaalt **+34,4%** | ~~+40%~~ |
| MS Project Standard 2024 | 3.999 PLN bruto = 3.251,22 PLN netto = **$855,58** | **$679,99** | Polen betaalt **+25,8%** | ~~+31%~~ |

*(Omrekening bij 3,8000 PLN/USD, [NBP tabela A nr 142/A/NBP/2026](https://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json) ✅. Microsoft-prijzen in PL worden inclusief btw getoond; de netto-vergelijking is de eerlijke. In euro's: EUR 1.337 netto voor Professional.)*

**De richting van de conclusie klopt, de omvang was met ~6 procentpunt overdreven.**

**Waarom dit ertoe doet:**

- Het gemiddelde Tsjechische bouwloon is >43.000 CZK/maand (≈ **EUR 1.781** bruto, herrekend bij 24,149 CZK/EUR) ⚠️. Een P6-seat van $2.100/jaar = **EUR 1.846** (herrekend bij 1,1377 USD/EUR; het rapport noemde EUR 1.930 door de foute dollarkoers) is dus **net iets meer dan één maandsalaris** — de claim houdt stand, maar marginaal, niet ruimschoots.
- 🔴 **MS Project Professional als "ruwweg een maandsalaris" is te dik aangezet.** GUS meldt voor juni 2026 een gemiddeld brutoloon in de ondernemingssector van **9.401,58 PLN** ⚠️ ([GUS via TVN24](https://tvn24.pl/biznes/dla-pracownika/dane-gus-przecietne-zarobki-i-zatrudnienie-w-czerwcu-2026-roku-st9149744)). De netto licentieprijs van 5.771,54 PLN is daarmee **0,61 maandsalaris**, de brutoprijs 0,76. Voor een planningsengineer — een bovengemiddeld betaald ingenieursberoep — is de verhouding nóg gunstiger. Reken op **circa een halve tot driekwart maandsalaris**, niet een heel maandsalaris.
- In de VS is dezelfde P6-seat ~2 weken salaris van een scheduler ⚠️ (niet geverifieerd).

🔶 **CONCLUSIE (schatting):** de effectieve prijs/koopkrachtratio van planningssoftware ligt in de CEE-5 **2,5 tot 4× hoger** dan in West-Europa of de VS. ⚠️ **Let op: deze multiplicator is nergens in het rapport afgeleid** — er is geen West-Europese vergelijkingsberekening gemaakt. De onderliggende observaties (nominaal gelijke of hogere prijzen bij ~2–3× lagere lonen) ondersteunen wél een factor in die ordegrootte, maar het getal "2,5–4×" is een inschatting, geen resultaat. De beleidsconclusie — prijs is de scherpste hefboom — blijft overeind.

### 5.6 Kosten van training en consultancy

| Aanbieder | Cursus | Prijs | Bron | Code |
|---|---|---|---|---|
| **Altkom Akademia** (PL) | MS Project, 3 dagen | **1.900 → 1.500 PLN netto** (actieprijs) + 23% btw = **1.845 PLN bruto** | [altkomakademia.pl](https://www.altkomakademia.pl/product-category/szkolenia-biznesowe/zarzadzanie-projektami-i-procesami/narzedzia-w-projektach/ms-project/) | ✅ |
| **Compendium** (PL) | MS Project, 3 dagen, hybride | **vanaf 2.500 PLN** | [compendium.pl](https://www.compendium.pl) | ⚠️ |
| **COGNITY** (PL) | Primavera P6, 16 uur, remote live | **3.850 PLN netto / 4.735,50 PLN bruto** | [uslugirozwojowe.parp.gov.pl](https://uslugirozwojowe.parp.gov.pl) — **PARP-register, dus subsidiabel** | ✅ |
| **TERC** (HU) | Persoonlijke support | **20.000 HUF per begonnen uur** (≈ EUR 51) | [terc.hu](https://www.terc.hu/oldal/terc-vip-arlista) | ✅ |
| **DAT Computer Concepts** (PL) | P6-implementatie, training, consultancy, OCI-migratie, BIM 4D/5D | niet gepubliceerd | [datcc.pl](https://datcc.pl/rozwiazania/oracle-primavera-p6/) | ❌ |
| **TotalSoft** (RO) | Primavera-training + certificering | niet gepubliceerd; >5.000 opgeleiden | [totalsoft.ro](https://www.totalsoft.ro/primavera) | ⚠️ |
| **ecostarplan** (RO) | Primavera P6 planning & control | niet gepubliceerd | [ecostarplan.com](https://ecostarplan.com/ro/cursuri/planificarea-si-controlul-proiectelor-folosind-oracle-primavera-p6/) | ⚠️ |
| **europroiect academy** (RO) | Gantt-diagram in de bouw — uitvoeringsprogramma stap voor stap | niet gepubliceerd | [academy.europroiect.org](https://academy.europroiect.org/course/graficul-gantt-al-programului-de-executie-al-proiectului) | ⚠️ |

**Prijsverhouding training : licentie:**
- MS Project: cursus 1.500–2.500 PLN vs. licentie 5.772 PLN netto → **training ≈ 26–43% van de licentieprijs**.
- Primavera P6: cursus 3.850 PLN (≈ EUR 906) vs. seat ≈ EUR 1.500–1.900/jaar → **training ≈ 48–60% van één jaarseat**.

🔶 **SCHATTING implementatie-/consultancykosten P6:** een eerste enterprise-implementatie in de regio kost **EUR 15.000 – 80.000** aan diensten, afhankelijk van omvang en integraties. Onderbouwing: DAT en TotalSoft bieden beide volledige implementatie-, migratie- en BIM-integratietrajecten aan ✅; dit is standaard enterprise-consultancyprijsstelling voor de regio, waar dagtarieven ~30–50% onder West-Europees niveau liggen.

**Subsidie-aspect (belangrijk!):** de COGNITY P6-cursus staat in het **PARP-register voor ontwikkelingsdiensten** (uslugirozwojowe.parp.gov.pl) ✅. In Polen zijn zulke opleidingen via EU-fondsen (KFS, BUR) **tot 80% subsidiabel** voor MKB. Dit verlaagt de effectieve trainingskosten fors en verklaart de sterke opleidingscultuur (§6.5).

---

## 6. Lokale bijzonderheden

### 6.1 Polen — MS Project is contractueel voorgeschreven

**Aanbestedings- en contracteisen:**

- **FIDIC is de standaard.** *"Warunki kontraktowe FIDIC ... wykorzystywane są jako standardowe procedury realizacji projektów publicznych"* ⚠️. GDDKiA (Generalna Dyrekcja Dróg Krajowych i Autostrad) publiceert **Wzorcowe Dokumenty Kontraktowe** voor design-build en raamovereenkomsten ⚠️ ([gov.pl/web/gddkia](https://www.gov.pl/web/gddkia)).
- **Sub-clause 8.3 (Programme):** de aannemer moet binnen **28 dagen** na de Notice to Commence een gedetailleerd programma indienen; de Ingenieur heeft **21 dagen** om bezwaren te melden, anders geldt het programma ✅ **BEVESTIGD** — dit is de standaardtekst van FIDIC Red Book 1999 sub-clause 8.3, onafhankelijk teruggevonden.
- **De softwarespecificatie:** ~~contractdocumentatie eist "szczegółowy Program/Harmonogram ... opracowany w Microsoft Office Project"~~ 🔴 **NIET AANGETOOND — zie §1.1 en §4.1.** De verwijzing was een zoekopdracht-URL, niet een document; het citaat is niet reproduceerbaar. Dit mag **niet** als "de belangrijkste bevinding voor Polen" blijven staan. Als deze eis er commercieel toe doet, moet hij worden hardgemaakt met een concreet aanbestedingsdossier (ezamowienia.gov.pl of een GDDKiA-OPZ), niet met een zoekmachine.
- **Sub-clause 8.8** ~~koppelt contractuele boetes aan het niet halen van indieningstermijnen of het niet verwerken van commentaar van de Ingenieur~~ 🔴 **ONJUIST.** In het **FIDIC Red Book 1999** is de nummering: 8.6 *Rate of Progress*, 8.7 **Delay Damages**, 8.8 **Suspension of Work**, 8.9 *Consequences of Suspension* ✅. Sub-clause 8.8 gaat dus over **opschorting van het werk**, niet over boetes; en de boeteclausule (8.7) hangt aan het niet halen van de **opleveringstermijn**, niet aan het indienen van het programma. In de FIDIC-editie 2017 is 8.8 wél *Delay Damages*, maar ook daar gekoppeld aan te late oplevering. **Boetes op te late indiening van het Programma bestaan in Poolse contracten wel degelijk, maar staan in de Warunki Szczególne (Particular Conditions) van de opdrachtgever — niet in een FIDIC-standaardclausule.** Die nuance is commercieel relevant: het is opdrachtgeverbeleid, geen internationale norm.

> ❌ **Niet bevestigd gekregen:** of PKP PLK (spoor) of CUPT specifiek **Primavera/XER** eisen. Meerdere gerichte zoekopdrachten leverden niets op. Op basis van de FIDIC-praktijk bij grote EU-gefinancierde spoorprojecten is dat wél waarschijnlijk 🔶, maar het is **niet aangetoond**.

**Normen:** KNR / KNNR (Katalogi Nakładów Rzeczowych) als arbeidsnormcatalogi; Intercenbud en Sekocenbud als prijzendatabases. Elk calculatiepakket moet deze catalogi ondersteunen; zonder KNR-ondersteuning is een product in Polen onverkoopbaar in het calculatiesegment.

**Taal:** Poolse UI is een harde eis in de bouwuitvoering. Engels is gangbaar bij internationale aannemers en op planningsafdelingen, maar niet bij uitvoerders en calculators.

**Lokale spelers en resellers:**
- Oracle: **DAT Computer Concepts** (Warschau) ✅
- Athenasoft-distributie: Unilogic, kosztorysowe.pl, programy-kosztorysowe.pl, prokoszt.pl, komako.pl, do-kosztorysowania.pl — een **dicht reseller-netwerk**, wat aangeeft dat het kanaal in Polen belangrijk is ⚠️
- Datacomp-resellers: Remiz, SAMAX, TIM ⚠️
- Training: Altkom Akademia, Compendium, COGNITY, PMOPM, jurator.pl ⚠️

**Bijzonderheid:** de "**nakładka ATH Project**" van Athenasoft — een overlay die de Norma-calculatie exporteert naar MS Project ⚠️. Dit bevestigt dat de Poolse workflow standaard is: **calculeer in Norma → plan in MS Project.** Wie hier binnenkomt, moet in *die* keten passen.

### 6.2 Roemenië — Gantt is genormeerde praktijk in de aanbesteding (géén wettelijke plicht)

🔴 **KOPTEKST EN KERNBEWERING GECORRIGEERD.** De eerste versie stelde dat "Gantt wettelijk verankerd is in de aanbesteding" en het "meest expliciete regelgeving van de vijf landen" is. **Dat overdrijft wat het document zegt.**

- **De ANAP-notificatie bestaat en dateert van 10 oktober 2018** ✅ — dat deel is onafhankelijk bevestigd ([avocat-achizitii-publice.ro](https://avocat-achizitii-publice.ro/2019/02/utilizarea-graficului-gantt-drept-cerinta-aferenta-modului-de-intocmire-a-propunerii-tehnice-pentru-contractele-de-lucrari/): *"ANAP a publicat Notificarea din data de 10 octombrie 2018"*). ANAP = Agenția Națională pentru Achiziții Publice. *(De ANAP-pagina zelf blijft HTTP 503 geven en is niet in het Internet Archive te vinden.)*
- 🔴 **Maar de titel en strekking zijn anders dan gerapporteerd.** De notificatie heet *"Notificare cu privire la aspectele care trebuie avute în vedere **în situația utilizării** graficului de execuție drept cerință aferentă modului de întocmire a propunerii tehnice"* — "aspecten waarmee rekening moet worden gehouden **wanneer** het uitvoeringsschema als eis wordt gebruikt". Het is **richtsnoer voor aanbestedende diensten die ervoor kiezen een Gantt te eisen**, geen verplichting dat elke werkaanbesteding er een moet bevatten. De notificatie waarschuwt zelfs tegen *slechte* praktijk: het opleggen van "strikte en onrealistische termijnen voor het verkrijgen van bouwvergunningen" verschuift een risico dat de inschrijver niet beheerst en drijft de prijs op.
- Wat wél klopt: waar een Gantt geëist wordt, gebruiken aanbestedende diensten hem om te beoordelen of de planning van de inschrijver realistisch is; en de notificatie beveelt twee beoordelingsniveaus aan (alleen conformiteit bij eenvoudige projecten, inhoudelijke toets bij complexe) ⚠️.
- **Commercieel gevolg van de correctie:** de Roemeense "Gantt-verplichting" is geen afdwingbare wettelijke markt-trigger waarop je een go-to-market kunt bouwen. Het is een wijdverbreide, door de toezichthouder ondersteunde *praktijk*. Dat is zwakker dan het rapport suggereerde, maar sluit wel goed aan bij de observatie verderop dat de Gantt in Roemenië vooral een **compliance-artefact** is.
- Uitwerking beschikbaar via de **Federația Constructorilor** (PDF met ANAP-richtlijnen) en commerciële dienstverleners zoals [e-Licitati.ro](https://e-licitati.ro), die *"modele complete de propunere tehnică și financiară inclusiv grafic Gantt"* verkopen ⚠️.
- Aanbestedingsplatformen: **SEAP** en **MTender**; Deviz 360 exporteert er direct naartoe ⚠️.

**Normen:** **HG 907/2016** (Hotărâre de Guvern) regelt de structuur van kostenramingen en haalbaarheidsstudies voor publiek gefinancierde investeringen. eDevize adverteert expliciet met conformiteit ⚠️. **Ordonanță 1116 (november 2023)** actualiseerde de calculatienormen — WindevRO 7.3 is daarop aangepast ✅.

**Taal:** Roemeense UI vereist. De ramings-terminologie (deviz, articol de deviz, listă de cantități) is genormeerd en niet vrij vertaalbaar.

**Lokale spelers:** TotalSoft (Oracle-exclusief, >600 Primavera-klanten) ⚠️, Smart Project Solutions ⚠️, Softeh/WindevRO ✅, InterSOFT ⚠️, eDevize ⚠️, deviz.ro ⚠️, Deviz 360 ⚠️.

**Bijzonderheid — het "Gantt-compliance-artefact":** doordat de Gantt verplicht is bij inschrijving maar zelden inhoudelijk op CPM-kwaliteit wordt getoetst, is er een **markt voor sjablonen** ontstaan (e-Licitati.ro). Dat is tegelijk een probleem (planning wordt een vinkje) en een kans (een tool die snel een *geloofwaardige, verdedigbare* planning produceert heeft directe waarde bij inschrijving).

### 6.3 Tsjechië — het meest volwassen inheemse ecosysteem

- **CONTEC** is uniek: een academisch onderbouwd bouwplanningssysteem (prof. Jarský, ČVUT) met **cyclogrammen** (tijd-weg-diagrammen) — functionaliteit die internationaal alleen TILOS en Asta bieden. Gevoed door de **APSTA-normdatabase** met ploeggroottes en arbeidsproductiviteitsnormen ✅.
- **Normen:** **TSKP**-structuur (Třídník stavebních konstrukcí a prací) en de **ÚRS**-prijzendatabase zijn de standaard. KROS 4 en BUILDpower S zijn er beide op gebouwd ⚠️.
- **ČKAIT** (Česká komora autorizovaných inženýrů a techniků) publiceert vakinhoudelijke vergelijkingen van planningssoftware ⚠️ — een belangrijk kanaal voor geloofwaardigheid in Tsjechië.
- **Overheidscontracten zijn publiek:** [smlouvy.gov.cz](https://smlouvy.gov.cz) publiceert alle overheidscontracten inclusief softwareprijzen. Dat is hoe de KROS 4-prijs van 1.050 CZK/maand hier hard te maken was ✅. **Dit register is een uitstekende, onderbenutte bron voor concurrentie-prijsonderzoek in Tsjechië.**
- **Marktsentiment 2025:** bouwproductie +9,3%, *"jeden z nejlepších výsledků za posledních dvacet pět let"*, nieuwe orders +8,8%, lonen +10,3% ⚠️. Investeringsbereidheid is dus hoog.

### 6.4 Slowakije — KROS-monocultuur

- **CENKROS 4** van KROS a.s. (Žilina) domineert. Segmentatie in vier klantgroepen (bouwbedrijf, investeerder/overheid, calculator/ontwerper, klein bouwbedrijf) met desktop- en online-varianten ✅.
- **TSKP**-structuur, net als in Tsjechië ✅ — de Tsjechische en Slowaakse markt zijn technisch grotendeels uitwisselbaar, wat een gecombineerde CZ/SK-benadering logisch maakt.
- **Prijsondoorzichtigheid is beleid:** KROS toont geen prijzen op de website; alles loopt via winkelwagen of verkoop. Twee regionale verkoopnummers (west/midden vs. oost) ✅ — een klassiek relatiegedreven verkoopmodel.
- **Marktmoment:** 2025 was het beste jaar ooit, **>EUR 8,4 mrd, +7% reëel**, december alleen al EUR 885,2 mln (+11,7%) ✅.
- **Geen lokale Primavera-partner gevonden** ❌ — waarschijnlijk bediend vanuit Solutia (CZ) of Oostenrijk.

### 6.5 Hongarije — hardwaresleutels en een cloud-startupcluster

- **TERC Kft.** is de gevestigde speler met een **hardwaresleutel-licentiemodel** en verplichte halfjaarlijkse updates ✅ — het meest ouderwetse licentiemodel van de vijf landen, en tegelijk het meest transparant geprijsd.
- Daarnaast een cluster **moderne cloudspelers**: Innobau (*"Magyarország legmodernebb felhőalapú építőipari projektmenedzsment szoftvere"*), LILBUILD (sinds 2015), myPlan.cloud, Eniac, PROCON-X ⚠️. **Geen van hen doet CPM.**
- **Bouwmarkt:** HUF 7.699 mrd in 2024 (−1,2%), herstel in 2025 (+4,9% tot +6,5% per maand) ✅ [KSH](https://www.ksh.hu/epitoipar).
- Microsoft voert een volledige Hongaarse Project-productlijn ✅.
- ❌ Geen Oracle Primavera-partner in Hongarije gevonden.

### 6.6 Excel en niet-gelicentieerde software

**Niet-gelicentieerde software:**

| Land | Percentage | Jaar | Bron | Code |
|---|---|---|---|---|
| Roemenië | **59%** van geïnstalleerde software niet correct gelicentieerd | onbekend | doingbusiness.ro, citerend BSA | ⚠️ **jaar niet vast te stellen** |
| Roemenië, commerciële waarde | ~EUR 130 mln | recent | [ACTMedia / Forscope](https://actmedia.eu/economic/forscope-romania-unlicensed-software-in-romania-is-estimated-at-130-million-euros/105074) | ⚠️ |
| Polen | **57%**, verliezen $484 mln/jaar | **onbekend — waarschijnlijk verouderd (~2010)** | BSA-presentatie via [slideserve](https://www.slideserve.com/dustin-boyle/georg-herrnleben-director-central-eastern-europe-bsa-powerpoint-ppt-presentation) | ❓ **lage betrouwbaarheid** |
| Wereldwijd | 37% | 2018 | BSA Global Software Survey 2018 | ⚠️ |
| Hongarije, Tsjechië, Slowakije | **niet gevonden** | — | — | ❌ |

> **Eerlijke kanttekening:** ik heb de actuele BSA-landcijfers voor Polen, Hongarije, Tsjechië en Slowakije **niet kunnen verifiëren**. De BSA Global Software Survey is bovendien sinds 2018 niet meer geactualiseerd. Het Poolse cijfer van 57% is vrijwel zeker jaren oud en overschat de huidige situatie. Behandel deze rij als **indicatief, niet als feit.**

**Praktische betekenis:** in het MKB-segment van de CEE-bouw is een niet-gelicentieerde MS Project-installatie een reële concurrent van elk betaald product. Dat verlaagt de effectieve prijs van de marktleider naar nul en verklaart mede waarom de betaalde markt zo klein is (§3.4). **Het is ook een argument voor een goedkoop, legaal, gemakkelijk te kopen alternatief:** de drempel is niet "wil ik betalen" maar "wil ik zóveel betalen".

### 6.7 Opleidingscultuur

Sterk ontwikkeld, en gesubsidieerd:

- **Polen:** commercieel opleidingslandschap (Altkom Akademia, Compendium, COGNITY, PMOPM) met MS Project-cursussen vanaf 1.500 PLN netto ✅. P6-cursussen via het **PARP-register** zijn EU-subsidiabel ✅. Poolstalige P6-handleidingen en -gidsen circuleren breed ⚠️.
- **Roemenië:** TotalSoft claimt >5.000 internationaal gecertificeerde specialisten ⚠️; ecostarplan en europroiect academy bieden respectievelijk P6- en Gantt-cursussen ⚠️.
- **Tsjechië:** ČKAIT als beroepsorganisatie publiceert softwarevergelijkingen ⚠️; ČVUT (waar CONTEC vandaan komt) verzorgt academische verankering.
- **Hongarije:** TERC verkoopt support per uur (20.000 HUF) ✅ in plaats van cursussen — een ander model.

🔶 **Implicatie:** in deze regio is **training een verkoopkanaal**, geen bijproduct. Een aanbieder die Poolstalige/Roemeenstalige cursussen in het PARP-register (of het Roemeense equivalent) krijgt, koopt effectief gesubsidieerde distributie.

---

## 7. Voor- en nadelen van de lokale en niche-pakketten

Op basis van documentatie, leverancierspositionering, prijsstelling en distributiemodel. Waar geen gebruikersreviews of forumdiscussies vindbaar waren, is dat vermeld — dat is zelf een signaal.

### CONTEC (CZ) ⭐ het interessantste lokale pakket

| Voordelen | Nadelen |
|---|---|
| Enige inheemse CEE-tool met **volwaardige bouwplanningsmethodiek**: netwerkdiagrammen, harmonogrammen, **cyclogrammen (tijd-weg)**, resourcebalans ✅ | **Geen gepubliceerde prijs** — offerte-only, hoge frictie ❌ |
| **APSTA-normdatabase** met ploeggroottes, arbeidsproductiviteit, eenheidsprijzen — planning is genormeerd, niet geraden ✅ | Distributie versplinterd: auteursrechten bij Housing for You CZ a.s., verkoop via NETDATA — onduidelijke governance ⚠️ |
| Integreert kwaliteitscontroleplanning, cashflow, controlling en boekhoudkoppeling ✅ | Uitsluitend Tsjechisch; geen internationalisering zichtbaar |
| Academische verankering (prof. Jarský, ČVUT); onderscheidingen For Arch 2000, Innovatie van het Jaar 2004 ✅ | Onderscheidingen dateren uit 2000/2004 — **modern momentum ontbreekt** |
| Halfjaarlijkse updates, 30 jaar ervaring, "honderden gebruikers" ⚠️ | "Honderden gebruikers" is na 30 jaar **een klein getal** — beperkte schaal |
| | Geen zichtbare online community, reviews of forumactiviteit gevonden ❌ |

### Norma EXPERT / Norma PRO (PL, Athenasoft)

| Voordelen | Nadelen |
|---|---|
| ~20 jaar de facto standaard onder Poolse kosztorysanci ⚠️ | **Planning is uitbesteed:** de "nakładka ATH Project" schuift het werk door naar MS Project ⚠️ — geen eigen CPM |
| Acht geïntegreerde programma's, jaarlijkse updates ⚠️ | Duur: 6.390 PLN netto (7.860 bruto) voor de eerste werkplek ✅ — boven MS Project Professional |
| BIM-ondersteuning in EXPERT; AthBIM-module ⚠️ | Norma PRO is **uitgefaseerd** — gedwongen migratie irriteert de installed base ⚠️ |
| Sterk resellernetwerk; goede beschikbaarheid ✅ | Extra werkplek nog steeds 5.590 PLN netto — schaalt slecht voor teams ✅ |
| 365-abonnement (2.590–2.990 PLN/jr) verlaagt de instapdrempel ✅ | Intercenbud-prijzendatabase kost 1.190 PLN/jaar extra ✅ — de totale kosten lopen snel op |

### Zuzia → BIMestiMate (PL, Datacomp)

| Voordelen | Nadelen |
|---|---|
| **Echt geïntegreerd**: przedmiarowanie + kosztorysowanie + **harmonogramowanie** in één ✅ | Prijslijst niet publiek uitleesbaar ❌ |
| Eigen harmonogram-weergaven (Zadania / Plan) ✅ | Naamswijziging Zuzia → BIMestiMate schept verwarring en breekt merkherkenning ⚠️ |
| 3D/BIM-benadering; breed toepassingsgebied (bouw, renovatie, installatie, weg, spoor, telecom) ⚠️ | Upgrade-prijs 1.353 PLN incl. btw ⚠️ — terugkerende upgradekosten |
| Meerdere resellers met fabrieksgarantie ⚠️ | Planning blijft ondergeschikt aan calculatie; geen CPM-diepgang aangetoond |

### PLANISTA (PL)

| Voordelen | Nadelen |
|---|---|
| **Echte PERT/Gantt-analyse met kritiek pad** — een van de weinige Poolse tools die dit expliciet claimt ⚠️ | **Geen gepubliceerde prijs; bestelling alleen telefonisch/e-mail** ⚠️ — sterk verouderd verkoopmodel |
| Multidisciplinair: bouw, montage, installatie ⚠️ | Geen website-transparantie, geen demo, geen trial gevonden ❌ |
| Koppelt arbeid en materialen aan de begroting uit de calculatie ⚠️ | Geen reviews, forumdiscussies of gebruikerscommunity gevonden ❌ — sterk signaal van marginale marktpositie |
| Planista Max voegt Karty Pracy (BZ) en formulieren PZ/RW/ZW toe — **echte Poolse administratieformulieren** ⚠️ | Distributie via drie verschillende resellers plus de maker (PMC Piotr Chyliński) — versnipperd, vermoedelijk zeer klein bedrijf |
| Ontworpen voor snelle aanpassing tijdens uitvoering ⚠️ | Geen zichtbare BIM-, cloud- of moderne integratie |

### PROGPOL (PL)

| Voordelen | Nadelen |
|---|---|
| **Vrije harmonogram-structuur** afhankelijk van complexiteit — flexibeler dan starre WBS ⚠️ | Onderdeel van het TelkomBud-systeem — **geen zelfstandig product**, waardoor het alleen bij TelkomBud-klanten landt ⚠️ |
| Voortgangsregistratie **zowel in % als in omvang** per fase ⚠️ — praktisch voor termijnstaten | Geen prijzen, geen reviews, geen community gevonden ❌ |
| Ondersteunt subtaken, categorieën en projectfasen ⚠️ | Zeer beperkte zichtbaarheid; nauwelijks online voetafdruk |

### KROS 4 (CZ) / CENKROS 4 (SK)

| Voordelen | Nadelen |
|---|---|
| Marktleider in respectievelijk CZ en SK; ÚRS- resp. TSKP-verankering ⚠️ | **Prijsondoorzichtigheid**: CENKROS toont geen prijzen, alleen winkelwagen ✅ — frictie voor kleine klanten |
| CZ-prijs bekend en betaalbaar: **vanaf 1.050 CZK/maand** incl. Rozpočet + Kalkulace + Čerpání + data ✅ | Planning is een bijproduct van de begroting; geen aangetoonde CPM/kritiek-padfunctionaliteit |
| Goede segmentatie naar klanttype (aannemer / investeerder / calculator / klein bedrijf) ✅ | Verkoop sterk relatiegedreven (twee regionale telefoonnummers in SK) ✅ — schaalt slecht |
| Regelmatige releases (2025/I: btw-verbetering, meertraps goedkeuring, prijsdatabases) ⚠️ | CZ- en SK-varianten zijn verschillende producten met verschillende namen — dubbele productlijn |
| Online-varianten beschikbaar voor kleine bedrijven ✅ | |

### TERC V.I.P. (HU)

| Voordelen | Nadelen |
|---|---|
| **Volledig transparante, gepubliceerde prijslijst** ✅ — uitzonderlijk in deze regio | **Hardwaresleutel** — verouderd, onhandig, gaat kapot (vervanging 17.250 HUF) ✅ |
| Duidelijke drietrapssegmentatie (BRONZ/SILVER/GOLD) + online TERC-ETALON ✅ | **Verplichte halfjaarlijkse updates à 70.000 HUF** — de echte kosten liggen in het abonnement, niet de aanschaf ✅ |
| GOLD geeft volledige controle over resourceprijzen, eigen databases, uurtarieven per beroep ✅ | Support kost **20.000 HUF per begonnen uur** ✅ — afschrikkend voor kleine gebruikers |
| Overstap naar 365-abonnementsmodel (SILVER365 / GOLD365) modernizeert het model ✅ | **Offline** ("offline építőipari költségvetés-készítő program") ⚠️ — geen samenwerking, geen cloud |
| Brede gebruikersbasis: zonne-installateurs, elektro, ontwerpbureaus, vastgoedbeheer ⚠️ | **Geen planningsfunctionaliteit aangetroffen** — puur calculatie |

### Roemeense deviz-pakketten (WindevRO, eDevize, WinDoc, Deviz 360, InterSOFT)

| Voordelen | Nadelen |
|---|---|
| **Veruit de beste prijs/waarde in de regio**: EUR 285–600 ✅ | **Sterk gefragmenteerd** — minstens 7 aanbieders voor een markt van deze omvang; consolidatie is onvermijdelijk |
| Directe conformiteit met **HG 907/2016** en Ordonanță 1116/2023 ✅ | **Nauwelijks planningsfunctionaliteit**: bij WindevRO is expliciet **geen Gantt-/planningsmodule** aangetroffen ✅ |
| Offline-werking, geen internetafhankelijkheid — praktisch op bouwlocaties ✅ | Freemium-race naar de bodem (Deviz Instalator gratis; 39 RON/mnd) ⚠️ — drukt de marges voor iedereen |
| Directe export naar **SEAP/MTender** ⚠️ — aanbestedingsintegratie is een reëel voordeel | Kleine leveranciers; beperkte R&D-capaciteit; onzekere continuïteit |
| Aantrekkelijke bundelprijzen (2e licentie 50% korting: EUR 922 voor twee) ✅ | Cursus-als-verdienmodel (Deviz 360: 600 lei voor 10 weken toegang) ⚠️ — verwart product en opleiding |

### Hongaarse cloud-startups (Innobau, LILBUILD, myPlan, Eniac, PROCON-X)

| Voordelen | Nadelen |
|---|---|
| Modern, cloudgebaseerd, goede UX-positionering ⚠️ | **Geen enkele doet CPM/kritiek pad** — het zijn samenwerkings- en administratieplatformen ⚠️ |
| Dekken de hele keten van planning tot financiële administratie (Innobau) ⚠️ | Alleen Hongaarse markt; geen regionale schaal |
| LILBUILD ontwikkelt sinds 2015 — bewezen doorlooptijd ⚠️ | Geen prijzen publiek; geen reviews gevonden ❌ |
| Vullen een reëel gat in bouwadministratie ⚠️ | Concurreren om hetzelfde budget als een planningstool zonder het te vervangen |

---

## 8. Implicaties voor Open Planner Studio

Kort en concreet, want dit is waar het onderzoek voor dient.

**De vier structurele openingen:**

1. **Het middensegment is leeg.** Tussen MS Project (goedkoop, niet-bouwspecifiek) en Primavera P6 (bouwspecifiek, onbetaalbaar) zit niets — Asta, TILOS en SYNCHRO zijn hier feitelijk afwezig (§4.4). In het VK en DACH is dit segment bezet; hier niet.

2. **Bestandsuitwisseling is de toegangseis, niet de functionaliteit.** Poolse FIDIC-contracten eisen MS Project-formaat ⚠️; internationale contracten draaien op XER; PlanRadar importeert P6/MSP/Asta ⚠️. **Zonder vlekkeloze MPP-, MS Project XML- en XER-uitwisseling is het product onverkoopbaar in deze regio — met die uitwisseling is de contractdwang juist een distributiekanaal.**

3. **De prijs/koopkrachtkloof is de scherpste hefboom.** 2,5–4× hogere effectieve kosten dan in het Westen (§5.5). Een prijs die duidelijk onder de MS Project-drempel (5.772 PLN netto perpetual / ~EUR 427/jaar) duikt, opent een markt die nu in Excel en informele licenties zit.

4. **Lokalisatie is niet optioneel en niet alleen taalkundig.** Pools, Tsjechisch, Slowaaks, Hongaars en Roemeens zijn alle vijf al aanwezig in de i18n-opzet van Open Planner Studio (nl, en, fr, de, es, zh, it, pt, pl, tr, ar, ja, ko, fa) — **pl zit erin; cs, sk, hu en ro niet.** Dat is de meest concrete actie die uit dit rapport volgt.

**Wat je níet moet doen:** concurreren met Norma, KROS, TERC of de deviz-pakketten. Die zijn verankerd in nationale normcatalogi (KNR, TSKP, ÚRS, HG 907/2016) waar decennia aan data in zit. **Wees complementair: importeer hun output, plan er beter mee dan MS Project, exporteer naar het formaat dat het contract eist.**

**Waar te beginnen:** Polen (grootste markt, hardste contractdwang, hoogste prijsniveau van de gevestigden) en Tsjechië (meest volwassen ecosysteem, transparante overheidscontracten op smlouvy.gov.cz als prijsintelligentie, ČKAIT als geloofwaardigheidskanaal). Roemenië is het grootst qua groei maar het moeilijkst qua marge.

---

## 9. Kennisleemten — wat dit rapport níet heeft kunnen vaststellen

Eerlijkheidshalve, zodat vervolgonderzoek gericht kan worden:

1. ✅ **OPGELOST bij verificatie — Aantal bouwbedrijven in Polen:** **421.178** (Eurostat SBS, NACE F, 2023). Zie §2.3.
2. ✅ **OPGELOST bij verificatie — Eurostat-cijfers per land:** ondernemingen, werkzame personen, omzet, productiewaarde en toegevoegde waarde voor alle vijf landen staan nu in §2.1 en §2.3. Bron: Eurostat-disseminatie-API, dataset `sbs_ovw_act`.
3. ❌ **Officiële Oracle-prijslijst** voor Primavera — de CEGBU-PDF was technisch niet uitleesbaar. Alle P6-prijzen zijn aggregatorcijfers.
4. ❌ **CENKROS 4-prijzen in EUR** — bewust niet gepubliceerd door KROS; de archief-PDF was niet uitleesbaar.
5. ❌ **Prijzen van PLANISTA, PROGPOL, CONTEC, BUILDpower S, Zuzia** — geen van deze publiceert prijzen.
6. ❌ **Bevestiging of PKP PLK / CUPT specifiek Primavera of XER eisen** — waarschijnlijk, maar niet aangetoond.
6b. 🔴 **NIEUW GAT, blootgelegd bij verificatie: de Poolse MS Project-contracteis zelf.** Het rapport presenteerde die als vondst maar onderbouwde hem met een zoekopdracht-URL; het citaat is niet reproduceerbaar. Dit is nu het **belangrijkste openstaande punt van het hele rapport**, omdat er in §1, §4.1, §6.1 en §8 strategische conclusies op rusten. Te sluiten via ezamowienia.gov.pl of GDDKiA-OPZ-documenten, niet via zoekmachines.
7. ❌ **Actuele BSA-piraterijcijfers** voor PL/CZ/SK/HU — de survey is sinds 2018 niet geactualiseerd; het gevonden Poolse cijfer (57%) is vermoedelijk ~15 jaar oud.
8. ❌ **Harde marktaandeelpercentages** MS Project vs. P6 vs. Excel bij aannemers — bestaan niet publiek, niet regionaal en niet mondiaal.
9. ❌ **Gebruikersreviews en forumdiscussies** over de lokale nichepakketten — vrijwel afwezig online, wat zelf een signaal is over hun schaal.
10. ✅ **GROTENDEELS OPGELOST bij verificatie — Tsjechische en Roemeense bouwmarktwaarden.** Tsjechië: **CZK 695,8 mrd (2024) ≈ EUR 28,8 mrd**, MPO. Roemenië: Eurostat NACE F productiewaarde **EUR 49,0 mrd (2023)**; INS-investeringen in nieuwe bouwwerken ≈ RON 117 mrd (2024). De eigen schattingen in de eerste versie (CZ 24–26, RO 38–42) waren allebei mis — zie §2.1.

---

## 10. Bronnen

### Leveranciers en prijslijsten (primair ✅)
- Microsoft Project, Polen — https://www.microsoft.com/pl-pl/microsoft-365/project/compare-microsoft-project-management-software
- Microsoft Project, VS — https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software
- Microsoft Project Professional 2024, Hongarije — https://www.microsoft.com/hu-hu/microsoft-365/p/project-professional-2024/CFQ7TTC0PH40
- Athenasoft Norma-prijslijst via Unilogic — https://www.unilogic.pl/pliki/cenniki/cenniknorma.htm
- TERC V.I.P. prijslijst (geldig vanaf 05-01-2026) — https://www.terc.hu/oldal/terc-vip-arlista
- CONTEC — https://www.contec.cz en https://www.contec.cz/cojecontec.htm
- NETDATA SOFTWARE (CONTEC-distributie) — https://netdatasoft.cz/software-pro-casovou-pripravu/
- KROS CENKROS 4 — https://www.kros.sk/cenkros/cennik/
- KROS prijslijstenportaal — https://web.kros.sk/cenniky/
- Zuzia / BIMestiMate harmonogram — https://www.zuzia.com.pl/harmonogram/
- Zuzia prijslijst — https://www.zuzia.com.pl/program-do-kosztorysowania/cennik/
- Datacomp abonnement — https://abonament.datacomp.com.pl
- WindevRO (Softeh, Roemenië) — https://www.windev.ro
- DAT Computer Concepts (Oracle-partner PL) — https://datcc.pl/rozwiazania/oracle-primavera-p6/
- TotalSoft Primavera (Roemenië) — https://www.totalsoft.ro/primavera
- Solutia s.r.o. (Oracle-partner CZ) — https://www.solutia.cz/co-delame/oracle-reseni/
- Smart Project Solutions (RO) — https://smartprojectsolutions.ro/oracle-primavera/
- Oracle Primavera P6, Poolse pagina — https://www.oracle.com/pl/construction-engineering/primavera-p6/
- Oracle Primavera P6 — https://www.oracle.com/construction-engineering/primavera-p6/
- ProjectLibre — https://www.projectlibre.com/projectlibre-desktop/
- Charisma Business Suite (RO) — https://www.charisma.ro/sisteme-erp/constructii-si-proiectare
- PlanRadar Roemenië (Gantt in de bouw) — https://www.planradar.com/ro/diagrame-gantt-pentru-proiecte-de-constructii/
- PlanRadar Hongarije — https://www.planradar.com/hu/ugyfelek/epiteszeti-projektmenedzsment-szoftver/
- Innobau (HU) — https://innobau.hu
- LILBUILD (HU) — https://lilbuild.hu
- myPlan.cloud (HU) — https://myplan.cloud/hu
- Eniac (HU) — https://eniac.hu/projektkezeles/
- PROCON-X (HU) — https://procon-x.hu

### Statistiek en overheid (primair ✅)
- GUS (Polen), bouwstatistiek — https://stat.gov.pl/obszary-tematyczne/przemysl-budownictwo-srodki-trwale/budownictwo/
- KSH (Hongarije), bouwnijverheid — https://www.ksh.hu/epitoipar
- KSH gyorstájékoztató bouw — https://www.ksh.hu/gyorstajekoztatok/epi/epi2506.html
- Štatistický úrad SR (Slowakije) — https://slovak.statistics.sk/wps/portal/ext/products/informationmessages/inf_sprava_detail/4b10de05-8b13-4df8-8923-65cc8f3404c4/
- smlouvy.gov.cz (Tsjechisch overheidscontractenregister — bron van de KROS 4-prijs) — https://smlouvy.gov.cz
- ANAP (Roemenië), notificatie Gantt-diagram werkcontracten, 10-10-2018 — https://anap.gov.ro/ro/notificare-cu-privire-la-necesitatea-utilizarii-graficului-gantt-pentru-contractele-de-lucrari/
- GDDKiA (Polen) — https://www.gov.pl/web/gddkia
- gov.pl, "Cyfryzacja procesu budowlanego w Polsce" — https://www.gov.pl/attachment/6f1257e0-74d4-48c4-8e71-2b9570bff7c3
- gov.pl, "Cyfryzacja projektowania w sektorze budowlanym w Polsce" — https://www.gov.pl/attachment/e36d2e47-4454-4460-bd66-955e11c93d4b
- SIDiR (Poolse FIDIC-vereniging) — https://sidir.pl
- ČKAIT (Tsjechische ingenieurskamer) — https://www.ckait.cz
- PARP ontwikkelingsdienstenregister (subsidiabele trainingen) — https://uslugirozwojowe.parp.gov.pl

### Marktrapporten en pers (secundair ⚠️)
- GlobalData/Businesswire, Poolse bouwmarkt EUR 54,04 mrd 2025 — https://www.businesswire.com/news/home/20250430779835/en/
- Businesswire, Poland Construction Industry Report 2025 — https://www.businesswire.com/news/home/20250904367608/en/
- Market Research Future, Poland Construction Market — https://www.marketresearchfuture.com/reports/poland-construction-market-25780
- PMR, Construction Sector in Central Europe 2025 — https://mypmr.pro/sample/construction-sector-in-central-europe
- PMR inhoudsopgave (PDF) — https://pmrmarketexperts.com/wp-content/uploads/2025/03/construction-sector-in-central-europe-table_of_content.pdf
- Euroconstruct country reports — https://www.euroconstruct.org/ec_reports/country-report/
- Verified Market Research, Eastern Europe Construction — https://www.verifiedmarketresearch.com/product/eastern-europe-construction-market/
- Aktuality.sk, Slowaakse bouw >EUR 8,4 mrd — https://www.aktuality.sk/clanok/3N9y6rS/stavebnictvo-na-slovensku-lame-rekordy-prvykrat-prekrocilo-hranicu-84-miliardy-eur-za-jediny-rok/
- Agenda Construcțiilor (RO), +8% in 2025 — https://www.agendaconstructiilor.ro
- Smart Estate (RO), bouwmarkt 2024 — https://smartestate.ro/2025/02/28/piata-constructiilor
- Arena Construct (RO), EU-fondsenabsorptie PNRR — https://arenaconstruct.ro/absorbtia-fondurilor-europene-pnrr
- Politic Media (RO), PNRR EUR 13,57 mrd — https://politicmedia.ro/romania-a-finalizat-renegocierea-pnrr
- EY Polska, digitalisering bouwsector — https://www.ey.com/pl_pl/insights/digital-first/cyfryzacja-w-branzy-budowlanej-to-priorytet-ai-fy25
- Builder Polska, "Cyfryzacja branży budowlanej — ewolucja zamiast rewolucji" — https://builderpolska.pl/2025/01/15/cyfryzacja-branzy-budowlanej-ewolucja-zamiast-rewolucji/
- ACTMedia/Forscope, niet-gelicentieerde software Roemenië — https://actmedia.eu/economic/forscope-romania-unlicensed-software-in-romania-is-estimated-at-130-million-euros/105074
- Stavební klub (CZ), planningssoftware — https://www.stavebniklub.cz

### Trainingsaanbieders (⚠️/✅)
- Altkom Akademia, MS Project — https://www.altkomakademia.pl/product-category/szkolenia-biznesowe/zarzadzanie-projektami-i-procesami/narzedzia-w-projektach/ms-project/
- Compendium (PL) — https://www.compendium.pl
- COGNITY, Primavera P6 — https://www.cognity.pl/blog-primavera-p6-praktyczny-przewodnik
- Jurator (PL), Primavera P6 — https://jurator.pl/dlaczego-warto-wdrozyc-primavera-p6/
- PMOPM (PL) — https://pmopm.org/primavera/
- Ecostarplan (RO), P6-cursus — https://ecostarplan.com/ro/cursuri/planificarea-si-controlul-proiectelor-folosind-oracle-primavera-p6/
- Europroiect Academy (RO), Gantt in de bouw — https://academy.europroiect.org/course/graficul-gantt-al-programului-de-executie-al-proiectului

### Poolse software-portalen en resellers (⚠️)
- Planista — https://planista.com.pl
- Progpol — https://progpol.com
- Unilogic — https://www.unilogic.pl
- Kosztorysowe.pl — https://www.kosztorysowe.pl
- Programy do kosztorysowania — https://www.programy-do-kosztorysowania.pl
- Do-kosztorysowania.pl (ATH Project overlay → MS Project) — https://www.do-kosztorysowania.pl
- Komako (Athenasoft) — https://kosztorysowe.komako.pl/athenasoft.html
- Kosztorysuj.pl (Rodos) — https://kosztorysuj.pl
- Sekocenbud (SeKo PRIX) — https://www.sekocenbud.pl
- WINBUD Kosztorys — https://winbudkosztorys.pl
- Program kosztorysowy (overzicht) — https://programkosztorysowy.pl
- Kawalec.eu, PM-programma's — https://kawalec.eu/project-management/programy-do-zarzadzania-projektami/

### Roemeense software (⚠️)
- Deviz.ro (WinDoc Deviz) — https://www.deviz.ro
- Devize.ro (InterSOFT Deviz Professional 10) — https://devize.ro
- eDevize — https://edevize.ro
- e-Licitati.ro (aanbestedingssjablonen incl. Gantt) — https://e-licitati.ro

### Tsjechische/Slowaakse software (⚠️)
- RTS (BUILDpower S) — https://www.rts.cz
- KROS CZ — https://www.kros.cz
- ÚRS klantenportaal — https://app.urs.cz

### Aggregators — indicatief, lage betrouwbaarheid (❓)
- Contractors and Builders, Primavera-prijzen — https://contractorsandbuilders.com/pricing/oracle-primavera/
- ITQlick, Oracle Primavera — https://www.itqlick.com/oracle-primavera/pricing
- ITQlick, Asta Powerproject — https://www.itqlick.com/asta-powerproject/pricing
- Software Finder, Powerproject — https://softwarefinder.com/project-management-software/powerproject
- Vendor Benchmark, Primavera P6 — https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing
- Datanyze, Primavera P6 marktaandeel — https://www.datanyze.com
- Ceneo (PL prijsvergelijker), MS Project Plan 3 — https://www.ceneo.pl/140247159
- Gitnux, Poolse bouwstatistiek — https://gitnux.org/poland-construction-industry-statistics/
- 6Wresearch, Poland PM Software Market — https://www.6wresearch.com/industry-report/poland-project-management-software-market
- 6Wresearch, Poland PPM Software Market — https://www.6wresearch.com/industry-report/poland-project-and-portfolio-management-software-market
- The Report Cubes, Poland IT — https://www.thereportcubes.com/report-store/it-services-software-market-insights-poland
- LinkedIn Polen, Primavera P6-vacatures — https://pl.linkedin.com/jobs/primavera-p6-jobs
- Spider Project — https://www.spiderproject.pro/en/spider-project/
- Planview over Sciforma — https://www.planview.com/acquisitions/about-sciforma/

### Poolse PM-tool-rankings (⚠️)
- https://procesywbiznesie.pl
- https://rankingo.pl
- https://czaslidera.pl
- https://mikolajek.eu

---

*Rapport opgesteld op 25 juli 2026. Alle bedragen zijn genoemd in de brontvaluta met indicatieve EUR-omrekening. Cijfers gemarkeerd met 🔶 zijn eigen schattingen met de redenering erbij; cijfers met ❓ komen uit aggregators en zijn indicatief. De belangrijkste methodologische beperking (uitgeputte zoekbudget, onderzoek uitgevoerd via directe fetches) staat beschreven in §0, en de resterende kennisleemten in §9.*

---

## Verificatie

**Uitgevoerd:** 25 juli 2026, als adversariële fact-check. Opdracht was expliciet om te **weerleggen**, niet te bevestigen. Elke bewering hieronder is met onafhankelijke bronnen benaderd — dus met andere bronnen dan die het rapport zelf aanhaalde.

**Methode.** De WebSearch-tool was ook in deze sessie uitgeput, dus is gewerkt met (a) **statistische API's** — Eurostat-disseminatie, ECB Data Portal, NBP — die geen zoekmachine nodig hebben en primaire data leveren, (b) directe WebFetch op leveranciers- en overheidspagina's, en (c) DuckDuckGo lite/html voor het traceren van citaten. Route (a) bleek verreweg het productiefst en heeft twee van de tien zelfbenoemde kennisleemten alsnog gesloten. **Dat is de belangrijkste procesconclusie: het oorspronkelijke onderzoek liep vast op zoekmachines terwijl de cijfers via open API's beschikbaar waren.**

**Uitkomst in één zin:** het kwalitatieve beeld — leeg middensegment, calculatie-eerst-ecosysteem, prijsafschrikking — houdt goed stand; de **kwantitatieve onderbouwing niet**. De marktomvangredenering bevatte een ongeldige optelling, twee foute wisselkoersen, een interne tegenspraak en twee rekenfouten, en de twee "belangrijkste bevindingen" (Poolse MSP-contractdwang, Roemeense Gantt-plicht) zijn allebei zwakker dan gepresenteerd.

### Oordeel per bewering

| # | Bewering | Oordeel | Bevinding | Bron |
|---|---|---|---|---|
| 1 | **Bouwmarkt CEE-5 ≈ EUR 145–155 mrd (2025)** | 🔴 **Gecorrigeerd — verworpen** | Optelling van onvergelijkbare reeksen (marktrapport-output voor PL, smalle nationale reeks voor SK, KSH-bruto voor HU, giswerk voor CZ/RO). Op één consistente EU-definitie (NACE F, 2023): **omzet EUR 274,9 mrd, productiewaarde EUR 243,8 mrd, toegevoegde waarde EUR 71,9 mrd**. Het getal 145–155 hoort bij geen enkele maatstaf. | [Eurostat `sbs_ovw_act`](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/sbs_ovw_act?format=JSON&nace_r2=F&time=2023) |
| 2 | **Tsjechië ≈ EUR 24–26 mrd (eigen schatting)** | 🔴 **Gecorrigeerd** | Werkelijk **CZK 695,8 mrd aan uitgevoerde bouwwerken in 2024 = EUR 28,8 mrd**; met de eigen +9,3% voor 2025 ≈ **EUR 31,5 mrd**. Onderschatting van 20–30%. | MPO, *Stavebnictví ČR 2025*: *"Stavební společnosti provedly v roce 2024 stavební práce v hodnotě 695,8 miliard Kč"* — [mpo.gov.cz](https://www.mpo.gov.cz) |
| 3 | **"Roemenië ligt qua bouwvolume structureel boven Tsjechië"** (dragende aanname onder de RO-schatting van 38–42 mrd) | 🔴 **Weerlegd** | Omgekeerd. Eurostat NACE F productiewaarde: 2023 **CZ 51,1 vs. RO 49,0 mrd**; 2022 **CZ 47,4 vs. RO 39,9 mrd**. Op omzetbasis CZ 51,9 vs. RO 44,5. Tsjechië ligt in beide jaren en op beide maatstaven boven Roemenië. | [Eurostat `sbs_ovw_act`](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/sbs_ovw_act?format=JSON&nace_r2=F&time=2023) |
| 4 | **Polen EUR 54,04 mrd in 2025, +5,1%, → EUR 66,66 mrd in 2029** | ✅ **Bevestigd** (met broncorrectie) | Cijfers exact bevestigd, inclusief de 2024-basis van EUR 51,41 mrd en de CAGR's 7,7% (2020–24) / 4,1% (2025–29). **Maar de uitgever is ResearchAndMarkets.com ("Poland Construction Industry Databook Series"), niet GlobalData** — die attributie stond fout in het rapport. | [businesswire.com](https://www.businesswire.com/news/home/20250430779835/en/) |
| 5 | **Slowakije EUR 8,4 mrd in 2025, +7% reëel, hoogste ooit** | ✅ **Bevestigd** | Meervoudig bevestigd (ŠÚ SR via Aktuality, Trend, Teraz): *"Objem zrealizovaných prác historicky prvýkrát prekročil hranicu 8,4 miliardy eur"*, +7% reëel, december EUR 885,2 mln (+11,7%). **Kanttekening:** dit is een smalle nationale reeks — Eurostat meet voor dezelfde sector EUR 15,4 mrd productiewaarde. Niet optelbaar met de Poolse maatstaf. | [Štatistický úrad SR](https://slovak.statistics.sk/) / [aktuality.sk](https://www.aktuality.sk/clanok/3N9y6rS/) |
| 6 | **Hongarije HUF 7.699 mrd in 2024** | ✅ **Bevestigd** | KSH letterlijk: *"2024-ben az építőipari termelés (7 699 milliárd forint) összehasonlító áron 1,2%-kal elmaradt az egy évvel korábbitól."* De EUR-omrekening naar ~19,7 mrd is verdedigbaar tegen de koers van 2024. | [ksh.hu/epitoipar](https://www.ksh.hu/epitoipar) |
| 7 | **Softwaremarkt: EUR 5,1–12,9 mln pure licenties; EUR 9–31 mln incl. diensten** | ⚠️ **Onzeker — rekenkundig valide, aannames onverifieerbaar** | De optelling A+B+C+D klopt (5,1–12,9) en de dienstenopslag van +80–140% geeft correct 9,2–31,0. **Maar:** §1 punt 7 noemde totaal andere getallen (12–25 resp. 20–40 mln) — een **interne tegenspraak**, nu gecorrigeerd ten gunste van §3.3. Geen van de onderliggende seat-aantallen of prijzen per seat is extern verifieerbaar; het blijft een redenering, geen meting. Bovendien schaalt de gebruikersschatting mee met de verworpen noemer uit #1 — op Eurostat-omzetbasis zou dezelfde vuistregel ~2× meer planners opleveren. | intern; [Eurostat](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/sbs_ovw_act?format=JSON&nace_r2=F&time=2023) |
| 8 | **"Planning-adjacent" markt ≈ EUR 30–75 mln/jaar** | 🔴 **Gecorrigeerd — rekenfout** | Volgt niet uit de eigen componenten. 18–20 + 7,5–45 = **25,5–65**; over de volle bandbreedte 9–31 + 7,5–45 = **16,5–76**. De ondergrens van 30 was ~18% te hoog. | intern narekenen |
| 9 | **Ratio "EUR ~18 mln software op EUR ~150 mrd = 0,012%, 3–5× lager dan West-Europa"** | 🔴 **Gecorrigeerd + ⚠️ onbewezen** | De deling klopt, maar de noemer is verworpen (#1). Herrekend: **0,0074%** op productiewaarde, 0,0065% op omzet, **0,025%** op toegevoegde waarde. De "3–5× lager dan West-Europa" is nergens afgeleid — er staat **geen enkel West-Europees softwarebestedingscijfer in het rapport**. Ongefundeerd. | intern; Eurostat |
| 10 | **MS Project PL 7.099 / 3.999 PLN; VS $1.129,99 / $679,99** | ✅ **Bevestigd** | Alle vier bedragen opnieuw opgehaald van beide Microsoft-pagina's. Toevoeging: de pagina's vermelden **niet** expliciet of het bruto of netto is — de netto-herleiding (÷1,23) blijft dus een aanname, zij het de gebruikelijke voor Poolse consumentenprijzen. Ook bevestigd: Project Plan 1/3/5 staan op geen van beide pagina's. | [microsoft.com/pl-pl](https://www.microsoft.com/pl-pl/microsoft-365/project/compare-microsoft-project-management-software) · [microsoft.com/en-us](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software) |
| 11 | **"Polen betaalt +40% (Pro) / +31% (Standard) t.o.v. de VS"** | 🔴 **Gecorrigeerd** | Gerekend met 3,65 PLN/USD; de werkelijke NBP-middenkoers is **3,8000**. Correct: **+34,4%** en **+25,8%**. Het rapport was bovendien intern inconsistent (§0 impliceerde 3,91 PLN/USD, §5.5 gebruikte 3,65). Richting klopt, omvang met ~6 procentpunt overdreven. | [NBP tabela A 142/A/NBP/2026](https://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json) · [ECB EXR](https://data-api.ecb.europa.eu/service/data/EXR/D.USD+PLN+CZK+HUF+RON.EUR.SP00.A?lastNObservations=1&format=csvdata) |
| 12 | **Wisselkoersen (EUR/HUF 390, USD 0,92 EUR)** | 🔴 **Gecorrigeerd** | Werkelijk op 24-07-2026: EUR/PLN 4,3155 · EUR/CZK 24,149 · **EUR/HUF 361,88** · EUR/RON 5,2343 · EUR/USD 1,1377. De HUF-koers zat er **7,8%** naast, waardoor alle TERC-prijzen in euro's te laag stonden (GOLD365 EUR 663 i.p.v. 615; support EUR 55/uur i.p.v. 51). | [ECB Data Portal](https://data-api.ecb.europa.eu/service/data/EXR/D.USD+PLN+CZK+HUF+RON.EUR.SP00.A?lastNObservations=1&format=csvdata) |
| 13 | **Norma-prijslijst (EXPERT 6.390 / 5.590; 365 2.590–2.990; STANDARD 3.390 / 1.590; Miara PRO 2.190 / 890; Intercenbud 1.190; CAD 790; AthBIM 490 — alles netto)** | ✅ **Bevestigd**, met twee omissies | Alle genoemde bedragen kloppen. **Ontbrak:** de derde abonnementstrap **Norma EXPERT 365 Profesjonalny à 3.790 PLN/jaar**. **Misleidend:** "overstap vanaf Norma PRO 1.990" — dat is de prijs naar **Norma STANDARD**; naar Norma EXPERT kost de overstap **2.990** (of 3.990 incl. Intercenbud). 50% hoger dan gerapporteerd. | [unilogic.pl/pliki/cenniki/cenniknorma.htm](https://www.unilogic.pl/pliki/cenniki/cenniknorma.htm) |
| 14 | **"Norma PRO is uitgefaseerd"** | ✅ **Bevestigd + gepreciseerd** | Athenasoft heeft Norma PRO **per 1 januari 2023** uit de verkoop genomen en de ontwikkeling gestaakt; gebruikers worden naar Norma EXPERT geleid. Die datum ontbrak in het rapport en maakt de gedwongen migratie een lopend feit. | Poolse resellerpagina's, o.a. [programy-do-kosztorysowania.pl](https://www.programy-do-kosztorysowania.pl) |
| 15 | **Project Plan 3 vanaf 151,38 PLN/maand** | ⚠️ **Onzeker** | De notering bestaat en is bevestigd, maar het is een **Ceneo-prijsvergelijkernotering voor een maandelijkse retailabonnement** (bruto), niet Microsofts lijstprijs bij jaarverplichting. Microsoft publiceert de Plan-prijzen op geen van zijn Poolse Project-pagina's. Het rapport codeerde deze prijs in §5.1 als ⚠️ maar in §3.3 als ✅ — inconsistent, en de EUR 427/jaar is bruto berekend (netto ≈ EUR 342). | [ceneo.pl/140247159](https://www.ceneo.pl/140247159) |
| 16 | **Primavera P6: $175/gebruiker/maand; perpetual $3.500–7.000; korting 30–50%** | ⚠️ **Onzeker — blijft onbevestigd** | Niet weerlegd, maar ook niet onafhankelijk te bevestigen. Elke vindplaats is een aggregator (contractorsandbuilders, vendorbenchmark, pricingnow, itqlick) die elkaar overschrijft; er is **geen enkele primaire Oracle-bron**. De ❓-codering is terecht en de afgeleide "EUR 1.200–1.800 netto/seat/jaar" blijft een aanname. *(Wel gecorrigeerd: $2.100/jaar = **EUR 1.846**, niet EUR 1.930.)* | aggregators; geen primaire bron gevonden |
| 17 | **TotalSoft: >600 Primavera-klanten, >5.000 gecertificeerde specialisten** | 🔴 **Gecorrigeerd — gedateerd** | De claims bestaan, maar staan **niet** op de huidige totalsoft.ro/primavera-pagina. Ze zijn traceerbaar naar handelspers van **circa 2007–2011** — de "5.000 specialisten" letterlijk in een artikel van **5 mei 2011**. Het zijn dus ~15 jaar oude cumulatieve cijfers, niet een actuele installed base. De kruiscontrole in §3.2 ging daar al terecht vanuit. | [finantare.ro, 05-05-2011](https://www.finantare.ro/totalsoft-intra-pe-piata-de-retail.html) · plandeafacere.ro · marketwatch.ro |
| 18 | **"MS Project is in Polen contractueel voorgeschreven"** (§1.1, §4.1, §6.1, §8) | 🔴 **Niet aangetoond — de zwakste schakel** | De voetnoot verwees naar een **DuckDuckGo-zoekopdracht-URL**, niet naar een document. Het letterlijke citaat *"opracowany w Microsoft Office Project"* levert **nul zoekresultaten** op. Ook varianten leverden niets op. Zoekmachine-dekking van Poolse PDF-aanbestedingsdossiers is slecht, dus dit bewijst niets tegen — maar het bewijst ook niets vóór, en het rapport noemde dit *"de meest bepalende vondst"*. Afgezwaakt tot hypothese in §1, §4.1 en §6.1. | citaat niet reproduceerbaar |
| 19 | **FIDIC sub-clause 8.3: 28 dagen indienen / 21 dagen bezwaar** | ✅ **Bevestigd** | Standaardtekst FIDIC Red Book 1999 sub-clause 8.3, onafhankelijk teruggevonden. | FIDIC 1999 Red Book, sub-clause 8.3 |
| 20 | **"Sub-clause 8.8 koppelt boetes aan indieningstermijnen van het programma"** | 🔴 **Weerlegd** | In FIDIC 1999 is 8.7 *Delay Damages* en **8.8 *Suspension of Work***; 8.6 is *Rate of Progress*, 8.9 *Consequences of Suspension*. In de editie 2017 is 8.8 wél *Delay Damages*, maar ook daar gekoppeld aan te late **oplevering**, niet aan programma-indiening. Boetes op te late indiening bestaan in Polen wel, maar in de Warunki Szczególne van de opdrachtgever — opdrachtgeverbeleid, geen FIDIC-norm. | FIDIC 1999 Red Book, clausulelijst clause 8 |
| 21 | **"Roemenië: Gantt is wettelijk verankerd / verplicht onderdeel van de technische offerte"** | 🔴 **Gecorrigeerd** | De ANAP-notificatie **van 10 oktober 2018 bestaat** ✅, maar heet *"...aspectele care trebuie avute în vedere **în situația utilizării** graficului de execuție drept cerință..."* — richtsnoer voor aanbestedende diensten **die ervoor kiezen** een Gantt te eisen, geen algemene plicht. De notificatie waarschuwt zelfs tegen onrealistische eisen als "practică defectuoasă". Genormeerde praktijk, geen wettelijke markt-trigger. | [avocat-achizitii-publice.ro](https://avocat-achizitii-publice.ro/2019/02/utilizarea-graficului-gantt-drept-cerinta-aferenta-modului-de-intocmire-a-propunerii-tehnice-pentru-contractele-de-lucrari/) *(anap.gov.ro geeft HTTP 503 en is niet gearchiveerd)* |
| 22 | **"MS Project is #1 in alle vijf de landen, met afstand"** | ⚠️ **Onzeker — niet toetsbaar** | Geen marktaandeeldata gevonden, in lijn met wat het rapport **zelf** in §9.8 toegeeft ("harde marktaandeelpercentages bestaan niet publiek"). §4.1 en §9.8 spreken elkaar dus tegen. De rangorde is plausibel op indirecte signalen, maar "met afstand" is niet houdbaar. Afgezwakt tot 🔶. | intern; geen bron gevonden |
| 23 | **"Asta Powerproject: vrijwel nihil in de CEE-5"** | 🔴 **Deels weerlegd** | De distributie-bevinding klopt: geen reseller in PL/CZ/SK/HU/RO; de dichtstbijzijnde Powerproject-partner, **Prime PMO**, zit in Ankara met kantoren in Dubai en Tasjkent — TR/MENA/Centraal-Azië, niet CEE. **Maar Elecosoft publiceert een eigen Poolse referentiecase:** Gülermak zette Asta Powerproject in voor de centrale verlenging van **metrolijn 2 Warschau** (~EUR 900 mln, consortium AGP Metro Polska). Het pakket is dus wel degelijk op een groot Pools infraproject gebruikt. "Geen kanaal" ≠ "geen aanwezigheid". | [eleco.com/stories/gulermark-warsaw](https://eleco.com/stories/gulermark-warsaw/) · [primepmo.com](https://primepmo.com/) |
| 24 | **ProjectLibre: >8,2 mln downloads, 1.700 universiteiten** | ✅ **Bevestigd** | Letterlijk op de leverancierspagina: *"downloaded 8,200,000 times on all 7 continents and 193 countries"* en *"used at over 1,700 Universities around the world"*. Het blijft een **zelfclaim** zonder onafhankelijke telling — passend bij ✅ "rechtstreeks van de leverancier", niet bij "onafhankelijk geverifieerd". | [projectlibre.com](https://www.projectlibre.com/projectlibre-desktop/) |
| 25 | **Werkgelegenheid Polen ~1,0 mln (gitnux) / Tsjechië 215.000** | 🔴 **Gecorrigeerd** | Polen: **1.146.998 werkzame personen** in NACE F (2023) — de gitnux-schatting was ordegrootte-correct maar ~13% te laag. Tsjechië: **415.010**, niet 215.000. Het rapport bevatte hier twee eigen cijfers die elkaar met factor 2 tegenspraken (215.000 én "7,72% van 5,4 mln" = 416.880); Eurostat beslist ten gunste van de tweede. De 215.000 is vermoedelijk een smallere reeks (werknemers bij grotere bouwbedrijven). | [Eurostat `sbs_ovw_act`](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/sbs_ovw_act?format=JSON&geo=CZ&nace_r2=F&time=2023) |
| 26 | **"MSP Professional ≈ een maandsalaris van een junior planningsengineer"** | ⚠️ **Onzeker — overdreven** | GUS-gemiddelde brutoloon ondernemingssector juni 2026: **9.401,58 PLN**. De netto licentieprijs (5.771,54) is daarmee **0,61 maandsalaris**, bruto 0,76. Voor een bovengemiddeld betaald ingenieursberoep nog minder. Reken op **een halve tot driekwart maandsalaris**. *(De parallelle claim voor P6 in Tsjechië — EUR 1.846/jaar vs. EUR 1.781 maandloon — houdt wél stand, maar nipt.)* | [GUS via TVN24, juni 2026](https://tvn24.pl/biznes/dla-pracownika/dane-gus-przecietne-zarobki-i-zatrudnienie-w-czerwcu-2026-roku-st9149744) |
| 27 | **Aantal bouwondernemingen (zelfbenoemd kennisgat §9.1/§9.2)** | ✅ **Alsnog opgelost** | PL 421.178 · CZ 201.528 · SK 136.769 · HU 123.796 · RO 104.927 (NACE F, 2023). Het gat was geen databeschikbaarheidsprobleem maar een zoekmethodeprobleem. | [Eurostat `sbs_ovw_act`](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/sbs_ovw_act?format=JSON&nace_r2=F&time=2023) |

### Wat níet weerlegd kon worden

Eerlijkheidshalve: de volgende kernbeweringen zijn **aangevallen maar overeind gebleven**, en verdienen daarom meer vertrouwen dan voorheen —

- Het **lege middensegment** tussen MS Project en Primavera P6 (§4.4). Ondanks gerichte pogingen is er geen distributiekanaal voor Asta, TILOS, SYNCHRO, ALICE, nPlan of Nodes & Links in de CEE-5 gevonden. De enige tegenvondst (Warschau-metro) is projectgebruik zonder lokaal kanaal — wat het argument eerder versterkt dan verzwakt.
- Het **calculatie-eerst-karakter** van het lokale ecosysteem (§4.3). Alle prijs- en productbewijzen die opnieuw zijn opgehaald (Norma, TERC, KROS) bevestigen dat de normdatabase het product is en planning een bijproduct.
- **Prijs als hefboom** (§5.5). De omvang was overdreven, de richting niet: Polen betaalt netto ruim een derde méér dan de VS voor hetzelfde perpetuele product, bij structureel lagere lonen.

### Wat dit betekent voor het gebruik van dit rapport

Gebruik §4 (wie is er, wie niet), §6 (lokale bijzonderheden, met de correcties op §6.1 en §6.2) en §7 (voor/nadelen) als werkmateriaal — die zijn robuust. Gebruik **§2.1 en §3.3 niet zonder de correcties hierboven**, en citeer geen enkel marktomvangcijfer zonder de maatstaf erbij. De twee beweringen waarop het rapport zijn go-to-market-verhaal bouwde — Poolse MSP-contractdwang en Roemeense Gantt-plicht — zijn allebei **zwakker dan gepresenteerd** en moeten worden hardgemaakt met echte aanbestedingsdossiers voordat er commerciële beslissingen op worden gebaseerd.
