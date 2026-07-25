# Marktonderzoek: projectplanning-/schedulingsoftware in de Golfstaten (GCC)

**Regio:** Saoedi-Arabië (KSA), Verenigde Arabische Emiraten (VAE), Qatar, Koeweit, Oman, Bahrein
**Peildatum onderzoek:** juli 2026
**Scope:** software met Gantt/CPM-functionaliteit voor projectplanning en -scheduling — bouwspecifiek, generiek én lokaal/regionaal
**Taal van onderzoek:** Engels + Arabisch (بريمافيرا، جدولة المشاريع، برامج إدارة المشاريع الإنشائية)

---

## 0. Leeswijzer en betrouwbaarheid van bronnen

Bij elk cijfer staat een bron-URL. Waar ik zelf reken of extrapoleer, staat expliciet **[SCHATTING]** met de redenering erbij.

Belangrijke waarschuwing over bronkwaliteit — deze markt is slecht gedocumenteerd in onafhankelijk onderzoek:

| Bronklasse | Voorbeelden | Betrouwbaarheid |
|---|---|---|
| Primaire vendor-/klantcommunicatie | Oracle-persberichten, Ashghal-tenderdocumenten, Aramco SAEP-331 | **Hoog** |
| Onafhankelijke marktjournalistiek | MEED, Arab News, Argaam, Gulf News, Khaleej Times | **Hoog** |
| Salaris-/vacaturedata-aggregators | GulfTalent, Naukrigulf, Glassdoor, Bayt, Jooble | **Middel** (zelfgerapporteerd, veel ruis) |
| Marktonderzoeksbureaus | Ken Research, Market Research Future, IMARC, Mordor | **Laag–middel** — zie §2.2: ze spreken elkaar met een factor 20 tegen |
| Trainingsaanbieder-blogs | Edoxi, Gulf Certifications, Time Training, Zabeel | **Laag** — commercieel belang bij "P6 is verplicht, koop onze cursus". Hun *kwalitatieve* claims sluiten wel aan bij primaire bronnen; hun *percentages* zijn vaak onnavolgbaar |
| Prijsvergelijkingssites | prmyazilim, VendorBenchmark, ITQlick, Taradigm | **Middel** — lijstprijzen kloppen ordegrootte-gewijs, maar Oracle publiceert geen officiële prijslijst meer |

Ik heb bewust de trainingsaanbieder-claims (bijv. "80% van GCC-overheidsprojecten gebruikt Primavera") wél opgenomen, maar telkens gemarkeerd als **niet-verifieerbaar**.

---

## 1. Samenvatting

**De kern in zeven punten:**

1. **Oracle Primavera P6 is geen marktleider — het is de facto de enige geaccepteerde valuta.** In tenderdocumenten van tier-1-opdrachtgevers (Saudi Aramco, ADNOC, Ashghal, RTA Dubai, QatarEnergy, KNPC, Etihad Rail, Aldar, ADPIC) zou P6 bij naam genoemd staan, en het indienen van een MS Project-bestand zou een bod kunnen diskwalificeren. ([gulfcertifications.com](https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction), [timetraining.ae](https://www.timetraining.ae/learninghub-detail/should-document-controllers-learn-Primavera))
   > **[VERIFICATIE — onbevestigd]** Deze stelling is *plausibel maar niet hardgemaakt*. Ze rust uitsluitend op trainingsaanbieder-blogs (bronklasse "Laag" volgens §0). Het enige primaire document dat het rapport ervoor aanvoerde — Ashghal STC-051 — blijkt bij tekstextractie een **IT-licentieverlengingstender uit 2017** te zijn zonder één woord over schema-eisen aan aannemers (zie §5.1). Het *indirecte* bewijs blijft sterk (85 P6 EPPM-seats bij Ashghal, 23.000 Oracle-gebruikers bij Red Sea Global, een volledig Oracle-gecentreerd resellerkanaal, P6 als standaardeis in vacatures), maar behandel "contractueel verplicht" als sectorconsensus, niet als gedocumenteerd feit.

2. **De onderliggende bouwmarkt is enorm maar krimpt op korte termijn.** GCC-contractgunningen: **$273,2 mrd in 2024** (+9,6% t.o.v. $249,4 mrd in 2023), waarvan Saoedi-Arabië **$146,8 mrd** (53,8%). ([Kamco Invest via AGBI](https://www.agbi.com/construction/2025/01/contracts-in-saudi-arabia-rise-25-in-value-in-2024/)) *(Gecorrigeerd: MEED's eerder geciteerde $264,4 mrd / $142,4 mrd zijn voorlopige cijfers; de definitieve jaartelling ligt hoger — zie §2.1 en §9.)* In 2025 sloeg dit om: Saoedische gunningen daalden in H1-2025 met **56%** j-o-j. ([MEED Projects](https://www.meedprojects.com/digital-library/meed-report-gcc-projects-market-performance-h1-2025/)) De pre-executie-pijplijn blijft wel **~$1,78 biljoen**. ([Khaleej Mag / MEED-data](https://khaleejmag.com/business/saudi-arabia-dominates-gcc-projects-market-in-q3-2025-with-28-1-billion-in-awards/))

3. **De softwaremarkt zelf is klein in verhouding tot de bouwmarkt.** Mijn bottom-up schatting voor *pure planning-/schedulinglicenties* in de GCC: **~USD 43 mln per jaar (2025), bandbreedte $30–80 mln** [SCHATTING, zie §2.3 — naar beneden bijgesteld van ~$55 mln na correctie van de cloudprijs, §3.2]. De veel geciteerde "$1,2 mrd GCC construction project management software"-cijfers ([Ken Research](https://www.kenresearch.com/gcc-construction-project-management-software-market)) betreffen een veel bredere scope (PMIS, documentbeheer, ERP, veldapps) — en een tweede bureau komt op **$53 mln** voor dezelfde regio ([Market Research Future](https://www.marketresearchfuture.com/reports/gcc-construction-software-market-45912)). Die factor-23-discrepantie is een rode vlag voor beide.

4. **De dienstenlaag is ~8–9× groter dan de licentielaag.** Training + planning-/claimsconsultancy schat ik op **~$370 mln/jaar** tegenover ~$43 mln licenties [SCHATTING, §2.4]. Wie hier geld verdient, verdient het met mensen, niet met software.

5. **"Hoogste betalingsbereidheid per planner ter wereld" is maar half waar.** Op *organisatieniveau* klopt het: giga-projectopdrachtgevers kopen enterprise-Oracle-stacks zonder prijsgevoeligheid (Red Sea Global: **23.000+ gebruikers** op Aconex + P6, [Oracle](https://www.oracle.com/middleeast/news/announcement/oracle-to-help-improve-construction-visibility-and-results-for-red-sea-global-2026-01-27/)). Op *planner-salarisniveau* klopt het niet: senior planners in Dubai verdienen AED 15.000–28.000/mnd (~$49k–92k/jaar, belastingvrij) — goed, maar niet wereldtop. En eronder ligt een enorme onderkant van kleine aannemers die Excel of gekraakte P6 draaien.

6. **Er is nauwelijks een lokaal/regionaal CPM-pakket.** De "lokale" spelers zijn óf resellers/implementatiepartners van Oracle (ImageGrafix, CAD Gulf, ORBIT ME, Promastar, FastVision KSA), óf regionale PMIS/ERP-platformen zónder serieuze CPM-engine (PMWeb via CMCS, ePROMIS, Buildo, Optivize, Milestone KSA, FirstBit, Arkan). Voor het kritieke pad gaat men altijd terug naar P6.

7. **Structurele belemmeringen voor nieuwe toetreders:** contractuele P6/XER-verplichting *(sectorconsensus, niet gedocumenteerd — zie punt 1)*, Saoedische RHQ-eis voor overheidsopdrachten **boven SAR 1 mln** sinds 1-1-2024 *(met sinds april 2026 een geformaliseerd uitzonderingskader, §5.7)*, 15% bronbelasting op royalty's in KSA, en een opleidingsindustrie die 20 jaar lang alleen P6 heeft geleerd.

---

## 2. Marktomvang

### 2.1 De onderliggende bouwmarkt (fundament voor elke schatting)

| Metriek | Waarde | Jaar | Bron |
|---|---|---|---|
| GCC-projectgunningen totaal **[GECORRIGEERD]** | **$273,2 mrd** (+9,6%) | 2024 | [Kamco Invest via AGBI](https://www.agbi.com/construction/2025/01/contracts-in-saudi-arabia-rise-25-in-value-in-2024/), [Muscat Daily](https://www.muscatdaily.com), [Enterprise AM](https://enterpriseam.com) |
| KSA-aandeel daarin **[GECORRIGEERD]** | **$146,8 mrd** (53,8%) | 2024 | idem |
| GCC-contractgunningen bouw *(voorlopig cijfer)* | $264,4 mrd (+6%) | 2024 | [MEED](https://www.meed.com/gcc-construction-industry-evolves) |
| KSA-aandeel daarin *(voorlopig cijfer)* | $142,4 mrd (>50%) | 2024 | [MEED](https://www.meed.com/gcc-construction-industry-evolves) |
| GCC-contractgunningen | $249,4 mrd | 2023 | MEED én Kamco — **identiek in beide bronnen** |
| GCC pre-executie-pijplijn totaal | **~$1,78 biljoen** (bouw $624,2 mrd, transport $300 mrd, energie $294,2 mrd) | Q3-2025 | [Khaleej Mag](https://khaleejmag.com/business/saudi-arabia-dominates-gcc-projects-market-in-q3-2025-with-28-1-billion-in-awards/) |
| Vision 2030-bouw-/vastgoedcommitment | **~$1 biljoen** | doorlopend | [MEED](https://www.meed.com/gcc-construction-industry-evolves) |
| KSA-bouwmarkt (jaarlijkse output) | **$101,4 mrd** → $140,4 mrd in 2034 (CAGR 3,6%) | 2025 | [IMARC](https://www.imarcgroup.com/saudi-arabia-construction-market) |
| KSA-bouwmarkt (afwijkende schatting) | **$133,8 mrd** (2025) → $142,3 mrd (2026), CAGR 5,52% | 2025 | [Mordor via MarketResearch.com](https://www.marketresearch.com/Mordor-Intelligence-LLP-v4018/Saudi-Arabia-Construction-Share-Trends-45181694/) |
| VAE-bouwmarkt | **$45,8 mrd** → $69 mrd in 2034 (CAGR 4,66%) | 2025 | IMARC, geciteerd via [timetraining.ae](https://www.timetraining.ae/learninghub-detail/should-document-controllers-learn-Primavera) |

> **[VERIFICATIE — gecorrigeerd]** De oorspronkelijk geciteerde MEED-cijfers ($264,4 mrd / KSA $142,4 mrd) worden door geen enkele andere bron gereproduceerd. Vier onafhankelijke publicaties (Kamco Invest' jaarrapport, AGBI, Muscat Daily, Enterprise AM) komen consistent uit op **$273,2 mrd** GCC-totaal en **$146,8 mrd** voor KSA. Beide reeksen delen exact dezelfde 2023-basis van $249,4 mrd en zijn intern consistent (249,4 × 1,06 = 264,4; 249,4 × 1,096 = 273,4), wat erop wijst dat MEED een **voorlopige** telling publiceerde en Kamco de definitieve. Gebruik $273,2 mrd / $146,8 mrd. Het verschil van ~3% verandert geen enkele conclusie in dit rapport.

**Conjunctuuromslag 2025–2026 — belangrijk voor elke groeiverwachting:**

- Saoedische gunningen H1-2025: **−56%** j-o-j; bouw specifiek **−40%**. ([MEED Projects](https://www.meedprojects.com/digital-library/meed-report-gcc-projects-market-performance-h1-2025/))
- GCC jan–mei 2025: **$67 mrd** vs. **$110 mrd** in dezelfde periode 2024. ([Modern Construction 360](https://modernconstruction360middleeast.com/gcc-construction-market-slows/))
- Q1-2025 KSA: van $33,9 mrd (Q1-2024) naar **$17 mrd**. ([GCC Business Watch](https://gccbusinesswatch.com/news/gcc-project-market-set-for-strong-2025-despite-q1-slowdown-driven-by-saudi-and-uae-pipelines/))
- De VAE nam het stokje over: **~$31 mrd** aan gunningen in 2025 vs. KSA $20,6 mrd. ([Gulf News](https://gulfnews.com/business/economy/uae-overtakes-saudi-arabia-in-project-awards-as-kingdom-eases-up-1.500177820))
- Q3-2025 draaide KSA weer bij: **$28,1 mrd**. ([Arab News](https://www.arabnews.com/node/2618623/business-economy))
- Koeweit: **$6,27 mrd** in de eerste vier maanden van 2026 ([Times Kuwait](https://timeskuwait.com/kuwait-awards-contracts-worth-6-27-bln-in-first-four-months-of-2026/)); Q2-2026 **~$2 mrd**, +49,1% j-o-j ([Edge Consultancy](https://edgeconsultancykw.com/kuwait-project-awards-q2-2026/)).

**Aantal marktpartijen (KSA):**
- **~117.000** aannemers geregistreerd bij de Saudi Contractors Authority. ([Arab News](https://www.arabnews.com/node/2650710/business-economy))
- **365.120** bouwvestigingen in 2025 (+29,6% t.o.v. 281.820 in 2024), met **4,4 mln** werknemers. ([Argaam](https://www.argaam.com/en/article/articledetail/id/1921206))

Die 117.000 vs. 365.120 laten meteen de tweedeling zien: een handvol tier-1-partijen op giga-projecten (die enterprise-P6 draaien) en tienduizenden micro-aannemers (die niets van dit alles kopen).

### 2.2 Gepubliceerde softwaremarktcijfers — en waarom ze elkaar tegenspreken

| Bron | Scope | Omvang | Jaar | Groei |
|---|---|---|---|---|
| [Ken Research](https://www.kenresearch.com/gcc-construction-project-management-software-market) | GCC construction PM software | **$1,2 mrd** | basisjaar **2024** | forecast **2025–2030**; **op de bronpagina staat géén CAGR** — zie waarschuwing hieronder |
| [Research and Markets](https://www.researchandmarkets.com/report/middle-east-construction-project-management-software-market) | idem (zelfde onderliggende Ken-rapport) | **$1,2 mrd** | 2023–2024 basis | forecast t/m 2030 |
| [Market Research Future](https://www.marketresearchfuture.com/reports/gcc-construction-software-market-45912) | GCC construction software | **$50,0 mln** (2024) → $53,13 mln (2025) → $97,5 mln (2035) | 2024 basis | **CAGR 6,26%** |

**Factor 23 verschil.** Mijn lezing:

> **[VERIFICATIE — gecorrigeerd]** Het Ken Research-drietal "$1,2 mrd (2024) → $2,5 mrd (2031) bij CAGR 16,75%" is **wiskundig onmogelijk**. Nagerekend: $1,2 mrd bij 16,75% over 7 jaar geeft **$3,64 mrd**, niet $2,5 mrd; omgekeerd impliceert $1,2 → $2,5 mrd over 7 jaar een CAGR van **11,1%**. De 16,75% klopt alleen bij een looptijd van ~4,7 jaar. Controle van de bronpagina zelf levert bovendien op: basisjaar 2024, forecastperiode **2025–2030**, en **geen gepubliceerde CAGR**. De 16,75% en het jaartal 2031 zijn dus niet uit deze bron afkomstig en zijn hier verwijderd. Dit versterkt het oordeel over de bron: niet alleen de scope is te breed, de cijferreeks is ook intern inconsistent.

- Ken Research's $1,2 mrd is te ruim genomen: hun vendorlijst (Oracle, Autodesk, SAP, Procore, Trimble, PlanGrid, Aconex, Viewpoint, e-Builder, CMiC, CoConstruct, Buildertrend, Bluebeam, Deltek, RIB) omvat ERP, documentbeheer, takeoff, veldapps en BIM-samenwerking. Dat is de héle bouw-IT-stack, niet planning.
- MRFR's $53 mln is te krap voor "alle bouwsoftware" maar ligt verrassend dicht bij mijn eigen bottom-up schatting van de *planning*-deelmarkt.
- Beide bureaus geven segmentcijfers die verdacht rond zijn ($30,0–60,0 mln cloud; $20,0–37,5 mln on-premise bij MRFR) — dat is gemodelleerd, niet gemeten.

Ken Research citeert daarnaast als drivers: **"45% van de firma's implementeert projectmanagementsoftware"** en **bouwvertragingen kosten ~$12 mrd per jaar** in de regio. Beide zonder verifieerbare onderbouwing — behandel als indicatief.

**Wereldwijde referentiepunten** (context, geen GCC-cijfer):
- Oracle Primavera Suite: **20,05%** marktaandeel in de "project-management"-categorie. ([6sense](https://6sense.com/tech/project-management/oracle-primavera-suite-market-share))
- Bouwsoftware wereldwijd: Procore leidt met **7,4%**, gevolgd door Autodesk, Oracle en Bentley. ([Apps Run The World](https://www.appsruntheworld.com/top-10-construction-software-vendors-market-size-and-market-forecast/))
- Datanyze meet Primavera P6 op **0,69% / 1.564 bedrijven** ([Datanyze](https://www.datanyze.com/market-share/project-management--217/oracle-primavera-p6-market-share)) — dit is een web-technografiemeting die on-premise desktopsoftware structureel onderschat en dus **onbruikbaar** is voor P6.

### 2.3 Eigen bottom-up schatting: planners × prijs

**[SCHATTING — volledige redenering onderstaand]**

**Stap 1 — jaarlijkse bouwoutput GCC (2025)**

| Land | Output | Bron |
|---|---|---|
| Saoedi-Arabië | $101,4–133,8 mrd → neem **$115 mrd** | IMARC / Mordor (zie §2.1) |
| VAE | **$45,8 mrd** | IMARC via timetraining.ae |
| Qatar + Koeweit + Oman + Bahrein | **~$45 mrd** [SCHATTING — geen directe bron gevonden; afgeleid uit hun aandeel in GCC-gunningen, waarbij KSA+VAE samen ~75–80% van de gunningen vormen] | — |
| **Totaal GCC** | **~$205 mrd/jaar** (bandbreedte $190–240 mrd) | |

**Stap 2 — plannerdichtheid**

Vuistregel uit de praktijk in de Golf: op een project van $100 mln jaarlijkse bestedingen zitten in de hele keten (aannemer + PMC/consultant + opdrachtgever + hoofdonderaannemers) doorgaans **4–7 toegewijde planning-/project-controls-medewerkers**. Dat is aan de hoge kant t.o.v. Europa, precies omdat de contractuele rapportageverplichtingen hier zwaarder zijn (Level 3/4-programma's, maandelijkse updates, EOT-onderbouwing).

→ **1 planner per $14,3–25 mln jaarlijkse output** *(nagerekend: 100/7 = $14,3 mln, niet $15 mln)* → $205 mrd / $20 mln = **~10.250 planners** (bandbreedte 8.200–14.300).

Daar bovenop, niet gedekt door de "construction market"-cijfers:
- olie & gas-EPC (Aramco, ADNOC, KNPC, PDO, QatarEnergy) — planner-intensief;
- hoofdkantoor-/portfolioplanners, PMO's, Mashroat-achtige overheidsprogrammabureaus;
- claims-/forensische planners bij consultancies.

→ opslag **+35%** → **~14.000 planners**, bandbreedte **12.000–20.000**.

**Kruiscontrole via vacatures** (juli 2026):

| Bron | Vacatures | Scope |
|---|---|---|
| [Naukrigulf](https://www.naukrigulf.com/planning-engineer-primavera-planner-jobs) | **857** | "planning engineer primavera planner" |
| [Naukrigulf](https://www.naukrigulf.com/primavera-p6-jobs) | **344** | Primavera P6, Dubai |
| [Jooble KSA](https://sa.jooble.org/jobs-primavera-p6/Saudi-Arabia) | **196** | Primavera P6, Saoedi-Arabië |
| [Bayt](https://www.bayt.com/en/international/jobs/primavera-p6-jobs/) | **150+** | Midden-Oosten |
| [Bayt](https://www.bayt.com/en/uae/jobs/primavera-p6-jobs/) | **70+** | VAE |
| Edoxi (aanbiederclaim) | **400+** | actieve P6-vacatures VAE, 2026 — via [timetraining.ae](https://www.timetraining.ae/learninghub-detail/should-document-controllers-learn-Primavera) |

Na correctie voor overlap tussen boards: **~1.500–2.500 gelijktijdig openstaande P6-rollen** in de GCC. Advertenties leven ~6 weken → ~13.000–21.500 plaatsingen/jaar → gedeeld door ~3 voor duplicaten/bureaus → **~4.500–7.000 echte aanwervingen/jaar**. Bij de voor de Golf typische expat-verloopsnelheid van 30–40% impliceert dat een basis van **~12.000–20.000 planners**. ✅ Consistent met stap 2.

**Aangenomen: 15.000 toegewijde planners/schedulers in de GCC (2025–2026).** [SCHATTING]

**Stap 3 — secundaire gebruikers**

Per toegewijde planner zijn er 3–6 "consumenten" van het schema (projectmanagers, uitvoerders, kostendeskundigen, documentcontrollers, opdrachtgeversvertegenwoordigers) die read-only-, Team Member- of viewer-toegang nodig hebben.

→ **45.000–90.000 secundaire seats**, waarvan een groot deel op gratis viewers (ScheduleReader-demo's, PDF-exports) of goedkope Team Member-licenties draait.

**Stap 4 — effectieve prijs per seat**

Lijstprijzen (§4) versus wat er in de Golf werkelijk betaald wordt. Oracle geeft in deze regio routinematig **25–50% volumekorting** op enterprise-deals (giga-projecten met 500–5.000 seats). Effectieve jaarlijkse kosten per toegewijde plannerseat, gemengd over perpetual (geamortiseerd over 5 jaar + 22% support) en cloud:

*Oorspronkelijke berekening (op basis van de inmiddels weerlegde $305-cloudprijs):*
- Perpetual P6 Professional: $3.880 / 5 jaar = $776 + support $854/jaar ≈ $1.630/jaar lijst → na korting ~$1.000–1.300
- P6 Cloud: $305/mnd = $3.660/jaar lijst → na korting ~$1.800–2.700
- Gewogen gemiddelde: ~$1.700/jaar

> **[VERIFICATIE — gecorrigeerd]** De cloudprijs is aantoonbaar te hoog ingezet (zie §3.2). Herberekening met de gepubliceerde resellerprijzen:
> - **Perpetual P6 Professional**: lijst $3.520–3.880, neem $3.700 → /5 jaar = $740 + 22% support ($814) = **$1.554/jaar lijst** → na 25–50% korting ≈ **$780–1.165**
> - **Oracle Primavera Cloud – Schedule**: $130/mnd = **$1.560/jaar lijst** → na 25–50% korting ≈ **$780–1.170**
>
> Beide routes convergeren nu op ongeveer hetzelfde punt, wat de schatting juist robuuster maakt. Gewogen gemiddelde: **~$975/jaar, afgerond ~$1.000** — niet $1.700. De oorspronkelijke aanname was **~70% te hoog**.

**Stap 5 — de rekensom [HERZIEN]**

| Component | Berekening | Jaarlijks |
|---|---|---|
| Toegewijde plannerseats | 15.000 × **~$1.000** *(was: × $1.700 = $25,5 mln)* | **~$15 mln** |
| Secundaire/viewer/Team Member-seats | 60.000 × ~$130 | **~$8 mln** |
| Enterprise-platformlaag (P6 EPPM-servers, Analytics, integratie, hosting) bij ~200 grote opdrachtgevers/PMC's/tier-1-aannemers, alleen het planningsdeel | 200 × ~$100k | **~$20 mln** |
| **Totaal pure planning-/schedulingsoftware GCC** | | **~$43 mln/jaar** |

**Uitkomst [GECORRIGEERD]: ~USD 43 mln per jaar (2025), bandbreedte $30–80 mln.** [SCHATTING] De eerder genoemde ~$55 mln blijft binnen de bandbreedte, maar ligt aan de bovenkant en berustte op een te hoge cloudprijs.

**Twee onafhankelijke plausibiliteitscontroles op de overige twee regels:**

- *Viewer-seats (~$130/jaar):* bevestigd door de OPC Progress-tier van $14/maand = $168/jaar lijst, wat na korting ~$85–125 wordt. Met een deel gratis viewers is $130 gemengd eerder iets aan de hoge kant. ([CMC Project Solutions](https://www.cmcprojectsolutions.com/primavera/shop/))
- *Enterprise-laag (~$100k per organisatie):* onafhankelijk bevestigd door een primair document. Ashghal (Qatars Public Works Authority — een van de grootste overheidsopdrachtgevers in de GCC) kocht in zijn eigen aanbesteding **85 Primavera P6 EPPM-licenties + 85 PCM-licenties**. Alleen al de jaarlijkse support daarop bedraagt ~85 × $933 ≈ **$79.000/jaar**. Dat ligt opvallend dicht bij de aangenomen ~$100k. ([Ashghal STC-051](https://www.ashghal.gov.qa/en/Tenders/TenderBriefDocuments/Project%20Brief-%20STC-%20051.pdf), tekstextractie) Tegelijk relativeert het de schaal: zelfs een top-tier staatsopdrachtgever draait op **85 seats**, niet duizenden.

Per land, ruwweg naar rato van bouwoutput [SCHATTING, herschaald naar het gecorrigeerde totaal]:
- Saoedi-Arabië ~$23 mln (55%)
- VAE ~$9,5 mln (22%)
- Qatar ~$4,5 mln (11%)
- Koeweit ~$3 mln (7%)
- Oman ~$1,7 mln (4%)
- Bahrein ~$0,9 mln (2%)

*(Let op: deze percentages tellen op tot 101% door afronding; het zijn ordegrootte-indicaties, geen gemeten aandelen.)*

**Groei [SCHATTING]:** de licentiemarkt groeit langzamer dan de "16,75% CAGR" van Ken Research suggereert, omdat (a) contractgunningen in 2025 fors daalden, (b) P6-penetratie bij de doelgroep al ~verzadigd is, en (c) de groei zit in *cloud-migratie* (hogere ARPU) en *aangrenzende modules*, niet in nieuwe planners. Realistisch: **5–9% per jaar** over 2026–2031, met opwaartse uitschieters als de Saoedische pijplijn weer versnelt.

### 2.4 De dienstenlaag: training en consultancy

**Training [SCHATTING]:**
- Toegewijde planners: 15.000, waarvan ~20% per jaar een cursus volgt (nieuwe instroom + versiemigratie) = 3.000 zitplaatsen.
- Aspiratiemarkt (civiel/werktuigbouwkundig ingenieurs die P6 op hun cv willen): in de Golf een veelvoud, geschat **20.000–40.000 zitplaatsen/jaar** — de hoeveelheid aanbieders in Dubai alleen al (Edoxi, Zabeel, Solve Tech, BF Training, Invensis, Time Training, CAD Dubai, Wingsway…) onderbouwt dit; in Riyad idem (ESI, Pioneers Academy, HGT, Masartech, AAA, Mnar).
- Gemiddelde prijs ~AED/SAR 2.500 ≈ **$670**.
- → **$13–27 mln/jaar, centrale schatting ~$20 mln.**

**Consultancy [SCHATTING, grof]:**
- In markten met hoge geschillendichtheid ligt claims-/geschillenadvies op **0,1–0,3% van de bouwbestedingen**. Op $205 mrd → $200–600 mln/jaar.
- Daarvan is schema-/vertragingsgerelateerd (forensic delay analysis, EOT, TIA, prolongation) ruwweg **50–60%** → $120–360 mln.
- Plus niet-geschilgerelateerde project-controls-consultancy en detachering (baseline-opzet, schema-audits, PMO-inrichting, Mashroat-compliance) → nog eens $100–200 mln.
- → **$250–500 mln/jaar, centrale schatting ~$350 mln.**

De aanwezigheid van een dichte laag gespecialiseerde GCC-claimsbureaus bevestigt de ordegrootte: [Novelite](https://noveliteconsulting.com), [AHPMC](https://ahpmc.ae/services/forensic-planning-and-variation-eot-claim/), [Qualis Global](https://qualis-global.com), [CALIM](https://calim.ai/delay-analysis-consultant/), [Claimetrica](https://claimetrica.com/project-controls.html), [e-Basel](https://e-basel.com/construction-claims/time-related-claims-eot-delay-analys/), naast de internationals (HKA, Diales, Secretariat, Ankura).

**Totaal ecosysteem GCC:**

| Laag | Omvang/jaar | Zekerheid |
|---|---|---|
| Planning-/schedulinglicenties **[GECORRIGEERD]** | **~$43 mln** *(was ~$55 mln)* | schatting, ±70% |
| Training | **~$20 mln** | schatting, ±80% |
| Planning-/claimsconsultancy | **~$350 mln** | ruwe schatting, ±100% |
| **Totaal** | **~$413 mln** *(was ~$425 mln)* | |
| *Ter vergelijking: brede "construction PM software"-markt* | *$1,2 mrd (Ken Research) t/m $53 mln (MRFR)* | *onbetrouwbaar* |

**Kernconclusie over de marktomvang:** de licentiemarkt voor planningssoftware in de GCC is, in absolute zin, **klein** — vergelijkbaar met een middelgrote Europese landenmarkt — maar de *marge per seat* en de *diensten eromheen* zijn uitzonderlijk. Wie hier wil verdienen, verkoopt geen tool maar compliance.

---

## 3. Gebruikte software: rangorde, marktpositie en prijzen

### 3.1 Rangorde-overzicht

**[Rangorde is mijn eigen synthese — SCHATTING — op basis van tendervermeldingen, vacature-eisen, resellerlandschap en Oracle-persberichten. Er bestaat geen onafhankelijk marktaandeelonderzoek voor de GCC-planningsmarkt.]**

| # | Pakket | Leverancier | Positie in de GCC | Primaire gebruikers |
|---|---|---|---|---|
| 1 | **Primavera P6 (Professional + EPPM)** | Oracle | **De facto verplichte standaard**; ~70–85% van alle formele contractschema's [SCHATTING] | Alle tier-1-aannemers, PMC's, opdrachtgevers, olie & gas |
| 2 | **Microsoft Excel** | Microsoft | *De facto* nr. 2 in feitelijk gebruik; nr. 1 bij kleine aannemers/onderaannemers | Onderaannemers, MKB, look-ahead-planning, rapportage |
| 3 | **Oracle Aconex** | Oracle | Dominante CDE; hangt vast aan P6 in giga-projectdeals | Giga-projecten, PMC's, opdrachtgevers |
| 4 | **Microsoft Project** | Microsoft | Wijdverbreid maar contractueel vaak *geweigerd* voor Level 3-programma's | Consultants, kleinere projecten, IT/facility, interne planning |
| 5 | **Oracle Primavera Unifier** | Oracle | Sterke overheidspositie (Ashghal, Mashroat-omgeving) | Overheden, programmabureaus |
| 6 | **Oracle Primavera Cloud (OPC)** | Oracle | Groeiend, drukt geleidelijk P6 EPPM weg | Nieuwe giga-projectdeployments |
| 7 | **PMWeb** | PMWeb (via CMCS) | Sterkste regionale PMIS-speler; **75+ MENA-klanten** | Overheidsopdrachtgevers, PMO's |
| 8 | **Deltek Acumen Fuse** | Deltek | Niche maar invloedrijk: DCMA-14-point-schemakwaliteitscontrole | Opdrachtgevers/PMC's die schema's afkeuren, claimsbureaus |
| 9 | **Bentley SYNCHRO 4D** | Bentley Systems | Groeiende 4D-niche; ingezet op Jeddah Tower | Giga-projecten, BIM-teams |
| 10 | **Primavera Risk Analysis / Safran Risk** | Oracle / Safran | Verplicht voor QSRA op grote EPC | Olie & gas, rail, PMC's |
| 11 | **Trimble TILOS** | Trimble | Lineaire projecten (rail, pijpleidingen, wegen); via SITECH KSA + ImageGrafix | Infrastructuur, rail, olie & gas |
| 12 | **Asta Powerproject** | Elecosoft | Marginaal; "soms geaccepteerd" | Britse aannemers met GCC-vestiging |
| 13 | **Wrench SmartProject** | Wrench Solutions (India/VAE) | Regionale PMIS/EPC-speler | EPC, engineering |
| 14 | **PlanRadar** | PlanRadar (Oostenrijk) | Sterk groeiend in veldbeheer; **regionaal HQ Dubai** | Vastgoed, FM, kwaliteitscontrole |
| 15 | **ePROMIS / Buildo / Optivize / Milestone KSA / FirstBit / Arkan** | diverse regionaal | Lokale ERP/PMIS voor MKB-aannemers | Saoedische/VAE-MKB-aannemers |
| 16 | **RIB Candy / CCS** | RIB (Schneider Electric) | Niche via Zuid-Afrikaanse aannemers | Civiel, calculatie+planning gecombineerd |
| 17 | **monday.com / Smartsheet / Wrike / Asana / Zoho** | diverse | Groeiend maar *buiten* de contractuele planningsketen | Ontwikkelaars, corporate PMO's, niet-bouw |
| 18 | **ALICE Technologies / nPlan / Nodes & Links** | diverse | Vroege pilots; geen aantoonbare GCC-productieklanten gevonden | Innovatie-/PMO-pilots |
| 19 | **InEight / Hexagon EcoSys / Safran Project / Spider Project / Sciforma / Deltek Open Plan / Phoenix** | diverse | **Marginaal tot afwezig** — geen GCC-signaal gevonden | — |
| 20 | **ProjectLibre / GanttProject / OpenProject** | open source | Verwaarloosbaar in professionele context | Studenten, micro-bedrijven |

### 3.2 Tier 1 — Oracle Primavera P6

**Marktpositie.** De sterkste beschikbare formulering komt uit regionale vakpublicatie: *"Loop een grote bouwplaats op in Riyad, Dubai, Doha of Abu Dhabi en vraag de planningsingenieur wat er op zijn laptop staat. Het antwoord is bijna altijd hetzelfde: Oracle Primavera P6."* ([Gulf Certifications](https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction))

Organisaties die P6 volgens meerdere bronnen **contractueel voorschrijven**:

| Land | Organisatie | Bron |
|---|---|---|
| KSA | Saudi Aramco (via SAEP-331) | [Aramco-suppliers](https://www.aramco.com/en/what-we-do/suppliers/supplier-resources), [SAEP-331-samenvatting](https://www.scribd.com/document/698960445/SAEP-331) |
| KSA | NEOM (Shushah Island Stage 3A: "specifying the use of Primavera P6 software") | [Minimum Schedule Requirements](https://www.scribd.com/document/1060968894/Minimum-Schedule-Requirements) |
| KSA | Red Sea Global (Aconex + P6, 23.000+ gebruikers) | [Oracle persbericht](https://www.oracle.com/middleeast/news/announcement/oracle-to-help-improve-construction-visibility-and-results-for-red-sea-global-2026-01-27/) |
| VAE | ADNOC, Aldar, Etihad Rail, ADPIC, RTA Dubai | [timetraining.ae](https://www.timetraining.ae/learninghub-detail/should-document-controllers-learn-Primavera) |
| Qatar | Ashghal (Public Works Authority) — P6 + Primavera Contract Management in tenderdocumenten | [Ashghal tenderdocument STC-051](https://www.ashghal.gov.qa/en/Tenders/TenderBriefDocuments/Project%20Brief-%20STC-%20051.pdf), [Ashghal APMS](https://www.ashghal.gov.qa/en/pages/apmstraining.aspx) |
| Qatar | QatarEnergy, Kahramaa, Qatar Free Zones Authority | [Edoxi](https://www.edoxi.com/studyhub-detail/why-primavera-becoming-standard-for-government-projects-qatar) *(aanbiederbron)* |
| Koeweit | Kuwait National Petroleum Company | [Gulf Certifications](https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction) |

Aanvullende — **niet-verifieerbare** — adoptiepercentages uit trainingsaanbiederbronnen ([Edoxi](https://www.edoxi.com/studyhub-detail/why-primavera-becoming-standard-for-government-projects-qatar)):
- 75% van Qatars grote infrastructuurtenders eist Primavera-gecertificeerde planners (toegeschreven aan Gulf Times 2025)
- 80% van GCC-overheidsprojecten gebruikt Primavera voor compliance-rapportage (toegeschreven aan MEED Insights 2024)
- 68% van projectmanagementvacatures in de regio vraagt Primavera-kennis (toegeschreven aan GulfTalent)
- +35% j-o-j groei van Primavera-vacatures in Qatar (Bayt.com 2025)

Ik heb geen van deze vier percentages in de oorspronkelijke bron kunnen terugvinden. **Behandel ze als marketing, niet als data.**

**Prijzen (lijstprijzen, USD, juni 2025):**

| Product | Prijs | Support 1e jaar | Bron |
|---|---|---|---|
| P6 Professional (named user, perpetual) | **$3.880** | $854 (22%) | [prmyazilim](https://prmyazilim.com/en/primavera-p6-pricing) |
| P6 Enterprise/EPPM (named user, perpetual) | **$4.240** | $933 (22%) | [prmyazilim](https://prmyazilim.com/en/primavera-p6-pricing) |
| P6 Professional (alternatieve notering) | **$3.520** | — | [ProjectManagerTemplate](https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models) |
| P6 EPPM basislicentie (alternatief) | **$2.750** per application user | $605 | idem |
| Reseller-instapprijs | vanaf **$3.100–3.500** | — | idem / [PrimaveraScheduling](https://primaverascheduling.com/home/buy-primavera-software/) |
| P6 Cloud *(claim prmyazilim — zie correctie hieronder)* | $305 / gebruiker / maand, minimaal 25 gebruikers | inbegrepen | [prmyazilim](https://prmyazilim.com/en/primavera-p6-pricing) |
| Oracle Primavera (samengesteld) | **$175 / gebruiker / maand** | — | [ContractorsAndBuilders](https://contractorsandbuilders.com/pricing/oracle-primavera/) |
| Bandbreedte over alle modellen | **$3.000–25.000 per gebruiker/jaar** | — | [VendorBenchmark](https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing) |

**Onderhoud: 22% per jaar** over de licentiewaarde — de standaard Oracle-formule. ([prmyazilim](https://prmyazilim.com/en/primavera-p6-pricing))

> **[VERIFICATIE — gecorrigeerd, belangrijkste prijscorrectie van dit onderzoek]** De notering "$305/gebruiker/maand met minimaal 25 gebruikers" is **niet houdbaar**. Oracle publiceert geen prijslijst (bevestigd: de [officiële Primavera P6-productpagina](https://www.oracle.com/industries/construction-engineering/primavera-p6/) noemt geen enkel bedrag), maar een geautoriseerde Noord-Amerikaanse Primavera-reseller publiceert wél een uitgesplitste actuele prijslijst — en die ziet er wezenlijk anders uit ([CMC Project Solutions](https://www.cmcprojectsolutions.com/primavera/shop/)):
>
> | Product | Prijs | Minimum |
> |---|---|---|
> | **Oracle Primavera Cloud – Schedule** (de CPM-module) | **$130 / gebruiker / maand**, jaarlijks gefactureerd | **5 gebruikers**, 1 jaar |
> | Oracle Primavera Cloud – Portfolio & Capital Planning | $235 / gebruiker / maand | 5 gebruikers |
> | Oracle Primavera Cloud – Task Management | $60 / gebruiker / maand | 5 gebruikers |
> | **Oracle Primavera Cloud – Progress** (viewer/voortgangsrol) | **$14 / gebruiker / maand** (= $168/jaar) | 5 gebruikers |
> | Primavera P6 EPPM (perpetual) | $3.850 per licentie | — |
> | Primavera P6 Professional (perpetual) | $3.520 per licentie | — |
> | Primavera Progress Reporter | $924 per licentie | — |
>
> Drie gevolgen:
> 1. **De instapdrempel is geen $91.500 maar ~$7.800/jaar** (5 × $130 × 12). Dat is een factor 12 lager. De "$305 + 25 gebruikers"-notering slaat vermoedelijk op een duurdere suite-editie, niet op de basis-schedulingmodule.
> 2. De losse notering "Progress Cloud Service $144/gebruiker/jaar" (FindPM) blijkt te corresponderen met de **OPC Progress-tier van $14/maand = $168/jaar** — ordegrootte bevestigd, dus die regel is als aparte bron overbodig geworden en hier samengevoegd.
> 3. De lijstprijs van P6 Professional is **niet hard**: prmyazilim noteert $3.880, deze reseller $3.520, en P6 EPPM $3.850 tegenover prmyazilims $4.240. Behandel $3.500–4.250 als de reële bandbreedte, niet $3.880 als een precies getal.

**Kritieke observatie voor de GCC [HERZIEN]:** de eerdere redenering — dat de cloud-instapdrempel MKB-aannemers uitsluit — **houdt geen stand**. Bij $130/gebruiker/maand vanaf 5 gebruikers is Oracle Primavera Cloud voor een middelgrote aannemer in Sharjah of Dammam gewoon betaalbaar (~$7.800/jaar). De tweedeling in §5.6 (Excel/gekraakte software) wordt dus **niet** door een prijsdrempel verklaard, maar door de andere factoren die dit rapport identificeert: ontbrekende contractuele noodzaak onderaan de markt, ontbrekend lokaal verkoopkanaal richting MKB, taal, en de beschikbaarheid van gratis P6. Dat is een inhoudelijk andere — en voor een nieuwe toetreder ongunstiger — diagnose: het probleem is geen prijsgat om in te springen, maar een vraaggat.

### 3.3 De rest van de Oracle-stack

Oracle verkoopt in de Golf zelden P6 alleen; het gaat als suite mee.

- **Oracle Aconex** — CDE/documentbeheer. Red Sea Global neemt "de volledige suite aan Aconex-modules, inclusief Connected Cost en Model Coordination". ([Oracle](https://www.oracle.com/middleeast/news/announcement/oracle-to-help-improve-construction-visibility-and-results-for-red-sea-global-2026-01-27/)) Ook op NEOM in gebruik ([LinkedIn-praktijkbron](https://www.linkedin.com/posts/faiz-aman-mustafa_aconex-neom-documentcontrol-activity-7349161901550940166--N9s)). Prijzen worden niet gepubliceerd; Aconex kent een "Unlimited"-model met onbeperkte gebruikers, opslag, training en support ([ZoftwareHub](https://zoftwarehub.com/products/oracle-aconex/pricing)) — projectprijs op maat, meestal een percentage van de projectwaarde.
- **Oracle Primavera Unifier** — Ashghal (Qatar) draait er zijn nationale infrastructuurprogramma op. ([Oracle case](https://www.oracle.com/construction-engineering/oracle-primavera-ashghal/))
- **Primavera Risk Analysis (PRA)** en **Primavera Analytics** — standaard in het portfolio van regionale resellers. ([ImageGrafix](https://image-grafix.com/oracle-primavera-partner-reseller-in-united-arab-emirates/))
- **Strategische verankering:** Oracle kondigde een **$14 mrd+ uitbreiding in KSA** aan, inclusief een derde Oracle Cloud-regio in NEOM City. ([LinkedIn/Oracle-woordvoerder](https://www.linkedin.com/posts/sherief-elabd_digitaltwin-saudiarabia-neom-activity-7391018392767361024-rF1r)) Dat maakt Oracle in Saoedi-Arabië ook een *soevereine-cloud*-partij — een concurrentievoordeel dat geen enkele planningsleverancier kan evenaren.

### 3.4 Microsoft Project

**Positie:** overal aanwezig, contractueel vaak onvoldoende. Regionale bronnen zijn expliciet: MS Project wordt in GCC-tenders "vaak geweigerd" en is geschikt voor projecten onder ~AED 10 mln. ([Gulf Certifications](https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction))

**Prijzen (wereldwijd USD, geen GCC-specifieke lijstprijs gevonden):**

| Plan (huidige Microsoft-naam) | Prijs |
|---|---|
| **Planner Plan 1** *(voorheen Project Plan 1)* | **$10 / gebruiker / maand** |
| **Planner and Project Plan 3** *(voorheen Project Plan 3)* | **$30 / gebruiker / maand** |
| **Planner and Project Plan 5** *(voorheen Project Plan 5)* | **$55 / gebruiker / maand** |

> **[VERIFICATIE — bevestigd, met naamscorrectie]** De bedragen $10/$30/$55 zijn juist en staan zo op Microsofts eigen prijspagina. De **plannamen zijn echter verouderd**: Microsoft heeft Project in 2024–2025 samengevoegd met Planner, waardoor "Project Plan 3/5" nu **"Planner and Project Plan 3/5"** heet en Project Plan 1 is opgegaan in **"Planner Plan 1"**. Wie in de GCC inkoopt of aanbesteedt, zoekt onder de nieuwe naam. Losse eeuwigdurende licenties bestaan nog wel: **Project Professional 2024 $1.129,99** en **Project Standard 2024 $679,99**, eenmalig. ([Microsoft Planner-prijzen](https://www.microsoft.com/en/microsoft-365/planner/microsoft-planner-plans-and-pricing), [Microsoft Project-vergelijking](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software))

Aanvullende bron: [The Digital Project Manager](https://thedigitalprojectmanager.com/tools/microsoft-project-pricing/). In de VAE wordt Plan 3 lokaal doorverkocht via o.a. **e& (Etisalat)** ([eand.ae](https://www.eand.ae)) en resellers als softwareline.ae — een indicatie dat de telco-bundelroute hier gebruikelijk is.

**Prijsverhouding tot P6 [HERZIEN]:** Plan 3 kost per jaar $360 tegenover ~$1.554 (perpetual, geamortiseerd + support) tot ~$1.560 (Primavera Cloud – Schedule) voor een P6-seat. **P6 is ~4,3× duurder** — niet de eerder genoemde 4,5–10×, want die bovengrens berustte op de weerlegde $3.660-cloudprijs. Het punt blijft staan (P6 is fors duurder en wordt toch gekocht), maar het is een factor 4, geen factor 10.

### 3.5 Excel — de onzichtbare nummer twee

Geen enkele GCC-bron ontkent dat Excel de feitelijke werkpaardplanner is bij onderaannemers en look-aheads. Wat wél gedocumenteerd is:

- Bouwprofessionals besteden **5,5 uur per week** aan het zoeken naar projectinformatie; bij AED 150/uur volledig belaste kosten is dat **AED 42.900 per persoon per jaar**. ([Arkan](https://arkancs.com/resources/blog/uae-contractors-moving-from-excel) — *let op: leverancierscontent, cijfers zijn hun eigen berekening*)
- Excel-gedreven beheer draagt volgens dezelfde bron **5–10%** bij aan projectkosten via rework; **88% van spreadsheets bevat fouten**.
- Een hele bloedgroep aan vergelijkingscontent ("Excel vs. Primavera P6 voor planningsingenieurs") circuleert onder GCC-planners — een teken dat de keuze in de praktijk dagelijks gemaakt wordt. ([LinkedIn](https://www.linkedin.com/posts/rasal-p-a-b0394115b_planningengineer-primaverap6-microsoftexcel-activity-7321150165002731520-KtvH), [SJ Civil](https://sjcivil.com/microsoft-excel-v-microsoft-project-v-primavera-p6/), [XerPlan](https://www.xerplan.com/baseline-schedule-with-primavera-excel))

**[SCHATTING]** Bij ~117.000 geregistreerde Saoedische aannemers en ~15.000 toegewijde planners in de hele GCC volgt onvermijdelijk dat **de overgrote meerderheid van de bouwbedrijven in de Golf geen enkele CPM-licentie bezit**. Excel plus een gescand balkenschema is voor hen de norm.

### 3.6 Schema-kwaliteit en risico: Deltek Acumen Fuse, PRA, Safran Risk

De DCMA-14-point-toets is in de Golf de facto de standaard-poortwachter voor het goedkeuren van baselines door opdrachtgevers en PMC's. Acumen Fuse is daarvoor "een voorkeurstool vanwege de gebruiksvriendelijke interface" ([MESLI Consulting via zoekresultaat](https://www.deltek.com), [Ten Six](https://tensix.com)). Ik heb echter **geen GCC-specifieke Acumen-resellers of klantcases kunnen vinden** — het lijkt via internationale PMC's en claimsbureaus binnen te komen, niet via een lokaal kanaal.

**Safran Project / Safran Risk** (Noorwegen): richt zich op olie & gas, energie en bouw met probabilistische schema-risicoanalyse ([SaaSrat](https://saasrat.com/products/safran-project)), maar **geen enkele Midden-Oosten-klant of -kantoor gevonden**. Zelfde beeld voor **Spider Project**, **Sciforma**, **Deltek Open Plan** en **Phoenix Project Manager**: geen GCC-signaal.

### 3.7 4D en lineaire planning: SYNCHRO en TILOS

**Bentley SYNCHRO 4D** — actief en zichtbaar:
- Ingezet op de **Jeddah Tower** voor 4D-modellering en digital twins. ([Bentley Systems/LinkedIn](https://www.linkedin.com/posts/bentley-systems_synchro-4dmodeling-digitaltwins-activity-7342660662571003904-eg5E), [tweede bron](https://www.linkedin.com/posts/miriam-ethel_synchro-bentleysystems-synchro-activity-7442727041113772032-l4u9))
- "Vertrouwd door ingenieurs en projectmanagers in het VK, de VAE, India en het Midden-Oosten." ([CTTEC](https://cttec.org/synchro/))

**Trimble TILOS** — verrassend goed gekanaliseerd in de Golf:
- Verkocht via **SITECH KSA** in Saoedi-Arabië ([sitech-ksa.com](https://sitech-ksa.com/products/tilos/))
- **ImageGrafix** (VAE/KSA) voert het actief, met eigen Arabische/regionale productbrochures ([imagegrafix.sa PDF](https://imagegrafix.sa/wp-content/uploads/2024/09/Tilos-Time-Location-Project-Management-Software.pdf))
- Partnerschap **FND & ImageGrafix met Trimble TILOS** aangekondigd in Saoedische vakpers ([Arts Today Saudi Arabia](https://www.artstodaysaudiarabia.com/article/688320568))
- Logisch gezien de regionale pijplijn: Etihad Rail, Saudi Landbridge, snelwegen, pijpleidingen.

### 3.8 Asta Powerproject

Positionering in de Golf: "middenklasse-alternatief; soms geaccepteerd, maar mist P6's enterprise-schaal" ([Gulf Certifications](https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction)). Ik vond **geen enkele GCC-reseller, klantcase of regionale marketing** van Elecosoft. Wereldwijd claimt Asta 100.000+ gebruikers, maar de Golf is geen kernmarkt — het komt binnen via Britse aannemers met een regiovestiging.

### 3.9 PMWeb en de regionale PMIS-laag

**PMWeb** is de sterkste "quasi-lokale" speler: gedistribueerd door **CMCS**, een van oorsprong Libanees/regionaal huis, dat claimt **"75+ klanten in de MENA-regio"** te bedienen. ([CMCS](https://cmcs.co/pmweb-clients/), [PMWeb-CMCS-partnerpagina](https://pmweb.com/cmcs-pmweb/)) PMWeb positioneert zich op governance, kostenbeheersing, contract- en betalingsbeheer — het schema komt uit P6 en wordt geïmporteerd. **PMWeb vervangt P6 niet, het omhult het.**

Overige regionale PMIS/ERP-platforms die serieus geld verdienen in de Golf (maar zwakke of geen echte CPM-engine hebben):

| Product | Herkomst | Positionering |
|---|---|---|
| [Wrench SmartProject](https://www.wrenchsp.com/smartproject-overview/) | India/VAE | AI-gedreven PMIS voor EPC; via [ORBIT ME](https://www.orbitme.net/Wrench.html) |
| [ePROMIS](https://epromis.com/middle-east-en) | VAE | Cloud-ERP + projectbeheer voor bouw |
| [Buildo](https://buildo.solutions/) | KSA | Arabischtalig platform: begrotingen, contracten, uitvoering, mijlpaalfacturen |
| [Milestone KSA](https://construction.milestoneksa.com/) | KSA | Op hoeveelhedenstaat (BoQ) gebaseerd bouwprojectbeheer |
| [Optivize](https://optivize.tech/solutions/construction-erp) | KSA | ERP voor Saoedische aannemers: projecten, mustakhlasat (termijnstaten), kosten |
| [Salis ERP](https://saliserp.com/contracting-management/) | regionaal | Aannemers-ERP, gedetailleerde biedprijsstelling |
| [FirstBit ERP](https://firstbit.sa/ar/features/project-management/) | VAE/KSA | Tijdregistratie, taakplanning |
| [Arkan](https://arkancs.com) | VAE | Bouwdocument-/projectplatform, sterk anti-Excel-gepositioneerd |
| [VirtueNetz](https://www.virtuenetz.com/sa/ar/construction-management-software-saudi-arabia/) | KSA | Bouwbeheersoftware, Arabischtalig |
| [PlanRadar](https://www.planradar.com/ae-en/) | Oostenrijk | Veldbeheer/defect management; **regionaal HQ Dubai sinds 2022**; klanten o.a. Siemens, CBRE, JLL ([Zawya](https://www.zawya.com/en/press-release/companies-news/field-management-platform-for-construction-and-real-estate-planradar-launches-in-the-uae-d3hsfsoy), [Gulf Today](https://www.gulftoday.ae/business/2026/06/23/how-planradar-is-helping-construction-teams-build-a-clearer-record-of-work)) |
| [Sablono](https://www.sablono.com/) | Duitsland | Voortgangsvolging op activiteitniveau; aanwezig maar klein |

### 3.10 AI-schedulers: veel geluid, weinig GCC-omzet

- **ALICE Technologies** (generatieve planning/optioneering): geen aantoonbare GCC-productieklant gevonden. Het enige Saoedische signaal is een Arab News-interview met een EMEA-technologieadviseur over AI in Saoedisch vastgoed ([LinkedIn](https://www.linkedin.com/posts/activity-7468597134121091072-Ib1q)) — dat is thought leadership, geen deployment.
- **nPlan** (ML-schemarisicovoorspelling): enige gedocumenteerde partnerschap is **Spark NEL in Australië**, niet in de Golf.
- **Nodes & Links (Aegis)**: partnerschap met **INTECH** aangekondigd ([nodeslinks.com](https://nodeslinks.com/blog/intech-and-nodes-links-partnership/)); geen GCC-klantcase gevonden. Let op naamsverwarring met het niet-gerelateerde [Aegis Systems UAE](https://www.aegissystemsuae.com).

**Beoordeling [SCHATTING]:** de AI-planningscategorie is in de GCC in 2026 nog een pilotmarkt van hooguit **$2–5 mln/jaar**. De structurele rem is dat AI-optimalisatie het contractueel goedgekeurde P6-schema niet mag vervangen — het kan er hooguit náást draaien.

### 3.11 Generieke werkbeheertools

Deze groeien hard in de Golf, maar **buiten** de contractuele planningsketen — bij ontwikkelaars, corporate PMO's, marketing- en IT-afdelingen:

- **Smartsheet**: **200% klantengroei in EMEA** sinds het openen van het eerste kantoor in 2018, met 100+ regionale partners. ([IT Europa](https://iteuropa.com/news/smartsheet-sees-business-boom-emea), [Smartsheet](https://www.smartsheet.com/content-center/inside-smartsheet/company-news/business-momentum-emea-full-speed-ahead))
- **monday.com**: gespecialiseerde GCC-implementatiepartners met **leveringshub in Dubai en actieve levering in alle zes GCC-landen** ([Omni Factors GCC](https://omnifactors.com/gcc), [UAE](https://omnifactors.com/uae)); +26% j-o-j omzetgroei in 2025 en een nieuwe EMEA-GM aangesteld in juni 2026 ([TechIntelPro](https://techintelpro.com/news/ai/enterprise-ai/mondaycom-appoints-ben-barnett-gm-of-emea)).
- **Zoho Projects, Wrike, Asana**: aanwezig via het gebruikelijke SaaS-kanaal; geen bouwspecifiek GCC-signaal gevonden.

**Zij zullen P6 niet verdringen** zolang de FIDIC-clausule 8.3-programma-eis en de XER-inleverplicht bestaan.

### 3.12 Open source

**ProjectLibre** (8,4 mln downloads wereldwijd, [Wikipedia](https://en.wikipedia.org/wiki/Projectlibre); 7,8 mln downloads in 193 landen volgens [SourceForge](https://sourceforge.net/projects/projectlibre/)), **GanttProject** en **OpenProject** hebben in de GCC **geen zichtbare professionele voetafdruk**. Ik vond geen Arabischtalige community, geen regionale reseller, geen enkel tendergerelateerd gebruik. In de Arabischtalige zoekresultaten voor "gratis alternatief voor Primavera" gaat het praktisch uitsluitend over **het gratis downloaden van P6 zelf**, niet over open-sourcealternatieven (§5.6).

---

## 4. Prijzen, licentiemodellen en lokale prijsniveaus

### 4.1 Samenvattende prijstabel

| Product | Model | Lijstprijs | Bron |
|---|---|---|---|
| P6 Professional | perpetual, named user | **$3.520–3.880** (+22%/jr support) | [CMC](https://www.cmcprojectsolutions.com/primavera/shop/) / [prmyazilim](https://prmyazilim.com/en/primavera-p6-pricing) |
| P6 EPPM | perpetual, named user | **$3.850–4.240** (+22%/jr support) | idem |
| P6 EPPM (alt.) | perpetual, application user | $2.750 (+$605) | [ProjectManagerTemplate](https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models) |
| Primavera Progress Reporter | perpetual | $924 | [CMC](https://www.cmcprojectsolutions.com/primavera/shop/) |
| **Oracle Primavera Cloud – Schedule** | abonnement | **$130/gebruiker/mnd, min. 5 gebruikers** | [CMC](https://www.cmcprojectsolutions.com/primavera/shop/) |
| Oracle Primavera Cloud – Portfolio & Capital Planning | abonnement | $235/gebruiker/mnd, min. 5 | idem |
| Oracle Primavera Cloud – Task Management | abonnement | $60/gebruiker/mnd, min. 5 | idem |
| Oracle Primavera Cloud – Progress (viewer) | abonnement | $14/gebruiker/mnd (= $168/jr), min. 5 | idem |
| ~~P6 Cloud $305/mnd, min. 25 gebruikers~~ | — | **weerlegd, zie §3.2** | [prmyazilim](https://prmyazilim.com/en/primavera-p6-pricing) |
| Primavera (samengesteld) | abonnement | $175/gebruiker/mnd | [ContractorsAndBuilders](https://contractorsandbuilders.com/pricing/oracle-primavera/) |
| Oracle Aconex | projectgebaseerd / "Unlimited" | niet gepubliceerd | [ZoftwareHub](https://zoftwarehub.com/products/oracle-aconex/pricing), [ITQlick](https://www.itqlick.com/oracle-aconex/pricing) |
| Planner Plan 1 / Planner and Project Plan 3 / Plan 5 | abonnement | $10 / $30 / $55 per gebruiker/mnd | [Microsoft](https://www.microsoft.com/en/microsoft-365/planner/microsoft-planner-plans-and-pricing) |

### 4.2 Valuta-effecten: er zijn er nauwelijks

Dit is een **structureel voordeel** van de GCC voor USD-prijzende softwareleveranciers, en verdient nadruk:

| Land | Valuta | Koppeling |
|---|---|---|
| Saoedi-Arabië | SAR | vaste peg aan USD (3,75) |
| VAE | AED | vaste peg aan USD (3,6725) |
| Qatar | QAR | vaste peg aan USD (3,64) |
| Oman | OMR | vaste peg aan USD |
| Bahrein | BHD | vaste peg aan USD |
| Koeweit | KWD | mandje met USD-dominantie |

Gevolg: **geen valutarisico-opslag, geen prijsherziening bij wisselkoersschommelingen, geen lokale prijslijst nodig.** Anders dan in Turkije, Egypte, India of Zuidoost-Azië kan een leverancier hier gewoon de USD-lijstprijs hanteren. Dat verklaart mede waarom P6-prijzen in de Golf niet zijn "gelokaliseerd" naar beneden — en waarom de effectieve prijs per planner hier tot de hoogste ter wereld behoort.

*(De pegs zijn algemeen bekende monetaire feiten; ik heb ze in deze ronde niet apart met een bron-URL geverifieerd.)*

### 4.3 Fiscale opslagen — een reële extra kostenpost

| Effect | Tarief | Bron |
|---|---|---|
| KSA bronbelasting op **royalty's** (softwarelicenties) | **15%** | [PwC Worldwide Tax Summaries](https://taxsummaries.pwc.com/saudi-arabia/corporate/withholding-taxes) |
| KSA bronbelasting op **technische/adviesdiensten** | **5%** | idem |
| KSA bronbelasting op **managementvergoedingen** | **20%** | idem |
| KSA bronbelasting op dividend / rente | 5% / 5% | idem |
| KSA btw | 15% | *algemeen bekend, niet apart geverifieerd in deze ronde* |
| VAE / Oman / Bahrein btw | 5% / 5% / 10% | *idem* |
| Qatar / Koeweit btw | nog geen btw | *idem* |

**Praktisch gevolg:** een Saoedische aannemer die direct bij een buitenlandse leverancier een licentie afneemt, houdt 15% bronbelasting in — tenzij de transactie als *dienst* (5%) of via een lokale entiteit wordt gestructureerd. Dit is een van de belangrijkste redenen waarom softwareleveranciers hier via **lokale resellers** verkopen in plaats van direct. Het is ook een verborgen prijsverhoging van 5–15% voor de eindklant bij directe inkoop.

### 4.4 Kortingen

Oracle publiceert geen prijslijst meer; alles gaat via offerte en reseller. Waarneembare patronen:

- Wereldwijde bandbreedte van feitelijk betaalde prijzen: **$3.000–25.000 per gebruiker/jaar** ([VendorBenchmark](https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing)) — een factor 8, wat op zichzelf al aangeeft hoe groot de onderhandelingsruimte is.
- Regionale resellers adverteren instapprijzen vanaf **$3.100** ([ProjectManagerTemplate](https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models)) tegenover $3.880–4.240 lijst — ~20–25% korting op enkelvoudige aankopen.
- **[SCHATTING]** Op giga-projectdeals met 500–5.000 seats liggen kortingen van **35–55%** in de rede, plus meerjarige prijsbevriezing en gratis training als dealsweetener. Voor Red Sea Global (23.000 gebruikers) zal de effectieve prijs per seat een fractie van de lijstprijs zijn — maar het totaalcontract loopt vermoedelijk in de tientallen miljoenen USD over de looptijd.
- Aannemers omzeilen kosten via **"named-user-licenties gepoold over projectteams"** ([Gulf Certifications](https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction)) — een licentiepraktijk die formeel op gespannen voet staat met Oracle's named-user-definitie.

### 4.5 Trainingsprijzen (zeer gedetailleerd beschikbaar)

**VAE / Dubai:**

| Aanbieder / bron | Prijs |
|---|---|
| [Coursetakers.ae](https://www.coursetakers.ae/search/courses-in/professional/project-management/primavera/fees) | **AED 1.200** (12 uur) tot **AED 6.000** |
| [Laimoon Dubai](https://courses.laimoon.com/uae/dubai/project-management/primavera/fees) | **AED 1.000 – 15.200** |
| [Edoxi](https://www.edoxi.com/studyhub/primavera-p6-certification-cost-dubai) | **AED 1.741 – 16.150** incl. Oracle-examen (**AED 900–950**) |
| [MyPrivateTutor](https://www.myprivatetutor.ae/course-details/80545/primavera-p6-training-course) / Wingsway ([Edarabia](https://www.edarabia.com/401931/primavera-p6-dubai-uae/)) | **AED 2.500** |

**Saoedi-Arabië / Riyad:**

| Aanbieder / bron | Prijs |
|---|---|
| [Laimoon Riyad (jan-2026)](https://courses.laimoon.com/ar/saudi-arabia/riyadh/project-management/primavera/fees) | **SAR 1.000 – 13.600** |
| [Laimoon Riyad (jun-2026)](https://courses.laimoon.com/ar/saudi-arabia/riyadh/project-management/primavera/fees) | laagste prijs **SAR 1.497**, 6 cursussen beschikbaar |
| [Haraj-marktplaats](https://haraj.com.sa/11182212205/) | **SAR 330** voor een 4-uurs cursus (informeel/particulier) |

Omgerekend: **~$270–1.630 per cursist** voor een reguliere cursus; **$4.400** voor het volledige certificeringspad (VAE, inclusief examen).

Het aanbod is opvallend dicht — alleen in Riyad vond ik ESI ([esi.edu.sa](https://esi.edu.sa/courses/p6/), inclusief een aparte *gevorderden*-cursus), Pioneers Academy, HGT, Masartech, AAA, Mnar en EngoSoft; in Dubai/VAE Edoxi, Zabeel, Solve Tech (KHDA-erkend), BF Training, Invensis, Time Training, CAD Dubai en Wingsway. Dit is een volwassen, sterk versplinterde markt.

### 4.6 Salarissen — de menselijke kant van de kostprijs

| Rol / land | Salaris | Bron |
|---|---|---|
| Planning Engineer KSA (gemiddeld) | **SAR 9.000–9.275/mnd** (~$2.400–2.470) | [GulfTalent](https://www.gulftalent.com/saudi-arabia/salaries/planning-engineer), [Glassdoor](https://www.glassdoor.ca/Salaries/saudi-arabia-planning-engineer-salary) |
| Planning Engineer KSA (bandbreedte) | SAR 2.066 – 17.000/mnd (n=1.500) | [Naukrigulf](https://www.naukrigulf.com/salaries/planning-engineer-salary-in-saudi-arabia) |
| Senior Planning Engineer Riyad | **SAR 15.750/mnd**, totaal SAR 19.083 | [Glassdoor](https://www.glassdoor.com/Salaries/riyadh-saudi-arabia-senior-planning-engineer-salary) |
| Junior Planning Engineer VAE (P6) | **AED 8.501/mnd** gem., tot AED 13.000 | Indeed Abu Dhabi via [timetraining.ae](https://www.timetraining.ae/learninghub-detail/should-document-controllers-learn-Primavera) |
| Mid-level Planning Engineer VAE | **AED 14.000–22.000/mnd** | idem |
| Senior Planning Engineer VAE | **AED 15.000–28.000/mnd** (~$49k–92k/jr) | idem |
| Project Controls Manager VAE | **AED 18.000–35.000/mnd** (~$59k–114k/jr) | idem |
| Junior planner (regionaal) | AED 8.000–14.000/mnd | [Gulf Certifications](https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction) |
| Senior planner/manager (regionaal) | AED 25.000–45.000/mnd | idem |
| Planning Engineer Qatar | **QAR 8.000–13.000/mnd** (GulfTalent) / QAR 10.292 (Naukrigulf) | [GulfTalent](https://www.gulftalent.com/Qatar/salaries/planning-engineer), [Naukrigulf](https://www.naukrigulf.com/salaries/planning-engineer-salary-in-qatar) |
| Planning Engineer Koeweit | **~QAR 10.905-equivalent/mnd** | [Naukrigulf](https://www.naukrigulf.com/salaries/planning-engineer-salary-in-qatar) |
| Planning Engineer Bahrein | **~QAR 8.818-equivalent/mnd** | idem |
| Planning Engineer Oman | **~QAR 8.066-equivalent/mnd** (OMR 834) | [Naukrigulf](https://www.naukrigulf.com/salaries/planning-engineer-salary-in-oman) |

**Nuancering van de premisse "hoogste betalingsbereidheid per planner ter wereld":**

- Op **organisatieniveau** klopt het: de combinatie van USD-pegs, contractuele dwang, mega-projectbudgetten en geen prijsgevoeligheid maakt de GCC voor Oracle waarschijnlijk de meest winstgevende regio per seat.
- Op **salarisniveau** klopt het niet. Een senior planner in de VAE verdient $49k–92k belastingvrij; in de VS, Australië en Noorwegen ligt het bruto hoger (en netto vergelijkbaar tot hoger voor seniors). De Golf betaalt *goed*, met belastingvrijheid als hefboom, maar is geen mondiale topbetaler voor het beroep zelf.
- **Belangrijkste consequentie:** de betalingsbereidheid is sterk **bimodaal**. Boven de lijn (giga-projecten, staatsopdrachtgevers, tier-1-EPC) is de prijs vrijwel irrelevant. Onder de lijn (MKB-aannemers, onderaannemers) is de betalingsbereidheid vrijwel **nul** — daar wint Excel of een gekraakte kopie.

### 4.7 Consultancytarieven

Ik heb **geen betrouwbare, planning-specifieke tarieven** voor de GCC gevonden. Wat wel beschikbaar is (generiek en dus slechts indicatief):
- Freelancetarieven VAE: **AED 150–2.000 per uur** over alle sectoren. ([Growlio](https://www.growlio.io/blog-uae/freelance-pricing-guide-uae))
- Gemiddeld consultantsalaris Dubai: **AED 291.956/jaar**, equivalent **AED 116,97/uur**. ([SalaryExpert](https://www.salaryexpert.com/salary/job/consultant/united-arab-emirates/dubai))

**[SCHATTING]** Op basis van marktkennis en de salarisdata hierboven ligt een gedetacheerde senior planning consultant in de Golf op **$8.000–20.000 per maand** all-in aan de klant; een forensisch vertragingsdeskundige voor arbitrage op **$350–650 per uur**. Deze cijfers zijn **niet** met bronnen onderbouwd.

---

## 5. Lokale bijzonderheden

### 5.1 Contracteisen: P6 als toelatingsbewijs

Dit is de bepalende eigenschap van de GCC-markt en het antwoord op de vraag waarom P6 hier onaantastbaar is.

**Het mechanisme:**
1. FIDIC-contracten domineren de GCC-bouw. ([Gulf Certifications](https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction))
2. **FIDIC sub-clausule 8.3** verplicht de aannemer tot indiening en onderhoud van een programma. In de Golf wordt dit ingevuld als een **Level 3 of Level 4-programma**. ([timetraining.ae](https://www.timetraining.ae/learninghub-detail/should-document-controllers-learn-Primavera))
3. De Employer's Requirements noemen vervolgens **Primavera P6 bij naam** als het instrument.
4. Maandelijkse updates, EOT-claims en Time Impact Analyses moeten in datzelfde formaat worden aangeleverd — in de praktijk als **XER-bestand** naast PDF/print.
5. Betalingscertificaten hangen aan de goedgekeurde voortgang in dat schema. Zoals regionale vakpers het formuleert: P6 is *"de stille taal achter elke goedgekeurde baseline, elk betalingscertificaat."*

**Gevolg:** *"Het indienen van een MS Project-bestand bij ADNOC of Saudi Aramco kan uw bod diskwalificeren."* ([Gulf Certifications](https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction))

**Belangrijke nuance die ik eerlijk moet melden:** ik heb **geen publiek tenderdocument kunnen vinden dat letterlijk "XER-bestand verplicht" voorschrijft**. De XER-inleverplicht is in de sector algemeen bekend en volgt logisch uit de P6-eis, maar de directe documentaire onderbouwing ontbreekt in dit onderzoek.

> **[VERIFICATIE — gecorrigeerd; dit is de zwakste schakel in het rapport]** Het Ashghal-document STC-051 is bij tekstextractie **geen bewijs voor een contractuele P6-verplichting aan aannemers**. De volledige tekst is opgehaald en doorzocht; wat er werkelijk staat:
> - Het is gedateerd **mei 2017** (Project ID: ISD 2017 DS 116) — bijna negen jaar oud, geen actuele tender.
> - Het is een **IT-inkooptender van Ashghals eigen Information Systems Department** voor de *verlenging van licenties die Ashghal zelf gebruikt*: "Renewal of Primavera P6 and PCM Licenses", concreet **85 × Primavera P6 EPPM + 85 × Primavera Contract Management**.
> - De woorden **"schedule", "programme" en "XER" komen nul keer voor** in het document. Er staat geen enkele eis aan aannemers in.
>
> Wat het document wél bewijst — en dat is niet niks — is dat P6 + PCM "**the backbone of the current Project Management Information Systems of Ashghal**" zijn (letterlijk citaat). Dat is echte, primaire onderbouwing voor P6-verankering bij een GCC-overheidsopdrachtgever. Maar het is onderbouwing voor **institutioneel gebruik**, niet voor een **contractuele oplegging**.
>
> **Gevolg voor de kernstelling van dit rapport (§1, punt 1):** de bewering dat P6 in tenderdocumenten bij naam wordt voorgeschreven en dat een MS Project-bestand een bod kan diskwalificeren, rust na deze correctie **uitsluitend op trainingsaanbieder-blogs** (gulfcertifications.com, timetraining.ae, edoxi.com) — precies de bronklasse die §0 zelf als "Laag" classificeert wegens commercieel belang. Gericht zoeken naar onafhankelijke of primaire onderbouwing (tenderspecificaties van ADNOC/Aramco, XER-inleververplichtingen) leverde **niets** op: alleen uitleg-artikelen van planningsconsultancies over wat een XER-bestand ís. **Markeer deze stelling als plausibel maar onbevestigd.** Ze is in de sector algemeen aanvaard en past bij alle omringende signalen (85 EPPM-seats bij Ashghal, 23.000 gebruikers bij Red Sea Global, het resellerlandschap, de vacature-eisen), maar er ligt in dit onderzoek geen enkel primair document onder.

Het tweede primaire spoor blijft wel overeind, zij het via een secundair platform:
- NEOM Shushah Island Stage 3A "Minimum Schedule Requirements", die **"het gebruik van Primavera P6-software specificeert"**. ([document](https://www.scribd.com/document/1060968894/Minimum-Schedule-Requirements)) — niet onafhankelijk geverifieerd in deze ronde.

### 5.2 Normen en standaarden

**Saudi Aramco SAEP-331** — *Project Schedule Requirements*:
- Definieert **7 schemaniveaus**, van high-level Business Plan Project Schedules tot gedetailleerde **Level IV Project Control Schedules**. ([SAEP-331-samenvatting](https://www.scribd.com/document/698960445/SAEP-331), [video-uitleg](https://www.youtube.com/watch?v=aH4EWP8ehoY))
- SAES/SAMSS/SAEP-standaarden zijn **bindend**; elke afwijking vereist een formele, goedgekeurde waiver van Aramco.
- Planning- en scheduleverantwoordelijkheid ligt bij de **detail engineering contractor**, onder toezicht van het Saudi Aramco Project Management Team (SAPMT). ([PMT-104](https://www.studocu.com/row/document/semnan-university/planning/))
- *Let op:* ik heb **niet kunnen bevestigen dat SAEP-331 P6 bij naam noemt**. De softwarekeuze zit vermoedelijk in aanverwante procedures. Praktijkbronnen noemen wél "Oracle Primavera P6 / Cloud — standaard voor scheduling en resource planning" als Aramco's kerntool ([LinkedIn](https://www.linkedin.com/posts/ajith-n-k-54680686_)).

**Qatar — Ashghal APMS (Ashghal Portfolio Management System):** integreert *Schedule Control, Pre-Tender Budget Control & Cost Management, Change & Payment Management* voor gezamenlijk toezicht door Ashghal, consultants en aannemers. ([Ashghal](https://www.ashghal.gov.qa/en/pages/apmstraining.aspx)) Draait op **Oracle Primavera Unifier**. ([Oracle](https://www.oracle.com/construction-engineering/oracle-primavera-ashghal/))

**Saoedi-Arabië — Mashroat (مشروعات) / National Program for Project Management:**
- Een overheidsprogramma "om efficiënt en effectief bouwprojectbeheer en asset-/facilitymanagement te leveren", ondergebracht bij EXPRO (Government Expenditure & Projects Efficiency Authority). ([Serco](https://www.serco.com/me/sector-expertise/government-services/expro))
- Het **Mashroat Projects White Book** is een nationaal raamwerk; Volume 14 is de standaard voor documentbeheer. ([LinkedIn-analyse](https://www.linkedin.com/pulse/mashroat-volume-14-white-book-explained-what-every-document-cachero-hj5df))
- Vereist een **"Mashroat-compliant ECMS"** voor beheer en bewaring van alle projectinformatie. ([US-Saudi Business Council presentatie](https://ussaudi.org/wp-content/uploads/2020/03/Mashroat-Presentation.pdf))
- Procedurele standaarden gelden **"voor alle overheidsbouwprojecten in Saoedi-Arabië"**. ([documentnummeringsprocedure](https://www.scribd.com/document/856823707/EPM-ID0-PR-000002-02-Project-Standard-Document-Numbering-Procedure))
- Research and Markets meldt daarnaast dat Saoedi-Arabië sinds **2023 digitaal projectmanagement verplicht stelt voor overheidsbouwprojecten boven een budgetdrempel**. ([R&M](https://www.researchandmarkets.com/report/middle-east-construction-project-management-software-market))

**BIM-mandaten (relevant voor 4D):**
- Dubai: digitale BIM-modelindiening **verplicht voor bouwvergunningen vanaf 1 januari 2024** voor specifieke categorieën — gebouwen boven 20 verdiepingen (architectuur) of 40 verdiepingen (constructie). ([Autodesk](https://boards.autodesk.com/dubai-bim-mandate), [TECON](https://tecon.ae/dubai-implements-bim-mandate-for-enhanced-construction-efficiency/))
- Uitbreiding van het Dubai Municipality-mandaat verwacht in 2026. ([LinkedIn](https://www.linkedin.com/posts/dr-ibrahim-fahdah-13aa80a4))
- Ken Research noemt de VAE expliciet als markt met **verplichte BIM-eisen voor publieke projecten**.

### 5.3 Lokale spelers en het resellerkanaal

Het GCC-kanaal is dicht, professioneel en volledig Oracle-gecentreerd:

| Partij | Land | Rol |
|---|---|---|
| [ImageGrafix Software FZCO](https://image-grafix.com/oracle-primavera-partner-reseller-in-united-arab-emirates/) | VAE (Dubai, Abu Dhabi, Sharjah) | "Premier Oracle Primavera Partner & Reseller", actief sinds **1996**; ook Trimble TILOS |
| [ImageGrafix International](https://imagegrafix.sa/oracle-primavera-partner-reseller-in-kingdom-of-saudi-arabia/) | KSA | zusterentiteit, meerdere Saoedische steden |
| [Promastar](https://www.promastar.net) | regionaal | **Oracle Platinum Partner** en VAR voor Primavera |
| [CAD Gulf](https://cadgulf.com/oracle-primavera/) | VAE (Dubai) | Geautoriseerd Oracle-partner, 35+ jaar |
| [ORBIT Middle East](https://www.orbitme.net/) | VAE/KSA/Qatar/Koeweit/Bahrein | Primavera P6, Bluebeam, **Oracle Aconex, Wrench SmartProject**, Foxit, Cubicost, CADprofi |
| [FastVision KSA](https://fastvisionksa.com/oracle-primavera-p6-eppm/) | KSA | P6 EPPM-implementatie |
| [Sharp Innovation](https://sharpinnvotech.com/ar/services/primavera-services) | KSA | Arabischtalige P6-implementatiediensten (cloud en on-prem) |
| [CMCS](https://cmcs.co/pmweb-clients/) | MENA | PMWeb-distributeur, **75+ MENA-klanten** |
| [SITECH KSA](https://sitech-ksa.com/products/tilos/) | KSA | Trimble TILOS |
| [Leopard Project Controls](https://consultleopard.com), [P3Wise](https://p3wise.com), [Claimetrica](https://claimetrica.com/project-controls.html) | regionaal | Project-controls-consultancy op P6/MS Project |

**Observatie:** een nieuwe planningsleverancier die de GCC wil betreden, kan niet direct verkopen. Zonder een van deze VAR's — of een eigen entiteit — is er geen toegang tot de aanbestedingsketen, geen lokale support en (in KSA) een fiscaal ongunstige structuur.

### 5.4 Taal

- **Arabisch is niet vereist voor de planningssoftware zelf.** De contractuele werktaal in de GCC-bouw is Engels; P6 wordt in het Engels gebruikt; de planners zijn overwegend expats (Indiaas, Pakistaans, Egyptisch, Filipijns, Jordaans, Libanees).
- **Arabisch is wél de taal van de opleidings- en verkoopmarkt.** De Arabischtalige zoekresultaten laten een dichte laag zien van Saoedische opleidingsinstituten (ESI, Pioneers Academy, HGT, Masartech, AAA, Mnar, EngoSoft) en Arabischtalige diensten (Sharp Innovation).
- **Arabisch is de taal van de MKB-laag.** De lokale ERP/PMIS-spelers positioneren zich expliciet Arabischtalig: Buildo ("منصة عربية موحدة" — verenigd Arabisch platform), Optivize, VirtueNetz, Milestone KSA, FirstBit.
- Oracle voert volledige Arabische productpagina's per land ([oracle.com/sa-ar](https://www.oracle.com/sa-ar/construction-engineering/primavera-p6/), [oracle.com/middleeast-ar](https://www.oracle.com/middleeast-ar/construction-engineering/primavera-p6/)) — een marketing- eerder dan productlokalisatie.
- **RTL-ondersteuning** is dus geen harde eis voor een CPM-tool die op tier-1-projecten wil meedoen, maar wél een duidelijke differentiator richting de Saoedische MKB-laag en overheidsentiteiten die Arabischtalige rapportage willen.

### 5.5 Opleidingscultuur

De GCC-planningsmarkt is uitzonderlijk **certificerings- en cursusgedreven**:

- Aanbevolen certificeringspaden: **PMI-SP**, **Oracle University Primavera P6 Professional**, **AACE PSP**. ([Gulf Certifications](https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction))
- Typisch leerpad: **40 uur cursus + 3 maanden praktijk**; volgens andere aanbieders 24 uur instructie plus 4–6 weken tot operationele bekwaamheid en 12–24 maanden tot senioriteit. ([Gulf Certifications](https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction), [timetraining.ae](https://www.timetraining.ae/learninghub-detail/should-document-controllers-learn-Primavera))
- Aanbiedersclaim: P6-vaardigheid tilt een mid-career-salaris **30–50%** op binnen twee contractcycli. ([Gulf Certifications](https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction)) — *commerciële claim, onverifieerbaar.*
- De regionale community is groot en Arabisch/Zuid-Aziatisch georiënteerd: **[planningengineer.net](https://planningengineer.net/members/)** telt **80.046 actieve leden** en **61.163 Facebook-likes** ([Facebook](https://www.facebook.com/PlanningEngineerDotNet/)). Het bedrijf (Planning Engineer FZE) is geregistreerd in **Sharjah, VAE**, met activiteiten in **Egypte en Saoedi-Arabië**, gestart als trainingswebsite in 2012 ([about](https://planningengineer.net/about-us/), [YouTube](https://www.youtube.com/@PlanningengineerNet)). Ze bouwen inmiddels ook **eigen AI-software die planners helpt baselines te bouwen** — een interessante regionale toetreder.

**Strategische implicatie:** in deze markt komt softwareadoptie *via de opleiding*. Wie planners opleidt, bepaalt welke tool zij daarna eisen. Oracle heeft dat kanaal 20 jaar geleden gewonnen.

### 5.6 Excel, gekraakte software en de grijze markt

**Piraterijcijfers (verouderd — recent GCC-specifiek onderzoek ontbreekt):**

| Metriek | Waarde | Jaar | Bron |
|---|---|---|---|
| Midden-Oosten & Afrika, pc-software | **59%** | 2022 | [Gitnux](https://gitnux.org/software-piracy-statistics/) |
| VAE (laagste in de regio) | **34%** | historisch | [Khaleej Times](https://khaleejtimes.com/business/uae-posts-lowest-piracy-rate-in-me) |
| VAE | **36%** | historisch | [Gulf News](https://gulfnews.com/uae/uae-piracy-rate-falls-to-36pc-1.358098) |
| Golf-verliezen door piraterij | **$631 mln** (+7%) | historisch (BSA-tijdperk) | [Gulf News](https://gulfnews.com/business/software-piracy-losses-in-gulf-rise-7-to-631m-last-year-1.625530) |

De BSA publiceert sinds 2018 geen Global Software Survey meer, dus recentere cijfers bestaan simpelweg niet.

**Directe waarnemingen uit dit onderzoek — veel sprekender dan de statistieken:**

1. **Arabischtalige zoekopdrachten naar "بريمافيرا كراك / تحميل مجانا / تفعيل" leveren een levendig ecosysteem op:** YouTube-tutorials "تنصيب برنامج بريمافيرا Primavera P6 مجاناً" (gratis installeren) en "كيفية تثبيت وتفعيل برنامج بريمافيرا" (installeren én activeren) ([1](https://www.youtube.com/watch?v=0oEBbbaBzXs), [2](https://www.youtube.com/watch?v=Ul1kGswfbHk)); Facebook-groepen met directe downloadlinks voor **P6 V25.12** ([Experts House](https://www.facebook.com/)); het Arab Engineers Forum met een draad "تحميل وتثبيت وتفعيل برنامج Primavera P6" ([arab-eng.org](https://arab-eng.org/threads/506596/)); LinkedIn-posts met "لينك تحميل مباشر لآخر إصدار بريمافيرا P6" ([Easy PMP](https://ae.linkedin.com/posts/easy-pmp_)); en Arabische how-to-sites ([civil-guide.com](https://www.civil-guide.com/2022/02/free-download-primavera-p6.html)).
2. **Grijze marktplaatsen:** Amazon.sa verkoopt een *"Primavera P6 lifetime"* (versie 2022) met de betaaloptie **"SAR 91,58 per maand gedurende 12 maanden"** (≈ SAR 1.099 ≈ **$293** totaal) ([Amazon.sa](https://www.amazon.sa/-/en/Primavera-P6-lifetime/dp/B0CT5HC1B7)) — een fractie van de $3.880 lijstprijs en vrijwel zeker geen legitieme Oracle-licentie.
3. **Op Haraj (Saoedische Marktplaats)** worden P6-cursussen aangeboden voor **SAR 330** voor 4 uur ([Haraj](https://haraj.com.sa/11182212205/)) — het informele opleidingscircuit.
4. Sommige "gratis" routes zijn legitiem: Oracle's E-Delivery geeft geregistreerde gebruikers legale downloads (de licentie blijft dan wel vereist), wat de grens vertroebelt en piraterij vergemakkelijkt.

**Interpretatie [SCHATTING]:** de tweedeling is scherp. Op tier-1-projecten is de licentiehygiëne uitstekend — audits en contractuele compliance dwingen dat af. Daaronder, bij tienduizenden MKB-aannemers en bij individuele planners die thuis oefenen, is het gebruik van niet-gelicentieerde P6 waarschijnlijk **de norm eerder dan de uitzondering**. Dat is functioneel gezien Oracle's beste marketinginstrument: elke planner die met een gekraakte P6 leert werken, wordt daarna een betalende seat bij een tier-1-werkgever.

**Consequentie voor nieuwe toetreders:** de reële concurrentie in het onderste marktsegment is niet MS Project of Asta — het is **gratis P6 en Excel**. Elk prijspunt boven nul concurreert daar met nul.

### 5.7 Saoedische RHQ-eis — de grootste structurele barrière voor buitenlandse leveranciers

Sinds **1 januari 2024** mogen Saoedische overheidsinstanties en overheidsgerelateerde entiteiten alleen contracteren met bedrijven die hun regionale hoofdkantoor in Saoedi-Arabië hebben — **maar uitsluitend voor contracten boven SAR 1 mln** (~USD 267.000). Het geldt voor overheidsinkoop onder de Government Tenders and Procurement Law, inclusief Aramco, SABIC, Ma'aden, PIF en zijn portfoliobedrijven (NEOM, ROSHN, Diriyah Gate, Red Sea Development Company, AlUla, Qiddiya). De private sector is vrij. ([Tamra](https://tamramobility.com/resources/rhq-government-tender-access))

> **[VERIFICATIE — gecorrigeerd; de oorspronkelijke bron was een Yahoo-zoekopdracht-URL, wat geen bron is]** Twee wezenlijke nuances ontbraken:
> 1. **Drempel van SAR 1 mln.** De RHQ-eis is géén blanket-uitsluiting. Contracten onder SAR 1 mln (~$267k) vallen erbuiten. Voor een planningssoftwareleverancier is dat relevant: een deal van 50–100 seats blijft daar mogelijk onder, zeker na korting.
> 2. **Sinds 1 april 2026 bestaat er een geformaliseerd uitzonderingskader.** Saoedi-Arabië heeft een gestructureerd vrijstellingsraamwerk vastgelegd waarbij overheidsentiteiten tóch aan niet-RHQ-bedrijven mogen gunnen, o.a. wanneer er slechts één technisch conform bod is, of wanneer een bod **minstens 25% lager** ligt dan concurrerende voorstellen. Het loopt via het Etimad-inkoopplatform. Verder bestaan er vrijstellingen voor sole-supplier-inkoop, nationale veiligheid, en tijdgebonden ontheffingen van het Ministerie van Investeringen. ([Pro Partner Group, april 2026](https://www.propartnergroup.com/uncategorized/2026/04/saudi-arabia-to-formalise-exemptions-to-regional-headquarters-requirement-for-government-contracts/), [Tamra](https://tamramobility.com/resources/rhq-government-tender-access))
>
> **Gevolg:** de barrière is reëel maar **minder absoluut** dan het rapport eerst stelde — vooral omdat de prijsclausule (25% goedkoper dan de concurrentie) precies het scenario beschrijft waarin een goedkopere Europese uitdager van Oracle zich zou bevinden. Bronnen waarschuwen wel dat de vrijstellingen "in de praktijk smaller zijn dan ze op papier lijken" en dat de handhaving eerder aanscherpt dan verruimt.

Gecombineerd met de **15% bronbelasting op royalty's** betekent dit: een buitenlandse planningssoftwareleverancier zonder Saoedische entiteit heeft een structureel nadeel bij het meest lucratieve deel van de markt (de overheids- en PIF-giga-projecten) en is fiscaal benadeeld in de rest — maar is er, anders dan eerder geformuleerd, niet volledig van uitgesloten.

### 5.8 Overige waarnemingen

- **De GCC is een expat-plannerarbeidsmarkt met hoge doorstroom.** Tools volgen mensen: een planner die in Doha met P6 heeft gewerkt, neemt die eis mee naar zijn volgende contract in Riyad. Dit versterkt de standaard exponentieel.
- **Ashghal draait een gezamenlijk portaal (APMS)** waarin aannemer, consultant en opdrachtgever in hetzelfde systeem werken — een model dat de vrijheid van de aannemer om zelf een tool te kiezen verder inperkt.
- **Oracle bouwt een cloudregio in NEOM City**, wat datalokalisatie- en soevereiniteitsvereisten in KSA voor Oracle oplost en voor concurrenten juist verzwaart.
- **Kwaliteitspoortwachters:** de DCMA-14-point-toets (via Acumen Fuse) en baseline-review-checklists zijn in de GCC standaardpraktijk geworden ([planningengineer.net](https://planningengineer.net/how-to-review-a-submitted-baseline-schedule-checklist/), [LinkedIn](https://www.linkedin.com/posts/hemalshah12_planning-primaverap6-projectcontrols-activity-7420445718529757184-9W2q), [Leopard](https://consultleopard.com/how-to-develop-a-baseline-schedule-in-primavera-p6/)). Een tool dat geen DCMA-conforme schema's kan produceren, is onbruikbaar.

---

## 6. Voor- en nadelen van lokale en niche-pakketten

Gebaseerd op reviews, documentatie en fora. Waar reviewvolume ontbrak, heb ik dat aangegeven.

### PMWeb (via CMCS) — sterkste regionale speler

**Voordelen:** diepe MENA-verankering met 75+ klanten; sterk in governance, kostenbeheersing, contractbeheer en betalingscertificaten — precies de processen waar GCC-overheidsopdrachtgevers om geven; werkt naast P6 in plaats van ertegen; lokale implementatiecapaciteit via CMCS.
**Nadelen:** **geen serieuze eigen CPM-engine** — het schema komt uit P6; verouderd aanvoelende UI in reviews; implementatie-intensief en duur; buiten MENA/Noord-Amerika weinig bekend, dus beperkte talentpool.

### Wrench SmartProject

**Voordelen:** sterke EPC-/engineeringworkflow (documentcontrole, review-cycli); AI-gepositioneerd; regionale aanwezigheid via ORBIT ME en een LinkedIn-entiteit in de VAE.
**Nadelen:** planning is een module, geen kernproduct; Indiaas ontwikkelmodel betekent dat regionaal maatwerk via projecturen loopt; weinig onafhankelijke reviews beschikbaar.

### ePROMIS / Buildo / Optivize / Milestone KSA / Salis / FirstBit / VirtueNetz

**Voordelen:** Arabischtalig, lokaal ondersteund, veel goedkoper dan de internationals; dekken precies wat de Saoedische MKB-aannemer nodig heeft (offertes, contracten, **mustakhlasat**/termijnstaten, kosten, btw-compliance); korte implementatie.
**Nadelen:** vrijwel geen echte CPM/kritieke-padberekening — planning is taakbeheer met een balkenschema; geen XER-import/-export, dus **onbruikbaar voor contractuele indiening** bij tier-1-opdrachtgevers; nauwelijks onafhankelijke reviewdata; leveranciersrisico (kleine bedrijven); geen internationale portabiliteit voor de planner.

### Arkan (VAE)

**Voordelen:** scherp gepositioneerd tegen de Excel-status quo met concrete ROI-argumentatie; UAE-first, kent de lokale goedkeuringsprocessen van autoriteiten.
**Nadelen:** de eigen ROI-cijfers zijn zelf-gepubliceerd en niet onafhankelijk verifieerbaar; het artikel noemt geen enkele concurrent, wat op een dun product-ecosysteem wijst; geen bewijs van CPM-diepgang.

### PlanRadar

**Voordelen:** echte regionale investering (regionaal HQ Dubai sinds 2022), sterke naamsbekendheid, klanten als Siemens/CBRE/JLL, uitstekende mobiele UX voor snagging en kwaliteitscontrole; groeiend AI-verhaal.
**Nadelen:** **is geen planningstool** — geen CPM, geen kritiek pad; complementair aan P6, geen substituut. Wordt in de Golf soms verward met projectbeheer terwijl het veldbeheer is.

### Trimble TILOS

**Voordelen:** onovertroffen voor lineaire projecten (rail, pijpleidingen, wegen) — precies de GCC-pijplijn; echt lokaal kanaal (SITECH KSA, ImageGrafix, FND) inclusief Arabische brochures; tijd-afstanddiagrammen zijn overtuigend richting opdrachtgevers.
**Nadelen:** nichetool die P6 niet vervangt maar aanvult (dubbele licentiekosten); steile leercurve; kleine gebruikersbasis in de regio dus schaars talent; Trimble heeft de productroadmap de laatste jaren beperkt geprofileerd.

### ALICE Technologies / nPlan / Nodes & Links

**Voordelen:** aantoonbaar sterke technologie voor optioneering en risicovoorspelling; sluit aan bij de AI-agenda van Vision 2030 en de Saoedisch-Amerikaanse AI-samenwerking.
**Nadelen:** **geen enkele geverifieerde GCC-productieklant gevonden**; hun output kan het contractueel goedgekeurde P6-schema niet vervangen, alleen aanvullen — dus ze concurreren om een innovatiebudget, niet om de kernlicentie; hoge prijsverwachtingen; risico dat pilots stranden zodra de PMO-sponsor vertrekt.

### Asta Powerproject

**Voordelen:** aantoonbaar sterkere gebruikerservaring dan P6 voor gebouwenbouw; goede prijs-kwaliteitverhouding; regionale beoordeling erkent het als "middenklasse-alternatief".
**Nadelen:** **"soms geaccepteerd"** is dodelijk in een markt waar het schema het betalingsmechanisme is; geen zichtbaar GCC-kanaal, geen lokale support, geen lokale talentpool; Elecosoft investeert niet aantoonbaar in de regio.

### ProjectLibre / GanttProject / OpenProject

**Voordelen:** nul licentiekosten; ProjectLibre is de meest gedownloade MS Project-vervanger (8,4 mln downloads).
**Nadelen:** geen XER-ondersteuning, geen enterprise-schaal, geen regionale support, geen enkele referentie in GCC-tenders; het gratis-segment is hier al bezet door **niet-gelicentieerde P6**, wat een veel betere waardepropositie is voor de gebruiker (dezelfde vaardigheden, dezelfde bestandsindeling, ook gratis). Open source heeft daardoor in de GCC feitelijk **geen markt**.

---

## 7. Conclusies en implicaties

1. **De markt is klein in licenties (~$43 mln/jaar [SCHATTING, gecorrigeerd]) en groot in diensten (~$370 mln/jaar [SCHATTING]).** Wie hier binnenkomt met alleen een tool, komt binnen op het kleinste deel van de taart — en dat deel is na correctie van de prijsaannames nóg kleiner dan eerst gedacht.

2. **Er is één poortwachter en die heet XER.** Elke tool die in de GCC serieus genomen wil worden, moet **P6-XER kunnen lezen én schrijven**, DCMA-14-point-conforme schema's produceren, Level 3/4-WBS-structuren aankunnen en baseline-/update-vergelijkingen ondersteunen. Zonder dat is het gesprek voorbij.

3. **Het aangrijpingspunt zit onderaan, niet bovenaan.** Boven de lijn is Oracle onaantastbaar (contract, kanaal, cloudregio, opleidingsecosysteem, RHQ-voordeel). Onder de lijn — tienduizenden MKB-aannemers, onderaannemers, de 365.120 Saoedische bouwvestigingen — is er geen betaalbaar, Arabischtalig, XER-compatibel CPM-gereedschap. Die groep gebruikt nu Excel of gekraakte P6.

4. **Arabisch/RTL is geen must voor tier 1, maar wél de sleutel tot de onderkant.** Dat is precies het segment dat door niemand goed bediend wordt.

5. **Toetreding vereist een lokale entiteit of VAR.** De combinatie RHQ-regel + 15% bronbelasting + resellergecentreerde inkooppraktijk maakt directe verkoop vanuit Europa onwerkbaar voor overheidsgerelateerd werk.

6. **De conjunctuur is op korte termijn tegen.** GCC-gunningen daalden in 2025 fors. De pijplijn van $1,78 biljoen zorgt voor structurele vraag, maar 2026–2027 wordt vermoedelijk een verdringingsmarkt in plaats van een groeimarkt.

---

## 8. Bronnen

### Marktomvang bouw en economie
- MEED — GCC construction industry evolves ($264,4 mrd 2024; $249,4 mrd 2023; KSA $142,4 mrd) — https://www.meed.com/gcc-construction-industry-evolves
- MEED Projects — GCC Projects Market Performance H1 2025 (KSA −56%) — https://www.meedprojects.com/digital-library/meed-report-gcc-projects-market-performance-h1-2025/
- MEED — Contract awards decline in 2025 — https://www.meed.com/contract-awards-decline-in-2025
- Khaleej Mag — Saudi Arabia dominates GCC projects market Q3 2025 ($1,78 biljoen pijplijn) — https://khaleejmag.com/business/saudi-arabia-dominates-gcc-projects-market-in-q3-2025-with-28-1-billion-in-awards/
- Arab News — Saudi Arabia tops GCC projects market in Q3 ($28,1 mrd) — https://www.arabnews.com/node/2618623/business-economy
- Gulf News — UAE overtakes Saudi Arabia in project awards — https://gulfnews.com/business/economy/uae-overtakes-saudi-arabia-in-project-awards-as-kingdom-eases-up-1.500177820
- GCC Business Watch — Q1-2025 slowdown — https://gccbusinesswatch.com/news/gcc-project-market-set-for-strong-2025-despite-q1-slowdown-driven-by-saudi-and-uae-pipelines/
- Modern Construction 360 — GCC construction market slows ($67 mrd vs $110 mrd) — https://modernconstruction360middleeast.com/gcc-construction-market-slows/
- Kamco Invest — GCC Projects Market Update Q2-2025 — https://www.kamcoinvest.com/sites/default/files/research/pdf/GCC%20Projects%20Market%20Update%20-%20Q2-2025_Eng.pdf
- IMARC — Saudi Arabia construction market ($101,4 mrd 2025 → $140,4 mrd 2034) — https://www.imarcgroup.com/saudi-arabia-construction-market
- Mordor via MarketResearch.com — Saudi construction ($133,79 mrd 2025) — https://www.marketresearch.com/Mordor-Intelligence-LLP-v4018/Saudi-Arabia-Construction-Share-Trends-45181694/
- Arab News — Saudi Arabia has up to 117k contractors — https://www.arabnews.com/node/2650710/business-economy
- Argaam — Saudi construction firms top 365,000 in 2025, employ 4.4M workers — https://www.argaam.com/en/article/articledetail/id/1921206
- Times Kuwait — Kuwait awards $6,273 mrd in first four months of 2026 — https://timeskuwait.com/kuwait-awards-contracts-worth-6-27-bln-in-first-four-months-of-2026/
- Edge Consultancy — Kuwait project awards Q2 2026 — https://edgeconsultancykw.com/kuwait-project-awards-q2-2026/
- Times Kuwait — MENA contract awards June 2025 ($13,9 mrd) — https://timeskuwait.com/mena-contract-awards-recover-slightly-to-13-9-billion-in-june/

### Softwaremarktcijfers
- Ken Research — GCC Construction Project Management Software Market ($1,2 mrd; CAGR 16,75%; $2,5 mrd 2031) — https://www.kenresearch.com/gcc-construction-project-management-software-market
- Research and Markets — Middle East Construction PM Software Market — https://www.researchandmarkets.com/report/middle-east-construction-project-management-software-market
- Market Research Future — GCC Construction Software Market ($50,0 mln 2024; CAGR 6,26%) — https://www.marketresearchfuture.com/reports/gcc-construction-software-market-45912
- 6sense — Oracle Primavera Suite market share (20,05%) — https://6sense.com/tech/project-management/oracle-primavera-suite-market-share
- Apps Run The World — Top 10 construction software vendors — https://www.appsruntheworld.com/top-10-construction-software-vendors-market-size-and-market-forecast/
- Datanyze — Oracle Primavera P6 market share (0,69%; 1.564 bedrijven) — https://www.datanyze.com/market-share/project-management--217/oracle-primavera-p6-market-share

### Contracteisen, normen en overheidsprogramma's
- Oracle — Oracle to help improve construction visibility for Red Sea Global (Aconex + P6, 23.000+ gebruikers) — https://www.oracle.com/middleeast/news/announcement/oracle-to-help-improve-construction-visibility-and-results-for-red-sea-global-2026-01-27/
- Oracle — Qatar relies on Oracle Primavera Unifier (Ashghal) — https://www.oracle.com/construction-engineering/oracle-primavera-ashghal/
- Ashghal — Section C Employer's Requirements STC-051 (P6 + Contract Management) — https://www.ashghal.gov.qa/en/Tenders/TenderBriefDocuments/Project%20Brief-%20STC-%20051.pdf
- Ashghal — APMS training (Ashghal Portfolio Management System) — https://www.ashghal.gov.qa/en/pages/apmstraining.aspx
- NEOM Shushah Island Stage 3A — Minimum Schedule Requirements (P6 gespecificeerd) — https://www.scribd.com/document/1060968894/Minimum-Schedule-Requirements
- Saudi Aramco SAEP-331 — Project Schedule Requirements (7 schemaniveaus) — https://www.scribd.com/document/698960445/SAEP-331
- SAEP-331 video-uitleg — https://www.youtube.com/watch?v=aH4EWP8ehoY
- Saudi Aramco — Information and resources for suppliers — https://www.aramco.com/en/what-we-do/suppliers/supplier-resources
- Saudi Aramco PMT-104 — Planning and Scheduling During Detailed Engineering — https://www.studocu.com/row/document/semnan-university/planning/
- US-Saudi Business Council — Mashroat presentation (Mashroat-compliant ECMS) — https://ussaudi.org/wp-content/uploads/2020/03/Mashroat-Presentation.pdf
- Serco — Government Expenditure & Projects Efficiency Authority (EXPRO) / Mashroat — https://www.serco.com/me/sector-expertise/government-services/expro
- Mashroat Volume 14 White Book explained — https://www.linkedin.com/pulse/mashroat-volume-14-white-book-explained-what-every-document-cachero-hj5df
- Mashroat Project Standard Document Numbering Procedure — https://www.scribd.com/document/856823707/EPM-ID0-PR-000002-02-Project-Standard-Document-Numbering-Procedure
- Autodesk — Dubai BIM mandate (verplicht vanaf 1-1-2024) — https://boards.autodesk.com/dubai-bim-mandate
- TECON — Dubai implements BIM mandate — https://tecon.ae/dubai-implements-bim-mandate-for-enhanced-construction-efficiency/
- PMI — The Kingdom and the PMO (Saoedische nationale PMO-geschiedenis) — https://www.pmi.org/learning/library/kingdom-pmo-10814

### Marktpositie en adoptie
- Gulf Certifications — Primavera P6 GCC Construction (ADNOC/Aramco/QatarEnergy/RTA/Ashghal/KNPC; MS Project vaak geweigerd; salarissen) — https://www.gulfcertifications.com/blog/primavera-p6-gcc-construction
- Time Training Centre — Should document controllers learn Primavera (ADNOC/Aldar/Etihad Rail/ADPIC/RTA; FIDIC 8.3; VAE-marktcijfers; salarissen; 400+ vacatures) — https://www.timetraining.ae/learninghub-detail/should-document-controllers-learn-Primavera
- Edoxi — Why Primavera is becoming standard for government projects in Qatar (75%/80%/68%/35%-claims) — https://www.edoxi.com/studyhub-detail/why-primavera-becoming-standard-for-government-projects-qatar
- Edoxi — Why Primavera P6 skills are in high demand in Dubai — https://www.edoxi.com/studyhub/primavera-p6-skills-in-demand-dubai
- Oracle Aconex + NEOM (praktijkbron) — https://www.linkedin.com/posts/faiz-aman-mustafa_aconex-neom-documentcontrol-activity-7349161901550940166--N9s
- Oracle $14 mrd+ uitbreiding KSA / cloudregio NEOM — https://www.linkedin.com/posts/sherief-elabd_digitaltwin-saudiarabia-neom-activity-7391018392767361024-rF1r
- NEOM Project Controls Manager-vacature (P6, Unifier, Enablon, Aconex) — https://www.energyjobline.com/job/project-controls-manager-21607444
- Bentley SYNCHRO op Jeddah Tower — https://www.linkedin.com/posts/bentley-systems_synchro-4dmodeling-digitaltwins-activity-7342660662571003904-eg5E
- CTTEC — Bentley Synchro 4D (VK, VAE, India, Midden-Oosten) — https://cttec.org/synchro/
- SITECH KSA — Tilos — https://sitech-ksa.com/products/tilos/
- ImageGrafix — Tilos Time-Location brochure — https://imagegrafix.sa/wp-content/uploads/2024/09/Tilos-Time-Location-Project-Management-Software.pdf
- FND & ImageGrafix partner met Trimble Tilos — https://www.artstodaysaudiarabia.com/article/688320568
- Nodes & Links — INTECH partnership — https://nodeslinks.com/blog/intech-and-nodes-links-partnership/
- ALICE Technologies / Arab News-interview over AI in Saoedisch vastgoed — https://www.linkedin.com/posts/activity-7468597134121091072-Ib1q
- Smartsheet — EMEA momentum — https://www.smartsheet.com/content-center/inside-smartsheet/company-news/business-momentum-emea-full-speed-ahead
- IT Europa — Smartsheet 200% klantengroei EMEA sinds 2018 — https://iteuropa.com/news/smartsheet-sees-business-boom-emea
- Omni Factors — monday.com GCC (Dubai delivery hub, alle zes GCC-landen) — https://omnifactors.com/gcc
- TechIntelPro — monday.com EMEA GM-benoeming, +26% omzet 2025 — https://techintelpro.com/news/ai/enterprise-ai/mondaycom-appoints-ben-barnett-gm-of-emea
- PlanRadar lanceert in de VAE / regionaal HQ Dubai — https://www.zawya.com/en/press-release/companies-news/field-management-platform-for-construction-and-real-estate-planradar-launches-in-the-uae-d3hsfsoy
- Gulf Today — PlanRadar in Midden-Oostense bouw — https://www.gulftoday.ae/business/2026/06/23/how-planradar-is-helping-construction-teams-build-a-clearer-record-of-work

### Prijzen
- prmyazilim — Primavera P6 Pricing (P6 Pro $3.880 / EPPM $4.240 / support 22% / Cloud $305 p.m. min. 25 users) — https://prmyazilim.com/en/primavera-p6-pricing
- ProjectManagerTemplate — Primavera P6 Cost: License vs Subscription ($3.520 / $2.750 + $605 / vanaf $3.100) — https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models
- VendorBenchmark — Oracle Primavera P6 pricing ($3K–25K per gebruiker/jaar) — https://vendorbenchmark.com/vendors/oracle-primavera-p6-pricing
- PrimaveraScheduling — Buy Primavera software (vanaf $3.500) — https://primaverascheduling.com/home/buy-primavera-software/
- ContractorsAndBuilders — Oracle Primavera pricing ($175/gebruiker/maand) — https://contractorsandbuilders.com/pricing/oracle-primavera/
- FindPM — Primavera Cloud (Progress Cloud Service $144/gebruiker/jaar) — https://findpmsoftware.com/products/primavera-cloud
- Taradigm — How much does Primavera P6 cost — https://www.taradigm.com/how-much-does-primavera-p6-cost/
- The Digital Project Manager — Microsoft Project pricing ($10/$30/$55) — https://thedigitalprojectmanager.com/tools/microsoft-project-pricing/
- ZoftwareHub — Oracle Aconex pricing (Unlimited-plan) — https://zoftwarehub.com/products/oracle-aconex/pricing
- ITQlick — Oracle Aconex cost — https://www.itqlick.com/oracle-aconex/pricing

### Training
- Coursetakers.ae — Primavera course fees Dubai (AED 1.200–6.000) — https://www.coursetakers.ae/search/courses-in/professional/project-management/primavera/fees
- Laimoon Dubai — Primavera fees (AED 1.000–15.200) — https://courses.laimoon.com/uae/dubai/project-management/primavera/fees
- Edoxi — Primavera P6 certification cost Dubai (AED 1.741–16.150; examen AED 900–950) — https://www.edoxi.com/studyhub/primavera-p6-certification-cost-dubai
- MyPrivateTutor — Primavera P6 training course (AED 2.500) — https://www.myprivatetutor.ae/course-details/80545/primavera-p6-training-course
- Edarabia — Wingsway Primavera P6 Dubai (AED 2.500) — https://www.edarabia.com/401931/primavera-p6-dubai-uae/
- Laimoon Riyad (AR) — رسوم دورة برنامج بريمافيرا في الرياض (SAR 1.000–13.600 / laagste SAR 1.497) — https://courses.laimoon.com/ar/saudi-arabia/riyadh/project-management/primavera/fees
- ESI Saoedi-Arabië — دورة أساسيات إدارة المشاريع بإستخدام بريمافيرا — https://esi.edu.sa/courses/p6/
- ESI — Advanced Primavera — https://esi.edu.sa/courses/advanced-primavera/
- Edoxi Riyadh — Primavera P6 course (24 uur) — https://www.edoxi.com/riyadh/primavera-p6-course
- Solve Tech Training (KHDA-erkend) — https://solvetechtraining.com/primavera-p6-training-course-in-dubai/
- Zabeel Institute — https://zabeelinstitute.ae/primavera-p6-training-course-dubai/
- Planning Engineer FZE — members (80.046 actieve leden) — https://planningengineer.net/members/
- Planning Engineer FZE — about us (Sharjah, Egypte, KSA; sinds 2012) — https://planningengineer.net/about-us/
- Planning Engineer — Facebook (61.163 likes) — https://www.facebook.com/PlanningEngineerDotNet/
- Planning Engineer — baseline review checklist — https://planningengineer.net/how-to-review-a-submitted-baseline-schedule-checklist/

### Salarissen en arbeidsmarkt
- GulfTalent — Planning engineer salaries Saudi Arabia (SAR 9.000, tot 15.000) — https://www.gulftalent.com/saudi-arabia/salaries/planning-engineer
- Glassdoor — Planning engineer Saudi Arabia (SAR 10.675 totaal / 9.275 basis) — https://www.glassdoor.ca/Salaries/saudi-arabia-planning-engineer-salary
- Naukrigulf — Planning engineer salary Saudi Arabia (SAR 2.066–17.000; gem. 9.006; n=1.5k) — https://www.naukrigulf.com/salaries/planning-engineer-salary-in-saudi-arabia
- Glassdoor — Senior planning engineer Riyadh (SAR 15.750 / 19.083) — https://www.glassdoor.com/Salaries/riyadh-saudi-arabia-senior-planning-engineer-salary
- GulfTalent — Planning engineer Qatar (QAR 8.000–13.000) — https://www.gulftalent.com/Qatar/salaries/planning-engineer
- Naukrigulf — Planning engineer Qatar/Kuwait/Bahrain/Oman — https://www.naukrigulf.com/salaries/planning-engineer-salary-in-qatar
- Naukrigulf — Planning engineer Oman (OMR 834) — https://www.naukrigulf.com/salaries/planning-engineer-salary-in-oman
- Naukrigulf — Primavera P6 jobs (344 vacatures Dubai) — https://www.naukrigulf.com/primavera-p6-jobs
- Naukrigulf — Planning engineer primavera planner jobs (857 vacatures) — https://www.naukrigulf.com/planning-engineer-primavera-planner-jobs
- Jooble — Primavera P6 jobs Saudi Arabia (196 vacatures) — https://sa.jooble.org/jobs-primavera-p6/Saudi-Arabia
- Bayt — Primavera P6 jobs Middle East (150+) — https://www.bayt.com/en/international/jobs/primavera-p6-jobs/
- Bayt — Primavera P6 jobs UAE (70+) — https://www.bayt.com/en/uae/jobs/primavera-p6-jobs/
- SalaryExpert — Consultant salary Dubai (AED 291.956/jaar; AED 116,97/uur) — https://www.salaryexpert.com/salary/job/consultant/united-arab-emirates/dubai
- Growlio — Freelance rates UAE 2025 (AED 150–2.000/uur) — https://www.growlio.io/blog-uae/freelance-pricing-guide-uae

### Resellers, lokale spelers en consultancy
- ImageGrafix VAE — Oracle Primavera partner & reseller (sinds 1996) — https://image-grafix.com/oracle-primavera-partner-reseller-in-united-arab-emirates/
- ImageGrafix KSA — https://imagegrafix.sa/oracle-primavera-partner-reseller-in-kingdom-of-saudi-arabia/
- Promastar — Oracle Platinum Partner / VAR — https://www.promastar.net
- CAD Gulf — Oracle Primavera (Dubai, 35+ jaar) — https://cadgulf.com/oracle-primavera/
- ORBIT Middle East — Primavera, Aconex, Wrench, Bluebeam — https://www.orbitme.net/
- ORBIT Middle East — Wrench — https://www.orbitme.net/Wrench.html
- FastVision KSA — Oracle Primavera P6 EPPM — https://fastvisionksa.com/oracle-primavera-p6-eppm/
- Sharp Innovation (AR) — خدمات بريمافيرا — https://sharpinnvotech.com/ar/services/primavera-services
- CMCS — PMWeb clients (75+ MENA-klanten) — https://cmcs.co/pmweb-clients/
- PMWeb — CMCS-partnerschap — https://pmweb.com/cmcs-pmweb/
- Wrench SmartProject — https://www.wrenchsp.com/smartproject-overview/
- ePROMIS Middle East — https://epromis.com/middle-east-en
- Buildo (AR/KSA) — https://buildo.solutions/
- Milestone KSA — نظام إدارة المشاريع الإنشائية — https://construction.milestoneksa.com/
- Optivize — ERP voor Saoedische aannemers — https://optivize.tech/solutions/construction-erp
- Salis ERP — إدارة شركات المقاولات — https://saliserp.com/contracting-management/
- FirstBit ERP KSA — https://firstbit.sa/ar/features/project-management/
- VirtueNetz — برنامج إدارة المشاريع الإنشائية في السعودية — https://www.virtuenetz.com/sa/ar/construction-management-software-saudi-arabia/
- Arkan — Why UAE contractors are moving away from Excel — https://arkancs.com/resources/blog/uae-contractors-moving-from-excel
- PlanRadar KSA (AR) — https://www.planradar.com/sa/
- Sablono — https://www.sablono.com/
- Claimetrica — Project controls consultant Saudi Arabia (P6 & EVM) — https://claimetrica.com/project-controls.html
- Leopard Project Controls — https://consultleopard.com
- P3Wise — https://p3wise.com
- Novelite Consulting — construction claims & forensic delay (Dubai/GCC) — https://noveliteconsulting.com
- AHPMC — Forensic planning and EOT claims Dubai — https://ahpmc.ae/services/forensic-planning-and-variation-eot-claim/
- Qualis Global — construction disputes / delay expert Dubai — https://qualis-global.com
- CALIM — Delay analysis consultant Qatar & GCC — https://calim.ai/delay-analysis-consultant/
- e-Basel — Time-related claims: EOT, delay analysis and damages — https://e-basel.com/construction-claims/time-related-claims-eot-delay-analys/

### Piraterij, grijze markt en Excel
- Gitnux — Software piracy statistics (MEA 59%, 2022) — https://gitnux.org/software-piracy-statistics/
- Khaleej Times — UAE posts lowest piracy rate in ME (34%) — https://khaleejtimes.com/business/uae-posts-lowest-piracy-rate-in-me
- Gulf News — UAE piracy rate falls to 36pc — https://gulfnews.com/uae/uae-piracy-rate-falls-to-36pc-1.358098
- Gulf News — Software piracy losses in Gulf rise 7% to $631m — https://gulfnews.com/business/software-piracy-losses-in-gulf-rise-7-to-631m-last-year-1.625530
- YouTube (AR) — تنصيب برنامج بريمافيرا Primavera P6 مجاناً — https://www.youtube.com/watch?v=0oEBbbaBzXs
- YouTube (AR) — كيفية تثبيت وتفعيل برنامج بريمافيرا — https://www.youtube.com/watch?v=Ul1kGswfbHk
- Arab Engineers Forum (AR) — تحميل وتثبيت وتفعيل برنامج Primavera P6_R83 — https://arab-eng.org/threads/506596/
- Civil Guide (AR) — تحميل برنامج بريمافيرا — https://www.civil-guide.com/2022/02/free-download-primavera-p6.html
- Amazon.sa — "Primavera P6 lifetime" (SAR 91,58 × 12 mnd) — https://www.amazon.sa/-/en/Primavera-P6-lifetime/dp/B0CT5HC1B7
- Haraj (AR) — دورة بريمافيرا SAR 330 — https://haraj.com.sa/11182212205/
- Shop Smart SA — Educational License Primavera P6 Professional (1 jaar) — https://shop.smart.sa/en/ePzzOWp
- Redress Compliance — Restricted use licenses in Primavera P6 — https://redresscompliance.com/restricted-use-licenses-in-primavera-p6-what-you-need-to-know
- Oracle — Primavera license codes — https://www.oracle.com/support/license-codes/primavera.html
- LinkedIn (AR/EN) — Excel vs Primavera P6 voor planningsingenieurs — https://www.linkedin.com/posts/rasal-p-a-b0394115b_planningengineer-primaverap6-microsoftexcel-activity-7321150165002731520-KtvH
- SJ Civil — Microsoft Excel v. Microsoft Project v. Primavera P6 — https://sjcivil.com/microsoft-excel-v-microsoft-project-v-primavera-p6/
- XerPlan — Baseline schedule with Primavera & Excel — https://www.xerplan.com/baseline-schedule-with-primavera-excel
- LinkedIn (AR) — الصراع المهني: بريمافيرا P6 أم مايكروسوفت بروجكت — https://ae.linkedin.com/pulse/الصراع-المهني-بريمافيرا-p6-أم-مايكروسوفت-بروجكت-ms-project-q-mohsen-tvm0f

### Fiscaal en regelgeving
- Saoedische RHQ-eis voor overheidsopdrachten per 1-1-2024 (synthese van juridische bronnen; MISA/Royal Commission for Riyadh City) — https://search.yahoo.com/search?p=Saudi+Arabia+regional+headquarters+RHQ+programme+government+contracts+requirement+2024+foreign+companies
- KSA bronbelasting: 15% op royalty's, 5% op technische/adviesdiensten (DLA Piper) — https://www.dlapiper.com

### Schemakwaliteit en methodiek
- Ten Six — Deltek Acumen Fuse DCMA 14-point metrics — https://tensix.com
- Deltek — Acumen Fuse — https://www.deltek.com/
- LinkedIn — Baseline programme quality check points for Primavera P6 — https://www.linkedin.com/posts/hemalshah12_planning-primaverap6-projectcontrols-activity-7420445718529757184-9W2q
- Leopard — How to develop a baseline schedule in Primavera P6 — https://consultleopard.com/how-to-develop-a-baseline-schedule-in-primavera-p6/
- Trimble — Tilos linear scheduling — https://construction.trimble.com/en/products/tilos
- Bentley — SYNCHRO — https://www.bentley.com/software/synchro/
- ProjectLibre — https://www.projectlibre.com/ | Wikipedia (8,4 mln downloads) — https://en.wikipedia.org/wiki/Projectlibre
- GanttProject — https://www.ganttproject.biz/

---

*Onderzoek uitgevoerd juli 2026. Alle bedragen in USD tenzij anders vermeld. Wisselkoersen: USD 1 = SAR 3,75 = AED 3,6725 = QAR 3,64 (vaste koppelingen).*

---

## 9. Verificatie

**Adversariële fact-check, juli 2026.** Twaalf falsifieerbare kernbeweringen zijn geselecteerd en actief geprobeerd te **weerleggen** met bronnen buiten de oorspronkelijk geciteerde, aangevuld met tekstextractie van primaire documenten en het narekenen van elke rekenstap. Vier beweringen zijn gecorrigeerd, één is teruggezet naar "onbevestigd", en de rekenkundige kern van het marktomvangmodel is herzien.

### Overzicht

| # | Bewering | Oordeel | Kern van de bevinding |
|---|---|---|---|
| 1 | GCC-contractgunningen 2024 = $264,4 mrd; KSA $142,4 mrd (MEED) | **Gecorrigeerd** | Vier onafhankelijke bronnen geven $273,2 mrd / $146,8 mrd |
| 2 | Ken Research: $1,2 mrd → $2,5 mrd in 2031, CAGR 16,75% | **Gecorrigeerd** | Wiskundig onmogelijk; bronpagina noemt geen CAGR |
| 3 | MRFR: $50,0 mln (2024) → $97,5 mln (2035), CAGR 6,26% | **Bevestigd** | Exact zo op de bronpagina; intern consistent |
| 4 | P6 Cloud $305/gebruiker/mnd, min. 25 gebruikers = $91.500 instapdrempel | **Gecorrigeerd** | Werkelijk $130/mnd vanaf 5 gebruikers = ~$7.800/jaar |
| 5 | P6 Professional lijstprijs $3.880 | **Onzeker** | Concurrerende resellernotering $3.520; Oracle publiceert niets |
| 6 | Bottom-up schatting ~$55 mln/jaar licentiemarkt | **Gecorrigeerd** | Herrekend naar ~$43 mln na correctie van de seatprijs |
| 7 | P6 contractueel voorgeschreven; MS Project diskwalificeert een bod | **Onbevestigd** | Enig primair document blijkt een IT-tender uit 2017 |
| 8 | Ashghal-tender STC-051 bewijst de P6-verplichting | **Gecorrigeerd** | Licentieverlenging voor Ashghal zélf; 0× "schedule"/"XER" |
| 9 | Saoedische RHQ-eis sluit buitenlandse leveranciers uit | **Gecorrigeerd** | Drempel SAR 1 mln; uitzonderingskader sinds april 2026 |
| 10 | KSA 15% bronbelasting op royalty's, 5% op technische diensten | **Bevestigd** | PwC bevestigt; managementvergoedingen 20% toegevoegd |
| 11 | Red Sea Global: 23.000+ gebruikers op Aconex + P6 | **Bevestigd** | Letterlijk in het Oracle-persbericht |
| 12 | MS Project Plan 1/3/5 = $10/$30/$55 per gebruiker/maand | **Bevestigd** | Bedragen kloppen; plannamen verouderd |
| 13 | IMARC: KSA-bouwmarkt $101,4 mrd (2025) → $140,4 mrd (2034) | **Bevestigd** | Exact zo op de bronpagina |
| 14 | ~117.000 aannemers geregistreerd bij de Saudi Contractors Authority | **Bevestigd** | Meerdere onafhankelijke bronnen |

### Toelichting per bevinding

**1 — GCC-contractgunningen 2024 · GECORRIGEERD**
De MEED-cijfers ($264,4 mrd totaal, $142,4 mrd KSA) worden door geen andere publicatie gereproduceerd. Kamco Invests jaarrapport, overgenomen door AGBI, Muscat Daily en Enterprise AM, geeft consistent **$273,2 mrd** (+9,6%) en **$146,8 mrd** voor KSA (53,8%). Beide reeksen delen dezelfde 2023-basis ($249,4 mrd) en zijn elk intern consistent, wat wijst op voorlopig vs. definitief. Conclusies veranderen niet (~3% verschil).
→ https://www.agbi.com/construction/2025/01/contracts-in-saudi-arabia-rise-25-in-value-in-2024/

**2 — Ken Research-cijferreeks · GECORRIGEERD**
Narekenen: $1,2 mrd bij 16,75% CAGR over 7 jaar (2024→2031) = **$3,64 mrd**, niet $2,5 mrd. Omgekeerd impliceert $1,2 → $2,5 mrd over 7 jaar een CAGR van **11,1%**. De drie getallen kunnen niet samen waar zijn. De bronpagina zelf noemt basisjaar 2024, forecastperiode **2025–2030** en **geen CAGR**; de 16,75% en het jaartal 2031 komen er niet vandaan.
→ https://www.kenresearch.com/gcc-construction-project-management-software-market

**3 — Market Research Future · BEVESTIGD**
$50 mln (2024) → $53,13 mln (2025) → $97,5 mln (2035), CAGR 6,26%. Nagerekend: 50 × 1,0626 = 53,13 ✓ en (97,5/53,13)^(1/10) − 1 = 6,26% ✓. De reeks is intern volledig consistent — wat overigens ook past bij een gemodelleerd in plaats van gemeten cijfer.
→ https://www.marketresearchfuture.com/reports/gcc-construction-software-market-45912

**4 — P6 Cloud-prijs en instapdrempel · GECORRIGEERD (zwaarstwegende correctie)**
De notering "$305/gebruiker/maand, minimaal 25 gebruikers" komt van één Turkse resellerpagina. Een geautoriseerde Noord-Amerikaanse Primavera-reseller publiceert een uitgesplitste prijslijst waarin de eigenlijke CPM-module, **Oracle Primavera Cloud – Schedule, $130/gebruiker/maand kost met een minimum van 5 gebruikers**. De instapdrempel is daarmee ~$7.800/jaar in plaats van $91.500 — een factor 12. Ook bevestigd: OPC Progress (viewer) $14/mnd, Task Management $60/mnd, Portfolio & Capital Planning $235/mnd. Hiermee vervalt de redenering in §3.2 dat de cloudprijs MKB-aannemers uitsluit.
→ https://www.cmcprojectsolutions.com/primavera/shop/ · tegen https://prmyazilim.com/en/primavera-p6-pricing

**5 — P6 Professional lijstprijs · ONZEKER**
Twee resellers noteren verschillend: $3.880 (prmyazilim) tegen $3.520 (CMC); voor EPPM $4.240 tegen $3.850. Oracle's officiële productpagina bevat **geen enkel bedrag**, wat het rapport terecht al vermoedde. Behandel $3.500–4.250 als bandbreedte; het cijfer $3.880 heeft schijnprecisie.
→ https://www.oracle.com/industries/construction-engineering/primavera-p6/

**6 — Bottom-up marktomvang · GECORRIGEERD**
Alle rekenstappen zijn nagelopen en waren intern correct (10.250 planners, +35% → 14.000; vacature-kruiscontrole; 15.000 × $1.700 + 60.000 × $130 + 200 × $100k = $53,3 mln). Maar de **invoerprijs** klopte niet. Met de gecorrigeerde cloudprijs convergeren de perpetual-route (~$780–1.165/jaar) en de cloudroute (~$780–1.170/jaar) op **~$1.000/jaar** in plaats van $1.700. Nieuwe uitkomst: 15.000 × $1.000 + $8 mln + $20 mln = **~$43 mln/jaar**, bandbreedte $30–80 mln. Twee onafhankelijke plausibiliteitschecks steunen de overige regels: de viewer-tier ($168/jaar lijst) en Ashghals werkelijke 85 EPPM-seats (~$79k/jaar support, dicht bij de aangenomen $100k per grote organisatie).

**7 — P6 als contractuele verplichting · ONBEVESTIGD**
Gericht zoeken naar onafhankelijke of primaire onderbouwing voor "P6 verplicht in GCC-tenders" en "XER-inlevering verplicht" leverde uitsluitend uitleg-artikelen van planningsconsultancies op over wat een XER-bestand ís — geen tenderspecificatie, geen inkoopdocument. De bewering rust daarmee volledig op trainingsaanbieder-blogs, de bronklasse die §0 zelf als "Laag" markeert. Het indirecte bewijs blijft sterk, maar dit is de zwakste schakel onder de kernstelling van het rapport.

**8 — Ashghal STC-051 · GECORRIGEERD**
De PDF is opgehaald en de tekst geëxtraheerd. Het is gedateerd **mei 2017**, het is een **IT-inkooptender van Ashghals eigen Information Systems Department** voor verlenging van **85 P6 EPPM + 85 PCM-licenties voor Ashghal zelf**, en de termen "schedule", "programme" en "XER" komen er **nul keer** in voor. Het bewijst institutionele P6-verankering ("the backbone of the current Project Management Information Systems of Ashghal"), niet een contractuele oplegging aan aannemers. Bijvangst: het levert wél een waardevol primair seat-getal op (85) voor de enterprise-laag in §2.3.
→ https://www.ashghal.gov.qa/en/Tenders/TenderBriefDocuments/Project%20Brief-%20STC-%20051.pdf

**9 — Saoedische RHQ-eis · GECORRIGEERD**
De oorspronkelijke voetnoot verwees naar een **Yahoo-zoekopdracht-URL**, wat geen bron is. Bij verificatie ontbraken twee wezenlijke feiten: (a) de eis geldt alleen voor contracten **boven SAR 1 mln**, en (b) sinds **1 april 2026** bestaat er een geformaliseerd uitzonderingskader via Etimad, o.a. wanneer slechts één technisch conform bod bestaat of wanneer een bod **≥25% goedkoper** is dan de concurrentie. De barrière is reëel maar minder absoluut dan gesteld — en de prijsclausule beschrijft juist het scenario van een goedkopere uitdager.
→ https://tamramobility.com/resources/rhq-government-tender-access · https://www.propartnergroup.com/uncategorized/2026/04/saudi-arabia-to-formalise-exemptions-to-regional-headquarters-requirement-for-government-contracts/

**10 — KSA-bronbelasting · BEVESTIGD (bron opgewaardeerd)**
PwC bevestigt 15% op royalty's; dienstenvergoedingen variëren tussen 5%, 15% en 20% naar type, met 5% voor technische/adviesdiensten en 20% voor managementvergoedingen. De oorspronkelijke bronverwijzing was een kale domeinlink (dlapiper.com) zonder artikel; vervangen door een citeerbare bron.
→ https://taxsummaries.pwc.com/saudi-arabia/corporate/withholding-taxes

**11 — Red Sea Global 23.000+ gebruikers · BEVESTIGD**
Letterlijk in het Oracle-persbericht: "RSG will unite more than 23,000 users, from executives to field engineers", op Oracle Aconex Cloud en Oracle Primavera P6.
→ https://www.oracle.com/middleeast/news/announcement/oracle-to-help-improve-construction-visibility-and-results-for-red-sea-global-2026-01-27/

**12 — Microsoft Project-prijzen · BEVESTIGD, plannamen gecorrigeerd**
$10/$30/$55 per gebruiker per maand kloppen. De **plannamen zijn verouderd**: na de samenvoeging van Project en Planner heten ze nu **Planner Plan 1**, **Planner and Project Plan 3** en **Planner and Project Plan 5**. Eeuwigdurende licenties bestaan nog: Project Professional 2024 $1.129,99, Project Standard 2024 $679,99. Gevolg voor §3.4: de prijsverhouding P6:MS Project is ~4,3× en niet "4,5–10×", omdat de bovengrens op de weerlegde $3.660-cloudprijs berustte.
→ https://www.microsoft.com/en/microsoft-365/planner/microsoft-planner-plans-and-pricing

**13 — IMARC KSA-bouwmarkt · BEVESTIGD**
"The Saudi Arabia construction market reached USD 101.4 Billion in 2025", projectie USD 140,4 mrd in 2034, CAGR 3,6% (2026–2034). Exact zoals geciteerd.
→ https://www.imarcgroup.com/saudi-arabia-construction-market

**14 — 117.000 Saoedische aannemers · BEVESTIGD**
Meerdere onafhankelijke publicaties citeren dezelfde uitspraak van Al-Ajlan over ~117.000 bij de Saudi Contractors Authority geregistreerde aannemers. Het afzonderlijke Argaam-cijfer van 365.120 bouwvestigingen is in deze ronde **niet** onafhankelijk bevestigd — behandel als onzeker.

### Wat dit betekent voor de conclusies van het rapport

- **De richting van elke conclusie blijft overeind.** Geen enkele correctie draait een aanbeveling om.
- **De licentiemarkt is kleiner dan gedacht** (~$43 mln i.p.v. ~$55 mln), waardoor de kernboodschap — "klein in licenties, groot in diensten" — juist sterker wordt: de verhouding gaat van ~7× naar ~9×.
- **Twee argumenten zijn wezenlijk verzwakt.** (a) De prijsdrempel-verklaring voor de tweedeling in de markt is onjuist: Oracle Primavera Cloud is met ~$7.800/jaar vanaf 5 seats gewoon bereikbaar voor MKB-aannemers. Het gat onderaan de markt is dus een **vraaggat**, geen prijsgat — voor een toetreder een ongunstiger uitgangspunt. (b) De RHQ-barrière kent een drempel en sinds april 2026 een uitzonderingskader dat expliciet ruimte laat voor significant goedkopere aanbieders.
- **De grootste resterende onzekerheid is de kernstelling zelf.** Dat P6 contractueel verplicht is, is sectorconsensus met sterk indirect bewijs, maar in dit onderzoek is er geen enkel primair document voor gevonden. Wie hierop een productstrategie bouwt, zou eerst één echte Employer's Requirements-sectie van een lopend GCC-project moeten inzien.
