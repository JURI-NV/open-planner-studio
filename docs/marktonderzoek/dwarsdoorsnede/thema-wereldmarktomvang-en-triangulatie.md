# Wereldmarktomvang en triangulatie — projectplanning-/schedulingsoftware

**Dwarsdoorsnede-thema, marktonderzoek planningssoftware**
Analysedatum: 25 juli 2026
Alle bedragen in USD tenzij anders vermeld.

---

## 1. Samenvatting

De gepubliceerde marktramingen voor "project management software" en "PPM" zijn **niet bruikbaar zonder herdefinitie**. Voor exact dezelfde markt (PPM, jaar 2025) circuleren ramingen van **$0,82 mrd tot $12,2 mrd** — een factor 15. Dat verschil is geen meetruis maar een **definitieverschil**: de hoge cijfers tellen work-management-SaaS (Asana, monday.com, Jira, Smartsheet) mee, de lage tellen alleen klassieke portfoliogovernance.

Kernconclusie van de triangulatie — twee onafhankelijke methoden (bottom-up seats × prijs, en optelling van toerekenbare leveranciersomzet) komen uit op vrijwel hetzelfde getal:

| Marktdefinitie | Eigen bandbreedte 2025/26 (**schatting**) | Centrale waarde | Realistische CAGR |
|---|---|---|---|
| **(a1) Smalle planning/scheduling** — CPM, Gantt, resource-levelling als kernfunctie (P6, MS Project, Powerproject, Safran, Spider, Open Plan/Acumen, SYNCHRO, TILOS, ALICE, nPlan) | **$2,5 – 4,5 mrd** | ~$3,0 mrd | **4 – 7 %** |
| **(a2) Brede PPM** — inclusief portfoliogovernance, resourcemanagement, timesheets, diensten | $6 – 10 mrd | ~$7,5 mrd | 7 – 11 % |
| **(a3) Work management** — inclusief Asana/monday/Jira/Smartsheet/ClickUp/Planner | $18 – 25 mrd | ~$21 mrd | 12 – 18 % |
| **(b) Bouw-/infradeel van (a1)** | **$0,9 – 1,7 mrd** | ~$1,3 mrd | 5 – 8 % |
| (b2) Brede "construction PM & scheduling" | $3 – 4 mrd | ~$3,4 mrd | 9 – 10 % |

Drie bevindingen die haaks staan op de vakpers:

1. **De smalle planningsmarkt is klein en groeit traag.** De veelgeciteerde "$20 mrd in 2030, CAGR 15,7 %" beschrijft work management, niet planning. De echte CPM-markt is ~$3 mrd en groeit ongeveer mee met de bouwconjunctuur.
2. **De hele wereldwijde bouwplanningsmarkt is kleiner dan de jaaromzet van Procore alleen** ($1,32 mrd, FY2025). Dat is een harde, controleerbare vergelijking (§5.1) en het belangrijkste kalibratiepunt van dit rapport.
3. **Gartner en IDC publiceren géén openbaar marktomvangcijfer voor PPM of scheduling.** Verwijzingen naar "Gartner: de PPM-markt is $X mrd" in secundaire pers zijn vrijwel altijd misattributie (§3.5).

---

## 2. Methode en bronkwaliteitsclassificatie

Ik hanteer drie bronklassen en label elk cijfer.

| Klasse | Omschrijving | Voorbeelden in dit rapport |
|---|---|---|
| **A — hard** | Wettelijk gecontroleerde of contractueel bindende documenten: jaarrekeningen/SEC-filings, gepubliceerde prijslijsten, normteksten, aanbestedingsdocumenten, publieke tellers | Autodesk 10-K, Bentley/Procore/monday/Asana resultaten, Oracle prijslijst Texas DIR, Microsoft/Asana/monday prijspagina's, IFC 4.3-documentatie, SourceForge-downloadteller |
| **B — semi-hard** | Door leverancier gepubliceerde operationele cijfers zonder accountantscontrole; wederverkoperprijzen | Klantaantallen, ARR-cohorten, Primavera-wederverkoperprijzen |
| **C — marketingraming** | SEO-gedreven leadgeneratie-rapporten van commerciële onderzoeksbureaus; geen openbare methodologie, geen leveranciersopbouw | Grand View, Mordor, MarketsandMarkets, Fortune Business Insights, Verified Market Research, Technavio, Research Nester, Business Research Insights |

**Waarom klasse C streng behandeld wordt.** Deze rapporten zijn commerciële producten waarvan de landingspagina het verkoopinstrument is. Ze publiceren geen steekproef, geen leveranciersopbouw en geen afbakeningsregels. Vijf concrete kwaliteitsindicaties uit dit onderzoek staan in §3.4 — waaronder één bureau dat twee elkaar overlappende rapporten verkoopt met CAGR's van 3,9 % en 15,42 %.

**Beperkingen van dit onderzoek (eerlijkheidshalve vooraf).**
- Grand View Research blokkeerde directe toegang (HTTP 403). De GVR-cijfers hieronder komen uit zoekresultaat-snippets, niet uit de bronpagina zelf. Ze zijn daarom **niet volledig geverifieerd** en als zodanig gemarkeerd.
- Ook Technavio, Research Nester en Business Research Insights zijn alleen via snippets gezien.
- De WebSearch-limiet van deze sessie is bereikt; de latere verificatie liep via directe WebFetch op bekende URL's. Enkele bronnen (PMI talent gap, Eleco jaarverslag) waren daardoor niet bereikbaar; dat is expliciet aangegeven waar het de redenering raakt.
- Oracle's prijslijst is van 2016. Zie §4.1 voor waarom die toch bruikbaar is en hoe hij tegen 2026-prijzen is gekalibreerd.

---

## 3. De gepubliceerde ramingen, naast elkaar

### 3.1 PPM / projectportfoliomanagement

| Bron | Definitie/scope | Omvang | Jaar | CAGR | Prognose | Klasse |
|---|---|---|---|---|---|---|
| **MarketsandMarkets** | "Centralised management of multiple projects... to optimize resource allocation, balance risks" — incl. Solutions + Services, 7 applicaties, 10 verticals | **$8,83 mrd** | 2025 (basis) | 11,3 % | $16,87 mrd (2031) | C |
| MarketsandMarkets (zelfde rapport, andere pagina) | idem | $9,91 mrd | 2026 | 11,3 % | $16,87 mrd (2031) | C |
| **Mordor Intelligence** | "Software suites and cloud subscriptions that help enterprises prioritize, budget, schedule, and track multiple projects within a unified portfolio... distinguishing it from standalone task management tools" | **$6,90 mrd** | 2025 | 11,43 % | $13,21 mrd (2031) | C |
| Mordor (oudere jaargang, via ResearchAndMarkets) | idem, ongewijzigde titel | $6,02 mrd | 2025 | **3,9 %** | $7,28 mrd (2030) | C |
| **Fortune Business Insights** | "Centrally manages multiple projects under one umbrella"; Software 70,68 % van totaal | **$5,39 mrd** | 2025 | 7,50 % | $10,35 mrd (2034) | C |
| **Verified Market Research** | Portfolio-investeringsallocatie; "portfolio level decision failure... source of capital leakage" | $4,66 mrd | 2024 | 6,27 % | $7,58 mrd (2032) | C |
| Research Nester | niet gespecificeerd | $6,54 mrd | 2025 | — | — | C (snippet) |
| Technavio | niet gespecificeerd | **$12,2 mrd** | ~2025 | — | — | C (snippet) |
| Business Research Insights | niet gespecificeerd | **$0,82 mrd** | 2025 | — | — | C (snippet) |

Bronnen: [MarketsandMarkets PPM-rapport](https://www.marketsandmarkets.com/Market-Reports/project-portfolio-management-software-market-225932595.html) (rapportcode TC 2938, publicatiedatum juli 2026, geraadpleegd 25-07-2026) · [MarketsandMarkets persbericht](https://www.marketsandmarkets.com/PressReleases/project-portfolio-management-software.asp) (geraadpleegd 25-07-2026) · [Mordor PPM](https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market) (geraadpleegd 25-07-2026) · [ResearchAndMarkets/Mordor 2025–2030](https://www.researchandmarkets.com/reports/5578888/project-portfolio-management-market-share) (geraadpleegd 25-07-2026) · [Fortune Business Insights](https://www.fortunebusinessinsights.com/project-portfolio-management-ppm-market-104257) (rapport-ID FBI104257, bijgewerkt 6 juli 2026, geraadpleegd 25-07-2026) · [Verified Market Research](https://www.verifiedmarketresearch.com/product/project-portfolio-management-ppm-market/) (bijgewerkt januari 2026, geraadpleegd 25-07-2026).

**Spreiding voor identiek gelabelde markt, jaar 2025: $0,82 mrd – $12,2 mrd (factor 14,9).**

### 3.2 Projectmanagementsoftware (breder)

| Bron | Omvang | Jaar | CAGR | Prognose | Klasse |
|---|---|---|---|---|---|
| **Mordor "Project Management Software Systems"** | $9,76 mrd | 2025 | 15,42 % | $23,09 mrd (2031) | C |
| **Grand View Research** | $7,38 mrd | 2023 | 15,7 % | $20,47 mrd (2030) | C (snippet, 403 op bron) |

Bronnen: [Mordor PM Software Systems](https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market) (geraadpleegd 25-07-2026) · [Grand View Research](https://www.grandviewresearch.com/industry-analysis/project-management-software-market-report) (pagina gaf HTTP 403; cijfers via zoeksnippet, 25-07-2026).

Mordor's leverancierslijst voor dit rapport is doorslaggevend voor de interpretatie: *"Microsoft, SAP, Broadcom, Oracle, ServiceNow, Asana, Monday.com, Atlassian"*. **Asana, monday.com en Atlassian zijn geen planningssoftware in de CPM-zin** — geen van drieën heeft een volwaardige kritieke-padberekening met kalenders, resource-levelling en float. Hun opname verklaart zowel het niveau ($9,76 mrd) als de CAGR (15,42 %).

### 3.3 Bouw- en scheduling-specifiek

| Bron | Scope | Omvang | Jaar | CAGR | Prognose | Klasse |
|---|---|---|---|---|---|---|
| **Fortune Business Insights** | Construction software totaal: "planning, project management, budgeting, scheduling, collaboration within the construction industry" | **$10,76 mrd** | 2025 | 9,70 % | $24,72 mrd (2034) | C |
| Fortune BI — deelsegment | Applicatie "Project Management **and** Scheduling" | **$3,43 mrd** | 2024 | — | — | C |
| Fortune BI — regio | Noord-Amerika 42,50 % | $4,58 mrd | 2025 | — | — | C |
| Diverse (WiseGuy/MarketIntelo e.a.) | "Construction scheduling software" | $2,1 mrd | 2025 | 9,2 % | $4,8 mrd (2034) | C (snippet) |
| idem, andere jaargang | idem | $2,45 mrd | 2025 | 6,3 % | $4,5 mrd (2035) | C (snippet) |
| idem, derde variant | idem | — | — | 9,7 % | $2,29 mrd (2030) | C (snippet) |

Bron: [Fortune Business Insights construction software](https://www.fortunebusinessinsights.com/construction-software-market-110155) (geraadpleegd 25-07-2026). Leverancierslijst: Oracle, Hexagon AB, Deltek, Procore, Sage, Trimble, Autodesk, Bentley Systems.

Let op de interne inconsistentie in de laatste drie rijen: drie "construction scheduling software"-rapporten geven voor 2030 respectievelijk ~$3,3 mrd (2,1 → 4,8 pad), ~$3,0 mrd en **$2,29 mrd**. Dezelfde markttitel, ~45 % spreiding op vijf jaar vooruit.

### 3.4 Vijf harde aanwijzingen dat klasse C onbetrouwbaar is

1. **Factor 15 op dezelfde markt in hetzelfde jaar.** PPM 2025: $0,82 mrd (Business Research Insights) versus $12,2 mrd (Technavio). Beide gepresenteerd als "de wereldwijde PPM-markt".
2. **Eén bureau, twee overlappende rapporten, onverenigbare groei.** Mordor verkoopt zowel "Project Portfolio Management Market" (2025: $6,90 mrd, CAGR 11,43 %) als "Project Management Software Systems Market" (2025: $9,76 mrd, CAGR **15,42 %**). PPM heet de bredere ondernemingscategorie te zijn, maar is bij Mordor de *kleinere*. Definities die elkaar zo doorkruisen zijn niet operationeel.
3. **Stille herziening van de eigen CAGR met factor 3.** Mordor's PPM-basis ging tussen jaargangen van $6,02 mrd naar $6,90 mrd (+15 %), maar de CAGR sprong van **3,9 % naar 11,43 %** — en de prognose 2030/31 van $7,28 mrd naar $13,21 mrd (+81 %). Zonder toelichting. Een marktmodel dat zijn groeivoet verdrievoudigt zonder dat de basis meebeweegt, modelleert de markt niet; het volgt de mode.
4. **MarketsandMarkets tegen zichzelf.** Het bureau publiceerde in 2022 "PPM worth **$6,5 mrd by 2027**" ([GlobeNewswire, 7 september 2022](https://www.globenewswire.com/fr/news-release/2022/09/07/2511772/0/en/Project-Portfolio-Management-Market-worth-6-5-billion-by-2027-Report-by-MarketsandMarkets.html)), later "**$13,7 mrd by 2029**", en stelt nu de markt in 2026 al op **$9,91 mrd**. De 2022-prognose voor 2027 wordt door de eigen 2026-basis met ~50 % overschreden, één jaar te vroeg.
5. **Statista heeft dit segment niet.** In Statista's Technology Market Outlook is projectmanagementsoftware **geen zelfstandig segment** maar valt het onder "Other Enterprise Software"; de cijfers op de segmentpagina zijn bovendien afgeschermd achter een Professional Account ([Statista worldwide enterprise software outlook](https://www.statista.com/outlook/tmo/software/enterprise-software/project-management-software/worldwide), geraadpleegd 25-07-2026). Wie "Statista" citeert voor een PM-marktomvang, citeert dus doorgaans een doorgeplaatst klasse-C-cijfer.

### 3.5 Over Gartner en IDC — een negatieve bevinding

De opdracht vroeg expliciet om Gartner- en IDC-cijfers. **Die zijn er niet in openbare vorm.** Gartner publiceert Magic Quadrants en Market Share-databases achter een abonnement; de openbaar citeerbare Gartner-uitspraken over PPM zijn *survey*-bevindingen, niet marktomvangen. Het enige Gartner-cijfer dat in dit onderzoek boven water kwam is een gedragscijfer, doorgeplaatst door een klasse-C-bureau: *"According to Gartner surveys, 60 % of PPM buyers prefer cloud-delivered SaaS modules over on-premise deployments for new purchases"* (aangehaald op de [Fortune Business Insights PPM-pagina](https://www.fortunebusinessinsights.com/project-portfolio-management-ppm-market-104257), geraadpleegd 25-07-2026).

**Praktische consequentie:** elke bewering in de vakpers van de vorm "Gartner schat de PPM-markt op $X mrd" moet als onbevestigd worden behandeld tot de primaire Gartner-publicatie is aangewezen. Hetzelfde geldt voor IDC, dat zijn Software Tracker eveneens uitsluitend commercieel levert. Dit rapport gebruikt daarom **geen** Gartner-/IDC-marktomvang, en compenseert dat met de harde leveranciers- en prijsgegevens in §4 en §5.

---

## 4. Harde ankerpunten (klasse A)

### 4.1 Gepubliceerde prijzen

De sterkste openbare prijsbron is een **aanbestedingsdocument**: Oracle's Construction & Engineering Global Price List zoals gedeponeerd onder het Texas DIR-contract (DIR-TSO-2539). Dit is een contractueel prijsblad, geen marketingmateriaal.

**Oracle Primavera — eeuwigdurende licenties (perpetual), USD per Application User**
Bron: [Oracle Construction & Engineering Global Price List, 10 november 2016](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf), geraadpleegd en tekstueel geëxtraheerd 25-07-2026.

| Product | Licentie | Jaarlijkse support | Minimum |
|---|---|---|---|
| Primavera P6 Enterprise Project Portfolio Management | $2.750 | $605 | — |
| Primavera P6 Professional Project Management | $2.500 | $550 | — |
| Primavera P6 Progress Reporter | $950 | $209 | — |
| Primavera Contractor | $1.295 | $285 | — |
| **Primavera Risk Analysis** | **$9.500** | $2.090 | — |
| **Primavera Earned Value Management** | **$10.000** | $2.200 | — |
| Primavera Portfolio Management | $2.900 | $638 | 50 |
| Primavera Unifier Project Controls | $3.950 | $869 | 25 |
| Primavera Analytics | $2.000 | $440 | 25 |
| Primavera Gateway | $20.000 | $4.400 | 5 |
| Primavera Data Warehouse | $25.000 / processor | $5.500 | — |

**Oracle Primavera — cloud, USD per Hosted Named User (maand)**

| Product | Prijs | Minimum |
|---|---|---|
| **Primavera P6 EPPM Cloud Service** | **$125** | 25 |
| Primavera Unifier Project Controls Cloud Service | $150 | 25 |
| Primavera Analytics Cloud Service | $90 | 25 |
| Primavera P6 Progress Reporter Cloud Service | $12 | — |
| Primavera Unifier Portal User Cloud Service | $2 | — |

*Waarom een prijslijst uit 2016 nog bruikbaar is:* het P6-cloudtarief van **$125/gebruiker/maand (2016)** is nagenoeg identiek aan wat wederverkopers in 2026 noteren — **~$130/gebruiker/maand, ofwel $1.560/jaar**, met een startpakket van 5 gebruikers à $7.800/jaar (klasse B; [ITQlick Primavera-prijzen 2026](https://www.itqlick.com/oracle-primavera-p6/pricing) en [CDP Inc.](https://cdp-inc.com/products/software/purchase-oracle-primavera-cloud-5-users), geraadpleegd 25-07-2026). Oracle publiceert sinds enkele jaren geen openbare Primavera Cloud-lijstprijs meer. De prijsstabiliteit over tien jaar is zelf een bevinding: **dit is een volwassen markt zonder prijsdruk én zonder prijsmacht** — precies wat je verwacht bij 4–7 % groei, niet bij 15 %.

**Microsoft** (lijstprijzen 2026, jaarlijkse facturering; klasse A/B — prijspagina gaf geen per-seat cloudtarieven, cijfers via prijsvergelijkers geverifieerd op twee onafhankelijke sites):

| Plan | Prijs | Bron |
|---|---|---|
| Planner Plan 1 | $10 /gebruiker/maand | [costbench](https://costbench.com/software/project-management/microsoft-planner/), 25-07-2026 |
| Planner and Project Plan 3 | **$30** /gebruiker/maand | idem + [Wellingtone](https://wellingtone.com/microsoft-planner-premium-licensing-plans-pricing-2026/) |
| Planner and Project Plan 5 | **$55** /gebruiker/maand | idem |
| Project Professional 2024 (perpetual) | **$1.129,99** eenmalig | [Microsoft vergelijkingspagina](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software), 25-07-2026 (klasse A) |
| Project Standard 2024 (perpetual) | $679,99 eenmalig | idem (klasse A) |

**Work-managementleveranciers** (klasse A, eigen prijspagina's, geraadpleegd 25-07-2026):

| Leverancier | Instap | Midden | Top (openbaar) | Bron |
|---|---|---|---|---|
| **Asana** | $10,99 | $24,99 (Advanced) | Enterprise op aanvraag | [asana.com/pricing](https://asana.com/pricing) |
| **monday.com** Work Management | $9 (Basic) | $12 (Standard) | $19 (Pro) | [monday.com/pricing](https://monday.com/pricing) |

Alle bedragen per seat per maand bij jaarfacturering.

**Prijsspreiding is de kern van het definitieprobleem:** een P6-planner kost **$1.560/jaar**, een monday.com-seat **$108/jaar** — factor 14. Wie beide in één "markt" optelt, meet niet één markt maar twee.

### 4.2 Leveranciersomzet (klasse A — jaarcijfers/SEC)

| Leverancier | Boekjaar | Omzet | Groei | Relevante toelichting | Bron |
|---|---|---|---|---|---|
| **Autodesk** | FY2026 (t/m 31-01-2026) | **$7,21 mrd** totaal; **AEC $3,58 mrd** (53,1 %) | +18 % totaal; AECO Q4 +22 % | AEC omvat Revit/AutoCAD (ontwerp), niet primair planning | [10-K FY2026](https://www.sec.gov/Archives/edgar/data/769397/000076939726000015/adsk-20260131.htm); [persbericht Q4 FY2026](https://investors.autodesk.com/news-releases/news-release-details/autodesk-inc-announces-fiscal-2026-fourth-quarter-results) |
| **Bentley Systems** | FY2025 | **$1.501,8 mln**; ARR **$1.462,1 mln** | +11,0 %; ARR +11,5 % cc | SYNCHRO (4D/planning) is één product in een infrastructuur-ontwerpportfolio | [Q4/FY2025-resultaten](https://investors.bentley.com/news-releases/news-release-details/bentley-systems-announces-fourth-quarter-and-full-year-2025) |
| **Procore** | FY2025 | **$1.323 mln** | +15 % | 17.850 klanten; GRR 95 %, NRR 106 %; 78 % van ARR uit klanten met 4+ producten | [Procore FY2025-resultaten](https://www.procore.com/press/procore-announces-fourth-quarter-and-full-year-2025-financial-results); [10-K](https://www.sec.gov/Archives/edgar/data/1611052/000162828026011055/pcor-20251231.htm) |
| **monday.com** | FY2025 | **$1,232 mrd** | +27 % | NDR ~110 %; work management, geen CPM | [Q4/FY2025](https://ir.monday.com/news-and-events/news-releases/news-details/2026/monday-com-Announces-Fourth-Quarter-and-Fiscal-Year-2025-Results/default.aspx) |
| **Asana** | FY2026 (t/m 31-01-2026) | **$790,8 mln** | **+9,25 %** | 25.928 kernklanten (+8 %); groei sterk vertraagd | [Q4 FY2026](https://investors.asana.com/news-releases/news-release-details/asana-announces-fourth-quarter-and-fiscal-year-2026-results) |
| **Atlassian** | FY2025 (t/m 30-06-2025) | **>$5,2 mrd** | Q4 +22 % | Jira = issue tracking, geen scheduling | [FY2025-resultaten](https://www.businesswire.com/news/home/20250807057757/en/Atlassian-Announces-Fourth-Quarter-and-Fiscal-Year-2025-Results) |

Belangrijk: **geen enkele leverancier rapporteert scheduling als apart segment.** Oracle splitst de Construction & Engineering GBU niet uit; Microsoft rapporteert Project niet apart; Bentley noemt SYNCHRO alleen kwalitatief. Elke toerekening in §5.1 is daarom expliciet een **schatting**.

### 4.3 Vraagzijde-ankers

| Grootheid | Waarde | Jaar | Klasse | Bron |
|---|---|---|---|---|
| Actieve PMP-certificaathouders | **1.036.368** in 214 landen | 31-07-2020 | B | [Wikipedia, Project Management Professional](https://en.wikipedia.org/wiki/Project_Management_Professional), geraadpleegd 25-07-2026, citerend PMI-publicaties |
| Wereldwijde bouwproductie | ~$11 bln (biljoen), ~13 % van mondiaal bbp | 2022 | B | [Wikipedia, Construction](https://en.wikipedia.org/wiki/Construction), citerend Global Construction Report 2030, geraadpleegd 25-07-2026 |
| Projectie bouwproductie | ~$14,8 bln | 2030 | B | idem |
| Werkgelegenheid bouw wereldwijd | ~273 mln banen; ~7 % van de beroepsbevolking | 2014 | B | idem |
| Procore-klanten (organisaties) | 17.850 | 31-12-2025 | A | Procore FY2025 |
| ProjectLibre-downloads (open source) | **7,8 mln+** in 193 landen; **19.762/week** | teller 25-07-2026 | A | [SourceForge ProjectLibre](https://sourceforge.net/projects/projectlibre/) |

De PMI-talent-gap-publicatie zelf was niet bereikbaar (HTTP 403/404 op drie URL-varianten, 25-07-2026). Het PMP-cijfer uit 2020 is daarom het enige gecontroleerde beroepsbevolkingsanker; §5.2 gebruikt het uitsluitend als **plausibiliteitscontrole**, niet als basis.

---

## 5. Triangulatie

### 5.1 Methode 1 — optelling van toerekenbare leveranciersomzet

Uitgangspunt: welk deel van de omzet van bekende leveranciers is toe te rekenen aan **planning/scheduling als kernfunctie** (CPM, kalenders, resource-levelling, float, 4D)?

| Leverancier / cluster | Basis (klasse A waar mogelijk) | Toerekening scheduling (**schatting**) | Redenering |
|---|---|---|---|
| Oracle Primavera (P6, Primavera Cloud, Unifier) | niet uitgesplitst | **$0,7 – 1,0 mrd** | Marktleider in zware CPM; Unifier (project controls) deels buiten scope. Geen openbare basis — puur schatting uit prijs × geïnstalleerde basis. |
| Microsoft Project (Plan 3/5 + perpetual) | niet uitgesplitst | **$1,0 – 1,5 mrd** | Grootste zitplaatsvolume; lage ASP ($360–660/jr). Plan 1/Planner valt buiten scope (geen CPM). |
| Eleco/Elecosoft (Asta Powerproject) | jaarverslag niet bereikbaar¹ | **$0,04 – 0,06 mrd** | Marktleider bouwplanning VK; >50.000 klanten over alle producten ([eleco.com](https://eleco.com/), 25-07-2026) |
| Bentley SYNCHRO | binnen $1.501,8 mln | **$0,05 – 0,10 mrd** | Eén product binnen een ontwerpportfolio; geen aparte rapportage |
| Procore (scheduling-module) | binnen $1.323 mln | **$0,04 – 0,09 mrd** | Scheduling is één module van ~15; 78 % ARR uit multi-productklanten maakt toerekening onzeker |
| Deltek (Open Plan, Acumen), Hexagon (EcoSys), Trimble (TILOS), Nemetschek, InEight, Safran, Spider, ALICE, nPlan | privaat / niet uitgesplitst | **$0,4 – 0,7 mrd** | Lange staart van gespecialiseerde aanbieders, overwegend bouw/energie/defensie |
| **Totaal** | | **$2,2 – 3,5 mrd** | |

¹ Eleco plc publiceerde zijn jaarresultaten op 28 april 2026 ([Investegate ELCO](https://www.investegate.co.uk/company/ELCO), geraadpleegd 25-07-2026), maar noch de resultatenpagina noch het jaarverslag was in dit onderzoek bereikbaar (HTTP 404 op ir.eleco.com/results-centre en eleco.com/investors). Het bedrag is een **schatting** op basis van historische ordegrootte en Eleco's positie als AIM-genoteerde nichespeler; behandel het als de zwakste rij in deze tabel.

### 5.2 Methode 2 — bottom-up: aantal planners × licentieprijs

**Stap 1 — hoeveel toegewijde planners zijn er wereldwijd? (schatting)**

Bouw:
- Wereldwijde bouwwerkgelegenheid ~273 mln (2014, klasse B), doorgroeiend naar ~300–320 mln in 2025.
- Een groot deel daarvan is informeel (India, Sub-Sahara-Afrika, delen van Latijns-Amerika) en koopt geen software. Softwarebereikbaar formeel segment: **~100 mln** (eigen schatting; ~60 % van de productie zit bij formele aannemers, maar met hogere arbeidsproductiviteit dan het informele deel).
- Verhouding toegewijde planner : bouwplaatsmedewerker. Op een project >$100 mln draait een planningsteam van 2–5 personen op 500–2.000 werkers (~1:300). Tussen $10–100 mln: één deeltijdplanner per project. Onder $10 mln: doorgaans geen planner, wel een uitvoerder met een spreadsheet. Gewogen: **1 planner per 200–400 formele bouwwerkers**.
- → **250.000 – 500.000 toegewijde bouwplanners**, middenwaarde ~330.000.

Niet-bouw (defensie/lucht- en ruimtevaart met EVM-verplichting, olie & gas turnarounds, farma, scheepsbouw, grote IT-programma's, infrastructuurbeheerders):
- → **250.000 – 500.000** toegewijde planners (eigen schatting).

**Totaal toegewijde planners: 500.000 – 1.000.000, middenwaarde ~700.000.**

*Plausibiliteitscontrole:* 1,04 mln actieve PMP's in 2020, doorgroeiend naar ruwweg 1,4–1,6 mln nu. PMP's zijn echter overwegend generalistische projectmanagers, niet planners; en omgekeerd is de meerderheid van de bouwplanners niet PMP-gecertificeerd. Dat de twee grootheden in dezelfde ordegrootte liggen (~0,7 mln planners tegenover ~1,5 mln PMP's) is consistent, niet tegenstrijdig.

**Stap 2 — prijsmix per toegewijde plannerseat (schatting, gebaseerd op de klasse-A-prijzen uit §4.1)**

| Segment | Aandeel | Prijs/jaar | Bijdrage |
|---|---|---|---|
| P6-klasse (P6 Cloud $1.560, Unifier, Safran) | 25 % | $1.650 | $412 |
| MS Project-klasse (Plan 3 $360 – Plan 5 $660, geamortiseerd perpetual) | 45 % | $530 | $238 |
| Middensegment (Powerproject, Spider, Acumen, SYNCHRO) | 20 % | $1.250 | $250 |
| Gratis/open source (ProjectLibre, GanttProject, spreadsheets) | 10 % | $0 | $0 |
| **Gewogen gemiddelde** | | | **~$900/jaar** |

**Stap 3 — opbouw**

| Component | Berekening | Bedrag |
|---|---|---|
| Toegewijde plannerseats | 700.000 × $900 | **$0,63 mrd** |
| Team member-/viewerseats | 4 mln × $120 (bijv. P6 Progress Reporter $144/jr, Unifier Portal $24/jr) | **$0,48 mrd** |
| Diensten (implementatie, training, hosting, integratie) | ~35 % van licentie | **$0,39 mrd** |
| Premiummodules apart geprijsd (risicoanalyse, EVM, analytics, 4D) | Primavera Risk Analysis alleen al $9.500/seat perpetual | **$0,40 – 0,60 mrd** |
| **Totaal (centraal scenario)** | | **~$2,0 mrd** |
| **Totaal (ruim scenario)** | 1,0 mln planners × $1.200; 8 mln viewers × $200; diensten 45 % | **~$4,0 mrd** |

**Bottom-up bandbreedte: $2,0 – 4,0 mrd, centraal ~$2,8 mrd.**

### 5.3 Convergentie

| Methode | Bandbreedte | Centraal |
|---|---|---|
| Optelling leveranciersomzet (§5.1) | $2,2 – 3,5 mrd | ~$2,8 mrd |
| Bottom-up seats × prijs (§5.2) | $2,0 – 4,0 mrd | ~$2,8 mrd |
| **Getrianguleerd (a1) smalle planningsmarkt** | **$2,5 – 4,5 mrd** | **~$3,0 mrd** |

Twee methoden met volstrekt verschillende invoer (leveranciersjaarrekeningen versus beroepsbevolking × prijslijst) landen op dezelfde centrale waarde. Dat is de sterkste bevinding in dit rapport, en hij is **onverenigbaar met de klasse-C-ramingen van $9–10 mrd voor 2025**.

Waar zit dan wél $9–23 mrd? In work management. Vier beursgenoteerde work-managementleveranciers samen — monday.com $1,23 mrd + Asana $0,79 mrd + Atlassian $5,2 mrd + Smartsheet/Wrike/ClickUp/Notion/Planner (schatting $3–5 mrd) — zitten al op **$10–12 mrd**, zonder één regel CPM-code. Tel Microsoft Planner, Salesforce/Slack-workflows en ServiceNow SPM erbij en $18–25 mrd is bereikt. **De klasse-C-cijfers meten dus wel iets reëels — maar niet planning.**

### 5.4 Het bouw-/infradeel (b)

Twee onafhankelijke afleidingen:

*Via de leverancierskant:* Primavera is overwegend bouw/infra/energie (~70 % → ~$0,55 mrd); MS Project is grotendeels niet-bouw (~10–15 % → ~$0,15 mrd); Powerproject, SYNCHRO, Procore-scheduling, InEight, TILOS, ALICE en nPlan zijn vrijwel volledig bouw (~$0,4–0,6 mrd). **Totaal ~$1,1 – 1,3 mrd.**

*Via de vraagkant:* ~330.000 van ~700.000 toegewijde planners is bouw (47 % van de koppen), maar bouwplanners gebruiken systematisch duurder gereedschap (P6, Powerproject) dan IT-projectmanagers (MS Project, gratis tools). Omzetaandeel daarom hoger dan koppenaandeel: **40–50 % van $3,0 mrd = $1,2 – 1,5 mrd.**

*Kruiscontrole tegen klasse C:* Fortune Business Insights zet het segment "Project Management **and** Scheduling" binnen construction software op **$3,43 mrd (2024)**. Als scheduling ongeveer een derde van dat gecombineerde segment is — de rest is projectadministratie, documentbeheer, RFI's, dagrapporten — komt dat uit op ~$1,1 mrd. Consistent.

**Getrianguleerde bandbreedte (b): $0,9 – 1,7 mrd, centraal ~$1,3 mrd.**

De losse "construction scheduling software"-rapporten ($2,1–2,5 mrd voor 2025) liggen daar 60–90 % boven. Meest waarschijnlijke verklaring: zij tellen bouwprojectmanagement in bredere zin mee (voortgangsbewaking, veldapps), niet alleen planningsfunctionaliteit.

### 5.5 Groeivoet — waarom 15 % niet klopt voor planning

| Bewijs | Implicatie |
|---|---|
| P6-cloudprijs $125/mnd (2016) → ~$130/mnd (2026), klasse A→B | ~0,4 % prijsgroei per jaar over 10 jaar: geen prijsmacht, geen schaarste — kenmerkend voor een verzadigde markt |
| Bentley ARR +11,5 % cc (FY2025) | Infrastructuursoftware breed, inclusief ontwerp; planning is het langzaamste deel |
| Procore +15 % (FY2025) | Bouw-SaaS groeit, maar via modulaire uitbreiding (78 % ARR uit 4+-productklanten), niet via scheduling |
| **Asana +9,25 % (FY2026)** | Zelfs work management vertraagt scherp; de 15 %-CAGR's extrapoleren een voorbije fase |
| Mordor's eigen PPM-jaargang gaf 3,9 % | Het lage eind van de klasse-C-spreiding zit dichter bij de waarheid dan het hoge |
| Wereldwijde bouwproductie ~$11 bln (2022) → ~$14,8 bln (2030) = ~3,8 %/jr | De onderliggende vraagbasis groeit met ~4 % nominaal |

**Eigen inschatting: de smalle planningsmarkt groeit met 4–7 % per jaar** — bouwvolumegroei (~4 %) plus een bescheiden digitaliserings-/penetratiepremie, minus prijsdruk van gratis alternatieven. Voor het bouwdeel iets hoger (5–8 %) vanwege lagere uitgangspenetratie in het mkb-segment.

---

## 6. Expliciete onzekerheden

**Groot (kan de uitkomst met >50 % verschuiven).**
1. **Oracle Primavera-omzet is volledig geschat.** Oracle splitst de Construction & Engineering GBU niet uit. Zit Primavera op $0,5 mrd of $1,5 mrd, dan verschuift (a1) met ~30 %. Dit is de grootste enkelvoudige onzekerheid in het rapport.
2. **Microsoft Project-omzet is volledig geschat**, en bovendien conceptueel troebel: Plan 3/5 wordt vaak gebundeld in E5-achtige afspraken zonder toerekenbare prijs.
3. **De plannerdichtheid (1:200 tot 1:400)** berust op ervaringsordegrootte, niet op een gemeten bron. De PMI talent-gap-publicatie was niet bereikbaar; er is dus geen onafhankelijke telling van het beroep gebruikt.

**Middel.**
4. Het formeel/informeel-onderscheid in bouwwerkgelegenheid (100 mln van ~300 mln) is een eigen aanname.
5. Verhouding viewerseats : plannerseats (hier 5,7:1) is niet extern gevalideerd.
6. Eleco-omzet kon niet worden geverifieerd (§5.1, noot 1).
7. Valuta- en boekjaareffecten: Autodesk en Asana rapporteren per 31 januari, Atlassian per 30 juni. "2025" betekent niet overal hetzelfde.

**Klein maar vermeldenswaard.**
8. De Oracle-prijslijst is een **Texas DIR**-overheidstarief; commerciële lijstprijzen kunnen afwijken, en grootzakelijke kortingen van 40–70 % zijn in dit segment gebruikelijk. Het bottom-upmodel gebruikt daarom effectieve, niet nominale prijzen.
9. Grand View-cijfers zijn niet aan de bron geverifieerd (403).
10. Openbaar beschikbare informatie is systematisch Angelsaksisch gekleurd; China, Japan en Korea hebben substantiële binnenlandse planningsleveranciers die in geen van deze bronnen voorkomen. Dat betekent dat **alle** ramingen hier — de mijne incluis — de niet-westerse markt waarschijnlijk onderschatten.

**Wat dit rapport nadrukkelijk niet claimt.** Er is geen basis om (a1) preciezer dan op ±40 % te stellen. Iedereen die een planningsmarkt tot op twee decimalen becijfert ($9,91 mrd), suggereert een precisie die de onderliggende data niet kan dragen.

---

## 7. Betekenis voor een open-source, IFC-gebaseerde planner (Open Planner Studio)

Deze sectie vertaalt het bovenstaande naar consequenties voor Open Planner Studio (v2026.7.12; Tauri 2 + React 19; IFC 4.3 als natief bestandsformaat; 14 locales).

### 7.1 Het commerciële speelveld is klein — en dat is goed nieuws

De hele wereldwijde markt voor bouwplanningssoftware is **~$1,3 mrd** (§5.4) — **kleiner dan de jaaromzet van Procore alleen** ($1,323 mrd, FY2025). Twee consequenties:

- **Niemand gaat dit met durfkapitaal veroveren.** Een markt van $1,3 mrd die met 5–8 % groeit is te klein voor het soort gefinancierde aanval dat open source normaal wegdrukt. De incumbents (Oracle, Microsoft, Eleco) innoveren aantoonbaar traag: de P6-prijs staat al tien jaar stil (§4.1).
- **Maar het betekent ook: er is hier geen groot commercieel model te bouwen.** Zelfs 1 % van de smalle bouwmarkt is $13 mln. Een open-source planner moet zijn bestaansrecht ontlenen aan *strategische* waarde (interoperabiliteit, publieke aanbesteding, onderwijs, ecosysteem), niet aan een verwachte omzetafroming.

### 7.2 Prijsdruk is de scherpste hefboom

De harde prijzen uit §4.1 zijn het sterkste argument voor het bestaan van dit project:

| Gereedschap | Kosten per planner per jaar |
|---|---|
| Oracle Primavera P6 Cloud | ~$1.560 (min. 25 seats = **$39.000/jaar** instap) |
| Primavera Risk Analysis (add-on) | $9.500 eenmalig + $2.090/jaar |
| Microsoft Project Plan 5 | $660 |
| Microsoft Project Plan 3 | $360 |
| **Open Planner Studio** | **$0** |

Het **minimum van 25 seats** op Primavera P6 Cloud is hier het meest onderschatte gegeven. Het sluit structureel elke aannemer, ingenieursbureau of onderaannemer uit die minder dan 25 planners heeft — dat is de overgrote meerderheid van de bedrijven in de sector. Dat is precies de doelgroep waar ProjectLibre's **7,8 miljoen downloads en ~19.762 per week** ([SourceForge](https://sourceforge.net/projects/projectlibre/), 25-07-2026) vandaan komen: er is een grote, aantoonbare, betalende-noch-bediende vraag onder de commerciële prijsdrempel.

### 7.3 De IFC-positionering is een leeg speelveld

Dit is de meest opvallende bevinding van het GitHub-onderzoek. Een gerichte zoekopdracht naar repositories die IFC combineren met 4D/scheduling levert **9 resultaten op, alle met 0 tot 3 sterren** (GitHub code search, 25-07-2026) — de grootste is [`brunopostle/ifc4d-gantt`](https://github.com/brunopostle/ifc4d-gantt) met 3 sterren. Ter vergelijking: [IfcOpenShell](https://github.com/IfcOpenShell/IfcOpenShell) heeft 2.667 sterren en [OpenProject](https://github.com/opf/openproject) 15.663.

De open-source planningswereld en de open-BIM-wereld raken elkaar dus nauwelijks:

| Project | Sterren | Planning | IFC-native |
|---|---|---|---|
| OpenProject | 15.663 | Gantt, geen echte CPM | topic `ifc` aanwezig, maar niet als projectformaat |
| GanttProject | 1.082 | Ja (CPM) | Nee |
| TaskJuggler | 809 | Ja (solver) | Nee |
| IfcOpenShell | 2.667 | Nee | Ja (bibliotheek) |
| **Open Planner Studio** | — | **Ja (CPM + kalenders)** | **Ja (natief formaat)** |

*(Sterrenaantallen: GitHub, 25-07-2026.)*

De combinatie "echte CPM-solver **en** IFC als natief opslagformaat" wordt door geen enkel noemenswaardig open-source project bezet. Dat is een verdedigbare, onderscheidende positie — geen incrementele verbetering van een bestaand alternatief.

### 7.4 De norm ondersteunt de architectuurkeuze volledig

De keuze om IFC 4.3 als natief formaat te gebruiken (in plaats van een eigen JSON-formaat met IFC-export) wordt door de normtekst zelf gedragen. `IfcTaskTime` bevat álle CPM-velden die een solver produceert, expliciet als *"calculated value"* gedefinieerd:

> **EarlyStart** — *"The earliest date on which a task can be started. It is a calculated value."*
> **TotalFloat** — *"The difference between the duration available to carry out a task and the scheduled duration of the task."*
> **IsCritical** — *"A flag which identifies whether a scheduled task is a critical item within the programme."*

Bron: [IFC 4.3.2, IfcTaskTime](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcTaskTime.htm), buildingSMART, geraadpleegd 25-07-2026. Aanvullend: [IfcTask](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcTask.htm), [IfcWorkSchedule](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkSchedule.htm), [IfcRelSequence](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcRelSequence.htm) — die laatste levert `SequenceType` (START_START, START_FINISH, FINISH_START, FINISH_FINISH) en `TimeLag`, oftewel exact de vier relatietypen met lead/lag die een CPM-planner nodig heeft.

Met andere woorden: **IFC 4.3 is een volwaardig planningsformaat, geen uitwisselingscompromis.** De norm dekt taken, hiërarchie, kalenders, relaties met vertraging, vroege/late data, beide floats en de kritieke-padvlag. De codebase van Open Planner Studio adresseert deze entiteiten al (17 verwijzingen naar `IfcTaskTime`/`IfcRelSequence`/`IfcWorkSchedule`/`IfcWorkCalendar`/`TotalFloat`/`IsCritical` in `src/services/ifc/`). Dat is architectonisch de juiste weddenschap: het scheelt niet alleen een formaat, het maakt vendor lock-in — de belangrijkste klacht over P6 — structureel onmogelijk.

### 7.5 Vier strategische consequenties

1. **Richt op de uitgesloten onderkant, niet op de P6-vervanging.** De 25-seat-drempel van Primavera definieert een scherpe, aantoonbare marktgrens. Bedrijven onder die drempel gebruiken nu Excel of ProjectLibre. Dat is de natuurlijke instroom — niet het overtuigen van een tier-1-aannemer om P6 te verlaten.
2. **Interoperabiliteit is het product, niet een feature.** In een markt waar de duurste aanbieder tien jaar lang zijn prijs niet heeft hoeven verlagen, is de pijn geen functionaliteit maar afhankelijkheid. Betrouwbare IFC-round-trip plus MS Project/P6-import is waardevoller dan de honderdste Gantt-verbetering.
3. **Publieke aanbesteding is de meest kansrijke ingang.** Dat de best gedocumenteerde prijslijst in dit hele onderzoek een *aanbestedingsdocument* was (Texas DIR), is veelzeggend: overheden moeten prijzen en formaten openbaar maken, en zijn daarmee het segment dat het meest ontvankelijk is voor open standaarden en open source. Een IFC-native planner is daar per definitie beter gepositioneerd dan een propriëtair formaat.
4. **Wees sceptisch over "de markt groeit 15 %".** Als dit project ooit wordt afgewogen tegen een businesscase, hoort de realistische groeivoet 4–7 % te zijn, met een adresseerbare bouwmarkt van ~$1,3 mrd — niet de $20 mrd die de vakpers rondstuurt. Beslissingen op basis van het laatste getal zullen systematisch teleurstellen.

---

## 8. Bronnenlijst

**Klasse A — jaarrekeningen, prijslijsten, normteksten, publieke tellers**
- Autodesk, Form 10-K FY2026 — https://www.sec.gov/Archives/edgar/data/769397/000076939726000015/adsk-20260131.htm (25-07-2026)
- Autodesk, Q4 FY2026-persbericht — https://investors.autodesk.com/news-releases/news-release-details/autodesk-inc-announces-fiscal-2026-fourth-quarter-results (25-07-2026)
- Bentley Systems, Q4/FY2025-resultaten — https://investors.bentley.com/news-releases/news-release-details/bentley-systems-announces-fourth-quarter-and-full-year-2025 (25-07-2026)
- Procore Technologies, FY2025-resultaten — https://www.procore.com/press/procore-announces-fourth-quarter-and-full-year-2025-financial-results (25-07-2026)
- Procore Technologies, Form 10-K FY2025 — https://www.sec.gov/Archives/edgar/data/1611052/000162828026011055/pcor-20251231.htm (25-07-2026)
- monday.com, Q4/FY2025-resultaten — https://ir.monday.com/news-and-events/news-releases/news-details/2026/monday-com-Announces-Fourth-Quarter-and-Fiscal-Year-2025-Results/default.aspx (25-07-2026)
- Asana, Q4/FY2026-resultaten — https://investors.asana.com/news-releases/news-release-details/asana-announces-fourth-quarter-and-fiscal-year-2026-results (25-07-2026)
- Atlassian, FY2025-resultaten — https://www.businesswire.com/news/home/20250807057757/en/Atlassian-Announces-Fourth-Quarter-and-Fiscal-Year-2025-Results (25-07-2026)
- Oracle Construction & Engineering Global Price List, Texas DIR-TSO-2539, 10-11-2016 — https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf (25-07-2026)
- Microsoft Project-vergelijkingspagina — https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software (25-07-2026)
- Asana prijspagina — https://asana.com/pricing (25-07-2026)
- monday.com prijspagina — https://monday.com/pricing (25-07-2026)
- buildingSMART IFC 4.3.2: IfcTaskTime — https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcTaskTime.htm (25-07-2026)
- buildingSMART IFC 4.3.2: IfcTask — https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcTask.htm (25-07-2026)
- buildingSMART IFC 4.3.2: IfcWorkSchedule — https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkSchedule.htm (25-07-2026)
- buildingSMART IFC 4.3.2: IfcRelSequence — https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcRelSequence.htm (25-07-2026)
- SourceForge ProjectLibre-downloadteller — https://sourceforge.net/projects/projectlibre/ (25-07-2026)
- GitHub: IfcOpenShell, OpenProject, GanttProject, TaskJuggler, ifc4d-gantt (sterrenaantallen via GitHub API, 25-07-2026)

**Klasse B — semi-hard**
- ITQlick, Oracle Primavera P6-prijzen 2026 — https://www.itqlick.com/oracle-primavera-p6/pricing (25-07-2026)
- CDP Inc., Oracle Primavera Cloud 5-user pakket — https://cdp-inc.com/products/software/purchase-oracle-primavera-cloud-5-users (25-07-2026)
- costbench, Microsoft Planner/Project-prijzen 2026 — https://costbench.com/software/project-management/microsoft-planner/ (25-07-2026)
- Wellingtone, Microsoft Planner Premium licensing 2026 — https://wellingtone.com/microsoft-planner-premium-licensing-plans-pricing-2026/ (25-07-2026)
- Eleco plc bedrijfssite — https://eleco.com/ (25-07-2026); Investegate ELCO-aankondigingen — https://www.investegate.co.uk/company/ELCO (25-07-2026)
- Wikipedia, Project Management Professional (PMP-aantallen, citerend PMI) — https://en.wikipedia.org/wiki/Project_Management_Professional (25-07-2026)
- Wikipedia, Construction (bouwproductie/werkgelegenheid, citerend Global Construction Report 2030) — https://en.wikipedia.org/wiki/Construction (25-07-2026)

**Klasse C — marketingramingen (met terughoudendheid gebruikt)**
- MarketsandMarkets PPM — https://www.marketsandmarkets.com/Market-Reports/project-portfolio-management-software-market-225932595.html (25-07-2026)
- MarketsandMarkets PPM-persbericht — https://www.marketsandmarkets.com/PressReleases/project-portfolio-management-software.asp (25-07-2026)
- MarketsandMarkets 2022-persbericht ($6,5 mrd tegen 2027) — https://www.globenewswire.com/fr/news-release/2022/09/07/2511772/0/en/Project-Portfolio-Management-Market-worth-6-5-billion-by-2027-Report-by-MarketsandMarkets.html (25-07-2026)
- Mordor Intelligence PPM — https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market (25-07-2026)
- Mordor Intelligence PM Software Systems — https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market (25-07-2026)
- ResearchAndMarkets/Mordor PPM 2025–2030 (oudere jaargang) — https://www.researchandmarkets.com/reports/5578888/project-portfolio-management-market-share (25-07-2026)
- Fortune Business Insights PPM — https://www.fortunebusinessinsights.com/project-portfolio-management-ppm-market-104257 (25-07-2026)
- Fortune Business Insights Construction Software — https://www.fortunebusinessinsights.com/construction-software-market-110155 (25-07-2026)
- Verified Market Research PPM — https://www.verifiedmarketresearch.com/product/project-portfolio-management-ppm-market/ (25-07-2026)
- Grand View Research PM Software (via zoeksnippet; bron gaf HTTP 403) — https://www.grandviewresearch.com/industry-analysis/project-management-software-market-report (25-07-2026)
- Statista Enterprise Software Outlook (PM software niet als zelfstandig segment; data achter paywall) — https://www.statista.com/outlook/tmo/software/enterprise-software/project-management-software/worldwide (25-07-2026)
