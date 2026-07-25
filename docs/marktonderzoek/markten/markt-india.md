# Markt voor projectplanning- en schedulingsoftware in India

**Regio:** Zuid-Azië · **Peildatum onderzoek:** 25 juli 2026
**Wisselkoers gehanteerd:** 1 USD = ₹93 (gemiddelde 2026 volgens ValutaFX; piek 23 juli 2026 was ₹96,88). Alle USD-omrekeningen in dit rapport zijn op ₹93 gebaseerd en zijn afgerond.
**Bron wisselkoers:** ValutaFX / Exchange-rates.org, via <https://search.yahoo.com/search?p=USD+to+INR+exchange+rate+July+2026+rupee+dollar>

**Legenda bij cijfers:**
- 🟩 = direct uit een genoemde bron overgenomen
- 🟨 = **[SCHATTING]** — eigen berekening/afleiding, redenering staat erbij
- 🟥 = **[ONZEKER]** — bron is zwak, tegenstrijdig of niet onafhankelijk verifieerbaar; niet gebruiken zonder controle

---

## 1. Samenvatting

India is qua *aantal planners* waarschijnlijk een van de grootste markten ter wereld voor CPM-planningssoftware, en qua *softwareomzet* een van de kleinste per hoofd. Dat is de centrale spanning in deze markt en het bepaalt vrijwel alles.

**Tien kernbevindingen:**

1. **Oracle Primavera P6 is de onbetwiste standaard voor grote infrastructuur en EPC.** Vacatures bij L&T, Tata Projects en Afcons noemen P6 standaard; op Naukri staan ~571–573 openstaande "Planning Engineer Primavera P6"-vacatures en op LinkedIn India ~817 P6-vacatures op een willekeurig moment. Microsoft Project is de nummer twee, dominant bij gebouwen, vastgoed en PMC-werk. Bron: <https://www.naukri.com/p6-jobs-in-india>, <https://in.linkedin.com/jobs/primavera-p6-jobs>

2. **De echte nummer één in aantallen is Excel — en WhatsApp.** Meerdere Indiase bronnen beschrijven de sector als "runs on WhatsApp and Excel": voortgang in een WhatsApp-groep, budget in Excel, aanwezigheid in een papieren register, inkooporders per telefoon. Dit is geen anekdote maar de expliciete positionering waartegen vrijwel elke Indiase softwareleverancier verkoopt. Bron: <https://medium.com/@sumeetsomraj/indias-construction-industry-runs-on-whatsapp-and-excel-7e8d26728fdd>, <https://onsiteteams.com/why-excel-whatsapp-are-not-enough-for-construction-project-tracking/>

3. **Er bestaat een expliciete Indiase norm voor CPM-planning die westerse bronnen nooit noemen: IS 15883 (Part 2) : 2013 "Construction Project Management — Guidelines, Part 2 Time Management"** (BIS, herbevestigd 2023). Die schrijft letterlijk de precedence-diagram-methode / activity-on-node voor, en eist als deliverables: early start/finish, late start/finish, total float én free float per activiteit, kritieke activiteiten en het kritieke pad, en de berekende projectduur. Dat is exact de outputset van een CPM-solver. Bron: <https://archive.org/details/gov.in.is.15883.2.2013>, tekst geverifieerd uit <https://www.cracindia.in/admin/uploads/IS-15883---2.pdf>

4. **De prijsniveaus lopen extreem uiteen — factor 100 tussen top en bodem.** Een Primavera P6 EPPM-licentie wordt door Indiase resellers op IndiaMART aangeboden voor ₹2,49.570–₹2,84.000 (~$2.680–$3.054) per unit, terwijl Zoho Projects Premium ₹350/gebruiker/maand kost (~$3,76) en de lokale app Onsite ₹12.000/gebruiker/jaar (~$129). Een freelance P6-planner wordt op Freelancer.com voor ₹100–400/uur (~$1,08–$4,30) gezocht.

5. **Zoho is de serieuze lokale speler, maar niet als CPM-tool.** Zoho Corporation haalde in FY25 ₹12.313 crore omzet (~$1,32 mld) — het eerste bootstrapped Indiase bedrijf boven ₹12.000 crore. Zoho Projects heeft Gantt in álle plannen, maar **kritiek pad, baselines en resource-utilisatie zitten pas in Enterprise** — een cruciaal detail voor de positionering van een CPM-tool.

6. **De Indiase "lokale pakketten" zijn geen planningssoftware maar bouw-ERP's.** Powerplay, Onsite Teams, Tactive, NWAY, StrategicERP, In4Suite, Farvision, Highrise, RDash, NYGGS, Site Setu, Yojo — allemaal Indiaas, allemaal sterk op RA-bills, GST, materiaal, arbeidsaanwezigheid en DPR's, en **allemaal zwak of afwezig op echte CPM/netwerkplanning**. Dat is de meest exploiteerbare gat in deze markt.

7. **De overheid koopt Primavera aan via aanbesteding — er lopen 65 Oracle-Primavera-tenders in India (2026)**, met opdrachtwaarden van ₹24,47 lakh tot ₹1,99 crore (~$26.300–$214.000), van PSU's, PWD's, energiebedrijven, waterschappen en defensie. Bron: <https://www.tenderdetail.com/Indian-tender/oracle-primavera-tenders>

8. **Er is een expliciet Indiaas overheidsbeleid dat open source de voorkeur geeft**: de "Policy on Adoption of Open Source Software for Government of India" (MeitY, 2015) stelt dat OSS "as a preferred option in comparison to Closed Source Software" moet worden gebruikt in alle e-governance-systemen. Dat is een reëel commercieel aanknopingspunt voor een LGPL-tool. Bron: <https://www.meity.gov.in/static/uploads/2024/03/Policy-Document.pdf>, <https://india.gov.in/policy-adoption-open-source-software-government-india>

9. **Informele licenties zijn structureel, niet marginaal.** India is volgens Revenera's Monetization Monitor 2025 de **derde meest getroffen markt ter wereld** voor onrechtmatig softwaregebruik, na China en Rusland. De laatste harde BSA-meting (2015) zette India op 58% niet-gelicentieerde installaties. Handhaving loopt via civiele zaken bij de Delhi High Court (Autodesk, Microsoft, Adobe, Dassault).

10. **De offshore-planningsindustrie is een aparte markt met een eigen economie.** Indiase planners werken massaal voor westerse klanten in P6 — maar vaak op *seats van de klant*. De licentie-omzet wordt dan buiten India geboekt, terwijl het gebruik in India plaatsvindt. Dit vertekent elke marktomvangschatting die op seats-in-India is gebaseerd, en verklaart waarom India's planner-populatie veel groter is dan zijn softwaremarkt.

**Wat dit betekent voor een open-source CPM-tool (Open Planner Studio-achtig):** de markt heeft precies de vorm waarin gratis-en-goed wint. Er is een enorme, technisch competente planner-populatie; een norm (IS 15883-2) die exact CPM-output eist; een overheidsbeleid dat OSS voorschrijft; prijsgevoeligheid die commerciële CPM-tools uit het MKB houdt; en een lokaal ERP-landschap dat CPM juist *niet* levert. De grootste barrières zijn niet prijs maar (a) P6-XER/XML-interoperabiliteit als de facto toegangseis, (b) het feit dat de betalende laag al bij Oracle zit, en (c) de vraag of iemand voor gratis software wil betalen voor support in een markt waar training via gratis Hindi-YouTube gaat.

---

## 2. Marktomvang

### 2.1 Macro-context: waarom deze markt groot is

| Cijfer | Waarde | Jaar | Bron |
|---|---|---|---|
| 🟩 Indiase bouwmarkt | $1,21 biljoen — derde grootste ter wereld | 2025 | Via <https://html.duckduckgo.com/html/?q=India+construction+industry+size+GDP+2025> (GlobalData/Construction Week-aggregatie) |
| 🟩 Idem, projectie | $2,13 biljoen | 2030 | idem, 12,1% CAGR |
| 🟩 Idem in INR | ₹25,31 biljoen, +11,2% j-o-j | 2025 | idem |
| 🟩 Werkgelegenheid bouw | ~71 miljoen (7,1 crore); 81% ongeschoold | ~2024 | <https://economictimes.indiatimes.com/industry/indl-goods/svs/construction/> |
| 🟩 Positie als werkgever | Tweede grootste na landbouw; 12,6% van totale werkgelegenheid | — | <https://worldmetrics.org/india-construction-industry-statistics/>, <https://constructionplacements.com/construction-jobs-outlook-india-2025-2030/> |
| 🟩 Lopende centrale infraprojecten (≥₹150 crore) | 1.987 projecten; herziene kosten ₹42,50 lakh crore vs. oorspronkelijk ₹37,09 lakh crore | juni 2026 | <https://economictimes.indiatimes.com/news/economy/infrastructure/infra-projects-see-rs-5-4-lakh-crore-cost-overrun-mospi/articleshow/131994331.cms> |
| 🟩 Kostenoverschrijding centrale infraprojecten | ₹5,4 lakh crore (~$58 mld) | juni 2026 | idem (MoSPI Flash Report) |
| 🟩 Aandeel projecten achter op schema | ~43% | 2025 | <https://www.thehindubusinessline.com/economy/indias-infrastructure-delays-cost-5-lakh-crore-finds-report/article69411380.ece> |
| 🟩 India GCC-sector (offshore delivery centres) | $64,6 mld omzet, 1,9 mln medewerkers, 1.700+ centra | FY2024 | <https://nasscom.in/knowledge-center/publications/india-gcc-landscape-report-5-year-journey> |
| 🟩 India engineering services outsourcing | $62,8 mld | 2025 | Via <https://search.yahoo.com/search?p=India+engineering+services+outsourcing+ER%26D+market+size> |

**Interpretatie:** 43% van de centrale infraprojecten loopt achter en er ligt ₹5,4 lakh crore aan kostenoverschrijding. Dat is de business case voor planningssoftware in één cijfer — en tegelijk het bewijs dat de bestaande planningsdiscipline niet werkt. Beide argumenten worden in Indiase verkooppitches gebruikt.

### 2.2 Softwaremarkt: de gepubliceerde cijfers (en waarom ze niet overeenkomen)

Er is **geen** analistenrapport dat specifiek "bouwplanning-/schedulingsoftware in India" meet. Wat er wél is, zijn vier verschillende scopes die door elkaar worden gehaald:

| Scope | Waarde | Jaar | Projectie | CAGR | Bron |
|---|---|---|---|---|---|
| 🟩 India **Project Portfolio Management** software (alle sectoren) | $326,3 mln | 2024 | $764,5 mln (2029) | 18,6% | <https://www.marketsandmarkets.com/Market-Reports/geography/project-portfolio-management-software-market/india> |
| 🟩 India **PPM** software (afwijkende meting) | $434,61 mln | 2024 | $1.155,0 mln (2035) | 9,2% | <https://www.marketresearchfuture.com/reports/india-project-portfolio-management-software-market-61338> |
| 🟩 India **Project Management** software | — | — | $1.166,5 mln (2030) | 22,1% | <https://www.grandviewresearch.com/horizon/outlook/project-management-software-market/india> |
| 🟩 India **Construction Management** software | $125,32 mln | 2024 | $213,97 mln (2032) | 8,44% | <https://www.databridgemarketresearch.com/nucleus/india-construction-management-software-market> |
| 🟩 India **Construction & Design** software (incl. CAD/BIM) | — | — | $1.259,9 mln (2030) | 14,3% | <https://www.grandviewresearch.com/horizon/outlook/construction-and-design-software-market/india> |
| 🟥 India **Construction Software** (breedste scope) | $2,85 mld | 2025 | $6,72 mld (2031) | 15,3% | <https://mobilityforesights.com/product/india-construction-software-market> |

**Beoordeling van deze cijfers:**

- De Mobility-Foresights-schatting van **$2,85 mld (2025)** is 23× de Data-Bridge-schatting voor construction management software in hetzelfde jaar. Beide claimen "construction software" te meten. 🟥 Ik beschouw de $2,85 mld als niet bruikbaar zonder de methodologie te zien; de scope lijkt CAD, BIM, asset management, veiligheid en documentbeheer mee te tellen, en waarschijnlijk ook diensten.
- De twee PPM-metingen ($326,3 mln vs. $434,61 mln voor hetzelfde jaar 2024) verschillen 33%. Dat is de normale spreiding in dit segment.
- 🟨 **[SCHATTING — eigen berekening]** Uit Grand View's $1.166,5 mln in 2030 bij 22,1% CAGR vanaf 2024 volgt een basisjaar 2024 van 1.166,5 / 1,221⁶ ≈ **$352 mln**. Dat ligt tussen de twee PPM-cijfers in en maakt de orde van grootte "India project management software ≈ $330–435 mln in 2024" redelijk robuust.
- Data Bridge noemt als leveranciers voor construction management software in India uitsluitend: Oracle, Intuit, Trimble, Sage, Procore. 🟥 Dat is een westerse lens: geen enkele van de tientallen Indiase bouw-ERP's staat erin, terwijl die in de praktijk het MKB bedienen. Behandel de $125,32 mln daarom als een ondergrens die de lokale laag mist.

### 2.3 Eigen schatting: hoe groot is de CPM/Gantt-niche werkelijk?

🟨 **[SCHATTING — volledige redenering hieronder]**

**Stap 1 — hoeveel planners zijn er?**

Waarneembare vraagsignalen (allemaal 🟩, gemeten juli 2026):
- Naukri: 573 "P6"-vacatures; 571 "Planning Engineer Primavera P6"-vacatures — <https://www.naukri.com/p6-jobs-in-india>, <https://www.naukri.com/planning-engineer-primavera-p6-jobs>
- LinkedIn India: 817 "Primavera P6"-vacatures; 380 "Planning Engineer Primavera P6 in India" — <https://in.linkedin.com/jobs/primavera-p6-jobs>
- Glassdoor India: 222–391 openstaande posities — <https://www.glassdoor.co.in/Job/india-planning-engineer-primavera-p6-jobs>

Deze lijsten overlappen. Ik neem aan dat er op enig moment **1.500–2.500 unieke openstaande planner-vacatures** zijn.

Afleiding naar populatie: bij een sectorverloop van ~15–20% per jaar en een gemiddelde vacature-openstand van ~1,5 maand geldt
`openstaande vacatures ≈ populatie × verloop × (openstand/12)` → `populatie ≈ 2.000 / (0,18 × 0,125) ≈ 89.000`.
Bij conservatievere aannames (verloop 25%, openstand 2 maanden) → `2.000 / (0,25 × 0,167) ≈ 48.000`.

→ 🟨 **Schatting: 40.000–90.000 mensen in India met een planning/scheduling-rol in bouw, infra, EPC en olie & gas.** Middenwaarde ~60.000. Kruiscontrole: bij 71 mln bouwwerkers waarvan 19% geschoold (~13,5 mln) en een georganiseerde sector die daar een fractie van is, komt 1 planner per 30–60 stafmedewerkers bij de grote aannemers plausibel uit op deze orde.

**Stap 2 — hoeveel daarvan zijn betaalde seats?**

Aftrek voor: (a) Excel-planners zonder CPM-tool, (b) informele/gekraakte installaties, (c) offshore-planners die op *klantseats* werken die buiten India worden gefactureerd.

🟨 **Schatting: 15.000–35.000 betaalde CPM-seats in India** (P6 + MS Project + niche gecombineerd). Dat impliceert dat slechts ~25–50% van de planners op een in India betaalde licentie werkt — consistent met de 58%-piraterijmeting en met de offshore-structuur.

**Stap 3 — blended prijs per seat per jaar**

Mix van: P6 Professional perpetual geamortiseerd over 5 jaar plus 22% support (~$700–900/jaar effectief), P6 EPPM Cloud met India-korting (~$400–900), MS Project 365 (~$100–350), MS Project perpetual geamortiseerd (~$110–220), niche-tools hoger.

🟨 **Schatting: blended $450–$800 per seat per jaar.**

**Stap 4 — uitkomst**

| Segment | Redenering | Omvang (2026) |
|---|---|---|
| 🟨 Zuivere bouw-CPM-tools (P6, MSP, TILOS, SYNCHRO, Asta, e.d.) | 15.000–35.000 seats × $450–800 | **$7–28 mln/jaar** |
| 🟨 Algemene PM/collab-tools ingezet voor bouw & vastgoed (Zoho, monday, Smartsheet, Asana, Wrike, ClickUp, Jira) | 150.000–400.000 seats × $50–150 | **$8–60 mln/jaar** |
| 🟨 Planning-/voortgangsmodules binnen Indiase bouw-ERP's | ~20–30% van een ~$125 mln construction-management-softwaremarkt | **$25–40 mln/jaar** |
| 🟨 **Totaal "planningsfunctionaliteit" in de Indiase bouw** | som, met overlapcorrectie | **≈ $45–110 mln/jaar** |
| 🟨 waarvan **echte CPM-engine-licenties** | de smalste definitie | **≈ $8–30 mln/jaar** |

**Belangrijkste caveat:** deze getallen meten *in India geboekte omzet*. De hoeveelheid P6-werk dat fysiek in India wordt gedaan is een veelvoud daarvan, omdat de seats van westerse en Golf-klanten zijn. Wie de markt op *gebruik* meet in plaats van op *omzet*, komt makkelijk 3–5× hoger uit.

### 2.4 Trainingsmarkt

🟨 **[SCHATTING]** De trainingsmarkt is voor Primavera vermoedelijk groter dan de licentiemarkt bij het MKB. CADD Centre alleen al opereert honderden centra in India; cursusprijzen liggen op ₹6.000–₹29.900. Bij bijvoorbeeld 20.000–40.000 cursisten per jaar over alle aanbieders à gemiddeld ₹12.000 komt dat op ₹24–48 crore (~$2,6–5,2 mln) per jaar — met de kanttekening dat dit een ruwe orde-van-grootte is en geen bron dit direct meet.

---

## 3. Gebruikte software: marktpositie, gebruikers en prijzen

### 3.0 Rangordetabel (eigen synthese)

🟨 **[SCHATTING — rangorde is mijn synthese uit vacaturedata, aanbestedingsdata, reviewvolumes en leveranciersaanwezigheid; er bestaat geen gepubliceerde marktaandeelmeting voor India]**

**A. Binnenlandse projecten**

| # | Pakket | Positie | Typische gebruiker |
|---|---|---|---|
| 1 | **MS Excel** (+ WhatsApp) | Feitelijke nr. 1 in aantallen | Vrijwel iedereen onder de grootste 200 aannemers |
| 2 | **Oracle Primavera P6** | Nr. 1 in de professionele laag; de facto standaard | L&T, Tata Projects, Afcons, NCC, HCC, PSU's, NHAI-consultants, metro's, refinery-EPC |
| 3 | **Microsoft Project** | Sterke nr. 2 | Gebouwen, vastgoedontwikkelaars, PMC's, kleinere aannemers, MKB |
| 4 | **Indiase bouw-ERP's** (Powerplay, Onsite, Tactive, NWAY, StrategicERP, In4Suite, Farvision, Highrise, RDash, NYGGS) | Groeiende laag; hoge stukaantallen, lage prijs | Ontwikkelaars, MKB-aannemers, interieur/fit-out |
| 5 | **Zoho Projects** | Sterke lokale generalist | MKB, IT-achtige PMO's, sommige vastgoedbedrijven |
| 6 | **Smartsheet / monday.com / Asana / Wrike / ClickUp / Jira** | Corporate PMO's, niet bouwspecifiek | GCC's, IT, corporate vastgoedafdelingen |
| 7 | **Trimble TILOS** | Echte niche, maar reëel aanwezig | Metro, spoor, snelwegen, pijpleidingen, tunnels |
| 8 | **Bentley SYNCHRO / Navisworks (4D)** | Beperkt, groeit met BIM-mandaten | Metro's, luchthavens, grote design-build |
| 9 | **ProjectLibre / GanttProject / OpenProject** | Marginaal maar reëel bij studenten en micro-aannemers | Onderwijs, ZZP, kostenvermijders |
| 10 | **Asta Powerproject, RIB Candy, Spider Project, Safran, Deltek, InEight, ALICE, Nodes & Links** | Vrijwel afwezig in India | Incidenteel via multinationale moeders |

**B. Internationale / export-EPC-projecten** (wezenlijk ander plaatje)

| # | Pakket | Positie |
|---|---|---|
| 1 | **Oracle Primavera P6** | Vrijwel altijd contractueel voorgeschreven; vaak klantseats |
| 2 | **Klant-gespecificeerde suites**: Oracle Aconex, Primavera Unifier, EcoSys, SAP PS | Voorgeschreven door de opdrachtgever |
| 3 | **Deltek Acumen Fuse** | Schedule-quality/DCMA 14-point checks bij Golf- en VS-klanten |
| 4 | **Safran Risk / Primavera Risk Analysis (Pertmaster)** | QSRA bij olie & gas |
| 5 | **MS Project** | Kleinere Europese klanten en niet-EPC-scope |

Het onderscheid is scherp: een Indiase planner die op een binnenlands woningbouwproject werkt gebruikt vaak Excel of MSP; dezelfde planner op een Aramco- of ADNOC-project werkt full-time in P6 met een 14-punts-DCMA-check erop.

---

### 3.1 Oracle Primavera P6 — de standaard

**Positie.** P6 is in India geen "een van de opties" maar de baseline-eis in functieomschrijvingen bij de grote aannemers. Vacatureteksten van L&T noemen "Proficient in Primavera P6, MS Project, and Excel-based reporting tools"; Tata Projects werft planning engineers met P6-ervaring in Mumbai, Ahmedabad en Chandigarh; Afcons idem.
Bron: <https://www.shine.com/job-search/primavera-p6-tata-projects-jobs>, <https://www.larsentoubro.com/careers>

**Overheidsvraag.** 🟩 65 actieve Oracle-Primavera-aanbestedingen in India in 2026, van o.a.:
- overheidsdepartementen in Delhi, Uttar Pradesh, Rajasthan, Tamil Nadu, Jammu & Kashmir
- PSU's/boards in Assam, West-Bengalen, Karnataka, Jharkhand
- energie- en watersector (Tamil Nadu, Haryana, J&K, Rajasthan)
- defensie (Delhi, Karnataka)
Gekochte items: P6 EPPM-licenties, P6 Team Member-licenties (perpetual én subscription), AMC/support, en Oracle-Primavera-training. Waargenomen opdrachtwaarden: **₹24,47 lakh – ₹1,99 crore** (~$26.300–$214.000).
Bron: <https://www.tenderdetail.com/Indian-tender/oracle-primavera-tenders>
Voorbeeld: Ministry of Power, gepubliceerd 18 juni 2026, "Primavera P6 Enterprise Project Portfolio Management Application User Per…", sluiting 1 juli 2026 — <https://tenderimpulse.com/government-tenders/india/custom-bid-for-services-primavera-p6-enterprise-project-portfolio-management-app-13403276>
Ook waterprojecten: RWGCL (Eastern Rajasthan Canal Project), referentie `RWGCL/09/2026-27_Primavera`, sluiting 7 juli 2026 — <https://gittigo.com/tender/detail/6a432d636b984235a13dfd31>

**Prijzen.**

| Item | Prijs | USD (@₹93) | Bron |
|---|---|---|---|
| 🟩 P6 EPPM, Indiase reseller-listing (Cynortex, New Delhi) | ₹2.84.000 /unit | ~$3.054 | <https://www.indiamart.com/proddetail/oracle-primavera-p6-eppm-22373801433.html> |
| 🟩 P6, idem, andere listing | ₹2.49.570 /stuk | ~$2.684 | <https://www.indiamart.com/proddetail/oracle-primavera-p6-21872336330.html> |
| 🟩 P6 EPPM basislicentie (internationaal) | ~US$2.750 per application user | ₹2,56 lakh | <https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models> |
| 🟩 P6 Professional perpetual (internationaal, geciteerd) | ~US$3.520 per user | ₹3,27 lakh | <https://oraclelicensingexperts.com/blog/oracle-primavera-p6-licensing/> |
| 🟩 P6 single-user, jaarlijks (schatting derde partij) | ~$2.500/jaar | ₹2,33 lakh | <https://www.itqlick.com/oracle-primavera-p6/pricing> |
| 🟩 Oracle Primavera Cloud (OPC) **Schedule**, min. 5 licenties | £950 /licentie/jaar | ~$1.270 / ₹1,18 lakh | Oracle-reseller-prijsdocument (th3rdcurve, UK G-Cloud 14, ingangsdatum 30 apr 2024) — <https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/710699/219564152717676-pricing-document-2024-05-03-1330.pdf> |
| 🟩 P6 EPPM Cloud Service | £358 (min. 1) tot £2.185 (min. 25) /licentie/jaar 🟥 tabel is dubbelzinnig over welke SKU welke prijs heeft | ~$479–$2.928 | idem |
| 🟩 OPC add-ons (Cost Controls, Capital Planning, Project Delivery Mgmt, Real Estate Mgmt, Facility Mgmt) | £7.549 /jaar per add-on | ~$10.100 | idem |
| 🟩 Primavera Unifier Facilities & Asset Mgmt (min. 25) | £1.311 /licentie/jaar | ~$1.755 | idem |
| 🟩 P6 cloud, marktnotering | ~$175/gebruiker/maand | ₹16.275/maand | via <https://contractorsandbuilders.com/pricing/oracle-primavera/> |
| 🟩 Oracle support/maintenance | ~22% van de licentiewaarde per jaar | — | via zoekresultaat Oracle Technology Global Price List |
| 🟩 GST bovenop softwarelicenties in India | 18% (SAC 998434) | — | <https://gstbillmaker.in/sac-code/998434-software-downloads/>, <https://www.indiafilings.com/learn/sac-code-gst-rate-it-services> |

**Belangrijke observatie over de prijsstelling:** Oracle publiceert **geen India-specifieke prijslijst**. De officiële Oracle-India-pagina bevat geen enkel prijscijfer en verwijst naar "contact sales". Bron: <https://www.oracle.com/in/construction-engineering/primavera-p6/>. Alle India-prijzen die je vindt zijn resellernoteringen. Dat betekent dat korting volledig onderhandeld is en dat een grote Indiase EPC bijna zeker fors onder de listing zit — hoe fors is niet publiek.

**Indiase Oracle-Primavera-resellers/partners (niet-uitputtend):**
- ImageGrafix Engineering Services Pvt Ltd — New Delhi & Chennai — <https://imagegrafix.in/oracle-primavera-partner-reseller-in-new-delhi-india/>
- Proventures India (Hyderabad) — licenties + implementatie + training + schedulingdiensten — <https://consulting.proventuresindia.com/product-licensing-primavera-p6-licensing/>
- Hyde Park Solutions — <https://www.hydeparksolutions.com/software/primavera-licensing/>
- Equiv Technologies (Chennai) — Primavera + Unifier — <https://www.equivtech.com.au/Oracle-Primavera-EPPM-Authorized-Reseller.html>
- Ogma (Oracle-partner India) — <https://ogma.in/solutions/oracle-partner-india>
- Cynortex (New Delhi) — via IndiaMART-listings hierboven

**Voordelen in de Indiase context:** contractueel geaccepteerd bij vrijwel elke grote opdrachtgever; XER is het uitwisselformaat waar iedereen op rekent; enorme lokale talentpool; onmisbaar voor export-EPC; overheids-AMC's zijn beschikbaar.
**Nadelen:** prijs is voor het MKB prohibitief (een P6-licentie kost ongeveer een half jaarsalaris van een junior planner — ₹2,5–2,8 lakh vs. gemiddeld ₹5,5 lakh/jaar); zware installatie/DB-eisen; steile leercurve; geen Indiase lokalisatie (geen Hindi-UI, geen lakh/crore-notatie, geen Indiase feestdagenkalender out-of-the-box); Oracle-licentie-audits zijn gevreesd.

---

### 3.2 Microsoft Project

**Positie.** Sterke nummer twee, en waarschijnlijk nummer één in *aantal* betaalde CPM-seats in India (buiten Excel), omdat het MKB en de vastgoedsector het gebruiken. Indiase vakbronnen positioneren MSP consequent als "beginner-friendly, low training" tegenover P6 als "steeper learning curve, moderate–high training", en MSP voor "small to medium construction projects" en "residential or commercial building works" tegenover P6 voor "large, complex, multi-year" infrastructuur en EPC.
Bron: <https://theciviledge.in/ms-project-vs-primavera/>

**Prijzen (officiële Microsoft India-pagina, in INR):**

| Product | Prijs | USD (@₹93) | Bron |
|---|---|---|---|
| 🟩 Project Standard 2024 (eenmalig, on-premises) | ₹51.399 | ~$553 | <https://www.microsoft.com/en-in/microsoft-365/project/compare-microsoft-project-management-software> |
| 🟩 Project Professional 2024 (eenmalig, on-premises) | ₹1.00.599 | ~$1.082 | idem |
| 🟩 Project Server Subscription Edition | prijs niet gepubliceerd ("find a partner") | — | idem |
| 🟥 Planner / Project Plan 1/3/5 (cloud) | INR-prijzen niet op de vergelijkingspagina; de aparte Planner-prijspagina gaf een 404 | — | <https://www.microsoft.com/en-in/microsoft-365/planner/microsoft-planner-pricing> (404 op 25-07-2026) |

**Voordelen in India:** relatief betaalbaar, veruit de laagste trainingsdrempel, iedereen kent de Office-UI, veel Indiase opdrachtgevers accepteren `.mpp` als programma-deliverable, en MSP is verreweg het meest gekraakte planningspakket in de markt.
**Nadelen:** wordt door grote EPC-opdrachtgevers vaak niet geaccepteerd als contractueel programma; zwakker multi-project/resource-pool; conversie naar P6 is lastig en verliest data.

---

### 3.3 Het onderscheid binnenland vs. export-EPC

Dit is het meest onderschatte kenmerk van de Indiase markt.

**Binnenlands.** Op een Indiaas woningbouw-, wegen- of gebouwenproject is het contractuele planningsvereiste in de praktijk vaak licht: een bar chart, een S-curve en een maandelijkse voortgangsrapportage. IS 15883-2 schrijft veel meer voor (zie §5.1), maar wordt niet consequent afgedwongen. Excel en MSP volstaan dan. Alleen bij metro's, snelwegen onder NHAI-contracten, luchthavens, raffinaderijen, kernenergie en grote PSU-projecten wordt P6 daadwerkelijk geëist.

**Export-EPC en offshore-diensten.** Zodra een Indiase entiteit werkt voor een klant in het Midden-Oosten, Afrika, Zuidoost-Azië, VK/EU of VS, kantelt het beeld volledig: P6 is verplicht, met XER-uitwisseling, DCMA-14-point-schedulechecks, klantspecifieke WBS-codering, en vaak Aconex of Unifier eromheen.

Indiase aanbieders van offshore-planningsdiensten (niet-uitputtend):
- Ebees Corp — "Project Management Consultancy in India and Offshore CAD, BIM & Primavera Scheduling Support globally" — <https://ebeescorp.com>
- Proventures India — <https://proventuresindia.com/service/scheduling-services-using-oracle-primavera-p6/>
- AMS India — <https://amsindia.co.in/primavera-project-scheduling-plan-track/>
- InfraMind EPC — "programme controls for EPC megaprojects" — <https://inframindepc.com/services/planning-scheduling>
- P3Wise International — <https://p3wise.com>
- S-Curve Project Management — training + freelance voor overzeese en Indiase bedrijven — <https://scurveprojectmanagement.com>

Daarnaast doen de GCC's van AECOM, Jacobs, WSP en de Indiase ER&D-reuzen (L&T Technology Services, Tata Technologies, HCL, Infosys, Wipro) project-controls-werk voor buitenlandse projecten. India's GCC-sector telt 1.700+ centra en 1,9 mln medewerkers (FY2024, NASSCOM).

🟩 **Prijsniveau van deze dienstverlening:** een Freelancer.com-opdracht voor een "Primavera P6 Project Scheduling Expert" in India noteerde **₹100–400/uur** (~$1,08–$4,30/uur). Truelancer noteert dat freelance Primavera-specialisten in Noord-Amerika/Oceanië $50–90/uur vragen. Bronnen: <https://www.freelancer.com/projects/project-management/primavera-project-scheduling-expert>, <https://www.truelancer.com/oracle-primavera-freelancers-in-india>
Dat prijsverschil van ~15–50× is precies waarom de offshore-planningsindustrie bestaat.

**Structureel effect op de softwaremarkt:** omdat de klant vaak de seats levert, wordt de licentie-omzet buiten India geboekt. India levert het *arbeid*, niet de *licentie*. Elke schatting van "hoeveel P6-omzet komt uit India" onderschat daarom systematisch het aantal Indiase P6-gebruikers.

---

### 3.4 Bouwspecifieke niche-pakketten

| Pakket | Aanwezigheid in India | Toelichting & bron |
|---|---|---|
| **Trimble TILOS** (time–chainage / lineaire planning) | 🟩 Reëel aanwezig, met lokale resellers | FND India (Future Network Development) en KL iTech Solutions promoten TILOS actief voor "metro, railways, highways, tunnels, and pipelines". Voor een land dat massaal metro's en corridors bouwt is dit logisch de meest relevante niche na P6. Bronnen: <https://construction.trimble.com/en/products/tilos>, LinkedIn-posts van FND India en KL iTech Solutions |
| **Bentley SYNCHRO (4D)** | 🟩 Beperkt maar aanwezig | Wordt door dienstverleners genoemd als "trusted by engineers and project managers in the UK, UAE, India, and the Middle East" — <https://cttec.org/synchro/>. Groeit mee met de BIM-mandaten (§5.1) |
| **Elecosoft Asta Powerproject** | 🟥 Vrijwel geen Indiase aanwezigheid gevonden | Gerichte zoekopdrachten naar Indiase resellers leverden geen resultaten op. Asta is sterk in het VK; in India speelt het geen rol van betekenis |
| **ALICE Technologies** | 🟥 Geen Indiase aanwezigheid gevonden | Bedrijf heeft ~86 medewerkers; geen India-kantoor of -klanten gevonden — <https://craft.co/alice-technologies> |
| **Nodes & Links** | 🟥 Geen Indiase aanwezigheid gevonden | idem |
| **RIB Candy / CCS Candy** | 🟥 Nauwelijks aanwezig | Candy is sterk in Zuid-Afrika en het Midden-Oosten; in India incidenteel via aannemers met Zuid-Afrikaanse of Golf-banden |
| **RIB iTWO** | 🟥 Marginaal | Geen noemenswaardige Indiase footprint gevonden |
| **Spider Project** | 🟥 Marginaal | Russisch pakket; incidenteel bij projecten met Russische betrokkenheid (bijv. kernenergie) |
| **Safran** | 🟥 Marginaal, alleen via export-EPC | Safran Risk komt voor bij Golf-olie-en-gasklanten; niet als Indiaas aangeschafte tool |
| **Deltek (Acumen Fuse, Open Plan)** | 🟥 Beperkt | Acumen Fuse wordt gebruikt door project-controls-consultancies die voor westerse klanten werken; geen Indiase verkoopaanwezigheid gevonden |
| **InEight** | 🟥 Geen aanwezigheid gevonden | |
| **Aurigo Masterworks** | 🟩 Indiase R&D-basis, maar Amerikaanse markt | Aurigo is een Amerikaans bedrijf (Austin, TX) met een groot R&D-centrum in Bangalore, uitgebreid in januari 2025. Het product wordt vooral aan Amerikaanse DOT's en publieke opdrachtgevers verkocht, niet in India. Bron: <https://www.prnewswire.com/in/news-releases/aurigo-expands-its-bangalore-facility-advancing-rd-and-innovation-efforts-302355276.html> |

**Conclusie over de niche:** buiten TILOS en (in mindere mate) SYNCHRO is de bouwspecifieke niche in India praktisch leeg. De markt is bipolair: P6 aan de bovenkant, Excel/lokale ERP's aan de onderkant, met MSP ertussen. Dat is een fundamenteel andere structuur dan in het VK (Asta), Duitsland (TILOS/iTWO), Zuid-Afrika (Candy) of Rusland (Spider).

---

### 3.5 Algemene projectplanningstools

| Pakket | Positie in India | Prijs India | Bron |
|---|---|---|---|
| **Zoho Projects** | Lokale kampioen; Chennai-based; de meest waarschijnlijke keuze voor een Indiaas MKB dat "iets met Gantt" wil | 🟩 Free (5 gebruikers); Premium ₹350/user/maand jaarlijks (₹420 maandelijks); Enterprise ₹700/user/maand. Techjockey noteert "vanaf ₹280/user/maand" | <https://www.itforsme.in/pricing/zoho-projects-india>, <https://www.creatofly.com/zoho-projects-management-pricing/>, <https://www.techjockey.com/detail/zoho-projects> |
| **Smartsheet / monday.com / Wrike / Asana / ClickUp** | Corporate PMO's en GCC's; niet bouwspecifiek; USD-prijzen voelen duur na omrekening | in USD geprijsd | — |
| **Jira + Gantt-plug-ins (BigGantt, Structure.Gantt)** | IT/GCC-wereld, zelden bouw | in USD | — |
| **ProjectLibre / GanttProject / OpenProject** | Marginaal maar reëel; sterke aanwezigheid in onderwijs en bij ZZP'ers en micro-aannemers | gratis | <https://www.projectlibre.com/projectlibre-desktop/>, <https://www.ganttproject.biz/> |

**Cruciaal detail bij Zoho Projects:** Gantt zit in álle plannen, maar **kritiek pad, baseline en resource-utilisatie zitten pas vanaf Enterprise** (₹700/user/maand). Bron: <https://www.zoho.com/projects/zohoprojects-pricing.html> (featurematrix geverifieerd 25-07-2026).
Dat betekent: het goedkoopste betaalde plan met échte CPM in India kost ₹700/user/maand = ₹8.400/jaar (~$90/jaar). Dat is de prijsvloer waar een commerciële CPM-tool in India tegenaan botst.

**Zoho als bedrijf.** 🟩 FY25-omzet ₹12.313 crore (~$1,32 mld), +17,7% j-o-j vanaf ₹10.456 crore in FY24; nettowinst ₹3.191 crore. Eerste bootstrapped Indiase bedrijf boven ₹12.000 crore.
Bronnen: <https://entrackr.com/fintrackr/zoho-reports-rs-12313-cr-revenue-and-rs-3191-cr-profit-in-fy25-11701761>, <https://cio.economictimes.indiatimes.com/news/investments/saas-firm-zohos-revenue-up-by-17-7-yoy-profits-slow-down/130134589>

---

### 3.6 LOKALE PAKKETTEN — uitgebreid

Dit is het deel dat in westerse marktrapporten volledig ontbreekt. Data Bridge noemt voor India letterlijk alleen Oracle, Intuit, Trimble, Sage en Procore. In werkelijkheid bedienen tientallen Indiase leveranciers het MKB.

**Belangrijke structurele observatie vooraf:** vrijwel geen enkel Indiaas pakket is een *planningspakket*. Het zijn bouw-ERP's met de zwaartepunten: RA-bills (running account bills), GST-facturatie, materiaalvoorraad, arbeidsaanwezigheid, DPR's (daily progress reports), onderaannemersbeheer en RERA-rapportage. Planning zit erin als mijlpaal- of takenlijst, zelden als echte CPM-netwerkplanning. De ene bron die dit expliciet erkent: "Gantt/CPM scheduling: mentioned selectively (Xpedeon, BuildSupply, Tactive, Inniti); most integrate rather than build native scheduling."
Bron: <https://www.constructionplacements.com/top-construction-erp-software-india/>

#### 3.6.1 Powerplay (Bengaluru)

- **Wat:** "India's 1st all-in-one construction management software"; mobile-first; 85.000+ projecten beheerd volgens de leverancier. <https://www.getpowerplay.in>
- **Prijs:** 🟩 Pro (Manpower Management) ₹71.999/jaar (~$774); Pro+ ₹1.19.999/jaar (~$1.290). Bron: <https://www.techjockey.com/detail/powerplay>
  🟥 Een concurrerende vergelijkingsblog noteert "₹2.000+/maand" (~₹24.000/jaar) — dat is onverenigbaar met de Techjockey-notering en betreft vermoedelijk een instapplan of verouderde prijs. Bron: <https://sitesetu.in/blog/top-10-construction-management-software-india-2026>
- **Planning:** "Track Schedule, milestones upto 7 levels", taken met fotoupdates, planned-vs-actual kosten. Geen CPM-solver, geen float, geen kritiek pad.
- **Reviews:** 🟩 Capterra India 4,5/5 (8 reviews); ease of use 4,6; support 4,9; value for money 4,6; 90% zou aanbevelen. Techjockey 4,1/5 (6 ratings).
- **Voordelen (uit reviews):** materiaalinkoop/GRN/indent-formulieren "really useful and easy compare to excel"; arbeidsaanwezigheid; DPR's; foto- en communicatie-uitwisseling; sterke mobiele adoptie op de bouwplaats; uitstekende support.
- **Nadelen (uit reviews en vergelijkingen):** geen verwijderoptie in aanwezigheids- en GRN-rapportages; trage doorvoering van suggesties; beperkte GST-facturatie en RA-bill-capaciteit; geen echte netwerkplanning.
- **Bron reviews:** <https://www.capterra.in/software/1036292/powerplay>

#### 3.6.2 Onsite Teams (Delhi)

- **Wat:** field-to-office-integratie, geautomatiseerde DPR's, onderaannemersfacturatie; 10.000+ teams volgens de leverancier.
- **Prijs:** 🟩 "vanaf ₹12.000/gebruiker/jaar" (~$129/jaar) — <https://onsiteteams.com/onsite-pricing/>. 🟥 Een vergelijkingsblog noemt "₹1.500+/maand" (~₹18.000/jaar) — zelfde orde van grootte.
- **Reviews:** 🟩 G2 4,9/5 (8 reviews); Trustpilot 4,4/5 (11 reviews). Lage reviewaantallen: behandel met voorzichtigheid.
- **Voordelen:** goedkoopst in zijn klasse; snelle onboarding voor kleine teams; mobiele meldingen die kostenoverschrijdingen vroeg signaleren; sterk op infra/EPC-veldwerk.
- **Nadelen:** beperkt multi-site-dashboard; geen GST-facturatie; geen CPM.
- **Bronnen:** <https://onsiteteams.com/onsite-pricing/>, <https://www.g2.com/products/onsite-teams/reviews>, <https://www.capterra.in/software/1049107/onsite>

#### 3.6.3 Tactive (Coimbatore, Tamil Nadu)

- **Wat:** aanbesteding, job costing, materieelbeheer, analytics-dashboards; infrastructuurgericht.
- **Prijs:** 🟩 alleen op aanvraag; expliciet "Enterprise-only pricing — not fit for small contractors".
- **Reviews:** 🟩 4,5–4,6/5 op SoftwareSuggest.
- **Voordelen:** diepe ERP-functionaliteit voor ontwikkelaars en infra-aannemers; sterke boekhoudkoppeling; een van de weinige Indiase pakketten waarbij scheduling überhaupt wordt genoemd.
- **Nadelen:** kleinere marktaanwezigheid; enterprise-prijsstelling sluit het MKB uit; geen publieke prijs.
- **Bronnen:** <https://www.constructionplacements.com/top-construction-erp-software-india/>, <https://www.softwaresuggest.com/construction-management-software/india>

#### 3.6.4 StrategicERP (ITAakash, Mumbai)

- **Wat:** AI-gedreven automatisering, sterk aanpasbaar; naar eigen zeggen bij 1.000+ Indiase bouwbedrijven in gebruik.
- **Prijs:** 🟩 ₹4.16.700 eenmalig (~$4.481) volgens SoftwareSuggest — een van de weinige Indiase ERP's met een gepubliceerd bedrag.
- **Reviews:** 4,5/5.
- **Voordelen:** zeer diep aanpasbaar; grote installed base; sterk op vastgoedontwikkelaars.
- **Nadelen:** maatwerk verlengt implementatietijden aanzienlijk; hoge instapdrempel.
- **Bron:** <https://www.softwaresuggest.com/construction-management-software/india>

#### 3.6.5 SoftTech Engineers (Pune) — OPTICON / PWIMS / AutoDCR

- **Wat:** beursgenoteerd Indiaas AEC-softwarebedrijf. Producten: **AutoDCR** (geautomatiseerde bouwplantoetsing voor gemeenten), **PWIMS** (Public Works Information Management System — projectbeheer voor publieke werken), **OPTICON** (bouw-ERP), plus BIMDCR en RuleBuddy. **Interfacet expliciet met Primavera en MS Project.**
- **Financieel (geverifieerd, want de eerste zoekbron gaf een onjuist cijfer):** 🟩 geconsolideerde omzet FY26 **₹133 crore** (~$14,3 mln), FY25 ₹95 crore, FY24 ₹79 crore; nettowinst FY26 ₹5 crore; marktkapitalisatie ~₹580 crore. Bron: <https://www.screener.in/company/SOFTTECH/consolidated/>
  ⚠️ Let op: een zoekresultaat noemde "₹1.282,99 crore omzet, +37%" — dat is **onjuist** en bijna 10× te hoog. Gebruik uitsluitend de screener.in-cijfers.
- 🟥 De claim "over 80% market share in its domain in India" komt uit bedrijfsmateriaal en betreft vrijwel zeker alleen het niche-segment geautomatiseerde bouwplantoetsing bij gemeenten, niet planningssoftware.
- **Voordelen:** de enige Indiase speler met een echte brug tussen overheids-workflow (vergunningen, publieke werken) en projectbeheer; koppelt aan Primavera/MSP; sterke overheidsrelaties.
- **Nadelen:** volgens vergelijkingsartikelen "steep learning curve for BIM modules"; klein bedrijf met bescheiden winstgevendheid; geen eigen CPM-engine.

#### 3.6.6 Overige Indiase pakketten (kort)

| Pakket | Leverancier / plaats | Prijs | Sterk | Zwak |
|---|---|---|---|---|
| **In4Suite ERP** | In4Velocity | op aanvraag | land-tot-oplevering-levenscyclus, CRM-tot-cash voor ontwikkelaars; 4,2/5 | vastgoedspecifiek, minder geschikt voor pure infra |
| **Farvision ERP** | Gamut Infosystems | op aanvraag | 25+ jaar; sterke financials, multi-site voorraad; 4,3/5 | **expliciet weinig nadruk op scheduling/Gantt** |
| **Highrise ERP** | Kanix Infotech | op aanvraag | WBS-gebaseerde kostenbeheersing, automatische RA-bills; claim "cut project costs by 15%"; 4,5/5 | focus op facturatie boven planning |
| **NWAY ERP** | Indore | op aanvraag | zeer sterke materieel-/machinemodules; aanwezigheid in 480+ steden; GST-ready; goede mobiele app | hoge implementatielast; traditionele UI; regionale focus |
| **NYGGS** | India | 🟥 tegenstrijdig: "₹5.000/gebruiker/maand" én "₹1–3 lakh per jaar" — waarschijnlijk per bedrijf, niet per gebruiker | Gantt-charts, documentopslag, leveranciersbeheer | prijsstelling ondoorzichtig |
| **RDash** | Vonken | op aanvraag | AI-gedreven; 9.000+ projecten / ₹500+ crore; sterk op fit-out en BOQ/leveranciersworkflow | steilere leercurve voor uitvoerders |
| **BuildSupply** | Gurugram (2016) | op aanvraag | kostenraming, BOQ, e-tendering, **integratie met projectplanning** | jonge leverancier, weinig cases |
| **Xpedeon** | Amphion | op aanvraag | end-to-end suite, multi-currency (dus geschikt voor export-EPC) | enterprise, zware implementatie |
| **Ramco ERP (EPC)** | Ramco Systems | op aanvraag | bewezen ERP-basis, 35+ landen | te complex voor MKB |
| **Site Setu** | Apna Infotech | per-user op aanvraag; blog noemt eigen positie #1 (let op: eigen blog) | 🟩 **Hindi-UI en Hindi-supportteam — "supervisors adopt it quickly"** | jong platform, kleine gebruikersbasis |
| **Buildrun** | Mumbai | ₹3.000+/maand | **wél expliciet projectplanning + DPR** | kleinere community, lichtere boekhouding |
| **SuperWise.Site** | India | ₹2.500+/maand | AI-fotogebaseerde voortgangsmeting, BIM-modelintegratie | jong; AI vereist goede foto's |
| **FalconBrick** | India | op aanvraag | beste-in-klasse appartementstracking en klantoplevering | ongeschikt voor aannemers/niet-residentieel |
| **Yojo (Thekedar App)** | India | gratis tier (1 site, 5 teamleden); betaalde tier niet publiek | 🟩 **UI in Hindi, Marathi, Tamil én Engels; 100% offline; one-tap aanwezigheid** | **geen scheduling, geen Gantt, geen CPM** |
| **Bhoomi** | India | ₹975/gebruiker/maand (~$10,5) | goedkoop, 4,6/5 | onbekend buiten India |
| **Edynamics BMS** | India | ₹41.700/maand (~$448) | 5,0/5 | hoge prijs voor Indiase begrippen |
| **Astral ERP, Realx ERP, Inniti ERP, Concord ERP, Constro ERP, MobileERP, ConstroSoft, T3CRM+ERP, iGreen T.FAT Build, Builder MAX, INAXUS** | diverse | grotendeels op aanvraag | regionale spelers met loyale klantenkring | fragmentatie; nauwelijks internationale zichtbaarheid |

**Bronnen bij deze tabel:** <https://www.constructionplacements.com/top-construction-erp-software-india/>, <https://www.softwaresuggest.com/construction-management-software/india>, <https://sitesetu.in/blog/top-10-construction-management-software-india-2026>, <https://www.yojoapp.com/hi/thekedar-app/>, <https://nyggs.com/erp-software-pricing>

⚠️ **Betrouwbaarheidswaarschuwing bij deze bronnen.** Techjockey, SoftwareSuggest, Capterra India en Site Setu zijn commerciële marktplaatsen respectievelijk leveranciersblogs. Ratings van 4,5–4,9 op 6–11 reviews zijn statistisch betekenisloos en vaak leveranciersgestuurd. De Site Setu-vergelijking zet Site Setu zelf op #1. Behandel alle sterrenscores hierboven als indicatief, niet als bewijs.

#### 3.6.7 Wat de lokale pakketten gemeen hebben (en wat dat betekent)

Gemeenschappelijke kenmerken:
1. **Prijs in het bereik ₹12.000–₹1,2 lakh per jaar** — een orde van grootte onder P6.
2. **RA-bills en GST als kernfunctie** — Indiase betalingsketens draaien op running account bills; geen westers pakket ondersteunt dit.
3. **Arbeidsaanwezigheid van dagloners** als eerste module — dit is het pijnpunt van de Indiase aannemer, niet het kritieke pad.
4. **Mobile-first en offline** — bouwplaatsen hebben slechte connectiviteit.
5. **Meertalige UI is een verkoopargument** (Site Setu, Yojo) — maar alleen op uitvoerdersniveau, niet op plannerniveau.
6. **Geen CPM-engine.** Geen float, geen kritiek pad, geen netwerklogica, geen kalenderafhandeling van betekenis.

🟨 **[SCHATTING/analyse]** Dat laatste punt is de kern: de Indiase markt heeft een compleet ERP-ecosysteem *onder* P6 gebouwd, maar niemand heeft het CPM-gat gedicht. Een aannemer die te groot is voor Excel maar te klein voor ₹2,5 lakh P6-licenties heeft momenteel geen goede optie — behalve een gekraakte MSP-installatie.

---

## 4. Prijzen, licentiemodellen en trainingskosten — samengevat

### 4.1 Overzichtstabel (INR + USD @₹93)

| Categorie | Product | Model | INR | USD |
|---|---|---|---|---|
| Enterprise CPM | Primavera P6 EPPM (reseller-listing India) | perpetual/unit | ₹2.84.000 | ~$3.054 |
| Enterprise CPM | Primavera P6 (reseller-listing India) | perpetual | ₹2.49.570 | ~$2.684 |
| Enterprise CPM | Oracle Primavera Cloud – Schedule | abonnement/jaar (min. 5) | ~₹1.18 lakh (£950) | ~$1.270 |
| Enterprise CPM | P6 EPPM Cloud | abonnement/jaar | ~₹0,45–2,72 lakh (£358–£2.185) 🟥 | ~$479–$2.928 |
| Enterprise CPM | P6 cloud (marktnotering) | per user/maand | ~₹16.275 | ~$175 |
| Enterprise CPM | Oracle support | % per jaar | 22% van licentie | — |
| Desktop CPM | MS Project Standard 2024 | eenmalig | ₹51.399 | ~$553 |
| Desktop CPM | MS Project Professional 2024 | eenmalig | ₹1.00.599 | ~$1.082 |
| Generalist | Zoho Projects Premium (Gantt, géén CPM) | per user/maand, jaarlijks | ₹350 | ~$3,76 |
| Generalist | Zoho Projects Enterprise (**wel** kritiek pad/baseline) | per user/maand | ₹700 | ~$7,53 |
| Lokaal ERP | Powerplay Pro | per jaar (bedrijf) | ₹71.999 | ~$774 |
| Lokaal ERP | Powerplay Pro+ | per jaar (bedrijf) | ₹1.19.999 | ~$1.290 |
| Lokaal ERP | Onsite | per user/jaar | ₹12.000 | ~$129 |
| Lokaal ERP | StrategicERP | eenmalig | ₹4.16.700 | ~$4.481 |
| Lokaal ERP | Bhoomi | per user/maand | ₹975 | ~$10,5 |
| Lokaal ERP | Buildrun | per maand | ₹3.000+ | ~$32+ |
| Lokaal ERP | SuperWise.Site | per maand | ₹2.500+ | ~$27+ |
| Import | Buildertrend (VS) | per maand | ₹7.425 (~$99) — hogere tier ~₹42.000 | ~$80–$450 |
| Diensten | Freelance P6-planner (India) | per uur | ₹100–400 | ~$1,08–$4,30 |
| Diensten | Freelance P6-planner (VS/Oceanië, ter vergelijking) | per uur | ₹4.650–8.370 | $50–90 |
| Belasting | GST op softwarelicenties | — | **+18%** (SAC 998434) | — |

### 4.2 Trainingskosten

| Aanbod | Prijs | USD | Bron |
|---|---|---|---|
| 🟩 Primavera-cursussen India, volledige bandbreedte | ₹1.000 – ₹1.15.400 | $11 – $1.241 | <https://courses.laimoon.com/india/project-management/primavera/fees> |
| 🟩 Typische instapcursus (2 maanden) | ₹6.000 | ~$65 | <https://coursetakers.com/india/professional/project-management/primavera> |
| 🟩 64-uurs cursus | ₹16.571 | ~$178 | idem |
| 🟩 "Proficient in Primavera with PPM Concepts", 64 uur | ₹29.900 | ~$321 | <https://www.indiamart.com/proddetail/proficient-in-primavera-with-ppm-concepts-2853949356297.html> |
| 🟩 Hindi-/Urdu-cursussen op Udemy | typisch enkele honderden roepies in de aanbieding | $2–15 | <https://www.udemy.com/course/primavera-p6-professional-beginner-to-expert-urduhindi/> (4,4/5, 28 reviews) |
| 🟩 Hindi-YouTube-cursussen | **gratis** | $0 | bijv. <https://www.youtube.com/watch?v=_vkyfEWbmtY>, <https://www.youtube.com/playlist?list=PL8ajYpHyuJ-U59Mt4G5gc0AjhGOHpXo9y> |

**Belangrijke aanbieders:** CADD Centre (landelijk netwerk; "Primavera with PPM Certification" in 5 fasen; cursisten moeten hun **eigen laptop met officiële software** meebrengen — <https://caddcentre.com/courses/primavera-with-ppm-certification-course/>), CADDEX India, ACTE, CADPM Training (Mumbai), 3D CADD Centre (Jaipur), Aadi Guru Prodigy, plus NICMAR voor academische bouwmanagementopleidingen.

**Salariscontext (voor prijsgevoeligheid):**
- 🟩 Gemiddeld salaris Construction Planning Engineer India: **₹5,5 lakh/jaar** (~$5.914) — <https://www.ambitionbox.com/profile/construction-planning-engineer-salary/engineering-and-construction-industry>
- 🟩 Glassdoor: gemiddeld ₹6,00.000/jaar, bandbreedte ₹4,20–8,21 lakh — <https://www.glassdoor.co.in/Salaries/planning-engineer-salary-SRCH_KO0,17.htm>
- 🟩 Met P6-specialisatie in Chennai: ₹14,25 lakh/jaar (~$15.323) — <https://in.jooble.org/salary/planning-engineer-primavera/Chennai>
- 🟩 Indeed: ₹35.338/maand gemiddeld — <https://in.indeed.com/career/planning-engineer/salaries>

🟨 **Analyse:** een P6-licentie van ₹2,5–2,8 lakh kost ongeveer **een half jaarsalaris van een junior planner**. In het VK of Nederland is die verhouding eerder 1:10 tot 1:15. Dit alleen al verklaart waarom informele licenties de norm zijn geworden in de laag onder de grote aannemers.

---

## 5. Lokale bijzonderheden

### 5.1 Indiase normen die CPM voorschrijven (de belangrijkste vondst)

Westerse marktbeschrijvingen van India noemen dit nooit, maar de Bureau of Indian Standards heeft een expliciete normenreeks voor bouwprojectmanagement:

**IS 15883 (Part 2) : 2013 — "Construction Project Management — Guidelines, Part 2: Time Management"**
Comité CED 29 (Construction Management including Safety in Construction), gepubliceerd februari 2013, **status actief, herbevestigd 2023**.
Bron (volledige tekst): <https://archive.org/details/gov.in.is.15883.2.2013> · BIS-catalogus: <https://standardsbis.bsbedge.com/BIS_SearchStandard.aspx?Standard_Number=IS%2015883%20Part%202&id=193>

Directe verifieerbare inhoud (letterlijk uit de norm, door mij uit de PDF geëxtraheerd):

- **Methode:** "Precedence diagram method or activity on node method given in 7 of IS 14580 (Part 2) shall be used for time scheduling."
- **Verplichte deliverables** (clausule over time scheduling deliverables) — letterlijk:
  - a) Early start and early finish dates of each activity
  - b) Late start and late finish dates of each activity
  - c) Early and late dates for project milestones
  - d) **Total float and free float** of each activity and project milestones
  - e) Critical activities and project critical path
  - f) Calculated project duration
- **Rapportagevorm:** "Project scheduling data shall be reported in the form of network diagrams and bar charts or Gantt charts. For each sub-project a separate network diagram or bar chart shall be prepared… linked together to form the master control schedule."
- **Line of Balance verplicht voor repeterend/lineair werk:** "shall be used for scheduling repetitive projects, like similar buildings, very high rise buildings, etc; linear type segmented works like roads, airfields, tunnels, pipelines".
- **Risicoanalyse:** PERT en Monte Carlo-simulatie voor kwantitatieve schedule-risicoanalyse op de baseline.
- **Baselinebeheer:** "Before revising the baseline, the original schedule baseline shall be saved to store historical scheduling data."
- **Delay analysis** op activiteitsniveau met toewijzing van verantwoordelijkheid en kostengevolg; variantie- en trendanalyse via S-curve (Annex C) en earned value management (Annex B).
- **Softwareverwachting:** "Users of this standard are encouraged to employ suitable construction management software as an aid to implement provisions of this standard."

**Bijbehorende normen:**
- IS 14580 (Part 1) : 1998 — Use of network analysis for project management: Management, planning, review, reporting and termination procedures
- IS 14580 (Part 2) : 2006 — Use of network analysis for project management: Use of graphic techniques
- IS 15883 (Part 1) : 2009 — Construction project management — Guidelines: General
- IS 7337 : 2010 — Glossary of terms in project management analysis
- IS 16416 : 2016 — Construction project management: Project formulation and appraisal guidelines
- National Building Code of India 2016, **Part 7: Construction Management, Practices and Safety**

🟨 **[SCHATTING/beoordeling]** De norm is een *guideline*, geen wettelijk verplichte code, en wordt in de praktijk lang niet altijd afgedwongen — anders zou 43% van de centrale projecten niet achterlopen. Maar hij is wél de referentie waarnaar Indiase contracten en arbitragezaken kunnen verwijzen, en hij definieert de CPM-outputset waarvan Indiase opdrachtgevers uitgaan. **Voor een CPM-tool die India serieus neemt is compliance met deze deliverablelijst (ES/EF, LS/LF, TF én FF, kritieke activiteiten, berekende duur) een concreet en verkoopbaar kenmerk — en Line of Balance is een reëel gemis in de meeste westerse tools.**

### 5.2 BIM-mandaten

| Instantie | Mandaat | Jaar | Drempel | Bron |
|---|---|---|---|---|
| 🟩 CPWD (Central Public Works Department) | BIM Guidelines uitgebracht; protocollen voor ontwerpintegratie, clashdetectie, asset-lifecycle | 2019 | Projecten boven **₹100 crore** | <https://epcworld.in/bim-mandates-a-new-imperative-in-public-infrastructure-delivery/>, <https://cpwd.gov.in/Publication/Introducing_BIM_in_CPWD.pdf> |
| 🟩 CPWD (recenter) | Circulaires met eis van BIM voor centrale bouwprojecten boven ₹100 crore; 3D-, 4D- en 5D-workflows | doorlopend | ₹100 crore | <https://abctraining.in/blog/is-bim-mandatory-for-government-projects-in-india-cpwd--1782338371> |
| 🟩 NHAI | BIM-deliverables ingebed in tenderdocumenten; digital twins bij expresswaycontracten | doorlopend | — | epcworld.in |
| 🟩 Metrocorporaties (Delhi, Mumbai, Pune) | BIM-eisen in contracten | doorlopend | — | epcworld.in |
| 🟩 Nationaal BIM-platform | in ontwikkeling, voor standaardisatie en certificering | — | — | epcworld.in |
| 🟩 Internationale financiers (Wereldbank, ADB) | stellen BIM-integratie steeds vaker als financieringsvoorwaarde | doorlopend | — | epcworld.in |
| 🟥 "Volledig mandaat verwacht 2027–2028" | pilots bij CPWD; AAI eist BIM voor nieuwe terminals | claim | — | <https://abctraining.in/blog/bim-mandate-india-2026-government-projects-require-bim-1773751068773> |
| 🟥 "Slechts 12,3% van Indiase projecten boven ₹50 crore past BIM op Level 2+ toe (NICMAR-onderzoek, 480 projecten) vs. 58% wereldwijd" | **niet verifieerbaar** — de bron is een vastgoedblog die een NICMAR-onderzoek citeert dat ik niet primair heb kunnen vinden | — | — | <https://news.zlendorealty.com/bim-technology-construction-india-2026/> |

**Belangrijk voor planningssoftware:** de mandaten spreken over 3D/4D/5D. 4D = koppeling model↔planning. Dat maakt IFC-uitwisseling en 4D-koppelbaarheid relevanter in India dan de huidige adoptiegraad doet vermoeden — en het is de reden dat SYNCHRO en Navisworks langzaam terrein winnen. Tegelijk noemt epcworld.in expliciet als barrières: "skills gaps, software licensing costs, and unfamiliarity with open standards like IFC and COBie". Dat is letterlijk het probleem waar een open, IFC-native tool op mikt.

### 5.3 Overheidsplatforms en aanbestedingseisen

- 🟩 **PM Gati Shakti National Master Plan** (gelanceerd oktober 2021) — nationaal multimodaal infrastructuurplatform, gebouwd op **open-source technologie** en gehost op MEGHRAJ (de Indiase overheidscloud). <https://pmgatishakti.gov.in>
- 🟩 **NHAI Data Lake 3.0** — AI-gedreven, cloudgebaseerd levenscyclusbeheer voor snelwegprojecten; integreert Infracon, RAMS, iRAD/eDAR, ATMS, Bhoomirashi, e-Procurement, Parivesh en PM Gati Shakti. <https://dic.gov.in/datalake-3-0/>, <https://datalakem.nhai.gov.in/NHIDCL>
- 🟩 **PRAGATI** en de **Project Monitoring Group** — bewakingsmechanismen voor grote projecten op premier-niveau.
- 🟩 **Government e-Marketplace (GeM)** en het **Central Public Procurement Portal (etenders.gov.in)** — alle overheidsaankopen, inclusief softwarelicenties, lopen hierlangs. <https://etenders.gov.in/eprocure/app>

**Aanbestedingseis in de praktijk:** ik heb geen algemene, landelijke contractclausule gevonden die Primavera *bij naam* voorschrijft aan aannemers. Wat wél waarneembaar is: (a) de overheid koopt zelf P6-licenties in via 65 lopende tenders, en (b) projectspecifieke contractvoorwaarden bij metro's, NHAI-corridors en PSU-EPC eisen een logisch gekoppeld CPM-programma. De facto betekent dat P6 of MSP.

### 5.4 Open-sourcebeleid van de Indiase overheid

🟩 **"Policy on Adoption of Open Source Software for Government of India"**, MeitY, gepubliceerd 27 maart 2015 (F. No. 1(3)/2014):

> "Government of India shall endeavour to adopt Open Source Software in all e-Governance systems implemented by various Government organizations, as a preferred option in comparison to Closed Source Software (CSS)."

Bronnen: <https://www.meity.gov.in/static/uploads/2024/03/Policy-Document.pdf>, <https://india.gov.in/policy-adoption-open-source-software-government-india>, <https://egovstandards.gov.in/node/669>

🟨 **[SCHATTING/beoordeling]** Dit beleid geldt formeel voor e-governance-systemen, niet voor desktoptools die aannemers gebruiken. Maar het is wél een reëel argument in gesprekken met PWD's, gemeenten, PSU's en overheidsopleidingsinstituten, en het staat haaks op de 65 lopende Primavera-aankooptenders. Voor een LGPL-tool is dit het sterkste beleidsmatige aanknopingspunt in de markt.

### 5.5 RERA — de vergeten planningsdriver

🟩 Onder de Real Estate (Regulation and Development) Act moeten projectontwikkelaars **elk kwartaal** een Quarterly Progress Report (QPR) indienen met projectstatus, mijlpalen, financiële benutting en bouwvoortgang, met boetes bij niet-naleving.
Bronnen: <https://taxguru.in/corporate-law/quarterly-updates-rera-mandatory-compliance-rera.html>, <https://reraone.co.in/services/quarterly-progress-reports>, <https://www.caclubindia.com/articles/avoid-penalties-under-rera-quarterly-compliance-guide-52880.asp>

🟨 **Analyse:** dit is een structurele, wettelijk afgedwongen vraag naar voortgangsmeting bij *elke* geregistreerde vastgoedontwikkelaar in India — een veel grotere populatie dan de EPC-aannemers. Het verklaart waarom vrijwel elk Indiaas bouw-ERP RERA-rapportage als feature adverteert. Het is planningsvraag zonder CPM-eis: een gewogen voortgangs-S-curve volstaat. Wie het CPM-model aan RERA-rapportage koppelt, raakt een markt die P6 niet bedient.

### 5.6 Taal, tekenset en lokalisatie

**Bevinding uit gericht Hindi-onderzoek:** ik heb meerdere zoekopdrachten in het Devanagari uitgevoerd (परियोजना प्रबंधन सॉफ्टवेयर, निर्माण परियोजना प्रबंधन सॉफ्टवेयर भारत कीमत, ठेकेदार साईट प्रबंधन ऐप हिंदी). De uitkomst is op zichzelf een bevinding:

- **De Hindi-taalige resultaten zijn vrijwel uitsluitend machinaal vertaalde marketingpagina's** van westerse leveranciers (Planyard/hi/, GanttPRO/hi/, Procore, Guru99/hi/, Instagantt/hi/, Cleverence/hi/, AppMaster/hi/, Benchmark Gensuite/hi/). Er is nauwelijks organische Hindi-vakinhoud over planningssoftware.
- **Echt Hindi-first product:** Yojo (Thekedar App) met UI in Hindi, Marathi, Tamil en Engels, volledig offline — maar zónder scheduling/Gantt/CPM. <https://www.yojoapp.com/hi/thekedar-app/>
- **Hindi-UI als expliciet verkoopargument:** Site Setu adverteert "Hindi UI and Hindi support team — supervisors adopt it quickly". <https://sitesetu.in/blog/top-10-construction-management-software-india-2026>
- **Hindi-training bestaat wél in overvloed** — YouTube-cursussen "Primavera P6 Full Course | Basic to Advance Tutorial in Hindi", Udemy-cursussen in Urdu/Hindi.

🟨 **Conclusie over taal:** India kent een scherpe tweedeling. **De planningslaag werkt in het Engels** — planners, contracten, WBS-coderingen, rapportages, normen (IS 15883-2 is Engelstalig met alleen een Hindi-titel), en al het export-EPC-werk. **De uitvoeringslaag werkt in Hindi en regionale talen** — voormannen, dagloners, aanwezigheid, DPR's. Een CPM-tool hoeft dus géén Hindi-UI voor zijn kernpubliek; wél is Devanagari-, Tamil-, Telugu-, Bengali- en Gujarati-**tekstweergave** nodig zodra taakomschrijvingen, notities of resource-namen uit het veld komen. Verder relevant:
- Getalnotatie in **lakh/crore** met Indiase groepering (₹1,00,599 in plaats van ₹100.599) — Microsoft India doet dit zelf op zijn prijspagina.
- Datumnotatie **DD-MM-YYYY**.
- Kalenders: moesson (juni–september) legt in grote delen van India buitenwerk stil; een groot aantal regionale feestdagen (Diwali, Holi, Pongal, Durga Puja, Eid) verschilt per deelstaat. IS 15883-2 noemt expliciet "location and weather conditions" als factor bij het bepalen van het optimale tijdsbestek. Kalenderuitzonderingen per deelstaat zijn dus een echte lokalisatie-eis, niet cosmetisch.

### 5.7 Opleidingscultuur

- **Coaching-instituutmodel.** India heeft een enorm netwerk van private trainingscentra (CADD Centre en varianten, CADDEX, ACTE, CADPM, 3D CADD Centre, Aadi Guru Prodigy). Voor een civiel ingenieur is een Primavera-certificaat een standaard cv-item, vergelijkbaar met AutoCAD.
- **De software is onderdeel van de opleiding, niet andersom.** CADD Centre eist dat cursisten hun eigen laptop met "official software" meebrengen — wat in de praktijk een bekende bron van informele installaties is.
- **Gratis Hindi-YouTube domineert de zelfstudie.** Dit betekent dat de markt gewend is aan gratis leren en dat betaalde documentatie/support moeilijk te verkopen is.
- **NICMAR** (National Institute of Construction Management and Research) is het academische centrum voor bouwmanagement.
- **Certificering:** Oracle's officiële P6-certificeringspad wordt gebruikt, maar de meeste planners leren informeel en certificeren pas als een Golf-werkgever erom vraagt.

🟨 **Implicatie:** in India is de trainingsmarkt een *distributiekanaal*. Wie in het curriculum van CADD-achtige instituten komt, wint een generatie planners. Dat is een veel kansrijkere route dan directe verkoop.

### 5.8 Informele en gekraakte licenties

| Bevinding | Waarde | Jaar | Bron |
|---|---|---|---|
| 🟩 India als markt voor onrechtmatig softwaregebruik | **Derde meest getroffen ter wereld**, na China en Rusland (Revenera Monetization Monitor 2025) | 2025 | <https://www.mondaq.com/india/copyright/1726870/unauthorised-software-usage-in-india-legal-remedies-and-enforcement-trends> |
| 🟩 Niet-gelicentieerde installaties India (laatste harde BSA-meting) | **58%** (was 60% in 2013) | 2015 | <https://www.bsa.org/news-events/news/use-of-unlicensed-software-at-58-percent-in-india-new-bsa-survey-finds> |
| 🟩 Eerder genoemd percentage | 65% | eerder | <https://www.ifsecglobal.com/india-region/reducing-pc-software-piracy-crucial-for-india-study/> |
| 🟩 Wereldwijd gemiddelde ter vergelijking | ~37–42% | 2024/2025 | via <https://blog.tebani.com/post/software-piracy-statistics> |

**Juridisch kader en handhaving:**
- Software valt onder "literary work" in de Copyright Act 1957. Voor aansprakelijkheid moet "conscious and commercial deployment" worden aangetoond.
- **Dassault Systemes v. Kamaldeep Singh** (Delhi High Court, 13 juli 2017): detectiedata is toelaatbaar als primair bewijs voor voorlopige voorziening.
- **Maraekat Infotech v. Naylesh Kothari** (2016): rechtbank benoemde een deskundige commissaris met de AFC-test (Abstraction-Filtration-Comparison).
- 🟩 Delhi High Court kende in een recente zaak **₹2,78 crore schadevergoeding** toe wegens opzettelijke inbreuk — <https://rawlaw.in/> (zaak gevonden via zoekopdracht; volledige URL niet stabiel)
- Rechtbanken eisen bewijs van "volitional use, knowledge and commercial benefit"; licentiegevers mogen niet enkel "regularisation fees" eisen. Bron: mondaq.com hierboven.
- Microsoft, Adobe, Autodesk en Dassault zijn de actiefste procespartijen. Bron: <https://www.lawgratis.com/blog-detail/software-piracy-in-india>

🟨 **Analyse van de rol in de planningsmarkt (schatting, geen directe meting beschikbaar):**
- **Bij de grote aannemers en PSU's is de licentiediscipline hoog.** Zij hebben Oracle-audits te vrezen, doen zaken met westerse opdrachtgevers, en kopen via aanbesteding. De 65 lopende overheidstenders bewijzen dat.
- **Bij de laag daaronder — MKB-aannemers, PMC-bureautjes, freelancers, studenten — is informeel gebruik vermoedelijk de norm.** MS Project is hier het meest gekraakte pakket; P6 is technisch lastiger informeel te draaien (Oracle DB-afhankelijkheden), wat een van de redenen is dat P6 nauwelijks doordringt in het MKB.
- **Netto-effect:** piraterij creëert géén markt voor goedkopere commerciële alternatieven (want de gekraakte versie is al gratis én is de tool die werkgevers vragen), maar wél een markt voor *legitiem gratis* software bij organisaties die een audit- of aanbestedingsrisico niet kunnen dragen: overheidsdiensten, onderwijs, NGO's, en aannemers die voor internationale opdrachtgevers werken en een schone licentieadministratie moeten kunnen tonen. Dat is precies het openingsargument voor een open-source tool.

### 5.9 Distributiekanalen

- **Softwaremarktplaatsen zijn in India buitengewoon belangrijk**: Techjockey, SoftwareSuggest en Capterra India zijn voor Indiase MKB-kopers de facto de eerste stap. Vrijwel elk lokaal pakket is er genoteerd. Een aanwezigheid daar is voor deze markt geen bijzaak.
- **Resellers/systeemintegratoren** doen het enterprise-werk (zie §3.1 voor de Primavera-lijst).
- **IndiaMART en TradeIndia** — B2B-handelsplatforms — worden zelfs voor softwarelicenties gebruikt; TradeIndia noteert 52 aanbieders van "construction management software".
- **Directe verkoop via LinkedIn en WhatsApp** is bij lokale ERP-leveranciers gebruikelijk.

---

## 6. Implicaties (analyse, geen bron)

🟨 **[Alles in deze paragraaf is mijn analyse, niet gemeten]**

**Waarom India aantrekkelijk is voor een open-source CPM-tool:**
1. Grootste per-hoofd-populatie planners ter wereld met een enorme prijskloof tussen behoefte en betaalbaarheid.
2. IS 15883-2 definieert exact de CPM-outputset die een solver produceert — een objectief compliance-argument.
3. MeitY's open-sourcebeleid (2015) geeft een expliciete voorkeurspositie in overheidscontext.
4. Het lokale ERP-landschap levert álles behalve CPM — complementair in plaats van concurrerend.
5. BIM-mandaten duwen richting 4D en IFC, en de expliciet genoemde barrières zijn licentiekosten en onbekendheid met IFC/COBie.
6. RERA dwingt kwartaalvoortgangsrapportage af bij duizenden ontwikkelaars.
7. Trainingsinstituten zijn een schaalbaar distributiekanaal dat vrijwel gratis is om te bewerken.

**Wat het moeilijk maakt:**
1. **P6-XER/XML-interoperabiliteit is de toegangseis.** Zonder betrouwbare XER-import/-export is een tool onbruikbaar voor iedereen die met een grote aannemer of buitenlandse klant werkt.
2. **De betalende laag zit al bij Oracle** en heeft weinig reden te wisselen; de laag die zou wisselen betaalt nu niets.
3. **Gratis concurreert met gratis-maar-gekraakt.** Een gekraakte MSP heeft de features én de arbeidsmarktwaarde; een legale open-source tool heeft alleen het eerste.
4. **Support en training zijn moeilijk te vermarkten** in een markt die aan gratis Hindi-YouTube gewend is.
5. **Line of Balance en time-chainage** zijn in India reëel gevraagd (metro's, corridors, repeterende hoogbouw) en ontbreken in de meeste generieke CPM-tools — dat is tegelijk een gat én een bouwlast.

**Concrete lokalisatie-eisen als je deze markt serieus neemt:**
- Kalenderuitzonderingen per Indiase deelstaat + moessonperiodes.
- Indiase getalgroepering (lakh/crore) en ₹-notatie.
- DD-MM-YYYY-datums.
- Devanagari/Tamil/Telugu/Bengali/Gujarati-tekstweergave in taaknamen en notities (níet noodzakelijk een volledige UI-vertaling).
- Rapportsjabloon dat één-op-één de IS 15883-2-deliverablelijst afdekt (ES/EF, LS/LF, TF, FF, kritieke activiteiten, berekende duur) plus een gewogen S-curve.
- XER-import/-export als eerste-klas feature.
- Notering op Techjockey en SoftwareSuggest.

---

## 7. Bronnen

### Marktomvang en macro
- MarketsandMarkets — India PPM Software Market: <https://www.marketsandmarkets.com/Market-Reports/geography/project-portfolio-management-software-market/india>
- Market Research Future — India PPM Software Market: <https://www.marketresearchfuture.com/reports/india-project-portfolio-management-software-market-61338>
- Grand View Research — India Project Management Software Market: <https://www.grandviewresearch.com/horizon/outlook/project-management-software-market/india>
- Grand View Research — India Construction & Design Software Market: <https://www.grandviewresearch.com/horizon/outlook/construction-and-design-software-market/india>
- Data Bridge Market Research — India Construction Management Software Market: <https://www.databridgemarketresearch.com/nucleus/india-construction-management-software-market>
- Mobility Foresights — India Construction Software Market (🟥 scope onduidelijk): <https://mobilityforesights.com/product/india-construction-software-market>
- 6Wresearch — India Construction Management Software Market: <https://www.6wresearch.com/industry-report/india-construction-management-software-market>
- Economic Times — bouwsector werkgelegenheid: <https://economictimes.indiatimes.com/industry/indl-goods/svs/construction/>
- Construction Placements — Construction Jobs Outlook India 2025-2030: <https://constructionplacements.com/construction-jobs-outlook-india-2025-2030/>
- World Metrics — India Construction Industry Statistics: <https://worldmetrics.org/india-construction-industry-statistics/>
- Economic Times — MoSPI kostenoverschrijding ₹5,4 lakh crore: <https://economictimes.indiatimes.com/news/economy/infrastructure/infra-projects-see-rs-5-4-lakh-crore-cost-overrun-mospi/articleshow/131994331.cms>
- The Hindu BusinessLine — 43% projecten achter op schema: <https://www.thehindubusinessline.com/economy/indias-infrastructure-delays-cost-5-lakh-crore-finds-report/article69411380.ece>
- Business Standard — kostenoverschrijdingen juni 2025: <https://www.business-standard.com/industry/news/cost-overruns-in-infra-projects-may-have-hit-2-89-trillion-in-june-2025-125071601655_1.html>
- PolicyEdge — MoSPI Flash Report september 2025: <https://www.policyedge.in/p/mospi-report-reveals-over-530-lakh>
- NASSCOM — India GCC Landscape Report: <https://nasscom.in/knowledge-center/publications/india-gcc-landscape-report-5-year-journey>
- India Today NE — GCC's in India 2025: <https://www.indiatodayne.in/opinion/story/the-rise-of-global-capability-centers-gccs-in-india-a-2025-phenomenon-1222209-2025-05-31>

### Primavera / Oracle
- Oracle India — Primavera P6 (geen prijzen): <https://www.oracle.com/in/construction-engineering/primavera-p6/>
- Oracle Construction & Engineering — service descriptions: <https://www.oracle.com/a/ocom/docs/industries/construction-engineering/cegbu-service-descriptions.pdf>
- Oracle-reseller prijsdocument (UK G-Cloud 14, th3rdcurve, 30 apr 2024) — **de hardste publieke prijslijst die ik vond**: <https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/710699/219564152717676-pricing-document-2024-05-03-1330.pdf>
- Oracle Primavera G-Cloud 14 service definition: <https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf>
- IndiaMART — Primavera P6 EPPM ₹2.84.000: <https://www.indiamart.com/proddetail/oracle-primavera-p6-eppm-22373801433.html>
- IndiaMART — Primavera P6 ₹2.49.570: <https://www.indiamart.com/proddetail/oracle-primavera-p6-21872336330.html>
- Techjockey — Primavera P6 India (prijs op aanvraag, 4,2/5): <https://www.techjockey.com/detail/primavera>
- ITQlick — Primavera P6 pricing: <https://www.itqlick.com/oracle-primavera-p6/pricing>
- ProjectManagerTemplate — P6 licentie vs. abonnement, US$2.750/app user: <https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models>
- Oracle Licensing Experts — P6 Professional ~US$3.520/user: <https://oraclelicensingexperts.com/blog/oracle-primavera-p6-licensing/>
- Taradigm — How much does Primavera P6 cost: <https://www.taradigm.com/how-much-does-primavera-p6-cost/>
- ContractorsAndBuilders — Oracle Primavera pricing (~$175/user/maand): <https://contractorsandbuilders.com/pricing/oracle-primavera/>
- ImageGrafix — Oracle Primavera partner/reseller New Delhi: <https://imagegrafix.in/oracle-primavera-partner-reseller-in-new-delhi-india/>
- ImageGrafix — Chennai: <https://imagegrafix.in/oracle-primavera-partner-reseller-in-chennai-tamilnadu-india/>
- Proventures India — Primavera P6 licensing: <https://consulting.proventuresindia.com/product-licensing-primavera-p6-licensing/>
- Hyde Park Solutions — Primavera licensing: <https://www.hydeparksolutions.com/software/primavera-licensing/>
- Equiv Technologies — Oracle Primavera EPPM authorized reseller (Chennai): <https://www.equivtech.com.au/Oracle-Primavera-EPPM-Authorized-Reseller.html>
- Ogma — Oracle partner India: <https://ogma.in/solutions/oracle-partner-india>

### Aanbestedingen
- TenderDetail — Oracle Primavera Tenders in India (65 tenders): <https://www.tenderdetail.com/Indian-tender/oracle-primavera-tenders>
- TenderDetail — Primavera Project Management Tenders: <https://www.tenderdetail.com/Indian-tender/primavera-project-management-tenders>
- TenderImpulse — Ministry of Power P6 EPPM tender (juni 2026): <https://tenderimpulse.com/government-tenders/india/custom-bid-for-services-primavera-p6-enterprise-project-portfolio-management-app-13403276>
- Gittigo — RWGCL Primavera tender (Rajasthan Canal Project): <https://gittigo.com/tender/detail/6a432d636b984235a13dfd31>
- Government eProcurement System: <https://etenders.gov.in/eprocure/app>
- Minaions — PWD/CPWD/NHAI aanbestedingen uitgelegd: <https://minaions.com/blog/construction-infrastructure-tenders-pwd-cpwd-nhai-and-how-to-bid>

### Microsoft
- Microsoft India — Project prijsvergelijking (₹51.399 / ₹1.00.599): <https://www.microsoft.com/en-in/microsoft-365/project/compare-microsoft-project-management-software>

### Zoho
- Zoho Projects pricing (featurematrix: kritiek pad pas in Enterprise): <https://www.zoho.com/projects/zohoprojects-pricing.html>
- Zoho Projects pricing comparison: <https://www.zoho.com/projects/pricing-comparison.html>
- ITforSME — Zoho Projects India pricing (₹350/₹700): <https://www.itforsme.in/pricing/zoho-projects-india>
- Creatofly — Zoho Projects pricing (₹350 jaarlijks / ₹420 maandelijks): <https://www.creatofly.com/zoho-projects-management-pricing/>
- Techjockey — Zoho Projects (vanaf ₹280/user/maand): <https://www.techjockey.com/detail/zoho-projects>
- Entrackr — Zoho FY25 ₹12.313 crore omzet: <https://entrackr.com/fintrackr/zoho-reports-rs-12313-cr-revenue-and-rs-3191-cr-profit-in-fy25-11701761>
- ET CIO — Zoho omzet +17,7%: <https://cio.economictimes.indiatimes.com/news/investments/saas-firm-zohos-revenue-up-by-17-7-yoy-profits-slow-down/130134589>
- MediaNama — Zoho FY25: <https://www.medianama.com/2026/04/223-zoho-revenue-crosses-rs-12000-crore-fy25-profit-slips/>

### Lokale Indiase pakketten
- ConstructionPlacements — Top Construction ERP Software India (15 pakketten, alle Indiaas): <https://www.constructionplacements.com/top-construction-erp-software-india/>
- SoftwareSuggest — Construction Management Software India (met prijzen): <https://www.softwaresuggest.com/construction-management-software/india>
- Site Setu — Top 10 Construction Management Software India 2026 (⚠️ leveranciersblog): <https://sitesetu.in/blog/top-10-construction-management-software-india-2026>
- Powerplay: <https://www.getpowerplay.in> · Techjockey-prijzen: <https://www.techjockey.com/detail/powerplay> · Capterra India reviews: <https://www.capterra.in/software/1036292/powerplay>
- Onsite Teams — pricing ₹12.000/user/jaar: <https://onsiteteams.com/onsite-pricing/> · G2: <https://www.g2.com/products/onsite-teams/reviews> · Capterra India: <https://www.capterra.in/software/1049107/onsite>
- Onsite — "Why Excel & WhatsApp are not enough": <https://onsiteteams.com/why-excel-whatsapp-are-not-enough-for-construction-project-tracking/>
- In4Velocity / In4Suite: <https://www.in4velocity.com>
- Farvision ERP: <https://farvisionerp.com> · <https://farvision.in>
- NYGGS ERP pricing: <https://nyggs.com/erp-software-pricing>
- RDash pricing: <https://rdash.ai/pricing>
- Yojo (Thekedar App), Hindi-UI: <https://www.yojoapp.com/hi/thekedar-app/>
- SoftTech Engineers financials (geverifieerd): <https://www.screener.in/company/SOFTTECH/consolidated/>
- ProjectBase — Future of Construction ERP in India 2026: <https://www.projectbase.com/blog/the-future-of-construction-erp-in-india-2026-trends-insights>
- TradeIndia — construction management software (52 aanbieders, Hindi-pagina): <https://www.tradeindia.com/hi/manufacturers/construction-management-software.html>

### "WhatsApp en Excel"-realiteit
- Medium — India's Construction Industry Runs on WhatsApp and Excel: <https://medium.com/@sumeetsomraj/indias-construction-industry-runs-on-whatsapp-and-excel-7e8d26728fdd>
- Commander ERP — WhatsApp/Excel vs. cloud-ERP: <https://commandererp.com/blog/whatsapp-excel-construction-management-cost-cloud-erp>
- SiteSmartly — Why contractors are replacing Excel with apps: <https://sitesmartly-web.s2vapps.com/blog-excel-to-app>

### Indiase normen
- IS 15883 (Part 2) : 2013 — Construction Project Management, Time Management (volledige tekst): <https://archive.org/details/gov.in.is.15883.2.2013>
- IS 15883 Part 2 — PDF (gebruikt voor tekstextractie): <https://www.cracindia.in/admin/uploads/IS-15883---2.pdf>
- BIS catalogus IS 15883 Part 2 (status actief, herbevestigd 2023): <https://standardsbis.bsbedge.com/BIS_SearchStandard.aspx?Standard_Number=IS%2015883%20Part%202&id=193>
- BIS scope IS 15883 Part 2: <https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/Group_wise_standards_list/show_scope?row=MTkz>
- InfraLens — IS-codebibliotheek (2.374 IS-codes, 136 IRC-standaarden): <https://infralens.in/code/IS-15883-Part-2-2013>
- National Building Code of India 2016, Part 7 (Construction Management, Practices and Safety): <https://www.slideshare.net/slideshow/nbc-2016vol2pdf/252021930>
- SP 7 / constructional practices and safety: <https://law.resource.org/pub/in/bis/S03/is.sp.7.2005.lulu.1.pdf>

### BIM-mandaten en overheidsplatforms
- EPC World — BIM Mandates: A New Imperative in Public Infrastructure Delivery: <https://epcworld.in/bim-mandates-a-new-imperative-in-public-infrastructure-delivery/>
- CPWD — Introducing BIM in CPWD (PDF): <https://cpwd.gov.in/Publication/Introducing_BIM_in_CPWD.pdf>
- Primaversity — Government BIM mandates India (CPWD, NHAI, Smart Cities): <https://primaversity.com/post/complete-guide-to-government-bim-mandates-in-india-cpwd-nhai-smart-cities-projects-bim-mandate>
- ABC Training — Is BIM mandatory for government projects in India: <https://abctraining.in/blog/is-bim-mandatory-for-government-projects-in-india-cpwd--1782338371>
- InfraLens — BIM in India 2026 (🟥 403 bij ophalen; alleen snippet beschikbaar): <https://infralens.in/knowledge/bim-in-india-2026>
- 🟥 Zlendo Realty — claim 12,3% BIM-adoptie (NICMAR, 480 projecten) — **niet geverifieerd**: <https://news.zlendorealty.com/bim-technology-construction-india-2026/>
- Construction World — Autodesk-Deloitte State of Digital Adoption 2025 (geen cijfers in artikel): <https://www.constructionworld.in/latest-construction-technology/autodesk-deloitte-report--digital-tech-driving-construction-efficiency/72974>
- PM Gati Shakti National Master Plan: <https://pmgatishakti.gov.in>
- NHAI Data Lake 3.0 (Digital India Corporation): <https://dic.gov.in/datalake-3-0/>
- NHAI/NHIDCL project management portal: <https://datalakem.nhai.gov.in/NHIDCL>

### Open-sourcebeleid
- MeitY — Policy on Adoption of Open Source Software for Government of India (2015): <https://www.meity.gov.in/static/uploads/2024/03/Policy-Document.pdf>
- India.gov.in — beleidsoverzicht: <https://india.gov.in/policy-adoption-open-source-software-government-india>
- e-Governance Standards: <https://egovstandards.gov.in/node/669>
- ProjectLibre Desktop: <https://www.projectlibre.com/projectlibre-desktop/>
- GanttProject: <https://www.ganttproject.biz/>

### RERA
- TaxGuru — Quarterly updates under RERA: <https://taxguru.in/corporate-law/quarterly-updates-rera-mandatory-compliance-rera.html>
- ReraOne — Quarterly Progress Reports: <https://reraone.co.in/services/quarterly-progress-reports>
- CAclubindia — RERA quarterly compliance guide: <https://www.caclubindia.com/articles/avoid-penalties-under-rera-quarterly-compliance-guide-52880.asp>
- Site Setu — RERA compliance for builders: <https://sitesetu.in/blog/rera-compliance-builders-india>

### Piraterij en handhaving
- Mondaq — Unauthorised software usage in India: legal remedies and enforcement trends (Revenera 2025, India #3): <https://www.mondaq.com/india/copyright/1726870/unauthorised-software-usage-in-india-legal-remedies-and-enforcement-trends>
- BSA — Use of unlicensed software at 58 percent in India (2015): <https://www.bsa.org/news-events/news/use-of-unlicensed-software-at-58-percent-in-india-new-bsa-survey-finds>
- Dataquest India — BSA-survey 58%: <https://www.dqindia.com/use-of-unlicensed-software-at-58-in-india-bsa-survey/>
- IFSEC Global — reducing PC software piracy crucial for India: <https://www.ifsecglobal.com/india-region/reducing-pc-software-piracy-crucial-for-india-study/>
- LawGratis — Software piracy in India: <https://www.lawgratis.com/blog-detail/software-piracy-in-india>
- LKS Law — Unauthorised software enforcement: <https://www.lkslaw.com/insights/articles/unauthorised-software>

### Training, salarissen, offshore-diensten
- Laimoon — Primavera course fees India (₹1.000–₹115.400): <https://courses.laimoon.com/india/project-management/primavera/fees>
- Coursetakers — Top 10 Primavera courses India (₹6.000–₹16.571): <https://coursetakers.com/india/professional/project-management/primavera>
- IndiaMART — Proficient in Primavera with PPM Concepts (₹29.900, 64 uur): <https://www.indiamart.com/proddetail/proficient-in-primavera-with-ppm-concepts-2853949356297.html>
- CADD Centre — Primavera with PPM Certification: <https://caddcentre.com/courses/primavera-with-ppm-certification-course/>
- CADD Centre Global — Primavera training: <https://www.caddcentreglobal.com/primavera-complete-training-course.php>
- CADDEX India — Primavera course: <https://www.caddexindia.com/Course/Primavera-Course>
- CADPM Training Mumbai: <https://cadpmtraining.com/Primavera_Complete.aspx>
- ACTE — Primavera P6 training: <https://www.acte.in/primavera-p6-training>
- YouTube — Primavera P6 Full Course in Hindi: <https://www.youtube.com/watch?v=_vkyfEWbmtY>
- YouTube — Primavera P6 Professional Beginner To Expert in Hindi (playlist): <https://www.youtube.com/playlist?list=PL8ajYpHyuJ-U59Mt4G5gc0AjhGOHpXo9y>
- Udemy — Primavera P6 Professional Training in Urdu/Hindi (4,4/5): <https://www.udemy.com/course/primavera-p6-professional-beginner-to-expert-urduhindi/>
- AmbitionBox — Construction Planning Engineer salary (₹5,5 lakh): <https://www.ambitionbox.com/profile/construction-planning-engineer-salary/engineering-and-construction-industry>
- Glassdoor India — Planning Engineer salary: <https://www.glassdoor.co.in/Salaries/planning-engineer-salary-SRCH_KO0,17.htm>
- Indeed India — Planning Engineer salary: <https://in.indeed.com/career/planning-engineer/salaries>
- Jooble — Planning Engineer Primavera Chennai (₹14,25 lakh): <https://in.jooble.org/salary/planning-engineer-primavera/Chennai>
- Naukri — P6 jobs in India (573): <https://www.naukri.com/p6-jobs-in-india>
- Naukri — Planning Engineer Primavera P6 jobs (571): <https://www.naukri.com/planning-engineer-primavera-p6-jobs>
- LinkedIn India — Primavera P6 jobs (817): <https://in.linkedin.com/jobs/primavera-p6-jobs>
- Freelancer.com — Primavera P6 scheduling expert (₹100–400/uur): <https://www.freelancer.com/projects/project-management/primavera-project-scheduling-expert>
- Truelancer — Oracle Primavera freelancers India: <https://www.truelancer.com/oracle-primavera-freelancers-in-india>
- Ebees Corp — offshore Primavera scheduling support: <https://ebeescorp.com>
- Proventures India — P6 scheduling services: <https://proventuresindia.com/service/scheduling-services-using-oracle-primavera-p6/>
- AMS India — Primavera project scheduling: <https://amsindia.co.in/primavera-project-scheduling-plan-track/>
- InfraMind EPC — planning & scheduling: <https://inframindepc.com/services/planning-scheduling>
- P3Wise International: <https://p3wise.com>
- S-Curve Project Management: <https://scurveprojectmanagement.com>

### Niche-pakketten
- Trimble TILOS: <https://construction.trimble.com/en/products/tilos>
- TILOS in planning & scheduling of railway projects: <https://app-consultoria.com/tilos-in-planning-scheduling-of-railway-projects/>
- CTTEC — Bentley SYNCHRO 4D (India genoemd): <https://cttec.org/synchro/>
- ALICE Technologies: <https://www.alicetechnologies.com/home> · bedrijfsprofiel: <https://craft.co/alice-technologies>
- Aurigo — Bangalore R&D-uitbreiding (jan 2025): <https://www.prnewswire.com/in/news-releases/aurigo-expands-its-bangalore-facility-advancing-rd-and-innovation-efforts-302355276.html>

### Belasting
- GST Bill Maker — SAC 998434, 18%: <https://gstbillmaker.in/sac-code/998434-software-downloads/>
- IndiaFilings — SAC code & GST rate IT services: <https://www.indiafilings.com/learn/sac-code-gst-rate-it-services>
- GST Invoices — GST on software services: <https://gstinvoices.in/blog/gst-on-software-services>

### Vergelijkende vakbronnen (India)
- The Civil Edge — MS Project vs Primavera (Indiase invalshoek): <https://theciviledge.in/ms-project-vs-primavera/>
- Academia.edu — A Study on Softwares Used in Project Planning and Management in Construction Projects in India: <https://www.academia.edu/99947891/A_Study_on_Softwares_Used_in_Project_Planning_and_Management_in_Construction_Projects_in_India>
- IJRITCC — Comparative Analysis of Primavera P6 and Microsoft Project: <https://ijritcc.org/index.php/ijritcc/article/view/11164>
- ScienceDirect — Application of project management tool (enquête onder Indiase bouwbedrijven, 🟥 403 bij ophalen): <https://www.sciencedirect.com/science/article/pii/S2214785322073035>
- IJCRT — Cost and Time Overruns in Indian Infrastructure Megaprojects: <https://ijcrt.org/papers/IJCRT2508391.pdf>

---

## 8. Beperkingen van dit onderzoek

Eerlijkheidshalve, zodat je weet wat je wel en niet aan dit rapport hebt:

1. **Het WebSearch-budget van deze sessie was op**; al het onderzoek is gedaan via WebFetch tegen zoekmachines (DuckDuckGo html/lite, Yahoo) en directe paginabezoeken. Dat werkt, maar geeft minder brede dekking dan native zoeken, en enkele engines (Mojeek, Startpage, Brave, SearxNG) blokkeerden de fetch.
2. **Geen enkel analistenrapport meet "bouwplanningsoftware in India".** Alle marktomvangcijfers in §2.2 meten iets breders of iets anders. De cijfers in §2.3 zijn expliciet mijn eigen afleiding.
3. **Marktaandeel per pakket in India is nergens gepubliceerd.** De rangorde in §3.0 is mijn synthese uit vacaturedata, aanbestedingsdata, reviewvolumes en leveranciersaanwezigheid — behandel het als een onderbouwd oordeel, niet als een meting.
4. **Reviewscores van Indiase marktplaatsen zijn onbetrouwbaar** (6–11 reviews, commerciële platforms, leveranciersblogs die zichzelf ranken). Ik heb dat per geval gemarkeerd.
5. **Prijzen van lokale ERP's zijn grotendeels "op aanvraag".** De bedragen die ik wél heb, komen van marktplaatsen en kunnen verouderd zijn; bij Powerplay vond ik twee onverenigbare prijzen.
6. **Eén bron gaf een grof onjuist cijfer** (SoftTech-omzet 10× te hoog); ik heb dat geverifieerd en gecorrigeerd via screener.in. Dat suggereert dat andere niet-geverifieerde samengevatte cijfers in dit rapport ook fout kunnen zijn — vandaar de 🟩/🟨/🟥-markering.
7. **De BSA-piraterijmeting is uit 2015.** Er is geen recentere landelijke meting gevonden; de Revenera-2025-ranking is kwalitatief (positie, geen percentage).
8. **Ik heb geen primaire Indiase contractclausules ingezien** die Primavera bij naam eisen — die conclusie is afgeleid uit aanbestedingsgedrag en vacaturedata.
9. **Hindi-zoekwerk leverde weinig substantie op** — dat is zelf een bevinding (§5.6), maar het betekent ook dat er mogelijk lokale kennis in besloten fora, WhatsApp-groepen of Telegram-kanalen zit die via het open web niet vindbaar is.
