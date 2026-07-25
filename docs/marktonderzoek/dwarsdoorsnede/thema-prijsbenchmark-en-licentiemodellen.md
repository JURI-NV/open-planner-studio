# Dwarsdoorsnede-thema: Prijsbenchmark en licentiemodellen in planningssoftware

**Onderzoeksdatum:** 25 juli 2026
**Scope:** Primavera P6/Oracle Primavera Cloud, Microsoft Project/Planner, Asta Powerproject (Elecosoft/Eleco), TILOS (Trimble), SYNCHRO (Bentley), Safran, Deltek, Spider Project, Phoenix Project Manager, Smartsheet, monday.com, Wrike, Zoho Projects, ProjectLibre, OpenProject
**Normalisatie-eenheid:** kosten per planner per jaar in USD

---

## 0. Leeswijzer bronkwaliteit

Dit rapport onderscheidt vier bronklassen. Elk cijfer in de tabellen krijgt een label.

| Label | Betekenis | Voorbeelden in dit rapport |
|---|---|---|
| **HARD-V** | Leverancier publiceert het cijfer zelf (prijslijst, webshop, jaarverslag, persbericht) | Oracle Global Price List PDF, Microsoft compare-pagina, Smartsheet FAQ, OpenProject pricing, Spider prijslijst, Phoenix webshop, Eleco/Bentley jaarcijfers |
| **HARD-A** | Openbaar aanbestedings-/raamcontractdocument (procurement) | UK G-Cloud 14 dienstpagina's en prijs-PDF's, Texas DIR-contractprijslijst |
| **HARD-R** | Geautoriseerde wederverkoper met vaste, gepubliceerde prijs | Catalyst USA (Powerproject), ProPro AU, Virtuosity (Bentley), PSG (P6) |
| **ZACHT** | Reviewsite/prijsvergelijker met deels algoritmisch gegenereerde schattingen | ITQlick, PricingNow, CostBench, Tech.co, Capterra |
| **EIGEN SCHATTING** | Mijn eigen afleiding, met expliciet vermelde redenering | Alle geamortiseerde perpetual-cijfers, TILOS/Deltek/Safran-bandbreedtes |

**Belangrijkste kwaliteitswaarschuwing vooraf:** de duurste helft van deze markt publiceert géén prijzen. Ik heb dat op 25 juli 2026 direct geverifieerd op de leverancierspagina's van Oracle Primavera Cloud (https://www.oracle.com/construction-engineering/primavera-cloud-project-management/), Trimble TILOS (https://construction.trimble.com/en/products/tilos), Deltek Acumen (https://www.deltek.com/en/products/project-and-portfolio-management/acumen) en Safran (https://www.safran.com/): geen enkele noemt een bedrag; alle vier sturen naar "request a demo"/"book a consultation". Voor deze vier is elk getal in dit rapport dus ofwel historisch (Oracle 2016), ofwel afkomstig uit aanbestedingsdata, ofwel een expliciet gemarkeerde schatting. Wie in dit segment een "gemiddelde marktprijs" van een reviewsite citeert, citeert in de praktijk een gok.

**Aangenomen wisselkoersen (EIGEN SCHATTING, juli 2026):** 1 GBP = 1,30 USD; 1 EUR = 1,10 USD; 1 AUD = 0,66 USD. Deze koersen bewegen makkelijk ±8% per jaar; alle omgerekende bedragen hebben daardoor een onzekerheidsmarge van minstens die orde. Waar ik omreken, staat het originele bedrag er altijd bij.

---

## 1. Samenvatting

**De markt spant vier ordes van grootte.** Van $0 per planner per jaar (ProjectLibre desktop, OpenProject Community, Open Planner Studio) via ~$110–$230 (Smartsheet, monday, Wrike, Zoho) en ~$360–$660 (Microsoft Project Plan 3/5) naar ~$1.000–$1.500 (Asta Powerproject, Primavera P6 Professional) tot ~$4.600–$5.000 (Bentley SYNCHRO 4D). Boven dat alles staat een vijfde laag die niet per planner maar per project rekent: SYNCHRO Perform begint bij £22.316 per project per jaar en loopt in de hoogste tier op tot boven £111.558 per project (G-Cloud 14, 7 mei 2024).

**Het onderhoudspercentage is geen onderhandelingsvariabele maar een industriestandaard van 22%.** Oracle's eigen prijslijst laat dat tot op de cent kloppen: P6 EPPM $2.750 licentie / $605 support = 22,000%; P6 Professional $2.500 / $550 = 22,000%; P6 Progress Reporter $950 / $209 = 22,000%; Unifier Project Controls $3.950 / $869 = 22,000%. Dezelfde 22,0% duikt tien jaar later op bij een Australische wederverkoper (AUD 5.775 / AUD 1.271). Bij Oracle is 22% dus geen "ongeveer", het is een formule.

**Perpetual is in de bouwplanning feitelijk dood, maar niet overal.** Bentley haalde in FY2025 $1.376,7 mln van $1.501,8 mln omzet uit abonnementen (91,7%); Eleco plc rapporteerde 81% terugkerende omzet en verklaarde de "SaaS financial transition" voltooid. Tegelijk verkoopt Microsoft nog steeds Project Standard 2024 ($679,99) en Project Professional 2024 ($1.129,99) als eenmalige aankoop, en zijn Spider Project ($800–$4.500) en Phoenix Project Manager ($799) volledig perpetual. Perpetual overleeft aan de onderkant (goedkope, feature-bevroren desktops) en in niche-markten, niet in het midden.

**Floating/concurrent kost ongeveer 1,7× een named user.** Het enige publiek naast elkaar staande paar dat ik vond: Powerproject single user $1.320/jaar versus concurrent $2.200/jaar bij Catalyst USA — een factor 1,67. Dat impliceert een break-even bij ~60% gelijktijdig gebruik.

**Prijsstijgingen zijn reëel en versnellen.** Microsoft verhoogde per 1 maart 2022 Office 365 E1 met 25% ($8→$10) en E3 met 15% ($20→$23) — naar eigen zeggen "the first substantive pricing update since we launched Office 365 a decade ago" — en voegde per 1 april 2025 een premie van 5% toe op maandbetaling van jaarcontracten. Oracle heeft sinds november 2016 geen publieke Primavera-prijslijst meer uitgebracht; de ondoorzichtigheid ís het prijsmechanisme geworden.

**De grootste verborgen kostenpost is niet de licentie maar de vloer.** Oracle's P6 EPPM Cloud had in 2016 een minimum van 25 hosted named users à $125/maand: $37.500 per jaar voordat er één planner iets doet. OpenProject Premium heeft een minimum van 100 gebruikers (€19.140/jaar). monday.com rekent voor Work Management met een instap van 10 seats. Minima, niet stuksprijzen, bepalen wie een pakket überhaupt kan overwegen.

**Voor een open-source, IFC-gebaseerde planner is de relevante prijsvergelijking niet $0-versus-$5.000, maar de vraag wie de switching cost betaalt.** IFC 4.3 is gratis en open (CC BY-ND 4.0); de prijs van de standaard is dus nul, terwijl de prijs van de *interoperabiliteit* bij de commerciële pakketten in de licentie zit ingebakken. Dat is precies de wig waar Open Planner Studio in past — uitgewerkt in sectie 12.

---

## 2. De harde kern: wat leveranciers zélf publiceren

### 2.1 Oracle Primavera — de enige volledige, geverifieerde prijslijst

De beste primaire bron voor Oracle-planning is de *Oracle Construction & Engineering Global Price List — Software Investment Guide*, gedateerd **10 november 2016**, gepubliceerd onder het Texas DIR-contract DIR-TSO-2539.
Bron: https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf (opgehaald en tekstueel geëxtraheerd op 25 juli 2026). **HARD-V/HARD-A** (leverancierslijst gepubliceerd in een overheidscontractcontext).

**Eeuwigdurende licenties (Application User-metriek):**

| Product | Licentie (USD) | Software Update License & Support (USD/jaar) | Support % | Minimum |
|---|---:|---:|---:|---:|
| Primavera P6 Enterprise Project Portfolio Management | 2.750 | 605,00 | 22,00% | — |
| Primavera P6 Professional Project Management | 2.500 | 550,00 | 22,00% | — |
| Primavera P6 Progress Reporter | 950 | 209,00 | 22,00% | — |
| Primavera Analytics | 2.000 | 440,00 | 22,00% | 25 |
| Primavera Contract Management, BI Publisher Edition | 2.000 | 440,00 | 22,00% | — |
| Primavera Earned Value Management | 10.000 | 2.200,00 | 22,00% | — |
| Primavera Risk Analysis | 9.500 | 2.090,00 | 22,00% | — |
| Primavera Portfolio Management | 2.900 | 638,00 | 22,00% | 50 |
| Primavera Contractor | 1.295 | 285,00 | 22,00% | — |
| Primavera Unifier Project Controls | 3.950 | 869,00 | 22,00% | 25 |
| Primavera Unifier Portal User | 75 | 17,00 | 22,67% | 100 |
| Primavera Data Warehouse | 25.000 | 5.500,00 | 22,00% | per Processor |

*Kwaliteitsnoot:* de PDF-extractie levert productnamen en prijskolommen in gescheiden blokken; de koppeling product↔prijs is door mij hersteld op basis van de kolomvolgorde. De bovenste drie regels (P6 EPPM / Progress Reporter / P6 Professional) en de 22%-verhouding zijn robuust; regels verder naar onderen (met name Earned Value Management vs. Risk Analysis) zijn **afgeleid uit volgorde** en verdienen bevestiging bij hergebruik. De 22%-toets werkt als interne consistentiecheck en klopt op elke regel — dat is een sterk signaal dat de mapping goed is.

**Cloudabonnementen (Hosted Named User, prijs per maand):**

| Cloud service | USD/gebruiker/maand | Minimum users | Impliciete jaarvloer |
|---|---:|---:|---:|
| Primavera P6 EPPM Cloud Service | 125 | 25 | $37.500 |
| Primavera P6 Progress Reporter Cloud Service | 12 | — | — |
| P6 EPPM Web Services Cloud Service | 20 | — | — |
| Primavera Unifier Project Controls Cloud Service | 150 | 25 | $45.000 |
| Primavera Analytics Cloud Service | 90 | 25 | $27.000 |
| Oracle Prime Projects Cloud Service | 150 | 25 | $45.000 |
| Oracle Prime Portfolios Cloud Service | 125 | 25 | $37.500 |
| Oracle Prime Progress Cloud Service | 12 | — | — |
| EDU Cloud Learning Subscription (per product, End User Edition) | 4 | 25 | $1.200 |
| Primavera Virtual Desktop Cloud Service | 1.000 | per Hosted Environment | — |
| Extra non-productieomgeving | 10% van maandelijkse abonnementsvergoeding | — | — |

**Termijnlicenties — de verborgen derde weg.** Dezelfde prijslijst legt Oracle's termijnlicentiemodel vast, letterlijk:

> "Term licensing available for all Oracle Products. The list price for a term license is based on a specific percentage of the perpetual license price. Annual terms licenses are available from 1 to 5 years: 1 year - 20% of list; 2 year - 35% of list, 3 year - 50% of list, 4 year 60% of list and 5 year 70% of list. The list support price for term licenses is 22% of the list perpetual license fee, as listed in the price list. The term license percentages are not applied to the list support price."

Dit is analytisch belangrijk en wordt zelden geciteerd: bij een 1-jarige termijnlicentie op P6 Professional betaal je 20% × $2.500 = $500 licentie, **maar wel de volle $550 support** (22% van de perpetual lijstprijs, niet van de termijnprijs). Eerste jaar: $1.050 — exact hetzelfde als de geamortiseerde perpetual-kost over vijf jaar. Oracle heeft het termijnmodel dus zó geprijsd dat het nooit goedkoper is dan eeuwigdurend, behalve als je écht korter dan ~3 jaar gebruikt.

### 2.2 Oracle support-voorwaarden — de contractuele hefbomen

Bron: *Oracle Software Technical Support Policies*, **effectieve datum 10 juli 2026**, https://www.oracle.com/contracts/docs/057419.pdf (opgehaald 25 juli 2026). **HARD-V**, en actueel — dit is geen historisch document.

Drie clausules die de effectieve prijs per planner bepalen:

1. **Matching Service Levels.** *"When acquiring technical support, all licenses in any given license set must be supported under the same technical support service level... You may not support a subset of licenses within a license set; the license set must be reduced by terminating any unsupported licenses. You will be required to document license terminations via a termination letter."* Je kunt dus niet twintig van je honderd P6-licenties "op onderhoud" laten en tachtig laten vervallen.

2. **Pricing Following Reduction of Licenses or Support Level.** *"...support for the remaining licenses on that license order will be priced at Oracle's list price for support in effect at the time of termination or reduction minus the applicable standard discount. Such support price will not exceed the previous support fees paid, plus any applicable country annual adjustments... and will not be reduced below the previous support fees paid for the licenses continuing to be supported."* Vertaald: als je van 100 naar 50 planners gaat, daalt je supportfactuur **niet**. Dit is de bekendste shelfware-val in enterprise-planning. De formulering "plus any applicable country annual adjustments" is bovendien Oracle's contractuele haakje voor jaarlijkse indexatie per land — de regionale prijsstijging is dus in de standaardvoorwaarden ingebouwd.

3. **Reinstatement.** *"if technical support lapsed, then the reinstatement fee is 150% of the last annual technical support fee you paid"*, met pro rata terugwerking tot de datum waarop support verviel. Support laten vervallen en later terugkomen kost dus 150% plus alle overgeslagen jaren.

Deze drie clausules samen maken dat de *nominale* 22% in de praktijk een effectief tarief van 22%-plus-indexatie is dat alleen omhoog kan zolang je klant blijft. Dat is een structureel andere economie dan een SaaS-abonnement dat je gewoon opzegt.

### 2.3 Microsoft Project / Planner

**Eeuwigdurend (HARD-V):** Microsoft's eigen vergelijkingspagina https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software (opgehaald 25 juli 2026) noemt:
- **Project Standard 2024 — $679,99** eenmalig, "licensed for one user on one PC"
- **Project Professional 2024 — $1.129,99** eenmalig, één gebruiker/één pc, inclusief resourcemanagement, timesheets en connectiviteit met Project Server Subscription Edition

**Abonnementen (ZACHT, meervoudig bevestigd):** Microsoft toont de per-user-prijzen van de Planner/Project-plannen niet meer op één stabiele, ophaalbare pagina (ik kreeg 404 op vier kandidaat-URL's op 25 juli 2026). De breed en consistent gerapporteerde Amerikaanse lijstprijzen zijn:
- **Planner Plan 1: $10 per gebruiker per maand**
- **Planner and Project Plan 3: $30 per gebruiker per maand**
- **Planner and Project Plan 5: $55 per gebruiker per maand**

Bron o.a. https://www.aguidetocloud.com/licensing/microsoft-project/ (geverifieerd april 2026), bevestigd door meerdere onafhankelijke licentiegidsen. Ik markeer dit als **ZACHT** omdat de primaire leverancierspagina niet ophaalbaar was, maar de spreiding tussen bronnen is nul — het risico op een fout is klein.

Naamswijziging: de plannen heten sinds de Planner/Project-samenvoeging "Planner Plan 1", "Planner and Project Plan 3" en "Planner and Project Plan 5". Dit is relevant voor prijsvergelijking over de tijd: de historische reeks "Project Plan 1/3/5" en de huidige "Planner"-namen slaan grotendeels op dezelfde SKU's.

**Prijsstijgingen — hard gedocumenteerd.** Microsoft's eigen blogpost van 19 augustus 2021 (https://www.microsoft.com/en-us/microsoft-365/blog/2021/08/19/new-pricing-for-microsoft-365/) kondigde per **1 maart 2022** aan:

| Plan | Oud | Nieuw | Stijging |
|---|---:|---:|---:|
| Microsoft 365 Business Basic | $5 | $6 | +20,0% |
| Microsoft 365 Business Premium | $20 | $22 | +10,0% |
| Office 365 E1 | $8 | $10 | +25,0% |
| Office 365 E3 | $20 | $23 | +15,0% |
| Office 365 E5 | $35 | $38 | +8,6% |
| Microsoft 365 E3 | $32 | $36 | +12,5% |

Microsoft noemde dit zelf *"the first substantive pricing update since we launched Office 365 a decade ago"*. Belangrijk: de Project-plannen zaten **niet** in deze ronde — hun lijstprijzen ($10/$30/$55) liggen al jaren stabiel. De les is niet "Microsoft verhoogt Project-prijzen", maar "Microsoft heeft aangetoond dat het na tien jaar stilstand in één klap 10–25% kan doorvoeren".

Tweede beweging: per **1 april 2025** voerde Microsoft een **premie van 5%** in op maandelijkse facturering van jaartermijnabonnementen (Microsoft 365, Office 365, Dynamics 365, Windows 365, Power Platform, Teams Phone, Power BI). **ZACHT** (meervoudig bevestigd door Microsoft-partners; ik kon de originele Microsoft-aankondiging niet ophalen). Dit is model-technisch interessanter dan het bedrag: het is een expliciete prijs voor *flexibiliteit*, en het duwt de markt naar vooruitbetaalde jaarcontracten.

### 2.4 Bentley SYNCHRO — de beste openbare 4D-prijsdata

De rijkste openbare bron is Bentley's eigen prijsdocument voor het Britse raamcontract G-Cloud 14, **gedateerd 7 mei 2024**, ingediend door Bentley Systems UK Limited.
Bron: https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/711959/770193419192797-pricing-document-2024-04-25-0947.pdf — **HARD-A** (aanbestedingsdocument met leveranciersprijzen).

**Named-user ("Practitioner License") jaarprijzen:**

| Product | GBP/gebruiker/jaar | ≈ USD (@1,30) |
|---|---:|---:|
| SYNCHRO 4D (incl. 4D Pro, Modeler, Cost, Perform, Control, Field) | 3.571 | 4.642 |
| SYNCHRO Control | 1.072 | 1.394 |
| SYNCHRO Field | 321 | 417 |

Het document is expliciet over de licentiemetriek: *"This is a named user license, that requires the user to login to access project information. A user must be granted access to a [project] by a project administrator."*

**Projectgebaseerde abonnementen — een fundamenteel ander prijsmodel.** SYNCHRO Perform wordt niet per gebruiker verkocht: *"The annual project-based subscription price for SYNCHRO Perform starts at £22,316 per project."* De projectprijs schaalt met de bouwwaarde van het project:

| Tier | Jaarlijkse bouwwaarde (£) | 4D Desktop Project | Web & Mobile Project | Construction Project |
|---|---|---:|---:|---:|
| 1 | tot 41.778.075 | 22.316 | 22.316 | 31.237 |
| 2 | 41.778.075 – 83.556.150 | 31.237 | 44.626 | 62.474 |
| 3 | 83.556.150 – 125.334.225 | 49.084 | 66.937 | 93.705 |
| 4 | 125.334.225 – 208.890.374 | 84.784 | 111.558 | (hoger) |

Binnen een tier geeft dit **onbeperkte toegang** voor het betreffende project ("Unlimited access applies to one tier up and down in the hierarchy from the Subscriber"). Dit is de facto een *ad-valorem*-licentie: de softwareprijs is een percentage van de bouwsom. Bij Tier 1 Construction Project komt £31.237 op ≈0,075% van een project van £41,8 mln; bij Tier 4 £111.558 op ≈0,053% van £208,9 mln — een licht degressief tarief van rond de 0,05–0,08% van de bouwsom. Dat is een getal dat een open-source alternatief scherp maakt: de commerciële 4D-markt prijst zichzelf op ongeveer **5 tot 8 basispunten van de bouwsom**.

**Kruiscontrole via Bentley's eigen e-commercekanaal.** Virtuosity (Bentley's zelfbedieningskanaal) verkoopt SYNCHRO 4D voor **USD 4.980** voor een 12-maands practitioner-licentie inclusief 2 "Keys" (credits voor training/diensten). Bron: https://en.virtuosity.com/synchro-4d (opgehaald 25 juli 2026) — **HARD-R**. Dit ligt 7% boven de omgerekende G-Cloud-prijs (£3.571 ≈ $4.642), wat gezien wisselkoersdrift en de inbegrepen trainingcredits opmerkelijk consistent is. Twee onafhankelijke kanalen die binnen 7% van elkaar liggen: dit is het betrouwbaarste enkelvoudige prijspunt in het hele enterprise-segment.

### 2.5 Asta Powerproject (Elecosoft / Eleco plc) — drie regio's, drie prijzen

Powerproject is het enige bouwspecifieke pakket waarvoor ik dezelfde SKU in drie valuta's op officiële kanalen kon vinden. Dat maakt het de beste casus voor regionale prijsanalyse.

| Kanaal | Product | Prijs zoals gepubliceerd | Per planner per jaar (USD) | Klasse |
|---|---|---|---:|---|
| Elecosoft UK Ltd, G-Cloud 14 | Asta Powerproject SaaS | **£1.113 a user a year** | 1.447 | HARD-A |
| Catalyst USA (VS-wederverkoper) | Powerproject Subscription – Single User | **$1.320,00** | 1.320 | HARD-R |
| Catalyst USA | Powerproject Subscription – Concurrent | **$2.200,00** | 2.200 (per gelijktijdige gebruiker) | HARD-R |
| ProPro (Australië) | Powerproject jaarabonnement | **AUD 1.480 + GST** (= AUD 1.628 incl.) | 977 (ex GST) | HARD-R |
| ProPro | Powerproject + BIM jaarabonnement | **AUD 2.415 + GST** (= AUD 2.656,50) | 1.594 (ex GST) | HARD-R |
| ProPro | Asta Powerproject **2026** jaarabonnement | **AUD 2.060 + GST** | 1.360 | HARD-R |
| ProPro | Asta Powerproject **2026** + BIM | **AUD 3.360 + GST** | 2.218 | HARD-R |

Bronnen: https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828 (G-Cloud 14 dienstpagina, opgehaald 25 juli 2026); https://catalystusa.com/asta-powerproject (opgehaald 25 juli 2026); https://www.propro.com.au/buy-powerproject-elecosoft (opgehaald 25 juli 2026).

**Twee analytisch scherpe observaties:**

1. **Concurrent kost 1,67× named.** $2.200 / $1.320 = 1,667. Dit is het enige publiek naast elkaar staande named-vs-floating-paar dat ik in dit onderzoek heb kunnen vinden en dus het beste beschikbare anker voor de floating-premie in de sector.

2. **Op de Australische pagina staan twee generaties naast elkaar met ~39% verschil.** AUD 1.480 → AUD 2.060 (+39,2%) voor de standaardeditie, AUD 2.415 → AUD 3.360 (+39,1%) voor de BIM-editie. De identieke procentuele sprong bij beide edities suggereert een *bewuste, uniforme prijsverhoging* en niet een toevallige editiewijziging. **Voorbehoud:** ik kan niet met zekerheid vaststellen of de goedkopere regels een uitlopende voorraad van een oudere versie zijn of het huidige instapproduct. Behandel de +39% als **sterke indicatie, geen bewijs**. Als het klopt, is het de grootste enkelvoudige prijsstijging in dit hele onderzoek.

3. **De BIM-opslag is fors.** AUD 3.360 / AUD 2.060 = 1,63×. Ofwel: 4D/BIM-functionaliteit kost bij Elecosoft ongeveer 63% bovenop de basisplanner. Vergelijk dat met OpenProject, waar de BIM-module **+€1,00 per gebruiker per maand** kost (≈ +$13/jaar, ofwel +9% op het Professional-tarief). Dat is een verschil van bijna twee ordes van grootte in de *marginale* prijs van BIM-integratie.

**Financiële context (HARD-V).** Eleco plc, moederbedrijf van Elecosoft, rapporteerde over boekjaar 2025 (persbericht 28 april 2026, https://www.investegate.co.uk/announcement/rns/elecosoft-public-limited-company--elco/final-results/9540473):
- Omzet **£38,8 mln** (2024: £32,4 mln), +20%
- Total Recurring Revenue **£31,3 mln** (2024: £24,9 mln), +26%
- Annualised Recurring Revenue **£34,3 mln** (2024: £26,6 mln), +29%
- **81% van de omzet is terugkerend** (2024: 77%)
- Net Revenue Retention **110%** (2024: 109%)
- Het bedrijf meldt "an increase in the average Annualised Recurring Revenue (ARR) per customer and a higher average number of licences per customer"

Die laatste zin is het belangrijkste: ARR-groei van 29% bij 110% NRR betekent dat ongeveer 10 procentpunt uit bestaande klanten komt (prijsverhoging + seat-uitbreiding) en de rest uit nieuwe klanten. Dat is een empirische bevestiging dat prijsverhogingen in dit segment daadwerkelijk landen.

### 2.6 Bentley Systems — de referentie voor het abonnementsmodel

Bron: Bentley's persbericht over FY2025 (https://www.bentley.com/news/bsy-announces-q4-and-full-year-2025-results-and-2026-outlook/, opgehaald 25 juli 2026) — **HARD-V**:
- Totale omzet **$1.501,8 mln**, +11,0% (+10,1% bij constante wisselkoers)
- Abonnementsomzet **$1.376,7 mln**, +12,5% → **91,7% van de totale omzet**
- ARR per 31 december 2025: **$1.462,1 mln** (2024: $1.283,3 mln), constante-valuta-groei 11,5%
- Dollar-based net retention rate **109%** (vorig jaar 110%)

Bentley's ARR ($1.462 mln) overtreft zijn jaaromzet ($1.502 mln) bijna volledig: het bedrijf is de facto een abonnementsbedrijf zonder noemenswaardige eenmalige omzet. Combineer dat met de G-Cloud-prijzen: bij $4.980 per SYNCHRO-planner per jaar zou de hele SYNCHRO-lijn hooguit een fractie van die ARR vormen; het model wordt gedragen door de projectgebaseerde tiers en de bredere Bentley-portfolio, niet door named-user-planners.

### 2.7 Spider Project — de zuiverste volumekortingtrap

Spider Project publiceert als een van de weinige enterprise-achtige leveranciers een volledige, expliciete prijstrap.
Bron: https://www.spiderproject.pro/en/price-list/ (opgehaald 25 juli 2026) — **HARD-V**.

| Licentienummer | Professional | Desktop Plus | Desktop |
|---|---:|---:|---:|
| 1e | $4.500 | $2.250 (1e–5e) | $1.700 (1e–5e) |
| 2e | $4.100 | — | — |
| 3e | $3.700 | — | — |
| 4e–6e | $3.300 | — | — |
| 6e–15e | — | $2.050 | $1.500 |
| 7e–10e | $3.000 | — | — |
| 11e–15e | $2.700 | — | — |
| 16e–25e | $2.400 | $1.850 (16e–40e) | $1.350 (16e–40e) |
| 26e+ | $2.250 | — | — |
| 41e+ | — | $1.700 | $1.150 |
| Spider Project Lite | $800 (vaste prijs) | | |

De 26e Professional-licentie kost 50,0% van de eerste. Dat is een steilere en explicietere volumekorting dan wat de grote leveranciers publiceren — Oracle's prijslijst kent alleen *minima*, geen gepubliceerde staffel; alle Oracle-volumekorting zit in de niet-openbare "applicable standard discount" waar de supportvoorwaarden naar verwijzen.

De prijslijst vermeldt géén onderhoudspercentage en géén licentietype. Een Australische distributeur beschrijft de licentie als "a perpetual type of licence", maar die pagina was op 25 juli 2026 niet ophaalbaar. **Behandel het onderhoud van Spider als onbekend.**

### 2.8 Phoenix Project Manager — de goedkoopste echte CPM-desktop

Bron: https://www.phoenixcpm.com/shop/purchase.php (leverancierswebshop, opgehaald 25 juli 2026) — **HARD-V**.
- **Phoenix 5 licentie: $799 per licentie**, eenmalig (perpetual), 1–999 licenties per bestelling
- Aparte EDU-prijsstelling bestaat (/shop/academic.php), bedrag niet getoond
- Geen aparte support-/onderhoudspost op de bestelpagina

Phoenix is daarmee het scharnierpunt van de markt: volledig CPM met kalenders, kritiek pad en baselines voor $799 eenmalig, waar Primavera P6 Professional volgens de 2016-lijstprijs $2.500 + $550/jaar kostte. Een factor 3,1 op de instapprijs, en na vijf jaar een factor 6,6 op de totale kosten.

### 2.9 De SaaS-werkbeheerlaag: Smartsheet, monday.com, Wrike, Zoho

| Pakket | Plan | Jaarlijks gefactureerd | Maandelijks | Gebruikersgrenzen | Klasse |
|---|---|---:|---:|---|---|
| **Smartsheet** | Pro | $9/member/mnd | $12 | 1–10 members, ongelimiteerde contributors | HARD-V |
| | Business | $19/member/mnd | $24 | 3+ members, ongelimiteerde guests | HARD-V |
| | Enterprise | custom | — | 10+ members | HARD-V |
| | Advanced Work Management | custom | — | custom | HARD-V |
| **monday.com** | Free | $0 | $0 | tot 2 seats, 3 boards | HARD-V |
| | Basic | $9/seat/mnd | $9 | rekenvoorbeeld toont 10 seats = $90/mnd | HARD-V |
| | Standard | $12/seat/mnd | $12 | incl. timeline & Gantt | HARD-V |
| | Pro | $19/seat/mnd | $19 | incl. tijdregistratie, private boards | HARD-V |
| | Enterprise | custom | — | portfolio- & resourcemanagement | HARD-V |
| **Wrike** | Free | $0 | — | ongelimiteerd aantal gebruikers | HARD-V |
| | Team | $10/gebruiker/mnd | — | 2–15 gebruikers, incl. Gantt | HARD-V |
| | Business | $25/gebruiker/mnd | — | 5–200 gebruikers | HARD-V |
| | Pinnacle / Apex | custom | — | 200+ / enterprise | HARD-V |
| **Zoho Projects** | Free | $0 | $0 | tot 5 gebruikers, 3 projecten, 5 GB | HARD-V |
| | Premium | ~$4 | ~$5 | — | ZACHT |
| | Enterprise | ~$9 | ~$10 | 10 read-only users inbegrepen | ZACHT |
| | Ultimate | ~$14 | ~$15 | 100 read-only users | ZACHT |

Bronnen: https://www.smartsheet.com/pricing en https://www.smartsheet.com/content/smartsheet-faqs ("Pro plans starting at $9 per member per month and Business plans starting at $19 per member per month, both billed annually"; "Monthly billing is also available at higher per-member rates"); https://monday.com/pricing; https://www.wrike.com/price/ — alle opgehaald 25 juli 2026. Zoho's prijzenpagina rendert de bedragen client-side en gaf bij ophalen alleen de planstructuur en de gratis-limieten prijs; de genoemde bedragen komen uit meerdere onafhankelijke vergelijkers en zijn daarom **ZACHT** (spreiding $4–5 / $9–10 / $14–15).

**Structurele observatie over deze laag:** drie van de vier hanteren een *maandbetalings-premie* van 25–33% (Smartsheet $9→$12 = +33%; $19→$24 = +26%). Wrike verkoopt Business zelfs uitsluitend op jaarbasis. Dit is dezelfde beweging als Microsoft's 5%-premie per april 2025, maar veel agressiever geprijsd. Het jaarcontract is in deze laag geen korting maar de norm; maandelijks is de straf.

**Gebruikersgrenzen zijn hier het echte segmentatie-instrument, niet de prijs.** Smartsheet Pro stopt bij 10 members; Wrike Team bij 15; Wrike Business bij 200. Je wordt niet naar boven geprijsd maar naar boven *geduwd* door een harde grens. Voor een aannemer met 30 planners is Smartsheet Pro ($108/planner/jaar) simpelweg niet beschikbaar — het wordt Business ($228) of Enterprise (custom).

### 2.10 Open source: OpenProject en ProjectLibre

**OpenProject** (https://www.openproject.org/pricing/, opgehaald 25 juli 2026) — **HARD-V**:

| Editie | Prijs | Minimum gebruikers | USD/gebruiker/jaar (@1,10) |
|---|---:|---:|---:|
| Community (GPLv3, self-hosted) | €0 | geen | **$0** |
| Enterprise Basic | €5,95/gebruiker/mnd | 25 | 78,54 |
| Enterprise Professional | €10,95/gebruiker/mnd | 25 | 144,54 |
| Enterprise Premium | €15,95/gebruiker/mnd | 100 | 210,54 |
| Enterprise Corporate | op aanvraag | 250 | — |
| **BIM-module (add-on)** | **+€1,00 per gebruiker** | — | **+$13,20** |

Cloud en on-premises kosten hetzelfde. Meerjaarskortingen: 2 jaar = 5 maanden gratis (≈17% korting), 3 jaar = 8 maanden gratis (≈22%), 4 jaar = 11 maanden (≈23%), 5 jaar = 15 maanden (≈25%). Onderwijs en NGO's krijgen korting op aanvraag.

**ProjectLibre**: de desktopversie is en blijft gratis en open source, met — volgens de leverancier zelf — "Gantt Charts, Network Diagrams, Work Breakdown Structure (WBS), Resource Management, Cost Tracking, Earned Value Management, Critical Path Scheduling (CPM)". ProjectLibre Cloud kost **$9,99 per gebruiker per maand, jaarlijks gefactureerd, voor teams vanaf drie gebruikers**. Bron: https://www.projectlibre.com/2026/07/13/projectlibre-cloud-upgrade-for-teams-and-companies/ (gepubliceerd 13 juli 2026) — **HARD-V**, en met twaalf dagen de meest recente prijsbron in dit rapport.

Merk op dat ProjectLibre Cloud ($119,88/jaar) duurder is dan OpenProject Enterprise Basic ($78,54/jaar) en in dezelfde orde als Smartsheet Pro ($108). De "open source"-vlag levert bij hosting geen prijsvoordeel op — het voordeel zit uitsluitend in de self-hosted/desktop-route.

### 2.11 De quote-only leveranciers: TILOS, Deltek, Safran, Oracle Primavera Cloud

Voor deze vier heb ik op 25 juli 2026 de leverancierssites gecontroleerd en **geen enkele publieke prijs** gevonden:

| Leverancier | Pagina gecontroleerd | Bevinding |
|---|---|---|
| Trimble TILOS | https://construction.trimble.com/en/products/tilos | Geen prijs, geen licentiemodel; alleen "Get a demo" |
| Deltek (Acumen) | https://www.deltek.com/en/products/project-and-portfolio-management/acumen | Geen prijs, geen licentiemodel; alleen "Request a Demo" |
| Safran Software Solutions | https://www.safran.com/ | Producten (Safran Project, Planner, Risk, Risk Manager) genoemd; **geen prijzenpagina in de navigatie**; alleen "Book a Consultation" |
| Oracle Primavera Cloud | https://www.oracle.com/construction-engineering/primavera-cloud-project-management/ | Geen prijzen, geen edities, geen link naar prijslijst |

Het enige harde publieke prijssignaal voor Oracle Primavera Cloud in 2024–2026 komt uit aanbestedingsdata: de G-Cloud 14-dienst van **Laminar Group Ltd** voor "Oracle Primavera Cloud (OPC)" vermeldt **"£8 to £176 a licence a month"**, geen gratis proefperiode.
Bron: https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/274592422777005 (opgehaald 25 juli 2026) — **HARD-A**.

Omgerekend: **$125 tot $2.746 per licentie per jaar**. De onderkant (£8/maand) correspondeert vrijwel zeker met lichte rollen (team member / progress reporter / viewer), de bovenkant (£176/maand ≈ $2.746/jaar) met volwaardige planner-licenties. Vergelijk met Oracle's 2016-lijstprijs voor P6 EPPM Cloud ($125/maand ≈ $1.500/jaar): de bovenkant van de G-Cloud-bandbreedte ligt **83% hoger** dan de lijstprijs van tien jaar eerder — een impliciete samengestelde stijging van ongeveer 6,2% per jaar. **EIGEN SCHATTING** met een groot voorbehoud: de bandbreedte kan andere modules bevatten, en wederverkopersmarge zit erin.

---

## 3. Genormaliseerde prijsladder: kosten per planner per jaar (USD)

### 3.1 Normalisatiemethode

Om perpetual en abonnement vergelijkbaar te maken hanteer ik consequent:

> **Kosten per planner per jaar = (eeuwigdurende licentieprijs ÷ 5) + jaarlijks onderhoud**

Motivatie voor de vijfjaarsafschrijving: het is de gangbare afschrijvingstermijn voor bedrijfssoftware, het valt samen met Oracle's langste termijnlicentie (5 jaar = 70% van lijst), en het is de horizon waarop de meeste desktopplanners een grote versiesprong doormaken. **Dit is een expliciete keuze, geen gegeven.** Bij drie jaar worden alle perpetual-regels ~67% duurder, bij tien jaar ~50% goedkoper. Ik noem dit expliciet in de onzekerhedensectie.

Voor abonnementen gebruik ik de jaarlijks-gefactureerde lijstprijs × 12 (dus zonder de maandbetalingspremie), omdat dat de prijs is waarop organisaties feitelijk inkopen.

### 3.2 De ladder

| # | Trede | Pakket / editie | Model | Lijstprijs zoals gepubliceerd | **USD/planner/jaar** | Bronklasse |
|---|---|---|---|---|---:|---|
| 0 | **Gratis / open source** | Open Planner Studio (LGPL-3.0) | open source desktop + web | — | **0** | HARD-V (repo) |
| 0 | | OpenProject Community (GPLv3) | open source, self-hosted | — | **0** | HARD-V |
| 0 | | ProjectLibre desktop | open source | — | **0** | HARD-V |
| 1 | **Instap-SaaS** | Zoho Projects Premium | SaaS | ~$4/gebr./mnd (jaar) | **~48** | ZACHT |
| 1 | | OpenProject Enterprise Basic | SaaS/on-prem, min 25 | €5,95/gebr./mnd | **79** | HARD-V |
| 1 | | Zoho Projects Enterprise | SaaS | ~$9/gebr./mnd | **~108** | ZACHT |
| 1 | | Smartsheet Pro | SaaS, max 10 members | $9/member/mnd | **108** | HARD-V |
| 1 | | monday.com Basic | SaaS | $9/seat/mnd | **108** | HARD-V |
| 1 | | Wrike Team | SaaS, 2–15 gebr. | $10/gebr./mnd | **120** | HARD-V |
| 1 | | ProjectLibre Cloud | SaaS, min 3 | $9,99/gebr./mnd | **120** | HARD-V |
| 1 | | Microsoft Planner Plan 1 | SaaS | $10/gebr./mnd | **120** | ZACHT |
| 1 | | MS Project Standard 2024 | perpetual | $679,99 eenmalig | **136** (5 jr) | HARD-V (afgeleid) |
| 1 | | monday.com Standard | SaaS, incl. Gantt | $12/seat/mnd | **144** | HARD-V |
| 1 | | OpenProject Professional | SaaS/on-prem, min 25 | €10,95/gebr./mnd | **145** | HARD-V |
| 1 | | Phoenix Project Manager 5 | perpetual CPM | $799 eenmalig | **160** (5 jr) | HARD-V (afgeleid) |
| 1 | | Spider Project Lite | perpetual | $800 eenmalig | **160** (5 jr) | HARD-V (afgeleid) |
| 1 | | Zoho Projects Ultimate | SaaS | ~$14/gebr./mnd | **~168** | ZACHT |
| 2 | **Midden** | OpenProject Premium | SaaS/on-prem, min 100 | €15,95/gebr./mnd | **211** | HARD-V |
| 2 | | Smartsheet Business | SaaS | $19/member/mnd | **228** | HARD-V |
| 2 | | monday.com Pro | SaaS | $19/seat/mnd | **228** | HARD-V |
| 2 | | MS Project Professional 2024 | perpetual | $1.129,99 eenmalig | **226** (5 jr) | HARD-V (afgeleid) |
| 2 | | Wrike Business | SaaS, 5–200 gebr. | $25/gebr./mnd | **300** | HARD-V |
| 2 | | Spider Project Desktop (1e) | perpetual | $1.700 eenmalig | **340** (5 jr) | HARD-V (afgeleid) |
| 2 | | Microsoft Project Plan 3 | SaaS | $30/gebr./mnd | **360** | ZACHT |
| 3 | **Bouwspecifiek** | Spider Project Desktop Plus (1e) | perpetual | $2.250 eenmalig | **450** (5 jr) | HARD-V (afgeleid) |
| 3 | | Microsoft Project Plan 5 | SaaS | $55/gebr./mnd | **660** | ZACHT |
| 3 | | Spider Project Professional (1e) | perpetual | $4.500 eenmalig | **900** (5 jr, excl. support) | HARD-V (afgeleid) |
| 3 | | Powerproject (AU, standaard) | abonnement | AUD 1.480 + GST | **977** | HARD-R |
| 3 | | **Primavera P6 Professional** | perpetual + 22% (2016-lijst) | $2.500 + $550/jr | **1.050** | HARD-V (afgeleid) |
| 3 | | **Primavera P6 EPPM** | perpetual + 22% (2016-lijst) | $2.750 + $605/jr | **1.155** | HARD-V (afgeleid) |
| 3 | | Powerproject (VS, named) | abonnement | $1.320/jr | **1.320** | HARD-R |
| 3 | | Powerproject (AU, 2026-editie) | abonnement | AUD 2.060 + GST | **1.360** | HARD-R |
| 3 | | SYNCHRO Control | abonnement, named | £1.072/jr | **1.394** | HARD-A |
| 3 | | Powerproject SaaS (UK) | abonnement | £1.113/jr | **1.447** | HARD-A |
| 3 | | P6 Professional (AU-wederverkoper) | perpetual + 22% | AUD 5.280 + 1.162/jr | **~1.464** | HARD-R |
| 4 | **Enterprise** | **P6 EPPM Cloud** (2016-lijst) | SaaS named, **min 25** | $125/gebr./mnd | **1.500** (vloer $37.500/jr) | HARD-V |
| 4 | | Powerproject concurrent (VS) | abonnement, floating | $2.200/jr | **2.200** per gelijktijdige | HARD-R |
| 4 | | Powerproject + BIM (AU, 2026) | abonnement | AUD 3.360 + GST | **2.218** | HARD-R |
| 4 | | Oracle Prime Projects Cloud (2016) | SaaS, min 25 | $150/gebr./mnd | **1.800** | HARD-V |
| 4 | | Oracle Primavera Cloud (UK G-Cloud, bovenkant) | SaaS | £176/licentie/mnd | **~2.746** | HARD-A |
| 4 | | **SYNCHRO 4D** (UK G-Cloud) | abonnement, named | £3.571/jr | **~4.642** | HARD-A |
| 4 | | **SYNCHRO 4D** (Virtuosity) | abonnement, named | $4.980/jr | **4.980** | HARD-R |
| 5 | **Project-/portfolio-licentie** | SYNCHRO 4D Desktop Project Tier 1 | per project | £22.316/project/jr | n.v.t. (≈$29.000) | HARD-A |
| 5 | | SYNCHRO Construction Project Tier 4 | per project | £111.558+/project/jr | n.v.t. (≈$145.000) | HARD-A |
| ? | **Quote-only** | Trimble TILOS | perpetual (niet-gepubliceerd) | — | **schatting $800–1.600** | EIGEN SCHATTING |
| ? | | Deltek Acumen / Open Plan | quote-only | — | **schatting $1.800–4.800** | EIGEN SCHATTING |
| ? | | Safran Project | quote-only | — | **schatting $1.500–3.000** | EIGEN SCHATTING |

**Onderbouwing van de drie schattingen (expliciet gemarkeerd als schatting):**

- **TILOS**: PricingNow beschrijft het model als "one-time license fee... perpetual license" zonder bedrag. TILOS is een niche lineair-planningspakket dat historisch rond €5.000–8.000 per eeuwigdurende licentie werd verkocht en dat na de Trimble-overname in het Trimble-portfolio is opgenomen. Bij €6.000 eenmalig plus ~18–20% onderhoud komt de vijfjaars-geamortiseerde kost op ongeveer $1.300–1.600 per planner per jaar; bij een lagere aanname ($4.000) zakt dat naar ~$800. Ik geef daarom $800–1.600. **Zwakke schatting** — gebaseerd op modelbeschrijving plus marktpositionering, niet op enige waargenomen prijs.
- **Deltek Acumen / Open Plan**: ITQlick noemt "$75 to $200 [per user per month] for SMBs, and $150 to $400 for enterprise". ITQlick is een algoritmische prijsvergelijker en telt hier als **ZACHT tot onbruikbaar**. Ik gebruik het alleen als orde-van-grootte-anker: $150–400/maand = $1.800–4.800/jaar. Dat is consistent met Deltek's positionering (defensie/overheid, EVM-compliance, naast P6) en met het feit dat Deltek geen zelfbedieningskanaal heeft. **Matige schatting.**
- **Safran Project**: ITQlick noemt "$150 per user/month" = $1.800/jaar. Safran wordt in olie/gas en grote infra ingezet als P6-alternatief met sterke risicokoppeling; een prijspunt rond of net boven P6 EPPM Cloud is plausibel. Ik geef $1.500–3.000. **Matige schatting.**

### 3.3 De ladder in één blik

```
$0        Open Planner Studio · OpenProject Community · ProjectLibre desktop
$50–170   Zoho · OpenProject Basic/Professional · Smartsheet Pro · monday Basic/Standard
          Wrike Team · ProjectLibre Cloud · Planner Plan 1 · Phoenix ($799 perpetual)
$210–360  OpenProject Premium · Smartsheet Business · monday Pro · MS Project Professional
          (perpetual) · Wrike Business · MS Project Plan 3
$450–900  Spider Desktop Plus/Professional · MS Project Plan 5
$980–1500 Powerproject (alle regio's) · Primavera P6 Professional/EPPM · SYNCHRO Control
          · P6 EPPM Cloud (min 25 seats)
$1800–2800 Oracle Prime Projects · Powerproject concurrent · Powerproject+BIM
          · Oracle Primavera Cloud (bovenkant aanbestedingsband)
$4600–5000 Bentley SYNCHRO 4D
$29k–145k  SYNCHRO project-abonnementen (per project per jaar)
```

De factor tussen het goedkoopste betaalde volwaardige CPM-pakket (Phoenix, $160/jaar geamortiseerd) en het duurste per-planner-pakket (SYNCHRO 4D, $4.980/jaar) is **31×**. Ten opzichte van gratis is de factor oneindig — en dat is precies waarom prijs alléén nooit de beslissende variabele is in dit segment.

---

## 4. Patroonanalyse: perpetual versus abonnement

### 4.1 De feitelijke stand van zaken

| Leverancier | Perpetual beschikbaar? | Abonnement beschikbaar? | Bewijs |
|---|---|---|---|
| Oracle Primavera | Ja (Application User) + termijnlicentie 1–5 jr | Ja (Hosted Named User) | Prijslijst 2016; termijnclausule |
| Microsoft Project | Ja (Standard/Professional 2024) | Ja (Plan 1/3/5) | Microsoft compare-pagina |
| Elecosoft Powerproject | Niet meer aangeboden op de gecontroleerde kanalen | Ja, uitsluitend | Catalyst USA, ProPro, G-Cloud |
| Bentley SYNCHRO | Nee | Ja (named + per project) | G-Cloud 14; 91,7% abonnementsomzet |
| Spider Project | Ja | Onbekend | Prijslijst zonder termijnvermelding |
| Phoenix | Ja | Nee zichtbaar | Webshop |
| Smartsheet / monday / Wrike / Zoho | Nee | Ja, uitsluitend | Prijzenpagina's |
| OpenProject | Ja (Community, gratis) | Ja (Enterprise) | Prijzenpagina |
| ProjectLibre | Ja (desktop, gratis) | Ja (Cloud) | projectlibre.com |

### 4.2 Waarom de transitie voltooid is bij de een en niet bij de ander

De financiële cijfers laten zien dat de transitie *bedrijfsbreed* is voltooid bij de bouw-/infra-leveranciers die publiek rapporteren:

- **Bentley**: abonnementen = 91,7% van de omzet (FY2025), ARR $1.462,1 mln
- **Eleco**: terugkerende omzet = 81% (FY2025, was 77% in 2024), ARR £34,3 mln, "SaaS financial transition" verklaard als voltooid

Waar perpetual overleeft, is dat om twee redenen:
1. **Als goedkope, feature-bevroren instap** (Microsoft Project Standard/Professional 2024, Phoenix, Spider). Het perpetual-product krijgt geen nieuwe functies; het is een prijsanker om SaaS aantrekkelijk te laten lijken. Microsoft Project Professional 2024 kost $226/jaar geamortiseerd tegen Plan 3 op $360/jaar — maar Plan 3 bevat cloudservices, Project for the Web/Planner-integratie en doorlopende updates die de perpetual-versie definitief mist.
2. **In markten met budgettaire of soevereiniteitsredenen om niet te abonneren** (Spider Project in Rusland/CIS en Australië; defensie- en overheidsinkoop die kapitaaluitgaven boven exploitatie-uitgaven verkiest).

### 4.3 De verborgen prijs van "perpetual" bij Oracle

Oracle's model verdient een aparte kanttekening omdat het het minst op perpetual lijkt van alle perpetual-modellen. Combineer de drie eerder geciteerde clausules:

- support = 22% per jaar, verplicht bij aankoop
- support kan niet voor een deelverzameling worden aangehouden (Matching Service Levels)
- bij vermindering van het aantal licenties daalt de supportfactuur niet ("will not be reduced below the previous support fees paid")
- support laten vervallen en terugkomen kost 150% plus terugwerkende jaren

Netto: een "eeuwigdurende" Oracle-licentie gedraagt zich als een abonnement dat je niet kunt opzeggen zonder de software onbruikbaar (want ongepatcht en niet-upgradebaar) te maken, en waarvan de prijs alleen omhoog kan. De 22% is nominaal een onderhoudspercentage; economisch is het een abonnementstarief met een verplichte instapfee van 100% (de licentie zelf) en zonder afbouwmogelijkheid.

**Break-even-berekening (EIGEN SCHATTING):** vergeleken met een zuiver abonnement van $X/jaar is Oracle perpetual pas goedkoper als $2.500/n + $550 < $X, waarbij n = jaren gebruik. Bij n=5 is dat $1.050; bij n=10 is dat $800. Tegen de aanbestedingsbovenkant van Oracle Primavera Cloud (£176/mnd ≈ $2.746/jaar) is perpetual dus 2,6× tot 3,4× goedkoper — mits je de infrastructuur, DBA's en upgrades zelf draagt, wat volgens de eerder genoemde TCO-schattingen 2–3× de licentiekosten kan zijn.

---

## 5. Patroonanalyse: named versus floating/concurrent

### 5.1 De metrieken in de praktijk

| Leverancier | Metriek | Definitie zoals gepubliceerd |
|---|---|---|
| Oracle | **Application User** | *"an individual authorized by you to use the applicable licensed application programs which are installed on a single server or on multiple servers **regardless of whether the individual is actively using the programs at any given time**"* |
| Oracle (cloud) | **Hosted Named User** | idem, per hosted omgeving; minimum 25 |
| Oracle (server) | **Processor** | aantal cores × core-factor uit de Oracle Processor Core Factor Table, naar boven afgerond |
| Bentley | **Practitioner License** | *"a named user license, that requires the user to login to access project information"* |
| Elecosoft | **Single User** vs **Concurrent** | beide aangeboden; concurrent 1,67× duurder |
| Smartsheet | **Member** vs **Contributor/Guest** | alleen members betalen; contributors ongelimiteerd gratis |
| monday.com | **Seat** vs **Viewer** | viewers ongelimiteerd gratis vanaf Basic |
| Zoho Projects | **User** vs **read-only user** | Enterprise: 10 read-only gratis; Ultimate: 100 |

### 5.2 De floating-premie

Het enige harde, publieke datapunt: **Powerproject concurrent $2.200 / single user $1.320 = 1,67×** (Catalyst USA, 25 juli 2026).

**Break-even (EIGEN SCHATTING, eenvoudige rekensom):** floating loont wanneer het aantal gelijktijdige gebruikers minder dan 1/1,67 = **60%** van het totale aantal planners bedraagt. Voor een aannemer met 20 planners waarvan er doorgaans hoogstens 10 tegelijk plannen (50%), kost floating 10 × $2.200 = $22.000 tegen named 20 × $1.320 = $26.400 — een besparing van 17%. Bij 14 gelijktijdige gebruikers (70%) keert het om: $30.800 tegen $26.400.

Dit maakt floating vooral aantrekkelijk voor organisaties met veel *incidentele* planners (werkvoorbereiders, projectleiders die maandelijks een baseline bijwerken) en weinig fulltime planners. Precies de situatie in de meeste middelgrote bouwbedrijven.

### 5.3 De belangrijkste onderschatte verschuiving: gratis lezers

De SaaS-laag heeft een prijsmechanisme geïntroduceerd dat de klassieke bouwleveranciers grotendeels missen: **onbeperkte gratis raadplegers**. Smartsheet geeft ongelimiteerde contributors bij elk betaald plan; monday.com geeft ongelimiteerde viewers vanaf Basic; Zoho geeft 10 (Enterprise) tot 100 (Ultimate) read-only gebruikers gratis. Oracle daarentegen rekende in 2016 $12/maand voor een Progress Reporter Cloud-gebruiker en $75 + $17/jaar voor een Unifier Portal User met een minimum van 100.

Voor een bouwproject met 5 planners en 200 uitvoerders die alleen willen kijken, is dit het verschil tussen $0 extra (Smartsheet/monday) en 200 × $144/jaar = $28.800 (Oracle Progress Reporter Cloud à $12/maand). Dat verklaart waarom werkbeheer-SaaS de bouw langs de zijkant binnenkomt: niet via de planner, maar via de 195 mensen die alleen de planning willen zíen. Dit is de meest kostenbepalende licentiekeuze in de hele sector en hij gaat niet over planners.

---

## 6. Onderhoudspercentages

### 6.1 Wat de data laten zien

| Leverancier | Onderhoudspercentage | Bewijs | Klasse |
|---|---:|---|---|
| Oracle (alle Primavera-producten) | **22,00%** | $605/$2.750, $550/$2.500, $209/$950, $440/$2.000, $869/$3.950, $2.090/$9.500 — allemaal exact 22,0% | HARD-V |
| Oracle (Australië, 2025-e wederverkoper) | **22,0%** | AUD 1.271 / AUD 5.775 = 22,01%; AUD 1.162 / AUD 5.280 = 22,01% | HARD-R |
| Oracle Database EE (referentie) | 22,0% | $10.450 / $47.500 | ZACHT |
| Elecosoft, Bentley, Smartsheet, monday, Wrike, Zoho, OpenProject, ProjectLibre | **n.v.t.** — inbegrepen in abonnement | prijzenpagina's | HARD-V |
| Spider Project | **onbekend** — niet vermeld op prijslijst | — | — |
| Phoenix | **geen aparte post** op de bestelpagina | — | HARD-V |
| Microsoft (perpetual) | **geen onderhoud** — je koopt een versie, punt | compare-pagina | HARD-V |

### 6.2 Interpretatie

De 22% is de facto de industriestandaard voor eeuwigdurende enterprise-software, en Oracle past hem met machinale precisie toe. De consequentie voor het TCO-model: bij 22% per jaar is de cumulatieve onderhoudslast na 4,55 jaar gelijk aan de oorspronkelijke licentieprijs, en na 10 jaar 2,2× de licentieprijs. Over een tienjarige levensduur is dus **69% van de totale licentiekost onderhoud** en slechts 31% de aanschaf.

Dat verklaart waarom de abonnementstransitie voor leveranciers financieel neutraal tot positief was: een abonnement van 22–30% van de historische perpetual-prijs per jaar levert dezelfde of hogere lifetime-omzet, met betere voorspelbaarheid en zonder de eerstejaarsdrempel die aankoop remt.

**Toets:** SYNCHRO 4D kost $4.980/jaar. Als dat "22–30% van een impliciete perpetual-prijs" was, zou de bijbehorende eeuwigdurende licentie $16.600–22.600 hebben gekost. Dat is een plausibel prijspunt voor een 4D-suite met zes modules — en het suggereert dat Bentley bij de overgang naar abonnement de effectieve jaarprijs *niet* heeft verlaagd. **EIGEN SCHATTING**, gebaseerd op de 22%-conventie toegepast in omgekeerde richting.

### 6.3 De onzichtbare korting

Oracle's supportvoorwaarden verwijzen herhaaldelijk naar *"Oracle's list price for support in effect at the time... minus the applicable standard discount"*. Die "standard discount" is nergens gepubliceerd en is in de praktijk de belangrijkste variabele in een Oracle-deal. Uit de publieke data valt hier niets over af te leiden. Wat wél afleidbaar is: het feit dat de **supportprijs bij afname van licenties niet onder het eerder betaalde niveau mag zakken**, betekent dat een grote initiële korting op licenties leidt tot een supportbedrag dat verhoudingsgewijs hoger is en vervolgens vastzit. Een 60% licentiekorting geeft een support-percentage van 22% van de *netto* prijs — dus 8,8% van lijst — maar die voet ligt daarna contractueel vast als bodem. Wie later afschaalt, betaalt effectief 22% van lijst over een kleiner aantal licenties.

---

## 7. Prijsstijgingen door de jaren heen

### 7.1 Wat hard vaststaat

| Leverancier | Wijziging | Datum | Bewijs |
|---|---|---|---|
| Microsoft | O365 E1 $8→$10 (+25%), E3 $20→$23 (+15%), E5 $35→$38 (+8,6%), M365 E3 $32→$36 (+12,5%), Business Basic $5→$6 (+20%), Business Premium $20→$22 (+10%) | aangekondigd 19-08-2021, effectief **01-03-2022** | Microsoft-blog, HARD-V |
| Microsoft | +5% premie op maandbetaling van jaarabonnementen | effectief **01-04-2025** | partnerbronnen, ZACHT |
| Elecosoft (AU) | AUD 1.480 → AUD 2.060 (+39,2%) en AUD 2.415 → AUD 3.360 (+39,1%) tussen twee opeenvolgende edities | zichtbaar op wederverkoperspagina 25-07-2026 | HARD-R, **interpretatie onzeker** |
| Oracle | Geen publieke prijslijst meer sinds **10-11-2016** | — | afwezigheid van bron |

### 7.2 De Oracle-lacune, en wat je er wél uit kunt afleiden

Oracle publiceert sinds november 2016 geen Construction & Engineering-prijslijst meer. Dat is op zichzelf een bevinding: **prijsintransparantie is bij Oracle een strategisch instrument geworden**, niet een administratieve nalatigheid. Voor Oracle Technology-producten bestaan nog wel publieke lijsten; voor Primavera niet meer.

De enige manier om de drift te schatten is via aanbestedingsdata:

| Referentiepunt | Bron | Prijs per planner per jaar |
|---|---|---:|
| P6 EPPM Cloud, lijstprijs nov 2016 | Oracle Global Price List | $1.500 ($125/mnd) |
| Oracle Primavera Cloud, bovenkant, G-Cloud 14 (2024) | Laminar Group | ~$2.746 (£176/mnd) |

**EIGEN SCHATTING:** $1.500 → $2.746 over 8 jaar is een samengestelde jaarlijkse stijging van **6,2%**. Ter vergelijking: de Amerikaanse CPI steeg in dezelfde periode gemiddeld ongeveer 3% per jaar. Als deze afleiding klopt, prijst Oracle ruwweg **twee keer inflatie**.

**Zwaktes in deze afleiding, expliciet:** (a) de £176 komt van een wederverkoper en bevat marge; (b) OPC en P6 EPPM Cloud zijn niet exact hetzelfde product — OPC is Oracle's nieuwere platform met meer functionaliteit; (c) £176 is de bovengrens van een band die bij £8 begint, dus mogelijk een premium-SKU. Ik hecht hier **lage tot matige betrouwbaarheid** aan. Het is een indicatie, geen meting.

### 7.3 Waarom de Microsoft-case leerzamer is dan hij lijkt

Microsoft hield Office 365 tien jaar op dezelfde prijs en verhoogde toen in één keer met 10–25%. Voor de Project-plannen is de prijs ($10/$30/$55) al langere tijd stabiel. De structurele les voor inkopers: **prijsstabiliteit in SaaS is geen eigenschap van het model maar een keuze van de leverancier, en die keuze kan zonder onderhandeling worden herzien.** Bij een eeuwigdurende licentie met 22% onderhoud kan de leverancier alleen het onderhoud indexeren (en Oracle heeft daarvoor de clausule "country annual adjustments"); bij SaaS kan de hele prijs in één keer omhoog. Het abonnementsmodel verplaatst het prijsrisico volledig naar de klant.

De 5%-premie op maandbetaling (april 2025) is bovendien een tweede-orde-instrument: het verhoogt de omzet zonder de headline-prijs aan te raken, en dwingt tegelijk langere commitments af. Verwacht dat andere leveranciers dit kopiëren; Smartsheet doet feitelijk al hetzelfde met een premie van 26–33%.

---

## 8. Regionale prijsverschillen en kortingen

### 8.1 Dezelfde software, drie continenten

Powerproject is de enige casus met drie officiële kanalen:

| Regio | Kanaal | Prijs | In USD (aangenomen koersen) | Index (VS = 100) |
|---|---|---|---:|---:|
| Australië | ProPro (standaard, oudere editie) | AUD 1.480 + GST | 977 | 74 |
| Australië | ProPro (2026-editie) | AUD 2.060 + GST | 1.360 | 103 |
| Verenigde Staten | Catalyst USA (named) | $1.320 | 1.320 | 100 |
| Verenigd Koninkrijk | Elecosoft UK, G-Cloud 14 | £1.113 | 1.447 | 110 |

Voor de 2026-editie liggen VS, VK en Australië binnen ±10% van elkaar — opvallend consistent. **De prijsverschillen tussen westerse markten zijn bij Powerproject dus grotendeels wisselkoerseffect, geen bewuste regionale differentiatie.**

Bij Primavera ligt dat anders:

| Regio | Bron | P6 Professional-achtige licentie | In USD |
|---|---|---|---:|
| VS lijstprijs 2016 | Oracle Global Price List | $2.500 (P6 Professional) | 2.500 |
| Australië ~2025 | Compass Consult ("Oracle list price") | AUD 5.280 (P6 PPM) | ~3.485 |
| Australië ~2025 | Compass Consult ("Oracle list price") | AUD 5.775 (P6 EPPM) | ~3.812 |

Bron: https://compassconsult.co/primavera-p6-pricing-usa/ (opgehaald 25 juli 2026) — **HARD-R**, met de kanttekening dat de pagina geen datum draagt.

P6 EPPM: $2.750 (VS-lijst 2016) versus ~$3.812 (AU-lijst ~2025) = **+38,6%**. Over ~9 jaar is dat 3,7% per jaar samengesteld. Dit is consistent met een combinatie van inflatie-indexatie en een Australische opslag, en het is aanmerkelijk gematigder dan de 6,2%/jaar die ik uit de OPC-cloudband afleidde. **De twee schattingen spreken elkaar tegen; ik hecht meer waarde aan de Australische reeks omdat het exact dezelfde SKU betreft.** Beste schatting voor Oracle's perpetual prijsdrift: **3–4% per jaar**, dus ongeveer inflatie plus een half tot een heel procentpunt.

### 8.2 Opkomende markten

Zoho is de duidelijkste casus van bewuste regionale differentiatie: het bedrijf voert aparte prijslijsten per land met substantieel lagere bedragen in India en andere opkomende markten. Ik kon de Indiase prijzenpagina op 25 juli 2026 niet ophalen (404 op twee URL-varianten), dus ik **onthoud me van cijfers** en beperk me tot de vaststelling dat de differentiatie bestaat en dat Zoho's globale instapprijs (~$4–5/gebruiker/maand) al ver onder de westerse concurrentie ligt.

Voor Oracle, Bentley, Deltek en Safran heb ik geen enkel publiek prijspunt buiten Noord-Amerika, het VK, de EU en Australië gevonden. **Dit is een reële blinde vlek in dit onderzoek** — de markten waar volumegroei in bouwplanning plaatsvindt (India, Zuidoost-Azië, Golfregio, Afrika) zijn prijsmatig volledig ondoorzichtig.

### 8.3 Kortingsmechanismen die wél gepubliceerd zijn

| Mechanisme | Leverancier | Omvang | Bron |
|---|---|---|---|
| Volumestaffel per licentie | Spider Project | 26e licentie = 50,0% van de 1e | prijslijst |
| Meerjarige vooruitbetaling | OpenProject | 2 jr = 5 mnd gratis (~17%); 3 jr = 8 mnd (~22%); 4 jr = 11 mnd (~23%); 5 jr = 15 mnd (~25%) | prijzenpagina |
| Jaar- vs maandbetaling | Smartsheet | Pro $9 vs $12 (-25%); Business $19 vs $24 (-21%) | prijzenpagina/FAQ |
| Jaar- vs maandbetaling | Microsoft | 5% premie op maandbetaling (vanaf 01-04-2025) | ZACHT |
| Onderwijs/NGO | OpenProject | "contact sales" | prijzenpagina |
| Onderwijs gratis | Elecosoft | *"Asta Powerproject licences are offered for free to recognised teaching establishments... on a rolling annual basis"* — alleen aan de instelling, niet aan studenten | https://eleco.com/products/asta/asta-powerproject/single-education-licence/ |
| Onderwijs | Phoenix | aparte EDU-prijslijst (bedrag niet publiek) | webshop |
| Onderwijs (cloud learning) | Oracle | EDU Cloud Learning Subscription $4/gebruiker/maand, min 25 | prijslijst 2016 |
| Termijnlicentie | Oracle | 1 jr = 20% / 2 jr = 35% / 3 jr = 50% / 4 jr = 60% / 5 jr = 70% van perpetual lijst | prijslijst 2016 |

**Analytisch belangrijk:** gratis onderwijslicenties zijn geen liefdadigheid maar het goedkoopste kanaalinstrument in deze markt. Elecosoft geeft Powerproject gratis aan hogescholen; Oracle heeft een compleet Primavera-curriculum; Bentley bundelt trainingcredits ("Keys") bij elke Virtuosity-aankoop. De afgestudeerde die Powerproject of P6 kent, dwingt zijn werkgever tot dezelfde keuze. Voor een open-source planner is dit het strategisch belangrijkste kortingsmechanisme in de tabel — en tegelijk het enige waar een gratis product per definitie niet mee kan concurreren, omdat de concurrent zijn onderwijsprijs al tot nul heeft verlaagd.

---

## 9. Training, certificering en implementatie

### 9.1 Certificeringskosten

| Certificering | Kosten | Bron | Klasse |
|---|---:|---|---|
| PMI-SP (Scheduling Professional) — examen, PMI-lid | US$520 | https://www.pmimontreal.org/en/project-scheduling-professional-pmi-sp | ZACHT (PMI-chapter, niet PMI zelf) |
| PMI-SP — examen, niet-lid | US$670 | idem | ZACHT |
| Oracle EDU Cloud Learning Subscription (per product) | $4/gebruiker/maand, min 25 → **$1.200/jaar per groep van 25** | Oracle prijslijst 2016 | HARD-V |
| Primavera P6-training, marktbreed | "from completely free to over USD 3,000 per year"; Udemy in de aanbieding $13–20 | constructionplacements.com | ZACHT |

PMI.org en aacei.org gaven beide **HTTP 403** bij ophalen op 25 juli 2026, dus de AACE PSP-tarieven (het in de bouw meest gebruikte planningscertificaat) heb ik **niet** kunnen verifiëren. Ik neem er daarom geen cijfer voor op.

**Waarnemingen:** het PMI-SP-lidmaatschapsvoordeel ($150 op $670 = 22%) is groter dan het PMI-jaarlidmaatschap; certificering is dus feitelijk gebundeld met lidmaatschapsverkoop. Belangrijker: de **spreiding in trainingskosten is groter dan de spreiding in softwarekosten**. Voor P6 loopt training van $13 (Udemy in de sale) tot >$3.000 per jaar (Oracle University), een factor 230. Voor de software zelf is de spreiding binnen hetzelfde product hooguit een factor 3.

### 9.2 Implementatiekosten

Dit is de zwakst gedocumenteerde categorie in het hele onderzoek. Geen enkele leverancier publiceert implementatietarieven; consultancy-tarieven staan nergens openbaar.

De enige gevonden cijfers zijn **ZACHT en waarschijnlijk onbetrouwbaar**:
- ITQlick: *"In terms of TCO over five years for a 50-user deployment, Primavera P6 could cost $500,000 to $1,000,000 including implementation, training, and maintenance"* (https://www.itqlick.com/oracle-primavera/pricing)
- ITQlick: *"after implementation, add-ons, and annual hikes the real cost is often 3x higher"* dan de basislicentie

**Toets van het eerste cijfer (EIGEN ANALYSE).** 50 gebruikers × 5 jaar P6 EPPM perpetual op lijstprijs 2016: 50 × $2.750 = $137.500 licentie + 5 × 50 × $605 = $151.250 support = **$288.750** puur licentie/support. Om op $500.000–$1.000.000 uit te komen, moet implementatie + training + infrastructuur $211.000 tot $711.000 bedragen — dus **0,7× tot 2,5× de licentiekosten**. Die bandbreedte is intern consistent en komt overeen met de vuistregel "3× de licentiekosten" uit dezelfde bron (licentie + 2× voor de rest).

**Mijn conclusie, als schatting:** voor tier 3–4-pakketten (P6, Powerproject enterprise, SYNCHRO, Deltek, Safran) is een implementatiebudget van **1× tot 2× de eerste vijf jaar licentiekosten** een verdedigbare planningsaanname, met een piek in jaar 1. Voor tier 1–2 SaaS (Smartsheet, monday, Wrike, MS Project Plan 3) is de implementatie meestal <0,3× omdat er geen server, geen database en geen integratielaag is. **Dit is een schatting op basis van één zwakke bron plus een consistentietoets, niet een meting.**

### 9.3 De volledige TCO-stapel

Voor één planner op een tier 3/4-pakket, per jaar, in USD (**EIGEN SCHATTING** behalve waar aangegeven):

| Component | Bedrag | Basis |
|---|---:|---|
| Licentie/abonnement | 1.000–5.000 | HARD (tabel sectie 3) |
| Onderhoud (indien perpetual) | inbegrepen in bovenstaande | HARD (22%) |
| Implementatie, geamortiseerd over 5 jaar | 200–2.000 | schatting, 1–2× licentie/5 |
| Initiële training | 100–600/jaar geamortiseerd | schatting (kursus $500–3.000 / 5 jaar) |
| Certificering (optioneel, eens per 3 jaar) | 170–220/jaar | PMI-SP $520–670 / 3 |
| Infrastructuur/DBA (alleen on-prem enterprise) | 200–1.000 | schatting |
| **Totaal** | **1.700–8.800** | |

De softwarelicentie is dus doorgaans **55–60% van de werkelijke kosten per planner per jaar**. Elk argument dat uitsluitend op licentieprijs stoelt — inclusief het argument "open source is gratis" — mist ongeveer 40% van het plaatje.

---

## 10. Kruisverbanden en structurele patronen

### 10.1 Vier prijsmodellen, niet één markt

| Model | Eenheid | Voorbeelden | Wie betaalt de schaalpijn? |
|---|---|---|---|
| **Per named planner** | gebruiker/jaar | P6, Powerproject, SYNCHRO 4D, MS Project | organisatie met veel planners |
| **Per gelijktijdige gebruiker** | concurrent/jaar | Powerproject concurrent | organisatie met veel fulltime planners |
| **Per project, ad valorem** | project/jaar, gestaffeld op bouwsom | SYNCHRO Perform/Construction Project | grote projecten |
| **Per seat met gratis lezers** | member/maand, viewers gratis | Smartsheet, monday, Zoho | niemand — dit is het schaalvriendelijkste model |

Het vierde model is het enige dat **niet duurder wordt naarmate meer mensen de planning gebruiken**. Dat is de fundamentele reden waarom werkbeheer-SaaS marktaandeel wint in de bouw, ondanks veel zwakkere CPM-functionaliteit: de kosten van *verspreiding* zijn nul.

### 10.2 De prijs-per-functionaliteit-anomalie

Zet twee pakketten naast elkaar:

- **Phoenix Project Manager 5**: volledig CPM (kritiek pad, kalenders, baselines, resources), $799 eenmalig = $160/planner/jaar geamortiseerd
- **Smartsheet Business**: geen echt CPM (geen kritiek pad in de klassieke zin, geen kalenderrekenkern op ASTA/P6-niveau), $228/planner/jaar

De markt betaalt dus **meer voor minder rekenkracht**, omdat samenwerking, delen, dashboards en integraties zwaarder wegen dan de kwaliteit van de netwerkplanning. Dit is het belangrijkste enkele inzicht uit de prijsbenchmark: **planningsrekenkracht is geen prijsdrijver meer**. De prijs zit in distributie (wie kan het zien), in domeininhoud (4D, BIM, lijnplanning, EVM-compliance) en in vendor lock-in (bestandsformaten, integraties, certificeringsecosystemen).

### 10.3 De 4D/BIM-premie

| Leverancier | Basis | Met BIM/4D | Premie |
|---|---:|---:|---:|
| Elecosoft (AU, 2026) | AUD 2.060 | AUD 3.360 | **+63%** |
| Elecosoft (AU, oudere editie) | AUD 1.480 | AUD 2.415 | **+63%** |
| OpenProject | €10,95/mnd | €11,95/mnd | **+9%** |
| Bentley | n.v.t. (SYNCHRO is 4D-native) | £3.571/jaar | — |

De commerciële 4D-premie ligt dus rond **+60% tot een volledige productcategorie erbij**. Bij Bentley is 4D geen add-on maar het product: SYNCHRO 4D à $4.980/jaar is 3,4× een Powerproject-planner en 4,7× een P6 Professional-planner (geamortiseerd). **De markt prijst 4D/BIM-integratie momenteel als een premiumcategorie, niet als een basisfunctie.** Dat is een prijszetting die vooral houdbaar is zolang de IFC-koppeling technisch lastig blijft.

---

## 11. Expliciete onzekerheden

Genummerd, zodat ze citeerbaar zijn.

1. **De Oracle-prijslijst is bijna tien jaar oud (10-11-2016).** Alle Primavera-perpetual-cijfers in dit rapport zijn historisch. De 22%-verhouding is bevestigd door een recente Australische wederverkoper, maar de absolute bedragen zijn vrijwel zeker verouderd. Mijn beste schatting voor de huidige VS-lijstprijs van P6 Professional is $3.300–3.800 (op basis van 3–4% jaarlijkse drift over 9 jaar), maar dat is **een extrapolatie zonder waarneming**.

2. **De PDF-kolomtoewijzing in de Oracle-prijslijst is deels afgeleid.** De bovenste regels (P6 EPPM, Progress Reporter, P6 Professional) zijn robuust; de toewijzing van Earned Value Management ($10.000) versus Risk Analysis ($9.500) berust op volgorde. Wie deze twee specifieke bedragen hergebruikt, moet ze verifiëren.

3. **Microsoft's abonnementsprijzen ($10/$30/$55) zijn niet vanaf een Microsoft-URL bevestigd.** Vier kandidaat-URL's gaven 404 op 25 juli 2026. Meerdere onafhankelijke licentiegidsen zijn het eens, maar de primaire bron ontbreekt.

4. **De vijfjaarsafschrijving voor perpetual-licenties is mijn keuze.** Bij drie jaar wordt MS Project Professional $377/jaar in plaats van $226; bij tien jaar $113. De ladder in sectie 3 verschuift dienovereenkomstig. De rangorde tussen pakketten binnen dezelfde categorie verandert er niet door.

5. **Wisselkoersen (GBP 1,30 / EUR 1,10 / AUD 0,66) zijn aannames.** Ze bewegen ±8% per jaar. Alle omgerekende bedragen dragen die marge.

6. **De Powerproject-prijsstijging van +39% (AU) is niet met zekerheid een prijsverhoging.** Het kan een editieverschil zijn. De identieke procentuele sprong bij zowel de basis- als de BIM-editie is sterk suggestief, maar niet doorslaggevend.

7. **De Oracle Primavera Cloud-band (£8–£176/licentie/maand) mengt vrijwel zeker verschillende rollen en modules.** De afleiding van 6,2% jaarlijkse prijsstijging daaruit is zwak en wordt tegengesproken door de Australische perpetual-reeks (3,7%/jaar). Ik geef de voorkeur aan de laatste.

8. **TILOS, Deltek en Safran zijn schattingen.** Er is geen enkel geverifieerd prijspunt. De bandbreedtes ($800–1.600 / $1.800–4.800 / $1.500–3.000) berusten op marktpositionering en op ITQlick-cijfers die ik als onbetrouwbaar beschouw.

9. **Zoho's exacte prijzen zijn niet vanaf de leverancierspagina bevestigd** (client-side rendering). De spreiding tussen secundaire bronnen is $4–5 / $9–10 / $14–15.

10. **AACE PSP-certificeringstarieven ontbreken volledig** (aacei.org gaf 403). Dat is een gat, want PSP is in de bouwplanning relevanter dan PMI-SP.

11. **Implementatiekosten berusten op één zwakke bron plus een eigen consistentietoets.** De bandbreedte 1–2× licentiekosten is een planningsaanname, geen meting.

12. **Opkomende markten zijn een blinde vlek.** Geen enkel prijspunt gevonden voor India, Zuidoost-Azië, de Golfregio, Latijns-Amerika of Afrika bij de enterprise-leveranciers.

13. **Onderhandelde prijzen zijn per definitie onzichtbaar.** Oracle's "applicable standard discount", Bentley's raamcontractkortingen en Deltek's enterprise-deals kunnen 30–70% onder lijst liggen. Alle enterprise-cijfers in dit rapport zijn **lijst- of aanbestedingsprijzen, geen transactieprijzen**.

14. **De WebSearch-quota van deze sessie waren na twee zoekopdrachten uitgeput.** Het overige onderzoek is uitgevoerd met directe WebFetch op leverancierspagina's, aanbestedingsportalen en PDF-extractie, aangevuld met beperkte zoekproxies. Dat heeft de bronkwaliteit per saldo verhoogd (meer primaire bronnen, minder reviewsites) maar de breedte beperkt — met name voor TILOS, Deltek en Safran, waarvoor gerichte zoekopdrachten waarschijnlijk aanbestedings- of wederverkoperprijzen hadden opgeleverd.

---

## 12. Betekenis voor een open-source, IFC-gebaseerde planner (Open Planner Studio)

### 12.1 De prijsvraag is de verkeerde vraag — behalve op drie plekken

Open Planner Studio is LGPL-3.0, gratis, met een browserbuild op `open-planner-studio.open-aec.com` en een Tauri-desktopbuild. Prijs is $0. De ladder in sectie 3 laat zien dat $0 nauwelijks onderscheidend is aan de onderkant: OpenProject Community is ook $0, ProjectLibre desktop is ook $0. Prijs wint alleen op drie specifieke plekken:

**(a) Tegen de vloerminima.** Oracle's P6 EPPM Cloud had een minimum van 25 gebruikers ($37.500/jaar), OpenProject Premium heeft een minimum van 100 (€19.140/jaar), monday rekent met een instap van 10 seats. Voor een aannemer met 3 planners is een groot deel van de markt niet duur maar **onbereikbaar**. Dat is het scherpste segment voor een gratis product: niet "goedkoper dan P6", maar "beschikbaar waar P6 geen instap kent".

**(b) Tegen de gratis-lezersval.** De duurste licentiebeslissing in de sector is niet de planner maar de 200 uitvoerders die de planning willen lezen (sectie 5.3). Een product waarbij lezen én bewerken gratis is, elimineert de kostenpost die de commerciële leveranciers juist als groeimotor gebruiken. De web-build is hier het beslissende technische bezit: een URL delen kost nul, een viewer-licentie kost $12–144 per persoon per jaar.

**(c) Tegen de 4D/BIM-premie.** De markt rekent momenteel +63% (Elecosoft) tot een volledige productcategorie (SYNCHRO 4D à $4.980/jaar) voor BIM-gekoppelde planning. OpenProject rekent +€1,00 per gebruiker per maand. Een planner waarin IFC **het native formaat is** en niet een add-on, ondermijnt die premie structureel — niet door hem te onderbieden, maar door hem betekenisloos te maken.

### 12.2 IFC als formaat is gratis; interoperabiliteit is dat niet

De IFC 4.3-specificatie is vrij beschikbaar onder **Creative Commons Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)** (https://ifc43-docs.standards.buildingsmart.org/, versie IFC4X3_ADD2, geraadpleegd 25 juli 2026). De standaard kost nul.

Dat is een asymmetrie die precies in het voordeel van dit project werkt. Bij Oracle en Bentley is *interoperabiliteit* een betaald product: Primavera Gateway en P6 EPPM Web Services stonden apart op de prijslijst ($500 + $110/jaar per Application User voor Web Services, minimum 10; Gateway op $20.000-niveau). Bij een IFC-native planner is interoperabiliteit een eigenschap van het bestandsformaat en dus gratis. Het architectuurbesluit in Open Planner Studio dat **IFC 4.3 het native persistentieformaat is en er geen apart JSON-projectformaat bestaat**, is daarmee niet alleen technisch maar commercieel het scherpste kenmerk van het product: het maakt de belangrijkste betaalde add-on van de gevestigde leveranciers overbodig.

### 12.3 Waar de markt de prijs echt verstopt: het onderwijskanaal

De belangrijkste concurrentiebevinding uit sectie 8.3: Elecosoft geeft Powerproject **gratis** aan onderwijsinstellingen; Oracle verkoopt EDU-cloudleerabonnementen voor $4/gebruiker/maand; Bentley bundelt trainingcredits bij elke aankoop; Phoenix heeft een aparte academische prijslijst. Elke gevestigde leverancier heeft zijn onderwijsprijs al tot (bijna) nul verlaagd, precies om de instroom van planners te controleren.

Een gratis product kan die prijs niet onderbieden. Wat het wél kan: de **kosten van adoptie** verlagen op assen waar de anderen niet kunnen volgen — geen installatie (browserbuild), geen licentieserver, geen accountaanmaak, veertien talen inclusief RTL, en documentatie die niet achter een klantportaal zit. Dat is het enige verdedigbare antwoord op het onderwijskanaal.

### 12.4 Waar geld zit, als dat ooit relevant wordt

De data suggereren drie modellen die in deze markt bewezen werken, elk met een prijspunt uit dit rapport:

1. **Hosted/enterprise-editie naast een gratis kern** — OpenProject's model. Community gratis, Enterprise €5,95–15,95/gebruiker/maand met minima van 25–250. Netto $79–211 per gebruiker per jaar. Bewezen levensvatbaar, maar merk op dat OpenProject de minima gebruikt om de gratis kern van het betaalde product te scheiden, niet de functionaliteit alleen.
2. **Per-project in plaats van per-planner** — Bentley's SYNCHRO Perform-model, gestaffeld op bouwsom, effectief 0,05–0,08% van de projectwaarde. Dit is het enige model in de markt dat schaalt met de waarde die de klant realiseert in plaats van met het aantal mensen dat de software aanraakt. Voor een open-source project met een dienstenlaag eromheen is dit conceptueel het meest passende model.
3. **Extensiemarktplaats** — Open Planner Studio heeft al een extensiesysteem met een catalogus. Geen enkele leverancier in dit onderzoek publiceert prijzen voor extensies/plug-ins, wat betekent dat er geen prijsanker is en dus ook geen prijsdruk.

**Wat de data níet ondersteunt:** een betaalde desktopeditie in het $150–350-segment. Daar staan Phoenix ($160/jaar geamortiseerd, volledig CPM, perpetual), MS Project Professional ($226/jaar) en Smartsheet Pro ($108/jaar). Dat is de meest verzadigde en prijsgevoeligste trede van de hele ladder, en de enige waar een nieuwkomer zonder merk of certificeringsecosysteem structureel verliest.

### 12.5 Vier concrete implicaties voor de productrichting

1. **Behoud de nul-instapdrempel als expliciete positionering.** De vloerminima (25/100/250 gebruikers) en de gratis-lezersval zijn de twee plekken waar de commerciële markt structureel faalt voor kleine en middelgrote aannemers. Dat is geen "goedkoper", dat is "beschikbaar".
2. **Behandel IFC-round-trip als het commerciële kernbezit, niet als een technisch detail.** De 4D/BIM-premie van +63% tot 4,7× bestaat omdat de koppeling bij anderen moeilijk is. Elk stuk domeindata dat níet door de IFC-laag heen komt, herstelt die premie.
3. **Investeer in verspreidbaarheid boven rekenkracht.** Sectie 10.2 laat zien dat de markt meer betaalt voor Smartsheet (geen echt CPM) dan voor Phoenix (volledig CPM). De rekenkern — CPMSolver, CalendarEngine, de 395-case-regressiesuite — is een noodzakelijke, geen voldoende voorwaarde. Deelbaarheid, viewers en rapportage bepalen de waargenomen waarde.
4. **Documenteer de TCO-vergelijking eerlijk.** Sectie 9.3 laat zien dat licenties ~55–60% van de werkelijke kosten per planner zijn. Een open-source planner bespaart die 55–60%, niet 100%. Training, migratie en interne ondersteuning blijven. Een oneerlijke besparingsclaim is in deze markt makkelijk te weerleggen en kost geloofwaardigheid bij precies de inkopers die het besluit nemen.

---

## Bronnenlijst

**Primaire leveranciersbronnen (HARD-V)**
- Oracle Construction & Engineering Global Price List — Software Investment Guide, 10 november 2016 (Texas DIR-TSO-2539): https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf — opgehaald 25-07-2026
- Oracle Software Technical Support Policies, effectief 10 juli 2026: https://www.oracle.com/contracts/docs/057419.pdf — opgehaald 25-07-2026
- Oracle Primavera Cloud productpagina (geen prijzen): https://www.oracle.com/construction-engineering/primavera-cloud-project-management/ — 25-07-2026
- Microsoft, "Compare Microsoft Project management software": https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software — 25-07-2026
- Microsoft 365 Blog, "New pricing for Microsoft 365", 19 augustus 2021: https://www.microsoft.com/en-us/microsoft-365/blog/2021/08/19/new-pricing-for-microsoft-365/ — 25-07-2026
- Smartsheet pricing: https://www.smartsheet.com/pricing en FAQ: https://www.smartsheet.com/content/smartsheet-faqs — 25-07-2026
- monday.com pricing: https://monday.com/pricing — 25-07-2026
- Wrike pricing: https://www.wrike.com/price/ — 25-07-2026
- Zoho Projects pricing (planstructuur en gratis limieten): https://www.zoho.com/projects/pricing.html — 25-07-2026
- OpenProject pricing: https://www.openproject.org/pricing/ — 25-07-2026
- ProjectLibre, "ProjectLibre Cloud: Upgrade for Teams and Companies", 13 juli 2026: https://www.projectlibre.com/2026/07/13/projectlibre-cloud-upgrade-for-teams-and-companies/ — 25-07-2026
- Spider Project price list: https://www.spiderproject.pro/en/price-list/ — 25-07-2026
- Phoenix Project Manager webshop: https://www.phoenixcpm.com/shop/purchase.php — 25-07-2026
- Eleco/Elecosoft onderwijslicentie: https://eleco.com/products/asta/asta-powerproject/single-education-licence/ — 25-07-2026
- Trimble TILOS (geen prijzen): https://construction.trimble.com/en/products/tilos — 25-07-2026
- Deltek Acumen (geen prijzen): https://www.deltek.com/en/products/project-and-portfolio-management/acumen — 25-07-2026
- Safran Software Solutions (geen prijzen): https://www.safran.com/ — 25-07-2026
- buildingSMART IFC 4.3 documentatie (CC BY-ND 4.0): https://ifc43-docs.standards.buildingsmart.org/ — 25-07-2026

**Jaarverslagen en beursberichten (HARD-V)**
- Eleco plc, Final Results FY2025, gepubliceerd 28 april 2026: https://www.investegate.co.uk/announcement/rns/elecosoft-public-limited-company--elco/final-results/9540473 — 25-07-2026
- Bentley Systems, "Announces Fourth Quarter and Full Year 2025 Results and 2026 Financial Outlook": https://www.bentley.com/news/bsy-announces-q4-and-full-year-2025-results-and-2026-outlook/ — 25-07-2026
- Eleco plc Annual Report 2024: https://ir.eleco.com/wp-content/uploads/2025/05/5621_Eleco-plc-Annual-Report-2024_Hyperlink.pdf

**Aanbestedingsdocumenten (HARD-A)**
- Bentley Systems UK Ltd, "SYNCHRO Lot 2 — Cloud Software Pricing, prepared for UK Government G-Cloud 14", 7 mei 2024: https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/711959/770193419192797-pricing-document-2024-04-25-0947.pdf — 25-07-2026
- Elecosoft UK Ltd, "Asta Powerproject SaaS", G-Cloud 14: https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828 — 25-07-2026
- Laminar Group Ltd, "Oracle Primavera Cloud (OPC)", G-Cloud 14: https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/274592422777005 — 25-07-2026

**Geautoriseerde wederverkopers (HARD-R)**
- Virtuosity (Bentley), SYNCHRO 4D: https://en.virtuosity.com/synchro-4d — 25-07-2026
- Catalyst USA, Asta Powerproject licensing & support: https://catalystusa.com/asta-powerproject — 25-07-2026
- ProPro (Australië), Buy Powerproject: https://www.propro.com.au/buy-powerproject-elecosoft — 25-07-2026
- Compass Consult, Primavera P6 pricing (AUD lijstprijzen): https://compassconsult.co/primavera-p6-pricing-usa/ — 25-07-2026
- PSG Inc, Primavera P6 Professional: https://psgincs.com/newstore/product/primavera-p6-professional/ — 25-07-2026

**Secundaire/zachte bronnen — expliciet als zodanig gebruikt**
- A Guide to Cloud, "Microsoft Project Plans (P1/P3/P5)", geverifieerd april 2026: https://www.aguidetocloud.com/licensing/microsoft-project/
- PMI Montréal, PMI-SP examenkosten: https://www.pmimontreal.org/en/project-scheduling-professional-pmi-sp
- ITQlick (Oracle Primavera, Acumen, Powerproject, Safran) — **algoritmische prijsvergelijker, lage betrouwbaarheid**: https://www.itqlick.com/oracle-primavera/pricing, https://www.itqlick.com/acumen/pricing, https://www.itqlick.com/powerproject/pricing, https://www.itqlick.com/safran-project/pricing
- PricingNow (TILOS, Powerproject, SYNCHRO) — **algoritmisch, lage betrouwbaarheid**: https://pricingnow.com/question/synchro-pricing/
- Tech.co, CostBench, CompareEdge (Zoho Projects, Smartsheet) — prijsvergelijkers, middelmatige betrouwbaarheid
- ConstructionPlacements, Primavera P6-trainingkosten: https://www.constructionplacements.com/best-primavera-p6-certification-courses/

**Niet-toegankelijke bronnen (403/404 op 25 juli 2026)** — vermeld voor volledigheid en reproduceerbaarheid: pmi.org, aacei.org, iso.org, webstore.ansi.org, mojeek.com, meerdere microsoft.com/planner-URL's, zoho.com/in en zoho.com/en-in prijzenpagina's, elecosoft-webshop (HTTP 429).
