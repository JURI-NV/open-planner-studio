# Sectorrapport: Planningssoftware in Energie, Nutsbedrijven en Nucleair

**Onderzoeksdatum:** 25 juli 2026
**Onderzoeker:** marktonderzoek-subagent (Open Planner Studio marktonderzoek)
**Status:** definitief conceptrapport

---

## 0. Methodologische verantwoording en betrouwbaarheidsmarkering

Dit rapport is opgesteld op basis van webonderzoek via directe documentophaling (WebFetch) op leveranciersites, overheidsdocumenten, nationale laboratoria (Idaho National Laboratory / DOE), normeringsinstanties, brancheorganisaties, analistenrapporten en vakpers, aangevuld met zoekmachine-resultaatpagina's.

**Belangrijke beperking:** het zoekbudget van de sessie (200 WebSearch-aanroepen) was al uitgeput voordat dit onderzoek startte. Al het onderzoek is daarom uitgevoerd via WebFetch, deels rechtstreeks op bekende bron-URL's en deels via HTML-zoekpagina's (`html.duckduckgo.com`, `lite.duckduckgo.com`) als zoekvervanger. Dat is functioneel gelijkwaardig maar iets minder breed dan een volledige WebSearch-run; enkele bronnen (IEA-website, Arcadis-PDF, Oracle-prijslijst-PDF, AACE-ledenzone) gaven 403/404/402 terug en zijn via secundaire bronnen gedekt. Waar dat het geval is, staat het er expliciet bij.

**Betrouwbaarheidscodering die in dit rapport wordt gebruikt:**

| Code | Betekenis |
|---|---|
| **[A]** | Primaire bron: overheid, nationaal lab, normeringsinstantie, leverancier over eigen product, brancheorganisatie |
| **[B]** | Gerenommeerde secundaire bron: analistenbureau, vakpers, gespecialiseerde consultant |
| **[C]** | Commerciële prijsvergelijker / SEO-site / afgeleide data — richtinggevend, niet als hard cijfer te gebruiken |
| **[S]** | **Eigen schatting** van de onderzoeker, met expliciete redenering |

Elk kwantitatief cijfer in dit rapport heeft een bron-URL bij zich. Alles wat een schatting is, staat gemarkeerd als **[SCHATTING]**.

---

## 1. Managementsamenvatting

De sector energie, nutsbedrijven en nucleair is — samen met defensie en olie & gas — het segment met de **hoogste betalingsbereidheid per planner ter wereld**, en tegelijk het segment met de **meest verstarde softwarekeuze**. De reden is in één cijfer samen te vatten: een stilstaande kerncentrale kost circa **1,2 miljoen dollar per dag aan gederfde inkomsten** ([INL/RPT-24-80380, DOE LWRS, sept. 2024](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A]. Tegen die achtergrond is een licentie van 4.000 dollar per planner een rondingsfout.

De kernbevindingen:

1. **Oracle Primavera P6 is de facto monopolist in het planningsdeel.** Het Amerikaanse ministerie van Energie noemt Primavera P6 expliciet in zijn lijst van EVM-softwaretools ([DOE Office of Project Management](https://www.energy.gov/projectmanagement/earned-value-management-evm-software-tools)) [A]; het DOE-laboratorium INL constateert onomwonden dat het buiten de scope van zijn eigen optimalisatieproject valt om planningstools te bouwen "as plant owners already rely on tools such as Primavera P6" ([INL/RPT-24-80380, §3](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A]; en Amerikaanse federale bouwspecificaties (UFGS 01 32 01.00 10 / USACE) schrijven P6 en het XER-formaat contractueel voor [B].

2. **De sector is gelaagd, niet monolithisch.** Nucleaire outages, nucleaire nieuwbouw, nucleaire ontmanteling, netverzwaring (T&D), thermische opwek en wind/zon hebben elk een eigen planningsprofiel en een eigen softwarestack. Wat ze delen: CPM als rekenkern, P6 als lingua franca en zware audit-/EVMS-eisen.

3. **De omzet zit niet in de scheduler, maar in de laag eromheen.** EAM/werkbeheer (Asset Suite, Maximo, SAP), kosten/EVM (Cobra, EcoSys, Contruent), schedule-kwaliteit (Acumen Fuse, Touchstone), risico (Safran Risk), turnaround-orkestratie (Prometheus STO) en integratie/consultancy vormen samen een veelvoud van de scheduler-licentie zelf.

4. **Segmentomvang [SCHATTING]:** circa **1,25–1,75 miljard USD per jaar (2025)** aan software plus direct gerelateerde implementatie/support voor planning en projectbeheersing in energie, nutsbedrijven en nucleair wereldwijd; groei circa 8–12% per jaar, gedreven door netinvesteringen (>400 mld USD/jaar) en de nucleaire heropleving (79 reactoren in aanbouw). Volledige redenering in §5.

5. **De opening voor een open-source, IFC-gebaseerde planner** ligt niet in het verdringen van P6 op de kritieke keten van een kernreactor, maar in de **lange staart**: onderaannemers, ingenieursbureaus, netbeheerder-districten, windpark-EPC's, ontmantelingswerkpakketten en toeleveranciers die vandaag een P6-XER moeten aanleveren zonder een P6-licentie te willen betalen — plus 4D/objectkoppeling, die in P6 structureel zwak is.

---

## 2. Sectorafbakening: vijf verschillende planningswerelden onder één vlag

Het is een fout om "energie" als één markt te behandelen. Voor planningssoftware zijn er minimaal vijf duidelijk te scheiden deelmarkten, met elk een eigen koopgedrag.

### 2.1 Nucleaire bedrijfsvoering en refuelling outages

Dit is het meest extreme planningsdomein ter wereld op het punt van **dichtheid**.

| Parameter | Waarde | Bron |
|---|---|---|
| Activiteiten per refuelling outage | **10.000–18.000** | [INL/RPT-24-80380, §1](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf) [A] |
| Typische outageduur (VS) | **2–3 weken** (langer bij backfitting/modernisering, bv. stoomgeneratorvervanging) | [INL/RPT-24-80380, §1](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf) [A] |
| Alternatieve opgave (ANS-artikel over hetzelfde project) | **3–4 weken**, "tens of thousands of activities" | [American Nuclear Society, artikel 7402](https://www.ans.org/news/article-7402/optimizing-nuclear-plant-outages-data-analytics-tools-and-methods-for-enhancing-resilience-and-efficiency/) [A] |
| Kosten van stilstand | **≈ 1,2 mln USD/dag** gederfde omzet (INL); ">1 mln USD/dag" incl. contractorloon (ANS) | [INL](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf) / [ANS](https://www.ans.org/news/article-7402/optimizing-nuclear-plant-outages-data-analytics-tools-and-methods-for-enhancing-resilience-and-efficiency/) [A] |
| Outagefrequentie | elke **18 maanden** (PWR) of **24 maanden** (BWR) | [INL/RPT-24-80380, §2](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf) [A] |
| Planningshorizon | begint **1–2 jaar** vóór de outage | [INL/RPT-24-80380, §3.1](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf) [A] |
| Uitvoerende ploegen | grote aantallen ingehuurde contractors (elektriciens, monteurs), gecontracteerd in de planningsfase | [INL/RPT-24-80380, §1](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf) [A] |
| Topkwartiel-prestatie | refuelling outages **onder 25 dagen** | vakpers-synthese via zoekresultaten [C] |

Het INL-rapport documenteert bovendien een belangrijk empirisch gegeven over hoe slecht deze planningen standhouden: in het geanalyseerde (geanonimiseerde) praktijkgeval werden **circa 300 activiteiten uitgevoerd ná de geplande einddatum** van de outage ([INL/RPT-24-80380, §5](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A]. "Emergent work" — nieuw werk dat pas tijdens de outage ontstaat via issue reports (IR's) en werkorders (WO's) — is de norm, niet de uitzondering.

De activiteitendata die een nucleaire outageplanner minimaal nodig heeft, zijn volgens INL: **duur, benodigde resources (elektrisch, mechanisch, steigerbouw) en afhankelijkheden** — waarbij de afhankelijkheden "zeer heterogeen" zijn: systeemlogisch, aangedreven door technische specificaties (tech specs), aangedreven door het plant-risicomodel (PRA), of afhankelijk van de fysieke installatietoestand ([INL/RPT-24-80380, Tabel 2](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A]. **Dit is het kernpunt waarom generieke planners hier stuklopen:** een afhankelijkheid is niet alleen "A voor B", maar kan een vergunningsvoorwaarde of een risicodrempel zijn.

Werkcategoriecodes die in nucleaire planningen worden gebruikt (WCAT), zoals gedocumenteerd door INL uit een echte P6-implementatie: PM (preventief onderhoud), CM (correctief), MM (klein onderhoud), FO (facility operations), PO (projecten), RU (routine), CO (constructie), OU (outage), SH (shipments) ([INL/RPT-24-80380, Tabel 4](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A].

**Wereldwijde schaal:** 440 operabele reactoren in 31 landen, samen 403.265 MWe, plus 79 in aanbouw ([World Nuclear Association, bijgewerkt 20 juli 2026](https://world-nuclear.org/information-library/current-and-future-generation/nuclear-power-in-the-world-today)) [A].

### 2.2 Nucleaire nieuwbouw (megaprojecten)

Dit is het domein van de spectaculaire overschrijdingen en dus van forensische planningsanalyse.

Hinkley Point C (VK, 2× EPR 1630 MWe):

| Parameter | Waarde | Bron |
|---|---|---|
| Oorspronkelijke raming (2016) | **£18 mld** | vakpers-synthese [B] |
| Huidige raming | **£35 mld** (prijspeil 2015) / **≈ £46 mld** in 2024-termen, tot **£49 mld** genoemd | vakpers-synthese [B] |
| Oorspronkelijke opleverdatum | 2025 | vakpers-synthese [B] |
| Huidige verwachting Unit 1 | **2030** (bandbreedte 2029–2031) | vakpers-synthese [B] |
| Vertraging | **≈ 5–6 jaar** | vakpers-synthese [B] |
| Bouwstart Unit 1 / Unit 2 | december 2018 / een jaar later | vakpers-synthese [B] |

*(Deze reeks komt uit een geaggregeerde zoekresultatenpagina die World Nuclear News, EDF-persberichten en Britse vakpers samenvat; de Arcadis- en IEA-primairbronnen gaven 403/404. Behandel als [B], niet als [A].)*

Voor een planningsleverancier is dit het relevante feit: bij projecten van deze omvang zijn planningsdocumenten **juridische bewijsstukken**. Elke revisie van de integrated master schedule (IMS) is potentieel materiaal in een claim van honderden miljoenen. Dat verklaart waarom deze markt eisen stelt aan versiebeheer, auditsporen en reproduceerbaarheid die in de reguliere bouw ongebruikelijk zijn.

### 2.3 Nucleaire ontmanteling en afvalbeheer

Een aparte, zeer grote deelmarkt met eigen inkoopstructuren. In het VK loopt dit via raamovereenkomsten van Sellafield Ltd / de Nuclear Decommissioning Authority:

| Raamovereenkomst | Geraamde waarde | Bron |
|---|---|---|
| **PACE** (Project and Asset Care Execution), inclusief "integrated project controls and project management" | **£2,4 mld** | vakpers/tender-synthese (New Civil Engineer, Find a Tender) [B] |
| **Programme and Project Partners (PPP)** | **£7 mld** totaal; 16 mkb-bedrijven kregen samen £19 mln aan werkpakketten voor o.a. kostenbeheer, commerciële ondersteuning en **project controls** | vakpers/tender-synthese [B] |

In de VS gaat het via DOE-EM-contractors op locaties als Hanford en Savannah River Site. De standaardarchitectuur daar is publiek gedocumenteerd in vacature- en consultancymateriaal: **"Primavera P6 is the authority for activity logic and sequencing and the Integrated Master Schedule (IMS); Deltek Cobra is the authority for time-phased budget dollars, cost element calculus, and EVM reporting"** ([zoekresultaat-synthese van o.a. Brown Federal Services en SMA-consultancy](https://html.duckduckgo.com/html/?q=Hanford+Savannah+River+DOE+contractor+Primavera+P6+Cobra+EVMS+integrated+master+schedule)) [B]. Actieve vacatures voor Senior P6 Scheduler op Savannah River Site vereisen EVMS-kennis, DOE-compliance en Q-clearance-geschiktheid [B].

### 2.4 Netverzwaring: transmissie en distributie

Dit is qua **geldstroom** verreweg het grootste deelsegment, en qua planningskarakter het meest afwijkende.

| Parameter | Waarde | Bron |
|---|---|---|
| Wereldwijde netinvestering 2024 | **390 mld USD** (record) | [IEA World Energy Investment 2025, via persbericht-synthese](https://html.duckduckgo.com/html/?q=IEA+world+energy+investment+2025+grids+380+billion+nuclear+75+billion) [B, IEA-primair gaf 403] |
| Wereldwijde netinvestering 2025 | **> 400 mld USD** (eerste keer boven die grens) | idem [B] |
| Totale energie-investering 2025 | **3,3 biljoen USD** (+2% reëel t.o.v. 2024) | idem [B] |
| Nucleaire investering 2025 | **≈ 75 mld USD** | idem [B] |
| Schone energie totaal 2025 | **≈ 2,2 biljoen USD** vs. ≈ 1,1 biljoen fossiel | idem [B] |
| EU-distributienetinvestering nu | **€33 mld/jaar** | [Eurelectric "Grids for Speed", via synthese](https://html.duckduckgo.com/html/?q=Eurelectric+ENTSO-E+grid+investment+europe+2025+2050+billion+distribution+networks) [B] |
| EU-distributienetinvestering benodigd 2025–2050 | **€67 mld/jaar** (verdubbeling) | idem [B] |
| ENTSO-E-projecten grensoverschrijdend/offshore tot 2050 | **> €800 mld** | idem [B] |
| Leeftijd EU-laagspanningsnet | **> 30%** ouder dan 40 jaar; richting 90% in 2050 zonder ingrijpen | idem [B] |

**Wie zijn de kopers?** 40 TSO's uit 36 landen zijn lid van ENTSO-E ([ENTSO-E ledenpagina](https://www.entsoe.eu/about/inside-entsoe/members/)) [A]; de EU DSO Entity vertegenwoordigt **circa 800–850 distributienetbeheerders** in 27 EU-lidstaten met samen ruim 250 miljoen aansluitingen ([lobbyfacts.eu-registratie van EU DSO Entity, via synthese](https://html.duckduckgo.com/html/?q=number+of+DSOs+in+Europe+2400+distribution+system+operators+EU+DSO+entity)) [B]. In de VS zijn er volgens EIA **ruim 3.200 elektriciteitsbedrijven** in opwek en levering, en bijna 3.000 distributiebedrijven (cijfer 2017) ([EIA-synthese](https://html.duckduckgo.com/html/?q=number+of+electric+utilities+worldwide+EIA+3000+US+utilities+transmission+distribution+companies)) [B].

**Planningskarakter van T&D:** niet één megaplanning met 15.000 activiteiten, maar **duizenden kleine tot middelgrote projecten** (een onderstation, een kabeltracé, een transformatorvervanging) in een meerjarig kapitaalprogramma, met sterke afhankelijkheden van vergunningen, grondverwerving, buitendienststellingsvensters (outage windows op het net zelf) en materiaallevertijden. De praktijk is P6 EPPM als portfolioruggengraat plus een EAM/WAM-systeem. Een gedocumenteerd voorbeeld: het transmissieprogramma van **CenterPoint Energy** met P6-gebaseerde "schedule governance" over meerjarige kapitaalprojecten ([synthese van Think Power Solutions-casus](https://html.duckduckgo.com/html/?q=utility+capital+project+portfolio+management+software+Primavera+P6+transmission+distribution+grid)) [C].

> **Terminologische valkuil — belangrijk voor marktcijfers.** In de nutssector betekent **"Outage Management System" (OMS)** bijna altijd iets heel anders dan nucleaire outageplanning: het is het systeem voor **storingsafhandeling en herstel in het distributienet** (welke klanten zitten zonder stroom, waar staat de ploeg). Marktrapporten die "Outage Management System Software: 2,45 mld USD in 2024, CAGR 16,1%" melden ([Growth Market Reports, via synthese](https://html.duckduckgo.com/html/?q=shutdown+turnaround+outage+management+software+market+size+report)) [C] gaan **niet** over planningssoftware. Dit cijfer is hier expliciet uitgesloten uit de segmentraming. De relevante categorie heet in analistenjargon "Shutdown and Turnaround Optimization Software".

### 2.5 Hernieuwbaar: wind (offshore/onshore), zon, opslag

Planningskarakter: hoge repetitiviteit (honderden identieke turbineposities), maar met **stochastische weersvensters** als dominante onzekerheid, en extreem dure gedeelde resources (installatievaartuigen, kraanschepen, jack-ups). Klassieke deterministische CPM is hier structureel ontoereikend; de sector gebruikt daarom simulatie naast CPM.

Genoemde spelers: **Shoreline Wind** — AI-gedreven simulatie- en optimalisatieplatform waarmee "transport, lifting and marine operations" gesimuleerd worden met echte weers-, bemannings- en assetbeperkingen; klant o.a. TEPCO Renewable Power ([synthese](https://html.duckduckgo.com/html/?q=offshore+wind+farm+installation+scheduling+software+project+controls+P6+Shoreline+Sereno)) [C]. Daarnaast gewoon P6 voor de contractuele projectplanning [C].

---

## 3. Wat maakt planning in deze sector bijzonder

Samengevat in zeven eigenschappen die de softwarekeuze verklaren:

### 3.1 Schaal en dichtheid
10.000–18.000 activiteiten in 2–3 weken kalendertijd ([INL](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A] betekent een activiteitsdichtheid van ruwweg **500–900 activiteiten per dag**. Ter vergelijking: een grote kantoorbouwplanning heeft doorgaans enkele duizenden activiteiten over jaren. Dit stelt harde eisen aan rekenprestaties van de CPM-solver, aan renderen van de Gantt bij tienduizenden balken, en aan filtering/lay-outbeheer.

### 3.2 Doorlooptijden aan beide extremen tegelijk
Nucleaire nieuwbouw: 10–15 jaar (HPC: bouwstart 2018, oplevering 2030) [B]. Outage: 2–3 weken met **uurroosters, niet dagroosters** — INL noteert dat activiteitsduren "typically in hours and minutes" worden vastgelegd ([INL/RPT-24-80380, Tabel 2](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A]. Eén organisatie moet beide aankunnen in één tool.

### 3.3 Resourcecomplexiteit
Ploegen worden per discipline gecontracteerd (elektrisch, mechanisch, steigerbouw, isolatie, straling-beschermend personeel) en zijn **tijdelijk ingehuurd met vaste contractvolumes**. Onder- of overbezetting is direct geld. INL modelleert outagevertraging expliciet als een **resource-toewijzingsprobleem** — "outage delays occur when either (or both) resource types [tijd, ploegen] are insufficient to complete the set of tasks assigned at a specific time instant" ([INL/RPT-24-80380, abstract](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A]. Bovendien: stralingsdosis is een resource. Werk moet worden verdeeld over personen om individuele dosislimieten te respecteren — een beperking die geen enkele generieke planner kent.

### 3.4 Contractuele eisen
- Amerikaanse federale bouwspecificatie **UFGS 01 32 01.00 10** verplicht: "Comply with PRIMAVERA P6 – USACE MANDATORY REQUIREMENTS", inclusief een **.xer-backuptemplate** van de opdrachtgever en de eis dat activity codes **project-level** zijn, niet global of EPS-level ([synthese van USACE-specificatiemateriaal](https://html.duckduckgo.com/html/?q=UFGS+01+32+01.00+10+project+schedule+Primavera+P6+required+software+specification)) [B].
- DOE-projecten boven de drempelwaarden vereisen een gecertificeerd **EVMS conform EIA-748** onder **DOE O 413.3B**, met een geïntegreerde planning conform **DOE G 413.3-24** (Planning and Scheduling Guide) en EVMS-integratie conform **DOE G 413.3-10B** ([DOE Office of Project Management](https://www.energy.gov/projectmanagement/evms-implementation-guidance)) [A].
- Bij nucleaire nieuwbouw en ontmanteling wordt de planning contractueel het instrument voor **vertragingsclaims**; de submissiecadans (maandelijkse update, baseline-revisies, time impact analyses) staat in het contract.

### 3.5 Kosten van vertraging
Dit is het doorslaggevende argument voor de betalingsbereidheid.

| Type vertraging | Kosten | Bron |
|---|---|---|
| Eén dag extra nucleaire outage | **≈ 1,2 mln USD** gederfde inkomsten, exclusief extra contractorkosten | [INL](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf) [A] |
| Idem, inclusief contractorloon | **> 1 mln USD/dag** in totale outagekosten | [ANS](https://www.ans.org/news/article-7402/optimizing-nuclear-plant-outages-data-analytics-tools-and-methods-for-enhancing-resilience-and-efficiency/) [A] |
| Nucleaire nieuwbouw HPC | **≈ £17 mld** meerkosten t.o.v. raming 2016, ≈ 5–6 jaar later | vakpers-synthese [B] |

**[SCHATTING]** Een licentiebudget van 4.000 USD per planner verdient zich terug als het één outagedag per decennium bespaart voor een team van 300 planners. Feitelijk is de terugverdientijd in deze sector *uren*. Dit is de reden dat prijsdruk op de scheduler zelf vrijwel afwezig is — en dat "gratis" als argument hier nauwelijks werkt.

### 3.6 Onzekerheid die het CPM-model breekt
INL somt vier fundamentele kritiekpunten op de klassieke CPM-benadering in nucleaire context op ([INL/RPT-24-80380, §3.1](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A]:
1. Activiteitsduur wordt als **puntwaarde** behandeld, terwijl de werkelijke duur een verdeling is op basis van historische ervaring.
2. Er zijn **meerdere bronnen van duurvariatie**: ploeggrootte, vaardigheden, operationele omstandigheden (weer), tijdstip van de dag.
3. Duur kan worden beïnvloed door **stochastisch opkomende gebeurtenissen** die eerst moeten worden opgelost.
4. **Nieuwe activiteiten ontstaan tijdens de outage** en moeten inclusief afhankelijkheden in de lopende planning worden ingepast.

Punt 4 is de kern van de dagelijkse pijn: een outageplanning is geen document maar een levend systeem dat meerdere keren per dag herrekend en herverspreid moet worden.

### 3.7 Regelgeving, auditsporen en bewaartermijnen
Nucleaire werkbeheer- en planningsprocessen zijn vastgelegd in industriestandaarden: **INPO/NEI AP-928** (Work Management Process) definieert het proces waarmee "maintenance, modification, surveillances, testing, engineering support, and any work activities that require plant coordination or schedule integration are implemented", met fasen screening → scoping → planning → scheduling and coordination → execution → post workweek, en met als doel een **"long-range, resource loaded work management cycle schedule"** ([synthese van AP-928-materiaal](https://html.duckduckgo.com/html/?q=NEI+AP-928+work+management+process+description+outage+schedule+milestones+nuclear)) [B]. **AP-913** dekt equipment reliability. Hitachi Energy noemt AP-913 en AP-928 expliciet als de compliance-kaders waarvoor Asset Suite is gebouwd ([Hitachi Energy Asset Suite EAM](https://www.hitachienergy.com/products-and-solutions/asset-and-work-management/enterprise-asset-management/asset-suite-eam)) [A].

Belangrijke nuance voor open source: **planningssoftware is normaal gesproken niet veiligheidsgerelateerd** onder 10 CFR 50 Appendix B / ASME NQA-1 en vereist dus **geen commercial grade dedication**, tenzij het rechtstreeks een nucleaire veiligheidsfunctie vervult ([synthese van eCFR/NRC/INL-materiaal](https://html.duckduckgo.com/html/?q=nuclear+10+CFR+50+Appendix+B+software+quality+assurance+commercial+grade+dedication+scheduling+software)) [B]. Dat is goed nieuws voor nieuwe toetreders: de formele drempel is lager dan vaak gedacht. De feitelijke drempel is echter procedureel — interne IT-security, leveranciersaudits, exportcontrole en het conservatisme van de bedrijfsvoering.

---

## 4. Welke software wordt hier daadwerkelijk gebruikt — en door wie

### 4.1 Rangorde van planningstools (schedulinglaag)

**[SCHATTING] van marktpositie in deze sector**, gebaseerd op: vermelding in DOE-tooling­lijsten [A], vermelding in INL-onderzoek [A], contractuele voorschriften (UFGS/USACE) [B], vacature-eisen bij DOE-contractors [B], en leverancierspositionering [A].

| Rang | Product | Leverancier | Rol in deze sector | Bewijs |
|---|---|---|---|---|
| **1** | **Primavera P6 (EPPM + Professional)** | Oracle | De facto standaard. Owner-baseline, contractuele leveringsformaat (XER), outageplanning, T&D-portfolio | [DOE EVM-toolslijst noemt Oracle Primavera P6](https://www.energy.gov/projectmanagement/earned-value-management-evm-software-tools) [A]; [INL: "plant owners already rely on tools such as Primavera P6"](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf) [A]; UFGS/USACE-verplichting [B] |
| **2** | **Oracle Primavera Cloud (OPC)** | Oracle | Migratiepad van P6; Oracle positioneert het als "the industry's only solution that combines CPM contract scheduling and task management in a single cloud environment" | [Oracle](https://www.oracle.com/construction-engineering/primavera-p6/) [A] |
| **3** | **Deltek Open Plan** | Deltek | Zware EVMS-programma's, met name DOE/NNSA-contractors en A&D-achtige governance; geautomatiseerde DCMA-14 en DECM-checks, "Time Now"-handhaving, baseline-/replanning-audittrail | [Deltek Open Plan](https://www.deltek.com/products/delivery-assurance/ppm/open-plan/) [A] |
| **4** | **Safran Project / Safran Planner** | Safran Software Solutions (NO) | Sterk in olie & gas en energie in Noordwest-Europa; klanten o.a. Equinor en Aker Solutions; geïntegreerde scope-/wijzigingsbeheersing | [Safran](https://www.safran.com/en-gb/project-management-tools) [A]; klantenvermelding via synthese [C] |
| **5** | **Microsoft Project / Project for the Web** | Microsoft | Onderaannemers, kleinere werkpakketten, interne staffuncties; niet contractueel geaccepteerd bij grote opdrachtgevers | INL noemt MS Project-export vanuit P6 met waarschuwing dat datatypes niet exact overeenkomen ([§4](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A] |
| **6** | **Asta Powerproject, Spider Project, Elecosoft, Deltek PM Compass** | div. | Nichegebruik, regionaal (Asta in VK, Spider in Rusland/CIS) | leverancierspositionering [C] |

### 4.2 Risicoanalyse-laag (SRA — schedule risk analysis)

| Product | Leverancier | Positie | Bron |
|---|---|---|---|
| **Safran Risk** | Safran | Door een branche-expert genoemd als "the most capable quantitative schedule risk assessment software on the market"; DOE noemt "Safran – Risk & Risk Manager" in zijn EVM-toolslijst | [Safran](https://www.safran.com/en-gb/project-management-tools) [A]; [DOE](https://www.energy.gov/projectmanagement/earned-value-management-evm-software-tools) [A] |
| **Deltek Acumen Risk / Acumen 360** | Deltek | Risicomodellering, mitigatiestrategieën, versnellings-optimalisatie | [Deltek Acumen](https://www.deltek.com/en/products/project-and-portfolio-management/acumen) [A] |
| **Primavera Risk Analysis** (ex-Pertmaster) | Oracle | Historisch dominant; listprijs 10.450 USD per application user | [AKIM Engineering prijslijst](https://www.akimeng.com/oracle-primavera-price-list.html) [C] |
| **RAVEN** (open source) | Idaho National Laboratory / DOE | Propagatie van activiteitsduur-variantie, Monte Carlo op outageplanningen | [INL/RPT-24-80380, §8.1](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf) [A]; [ANS](https://www.ans.org/news/article-7402/optimizing-nuclear-plant-outages-data-analytics-tools-and-methods-for-enhancing-resilience-and-efficiency/) [A] |

### 4.3 Schedule-kwaliteit, compliance en forensiek

| Product | Leverancier | Positie | Bron |
|---|---|---|---|
| **Acumen Fuse** | Deltek | Marktleider in schedule-diagnostiek; **600+ metrieken** afgestemd op DCMA, **DOE**, NASA, GAO en AACE; IPMDAR-conforme output; **DOE PARS**-data-inname voor pre-submissiecontrole | [Deltek Acumen](https://www.deltek.com/en/products/project-and-portfolio-management/acumen) [A] |
| **Acumen Touchstone** | Deltek | Geautomatiseerd inleverportaal voor planningen van aannemers, met scoring en feedback | idem [A] |
| **ScheduleReader Pro, Steelray, ScheduleLens** | div. | Goedkopere DCMA-14-automatisering; ScheduleReader ook als read-only XER-viewer | [ScheduleLens-overzicht](https://schedulelens.com/blog/dcma-14-point-assessment/) [B] |
| **DCMA Excel-template** | Defense Acquisition University | Gratis referentie-implementatie | idem [B] |

### 4.4 Kosten-/EVM-laag (verplicht gekoppeld aan de planning)

Het DOE publiceert een expliciete lijst van EVM-softwareleveranciers waarmee het "Departmental EVMS metric tests" in de software laat opnemen ([DOE Office of Project Management](https://www.energy.gov/projectmanagement/earned-value-management-evm-software-tools)) [A]:

1. **AzTech International** – ACE
2. **DecisionEdge** – WebEVM
3. **Deltek** – Cobra en Acumen
4. **Encore Analytics** – Empower
5. **forProject Technology** – forProject
6. **Midnite Dynamics**
7. **Oracle** – Primavera P6
8. **Safran** – Risk & Risk Manager

Daarnaast, buiten de DOE-lijst maar breed in gebruik bij opdrachtgevers en EPC's in energie:
- **EcoSys** (Hexagon, inmiddels "Sequence Enterprise") — portfoliobrede kostenstandaardisatie, gebruikt door zowel owner/operators als EPC's [C]
- **Contruent Enterprise** (voorheen ARES PRISM) — kosten-, risico- en forecastgovernance met EVM [C]
- **InEight** — geïntegreerd enterprise-projectbeheer over megaprogramma's [C]
- **SAP PS / SAP EPPM** — bij utilities die al SAP-gecentreerd zijn

### 4.5 Nucleair werkbeheer / EAM (waar de outagescope vandaan komt)

Dit is de laag waar P6 zijn activiteiten uit haalt. Zonder deze koppeling is een outageplanning waardeloos.

| Product | Leverancier | Positie | Bron |
|---|---|---|---|
| **Asset Suite EAM** (ex-Indus PassPort, ex-Ventyx, ex-ABB) | Hitachi Energy | "purpose-built for asset-intensive industries such as power generation, nuclear energy, and utilities"; expliciet gebouwd rond **AP-913 en AP-928**-compliance en outageplanning; digitale werkpakketten, mobiel, on-prem én cloud | [Hitachi Energy](https://www.hitachienergy.com/products-and-solutions/asset-and-work-management/enterprise-asset-management/asset-suite-eam) [A] |
| Asset Suite gebruikers (genoemd) | — | Exelon, American Electric Power, Florida Power & Light, Pilgrim Nuclear Station, Entergy | zoekresultaat-synthese [C] |
| **IBM Maximo** | IBM | 14.000+ organisaties wereldwijd in asset-intensieve sectoren, inclusief nucleair | zoekresultaat-synthese [C] |
| **eSOMS** (Electronic Shift Operations Management System) | Emerson/Ovation | "trusted by over 430 sites worldwide"; shift-/vergunningenbeheer, tagouts, rondes | zoekresultaat-synthese [C] |
| **SAP PM/EAM** | SAP | Grote Europese nutsbedrijven | [Prometheus Group STO-datasheet noemt SAP+P6 als het standaardkoppel](https://info.prometheusgroup.com/hubfs/1%20Collateral/4%20STO/Datasheets/STO%20Management%20Full%20Suite%20Datasheet.pdf) [A] |

### 4.6 Turnaround/outage-orkestratielaag (bovenop P6)

Dit is een structureel bewijs dat P6 alléén hier niet volstaat. **Prometheus Group STO Management Suite** bestaat expliciet om het gat tussen EAM en scheduler te dichten:

> "It integrates with your SAP and Primavera P6 to update data as well as pull important information for projects."
> — [Prometheus Group STO Management Suite datasheet](https://info.prometheusgroup.com/hubfs/1%20Collateral/4%20STO/Datasheets/STO%20Management%20Full%20Suite%20Datasheet.pdf) [A]

Modules: **STO Planner** (scopeopbouw, werkpakket-templates, joblibraries, planningsnormen, geïntegreerd met CMMS én P6), **STO Execution** (realtime uitvoering, scope-creepbeheersing), **STO Isolation** (isolatiepunten, blindlijsten, P&ID-markups), plus scope management, QA/QC-pakketten en planningsvoortgangs-tracking [A].

Waarde die het claimt te leveren — en dat is precies de lijst van P6-tekortkomingen: procesafdwinging, **live SAP/P6-integratie ("single point of truth")**, gestructureerd proces voor **"Discovered Work"** in de uitvoeringsfase, minder papier, mobiele verbinding [A].

De markt voor deze categorie: **1,42 mld USD in 2024, groeiend naar 3,44 mld USD in 2033 bij 10,2% CAGR** ([Growth Market Reports, Shutdown and Turnaround Optimization Software Market](https://growthmarketreports.com/report/shutdown-and-turnaround-optimization-software-market)) [C]. Regionale verdeling 2024: Noord-Amerika 540 mln USD, Europa 420 mln USD (9,7% CAGR), Azië-Pacific 300 mln USD (12,4% CAGR, snelst), Latijns-Amerika 90 mln USD, MEA 70 mln USD [C]. Genoemde spelers: Aspen Technology, Siemens, Honeywell, AVEVA, IBM, Oracle, SAP, Hexagon, Prometheus Group, Petrofly [C]. Let op: dit rapport telt olie & gas als grootste segment; power generation is een deelsegment.

### 4.7 Analyse- en optimalisatielaag (DOE open source)

Het Amerikaanse ministerie van Energie financiert via het LWRS-programma expliciet **open-source** gereedschap dat bovenop P6-data werkt:

| Tool | Functie | Bron |
|---|---|---|
| **LOGOS** | Planningsoptimalisatie / resource-allocatie | [ANS](https://www.ans.org/news/article-7402/optimizing-nuclear-plant-outages-data-analytics-tools-and-methods-for-enhancing-resilience-and-efficiency/) [A] |
| **RAVEN** | Propagatie van activiteitsduur-variantie (Monte Carlo) | idem [A] |
| **DACKAR** | NLP op tekstuele data (werkorderomschrijvingen, condition reports) | idem [A] |
| **Schedule Outage Analysis Tool (SOAT)** | UI-tool voor resilience-analyse van outageplanningen (pre-alpha in FY24) | [INL/RPT-24-80380, §7.1 en §9](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf) [A] |

**Dit is strategisch zeer relevant.** De sector-overheid financiert dus al open-source analysegereedschap dat P6-data consumeert. Het pijnlijke detail: INL beschrijft dat de aanbevolen manier om data uit P6 te halen neerkomt op **de layouttabel selecteren met Ctrl+A, kopiëren met Ctrl+C en in Excel plakken** ([INL/RPT-24-80380, §4](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A]. Een nationaal laboratorium van de Verenigde Staten, met een miljoenenbudget, exporteert nucleaire outageplanningen via de klembordfunctie. Dat is de scherpste illustratie van het integratiegat in deze markt die in dit onderzoek is gevonden.

INL's oordeel over de officiële exportformaten van P6 ([§4](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A]:
- **XER**: goed voor uitwisseling tussen Primavera-producten, maar "all the data are labeled using the Primavera variable name, which is not an obvious indicator as to the meaning of the actual parameter"
- **XLSX**: export naar Excel mogelijk, maar lastig te formatteren
- **MS Project**: moet voorzichtig, want datatypes komen niet exact overeen — vooral datums moeten worden nagelopen
- **XML**: softwareonafhankelijk, maar lijdt aan dezelfde Primavera-variabelenamen
- **IPMDAR**: nuttig voor DoD-acquisitierapportage

### 4.8 Wie gebruikt wat — per rol in de keten

| Rol | Primaire planningstool | Aanvullend | Motivatie |
|---|---|---|---|
| **Opdrachtgever / nutsbedrijf / kerncentrale** | P6 EPPM (enterprise-database, meerjarig), toenemend Primavera Cloud | Asset Suite / Maximo / SAP als bron van werkorders; EcoSys of Contruent voor kosten; Acumen Fuse/Touchstone om aannemersplanningen te toetsen | Contractuele autoriteit, één waarheid over portfolio, auditspoor |
| **Hoofdaannemer / EPC** | P6 Professional of EPPM; Deltek Open Plan bij EVMS-verplichting | Cobra voor EVM; Safran Risk of Acumen Risk voor SRA; Contruent/InEight voor kosten | Contractueel voorgeschreven; moet XER kunnen aanleveren |
| **Onderaannemer / specialistische contractor** | MS Project, Excel, soms Asta of P6 Professional | ScheduleReader (read-only XER-viewer) om de hoofdplanning te lezen zonder P6-licentie | Kostendruk; wordt gedwongen tot XER-levering |
| **Ingenieursbureau / owner's engineer** | P6 Professional; ook Safran in NW-Europa | Acumen Fuse voor kwaliteitsoordelen; 4D via Synchro/Navisworks | Levert planningsadvies en toetsing; heeft leesbaarheid nodig over veel bronformaten |
| **Outageplanner op de centrale** | P6 (uur/minuut-niveau) | Prometheus STO Planner/Execution; eSOMS; whiteboards en Excel voor emergent work | Dagelijkse herplanning, koppeling naar werkorders |
| **Claim-/forensisch expert** | P6 (as-built vs. as-planned), Acumen Fuse | AACE 29R-03-methodiek; eigen Excel-/database-analyse | Bewijsvoering; moet historische XER-revisies kunnen reconstrueren |
| **Toezichthouder / auditor (DOE, NRC, NDA)** | Leest P6-data; DOE PARS-inname | Acumen Fuse voor metriektests; DOE-specifieke metriektests ingebouwd bij leveranciers | Compliancecontrole |

---

## 5. Prijzen, contractwaarden en betalingsbereidheid

### 5.1 Listprijzen — perpetual licenties (Oracle Primavera)

Gepubliceerde prijslijst van een Oracle-reseller, metriek **per Application User, perpetual, exclusief updates en support** ([AKIM Engineering, Oracle Primavera price list](https://www.akimeng.com/oracle-primavera-price-list.html)) [C]:

| Product | Listprijs (USD) |
|---|---|
| Primavera P6 Professional | **3.880** |
| Primavera P6 Enterprise (EPPM) | **4.240** |
| Primavera Risk Analysis | **10.450** |
| P6 Progress Reporter | **1.460** |

Consistente maar onafhankelijke bevestiging uit een tweede bron: "Primavera P6 starts at $3500 per license" en "$4,240 named-user perpetual license, excluding maintenance" ([ITQlick en prmyazilim, via zoekresultaat-synthese](https://lite.duckduckgo.com/lite/?q=Primavera+P6+EPPM+price+list+named+user+plus+perpetual+USD)) [C].

> **Waarschuwing bij deze cijfers:** Oracle publiceert de officiële Construction & Engineering-prijslijst als PDF; die URL gaf tijdens dit onderzoek 404. De hierboven genoemde bedragen komen dus van resellers en prijsvergelijkers [C]. Ze zijn onderling consistent en sluiten aan bij wat in de sector als publieke listprijs circuleert, maar behandel ze als **indicatief, niet als officieel**.

### 5.2 Abonnements- en cloudprijzen

| Model | Prijs | Bron |
|---|---|---|
| Oracle Primavera P6 (abonnement, algemeen) | **≈ 175 USD/gebruiker/maand** | [contractorsandbuilders.com, via synthese](https://lite.duckduckgo.com/lite/?q=Primavera+P6+EPPM+price+list+named+user+plus+perpetual+USD) [C] |
| P6 Professional-tier (abonnement) | **150–200 USD/gebruiker/maand** | [vendorbenchmark.com](https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing) [C] |
| P6 Enterprise-tier (abonnement) | **250–400 USD/gebruiker/maand** | idem [C] |
| Oracle Primavera Cloud | module-gebaseerd, jaarabonnement per named user, **minimaal 5 gebruikers per module**; hosting, support en updates inbegrepen; geen opstartkosten | [synthese van Taradigm/FindPM](https://html.duckduckgo.com/html/?q=Oracle+Primavera+Cloud+pricing+per+user+per+month+list+price+2025) [C] |
| Primavera Progress Cloud Service | **144 USD/gebruiker/jaar** | [FindPM Software, via synthese](https://html.duckduckgo.com/html/?q=Oracle+Primavera+Cloud+pricing+per+user+per+month+list+price+2025) [C] |
| Safran Project | vanaf **≈ 150 USD/gebruiker/maand**; 10 gebruikers ≈ 1.200 USD/maand; 100 gebruikers **10.000+ USD/maand** | [ITQlick/SaaSRat, via synthese](https://html.duckduckgo.com/html/?q=Safran+Project+pricing+per+user+cost+license+annual) [C] |

### 5.3 Onderhoud, support en het "3x-effect"

- **Annual support (Oracle SULS): 22% van de listprijs per jaar**, zelden onderhandelbaar naar beneden qua percentage — wél qua rekengrondslag ([vendorbenchmark.com](https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing)) [C].
- Meerdere prijsvergelijkers waarschuwen dat de werkelijke kosten na implementatie, add-ons en jaarlijkse indexatie **ongeveer 3× de listprijs** bedragen — zowel voor P6 ([ITQlick](https://lite.duckduckgo.com/lite/?q=Primavera+P6+EPPM+price+list+named+user+plus+perpetual+USD)) [C] als voor Safran ([ITQlick](https://html.duckduckgo.com/html/?q=Safran+Project+pricing+per+user+cost+license+annual)) [C]. **[SCHATTING]** Deze vuistregel (TCO ≈ 3× licentie over 3–5 jaar) is plausibel en consistent met wat in enterprise-software gebruikelijk is, maar is niet gevalideerd tegen primaire klantdata.

### 5.4 Typische contractwaarden

Uit een commerciële benchmarkbron ([vendorbenchmark.com](https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing)) [C] — **behandelen als richtinggevend, niet als hard cijfer**:

| Segment | Jaar 1 | Meerjarig |
|---|---|---|
| Mid-market, 100 concurrent users | **820.000–870.000 USD** | 3-jaarscontract ≈ **2,3–2,6 mln USD** |
| Large enterprise, 500+ users | **3,1–3,7 mln USD** | 5-jaarscontract ≈ **16–20 mln USD** |

Kortingen ten opzichte van listprijs, per sector [C]:

| Sector | Typische korting |
|---|---|
| **Olie, gas en nutsbedrijven** | **45–55%** (hoogste korting; sterkste concurrentiedruk) |
| Engineering & construction | 40–50% |
| Farma & life sciences | 30–40% |
| Overheid & defensie | 25–35% (aanbestedingsbeperkingen) |

**Interpretatie:** dat nutsbedrijven de *hoogste* korting krijgen is opvallend en informatief. Het betekent dat er in dit segment wél degelijk concurrentiedruk bestaat (Safran, Deltek, en interne alternatieven), ondanks de hoge betalingsbereidheid. De sector koopt groot en onderhandelt hard, maar wisselt zelden.

### 5.5 Contractwaarden van de omliggende dienstverlening

Ter kalibratie van hoeveel geld er in de bredere "project controls"-keten omgaat in deze sector:

| Contract | Waarde | Bron |
|---|---|---|
| Sellafield **PACE**-raamovereenkomst (incl. integrated project controls & project management) | **£2,4 mld** | vakpers/tender-synthese [B] |
| Sellafield **Programme and Project Partners (PPP)** | **£7 mld** totaal; £19 mln aan mkb-werkpakketten voor o.a. project controls | idem [B] |

Deze bedragen zijn overwegend **mensuren**, niet software. Maar ze laten de verhouding zien: de software is 1–3% van de project-controlsuitgave; de rest is arbeid. **Dat is de kernopportuniteit én de kernbedreiging voor een nieuwe toetreder:** de markt betaalt niet primair voor tooling, maar voor mensen die met tooling omgaan — en die mensen zijn opgeleid in P6.

### 5.6 Salarissen van de gebruikers (relevant voor prijsanker)

| Functie | Gemiddeld | Bandbreedte (P25–P75) | P90 | Bron |
|---|---|---|---|---|
| Nuclear Scheduler | **102.225 USD/jaar** (49 USD/uur) | 80.066–131.213 USD | 163.714 USD | [salarisdata-synthese via Indeed/ZipRecruiter](https://html.duckduckgo.com/html/?q=nuclear+outage+scheduler+salary+planner+number+of+schedulers+per+plant+outage+control+center) [C] |
| Nuclear Plant Outage Coordinator | **126.294 USD/jaar** (61 USD/uur) | 104.748–154.346 USD | 184.051 USD | idem [C] |
| Openstaande vacatures "nuclear outage scheduler" (VS, Indeed) | **≈ 1.492** | — | — | idem [C] |

**Betekenis voor prijsstelling:** een licentie van 4.000 USD is **circa 4% van het jaarsalaris** van de gebruiker. In deze sector is dat verwaarloosbaar. Een tool die 2% productiviteit toevoegt betaalt zichzelf terug. Dit is het klassieke profiel van een markt met **hoge betalingsbereidheid en lage prijselasticiteit** — waar "goedkoper" geen winnend argument is, en "werkt niet met wat de opdrachtgever eist" een killer.

### 5.7 Betalingsbereidheid: oordeel

**HOOG — structureel en duurzaam hoog.** Redenering:

1. **Kosten van vertraging domineren de licentiekosten met een factor 100–1.000.** 1,2 mln USD per outagedag ([INL](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A] tegenover 4.240 USD per planner-licentie [C].
2. **Regelgeving maakt bepaalde uitgaven niet-optioneel.** EVMS-certificering onder DOE O 413.3B en EIA-748 is geen keuze ([DOE](https://www.energy.gov/projectmanagement/evms-implementation-guidance)) [A]. Contractuele P6/XER-eisen (UFGS/USACE) evenmin [B].
3. **De kapitaalstromen groeien hard.** Netinvestering >400 mld USD in 2025 [B]; EU-distributienet moet van €33 mld naar €67 mld per jaar [B]; 79 reactoren in aanbouw [A].
4. **Claimrisico is asymmetrisch.** Bij HPC-achtige projecten is een defensieve planningsadministratie miljarden waard [B].

**Maar met twee belangrijke nuances:**
- De sector onderhandelt de **hoogste kortingen** van alle sectoren (45–55% bij olie/gas/utilities) [C]. Hoge betalingsbereidheid ≠ prijsongevoeligheid bij inkoop.
- De betalingsbereidheid geldt voor de **opdrachtgeverkant en de grote EPC's**. Bij onderaannemers en kleine ingenieursbureaus, die dezelfde formaateisen krijgen opgelegd, is de betalingsbereidheid **laag** en de frustratie hoog. Dit is de asymmetrie waar een nieuwe toetreder in past.

---

## 6. Segmentomvang: schatting met expliciete redenering

### 6.1 Beschikbare analistencijfers (top-down ankers)

| Marktdefinitie | Omvang | Jaar | Groei | Bron |
|---|---|---|---|---|
| Project Portfolio Management-software (alle sectoren) | **5,7 mld USD** | 2024 | → 12,3 mld USD in 2030, CAGR **14,2%** | [Grand View Research, via synthese](https://html.duckduckgo.com/html/?q=project+portfolio+management+software+market+size+2025+grand+view+research+billion+energy+utilities+segment) [C] |
| Idem, alternatief | 6,54 mld USD | 2025 | → 19,08 mld USD in 2035, CAGR 11,3% | Research Nester, via dezelfde synthese [C] |
| Idem, alternatief | 5,39 mld USD | 2025 | → 10,35 mld USD in 2034 | Fortune Business Insights, via dezelfde synthese [C] |
| Softwareaandeel binnen PPM | **> 67%** van de omzet (rest = diensten) | 2024 | — | Grand View, via synthese [C] |
| Shutdown & Turnaround Optimization Software (alle industrieën) | **1,42 mld USD** | 2024 | → 3,44 mld USD in 2033, CAGR **10,2%** | [Growth Market Reports](https://growthmarketreports.com/report/shutdown-and-turnaround-optimization-software-market) [C] |
| — waarvan Noord-Amerika | 540 mln USD | 2024 | — | idem [C] |
| — waarvan Europa | 420 mln USD | 2024 | CAGR 9,7% | idem [C] |
| — waarvan Azië-Pacific | 300 mln USD | 2024 | CAGR 12,4% | idem [C] |

**Geen enkele van de gevonden analistenrapporten geeft een expliciete energie/nutsbedrijven-uitsplitsing voor planningssoftware.** Dat is een reëel gat in de openbare data; de sizing hieronder is daarom een eigen constructie.

### 6.2 [SCHATTING] Bottom-up berekening

Aannames en hun onderbouwing:

**Component A — Nucleaire bedrijfsvoering (440 reactoren, 31 landen)**
- 440 operabele reactoren ([WNA, 20 juli 2026](https://world-nuclear.org/information-library/current-and-future-generation/nuclear-power-in-the-world-today)) [A].
- **[AANNAME]** Reactoren zijn geclusterd op circa 200–220 locaties (gemiddeld ~2 units per site; VS heeft ~54 sites voor 94 reactoren, Frankrijk 18 sites voor 57 reactoren — dit is een redelijke vuistregel).
- **[AANNAME]** Per locatie 15–40 personen met een planningsseat (outageplanners, werkweekplanners, project schedulers, work control, plus toegang voor supervisors). Neem **25** als middenwaarde. Onderbouwing: een outage met 10.000–18.000 activiteiten ([INL](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A] die 1–2 jaar vooraf wordt opgebouwd, is niet door minder dan een tiental fulltime planners te doen; het Outage Control Center voegt daar tijdens de outage tientallen coördinatorrollen aan toe.
- Ruwweg **200 sites × 25 seats = 5.000 nucleaire planningsseats wereldwijd**.
- **[AANNAME]** Effectieve jaarprijs per seat (na 45–55% korting, inclusief 22% support, geamortiseerde perpetual of abonnement): **2.500–4.000 USD/jaar**. Neem 3.000 USD.
- **Component A ≈ 15 mln USD/jaar aan schedulinglicenties.**
- Plus de EAM/werkbeheerlaag (Asset Suite, Maximo, eSOMS) en de STO-orkestratielaag: **[SCHATTING]** een factor 6–12 groter per site dan de scheduler, want dit zijn zware enterprise-suites. **Component A totaal (planning + direct gekoppeld werkbeheer/outageorkestratie) ≈ 120–200 mln USD/jaar.**

**Component B — Nucleaire nieuwbouw en ontmanteling**
- 79 reactoren in aanbouw ([WNA](https://world-nuclear.org/information-library/current-and-future-generation/nuclear-power-in-the-world-today)) [A]; nucleaire investering ≈ 75 mld USD in 2025 [B]; plus een grote ontmantelingsportefeuille (Sellafield alleen al £7 mld + £2,4 mld aan frameworks) [B].
- **[AANNAME]** Op megaprojecten van deze aard is 0,05–0,15% van de projectwaarde software voor projectbeheersing (planning, kosten, risico, documentbeheer-koppeling). Dit is een gangbare vuistregel in project controls; de arbeidscomponent is een veelvoud daarvan.
- 75 mld USD × 0,10% ≈ **75 mln USD/jaar**, plus ontmanteling **[SCHATTING] ≈ 25–40 mln USD/jaar**.
- **Component B ≈ 100–115 mln USD/jaar.**

**Component C — Netten (T&D), het grootste blok**
- Netinvestering >400 mld USD in 2025 [B].
- **[AANNAME]** Bij T&D is de softwarevoetafdruk relatief lager dan bij nucleaire megaprojecten (kleinere projecten, meer standaardisatie, veel werk in EAM/GIS in plaats van CPM), maar het volume is enorm. Neem 0,04–0,08% van de capex als planning-/projectbeheersingssoftware.
- 400 mld × 0,06% ≈ **240 mln USD/jaar**.
- Sanity check via seats: ~3.200 elektriciteitsbedrijven in de VS [B] + ~800–850 DSO's en 40 TSO's in Europa [A][B] + Azië/rest. **[AANNAME]** wereldwijd 4.000–6.000 relevante netorganisaties, waarvan misschien 800–1.200 groot genoeg voor een echte projectbeheersingsstack, met gemiddeld 40–120 seats. Bij 1.000 organisaties × 70 seats × 3.000 USD = **210 mln USD/jaar**. De twee methoden komen op dezelfde orde van grootte uit — dat versterkt het vertrouwen in de raming.
- **Component C ≈ 210–260 mln USD/jaar.**

**Component D — Thermische opwek, hernieuwbaar, opslag, waterstof**
- Renewables+storage vormen het leeuwendeel van de 2,2 biljoen USD schone-energie-investering [B], maar zijn per project veel eenvoudiger te plannen (repetitief, kortere doorlooptijd, minder EVMS-druk buiten overheidsgesteunde projecten).
- **[AANNAME]** 0,01–0,03% van de relevante capex. Neem circa 1,5 biljoen USD relevante bouwcapex × 0,02% ≈ **300 mln USD/jaar**. Dit cijfer heeft de grootste onzekerheidsmarge van alle componenten (factor 2 naar boven of beneden).
- **Component D ≈ 200–400 mln USD/jaar.**

**Component E — Aanvullende lagen die specifiek aan planning hangen**
- Schedule-kwaliteit/compliance (Acumen Fuse/Touchstone, Steelray, ScheduleReader), risicoanalyse (Safran Risk, Acumen Risk), 4D (Synchro, Navisworks), forensische ondersteuning.
- **[AANNAME]** 20–30% bovenop de schedulinglaag in deze zwaar gereguleerde sector (hoger dan in de gewone bouw, vanwege DCMA/EVMS/audit).
- **Component E ≈ 100–180 mln USD/jaar.**

**Optelling [SCHATTING]:**

| Component | Ondergrens (mln USD/jaar) | Bovengrens (mln USD/jaar) |
|---|---|---|
| A. Nucleaire bedrijfsvoering (planning + werkbeheer/STO) | 120 | 200 |
| B. Nucleaire nieuwbouw + ontmanteling | 100 | 115 |
| C. Netten (T&D) | 210 | 260 |
| D. Opwek, hernieuwbaar, opslag | 200 | 400 |
| E. Kwaliteits-, risico-, 4D- en compliancelagen | 100 | 180 |
| **Totaal software (licenties + abonnementen + support)** | **730** | **1.155** |
| Directe implementatie/configuratie/training (× 0,7 van software, conform het "3x TCO"-signaal maar conservatiever) | 510 | 810 |
| **Totaal segment inclusief directe dienstverlening** | **≈ 1,24 mld** | **≈ 1,97 mld** |

**Eindschatting [SCHATTING]:**

> **Het segment "planningssoftware en direct gekoppelde projectbeheersing voor energie, nutsbedrijven en nucleair" is wereldwijd circa 1,25–1,75 miljard USD per jaar in 2025**, waarvan ongeveer 0,75–1,15 miljard USD zuivere software (licenties, abonnementen, support) en de rest directe implementatie, configuratie, integratie en training.
>
> Middenwaarde: **≈ 1,5 miljard USD (2025)**.

**Kruiscontrole tegen de top-down cijfers:** de totale PPM-softwaremarkt is 5,7 mld USD (2024) [C]. Een aandeel van 0,9 mld USD zuivere software voor energie/nutsbedrijven/nucleair zou circa **16% van de wereldwijde PPM-softwaremarkt** betekenen. Dat is plausibel: energie is samen met bouw, defensie en olie & gas een van de vier zwaartepunten van CPM-planning, en dit segment weegt zwaarder dan zijn economische aandeel doordat het bovengemiddeld veel per planner betaalt. Een aandeel van 16% ligt in de bovenkant van het geloofwaardige bereik maar niet daarbuiten. Als tegencheck: de "Shutdown & Turnaround Optimization Software"-markt alleen al is 1,42 mld USD (2024) over alle industrieën [C], waarvan power generation een deelsegment is — en die categorie zit maar gedeeltelijk in mijn Component A.

### 6.3 Groeirichting

**Sterk positief, met een structurele versnelling.** Onderbouwing:

| Driver | Cijfer | Bron |
|---|---|---|
| Netinvestering overschrijdt 400 mld USD in 2025 (was 390 mld in 2024) | +3% j-o-j, en dat op een recordniveau | [IEA-synthese](https://html.duckduckgo.com/html/?q=IEA+world+energy+investment+2025+grids+380+billion+nuclear+75+billion) [B] |
| EU-distributienet moet **verdubbelen** van €33 mld naar €67 mld per jaar (2025–2050) | +100% benodigd | [Eurelectric-synthese](https://html.duckduckgo.com/html/?q=Eurelectric+ENTSO-E+grid+investment+europe+2025+2050+billion+distribution+networks) [B] |
| Nucleaire investering 2025 | ≈ 75 mld USD, "significantly grown" | [IEA-synthese](https://html.duckduckgo.com/html/?q=IEA+world+energy+investment+2025+grids+380+billion+nuclear+75+billion) [B] |
| Reactoren in aanbouw | **79** wereldwijd | [WNA](https://world-nuclear.org/information-library/current-and-future-generation/nuclear-power-in-the-world-today) [A] |
| PPM-software CAGR (alle sectoren) | 11–14% | Grand View / Research Nester / Fortune BI [C] |
| Shutdown/turnaround-optimalisatiesoftware CAGR | 10,2% | [Growth Market Reports](https://growthmarketreports.com/report/shutdown-and-turnaround-optimization-software-market) [C] |
| Europa specifiek (turnaround-software) | 9,7% CAGR | idem [C] |
| Azië-Pacific specifiek | 12,4% CAGR (snelst) | idem [C] |

**[SCHATTING] Verwachte groei van dit specifieke segment: 8–12% per jaar tot 2030.** Iets onder de generieke PPM-CAGR van 14%, omdat een groot deel van dit segment bestaat uit vervangings- en uitbreidingsomzet op bestaande, zeer honkvaste installaties (P6, Asset Suite) in plaats van uit greenfield-adoptie. Iets boven de algemene softwaregroei omdat de onderliggende capex hard groeit en omdat de nucleaire heropleving en de netverzwaring beide nieuwe planningsvraag creëren.

**Structurele verschuivingen om op te letten:**
1. **Cloudmigratie onder dwang.** Oracle duwt actief richting Primavera Cloud [A]. Elke gedwongen migratie is een heronderhandelingsmoment — en dus een moment waarop een alternatief kan binnenkomen.
2. **Van deterministisch naar probabilistisch.** De DOE investeert al in Monte-Carlo- en NLP-gebaseerde outageanalyse (RAVEN, DACKAR, LOGOS) [A]. Dit wordt in de komende jaren verwachting in plaats van uitzondering.
3. **Azië-Pacific groeit het snelst** (12,4% CAGR in de turnaroundcategorie) [C], gedreven door Chinese en Indiase nieuwbouw.

---

## 7. Sector-specifieke eisen en standaarden

### 7.1 EVMS / EIA-748

- **ANSI/EIA-748** is de industriestandaard voor Earned Value Management Systems. Het Amerikaanse ministerie van Energie interpreteert en implementeert die standaard via **DOE G 413.3-10B** en handhaaft hem via **DOE O 413.3B** ("Program and Project Management for the Acquisition of Capital Assets"), met compliance-reviews door PM-30 "in accordance with established dollar threshold levels" ([DOE Office of Project Management](https://www.energy.gov/projectmanagement/evms-implementation-guidance)) [A].
  > **Onvolledigheid, expliciet gemarkeerd:** de exacte dollar­drempels van DOE O 413.3B konden in dit onderzoek niet uit een primaire bron worden bevestigd (de Humphreys-pagina gaf 403). In de praktijk circuleren als drempels: gecertificeerd EVMS boven een bepaalde projectwaarde en "EVMS-compliant zonder certificering" daaronder. **Dit cijfer moet vóór commercieel gebruik uit DOE O 413.3B zelf worden geverifieerd.**
- **DOE G 413.3-24** is de Planning and Scheduling Guide en schetst "project scheduling principles and best practices in planning and executing capital asset projects" onder O 413.3B ([DOE](https://www.energy.gov/projectmanagement/evms-implementation-guidance)) [A].
- **DOE PARS** (Project Assessment and Reporting System) is het rapportagesysteem; Acumen Fuse ondersteunt PARS-data-inname voor pre-submissiecontrole ([Deltek](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)) [A].
- **IPMDAR** (Integrated Program Management Data and Analysis Report) is het DoD-leveringsformaat; P6 exporteert het en Acumen Fuse produceert IPMDAR-conforme output ([INL §4](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf) [A]; [Deltek](https://www.deltek.com/en/products/project-and-portfolio-management/acumen) [A]).
- **FAR Subpart 34.2** en **DFARS 252.234-7002** regelen de contractuele EVMS-eis in Amerikaanse federale contracten ([acquisition.gov, via synthese](https://html.duckduckgo.com/html/?q=DOE+EVMS+EIA-748+requirement+nuclear+project+Primavera+P6+contractor+audit)) [A].

**Consequentie voor software:** het is niet genoeg om CPM te kunnen. Een tool moet **resource-loaded, cost-loaded, baselined en time-phased** kunnen werken, met een auditeerbare wijzigingsgeschiedenis, of hij is uitgesloten van elk DOE-project boven de drempel.

### 7.2 DCMA 14-point schedule assessment

Ontstaan in 2005 voor Amerikaanse defensieprojecten boven de 20 mln USD ([Ten Six Consulting, via synthese](https://html.duckduckgo.com/html/?q=DCMA+14+point+schedule+assessment+energy+contractor+requirement)) [B], maar inmiddels "the most widely used framework for evaluating construction schedule quality" [B] en breed toegepast bij energieopdrachtgevers.

Volledige checklijst met drempelwaarden ([ScheduleLens](https://schedulelens.com/blog/dcma-14-point-assessment/)) [B]:

| # | Check | Drempel |
|---|---|---|
| 1 | Missing Logic | ≤ 5% activiteiten zonder voorganger/opvolger |
| 2 | Relationship Types | ≥ 90% Finish-to-Start |
| 3 | Leads (negatieve lag) | 0% |
| 4 | Lags (positieve lag) | ≤ 5% van de relaties |
| 5 | Hard Constraints | ≤ 5% van de activiteiten |
| 6 | High Float | ≤ 5% van onvoltooide activiteiten met > 44 werkdagen float |
| 7 | Negative Float | 0% |
| 8 | High Duration | ≤ 5% van onvoltooide activiteiten met duur > 44 werkdagen |
| 9 | Invalid Dates | 0% (geen actuals in de toekomst, geen forecasts in het verleden) |
| 10 | Resource Assignment | alle activiteiten met duur > 0 moeten resources hebben |
| 11 | Missed Tasks | ≤ 5% van voltooide activiteiten te laat afgerond |
| 12 | Critical Path Test | een vertraging van 1 dag moet 1 dag doorwerken op de einddatum |
| 13 | CPLI (Critical Path Length Index) | ≥ 0,95 |
| 14 | BEI (Baseline Execution Index) | ≥ 0,95 |

Automatisering: **Acumen Fuse** (600+ metrieken, incl. DCMA, DOE, NASA, GAO, AACE) [A], **Deltek Open Plan** (ingebouwde DCMA-14- en DECM-checks) [A], ScheduleReader Pro, ScheduleLens, Steelray, en de gratis DCMA-Excel-template van Defense Acquisition University [B].

**Consequentie voor een nieuwe planner:** DCMA-14 is een *harde poort*. Een tool die geen open constraints, lags, float en CPLI/BEI kan blootleggen en exporteren, komt niet door de eerste beoordeling van een opdrachtgever heen. Tegelijk is dit een van de best gedocumenteerde, meest implementeerbare eisensets in de hele branche — puur rekenwerk over een CPM-netwerk.

### 7.3 AACE International recommended practices

- **RP 29R-03, Forensic Schedule Analysis** — "provide[s] a unifying reference of basic technical principles and guidelines for the application of critical path method (CPM) scheduling in forensic schedule analysis"; definieert **negen methodologieën (MIP's 3.1–3.9)** in vier classificatielagen, gecategoriseerd als *observational vs. modeled* en *static vs. dynamic*. MIP 3.6 (Time Impact Analysis) werkt zowel prospectief als retrospectief ([AACE-synthese](https://html.duckduckgo.com/html/?q=AACE+29R-03+forensic+schedule+analysis+recommended+practice+methods+MIP)) [B].
- **RP 52R-06, Time Impact Analysis – As Applied in Construction** [B].
- **SCL Delay and Disruption Protocol, 2nd Edition** — coördineert met de taxonomie van 29R-03 [B].
- Overige relevante RP's (27R-03, 37R-06, 38R-06, 39R-06, 49R-06, 92R-21) bestaan maar konden in dit onderzoek niet inhoudelijk worden opgehaald; de AACE-ledenzone is afgeschermd ([AACE](https://web.aacei.org/resources/publications/recommended-practices)) [A].

**Consequentie:** de sector heeft een gestandaardiseerde methodologie om planningen achteraf te ontleden. Dat betekent dat **de historische planningsrevisies zelf een gearchiveerd, versiebeheerd bewijsstuk moeten zijn**. Een tool die alleen "de huidige planning" opslaat, is forensisch waardeloos.

### 7.4 Verplichte leveringsformaten

| Formaat | Waar verplicht | Bron |
|---|---|---|
| **Primavera XER** | US federale bouw (UFGS 01 32 01.00 10 / USACE), en breed als contractuele eis bij owners | [USACE-specificatie-synthese](https://html.duckduckgo.com/html/?q=UFGS+01+32+01.00+10+project+schedule+Primavera+P6+required+software+specification) [B] |
| **P6 XML** | softwareonafhankelijke variant; nadeel: Primavera-variabelenamen | [INL §4](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf) [A] |
| **IPMDAR** | DoD-acquisitierapportage; ook gebruikt in DOE-context | [INL §4](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf) [A]; [Deltek](https://www.deltek.com/en/products/project-and-portfolio-management/acumen) [A] |
| **DOE PARS-upload** | DOE-projecten | [DOE](https://www.energy.gov/projectmanagement/evms-implementation-guidance) [A] |
| **MPP/MPX (MS Project)** | onderaannemersniveau; INL waarschuwt dat datatypes niet exact overeenkomen en datums nagelopen moeten worden | [INL §4](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf) [A] |
| **XLSX** | de facto het meest gebruikte uitwisselformaat in de praktijk | [INL §4](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf) [A] |

USACE-specifieke P6-configuratie-eisen die contractueel worden afgedwongen: **activity codes moeten Project Level zijn, niet Global of EPS level**; kalenders en activiteitcodes projectspecifiek; opdrachtgever levert een .xer-backuptemplate ([synthese](https://html.duckduckgo.com/html/?q=UFGS+01+32+01.00+10+project+schedule+Primavera+P6+required+software+specification)) [B].

### 7.5 Nucleaire proces- en kwaliteitsnormen

| Norm | Inhoud | Bron |
|---|---|---|
| **INPO/NEI AP-928** | Work Management Process: screening → scoping → planning → scheduling & coordination → execution → post workweek; doel is een "long-range, resource loaded work management cycle schedule" met preventief/predictief onderhoud, surveillance testing en ready-to-work design changes | [AP-928-synthese](https://html.duckduckgo.com/html/?q=NEI+AP-928+work+management+process+description+outage+schedule+milestones+nuclear) [B] |
| **INPO AP-913** | Equipment Reliability Process | [Hitachi Energy](https://www.hitachienergy.com/products-and-solutions/asset-and-work-management/enterprise-asset-management/asset-suite-eam) [A] |
| **10 CFR 50 Appendix B** | Kwaliteitsborgingscriteria voor kerncentrales | [eCFR/NRC-synthese](https://html.duckduckgo.com/html/?q=nuclear+10+CFR+50+Appendix+B+software+quality+assurance+commercial+grade+dedication+scheduling+software) [A] |
| **ASME NQA-1** | Implementatiestandaard onder 10 CFR 50 App. B | idem [B] |
| **NRC Reg. Guide 1.164** | Dedication of Commercial-Grade Items | idem [B] |
| **IAEA-TECDOC-1315 / TECDOC-1806 / TRS-449** | Outage optimisation strategy en good outage management practices voor operators en utilities | [IAEA-publicatieoverzicht](https://www.iaea.org/publications/6495/nuclear-power-plant-outage-optimisation-strategy) [A] |
| **EPRI Outage Management Benchmarking Guideline** en **Outage Milestone Manual** | benchmarking en mijlpaalstructuur | EPRI-synthese [C] |

**Sleutelconclusie voor een nieuwe toetreder:** planningssoftware is normaal **niet** safety-related en heeft dus **geen** NQA-1-kwalificatie of commercial grade dedication nodig ([synthese eCFR/NRC/INL](https://html.duckduckgo.com/html/?q=nuclear+10+CFR+50+Appendix+B+software+quality+assurance+commercial+grade+dedication+scheduling+software)) [B]. De echte drempels zijn AP-928-procesconformiteit, IT-security en integratie met het EAM.

---

## 8. Voor- en nadelen van de gebruikte pakketten in déze sectorcontext

### 8.1 Oracle Primavera P6 (EPPM / Professional)

**Wat hier goed werkt:**
- **Schaalt naar tienduizenden activiteiten.** Dit is niet triviaal; veel moderne "mooie" planners vallen om bij 5.000 activiteiten. P6 is expliciet gebouwd voor "large-scale programs with multiuser access" ([Oracle](https://www.oracle.com/construction-engineering/primavera-p6/)) [A].
- **Multi-user op één database met rollen en rechten.** Bij een outage waar tientallen coördinatoren tegelijk in dezelfde planning werken, is dit onmisbaar.
- **Contractueel geaccepteerd.** XER is de lingua franca. Wie P6 gebruikt, hoeft over het leveringsformaat niet te onderhandelen — de USACE-specificatie schrijft het letterlijk voor [B].
- **Resource- en kostenkoppeling** aan de WBS, cashflow op basis van planning, integratie met Unifier ([Oracle](https://www.oracle.com/construction-engineering/primavera-p6/)) [A].
- **Volwassen ecosysteem:** DOE erkent het als EVM-tool [A], elk consultancybureau kent het, elke scheduler is erin opgeleid.
- **Diepe activiteitencodering** (WCAT-codes, activity codes op project/EPS/global-niveau) die past bij nucleaire werkindeling [A][B].

**Wat hier wringt:**
- **Data komt er slecht uit.** INL — een nationaal laboratorium — beschrijft de aanbevolen exportroute als "select all the contents (Ctrl + A), and then copy (Ctrl + C) and paste them into an Excel file" ([INL §4](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A]. XER is ondoorzichtig: "all the data are labeled using the Primavera variable name, which is not an obvious indicator as to the meaning of the actual parameter" [A]. Dat is een vernietigend oordeel over de interoperabiliteit van de marktleider.
- **Puur deterministisch.** INL noemt als eerste kritiekpunt dat "activity duration is typically considered a point value, when in reality the actual duration is a variable based on past operational experience" [A]. Voor onzekerheidsanalyse heb je een apart, duur pakket nodig.
- **Emergent work is een handmatig gevecht.** "New activities can materialize once the outage has started. The emergent activities must be incorporated into the schedule, including dependencies with other activities" [A] — P6 biedt hier geen procesondersteuning; vandaar dat de hele Prometheus STO-productcategorie bestaat [A].
- **Geen object-/geometriekoppeling.** P6 kent geen bouwdeel, geen systeem, geen tag. 4D vereist Synchro of Navisworks ernaast.
- **UI en leercurve.** Gebruikersklachten: "outdated interface and clunky functionality", "steep learning curve", "specialist-focused rather than team-accessible", "takes weeks to learn" ([Reddit/vergelijkersynthese](https://html.duckduckgo.com/html/?q=Primavera+P6+complaints+outdated+clunky+expensive+reddit+schedulers+alternatives)) [C].
- **Licentie-economie sluit de keten uit.** Een onderaannemer met drie werkpakketten wil geen 3.880 USD/seat [C] betalen om een XER te kunnen lezen. Het gevolg is een grijze markt aan viewers en Excel-uittreksels — en dus datadegradatie in de keten.
- **Cloudmigratiedruk.** Oracle stuurt richting Primavera Cloud [A]; dat betekent gedwongen verandering zonder dat de klant om functionaliteit vroeg.

### 8.2 Deltek Open Plan + Cobra + Acumen

**Goed:**
- **Compliance-first ontwerp.** Geautomatiseerde DCMA-14- en DECM-checks, "Time Now"-handhaving die ongeldige forecastdatums voorkomt, rolgebaseerde toegang met volledige audithistorie op replanning en baselinewijzigingen ([Deltek Open Plan](https://www.deltek.com/products/delivery-assurance/ppm/open-plan/)) [A]. Voor DOE-contractors is dit exact het probleem dat opgelost moet worden.
- **De duidelijkste kosten/planning-scheiding in de markt.** Open Plan = logica en IMS; Cobra = tijdgefaseerde budgetten en EVM-berekening [B].
- **Acumen Fuse als sectorstandaard voor schedule-kwaliteit**, met expliciete DOE-metrieken en PARS-inname [A].
- Erkend door DOE in de officiële EVM-toolslijst [A].

**Wringt:**
- **Zwaar en duur voor wie geen EVMS-verplichting heeft.** Dit is compliance-infrastructuur, geen dagelijkse planningstool.
- **Bijna niemand buiten de gereguleerde wereld gebruikt Open Plan als primaire scheduler**; het is een tweede planning naast de P6-planning van de opdrachtgever, met alle synchronisatiepijn van dien.
- **Overwegend Amerikaans/defensiegeoriënteerd** ecosysteem; buiten de VS is de installed base in energie beperkter.

### 8.3 Safran (Project / Planner / Risk)

**Goed:**
- **All-in-one:** "project scheduling, planning, risk analysis and execution in a feature-rich, all-in-one solution" ([Safran](https://www.safran.com/en-gb/project-management-tools)) [A]. Geen aparte licentie voor risicoanalyse nodig.
- **Ingebouwd wijzigings- en scopebeheer** — precies wat bij variation orders en emergent work nodig is [A].
- **Safran Risk** wordt door een branche-expert "the most capable quantitative schedule risk assessment software on the market" genoemd [A]; DOE noemt Safran Risk in zijn EVM-toolslijst [A].
- **Sterk verankerd in Noordzee-energie** (Equinor, Aker Solutions) [C], wat een natuurlijk bruggenhoofd geeft naar offshore wind.
- Prijs vanaf ≈150 USD/gebruiker/maand [C] — vergelijkbaar met P6 maar met risicoanalyse inbegrepen.

**Wringt:**
- **Niet het contractuele leveringsformaat.** Een Safran-planning moet uiteindelijk vaak alsnog naar XER.
- **Kleinere talentenpool.** Er zijn veel meer P6-schedulers dan Safran-schedulers; dat maakt Safran risicovol voor een organisatie die contractors inhuurt.
- **Beperkte zichtbaarheid buiten NW-Europa/olie & gas.**

### 8.4 Asset Suite EAM (Hitachi Energy)

**Goed:**
- **Domeinspecifiek voor nucleair.** "purpose-built for asset-intensive industries such as power generation, nuclear energy, and utilities"; expliciet ontworpen rond **AP-913 en AP-928** en rond outageplanning; digitale werkpakketten met stapsgewijze procedures; auditsporen en rapportage voor regelgeving ([Hitachi Energy](https://www.hitachienergy.com/products-and-solutions/asset-and-work-management/enterprise-asset-management/asset-suite-eam)) [A].
- **Diepe installed base** bij grote Amerikaanse nucleaire vloten (Exelon, AEP, FPL, Entergy genoemd) [C]. Vervanging is praktisch ondenkbaar.

**Wringt:**
- **Het is geen planner.** De CPM-laag zit in P6; Asset Suite levert de werkorders. De koppeling tussen beide is klassiek de zwakste schakel in de nucleaire IT-architectuur.
- **Legacy-erfenis** (Indus PassPort → Ventyx → ABB → Hitachi Energy) met bijbehorende technische schuld en vendor-lock-in.
- Hitachi publiceert **geen klantaantallen, geen prijzen, geen marktaandeel** [A] — wat op zichzelf zegt dat dit een onderhandeld-per-deal, hoogwaardige enterprise-verkoop is.

### 8.5 Prometheus Group STO Management Suite

**Goed:** vult exact het gat dat P6 laat vallen — scopeverzameling, goedkeuringsworkflow, gestructureerd proces voor "Discovered Work", isolatie-/blindlijstbeheer met P&ID-markups, QA/QC-pakketten, en **live tweerichtingsintegratie met SAP én P6** ([Prometheus datasheet](https://info.prometheusgroup.com/hubfs/1%20Collateral/4%20STO/Datasheets/STO%20Management%20Full%20Suite%20Datasheet.pdf)) [A].

**Wringt:** het is een **vierde systeem** bovenop EAM + scheduler + kostensysteem. De integratielast en de licentiestapeling nemen toe, en het bevestigt dat de sector zijn kernprobleem oplost met steeds meer middleware in plaats van met een beter datamodel.

### 8.6 Microsoft Project

**Goed:** goedkoop, iedereen kan het, prima voor werkpakketten van onderaannemers.
**Wringt:** niet geaccepteerd als contractueel leveringsformaat; INL waarschuwt expliciet dat de datatypes bij conversie vanuit P6 niet overeenkomen en dat datums nagelopen moeten worden ([INL §4](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A]; geen multi-user CPM op de schaal die hier nodig is.

---

## 9. Openingen: waar zijn gebruikers ontevreden en waar zitten de gaten

Dit is de sectie die er voor een open-source, IFC-gebaseerde planner het meest toe doet. Ik onderscheid **bewezen gaten** (met bronbewijs) en **plausibele gaten** [SCHATTING].

### 9.1 Bewezen gat 1: data komt niet fatsoenlijk uit de marktleider

**Bewijs:** een nationaal laboratorium van het Amerikaanse ministerie van Energie documenteert als aanbevolen werkwijze om nucleaire outagedata uit P6 te halen: **de tabel selecteren, kopiëren, in Excel plakken** ([INL/RPT-24-80380 §4](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A]. En over het officiële uitwisselformaat: "all the data are labeled using the Primavera variable name, which is not an obvious indicator as to the meaning of the actual parameter" [A].

**Opening:** een planner met een **transparant, gedocumenteerd, semantisch benoemd persistentieformaat** lost een probleem op dat de marktleider aantoonbaar niet oplost. Voor Open Planner Studio, waar IFC 4.3 het native formaat is, is dit rechtstreeks relevant: een IFC-planning is per definitie leesbaar met open tooling, semantisch benoemd, en gestandaardiseerd (ISO 16739-1).

**Bijbehorende functie-eis:** vlekkeloze XER- én P6 XML-import/export. Niet als "nice to have", maar als toegangsbewijs. Zonder XER-import is het gesprek voorbij; met XER-import + een open eigen formaat ben je het bruggetje dat de sector mist.

### 9.2 Bewezen gat 2: onzekerheid en emergent work

**Bewijs:** INL somt vier structurele tekortkomingen van de CPM-praktijk op: puntwaardes voor duur, meerdere bronnen van duurvariatie, stochastisch opkomende gebeurtenissen, en nieuwe activiteiten die tijdens de outage ontstaan ([INL §3.1](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A]. In het geanalyseerde praktijkgeval werden circa **300 activiteiten uitgevoerd na de geplande einddatum** [A].

**Opening:** ondersteuning voor **duurverdelingen in plaats van puntwaarden**, en een expliciet, eersteklas concept voor **emergent work** (nieuwe activiteit koppelen aan een issue report / werkorder, met snelle herberekening en een auditspoor van wat er wanneer is bijgekomen). Vandaag koopt de sector hiervoor Primavera Risk Analysis (10.450 USD/seat) [C] plus een STO-suite plus een dashboard. Een tool die float, drag, en duurvariantie native toont, verslaat drie losse producten.

Let op de terminologie die de sector gebruikt en die dus in de UI moet terugkomen: **total float (TF)** voor niet-kritieke activiteiten, en **drag** voor kritieke activiteiten — "the degree to which such an activity can be reduced before it gets moved out of the CP" ([INL §3.1, Figuur 4](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf)) [A]. Drag is in de meeste planners afwezig; hier is het gangbaar.

### 9.3 Bewezen gat 3: de onderaannemerskant betaalt de prijs van de opdrachtgeverskeuze

**Bewijs:** contractuele XER-verplichting (UFGS/USACE) [B] gecombineerd met licentieprijzen van 3.880–4.240 USD per seat [C] en klachten over kosten en leercurve ("costs $3,000+/year and takes weeks to learn") [C].

**Opening:** de **lange staart**. Iedereen die een XER moet kunnen lezen, ergens in aanpassen en teruggeven, zonder een P6-seat te willen kopen. Dat zijn: onderaannemers, steigerbouwers, isolatiebedrijven, NDT-firma's, ingenieursbureaus met kleine opdrachten, en de honderden kleinere DSO's in Europa. Dit is een markt die **kwantitatief groot** is (denk aan de ~800–850 EU-DSO's [B] en ~3.200 Amerikaanse elektriciteitsbedrijven [B]) en waarvan de betalingsbereidheid laag is — precies waar open source structureel wint.

### 9.4 Bewezen gat 4: geen objectkoppeling, geen 4D in de scheduler

**Bewijs:** P6 kent geen geometrisch of asset-object; de sector koopt Synchro/Navisworks ernaast [C]. IFC 4.3 (ISO 16739-1:2024) heeft infrastructuurdomeinen toegevoegd voor rail, weg, brug, tunnel, havens en waterwegen ([buildingSMART/ISO-synthese](https://html.duckduckgo.com/html/?q=IFC+4.3+ISO+16739+infrastructure+energy+transmission+substation+openBIM+scope)) [B]. In nucleaire nieuwbouw wordt BIM al gebruikt: "a comprehensive three-dimensional (3D) BIM model is created ... and used as the primary input for the digital framework" [C], met Sizewell C (3,34 GWe) en AtkinsRéalis/Amentum als delivery partners [C].

**Opening én waarschuwing.** De opening: een planner waar de activiteit *van huis uit* aan een IFC-object hangt, geeft 4D zonder derde tool en geeft — belangrijker in deze sector — **traceerbaarheid van planning naar systeem/component**, wat AP-928 en de tech-spec-gedreven afhankelijkheden feitelijk vereisen. De waarschuwing: **IFC 4.3 dekt rail/weg/brug/tunnel/haven, niet expliciet elektrische infrastructuur** zoals onderstations en hoogspanningslijnen [B]. Wie IFC als onderscheidend vermogen inzet richting netbeheerders, moet eerlijk zijn dat de schema-dekking daar nog dun is. Voor gebouwde nucleaire installaties (die gewoon gebouwen met systemen zijn) is de dekking veel beter.

### 9.5 Bewezen gat 5: de overheid financiert al open-source rondom P6

**Bewijs:** DOE/INL ontwikkelt en publiceert **LOGOS, RAVEN, DACKAR** en een Schedule Outage Analysis Tool ([ANS](https://www.ans.org/news/article-7402/optimizing-nuclear-plant-outages-data-analytics-tools-and-methods-for-enhancing-resilience-and-efficiency/) [A]; [INL §8–9](https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf) [A]).

**Opening:** er is een **institutionele acceptatie van open source** in precies dit domein, gefinancierd door de sectorregulator/financier zelf. Een open-source planner is hier geen exotisch idee maar past in een bestaande beweging. Concrete strategie [SCHATTING]: positioneer als de **open referentie-implementatie van een CPM-motor** waar deze DOE-tools op kunnen draaien zonder de Ctrl+C/Ctrl+V-omweg.

### 9.6 Bewezen gat 6: DCMA-14 is rekenwerk, geen magie

**Bewijs:** alle 14 checks met exacte drempelwaarden zijn openbaar en volledig gespecificeerd ([ScheduleLens](https://schedulelens.com/blog/dcma-14-point-assessment/)) [B]; ze zijn zonder uitzondering af te leiden uit een CPM-netwerk (logica, relatietypes, lags, constraints, float, duur, actuals, CPLI, BEI).

**Opening:** een **ingebouwde, gratis DCMA-14-analyse** is een van de goedkoopst te bouwen, hoogst gewaardeerde functies die je in deze sector kunt leveren. Vandaag koopt men daarvoor Acumen Fuse [A] of ScheduleReader Pro [B]. Voor een open-source planner is dit een paar honderd regels code bovenop een bestaande CPM-solver — en een direct herkenbaar verkoopargument aan elke energie-scheduler.

Idem voor **AACE 29R-03**: negen forensische methoden [B], allemaal gebaseerd op het vergelijken van planningsrevisies. Een planner die **elke baseline-revisie versiebeheerd bewaart en as-planned vs. as-built kan diffen**, levert forensische waarde die P6 alleen via externe expertise geeft.

### 9.7 Plausibele gaten [SCHATTING]

| Gat | Redenering | Zekerheid |
|---|---|---|
| **Dosis als resource** | Stralingsdosis per persoon is een harde limiet in nucleaire outages, maar geen enkele generieke planner modelleert het. In de bronnen niet expliciet bevestigd, wél impliciet via GE Vernova's nadruk op "reduce your outage dose" [A]. | Middel |
| **Uur/minuut-granulariteit met ploegendienstkalenders** | INL bevestigt duren "in hours and minutes" [A]; 24/7-outagewerk met 12-uursploegen vraagt kalendermodellen die de meeste bouwplanners niet aankunnen. | Hoog |
| **Herrekening in seconden bij 18.000 activiteiten** | Bij meerdere herplanningen per dag tijdens een outage is rekentijd een echt probleem. Niet in bronnen gekwantificeerd. | Middel |
| **Meerdere planningen naast elkaar (owner/EPC/sub) vergelijken** | De keten werkt met meerdere waarheden; een tool die twee XER's kan diffen is zeldzaam. | Middel |
| **T&D-programma's: honderden kleine planningen als portfolio** | Netbeheerders hebben geen megaplanning maar duizenden kleine; multi-document + portfolio-rollup is daar de kernbehoefte. | Middel-hoog |
| **Weersvenster-simulatie voor offshore wind** | Shoreline bestaat precies hiervoor [C]; een CPM-planner met een probabilistische weerskalender zou een gat vullen tussen "gewone planner" en "dure simulatie". | Middel |

### 9.8 Wat een open-source planner in deze sector **niet** gaat winnen

Intellectueel eerlijk blijven:

1. **De enterprise-database van een nucleaire vloot vervangen.** P6 EPPM met honderden gelijktijdige gebruikers, rolgebaseerde beveiliging, SSO, en 20 jaar historische projecten wordt niet vervangen door een desktoptool. Niet in tien jaar.
2. **De EVMS-certificeringsketen.** Cobra/ACE/Empower hebben DOE-erkenning ([DOE](https://www.energy.gov/projectmanagement/earned-value-management-evm-software-tools)) [A]. Die lijst is een toegangspoort waar je jaren over doet.
3. **Op prijs concurreren.** De sector betaalt 4.240 USD zonder blikken of blozen [C] terwijl één outagedag 1,2 mln USD kost [A]. "Gratis" is hier geen argument; "werkt met wat de opdrachtgever eist" is het enige argument.
4. **Het inkoopconservatisme van nucleaire IT.** Ook al is planningssoftware formeel niet safety-related [B], de leveranciersaudit, cybersecurity-review en change-controlprocedures zijn zwaar.

### 9.9 Aanbevolen positionering [SCHATTING]

**Volgorde van aanval, van makkelijk naar moeilijk:**

1. **De XER-brug voor de keten.** Open XER/P6 XML lezen, bewerken, terugschrijven; gratis; met DCMA-14 ingebouwd. Doelgroep: onderaannemers, ingenieursbureaus, kleine DSO's.
2. **4D/IFC-koppeling als onderscheidend vermogen** waar P6 niets heeft. Doelgroep: nucleaire nieuwbouw en ontmanteling, waar BIM al draait [C].
3. **Analyse- en kwaliteitslaag** (DCMA-14, float/drag, as-planned vs. as-built diff, duurvariantie). Doelgroep: opdrachtgevers die aannemersplanningen moeten toetsen — vandaag Acumen Fuse-terrein.
4. **Pas daarna** de ambitie om een primaire planningstool te zijn voor een klein tot middelgroot energieproject.

**Kernboodschap die in deze sector aanslaat, in volgorde van overtuigingskracht:**
1. "Je planning is een open, leesbaar, gestandaardiseerd bestand — geen ondoorzichtige XER met Primavera-variabelenamen." (rechtstreeks INL's klacht [A])
2. "DCMA-14 zit erin, gratis, altijd."
3. "Elke revisie is bewaard en te diffen — forensisch bruikbaar onder AACE 29R-03."
4. "Iedereen in je keten kan hem openen, zonder licentie."

---

## 10. Bronnenlijst

### Primaire bronnen [A]

1. Idaho National Laboratory / DOE Light Water Reactor Sustainability Program, **INL/RPT-24-80380, "Tools And Methods to Analyze Plant Outage Schedules and Assist Schedulers in Improving Outage Resilience"**, september 2024 (55 p., volledige tekst geëxtraheerd) — https://lwrs.inl.gov/content/uploads/11/2024/10/OutageOptimization.pdf
2. American Nuclear Society, **"Optimizing nuclear plant outages: Data analytics tools and methods for enhancing resilience and efficiency"** — https://www.ans.org/news/article-7402/optimizing-nuclear-plant-outages-data-analytics-tools-and-methods-for-enhancing-resilience-and-efficiency/
3. U.S. Department of Energy, Office of Project Management, **EVMS Implementation Guidance** (DOE O 413.3B, DOE G 413.3-10B, DOE G 413.3-24) — https://www.energy.gov/projectmanagement/evms-implementation-guidance
4. U.S. Department of Energy, Office of Project Management, **Earned Value Management (EVM) Software Tools** — https://www.energy.gov/projectmanagement/earned-value-management-evm-software-tools
5. Oracle, **Primavera P6 Enterprise Project Portfolio Management** — https://www.oracle.com/construction-engineering/primavera-p6/
6. Hitachi Energy, **Asset Suite EAM** — https://www.hitachienergy.com/products-and-solutions/asset-and-work-management/enterprise-asset-management/asset-suite-eam
7. Deltek, **Acumen (Fuse / Risk / 360 / Touchstone)** — https://www.deltek.com/en/products/project-and-portfolio-management/acumen
8. Deltek, **Open Plan** — https://www.deltek.com/products/delivery-assurance/ppm/open-plan/
9. Safran Software Solutions, **Project Management Tools (Safran Project / Planner / Risk)** — https://www.safran.com/en-gb/project-management-tools
10. Prometheus Group, **STO Management Suite datasheet** (PDF, volledige tekst geëxtraheerd) — https://info.prometheusgroup.com/hubfs/1%20Collateral/4%20STO/Datasheets/STO%20Management%20Full%20Suite%20Datasheet.pdf
11. World Nuclear Association, **Nuclear Power in the World Today** (bijgewerkt 20 juli 2026) — https://world-nuclear.org/information-library/current-and-future-generation/nuclear-power-in-the-world-today
12. ENTSO-E, **Members** (40 TSO's uit 36 landen) — https://www.entsoe.eu/about/inside-entsoe/members/
13. GE Vernova Hitachi Nuclear Energy, **Nuclear Outage Services** — https://www.gevernova.com/nuclear/services/outage-services
14. Westinghouse, **Integrated Outage Model** — https://westinghousenuclear.com/data-sheet-library/integrated-outage-model/
15. IAEA, **Nuclear Power Plant Outage Optimisation Strategy** (TECDOC-1315; opvolger TECDOC-1806; TRS-449) — https://www.iaea.org/publications/6495/nuclear-power-plant-outage-optimisation-strategy
16. AACE International, **Recommended Practices** (overzichtspagina; RP-teksten achter ledenzone) — https://web.aacei.org/resources/publications/recommended-practices

### Secundaire bronnen [B]

17. ScheduleLens, **DCMA 14-Point Assessment — volledige checklijst met drempelwaarden** — https://schedulelens.com/blog/dcma-14-point-assessment/
18. Ten Six Consulting, **What is the DCMA 14-Point Assessment?** — https://tensix.com/what-is-the-dcma-14-point-assessment/
19. Humphreys & Associates, **DOE Guide 413.3-10B EVMS** — https://www.humphreys-assoc.com/doe-guide-413-3-10b-evms/ (403 tijdens onderzoek; via zoekresultaat-samenvatting)
20. Acquisition.gov, **FAR Subpart 34.2 — Earned Value Management System** — https://www.acquisition.gov/far/subpart-34.2
21. Acquisition.gov, **DFARS 252.234-7002 — Earned Value Management System** — https://www.acquisition.gov/dfars/252.234-7002-earned-value-management-system
22. Zoekresultaat-synthese, **AACE 29R-03 Forensic Schedule Analysis (MIP's 3.1–3.9)** — https://html.duckduckgo.com/html/?q=AACE+29R-03+forensic+schedule+analysis+recommended+practice+methods+MIP
23. Zoekresultaat-synthese, **UFGS 01 32 01.00 10 / USACE Primavera P6 Mandatory Requirements en XER-eis** — https://html.duckduckgo.com/html/?q=UFGS+01+32+01.00+10+project+schedule+Primavera+P6+required+software+specification
24. Zoekresultaat-synthese, **IEA World Energy Investment 2025 (3,3 bn USD totaal; >400 mld USD netten; ≈75 mld USD nucleair)** — https://html.duckduckgo.com/html/?q=IEA+world+energy+investment+2025+grids+380+billion+nuclear+75+billion (IEA-primair gaf 403)
25. Zoekresultaat-synthese, **Eurelectric "Grids for Speed" (€33 → €67 mld/jaar) en ENTSO-E (>€800 mld tot 2050)** — https://html.duckduckgo.com/html/?q=Eurelectric+ENTSO-E+grid+investment+europe+2025+2050+billion+distribution+networks
26. Zoekresultaat-synthese, **Hinkley Point C kosten- en tijdsoverschrijding** — https://html.duckduckgo.com/html/?q=EDF+Hinkley+Point+C+schedule+delay+cost+overrun+2024+2025+billion
27. Zoekresultaat-synthese, **Sellafield PACE (£2,4 mld) en PPP (£7 mld) frameworks incl. project controls** — https://html.duckduckgo.com/html/?q=Sellafield+project+controls+framework+contract+award+value+planning+scheduling+NDA
28. Zoekresultaat-synthese, **DOE-contractors (Hanford, Savannah River): P6 als IMS-autoriteit, Cobra als EVM-autoriteit** — https://html.duckduckgo.com/html/?q=Hanford+Savannah+River+DOE+contractor+Primavera+P6+Cobra+EVMS+integrated+master+schedule
29. Zoekresultaat-synthese, **NEI/INPO AP-928 Work Management Process** — https://html.duckduckgo.com/html/?q=NEI+AP-928+work+management+process+description+outage+schedule+milestones+nuclear
30. Zoekresultaat-synthese, **10 CFR 50 App. B / NQA-1 en de status van planningssoftware (niet safety-related)** — https://html.duckduckgo.com/html/?q=nuclear+10+CFR+50+Appendix+B+software+quality+assurance+commercial+grade+dedication+scheduling+software
31. Zoekresultaat-synthese, **IFC 4.3 / ISO 16739-1:2024 infrastructuurdekking** — https://html.duckduckgo.com/html/?q=IFC+4.3+ISO+16739+infrastructure+energy+transmission+substation+openBIM+scope
32. Zoekresultaat-synthese, **aantal Amerikaanse elektriciteitsbedrijven (EIA)** — https://html.duckduckgo.com/html/?q=number+of+electric+utilities+worldwide+EIA+3000+US+utilities+transmission+distribution+companies
33. Zoekresultaat-synthese, **aantal DSO's in de EU (EU DSO Entity: ≈800–850)** — https://html.duckduckgo.com/html/?q=number+of+DSOs+in+Europe+2400+distribution+system+operators+EU+DSO+entity

### Commerciële / afgeleide bronnen [C] — richtinggevend, niet als hard cijfer te gebruiken

34. AKIM Engineering, **Oracle Primavera price list** (P6 Professional 3.880 USD; P6 EPPM 4.240 USD; Primavera Risk Analysis 10.450 USD; Progress Reporter 1.460 USD) — https://www.akimeng.com/oracle-primavera-price-list.html
35. VendorBenchmark, **Oracle Primavera P6 Pricing** (22% SULS, contractwaarden, sectorkortingen) — https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing
36. Growth Market Reports, **Shutdown and Turnaround Optimization Software Market** (1,42 mld USD 2024 → 3,44 mld USD 2033, CAGR 10,2%; regionale opsplitsing; vendorlijst) — https://growthmarketreports.com/report/shutdown-and-turnaround-optimization-software-market
37. Zoekresultaat-synthese, **PPM-softwaremarktomvang (Grand View 5,7 mld USD 2024 → 12,3 mld 2030, CAGR 14,2%; Research Nester; Fortune Business Insights; Verified Market Research)** — https://html.duckduckgo.com/html/?q=project+portfolio+management+software+market+size+2025+grand+view+research+billion+energy+utilities+segment
38. Zoekresultaat-synthese, **Oracle Primavera Cloud prijsstelling (module-gebaseerd, min. 5 gebruikers, Progress Cloud 144 USD/gebruiker/jaar)** — https://html.duckduckgo.com/html/?q=Oracle+Primavera+Cloud+pricing+per+user+per+month+list+price+2025
39. Zoekresultaat-synthese, **P6-abonnementsprijzen en perpetual listprijzen** — https://lite.duckduckgo.com/lite/?q=Primavera+P6+EPPM+price+list+named+user+plus+perpetual+USD
40. Zoekresultaat-synthese, **Safran Project prijsstelling (vanaf ≈150 USD/gebruiker/maand)** — https://html.duckduckgo.com/html/?q=Safran+Project+pricing+per+user+cost+license+annual
41. Zoekresultaat-synthese, **gebruikersklachten over Primavera P6 en genoemde alternatieven** — https://html.duckduckgo.com/html/?q=Primavera+P6+complaints+outdated+clunky+expensive+reddit+schedulers+alternatives
42. Zoekresultaat-synthese, **EAM/werkbeheer bij nucleaire utilities (Asset Suite-gebruikers, Maximo 14.000+ organisaties, eSOMS 430+ sites)** — https://html.duckduckgo.com/html/?q=Asset+Suite+Passport+nuclear+utilities+customers+list+eSOMS+Maximo+nuclear+work+management
43. Zoekresultaat-synthese, **EcoSys (Hexagon/Sequence), InEight, Contruent (ex-ARES PRISM) in energie/nutsbedrijven/nucleair** — https://html.duckduckgo.com/html/?q=Hexagon+EcoSys+InEight+ARES+PRISM+project+controls+energy+utility+nuclear+owner+EPC
44. Zoekresultaat-synthese, **offshore wind: Shoreline Wind, P6, digital twin voor installatielogistiek** — https://html.duckduckgo.com/html/?q=offshore+wind+farm+installation+scheduling+software+project+controls+P6+Shoreline+Sereno
45. Zoekresultaat-synthese, **capital project portfolio management bij netbeheerders (CenterPoint Energy/Think Power, PMOLink)** — https://html.duckduckgo.com/html/?q=utility+capital+project+portfolio+management+software+Primavera+P6+transmission+distribution+grid
46. Zoekresultaat-synthese, **salarissen nuclear scheduler / outage coordinator; vacatureaantallen** — https://html.duckduckgo.com/html/?q=nuclear+outage+scheduler+salary+planner+number+of+schedulers+per+plant+outage+control+center
47. Zoekresultaat-synthese, **markt "outage management system software" (2,45 mld USD 2024) — expliciet uitgesloten wegens andere definitie (distributienetstoringen)** — https://html.duckduckgo.com/html/?q=shutdown+turnaround+outage+management+software+market+size+report
48. Zoekresultaat-synthese, **BIM/digital twin in nucleaire nieuwbouw (Sizewell C, AtkinsRéalis, Amentum)** — https://html.duckduckgo.com/html/?q=Sizewell+C+BIM+digital+twin+IFC+openBIM+nuclear+construction+data+standard
49. Zoekresultaat-synthese, **EPRI outage management benchmarking; nucleaire outage best practices** — https://html.duckduckgo.com/html/?q=EPRI+outage+scheduling+report+nuclear+critical+path+Primavera+best+practices
50. Zoekresultaat-synthese, **Arcadis Global Construction Disputes Report 2025 (geschilwaarde Noord-Amerika +40% in 2024; PDF-primairbron gaf 404)** — https://html.duckduckgo.com/html/?q=Arcadis+global+construction+disputes+report+2025+energy+average+dispute+value+duration

### Bronnen die niet toegankelijk waren (transparantie)

- Oracle officiële Construction & Engineering-prijslijst (PDF) — 404
- Oracle Primavera Cloud pricing-pagina — 404
- IEA World Energy Investment 2025 (rapport- en persberichtpagina's) — 403
- Arcadis Global Construction Disputes Report 2025 (PDF) — 404
- IAEA TECDOC-1806 (PDF) — 402
- ITQlick Primavera P6 pricing — 403
- Humphreys & Associates DOE O 413.3B — 403
- Mojeek zoekmachine — 403
- Taradigm P6-prijzenpagina — leeg antwoord
- FindPM Software Primavera Cloud — 404

---

## 11. Bijlage: samenvattende tabel software

| Product | Leverancier | Rol | Indicatieve prijs | Positie in deze sector |
|---|---|---|---|---|
| Primavera P6 Professional | Oracle | CPM-scheduler (desktop/standalone) | 3.880 USD/named user perpetual + 22% support [C] | De facto standaard; contractueel voorgeschreven (UFGS/USACE) [B] |
| Primavera P6 EPPM | Oracle | Enterprise CPM + portfolio | 4.240 USD/named user perpetual, of 250–400 USD/gebr./mnd [C] | Ruggengraat bij owners en nucleaire vloten |
| Oracle Primavera Cloud | Oracle | Cloud-CPM + taakbeheer | module-abonnement, min. 5 gebruikers [C] | Migratiepad; heronderhandelingsmoment |
| Primavera Risk Analysis | Oracle | Kwantitatieve SRA | 10.450 USD/user [C] | Legacy, verliest terrein aan Safran Risk |
| Deltek Open Plan | Deltek | EVMS-scheduler | niet openbaar | DOE/NNSA-contractors; DCMA-14 en DECM ingebouwd [A] |
| Deltek Cobra | Deltek | EVM-kostenmotor | niet openbaar | DOE-erkend [A]; "authority for time-phased budget dollars" [B] |
| Deltek Acumen Fuse / Touchstone | Deltek | Schedulekwaliteit + inleverportaal | niet openbaar | 600+ metrieken incl. DCMA/DOE/NASA/GAO/AACE; PARS-inname [A] |
| Safran Project / Planner | Safran | All-in-one scheduler + risico | vanaf ≈150 USD/gebr./mnd [C] | NW-Europa, olie & gas, offshore |
| Safran Risk | Safran | Kwantitatieve SRA | niet openbaar | DOE-erkend [A]; sterkste SRA volgens branche-expert [A] |
| Asset Suite EAM | Hitachi Energy | Nucleair werkbeheer/EAM | niet openbaar | AP-913/AP-928-compliant; Exelon, AEP, FPL, Entergy [A][C] |
| IBM Maximo | IBM | EAM | niet openbaar | 14.000+ organisaties, incl. nucleair [C] |
| eSOMS | Emerson/Ovation | Shift operations management | niet openbaar | 430+ sites wereldwijd [C] |
| Prometheus STO Management Suite | Prometheus Group | Turnaround/outage-orkestratie bovenop SAP+P6 | niet openbaar | Vult expliciet het P6-gat: scope, discovered work, isolaties [A] |
| EcoSys / Sequence Enterprise | Hexagon | Kosten + portfolio | niet openbaar | Owner/operator én EPC [C] |
| Contruent Enterprise (ex-ARES PRISM) | Contruent | Kosten, risico, forecast, EVM | niet openbaar | Kapitaalintensieve projecten [C] |
| InEight | InEight | Enterprise project controls | niet openbaar | Megaprogramma's [C] |
| ACE / WebEVM / Empower / forProject | AzTech / DecisionEdge / Encore / forProject | EVM | niet openbaar | Alle vier op de DOE EVM-toolslijst [A] |
| Shoreline (Design/Execution) | Shoreline Wind | Offshore-windsimulatie en -optimalisatie | niet openbaar | Weersvenster, vaartuigen, bemanning; klant TEPCO RP [C] |
| LOGOS / RAVEN / DACKAR / SOAT | INL / DOE (open source) | Outage-optimalisatie, variantiepropagatie, NLP | gratis (open source) | Overheidsgefinancierd open source bovenop P6-data [A] |
| Microsoft Project | Microsoft | Scheduler | ≈10–55 USD/gebr./mnd | Onderaannemers; niet contractueel geaccepteerd |
| ScheduleReader / Steelray / ScheduleLens | div. | XER-viewer + DCMA-14 | laag (tientallen tot honderden USD) | Symptoom van het licentiegat in de keten [B] |
