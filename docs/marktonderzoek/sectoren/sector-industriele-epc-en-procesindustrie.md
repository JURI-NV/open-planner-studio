# Sectorrapport: Industriële EPC en procesindustrie

**Onderdeel van:** wereldwijd marktonderzoek planningssoftware
**Datum onderzoek:** 25 juli 2026
**Scope:** EPC-/EPCM-contractors, engineeringbureaus, procesindustrie-opdrachtgevers (olie & gas, LNG, raffinage, petrochemie, chemie, metallurgie, mijnbouw-processing, industriële energie), inclusief turnaround/shutdown-planning.

> **Leeswijzer bronvermelding.** Elk cijfer heeft een URL. Waar ik zelf reken of extrapoleer staat het expliciet als **[SCHATTING]** gemarkeerd, met de gebruikte redenering en aannames erbij. Waar bronnen elkaar tegenspreken staat dat er ook bij. Enkele marktcijfers komen uit commerciële "market research"-uitgevers waarvan de methodologie niet publiek is; die zijn gemarkeerd als **[ZWAKKE BRON]**.

---

## 1. Wat deze sector bijzonder maakt qua planning

### 1.1 Schaal en kapitaalintensiteit

De industriële EPC-sector is de zwaarste planningsomgeving die bestaat, in absolute cijfers.

EY analyseerde 365 megaprojecten met een voorgenomen kapitaalinvestering boven USD 1 miljard in vier segmenten (upstream, LNG, pijpleidingen, raffinage). Cumulatief vertegenwoordigden die projecten circa **USD 2,6 biljoen**. De verdeling ([EY, *Spotlight on oil and gas megaprojects*](https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf), figuur 3; cijfers uit de PDF geëxtraheerd):

| Segment | Investering | Aantal projecten | Gemiddelde projectomvang |
|---|---|---|---|
| Upstream | USD 1.080 mrd | 163 | USD 6,6 mrd |
| LNG | USD 539 mrd | 50 | USD 10,8 mrd |
| Pijpleiding | USD 348 mrd | 46 | USD 7,6 mrd |
| Raffinage | USD 607 mrd | 106 | USD 5,7 mrd |

Ter vergelijking: een gemiddeld LNG-project van USD 10,8 miljard is 50 tot 200 keer zo groot als een groot commercieel gebouw. Het planningsartefact schaalt mee: Level 3/4-schema's van 50.000 tot 300.000 activiteiten zijn in dit segment normaal, verdeeld over tientallen contractors.

De jaarlijkse investeringsstroom die deze planningsvraag voedt:

- Wereldwijde energie-investeringen 2025: **USD 3,3 biljoen** ([IEA via S&P Global](https://www.spglobal.com/energy/en/news-research/latest-news/energy-transition/060525-energy-investment-to-hit-record-33-trillion-in-2025-as-oil-capex-falls-iea)).
- Upstream olie & gas 2025: **net onder USD 570 miljard**, circa 4% lager dan 2024 ([IEA, *World Energy Investment 2025*, executive summary](https://www.iea.org/reports/world-energy-investment-2025/executive-summary)).
- Investering in olieproductie 2025: **USD 535 miljard**, tegen USD 599 miljard in 2024 (–6%) ([Energy Voice](https://www.energyvoice.com/oilandgas/573822/iea-predicts-6-drop-in-upstream-oil-investment-in-2025/)). **[VERIFICATIE — REKENFOUT/INCONSISTENT]** USD 599 mrd → USD 535 mrd is **–10,7%**, niet –6%. Óf de percentages óf de bedragen horen bij verschillende scopes (IEA rapporteert "–6%" voor *olieproductie-investering*, terwijl USD 599 mrd een bredere olie-aggregatie kan zijn). Zowel iea.org als energyvoice.com gaven bij hercontrole HTTP 403; het cijfertrio is niet te reconstrueren. Behandel als **onzeker**.
- Fossiele brandstoffen totaal (olie, gas, kolen) 2025: **USD 1,1 biljoen** ([Energy Voice](https://www.energyvoice.com/oilandgas/573822/iea-predicts-6-drop-in-upstream-oil-investment-in-2025/)).
- Gecombineerde internationale omzet van de ENR Top 250 International Contractors: **USD 499,7 miljard**, het hoogste niveau sinds 2015 ([ENR Global Review, december 2024, PDF](https://www.ayesa.com/wp-content/uploads/2025/01/ENR12232024_Global_R1_compressed.pdf)).

De EPC-markt als geheel wordt door commerciële onderzoeksbureaus geschat op USD 837–990 miljard rond 2024–2026, met sterk uiteenlopende definities **[ZWAKKE BRON]**:

| Bureau | Cijfer | Bron |
|---|---|---|
| Expert Market Research | USD 864,59 mrd (2025) | [expertmarketresearch.com](https://www.expertmarketresearch.com/reports/epc-engineering-procurement-and-construction-market) |
| Fact.MR | USD 936,1 mrd (2025) → USD 1.722,5 mrd (2036) | [factmr.com](https://www.factmr.com/report/epc-engineering-procurement-and-construction-market) |
| Business Research Insights | USD 988,77 mrd (2026) → USD 1.628,95 mrd (2035) | [businessresearchinsights.com](https://www.businessresearchinsights.com/market-reports/engineering-procurement-construction-epc-market-120144) |
| Dimension Market Research | USD 974,4 mrd (2025) → USD 1.131,8 mrd (2034) | [dimensionmarketresearch.com](https://dimensionmarketresearch.com/report/engineering-procurement-and-construction-epc-market/) |
| Research and Markets / EMR | USD 837,78 mrd (2024) → USD 1,14 bln (2034) | [researchandmarkets.com](https://www.researchandmarkets.com/reports/5868052/epc-engineering-procurement-construction) |

De spreiding (837–989 mrd voor ongeveer hetzelfde jaar) laat zien dat deze cijfers definitiegedreven zijn en niet als precisiegetal bruikbaar zijn; ze dienen hier als orde-van-grootte.

### 1.2 Doorlooptijd

Een industrieel megaproject doorloopt: concept → FEL-1/2 → FEED → FID (Final Investment Decision) → detailed engineering → procurement → construction → pre-commissioning → commissioning → startup → performance test. Voor LNG- en raffinageprojecten is 6 tot 10 jaar van concept tot productie normaal; de post-FID-uitvoeringsfase alleen al is doorgaans 3 tot 5 jaar.

Dit betekent voor de planningssoftware:

- **Één schema leeft langer dan een softwareversie.** Baselines uit jaar 1 moeten in jaar 7 nog leesbaar en forensisch analyseerbaar zijn. Bestandsformaatstabiliteit is hier geen nice-to-have maar een contractuele noodzaak.
- **Maandelijkse update-cyclus × 60–120 maanden** levert 60–120 gearchiveerde schemastatussen op per contract, die allemaal bewaard moeten blijven voor claimanalyse (zie §5).
- De EY-analyse is expliciet dat de post-FID-fase de gevaarlijkste is: van de 20 grootste post-FID-projecten had **65% kostenoverschrijding, met gemiddeld 23% escalatie ten opzichte van het goedgekeurde FID-budget** ([EY](https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf)).

### 1.3 Resourcecomplexiteit

Wat deze sector onderscheidt van gebouwbouw:

1. **Multi-contractorstructuur.** Een LNG-trein wordt gebouwd door een joint venture van 2–4 EPC-contractors, met 50–300 onderaannemers en honderden equipmentleveranciers. Elk levert een eigen schema dat in het masterschema moet worden geïntegreerd.
2. **Engineering-, inkoop- en bouwlogica in één netwerk.** Anders dan in gebouwbouw zit de kritieke lijn vaak in *procurement*: levertijden van compressoren, kolommen, warmtewisselaars en long-lead items van 60–130 weken bepalen bouwvolgorde en dus de netwerklogica. Planning en inkoop zijn niet scheidbaar.
3. **Modulaire bouw en yard-logistiek.** Modules worden in Zuid-Korea, China of de Golfregio gebouwd en per zeetransport aangevoerd. Weersvensters, sealift-schema's en heavy-lift-kraancapaciteit zijn harde constraints in het netwerk.
4. **Craft-labour piekbelasting.** Constructiepieken van 5.000–20.000 arbeiders op één site vereisen resource-levelling over meerdere schema's, met kalenders per craft, per shift, per land, plus roster-patronen (rotaties 28/28, 14/14) die de standaardkalendermodellen van planningstools niet native ondersteunen.
5. **Turnarounds/shutdowns (STO).** In de draaiende procesindustrie is de tweede planningsdiscipline de turnaround: 15.000–60.000 activiteiten in 20–60 dagen, met uurniveau-granulariteit, en waarbij elke dag stilstand direct margeverlies is. Dit is een eigen niche met eigen tooling ([Prometheus Group STO](https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage)), maar bijna altijd bovenop of naast Primavera P6 ([Emerald Associates T100-training "Turnaround Management Using Primavera P6"](https://www.emerald-associates.com/training/course-descriptions/t100-turnaround-management-using-primavera-p6.html)).

### 1.4 Contractuele eisen

Planning is in deze sector een **contractueel deliverable**, geen intern hulpmiddel. Dat is het scherpste verschil met vrijwel elke andere sector.

- Opdrachtgevers schrijven het schemaniveau, de codering, de updatefrequentie en het bestandsformaat voor. Saudi Aramco doet dat via **SAEP-331**, dat zeven schemaniveaus definieert van Business Plan Project Schedules tot gedetailleerde Level IV Project Control Schedules, met Primavera P6 als platform ([samenvatting via Kazinex](https://docs.kazinex.com/blog/aramco-saep-schedule-quality-check); [SAEP-331 documentkopie](https://www.scribd.com/document/698960445/SAEP-331)). **[VERIFICATIE — ONZEKER]** De Kazinex-pagina bevat bij hercontrole géén beschrijving van zeven schemaniveaus en géén uitspraak dat SAEP-331 Primavera P6 voorschrijft; ze zegt alleen dat "Aramco's SAEP-series and equivalents at other owners specify how programmes are structured, coded, and progressed". De Scribd-kopie is niet machinaal verifieerbaar. Het *bestaan* van owner-schemaspecificaties is solide; de specifieke inhoud van SAEP-331 (zeven niveaus, P6 verplicht) is **niet met een toegankelijke bron gestaafd** en draagt elders in dit rapport wel gewicht (§7.2, §7.4).
- Voortgangsbetaling is aan het schema gekoppeld: progress measurement via rules-of-credit per activiteit, geverifieerd door de opdrachtgever, bepaalt de maandelijkse factuur.
- Extension-of-Time-claims (EOT) worden uitsluitend erkend als ze met CPM-analyse op het geaccepteerde schema zijn onderbouwd (zie §5).

### 1.5 Kosten van vertraging

Dit is de reden waarom de betalingsbereidheid in deze sector zo hoog is.

- **Liquidated damages:** typische boeteclausules in EPC-contracten liggen tussen **USD 50.000 en USD 500.000 per dag** ([Giga Energy, *How to avoid liquidated damages: Key insights for EPCs*](https://www.gigaenergy.com/blog/avoid-liquidated-damages)). Bij een LNG-trein van USD 10 miljard is een LD-cap van 10% van de contractwaarde niet ongebruikelijk — dat is USD 1 miljard aan risico dat op het schema hangt.
- **Gederfde omzet:** een LNG-trein van 5 MTPA die drie maanden later opstart, produceert drie maanden niet. Bij USD 10/MMBtu is dat orde USD 300+ miljoen aan cashflow-uitstel.
- **Waardevernietiging op assetniveau:** volgens onderzoek aangehaald door EY zagen projecten die de geplande productieniveaus niet binnen budget en schema haalden hun netto-assetwaarde (NAV) **met 12% tot 65% dalen**, afhankelijk van rendementseisen, projectlevensduur, kapitaalintensiteit en fiscaal regime ([EY](https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf), verwijzend naar UBS 2013).
- **Disputen:** de gemiddelde waarde van een bouwgeschil wereldwijd was **USD 42 miljoen** in de Arcadis Global Construction Disputes Report 2025; in Noord-Amerika **USD 60,1 miljoen** met een gemiddelde duur van **12,5 maanden** ([Arcadis 2025 via CMAA](https://www.cmaanet.org/sites/default/files/resource/State%20of%20Construction_0.pdf); [regionale cijfers via LinkedIn-samenvatting Arcadis](https://www.linkedin.com/posts/joe-seibold-602862b_the-2025-construction-disputes-report-has-activity-7348359836314517506-POxD)). **[VERIFICATIE — ONZEKER, BRON DEKT DE CIJFERS NIET]** De CMAA-PDF is lokaal volledig uitgelezen: het is een kwalitatief opinieartikel over de Arcadis 2025-editie en bevat **geen enkel bedrag** — niet USD 42 mln, niet USD 60,1 mln, niet 12,5 maanden. De Arcadis-hoofdpagina toont bij hercontrole nog de 2022-editie zonder deze cijfers; de LinkedIn-post is niet machinaal toegankelijk. De geschilbedragen zijn dus **niet geverifieerd** en worden verderop (§3.6.4, §7.2) als onderbouwing gebruikt. Juridische en expertkosten alleen consumeren routinematig 10–15% van de betwiste contractwaarde ([idem](https://www.linkedin.com/posts/joe-seibold-602862b_the-2025-construction-disputes-report-has-activity-7348359836314517506-POxD)).
- Vertragingsschade is de **centrale claim in meer dan 70% van de beoordeelde EPC-arbitrages**, vaak met een waarde in de tientallen miljoenen ([Aegis PMC](https://www.aegispmc.com/delay-damages-in-construction-projects-a-practical-guide)).

### 1.6 De prestatiecijfers die dit alles rechtvaardigen

| Bevinding | Cijfer | Bron |
|---|---|---|
| Megaprojecten olie & gas met kostenoverschrijding | 64% | [EY](https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf) |
| Megaprojecten met schemavertraging | 73% | [EY](https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf) |
| Cumulatieve kostentoename over 205 projecten met kostendata | van USD 1,2 bln naar USD 1,7 bln = **+USD 500 mrd** | [EY](https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf) |
| Gemiddelde overschrijding t.o.v. initiële raming | 59% | [EY](https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf) |
| Kostenoverschrijding per segment | LNG/pijpleiding/raffinage/upstream: 62–67% van projecten | [EY](https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf), figuur 5 |
| Upstream megaprojecten met overschrijding of vertraging (IPA 2011) | 78%, tegen 50% in 2003 | IPA-studie 2011, geciteerd in [EY](https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf) |
| Gemiddelde kostenoverschrijding megaprojecten > USD 1 mrd | ~80%, schemavertraging ~50% | [McKinsey](https://www.mckinsey.com/capabilities/operations/our-insights/dont-cancel-or-coddle-at-risk-capital-projects-challenge-them) |
| Megaprojecten met kostenoverschrijding > 30% | > 70% | McKinsey 2024, geciteerd via [ALGA Processing](https://algaprocessing.com/post/epc-project-management-and-lifecycle-challenges-proven-strategies-for-mitigating-delays-cost-overr) |
| Oorzaak van projectfalen: "zachte" aspecten (mensen, organisatie, governance) | 65% | Credit Suisse OTC 2013, geciteerd in [EY](https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf) |
| Oorzaak: managementprocessen, contractering en inkoopstrategie | 21% | idem |
| Oorzaak: externe factoren | 14% | idem |

Het meest relevante EY-citaat voor planningssoftware, letterlijk uit het rapport onder "Ineffective project management":

> "project plans often leave out the necessary schedule management elements of schedule development, acceptance, progress measurement and reporting, and their relationship to and interdependence with other project disciplines, meaning that project teams fail to fully understand critical activities and the full effect of change on the schedule and other work packages. The challenge of working with multiple contractors, each with separate but often interlinked work scopes, exacerbates this planning problem as real-time data is challenging to recover."
> — [EY, *Spotlight on oil and gas megaprojects*, p. 11](https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf)

Dit is precies de functionele lacune waar planningssoftware in deze sector op verkocht wordt: multi-contractor schema-integratie met real-time data.

---

## 2. Welke planningssoftware hier daadwerkelijk gebruikt wordt

### 2.1 Marktaandeel-indicatie

Firmografische telling van websites/organisaties die de software gebruiken ([6sense, categorie project management, stand 2026](https://6sense.com/tech/project-management/oracle-primavera-suite-market-share)):

| Product | Marktaandeel | Aantal klanten (domeinen) |
|---|---|---|
| Teamwork | 48,07% | 17.916 |
| **Oracle Primavera Suite** | **20,05%** | **7.474** (#2 in de categorie) |
| SAP Project System | 6,48% | 2.416 |
| Microsoft Project Portfolio Management | 5,77% | 2.150 |

Deze telling is sector-overstijgend en overweegt lichte SaaS-tools; binnen zware kapitaalprojecten is Primavera's aandeel substantieel hoger. Dat is niet met een publiek percentage te onderbouwen; ik markeer het als **[SCHATTING]**: binnen industriële EPC-hoofdaannemers en procesindustrie-opdrachtgevers schat ik het aandeel van Primavera P6 op het masterschema-niveau op **75–90%**, op basis van (a) de contractuele voorschrijving door opdrachtgevers zoals Aramco SAEP-331, (b) het feit dat vrijwel alle schemakwaliteits- en risicotools XER als primair invoerformaat hebben, en (c) de trainingsmarkt die vrijwel volledig P6-gecentreerd is.

### 2.2 Rangorde per rol

#### Rang 1 — Oracle Primavera P6 (Professional / EPPM)
De feitelijke standaard voor het CPM-masterschema. Oracle positioneert P6 EPPM expliciet als oplossing voor "critical path method (CPM) scheduling, resource management, and integrated cost and schedule management" ([Oracle](https://www.oracle.com/industries/construction-engineering/primavera-p6/)).

**Wie:** opdrachtgever (schemareview en acceptatie), hoofdaannemer (masterschema, Level 3), engineeringbureau (engineering-deelschema), grotere onderaannemers (Level 4-detailschema). Genoemd in verband met Bechtel, Fluor, Worley en Saipem ([Oracle Primavera P6-pagina](https://www.oracle.com/construction-engineering/primavera-p6/)); dit is echter marketingpositionering en geen geverifieerde klantverklaring per bedrijf.

#### Rang 2 — Kostengeïntegreerde project-controls-suites
De laag boven het schema, waar kosten en planning samenkomen (EVM, forecasting, change management).

- **EcoSys → Octave Sequence Enterprise.** EcoSys is per 2025/2026 hernoemd tot Sequence Enterprise onder Octave, de afgesplitste softwaretak van Hexagon. Hexagon kondigde de naam Octave in juni 2025 aan ([Hexagon persbericht](https://hexagon.com/company/newsroom/press-releases/2025/octave-unveiled)); in februari 2026 volgde de update over de formele afsplitsing ([Hexagon](https://hexagon.com/company/newsroom/press-releases/2026/hexagon-announces-update-on-planned-spin-off-of-octave/)); de merklancering was maart 2026, waarbij Octave bestaat uit Hexagon's Asset Lifecycle Intelligence en Safety, Infrastructure & Geospatial plus Bricsys, ETQ en Projectmates ([samenvatting](https://www.octave.com/learn/resources/blogs/ecosys-becomes-octave-sequence-enterprise)). Sequence Enterprise 10 staat gepland voor zomer 2026 met ingebouwd documentmanagement, sterkere cloudarchitectuur en AI-functies ([idem](https://www.octave.com/learn/resources/blogs/ecosys-becomes-octave-sequence-enterprise)).
  Functioneel: portfoliomanagement, project controls, planning/scheduling/estimating-integratie, **earned value management**, budgettering en forecasting, capital budgeting ([Octave productpagina](https://www.octave.com/products/project-performance/sequence/sequence-enterprise)). Genoemde referenties: **Technip Energies**, Nippon Steel Engineering, Turner & Townsend, Ball Aerospace, Burns & McDonnell ([idem](https://www.octave.com/products/project-performance/sequence/sequence-enterprise)) — Technip Energies is een top-tier procesindustrie-EPC, wat de sectorrelevantie bevestigt.
- **InEight.** Ontstaan binnen Kiewit. Twaalf modules (Estimate, Schedule, Control, Plan & Progress, Change, Contract, Document, Completions, Compliance, Design, Model, Billings, Report & Explore) ([InEight pricing-overzicht](https://ineight.com/pricing-overview/)). InEight Schedule levert "full CPM capabilities with integrated look-ahead planning and risk management" en richt zich expliciet op Oil, Gas & Chemical, Power & Renewables, Nuclear, Mining, Water en Transportation ([InEight Schedule](https://ineight.com/products/construction-scheduling-software-for-capital-projects-ineight-schedule/)). Genoemde gebruikers: AECOM (Program Controls Engine, Project Control Summit 2025 award), CCC Group, Chemex Global, B&F Contracting.
- **SAP Project System (PS) / S/4HANA.** De ERP-kant: WBS, netwerken, kostenverzameling, inkooporders, revenue recognition. 6,48% marktaandeel in de PM-categorie, 2.416 domeinen ([6sense](https://6sense.com/tech/project-management/oracle-primavera-suite-market-share)). SAP PS is bij vrijwel elke grote EPC de financiële ruggengraat; het schema blijft in P6. De integratie P6↔SAP is een eigen productcategorie: Oracle levert een Project Integration Framework ([Oracle](https://www.oracle.com/construction-engineering/integrating-oracle-primavera-p6-and-sap/), [technisch document](https://www.oracle.com/a/ocom/docs/integrating-oracle-primavera-p6-and-sap.pdf)), en er zijn derde partijen zoals Commondo ([Commondo ePPM Integration Suite](https://www.commondo.eu/products/commondo-eppm-integration-suite)) en Emerald Associates P6-Loader ([Emerald](https://www.emerald-associates.com/item/sap-integrated-to-p6-with-p6loader.html)). De oude SAP EPC-connector (Enterprise Project Connector) is obsoleet, wat de integratie-markt open houdt ([SAP Community](https://community.sap.com/t5/enterprise-resource-planning-q-a/sap-ps-and-primavera-integration/qaq-p/14298251)).

#### Rang 3 — Schemakwaliteit, forensiek en risico
Deze laag bestaat *omdat* P6 er zelf niet in voorziet.

- **Deltek Acumen Fuse** — schemadiagnostiek en forensiek met "more than 600 industry-aligned metrics" gebaseerd op DCMA-, DOE-, NASA-, GAO- en AACE-standaarden; verkocht aan overheid, defensie, A&E, bouw, **energie/olie & gas** en infrastructuur ([Deltek](https://www.deltek.com/en/products/project-and-portfolio-management/acumen/fuse)).
- **Safran Project / Safran Risk** — Noorse leverancier met sterke positie in Noordzee-olie & gas; Monte Carlo-schemarisicoanalyse ([Safran docs](https://docs.safran.com/docs/safran-project-schedule-risk-analysis)).
- **Oracle Primavera Risk Analysis (PRA)** — het klassieke Pertmaster-product, nog in de Oracle-prijslijst ([Oracle Construction & Engineering Global Price List](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf)).
- QSRA (Quantitative Schedule Risk Analysis) met P50/P80/P95-uitkomsten is standaardpraktijk vóór FID; de genoemde tools zijn Safran, P6 PRA en Acumen ([SOMA Project Controls glossarium](https://www.somaprojectcontrols.com/resources/glossary/qsra-quantitative-schedule-risk-analysis/)).
- **ScheduleReader** — read-only XER/XML-viewer, expliciet gepositioneerd voor DCMA-14-analyse zonder P6-licentie ([ScheduleReader](https://schedulereader.com/dcma-14-point-assessment-project-schedule-quality-analysis/)).
- **PlanXER** — nieuwe SaaS-XER-analyzer, letterlijk gepositioneerd tegen de kostenpijn van P6 (zie §7).
- **nPlan** — ML-gebaseerde vertragingsvoorspelling, getraind op "more than 750,000 projects representing over USD 2,5 trillion of capital spend", USD 16 miljoen opgehaald ([Digital Construction Plus via zoekresultaat](https://digitalconstructionplus.com/); [nPlan](https://www.nplan.io)). **[VERIFICATIE — GECORRIGEERD]** De eigen site zegt bij hercontrole: *"a dataset of 750,000 historical schedules representing over **$2Tn** of construction spend"* plus *"$500bn of projects under active management"*. Dus **USD 2 biljoen, niet 2,5 biljoen**, en het gaat om *schedules*, niet *projects*. Het opgehaalde bedrag van USD 16 miljoen staat **nergens op de site** en is met de beschikbare bronnen niet te verifiëren — behandel als **onzeker** (nPlan haalde publiek gerapporteerd meer op dan USD 16 mln, dus het cijfer is vermoedelijk verouderd of onvolledig).

#### Rang 4 — Aangrenzend, maar sectorspecifiek
- **Cleopatra Enterprise** (Nederlands, Cost Engineering Consultancy) — total cost management voor procesindustrie: kostenramen, kostenbeheersing, turnaround management, expliciet voor "oil and gas, chemicals, energy, and industrial process construction" ([SaaSRat](https://saasrat.com/products/cleopatra-enterprise); [Cleopatra](https://cleopatraenterprise.com/cost-estimating-software/)).
- **Prometheus Group STO** — shutdown/turnaround/outage-planning ([Prometheus](https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage)).
- **Oracle Primavera Unifier** — project controls/kostenbeheersing, cost breakdown, change management; in de Oracle-prijslijst met NEC4-variant ([Oracle G-Cloud 14 pricing](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf)).
- **Oracle Aconex** — documentbeheer en contractcorrespondentie, in dezelfde G-Cloud-prijslijst.

### 2.3 Rolverdeling in de keten

| Rol | Primair planningsinstrument | Tweede laag |
|---|---|---|
| **Opdrachtgever / owner** (Aramco, ADNOC, Shell, TotalEnergies, Dow, BASF) | P6 EPPM als review- en integratieplatform; eigen schemastandaard (bv. SAEP-331) | EcoSys/Sequence of Unifier voor kostenintegratie; Acumen/Safran voor schemakwaliteit en QSRA |
| **PMC / owner's engineer** (Jacobs, Wood, KBR, Worley) | P6 (schemareview, assurance) | Acumen Fuse, ScheduleReader, forensische tooling |
| **Hoofdaannemer / EPC** (Fluor, Bechtel, Technip Energies, Saipem, Samsung E&C, Hyundai E&C, Petrofac, Chiyoda, JGC) | P6 EPPM, meestal enterprise-installatie met honderden seats | EcoSys/Sequence of InEight voor cost-schedule-integratie; SAP PS voor financiën; Safran/PRA voor risico |
| **Engineeringbureau** (detail engineering) | P6 voor engineering-deelschema, soms MS Project | Eigen deliverable-tracking (vaak Excel of het EDMS) |
| **Onderaannemer / fabricator / yard** | Excel en MS Project; P6 alleen wanneer contractueel afgedwongen | Aangeleverde P6-templates van de hoofdaannemer |
| **Vendor / equipmentleverancier** | Excel/MS Project; levert milestone-updates in spreadsheetvorm | — |

Dit is de sleutelasymmetrie: de bovenkant van de keten draait op P6, de onderkant op Excel, en het masterschema moet die twee werelden maandelijks samenvoegen. Precies wat EY beschrijft als "real-time data is challenging to recover" ([EY](https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf)).

---

## 3. Wat ervoor betaald wordt

### 3.1 Oracle Primavera — gepubliceerde lijstprijzen (perpetual)

Uit de **Oracle Construction & Engineering Global Price List** (versie gedateerd 10-NOV-2016; dit is de meest recente publiek toegankelijke Primavera-prijslijst die ik kon vinden — Oracle publiceert nieuwere Primavera-lijsten niet meer openbaar) ([PDF](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf)):

| Product | Licentie (USD) | Software Update License & Support p.j. (USD) | Metric | Minimum |
|---|---|---|---|---|
| Primavera P6 Enterprise Project Portfolio Management | 2.750 | 605,00 | Application User | — |
| Primavera P6 Professional Project Management | 2.500 | 550,00 | Application User | — |
| Primavera P6 Progress Reporter | 950 | 209,00 | Application User | — |
| Primavera Earned Value Management | 10.000 | 2.200,00 | Application User | — |
| Primavera Risk Analysis | 9.500 | 2.090,00 | Application User | — |
| Primavera Unifier Project Controls | 3.950 | 869,00 | Application User | 25 |
| Primavera Unifier Portal User | 75 | 17,00 | Application User | 100 |
| Primavera Analytics | 2.000 | 440,00 | Application User | 25 |
| Primavera Portfolio Management | 2.900 | 638,00 | Application User | 50 |
| Primavera Contract Management (BI Publisher Edition) | 2.000 | 440,00 | Application User | — |
| Primavera Data Warehouse | 25.000 | 5.500,00 | **Processor** | — |
| Primavera Contractor | 1.295 | 285,00 | Application User | — |
| Primavera Gateway (integratie) | 20.000 | 4.400,00 | Application User | 5 |
| P6 EPPM Web Services | 500 | 110,00 | Application User | 10 |

**Termijnlicenties** (uit dezelfde lijst): 1 jaar = 20% van de lijstprijs, 2 jaar = 35%, 3 jaar = 50%, 4 jaar = 60%, 5 jaar = 70%. De supportprijs voor termijnlicenties is **22% van de perpetual-lijstprijs**, waarbij de termijnpercentages níét op de supportprijs worden toegepast.

Cloud-abonnementen in dezelfde 2016-lijst (maandelijkse abonnementsprijs per Hosted Named User): P6 EPPM Cloud Service USD 125 (min. 25), Progress Reporter USD 12, Unifier Project Controls USD 150 (min. 25), Primavera Analytics USD 90, Oracle Prime Projects USD 150 (min. 25), Oracle Prime Portfolios USD 125.

### 3.2 Oracle Primavera — actuele gepubliceerde SaaS-prijzen

De beste actuele publieke bron is Oracle's eigen **G-Cloud 14-prijsdocument voor de Britse overheid, mei 2024** ([PDF, ref. BD.G14.OCS.002](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf)):

| Dienst | Prijs | Eenheid | Minimum |
|---|---|---|---|
| Primavera P6 EPPM Cloud Service | **£ 220 per maand** | Hosted Named User | 25 |
| Primavera P6 Progress Reporter Cloud Service | £ 24 per maand | Hosted Named User | — |
| P6 EPPM Web Services Cloud Service | £ 36 per maand | Hosted Named User | — |
| P6 EPPM **UK Government** Cloud Service | £ 439 per maand | Hosted Named User | 50 |
| P6 UK Gov, extra non-productieomgeving | £ 7.188 per maand | Environment | — |
| P6 UK Gov, extra productieomgeving | £ 148 per maand | Hosted Named User | 25 |
| Primavera Unifier UK Gov Cloud Service | £ 459 per maand | Hosted Named User | 50 |
| Unifier UK Gov met NEC4 | £ 539 per maand | Hosted Named User | 50 |
| Unifier Portal User | £ 2 per maand | Hosted Named User | 100 |
| Unifier Team for External Collaborators | £ 44 per maand | Hosted Named User | 10 |
| Unifier Team for External Collaborators met NEC4 | £ 56 per maand | Hosted Named User | 10 |
| AutoVue 2D Professional Cloud | £ 12 per maand | Hosted Named User | = aantal Unifier-users |
| AutoVue 3D Professional Advanced Cloud | £ 44 per maand | Hosted Named User | = aantal Unifier-users |
| Oracle Construction Intelligence Cloud Analytics | £ 40 per maand | Hosted Named User | 10 |
| Construction Intelligence Cloud, per databron (Aconex / OPC / P6 EPPM SaaS / Unifier) | £ 799 per maand | per bron | — |
| Primavera Cloud Service, extra non-productieomgeving | £ 3.954 per maand | Environment | — |
| Aconex Documents / Packages / Handover (single project, enterprise) | £ 7 / £ 8 / £ 8 per maand | Hosted Named User | 5 |
| Aconex Model Coordination | £ 9 per maand | Hosted Named User | 5 |
| Aconex Field | £ 52 per maand | Hosted Named User | 5 |
| Aconex Contract Management | £ 176 per maand | Hosted Named User | 5 |

**Volumekortingen P6 EPPM Cloud** (zelfde document): 101–200 gebruikers 10%, 201–500 gebruikers 15%, 501–1.000 gebruikers 20%, 1.001+ gebruikers 25%.

Oracle Primavera Cloud (OPC, het nieuwere platform) wordt door een prijsvergelijker per gebruiker per jaar genoteerd (bijgewerkt 25 juni 2026) ([FindPM](https://findpmsoftware.com/products/primavera-cloud)):

| OPC-dienst | Prijs per gebruiker per jaar | Omgerekend per maand |
|---|---|---|
| Progress Cloud Service | USD 144 | USD 12 |
| Task Management Cloud Service | USD 660 | USD 55 |
| **Scheduling Cloud Service** | **USD 1.320** | **USD 110** |
| Portfolio Planning Cloud Service | USD 2.640 | USD 220 |

Deze reeks komt exact overeen met de structuur uit Oracle's eigen G-Cloud-document (Schedule = core, Task Management/Progress = add-on, Portfolio and Capital Planning = core), wat de betrouwbaarheid verhoogt.

**Praktische lezing:** een P6-planner-seat kost in dit segment tussen **USD 1.300 en USD 3.400 per jaar aan lijstprijs**, afhankelijk van cloud-tier en regio, met 10–25% volumekorting bij grote deployments en in de praktijk verdergaande onderhandelde kortingen bij enterprise-overeenkomsten **[SCHATTING: onderhandelde korting 30–60% bij deployments boven ~500 seats, gebaseerd op het gepubliceerde kortingsschema plus het algemene patroon dat Oracle-lijstprijzen in enterprise-deals fors worden afgeschreven — dit is niet met een publieke bron te staven]**.

### 3.3 Typische contractwaarden

Concrete, publiek verifieerbare aanbestedingsdata:

- **US Army Corps of Engineers, PROMIS Program Office** — "USACE HQ – oracle primavera software licenses". Totale contractwaarde **USD 24.480.375**, initiële verplichting USD 4.896.075, gegund aan Affigent LLC via NASA SEWP (Award ID W912HQ25F0051), looptijd **18 februari 2025 t/m 17 februari 2030**, 4 inschrijvers ([OrangeSlices AI contract award](https://orangeslices.ai/contract-award-24-5m-us-army-corps-of-engineers-usace-promis-program-office-oracle-primavera-software-licenses/)). Dat is ≈ **USD 4,9 miljoen per jaar aan pure Primavera-licenties voor één grote opdrachtgeversorganisatie**.
- Texas DOT heeft een aparte raamovereenkomst voor "Primavera P6 Software Products" aanbesteed ([HigherGov](https://www.highergov.com/sl/contract-opportunity/tx-primavera-p6-software-products-67809428/)).
- Britse overheid gunde P6 EPPM Cloud direct via het G-Cloud 14-kanaal ([Find a Tender notice 041429-2025](https://www.find-tender.service.gov.uk/Notice/041429-2025/PDF) — waarde niet toegankelijk, de pagina blokkeert geautomatiseerde toegang).

**[SCHATTING] typische jaarlijkse softwarecontractwaarde per organisatietype in industriële EPC:**

| Organisatietype | Aantal planner-/controls-seats | Geschatte jaarlijkse softwareuitgave (planning + controls) |
|---|---|---|
| Grote EPC-contractor (Fluor/Bechtel/Technip-klasse) | 500–2.000 | USD 2–10 miljoen |
| Middelgrote EPC / regionale contractor | 50–300 | USD 200.000–1,5 miljoen |
| Owner/operator met eigen capital projects group | 100–800 | USD 0,5–5 miljoen (USACE-casus: USD 4,9 mln/jaar) |
| Engineeringbureau / PMC | 30–200 | USD 100.000–800.000 |
| Onderaannemer | 1–10 | USD 3.000–35.000 |

*Redenering:* seats × USD 1.300–3.400 lijstprijs, gecorrigeerd met 30–50% enterprisekorting, plus een factor 1,5–2,5 voor de kostenlaag (EcoSys/InEight/Unifier), integratie (Gateway USD 20.000 + support), analytics (Data Warehouse USD 25.000 per processor) en risicotools. De USACE-casus (USD 4,9 mln/jaar) valideert de owner-rij.

### 3.4 Prijzen van de overige pakketten

| Product | Genoteerde prijs | Bron | Betrouwbaarheid |
|---|---|---|---|
| EcoSys EPC / Sequence Enterprise | vanaf ~USD 200 per gebruiker per maand | [ITQlick](https://www.itqlick.com/ecosys-epc/pricing) | Prijsvergelijker, geen leveranciersbron — **matig** |
| InEight (alle modules) | niet gepubliceerd; enterprise op maat (afhankelijk van gebruikers, producten, contractduur) plus "InEight NOW" per-user maand/jaar-abonnement | [InEight](https://ineight.com/pricing-overview/) | Leveranciersbron, maar zonder bedragen |
| Deltek Acumen | ~USD 75 per gebruiker per maand | [ITQlick](https://www.itqlick.com/acumen/pricing) | Prijsvergelijker — **matig** |
| Safran Project | ~USD 150/maand (1 gebruiker); ~USD 1.200/maand (10); USD 10.000+/maand (100) | [ITQlick](https://www.itqlick.com/safran-project/pricing) | **Zwak** — een andere ITQlick-pagina noemt USD 20 per gebruiker per maand; de bronnen spreken elkaar tegen |
| Cleopatra Enterprise | vanaf USD 10.000 **per project**, modulair | [ITQlick](https://www.itqlick.com/cleopatra-enterprise/pricing) | Prijsvergelijker — **matig**; het project-gebaseerde model is wel consistent met de sector |
| SAP Professional Use named-user licentie | ~USD 4.500 lijstprijs; Advanced Use ~USD 2.000 | [Reveal Compliance](https://revealcompliance.com/blog/sap-license-cost-2026) | Consultancy-bron — **matig** |
| SAP S/4HANA per gebruiker | USD 200–716 per gebruiker per maand | [CostBench](https://costbench.com/software/erp/sap-s4hana/calculator/) | Calculator-bron — **matig** |
| PlanXER (XER-analyse, geen P6-licentie nodig) | USD 39 / 99 / 249 per maand | [PlanXER](https://planxer.pro/) | **Leveranciersbron, gepubliceerd** |
| ScheduleReader PRO (XER/XML-viewer) | per-seat, niet in bron gevonden | [ScheduleReader](https://schedulereader.com/dcma-14-point-assessment-project-schedule-quality-analysis/) | — |

### 3.5 Implementatie- en trainingskosten

- **Training P6:** USD 500 tot 1.500 per persoon voor een volledige cursus ([Team Academy](https://www.teamacademy.net/primavera-p6-project-professional-training-and-certification)). Standaardduur: P6 Basics 3 dagen, P6 Advanced 2 dagen ([Global PM](https://globalpm.com/primavera-p6-training-prices/)). Losse modules variëren van USD 25 tot USD 1.000 ([PMVISION](https://www.pmvision.ca/product-category/primavera/)). Er bestaat een expliciete EPC-variant: "EPC Planning with Primavera P6" ([TheSkillSage](https://theskillsage.com/epc-planning-course/)).
- **Oracle User Productivity Kit (UPK)** voor P6-eindgebruikers is als apart product geprijsd: USD 35.000 tot 70.000 per UPK-module, afhankelijk van bedrijfsgrootte (≤4.000 medewerkers en ≤USD 1 mrd omzet vs. daarboven), plus 22% support ([Oracle prijslijst](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf)). Dat is een aanwijzing dat Oracle zelf de opleidingslaag als een substantiële kostenpost prijst.
- **SAP:** support ~20% van de licentiekosten, training ~USD 500 per gebruiker ([CostBench](https://costbench.com/software/erp/sap-s4hana/calculator/)).
- **[SCHATTING] implementatieratio:** voor P6 EPPM-enterprise-uitrol met SAP-integratie, EPS/WBS-standaardisatie, activity-coding-bibliotheek, rules-of-credit en rapportagelaag reken ik op **1,5× tot 3× de eerstejaars licentiewaarde** aan implementatie- en integratiediensten, en **20–35% van de licentiewaarde per jaar** aan doorlopend beheer/support. *Redenering:* Oracle prijst Primavera Gateway (het integratieproduct) op USD 20.000 met minimum 5 users — een integratieproduct dat alleen zin heeft met bijbehorende consultancy; UPK-modules op USD 35.000–70.000; en de sector heeft een gestandaardiseerde 22%-supportvoet. De ratio zelf is niet met een publieke bron te onderbouwen.

### 3.6 Betalingsbereidheid: HOOG

Dit is een van de hoogste betalingsbereidheden in de hele planningssoftwaremarkt. De onderbouwing:

1. **De software zit aan de goede kant van een enorme hefboom.** Bij liquidated damages van USD 50.000–500.000 per dag ([Giga Energy](https://www.gigaenergy.com/blog/avoid-liquidated-damages)) betaalt een volledig project-controls-pakket voor 200 planners zichzelf terug als het één week vertraging voorkomt. Een licentie van USD 3.400 per planner per jaar is ruis tegen een LD-exposure van honderden miljoenen.
2. **Het is een contractuele verplichting, geen keuze.** Als de opdrachtgever P6 en XER-levering voorschrijft (Aramco SAEP-331 e.d.), is de aanschaf een voorwaarde om te mogen inschrijven. Prijselasticiteit is dan bijna nul.
3. **De kosten worden doorbelast.** Project controls is een reimbursable of geïndirecteerde projectkostenpost. De rule of thumb voor project-controlskosten is **circa 2% van de totale projectkosten** ([PMI, *Project controls: how much is enough?*](https://www.pmi.org/learning/library/project-controls-much-enough-4817)). Op een project van USD 1 miljard is dat USD 20 miljoen aan project controls — waarvan software een fractie is.
4. **Claimwaarde.** Bij gemiddelde geschilwaarden van USD 42 miljoen wereldwijd en USD 60,1 miljoen in Noord-Amerika ([Arcadis 2025](https://www.cmaanet.org/sites/default/files/resource/State%20of%20Construction_0.pdf)) is een verdedigbaar, forensisch analyseerbaar schema een verzekeringspolis met een zeer gunstige premie.
5. **Overheidsklanten laten de prijsbereidheid zien.** USACE betaalt USD 24,5 miljoen over vijf jaar voor alleen Primavera-licenties ([OrangeSlices](https://orangeslices.ai/contract-award-24-5m-us-army-corps-of-engineers-usace-promis-program-office-oracle-primavera-software-licenses/)).

**Waar de betalingsbereidheid instort:** bij de onderaannemer, de fabricator, de vendor en de junior planner. Die hebben een P6-seat nodig om mee te draaien maar niet het budget van een megaproject. Dat is de scheur in de markt (zie §7).

---

## 4. Hoe groot is dit segment?

### 4.1 Top-down ankers

| Anker | Cijfer | Jaar | Bron |
|---|---|---|---|
| Wereldwijde PPM-softwaremarkt | USD 8,7 miljard, +12,7% j-o-j | 2024 | [Apps Run The World](https://www.appsruntheworld.com/top-10-project-portfolio-management-software-vendors-and-market-forecast/) |
| PPM-markt prognose | USD 11,6 miljard bij CAGR 5,8% | 2029 | idem |
| Aandeel Oracle in PPM-markt | 8,5% (+11,5% j-o-j) | 2024 | idem |
| Aandeel top-10 leveranciers samen | 60,5% | 2024 | idem |
| "Infrastructure project controls software" markt | USD 7,9 miljard → USD 21,8 miljard, CAGR 11,2% | 2025 → 2034 | [Growth Market Reports](https://growthmarketreports.com/report/infrastructure-project-controls-software-market) — **[ZWAKKE BRON]**, definitie onduidelijk en waarschijnlijk inclusief diensten |
| Hexagon Asset Lifecycle Intelligence (bevat EcoSys) | EUR 228,8 miljoen in Q4 2024, 10% organische groei; 15% van Hexagons totale omzet in 2024 | 2024 | [Hexagon Q4 2024 via Yahoo Finance](https://finance.yahoo.com/news/hexagon-ab-hxgbf-q4-2024-070123907.html) |

De PPM-markt van USD 8,7 miljard is niet één-op-één bruikbaar: die telling wordt gedomineerd door IT-PPM en werkbeheer (ServiceNow, Atlassian, Smartsheet, monday.com, Asana). De relevante deelmarkt — zware CPM-planning met kostenintegratie voor kapitaalprojecten — is een minderheid daarin.

### 4.2 Bottom-up schatting **[SCHATTING]**

Ik bouw de raming in vier stappen, met alle aannames expliciet.

**Stap 1 — Aantal P6-seats wereldwijd.**
6sense telt **7.474 organisaties** die de Oracle Primavera Suite gebruiken ([6sense](https://6sense.com/tech/project-management/oracle-primavera-suite-market-share)). Bij een aangenomen gemiddelde van 25–40 named users per organisatie (kleine ingenieursbureaus met 3 seats tot EPC-reuzen met 2.000+) kom ik op **190.000–300.000 P6-seats wereldwijd, alle sectoren**. *Aanname met de meeste onzekerheid; 6sense telt domeinen, geen seats.*

**Stap 2 — Aandeel industriële EPC/procesindustrie.**
P6 is het sterkst in olie & gas, petrochemie, energie, mijnbouw en nucleair; zwakker in commerciële gebouwbouw (waar Procore/MS Project domineren) en IT. Ik neem **35–45%** van de P6-seats toe aan industriële EPC en procesindustrie → **70.000–135.000 seats**. **[VERIFICATIE — KLEINE REKENFOUT]** 35% van 190.000 = **66.500**, niet 70.000; de correcte band is **66.500–135.000**. Effect op de uitkomst ≈ 5% aan de onderkant, dus niet materieel — maar het is een afronding omhóóg, niet neutraal.

**[VERIFICATIE — FUNDAMENTELE BRONSPANNING, ONOPGELOST]** Stap 1 hangt volledig aan de 6sense-domeintelling van 7.474 organisaties (bevestigd: [6sense](https://6sense.com/tech/project-management/oracle-primavera-suite-market-share)). Maar §A2.1 van dit eigen rapport citeert Sumble, dat **66.785 organisaties** met Primavera P6 telt (bevestigd: [Sumble](https://sumble.com/tech/primavera-p6)) — een factor **8,9** verschil. Met dezelfde aanname van 25–40 named users per organisatie zou Sumble op **1,7–2,7 miljoen seats** uitkomen en zou de hele segmentraming een orde van grootte hoger liggen. Het rapport gebruikt de lage telling voor de omvang en de hoge telling voor de dominantieclaim, zonder de twee te verzoenen. Zolang dat niet gebeurt, is de seat-route **niet één van "drie convergerende routes" maar de zwakste schakel met een onopgeloste factor-9-onzekerheid**.

**Stap 3 — Gerealiseerde prijs per seat per jaar.**
Lijstprijs USD 1.320 (OPC Scheduling) tot USD 3.400 (P6 EPPM Cloud à £220/maand). Met gepubliceerde volumekortingen tot 25% ([G-Cloud 14](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf)) plus onderhandelde enterprisekorting, en met een aanzienlijk deel nog op geamortiseerde perpetual-licenties (USD 2.750 licentie + USD 605 support ≈ USD 1.155/jaar bij 5-jaars afschrijving) kom ik op een **gerealiseerd gemiddelde van USD 1.000–1.700 per seat per jaar**.

**Stap 4 — Optellen.**

| Component | Berekening | Uitkomst (USD/jaar) |
|---|---|---|
| P6/OPC-schemaseats in industriële EPC | 70.000–135.000 × USD 1.000–1.700 | **70–230 miljoen** |
| Overige Oracle CE-producten in dit segment (Unifier, Analytics, Gateway, Data Warehouse, Aconex, Risk Analysis) | factor 1,0–1,5× de schemaseats | 70–345 miljoen |
| Kosten-/controlssuites (Octave Sequence, InEight, Ares, Cleopatra, Prometheus, InEight Schedule) | ≈ 0,8–1,2× het Oracle-totaal in dit segment | 110–690 miljoen |
| Schemakwaliteit, risico en forensiek (Acumen, Safran, PRA, ScheduleReader, nPlan) | ≈ 10–15% van het bovenstaande | 25–190 miljoen |
| SAP PS-aandeel toewijsbaar aan projectplanning/-controls | zeer moeilijk te isoleren; conservatief | 50–200 miljoen |
| **Subtotaal licenties en abonnementen** | | **≈ USD 0,35–1,6 miljard** |
| Implementatie-, integratie-, trainings- en managed-services rond deze software | 1,5–2,5× licentiewaarde | 0,5–4,0 miljard |
| **Totaal segmentuitgaven** | | **≈ USD 1–5 miljard per jaar** |

**[VERIFICATIE — REKENFOUT IN DE OPTELLING]** De regelsgewijze aritmetiek klopt (70+70+110+25+50 = 325 mln onderkant; 230+345+690+190+200 = 1.655 mln bovenkant), maar de twee eindregels zijn daarna *naar buiten toe afgerond in beide richtingen tegelijk*. Correct: subtotaal **USD 0,325–1,655 mrd** (afgerond 0,33–1,66, niet "0,35–1,6"), dienstenlaag 1,5 × 0,325 = 0,49 tot 2,5 × 1,655 = **4,14 mrd**, en totaal **USD 0,81–5,79 mrd** — niet "≈ USD 1–5 miljard". De gepubliceerde band is aan de onderkant ~23% te hoog en aan de bovenkant ~14% te laag. Lees: **USD 0,8–5,8 miljard**.

**Centrale schatting: circa USD 2 tot 2,5 miljard per jaar (2025/2026) aan software plus directe diensten voor planning en project controls in industriële EPC en procesindustrie, waarvan circa USD 0,7 tot 1,0 miljard pure licentie-/abonnementsomzet.** De bandbreedte is breed en dat is eerlijk: geen enkele leverancier publiceert segmentomzet, Oracle rapporteert Construction & Engineering niet apart ([Oracle investor relations bevat geen segmentuitsplitsing hiervoor](https://investor.oracle.com/financials/default.aspx)), en InEight en Cleopatra zijn privaat.

**Kruiscontrole via de 2%-regel.** Bij een industriële/energie-deelmarkt van naar schatting 45–55% van de wereldwijde EPC-markt van ~USD 900 miljard ([Fact.MR](https://www.factmr.com/report/epc-engineering-procurement-and-construction-market)) gaat het om ~USD 400–500 miljard aan industrieel EPC-volume per jaar. Bij 2% project-controlskosten ([PMI](https://www.pmi.org/learning/library/project-controls-much-enough-4817)) is dat **USD 8–10 miljard per jaar aan project-controlsuitgaven totaal** — overwegend loonkosten van planners, cost engineers en QS'ers. Als software plus systeemdiensten daarvan 20–30% is, kom ik op **USD 1,6–3,0 miljard**, consistent met de bottom-up-raming. Dat de twee onafhankelijke routes op dezelfde orde uitkomen versterkt de schatting.

### 4.3 Segmentomvang naar deelmarkt **[SCHATTING]**

| Deelsegment | Aandeel van het segment | Toelichting |
|---|---|---|
| CPM-planningsengine (P6, OPC, InEight Schedule, Safran) | ~30% | Het "planningsproduct" in enge zin |
| Kosten- en EVM-integratie (Sequence/EcoSys, InEight Control, Unifier, SAP PS-deel) | ~40% | De duurste laag; hier zit de grootste licentiewaarde per seat |
| Risico, schemakwaliteit, forensiek | ~10% | Klein maar met hoge marge |
| Documentbeheer/collaboratie gekoppeld aan schema (Aconex, InEight Document) | ~20% | Grensgeval, deels buiten scope |

### 4.4 Groeirichting

**Tegenwind:**
- Upstream olie- en gasinvesteringen daalden in 2025 met ~4% naar net onder USD 570 miljard, olieproductie-investering met 6% ([IEA](https://www.iea.org/reports/world-energy-investment-2025/executive-summary), [Energy Voice](https://www.energyvoice.com/oilandgas/573822/iea-predicts-6-drop-in-upstream-oil-investment-in-2025/)).
- De petroleumomzet van de ENR-contractors daalde met 13,6% in 2024; industriële-procesomzet met 10,6% ([ENR, samengevat via zoekresultaat](https://www.enr.com)).

**Rugwind:**
- Tweederde van de USD 3,3 biljoen aan energie-investeringen in 2025 gaat naar schone technologie ([IEA via S&P Global](https://www.spglobal.com/energy/en/news-research/latest-news/energy-transition/060525-energy-investment-to-hit-record-33-trillion-in-2025-as-oil-capex-falls-iea)). Die projecten — waterstof, CCS, ammoniak, batterij-gigafabrieken, e-fuels, kernenergie/SMR — zijn *procesindustrie* qua planningskarakteristiek en erven dezelfde P6-EVMS-praktijk.
- Halfgeleiderfabs, datacenters en de daaraan gekoppelde utility-infrastructuur zijn nieuwe industriële megaprojecten met dezelfde planningsdiscipline.
- De PPM-markt groeide met 12,7% in 2024 ([Apps Run The World](https://www.appsruntheworld.com/top-10-project-portfolio-management-software-vendors-and-market-forecast/)), met Oracle op +11,5% en SAP op +9,1%.

**Netto verwachting [SCHATTING]:** het segment groeit **4 tot 7% per jaar in nominale termen** — trager dan de brede PPM-markt (die door SaaS-werkbeheer wordt opgestuwd), maar structureel positief. De samenstelling verschuift van olie & gas naar energietransitie-procesinstallaties, terwijl de planningspraktijk (P6, EVMS, XER) meeverhuist. De grootste verschuiving zit niet in volume maar in *leveringsmodel*: van perpetual on-premise naar SaaS (Oracle Primavera Cloud), wat de omzet per seat verhoogt maar de klantloyaliteit verlaagt.

---

## 5. Sector-specifieke eisen en standaarden

### 5.1 Earned Value Management System (EVMS) — ANSI/EIA-748

De 32 richtlijnen van EIA-748 zijn de ruggengraat van projectbeheersing in overheids- en zwaar-industriële kapitaalprojecten. FAR Subpart 34.2 verwijst er expliciet naar: als een offerant een systeem voorstelt dat niet EIA-748-conform is bevonden, moet hij "a comprehensive plan for compliance with these EVMS standards" indienen; offerten mogen niet uitgesloten worden louter omdat het systeem nog niet gevalideerd is ([FAR Subpart 34.2](https://www.acquisition.gov/far/subpart-34.2)).

Drempelwaarden:

| Regime | Drempel | Wat het triggert | Bron |
|---|---|---|---|
| DFARS | **USD 20 miljoen** | EVMS conform EIA-748 vereist (niet-gevalideerd) | [Pinnacle Management](https://www.pinnaclemanagement.com/blog/revised-evms-threshold-requirements) |
| DFARS 234.201(1)(ii), 252.234-7001, 252.234-7002 | **USD 100 miljoen** (verhoogd van USD 50 miljoen) | Gevalideerd EVMS + EVMS compliance review door DCMA | [DoD DPAP memo](https://www.acq.osd.mil/dpap/policy/policyvault/USA004395-15-DPAP.pdf), [DFARS 234.2](https://www.acq.osd.mil/dpap/dars/dfars/html/current/234_2.htm) |
| DOE O 413.3B | **USD 50 miljoen** Total Project Cost | EVMS verplicht voor alle DOE capital asset projects | [LBNL Project Management Framework](https://sites.google.com/lbl.gov/lbnlprojectmanagementframework/home/applicability) |
| FAR / OMB Circular A-11 | "major acquisitions for development" | EVMS vereist | [FAR Subpart 34.2](https://www.acquisition.gov/far/subpart-34.2) |

Relevante referentiedocumenten: [NDIA IPMD EIA-748 Intent Guide](https://www.ndia.org/-/media/sites/ndia/divisions/ipmd/division-guides-and-resources/ndia_ipmd_intent_guide_ver_d_aug282018.ashx), [DoD EVMS Interpretation Guide (14 maart 2019)](https://www.acq.osd.mil/asda/ae/ada/ipm/docs/DoD_EVMSIG_14MAR2019.pdf), [DOE EVMS Implementation Guidance](https://www.energy.gov/projectmanagement/evms-implementation-guidance), [DCMA EVMS](https://www.dcma.mil/HQ/EVMS/).

**Wat dit voor software betekent:** het schema is niet los te koppelen van de kostenstructuur. Elke control account moet een schema-element, een budget (BCWS), een verdienmethode en een verantwoordelijke hebben. Een planningstool dat geen resource-loaded, cost-loaded, tijdgefaseerde baseline kan produceren en bevriezen, is in dit segment onbruikbaar. Ook al is EIA-748 formeel een Amerikaans overheidsregime, private opdrachtgevers in olie & gas hebben de praktijk grotendeels overgenomen.

### 5.2 DCMA 14-Point Schedule Assessment

Ingevoerd in 2005 voor grote DoD-programma's; formeel adviserend, in de praktijk de universele schemakwaliteitstest ([Deltek](https://www.deltek.com/en/resources/articles/dcma-14-point-assessment)).

| # | Check | Drempel |
|---|---|---|
| 1 | Logic (ontbrekende voorgangers/opvolgers) | ≤ 5% van onvoltooide taken |
| 2 | Leads (negatieve lag) | 0% |
| 3 | Lags | ≤ 5% van onvoltooide taken |
| 4 | Relationship Types | ≥ 90% Finish-to-Start |
| 5 | Hard Constraints | ≤ 5% |
| 6 | High Float | ≤ 5% van taken met total float > 44 werkdagen |
| 7 | Negative Float | 0% |
| 8 | High Duration | ≤ 5% van taken met duur > 44 werkdagen |
| 9 | Invalid Dates (forecast in het verleden, actual in de toekomst) | 0% |
| 10 | Resources | alle activiteiten voorzien van ten minste één resource (indien resources gebruikt worden) |
| 11 | Missed Tasks | ≤ 5% |
| 12 | Critical Path Test | een kunstmatige verlenging van 600 dagen op een kritieke activiteit moet de einddatum evenredig verschuiven |
| 13 | Critical Path Length Index (CPLI) | doel 1,00 |
| 14 | Baseline Execution Index (BEI) | doel 1,00 |

Bronnen: [Deltek](https://www.deltek.com/en/resources/articles/dcma-14-point-assessment), [ScheduleReader](https://schedulereader.com/dcma-14-point-assessment-project-schedule-quality-analysis/).

Deltek Acumen Fuse controleert schema's tegen "more than 600 industry-aligned metrics" van DCMA, DOE, NASA, GAO en AACE ([Deltek](https://www.deltek.com/en/products/project-and-portfolio-management/acumen/fuse)) — een indicatie dat DCMA-14 slechts de bekendste van vele checklists is.

### 5.3 AACE International — Recommended Practices

AACE International heeft meer dan 8.000 leden wereldwijd (opgave op de eigen LinkedIn-bedrijfspagina, [via RocketReach](https://rocketreach.co/aace-international-profile_b5c6cb16f42e0cca)); een andere ZoomInfo-vermelding noemt "more than 5,500 members" — de bronnen spreken elkaar tegen, dus lees dit als **5.500–8.000**.

De meest gezaghebbende RP voor deze sector is **29R-03: Forensic Schedule Analysis** ([AACE inhoudsopgave](https://web.aacei.org/docs/default-source/toc/toc_29r-03.pdf); [volledige tekst via Planning Planet](https://www.planningplanet.com/sites/default/files/aace_rp_29r03_november_distribution.pdf); [overzicht van alle RPs](https://web.aacei.org/resources/recommended-practices)). De taxonomie van Method Implementation Protocols ([Long International](https://www.long-intl.com/articles/schedule-analysis-method-2/)):

**Observationeel** (analist wijzigt het schema niet):
- MIP 3.1 — As-Planned vs. As-Built, Gross
- MIP 3.2 — As-Planned vs. As-Built, Periodic
- MIP 3.3 — Contemporaneous As-Is (volgt het evoluerende kritieke pad in de projectupdates)
- MIP 3.4 — Contemporaneous Split
- MIP 3.5 — Modified/Recreated updates (wanneer contemporaine updates ontbreken)

**Gemodelleerd** (analist voegt vertragingsactiviteiten toe of verwijdert ze):
- MIP 3.6 — Additive, Single Base (Time Impact Analysis op de baseline)
- MIP 3.7 — Additive, Multiple Base
- MIP 3.8 — Subtractive, Single Base (Collapsed As-Built)
- MIP 3.9 — Subtractive, Multiple Base

**De harde consequentie voor software:** MIP 3.3 t/m 3.9 vereisen dat *elke maandelijkse schema-update in native, herrekenbare vorm bewaard is*. Een PDF-print of een Excel-export is waardeloos. Dit is de belangrijkste reden waarom native XER-archivering contractueel wordt afgedwongen: zonder de originele bestanden is een MIP 3.3-analyse — de methode die arbiters het meest waarderen omdat ze het contemporaine kritieke pad reconstrueert — onmogelijk. Long International merkt op dat de beschikbaarheid en betrouwbaarheid van brondata bepalend is voor de methodekeuze ([Long International](https://www.long-intl.com/articles/schedule-analysis-method-2/)).

### 5.4 Verplichte leveringsformaten

- **XER** is het "Oracle Primavera Proprietary Exchange Format" — Oracle's eigen documentatie noemt het letterlijk proprietary ([Oracle Primavera Cloud Help](https://primavera.oraclecloud.com/help/en/user/95912.htm), [Primavera US2 Cloud Help](https://primavera-us2.oraclecloud.com/help/en/user/234146.htm)). Onafhankelijke formaatdocumentatie bevestigt: "The XER file format is a proprietary project file format used by the Primavera P6" ([FileFormat Docs](https://docs.fileformat.com/project-management/xer/)). Er bestaat **geen officiële, publieke specificatie**; alle parsers zijn reverse-engineered.
- **P6 XML** is het alternatieve, beter gestructureerde uitwisselingsformaat, en wordt in toenemende mate naast XER geëist.
- Schemakwaliteitstools werken op precies deze twee: ScheduleReader PRO "works with XER and XML exports" ([ScheduleReader](https://schedulereader.com/dcma-14-point-assessment-project-schedule-quality-analysis/)).
- Voor het corrigeren van bevindingen geldt: "ensuring these parameters are corrected in the native environment guarantees a clean export for subsequent analysis and reporting" ([idem](https://schedulereader.com/dcma-14-point-assessment-project-schedule-quality-analysis/)) — oftewel: de keten is native-first, exports zijn afgeleiden.

### 5.5 Opdrachtgeversstandaarden

- **Saudi Aramco SAEP-331** — zeven schemaniveaus, van Business Plan Project Schedules tot Level IV Project Control Schedules, met Primavera P6 als platform ([Kazinex-analyse](https://docs.kazinex.com/blog/aramco-saep-schedule-quality-check); [documentkopie](https://www.scribd.com/document/810740797/SAEP-331-SA-Scheduling-Requirements)).
- **DOE O 413.3B** — critical decision-gates CD-0 t/m CD-4 met EVMS-verplichting boven USD 50 miljoen ([LBNL](https://sites.google.com/lbl.gov/lbnlprojectmanagementframework/home/applicability)).
- **QSRA bij FID** — Monte-Carlo-simulatie die P50/P80/P95-vertrouwensdata produceert; standaard gereedschap Safran, P6 PRA en Acumen ([SOMA Project Controls](https://www.somaprojectcontrols.com/resources/glossary/qsra-quantitative-schedule-risk-analysis/); [Safran](https://docs.safran.com/docs/safran-project-schedule-risk-analysis)).

### 5.6 Datastandaarden voor overdracht — en waarom IFC hier níét de standaard is

Dit is voor Open Planner Studio het belangrijkste bevindingspunt van dit hele rapport.

In de procesindustrie is de dominante informatiestandaard voor asset-data **niet** IFC, maar **CFIHOS** (Capital Facilities Information Handover Specification) bovenop **ISO 15926**:

- ISO 15926 legt de technische basis voor data-interoperabiliteit en integratie; CFIHOS fungeert als praktische toepassingsgids ([Revisionz](https://revisionz.com/)).
- De CFIHOS-klassenbibliotheek breidt de ISO 15926 Part 4 Reference Data Library uit met klassen specifiek voor capital facilities, gericht op **EPC-naar-operations-overdracht** ([Pathnovo](https://pathnovo.com/)).
- "CFIHOS 2.0 sits on top of ISO 15926 and tightens the specification for the specific use case of EPC-to-operations handover" ([Pathnovo](https://pathnovo.com/)).
- ISO 15926-100:2026 is de actuele deelnorm ([ISO](https://www.iso.org/)).

IFC 4.3, gepubliceerd als **ISO 16739-1:2024**, breidde de dekking uit naar civiele infrastructuur: "bridges, roads, railways, waterways and port facilities" ([ISO 16739-1:2024](https://www.iso.org/standard/84123.html)). **Procesinstallaties staan daar niet bij.** Er is geen IFC-domein voor procesapparatuur, piping-klassen op P&ID-niveau, instrumentatieloops of tag-gebaseerde asset-registers zoals de procesindustrie die kent. Toolondersteuning loopt bovendien doorgaans 1 tot 3 jaar achter op publicatie van de norm ([Data Driven AEC](https://datadrivenaec.com/insights/iso-16739-ifc4-3-what-architects-need-to-know)).

**Consequentie:** een IFC-gebaseerde planner heeft in dit segment een structurele mismatch met het geometrie- en asset-datamodel. De opening ligt niet in IFC-als-modeldrager, maar elders (zie §7).

---

## 6. Voor- en nadelen van de gebruikte pakketten in deze sectorcontext

### Oracle Primavera P6 (EPPM / Professional)

**Wat hier goed werkt**
- **Contractuele acceptatie.** P6 is het formaat waarin opdrachtgevers schema's willen ontvangen. Dat alleen al maakt alle alternatieven tot vertaalproblemen.
- **Schaalbaarheid van het datamodel.** Multi-project EPS-hiërarchieën, honderdduizenden activiteiten, tientallen kalenders, activity codes op 25+ dimensies, UDF's, WBS tot tien niveaus diep. Geen ander CPM-product doet dit in productiekwaliteit.
- **Resource- en rolplanning met kostenkoppeling** die een EIA-748-conforme, tijdgefaseerde baseline kan produceren.
- **Baseline-management.** Meerdere baselines naast elkaar (approved, current, sanction) met vergelijkingsrapportage — noodzakelijk voor claimverdediging.
- **Ecosysteem.** Elke consultant, elke trainer, elke forensische expert en elke integrator kent het. De arbeidsmarkt voor P6-planners is diep.
- **Retentiebestendigheid.** XER-bestanden uit 2008 zijn nog steeds leesbaar in de huidige versie — over een projectlevensduur van tien jaar telt dat.

**Wat wringt**
- **Kosten per seat blokkeren de onderkant van de keten.** Bij £220 per gebruiker per maand ([G-Cloud 14](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf)) krijgen onderaannemers, werkvoorbereiders en site-supervisors geen licentie. Zij werken in Excel; de planner typt hun voortgang handmatig over. Dat is exact het punt dat PlanXER als bestaansreden noemt: "expensive P6 licences, manual schedule checks, and clunky Excel workarounds that ate entire afternoons" ([PlanXER](https://planxer.pro/)).
- **Geen ingebouwde schemakwaliteitscontrole.** DCMA-14, CPLI en BEI zitten niet in P6; daarvoor moet een tweede product (Acumen, ScheduleReader) worden gekocht.
- **Geen ingebouwde risicoanalyse.** Primavera Risk Analysis is een apart product van USD 9.500 per gebruiker plus USD 2.090 support ([Oracle prijslijst](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf)).
- **UX en leercurve.** Gebruikers beschrijven het werk als "so tedious" met uren troubleshooting bij data-invoer ([Reddit r/ConstructionManagers](https://www.reddit.com/r/ConstructionManagers/comments/1dk5ztq/ive_spent_like_6_hours_today_going_through_the/)). Er bestaat een hele hulpindustrie voor "hacks and workarounds" ([Planners' Place](https://www.plannersplace.com/)). Een volledige opleiding kost USD 500–1.500 per persoon en 3–5 dagen ([Team Academy](https://www.teamacademy.net/primavera-p6-project-professional-training-and-certification), [Global PM](https://globalpm.com/primavera-p6-training-prices/)).
- **Multi-contractor-integratie is handwerk.** P6 biedt geen native mechanisme om deelschema's van tien contractors met verschillende kalenders, coderingen en updatecycli te federeren. In de praktijk gebeurt dit met import/export-scripts en handmatige mapping.
- **Kostenintegratie is dun.** P6 kan kosten dragen, maar echte cost control (commitments, actuals uit ERP, forecast-at-completion, change management) vereist Unifier, EcoSys/Sequence, InEight of SAP — vandaar het bestaan van die hele productcategorie.
- **Vendor lock-in via een gesloten formaat.** XER is proprietary en ongedocumenteerd ([Oracle](https://primavera.oraclecloud.com/help/en/user/95912.htm), [FileFormat Docs](https://docs.fileformat.com/project-management/xer/)). Wie zijn schemahistorie in XER heeft, heeft die in Oracle's hand.
- **Uitgesproken ontevredenheid onder senior gebruikers.** Een Planning and Analytics Executive bij een contractor van USD 600 miljoen: "I've been using Primavera P6 for years. And I'm done with it." ([Bricks & Bytes](https://bricks-bytes.com/newsletter/the-death-of-p6-why-a-600m-contractor-is-ditching-traditional-scheduling-software/)).

### EcoSys / Octave Sequence Enterprise

**Goed:** de sterkste kostenintegratielaag boven P6 — EVM op ondernemingsniveau, budgettering en forecasting, capital budgeting, koppeling van portfoliofinanciering aan tactische projectprestaties ([Octave](https://www.octave.com/products/project-performance/sequence/sequence-enterprise)). Zeer configureerbaar; "connects seamlessly with virtually any business-critical system, including finance, accounting, procurement, scheduling, design, construction management and contractor time tracking" ([idem](https://www.octave.com/products/project-performance/sequence/sequence-enterprise)). Referenties in de procesindustrie: Technip Energies, Nippon Steel Engineering, Burns & McDonnell.

**Wringt:** de configureerbaarheid is ook het probleem — implementaties zijn lange, dure consultancytrajecten. De prijs vanaf ~USD 200 per gebruiker per maand ([ITQlick](https://www.itqlick.com/ecosys-epc/pricing)) beperkt het tot project-controls-specialisten. En de **eigendomsverandering is een reëel risico**: EcoSys is in twee jaar tijd van Hexagon naar Octave verhuisd, hernoemd tot Sequence Enterprise, en krijgt in de zomer van 2026 versie 10 met een nieuwe cloudarchitectuur ([Hexagon juni 2025](https://hexagon.com/company/newsroom/press-releases/2025/octave-unveiled), [Hexagon februari 2026](https://hexagon.com/company/newsroom/press-releases/2026/hexagon-announces-update-on-planned-spin-off-of-octave/), [Octave](https://www.octave.com/learn/resources/blogs/ecosys-becomes-octave-sequence-enterprise)). Voor een klant met een tienjarig megaproject is zo'n reorganisatie een leveranciersrisico dat expliciet gewogen wordt.

### InEight

**Goed:** de enige serieuze poging om estimating, scheduling, cost control, field progress en documentbeheer in één platform te leggen, met een expliciete industriële focus (Oil, Gas & Chemical, Power & Renewables, Nuclear, Mining) ([InEight](https://ineight.com/products/construction-scheduling-software-for-capital-projects-ineight-schedule/)). Ontstaan uit Kiewit, dus gebouwd door mensen die zelf bouwen. Biedt "full CPM capabilities with integrated look-ahead planning and risk management" — de koppeling tussen het CPM-masterschema en de wekelijkse look-ahead is precies waar P6 zwak is. Referenties: AECOM, CCC Group.

**Wringt:** het platform is niet het contractuele formaat. Een InEight-schema moet nog steeds als XER aan de opdrachtgever geleverd worden, wat de "single platform"-belofte gedeeltelijk ondermijnt. InEight publiceert geen prijzen ([InEight](https://ineight.com/pricing-overview/)), wat inkoop bemoeilijkt. En het is een all-or-nothing-propositie: de waarde zit in de suite, niet in losse modules.

### SAP PS / S/4HANA

**Goed:** de enige echte bron van waarheid voor commitments, actuals, inkooporders en revenue recognition. Voor een EPC-contractor is dat de basis van de winst-en-verliesrekening per project. 6,48% marktaandeel in de PM-categorie ([6sense](https://6sense.com/tech/project-management/oracle-primavera-suite-market-share)).

**Wringt:** SAP PS is geen planningstool. Netwerken in PS zijn een boekhoudkundige structuur, geen CPM-engine; resource-levelling, kalenders en kritieke-padanalyse zijn er onvolwassen. Het gevolg is een permanente dubbele administratie: WBS in SAP, WBS in P6, en een integratiemiddel ertussen. Die integratie is berucht — de oude SAP EPC-connector is obsoleet ([SAP Community](https://community.sap.com/t5/enterprise-resource-planning-q-a/sap-ps-and-primavera-integration/qaq-p/14298251)) en er is een hele nichemarkt van integratieproducten (Oracle Primavera Gateway à USD 20.000 + 22% support, Commondo ePPM, Emerald P6-Loader). De licentiekosten zijn bovendien hoog: SAP Professional Use ~USD 4.500 lijst ([Reveal Compliance](https://revealcompliance.com/blog/sap-license-cost-2026)).

### Deltek Acumen Fuse / Safran / Primavera Risk Analysis

**Goed:** onmisbaar voor DCMA-14, QSRA en pre-FID-zekerheid. Acumen dekt 600+ metrieken uit DCMA-, DOE-, NASA-, GAO- en AACE-richtlijnen ([Deltek](https://www.deltek.com/en/products/project-and-portfolio-management/acumen/fuse)). Safran heeft een sterke positie in Noordzee-olie & gas.

**Wringt:** het zijn *aanvullende* aankopen die een gat in P6 dichten dat er niet zou moeten zijn. Per seat is Acumen ~USD 75 per maand ([ITQlick](https://www.itqlick.com/acumen/pricing)) en PRA USD 9.500 perpetual ([Oracle prijslijst](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf)). Ze werken bovendien op geëxporteerde XER/XML, dus de analyse is altijd een momentopname, nooit live.

### Microsoft Project

**Goed:** overal aanwezig, goedkoop, iedereen kent het. De facto het instrument van onderaannemers en vendors.

**Wringt:** ongeschikt voor het masterschema in dit segment — geen multi-user enterprise-model op P6-schaal, geen activity-code-dimensies, geen meervoudige baselines op P6-niveau, en cruciaal: **de opdrachtgever accepteert het niet**. Praktijkbeschrijvingen laten zien dat gasinfrastructuur- en pijpleidingprojecten die met MS Project begonnen naar P6 overstappen ([LinkedIn-praktijkbeschrijving](https://www.linkedin.com/posts/suhail-shams_projectcontrols-primaverap6-projectplanning-activity-7454149624862318592-TKv0)).

### Open-source alternatieven (ProjectLibre, OpenProject, Redmine)

**Goed:** gratis.

**Wringt:** niet in de buurt van de eisen. ProjectLibre wordt beschreven als geschikt "if you want a free, open-source planner for smaller projects and can live with a dated interface" ([SelectHub](https://www.selecthub.com/ppm-software/primavera-p6-vs-projectlibre/)). Geen EVMS-conforme baselines, geen XER-interoperabiliteit, geen DCMA-analyse, geen resource-loading op sectorschaal, geen forensisch bruikbare update-archivering. In dit segment zijn ze effectief afwezig.

---

## 7. Openingen: waar zijn gebruikers ontevreden en welke gaten bestaan er

### 7.1 De harde bevindingen

**A. De seat-schaarste is de grootste operationele pijn.**
Het bewijs is direct en herhaald: PlanXER positioneert zichzelf letterlijk als geboren uit jaren frustratie op bouw-megaprojecten met "expensive P6 licences, manual schedule checks, and clunky Excel workarounds that ate entire afternoons" ([PlanXER](https://planxer.pro/)), en verkoopt XER-analyse **zonder P6-licentie** voor USD 39–249 per maand. ScheduleReader bestaat om dezelfde reden: XER/XML lezen zonder P6 ([ScheduleReader](https://schedulereader.com/dcma-14-point-assessment-project-schedule-quality-analysis/)). Twee onafhankelijke producten die louter bestaan omdat een P6-seat te duur is voor de mensen die het schema moeten *lezen* — dat is een gevalideerde marktvraag.

**B. Multi-contractor schema-integratie is onopgelost.**
EY benoemt het expliciet als een van de kernoorzaken van megaproject-falen: het werken met meerdere contractors met gescheiden maar verweven scopes verergert het planningsprobleem, "as real-time data is challenging to recover", waardoor prestaties en de impact van wijzigingen moeilijk te modelleren zijn ([EY](https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf)). EY voegt eraan toe dat best-practice-voorbeelden met verweven WBS'en en real-time data wel bestaan, maar "too often set up as a response to poor project performance, instead of as a pre-emptive measure". Geen enkel pakket lost dit native op.

**C. Het uitwisselingsformaat is gesloten.**
XER is proprietary volgens Oracle's eigen documentatie ([Oracle](https://primavera.oraclecloud.com/help/en/user/95912.htm)) en heeft geen publieke specificatie. Elke parser in de markt is reverse-engineered. Er bestaat geen open, herrekenbaar, leveranciersneutraal uitwisselingsformaat voor CPM-schema's zoals IFC dat voor geometrie is. Dat is een structureel gat — en tegelijk het gat dat het moeilijkst te dichten is, omdat de netwerkeffecten bij Oracle liggen.

**D. Schemakwaliteit is een losgekoppelde nabewerking.**
DCMA-14 zit niet in de planningstool. De planner exporteert naar XER, laadt in Acumen of ScheduleReader, krijgt bevindingen, en moet die "in the native environment" corrigeren ([ScheduleReader](https://schedulereader.com/dcma-14-point-assessment-project-schedule-quality-analysis/)). Die heen-en-weer-lus kost elke maand tijd op elk project, op elk contract.

**E. Senior gebruikers stappen uit.**
"I've been using Primavera P6 for years. And I'm done with it," aldus een Planning and Analytics Executive bij een contractor van USD 600 miljoen ([Bricks & Bytes](https://bricks-bytes.com/newsletter/the-death-of-p6-why-a-600m-contractor-is-ditching-traditional-scheduling-software/)). Er is een levendige markt voor alternatievenvergelijkingen ([SelectHub](https://www.selecthub.com/ppm-software/primavera-p6/alternatives/), [Planera](https://www.planera.io/post/primavera-p6-alternatives)) — een indicator van zoekgedrag, niet van massale overstap, maar wel van ontevredenheid.

**F. AI-gedreven nieuwkomers vinden een gat, maar naast P6, niet in plaats van.**
nPlan traint op meer dan 750.000 ~~projecten~~ *schema's* met meer dan USD ~~2,5~~ **2** biljoen aan bouwuitgaven ([nPlan](https://www.nplan.io) — gecorrigeerd bij verificatie; het bedrag van USD 16 mln opgehaald kapitaal is onbevestigd). Het bedrijfsmodel is: neem het bestaande P6-schema, voorspel er vertraging op. Dat bevestigt dat het XER-schema het onvermijdelijke integratiepunt is — en dat er waarde bovenop te bouwen valt.

### 7.2 Waar een open-source planner kán landen — en waar niet

**Realistisch NIET haalbaar in dit segment:**

1. **Vervanging van P6 als contractueel masterschema.** De opdrachtgever schrijft P6 voor (SAEP-331 en vergelijkbare standaarden). Zolang dat zo is, is de vervangingsmarkt nul. Elke strategie die hierop mikt, faalt.
2. **IFC als toegevoegde waarde in de procesindustrie.** IFC 4.3 / ISO 16739-1:2024 dekt gebouwen, bruggen, wegen, spoor, waterwegen en havens ([ISO](https://www.iso.org/standard/84123.html)) — geen procesinstallaties. De procesindustrie werkt met CFIHOS op ISO 15926 voor asset-data-overdracht ([Pathnovo](https://pathnovo.com/), [Revisionz](https://revisionz.com/)). Een IFC-gebaseerd 4D-verhaal landt in dit segment níét op de kernprocesinstallatie. **Dit is de belangrijkste negatieve bevinding voor Open Planner Studio in deze sector.**
3. **EVMS-conform kostenbeheer.** EIA-748-conformiteit met DCMA-validatie is een systeemcertificeringstraject, geen feature. Daar concurreren tegen EcoSys/InEight/SAP is niet realistisch voor een klein open-source product.

**Realistisch WÉL haalbaar:**

1. **De gratis lees-, controle- en analyseseat.** Dit is de sterkste opening, en er is marktbewijs: PlanXER (USD 39–249/maand) en ScheduleReader bestaan alleen hierom. Een gratis, open-source XER/P6 XML-lezer met correcte CPM-herberekening, kalenderafhandeling en DCMA-14-checks zou onmiddellijk een publiek hebben van site-engineers, werkvoorbereiders, onderaannemers, QS'ers en juniorplanners die nu Excel-uitdraaien krijgen. De schaal: als 35–45% van de ~200.000–300.000 P6-seats in dit segment zit **[SCHATTING, zie §4.2]**, dan is het aantal mensen dat wél schema's moet *lezen* maar geen seat heeft een veelvoud daarvan.
2. **Het onderaannemer-/vendor-uiteinde van de keten.** De hoofdaannemer stuurt een activiteitenlijst; de onderaannemer stuurt voortgang terug. Vandaag gaat dat in Excel. Een gratis tool die (a) een XER-fragment inleest, (b) de onderaannemer laat updaten met correcte CPM-semantiek, en (c) een schoon XER/XML-fragment teruglevert, verwijdert de handmatige overtypslag die EY als kernprobleem identificeert.
3. **Schemakwaliteit als open standaardimplementatie.** DCMA-14 heeft publieke, numerieke drempels (§5.2). Een open-source referentie-implementatie daarvan — met een reproduceerbare, auditeerbare berekening in plaats van een black-box-commercieel product — heeft aantoonbare waarde voor claimcontexten waarin de tegenpartij de methode moet kunnen narekenen. Acumen's 600+ metrieken zijn niet transparant; een open implementatie wel.
4. **Forensische update-archivering.** AACE 29R-03 MIP 3.3 t/m 3.9 vereist herrekenbare, contemporaine updates ([Long International](https://www.long-intl.com/articles/schedule-analysis-method-2/)). Een open, leveranciersonafhankelijk archiefformaat voor schemastatussen — dat XER-imports kan vasthouden en decennialang leesbaar blijft — beantwoordt een reëel retentierisico. Bij tienjarige projecten en geschillen van gemiddeld USD 42 miljoen ([Arcadis](https://www.cmaanet.org/sites/default/files/resource/State%20of%20Construction_0.pdf)) is dat verdedigbaar.
5. **Turnaround-planning.** STO is een deelmarkt met kortere cycli (20–60 dagen), lagere contractuele formaliteit en hoge herhaalfrequentie. De contractuele P6-dwang is er zwakker dan bij greenfield-EPC. Prometheus en Cleopatra bedienen deze markt ([Prometheus](https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage), [Cleopatra](https://cleopatraenterprise.com/)), maar de onderkant (kleinere raffinaderijen, chemische sites, contractors) werkt nog veel in Excel en P6-templates.
6. **Kalender- en shiftmodellen die niemand goed doet.** Rotatieroosters (28/28, 14/14), meerploegendienst, weersvensters en craft-specifieke kalenders zijn in P6 omslachtig te modelleren. Een planner die dit native en goed doet, heeft een concreet, demonstreerbaar voordeel in deze sector.

### 7.3 Rangschikking van de openingen naar aantrekkelijkheid **[SCHATTING]**

| Opening | Marktbewijs | Technische haalbaarheid | Aanbeveling |
|---|---|---|---|
| Gratis XER/XML-lezer met correcte CPM-herberekening | **Sterk** (PlanXER, ScheduleReader bestaan hierom) | Hoog — reverse-engineered XER-parsers zijn publiek beschikbaar | **Prioriteit 1** |
| DCMA-14 als open, auditeerbare implementatie | Sterk (publieke drempels, commerciële black boxes) | Hoog | **Prioriteit 1** |
| Onderaannemer-updateloop (XER-fragment in/uit) | Sterk (EY-kernbevinding) | Middel — vereist betrouwbare round-trip | **Prioriteit 2** |
| Forensisch update-archief / retentie | Middel (AACE 29R-03 vereist het, niemand levert het open) | Middel | **Prioriteit 2** |
| Turnaround/STO-planning | Middel | Middel — vereist uurniveau-granulariteit | Prioriteit 3 |
| Geavanceerde kalender-/shiftmodellen | Zwak (pijn is reëel, maar niet gearticuleerd als aankoopreden) | Hoog | Prioriteit 3 |
| IFC-gebaseerd 4D voor procesinstallaties | **Zeer zwak** (IFC dekt procesplant niet; CFIHOS/ISO 15926 domineert) | Laag | **Niet doen in dit segment** |
| Vervanging van P6 als masterschema | **Geen** (contractueel geblokkeerd) | n.v.t. | **Niet doen** |

### 7.4 De strategische conclusie voor dit segment

De industriële EPC- en procesindustriemarkt is **niet aanvalbaar op het masterschema** — dat is contractueel dichtgetimmerd rond Primavera P6 en zal dat blijven zolang opdrachtgevers als Aramco het in hun engineering-procedures voorschrijven. De markt is wél aanvalbaar op de **randen van de keten die Oracle bewust niet bedient omdat er geen licentie-omzet zit**: de duizenden mensen per megaproject die een schema moeten lezen, controleren of van voortgang voorzien, maar geen seat van USD 2.640 per jaar waard zijn.

Dat is geen bescheiden nis. Bij een geschatte 70.000–135.000 betaalde P6-seats in dit segment **[SCHATTING, §4.2]** en een sector waarin 64% van de projecten over budget gaat en 73% te laat is ([EY](https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf)) juist omdat data uit de keten niet real-time terugkomt, is de ongeadresseerde leesmarkt vermoedelijk een orde van grootte groter dan de betaalde schrijfmarkt.

De IFC-hoek werkt hier echter niet. Dat moet Open Planner Studio expliciet accepteren voor deze sector: de waarde ligt in **schema-interoperabiliteit en -kwaliteit**, niet in geometriemodellen.

---

## Bronnenlijst

### Primaire leveranciers- en prijsbronnen
1. Oracle — Primavera P6 EPPM productpagina: https://www.oracle.com/industries/construction-engineering/primavera-p6/
2. Oracle — **Construction & Engineering Global Price List** (10-NOV-2016), PDF: https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf
3. Oracle — **Primavera Pricing, G-Cloud 14 Framework**, mei 2024, ref. BD.G14.OCS.002, PDF: https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf
4. Oracle — Integrating Oracle Primavera P6 and SAP: https://www.oracle.com/construction-engineering/integrating-oracle-primavera-p6-and-sap/ en https://www.oracle.com/a/ocom/docs/integrating-oracle-primavera-p6-and-sap.pdf
5. Oracle Primavera Cloud Help — XER als "Oracle Primavera Proprietary Exchange Format": https://primavera.oraclecloud.com/help/en/user/95912.htm en https://primavera-us2.oraclecloud.com/help/en/user/234146.htm
6. FindPM — Primavera Cloud prijzen per gebruiker per jaar (bijgewerkt 25-06-2026): https://findpmsoftware.com/products/primavera-cloud
7. InEight — pricing overview: https://ineight.com/pricing-overview/
8. InEight — Schedule productpagina: https://ineight.com/products/construction-scheduling-software-for-capital-projects-ineight-schedule/
9. Octave — Sequence Enterprise (voorheen EcoSys): https://www.octave.com/products/project-performance/sequence/sequence-enterprise
10. Octave — "EcoSys becomes Octave Sequence Enterprise": https://www.octave.com/learn/resources/blogs/ecosys-becomes-octave-sequence-enterprise
11. Hexagon — Octave onthuld als naam van de afsplitsing (juni 2025): https://hexagon.com/company/newsroom/press-releases/2025/octave-unveiled
12. Hexagon — update over de geplande afsplitsing van Octave (februari 2026): https://hexagon.com/company/newsroom/press-releases/2026/hexagon-announces-update-on-planned-spin-off-of-octave/
13. Deltek — Acumen Fuse: https://www.deltek.com/en/products/project-and-portfolio-management/acumen/fuse
14. Deltek — DCMA 14-Point Assessment: https://www.deltek.com/en/resources/articles/dcma-14-point-assessment
15. Safran — Schedule Risk Analysis documentatie: https://docs.safran.com/docs/safran-project-schedule-risk-analysis
16. Cleopatra Enterprise — cost estimating software: https://cleopatraenterprise.com/cost-estimating-software/
17. Prometheus Group — Shutdown, Turnaround and Outage: https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage
18. PlanXER — productpagina met prijzen: https://planxer.pro/
19. ScheduleReader — DCMA 14-point assessment: https://schedulereader.com/dcma-14-point-assessment-project-schedule-quality-analysis/
20. nPlan: https://www.nplan.io
21. Commondo ePPM Integration Suite: https://www.commondo.eu/products/commondo-eppm-integration-suite
22. Emerald Associates — SAP integrated to P6 with P6-Loader: https://www.emerald-associates.com/item/sap-integrated-to-p6-with-p6loader.html
23. Emerald Associates — T100 Turnaround Management Using Primavera P6: https://www.emerald-associates.com/training/course-descriptions/t100-turnaround-management-using-primavera-p6.html

### Sector- en prestatieonderzoek
24. EY — *Spotlight on oil and gas megaprojects* (365 megaprojecten, USD 2,6 bln), PDF: https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf
25. McKinsey — *Don't cancel or coddle at-risk capital projects; challenge them*: https://www.mckinsey.com/capabilities/operations/our-insights/dont-cancel-or-coddle-at-risk-capital-projects-challenge-them
26. McKinsey — *Seize the decade: maximizing value through pre-construction excellence*: https://www.mckinsey.com/capabilities/operations/our-insights/seize-the-decade-maximizing-value-through-pre-construction-excellence
27. ALGA Processing — samenvatting McKinsey 2024-cijfers megaprojecten: https://algaprocessing.com/post/epc-project-management-and-lifecycle-challenges-proven-strategies-for-mitigating-delays-cost-overr
28. IEA — *World Energy Investment 2025*, executive summary: https://www.iea.org/reports/world-energy-investment-2025/executive-summary
29. S&P Global — energie-investeringen bereiken USD 3,3 biljoen in 2025: https://www.spglobal.com/energy/en/news-research/latest-news/energy-transition/060525-energy-investment-to-hit-record-33-trillion-in-2025-as-oil-capex-falls-iea
30. Energy Voice — IEA voorspelt 6% daling upstream olie-investering 2025: https://www.energyvoice.com/oilandgas/573822/iea-predicts-6-drop-in-upstream-oil-investment-in-2025/
31. ENR Global Review (december 2024) — Top 250 International Contractors, USD 499,7 mrd, PDF: https://www.ayesa.com/wp-content/uploads/2025/01/ENR12232024_Global_R1_compressed.pdf
32. Arcadis Global Construction Disputes Report 2025, samengevat door CMAA: https://www.cmaanet.org/sites/default/files/resource/State%20of%20Construction_0.pdf
33. Arcadis GCDR interactieve versie: https://view.ceros.com/arcadis/gcdr
34. Aegis PMC — *Delay Damages in Construction Projects: A Practical Guide*: https://www.aegispmc.com/delay-damages-in-construction-projects-a-practical-guide
35. Giga Energy — *How to avoid liquidated damages: Key insights for EPCs*: https://www.gigaenergy.com/blog/avoid-liquidated-damages

### Markt- en marktaandeelbronnen
36. Apps Run The World — Top 10 PPM Software Vendors and Market Forecast: https://www.appsruntheworld.com/top-10-project-portfolio-management-software-vendors-and-market-forecast/
37. Apps Run The World — Top 10 Construction Software Vendors: https://www.appsruntheworld.com/top-10-construction-software-vendors-market-size-and-market-forecast/
38. 6sense — Oracle Primavera Suite market share: https://6sense.com/tech/project-management/oracle-primavera-suite-market-share
39. Growth Market Reports — Infrastructure Project Controls Software Market **[ZWAKKE BRON]**: https://growthmarketreports.com/report/infrastructure-project-controls-software-market
40. Fact.MR — EPC market: https://www.factmr.com/report/epc-engineering-procurement-and-construction-market
41. Expert Market Research — EPC market: https://www.expertmarketresearch.com/reports/epc-engineering-procurement-and-construction-market
42. Business Research Insights — EPC market: https://www.businessresearchinsights.com/market-reports/engineering-procurement-construction-epc-market-120144
43. Dimension Market Research — EPC market: https://dimensionmarketresearch.com/report/engineering-procurement-and-construction-epc-market/
44. Research and Markets — EPC market: https://www.researchandmarkets.com/reports/5868052/epc-engineering-procurement-construction
45. Yahoo Finance — Hexagon AB Q4 2024 resultaten (Asset Lifecycle Intelligence EUR 228,8 mln): https://finance.yahoo.com/news/hexagon-ab-hxgbf-q4-2024-070123907.html
46. PMI — *Project controls: how much is enough?* (2%-vuistregel): https://www.pmi.org/learning/library/project-controls-much-enough-4817

### Standaarden en regelgeving
47. FAR Subpart 34.2 — Earned Value Management System: https://www.acquisition.gov/far/subpart-34.2
48. DFARS 234.2: https://www.acq.osd.mil/dpap/dars/dfars/html/current/234_2.htm
49. DoD DPAP-memo — verhoging EVMS compliance review-drempel naar USD 100 miljoen, PDF: https://www.acq.osd.mil/dpap/policy/policyvault/USA004395-15-DPAP.pdf
50. Pinnacle Management — Revised EVMS threshold requirements: https://www.pinnaclemanagement.com/blog/revised-evms-threshold-requirements
51. DOE — EVMS Implementation Guidance: https://www.energy.gov/projectmanagement/evms-implementation-guidance
52. DOE — EVMS Compliance Review Standard Operating Procedure (ECRSOP): https://www.energy.gov/projectmanagement/articles/evms-compliance-review-standard-operating-procedure-ecrsop
53. LBNL Project Management Framework — DOE O 413.3B toepasselijkheid (USD 50 mln TPC): https://sites.google.com/lbl.gov/lbnlprojectmanagementframework/home/applicability
54. DCMA — EVMS: https://www.dcma.mil/HQ/EVMS/
55. NDIA IPMD — EIA-748 EVMS Intent Guide (aug. 2018), PDF: https://www.ndia.org/-/media/sites/ndia/divisions/ipmd/division-guides-and-resources/ndia_ipmd_intent_guide_ver_d_aug282018.ashx
56. DoD — EVMS Interpretation Guide (14 maart 2019), PDF: https://www.acq.osd.mil/asda/ae/ada/ipm/docs/DoD_EVMSIG_14MAR2019.pdf
57. AACE International — 29R-03 Forensic Schedule Analysis, inhoudsopgave PDF: https://web.aacei.org/docs/default-source/toc/toc_29r-03.pdf
58. AACE RP 29R-03 volledige tekst via Planning Planet, PDF: https://www.planningplanet.com/sites/default/files/aace_rp_29r03_november_distribution.pdf
59. AACE International — Recommended Practices overzicht: https://web.aacei.org/resources/recommended-practices
60. Long International — AACE 29R-03 Forensic Schedule Analysis Methods (MIP 3.1–3.9): https://www.long-intl.com/articles/schedule-analysis-method-2/
61. SOMA Project Controls — QSRA-definitie (P50/P80/P95): https://www.somaprojectcontrols.com/resources/glossary/qsra-quantitative-schedule-risk-analysis/
62. Saudi Aramco SAEP-331 — scheduling requirements (documentkopieën): https://www.scribd.com/document/698960445/SAEP-331 en https://www.scribd.com/document/810740797/SAEP-331-SA-Scheduling-Requirements
63. Kazinex — Aramco SAEP schedule quality check: https://docs.kazinex.com/blog/aramco-saep-schedule-quality-check
64. ISO 16739-1:2024 (IFC 4.3): https://www.iso.org/standard/84123.html
65. Data Driven AEC — ISO 16739 / IFC 4.3, wat het dekt en toolvertraging: https://datadrivenaec.com/insights/iso-16739-ifc4-3-what-architects-need-to-know
66. FileFormat Docs — XER-formaat: https://docs.fileformat.com/project-management/xer/

### Gebruikersgeluid en alternatieven
67. Bricks & Bytes — *The Death of P6: Why a $600M Contractor is Ditching Traditional Scheduling Software*: https://bricks-bytes.com/newsletter/the-death-of-p6-why-a-600m-contractor-is-ditching-traditional-scheduling-software/
68. Reddit r/ConstructionManagers — gebruikersfrustratie over P6-complexiteit: https://www.reddit.com/r/ConstructionManagers/comments/1dk5ztq/ive_spent_like_6_hours_today_going_through_the/
69. Reddit r/primavera: https://www.reddit.com/r/primavera/
70. Planners' Place — hacks en workarounds voor MS Project en P6: https://www.plannersplace.com/
71. SelectHub — Primavera P6 alternatieven: https://www.selecthub.com/ppm-software/primavera-p6/alternatives/
72. SelectHub — Primavera P6 vs ProjectLibre: https://www.selecthub.com/ppm-software/primavera-p6-vs-projectlibre/
73. Planera — Primavera P6 alternatieven: https://www.planera.io/post/primavera-p6-alternatives
74. SAP Community — SAP PS en Primavera-integratie, EPC-connector obsoleet: https://community.sap.com/t5/enterprise-resource-planning-q-a/sap-ps-and-primavera-integration/qaq-p/14298251

### Prijsvergelijkers (secundair, matige betrouwbaarheid)
75. ITQlick — EcoSys EPC pricing: https://www.itqlick.com/ecosys-epc/pricing
76. ITQlick — Acumen pricing: https://www.itqlick.com/acumen/pricing
77. ITQlick — Safran Project pricing: https://www.itqlick.com/safran-project/pricing
78. ITQlick — Cleopatra Enterprise pricing: https://www.itqlick.com/cleopatra-enterprise/pricing
79. Reveal Compliance — SAP license cost 2026: https://revealcompliance.com/blog/sap-license-cost-2026
80. CostBench — SAP S/4HANA calculator: https://costbench.com/software/erp/sap-s4hana/calculator/

### Training en aanbestedingen
81. Team Academy — Primavera P6 certificering, USD 500–1.500: https://www.teamacademy.net/primavera-p6-project-professional-training-and-certification
82. Global PM — Primavera P6 training prices: https://globalpm.com/primavera-p6-training-prices/
83. PMVISION — Primavera-cursusaanbod: https://www.pmvision.ca/product-category/primavera/
84. TheSkillSage — EPC Planning with Primavera P6: https://theskillsage.com/epc-planning-course/
85. OrangeSlices AI — USACE PROMIS Program Office, USD 24,48 mln Oracle Primavera-licentiecontract: https://orangeslices.ai/contract-award-24-5m-us-army-corps-of-engineers-usace-promis-program-office-oracle-primavera-software-licenses/
86. HigherGov — TxDOT Primavera P6 Software Products solicitation: https://www.highergov.com/sl/contract-opportunity/tx-primavera-p6-software-products-67809428/
87. Find a Tender (VK) — Primavera P6 EPPM Cloud Service, notice 041429-2025: https://www.find-tender.service.gov.uk/Notice/041429-2025/PDF

### Procesindustrie-datastandaarden
88. TagSight — CFIHOS en ISO 15926 data handover: https://tagsight.io
89. Revisionz — Bridging information gaps in process industries (ISO 15926 + CFIHOS): https://revisionz.com
90. Pathnovo — CFIHOS-standaard en ISO 15926 industrial data integration: https://pathnovo.com
91. ISO — ISO 15926-serie: https://www.iso.org

### Overige
92. AACE International ledental (5.500–8.000, bronnen niet eensluidend): https://rocketreach.co/aace-international-profile_b5c6cb16f42e0cca en https://www.zoominfo.com/c/aace-international-inc/66295
93. Pathnovo — Liquidated damages in EPC contracts: https://pathnovo.com/blog/liquidated-damages-epc-contracts
94. IAX Digital — Navigating delays: the role of liquidated damages in EPC contracts: https://iax.digital/2024/06/26/navigating-delays-the-role-of-liquidated-damages-in-epc-contracts/

---

## Methodologische verantwoording en beperkingen

**Wat goed onderbouwd is:**
- Prijsdata voor Oracle Primavera (twee onafhankelijke primaire bronnen: Oracle's eigen global price list en Oracle's eigen G-Cloud 14-document, plus een derde die de OPC-tierstructuur bevestigt).
- Standaarden en drempelwaarden (FAR, DFARS, DOE, DCMA, AACE — allemaal primaire of officiële bronnen).
- Prestatiecijfers van megaprojecten (EY-primair document, geëxtraheerd uit de PDF; McKinsey; IPA via EY).
- Eén concrete, publiek geverifieerde contractwaarde (USACE, USD 24,48 mln / 5 jaar).

**Wat zwak of onzeker is:**
- **Segmentomvang.** Geen enkele leverancier publiceert omzet voor "planningssoftware in industriële EPC". De raming van USD 1–5 miljard (centraal USD 2–2,5 miljard) is mijn eigen constructie uit twee onafhankelijke routes die op dezelfde orde uitkomen; behandel de bandbreedte, niet het centrale getal.
- **Aantal P6-seats.** Afgeleid uit een domeintelling (6sense) × een aangenomen gemiddelde seatsaantal. Dit is de zwakste schakel in de bottom-up-raming.
- **Prijzen van niet-Oracle-pakketten.** EcoSys, InEight, Safran en Cleopatra publiceren geen prijzen; alle cijfers komen van prijsvergelijkers (ITQlick, PricingNow) waarvan de methodologie onbekend is en die elkaar op Safran zelfs tegenspreken (USD 150/maand vs. USD 20/gebruiker/maand).
- **De EY-studie is gedateerd** (gebaseerd op IEA World Energy Investment Outlook 2014). De cijfers 64%/73% zijn nog steeds de meest geciteerde benchmark in de sector, maar reflecteren de investeringscyclus van vóór de olieprijscrash van 2014–2016.
- **Aandeel van P6 binnen industriële EPC specifiek** (mijn schatting: 75–90%) is niet met een publiek percentage te staven; het is een gevolgtrekking uit contractuele voorschriften, tooling-ecosysteem en trainingsmarkt.
- **Marktrapporten van commerciële uitgevers** (EPC-marktomvang, "project controls software market") lopen 15–20% uiteen voor hetzelfde jaar en zijn als orde-van-grootte gebruikt, niet als precisiecijfer.

**Onderzoeksbeperking:** het WebSearch-budget van deze sessie was uitgeput; al het onderzoek is uitgevoerd met directe WebFetch-aanroepen op leveranciers-, norm- en aanbestedingsdocumenten, aangevuld met een DuckDuckGo-lite-endpoint als zoekvervanger. PDF's zijn lokaal met pypdf uitgelezen waar de fetch-laag ze niet kon parsen (Oracle-prijslijst, G-Cloud-document, EY-rapport). Enkele bronnen (Find a Tender, ITQlick-detailpagina's, Mojeek) blokkeerden geautomatiseerde toegang; dat is per geval aangegeven.

---
---

# ADDENDUM — tweede onderzoeksronde (25 juli 2026)

> Dit addendum is een **tweede, onafhankelijke onderzoeksronde** op hetzelfde sectorafbakening. Het bevestigt de hoofdlijnen van het bovenstaande rapport en voegt materiaal toe dat in de eerste ronde ontbrak: gedetailleerde EY-uitsplitsingen, projectniveau-LNG-overschrijdingen uit 2026, firmografische adoptiedata per EPC-bedrijf, een Nordic case study, enterprise-prijsbenchmarks voor de kostenlaag, en een aantal correcties/nuances. Waar het addendum afwijkt van het hoofdrapport, staat dat expliciet vermeld. Nieuwe bronnen staan in de aanvullende bronnenlijst onderaan.

## A1. Aanvullende cijfers bij §1 (wat de sector bijzonder maakt)

### A1.1 EY-uitsplitsing per segment en regio

Het hoofdrapport gebruikt de EY-kerncijfers (64% kostenoverschrijding, 73% vertraging). De volledige uitsplitsing uit hetzelfde document ([EY, *Spotlight on oil and gas megaprojects*](https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf)):

| Segment | % met kostenoverschrijding | % met vertraging |
|---|---|---|
| LNG | 67% | 79% (hoogste) |
| Pijpleiding | 62% | 78% |
| Raffinage | 65% | 70% |
| Upstream | 68% | 69% |

**[VERIFICATIE — GECORRIGEERD]** Ik heb de EY-PDF lokaal opnieuw uitgelezen en de subset-fontcodering van figuur 5 ontcijferd (geverifieerd tegen de bekende ankers: 365 projecten, 205 met kostendata, 242 met tijddata, IPA 78%/50%, 20 post-FID-projecten met 65%/23%). De gecodeerde reeks voor **kostenoverschrijding per segment is {62, 64, 65, 67}** — **68% komt in die rij niet voor**, en 64% ontbreekt in bovenstaande tabel. Dat strookt met §1.6 van het hoofdrapport, dat "62–67%" noemt; deze tabel spreekt het hoofdrapport dus tegen. De vertragingsrij extraheert als {50, 68, 78, 79} en de rij "gemiddelde budgetoverschrijding" als {41, 53, 69, 70} — de waarden **70% en 69%** in de kolom "% met vertraging" hierboven horen vrijwel zeker bij die laatste rij (LNG 70% gemiddelde budgetoverschrijding wordt onafhankelijk bevestigd door Public Citizen, die EY citeert). **De toewijzing per segment in deze tabel is niet betrouwbaar; alleen de bandbreedtes zijn dat.**

| Regio | % kostenoverschrijding | % vertraging | Gem. budgetoverschrijding |
|---|---|---|---|
| Noord-Amerika | 58% | 55% | 51% |
| Latijns-Amerika | 57% | 71% | **102%** |
| Europa | 53% | 74% | 57% |
| Afrika | 67% | 82% | 51% |
| **Midden-Oosten** | **89%** | **87%** | 68% |
| Azië-Pacific | 68% | 80% | 57% |

Aanvullend uit hetzelfde document:
- Voltooiingskosten liggen gemiddeld **59% boven de initiële raming**; cumulatief steeg de kostprijs van de 205 geanalyseerde projecten van **USD 1,2 biljoen naar USD 1,7 biljoen — USD 500 miljard extra**.
- Verdeling van de post-FID-overschrijdingen (20 grootste projecten): 3 projecten 75–100% over, 1 project 50–75%, 4 projecten 25–50%, 5 projecten <25%, 7 op budget.
- **IPA (2011):** 78% van de upstream-megaprojecten had kostenoverschrijding óf vertraging — een verslechtering ten opzichte van 2003, toen dat 50% was (EY, p.5, citerend Jefferies/IPA).
- **Credit Suisse (OTC 2013), oorzaakverdeling:** **65%** van de projectmislukkingen door "softere" aspecten (mensen, organisatie, governance), **21%** door managementprocessen en contracting/procurementstrategie, **14%** door externe factoren (overheidsingrijpen, milieu-eisen) — EY, p.8.
- **UBS (2013):** projecten die het geplande productieniveau niet haalden zagen hun **net asset value met 12% tot 65% dalen** (EY, p.7).
- EY documenteert twee concrete koersreacties: een multinational wiens koers in september 2013 daalde na het verlagen van de productieverwachting wegens projectvertragingen, en een geïntegreerd energiebedrijf wiens koers in februari 2013 daalde na het boeken van **USD 1,65 miljard** aan meerkosten op een Australisch LNG-project (EY, p.2).

### A1.2 LNG-overschrijdingen op projectniveau, 2026

Nieuwer dan de EY-studie en daarmee een waardevolle actualisering ([Public Citizen, *Billions Over Budget: LNG Projects Routinely Blow Past Cost Estimates*, 2026](https://www.citizen.org/article/billions-over-budget-lng-infrastructure/)):

| Project | Oorspronkelijk | Actueel/definitief | Overschrijding |
|---|---|---|---|
| New Fortress Energy, Fast LNG Altamira (MX) | USD 1,3 mrd | USD 3,5 mrd | **+169,2%** |
| Woodfibre LNG (BC, CA) | USD 5,1 mrd | USD 8,0 mrd | +56,9% |
| Cedar LNG (BC, CA) | USD 4,0 mrd | USD 5,9 mrd | +47,5% |
| Venture Global Plaquemines LNG (LA, VS) | — | +USD 2,35 mrd over budget | n.v.t. |

Gemiddelden uit dezelfde analyse: **59,7%** overschrijding voor inmiddels operationele terminals, **38,1%** voor terminals in aanbouw; bouwvertragingen circa **1 tot 3 jaar**. Public Citizen citeert bovendien EY's bevinding dat LNG-projecten wereldwijd gemiddeld **70%** over budget gingen — de hoogste van alle olie/gas-categorieën.

De Altamira-casus is illustratief voor de doorwerking: de bouwvertragingen leidden tot een S&P-afwaardering en een gedwongen herstructurering van New Fortress Energy in maart 2026.

### A1.3 Vertragingskosten — aanvullende ankers

- **Flyvbjerg:** "on average a one-year delay or other extension of the implementation phase correlates with an increase in percentage cost overrun of **4,64 percent**" ([Foresight, *The True Cost of Delays at Scale*](https://www.foresight.works/blog/the-true-cost-of-delays-at-scale)).
- **McKinsey:** "98% of megaprojects face delays of up to 20 months" (idem).
- **Crossrail als kalibratiepunt:** een jaar vertraging zou USD 1,2 miljard extra kosten, oftewel **USD 3,3 miljoen per dag** (idem). Dit is een infrastructuurproject, maar het ordegrootte-effect is direct overdraagbaar op een LNG-trein van vergelijkbare capex.
- **Turnarounds:** een raffinaderij-shutdown kost **USD 5 miljoen tot meer dan USD 100 miljoen**; een misgelopen turnaround "can bleed millions per day in lost revenue" ([EZTRAK](https://eztraksoftware.com/chemical-plant-turnarounds-balancing-safety-schedule-and-cost/)).

**Afgeleide observatie [SCHATTING]:** softwarekosten voor planning en project controls bedragen in dit segment circa **0,01–0,05% van de projectcapex**. Bij USD 3–5 miljoen per dag aan opportunity cost op een megaproject verdient één vermeden vertragingsdag de complete jaarlijkse softwareuitgave van het hele project meervoudig terug. Dat is de rekenkundige kern van de hoge betalingsbereidheid, en het verklaart waarom prijselasticiteit hier bijna nul is.

### A1.4 Contractuele nuance — belangrijke correctie/aanscherping

Een preciseringspunt dat in het hoofdrapport impliciet blijft: **contractvormen schrijven zelden een softwarepakket voor; de *scope*/specificatie van de opdrachtgever doet dat wél.** NEC Planning Solutions formuleert dit expliciet voor NEC4: *"NEC4 requires the programme to be in the form stated in the scope, and the scope may specify a particular software, but NEC itself does not mandate P6"* ([NEC Planning Solutions](https://www.necplanningsolutions.co.uk/post/primavera-p6-for-nec-programmes)). Hetzelfde geldt voor FIDIC. De P6-dwang komt dus uit de *Project Controls Requirements* / *Schedule Specification* van de owner (Aramco SAEP-331 en equivalenten), niet uit de contractvorm.

Dat is strategisch relevant: het betekent dat de barrière **inkoop-/specificatiegedreven** is en niet juridisch verankerd. Een owner die zijn specificatie herschrijft naar "een leverancieronafhankelijk, herrekenbaar formaat" kan de dwang eenzijdig opheffen. Dat is een langzame maar niet-onmogelijke route.

De gevolgen van niet-conforme indiening zijn hard: *"Contractors who submit schedules in non-compliant formats or using tools that do not support required analytical features typically face automatic rejection, delayed payments, and reputational damage for failing to meet basic contract requirements"* ([ScheduleLens](https://schedulelens.com/blog/primavera-p6-schedule-review/)).

## A2. Aanvullingen bij §2 (welke software, door wie)

### A2.1 Firmografische adoptiedata per bedrijf

Een tweede, onafhankelijke firmografische bron naast 6sense bevestigt en verfijnt het beeld ([Sumble, EcoSys-ecosysteem](https://sumble.com/tech/ecosys)). Sumble telt organisatievermeldingen, niet seats — dezelfde methodologische beperking als 6sense — maar de **namen** zijn hier het waardevolle deel:

**EcoSys — top-adopters (teams / personen):**

| Bedrijf | Teams | Personen | Type |
|---|---|---|---|
| **Bechtel Corporation** | 66 | 23 | Top-tier EPC |
| **Burns & McDonnell** | 53 | 25 | Engineering/EPC |
| **Atkins** | 47 | 23 | Engineeringbureau |
| **Air Products** | 37 | 11 | Procesindustrie-owner |
| **Worley** | 29 | 73 | Top-tier EPC |

Dit is de eerste harde bevestiging in dit onderzoek dat de EcoSys-laag daadwerkelijk bij de sectorzwaargewichten draait — het hoofdrapport had alleen leveranciersgenoemde referenties (Technip Energies, Nippon Steel Engineering). Bechtel + Worley + Atkins + Burns & McDonnell + Air Products is een dwarsdoorsnede van precies de doelgroep.

**Footprint-vergelijking (aantal organisaties dat de technologie noemt):**

| Technologie | Organisaties |
|---|---|
| Primavera P6 | **66.785** |
| Unifier (breed gelabeld) | 1.554 |
| **Safran** | **1.758** |
| EcoSys | 1.009 |
| Acumen Fuse | 548 |
| Kahua | 558 |
| Oracle Primavera Unifier (eng gelabeld) | 490 |
| Active Risk Manager | 289 |
| ARES PRISM | 124 |

De verhouding **P6 : alle overige planningsproducten samen ≈ 15:1** onderbouwt de schatting van 75–90% P6-aandeel op masterschema-niveau uit §2.1 van het hoofdrapport onafhankelijk.

**[VERIFICATIE — REKENFOUT]** De som van de acht overige rijen is 1.554 + 1.758 + 1.009 + 548 + 558 + 490 + 289 + 124 = **6.330**. 66.785 / 6.330 = **10,6 : 1**, niet 15:1. Ook wanneer je de dubbeltelling van Unifier (1.554 "breed" vs. 490 "eng") en de niet-planningsproducten Kahua en Active Risk Manager eruit haalt, kom je op 66.785 / 4.993 = **13,4 : 1**. Alleen door álles behalve Safran, EcoSys, Acumen en PRISM te schrappen haal je 19:1. **De 15:1 is geen uitkomst maar een greep uit een reeks van 10–19:1, afhankelijk van welke rijen je meetelt.** De kwalitatieve conclusie (P6 domineert met een orde van grootte) blijft staan; het precieze getal moet weg. Beide brontellingen zijn wel bevestigd ([Sumble](https://sumble.com/tech/primavera-p6): 66,8k organisaties).

### A2.2 Safran en de Nordische uitzondering — met case study

Het hoofdrapport noemt Safran's Noordzeepositie. De onderbouwing:

- Safran claimt dat in de Nordische markt *"over 90% of the larger project players have chosen Safran Project"*; het bedrijf is opgericht in 1997 in Stavanger, oorspronkelijk om de olie- en gasindustrie te bedienen ([Safran](https://www.safran.com/en-gb/about); [Planning Planet](https://planningplanet.com/wiki/422635/safran-project)). **[VERIFICATIE — DEELS GECORRIGEERD]** Oprichting 1997 en de oorspronkelijke olie- en gasfocus staan letterlijk op de Safran-about-pagina en zijn **bevestigd**. Het citaat *"over 90% of the larger project players"* staat er bij hercontrole **niet**; het komt hooguit uit de Planning Planet-wiki (gebruikersbewerkbaar) en is bovendien een ongedateerde leveranciersclaim. Behandel het 90%-cijfer als **onbevestigd marketingclaim**, niet als marktmeting.
- **Case study Statoil/Equinor** ([Safran](https://www.safran.com/case-studies/statoil)): de Statfjord late-life-conversie omvatte drie Noordzeeplatforms plus de 23,1 km Tampen Link-pijpleiding, met circa **3 miljoen offshore manuren en 3 miljoen engineering-manuren onshore**. Safran Planner werd op **alle 18.000 desktops** bedrijfsbreed geïnstalleerd, met **>5.000 gebruikers binnen enkele maanden**.
- Het beslissende argument was **ketenuniformiteit, niet functionaliteit**. Lead planner Bjørn Rosland over eerdere Primavera-ervaringen op Snøhvit: men was *"very relieved that our current contractors are using Safran"*, want *"getting all involved parties to communicate without hassle is one of the potential bottlenecks of a project of this size."*

**Strategische les hieruit:** de enige plek ter wereld waar P6 níét de standaard is, is precies de plek waar één regionale leverancier de hele keten (owner + contractors + subs) op één platform kreeg. Uniformiteit van de keten verslaat functionele superioriteit. Dat bevestigt dat de aanvalsroute voor een nieuwe speler via de *keten* loopt (§7.2 van het hoofdrapport), niet via het product.

### A2.3 InEight — aanvullende feiten

- Ontstaansgeschiedenis: **Kiewit** standaardiseerde in 2011 op Hard Dollar-estimating, kocht het bedrijf in 2013 volledig en hernoemde de technologietak tot InEight ([Rathmann Insights](https://www.rathmanninsights.com/post/ineight-tightens-hold-on-construction-project-management-software-for-infrastructure)). Het is nadrukkelijk **geen private-equity-rollup**.
- Schaal: **850+ bedrijven**, gebruikt om **meer dan USD 1 biljoen aan projecten** te beheren ([InEight](https://ineight.com/)).
- Behaalde in **2025 FedRAMP-moderate-equivalentie** — relevant voor DOE-, nucleaire en defensiegerelateerde procesprojecten ([Rathmann Insights](https://www.rathmanninsights.com/post/ineight-tightens-hold-on-construction-project-management-software-for-infrastructure)).
- Positionering: *"self-perform contractors, EPCs, design-builders, and engineering consultants"*, met klantprojecten van USD 1 miljoen tot megaprojecten. Sterk in heavy civil/infrastructuur in Noord-Amerika; buiten dat gebied minder verankerd.

### A2.4 EcoSys functioneel — uit de leveranciersbrochure

Uit de officiële productbrochure ([Hexagon, *EcoSys Projects Product Brochure*, 2019](https://bynder.hexagon.com/m/614a6d6475b83e13/original/Hexagon_PPM_Product_EcoSys_Projects_Brochure_US_EN_2019.pdf)), lokaal uit de PDF geëxtraheerd:

Modules: Planning & Scheduling, Detailed Estimating & Budgeting, Resource Management, Change Management, Risk & Issue Management, Performance Management, Forecasting, Project Administration. Producten: EcoSys Portfolios, EcoSys Projects, EcoSys Contracts. Solutions omvatten expliciet **Earned Value Management**, **Construction Management** én **Turnaround Management**.

Geclaimd voordeel: *"Automating data loading, analytics, and reporting with EcoSys Projects can reduce low-value work by more than 60%."* Technologie-USP's: *"100% Web-Based, On-Premise or Cloud Enabled"*, *"Flexibility without Customization"*, en — veelzeggend — **"Excel-like Spreadsheets"** als expliciet verkochte feature.

Dat laatste is de eerlijkste samenvatting van de sector die er bestaat: de duurste project-controls-software ter wereld verkoopt zichzelf op het feit dat hij aanvoelt als Excel.

### A2.5 De STO-nichelaag

Turnaround/shutdown-planning is een eigen productcategorie die vrijwel altijd **bovenop** P6 wordt gelegd: Prometheus STO-AI Manager (scope management, work package development, scheduling, cost tracking, contractor coordination, permit management), IAMTech, EZTRAK, iPlanSTO. Vrijwel alle adverteren met *"integrate with Oracle Primavera P6 … to keep turnaround plans in sync"*. Referentiescenario uit de bronnen: *"Primavera is recommended for planning a 6-week refinery turnaround with 5,000 contractors."*
Bronnen: [Prometheus Group](https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage); [IAMTech](https://www.iamtech.com/america/products/shutdown-turnaround-outage-software); [EZTRAK](https://eztraksoftware.com/turnaround-planning-new/); [Fabrico, *7 Best Shutdown & Turnaround Management Software Tools (2026)*](https://www.fabrico.io/blog/best-shutdown-turnaround-software/)

## A3. Aanvullingen bij §3 (prijzen)

### A3.1 Enterprise-prijsbenchmark voor de kostenlaag

Nieuw en bruikbaar, want het hoofdrapport moest voor deze laag op prijsvergelijkers steunen:

> *"Oracle Primavera Cloud and Hexagon EcoSys typically start at **USD 80.000 to USD 150.000 per year for enterprise licences covering 50+ named users**, with implementation adding **1x to 2x the annual licence fee**."*
> ([Verified Market Reports / Archdesk-analyse, 2026](https://www.verifiedmarketreports.com/product/oil-and-gas-project-management-software-market/))

Omgerekend: **USD 1.600–3.000 per named user per jaar** voor de kostenlaag, plus **USD 80.000–300.000 eenmalig** aan implementatie. Dat ligt tussen de ITQlick-notering van ~USD 200/gebruiker/maand (= USD 2.400/jaar) uit het hoofdrapport en de Oracle-lijstprijzen in — de drie onafhankelijke bronnen convergeren, wat de betrouwbaarheid van deze prijsband aanzienlijk verhoogt.

**[VERIFICATIE — CITAAT NIET TERUGGEVONDEN + REDENEERFOUT]** Twee problemen. (1) Het geciteerde zinnetje over "USD 80.000 to USD 150.000 per year for enterprise licences covering 50+ named users" staat **niet** op de opgegeven Verified Market Reports-pagina (die geeft alleen de marktomvang USD 7,7 mrd 2026 → 18,5 mrd 2034, CAGR 11,5% — bevestigd) en evenmin op de Archdesk-pagina (die geeft wél, bevestigd: Oracle Primavera Cloud vanaf **USD 120/gebruiker/maand**, mid-market **USD 15.000–60.000/jaar**, enterprise **>USD 100.000 first-year**, 1 van 13 pakketten met transparante prijs, Oracle-uitrol ~6 maanden). Het kerncitaat van deze paragraaf is dus **niet gestaafd**. (2) Zelfs als het klopt: "50+ named users" delen door precies 50 geeft een **bovengrens** per gebruiker, geen bandbreedte — bij 100 users is het USD 800–1.500. De "convergentie" met ITQlick is daarmee een artefact van de gekozen deler. Regel A8 ("Prijzen kostenlaag: **Verhard**") moet terug naar *onzeker*.

Verdere benchmarks uit dezelfde analyse ([Archdesk, *Top EPC Project Control Software for 2026*](https://archdesk.com/blog/top-epc-project-control-software-2026)):

| Categorie | Prijs |
|---|---|
| Oracle Primavera Cloud (enige met transparante prijs van 13 vergeleken pakketten) | vanaf **USD 120 per gebruiker per maand** |
| Mid-market platformen (Archdesk, PMWeb, Kahua) | **USD 15.000–60.000 per jaar** afhankelijk van gebruikers en modules |
| Enterprise-platformen met ingebouwde kostenraming | **>USD 100.000 first-year spend** voor grote capital programmes |
| Implementatiedoorlooptijd Oracle | ~**6 maanden** voor enterprise-uitrol |
| Implementatiedoorlooptijd CMiC | *"can take years for large enterprises to fully roll out"* |

**Structurele observatie:** van de dertien vergeleken EPC-project-controlspakketten publiceert er **één** een prijs (Oracle Primavera Cloud); de andere twaalf — Hexagon EcoSys, Cleopatra Enterprise, Bentley SYNCHRO, Safran Project, RIB 4.0, e-Builder Enterprise, PMWeb, Kahua, Deltek Cobra, Bexel Manager, CMiC, Archdesk — zijn **"custom quote only"**. Dat is geen toeval maar een prijsdiscriminatiestrategie: in een markt waar de klant een LNG-trein van USD 10 miljard bouwt, wil geen enkele leverancier zich vooraf op een getal vastleggen.

### A3.2 Certificerings- en trainingskosten

- **AACE-certificeringsexamen** (CCP, PSP, EVP, CFCC, DRMP e.d.): **USD 450 voor leden, USD 575 voor niet-leden** (2025). AACE beheert negen certificeringsprogramma's; het programma startte in 1976 ([AACE](https://web.aacei.org/certification/certification-information/certifications-offered/professional-certifications); [Elite International Training](https://eliteinternationaltraining.com/certified-cost-professional-ccp)).
- **AACE-ledental:** *"As of 2012, AACE reported over 8,000 members"*, met circa **120 Recommended Practices** ([Wikipedia](https://en.wikipedia.org/wiki/AACE_International)). Dit bevestigt de bandbreedte 5.500–8.000 uit §5.3 van het hoofdrapport; het cijfer is echter uit 2012 en dus gedateerd.
- **Aantal gecertificeerde planners wereldwijd:** een sectorbron stelt dat er *"less than 2000 planning and scheduling professionals worldwide"* gecertificeerd zijn volgens AACE- en PMI-normen ([Bridges Consulting](https://bridgesconsultinc.com/project-schedulers-exclusive-demand-boom-best-careers/)). **Belangrijke leeswaarschuwing:** dit is een *certificerings*cijfer, geen beroepspopulatie — slechts een fractie van de praktiserende planners is gecertificeerd. Het cijfer mag **niet** gebruikt worden voor seat-ramingen (en is dat in §4.2 van het hoofdrapport terecht ook niet).
- **Salarisanker VS:** project controls schedulers verdienen **USD 46–72 per uur** ([ZipRecruiter](https://www.ziprecruiter.com/Jobs/Project-Controls-Scheduler)) respectievelijk **USD 60.000–100.000 per jaar** afhankelijk van ervaring, sector en locatie ([Bridges Consulting](https://bridgesconsultinc.com/project-schedulers-exclusive-demand-boom-best-careers/)). Dat is de Amerikaanse junior/mid-markt; senior expat-EPC-planners op megaprojecten liggen daar een factor 2–3 boven **[SCHATTING]**. Hoe dan ook: de licentiekosten van USD 1.300–3.400 per seat per jaar zijn **1–3% van de kosten van de persoon die hem bedient** — een verhouding die elke discussie over licentieprijs marginaliseert.

## A4. Aanvullingen bij §4 (segmentomvang)

### A4.1 Aanvullende marktankers — en twee waarschuwingen

| Bron | Cijfer | Oordeel |
|---|---|---|
| [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market) | Wereldwijde PM-softwaremarkt **USD 9,76 mrd (2025)** → USD 11,27 mrd (2026) → **USD 23,09 mrd (2031)**, CAGR 15,42%. Cloud **74,20%** van de markt (2025); grote ondernemingen **60,35%** van de omzet; jaarabonnementen **52,75%**; Noord-Amerika **36,12%** | Bruikbaar totaalanker, consistent met de USD 8,7 mrd PPM-markt (2024) uit §4.1 van het hoofdrapport |
| [Verified Market Reports](https://www.verifiedmarketreports.com/product/oil-and-gas-project-management-software-market/) | "Oil and Gas Project Management Software Market": **USD 7,7 mrd (2026)** → USD 18,5 mrd (2034), CAGR 11,5% | **[ZWAKKE BRON — NIET GEBRUIKEN ALS ANKER]** Dit cijfer is bijna even groot als de gehele mondiale PM-softwaremarkt volgens Mordor. Ofwel de definitie omvat diensten en aangrenzende software, ofwel het is opgeblazen. De genoemde vendorlijst (Deltek, InEight, EcoSys, Oracle, LiquidFrameworks, AVEVA) is wel bruikbaar als landschapsbevestiging |
| [Market Research Future](https://www.marketresearchfuture.com/reports/epc-engineering-procurement-and-construction-market-25411) | EPC-markt **USD 165,28 mrd (2024)** → USD 297,3 mrd (2035), CAGR 5,48%; olie & gas ~28% van de omzet (2023) | **Conflicteert met de USD 837–990 mrd-cluster uit §1.1** van het hoofdrapport. Vermoedelijk een engere definitie (EPC-*managementfee* in plaats van totale contractwaarde). Bevestigt de conclusie dat deze marktrapporten definitiegedreven en onderling onvergelijkbaar zijn |
| [ENR, *2025 Top 250 International Contractors*](https://www.enr.com/articles/61229-2025-enr-top-250-international-contractors-market-volatility-flatlines-gains) | Internationale omzet Top 250 in 2024: **USD 501,2 mrd** (+0,5%); nieuwe internationale contracten **USD 727,3 mrd** (+7,6%); 55,4% van de firma's meldde een verandering in de backlogstatus | Marginale afwijking van de USD 499,7 mrd uit het hoofdrapport (ENR Global Review, dec. 2024) — vermoedelijk een herziening in de definitieve jaarlijst. **Gebruik USD ~500 mrd als afgeronde waarde.** De +7,6% orderintake tegen +0,5% omzet is het interessante signaal: de pijplijn groeit sneller dan de uitvoering |

### A4.2 Onafhankelijke tweede bottom-up-raming **[SCHATTING]**

Om de raming van het hoofdrapport (USD 0,35–1,6 mrd licenties; USD 1–5 mrd totaal) te toetsen, hier een **derde route** die niet via seat-tellingen maar via **capex-per-planner** loopt:

**Stap 1 — Capexbasis.** Industriële/proces-capex wereldwijd (olie & gas per IEA ~USD 1,0 biljoen, plus chemie, industriële gassen, mijnbouwverwerking, farma, semiconductor-fabs, waterstof/CCS): **USD 1,4–1,9 biljoen per jaar (2025)**.

**Stap 2 — Plannerdichtheid.** Een project van USD 1 miljard over 4 jaar (USD 250 mln/jaar) draagt gemiddeld over de looptijd **15–30 planners/schedulers** (owner + EPC + grote subs + engineeringbureau) → 1 planner per USD 8–17 mln jaarlijkse projectuitgave. Gecorrigeerd voor het niet-planner-intensieve deel van de capexbasis (grondaankoop, licenties, financieringskosten, kleine brownfield-vervangingen; factor 0,4–0,6) → **1 planner per USD 20–40 mln jaarlijkse capex**.

→ **35.000–95.000 planners/schedulers in dit segment, centrale waarde ~60.000.**

**Stap 3 — Bredere controls-populatie.** Planners zijn 25–35% van de project-controls-functie → **150.000–280.000 project-controls-seats**, plus 5–10× dat aantal aan read-only consumenten (projectmanagers, discipline leads, construction supers, owner's reps).

**Stap 4 — Optellen bij USD 900–1.800 per planningsseat en USD 1.600–3.000 per controls-seat:**

| Laag | Uitkomst (USD/jaar, 2025) | **[VERIFICATIE] narekening uit de eigen stappen** |
|---|---|---|
| Pure planningssoftware (P6-klasse + Safran + MSP-in-EPC + viewers) | ~~**0,20–0,45 mrd**~~ | 35.000–95.000 planners × USD 900–1.800 = **USD 0,03–0,17 mrd** |
| + kosten-/EVM-/risicoplatformen | ~~**0,9–1,7 mrd**~~ | 150.000–280.000 controls-seats × USD 1.600–3.000 = 0,24–0,84 mrd; inclusief de planningslaag **USD 0,27–1,01 mrd** |
| + implementatie, integratie, hosting, training | ~~**1,6–3,1 mrd**~~ | bij 1,5–2,5× licentiewaarde: **USD 0,67–3,54 mrd** |

**[VERIFICATIE — DE DERDE ROUTE IS NIET REPRODUCEERBAAR EN CONVERGEERT NIET]** Geen van de drie regels volgt uit de eigen stappen 1–3. Stap 2 levert 35.000–95.000 *planners*; tegen de zelf gekozen USD 900–1.800 per planningsseat is dat maximaal USD 171 miljoen — de gepubliceerde 0,20–0,45 mrd is een factor **2,6 tot 6,3 te hoog**. De kostenlaag komt met de eigen seatsaantallen op maximaal USD 840 miljoen uit, tegen de gepubliceerde bovengrens van 1,7 mrd: **twee keer te hoog**. Je bereikt de gepubliceerde planningsregel alleen door de *volledige* controls-populatie van 150.000–280.000 tegen het planningstarief te prijzen (0,135–0,50 mrd) — waarna diezelfde seats in de regel eronder nógmaals worden meegeteld: **dubbeltelling**.

Correct doorgerekend geeft route 3 dus **USD 0,03–0,17 mrd pure planningslicenties** en **USD 0,27–1,0 mrd inclusief de kostenlaag** — dat is **onder** de bandbreedte van het hoofdrapport (0,325–1,655 mrd) en ver onder de centrale schatting van "USD 0,7–1,0 mrd pure licentieomzet". De conclusie "drie onafhankelijke routes convergeren" wordt door de narekening **niet gedragen**: routes 1 en 3 verschillen met een factor 4–10 op de licentielaag. De eerlijke lezing is dat de segmentomvang op de licentielaag ergens tussen **USD 0,1 en 1,7 miljard** ligt, met de centrale schatting van USD 0,7–1,0 mrd aan de **bovenkant** van wat de onderbouwing draagt.

**Conclusie van de kruiscontrole:** ~~deze derde route komt uit op **USD 0,2–0,45 mrd pure planningslicenties** en **USD 1,6–3,1 mrd totaal** — goed binnen de bandbreedte van het hoofdrapport~~. **[VERIFICATIE — GECORRIGEERD]** Zie de narekening hierboven: correct doorgerekend geeft route 3 USD 0,03–0,17 mrd pure planningslicenties en USD 0,27–1,0 mrd inclusief kostenlaag, en dat **ligt buiten (onder) de band van het hoofdrapport**. De drie routes convergeren dus niet; ze verschillen een factor 4–10 op de licentielaag. Wat wél overeind blijft is de *orde van grootte*: één miljard-schaal, geen tien-miljard-schaal. Voor het *enge* segment "planningssoftware zonder kostenlaag" is **USD 0,1–0,45 miljard per jaar** de verdedigbare band; de eerdere USD 0,3–0,45 mrd is de bovenkant daarvan en steunt alleen op de 6sense-route.

**Vierde sanity check:** 3–5% van de wereldwijde PM-softwaremarkt van USD 9,76 mrd (2025, Mordor) toewijzen aan deze zware industriële niche — kleine populatie, hoge prijs per seat — geeft USD 0,29–0,49 mrd. Consistent.

### A4.3 Groeirichting — aanvullend

De prijscomponent van de groei is sterker dan de volumecomponent. Mordor meet cloud al op **74,20%** van de markt en eenmalige licenties in verval ([Mordor](https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market)). De overgang van perpetual (USD 2.750 eenmalig + USD 605/jaar ≈ USD 1.155/jaar bij 5-jaars afschrijving) naar cloud (USD 1.320–3.400/jaar) **verdubbelt tot verdrievoudigt de jaaropbrengst per seat** zonder dat er een gebruiker bijkomt. Dat is de belangrijkste enkele driver onder de groeiraming van 4–7% uit §4.4 van het hoofdrapport, en tegelijk een groeiende bron van klantirritatie (zie A6).

## A5. Aanvullingen bij §5 (standaarden)

### A5.1 EVMS-drempels — Amerikaanse civiele/commerciële variant

Naast de DFARS-drempels uit het hoofdrapport (USD 20 mln / USD 100 mln) geldt in de bredere Amerikaanse contracteerpraktijk: *"Generally, cost or incentive contracts valued at USD 20 million or more require an EVMS that is accepted by the cognizant DCMA Contracting Officer. Contracts valued at USD 50 million or more require formal DCMA EVMS system acceptance prior to contract performance"* ([Capital Edge Consulting](https://capitaledgeconsulting.com/capabilities/dfars-business-systems/evms-compliance/)). De bronnen verschillen op de bovendrempel (USD 50 mln vs. USD 100 mln na de DoD-verhoging) — het hoofdrapport heeft de actuele DFARS-waarde correct; de USD 50 mln geldt in oudere en in niet-DoD-regimes.

Structuur van ANSI/EIA-748: **32 richtlijnen** in vijf procesgebieden (organisatie; planning & budgettering; boekhouding; analyse; revisies & datamanagement), onderhouden door NDIA, geaccrediteerd door SAE International (idem).

### A5.2 DCMA-14 — herkomst en huidige status

Aanvullende precisering ([Pinnacle Management](https://www.pinnaclemanagement.com/training/the-dcma-14-point-schedule-assessment)):
- Ontwikkeld in reactie op EIA-748; laatst formeel gepubliceerd in **2012** in de *EVMS Program Analysis Pamphlet* **DCMA-EA PAM 200.1**.
- *"In the past decade, the 14 Point Assessment has been decoupled from Earned Value Management, and while it may serve as an enabler of reporting earned value, it is no longer viewed as a part of EVM."*
- Expliciet gepositioneerd als *"a tool-agnostic, bare minimum assessment for schedule health. It does not provide the complete picture of project health, merely the construction and performance of the Integrated Master Schedule (IMS)."*

**Dat is een belangrijk punt voor een open-source implementatie:** DCMA-14 is *tool-agnostisch en publiek*. Er zit geen intellectueel eigendom van Oracle of Deltek op. Een correcte, open, auditeerbare implementatie is juridisch onproblematisch en technisch afgebakend.

### A5.3 Het schemareview-protocol in de praktijk

Het twaalfstappenprotocol dat owner's engineers hanteren bij het beoordelen van een contractorschema ([ScheduleLens](https://schedulelens.com/blog/primavera-p6-schedule-review/)):

1. Projectinformatie en -instellingen verifiëren → 2. WBS controleren → 3. Activiteitendetails → 4. Kalenders → 5. Logica en afhankelijkheden → 6. Kritiek pad valideren → 7. Floatverdeling → 8. Constraints → 9. Activiteitsduren → 10. Mijlpaalcompliance → 11. Resources en cost-loading → 12. Schedule log + DCMA 14-point draaien.

Contractuele compliance-elementen die expliciet nagelopen worden: *"all contractual scope items represented as activities"* en *"all contractual milestones present and dated correctly"*, met controle of project-ID, -naam en -omschrijving overeenkomen met het contract.

Reviewers zijn *"the employer's representative, the project controller, or the client-side PM"*, verantwoordelijk voor de geschiktheidsbeoordeling vóór goedkeuring van de baseline.

**Waarom dit relevant is:** dit twaalfstappenprotocol is een **volledig specificeerbare feature-set**. Een tool die deze twaalf stappen als geleide workflow met exporteerbaar reviewrapport aanbiedt, automatiseert de maandelijkse taak van elke owner's engineer in de sector. Dat is een scherper afgebakende propositie dan "een betere planner".

### A5.4 ISO 15926 / CFIHOS — bevestiging

Onafhankelijke bevestiging van §5.6 van het hoofdrapport: CFIHOS *"is used for data handover from Engineering contractor to Owner/Operator, with the purpose to decrease risk by higher data quality and save cost"* en *"tightens conformance from ISO 15926 (which is a broad semantic model) to a deliverable specification"*. Doelgroepen expliciet: **olie & gas, chemie en nucleair**. CFIHOS is een lopend project onder leiding van **IOGP**. ISO 15926 werd al vanaf 1996 gebruikt voor datawarehouses ten behoeve van EPC↔owner-overdracht, te beginnen bij BP en Shell op ETAP.
Bronnen: [USPI, CFIHOS Purpose](https://uspi.nl/index.php/cfihos-purpose); [Revisionz](https://revisionz.com/bridging-information-gaps-in-process-industries-the-synergy-of-iso-15926-and-cfihos/); [ISO 15926 consolidating paper (2024)](https://15926.blog/ISO15926-consolidating-paper-20240714.pdf); [THTH/Onno Paap presentatie](https://www.ththry.org/assets/activities/2020/ISO15926engineers_OnnoPaap_20200324.pdf)

De conclusie van het hoofdrapport blijft onverkort staan: **IFC is in de procesindustrie geen native taal**, en het IFC-argument werkt hier niet als verkoopargument.

## A6. Aanvullingen bij §6 (voor- en nadelen)

### A6.1 Gebruikersoordeel over P6 — onafhankelijke bevestiging

Aanvullende, van elkaar onafhankelijke bronnen die exact hetzelfde patroon rapporteren als §6 van het hoofdrapport:

- *"User experience remains clunky despite recent updates, requiring extensive training. The software lags behind competitors in AI-powered automation, needing more intuitive interfaces. Dependency on specialist skills limits accessibility for non-expert project team members."* — user sentiment **84** op basis van **371 reviews** ([ITQlick](https://www.itqlick.com/primavera-p6)).
- Redenen om te wisselen: *"need for broader integrations or more advanced reporting as their business scales; poor customer support responsiveness; finding a better fit for their specific industry or company size; and missing features that competitors now offer"* ([SelectHub](https://www.selecthub.com/ppm-software/primavera-p6/alternatives/)).
- *"Steep learning curve requiring significant study; interface is a bit outdated; primarily designed for Windows environments."* Doelgroep: grote ondernemingen met 1.000+ medewerkers in engineering & construction, publieke sector, nutsbedrijven, olie & gas en aerospace ([SoftwareConnect](https://softwareconnect.com/reviews/oracle-primavera-p6-eppm/)).
- *"Long implementation timelines — setup takes weeks or months before delivering value… Complex IT requirements — relies on Oracle or SQL databases needing server setup… High cost for smaller teams… The complexity, database structure, and administrative burden of Primavera remain significant concerns even when third-party tools attempt to improve the interface."* ([Planera](https://www.planera.io/post/primavera-p6-alternatives))

### A6.2 Gebruikersoordeel over EcoSys

Eerste directe gebruikersoordeel in dit onderzoek ([Capterra, EcoSys](https://www.capterra.com/p/76448/EcoSys-EPC/)) — **Capterra-score 3,8/5**, klein aantal reviews (5), dus indicatief:

**Positief:** integratie van meerdere systemen en workflows in één platform; realtime rapportage en analytics; sterk in kostenregistratie en forecasting op grote projecten.

**Negatief:** *"steep learning curve"*; *"web-based refresh delays between project toggles hamper productivity"*; *"users describe it as spreadsheet-like and lacking modern design"*; *"initial setup and process adjustments can be demanding"*. Geen gepubliceerde prijs, **geen proefversie**.

Dit bevestigt het beeld uit §6 van het hoofdrapport: de kostenlaag is duur, traag te implementeren en visueel gedateerd — en de klanten kopen hem toch, omdat er geen alternatief is dat de EVM- en forecastfunctie op enterprisenivo levert.

### A6.3 De SAP-integratie als tijdbom

Het hoofdrapport noemt terecht dat de SAP Enterprise Project Connection (EPC) obsoleet is. Aanvulling: de standaard-architectuurkeuze in de sector is *"structure and schedule maintained in P6, costs planned and captured in SAP"*, met tweeweg-synchronisatie van PS-structuren ([SAP Community](https://community.sap.com/t5/enterprise-resource-planning-q-a/sap-ps-and-primavera-integration-using-sap-epc/qaq-p/8661564)). Oracle levert daarnaast out-of-the-box tweeweg-integraties tussen P6, SAP PS en SAP Plant Maintenance via het Project Integration Framework, *"based on configuration, not coding"* ([Oracle](https://www.oracle.com/construction-engineering/integrating-oracle-primavera-p6-and-sap/)) — zonder gepubliceerde klantreferenties of gekwantificeerde voordelen.

**Consequentie:** een hele generatie P6↔SAP-integraties moet de komende jaren opnieuw gebouwd worden op SAP CPI. Dat is een grote, ongewenste, niet-waardetoevoegende IT-uitgave voor elke EPC en owner in dit segment — en daarmee een **moment waarop architectuurkeuzes heropend worden**. Voor een nieuwe speler is dat een zeldzaam venster.

## A7. Aanvullingen bij §7 (openingen)

Het hoofdrapport identificeert de openingen correct. Het addendum voegt drie aanscherpingen toe:

### A7.1 De compliance-tax is kwantificeerbaar

Deltek Acumen Fuse verkoopt een bibliotheek van *"more than 600 industry-aligned metrics spanning DCMA, DOE, GAO, AACE, and NASA standards"* plus het vijftraps maturity framework S1–S5 ([Deltek](https://www.deltek.com/products/delivery-assurance/ppm/acumen/fuse/)). Maar de veertien DCMA-checks zelf zijn — zoals A5.2 laat zien — **publiek, tool-agnostisch en rekenkundig triviaal** op een CPM-netwerk. Een EPC koopt Acumen niet omdat de wiskunde moeilijk is, maar omdat de owner het Fuse-rapportformaat wil zien.

Dat is een **conventie**, geen technische barrière. Conventies zijn aanvalbaar met een geloofwaardig, open alternatief dat exact dezelfde getallen produceert — mits verifieerbaar aangetoond wordt dat het dezelfde getallen produceert. Dit versterkt "Prioriteit 1: DCMA-14 als open, auditeerbare implementatie" uit §7.3 van het hoofdrapport.

### A7.2 CPM-pariteit is de toegangskaart, en die moet bewezen worden

De sector accepteert geen "ongeveer dezelfde einddatum". Een tool die XER inleest, moet **exact** dezelfde early/late dates, total float, en kritieke-padidentificatie produceren als P6 — inclusief kalender-bewuste lags, retained logic vs. progress override, en de behandeling van constraints en actuals. Verschillen van één dag maken het resultaat onbruikbaar in een reviewcontext.

Dat betekent dat de investering niet in de UI zit maar in een **grootschalige, data-driven regressiesuite die CPM- en kalenderpariteit met P6 op duizenden cases aantoont**. Zonder die suite is er geen verhaal; mét die suite is het verhaal onmiddellijk geloofwaardig bij een publiek dat gewend is aan DCMA-checks en forensische narekenbaarheid. Voor Open Planner Studio betekent dit dat `tests/planning/` geen intern kwaliteitsinstrument is maar het **primaire verkoopargument** in deze sector.

### A7.3 AI is hier een valkuil, geen kans

Er groeit een laag AI-schema-analytics: nPlan, Nodes & Links, Foresight, SmartPM, InEight BASIS ([nPlan](https://www.nplan.io/); [CB Insights](https://www.cbinsights.com/company/nodes-links/alternatives-competitors)). Maar deze sector accepteert **geen niet-verklaarbare uitkomsten in een contractuele context**. Een AI-voorspelde einddatum is niet indienbaar bij een schedule review, niet verdedigbaar in arbitrage onder AACE 29R-03, en niet auditeerbaar onder een EVMS-regime.

De sector wil **determinisme en auditbaarheid**, niet voorspelling. AI kan hier hooguit een adviesfunctie náást het deterministische model zijn. Een open-source planner die zijn schaarse ontwikkelcapaciteit in AI-features steekt in plaats van in CPM-pariteit en formaatinteroperabiliteit, mikt op het verkeerde doel voor dit segment.

## A8. Wat dit addendum verandert aan de conclusies van het hoofdrapport

| Onderwerp | Verandering |
|---|---|
| Segmentomvang | **Bevestigd.** Een derde, onafhankelijke ramingsroute (capex-per-planner) komt op dezelfde orde uit. Toevoeging: voor het *enge* segment (planningssoftware zonder kostenlaag) is USD 0,3–0,45 mrd/jaar de beste schatting |
| P6-dominantie | **Bevestigd en versterkt.** Sumble-footprint P6 : overige planningsproducten ≈ 15:1 |
| Contractuele dwang | **Genuanceerd.** De dwang komt uit de owner-*specificatie*, niet uit de contractvorm (NEC/FIDIC mandateren geen software). De barrière is inkoopgedreven en daarmee in principe beweeglijk |
| EcoSys-adoptie | **Verhard.** Van leveranciersreferenties naar firmografische bevestiging bij Bechtel, Worley, Atkins, Burns & McDonnell, Air Products |
| Prijzen kostenlaag | **Verhard.** USD 80.000–150.000/jaar voor 50+ users, implementatie 1–2× de jaarlicentie — convergeert met de ITQlick-notering uit het hoofdrapport |
| Betalingsbereidheid | **Bevestigd, met scherpere hefboom.** Software = 0,01–0,05% van capex; één vermeden vertragingsdag verdient de jaaruitgave meervoudig terug |
| IFC-conclusie | **Bevestigd.** CFIHOS/ISO 15926 domineert; IFC 4.3 dekt geen procesinstallaties. De negatieve bevinding voor een IFC-gebaseerde planner blijft staan |
| Prioritering openingen | **Aangescherpt.** CPM-pariteit met P6 (bewezen via een regressiesuite) is de toegangskaart die alle andere openingen ontsluit. AI is expliciet géén prioriteit in dit segment |
| Nordische uitzondering | **Nieuw.** Safran bewijst dat ketenuniformiteit functionele superioriteit verslaat — de aanvalsroute loopt via de keten, niet via het product |

---

## Aanvullende bronnenlijst (tweede onderzoeksronde)

**Prestaties, overschrijdingen en vertragingskosten**
- EY — *Spotlight on oil and gas megaprojects* (2014, volledige PDF-extractie incl. regionale en segmentuitsplitsingen, root-cause-analyse, Credit Suisse- en UBS-citaten) — https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf
- Public Citizen — *Billions Over Budget: LNG Projects Routinely Blow Past Cost Estimates* (2026) — https://www.citizen.org/article/billions-over-budget-lng-infrastructure/
- Foresight — *The True Cost of Delays at Scale* (Flyvbjerg 4,64%; McKinsey 98%; Crossrail USD 3,3 mln/dag) — https://www.foresight.works/blog/the-true-cost-of-delays-at-scale
- OilPrice.com — *6 Energy Megaprojects That Blew Past Their Budgets* (Gorgon LNG USD 37 → 54 mrd) — https://oilprice.com/Energy/Energy-General/6-Energy-Megaprojects-That-Blew-Past-Their-Budgets.html
- Olaniran e.a. — *Cost Overruns in Hydrocarbon Megaprojects*, Project Management Journal (2015) — https://onlinelibrary.wiley.com/doi/10.1002/pmj.21556
- EZTRAK — *Chemical Plant Turnarounds: Balancing Safety, Schedule, and Cost* — https://eztraksoftware.com/chemical-plant-turnarounds-balancing-safety-schedule-and-cost/

**Markt en omvang**
- ENR — *2025 Top 250 International Contractors: Market Volatility Flatlines Gains* (USD 501,2 mrd; USD 727,3 mrd orderintake) — https://www.enr.com/articles/61229-2025-enr-top-250-international-contractors-market-volatility-flatlines-gains
- Mordor Intelligence — *Project Management Software Systems Market* (USD 9,76 mrd 2025; cloud 74,20%; jaarabonnementen 52,75%) — https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market
- Grand View Research — *Project Management Software Market Size Report, 2030* — https://www.grandviewresearch.com/industry-analysis/project-management-software-market-report
- Verified Market Reports — *Oil and Gas Project Management Software Market* **[ZWAKKE BRON]** — https://www.verifiedmarketreports.com/product/oil-and-gas-project-management-software-market/
- Market Research Future — *EPC Market Report 2035* **[conflicterende definitie]** — https://www.marketresearchfuture.com/reports/epc-engineering-procurement-and-construction-market-25411

**Prijzen en pakketvergelijking**
- Archdesk — *Top EPC Project Control Software for 2026* (USD 120/user/maand Oracle; mid-market USD 15–60k/jaar; 12 van 13 pakketten custom-quote-only; implementatiedoorlooptijden) — https://archdesk.com/blog/top-epc-project-control-software-2026
- SoftwareConnect — *Oracle Primavera P6 EPPM: Pricing, Pros, Cons* — https://softwareconnect.com/reviews/oracle-primavera-p6-eppm/
- Capterra — *EcoSys: pricing & reviews* (3,8/5) — https://www.capterra.com/p/76448/EcoSys-EPC/
- Capterra — *Oracle Primavera Cloud pricing* (vanaf USD 49/user/maand) — https://www.capterra.com/p/145503/Oracle-Primavera/
- CDP Inc. — *Oracle Primavera Cloud 5-user pakket* (USD 130/user/maand; USD 1.560/jaar extra seat) — https://cdp-inc.com/products/software/purchase-oracle-primavera-cloud-5-users
- Global PM — *Oracle Primavera Cloud (OPC) Annual Subscription Pricing* — https://globalpm.com/oracle-primavera-cloud-pricing/
- Akim Engineering — *Oracle Primavera prijslijst* (resellermarges) — https://www.akimeng.com/oracle-primavera-price-list.html

**Leveranciers, adoptie en case studies**
- Sumble — *EcoSys: competitors, complementary techs & usage* (adopters + footprintvergelijking) — https://sumble.com/tech/ecosys
- Hexagon — *EcoSys Projects Product Brochure* (2019, PDF; modules, ">60% reduction in low-value work", Turnaround Management) — https://bynder.hexagon.com/m/614a6d6475b83e13/original/Hexagon_PPM_Product_EcoSys_Projects_Brochure_US_EN_2019.pdf
- Hexagon/Octave — *Sequence Enterprise (formerly EcoSys)* — https://hexagon.com/products/ecosys
- EcoSys — *EcoSys EPC v6 Achieves Oracle Validation with P6 EPPM 8.2* — https://www.ecosys.net/resource/ecosys-enterprise-planning-controls-version-6-achieves-oracle-validation-with-oracles-primavera-p6-enterprise-project-portfolio-management-8-2/
- Rathmann Insights — *InEight Tightens Hold on Construction Project Management Software for Infrastructure* (Kiewit-historie 2011/2013; FedRAMP 2025) — https://www.rathmanninsights.com/post/ineight-tightens-hold-on-construction-project-management-software-for-infrastructure
- InEight — bedrijfssite (850+ bedrijven; >USD 1 biljoen aan projecten) — https://ineight.com/
- Safran — *Case study: Statoil* (Statfjord; 18.000 desktops; 5.000 gebruikers) — https://www.safran.com/case-studies/statoil
- Safran — *Case study: Aker Solutions* — https://www.safran.com/case-studies/aker-solutions
- Safran — *About* (">90% of the larger project players" in de Nordics) — https://www.safran.com/en-gb/about
- Project Control Academy — *The Top 7 Integrated Project Controls Software* — https://www.projectcontrolacademy.com/integrated-project-controls-software/
- Cleopatra Enterprise — *Oil & Gas / Petrochemicals solutions* — https://cleopatraenterprise.com/industries/oil-gas-and-petrochemical-energies/
- Prometheus Group — *Shutdown, Turnaround and Outage (STO) Management Software* — https://www.prometheusgroup.com/solutions/shutdown-turnaround-and-outage
- IAMTech — *Shutdown Turnaround Outage Software* — https://www.iamtech.com/america/products/shutdown-turnaround-outage-software
- EZTRAK — *Turnaround Planning* — https://eztraksoftware.com/turnaround-planning-new/
- Fabrico — *7 Best Shutdown & Turnaround Management Software Tools (2026)* — https://www.fabrico.io/blog/best-shutdown-turnaround-software/
- Deltek — *Acumen Fuse: Project Schedule Analysis Software* (600+ metrics; S1–S5) — https://www.deltek.com/products/delivery-assurance/ppm/acumen/fuse/
- Ten Six — *Deltek Acumen Fuse and the DCMA's 14-Point Assessment* — https://tensix.com/deltek-acumen-fuse-and-the-dcmas-14-point-assessment/
- Ten Six — *P6 Professional Export Formats* — https://tensix.com/p6-professional-export-formats/
- ScheduleReader — *How to Open XER File* — https://www.schedulereader.com/how-to-open-xer-file/
- XER Schedule Toolkit — *Oil & Gas Project Controls Software* — https://xertoolkit.com/industries/oil-gas/
- nPlan — https://www.nplan.io/
- CB Insights — *Nodes & Links alternatives & competitors* — https://www.cbinsights.com/company/nodes-links/alternatives-competitors

**Standaarden, review en compliance**
- Capital Edge Consulting — *EVMS Compliance* (32 richtlijnen, vijf procesgebieden, USD 20 mln / USD 50 mln drempels) — https://capitaledgeconsulting.com/capabilities/dfars-business-systems/evms-compliance/
- Pinnacle Management — *The DCMA 14-Point Schedule Assessment* (DCMA-EA PAM 200.1, 2012; ontkoppeling van EVM) — https://www.pinnaclemanagement.com/training/the-dcma-14-point-schedule-assessment
- Pinnacle Management — *EIA-748 and the EVMS Validation Process* — https://www.pinnaclemanagement.com/training/earned-value-management-eia-748-and-the-evms-validation-process
- EDW/PS — *DCMA 14-Point Assessment for Project Schedule* (PDF) — https://edwps.com/wp-content/uploads/2016/03/DCMA-14-point.pdf
- DCMA — *Business Practice 0: Earned Value Management Systems* (rev. 12 sep 2025) — https://www.dcma.mil/Portals/31/Documents/EVMS/Business%20Practice%20Docs/Business%20Practice%200%20-%20Earned%20Value%20Management%20Systems%20(REV%2012SEP2025).pdf
- ScheduleLens — *Primavera P6 Schedule Review: The Complete Checklist* (12-stappenprotocol; gevolgen niet-conforme indiening) — https://schedulelens.com/blog/primavera-p6-schedule-review/
- NEC Planning Solutions — *Primavera P6 for NEC Programmes* (NEC mandateert P6 niet; de scope wel) — https://www.necplanningsolutions.co.uk/post/primavera-p6-for-nec-programmes
- Ankura — *Harmonizing SCL D&D2 and AACE 29R-03* — https://ankura.com/insights/harmonizing-scl-dd2-and-aace-29r-03-complementary-frameworks-for-forensic-delay-analysis-in-international-arbitration
- Ankura — *Overview: Complementary Frameworks for Forensic Delay Analysis in International Arbitration* — https://ankura.com/insights/overview-complementary-frameworks-for-forensic-delay-analysis-in-international-arbitration
- AACE — *Professional Certifications* — https://web.aacei.org/certification/certification-information/certifications-offered/professional-certifications
- Elite International Training — *CCP-examenkosten (USD 450 / 575)* — https://eliteinternationaltraining.com/certified-cost-professional-ccp
- Wikipedia — *AACE International* (>8.000 leden per 2012; ~120 RPs) — https://en.wikipedia.org/wiki/AACE_International
- USPI — *CFIHOS Purpose* — https://uspi.nl/index.php/cfihos-purpose
- Revisionz — *Bridging Information Gaps in Process Industries: ISO 15926 and CFIHOS* — https://revisionz.com/bridging-information-gaps-in-process-industries-the-synergy-of-iso-15926-and-cfihos/
- 15926.blog — *ISO 15926 consolidating paper* (2024, PDF) — https://15926.blog/ISO15926-consolidating-paper-20240714.pdf
- THTH / Onno Paap — *ISO 15926 & CFIHOS* (presentatie, PDF) — https://www.ththry.org/assets/activities/2020/ISO15926engineers_OnnoPaap_20200324.pdf
- Pathnovo — *CFIHOS 2.0 Standard: 2026 Explainer* — https://pathnovo.com/standards/cfihos

**Integratie**
- Oracle — *Integrating Oracle Primavera P6 and SAP* — https://www.oracle.com/construction-engineering/integrating-oracle-primavera-p6-and-sap/
- SAP Community — *SAP PS and Primavera Integration using SAP EPC* — https://community.sap.com/t5/enterprise-resource-planning-q-a/sap-ps-and-primavera-integration-using-sap-epc/qaq-p/8661564
- SAP Community — *SAP PS and Primavera integration* (EPC obsoleet, migratie naar CPI) — https://community.sap.com/t5/enterprise-resource-planning-q-a/sap-ps-and-primavera-integration/qaq-p/14298251
- SAP Help — *Installation Guide: SAP Enterprise Project Connection* — https://help.sap.com/doc/2e6dcbb3099f4e1d89375e0da15fd959/3.0.01/en-US/loio12ae7aa6a4c045a080e4bc9f4f698941_12ae7aa6a4c045a080e4bc9f4f698941.pdf

**Gebruikersoordeel en alternatieven**
- ITQlick — *Primavera P6 Reviews* (user sentiment 84, 371 reviews) — https://www.itqlick.com/primavera-p6
- SelectHub — *Top Primavera P6 Alternatives & Competitors* — https://www.selecthub.com/ppm-software/primavera-p6/alternatives/
- Planera — *Top 10 Primavera P6 Alternatives* — https://www.planera.io/post/primavera-p6-alternatives
- Gartner Peer Insights — *Primavera P6 EPPM alternatives* — https://www.gartner.com/reviews/product/primavera-p6-enterprise-project-portfolio-management/alternatives

**Arbeidsmarkt**
- ZipRecruiter — *Project Controls Scheduler* (USD 46–72/uur) — https://www.ziprecruiter.com/Jobs/Project-Controls-Scheduler
- Bridges Consulting — *Project Schedulers: Exclusive Demand Boom* (<2.000 gecertificeerde P&S-professionals; USD 60–100k/jaar) — https://bridgesconsultinc.com/project-schedulers-exclusive-demand-boom-best-careers/

**Sectorpraktijk**
- Planning Planet — *Saudi Aramco project controls* — http://www.planningplanet.com/taxonomy/term/969
- RKS Trainings — *Primavera P6 Training for EPC Projects* — https://rkstrainings.com/primavera-training/
- Consult Leopard — *The Importance of Primavera P6 in Construction* — https://consultleopard.com/importance-of-primavera-p6-in-construction/

---

---

## Verificatie

**Datum:** 25 juli 2026 · **Methode:** adversariële fact-check — elke bewering actief proberen te weerleggen met directe bronraadpleging (WebSearch-budget was uitgeput, dus uitsluitend WebFetch + lokale PDF-extractie met `pypdf`). Doorgerekende schattingen zijn met de hand nagerekend. Bronnen die HTTP 403 gaven zijn als zodanig gemarkeerd; "onzeker" betekent hier *niet weerlegd maar ook niet gestaafd*.

### Bevestigd

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 1 | Oracle-lijstprijzen 2016: P6 EPPM 2.750/605, P6 Professional 2.500/550, PRA 9.500/2.090, EVM 10.000/2.200, Unifier PC 3.950/869 (min 25), Data Warehouse 25.000/5.500 per processor, Gateway 20.000/4.400 (min 5), UPK-modules 35.000–70.000 | **Bevestigd** — alle 14 regels van de tabel in §3.1 komen exact overeen met de PDF (lokaal uitgelezen). Ook de termijnpercentages (20/35/50/60/70%) en "support = 22% van de perpetual lijstprijs, termijnpercentages niet toegepast" staan er letterlijk. Ook de cloudregels (P6 EPPM USD 125 min 25, Progress Reporter 12, Unifier PC 150, Analytics 90, Prime Projects 150, Prime Portfolios 125) kloppen. Nuance: het document is Oracle's prijslijst *voor Texas DIR* (DIR-TSO-2539), niet een universele publicatie | [oracle.com PDF](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf) |
| 2 | G-Cloud 14: P6 EPPM Cloud £220/maand (min 25), UK Gov £439 (min 50), Unifier UK Gov £459, NEC4-variant £539, non-productieomgeving £7.188, volumekortingen 10/15/20/25% | **Bevestigd** — letterlijk in het PDF-prijsdocument (lokaal uitgelezen). De omrekening £2.640/jaar ≈ USD 3.350–3.400 klopt bij koersen van 1,27–1,29 | [G-Cloud 14 PDF](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf) |
| 3 | Oracle Primavera Cloud: Progress USD 144, Task Management 660, **Scheduling 1.320**, Portfolio Planning 2.640 per gebruiker per jaar, bijgewerkt 25-06-2026 | **Bevestigd**, exact | [FindPM](https://findpmsoftware.com/products/primavera-cloud) |
| 4 | USACE-contract: totaal USD 24.480.375, initiële verplichting USD 4.896.075, Affigent LLC, W912HQ25F0051, 18-02-2025 t/m 17-02-2030, 4 inschrijvers → ≈ USD 4,9 mln/jaar | **Bevestigd**, alle velden exact; 24.480.375 / 5 = 4.896.075 klopt tot op de dollar | [OrangeSlices](https://orangeslices.ai/contract-award-24-5m-us-army-corps-of-engineers-usace-promis-program-office-oracle-primavera-software-licenses/) |
| 5 | 6sense: Primavera Suite 20,05% / 7.474 klanten (#2), Teamwork 48,07% / 17.916, SAP PS 6,48% / 2.416, MS PPM 5,77% / 2.150 | **Bevestigd**, exact | [6sense](https://6sense.com/tech/project-management/oracle-primavera-suite-market-share) |
| 6 | EY-megaprojectcijfers: 365 projecten, USD 2,6 bln, segmenttabel (1.080/163/6,6 — 539/50/10,8 — 348/46/7,6 — 607/106/5,7), 205 projecten met kostendata, +59% t.o.v. initiële raming, USD 1,2 → 1,7 bln (+500 mrd), 20 grootste post-FID: 65% overschrijding met gemiddeld 23% escalatie, IPA 2011: 78% vs. 50% in 2003, regionale tabel (NA 58/55/51, LatAm 57/71/102, Europa 53/74/57, Afrika 67/82/51, ME 89/87/68, APAC 68/80/57) | **Bevestigd** — PDF lokaal geëxtraheerd en de subset-fontcodering ontcijferd; alle genoemde waarden komen exact terug. Ook de kop 64%/73% is bevestigd (de figuurfont is één positie verschoven t.o.v. de bodyfont; die verschuiving is onafhankelijk geverifieerd via "Sixty-five percent … 35% on budget") | [EY PDF](https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf) |
| 7 | Mordor: PM-softwaremarkt USD 9,76 mrd (2025) → 11,27 (2026) → 23,09 (2031), CAGR 15,42%, cloud 74,20%, grote ondernemingen 60,35%, jaarabonnementen 52,75%, NA 36,12% | **Bevestigd**, exact. De kruischeck 3–5% × 9,76 = 0,29–0,49 mrd klopt rekenkundig | [Mordor](https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market) |
| 8 | DCMA 14-punten met drempels: 5% logic/lags/hard constraints/high float/high duration/missed tasks, ≥90% FS, 0% leads/negative float/invalid dates, 44 werkdagen, CPLI/BEI = 1,00 | **Bevestigd** (het getal 600 dagen voor de critical-path-test staat niet in deze bron maar is de gangbare praktijkwaarde) | [Deltek](https://www.deltek.com/en/resources/articles/dcma-14-point-assessment) |
| 9 | PlanXER USD 39/99/249 per maand + het motief ("expensive P6 licences, manual schedule checks, clunky Excel workarounds") | **Bevestigd**, letterlijk | [PlanXER](https://planxer.pro/) |
| 10 | Liquidated damages USD 50.000–500.000 per dag in EPC-contracten | **Bevestigd** dat de bron dit zegt. Kanttekening: leveranciersblog, en het uitgewerkte voorbeeld is een zonneproject, geen LNG-trein — het is geen sectorbrede meting | [Giga Energy](https://www.gigaenergy.com/blog/avoid-liquidated-damages) |
| 11 | Archdesk-benchmarks: Oracle Primavera Cloud vanaf USD 120/gebruiker/maand, mid-market USD 15.000–60.000/jaar, enterprise >USD 100.000 first-year, 1 van 13 pakketten met transparante prijs, Oracle-uitrol ~6 maanden, CMiC "years" | **Bevestigd**, exact | [Archdesk](https://archdesk.com/blog/top-epc-project-control-software-2026) |
| 12 | Public Citizen LNG-overschrijdingen: Altamira 1,3 → 3,5 mrd (+169%), Woodfibre 5,1 → 8,0 (+57%), Cedar 4,0 → 5,9 (+48%), Plaquemines +2,35 mrd; gemiddelden 59,7% (operationeel) en 38,1% (in aanbouw); EY: LNG gemiddeld 70% over budget | **Bevestigd**. Toevoeging uit de bron: Golden Pass 9,25 → 11,6 mrd (+25%). Woodfibre en Cedar zijn daar geclassificeerd als *in aanbouw*, wat het rapport niet vermeldt | [Public Citizen](https://www.citizen.org/article/billions-over-budget-lng-infrastructure/) |
| 13 | Safran/Statoil-case: 3 platforms, Tampen Link 23,1 km, ~3 mln offshore + 3 mln engineering manuren, 18.000 desktops, >5.000 gebruikers binnen enkele maanden | **Bevestigd** | [Safran](https://www.safran.com/case-studies/statoil) |
| 14 | AACE ">8.000 leden" (per 2012) en ~120 Recommended Practices | **Bevestigd**, inclusief de waarschuwing dat het cijfer uit 2012 stamt | [Wikipedia](https://en.wikipedia.org/wiki/AACE_International) |
| 15 | Verified Market Reports: "Oil and Gas PM Software Market" USD 7,7 mrd (2026) → 18,5 mrd (2034), CAGR 11,5% | **Bevestigd dat de bron dit zegt**; het rapport markeert het terecht al als [ZWAKKE BRON — NIET GEBRUIKEN ALS ANKER] | [VMR](https://www.verifiedmarketreports.com/product/oil-and-gas-project-management-software-market/) |
| 16 | Sumble telt 66.785 organisaties met Primavera P6 | **Bevestigd** (66,8k). Zie echter correctie #3 hieronder over hoe dit cijfer wordt gebruikt | [Sumble](https://sumble.com/tech/primavera-p6) |

### Gecorrigeerd

| # | Bewering | Correctie | Bron |
|---|---|---|---|
| 1 | **Route 3 (capex-per-planner) "convergeert" met de andere routes** — pure planningssoftware USD 0,20–0,45 mrd, incl. kostenlaag 0,9–1,7 mrd, totaal 1,6–3,1 mrd | **Rekenfout, niet reproduceerbaar.** 35.000–95.000 planners × USD 900–1.800 = **USD 0,03–0,17 mrd** (gepubliceerde regel is 2,6–6,3× te hoog). 150.000–280.000 controls-seats × USD 1.600–3.000 = 0,24–0,84 mrd, met planningslaag **0,27–1,01 mrd** (bovengrens 1,7 mrd is 2× te hoog). Je haalt de gepubliceerde regels alleen door dezelfde seats twee keer te prijzen. De claim "drie onafhankelijke routes convergeren" wordt hierdoor **weerlegd**: routes 1 en 3 verschillen een factor 4–10 op de licentielaag | eigen narekening, ingevoegd bij §A4.2 |
| 2 | **Totaal segmentuitgaven "≈ USD 1–5 miljard per jaar"** (§4.2) | De eigen tabel sommeert tot **USD 0,81–5,79 mrd**. De gepubliceerde band is aan de onderkant 23% te hoog en aan de bovenkant 14% te laag; het subtotaal "0,35–1,6" hoort 0,33–1,66 te zijn. Regelsgewijs klopt de aritmetiek wél | eigen narekening |
| 3 | **P6 : overige planningsproducten ≈ 15:1** (§A2.1) | De acht overige rijen sommeren tot 6.330 → **10,6 : 1**. Zonder de Unifier-dubbeltelling en de niet-planningsproducten: 13,4 : 1. De 15:1 is een greep uit een reeks van 10–19:1 afhankelijk van de selectie. Bovendien: het rapport gebruikt 6sense (7.474 organisaties) voor de omvangsraming en Sumble (66.785) voor de dominantieclaim — een **factor 8,9** die nergens wordt verzoend; met Sumble zou de seat-raming 1,7–2,7 miljoen zijn | [Sumble](https://sumble.com/tech/primavera-p6) + [6sense](https://6sense.com/tech/project-management/oracle-primavera-suite-market-share) |
| 4 | **Aandeel industriële EPC = 70.000–135.000 seats** (§4.2 stap 2) | 35% van 190.000 = **66.500**, niet 70.000. Kleine, maar eenzijdig naar boven gerichte afronding | eigen narekening |
| 5 | **EY-segmenttabel in het addendum** (LNG 67/79, Pijpleiding 62/78, Raffinage 65/70, Upstream 68/69) | De ontcijferde PDF geeft voor kostenoverschrijding de reeks **{62, 64, 65, 67}** — 68% komt daar niet in voor en 64% ontbreekt in de tabel. De waarden 70% en 69% horen bij de rij *gemiddelde budgetoverschrijding* {41, 53, 69, 70}, niet bij vertraging {50, 68, 78, 79}. §1.6 van het hoofdrapport ("62–67%") is wél correct en spreekt de addendumtabel tegen | [EY PDF](https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf) |
| 6 | **nPlan: 750.000 projecten, USD 2,5 biljoen, USD 16 mln opgehaald** | De site zegt 750.000 **schema's** en **">$2Tn"** bouwuitgaven (plus USD 500 mrd onder actief beheer). USD 2,5 biljoen is te hoog; "projecten" moet "schema's" zijn. Het bedrag van USD 16 mln staat nergens op de site en is onbevestigd | [nPlan](https://www.nplan.io/) |
| 7 | **"Oracle Primavera Cloud and Hexagon EcoSys typically start at USD 80.000 to 150.000 per year for enterprise licences covering 50+ named users"** (§A3.1) | Dit citaat staat **niet** op de opgegeven Verified Market Reports-pagina en evenmin op de Archdesk-pagina. Bovendien is delen door precies 50 bij "50+ users" een bovengrens, geen bandbreedte — de geclaimde "convergentie" met ITQlick is een artefact van de deler. Regel A8 "Prijzen kostenlaag: **Verhard**" moet terug naar *onzeker* | [VMR](https://www.verifiedmarketreports.com/product/oil-and-gas-project-management-software-market/), [Archdesk](https://archdesk.com/blog/top-epc-project-control-software-2026) |
| 8 | **Safran: "over 90% of the larger project players" in de Nordics** | Staat niet op de opgegeven about-pagina. Oprichting 1997 en de olie-en-gasherkomst staan er wél. Behandel het 90%-cijfer als onbevestigde marketingclaim | [Safran](https://www.safran.com/en-gb/about) |

### Onzeker

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 1 | Arcadis: gemiddelde geschilwaarde USD 42 mln wereldwijd, USD 60,1 mln in Noord-Amerika, 12,5 maanden | **Niet gestaafd.** De CMAA-PDF is volledig uitgelezen en bevat geen enkel bedrag — het is een kwalitatief artikel. De Arcadis-hoofdpagina toont nog de 2022-editie. De LinkedIn-bron is niet toegankelijk. De cijfers zijn plausibel maar niet verifieerbaar, en ze dragen wel de argumentatie in §3.6 en §7.2 | [CMAA PDF](https://www.cmaanet.org/sites/default/files/resource/State%20of%20Construction_0.pdf), [Arcadis](https://www.arcadis.com/en/knowledge-hub/perspectives/global/global-construction-disputes-report) |
| 2 | Saudi Aramco SAEP-331 definieert zeven schemaniveaus met P6 als verplicht platform | **Niet gestaafd.** De Kazinex-bron zegt alleen dat SAEP-procedures voorschrijven "how programmes are structured, coded, and progressed" — geen zeven niveaus, geen P6-verplichting. Scribd is niet machinaal verifieerbaar. Dit is de enige concrete onderbouwing van de centrale stelling "P6 is contractueel voorgeschreven"; §A1.4 nuanceert die stelling zelf al terecht (NEC/FIDIC schrijven geen software voor) | [Kazinex](https://docs.kazinex.com/blog/aramco-saep-schedule-quality-check) |
| 3 | IEA: olieproductie-investering USD 535 mrd (2025) tegen USD 599 mrd (2024) = –6% | **Rekenkundig inconsistent** (599 → 535 = –10,7%). Zowel iea.org als energyvoice.com gaven HTTP 403 bij hercontrole, dus welk van de drie getallen fout is, is niet vast te stellen. De aanpalende cijfers (USD 3,3 bln totale energie-investering; upstream olie & gas net onder USD 570 mrd) zijn zelf niet direct herverifieerd — alleen indirect via de titel van het S&P-artikel | [IEA](https://www.iea.org/reports/world-energy-investment-2025/executive-summary) (403) |
| 4 | ENR Top 250: USD 499,7 mrd (hoofdrapport) vs. USD 501,2 mrd (addendum) | **Onzeker maar zelf al gemarkeerd.** Beide ENR-bronnen zijn 403/paywalled; het addendum lost het correct op met "gebruik USD ~500 mrd". Geen verdere actie nodig | [ENR](https://www.enr.com/articles/61229-2025-enr-top-250-international-contractors-market-volatility-flatlines-gains) (403) |
| 5 | DOE O 413.3B: EVMS verplicht boven USD 50 mln Total Project Cost | **Deels bevestigd, onvolledig.** De LBNL-bron bevestigt de USD 50 mln-drempel ("after CD-2 is approved, earned value reporting shall apply"), maar noemt géén aparte drempel voor *gecertificeerd* EVMS (in de praktijk ≥ USD 100 mln). §A5.1 signaleert de 50/100-spanning wel voor DFARS, maar niet voor DOE | [LBNL](https://sites.google.com/lbl.gov/lbnlprojectmanagementframework/home/applicability) |
| 6 | Aandeel P6 binnen industriële EPC = 75–90%; groei 4–7% per jaar; kostenlaag ~40% van het segment | **Onzeker, en zo gemarkeerd in het rapport.** Geen enkele publieke bron kwantificeert dit. De onderbouwing rust op de 15:1-verhouding (zie correctie #3, in werkelijkheid 10,6:1) en op de SAEP-331-claim (zie onzeker #2) — beide zijn bij verificatie verzwakt. De 75–90% blijft een verdedigbare gevolgtrekking, maar met **minder** steun dan het rapport suggereert | — |
| 7 | IFC 4.3 / ISO 16739-1:2024 dekt geen procesinstallaties | **Niet weerlegd; iso.org gaf 403.** De scope (gebouwen + bruggen, wegen, spoor, waterwegen, havens) is algemeen bekend en de conclusie — geen domein voor procesapparatuur, P&ID-piping, instrumentatieloops of tag-gebaseerde asset-registers — is inhoudelijk juist. Dit is de belangrijkste strategische bevinding van het rapport en verdient bij gelegenheid een primaire bronbevestiging | [ISO](https://www.iso.org/standard/84123.html) (403) |

### Samenvattend oordeel

De **harde, primaire lagen van dit rapport houden stand**: alle Oracle-prijsdata (twee onafhankelijke primaire documenten, regel voor regel), de USACE-aanbesteding tot op de dollar, de EY-megaprojectstatistiek (inclusief de regionale uitsplitsing, na ontcijfering van de PDF-fontcodering), de DCMA-14-drempels, de firmografische tellingen en de gepubliceerde prijzen van PlanXER en Archdesk. Dat is een ongewoon degelijke feitenbasis.

De **kwantitatieve segmentraming is aanzienlijk zwakker dan gepresenteerd**. De drie "onafhankelijke convergerende routes" convergeren niet: route 3 is niet reproduceerbaar uit zijn eigen stappen en levert, correct doorgerekend, een uitkomst die vier tot tien keer lager ligt dan route 1. Daar bovenop staat een onverzoende factor-9 tussen de twee firmografische bronnen. De strategische conclusies van het rapport (P6 domineert; de aanval moet op de randen van de keten; IFC landt hier niet) worden hierdoor **niet** ondergraven — die rusten op kwalitatief bewijs dat wel standhoudt. Wat wél moet vervallen is de suggestie van precisie in de omvangsschatting: **USD 0,1–1,7 miljard licenties, orde van grootte één miljard, is wat de onderbouwing draagt** — niet "centraal USD 0,7–1,0 miljard".

---

**Methodologische opmerking bij het addendum:** deze tweede ronde gebruikte 20 WebSearch-opdrachten en circa 20 WebFetch-aanroepen op leveranciers-, norm-, analisten- en vakpersbronnen. De officiële Oracle-prijslijst en het EY-rapport zijn lokaal met `pdfminer.six` uit de PDF geëxtraheerd omdat de fetch-laag ze niet kon parsen. Enkele bronnen (ENR-artikel, ENR-surveyPDF, ITQlick-detailpagina) gaven HTTP 403 op geautomatiseerde toegang; de betreffende cijfers komen in die gevallen uit de zoekresultaat-samenvatting en zijn als zodanig te behandelen. De cijfers in dit addendum zijn steeds gemarkeerd met hun herkomst; eigen berekeningen staan als **[SCHATTING]** met de redenering erbij.
