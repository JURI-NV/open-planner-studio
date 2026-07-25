# Sectorrapport: Planningssoftware in Aerospace & Defensie (A&D)

**Onderzoeksdatum:** 25 juli 2026
**Onderzoeker:** marktonderzoek-subagent (Open Planner Studio marktonderzoek)
**Scope:** wapensystemen, ruimtevaart, militaire luchtvaart, MRO/sustainment, nucleaire defensieprogramma's (NNSA/DOE), plus de aangrenzende MILCON-/defensie-infrastructuurmarkt.

> **Methodologische waarschuwing vooraf.** Dit rapport is opgesteld met WebFetch op leveranciers-, standaarden- en aanbestedingsbronnen, plus directe API-bevragingen van **USAspending.gov** (de officiële Amerikaanse federale-uitgavendatabase). De WebSearch-quota van deze sessie waren uitgeput vóór aanvang, dus er is gewerkt met gerichte URL-bevraging in plaats van zoekmachines. Een aantal overheidsdomeinen (`dcma.mil`, `acq.osd.mil`, `dau.edu`, `bls.gov`, `gao.gov`-PDF's, `ndia.org`-documenten) blokkeert geautomatiseerde toegang; waar dat het geval was staat dat er expliciet bij en is teruggevallen op secundaire bronnen. **Elk getal dat een schatting is, is als zodanig gemarkeerd.**

---

## 0. Kernconclusies (management summary)

1. **Dit is de duurste planningsmarkt ter wereld per planner.** Niet omdat de software beter is, maar omdat de *contractuele* eis (EVMS conform ANSI/EIA-748, DCMA-toetsing, IPMDAR-levering) de planningsstack tot een **compliance-artefact** maakt. Wie geen conforme planning kan leveren, krijgt inhoudingen op betalingen — DFARS 252.234-7002 voorziet expliciet in *payment withholding* bij afgekeurde systemen ([acquisition.gov](https://www.acquisition.gov/dfars/252.234-7002-earned-value-management-system.)).
2. **De rangorde is niet "één pakket" maar een gelaagde stack.** Schema-engine (Primavera P6 / MS Project / Deltek Open Plan) → kosten-/EV-engine (Deltek Cobra / Costpoint / MPM / forProject) → schemakwaliteit & risico (Deltek Acumen Fuse/Risk, Steelray, Barbecana Full Monte, Safran Risk) → analyse/rapportage (Deltek wInsight, Encore Empower, Power BI). Vrijwel geen enkele A&D-prime draait op één leverancier.
3. **Deltek is de facto de compliance-standaard.** Deltek claimt zelf dat **"9 of top 10 DoD contractors use Cobra"** ([deltek.com/cobra](https://www.deltek.com/en/products/project-and-portfolio-management/cobra)) en **"100% of the top 10 A&D contractors use Deltek"** ([deltek.com/aerospace-and-defense](https://www.deltek.com/en/aerospace-and-defense)). Dit zijn leverancierclaims, maar ze worden niet serieus betwist in de sector.
4. **Betalingsbereidheid: extreem hoog, maar volledig compliance-gedreven.** Uit federale inkoopdata: **USD 11.049 per Acumen Fuse Risk-seat per jaar** (afgeleid: USD 55.244 voor 5 licenties, 2025-02-06, [USAspending](https://www.usaspending.gov/)). Oracle's laatste openbare eeuwigdurende lijstprijs voor **Primavera Earned Value Management** was **USD 10.000 per application user** plus USD 2.200 support/jaar (Oracle C&E Global Price List, 10-11-2016).

   > **NUANCERING (geverifieerd 25-07-2026).** Het bedrag van USD 55.243,80 voor "DELTEK ACUMEN FUSE RISK SOFTWARE LICENSES (5)" is bevestigd en loopt inderdaad exact één jaar (2025-02-06 → 2026-02-05), dus USD 11.048,76/seat/jaar klopt rekenkundig. **Maar het is de duurste waarneming in de hele dataset en wordt in dit rapport op zes plaatsen als "de" Acumen-prijs gepresenteerd.** Dezelfde dataset bevat: NASA, "DELTEK ACUMEN FUSE **ENTERPRISE LICENSE MODEL FOR 12.000 EMPLOYEES** PLUS MAINTENANCE" voor USD 240.391,75 = **≈ USD 20 per medewerker** — een factor **550** goedkoper per hoofd; en "Acumen Fuse Risk and 360 met maintenance, licentie en Learning Zone voor één jaar" voor USD 61.062,75. De reële Acumen-prijs is dus **volumeafhankelijk over drie ordes van grootte**, niet één seatprijs. De argumentatie in §6.3 en §7.1 (Gat 1) die op USD 11.049/seat/jaar steunt, blijft geldig voor *kleine* afnemers (3–5 seats) — precies de tier-2/tier-3-groep — maar mag niet als sectorbrede prijs worden gelezen.
5. **De diensten zijn een veelvoud van de licentie.** ~~3–10×~~ → **gecorrigeerd naar 2,5–6×**, om consistent te zijn met de enige onderbouwde verhouding in dit rapport (§3.5: licentie : implementatie/training : lopende dienstverlening = 1 : 0,5–1 : 2–5, dus totaal 2,5–6× de licentie). De "3–10×" hier stond nergens onderbouwd. *Let bovendien op §Verificatie V6: de onderliggende afleiding is een max-versus-max-anekdote, geen ratio.* Eén enkele EVM-ondersteuningsopdracht aan Booz Allen Hamilton was **USD 12.435.775** (DoD, 2020-06-12), terwijl Deltek's *grootste* directe federale software-opdracht in tien jaar **USD 1.826.060** was (DoD, 2018). Totale directe federale prime-opdrachten aan Deltek 2015–2026: **USD 12,4 miljoen over 203 opdrachten** (eigen aggregatie via USAspending-API).
6. **Segmentomvang (schatting — NA VERIFICATIE STERK VERBREED):** de wereldwijde markt voor *planning + EVM-software* toewijsbaar aan aerospace & defensie bedraagt in 2026 naar schatting ~~USD 0,6–1,0 miljard~~ → **USD 0,1 – 1,0 miljard per jaar** aan licenties/abonnementen (midden onbepaald; de eigen bottom-up geeft na correctie USD 0,08–0,33 mrd, de top-downroutes USD 0,6–0,9 mrd, en die routes zijn niet onafhankelijk — zie §4.2). De deelclaim "waarvan USD 0,25–0,45 miljard puur schedulingtooling" is **niet afgeleid en onzeker**. Inclusief implementatie, training en planningsdiensten komt de "planningseconomie" uit op ~~USD 3–5 miljard~~ → **USD 0,35 – 7 miljard per jaar** — een band die te breed is om beleidsmatig op te sturen. Groeirichting: **stijgend, ~5–12% per jaar** *(bandbreedte verruimd; zie §4.3-correctie)*, gedreven door Europese herbewapening en Amerikaanse recapitalisatieprogramma's.
7. **De grootste opening voor een open-source planner zit niet bij de primes, maar bij de onderaannemers en bij de overheidszijde** — plus in de MILCON-/defensie-infrastructuurketen, waar UFGS 01 32 01.00 10 expliciet niet-Primavera-software toestaat mits die SDEF kan produceren.

---

## 1. Wat maakt deze sector bijzonder qua planning

### 1.1 Schaal: de duurste planningen ter wereld

| Grootheid | Waarde | Bron |
|---|---|---|
| Amerikaanse investering in de 106 duurste wapenprogramma's (MDAPs) | **bijna USD 2,4 biljoen** | [GAO-25-107569, Weapon Systems Annual Assessment, 11-06-2025](https://www.gao.gov/products/gao-25-107569) |
| Aantal beoordeelde MDAPs | **106** | idem |
| F-35: ontwikkeling + modernisering + levenscyclus t/m 2088 | **> USD 2 biljoen** voor 2.470 toestellen | [GAO-24-106909](https://www.gao.gov/products/gao-24-106909) |
| Wereldwijde militaire uitgaven 2025 | VS **USD 954 mrd** = 33,0% van wereldtotaal → afgeleid wereldtotaal **≈ USD 2,89 biljoen** *(afgeleid getal, geen directe bron)* | [Wikipedia/SIPRI, List of countries by military expenditures](https://en.wikipedia.org/wiki/List_of_countries_by_military_expenditures) |
| Grootste wapenproducenten 2024 (wapenomzet) | Lockheed Martin **USD 64,65 mrd**; RTX **USD 43,60 mrd**; Northrop Grumman **USD 37,85 mrd**; BAE Systems **USD 33,79 mrd**; General Dynamics **USD 33,63 mrd** | [Wikipedia, Arms industry](https://en.wikipedia.org/wiki/Arms_industry) |

Eén Integrated Master Schedule (IMS) van een groot wapenprogramma telt routinematig **tienduizenden tot >100.000 activiteiten** — dit is een sectorbrede vuistregel, geen gemeten cijfer *(schatting)*. Het onderscheidende kenmerk is niet alleen het aantal activiteiten, maar het feit dat het schema **kostengeladen** moet zijn en één-op-één moet aansluiten op de Control Account-structuur van het EVM-systeem.

### 1.2 Doorlooptijd: decennia, niet jaren

GAO constateerde in 2025 dat de verwachte tijd tot een *eerste* operationele capaciteit voor MDAPs dat jaar met **18 maanden toenam, tot bijna 12 jaar vanaf programmastart** ([GAO-25-107569](https://www.gao.gov/products/gao-25-107569)). Praktische consequenties voor planningssoftware:

- Een baseline moet **10–20 jaar** bewaard, versioneerbaar en auditbaar blijven. Bestandsformaten, kalenderdefinities en resourcestructuren moeten die horizon overleven.
- **Rolling-wave planning** is de norm: near-term werk op werkpakketniveau, ver werk in planningspakketten. GAO behandelt dit expliciet als onderdeel van Best Practice 3 ("Rolling Wave Planning", [GAO-16-89G](https://www.gao.gov/products/gao-16-89g)).
- Het planningstool moet meerdere generaties Windows/DB-versies overleven; migratiekosten zijn een reële, terugkerende post.

### 1.3 Resourcecomplexiteit

- **Kostengeladen schema's zijn verplicht, niet optioneel.** De DCMA-resourcecheck vereist dat "all tasks with durations greater than zero have dollars or hours assigned" ([Ten Six Consulting](https://www.tensix.com/dcma-14-point-assessment/)).
- Resources zijn **gefinancierd per contract, per CLIN, per fiscal year**, met kleurgeld-restricties (RDT&E vs. Procurement vs. O&M in het Amerikaanse budgetstelsel). Een resourcemodel dat alleen "uren × tarief" kent is onvoldoende.
- **Government Furnished Equipment/Information/Property (GFE/GFI/GFP)** en overheidsactiviteiten (goedkeuringen, keuringen, testvensters op schaarse ranges) horen in het schema; UFGS 01 32 01.00 10 eist expliciet opname van "Government Furnished Equipment (GFE) and Notice to Proceed (NTP)"-activiteiten ([UFGS 01 32 01.00 10, aug 2023 chg 1 08/24](https://www.wbdg.org/ffc/dod/unified-facilities-guide-specifications-ufgs)).
- **Toeleveringsketen met honderden tiers.** Vertragingen in de F-35-keten: in 2023 leverde Pratt & Whitney **100% van de motoren te laat** en Lockheed Martin **91% van de toestellen te laat** ([GAO-24-106909](https://www.gao.gov/products/gao-24-106909)). Subcontractorschema's moeten in het prime-IMS worden geïntegreerd — het klassieke IMS-consolidatieprobleem (GAO Best Practice 1, "The IMS as a Consolidation Tool").
- **Beveiliging als resourcebeperking.** ITAR, NIST SP 800-171, CMMC en classificatie beperken wie waaraan mag werken en op welk netwerk. Deltek noemt expliciet ondersteuning voor "CMMC readiness (FedRAMP Moderate Ready status)", ITAR en NIST SP 800-171 ([deltek.com/aerospace-and-defense](https://www.deltek.com/en/aerospace-and-defense)). Voor een planningstool betekent dit: **moet air-gapped/on-prem kunnen draaien**, en cloud-only is voor geclassificeerd werk een showstopper.

### 1.4 Contractuele eisen (zie ook §5)

Dit is het echte onderscheidende kenmerk. In vrijwel geen andere sector is de *planning zelf* een contractueel deliverable met afkeurings- en inhoudingsrisico.

- **DFARS 234.201:** boven **USD 20 miljoen** moet het EVM-systeem voldoen aan ANSI/EIA-748; boven **USD 50 miljoen** moet het systeem door het *cognizant Federal agency* formeel als conform zijn vastgesteld ([acquisition.gov, DFARS 234.201](https://www.acquisition.gov/dfars/234.201-policy.)).
- **DFARS 252.234-7002:** eist "timely, reliable, and verifiable information" voor Contract Performance Reports **én de Integrated Master Schedule**; een Integrated Baseline Review (IBR) moet plaatsvinden **binnen 180 dagen** na gunning, optieuitoefening of grote wijziging; er is een **45-dagen**-termijn om vastgestelde tekortkomingen te corrigeren; **betalingsinhouding** bij definitieve afkeuring ([acquisition.gov](https://www.acquisition.gov/dfars/252.234-7002-earned-value-management-system.)).
- Bij **vaste-prijscontracten** wordt EVM juist ontmoedigd en is een waiver nodig ([DFARS 234.201](https://www.acquisition.gov/dfars/234.201-policy.)) — relevant omdat een groeiend deel van defensie-inkoop vastprijsachtig is, wat de EVM-verplichting *niet* uitbreidt maar wel de schemakwaliteitseisen intact laat.
- Voor defensie-*bouw* (MILCON): UFGS 01 32 01.00 10 stelt dat **"The Government uses Primavera P6"**, dat bij Primavera-gebruik het **`.xer`-exportbestand** geleverd moet worden, en dat het schema geüpload moet worden naar het **Resident Management System (RMS)** — waarbij ontvangst van een correcte betalingsaanvraag afhankelijk is van goedgekeurde elektronische schemaversies ([UFGS 01 32 01.00 10](https://www.wbdg.org/ffc/dod/unified-facilities-guide-specifications-ufgs)). Met andere woorden: **geen goedgekeurd schema = geen betaling.**

### 1.5 Kosten van vertraging

- Op portfolioniveau: 18 maanden extra doorlooptijd over 106 programma's met USD 2,4 biljoen aan geplande investering ([GAO-25-107569](https://www.gao.gov/products/gao-25-107569)).
- Op programmaniveau: het T-AO 205 John Lewis-programma rapporteerde in één jaar **USD 941 miljoen kostengroei** ([GAO-25-107569](https://www.gao.gov/products/gao-25-107569)).
- Op onderdeelniveau: de TR-3-upgrade voor de F-35 kost **USD 1,8 miljard** en is de kritieke voorwaarde voor Block 4 ([GAO-24-106909](https://www.gao.gov/products/gao-24-106909)).
- **Historisch precedent dat de sector nooit vergeet:** in 1991 annuleerde minister Cheney het A-12 Avenger II-programma op basis van door EVM gedetecteerde prestatieproblemen ([Wikipedia, Earned value management](https://en.wikipedia.org/wiki/Earned_value_management)). EVM is in deze sector geen boekhoudkundige hobby maar een instrument met annuleringsbevoegdheid erachter.
- Bij MILCON: UFGS voorziet in **Recovery Schedules**, **Time Impact Analysis (prospectief)** en **Forensic Schedule Analysis (retrospectief)** als contractuele mechanismen, inclusief een clausule over "Artificially Improving Progress" ([UFGS 01 32 01.00 10, §3.8–3.9](https://www.wbdg.org/ffc/dod/unified-facilities-guide-specifications-ufgs)).

### 1.6 Eigendom van float — een contractueel twistpunt

UFGS 01 32 01.00 10 §3.10 legt vast: *"float available in the schedule, at any time, belongs to the Project and is available for Contractor and Government use"* ([UFGS](https://www.wbdg.org/ffc/dod/unified-facilities-guide-specifications-ufgs)). Kunstmatige float-constraints ("zero free float", "zero total float") zijn **verboden**, evenals verplichte constraints die netwerklogica negeren. Dit is direct relevant voor tooling: de planner moet float-berekening en constraint-typen exact reproduceerbaar en auditbaar hebben.

---

## 2. Welke planningssoftware wordt hier daadwerkelijk gebruikt

### 2.1 De gelaagde stack

De sector koopt geen "planningspakket" maar een **compliance-keten**. Deze indeling is de kern van de markt:

| Laag | Functie | Dominante producten |
|---|---|---|
| **1. Schema-engine (IMS)** | CPM-netwerk, kalenders, baselines | Oracle Primavera P6, Microsoft Project, Deltek Open Plan, Safran Project, (UK: Asta Powerproject in de bouw-/infrahoek) |
| **2. Kosten-/EV-engine** | Control accounts, BCWS/BCWP/ACWP, EAC | **Deltek Cobra**, Deltek Costpoint (ERP), forProject, ProjStream MaxTeam, MPM |
| **3. Schemakwaliteit & risico** | DCMA/GAO/NASA-checks, Monte Carlo | **Deltek Acumen Fuse / Acumen Risk / Acumen 360**, Steelray Project Analyzer/Analyzer for P6, Barbecana Full Monte, Safran Risk, (historisch) Oracle Primavera Risk Analysis |
| **4. Analyse & rapportage** | IPMDAR/CPR-analyse, portfolio-inzicht | **Deltek wInsight Analytics**, Encore Analytics **Empower**, Power BI/Tableau bovenop de datasets |
| **5. Governance/change control** | Baseline change requests, workflows | Deltek PM Compass, Unifier (in infra), interne SharePoint/ServiceNow-oplossingen |

Bron voor de Deltek-productindeling: [deltek.com/en/products/project-and-portfolio-management](https://www.deltek.com/en/products/project-and-portfolio-management) (Open Plan, Acumen, Cobra, wInsight Analytics, PM Compass, Costpoint).

### 2.2 Rangorde — wie gebruikt wat

**Rang 1 — Deltek Cobra (kosten/EV) en Deltek Acumen (schemakwaliteit).**
Deltek is de compliance-hegemoon in Amerikaanse A&D. Claims: *"9 of top 10 DoD contractors use Cobra"* ([Cobra-productpagina](https://www.deltek.com/en/products/project-and-portfolio-management/cobra)) en *"100% of the top 10 A&D contractors use Deltek"* ([A&D-pagina](https://www.deltek.com/en/aerospace-and-defense)). Cobra genereert audit-ready rapporten in **IPMDAR (CPD/SPD)** en **DOE PARS**-formaten en ondersteunt **DCMA, CAS en EIA-748** ([Cobra-pagina](https://www.deltek.com/en/products/project-and-portfolio-management/cobra)). Deltek zelf: 30.000 klantorganisaties, ~4.200 medewerkers, opgericht 1983 ([deltek.com/about](https://www.deltek.com/en/about)); overgenomen door Thoma Bravo voor USD 1,1 mrd (2012) en door **Roper Technologies voor USD 2,8 mrd (2016)** ([Wikipedia, Deltek](https://en.wikipedia.org/wiki/Deltek)).

**Rang 2 — Oracle Primavera P6.**
De feitelijke standaard voor de *overheidszijde* en voor alles wat naar bouw/infrastructuur neigt. Voor MILCON is P6 letterlijk de overheidsdefault: *"The Government uses Primavera P6"* ([UFGS 01 32 01.00 10](https://www.wbdg.org/ffc/dod/unified-facilities-guide-specifications-ufgs)). Federale inkoopdata bevestigen substantiële P6-uitgaven: **USD 2.135.036** voor Oracle Primavera P6 EPPM ISE (DOE, 2021–2027), **USD 1.038.284** voor één jaar P6 EPPM software update license & support (DoD, 2022), **USD 647.399** P6 Enterprise + BI + WebLogic + SOA (Dept. of Commerce, 2021–2026) — alle via USAspending-API.

**Rang 3 — Microsoft Project.**
Onderschat maar alomtegenwoordig, vooral bij tier-2/tier-3-leveranciers, engineeringafdelingen en bij programma's onder de EVMS-drempel. Het is de goedkoopste manier om een IMS te produceren; de compliance wordt er *omheen* gebouwd met Acumen Fuse, Steelray, Barbecana Full Monte of forProject. Acumen ondersteunt expliciet "Oracle P6, MS Project, Open Plan, Phoenix" ([Acumen-pagina](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)).

**Rang 4 — Deltek Open Plan.**
Positioneert zich als "enterprise scheduling software built for large, complex programs" met **ingebouwde DCMA 14-point-kwaliteitschecks en DECM-aligned metrics**, gecontroleerde replanning met rolgebaseerde toegang en audittrails, en native Jira-integratie ([Open Plan-pagina](https://www.deltek.com/en/products/project-and-portfolio-management/open-plan)). Het is het enige mainstream schedulingpakket dat *ontworpen* is rond EVMS-baselinebeheer. Maar: de federale inkoopvoetafdruk is opvallend klein. De **grootste** directe federale Open Plan-opdracht in tien jaar bedroeg **USD 91.411** (NAVAIR depot maintenance, 2015), daarna vrijwel uitsluitend posten van **USD 1.700 – 17.500** (USAspending-API). Ter vergelijking: Acumen Fuse-opdrachten lopen tot **USD 384.102** en wInsight tot **USD 775.330**. *Interpretatie (analyse, geen bron):* Open Plan leeft vooral binnen de primes (betaald uit overhead, niet zichtbaar in federale inkoopdata) en heeft aan overheidszijde nauwelijks voet aan de grond — het is het meest "legacy"-aanvoelende deel van de Deltek-stack.

**Rang 5 — Encore Analytics Empower, forProject, ProjStream, Steelray, Barbecana, Safran.**
Nichespelers met echte omzet in deze sector:
- **Encore Analytics Empower:** NASA-raamovereenkomsten van **USD 175.000** (2018–2023) en **USD 154.000** (2023–2027); DoD-orders van **USD 94.959**, **USD 84.579** (verlenging 20 licenties + aankoop 15 extra) en **USD 83.880**; DOE **USD 96.687** (USAspending-API). Totale directe federale prime-opdrachten aan Encore Analytics 2015–2026: **USD 944.862 over 12 opdrachten** (eigen aggregatie).
- **Steelray:** DHS-raamcontracten van **USD 92.822** (2022–2024) en **USD 74.650** (2024–2025) voor viewer-/analyzerlicenties; talloze kleinere DoD-orders (USAspending-API). Producten: Delay Analyzer (vertragingsanalyse voor P6), Project Analyzer, Analyzer for P6, Project Viewer ([steelray.com](https://www.steelray.com/)).
- **Barbecana Full Monte:** DHS-order van **USD 16.406** voor "Full Monte schedule risk analysis software licenses and maintenance" (2018) (USAspending-API).
- **Safran Software Solutions** (Safran Risk, Safran Project, Safran Planner): claimt Monte Carlo-simulatie "97% sneller" dan concurrenten en interoperabiliteit met Oracle P6 en Microsoft Project; doelmarkten inclusief "aerospace, defense" ([safran.com](https://safran.com/)). Sterk in Noord-Europa/olie&gas, kleinere maar reële defensievoetafdruk.
- **ProjStream** (BOEMax, MaxTeam, WorkBench): richt zich op "mid- to large-size GovCon organizations", inclusief aerospace & defense primes en subs; claimt "60% faster proposals" ([projstream.com](https://www.projstream.com/)). Sterk in het *Basis of Estimate*-domein (BOE) dat vooraf gaat aan de IMS.
- **forProject Technology** (EVMS forProject, Schedule Analyzer forProject): "Earned Value Management. Simplified.", gevestigd in Irving, Texas ([forproject.com](https://www.forproject.com/)). Positioneert zich als de goedkope EVM-laag bovenop MS Project.
- **KIDASA Milestones Professional:** nog steeds in gebruik voor briefingcharts; DoD-order van **USD 50.796 voor 204 single-user licenties** (2017) en **USD 18.342 voor 50 licenties** (2023) (USAspending-API). Illustreert dat een groot deel van het "planningswerk" in deze sector nog steeds *presentatie* is.

### 2.3 Wie gebruikt wat, per rol

| Rol | Typische stack | Toelichting |
|---|---|---|
| **Opdrachtgever (DoD PMO, NASA, DOE/NNSA, DCMA, UK MOD)** | P6 (of Open Plan) voor eigen schema's; **wInsight / Empower** voor het analyseren van contractorleveringen; **Acumen Fuse / Steelray** voor kwaliteitstoetsing van ingediende IMS'en | De overheid *bouwt* zelden het schema — zij *keurt* het. Vandaar de sterke federale inkoop van analysetools (wInsight USD 775k, Acumen enterprise USD 240k) en de zwakke inkoop van scheduling-engines. |
| **Hoofdaannemer (prime: Lockheed, RTX, Northrop, BAE, GD, Boeing, Airbus D&S, Leonardo, Thales)** | **Volledige Deltek-stack** (Cobra + Open Plan of P6 + Acumen + wInsight) of Cobra + MS Project + Acumen; Costpoint als ERP | Hier zit het EVMS-certificaat. De keuze is bijna nooit "beste tool" maar "tool die door DCMA is geaccepteerd in ons gevalideerde systeem". Systeemwijzigingen vereisen CFA-goedkeuring vooraf ([DFARS 252.234-7002](https://www.acquisition.gov/dfars/252.234-7002-earned-value-management-system.)). |
| **Onderaannemer (tier 1–3)** | **MS Project** + Excel; soms P6 omdat de prime dat eist; forProject/ProjStream als lichte EVM-laag | Onder de USD 20M-drempel is EVMS niet verplicht ([DFARS 234.201](https://www.acquisition.gov/dfars/234.201-policy.)), maar de *prime* legt vaak flow-down-eisen op. Dit is de meest prijsgevoelige en meest ontevreden groep. |
| **Engineeringbureau / consultancy (Booz Allen, Jacobs, i3Works, Sylvain Analytics, RELI Group)** | Wat de klant voorschrijft; eigen Acumen/Steelray-licenties voor QA | Verdienen aan diensten, niet aan tools. Booz Allen won **USD 12.435.775** voor "Earned Value Management support to acquisition enablers" (DoD, 2020) en **USD 6.103.748** voor "Integrated Master Schedule Support Services for PEO CS&CSS" (DoD, 2022) (USAspending-API). |
| **MILCON-aannemer (defensiebouw)** | **Primavera P6** verplicht-de-facto; SDEF-export naar RMS | UFGS 01 32 01.00 10 vereist dat de aangewezen planner **minimaal drie eerdere vergelijkbare bouwschema's met Primavera P6** heeft opgesteld ([UFGS](https://www.wbdg.org/ffc/dod/unified-facilities-guide-specifications-ufgs)). |

---

## 3. Wat wordt ervoor betaald

### 3.1 Oracle Primavera — eeuwigdurende lijstprijzen (laatst openbaar gepubliceerd)

Oracle publiceert **geen** Construction & Engineering-prijslijst meer: de actuele prijslijst-index op oracle.com bevat wel Technology, E-Business Suite, Fusion, Siebel, PeopleSoft, JD Edwards, MySQL en Java, maar **geen Construction & Engineering / Primavera-lijst** ([oracle.com/us/corporate/pricing/price-lists/index.html](https://www.oracle.com/us/corporate/pricing/price-lists/index.html)). De laatste breed circulerende publieke lijst is de **Oracle Construction & Engineering Global Price List, 10-11-2016**, gepubliceerd onder het Texas DIR-contract **DIR-TSO-2539**:

| Product | Licentie (USD) | Support/jaar (USD) | Metriek | Min. |
|---|---|---|---|---|
| Primavera P6 Enterprise Project Portfolio Management | 2.750 | 605,00 | Application User | – |
| Primavera P6 Professional Project Management | 2.500 | 550,00 | Application User | – |
| Primavera P6 Progress Reporter | 950 | 209,00 | Application User | – |
| Primavera Analytics | 2.000 | 440,00 | Application User | 25 |
| **Primavera Earned Value Management** | **10.000** | **2.200,00** | Application User | – |
| **Primavera Risk Analysis** | **9.500** | **2.090,00** | Application User | – |
| Primavera Portfolio Management | 2.900 | 638,00 | Application User | 50 |
| Primavera Capital Planning & Investment Control Budgeting | 2.000 | 440,00 | Application User | 50 |
| Primavera Data Warehouse | 25.000 | 5.500,00 | Processor | – |
| Primavera Contractor | 1.295 | 285,00 | Application User | – |
| Primavera P6 EPPM Cloud Service | 125/maand | – | Hosted Named User | 25 |

*Bron: Oracle Construction & Engineering Global Price List, Software Investment Guide, 10-NOV-2016 (Texas DIR — Oracle DIR-TSO-2539). Dit document is in dit onderzoek als PDF verwerkt; de directe URL kon in deze sessie niet worden geverifieerd, de documentidentiteit (titel, datum, contractnummer) wel.*

Belangrijke voorwaarden uit dezelfde lijst: **termijnlicenties** kosten 20% (1 jaar), 35% (2 jaar), 50% (3 jaar), 60% (4 jaar) of 70% (5 jaar) van de eeuwigdurende lijstprijs, en de supportprijs is **22% van de eeuwigdurende licentieprijs** ongeacht de termijnkorting. Dat 22%-supportpercentage is consistent met Oracle's algemene prijsmodel (vgl. [Oracle Technology Global Price List, 01-06-2026](https://www.oracle.com/assets/technology-price-list-070617.pdf), waar support telkens 22% van de licentieprijs is).

### 3.2 Oracle Primavera — actuele cloudprijzen (VK, verifieerbaar)

Uit het UK G-Cloud 14-raamwerk, met resolveerbare bron:

| Product | Prijs | Bron |
|---|---|---|
| Primavera P6 EPPM (reseller Hyde Park Solutions) | **£168,75 per gebruiker per maand** | [G-Cloud 14 service 555484208241614](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/555484208241614) |
| Primavera P6 EPPM Cloud Service (Oracle-lijstprijs) | **£220 per hosted named user per maand**, min. 25 gebruikers | Oracle Primavera Pricing – G-Cloud 14, doc. BD.G14.OCS.002 v1.1, mei 2025 |
| **Primavera P6 EPPM UK *Government* Cloud Service** | **£439 per hosted named user per maand**, min. 50 gebruikers | idem — *let op: de overheidsvariant kost het dubbele van de commerciële* |
| Primavera P6 UK Government Cloud, extra non-production environment | **£7.188 per maand** | idem |
| Primavera Unifier Project Controls | £132 p.u.p.m., min. 25 | idem |
| **Primavera Unifier Earned Value Management** | **£44 p.u.p.m.**, min. 5 | idem |
| Primavera Unifier UK Government Cloud Service | £459 p.u.p.m., min. 50 | idem |
| Oracle Primavera Cloud – Schedule (incl. Task & Progress) | **£96 per hosted named user per maand**, min. 5 | Oracle Primavera Cloud Service RPC Pricing Document, RPC UK Ltd, mei 2024 |
| Oracle Primavera Cloud – Portfolio Planning | £176 p.u.p.m., min. 5 | idem |
| Oracle Primavera Cloud – Schedule, jaarlijks | **£950 per licentie per jaar**, min. 5 | Oracle Primavera – Pricing document, th3rdcurve Ltd, ingangsdatum 30-04-2024 |
| P6 EPPM (incl. Progress Reporter + Data Access), jaarlijks | £2.185 per licentie/jaar bij min. 25 | idem |
| Primavera P6 extra non-production environment | **£39.332 per jaar** | idem |

Volumekortingen zijn bescheiden: 10% bij 101–200 gebruikers, 15% bij 201–500, 20% bij 501–1.000, 25% bij 1.001+ (Oracle Primavera Pricing – G-Cloud 14).

**Observatie die er in deze sector toe doet:** de UK *Government* Cloud-variant van P6 kost **£439 vs. £220** commercieel — een factor 2 opslag voor overheidsomgevingen, met een minimum van 50 gebruikers. Dat is de prijs van soevereiniteit/accreditatie, en het is precies de kostenpost die een open-source, on-prem alternatief structureel elimineert.

### 3.3 Deltek — geen openbare lijstprijzen, wel afgeleide prijzen uit federale inkoop

Deltek publiceert **geen** prijzen (geverifieerd: geen prijsinformatie op de Open Plan-, Cobra-, Acumen- of PPM-overzichtspagina's). Onderstaande prijzen zijn **afgeleid uit werkelijke federale opdrachten** via de USAspending-API (alle bedragen zijn *award amounts*, dus totale opdrachtwaarde over de looptijd):

| Product | Bedrag (USD) | Afgeleide eenheidsprijs | Opdrachtgever / jaar |
|---|---|---|---|
| Deltek Acumen Fuse Risk, **5 licenties** | 55.244 | **≈ 11.049 per seat** | Dept. of Commerce, 2025-02-06 |
| Deltek Acumen Fuse, Risk en 360 | 384.102 | enterprise, 1 jaar | DoD, 2023-09-25 |
| Deltek Acumen Fuse, Risk en 360 | 157.206 | enterprise, 1 jaar | DoD, 2024-09-23 |
| Deltek Acumen **Enterprise License** | 407.316 | enterprise, 1 jaar | DoD, 2024-09-25 |
| Deltek Acumen Fuse **enterprise licentiemodel voor 12.000 medewerkers** + onderhoud | 240.392 | **≈ 20 per medewerker** | NASA, 2019 |
| Deltek Acumen Fuse jaarlijkse verlenging | 42.078 → 45.024 → 48.176 → 51.548 → 55.156 | **+7,0%/jaar gemiddeld over 2022–2026** | NASA, 2022–2026 |
| Deltek Cobra licentie (5 jaar) | 187.371 | ≈ 37.474/jaar | NASA, 2020–2025 |
| Deltek Cobra jaarlijkse verlenging | 44.707 (FY25) → 47.836 (FY26) | **+7,0% j-o-j** | NASA, 2025 en 2026 |
| **5× Deltek Cobra + 3× Acumen Fuse**, incl. jaarlijks onderhoud | 140.896 | ≈ 17.612 per seat over de looptijd | DOE, 2022–2026 |
| Deltek wInsight software maintenance renewal | 775.330 | 3 jaar | DoD, 2020–2023 |
| Deltek wInsight maintenance & support | 312.368 | 1 jaar | DoD, 2026–2027 |
| Deltek Open Plan software maintenance (NAVAIR depot) | 91.411 | – | DoD, 2015 |
| Deltek Open Plan software (via Carahsoft) | 16.817 / 10.516 | – | DoD, 2023 / 2025 |
| Grootste directe Deltek-softwareopdracht (2015–2026) | **1.826.060** | – | DoD, 2018-09-20 |
| **Totaal directe federale prime-opdrachten aan Deltek 2015–2026** | **12.418.733 over 203 opdrachten** | – | eigen aggregatie, USAspending-API |

*Bron voor alle bovenstaande regels: [USAspending.gov API](https://api.usaspending.gov/), endpoint `/api/v2/search/spending_by_award/`, bevraagd op 25-07-2026.*

**Belangrijke caveat bij deze cijfers:** dit zijn uitsluitend *directe federale prime-opdrachten*. Het overgrote deel van de A&D-uitgaven aan planningssoftware loopt via (a) **de primes zelf**, die Deltek/Oracle-licenties uit eigen middelen kopen en terugvorderen als indirecte kosten/overhead, en (b) **resellers** (Carahsoft, DLT Solutions, Emergent, Dynamic Systems, Affigent, Four LLC, New Tech Solutions), waarvan de doorverkoop niet altijd als "Deltek" of "Oracle" in de opdrachtomschrijving verschijnt. De USD 12,4 miljoen is dus een **ondergrens met een factor van waarschijnlijk 10–50×** ten opzichte van de werkelijke federale exposure *(schatting)*.

### 3.4 Concurrerende/aanpalende producten

| Product | Prijs | Bron |
|---|---|---|
| Microsoft Project Standard 2024 (eeuwigdurend) | **USD 679,99** eenmalig | [microsoft.com](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software) |
| Microsoft Project Professional 2024 (eeuwigdurend) | **USD 1.129,99** eenmalig | idem |
| Encore Analytics Empower (NASA, 5 jaar) | USD 175.000 (2018–2023); USD 154.000 (2023–2027) | USAspending-API |
| Encore Empower — verlenging 20 + aankoop 15 licenties | USD 84.579 | DoD, 2023, USAspending-API |
| Encore Empower — installatie/deployment/training | **USD 59.130** | DoD, 2020, USAspending-API |
| Steelray (DHS enterprise viewer/analyzer, 2 jaar) | USD 92.822 | USAspending-API |
| Barbecana Full Monte (DHS) | USD 16.406 | USAspending-API |
| KIDASA Milestones Professional, 204 single-user licenties | USD 50.796 → **≈ 249 per seat** | DoD, 2017, USAspending-API |

### 3.5 Implementatie-, consultancy- en trainingskosten

Dit is waar het echte geld zit.

| Post | Bedrag | Bron |
|---|---|---|
| Primavera P6 Scheduling-practitioners (i3Works, defensie-ervaren) | **£385 – £1.210 per persoon per dag** | [G-Cloud 14 service 536755182720277](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/536755182720277) |
| SFIA-dagtarieven Primavera-consultancy (Hyde Park Solutions) | **£300 (Level 1) – £1.250 (Level 7 Director/Partner)**; Consultant £550, Senior Consultant £650, Principal £1.050 | [SFIA Rate Card, G-Cloud 14, 22-04-2024](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/702001/555484208241614-sfia-rate-card-2024-05-01-1345.pdf) |
| Encore Empower installatie/deployment/training | USD 59.130 (vs. USD 83.880 licentie in hetzelfde jaar → **≈ 70% van de licentiewaarde**) | USAspending-API |
| Oracle Primavera Risk Analysis on-site training (NASA) | USD 24.122 | USAspending-API, 2015 |
| Encore Empower basis- en gevorderdentraining (2 lessen, NASA) | USD 6.848 | USAspending-API, 2015 |
| Oracle Primavera P6 EPPM Cloud Learning Subscription | USD 4 per hosted named user/maand, min. 25 | Oracle C&E Global Price List 2016 |
| **EVM-ondersteuningsdiensten (Booz Allen, DoD)** | **USD 12.435.775** | USAspending-API, 2020 |
| **IMS-ondersteuningsdiensten (Booz Allen, PEO CS&CSS)** | **USD 6.103.748** | USAspending-API, 2022 |
| IMS-ondersteuning (Sylvain Analytics, DoD) | USD 3.335.299 | USAspending-API, 2016 |
| Integrated Program Management Support Services (RELI Group, DHS) | USD 14.692.465 (2020); USD 6.211.096 + USD 5.219.762 (2024) | USAspending-API |
| Project Controls Support Services (DOE Hanford WTP) | USD 1.927.400 + USD 1.312.645 | USAspending-API, 2023 |

**Vuistregel *(schatting, afgeleid uit bovenstaande)*:** in A&D bedraagt de verhouding **licentie : implementatie/training : lopende dienstverlening ≈ 1 : 0,5–1 : 2–5**. Een EVMS-validatietraject voor een middelgrote prime (systeembeschrijving, IBR-voorbereiding, DCMA-review, corrective action plans) kost naar schatting **USD 0,5 – 3 miljoen** aan externe advieskosten, exclusief interne uren *(schatting; geen publieke bron kon in dit onderzoek worden geverifieerd — dcma.mil en humphreys-assoc.com blokkeren geautomatiseerde toegang)*.

### 3.6 Betalingsbereidheid: **zeer hoog** — en waarom

**Zeer hoog.** Argumenten, met onderbouwing:

1. **De alternatieve kosten zijn catastrofaal.** Bij afgekeurd EVMS voorziet DFARS 252.234-7002 in **betalingsinhouding** ([acquisition.gov](https://www.acquisition.gov/dfars/252.234-7002-earned-value-management-system.)). Op een contract van USD 500 miljoen is een inhouding van enkele procenten al een veelvoud van elke denkbare licentiepost. *(Precisering na verificatie: de inhouding is **voorwaardelijk** — de clausuletekst luidt "if the Contracting Officer makes a final determination to disapprove the Contractor's EVMS, **and the contract includes the clause at 252.242-7005, Contractor Business Systems**, the Contracting Officer will withhold payments in accordance with that clause". Geen 252.242-7005 in het contract = geen automatische inhouding. Het rapport stelde dit elders onvoorwaardelijk.)*
2. **De licentiekosten zijn ruis in de contractwaarde.** USD 11.049 per Acumen-seat per jaar op een programma van USD 2,4 miljard is **0,00046%**. Er is geen prijsdruk waar het licentiekosten betreft — er is alleen *audit*-druk.
3. **De kosten zijn doorbelastbaar.** Bij cost-plus-contracten worden EVMS-tooling en projectbeheersing als **allowable cost** teruggevorderd. De prime betaalt niet uit eigen zak; de belastingbetaler doet dat. Dit ontkoppelt prijs van waarde volledig.
4. **Prijsstijgingen worden geaccepteerd.** NASA's Deltek Acumen Fuse-verlenging steeg van USD 42.078 (2022) naar USD 55.156 (2026) — **+7,0% per jaar, +31% cumulatief in vier jaar** (USAspending-API). Datzelfde patroon bij Cobra (USD 44.707 → USD 47.836, +7,0%). Er is geen enkel teken van prijsverzet.
5. **Switching costs zijn contractueel verankerd.** Substantiële wijzigingen aan een gevalideerd EVM-systeem vereisen **voorafgaande goedkeuring van het cognizant Federal agency** ([DFARS 252.234-7002](https://www.acquisition.gov/dfars/252.234-7002-earned-value-management-system.)). Een tool vervangen is geen IT-beslissing maar een *contractwijziging*. Dit is de sterkste lock-in in de gehele planningssoftwaremarkt.

**Waar de betalingsbereidheid instort:** bij **tier-2/tier-3-onderaannemers** onder de USD 20M-drempel. Zij zijn niet EVMS-plichtig ([DFARS 234.201](https://www.acquisition.gov/dfars/234.201-policy.)) maar krijgen wel flow-down-eisen van de prime. Zij betalen USD 680–1.130 voor MS Project ([microsoft.com](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software)) en weigeren USD 11.000/seat voor Acumen. Dat is de commercieel interessantste onderbediende groep in deze sector.

---

## 4. Hoe groot is dit segment

### 4.1 Top-down ankers

| Anker | Waarde | Jaar | Bron |
|---|---|---|---|
| Wereldwijde **Project Portfolio Management**-softwaremarkt | USD 6,90 mrd (2025) → USD 7,69 mrd (2026) → USD 13,21 mrd (2031), CAGR 11,43% | 2025–2031 | [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market) |
| Cloudaandeel in PPM | 69,45% van omzet 2025, groeit met 16,85% CAGR | 2025 | idem |
| Wereldwijde **Earned Value Management-software**markt | **USD 2,5 mrd (2026)** → USD 4,2 mrd (2033), CAGR 8,2% | 2026–2033 | [Verified Market Reports](https://www.verifiedmarketreports.com/product/earned-value-management-software-market/) |
| A&D als EVM-vertical | genoemd als *primary driver*; "large-scale defense projects, space missions..." met verplichte NASA-/DoD-/FAR-EVMS-eisen | 2026 | idem |

Mordor splitst A&D niet apart uit ("the report does not provide specific breakouts for Aerospace/Defense as a distinct vertical"), dus de sectorale toewijzing moet worden geschat.

### 4.2 Bottom-up raming *(schatting — expliciete redenering)*

**Stap 1 — Amerikaanse MDAP-basis.**
106 MDAPs met USD 2,4 biljoen geplande investering ([GAO-25-107569](https://www.gao.gov/products/gao-25-107569)). Per MDAP zijn er planning-/EV-seats bij: het overheids-PMO (5–20), de prime (20–100) en de eerste twee lagen onderaannemers (50–150 verdeeld). Aanname: **≈ 150 seats per MDAP over de gehele keten** *(schatting)*.
→ 106 × 150 = **≈ 16.000 seats** alleen voor Amerikaanse MDAPs.

**Stap 2 — Opschaling naar de volledige sector.**
Daarbovenop komen: ACAT II/III-programma's en niet-MDAP-DoD-werk, NASA, DOE/NNSA, FAA, DHS, plus alle niet-Amerikaanse defensieprogramma's (VK, Frankrijk, Duitsland, Italië, Australië, Canada, Japan, Zuid-Korea, Israël, India) en de gehele **commerciële luchtvaart** (Boeing, Airbus, motorfabrikanten, tier-1-structuurbouwers, MRO). Vermenigvuldigingsfactor **5–8×** *(schatting)*.
→ **80.000 – 130.000 planning-/EV-seats wereldwijd** in A&D.

**Stap 3 — Gemengde jaarprijs per seat.**
Mix van: MS Project (~USD 200–380/jaar geamortiseerd), P6 (~USD 1.500–2.600/jaar), Cobra (~~~USD 8.000–17.600/jaar~~ → **gecorrigeerd: ≈ USD 3.500–4.400/seat/jaar**), Acumen (~USD 11.000/jaar; zie correctie hieronder), Empower (~USD 3.000–5.000/jaar), plus niches. Gewogen naar volume (veel MS Project, weinig Acumen): ~~USD 2.500 – 4.000 per seat per jaar~~ → **gecorrigeerd: USD 1.000 – 2.500 per seat per jaar** *(schatting)*.

> **CORRECTIE (rekenfout, geverifieerd 25-07-2026).** De Cobra-prijs van "USD 8.000–17.600 **per jaar**" is een omgerekende looptijdprijs die als jaarprijs is gebruikt. De bronopdracht (USAspending, award `NEW TECH SOLUTIONS, INC.`, "FIVE (5) DELTEK COBRA AND THREE (3) ACUMEN FUSE LICENSES WITH ANNUAL MAINTENANCE", USD 140.896,38) loopt **2022-09-26 → 2026-08-07**, dus bijna vier jaar. USD 140.896 ÷ 8 seats ÷ ~3,9 jaar ≈ **USD 4.500 per seat per jaar** (blended Cobra+Acumen), niet USD 17.600/jaar. Onafhankelijke bevestiging in dezelfde dataset: "DELTEK COBRA, **15 USERS**, maintenance 09/2016–09/2017" = USD 15.910,80 → **≈ USD 1.061 per seat per jaar** onderhoud; DOE PPPO-Cobra-verlengingen USD 13.404/jaar. Cobra-seats kosten in deze data **duizenden**, geen tienduizenden dollars per jaar. Omdat Cobra samen met Acumen de enige twee ankers waren die de blend omhoog trokken, zakt de gemengde seatprijs mee.
>
> **Doorwerking naar stap 4:** met USD 1.000–2.500/seat komt de bottom-up uit op 80.000 × 1.000 = **USD 80 mln** tot 130.000 × 2.500 = **USD 325 mln**, dus **USD 0,08 – 0,33 mrd** in plaats van USD 0,20 – 0,52 mrd. Zie §Verificatie V4/V5.

**Stap 4 — Uitkomst.**
80.000 × USD 2.500 = **USD 200 mln**; 130.000 × USD 4.000 = **USD 520 mln**.
→ **Pure planning-/EVM-licentiemarkt in A&D: USD 0,20 – 0,52 miljard per jaar (2026)** *(schatting)*.

**Stap 5 — Kruiscontrole top-down.**
- EVM-softwaremarkt USD 2,5 mrd (2026) × A&D-aandeel 25–35% *(schatting; A&D wordt door de bron als primaire driver genoemd)* = **USD 0,6 – 0,9 mrd**. Deze definitie is breder dan stap 4: hij omvat ook de kosten-/ERP-kant (Cobra, Costpoint-EVM-modules, MPM) en analytics.
- PPM-markt USD 7,69 mrd (2026) × A&D/overheidsaandeel 8–12% *(schatting)* = **USD 0,6 – 0,9 mrd**.

> **CORRECTIE — de twee top-downroutes "convergeren" niet, ze spreken elkaar tegen.** De originele formulering ("beide top-down routes convergeren op dezelfde bandbreedte") suggereert onafhankelijke bevestiging. Dat is niet zo, om twee redenen:
> 1. **Ze overlappen.** De EVM-softwaremarkt is grotendeels een *deelverzameling* van de PPM-markt (Cobra, wInsight, Open Plan, Deltek PPM, forProject, ProjStream worden in beide tellingen meegenomen). Twee metingen van deels dezelfde omzet zijn geen kruiscontrole.
> 2. **Ze zijn onderling inconsistent.** Route 1 zegt: A&D geeft USD 0,6–0,9 mrd uit aan **alleen EVM**-software. Route 2 zegt: A&D/overheid is USD 0,6–0,9 mrd van de **hele** PPM-markt (schedulingtooling *inclusief* EVM). Als beide waar zijn, blijft er voor pure schedulingtooling in A&D ongeveer **nul** over — terwijl §0.6/§4.2 juist USD 0,25–0,45 mrd puur scheduling claimt. Minstens één van de drie getallen moet fout zijn.
> 3. **Bronkwaliteit van de EVM-route is zwak.** Verified Market Reports is een rapportenfabriek zonder gepubliceerde methodologie, en de eigen cijfers van de bron zijn intern inconsistent: USD 2,5 mrd (2026) → USD 4,2 mrd (2033) impliceert een CAGR van **7,7%**, niet de gestelde **8,2%** (nagerekend 25-07-2026). Bovendien is de bewering plausibiliteitsgewijs verdacht: USD 2,5 mrd zou betekenen dat EVM-software alleen **33% van de gehele wereldwijde PPM-markt** (USD 7,69 mrd, Mordor) uitmaakt — voor een niche die door een handvol leveranciers (Deltek, forProject, ProjStream, Encore, MPM) wordt bediend, terwijl de gehele PPM-markt óók Microsoft, Planview, Smartsheet, Asana, ServiceNow, Planisware en Oracle bevat. Behandel de EVM-route als **onbetrouwbaar**, niet als bevestiging.

**Consolidatie (schatting):**

> **Segmentomvang planning + EVM-software voor aerospace & defensie: USD 0,6 – 1,0 miljard per jaar in 2026** (midden ≈ **USD 0,8 mrd ≈ ~~EUR 0,74 mrd~~ → EUR 0,70 mrd** bij EUR/USD ~~1,08~~ → **1,1383**, ECB-referentiekoers 1 juli 2026), **waarvan USD 0,25 – 0,45 miljard puur schedulingtooling** (de rest is kosten-/EV-engines en analytics).

> **CORRECTIE 1 — wisselkoers.** EUR/USD 1,08 was de aanname; de ECB-referentiekoers is **1,1383 (01-07-2026)**, met een bandbreedte van 1,1340–1,1797 over april–juli 2026 ([ECB](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html)). USD 0,8 mrd = **EUR 0,70 mrd**, niet EUR 0,74 mrd. De volledige band USD 0,6–1,0 mrd = **EUR 0,53–0,88 mrd**.
>
> **CORRECTIE 2 — de bandbreedte USD 0,6–1,0 mrd rust niet op de bottom-up.** De eigen bottom-up (stap 4) gaf USD 0,20–0,52 mrd, en met de gecorrigeerde seatprijs USD 0,08–0,33 mrd. De gepubliceerde band USD 0,6–1,0 mrd komt daarmee **uitsluitend** uit de twee top-downroutes, die hierboven als overlappend en onderling tegenstrijdig zijn ontmaskerd. Eerlijke weergave: het punt-schatting-interval is **minstens USD 0,1 – 1,0 mrd**, dus een orde van grootte breed. Behandel "USD 0,8 mrd" niet als een centrale waarde maar als het bovenste deel van een zeer onzekere band.
>
> **CORRECTIE 3 — "waarvan USD 0,25–0,45 mrd puur schedulingtooling" is nergens afgeleid.** Dit getal verschijnt in §0.6 en hier, maar volgt uit geen enkele stap in §4.2. Markeer als **onzeker/niet-onderbouwd**.

**Inclusief diensten.** Met de verhouding licentie : diensten van **1 : 2–5** uit §3.5 komt de totale "planningseconomie" van de sector uit op:

> **USD 3 – 5 miljard per jaar (2026)** aan planningssoftware plús planningsdiensten, implementatie, EVMS-validatie en scheduling-consultancy in aerospace & defensie *(schatting)*.

> **CORRECTIE 4 — rekenfout in de dienstenopschaling.** §3.5 geeft licentie : implementatie/training : lopende dienstverlening = **1 : 0,5–1 : 2–5**, dus een totaalmultiple van **3,5–7×** de licentie (niet "1 : 2–5", waarbij de implementatie-poot stilzwijgend wegvalt). Toegepast op USD 0,6–1,0 mrd geeft dat **USD 2,1 – 7,0 mrd**, niet USD 3–5 mrd. De gepubliceerde band is smaller dan de eigen invoer toelaat en suggereert een precisie die er niet is. Met de gecorrigeerde licentiebasis (USD 0,1–1,0 mrd) wordt de band **USD 0,35 – 7,0 mrd** — feitelijk een niet-informatief getal. Zie §Verificatie V6 voor waarom de onderliggende 1:0,5–1:2–5-ratio zelf niet houdbaar is.

### 4.3 Groeirichting

**Stijgend, naar schatting ~~8–12%~~ → 5–12% per jaar** *(schatting, gebaseerd op onderstaande signalen; bandbreedte na verificatie verruimd omdat de +7,0%-escalatiepijler niet sectorbreed houdbaar bleek — zie §Verificatie V9, en omdat de 8,2%-EVM-CAGR uit een intern inconsistente bron komt — zie V5)*:

- PPM-markt CAGR **11,43%** (2026–2031) ([Mordor](https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market)); EVM-softwaremarkt CAGR **8,2%** (2026–2033) ([Verified Market Reports](https://www.verifiedmarketreports.com/product/earned-value-management-software-market/)).
- Waargenomen prijsinflatie bij de bestaande installed base: **+7,0% per jaar** bij NASA's Deltek-verlengingen 2022–2026 (USAspending-API) — dit is groei zonder één extra seat.

  > **CORRECTIE — +7,0% is geen sectorbrede escalatie.** De NASA-reeksen zijn nageteld en kloppen exact (Acumen Fuse 42.078 → 45.024 → 48.176 → 51.548 → 55.156, elke stap precies ×1,0700; Cobra 44.707 → 47.836, ×1,0700; het FY26-Acumen-record is bevestigd als NASA-opdracht aan Deltek Inc., 2026-08-23 → 2027-08-22). **Maar dezelfde dataset bevat een tegenvoorbeeld bij hetzelfde bedrijf:** Deltek wInsight jaarlijks onderhoud & support ging van USD 285.371,28 (FY23, 2023-03-01) naar USD 312.368,48 (FY26, 2026-03-01) = **+9,5% over drie jaar, ofwel ≈ +3,1% per jaar** — nauwelijks boven inflatie. De +7,0% is dus een **contractspecifieke** escalatieclausule op twee NASA-verlengingen, geen bewijs van sectorbrede prijszettingsmacht. Dit verzwakt zowel de groeiraming (§4.3) als "Gat 6 — de prijsschroef zonder tegenprestatie" (§7.1).
- Volumegroei: Europese herbewapening en groeiende defensiebudgetten (VS USD 954 mrd in 2025, 33,0% van wereldtotaal — [SIPRI via Wikipedia](https://en.wikipedia.org/wiki/List_of_countries_by_military_expenditures)); Duitsland staat al vierde met USD 114 mrd.
- Structurele driver: AI-uitgaven in A&D groeien naar **USD 5,8 mrd in 2029, 3,5× het niveau van 2025** ([Deloitte 2026 A&D Outlook](https://www.deloitte.com/us/en/insights/industry/aerospace-defense/aerospace-and-defense-industry-outlook.html)) — deels gericht op programmadata-analyse. Deltek positioneert al AI-functionaliteit ("Dela™" variance-narrative-scoring in Cobra, AI-risicoherkenning in Acumen — [Cobra](https://www.deltek.com/en/products/project-and-portfolio-management/cobra), [Acumen](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)).
- Vaardighedenvraag: aandeel data-analysevacatures in A&D stijgt van 9% (2025) naar bijna 14% (2028) ([Deloitte](https://www.deloitte.com/us/en/insights/industry/aerospace-defense/aerospace-and-defense-industry-outlook.html)).

**Tegenkracht:** de verschuiving naar vaste-prijscontracten drukt op EVMS-verplichtingen (bij vaste prijs is EVM "discouraged" en waiverplichtig — [DFARS 234.201](https://www.acquisition.gov/dfars/234.201-policy.)). Dit verkleint niet de behoefte aan schema's, maar wel de dwingende noodzaak van de dure EV-laag bij een deel van het werk.

---

## 5. Sector-specifieke eisen en standaarden

### 5.1 ANSI/EIA-748 (EVMS)

- Historie: DoD's **C/SCSC met 35 criteria** (1967) → teruggebracht tot **32 guidelines** en overgedragen aan de industrie via **ANSI/EIA-748-A** (gepubliceerd mei 1998, herbevestigd augustus 2002); draft **EIA-748B** vanaf 2007 ([Wikipedia, Earned value management](https://en.wikipedia.org/wiki/Earned_value_management)).
- Internationale adoptie: NASA, Department of Energy, **UK Ministry of Defence**, en Australië (**AS 4817-2003 / AS 4817-2006**) ([idem](https://en.wikipedia.org/wiki/Earned_value_management)).
- Toepassingsdrempels (DoD):
  - **≥ USD 20 mln:** EVMS moet voldoen aan ANSI/EIA-748.
  - **≥ USD 50 mln:** EVMS moet formeel **door het cognizant Federal agency conform verklaard** zijn.
  - **< USD 20 mln:** discretionair, met gedocumenteerde risicoafweging en kosten-batenanalyse.
  - **Vaste prijs, elk bedrag:** toepassing van EVM is *ontmoedigd* en vereist een waiver.
  ([acquisition.gov, DFARS 234.201](https://www.acquisition.gov/dfars/234.201-policy.))
- Handhaving: **DCMA** voert de conformiteitsbepaling uit wanneer DoD het cognizant Federal agency is ([idem](https://www.acquisition.gov/dfars/234.201-policy.)). Er zijn **16 als "high-risk" aangemerkte guidelines** waarvan materiële tekortkomingen tot systeemafkeuring leiden; contractanten hebben **45 dagen** om te corrigeren of een corrective action plan in te dienen; er is **30 dagen** reactietijd op de schriftelijke kennisgeving van materiële zwakheden ([DFARS 252.234-7002](https://www.acquisition.gov/dfars/252.234-7002-earned-value-management-system.), [DFARS 234.201](https://www.acquisition.gov/dfars/234.201-policy.)).
- **IBR binnen 180 dagen** na gunning, optieuitoefening of grote wijziging ([DFARS 252.234-7002](https://www.acquisition.gov/dfars/252.234-7002-earned-value-management-system.)).

### 5.2 DCMA 14-Point Schedule Assessment

Dit is het instrument dat een IMS technisch afkeurt. Dat het bestaat en toolmatig geïmplementeerd is, is geverifieerd:

- Deltek Open Plan bevat "programmed **DCMA 14-point quality checks** and **DECM-aligned metrics**" die "logic errors, sequencing issues, and invalid forecast dates" identificeren ([Open Plan](https://www.deltek.com/en/products/project-and-portfolio-management/open-plan)).
- Deltek Acumen Fuse toetst tegen **"600+ industry-aligned metrics"** afkomstig van **DCMA, DOE, NASA, GAO en AACE** ([Acumen](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)).
- De resource-check vereist dat "all tasks with durations greater than zero have dollars or hours assigned" ([Ten Six Consulting](https://www.tensix.com/dcma-14-point-assessment/)).

De veertien metrics zijn, met de in de praktijk gehanteerde drempels:

| # | Metric | Gangbare drempel |
|---|---|---|
| 1 | Logic (ontbrekende voorganger/opvolger) | ≤ 5% van de incomplete activiteiten |
| 2 | Leads (negatieve lags) | 0 |
| 3 | Lags | ≤ 5% |
| 4 | Relationship types (aandeel Finish-Start) | ≥ 90% FS |
| 5 | Hard constraints | ≤ 5% |
| 6 | High float (total float > 44 werkdagen) | ≤ 5% |
| 7 | Negative float (< 0 dagen) | 0% |
| 8 | High duration (> 44 werkdagen) | ≤ 5% |
| 9 | Invalid dates (forecast in het verleden / actuals in de toekomst) | 0 |
| 10 | Resources | 100% van activiteiten met duur > 0 |
| 11 | Missed tasks | ≤ 5% |
| 12 | Critical path test | kritiek pad moet reageren op een geïnjecteerde vertraging |
| 13 | Critical Path Length Index (CPLI) | ≥ 0,95 |
| 14 | Baseline Execution Index (BEI) | ≥ 0,95 |

> **Bronbeperking, expliciet:** het canonieke DCMA-brondocument (`dcma.mil/Portals/31/Documents/EVMS/...`) was tijdens dit onderzoek niet bereikbaar (HTTP 404 / geblokkeerd), evenmin als acqnotes.com en projectmanagement.com. Bovenstaande **drempelwaarden zijn de algemeen gepubliceerde industriewaarden en zijn in dit onderzoek niet tegen het primaire DCMA-document geverifieerd** — behandel ze als *indicatief*. Het *bestaan* en de *toolimplementatie* van de 14-point-toets zijn wel geverifieerd (Deltek Open Plan, Ten Six).

### 5.3 GAO Schedule Assessment Guide (GAO-16-89G) — tien best practices

Volledig geverifieerd uit het primaire document ([GAO-16-89G, december 2015](https://www.gao.gov/products/gao-16-89g)):

1. **Capturing all activities** (incl. WBS, activiteitsnamen, activiteitscodes)
2. **Sequencing all activities** (predecessor/successor-logica, dangling logic, date constraints, lags & leads, path convergence)
3. **Assigning resources to all activities** (rolling wave planning, resource leveling)
4. **Establishing the duration of all activities** (durationschatting, kalenders)
5. **Verifying that the schedule can be traced horizontally and vertically**
6. **Confirming that the critical path is valid** (critical path vs. longest path, program- en projectkritieke paden)
7. **Ensuring reasonable total float** (total float vs. free float, floatmanagement)
8. **Conducting a schedule risk analysis** (merge bias, drie-punts-schattingen, risk drivers, probabilistic branching, correlatie, schedule contingency)
9. **Updating the schedule using actual progress and logic** (statusing, out-of-sequence logic, schedule narrative)
10. **Maintaining a baseline schedule** (baseline vs. current, basis document, change process)

Dit document is *de* auditbasis voor Amerikaanse overheidsauditors en is daarmee de feitelijke functionele specificatie waaraan elke planningstool in deze sector wordt afgemeten.

### 5.4 IPMDAR (Integrated Program Management Data and Analysis Report)

De IPMDAR heeft de oudere IPMR/CPR/IMS-DID's vervangen als het contractuele leveringsartefact. Geverifieerd via leverancierbron: Deltek Cobra genereert "audit-ready reports in **IPMDAR (CPD/SPD)** and **DOE PARS** formats required for federal contracts" ([Cobra](https://www.deltek.com/en/products/project-and-portfolio-management/cobra)); Deltek Acumen levert "**IPMDAR-compliant outputs** for federal reporting" ([Acumen](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)).

De IPMDAR bestaat uit drie componenten: de **Contract Performance Dataset (CPD)**, de **Schedule Performance Dataset (SPD)** en het **native schedule file** — het onbewerkte planningsbestand zoals de contractant het zelf gebruikt.

> **Bronbeperking:** het primaire DID-document (DI-MGMT-81861C) was via `acq.osd.mil` en `dau.edu` niet bereikbaar (HTTP 503 / hostredirect). De driedeling CPD/SPD/native file is bevestigd via Deltek (CPD/SPD expliciet genoemd); de exacte formaatspecificatie (JSON-schema voor de datasets) is **niet primair geverifieerd in dit onderzoek**.

De eis van het **native schedule file** is voor deze marktanalyse cruciaal: de overheid ontvangt niet alleen een geëxporteerde dataset maar het *originele bestand*, en moet dat kunnen openen. Dat is de sterkste structurele barrière voor elk niet-mainstream planningspakket.

### 5.5 Verplichte leveringsformaten

| Formaat | Waar verplicht | Karakter |
|---|---|---|
| **`.xer`** (Primavera-export) | UFGS 01 32 01.00 10 §2.1.2.1: bij P6-gebruik "provide the 'xer' export file in a version of P6 importable by the Government system"; versie afstemmen tijdens de SEKO-meeting; **niet nieuwer dan de overheidsversie** | Proprietair, niet formeel gedocumenteerd, versiegevoelig |
| **P6 XML** | de facto uitwisselingsformaat tussen P6-instanties en analysetools | Proprietair maar XML-gebaseerd |
| **`.mpp` / MSPDI XML** | Microsoft Project-ketens | Proprietair (.mpp) / open XML (MSPDI) |
| **SDEF** (Standard Data Exchange Format, ER 1-1-11 App. A) | UFGS 01 32 01.00 10 §3.3.7: **"This exact structure is mandatory"** voor de activiteitencoderingsstructuur; het gaat om vaste veldlengtes: WRKP(3), RESP(4), AREA(4), MODF(6), BIDI(6), PHAS(2), CATW(1), FOW(20) | **Open, gedocumenteerd, leveranciersneutraal** — de spec zegt expliciet: "Use of proprietary systems will not be specified" |
| **IPMDAR CPD/SPD** | DoD-contracten met EVMS-verplichting | Gestructureerde dataset, gestandaardiseerd |
| **Native schedule file** | IPMDAR | Wat de contractant ook gebruikt — de overheid moet het kunnen lezen |

*Bron: [UFGS 01 32 01.00 10 (aug 2023, chg 1 08/24)](https://www.wbdg.org/ffc/dod/unified-facilities-guide-specifications-ufgs); [Deltek Cobra](https://www.deltek.com/en/products/project-and-portfolio-management/cobra).*

**Verplichte P6-instellingen (UFGS §3.12, "PRIMAVERA P6 MANDATORY REQUIREMENTS")** — een uitzonderlijk expliciete tool-configuratie-eis in een contract:
- Activity Codes op **Project Level**, niet Global/EPS
- Calendars op **Project Level**, niet Global/Resource
- Activity Duration Type = **"Fixed Duration & Units"**
- Percent Complete Type = **"Physical"**
- Time Period Admin Preferences op de default **8,0 uur/dag, 40 uur/week, 172 uur/maand, 2000 uur/jaar**
- Schedule Option voor kritieke activiteiten = **"Longest Path"**
- Schedule Option voor voortgang = **"Retained Logic"**
- Kostenladen via één lump-sum non-labour resource

Dit is, voor een softwarebouwer, feitelijk een gratis conformiteitschecklist: wie deze acht instellingen exact kan reproduceren, produceert een contractueel aanvaardbaar schema.

### 5.6 Audits, claims en forensische analyse

UFGS 01 32 01.00 10 codificeert een volledige claimsketen in de contractspecificatie zelf:
- §3.8.3 **Time Impact Analysis (Prospective Analysis)**
- §3.8.4 **Forensic Schedule Analysis (Retrospective Analysis)**
- §3.8.5 **Fragmentary Network (Fragnet)**
- §3.8.6 **Time Extension**
- §3.8.7 **Impact to Early Completion Schedule**
- §3.9.1 **Artificially Improving Progress**, §3.9.3 **Recovery Schedule**
([UFGS 01 32 01.00 10](https://www.wbdg.org/ffc/dod/unified-facilities-guide-specifications-ufgs))

Deltek Acumen ondersteunt "forensic schedule comparison to separate progress from scope changes" ([Acumen](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)); Steelray verkoopt een dedicated **Delay Analyzer** voor "Schedule Delay Analysis for Primavera P6" inclusief kritiek-pad- en wijzigingsanalyse ([steelray.com](https://www.steelray.com/)). De AACE-praktijken (met name RP **29R-03 Forensic Schedule Analysis**) zijn de methodologische standaard; Acumen noemt AACE expliciet als een van de bronnen van zijn 600+ metrics ([Acumen](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)).

> ~~**Bronbeperking:** het nummer 29R-03 is niet primair geverifieerd.~~ → **OPGELOST (25-07-2026).** Uit de tekst van UFGS 01 32 01.00 10 zelf, §1.1 References: *"AACE 29R-03 (2011) Forensic Schedule Analysis"*, naast *"AACE 52R-06 (2006) Time Impact Analysis"*, *"AACE 84R-13 (2015) Planning and Accounting for Adverse Weather"* en *"ASCE 67-17 (2017) Schedule Delay Analysis"*. **Belangrijke aanvulling die in het rapport ontbrak:** §3.8.4 bepaalt dat als een methodologie uit AACE 29R-03 wordt gekozen, deze moet voldoen aan ASCE 67-17, en *"If there is a conflict with the methodology chosen from AACE 29R-03 and ASCE 67-17, **ASCE 67-17 will govern**."* De methodologische standaard is dus niet AACE alleen — **ASCE 67-17 heeft voorrang**.

### 5.7 Kwalificatie-eisen aan de planner zelf

UFGS 01 32 01.00 10 §1.3 eist dat de **Designated Project Scheduler** ten minste **drie eerdere bouwschema's van vergelijkbare omvang en complexiteit met Primavera P6** heeft opgesteld en onderhouden, en "comprehensive knowledge of CPM scheduling principles" bezit ([UFGS](https://www.wbdg.org/ffc/dod/unified-facilities-guide-specifications-ufgs)). Certificeringen die in deze sector wegen: **PMI-SP** (PMI Scheduling Professional), **AACE PSP** (Planning & Scheduling Professional) en **EVP** (Earned Value Professional, College of Performance Management).

---

## 6. Voor- en nadelen van de gebruikte pakketten — specifiek in A&D-context

### 6.1 Deltek Cobra

**Werkt hier goed:**
- Is *de* geaccepteerde EVMS-motor. "9 of top 10 DoD contractors use Cobra" ([Cobra](https://www.deltek.com/en/products/project-and-portfolio-management/cobra)) betekent dat DCMA-auditors het kennen — dat is op zichzelf een enorme compliancekortere-weg.
- Levert direct in **IPMDAR (CPD/SPD)** en **DOE PARS** ([idem](https://www.deltek.com/en/products/project-and-portfolio-management/cobra)) — de deliverables die anders handmatig gebouwd moeten worden.
- Ondersteunt DCMA, CAS én EIA-748 uit één systeem.
- Integreert met Costpoint (ERP), Open Plan, P6, MS Project en Excel — het accepteert dus de bestaande schema-engine in plaats van die te vervangen.

**Wringt hier:**
- Vereist een aparte schema-engine; Cobra plant niet zelf. De cost-schedule-integratie is dus altijd een koppelingsprobleem met eigen reconciliatiepijn.
- Geen publieke prijs, geen zelfbediening; elk contract is een onderhandeling. Afgeleide prijs uit federale data: **USD 8.000 – 17.600 per seat over de looptijd** (DOE-order: 5 Cobra + 3 Acumen Fuse voor USD 140.896 incl. onderhoud, USAspending-API).
- De AI-toevoeging (Dela™ variance-narrative-scoring) is nieuw en oogt als een defensieve feature tegen commoditisering, niet als een oplossing voor het onderliggende integratieprobleem.

### 6.2 Deltek Open Plan

**Werkt hier goed:**
- Het enige mainstream schedulingpakket met **ingebouwde DCMA 14-point- en DECM-checks** en **gecontroleerde replanning met rolgebaseerde toegang en volledige audithistorie** die earned-value-compliance behoudt ([Open Plan](https://www.deltek.com/en/products/project-and-portfolio-management/open-plan)). Dat is precies wat een EVMS-baselinewijzigingsproces nodig heeft en wat P6 en MS Project niet native leveren.
- Ondersteunt IBR's, PMR's en surveillance-reviews vanuit het product zelf.
- Native Jira-integratie voor hybride agile/waterval-programma's — relevant nu software-intensieve wapensystemen steeds vaker agile-elementen bevatten.

**Wringt hier:**
- **De installed base lijkt te krimpen.** Directe federale Open Plan-opdrachten 2015–2025 zijn minuscuul: maximaal USD 91.411, meestal USD 1.700–17.500 (USAspending-API), tegenover Acumen tot USD 407.316 en wInsight tot USD 775.330. *(Analyse, geen bron: dit suggereert dat de overheidszijde Open Plan niet koopt en het product afhankelijk is van legacy-installaties bij primes.)*
- Ecosysteem-armoede: consultants, trainingen, sjablonen en arbeidsmarkt zijn ordes van grootte kleiner dan bij P6 of MS Project. De i3Works G-Cloud-dienstenlijst noemt **Primavera P6 Scheduling, Planning, Reporting, Support en Consultancy** — en geen Open Plan ([G-Cloud](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/536755182720277)).
- Voor de overheidsklant is het een extra silo naast P6, dat toch al de MILCON-standaard is.

### 6.3 Deltek Acumen (Fuse / Risk / 360 / Touchstone)

**Werkt hier goed:**
- **600+ metrics uit DCMA-, DOE-, NASA-, GAO- en AACE-standaarden** in één toets ([Acumen](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)) — dit is de facto de scheidsrechter over of een IMS acceptabel is.
- **Toolneutraal:** ondersteunt Oracle P6, MS Project, Open Plan en Phoenix. Het is daarmee de *lijm* van de sector: het maakt niet uit waarmee je plant, zolang Fuse groen is.
- **Touchstone** automatiseert het inleveren en scoren van subcontractorschema's — precies het probleem van een prime met honderden leveranciers.
- Monte Carlo: "1.000s of simulations run in seconds" ([idem](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)).
- Marktbewijs: NASA verlengt al vijf jaar op rij (USD 42.078 → 55.156), DoD koopt enterprise-licenties van USD 384.102–407.316 (USAspending-API).

**Wringt hier:**
- **Prijs per seat is de hoogste in de stack: ≈ USD 11.049/jaar** (afgeleid uit USD 55.244 voor 5 licenties, Dept. of Commerce 2025, USAspending-API). Voor een tier-2-leverancier die 3 planners heeft is dat onbetaalbaar — terwijl de prime wél Fuse-conforme schema's eist. Dit is de scherpste pijnpunt in de gehele keten.
- Het is een *diagnose*tool, geen *herstel*tool: het vertelt je dat je 7% dangling logic hebt, maar repareert het niet.
- Enterprise-prijsmodellen zijn ondoorzichtig: NASA betaalde USD 240.392 voor "12.000 employees", een DoD-onderdeel USD 407.316 voor "enterprise". Zonder vergelijkingsbasis is inkoopleverage minimaal.

### 6.4 Oracle Primavera P6

**Werkt hier goed:**
- **De overheidsdefault** voor bouw en infrastructuur: "The Government uses Primavera P6" ([UFGS](https://www.wbdg.org/ffc/dod/unified-facilities-guide-specifications-ufgs)).
- Enorme arbeidsmarkt en ecosysteem: 87 G-Cloud-diensten alleen al met "Primavera" in de naam in het VK ([Digital Marketplace](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/search?q=primavera)).
- Schaalt naar tienduizenden activiteiten en meerdere gelijktijdige gebruikers via EPPM.
- Wordt door elke analysetool gelezen (Acumen, Steelray, Safran Risk, Full Monte).

**Wringt hier:**
- **Geen native EVMS.** Primavera Earned Value Management was een apart product van **USD 10.000/gebruiker** in de laatste publieke prijslijst (Oracle C&E Global Price List 2016) en komt in de actuele G-Cloud 14-prijzen niet meer voor als losstaand P6-product; EVM verschijnt daar alleen nog als **Unifier**-module van £44 p.u.p.m. (Oracle Primavera Pricing – G-Cloud 14). Dat betekent dat A&D-gebruikers P6 vrijwel altijd naast Cobra draaien.
- **Primavera Risk Analysis lijkt uitgefaseerd.** Het stond in 2016 nog op de prijslijst voor USD 9.500/gebruiker, maar komt **niet meer voor in de G-Cloud 14-prijslijsten van 2024/2025** (die alleen OPC, P6 EPPM, Unifier en Aconex noemen). Federale inkoopdata laten sinds 2018 nauwelijks nog PRA-aankopen zien (laatste substantiële: USD 32.613, DoD 2018, USAspending-API). *(Analyse; Oracle bevestigt de uitfasering niet expliciet in de geraadpleegde bronnen.)*
- **Cloudmigratiedruk versus geclassificeerd werk.** Oracle duwt richting Oracle Primavera Cloud; voor ITAR-/geclassificeerde programma's is dat problematisch, en de speciale overheidsvariant kost het dubbele (£439 vs. £220 p.u.p.m., Oracle Primavera Pricing – G-Cloud 14).
- **Prijsstructuur straft kleine gebruikers af:** minimum 25 hosted named users voor P6 EPPM Cloud, 50 voor de UK Government-variant (idem). Een onderaannemer met 4 planners kan de instapdrempel niet halen.
- **`.xer`-versiehel:** UFGS moet expliciet voorschrijven dat je exporteert in een versie "no newer than that used by the Government" en dat je dat tijdens een aparte kickoff-meeting afstemt ([UFGS](https://www.wbdg.org/ffc/dod/unified-facilities-guide-specifications-ufgs)). Dat is een gedocumenteerd interoperabiliteitsfalen van het formaat.

### 6.5 Microsoft Project

**Werkt hier goed:**
- Goedkoop en overal: USD 679,99 (Standard) / USD 1.129,99 (Professional) eeuwigdurend ([microsoft.com](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software)).
- Wordt door de hele analyseketen ondersteund (Acumen, Steelray Project Analyzer, Barbecana Full Monte, Safran Risk, forProject).
- Geen inkooptraject nodig — iedere engineer heeft het al.

**Wringt hier:**
- Geen EVMS, geen baseline-changecontrol, geen auditlog die een DCMA-review overleeft. Alles moet er omheen worden gebouwd.
- Multi-user en zeer grote schema's zijn zwak; consolidatie van subcontractorschema's is handwerk.
- Sterk afhankelijk van externe tools voor DCMA-conformiteit — die tools kosten vervolgens 10× de MS Project-licentie.

### 6.6 Deltek wInsight Analytics en Encore Analytics Empower

**Werkt hier goed:**
- Dit zijn de tools van de **klant**, niet van de leverancier. wInsight is met USD 775.330 (3 jaar DoD-onderhoud) en USD 312.368 (1 jaar, 2026) een van de grootste directe federale softwareposten in deze categorie; Empower staat bij NASA op meerjarige raamovereenkomsten van USD 154.000–175.000 (USAspending-API).
- Ze doen precies één ding goed: ingediende EV-data analyseren en trends/afwijkingen tonen over een portfolio.

**Wringt hier:**
- Ze zijn afhankelijk van de kwaliteit van wat er wordt ingeleverd. Garbage in, gecertificeerde garbage out.
- Nauwelijks schedulingfunctionaliteit — ze analyseren, ze plannen niet.

### 6.7 Nichespelers (Steelray, Barbecana, Safran, ProjStream, forProject)

**Werkt goed:** scherpe prijs, één probleem goed opgelost, snelle implementatie. Steelray-viewers worden bij DHS in enterprise-vorm afgenomen (USD 74.650–92.822 per meerjarige verlenging, USAspending-API). Safran Risk claimt 97% snellere Monte Carlo dan concurrenten met SQL-ondersteuning voor resource-geladen schema's ([safran.com](https://safran.com/)).

**Wringt:** geen enkele van deze partijen kan de volledige compliancestack dekken, dus ze komen altijd *bovenop* Deltek of Oracle. Voor de klant betekent dat drie tot vijf leveranciers, drie tot vijf onderhoudscontracten en drie tot vijf datamodellen.

---

## 7. Openingen: waar zit de ontevredenheid en welk gat bestaat er

> **Transparantie over bronnen:** review-platforms (G2, TrustRadius, Capterra, SoftwareAdvice) en Reddit waren in deze sessie niet bereikbaar (HTTP 403 / geblokkeerd). De onderstaande "ontevredenheid" is daarom **afgeleid uit structurele bewijsstukken** (prijsstructuren, inkooppatronen, contractclausules) in plaats van uit directe gebruikersuitspraken. Waar het om interpretatie gaat, staat dat erbij.

### 7.1 Zeven concrete gaten

**Gat 1 — De onderaannemer die Fuse-conform moet zijn maar geen Fuse kan betalen.**
Een tier-2-leverancier met 3 planners krijgt van de prime een flow-down-eis om DCMA-conforme schema's te leveren, maar staat tegenover ≈ USD 11.049/seat/jaar voor Acumen ([afgeleid, USAspending](https://api.usaspending.gov/)) of minimaal 25 hosted users voor P6 EPPM Cloud (Oracle Primavera Pricing – G-Cloud 14). Dit is het scherpste, best gedocumenteerde gat in de hele sector.
→ **Kans:** een open-source planner met een **ingebouwde, gratis schemakwaliteitstoets** (DCMA 14-point + GAO-10-best-practices-checklist) is direct waardevol zonder dat je de EVM-motor hoeft te bouwen.

**Gat 2 — De open-formaatgap.**
De sector draait op `.xer` (proprietair, ongedocumenteerd, versiegevoelig — zozeer dat UFGS een aparte kickoff-meeting voorschrijft om versiecompatibiliteit af te stemmen) en `.mpp` (proprietair). Tegelijk schrijft dezelfde UFGS voor dat als de overheid een schema in-house wil monitoren, dat via **SDEF** moet: *"Use of proprietary systems will not be specified"* ([UFGS 01 32 01.00 10](https://www.wbdg.org/ffc/dod/unified-facilities-guide-specifications-ufgs)). SDEF is volledig gespecificeerd (vaste veldlengtes: WRKP 3, RESP 4, AREA 4, MODF 6, BIDI 6, PHAS 2, CATW 1, FOW 20).
→ **Kans:** SDEF-export is een klein, volledig gespecificeerd stukje werk met directe contractuele relevantie. Voor een open-source planner is het het goedkoopste toegangsbewijs tot de Amerikaanse defensiebouwketen.

**Gat 3 — De "Other Than Primavera"-clausule is een open deur die niemand gebruikt.**
UFGS 01 32 01.00 10 §2.1.2.2 staat expliciet toe dat de aannemer andere software dan P6 gebruikt, mits die aan de specificatie voldoet — maar dan moet hij **"two licenses, two computers, and training for two Government employees"** leveren, op stand-alone machines, terug te geven bij projectafronding ([UFGS](https://www.wbdg.org/ffc/dod/unified-facilities-guide-specifications-ufgs)).
→ **Kans:** voor commerciële software is dat een prohibitieve boete (2 extra licenties + hardware + training). Voor **open-source software is de licentiecomponent nul**; er blijven twee laptops en een dagje training over. Dit is de enige plek in de Amerikaanse defensieregelgeving die letterlijk zegt "je mag iets anders gebruiken", en de kostenbarrière die er staat is precies de barrière die open source wegneemt. Dit is de sterkste juridisch onderbouwde opening in dit hele rapport.

**Gat 4 — Soevereiniteit en air-gap.**
De UK Government Cloud-variant van P6 kost **£439 p.u.p.m. vs. £220 commercieel** (Oracle Primavera Pricing – G-Cloud 14) — een 100% opslag voor een geaccrediteerde omgeving, met minimaal 50 gebruikers. Voor geclassificeerd werk is SaaS überhaupt geen optie. Europese defensieorganisaties worstelen bovendien met Amerikaanse leveranciersafhankelijkheid.
→ **Kans:** een lokaal draaiende, auditeerbare, broncode-inspecteerbare planner is een **soevereiniteitsargument**, niet alleen een kostenargument. Dat argument wordt in Europa in 2026 sterker, niet zwakker (Duitsland is inmiddels de vierde militaire uitgever ter wereld met USD 114 mrd — [SIPRI via Wikipedia](https://en.wikipedia.org/wiki/List_of_countries_by_military_expenditures)).

**Gat 5 — Baselinebeheer en audittrail zijn niet gecommoditiseerd.**
Alleen Open Plan claimt "controlled replanning ... through role-based access and complete audit histories" ([Open Plan](https://www.deltek.com/en/products/project-and-portfolio-management/open-plan)) — en Open Plan heeft nauwelijks overheidstractie (zie §6.2). P6 en MS Project leveren dit niet native. Toch is baselinebeheer GAO Best Practice 10 en de kern van EIA-748.
→ **Kans:** een planner met **first-class, onveranderlijke, diff-bare baselines** (git-achtig: elke baselinewijziging is een commit met auteur, tijdstip, reden en volledige diff) lost een probleem op dat de commerciële markt slecht bedient — en het past natuurlijk bij een open-source, bestandsgebaseerd model.

**Gat 6 — De prijsschroef zonder tegenprestatie.**
NASA betaalde voor dezelfde Acumen Fuse-licentie USD 42.078 (2022), 45.024 (2023), 48.176 (2024), 51.548 (2025) en 55.156 (2026) — **+31% in vier jaar** (USAspending-API). Cobra idem: USD 44.707 → 47.836 (+7,0%). Er is geen zichtbaar functioneel equivalent verbeterd.
*(Verificatie: de reeksen zijn exact bevestigd, maar de generalisatie naar "de sector" niet — Deltek wInsight ging bij DoD van USD 285.371 (FY23) naar USD 312.368 (FY26), ≈ +3,1%/jaar. Dit gat is dus **contractafhankelijk**, niet universeel; zie §Verificatie V9.)*
→ **Kans:** de rentmeester-argumentatie ("wij verhogen de prijs nooit, want er is geen prijs") is bij overheidsinkopers met meerjarige budgetten een reëel verkoopargument.

**Gat 7 — Het IFC-vraagstuk: waar past het wél en waar niet.**

*Eerlijke beoordeling:* **IFC is geen formaat voor wapensysteemplanning.** De product-datastandaarden in aerospace zijn STEP/ISO 10303 (AP242), niet IFC. Een IFC-gebaseerde planner heeft in de F-35-IMS niets te zoeken. Waar IFC in deze sector wél relevant is:

- **MILCON en defensie-infrastructuur.** Hangars, kades, droogdokken, opslagbunkers, testfaciliteiten, lanceerinstallaties, basisrenovaties. Dit is een substantiële markt binnen defensiebudgetten en het is *gebouwde omgeving* — precies IFC-terrein. En het is exact de markt waar UFGS 01 32 01.00 10 geldt, met zijn SDEF-eis en zijn "Other Than Primavera"-opening.
- **Scheepsbouw en werfinfrastructuur.** Marinewerven combineren productieplanning met faciliteiten.
- **MRO-faciliteiten en depots.** NAVAIR-depotonderhoud (waar de grootste Open Plan-opdracht vandaan kwam: USD 91.411, USAspending-API) is faciliteitsgebonden werk.
- **4D-planning voor bouw op defensieterreinen**, waar toegangsvensters, veiligheidszones en operationele continuïteit de planning domineren.

→ **Positionering:** een IFC-gebaseerde open-source planner moet A&D **niet** aanvallen via de wapensysteem-IMS (daar is de compliance-gracht te breed), maar via de **defensie-bouw- en faciliteitenketen**, en van daaruit opklimmen naar leveranciersschema's in de toeleveringsketen.

### 7.2 Waar een open-source planner het zeker níét gaat winnen

Volledigheidshalve, zodat de kans niet wordt overschat:

1. **De EVMS-gevalideerde kern van een prime.** Systeemwijzigingen vereisen voorafgaande CFA-goedkeuring ([DFARS 252.234-7002](https://www.acquisition.gov/dfars/252.234-7002-earned-value-management-system.)). Niemand zet zijn gevalideerde systeem op het spel voor gratis software.
2. **De IPMDAR native-schedule-file-eis.** Zolang de overheid het originele bestand wil kunnen openen, is een niet-mainstream formaat een blokkade — tenzij het pakket P6-XML/XER kan schrijven.
3. **Support-SLA's.** UFGS §2.1.2 eist software "commercially available from the software vendor for purchase **with vendor software support agreements available**" ([UFGS](https://www.wbdg.org/ffc/dod/unified-facilities-guide-specifications-ufgs)). Pure community-support voldoet niet aan de letter van de specificatie; er moet een commercieel supportaanbod naast staan.
4. **Monte Carlo op enterprise-schaal.** Safran claimt 97% snellere simulatie en SQL-ondersteuning voor resource-geladen schema's ([safran.com](https://safran.com/)); Acumen claimt duizenden simulaties in seconden ([Acumen](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)). Dat is jaren werk om te evenaren.

### 7.3 De strategische samenvatting van de opening

De aantrekkelijke route in deze sector is **niet** "vervang Primavera bij Lockheed", maar:

1. **Instappen via MILCON/defensiebouw** (UFGS-conform: SDEF-export, de acht verplichte planningsinstellingen, `.xer`-import), waar de "Other Than Primavera"-clausule expliciet ruimte biedt en de licentiecomponent van de toegangsdrempel voor open source nul is.
2. **Gratis schemakwaliteitstoetsing** (DCMA 14-point + GAO-10) als instapfunctie voor de honderden tier-2/tier-3-leveranciers die conformiteit moeten leveren maar USD 11.000/seat niet kunnen betalen.
3. **Baselines als eersteklas, onveranderlijke, diff-bare objecten** — het enige echte functionele gat dat de commerciële markt slecht bedient.
4. **Soevereiniteit/air-gap als Europees verkoopargument**, met de £439-vs-£220 overheidsopslag als bewijsstuk.

---

## 8. Bronnenlijst

### Standaarden, regelgeving en overheidsdocumenten
1. DFARS 252.234-7002 Earned Value Management System — https://www.acquisition.gov/dfars/252.234-7002-earned-value-management-system.
2. DFARS 234.201 Policy (EVMS-drempels) — https://www.acquisition.gov/dfars/234.201-policy.
3. GAO-16-89G, *Schedule Assessment Guide: Best Practices for Project Schedules*, december 2015 — https://www.gao.gov/products/gao-16-89g
4. GAO-25-107569, *Weapon Systems Annual Assessment* (23e editie), 11 juni 2025 — https://www.gao.gov/products/gao-25-107569
5. GAO-24-106909, F-35-programmarapport — https://www.gao.gov/products/gao-24-106909
6. UFGS 01 32 01.00 10 *Project Schedule* (USACE/NAVFAC/AFCEC), augustus 2023, Change 1 08/24 — https://www.wbdg.org/ffc/dod/unified-facilities-guide-specifications-ufgs
7. UFGS 01 32 01 *Project Schedule* (oudere editie, USACE/NAVFAC/AFCEC/NASA, 2008/2014, Jacksonville District Master CESAJ) — zelfde bron
8. Wikipedia, *Earned value management* (C/SCSC, EIA-748, internationale adoptie) — https://en.wikipedia.org/wiki/Earned_value_management

### Prijs- en aanbestedingsbronnen
9. **USAspending.gov API**, endpoint `/api/v2/search/spending_by_award/`, bevraagd 25-07-2026 — https://api.usaspending.gov/ (alle federale opdrachtbedragen in dit rapport)
10. Oracle Construction & Engineering Global Price List, Software Investment Guide, 10-11-2016 (Texas DIR — Oracle DIR-TSO-2539) *(documentidentiteit geverifieerd; directe URL niet herverifieerbaar in deze sessie)*
11. Oracle Technology Global Price List, 01-06-2026 — https://www.oracle.com/assets/technology-price-list-070617.pdf
12. Oracle prijslijst-index (bevat géén Construction & Engineering-lijst) — https://www.oracle.com/us/corporate/pricing/price-lists/index.html
13. *Oracle Primavera Pricing – G-Cloud 14*, doc. BD.G14.OCS.002, v1.0 (2024) en v1.1 (mei 2025), Oracle Construction & Engineering GBU
14. *Oracle Primavera – Pricing document*, th3rdcurve Ltd, ingangsdatum 30-04-2024
15. *Oracle Primavera Cloud Service RPC Pricing Document*, RPC UK Ltd, mei 2024
16. *Oracle Primavera Cloud Services – Service Descriptions & Metrics*, Oracle C&E GBU
17. UK Digital Marketplace, G-Cloud 14, zoekresultaten "primavera" (87 diensten) — https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/search?q=primavera
18. UK Digital Marketplace, Primavera P6 EPPM (Hyde Park Solutions, £168,75 p.u.p.m.) — https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/555484208241614
19. UK Digital Marketplace, Primavera P6 Scheduling (i3Works, £385–£1.210/dag) — https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/536755182720277
20. SFIA Rate Card, Hyde Park Solutions, G-Cloud 14, 22-04-2024 — https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/702001/555484208241614-sfia-rate-card-2024-05-01-1345.pdf
21. Microsoft Project prijsvergelijking — https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software

### Leveranciers
22. Deltek Open Plan — https://www.deltek.com/en/products/project-and-portfolio-management/open-plan
23. Deltek Cobra — https://www.deltek.com/en/products/project-and-portfolio-management/cobra
24. Deltek Acumen — https://www.deltek.com/en/products/project-and-portfolio-management/acumen
25. Deltek Project & Portfolio Management (overzicht) — https://www.deltek.com/en/products/project-and-portfolio-management
26. Deltek Aerospace & Defense — https://www.deltek.com/en/aerospace-and-defense
27. Deltek About — https://www.deltek.com/en/about
28. Wikipedia, *Deltek* (Thoma Bravo USD 1,1 mrd 2012; Roper USD 2,8 mrd 2016) — https://en.wikipedia.org/wiki/Deltek
29. Steelray — https://www.steelray.com/
30. Safran Software Solutions — https://safran.com/
31. ProjStream — https://www.projstream.com/
32. forProject Technology — https://www.forproject.com/
33. Ten Six Consulting, DCMA-resourcecheck — https://www.tensix.com/dcma-14-point-assessment/

### Marktonderzoek en sectoranalyse
34. Mordor Intelligence, *Project Portfolio Management Market* — https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market
35. Verified Market Reports, *Earned Value Management Software Market* — https://www.verifiedmarketreports.com/product/earned-value-management-software-market/
36. Deloitte, *2026 Aerospace and Defense Industry Outlook* — https://www.deloitte.com/us/en/insights/industry/aerospace-defense/aerospace-and-defense-industry-outlook.html
37. Wikipedia, *Arms industry* (grootste wapenproducenten 2024) — https://en.wikipedia.org/wiki/Arms_industry
38. Wikipedia, *List of countries by military expenditures* (SIPRI 2025) — https://en.wikipedia.org/wiki/List_of_countries_by_military_expenditures

### Niet-bereikbare bronnen (transparantie)
De volgende bronnen zijn geprobeerd maar blokkeerden geautomatiseerde toegang; waar hun inhoud is gebruikt, is dat expliciet als niet-primair-geverifieerd gemarkeerd:
`dcma.mil` (DCMA 14-point brondocument, 404), `acq.osd.mil` (IPMDAR DID, 503), `dau.edu` (hostredirect), `ndia.org` (PASEG/EVMS Intent Guide, leeg), `bls.gov` (OEWS-data, 403), `aia-aerospace.org` (404), `sipri.org` (404), `humphreys-assoc.com` (403), `g2.com` (403), `trustradius.com` (403), `reddit.com` (geblokkeerd), `acqnotes.com` (404), `projectmanagement.com` (403), `web.aacei.org` (RP-nummers niet getoond), `nasa.gov` (Schedule Management Handbook, 404).

---

*Einde rapport. Alle bedragen in USD tenzij anders vermeld. Schattingen zijn in de tekst expliciet gemarkeerd met "(schatting)".*

---

## Verificatie

**Uitgevoerd:** 25 juli 2026, door een onafhankelijke adversariële fact-checker (tweede subagent).
**Methode:** actieve poging tot *weerlegging* van de belangrijkste falsifieerbare beweringen, met primaire bronnen. De UFGS is dit keer als **volledige PDF gedownload, gedecomprimeerd en letterlijk doorzocht** (de oorspronkelijke onderzoeker citeerde uit de WBDG-landingspagina). De USAspending-cijfers zijn **opnieuw bevraagd via de live API**, inclusief looptijden en awarding agency — velden die het oorspronkelijke rapport niet uitvroeg en waarop twee rekenfouten zijn gevonden. WebSearch was in deze sessie niet beschikbaar (quotum op); alleen gerichte WebFetch + API.

**Samenvattend oordeel:** de **feitelijke, citeerbare** kern van dit rapport (regelgeving, contractclausules, standaarden, individuele opdrachtbedragen, leverancierclaims) is opvallend solide — vrijwel alles wat woordelijk uit een bron komt, is bevestigd, soms letterlijk. De **doorgerekende marktraming** is dat niet: daar zitten twee harde rekenfouten, één verouderde wisselkoers, één interne tegenspraak tussen de kruiscontroles, en één ratio die niet uit de gepresenteerde data volgt. Netto is de geclaimde segmentomvang **te hoog en te smal gepresenteerd**.

### V1 — GAO-25-107569: 106 MDAPs, bijna USD 2,4 biljoen, IOC-doorlooptijd +18 maanden tot bijna 12 jaar
**Oordeel: bevestigd (letterlijk).** GAO: *"DOD plans to invest nearly $2.4 trillion to develop and acquire its costliest weapon programs"*; 106 programma's beoordeeld; *"the expected time for MDAPs to provide even an initial capability increased this year by 18 months, up to almost 12 years from the program's start."*
Bron: https://www.gao.gov/products/gao-25-107569

### V2 — DFARS-drempels (USD 20 mln / USD 50 mln), FFP-ontmoediging + waiver, IBR 180 dagen, 30/45 dagen, betalingsinhouding
**Oordeel: bevestigd, met één precisering.** DFARS 234.201 bevestigt letterlijk ≥USD 20 mln (ANSI/EIA-748-conform), ≥USD 50 mln (formeel conform verklaard door het cognizant Federal agency), en voor FFP *"The application of earned value management is discouraged"* met waiverprocedure via PGI 234.201(1)(iv). DFARS 252.234-7002 bevestigt IBR *"not later than 180 calendar days after"*, 30 dagen reactietijd op de initiële determinatie en 45 dagen voor correctie/CAP.
**Precisering (gecorrigeerd in §3.6):** de betalingsinhouding is **voorwaardelijk** op opname van clausule 252.242-7005 (Contractor Business Systems) in het contract. Het rapport presenteerde dit onvoorwaardelijk in §0.1 en §3.6.
Bronnen: https://www.acquisition.gov/dfars/234.201-policy. · https://www.acquisition.gov/dfars/252.234-7002-earned-value-management-system.

### V3 — Alle UFGS 01 32 01.00 10-claims (P6-default, "Other Than Primavera", SDEF, float-eigendom, verplichte P6-instellingen, plannerkwalificatie, RMS/betaling)
**Oordeel: bevestigd, letterlijk, alle acht deelclaims.** Uit de gedecomprimeerde PDF-tekst:
- *"The Government uses Primavera P6."* (§2.1.1) ✔
- §2.1.2.2: *"If the Contractor chooses software other than Primavera P6, that is compliant with this specification, provide for the Government's use **two licenses, two computers, and training for two Government employees**... These computers will be stand-alone and not connected to Government network. Computers and licenses will be returned at project completion."* ✔ — **Gat 3 in §7.1 houdt volledig stand.**
- §3.3.7: *"Use the activity coding structure defined in the Standard Data Exchange Format (SDEF) in ER 1-1-11. **This exact structure is mandatory.**"* Veldlengtes bevestigd: WRKP 3, RESP 4, AREA 4, MODF 6, BIDI 6, PHAS 2, CATW 1, FOW 20. ✔
- §3.10: *"float available in the schedule, at any time, belongs to the Project and is available for Contractor and Government use."* ✔ En §3.3.8: *"The use of artificial float constraints such as 'zero free float' or 'zero total float' are prohibited. Mandatory constraints that ignore or affect network logic are prohibited."* ✔
- §3.12: alle acht verplichte P6-instellingen bevestigd, inclusief *"8.0 hr/day, 40 hr/week, 172 hr/month, 2000 hr/year"*, *"Longest Path"*, *"Retained Logic"*, *"Fixed Duration & Units"*, *"Physical"*. **Aanvulling die in het rapport ontbreekt:** de lijst heeft méér dan acht punten — ook *"Activity ID's must not exceed 10 characters"*, *"Activity Names must have a verb-noun structure"*, en bij de lump-sum-resource: *"Price/Unit must be $1/hr, Default Units/Time must be '8h/d'"* met *"Auto Compute Actuals"* en *"Calculate costs from units"* **uitgevinkt**. Voor een toolbouwer is dat relevanter detail dan het rapport gaf. ✔
- §1.3: *"must have prepared and maintained at least three previous construction schedules... using Primavera P6"* ✔
- §3.11: *"The receipt of a proper payment request... is contingent upon the Government receiving both acceptable and approvable hard copies and matching electronic v[ersions]"* + upload naar RMS ✔ — "geen goedgekeurd schema = geen betaling" klopt.
**Eén nuancering:** de vaak geciteerde zin *"Use of proprietary systems will not be specified"* staat in een **NOTE aan de specificatieschrijver** (de ontwerpaanwijzing bij §1.1), niet in de contractuele eistekst. Hij ondersteunt Gat 2 nog steeds, maar is *guidance*, geen clausule.
Bron (primair, PDF): https://www.wbdg.org/FFC/DOD/UFGS/UFGS%2001%2032%2001.00%2010.pdf

### V4 — Bottom-up rekenketen (106 × 150 seats → 5–8× → seatprijs → licentiemarkt)
**Oordeel: GECORRIGEERD — rekenfout gevonden in stap 3.**
Nagerekend en **correct**: 106 × 150 = 15.900 ≈ 16.000 ✔; × 5–8 = 79.500–127.200 ≈ 80.000–130.000 ✔; 80.000 × 2.500 = USD 200 mln ✔; 130.000 × 4.000 = USD 520 mln ✔; 55.244 ÷ 5 = 11.048,8 ✔; 240.392 ÷ 12.000 = 20,03 ✔; 187.371 ÷ 5 = 37.474 ✔; NASA-escalatiereeks ×1,0700 per stap, +31,1% cumulatief ✔; 0,8 ÷ 1,08 = 0,74 ✔ (maar verkeerde koers, zie V7).
**Fout:** stap 3 gebruikt "Cobra ~USD 8.000–17.600 **per jaar**". De onderliggende opdracht (USAspending, "FIVE (5) DELTEK COBRA AND THREE (3) ACUMEN FUSE LICENSES WITH ANNUAL MAINTENANCE", USD 140.896,38) loopt **2022-09-26 → 2026-08-07**, dus ~3,9 jaar. Dat is USD 17.612 per seat **over de looptijd** — het rapport zegt dat zelf in de tabel in §3.3 en in §6.1, en converteert het in §4.2 stap 3 ten onrechte naar een jaarprijs. Per jaar: **≈ USD 4.500/seat**. Onafhankelijk bevestigd in dezelfde dataset: *"DELTEK COBRA, 15 USERS ... MAINTENANCE 09/29/2016-09/28/2017"* = USD 15.910,80 → **≈ USD 1.061/seat/jaar**; DOE PPPO-Cobra-verlengingen USD 13.404/jaar.
**Doorwerking:** de gemengde seatprijs zakt van USD 2.500–4.000 naar naar schatting USD 1.000–2.500, en de bottom-up licentiemarkt van USD 0,20–0,52 mrd naar **USD 0,08–0,33 mrd**. Verwerkt in §4.2.
Bron: https://api.usaspending.gov/api/v2/search/spending_by_award/ (herbevraagd 25-07-2026)

### V5 — "Beide top-down routes convergeren op dezelfde bandbreedte" → segmentomvang USD 0,6–1,0 mrd
**Oordeel: GECORRIGEERD — dit is geen convergentie maar een tegenspraak.**
De rekensommen kloppen (2,5 × 0,25–0,35 = 0,625–0,875; 7,69 × 0,08–0,12 = 0,615–0,923), maar:
1. De EVM-softwaremarkt is grotendeels een **deelverzameling** van de PPM-markt — dezelfde omzet wordt tweemaal gemeten. Geen onafhankelijke kruiscontrole.
2. Route 1 zegt "A&D geeft USD 0,6–0,9 mrd uit aan **alleen EVM**"; route 2 zegt "A&D/overheid = USD 0,6–0,9 mrd van de **hele PPM-markt inclusief scheduling**". Beide waar ⇒ pure scheduling in A&D ≈ **0**, wat het rapport zelf tegenspreekt met "USD 0,25–0,45 mrd puur scheduling".
3. De EVM-bron is **intern inconsistent**: USD 2,5 mrd (2026) → USD 4,2 mrd (2033) impliceert 7,7% CAGR, niet de gestelde 8,2% (nagerekend). Verified Market Reports publiceert geen methodologie.
4. **Plausibiliteitstoets:** USD 2,5 mrd EVM-software = 33% van de gehele wereldwijde PPM-markt (USD 7,69 mrd, Mordor). Voor een niche die door een handvol leveranciers (Deltek, forProject, ProjStream, Encore, MPM) wordt bediend, terwijl de PPM-markt óók Microsoft, Planview, Smartsheet, ServiceNow, Planisware, Asana en Oracle omvat, is dat niet geloofwaardig.
**Gevolg:** segmentomvang verruimd naar **USD 0,1–1,0 mrd**; de deelclaim "USD 0,25–0,45 mrd puur scheduling" gemarkeerd als **onzeker/niet-afgeleid**. Verwerkt in §0.6 en §4.2.
Bronnen (beide bevestigd als *geciteerd*, niet als *juist*): https://www.mordorintelligence.com/industry-reports/project-portfolio-management-market (USD 6,90 mrd 2025 → 7,69 mrd 2026 → 13,21 mrd 2031, 11,43% CAGR — intern **wél** consistent) · https://www.verifiedmarketreports.com/product/earned-value-management-software-market/

### V6 — Dienstenmultiple 1 : 0,5–1 : 2–5 en de "planningseconomie USD 3–5 mrd"
**Oordeel: GECORRIGEERD (rekenfout) + methodologisch onhoudbaar.**
Rekenkundig: de multiple 1 : 0,5–1 : 2–5 geeft totaal **3,5–7×** de licentie, niet "1 : 2–5". Op USD 0,6–1,0 mrd geeft dat **USD 2,1–7,0 mrd**, niet USD 3–5 mrd. Bovendien is §0.5's "3–10×" niet consistent met §3.5's "2,5–6×".
Methodologisch ernstiger — de ratio zelf volgt niet uit de data:
- De opdrachtbedragen zijn **exact bevestigd**: Booz Allen USD **12.435.774,90** ("EARNED VALUE MANAGEMENT SUPPORT TO ACQUISITION ENABLERS", DoD/Washington Headquarters Services, 2020-06-12 → 2024-12-11) en USD **6.103.747,74** ("INTEGRATED MASTER SCHEDULE SUPPORT SERVICES FOR PEO CS&CSS", DoD/Army, 2022-08-31 → 2026-09-02); grootste directe Deltek-softwareopdracht USD **1.826.059,85** (DoD, 2018-09-20, "SOFTWARE"). ✔
- **Maar een ratio afleiden uit "grootste dienstenopdracht ÷ grootste softwareopdracht" is geen ratio, het is een anekdote.** Beide zijn maxima van ongerelateerde inkooptrajecten met verschillende looptijden (4,5 jaar vs. eenmalig).
- **Zelftegenspraak:** §3.3 stelt zelf dat de federale software-uitgaven een ondergrens zijn *"met een factor van waarschijnlijk 10–50×"* ten opzichte van de werkelijke exposure. Als dat waar is, is de teller (licenties) systematisch 10–50× ondergeteld terwijl de noemer (diensten) dat niet is — waardoor de afgeleide ratio met dezelfde factor te hoog uitvalt. De ratio kan niet tegelijk met die caveat waar zijn.
- Ter illustratie hoe scheef de max-vs-max-methode is: dezelfde dataset bevat dienstenopdrachten van USD 368,9 mln (INUTEQ, NASA GSFC), USD 68,6 mln (Booz Allen, DCMA) en USD 52,4 mln (ACT1 Federal, F-35 JPO cost/EVM/financial management) — een factor 5–30 boven de in het rapport gekozen voorbeelden.
**Oordeel op de ratio: onzeker.** De *richting* (diensten ≫ licenties in A&D) is onomstreden en blijft staan; het *getal* is niet onderbouwd.
Bron: https://api.usaspending.gov/api/v2/search/spending_by_award/

### V7 — Wisselkoers EUR/USD 1,08
**Oordeel: GECORRIGEERD.** De ECB-referentiekoers is **1,1383 op 1 juli 2026** (bandbreedte 1,1340–1,1797 over april–juli 2026). USD 0,8 mrd = **EUR 0,70 mrd**, niet EUR 0,74 mrd. Verwerkt in §4.2.
Bron: https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html

### V8 — Prijzen: Acumen USD 11.049/seat/jaar, MS Project USD 679,99/1.129,99, Deltek-federale aggregatie
**Oordeel: bevestigd, met belangrijke nuancering bij Acumen.**
- Acumen: USD **55.243,80** voor *"DELTEK ACUMEN FUSE RISK SOFTWARE LICENSES (5)"*, looptijd **2025-02-06 → 2026-02-05** — precies één jaar, dus USD 11.048,76/seat/jaar klopt. ✔ **Maar het is de duurste waarneming in de set.** Dezelfde dataset: NASA *"ACUMEN FUSE ENTERPRISE LICENSE MODEL FOR 12.000 EMPLOYEES PLUS MAINTENANCE"* = USD 240.391,75 → **≈ USD 20 per medewerker**, een factor **~550** verschil per hoofd. Het rapport gebruikt USD 11.049 op zes plaatsen als "de" prijs. **Gecorrigeerd naar: geldig voor kleine afnemers (3–5 seats), niet sectorbreed** — de kernargumentatie van Gat 1 (tier-2/tier-3) blijft daarmee overeind, die van §3.6.2 ("licentiekosten zijn ruis") wordt juist sterker.
- Microsoft Project Standard 2024 **$679.99 one-time** en Professional 2024 **$1,129.99 one-time**: letterlijk bevestigd op de Microsoft-pagina. ✔
- Deltek-aggregatie: het rapport claimt "USD 12.418.733 over 203 opdrachten, 2015–2026". Eigen herbevraging op recipient `DELTEK INC.`, kalendervenster 2015-01-01 → 2026-12-31, award types A–D: **225 opdrachten, USD 13.169.392**. Verschil verklaarbaar uit een ander venster (fiscaal vs. kalenderjaar). **Orde van grootte bevestigd; exacte cijfers licht afwijkend — behandel als ±10%.** De grootste opdracht (USD 1.826.059,85) is exact bevestigd. ✔
Bronnen: https://api.usaspending.gov/api/v2/search/spending_by_award/ · https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software

### V9 — "+7,0% per jaar prijsinflatie" als sectorbrede driver
**Oordeel: GECORRIGEERD (overgeneralisatie).** De NASA-reeksen kloppen exact — Acumen Fuse 42.078 → 45.024 → 48.176 → 51.548 → 55.156 (elke stap precies ×1,0700, +31,1% cumulatief) en Cobra 44.707 → 47.836 (×1,0700); de FY26-Acumen-verlenging is bevestigd als NASA-opdracht aan Deltek Inc. (2026-08-23 → 2027-08-22). **Maar dezelfde leverancier laat elders ~3%/jaar zien:** wInsight jaarlijks onderhoud USD 285.371,28 (FY23) → USD 312.368,48 (FY26) = **+3,1%/jaar**. De +7,0% is een contractspecifieke escalatieclausule op twee NASA-verlengingen, geen sectorbreed prijszettingsvermogen. Groeiraming verruimd naar ~5–12%. Verwerkt in §4.3.
Bron: https://api.usaspending.gov/api/v2/search/spending_by_award/

### V10 — Deltek-marktleiderschapsclaims en de Open Plan-krimpanalyse
**Oordeel: bevestigd (als leverancierclaim) resp. bevestigd (als data).**
- *"9 of the top 10 DoD contractors rely on Cobra for Earned Value Management"* staat letterlijk op de Deltek-productpagina, evenals de IPMDAR (CPD/SPD)-, DOE PARS-, DCMA-, CAS- en EIA-748-vermeldingen. Geen prijs op de pagina. Het rapport labelt dit correct als **leverancierclaim**, niet als onafhankelijke meting — dat label is terecht en moet blijven staan.
- Open Plan-krimp: bevestigd in de data. Grootste directe federale Open Plan-opdracht 2015–2026 = USD **91.411,20** (Deltek Inc., NAVAIR depot maintenance, **2015-08-01 → 2018-07-31**, dus ~USD 30k/jaar), daarna USD 3.828–17.503. Tegenover wInsight USD 775.330 / 592.433 / 558.729 / 312.368 en Acumen tot USD 512.999. De conclusie "overheidszijde koopt Open Plan niet" houdt stand. ✔ *(Aanvulling: het rapport noemde wInsight-opdrachten van USD 592.433 (2014) en USD 558.729 (2017) niet — de wInsight-voetafdruk is nog groter dan gepresenteerd.)*
Bronnen: https://www.deltek.com/en/products/project-and-portfolio-management/cobra · https://api.usaspending.gov/api/v2/search/spending_by_award/

### V11 — SIPRI-cijfers, F-35-cijfers, Deltek-overnames
**Oordeel: bevestigd.**
- Militaire uitgaven 2025: VS **USD 954,0 mrd = 33,0%**; China USD 336 mrd (12,0%); Rusland USD 190 mrd (6,6%); **Duitsland vierde met USD 114,0 mrd (3,9%)**; India USD 92,1 mrd. Het afgeleide wereldtotaal ≈ USD 2,89 biljoen is consistent met alle vijf de aandelen (2,80–2,92 biljoen). ✔
- F-35: *"development efforts—as well as the costs to maintain and operate the **2,470 planned aircraft through 2088**—will exceed **$2 trillion**"*; TR-3 = *"a **$1.8-billion** suite of hardware and software upgrades"*; in kalenderjaar 2023 **100%** van de P&W-motoren en **91%** van de Lockheed-toestellen te laat geleverd. Alle vier letterlijk bevestigd. ✔
- Deltek: Thoma Bravo **USD 1,1 mrd (2012)**, Roper Technologies **USD 2,8 mrd (2016)**, opgericht **1983**. ✔ *Onzeker:* het rapport noemt "~4.200 medewerkers" (deltek.com); Wikipedia geeft **3.686**. Klein verschil, leverancierbron vs. secundaire bron — markeer als onzeker.
Bronnen: https://en.wikipedia.org/wiki/List_of_countries_by_military_expenditures · https://www.gao.gov/products/gao-24-106909 · https://en.wikipedia.org/wiki/Deltek

### V12 — Blijvend onzeker (niet weerlegd, maar ook niet te verifiëren)
- **Oracle C&E Global Price List 2016** (Primavera EVM USD 10.000/user, P6 EPPM USD 2.750, PRA USD 9.500, 22% support). Het document is in deze sessie niet opnieuw op te halen; de Oracle-prijslijstindex bevat inderdaad geen C&E-lijst. **Onzeker — behandel als indicatief historisch anker, niet als actuele prijs.**
- **G-Cloud-prijzen uit PDF-documenten** (£220 vs. £439 p.u.p.m. overheidsvariant, £950/jaar OPC Schedule, £39.332/jaar extra non-production environment). Niet herverifieerd; de £168,75-dienst van Hyde Park Solutions heeft wel een resolveerbare URL. **Onzeker voor de PDF-afgeleide regels.** Het £439-vs-£220-argument (Gat 4) rust volledig op één niet-herverifieerbaar document — belangrijk, want dat is een van de vier strategische pijlers in §7.3.
- **DCMA 14-point drempelwaarden** (≤5%, ≥90% FS, 44 dagen, CPLI/BEI ≥0,95). Het canonieke DCMA-document blijft onbereikbaar. Het rapport markeert dit zelf correct als indicatief. **Onzeker — laat de markering staan.**
- **IPMDAR-driedeling CPD/SPD/native schedule file.** CPD en SPD zijn bevestigd via Deltek; het "native schedule file"-onderdeel is **alleen via leverancier- en secundaire bronnen** — en dit is precies de claim waarop §7.2 punt 2 ("de sterkste structurele barrière voor elk niet-mainstream planningspakket") rust. **Onzeker; verdient primaire verificatie van DI-MGMT-81861C voordat er strategie op wordt gebouwd.**
- **"Eén IMS telt routinematig >100.000 activiteiten"** en **"EVMS-validatietraject kost USD 0,5–3 mln"**: beide door het rapport als schatting gemarkeerd, geen bron gevonden. **Onzeker.**
- **A-12 Avenger II-annulering (1991) op basis van EVM-signalen**: alleen via Wikipedia. Het *feit* van de annulering is onomstreden; de causale rol van EVM is een interpretatie. **Onzeker.**

### Wat na verificatie ONVERANDERD sterk blijft
De strategische kern van §7 is **niet** geraakt door de correcties, want die rust op contractteksten (nu primair geverifieerd) en niet op de marktraming:
- Gat 2 (SDEF als open, volledig gespecificeerd formaat) — **letterlijk bevestigd, inclusief alle acht veldlengtes.**
- Gat 3 (de "Other Than Primavera"-clausule; twee licenties + twee computers + training voor twee ambtenaren) — **letterlijk bevestigd; blijft het sterkste juridisch onderbouwde argument in het rapport.**
- De acht (in werkelijkheid elf) verplichte P6-instellingen als gratis conformiteitschecklist — **letterlijk bevestigd en zelfs uitgebreider dan gerapporteerd.**
- De supportbarrière (§7.2 punt 3) — bevestigd, en **sterker dan gerapporteerd**: UFGS eist niet alleen *"vendor software support agreements available"*, maar ook dat *"the software routine used to create the required sdef file must be created and supported by the software manufacturer."*
- Gat 1 (tier-2/tier-3 kan Acumen niet betalen) — blijft geldig, mits de USD 11.049/seat expliciet als *kleine-afnemersprijs* wordt gepositioneerd.
