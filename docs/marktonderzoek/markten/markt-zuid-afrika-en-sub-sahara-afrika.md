# Marktonderzoek: projectplanning- en schedulingsoftware in Zuid-Afrika en Sub-Sahara Afrika

**Regio:** Afrika (focus Zuid-Afrika + Sub-Sahara Afrika; met aparte landenparagrafen voor Nigeria, Kenia, Ghana en Egypte)
**Scope:** software voor projectplanning/scheduling met Gantt en CPM — bouwspecifiek, algemeen en lokaal
**Onderzoeksdatum:** 25 juli 2026
**Opgesteld voor:** Open Planner Studio (OpenAEC-Foundation)

---

## Leeswijzer bij bronvermelding en betrouwbaarheid

Bij elk cijfer staat een bron-URL. Omdat de betrouwbaarheid sterk uiteenloopt, gebruik ik consequent drie markeringen:

| Markering | Betekenis |
|---|---|
| **[G]** | **Geverifieerd** — de bronpagina/het PDF is direct opgehaald en de tekst is gelezen. |
| **[S]** | **Snippet** — via zoekmachine-snippet of secundaire vermelding; de bronpagina zelf blokkeerde (403/503) of toonde het cijfer alleen achter een paywall. Behandel als indicatief. |
| **[E]** | **Eigen schatting** — mijn berekening/redenering, met de redenering expliciet erbij. Geen bron; wel navolgbaar. |

**Belangrijke methodologische waarschuwing vooraf.** Er bestaat *geen* publieke, betrouwbare marktstudie die specifiek "CPM/Gantt-schedulingsoftware in Sub-Sahara Afrika" meet. Wat wél bestaat zijn (a) brede "project management software"- en "PPM"-rapporten van marktonderzoeksbureaus met sterk uiteenlopende definities en onderling onverenigbare cijfers, en (b) losse vendor- en tenderdocumenten. Ik heb daarom een eigen bottom-up raming gemaakt (§3.3) en die expliciet afgezet tegen de top-downcijfers, inclusief waar ze botsen.

Voor de vendorprijzen geldt: **vrijwel geen enkele relevante leverancier publiceert lijstprijzen voor Afrika.** Oracle, RIB, Deswik, RPMGlobal en Elecosoft werken allemaal met "vraag een offerte"-modellen. De prijzen in dit rapport komen daarom uit resellers, reviewsites, aggregators, tenderdocumenten en één zeer bruikbare Zuid-Afrikaanse consultant-review. Ze zijn indicatief, niet contractueel.

---

## 1. Samenvatting

### 1.1 Kernbevindingen

1. **De hypothese klopt waarschijnlijk: RIB Candy (voorheen CCS) is in Zuid-Afrika de facto de standaard voor bouwaannemers — maar het "academische" bewijs is zwakker dan hieronder oorspronkelijk gesteld.** Smallwood & Allen (Nelson Mandela University, ISEC 2018) schrijven letterlijk: *"it was decided to align the department with the most widely used planning and estimating package in the South African construction industry, namely CCS Candy"* **[G, brontekst zelf uitgelezen — zie §10]**. Dat is uitzonderlijk: Zuid-Afrika is een van de weinige markten wereldwijd waar het *calculatiepakket* ook het *planningspakket* is, omdat Candy tijd en geld in één datamodel koppelt.
   > **Verificatiecorrectie.** De zin staat in de *inleiding* van een paper over studentpercepties van een cursus, niet in een marktonderzoek; hij is niet van een bronverwijzing voorzien en berust op de inschatting van de auteurs. Het is dus **een deskundige assertie, geen gemeten marktaandeel**. De oorspronkelijke formulering "academisch onderbouwd, niet alleen marketing" overdreef het bewijsgewicht. Ook de Capterra-score (4,5/5 over 252 reviews) is géén ZA-marktaandeelbewijs: Capterra aggregeert wereldwijde reviews op zijn landendomeinen. De conclusie *dat* Candy dominant is bij ZA-aannemers blijft plausibel (drie onafhankelijke signalen: universitair curriculum, eigen kantorennet, distributiedekking), maar er bestaat **geen gemeten marktaandeelcijfer** voor deze markt.

2. **Maar Candy's dominantie is asymmetrisch.** Bij aannemers (tender → eindafrekening) domineert Candy. Bij *opdrachtgevers* — Eskom, Transnet, mijnbouwhuizen, internationale EPC's — domineert Primavera P6, en die opdrachtgevers **schrijven P6 contractueel voor**. Eskom's aanbestedingsdocumenten stellen: *"The contractor shall submit the Programme on the Eskom approved planning tool (Primavera P6)"* **[S]** ([tenderbulletin.eskom.co.za](https://tenderbulletin.eskom.co.za/webapi/api/Files/GetFile?FileID=349035)). Veel Zuid-Afrikaanse aannemers draaien daarom *dubbel*: Candy intern voor kosten/tijd, P6 extern voor de klant.

3. **Mijnbouw is een aparte, veel duurdere markt.** Deswik (sinds april 2022 onderdeel van Sandvik **[G]**) noemt Johannesburg zijn *"first international office since its opening in 2007"* — **maar dat cijfer is aantoonbaar problematisch: Deswik's eigen "About us" geeft 2008 als oprichtingsjaar, dus het kantoor zou de onderneming een jaar vóórdateren** (zie verificatienoot in §10). Daarnaast zijn RPMGlobal, Datamine en het Zuid-Afrikaanse MineRP actief. Hier gaat het niet om Gantt-planning maar om geïntegreerde mijnplanning-met-scheduling; licentieprijzen liggen een orde van grootte hoger (voorbeeld uit een openbaar tenderdocument: US$ 15.755,56 voor 12 maanden Deswik.Spatial **[S]**).

4. **Chinese aannemers zijn het grootste blinde vlak in de markt.** Ze zijn commercieel dominant — China-Africa Research Initiative: **US$ 40 miljard** bruto-omzet van Chinese engineering-/bouwbedrijven in Afrika in 2024, en >60% van de omzet van internationale aannemers in Afrika al in 2019 **[S]**. Maar ze kopen nauwelijks westerse planningssoftware: ze werken met eigen/Chinese systemen (Glodon/Cubicost voor kosten, interne ERP) en gebruiken P6 alleen als de opdrachtgever (Wereldbank, AfDB, olie & gas) het eist. **Dit betekent dat de commerciële softwaremarkt véél kleiner is dan de bouwmarkt suggereert.**

5. **Prijzen zijn een structureel probleem, niet een detail.** Alle serieuze pakketten zijn in USD/EUR/GBP geprijsd; alle omzet is in ZAR, NGN, KES, GHS, EGP. De naira ging van ₦768/$ (juli 2023) naar ₦1.609/$ (juli 2024) **[S]** — een softwarelicentie werd in lokale valuta ruim twee keer zo duur zonder dat er iets veranderde. Gevolg: Excel blijft alomtegenwoordig, informele/ongelicentieerde installaties zijn normaal (Zuid-Afrika 32% ongelicentieerd volgens BSA 2018 **[S]**, Sub-Sahara Afrika materieel hoger), en gratis/goedkope tools winnen aan de onderkant.

6. **Er is een echte, jonge laag lokale pakketten** — Wakha (ZA), Strukchad (KE), Konstrukt/Kólé/Pathscape (NG), Kuadra/Fareeqy (EG). Vrijwel geen daarvan heeft serieuze CPM/Gantt-functionaliteit; ze concurreren op compliance (CIDB, B-BBEE, NHBRC), lokale valuta, taal en prijs — niet op planningsalgoritmiek. **Dat is precies het gat.**

### 1.2 Kerncijfers in één oogopslag

| Metriek | Waarde | Jaar | Markering |
|---|---|---|---|
| Bouwomzet Zuid-Afrika | R 605,6 mrd | 2024 | [S] |
| Aandeel bouw in ZA-BBP (GVA) | 2,4% (was 3,9% tien jaar eerder) | 2024 | [S] |
| CIDB-geregistreerde aannemers (graad 2–9) | 21.331 | Q4 2024 | [S] |
| CESA-lidfirma's / werknemers / honorarium | 520+ / 23.550+ / R 23,4 mrd p.j. | ~2023 | [S] |
| Mijnbouwomzet Zuid-Afrika (geannualiseerd) | ± R 1,1 biljoen | 2025 | [S] |
| Bouwmarkt Afrika totaal | US$ 240,55 mrd → US$ 363,03 mrd (2031), 7,1% CAGR | 2025 | [S] |
| Omzet Chinese aannemers in Afrika | US$ 40 mrd | 2024 | [S] |
| PPM-softwaremarkt Zuid-Afrika | US$ 126,9 mln → US$ 279,3 mln (2029), 17,1% CAGR | 2024 | [G] |
| PM-softwaremarkt Zuid-Afrika | US$ 284,8 mln (2030), 15,4% CAGR | 2030 | [S] |
| PPM-markt Midden-Oosten & Afrika | US$ 638,5 mln (2030), 15,8% CAGR | 2030 | [S] |
| **CPM/Gantt-schedulingsoftware ZA (eigen raming)** | ~~US$ 22–38 mln p.j.~~ → **US$ 17–25 mln p.j.** na verificatie | 2025/26 | **[E]** |
| **Idem, hele SSA + Egypte (eigen raming)** | ~~US$ 45–75 mln p.j.~~ → **± US$ 40–73 mln p.j.**, centraal ± US$ 50 mln | 2025/26 | **[E]** |
| **Toegewijde planners ZA (eigen raming)** | **3.000–6.000** | 2026 | **[E]** |
| **Toegewijde planners SSA + Egypte (eigen raming)** | **15.000–32.000** ⟵ *gecorrigeerd; stond 15.000–30.000, terwijl de tabel in §3.4 tot 32.400 sommeert* | 2026 | **[E]** |

### 1.3 Rangorde per pakket (Zuid-Afrika + SSA)

Onderstaande rangorde is **[E]** — mijn synthese uit alle onderstaande bronnen, niet één gemeten cijfer. Ik geef per pakket aan waarop het oordeel rust.

| # | Pakket | Positie in ZA | Positie rest SSA | Belangrijkste gebruikersgroep |
|---|---|---|---|---|
| 1 | **RIB Candy** | Dominant bij aannemers | Sterk maar tweede (via HMS Africa/RIB-distributeurs, 11 landen) | Aannemers, QS'ers, calculatoren |
| 2 | **Oracle Primavera P6 / OPC** | Dominant bij opdrachtgevers, mijnbouw, EPC | **Dominant**, vooral olie & gas en donorprojecten | Opdrachtgevers, SOE's, EPC's, mijnbouw, oil & gas |
| 3 | **Microsoft Project** | Zeer breed, ondiep | Zeer breed, ondiep | Ingenieursbureaus, PMO's, kleine aannemers, overheid |
| 4 | **Excel** (geen software­markt, wél concurrent) | De facto #1 op stuks | De facto #1 op stuks | Iedereen onder een bepaalde projectomvang |
| 5 | **Mijnbouwstack** (Deswik, RPMGlobal, MineRP, Datamine) | Dominant binnen mijnbouw | Dominant binnen mijnbouw (Zambia, DRC, Ghana, Tanzania) | Mijnplanners |
| 6 | **Elecosoft Asta Powerproject** | Klein maar in opkomst (reseller sinds sept. 2025) | Marginaal | Bouw, infra, mijnbouw — nieuwe instap |
| 7 | **Chinese/interne systemen** | N.v.t. | Materieel groot in *gebruik*, ~nihil in *inkoop* | Chinese aannemers |
| 8 | **Algemene tools** (monday, Smartsheet, Asana, Jira, Wrike) | Groeiend, buiten harde CPM | Groeiend | IT/PMO/kantoor, niet site-planning |
| 9 | **InEight, Safran, Deltek, SYNCHRO, TILOS, ALICE, Nodes & Links, Spider** | Nichespelers, nét beginnend | Vrijwel afwezig | Grote capital projects, schedule-assurance |
| 10 | **Lokale pakketten** (Wakha, Strukchad, Konstrukt, Kuadra, …) | Opkomend, zonder CPM-diepte | Opkomend | KMO-aannemers, ontwikkelaars |
| 11 | **Open source** (ProjectLibre, GanttProject, OpenProject) | Studenten, KMO, ad hoc | Idem | Onderwijs, KMO, NGO's |

---

## 2. Waarom deze markt anders is dan Europa

Vier structurele verschillen die alles verklaren:

**(a) Het calculatiepakket is het planningspakket.** In Europa zijn calculatie (bijv. Bricsys/IBIS/Nemetschek) en planning (MS Project/Asta/P6) gescheiden werelden. In Zuid-Afrika niet. RIB Candy bevat Quantity Takeoff, Estimating, **Planning (CPM-netwerk)**, Forecasting, Cash Flow, Valuations, Subcontract Manager en Cost & Allowables in één pakket, en RIB verkoopt de modules **niet los** **[G]** ([rib-software.com/en/rib-candy](https://www.rib-software.com/en/rib-candy); [lerouxconsulting.co.za](https://lerouxconsulting.co.za/is-ccs-candy-construction-software-right-for-you)). De verkoopargumenten zijn dan ook expliciet de *koppeling* tussen tijd en geld — RIB beschrijft de Planning-module als *"critical path network scheduling that seamlessly links time and money"* **[G]**.

Gevolg voor een nieuwe speler: een puur planningspakket concurreert in Zuid-Afrika niet met "de planningsmodule van Candy", maar met "de reden waarom het bedrijf überhaupt Candy heeft".

**(b) De opdrachtgever schrijft het gereedschap voor.** Zie §6.1. Dat maakt P6 niet-substitueerbaar op precies de projecten waar het geld zit.

**(c) De valuta werkt structureel tegen de leverancier.** Zie §6.5.

**(d) Opleiding is een parallelle markt, geen bijproduct.** Er bestaat een uitgebreide, deels informele opleidingsindustrie rond P6 en Candy, met certificaten die direct arbeidsmarktwaarde hebben. Nelson Mandela University heeft een gecertificeerde tweedaagse CCS Candy-cursus ingebed in de BSc (Construction Studies) **[G]**. Zie §6.4.

---

## 3. Marktomvang

### 3.1 De onderliggende bouw-, engineering- en mijnbouwmarkt

Dit is de basis waarop elke softwareraming rust.

**Zuid-Afrika**
- Bouwomzet 2024: **R 605,6 mrd**, gemiddeld +8,9% per jaar — Stats SA Construction Industry Survey, via Business Day **[S]** (zie §8, bron B1).
  > **Verificatie: bevestigd, met drie preciseringen [G].** Stats SA's Construction Industry Survey rapporteert **R 605,6 mrd totale inkomsten in 2024**, een **geannualiseerde** stijging van 8,9% ten opzichte van **R 430,8 mrd in 2020** — dus een vierjaars-CAGR, géén jaar-op-jaargroei; presenteer "+8,9% per jaar" niet als recente groeivoet. De survey dekt boekjaren die eindigen tussen 1 juli 2023 en 30 juni 2024 op een steekproef van ± 3.200 btw-plichtige ondernemingen. Nieuw en bruikbaar: de sector telt **539.056 werknemers**, en grote ondernemingen (omzet > R 182 mln) leveren **43,0% van de omzet met 21,4% van het personeel**. Het BBP-aandeel van 2,4% (was 2,5% in 2023, 3,9% tien jaar eerder) is eveneens bevestigd. **Sanity check op §3.4:** 3.000–6.000 toegewijde planners is 0,6–1,1% van 539.056 werknemers, en 25.000–45.000 occasionele gebruikers is 4,6–8,3% — beide plausibel voor een sector die overwegend uit uitvoerend personeel bestaat. De planner-raming voor Zuid-Afrika wordt hierdoor **niet weerlegd**.
- Aandeel bouw in het BBP (GVA): **2,4% in 2024**, gedaald van 2,5% in 2023 en 3,9% tien jaar eerder; bouw-GVA kromp in 2024 met −5,1%, het achtste krimpjaar op rij **[S]**.
- Vaste investeringen in bouwwerken: **R 108 mrd geannualiseerd in Q1 2025** (−2,3% j-o-j) **[S]** ([propertywheel.co.za](https://propertywheel.co.za/2025/09/cidb-grade-9-contractors-surge-39-since-2023-amid-lower-tender-opportunities/)).
- **CIDB-register: 21.331 aannemers in graden 2–9 (Q4 2024)** **[S]**; het volledige register (inclusief graad 1) telt >120.000 actief geregistreerde aannemers **[S]** ([portal.cidb.org.za](https://portal.cidb.org.za/RegisterOfContractors/)). Graad 9 (de grootste categorie) groeide met 39% sinds 2023 — 296 graad-9CE-aannemers per mei 2025 **[S]**.
- Prognose: markt naar **R 195,4 mrd in 2030**, CAGR 3,9% (2025–2029) volgens GlobalData/BusinessWire **[S]**; let op dat dit een *andere* definitie is dan de R 605,6 mrd bouwomzet — waarschijnlijk output-waarde van een deelsegment. **De twee cijfers zijn niet vergelijkbaar; gebruik ze niet naast elkaar.**
- Consulting engineering: **520+ CESA-lidfirma's, 23.550+ werknemers, R 23,4 mrd jaarlijks honorarium** **[S]** ([cesa.co.za](https://www.cesa.co.za/becs/)). Bedrijfsvertrouwen daalde in juli–dec 2023 met 22% naar 32 — het laagste sinds 2019 **[S]**.
- Mijnbouw: ±6% van het BBP, **±R 1,1 biljoen geannualiseerde omzet in 2025**; de Minerals Council vertegenwoordigt 66 leden ≈ 90% van de jaaromzet **[S]** ([mineralscouncil.org.za](https://www.mineralscouncil.org.za/industry-news/publications/facts-and-figures)).

**Belangrijk signaal:** de Zuid-Afrikaanse bouwsector *krimpt* structureel als aandeel van de economie. De softwaremarkt groeit desondanks (zie §3.2) doordat digitalisering en compliance-eisen per project toenemen — maar dit is geen markt die meelift op volumegroei.

**Afrika breed**
- Afrikaanse bouwmarkt: **US$ 240,55 mrd (2025) → US$ 363,03 mrd (2031), CAGR 7,1%** (Mordor Intelligence) **[S]**.
- Let op de spreiding tussen bureaus: NextMSC US$ 232,08 mrd (2025) met 0,7% CAGR; Verified Market Research US$ 266,75 mrd (2024) met 6,7%; Research and Markets US$ 61,09 mrd (2025) met 4,83% **[S]**. Market Data Forecast noteert "US$ 241,03 **million**" (2025) — evident een eenheidsfout in de bron. **Deze spreiding (factor 4) illustreert precies waarom ik in §3.3 zelf reken.**
- Chinese aannemers: **US$ 40 mrd bruto-omzet uit engineering & construction in Afrika in 2024** (China Africa Research Initiative) **[S]**; ze werden in 2006 het grootste herkomstland van internationale aannemers in Afrika en hadden in 2019 al >60% van de omzet van internationale aannemers **[S]**.

**Landen (kort; details in §5)**
- Egypte: bouwmarkt **US$ 48,67 mrd (2025) → US$ 70,27 mrd (2031), CAGR 6,31%** (Mordor) **[S]**; andere bureaus tot US$ 74,42 mrd (2024, BlueWeave) **[S]**.
- Kenia: **KES 1,02 biljoen in 2025**, +7,5% p.j. tot 2030 (GlobalData/BusinessWire) **[S]** ≈ US$ 7,9 mrd bij ±KES 129/USD **[E]**.
- Nigeria: geen betrouwbaar totaalcijfer gevonden. Ter ijking: Julius Berger Nigeria Plc, de grootste aannemer, heeft **₦ 1,081 biljoen** balanstotaal (± US$ 726 mln) en ₦ 31,11 mrd winst na belasting in 2025 **[S]**.

### 3.2 Top-down: wat marktonderzoeksbureaus zeggen

| Bron | Scope | Basisjaar | Waarde | Prognose | CAGR |
|---|---|---|---|---|---|
| MarketsandMarkets **[G]** | Zuid-Afrika PPM-software | 2024 | **US$ 126,9 mln** | US$ 279,3 mln (2029) | 17,1% |
| Grand View Research **[S]** | Zuid-Afrika PM-software | — | — | **US$ 284,8 mln (2030)** | 15,4% |
| Bonafide Research **[S]** | Zuid-Afrika PM-software | — | — | — | >22,6% (2026–31) |
| Grand View Research **[S]** | **MEA** PPM | — | — | **US$ 638,5 mln (2030)** | 15,8% (2025–30) |
| Cognitive Market Research **[S]** | **MEA** PM-software | 2024 | **US$ 143,02 mln** | — | 15,7% (2024–31) |
| 6Wresearch **[G]** | Afrika PM-software (ZA/EG/NG/rest) | 2021–2031 | *achter paywall* | — | — |

Bron-URL's: [MarketsandMarkets ZA PPM](https://www.marketsandmarkets.com/Market-Reports/geography/project-portfolio-management-software-market/south-africa) · [Grand View ZA PM](https://www.grandviewresearch.com/horizon/outlook/project-management-software-market/south-africa) · [Grand View MEA PPM](https://www.grandviewresearch.com/horizon/outlook/project-portfolio-management-market/mea) · [6Wresearch Afrika PM](https://www.6wresearch.com/industry-report/africa-project-management-software-market)

**Wat hier fout aan is, en waarom ik deze cijfers niet direct gebruik:**

1. **De MEA-cijfers zijn Golf-gewogen.** Saoedi-Arabië en de VAE (NEOM, Expo-nasleep, Vision 2030) domineren MEA-PPM. Afrika's aandeel binnen MEA schat ik op **15–25%** **[E]** op basis van relatieve bouwuitgaven en IT-bestedingen per hoofd. Grand View's US$ 638,5 mln MEA (2030) impliceert dan **US$ 95–160 mln voor heel Afrika in 2030** **[E]**.
2. **"PPM" ≠ "CPM-scheduling".** PPM omvat portfoliobeheer voor BFSI, telecom, overheid en IT. MarketsandMarkets noemt zelf als grootste afnemers *"financial services, telecommunications, and public sector"* en als sleutelvendors Microsoft, Oracle, SAP, ServiceNow, Asana en monday.com **[G]** — dat is grotendeels *niet* onze markt. Het bouw-/engineering-/mijnbouwsegment met echte CPM-behoefte schat ik op **20–30%** van het PPM-totaal **[E]**.
3. **Cognitive's US$ 143,02 mln voor héél MEA (2024) is onverenigbaar** met MarketsandMarkets' US$ 126,9 mln voor alleen Zuid-Afrika (2024). Minstens één van beide is fout of definieert iets heel anders. Ik hecht meer waarde aan MarketsandMarkets omdat de pagina zelf leesbaar was en intern consistent (segmentatie, verticals, vendorlijst).
4. **Bonafide's >22,6% CAGR** is een uitschieter zonder onderbouwing; ik negeer die.

**Top-downafgeleide voor onze markt:**
- Zuid-Afrika: 20–30% van US$ 126,9 mln (2024) = **US$ 25–38 mln** **[E]**.
- Heel Afrika (2030-basis teruggerekend): 20–30% van US$ 95–160 mln = US$ 19–48 mln in 2030 — **dit botst met de Zuid-Afrikaanse cijfers** en bevestigt dat de MEA/Afrika-rapporten Afrika onderschatten of Zuid-Afrika overschatten. Ik gebruik ze daarom alleen als ondergrens-sanity check.

### 3.3 Bottom-up: eigen raming **[E]**

Ik bouw de raming op vanaf zetels en effectieve jaarprijzen. Alle aannames staan expliciet.

**Anker 1 — de RIB CCS-overname geeft een harde omzetindicatie.**
RIB Software kocht in juli 2019 **70% van CCS voor US$ 31,5 mln (R 444 mln), tegen een multiple van 8,5× EBIT/DA**; EOH hield 30% **[S]** (zie §8, bron C3). Terugrekenend: 100% ≈ US$ 45 mln ondernemingswaarde → EBITDA ≈ **US$ 5,3 mln**. Bij een softwaremarge van 25–35% impliceert dat **US$ 15–21 mln wereldwijde CCS-omzet in 2018/19** **[E]**.

> **Verificatie van dit anker.** De transactiefeiten zijn **bevestigd**: EOH Mthombo verkocht 70% van CCS aan RIB Limited voor **R 444,39 mln** (± US$ 31 mln), **8,5× EBITDA**, waarvan 90% (R 399,95 mln) contant en 10% als retentie. De ambiguïteit "EBIT/DA" kan dus worden opgelost: het is **EBITDA**. De impliciete koers R 444,39 mln ÷ US$ 31,5 mln = **R 14,11/USD**, wat exact past bij juli 2019 — de conversie is intern consistent. De EBITDA-afleiding klopt ook: 444,39 ÷ 0,7 = R 634,8 mln ÷ 8,5 = R 74,7 mln = **US$ 5,29 mln**. ✔
>
> **Maar de stap van EBITDA naar omzet is de zwakste schakel van het hele rapport en de gepubliceerde band is te smal.** Drie bezwaren: (a) 8,5× EBITDA is een **laag** multiple voor software — dat signaleert een lage-groei-, dienstenzware business, wat doorgaans correleert met een **lagere** marge dan 25–35%; bij 20% marge is de omzet US$ 26 mln, bij 40% US$ 13 mln. Een eerlijke band is **US$ 13–27 mln**, niet US$ 15–21 mln. (b) 8,5× toegepast op een aandelenprijs levert *equity value*, niet *enterprise value*; zonder de netto schuld-/kaspositie van CCS is de gelijkstelling "US$ 45 mln ondernemingswaarde" niet hard. (c) Daarna worden **drie** ongeverifieerde fracties op elkaar gestapeld (Afrika-aandeel 65–80% × Candy-aandeel 55–70% × ZA-aandeel 70–80%), samen een spreiding van 25%–45% van de wereldomzet. Het eindresultaat "US$ 5–12 mln Candy in ZA" heeft daardoor een reële onzekerheid van eerder een factor 3–4 dan de gesuggereerde factor 2. **Behandel Anker 1 als een orde-van-grootte-indicatie, niet als een "harde omzetindicatie".** CCS was toen actief in 50+ landen maar zwaar Afrika-gewogen; ik schat het Afrika-aandeel op 65–80% → **US$ 10–17 mln Afrika-omzet in 2019** **[E]**.

Sindsdien: prijsverhogingen en de overgang naar abonnementen verhogen de ZAR-omzet, maar de rand daalde. Netto schat ik RIB CCS' huidige Afrika-omzet (Candy + BuildSmart samen) op **US$ 12–22 mln p.j.** **[E]**. Candy is daarvan grofweg 55–70% → **US$ 7–15 mln voor Candy in Afrika** **[E]**, met Zuid-Afrika als 70–80% daarvan → **US$ 5–12 mln Candy in ZA** **[E]**.

> **Tweede verificatieronde — Anker 1 hoeft niet meer geschat te worden; RIB heeft de cijfers zelf gepubliceerd.** In RIB's eigen overname-communicatie aan beleggers (2 juli 2019) staat dat CCS **US$ 13,6 mln ARR** had en **>US$ 18 mln totale omzet voor 2019** verwachtte, bij een **EBITDA-marge van ± 30%**, met **160 medewerkers** en **± 40.000 gebruikers in 50 landen** **[G]**. Drie gevolgen:
> 1. **De omzetafleiding is bevestigd, niet verbreed.** US$ 18 mln × 30% = US$ 5,4 mln EBITDA ≈ R 76 mln — precies tussen de door de SENS gepubliceerde **werkelijke FY2018 adjusted EBITDA van R 78 mln** en de **forecast van R 74,7 mln** voor FY2019 **[G]** ([SENS 2 juli 2019](https://senspdf.jse.co.za/documents/SENS_20190702_S417023.pdf)). De oorspronkelijke band **US$ 15–21 mln is dus juist**; de correctie hierboven naar "US$ 13–27 mln" was overvoorzichtig. De SENS bevestigt ook dat de 8,5× is toegepast op *70% van de forecast adjusted EBITDA* — de rekenwijze in dit rapport klopt.
> 2. **Het Afrika-aandeel van 65–80% is WEERLEGD.** De overnamecommunicatie geeft de geografische verdeling expliciet: **Afrika ± 50% van de omzet, Midden-Oosten ± 30%**, rest VK/Portugal/India/Australië/Nieuw-Zeeland **[G]** ([Extranet Evolution, 2019](http://extranetevolution.com/2019/07/rib-buys-ccs-to-build-african-base/); [ME Construction News](https://meconstructionnews.com/35853/germanys-rib-software-acquires-70-stake-in-construction-computer-software-ccs)). Afrika was dus **± US$ 9 mln in 2019**, niet US$ 10–17 mln.
> 3. **De hele keten schuift daardoor omlaag.** US$ 9 mln × Candy-aandeel 55–70% = US$ 5,0–6,3 mln Afrika; × ZA-aandeel 70–80% = **US$ 3,5–5,0 mln Candy in Zuid-Afrika (2019)** — tegenover de gepubliceerde US$ 5–12 mln, dus een factor 1,5–2,4 te hoog. Zelfs met prijsverhogingen en abonnementsconversie sinds 2019, maar gecorrigeerd voor de randdepreciatie (R 14,11 → R 18/USD, −22% in USD), landt Candy-ZA realistisch op **US$ 4–8 mln p.j.**, niet op de US$ 6–13 mln uit de zetel­tabel hieronder. **Verlaag de Candy-rij dienovereenkomstig.**
>
> Terzijde, maar relevant voor de scope-discussie: zowel de SENS ("*a leading provider of **cost** and enterprise software solutions*") als RIB (Candy = "*cost estimation and project control*", "*No.1 in Africa*") beschrijven Candy **niet** als planningssoftware. Dat bevestigt de eigen kanttekening onderaan §3.3 dat het meerekenen van de volledige Candy-omzet als "planningssoftware" de markt overschat.

**Anker 2 — zetelramingen per pakket, Zuid-Afrika**

| Pakket | Geschatte zetels ZA | Effectieve prijs/zetel/jaar | Jaaromzet ZA |
|---|---|---|---|
| RIB Candy | 6.000–12.000 | ± R 18.000 (US$ 950–1.100) | **US$ 6–13 mln** |
| Primavera P6 / OPC / Unifier | 4.000–8.000 | US$ 700–1.100 geamortiseerd | **US$ 3–8 mln** |
| Microsoft Project (bouw-/engineering-relevant) | 8.000–15.000 | US$ 250–450 | **US$ 2–6 mln** |
| Mijnbouwscheduling (Deswik, RPM, MineRP, Datamine) | 600–1.500 | US$ 8.000–18.000 | **US$ 6–20 mln** |
| Asta, InEight, Safran, Deltek, SYNCHRO, overig | 300–800 | US$ 1.500–3.500 | **US$ 0,5–2 mln** |
| Lokale pakketten (Wakha, Eworks, …) | n.v.t. (per bedrijf) | R 1.500–7.000/mnd | **US$ 1–3 mln** |
| **Totaal Zuid-Afrika** | | | **US$ 19–52 mln, centrale schatting US$ 22–38 mln** |

> **Verificatiecorrectie op deze tabel (narekening).** Drie rijen reproduceren niet uit hun eigen invoer, en één rij bevat een scopefout:
> - **Mijnbouw:** 600–1.500 zetels × US$ 8.000–18.000 = **US$ 4,8–27 mln**, niet US$ 6–20 mln. De gepubliceerde band is stilzwijgend versmald.
> - **Mijnbouw, scopeconflict:** deze rij staat onder de kolomkop *"Geschatte zetels ZA"*, maar §4.5 gebruikt **exact dezelfde** 600–1.500 zetels voor **heel Afrika**. Eén van beide is fout; de kolomkop en de §4.5-formulering kunnen niet allebei kloppen. Omdat Zuid-Afrika naar schatting de helft van de Afrikaanse mijnplanning-zetels heeft, is de ZA-rij vermoedelijk ±2× te hoog en ligt de ZA-post realistischer op **US$ 3–12 mln**.
> - **MS Project:** 8.000–15.000 × US$ 250–450 = US$ 2,0–**6,75** mln (afgerond naar 6). **P6:** 4.000–8.000 × US$ 700–1.100 = US$ 2,8–8,8 mln (afgerond naar 3–8). Beide afrondingen zijn defensibel maar verkleinen de band.
> - **RIB Candy (tweede ronde):** de rij reproduceert wél uit haar eigen invoer (6.000–12.000 × US$ 950–1.100 = US$ 5,7–13,2 mln), maar botst met het enige harde vendorcijfer dat bestaat. Uit RIB's eigen overnamecijfers volgt Candy-ZA op **US$ 3,5–5,0 mln (2019)** → realistisch **US$ 4–8 mln nu** (zie de tweede verificatieblok bij Anker 1). Bij R 18.000/zetel impliceert dat **4.000–8.000 betaalde zetels**, niet 6.000–12.000. De ZA-post zakt hiermee nog eens ± US$ 2–5 mln.
> - **Cumulatief effect van beide correcties (mijnbouwscope + Candy):** het ZA-totaal komt uit op **US$ 17–25 mln** in plaats van US$ 22–38 mln, en het regiototaal op **± US$ 40–73 mln**. Dat ligt binnen de oorspronkelijk gepubliceerde kop van US$ 45–75 mln maar met een duidelijk **lagere centrale waarde: ± US$ 50 mln, niet US$ 55–60 mln.**

*Onderbouwing zetelaantallen:* 21.331 CIDB-aannemers graad 2–9 **[S]**; realistisch gebruikt 8–15% daarvan Candy actief, met 3–6 zetels per bedrijf → 5.000–19.000; ik neem 6.000–12.000 als redelijke band. P6-zetels: Eskom (Primavera geïmplementeerd 2011–2012 voor het kapitaalprogramma **[S]**), Transnet (lopende SaaS-tender voor de hele Primavera Suite incl. Unifier en Analytics, 3 jaar **[S]**), Sasol, de grote mijnbouwhuizen, EPC's en ±200+ openstaande P6-vacatures op één jobboard **[S]** wijzen op enkele duizenden actieve zetels. Effectieve P6-prijs: US$ 3.520 eeuwigdurend **[S]** over ~5 jaar afgeschreven + 22% support = ± US$ 1.480/jaar in jaar 1–5, dalend daarna; cloudmodules vanaf US$ 144/gebruiker/jaar per module **[S]**; blended US$ 700–1.100 is conservatief.

**Anker 3 — rest van Sub-Sahara Afrika**

Nigeria is de grootste niet-Zuid-Afrikaanse markt (olie & gas + federale infrastructuur), gevolgd door Kenia, Ghana, Tanzania, Zambia, Mozambique en Angola. Kenmerken: sterkere P6-scheefheid (donor- en olieprojecten schrijven P6 voor), zwakkere Candy-penetratie (wel aanwezig via distributeurs in 11 landen **[S]**), en aanzienlijk meer ongelicentieerd gebruik.

- Nigeria: **US$ 6–12 mln** **[E]**
- Kenia + Tanzania + Uganda + Ethiopië: **US$ 3–7 mln** **[E]**
- Ghana + West-Afrika overig: **US$ 2–5 mln** **[E]**
- Zambia/DRC/Mozambique/Angola (mijnbouw- en LNG-zwaar, hoge prijs per zetel): **US$ 4–9 mln** **[E]**
- **Subtotaal SSA excl. ZA: US$ 15–33 mln** **[E]**

**Anker 4 — Egypte** (Noord-Afrika, maar gevraagd in scope)

Egypte heeft veruit de grootste *planner-populatie* van het continent maar de laagste *besteding per planner*: hoge piraterij, lage lokale prijzen, en een groot deel van de P6-competentie wordt geëxporteerd naar de Golf (Egyptische planners werken bij Golf-aannemers, waar de licentie ook wordt betaald). Raming: **US$ 8–15 mln p.j.** **[E]**.

**Totaal**

> **Verificatiecorrectie — de optelling klopt niet.** De componenten sommeren tot **US$ 45–86 mln**, niet US$ 45–75 mln: ZA 22–38 + SSA excl. ZA 15–33 + Egypte 8–15 = ondergrens 45, **bovengrens 86**. De gepubliceerde bovengrens van 75 is nergens afgeleid en snijdt US$ 11 mln (13%) van de eigen bandbreedte af. Twee lezingen zijn verdedigbaar: (a) de band is **US$ 45–86 mln** als je de componenten letterlijk optelt, of (b) je corrigeert eerst de mijnbouw-scopefout hierboven (ZA-mijnbouw naar US$ 3–12 mln i.p.v. 6–20), waarna ZA op **US$ 19–30 mln** uitkomt en het totaal op **US$ 42–78 mln**. Lezing (b) ligt het dichtst bij de gepubliceerde kop en is intern consistent; **gebruik US$ 42–78 mln p.j. als de gecorrigeerde band, met een centrale waarde van ± US$ 55–60 mln.**

> **Eigen centrale raming (oorspronkelijk, ongecorrigeerd): US$ 45–75 miljoen per jaar aan CPM/Gantt-schedulingsoftwarelicenties in Zuid-Afrika + Sub-Sahara Afrika + Egypte (2025/26). Zuid-Afrika is daarvan US$ 22–38 mln (± 45–55%).** **[E]**
>
> **Groei:** ik schat **8–13% per jaar in USD** **[E]** — lager dan de 15–17% die de PPM-rapporten voor Zuid-Afrika noemen, omdat (a) de Zuid-Afrikaanse bouwsector krimpt als BBP-aandeel, (b) valuta-effecten USD-groei afromen, en (c) de PPM-groei vooral in IT/BFSI/telecom zit, niet in bouwscheduling.
>
> **Bijkomende markt voor training en consultancy: US$ 15–30 mln p.j.** **[E]** — zie §6.4; in deze regio is dat relatief groter dan in Europa omdat certificering directe arbeidsmarktwaarde heeft.

**Zwakke punten in deze raming, eerlijk benoemd:**
- De zetelaantallen zijn niet gemeten maar afgeleid. De bandbreedte factor 2–3 is reëel.
- Mijnbouwscheduling is de grootste onzekerheid (US$ 6–20 mln band) omdat prijzen niet publiek zijn en de scope-grens tussen "mijnplanning" en "scheduling" arbitrair is.
- Ik reken Candy volledig mee als "planningssoftware" terwijl slechts een deel van de waarde in de planningsmodule zit. Wie strikter afbakent, komt voor Zuid-Afrika eerder op US$ 15–25 mln.

### 3.4 Ordegrootte van het aantal planners **[E]**

| Land/regio | Toegewijde planners/schedulers | Occasionele gebruikers (PM's, QS'ers, site agents) |
|---|---|---|
| Zuid-Afrika | **3.000–6.000** | 25.000–45.000 |
| Nigeria | **1.500–3.000** | 15.000–30.000 |
| Egypte | **8.000–18.000** | 40.000–90.000 |
| Kenia | **500–1.200** | 5.000–12.000 |
| Ghana | **300–700** | 3.000–7.000 |
| Rest SSA | **1.500–3.500** | 15.000–35.000 |
| **Totaal** | **15.000–32.000** | **100.000–220.000** |

*Onderbouwing Zuid-Afrika:* 21.331 CIDB-aannemers graad 2–9 **[S]** + 520 CESA-ingenieursbureaus met 23.550 werknemers **[S]** + mijnbouw en SOE's. Grote aannemers hebben 3–15 planners, middelgrote 1–2, kleine geen. 200+ gelijktijdig openstaande Primavera-vacatures op één jobboard **[S]** wijst op een actieve markt van enkele duizenden, niet tienduizenden.

*Waarom Egypte zo hoog:* Egypte is de planner-fabriek van MENA. De omvang van de trainingsindustrie (Pioneers Academy, CLS Learn, RESK Academy, Global Academy, Euro Training Center — allemaal met P6-programma's in Caïro **[S]**) is alleen te verklaren door een cursistenstroom in de duizenden per jaar. Een groot deel emigreert naar de Golf.

*Salarissen Zuid-Afrika (ijking):* gemiddeld bruto R 753.805 p.j. (SalaryExpert 2026) **[S]**; R 648.207 (Indeed) **[S]**; instap (1–3 jaar) R 532.325 **[S]**. Bij ± R 700.000 gemiddeld en 4.500 planners is de loonsom ± **R 3,15 mrd p.j.** **[E]** — tegenover ± R 400–700 mln aan software (US$ 22–38 mln). Software is dus **12–20% van de loonsom van de planningsfunctie** **[E]**, een normale verhouding die de raming plausibel maakt.

> **Verificatiecorrectie — deze "sanity check" bevestigt niets.** De rekensom klopt op zichzelf (R 400–700 mln ÷ R 3,15 mrd = 12,7–22,2%; het gepubliceerde "12–20%" rondt de bovengrens weg), maar **teller en noemer meten niet dezelfde populatie**. De teller (US$ 22–38 mln) omvat de volledige ZA-CPM-bestedingen, inclusief **mijnplanningssoftware** (US$ 6–20 mln) en **Candy** (US$ 6–13 mln, waarvan het grootste deel calculatie is, niet planning). De noemer telt alleen **3.000–6.000 toegewijde bouwplanners** — mijnplanners, calculatoren en QS'ers zitten er niet in. Neem je die er wél bij (realistisch ≥ 10.000 fte met een loonsom van ≥ R 6 mrd), dan zakt de ratio naar **6–11%** en zegt het niets meer over de plausibiliteit van de raming: elke waarde tussen US$ 15 mln en US$ 50 mln zou binnen een "normale" bandbreedte vallen. **De check is te grofmazig om de raming te bevestigen of te weerleggen; presenteer hem niet als validatie.**

---

## 4. Gebruikte software: marktpositie en prijzen

### 4.1 RIB Candy (voorheen CCS Candy)

**Wat het is.** Zuid-Afrikaans ontstaan (Kaapstad/Johannesburg), sinds 1978/1982 op de markt. Modules: Quantity Takeoff, Estimating (first-principles, resource-based), **Planning (CPM-netwerk + Gantt)**, Forecasting, Cash Flow, Valuations, Subcontract Manager, Cost & Allowables (EVM met CPI-curves) **[G]** ([rib-software.com](https://www.rib-software.com/en/rib-candy)). Hoofdkantoor: 22 Karee St, Irene, Centurion, Zuid-Afrika; 7 kantoorlocaties **[S]**.

**Marktpositie.**
- **Zuid-Afrika: nummer 1 bij aannemers.** Academisch onderbouwd: *"the most widely used planning and estimating package in the South African construction industry"* — Smallwood & Allen, Nelson Mandela University, ISEC 2018 **[G]** ([PDF](https://www.isec-society.org/ISEC_PRESS/EURO_MED_SEC_02/pdf/EPE-09.pdf)).
- Wereldwijd: CCS presenteerde zichzelf in 2017 als *"market leader with over 15,000 users in over 50 countries"* **[S]** (CCS-gebruikersseminar Caïro, aug. 2017 — let op: vendorclaim, niet geverifieerd).
  > **Verificatienoot.** RIB's overnamecommunicatie van juli 2019 spreekt van **"around 40,000 users in 50 countries"** en noemt Candy *"No.1 in Africa"* voor kostenraming en projectbeheersing **[G]**. Hetzelfde landenaantal, maar **2,7× zoveel gebruikers in twee jaar** — dat is geen organische groei maar een andere telling (waarschijnlijk named users vs. betaalde zetels, of Candy + BuildSmart samen). **Gebruik geen van beide getallen als zetelbasis.** De "No.1 in Africa"-formulering is wél nuttig: ze komt uit een investeerderscommunicatie bij een transactie van US$ 31,5 mln, waar een onjuiste positioneringsclaim gevolgen heeft — dat is een sterker signaal dan een marketingpagina, maar nog steeds geen gemeten marktaandeel.
- **Afrikaanse spreiding:** distributeur HMS Africa introduceerde RIB-producten bij *"over 60 companies in 11 countries in Africa"* — Botswana, Ghana, Kenia, Malawi, Mozambique, Namibië, Nigeria, Zuid-Afrika, Zambia, Zimbabwe, Mauritius **[G]** ([hmsafrica.com](https://www.hmsafrica.com/)). Een tweede distributeur dekt Zimbabwe, Zambia, Namibië, Botswana, Malawi, Ghana, Kenia en Nigeria **[S]**.
- **Eigendom:** RIB Software SE kocht in juli 2019 70% voor US$ 31,5 mln (R 444 mln) bij 8,5× EBIT/DA; EOH hield 30% **[S]**. RIB is inmiddels onderdeel van Schneider Electric.
- **Reviewscore:** 4,5/5 over **252 geverifieerde reviews** op Capterra Zuid-Afrika, 90% zou het aanbevelen **[G]** ([capterra.co.za](https://www.capterra.co.za/software/126567/candy)).

**Prijzen.**

| Bron | Prijs | Markering |
|---|---|---|
| Le Roux Consulting (ZA-consultant) | **± R 1.500/maand per gebruiker (± US$ 80)**, na eenmalige registratiekosten | **[G]** |
| Capterra Zuid-Afrika | vanaf **US$ 200 flat rate**, gratis proefversie | **[G]** |
| ITQlick (aggregator) | ± US$ 1.500/maand voor 10 gebruikers; single user US$ 150–300/mnd; 100 gebruikers US$ 10.000–20.000/mnd | **[S]** |
| Skynode-blog (concurrent!) | "R 50.000+ per jaar" voor Candy; "R 100.000+" voor RIB BuildSmart | **[S]**, promotioneel |
| RIB officieel | **geen publieke prijs** — "vraag een offerte"; onderscheid single-user/multi-user; "Candy Cloud" als DaaS | **[G]** ([rib-software.com/en/rib-candy/pricing](https://www.rib-software.com/en/rib-candy/pricing)) |

**Licentiemodel.** RIB's Global Licence Agreement v20240930 bepaalt dat klanten een **"Once-Off Initial Licence Fee"** plus een **"Subscription Fee"** per Candy-systeem betalen **[S]** — dus geen eeuwigdurende licentie meer, maar een instapfee + abonnement. Dit past in de bredere branchetrend waarbij vendors klanten van perpetual+onderhoud naar all-in abonnement duwen **[S]**. **Modules zijn niet los te koop; je koopt het hele pakket** **[G]**.

**Voordelen (uit reviews en documentatie) [G/S]:**
- Enige pakket dat kosten en tijd in één datamodel koppelt: een BOQ-post wordt direct een resource-loaded activiteit → *"cost- and resource-loaded programs"* zonder handmatige mapping.
- Ontworpen door aannemers, niet door softwarebedrijven — de workflow volgt tender → uitvoering → waardering → eindafrekening.
- Sterke rapportage en filtering; naadloze Excel-export.
- Master Library Templates op basis van first-principles estimating, **alleen beschikbaar in Zuid-Afrika** **[G]** — een expliciete lokale moat.
- 30 dagen gratis proefperiode.
- 24/7 support genoemd door reviewers; lokale kantoren in Johannesburg, Kaapstad, Durban.

**Nadelen (uit reviews, forums, consultants) [G/S]:**
- **Geen undo-functie** (herhaaldelijk genoemd door Capterra-reviewers) **[G]**.
- **Verouderde architectuur.** Le Roux: *"built on outdated architecture; limited customization; weaker resource management than competitors"* **[G]**. Desktop-only, werkt slecht op OneDrive/netwerkschijven — reviewers adviseren lokale schijven **[G]**.
- **Prestatieverlies bij grote projecten** **[G]**.
- **Beperkte cloud-samenwerking** vergeleken met nieuwere platforms **[G]**.
- **Datalek-risico:** reviewers noemen dat data te makkelijk tussen gebruikers en bedrijven gedeeld kan worden **[G]**.
- **Prijsmodel is een pijnpunt:** hogere licentiekosten voor extra werknemerslicenties **[G]**; en je kunt de planningsmodule niet los kopen — *"expensive if only using planning module"* / *"the planning module alone may not justify costs versus alternative packages"* **[G]**.
- **Resource-risico kan niet op individuele trades**, alleen op trade types (Software Finder) **[S]**.
- **Weinig internationale erkenning** — een programma dat in Candy is gemaakt, wordt door een internationale opdrachtgever vaak niet geaccepteerd.
- Weinig AI-integratie voor pricing/takeoff **[G]**.

**Strategische lezing.** Candy is sterk waar het *geïntegreerd* is en zwak als *planningstool op zich*. Precies dat maakt het aanvalbaar aan de planningskant — maar alleen als de nieuwe tool moeiteloos data uit/naar Candy krijgt.

### 4.2 Oracle Primavera P6 / Primavera Cloud / Unifier

**Marktpositie.**
- **De onbetwiste standaard aan de opdrachtgeverskant en in kapitaalintensieve sectoren.** In Zuid-Afrika: Eskom (implementatie 2011–2012 voor het kapitaalallocatieprogramma **[S]**), Transnet (lopende meerjarige SaaS-tender voor de hele Primavera Suite **[S]**), mijnbouwhuizen, EPC's, grote consultants.
- In Nigeria: *"the scheduling tool of choice on major projects"* over Lagos State-infrastructuur, federale wegenprogramma's en offshore olie & gas **[S]**; en *"Primavera P6 is the de facto scheduling and project controls standard across the global upstream"* in een Nigeriaans upstream-project (Awoba Gas Field, OML 24) **[S]**.
- In Egypte: standaard bij Orascom Construction, Hassan Allam Construction en de rest van de grote aannemers **[S]** (LinkedIn-profielen van planning managers).
- **Doorslaggevende factor: contractuele verplichting.** Zie §6.1.

**Resellers/partners in Afrika [S/G]:**
- **Synergy Projects Consulting (Pty) Ltd** — Oracle **Gold Partner**, 173 Oxford Road, Rosebank, Johannesburg. Verkoopt P6 PPM & EPPM licenties (standalone, central server, cloud), support, schedule-consulting en training (P6 Fundamentals/Advanced/Assessment, Unifier Design/Reporting/Administration, MS Project Fundamentals/Advanced, Power BI, Project Risk Analysis) **[G]** ([synergyprocon.com/solutions](https://synergyprocon.com/solutions)).
- **AMREC** — implementatie van P6, Unifier, Analytics en Gateway **[S]** ([amrec.co.za](https://www.amrec.co.za/oracle-primavera/implementation)).
- Daarnaast talrijke trainingsaanbieders zonder licentierol (§6.4).

**Prijzen (lijstprijzen wereldwijd — Oracle publiceert geen Afrika-specifieke prijzen):**

| Item | Prijs | Markering |
|---|---|---|
| P6 Professional / EPPM, **eeuwigdurend, Named User Plus** | **US$ 3.520 per gebruiker** (alternatieve opgaven: US$ 3.100; oudere P6 EPPM-basis US$ 2.750) | **[S]** |
| Jaarlijks onderhoud/support | **22% van de licentieprijs** (≈ US$ 774/jaar bij US$ 3.520) | **[S]** |
| Oracle Primavera Cloud, per module | vanaf **US$ 144/gebruiker/jaar** (Progress Cloud Service ≈ US$ 12/mnd); **minimaal 5 gebruikers per module**, minimaal 1 jaar; hosting/support/updates inbegrepen | **[S]** |
| **Zuid-Afrikaanse straatprijs** | **R 36.360 – R 38.610** plus jaarlijkse onderhoudskosten | **[G]** (Le Roux Consulting) |

Bij ± R 18/USD komt R 36.360–38.610 neer op **US$ 2.020–2.145** — dus **lager** dan de wereldwijde lijstprijs van US$ 3.520. Dat is consistent met agressieve regionale kortingen en/of een oudere prijspeiling. **[E]** Praktijkervaring in de regio: kortingen van 20–50% op meerjaren-/volumecontracten zijn normaal bij Oracle; voor SOE's als Eskom en Transnet met honderden zetels lopen kortingen hoger op.

> **Verificatiecorrectie — de "±40% regionale korting" is grotendeels een rekenartefact.** Drie problemen:
> 1. **De onderhoudsbedragen ontbraken.** Le Roux geeft ze wél: *"Primavera P6 professional is about R36,360 once off with the option of a further **R9,900/year** maintenance fee"* en *"EPPM will set you back about R38,610 for a perpetual license and **R10,890/year** for the maintenance"* **[G]**. Dat is **27,2% resp. 28,2%** van de licentieprijs — dus **niet** Oracle's standaard 22%, maar ± 5–6 punten hoger (waarschijnlijk reseller-marge en/of btw). De totale eigendomskosten in ZA liggen daardoor hoger dan de kale licentievergelijking suggereert.
> 2. **De bron is verouderd.** Hetzelfde artikel noteert *"Project Standard **2021**"* en *"Project Professional **2021**"* — de prijspeiling stamt dus uit ± 2021–2023, ook al staat er een copyright-2025 in de voettekst. Het rapport erkent dat elders wél voor MS Project ("oudere eenmalige ZA-prijzen") maar presenteert dezelfde bron voor P6 als actuele *"straatprijs"*. Dat is inconsistent.
> 3. **De valuta-mismatch maakt de korting kunstmatig groot.** Een rand-prijs uit ± 2021–2022 wordt omgerekend tegen een koers van 2025/26 (R 18/USD) en afgezet tegen een *huidige* USD-lijstprijs. Tegen de koers die destijds gold (± R 14,8–16 /USD) is R 36.360 ≈ **US$ 2.270–2.460**, oftewel **25–35% onder lijst** — een normale Oracle-partnerkorting, geen bijzonder Afrikaans fenomeen. **De conclusie "±40% onder de wereldwijde lijstprijs, wat op forse regionale korting wijst" moet vervallen.**
>
> De lijstprijs van **US$ 3.520** zelf is wél **bevestigd** door meerdere onafhankelijke derden, inclusief een reseller die *"Primavera P6 Professional 24.12 — $3.520,00"* voert (zie §10). Oracle publiceert de prijs niet zelf.

> **Tweede verificatieronde — er bestaat wél een officiële Oracle-prijslijst, en die corrigeert twee dingen.** Oracle's *Construction & Engineering Global Price List* (10 november 2016, gepubliceerd onder het Texas DIR-contract) staat publiek op oracle.com **[G]** ([PDF](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf)):
> - **Primavera P6 Enterprise PPM: US$ 2.750 per Application User, support US$ 605** — exact **22,0%**. **Primavera P6 Professional Project Management: US$ 2.500, support US$ 550** — eveneens 22,0%. Daarmee zijn **de 22%-onderhoudsvoet en de "oudere EPPM-basis van US$ 2.750" primair bevestigd**, en blijkt bovendien dat P6 *Professional* destijds **goedkoper** was dan EPPM (US$ 2.500), niet duurder. De prijslijst bevestigt ook de termijnlicentiestaffel: 1 jaar = 20% van lijst, 2 jaar 35%, 3 jaar 50%, 4 jaar 60%, 5 jaar 70%.
> - **US$ 3.520 komt op geen enkele Oracle-prijslijst voor.** Alle vindplaatsen zijn resellers en aggregators; een bron uit juni 2025 noemt bovendien **US$ 3.880**. Behandel US$ 3.520 als **resellerniveau van onbekende datum**, niet als Oracle-lijstprijs. Dat raakt ook §9 punt 3 en §5.2: de daar gemaakte omrekening "een US$ 3.520-licentie kost ± ₦ 5,4 mln" rust op een niet-primair cijfer.
>
> **Belangrijker: de cloudprijs "vanaf US$ 144/gebruiker/jaar per module, minimaal 5 gebruikers" is misleidend.** Dezelfde Oracle-prijslijst geeft per *hosted named user per maand*: **Oracle Prime Progress Cloud Service US$ 12 (geen minimum)**, **Oracle Prime Projects Cloud Service US$ 150 (minimum 25 gebruikers)**, **Oracle Prime Portfolios Cloud Service US$ 125 (minimum 25)** **[G]**. Twee correcties:
> 1. De US$ 144/jaar is de **Progress**-module — voortgangsrapportage door uitvoerenden, **niet de schedulingmodule**. De module die daadwerkelijk plant (Projects) staat op **US$ 1.800 per gebruiker per jaar**, een factor **12,5** hoger.
> 2. Het gepubliceerde **minimum van 25 gebruikers** per module staat haaks op de "minimaal 5 gebruikers" uit de resellerbronnen. Die 5 is vermoedelijk een reseller-bundel (er worden ook kant-en-klare "OPC 5-user"-pakketten verkocht), niet Oracle's eigen minimum.
>
> **Gevolg voor de raming:** de gehanteerde blended P6-prijs van **US$ 700–1.100 per zetel per jaar** is verdedigbaar voor afgeschreven eeuwigdurende licenties, maar **te laag voor de cloudkant** waar de scheduling-module op lijst US$ 1.800 doet. De P6-rij in de zeteltabel is dus eerder conservatief dan optimistisch — de enige rij in het hele model waar dat geldt. *Kanttekening: de prijslijst dateert uit 2016 en gebruikt de "Oracle Prime"-naamgeving van vóór de rebranding naar Oracle Primavera Cloud; de verhoudingen tussen de modules zijn sindsdien vermoedelijk niet omgekeerd, maar de absolute bedragen zijn gedateerd.*

**Voordelen [G/S]:** onbetwiste marktstandaard; sterkste resource- en portfoliobeheer; webgebaseerde samenwerking; XER/XML als lingua franca tussen partijen; grootste beschikbare arbeidsmarkt van getrainde planners; verplicht bij grote opdrachtgevers.

**Nadelen [G]:** Le Roux Consulting is bot — P6 is een *"slow, clumsy giant"* met een overgecompliceerde interface, duur, en overkill voor kleinere projecten. Voor een middelgrote Zuid-Afrikaanse aannemer met R 50–200 mln omzet is P6 economisch niet te rechtvaardigen tenzij de klant het eist.

**Belangrijke nuance uit de praktijk:** *"Primavera P6 does not make a programme NEC-compliant. How you use it does."* **[S]** — de tool is een vinkje in de aanbesteding, niet een garantie op planningskwaliteit.

### 4.3 Microsoft Project

**Marktpositie.** De breedste installed base, de ondiepste penetratie. Standaard bij ingenieursbureaus, PMO's, overheidsdiensten en kleinere aannemers in de hele regio. In Kenia en Ghana is MS Project vaak *het* pakket dat academisch onderzocht wordt (zie §5.3 en §5.4), wat de facto-standaardpositie buiten Zuid-Afrika illustreert.

**Prijzen Zuid-Afrika (officiële Microsoft ZA-site, eenmalige aankoop) [G]:**

| Product | Prijs | Markering |
|---|---|---|
| **Project Standard 2024** | **R 13.799** eenmalig | **[G]** ([microsoft.com/en-za](https://www.microsoft.com/en-za/microsoft-365/project/compare-microsoft-project-management-software)) |
| **Project Professional 2024** | **R 26.999** eenmalig | **[G]** |
| Project Server Subscription Edition | prijs niet gepubliceerd; via partner | **[G]** |

Abonnementen (Microsoft publiceert de ZA-prijzen niet op de vergelijkingspagina; USD-lijstprijzen):

| Plan | USD-lijstprijs | ZAR-equivalent bij R18/$ **[E]** | Markering |
|---|---|---|---|
| Project Plan 1 | US$ 10/gebruiker/mnd | ± R 180 | **[S]** |
| Project Plan 3 | US$ 30/gebruiker/mnd | ± R 540 | **[S]** |
| Project Plan 5 | US$ 55/gebruiker/mnd | ± R 990 | **[S]** |

Zuid-Afrikaanse reseller CloudCo noteert "M365 Project Plan 3" op **R 1.092,91/maand** **[S]** ([cloudco.co.za](https://cloudco.co.za/store/microsoft/microsoft-365-project-plan-3)) — ruim het dubbele van de lijstprijs-omrekening; waarschijnlijk inclusief reseller-marge, support en/of btw. **Waarschuwing: reseller-opslagen van 50–100% op Microsoft-abonnementen zijn in deze markt niet ongebruikelijk.** **[E]**

Ter vergelijking noteert Le Roux Consulting oudere eenmalige ZA-prijzen van **R 11.999–R 23.399** **[G]** — de 2024-editie is dus ± 15% duurder geworden in rand. *(Narekening: 13.799/11.999 = 1,150 en 26.999/23.399 = 1,154 ✔. Let op dat de Le Roux-prijzen de **2021**-editie betreffen, dus 15% over ± 3 jaar ≈ 4,8% p.j., ruim onder de ZA-inflatie.)*

> **Verificatieaanvulling — de ZA-prijs is géén simpele omrekening van de USD-lijstprijs.** Microsofts **Amerikaanse** pagina noteert dezelfde producten op **US$ 679,99** (Project Standard 2024) en **US$ 1.129,99** (Project Professional 2024) **[G]**. Impliciete koersen: R 13.799 ÷ 679,99 = **R 20,29/USD** en R 26.999 ÷ 1.129,99 = **R 23,89/USD** — beide ver boven de werkelijke wisselkoers. Na aftrek van 15% btw (de ZA-prijs is inclusief, de VS-prijs exclusief sales tax) blijft R 17,6/USD resp. **R 20,8/USD** over. **Project Professional is in Zuid-Afrika dus ± 20% duurder dan de koers-gecorrigeerde VS-prijs, Standard ongeveer marktconform.** Dat is een op zichzelf staand bevinding die het rapport miste — en het nuanceert de CloudCo-redenering hieronder: vergelijk resellerprijzen altijd mét btw, anders overschat je de opslag. CloudCo's R 1.092,91 is ± **1,9×** de btw-inclusieve lijstprijsomrekening, niet "ruim het dubbele" van 2,0×. **De USD-abonnementsprijzen (US$ 10/30/55) kon ik niet op een Microsoft-pagina bevestigen** — Microsoft heeft de plannen in 2025 hernoemd (Planner Plan 1 / Planner and Project Plan 3 / Plan 5) en toont de bedragen niet meer op de vergelijkingspagina. Behandel die drie bedragen als **onzeker**.

**Voordelen [G]:** krachtig resource- en kostenbeheer; sterk aanpasbaar met formules; aankan complexe projecten; **geen terugkerende kosten bij eenmalige aankoop** (belangrijk in valuta-volatiele markten); iedereen kent het.

**Nadelen [G]:** steile leercurve; frustrerende rapportuitdraai; ondoorzichtige achtergrondberekeningen; generieke Microsoft-support zonder bouwkennis.

### 4.4 Elecosoft Asta Powerproject

**Marktpositie: klein maar met de duidelijkste groeidynamiek van alle internationale spelers.**

Op **11 september 2025** benoemde Elecosoft **Agile Business Technology** (hoofdkantoor Zuid-Afrika) tot geautoriseerde reseller van de Asta-suite voor **heel Sub-Sahara Afrika**, gericht op bouw, infrastructuur en mijnbouw; introductiewebinar op 2 oktober 2025 **[G]** ([eleco.com/news/agile-elecosoft-powerproject](https://eleco.com/news/agile-elecosoft-powerproject/)). Adrian Girling (International Channel Manager, Elecosoft) motiveerde de keuze met lokale marktkennis.

Dit is strategisch relevant: Asta is in het VK het pakket dat aannemers gebruiken *in plaats van* P6 — goedkoper, bouwgerichter, met sterkere line-of-balance en 4D. Als die propositie in Zuid-Afrika landt, concurreert Asta rechtstreeks met de planningsmodule van Candy én met P6 aan de onderkant.

**Prijzen [S]:**
- Single-user jaarabonnement vanaf **£ 880/jaar** (± US$ 1.100 / ± R 20.000)
- ITQlick noteert **US$ 2.000/gebruiker/jaar** als typische contractprijs
- Concurrent- en SaaS-licenties op offertebasis
- Wereldwijd claimt Elecosoft >100.000 gebruikers **[S]** (vendorclaim)

**Beoordeling [E]:** de prijs-kwaliteitverhouding is voor Zuid-Afrikaanse aannemers aantrekkelijk (goedkoper dan P6, moderner dan Candy Planning), maar het pakket mist de kostenintegratie die Candy zijn positie geeft, en de reseller is nog geen jaar oud. Ik verwacht groei vanaf een zeer lage basis.

### 4.5 Mijnbouwscheduling: Deswik, RPMGlobal, MineRP, Datamine

Dit is een aparte markt met eigen vendors, eigen prijsniveaus en eigen gebruikers (mijnplanners, niet bouwplanners). Voor Zuid-Afrika (±6% van het BBP, ±R 1,1 biljoen omzet **[S]**), Zambia, DRC, Ghana, Tanzania en Botswana is dit materieel.

| Vendor | Positie in Afrika | Prijsindicatie |
|---|---|---|
| **Deswik** (Sandvik sinds 2022) | **Afrika-kantoor in Johannesburg, geopend 2007 — het eerste internationale kantoor van het bedrijf** **[S]**; Clearwater Office Park, Christiaan de Wet Rd, Gauteng. Wereldwijd 1.330+ mijnbouwoperaties **[S]**. Gantt-gebaseerde interface voor zowel ondergrondse als dagbouw **[S]** | Modulair, op offerte. Openbaar tenderdocument: **US$ 15.755,56 voor 12 maanden Deswik.Spatial** (Vinacomin–Halong Coal) **[S]**. Trainingskosten zitten meestal in de prijs **[S]** |
| **RPMGlobal** | XERAS Cloud (zero-based budgets, forecasts, life-of-mine plans als SaaS) en MinePlanner (script-vrije mid-term en strategische scheduling) **[S]** | Niet gepubliceerd |
| **MineRP** | **Zuid-Afrikaans, opgericht 1997.** "Integrated Mine Planner": parametrische planning en scheduling voor alle mijnmethoden **[S]** | Niet gepubliceerd |
| **Datamine** | Open pit en ondergronds: pit/stope-optimalisatie, ontwerp, scheduling, drill & blast **[S]** | Niet gepubliceerd |

**Consequentie voor de raming:** ± 600–1.500 zetels in Afrika à US$ 8.000–18.000/jaar geeft **US$ 6–20 mln** **[E]** — potentieel de grootste enkele post in de hele regio, en tegelijk de post met de grootste onzekerheid.

**Voor een generieke Gantt/CPM-tool is dit géén doelmarkt.** Mijnplanning vereist geologische blokmodellen, ontginningsvolgordes en haulage-simulatie; een Gantt-chart is er slechts de output van.

### 4.6 De nichespelers: InEight, Safran, Deltek, SYNCHRO, TILOS, ALICE, Nodes & Links, Spider Project

Voor deze categorie is de bevinding zelf de conclusie: **ze zijn in Afrika vrijwel afwezig.**

| Vendor | Bevinding |
|---|---|
| **InEight** | *"For the first time, Africa has an official InEight implementation partner"* — PCO Global, aangekondigd eind 2025 **[S]**. Dat een tier-1 project-controlsvendor pas eind 2025 zijn eerste Afrikaanse partner krijgt, is veelzeggend over de marktrijpheid. |
| **Safran** | Safran Cloud (scheduling, reporting, risk analysis) beschikbaar, **geen Afrikaanse reseller of referentie gevonden** **[S]**. Wordt gebruikt via internationale olie- & gasketens. |
| **Deltek Acumen (Fuse)** | **Geen Zuid-Afrikaanse reseller of trainingsaanbieder gevonden**; alle trainers (Tensix, CrunchTech, PM tec, Prime PMO, Xacom) zijn buiten Afrika **[S]**. Wordt in Zuid-Afrika gebruikt door schedule-assurance-consultants, maar via internationale licenties. |
| **Bentley SYNCHRO** | Wél via Microsoft AppSource beschikbaar in de ZA-store **[S]**, maar **geen Afrikaanse reseller, trainer of case study gevonden** **[S]**. |
| **Trimble TILOS** | **Geen enkele Afrikaanse vermelding gevonden** in gerichte zoekopdrachten. Opvallend, want lineaire projecten (wegen, spoor, pijpleidingen) zijn juist het Afrikaanse infra-zwaartepunt. |
| **ALICE Technologies** | **Geen Afrikaanse aanwezigheid gevonden.** |
| **Nodes & Links** | **Geen Afrikaanse aanwezigheid gevonden.** |
| **Spider Project** | Actief in 34–37 landen via Russische, Europese en Australische kanalen; **geen Afrikaanse distributie, partnerschap of referentie gevonden** **[S]**. |

**Interpretatie [E]:** de "moderne project-controlslaag" (schedule-kwaliteitsanalyse, AI-optimalisatie, 4D) die in Noord-Amerika, het VK en de Golf hard groeit, is in Afrika nog niet aangekomen. Dat betekent zowel een gat als een waarschuwing: kennelijk is de betalingsbereidheid voor dit soort tools hier (nog) laag.

### 4.7 Algemene projectplanningstools

monday.com, Smartsheet, Asana, Wrike, Jira-plug-ins, ClickUp: sterk groeiend in Zuid-Afrikaanse en Nigeriaanse *kantooromgevingen*, maar buiten de harde CPM-markt. MarketsandMarkets noemt Microsoft, Oracle, SAP, ServiceNow, Asana en monday.com expliciet als hoofdspelers in de Zuid-Afrikaanse PPM-markt **[G]** — maar de afnemende sectoren die ze noemen (financiële dienstverlening, telecom, publieke sector) zijn niet de bouwplaats.

Capterra Zuid-Afrika biedt gelokaliseerde vergelijkingen (Smartsheet vs monday.com) **[S]**, wat wijst op reële lokale vraag. Geen van deze tools doet echte CPM met kalenders, kritieke-pad­berekening en float — ze doen taakbeheer met een Gantt-visualisatie. Voor een aannemer die een NEC-programma moet indienen zijn ze onbruikbaar.

**Prijsniveau:** US$ 9–30/gebruiker/maand — bij R 18/USD is dat R 160–540/gebruiker/maand **[E]**, dus goedkoper dan Candy per zetel maar niet functioneel vergelijkbaar.

### 4.8 Open source en gratis tools

ProjectLibre, GanttProject, OpenProject: **geen enkele Afrika-specifieke adoptiestudie of casus gevonden** in gerichte zoekopdrachten **[S]**. Mijn inschatting **[E]** op basis van de context (32%+ ongelicentieerd gebruik, valutadruk, groot studentenbestand):
- ProjectLibre en GanttProject worden veel gebruikt door studenten en zeer kleine aannemers, precies omdat ze .mpp/.xml kunnen lezen en gratis zijn.
- Ze genereren **nul omzet** en verschijnen dus in geen enkel marktrapport — maar ze bezetten wel het instapsegment.
- OpenProject wordt vrijwel niet gebruikt in de bouw (server-installatie is een drempel).

Dit is direct relevant voor Open Planner Studio: **de "gratis Gantt/CPM"-niche is bezet door verouderde Java-tools die niemand actief promoot.** De concurrentie is er dus zwak, maar de betalingsbereidheid ook.

### 4.9 Lokale en regionale pakketten (met concrete voor- en nadelen)

Dit is de laag die je in geen enkel marktrapport terugvindt. Ik heb er actief naar gezocht, ook in het Arabisch.

#### Zuid-Afrika

**Wakha (Skynode)** — [skynode.co.za/wakha](https://skynode.co.za/wakha/)
- **Wat:** *"A construction digital solution for South Africa: project management, B-BBEE tracking, CIDB/NHBRC compliance, ZAR cash flow forecasting, and offline mode"* **[S]**
- **Prijs:** **R 1.499 – R 6.999 per maand** **[S]** (uit hun eigen vergelijkingsblog)
- **Voordelen [E]:** de enige serieuze poging om compliance-eisen die uniek Zuid-Afrikaans zijn (B-BBEE-scorekaarten, CIDB-graden, NHBRC-inschrijving, JBCC/NEC/GCC-contracttypen) in software te vatten; transparante randprijzen; offline-modus (relevant bij onbetrouwbare connectiviteit).
- **Nadelen [E]:** **geen bewijs gevonden van Gantt/CPM-functionaliteit** — de vermelde features zijn compliance, financiën en coördinatie. De belangrijkste vindplaats is hun eigen marketingblog, die concurrenten ongunstig framet (Candy "R 50.000+/jaar" zonder compliance-features). Behandel de vergelijkende cijfers uit die blog met scepsis. Onbekende klantenbasis; geen onafhankelijke reviews gevonden.

**Eworks Manager** — veldwerkbeheer, prijs op aanvraag **[S]**. Voordelen: betaalbaar, lokaal. Nadelen: geen compliance-features, geen CPM **[S]**.

**RIB BuildSmart** (via B&M Systems / HMS Africa) — bouw-ERP (inkoop, payroll, materieelbeheer, kostenbeheer) **[S]**; **R 100.000+/jaar** volgens de Skynode-blog **[S]**. Geen planningstool, maar wel vaak náást Candy in gebruik bij grotere aannemers.

**B&M Systems Candy Master Templates** — first-principles calculatiesjablonen, *"currently available only in South Africa"* **[S]** ([bm.co.za/candy](https://bm.co.za/candy/)). Illustratief voor hoe diep de lokale ecosysteemlaag rond Candy zit.

#### Kenia

**Strukchad** — [strukchad.com](https://strukchad.com/construction-project-management-software-kenya)
- **Wat:** platform voor Keniaanse aannemers; *"manage project execution with better control over BOQs, site updates, procurement, labour, approvals, and finance visibility"* **[S]**. Real-time tracking van arbeid, materialen en projectkosten.
- **Prijs:** Free Trial / Professional / Enterprise **[S]**; concrete bedragen niet publiek (pricing-pagina blokkeerde).
- **Voordelen [E]:** BOQ-centrisch (past bij de Keniaanse aanbestedingspraktijk); lokale ontwikkelpartner (Radi Digital Solutions); lage instapdrempel via gratis proefversie.
- **Nadelen [E]:** **geen aanwijzing voor CPM/kritieke-padberekening** — het is een uitvoerings- en kostenbeheersplatform, geen scheduler. Zeer kleine schaal; geen onafhankelijke reviews; onduidelijke financiële stabiliteit.

**In4Suite (In4Velocity)** — ERP voor vastgoed en bouw, actief in Kenia **[S]**. Indiaas van origine, geen CPM-focus.

#### Nigeria

**Konstrukt** — [konstrukt.cloud](https://konstrukt.cloud)
- *"End-to-end construction project and contract management platform built for Nigeria and Africa. Manage budgets, BoQ, interim payment certificates, variations, compliance, workforce, and more"* **[S]**
- **Voordelen [E]:** raakt exact de commerciële pijnpunten van Nigeriaanse aannemers (interim payment certificates, variations — waar betalingsvertraging het grootste probleem is). Nigeriaans gebouwd, dus naira-geprijsd.
- **Nadelen [E]:** contract- en betalingsgericht, **geen scheduling-engine zichtbaar**. Vroege fase.

**Kólé** — *"From comprehensive project scheduling assistance to precise budgeting and seamless communication, Kólé's innovative software provides a unified platform"* **[S]** ([businessday.ng](https://businessday.ng/real-estate/article/how-koles-innovative-software-solution-is-revolutionising-construction/)).
- **Voordelen [E]:** noemt scheduling expliciet als kernfunctie — de enige lokale speler in de regio die dat doet. Lokale marktkennis.
- **Nadelen [E]:** de enige substantiële bron is een Nigeriaans zakenblad-artikel dat leest als een persbericht. Geen onafhankelijke reviews, geen prijzen, onbekende diepte van de "scheduling assistance".

**Pathscape** — *"a cutting-edge productivity tool designed specifically to help construction firms automate and simplify their project management processes"* **[S]** ([disruptafrica.com](https://disruptafrica.com/2023/04/20/how-nigerias-pathscape-is-making-construction-firms-more-productive/)).
- **Nadelen [E]:** productiviteitstool, geen planner. Startup-risico.

#### Egypte

**Kuadra** — *"Egypt's first unified AI-powered platform for managing the entire construction project lifecycle"*, opgericht 2025 door Ahmed Salem, haalde in 2026 financiering op **[S]** ([wamda.com](https://www.wamda.com/2026/07/kuadra-raises-funding-expand-ai-powered-construction-management)).
- **Voordelen [E]:** best gefinancierde lokale speler die ik in de regio vond; AI-positionering; timing valt samen met Egyptes digitaliseringsdruk.
- **Nadelen [E]:** één jaar oud; "AI-powered" zonder aantoonbare CPM-kern; moet opboksen tegen een markt die volledig op P6 is opgeleid.

**Fareeqy** — [fareeqy.com](https://fareeqy.com/eg/en) — projectbeheer voor Egyptische bedrijven met *"Arabic UI, fair pricing, and support in your language"* **[S]**.
- **Voordelen [E]:** **Arabische gebruikersinterface** — dit is het enige echte lokalisatie-argument dat ik in de hele regio tegenkwam en het is niet triviaal: RTL-layout, Arabische datumnotatie, Hijri-kalenderopties.
- **Nadelen [E]:** generiek taakbeheer, geen bouwscheduling.

**Flat6Labs** draait een "Construction-Tech Innovation Accelerator" in Egypte **[S]** — er komt dus meer aan.

#### Ghana en overig SSA

**Geen lokale pakketten gevonden.** Ghana en de meeste SSA-landen consumeren volledig geïmporteerde software (MS Project, P6, Candy via distributeurs) plus Excel.

---

## 5. Landenprofielen

### 5.1 Zuid-Afrika

**De markt.** Bouwomzet R 605,6 mrd (2024) **[S]**, maar krimpend als BBP-aandeel (2,4%, was 3,9%) **[S]**. 21.331 CIDB-aannemers graad 2–9 **[S]**. 520+ ingenieursbureaus met 23.550 werknemers en R 23,4 mrd honorarium **[S]**. Mijnbouw ± R 1,1 biljoen omzet **[S]**.

**Softwarelandschap.**
- **Aannemers → Candy.** De facto standaard, academisch bevestigd **[G]**.
- **Opdrachtgevers/SOE's → P6, contractueel afgedwongen.** Eskom en Transnet zijn de twee zwaartepunten (§6.1).
- **Ingenieursbureaus → MS Project**, met P6 waar de klant het eist.
- **Mijnbouw → Deswik/RPMGlobal/MineRP/Datamine** voor mijnplanning, P6 voor kapitaalprojecten.
- **Nieuw: Asta Powerproject** via Agile Business Technology sinds sept. 2025 **[G]**.
- **KMO → Excel**, met een groeiende laag lokale compliance-tools (Wakha, Eworks).

**Prijsniveaus (samengevat).** Candy ± R 1.500/mnd/gebruiker **[G]**; P6 R 36.360–38.610 + onderhoud **[G]**; MS Project Professional 2024 R 26.999 eenmalig **[G]**; Asta ± R 20.000/jaar **[E]**; lokale tools R 1.499–6.999/mnd **[S]**.

**Bijzonderheden.**
- Alle drie de grote standaardcontracten (**JBCC** voor gebouwen, **GCC 2015** van SAICE voor civiele werken, **NEC3/NEC4** bij Eskom en publieke infrastructuur) stellen programma-eisen. GCC 2015 vereist expliciet dat *"the Contractor's time risk allowances must be indicated on the Programme of Works"* **[S]** — een eis die veel generieke tools niet kunnen weergeven.
- **B-BBEE** en **CIDB-graderingen** zijn harde toegangseisen tot publieke aanbestedingen. Software die daar geen rekening mee houdt, is onvolledig voor de doelgroep.
- Sterkste opleidingsinfrastructuur van het continent: PMI South Africa Chapter (opgericht 1982, oudste PMI-chapter buiten Noord-Amerika) **[S]**; AACE South Africa Section ([aacei-za.org](https://aacei-za.org)) **[S]**; en gecertificeerde Candy-cursussen ingebed in universitaire curricula **[G]**.
- 32% ongelicentieerde software (BSA 2018) **[S]** — voor Afrikaanse begrippen laag, voor OESO-begrippen hoog.

### 5.2 Nigeria

**De markt.** Grootste economie van SSA; bouw gedreven door olie & gas (offshore, Dangote-raffinaderij-klasse projecten), federale wegenprogramma's en Lagos State-infrastructuur. Julius Berger Nigeria (grootste aannemer): ₦ 1,081 biljoen balanstotaal, ₦ 31,11 mrd nettowinst 2025 **[S]**.

**Softwarelandschap.**
- **Primavera P6 is dominant en in olie & gas de facto verplicht**: *"the scheduling tool of choice on major projects"* voor Lagos State-infrastructuur, federale wegen en offshore **[S]**; *"de facto scheduling and project controls standard across the global upstream"* in Nigeriaanse upstream-context **[S]**.
- **MS Project** breed bij lokale aannemers en consultants.
- **RIB Candy** aanwezig via distributeurs (Nigeria expliciet genoemd in het HMS Africa-dekkingsgebied van 11 landen **[G]**) maar met veel lagere penetratie dan in Zuid-Afrika.
- **Lokale startups:** Konstrukt, Kólé, Pathscape (§4.9).
- **Excel** blijft de basislaag.

**Prijzen.** De grootste bevinding is niet een lijstprijs maar de **valutakloof**. Trainingsprijzen via aggregator Laimoon: **NGN 1.000 – 1.637.000** **[S]** — die bandbreedte (factor 1.600) is onbruikbaar als prijsindicatie, maar illustreert wél dat de markt uiteenvalt in informele goedkope cursussen en dure internationale certificering.

Trainingsaanbieders: CIEL Group Resources (2-weekse intensieve P6-training voor olie & gas en bouw) **[S]**, Piston and Fusion (Lagos, Abuja, online) **[S]**, IT Plus Nigeria (3-daagse cursus) **[S]**, SPOClearn **[S]**.

**Bijzonderheden.**
- **Naira-devaluatie is de bepalende factor.** ₦768/$ (juli 2023) → ₦1.609/$ (juli 2024) **[S]**; ₦460/$ (juni 2023) → ₦1.535/$ (eind 2024) **[S]**. Zoho, Microsoft, Google, Netflix en DSTV verhoogden allemaal hun Nigeriaanse prijzen in 2024 **[S]**. Nigeriaanse bedrijven melden: *"currency depreciation has led to sharp increases in costs for cloud servers and software, while their incomes remain low in dollar terms"* **[S]**.
- **Gevolg [E]:** een US$ 3.520 P6-licentie kost ± ₦ 5,4 miljoen. Voor een lokale aannemer is dat prohibitief; alleen IOC's, grote EPC's en donorgefinancierde projecten betalen dat. De rest gebruikt Excel, MS Project of ongelicentieerde installaties.
- PMI Nigeria Chapter: 700+ leden **[S]**; AACE Nigeria Section actief **[S]**.
- Academisch onderzoek naar adoptie bestaat (*"Adoption of Project Scheduling Tools in the Nigerian Construction Industry"*, ResearchGate 2024 **[S]**; JRIIE-studie over Niger State en FCT Abuja **[S]**) maar **de concrete adoptiepercentages waren niet toegankelijk** — ResearchGate blokkeerde en de JRIIE-PDF was niet extraheerbaar. **Dit is een expliciet gat in dit rapport.**

### 5.3 Kenia

**De markt.** KES 1,02 biljoen in 2025, +7,5% p.j. tot 2030 **[S]** ≈ US$ 7,9 mrd **[E]**. Aannemersregistratie via de **NCA (National Construction Authority)**, categorieën 1–8 **[S]** — het Keniaanse equivalent van CIDB-graderingen. Exact aantal geregistreerde aannemers niet gevonden.

**Softwarelandschap.**
- **MS Project en Primavera P6** zijn de genoemde standaarden; Keniaanse praktijkbronnen noemen *"Microsoft Project, Primavera, and Procore help managers monitor progress in real-time"* **[S]** ([marbleengineering.co.ke](https://marbleengineering.co.ke/project-management/)).
- Oracle voert een aparte Afrika-regiopagina voor P6 **[G]** maar met **nul Afrika-specifieke positionering of prijzen** ([oracle.com/africa/construction-engineering/primavera-p6](https://www.oracle.com/africa/construction-engineering/primavera-p6/)).
- **Strukchad** als lokale speler (§4.9).
- Academisch werk over PMIS-adoptie bij het State Department for Public Works (Kenia) bestaat **[S]** maar leverde geen bruikbare percentages op.
- JKUAT-onderzoek naar digitale technologieën in bouwprojecten bevestigt dat adoptie kwaliteit en beheer verbetert, zonder cijfers per tool **[S]**.

**Bijzonderheden [E].** Kenia is het regionale hoofdkantoorland voor Oost-Afrika (VN, NGO's, donororganisaties), waardoor donorgefinancierde projecten met FIDIC-contracten en formele planningseisen relatief zwaar wegen. Chinese aannemers zijn zeer prominent in Keniaanse infrastructuur (SGR-spoorlijn, wegen) — met alle softwaregevolgen van §6.3.

### 5.4 Ghana

**De markt.** Geen betrouwbaar marktomvangcijfer gevonden.

**Softwarelandschap.**
- **MS Project domineert**, met P6 op grote/internationale projecten. Er bestaat expliciet Ghanees academisch onderzoek: *"Effects of Scheduling Software Usage on Project Schedule Management Processes"*, Nehemiah Kpabu Paul, Kwame Nkrumah University of Science and Technology, Kumasi **[S]** ([ir.knust.edu.gh](https://ir.knust.edu.gh/bitstream/123456789/14197/1/Nehemiah%20Kpabu%20Paul.pdf)). **De thesis zelf was niet op te halen (503) — de adoptiepercentages ontbreken dus. Expliciet gat.**
- Vergelijkende studies die in Ghana circuleren rapporteren dat *"Primavera P6 outperforms Microsoft Project by reducing project completion time by 5% to 8%"* en 5,65% minder resourcegebruik **[S]** — **dit zijn claims uit vergelijkend academisch werk, geen marktdata, en ik zou ze niet als feit presenteren.**
- **RIB Candy is aanwezig** via distributeurs (Ghana expliciet genoemd bij zowel HMS Africa als de tweede RIB-distributeur **[G]/[S]**).
- Geen lokale pakketten gevonden.

**Bijzonderheden [E].** Ghana's mijnbouwsector (goud) trekt de mijnbouwscheduling-stack aan (Deswik, Datamine). De cedi-devaluatie speelt dezelfde rol als de naira, zij het minder extreem.

### 5.5 Egypte

**De markt.** Bouwmarkt US$ 48,67 mrd (2025) → US$ 70,27 mrd (2031), CAGR 6,31% **[S]**. Grote aannemers: Orascom Construction (record backlog US$ 9,0 mrd FY2025, groei uit geografische diversificatie, **niet** uit Egypte **[S]**), Arab Contractors, Hassan Allam Holding, Elsewedy Electric, Petrojet **[S]**. Redcon Construction (± 3.000 werknemers) adopteert digitale samenwerkingstools **[S]**.

**Softwarelandschap.**
- **Primavera P6 is overweldigend dominant.** Planning managers bij Orascom en Hassan Allam werken expliciet met *"Primavera P6 | FIDIC | EVM | Recovery & Baseline Scheduling"* **[S]**.
- **De trainingsindustrie is enorm.** Aanbieders in Caïro/Alexandrië: Pioneers Academy (Arabischtalige P6-cursus), CLS Learn (core + advanced P6 EPPM), RESK Academy (Construction Planning using Primavera P6), Global Academy Egypt (Oracle University-erkend trainingscentrum, mag certificaten uitgeven), Euro Training Center (P6 Fundamentals Rel 19 + Advanced Mastery), The Knowledge Academy, Invensis, Simpliaxis, Spoctech **[S]**. Arabische YouTube-tutorials met titels als *"عمل جدول زمني متكامل في 40 دقيقة علي برنامج البريمافيرا"* ("een compleet tijdschema maken in 40 minuten in Primavera") hebben grote bereiken **[S]**.
- **RIB Candy heeft Egyptische aanwezigheid gehad**: er is een CCS-gebruikersseminar in Caïro gedocumenteerd (aug. 2017) **[S]**. Huidige penetratie onbekend en waarschijnlijk klein.
- **Lokale startups:** Kuadra, Fareeqy (§4.9).

**Prijzen.** Aggregator Laimoon: **EGP 1.000 – 1.000.000** voor Primavera-cursussen **[S]**. Die bandbreedte is betekenisloos als prijs, maar zegt iets belangrijks: **de Egyptische markt kent zowel EGP 1.000-cursussen (± US$ 20) als internationale certificeringstrajecten.** Aan de onderkant is de prijs van *kennis* vrijwel nul; aan de bovenkant betaalt de Golf-gerichte carrièreplanner wel.

**Bijzonderheden [E].**
- **Egypte is een exportmarkt voor planners, geen importmarkt voor software.** De competentie wordt in Egypte opgebouwd en in Saoedi-Arabië, de VAE en Qatar te gelde gemaakt — waar ook de licenties worden gekocht. Dat verklaart de scheve verhouding tussen planner-aantallen (§3.4) en softwarebesteding (§3.3).
- **FIDIC** is het dominante contractkader (i.t.t. NEC in Zuid-Afrika), met bijbehorende programma-eisen onder Sub-Clause 8.3.
- **Arabische taal en RTL** zijn een reële, onderbediende lokalisatiebehoefte — Fareeqy adverteert er expliciet mee **[S]**.
- Piraterij is aanzienlijk hoger dan in Zuid-Afrika **[E]**; de omvang van de informele trainingsmarkt is er mede door verklaard.

### 5.6 Overige Sub-Sahara Afrika (kort)

| Land/groep | Kenmerk |
|---|---|
| **Zambia, DRC** | Mijnbouw-gedreven (koper/kobalt). Deswik/RPMGlobal/Datamine + P6. RIB Candy aanwezig in Zambia **[S]**. |
| **Tanzania, Mozambique** | LNG- en infraprojecten met internationale EPC's → P6. Candy aanwezig in Mozambique **[S]**. |
| **Botswana, Namibië, Malawi, Zimbabwe** | Sterk Zuid-Afrikaans georiënteerd; **Candy heeft hier zijn beste niet-ZA penetratie** via de Zuid-Afrikaanse distributeurs **[G]/[S]**. |
| **Angola** | Olie & gas, Portugeestalig, P6-dominant; sterk Chinees aannemersaandeel. |
| **Ethiopië** | Chinese aannemers domineren; westerse software marginaal. |
| **Mauritius** | Genoemd in RIB-distributiedekking **[S]**; klein maar formeel. |

---

## 6. Lokale bijzonderheden

### 6.1 Aanbestedings- en contracteisen: het beslissende mechanisme

Dit is de belangrijkste structurele factor in de hele markt.

**Eskom (Zuid-Afrika, elektriciteit) — P6 expliciet verplicht.**
Uit Eskom's eigen tenderbulletin-documenten:
- *"The contractor shall submit the Programme on the Eskom approved planning tool (Primavera P6) as per Planning & Scheduling Work Instructions"* **[S]** ([tenderbulletin.eskom.co.za, FileID 349035](https://tenderbulletin.eskom.co.za/webapi/api/Files/GetFile?FileID=349035))
- *"The Contractor submits two hard copies and one electronic copy in Primavera, of each revised programme"* **[S]** ([FileID 347609](https://tenderbulletin.eskom.co.za/webapi/api/Files/GetFile?FileID=347609))

Eskom werkt onder **NEC3 ECC** (versies juni 2005 en april 2013 in gebruik) **[S]**, waarin clause 31 een programma ter aanvaarding voorschrijft.

*Let op: ik heb deze citaten via zoekmachine-snippets verkregen; de tenderbulletin-URL's zelf gaven 403 bij directe ophaal. De formulering is echter consistent over twee onafhankelijke documenten en past bij Eskom's bekende praktijk.*

**Transnet (Zuid-Afrika, spoor/havens) — hele Primavera-stack.**
Transnet-tender 81962 (feb. 2025): levering van *"Oracle Software as a Service (SaaS) Application Environments and Software Licenses for the Oracle Primavera Suite"* voor drie jaar **[S]**. Het RFP noemt *"Primavera Cloud Unifier for programme and project Cost Management, Contract Management, Document Management applications, and Primavera Cloud Analytics"* **[S]**. Dit is geen pilot maar een verlenging van een productieomgeving.

**Wat dit betekent [E]:** op de projecten waar het geld zit, is de tool *voorgeschreven*. De aannemer heeft geen keuze. Elk alternatief pakket moet ofwel (a) naar P6-formaat exporteren dat de opdrachtgever accepteert, ofwel (b) zich richten op de markt daaronder.

**Formaateis: XER.** XER is Primavera's native exportformaat en het uitwisselingsformaat tussen partijen. **Ik heb géén expliciete Afrikaanse contractclausule gevonden die letterlijk "submit in .XER format" eist** — de Eskom-formulering is "in Primavera", wat in de praktijk XER of P6 XML betekent. Praktijkadvies dat wel circuleert: *"Use XER for routine project transfers within Primavera"*, XML wanneer baselines en layouts mee moeten **[S]**.

**Contractkaders per regio:**

| Kader | Waar | Programma-eis |
|---|---|---|
| **NEC3/NEC4** | Zuid-Afrika (Eskom, publieke infra), toenemend in de regio | Clause 31: programma ter aanvaarding binnen de in Contract Data Part 1 gestelde termijn **[S]**. NEC4 vereist dat het programma health & safety-vereisten toont **[S]**. Deemed acceptance na notificatiereminder + één week **[S]**. In de praktijk wordt een groot deel van de eerste programma's afgewezen **[S]**. |
| **GCC 2015** (SAICE) | Zuid-Afrika, civiele werken | *"the Contractor's time risk allowances must be indicated on the Programme of Works"* **[S]** |
| **JBCC** | Zuid-Afrika, gebouwen | Programma-eisen; contractadministratie sinds 1997 **[S]** |
| **FIDIC** | Egypte, Nigeria, Kenia, Ghana, donorprojecten SSA-breed | Sub-Clause 8.3 programma-eis; standaard bij Wereldbank/AfDB-financiering |

**Praktische consequentie voor productontwerp [E]:** een planningstool voor deze markt moet minimaal:
1. **Time risk allowances** expliciet kunnen tonen (GCC 2015-eis, en NEC-praktijk).
2. **P6 XER en XML** kunnen im- en exporteren zonder verlies van logica, kalenders en baselines.
3. **MS Project MPP/XML** aankunnen (de tweede lingua franca).
4. **NEC-programmarevisies** kunnen versioneren (revised programme, accepted programme, baseline).

### 6.2 Normen, gradering en compliance

- **Zuid-Afrika:** CIDB-graderingen 1–9 (bepalen voor welke contractwaarde je mag inschrijven), NHBRC-inschrijving (woningbouw), B-BBEE-scorekaarten. Deze zijn géén planningseisen maar wél bepalend voor welke software een aannemer *überhaupt* koopt: compliance-functionaliteit verkoopt hier makkelijker dan planningsalgoritmiek — precies de positionering van Wakha **[S]**.
- **Kenia:** NCA-categorieën 1–8 **[S]**.
- **Nigeria:** COREN-registratie voor ingenieurs (zichtbaar in de kwalificatiereeksen van Nigeriaanse planners **[S]**).

### 6.3 Chinese aannemers: het grootste blinde vlak

**Feiten [S]:**
- US$ 40 mrd bruto-omzet uit engineering & construction in Afrika (2024, China Africa Research Initiative) — **[G] bevestigd bij de bron zelf**, zie §10
- Grootste herkomstland van internationale aannemers in Afrika sinds 2006; >60% van de omzet van internationale aannemers in 2019 — **niet onafhankelijk verifieerbaar gebleken; onzeker**

> **Verificatiecorrectie — dit cijfer geldt voor héél Afrika en past slecht op Zuid-Afrika.** SAIS-CARI geeft bij de US$ 40 mrd (2024) ook de top vijf: **Algerije US$ 5,3 mrd, Nigeria US$ 3,4 mrd, Egypte US$ 3,3 mrd, Guinee US$ 3,0 mrd, DR Congo US$ 2,7 mrd** — en Afrika is 24% van de wereldomzet van deze bedrijven, gedaald van een piek van 38,9% in 2010 **[G]**. Twee gevolgen voor de redenering in §3.3:
> 1. **± US$ 8,6 mrd (22%) zit in Noord-Afrika** (Algerije + Egypte), waarvan Algerije helemaal buiten de scope van dit rapport valt. Het cijfer mag dus niet één-op-één als "SSA"-correctie worden gebruikt.
> 2. **Zuid-Afrika staat niet in de top vijf.** De Chinese-aannemerskorting op de adresseerbare markt is materieel voor **Nigeria, Guinee, DR Congo, Ethiopië en Egypte**, maar nauwelijks voor Zuid-Afrika — precies het land waar 45–55% van de raming vandaan komt. **De correctie is dus terecht voor de SSA-restpost en Egypte, en grotendeels onterecht voor Zuid-Afrika.** In §3.3 wordt hij impliciet op het geheel toegepast.
- Grote namen: CSCEC (o.a. Egypte's 385 m Iconic Tower), CRCC, CMEC, CITIC, CNCEC
- Academisch onderzoek naar Chinese aannemers in Zuidelijk Afrika en hun performance (schedule, change orders, kwaliteit, HSE, opdrachtgeverstevredenheid) in EPC-projecten bestaat **[S]** ([Springer](https://link.springer.com/article/10.1007/s13132-023-01440-4); [ASCE](https://ascelibrary.org/doi/10.1061/JMENEA.MEENG-5167))

**Wat ik NIET kon vaststellen — en dat is zelf een bevinding.** Gerichte zoekopdrachten naar de planningssoftware van Chinese aannemers in Afrika leverden **geen enkele directe bron** op. Glodon (Cubicost, 5D BIM Digital Cost Management, BIM+ Smart Construction Site) is de Chinese marktleider in bouwsoftware en expandeert internationaal — maar de gedocumenteerde expansie is **Zuidoost-Azië (40% CAGR in BIM-groei), niet Afrika** **[S]** ([glodon.com](https://www.glodon.com/en/)).

**Mijn conclusie [E]:**
1. Chinese aannemers gebruiken overwegend **interne, Chinese systemen** (concernbrede ERP + Glodon-achtige kostentools) die niet op de Afrikaanse markt worden verkocht.
2. Ze gebruiken **P6 wanneer de opdrachtgever het eist** — bij Wereldbank/AfDB-financiering, olie & gas en internationale JV's. Hun planners leren P6 als contractvereiste, niet als voorkeur.
3. Ze zijn **commercieel enorm maar als softwarekoper vrijwel afwezig** in de lokale markt.
4. **Netto-effect: de adresseerbare softwaremarkt is aanzienlijk kleiner dan de bouwmarktcijfers suggereren.** Als >60% van het internationale aannemerswerk door partijen wordt gedaan die geen lokale software kopen, moet je de "bouwmarkt × softwarepenetratie"-redenering fors corrigeren. Dit is verwerkt in mijn raming in §3.3.

### 6.4 Opleidingscultuur, training en consultancy

Dit is proportioneel een grotere markt dan in Europa.

**Zuid-Afrika:**
- **Ingebed in universitair onderwijs.** Nelson Mandela University heeft een **tweedaagse gecertificeerde CCS Candy-cursus** ingebed in de BSc (Construction Studies), gekoppeld aan het vak Construction Management 3, gegeven door de externe trainingsaanbieder van de leverancier **[G]**. Motivatie volgens de auteurs: werkgevers willen *"a practical certification of competency alongside their theoretical knowledge"*, en het certificaat geeft *"a ready entry into the labor market"* **[G]**.
- Uit dezelfde studie: van 30 kennisgebieden scoorde **"planning – programming" het hoogst** (mean score 4,73 op 5), gevolgd door cost control (4,69), planning – strategic (4,54), estimating (4,53) en project management (4,50) **[G]**. Studenten ervaren Candy dus primair als een *planningsopleiding*.
- **Officiële Candy-training:** RIB CCS biedt één- en tweedaagse cursussen op meerdere niveaus (core, introductory, advanced), met vestigingen in Kaapstad, Durban en Johannesburg **[S]** ([training.ribccs.com/training-candy/south-africa](https://training.ribccs.com/training-candy/south-africa)). Cursusgeld 7 dagen vooraf te voldoen, alle prijzen excl. btw; planningcursussen C102, C202 en C104 worden gegeven door CFO Consulting Services in samenwerking met CCS **[G]** — **maar de bedragen zijn niet publiek.**
- **Onafhankelijke trainers:** Le Roux Consulting biedt een on-demand online CCS Candy Planning-cursus **[S]**.
- **P6-training:** Synergy Projects Consulting (Oracle Gold Partner, Johannesburg) — P6 Fundamentals/Advanced/Assessment, Unifier, MS Project, Power BI (2–5 dagen), Project Risk Analysis **[G]**. Verder MwaAfrika Technologies (**R 4.500 excl. btw** voor een 4-weeks intensief weekendprogramma **[S]**), NobleProg, Invensis, SPOClearn, The Knowledge Academy.
- **Prijsbandbreedte P6-cursussen Pretoria: ZAR 1.000 – 19.600** (Laimoon-aggregator) **[S]**.
- **Beroepsverenigingen:** PMI South Africa Chapter (1982, oudste buiten Noord-Amerika) **[S]**; AACE South Africa Section, gericht op *"cost and schedule performance predictability"* **[S]**.

**Consultancykosten [E].** Op basis van de dagtarieven die uit de salarisdata volgen (R 753.805/jaar gemiddeld voor een planning engineer **[S]** ≈ R 362/uur **[S]**) en de gebruikelijke consultancy-multiplier van 2,5–3,5×, liggen implementatie-/consultancytarieven in Zuid-Afrika op **R 8.000 – R 18.000 per dag**. Een P6-implementatie bij een middelgrote organisatie (opzet EPS/WBS/kalenders/codes, migratie, training van 10–20 planners) kost realistisch **R 300.000 – R 1.200.000** — vaak méér dan de licenties zelf. Dit patroon (dienstverlening > licentie) is kenmerkend voor de regio.

**Nigeria/Egypte:** grote, deels informele trainingsmarkten (zie §5.2 en §5.5). Certificaten hebben directe arbeidsmarktwaarde omdat ze de toegangspoort tot Golf-emigratie vormen.

### 6.5 Valuta-effecten en prijselasticiteit

Dit is naar mijn oordeel **de belangrijkste commerciële variabele in de hele regio.**

| Valuta | Bewijs | Gevolg |
|---|---|---|
| **NGN** | ₦768/$ (jul 2023) → ₦1.609/$ (jul 2024) **[S]**; ₦460/$ (jun 2023) → ₦1.535/$ (eind 2024) **[S]** | Softwarekosten in naira meer dan verdubbeld; Zoho, Microsoft, Google verhoogden prijzen in 2024 **[S]** |
| **ZAR** | Structurele depreciatie over een decennium | USD-geprijsde licenties worden jaarlijks duurder in rand zonder functiewinst |
| **EGP** | Meerdere devaluaties 2022–2024 | Zeer lage lokale betalingsbereidheid; grote informele markt |
| **KES, GHS** | Aanhoudende druk | Idem, in mindere mate |

**Directe gevolgen [E]:**
1. **Eenmalige aankoop wint van abonnement bij lokale kopers.** Le Roux noemt expliciet als voordeel van MS Project: *"no recurring fees (one-time R11,999–R23,399 purchase)"* **[G]**. In een depreciërende valuta is een eenmalige aankoop een hedge. RIB's overstap naar het abonnementsmodel **[S]** gaat hier tegen de lokale voorkeur in.
2. **Lokaal geprijsde producten hebben een reëel voordeel.** Wakha adverteert expliciet met *"transparent rand pricing"* en "ZAR cash flow forecasting" **[S]**; Fareeqy met *"fair pricing"* in Egypte **[S]**. Dat is geen marketing-frase maar een concreet risicoargument.
3. **De ongelicentieerde markt is een prijsfenomeen, geen moreel fenomeen.** BSA 2018: Zuid-Afrika **32% ongelicentieerd**, commerciële waarde ± **R 2,96 miljard** **[S]** (de snippetweergave "R2,964 billion" is vrijwel zeker R 2,964 miljard met komma als decimaalteken — **behandel dit cijfer met voorzichtigheid, ik kon het BSA-PDF zelf niet ophalen: 403**). Eerdere BSA-cyclus: 33%, meer dan R 4 mrd **[S]**. Voor Sub-Sahara Afrika circuleert een cijfer van 73% **[S]**, maar dat komt van een aggregatorsite (worldmetrics.org) zonder traceerbare methodologie — **ik zou dat cijfer niet gebruiken.**
4. **Excel is de universele fallback.** Niet uit onwil maar omdat het al betaald is, geen internet nodig heeft, en in elke valuta gratis is. Elk product dat de regio wil betreden concurreert eerst met Excel, dan pas met Candy of P6.

### 6.6 Sancties en exportbeperkingen

Relevant voor SSA, maar beperkter dan vaak gedacht:

- **Oracle** verklaart expliciet dat *"all Oracle products and services are prohibited for export/reexport/transfer to or access by"* de verboden entiteiten onder Amerikaanse exportcontrole **[S]**.
- **Sudan** is het duidelijkste geval: ondanks het opheffen van de VS-sancties in januari 2021 konden gebruikers nog steeds geen Microsoft 365-licenties toewijzen, omdat **Microsoft een eigen lijst van beperkte landen hanteert** die achterloopt op OFAC **[G — bevestigd, zie §10]**. Dit is een terugkerend patroon: vendor-eigen restricties overleven de formele sanctie-opheffing.
- **Eritrea, Zuid-Soedan, delen van de Sahel (Mali, Niger, Burkina Faso)** kennen wisselende beperkingen; ik heb hiervoor **geen specifiek bewijs** kunnen vinden.

> **Verificatieaanvulling — nu wél een primaire bron, en de lijst is kort.** Microsofts eigen licentiebeperkingenpagina stelt: *"Customers that purchase Microsoft 365 may assign a Microsoft 365 license … to a user that resides anywhere in the world, **except for Cuba, Iran, Democratic People's Republic of Korea, Sudan, and Syria**"* **[G]**. Daarmee is de Sudan-claim **bevestigd én scherper te maken**: **Sudan is het enige Afrikaanse land op Microsofts lijst.** Eritrea, Zuid-Soedan, Mali, Niger en Burkina Faso staan er **niet** op — de aarzelende formulering hierboven kan dus worden vervangen door een positieve vaststelling. Voor een planningssoftware-leverancier betekent dat: **de sanctie-impact op deze markt is verwaarloosbaar klein** (één land, geen noemenswaardige bouwsoftwaremarkt) en de conclusie dat de échte belemmering betalingstechnisch is (deviezen- en creditcardrestricties in Nigeria en Egypte) blijft overeind.
- **Zuid-Afrika, Nigeria, Kenia, Ghana, Egypte: geen exportbeperkingen** die de verkoop van planningssoftware raken.
- **Praktische consequentie [E]:** de effectieve beperking is niet juridisch maar **betalingstechnisch** — creditcard- en deviezenrestricties (met name Nigeria en Egypte) maken het voor lokale bedrijven moeilijk om buitenlandse SaaS-abonnementen te betalen, ongeacht sancties. Een lokale reseller die in lokale valuta factureert lost méér op dan een prijsverlaging.

### 6.7 Reseller- en kanaalstructuur

| Vendor | Kanaal in Afrika |
|---|---|
| **RIB Candy** | Eigen kantoren (Centurion HQ + 7 locaties **[S]**) + distributeurs: **HMS Africa** (60+ bedrijven, 11 landen **[G]**), **B&M Systems** (Candy Master Templates, alleen ZA **[S]**), plus individuele BD-partners voor Zimbabwe/Zambia/Namibië/Botswana/Malawi/Ghana/Kenia/Nigeria **[S]** |
| **Oracle Primavera** | **Synergy Projects Consulting** (Oracle Gold Partner, Rosebank JHB) **[G]**; **AMREC** (P6, Unifier, Analytics, Gateway) **[S]**; plus directe Oracle-verkoop aan SOE's |
| **Elecosoft Asta** | **Agile Business Technology** (ZA HQ), Sub-Sahara Afrika, sinds 11 sept. 2025 **[G]** |
| **InEight** | **PCO Global** — eerste officiële Afrikaanse implementatiepartner, eind 2025 **[S]** |
| **Deswik** | Eigen Afrika-kantoor Johannesburg sinds 2007 **[S]** |
| **Microsoft** | Volledig indirect via CSP-resellers (CloudCo, honderden anderen) |
| **Deltek, Safran, SYNCHRO, TILOS, ALICE, Nodes & Links, Spider** | **Geen Afrikaans kanaal gevonden** |

**Observatie [E]:** het kanaal is dun en gepersonaliseerd. Twee of drie distributeurs dekken het grootste deel van niet-Zuid-Afrikaans SSA voor RIB. Voor een nieuwe speler betekent dat: (a) er zijn weinig partijen om mee samen te werken, maar (b) één goede partner kan onevenredig veel bereik geven, en (c) de bestaande partners zijn niet exclusief gebonden aan één productcategorie.

---

## 7. Implicaties voor Open Planner Studio

Kort, maar het is de reden dat dit onderzoek is gedaan.

**Waar de opening zit [E]:**
1. **Het "gratis/goedkope CPM"-segment is onderbezet en verouderd.** ProjectLibre en GanttProject bezetten het, zonder actieve ontwikkeling of lokale relevantie. In een regio waar valuta het hoofdprobleem is, is een gratis of laaggeprijsd, volwaardig CPM-pakket structureel aantrekkelijk — niet als niche maar als hoofdroute.
2. **Candy is aanvalbaar aan de planningskant.** Kritiek op de planningsmodule is consistent: verouderde architectuur, geen undo, prestatieproblemen bij grote projecten, zwakker resource management, en je moet het hele (dure) pakket kopen om hem te gebruiken **[G]**. Wie alléén wil plannen, betaalt in Zuid-Afrika te veel.
3. **Compliance verkoopt beter dan algoritmiek.** De lokale winnaars (Wakha, Konstrukt, Strukchad) verkopen CIDB/B-BBEE/NHBRC, interim payment certificates en BOQ-beheer — niet CPM. Een planningstool die *tegelijk* de contractuele programma-eisen (GCC 2015 time risk allowances, NEC-revisiehistorie, FIDIC 8.3) ondersteunt, combineert beide.
4. **Interoperabiliteit is de toegangsprijs, niet een feature.** P6 XER/XML en MS Project MPP/XML zijn non-negotiable. Zonder dat kom je niet op een project waar een opdrachtgever meekijkt. Dit is voor Open Planner Studio relevant omdat de huidige native format IFC 4.3 is — voor deze markt is een **P6-XER-adapter belangrijker dan een IFC-verdieping**.
5. **Arabische RTL-ondersteuning is een reëel, benoemd gat in Egypte** **[S]** — en Open Planner Studio heeft `ar` en `fa` al als RTL-locales.
6. **Offline-first is geen luxe.** Wakha adverteert er expliciet mee **[S]**; connectiviteit op Afrikaanse bouwplaatsen is onbetrouwbaar. Een browser-build met IndexedDB-recovery en een desktop-build past hier goed bij.

**Waar de val zit [E]:**
1. **Betalingsbereidheid is laag en valuta-risico is hoog.** Een USD-abonnement reproduceert precies het probleem van de bestaande spelers.
2. **De markt is klein in absolute termen** (US$ 45–75 mln/jaar voor de hele regio, waarvan Zuid-Afrika de helft) en verdeeld over segmenten met totaal verschillende eisen.
3. **De grote projecten zijn contractueel dichtgetimmerd op P6.** Daar kom je niet binnen als vervanger, hooguit als aanvullende tool.
4. **Het kanaal moet je zelf bouwen of kopen** — er is geen bestaand ecosysteem van onafhankelijke planningsconsultants zoals in het VK.

---

## 8. Bronnen

### A. Academische en primaire bronnen (hoogste betrouwbaarheid)

| Code | Bron | URL | Gebruikt voor |
|---|---|---|---|
| A1 | Smallwood, J. & Allen, C. (2018), *The Impact of the Construction Computing Software (CCS) 'Candy' Course: Construction Management Students' Perceptions*, ISEC Press, Nelson Mandela University **[G, volledig gelezen]** | https://www.isec-society.org/ISEC_PRESS/EURO_MED_SEC_02/pdf/EPE-09.pdf | Candy als meest gebruikte planning-/calculatiepakket in ZA; universitair curriculum; mean scores per kennisgebied |
| A2 | Kpabu Paul, N., *Effects of Scheduling Software Usage on Project Schedule Management Processes*, KNUST Kumasi **[S — PDF gaf 503]** | https://ir.knust.edu.gh/bitstream/123456789/14197/1/Nehemiah%20Kpabu%20Paul.pdf | Ghana scheduling-adoptie (niet toegankelijk) |
| A3 | *Adoption of Project Scheduling Tools in the Nigerian Construction Industry*, ResearchGate 2024 **[S — 403]** | https://www.researchgate.net/publication/385506994 | Nigeria adoptie (niet toegankelijk) |
| A4 | *Level of Awareness and Adoption of Project Management Tools on Building Projects*, JRIIE 9(4) **[S — PDF niet extraheerbaar]** | https://www.jriiejournal.com/wp-content/uploads/2025/12/JRIIE-9-4-103-.pdf | Nigeria (Niger State, FCT Abuja) |
| A5 | *Analyzing the Influence of Knowledge-Based Strategies of Chinese Contractors*, Springer **[S]** | https://link.springer.com/article/10.1007/s13132-023-01440-4 | Chinese aannemers Zuidelijk Afrika |
| A6 | *Performance of Chinese International Contractors in Sub-Saharan Africa*, ASCE **[S]** | https://ascelibrary.org/doi/10.1061/JMENEA.MEENG-5167 | Schedule-performance Chinese EPC |

### B. Markt- en sectorcijfers

| Code | Bron | URL | Gebruikt voor |
|---|---|---|---|
| B1 | Business Day / Stats SA Construction Industry Survey **[S]** | (via zoekresultaat) | R 605,6 mrd bouwomzet ZA 2024, +8,9% p.j. |
| B2 | Property Wheel — CIDB grade-9 contractors surge 39% **[S]** | https://propertywheel.co.za/2025/09/cidb-grade-9-contractors-surge-39-since-2023-amid-lower-tender-opportunities/ | R 108 mrd vaste investering Q1 2025; BBP-aandeel <3% |
| B3 | CIDB Register of Contractors **[S]** | https://portal.cidb.org.za/RegisterOfContractors/ | 21.331 aannemers graad 2–9 (Q4 2024); >120.000 totaal |
| B4 | CIDB Contractor Registration (PMG) **[S]** | https://pmg.org.za/files/250521_CIDB_Contractor_Registration.pdf | Registratiestatistieken |
| B5 | CESA Bi-Annual Economic and Capacity Report **[S]** | https://www.cesa.co.za/becs/ | 520+ firma's, 23.550+ werknemers, R 23,4 mrd |
| B6 | Minerals Council South Africa, Facts & Figures 2025 **[S]** | https://www.mineralscouncil.org.za/industry-news/publications/facts-and-figures | ±6% BBP, R 1,1 biljoen omzet |
| B7 | Mordor Intelligence — Africa Construction Market **[S]** | https://www.mordorintelligence.com/industry-reports/africa-construction-market | US$ 240,55 mrd (2025) → 363,03 mrd (2031), 7,1% |
| B8 | Mordor Intelligence — Egypt Construction Market **[S]** | (zoekresultaat) | US$ 48,67 mrd (2025) → 70,27 mrd (2031), 6,31%; Orascom/Arab Contractors/Hassan Allam |
| B9 | BusinessWire / GlobalData — Kenya Construction Industry Report 2025 **[S]** | https://www.businesswire.com/news/home/20250404916858/en/ | KES 1,02 biljoen (2025), +7,5% p.j. |
| B10 | BusinessWire — South Africa Construction Industry Databook 2025 **[S]** | https://www.businesswire.com/news/home/20250506146969/en/ | R 195,4 mrd (2030), 3,9% CAGR |
| B11 | China Africa Research Initiative **[S]** | (via zoekresultaat) | US$ 40 mrd Chinese E&C-omzet Afrika 2024; >60% aandeel 2019 |

### C. Softwaremarkt en vendors

| Code | Bron | URL | Gebruikt voor |
|---|---|---|---|
| C1 | MarketsandMarkets — South Africa PPM Software **[G]** | https://www.marketsandmarkets.com/Market-Reports/geography/project-portfolio-management-software-market/south-africa | US$ 126,9 mln (2024) → 279,3 mln (2029), 17,1%; vendors; verticals |
| C2 | Grand View Research — South Africa PM Software **[S — 403]** | https://www.grandviewresearch.com/horizon/outlook/project-management-software-market/south-africa | US$ 284,8 mln (2030), 15,4% |
| C3 | Grand View Research — MEA PPM **[S — 403]** | https://www.grandviewresearch.com/horizon/outlook/project-portfolio-management-market/mea | US$ 638,5 mln (2030), 15,8% |
| C4 | 6Wresearch — Africa PM Software Market **[G]** | https://www.6wresearch.com/industry-report/africa-project-management-software-market | Segmentatie ZA/EG/NG/rest; rapportprijs US$ 4.560–6.000; cijfers achter paywall |
| C5 | Cognitive Market Research — MEA PM Software **[S]** | (zoekresultaat) | US$ 143,02 mln (2024), 15,7% |
| C6 | RIB Software — RIB Candy productpagina **[G]** | https://www.rib-software.com/en/rib-candy | Modules incl. Planning; "195+ clients"; Master Templates alleen ZA |
| C7 | RIB Software — RIB Candy pricing **[G]** | https://www.rib-software.com/en/rib-candy/pricing | Geen publieke prijs; single/multi-user; Candy Cloud (DaaS) |
| C8 | Capterra South Africa — RIB Candy **[G]** | https://www.capterra.co.za/software/126567/candy | US$ 200 startprijs; 4,5/5 over 252 reviews; 90% aanbeveling; pro's en con's |
| C9 | Le Roux Consulting — *CCS Candy vs MS Project vs Primavera P6* **[G]** | https://lerouxconsulting.co.za/css-candy-vs-ms-project-vs-primavera-p6 | R 1.500/mnd Candy; R 11.999–23.399 MS Project; R 36.360–38.610 P6; sterktes/zwaktes |
| C10 | Le Roux Consulting — *CCS Candy 2023 in-depth review* **[G]** | https://lerouxconsulting.co.za/is-ccs-candy-construction-software-right-for-you | Modules niet los te koop; ± R 1.500/mnd; 30 dagen trial; planningsmodule |
| C11 | ITQlick — RIB Candy pricing **[S — 403]** | https://www.itqlick.com/rib-candy/pricing | US$ 1.500/mnd voor 10 gebruikers; US$ 150–300 single |
| C12 | HMS Africa **[G]** | https://www.hmsafrica.com/ | 60+ bedrijven, 11 Afrikaanse landen; RIB Candy + BuildSmart |
| C13 | RIB CCS locaties (Craft) **[S]** | https://craft.co/rib-ccs/locations | HQ Centurion, 22 Karee St, Irene; 7 kantoren |
| C14 | RIB/EOH overname CCS 2019 **[S]** | (zoekresultaat, juli 2019) | US$ 31,5 mln voor 70%, R 444 mln, 8,5× EBIT/DA |
| C15 | Elecosoft — Agile Business Technology reseller **[G]** | https://eleco.com/news/agile-elecosoft-powerproject/ | 11 sept. 2025; Sub-Sahara Afrika; bouw/infra/mijnbouw |
| C16 | Software Finder / Pricing Now — Asta Powerproject **[S]** | (zoekresultaten) | £ 880/jaar single user; US$ 2.000/gebruiker/jaar |
| C17 | Microsoft South Africa — Project vergelijking **[G]** | https://www.microsoft.com/en-za/microsoft-365/project/compare-microsoft-project-management-software | Project Standard 2024 R 13.799; Professional 2024 R 26.999 |
| C18 | CloudCo (ZA reseller) **[S]** | https://cloudco.co.za/store/microsoft/microsoft-365-project-plan-3 | Project Plan 3 R 1.092,91/mnd |
| C19 | Oracle Africa — Primavera P6 **[G]** | https://www.oracle.com/africa/construction-engineering/primavera-p6/ | Geen Afrika-specifieke prijzen of positionering |
| C20 | Taradigm / FindPM / prmyazilim — P6 licentiemodellen **[S]** | (zoekresultaten) | US$ 3.520 perpetual; 22% support; OPC US$ 144/gebr./jaar; min. 5 users/module |
| C21 | Synergy Projects Consulting **[G]** | https://synergyprocon.com/solutions | Oracle Gold Partner JHB; licenties, support, training |
| C22 | AMREC **[S]** | https://www.amrec.co.za/oracle-primavera/implementation | P6, Unifier, Analytics, Gateway |
| C23 | Deswik Planning **[S]** | https://www.deswik.com/products/planning | Gantt-interface; JHB-kantoor 2007; Sandvik 2022; 1.330+ operaties |
| C24 | RPMGlobal **[S]** | https://rpmglobal.com/software/ | XERAS Cloud, MinePlanner |
| C25 | MineRP **[S]** | https://minerp.wixsite.com/minerp/integratedmineplanning | Zuid-Afrikaans, 1997, parametrische planning |
| C26 | Datamine **[S]** | https://dataminesoftware.com/ | Open pit/ondergronds, scheduling |
| C27 | Glodon **[S]** | https://www.glodon.com/en/ | Cubicost, 5D BIM; expansie Zuidoost-Azië, niet Afrika |

### D. Contract-, tender- en compliance-bronnen

| Code | Bron | URL | Gebruikt voor |
|---|---|---|---|
| D1 | Eskom tenderbulletin, FileID 349035 **[S — 403 bij directe fetch]** | https://tenderbulletin.eskom.co.za/webapi/api/Files/GetFile?FileID=349035 | *"submit the Programme on the Eskom approved planning tool (Primavera P6)"* |
| D2 | Eskom tenderbulletin, FileID 347609 **[S]** | https://tenderbulletin.eskom.co.za/webapi/api/Files/GetFile?FileID=347609 | *"two hard copies and one electronic copy in Primavera"* |
| D3 | Transnet e-Tenders, tender 81962 **[S]** | https://transnetetenders.azurewebsites.net/Home/TenderDetails?Id=81962 | Oracle Primavera Suite SaaS + licenties, 3 jaar (feb. 2025) |
| D4 | Transnet RFP-document **[S — PDF niet extraheerbaar]** | https://publishedetenders.blob.core.windows.net/publishedetenderscontainer/81962/ | Primavera Cloud, Unifier, Analytics in productie |
| D5 | Eskom Oracle Primavera case study **[S]** | https://www.slideshare.net/slideshow/204520-eskom-sa-case-study-49436258 | Implementatie 2011–2012, kapitaalallocatie |
| D6 | SAICE GCC 2015 **[S]** | https://www.saice.org.za | *"time risk allowances must be indicated on the Programme of Works"* |
| D7 | JBCC **[S]** | https://www.jbcc.co.za | Contractadministratie sinds 1997 |
| D8 | NEC4 clause 31 guidance (Gather Insights, Fenwick Elliott, GMH Planning) **[S]** | (zoekresultaten) | Programma ter aanvaarding; deemed acceptance; H&S-vereisten |
| D9 | Huduma Global — Kenya NCA licensing **[S]** | https://hudumaglobal.com/blog/kenya-construction-industry-regulations-nca-licensing | NCA-categorieën 1–8 |

### E. Valuta, piraterij, sancties, arbeidsmarkt

| Code | Bron | URL | Gebruikt voor |
|---|---|---|---|
| E1 | BSA Global Software Survey 2018 — South Africa **[S — PDF 403]** | https://gss.bsa.org/wp-content/uploads/2018/05/SOUTHAFRICA_2018GSSPR_ENGLISH.pdf | 32% ongelicentieerd; ± R 2,96 mrd |
| E2 | MyBroadband — software piracy SA **[S]** | https://mybroadband.co.za/news/software/166180-software-worth-over-r4-billion-pirated-in-south-africa.html | 33% eerdere cyclus, >R 4 mrd |
| E3 | Worldmetrics — software piracy statistics **[S — lage betrouwbaarheid, niet gebruikt als feit]** | https://worldmetrics.org/software-piracy-statistics/ | 73% SSA (niet-traceerbare methodologie) |
| E4 | Naira-devaluatie en softwareprijzen **[S]** | (zoekresultaten: Zoho, Microsoft, Google prijsverhogingen 2024) | ₦768→₦1.609/$ (2023–24); ₦460→₦1.535/$ |
| E5 | Oracle export compliance **[S]** | (zoekresultaat) | Verbod op export/toegang voor gesanctioneerde entiteiten |
| E6 | Microsoft 365 Sudan-restricties **[S]** | (zoekresultaat) | Vendor-eigen restrictielijst overleeft OFAC-opheffing jan. 2021 |
| E7 | SalaryExpert — Planning Engineer South Africa **[S]** | (zoekresultaat, 2026) | R 753.805 gemiddeld; R 362,41/uur; R 532.325 instap |
| E8 | Indeed South Africa **[S]** | https://za.indeed.com/q-primavera-jobs.html | R 648.207 gemiddeld |
| E9 | Jobsora South Africa **[S]** | https://za.jobsora.com/jobs-primavera-south-africa | 200+ Primavera-vacatures |
| E10 | PMI South Africa Chapter **[S]** | https://pmi.org.za | Opgericht 1982, oudste buiten Noord-Amerika |
| E11 | AACE South Africa Section **[S]** | https://aacei-za.org | Cost & schedule performance predictability |
| E12 | PMI Nigeria Chapter **[S]** | (LinkedIn) | 700+ leden |

### F. Lokale/regionale pakketten

| Code | Bron | URL | Gebruikt voor |
|---|---|---|---|
| F1 | Skynode / Wakha **[G — let op: promotioneel]** | https://skynode.co.za/wakha/blog/best-construction-management-software-south-africa/ | R 1.499–6.999/mnd; vergelijkende prijzen concurrenten (met scepsis te lezen) |
| F2 | Strukchad Kenya **[S — pricing-pagina 403]** | https://strukchad.com/construction-project-management-software-kenya | BOQ, site updates, procurement; Free/Professional/Enterprise |
| F3 | Konstrukt Nigeria **[S]** | https://konstrukt.cloud | Budgets, BoQ, interim payment certificates, variations |
| F4 | Kólé Nigeria **[S]** | https://businessday.ng/real-estate/article/how-koles-innovative-software-solution-is-revolutionising-construction/ | "project scheduling assistance" |
| F5 | Pathscape Nigeria **[S]** | https://disruptafrica.com/2023/04/20/how-nigerias-pathscape-is-making-construction-firms-more-productive/ | Productiviteitstool |
| F6 | Kuadra Egypte **[S]** | https://www.wamda.com/2026/07/kuadra-raises-funding-expand-ai-powered-construction-management | AI-platform, opgericht 2025, financiering 2026 |
| F7 | Fareeqy Egypte **[S]** | https://fareeqy.com/eg/en | Arabische UI, lokale prijzen |
| F8 | B&M Systems — Candy Master Templates **[S]** | https://bm.co.za/candy/ | Alleen beschikbaar in Zuid-Afrika |
| F9 | Planning Planet forum — CCS Candy/SitePlan **[S]** | https://planningplanet.com/forum | *"CCS is a very user friendly system better than primavera"* |
| F10 | Software Finder — Candy review **[S]** | (zoekresultaat) | Resource-risico alleen op trade types, niet individuele trades |

### G. Trainingsaanbieders (selectie)

RIB CCS Training ZA (https://training.ribccs.com/training-candy/south-africa) **[S]** · Construction Computer Software Kaapstad/Durban (https://constructioncomputersoftware.com/home/products/candy/support/training/) **[G]** · MwaAfrika Technologies (R 4.500 excl. btw) **[S]** · NobleProg ZA (https://www.nobleprog.co.za/cc/oracleprimaverap6) **[S]** · Invensis Learning ZA/EG/NG **[S]** · SPOClearn ZA/EG/NG **[S]** · The Knowledge Academy ZA/EG **[S]** · CIEL Group Resources NG (https://www.cielgr.com/advanced-primavera-p6) **[S]** · Piston and Fusion NG (Lagos/Abuja) **[S]** · IT Plus Nigeria **[S]** · Pioneers Academy EG **[S]** · CLS Learn EG **[S]** · RESK Academy EG **[S]** · Global Academy Egypt (Oracle University-erkend) **[S]** · Euro Training Center Caïro **[S]** · Skills for Africa KE (https://skillsforafrica.org/ke/) **[S]** · Laimoon prijsaggregaties ZA/NG/EG **[S — zeer brede, onbruikbare bandbreedtes]**

---

## 9. Bekende gaten in dit onderzoek

Volledigheidshalve, omdat een rapport dat zijn eigen beperkingen verzwijgt onbruikbaar is:

1. **Geen concrete adoptiepercentages voor Nigeria en Ghana.** Beide relevante studies (A2, A3, A4) waren technisch niet toegankelijk (503/403/niet-extraheerbaar PDF). De landenparagrafen 5.2 en 5.4 rusten daardoor op indirect bewijs.
2. **Geen officiële RIB Candy-prijslijst.** Alle prijzen komen van derden. De R 1.500/maand van Le Roux (C9/C10) is het best onderbouwde cijfer maar is één consultant.
3. ~~**Geen Oracle-prijslijst voor Afrika.** De US$ 3.520-lijstprijs is wereldwijd; de Zuid-Afrikaanse straatprijs (R 36.360–38.610) is ± 40% lager, wat op forse regionale korting wijst maar niet te verifiëren was.~~ **Bijgewerkt na verificatie:** er is geen Afrika-specifieke Oracle-prijslijst, maar er is wél een **publieke wereldwijde Oracle-prijslijst** (Construction & Engineering, 10-11-2016) die de 22%-onderhoudsvoet en de basisprijzen bevestigt. **De US$ 3.520 staat daar niet op** — het is een resellercijfer. De conclusie "± 40% regionale korting" is **vervallen**: ze berustte op een verouderde randprijs, een koers uit een ander jaar én een niet-primaire referentieprijs. Zie §4.2.
4. **Geen zetelaantallen van welke vendor dan ook.** Alle zetelramingen in §3.3 zijn afgeleid, niet gemeten.
5. **Geen directe bron over de planningssoftware van Chinese aannemers in Afrika.** §6.3 is grotendeels beredeneerd. Dit is het grootste inhoudelijke gat en verdient vervolgonderzoek (bijv. via Chineestalige bronnen of interviews met lokale onderaannemers).
6. **Eskom- en Transnet-citaten via snippets.** De onderliggende tenderdocumenten gaven 403 bij directe ophaal. De formuleringen zijn consistent over meerdere documenten, maar niet door mij in het originele document gelezen.
7. **De BSA-piraterijcijfers zijn uit 2018** (data 2017). Recentere BSA Global Software Surveys zijn niet gevonden; het is mogelijk dat BSA het onderzoek heeft gestaakt.
8. **Zoekcapaciteit was beperkt.** Het reguliere WebSearch-budget was aan het begin van deze sessie uitgeput; al het onderzoek is uitgevoerd via WebFetch op zoekmachine-endpoints en directe URL's, met regelmatige CAPTCHA- en 403-blokkades. Een aantal zoekopdrachten (Egyptische planners, SANRAL, Nodes & Links/ALICE) kon niet worden herhaald na blokkade.

---

*Rapport opgesteld 25 juli 2026. Alle bedragen in de valuta van de bron; USD-omrekeningen tegen ± R 18/USD, ± ₦ 1.500/USD, ± KES 129/USD tenzij anders vermeld. Cijfers gemarkeerd met **[E]** zijn eigen schattingen met expliciete redenering en geen bron.*

---

## Verificatie

Adversariële fact-check van 25 juli 2026. Opzet: voor elke bewering is actief geprobéérd haar te **weerleggen** met bronnen die het rapport zelf niet gebruikt (primaire beursberichten, officiële prijslijsten, statistiekbureau-publicaties), en zijn alle rekensommen nagerekend. Oordeel per bewering: **bevestigd** / **gecorrigeerd** / **onzeker**.

### Samenvatting van de uitkomst

Van de tien gecontroleerde kernbeweringen zijn er **vier bevestigd**, **vier gecorrigeerd** en **twee onzeker**. De twee zwaarstwegende correcties zitten allebei aan de omzetkant en werken in dezelfde richting — omláág:

1. Het Afrika-aandeel van CCS is niet 65–80% maar **50%** (vendorcijfer), waardoor de Candy-post in Zuid-Afrika ± 2× te hoog stond.
2. De Oracle-cloudprijs "vanaf US$ 144/gebruiker/jaar" hoort bij de voortgangsmodule, niet bij scheduling; de schedulingmodule staat op **US$ 1.800**, met een minimum van 25 in plaats van 5 gebruikers.

Netto verschuift de gecorrigeerde regioraming van US$ 45–75 mln (kop) c.q. US$ 42–78 mln (eerste correctieronde) naar **± US$ 40–73 mln met een centrale waarde rond US$ 50 mln**. De structuur van het rapport — Candy dominant bij ZA-aannemers, P6 contractueel afgedwongen bij opdrachtgevers, valuta als hoofdprobleem, Chinese aannemers als niet-adresseerbaar volume — is door de controle **niet aangetast**.

### Per bewering

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 1 | **Marktomvang US$ 45–75 mln p.j. (regio), ZA US$ 22–38 mln** | **gecorrigeerd** → **± US$ 40–73 mln**, ZA **US$ 17–25 mln**, centrale waarde ± US$ 50 mln. Twee onafhankelijke fouten stapelen: de mijnbouwrij verwart ZA- en Afrika-zetels (§3.3), en de Candy-rij is niet verenigbaar met RIB's eigen omzetcijfers (zie #2). De gepubliceerde bovengrens van 75 was bovendien nooit uit de componenten afgeleid (die sommeren tot 86). | eigen narekening + ↓ |
| 2 | **Anker 1: CCS-overname impliceert US$ 15–21 mln wereldomzet, waarvan 65–80% Afrika → US$ 5–12 mln Candy in ZA** | **deels bevestigd, deels weerlegd.** De omzetband is **bevestigd**: RIB publiceerde US$ 13,6 mln ARR en **>US$ 18 mln omzet 2019** bij **± 30% EBITDA-marge**; de SENS geeft R 78 mln werkelijke adjusted EBITDA FY2018 en R 74,7 mln forecast FY2019 — alles onderling consistent. Het **Afrika-aandeel is weerlegd: 50%** (Midden-Oosten 30%). Doorgerekend: Candy-ZA **US$ 3,5–5,0 mln (2019)**, nu ± US$ 4–8 mln — niet US$ 5–12 mln. | [SENS 2-7-2019](https://senspdf.jse.co.za/documents/SENS_20190702_S417023.pdf) · [Extranet Evolution](http://extranetevolution.com/2019/07/rib-buys-ccs-to-build-african-base/) · [ME Construction News](https://meconstructionnews.com/35853/germanys-rib-software-acquires-70-stake-in-construction-computer-software-ccs) |
| 2b | **Aanvullend weerleggend signaal (nieuw):** EOH verkocht de resterende 30% van CCS in mei 2020 voor **R 142,8 mln** — impliciet 100% ≈ R 476 mln, tegenover R 635 mln impliciet in juli 2019. | **onzeker in interpretatie, feit bevestigd.** Een waardedaling van ± 25% binnen een jaar (mogelijk COVID, mogelijk een vooraf afgesproken putprijs) **ondermijnt de aanname in §3.3 dat CCS' omzet sinds 2019 is gegroeid**. Behandel "US$ 12–22 mln huidige Afrika-omzet" als bovengrens. | [TechCentral](https://techcentral.co.za/eoh-offloads-remaining-ccs-stake-for-r143-million/175799/) |
| 3 | **MarketsandMarkets: ZA PPM-software US$ 126,9 mln (2024) → US$ 279,3 mln (2029), 17,1% CAGR** | **bevestigd** bij directe ophaal, inclusief de verticals (financiële dienstverlening, telecom, publieke sector) die de kern van het "PPM ≠ CPM"-argument vormen. Kleine afwijking: de vendorlijst noemt Microsoft, Oracle, SAP, Asana, ServiceNow, **Atlassian en Workday** — niet monday.com zoals §4.7 stelt. | [marketsandmarkets.com](https://www.marketsandmarkets.com/Market-Reports/geography/project-portfolio-management-software-market/south-africa) |
| 4 | **Oracle P6: US$ 3.520 lijstprijs, 22% onderhoud, OPC vanaf US$ 144/gebruiker/jaar met minimaal 5 gebruikers** | **gecorrigeerd.** Oracle's eigen *Construction & Engineering Global Price List* bevestigt **22% support** (P6 EPPM US$ 2.750 / US$ 605; P6 Professional US$ 2.500 / US$ 550) en de termijnstaffel — maar **kent US$ 3.520 niet** (alleen resellers; een bron uit 2025 noemt US$ 3.880). De cloudclaim is misleidend: **US$ 144/jr = Prime *Progress*, zonder minimum**; de **schedulingmodule (Prime Projects) staat op US$ 150/gebruiker/mnd = US$ 1.800/jr met minimum 25 gebruikers**. Gevolg: de blended US$ 700–1.100/zetel is eerder te laag dan te hoog. | [Oracle prijslijst (PDF)](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf) |
| 5 | **De "±40% regionale korting" op P6 in Zuid-Afrika** | **bevestigd als terecht geschrapt.** De eerste correctieronde had al vastgesteld dat het een valuta- en datumartefact is. Deze ronde voegt toe dat óók de referentieprijs (US$ 3.520) geen Oracle-lijstprijs is — de vergelijking had dus twee zwakke poten, niet één. **§9 punt 3 herhaalt de geschrapte conclusie nog steeds en moet worden bijgewerkt.** | ↑ #4 |
| 6 | **Microsoft Project ZA: R 13.799 (Standard 2024) / R 26.999 (Professional 2024)** | **bevestigd** op Microsofts eigen ZA-site ("R13 799,00" / "R26 999,00", eenmalige aankoop; Project Server zonder prijs, via partner). De abonnementsbedragen US$ 10/30/55 staan er **niet** op — blijven onzeker, zoals de eerste ronde al vaststelde. | [microsoft.com/en-za](https://www.microsoft.com/en-za/microsoft-365/project/compare-microsoft-project-management-software) |
| 7 | **RIB Candy prijs ± R 1.500/mnd/gebruiker; Capterra vanaf US$ 200; 4,5/5 over 252 reviews** | **deels bevestigd, deels onzeker.** Capterra ZA is herbevestigd: **US$ 200 startprijs, 4,5/5, 252 reviews, 90% aanbeveling**. De R 1.500/mnd van Le Roux Consulting kon **niet** worden herverifieerd (503) en blijft één consultantbron zonder tweede vindplaats; de ITQlick- en Skynode-cijfers zijn resp. aggregator en concurrent. **Er is nog steeds geen onafhankelijk bevestigde Candy-prijs.** | [capterra.co.za](https://www.capterra.co.za/software/126567/candy) |
| 8 | **Contract-/aanbestedingseis: Eskom schrijft Primavera P6 voor; Transnet koopt de hele Primavera-suite** | **bevestigd voor Transnet, onzeker gebleven voor Eskom.** De Transnet-aanbesteding is nu met kenmerk terug te vinden: **TCC/2024/11/0001/81962/RFP**, "*provision of Oracle Software as a Service (SaaS) application environments and software licenses for the Oracle Primavera Suite for a period of three (3) years*", sluitingsdatum **19 februari 2025**. Het Eskom-citaat is reproduceerbaar via zoekindexen maar het brondocument geeft nog steeds **403**; het blijft dus snippet-niveau. De *strekking* — tool contractueel voorgeschreven bij grote ZA-opdrachtgevers — is daarmee wel gedekt door minstens één primair verifieerbare aanbesteding. | Transnet e-Tenders 81962 · [Eskom tenderbulletin FileID 349035](https://tenderbulletin.eskom.co.za/webapi/api/Files/GetFile?FileID=349035) (403) |
| 9 | **Sancties/exportbeperkingen: verwaarloosbaar; Sudan is het enige Afrikaanse land op Microsofts restrictielijst** | **onzeker.** De in de eerste ronde geciteerde Microsoft-pagina kon ik **niet opnieuw ophalen** (404 op de opgegeven URL), dus het letterlijke citaat is niet herbevestigd. De *conclusie* dat sancties deze markt nauwelijks raken blijft plausibel, maar het rapport bespreekt **Zimbabwe** niet — een land dat wél in RIB's distributiedekking zit en waar entiteitsgerichte OFAC-designaties bestaan. Dat is een niet-onderzocht hoekje, geen aangetoonde fout. | — (niet herverifieerbaar) |
| 10 | **Marktleiderschap: Candy nummer 1 bij ZA-aannemers** | **bevestigd in richting, niet in maat.** Nieuw en sterker dan de eerder gebruikte marketingbronnen: RIB noemt Candy in zijn **investeerderscommunicatie bij de overname** "*No.1 in Africa*". Maar diezelfde bronnen — inclusief de SENS — omschrijven CCS consequent als **cost**-software ("cost estimation and project control"), niet als planningssoftware. Dat **versterkt de kanttekening** dat het volledig meerekenen van Candy als planningssoftware de markt overschat. Een gemeten marktaandeelcijfer bestaat nog altijd niet. | ↑ #2 |
| 11 | **Bouwomzet ZA R 605,6 mrd (2024), bouw-GVA 2,4% BBP** | **bevestigd, met correctie op de groeivoet.** De +8,9% is een **vierjaars-geannualiseerde** stijging t.o.v. R 430,8 mrd (2020), geen jaar-op-jaargroei. Nieuw: **539.056 werknemers**; grote ondernemingen 43,0% van de omzet met 21,4% van het personeel. Die werknemersbasis **bevestigt de plausibiliteit** van de planner-raming in §3.4 (0,6–1,1% toegewijde planners). | Stats SA Construction Industry Survey 2024, via [EWN](https://www.ewn.co.za/2026/07/09/construction-sector-income-rises-to-r6056bn-but-job-growth-lags) / [TimesLIVE](https://www.timeslive.co.za/news/business/2026-07-09-stats-sa-highlights-decline-of-construction-industrys-role-in-economy/) |
| 12 | **Chinese aannemers: US$ 40 mrd omzet in Afrika (2024)** | **bevestigd**, inclusief de top vijf (Algerije 5,3 / Nigeria 3,4 / Egypte 3,3 / Guinee 3,0 / DRC 2,7 mrd = 44% van het totaal) en Afrika = 24% van hun wereldomzet. De afgeleide stelling ">60% van alle internationale aannemersomzet (2019)" blijft **onzeker** — niet onafhankelijk teruggevonden. De correctie in §6.3 (geldt niet voor Zuid-Afrika) blijft staan. | [SAIS-CARI](https://www.sais-cari.org/data-chinese-contracts-in-africa) |
| 13 | **Elecosoft benoemde Agile Business Technology (11 sept. 2025) als Asta-reseller voor SSA** | **bevestigd** bij de bron. Prijs **£ 880/jaar** blijft **onzeker**: Elecosoft publiceert geen prijspagina (404) en de enige vindplaats is de aggregator pricingnow.com. | [eleco.com](https://eleco.com/news/agile-elecosoft-powerproject/) |
| 14 | **Deswik: Johannesburg-kantoor 2007, "eerste internationale kantoor"** | **bevestigd als citaat, blijft intern tegenstrijdig.** Deswik's eigen Afrika-pagina zegt letterlijk: "*As our first international office since its opening in 2007, our Johannesburg has been a cornerstone of our success*", terwijl Deswik elders **2008** als oprichtingsjaar geeft. De tegenstrijdigheid zit in de vendorcopy zelf; het rapport behandelt haar correct. De prijsindicatie **US$ 15.755,56 voor Deswik.Spatial** (Vinacomin-tender) kon ik **niet terugvinden** → **onzeker**. | [deswik.com/company/regions/africa](https://www.deswik.com/company/regions/africa) |
| 15 | **Training/consultancy als aanvullende markt van US$ 15–30 mln p.j.** | **onzeker — nergens afgeleid.** Anders dan alle andere ramingen in §3 staat hier geen enkele rekenstap. Mijn eigen grove bottom-up (± 20.000 cursusinschrijvingen p.j. à gemiddeld US$ 300 ≈ US$ 6 mln; plus 100–300 implementatietrajecten p.j. à R 600.000 ≈ US$ 3–10 mln) landt op **US$ 9–20 mln**. Bovendien botst het cijfer met de stelling in §6.4 dat dienstverlening de licentiekosten *overtreft*: 15–30 mln is 33–67% van de licentiemarkt, dus minder, niet meer. **Gebruik de onderkant van de band, of laat het cijfer vallen.** | eigen narekening |
| 16 | **Groei 8–13% p.j. in USD** | **onzeker.** Onfalsifieerbaar op deze horizon; de onderbouwing (krimpende bouwsector, valuta-afroming, PPM-groei zit elders) is intern consistent en de afwijking t.o.v. de 15–17% van de bureaus is expliciet gemotiveerd. Geen bezwaar, wel geen bewijs. | — |

### Rekencontroles (alle gereproduceerd)

| Controle | Uitkomst |
|---|---|
| R 444,39 mln ÷ (8,5 × 0,70) = EBITDA | R 74,69 mln ✔ — en de SENS bevestigt letterlijk dat 8,5× is toegepast op *70% van* de forecast adjusted EBITDA |
| R 74,7 mln ÷ R 14,11/USD | US$ 5,29 mln ✔ |
| US$ 18 mln × 30% EBITDA-marge → R bij 14,11 | R 76,2 mln ✔ — valt tussen de werkelijke FY2018 (R 78 mln) en de forecast FY2019 (R 74,7 mln) |
| R 142,8 mln ÷ 0,30 (tweede tranche) | R 476 mln voor 100% vs. R 635 mln in 2019 → **−25%** ⚠ |
| Componentensom ZA 22–38 + SSA 15–33 + EG 8–15 | **45–86**, kop zegt 45–75 ⚠ (al gecorrigeerd in §3.3) |
| Mijnbouw 600–1.500 × US$ 8.000–18.000 | **US$ 4,8–27 mln**, tabel zegt 6–20 ⚠ |
| Candy 6.000–12.000 × US$ 950–1.100 | US$ 5,7–13,2 mln ✔ reproduceert, maar botst met RIB's omzetcijfers ⚠ |
| MS Project 8.000–15.000 × US$ 250–450 | US$ 2,0–6,75 mln ✔ (afgerond 2–6) |
| P6 4.000–8.000 × US$ 700–1.100 | US$ 2,8–8,8 mln ✔ (afgerond 3–8) |
| ZA-tabel kolomsom | laag 18,5 / hoog 52 ✔ (gepubliceerd 19–52) |
| 4.500 planners × R 700.000 | R 3,15 mrd ✔; software R 400–700 mln = **12,7–22,2%** (gepubliceerd "12–20%" rondt de bovengrens weg ⚠) |
| P6 EPPM US$ 605 ÷ US$ 2.750 | **22,0%** ✔ — Oracle's eigen prijslijst, 22%-claim primair bevestigd |
| OPC "vanaf US$ 144/jaar" vs. schedulingmodule US$ 150/mnd | factor **12,5** verschil ⚠ |
| 3.000–6.000 planners ÷ 539.056 bouwwerknemers | 0,6–1,1% ✔ plausibel |

### Wat deze ronde niet kon controleren

- **Le Roux Consulting** (503 bij herophaling) — de bron achter de Candy- én P6-straatprijzen in dit rapport. Twee van de meest geciteerde prijspunten rusten dus op één niet-herverifieerbare consultantpagina.
- **Eskom-tenderdocumenten** (403) — citaat reproduceerbaar via zoekindex, brondocument niet.
- **BSA-piraterijcijfers** (403), **CIDB-registeraantallen** (21.331 niet onafhankelijk teruggevonden), **Deswik-tenderprijs**, **Asta £ 880**.
- **Het WebSearch-budget van de sessie raakte tijdens deze ronde uitgeput** (200/200); de laatste controles zijn via directe WebFetch en zoek-endpoints gedaan. De niet-gecontroleerde beweringen zijn hierboven expliciet als onzeker gemarkeerd in plaats van stilzwijgend overgenomen.
