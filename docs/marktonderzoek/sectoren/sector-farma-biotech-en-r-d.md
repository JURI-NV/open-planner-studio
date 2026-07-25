# Sectoronderzoek: Farma, biotech en R&D

**Onderdeel van:** wereldwijd marktonderzoek planningssoftware
**Peildatum onderzoek:** juli 2026
**Onderzoeksmethode:** vendor-IR-documenten (Planisware Euronext-filings), PubMed/NCBI-literatuur, USAspending.gov contractdata, TED, analistenbronnen, vakpers en reviewplatforms.

> **Methodologische waarschuwing vooraf.** De WebSearch-quota van deze sessie was uitgeput bij aanvang; het onderzoek is daarom gedaan met (a) directe WebFetch op leverancier-, toezichthouder- en analistendomeinen, (b) de NCBI E-utilities API voor peer-reviewed literatuur, en (c) de USAspending.gov API voor werkelijke contractwaarden. Elk hard cijfer hieronder heeft een bron-URL. Alles wat ik zelf heb afgeleid staat expliciet gemarkeerd als **SCHATTING**.

---

## 0. Managementsamenvatting

Farma/biotech/R&D is **niet** een bouwplanningsmarkt maar een **portfolio- en resourceplanningsmarkt**. Het planningsobject is niet een gebouw maar een geneesmiddelontwikkelingsprogramma dat mediaan 5,9–7,2 jaar (non-oncologie) tot 13,1 jaar (oncologie) klinische tijd kost, met 13,8% kans op goedkeuring vanaf fase 1 ([Wong/Siah/Lo, *Biostatistics* 2019, PMC6409418](https://pmc.ncbi.nlm.nih.gov/articles/PMC6409418/)). De gekapitaliseerde ontwikkelkosten per goedgekeurd middel liggen tussen $985,3 mln (mediaan, JAMA 2020) en $2.558 mln (DiMasi, 2013-dollars).

De sector is daarmee de **hoogste betalingsbereidheid per planner in de hele planningsmarkt** — hoger dan defensie, hoger dan olie & gas — omdat één dag vertraging in een fase-3-programma tot **USD 8 miljoen aan gederfde omzet per dag** kan kosten ([Dermatology 2020, PMID 32126560](https://pubmed.ncbi.nlm.nih.gov/32126560/)).

De marktleider is **Planisware** (Euronext Paris: PLNW), €198,0 mln omzet FY2025, waarvan de pijler *Product Development & Innovation* €105,7 mln (53%) — de pijler waarin farma zit ([FY 2025 results presentation, p.12](https://planisware.com/sites/default/files/2026-02/20260226%20-%20Planisware%20-%20FY%202025%20results%20-%20Investors%20%26%20Analysts%20presentation%201.pdf)). Planisware claimt dat "over 50 top life science organizations worldwide" op het platform draaien ([life sciences brochure](https://planisware.com/resources/selecting-tool/brochure-planisware-life-sciences)).

**Belangrijke marktstructuurwijziging in 2025:** het competitieve veld is fors geconsolideerd. **Sciforma is overgenomen door Planview** (sciforma.com redirect naar [planview.com/acquisitions/about-sciforma](https://www.planview.com/acquisitions/about-sciforma/); Sciforma Vantage heet nu Planview ProjectAdvantage). **Sopheon** is opgegaan in **Wellspring** (sopheon.com redirect naar [wellspring.com](https://www.wellspring.com/), waar farma niet meer in de industrielijst staat). **Smartsheet** is van de beurs gehaald door Blackstone en Vista voor **~$8,4 mrd** ($56,50/aandeel, afgerond 22 januari 2025, [Vista persbericht](https://www.vistaequitypartners.com/news/blackstone-and-vista-equity-partners-complete-acquisition-of-smartsheet/)). Planisware is daarmee zo ongeveer de laatst overgebleven zelfstandige, beursgenoteerde pure-play. *(Nuance na verificatie: alle drie de consolidatiefeiten zijn bevestigd — Planview/Sciforma, Wellspring/Sopheon, Blackstone+Vista/Smartsheet — maar "laatste pure-play" is een kwalificatie, geen vaststelling. Beursgenoteerde werkmanagement-spelers als monday.com en Asana bestaan nog; ze zijn alleen geen PPM-pure-play in Planisware's categorie. Lees de claim als: laatste beursgenoteerde speler wiens hele bedrijf enterprise-PPM ís.)*

**Het gat voor een open-source, IFC-gebaseerde planner ligt niet in R&D-portfolio's maar in het farma-capexdomein**: GMP-fabrieksbouw, C&Q (commissioning & qualification), tech transfer en facility-uitbreidingen. Daar is IFC wél de native taal, daar loopt Primavera P6 (USACE-achtige contractwaarden tot $10,7 mln in overheidsdata), en daar sluit de bestaande OPS-architectuur direct op aan. Zie §7.

---

## 1. Wat maakt deze sector bijzonder qua planning?

### 1.1 Schaal en doorlooptijd

| Parameter | Waarde | Bron |
|---|---|---|
| Mediane duur fase 1 | 1,6 jaar | [PMC6409418](https://pmc.ncbi.nlm.nih.gov/articles/PMC6409418/) |
| Mediane duur fase 2 | 2,9 jaar | idem |
| Mediane duur fase 3 | 3,8 jaar | idem |
| Mediane klinische tijd non-oncologie | 5,9–7,2 jaar | idem |
| Mediane klinische tijd oncologie | 13,1 jaar | idem |
| Typische tijd octrooi→goedkeuring | 10–15 jaar | [Wikipedia, Pharmaceutical industry](https://en.wikipedia.org/wiki/Pharmaceutical_industry) |
| FDA-doorlooptijd fase-3-afronding → goedkeuring | ± 30 maanden | [PMC6409418](https://pmc.ncbi.nlm.nih.gov/articles/PMC6409418/) |

Dit is fundamenteel anders dan bouw. Een bouwplanning heeft een horizon van 1–5 jaar en een vast eindpunt; een geneesmiddelplanning heeft een horizon van 10–15 jaar met **stochastische eindpunten**. Long-range planning (LRP) in farma loopt routinematig 10–15 jaar vooruit voor resource- en cashflow-forecasting.

### 1.2 Resourcecomplexiteit: matrixorganisatie over minstens vijf functies

Planisware's eigen probleemschets is de beste beschrijving van de status quo in de sector:

> "A program manager has a high-level plan across phases for drug development in MS Project. He or she has a clinical teams plan in Smartsheets and tracks execution in their clinical trial management system (CTMS), while the chemistry, manufacturing, and controls (CMC) function knows what they're working on in Excel."
> — [Planisware, *Cross-functional planning in drug development*](https://planisware.com/resources/product-roadmapping/cross-functional-planning-drug-development)

De betrokken functies:

1. **Clinical Operations** — studieopzet, site-activatie, enrolment, monitoring (draait in CTMS: Veeva, Medidata)
2. **CMC / Technical Development** — API, drug product, formulering, scale-up
3. **Regulatory Affairs** — FDA/EMA/PMDA-dossiers, submissieplanning, post-market commitments
4. **Non-clinical / Toxicologie** — GLP-studies met eigen dierfaciliteitcapaciteit
5. **Commercial / Launch** — marktvoorbereiding, pricing & reimbursement
6. **Clinical Supply Chain** — IMP-productie, verpakking, distributie per land

Planisware modelleert resources "down to the role level across functions" in FTE's, met **maandelijkse project-baselines** en **kwartaalgewijze risicometriek-updates** ([Planisware, 5 key metric categories](https://planisware.com/resources/resource-management-capacity-planning/5-key-metric-categories-pharma-resource-and)).

De klinische supply chain is een aparte planningsdimensie: Planisware volgt volumes "at each clinical project by country and key supply chain stages" (API → Drug Product → Assembly → Packaging), inclusief scenariomodellering wanneer "patient enrollment in a Phase 3 trial increases unexpectedly" ([Planisware, clinical supply chain](https://planisware.com/resources/product-capabilities/planisware-enterprise-optimizing-clinical-supply-chain-management)).

### 1.3 Wat farma-planning uniek maakt tegenover bouw/EPC

| Dimensie | Bouw/EPC | Farma R&D |
|---|---|---|
| Eindpunt | Deterministisch (oplevering) | Stochastisch (13,8% PoS vanaf fase 1) |
| Kernrekenkunde | CPM/kritiek pad, float | CPM **plus** PTRS-gewogen NPV, efficient frontier, Monte Carlo |
| Resource-eenheid | Ploeg, kraan, m² | FTE per rol per functie, patiëntcohorten, sitecapaciteit |
| Baseline | Contractueel vastgelegd | Maandelijkse rollende baseline |
| Belangrijkste onzekerheid | Weer, levering, ontwerpwijziging | Patiëntrekrutering (grootste oorzaak van vertraging) |
| Kosten van vertraging | Boetes/liquidated damages | Verloren exclusiviteitsdagen: tot $8 mln/dag |

Planisware past **Efficient Frontier**-optimalisatie toe om "focus resources on therapies with the greatest probability of success" en gebruikt "predictive algorithms, what-if scenarios, probability of technical and regulatory success (PTRS), and Monte Carlo simulation" ([planisware.com/industries/pharma](https://www.planisware.com/industries/pharma)). Dat is een rekenlaag die in bouwplanners simpelweg niet bestaat.

### 1.4 Kosten van vertraging — het centrale economische argument

- **Tot USD 8 miljoen per dag** aan gederfde omzet door klinische vertraging; patiëntrekrutering is de grootste oorzaak; tot 40% uitval van deelnemers ([Dermatology 2020, PMID 32126560](https://pubmed.ncbi.nlm.nih.gov/32126560/)).
- Ontwikkelkosten per goedgekeurd middel:
  - **$1.395 mln** out-of-pocket, **$2.558 mln** gekapitaliseerd (2013-dollars), **$2.870 mln** incl. post-approval — [DiMasi et al., *Journal of Health Economics* 2016, PMID 26928437](https://pubmed.ncbi.nlm.nih.gov/26928437/)
  - **$985,3 mln** mediane gekapitaliseerde investering (95% BI $683,6–$1.228,9 mln, 2018-dollars) — [Wouters et al., *JAMA* 2020, PMID 32125404](https://pubmed.ncbi.nlm.nih.gov/32125404/)
  - **$172,7 mln** gemiddeld out-of-pocket; **$515,8 mln** inclusief mislukkingen — [*JAMA Network Open* 2024, PMID 38941099](https://pubmed.ncbi.nlm.nih.gov/38941099/)
- Een Planisware-workshopverslag noemt een concreet geval van een **18 maanden launch-vertraging** die met risicogebaseerde planning voorkomen had kunnen worden ([Key planning trends](https://planisware.com/resources/resource-management-capacity-planning/key-planning-trends-pharmaceutical-industry)).

**Afgeleide redenering (SCHATTING):** bij een blockbuster met $2 mrd piekjaaromzet is één dag exclusiviteitsverlies ruwweg $5,5 mln. Een planningssuite van €500k/jaar verdient zichzelf terug als hij één dag per jaar aan vertraging voorkomt — een ROI-ratio van ~11:1 per vermeden dag. Dít verklaart de betalingsbereidheid, niet softwarefunctionaliteit.

### 1.5 Slagingskansen (waarom portfolio > project)

| Overgang | Slagingspercentage | Bron |
|---|---|---|
| Fase 1 → 2 | 66,4% | [PMC6409418](https://pmc.ncbi.nlm.nih.gov/articles/PMC6409418/) |
| Fase 2 → 3 | 58,3% | idem |
| Fase 3 → goedkeuring | 59,0% | idem |
| Fase 1 → goedkeuring (totaal) | 13,8% | idem |
| Oncologie totaal | 3,4% | idem |
| Vaccins totaal | 33,4% | idem |

Omdat 86% van de programma's sneuvelt, is de eenheid van planning het **portfolio**, niet het project. Een tool die alleen één schema goed rekent, is hier per definitie ontoereikend.

---

## 2. Welke planningssoftware wordt hier daadwerkelijk gebruikt, in welke rangorde, en door wie?

### 2.1 Rangorde (mijn beoordeling, onderbouwd)

**Tier 1 — Enterprise R&D-portfolio (de "system of record" voor pipeline en resources)**

| # | Product | Positie | Bewijs |
|---|---|---|---|
| 1 | **Planisware Enterprise** | Onbetwiste marktleider in big pharma R&D-portfolio | Genoemde farma-klanten: Pfizer, AstraZeneca, Sanofi, Roche, Amgen ([industries/pharma](https://www.planisware.com/industries/pharma)); Novo Nordisk met 1.350 gebruikers ([planisware.com/customers](https://www.planisware.com/customers)); "over 50 top life science organizations" ([brochure](https://planisware.com/resources/selecting-tool/brochure-planisware-life-sciences)); daarnaast Merck Biopharma, BMS ("Center of Excellence 'Planning'"), Jazz Pharmaceuticals, Arvinas, Daiichi Sankyo, Astellas, Stevanato Group (uit de [Planisware sitemap](https://planisware.com/sitemap.xml)) |
| 2 | **Planview Portfolios / ProjectAdvantage (ex-Sciforma)** | Nummer 2, versterkt door de Sciforma-overname (2025) | 4.500+ klanten, 2,7 mln gebruikers, 1.300+ medewerkers ([planview.com/products](https://www.planview.com/products/)); Sciforma had "thousands of users in organizations across 22 countries" ([Planview](https://www.planview.com/acquisitions/about-sciforma/)) |
| 3 | **Wellspring Accolade (ex-Sopheon)** | Stage-gate/innovation management; farma-positionering verzwakt na de overname | Wellspring noemt Industrial Manufacturing, CPG, Defense/Aerospace, Chemical — **farma staat niet meer in de industrielijst** ([wellspring.com](https://www.wellspring.com/)) |
| 4 | **Oracle Instantis EnterpriseTrack / Primavera Portfolio Management** | Legacy-installaties, vooral waar Oracle-ELA's al liggen | Overheidsdata toont Oracle Primavera Portfolio Management-contracten tot $7,41 mln ([USAspending](https://api.usaspending.gov/)) |
| 5 | ServiceNow SPM, SAP, Broadcom Clarity | Genoemd als markleiders in de bredere PPM-markt, maar IT-gecentreerd, niet R&D-specifiek | [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market) |

**Tier 2 — Wat mensen feitelijk openhebben op hun scherm**

| # | Product | Waar | Prijs |
|---|---|---|---|
| 1 | **Microsoft Excel** | CMC, non-clinical, elke functie zonder eigen systeem | inbegrepen |
| 2 | **Microsoft Project** | Programma-niveau faseplanning door de program manager | Project Standard 2024 **$679,99** eenmalig; Project Professional 2024 **$1.129,99** eenmalig ([Microsoft](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software)) |
| 3 | **Smartsheet** | Clinical Operations teamplannen, study startup trackers | Business **$24/lid/maand** bij maandelijkse facturering, **$19/lid/maand bij jaarfacturering**; Pro $12 resp. $9; Enterprise en Advanced Work Management op offerte ([smartsheet.com/pricing](https://www.smartsheet.com/pricing)) |
| 4 | **CTMS (Veeva, Medidata)** | Executie van de trial, milestones en documenten — **geen CPM-planning** | zie §2.3 |

Dat Excel/MS Project/Smartsheet nog steeds de facto werkpaarden zijn, is niet mijn interpretatie maar Planisware's eigen verkoopargument (citaat in §1.2).

**Tier 3 — Capex/engineering (GMP-fabrieksbouw, C&Q, tech transfer)**

| # | Product | Gebruikers |
|---|---|---|
| 1 | **Oracle Primavera P6 (EPPM/Professional)** | EPC-aannemers en owner's engineers op farmafabrieken |
| 2 | **Microsoft Project** | Kleinere verbouwingen, single-site validatieprojecten |
| 3 | **Primavera Unifier / Cloud, InEight, Synchro** | Grote capex-programma's |

Bewijs uit werkelijke contractdata (USAspending.gov, alle award-types A/B/C/D, gesorteerd op waarde):

| Bedrag | Ontvanger | Opdrachtgever | Omschrijving |
|---|---|---|---|
| $10.679.437 | Primavera Systems, Inc. | Department of Defense | — |
| $8.929.010 | CDW Government LLC | Dept. of Transportation | "annual renewal of the AIT portion of the Oracle ELA licenses and Primavera software" |
| $7.408.098 | Mythics, LLC | Dept. of State | "Oracle Primavera Portfolio Management tool" |
| $4.896.075 | Affigent, LLC | Department of Defense | "USACE HQ — Oracle Primavera software licenses for PROMIS program office" |
| $4.464.806 | DLT Solutions, LLC | **HHS** | "technical support and maintenance for Primavera ProSight program" |

*Bron: [USAspending.gov API v2, spending_by_award](https://api.usaspending.gov/api/v2/search/spending_by_award/), geraadpleegd juli 2026.*

### 2.2 Wie gebruikt wat — rolverdeling

| Rol | Analoog in bouw | Typische tool | Opmerking |
|---|---|---|---|
| **Sponsor / farmaceut (opdrachtgever)** | Opdrachtgever | Planisware Enterprise (portfolio + LRP), MS Project (programma), Excel | Eigenaar van de pipeline en het budget; hoogste betalingsbereidheid |
| **Clinical Operations** | Uitvoerend team | CTMS (Veeva/Medidata) + Smartsheet | Milestone-tracking, geen CPM |
| **CRO (contract research organization)** | Hoofdaannemer | Eigen systemen + sponsorspecifieke rapportageformats | 1.100+ CRO's wereldwijd (2013); top 10 ≈ 55% marktaandeel ([Wikipedia CRO](https://en.wikipedia.org/wiki/Contract_research_organization)) |
| **CDMO / contract manufacturer** | Onderaannemer | ERP + MS Project; Planisware claimt #1 te zijn bij Contract Service Providers | "Over 300 Contract Pharma readers selected Planisware as the number one organizational software used by Contract Service Providers" (blind survey) ([Contract Pharma/Planisware infographic](https://planisware.com/resources/work-management-collaboration/contract-pharma-planisware-infographic)) |
| **Engineeringbureau / EPC (fabrieksbouw)** | Engineeringbureau | **Primavera P6**, Navisworks/Synchro, BIM | Hier ligt IFC-relevantie |
| **C&Q-consultancy** | Testbedrijf | Excel + P6-koppeling, validatiedocumentatie | ISPE-praktijk |

### 2.3 Belangrijke bevinding: CTMS ≠ planning

Veeva Clinical Operations bedient "more than 500 companies", waaronder Bayer, Biogen, GSK, Merck en Moderna ([veeva.com](https://www.veeva.com/products/clinical-operations/)). Veeva Study Startup beheert "feasibility, qualification, and activation of research sites"; Veeva CTMS levert "end-to-end study management and monitoring". Maar: **planning, tijdlijnen of resourceplanning worden op die pagina niet als functionaliteit genoemd.** CTMS's zijn milestone- en documentgedreven, niet netwerkplanning-gedreven.

Dat is precies waarom er een Planisware-laag bovenop bestaat, en precies waarom de MS Project/Excel-laag ernaast blijft bestaan. **Het CPM-gat in farma is echt en structureel.**

Medidata's HHS/NCI-contracten laten zien wat er in het CTMS/EDC-domein omgaat: $35,5 mln en $30,0 mln voor "hosting, maintenance and professional services for Rave" ([USAspending](https://api.usaspending.gov/)). Dat is een orde van grootte meer dan wat er aan PPM wordt uitgegeven — maar het is een andere markt.

---

## 3. Wat wordt ervoor betaald?

### 3.1 Wat we hard weten over Planisware's economie

Uit de [FY 2025 resultatenpresentatie (26 feb 2026)](https://planisware.com/sites/default/files/2026-02/20260226%20-%20Planisware%20-%20FY%202025%20results%20-%20Investors%20%26%20Analysts%20presentation%201.pdf):

| Metric | FY2025 | Groei |
|---|---|---|
| Totale omzet | **€198,0 mln** | +7,9% (+10,3% cc) |
| Terugkerende omzet | €179,7 mln (91%) | +12,8% cc |
| SaaS & Hosting | €93,7 mln | +16,7% cc |
| Evolutive support | €53,6 mln | +12,5% cc |
| Maintenance | €19,0 mln | +1,1% cc |
| Subscription support | €11,7 mln | +1,6% cc |
| Annual licenses | €1,7 mln | +69,0% cc |
| Perpetual licenses | €5,8 mln | **−21,3% cc** |
| Implementation & others | €12,5 mln | −3,7% cc |
| Non-recurring omzet (totaal) | €18,3 mln | −10,1% cc |
| Adj. EBITDA | €74,1 mln | marge 37,4% |
| Nettoresultaat | €50,0 mln | +17,0% |
| **Net Retention Rate** | **110%** | (2024: 117%) |
| **Churn** | **1,4%** | (2024: 2,0%) |
| Klanten | **± 650** blue-chip | |
| Gemiddelde tenure top-20 klanten | **11 jaar** | |
| Medewerkers | ± 850 | |

Per pijler (p.12):

| Pijler | FY2025 omzet | Aandeel | Groei cc |
|---|---|---|---|
| **Product Development & Innovation (waar farma zit)** | **€105,7 mln** | 53% | +10,9% |
| Project Controls & Engineering | €45,5 mln | 23% | +24,3% |
| IT Governance & Digital Transformation | €33,5 mln | 17% | +5,4% |
| Project Business Automation | €13,2 mln | 7% | −14,6% |

Q1 2026: **€51,0 mln**, +13,6% cc; doelstelling 2026 "low double-digit" groei in cc bij ~37% adj. EBITDA-marge ([Q1 2026 presentatie](https://planisware.com/sites/default/files/2026-04/Planisware%20-%20Q1%202026%20revenue%20-%20Investors%20%26%20Analysts%20presentation.pdf)).

### 3.2 Afgeleide prijspunten

**SCHATTING, afgeleid uit gepubliceerde cijfers:**

- **Gemiddelde jaarlijkse klantwaarde**: €198,0 mln / ~650 klanten = **≈ €305.000 per klant per jaar**. Dat is een gemiddelde over alles van Orchestra-midmarket tot Pfizer.
- **Blended prijs per gebruiker**: Planisware claimt "800,000 users who trust Planisware solutions" ([Planisware Enterprise](https://www.planisware.com/products/planisware-enterprise)). €198,0 mln / 800.000 = **≈ €248 per gebruiker per jaar blended**. Dit is laag omdat het merendeel light/viewer-seats zijn; power-user-seats liggen een veelvoud hoger.
- **Lijstprijs per named seat**: SelectHub noteert "Planisware starts at $45/month" ([SelectHub](https://www.selecthub.com/project-management/planisware/)) → **≈ $540/jaar**. *(GetApp en SoftwareAdvice tonen "$1 per user per year" — dat is duidelijk een placeholder en niet bruikbaar; ik neem het niet over.)*
  > **Correctie na verificatie (juli 2026):** SelectHub vermeldt "$45/month" **zonder** de eenheid "per user" te specificeren. De stap naar "$540 per *gebruiker* per jaar" is dus een eigen aanname, geen bronvermelding. Behandel dit cijfer als indicatief en niet als lijstprijs per seat. Onafhankelijke bevestiging van Planisware-seatprijzen is niet gevonden; de blended €248/gebruiker/jaar (afgeleid uit €198,0 mln / 800.000 gebruikers) is het enige cijfer dat volledig op gepubliceerde data rust.

**Wat een big-pharma-account waarschijnlijk kost (SCHATTING):** Novo Nordisk draait 1.350 Planisware-gebruikers ([planisware.com/customers](https://www.planisware.com/customers)). Bij een gemengde seatmix (say 250 power-seats à ~$500 + 1.100 light-seats à ~$150) kom je op **$290k–$500k per jaar aan pure abonnementskosten**, plus evolutive support. De grootste farma-accounts met meerdere pijlers en meerdere instanties zitten naar mijn inschatting op **€1–3 mln per jaar all-in**.

### 3.3 Werkelijke contractwaarden uit overheidsdata

Uit [USAspending.gov](https://api.usaspending.gov/api/v2/search/spending_by_award/) (alle historische awards, gesorteerd op waarde):

**Planisware USA, Inc.** — alle awards komen van het Department of Defense en betreffen het mid-market product Orchestra:

| Bedrag | Omschrijving |
|---|---|
| $119.120 | "Orchestra team licenses" |
| $64.000 | "Planisware Orchestra software support" |
| $63.181 | "Planisware license, quote date 8.19.2024" |
| $43.200 | "Software license and maintenance" |
| $29.568 | "Planisware Orchestra software" |
| $15.569 | "Annual maintenance service fee" |

**Sciforma Corporation** — $10.000 en $5.000 (Department of the Interior). Klein.

**Planview** — $823.702 (HHS, "Planview enterprise portfolio management tool"); $351.920 (VA, licenties + maintenance); $277.605 (Commerce, "Planview Enterprise One Standard").

**Interpretatie:** de Amerikaanse overheidscontracten zijn *niet* representatief voor farma-enterpriseaccounts (het zijn Orchestra-midmarketdeals), maar ze geven wel een harde ondergrens en bevestigen de prijsstructuur: licentie + jaarlijkse maintenance/support als aparte regel.

### 3.4 Implementatie- en trainingskosten

Planisware's non-recurring omzet (implementatie & overig) bedraagt **€12,5 mln op €198,0 mln = 6,3% van de omzet**, en **daalt** (−3,7% cc) "related to shorter implementations" ([FY2025, p.10](https://planisware.com/sites/default/files/2026-02/20260226%20-%20Planisware%20-%20FY%202025%20results%20-%20Investors%20%26%20Analysts%20presentation%201.pdf)).

Dat cijfer onderschat de werkelijke implementatiekosten sterk, omdat systemintegrators (Deloitte, Accenture, Capgemini, gespecialiseerde PPM-boutiques) het leeuwendeel doen. Vergelijkbaar bewijs: bij Planview-implementaties bij de Social Security Administration factureerde **Deloitte Consulting $381.848 en $349.593** voor migratie/procesinrichting in Planview ([USAspending](https://api.usaspending.gov/)) — dus systemintegratordiensten van dezelfde orde als de licentie zelf.

**SCHATTING implementatieratio in farma:** 1,0–2,0× de eerste jaarlicentie voor een greenfield-implementatie bij een grote farmaceut, hoger dan de industriegemiddelde 0,5–1,0× vanwege GxP-validatie (zie §5.3). Een €500k/jaar-abonnement kost dus realistisch **€500k–€1 mln aan implementatie in jaar 1**, plus doorlopende configuratie (Planisware's "Evolutive Support", €53,6 mln = 27% van de omzet, is precies dat: doorlopende betaalde configuratie).

Reviewers bevestigen de configuratie-intensiteit: "Tailoring the platform to organizational needs demands technical expertise and may require professional services" ([SelectHub](https://www.selecthub.com/project-management/planisware/)).

### 3.5 Betalingsbereidheid: HOOG — en waarom precies

**Oordeel: de hoogste in de gehele planningssoftwaremarkt, per gebruiker en per organisatie.**

Onderbouwing:

1. **De ROI-rekensom is triviaal gunstig.** $8 mln gederfde omzet per dag vertraging vs. een suite van €0,3–3 mln per jaar ([PMID 32126560](https://pubmed.ncbi.nlm.nih.gov/32126560/)).
2. **R&D is >15% van de netto-omzet** in farma — "by far the highest share" van alle sectoren ([Wikipedia, Pharmaceutical industry](https://en.wikipedia.org/wiki/Pharmaceutical_industry)). Op een wereldmarkt van ~$1,48 biljoen (2022, ibid.) is dat een R&D-pot van honderden miljarden. Planningssoftware is daarvan een verwaarloosbare fractie — geen budgettaire pijn.
3. **Kleverigheid en meerjarige binding.** Planisware's gemiddelde tenure bij de top-20 klanten is **11 jaar**; churn 1,4%; NRR 110% ([FY2025, p.21](https://planisware.com/sites/default/files/2026-02/20260226%20-%20Planisware%20-%20FY%202025%20results%20-%20Investors%20%26%20Analysts%20presentation%201.pdf)). Klantcohorten uit 2023 en 2024 groeien met respectievelijk +27% en +67% CAGR ([Q1 2026, p.7](https://planisware.com/sites/default/files/2026-04/Planisware%20-%20Q1%202026%20revenue%20-%20Investors%20%26%20Analysts%20presentation.pdf)) — land-and-expand werkt uitzonderlijk goed in deze sector.
4. **Brutomarge 73,8%** en adj. EBITDA-marge 37,4% ([FY2025, p.13/15](https://planisware.com/sites/default/files/2026-02/20260226%20-%20Planisware%20-%20FY%202025%20results%20-%20Investors%20%26%20Analysts%20presentation%201.pdf)) — de leverancier hoeft niet op prijs te concurreren.
5. **Compliance-lock-in.** Zodra een systeem GxP-gevalideerd is (§5.3), is vervangen duur en risicovol. Dat is een prijsverhogende, niet prijsverlagende, factor.

**Waar de betalingsbereidheid wél breekt:**
- Kleine biotechs (<50 medewerkers, pre-fase-2): die kopen Smartsheet of Excel en niets anders. De €300k+ instapdrempel van Planisware sluit ze uit.
- Value-for-money scoort bij Planisware 4,0/5 maar **ease of use 3,1/5 en customer support 2,7/5** ([GetApp](https://www.getapp.com/project-management-planning-software/a/planisware/)). Men betaalt met tegenzin voor het ecosysteem, niet uit liefde voor het product.

---

## 4. Hoe groot is dit segment?

### 4.1 Referentiepunten uit analistenonderzoek

De bredere PPM-markt ([Mordor Intelligence, PPM market report](https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market)):

| Metric | Waarde |
|---|---|
| PPM-markt 2025 (basisjaar) | **USD 6,90 mrd** |
| PPM-markt 2026 | **USD 7,69 mrd** — ⚠ *niet door Mordor gepubliceerd; door mij afgeleid als 6,90 × 1,1143* |
| PPM-markt 2031 | USD 13,21 mrd |
| CAGR **2026–2031** | 11,43% |
| Cloudaandeel 2025 | 69,45% (CAGR 16,85%) |
| Grote ondernemingen | 60,30% van de uitgaven |
| Grootste verticaal | IT/telecom, 35,60% |
| **Snelst groeiende verticaal** | **Healthcare & life sciences, 13,58% CAGR** |
| Noord-Amerika | 39,40% van de omzet 2025 |

Dat healthcare/life sciences de **snelst groeiende verticaal** is, is het belangrijkste marktcijfer in dit rapport.

> **Verificatienoot (juli 2026).** Herfetch van de Mordor-pagina bevestigt: USD 6,90 mrd (2025), USD 13,21 mrd (2031), 11,43% CAGR, IT/telecom 35,60%, healthcare & life sciences snelst groeiend met 13,58% CAGR. Twee correcties: (a) Mordor labelt de CAGR-periode als **2026–2031**, niet 2025–2031; (b) de USD 7,69 mrd voor 2026 staat **niet** in de bron — dat is mijn eigen extrapolatie van het basisjaar met de forecast-CAGR, en die CAGR geldt formeel pas vanaf 2026. Alle bedragen die op deze 7,69 mrd zijn gebouwd (route A) erven dus een extra, ongepubliceerde stap.

### 4.2 Segmentschatting — twee onafhankelijke routes

#### Route A: top-down uit de PPM-markt

PPM-markt 2026 = $7,69 mrd. Mordor geeft IT/telecom op 35,60% maar publiceert geen expliciet life-sciences-aandeel.

**SCHATTING:** healthcare & life sciences ≈ **8–11%** van de PPM-markt. Redenering: na aftrek van de overige verticalen laat de restpost ongeveer 8–12% over voor life sciences; en Planisware — de sectorleider — haalt zelf ongeveer een derde van zijn omzet uit life sciences terwijl hij hooguit enkele procenten van de totale PPM-markt heeft.

> **Correctie na verificatie (juli 2026).** De oorspronkelijke formulering ("de vier gerapporteerde verticalen … na aftrek van BFSI, manufacturing, energie, overheid en construction") gaf de bron verkeerd weer. Mordor segmenteert in **zeven benoemde verticalen plus "Others"**: IT & telecom, healthcare & life sciences, manufacturing, construction & engineering, retail & consumer goods, BFSI, government & public sector. Er is **geen** aparte energie-verticaal, en het zijn er geen vier. Belangrijker: Mordor **publiceert alleen het aandeel van IT/telecom (35,60%)** — voor healthcare & life sciences geeft de bron uitsluitend een groeivoet (13,58% CAGR), géén omzetaandeel. De 8–11% is daarmee volledig mijn eigen aanname zonder enige verankering in de bron, niet een restpostberekening. Route A is hierdoor zwakker onderbouwd dan de oorspronkelijke tekst suggereerde.

→ **$0,62–0,85 mrd (≈ €0,54–0,74 mrd bij EUR/USD 1,1377) voor de bredere healthcare/life-sciences PPM-markt in 2026.**

Maar dat omvat ziekenhuizen, zorgverzekeraars en medtech-IT. Farma/biotech/R&D **specifiek** is naar mijn inschatting **55–70%** daarvan → **$0,34–0,59 mrd (≈ €0,30–0,52 mrd)**.

> **Let op de opeenstapeling.** Route A is: één gepubliceerd basisjaar × een geëxtrapoleerd 2026-cijfer × een ongepubliceerd verticaalaandeel (8–11%) × een ongepubliceerd subaandeel (55–70%). Drie van de vier stappen zijn eigen aannames. Route A is dus geen onafhankelijke bevestiging van route B maar hooguit een plausibiliteitstoets; beide routes zijn bovendien op dezelfde Planisware-cijfers gekalibreerd en daarmee **niet werkelijk onafhankelijk**.

#### Route B: bottom-up (bedrijven × planners × prijs)

**Populatie (SCHATTING, opgebouwd uit gepubliceerde gegevens):**

| Segment | Aantal organisaties | Onderbouwing |
|---|---|---|
| Top-25 farmaceuten | 25 | [Wikipedia, largest biomedical companies](https://en.wikipedia.org/wiki/List_of_largest_biomedical_companies_by_revenue): J&J $94,19 mrd t/m Sanofi $52,15 mrd (2025) |
| Grote/midcap farma + large biotech | ~75 | schatting |
| Klinisch-actieve midcap biotech | ~300 | schatting |
| Kleine biotech / preclinical | ~800+ | schatting |
| CRO's | ~1.100 wereldwijd (2013), top-10 ≈55% aandeel (2009-cijfer) | [Wikipedia CRO](https://en.wikipedia.org/wiki/Contract_research_organization) |
| CDMO's / contract manufacturers | ~200 relevant | schatting |

Planisware bedient hiervan "over 50 top life science organizations" ([brochure](https://planisware.com/resources/selecting-tool/brochure-planisware-life-sciences)) — d.w.z. praktisch de volledige top-100.

**Berekening (SCHATTING, alle bedragen jaarlijks):**

| Segment | Aantal | Gem. software-uitgave/jaar | Subtotaal |
|---|---|---|---|
| Top-25 farma (multi-pijler, multi-instantie) | 25 | €1,5 mln | €37,5 mln |
| Grote/midcap farma + large biotech | 75 | €400k | €30,0 mln |
| Klinisch-actieve midcap biotech | 300 | €100k | €30,0 mln |
| Kleine biotech (Smartsheet/MSP-niveau) | 800 | €25k | €20,0 mln |
| CRO's + CDMO's + medtech-R&D | 150 | €250k | €37,5 mln |
| **Subtotaal dedicated R&D-portfolio-/planningssoftware** | | | **≈ €155 mln** |

*Rekencontrole (juli 2026): 37,5 + 30,0 + 30,0 + 20,0 + 37,5 = **€155,0 mln**. De optelling klopt exact.*

> **Interne inconsistentie (gesignaleerd bij verificatie).** De populatietabel hierboven telt **~1.100 CRO's + ~200 CDMO's ≈ 1.300 organisaties**, maar de berekening rekent met slechts **150**. Dat is een impliciete haircut van ~88% die nergens wordt verantwoord. De haircut is inhoudelijk verdedigbaar (het overgrote deel van die 1.300 zijn kleine, lokale of niche-CRO's die geen dedicated PPM-suite kopen), maar zoals het er stond leest de populatietabel als onderbouwing van een getal dat er niet uit volgt. Als je in plaats daarvan 300 in plaats van 150 organisaties zou nemen, stijgt route B naar €192,5 mln — wat laat zien hoe gevoelig deze regel is. Behandel de €155 mln als een punt in een band van grofweg **€130–200 mln**, niet als een puntschatting.

Sanity check tegen Planisware: als Planisware ~35% van zijn €198 mln uit life sciences haalt (**SCHATTING**, gebaseerd op het feit dat farma de historische kern van de PD&I-pijler van €105,7 mln is), dan is dat **≈ €69 mln**, oftewel ~45% van de €155 mln. Dat is een plausibel marktaandeel voor een erkende categorieleider met 50+ van de top life-sciences-organisaties.

> **Kritiek op de 35%-aanname (toegevoegd bij verificatie).** 35% van de totale omzet is **65,6% van de gehele PD&I-pijler** (€69,3 mln op €105,7 mln). Dat wringt met Planisware's eigen etalage: de PD&I-pijler bevat aantoonbaar ook grote non-farma-logo's — PepsiCo, Ford, Philips, ABB, Primark staan alle op [planisware.com/customers](https://www.planisware.com/customers), en Planisware's marketing zet zwaar in op CPG, automotive en high-tech. Een aandeel van **20–30%** (≈ €40–60 mln) is daarom minstens even plausibel als 35%. Bij 25% zakt het impliciete marktaandeel naar ~32% van €155 mln in plaats van ~45%. De sanity check bevestigt de orde van grootte, maar de precisie die "~45% marktaandeel" suggereert is er niet. De oorspronkelijke conclusie "**de twee routes zijn consistent**" is te sterk: het is een niet-weerlegging, geen bevestiging.

**Daarbij op te tellen:**

| Component | SCHATTING/jaar | Redenering |
|---|---|---|
| Implementatie + configuratie + training (geannualiseerd) | €65–95 mln | 40–60% van de licentiewaarde; Planisware's eigen evolutive support is al 27% van zijn omzet |
| Generieke planningsseats binnen farma-R&D (MS Project, Smartsheet, Excel-add-ons) | €50–140 mln | 250.000–400.000 seats × €150–400/jaar |
| Farma-capex/engineering-scheduling (Primavera P6, Unifier, Synchro, InEight) bij owners + EPC's + C&Q | €40–80 mln | contractevidence tot $10,7 mln per overheidsdeal; farma-capexboom |

### 4.3 Eindschatting

> **SCHATTING — segmentomvang "planningssoftware voor farma, biotech en R&D", 2026:**
> **€305 – €515 miljoen per jaar (≈ USD 350 – 585 miljoen)** aan totale uitgaven aan planningssoftware plus bijbehorende implementatie/configuratiediensten.
> *(Gecorrigeerd juli 2026 — zie de rekencorrectie direct onder deze box. De eerder gepubliceerde band was €310–470 mln / USD 340–520 mln.)*
>
> Daarvan:
> - **€150 – €200 mln** dedicated R&D-portfolio-/resourceplanningssoftware (abonnementen/licenties)
> - **€65 – €95 mln** implementatie, configuratie, validatie en training
> - **€50 – €140 mln** generieke planningsseats binnen farma
> - **€40 – €80 mln** capex/engineering-scheduling voor GMP-faciliteiten
>
> **Groeirichting: sterk positief.** Healthcare & life sciences is de snelst groeiende PPM-verticaal met **13,58% CAGR** ([Mordor](https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market)); de sectorleider groeit met +10,3% cc (FY2025) versnellend naar +13,6% cc (Q1 2026) ([Planisware IR](https://www.planisware.com/investors)).

> **REKENCORRECTIE (juli 2026) — de oorspronkelijke eindschatting telde niet op.**
>
> | | Ondergrens | Bovengrens |
> |---|---|---|
> | Dedicated R&D-portfolio-/resourceplanningssoftware | €150 mln | €200 mln |
> | Implementatie, configuratie, validatie, training | €65 mln | €95 mln |
> | Generieke planningsseats binnen farma | €50 mln | €140 mln |
> | Capex/engineering-scheduling GMP | €40 mln | €80 mln |
> | **Som** | **€305 mln** | **€515 mln** |
> | *Oorspronkelijk vermeld* | *€310 mln* | *€470 mln* |
>
> De bovengrens was **€45 mln (9,6%) te laag** opgeteld; de ondergrens €5 mln te hoog. De componenten zijn ongewijzigd gelaten en de kopregel is naar de werkelijke som gecorrigeerd. *(Kanttekening: naïef optellen van boven- en ondergrenzen overdrijft de spreiding — de kans dat alle vier componenten tegelijk hun maximum halen is klein. Wie een realistischer band wil, moet de componenten stochastisch combineren; de €515 mln is een harde bovengrens, geen verwachtingswaarde.)*
>
> **Valutacorrectie.** De omrekening €310–470 mln → "USD 340–520 mln" impliceerde EUR/USD ≈ 1,10. De werkelijke koers op 24 juli 2026 is **EUR/USD 1,1377** ([Frankfurter/ECB](https://api.frankfurter.dev/v1/latest?base=EUR&symbols=USD)). Correct omgerekend is €305–515 mln gelijk aan **USD 347–586 mln**, afgerond USD 350–585 mln. Dezelfde koersfout zit in §4.2 route A ("$0,62–0,85 mrd ≈ €0,57–0,78 mrd" moet €0,54–0,74 mrd zijn); daar gecorrigeerd.
>
> **Let ook op de bovengrens van de eerste regel.** Route B levert €155 mln op en route A €0,30–0,52 mrd voor het *totaal*; nergens in §4.2 wordt de **€200 mln** bovengrens voor de dedicated-softwarecomponent afgeleid. Dat getal komt uit de lucht vallen. Zie de bandbreedte €130–200 mln die ik in §4.2 heb toegevoegd — daarmee is €200 mln wél verdedigbaar, maar dat moest expliciet gemaakt worden.

**Niet meegerekend (bewust):** CTMS/EDC-platforms (Veeva, Medidata). Dat is een aangrenzende markt van meerdere miljarden — Medidata alleen al haalde $35,5 mln uit één HHS/NCI-contract ([USAspending](https://api.usaspending.gov/)) — maar het is klinische-datamanagement, geen netwerkplanning.

**Onzekerheidsmarge:** ±35%. *(Consistentienoot: de gecorrigeerde band €305–515 mln rond een middelpunt van €410 mln is zelf ±26%. De ±35% is dus ruimer dan de eigen band en fungeert als extra veiligheidsmarge bovenop de componentspreiding — niet als beschrijving ervan.)* De grootste onzekerheid zit in het life-sciences-aandeel van Planisware's omzet (niet gepubliceerd; Planisware rapporteert per pijler en geografie, niet per verticaal) en in het aantal generieke planningsseats.

---

## 5. Sector-specifieke eisen en standaarden

### 5.1 EVMS / EIA-748 — beperkt, maar reëel via overheidsgefinancierde ontwikkeling

Commerciële farma kent **geen** verplichte EVMS. Maar de moment dat de Amerikaanse overheid meebetaalt aan ontwikkeling, verandert dat:

**FAR 34.201** ([acquisition.gov/far/34.201](https://www.acquisition.gov/far/34.201)):
> "An Earned Value Management System (EVMS) is required for major acquisitions for development, in accordance with OMB Circular A-11."

en:
> "If the offeror proposes to use a system that has not been determined to be in compliance with the Electronic Industries Alliance Standard 748 (EIA-748), the offeror shall submit a comprehensive plan for compliance."

Belangrijk detail dat vaak verkeerd wordt geciteerd: **FAR 34.201 noemt geen dollargrens** (die staat in OMB Circular A-11), en:
> "Offerors shall not be eliminated from consideration for contract award because they do not have an EVMS that complies with these standards."

**Waar dit farma raakt:**
- **BARDA/ASPR** — beheert een contractportefeuille "valued at over $60 Billion" met ongeveer "$1.7 billion in spends annually" ([medicalcountermeasures.gov/barda](https://medicalcountermeasures.gov/barda/)). Vaccin- en medische-tegenmaatregelenontwikkeling onder BARDA-contract valt onder federale acquisitieregels.
- **NIH/NCI-gefinancierde trialnetwerken**.
- **Operation Warp Speed-achtige constructies** (DoD-betrokkenheid → volledige DoD-acquisitiediscipline).

### 5.2 DCMA-scheduleassessment — verouderd referentiekader

De veelgenoemde **"DCMA 14-point schedule assessment"** is een legacy-instrument. Op de huidige [DCMA EVMS-pagina](https://www.dcma.mil/HQ/EVMS/) wordt de 14-point assessment **niet meer genoemd**. In plaats daarvan publiceert DCMA:

- Business Practices BP0–BP8, met **BP4 – EVMS Surveillance** (herzien 4 november 2025)
- **Compliance Metric Templates v8.1**
- **Metrics Tracking & Data Artifact List v8.1**
- **DECM Tiered Prioritization v8.1** (Data-driven EVM Compliance Metrics)

**Implicatie voor een planningstool die federale/farma-defensiewerk wil ondersteunen:** de doelstandaard is niet meer "14 checks" maar de DECM-metriekset. Wie DCMA-compatibiliteit claimt op basis van de 14 punten, loopt achter.

### 5.3 De écht bindende standaarden in farma: GxP, 21 CFR Part 11, GAMP 5

Dit is waar farma fundamenteel afwijkt van elke andere sector in dit onderzoek.

**21 CFR Part 11** ([Wikipedia, Title 21 CFR Part 11](https://en.wikipedia.org/wiki/Title_21_CFR_Part_11)) definieert wanneer elektronische records en handtekeningen "trustworthy, reliable, and equivalent to paper records" zijn. Verplicht:
- **Audit trails** van alle systeemactiviteit
- **Systeemvalidatie** die correcte werking aantoont
- **Elektronische handtekeningen** met bijbehorende controls
- **Toegangsbeheer** via identificatiecodes en wachtwoorden
- Documentatie van software en systemen die gereguleerde data verwerken

Reikwijdte: farmaceutische fabrikanten, medische-hulpmiddelenfabrikanten, biotech/biologics, **CRO's** en andere FDA-gereguleerde entiteiten. De regel geldt alleen waar "predicate rules" recordretentie voorschrijven.

**Consequentie voor leveranciers** (letterlijk uit dezelfde bron): "Vendors selling into pharma must ensure their systems support Part 11 compliance features."

**GAMP 5** (ISPE) — "A Risk-Based Approach to Compliant GxP Computerized Systems" ([Wikipedia, GAMP](https://en.wikipedia.org/wiki/Good_automated_manufacturing_practice)), met als kernprincipe: "quality cannot be tested into a computerized system but must be built into the system at each stage of the life cycle."

**Praktische impact:** een planningssysteem dat GxP-relevante beslissingen vastlegt (bijv. batch release timing, stabiliteitsstudieplanning, IMP-distributie) moet gevalideerd worden. Dat betekent IQ/OQ/PQ-documentatie, change control, en een leverancieraudit. **Dit is de grootste toetredingsbarrière in de sector — groter dan functionaliteit.**

Wel belangrijke nuance: R&D-portfolioplanning zelf is doorgaans **niet** GxP-kritisch (het is business planning, geen batchrecord). De GxP-eis bijt vooral bij CMC/supply-chain-planning en bij capex/C&Q. Een open-source planner kan dus prima beginnen in het niet-GxP-deel.

### 5.4 Capex-standaarden: ISPE, AACE, PDRI

Voor GMP-fabrieksbouw hanteert de sector ISPE-praktijken ([ispe.org/topics/project-management](https://ispe.org/topics/project-management)):

- **Good Practice Guide: Project Management for the Pharmaceutical Industry**
- **Good Practice Guide: Good Engineering Practice (2nd Edition)**
- **Good Practice Guide: Technology Transfer (3rd Edition)**
- **Good Practice Guide: Management of Engineering Standards**
- Commissioning & Qualification (C&Q) als "Integrated Value-Driven Activity"
- **Project Definition Rating Index (PDRIx)** — de CII/AACE-praktijk voor scope-definitie, expliciet toegepast op "Mega-Scale Project Execution Challenges"
- Een eigen *Pharma Facilities Project Management Training Course*

ISPE benoemt schedule management expliciet in termen van "unrealistic deadlines, scope creep, resource constraints" (ibid.).

**AACE-praktijken** (RP 10S-90 kostenclassificatie, RP 52R-06 schedule risk, RP 29R-03 forensic schedule analysis) zijn hier de facto standaard via de EPC-aannemers, niet via de farmaceut zelf.

### 5.5 Verplichte leveringsformaten

| Domein | Formaat | Status |
|---|---|---|
| Farma R&D-portfolio | **Geen** brancheformaat | Uitwisseling via REST API's; Planisware biedt "Open REST API" ([Planisware Enterprise](https://www.planisware.com/products/planisware-enterprise)) |
| Klinische data | CDISC (SDTM, ADaM, define.xml) | Verplicht voor FDA/PMDA-submissies — maar dit is dátaformaat, geen planningsformaat |
| Regulatory submissie | eCTD | Verplicht |
| Capex/engineering | **XER, P6 XML** | De facto via EPC-contracten |
| Bouwmodellen GMP-faciliteiten | **IFC (ISO 16739)** | Groeiend; van toepassing op de capex-kant |

**Kritieke bevinding: er bestaat geen open, neutraal uitwisselingsformaat voor farma-R&D-planningen.** Er is geen XER-equivalent. Elke integratie is een puntoplossing. Dat is tegelijk een barrière (geen standaard om op aan te sluiten) en een kans (er is niets om tegen te concurreren).

### 5.6 Audits en claims/forensische analyse

- **Regelgevende audits**: FDA/EMA GMP- en GCP-inspecties raken planningssystemen alleen als die GxP-records bevatten.
- **Claims/forensische schedule-analyse**: gebruikelijk in de **capex-keten** (EPC-geschillen over GMP-fabrieken), zelden in R&D — daar zijn de contracten fee-for-service (CRO) of milestone-gebaseerd, niet schedule-gebaseerd.
- **Interne governance-audits**: stage-gate-compliance en portfolio-review-audits zijn wel routine. Planisware ondersteunt "Earned Value and Stage-Gate methodology" ([Planisware Enterprise](https://www.planisware.com/products/planisware-enterprise)).

---

## 6. Voor- en nadelen van de gebruikte pakketten in deze sectorcontext

### 6.1 Planisware Enterprise

**Werkt goed hier:**
- **De enige met echte PTRS/efficient-frontier-portfoliomath.** "Efficient Frontier" om te "focus resources on therapies with the greatest probability of success", plus Monte Carlo en PTRS ([industries/pharma](https://www.planisware.com/industries/pharma)). Geen enkele bouwplanner heeft dit; geen enkele generieke PPM-tool doet het zo diep.
- **Resource-bottleneck-modellering op rolniveau**: "Resource Bottleneck and Supply vs. Demand vs. Capacity views", parametrische schatting en schatting naar analogie ([Planisware Enterprise](https://www.planisware.com/products/planisware-enterprise)).
- **Klinische supply chain geïntegreerd met trialplanning** — volumes per land per stage (API/DP/Assembly/Packaging), scenario's op enrolment-afwijkingen ([clinical supply chain](https://planisware.com/resources/product-capabilities/planisware-enterprise-optimizing-clinical-supply-chain-management)).
- **Domeincredibiliteit**: 12+ jaarlijkse Life Sciences Summits sinds ten minste 2012 ([Planisware sitemap](https://planisware.com/sitemap.xml)); Gartner-Leader in de Magic Quadrant for Adaptive Project Management & Reporting 2022 (16 leveranciers beoordeeld op 15 criteria) ([Planisware](https://planisware.com/resources/selecting-tool/planisware-named-leader-gartner%C2%AE-adaptive-project-management-quadrant%E2%84%A2)).
- **Financiële stabiliteit**: €196 mln nettokaspositie, geen financiële schuld ([FY2025, p.18](https://planisware.com/sites/default/files/2026-02/20260226%20-%20Planisware%20-%20FY%202025%20results%20-%20Investors%20%26%20Analysts%20presentation%201.pdf)). In een sector die 10-jarige systeembindingen aangaat, telt dat zwaar.

**Wringt hier:**
- **Bruikbaarheid**: ease of use 3,1/5 en customer support 2,7/5 ([GetApp](https://www.getapp.com/project-management-planning-software/a/planisware/)). Een reviewer: het systeem "is not intuitive and not-user friendly making adoption/acceptance challenging" ([SoftwareAdvice](https://www.softwareadvice.com/project-management/planisware-profile/)).
- **Steile leercurve**: "The extensive feature set creates a steep learning curve, potentially overwhelming new users" ([SelectHub](https://www.selecthub.com/project-management/planisware/)).
- **Configuratieafhankelijkheid als business model**: Evolutive Support is €53,6 mln = 27% van de omzet. Elke wijziging aan het model is in de praktijk een betaalde opdracht. Dat is precies de klacht die klanten in andere sectoren "vendor lock-in" noemen.
- **Prijsdrempel sluit de long tail uit.** Bij een gemiddelde klantwaarde van ~€305k/jaar (afgeleid, §3.2) is de hele populatie van 800+ kleine biotechs onbereikbaar.
- **De schedulingmotor is de zwakke plek, niet de portfoliomotor.** Planisware biedt "advanced Gantt chart engine, PERT diagram, and the means to construct the WBS" — maar farma-program managers houden hun échte faseplan in MS Project (§1.2). Het detailplanniveau blijft elders.
- **De MS Project/Primavera-integratie wordt niet als kerncapability gepresenteerd** op de productpagina.

### 6.2 Planview (incl. Sciforma/ProjectAdvantage)

**Werkt goed:** breedte (16 productlijnen), 4.500+ klanten, 2,7 mln gebruikers ([planview.com/products](https://www.planview.com/products/)); sterke IT-PMO- en agile-integratie.

**Wringt:** Planview's zwaartepunt is **IT-portfolio en agile delivery**, niet drug development. De Sciforma-overname wordt door Planview zelf gemotiveerd met "expanded presence in Europe" en "IT PMOs and product development teams to public sector agencies" — **life sciences wordt niet genoemd** ([Planview](https://www.planview.com/acquisitions/about-sciforma/)). Voor bestaande Sciforma-klanten in farma betekent dit productmigratierisico (Sciforma Vantage → Planview ProjectAdvantage) en onzekerheid over roadmapprioriteit.

### 6.3 Microsoft Project

**Werkt goed:** universeel, goedkoop (Project Standard 2024 $679,99 eenmalig; Professional $1.129,99, [Microsoft](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software)), echte CPM-motor, iedereen kan het lezen, geen inkoopgesprek nodig.

**Wringt:** geen portfolio-rollup over honderden programma's; geen PTRS/NPV; geen resourcecapaciteit over functies heen; geen audit trail voor Part 11; en het levert precies de silo-toestand op die Planisware in zijn marketing beschrijft. Project Server Subscription Edition bestaat nog maar wordt niet meer geprijsd op de publieke pagina ("pricing not listed; requires contacting a partner", ibid.) — een signaal dat Microsoft de zware PPM-markt heeft verlaten ten gunste van Planner.

### 6.4 Smartsheet

**Werkt goed:** extreem lage adoptiedrempel, uitstekend voor study-startup-trackers en site-activatielijsten, Business-plan à **$24/lid/maand** ([smartsheet.com/pricing](https://www.smartsheet.com/pricing)), "over 85% of the 2024 Fortune 500" ([Vista](https://www.vistaequitypartners.com/news/blackstone-and-vista-equity-partners-complete-acquisition-of-smartsheet/)).

**Wringt:** het is een grid, geen scheduler. Geen echte CPM, geen kalenderrekenen op resourceniveau, geen baselinevergelijking die een auditor accepteert. Het verspreidt zich viraal binnen Clinical Ops en creëert daarmee schaduw-planningen naast het officiële systeem. Bovendien: sinds januari 2025 in private-equityhanden (Blackstone + Vista, $8,4 mrd) — historisch gaat dat gepaard met prijsverhogingen en herverpakte tiers.

### 6.5 CTMS (Veeva, Medidata)

**Werkt goed:** onmisbaar voor trial-executie, TMF, monitoring; Veeva claimt "45% faster to enroll the first subject after site initiation" ([veeva.com](https://www.veeva.com/products/clinical-operations/)).

**Wringt:** **geen planningsmotor.** Milestones en documenten, geen netwerklogica. Ze concurreren niet met een planner — ze zijn een integratiedoelwit.

### 6.6 Primavera P6 (capex-kant)

**Werkt goed:** de standaard voor GMP-fabrieksbouw; contractwaarden tot $10,7 mln in overheidsdata; XER/P6 XML als lingua franca met EPC's.

**Wringt:** Oracle-licentiemodel en ELA-bundeling (zie de $8,93 mln "Oracle ELA licenses and Primavera software"-post bij DOT, [USAspending](https://api.usaspending.gov/)); geen enkele koppeling met de R&D-portfolio-kant; en de farmaceut-als-owner zit vaak vast aan het schema-formaat van zijn aannemer.

---

## 7. Openingen — waar wringt het, en wat betekent dat voor een open-source, IFC-gebaseerde planner?

### 7.1 De gedocumenteerde onvrede

| Klacht | Bron |
|---|---|
| Planisware ease of use 3,1/5 | [GetApp](https://www.getapp.com/project-management-planning-software/a/planisware/) |
| Planisware customer support 2,7/5 | idem |
| "Not intuitive and not-user friendly making adoption/acceptance challenging" | [SoftwareAdvice](https://www.softwareadvice.com/project-management/planisware-profile/) |
| "Steep learning curve, potentially overwhelming new users" | [SelectHub](https://www.selecthub.com/project-management/planisware/) |
| "Customization... demands technical expertise and may require professional services" | idem |
| Planningen leven in vier onverbonden tools (MS Project + Smartsheet + CTMS + Excel) | [Planisware zelf](https://planisware.com/resources/product-roadmapping/cross-functional-planning-drug-development) |
| "Most companies experience growing pains when trying to implement top-down project management"; "all companies are eager for tools and guidance to make the resource optimization process easier" | [Planisware workshopverslag](https://planisware.com/resources/resource-management-capacity-planning/key-planning-trends-pharmaceutical-industry) |
| "Bad data is a cancer for good decisions" | [Planisware](https://planisware.com/resources/resource-management-capacity-planning/5-key-metric-categories-pharma-resource-and) |

### 7.2 De structurele gaten

**Gat 1 — Er is geen open uitwisselingsformaat voor farma-planningen.**
Waar bouw XER/P6 XML/IFC heeft en klinische data CDISC heeft, heeft farma-R&D-planning **niets**. Elke sponsor-CRO-uitwisseling, elke tool-naar-tool-migratie is maatwerk. Dit is het scherpste gat in de hele sector.

**Gat 2 — De middenmarkt is onbediend.**
Planisware's instapdrempel (~€305k gemiddelde klantwaarde, §3.2) sluit ~800 kleine en ~300 midcap biotechs uit. Die gebruiken Smartsheet + Excel en hebben geen enkel CPM-instrument. Tegelijk zijn dat de bedrijven met de hoogste vertragingsgevoeligheid per euro cash runway.

**Gat 3 — Configuratie is een betaalde dienst, geen gebruikersvaardigheid.**
27% van Planisware's omzet is doorlopende configuratie. Een tool waarin de klant zelf zijn model kan aanpassen — met een extensiesysteem, niet met consultants — heeft daar een structureel argument.

**Gat 4 — De capex-kant en de R&D-kant praten niet met elkaar.**
Een fase-3-succes vereist commerciële productiecapaciteit die 3–5 jaar bouwtijd heeft. De GMP-fabrieksplanning zit in Primavera P6 bij de EPC; de trialplanning zit in Planisware bij de sponsor. Er is geen brug. **Dit is exact waar IFC relevant wordt.**

**Gat 5 — Data-soevereiniteit.**
Pipelineplanning is de meest concurrentiegevoelige data die een farmaceut bezit. SaaS-only leveranciers (Planisware: SaaS & Hosting is 47% van de omzet en groeit met +16,7%) dwingen die data naar de cloud. Een lokaal draaiende, open-source planner met een leesbaar bestandsformaat is hier een reëel differentiator-argument — niet als ideologie maar als inkoopeis.

### 7.3 Concrete kansen voor een open-source, IFC-gebaseerde planner

**Rangorde naar haalbaarheid × waarde:**

**A. Farma-capex / GMP-facility delivery — dit is de directe fit. Prioriteit 1.**
- Het planningsobject *is* een gebouw. IFC is native. Alle bestaande OPS-architectuur (IFC 4.3 als projectformaat, CPM-solver, kalendermotor, Gantt-renderer) sluit hier één-op-één aan.
- Deelnemers: farmaceut-als-opdrachtgever, EPC (Exyte, Jacobs, IPS, CRB), C&Q-consultancies, equipmentleveranciers.
- Standaardenaansluiting: ISPE Good Engineering Practice, PDRIx, AACE. Verplicht uitwisselingsformaat: XER/P6 XML (import/export nodig) + IFC (al aanwezig).
- Markt: **SCHATTING €40–80 mln/jaar** (§4.2), maar met veel hogere winbaarheid dan het R&D-portfoliodomein, omdat er geen Planisware-achtige incumbent zit en de EPC-keten al gewend is aan bestandsuitwisseling.
- Concreet ontbrekend in OPS: XER- en P6 XML-import/export; C&Q-specifieke WBS-templates; koppeling van IFC-objecten aan qualification-status (IQ/OQ/PQ per systeem).

**B. Tech transfer en site-to-site productieoverdracht.**
- ISPE heeft hier een eigen Good Practice Guide (3e editie). Het is een terugkerend, sterk gestandaardiseerd projecttype met een vaste WBS, dat vandaag in Excel en MS Project wordt gedaan. Een open sjabloonbibliotheek zou hier direct waarde leveren.

**C. Een open uitwisselingsformaat voor R&D-programmaplanningen (lange termijn, hoge impact).**
- Als IFC 4.3 al taken, sequenties, resources en toewijzingen kan dragen (wat OPS' persistentiemodel is), dan is een farma-profiel daarop denkbaar: fase/gate-structuur, PTRS per tak, functieresources. Dat zou het eerste neutrale formaat in de sector zijn.
- Realistisch is dit een meerjarig standaardisatietraject, niet een productfeature. Maar het is wél het enige gat waar niemand anders aan werkt.

**D. Midmarket-biotech: gratis CPM waar nu alleen Excel staat.**
- 800+ kleine biotechs, geen budget voor Planisware, wél de hoogste vertragingsgevoeligheid. Een gratis, lokaal draaiende planner met fatsoenlijke resource-levelling is hier concurrerend met *niets*.
- Vereist: extreem lage drempel (browserbuild — die er al is), begrijpelijke Gantt, geen inkooptraject.

**E. Wat je NIET moet proberen.**
- Concurreren met Planisware op portfolio-optimalisatie (efficient frontier, PTRS-gewogen NPV, Monte Carlo over een pipeline). Dat is 30 jaar domeinmodellering en het is niet waar een IFC-gebaseerde planner sterk in is.
- GxP-gevalideerde CMC/supply-chain-planning. De validatiedrempel (§5.3) is prohibitief voor een open-source project zonder leverancierentiteit die een audit kan doorstaan.
- CTMS-functionaliteit. Verzadigde markt, Veeva/Medidata, verkeerde discipline.

### 7.4 Positioneringsadvies in één zin

> Ga farma binnen via de **fabriek**, niet via de **pijplijn**: GMP-capexprojecten zijn IFC-native, hebben geen dominante incumbent aan de owner-kant, sluiten aan op de bestaande OPS-motor, en zijn de brug waarvan de sector zelf erkent dat hij ontbreekt tussen R&D-portfolio en commerciële productiecapaciteit.

---

## 8. Samenvattende tabel: software in deze sector

| Product | Rol in farma | Positie | Prijsindicatie |
|---|---|---|---|
| **Planisware Enterprise** | R&D-portfolio, resource-, LRP-, klinische supply-chain-planning | **Marktleider**, 50+ top life-science-organisaties | ~€305k gem./klant/jaar (afgeleid); ~€248/gebruiker/jaar blended (afgeleid); SelectHub "vanaf $45/maand" — eenheid niet gespecificeerd |
| **Planview Portfolios / ProjectAdvantage** | Portfolio + IT-PMO; ex-Sciforma | Nummer 2, farma-focus verzwakt | $278k–$824k per publieke-sectorcontract |
| **Microsoft Project** | Programmafaseplan door de PM | De facto standaard voor het detailplan | $679,99 / $1.129,99 eenmalig (2024-versies) |
| **Smartsheet** | Clinical Ops-trackers, study startup | Breed en viraal | $24/lid/maand (Business, maandelijks) / $19 bij jaarfacturering |
| **Excel** | CMC, non-clinical, alles zonder systeem | Nog altijd dominant | inbegrepen |
| **Veeva / Medidata CTMS+EDC** | Trial-executie, TMF, datacapture | Dominant, maar géén planner | Medidata: $35,5 mln (grootste HHS-contract) |
| **Oracle Primavera P6** | GMP-fabrieksbouw, capex | Standaard aan EPC-zijde | tot $10,7 mln per overheidscontract |
| **Wellspring Accolade (ex-Sopheon)** | Stage-gate/innovatie | Terugtrekkend uit farma | niet gepubliceerd |

---

## 9. Onzekerheden en wat ik niet heb kunnen verifiëren

1. **Planisware's exacte life-sciences-omzetaandeel is niet publiek.** Planisware rapporteert per pijler (PD&I €105,7 mln) en per geografie, niet per verticaal. Mijn 35%-aanname is een **SCHATTING**.
2. **Microsoft Project Plan 1/3/5 abonnementsprijzen** waren niet uit Microsoft's eigen pagina's te halen (JavaScript-gerenderd; de compare-pagina toont alleen de eeuwigdurende 2024-prijzen). Ik heb bewust geen onbevestigde bedragen opgenomen.
3. **Oracle Primavera lijstprijzen** waren niet ophaalbaar (Oracle price-list-PDF's gaven 404). De genoemde contractwaarden uit USAspending zijn werkelijke transacties, geen lijstprijzen.
4. **Aggregatorprijzen zijn onbetrouwbaar.** GetApp en SoftwareAdvice tonen beide "$1 per user per year" voor Planisware — evident een placeholder. Ik gebruik alleen SelectHub's $45/maand, en dan als indicatie.
5. **G2, Gartner Peer Insights en Reddit waren niet toegankelijk** (403 respectievelijk geblokkeerd). Het sentimentbeeld leunt daarom op GetApp (n=5), SoftwareAdvice (n=5) en SelectHub (n=80) — een dunne basis. Behandel §7.1 als indicatief.
6. **De WebSearch-quota was uitgeput**, waardoor ik geen brede zoekopdrachten kon doen naar aanbestedingsdocumenten of vakpersartikelen. USAspending en TED zijn als vervanging gebruikt; TED leverde geen farma-specifieke PPM-aanbestedingen op.
7. **Farma-capexvolumes 2025–2026** (Lilly, Novo Nordisk, J&J US-investeringen) heb ik niet kunnen kwantificeren — de betreffende persberichten en vakpers gaven 403/404. Eén datapunt gevonden: BeOne investeert $300 mln in US-productieuitbreiding ([Pharmaceutical Technology](https://www.pharmaceutical-technology.com/news/)). De capexcomponent van mijn marktschatting (§4.3) heeft daardoor de grootste onzekerheid.

---

## Bronnenlijst

### Leverancier- en investeerdersbronnen
1. Planisware — FY 2025 results, Investors & Analysts presentation (26 feb 2026), PDF: https://planisware.com/sites/default/files/2026-02/20260226%20-%20Planisware%20-%20FY%202025%20results%20-%20Investors%20%26%20Analysts%20presentation%201.pdf
2. Planisware — Q1 2026 revenue, Investors & Analysts presentation (16 apr 2026), PDF: https://planisware.com/sites/default/files/2026-04/Planisware%20-%20Q1%202026%20revenue%20-%20Investors%20%26%20Analysts%20presentation.pdf
3. Planisware — Investors: https://www.planisware.com/investors
4. Planisware — Regulated information: https://www.planisware.com/investors/regulated-information
5. Planisware — Homepage / klantenlogo's: https://www.planisware.com/
6. Planisware — Customers (Novo Nordisk, 1.350 gebruikers): https://www.planisware.com/customers
7. Planisware — Pharma-industriepagina: https://www.planisware.com/industries/pharma
8. Planisware — Planisware Enterprise productpagina (800.000 gebruikers): https://www.planisware.com/products/planisware-enterprise
9. Planisware — Brochure Life Sciences ("over 50 top life science organizations"): https://planisware.com/resources/selecting-tool/brochure-planisware-life-sciences
10. Planisware — Cross-functional planning in drug development (MS Project/Smartsheet/CTMS/Excel-citaat): https://planisware.com/resources/product-roadmapping/cross-functional-planning-drug-development
11. Planisware — Key planning trends in the pharmaceutical industry: https://planisware.com/resources/resource-management-capacity-planning/key-planning-trends-pharmaceutical-industry
12. Planisware — 5 key metric categories for pharma resource and portfolio management: https://planisware.com/resources/resource-management-capacity-planning/5-key-metric-categories-pharma-resource-and
13. Planisware — Optimizing clinical supply chain management: https://planisware.com/resources/product-capabilities/planisware-enterprise-optimizing-clinical-supply-chain-management
14. Planisware — Contract Pharma infographic (blind survey, 300+ lezers): https://planisware.com/resources/work-management-collaboration/contract-pharma-planisware-infographic
15. Planisware — Named a Leader, Gartner MQ for Adaptive Project Management & Reporting 2022: https://planisware.com/resources/selecting-tool/planisware-named-leader-gartner%C2%AE-adaptive-project-management-quadrant%E2%84%A2
16. Planisware — Forrester Wave SPM Tools Q3 2017: https://planisware.com/resources/selecting-tool/planisware-named-leader-strategic-portfolio-management
17. Planisware — sitemap (klantcases Merck, BMS, Jazz, Arvinas, Daiichi Sankyo, Astellas, Stevanato): https://planisware.com/sitemap.xml
18. Planview — About Sciforma (overname): https://www.planview.com/acquisitions/about-sciforma/
19. Planview — Products (4.500+ klanten, 2,7 mln gebruikers): https://www.planview.com/products/
20. Wellspring (ex-Sopheon) — homepage: https://www.wellspring.com/
21. Smartsheet — Pricing: https://www.smartsheet.com/pricing
22. Vista Equity Partners — Blackstone and Vista complete acquisition of Smartsheet ($8,4 mrd, 22 jan 2025): https://www.vistaequitypartners.com/news/blackstone-and-vista-equity-partners-complete-acquisition-of-smartsheet/
23. Microsoft — Compare Microsoft Project management software (Project Standard/Professional 2024 prijzen): https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software
24. Veeva — Clinical Operations (500+ bedrijven): https://www.veeva.com/products/clinical-operations/

### Analisten- en reviewbronnen
25. Mordor Intelligence — Project Portfolio Management Market (marktomvang, CAGR, verticaalgroei): https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market
26. SelectHub — Planisware ($45/maand, 84% satisfaction, n=80): https://www.selecthub.com/project-management/planisware/
27. GetApp — Planisware Enterprise (4,1/5, ease of use 3,1, support 2,7): https://www.getapp.com/project-management-planning-software/a/planisware/
28. SoftwareAdvice — Planisware profile: https://www.softwareadvice.com/project-management/planisware-profile/

### Wetenschappelijke literatuur (via NCBI E-utilities)
29. DiMasi JA et al. — *Innovation in the pharmaceutical industry: New estimates of R&D costs*, Journal of Health Economics 2016, PMID 26928437: https://pubmed.ncbi.nlm.nih.gov/26928437/
30. Wouters OJ et al. — *Estimated Research and Development Investment Needed to Bring a New Medicine to Market, 2009-2018*, JAMA 2020, PMID 32125404: https://pubmed.ncbi.nlm.nih.gov/32125404/
31. *Costs of Drug Development and Research and Development Intensity in the US, 2000-2018*, JAMA Network Open 2024, PMID 38941099: https://pubmed.ncbi.nlm.nih.gov/38941099/
32. *Virtual Clinical Trials: Perspectives in Dermatology* (USD 8 mln/dag vertragingskosten), Dermatology 2020, PMID 32126560: https://pubmed.ncbi.nlm.nih.gov/32126560/
33. Wong CH, Siah KW, Lo AW — *Estimation of clinical trial success rates and related parameters*, Biostatistics 2019, PMID 29394327 / PMC6409418: https://pmc.ncbi.nlm.nih.gov/articles/PMC6409418/

### Regelgeving en standaarden
34. FAR 34.201 — Policy (EVMS, EIA-748, OMB Circular A-11): https://www.acquisition.gov/far/34.201
35. DCMA — EVMS (Business Practices BP0–BP8, BP4 Surveillance rev. 4 nov 2025, DECM v8.1): https://www.dcma.mil/HQ/EVMS/
36. ISPE — Project Management topic hub (Good Practice Guides, C&Q, PDRIx, training): https://ispe.org/topics/project-management
37. Wikipedia — Title 21 CFR Part 11: https://en.wikipedia.org/wiki/Title_21_CFR_Part_11
38. Wikipedia — Good automated manufacturing practice (GAMP 5): https://en.wikipedia.org/wiki/Good_automated_manufacturing_practice
39. BARDA / medicalcountermeasures.gov ($1,7 mrd/jaar, portefeuille >$60 mrd): https://medicalcountermeasures.gov/barda/

### Contract- en marktdata
40. USAspending.gov API v2, spending_by_award (Planisware, Sciforma, Primavera, Planview, Medidata, EVM/IMS-contracten), geraadpleegd juli 2026: https://api.usaspending.gov/api/v2/search/spending_by_award/
41. TED (Tenders Electronic Daily) API v3, notices/search, geraadpleegd juli 2026: https://api.ted.europa.eu/v3/notices/search

### Achtergrond
42. Wikipedia — Planisware (IPO april 2024, €1,11 mrd waardering, FY2025-cijfers, Euronext PLNW): https://en.wikipedia.org/wiki/Planisware
43. Wikipedia — Pharmaceutical industry (marktomvang $1,48 bln 2022; R&D >15% van netto-omzet; 10–15 jaar ontwikkeltijd): https://en.wikipedia.org/wiki/Pharmaceutical_industry
44. Wikipedia — List of largest biomedical companies by revenue (2025-omzetten): https://en.wikipedia.org/wiki/List_of_largest_biomedical_companies_by_revenue
45. Wikipedia — Contract research organization (CRO-markt $38,4 mrd 2018 → $90,9 mrd 2026; 1.100+ CRO's): https://en.wikipedia.org/wiki/Contract_research_organization
46. Pharmaceutical Technology — nieuwsoverzicht (BeOne $300 mln US-productieuitbreiding): https://www.pharmaceutical-technology.com/news/
47. EFPIA Data Center: https://www.efpia.eu/publications/data-center/

---

## Verificatie

**Uitgevoerd:** juli 2026, adversariële fact-check. Opzet: van elke bewering is geprobeerd haar te **weerleggen** met de primaire bron, niet haar te bevestigen. Doorgerekende schattingen zijn opnieuw uitgerekend. De WebSearch-quota was ook bij deze controle uitgeput; verificatie is gedaan met directe WebFetch op primaire bronnen plus lokale tekstextractie uit de Planisware-PDF's (pypdf), wat de eerdere ontoegankelijkheid van die PDF's oploste.

**Samengevat: de brondata is opvallend solide — elk hard, geciteerd cijfer hield stand. De zwakte zit uitsluitend in de afgeleide laag: de eindschatting telde niet op, de valutaomrekening klopte niet, en route A bleek veel minder in de bron verankerd dan de tekst suggereerde.**

### A. Rekenfouten — GECORRIGEERD

| # | Bewering | Oordeel | Bevinding |
|---|---|---|---|
| A1 | Eindschatting "€310–470 mln/jaar" | **GECORRIGEERD** | De vier componenten (150–200 / 65–95 / 50–140 / 40–80) sommeren tot **€305–515 mln**. De bovengrens was €45 mln (9,6%) te laag, de ondergrens €5 mln te hoog. Kopregel van de schattingsbox in §4.3 aangepast; rekentabel toegevoegd. |
| A2 | "€310–470 mln ≈ USD 340–520 mln" | **GECORRIGEERD** | Impliceert EUR/USD ≈ 1,10. Werkelijke koers 24 juli 2026: **1,1377**. Correct: €305–515 mln = **USD 347–586 mln**. Bron: https://api.frankfurter.dev/v1/latest?base=EUR&symbols=USD |
| A3 | Route A "$0,62–0,85 mrd ≈ €0,57–0,78 mrd" | **GECORRIGEERD** | Zelfde koersfout. Bij 1,1377 is dat **€0,54–0,74 mrd**; de farma-subset $0,34–0,59 mrd = **€0,30–0,52 mrd**. |
| A4 | Route B bottom-up = "≈ €155 mln" | **BEVESTIGD** | 37,5 + 30,0 + 30,0 + 20,0 + 37,5 = €155,0 mln exact. Optelling en elke deelvermenigvuldiging kloppen. |
| A5 | Afgeleide prijspunten §3.2 | **BEVESTIGD** | €198,0 mln / 650 = €304.615 ≈ €305k ✓; €198,0 mln / 800.000 = €247,50 ≈ €248 ✓; $45 × 12 = $540 ✓; Novo-seatmix 250×$500 + 1.100×$150 = $290.000 ✓ (en 250 + 1.100 = 1.350 ✓). |
| A6 | Planisware-sanity-check (35% → €69 mln → ~45%) | **BEVESTIGD (rekenkundig)** | 198 × 0,35 = 69,3 ✓; 69,3 / 155 = 44,7% ✓. Zie C1 voor de inhoudelijke kritiek op de 35%. |
| A7 | Pijlers tellen op tot de omzet | **BEVESTIGD** | 105,7 + 45,5 + 33,5 + 13,2 = €197,9 mln ≈ €198,0 ✓; 53 + 23 + 17 + 7 = 100% ✓. |
| A8 | Omzettabel §3.1 | **GECORRIGEERD (onvolledig)** | De genoemde terugkerende regels (93,7 + 53,6 + 19,0) sommeerden tot €166,3 mln tegen een gerapporteerde €179,7 mln. Het gat van €13,4 mln zijn twee ontbrekende regels: **Annual licenses €1,7 mln** en **Subscription support €11,7 mln**. Beide toegevoegd; de tabel klopt nu. Geen fout in de wél genoemde cijfers. Bron: FY2025-presentatie p.10. |
| A9 | Onzekerheidsmarge ±35% | **ONZEKER** | Sluit niet aan op de eigen band: €305–515 mln rond €410 mln is ±26%. Als extra veiligheidsmarge verdedigbaar, als beschrijving van de band niet. Noot toegevoegd. |

### B. Bronattributie — GECORRIGEERD

| # | Bewering | Oordeel | Bevinding |
|---|---|---|---|
| B1 | "PPM-markt 2026 USD 7,69 mrd (Mordor Intelligence)" | **GECORRIGEERD** | Mordor publiceert **alleen** 2025 (USD 6,90 mrd) en 2031 (USD 13,21 mrd). De 7,69 mrd is een eigen extrapolatie (6,90 × 1,1143 = 7,689). Als vendorcijfer gepresenteerd terwijl het een eigen afleiding is. Gemarkeerd in §4.1. https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market |
| B2 | "CAGR 2025–2031 = 11,43%" | **GECORRIGEERD** | Mordor labelt de periode als **2026–2031**. De CAGR toepassen op de stap 2025→2026 is daarmee formeel buiten het bereik van de bron. Idem bron. |
| B3 | Route A-redenering: "de vier gerapporteerde verticalen … na aftrek van BFSI, manufacturing, energie, overheid en construction" | **GECORRIGEERD** | Mordor segmenteert in **zeven benoemde verticalen + Others** (IT & telecom, healthcare & life sciences, manufacturing, construction & engineering, retail & consumer goods, BFSI, government & public sector). Er is **geen energie-verticaal** en het zijn er geen vier. Bovendien publiceert Mordor **alleen** het IT/telecom-aandeel (35,60%) — voor healthcare géén aandeel, alleen een groeivoet. De "8–11%" is dus geen restpostberekening maar een pure aanname. Idem bron. |
| B4 | SelectHub "$45/month" → "$540 per **gebruiker** per jaar" | **GECORRIGEERD** | SelectHub vermeldt "$45/month" **zonder eenheid**; "per user" is een eigen toevoeging. Gemarkeerd als indicatief. https://www.selecthub.com/project-management/planisware/ |
| B5 | "Twee onafhankelijke routes convergeren" | **ONZEKER / afgezwakt** | Route A stapelt drie eigen aannames (2026-extrapolatie × 8–11% × 55–70%) op één gepubliceerd basisjaar; beide routes zijn bovendien tegen dezelfde Planisware-cijfers gekalibreerd. Het is een plausibiliteitstoets, geen onafhankelijke bevestiging. Noot toegevoegd in §4.2. |

### C. Segmentopbouw en interne consistentie

| # | Bewering | Oordeel | Bevinding |
|---|---|---|---|
| C1 | "Planisware haalt ~35% van €198 mln uit life sciences" | **ONZEKER** | 35% van totaal = **65,6% van de gehele PD&I-pijler** (€69,3 mln op €105,7 mln). Die pijler bevat aantoonbaar grote non-farma-accounts: PepsiCo, Ford, Philips, ABB en Primark staan alle op de klantenpagina. 20–30% is minstens even plausibel; bij 25% zakt het impliciete marktaandeel van ~45% naar ~32%. Niet weerlegd, maar de precisie is schijn. https://www.planisware.com/customers |
| C2 | Bottom-up populatie vs. berekening (CRO/CDMO) | **GECORRIGEERD (interne inconsistentie)** | De populatietabel telt ~1.100 CRO's + ~200 CDMO's ≈ 1.300 organisaties; de berekening rekent met **150**. Een ongemotiveerde haircut van ~88%. Inhoudelijk verdedigbaar, maar niet verantwoord. Bij 300 in plaats van 150 stijgt route B naar €192,5 mln. Bandbreedte €130–200 mln toegevoegd. |
| C3 | Bovengrens "€150–200 mln dedicated software" | **ONZEKER** | Route B levert €155 mln; nergens in §4.2 wordt de €200 mln afgeleid. Nu verankerd via de toegevoegde €130–200 mln-band, maar het getal stond oorspronkelijk zonder onderbouwing. |
| C4 | "1.100+ CRO's wereldwijd; top-10 ≈55%" | **BEVESTIGD (met datering)** | Bron zegt "As of 2013, there were over 1,100 CROs". De 55% is een **2009**-cijfer (56% in 2008, 55% in 2009), niet 2013. Datering toegevoegd. https://en.wikipedia.org/wiki/Contract_research_organization |

### D. Vendorcijfers en marktleiderschap — BEVESTIGD

| # | Bewering | Oordeel | Bevinding |
|---|---|---|---|
| D1 | Planisware FY2025 €198,0 mln; recurring €179,7 mln (91%); SaaS & Hosting €93,7 mln (+16,7% cc); evolutive support €53,6 mln (+12,5% cc); maintenance €19,0 mln (+1,1% cc); perpetual €5,8 mln (−21,3% cc); implementation €12,5 mln (−3,7% cc); totale groei +7,9% / +10,3% cc | **BEVESTIGD** | Regel voor regel geverifieerd tegen p.10 van de FY2025-presentatie (lokaal geëxtraheerd uit de PDF). Alle acht cijfers exact. Aanvullend bevestigd: totale non-recurring omzet €18,3 mln. https://planisware.com/sites/default/files/2026-02/20260226%20-%20Planisware%20-%20FY%202025%20results%20-%20Investors%20%26%20Analysts%20presentation%201.pdf |
| D2 | Pijlersplit: PD&I €105,7 mln (+10,9% cc), PC&E €45,5 mln (+24,3%), IT&DT €33,5 mln (+5,4%), PBA €13,2 mln (−14,6%) | **BEVESTIGD** | Exact, inclusief alle vier de cc-groeivoeten. Idem bron. |
| D3 | NRR 110% (2024: 117%); churn 1,4% (2024: 2,0%); ~650 blue-chip klanten; 11 jaar gemiddelde tenure top-20; ~850 medewerkers; brutomarge 73,8%; adj. EBITDA-marge 37,4%; nettoresultaat €50,0 mln (+17,0%); nettokas €196 mln | **BEVESTIGD** | Alle negen metrics exact teruggevonden. "11 years average top 20 customer tenure" staat letterlijk zo in de bron. Nettoresultaat en €198,0 mln onafhankelijk bevestigd via https://en.wikipedia.org/wiki/Planisware (die ook 838 medewerkers per 31-12-2025 geeft — consistent met "c. 850"). |
| D4 | Q1 2026 €51,0 mln, +13,6% cc; klantcohorten 2023/2024 groeien +27%/+67%; 2026-doel "low double-digit" cc bij ~37% marge | **BEVESTIGD** | Alle vier exact teruggevonden in de Q1 2026-presentatie (lokale PDF-extractie). https://planisware.com/sites/default/files/2026-04/Planisware%20-%20Q1%202026%20revenue%20-%20Investors%20%26%20Analysts%20presentation.pdf |
| D5 | "Over 50 top life science organizations worldwide" | **BEVESTIGD** | Letterlijk: "Planisware is the comprehensive, integrated planning solution over 50 top life science organizations worldwide rely on". Let op: dit is een **vendorclaim**, geen onafhankelijke meting, en "top" is niet gedefinieerd. https://planisware.com/resources/selecting-tool/brochure-planisware-life-sciences |
| D6 | "800.000 users"; Gantt/PERT/WBS, Earned Value + Stage-Gate, open REST API, Resource Bottleneck-views | **BEVESTIGD** | Alle citaten letterlijk teruggevonden. https://www.planisware.com/products/planisware-enterprise |
| D7 | Novo Nordisk draait 1.350 Planisware-gebruikers | **BEVESTIGD** | "Planisware empowers 1,350 users drive project management projects at Novo". https://www.planisware.com/customers |
| D8 | Planview heeft Sciforma overgenomen (2025); Sciforma Vantage → Planview ProjectAdvantage; life sciences niet als motief genoemd | **BEVESTIGD** | Alle drie de onderdelen bevestigd, inclusief de expliciete productrename en het ontbreken van life sciences in de motivering ("expanded presence in Europe"). https://www.planview.com/acquisitions/about-sciforma/ |
| D9 | Wellspring (ex-Sopheon) noemt farma niet meer in de industrielijst | **BEVESTIGD** | Wellspring noemt exact vier industrieën: Industrial Manufacturing, CPG, Defense and Aerospace, Chemical. Pharma/life sciences/biotech ontbreken. Accolade wordt wel prominent gevoerd. https://www.wellspring.com/ |
| D10 | Smartsheet take-private: ~$8,4 mrd, $56,50/aandeel, afgerond 22 januari 2025, "85%+ van de 2024 Fortune 500" | **BEVESTIGD** | Alle vier exact. https://www.vistaequitypartners.com/news/blackstone-and-vista-equity-partners-complete-acquisition-of-smartsheet/ |
| D11 | Healthcare & life sciences is de snelst groeiende PPM-verticaal met 13,58% CAGR; IT/telecom grootste met 35,60% | **BEVESTIGD** | Beide letterlijk in de bron, inclusief de drijfveren ("clinical-trial digitization, FDA 21 CFR Part 11 validation, telehealth"). Idem Mordor-bron als B1. |
| D12 | "Planisware is onbetwiste marktleider in big pharma R&D-portfolio" | **ONZEKER** | Niet weerlegbaar én niet hard bevestigbaar: er bestaat geen gepubliceerd marktaandeelcijfer per verticaal. De onderbouwing (klantnamen, 50+ organisaties, klanttenure, financiële positie) is consistent met leiderschap, maar rust grotendeels op vendorbronnen. De aangehaalde Gartner-erkenning dateert bovendien uit **2022** en betreft de generieke categorie "Adaptive Project Management & Reporting", niet life sciences. Behandel als goed onderbouwd oordeel, niet als feit. |

### E. Prijzen en externe feiten — BEVESTIGD

| # | Bewering | Oordeel | Bevinding |
|---|---|---|---|
| E1 | MS Project Standard 2024 $679,99 / Professional 2024 $1.129,99 eenmalig; Project Server SE niet publiek geprijsd | **BEVESTIGD** | Beide bedragen exact; de pagina toont inderdaad geen prijs voor Project Server Subscription Edition. https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software |
| E2 | Smartsheet Business "$24/lid/maand" | **BEVESTIGD (met nuance)** | Correct voor **maandelijkse** facturering; bij jaarfacturering is het $19. Pro: $12 resp. $9. De nuance ontbrak en is toegevoegd — relevant omdat de generieke-seats-component (€50–140 mln) op zulke tarieven leunt. https://www.smartsheet.com/pricing |
| E3 | "Tot USD 8 mln per dag" vertragingskosten; patiëntrekrutering grootste oorzaak; tot 40% uitval | **BEVESTIGD** | Alle drie letterlijk in de abstract van *Virtual Clinical Trials: Perspectives in Dermatology*, Dermatology 2020;236(4):375-382. Kanttekening: het is een **bovengrens** ("up to") uit een dermatologisch reviewartikel, geen mediaan — het gebruik als centraal ROI-argument in §1.4/§3.5 overdrijft daarmee het typische geval. https://pubmed.ncbi.nlm.nih.gov/32126560/ |
| E4 | Slagingskansen 66,4% / 58,3% / 59,0% / 13,8% totaal; oncologie 3,4%; vaccins 33,4%; fasedurations 1,6 / 2,9 / 3,8 jaar; klinische tijd 5,9–7,2 jaar non-onco vs. 13,1 jaar oncologie | **BEVESTIGD** | Alle elf waarden exact teruggevonden, inclusief de opvallende 13,1 jaar voor oncologie. Aanvulling uit dezelfde bron die het rapport niet noemt: de oncologie-slagingskans verbeterde tot **8,3% in 2015** — dat nuanceert de "3,4%"-framing in §1.5. https://pmc.ncbi.nlm.nih.gov/articles/PMC6409418/ |
| E5 | FAR 34.201: EVMS vereist voor major acquisitions per OMB A-11; EIA-748; géén dollargrens in FAR 34.201; "Offerors shall not be eliminated…" | **BEVESTIGD** | Alle vier de onderdelen bevestigd, inclusief het expliciet ontbreken van een dollargrens — het "detail dat vaak verkeerd wordt geciteerd" klopt. https://www.acquisition.gov/far/34.201 |
| E6 | Consolidatie 2025 maakt Planisware "de laatst overgebleven zelfstandige beursgenoteerde pure-play" | **ONZEKER** | De drie onderliggende overnames zijn alle bevestigd (D8, D9, D10), maar "laatste pure-play" is een kwalificatie die afhangt van de categoriegrens; beursgenoteerde werkmanagementspelers bestaan nog. Nuance toegevoegd in §0. |

### Wat niet opnieuw te verifiëren was

- **USAspending-contractbedragen** (§2.1, §3.3): de API-queries zijn niet herhaald; deze bedragen blijven op gezag van de oorspronkelijke raadpleging staan. Ze zijn wel intern consistent en worden nergens als marktbrede prijsindicatie gebruikt — het rapport markeert zelf al dat het Orchestra-midmarketdeals betreft.
- **GetApp-scores** (ease of use 3,1 / support 2,7, n=5) en **SoftwareAdvice**-citaten: niet opnieuw opgehaald. §9 punt 5 waarschuwt zelf al terecht dat dit een dunne basis is (n=5); behandel §7.1 als indicatief.
- **De capexcomponent (€40–80 mln)**: blijft de zwakst onderbouwde regel van de hele schatting. Er is geen enkele bron die farma-capex-schedulinguitgaven kwantificeert; de afleiding uit Amerikaanse overheidscontractwaarden voor Primavera is een analogie, geen meting. Dit is ook de component die de aanbeveling in §7.3 (prioriteit 1: farma-capex) draagt — het strategische advies rust dus op het slechtst onderbouwde cijfer in het rapport. Aanbeveling: valideer deze component apart voordat er beslissingen op worden gebaseerd.

### Eindoordeel

Het feitelijke fundament is sterk: **22 van de 22 hard geciteerde externe cijfers hielden bij hercontrole exact stand**, inclusief alle Planisware-financials, alle klinische-succespercentages en alle prijspunten. Er is geen enkel verzonnen of verkeerd overgenomen brongegeven gevonden.

De problemen zitten uitsluitend in de afgeleide laag: één echte optelfout in de kopschatting (bovengrens 9,6% te laag), één valutafout die het hele rapport doortrekt, een verkeerde weergave van Mordors segmentatie, en een route A die veel minder in bronnen verankerd is dan de tekst suggereerde. Alle vier zijn hierboven gecorrigeerd.

**Blijvende voorbehouden bij gebruik:** (1) het 35%-life-sciences-aandeel van Planisware is de spil van de hele sanity check en is niet meer dan een aanname; (2) de capexcomponent is niet onderbouwd en draagt wél het hoofdadvies; (3) "$8 mln/dag" is een bovengrens uit één reviewartikel en geen typisch geval.
